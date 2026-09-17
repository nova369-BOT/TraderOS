// ============================================================================
// depth/pathBubbles.ts — price path + sphere bubbles + big-trade tags +
// trade-derived candles + the split volume strip (V2).
//
// Everything here is derived ONLY from data the pane actually carries
// (finalized per-column BBO from the depth fold, side-stamped prints from
// the trade stream) — the honesty invariants of 01-depth-heat.md §1.3 bind:
// candles built from prints are labelled trade-derived in the settings UI.
// Pure draw helpers; the renderer owns coordinates and data.
// ============================================================================

export interface PrintDot {
  tsMs: number;
  price: number;
  size: number;
  buy: boolean;
}

export interface PathColumn {
  tsMs: number;
  bb: number | null;   // best bid carried at this finalized column
  ba: number | null;
}

const MONO = '9px ui-monospace, Menlo, Consolas, monospace';
const BUY = '#26a69a';
const SELL = '#ef5350';
const BUY_SOFT = 'rgba(100, 165, 240, 0.85)';  // strip family: cool blue buys

export function fmtSize(v: number): string {
  return v >= 10000 ? `${(v / 1000).toFixed(0)}k`
    : v >= 1000 ? `${(v / 1000).toFixed(1)}k`
      : v >= 100 ? v.toFixed(0)
        : v >= 10 ? v.toFixed(0)
          : v.toFixed(1);
}

/** Stepped bid/ask lines from the carried book per finalized column —
 * the Bookmap/DeepDom signature overlay (quality 3). */
export function paintPath(
  ctx: CanvasRenderingContext2D,
  cols: PathColumn[], i0: number, i1: number,
  tsToX: (t: number) => number,
  yOf: (p: number) => number,
  pLo: number, pHi: number,
) {
  const side = (get: (c: PathColumn) => number | null, color: string) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    let pen: number | null = null;   // current y while stepping
    let penX = 0;
    for (let i = i0; i < i1; i++) {
      const p = get(cols[i]);
      const x0 = tsToX(cols[i].tsMs);
      const x1 = i + 1 < i1 ? tsToX(cols[i + 1].tsMs) : x0 + 1;
      if (p === null || p < pLo || p > pHi) { pen = null; continue; }
      const y = Math.round(yOf(p)) + 0.5;
      if (pen !== null) {
        ctx.moveTo(penX, pen);
        ctx.lineTo(x0, pen);       // horizontal carry
        ctx.lineTo(x0, y);         // vertical step
      } else {
        ctx.moveTo(x0, y);
      }
      ctx.lineTo(x1, y);
      pen = y; penX = x1;
    }
    ctx.stroke();
  };
  side((c) => c.bb, 'rgba(38, 166, 154, 0.85)');
  side((c) => c.ba, 'rgba(239, 83, 80, 0.85)');
}

/** Sphere bubbles: pie-split by aggressor mix with a specular highlight and
 * rim shading so prints read as 3-D spheres, not flat confetti. Prints at
 * or above bigK × rolling median get a ring + a side-coloured size tag
 * (Bookmap's +45k motif). */
