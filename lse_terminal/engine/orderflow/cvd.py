"""CVD — Cumulative Volume Delta (EdgeDepth port).

Tracks buy/sell volume, delta, CVD, imbalance from real trade prints.
Uses Binance/Coinbase/Hyperliquid as L2/L3 sources.

Ultra-fast: O(1) per trade, ring buffer for visible range.
"""

from __future__ import annotations

import time
from collections import deque
from dataclasses import dataclass, field
from typing import Dict, List


@dataclass
class CVDPoint:
    ts: float  # epoch seconds
    price: float
    buy_volume: float = 0.0
    sell_volume: float = 0.0
    delta: float = 0.0
    cvd: float = 0.0
    total_volume: float = 0.0
    trade_count: int = 0


@dataclass
class CVDBar:
    start_ms: int
    end_ms: int
    buy_volume: float = 0.0
    sell_volume: float = 0.0
    delta: float = 0.0
    cvd: float = 0.0
    total_volume: float = 0.0
    high: float = 0.0
    low: float = 0.0
    close: float = 0.0
    trade_count: int = 0


class CVDManager:
    """CVD tracker per symbol, with minute bars + live tick."""

    def __init__(self, max_bars: int = 10000):
        self.max_bars = max_bars
        # symbol -> deque of CVDBar (1m)
        self._bars: Dict[str, deque] = {}
        # symbol -> current forming bar
        self._current: Dict[str, CVDBar] = {}
        # symbol -> running CVD
        self._cvd: Dict[str, float] = {}
        # symbol -> deque of raw points for detailed view
        self._points: Dict[str, deque] = {}

    def clear(self, symbol: str):
        self._bars.pop(symbol, None)
        self._current.pop(symbol, None)
        self._cvd.pop(symbol, None)
        self._points.pop(symbol, None)

    def clear_all(self):
        self._bars.clear()
        self._current.clear()
        self._cvd.clear()
        self._points.clear()

    def _ensure(self, symbol: str):
        if symbol not in self._bars:
            self._bars[symbol] = deque(maxlen=self.max_bars)
            self._points[symbol] = deque(maxlen=self.max_bars * 10)
            self._cvd[symbol] = 0.0

    def on_trade(self, symbol: str, price: float, qty: float, is_buy: bool, ts: float = None):
        self._ensure(symbol)
        if ts is None:
            ts = time.time()
        ts_ms = int(ts * 1000)
        start_ms = (ts_ms // 60000) * 60000
        end_ms = start_ms + 60000

        # point
        buy_vol = qty if is_buy else 0.0
        sell_vol = 0.0 if is_buy else qty
        delta = buy_vol - sell_vol
        self._cvd[symbol] += delta
        point = CVDPoint(
            ts=ts,
            price=price,
            buy_volume=buy_vol,
            sell_volume=sell_vol,
            delta=delta,
            cvd=self._cvd[symbol],
            total_volume=qty,
            trade_count=1,
        )
        self._points[symbol].append(point)

        # bar
        cur = self._current.get(symbol)
        if cur is None or cur.start_ms != start_ms:
            # finalize previous
            if cur is not None:
                self._bars[symbol].append(cur)
            # new bar
            cur = CVDBar(start_ms=start_ms, end_ms=end_ms, high=price, low=price, close=price)
            self._current[symbol] = cur

        cur.buy_volume += buy_vol
        cur.sell_volume += sell_vol
        cur.delta += delta
        cur.total_volume += qty
        cur.trade_count += 1
        cur.close = price
        if cur.high == 0 or price > cur.high:
            cur.high = price
        if cur.low == 0 or price < cur.low:
            cur.low = price
        cur.cvd = self._cvd[symbol]

    def get_bars(self, symbol: str, from_ms: int = 0, to_ms: int = 0, limit: int = 500) -> List[CVDBar]:
        self._ensure(symbol)
        bars = list(self._bars[symbol])
        cur = self._current.get(symbol)
        if cur:
            bars.append(cur)
        if from_ms:
            bars = [b for b in bars if b.start_ms >= from_ms]
        if to_ms:
            bars = [b for b in bars if b.start_ms < to_ms]
        return bars[-limit:]

    def get_points(self, symbol: str, limit: int = 500) -> List[CVDPoint]:
        self._ensure(symbol)
        pts = list(self._points[symbol])
        return pts[-limit:]

    def get_current_cvd(self, symbol: str) -> float:
        return self._cvd.get(symbol, 0.0)

    def to_dict(self, symbol: str, from_ms: int = 0, to_ms: int = 0, limit: int = 500) -> dict:
        bars = self.get_bars(symbol, from_ms, to_ms, limit)
        return {
            "symbol": symbol,
            "cvd": self.get_current_cvd(symbol),
            "bars": [
                {
                    "start": b.start_ms,
                    "end": b.end_ms,
                    "buy": b.buy_volume,
                    "sell": b.sell_volume,
                    "delta": b.delta,
                    "cvd": b.cvd,
                    "total": b.total_volume,
                    "high": b.high,
                    "low": b.low,
                    "close": b.close,
                    "count": b.trade_count,
                }
                for b in bars
            ],
            "points": [
                {
                    "ts": p.ts,
                    "price": p.price,
                    "buy": p.buy_volume,
                    "sell": p.sell_volume,
                    "delta": p.delta,
                    "cvd": p.cvd,
                    "total": p.total_volume,
                }
                for p in self.get_points(symbol, limit=200)
            ],
        }
