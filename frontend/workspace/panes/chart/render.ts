// F2 · chart pane renderer. Pure canvas: no React, no DOM lookups, no state.
// Given a context, a size, candles, a camera and tokens it draws the whole
// pane — candles, volume, the zoom-morph footprint, axes, crosshair, badges.

import { Tokens } from '../../tokens';
import { computeFootprint, imbalance } from './footprint';
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

  // ── volume histogram ──────────────────────────────────────────────────
  for (let i = first; i <= last; i++) {
    const c = candles[i];
    const vh = maxV ? (c.volume / maxV) * (volH - 4) : 0;
    ctx.fillStyle = c.close >= c.open
      ? hexA(theme.up, 0.35) : hexA(theme.down, 0.35);
    ctx.fillRect(xOf(i) + 1, H - TIME_H - vh,
      Math.max(1, view.pxPer - 2), vh);
  }

  const m = view.morph;

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

  // ── footprint (the unfold) ────────────────────────────────────────────
  if (m > 0.02) {
    ctx.globalAlpha = m;
    for (let i = first; i <= last; i++) {
      const c = candles[i];
      const top = yOf(c.high), bot = yOf(c.low);
      const span = bot - top;
      if (span < 8) continue;
      const rows = Math.max(6, Math.min(24, Math.round(span / 13)));
      const rowH = span / rows;
      const fp = computeFootprint(c, rows);
      const bw = Math.max(1, view.pxPer - 2);
      const x = xOf(i) + 1;

      for (let r = 0; r < rows; r++) {
        const cell = fp.cells[r];
        const y = top + r * rowH;
        const h = Math.max(1, rowH - 1);
        const inten = (cell.b + cell.s) / fp.max;
        // resting-intensity backing (the heatmap echo inside the footprint)
        ctx.fillStyle = hexA(theme.tx1, 0.05 + inten * 0.28);
        ctx.fillRect(x, y, bw, h);
        // buy half (left) / sell half (right), width ∝ share
        const bShare = cell.b / (cell.b + cell.s);
        ctx.fillStyle = hexA(theme.up, 0.25 + (cell.b / fp.max) * 0.75);
        ctx.fillRect(x, y, bw * 0.5 * bShare, h);
        const sW = bw * 0.5 * (1 - bShare);
        ctx.fillStyle = hexA(theme.down, 0.25 + (cell.s / fp.max) * 0.75);
        ctx.fillRect(x + bw - sW, y, sW, h);

        const imb = imbalance(cell);
        if (imb) {
          ctx.strokeStyle = imb === 'buy' ? theme.up : theme.down;
          ctx.lineWidth = 1;
          ctx.strokeRect(x + 0.5, y + 0.5, bw - 1, h - 1);
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
      const t = fmtTime(candles[i].ts);
      ctx.fillStyle = theme.elev;
      ctx.fillRect(x - 20, H - TIME_H, 44, TIME_H);
      ctx.fillStyle = theme.tx1;
      ctx.fillText(t, x - 16, H - 5);
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
    readout += ' · FOOTPRINT' + (a.modelled ? ' (MODELLED)' : '');
  } else if (m > 0.05) {
    readout += ' · unfolding…';
  }
  ctx.fillStyle = theme.tx2;
  ctx.fillText(readout, 8, 14);
  ctx.textBaseline = 'alphabetic';
}
