// ============================================================================
// depth/DepthHeatRenderer.ts — the Depth Heat canvas renderer (F1, H5).
//
// Canvas 2D, DECOUPLED FROM REACT STATE, driven by its own rAF loop
// (plan §5.2): finalized columns are bulk-blitted through an offscreen
// ImageData + LUT; only the visible viewport renders; the live column is
// patched in place. Frames never allocate when nothing changed (dirty flag).
// ============================================================================

import {
  buildLut, cutoffValues, sizeToIndex,
  type DepthEventMsg, type DepthHeatSettings, type TradeEventMsg,
} from './depthHeatTypes';

interface FinalColumn {
  tsMs: number;
  keys: Float64Array;     // sorted price keys
  sizes: Float64Array;    // size per key
}

interface Dot { tsMs: number; price: number; size: number; buy: boolean }

const MAX_COLUMNS = 14400;   // ring bound, matches the engine grid
const TARGET_ROWS = 220;     // price resolution of the offscreen blit

export class DepthHeatRenderer {
  // data
  private cols: FinalColumn[] = [];
  private state = new Map<number, number>();     // carried book field
  private stateTs = new Map<number, number>();
  private cur = new Map<number, number>();       // live column overlay
  private curTsMs: number | null = null;
  private dots: Dot[] = [];
  private bookBid: number | null = null;
  private bookAsk: number | null = null;
  private lastEventTs = 0;

  // view
  private msPerPx = 8;             // time zoom
  private rightOffsetPx = 40;      // live edge sits this far from the right
  private follow = true;           // auto-scroll with the live edge
  private priceCenter: number | null = null;
  private pxPerUnit: number | null = null;   // null = auto price fit
  private basePpu: number | null = null;     // first-fit zoom reference (S4)
  private recenterTarget: number | null = null;  // S9 eased recentering
  private hover: { x: number; y: number } | null = null;
  private syncedCrosshair: number | null = null;
  // Last painted viewport — the COB column (S8) pixel-aligns against it.
  private viewLo = 0;
  private viewHi = 1;
  private viewCentre = 0.5;
  private viewPpu = 1;
  private viewH = 0;
  private viewVersion = 0;         // bumped on every painted frame

  // colour
  private settings: DepthHeatSettings;
  private lut: Uint8ClampedArray;
  private lo = 0;
  private hi = 1;
  private sizeSample: number[] = [];

  // canvas plumbing
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private off: HTMLCanvasElement;
  private offCtx: CanvasRenderingContext2D;
  private raf = 0;
  private dirty = true;
  private dpr = 1;
  private cssW = 0;
  private cssH = 0;
  private disposed = false;

  onHoverTime: ((tsMs: number | null) => void) | null = null;

  constructor(settings: DepthHeatSettings) {
    this.settings = settings;
    this.lut = buildLut(settings);
    this.off = document.createElement('canvas');
    this.offCtx = this.off.getContext('2d')!;
  }

  // ── public API ─────────────────────────────────────────────────────────

  attach(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    const ro = new ResizeObserver(() => this.resize());
    ro.observe(canvas);
    this.resize();
    const loop = () => {
      if (this.disposed) return;
      if (this.dirty) this.paint();
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.canvas = null;
    this.ctx = null;
  }

  private resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.dpr = window.devicePixelRatio || 1;
    this.cssW = Math.max(50, rect.width);
    this.cssH = Math.max(50, rect.height);
    this.canvas.width = Math.round(this.cssW * this.dpr);
    this.canvas.height = Math.round(this.cssH * this.dpr);
    this.dirty = true;
  }

  setSettings(s: DepthHeatSettings) {
    this.settings = s;
    // LUT rebuild on change, never per frame (auto smoothing resolves the
    // shade count from the current zoom — S4).
    this.lut = buildLut(s, this.effSmoothing());
    this.dirty = true;
  }

