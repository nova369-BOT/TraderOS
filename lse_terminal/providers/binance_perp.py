"""Binance USD-M futures, direct — the merged Phase-0 data spine.

A faithful Python port of the user's edgedepth-gateway Binance adapter
(internal/binance/, MIT, company-owned): the same endpoints, the same
sequence-checked book synchronisation (Binance's documented futures
procedure), the same stream routing (/public for depth, /market for trades),
the same escape hatches (BINANCE_REST / BINANCE_WS env overrides), the same
honesty (live-only depth; history is the terminal's recorder).

Why this exists: one TraderOS service then serves real Binance orderflow
with ZERO extra containers, env vars or wiring — the complexity the merged
plan removes. The edgedepth gateway provider remains for gateway users.

Ported semantics, verbatim from feed.go/stream.go/rest.go:
- diffs buffer (capped 5000) until a REST snapshot lands;
- first applied diff must STRADDLE the snapshot id (U <= lastUpdateId <= u);
- afterwards each diff's pu must equal the previous u, else one collapsed
  resync (rate-limit guard: never more often than 1s);
- size 0 deletes the level; snapshot BookUpdates carry the FULL book;
- aggTrade: buyer-is-maker => aggressor SELL; duplicate ids never double-count;
  CM messages (st=2) excluded;
- Binance drops every WS at 24h: clean close is routine, reconnect with
  jittered backoff, and every reconnect resyncs the book.
"""

from __future__ import annotations

import asyncio
import gzip
import json
import logging

from lse_terminal.engine.datadiag import diag as _diag
import os
import random
import threading
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import AsyncIterator, Callable, Dict, List, Optional

from lse_terminal.contracts import (
    CANDLE_COLUMNS,
    DEPTH_DELTA,
    DEPTH_SNAPSHOT,
    TRADE_BUY,
    TRADE_SELL,
    NotSupported,
    Provider,
    TradeEvent,
)
from lse_terminal.contracts.types import DepthEvent, Instrument

log = logging.getLogger("lse_terminal")

REST_BASE = os.environ.get("BINANCE_REST", "https://fapi.binance.com")
WS_BASE = os.environ.get("BINANCE_WS", "wss://fstream.binance.com")

# Binance's public market-data mirror on a separate TLD. The main domains are
# WAF-418 from datacenter egress and ISP-blocked in several countries
# (Nigeria), but the .vision mirror is published exactly for third-party
# consumption: same kline/depth/aggTrade wire format, spot book. Every REST
# call and WS route tries the primary first and falls back to this.
# Env overrides exist so the whole spine can be pointed at a stand-in
# exchange for offline e2e.
MIRROR_REST = os.environ.get("BINANCE_MIRROR_REST",
                             "https://data-api.binance.vision")
MIRROR_WS = os.environ.get("BINANCE_MIRROR_WS",
                           "wss://data-stream.binance.vision")

INTERVALS = {60: "1m", 300: "5m", 900: "15m", 1800: "30m", 3600: "1h",
             7200: "2h", 14400: "4h", 86400: "1d", 604800: "1w"}
# The ladder mirrors the LSE book: every minute-and-up bar is a native
# Binance kline on both venues. Below the minute the futures wire carries
# no klines at all, so 1s/30s are built from the exchange's own recent
# trade tape (aggTrades) — the finest real data the futures line carries —
# and tick is one bar per print.
TIMEFRAMES = ["tick", "1s", "30s", "1m", "5m", "15m", "30m", "1h", "2h",
              "4h", "1d", "1w"]

# Hard per-request caps published by the exchange: futures klines 1500,
# spot klines 1000, aggTrades 1000 on both. Anything above is a 400
# `-1130 limit is not valid` — which is exactly how every kline timeframe
# used to die (the shell opens charts at limit=5000). History deeper than
# one page is fetched as PARALLEL windowed pages and stitched (see
# _fetch_klines_paged).
KLINE_PAGE_CAP = {"futures": 1500, "spot": 1000}
KLINE_PAGE = 1000            # one page size valid on EITHER leg of the race
KLINE_MAX_PAGES = 5          # 5000 bars = the engine's per-request cap

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

PENDING_CAP = 5000          # feed.go: buffered diffs cap
RESYNC_COOLDOWN = 1.0       # feed.go: nextResync collapse window
SNAPSHOT_LIMIT = 1000       # feed.go: Depth(symbol, 1000)

# Catalog freshness: a real book caches 1h (exchangeInfo moves on listings,
# not ticks); the offline core re-tries after 10s so a cold boot on dead
# egress heals the moment egress returns, without re-hammering the exchange.
# (The retry is cheap: the ticker-first catalog is a ~1MB fetch, and once a
# real book is held, expiry NEVER re-blocks the request — see catalog():
# the stale book is served instantly and the refresh runs in the background.)
CATALOG_TTL = 3600.0
CATALOG_NEG_TTL = 10.0

# Candle/tape board: 2s is the freshness a live chart actually needs (the
# websocket paints the forming bar between refetches); anything older is
# still SERVED — instantly — while a background refresh catches up
# (stale-while-revalidate). A request only ever blocks when this provider
# holds NO data for the key at all.
CANDLE_TTL = 2.0

# The live auto-reload tail (start=…) refetches the same edge on a 2s
# cadence; this floor stops a degraded line from turning that cadence into
# a 3.5s stall every cycle — within the floor the last tail is re-served
# (the shell's merge-by-bar-time makes duplicates a no-op).
TAIL_MIN_INTERVAL = 1.6

# ── stale-while-revalidate machinery ─────────────────────────────────────
# The request path must never wait on the exchange when we already hold
# data: a held answer is served instantly, and the refresh runs here, at
# most one in flight per key. A small pool bounds the background load;
# keys are module-scoped because the registry holds one provider instance
# and the prewarm + routes + auto-reload loop all share it.
_refresh_pool = ThreadPoolExecutor(max_workers=4,
                                   thread_name_prefix="binance-bg")
# Cold (user-blocking) fetches get their own, wider pool: a cold switch
# fires catalog + board + chart at once, each racing two legs; funnelling
# them through the 4-slot refresh pool serialised them (measured: a 3s
# line became a 9s watchlist and a 12s chart).
_cold_pool = ThreadPoolExecutor(max_workers=16,
                                thread_name_prefix="binance-cold")
_inflight: set = set()
_inflight_lock = __import__("threading").Lock()
_cold: Dict[str, "object"] = {}     # key -> in-flight cold fetch (Future)
_cold_lock = __import__("threading").Lock()


def _schedule_refresh(key: str, fn) -> None:
    """Refresh `key` in the background, at most once concurrently. The
    caller keeps serving whatever it holds meanwhile."""
    with _inflight_lock:
        if key in _inflight:
            return
        _inflight.add(key)

    def _run() -> None:
        try:
            fn()
        except Exception as exc:  # noqa: BLE001 — stale data stays served
            log.warning("binance background refresh %s failed: %s", key, exc)
        finally:
            with _inflight_lock:
                _inflight.discard(key)

    _refresh_pool.submit(_run)


