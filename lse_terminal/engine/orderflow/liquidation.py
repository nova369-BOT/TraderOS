"""Liquidation heatmap — modelled Field + real levels (EdgeDepth port).

Port of src/core/liquidation_heatmap_manager.h and src/rendering/liq_field_*:
- Field: dense liquidation estimate computed client-side from candles (any feed)
- Levels: real liquidation levels from Binance forceOrder stream (ground truth)
- For Hyperliquid/Coinbase: large trades as liquidation proxy

Uses Binance/Coinbase/Hyperliquid as L2/L3 data.

Field model: for each candle, estimate liquidation bands above/below based on
volatility (ATR proxy) and price. Intensity = volume * volatility factor.
This mirrors EdgeDepth's Field which is computed client-side from candles.

Real levels: from Binance !forceOrder@arr stream (if available) or from
trade tape large prints (> $100k notional).
"""

from __future__ import annotations

import math
import time
from collections import deque
from dataclasses import dataclass, field
from typing import Dict, List, Optional


@dataclass
class LiqLevel:
    price: float
    side: str  # long | short
    notional_usd: float
    timestamp_ms: int
    leverage: str = "unknown"  # 5x, 10x, 25x, 50x, 75x, 100x
    type: str = "estimated"  # estimated | real


@dataclass
class LiqBand:
    price_mid: float
    long_usd: float = 0.0
    short_usd: float = 0.0
    intensity: float = 0.0
    reach_prob: float = 0.0
    cascade_prob: float = 0.0
    long_stop_density: float = 0.0
    short_stop_density: float = 0.0


@dataclass
class LiqField:
    timestamp_ms: int
    mark_price: float
    bands: List[LiqBand] = field(default_factory=list)
    total_long_risk: float = 0.0
    total_short_risk: float = 0.0
    net_bias: float = 0.0
    band_width_pct: float = 0.0005  # 0.05% per band like EdgeDepth
    flow_intensity: float = 0.0
    levels: List[LiqLevel] = field(default_factory=list)  # real levels


@dataclass
class LiqRail:
    above: bool
    price: float
    formed_ms: int
    consumed_ms: int = 0  # 0 = pending
    peak_usd: float = 0.0
    side: str = "long"  # long | short


