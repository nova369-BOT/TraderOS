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
import threading
from typing import AsyncIterator, List, Optional

import pandas as pd

from lse_terminal.contracts import (
    CANDLE_COLUMNS,
    NotSupported,
    Provider,
    TradeEvent,
)
from lse_terminal.contracts.types import Instrument

from .client import EdgeDepthClient

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
        values = run_async(self.client.fetch_candles(symbol, tf,
                                                     limit=int(limit)))
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

    # ── live streams ─────────────────────────────────────────────────────

    def stream(self, symbols: List[str]) -> AsyncIterator[dict]:
        self._validate(symbols)

        async def _ticks():
            async for ev in self.client.depth_stream(list(symbols)):
                if isinstance(ev, TradeEvent):
                    yield {"symbol": ev.symbol, "price": ev.price,
                           "ts": ev.ts, "volume": ev.size, "side": ev.side}

        return _ticks()

    def depth_stream(self, symbols: List[str]) -> AsyncIterator:
        # Eager validation per the provider contract: raise at call time.
        self._validate(symbols)
        return self.client.depth_stream(list(symbols))

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
