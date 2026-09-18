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
import json
import logging
import os
import random
import time
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

INTERVALS = {60: "1m", 300: "5m", 900: "15m", 3600: "1h", 14400: "4h",
             86400: "1d"}
# The ladder mirrors the LSE book's sub-minute set: Binance publishes no
# sub-minute klines, so tick/1s/30s are built from the exchange's own
# recent trade tape (aggTrades) — the finest real data the wire carries.
TIMEFRAMES = ["tick", "1s", "30s", "1m", "5m", "15m", "1h", "4h", "1d"]

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
# not ticks); the offline core re-tries after 60s so a cold boot on dead
# egress heals the moment egress returns, without re-hammering the exchange.
CATALOG_TTL = 3600.0
CATALOG_NEG_TTL = 60.0


# ── REST (sync, run in threadpool from async) ────────────────────────────

def _get_json(base: str, path: str, params: Dict[str, str]) -> dict:
    q = "&".join(f"{k}={v}" for k, v in params.items())
    url = base + path + ("?" + q if q else "")
    # 6s, not 15: a WAF-blackholed egress must fail FAST so the pane's
    # honest fallback chain resolves quickly instead of stacking polls.
    with urllib.request.urlopen(url, timeout=6) as r:
        return json.loads(r.read())


# primary -> mirror, same wire format on both; tried CONCURRENTLY so a
# WAF'd or ISP-blocked base costs zero latency when the other answers
_DEPTH_CALLS = (("futures", REST_BASE, "/fapi/v1/depth"),
                ("spot", MIRROR_REST, "/api/v3/depth"))
_KLINE_CALLS = (("futures", REST_BASE, "/fapi/v1/klines"),
                ("spot", MIRROR_REST, "/api/v3/klines"))


def _first_json(calls, params: Dict[str, str]):
    err: Optional[Exception] = None
    with ThreadPoolExecutor(max_workers=len(calls)) as ex:
        futs = {ex.submit(_get_json, base, path, params): label
                for label, base, path in calls}
        for f in as_completed(futs):
            try:
                return f.result(), futs[f]
            except Exception as exc:  # noqa: BLE001 — wait for the other base
                err = exc
    raise err


def rest_depth(symbol: str, limit: int = SNAPSHOT_LIMIT) -> dict:
    data, _ = _first_json(_DEPTH_CALLS, {"symbol": symbol.upper(),
                                         "limit": str(limit)})
    return data


def rest_klines(symbol: str, tf_sec: int, count: int,
                end_ms: Optional[int] = None) -> list:
    params = {"symbol": symbol.upper(), "interval": INTERVALS[tf_sec],
              "limit": str(count)}
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
_EXCHANGE_INFO_CALLS = ((
    "futures", REST_BASE, "/fapi/v1/exchangeInfo"),
    ("spot", MIRROR_REST, "/api/v3/exchangeInfo"))


def rest_exchange_symbols() -> tuple[list, str]:
    """Trading USDT symbols from exchangeInfo, futures first then the
    reachable spot mirror, same primary->fallback race as every other call.

    Futures keeps only perpetuals (delivery contracts are not what this
    terminal charts); the spot mirror carries its own book. The venue
    label rides back so the catalog can name its own source honestly."""
    data, venue = _first_json(_EXCHANGE_INFO_CALLS, {})
    return _exchange_rows(data), venue


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


def _exchange_rows(data: dict) -> list:
    """exchangeInfo 'symbols' -> sorted trading USDT symbols. Self-pairs
    excluded; a futures payload keeps only perpetuals (spot payloads carry
    no contractType and keep everything)."""
    out: list[str] = []
    for s in data.get("symbols", []):
        if s.get("quoteAsset") != "USDT" or s.get("status") != "TRADING":
            continue
        contract = s.get("contractType")
        if contract and contract != "PERPETUAL":
            continue
        if str(s.get("baseAsset", "")).upper() == "USDT":
            continue                     # self-pair junk, not an instrument
        sym = str(s.get("symbol", "")).upper()
        if sym:
            out.append(sym)
    return sorted(set(out))


