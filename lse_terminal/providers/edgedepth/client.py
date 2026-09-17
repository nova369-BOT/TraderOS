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
import os
import time
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
    STREAM_HISTORICAL_CANDLES,
    STREAM_ORDERBOOK,
    STREAM_TRADES,
    BookUpdate,
    Candle,
    parse_book_update,
    parse_candles,
    parse_trade,
    parse_ws_payload,
)

log = logging.getLogger("lse_terminal")

DEFAULT_URL = "ws://127.0.0.1:8080/ws"
EXCHANGE = "binance"


def gateway_url() -> str:
    return os.environ.get("EDGEDEPTH_GATEWAY_URL", DEFAULT_URL)


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
            books = {s: BookSync(s) for s in symbols}
            for s in symbols:
                await self._subscribe(ws, s, STREAM_ORDERBOOK)
                await self._subscribe(ws, s, STREAM_TRADES)
            async for raw in ws:
                if isinstance(raw, str):
                    continue  # control plane echoes; nothing to act on yet
                payload = parse_ws_payload(bytes(raw))
                symbol = payload.symbol
                book = books.get(symbol)
                if book is None:
                    continue
                if payload.stream == STREAM_ORDERBOOK:
                    update = parse_book_update(payload.data)
                    kind = book.ingest(update)
                    if kind == "resync":
                        log.warning("edgedepth %s sequence gap "
                                    "(last=%d got first=%d): re-subscribing",
                                    symbol, book.last_update_id,
                                    update.first_update_id)
                        await self._subscribe(ws, symbol, STREAM_ORDERBOOK)
                        continue
                    if kind == "stale":
                        continue
                    yield DepthEvent(
                        symbol=symbol,
                        ts=update.timestamp_ms / 1000.0,
                        type=kind,
                        bids=[(lv.price, lv.size) for lv in update.bids],
                        asks=[(lv.price, lv.size) for lv in update.asks],
                    )
                elif payload.stream == STREAM_TRADES:
                    t = parse_trade(payload.data)
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

    # -- historical candles (stream 8) -----------------------------------------

    async def fetch_candles(self, symbol: str, timeframe_s: int,
                            limit: int = 500,
                            end_ms: Optional[int] = None) -> List[Candle]:
        """One short-lived socket: subscribe HISTORICAL_CANDLES, take the
        first matching Candles frame, unsubscribe, close."""
        ws = await self._connect()
        try:
            now_ms = int(time.time() * 1000)
            await self._subscribe(
                ws, symbol, STREAM_HISTORICAL_CANDLES,
                timeframe=timeframe_s, count=int(limit),
                end_time=int(end_ms or now_ms),
                start_time=0)
            deadline = time.monotonic() + 10.0
            async for raw in ws:
                if time.monotonic() > deadline:
                    break
                if isinstance(raw, str):
                    continue
                payload = parse_ws_payload(bytes(raw))
                if (payload.symbol != symbol
                        or payload.stream != STREAM_HISTORICAL_CANDLES):
                    continue
                _tf, values = parse_candles(payload.data)
                await self._unsubscribe(ws, symbol, STREAM_HISTORICAL_CANDLES,
                                        timeframe=timeframe_s)
                return values
            return []
        finally:
            try:
                await ws.close()
            except Exception:  # noqa: BLE001
                pass
