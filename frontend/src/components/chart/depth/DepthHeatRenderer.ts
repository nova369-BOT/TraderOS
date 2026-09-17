// ============================================================================
// depth/DepthHeatRenderer.ts — the Depth Heat canvas renderer (F1, H5, v2).
//
// Canvas 2D, DECOUPLED FROM REACT STATE, driven by its own rAF loop
// (plan §5.2): finalized columns are bulk-blitted through an offscreen
// intensity+side field + per-side LUTs; only the visible viewport renders.
// Frames never allocate when nothing changed (dirty flag).
//
// v2 (02-visual-excellence.md V1+V2): side-aware ramp families (deepdom /
// bookmap), perceptual γ, glow pass over the hottest levels, permanent
// right price axis with BBO chips + last-price box, dotted time grid,
// stepped bid/ask path, sphere bubbles with big-trade tags, trade-derived
// candles and the split volume strip.
// ============================================================================

import {
  cutoffValues, sizeToIndex,
  type DepthEventMsg, type DepthHeatSettings, type TradeEventMsg,
} from './depthHeatTypes';
import { buildLuts } from './heatVisuals';
import { paintPriceAxis, paintTimeGrid } from './priceAxis';
import {
  paintBubbles, paintCandles, paintPath,
  type PrintDot,
} from './pathBubbles';
import { paintGauges, paintSubpanes, SUB_H } from './subpanes';

interface FinalColumn {
  tsMs: number;
  keys: Float64Array;     // sorted price keys
  sizes: Float64Array;    // size per key
  sides: Uint8Array;      // 0 = bid side, 1 = ask side (per key)
  bb: number | null;      // carried best bid / ask at finalize time (V2 path)
  ba: number | null;
}

const MAX_COLUMNS = 14400;   // ring bound, matches the engine grid
const TARGET_ROWS = 220;     // price resolution of the offscreen blit
const AXIS_W = 58;           // permanent right price axis gutter (V1)
const GLOW_INDEX = 228;      // LUT index above which levels bloom (V1)

export class DepthHeatRenderer {
  // data
  private cols: FinalColumn[] = [];
  private state = new Map<number, number>();     // carried book field
  private stateSide = new Map<number, number>(); // which side carries it
  private stateTs = new Map<number, number>();
  private cur = new Map<number, number>();       // live column overlay
  private curSide = new Map<number, number>();
  private curTsMs: number | null = null;
  private dots: PrintDot[] = [];
  private bookBid: number | null = null;
  private bookAsk: number | null = null;
  private lastTradePrice: number | null = null;
  private lastTradeBuy = true;
  private recentSizes: number[] = [];   // rolling window for the big-trade median
  private bigMedian = 0;
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
  private luts: { ask: Uint8ClampedArray; bid: Uint8ClampedArray };
  private lo = 0;
  private hi = 1;
  private sizeSample: number[] = [];

  // canvas plumbing
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private off: HTMLCanvasElement;
  private offCtx: CanvasRenderingContext2D;
  private glow: HTMLCanvasElement;
  private glowCtx: CanvasRenderingContext2D;
  private raf = 0;
  private dirty = true;
  private dpr = 1;
  private cssW = 0;
  private cssH = 0;
  private disposed = false;

  onHoverTime: ((tsMs: number | null) => void) | null = null;

