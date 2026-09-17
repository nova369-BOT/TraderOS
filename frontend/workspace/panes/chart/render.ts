// F2 · chart pane renderer. Pure canvas: no React, no DOM lookups, no state.
// Given a context, a size, candles, a camera and tokens it draws the whole
// pane — candles, volume + delta, the zoom-morph footprint with diagonal
// imbalances and POC, axes, crosshair, badges.
//
// Footprint grid discipline (mirrors the reference terminals): all visible
// candles share ONE row count for the current zoom, exactly like a tick
// grouping — that shared grid is what makes diagonal imbalance reads and
// row-to-row comparison meaningful.

import { Tokens } from '../../tokens';
import { Footprint, computeFootprint } from './footprint';
import {
  Candle, ViewState, decimalsFor, fmtPrice, fmtTime, niceStep,
} from './types';

export const AXIS_W = 58;
export const TIME_H = 18;

export interface PaintArgs {
  ctx: CanvasRenderingContext2D;
  W: number; H: number;
  candles: Candle[];
  view: ViewState;
  hover: { x: number; y: number } | null;
  theme: Tokens;
  badge: string;
  tf: string;
  modelled: boolean;   // footprint is a model, not exchange prints
}

function hexA(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return `rgba(${r},${g},${b},${Math.max(0, Math.min(1, a))})`;
}

