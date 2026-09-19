"""Coinbase spot, direct — the real Advanced Trade market-data feed
(recovery task §14–§17, written against CURRENT Coinbase docs, June 2026).

Protocol facts as VERIFIED from the current documentation (never assumed):

- Market-data endpoint: ``wss://advanced-trade-ws.coinbase.com``. Public
  channels (``market_trades``, ``level2``, ``ticker``, ``ticker_batch``,
  ``candles``, ``heartbeats``, ``status``) require NO authentication; a
  feed message only arrives AFTER a ``{"type": "subscribe", ...}`` frame.
- Envelope: ``{channel, timestamp, sequence_num, events: [...]}`` where
  ``timestamp`` is RFC3339 with nanosecond precision and ``sequence_num``
  increments per message within a channel on a connection.
- ``market_trades``: events carry ``trades`` arrays of
  ``{trade_id, product_id, price, size, side, time}``; ``side`` is the
  exchange-stamped taker side ("BUY"/"SELL").
- ``level2`` is Coinbase's guaranteed-delivery order-book channel: events
  are ``{"type": "snapshot"|"update", updates: [{price_level,
  new_quantity, event_time, side}]}`` with per-event ``product_id``,
  ``side`` of "bid"/"offer" and a ``new_quantity`` of 0 removing the
  level. A sequence gap invalidates the book: resync from a fresh
  snapshot, never paper over (§15).
- The ``candles`` WS channel only serves 5-minute buckets (docs), so live
  sub-5m bars are NOT a WS product — they aggregate from trades, exactly
  what the existing chart's tick path already does. History uses the
  public market-data REST endpoint
  ``GET /api/v3/brokerage/market/products/{id}/candles`` with documented
  granularities and a 300-candles request cap.

Data honesty: live-only L2 (Coinbase exposes no public book history), no
synthetic fields — a missing trade_id is never invented, and an update
that cannot be attributed to exactly one product forces a resync instead
of a guess.
"""

from __future__ import annotations

import asyncio
import json
import logging
import os
import time
import urllib.request
from collections import deque
from datetime import datetime, timezone
from typing import AsyncIterator, Dict, List, Optional

import pandas as pd

from lse_terminal.contracts import (
    CANDLE_COLUMNS,
    DEPTH_DELTA,
    DEPTH_SNAPSHOT,
    TRADE_BUY,
    TRADE_SELL,
    NotSupported,
    Provider,
)
from lse_terminal.contracts.types import DepthEvent, Instrument
from lse_terminal.engine.datadiag import diag as _diag

log = logging.getLogger("lse_terminal")

WS_BASE = os.environ.get("COINBASE_WS", "wss://advanced-trade-ws.coinbase.com")
REST_BASE = os.environ.get("COINBASE_REST", "https://api.coinbase.com")

# Platform USD spot list (matches the crypto book's day-one universe); one
# row per product — adding a row is the whole change to support another.
# LSE canonical symbol -> Coinbase product id (the venue's identifier).
SYMBOLS = {
    "BTCUSD": "BTC-USD",
    "ETHUSD": "ETH-USD",
    "SOLUSD": "SOL-USD",
    "XRPUSD": "XRP-USD",
    "ADAUSD": "ADA-USD",
    "LINKUSD": "LINK-USD",
    "LTCUSD": "LTC-USD",
    "DOGEUSD": "DOGE-USD",
}

_NAMES = {
    "BTCUSD": "Bitcoin / US Dollar",
    "ETHUSD": "Ethereum / US Dollar",
    "SOLUSD": "Solana / US Dollar",
    "XRPUSD": "XRP / US Dollar",
    "ADAUSD": "Cardano / US Dollar",
    "LINKUSD": "Chainlink / US Dollar",
    "LTCUSD": "Litecoin / US Dollar",
    "DOGEUSD": "Dogecoin / US Dollar",
}

_PRODUCTS = {p: s for s, p in SYMBOLS.items()}   # product id -> canonical

# Documented REST granularities, honest subset: no FOUR_HOUR exists on this
# venue (TWO_HOUR/SIX_HOUR do), and synthesizing a 4h bar from 1h bars
# would present an aggregated window as if the venue served it.
_TIMEFRAMES = {"1m": ("ONE_MINUTE", 60), "5m": ("FIVE_MINUTE", 300),
               "15m": ("FIFTEEN_MINUTE", 900), "1h": ("ONE_HOUR", 3600),
               "1d": ("ONE_DAY", 86400)}

