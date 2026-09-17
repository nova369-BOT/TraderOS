// ============================================================================
// depth/ladderFusion.ts — V4 fused ladder: the COB's size numbers + bars
// move INTO the price-axis gutter (Bookmap layout). The separate panel
// remains as an option (settings.ladderMode). S6 boundary lines render in
// fused mode too; out-of-window levels dim. Data = the same ClientBook the
// panel mode uses, so both modes always agree.
// ============================================================================

export interface FusedBook {
  sorted(): { bids: [number, number][]; asks: [number, number][] };
}

export interface FusedView {
  fieldW: number;
  cssW: number;
  fH: number;          // field height (above the context stack)
  centre: number;
  ppu: number;
  lo: number;
  hi: number;
}

function fmtSize(v: number): string {
  if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
  if (v >= 100) return v.toFixed(0);
  if (v >= 1) return v.toFixed(1);
  return v.toPrecision(2);
}

function fmtPrice(p: number): string {
  if (p >= 1000) return p.toFixed(1);
  if (p >= 1) return p.toFixed(2);
  return v4(p);
}
function v4(p: number): string { return p.toPrecision(4); }

export function paintFusedLadder(
  ctx: CanvasRenderingContext2D,
  v: FusedView,
  book: FusedBook,
  opts: { activeRange: number },
) {
  const { bids, asks } = book.sorted();
  if (!bids.length && !asks.length) return;
  const yOf = (p: number) => v.fH / 2 - (p - v.centre) * v.ppu;
  const activeOn = opts.activeRange > 0;

  // row band from median visible spacing (same law as the panel ladder)
  const visible = [...bids, ...asks].filter(([p]) =>
    p >= v.lo && p <= v.hi).map(([p]) => p).sort((a, b) => a - b);
  let band = 8;
  if (visible.length >= 2) {
    const gaps: number[] = [];
    for (let i = 1; i < visible.length; i++) {
      gaps.push(visible[i] - visible[i - 1]);
    }
    gaps.sort((a, b) => a - b);
    band = Math.min(20, Math.max(2.5, v.ppu * gaps[gaps.length >> 1]));
  }

  let maxSize = 0;
  for (const [p, sz] of [...bids, ...asks]) {
    if (p >= v.lo && p <= v.hi) maxSize = Math.max(maxSize, sz);
  }

  const priceX = v.fieldW + 5;
  const barX = v.fieldW + 46;
  const barW = 22;
  const sizeX = v.cssW - 4;

  const row = (p: number, sz: number, side: 'bid' | 'ask',
               dim: boolean, best: boolean) => {
    const y = yOf(p);
    if (y < -band || y > v.fH + band) return;
    const yTop = y - band / 2;
    // size bar from the gutter's bar column
    const bw = maxSize > 0 ? Math.max(1.5, (sz / maxSize) * barW) : 1.5;
    ctx.fillStyle = side === 'bid'
      ? (dim ? 'rgba(38,166,154,0.18)' : 'rgba(38, 166, 154, 0.68)')
      : (dim ? 'rgba(239,83,80,0.18)' : 'rgba(239, 83, 80, 0.68)');
    ctx.fillRect(barX, yTop, bw, Math.max(1, band - 1));
    // price + size figures
    ctx.font = best ? '700 9px ui-monospace, Menlo, monospace'
      : '9px ui-monospace, Menlo, monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = dim ? '#4a5260'
      : best ? (side === 'bid' ? '#26a69a' : '#ef5350') : '#8b96a5';
    ctx.fillText(fmtPrice(p), priceX, y + 3);
    ctx.textAlign = 'right';
    ctx.fillStyle = dim ? '#4a5260'
      : (side === 'bid' ? '#9fd6cd' : '#f4b3ae');
    ctx.fillText(fmtSize(sz), sizeX, y + 3);
  };

  const bb = bids.length ? bids[0][0] : null;
  const ba = asks.length ? asks[0][0] : null;
  bids.forEach(([p, sz], i) => {
    row(p, sz, 'bid', activeOn && i >= opts.activeRange, p === bb);
  });
  asks.forEach(([p, sz], i) => {
    row(p, sz, 'ask', activeOn && i >= opts.activeRange, p === ba);
  });

  // S6 active-range boundary lines (amber dashes) in fused mode too
  if (activeOn) {
    ctx.strokeStyle = 'rgba(255, 179, 0, 0.75)';
    ctx.setLineDash([3, 3]);
    const ys: number[] = [];
    if (bids.length && opts.activeRange <= bids.length) {
      ys.push(yOf(bids[opts.activeRange - 1][0]) + band / 2 + 1);
    }
    if (asks.length && opts.activeRange <= asks.length) {
      ys.push(yOf(asks[opts.activeRange - 1][0]) - band / 2 - 1);
    }
    for (const y of ys) {
      if (y < 0 || y > v.fH) continue;
      ctx.beginPath();
      ctx.moveTo(v.fieldW, y);
      ctx.lineTo(v.cssW, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);
  }
  ctx.textAlign = 'left';
}
