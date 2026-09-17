// ============================================================================
// depth/subpanes.ts — V3 context strips.
//
// A dedicated bottom stack INSIDE the pane (collapsible, persisted) sharing
// the heat's time axis (same tsToX): buy/sell-split volume histogram + CVD
// line, plus the DeepDom top-left gauge motif (Imb / Cvd mini-bars with a
// marker). Everything derives only from side-stamped prints the pane
// carries — no prints in view, the gauges say so instead of inventing.
// ============================================================================

import { fmtSize, type PrintDot } from './pathBubbles';

export const SUB_H = 78;        // strip body + shared time-label band
const LABEL_BAND = 16;
const MONO = '9px ui-monospace, Menlo, Consolas, monospace';

/** Buy/sell-split volume histogram + CVD line in [top, cssH-LABEL_BAND]. */
export function paintSubpanes(
  ctx: CanvasRenderingContext2D,
  dots: PrintDot[],
  t0: number, t1: number,
  tsToX: (t: number) => number,
  msPerPx: number,
  top: number, cssH: number, fieldW: number,
) {
  // stack backdrop + separator
  ctx.fillStyle = '#0a0d12';
  ctx.fillRect(0, top, fieldW, cssH - top);
  ctx.strokeStyle = '#232a35';
  ctx.beginPath();
  ctx.moveTo(0, Math.round(top) + 0.5);
  ctx.lineTo(fieldW, Math.round(top) + 0.5);
  ctx.stroke();

  const base = cssH - LABEL_BAND - 2;
  const maxBarH = base - top - 14;
  if (maxBarH < 8) return;

  const BUCKETS = [1000, 5000, 15000, 30000, 60000, 300000, 900000, 3600000];
  const bucket = BUCKETS.find((b) => b / msPerPx >= 5) ?? 3600000;
  const agg = new Map<number, { b: number; s: number }>();
  let maxTot = 0;
  for (const d of dots) {
    if (d.tsMs < t0 || d.tsMs > t1) continue;
    const bk = Math.floor(d.tsMs / bucket);
    let a = agg.get(bk);
    if (!a) { a = { b: 0, s: 0 }; agg.set(bk, a); }
    if (d.buy) a.b += d.size; else a.s += d.size;
    maxTot = Math.max(maxTot, a.b, a.s);
  }

  // CVD over the visible window (running sum in bucket order)
  const order = [...agg.keys()].sort((a, b) => a - b);
  let cvd = 0, cvdMin = 0, cvdMax = 0;
  const cvdPts: [number, number][] = [];
  for (const bk of order) {
    const a = agg.get(bk)!;
    cvd += a.b - a.s;
    cvdPts.push([bk, cvd]);
    cvdMin = Math.min(cvdMin, cvd);
    cvdMax = Math.max(cvdMax, cvd);
  }

  ctx.font = `600 8px ui-monospace, Menlo, monospace`;
  const first = Math.floor(t0 / bucket) * bucket;
  for (let b = first; b <= t1; b += bucket) {
    const x0 = tsToX(b), x1 = tsToX(b + bucket);
    if (x1 < -4 || x0 > fieldW + 4) continue;
    const slot = x1 - x0;
    const a = agg.get(Math.floor(b / bucket));
    if (!a) continue;
    const barW = Math.max(1, slot * 0.36);
    const cx = x0 + slot / 2;
    const hS = maxTot > 0 ? (a.s / maxTot) * maxBarH : 0;
    const hB = maxTot > 0 ? (a.b / maxTot) * maxBarH : 0;
    ctx.fillStyle = 'rgba(239, 83, 80, 0.85)';
    ctx.fillRect(cx - barW - 0.5, base - hS, barW, hS);
    ctx.fillStyle = 'rgba(100, 165, 240, 0.85)';
    ctx.fillRect(cx + 0.5, base - hB, barW, hB);
    if (slot >= 26) {
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255, 150, 147, 0.9)';
      ctx.fillText(fmtSize(a.s), cx - barW / 2, base - hS - 3);
      ctx.fillStyle = 'rgba(147, 197, 253, 0.9)';
      ctx.fillText(fmtSize(a.b), cx + barW / 2 + 1, base - hB - 3);
    }
  }

  // CVD line + terminal value chip
  if (cvdPts.length > 1 && cvdMax > cvdMin) {
    ctx.strokeStyle = 'rgba(226, 238, 255, 0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    cvdPts.forEach(([bk, v], i) => {
      const x = tsToX(bk * bucket + bucket / 2);
      const y = base - 2 - ((v - cvdMin) / (cvdMax - cvdMin)) * (maxBarH - 4);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }
  if (cvd !== 0) {
    const label = `CVD ${cvd > 0 ? '+' : '−'}${fmtSize(Math.abs(cvd))}`;
    ctx.font = `700 ${MONO}`;
    const w = ctx.measureText(label).width + 8;
    ctx.fillStyle = 'rgba(10, 13, 18, 0.85)';
    ctx.fillRect(fieldW - w - 4, top + 3, w, 13);
    ctx.fillStyle = cvd > 0 ? '#26a69a' : '#ef5350';
    ctx.fillText(label, fieldW - w, top + 13);
  }
  ctx.textAlign = 'left';
}

/** DeepDom's top-left motif: Imb and Cvd mini-bars with a marker between
 * sell-extreme (red) and buy-extreme (teal). Honest empty state included. */
export function paintGauges(
  ctx: CanvasRenderingContext2D,
  dots: PrintDot[],
  t0: number, t1: number,
) {
  let b = 0, s = 0;
  for (const d of dots) {
    if (d.tsMs < t0 || d.tsMs > t1) continue;
    if (d.buy) b += d.size; else s += d.size;
  }
  const total = b + s;
  const imb = total > 0 ? (b - s) / total : 0;
  const cvdN = total > 0 ? (b - s) / total : 0;   // window accumulation norm

  const W = 178, H = 44, X = 8, Y = 8;
  ctx.save();
  ctx.fillStyle = 'rgba(10, 13, 18, 0.78)';
  ctx.fillRect(X, Y, W, H);
  ctx.strokeStyle = '#232a35';
  ctx.strokeRect(X + 0.5, Y + 0.5, W - 1, H - 1);

  const bar = (label: string, value: number, has: boolean, rowY: number) => {
    ctx.font = `700 ${MONO}`;
    ctx.fillStyle = '#8b96a5';
    ctx.fillText(label, X + 8, rowY + 7);
    const bx = X + 40, bw = 92, bh = 6;
    // sell half red, buy half teal
    ctx.fillStyle = 'rgba(239, 83, 80, 0.55)';
    ctx.fillRect(bx, rowY, bw / 2, bh);
    ctx.fillStyle = 'rgba(38, 166, 154, 0.55)';
    ctx.fillRect(bx + bw / 2, rowY, bw / 2, bh);
    // centre notch + marker
    const mx = bx + bw / 2 + (has ? value * (bw / 2 - 2) : 0);
    ctx.fillStyle = has ? '#eef1f6' : '#5c6672';
    ctx.fillRect(mx - 1, rowY - 2, 2, bh + 4);
    ctx.textAlign = 'right';
    ctx.fillStyle = has
      ? (value >= 0 ? '#26a69a' : '#ef5350') : '#5c6672';
    ctx.fillText(has
      ? `${value >= 0 ? '+' : '−'}${Math.abs(Math.round(value * 100))}%`
      : '—', X + W - 8, rowY + 7);
    ctx.textAlign = 'left';
  };
  bar('IMB', imb, total > 0, Y + 8);
  bar('CVD', cvdN, total > 0, Y + 26);
  ctx.restore();
}
