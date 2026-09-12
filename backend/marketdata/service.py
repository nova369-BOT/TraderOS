"""Unified market-data service.

Single source of truth for normalized market state (protocol §13/§30):

    adapter (binance / simulator / bridges)
        → normalization (envelope model)
        → this service (caches + ref-counted topics)
        → event bus (fan-out)
        → consumers (REST / WS / future chart & order-flow modules)

Modes (``MARKETDATA_MODE``):
- ``auto``       — try live Binance; if unreachable within the fallback
                   grace window, serve those topics from the labeled
                   simulator (provenance always explicit). (default)
- ``binance``    — live only, no simulator fallback.
- ``simulated``  — simulator only (offline development).
- ``off``        — foundation disabled.

The service also bridges legacy feeds into the same envelope model:
- ``MarketDataHub`` ticks → ``quote:{market}:{symbol}`` envelopes;
- ``USTickStreamService`` trades → ``trade:US:{symbol}`` envelopes.
Bridges are read-only taps: existing consumers keep working unchanged.
"""

from __future__ import annotations

import asyncio
import logging
import os
from collections import deque
from typing import Any

from backend.marketdata.adapters.binance import BinanceFuturesAdapter
from backend.marketdata.adapters.simulated import SimulatedAdapter
from backend.marketdata.bus import MarketEventBus, Subscription
from backend.marketdata.symbols import split_canonical
from backend.marketdata.types import (
    BookSnapshot,
    Candle,
    Envelope,
    FeedState,
    FeedStatus,
    Quote,
    Trade,
    parse_topic,
)

logger = logging.getLogger(__name__)

MAX_QUOTE_CACHE = 5_000
MAX_TRADE_RING = 600
MAX_CANDLE_RING = 600
MAX_LIQUIDATION_RING = 200
WATCHDOG_INTERVAL_S = 5.0


def _env_mode() -> str:
    return os.getenv("MARKETDATA_MODE", "auto").strip().lower()


def _env_fallback_grace() -> float:
    try:
        return float(os.getenv("MARKETDATA_FALLBACK_GRACE", "20"))
    except ValueError:
        return 20.0


def _fallback_enabled() -> bool:
    if _env_mode() in {"binance", "off", "simulated"}:
        return False
    return os.getenv("MARKETDATA_FALLBACK_SIM", "1").strip().lower() not in {"0", "false", "no"}