def _coalesce(key: str, fetch):
    """The one blocking fetch for a key, SHARED by concurrent callers:
    the boot prewarm and a user's first click on the same chart hit the
    exchange once, not twice — every other caller joins the in-flight
    fetch and gets the same result. fetch() -> (df, venue)."""
    with _cold_lock:
        fut = _cold.get(key)
        if fut is None:
            fut = _cold_pool.submit(fetch)
            _cold[key] = fut
    try:
        return fut.result()
    except BaseException:
        with _cold_lock:
            if _cold.get(key) is fut:
                del _cold[key]
        raise
    finally:
        # Success: drop the finished future — the candle cache (written
        # by the caller) now answers, so the next miss is a real one.
        with _cold_lock:
            if _cold.get(key) is fut:
                del _cold[key]


# ── REST (sync, run in threadpool from async) ────────────────────────────

# One generous ceiling per leg: the race below returns the moment ANY leg
# answers, so a healthy line resolves in well under a second regardless —
# the ceiling only bounds a DEAD leg. 10s is patient enough to capture a
# degraded datacenter line that needs 8s (measured: that scenario used to
# 502 the request and fall the catalog to the 8-symbol core for a minute),
# and short enough that a truly dead line can never hold a user-visible
# request past one cold fetch.
REST_TIMEOUT = 10.0


