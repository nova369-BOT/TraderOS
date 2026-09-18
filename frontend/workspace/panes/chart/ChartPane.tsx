// F2 · candle·footprint pane shell. React owns ONLY lifecycle and input;
// every pixel lives in render.ts, every cell in footprint.ts, every fetch in
// data.ts. Paint inputs (theme/badge/tf) flow through refs so rAF callbacks
// and long-lived intervals can NEVER paint a stale closure.

import React, { useEffect, useRef, useState } from 'react';
import { Tokens } from '../../tokens';
import { loadCandles } from './data';
import { AXIS_W, paintChart } from './render';
import {
  MAX_PX, MIN_PX, Source, TIMEFRAMES, Timeframe, ViewState,
  defaultView, morphTargetFor,
} from './types';
import type { Candle } from './types';

interface Props { theme: Tokens }

export default function ChartPane({ theme }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const candlesRef = useRef<Candle[]>([]);
  const viewRef = useRef<ViewState>(defaultView());
  const hoverRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef(0);
  const dragRef = useRef<{ x: number; offset: number } | null>(null);

  // Real data by default: the pane tries the Binance spine first and only
  // falls back to DEMO if nothing live is reachable — and the badge always
  // says which one you are actually looking at.
  const [source, setSource] = useState<Source>('binance');
  const [tf, setTf] = useState<Timeframe>('1m');
  const [badge, setBadge] = useState('BINANCE');

  // paint-path inputs, always current
  const themeRef = useRef(theme); themeRef.current = theme;
  const badgeRef = useRef(badge); badgeRef.current = badge;
  const tfRef = useRef(tf); tfRef.current = tf;

  const paint = () => {
    const canvas = canvasRef.current, wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = window.devicePixelRatio || 1;
    const W = wrap.clientWidth, H = wrap.clientHeight;
    if (!W || !H) return;
    if (canvas.width !== Math.round(W * dpr) ||
        canvas.height !== Math.round(H * dpr)) {
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    paintChart({
      ctx, W, H,
      candles: candlesRef.current,
      view: viewRef.current,
      hover: hoverRef.current,
      theme: themeRef.current,
      badge: badgeRef.current,
      tf: tfRef.current,
      modelled: true,  // real print aggregation lands with phase 6
    });
    const v = viewRef.current;
    if (Math.abs(v.morph - v.morphTarget) > 0.01) {
      v.morph += (v.morphTarget - v.morph) * 0.22;
      rafRef.current = requestAnimationFrame(paint);
    }
  };
  const paintRef = useRef(paint); paintRef.current = paint;
  const schedule = () => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => paintRef.current());
  };
  const scheduleRef = useRef(schedule); scheduleRef.current = schedule;

  // data poll — reads only refs, immune to re-renders
  useEffect(() => {
    let dead = false;
    const load = async () => {
      const r = await loadCandles(source, tf).catch(() => null);
      if (dead || !r) return;
      candlesRef.current = r.candles;
      setBadge(r.badge);
      scheduleRef.current();
    };
    load();
    const t = setInterval(load, 5000);
    return () => { dead = true; clearInterval(t); };
  }, [source, tf]);

  // resize
  useEffect(() => {
    const ro = new ResizeObserver(() => scheduleRef.current());
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => { ro.disconnect(); cancelAnimationFrame(rafRef.current); };
  }, []);

  useEffect(() => { scheduleRef.current(); }, [theme]);

  // ── input ─────────────────────────────────────────────────────────────
  const onWheel = (e: React.WheelEvent) => {
    const v = viewRef.current;
    const len = candlesRef.current.length;
    const wrap = wrapRef.current;
    if (!wrap || !len) return;
    const plotW = wrap.clientWidth - AXIS_W;
    if (e.shiftKey) {
      v.offset = Math.max(0, Math.min(len - 10,
        v.offset + Math.sign(e.deltaY) * 6));
    } else {
      const r = (e.target as HTMLElement).getBoundingClientRect();
      const x = e.clientX - r.left;
      const oldPx = v.pxPer;
      const next = Math.min(MAX_PX, Math.max(MIN_PX,
        oldPx * (e.deltaY > 0 ? 0.88 : 1.14)));
      const countOld = Math.max(8, Math.floor(plotW / oldPx));
      const lastOld = len - 1 - Math.round(v.offset);
      const firstOld = Math.max(0, lastOld - countOld + 1);
      const idxAt = firstOld + x / oldPx;
      const countNew = Math.max(8, Math.floor(plotW / next));
      const firstNew = idxAt - x / next;
      const offsetNew = len - 1 - (firstNew + countNew - 1);
      v.pxPer = next;
      v.offset = Math.max(0, Math.min(len - 10, Math.round(offsetNew)));
      v.morphTarget = morphTargetFor(next);
    }
    scheduleRef.current();
  };

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0 }}>
      <canvas
        ref={canvasRef}
        onWheel={onWheel}
        onDoubleClick={() => { viewRef.current = defaultView(); scheduleRef.current(); }}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          dragRef.current = { x: e.clientX, offset: viewRef.current.offset };
        }}
        onPointerMove={(e) => {
          const r = (e.target as HTMLElement).getBoundingClientRect();
          hoverRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
          if (dragRef.current) {
            const v = viewRef.current;
            const len = candlesRef.current.length;
            const dx = e.clientX - dragRef.current.x;
            v.offset = Math.max(0, Math.min(len - 10,
              Math.round(dragRef.current.offset + dx / v.pxPer)));
          }
          scheduleRef.current();
        }}
        onPointerUp={() => { dragRef.current = null; }}
        onPointerLeave={() => {
          hoverRef.current = null; dragRef.current = null;
          scheduleRef.current();
        }}
        style={{ display: 'block', touchAction: 'none', cursor: 'crosshair' }}
      />
      <div style={{ position: 'absolute', top: 22, right: 6,
                    display: 'flex', gap: 4 }}>
        <button
          className="ws-chip"
          title="Data source: BINANCE (direct spine, falls back to gateway, then honest DEMO)"
          onClick={() => setSource((s) => (s === 'demo' ? 'binance' : 'demo'))}
        >{source === 'demo' ? 'SRC: DEMO' : 'SRC: BINANCE'}</button>
        {TIMEFRAMES.map((t) => (
          <button
            key={t}
            className="ws-chip"
            style={t === tf ? { color: theme.brand, borderColor: theme.brand } : undefined}
            onClick={() => setTf(t)}
          >{t}</button>
        ))}
      </div>
    </div>
  );
}
