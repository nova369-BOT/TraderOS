"""Labeled market simulator.

Serves the ``SIM`` exchange namespace with synthetic events for offline
development and tests. Every envelope it emits carries
``provenance="simulated"`` and ``source="simulator"`` — it must never be
presented as live data (protocol §31 / data-integrity law).

The simulator speaks the exact same normalized event model as the real
adapters, so consumers (chart, DOM, tape, footprint in later phases) are
provably source-agnostic: swap the feed and the code path is identical.
"""

from __future__ import annotations

import asyncio
import logging
import random
from dataclasses import dataclass, field
from typing import Any

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

EMIT_INTERVAL_S = 0.2
MAX_TRADES_RING = 200
MAX_CANDLES = 600

#: Fixed catalog (perp-style specs, plausible prices — clearly simulated).
SIM_CATALOG: dict[str, tuple[float, float, float]] = {
    # instrument: (base_price, tick_size, step_size)
    "BTCUSDT": (110_000.0, 0.1, 0.001),
    "ETHUSDT": (3_500.0, 0.01, 0.01),
    "SOLUSDT": (180.0, 0.01, 0.1),
    "BNBUSDT": (900.0, 0.01, 0.01),
    "XRPUSDT": (2.2, 0.0001, 0.1),
    "DOGEUSDT": (0.16, 0.00001, 1.0),
}


@dataclass
class _SimInstrument:
    instrument: str
    base_price: float
    tick_size: float
    step_size: float
    rng: random.Random
    mid: float = 0.0
    seq: int = 0
    trades: list[Trade] = field(default_factory=list)
    bids: dict[float, float] = field(default_factory=dict)
    asks: dict[float, float] = field(default_factory=dict)
    last_update_id: int = 0
    volume_24h: float = 0.0
    quote_volume_24h: float = 0.0
    open_24h: float = 0.0
    high_24h: float = 0.0
    low_24h: float = 0.0
    funding_rate: float = 0.0001
    open_interest: float = 0.0
    # one current candle per subscribed interval
    candles: dict[str, Candle] = field(default_factory=dict)

    def ensure_mid(self) -> None:
        if self.mid <= 0:
            self.mid = self.base_price
            self.open_24h = self.mid
            self.high_24h = self.mid
            self.low_24h = self.mid
            self.open_interest = self.base_price * 1000.0


