"""Footprint — per-candle tick volume for footprint chart overlay (EdgeDepth port).

Inspired by src/core/footprint_manager.h: stores raw 1-tick-per-row data,
client regroups into configurable tick_per_row buckets on the fly.

Data flow:
  Historical: chart zoom -> trade_history() -> batch -> store
  Live: depth_stream trade events -> on_trade() -> live forming candle
  Render: get_footprint() per visible candle -> group_levels() -> draw grid

Ultra-fast: no per-frame allocation, versioned cache, O(1) lookup.
Uses Binance/Coinbase/Hyperliquid as L2/L3 trade sources (real prints only).
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
    trade_count: int = 0
    delta: float = 0.0  # buy - sell


@dataclass
class CandleFootprint:
    start_time: int = 0  # candle start ms
    end_time: int = 0
    levels: List[Level] = field(default_factory=list)  # sorted by price asc
    total_volume: float = 0.0
    total_buy: float = 0.0
    total_sell: float = 0.0
    delta: float = 0.0
    poc: float = 0.0  # point of control price
    high_price: float = 0.0
    low_price: float = 0.0
    valid: bool = False
    version: int = 0


@dataclass
class GroupedLevel:
    price_mid: float = 0.0
    price_lo: float = 0.0
    price_hi: float = 0.0
    buy_volume: float = 0.0
    sell_volume: float = 0.0
    total_volume: float = 0.0
    delta: float = 0.0
    is_poc: bool = False
    bucket_index: int = 0
    buy_imbalance: bool = False
    sell_imbalance: bool = False
    buy_stack: bool = False
    sell_stack: bool = False


@dataclass
class MergedCache:
    levels: List[GroupedLevel] = field(default_factory=list)
    timeframe_seconds: int = 0
    comparison: str = "same_price"  # same_price | diagonal
    ratio: float = 3.0
    minimum_volume: float = 0.0
    stack_levels: int = 0
    observed_trades: bool = False
    provisional: bool = False
    tick_per_row: float = 0.0
    composite_ver: int = 0
    total_volume: float = 0.0
    total_buy: float = 0.0
    total_sell: float = 0.0
    delta: float = 0.0
    high_price: float = 0.0
    low_price: float = 0.0


class FootprintManager:
    """Per-symbol footprint storage + grouping + imbalance detection.

    Mirrors EdgeDepth's FootprintManager but pure Python, ultra-fast.
    """

    def __init__(self):
        # symbol -> start_time_ms -> CandleFootprint
        self._data: Dict[str, Dict[int, CandleFootprint]] = {}
        # live forming candles (observed trades, provisional)
        self._live: Dict[str, Dict[int, CandleFootprint]] = {}
        self._data_version: int = 0
        self._merged_cache: Dict[str, Dict[int, MergedCache]] = {}
        self.enabled: bool = False
        self.show_imbalances: bool = True
        self.show_poc: bool = True
        self.show_summary: bool = True
        self.comparison: str = "same_price"  # or "diagonal"
        self.imbalance_min_volume: float = 0.0
        self.stacked_levels: int = 0
        self.imbalance_ratio: float = 3.0

    def clear(self, symbol: str):
        self._data.pop(symbol, None)
        self._live.pop(symbol, None)
        self._merged_cache.pop(symbol, None)
        self._data_version += 1

    def clear_all(self):
        self._data.clear()
        self._live.clear()
        self._merged_cache.clear()
        self._data_version += 1

    def data_version(self) -> int:
        return self._data_version

    def has_new_data_since(self, version: int) -> bool:
        return self._data_version != version

    def store_footprint(self, symbol: str, fp: CandleFootprint):
        if symbol not in self._data:
            self._data[symbol] = {}
        fp.version = self._data_version + 1
        self._data[symbol][fp.start_time] = fp
        self._data_version += 1
        # invalidate cache for this candle
        if symbol in self._merged_cache:
            self._merged_cache[symbol].pop(fp.start_time, None)

    def on_trade(self, symbol: str, timestamp_ms: int, price: float, qty: float, is_buy: bool):
        """Live forming minute — provisional until replaced by complete minute."""
        # bucket to 1m
        start = (timestamp_ms // 60000) * 60000
        end = start + 60000
        market = symbol
        if market not in self._live:
            self._live[market] = {}
        if start not in self._live[market]:
            self._live[market][start] = CandleFootprint(
                start_time=start, end_time=end, valid=True
            )
        fp = self._live[market][start]
        # find or create level for this price (rounded to tick)
        # use price as key with 1e-9 eps like DepthBook
        found = None
        for lv in fp.levels:
            if abs(lv.price - price) < 1e-9:
                found = lv
                break
        if found is None:
            found = Level(price=price)
            fp.levels.append(found)
            fp.levels.sort(key=lambda x: x.price)
        if is_buy:
            found.buy_volume += qty
            fp.total_buy += qty
        else:
            found.sell_volume += qty
            fp.total_sell += qty
        found.total_volume = found.buy_volume + found.sell_volume
        found.delta = found.buy_volume - found.sell_volume
        found.trade_count += 1
        fp.total_volume = fp.total_buy + fp.total_sell
        fp.delta = fp.total_buy - fp.total_sell
        if fp.high_price == 0 or price > fp.high_price:
            fp.high_price = price
        if fp.low_price == 0 or price < fp.low_price:
            fp.low_price = price
        # POC = price with max total_volume
        if fp.levels:
            poc_level = max(fp.levels, key=lambda x: x.total_volume)
            fp.poc = poc_level.price
        fp.version = self._data_version + 1
        self._data_version += 1
        if symbol in self._merged_cache:
            self._merged_cache[symbol].pop(start, None)

    def get_footprint(self, symbol: str, start_time: int) -> Optional[CandleFootprint]:
        # live takes precedence if provisional
        if symbol in self._live and start_time in self._live[symbol]:
            return self._live[symbol][start_time]
        if symbol in self._data and start_time in self._data[symbol]:
            return self._data[symbol][start_time]
        return None

    def _available(self, symbol: str, start: int, as_of_ms: int) -> Optional[CandleFootprint]:
        # complete data valid, live provisional only if as_of within candle
        if symbol in self._data and start in self._data[symbol]:
            return self._data[symbol][start]
        if symbol in self._live and start in self._live[symbol]:
            fp = self._live[symbol][start]
            # if as_of is inside candle, it's provisional but available
            if as_of_ms >= fp.start_time and as_of_ms < fp.end_time + 60000:
                return fp
        return None

    def group_levels(self, fp: CandleFootprint, tick_per_row: float) -> List[GroupedLevel]:
        """Client-side regrouping — no re-request when user changes granularity."""
        if not fp.levels:
            return []
        if tick_per_row <= 0:
            # auto: use 1 tick per row (raw)
            out = []
            for idx, lv in enumerate(sorted(fp.levels, key=lambda x: x.price)):
                out.append(GroupedLevel(
                    price_mid=lv.price,
                    price_lo=lv.price,
                    price_hi=lv.price,
                    buy_volume=lv.buy_volume,
                    sell_volume=lv.sell_volume,
                    total_volume=lv.total_volume,
                    delta=lv.delta,
                    is_poc=abs(lv.price - fp.poc) < 1e-9,
                    bucket_index=idx,
                ))
            return out

        # bucket by tick_per_row
        buckets: Dict[int, List[Level]] = defaultdict(list)
        for lv in fp.levels:
            bucket_idx = int(math.floor(lv.price / tick_per_row))
            buckets[bucket_idx].append(lv)
        out: List[GroupedLevel] = []
        for bucket_idx in sorted(buckets.keys()):
            lvls = buckets[bucket_idx]
            lo = bucket_idx * tick_per_row
            hi = lo + tick_per_row
            mid = (lo + hi) / 2.0
            buy = sum(x.buy_volume for x in lvls)
            sell = sum(x.sell_volume for x in lvls)
            total = buy + sell
            delta = buy - sell
            is_poc = any(abs(x.price - fp.poc) < 1e-9 for x in lvls)
            out.append(GroupedLevel(
                price_mid=mid,
                price_lo=lo,
                price_hi=hi,
                buy_volume=buy,
                sell_volume=sell,
                total_volume=total,
                delta=delta,
                is_poc=is_poc,
                bucket_index=bucket_idx,
            ))
        return out

    def _detect_imbalances(self, grouped: List[GroupedLevel], comparison: str, ratio: float, min_vol: float, stack_levels: int):
        """Same-price or diagonal imbalance + stacked."""
        if not grouped or ratio <= 0:
            return
        # sort by price ascending (already)
        for i in range(len(grouped)):
            cur = grouped[i]
            if cur.buy_volume < min_vol and cur.sell_volume < min_vol:
                continue
            # same-price: compare buy vs sell at same level
            if comparison == "same_price":
                if cur.buy_volume > 0 and cur.sell_volume > 0:
                    if cur.buy_volume / max(cur.sell_volume, 1e-9) >= ratio:
                        cur.buy_imbalance = True
                    if cur.sell_volume / max(cur.buy_volume, 1e-9) >= ratio:
                        cur.sell_imbalance = True
            else:  # diagonal
                # diagonal 3:1 typical: compare buy at level i vs sell at i+1 etc
                # buy imbalance: buy[i] vs sell[i-1] (buy pressure above)
                # sell imbalance: sell[i] vs buy[i+1]
                if i > 0:
                    prev = grouped[i-1]
                    if cur.buy_volume > 0 and prev.sell_volume > 0:
                        if cur.buy_volume / max(prev.sell_volume, 1e-9) >= ratio:
                            cur.buy_imbalance = True
                if i < len(grouped)-1:
                    nxt = grouped[i+1]
                    if cur.sell_volume > 0 and nxt.buy_volume > 0:
                        if cur.sell_volume / max(nxt.buy_volume, 1e-9) >= ratio:
                            cur.sell_imbalance = True

        # stacked: consecutive same-side imbalances
        if stack_levels >= 2:
            # buy stacks
            count = 0
            for i in range(len(grouped)):
                if grouped[i].buy_imbalance:
                    count += 1
                else:
                    count = 0
                if count >= stack_levels:
                    for j in range(i - stack_levels + 1, i + 1):
                        grouped[j].buy_stack = True
            # sell stacks
            count = 0
            for i in range(len(grouped)-1, -1, -1):
                if grouped[i].sell_imbalance:
                    count += 1
                else:
                    count = 0
                if count >= stack_levels:
                    for j in range(i, i + stack_levels):
                        if j < len(grouped):
                            grouped[j].sell_stack = True

    def get_merged_grouped(self, symbol: str, candle_ts: int, tf_sec: int, tick_per_row: float, as_of_ms: int) -> Optional[MergedCache]:
        """Get merged+grouped levels for a candle (handles multi-minute merging + caching)."""
        if symbol not in self._merged_cache:
            self._merged_cache[symbol] = {}
        # cache key includes tf, tick, comparison, ratio, etc.
        # for simplicity, invalidate if version changed or settings differ
        cached = self._merged_cache[symbol].get(candle_ts)
        # compute composite version
        # for tf > 60, merge multiple 1m buckets
        buckets_needed = max(1, tf_sec // 60)
        footprints: List[CandleFootprint] = []
        composite_ver = 0
        total_vol = 0.0
        for i in range(buckets_needed):
            start = candle_ts + i * 60000
            fp = self._available(symbol, start, as_of_ms)
            if fp:
                footprints.append(fp)
                composite_ver += fp.version
                total_vol += fp.total_volume

        if not footprints:
            return None

        # check cache validity
        if cached and cached.composite_ver == composite_ver and cached.tick_per_row == tick_per_row and cached.timeframe_seconds == tf_sec and cached.comparison == self.comparison and cached.ratio == self.imbalance_ratio and cached.minimum_volume == self.imbalance_min_volume and cached.stack_levels == self.stacked_levels:
            return cached

        # merge footprints
        merged_levels: Dict[float, Level] = {}
        total_buy = 0.0
        total_sell = 0.0
        high = 0.0
        low = 0.0
        for fp in footprints:
            total_buy += fp.total_buy
            total_sell += fp.total_sell
            if high == 0 or fp.high_price > high:
                high = fp.high_price
            if low == 0 or (fp.low_price > 0 and fp.low_price < low):
                low = fp.low_price
            for lv in fp.levels:
                key = round(lv.price / 1e-9) * 1e-9
                if key not in merged_levels:
                    merged_levels[key] = Level(price=lv.price)
                ml = merged_levels[key]
                ml.buy_volume += lv.buy_volume
                ml.sell_volume += lv.sell_volume
                ml.total_volume += lv.total_volume
                ml.trade_count += lv.trade_count
                ml.delta += lv.delta

        # build temporary footprint for grouping
        tmp_fp = CandleFootprint(
            start_time=candle_ts,
            end_time=candle_ts + tf_sec * 1000,
            levels=list(merged_levels.values()),
            total_volume=total_buy + total_sell,
            total_buy=total_buy,
            total_sell=total_sell,
            delta=total_buy - total_sell,
            high_price=high,
            low_price=low,
            valid=True,
        )
        if tmp_fp.levels:
            poc_level = max(tmp_fp.levels, key=lambda x: x.total_volume)
            tmp_fp.poc = poc_level.price

        grouped = self.group_levels(tmp_fp, tick_per_row)
        # imbalance detection
        if self.show_imbalances:
            self._detect_imbalances(grouped, self.comparison, self.imbalance_ratio, self.imbalance_min_volume, self.stacked_levels)

        # check if any provisional
        provisional = any(fp.start_time in self._live.get(symbol, {}) for fp in footprints)
        observed = provisional

        cache_entry = MergedCache(
            levels=grouped,
            timeframe_seconds=tf_sec,
            comparison=self.comparison,
            ratio=self.imbalance_ratio,
            minimum_volume=self.imbalance_min_volume,
            stack_levels=self.stacked_levels,
            observed_trades=observed,
            provisional=provisional,
            tick_per_row=tick_per_row,
            composite_ver=composite_ver,
            total_volume=tmp_fp.total_volume,
            total_buy=total_buy,
            total_sell=total_sell,
            delta=tmp_fp.delta,
            high_price=high,
            low_price=low,
        )
        self._merged_cache[symbol][candle_ts] = cache_entry
        return cache_entry

    def candle_count(self, symbol: str) -> int:
        return len(self._data.get(symbol, {})) + len(self._live.get(symbol, {}))

    # API helpers
    def to_dict(self, symbol: str, start: int, end: int, tick_per_row: float = 0.0) -> dict:
        """Return footprints in time range for API."""
        out = []
        data = self._data.get(symbol, {})
        live = self._live.get(symbol, {})
        all_times = sorted(set(list(data.keys()) + list(live.keys())))
        for ts in all_times:
            if ts < start or ts >= end:
                continue
            fp = self.get_footprint(symbol, ts)
            if not fp or not fp.valid:
                continue
            grouped = self.group_levels(fp, tick_per_row)
            out.append({
                "start_time": fp.start_time,
                "end_time": fp.end_time,
                "total_volume": fp.total_volume,
                "total_buy": fp.total_buy,
                "total_sell": fp.total_sell,
                "delta": fp.delta,
                "poc": fp.poc,
                "high": fp.high_price,
                "low": fp.low_price,
                "levels": [
                    {
                        "price": g.price_mid,
                        "price_lo": g.price_lo,
                        "price_hi": g.price_hi,
                        "buy": g.buy_volume,
                        "sell": g.sell_volume,
                        "total": g.total_volume,
                        "delta": g.delta,
                        "is_poc": g.is_poc,
                        "buy_imbalance": g.buy_imbalance,
                        "sell_imbalance": g.sell_imbalance,
                        "buy_stack": g.buy_stack,
                        "sell_stack": g.sell_stack,
                    }
                    for g in grouped
                ],
                "provisional": fp.start_time in live,
            })
        return {"symbol": symbol, "footprints": out}
