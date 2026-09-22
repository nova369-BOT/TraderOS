"""Hyperliquid perps, direct — the chart's single Hyperliquid surface (D25).

Design law (same as Binance/Coinbase): the chart dials the venue DIRECTLY,
one socket hop, keyless, in pure Python — no child process, no toolchain
dependency, no whole-exchange catalog download. This module is the third
native pipeline: a CURATED catalog held in memory, the venue's own WS doing
all live work, candles over the public info REST.

Protocol facts (Hyperliquid public market data, keyless):

- REST info: POST https://api.hyperliquid.xyz/info
  - candleSnapshot: {"type":"candleSnapshot","req":{"coin","interval","startTime","endTime"}}
    request cap 5000 rows, intervals: 1m,3m,5m,15m,30m,1h,2h,4h,8h,12h,1d,3d,1w,1M
    (also 1s via Dwellir index, but venue native is 1m+; we support all listed)
  - l2Book: {"type":"l2Book","coin"} -> {coin,time,levels:[[bids],[asks]]} each {px,sz,n}
  - recentTrades: {"type":"recentTrades","coin"} -> list of {coin,side,px,sz,time,hash,tid,users}
  - meta: {"type":"meta"} -> universe of perps
- WS: wss://api.hyperliquid.xyz/ws
  - subscribe: {"method":"subscribe","subscription":{"type":"trades","coin":"BTC"}}
  - l2Book: {"type":"l2Book","coin":"BTC"}
  - candle: {"type":"candle","coin":"BTC","interval":"1m"}
  - Envelope: {"channel": "...", "data": ...}
    - trades: data = [{coin,side,px,sz,time,hash,tid,users}, ...]
    - l2Book: data = {coin,time,levels:[[bid...],[ask...]]}
    - candle: data = {t,T,s,i,o,h,l,c,v,n} (t open ms, T close ms)

Data honesty: live-only book (Hyperliquid exposes no public L2 history —
the session recorder stays the history path); no symbol outside curated
list is ever resolved; venue errors surface with venue's own message.

Ultra-fast: WS_OPEN_TIMEOUT 0.2s (faster than Binance 0.3s, Coinbase 0.8s),
BACKOFF_CAP 0.2s, tick flush 15ms (vs Binance 20ms, Coinbase 50ms),
candle lane 15ms repair/grace vs Binance 20ms vs Coinbase 50ms.
"""

from __future__ import annotations

import asyncio
import json
import logging
import re
import os
import time
import threading
from concurrent.futures import ThreadPoolExecutor
from collections import deque
from datetime import datetime, timezone
from typing import AsyncIterator, Dict, List, Optional

import pandas as pd

from ._http import HttpPool, base_of
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

WS_BASE = os.environ.get("HYPERLIQUID_WS", "wss://api.hyperliquid.xyz/ws")
REST_BASE = os.environ.get("HYPERLIQUID_REST", "https://api.hyperliquid.xyz")

# One keep-alive pool per host (like Binance/Coinbase): urllib used to pay
# fresh TCP+TLS per page; pool makes it one per host.
_POOLS: dict = {}
_POOLS_LOCK = threading.Lock()

def _pool_for(base: str) -> HttpPool:
    with _POOLS_LOCK:
        pool = _POOLS.get(base)
        if pool is None:
            pool = _POOLS[base] = HttpPool()
    return pool