class SimulatedAdapter(MarketDataAdapter):
    """Deterministic-seeded simulator.

    ``exchange`` sets the canonical namespace the simulator serves:

    - ``SIM`` — the explicit simulator namespace (discovery catalog).
    - ``BINANCE`` — fallback coverage: emits under ``BINANCE:`` topics so
      offline environments still exercise the exact consumer code paths,
      while every envelope stays labeled ``provenance="simulated"``.
    """

    def __init__(
        self,
        publisher,
        *,
        exchange: str = "SIM",
        feed_name: str = "simulator",
        emit_interval_s: float = EMIT_INTERVAL_S,
    ) -> None:
        self.exchange = exchange.strip().upper() or "SIM"
        self.feed_name = feed_name
        self._publisher = publisher
        self._emit_interval = emit_interval_s
        self._instruments: dict[str, _SimInstrument] = {}
        self._active: set[tuple[str, str, str | None]] = set()
        self._task: asyncio.Task | None = None
        self._started = False
        self._events_published = 0
        self._last_event_ms: int | None = None

    # ------------------------------------------------------------------
    # lifecycle
    # ------------------------------------------------------------------
    async def start(self) -> None:
        if self._started:
            return
        self._started = True
        for instrument, (base_price, tick, step) in SIM_CATALOG.items():
            self._instruments[instrument] = _SimInstrument(
                instrument=instrument,
                base_price=base_price,
                tick_size=tick,
                step_size=step,
                rng=random.Random(f"sim:{instrument}"),
            )
        logger.info("simulated market adapter started (%d instruments)", len(self._instruments))

    async def stop(self) -> None:
        self._started = False
        task = self._task
        self._task = None
        if task is not None:
            task.cancel()
        self._active.clear()
        logger.info("simulated market adapter stopped")

    def status(self) -> FeedStatus:
        return FeedStatus(
            feed=self.feed_name,
            exchange=self.exchange,
            state=FeedState.LIVE if (self._started and self._active) else FeedState.STOPPED,
            provenance="simulated",
            detail="labeled synthetic feed (offline development)" if self._active else None,
            connected=self._started,
            last_event_ms=self._last_event_ms,
            events_published=self._events_published,
        )

    async def list_symbols(self, query: str | None = None) -> list[SymbolInfo]:
        items = [
            SymbolInfo(
                symbol=f"{self.exchange}:{inst}",
                exchange=self.exchange,
                instrument=inst,
                base=inst.removesuffix("USDT") or None,
                quote="USDT",
                kind="perp",
                status="trading",
                tick_size=row.tick_size,
                step_size=row.step_size,
                price_precision=2,
                quantity_precision=3,
            )
            for inst, row in self._instruments.items()
        ]
        if query:
            needle = query.strip().upper()
            items = [item for item in items if needle in item.symbol or needle in item.instrument]
        return items

    # ------------------------------------------------------------------
    # topics
    # ------------------------------------------------------------------
    async def subscribe(self, stream: str, instrument: str, param: str | None) -> None:
        if not self._started:
            await self.start()
        stream = stream.strip().lower()
        instrument = instrument.strip().upper()
        if stream not in {"quote", "trade", "candle", "book", "stats", "liquidation", "funding", "open_interest"}:
            raise ValueError(f"unsupported stream {stream!r} for simulator")
        if stream == "candle" and not param:
            param = "1m"
        if instrument not in self._instruments:
            raise ValueError(f"unknown simulator instrument {instrument!r}")
        key = (stream, instrument, param)
        is_new = key not in self._active
        self._active.add(key)
        if is_new:
            await self._warm_start(key)
        if self._task is None or self._task.done():
            self._task = asyncio.create_task(self._emit_loop(), name="simulator-emit")

    async def unsubscribe(self, stream: str, instrument: str, param: str | None) -> None:
        key = (stream.strip().lower(), instrument.strip().upper(), param)
        self._active.discard(key)
        if not self._active and self._task is not None:
            self._task.cancel()
            self._task = None

    # ------------------------------------------------------------------
    # warm start
    # ------------------------------------------------------------------
    async def _warm_start(self, key: tuple[str, str, str | None]) -> None:
        stream, instrument, param = key
        row = self._instruments.get(instrument)
        if row is None:
            return
        row.ensure_mid()
        if stream == "book":
            self._rebuild_book(row)
            self._publish_snapshot(row)
        elif stream == "trade":
            for trade in row.trades[-50:]:
                self._emit("trade", row, trade.model_dump())
        elif stream == "candle":
            interval = param or "1m"
            self._seed_candle(row, interval)
            candle = row.candles.get(interval)
            if candle is not None:
                self._emit("candle", row, candle.model_dump(), param=interval)
        elif stream == "quote":
            self._emit_quote(row)
        elif stream == "stats":
            self._emit_stats(row)
        elif stream == "funding":
            self._emit_funding(row)
        elif stream == "open_interest":
            self._emit_oi(row)

    # ------------------------------------------------------------------
    # generation
    # ------------------------------------------------------------------
    def _rebuild_book(self, row: _SimInstrument) -> None:
        row.bids.clear()
        row.asks.clear()
        for i in range(1, 26):
            bid = round(row.mid - i * row.tick_size, 8)
            ask = round(row.mid + i * row.tick_size, 8)
            row.bids[bid] = round(row.rng.uniform(0.5, 8.0), 4)
            row.asks[ask] = round(row.rng.uniform(0.5, 8.0), 4)
        row.last_update_id += 1

    def _seed_candle(self, row: _SimInstrument, interval: str) -> None:
        now_ms = utc_now_ms()
        if interval.endswith("m"):
            bucket = int(interval[:-1]) * 60_000
        elif interval.endswith("h"):
            bucket = int(interval[:-1]) * 3_600_000
        elif interval.endswith("d"):
            bucket = int(interval[:-1]) * 86_400_000
        elif interval.endswith("w"):
            bucket = int(interval[:-1]) * 604_800_000
        else:
            bucket = 60_000
        open_time = (now_ms // bucket) * bucket
        current = row.candles.get(interval)
        if current is None or current.open_time != open_time:
            row.candles[interval] = Candle(
                symbol=f"{self.exchange}:{row.instrument}",
                interval=interval,
                open_time=open_time,
                close_time=open_time + bucket - 1,
                open=row.mid, high=row.mid, low=row.mid, close=row.mid,
                volume=0.0, closed=False, trade_count=0,
            )

    def _step(self, row: _SimInstrument) -> list[tuple[str, dict[str, Any], str | None]]:
        """Advance the random walk; return the events to publish."""
        events: list[tuple[str, dict[str, Any], str | None]] = []
        row.ensure_mid()
        drift = row.rng.gauss(0, row.mid * 0.00015)
        row.mid = max(row.tick_size, row.mid + drift)
        row.high_24h = max(row.high_24h, row.mid)
        row.low_24h = min(row.low_24h or row.mid, row.mid)

        active_streams = {k[0] for k in self._active if k[1] == row.instrument}

        # --- trades -----------------------------------------------------
        if "trade" in active_streams or "candle" in active_streams:
            n_trades = row.rng.randint(0, 3)
            for _ in range(n_trades):
                row.seq += 1
                side = "buy" if row.rng.random() < 0.5 else "sell"
                qty = round(row.rng.expovariate(1 / max(row.step_size * 10, 0.01)), 6)
                price = round(row.mid + (row.rng.uniform(-1, 1) * row.tick_size), 8)
                trade = Trade(
                    symbol=f"{self.exchange}:{row.instrument}",
                    id=f"sim-{row.seq}",
                    price=price, qty=qty,
                    side=side,  # type: ignore[arg-type]
                    ts=utc_now_ms(),
                )
                row.trades.append(trade)
                if len(row.trades) > MAX_TRADES_RING:
                    del row.trades[:-MAX_TRADES_RING]
                row.volume_24h += qty
                row.quote_volume_24h += qty * price
                if "trade" in active_streams:
                    events.append(("trade", trade.model_dump(), None))
                # fold into the current candle of EVERY active interval
                intervals = sorted(
                    {
                        (k[2] or "1m")
                        for k in self._active
                        if k[0] == "candle" and k[1] == row.instrument
                    }
                )
                for interval in intervals:
                    self._seed_candle(row, interval)
                    candle = row.candles.get(interval)
                    if candle is not None:
                        candle.high = max(candle.high, price)
                        candle.low = min(candle.low, price)
                        candle.close = price
                        candle.volume += qty
                        candle.trade_count = (candle.trade_count or 0) + 1
                        events.append(("candle", candle.model_dump(), interval))

        # --- book -------------------------------------------------------
        if "book" in active_streams:
            first = row.last_update_id + 1
            row.last_update_id += 1
            bids: list[BookLevel] = []
            asks: list[BookLevel] = []
            for _ in range(row.rng.randint(1, 3)):
                side_is_bid = row.rng.random() < 0.5
                depth = row.rng.randint(1, 25)
                price = round(
                    row.mid + (-depth if side_is_bid else depth) * row.tick_size, 8
                )
                qty = round(row.rng.uniform(0, 8.0), 4)
                target = row.bids if side_is_bid else row.asks
                if qty <= 0.05:
                    target.pop(price, None)
                else:
                    target[price] = qty
                level = BookLevel(price=price, qty=qty)
                (bids if side_is_bid else asks).append(level)
            delta = BookDelta(
                symbol=f"{self.exchange}:{row.instrument}",
                first_update_id=first,
                final_update_id=row.last_update_id,
                prev_final_update_id=first - 1,
                bids=bids, asks=asks, ts=utc_now_ms(),
            )
            events.append(("book_delta", delta.model_dump(), None))

        if "quote" in active_streams:
            events.append(("quote", self._quote(row).model_dump(), None))
        if "stats" in active_streams:
            events.append(("stats", self._stats(row).model_dump(), None))
        if "funding" in active_streams:
            row.funding_rate = max(-0.003, min(0.003, row.funding_rate + row.rng.gauss(0, 0.00002)))
            events.append(("funding", self._funding(row).model_dump(), None))
        if "open_interest" in active_streams:
            row.open_interest = max(0.0, row.open_interest + row.rng.gauss(0, row.open_interest * 0.001))
            events.append(("open_interest", self._oi(row).model_dump(), None))
        if "liquidation" in active_streams and row.rng.random() < 0.02:
            row.seq += 1
            side = "buy" if row.rng.random() < 0.5 else "sell"
            liquidation = Liquidation(
                symbol=f"{self.exchange}:{row.instrument}",
                side=side,  # type: ignore[arg-type]
                price=round(row.mid, 8),
                qty=round(row.rng.expovariate(1 / 0.5), 6),
                ts=utc_now_ms(),
                order_id=f"sim-liq-{row.seq}",
            )
            events.append(("liquidation", liquidation.model_dump(), None))
        return events

    async def _emit_loop(self) -> None:
        try:
            while self._active:
                instruments = {k[1] for k in self._active}
                for instrument in instruments:
                    row = self._instruments.get(instrument)
                    if row is None:
                        continue
                    for stream, data, param in self._step(row):
                        self._emit(stream, row, data, param=param)
                    if "book" in {k[0] for k in self._active if k[1] == instrument} and row.rng.random() < 0.1:
                        self._publish_snapshot(row)
                await asyncio.sleep(self._emit_interval)
        except asyncio.CancelledError:
            return

    # ------------------------------------------------------------------
    # model builders
    # ------------------------------------------------------------------
    def _quote(self, row: _SimInstrument) -> Quote:
        best_bid = max(row.bids) if row.bids else row.mid - row.tick_size
        best_ask = min(row.asks) if row.asks else row.mid + row.tick_size
        return Quote(
            symbol=f"{self.exchange}:{row.instrument}",
            bid=best_bid, bid_qty=row.bids.get(best_bid),
            ask=best_ask, ask_qty=row.asks.get(best_ask),
            last=row.mid, ts=utc_now_ms(),
        )

    def _emit_quote(self, row: _SimInstrument) -> None:
        self._emit("quote", row, self._quote(row).model_dump())

    def _stats(self, row: _SimInstrument) -> MarketStats:
        return MarketStats(
            symbol=f"{self.exchange}:{row.instrument}",
            last=row.mid,
            change_pct_24h=((row.mid - row.open_24h) / row.open_24h * 100.0) if row.open_24h else 0.0,
            high_24h=row.high_24h,
            low_24h=row.low_24h,
            volume_24h=row.volume_24h,
            quote_volume_24h=row.quote_volume_24h,
            trade_count_24h=len(row.trades),
            ts=utc_now_ms(),
        )

    def _emit_stats(self, row: _SimInstrument) -> None:
        self._emit("stats", row, self._stats(row).model_dump())

    def _funding(self, row: _SimInstrument) -> Funding:
        return Funding(
            symbol=f"{self.exchange}:{row.instrument}",
            funding_rate=row.funding_rate,
            next_funding_ms=utc_now_ms() + 8 * 3_600_000,
            mark_price=row.mid,
            index_price=row.mid * (1 - 0.00002),
            ts=utc_now_ms(),
        )

    def _emit_funding(self, row: _SimInstrument) -> None:
        self._emit("funding", row, self._funding(row).model_dump())

    def _oi(self, row: _SimInstrument) -> OpenInterest:
        return OpenInterest(
            symbol=f"{self.exchange}:{row.instrument}",
            open_interest=row.open_interest,
            open_interest_usd=row.open_interest * row.mid,
            ts=utc_now_ms(),
        )

    def _emit_oi(self, row: _SimInstrument) -> None:
        self._emit("open_interest", row, self._oi(row).model_dump())

    def _publish_snapshot(self, row: _SimInstrument) -> None:
        bids = [BookLevel(price=p, qty=q) for p, q in sorted(row.bids.items(), reverse=True)]
        asks = [BookLevel(price=p, qty=q) for p, q in sorted(row.asks.items())]
        snapshot = BookSnapshot(
            symbol=f"{self.exchange}:{row.instrument}",
            bids=bids, asks=asks,
            last_update_id=row.last_update_id, ts=utc_now_ms(),
        )
        self._emit("book_snapshot", row, snapshot.model_dump())

    # ------------------------------------------------------------------
    # emit
    # ------------------------------------------------------------------
    def _emit(self, stream: str, row: _SimInstrument, data: dict[str, Any], param: str | None = None) -> None:
        if stream == "candle":
            topic = build_topic("candle", f"{self.exchange}:{row.instrument}", param or "1m")
        else:
            topic = build_topic(stream, f"{self.exchange}:{row.instrument}")
        envelope = Envelope(
            topic=topic,
            type=stream,
            symbol=f"{self.exchange}:{row.instrument}",
            data=data,
            provenance="simulated",
            source="simulator",
            ts=utc_now_ms(),
        )
        self._events_published += 1
        self._last_event_ms = envelope.ts
        self._publisher(envelope)

    # ------------------------------------------------------------------
    # cache readers (used by REST routes / tests)
    # ------------------------------------------------------------------
    def get_quote(self, instrument: str) -> Quote | None:
        row = self._instruments.get(instrument)
        return self._quote(row) if row is not None and row.mid > 0 else None

    def get_book(self, instrument: str, levels: int) -> BookSnapshot | None:
        row = self._instruments.get(instrument)
        if row is None or not row.bids:
            return None
        bids = [BookLevel(price=p, qty=q) for p, q in sorted(row.bids.items(), reverse=True)[:levels]]
        asks = [BookLevel(price=p, qty=q) for p, q in sorted(row.asks.items())[:levels]]
        return BookSnapshot(
            symbol=f"{self.exchange}:{instrument}", bids=bids, asks=asks,
            last_update_id=row.last_update_id, ts=utc_now_ms(),
        )

    def get_trades(self, instrument: str, limit: int) -> list[Trade]:
        row = self._instruments.get(instrument)
        if row is None:
            return []
        return list(row.trades[-limit:])

    def get_funding(self, instrument: str) -> Funding | None:
        row = self._instruments.get(instrument)
        return self._funding(row) if row is not None else None

    def get_open_interest(self, instrument: str) -> OpenInterest | None:
        row = self._instruments.get(instrument)
        return self._oi(row) if row is not None else None