  /** S4: resolved vertical-smoothing shade count (0 = no quantization).
   * Auto = zoom-adaptive: the tighter the price zoom, the finer the bands. */
  private effSmoothing(): number {
    const s = this.settings;
    if (s.smoothingMode === 'none') return 0;
    if (s.smoothingMode === 'manual') {
      return Math.min(20, Math.max(0, Math.round(s.smoothing)));
    }
    const ppu = this.pxPerUnit ?? this.basePpu ?? 0;
    if (!ppu || !this.basePpu) return 24;      // default zoom: gentle bands
    const zoom = Math.max(0.02, ppu / this.basePpu);
    return Math.min(64, Math.max(4, Math.round(24 / Math.sqrt(zoom))));
  }

  setSyncedCrosshair(tsMs: number | null) {
    if (this.syncedCrosshair !== tsMs) {
      this.syncedCrosshair = tsMs;
      this.dirty = true;
    }
  }

  /** Bulk history ingest (pane open, or a loaded recording). Deterministic
   * fold over the events; the dot trail belongs to the new timeline. */
  ingestHistory(events: DepthEventMsg[]) {
    this.cols = [];
    this.state.clear();
    this.stateTs.clear();
    this.cur.clear();
    this.curTsMs = null;
    this.sizeSample = [];
    this.dots = [];
    for (const ev of events) this.foldEvent(ev, true);
    this.flushColumn();
    this.recalcCutoffs();
    this.follow = true;
    this.priceCenter = null;
    this.pxPerUnit = null;
    this.dirty = true;
  }

  /** One live depth frame (already coalesced engine-side). */
  applyDepth(ev: DepthEventMsg) {
    this.foldEvent(ev, false);
    if (this.sizeSample.length > 60000) {
      this.sizeSample = this.sizeSample.slice(-30000);
      this.recalcCutoffs();
    }
    this.dirty = true;
  }

  addTrade(t: TradeEventMsg) {
    if (t.size <= (this.settings.dotMinSize || 0)) return;
    this.dots.push({
      tsMs: t.ts * 1000, price: t.price, size: t.size,
      buy: t.side === 'BUY' || t.side === 'INFERRED-BUY',
    });
    if (this.dots.length > 5000) this.dots.splice(0, this.dots.length - 4000);
    // S9: trade-following recentering tracks the last print.
    if (this.settings.recenterMode === 'trades') this.requestRecenter(t.price);
    this.dirty = true;
  }

  setBook(bestBid: number | null, bestAsk: number | null) {
    this.bookBid = bestBid;
    this.bookAsk = bestAsk;
    // S9: BBO recentering keeps the spread band in frame, inside tolerance.
    if (this.settings.recenterMode === 'bbo') {
      const mid = bestBid !== null && bestAsk !== null
        ? (bestBid + bestAsk) / 2
        : (bestBid ?? bestAsk);
      if (mid !== null) this.requestRecenter(mid);
    }
    this.dirty = true;
  }

  /** S9 auto-recentering: engage only when the anchor drifts beyond the
   * tolerance fraction of the visible half-range (prevents jitter). The
   * actual motion is eased in the paint loop; manual interaction cancels. */
  private requestRecenter(anchorPrice: number) {
    if (this.priceCenter === null || this.pxPerUnit === null) return;
    const half = this.cssH / 2 / this.pxPerUnit;
    const tol = half * Math.min(90, Math.max(1, this.settings.recenterTolerance)) / 100;
    if (Math.abs(anchorPrice - this.priceCenter) > tol) {
      this.recenterTarget = anchorPrice;
      this.dirty = true;
    }
  }

  // ── interaction ────────────────────────────────────────────────────────

  wheel(dx: number, deltaY: number, shift: boolean) {
    this.recenterTarget = null;   // manual navigation wins over S9 easing
    if (shift) {
      // price zoom around the viewport centre
      const z = Math.exp(-deltaY * 0.001);
      this.pxPerUnit = (this.pxPerUnit ?? this.autoPxPerUnit()) * z;
      if (this.settings.smoothingMode === 'auto') {
        this.lut = buildLut(this.settings, this.effSmoothing());
      }
    } else {
      const z = Math.exp(deltaY * 0.001);
      this.msPerPx = Math.min(120, Math.max(0.5, this.msPerPx * z));
      this.follow = false;        // manual zoom disengages autoscroll
    }
    void dx;
    this.dirty = true;
  }