export function paintChart(a: PaintArgs): void {
  const { ctx, W, H, candles, view, theme } = a;
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, W, H);
  ctx.font = '10px "JetBrains Mono", ui-monospace, monospace';

  if (!candles.length) {
    ctx.fillStyle = theme.tx3;
    ctx.fillText('waiting for candles…', 12, 24);
    return;
  }

  const plotW = W - AXIS_W;
  const volH = Math.max(30, (H - TIME_H) * 0.16);
  const priceH = H - TIME_H - volH;

  const count = Math.max(8, Math.floor(plotW / view.pxPer));
  const last = Math.min(candles.length - 1,
    candles.length - 1 - Math.round(view.offset));
  const first = Math.max(0, last - count + 1);
  const vis = candles.slice(first, last + 1);

  let lo = Infinity, hi = -Infinity, maxV = 0;
  for (const c of vis) {
    if (c.low < lo) lo = c.low;
    if (c.high > hi) hi = c.high;
    if (c.volume > maxV) maxV = c.volume;
  }
  const pad = (hi - lo) * 0.08 || hi * 0.001 || 1;
  lo -= pad; hi += pad;
  const yOf = (p: number) => 4 + ((hi - p) / (hi - lo)) * (priceH - 8);
  const xOf = (i: number) => (i - first) * view.pxPer;

  // ── price grid + axis ─────────────────────────────────────────────────
  const step = niceStep(hi - lo, Math.max(3, Math.floor(priceH / 56)));
  const dec = decimalsFor(step);
  ctx.textBaseline = 'middle';
  for (let p = Math.ceil(lo / step) * step; p <= hi; p += step) {
    const y = yOf(p);
    ctx.strokeStyle = theme.hairline;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(plotW, y); ctx.stroke();
    ctx.fillStyle = theme.tx3;
    ctx.fillText(p.toFixed(dec), plotW + 6, y);
  }

  // ── time axis ─────────────────────────────────────────────────────────
  const tEvery = Math.max(1, Math.ceil(76 / view.pxPer));
  ctx.textBaseline = 'alphabetic';
  for (let i = first; i <= last; i++) {
    if (i % tEvery) continue;
    const x = xOf(i) + view.pxPer / 2;
    ctx.strokeStyle = theme.hairline;
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H - TIME_H); ctx.stroke();
    ctx.fillStyle = theme.tx3;
    ctx.fillText(fmtTime(candles[i].ts), x + 3, H - 5);
  }

  // ── per-candle delta (modelled share of volume) ───────────────────────
  const deltas: number[] = [];
  let cum = 0, maxAbsD = 0, maxAbsCum = 0;
  const cums: number[] = [];
  for (const c of vis) {
    const bull = c.close >= c.open;
    const d = (bull ? 0.2 : -0.2) * c.volume;   // refined by fp below
    deltas.push(d); cum += d; cums.push(cum);
    maxAbsD = Math.max(maxAbsD, Math.abs(d));
    maxAbsCum = Math.max(maxAbsCum, Math.abs(cum));
  }

  // ── volume histogram + delta bars + cumulative delta line ─────────────
  for (let i = first; i <= last; i++) {
    const c = candles[i];
    const vh = maxV ? (c.volume / maxV) * (volH - 4) : 0;
    ctx.fillStyle = c.close >= c.open
      ? hexA(theme.up, 0.30) : hexA(theme.down, 0.30);
    ctx.fillRect(xOf(i) + 1, H - TIME_H - vh, Math.max(1, view.pxPer - 2), vh);
  }

  const m = view.morph;

  // shared footprint grid for the visible window
  let fps: Footprint[] = [];
  let rows = 0;
  if (m > 0.02) {
    const spans = vis
      .map((c) => yOf(c.low) - yOf(c.high))
      .filter((s) => s >= 8)
      .sort((x, y) => x - y);
    const median = spans.length
      ? spans[Math.floor(spans.length / 2)] : 120;
    rows = Math.max(6, Math.min(24, Math.round(median / 13)));
    fps = vis.map((c) => computeFootprint(c, rows));
    // refine deltas from the footprint split
    for (let k = 0; k < vis.length; k++) {
      const fp = fps[k];
      let b = 0, s = 0;
      for (const cell of fp.cells) { b += cell.b; s += cell.s; }
      deltas[k] = ((b - s) / (b + s)) * vis[k].volume;
      maxAbsD = Math.max(maxAbsD, Math.abs(deltas[k]));
    }
    cum = 0;
    for (let k = 0; k < vis.length; k++) {
      cum += deltas[k]; cums[k] = cum;
      maxAbsCum = Math.max(maxAbsCum, Math.abs(cum));
    }
  }

  if (m > 0.02) {
    // delta bars in the lower half of the volume pane
    for (let k = 0; k < vis.length; k++) {
      const d = deltas[k];
      const dh = maxAbsD ? (Math.abs(d) / maxAbsD) * (volH * 0.42) : 0;
      ctx.fillStyle = d >= 0 ? hexA(theme.up, 0.85) : hexA(theme.down, 0.85);
      ctx.fillRect(xOf(first + k) + 1, H - TIME_H - dh,
        Math.max(1, view.pxPer - 2), dh);
    }
    // cumulative delta polyline across the volume pane
    if (maxAbsCum > 0) {
      ctx.strokeStyle = hexA(theme.brand, 0.9);
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let k = 0; k < vis.length; k++) {
        const x = xOf(first + k) + view.pxPer / 2;
        const y = H - TIME_H - ((cums[k] / maxAbsCum + 1) / 2) * (volH - 6) - 3;
        if (k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  // ── candles ───────────────────────────────────────────────────────────
  if (m < 0.98) {
    ctx.globalAlpha = 1 - m;
    for (let i = first; i <= last; i++) {
      const c = candles[i];
      const cx = xOf(i) + view.pxPer / 2;
      const col = c.close >= c.open ? theme.up : theme.down;
      ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx, yOf(c.high)); ctx.lineTo(cx, yOf(c.low));
      ctx.stroke();
      const yO = yOf(c.open), yC = yOf(c.close);
      ctx.fillRect(xOf(i) + 1, Math.min(yO, yC),
        Math.max(1, view.pxPer - 2), Math.max(1, Math.abs(yO - yC)));
    }
    ctx.globalAlpha = 1;
  }

  // ── footprint (the unfold) on the shared grid ─────────────────────────
  if (m > 0.02 && rows) {
    ctx.globalAlpha = m;
    for (let k = 0; k < vis.length; k++) {
      const c = vis[k];
      const fp = fps[k];
      const top = yOf(c.high), bot = yOf(c.low);
      const span = bot - top;
      if (span < 8) continue;
      const rowH = span / rows;
      const bw = Math.max(1, view.pxPer - 2);
      const x = xOf(first + k) + 1;

      for (let r = 0; r < rows; r++) {
        const cell = fp.cells[r];
        const y = top + r * rowH;
        const h = Math.max(1, rowH - 1);
        const inten = (cell.b + cell.s) / fp.max;
        ctx.fillStyle = hexA(theme.tx1, 0.05 + inten * 0.28);
        ctx.fillRect(x, y, bw, h);
        const bShare = cell.b / (cell.b + cell.s);
        ctx.fillStyle = hexA(theme.up, 0.25 + (cell.b / fp.max) * 0.75);
        ctx.fillRect(x, y, bw * 0.5 * bShare, h);
        const sW = bw * 0.5 * (1 - bShare);
        ctx.fillStyle = hexA(theme.down, 0.25 + (cell.s / fp.max) * 0.75);
        ctx.fillRect(x + bw - sW, y, sW, h);
      }

      // diagonal 3:1 imbalances on the shared grid:
      // buy pressure = this row's buys vs the NEXT candle's upper-right sells;
      // sell pressure = this row's sells vs the NEXT candle's lower-right buys.
      const next = fps[k + 1];
      if (next && next.cells.length === rows) {
        ctx.lineWidth = 1;
        for (let r = 0; r < rows; r++) {
          const cell = fp.cells[r];
          const upR = next.cells[r - 1];
          const dnR = next.cells[r + 1];
          if (upR && cell.b > upR.s * 3) {
            ctx.strokeStyle = theme.up;
            ctx.strokeRect(x + 0.5, top + r * rowH + 0.5, bw - 1,
              Math.max(1, rowH - 1) - 1);
          }
          if (dnR && cell.s > dnR.b * 3) {
            ctx.strokeStyle = theme.down;
            ctx.strokeRect(x + 0.5, top + r * rowH + 0.5, bw - 1,
              Math.max(1, rowH - 1) - 1);
          }
        }
      }

      // POC row marker
      ctx.strokeStyle = hexA(theme.warn, 0.9);
      ctx.strokeRect(x + 0.5, top + fp.poc * rowH + 0.5, bw - 1,
        Math.max(1, rowH - 1) - 1);

      if (view.pxPer >= 48) {
        ctx.font = '8px "JetBrains Mono", ui-monospace, monospace';
        for (let r = 0; r < rows; r++) {
          const cell = fp.cells[r];
          const y = top + r * rowH + rowH / 2 + 3;
          const bv = Math.round((cell.b / fp.total) * c.volume);
          const sv = Math.round((cell.s / fp.total) * c.volume);
          ctx.fillStyle = theme.up;
          ctx.fillText(String(bv), x + 2, y);
          ctx.fillStyle = theme.down;
          ctx.textAlign = 'right';
          ctx.fillText(String(sv), x + bw - 2, y);
          ctx.textAlign = 'left';
        }
        // per-candle delta under the candle
        const d = deltas[k];
        ctx.fillStyle = d >= 0 ? theme.up : theme.down;
        ctx.textAlign = 'center';
        ctx.fillText(`${d >= 0 ? '+' : ''}${Math.round(d)}`,
          x + bw / 2, bot + 10);
        ctx.textAlign = 'left';
        ctx.font = '10px "JetBrains Mono", ui-monospace, monospace';
      }
    }
    ctx.globalAlpha = 1;
  }

  // ── last price line + tag ─────────────────────────────────────────────
  const lp = candles[candles.length - 1].close;
  if (lp > lo && lp < hi) {
    ctx.strokeStyle = hexA(theme.warn, 0.8);
    ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(0, yOf(lp)); ctx.lineTo(plotW, yOf(lp));
    ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = theme.warn;
    ctx.fillRect(plotW, yOf(lp) - 8, AXIS_W, 16);
    ctx.fillStyle = '#000';
    ctx.fillText(lp.toFixed(dec), plotW + 6, yOf(lp) + 3);
  }

  // ── crosshair ─────────────────────────────────────────────────────────
  if (a.hover && a.hover.x < plotW && a.hover.y < H - TIME_H) {
    const { x, y } = a.hover;
    ctx.strokeStyle = theme.borderStrong;
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H - TIME_H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(plotW, y); ctx.stroke();
    const p = hi - ((y - 4) / (priceH - 8)) * (hi - lo);
    ctx.fillStyle = theme.elev;
    ctx.fillRect(plotW, y - 8, AXIS_W, 16);
    ctx.strokeStyle = theme.border;
    ctx.strokeRect(plotW + 0.5, y - 7.5, AXIS_W - 1, 15);
    ctx.fillStyle = theme.tx1;
    ctx.fillText(p.toFixed(dec), plotW + 6, y + 3);
    const i = first + Math.floor(x / view.pxPer);
    if (candles[i]) {
      ctx.fillStyle = theme.elev;
      ctx.fillRect(x - 20, H - TIME_H, 44, TIME_H);
      ctx.fillStyle = theme.tx1;
      ctx.fillText(fmtTime(candles[i].ts), x - 16, H - 5);
    }
  }

  // ── watermark + readout ───────────────────────────────────────────────
  ctx.fillStyle = hexA(theme.tx1, 0.05);
  ctx.font = '700 26px "JetBrains Mono", ui-monospace, monospace';
  ctx.fillText('TRADEROS · F2', 14, priceH - 14);
  ctx.font = '10px "JetBrains Mono", ui-monospace, monospace';
  let readout = `${a.badge} · ${a.tf} · ${vis.length} bars · ` +
    `${view.pxPer.toFixed(1)}px/candle`;
  if (m > 0.5) {
    readout += ` · FOOTPRINT ${rows}R` +
      (a.modelled ? ' (MODELLED)' : '') + ' · diag 3:1';
  } else if (m > 0.05) {
    readout += ' · unfolding…';
  }
  ctx.fillStyle = theme.tx2;
  ctx.fillText(readout, 8, 14);
  ctx.textBaseline = 'alphabetic';
}
