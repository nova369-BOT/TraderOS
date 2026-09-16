"""Golden-image + performance budgets for the Depth Heat pipeline (F1, H10).

Golden image: the ENGINE half of the heat pipeline — demo events → grid →
cut-offs → LUT → RGB field — is fully deterministic, so its rendered PNG is
a bit-stable golden. The test re-renders and compares hashes; regenerate
with UPDATE_GOLDEN=1 when a pipeline change is INTENTIONAL. (The browser
canvas pass stays covered by the on-screen paint check — no browser in CI.)

Perf budgets are deliberately generous (slow CI machines); they exist to
catch order-of-magnitude regressions, not to race the clock.
"""

import hashlib
import os
import random
import struct
import time
import zlib
from pathlib import Path

import numpy as np
import pytest

from lse_terminal.contracts import DEPTH_DELTA, DEPTH_SNAPSHOT, DepthEvent
from lse_terminal.engine.orderflow.book import DepthBook
from lse_terminal.engine.orderflow.grid import DepthGrid
from lse_terminal.engine.orderflow.normalize import (
    build_lut, cutoff_values, size_to_index)
from lse_terminal.providers.demo import DemoProvider

GOLDEN_PATH = Path(__file__).parent / "data" / "depth_heat_golden.png"

# Fixed inputs: the demo source is seeded per (symbol, start), so this
# field is identical on every machine, every run.
GOLD_SYMBOL = "DEMO:GOLD"
GOLD_START = 1750000000.0
GOLD_SECONDS = 120


# ── a minimal PNG encoder (stdlib only, RGB8) ─────────────────────────────


def png_bytes(img: np.ndarray) -> bytes:
    h, w, _ = img.shape
    raw = b"".join(b"\x00" + img[y].tobytes() for y in range(h))

    def chunk(tag: bytes, data: bytes) -> bytes:
        out = struct.pack(">I", len(data)) + tag + data
        return out + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    ihdr = struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)
    return (b"\x89PNG\r\n\x1a\n"
            + chunk(b"IHDR", ihdr)
            + chunk(b"IDAT", zlib.compress(raw, 9))
            + chunk(b"IEND", b""))


def render_heat_field() -> np.ndarray:
    """Demo events → grid → cut-offs → LUT → RGB (rows = price high→low,
    columns = time). Mirrors the pane's normalisation path exactly."""
    events = DemoProvider().depth_history(
        GOLD_SYMBOL, GOLD_START, GOLD_START + GOLD_SECONDS,
        column_ms=1000, max_levels=50)
    grid = DepthGrid(column_ms=1000)
    grid.ingest(events)
    grid.flush()
    vp = grid.viewport()
    cells = np.asarray(vp["cells"], dtype=np.float64)   # cols × prices
    positive = cells[cells > 0]
    lo, hi = cutoff_values(positive.tolist(), "percentile", 5.0, 95.0)
    idx = size_to_index(cells, lo, hi)                  # 0..255 per cell
    lut = build_lut("heat")
    rgb = lut[idx][..., :3]                             # cols × prices × 3
    # The pane paints high prices at the top: transpose then flip rows.
    return np.ascontiguousarray(
        np.flipud(rgb.transpose(1, 0, 2))).astype(np.uint8)


def test_depth_heat_golden_image():
    png = png_bytes(render_heat_field())
    if os.environ.get("UPDATE_GOLDEN"):
        GOLDEN_PATH.write_bytes(png)
        pytest.skip("golden regenerated")
    assert GOLDEN_PATH.exists(), (
        "golden missing — run once with UPDATE_GOLDEN=1")
    got = hashlib.sha256(png).hexdigest()
    want = hashlib.sha256(GOLDEN_PATH.read_bytes()).hexdigest()
    assert got == want, (
        "Depth Heat pipeline output changed. If intentional, regenerate "
        "the golden with UPDATE_GOLDEN=1; otherwise this is a regression "
        f"(got {got[:12]}…, golden {want[:12]}…).")


def test_golden_is_deterministic_across_runs():
    # Two independent renders of the same window hash identically.
    a = png_bytes(render_heat_field())
    b = png_bytes(render_heat_field())
    assert hashlib.sha256(a).hexdigest() == hashlib.sha256(b).hexdigest()


# ── performance budgets ────────────────────────────────────────────────────


def _perf_events(n_cols: int = 600, levels: int = 60) -> list:
    rng = random.Random(11)
    out = []
    ts0 = 1750000000.0
    for c in range(n_cols):
        bids = [(100.0 - i * 0.25 + rng.random() * 0.05,
                 rng.uniform(1.0, 500.0)) for i in range(levels)]
        asks = [(100.25 + i * 0.25 + rng.random() * 0.05,
                 rng.uniform(1.0, 500.0)) for i in range(levels)]
        out.append(DepthEvent(
            symbol="PERF", ts=ts0 + c,
            type=DEPTH_SNAPSHOT if c == 0 else DEPTH_DELTA,
            bids=bids, asks=asks))
    return out


def test_grid_pipeline_budget():
    """10 min × 120 levels: ingest + finalize + dense viewport. Budget is
    generous; the guard is against order-of-magnitude regressions."""
    events = _perf_events()
    grid = DepthGrid(column_ms=1000)
    t0 = time.perf_counter()
    grid.ingest(events)
    grid.flush()
    vp = grid.viewport()
    dt = time.perf_counter() - t0
    assert len(vp["columns"]) >= 600   # (+ a possible trailing live column)
    assert dt < 12.0, f"grid pipeline too slow: {dt:.2f}s for {len(events)} events"


def test_book_rebuild_budget():
    """The /book path rebuilds a persistent book from recent events; keep
    it fast enough to run per request."""
    events = _perf_events(n_cols=240, levels=50)
    book = DepthBook("PERF")
    t0 = time.perf_counter()
    book.apply_all(events)
    dt = time.perf_counter() - t0
    assert book.best_bid() is not None and book.best_ask() is not None
    assert dt < 6.0, f"book rebuild too slow: {dt:.2f}s"


def test_normalize_budget():
    t0 = time.perf_counter()
    for _ in range(10):
        build_lut("heat", intensity=1.2, dimming=0.1, contrast=0.2)
    assert time.perf_counter() - t0 < 1.0, "LUT build regressed"

    rng = np.random.default_rng(3)
    sizes = rng.uniform(0.1, 1000.0, size=1_000_000)
    t0 = time.perf_counter()
    idx = size_to_index(sizes, 5.0, 800.0)
    dt = time.perf_counter() - t0
    assert idx.min() >= 0 and idx.max() <= 255
    assert dt < 2.0, f"size_to_index regressed: {dt:.2f}s for 1M sizes"