  drag(dxPx: number, dyPx: number) {
    this.recenterTarget = null;
    this.follow = false;
    this.priceCenter = (this.priceCenter ?? this.autoPriceCenter())
      + dyPx / (this.pxPerUnit ?? this.autoPxPerUnit());
    // dragging left reveals history: shift the right edge forward in time
    this.rightOffsetPx += dxPx;
    this.rightOffsetPx = Math.max(-this.cssW, this.rightOffsetPx);
    this.dirty = true;
  }

  recenter() {
    this.follow = true;
    this.priceCenter = null;
    this.pxPerUnit = null;
    this.recenterTarget = null;
    this.dirty = true;
  }

  setHover(x: number | null, y: number | null) {
    this.hover = x === null || y === null ? null : { x, y };
    if (this.onHoverTime) {
      this.onHoverTime(this.hover ? this.xToTs(this.hover.x) : null);
    }
    this.dirty = true;
  }

  // ── data folding (mirror of engine/orderflow/grid.py) ──────────────────

  private columnMs() { return 1000; }

  private foldEvent(ev: DepthEventMsg, sampling: boolean) {
    const tsMs = Math.floor(ev.ts * 1000);
    const cs = Math.floor(tsMs / this.columnMs()) * this.columnMs();
    if (this.curTsMs === null) this.curTsMs = cs;
    while (cs > this.curTsMs!) this.advanceColumn();
    for (const [p, s] of ev.bids) this.patchLevel(p, s, sampling);
    for (const [p, s] of ev.asks) this.patchLevel(p, s, sampling);
    this.lastEventTs = Math.max(this.lastEventTs, tsMs);
  }

  private patchLevel(price: number, size: number, sampling: boolean) {
    const key = Math.round(price * 1e6) / 1e6;
    this.cur.set(key, size);      // last value wins inside the column
    if (size > 0 && sampling && this.sizeSample.length < 60000) {
      this.sizeSample.push(size);
    }
  }

  private advanceColumn() {
    this.flushColumn();
    this.curTsMs = (this.curTsMs ?? 0) + this.columnMs();
  }

  private flushColumn() {
    if (this.curTsMs === null) return;
    for (const [k, s] of this.cur) {
      if (s <= 0) {
        this.state.delete(k);
        this.stateTs.delete(k);
      } else {
        this.state.set(k, s);
        this.stateTs.set(k, this.curTsMs);
      }
    }
    this.cur.clear();
    // bound carried state exactly like the engine (stalest dropped first)
    if (this.state.size > 4096) {
      const keep = [...this.stateTs.entries()]
        .sort((a, b) => b[1] - a[1]).slice(0, 4096)
        .map(([k]) => k);
      const keepSet = new Set(keep);
      for (const k of [...this.state.keys()]) {
        if (!keepSet.has(k)) {
          this.state.delete(k);
          this.stateTs.delete(k);
        }
      }
    }
    const keys = [...this.state.keys()].sort((a, b) => a - b);
    const sizes = keys.map((k) => this.state.get(k)!);
    this.cols.push({
      tsMs: this.curTsMs,
      keys: Float64Array.from(keys),
      sizes: Float64Array.from(sizes),
    });
    if (this.cols.length > MAX_COLUMNS) {
      this.cols.splice(0, this.cols.length - MAX_COLUMNS);
    }
  }

  private recalcCutoffs() {
    [this.lo, this.hi] = cutoffValues(
      this.sizeSample, this.settings.cutoffMode,
      this.settings.cutoffLower, this.settings.cutoffUpper);
  }

  /** Recompute cut-offs from the rolling session sample (called by pane). */
  refreshCutoffs() {
    this.recalcCutoffs();
    this.dirty = true;
  }

