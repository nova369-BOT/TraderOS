"""Volume Profile (VPVR) — aggregated volume by price for visible range.

Port of src/core/volume_profile_manager.h: per-level buy/sell/total,
POC, VAH/VAL (70% value area), modes Standard/TotalVolume/TotalDelta.

Uses Binance/Coinbase/Hyperliquid trade tape as source (real prints).
"""

from __future__ import annotations

import math
from collections import defaultdict
from dataclasses import dataclass, field
from typing import Dict, List, Optional


@dataclass
class Level:
    price: float = 0.0
    buy_volume: float = 0.0
    sell_volume: float = 0.0
    total_volume: float = 0.0
    delta: float = 0.0
    volume_pct: float = 0.0
    is_poc: bool = False
    in_value_area: bool = False
    trade_count: int = 0


@dataclass
class ProfileData:
    levels: List[Level] = field(default_factory=list)
    poc: float = 0.0
    vah: float = 0.0
    val: float = 0.0
    total_volume: float = 0.0
    value_area_vol: float = 0.0
    start_time: int = 0
    end_time: int = 0
    valid: bool = False


class VolumeProfileManager:
    """VPVR for visible chart range, with POC/VAH/VAL."""

    def __init__(self):
        self._profiles: Dict[str, ProfileData] = {}
        self.mode: str = "standard"  # standard | total_volume | total_delta
        self.show_poc: bool = True
        self.show_vah_val: bool = True
        self.show_values: bool = False
        self.width_pct: float = 0.20
        self.enabled: bool = False
        self._last_request: Dict[str, tuple] = {}  # debounce

    def invalidate(self, symbol: str):
        self._profiles.pop(symbol, None)

    def invalidate_all(self):
        self._profiles.clear()

    def get_profile(self, symbol: str) -> Optional[ProfileData]:
        return self._profiles.get(symbol)

    def build_from_trades(self, symbol: str, trades: List[dict], start_ms: int, end_ms: int, tick_per_row: float = 0.0) -> ProfileData:
        """Build VPVR from trade list in visible range.

        trades: list of {price, size, side, ts}
        """
        if not trades:
            return ProfileData(valid=False)

        # filter by time
        filtered = [t for t in trades if start_ms <= int(t.get("ts", 0) * 1000) < end_ms] if start_ms and end_ms else trades
        if not filtered:
            filtered = trades

        # bucket by price
        buckets: Dict[float, Level] = {}
        if tick_per_row <= 0:
            # auto tick: 0.5% of price range or 1/100 of range, at least 0.01
            prices = [t["price"] for t in filtered]
            if prices:
                prange = max(prices) - min(prices)
                tick_per_row = max(prange / 100.0, min(prices) * 0.0005, 0.01)
            else:
                tick_per_row = 1.0

        for tr in filtered:
            price = float(tr.get("price", 0))
            size = float(tr.get("size", tr.get("qty", 0)))
            side = str(tr.get("side", "")).upper()
            is_buy = "BUY" in side
            # bucket
            bucket_price = math.floor(price / tick_per_row) * tick_per_row if tick_per_row > 0 else price
            key = round(bucket_price / 1e-9) * 1e-9
            if key not in buckets:
                buckets[key] = Level(price=bucket_price)
            lv = buckets[key]
            lv.total_volume += size
            lv.trade_count += 1
            if is_buy:
                lv.buy_volume += size
            else:
                lv.sell_volume += size
            lv.delta = lv.buy_volume - lv.sell_volume

        levels = sorted(buckets.values(), key=lambda x: x.price)
        total = sum(l.total_volume for l in levels)
        if total == 0:
            return ProfileData(valid=False)

        for lv in levels:
            lv.volume_pct = lv.total_volume / total * 100.0

        # POC = max volume
        poc_level = max(levels, key=lambda x: x.total_volume)
        poc = poc_level.price
        poc_level.is_poc = True

        # Value Area: 70% of total volume around POC
        # Sort by price, expand from POC outward by volume
        # Standard method: start at POC, add levels with highest volume next
        # Simpler: sort levels by volume descending, take 70%, then find min/max price of those
        # More accurate: expand from POC outward
        sorted_by_vol = sorted(levels, key=lambda x: x.total_volume, reverse=True)
        target_vol = total * 0.70
        va_vol = 0.0
        va_prices = []
        for lv in sorted_by_vol:
            va_vol += lv.total_volume
            va_prices.append(lv.price)
            if va_vol >= target_vol:
                break
        # VAH/VAL = max/min price in value area
        vah = max(va_prices) if va_prices else poc
        val = min(va_prices) if va_prices else poc

        # mark in_value_area
        for lv in levels:
            if val <= lv.price <= vah:
                lv.in_value_area = True

        profile = ProfileData(
            levels=levels,
            poc=poc,
            vah=vah,
            val=val,
            total_volume=total,
            value_area_vol=va_vol,
            start_time=start_ms,
            end_time=end_ms,
            valid=True,
        )
        self._profiles[symbol] = profile
        return profile

    def build_from_footprints(self, symbol: str, footprints: List[dict], tick_per_row: float = 0.0) -> ProfileData:
        """Build from footprint levels (aggregated per minute)."""
        buckets: Dict[float, Level] = {}
        if tick_per_row <= 0:
            tick_per_row = 1.0

        for fp in footprints:
            for lv in fp.get("levels", []):
                price = float(lv.get("price", lv.get("price_mid", 0)))
                buy = float(lv.get("buy", lv.get("buy_volume", 0)))
                sell = float(lv.get("sell", lv.get("sell_volume", 0)))
                total = float(lv.get("total", lv.get("total_volume", buy+sell)))
                bucket_price = math.floor(price / tick_per_row) * tick_per_row if tick_per_row > 0 else price
                key = round(bucket_price / 1e-9) * 1e-9
                if key not in buckets:
                    buckets[key] = Level(price=bucket_price)
                b = buckets[key]
                b.buy_volume += buy
                b.sell_volume += sell
                b.total_volume += total
                b.delta += buy - sell

        levels = sorted(buckets.values(), key=lambda x: x.price)
        total = sum(l.total_volume for l in levels)
        if total == 0:
            return ProfileData(valid=False)

        for lv in levels:
            lv.volume_pct = lv.total_volume / total * 100.0

        poc_level = max(levels, key=lambda x: x.total_volume)
        poc = poc_level.price
        poc_level.is_poc = True

        sorted_by_vol = sorted(levels, key=lambda x: x.total_volume, reverse=True)
        target_vol = total * 0.70
        va_vol = 0.0
        va_prices = []
        for lv in sorted_by_vol:
            va_vol += lv.total_volume
            va_prices.append(lv.price)
            if va_vol >= target_vol:
                break
        vah = max(va_prices) if va_prices else poc
        val = min(va_prices) if va_prices else poc

        for lv in levels:
            if val <= lv.price <= vah:
                lv.in_value_area = True

        profile = ProfileData(
            levels=levels,
            poc=poc,
            vah=vah,
            val=val,
            total_volume=total,
            value_area_vol=va_vol,
            valid=True,
        )
        self._profiles[symbol] = profile
        return profile

    def to_dict(self, symbol: str) -> dict:
        prof = self._profiles.get(symbol)
        if not prof or not prof.valid:
            return {"symbol": symbol, "valid": False, "levels": []}
        return {
            "symbol": symbol,
            "valid": True,
            "poc": prof.poc,
            "vah": prof.vah,
            "val": prof.val,
            "total_volume": prof.total_volume,
            "value_area_vol": prof.value_area_vol,
            "start_time": prof.start_time,
            "end_time": prof.end_time,
            "levels": [
                {
                    "price": lv.price,
                    "buy": lv.buy_volume,
                    "sell": lv.sell_volume,
                    "total": lv.total_volume,
                    "delta": lv.delta,
                    "volume_pct": lv.volume_pct,
                    "is_poc": lv.is_poc,
                    "in_value_area": lv.in_value_area,
                    "trade_count": lv.trade_count,
                }
                for lv in prof.levels
            ],
        }