_MAX_REST_CANDLES = 300           # documented request cap
_WS_OPEN_TIMEOUT_S = 8.0
_BACKOFF_CAP_S = 30.0


def _iso_s(ts: str) -> float:
    """RFC3339 with ns precision -> epoch seconds float. Python parses µs,
    so the fraction is truncated to 6 DIGITS (truncation, not rounding —
    venue time is never moved forward; and never 6 raw characters, which
    could swallow the timezone sign)."""
    t = ts.strip()
    if t.endswith("Z"):
        t = t[:-1] + "+00:00"
    if "." in t:
        i = t.index(".")
        head, rest = t[:i], t[i + 1:]
        digits = 0
        while digits < len(rest) and rest[digits].isdigit():
            digits += 1
        t = f"{head}.{rest[:min(6, digits)]}{rest[digits:]}"
    return datetime.fromisoformat(t).replace(tzinfo=timezone.utc).timestamp()


class _BookState:
    """Per-product level2 state: the transmitted book exactly as Coinbase
    sends it, plus sync flags. Quantities stay the venue's values; a
    quantity of 0 removes the level (documented semantics)."""

    def __init__(self):
        self.bids: Dict[float, float] = {}
        self.asks: Dict[float, float] = {}
        self.synced = False

    def reset(self):
        self.bids.clear()
        self.asks.clear()
        self.synced = False

    def apply(self, side: str, price: float, qty: float) -> None:
        book = self.bids if side == "bid" else self.asks
        if qty == 0.0:
            book.pop(price, None)         # new_quantity 0 removes the level
        else:
            book[price] = qty


