"""TPO — Time Price Opportunity / Market Profile (EdgeDepth port).

Port of src/core/tpo_manager.h: client-side computation from 30m candle data.
Each session = 24h (00:00-00:00 UTC). Sessions built by iterating 30m candles
and recording which price rows each candle touches.

Ultra-fast: O(n log n) build, no allocation in hot path, cached.
"""

from __future__ import annotations

import math
from dataclasses import dataclass, field
from typing import Dict, List, Optional


@dataclass
class TPOBlock:
    period_idx: int = 0


@dataclass
class TPORow:
    price_lo: float = 0.0
    price_hi: float = 0.0
    row_idx: int = 0
    blocks: List[TPOBlock] = field(default_factory=list)
    is_poc: bool = False
    is_value_area: bool = False
    is_single_print: bool = False
    is_initial_balance: bool = False
    block_count: int = 0


@dataclass
class TPOSession:
    session_start_ms: int = 0
    session_end_ms: int = 0
    rows: List[TPORow] = field(default_factory=list)
    total_periods: int = 0
    total_blocks: int = 0
    max_block_count: int = 0
    poc_price: float = 0.0
    poc_row_idx: int = -1
    vah: float = 0.0
    val: float = 0.0
    session_high: float = 0.0
    session_low: float = 0.0
    ib_high: float = 0.0
    ib_low: float = 0.0
    has_poor_high: bool = False
    has_poor_low: bool = False
    tick_per_row: float = 0.0
    expanded: bool = False