class MarketDataService:
    def __init__(self) -> None:
        self.bus = MarketEventBus()
        self._binance: BinanceFuturesAdapter | None = None
        self._sim: SimulatedAdapter | None = None
        # Fallback coverage instance: emits under the BINANCE topic namespace
        # (same consumer code paths) while every event stays labeled simulated.
        self._binance_sim: SimulatedAdapter | None = None
        self._topic_refs: dict[str, int] = {}
        #: topic → adapter name currently serving it ("binance" | "simulator")
        self._topic_source: dict[str, str] = {}
        self._fallback_tasks: dict[str, asyncio.Task] = {}
        self._watchdog_task: asyncio.Task | None = None
        self._started = False
        self._mode = _env_mode()
        self._fallback_grace = _env_fallback_grace()
        self._watchdog_interval = float(os.getenv("MARKETDATA_WATCHDOG_INTERVAL", str(WATCHDOG_INTERVAL_S)))
        self._bridges_installed = False
        # caches (bounded)
        self._quotes: dict[str, Quote] = {}
        self._books: dict[str, BookSnapshot] = {}
        self._trades: dict[str, deque[Trade]] = {}
        self._candles: dict[tuple[str, str], deque[Candle]] = {}
        self._liquidations: deque[dict[str, Any]] = deque(maxlen=MAX_LIQUIDATION_RING)
        self._funding: dict[str, dict[str, Any]] = {}
        self._open_interest: dict[str, dict[str, Any]] = {}
        # Last-seen provenance per canonical symbol — REST answers must carry
        # the same explicit label the streaming envelopes do (D3 labeling law).
        self._symbol_sources: dict[str, tuple[str, str]] = {}
        # Background unsubscribe tasks spawned by release_topic().
        self._release_tasks: set[asyncio.Task] = set()
        self._stats: dict[str, dict[str, Any]] = {}
        self._bridge_events = 0

    # ------------------------------------------------------------------
    # lifecycle
    # ------------------------------------------------------------------
    async def start(self) -> None:
        if self._started:
            return
        self._started = True
        self._mode = _env_mode()
        if self._mode == "off":
            logger.info("marketdata service disabled (MARKETDATA_MODE=off)")
            return
        if self._mode in {"auto", "simulated"}:
            self._sim = SimulatedAdapter(self._emit, exchange="SIM", feed_name="simulator")
            await self._sim.start()
            # In simulated mode (or with fallback enabled) BINANCE topics are
            # served by the labeled simulator when no live adapter exists.
            if self._mode == "simulated" or _fallback_enabled():
                self._binance_sim = SimulatedAdapter(
                    self._emit, exchange="BINANCE", feed_name="simulator-fallback"
                )
                await self._binance_sim.start()
        if self._mode in {"auto", "binance"}:
            self._binance = BinanceFuturesAdapter(self._emit)
            await self._binance.start()
        self._install_bridges()
        self._watchdog_task = asyncio.create_task(self._watchdog(), name="marketdata-watchdog")
        logger.info("marketdata service started (mode=%s)", self._mode)

    async def stop(self) -> None:
        self._started = False
        for task in self._fallback_tasks.values():
            task.cancel()
        self._fallback_tasks.clear()
        if self._watchdog_task is not None:
            self._watchdog_task.cancel()
            self._watchdog_task = None
        if self._binance is not None:
            await self._binance.stop()
            self._binance = None
        if self._sim is not None:
            await self._sim.stop()
            self._sim = None
        if self._binance_sim is not None:
            await self._binance_sim.stop()
            self._binance_sim = None
        for task in list(self._release_tasks):
            task.cancel()
        self._release_tasks.clear()
        await self.bus.stop()
        self._topic_refs.clear()
        self._topic_source.clear()
        logger.info("marketdata service stopped")

    # ------------------------------------------------------------------
    # bridges (read-only taps on legacy feeds)
    # ------------------------------------------------------------------
    def _install_bridges(self) -> None:
        if self._bridges_installed:
            return
        self._bridges_installed = True
        try:
            from backend.shared.ws_manager import get_marketdata_hub

            get_marketdata_hub().register_tick_listener(self._on_hub_tick)
        except Exception as exc:  # pragma: no cover - hub optional in tests
            logger.debug("hub bridge unavailable: %s", exc)
        try:
            from backend.services.us_tick_stream import get_us_tick_stream_service

            us_service = get_us_tick_stream_service()
            us_service.register_trade_listener(self._on_us_trade)
        except Exception as exc:  # pragma: no cover
            logger.debug("us-tick bridge unavailable: %s", exc)

    def _on_hub_tick(self, tick: dict[str, Any]) -> None:
        """MarketDataHub tick → normalized quote envelope."""
        try:
            raw_symbol = str(tick.get("symbol") or "").strip().upper()
            if not raw_symbol or ":" not in raw_symbol:
                return
            exchange, _, instrument = raw_symbol.partition(":")
            if not exchange or not instrument:
                return
            ltp = tick.get("ltp")
            if ltp is None:
                return
            try:
                last = float(ltp)
            except (TypeError, ValueError):
                return
            ts = tick.get("ts")
            ts_ms = 0
            if isinstance(ts, str):
                from datetime import datetime
                try:
                    ts_ms = int(datetime.fromisoformat(ts.replace("Z", "+00:00")).timestamp() * 1000)
                except ValueError:
                    ts_ms = 0
            data = {
                "symbol": raw_symbol,
                "bid": None, "bid_qty": None, "ask": None, "ask_qty": None,
                "last": last,
                "ts": ts_ms,
                "change": tick.get("change"),
                "change_pct": tick.get("change_pct"),
            }
            envelope = Envelope(
                topic=f"quote:{raw_symbol}",
                type="quote",
                symbol=raw_symbol,
                data=data,
                provenance="live",
                source=f"marketdata-hub:{tick.get('provider', 'unknown')}",
                ts=ts_ms or 0,
            )
            self._bridge_events += 1
            self._emit(envelope)
        except Exception:  # bridge must never raise into the hub
            logger.debug("hub tick bridge failed", exc_info=True)

    def _on_us_trade(self, trade: dict[str, Any]) -> None:
        """USTickStreamService trade → normalized trade envelope."""
        try:
            symbol = str(trade.get("symbol") or "").strip().upper()
            price = trade.get("p")
            qty = trade.get("v")
            ts = trade.get("t")
            if not symbol or price is None or qty is None or ts is None:
                return
            canonical_symbol = symbol if ":" in symbol else f"US:{symbol}"
            payload = Trade(
                symbol=canonical_symbol,
                id=str(trade.get("id") or f"us-{ts}-{symbol}"),
                price=float(price),
                qty=float(qty),
                side="unknown",
                ts=int(ts),
            ).model_dump()
            envelope = Envelope(
                topic=f"trade:{canonical_symbol}",
                type="trade",
                symbol=canonical_symbol,
                data=payload,
                provenance="live",
                source=f"us-tick-stream:{trade.get('provider', 'unknown')}",
                ts=int(ts),
            )
            self._bridge_events += 1
            self._emit(envelope)
        except Exception:  # bridge must never raise into the stream service
            logger.debug("us trade bridge failed", exc_info=True)

    # ------------------------------------------------------------------
    # emit (cache update + bus publish)
    # ------------------------------------------------------------------
    def _emit(self, envelope: Envelope) -> None:
        self._symbol_sources[envelope.symbol] = (envelope.provenance, envelope.source)
        self._update_cache(envelope)
        self.bus.publish(envelope)

    def _update_cache(self, envelope: Envelope) -> None:
        etype = envelope.type
        data = envelope.data
        if etype == "quote":
            self._quotes[envelope.symbol] = Quote.model_validate({**data, "ts": data.get("ts") or envelope.ts})
            if len(self._quotes) > MAX_QUOTE_CACHE:
                # simple cap: drop oldest inserted key
                for key in list(self._quotes.keys())[: len(self._quotes) - MAX_QUOTE_CACHE]:
                    self._quotes.pop(key, None)
        elif etype == "trade":
            ring = self._trades.setdefault(envelope.symbol, deque(maxlen=MAX_TRADE_RING))
            ring.append(Trade.model_validate({**data, "ts": data.get("ts") or envelope.ts}))
        elif etype == "candle":
            interval = envelope.topic.rsplit(":", 1)[-1]
            key = (envelope.symbol, interval)
            ring = self._candles.setdefault(key, deque(maxlen=MAX_CANDLE_RING))
            candle = Candle.model_validate(data)
            if ring and ring[-1].open_time == candle.open_time:
                ring[-1] = candle
            else:
                ring.append(candle)
        elif etype == "book_snapshot":
            self._books[envelope.symbol] = BookSnapshot.model_validate(data)
        elif etype == "liquidation":
            self._liquidations.append(data)
        elif etype == "funding":
            self._funding[envelope.symbol] = data
        elif etype == "open_interest":
            self._open_interest[envelope.symbol] = data
        elif etype == "stats":
            self._stats[envelope.symbol] = data

    # ------------------------------------------------------------------
    # topic subscription management (ref-counted)
    # ------------------------------------------------------------------
    async def subscribe_topic(self, topic: str) -> None:
        stream, symbol, param = parse_topic(topic)
        exchange, instrument = split_canonical(symbol) or (None, None)
        if exchange is None or instrument is None:
            raise ValueError(f"malformed topic symbol: {topic!r}")
        refs = self._topic_refs.get(topic, 0) + 1
        self._topic_refs[topic] = refs
        if refs > 1:
            return  # already served — no duplicate adapter subscription
        try:
            await self._adapter_subscribe(topic, stream, exchange, instrument, param)
        except Exception:
            # Failed first subscribe must not leave a phantom ref behind —
            # later subscribers would silently no-op on a dead topic.
            if self._topic_refs.get(topic) == 1:
                self._topic_refs.pop(topic, None)
                self._topic_source.pop(topic, None)
            raise

    async def unsubscribe_topic(self, topic: str) -> None:
        refs = self._topic_refs.get(topic, 0) - 1
        if refs > 0:
            self._topic_refs[topic] = refs
            return
        self._topic_refs.pop(topic, None)
        stream, symbol, param = parse_topic(topic)
        exchange, instrument = split_canonical(symbol) or (None, None)
        if exchange is None or instrument is None:
            return
        source = self._topic_source.pop(topic, None)
        await self._adapter_unsubscribe(topic, stream, exchange, instrument, param, source)
        fallback_task = self._fallback_tasks.pop(topic, None)
        if fallback_task is not None:
            fallback_task.cancel()

    def release_topic(self, topic: str) -> None:
        """Synchronous release for cancellation paths.

        A WS endpoint that is being *cancelled* (app shutdown / harness teardown)
        can no longer await ``unsubscribe_topic``; this drops the ref count
        immediately and schedules the adapter unsubscribe as a background task
        so subscriptions never leak.
        """
        refs = self._topic_refs.get(topic, 0) - 1
        if refs > 0:
            self._topic_refs[topic] = refs
            return
        self._topic_refs.pop(topic, None)
        source = self._topic_source.pop(topic, None)
        fallback_task = self._fallback_tasks.pop(topic, None)
        if fallback_task is not None:
            fallback_task.cancel()
        try:
            task = asyncio.create_task(
                self._release_adapter(topic, source), name=f"md-release-{topic}"
            )
            self._release_tasks.add(task)
            task.add_done_callback(self._release_tasks.discard)
        except RuntimeError:
            pass  # event loop already shutting down — stop() clears the rest

    async def _release_adapter(self, topic: str, source: str | None) -> None:
        try:
            stream, symbol, param = parse_topic(topic)
            exchange, instrument = split_canonical(symbol) or (None, None)
            if exchange is None or instrument is None:
                return
            await self._adapter_unsubscribe(topic, stream, exchange, instrument, param, source)
        except Exception:
            logger.debug("release_topic %s failed", topic, exc_info=True)

    async def _adapter_unsubscribe(
        self,
        topic: str,
        stream: str,
        exchange: str,
        instrument: str,
        param: str | None,
        source: str | None,
    ) -> None:
        # Route the unsubscribe to the adapter instance that actually serves
        # this topic: a "simulator"-sourced BINANCE topic is the fallback
        # instance (BINANCE namespace), not the SIM-namespace simulator.
        if exchange == "SIM" and source == "simulator" and self._sim is not None:
            await self._sim.unsubscribe(stream, instrument, param)
        elif exchange == "BINANCE" and source == "binance" and self._binance is not None:
            await self._binance.unsubscribe(stream, instrument, param)
        elif exchange == "BINANCE" and source == "simulator" and self._binance_sim is not None:
            await self._binance_sim.unsubscribe(stream, instrument, param)

    async def _adapter_subscribe(
        self, topic: str, stream: str, exchange: str, instrument: str, param: str | None
    ) -> None:
        if exchange == "BINANCE" and self._binance is not None:
            try:
                await self._binance.subscribe(stream, instrument, param)
                self._topic_source[topic] = "binance"
                if _fallback_enabled():
                    self._fallback_tasks[topic] = asyncio.create_task(
                        self._maybe_fallback(topic, stream, instrument, param),
                        name=f"md-fallback-{topic}",
                    )
                return
            except ValueError:
                raise
        if exchange == "SIM" and self._sim is not None:
            await self._sim.subscribe(stream, instrument, param)
            self._topic_source[topic] = "simulator"
            return
        if exchange == "BINANCE" and self._binance_sim is not None:
            # Binance adapter disabled/unavailable (mode=simulated, or fallback
            # pre-armed) — serve the topic from the labeled simulator so
            # offline development still exercises the same code paths.
            await self._binance_sim.subscribe(stream, instrument, param)
            self._topic_source[topic] = "simulator"
            return
        raise ValueError(f"no adapter serves exchange {exchange!r} (topic {topic!r})")

    async def _maybe_fallback(self, topic: str, stream: str, instrument: str, param: str | None) -> None:
        """After the grace window, if Binance is still not connected, switch
        the topic to the labeled simulator. The watchdog switches back."""
        try:
            await asyncio.sleep(self._fallback_grace)
            binance = self._binance
            if binance is None or binance.connected:
                return
            if self._topic_source.get(topic) != "binance":
                return
            if self._topic_refs.get(topic, 0) <= 0:
                return
            logger.warning(
                "binance unreachable after %.0fs — serving %s from labeled simulator",
                self._fallback_grace,
                topic,
            )
            try:
                if binance is not None:
                    await binance.unsubscribe(stream, instrument, param)
            except Exception:
                pass
            # Re-check: the last subscriber may have left while we resynced.
            if self._topic_refs.get(topic, 0) <= 0:
                return
            if self._binance_sim is not None:
                await self._binance_sim.subscribe(stream, instrument, param)
                self._topic_source[topic] = "simulator"
        except asyncio.CancelledError:
            return

    async def _watchdog(self) -> None:
        """Watch for binance recovery; restore live serving for fallback topics."""
        try:
            while True:
                await asyncio.sleep(self._watchdog_interval)
                binance = self._binance
                if binance is None or not binance.connected:
                    continue
                for topic in list(self._topic_source.keys()):
                    if self._topic_source.get(topic) != "simulator":
                        continue
                    stream, symbol, param = parse_topic(topic)
                    exchange, instrument = split_canonical(symbol) or (None, None)
                    if exchange != "BINANCE":
                        continue
                    try:
                        if self._binance_sim is not None:
                            await self._binance_sim.unsubscribe(stream, instrument, param)
                        await binance.subscribe(stream, instrument, param)
                        self._topic_source[topic] = "binance"
                        logger.info("restored live binance serving for %s", topic)
                    except Exception:
                        logger.debug("restore live for %s failed", topic, exc_info=True)
        except asyncio.CancelledError:
            return

    # ------------------------------------------------------------------
    # WS client plumbing
    # ------------------------------------------------------------------
    def open_subscription(self, topic: str) -> Subscription:
        return self.bus.subscribe(topic)

    def close_subscription(self, sub: Subscription) -> None:
        self.bus.unsubscribe(sub)

    # ------------------------------------------------------------------
    # status & caches (REST surface)
    # ------------------------------------------------------------------
    def feed_statuses(self) -> list[FeedStatus]:
        out: list[FeedStatus] = []
        if self._binance is not None:
            status = self._binance.status()
            # Fallback only if a BINANCE-namespace topic is simulator-served;
            # SIM-namespace topics must not flag the live feed as fallback.
            binance_fallback = any(
                self._topic_source.get(topic) == "simulator" and topic.split(":", 2)[1] == "BINANCE"
                for topic in self._topic_refs
            )
            if binance_fallback:
                status = status.model_copy(update={"state": FeedState.FALLBACK, "detail": status.detail or "unreachable — topics served by labeled simulator"})
            out.append(status)
        if self._sim is not None:
            out.append(self._sim.status())
        if self._binance_sim is not None:
            out.append(self._binance_sim.status())
        if self._bridge_events:
            out.append(
                FeedStatus(
                    feed="legacy-bridges",
                    exchange="*",
                    state=FeedState.LIVE,
                    provenance="live",
                    detail="MarketDataHub ticks + US trades republished as normalized envelopes",
                    connected=True,
                    events_published=self._bridge_events,
                )
            )
        return out

    def topic_snapshot(self) -> dict[str, Any]:
        return {
            "active_topics": {topic: {"refs": refs, "source": self._topic_source.get(topic)} for topic, refs in self._topic_refs.items()},
            "bus_subscribers": self.bus.subscriber_count(),
            "bus_metrics": {"published": self.bus.metrics.published, "dropped": self.bus.metrics.dropped},
        }

    def get_symbol_source(self, symbol: str) -> tuple[str | None, str | None]:
        """Last-seen ``(provenance, source)`` for a symbol (or Nones)."""
        return self._symbol_sources.get(symbol.strip().upper(), (None, None))

    def get_quote(self, symbol: str) -> Quote | None:
        return self._quotes.get(symbol.strip().upper())

    def get_book(self, symbol: str, levels: int = 25) -> BookSnapshot | None:
        return self._books.get(symbol.strip().upper())

    def get_trades(self, symbol: str, limit: int = 100) -> list[Trade]:
        ring = self._trades.get(symbol.strip().upper())
        return list(ring)[-limit:] if ring else []

    def get_candles(self, symbol: str, interval: str, limit: int = 300) -> list[Candle]:
        ring = self._candles.get((symbol.strip().upper(), interval))
        return list(ring)[-limit:] if ring else []

    def get_funding(self, symbol: str) -> dict[str, Any] | None:
        return self._funding.get(symbol.strip().upper())

    def get_open_interest(self, symbol: str) -> dict[str, Any] | None:
        return self._open_interest.get(symbol.strip().upper())

    def get_stats(self, symbol: str) -> dict[str, Any] | None:
        return self._stats.get(symbol.strip().upper())

    def get_liquidations(self, symbol: str | None = None, limit: int = 50) -> list[dict[str, Any]]:
        items = [row for row in self._liquidations if symbol is None or row.get("symbol") == symbol]
        return items[-limit:]

    async def list_symbols(self, query: str | None = None) -> list[dict[str, Any]]:
        out: list[dict[str, Any]] = []
        if self._binance is not None:
            items = await self._binance.list_symbols(query)
            out.extend(item.model_dump() for item in items[:100])
        if self._sim is not None:
            items = await self._sim.list_symbols(query)
            out.extend(item.model_dump() for item in items)
        return out


_service: MarketDataService | None = None


def get_marketdata_service() -> MarketDataService:
    global _service
    if _service is None:
        _service = MarketDataService()
    return _service


def reset_marketdata_service() -> None:
    """Test helper — drops the singleton (caller must stop it first)."""
    global _service
    _service = None