class LiquidationManager:
    """Liquidation heatmap field + real levels."""

    def __init__(self, max_fields: int = 100, max_levels: int = 1000):
        self.max_fields = max_fields
        self.max_levels = max_levels
        self._fields: Dict[str, deque] = {}  # symbol -> deque of LiqField
        self._levels: Dict[str, deque] = {}  # symbol -> deque of LiqLevel (real)
        self._rails: Dict[str, List[LiqRail]] = {}  # symbol -> rails
        self.band_width_pct: float = 0.0005  # 0.05% like EdgeDepth
        self.band_count: int = 800  # like EdgeDepth

    def clear(self, symbol: str):
        self._fields.pop(symbol, None)
        self._levels.pop(symbol, None)
        self._rails.pop(symbol, None)

    def clear_all(self):
        self._fields.clear()
        self._levels.clear()
        self._rails.clear()

    def _ensure(self, symbol: str):
        if symbol not in self._fields:
            self._fields[symbol] = deque(maxlen=self.max_fields)
            self._levels[symbol] = deque(maxlen=self.max_levels)
            self._rails[symbol] = []

    def on_liquidation(self, symbol: str, price: float, qty: float, side: str, notional_usd: float, timestamp_ms: int = None, leverage: str = "unknown"):
        """Real liquidation from Binance forceOrder or large trade proxy."""
        self._ensure(symbol)
        if timestamp_ms is None:
            timestamp_ms = int(time.time() * 1000)
        level = LiqLevel(
            price=price,
            side=side,
            notional_usd=notional_usd,
            timestamp_ms=timestamp_ms,
            leverage=leverage,
            type="real",
        )
        self._levels[symbol].append(level)

        # rail tracking
        # formed = first time level lit, consumed = wick-through
        # For simplicity, create rail per liquidation
        above = price > 0 and side == "short"  # short liq above mark
        # Actually above = price > mark, but we don't have mark here, use side
        rail = LiqRail(
            above=above,
            price=price,
            formed_ms=timestamp_ms,
            peak_usd=notional_usd,
            side=side,
        )
        self._rails[symbol].append(rail)
        # cap rails
        if len(self._rails[symbol]) > 500:
            self._rails[symbol] = self._rails[symbol][-500:]

    def build_field_from_candles(self, symbol: str, candles: List[dict], mark_price: float = None) -> Optional[LiqField]:
        """Build liquidation field from candles (modelled).

        candles: list of {ts, open, high, low, close, volume} or DataFrame rows
        mark_price: current mark, if None use last close
        """
        self._ensure(symbol)
        if not candles:
            return None

        # get mark
        if mark_price is None:
            last = candles[-1]
            if isinstance(last, dict):
                mark_price = float(last.get("close", last.get("c", 0)))
            else:
                # assume list [ts, o, h, l, c, v]
                try:
                    mark_price = float(last[4])
                except:
                    mark_price = 0.0
        if mark_price <= 0:
            return None

        # compute ATR proxy from recent candles
        # use high-low average
        recent = candles[-20:]
        tr_sum = 0.0
        for c in recent:
            if isinstance(c, dict):
                h = float(c.get("high", c.get("h", 0)))
                l = float(c.get("low", c.get("l", 0)))
            else:
                try:
                    h = float(c[2])
                    l = float(c[3])
                except:
                    continue
            tr_sum += h - l
        atr = tr_sum / len(recent) if recent else mark_price * 0.01
        if atr <= 0:
            atr = mark_price * 0.01

        # band width = 0.05% * mark like EdgeDepth
        bw_pct = self.band_width_pct
        band_width = mark_price * bw_pct
        if band_width <= 0:
            band_width = atr / 10.0

        # build bands 400 above, 400 below (800 total like EdgeDepth)
        bands: List[LiqBand] = []
        total_long = 0.0
        total_short = 0.0

        # volume factor
        vol_sum = 0.0
        for c in recent:
            if isinstance(c, dict):
                v = float(c.get("volume", c.get("v", 0)))
            else:
                try:
                    v = float(c[5])
                except:
                    v = 0.0
            vol_sum += v
        avg_vol = vol_sum / len(recent) if recent else 1.0

        for i in range(-self.band_count // 2, self.band_count // 2):
            if i == 0:
                continue
            price_mid = mark_price + i * band_width
            if price_mid <= 0:
                continue
            # distance from mark
            dist_pct = abs(price_mid - mark_price) / mark_price
            # liquidation intensity decays with distance, increases with vol and atr
            # model: more liquidations near recent high/low extremes
            # use normal distribution around mark with sigma = atr*2
            sigma = atr * 2.0
            if sigma <= 0:
                sigma = mark_price * 0.02
            # gaussian
            x = (price_mid - mark_price) / sigma
            intensity = math.exp(-0.5 * x * x) * avg_vol

            # split long/short: below mark = long liq, above = short liq
            if price_mid < mark_price:
                long_usd = intensity * (1.0 + dist_pct * 2.0)  # more long liq below
                short_usd = intensity * 0.3
            else:
                short_usd = intensity * (1.0 + dist_pct * 2.0)
                long_usd = intensity * 0.3

            # reach_prob and cascade_prob (ML proxies)
            reach_prob = math.exp(-dist_pct * 10.0)  # closer = higher prob
            cascade_prob = reach_prob * 0.5 * (1.0 + intensity / (avg_vol + 1e-9))

            # stop density (more stops near round numbers)
            # round number = price ending with 00, 50, etc
            is_round = abs(price_mid % 100) < band_width or abs(price_mid % 50) < band_width
            long_stop = intensity * 0.1 * (2.0 if is_round else 1.0) if price_mid < mark_price else 0.0
            short_stop = intensity * 0.1 * (2.0 if is_round else 1.0) if price_mid > mark_price else 0.0

            band = LiqBand(
                price_mid=price_mid,
                long_usd=long_usd,
                short_usd=short_usd,
                intensity=intensity,
                reach_prob=reach_prob,
                cascade_prob=cascade_prob,
                long_stop_density=long_stop,
                short_stop_density=short_stop,
            )
            bands.append(band)
            total_long += long_usd
            total_short += short_usd

        # sort by price
        bands.sort(key=lambda b: b.price_mid)

        # flow intensity: based on recent volume vs avg
        flow_intensity = min(1.0, vol_sum / (avg_vol * 20.0 + 1e-9)) if avg_vol > 0 else 0.0

        field_obj = LiqField(
            timestamp_ms=int(time.time() * 1000),
            mark_price=mark_price,
            bands=bands,
            total_long_risk=total_long,
            total_short_risk=total_short,
            net_bias=(total_short - total_long) / (total_long + total_short + 1e-9),
            band_width_pct=bw_pct,
            flow_intensity=flow_intensity,
            levels=list(self._levels[symbol])[-20:],  # recent real levels
        )
        self._fields[symbol].append(field_obj)
        return field_obj

    def get_latest_field(self, symbol: str) -> Optional[LiqField]:
        self._ensure(symbol)
        if not self._fields[symbol]:
            return None
        return self._fields[symbol][-1]

    def get_levels(self, symbol: str, limit: int = 100) -> List[LiqLevel]:
        self._ensure(symbol)
        return list(self._levels[symbol])[-limit:]

    def get_rails(self, symbol: str, limit: int = 200) -> List[LiqRail]:
        self._ensure(symbol)
        return self._rails[symbol][-limit:]

    def to_dict(self, symbol: str) -> dict:
        self._ensure(symbol)
        field_obj = self.get_latest_field(symbol)
        if not field_obj:
            return {"symbol": symbol, "valid": False, "bands": [], "levels": [], "rails": []}

        return {
            "symbol": symbol,
            "valid": True,
            "timestamp_ms": field_obj.timestamp_ms,
            "mark_price": field_obj.mark_price,
            "total_long_risk": field_obj.total_long_risk,
            "total_short_risk": field_obj.total_short_risk,
            "net_bias": field_obj.net_bias,
            "band_width_pct": field_obj.band_width_pct,
            "flow_intensity": field_obj.flow_intensity,
            "bands": [
                {
                    "price_mid": b.price_mid,
                    "long_usd": b.long_usd,
                    "short_usd": b.short_usd,
                    "intensity": b.intensity,
                    "reach_prob": b.reach_prob,
                    "cascade_prob": b.cascade_prob,
                    "long_stop_density": b.long_stop_density,
                    "short_stop_density": b.short_stop_density,
                }
                for b in field_obj.bands
            ],
            "levels": [
                {
                    "price": lv.price,
                    "side": lv.side,
                    "notional_usd": lv.notional_usd,
                    "timestamp_ms": lv.timestamp_ms,
                    "leverage": lv.leverage,
                    "type": lv.type,
                }
                for lv in self.get_levels(symbol, 100)
            ],
            "rails": [
                {
                    "above": r.above,
                    "price": r.price,
                    "formed_ms": r.formed_ms,
                    "consumed_ms": r.consumed_ms,
                    "peak_usd": r.peak_usd,
                    "side": r.side,
                }
                for r in self.get_rails(symbol, 200)
            ],
        }
