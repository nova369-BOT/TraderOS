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
  // One Path2D per color class (wick/body/border × bull/bear = 6): the
  // single pass below routes each candle's segments into its class path
  // — no intermediate number buffers, no second pass, the ONLY
  // per-frame allocations are the six path descriptors.
  const bullWick = new Path2D();
  const bearWick = new Path2D();
  const bullBody = new Path2D();
  const bearBody = new Path2D();
  const bullBorder = new Path2D();
  const bearBorder = new Path2D();
  const halfW = candleBodyWidth / 2;
  let bulls = 0, bears = 0;

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
      bullBody.rect(x - halfW, bodyTop, candleBodyWidth, bodyHeight);
      bullBorder.rect(x - halfW, bodyTop, candleBodyWidth, bodyHeight);
      bulls++;
    } else {
      bearWick.moveTo(x, highY);
      bearWick.lineTo(x, lowY);
      bearBody.rect(x - halfW, bodyTop, candleBodyWidth, bodyHeight);
      bearBorder.rect(x - halfW, bodyTop, candleBodyWidth, bodyHeight);
      bears++;
    }
  }

  ctx.lineWidth = wickWidth;
  ctx.lineCap = 'round';
  if (bulls) {
    ctx.strokeStyle = colors.bullishWick;
    ctx.stroke(bullWick);
    ctx.fillStyle = colors.bullish;
    ctx.fill(bullBody);
  }
  if (bears) {
    ctx.strokeStyle = colors.bearishWick;
    ctx.stroke(bearWick);
    ctx.fillStyle = colors.bearish;
    ctx.fill(bearBody);
  }
  ctx.lineCap = 'butt';   // the legacy reset, preserved

  // Borders last, same paint-after-fill order as the legacy loop.
  ctx.lineWidth = 1;
  if (bulls) {
    ctx.strokeStyle = colors.bullishBorder;
    ctx.stroke(bullBorder);
  }
  if (bears) {
    ctx.strokeStyle = colors.bearishBorder;
    ctx.stroke(bearBorder);
  }
}