# Curated liquid perps — one row per supported symbol is the whole change
# to add another; nothing is ever downloaded to answer the sidebar.
SYMBOLS = {
    "BTC": "Bitcoin / US Dollar (Hyperliquid perp)",
    "ETH": "Ethereum / US Dollar (Hyperliquid perp)",
    "SOL": "Solana / US Dollar (Hyperliquid perp)",
    "HYPE": "HYPE / US Dollar (Hyperliquid perp)",
    "ARB": "Arbitrum / US Dollar (Hyperliquid perp)",
    "AVAX": "Avalanche / US Dollar (Hyperliquid perp)",
    "DOGE": "Dogecoin / US Dollar (Hyperliquid perp)",
    "LINK": "Chainlink / US Dollar (Hyperliquid perp)",
    "XRP": "XRP / US Dollar (Hyperliquid perp)",
    "BNB": "BNB / US Dollar (Hyperliquid perp)",
    "ADA": "Cardano / US Dollar (Hyperliquid perp)",
    "LTC": "Litecoin / US Dollar (Hyperliquid perp)",
    "MATIC": "Polygon / US Dollar (Hyperliquid perp)",
    "OP": "Optimism / US Dollar (Hyperliquid perp)",
    "SUI": "Sui / US Dollar (Hyperliquid perp)",
    "APT": "Aptos / US Dollar (Hyperliquid perp)",
    "PEPE": "Pepe / US Dollar (Hyperliquid perp)",
    "WIF": "Dogwifhat / US Dollar (Hyperliquid perp)",
    "ENA": "Ethena / US Dollar (Hyperliquid perp)",
    "TAO": "Bittensor / US Dollar (Hyperliquid perp)",
}

# Hyperliquid native intervals: 1m,3m,5m,15m,30m,1h,2h,4h,8h,12h,1d,3d,1w,1M
# We map to seconds for lane horizon.
_TIMEFRAMES = {
    "1m": ("1m", 60),
    "3m": ("3m", 180),
    "5m": ("5m", 300),
    "15m": ("15m", 900),
    "30m": ("30m", 1800),
    "1h": ("1h", 3600),
    "2h": ("2h", 7200),
    "4h": ("4h", 14400),
    "8h": ("8h", 28800),
    "12h": ("12h", 43200),
    "1d": ("1d", 86400),
    "3d": ("3d", 259200),
    "1w": ("1w", 604800),
    "1M": ("1M", 2592000),  # approx 30d
}

# Menu: same shape as Binance/Coinbase — custom <n>s buckets via tape
LADDER = ["tick", "1s", "15s", "30s",
          "1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h", "8h", "12h", "1d", "3d", "1w", "1M"]

_SEC_BUCKET = re.compile(r"^(\d+)s$")

_MAX_REST_CANDLES = 5000
_WS_OPEN_TIMEOUT_S = 0.2   # ULTRA-FAST: 200ms - faster than Binance 300ms, Coinbase 800ms
_BACKOFF_CAP_S = 0.2       # ULTRA-FAST: 200ms

def _iso_s(ts: str) -> float:
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
    if v is None:
        return None
    if isinstance(v, str):
        return int(_iso_s(v))
    return int(v)

def _parse_sec_bucket(tf: str) -> Optional[int]:
    m = _SEC_BUCKET.match(tf or "")
    return int(m.group(1)) if m else None

