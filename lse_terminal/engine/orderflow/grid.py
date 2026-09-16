"""DepthGrid: the time×price liquidity field the heatmap renders (S1).

Columns are fixed-width time slices (default 1 s); a column's cells are the
LAST size observed for each price inside the window — for levels an event
never touches, the book's carried-forward state, which is what turns
persistent walls into continuous horizontal bands instead of dotted noise.

Storage is a ring buffer of finalized columns (numpy key/size pairs, dense
only where liquidity exists) plus the live column's overlay dict, so memory
is bounded by ``max_columns`` no matter how long the pane runs (plan §5.2).

Determinism gate (H2): the grid is a pure fold over the event stream —
same events in same order ⇒ bit-identical columns — which is also what
makes recorded sessions replayable (H8).
"""

from __future__ import annotations

from collections import deque

import numpy as np

from lse_terminal.engine.orderflow.book import price_key


class DepthGrid:
    def __init__(self, column_ms: int = 1000, max_columns: int = 14400,
                 max_state: int = 4096):
        if column_ms <= 0:
            raise ValueError("column_ms must be positive")
        self.column_ms = int(column_ms)
        self.max_columns = int(max_columns)
        self.max_state = int(max_state)
        # Finalized columns: (column_start_ms, price keys, sizes), ring-bounded.
        self._cols: deque = deque(maxlen=self.max_columns)
        # Carried-forward book state (price key -> last-seen size).
        self._state: dict[float, float] = {}
        # When each carried level was last touched (bounds state growth).
        self._state_ts: dict[float, float] = {}
        # The in-flight column's overlay (last value wins inside the window).
        self._cur: dict[float, float] = {}
        self._cur_ts: int | None = None  # column start, epoch ms
        self.events = 0

    # ── ingestion ────────────────────────────────────────────────────────

    def column_start(self, ts_ms: int) -> int:
        return (int(ts_ms) // self.column_ms) * self.column_ms

    def apply_event(self, ev) -> None:
        """Fold one DepthEvent into the grid (out-of-order events are
        dropped: history arrives in order and live deltas never beat the
        column they belong to)."""
        ts_ms = int(ev.ts * 1000)
        self._roll(ts_ms)
        for price, size in (*ev.bids, *ev.asks):
            self._cur[price_key(price)] = float(size)
        self.events += 1

    def ingest(self, events) -> None:
        for ev in events:
            self.apply_event(ev)

    def _roll(self, ts_ms: int) -> None:
        cs = self.column_start(ts_ms)
        if self._cur_ts is None:
            self._cur_ts = cs
            return
        # Every boundary crossed finalizes a column; quiet gaps finalize
        # with the carried state so resting liquidity paints continuously.
        while cs > self._cur_ts:
            self._finalize()
            self._cur_ts += self.column_ms

    def _finalize(self) -> None:
        for k, s in self._cur.items():
            if s <= 0:
                self._state.pop(k, None)
                self._state_ts.pop(k, None)
            else:
                self._state[k] = s
                self._state_ts[k] = float(self._cur_ts)
        self._cur.clear()
        if len(self._state) > self.max_state:
            # Bound carried state: drop the stalest levels first (levels the
            # feed has not touched in the longest cannot be trusted anyway).
            keep = sorted(self._state_ts, key=self._state_ts.get,
                          reverse=True)[: self.max_state]
            keepset = set(keep)
            self._state = {k: v for k, v in self._state.items() if k in keepset}
            self._state_ts = {k: v for k, v in self._state_ts.items()
                              if k in keepset}
        if self._state:
            keys = np.array(sorted(self._state), dtype=np.float64)
            sizes = np.array([self._state[k] for k in keys], dtype=np.float64)
        else:
            keys = np.empty(0, dtype=np.float64)
            sizes = np.empty(0, dtype=np.float64)
        self._cols.append((self._cur_ts, keys, sizes))

    def flush(self) -> None:
        """Finalize the in-flight column (end of stream / recording stop)."""
        if self._cur_ts is not None:
            self._finalize()
            self._cur_ts += self.column_ms

    # ── queries ──────────────────────────────────────────────────────────

    def _columns(self, include_live: bool) -> list:
        cols = list(self._cols)
        if include_live and (self._cur or self._state) and self._cur_ts is not None:
            merged = dict(self._state)
            for k, s in self._cur.items():
                if s <= 0:
                    merged.pop(k, None)
                else:
                    merged[k] = s
            if merged:
                keys = np.array(sorted(merged), dtype=np.float64)
                sizes = np.array([merged[k] for k in keys], dtype=np.float64)
                cols.append((self._cur_ts, keys, sizes))
        return cols

    def viewport(self, from_ms: int | None = None, to_ms: int | None = None,
                 lo: float | None = None, hi: float | None = None,
                 include_live: bool = True) -> dict:
        """Dense matrix over a time/price window.

        Returns ``{"columns": [start_ms...], "prices": [...], "cells":
        [[size per price] per column]}`` with 0.0 where a level is absent.
        None bounds mean "everything the ring holds"."""
        cols = [c for c in self._columns(include_live)
                if (from_ms is None or c[0] >= from_ms)
                and (to_ms is None or c[0] < to_ms)]
        if not cols:
            return {"columns": [], "prices": [], "cells": []}
        # Row set: union of keys inside the price window, in ascending order.
        keyset: set[float] = set()
        for _, keys, _ in cols:
            for k in keys:
                if (lo is None or k >= lo) and (hi is None or k <= hi):
                    keyset.add(float(k))
        prices = sorted(keyset)
        index = {p: i for i, p in enumerate(prices)}
        cells = np.zeros((len(cols), len(prices)), dtype=np.float64)
        for c, (_, keys, sizes) in enumerate(cols):
            for k, s in zip(keys, sizes):
                i = index.get(float(k))
                if i is not None:
                    cells[c, i] = s
        return {"columns": [c[0] for c in cols], "prices": prices,
                "cells": cells.tolist()}

    @property
    def column_count(self) -> int:
        return len(self._cols)

    def fingerprint(self) -> tuple:
        """Deterministic digest of all finalized columns — the H8
        replay-readiness check compares these between two rebuilds."""
        import hashlib
        h = hashlib.sha256()
        for start, keys, sizes in self._cols:
            h.update(start.to_bytes(8, "little", signed=False))
            h.update(keys.tobytes())
            h.update(sizes.tobytes())
        return h.hexdigest()