class CoinbaseProvider(Provider):
    """Keyless public Coinbase spot market data: trades, L2 book, candles."""

    name = "coinbase"
    title = "Coinbase Spot (Advanced Trade)"
    venue = "coinbase"
    timeframes = list(_TIMEFRAMES)     # honest subset: no 4h on this venue
    deterministic = False

    def __init__(self, backoff_base: float = 1.0):
        self._backoff_base = backoff_base
        # Tests bound the reconnect loop; production reconnects forever.
        self.max_reconnects: Optional[int] = None

    # -- the ONLY socket touchpoint; tests drive everything else ----------

    async def _connect(self):
        import websockets
        return await websockets.connect(
            WS_BASE, max_size=8 * 1024 * 1024, open_timeout=_WS_OPEN_TIMEOUT_S)

    # -- catalog -----------------------------------------------------------

    def search(self, query: str = "", limit: int = 50) -> List[Instrument]:
        q = (query or "").strip().upper().replace("/", "").replace("-", "")
        out = []
        for sym, product in SYMBOLS.items():
            name = _NAMES.get(sym, product)
            words = [w for w in name.upper().split() if w.isalnum()]
            if not q or q in sym or any(w.startswith(q) for w in words):
                out.append(Instrument(
                    symbol=sym,
                    name=name,
                    category="Coinbase (USD spot)",
                    provider=self.name,
                    meta={"live": True, "product": product},
                ))
        return out[: max(1, limit)]

    @staticmethod
    def _validate(symbols: List[str]) -> List[str]:
        bad = [s for s in symbols if s not in SYMBOLS]
        if bad:
            raise ValueError(f"coinbase: unknown symbols {bad}")
        return list(symbols)

    # -- candles (public market-data REST) ---------------------------------

    def candles(self, symbol: str, timeframe: str, limit: int = 500,
                start: Optional[str] = None, end: Optional[str] = None):
        product = SYMBOLS.get(symbol)
        if product is None:
            raise ValueError(f"{self.name}: unknown symbol {symbol}")
        gran = _TIMEFRAMES.get(timeframe)
        if gran is None:
            raise ValueError(
                f"{self.name}: unsupported timeframe {timeframe} "
                f"(this venue serves {', '.join(_TIMEFRAMES)})")
        granularity, tf_s = gran
        limit = max(1, min(int(limit), 1500))
        end_s = int(_iso_s(end)) if isinstance(end, str) else \
            (int(end) if end else int(time.time()))
        start_s = int(_iso_s(start)) if isinstance(start, str) else \
            (int(start) if start else None)

        rows: List[list] = []
        window_end = end_s
        while len(rows) < limit:
            window_start = window_end - _MAX_REST_CANDLES * tf_s + tf_s
            if start_s is not None:
                window_start = max(window_start, start_s)
                if window_start > window_end:
                    break
            url = (f"{REST_BASE}/api/v3/brokerage/market/products/"
                   f"{product}/candles?start={window_start}&end={window_end}"
                   f"&granularity={granularity}")
            try:
                with urllib.request.urlopen(url, timeout=15) as resp:
                    payload = json.loads(resp.read().decode())
            except Exception as e:  # noqa: BLE001
                raise NotSupported(
                    f"{self.name}: product candles REST failed: {e}") from e
            batch = payload.get("candles") or []
            # Documented shape: newest first. Normalize ascending; only the
            # fields the venue actually serves (no inference, no fill).
            got = 0
            for c in batch:
                try:
                    rows.append([int(float(c["start"])),
                                 float(c["open"]), float(c["high"]),
                                 float(c["low"]), float(c["close"]),
                                 float(c["volume"])])
                    got += 1
                except (KeyError, TypeError, ValueError):
                    continue
            if got == 0:
                break
            if start_s is not None and window_start <= start_s:
                break
            window_end = window_start - tf_s
        rows.sort(key=lambda r: r[0])
        if start_s is not None:
            rows = [r for r in rows if r[0] >= start_s]
        if end:
            rows = [r for r in rows if r[0] <= end_s]
        if not rows:
            raise NotSupported(
                f"{self.name}: venue served no history for {symbol} "
                f"{timeframe}")
        df = pd.DataFrame(rows[-limit:], columns=CANDLE_COLUMNS)
        df.attrs["venue"] = self.venue
        return df

    # -- live ticks (market_trades channel) --------------------------------

    def stream(self, symbols: List[str]) -> AsyncIterator[dict]:
        self._validate(symbols)   # eager, per the provider contract
        products = [SYMBOLS[s] for s in symbols]

        async def _ticks():
            async for ev in self._pump(products, channels=("market_trades",)):
                yield {"symbol": ev.symbol, "price": ev.price,
                       "ts": ev.ts, "volume": ev.size, "side": ev.side,
                       "trade_id": ev.trade_id}

        return _ticks()

    # -- live book (level2 channel — the guaranteed-sync one, §15) ---------

    def depth_stream(self, symbols: List[str]) -> AsyncIterator:
        self._validate(symbols)
        products = [SYMBOLS[s] for s in symbols]
        return self._pump(products, channels=("level2",))

    def depth_history(self, symbol, start, end, column_ms=1000,
                      max_levels=50):
        raise NotSupported(
            "Coinbase exposes no public L2 history; the terminal's session "
            "recorder is the history path (data honesty rule).")

    def configured(self) -> bool:
        return True  # keyless public channels, per Coinbase docs

    def capabilities(self):
        caps = super().capabilities()
        caps.discard("depth_history")
        return caps

    # -- the shared pump ----------------------------------------------------

    async def _pump(self, products: List[str], channels: tuple) -> AsyncIterator:
        """One socket, one subscribe frame per channel, forever. Reconnect
        rules: capped exponential backoff; every reconnect RE-subscribes
        (the venue only feeds after a subscribe); level2 state is reset and
        resyncs from the next snapshot — nothing survives a reconnect by
        assumption. Trade dedupe DOES persist (trade_id is identity)."""
        books = {p: _BookState() for p in products}
        seq_by_channel: Dict[str, int] = {}
        seen_trade_ids: Dict[str, deque] = {p: deque(maxlen=4096)
                                            for p in products}
        attempt = 0
        while True:
            ws = None
            try:
                ws = await self._connect()
                for channel in channels:
                    await ws.send(json.dumps({
                        "type": "subscribe",
                        "product_ids": products,
                        "channel": channel}))
                # heartbeats keep the socket warm per docs; cheap, keyless.
                await ws.send(json.dumps({"type": "subscribe",
                                          "channel": "heartbeats"}))
                attempt = 0
                for b in books.values():
                    b.reset()
                seq_by_channel.clear()
                async for raw in ws:
                    msg = json.loads(raw)
                    channel = msg.get("channel")
                    if channel not in channels:
                        continue   # heartbeats/subscriptions: alive-proof only
                    seq = msg.get("sequence_num")
                    if channel == "level2" and seq is not None:
                        last = seq_by_channel.get(channel)
                        if last is not None and seq > last + 1:
                            # §15: poisoned book — resync from a snapshot,
                            # never continue applying a broken patch chain.
                            for b in books.values():
                                b.reset()
                            seq_by_channel.pop(channel, None)
                            raise ConnectionError(
                                f"coinbase level2 sequence gap "
                                f"{last} -> {seq}: resync")
                        seq_by_channel[channel] = seq
                    for event in msg.get("events") or []:
                        async for item in self._translate(
                                channel, msg, event, books, seen_trade_ids):
                            yield item
            except asyncio.CancelledError:
                raise
            except Exception as exc:  # noqa: BLE001
                log.warning("coinbase pump error: %s", exc)
            finally:
                if ws is not None:
                    try:
                        await ws.close()
                    except Exception:  # noqa: BLE001
                        pass
            attempt += 1
            if self.max_reconnects is not None and \
                    attempt > self.max_reconnects:
                raise ConnectionError(
                    f"coinbase unreachable after {attempt} attempts "
                    f"({WS_BASE})")
            delay = min(_BACKOFF_CAP_S,
                        self._backoff_base * (2 ** min(attempt, 6)))
            log.info("coinbase reconnect in %.1fs (attempt %d)", delay, attempt)
            await asyncio.sleep(delay)

    async def _translate(self, channel: str, msg: dict, event: dict,
                         books: Dict[str, _BookState],
                         seen_trade_ids: Dict[str, deque]) -> AsyncIterator:
        msg_ts = _iso_s(msg["timestamp"]) if msg.get("timestamp") else None

        if channel == "market_trades":
            for tr in event.get("trades") or []:
                symbol = _PRODUCTS.get(tr.get("product_id"))
                if symbol is None:
                    continue
                product = tr.get("product_id")
                tid = tr.get("trade_id")
                if tid and tid in seen_trade_ids[product]:
                    continue          # a duplicate id never double-counts
                if tid:
                    seen_trade_ids[product].append(tid)
                venue_ts = _iso_s(tr["time"]) if tr.get("time") else None
                venue_ts = venue_ts or msg_ts or time.time()
                _diag.observe("coinbase", symbol, venue_ts, kind="trade")
                yield _Trade(symbol=symbol, price=float(tr["price"]),
                             ts=venue_ts, size=float(tr["size"]),
                             side=(TRADE_BUY if tr.get("side") == "BUY"
                                   else TRADE_SELL),
                             trade_id=tid)
            return

        # level2 ---------------------------------------------------------
        product = event.get("product_id")
        if product is None:
            if len(books) != 1:
                # Never guess attribution on a shared socket: resync.
                raise ConnectionError(
                    "coinbase level2 event without product_id on a "
                    "multi-product socket")
            product = next(iter(books))
        book = books.get(product)
        if book is None:
            return
        symbol = _PRODUCTS[product]
        event_type = event.get("type")
        event_ts = _iso_s(event["event_time"]) if event.get("event_time") \
            else (msg_ts or time.time())

        if event_type == "snapshot":
            book.reset()
        elif not book.synced:
            # Updates without a seeding snapshot tell us nothing safe.
            raise ConnectionError(
                f"coinbase level2 update before snapshot for {product}")
        changed_bids: List[tuple] = []
        changed_asks: List[tuple] = []
        for u in event.get("updates") or []:
            price = float(u["price_level"])
            qty = float(u["new_quantity"])
            side = u.get("side")
            book.apply(side, price, qty)
            (changed_bids if side == "bid" else changed_asks).append(
                (price, qty))
        _diag.observe("coinbase", symbol, event_ts, kind="book")
        if event_type == "snapshot":
            book.synced = True
            yield DepthEvent(symbol=symbol, ts=event_ts,
                             type=DEPTH_SNAPSHOT,
                             bids=sorted(book.bids.items(), key=lambda x: -x[0]),
                             asks=sorted(book.asks.items(), key=lambda x: x[0]))
        elif changed_bids or changed_asks:
            yield DepthEvent(symbol=symbol, ts=event_ts,
                             type=DEPTH_DELTA,
                             bids=changed_bids, asks=changed_asks)


class _Trade:
    """Internal normalized print carried between _translate and stream(), so
    the public stream shape stays exactly the terminal's tick dict."""

    __slots__ = ("symbol", "price", "ts", "size", "side", "trade_id")

    def __init__(self, symbol, price, ts, size, side, trade_id):
        self.symbol = symbol
        self.price = price
        self.ts = ts
        self.size = size
        self.side = side
        self.trade_id = trade_id
