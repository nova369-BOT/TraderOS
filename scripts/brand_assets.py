#!/usr/bin/env python3
"""ARQOS brand asset renderer.

Generates the ARQOS emblem (open power-ring + candlestick) and wordmark
lockups as PNGs at the exact output paths/sizes consumed by the app,
landing pages, PWA icons and docs. Quantum Core palette:
restrained purple candle (#8B7FD4), graphite ring, no neon.

Usage:  python scripts/brand_assets.py
"""
from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

PURPLE = (139, 127, 212, 255)      # #8B7FD4 restrained Quantum Core purple
INK = (22, 24, 30, 255)            # #16181E charcoal (light surfaces)
RING_LIGHT = (22, 24, 30, 255)     # ring on light surfaces
RING_DARK = (74, 81, 96, 255)      # #4A5160 graphite ring (dark surfaces)
TEXT_DARK = (230, 232, 237, 255)   # #E6E8ED soft white
TILE = (242, 239, 230, 255)        # #F2EFE6 app-icon tile

SS = 4  # supersample factor


def _draw_emblem(draw: ImageDraw.ImageDraw, box: float, ring, candle) -> None:
    """Draw the ARQOS emblem inside a box x box square (already scaled coords)."""
    s = box / 400.0
    cx, cy, r = 200 * s, 200 * s, 125 * s
    w = 34 * s
    bbox = [cx - r, cy - r, cx + r, cy + r]
    # ring with a gap at the top: long sweep from 306 deg through the bottom to 234 deg
    draw.arc(bbox, start=306, end=594, fill=ring, width=int(w))
    # depth bars behind the candle body
    draw.rounded_rectangle([104 * s, 212 * s, 172 * s, 228 * s], radius=8 * s, fill=ring)
    draw.rounded_rectangle([228 * s, 212 * s, 296 * s, 228 * s], radius=8 * s, fill=ring)
    # wick rising out through the ring gap
    draw.rounded_rectangle([195 * s, 52 * s, 205 * s, 320 * s], radius=5 * s, fill=candle)
    # candlestick body
    draw.rounded_rectangle([169 * s, 160 * s, 231 * s, 290 * s], radius=10 * s, fill=candle)


def render_lockup(width: int, height: int, dark: bool, out: Path) -> None:
    W, H = width * SS, height * SS
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    ring = RING_DARK if dark else RING_LIGHT
    text_main = TEXT_DARK if dark else INK
    _draw_emblem(d, H, ring, PURPLE)

    gap = 0.175 * H
    x_text = H + gap
    right_margin = 0.06 * H

    size = int(190 / 400 * H)
    part_a, part_b = "ARQ", "OS"
    while size > 8:
        font = ImageFont.truetype(FONT_BOLD, size)
        total = font.getlength(part_a) + font.getlength(part_b)
        if x_text + total + right_margin <= W:
            break
        size -= 2
    font = ImageFont.truetype(FONT_BOLD, size)
    d.text((x_text, H / 2), part_a, font=font, fill=text_main, anchor="lm")
    d.text((x_text + font.getlength(part_a), H / 2), part_b, font=font, fill=PURPLE, anchor="lm")

    img.resize((width, height), Image.LANCZOS).save(out.as_posix())
    print(f"[brand] wrote {out.relative_to(ROOT)} ({width}x{height}, {'dark' if dark else 'light'})")


def render_icon(size: int, out: Path) -> None:
    S = size * SS
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, S, S], radius=72 / 400 * S, fill=TILE)
    inner = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    di = ImageDraw.Draw(inner)
    _draw_emblem(di, S, RING_LIGHT, PURPLE)
    inner = inner.resize((int(0.8 * S), int(0.8 * S)), Image.LANCZOS)
    img.alpha_composite(inner, (int(0.1 * S), int(0.1 * S)))
    img.resize((size, size), Image.LANCZOS).save(out.as_posix())
    print(f"[brand] wrote {out.relative_to(ROOT)} ({size}x{size} icon)")


def main() -> None:
    fe = ROOT / "frontend"
    # dark lockups (app default theme = Quantum Core dark)
    render_lockup(1944, 555, dark=True, out=ROOT / "assets" / "logo-dark.png")
    render_lockup(972, 278, dark=True, out=fe / "src" / "assets" / "logo.png")
    # light lockups (docs, landing — landing applies CSS invert)
    render_lockup(1944, 540, dark=False, out=ROOT / "assets" / "logo.png")
    render_lockup(972, 278, dark=False, out=fe / "public" / "landing" / "assets" / "logo.png")
    # app icons
    render_icon(64, fe / "public" / "favicon.png")
    render_icon(192, fe / "public" / "icon-192.png")
    render_icon(512, fe / "public" / "icon-512.png")


if __name__ == "__main__":
    main()
