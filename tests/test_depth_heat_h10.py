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
from lse_terminal.engine.orderflow.book import DepthBook, price_key
from lse_terminal.engine.orderflow.grid import DepthGrid
from lse_terminal.engine.orderflow.normalize import (
    build_lut, cutoff_values, size_to_index)
from lse_terminal.providers.demo import DemoProvider

GOLDEN_PATH = Path(__file__).parent / "data" / "depth_heat_golden.png"
GOLDEN_DEEPDOM_PATH = Path(__file__).parent / "data" / \
    "depth_heat_golden_deepdom.png"

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


def render_deepdom_field() -> np.ndarray:
    """V1 side-aware pipeline: same field, per-side LUTs + γ=0.6. The side
    of each price row is the side its level last arrived on in the event
    stream (bids vs asks) — the pane knows this per level at fold time."""
    events = DemoProvider().depth_history(
        GOLD_SYMBOL, GOLD_START, GOLD_START + GOLD_SECONDS,
        column_ms=1000, max_levels=50)
    side_of: dict[float, int] = {}
    for ev in events:
        for p, _ in ev.bids:
            side_of[price_key(p)] = 0
        for p, _ in ev.asks:
            side_of[price_key(p)] = 1
    grid = DepthGrid(column_ms=1000)
    grid.ingest(events)
    grid.flush()
    vp = grid.viewport()
    cells = np.asarray(vp["cells"], dtype=np.float64)
    positive = cells[cells > 0]
    lo, hi = cutoff_values(positive.tolist(), "percentile", 5.0, 95.0)
    idx = size_to_index(cells, lo, hi, gamma=0.6)
    lutA = build_lut("deepdom-ask")[..., :3]
    lutB = build_lut("deepdom-bid")[..., :3]
    rgbA = lutA[idx]                      # cols × prices × 3
    rgbB = lutB[idx]
    sides = np.array([side_of.get(price_key(p), 1) for p in vp["prices"]])
    rgb = np.where(sides[None, :, None] == 1, rgbA, rgbB)
    return np.ascontiguousarray(
        np.flipud(rgb.transpose(1, 0, 2))).astype(np.uint8)


def test_depth_heat_golden_deepdom_image():
    png = png_bytes(render_deepdom_field())
    if os.environ.get("UPDATE_GOLDEN"):
        GOLDEN_DEEPDOM_PATH.write_bytes(png)
    assert GOLDEN_DEEPDOM_PATH.exists(), (
        "deepdom golden missing — run once with UPDATE_GOLDEN=1")
    got = hashlib.sha256(png).hexdigest()
    want = hashlib.sha256(GOLDEN_DEEPDOM_PATH.read_bytes()).hexdigest()
    assert got == want, (
        "V1 deepdom pipeline changed. If intentional, regenerate with "
        f"UPDATE_GOLDEN=1 (got {got[:12]}…, golden {want[:12]}…).")


SUBPANES_GOLDEN_PATH = Path(__file__).parent / "data" / \
    "depth_heat_golden_subpanes.png"


def render_subpanes_field() -> np.ndarray:
    """V3 regression: the deepdom field on top + the deterministic context
    strip (buy/sell-split volume + CVD line) below, mirroring subpanes.ts
    bucket maths at a fixed golden geometry (1 px per second)."""
    field = render_deepdom_field()
    Hf, W, _ = field.shape
    H = Hf + 64                      # strip body 48 + shared label band 16
    img = np.zeros((H, W, 3), dtype=np.uint8)
    img[:Hf] = field
    img[Hf:] = (10, 13, 18)
    trades = DemoProvider().trade_history(
        GOLD_SYMBOL, GOLD_START, GOLD_START + GOLD_SECONDS, column_ms=1000)
    bucket = 5000
    col0 = int(GOLD_START * 1000)
    agg: dict[int, list[float]] = {}
    for t in trades:
        bk = int(t.ts * 1000) // bucket
        a = agg.setdefault(bk, [0.0, 0.0])
        if t.side == "BUY":
            a[0] += t.size
        else:
            a[1] += t.size
    if not agg:
        return img
    max_tot = max(max(a[0], a[1]) for a in agg.values())
    base = H - 16 - 2
    max_bar_h = base - Hf - 14
    cvd = 0.0
    pts: list[tuple[float, float]] = []
    for bk in sorted(agg):
        b, s = agg[bk]
        cvd += b - s
        x0 = (bk * bucket - col0) / 1000.0
        slot = 5.0
        cx = x0 + slot / 2
        bar_w = max(1.0, slot * 0.36)
        h_s = int(round((s / max_tot) * max_bar_h))
        h_b = int(round((b / max_tot) * max_bar_h))
        xs = int(round(cx - bar_w - 0.5))
        xb = int(round(cx + 0.5))
        w = max(1, int(round(bar_w)))
        if 0 <= xs < W and h_s > 0:
            img[base - h_s:base, xs:xs + w] = (239, 83, 80)
        if 0 <= xb < W and h_b > 0:
            img[base - h_b:base, xb:xb + w] = (100, 165, 240)
        pts.append((cx, cvd))
    cmin = min(0.0, min(p[1] for p in pts))
    cmax = max(0.0, max(p[1] for p in pts))
    if cmax > cmin:
        prev: tuple[float, float] | None = None
        for x, v in pts:
            y = base - 2 - ((v - cmin) / (cmax - cmin)) * (max_bar_h - 4)
            if prev is not None:
                px, py = prev
                n = max(2, int(abs(x - px)) + 1)
                for i in range(n + 1):
                    xi = int(round(px + (x - px) * i / n))
                    yi = int(round(py + (y - py) * i / n))
                    if 0 <= xi < W and 0 <= yi < H:
                        img[yi, xi] = (226, 238, 255)
            prev = (x, y)
    return img


def test_depth_heat_golden_subpanes_image():
    png = png_bytes(render_subpanes_field())
    if os.environ.get("UPDATE_GOLDEN"):
        SUBPANES_GOLDEN_PATH.write_bytes(png)
    assert SUBPANES_GOLDEN_PATH.exists(), (
        "subpanes golden missing — run once with UPDATE_GOLDEN=1")
    got = hashlib.sha256(png).hexdigest()
    want = hashlib.sha256(SUBPANES_GOLDEN_PATH.read_bytes()).hexdigest()
    assert got == want, (
        "V3 subpanes pipeline changed. If intentional, regenerate with "
        f"UPDATE_GOLDEN=1 (got {got[:12]}…, golden {want[:12]}…).")


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
