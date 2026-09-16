"""Session recording (S10): live depth + trades → parquet in MY DATA.

A recording is one folder-free set of parquet part files plus a JSON sidecar
holding the session metadata (list/delete without opening the data files).
Parts rotate when a soft size limit is crossed so a forgotten recording can
never grow one file past what pyarrow readers handle comfortably.

Replay-readiness invariant (H8): the parquet round-trips events losslessly
in write order, so rebuilding a DepthGrid from a recorded session is
bit-identical to the live grid that produced it. That invariant is what
makes Phase-2 replay and depth-based backtests honest later.
"""

from __future__ import annotations

import json
import math
import os
import re
import time
from pathlib import Path

import pyarrow as pa
import pyarrow.parquet as pq

from lse_terminal.contracts import (
    DEPTH_SNAPSHOT,
    DepthEvent,
    TradeEvent,
)

SCHEMA = pa.schema([
    ("kind", pa.string()),                       # "D" depth / "T" trade
    ("ts", pa.float64()),
    ("depth_type", pa.string()),                 # SNAPSHOT/DELTA (depth rows)
    ("side", pa.string()),                       # aggressor side (trade rows)
    ("price", pa.float64()),                     # trade price (NaN on depth)
    ("size", pa.float64()),                      # trade size (NaN on depth)
    ("bids_px", pa.list_(pa.float64())),
    ("bids_sz", pa.list_(pa.float64())),
    ("asks_px", pa.list_(pa.float64())),
    ("asks_sz", pa.list_(pa.float64())),
])

_SLUG_RE = re.compile(r"[^A-Za-z0-9._-]+")


def _slug(symbol: str) -> str:
    return _SLUG_RE.sub("_", symbol).strip("_")[:32] or "symbol"


