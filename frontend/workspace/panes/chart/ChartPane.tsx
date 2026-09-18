// F2 · candle·footprint pane shell. React owns ONLY lifecycle; every pixel
// lives in render.ts, every cell in footprint.ts, every fetch in data.ts.
// Navigation feel is the LSE ProChart recipe, ported exactly:
//  - FLOAT startIndex + fractional-pixel render (sub-candle smooth pan)
//  - wheel zoom = geometric levels, RIGHT edge anchored, instant (no jitter)
//  - horizontal wheel / shift+wheel = fractional pan
//  - drag pan is pixel-exact
//  - refs + one rAF; React state never touches the paint path
//  - double-buffered: draw offscreen, single blit (no ghosting)
//  - DPR capped at 2 (consistent frame time on hi-dpi)

import React, { useEffect, useRef, useState } from 'react';
import { Tokens } from '../../tokens';
import { loadCandles } from './data';
import { AXIS_W, paintChart } from './render';
import { openLiveFeed } from './live';
import {
  MAX_PX, MIN_PX, Source, TIMEFRAMES, Timeframe, ViewState,
  defaultView, morphTargetFor, nextZoomLevel,
} from './types';
import type { Candle } from './types';

interface Props { theme: Tokens }

export default function ChartPane({ theme }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offRef = useRef<HTMLCanvasElement | null>(null);
  const candlesRef = useRef<Candle[]>([]);
  const viewRef = useRef<ViewState>(defaultView());
  const hoverRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef(0);
  const dragRef = useRef<{ x: number; start: number } | null>(null);

  const [source, setSource] = useState<Source>('binance');
  const [tf, setTf] = useState<Timeframe>('1m');
  const [badge, setBadge] = useState('BINANCE');
  // realtime: a browser-direct WS is ticking the forming candle right now
  const [rtOn, setRtOn] = useState(false);
  const rtRef = useRef(false); rtRef.current = rtOn;

  // paint-path inputs, always current
  const themeRef = useRef(theme); themeRef.current = theme;
  const shownBadge = rtOn ? `${badge} · RT` : badge;
  const badgeRef = useRef(shownBadge); badgeRef.current = shownBadge;
  const tfRef = useRef(tf); tfRef.current = tf;

  const plotWOf = () => (wrapRef.current?.clientWidth ?? 0) - AXIS_W;

  // LSE follow-the-edge: while following, the right edge stays pinned as
  // live candles stream in
  const applyFollow = () => {
    const v = viewRef.current;
    const len = candlesRef.current.length;
    if (!v.follow || !len) return;
    const visCount = Math.max(8, Math.floor(plotWOf() / v.pxPer));
    v.startIndex = Math.max(0, len - visCount + 2);
  };
  const refollow = () => {
    const v = viewRef.current;
    const len = candlesRef.current.length;
    const visCount = Math.floor(plotWOf() / v.pxPer);
    v.follow = v.startIndex >= len - visCount - 1;
  };

  const paint = () => {
    const canvas = canvasRef.current, wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);   // LSE cap
    const W = wrap.clientWidth, H = wrap.clientHeight;
    if (!W || !H) return;
    const bw = Math.round(W * dpr), bh = Math.round(H * dpr);
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width = bw; canvas.height = bh;
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
    }
    if (!offRef.current) offRef.current = document.createElement('canvas');
    const off = offRef.current;
    if (off.width !== bw || off.height !== bh) { off.width = bw; off.height = bh; }
    const octx = off.getContext('2d');
    if (!octx) return;
    octx.setTransform(dpr, 0, 0, dpr, 0, 0);
    paintChart({
      ctx: octx, W, H,
      candles: candlesRef.current,
      view: viewRef.current,
      hover: hoverRef.current,
      theme: themeRef.current,
      badge: badgeRef.current,
      tf: tfRef.current,
      modelled: true,  // real print aggregation lands with phase 6
    });
    // DOUBLE-BUFFER BLIT: one copy, never a half-drawn frame on screen
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(off, 0, 0);
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

  // data poll — reads only refs, immune to re-renders. In-flight guard
  // matters on blocked egress: a slow fallback chain must never stack up
  // behind the poll and bury the server in duplicate requests.
  const busyRef = useRef(false);
  useEffect(() => {
    let dead = false;
    const load = async () => {
      if (busyRef.current) return;
      if (rtRef.current) return;   // WS is authoritative while it is live
      busyRef.current = true;
      try {
        const r = await loadCandles(source, tf).catch(() => null);
        if (dead || !r) return;
        candlesRef.current = r.candles;
        setBadge(r.badge);
        applyFollow();
        scheduleRef.current();
      } finally {
        busyRef.current = false;
      }
    };
    load();
    const t = setInterval(load, 3000);
    return () => { dead = true; clearInterval(t); };
  }, [source, tf]);

  // realtime ticks — browser-direct WS (fstream, .vision mirror fallback).
  // kline events carry authoritative OHLCV and candle rolls; aggTrade ticks
  // the close between kline frames so every print moves the price tag.
  useEffect(() => {
    if (source !== 'binance') { setRtOn(false); return; }
    return openLiveFeed('BTCUSDT', tf,
      (k) => {
        const cs = candlesRef.current;
        const last = cs[cs.length - 1];
        if (!last) return;
        if (k.openTime === last.ts) {
          last.open = k.o; last.high = k.h; last.low = k.l;
          last.close = k.c; last.volume = k.v;
        } else if (k.openTime > last.ts) {
          cs.push({ ts: k.openTime, open: k.o, high: k.h, low: k.l,
                    close: k.c, volume: k.v });
          if (cs.length > 800) cs.shift();
        } else {
          return;                              // stale frame
        }
        applyFollow();
        scheduleRef.current();
      },
      (t) => {
        const cs = candlesRef.current;
        const last = cs[cs.length - 1];
        if (!last) return;
        last.close = t.price;
        if (t.price > last.high) last.high = t.price;
        if (t.price < last.low) last.low = t.price;
        scheduleRef.current();
      },
      setRtOn);
  }, [source, tf]);

  // resize
  useEffect(() => {
    const ro = new ResizeObserver(() => { applyFollow(); scheduleRef.current(); });
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => { ro.disconnect(); cancelAnimationFrame(rafRef.current); };
  }, []);

  useEffect(() => { scheduleRef.current(); }, [theme]);

  // ── LSE navigation: non-passive wheel bound natively ──────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const v = viewRef.current;
      const len = candlesRef.current.length;
      const plotW = plotWOf();
      if (!len || plotW < 1) return;
      const spacing = v.pxPer;
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (horizontal) {
        // fractional pan, like the LSE trackpad path
        const amt = e.shiftKey ? e.deltaY : e.deltaX;
        v.startIndex = Math.max(0, Math.min(len - 10,
          v.startIndex + (amt * 0.2) / spacing));
      } else {
        // discrete geometric level, RIGHT edge anchored, instant
        const next = Math.min(MAX_PX, Math.max(MIN_PX,
          nextZoomLevel(v.pxPer, e.deltaY < 0)));
        if (next !== v.pxPer) {
          const right = v.startIndex + plotW / spacing;
          v.startIndex = Math.max(0, right - plotW / next);
          v.pxPer = next;
          v.morphTarget = morphTargetFor(next);
        }
      }
      refollow();
      scheduleRef.current();
    };
    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', onWheel);
  }, []);

  // ── input: pixel-exact drag pan + hover crosshair ─────────────────────
  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0 }}>
      <canvas
        ref={canvasRef}
        onDoubleClick={() => {
          viewRef.current = { ...defaultView(), pxPer: 12 };
          applyFollow();
          scheduleRef.current();
        }}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          dragRef.current = { x: e.clientX,
                              start: viewRef.current.startIndex };
        }}
        onPointerMove={(e) => {
          const r = (e.target as HTMLElement).getBoundingClientRect();
          hoverRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
          if (dragRef.current) {
            const v = viewRef.current;
            const len = candlesRef.current.length;
            const dx = e.clientX - dragRef.current.x;
            v.startIndex = Math.max(0, Math.min(len - 10,
              dragRef.current.start - dx / v.pxPer));
            refollow();
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
                    display: 'flex', gap: 4, flexWrap: 'wrap',
                    justifyContent: 'flex-end', maxWidth: '70%' }}>
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
