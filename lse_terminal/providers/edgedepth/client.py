"""EdgeDepth gateway client (F1/E0, Phase 0).

Real Binance USD-M futures orderflow through a self-hosted
``edgedepth-gateway`` (MIT). Wire contract: ``wire.py`` + the vendored proto
at ``third_party/edgedepth-gateway/``. EdgeDepth is owned by the user's
company, so the gateway runs as-is and the terminal's published rendering
semantics are ported faithfully on top of this feed.

Behaviour contract (from the gateway source, internal/hub + internal/wire):

- data frames: one binary WebSocket frame per ``WSPayload``;
- control frames: JSON TEXT keyed on ``"method"``;
- the gateway emits a fresh ORDERBOOK SNAPSHOT on every subscribe, so a
  sequence gap is healed by re-subscribing the symbol's book stream;
- trades carry the exchange-stamped taker side (``is_buy``), so prints are
  BUY/SELL, never INFERRED.

Testing seam: ``_connect`` is the ONLY socket touchpoint. The pump — sequence
checks, event translation, reconnect/resubscribe orchestration — is driven in
tests by a fake socket, no network.
"""

from __future__ import annotations

import asyncio
import json
import logging

from lse_terminal.engine.datadiag import diag as _diag
import time
from dataclasses import dataclass, field
from typing import AsyncIterator, List, Optional

from lse_terminal.contracts import (
    DEPTH_DELTA,
    DEPTH_SNAPSHOT,
    TRADE_BUY,
    TRADE_SELL,
    DepthEvent,
    TradeEvent,
)

from . import wire
from .wire import (
    STREAM_CANDLES,
    STREAM_HISTORICAL_CANDLES,
    STREAM_LIQUIDATIONS,
    STREAM_ORDERBOOK,
    STREAM_STATS,
    STREAM_TICKER24H,
    STREAM_TRADES,
    BookUpdate,
    Candle,
    parse_book_update,
    parse_candle_singular,
    parse_candles,
    parse_liquidation,
    parse_stats,
    parse_ticker24h,
    parse_trade,
    parse_ws_payload,
)

log = logging.getLogger("lse_terminal")

DEFAULT_URL = "ws://127.0.0.1:8080/ws"

# The venue id the gateway's Binance adapter reports
# (internal/binance/adapter.go — `ID() string { return "binancef" }`). The
# hub keys every subscription on (exchange, symbol) and IGNORES unknown
# venues, so subscribing with the wrong id receives nothing at all. This was
# "binance" here before the real binary was wired in; the actual hub would
# have dropped every subscription silently.
EXCHANGE = "binancef"


def _norm(symbol: str) -> str:
    """The gateway is Binance USD-M: symbols live lowercase on its wire
    (whitelist built from exchangeInfo lowercased; the hub IGNORES any
    symbol casing it doesn't recognise — discovered against the real binary:
    subscribing 'BTCUSDT' is silently rejected, 'btcusdt' works). Events
    carrying the subscription symbol must therefore be re-keyed to the
    caller's canonical symbol on their way back into the app, so the
    protocol casing never leaks upward."""
    return symbol.lower()


def gateway_url() -> str:
    """The ws URL of the gateway this client should talk to. External URL
    (EDGEDEPTH_GATEWAY_URL) always wins; otherwise the engine-managed local
    gateway's addr/path (lse_terminal/engine/gateway.py)."""
    from lse_terminal.engine.gateway import supervisor
    return supervisor().ws_url()


def ensure_gateway() -> None:
    """Managed mode: bring the local gateway up (start+health-check) before
    the client tries to connect; external mode: nothing to manage.

    Raises GatewayUnavailable with a concrete, user-displayable reason
    ("no executable", "port occupied", "crashed N times: <log tail>", ...)
    exactly once per attempt — never a silent hang.
    """
    from lse_terminal.engine.gateway import supervisor
    sup = supervisor()
    if sup.mode() == "managed":
        sup.ensure_running()


# ============================================================================
# book synchronisation (Binance update-id semantics, as relayed by the gateway)
# ============================================================================


class BookSync:
    """Per-symbol continuity state over BookUpdate ids.

    A delta is applicable when it continues our last applied update:
    ``previous_update_id == last`` (the gateway echoes Binance's ``U-1``), or
    our last sits inside [first, last] (we missed nothing). Anything else is a
    gap; the heal is a re-subscribe, because the gateway answers every
    subscribe with a fresh snapshot.
    """

    AWAIT = "await_snapshot"
    LIVE = "live"

    def __init__(self, symbol: str):
        self.symbol = symbol
        self.state = self.AWAIT
        self.last_update_id = 0

    def ingest(self, u: BookUpdate) -> str:
        if u.snapshot:
            self.state = self.LIVE
            self.last_update_id = u.last_update_id
            return DEPTH_SNAPSHOT
        if self.state != self.LIVE:
            return "stale"
        contiguous = (
            u.previous_update_id == self.last_update_id
            or u.first_update_id <= self.last_update_id + 1 <= u.last_update_id
        )
        if contiguous:
            self.last_update_id = u.last_update_id
            return DEPTH_DELTA
        self.state = self.AWAIT
        return "resync"


