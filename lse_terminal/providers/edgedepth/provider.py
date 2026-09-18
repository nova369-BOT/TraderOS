"""EdgeDepth provider (F1/E0, Phase 0): Binance USD-M futures, keyless.

Sits in the rail next to the public ccxt L2 source. The gateway is the user's
own EdgeDepth infrastructure, so this provider serves candles AND depth from
one wire, unlike the depth-only public feeds.

Data honesty: live-only depth (the gateway keeps no L2 history), so
``depth_history`` raises NotSupported and the pane's honest range + the
terminal's own session recorder remain the history path.
"""

from __future__ import annotations

import asyncio
import logging
import threading
import time
from typing import AsyncIterator, Dict, List, Optional

import pandas as pd

log = logging.getLogger(__name__)

from lse_terminal.contracts import (
    CANDLE_COLUMNS,
    NotSupported,
    Provider,
    TradeEvent,
)
from lse_terminal.contracts.types import Instrument

from .client import EdgeDepthClient, ensure_gateway

# The product's day-one Binance USD-M futures list; one row per supported
# symbol is the whole change to add another.
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

_TIMEFRAMES = {"1m": 60, "5m": 300, "15m": 900, "1h": 3600, "4h": 14400,
               "1d": 86400}

# Every pane switch on this book used to pay the full round trip again:
# engine -> gateway (fresh WS dial) + gateway -> Binance (REST klines). The
# bars behind the forming one are immutable, so re-fetching the identical
# latest frame on every tap buys nothing. Latest frames (start/end unset —
# the pane-switch shape) ride this cache; the chart's tail-reload always
# carries ``start`` and therefore ALWAYS goes to the venue, so freshness of
# the open chart is untouched. The forming bar is painted by the live trade
# stream regardless — a cached frame is a starting picture, never the truth
# engine. TTL is bounded by the bar itself, matching the terminal's own
# reload cadence (see app.js chartReloadCadence).
def _frame_ttl_s(tf_s: int) -> float:
    return min(60.0, max(3.0, tf_s / 10.0))


def run_async(coro):
    """Sync provider methods run in the server's threadpool (no running loop);
    if one ever calls from a live loop, bridge through a private thread."""
    try:
        asyncio.get_running_loop()
    except RuntimeError:
        return asyncio.run(coro)
    result: dict = {}

    def _runner():
        try:
            result["v"] = asyncio.run(coro)
        except BaseException as exc:  # noqa: BLE001
            result["e"] = exc

    th = threading.Thread(target=_runner, daemon=True)
    th.start()
    th.join()
    if "e" in result:
        raise result["e"]
    return result["v"]


