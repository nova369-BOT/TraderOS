"""The persistent L2 book.

Price levels keep their last-seen size when they leave the transmitted range
and display that size until the level returns (S6): exchanges and feeds
transmit only N levels, and silently forgetting everything outside the range
produces the "flashing heatmap" artefact the reference product documents
against. Consequences, all enforced here:

- every event PATCHES the book — SNAPSHOT and DELTA differ only in intent
  (full transmitted state vs. change), never in erasure semantics;
- a level disappears only through an explicit size-0 update or a reset;
- the depth reset (S11) is an explicit ``reset()`` the caller schedules per
  trading session / interval, so cross-day state never contaminates today.

The book is tick-agnostic: it keys levels on their rounded price, so any
source's grid works without declaring a tick size.
"""

from __future__ import annotations

import math

from lse_terminal.contracts import DEPTH_SNAPSHOT, DepthEvent

# Prices key the dicts after this rounding: floats from one source are
# bit-stable through identical arithmetic, and 1e-9 is finer than any
# instrument's tick, so two prints of "the same level" always agree.
_PRICE_EPS = 1e-9


def price_key(price: float) -> float:
    return round(float(price) / _PRICE_EPS) * _PRICE_EPS


class DepthBook:
    """One symbol's persistent resting-liquidity state."""

    def __init__(self, symbol: str = "", active_levels: int | None = None):
        self.symbol = symbol
        # Active-range override (S6): when set, the UI-facing views expose
        # only this many levels around mid; the raw state keeps everything.
        self.active_levels = active_levels
        self._bids: dict[float, float] = {}
        self._asks: dict[float, float] = {}
        self.last_ts = 0.0
        self.events_applied = 0
        self.saw_snapshot = False

    # ── application ──────────────────────────────────────────────────────

    def apply(self, ev: DepthEvent) -> None:
        """Patch the book with one event. Levels not mentioned keep their
        last-seen size; size 0 removes the level."""
        for price, size in ev.bids:
            k = price_key(price)
            if size <= 0:
                self._bids.pop(k, None)
            else:
                self._bids[k] = float(size)
        for price, size in ev.asks:
            k = price_key(price)
            if size <= 0:
                self._asks.pop(k, None)
            else:
                self._asks[k] = float(size)
        self.last_ts = max(self.last_ts, float(ev.ts))
        self.events_applied += 1
        if ev.type == DEPTH_SNAPSHOT:
            self.saw_snapshot = True

    def apply_all(self, events) -> None:
        for ev in events:
            self.apply(ev)

    def reset(self) -> None:
        """Depth reset (S11): drop all last-seen state (session boundary)."""
        self._bids.clear()
        self._asks.clear()

    # ── views ────────────────────────────────────────────────────────────

    def best_bid(self) -> float | None:
        return max(self._bids) if self._bids else None

    def best_ask(self) -> float | None:
        return min(self._asks) if self._asks else None

    def mid(self) -> float | None:
        bb, ba = self.best_bid(), self.best_ask()
        if bb is None or ba is None:
            return bb if ba is None else ba
        return (bb + ba) / 2.0

    def spread(self) -> float | None:
        bb, ba = self.best_bid(), self.best_ask()
        return ba - bb if bb is not None and ba is not None else None

    def _active_bounds(self) -> tuple[float, float] | None:
        """The active-range override window, or None when it is off."""
        if not self.active_levels:
            return None
        bb, ba = self.best_bid(), self.best_ask()
        if bb is None and ba is None:
            return None
        # One-sided books centre the window on the side that exists.
        centre = self.mid() if bb is not None and ba is not None else (
            ba if bb is None else bb)
        # Boundaries fall halfway between ticks of the densest observed grid;
        # without a declared tick, keep n levels by rank instead — callers
        # wanting exact boundary lines get them from the ranked view below.
        return (centre, self.active_levels)

    def _ranked(self, side: dict[float, float], descending: bool,
                respect_active: bool) -> list[tuple[float, float]]:
        rows = sorted(side.items(), key=lambda kv: kv[0], reverse=descending)
        if respect_active and self.active_levels:
            rows = rows[: self.active_levels]
        return [(round(p, 9), s) for p, s in rows]

    def bids(self, respect_active: bool = True) -> list[tuple[float, float]]:
        """Bid levels (price, size), best first. Honours the active-range
        override unless the caller wants the raw persistent state."""
        return self._ranked(self._bids, True, respect_active)

    def asks(self, respect_active: bool = True) -> list[tuple[float, float]]:
        """Ask levels (price, size), best first."""
        return self._ranked(self._asks, False, respect_active)

    def raw_bids(self) -> dict[float, float]:
        """The full persistent bid state (grid finalization needs every
        level, not just the active window)."""
        return dict(self._bids)

    def raw_asks(self) -> dict[float, float]:
        return dict(self._asks)

    def snapshot(self) -> dict:
        """API/UI shape: the ladder plus BBO/spread context."""
        bb, ba = self.best_bid(), self.best_ask()
        return {
            "symbol": self.symbol,
            "ts": self.last_ts,
            "bids": self.bids(),
            "asks": self.asks(),
            "best_bid": bb,
            "best_ask": ba,
            "mid": self.mid(),
            "spread": self.spread(),
            "levels_bid": len(self._bids),
            "levels_ask": len(self._asks),
            "events_applied": self.events_applied,
        }

    # ── cumulative depth (the COB column) ────────────────────────────────

    def ladder(self, respect_active: bool = True) -> dict:
        """Per-level size plus running cumulative, for the COB column (S8)."""
        def cum(rows):
            out, total = [], 0.0
            for price, size in rows:
                total += size
                out.append({"price": price, "size": size,
                            "cumulative": round(total, 9)})
            return out
        return {"bids": cum(self.bids(respect_active)),
                "asks": cum(self.asks(respect_active)),
                "best_bid": self.best_bid(),
                "best_ask": self.best_ask(),
                "spread": self.spread()}
