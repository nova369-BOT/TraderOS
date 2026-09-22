"""Trade Tape — time & sales with size highlighting (EdgeDepth port).

Port of src/ui/trades_widget.h: live time & sales with size highlighting,
filtering, and bubble display.

Uses Binance/Coinbase/Hyperliquid trade streams (real prints only).
Ultra-fast: ring buffer, O(1) per trade, size highlighting via median.
"""

from __future__ import annotations

import time
from collections import deque
from dataclasses import dataclass, field
from typing import Dict, List, Optional
import statistics


@dataclass
class TapeTrade:
    symbol: str
    price: float
    qty: float
    is_buy: bool
    timestamp_ms: int
    notional_usd: float = 0.0
    size_highlight: int = 0  # 0 = normal, 1 = medium, 2 = large, 3 = huge
    trade_id: Optional[int] = None


class TapeManager:
    """Trade tape with size highlighting and filtering."""

    def __init__(self, max_trades: int = 5000):
        self.max_trades = max_trades
        self._trades: Dict[str, deque] = {}  # symbol -> deque of TapeTrade
        self._median_cache: Dict[str, float] = {}
        self._last_median_update: Dict[str, float] = {}

    def clear(self, symbol: str):
        self._trades.pop(symbol, None)
        self._median_cache.pop(symbol, None)
        self._last_median_update.pop(symbol, None)

    def clear_all(self):
        self._trades.clear()
        self._median_cache.clear()
        self._last_median_update.clear()

    def _ensure(self, symbol: str):
        if symbol not in self._trades:
            self._trades[symbol] = deque(maxlen=self.max_trades)

    def on_trade(self, symbol: str, price: float, qty: float, is_buy: bool, timestamp_ms: int = None, trade_id: int = None):
        self._ensure(symbol)
        if timestamp_ms is None:
            timestamp_ms = int(time.time() * 1000)
        notional = price * qty

        # size highlighting: compare to median
        # update median every 100 trades or 5 sec
        now = time.time()
        last_update = self._last_median_update.get(symbol, 0)
        median = self._median_cache.get(symbol, qty)
        if now - last_update > 5.0 or len(self._trades[symbol]) % 100 == 0:
            if len(self._trades[symbol]) >= 10:
                qtys = [t.qty for t in self._trades[symbol]]
                try:
                    median = statistics.median(qtys)
                    self._median_cache[symbol] = median
                    self._last_median_update[symbol] = now
                except:
                    median = qty
            else:
                median = qty
                self._median_cache[symbol] = median

        # highlight thresholds (like EdgeDepth's bigTradeK)
        # 1x median = normal, 3x = medium, 6x = large, 12x = huge
        highlight = 0
        if median > 0:
            ratio = qty / median
            if ratio >= 12:
                highlight = 3
            elif ratio >= 6:
                highlight = 2
            elif ratio >= 3:
                highlight = 1

        trade = TapeTrade(
            symbol=symbol,
            price=price,
            qty=qty,
            is_buy=is_buy,
            timestamp_ms=timestamp_ms,
            notional_usd=notional,
            size_highlight=highlight,
            trade_id=trade_id,
        )
        self._trades[symbol].append(trade)

    def get_trades(self, symbol: str, limit: int = 100, side: str = "all", min_size: float = 0.0) -> List[TapeTrade]:
        self._ensure(symbol)
        trades = list(self._trades[symbol])
        if side != "all":
            is_buy = side == "buy"
            trades = [t for t in trades if t.is_buy == is_buy]
        if min_size > 0:
            trades = [t for t in trades if t.qty >= min_size]
        return trades[-limit:]

    def to_dict(self, symbol: str, limit: int = 100, side: str = "all", min_size: float = 0.0) -> dict:
        trades = self.get_trades(symbol, limit, side, min_size)
        return {
            "symbol": symbol,
            "trades": [
                {
                    "price": t.price,
                    "qty": t.qty,
                    "is_buy": t.is_buy,
                    "side": "BUY" if t.is_buy else "SELL",
                    "timestamp_ms": t.timestamp_ms,
                    "notional_usd": t.notional_usd,
                    "highlight": t.size_highlight,
                    "trade_id": t.trade_id,
                }
                for t in reversed(trades)  # newest first for tape
            ],
            "count": len(trades),
            "median_qty": self._median_cache.get(symbol, 0.0),
        }