export function paintBubbles(
  ctx: CanvasRenderingContext2D,
  dots: PrintDot[],
  t0: number, t1: number, pLo: number, pHi: number,
  tsToX: (t: number) => number,
  yOf: (p: number) => number,
  opts: {
    alpha: number; scale: number; mode: 'pie' | 'sphere' | 'solid';
    bigK: number; bigMedian: number; fieldW: number; cssH: number;
  },
) {
  if (opts.alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = opts.alpha;

  // aggregate into price-time cells for the pie-split sphere look
  type Cell = { x: number; y: number; n: number; size: number; buy: number; sell: number };
  const cells: Cell[] = [];
  if (opts.mode === 'pie') {
    const cellH = Math.max(4, opts.cssH / 80);
    const cellW = Math.max(5, 1400 / Math.max(0.5, (t1 - t0) / Math.max(1, opts.fieldW)));
    const map = new Map<string, Cell>();
    for (const d of dots) {
      if (d.tsMs < t0 || d.tsMs > t1 || d.price < pLo || d.price > pHi) continue;
      const x = tsToX(d.tsMs), y = yOf(d.price);
      const key = `${Math.round(x / cellW)}:${Math.round(y / cellH)}`;
      let c = map.get(key);
      if (!c) { c = { x: 0, y: 0, n: 0, size: 0, buy: 0, sell: 0 }; map.set(key, c); }
      c.x += x; c.y += y; c.n += 1; c.size += d.size;
      if (d.buy) c.buy += d.size; else c.sell += d.size;
    }
    for (const c of map.values()) cells.push({ ...c, x: c.x / c.n, y: c.y / c.n });
  } else {
    for (const d of dots) {
      if (d.tsMs < t0 || d.tsMs > t1 || d.price < pLo || d.price > pHi) continue;
      cells.push({
        x: tsToX(d.tsMs), y: yOf(d.price), n: 1, size: d.size,
        buy: d.buy ? d.size : 0, sell: d.buy ? 0 : d.size,
      });
    }
  }

  for (const c of cells) {
    const r = Math.min(16, Math.max(2.5, Math.sqrt(c.size) * 0.9 * opts.scale));
    const total = c.buy + c.sell;
    const buyFrac = total > 0 ? c.buy / total : 0.5;
    const a0 = -Math.PI / 2;

    // base disc: pie split by aggressor volume
    ctx.beginPath();
    ctx.moveTo(c.x, c.y);
    ctx.arc(c.x, c.y, r, a0, a0 + buyFrac * Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = BUY;
    ctx.fill();
    if (buyFrac < 1) {
      ctx.beginPath();
      ctx.moveTo(c.x, c.y);
      ctx.arc(c.x, c.y, r, a0 + buyFrac * Math.PI * 2, a0 + Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = SELL;
      ctx.fill();
    }

    if (opts.mode !== 'solid') {
      // sphere shading: specular highlight top-left, dark rim bottom-right
      const g = ctx.createRadialGradient(
        c.x - r * 0.35, c.y - r * 0.42, r * 0.1, c.x, c.y, r);
      g.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
      g.addColorStop(0.45, 'rgba(255, 255, 255, 0.08)');
      g.addColorStop(0.85, 'rgba(0, 0, 0, 0.18)');
      g.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
      ctx.beginPath();
      ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.beginPath();
    ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
    ctx.stroke();

    // big-trade ring + size tag
    if (opts.bigK > 0 && opts.bigMedian > 0 && c.size >= opts.bigK * opts.bigMedian) {
      const buySide = c.buy >= c.sell;
      ctx.beginPath();
      ctx.arc(c.x, c.y, r + 3, 0, Math.PI * 2);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = buySide ? 'rgba(38, 166, 154, 0.95)' : 'rgba(239, 83, 80, 0.95)';
      ctx.stroke();
      const label = `${buySide ? '+' : '−'}${fmtSize(c.size)}`;
      ctx.font = `700 ${MONO}`;
      const w = ctx.measureText(label).width + 8;
      let tx = c.x + r + 6;
      if (tx + w > opts.fieldW - 2) tx = c.x - r - 6 - w;
      const ty = Math.min(opts.cssH - 16, Math.max(2, c.y - 8));
      ctx.fillStyle = buySide ? 'rgba(38, 166, 154, 0.92)' : 'rgba(239, 83, 80, 0.92)';
      ctx.fillRect(tx, ty, w, 14);
      ctx.fillStyle = '#08131a';
      ctx.fillText(label, tx + 4, ty + 10);
    }
  }
  ctx.restore();
}

/** OHLC candles derived from the print stream (honest: trades we carry).
 * The settings UI labels this overlay "trade-derived". */
export function paintCandles(
  ctx: CanvasRenderingContext2D,
  dots: PrintDot[],
  t0: number, t1: number, pLo: number, pHi: number,
  tsToX: (t: number) => number,
  yOf: (p: number) => number,
  msPerPx: number, fieldW: number,
) {
  const BUCKETS = [1000, 5000, 15000, 30000, 60000, 300000, 900000, 3600000];
  const bucket = BUCKETS.find((b) => b / msPerPx >= 18) ?? 3600000;
  const ohlc = new Map<number, { o: number; h: number; l: number; c: number }>();
  for (const d of dots) {
    if (d.tsMs < t0 || d.tsMs > t1 || d.price < pLo || d.price > pHi) continue;
    const bk = Math.floor(d.tsMs / bucket);
    let k = ohlc.get(bk);
    if (!k) { k = { o: d.price, h: d.price, l: d.price, c: d.price }; ohlc.set(bk, k); }
    k.h = Math.max(k.h, d.price);
    k.l = Math.min(k.l, d.price);
    k.c = d.price;
  }
  const w = Math.min(9, Math.max(2, (bucket / msPerPx) * 0.6));
  ctx.save();
  ctx.globalAlpha = 0.92;
  for (const [bk, k] of ohlc) {
    const x = tsToX(bk * bucket + bucket / 2);
    if (x < -w || x > fieldW + w) continue;
    const up = k.c >= k.o;
    const col = up ? BUY : SELL;
    ctx.strokeStyle = col;
    ctx.fillStyle = col;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(Math.round(x) + 0.5, yOf(k.h));
    ctx.lineTo(Math.round(x) + 0.5, yOf(k.l));
    ctx.stroke();
    const yO = yOf(k.o), yC = yOf(k.c);
    const top = Math.min(yO, yC);
    ctx.fillRect(x - w / 2, top, w, Math.max(1, Math.abs(yO - yC)));
  }
  ctx.restore();
}
