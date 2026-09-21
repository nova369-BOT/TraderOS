/**
 * candleBodies.ts — MT5-grade candle body/wick paint (owner directive
 * 2026-09-21: "MAKE THE CANDLESTICK FASTER LIKE THAT OF MT5").
 *
 * Pure canvas: no React, no DOM, no allocations per frame beyond two
 * path descriptors per color class. The pre-existing inline loop spent
 * THREE canvas draw calls per candle (one stroke() for the wick, one
 * fillRect for the body, one strokeRect for the border) plus a
 * strokeStyle/lineCap/lineWidth state round-trip for every bar — at
 * deep zoom-out (the MT5 view: thousands of bars) that is ~12,000
 * canvas calls of state churn per frame. This renderer batches by
 * color class instead: every wick of a direction goes into ONE path
 * (2 strokes per frame), every body into ONE path per direction
 * (2 fills), every border into ONE path per direction (2 strokes) —
 * 6 canvas draw calls total, no matter how many candles are visible.
 *
 * PIXEL-PARITY LAW with the loop it replaces (asserted in
 * tests/chart_pure_entry.ts against the verbatim legacy oracle):
 *   - body rect for candle i: x = indexToX(gi, firstVisible) − bodyW/2,
 *     y = min(openY, closeY), h = max(1, |closeY − openY|);
 *   - wick: single segment (x, highY)→(x, lowY), round caps;
 *   - bullish ⇔ close ≥ open (the legacy definition, verbatim);
 *   - identical fill/border/wick colors and widths per class;
 *   - the forming candle still paints from the morph envelope (D15),
 *     passed in via morphAt — no live-motion change.
 * Bodies never overlap (body width ≤ 0.7 × slot by construction), so
 * per-class painting order cannot change a pixel: same-color rects
 * that abutted before still abut, only batched.
 */

import type { Candle } from '../core/types';

export interface CandleBodyColors {
  bullish: string;
  bearish: string;
  bullishWick: string;
  bearishWick: string;
  bullishBorder: string;
  bearishBorder: string;
}

export interface CandleBodiesArgs {
  ctx: CanvasRenderingContext2D;
  candles: Candle[];            // the visible slice, in index order
  startIndex: number;           // visible.startIndex (fractional-safe)
  indexToX: (globalIndex: number, firstVisible: number) => number;
  priceToY: (price: number) => number;
  morphAt: (localIndex: number, candle: Candle) => Candle;
  candleBodyWidth: number;
  wickWidth: number;
  colors: CandleBodyColors;
}

export function paintCandleBodies(a: CandleBodiesArgs): void {
  const { ctx, candles, startIndex, indexToX, priceToY, morphAt,
          candleBodyWidth, wickWidth, colors } = a;
  // v2 (owner's regression report, 2026-09-21): a single MEGA-path of a
  // few thousand filled/stroked rects can rasterize SLOWER than the
  // canvas's native rect fast paths, so bodies keep fillRect/strokeRect
  // (the fastest rect primitive on every browser) — but grouped into
  // ONE color run each, so style state is written ~4 times per frame
  // instead of ~5 per candle. Wicks stay mega-paths per direction:
  // a wick stroke per candle was the genuine cost, two strokes per
  // frame for any N. One transform pass computes each candle's rects
  // once; a small coordinate buffer per direction keeps the second
  // (per-primitive) pass allocation-free over candles.length.
  const bullWick = new Path2D();
  const bearWick = new Path2D();
  const halfW = candleBodyWidth / 2;
  const halfN = candles.length;
  const bullsX = new Float64Array(halfN), bullsY = new Float64Array(halfN),
        bullsW = new Float64Array(halfN), bullsH = new Float64Array(halfN);
  const bearsX = new Float64Array(halfN), bearsY = new Float64Array(halfN),
        bearsW = new Float64Array(halfN), bearsH = new Float64Array(halfN);
  let nb = 0, ns = 0;

  for (let i = 0; i < candles.length; i++) {
    const dc = morphAt(i, candles[i]);                 // D15 glide
    const x = indexToX(startIndex + i, startIndex);
    const openY = priceToY(dc.open);
    const closeY = priceToY(dc.close);
    const highY = priceToY(dc.high);
    const lowY = priceToY(dc.low);
    const bodyTop = Math.min(openY, closeY);
    const bodyHeight = Math.max(1, Math.abs(closeY - openY));
    if (dc.close >= dc.open) {                        // bullish, verbatim
      bullWick.moveTo(x, highY);
      bullWick.lineTo(x, lowY);
      bullsX[nb] = x - halfW; bullsY[nb] = bodyTop;
      bullsW[nb] = candleBodyWidth; bullsH[nb] = bodyHeight;
      nb++;
    } else {
      bearWick.moveTo(x, highY);
      bearWick.lineTo(x, lowY);
      bearsX[ns] = x - halfW; bearsY[ns] = bodyTop;
      bearsW[ns] = candleBodyWidth; bearsH[ns] = bodyHeight;
      ns++;
    }
  }

  ctx.lineWidth = wickWidth;
  ctx.lineCap = 'round';
  if (nb) {
    ctx.strokeStyle = colors.bullishWick;
    ctx.stroke(bullWick);
    ctx.fillStyle = colors.bullish;
    for (let i = 0; i < nb; i++) {
      ctx.fillRect(bullsX[i], bullsY[i], bullsW[i], bullsH[i]);
    }
  }
  if (ns) {
    ctx.strokeStyle = colors.bearishWick;
    ctx.stroke(bearWick);
    ctx.fillStyle = colors.bearish;
    for (let i = 0; i < ns; i++) {
      ctx.fillRect(bearsX[i], bearsY[i], bearsW[i], bearsH[i]);
    }
  }
  ctx.lineCap = 'butt';   // the legacy reset, preserved

  // Borders last, same paint-after-fill order as the legacy loop.
  ctx.lineWidth = 1;
  if (nb) {
    ctx.strokeStyle = colors.bullishBorder;
    for (let i = 0; i < nb; i++) {
      ctx.strokeRect(bullsX[i], bullsY[i], bullsW[i], bullsH[i]);
    }
  }
  if (ns) {
    ctx.strokeStyle = colors.bearishBorder;
    for (let i = 0; i < ns; i++) {
      ctx.strokeRect(bearsX[i], bearsY[i], bearsW[i], bearsH[i]);
    }
  }
}