class TPOManager:
    """TPO market profile from 30m candles."""

    def __init__(self):
        self._data: Dict[str, List[TPOSession]] = {}
        self.session_period_hours: int = 24
        self.ticks_per_row_setting: int = 0
        self.value_area_pct: float = 0.70
        self.show_poc_ray: bool = True
        self.show_vah_val_rays: bool = True
        self.show_single_prints: bool = True
        self.show_poor_high_low: bool = True
        self.show_initial_balance: bool = False
        self.show_session_header: bool = True
        self.highlight_start_end: bool = True
        self.profile_spacing: int = 1
        self._last_build_hash: Dict[str, int] = {}

    def clear(self, symbol: str):
        self._data.pop(symbol, None)
        self._last_build_hash.pop(symbol, None)

    def clear_all(self):
        self._data.clear()
        self._last_build_hash.clear()

    def has_data(self, symbol: str) -> bool:
        return symbol in self._data and len(self._data[symbol]) > 0

    def get_sessions(self, symbol: str) -> Optional[List[TPOSession]]:
        return self._data.get(symbol)

    def toggle_expand(self, symbol: str, session_idx: int):
        if symbol in self._data and 0 <= session_idx < len(self._data[symbol]):
            self._data[symbol][session_idx].expanded = not self._data[symbol][session_idx].expanded

    def build_sessions(self, symbol: str, timestamps_ms: List[int], highs: List[float], lows: List[float], timeframe_sec: int = 1800, tick_per_row: float = 0.0):
        """Build sessions from 30m candle data covering visible range.

        timestamps_ms: candle start ms, sorted asc
        highs, lows: per candle
        timeframe_sec: should be 1800 for 30m, but supports any dividing 30m
        tick_per_row: price height per row, 0 = auto
        """
        if not timestamps_ms or not highs or not lows:
            self._data[symbol] = []
            return

        # hash for debounce
        h = hash((tuple(timestamps_ms[-10:]), tuple(highs[-10:]), tuple(lows[-10:]), timeframe_sec, tick_per_row))
        if self._last_build_hash.get(symbol) == h and symbol in self._data:
            return
        self._last_build_hash[symbol] = h

        # group candles into sessions (24h UTC)
        session_ms = self.session_period_hours * 3600 * 1000
        sessions_dict: Dict[int, List[int]] = {}  # session_start -> list of candle indices
        for idx, ts in enumerate(timestamps_ms):
            sess_start = (ts // session_ms) * session_ms
            if sess_start not in sessions_dict:
                sessions_dict[sess_start] = []
            sessions_dict[sess_start].append(idx)

        sessions: List[TPOSession] = []
        for sess_start in sorted(sessions_dict.keys()):
            indices = sessions_dict[sess_start]
            if not indices:
                continue
            sess_end = sess_start + session_ms
            # collect highs/lows for this session
            sess_highs = [highs[i] for i in indices]
            sess_lows = [lows[i] for i in indices]
            sess_tss = [timestamps_ms[i] for i in indices]
            if not sess_highs:
                continue

            s_high = max(sess_highs)
            s_low = min(sess_lows)
            if s_high <= s_low:
                continue

            # auto tick_per_row
            if tick_per_row <= 0:
                # 1/40 of range or 0.5% etc
                prange = s_high - s_low
                tpr = prange / 40.0
                # round to nice number
                # for crypto, keep reasonable
                if tpr > 0:
                    # find magnitude
                    mag = 10 ** math.floor(math.log10(tpr))
                    tpr = round(tpr / mag) * mag
                    if tpr == 0:
                        tpr = mag
                else:
                    tpr = 1.0
            else:
                tpr = tick_per_row

            # build rows
            # price rows from s_low to s_high
            row_count = max(1, int(math.ceil((s_high - s_low) / tpr)))
            # cap row count to avoid explosion
            if row_count > 500:
                tpr = (s_high - s_low) / 500.0
                row_count = 500

            rows: List[TPORow] = []
            for r_idx in range(row_count):
                lo = s_low + r_idx * tpr
                hi = lo + tpr
                rows.append(TPORow(price_lo=lo, price_hi=hi, row_idx=r_idx))

            # for each candle, mark rows it touches
            for period_idx, c_idx in enumerate(indices):
                ch = highs[c_idx]
                cl = lows[c_idx]
                # find rows touched
                start_row = max(0, int(math.floor((cl - s_low) / tpr)))
                end_row = min(row_count - 1, int(math.floor((ch - s_low) / tpr)))
                for r in range(start_row, end_row + 1):
                    rows[r].blocks.append(TPOBlock(period_idx=period_idx))
                    rows[r].block_count = len(rows[r].blocks)

            # compute POC, VA, single prints, etc.
            sess = TPOSession(
                session_start_ms=sess_start,
                session_end_ms=sess_end,
                rows=rows,
                total_periods=len(indices),
                tick_per_row=tpr,
                session_high=s_high,
                session_low=s_low,
            )
            # POC = row with max block_count
            if rows:
                max_row = max(rows, key=lambda r: r.block_count)
                sess.poc_price = (max_row.price_lo + max_row.price_hi) / 2.0
                sess.poc_row_idx = max_row.row_idx
                max_row.is_poc = True
                sess.max_block_count = max_row.block_count
                sess.total_blocks = sum(r.block_count for r in rows)

                # Value Area: 70% of total blocks around POC
                # Expand from POC outward
                target = sess.total_blocks * self.value_area_pct
                # sort rows by distance to POC, then by block_count descending?
                # Standard: start at POC, add rows with most blocks outward
                # Simplified: sort by block_count descending, take 70%
                sorted_rows = sorted(rows, key=lambda r: r.block_count, reverse=True)
                va_vol = 0
                va_prices = []
                for r in sorted_rows:
                    va_vol += r.block_count
                    va_prices.append((r.price_lo + r.price_hi) / 2.0)
                    if va_vol >= target:
                        break
                if va_prices:
                    sess.vah = max(va_prices)
                    sess.val = min(va_prices)
                    for r in rows:
                        mid = (r.price_lo + r.price_hi) / 2.0
                        if sess.val <= mid <= sess.vah:
                            r.is_value_area = True

                # Single prints: rows with exactly 1 block that are not at edge? Actually 1 block anywhere
                for r in rows:
                    if r.block_count == 1:
                        r.is_single_print = True

                # Poor high/low: top/bottom row has >=2 blocks
                if rows[0].block_count >= 2:
                    sess.has_poor_low = True
                if rows[-1].block_count >= 2:
                    sess.has_poor_high = True

                # Initial Balance: first 2 periods high/low
                if len(indices) >= 2:
                    ib_high = max(highs[indices[0]], highs[indices[1]]) if len(indices) > 1 else highs[indices[0]]
                    ib_low = min(lows[indices[0]], lows[indices[1]]) if len(indices) > 1 else lows[indices[0]]
                    sess.ib_high = ib_high
                    sess.ib_low = ib_low
                    # mark IB rows
                    ib_start = max(0, int(math.floor((ib_low - s_low) / tpr)))
                    ib_end = min(row_count - 1, int(math.floor((ib_high - s_low) / tpr)))
                    for r in range(ib_start, ib_end + 1):
                        rows[r].is_initial_balance = True

            sessions.append(sess)

        self._data[symbol] = sessions

    def to_dict(self, symbol: str) -> dict:
        sess_list = self._data.get(symbol, [])
        if not sess_list:
            return {"symbol": symbol, "sessions": []}
        return {
            "symbol": symbol,
            "sessions": [
                {
                    "session_start": s.session_start_ms,
                    "session_end": s.session_end_ms,
                    "poc": s.poc_price,
                    "vah": s.vah,
                    "val": s.val,
                    "high": s.session_high,
                    "low": s.session_low,
                    "ib_high": s.ib_high,
                    "ib_low": s.ib_low,
                    "has_poor_high": s.has_poor_high,
                    "has_poor_low": s.has_poor_low,
                    "tick_per_row": s.tick_per_row,
                    "total_periods": s.total_periods,
                    "total_blocks": s.total_blocks,
                    "max_block_count": s.max_block_count,
                    "rows": [
                        {
                            "price_lo": r.price_lo,
                            "price_hi": r.price_hi,
                            "mid": (r.price_lo + r.price_hi) / 2.0,
                            "block_count": r.block_count,
                            "is_poc": r.is_poc,
                            "is_value_area": r.is_value_area,
                            "is_single_print": r.is_single_print,
                            "is_initial_balance": r.is_initial_balance,
                            "periods": [b.period_idx for b in r.blocks],
                        }
                        for r in s.rows
                    ],
                }
                for s in sess_list
            ],
        }
