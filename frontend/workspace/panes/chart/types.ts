// F2 · chart pane model. Pure types + view math, no React, no canvas.

export interface Candle {
  ts: number;      // epoch seconds
  open: number; high: number; low: number; close: number;
  volume: number;
}

export type Source = 'demo' | 'binance';

export const TIMEFRAMES = ['1m', '5m', '15m', '1h'] as const;
export type Timeframe = typeof TIMEFRAMES[number];

/** Camera over the candle array. offset = candles hidden at the right edge. */
export interface ViewState {
  offset: number;   // integer candles scrolled back from the last bar
  pxPer: number;    // candle slot width in css px
  morph: number;    // 0 = candles, 1 = footprint (eased each frame)
  morphTarget: number;
}

export const FOOTPRINT_PX = 26;  // px where the unfold completes
export const MORPH_SPAN = 10;    // px window the animation runs over
export const MIN_PX = 2;
export const MAX_PX = 72;

export function defaultView(): ViewState {
  return { offset: 0, pxPer: 8, morph: 0, morphTarget: 0 };
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
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
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