def _get_json(base: str, path: str, params: Dict[str, str],
              timeout: float = REST_TIMEOUT) -> dict:
    q = "&".join(f"{k}={v}" for k, v in params.items())
    url = base + path + ("?" + q if q else "")
    # gzip: the whole-book ticker is ~1MB and exchangeInfo multi-MB
    # uncompressed; the exchange gzips ~10x when asked, and on a degraded
    # datacenter line transfer time IS the latency.
    req = urllib.request.Request(url, headers={"Accept-Encoding": "gzip",
                                               "User-Agent": "lse-terminal"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            raw = r.read()
            if r.headers.get("Content-Encoding", "") == "gzip":
                raw = gzip.decompress(raw)
            return json.loads(raw)
    except urllib.error.HTTPError as exc:
        # Binance answers 4xx with {"code": -1130, "msg": "..."}; that text
        # is the diagnosis (a rejected parameter is NOT "unreachable").
        try:
            body = json.loads(exc.read() or b"")
            msg = body.get("msg") or body
            code = body.get("code")
        except Exception:  # noqa: BLE001 — non-JSON error body
            msg, code = exc.reason, None
        raise BinanceRESTError(exc.code, code, str(msg), path) from exc


class BinanceRESTError(Exception):
    """An HTTP error the exchange itself answered (not a dead line)."""

    def __init__(self, http: int, code, msg: str, path: str):
        self.http, self.code, self.msg, self.path = http, code, msg, path
        super().__init__(f"binance HTTP {http} on {path}: "
                         f"{'' if code is None else f'{code} '}{msg}")


# primary -> mirror, same wire format on both; tried CONCURRENTLY so a
# WAF'd or ISP-blocked base costs zero latency when the other answers
_DEPTH_CALLS = (("futures", REST_BASE, "/fapi/v1/depth"),
                ("spot", MIRROR_REST, "/api/v3/depth"))
_KLINE_CALLS = (("futures", REST_BASE, "/fapi/v1/klines"),
                ("spot", MIRROR_REST, "/api/v3/klines"))
# 1s klines exist on SPOT only (futures publishes nothing below 1m); the
# 1s/30s charts take them from the mirror and fall back to the trade tape.
_KLINE_1S_CALLS = (("spot", MIRROR_REST, "/api/v3/klines"),)


def _first_json(calls, params: Dict[str, str]):
    """Race candidate (label, base, path) calls concurrently; the first one
    to answer wins, and the call returns AT THAT MOMENT — the executor is
    shut down without waiting, so a blackholed losing leg can never hold
    the winner hostage (it dies on its own socket timeout). A WAF'd base
    that 418s instantly costs zero latency either way.

    Every leg gets the single REST_TIMEOUT ceiling: healthy lines resolve
    in well under a second (the fast leg simply wins first); a degraded
    line that needs 8s still delivers; a dead line is bounded at one
    ceiling. Combined with stale-while-revalidate, a cold key costs at
    most one such fetch per process — everything after is memory."""
    err: Optional[Exception] = None
    ex = ThreadPoolExecutor(max_workers=len(calls))
    futs = {ex.submit(_get_json, base, path, params): label
            for label, base, path in calls}
    try:
        for f in as_completed(futs):
            try:
                return f.result(), futs[f]
            except Exception as exc:  # noqa: BLE001 — keep racing the rest
                err = exc
    finally:
        # Deliberately NOT wait=True: the winner must not pay for a
        # blackholed loser. Losing legs bound themselves via REST_TIMEOUT.
        ex.shutdown(wait=False, cancel_futures=True)
    raise err


def rest_depth(symbol: str, limit: int = SNAPSHOT_LIMIT) -> dict:
    data, _ = _first_json(_DEPTH_CALLS, {"symbol": symbol.upper(),
                                         "limit": str(limit)})
    return data


def rest_klines(symbol: str, tf_sec: int, count: int,
                end_ms: Optional[int] = None) -> list:
    params = {"symbol": symbol.upper(), "interval": INTERVALS[tf_sec],
              "limit": str(max(1, min(int(count), KLINE_PAGE)))}
    if end_ms:
        params["endTime"] = str(int(end_ms))
    data, _ = _first_json(_KLINE_CALLS, params)
    return data


def rest_ticker24h() -> tuple[list, str]:
    """24h ticker (lastPrice + bid/ask per symbol), whole book in one call.

    Both bases carry the fields; the venue label rides back so the caller
    can stay honest about which book priced the row (futures vs the spot
    mirror)."""
    calls = (("futures", REST_BASE, "/fapi/v1/ticker/24hr"),
             ("spot", MIRROR_REST, "/api/v3/ticker/24hr"))
    return _first_json(calls, {})


# The exchange's OWN symbol list, not a hand-picked one. The catalog is what
# makes an instrument discoverable and chartable; a fixed 8-symbol list is
# how a real pair like BETA becomes an opaque "bad request".
#
# Two depths, tried small first: the whole-book ticker/24hr (~1MB) lists
# exactly the symbols trading right now and lands in well under a second.
# exchangeInfo is the authoritative full book but a MULTI-megabyte payload
# — on a datacenter line one slow download used to fall the whole catalog
# back to the 8-symbol core for a minute. It is now the fallback.
# (Sequential, not a 4-way race: on any healthy line the ticker wins the
# catalog in ~1s and the multi-MB download would only burn bandwidth.)
_TICKER_CALLS = (
    ("futures", REST_BASE, "/fapi/v1/ticker/24hr"),
    ("spot", MIRROR_REST, "/api/v3/ticker/24hr"),
)
_EXCHANGE_INFO_CALLS = (
    ("futures", REST_BASE, "/fapi/v1/exchangeInfo"),
    ("spot", MIRROR_REST, "/api/v3/exchangeInfo"),
)


def _usdt_rows(payload, venue: str) -> list:
    """Trading USDT symbols out of EITHER catalog payload shape:
    exchangeInfo (a dict with 'symbols') or whole-book ticker/24hr (a list
    of tickers). Self-pairs excluded; a futures book keeps only perpetuals
    (ticker shape: delivery contracts carry a dash in the symbol)."""
    out: set = set()
    if isinstance(payload, dict):                        # exchangeInfo
        for s in payload.get("symbols", []):
            if s.get("quoteAsset") != "USDT" or s.get("status") != "TRADING":
                continue
            if venue == "futures" and s.get("contractType") \
                    and s.get("contractType") != "PERPETUAL":
                continue
            if str(s.get("baseAsset", "")).upper() == "USDT":
                continue                     # self-pair junk, not an instrument
            sym = str(s.get("symbol", "")).upper()
            if sym and "-" not in sym:       # a dash is a delivery contract
                out.add(sym)
    elif isinstance(payload, list):                      # ticker/24hr
        for t in payload:
            sym = str((t or {}).get("symbol", "")).upper()
            if not sym or "-" in sym:                    # delivery/index junk
                continue
            if not sym.endswith("USDT") or sym[:-4].upper() == "USDT":
                continue
            out.add(sym)
    return sorted(out)


def _call_symbols(fn, ticker):
    """rest_exchange_symbols with the shared board fetch when the callee
    takes one (tests stub it with a zero-arg lambda)."""
    import inspect
    try:
        takes = bool(inspect.signature(fn).parameters)
    except (TypeError, ValueError):
        takes = False
    return fn(ticker) if takes else fn()


def rest_exchange_symbols(ticker=None) -> tuple[list, str]:
    """(trading USDT symbols, venue) from the exchange itself: the
    whole-book ticker first (small, fast, lists exactly what is trading
    right now), the authoritative exchangeInfo as fallback. The venue
    label rides back so the catalog can name its own source honestly.
    Both failing means egress is dead — the caller keeps the offline
    core and its 60s negative TTL. `ticker` lets the provider pass its
    shared, coalesced board fetch so catalog + board = ONE download."""
    try:
        data, venue = (ticker or rest_ticker24h)()
        syms = _usdt_rows(data, venue)
        if syms:
            return syms, venue
    except Exception:  # noqa: BLE001 — ticker book unreachable: go deep
        pass
    data, venue = _first_json(_EXCHANGE_INFO_CALLS, {})
    return _usdt_rows(data, venue), venue


def rest_agg_trades(symbol: str, limit: int = 1000) -> tuple[list, str]:
    """The exchange's own recent trade tape (most recent `limit` prints),
    both bases same primary->mirror race. This is the finest real data
    Binance publishes — there are no sub-minute klines — so it backs the
    tick / 1s / 30s charts, honestly: a few seconds-to-minutes deep for a
    liquid pair, the live stream extending the edge from there.

    Row fields used: T (trade time, ms) falling back to t, p (price),
    q (quantity) — strings on the wire, per Binance's JSON contract."""
    calls = (("futures", REST_BASE, "/fapi/v1/aggTrades"),
             ("spot", MIRROR_REST, "/api/v3/aggTrades"))
    data, venue = _first_json(calls, {"symbol": symbol.upper(),
                                      "limit": str(max(1, min(int(limit), 1000)))})
    return (data if isinstance(data, list) else []), venue


def tape_to_candles(rows: list, timeframe: str,
                    limit: int = 500) -> tuple[list, str]:
    """aggTrades rows -> (candle tuples, newest-tape-time) for tick/1s/30s.

    tick: one bar per print (o=h=l=c=price, the LSE tape shape). 1s/30s:
    fixed second buckets. Empty/short tapes return what exists — never a
    fabricated fill, and never more than `limit` newest bars."""
    step = {"1s": 1, "30s": 30}.get(timeframe, 0)
    buckets: "dict[float, list]" = {}
    order: list[float] = []
    newest = 0.0
    for r in rows:
        try:
            t_ms = int(r.get("T") or r.get("t") or 0)
            price = float(r["p"])
            qty = float(r["q"])
        except (TypeError, ValueError, KeyError, AttributeError):
            continue                       # garbage row: the wire moves on
        if t_ms <= 0:
            continue
        ts = t_ms / 1000.0
        newest = max(newest, ts)
        key = (ts // step) * step if step else ts
        if key not in buckets:
            buckets[key] = []
            order.append(key)
        buckets[key].append((price, qty))
    out: list[tuple] = []
    for key in sorted(buckets):
        pts = buckets[key]
        if step:
            o = pts[0][0]
            h = max(p for p, _ in pts)
            l = min(p for p, _ in pts)
            c = pts[-1][0]
            v = sum(q for _, q in pts)
        else:
            o = h = l = c = pts[-1][0]
            v = sum(q for _, q in pts)
        out.append((key, o, h, l, c, v))
    return out[-max(1, int(limit)):], newest


def fold_candles(df, step_sec: int, pd):
    """Fold finer bars into `step_sec` buckets — vectorised groupby, one
    pass. Only buckets that hold at least one bar are emitted (no
    fabricated fill), open/close by first/last bar time."""
    if not len(df):
        return df
    key = (df["ts"] // step_sec) * step_sec
    g = df.groupby(key, sort=True)
    out = pd.DataFrame({
        "open": g["open"].first(), "high": g["high"].max(),
        "low": g["low"].min(), "close": g["close"].last(),
        "volume": g["volume"].sum(),
    })
    out.index.name = None
    out = out.reset_index().rename(columns={"index": "ts"})
    out["ts"] = out["ts"].astype(float)
    return out[CANDLE_COLUMNS]


def parse_klines(rows: list) -> list:
    """Kline row: [openTime, o, h, l, c, v, closeTime, ...] as strings."""
    out = []
    for r in rows:
        out.append((float(r[0]) / 1000.0, float(r[1]), float(r[2]),
                    float(r[3]), float(r[4]), float(r[5])))
    out.sort(key=lambda x: x[0])
    return out


def _to_ms(v) -> Optional[int]:
    """start/end as the exchange wants them: None passthrough; digit
    strings/numbers are epoch SECONDS (ms if already > 1e12); anything
    else is parsed as an ISO-8601 timestamp (naive = UTC)."""
    if v is None or v == "":
        return None
    txt = str(v).strip()
    try:
        num = float(txt)
    except ValueError:
        from datetime import datetime, timezone
        dt = datetime.fromisoformat(txt.replace("Z", "+00:00"))
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return int(dt.timestamp() * 1000)
    return int(num if num > 1e12 else num * 1000)


def fetch_klines_paged(params: Dict[str, str], tf_sec: int):
    """(rows, venue) for `params` honouring the exchange's per-request
    caps. One page ≤ KLINE_PAGE goes straight through the primary→mirror
    race. Deeper history (the shell opens at 5000) is split into
    consecutive time windows of KLINE_PAGE bars each, fetched IN PARALLEL
    (bounded: KLINE_MAX_PAGES legs), stitched by open time and de-duplicated
    — so a 5000-bar chart costs one round-trip of latency, not five, and
    never a rejected request. Windows are anchored on endTime when given,
    else on "now"; startTime (when given) trims the oldest page."""
    limit = max(1, int(params.get("limit", "500")))
    base = {k: v for k, v in params.items() if k != "limit"}
    calls = _KLINE_1S_CALLS if base.get("interval") == "1s" else _KLINE_CALLS
    if limit <= KLINE_PAGE:
        base["limit"] = str(limit)
        return _first_json(calls, base)
    step_ms = tf_sec * 1000
    end_ms = int(base.pop("endTime", 0)) or int(time.time() * 1000)
    start_ms = int(base.pop("startTime", 0)) or None
    pages = min(KLINE_MAX_PAGES, -(-limit // KLINE_PAGE))
    windows = []
    hi = end_ms
    for _ in range(pages):
        lo = hi - KLINE_PAGE * step_ms
        if start_ms is not None and lo < start_ms:
            lo = start_ms
        windows.append((lo, hi))
        hi = lo - 1
        if start_ms is not None and hi <= start_ms:
            break

    def one(lo, hi):
        p = dict(base, startTime=str(lo), endTime=str(hi),
                 limit=str(KLINE_PAGE))
        return _first_json(calls, p)

    with ThreadPoolExecutor(max_workers=len(windows)) as ex:
        results = list(ex.map(lambda w: one(*w), windows))
    seen: Dict[int, list] = {}
    venue = results[0][1] if results else "futures"
    for rows, v in results:
        venue = v
        for r in rows or []:
            seen[int(r[0])] = r
    rows = [seen[k] for k in sorted(seen)]
    return rows[-limit:], venue


# ── the book state machine (feed.go, ported 1:1) ─────────────────────────

class BookFeed:
    def __init__(self, symbol: str,
                 fetch_depth: Callable[[str, int], dict] = rest_depth,
                 cooldown: float = RESYNC_COOLDOWN):
        self.cooldown = cooldown
        self.symbol = symbol.lower()
        self.bids: Dict[float, float] = {}
        self.asks: Dict[float, float] = {}
        self.last_u = 0
        self.synced = False
        self.await_first = False
        self.pending: List[dict] = []
        self.resyncing = False
        self.next_resync = 0.0
        self._fetch_depth = fetch_depth
        self._mu = asyncio.Lock()          # bookEmitMu
        self.events: List = []             # drained by the provider pump

    # emission helpers -----------------------------------------------------
    def _emit_delta(self, d: dict) -> None:
        _diag.observe("binance", self.symbol.upper(), d["E"] / 1000.0,
                      kind="book")
        self.events.append(DepthEvent(
            symbol=self.symbol.upper(), ts=d["E"] / 1000.0, type=DEPTH_DELTA,
            bids=[(float(p), float(s)) for p, s in d.get("b", [])],
            asks=[(float(p), float(s)) for p, s in d.get("a", [])]))

    def snapshot_event(self) -> Optional[DepthEvent]:
        if not self.synced:
            return None
        return DepthEvent(
            symbol=self.symbol.upper(), ts=time.time(), type=DEPTH_SNAPSHOT,
            bids=sorted(((p, s) for p, s in self.bids.items() if s > 0),
                        key=lambda x: -x[0]),
            asks=sorted(((p, s) for p, s in self.asks.items() if s > 0),
                        key=lambda x: x[0]))

    # depth diff entry ------------------------------------------------------
    async def on_depth(self, d: dict) -> None:
        # Decide under the lock, then run any resync OUTSIDE it: resync()
        # itself re-acquires the lock to apply the snapshot, so awaiting
        # it while holding the lock would deadlock the feed.
        resync_args: Optional[tuple] = None
        async with self._mu:
            if not self.synced:
                if len(self.pending) < PENDING_CAP:
                    self.pending.append(d)
                if (not self.resyncing
                        and time.monotonic() >= self.next_resync):
                    resync_args = ("unsynced depth", 0, 0)
            elif not self.await_first and d["u"] <= self.last_u:
                return                          # stale diff
            elif self.await_first:
                if d["u"] < self.last_u:
                    return                      # entirely before snapshot
                if d["U"] > self.last_u:
                    resync_args = ("snapshot older than first diff",
                                   self.last_u, d["U"])
                else:                           # U <= last_u <= u: straddle
                    self.await_first = False
                    self._apply(d)
                    self.last_u = d["u"]
                    self._emit_delta(d)
            elif d["pu"] != self.last_u:
                resync_args = ("sequence gap", self.last_u, d["pu"])
            else:
                self._apply(d)
                self.last_u = d["u"]
                self._emit_delta(d)
        if resync_args is not None:
            await self._trigger_resync(*resync_args)

    def _apply(self, d: dict) -> None:
        for p, s in d.get("b", []):
            price, size = float(p), float(s)
            if size == 0:
                self.bids.pop(price, None)
            else:
                self.bids[price] = size
        for p, s in d.get("a", []):
            price, size = float(p), float(s)
            if size == 0:
                self.asks.pop(price, None)
            else:
                self.asks[price] = size

    # resync -----------------------------------------------------------------
    async def _trigger_resync(self, reason: str, want: int, got: int) -> None:
        if self.resyncing or time.monotonic() < self.next_resync:
            return
        self.resyncing = True
        self.synced = False
        self.next_resync = time.monotonic() + self.cooldown
        log.warning("orderbook resync %s: reason=%s expected=%s got=%s",
                    self.symbol, reason, want, got)
        await self.resync()

    async def resync(self) -> None:
        try:
            snap = await asyncio.to_thread(self._fetch_depth, self.symbol,
                                           SNAPSHOT_LIMIT)
        except Exception as exc:  # noqa: BLE001 — retry on next diff
            log.warning("depth snapshot failed (%s), retry on next diff", exc)
            self.resyncing = False
            return
        async with self._mu:
            self.bids = {float(p): float(s) for p, s in snap.get("bids", [])}
            self.asks = {float(p): float(s) for p, s in snap.get("asks", [])}
            snap_id = int(snap.get("lastUpdateId", 0))
            self.last_u = snap_id
            applied = 0
            for d in list(self.pending):
                if d["u"] < snap_id:
                    continue                    # entirely before snapshot
                if applied == 0 and d["U"] > snap_id:
                    log.warning("snapshot too old for buffered diffs")
                    self.pending = []
                    self.resyncing = False
                    return
                if applied > 0 and d["u"] <= self.last_u:
                    continue
                if applied > 0 and d["pu"] != self.last_u:
                    log.warning("buffered depth sequence gap; retrying")
                    self.pending = []
                    self.resyncing = False
                    return
                self._apply(d)
                self.last_u = d["u"]
                applied += 1
            self.pending = []
            self.synced = True
            self.await_first = applied == 0
            self.resyncing = False
            ev = self.snapshot_event()
            if ev is not None:
                self.events.append(ev)

    # trades -----------------------------------------------------------------
    def on_agg_trade(self, d: dict, last_ids: Dict[str, int]) -> Optional[TradeEvent]:
        if d.get("e") != "aggTrade" or str(d.get("st", "")) == "2":
            return None                  # CM/calc/other frames excluded
        tid = int(d.get("t", 0))
        if tid and tid <= last_ids.get(self.symbol, 0):
            return None                          # duplicate ids never double-count
        last_ids[self.symbol] = tid
        maker = bool(d.get("m"))
        return TradeEvent(
            symbol=self.symbol.upper(),
            ts=int(d.get("T", d.get("E", 0))) / 1000.0,
            price=float(d["p"]), size=float(d["q"]),
            side=TRADE_SELL if maker else TRADE_BUY)

    def reset_for_reconnect(self) -> None:
        """onReset: any state from a continuous sequence must be rebuilt."""
        self.synced = False
        self.await_first = False
        self.pending = []
        self.resyncing = False
        self.next_resync = 0.0


# ── provider ──────────────────────────────────────────────────────────────

class BinancePerpProvider(Provider):
    name = "binance"
    venue = "binance"
    # The book the deployment actually serves can be the futures edge or the
    # spot mirror (whichever answers this egress), so the title names the
    # exchange, not the book — the venue badge and the catalog's categories
    # carry the book per symbol.
    title = "Binance (direct, keyless)"
    timeframes = TIMEFRAMES
    deterministic = False

    def __init__(self):
        self._last_trade_ids: Dict[str, int] = {}
        self._ws_winner: Dict[str, str] = {}   # route -> base last held
        # 24h-ticker board cache: (epoch, rows, venue). The watchlist polls
        # once a second; Binance needs one 2s TTL between them, not one
        # REST call per poll. Stale rows are SERVED (with a background
        # refresh) — see prices().
        self._ticker: tuple[float, list, str] = (0.0, [], "")
        # Catalog cache: (epoch, venue, [symbols]). A real book caches 1h
        # and is served stale-instantly past the TTL; the offline core
        # re-tries after CATALOG_NEG_TTL so a cold boot on dead egress
        # heals the moment egress comes back.
        self._catalog: tuple[float, str, list] = (0.0, "core",
                                                  list(SYMBOLS))
        # Candle/tape cache: (symbol, timeframe, limit, start, end) ->
        # (epoch, df, venue). Stale-while-revalidate: the newest copy held
        # is served instantly; the request path blocks only on a true miss.
        self._candle_cache: Dict[tuple, tuple[float, "pd.DataFrame", str]] = {}
        # Live tail (start=…) per (symbol, timeframe): (epoch, df, venue).
        # The auto-reload loop's edge fetches re-serve within
        # TAIL_MIN_INTERVAL instead of cold-fetching every cycle.
        self._tail: Dict[tuple, tuple[float, "pd.DataFrame", str]] = {}
        # Bounded cache: a session charts a handful of (symbol, tf) keys;
        # 64 keeps it a flat dict, and evicting is just the oldest stamp.
        self._candle_cache_cap = 64

    def catalog(self) -> tuple[str, list]:
        """(venue, trading USDT symbols), from the exchange's own book
        (ticker-first, exchangeInfo as fallback), else the offline core.
        Everything listed here is fetchable by the same bases that serve
        klines/depth — the catalog never advertises what the wire will
        not carry.

        Freshness discipline: a real book already held is served
        INSTANTLY, even past its TTL — the refresh runs in the background
        (single-flight), so a slow exchange can never re-block a
        user-visible request. Only the very first catalog of a process
        (cold boot, offline core on the table) blocks, and only once."""
        now = time.time()
        ts, venue, syms = self._catalog
        ttl = CATALOG_TTL if venue in ("futures", "spot") else CATALOG_NEG_TTL
        if now - ts < ttl:
            return venue, syms
        if venue in ("futures", "spot") and syms:
            _schedule_refresh(f"catalog:{id(self)}", self._fetch_catalog)
            return venue, syms
        # True miss (cold process): the one blocking catalog fetch,
        # COALESCED — the boot prewarm and a user's first click share it.
        return _coalesce(f"catalog:{id(self)}", self._fetch_catalog)

    def _fetch_catalog(self) -> tuple[str, list]:
        """The one blocking catalog fetch. Success: real book + venue.
        Failure: whatever was held before (the offline core at cold
        boot), stamped with the negative TTL so the next retry is 10s
        out, not next millisecond.

        ONE download serves both surfaces: the whole-book ticker IS the
        price board, so it is fetched once (coalesced with prices()) and
        seeds self._ticker — the sidebar and the board used to download
        the same 1MB payload twice on every cold switch."""
        now = time.time()
        ts, venue, syms = self._catalog
        try:
            fresh, fresh_venue = _call_symbols(rest_exchange_symbols,
                                               self._ticker_rows)
            if fresh:
                self._catalog = (now, fresh_venue, fresh)
                return fresh_venue, fresh
        except Exception:  # noqa: BLE001 — offline: keep serving what we have
            pass
        self._catalog = (now, venue, syms)
        return venue, syms

    def _ticker_rows(self) -> tuple[list, str]:
        """The whole-book 24h ticker, at most one fetch in flight per
        provider; a fresh (<2s) held board is returned without a fetch."""
        ts, rows, venue = self._ticker
        if rows and time.time() - ts < 2.0:
            return rows, venue
        rows, venue = _coalesce(f"ticker:{id(self)}", rest_ticker24h)
        self._ticker = (time.time(), rows, venue)
        return rows, venue

    def _resolve_symbol(self, symbol: str) -> Optional[str]:
        """The exchange's own spelling of `symbol`, or None.

        Traders type the base asset ("BETA" for BETAUSDT); an exact miss
        plus a USDT/USDC-suffixed hit in the catalog is the exchange's
        spelling of the same instrument, so it resolves silently."""
        s = (symbol or "").strip().upper()
        if not s:
            return None
        # A symbol the HELD book already lists resolves without waiting:
        # the chart must never queue behind the sidebar's cold catalog
        # download (measured: +3s on the first chart for a 3s line). Only
        # a miss against what is held pays for the fresh book.
        if s in self._catalog[2]:
            return s
        _, have = self.catalog()
        have = set(have)
        if s in have:
            return s
        for suf in ("USDT", "USDC"):
            if s + suf in have:
                return s + suf
        return None

    def search(self, query: str = "", limit: int = 50) -> List[Instrument]:
        venue, syms = self.catalog()
        q = (query or "").strip().upper().replace(" ", "").replace("/", "")
        core = {s: n for s, n in SYMBOLS.items()}
        out = []
        for sym in syms:
            # A query that is a bare base ("BETA") matches the suffixed
            # symbol (BETAUSDT) the way traders search.
            if not q or q in sym or sym.startswith(q + "USDT"):
                name = core.get(sym)
                if name is None:
                    base = sym[:-4] if sym.endswith("USDT") else sym
                    name = (f"{base} / Tether (USD-M perp)"
                            if venue == "futures"
                            else f"{base} / Tether (spot)")
                out.append(Instrument(
                    symbol=sym, name=name,
                    category=("Binance Spot" if venue == "spot"
                              else "Binance USD-M Futures"),
                    provider=self.name, meta={"live": True,
                                              "venue": ("binance-spot"
                                                        if venue == "spot"
                                                        else
                                                        "binance-futures")}))
            if len(out) >= max(1, limit):
                break
        return out

    def candles(self, symbol, timeframe, limit=500, start=None, end=None):
        import pandas as pd
        sym = self._resolve_symbol(symbol)
        if sym is None:
            raise ValueError(
                f"binance: no instrument named {symbol} in the catalog — "
                "search it in the sidebar's Binance book")
        if timeframe in ("tick", "1s", "30s"):
            # Sub-minute: no such klines exist on the wire, so the bars are
            # the exchange's own recent trade tape (honest, shortest real
            # history, the live stream extends the edge).
            return self._candles_tape(sym, timeframe, limit, start, pd)
        tf = {v: k for k, v in INTERVALS.items()}.get(timeframe)
        if tf is None:
            raise ValueError(f"binance: unsupported timeframe {timeframe!r}")
        params = {"symbol": sym, "interval": INTERVALS[tf],
                  "limit": str(int(limit))}
        # start/end: epoch seconds (the shell's live tail fetch) or ISO
        # strings (the backtest windows) — both become the exchange's ms.
        s_ms, e_ms = _to_ms(start), _to_ms(end)
        if s_ms is not None:
            params["startTime"] = str(s_ms)
        if e_ms is not None:
            params["endTime"] = str(e_ms)
        return self._candles_klines(sym, timeframe, limit, start, end,
                                    params, pd, tf)

    # --- stale-while-revalidate candle serving ----------------------------
    # The whole point: a user-visible request blocks on the exchange ONLY
    # the first time a (symbol, timeframe, …) key is seen. Every switch
    # back, timeframe click, and auto-reload cycle after that is served
    # from memory — instantly — with the refresh riding in the background.

    def _swr_candles(self, key, fetch):
        """Serve the newest held copy of `key` instantly; schedule the
        background refresh when it is stale; block only on a true miss —
        and even then only as one shared fetch (coalesced with the boot
        prewarm and any simultaneous first click)."""
        hit = self._candle_cache.get(key)
        if hit is not None:
            if time.time() - hit[0] < CANDLE_TTL:
                return hit[1]
            _schedule_refresh(f"candle:{id(self)}:{key}",
                              lambda: self._candles_fetch_into(key, fetch))
            return hit[1]
        return self._candles_fetch_into(key, lambda: _coalesce(
            f"candle:{id(self)}:{key}", fetch))[1]

    def _candles_fetch_into(self, key, fetch):
        df, venue = fetch()
        if len(self._candle_cache) >= self._candle_cache_cap:
            oldest = min(self._candle_cache,
                         key=lambda k: self._candle_cache[k][0])
            del self._candle_cache[oldest]
        self._candle_cache[key] = (time.time(), df, venue)
        return time.time(), df, venue

    def _live_tail(self, gkey, fetch):
        """The auto-reload loop's edge fetch (start=…): re-serve the last
        tail within TAIL_MIN_INTERVAL so a degraded line can't turn the 2s
        cadence into a 3.5s stall every cycle — the shell's merge-by-bar-
        time makes the duplicate a no-op. A real edge fetch is
        coalesced, so the loop and a manual reload share one hit."""
        hit = self._tail.get(gkey)
        if hit is not None and time.time() - hit[0] < TAIL_MIN_INTERVAL:
            return hit[1]
        df, venue = _coalesce(f"tail:{id(self)}:{gkey}", fetch)
        self._tail[gkey] = (time.time(), df, venue)
        return df

    def _candles_tape(self, sym, timeframe, limit, start, pd):
        fetch = lambda: self._fetch_subminute(sym, timeframe, limit, start,
                                              pd)
        if start is not None:
            return self._live_tail((sym, timeframe), fetch)
        return self._swr_candles((sym, timeframe, limit, start), fetch)

    def _fetch_subminute(self, sym, timeframe, limit, start, pd):
        """1s / 30s: real 1s klines from the spot mirror first (paged, so
        a 5000-bar 1s chart is 83 real minutes, 30s folded from them =
        ~41 hours), the trade tape (last 1000 prints) only when the mirror
        is unreachable. tick: always the tape (one bar per print)."""
        if timeframe in ("1s", "30s"):
            try:
                return self._fetch_1s_klines(sym, timeframe, limit, start, pd)
            except Exception as exc:  # noqa: BLE001 — mirror down: tape
                log.info("binance 1s klines unavailable (%s); tape", exc)
        return self._fetch_tape(sym, timeframe, limit, pd)

    def _fetch_1s_klines(self, sym, timeframe, limit, start, pd):
        fold = 30 if timeframe == "30s" else 1
        want = min(5000, int(limit) * fold)
        params = {"symbol": sym, "interval": "1s", "limit": str(want)}
        s_ms = _to_ms(start)
        if s_ms is not None:
            params["startTime"] = str(s_ms)
        rows, venue = fetch_klines_paged(params, 1)
        if not rows:
            raise NotSupported("binance served no 1s klines")
        df = pd.DataFrame(parse_klines(rows), columns=CANDLE_COLUMNS)
        if fold > 1:
            df = fold_candles(df, fold, pd)
        df.attrs["venue"] = venue
        return df, venue

    def _fetch_tape(self, sym, timeframe, limit, pd):
        rows, venue = rest_agg_trades(sym, limit=1000)
        if not rows:
            raise NotSupported(f"binance served no trades for {sym}")
        bars, _newest = tape_to_candles(rows, timeframe, limit)
        df = pd.DataFrame(bars, columns=CANDLE_COLUMNS)
        df.attrs["venue"] = venue          # honesty: the badge says the book
        return df, venue

    def _candles_klines(self, sym, timeframe, limit, start, end, params, pd,
                        tf_sec):
        fetch = lambda: self._fetch_klines(params, pd, tf_sec)
        if start is not None:
            return self._live_tail((sym, timeframe), fetch)
        return self._swr_candles((sym, timeframe, limit, start, end), fetch)

    def _fetch_klines(self, params, pd, tf_sec):
        try:
            rows, venue = fetch_klines_paged(params, tf_sec)
        except BinanceRESTError as exc:
            raise NotSupported(str(exc)) from exc
        except Exception as exc:  # noqa: BLE001
            raise NotSupported(f"binance REST unreachable: {exc}") from exc
        if not rows:
            raise NotSupported("binance served no klines")
        df = pd.DataFrame(parse_klines(rows), columns=CANDLE_COLUMNS)
        df.attrs["venue"] = venue          # honesty: the badge says the book
        return df, venue

    def prices(self, symbols: List[str]) -> List[dict]:
        """Price board for the terminal's watchlist poll: last price plus
        bid/ask per symbol, from the 24h ticker (one REST call for the whole
        book, cached for 2s so the 1s poll never double-hits the exchange).
        Rows for symbols the exchange has no ticker for are simply absent —
        the board row keeps its dash rather than showing a guess."""
        wanted = {s.upper() for s in symbols}
        ts, rows, venue = self._ticker
        if time.time() - ts >= 2.0:
            if rows:
                # Stale-while-revalidate: serve the last REAL board
                # instantly — the poll is 1s, so a 3.5s stall on every
                # expiry is exactly the frozen-board pathology (measured) —
                # and let the background refresh catch up.
                _schedule_refresh(f"ticker:{id(self)}", self._refresh_ticker)
            else:
                # Nothing held yet (first poll of a cold process): the one
                # blocking fetch, SHARED with the catalog's (same payload);
                # an honest error beats a blank board.
                rows, venue = self._ticker_rows()
        out: List[dict] = []
        for r in rows:
            sym = str(r.get("symbol", "")).upper()
            if sym not in wanted:
                continue
            try:
                price = float(r["lastPrice"])
            except (KeyError, TypeError, ValueError):
                continue
            row: dict = {"symbol": sym, "price": price}
            for src, dst in (("bidPrice", "bid"), ("askPrice", "ask")):
                try:
                    v = float(r.get(src))
                    if v > 0:
                        row[dst] = v
                except (TypeError, ValueError):
                    pass
            out.append(row)
        return out

    def _refresh_ticker(self):
        """Background board refresh (stale-while-revalidate): the poll
        keeps serving the last real board while this catches up."""
        rows, venue = _coalesce(f"ticker:{id(self)}", rest_ticker24h)
        self._ticker = (time.time(), rows, venue)

    def depth_stream(self, symbols: List[str]) -> AsyncIterator:
        resolved = []
        for s in symbols:
            r = self._resolve_symbol(s)
            if r is None:
                raise ValueError(f"binance: unknown symbol {s!r}")
            resolved.append(r)
        return self._pump(resolved)

    def stream(self, symbols: List[str]) -> AsyncIterator[dict]:
        resolved = []
        for s in symbols:
            r = self._resolve_symbol(s)
            if r is None:
                raise ValueError(f"binance: unknown symbol {s!r}")
            resolved.append(r)

        return self._tick_pump(resolved)

    async def _tick_pump(self, symbols: List[str]) -> AsyncIterator[dict]:
        """The candle chart's tick stream: aggTrade (every print) plus
        bookTicker (best bid/ask on every quote change) — and NOTHING
        else. This deliberately does not share the depth pump: that one
        must await a 1000-level REST snapshot before it can yield and
        re-awaits one on every sequence gap, which on a degraded line held
        the FIRST TICK for the whole snapshot latency (measured 8s) and
        stalled the tape on every resync. A price tick needs no book.
        Budget: first tick < 1s after the socket opens on a healthy line;
        thereafter wire latency only."""
        out_q: asyncio.Queue = asyncio.Queue()
        quotes: Dict[str, tuple[float, float]] = {}
        lower = [s.lower() for s in symbols]
        names = ([f"{s}@aggTrade" for s in lower]
                 + [f"{s}@bookTicker" for s in lower])

        async def on_msg(stream_name: str, data: dict) -> None:
            sym = stream_name.split("@")[0].upper()
            if stream_name.endswith("@bookTicker"):
                try:
                    b, a = float(data.get("b", 0)), float(data.get("a", 0))
                except (TypeError, ValueError):
                    return
                if b > 0 and a > b:
                    quotes[sym] = (b, a)
                return
            if data.get("e") != "aggTrade" or str(data.get("st", "")) == "2":
                return                      # CM/calc/other frames excluded
            tid = int(data.get("t", 0))
            if tid and tid <= self._last_trade_ids.get(sym, 0):
                return                              # duplicate id
            self._last_trade_ids[sym] = tid
            try:
                tick = {"symbol": sym, "price": float(data["p"]),
                        "ts": int(data.get("T", data.get("E", 0))) / 1000.0,
                        "volume": float(data["q"]),
                        "side": TRADE_SELL if data.get("m") else TRADE_BUY}
            except (KeyError, TypeError, ValueError):
                return
            q = quotes.get(sym)
            if q:
                tick["bid"], tick["ask"] = q
            _diag.observe("binance", sym, tick["ts"], kind="trade")
            out_q.put_nowait(tick)

        task = asyncio.create_task(
            self._watch_route("market", names, on_msg))
        try:
            while True:
                yield await out_q.get()
        finally:
            task.cancel()

    def depth_history(self, symbol, start, end, column_ms=1000,
                      max_levels=50):
        raise NotSupported(
            "binance public feeds keep no L2 history; the session recorder "
            "is the history path (data honesty rule).")

    def configured(self) -> bool:
        return True

    def capabilities(self):
        caps = super().capabilities()
        caps.discard("depth_history")
        return caps

    # pump: two self-healing upstream sockets per symbol set ----------------
    # fstream routes: /market + /public; the .vision mirror serves
    # combined streams under /stream on one socket. Candidates are tried
    # in "last winner first" order: whichever base last held a stream
    # goes first, so a WAF'd or ISP-blocked primary (Render datacenter
    # egress) is never re-probed for its full open_timeout on every
    # reconnect — the stream that worked keeps winning until it fails,
    # then the other is tried. The winner table is per provider (one
    # instance in the registry) so every pump learns from every other.
    def _routes(self) -> Dict[str, list]:
        return {
            "market": [(WS_BASE, "/market"), (MIRROR_WS, "/stream")],
            "public": [(WS_BASE, "/public"), (MIRROR_WS, "/stream")],
        }

    async def _watch_route(self, route: str, names: List[str], on_msg,
                           on_reset=None) -> None:
        """Hold one upstream combined-stream socket forever: race the
        bases cold, prefer the last winner warm, reconnect with jittered
        backoff (Binance drops every WS at 24h). Every frame goes to
        on_msg(stream_name, data); on_reset() fires when a fresh socket
        is held (sequence-continuous state must be rebuilt)."""
        import websockets
        winner = self._ws_winner
        base_cands = self._routes()[route]
        # Order: last winner first, then the rest. Rebuilt each attempt
        # so a winner flip reorders without any index bookkeeping.
        def ordered():
            w = winner.get(route)
            return sorted(base_cands,
                          key=lambda c: 0 if c[0] == w else 1)

        async def _try_connect(base: str, path: str):
            url = f"{base}{path}?streams=" + ",".join(names)
            return await websockets.connect(
                url, max_size=8 * 1024 * 1024, open_timeout=8)

        async def acquire(cands):
            """(ws, base) for the next connection to hold, else
            (None, None). COLD start (no known winner yet): race every
            candidate IN PARALLEL — a WAF'd or ISP-blocked base must
            cost zero latency, so the healthy mirror wins the race on
            the first page load instead of ~8s of serial probing.
            WARM reconnect: try the last winner first, serially — one
            healthy connect, no fork."""
            if winner.get(route) is None and len(base_cands) > 1:
                tasks = {}
                for base, path in cands:
                    tasks[asyncio.ensure_future(_try_connect(base, path))] = base
                try:
                    while True:
                        done, pending = await asyncio.wait(
                            list(tasks),
                            return_when=asyncio.FIRST_COMPLETED)
                        for f in done:
                            try:
                                return f.result(), tasks[f]
                            except asyncio.CancelledError:
                                raise
                            except Exception as exc:  # noqa: BLE001
                                log.warning("binance %s connect (%s) failed: %s",
                                            route, tasks[f], exc)
                        if not pending:
                            return None, None
                finally:
                    for f in tasks:
                        if not f.done():
                            f.cancel()
                            # reap without blocking: a blackholed loser
                            # must not hold the winner hostage
                            f.add_done_callback(
                                lambda t: None
                                if t.cancelled() else t.exception())
            for base, path in cands:
                try:
                    return await _try_connect(base, path), base
                except asyncio.CancelledError:
                    raise
                except Exception as exc:  # noqa: BLE001
                    log.warning("binance %s connect (%s) failed: %s",
                                route, base, exc)
            return None, None

        backoff = 1.0
        while True:
            ws, base = await acquire(ordered())
            held_any = False
            if ws is not None:
                winner[route] = base
                held_any = True
                backoff = 1.0
                try:
                    if on_reset is not None:
                        on_reset()
                    async for raw in ws:
                        env = json.loads(raw)
                        await on_msg(env.get("stream", ""),
                                     env.get("data", {}) or {})
                except asyncio.CancelledError:
                    raise
                finally:
                    try:
                        await ws.close()
                    except Exception:  # noqa: BLE001 — stream is gone anyway
                        pass
            if held_any:
                # A stream held this pass: quick jittered re-pick so a
                # healthy mirror is re-established in well under a second
                # (Binance drops every WS at 24h; this is the routine hop).
                await asyncio.sleep(0.1 + random.random() * 0.3)
                continue
            # nothing held: brief jittered backoff, then re-try (winner
            # order will prefer the healthy base on the next pass)
            await asyncio.sleep(backoff + random.random() * 0.5)
            backoff = min(30.0, backoff * 2)

    # depth pump: book state machine + trades, for depth_stream ----------
    async def _pump(self, symbols: List[str]) -> AsyncIterator:
        feeds = {s: BookFeed(s.lower()) for s in symbols}
        out_q: asyncio.Queue = asyncio.Queue()
        resyncs: set = set()

        def drain(feed: BookFeed) -> None:
            while feed.events:
                out_q.put_nowait(feed.events.pop(0))

        def kick_resync(feed: BookFeed) -> None:
            """Snapshot fetches run as their own tasks: the socket reader
            must never await REST (a slow snapshot used to freeze trade
            delivery for its whole latency on every sequence gap)."""
            if feed.resyncing or time.monotonic() < feed.next_resync:
                return

            async def _go():
                await feed._trigger_resync("initial sync", 0, 0)
                drain(feed)
            t = asyncio.create_task(_go())
            resyncs.add(t)
            t.add_done_callback(resyncs.discard)

        async def on_market(stream_name: str, data: dict) -> None:
            feed = feeds.get(stream_name.split("@")[0].upper())
            if feed is None:
                return
            ev = feed.on_agg_trade(data, self._last_trade_ids)
            if ev is not None:
                out_q.put_nowait(ev)
            if not feed.synced:
                kick_resync(feed)   # a fresh trade nudges first sync

        # Depth diffs are handed to a per-feed worker: on_depth may await
        # a REST snapshot (sequence gap, first sync), and that wait must
        # never sit on the socket reader — the reader keeps draining the
        # wire (frames for the other symbols keep flowing, and this
        # symbol's diffs queue up to be replayed in order).
        diff_q: Dict[str, asyncio.Queue] = {
            s.upper(): asyncio.Queue() for s in symbols}

        async def depth_worker(feed: BookFeed, q: asyncio.Queue) -> None:
            while True:
                d = await q.get()
                try:
                    await feed.on_depth(d)
                except asyncio.CancelledError:
                    raise
                except Exception as exc:  # noqa: BLE001 — one bad frame
                    log.warning("depth frame dropped (%s): %s",
                                feed.symbol, exc)
                drain(feed)

        async def on_public(stream_name: str, data: dict) -> None:
            q = diff_q.get(stream_name.split("@")[0].upper())
            if q is not None:
                q.put_nowait(data)

        def on_reset() -> None:
            for f in feeds.values():
                f.reset_for_reconnect()

        lower = [s.lower() for s in symbols]
        tasks = [asyncio.create_task(depth_worker(feeds[k], diff_q[k]))
                 for k in feeds] + [
            asyncio.create_task(self._watch_route(
                "market", [f"{s}@aggTrade" for s in lower], on_market,
                on_reset)),
            asyncio.create_task(self._watch_route(
                "public", [f"{s}@depth@100ms" for s in lower], on_public,
                on_reset)),
        ]
        # initial snapshots, in parallel and OFF the yield path: the first
        # event (a trade, or the snapshot itself) flows the moment it exists
        for f in feeds.values():
            kick_resync(f)
        try:
            while True:
                yield await out_q.get()
        finally:
            for t in list(tasks) + list(resyncs):
                t.cancel()
