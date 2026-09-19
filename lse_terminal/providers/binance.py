"""Binance USD-M futures, direct — the chart's single Binance surface
(D12, owner-locked 2026-09-19).

History: the exchange was first reachable two ways — the EdgeDepth
gateway child (engine → Go child → Binance) and a direct native book
whose whole-exchange catalog downloads were the measured cold-switch
pain (deleted in D11). Neither is what the chart now dials. This module
is the Coinbase-shaped native pipeline: a CURATED catalog held in
memory (nothing to download, ever — the winning half of the EdgeDepth
book's design), one socket hop to the venue (no child in the path),
written against the same rules as providers/coinbase.py.

Protocol facts (Binance USD-M public market data, keyless):

- REST klines: ``GET /fapi/v1/klines?symbol&interval&limit&startTime&
  endTime``, request cap 1500 rows; 4h is a NATIVE interval on this
  venue (Coinbase could not say that, so it refuses 4h — Binance
  serves it).
- WS: combined stream ``/stream?streams=<sym>@aggTrade/<sym>@depth20
  @100ms/...``; every frame is an envelope ``{"stream": ..., "data":
  ...}``. BookL2 sequencing (U/u/pu) is NOT used: the depth legs are
  the venue's PARTIAL top-20 book streams, each frame complete in
  itself, so a dropped frame can never poison the book (there is no
  patch chain to break) — honesty by construction, and the book panel
  shows the venue's top 20 exactly as served.
- ``aggTrade``: ``{s, a, p, q, T, m}`` with ``a`` the aggregate trade
  id (reconnect-safe identity for dedupe) and ``m`` = "buyer is maker",
  i.e. the taker SOLD when true.

Data honesty: live-only book (Binance exposes no public L2 history — the
session recorder stays the history path); no symbol outside the curated
list is ever resolved; venue errors (incl. 429) surface with the
venue's own code/message instead of a retry masquerading as truth.
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
    DEPTH_SNAPSHOT,
    NotSupported,
    Provider,
    TRADE_BUY,
    TRADE_SELL,
)
from lse_terminal.contracts.types import DepthEvent, Instrument
from lse_terminal.engine.datadiag import diag as _diag

log = logging.getLogger("lse_terminal")

WS_BASE = os.environ.get("BINANCE_WS", "wss://fstream.binance.com")
REST_BASE = os.environ.get("BINANCE_REST", "https://fapi.binance.com")

# The book's day-one list — identical to the EdgeDepth book's rows, so
# the pipe changed, the menu's content did not. One row is the whole
# change to add another symbol; nothing else is downloaded at any point.
SYMBOLS = {
    "BTCUSDT": "Bitcoin / Tether (USD-M perp)",
    "ETHUSDT": "Ethereum / Tether (USD-M perp)",
    "SOLUSDT": "Solana / Tether (USD-M perp)",
    "BNBUSDT": "BNB / Tether (USD-M perp)",
    "XRPUSDT": "XRP / Tether (USD-M perp)",
    "ADAUSDT": "Cardano / Tether (USD-M perp)",
    "DOGEUSDT": "Dogecoin / Tether (USD-M perp)",
    "LINKUSDT": "Chainlink / Tether (USD-M perp)",
}

# Honest subset, all native on this venue (4h included — it exists here).
_TIMEFRAMES = {"1m": ("1m", 60), "5m": ("5m", 300), "15m": ("15m", 900),
               "1h": ("1h", 3600), "4h": ("4h", 14400),
               "1d": ("1d", 86400)}

_MAX_REST_CANDLES = 1500          # documented request cap
_WS_OPEN_TIMEOUT_S = 8.0
_BACKOFF_CAP_S = 30.0


def _iso_s(ts: str) -> float:
    """ISO/RFC3339 -> epoch seconds (µs truncation only, timezone kept)."""
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


def _to_s(v) -> Optional[int]:
    """start/end arrive as epoch seconds (shell fetches) or ISO strings."""
    if v is None:
        return None
    if isinstance(v, str):
        return int(_iso_s(v))
    return int(v)


class BinanceProvider(Provider):
    """Keyless public Binance USD-M market data: trades, top-20 book,
    candles — one hop to the venue, no child process, no catalog fetch.
    """

    name = "binance"
    title = "Binance USD-M Futures (direct, keyless)"
    venue = "binance"
    timeframes = list(_TIMEFRAMES)
    deterministic = False

    def __init__(self, backoff_base: float = 1.0):
        self._backoff_base = backoff_base
        # Tests bound the reconnect loop; production reconnects forever.
        self.max_reconnects: Optional[int] = None

    # -- the ONLY socket touchpoint; tests drive everything else ----------

    async def _connect(self, url: str):
        import websockets
        return await websockets.connect(
            url, max_size=8 * 1024 * 1024, open_timeout=_WS_OPEN_TIMEOUT_S)

    # -- catalog (memory — the D12 rule: this list IS the book) -----------

    def search(self, query: str = "", limit: int = 50) -> List[Instrument]:
        q = (query or "").strip().upper().replace("/", "")
        out = []
        for sym, name in SYMBOLS.items():
            words = [w for w in name.upper().split() if w.isalnum()]
            if not q or q in sym or any(w.startswith(q) for w in words):
                out.append(Instrument(
                    symbol=sym, name=name,
                    category="Binance USD-M Futures",
                    provider=self.name,
                    meta={"live": True, "venue": "binance-futures"}))
        return out[: max(1, limit)]

    @staticmethod
    def _validate(symbols: List[str]) -> List[str]:
        bad = [s for s in symbols if s not in SYMBOLS]
        if bad:
            raise ValueError(f"binance: unknown symbols {bad} "
                             f"(this book serves: {', '.join(SYMBOLS)})")
        return list(symbols)

    # -- candles (public REST klines, paginated) ---------------------------

    def candles(self, symbol: str, timeframe: str, limit: int = 500,
                start=None, end=None):
        if symbol not in SYMBOLS:
            raise ValueError(
                f"binance: unknown symbol {symbol} (this book serves: "
                f"{', '.join(SYMBOLS)})")
        tf = _TIMEFRAMES.get(timeframe)
        if tf is None:
            raise ValueError(
                f"binance: unsupported timeframe {timeframe} "
                f"(this venue serves {', '.join(_TIMEFRAMES)})")
        interval, tf_s = tf
        limit = max(1, min(int(limit), _MAX_REST_CANDLES * 4))
        end_s = _to_s(end) or int(time.time())
        start_s = _to_s(start)

        rows: List[list] = []
        window_end = end_s
        while len(rows) < limit:
            want = min(_MAX_REST_CANDLES, limit - len(rows))
            window_start = window_end - want * tf_s + tf_s
            if start_s is not None:
                window_start = max(window_start, start_s)
                if window_start > window_end:
                    break
            url = (f"{REST_BASE}/fapi/v1/klines?symbol={symbol}"
                   f"&interval={interval}&limit={want}"
                   f"&startTime={window_start * 1000}"
                   f"&endTime={window_end * 1000}")
            try:
                with urllib.request.urlopen(url, timeout=15) as resp:
                    batch = json.loads(resp.read().decode())
            except urllib.error.HTTPError as e:
                body = e.read().decode(errors="replace")[:200]
                # Venue errors keep the venue's words — a 429 says 429.
                raise NotSupported(
                    f"binance: klines REST HTTP {e.code}: {body}") from e
            except Exception as e:  # noqa: BLE001
                raise NotSupported(
                    f"binance: klines REST failed: {e}") from e
            got = 0
            for k in batch or []:
                try:
                    rows.append([int(k[0]) // 1000,
                                 float(k[1]), float(k[2]),
                                 float(k[3]), float(k[4]), float(k[5])])
                    got += 1
                except (TypeError, ValueError, IndexError):
                    continue
            if got == 0:
                break
            if start_s is not None and window_start <= start_s:
                break
            window_end = window_start - tf_s
        rows.sort(key=lambda r: r[0])
        if start_s is not None:
            rows = [r for r in rows if r[0] >= start_s]
        rows = [r for r in rows if r[0] <= end_s]
        if not rows:
            raise NotSupported(
                f"binance: venue served no history for {symbol} {timeframe}")
        df = pd.DataFrame(rows[-limit:], columns=CANDLE_COLUMNS)
        df.attrs["venue"] = self.venue
        return df

    # -- live ticks (aggTrade) --------------------------------------------

    def stream(self, symbols: List[str]) -> AsyncIterator[dict]:
        self._validate(symbols)   # eager, per the provider contract

        async def _ticks():
            async for ev in self._pump(symbols, want=("trade",)):
                yield {"symbol": ev.symbol, "price": ev.price,
                       "ts": ev.ts, "volume": ev.size, "side": ev.side,
                       "trade_id": ev.trade_id}

        return _ticks()

    # -- live book (partial top-20 — every frame is complete) --------------

    def depth_stream(self, symbols: List[str]) -> AsyncIterator:
        self._validate(symbols)
        return self._pump(symbols, want=("depth",))

    def depth_history(self, symbol, start, end, column_ms=1000,
                      max_levels=50):
        raise NotSupported(
            "Binance exposes no public L2 history; the terminal's session "
            "recorder is the history path (data honesty rule).")

    def configured(self) -> bool:
        return True  # keyless public market data

    def capabilities(self):
        caps = super().capabilities()
        caps.discard("depth_history")
        return caps

    # -- the shared pump: one socket, one hop, forever ----------------------

    async def _pump(self, symbols: List[str], want: tuple) -> AsyncIterator:
        """One combined-stream socket. Reconnect rules mirror Coinbase:
        capped exponential backoff; the socket IS the subscription (the
        streams are in the URL), so a reconnect resubscribes by dialing;
        per-frame-complete depth means NO book state survives or needs
        to. Trade dedupe persists by aggregate id (a) across reconnects.
        """
        parts = []
        for s in symbols:
            if "trade" in want:
                parts.append(f"{s.lower()}@aggTrade")
            if "depth" in want:
                parts.append(f"{s.lower()}@depth20@100ms")
        url = f"{WS_BASE}/stream?streams={'/'.join(parts)}"
        seen_ids: Dict[str, deque] = {s: deque(maxlen=4096)
                                      for s in symbols}
        attempt = 0
        while True:
            ws = None
            try:
                ws = await self._connect(url)
                attempt = 0
                async for raw in ws:
                    env = json.loads(raw)
                    stream_name = str(env.get("stream") or "")
                    data = env.get("data")
                    if not isinstance(data, dict):
                        continue
                    symbol = str(data.get("s") or
                                 stream_name.split("@")[0].upper())
                    if symbol not in seen_ids:
                        continue
                    if stream_name.endswith("@aggTrade"):
                        trade_id = data.get("a")
                        if trade_id is not None and \
                                trade_id in seen_ids[symbol]:
                            continue        # id identity: never double-count
                        if trade_id is not None:
                            seen_ids[symbol].append(trade_id)
                        # m: buyer is the maker -> the taker SOLD.
                        side = TRADE_SELL if data.get("m") else TRADE_BUY
                        ts = (int(data["T"]) / 1000.0) if data.get("T") \
                            else time.time()
                        _diag.observe("binance", symbol, ts, kind="trade")
                        yield _Trade(symbol=symbol,
                                     price=float(data["p"]), ts=ts,
                                     size=float(data["q"]), side=side,
                                     trade_id=trade_id)
                    elif "@depth" in stream_name:
                        # Partial book: a COMPLETE top-20 per frame.
                        ts_ms = data.get("E") or data.get("T")
                        ts = (int(ts_ms) / 1000.0) if ts_ms else time.time()
                        bids = sorted(((float(p), float(q))
                                       for p, q in data.get("b") or []),
                                      key=lambda x: -x[0])
                        asks = sorted(((float(p), float(q))
                                       for p, q in data.get("a") or []),
                                      key=lambda x: x[0])
                        _diag.observe("binance", symbol, ts, kind="book")
                        yield DepthEvent(symbol=symbol, ts=ts,
                                         type=DEPTH_SNAPSHOT,
                                         bids=bids, asks=asks)
            except asyncio.CancelledError:
                raise
            except Exception as exc:  # noqa: BLE001
                log.warning("binance pump error: %s", exc)
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
                    f"binance unreachable after {attempt} attempts "
                    f"({WS_BASE})")
            delay = min(_BACKOFF_CAP_S,
                        self._backoff_base * (2 ** min(attempt, 6)))
            log.info("binance reconnect in %.1fs (attempt %d)", delay, attempt)
            await asyncio.sleep(delay)


class _Trade:
    """Internal normalized print carried between the pump and stream(), so
    the public stream shape stays exactly the terminal's tick dict."""

    __slots__ = ("symbol", "price", "ts", "size", "side", "trade_id")

    def __init__(self, symbol, price, ts, size, side, trade_id):
        self.symbol = symbol
        self.price = price
        self.ts = ts
        self.size = size
        self.side = side
        self.trade_id = trade_id
