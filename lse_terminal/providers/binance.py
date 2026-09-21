"""Binance USD-M futures, direct — the chart's single Binance surface
(D12, owner-locked 2026-09-19).

Design law (D12/D13, owner-locked): the chart dials the venue
DIRECTLY, one socket hop, keyless, in pure Python — no child process,
no toolchain dependency, no whole-exchange catalog download. This
module is the Coinbase-shaped native pipeline: a CURATED catalog held
in memory (nothing is ever downloaded to answer the sidebar), the
combined-stream socket doing all live work, candles over the public
klines REST. Written against the same rules as providers/coinbase.py.

Geo law (D14): the trading domains (fapi/api.binance.com) answer
geo-restricted egresses with HTTP 451 and datacenter/ISP egresses with
WAF 418/TLS drops — a LEGAL/ network answer, not something any transport
(ccxt included) out-codes. What serves market data regardless is
Binance's own PUBLIC data mirror (data-api.binance.vision /
data-stream.binance.vision — spot shape, no eligibility gate). So every
network face here is a two-rung ladder: venue first, mirror on the
geo/WAF/unreachable trigger list, winner pinned after first success so
chart paths never re-race. The venue label ALWAYS says which rung fed
the data ("binance" / "binance-spot") — a spot-labelled frame is the
honesty, not a bug.

Protocol facts (Binance public market data, keyless on both rungs):

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
  i.e. the taker SOLD when true. The same prints are served over REST
  (aggTrades) and back the tick / `<n>s` charts — the finest real data
  the venue publishes; there are no sub-minute klines, and none are
  faked.

Data honesty: live-only book (Binance exposes no public L2 history — the
session recorder stays the history path); no symbol outside the curated
list is ever resolved; venue errors (incl. 429) surface with the
venue's own code/message instead of a retry masquerading as truth.
"""

from __future__ import annotations

import asyncio
import json
import logging
import re
import os
import time
import urllib.request
import threading
from concurrent.futures import ThreadPoolExecutor

from ._http import HttpPool, base_of

# One keep-alive pool per base host (venue rung, spot mirror, test fake):
# urllib used to pay a fresh TCP+TLS handshake for every klines/aggTrades
# page; the pool makes it one per host, shared across this process.
_POOLS: dict = {}
_POOLS_LOCK = threading.Lock()


def _pool_for(base: str) -> HttpPool:
    with _POOLS_LOCK:
        pool = _POOLS.get(base)
        if pool is None:
            pool = _POOLS[base] = HttpPool()
    return pool
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
SPOT_WS_BASE = os.environ.get(
    "BINANCE_SPOT_WS", "wss://data-stream.binance.vision")
SPOT_REST_BASE = os.environ.get(
    "BINANCE_SPOT_REST", "https://data-api.binance.vision")

# HTTP answers that mean "this egress may not see the trading venue" —
# never 429 (that is a RATE answer about load, flipped-on would be a lie).
_GEO_HTTP = (451, 418, 403)

# The book's day-one list: one row per supported symbol is the whole
# change to add another; nothing else is downloaded at any point.
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

# The LSE ladder + custom: every bar is built from REAL venue data —
# klines where intervals are native on the venue, and for sub-minute the
# exchange's own trade tape bucketed into seconds (never a synthesized
# fill). Tick = one bar per print.
_TIMEFRAMES = {"1m": ("1m", 60), "3m": ("3m", 180), "5m": ("5m", 300),
               "15m": ("15m", 900), "30m": ("30m", 1800),
               "1h": ("1h", 3600), "2h": ("2h", 7200), "4h": ("4h", 14400),
               "6h": ("6h", 21600), "8h": ("8h", 28800),
               "12h": ("12h", 43200), "1d": ("1d", 86400),
               "3d": ("3d", 259200), "1w": ("1w", 604800)}

# The menu (LSE-shaped, owner-locked): custom entries beyond it ride the
# same rules — any `<n>s` tape bucket, any native interval above.
LADDER = ["tick", "1s", "15s", "30s",
          "1m", "5m", "15m", "30m", "1h", "4h", "1d", "1w"]

_SEC_BUCKET = re.compile(r"^(\d+)s$")

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


def _parse_sec_bucket(tf: str) -> Optional[int]:
    m = _SEC_BUCKET.match(tf or "")
    return int(m.group(1)) if m else None


