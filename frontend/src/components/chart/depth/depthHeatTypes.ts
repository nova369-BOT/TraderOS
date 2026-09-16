// ============================================================================
// depth/depthHeatTypes.ts — shared types + pure colour normalisation for the
// Depth Heat pane (F1 Phase 1).
//
// The maths here MIRRORS the engine's lse_terminal/engine/orderflow/normalize.py
// (same anchors, same cutoff semantics) so server-rendered and pane-rendered
// heat agree. Keep the two in lockstep.
// ============================================================================

export type DepthEventType = 'SNAPSHOT' | 'DELTA';

/** Wire shape of one depth event (matches DepthEvent.to_dict() engine-side). */
export interface DepthEventMsg {
  symbol: string;
  ts: number;                       // epoch seconds (float)
  type: DepthEventType;
  bids: [number, number][];         // [price, size]; size 0 in a DELTA = removal
  asks: [number, number][];
}

/** One executed print (the volume dots). */
export interface TradeEventMsg {
  symbol: string;
  ts: number;
  price: number;
  size: number;
  side: 'BUY' | 'SELL' | 'INFERRED-BUY' | 'INFERRED-SELL' | 'UNKNOWN';
}

/** Frame shapes on the depth:{symbol} WS topic. */
export type DepthWsFrame =
  | { type: 'subscribed'; topic: string; provider: string; demo: boolean }
  | { type: 'depth'; event: DepthEventMsg }
  | { type: 'trade'; event: TradeEventMsg }
  | { type: 'error'; message: string };

/** Pane colour/normalization settings (persisted per instrument — H6). */
export interface DepthHeatSettings {
  scheme: 'heat' | 'greyscale';
  applySchemeGlobally: boolean;  // scheme writes to the terminal-wide store
  intensity: number;      // 0..2, 1 = scheme colours
  dimming: number;        // 0..1 toward all-black
  contrast: number;       // -1..1
  brightness: number;     // -1..1
  cutoffMode: 'percentile' | 'exact';
  cutoffLower: number;    // percentile (0-100) or exact size
  cutoffUpper: number;
  smoothingMode: 'auto' | 'manual' | 'none';   // S4
  smoothing: number;      // manual shade count 0..20 (S4)
  dots: boolean;
  dotType: 'gradient' | 'solid' | 'pie';       // S7 drawing type
  dotMinSize: number;
  dotScale: number;
  dotAlpha: number;       // 0..1
  activeRange: number;    // 0 = off; else N-level active-range override (S6)
  recenterMode: 'bbo' | 'trades' | 'off';      // S9 auto-recentering source
  recenterTolerance: number;  // % of visible half-range before recentering
  resetPolicy: 'session' | 'interval';         // S11 depth reset
  resetIntervalMin: number;   // minutes, when policy = interval
}

export const DEFAULT_DEPTH_SETTINGS: DepthHeatSettings = {
  scheme: 'heat',
  applySchemeGlobally: false,
  intensity: 1.0,
  dimming: 0.0,
  contrast: 0.0,
  brightness: 0.0,
  // Auto-tuned defaults per research §3: session p5/p95 of observed sizes.
  cutoffMode: 'percentile',
  cutoffLower: 5,
  cutoffUpper: 95,
  smoothingMode: 'auto',
  smoothing: 0,
  dots: true,
  dotType: 'gradient',
  dotMinSize: 0,
  dotScale: 1.0,
  dotAlpha: 0.85,
  activeRange: 0,
  recenterMode: 'bbo',
  recenterTolerance: 15,
  resetPolicy: 'session',
  resetIntervalMin: 60,
};

// ── terminal-wide scheme ("apply globally", persisted per terminal) ────────
// Panes publish/subscribe through these so an open grid updates live.

export const GLOBAL_SCHEME_KEY = 'lset-depth-global-scheme';
export const GLOBAL_APPLY_KEY = 'lset-depth-global-apply';
export const GLOBAL_SCHEME_EVENT = 'lse-depth-global-scheme';

export function loadGlobalScheme(): { scheme: 'heat' | 'greyscale'; apply: boolean } {
  let scheme: 'heat' | 'greyscale' = 'heat';
  let apply = false;
  try {
    const s = localStorage.getItem(GLOBAL_SCHEME_KEY);
    if (s === 'heat' || s === 'greyscale') scheme = s;
    apply = localStorage.getItem(GLOBAL_APPLY_KEY) === '1';
  } catch { /* defaults */ }
  return { scheme, apply };
}

export function saveGlobalScheme(scheme: 'heat' | 'greyscale', apply: boolean) {
  try {
    localStorage.setItem(GLOBAL_SCHEME_KEY, scheme);
    localStorage.setItem(GLOBAL_APPLY_KEY, apply ? '1' : '0');
  } catch { /* in-session only */ }
}

// ── colour normalisation (mirror of engine/orderflow/normalize.py) ─────────

const HEAT_STOPS: [number, [number, number, number]][] = [
  [0.00, [0, 0, 0]],
  [0.25, [0, 0, 255]],
  [0.55, [255, 255, 0]],
  [0.78, [255, 140, 0]],
  [1.00, [255, 0, 0]],
];

