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
MIRROR_REST = "https://data-api.binance.vision"
MIRROR_WS = "wss://data-stream.binance.vision"

INTERVALS = {60: "1m", 300: "5m", 900: "15m", 3600: "1h", 14400: "4h",
             86400: "1d"}
TIMEFRAMES = ["1m", "5m", "15m", "1h", "4h", "1d"]

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
    title = "Binance USD-M Futures (direct, keyless)"
    timeframes = TIMEFRAMES
    deterministic = False

    def __init__(self):
        self._last_trade_ids: Dict[str, int] = {}

    def search(self, query: str = "", limit: int = 50) -> List[Instrument]:
        q = (query or "").strip().upper().replace(" ", "")
        out = []
        for sym, name in SYMBOLS.items():
            if not q or q in sym or q in name.upper().split()[0]:
                out.append(Instrument(
                    symbol=sym, name=name, category="Binance USD-M Futures",
                    provider=self.name, meta={"live": True,
                                              "venue": "binance-futures"}))
        return out[: max(1, limit)]

    def candles(self, symbol, timeframe, limit=500, start=None, end=None):
        import pandas as pd
        tf = {v: k for k, v in INTERVALS.items()}.get(timeframe)
        if tf is None or symbol.upper() not in SYMBOLS:
            raise ValueError(f"binance: bad request {symbol}/{timeframe}")
        params = {"symbol": symbol.upper(), "interval": INTERVALS[tf],
                  "limit": str(int(limit))}
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

    def depth_stream(self, symbols: List[str]) -> AsyncIterator:
        bad = [s for s in symbols if s.upper() not in SYMBOLS]
        if bad:
            raise ValueError(f"binance: unknown symbols {bad}")
        return self._pump([s.upper() for s in symbols])

    def stream(self, symbols: List[str]) -> AsyncIterator[dict]:
        bad = [s for s in symbols if s.upper() not in SYMBOLS]
        if bad:
            raise ValueError(f"binance: unknown symbols {bad}")

        async def _ticks():
            async for ev in self._pump([s.upper() for s in symbols]):
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
        # combined streams under /stream on one socket. Cycle candidates on
        # every failed connect so a WAF'd or ISP-blocked primary heals to the
        # mirror without any operator action.
        ROUTES = {
            "market": [(WS_BASE, "/market"), (MIRROR_WS, "/stream")],
            "public": [(WS_BASE, "/public"), (MIRROR_WS, "/stream")],
        }

        async def watch(route: str, names: List[str],
                        handler) -> None:
            candidates = ROUTES[route]
            ci = 0
            backoff = 1.0
            while True:
                base, path = candidates[ci]
                url = f"{base}{path}?streams=" + ",".join(names)
                try:
                    async with websockets.connect(
                            url, max_size=8 * 1024 * 1024,
                            open_timeout=10) as ws:
                        backoff = 1.0
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
                except asyncio.CancelledError:
                    raise
                except Exception as exc:  # noqa: BLE001
                    log.warning("binance %s stream error (%s): %s",
                                route, base, exc)
                    ci = (ci + 1) % len(candidates)   # primary -> mirror
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