  /** The resolved cut-off sizes [lo, hi] — the settings window shows them
   * next to the percentile controls so the mapping stays tangible. */
  getCutoffs(): [number, number] {
    return [this.lo, this.hi];
  }

  /** Viewport metrics for the COB column (S8): the ladder pixel-aligns its
   * rows with the heatmap's price axis. `version` bumps every painted frame
   * so the ladder knows when to redraw without sharing React state. */
  getViewMetrics(): {
    lo: number; hi: number; centre: number; ppu: number;
    cssH: number; version: number; yOf: (p: number) => number;
  } {
    const centre = this.viewCentre, ppu = this.viewPpu, h = this.viewH;
    return {
      lo: this.viewLo, hi: this.viewHi, centre, ppu, cssH: h,
      version: this.viewVersion,
      yOf: (p: number) => h / 2 - (p - centre) * ppu,
    };
  }

  // ── coordinate mapping ─────────────────────────────────────────────────

  private liveEdgeMs(): number {
    return this.cols.length
      ? this.cols[this.cols.length - 1].tsMs + this.columnMs()
      : Date.now();
  }

  private rightEdgeTs(): number {
    return this.liveEdgeMs() + this.rightOffsetPx * this.msPerPx;
  }

  private tsToX(tsMs: number): number {
    return this.cssW - (this.rightEdgeTs() - tsMs) / this.msPerPx;
  }

  private xToTs(x: number): number {
    return this.rightEdgeTs() - (this.cssW - x) * this.msPerPx;
  }

  private visiblePriceRange(): [number, number] {
    if (this.priceCenter !== null && this.pxPerUnit !== null) {
      const half = this.cssH / 2 / this.pxPerUnit;
      return [this.priceCenter - half, this.priceCenter + half];
    }
    // auto fit over the recent window's levels + BBO
    let lo = Infinity, hi = -Infinity;
    const from = this.liveEdgeMs() - Math.min(this.cssW, 600) * this.msPerPx;
    for (let i = this.cols.length - 1; i >= 0; i--) {
      const c = this.cols[i];
      if (c.tsMs < from) break;
      if (c.keys.length) {
        lo = Math.min(lo, c.keys[0]);
        hi = Math.max(hi, c.keys[c.keys.length - 1]);
      }
    }
    if (this.bookBid !== null) lo = Math.min(lo, this.bookBid);
    if (this.bookAsk !== null) hi = Math.max(hi, this.bookAsk);
    if (!isFinite(lo) || !isFinite(hi)) { lo = 0; hi = 1; }
    if (hi <= lo) hi = lo + 1;
    const pad = (hi - lo) * 0.08;
    return [lo - pad, hi + pad];
  }

  private autoPriceCenter(): number {
    const [lo, hi] = this.visiblePriceRange();
    return (lo + hi) / 2;
  }

  private autoPxPerUnit(): number {
    const [lo, hi] = this.visiblePriceRange();
    return this.cssH / Math.max(hi - lo, 1e-9);
  }

  private priceToY(p: number, lo: number, ppu: number): number {
    return this.cssH / 2 - (p - (this.priceCenter ?? (lo + this.cssH / 2 / ppu))) * ppu;
  }

  // ── painting ───────────────────────────────────────────────────────────