class EdgeDepthProvider(Provider):
    name = "edgedepth"
    title = "Binance USD-M Futures (EdgeDepth gateway)"
    timeframes = list(_TIMEFRAMES)
    deterministic = False

    def __init__(self, url: Optional[str] = None):
        self.client = EdgeDepthClient(url)
        # Latest-frame memo: (symbol, tf_s, limit) -> (monotonic_ts, frame).
        # Guarded by a lock: candles() runs in uvicorn's threadpool.
        self._frame_cache: Dict[tuple, tuple] = {}
        self._cache_lock = threading.Lock()
        # Tests pin TTL behaviour by overriding this one knob.
        self._ttl_override: Optional[float] = None

    @staticmethod
    def _ensure() -> None:
        """Bring the managed gateway up before any socket is touched. The
        supervisor raises GatewayUnavailable with an actionable reason; we
        convert to NotSupported so source resolution reports the reason and
        falls through instead of hanging (fail-open invariant)."""
        from lse_terminal.engine.gateway import GatewayUnavailable
        try:
            ensure_gateway()
        except GatewayUnavailable as e:
            raise NotSupported(f"edgedepth gateway: {e}") from e

    # ── catalog ─────────────────────────────────────────────────────────

    def search(self, query: str = "", limit: int = 50) -> List[Instrument]:
        q = (query or "").strip().upper().replace(" ", "")
        out = []
        for sym, name in SYMBOLS.items():
            words = [w for w in name.upper().split() if w.isalnum()]
            if not q or q in sym or any(w.startswith(q) for w in words):
                out.append(Instrument(
                    symbol=sym,
                    name=name,
                    category="Binance USD-M Futures",
                    provider=self.name,
                    meta={"live": True, "venue": "binance"},
                ))
        return out[: max(1, limit)]

    # ── candles ──────────────────────────────────────────────────────────

    def candles(self, symbol: str, timeframe: str, limit: int = 500,
                start: Optional[str] = None, end: Optional[str] = None):
        tf = _TIMEFRAMES.get(timeframe)
        if tf is None:
            raise ValueError(f"{self.name}: unsupported timeframe {timeframe}")
        if symbol not in SYMBOLS:
            raise ValueError(f"{self.name}: unknown symbol {symbol}")
        self._ensure()
        # Windowed calls (scrollback, tail reload, backtest replay) are
        # freshness-critical and unique-shaped: they never touch the memo.
        latest = start is None and end is None
        if not latest:
            return self._fetch_frame(symbol, tf, int(limit))
        key = (symbol, tf, int(limit))
        now = time.monotonic()
        hit = self._frame_cache.get(key)
        ttl = (self._ttl_override
               if self._ttl_override is not None else _frame_ttl_s(tf))
        if hit is not None and now - hit[0] < ttl:
            # Callers share nothing: a mutate-happy consumer (indicators)
            # must never corrupt the memo for the next tap.
            return hit[1].copy()
        df = self._fetch_frame(symbol, tf, int(limit))
        with self._cache_lock:
            if len(self._frame_cache) >= 64:  # bounded, LRU by timestamp
                del self._frame_cache[
                    min(self._frame_cache, key=lambda k: self._frame_cache[k][0])]
            # The memo owns its copy: the frame we return belongs to the
            # caller and must never alias what the next tap reads.
            self._frame_cache[key] = (now, df.copy())
        return df

    def _fetch_frame(self, symbol: str, tf_s: int, limit: int):
        values = run_async(self.client.fetch_candles(symbol, tf_s,
                                                     limit=limit))
        if not values:
            raise NotSupported(
                f"{self.name}: gateway served no history for {symbol} "
                f"(is the gateway running at {self.client.url}?)")
        rows = []
        for c in values:
            rows.append((c.timestamp_ms / 1000.0, c.open, c.high, c.low,
                         c.close, c.volume))
        rows.sort(key=lambda r: r[0])
        return pd.DataFrame(rows, columns=CANDLE_COLUMNS)

    def prewarm(self, warmup_limit: int = 5000) -> None:
        """Fill the latest-frame memo for the whole book, once, in the
        background. The engine calls this at startup so the first pane tap
        paints from memo instead of paying child-spawn + venue hop on a
        user's click. Run with a small pool: one Binance burst stays far
        under the klines weight budget. Any gateway absence just leaves the
        memo empty — the blocking path reports that, unchanged."""
        try:
            self._ensure()
        except NotSupported as e:
            log.info("edgedepth prewarm skipped: %s", e)
            return
        jobs = [(sym, tf) for sym in SYMBOLS for tf in _TIMEFRAMES]
        done = threading.Event()

        def _worker():
            while jobs and not done.is_set():
                try:
                    sym, tf = jobs.pop()
                except IndexError:
                    return
                try:
                    self.candles(sym, tf, limit=warmup_limit)
                except Exception as e:  # noqa: BLE001
                    log.debug("edgedepth prewarm miss %s %s: %s", sym, tf, e)

        workers = [threading.Thread(target=_worker, daemon=True)
                   for _ in range(8)]
        for w in workers:
            w.start()
        for w in workers:
            w.join()
        log.info("edgedepth prewarm: %d frames memoized", len(self._frame_cache))

    # ── live streams ─────────────────────────────────────────────────────

    def stream(self, symbols: List[str]) -> AsyncIterator[dict]:
        self._validate(symbols)
        self._ensure()

        async def _ticks():
            async for ev in self.client.depth_stream(list(symbols)):
                if isinstance(ev, TradeEvent):
                    yield {"symbol": ev.symbol, "price": ev.price,
                           "ts": ev.ts, "volume": ev.size, "side": ev.side}

        return _ticks()

    def depth_stream(self, symbols: List[str]) -> AsyncIterator:
        # Eager validation per the provider contract: raise at call time.
        self._validate(symbols)
        self._ensure()  # gateway up first; depth_stream then connects
        return self.client.depth_stream(list(symbols))

    def feed_stream(self, symbol: str, candle_tf_s: int = 60
                    ) -> AsyncIterator:
        """The full normalized per-symbol feed (book/trades/candles/stats/
        liquidations) — one gateway, one wire, one subscription set. Eager
        validation + gateway ensure, same rule as depth_stream."""
        self._validate([symbol])
        self._ensure()
        return self.client.feed_stream(symbol, candle_tf_s)

    def depth_history(self, symbol, start, end, column_ms=1000,
                      max_levels=50):
        raise NotSupported(
            f"{self.name} serves live depth only; the Binance public feed "
            "keeps no L2 history. The terminal's session recorder is the "
            "history path (data honesty rule).")

    def configured(self) -> bool:
        return True  # keyless by design; reachability shows at connect time

    def capabilities(self):
        caps = super().capabilities()
        caps.discard("depth_history")
        return caps

    @staticmethod
    def _validate(symbols):
        bad = [s for s in symbols if s not in SYMBOLS]
        if bad:
            raise ValueError(f"edgedepth: unknown symbols {bad}")