def tape_to_candles(rows: list, step_s: int,
                    limit: int = 500) -> tuple[list, float]:
    """aggTrades rows -> (candle tuples, newest-tape-time).

    Tick (step_s == 0): one bar per print — the LSE tape shape, o=h=l=c.
    Otherwise fixed `<n>s` buckets. Empty/short tapes return what exists —
    never a fabricated fill, and never more than `limit` newest bars.
    """
    buckets: Dict[float, list] = {}
    newest = 0.0
    for r in rows:
        try:
            t_ms = int(r.get("T") or r.get("t") or 0)
            price = float(r["p"])
            qty = float(r["q"])
        except (TypeError, ValueError, KeyError, AttributeError):
            continue                      # garbage row: the wire moves on
        if t_ms <= 0:
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


class BinanceProvider(Provider):
    """Keyless public Binance USD-M market data: trades, top-20 book,
    candles — one hop to the venue, no child process, no catalog fetch.
    """

    name = "binance"
    title = "Binance USD-M Futures (direct, keyless)"
    venue = "binance"          # default label; instance attrs may narrow it
    timeframes = list(LADDER)
    deterministic = False

    def __init__(self, backoff_base: float = 1.0):
        self._backoff_base = backoff_base
        # Tests bound the reconnect loop; production reconnects forever.
        self.max_reconnects: Optional[int] = None
        # Ladder state (D14): which rung serves this process. 0 = the
        # trade venue, 1 = the public data mirror; a success PINS the
        # winner (ticks and candles both read self.venue live, so the
        # venue badge flips the moment the mirror takes over).
        self.venue = "binance"
        self._rest_rung = 0
        self._ws_rung = 0

    # -- the ONLY socket touchpoint; tests drive everything else ----------

    async def _connect(self, url: str):
        import websockets
        return await websockets.connect(
            url, max_size=8 * 1024 * 1024, open_timeout=_WS_OPEN_TIMEOUT_S)

    # -- the D14 ladders (module constants are the test seam) --------------

    @staticmethod
    def _rest_rungs():
        return (("binance", REST_BASE, "/fapi/v1"),
                ("binance-spot", SPOT_REST_BASE, "/api/v3"))

    @staticmethod
    def _ws_rungs():
        return (("binance", WS_BASE), ("binance-spot", SPOT_WS_BASE))

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
        if timeframe == "tick" or _SEC_BUCKET.match(timeframe):
            # Sub-minute: no such klines exist on ANY crypto venue, so the
            # bars are the exchange's own recent trade tape bucketed by
            # seconds (honest, shortest real history, the live stream
            # extends the edge).
            step = 0 if timeframe == "tick" else int(_parse_sec_bucket(timeframe))
            return self._candles_tape(symbol, timeframe, step, limit,
                                      start, end)
        tf = _TIMEFRAMES.get(timeframe)
        if tf is None:
            raise ValueError(
                f"binance: unsupported timeframe {timeframe!r} — natives: "
                f"{', '.join(_TIMEFRAMES)}; sub-minute: tick or any "
                f"<n>s bucket from the real trade tape (45s, 90s…)")
        interval, tf_s = tf
        limit = max(1, min(int(limit), _MAX_REST_CANDLES * 4))
        end_s = _to_s(end) or int(time.time())
        start_s = _to_s(start)

        # REST ladder (D14): pinned winner first; a geo/WAF/unreachable
        # answer advances the rung INSIDE this call; everything else
        # (429, empty book) is the venue's truth and surfaces verbatim.
        # Speed law (owner, 2026-09-21): the windows the old serial loop
        # derived by count are clock-computable up front, so multi-window
        # loads fetch them IN PARALLEL over keep-alive connections —
        # same requests, same bytes, same refusals, wall-time of one page
        # instead of four. Pages are disjoint by construction, so the
        # merge needs no dedupe; the venue ladder flips under one lock.
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
        rungs = self._rest_rungs()
        state = {"any_rows": False}
        rung_lock = threading.Lock()

        def fetch_window(ws: int, we_: int, want: int):
            while True:
                with rung_lock:
                    idx = self._rest_rung
                venue, base, path = rungs[idx]      # path: api prefix
                url = (f"{base}{path}/klines?symbol={symbol}"
                       f"&interval={interval}&limit={want}"
                       f"&startTime={ws * 1000}"
                       f"&endTime={we_ * 1000}")
                host, qpath = base_of(url)
                try:
                    code, body = _pool_for(host).get(host, qpath)
                except Exception as e:  # noqa: BLE001
                    # TLS drop / ISP block / DNS poison: same ladder move.
                    with rung_lock:
                        can_flip = (self._rest_rung < len(rungs) - 1
                                    and not state["any_rows"])
                        if can_flip:
                            self._rest_rung += 1
                    if can_flip:
                        continue
                    raise NotSupported(
                        f"{venue}: klines REST failed: {e}") from e
                if code != 200:
                    text = body.decode(errors="replace")[:200]
                    with rung_lock:
                        can_flip = (code in _GEO_HTTP
                                    and self._rest_rung < len(rungs) - 1
                                    and not state["any_rows"])
                        if can_flip:
                            self._rest_rung += 1
                    if can_flip:
                        # Eligibility/WAF answer: this egress may not
                        # touch the venue — move to the public data
                        # mirror and take the same symbols in the
                        # venue's own spot shape.
                        continue
                    # Venue errors keep the venue's words — a 429 says 429.
                    raise NotSupported(
                        f"{venue}: klines REST HTTP {code}: {text}")
                batch = json.loads(body.decode())
                out = []
                for k in batch or []:
                    try:
                        out.append([int(k[0]) // 1000,
                                    float(k[1]), float(k[2]),
                                    float(k[3]), float(k[4]), float(k[5])])
                    except (TypeError, ValueError, IndexError):
                        continue
                if out:
                    state["any_rows"] = True
                return out, venue

        rows: List[list] = []
        serving_venue = None
        if len(windows) == 1:
            results = [fetch_window(*windows[0])]
        else:
            with ThreadPoolExecutor(
                    max_workers=min(4, len(windows)),
                    thread_name_prefix="klines") as ex:
                results = list(ex.map(lambda w: fetch_window(*w), windows))
        for out, venue in results:
            serving_venue = venue
            rows.extend(out)
        # Gap continuation — the old serial law, kept verbatim: when a
        # window comes back SHORT of its ask, more history exists below
        # the plan, so chase it downward one page at a time with exactly
        # the old loop's adaptive queries until filled, the venue blanks,
        # or `start` is covered. Full pages (the norm on this book) never
        # enter this loop — they were already fetched in parallel.
        we = (windows[-1][0] - tf_s) if windows else end_s
        while len(rows) < limit:
            want = min(_MAX_REST_CANDLES, limit - len(rows))
            window_start = we - want * tf_s + tf_s
            if start_s is not None:
                window_start = max(window_start, start_s)
                if window_start > we:
                    break
            out, venue = fetch_window(window_start, we, want)
            serving_venue = venue
            rows.extend(out)
            if not out:
                break
            if start_s is not None and window_start <= start_s:
                break
            we = window_start - tf_s
        serving_venue = serving_venue or self._rest_rungs()[self._rest_rung][0]
        rows.sort(key=lambda r: r[0])
        if start_s is not None:
            rows = [r for r in rows if r[0] >= start_s]
        rows = [r for r in rows if r[0] <= end_s]
        if not rows:
            raise NotSupported(
                f"binance: venue served no history for {symbol} {timeframe}")
        df = pd.DataFrame(rows[-limit:], columns=CANDLE_COLUMNS)
        df.attrs["venue"] = serving_venue
        self.venue = serving_venue     # the tick badge flips with the rung
        return df

    # -- sub-minute from the exchange's own trade tape (honest depth) ------

    def _fetch_tape_page(self, url: str, rungs) -> tuple:
        """One aggTrades page through the SAME ladder law as klines:
        venue rung first; a geo/WAF/unreachable answer advances the rung
        and reties ONCE here; venue's own errors (429) surface verbatim.
        Pages stay serial (each next cursor is the previous page's oldest
        print — that IS the venue's paging law), but ride keep-alive
        connections so only the first page pays the handshake.
        Returns (rows, venue)."""
        while True:
            venue, base, prefix = rungs[self._rest_rung]
            full = f"{base}{prefix}/aggTrades?{url}"
            host, qpath = base_of(full)
            try:
                code, body = _pool_for(host).get(host, qpath)
            except Exception as e:  # noqa: BLE001
                if self._rest_rung < len(rungs) - 1:
                    self._rest_rung += 1
                    continue
                raise NotSupported(
                    f"{venue}: aggTrades REST failed: {e}") from e
            if code != 200:
                text = body.decode(errors="replace")[:200]
                if code in _GEO_HTTP and self._rest_rung < len(rungs) - 1:
                    self._rest_rung += 1
                    continue
                raise NotSupported(
                    f"{venue}: aggTrades REST HTTP {code}: {text}")
            data = json.loads(body.decode())
            return (data if isinstance(data, list) else []), venue

    def _candles_tape(self, symbol: str, timeframe: str, step: int,
                      limit: int, start, end):
        end_s = _to_s(end) or int(time.time())
        start_s = _to_s(start)
        rungs = self._rest_rungs()
        tapes: list = []
        # aggTrades pages ASCEND by id; walk ENDTIME backwards for older
        # pages. Cap 12 pages (12k prints ≈ seconds-to-minutes of depth on
        # a liquid pair) — the tape is the honest short history; nobody is
        # served a fabricated older bar.
        page_end_ms = end_s * 1000
        serving_venue = None
        for _ in range(12):
            q = (f"symbol={symbol}&limit=1000&endTime={page_end_ms}")
            batch, serving_venue = self._fetch_tape_page(q, rungs)
            if not batch:
                break
            tapes = batch + tapes
            oldest = min(int(r.get("T") or r.get("t") or 0) for r in batch)
            if len(batch) < 1000 or                     (start_s is not None and oldest <= start_s * 1000):
                break
            page_end_ms = oldest - 1
        if start_s is not None:
            tapes = [r for r in tapes
                     if int(r.get("T") or r.get("t") or 0) >= start_s * 1000]
        tapes = [r for r in tapes
                 if int(r.get("T") or r.get("t") or 0) <= end_s * 1000]
        bars, _newest = tape_to_candles(tapes, step, limit)
        if not bars:
            raise NotSupported(
                f"{self.venue}: the trade tape holds no prints inside "
                f"{symbol} {timeframe} (tape history is seconds-to-"
                f"minutes deep by design)")
        df = pd.DataFrame(bars, columns=CANDLE_COLUMNS)
        if serving_venue is None:
            serving_venue = rungs[self._rest_rung][0]
        df.attrs["venue"] = serving_venue
        self.venue = serving_venue
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
        streams = '/'.join(parts)
        seen_ids: Dict[str, deque] = {s: deque(maxlen=4096)
                                      for s in symbols}
        attempt = 0
        while True:
            ws = None
            # WS ladder (D14): dial the pinned rung; a dial failure (TLS
            # drop, refused, WAF close) advances to the public data
            # mirror inside this cycle. A CONNECTED socket then pins the
            # rung and narrows the venue label; a dead socket re-dials
            # the pinned winner without re-racing.
            try:
                rungs = self._ws_rungs()
                venue, base = rungs[self._ws_rung]
                url = f"{base}/stream?streams={streams}"
                try:
                    ws = await self._connect(url)
                except asyncio.CancelledError:
                    raise
                except Exception:  # noqa: BLE001
                    if self._ws_rung < len(rungs) - 1:
                        self._ws_rung += 1
                        venue, base = rungs[self._ws_rung]
                        url = f"{base}/stream?streams={streams}"
                        ws = await self._connect(url)
                    else:
                        raise
                self.venue = venue
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
                        # Partial book: a COMPLETE top-20 per frame. USD-M
                        # keys are b/a with E/T stamps; the public mirror's
                        # spot shape is bids/asks, timestamp-free.
                        ts_ms = data.get("E") or data.get("T")
                        ts = (int(ts_ms) / 1000.0) if ts_ms else time.time()
                        bids = sorted(((float(p), float(q))
                                       for p, q in
                                       data.get("b") or data.get("bids")
                                       or []),
                                      key=lambda x: -x[0])
                        asks = sorted(((float(p), float(q))
                                       for p, q in
                                       data.get("a") or data.get("asks")
                                       or []),
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
                    f"(last tried: {self._ws_rungs()[self._ws_rung][1]})")
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
