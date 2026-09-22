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
import re
import os
import time
import threading
import urllib.request
from collections import deque
from concurrent.futures import ThreadPoolExecutor

from ._http import HttpPool, base_of

# One keep-alive pool for the venue host (or the test fake): urllib used
# to pay a fresh TCP+TLS handshake for every candles/trades page.
_POOLS: dict = {}
_POOLS_LOCK = threading.Lock()


def _pool_for(base: str) -> HttpPool:
    with _POOLS_LOCK:
        pool = _POOLS.get(base)
        if pool is None:
            pool = _POOLS[base] = HttpPool()
    return pool
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

# Documented REST granularities: 1m/5m/15m/30m/1h/2h/6h/1d — no FOUR_HOUR
# or weekly granularity exists on this venue, and synthesizing either
# from finer bars would present an aggregated window as if the venue
# served it. Sub-minute bars come from the venue's own trade tape
# (Get Public Market Trades: `limit` page size, `start`/`end`
# UNIX-seconds window — paged backward like Binance); tick = one bar per
# print. The `_TIMEFRAMES` keys double as the klines ladder.
_TIMEFRAMES = {"1m": ("ONE_MINUTE", 60), "5m": ("FIVE_MINUTE", 300),
               "15m": ("FIFTEEN_MINUTE", 900),
               "30m": ("THIRTY_MINUTE", 1800), "1h": ("ONE_HOUR", 3600),
               "2h": ("TWO_HOUR", 7200), "6h": ("SIX_HOUR", 21600),
               "1d": ("ONE_DAY", 86400)}

# The menu (LSE-shaped, owner-locked): 4h/1w stay off it because the
# venue has no such product — custom `<n>s` buckets ride the tape.
LADDER = ["tick", "1s", "15s", "30s",
          "1m", "5m", "15m", "30m", "1h", "1d"]

_SEC_BUCKET = re.compile(r"^(\d+)s$")

# Market-trades page size: the docs name `limit` required but print no
# maximum — ask 1000 (the venue truncates to its truth) and page by end.
_TAPE_PAGE = 1000

_MAX_REST_CANDLES = 300
_WS_OPEN_TIMEOUT_S = 0.8        # 50MS MAX
_BACKOFF_CAP_S = 0.8            # 50MS MAX


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


