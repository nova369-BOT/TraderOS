// ============================================================================
// depth/DepthHeatCob.tsx — the COB column (F1, H7, spec S8).
//
// A numeric DOM ladder beside the heatmap, PIXEL-ALIGNED with the heat's
// price axis (it reads the renderer's published viewport, no React state in
// the frame path). Per-level size + cumulative columns, spread row, BBO
// rows; the S6 active-range override draws its two boundary lines here and
// dims levels outside the window.
//
// Live-updating: the ladder keeps its own persistent book — exactly the
// engine's patch semantics (SNAPSHOT/DELTA patch identically; only size 0
// removes a level) — seeded from /api/orderflow/book, then fed by the WS
// depth frames.
// ============================================================================

import React, { useEffect, useRef } from 'react';
import type { DepthEventMsg, DepthHeatSettings } from './depthHeatTypes';
import type { DepthHeatRenderer } from './DepthHeatRenderer';

const PRICE_EPS = 1e-9;   // same key rounding as engine book.py

export class ClientBook {
  private bids = new Map<number, number>();
  private asks = new Map<number, number>();
  version = 0;

  private static key(p: number) { return Math.round(p / PRICE_EPS) * PRICE_EPS; }

  apply(ev: DepthEventMsg) {
    for (const [p, s] of ev.bids) {
      const k = ClientBook.key(p);
      if (s <= 0) this.bids.delete(k); else this.bids.set(k, s);
    }
    for (const [p, s] of ev.asks) {
      const k = ClientBook.key(p);
      if (s <= 0) this.asks.delete(k); else this.asks.set(k, s);
    }
    this.version += 1;
  }

  /** Seed from the /api/orderflow/book snapshot shape. */
  seed(bids: [number, number][], asks: [number, number][]) {
    this.bids.clear();
    this.asks.clear();
    for (const [p, s] of bids) if (s > 0) this.bids.set(ClientBook.key(p), s);
    for (const [p, s] of asks) if (s > 0) this.asks.set(ClientBook.key(p), s);
    this.version += 1;
  }

  bestBid(): number | null {
    let bb: number | null = null;
    for (const p of this.bids.keys()) if (bb === null || p > bb) bb = p;
    return bb;
  }

  bestAsk(): number | null {
    let ba: number | null = null;
    for (const p of this.asks.keys()) if (ba === null || p < ba) ba = p;
    return ba;
  }

  /** Bids best-first, asks best-first (mirrors book.py's ranked views). */
  sorted(): { bids: [number, number][]; asks: [number, number][] } {
    return {
      bids: [...this.bids.entries()].sort((a, b) => b[0] - a[0]),
      asks: [...this.asks.entries()].sort((a, b) => a[0] - b[0]),
    };
  }
}

const BID = '#26a69a';
const ASK = '#ef5350';

function fmtSize(v: number): string {
  if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
  if (v >= 100) return v.toFixed(0);
  if (v >= 1) return v.toFixed(1);
  return v.toPrecision(2);
}

function fmtPrice(p: number): string {
  if (p >= 1000) return p.toFixed(1);
  if (p >= 1) return p.toFixed(2);
  return p.toPrecision(4);
}

