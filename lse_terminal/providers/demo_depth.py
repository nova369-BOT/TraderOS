"""Deterministic synthetic L2 depth for the demo provider (F1, H3).

Role: fallback + development source only — clearly labelled DEMO, never the
first choice for a real symbol (plan §2.3 item 4). It is also the golden-
image fixture source: for a fixed start second the whole event stream
reproduces bit-for-bit on any machine (the seed hashes symbol + start).

The simulator scripts the four behaviours a liquidity heatmap must be able
to show, per the plan's demo spec: standing walls, iceberg refills (size
restored after hits), pulls on approach (spoof behaviour) and sweep-throughs.

Prices sit on the instrument's tick grid around a mid that either random-
walks (history mode) or adopts the provider's live tick price (live mode),
so in the pane the heat follows the same price the chart shows. Levels the
window leaves are NOT removed — the persistent book keeps their last-seen
size, exercising exactly the semantics of orderflow/book.py (S6).
"""

from __future__ import annotations

import math
import time
import zlib

import numpy as np

from lse_terminal.contracts import (
    DEPTH_DELTA,
    DEPTH_SNAPSHOT,
    TRADE_BUY,
    TRADE_SELL,
    DepthEvent,
    TradeEvent,
)

# Per-symbol depth character: (tick, levels per side, base size, vol multiplier).
DEPTH_CFG = {
    "DEMO:BTC":    (1.0,     60, 2.5,   1.0),
    "DEMO:SPX":    (0.25,    50, 40.0,  0.6),
    "DEMO:EURUSD": (0.00005, 50, 2.0e6, 0.5),
    "DEMO:AAPL":   (0.01,    50, 300.0, 0.9),
    "DEMO:GOLD":   (0.1,     50, 80.0,  0.7),
    "DEMO:VIX":    (0.05,    40, 150.0, 1.6),
}

# History requests coarsen beyond this many steps instead of simulating
# unbounded (a 6-hour pane at 1s columns).
MAX_HISTORY_STEPS = 21600


