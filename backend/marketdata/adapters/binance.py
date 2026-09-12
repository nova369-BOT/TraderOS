"""Binance USDⓈ-M futures market-data adapter.

Real exchange integration (no API key required — public market streams):

* REST (``fapi.binance.com``): ``exchangeInfo`` catalog, depth snapshots,
  kline/aggTrade history backfill, open interest.
* WebSocket (``fstream.binance.com``) combined streams:
  ``@bookTicker`` (quote), ``@ticker`` (24h stats), ``@aggTrade`` (tape),
  ``@kline_{interval}``, ``@depth@100ms`` (L2 diffs), ``@forceOrder``
  (liquidations), ``@markPrice@1s`` (funding / mark / index).

Engineering notes:
- L2 book maintenance follows Binance's documented diff-depth algorithm
  (snapshot + buffered diffs, ``U``/``u``/``pu`` validation, resync on gap).
- A single multiplexed connection serves every active stream; live
  ``SUBSCRIBE``/``UNSUBSCRIBE`` frames adjust the set without reconnecting.
- Reconnect uses exponential backoff (cap 30s) plus a proactive 23h cycle.
- Invalid frames are counted and skipped — never fatal.
- All endpoints are injectable so the protocol logic is fully testable
  against a local fake Binance server (see tests).
"""

from __future__ import annotations

import asyncio
import contextlib
import json
import logging
import math
import time
from dataclasses import dataclass, field
from typing import Any

import httpx
import websockets

from backend.marketdata.adapters import MarketDataAdapter
from backend.marketdata.types import (
    BookDelta,
    BookLevel,
    BookSnapshot,
    Candle,
    Envelope,
    FeedState,
    FeedStatus,
    Funding,
    Liquidation,
    MarketStats,
    OpenInterest,
    Quote,
    SymbolInfo,
    Trade,
    build_topic,
    utc_now_ms,
)

logger = logging.getLogger(__name__)

DEFAULT_REST_BASE = "https://fapi.binance.com"
DEFAULT_WS_BASE = "wss://fstream.binance.com"

SUPPORTED_INTERVALS = {
    "1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h", "6h", "8h", "12h",
    "1d", "3d", "1w", "1M",
}

#: Streams served per canonical stream name. ``book`` maps to the depth diff
#: stream and produces both ``book_delta`` and ``book_snapshot`` envelopes.
_STREAM_TO_BINANCE: dict[str, str] = {
    "quote": "bookTicker",
    "stats": "ticker",
    "trade": "aggTrade",
    "book": "depth@100ms",
    "liquidation": "forceOrder",
    "funding": "markPrice@1s",
}

MAX_BOOK_LEVELS = 400
SNAPSHOT_PUBLISH_MS = 2_000
IDLE_CLOSE_GRACE_S = 10.0
CONNECT_BACKOFF_BASE = 0.5
CONNECT_BACKOFF_MAX = 30.0
PROACTIVE_CYCLE_S = 23 * 3600
RESYNC_COOLDOWN_S = 0.5


def _f(value: Any) -> float | None:
    try:
        out = float(value)
    except (TypeError, ValueError):
        return None
    if not math.isfinite(out):
        return None
    return out


def _i(value: Any) -> int | None:
    try:
        out = int(value)
    except (TypeError, ValueError):
        return None
    return out


@dataclass
class _BookState:
    instrument: str
    bids: dict[float, float] = field(default_factory=dict)
    asks: dict[float, float] = field(default_factory=dict)
    last_update_id: int | None = None
    synced: bool = False
    snapshot_in_flight: bool = False
    dirty: bool = False
    last_published_ms: int = 0
    pending: list[dict[str, Any]] = field(default_factory=list)
    last_resync_at: float = 0.0
    resnapshots: int = 0
    # Bumped on every invalidate() — lets an in-flight snapshot fetch detect
    # that its result belongs to a stale (pre-reconnect) epoch and discard it.
    epoch: int = 0

    def invalidate(self) -> None:
        self.bids.clear()
        self.asks.clear()
        self.last_update_id = None
        self.synced = False
        self.pending.clear()
        self.snapshot_in_flight = False
        self.epoch += 1

    def top_levels(self, levels: int) -> tuple[list[BookLevel], list[BookLevel]]:
        bids = [BookLevel(price=p, qty=q) for p, q in sorted(self.bids.items(), reverse=True)[:levels]]
        asks = [BookLevel(price=p, qty=q) for p, q in sorted(self.asks.items())[:levels]]
        return bids, asks