export default function DepthHeatCob({
  rendererRef, book, settings, width = 148,
}: {
  rendererRef: React.MutableRefObject<DepthHeatRenderer | null>;
  book: ClientBook;
  settings: DepthHeatSettings;
  width?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Render-affecting bits are read through refs so the rAF loop never
  // depends on React re-renders.
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf = 0;
    let lastView = -1;
    let lastBook = -1;
    let disposed = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      lastView = -1;                       // force repaint
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const paint = () => {
      const r = rendererRef.current;
      if (!r) return;
      const vm = r.getViewMetrics();
      if (vm.version === lastView && book.version === lastBook) return;
      lastView = vm.version;
      lastBook = book.version;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr, h = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, w, h);
      const { bids, asks } = book.sorted();
      if (!bids.length && !asks.length) {
        ctx.fillStyle = '#5c6672';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('no book', w / 2, h / 2);
        return;
      }

      const s = settingsRef.current;
      const bb = book.bestBid(), ba = book.bestAsk();
      const activeOn = s.activeRange > 0;

      // Row band height: from the median spacing of visible levels.
      const visible = [...bids, ...asks].filter(([p]) =>
        p >= vm.lo && p <= vm.hi).map(([p]) => p).sort((a, b) => a - b);
      let band = 8;
      if (visible.length >= 2) {
        const gaps: number[] = [];
        for (let i = 1; i < visible.length; i++) gaps.push(visible[i] - visible[i - 1]);
        gaps.sort((a, b) => a - b);
        band = Math.min(20, Math.max(2.5, vm.ppu * gaps[gaps.length >> 1]));
      }

      // Scales: size relative to the largest visible level; cumulative to
      // the largest running total.
      let maxSize = 0, maxCum = 0;
      {
        let cum = 0;
        for (const [p, sz] of bids) {
          if (p >= vm.lo && p <= vm.hi) maxSize = Math.max(maxSize, sz);
          cum += sz; maxCum = Math.max(maxCum, cum);
        }
        cum = 0;
        for (const [p, sz] of asks) {
          if (p >= vm.lo && p <= vm.hi) maxSize = Math.max(maxSize, sz);
          cum += sz; maxCum = Math.max(maxCum, cum);
        }
      }
      const barMax = w - 52;
      const cumColW = s.cobCumulative ? 26 : 0;
      const sizeColX = w - 8 - cumColW - 40;

      const row = (p: number, size: number, side: 'bid' | 'ask',
                   cumVal: number, inWindow: boolean) => {
        const y = vm.yOf(p);
        if (y < -band || y > h + band) return;
        const yTop = y - band / 2;
        const dim = activeOn && !inWindow;
        // cumulative under-bar (full-height strip, quiet)
        if (s.cobCumulative && maxCum > 0) {
          const cw = Math.max(1, (cumVal / maxCum) * 18);
          ctx.fillStyle = side === 'bid'
            ? 'rgba(38, 166, 154, 0.14)' : 'rgba(239, 83, 80, 0.14)';
          ctx.fillRect(w - 20, yTop, 18, band - 1);
          ctx.fillStyle = side === 'bid'
            ? 'rgba(38, 166, 154, 0.45)' : 'rgba(239, 83, 80, 0.45)';
          ctx.fillRect(w - 20, yTop, cw, band - 1);
        }
        // size bar
        const bw = maxSize > 0 ? Math.max(1.5, (size / maxSize) * barMax) : 1.5;
        ctx.fillStyle = side === 'bid'
          ? (dim ? 'rgba(38,166,154,0.16)' : 'rgba(38, 166, 154, 0.62)')
          : (dim ? 'rgba(239,83,80,0.16)' : 'rgba(239, 83, 80, 0.62)');
        ctx.fillRect(sizeColX + 40 - bw, yTop, bw, band - 1);
        // size text
        ctx.font = '9px monospace';
        ctx.textAlign = 'right';
        ctx.fillStyle = dim ? '#4a5260' : (side === 'bid' ? '#9fd6cd' : '#f4b3ae');
        ctx.fillText(fmtSize(size), sizeColX + 38, y + 3);
        // price tick at the row edge for the BBO rows only (kept quiet)
        void p;
      };

      let cum = 0;
      for (let i = 0; i < bids.length; i++) {
        const [p, sz] = bids[i];
        cum += sz;
        if (p < vm.lo - band || p > vm.hi + band) continue;
        row(p, sz, 'bid', cum, !activeOn || i < s.activeRange);
      }
      cum = 0;
      for (let i = 0; i < asks.length; i++) {
        const [p, sz] = asks[i];
        cum += sz;
        if (p < vm.lo - band || p > vm.hi + band) continue;
        row(p, sz, 'ask', cum, !activeOn || i < s.activeRange);
      }

      // BBO rows + spread chip (S8)
      const bboRow = (p: number, color: string) => {
        const y = vm.yOf(p);
        if (y < 0 || y > h) return;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, Math.round(y) + 0.5);
        ctx.lineTo(w, Math.round(y) + 0.5);
        ctx.stroke();
      };
      if (bb !== null) bboRow(bb, 'rgba(38, 166, 154, 0.95)');
      if (ba !== null) bboRow(ba, 'rgba(239, 83, 80, 0.95)');
      if (bb !== null && ba !== null && ba > bb) {
        const yMid = (vm.yOf(bb) + vm.yOf(ba)) / 2;
        if (yMid > 10 && yMid < h - 10) {
          const label = `Δ ${fmtPrice(ba - bb)}`;
          ctx.font = '9px monospace';
          const tw = ctx.measureText(label).width + 10;
          ctx.fillStyle = 'rgba(20, 24, 31, 0.95)';
          ctx.fillRect(2, yMid - 8, tw, 16);
          ctx.strokeStyle = '#2a3140';
          ctx.strokeRect(2.5, yMid - 7.5, tw - 1, 15);
          ctx.fillStyle = '#c8cfda';
          ctx.textAlign = 'left';
          ctx.fillText(label, 7, yMid + 3);
        }
      }

      // S6 active-range boundary lines: amber dashes just outside the last
      // level of each side's window.
      if (activeOn) {
        const dashes: number[] = [];
        if (bids.length && s.activeRange <= bids.length) {
          dashes.push(vm.yOf(bids[s.activeRange - 1][0]) + band / 2 + 1);
        }
        if (asks.length && s.activeRange <= asks.length) {
          dashes.push(vm.yOf(asks[s.activeRange - 1][0]) - band / 2 - 1);
        }
        ctx.strokeStyle = 'rgba(255, 179, 0, 0.75)';
        ctx.setLineDash([3, 3]);
        for (const y of dashes) {
          if (y < 0 || y > h) continue;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
        ctx.setLineDash([]);
      }
    };

    const loop = () => {
      if (disposed) return;
      paint();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [rendererRef, book]);

  return (
    <div style={{
      flex: `0 0 ${width}px`, width, borderLeft: '1px solid #232936',
      position: 'relative', background: '#0d1117',
    }}>
      <div style={{
        position: 'absolute', top: 4, right: 6, fontSize: 8, letterSpacing: 1,
        color: '#5c6672', pointerEvents: 'none', zIndex: 1,
      }}>COB</div>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
    </div>
  );
}