  constructor(settings: DepthHeatSettings) {
    this.settings = settings;
    this.luts = buildLuts(settings);
    this.off = document.createElement('canvas');
    this.offCtx = this.off.getContext('2d')!;
    this.glow = document.createElement('canvas');
    this.glowCtx = this.glow.getContext('2d')!;
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

  /** The heat field's right edge: the price axis gutter is permanent. */
  private fieldW(): number {
    return Math.max(50, this.cssW - AXIS_W);
  }

  /** V3: the bottom context stack (volume + CVD) reserves real height so
   * the field and the strips never fight for pixels. */
  private subH(): number {
    return this.settings.subpanes ? SUB_H : 0;
  }

  /** The field's drawable height (full canvas minus the context stack). */
  private fieldH(): number {
    return Math.max(40, this.cssH - this.subH());
  }

  setSettings(s: DepthHeatSettings) {
    this.settings = s;
    // LUT rebuild on change, never per frame (auto smoothing resolves the
    // shade count from the current zoom — S4).
    this.luts = buildLuts(s, this.effSmoothing());
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
    this.stateSide.clear();
    this.stateTs.clear();
    this.cur.clear();
    this.curSide.clear();
    this.curTsMs = null;
    this.sizeSample = [];
    this.dots = [];
    this.recentSizes = [];
    this.bigMedian = 0;
    this.lastTradePrice = null;
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
    const buy = t.side === 'BUY' || t.side === 'INFERRED-BUY';
    this.dots.push({ tsMs: t.ts * 1000, price: t.price, size: t.size, buy });
    if (this.dots.length > 5000) this.dots.splice(0, this.dots.length - 4000);
    // rolling median of print sizes — the big-trade calibration (V2)
    this.recentSizes.push(t.size);
    if (this.recentSizes.length > 1024) {
      this.recentSizes.splice(0, this.recentSizes.length - 512);
    }
    if (this.recentSizes.length % 64 === 0 || this.bigMedian === 0) {
      const s = [...this.recentSizes].sort((a, b) => a - b);
      this.bigMedian = s[Math.floor(s.length / 2)] ?? 0;
    }
    this.lastTradePrice = t.price;
    this.lastTradeBuy = buy;
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
    const half = this.fieldH() / 2 / this.pxPerUnit;
    const tol = half * Math.min(90, Math.max(1, this.settings.recenterTolerance)) / 100;
    if (Math.abs(anchorPrice - this.priceCenter) > tol) {
      this.recenterTarget = anchorPrice;
      this.dirty = true;
    }
  }

  // ── interaction ───────────────────────────────────────────────────────

  wheel(dx: number, deltaY: number, shift: boolean) {
    this.recenterTarget = null;   // manual navigation wins over S9 easing
    if (shift) {
      // price zoom around the viewport centre
      const z = Math.exp(-deltaY * 0.001);
      this.pxPerUnit = (this.pxPerUnit ?? this.autoPxPerUnit()) * z;
      if (this.settings.smoothingMode === 'auto') {
        this.luts = buildLuts(this.settings, this.effSmoothing());
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
    for (const [p, s] of ev.bids) this.patchLevel(p, s, 0, sampling);
    for (const [p, s] of ev.asks) this.patchLevel(p, s, 1, sampling);
    this.lastEventTs = Math.max(this.lastEventTs, tsMs);
  }

  private patchLevel(price: number, size: number, side: number, sampling: boolean) {
    const key = Math.round(price * 1e6) / 1e6;
    this.cur.set(key, size);      // last value wins inside the column
    if (size > 0) this.curSide.set(key, side);
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
        this.stateSide.delete(k);
        this.stateTs.delete(k);
      } else {
        this.state.set(k, s);
        this.stateSide.set(k, this.curSide.get(k) ?? 0);
        this.stateTs.set(k, this.curTsMs);
      }
    }
    this.cur.clear();
    this.curSide.clear();
    // bound carried state exactly like the engine (stalest dropped first)
    if (this.state.size > 4096) {
      const keep = [...this.stateTs.entries()]
        .sort((a, b) => b[1] - a[1]).slice(0, 4096)
        .map(([k]) => k);
      const keepSet = new Set(keep);
      for (const k of [...this.state.keys()]) {
        if (!keepSet.has(k)) {
          this.state.delete(k);
          this.stateSide.delete(k);
          this.stateTs.delete(k);
        }
      }
    }
    const keys = [...this.state.keys()].sort((a, b) => a - b);
    const sizes = keys.map((k) => this.state.get(k)!);
    const sides = keys.map((k) => this.stateSide.get(k) ?? 0);
    // V2 path lines: carried BBO at finalize time
    let bb: number | null = null, ba: number | null = null;
    for (let i = 0; i < keys.length; i++) {
      if (sides[i] === 0) bb = keys[i];              // keys ascending → last bid is best
      else { ba = ba === null ? keys[i] : ba; }      // first ask is best
    }
    this.cols.push({
      tsMs: this.curTsMs,
      keys: Float64Array.from(keys),
      sizes: Float64Array.from(sizes),
      sides: Uint8Array.from(sides),
      bb, ba,
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
    return this.fieldW() - (this.rightEdgeTs() - tsMs) / this.msPerPx;
  }

  private xToTs(x: number): number {
    return this.rightEdgeTs() - (this.fieldW() - x) * this.msPerPx;
  }

  private visiblePriceRange(): [number, number] {
    if (this.priceCenter !== null && this.pxPerUnit !== null) {
      const half = this.fieldH() / 2 / this.pxPerUnit;
      return [this.priceCenter - half, this.priceCenter + half];
    }
    // auto fit over the recent window's levels + BBO
    let lo = Infinity, hi = -Infinity;
    const from = this.liveEdgeMs() - Math.min(this.fieldW(), 600) * this.msPerPx;
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
    return this.fieldH() / Math.max(hi - lo, 1e-9);
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
        1e-9, (this.fieldH() / 2 / (this.pxPerUnit ?? 1)) / 240);
      if (Math.abs(d) <= snap) {
        this.priceCenter = this.recenterTarget;
        this.recenterTarget = null;
      } else {
        this.priceCenter += d * 0.14;
        this.dirty = true;
      }
    }

    const [pLo, pHi] = this.visiblePriceRange();
    const fH = this.fieldH();
    const ppu = this.pxPerUnit ?? fH / Math.max(pHi - pLo, 1e-9);
    if (this.basePpu === null) this.basePpu = ppu;   // S4 zoom reference
    const centre = this.priceCenter ?? (pLo + pHi) / 2;
    const yOf = (p: number) => fH / 2 - (p - centre) * ppu;
    // Publish the viewport for the COB column (S8) — rows align with the
    // FIELD region, so the ladder stops where the context stack begins.
    this.viewLo = pLo; this.viewHi = pHi;
    this.viewCentre = centre; this.viewPpu = ppu; this.viewH = fH;
    this.viewVersion += 1;

    const fw = this.fieldW();
    const subOn = this.settings.subpanes;
    // visible columns
    const t0 = this.xToTs(0);
    const t1 = this.xToTs(fw);
    let i0 = this.lowerBound(t0), i1 = this.lowerBound(t1);
    i1 = Math.min(i1, this.cols.length);
    if (this.follow && this.rightOffsetPx <= 0) {
      this.rightOffsetPx = 0;    // stay pinned while following
    }

    // dotted time verticals run through the context stack (shared axis)
    const gridH = subOn ? this.cssH - 14 : fH;
    if (this.settings.view === 'footprint') {
      // Classic order-flow footprint: bid×ask executed volume per price
      // zone per time bucket, imbalance-highlighted.
      this.paintFootprint(ctx, t0, t1, pLo, pHi, yOf, fH);
      paintTimeGrid(ctx, fw, gridH, (t) => this.tsToX(t), t0, t1,
        this.niceTimeStep(fw * this.msPerPx));
    } else {
      this.paintHeatField(ctx, i0, i1, t0, t1, pLo, pHi, yOf, fw, fH, gridH);
    }

    // V3 context stack shared by both views: volume + CVD strip in the
    // reserved bottom band; DeepDom gauges overlay the heat top-left.
    if (subOn) {
      paintSubpanes(ctx, this.dots, t0, t1, (t) => this.tsToX(t),
        this.msPerPx, fH, this.cssH, fw);
      if (this.settings.view === 'heat') {
        paintGauges(ctx, this.dots, t0, t1);
      }
    }

    // BBO lines (S9)
    const bbo = (p: number | null, color: string) => {
      if (p === null || p < pLo || p > pHi) return;
      const y = yOf(p);
      ctx.strokeStyle = color;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(fw, y);
      ctx.stroke();
      ctx.setLineDash([]);
    };
    bbo(this.bookBid, 'rgba(38, 166, 154, 0.55)');
    bbo(this.bookAsk, 'rgba(239, 83, 80, 0.55)');

    // synced crosshair from sibling panes (hard time sync, H5)
    if (this.syncedCrosshair !== null) {
      const x = this.tsToX(this.syncedCrosshair);
      if (x >= 0 && x <= fw) {
        ctx.strokeStyle = 'rgba(150, 160, 175, 0.55)';
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, fH);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // local crosshair + price/time labels
    if (this.hover) {
      const { x, y } = this.hover;
      if (x <= fw && y <= fH) {
        ctx.strokeStyle = 'rgba(150, 160, 175, 0.45)';
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(x, 0); ctx.lineTo(x, fH);
        ctx.moveTo(0, y); ctx.lineTo(fw, y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      const pAt = centre + (fH / 2 - y) / ppu;
      ctx.fillStyle = 'rgba(30, 34, 41, 0.95)';
      ctx.fillRect(fw - 74, y - 9, 72, 18);
      ctx.fillStyle = '#d1d4dc';
      ctx.font = '10px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(pAt.toPrecision(6), fw - 6, y + 3);
      const t = new Date(this.xToTs(x));
      const label = t.toISOString().slice(11, 19);
      ctx.fillRect(Math.min(x, fw - 30) - 28, this.cssH - 16, 56, 15);
      ctx.textAlign = 'center';
      ctx.fillText(label, Math.min(x, fw - 30), this.cssH - 5);
    }

    // time axis ticks (inside the field)
    ctx.fillStyle = 'rgba(150,160,175,0.7)';
    ctx.font = '9px monospace';
    ctx.textAlign = 'left';
    const stepMs = this.niceTimeStep(fw * this.msPerPx);
    const first = Math.ceil(t0 / stepMs) * stepMs;
    for (let t = first; t <= t1; t += stepMs) {
      const x = this.tsToX(t);
      if (x > fw - 52) continue;
      const d = new Date(t);
      ctx.fillText(d.toISOString().slice(11, 19), x + 2, this.cssH - 4);
      ctx.fillRect(x, this.cssH - 14, 1, 4);
    }

    // permanent right price axis (V1) — ticks, grid, BBO chips, last price
    paintPriceAxis(ctx, {
      fieldW: fw, cssW: this.cssW, cssH: this.cssH,
      centre, ppu, pLo, pHi,
      bookBid: this.bookBid, bookAsk: this.bookAsk,
      lastPrice: this.lastTradePrice, lastBuy: this.lastTradeBuy,
    });
  }

  /** V1+V2 heat field: intensity+side offscreen fold → per-side LUT
   * colourise → blit → glow → time grid → path → candles → bubbles →
   * volume strip. */
  private paintHeatField(
    ctx: CanvasRenderingContext2D,
    i0: number, i1: number, t0: number, t1: number,
    pLo: number, pHi: number,
    yOf: (p: number) => number,
    fw: number, fH: number, gridH: number,
  ) {
    const s = this.settings;
    const nCols = Math.max(1, i1 - i0);
    const rows = TARGET_ROWS;
    const rowStep = (pHi - pLo) / rows;
    if (this.off.width !== nCols || this.off.height !== rows) {
      this.off.width = nCols;
      this.off.height = rows;
      this.glow.width = nCols;
      this.glow.height = rows;
    }
    const gamma = Math.min(1, Math.max(0.25, s.gamma || 1));
    const idxBuf = new Uint8ClampedArray(nCols * rows);
    const sideBuf = new Uint8Array(nCols * rows).fill(255);
    for (let c = 0; c < nCols; c++) {
      const col = this.cols[i0 + c];
      const { keys, sizes, sides } = col;
      for (let li = 0; li < keys.length; li++) {
        const p = keys[li];
        if (p < pLo || p > pHi) continue;
        const sz = sizes[li];
        if (sz <= 0) continue;
        const r = Math.min(rows - 1, Math.max(0, Math.floor((pHi - p) / rowStep)));
        const o = r * nCols + c;
        const idx = sizeToIndex(sz, this.lo, this.hi, gamma);
        if (idx > idxBuf[o]) {          // densest level wins the pixel
          idxBuf[o] = idx;
          sideBuf[o] = sides[li];
        }
      }
    }
    // colourise through the per-side LUTs + a glow mask for hot levels
    const img = this.offCtx.createImageData(nCols, rows);
    const gImg = this.glowCtx.createImageData(nCols, rows);
    const data = img.data, gd = gImg.data;
    for (let o = 0; o < idxBuf.length; o++) {
      const side = sideBuf[o];
      if (side === 255) continue;
      const lut = side === 1 ? this.luts.ask : this.luts.bid;
      const l = idxBuf[o] * 4, p4 = o * 4;
      data[p4] = lut[l]; data[p4 + 1] = lut[l + 1]; data[p4 + 2] = lut[l + 2];
      data[p4 + 3] = 255;
      if (idxBuf[o] >= GLOW_INDEX) {
        gd[p4] = lut[l]; gd[p4 + 1] = lut[l + 1]; gd[p4 + 2] = lut[l + 2];
        gd[p4 + 3] = 255;
      }
    }
    this.offCtx.putImageData(img, 0, 0);
    this.glowCtx.putImageData(gImg, 0, 0);

    const x0 = this.tsToX(this.cols[i0].tsMs);
    const x1 = this.tsToX(this.cols[i0].tsMs + nCols * this.columnMs());
    const y0 = yOf(pHi), y1 = yOf(pLo);
    ctx.imageSmoothingEnabled = s.smoothColumns;
    ctx.drawImage(this.off, x0, y0, Math.max(1, x1 - x0), Math.max(1, y1 - y0));
    ctx.imageSmoothingEnabled = false;

    // V1 glow: blurred hot-level mask composited additively
    if (s.glow) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.38;
      const canFilter = 'filter' in ctx;
      if (canFilter) ctx.filter = 'blur(6px)';
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(this.glow, x0, y0, Math.max(1, x1 - x0), Math.max(1, y1 - y0));
      ctx.restore();
    }

    // dotted vertical time grid over the field (V1 quality 5)
    paintTimeGrid(ctx, fw, gridH, (t) => this.tsToX(t), t0, t1,
      this.niceTimeStep(fw * this.msPerPx));

    // V2 stepped bid/ask path from the carried book
    if (s.showPath) {
      paintPath(ctx, this.cols, i0, i1, (t) => this.tsToX(t), yOf, pLo, pHi);
    }
    // V2 trade-derived candles (labelled as such in the settings UI)
    if (s.showCandles) {
      paintCandles(ctx, this.dots, t0, t1, pLo, pHi,
        (t) => this.tsToX(t), yOf, this.msPerPx, fw);
    }
    // V2 sphere bubbles + big-trade tags (S7 drawing types upgraded)
    if (s.dots) {
      const mode = s.dotType === 'pie' ? 'pie'
        : s.dotType === 'solid' ? 'solid' : 'sphere';
      paintBubbles(ctx, this.dots, t0, t1, pLo, pHi,
        (t) => this.tsToX(t), yOf, {
          alpha: Math.min(1, Math.max(0, s.dotAlpha)),
          scale: s.dotScale, mode,
          bigK: s.bigTradeK, bigMedian: this.bigMedian,
          fieldW: fw, cssH: fH,
        });
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
    h: number,
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
      ctx.fillText('no side-stamped prints in view', this.cssW / 2, h / 2 - 8);
      ctx.font = '10px ui-monospace, Menlo, monospace';
      ctx.fillText('the footprint builds from executed trades (demo and', this.cssW / 2, h / 2 + 10);
      ctx.fillText('crypto feeds carry sides; sources without prints stay blank)', this.cssW / 2, h / 2 + 24);
      return;
    }

    const fmtV = (v: number) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k`
      : v >= 100 ? v.toFixed(0) : v >= 10 ? v.toFixed(0) : v.toFixed(1));
    const fw = this.fieldW();
    const rowH = Math.min(22, Math.max(9, zstep * this.viewPpu * 0.85));

    const first = Math.floor(t0 / bucket) * bucket;
    for (let b = first; b <= t1; b += bucket) {
      const x0 = this.tsToX(b), x1 = this.tsToX(b + bucket);
      if (x1 < -4 || x0 > fw + 4) continue;
      const w = x1 - x0;
      const bk = Math.floor(b / bucket);
      const showNums = w >= 92;
      const half = w / 2 - 4;

      // column frame
      ctx.strokeStyle = 'rgba(30, 36, 47, 0.95)';
      ctx.beginPath();
      ctx.moveTo(Math.round(x1) + 0.5, 0);
      ctx.lineTo(Math.round(x1) + 0.5, h);
      ctx.stroke();

      for (const [key, c] of cells) {
        const [kb, kz] = key.split(':');
        if (Number(kb) !== bk) continue;
        const zk = Number(kz);
        const y = yOf((zk + 0.5) * zstep);
        if (y < -rowH || y > h + rowH) continue;
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
          x0 + w / 2, h - 6);
      }
    }
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
