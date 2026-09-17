// ============================================================================
// depth/priceAxis.ts — the permanent right price axis (V1).
//
// The single largest "unfinished" signal of the v1 pane was the absence of
// a permanent price axis (02-visual-excellence §1.1 quality 2). This draws
// the reference-class gutter: nice-step ticks + dotted horizontal grid,
// BBO price chips boxed on the axis, and a side-coloured last-price box —
// the ladder numbers themselves live in the COB column beside the canvas.
// Pure draw helpers; the renderer owns the coordinates.
// ============================================================================

export interface AxisView {
  fieldW: number;      // heat field right edge (gutter starts here)
  cssW: number;
  cssH: number;
  centre: number;      // price at the vertical middle
  ppu: number;         // pixels per price unit
  pLo: number;
  pHi: number;
  bookBid: number | null;
  bookAsk: number | null;
  lastPrice: number | null;   // last executed print
  lastBuy: boolean;
  fused?: boolean;   // V4: ladder figures occupy the gutter; hide tick labels
}

const MONO = '9px ui-monospace, Menlo, Consolas, monospace';

export function nicePriceStep(span: number, targetTicks = 7): number {
  const raw = span / Math.max(1, targetTicks);
  const mag = Math.pow(10, Math.floor(Math.log10(Math.max(raw, 1e-12))));
  for (const m of [1, 2, 2.5, 5, 10]) {
    if (raw <= m * mag) return m * mag;
  }
  return 10 * mag;
}

export function fmtPrice(p: number, step: number): string {
  const d = step >= 1 ? (step >= 10 ? 0 : 1)
    : Math.min(6, Math.ceil(-Math.log10(step)));
  return p.toFixed(d);
}

/** Dotted vertical time gridlines (V1 quality 5) — quiet, terminal-grade. */
export function paintTimeGrid(
  ctx: CanvasRenderingContext2D,
  fieldW: number, cssH: number,
  tsToX: (t: number) => number,
  t0: number, t1: number, stepMs: number,
) {
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.lineWidth = 1;
  ctx.setLineDash([2, 4]);
  const first = Math.ceil(t0 / stepMs) * stepMs;
  ctx.beginPath();
  for (let t = first; t <= t1; t += stepMs) {
    const x = Math.round(tsToX(t)) + 0.5;
    if (x < 0 || x > fieldW) continue;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, cssH);
  }
  ctx.stroke();
  ctx.restore();
}

export function paintPriceAxis(ctx: CanvasRenderingContext2D, v: AxisView) {
  const { fieldW, cssW, cssH, centre, ppu, pLo, pHi } = v;
  const yOf = (p: number) => cssH / 2 - (p - centre) * ppu;

  // gutter backdrop + separator
  ctx.fillStyle = '#0c0f14';
  ctx.fillRect(fieldW, 0, cssW - fieldW, cssH);
  ctx.strokeStyle = '#232a35';
  ctx.beginPath();
  ctx.moveTo(fieldW + 0.5, 0);
  ctx.lineTo(fieldW + 0.5, cssH);
  ctx.stroke();

  // nice-step ticks + dotted horizontal grid across the field
  const step = nicePriceStep(pHi - pLo);
  const first = Math.ceil(pLo / step) * step;
  ctx.font = MONO;
  ctx.textAlign = 'right';
  ctx.save();
  ctx.setLineDash([1, 3]);
  for (let p = first; p <= pHi; p += step) {
    const y = Math.round(yOf(p)) + 0.5;
    if (y < 8 || y > cssH - 4) continue;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(fieldW, y);
    ctx.stroke();
    ctx.strokeStyle = '#3a4453';
    ctx.beginPath();
    ctx.moveTo(fieldW, y);
    ctx.lineTo(fieldW + 4, y);
    ctx.stroke();
    if (!v.fused) {   // fused mode: per-level ladder figures replace ticks
      ctx.fillStyle = '#8b96a5';
      ctx.fillText(fmtPrice(p, step), cssW - 5, y + 3);
    }
  }
  ctx.restore();

  // BBO chips boxed on the axis (ask red above, bid teal below)
  const chip = (p: number, bg: string, fg: string) => {
    const y = yOf(p);
    if (y < 8 || y > cssH - 8) return;
    ctx.fillStyle = bg;
    ctx.fillRect(fieldW + 2, y - 8, cssW - fieldW - 4, 16);
    ctx.fillStyle = fg;
    ctx.font = `600 ${MONO}`;
    ctx.fillText(fmtPrice(p, step), cssW - 5, y + 3);
    ctx.font = MONO;
  };
  if (v.bookAsk !== null) chip(v.bookAsk, 'rgba(239, 83, 80, 0.92)', '#2b0b0a');
  if (v.bookBid !== null) chip(v.bookBid, 'rgba(38, 166, 154, 0.92)', '#06201c');

  // last executed price: dashed line + side-coloured box (topmost)
  if (v.lastPrice !== null) {
    const y = yOf(v.lastPrice);
    if (y >= 0 && y <= cssH) {
      ctx.save();
      ctx.strokeStyle = v.lastBuy
        ? 'rgba(38, 166, 154, 0.65)' : 'rgba(239, 83, 80, 0.65)';
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(0, Math.round(y) + 0.5);
      ctx.lineTo(fieldW, Math.round(y) + 0.5);
      ctx.stroke();
      ctx.restore();
      if (y >= 8 && y <= cssH - 8) {
        ctx.fillStyle = v.lastBuy ? '#26a69a' : '#ef5350';
        ctx.fillRect(fieldW + 2, y - 8, cssW - fieldW - 4, 16);
        ctx.fillStyle = '#08131a';
        ctx.font = `700 ${MONO}`;
        ctx.fillText(fmtPrice(v.lastPrice, step), cssW - 5, y + 3);
        ctx.font = MONO;
      }
    }
  }
  ctx.textAlign = 'left';
}