  private paint() {
    this.dirty = false;
    const ctx = this.ctx;
    if (!ctx || !this.cssW || !this.cssH) return;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.fillStyle = '#0b0e11';
    ctx.fillRect(0, 0, this.cssW, this.cssH);
    if (!this.cols.length) return;

    // S9 eased recentering: glide toward the anchor, keep frames coming
    // until snapped; manual interaction already cancelled the target.
    if (this.recenterTarget !== null && this.priceCenter !== null) {
      const d = this.recenterTarget - this.priceCenter;
      const snap = Math.max(
        1e-9, (this.cssH / 2 / (this.pxPerUnit ?? 1)) / 240);
      if (Math.abs(d) <= snap) {
        this.priceCenter = this.recenterTarget;
        this.recenterTarget = null;
      } else {
        this.priceCenter += d * 0.14;
        this.dirty = true;
      }
    }

    const [pLo, pHi] = this.visiblePriceRange();
    const ppu = this.pxPerUnit ?? this.cssH / Math.max(pHi - pLo, 1e-9);
    if (this.basePpu === null) this.basePpu = ppu;   // S4 zoom reference
    const centre = this.priceCenter ?? (pLo + pHi) / 2;
    const yOf = (p: number) => this.cssH / 2 - (p - centre) * ppu;
    // Publish the viewport for the COB column (S8).
    this.viewLo = pLo; this.viewHi = pHi;
    this.viewCentre = centre; this.viewPpu = ppu; this.viewH = this.cssH;
    this.viewVersion += 1;

    // visible columns
    const t0 = this.xToTs(0);
    const t1 = this.xToTs(this.cssW);
    let i0 = this.lowerBound(t0), i1 = this.lowerBound(t1);
    i1 = Math.min(i1, this.cols.length);
    if (this.follow && this.rightOffsetPx <= 0) {
      this.rightOffsetPx = 0;    // stay pinned while following
    }

    if (this.settings.view === 'footprint') {
      // Classic order-flow footprint: bid×ask executed volume per price
      // zone per time bucket, imbalance-highlighted.
      this.paintFootprint(ctx, t0, t1, pLo, pHi, yOf);
    } else {
      const nCols = Math.max(1, i1 - i0);
      const rows = TARGET_ROWS;
      const rowStep = (pHi - pLo) / rows;
      if (this.off.width !== nCols || this.off.height !== rows) {
        this.off.width = nCols;
        this.off.height = rows;
      }
      const img = this.offCtx.createImageData(nCols, rows);
      const data = img.data;
      for (let c = 0; c < nCols; c++) {
        const col = this.cols[i0 + c];
        const { keys, sizes } = col;
        for (let li = 0; li < keys.length; li++) {
          const p = keys[li];
          if (p < pLo || p > pHi) continue;
          const s = sizes[li];
          if (s <= 0) continue;
          const r = Math.min(rows - 1,
            Math.max(0, Math.floor((pHi - p) / rowStep)));
          const idx = sizeToIndex(s, this.lo, this.hi);
          const o = (r * nCols + c) * 4;
          const l = idx * 4;
          // max-brighten overlaps so dense rows never darken
          if (this.lut[l] > data[o] || data[o + 3] === 0) {
            data[o] = this.lut[l];
            data[o + 1] = this.lut[l + 1];
            data[o + 2] = this.lut[l + 2];
            data[o + 3] = 255;
          }
        }
      }
      this.offCtx.putImageData(img, 0, 0);

      const x0 = this.tsToX(this.cols[i0].tsMs);
      const x1 = this.tsToX(this.cols[i0].tsMs + nCols * this.columnMs());
      const y0 = yOf(pHi), y1 = yOf(pLo);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(this.off, x0, y0, Math.max(1, x1 - x0), Math.max(1, y1 - y0));

      // volume dots (S7): gradient / solid / pie-by-aggressor-split
      if (this.settings.dots) this.drawDots(ctx, t0, t1, pLo, pHi, yOf);
    }

    // BBO lines (S9)
    const bbo = (p: number | null, color: string) => {
      if (p === null || p < pLo || p > pHi) return;
      const y = yOf(p);
      ctx.strokeStyle = color;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.cssW, y);
      ctx.stroke();
      ctx.setLineDash([]);
    };
    bbo(this.bookBid, 'rgba(38, 166, 154, 0.8)');
    bbo(this.bookAsk, 'rgba(239, 83, 80, 0.8)');