class BinanceFuturesAdapter(MarketDataAdapter):
    """Serves ``BINANCE:*`` topics from Binance USDⓈ-M futures."""

    exchange = "BINANCE"
    feed_name = "binance"

    def __init__(
        self,
        publisher,
        *,
        rest_base: str = DEFAULT_REST_BASE,
        ws_base: str = DEFAULT_WS_BASE,
        rest_timeout: float = 10.0,
        request_timeout: float = 30.0,
    ) -> None:
        self._publisher = publisher
        self._rest_base = rest_base.rstrip("/")
        self._ws_base = ws_base.rstrip("/")
        self._rest_timeout = rest_timeout
        self._request_timeout = request_timeout
        self._http: httpx.AsyncClient | None = None

        # topic key (stream, instrument, param) -> set of binance stream names
        self._topics: dict[tuple[str, str, str | None], set[str]] = {}
        # binance stream name (lower) -> set of topic keys needing it
        self._stream_consumers: dict[str, set[tuple[str, str, str | None]]] = {}
        self._sent_streams: set[str] = set()

        self._ws = None
        self._run_task: asyncio.Task | None = None
        self._oi_tasks: dict[str, asyncio.Task] = {}
        self._snapshot_tasks: dict[str, asyncio.Task] = {}
        self._snapshot_publisher_tasks: dict[str, asyncio.Task] = {}
        self._idle_close_task: asyncio.Task | None = None
        self._started = False
        self._connected = False
        self._connect_attempts = 0
        self._reconnects = 0
        self._resyncs = 0
        self._invalid_messages = 0
        self._events_published = 0
        self._last_event_ms: int | None = None
        self._detail: str | None = None
        self._connected_at: float | None = None

        self._books: dict[str, _BookState] = {}
        self._catalog: dict[str, SymbolInfo] = {}
        self._catalog_loaded = False
        self._last_quote: dict[str, Quote] = {}
        self._last_stats: dict[str, MarketStats] = {}
        self._last_funding: dict[str, Funding] = {}
        self._last_oi: dict[str, OpenInterest] = {}
        self._recent_trades: dict[str, list[Trade]] = {}
        self._candle_tails: dict[tuple[str, str], Candle] = {}

    # ------------------------------------------------------------------
    # lifecycle
    # ------------------------------------------------------------------
    @property
    def connected(self) -> bool:
        return self._connected

    async def start(self) -> None:
        if self._started:
            return
        self._started = True
        self._http = httpx.AsyncClient(timeout=self._rest_timeout, trust_env=False)
        asyncio.create_task(self._ensure_catalog())  # fire-and-forget, cached
        logger.info("binance adapter started (rest=%s ws=%s)", self._rest_base, self._ws_base)

    async def stop(self) -> None:
        self._started = False
        for task in list(self._oi_tasks.values()):
            task.cancel()
        self._oi_tasks.clear()
        for task in list(self._snapshot_tasks.values()):
            task.cancel()
        self._snapshot_tasks.clear()
        for task in list(self._snapshot_publisher_tasks.values()):
            task.cancel()
        self._snapshot_publisher_tasks.clear()
        run_task = self._run_task
        self._run_task = None
        if run_task is not None:
            run_task.cancel()
        if self._idle_close_task is not None:
            self._idle_close_task.cancel()
            self._idle_close_task = None
        if self._ws is not None:
            with contextlib.suppress(Exception):
                await self._ws.close()
            self._ws = None
        if self._http is not None:
            await self._http.aclose()
            self._http = None
        self._connected = False
        for book in self._books.values():
            book.invalidate()
        self._topics.clear()
        self._stream_consumers.clear()
        self._sent_streams.clear()
        logger.info("binance adapter stopped")

    # ------------------------------------------------------------------
    # status / catalog
    # ------------------------------------------------------------------
    def status(self) -> FeedStatus:
        if not self._started:
            state = FeedState.STOPPED
        elif self._connected:
            state = FeedState.LIVE
        elif self._topics:
            state = FeedState.CONNECTING
        else:
            state = FeedState.STOPPED
        return FeedStatus(
            feed=self.feed_name,
            exchange=self.exchange,
            state=state,
            provenance="live" if self._connected else "unavailable",
            detail=self._detail,
            connected=self._connected,
            last_event_ms=self._last_event_ms,
            events_published=self._events_published,
            invalid_messages=self._invalid_messages,
            reconnects=self._reconnects,
            resnapshots=self._resyncs,
        )

    async def list_symbols(self, query: str | None = None) -> list[SymbolInfo]:
        await self._ensure_catalog()
        items = list(self._catalog.values())
        if query:
            needle = query.strip().upper()
            items = [item for item in items if needle in item.symbol or needle in item.instrument]
        return items

    async def _ensure_catalog(self) -> None:
        if self._catalog_loaded:
            return
        for attempt in range(2):
            try:
                resp = await self._request("GET", "/fapi/v1/exchangeInfo")
                payload = resp.json()
                for row in payload.get("symbols", []):
                    if row.get("contractType") != "PERPETUAL" or row.get("status") != "TRADING":
                        continue
                    instrument = str(row.get("symbol", "")).upper()
                    if not instrument:
                        continue
                    tick_size = None
                    step_size = None
                    for filtr in row.get("filters", []):
                        if filtr.get("filterType") == "PRICE_FILTER":
                            tick_size = _f(filtr.get("tickSize"))
                        elif filtr.get("filterType") == "LOT_SIZE":
                            step_size = _f(filtr.get("stepSize"))
                    self._catalog[instrument] = SymbolInfo(
                        symbol=f"BINANCE:{instrument}",
                        exchange="BINANCE",
                        instrument=instrument,
                        base=str(row.get("baseAsset", "")).upper() or None,
                        quote=str(row.get("quoteAsset", "")).upper() or None,
                        kind="perp",
                        status="trading",
                        tick_size=tick_size,
                        step_size=step_size,
                        price_precision=_i(row.get("pricePrecision")),
                        quantity_precision=_i(row.get("quantityPrecision")),
                    )
                self._catalog_loaded = True
                return
            except Exception as exc:  # pragma: no cover - network dependent
                self._detail = f"exchangeInfo unavailable: {exc}"
                if attempt == 0:
                    await asyncio.sleep(0.5)
        return

    async def _request(self, method: str, path: str, **kwargs) -> httpx.Response:
        if self._http is None:
            raise RuntimeError("adapter not started")
        resp = await self._http.request(method, f"{self._rest_base}{path}", **kwargs)
        resp.raise_for_status()
        return resp

    # ------------------------------------------------------------------
    # topic (un)subscription
    # ------------------------------------------------------------------
    async def subscribe(self, stream: str, instrument: str, param: str | None) -> None:
        if not self._started:
            await self.start()
        instrument = instrument.strip().upper()
        try:
            stream_names = self._stream_names_for(stream, param, instrument)
        except ValueError:
            raise
        key = (stream, instrument, param)
        is_new_topic = key not in self._topics
        newly_added_streams: set[str] = set()
        for name in stream_names:
            if key not in self._stream_consumers.setdefault(name, set()):
                self._stream_consumers[name].add(key)
            if name not in self._sent_streams and name not in newly_added_streams:
                newly_added_streams.add(name)
        self._topics[key] = stream_names

        if self._idle_close_task is not None:
            self._idle_close_task.cancel()
            self._idle_close_task = None
        if self._run_task is None or self._run_task.done():
            self._run_task = asyncio.create_task(self._run(), name="binance-ws")

        if newly_added_streams and self._connected and self._ws is not None:
            await self._send_frame("SUBSCRIBE", sorted(newly_added_streams))

        if is_new_topic:
            await self._warm_start(stream, instrument, param)
        if stream == "book" and (
            instrument not in self._snapshot_publisher_tasks
            or self._snapshot_publisher_tasks[instrument].done()
        ):
            self._snapshot_publisher_tasks[instrument] = asyncio.create_task(
                self._snapshot_publisher_loop(instrument),
                name=f"binance-snap-pub-{instrument}",
            )

    async def unsubscribe(self, stream: str, instrument: str, param: str | None) -> None:
        key = (stream.strip().lower(), instrument.strip().upper(), param)
        stream_names = self._topics.pop(key, set())
        removed_streams: set[str] = set()
        for name in stream_names:
            consumers = self._stream_consumers.get(name)
            if consumers is None:
                continue
            consumers.discard(key)
            if not consumers:
                self._stream_consumers.pop(name, None)
                if name in self._sent_streams or name in removed_streams:
                    removed_streams.add(name)
        if removed_streams and self._connected and self._ws is not None:
            await self._send_frame("UNSUBSCRIBE", sorted(removed_streams))
            self._sent_streams.difference_update(removed_streams)

        instrument_upper = instrument.strip().upper()
        if not any(k[1] == instrument_upper for k in self._topics):
            oi_task = self._oi_tasks.pop(instrument_upper, None)
            if oi_task is not None:
                oi_task.cancel()
            snap_task = self._snapshot_tasks.pop(instrument_upper, None)
            if snap_task is not None:
                snap_task.cancel()
            publisher_task = self._snapshot_publisher_tasks.pop(instrument_upper, None)
            if publisher_task is not None:
                publisher_task.cancel()
            book = self._books.get(instrument_upper)
            if book is not None:
                book.invalidate()

        if not self._topics and self._run_task is not None:
            if self._idle_close_task is None or self._idle_close_task.done():
                self._idle_close_task = asyncio.create_task(self._idle_close(), name="binance-idle-close")

    async def _idle_close(self) -> None:
        await asyncio.sleep(IDLE_CLOSE_GRACE_S)
        if not self._topics:
            run_task = self._run_task
            self._run_task = None
            if run_task is not None:
                run_task.cancel()
            self._detail = "idle: no subscriptions"

    def _stream_names_for(self, stream: str, param: str | None, instrument: str) -> set[str]:
        stream = stream.strip().lower()
        lower = instrument.lower()
        if stream == "candle":
            interval = (param or "1m").strip()
            if interval not in SUPPORTED_INTERVALS:
                raise ValueError(f"unsupported candle interval {interval!r}")
            return {f"{lower}@kline_{interval}"}
        if stream == "open_interest":
            # REST-polled — no WS stream needed.
            return set()
        suffix = _STREAM_TO_BINANCE.get(stream)
        if suffix is None:
            raise ValueError(f"unsupported stream {stream!r} for binance adapter")
        return {f"{lower}@{suffix}"}

    async def _warm_start(self, stream: str, instrument: str, param: str | None) -> None:
        """Publish a warm-start burst (history/last-known) for a fresh topic."""
        try:
            if stream == "trade":
                await self._backfill_trades(instrument)
            elif stream == "candle":
                await self._backfill_candles(instrument, param or "1m")
            elif stream == "quote":
                quote = self._last_quote.get(instrument)
                if quote is not None:
                    self._emit("quote", instrument, quote.model_dump())
            elif stream == "stats":
                stats = self._last_stats.get(instrument)
                if stats is not None:
                    self._emit("stats", instrument, stats.model_dump())
            elif stream == "funding":
                funding = self._last_funding.get(instrument)
                if funding is not None:
                    self._emit("funding", instrument, funding.model_dump())
            elif stream == "open_interest":
                if instrument not in self._oi_tasks or self._oi_tasks[instrument].done():
                    self._oi_tasks[instrument] = asyncio.create_task(
                        self._poll_open_interest(instrument), name=f"binance-oi-{instrument}"
                    )
            elif stream == "book":
                self._books.setdefault(instrument, _BookState(instrument))
                await self._ensure_book_snapshot(instrument)
        except Exception as exc:  # warm start must never break subscription
            logger.debug("binance warm-start %s %s failed: %s", stream, instrument, exc)

    # ------------------------------------------------------------------
    # connection management
    # ------------------------------------------------------------------
    async def _run(self) -> None:
        backoff = CONNECT_BACKOFF_BASE
        try:
            while True:
                if not self._stream_consumers:
                    self._connected = False
                    self._detail = "no streams"
                    return
                streams = sorted(self._stream_consumers.keys())
                url = f"{self._ws_base}/stream?streams={'/'.join(streams)}"
                session_started = time.monotonic()
                try:
                    async with websockets.connect(
                        url, open_timeout=self._request_timeout, close_timeout=5
                    ) as ws:
                        self._ws = ws
                        self._connected = True
                        self._connect_attempts = 0
                        self._connected_at = time.monotonic()
                        self._sent_streams = set(streams)
                        self._detail = None
                        # A reconnect invalidates local book state — resync books.
                        for book in self._books.values():
                            if book.last_update_id is not None or book.synced:
                                book.invalidate()
                        for instrument in {k[1] for k in self._topics if k[0] == "book"}:
                            self._schedule_book_snapshot(instrument)
                        logger.info("binance ws connected (%d streams)", len(streams))
                        await self._read_loop(ws)
                except asyncio.CancelledError:
                    raise
                except Exception as exc:
                    self._detail = f"connection error: {exc}"
                    self._connect_attempts += 1
                    logger.warning("binance ws error: %s", exc)
                finally:
                    self._ws = None
                    self._connected = False
                    self._sent_streams.clear()
                    for book in self._books.values():
                        book.invalidate()
                # A session that lived a while resets the backoff schedule.
                if time.monotonic() - session_started > 60.0:
                    backoff = CONNECT_BACKOFF_BASE
                self._reconnects += 1
                if not self._stream_consumers:
                    return
                await asyncio.sleep(backoff)
                backoff = min(CONNECT_BACKOFF_MAX, backoff * 2)
        except asyncio.CancelledError:
            return

    async def _read_loop(self, ws) -> None:
        assert self._connected_at is not None
        while True:
            remaining = PROACTIVE_CYCLE_S - (time.monotonic() - self._connected_at)
            timeout = max(1.0, min(remaining, 60.0))
            try:
                raw = await asyncio.wait_for(ws.recv(), timeout=timeout)
            except asyncio.TimeoutError:
                if time.monotonic() - self._connected_at >= PROACTIVE_CYCLE_S:
                    logger.info("binance ws proactive 23h cycle reconnect")
                    return
                continue
            self._handle_message(raw)

    def _handle_message(self, raw: Any) -> None:
        try:
            payload = json.loads(raw)
        except (TypeError, ValueError):
            self._invalid_messages += 1
            return
        if not isinstance(payload, dict):
            self._invalid_messages += 1
            return
        # Control frames (subscribe acks) carry "result"/"id".
        if "stream" not in payload or "data" not in payload:
            return
        stream_name = str(payload.get("stream", ""))
        data = payload.get("data")
        if not isinstance(data, dict):
            self._invalid_messages += 1
            return
        try:
            self._dispatch(stream_name, data)
        except Exception:  # never let a bad frame kill the connection
            self._invalid_messages += 1
            logger.debug("binance dispatch failed for %s", stream_name, exc_info=True)

    def _dispatch(self, stream_name: str, data: dict[str, Any]) -> None:
        instrument = stream_name.partition("@")[0].upper()
        # Route on the canonical event type carried by every Binance frame
        # (``data["e"]``) — stream names like ``btcusdt@kline_1m`` or
        # ``btcusdt@depth@100ms`` are not reliable event identifiers.
        event = str(data.get("e") or "")
        if event == "bookTicker":
            self._on_book_ticker(instrument, data)
        elif event == "aggTrade":
            self._on_agg_trade(instrument, data)
        elif event == "kline":
            self._on_kline(instrument, data)
        elif event == "depthUpdate":
            self._on_depth(instrument, data)
        elif event == "forceOrder":
            self._on_force_order(instrument, data)
        elif event == "markPriceUpdate":
            self._on_mark_price(instrument, data)
        elif event == "24hrTicker":
            self._on_ticker(instrument, data)
        else:
            self._invalid_messages += 1

    # ------------------------------------------------------------------
    # stream handlers
    # ------------------------------------------------------------------
    def _on_book_ticker(self, instrument: str, data: dict[str, Any]) -> None:
        bid, bid_qty = _f(data.get("b")), _f(data.get("B"))
        ask, ask_qty = _f(data.get("a")), _f(data.get("A"))
        ts = _i(data.get("T")) or _i(data.get("E")) or utc_now_ms()
        if bid is None and ask is None:
            self._invalid_messages += 1
            return
        quote = Quote(
            symbol=f"BINANCE:{instrument}",
            bid=bid, bid_qty=bid_qty, ask=ask, ask_qty=ask_qty,
            last=None, ts=ts, source_ts=ts,
        )
        self._last_quote[instrument] = quote
        self._emit("quote", instrument, quote.model_dump())

    def _on_agg_trade(self, instrument: str, data: dict[str, Any]) -> None:
        price, qty = _f(data.get("p")), _f(data.get("q"))
        trade_id = _i(data.get("a"))
        ts = _i(data.get("T"))
        if price is None or qty is None or price <= 0 or qty < 0 or trade_id is None or ts is None:
            self._invalid_messages += 1
            return
        # Binance "m": buyer is the maker → aggressor is the seller.
        side = "sell" if bool(data.get("m")) else "buy"
        trade = Trade(
            symbol=f"BINANCE:{instrument}",
            id=str(trade_id), price=price, qty=qty, side=side, ts=ts,  # type: ignore[arg-type]
        )
        ring = self._recent_trades.setdefault(instrument, [])
        ring.append(trade)
        if len(ring) > 200:
            del ring[:-200]
        self._emit("trade", instrument, trade.model_dump())

    def _on_kline(self, instrument: str, data: dict[str, Any]) -> None:
        k = data.get("k")
        if not isinstance(k, dict):
            self._invalid_messages += 1
            return
        open_time, close_time = _i(k.get("t")), _i(k.get("T"))
        o, h, l, c, v = _f(k.get("o")), _f(k.get("h")), _f(k.get("l")), _f(k.get("c")), _f(k.get("v"))
        if None in (open_time, close_time, o, h, l, c, v):
            self._invalid_messages += 1
            return
        interval = str(k.get("i") or "1m")
        candle = Candle(
            symbol=f"BINANCE:{instrument}", interval=interval,
            open_time=open_time, close_time=close_time,
            open=o, high=h, low=l, close=c, volume=v,
            closed=bool(k.get("x")), trade_count=_i(k.get("n")),
        )
        self._candle_tails[(instrument, interval)] = candle
        self._emit("candle", instrument, candle.model_dump(), param=interval)

    def _on_ticker(self, instrument: str, data: dict[str, Any]) -> None:
        stats = MarketStats(
            symbol=f"BINANCE:{instrument}",
            last=_f(data.get("c")),
            change_pct_24h=_f(data.get("P")),
            high_24h=_f(data.get("h")),
            low_24h=_f(data.get("l")),
            volume_24h=_f(data.get("v")),
            quote_volume_24h=_f(data.get("q")),
            trade_count_24h=_i(data.get("n")),
            ts=_i(data.get("E")) or utc_now_ms(),
        )
        self._last_stats[instrument] = stats
        self._emit("stats", instrument, stats.model_dump())

    def _on_mark_price(self, instrument: str, data: dict[str, Any]) -> None:
        rate = _f(data.get("r"))
        ts = _i(data.get("E")) or utc_now_ms()
        if rate is None:
            self._invalid_messages += 1
            return
        funding = Funding(
            symbol=f"BINANCE:{instrument}",
            funding_rate=rate,
            next_funding_ms=_i(data.get("T")),
            mark_price=_f(data.get("p")),
            index_price=_f(data.get("i")),
            ts=ts,
        )
        self._last_funding[instrument] = funding
        self._emit("funding", instrument, funding.model_dump())

    def _on_force_order(self, instrument: str, data: dict[str, Any]) -> None:
        order = data.get("o")
        if not isinstance(order, dict):
            self._invalid_messages += 1
            return
        price, qty = _f(order.get("p")), _f(order.get("q"))
        ts = _i(order.get("T"))
        if price is None or qty is None or ts is None:
            self._invalid_messages += 1
            return
        side_raw = str(order.get("S", "")).upper()
        side = "sell" if side_raw == "SELL" else "buy" if side_raw == "BUY" else None
        if side is None:
            self._invalid_messages += 1
            return
        liquidation = Liquidation(
            symbol=f"BINANCE:{instrument}",
            side=side,  # type: ignore[arg-type]
            price=price, qty=qty, ts=ts,
            order_id=str(order.get("i") or "") or None,
        )
        self._emit("liquidation", instrument, liquidation.model_dump())

    # ------------------------------------------------------------------
    # depth / book maintenance
    # ------------------------------------------------------------------
    def _on_depth(self, instrument: str, data: dict[str, Any]) -> None:
        book = self._books.get(instrument)
        if book is None:
            return  # depth frames for an unsubscribed instrument: ignore
        if data.get("e") != "depthUpdate":
            self._invalid_messages += 1
            return
        first, final = _i(data.get("U")), _i(data.get("u"))
        prev_final = _i(data.get("pu"))
        ts = _i(data.get("E")) or utc_now_ms()
        if first is None or final is None:
            self._invalid_messages += 1
            return

        if not book.synced:
            book.pending.append(data)
            self._ensure_book_snapshot(instrument)
            return

        if prev_final is not None and book.last_update_id is not None and prev_final != book.last_update_id:
            self._resync(instrument, "pu mismatch")
            return
        if book.last_update_id is not None and first > book.last_update_id + 1:
            self._resync(instrument, "sequence gap")
            return
        if final <= (book.last_update_id or 0):
            return  # stale diff, already covered by snapshot

        self._apply_diff(instrument, data, ts)

    def _apply_diff(self, instrument: str, data: dict[str, Any], ts: int) -> None:
        book = self._books[instrument]
        bids = self._parse_levels(data.get("b"))
        asks = self._parse_levels(data.get("a"))
        if bids is None or asks is None:
            self._invalid_messages += 1
            return
        self._apply_levels(book, bids, asks)
        book.last_update_id = _i(data.get("u")) or book.last_update_id
        book.dirty = True
        delta = BookDelta(
            symbol=f"BINANCE:{instrument}",
            first_update_id=_i(data.get("U")) or 0,
            final_update_id=_i(data.get("u")) or 0,
            prev_final_update_id=_i(data.get("pu")),
            bids=bids, asks=asks, ts=ts,
        )
        self._emit("book_delta", instrument, delta.model_dump())
        now = utc_now_ms()
        if book.synced and now - book.last_published_ms >= SNAPSHOT_PUBLISH_MS:
            self._publish_book_snapshot(instrument)

    @staticmethod
    def _parse_levels(rows: Any) -> list[BookLevel] | None:
        if not isinstance(rows, list):
            return None
        out: list[BookLevel] = []
        for row in rows:
            if not isinstance(row, (list, tuple)) or len(row) < 2:
                return None
            price, qty = _f(row[0]), _f(row[1])
            if price is None or qty is None or price <= 0:
                return None
            out.append(BookLevel(price=price, qty=qty))
        return out

    def _apply_levels(self, book: _BookState, bids: list[BookLevel], asks: list[BookLevel]) -> None:
        for level in bids:
            if level.qty <= 0:
                book.bids.pop(level.price, None)
            else:
                book.bids[level.price] = level.qty
        for level in asks:
            if level.qty <= 0:
                book.asks.pop(level.price, None)
            else:
                book.asks[level.price] = level.qty
        if len(book.bids) > MAX_BOOK_LEVELS:
            # keep the highest bids (closest to mid and beyond)
            keep = sorted(book.bids, reverse=True)[:MAX_BOOK_LEVELS]
            book.bids = {price: book.bids[price] for price in keep}
        if len(book.asks) > MAX_BOOK_LEVELS:
            # keep the lowest asks
            keep = sorted(book.asks)[:MAX_BOOK_LEVELS]
            book.asks = {price: book.asks[price] for price in keep}

    def _resync(self, instrument: str, reason: str) -> None:
        book = self._books.get(instrument)
        if book is None:
            return
        now = time.monotonic()
        if book.snapshot_in_flight or now - book.last_resync_at < RESYNC_COOLDOWN_S:
            return
        book.invalidate()
        book.last_resync_at = now
        self._resyncs += 1
        logger.debug("binance book resync %s (%s)", instrument, reason)
        self._ensure_book_snapshot(instrument)

    def _schedule_book_snapshot(self, instrument: str) -> None:
        self._ensure_book_snapshot(instrument)

    def _ensure_book_snapshot(self, instrument: str) -> None:
        book = self._books.get(instrument)
        if book is None or book.snapshot_in_flight or book.synced:
            return
        book.snapshot_in_flight = True
        task = asyncio.create_task(self._fetch_book_snapshot(instrument), name=f"binance-snap-{instrument}")
        self._snapshot_tasks[instrument] = task

    async def _fetch_book_snapshot(self, instrument: str) -> None:
        book = self._books.get(instrument)
        if book is None:
            return
        fetch_epoch = book.epoch
        try:
            resp = await self._request(
                "GET", "/fapi/v1/depth", params={"symbol": instrument, "limit": min(MAX_BOOK_LEVELS, 500)}
            )
            if book.epoch != fetch_epoch:
                # Invalidated (reconnect/gap) while fetching — a new snapshot
                # task owns this book now; applying ours could revert fresher
                # state. Discard.
                return
            payload = resp.json()
            last_update_id = _i(payload.get("lastUpdateId"))
            bids = self._parse_levels(payload.get("bids"))
            asks = self._parse_levels(payload.get("asks"))
            if last_update_id is None or bids is None or asks is None:
                self._invalid_messages += 1
                book.invalidate()
                return
            book.bids = {level.price: level.qty for level in bids}
            book.asks = {level.price: level.qty for level in asks}
            book.last_update_id = last_update_id
            book.synced = True
            book.dirty = True
            # Replay buffered diffs that arrived while fetching the snapshot.
            pending, book.pending = book.pending, []
            for diff in pending:
                final = _i(diff.get("u"))
                if final is not None and final <= last_update_id:
                    continue
                self._apply_diff(instrument, diff, _i(diff.get("E")) or utc_now_ms())
            self._publish_book_snapshot(instrument)
        except asyncio.CancelledError:
            book.snapshot_in_flight = False
            raise
        except Exception as exc:
            book.snapshot_in_flight = False
            book.synced = False
            logger.warning("binance depth snapshot %s failed: %s", instrument, exc)
            await asyncio.sleep(1.0)
            book.snapshot_in_flight = False
            if any(k[0] == "book" and k[1] == instrument for k in self._topics):
                self._ensure_book_snapshot(instrument)
        finally:
            book.snapshot_in_flight = False
            self._snapshot_tasks.pop(instrument, None)

    def _publish_book_snapshot(self, instrument: str) -> None:
        book = self._books.get(instrument)
        if book is None or not book.synced:
            return
        bids, asks = book.top_levels(MAX_BOOK_LEVELS)
        snapshot = BookSnapshot(
            symbol=f"BINANCE:{instrument}",
            bids=bids, asks=asks,
            last_update_id=book.last_update_id, ts=utc_now_ms(),
        )
        book.last_published_ms = snapshot.ts
        book.dirty = False
        self._emit("book_snapshot", instrument, snapshot.model_dump())

    async def _snapshot_publisher_loop(self, instrument: str) -> None:
        """Periodically re-publish book snapshots while a book topic is active.

        Self-healing for consumers that dropped deltas (bounded bus queues):
        a fresh snapshot every SNAPSHOT_PUBLISH_MS realigns state even when
        no further diffs would trigger publication.
        """
        try:
            while any(k[0] == "book" and k[1] == instrument for k in self._topics):
                await asyncio.sleep(SNAPSHOT_PUBLISH_MS / 1000.0)
                book = self._books.get(instrument)
                if book is not None and book.synced and book.dirty:
                    self._publish_book_snapshot(instrument)
        except asyncio.CancelledError:
            return

    # ------------------------------------------------------------------
    # REST backfill / polling
    # ------------------------------------------------------------------
    async def _backfill_trades(self, instrument: str) -> None:
        try:
            resp = await self._request(
                "GET", "/fapi/v1/aggTrades", params={"symbol": instrument, "limit": 500}
            )
            rows = resp.json()
            if not isinstance(rows, list):
                return
            for row in rows:
                price, qty = _f(row.get("p")), _f(row.get("q"))
                trade_id, ts = _i(row.get("a")), _i(row.get("T"))
                if None in (price, qty, trade_id, ts):
                    continue
                trade = Trade(
                    symbol=f"BINANCE:{instrument}",
                    id=str(trade_id), price=price or 0.0, qty=qty or 0.0,
                    side="sell" if bool(row.get("m")) else "buy",  # type: ignore[arg-type]
                    ts=ts or utc_now_ms(),
                )
                ring = self._recent_trades.setdefault(instrument, [])
                ring.append(trade)
                if len(ring) > 200:
                    del ring[:-200]
                self._emit("trade", instrument, trade.model_dump())
        except Exception as exc:
            logger.debug("aggTrades backfill %s failed: %s", instrument, exc)

    async def _backfill_candles(self, instrument: str, interval: str) -> None:
        try:
            resp = await self._request(
                "GET", "/fapi/v1/klines", params={"symbol": instrument, "interval": interval, "limit": 500}
            )
            rows = resp.json()
            if not isinstance(rows, list):
                return
            for row in rows:
                if not isinstance(row, list) or len(row) < 7:
                    continue
                open_time, close_time = _i(row[0]), _i(row[6])
                o, h, l, c, v = _f(row[1]), _f(row[2]), _f(row[3]), _f(row[4]), _f(row[5])
                if None in (open_time, close_time, o, h, l, c, v):
                    continue
                candle = Candle(
                    symbol=f"BINANCE:{instrument}", interval=interval,
                    open_time=open_time, close_time=close_time,
                    open=o or 0.0, high=h or 0.0, low=l or 0.0, close=c or 0.0,
                    volume=v or 0.0, closed=True, trade_count=_i(row[8]) if len(row) > 8 else None,
                )
                self._emit("candle", instrument, candle.model_dump(), param=interval)
        except Exception as exc:
            logger.debug("klines backfill %s failed: %s", instrument, exc)

    async def _poll_open_interest(self, instrument: str) -> None:
        try:
            while any(k[0] == "open_interest" and k[1] == instrument for k in self._topics):
                try:
                    resp = await self._request(
                        "GET", "/fapi/v1/openInterest", params={"symbol": instrument}
                    )
                    payload = resp.json()
                    oi = _f(payload.get("openInterest"))
                    if oi is None:
                        self._invalid_messages += 1
                    else:
                        funding = self._last_funding.get(instrument)
                        mark = funding.mark_price if funding is not None else None
                        item = OpenInterest(
                            symbol=f"BINANCE:{instrument}",
                            open_interest=oi,
                            open_interest_usd=(oi * mark) if mark is not None else None,
                            ts=utc_now_ms(),
                        )
                        self._last_oi[instrument] = item
                        self._emit("open_interest", instrument, item.model_dump())
                except Exception:
                    pass
                await asyncio.sleep(30.0)
        except asyncio.CancelledError:
            return

    async def _send_frame(self, method: str, params: list[str]) -> None:
        ws = self._ws
        if ws is None:
            return
        frame = json.dumps({"method": method, "params": params, "id": int(time.time() * 1000) % 10**9})
        await ws.send(frame)
        if method == "SUBSCRIBE":
            self._sent_streams.update(params)

    # ------------------------------------------------------------------
    # emit
    # ------------------------------------------------------------------
    def _emit(self, stream: str, instrument: str, data: dict[str, Any], param: str | None = None) -> None:
        if stream == "candle":
            topic = build_topic("candle", f"BINANCE:{instrument}", param)
        else:
            topic = build_topic(stream, f"BINANCE:{instrument}")
        envelope = Envelope(
            topic=topic,
            type=stream,
            symbol=f"BINANCE:{instrument}",
            data=data,
            provenance="live",
            source="binance",
            ts=utc_now_ms(),
        )
        self._events_published += 1
        self._last_event_ms = envelope.ts
        self._publisher(envelope)

    # ------------------------------------------------------------------
    # cache readers (used by REST routes)
    # ------------------------------------------------------------------
    def get_quote(self, instrument: str) -> Quote | None:
        return self._last_quote.get(instrument)

    def get_book(self, instrument: str, levels: int) -> BookSnapshot | None:
        book = self._books.get(instrument)
        if book is None or not book.synced:
            return None
        bids, asks = book.top_levels(levels)
        return BookSnapshot(
            symbol=f"BINANCE:{instrument}", bids=bids, asks=asks,
            last_update_id=book.last_update_id, ts=utc_now_ms(),
        )

    def get_trades(self, instrument: str, limit: int) -> list[Trade]:
        ring = self._recent_trades.get(instrument, [])
        return list(ring[-limit:])

    def get_funding(self, instrument: str) -> Funding | None:
        return self._last_funding.get(instrument)

    def get_open_interest(self, instrument: str) -> OpenInterest | None:
        return self._last_oi.get(instrument)
