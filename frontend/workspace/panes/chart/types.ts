// F2 · chart pane model. Pure types + view math, no React, no canvas.
// Navigation feel is a 1:1 port of the LSE ProChart recipe the user loves:
// FLOAT startIndex rendered as floor + fractional pixel shift (Rolex-smooth
// sub-candle panning), geometric zoom levels with the right edge anchored,
// candle slot = body * (1 + CANDLE_GAP_RATIO).

export interface Candle {
  ts: number;      // epoch seconds
  open: number; high: number; low: number; close: number;
  volume: number;
}

export type Source = 'demo' | 'binance';

export const TIMEFRAMES = ['1m', '5m', '15m', '1h'] as const;
export type Timeframe = typeof TIMEFRAMES[number];

export const CANDLE_GAP_RATIO = 0.2;
export const MIN_PX = 1;
export const MAX_PX = 50;

// 40 geometric steps between min and max, exactly like the LSE chart
export const ZOOM_LEVELS: number[] = (() => {
  const steps = 40;
  const ratio = Math.pow(MAX_PX / MIN_PX, 1 / steps);
  return Array.from({ length: steps + 1 },
    (_, i) => MIN_PX * Math.pow(ratio, i));
})();

export function nextZoomLevel(px: number, zoomIn: boolean): number {
  let i = ZOOM_LEVELS.findIndex((l) => l >= px - 0.001);
  if (i === -1) i = ZOOM_LEVELS.length - 1;
  const next = zoomIn ? i + 1 : i - 1;
  return ZOOM_LEVELS[Math.max(0, Math.min(ZOOM_LEVELS.length - 1, next))];
}

/** Camera over the candle array. startIndex is the FLOAT index at the left
    edge; the renderer floors it and shifts by the fractional remainder so
    panning is continuous, never stepping whole candles. */
export interface ViewState {
  startIndex: number;
  pxPer: number;      // candle slot width in css px
  follow: boolean;    // pin the right edge while live data streams
  morph: number;      // 0 = candles, 1 = footprint (eased each frame)
  morphTarget: number;
}

export const FOOTPRINT_PX = 26;  // px where the unfold completes
export const MORPH_SPAN = 10;    // px window the animation runs over

export function defaultView(): ViewState {
  return { startIndex: 0, pxPer: 8, follow: true, morph: 0, morphTarget: 0 };
}

export function morphTargetFor(pxPer: number): number {
  return Math.min(1, Math.max(0, (pxPer - (FOOTPRINT_PX - MORPH_SPAN)) / MORPH_SPAN));
}

/** Nice axis step (1/2/2.5/5 × 10^n) for ``range`` over ~``target`` ticks. */
export function niceStep(range: number, target: number): number {
  const raw = range / Math.max(1, target);
  const mag = 10 ** Math.floor(Math.log10(Math.max(raw, 1e-12)));
  for (const m of [1, 2, 2.5, 5, 10]) if (raw <= m * mag) return m * mag;
  return 10 * mag;
}

export function decimalsFor(step: number): number {
  if (step >= 1) return step % 1 === 0 ? 0 : 1;
  return Math.min(6, Math.ceil(-Math.log10(step)));
}

/** Deterministic PRNG so the DEMO footprint is stable across repaints. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 1)) >>> 0) / 4294967296;
  };
}

export function fmtPrice(p: number): string {
  const a = Math.abs(p);
  const d = a >= 10000 ? 1 : a >= 1000 ? 2 : a >= 1 ? 2 : 4;
  return p.toFixed(d);
}

export function fmtTime(ts: number): string {
  return new Date(ts * 1000).toISOString().slice(11, 16);
}
