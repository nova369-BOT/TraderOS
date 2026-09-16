// ============================================================================
// depth/heatVisuals.ts — the Depth Heat v2 ramp library (V1).
//
// The reference class (DeepCharts DeepDom, Bookmap) reads as "pro" because
// the field is calm and dark while walls GLOW; and because liquidity above
// the spread and below it speak different colour languages. This module
// holds the ramp stop-sets and the LUT builder; the perceptual γ mapping
// lives with sizeToIndex in depthHeatTypes (mirrored engine-side in
// lse_terminal/engine/orderflow/normalize.py — keep in lockstep).
// ============================================================================

import type { DepthHeatSettings } from './depthHeatTypes';

export type RampId = 'deepdom' | 'bookmap' | 'heat' | 'greyscale';

export const RAMP_IDS: RampId[] = ['deepdom', 'bookmap', 'heat', 'greyscale'];

type Stop = [number, [number, number, number]];

// DeepDom family, tuned against research/deepdom-heatmap-es.jpg:
// asks = ember field (near-black maroon → red → burning orange walls),
// bids = deep water (near-black navy → blue → bright green walls).
const DEEPDOM_ASK: Stop[] = [
  [0.00, [6, 2, 5]],
  [0.30, [58, 10, 16]],
  [0.55, [126, 26, 16]],
  [0.75, [206, 64, 12]],
  [0.90, [255, 140, 0]],
  [1.00, [255, 214, 96]],
];

const DEEPDOM_BID: Stop[] = [
  [0.00, [2, 5, 11]],
  [0.30, [6, 24, 50]],
  [0.55, [10, 48, 94]],
  [0.75, [13, 92, 112]],
  [0.90, [26, 190, 92]],
  [1.00, [126, 255, 152]],
];

// Bookmap family: calm blue water, top decile burns yellow→red so walls
// pop against the field (research/bookmap-bubbles-blues.png).
const BOOKMAP: Stop[] = [
  [0.00, [0, 0, 0]],
  [0.35, [8, 34, 61]],
  [0.60, [14, 107, 168]],
  [0.80, [110, 185, 228]],
  [0.90, [226, 244, 255]],
  [0.95, [255, 202, 62]],
  [1.00, [255, 92, 40]],
];

// Classic F1 heat ramp (black → blue → yellow → orange → red).
const HEAT: Stop[] = [
  [0.00, [0, 0, 0]],
  [0.25, [0, 0, 255]],
  [0.55, [255, 255, 0]],
  [0.78, [255, 140, 0]],
  [1.00, [255, 0, 0]],
];

export function rampStops(ramp: RampId, side: 'ask' | 'bid'): Stop[] {
  switch (ramp) {
    case 'deepdom': return side === 'ask' ? DEEPDOM_ASK : DEEPDOM_BID;
    case 'bookmap': return BOOKMAP;
    case 'heat': return HEAT;
    case 'greyscale': return HEAT; // placeholder, handled below
  }
}

function interp(stops: Stop[], t: number): [number, number, number] {
  for (let i = 1; i < stops.length; i++) {
    const [x1, c1] = stops[i];
    const [x0, c0] = stops[i - 1];
    if (t <= x1) {
      const f = (t - x0) / (x1 - x0);
      return [
        c0[0] + (c1[0] - c0[0]) * f,
        c0[1] + (c1[1] - c0[1]) * f,
        c0[2] + (c1[2] - c0[2]) * f,
      ];
    }
  }
  return stops[stops.length - 1][1];
}

/** One 256-entry RGBA LUT from raw stops + the user colour controls
 * (intensity / dimming / contrast / brightness / vertical smoothing).
 * Same maths as depthHeatTypes.buildLut, parametrised over the ramp. */
export function buildLutFromStops(
  stops: Stop[] | null, s: DepthHeatSettings, shades: number,
): Uint8ClampedArray {
  const lut = new Uint8ClampedArray(256 * 4);
  const dim = 1 - Math.min(1, Math.max(0, s.dimming));
  const ct = 1 + s.contrast;
  const br = s.brightness * 255;
  const step = shades >= 2 ? Math.ceil(256 / Math.min(shades, 256)) : 1;
  const evalAt = (i: number): [number, number, number] => {
    const t = i / 255;
    let r: number, g: number, b: number;
    if (stops === null) {           // greyscale
      r = g = b = t * 255;
    } else {
      [r, g, b] = interp(stops, t);
    }
    const lum = (r + g + b) / 3;
    r = lum + (r - lum) * s.intensity;
    g = lum + (g - lum) * s.intensity;
    b = lum + (b - lum) * s.intensity;
    r *= dim; g *= dim; b *= dim;
    r = (r / 255 - 0.5) * ct * 255 + 127.5 + br;
    g = (g / 255 - 0.5) * ct * 255 + 127.5 + br;
    b = (b / 255 - 0.5) * ct * 255 + 127.5 + br;
    return [
      Math.min(255, Math.max(0, r)),
      Math.min(255, Math.max(0, g)),
      Math.min(255, Math.max(0, b)),
    ];
  };
  for (let i = 0; i < 256; i++) {
    const idx = step > 1
      ? Math.min(Math.floor(i / step) * step + Math.floor(step / 2), 255)
      : i;
    const [r, g, b] = evalAt(idx);
    lut[i * 4] = r;
    lut[i * 4 + 1] = g;
    lut[i * 4 + 2] = b;
    lut[i * 4 + 3] = 255;
  }
  return lut;
}

/** The pair of LUTs the field needs: side-aware ramps (deepdom) differ per
 * book side; single-ramp schemes return the same LUT twice. */
export function buildLuts(
  s: DepthHeatSettings, smoothingOverride?: number,
): { ask: Uint8ClampedArray; bid: Uint8ClampedArray } {
  const shades = smoothingOverride !== undefined ? smoothingOverride : s.smoothing;
  const ramp = (RAMP_IDS as string[]).includes(s.scheme) ? s.scheme as RampId : 'heat';
  if (ramp === 'greyscale') {
    const g = buildLutFromStops(null, s, shades);
    return { ask: g, bid: g };
  }
  const ask = buildLutFromStops(rampStops(ramp, 'ask'), s, shades);
  const bid = ramp === 'deepdom'
    ? buildLutFromStops(rampStops(ramp, 'bid'), s, shades)
    : ask;
  return { ask, bid };
}

export function rampLabel(ramp: RampId): string {
  switch (ramp) {
    case 'deepdom': return 'DeepDom · side-aware ember/water';
    case 'bookmap': return 'Bookmap · blue water, hot walls';
    case 'heat': return 'Classic heat';
    case 'greyscale': return 'Greyscale';
  }
}