# ============================================================================
# normalized LSE-side events (the gateway's streams in this app's own types)
# ============================================================================


@dataclass(frozen=True)
class CandleEvent:
    symbol: str
    ts: float
    timeframe_s: int
    open: float
    high: float
    low: float
    close: float
    volume: float
    final: bool


@dataclass(frozen=True)
class StatEvent:
    symbol: str
    ts: float
    timeframe_s: int
    mark_price: float
    funding: float
    open_interest_usd: float
    next_funding_ms: int
    trade_buy: int
    trade_sell: int
    liq_total_usd: float
    final: bool


@dataclass(frozen=True)
class LiquidationEvent:
    symbol: str
    ts: float
    price: float
    avg_price: float
    qty: float
    is_buy: bool


@dataclass(frozen=True)
class Ticker24hBatch:
    ts: float
    entries: list = field(default_factory=list)


# ============================================================================
# client
# ============================================================================


class EdgeDepthClient:
    def __init__(self, url: Optional[str] = None, backoff_base: float = 1.0,
                 backoff_cap: float = 30.0):
        self.url = url or gateway_url()
        self.backoff_base = backoff_base
        self.backoff_cap = backoff_cap
        # Tests bound the reconnect loop; production reconnects forever.
        self.max_reconnects: Optional[int] = None

    # -- socket seam ---------------------------------------------------------

    async def _connect(self):
        import websockets  # core dependency; import kept local like ccxt's
        return await websockets.connect(
            self.url, max_size=16 * 1024 * 1024, open_timeout=8)

    async def _subscribe(self, ws, symbol: str, stream: int,
                         timeframe: int = 0, **extra) -> None:
        await ws.send(wire.subscribe_message(
            EXCHANGE, symbol, stream, timeframe=timeframe, **extra))

    async def _unsubscribe(self, ws, symbol: str, stream: int,
                           timeframe: int = 0) -> None:
        await ws.send(wire.unsubscribe_message(EXCHANGE, symbol, stream,
                                               timeframe=timeframe))

    # -- live depth + trades pump ---------------------------------------------

    async def depth_stream(self, symbols: List[str]) -> AsyncIterator:
        """SNAPSHOT per symbol first (as the gateway delivers it), then DELTAs
        and TradeEvents in arrival order. Reconnects with capped exponential
        backoff, re-subscribing everything on every new socket."""
        attempt = 0
        while True:
            try:
                async for ev in self._pump_once(list(symbols)):
                    attempt = 0  # a delivered event proves the socket healthy
                    yield ev
                # socket closed cleanly: fall through to reconnect
            except asyncio.CancelledError:
                raise
            except Exception as exc:  # noqa: BLE001 — feed errors never kill pane
                log.warning("edgedepth feed error: %s", exc)
            attempt += 1
            if self.max_reconnects is not None and attempt > self.max_reconnects:
                raise ConnectionError(
                    f"edgedepth gateway unreachable after {attempt} attempts "
                    f"({self.url})")
            delay = min(self.backoff_cap,
                        self.backoff_base * (2 ** min(attempt, 6)))
            log.info("edgedepth reconnect in %.1fs (attempt %d)", delay, attempt)
            await asyncio.sleep(delay)

    async def _pump_once(self, symbols: List[str]) -> AsyncIterator:
        ws = await self._connect()
        try:
            wire_syms = {_norm(s): s for s in symbols}   # wire -> canonical
            books = {w: BookSync(canon) for w, canon in wire_syms.items()}
            for w in wire_syms:
                await self._subscribe(ws, w, STREAM_ORDERBOOK)
                await self._subscribe(ws, w, STREAM_TRADES)
            async for raw in ws:
                if isinstance(raw, str):
                    continue  # control plane echoes; nothing to act on yet
                payload = parse_ws_payload(bytes(raw))
                wire_sym = payload.symbol
                book = books.get(wire_sym)
                if book is None:
                    continue
                symbol = book.symbol
                if payload.stream == STREAM_ORDERBOOK:
                    update = parse_book_update(payload.data)
                    kind = book.ingest(update)
                    if kind == "resync":
                        log.warning("edgedepth %s sequence gap "
                                    "(last=%d got first=%d): re-subscribing",
                                    symbol, book.last_update_id,
                                    update.first_update_id)
                        await self._subscribe(ws, wire_sym, STREAM_ORDERBOOK)
                        continue
                    if kind == "stale":
                        continue
                    _diag.observe("edgedepth", symbol,
                                  update.timestamp_ms / 1000.0, kind="book")
                    yield DepthEvent(
                        symbol=symbol,
                        ts=update.timestamp_ms / 1000.0,
                        type=kind,
                        bids=[(lv.price, lv.size) for lv in update.bids],
                        asks=[(lv.price, lv.size) for lv in update.asks],
                    )
                elif payload.stream == STREAM_TRADES:
                    t = parse_trade(payload.data)
                    _diag.observe("edgedepth", symbol,
                                  t.timestamp_ms / 1000.0, kind="trade")
                    yield TradeEvent(
                        symbol=symbol,
                        ts=t.timestamp_ms / 1000.0,
                        price=t.price,
                        size=t.qty,
                        side=TRADE_BUY if t.is_buy else TRADE_SELL,
                    )
        finally:
            try:
                await ws.close()
            except Exception:  # noqa: BLE001
                pass

    # -- full normalized feed (book/trades/candles/stats/liquidations) ---------

    async def feed_stream(self, symbol: str,
                          candle_tf_s: int = 60) -> AsyncIterator:
        """One multiplexed pump for all per-symbol live streams, normalized
        to LSE event dataclasses:

            DepthEvent   (SNAPSHOT first, DELTAs; resync = fresh SNAPSHOT)
            TradeEvent   (exchange-stamped aggressor side)
            CandleEvent  (live STREAM_CANDLES, singular Candle — trade-built)
            StatEvent    (mark/funding/OI/next-funding, trade counts, liq $)
            LiquidationEvent

        Reconnect semantics mirror depth_stream: capped exponential backoff,
        everything re-subscribed on the new socket, and the book resyncs from
        a fresh gateway snapshot after every gap — depth is never knowingly
        shown corrupt (the client treats any sequence loss as STALE, not
        LIVE, until the next SNAPSHOT).
        """
        attempt = 0
        while True:
            try:
                async for ev in self._feed_pump_once(symbol, candle_tf_s):
                    attempt = 0
                    yield ev
            except asyncio.CancelledError:
                raise
            except Exception as exc:  # noqa: BLE001
                log.warning("edgedepth feed %s error: %s", symbol, exc)
            attempt += 1
            if (self.max_reconnects is not None
                    and attempt > self.max_reconnects):
                raise ConnectionError(
                    f"edgedepth gateway unreachable after {attempt} attempts "
                    f"({self.url})")
            delay = min(self.backoff_cap,
                        self.backoff_base * (2 ** min(attempt, 6)))
            await asyncio.sleep(delay)

    async def _feed_pump_once(self, symbol: str,
                              candle_tf_s: int) -> AsyncIterator:
        ws = await self._connect()
        try:
            w = _norm(symbol)   # wire casing; events keep the canonical name
            book = BookSync(symbol)
            await self._subscribe(ws, w, STREAM_ORDERBOOK)
            await self._subscribe(ws, w, STREAM_TRADES)
            if candle_tf_s:
                await self._subscribe(ws, w, STREAM_CANDLES,
                                      timeframe=candle_tf_s)
                await self._subscribe(ws, w, STREAM_STATS,
                                      timeframe=candle_tf_s)
            await self._subscribe(ws, w, STREAM_LIQUIDATIONS)
            async for raw in ws:
                if isinstance(raw, str):
                    continue
                payload = parse_ws_payload(bytes(raw))
                if payload.symbol != w:
                    continue
                if payload.stream == STREAM_ORDERBOOK:
                    update = parse_book_update(payload.data)
                    kind = book.ingest(update)
                    if kind == "resync":
                        log.warning("edgedepth %s sequence gap: re-subscribing",
                                    symbol)
                        await self._subscribe(ws, w, STREAM_ORDERBOOK)
                        continue
                    if kind == "stale":
                        continue
                    _diag.observe("edgedepth", symbol,
                                  update.timestamp_ms / 1000.0, kind="book")
                    yield DepthEvent(
                        symbol=symbol, ts=update.timestamp_ms / 1000.0,
                        type=kind,
                        bids=[(lv.price, lv.size) for lv in update.bids],
                        asks=[(lv.price, lv.size) for lv in update.asks])
                elif payload.stream == STREAM_TRADES:
                    t = parse_trade(payload.data)
                    _diag.observe("edgedepth", symbol,
                                  t.timestamp_ms / 1000.0, kind="trade")
                    yield TradeEvent(
                        symbol=symbol, ts=t.timestamp_ms / 1000.0,
                        price=t.price, size=t.qty,
                        side=TRADE_BUY if t.is_buy else TRADE_SELL)
                elif payload.stream == STREAM_CANDLES:
                    c = parse_candle_singular(payload.data)
                    yield CandleEvent(
                        symbol=symbol, ts=c.timestamp_ms / 1000.0,
                        timeframe_s=c.timeframe, open=c.open, high=c.high,
                        low=c.low, close=c.close, volume=c.volume,
                        final=c.final)
                elif payload.stream == STREAM_STATS:
                    _tf, stats = parse_stats(payload.data)
                    for s in stats:
                        yield StatEvent(
                            symbol=symbol, ts=s.timestamp_ms / 1000.0,
                            timeframe_s=s.timeframe,
                            mark_price=s.mark_price, funding=s.funding,
                            open_interest_usd=s.open_interest_usd,
                            next_funding_ms=s.next_funding_time,
                            trade_buy=s.trade_buy, trade_sell=s.trade_sell,
                            liq_total_usd=s.liq_total_usd, final=s.final)
                elif payload.stream == STREAM_LIQUIDATIONS:
                    l = parse_liquidation(payload.data)
                    yield LiquidationEvent(
                        symbol=symbol, ts=l.timestamp_ms / 1000.0,
                        price=l.price, avg_price=l.avg_price, qty=l.qty,
                        is_buy=l.is_buy)
        finally:
            try:
                await ws.close()
            except Exception:  # noqa: BLE001
                pass

    # -- all-market 24h ticker (watchlist feed) --------------------------------

    async def ticker24h_stream(self) -> AsyncIterator[Ticker24hBatch]:
        """Global 24h ticker batches (stream 29, pair symbol="global").

        The gateway runs one shared upstream per venue and serves REST when
        the stream is unreachable, so batches also arrive on networks where
        !ticker@arr is blocked — freshness degrades to a labelled 30s poll
        upstream, never stale-by-silence."""
        attempt = 0
        while True:
            ws = None
            try:
                ws = await self._connect()
                await self._subscribe(ws, "global", STREAM_TICKER24H)
                async for raw in ws:
                    if isinstance(raw, str):
                        continue
                    payload = parse_ws_payload(bytes(raw))
                    if payload.stream != STREAM_TICKER24H:
                        continue
                    upd = parse_ticker24h(payload.data)
                    yield Ticker24hBatch(ts=upd.timestamp_ms / 1000.0,
                                         entries=list(upd.entries))
                    attempt = 0
            except asyncio.CancelledError:
                raise
            except Exception as exc:  # noqa: BLE001
                log.warning("edgedepth ticker24h error: %s", exc)
            finally:
                if ws is not None:
                    try:
                        await ws.close()
                    except Exception:  # noqa: BLE001
                        pass
            attempt += 1
            if (self.max_reconnects is not None
                    and attempt > self.max_reconnects):
                raise ConnectionError(
                    f"edgedepth gateway unreachable after {attempt} attempts "
                    f"({self.url})")
            delay = min(self.backoff_cap,
                        self.backoff_base * (2 ** min(attempt, 6)))
            await asyncio.sleep(delay)

    # -- historical candles (stream 8) -----------------------------------------

    async def fetch_candles(self, symbol: str, timeframe_s: int,
                            limit: int = 500,
                            end_ms: Optional[int] = None) -> List[Candle]:
        """One short-lived socket: `get_historical_candles` request -> first
        matching Candles frame -> close.

        hub/client.go routes on the METHOD name: historical candles are NOT
        a subscription — sending `subscribe` with stream 8 merely starts the
        upstream feed and answers nothing. This was the second protocol bug
        the real-binary integration surfaced (the first was the venue id);
        both are pinned by the e2e against the actual gateway."""
        ws = await self._connect()
        try:
            w = _norm(symbol)
            now_ms = int(time.time() * 1000)
            await ws.send(wire.control_message(
                "get_historical_candles", EXCHANGE, w,
                stream=STREAM_HISTORICAL_CANDLES, timeframe=timeframe_s,
                count=int(limit), end_time=int(end_ms or now_ms),
                start_time=0))
            deadline = time.monotonic() + 12.0
            async for raw in ws:
                if time.monotonic() > deadline:
                    break
                if isinstance(raw, str):
                    continue
                payload = parse_ws_payload(bytes(raw))
                if (payload.symbol != w
                        or payload.stream != STREAM_HISTORICAL_CANDLES):
                    continue
                _tf, values = parse_candles(payload.data)
                # Candle rows carry no symbol; the caller knows what it asked.
                return values
            return []
        finally:
            try:
                await ws.close()
            except Exception:  # noqa: BLE001
                pass