def tape_to_candles(rows: list, step_s: int,
                    limit: int = 500) -> List[tuple]:
    """Trade-tape rows ({"T" ms, "p", "q"}) -> candle tuples. Tick
    (step_s == 0): one bar per print; otherwise fixed `<n>s` buckets.
    What the tape holds is what returns — never a fabricated fill."""
    buckets: Dict[float, list] = {}
    for r in rows:
        try:
            t_ms = int(r["T"])
            price = float(r["p"])
            qty = float(r["q"])
        except (TypeError, ValueError, KeyError):
            continue
        if t_ms <= 0:
            continue
        ts = t_ms / 1000.0
        key = (ts // step_s) * step_s if step_s else ts
        buckets.setdefault(key, []).append((price, qty))
    out: List[tuple] = []
    for key in sorted(buckets):
        pts = buckets[key]
        if step_s:
            out.append((key, pts[0][0], max(x for x, _ in pts),
                        min(x for x, _ in pts), pts[-1][0],
                        sum(q for _, q in pts)))
        else:
            out.append((key, pts[-1][0], pts[-1][0], pts[-1][0],
                        pts[-1][0], sum(q for _, q in pts)))
    return out[-max(1, int(limit)):]


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
    timeframes = list(LADDER)        # no 4h/1w: the venue has no such bars
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
        if timeframe == "tick" or _SEC_BUCKET.match(timeframe):
            step = 0 if timeframe == "tick" else int(
                _SEC_BUCKET.match(timeframe).group(1))
            return self._candles_tape(product, symbol, timeframe, step,
                                      limit, start, end)
        gran = _TIMEFRAMES.get(timeframe)
        if gran is None:
            raise ValueError(
                f"{self.name}: unsupported timeframe {timeframe!r} — "
                f"natives: {', '.join(_TIMEFRAMES)} (no 4h/1w exist on "
                f"this venue); sub-minute: tick or any <n>s bucket from "
                f"the real trade tape")
        granularity, tf_s = gran
        limit = max(1, min(int(limit), 1500))
        end_s = int(_iso_s(end)) if isinstance(end, str) else \
            (int(end) if end else int(time.time()))
        start_s = int(_iso_s(start)) if isinstance(start, str) else \
            (int(start) if start else None)

        # Speed law (owner, 2026-09-21): fixed 300-candle pages can be
        # clock-sliced up front, so multi-page loads fetch IN PARALLEL
        # over keep-alive connections — same requests, same bytes, same
        # refusals; pages are disjoint by construction (no dedupe
        # needed); a page that comes back SHORT means more history
        # exists below the plan, and the exact old adaptive queries
        # chase it downward one page at a time.
        windows = []
        we, remaining = end_s, limit
        while remaining > 0:
            ws = we - _MAX_REST_CANDLES * tf_s + tf_s
            if start_s is not None:
                ws = max(ws, start_s)
                if ws > we:
                    break
            windows.append((ws, we))
            we = ws - tf_s
            remaining -= _MAX_REST_CANDLES

        def fetch_window(ws: int, we_: int):
            out = []
            url = (f"{REST_BASE}/api/v3/brokerage/market/products/"
                   f"{product}/candles?start={ws}&end={we_}"
                   f"&granularity={granularity}")
            host, qpath = base_of(url)
            try:
                code, body = _pool_for(host).get(host, qpath)
            except Exception as e:  # noqa: BLE001
                raise NotSupported(
                    f"{self.name}: product candles REST failed: {e}") from e
            if code != 200:
                raise NotSupported(
                    f"{self.name}: product candles REST failed: "
                    f"HTTP {code}: {body.decode(errors='replace')[:200]}")
            payload = json.loads(body.decode())
            batch = payload.get("candles") or []
            # Documented shape: newest first. Normalize ascending; only
            # the fields the venue actually serves (no inference, no fill).
            for c in batch:
                try:
                    out.append([int(float(c["start"])),
                                float(c["open"]), float(c["high"]),
                                float(c["low"]), float(c["close"]),
                                float(c["volume"])])
                except (KeyError, TypeError, ValueError):
                    continue
            return out

        rows: List[list] = []
        if len(windows) == 1:
            results = [fetch_window(*windows[0])]
        else:
            with ThreadPoolExecutor(
                    max_workers=min(4, len(windows)),
                    thread_name_prefix="cb-candles") as ex:
                results = list(ex.map(lambda w: fetch_window(*w), windows))
        for out in results:
            rows.extend(out)
        # Gap continuation — the old serial law, kept verbatim: chase
        # short pages downward with the vintage adaptive queries until
        # filled, the venue blanks, or `start` is covered. Full pages
        # (the norm on this book) never enter this loop.
        we = (windows[-1][0] - tf_s) if windows else end_s
        while len(rows) < limit:
            window_start = we - _MAX_REST_CANDLES * tf_s + tf_s
            if start_s is not None:
                window_start = max(window_start, start_s)
                if window_start > we:
                    break
            out = fetch_window(window_start, we)
            rows.extend(out)
            if not out:
                break
            if start_s is not None and window_start <= start_s:
                break
            we = window_start - tf_s
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

    # -- sub-minute from the venue's own market-trades tape --------------

    def _candles_tape(self, product: str, symbol: str, timeframe: str,
                      step: int, limit: int, start, end):
        end_s = int(_iso_s(end)) if isinstance(end, str) else \
            (int(end) if end else int(time.time()))
        start_s = int(_iso_s(start)) if isinstance(start, str) else \
            (int(start) if start else None)
        # Get Public Market Trades (June 2026 docs): `limit` is the page
        # size (the docs print no max — ask 1000 and take what comes) and
        # `start`/`end` are UNIX-SECONDS window bounds. Same law as
        # Binance: page BACKWARD by end, each page the venue's newest
        # prints inside [start?, page_end]; <=12 pages is the rate guard
        # (~12k prints of real tape) — deeper windows are refused, never
        # filled. Seams dedup by trade_id: venue window bounds are
        # second-grained, print times are not.
        tapes: list = []
        seen_ids: set = set()
        page_end = end_s
        prev_oldest = None
        for _page in range(12):
            q = f"limit={_TAPE_PAGE}"
            if start_s is not None:
                q += f"&start={start_s}"
            q += f"&end={page_end}"
            url = (f"{REST_BASE}/api/v3/brokerage/market/products/"
                   f"{product}/ticker?{q}")
            host, qpath = base_of(url)
            try:
                code, body = _pool_for(host).get(host, qpath)
            except Exception as e:  # noqa: BLE001
                raise NotSupported(
                    f"{self.name}: market trades REST failed: {e}") from e
            if code != 200:
                raise NotSupported(
                    f"{self.name}: market trades REST HTTP {code}: "
                    f"{body.decode(errors='replace')[:200]}")
            payload = json.loads(body.decode())
            parsed = []
            for tr in payload.get("trades") or []:
                try:
                    parsed.append({
                        "T": int(_iso_s(tr["time"]) * 1000),
                        "p": tr["price"], "q": tr["size"],
                        "id": str(tr.get("trade_id") or "")})
                except (KeyError, TypeError, ValueError):
                    continue
            rows = [r for r in parsed
                    if r["T"] <= page_end * 1000 and
                    (start_s is None or r["T"] >= start_s * 1000)]
            fresh = [r for r in rows if r["id"] not in seen_ids]
            for r in fresh:
                seen_ids.add(r["id"])
            tapes = fresh + tapes
            oldest = min((r["T"] for r in fresh), default=None)
            if (not fresh or len(rows) < _TAPE_PAGE
                    or (prev_oldest is not None
                        and (oldest is None or oldest >= prev_oldest))
                    or (start_s is not None and oldest is not None
                        and oldest <= start_s * 1000)):
                break
            prev_oldest = oldest
            page_end = oldest // 1000
        if not tapes:
            raise NotSupported(
                f"{self.name}: the venue served no prints inside "
                f"{symbol} {timeframe} for that window — tick and <n>s "
                f"bars are real trades only, never a fabricated fill")
        # The venue's tape is NEWEST-first; bucketing needs chronological
        # prints or every bucket's open/close swaps (high/low survive).
        tapes.sort(key=lambda r: r["T"])
        bars = tape_to_candles(tapes, step, limit)
        if not bars:
            raise NotSupported(
                f"{self.name}: the venue served no prints inside "
                f"{symbol} {timeframe} for that window — tick and <n>s "
                f"bars are real trades only, never a fabricated fill")
        df = pd.DataFrame(bars, columns=CANDLE_COLUMNS)
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

    def trade_history(self, symbol, start, end, column_ms=1000):
        """Trade history for footprint/VPVR/CVD — uses market trades REST."""
        product = SYMBOLS.get(symbol)
        if product is None:
            raise ValueError(f"coinbase: unknown symbol {symbol}")
        from lse_terminal.contracts.types import TradeEvent
        from lse_terminal.contracts import TRADE_BUY, TRADE_SELL
        start_i, end_i = int(start), int(end)
        if end_i <= start_i:
            return []
        # fetch via market trades REST, similar to _candles_tape but return TradeEvents
        tapes: list = []
        seen_ids: set = set()
        page_end = end_i
        prev_oldest = None
        for _page in range(12):
            q = f"limit={_TAPE_PAGE}&start={start_i}&end={page_end}"
            url = f"{REST_BASE}/api/v3/brokerage/market/products/{product}/ticker?{q}"
            host, qpath = base_of(url)
            try:
                code, body = _pool_for(host).get(host, qpath)
            except Exception as e:
                raise NotSupported(f"coinbase: market trades REST failed: {e}") from e
            if code != 200:
                raise NotSupported(f"coinbase: market trades REST HTTP {code}: {body.decode(errors='replace')[:200]}")
            payload = json.loads(body.decode())
            parsed = []
            for tr in payload.get("trades") or []:
                try:
                    parsed.append({
                        "T": int(_iso_s(tr["time"]) * 1000),
                        "p": float(tr["price"]),
                        "q": float(tr["size"]),
                        "side": TRADE_BUY if tr.get("side") == "BUY" else TRADE_SELL,
                        "id": str(tr.get("trade_id") or ""),
                    })
                except Exception:
                    continue
            rows = [r for r in parsed if r["T"] <= page_end * 1000 and r["T"] >= start_i * 1000]
            fresh = [r for r in rows if r["id"] not in seen_ids]
            for r in fresh:
                seen_ids.add(r["id"])
            tapes = fresh + tapes
            oldest = min((r["T"] for r in fresh), default=None)
            if (not fresh or len(rows) < _TAPE_PAGE or (prev_oldest is not None and (oldest is None or oldest >= prev_oldest)) or (oldest is not None and oldest <= start_i * 1000)):
                break
            prev_oldest = oldest
            page_end = oldest // 1000 if oldest else page_end - 1
        out = []
        for r in tapes:
            try:
                ts = r["T"] / 1000.0
                out.append(TradeEvent(symbol=symbol, ts=ts, price=r["p"], size=r["q"], side=r["side"]))
            except Exception:
                continue
        return out

    def liquidation_stream(self, symbols: List[str]):
        """Liquidation proxy via large trades (Coinbase has no public liq stream)."""
        self._validate(symbols)
        products = [SYMBOLS[s] for s in symbols]

        async def _liq_proxy():
            async for ev in self._pump(products, channels=("market_trades",)):
                # large trades as liquidation proxy
                notional = ev.price * ev.size
                if notional > 100000:
                    liq_side = "short" if ev.side == TRADE_BUY else "long"
                    yield {
                        "symbol": ev.symbol,
                        "price": ev.price,
                        "qty": ev.size,
                        "side": liq_side,
                        "notional_usd": notional,
                        "timestamp_ms": int(ev.ts * 1000),
                        "type": "liquidation_proxy",
                    }

        return _liq_proxy()

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