class SessionRecorder:
    """Records depth/trade events into timestamped parquet sessions."""

    def __init__(self, root: Path, flush_rows: int = 4096):
        self.root = Path(root)
        self.flush_rows = int(flush_rows)
        self._open: dict[str, dict] = {}  # id -> live session state

    # ── metadata sidecar ─────────────────────────────────────────────────

    def _meta_path(self) -> Path:
        return self.root / "sessions.json"

    def _load_meta(self) -> dict:
        try:
            doc = json.loads(self._meta_path().read_text())
        except (OSError, json.JSONDecodeError):
            doc = {}
        return doc if isinstance(doc, dict) else {}

    def _save_meta(self, doc: dict) -> None:
        self.root.mkdir(parents=True, exist_ok=True)
        tmp = self._meta_path().with_suffix(".json.tmp")
        tmp.write_text(json.dumps(doc, indent=2) + "\n")
        tmp.replace(self._meta_path())

    # ── lifecycle ────────────────────────────────────────────────────────

    def start(self, symbol: str, source: str = "", demo: bool = False,
              max_mb: float = 250.0) -> dict:
        self.root.mkdir(parents=True, exist_ok=True)
        # 4 random hex chars: two recordings of one symbol in the same
        # second must never fight over the same session id / file set.
        sid = (time.strftime("%Y%m%d-%H%M%S") + "-" + _slug(symbol)
               + "-" + os.urandom(2).hex())
        started = time.time()
        meta = {"id": sid, "symbol": symbol, "source": source, "demo": demo,
                "started": started, "rows": 0, "bytes_est": 0,
                "parts": 1, "max_mb": float(max_mb), "stopped": None}
        doc = self._load_meta()
        doc[sid] = meta
        self._save_meta(doc)
        st = {"meta": meta, "writer": None, "buf": [], "est": 0}
        self._open[sid] = st
        self._rotate(sid)  # opens part 1
        return dict(meta)

    def _part_path(self, sid: str, part: int) -> Path:
        return self.root / f"{sid}_part{part}.parquet"

    def events_paths(self, sid: str) -> list[Path]:
        """One session's parquet parts in write order (the read/replay side
        of the recording contract). Callers reading a still-recording
        session must drop the newest part — it is open for writing."""
        return sorted(self.root.glob(f"{sid}_part*.parquet"))

    def _rotate(self, sid: str) -> None:
        st = self._open[sid]
        if st["writer"] is not None:
            self._flush(sid)
            st["writer"].close()
            st["writer"] = None
            st["meta"]["parts"] += 1
        path = self._part_path(sid, st["meta"]["parts"])
        st["writer"] = pq.ParquetWriter(path, SCHEMA, compression="zstd")
        st["est"] = 0

    def _flush(self, sid: str) -> None:
        st = self._open[sid]
        if not st["buf"]:
            return
        st["writer"].write_table(pa.Table.from_pylist(st["buf"], schema=SCHEMA))
        st["buf"].clear()

    # ── writing ──────────────────────────────────────────────────────────

    def write(self, sid: str, ev) -> None:
        """Append one DepthEvent or TradeEvent to an open session."""
        st = self._open.get(sid)
        if st is None:
            raise ValueError(f"session not recording: {sid}")
        if isinstance(ev, DepthEvent):
            bids = list(ev.bids)
            asks = list(ev.asks)
            row = {"kind": "D", "ts": float(ev.ts), "depth_type": ev.type,
                   "side": "", "price": math.nan, "size": math.nan,
                   "bids_px": [float(p) for p, _ in bids],
                   "bids_sz": [float(s) for _, s in bids],
                   "asks_px": [float(p) for p, _ in asks],
                   "asks_sz": [float(s) for _, s in asks]}
            est = 64 + 32 * (len(bids) + len(asks))
        elif isinstance(ev, TradeEvent):
            row = {"kind": "T", "ts": float(ev.ts), "depth_type": "",
                   "side": ev.side, "price": float(ev.price),
                   "size": float(ev.size),
                   "bids_px": [], "bids_sz": [], "asks_px": [], "asks_sz": []}
            est = 48
        else:
            raise TypeError(f"cannot record {type(ev).__name__}")
        st["buf"].append(row)
        st["meta"]["rows"] += 1
        st["est"] += est
        st["meta"]["bytes_est"] += est
        if len(st["buf"]) >= self.flush_rows:
            self._flush(sid)
        if st["est"] >= st["meta"]["max_mb"] * 1024 * 1024 and st["writer"] is not None:
            self._rotate(sid)

    def stop(self, sid: str) -> dict:
        st = self._open.pop(sid, None)
        doc = self._load_meta()
        # The LIVE meta (row/byte counters, part count) wins over the copy
        # saved at start(); a crash still leaves the start-time row behind.
        meta = st["meta"] if st is not None else doc.get(sid)
        if st is not None:
            if st["buf"] and st["writer"] is not None:
                st["writer"].write_table(
                    pa.Table.from_pylist(st["buf"], schema=SCHEMA))
                st["buf"].clear()
            if st["writer"] is not None:
                st["writer"].close()
        if meta is not None:
            meta["stopped"] = time.time()
            doc[sid] = meta
            self._save_meta(doc)
        return dict(meta or {"id": sid})

    def stop_all(self) -> list[dict]:
        return [self.stop(sid) for sid in list(self._open)]

    # ── management (MY DATA listing) ─────────────────────────────────────

    def sessions(self) -> list[dict]:
        doc = self._load_meta()
        out = []
        for sid, meta in doc.items():
            m = dict(meta)
            m["files"] = [p.name for p in sorted(self.root.glob(f"{sid}_part*.parquet"))]
            m["bytes"] = sum((self.root / f).stat().st_size for f in m["files"]
                             if (self.root / f).exists())
            m["recording"] = sid in self._open
            out.append(m)
        return sorted(out, key=lambda m: m.get("started", 0), reverse=True)

    def delete(self, sid: str) -> bool:
        if sid in self._open:
            self.stop(sid)
        doc = self._load_meta()
        existed = doc.pop(sid, None) is not None
        if existed:
            self._save_meta(doc)
        for p in self.root.glob(f"{sid}_part*.parquet"):
            p.unlink(missing_ok=True)
        return existed

    def session_paths(self, sid: str) -> list[Path]:
        return sorted(self.root.glob(f"{sid}_part*.parquet"))


def read_events(paths) -> list:
    """Lossless round-trip: parquet rows back into DepthEvent/TradeEvent,
    in write order. The replay side of the H8 invariant. Every value is
    unwrapped to plain Python floats/strings so a replayed stream is
    byte-for-byte comparable with the live one (no numpy scalars leaking
    into fingerprints or JSON)."""
    events: list = []
    for path in paths:
        table = pq.read_table(path, schema=SCHEMA)
        cols = table.to_pydict()
        for i in range(table.num_rows):
            if cols["kind"][i] == "D":
                events.append(DepthEvent(
                    symbol="", ts=float(cols["ts"][i]),
                    type=str(cols["depth_type"][i]),
                    bids=[(float(p), float(s))
                          for p, s in zip(cols["bids_px"][i],
                                          cols["bids_sz"][i])],
                    asks=[(float(p), float(s))
                          for p, s in zip(cols["asks_px"][i],
                                          cols["asks_sz"][i])],
                ))
            else:
                events.append(TradeEvent(
                    symbol="", ts=float(cols["ts"][i]),
                    price=float(cols["price"][i]),
                    size=float(cols["size"][i]),
                    side=str(cols["side"][i])))
    return events