    // synced crosshair from sibling panes (hard time sync, H5)
    if (this.syncedCrosshair !== null) {
      const x = this.tsToX(this.syncedCrosshair);
      if (x >= 0 && x <= this.cssW) {
        ctx.strokeStyle = 'rgba(150, 160, 175, 0.55)';
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, this.cssH);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // local crosshair + price/time labels
    if (this.hover) {
      const { x, y } = this.hover;
      ctx.strokeStyle = 'rgba(150, 160, 175, 0.45)';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(x, 0); ctx.lineTo(x, this.cssH);
      ctx.moveTo(0, y); ctx.lineTo(this.cssW, y);
      ctx.stroke();
      ctx.setLineDash([]);
      const pAt = centre + (this.cssH / 2 - y) / ppu;
      ctx.fillStyle = 'rgba(30, 34, 41, 0.95)';
      ctx.fillRect(this.cssW - 74, y - 9, 72, 18);
      ctx.fillStyle = '#d1d4dc';
      ctx.font = '10px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(pAt.toPrecision(6), this.cssW - 6, y + 3);
      const t = new Date(this.xToTs(x));
      const label = t.toISOString().slice(11, 19);
      ctx.fillRect(x - 28, this.cssH - 16, 56, 15);
      ctx.textAlign = 'center';
      ctx.fillText(label, x, this.cssH - 5);
    }

    // time axis ticks
    ctx.fillStyle = 'rgba(150,160,175,0.7)';
    ctx.font = '9px monospace';
    ctx.textAlign = 'left';
    const stepMs = this.niceTimeStep(this.cssW * this.msPerPx);
    const first = Math.ceil(t0 / stepMs) * stepMs;
    for (let t = first; t <= t1; t += stepMs) {
      const x = this.tsToX(t);
      const d = new Date(t);
      ctx.fillText(d.toISOString().slice(11, 19), x + 2, this.cssH - 4);
      ctx.fillRect(x, this.cssH - 14, 1, 4);
    }
  }