def parse_klines(rows: list) -> list:
    """Kline row: [openTime, o, h, l, c, v, closeTime, ...] as strings."""
    out = []
    for r in rows:
        out.append((float(r[0]) / 1000.0, float(r[1]), float(r[2]),
                    float(r[3]), float(r[4]), float(r[5])))
    out.sort(key=lambda x: x[0])
    return out


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
        if d.get("e") == "calc" or str(d.get("st", "")) == "2":
            return None                          # CM messages excluded
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
    # The book the deployment actually serves can be the futures edge or the
    # spot mirror (whichever answers this egress), so the title names the
    # exchange, not the book — the venue badge and the catalog's categories
    # carry the book per symbol.
    title = "Binance (direct, keyless)"
    timeframes = TIMEFRAMES
    deterministic = False

    def __init__(self):
        self._last_trade_ids: Dict[str, int] = {}
        # 24h-ticker board cache: (epoch, rows, venue). The watchlist polls
        # once a second; Binance needs one 2s TTL between them, not one
        # REST call per poll.
        self._ticker: tuple[float, list, str] = (0.0, [], "")
        # Catalog cache: (epoch, venue, [symbols]). A real book caches 1h;
        # the offline core re-tries after 60s so a cold boot on dead egress
        # heals the moment egress comes back.
        self._catalog: tuple[float, str, list] = (0.0, "core",
                                                  list(SYMBOLS))

    def catalog(self) -> tuple[str, list]:
        """(venue, trading USDT symbols), from the exchange's own
        exchangeInfo when reachable, else the offline core. Everything
        listed here is fetchable by the same bases that serve klines/depth
        — the catalog never advertises what the wire will not carry."""
        now = time.time()
        ts, venue, syms = self._catalog
        ttl = CATALOG_TTL if venue in ("futures", "spot") else CATALOG_NEG_TTL
        if now - ts < ttl:
            return venue, syms
        try:
            fresh, fresh_venue = rest_exchange_symbols()
            if fresh:
                self._catalog = (now, fresh_venue, fresh)
                return fresh_venue, fresh
        except Exception:  # noqa: BLE001 — offline: keep serving the core
            pass
        # Stamp the fallback so the negative TTL actually holds (a render
        # loop must not re-probe the dead exchange on every pass).
        self._catalog = (now, venue, syms)
        return venue, syms

    def _resolve_symbol(self, symbol: str) -> Optional[str]:
        """The exchange's own spelling of `symbol`, or None.

        Traders type the base asset ("BETA" for BETAUSDT); an exact miss
        plus a USDT/USDC-suffixed hit in the catalog is the exchange's
        spelling of the same instrument, so it resolves silently."""
        s = (symbol or "").strip().upper()
        if not s:
            return None
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
        # Sub-minute: no such klines exist on the wire, so the bars are the
        # exchange's own recent trade tape (honest, shortest real history,
        # the live stream extends the edge). start/end are irrelevant to it.
        if timeframe in ("tick", "1s", "30s"):
            rows, venue = rest_agg_trades(sym, limit=1000)
            if not rows:
                raise NotSupported(f"binance served no trades for {sym}")
            bars, _newest = tape_to_candles(rows, timeframe, limit)
            df = pd.DataFrame(bars, columns=CANDLE_COLUMNS)
            df.attrs["venue"] = venue
            return df
        tf = {v: k for k, v in INTERVALS.items()}.get(timeframe)
        if tf is None:
            raise ValueError(f"binance: unsupported timeframe {timeframe!r}")
        params = {"symbol": sym, "interval": INTERVALS[tf],
                  "limit": str(int(limit))}
        # Digit strings are epoch seconds (the shell's live tail fetch);
        # ISO strings pass through untouched for the backtest paths.
        if start is not None and str(start).isdigit():
            params["startTime"] = str(int(start) * 1000)
        if end is not None and str(end).isdigit():
            params["endTime"] = str(int(end))
        try:
            rows, venue = _first_json(_KLINE_CALLS, params)
        except Exception as exc:  # noqa: BLE001
            raise NotSupported(f"binance REST unreachable: {exc}") from exc
        if not rows:
            raise NotSupported("binance served no klines")
        df = pd.DataFrame(parse_klines(rows), columns=CANDLE_COLUMNS)
        # honesty: the badge downstream must say spot when the mirror won
        df.attrs["venue"] = venue
        return df

    def prices(self, symbols: List[str]) -> List[dict]:
        """Price board for the terminal's watchlist poll: last price plus
        bid/ask per symbol, from the 24h ticker (one REST call for the whole
        book, cached for 2s so the 1s poll never double-hits the exchange).
        Rows for symbols the exchange has no ticker for are simply absent —
        the board row keeps its dash rather than showing a guess."""
        wanted = {s.upper() for s in symbols}
        now = time.time()
        ts, rows, venue = self._ticker
        if now - ts >= 2.0:
            try:
                rows, venue = rest_ticker24h()
                self._ticker = (now, rows, venue)
            except Exception:  # noqa: BLE001 — keep the stale board rows
                if not rows:
                    raise
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

        async def _ticks():
            async for ev in self._pump(resolved):
                if isinstance(ev, TradeEvent):
                    yield {"symbol": ev.symbol, "price": ev.price,
                           "ts": ev.ts, "volume": ev.size, "side": ev.side}
        return _ticks()

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
    async def _pump(self, symbols: List[str]) -> AsyncIterator:
        import websockets
        feeds = {s: BookFeed(s.lower()) for s in symbols}
        out_q: asyncio.Queue = asyncio.Queue()

        def drain_into_queue(feed: BookFeed) -> None:
            while feed.events:
                out_q.put_nowait(feed.events.pop(0))

        # fstream routes: /market + /public; the .vision mirror serves
        # combined streams under /stream on one socket. Candidates are tried
        # in "last winner first" order: whichever base last held a stream
        # goes first, so a WAF'd or ISP-blocked primary (Render datacenter
        # egress) is never re-probed for its full open_timeout on every
        # reconnect — the stream that worked keeps winning until it fails,
        # then the other is tried.
        ROUTES = {
            "market": [(WS_BASE, "/market"), (MIRROR_WS, "/stream")],
            "public": [(WS_BASE, "/public"), (MIRROR_WS, "/stream")],
        }
        winner: Dict[str, str] = {}   # route -> base that last held a stream

        async def watch(route: str, names: List[str],
                        handler) -> None:
            base_cands = ROUTES[route]
            # Order: last winner first, then the rest. Rebuilt each attempt
            # so a winner flip reorders without any index bookkeeping.
            def ordered():
                w = winner.get(route)
                return sorted(base_cands,
                              key=lambda c: 0 if c[0] == w else 1)
            backoff = 1.0
            while True:
                cands = ordered()
                held_any = False
                for base, path in cands:
                    url = f"{base}{path}?streams=" + ",".join(names)
                    try:
                        async with websockets.connect(
                                url, max_size=8 * 1024 * 1024,
                                open_timeout=8) as ws:
                            backoff = 1.0
                            winner[route] = base
                            held_any = True
                            for f in feeds.values():
                                f.reset_for_reconnect()
                            async for raw in ws:
                                env = json.loads(raw)
                                stream_name, data = env.get("stream", ""), env.get("data", {})
                                sym = stream_name.split("@")[0].upper()
                                feed = feeds.get(sym)
                                if feed is None:
                                    continue
                                await handler(feed, data)
                                drain_into_queue(feed)
                            break          # stream ended cleanly; re-pick
                    except asyncio.CancelledError:
                        raise
                    except Exception as exc:  # noqa: BLE001
                        log.warning("binance %s connect (%s) failed: %s",
                                    route, base, exc)
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

        async def on_market(feed: BookFeed, data: dict) -> None:
            ev = feed.on_agg_trade(data, self._last_trade_ids)
            if ev is not None:
                feed.events.append(ev)
            # a fresh trade on an unsynced book also nudges first sync
            if not feed.synced and not feed.resyncing:
                await feed._trigger_resync("initial sync", 0, 0)

        async def on_public(feed: BookFeed, data: dict) -> None:
            await feed.on_depth(data)

        lower = [s.lower() for s in symbols]
        tasks = [
            asyncio.create_task(watch("market",
                                      [f"{s}@aggTrade" for s in lower],
                                      on_market)),
            asyncio.create_task(watch("public",
                                      [f"{s}@depth@100ms" for s in lower],
                                      on_public)),
        ]
        # initial snapshots — in parallel: 8 symbols x serial REST would
        # block the first yield for minutes on a slow egress
        await asyncio.gather(*[f._trigger_resync("initial sync", 0, 0)
                               for f in feeds.values()])
        for f in feeds.values():
            drain_into_queue(f)
        try:
            while True:
                ev = await out_q.get()
                yield ev
        finally:
            for t in tasks:
                t.cancel()