function interpStops(t: number): [number, number, number] {
  for (let i = 1; i < HEAT_STOPS.length; i++) {
    const [x1, c1] = HEAT_STOPS[i];
    const [x0, c0] = HEAT_STOPS[i - 1];
    if (t <= x1) {
      const f = (t - x0) / (x1 - x0);
      return [
        c0[0] + (c1[0] - c0[0]) * f,
        c0[1] + (c1[1] - c0[1]) * f,
        c0[2] + (c1[2] - c0[2]) * f,
      ];
    }
  }
  return HEAT_STOPS[HEAT_STOPS.length - 1][1];
}

/** Build the 256-entry RGBA LUT for one settings combination.
 * `smoothingOverride` supplies the resolved shade count (the renderer
 * computes Auto mode from zoom — S4); defaults to the stored value. */
export function buildLut(s: DepthHeatSettings, smoothingOverride?: number): Uint8ClampedArray {
  const shades = smoothingOverride !== undefined ? smoothingOverride : s.smoothing;
  const lut = new Uint8ClampedArray(256 * 4);
  for (let i = 0; i < 256; i++) {
    const t = i / 255;
    let r: number, g: number, b: number;
    if (s.scheme === 'greyscale') {
      r = g = b = t * 255;
    } else {
      [r, g, b] = interpStops(t);
    }
    // intensity: chroma scaled around per-pixel luminance
    const lum = (r + g + b) / 3;
    r = lum + (r - lum) * s.intensity;
    g = lum + (g - lum) * s.intensity;
    b = lum + (b - lum) * s.intensity;
    // dimming toward all-black
    const dim = 1 - Math.min(1, Math.max(0, s.dimming));
    r *= dim; g *= dim; b *= dim;
    // contrast around mid
    const ct = 1 + s.contrast;
    r = (r / 255 - 0.5) * ct * 255 + 127.5;
    g = (g / 255 - 0.5) * ct * 255 + 127.5;
    b = (b / 255 - 0.5) * ct * 255 + 127.5;
    // brightness
    const br = s.brightness * 255;
    r += br; g += br; b += br;
    // vertical smoothing: quantize the shade index before storing
    let idx = i;
    if (shades >= 2) {
      const step = Math.ceil(256 / Math.min(shades, 256));
      idx = Math.min(Math.floor(i / step) * step + Math.floor(step / 2), 255);
    }
    // re-evaluate the gradient at the quantized index so bands are flat
    let qr: number, qg: number, qb: number;
    if (idx === i) {
      qr = r; qg = g; qb = b;
    } else {
      const qt = idx / 255;
      if (s.scheme === 'greyscale') {
        qr = qg = qb = qt * 255;
      } else {
        [qr, qg, qb] = interpStops(qt);
      }
      const qlum = (qr + qg + qb) / 3;
      qr = qlum + (qr - qlum) * s.intensity;
      qg = qlum + (qg - qlum) * s.intensity;
      qb = qlum + (qb - qlum) * s.intensity;
      qr *= dim; qg *= dim; qb *= dim;
      qr = (qr / 255 - 0.5) * ct * 255 + 127.5 + br;
      qg = (qg / 255 - 0.5) * ct * 255 + 127.5 + br;
      qb = (qb / 255 - 0.5) * ct * 255 + 127.5 + br;
    }
    lut[i * 4] = Math.min(255, Math.max(0, qr));
    lut[i * 4 + 1] = Math.min(255, Math.max(0, qg));
    lut[i * 4 + 2] = Math.min(255, Math.max(0, qb));
    lut[i * 4 + 3] = 255;
  }
  return lut;
}

/** Resolve cutoffs to concrete (lo, hi) sizes over observed session sizes. */
export function cutoffValues(
  sizes: number[], mode: 'percentile' | 'exact', lower: number, upper: number,
): [number, number] {
  if (mode === 'exact') {
    let lo = lower, hi = upper;
    if (hi <= lo) hi = lo + Math.max(Math.abs(lo) * 1e-6, 1e-9);
    return [lo, hi];
  }
  const positive = sizes.filter((v) => v > 0).sort((a, b) => a - b);
  if (!positive.length) return [0, 1];
  const pct = (p: number) => {
    const i = Math.min(positive.length - 1,
      Math.max(0, Math.round((p / 100) * (positive.length - 1))));
    return positive[i];
  };
  let lo = pct(lower), hi = pct(upper);
  if (hi <= lo) hi = lo + Math.max(Math.abs(lo) * 1e-6, 1e-9);
  return [lo, hi];
}

/** Map a size to a LUT index 0..255 (saturating both ends). */
export function sizeToIndex(size: number, lo: number, hi: number): number {
  if (hi <= lo) hi = lo + Math.max(Math.abs(lo) * 1e-6, 1e-9);
  const f = (size - lo) / (hi - lo);
  return Math.round(Math.min(1, Math.max(0, f)) * 255);
}
