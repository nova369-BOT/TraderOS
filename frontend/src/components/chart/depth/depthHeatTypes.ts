// ============================================================================
// depth/depthHeatTypes.ts — shared types + pure colour normalisation for the
// Depth Heat pane (F1 Phase 1).
//
// The maths here MIRRORS the engine's lse_terminal/engine/orderflow/normalize.py
// (same anchors, same cutoff semantics) so server-rendered and pane-rendered
// heat agree. Keep the two in lockstep.
// ============================================================================

import { buildLuts } from './heatVisuals';

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
  view: 'heat' | 'footprint';   // liquidity heat vs bid×ask volume footprint
  scheme: 'deepdom' | 'bookmap' | 'heat' | 'greyscale';   // V1 ramp family
  applySchemeGlobally: boolean;  // scheme writes to the terminal-wide store
  intensity: number;      // 0..2, 1 = scheme colours
  dimming: number;        // 0..1 toward all-black
  contrast: number;       // -1..1
  brightness: number;     // -1..1
  gamma: number;          // V1 perceptual intensity exponent (0.25..1)
  glow: boolean;          // V1 bloom pass over the hottest levels
  smoothColumns: boolean; // V1 bilinear column blend (watercolour feel)
  showPath: boolean;      // V2 stepped bid/ask lines over the field
  showCandles: boolean;   // V2 trade-derived candle overlay
  bigTradeK: number;      // V2 big-trade ring+tag threshold (× median size)
  showVolumeStrip: boolean; // V2 buy/sell-split volume histogram strip
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
  cob: boolean;           // S8: show the COB column beside the heatmap
  cobCumulative: boolean; // S8 column set: running cumulative per side
  recenterMode: 'bbo' | 'trades' | 'off';      // S9 auto-recentering source
  recenterTolerance: number;  // % of visible half-range before recentering
  resetPolicy: 'session' | 'interval';         // S11 depth reset
  resetIntervalMin: number;   // minutes, when policy = interval
}

export const DEFAULT_DEPTH_SETTINGS: DepthHeatSettings = {
  view: 'heat',
  // First open should read like the reference class (02-visual-excellence §1):
  // side-aware field + glow + path + bubbles, candles off (the heat is hero).
  scheme: 'deepdom',
  applySchemeGlobally: false,
  intensity: 1.0,
  dimming: 0.0,
  contrast: 0.0,
  brightness: 0.0,
  gamma: 0.6,
  glow: true,
  smoothColumns: false,
  showPath: true,
  showCandles: false,
  bigTradeK: 6,
  showVolumeStrip: true,
  // Auto-tuned defaults per research §3: session p5/p95 of observed sizes.
  cutoffMode: 'percentile',
  cutoffLower: 5,
  cutoffUpper: 95,
  smoothingMode: 'auto',
  smoothing: 0,
  dots: true,
  dotType: 'pie',   // V2: pie-split sphere bubbles are the reference look
  dotMinSize: 0,
  dotScale: 1.0,
  dotAlpha: 0.85,
  activeRange: 0,
  cob: true,
  cobCumulative: true,
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

export function loadGlobalScheme(): { scheme: DepthHeatSettings['scheme']; apply: boolean } {
  let scheme: DepthHeatSettings['scheme'] = 'heat';
  let apply = false;
  try {
    const s = localStorage.getItem(GLOBAL_SCHEME_KEY);
    if (s === 'heat' || s === 'greyscale' || s === 'deepdom' || s === 'bookmap') {
      scheme = s;
    }
    apply = localStorage.getItem(GLOBAL_APPLY_KEY) === '1';
  } catch { /* defaults */ }
  return { scheme, apply };
}

export function saveGlobalScheme(scheme: DepthHeatSettings['scheme'], apply: boolean) {
  try {
    localStorage.setItem(GLOBAL_SCHEME_KEY, scheme);
    localStorage.setItem(GLOBAL_APPLY_KEY, apply ? '1' : '0');
  } catch { /* in-session only */ }
}

// ── colour normalisation (mirror of engine/orderflow/normalize.py) ─────────

/** Build the 256-entry RGBA LUT for one settings combination.
 * Single-ramp view of the V1 ramp library (heatVisuals.ts): side-aware
 * schemes return the ask ramp; the renderer itself fetches the ask/bid
 * pair via buildLuts. `smoothingOverride` supplies the resolved shade
 * count (the renderer computes Auto mode from zoom — S4). */
export function buildLut(s: DepthHeatSettings, smoothingOverride?: number): Uint8ClampedArray {
  return buildLuts(s, smoothingOverride).ask;
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

/** Map a size to a LUT index 0..255 (saturating both ends).
 * `gamma` (V1, default 1 = linear) applies the perceptual exponent
 * f^γ — γ<1 lifts small liquidity out of the dark and lets walls
 * saturate, the sqrt-feel of the reference class. Mirrored in
 * engine/orderflow/normalize.py:size_to_index. */
export function sizeToIndex(size: number, lo: number, hi: number, gamma = 1): number {
  if (hi <= lo) hi = lo + Math.max(Math.abs(lo) * 1e-6, 1e-9);
  const f = Math.min(1, Math.max(0, (size - lo) / (hi - lo)));
  return Math.round(Math.pow(f, gamma) * 255);
}