def tape_to_candles(rows: list, step_s: int, limit: int = 500) -> tuple[list, float]:
    """Trade rows -> (candle tuples, newest-tape-time). Tick = one bar per print."""
    buckets: Dict[float, list] = {}
    newest = 0.0
    for r in rows:
        try:
            # Hyperliquid trade: time ms, px, sz
            t_ms = int(r.get("time") or r.get("T") or r.get("t") or 0)
            price = float(r.get("px") or r.get("p") or 0)
            qty = float(r.get("sz") or r.get("q") or 0)
        except (TypeError, ValueError, KeyError, AttributeError):
            continue
        if t_ms <= 0 or price <= 0:
            continue
        ts = t_ms / 1000.0
        newest = max(newest, ts)
        key = (ts // step_s) * step_s if step_s else ts
        if key not in buckets:
            buckets[key] = []
        buckets[key].append((price, qty))
    out: List[tuple] = []
    for key in sorted(buckets):
        pts = buckets[key]
        if step_s:
            o = pts[0][0]
            h = max(x for x, _ in pts)
            l = min(x for x, _ in pts)
            c = pts[-1][0]
            v = sum(q for _, q in pts)
        else:
            o = h = l = c = pts[-1][0]
            v = sum(q for _, q in pts)
        out.append((key, o, h, l, c, v))
    return out[-max(1, int(limit)):], newest


class HyperliquidProvider(Provider):
    """Keyless public Hyperliquid perps market data: trades, L2 book, candles —
    one hop to the venue, no child process, no catalog fetch. Ultra-fast."""

    name = "hyperliquid"
    title = "Hyperliquid Perps (direct, keyless, ultra-fast)"
    venue = "hyperliquid"
    timeframes = list(LADDER)
    deterministic = False

    def __init__(self, backoff_base: float = 0.5):
        self._backoff_base = backoff_base
        self.max_reconnects: Optional[int] = None

    async def _connect(self, url: str):
        import websockets
        return await websockets.connect(
            url, max_size=8 * 1024 * 1024, open_timeout=_WS_OPEN_TIMEOUT_S)

    def search(self, query: str = "", limit: int = 50) -> List[Instrument]:
        q = (query or "").strip().upper().replace("/", "")
        out = []
        for sym, name in SYMBOLS.items():
            words = [w for w in name.upper().split() if w.isalnum()]
            if not q or q in sym or any(w.startswith(q) for w in words):
                out.append(Instrument(
                    symbol=sym, name=name,
                    category="Hyperliquid Perps",
                    provider=self.name,
                    meta={"live": True, "venue": "hyperliquid"}))
        return out[: max(1, limit)]

    @staticmethod
    def _validate(symbols: List[str]) -> List[str]:
        bad = [s for s in symbols if s not in SYMBOLS]
        if bad:
            raise ValueError(f"hyperliquid: unknown symbols {bad} "
                             f"(this book serves: {', '.join(SYMBOLS)})")
        return list(symbols)

    # -- candles (public REST candleSnapshot, paginated) -------------------

    def _post_info(self, payload: dict) -> tuple[int, bytes]:
        url = f"{REST_BASE}/info"
        host, qpath = base_of(url)
        body = json.dumps(payload).encode()
        try:
            code, resp = _pool_for(host).post(host, qpath, body,
                                              headers={"Content-Type": "application/json"})
        except Exception as e:
            raise NotSupported(f"{self.venue}: info REST failed: {e}") from e
        return code, resp

    def candles(self, symbol: str, timeframe: str, limit: int = 500,
                start=None, end=None):
        if symbol not in SYMBOLS:
            raise ValueError(
                f"hyperliquid: unknown symbol {symbol} (this book serves: "
                f"{', '.join(SYMBOLS)})")
        if timeframe == "tick" or _SEC_BUCKET.match(timeframe):
            step = 0 if timeframe == "tick" else int(_parse_sec_bucket(timeframe))
            return self._candles_tape(symbol, timeframe, step, limit, start, end)

        tf = _TIMEFRAMES.get(timeframe)
        if tf is None:
            raise ValueError(
                f"hyperliquid: unsupported timeframe {timeframe!r} — natives: "
                f"{', '.join(_TIMEFRAMES)}; sub-minute: tick or any <n>s bucket from real trade tape")

        interval, tf_s = tf
        limit = max(1, min(int(limit), _MAX_REST_CANDLES * 4))
        end_s = _to_s(end) or int(time.time())
        start_s = _to_s(start)

        # Parallel windows like Binance/Coinbase: clock-slice up front
        windows = []
        we, remaining = end_s, limit
        while remaining > 0:
            want = min(_MAX_REST_CANDLES, remaining)
            ws = we - want * tf_s + tf_s
            if start_s is not None:
                ws = max(ws, start_s)
                if ws > we:
                    break
            windows.append((ws, we, want))
            we = ws - tf_s
            remaining -= want

        def fetch_window(ws: int, we_: int, want: int):
            payload = {
                "type": "candleSnapshot",
                "req": {
                    "coin": symbol,
                    "interval": interval,
                    "startTime": ws * 1000,
                    "endTime": we_ * 1000,
                }
            }
            code, body = self._post_info(payload)
            if code != 200:
                text = body.decode(errors="replace")[:200]
                raise NotSupported(f"{self.venue}: candleSnapshot HTTP {code}: {text}")
            batch = json.loads(body.decode())
            out = []
            for k in batch or []:
                try:
                    # Hyperliquid candle: t open ms, T close ms, o,h,l,c,v
                    ts = int(k["t"]) // 1000
                    out.append([ts,
                                float(k["o"]), float(k["h"]),
                                float(k["l"]), float(k["c"]), float(k["v"])])
                except (TypeError, ValueError, KeyError):
                    continue
            return out

        rows: List[list] = []
        if len(windows) == 1:
            results = [fetch_window(*windows[0])]
        else:
            with ThreadPoolExecutor(
                    max_workers=min(4, len(windows)),
                    thread_name_prefix="hl-candles") as ex:
                results = list(ex.map(lambda w: fetch_window(*w), windows))
        for out in results:
            rows.extend(out)

        # Gap continuation if short page
        we = (windows[-1][0] - tf_s) if windows else end_s
        while len(rows) < limit:
            want = min(_MAX_REST_CANDLES, limit - len(rows))
            window_start = we - want * tf_s + tf_s
            if start_s is not None:
                window_start = max(window_start, start_s)
                if window_start > we:
                    break
            out = fetch_window(window_start, we, want)
            rows.extend(out)
            if not out:
                break
            if start_s is not None and window_start <= start_s:
                break
            we = window_start - tf_s

        rows.sort(key=lambda r: r[0])
        if start_s is not None:
            rows = [r for r in rows if r[0] >= start_s]
        rows = [r for r in rows if r[0] <= end_s]
        if not rows:
            raise NotSupported(
                f"hyperliquid: venue served no history for {symbol} {timeframe}")
        df = pd.DataFrame(rows[-limit:], columns=CANDLE_COLUMNS)
        df.attrs["venue"] = self.venue
        return df

    def _candles_tape(self, symbol: str, timeframe: str, step: int,
                      limit: int, start, end):
        end_s = _to_s(end) or int(time.time())
        start_s = _to_s(start)
        # recentTrades returns ~10 most recent trades — honest short history
        # for sub-minute; like Binance/Coinbase, deeper windows are not faked.
        payload = {"type": "recentTrades", "coin": symbol}
        code, body = self._post_info(payload)
        if code != 200:
            raise NotSupported(
                f"{self.venue}: recentTrades HTTP {code}: {body.decode(errors='replace')[:200]}")
        data = json.loads(body.decode())
        tapes = data if isinstance(data, list) else []
        if start_s is not None:
            tapes = [r for r in tapes if int(r.get("time", 0)) >= start_s * 1000]
        tapes = [r for r in tapes if int(r.get("time", 0)) <= end_s * 1000]
        bars, _newest = tape_to_candles(tapes, step, limit)
        if not bars:
            raise NotSupported(
                f"{self.venue}: the trade tape holds no prints inside "
                f"{symbol} {timeframe} (tape history is seconds deep by design)")
        df = pd.DataFrame(bars, columns=CANDLE_COLUMNS)
        df.attrs["venue"] = self.venue
        return df

    # -- live ticks (trades WS) --------------------------------------------

    def stream(self, symbols: List[str]) -> AsyncIterator[dict]:
        self._validate(symbols)

        async def _ticks():
            async for ev in self._pump(symbols, want=("trade",)):
                yield {"symbol": ev.symbol, "price": ev.price,
                       "ts": ev.ts, "volume": ev.size, "side": ev.side,
                       "trade_id": ev.trade_id}

        return _ticks()

    # -- live klines (candle WS) -------------------------------------------

    def supports_candle_stream(self, symbol: str, timeframe: str) -> bool:
        return symbol in SYMBOLS and timeframe in _TIMEFRAMES

    def candle_tf_seconds(self, timeframe: str) -> int:
        return _TIMEFRAMES[timeframe][1]

    def candle_stream(self, symbols: List[str],
                      timeframe: str) -> AsyncIterator[dict]:
        self._validate(symbols)
        interval, _tf_s = _TIMEFRAMES[timeframe]

        async def _klines():
            async for ev in self._pump(symbols, want=(f"candle:{interval}",)):
                yield {"symbol": ev.symbol, "timeframe": timeframe,
                       "ts": ev.ts, "open": ev.open, "high": ev.high,
                       "low": ev.low, "close": ev.close,
                       "volume": ev.volume, "closed": ev.closed,
                       "event_ts": ev.event_ts}

        return _klines()

    # -- live book (l2Book WS) ----------------------------------------------

    def depth_stream(self, symbols: List[str]) -> AsyncIterator:
        self._validate(symbols)
        return self._pump(symbols, want=("depth",))

    def depth_history(self, symbol, start, end, column_ms=1000, max_levels=50):
        raise NotSupported(
            "Hyperliquid exposes no public L2 history; the terminal's session "
            "recorder is the history path (data honesty rule).")

    def trade_history(self, symbol, start, end, column_ms=1000):
        """Trade history for footprint/VPVR/CVD — uses recentTrades REST."""
        if symbol not in SYMBOLS:
            raise ValueError(f"hyperliquid: unknown symbol {symbol}")
        from lse_terminal.contracts.types import TradeEvent
        start_i, end_i = int(start), int(end)
        if end_i <= start_i:
            return []
        payload = {"type": "recentTrades", "coin": symbol}
        code, body = self._post_info(payload)
        if code != 200:
            raise NotSupported(f"hyperliquid: recentTrades HTTP {code}: {body.decode(errors='replace')[:200]}")
        data = json.loads(body.decode())
        tapes = data if isinstance(data, list) else []
        tapes = [r for r in tapes if int(r.get("time", 0)) >= start_i * 1000 and int(r.get("time", 0)) <= end_i * 1000]
        out = []
        for r in tapes:
            try:
                ts = int(r.get("time", 0)) / 1000.0
                price = float(r.get("px"))
                qty = float(r.get("sz"))
                side = TRADE_BUY if r.get("side") == "B" else TRADE_SELL
                out.append(TradeEvent(symbol=symbol, ts=ts, price=price, size=qty, side=side))
            except Exception:
                continue
        return out

    def liquidation_stream(self, symbols: List[str]):
        """Liquidation proxy via large trades (Hyperliquid has no public liq stream)."""
        self._validate(symbols)

        async def _liq_proxy():
            async for ev in self._pump(symbols, want=("trade",)):
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
        return True

    def capabilities(self):
        caps = super().capabilities()
        caps.discard("depth_history")
        return caps

    # -- shared pump: one socket, one hop, forever --------------------------

    async def _pump(self, symbols: List[str], want: tuple) -> AsyncIterator:
        """One WS, multiple subscriptions. Reconnect rules: capped exponential
        backoff 0.2s (faster than Binance 0.3s, Coinbase 0.8s); socket IS the
        subscription (re-subscribe on reconnect); trade dedupe by tid across
        reconnects; l2Book is full snapshot per message (no patch chain)."""
        want_trade = "trade" in want
        want_depth = "depth" in want
        want_candle_intervals = [w.split(":", 1)[1] for w in want if w.startswith("candle:")]
        want_candle = len(want_candle_intervals) > 0

        seen_ids: Dict[str, deque] = {s: deque(maxlen=4096) for s in symbols}
        attempt = 0

        while True:
            ws = None
            try:
                ws = await self._connect(WS_BASE)
                # Subscribe to all requested channels
                for s in symbols:
                    if want_trade:
                        await ws.send(json.dumps({
                            "method": "subscribe",
                            "subscription": {"type": "trades", "coin": s}
                        }))
                    if want_depth:
                        await ws.send(json.dumps({
                            "method": "subscribe",
                            "subscription": {"type": "l2Book", "coin": s}
                        }))
                    for interval in want_candle_intervals:
                        await ws.send(json.dumps({
                            "method": "subscribe",
                            "subscription": {"type": "candle", "coin": s, "interval": interval}
                        }))
                attempt = 0
                async for raw in ws:
                    try:
                        msg = json.loads(raw)
                    except Exception:
                        continue
                    channel = msg.get("channel")
                    data = msg.get("data")
                    if not channel or data is None:
                        continue

                    if channel == "trades" and want_trade:
                        # data is array of trades
                        trades = data if isinstance(data, list) else [data]
                        for tr in trades:
                            try:
                                coin = tr.get("coin")
                                if coin not in seen_ids:
                                    continue
                                tid = tr.get("tid")
                                if tid is not None and tid in seen_ids[coin]:
                                    continue
                                if tid is not None:
                                    seen_ids[coin].append(tid)
                                side = TRADE_BUY if tr.get("side") == "B" else TRADE_SELL
                                ts = int(tr.get("time", 0)) / 1000.0 if tr.get("time") else time.time()
                                _diag.observe("hyperliquid", coin, ts, kind="trade")
                                yield _Trade(symbol=coin,
                                             price=float(tr["px"]),
                                             ts=ts,
                                             size=float(tr["sz"]),
                                             side=side,
                                             trade_id=tid)
                            except (KeyError, TypeError, ValueError):
                                continue

                    elif channel == "l2Book" and want_depth:
                        try:
                            # data: {coin,time,levels:[[bids],[asks]]}
                            if not isinstance(data, dict):
                                continue
                            coin = data.get("coin")
                            if coin not in seen_ids:
                                continue
                            t_ms = data.get("time", 0)
                            ts = int(t_ms) / 1000.0 if t_ms else time.time()
                            levels = data.get("levels") or []
                            if len(levels) < 2:
                                continue
                            bids_raw = levels[0] or []
                            asks_raw = levels[1] or []
                            bids = sorted(((float(l["px"]), float(l["sz"]))
                                           for l in bids_raw),
                                          key=lambda x: -x[0])
                            asks = sorted(((float(l["px"]), float(l["sz"]))
                                           for l in asks_raw),
                                          key=lambda x: x[0])
                            _diag.observe("hyperliquid", coin, ts, kind="book")
                            yield DepthEvent(symbol=coin, ts=ts,
                                             type=DEPTH_SNAPSHOT,
                                             bids=bids, asks=asks)
                        except (KeyError, TypeError, ValueError):
                            continue

                    elif channel == "candle" and want_candle:
                        try:
                            # data: {t,T,s,i,o,h,l,c,v,n}
                            if not isinstance(data, dict):
                                continue
                            coin = data.get("s")
                            if coin not in seen_ids:
                                continue
                            # closed if close time in past
                            close_ms = int(data.get("T", 0))
                            closed = bool(close_ms and close_ms <= int(time.time() * 1000))
                            yield _Kline(
                                symbol=coin,
                                interval=str(data.get("i", "")),
                                ts=int(data["t"]) // 1000,
                                open_=float(data["o"]),
                                high=float(data["h"]),
                                low=float(data["l"]),
                                close=float(data["c"]),
                                volume=float(data["v"]),
                                closed=closed,
                                event_ts=close_ms // 1000 if close_ms else int(time.time()))
                        except (KeyError, TypeError, ValueError):
                            continue

            except asyncio.CancelledError:
                raise
            except Exception as exc:
                log.warning("hyperliquid pump error: %s", exc)
            finally:
                if ws is not None:
                    try:
                        await ws.close()
                    except Exception:
                        pass
            attempt += 1
            if self.max_reconnects is not None and attempt > self.max_reconnects:
                raise ConnectionError(
                    f"hyperliquid unreachable after {attempt} attempts ({WS_BASE})")
            delay = min(_BACKOFF_CAP_S,
                        self._backoff_base * (2 ** min(attempt, 6)))
            log.info("hyperliquid reconnect in %.1fs (attempt %d)", delay, attempt)
            await asyncio.sleep(delay)


class _Kline:
    __slots__ = ("symbol", "interval", "ts", "open", "high", "low",
                 "close", "volume", "closed", "event_ts")

    def __init__(self, symbol, interval, ts, open_, high, low, close,
                 volume, closed, event_ts):
        self.symbol = symbol
        self.interval = interval
        self.ts = ts
        self.open = open_
        self.high = high
        self.low = low
        self.close = close
        self.volume = volume
        self.closed = closed
        self.event_ts = event_ts


class _Trade:
    __slots__ = ("symbol", "price", "ts", "size", "side", "trade_id")

    def __init__(self, symbol, price, ts, size, side, trade_id):
        self.symbol = symbol
        self.price = price
        self.ts = ts
        self.size = size
        self.side = side
        self.trade_id = trade_id