  /** Classic order-flow footprint: executed volume split by aggressor side
   * per price zone (rows) and time bucket (columns). Bucket width adapts to
   * the time zoom; zones snap to nice price steps. Imbalanced zones (≥3:1)
   * get a tinted backdrop; wide buckets print sell×buy figures. Prints
   * without a side never enter — the view stays honest about its data. */
  private paintFootprint(
    ctx: CanvasRenderingContext2D,
    t0: number, t1: number, pLo: number, pHi: number,
    yOf: (p: number) => number,
  ) {
    const BUCKETS = [5000, 15000, 30000, 60000, 300000, 900000, 3600000];
    const bucket = BUCKETS.find((b) => b / this.msPerPx >= 72) ?? 3600000;
    const span = pHi - pLo;
    const NICE = [0.001, 0.002, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.25, 0.5,
      1, 2, 2.5, 5, 10, 20, 25, 50, 100, 250, 500, 1000];
    const zstep = NICE.find((n) => span / n <= 20) ?? span / 20;

    // aggregate prints into (bucket × zone) cells
    const cells = new Map<string, { b: number; s: number }>();
    const bucketTotals = new Map<number, { b: number; s: number }>();
    let maxV = 0, prints = 0;
    for (const d of this.dots) {
      if (d.tsMs < t0 || d.tsMs > t1 || d.price < pLo || d.price > pHi) continue;
      prints += 1;
      const bk = Math.floor(d.tsMs / bucket);
      const zk = Math.floor(d.price / zstep);
      const key = bk + ':' + zk;
      let c = cells.get(key);
      if (!c) { c = { b: 0, s: 0 }; cells.set(key, c); }
      if (d.buy) c.b += d.size; else c.s += d.size;
      maxV = Math.max(maxV, c.b, c.s);
      let bt = bucketTotals.get(bk);
      if (!bt) { bt = { b: 0, s: 0 }; bucketTotals.set(bk, bt); }
      if (d.buy) bt.b += d.size; else bt.s += d.size;
    }

    if (!prints) {
      // Honest empty state: a footprint IS executed prints with sides.
      ctx.fillStyle = '#5c6672';
      ctx.font = '11px ui-monospace, Menlo, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('no side-stamped prints in view', this.cssW / 2, this.cssH / 2 - 8);
      ctx.font = '10px ui-monospace, Menlo, monospace';
      ctx.fillText('the footprint builds from executed trades (demo and', this.cssW / 2, this.cssH / 2 + 10);
      ctx.fillText('crypto feeds carry sides; sources without prints stay blank)', this.cssW / 2, this.cssH / 2 + 24);
      return;
    }

    const fmtV = (v: number) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k`
      : v >= 100 ? v.toFixed(0) : v >= 10 ? v.toFixed(0) : v.toFixed(1));
    const rowH = Math.min(22, Math.max(9, zstep * this.viewPpu * 0.85));

    const first = Math.floor(t0 / bucket) * bucket;
    for (let b = first; b <= t1; b += bucket) {
      const x0 = this.tsToX(b), x1 = this.tsToX(b + bucket);
      if (x1 < -4 || x0 > this.cssW + 4) continue;
      const w = x1 - x0;
      const bk = Math.floor(b / bucket);
      const showNums = w >= 92;
      const half = w / 2 - 4;

      // column frame
      ctx.strokeStyle = 'rgba(30, 36, 47, 0.95)';
      ctx.beginPath();
      ctx.moveTo(Math.round(x1) + 0.5, 0);
      ctx.lineTo(Math.round(x1) + 0.5, this.cssH);
      ctx.stroke();

      for (const [key, c] of cells) {
        const [kb, kz] = key.split(':');
        if (Number(kb) !== bk) continue;
        const zk = Number(kz);
        const y = yOf((zk + 0.5) * zstep);
        if (y < -rowH || y > this.cssH + rowH) continue;
        const yTop = y - (rowH - 2) / 2;

        // imbalance backdrop (≥ 3:1 one way)
        const imb = c.b >= c.s * 3 && c.b > 0 ? 1
          : c.s >= c.b * 3 && c.s > 0 ? -1 : 0;
        if (imb !== 0) {
          ctx.fillStyle = imb > 0
            ? 'rgba(38, 166, 154, 0.13)' : 'rgba(239, 83, 80, 0.13)';
          ctx.fillRect(x0 + 2, yTop, w - 4, rowH - 2);
        }

        // split bars: sells left (red), buys right (green)
        const midX = x0 + w / 2;
        const sW = maxV > 0 ? (c.s / maxV) * half : 0;
        const bW = maxV > 0 ? (c.b / maxV) * half : 0;
        ctx.fillStyle = 'rgba(239, 83, 80, 0.75)';
        ctx.fillRect(midX - 1 - sW, yTop, sW, rowH - 2);
        ctx.fillStyle = 'rgba(38, 166, 154, 0.75)';
        ctx.fillRect(midX + 1, yTop, bW, rowH - 2);

        if (showNums) {
          ctx.font = '9px ui-monospace, Menlo, monospace';
          ctx.textAlign = 'right';
          ctx.fillStyle = imb < 0 ? '#ffc9c5' : '#b2807d';
          ctx.fillText(fmtV(c.s), midX - 4, y + 3);
          ctx.textAlign = 'left';
          ctx.fillStyle = imb > 0 ? '#b8f2e9' : '#7fa8a1';
          ctx.fillText(fmtV(c.b), midX + 4, y + 3);
        }
      }

      // per-bucket delta + volume footer
      const bt = bucketTotals.get(bk);
      if (bt) {
        const delta = bt.b - bt.s;
        ctx.font = '9px ui-monospace, Menlo, monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = delta > 0 ? '#26a69a' : delta < 0 ? '#ef5350' : '#8b96a5';
        ctx.fillText(
          `Δ${delta >= 0 ? '+' : '−'}${fmtV(Math.abs(delta))} · ${fmtV(bt.b + bt.s)}`,
          x0 + w / 2, this.cssH - 18);
      }
    }
  }

  /** Volume dots (S7). Three honest drawing types:
   *  - gradient: radial glow centred on the print (default)
   *  - solid:    flat discs
   *  - pie:      prints are aggregated per price-time cell and drawn as a
   *              disc split by aggressor-side volume (buy arc vs sell arc). */
  private drawDots(
    ctx: CanvasRenderingContext2D,
    t0: number, t1: number, pLo: number, pHi: number,
    yOf: (p: number) => number,
  ) {
    const alpha = Math.min(1, Math.max(0, this.settings.dotAlpha));
    if (alpha <= 0) return;
    const scale = this.settings.dotScale;
    const BUY = 'rgba(38, 166, 154, 0.95)';
    const SELL = 'rgba(239, 83, 80, 0.95)';
    ctx.globalAlpha = alpha;

    if (this.settings.dotType === 'pie') {
      // Aggregate visible prints into price-time cells (one disc per cell).
      const cellH = Math.max(3, this.cssH / 90);
      const cellW = Math.max(4, 1000 / this.msPerPx);   // one column wide
      const cells = new Map<string, {
        x: number; y: number; n: number; size: number; buy: number; sell: number;
      }>();
      for (const d of this.dots) {
        if (d.tsMs < t0 || d.tsMs > t1 || d.price < pLo || d.price > pHi) continue;
        const x = this.tsToX(d.tsMs), y = yOf(d.price);
        const key = `${Math.round(x / cellW)}:${Math.round(y / cellH)}`;
        let c = cells.get(key);
        if (!c) { c = { x: 0, y: 0, n: 0, size: 0, buy: 0, sell: 0 }; cells.set(key, c); }
        c.x += x; c.y += y; c.n += 1; c.size += d.size;
        if (d.buy) c.buy += d.size; else c.sell += d.size;
      }
      for (const c of cells.values()) {
        const cx = c.x / c.n, cy = c.y / c.n;
        const r = Math.min(16, Math.max(2.5, Math.sqrt(c.size) * 0.9 * scale));
        const total = c.buy + c.sell;
        const buyFrac = total > 0 ? c.buy / total : 0.5;
        const a0 = -Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, a0, a0 + buyFrac * Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = BUY;
        ctx.fill();
        if (buyFrac < 1) {
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, r, a0 + buyFrac * Math.PI * 2, a0 + Math.PI * 2);
          ctx.closePath();
          ctx.fillStyle = SELL;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(0,0,0,0.6)';
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      return;
    }

    const gradient = this.settings.dotType === 'gradient';
    for (const d of this.dots) {
      if (d.tsMs < t0 || d.tsMs > t1) continue;
      if (d.price < pLo || d.price > pHi) continue;
      const r = Math.min(14, Math.max(1.5, Math.sqrt(d.size) * 0.9 * scale));
      const x = this.tsToX(d.tsMs), y = yOf(d.price);
      if (gradient) {
        const g = ctx.createRadialGradient(x, y, r * 0.15, x, y, r);
        if (d.buy) {
          g.addColorStop(0, 'rgba(178, 255, 244, 0.95)');
          g.addColorStop(0.55, 'rgba(38, 166, 154, 0.85)');
          g.addColorStop(1, 'rgba(38, 166, 154, 0.15)');
        } else {
          g.addColorStop(0, 'rgba(255, 205, 196, 0.95)');
          g.addColorStop(0.55, 'rgba(239, 83, 80, 0.85)');
          g.addColorStop(1, 'rgba(239, 83, 80, 0.15)');
        }
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = d.buy ? BUY : SELL;
        ctx.fill();
      }
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0,0,0,0.6)';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  private lowerBound(tsMs: number): number {
    let lo = 0, hi = this.cols.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (this.cols[mid].tsMs < tsMs) lo = mid + 1; else hi = mid;
    }
    return Math.max(0, lo - 1);
  }

  private niceTimeStep(spanMs: number): number {
    const steps = [1000, 5000, 15000, 30000, 60000, 300000, 900000,
      1800000, 3600000, 14400000, 86400000];
    for (const s of steps) if (spanMs / s <= 12) return s;
    return 86400000;
  }
}
