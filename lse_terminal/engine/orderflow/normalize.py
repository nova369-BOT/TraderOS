"""Colour normalization for the depth heatmap — pure functions only (S2–S5).

Everything the settings window controls (colour scheme, intensity, dimming,
upper/lower cut-offs, vertical smoothing, contrast & brightness) reduces to
one 256-entry RGBA lookup table plus a size→index mapping. The LUT rebuilds
on settings change (cheap); frames only index into it (plan §5.2).

Determinism gate (H2): identical arguments ⇒ bit-identical arrays, so golden
images can regression-check the renderer.
"""

from __future__ import annotations

import numpy as np

SCHEMES = ("heat", "greyscale", "deepdom-ask", "deepdom-bid", "bookmap")

# Default scheme anchors (research §S2): black → blue → yellow → orange → red.
_HEAT_STOPS = (
    (0.00, (0.0, 0.0, 0.0)),
    (0.25, (0.0, 0.0, 1.0)),
    (0.55, (1.0, 1.0, 0.0)),
    (0.78, (1.0, 0.55, 0.0)),
    (1.00, (1.0, 0.0, 0.0)),
)

# V1 ramp families — lockstep mirror of frontend heatVisuals.ts (tuned
# against docs/F1-order-flow/research/deepdom-heatmap-es.jpg).
_DEEPDOM_ASK_STOPS = (
    (0.00, (0.024, 0.008, 0.020)),
    (0.30, (0.227, 0.039, 0.063)),
    (0.55, (0.494, 0.102, 0.063)),
    (0.75, (0.808, 0.251, 0.047)),
    (0.90, (1.000, 0.549, 0.000)),
    (1.00, (1.000, 0.839, 0.376)),
)
_DEEPDOM_BID_STOPS = (
    (0.00, (0.008, 0.020, 0.043)),
    (0.30, (0.024, 0.094, 0.196)),
    (0.55, (0.039, 0.188, 0.369)),
    (0.75, (0.051, 0.361, 0.439)),
    (0.90, (0.102, 0.745, 0.361)),
    (1.00, (0.494, 1.000, 0.596)),
)
_BOOKMAP_STOPS = (
    (0.00, (0.000, 0.000, 0.000)),
    (0.35, (0.031, 0.133, 0.239)),
    (0.60, (0.055, 0.420, 0.659)),
    (0.80, (0.431, 0.725, 0.894)),
    (0.90, (0.886, 0.957, 1.000)),
    (0.95, (1.000, 0.792, 0.243)),
    (1.00, (1.000, 0.361, 0.157)),
)

_STOPS = {
    "heat": _HEAT_STOPS,
    "deepdom-ask": _DEEPDOM_ASK_STOPS,
    "deepdom-bid": _DEEPDOM_BID_STOPS,
    "bookmap": _BOOKMAP_STOPS,
}


def base_gradient(scheme: str = "heat") -> np.ndarray:
    """The scheme's raw 256×3 gradient in 0..1 (before user controls)."""
    if scheme not in SCHEMES:
        raise ValueError(f"unknown scheme: {scheme}")
    if scheme == "greyscale":
        t = np.linspace(0.0, 1.0, 256)
        return np.stack([t, t, t], axis=1)
    stops = _STOPS[scheme]
    xs = np.array([s[0] for s in stops])
    rgb = np.array([s[1] for s in stops])
    t = np.linspace(0.0, 1.0, 256)
    return np.stack([np.interp(t, xs, rgb[:, c]) for c in range(3)], axis=1)


def build_lut(scheme: str = "heat", intensity: float = 1.0,
              dimming: float = 0.0, contrast: float = 0.0,
              brightness: float = 0.0) -> np.ndarray:
    """256×4 uint8 LUT for one settings combination.

    intensity  colour vibrancy: 0 = greyscale, 1 = scheme colours, >1 pushes
               saturation beyond the anchors (chroma is scaled around the
               per-pixel luminance).
    dimming    blend toward all-black (0..1) — the "dim heat" control.
    contrast   expands around mid-luminance (-1..1), applied per channel.
    brightness additive shift (-1..1) on the final output.
    """
    v = base_gradient(scheme).astype(np.float64)
    lum = v.mean(axis=1, keepdims=True)
    v = lum + (v - lum) * float(intensity)
    v = v * (1.0 - float(np.clip(dimming, 0.0, 1.0)))
    v = (v - 0.5) * (1.0 + float(contrast)) + 0.5
    v = v + float(brightness)
    v = np.clip(v, 0.0, 1.0)
    out = np.empty((256, 4), dtype=np.uint8)
    out[:, :3] = np.rint(v * 255.0).astype(np.uint8)
    out[:, 3] = 255
    return out


def quantize_lut(lut: np.ndarray, shades: int | None) -> np.ndarray:
    """Vertical smoothing (S4): collapse the gradient into ``shades``
    distinct bands. ``None`` / 0 / 1 = smoothing off (256 shades)."""
    if shades is None or shades <= 1:
        return lut
    shades = min(int(shades), 256)
    step = -(-256 // shades)  # ceil
    rep = np.minimum((np.arange(256) // step) * step + step // 2, 255)
    return lut[rep]


def cutoff_values(sizes, mode: str = "percentile", lower: float = 5.0,
                  upper: float = 95.0) -> tuple[float, float]:
    """Resolve the cut-off pair (S3) into concrete (lo, hi) sizes.

    percentile — lower/upper are percentiles over the observed session sizes
      (the auto-tuned default: an instrument's own distribution decides
      where the gradient saturates).
    exact — lower/upper are literal sizes (contracts/lots/units).
    """
    if mode == "exact":
        lo, hi = float(lower), float(upper)
    elif mode == "percentile":
        arr = np.asarray(list(sizes), dtype=np.float64)
        arr = arr[arr > 0]
        if arr.size == 0:
            return (0.0, 1.0)
        lo = float(np.percentile(arr, float(lower)))
        hi = float(np.percentile(arr, float(upper)))
    else:
        raise ValueError(f"unknown cutoff mode: {mode}")
    if hi <= lo:
        hi = lo + max(abs(lo) * 1e-6, 1e-9)
    return (lo, hi)


def size_to_index(sizes, lo: float, hi: float, gamma: float = 1.0) -> np.ndarray:
    """Map sizes to LUT indices 0..255: ≤ lo saturates to the bottom colour,
    ≥ hi to the solid top colour. ``gamma`` (V1, default 1 = linear) applies
    the perceptual exponent f^γ — γ<1 lifts small liquidity and saturates
    walls; lockstep with frontend depthHeatTypes.sizeToIndex."""
    arr = np.asarray(sizes, dtype=np.float64)
    if hi <= lo:
        hi = lo + max(abs(lo) * 1e-6, 1e-9)
    idx = np.clip((arr - lo) / (hi - lo), 0.0, 1.0) ** float(gamma)
    return np.rint(idx * 255.0).astype(np.uint8)
