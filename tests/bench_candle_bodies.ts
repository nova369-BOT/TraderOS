// MT5-grade candle paint bench — owner directive 2026-09-21.
// Legacy per-candle loop (verbatim oracle, what ProChart drew until now)
// vs the batched pure renderer, measured on a null-render ctx: it isolates
// the JS orchestration cost per frame and counts canvas draw calls (the
// op volume Skia would actually chew). Run:
//   frontend/node_modules/.bin/esbuild tests/bench_candle_bodies.ts \
//     --bundle --format=cjs --platform=node --outfile=/tmp/bench.cjs && \
//   node /tmp/bench.cjs
import { paintCandleBodies } from '../frontend/src/components/chart/renderers/candleBodies';

class NullPath { moveTo(){} lineTo(){} rect(){} }
(globalThis as any).Path2D = NullPath;
class NullCtx {
  strokes = 0; fills = 0; fillRects = 0; strokeRects = 0; rects = 0;
  styleWrites = 0;
  private _fs = ''; private _ss = ''; private _lw = 1; private _lc = 'butt';
  get fillStyle() { return this._fs; } set fillStyle(v) { this.styleWrites++; this._fs = v; }
  get strokeStyle() { return this._ss; } set strokeStyle(v) { this.styleWrites++; this._ss = v; }
  get lineWidth() { return this._lw; } set lineWidth(v) { this.styleWrites++; this._lw = v; }
  get lineCap() { return this._lc; } set lineCap(v) { this.styleWrites++; this._lc = v; }
  beginPath() {}
  moveTo() {} lineTo() {} rect() { this.rects++; }
  stroke() { this.strokes++; }
  fill() { this.fills++; }
  fillRect() { this.fillRects++; }
  strokeRect() { this.strokeRects++; }
}

function legacyPaint(ctx: any, a: any) {
  const { candles, startIndex, indexToX, priceToY, morphAt,
          candleBodyWidth, wickWidth, colors } = a;
  candles.forEach((candle: any, i: number) => {
    const x = indexToX(startIndex + i, startIndex);
    const dc = morphAt(i, candle);
    const isBullish = dc.close >= dc.open;
    const openY = priceToY(dc.open);
    const closeY = priceToY(dc.close);
    const highY = priceToY(dc.high);
    const lowY = priceToY(dc.low);
    ctx.strokeStyle = isBullish ? colors.bullishWick : colors.bearishWick;
    ctx.lineWidth = wickWidth; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x, highY); ctx.lineTo(x, lowY); ctx.stroke();
    ctx.lineCap = 'butt';
    const bodyTop = Math.min(openY, closeY);
    const bodyHeight = Math.max(1, Math.abs(closeY - openY));
    ctx.fillStyle = isBullish ? colors.bullish : colors.bearish;
    ctx.fillRect(x - candleBodyWidth / 2, bodyTop, candleBodyWidth, bodyHeight);
    ctx.strokeStyle = isBullish ? colors.bullishBorder : colors.bearishBorder;
    ctx.lineWidth = 1;
    ctx.strokeRect(x - candleBodyWidth / 2, bodyTop, candleBodyWidth, bodyHeight);
  });
}

function makeCase(n: number, slot: number) {
  const candles: any[] = [];
  for (let i = 0; i < n; i++) {
    const o = 100 + ((i * 37) % 97) / 10;
    const c = o + ((i % 2 === 0 ? 1 : -1) * ((i % 13) / 20 + 0.3));
    candles.push({ time: 1_700_000_000 + i * 60, open: o, close: c,
      high: Math.max(o, c) + 0.7, low: Math.min(o, c) - 0.7, volume: 5 + i % 9 });
  }
  const bodyW = Math.max(slot * 0.7, 3);
  return {
    candles, startIndex: 0,
    indexToX: (gi: number, first: number) => 8 + (gi - first) * slot,
    priceToY: (p: number) => 500 - p * 2,
    morphAt: (i: number, c: any) => c,
    candleBodyWidth: bodyW, wickWidth: Math.max(1, bodyW * 0.15),
    colors: { bullish: '#0a0', bearish: '#a00', bullishWick: '#0b0',
              bearishWick: '#b00', bullishBorder: '#070', bearishBorder: '#700' },
  };
}

function bench(fn: (ctx: any, a: any) => void, a: any, iters: number) {
  const warm = 40, ctx = new NullCtx();
  for (let i = 0; i < warm; i++) fn(ctx, a);
  const t: number[] = [];
  for (let r = 0; r < 7; r++) {
    const t0 = performance.now();
    for (let i = 0; i < iters; i++) { ctx.rects = 0; fn(ctx, a); }
    t.push((performance.now() - t0) / iters);
  }
  t.sort((x, y) => x - y);
  const med = t[3];
  ctx.strokes = ctx.fills = ctx.fillRects = ctx.strokeRects = 0;
  ctx.styleWrites = 0;
  fn(ctx, a);
  const calls = ctx.strokes + ctx.fills + ctx.fillRects + ctx.strokeRects;
  return { med, calls, styles: ctx.styleWrites };
}

const out: any = {};
for (const [label, n, slot] of [
  ['240 bars @6px (typical pane)', 240, 6],
  ['960 bars @1.6px (zoomed out)', 960, 1.6 - 0.8 * 0.75],
  ['4000 bars @0.62px (MT5 deep zoom-out)', 4000, 0.62],
] as const) {
  const a = makeCase(n, slot);
  const legacy = bench(legacyPaint, a, 200);
  const batched = bench((ctx, aa) => paintCandleBodies({ ...aa, ctx }), a, 200);
  out[label] = {
    legacy_ms_per_frame: +legacy.med.toFixed(3),
    batched_ms_per_frame: +batched.med.toFixed(3),
    js_cost_reduction: `${(legacy.med / Math.max(batched.med, 1e-6)).toFixed(1)}x`,
    canvas_calls_legacy: legacy.calls,
    canvas_calls_batched: batched.calls,
    style_writes_legacy: legacy.styles,
    style_writes_batched: batched.styles,
  };
}
console.log(JSON.stringify(out, null, 2));