class DepthSim:
    """One symbol's scripted book. Deterministic per (symbol, start_ts)."""

    def __init__(self, provider, symbol: str, start_ts: float,
                 vol_scale: float, anchor_price: float | None = None,
                 live: bool = False, window_override: int | None = None):
        self.provider = provider
        self.symbol = symbol
        self.live = live
        tick, levels, base, _volmult_unused = DEPTH_CFG[symbol]
        self.tick = float(tick)
        self.window = int(window_override or levels)
        self.base = float(base)
        self.decay = self.window / 2.5
        self.vol_sigma = float(vol_scale)
        seed = zlib.crc32(f"{symbol}|depth|{int(start_ts)}".encode())
        self.rng = np.random.default_rng(seed)
        if anchor_price is None and provider is not None:
            anchor_price = provider._close_at(symbol, start_ts)
        self.mid = self._snap(float(anchor_price)) if anchor_price else 100.0
        self.ts = float(start_ts)

        self.bids: dict[int, float] = {}
        self.asks: dict[int, float] = {}
        self._fill_initial()

        # Scripted actors (fixed draw order keeps the stream reproducible).
        mid0 = self._idx(self.mid)
        self.walls = [
            {"side": "bid", "key": mid0 - int(self.rng.integers(10, 30)),
             "size": self.base * float(self.rng.uniform(6.0, 14.0))},
            {"side": "ask", "key": mid0 + int(self.rng.integers(10, 30)),
             "size": self.base * float(self.rng.uniform(6.0, 14.0))},
        ]
        self.iceberg = {
            "side": "bid" if self.rng.random() < 0.5 else "ask",
            "offset": int(self.rng.integers(1, 4)),
            "full": self.base * float(self.rng.uniform(4.0, 9.0)),
            "key": None,
        }
        self.iceberg["size"] = self.iceberg["full"]
        self.sweep_in = int(self.rng.integers(80, 160))

    # ── grid helpers ─────────────────────────────────────────────────────

    def _snap(self, price: float) -> float:
        return round(round(price / self.tick) * self.tick, 9)

    def _idx(self, price: float) -> int:
        return int(math.floor(price / self.tick + 1e-9))

    def _price(self, idx: int) -> float:
        return round(idx * self.tick, 9)

    def _profile(self, dist: int) -> float:
        """Resting-size profile: log-normal-ish mass decaying with distance
        from the touch (plan §2.3 demo spec)."""
        return self.base * math.exp(-max(1, dist) / self.decay)

    def _jitter(self) -> float:
        return float(self.rng.lognormal(0.0, 0.35))

    def _fill_initial(self) -> None:
        bb = self._idx(self.mid)
        ba = bb + 1
        for i in range(self.window):
            self.bids[bb - i] = self._profile(i + 1) * self._jitter()
            self.asks[ba + i] = self._profile(i + 1) * self._jitter()

    # ── events ───────────────────────────────────────────────────────────

    def snapshot(self, ts: float) -> DepthEvent:
        return DepthEvent(
            symbol=self.symbol, ts=float(ts), type=DEPTH_SNAPSHOT,
            bids=sorted(((self._price(k), s) for k, s in self.bids.items()),
                        key=lambda r: -r[0]),
            asks=sorted(((self._price(k), s) for k, s in self.asks.items())))

    def step(self, ts: float) -> tuple[DepthEvent, list]:
        """Advance one step; returns (delta event, trade prints)."""
        self.ts = float(ts)
        ch_b: dict[int, float] = {}
        ch_a: dict[int, float] = {}
        trades: list[TradeEvent] = []
        prev_mid = self.mid

        # 1. Price: adopt the provider's live tick when it moved (the pane's
        #    heat follows the chart price); otherwise walk on our own.
        adopted = False
        if self.live and self.provider is not None:
            last = self.provider._last.get(self.symbol)
            if last is not None and abs(last - self.mid) > self.tick * 0.5:
                self.mid = float(last)
                adopted = True
        if not adopted:
            drift = float(self.rng.normal(0.0, self.mid * self.vol_sigma / 60.0))
            self.mid = max(self.tick, self.mid + drift)
        bb = self._idx(self.mid)
        ba = bb + 1

        # 2. Sweep-through: an aggressive burst eats the near levels of one
        #    side and the mid jumps through them; the book rebuilds after.
        self.sweep_in -= 1
        if self.sweep_in <= 0:
            side_bid = self.rng.random() < 0.5
            k = int(self.rng.integers(4, 8))
            jump = int(self.rng.integers(2, 5))
            book, ch = (self.bids, ch_b) if side_bid else (self.asks, ch_a)
            for i in range(k):
                key = (bb - i) if side_bid else (ba + i)
                if key in book:
                    sz = book.pop(key)
                    ch[key] = 0.0
                    trades.append(TradeEvent(
                        symbol=self.symbol, ts=float(ts),
                        price=self._price(key), size=sz,
                        side=TRADE_SELL if side_bid else TRADE_BUY))
            self.mid += (-jump if side_bid else jump) * self.tick
            bb = self._idx(self.mid)
            ba = bb + 1
            self.sweep_in = int(self.rng.integers(80, 160))

        # 2b. Crossed levels: resting liquidity the new mid has walked
        #     through is filled — remove it (size 0) and print the
        #     aggression. Keeps the persistent book uncrossed and turns
        #     every price move into tape for the dots overlay.
        for k in sorted((k for k in self.bids if k >= ba), reverse=True):
            sz = self.bids.pop(k)
            ch_b[k] = 0.0
            if len(trades) < 12:
                trades.append(TradeEvent(symbol=self.symbol, ts=float(ts),
                                         price=self._price(k), size=sz,
                                         side=TRADE_SELL))
        for k in sorted(k for k in self.asks if k <= bb):
            sz = self.asks.pop(k)
            ch_a[k] = 0.0
            if len(trades) < 12:
                trades.append(TradeEvent(symbol=self.symbol, ts=float(ts),
                                         price=self._price(k), size=sz,
                                         side=TRADE_BUY))

        # 3. Window maintenance: levels entering the transmitted window are
        #    created; levels leaving it are simply not mentioned (persistent
        #    book keeps their last-seen size — S6).
        for i in range(self.window):
            kb = bb - i
            if kb not in self.bids:
                s = self._profile(i + 1) * self._jitter()
                self.bids[kb] = s
                ch_b[kb] = s
            ka = ba + i
            if ka not in self.asks:
                s = self._profile(i + 1) * self._jitter()
                self.asks[ka] = s
                ch_a[ka] = s

        # 4. Jitter a slice of resting levels (natural churn).
        for book, ch, touch, bid_side in (
                (self.bids, ch_b, bb, True), (self.asks, ch_a, ba, False)):
            keys = [k for k in book if k not in ch]
            if not keys:
                continue
            n = min(max(2, len(keys) // 12), len(keys))
            pick = self.rng.choice(np.asarray(keys, dtype=np.int64),
                                   size=n, replace=False)
            for k in pick:
                k = int(k)
                d = (touch - k + 1) if bid_side else (k - touch + 1)
                s = self._profile(d) * self._jitter()
                book[k] = s
                ch[k] = s

        # 5. Standing walls: fixed-price large size; respawns once the mid
        #    has drifted it out of the window so the demo always shows some.
        for w in self.walls:
            bid_side = w["side"] == "bid"
            book, ch, touch = ((self.bids, ch_b, bb) if bid_side
                               else (self.asks, ch_a, ba))
            if abs(w["key"] - touch) > self.window:
                off = int(self.rng.integers(10, 30))
                w["key"] = touch - off if bid_side else touch + off
                w["size"] = self.base * float(self.rng.uniform(6.0, 14.0))
            on_side = (w["key"] <= bb) if bid_side else (w["key"] >= ba)
            if on_side and book.get(w["key"]) != w["size"]:
                book[w["key"]] = w["size"]
                ch[w["key"]] = w["size"]

        # 6. Iceberg: rests near the touch, gets hit, refills to full size.
        ib = self.iceberg
        bid_side = ib["side"] == "bid"
        book, ch, touch = ((self.bids, ch_b, bb) if bid_side
                           else (self.asks, ch_a, ba))
        want = touch - ib["offset"] if bid_side else touch + ib["offset"]
        if ib["key"] is not None and ib["key"] != want and ib["key"] in book:
            book.pop(ib["key"], None)
            ch[ib["key"]] = 0.0
        ib["key"] = want
        book[want] = ib["size"]
        ch[want] = ib["size"]
        if self.rng.random() < 0.05:
            hit = ib["size"] * float(self.rng.uniform(0.2, 0.45))
            ib["size"] = max(0.0, ib["size"] - hit)
            ch[want] = ib["size"]
            trades.append(TradeEvent(
                symbol=self.symbol, ts=float(ts), price=self._price(want),
                size=hit, side=TRADE_SELL if bid_side else TRADE_BUY))
            if ib["size"] < ib["full"] * 0.15:
                ib["size"] = ib["full"]  # the refill
                ch[want] = ib["size"]

        # 7. Pulls on approach: near-touch levels on the approached side
        #    halve as price comes at them (spoof behaviour).
        if self.mid > prev_mid + self.tick * 0.25:
            for k in (ba, ba + 1):
                if k in self.asks and k not in ch_a:
                    self.asks[k] *= 0.5
                    ch_a[k] = self.asks[k]
        elif self.mid < prev_mid - self.tick * 0.25:
            for k in (bb, bb - 1):
                if k in self.bids and k not in ch_b:
                    self.bids[k] *= 0.5
                    ch_b[k] = self.bids[k]

        # 8. A baseline print at the touch most steps (dots material).
        if self.rng.random() < 0.55:
            buy = self.rng.random() < 0.5
            key = ba if buy else bb
            trades.append(TradeEvent(
                symbol=self.symbol, ts=float(ts), price=self._price(key),
                size=self._profile(1) * self._jitter() *
                float(self.rng.uniform(0.5, 1.5)),
                side=TRADE_BUY if buy else TRADE_SELL))

        if self.live and self.provider is not None:
            self.provider._last[self.symbol] = self.mid

        ev = DepthEvent(
            symbol=self.symbol, ts=float(ts), type=DEPTH_DELTA,
            bids=sorted(((self._price(k), s) for k, s in ch_b.items()),
                        key=lambda r: -r[0]),
            asks=sorted(((self._price(k), s) for k, s in ch_a.items())))
        return ev, trades
