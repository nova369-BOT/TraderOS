// ============================================================================
// depth/DepthHeatPane.tsx — the Depth Heat pane (F1, H5).
//
// React owns lifecycle, settings and data plumbing ONLY; the renderer runs
// its own rAF loop and never reads React state per frame (plan §5.2).
//
// Data honesty (plan §1.3): the pane renders real depth only where real
// depth exists. When no source carries depth for the symbol it shows
// "No depth data for {symbol}" plus the engine's reason — never synthesis.
// Demo/synthetic sources are labelled in the pane header.
// ============================================================================

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DEFAULT_DEPTH_SETTINGS,
  type DepthEventMsg,
  type DepthHeatSettings,
  type DepthWsFrame,
} from './depthHeatTypes';
import { DepthHeatRenderer } from './DepthHeatRenderer';

const HISTORY_SECONDS = 4 * 3600;   // pane-open history fill (S1)

function settingsKey(symbol: string) {
  return `lset-depth-settings:${symbol}`;
}

function loadSettings(symbol: string): DepthHeatSettings {
  try {
    const raw = localStorage.getItem(settingsKey(symbol));
    if (raw) return { ...DEFAULT_DEPTH_SETTINGS, ...JSON.parse(raw) };
  } catch { /* fall through to defaults */ }
  return { ...DEFAULT_DEPTH_SETTINGS };
}

function saveSettings(symbol: string, s: DepthHeatSettings) {
  try { localStorage.setItem(settingsKey(symbol), JSON.stringify(s)); }
  catch { /* private mode: settings stay in-session */ }
}

type PaneState =
  | { kind: 'loading' }
  | { kind: 'nodata'; reason: string }
  | { kind: 'live'; demo: boolean; provider: string };

export default function DepthHeatPane({
  symbol, colors, syncedCrosshairTime, onCrosshairMove, onToggleKind,
}: {
  symbol: string;
  colors?: any;
  syncedCrosshairTime?: number | null;
  onCrosshairMove?: (t: number | null) => void;
  onToggleKind?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<DepthHeatRenderer | null>(null);
  const [state, setState] = useState<PaneState>({ kind: 'loading' });
  const [settings, setSettings] = useState<DepthHeatSettings>(
    () => loadSettings(symbol));
  const [contrast, setContrast] = useState(50);   // S3 slider above the pane

  // Settings persistence (per instrument, H6-lite).
  const updateSettings = useCallback((patch: Partial<DepthHeatSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      saveSettings(symbol, next);
      rendererRef.current?.setSettings(next);
      rendererRef.current?.refreshCutoffs();
      return next;
    });
  }, [symbol]);

  // Renderer lifecycle.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const r = new DepthHeatRenderer(loadSettings(symbol));
    rendererRef.current = r;
    r.attach(canvas);
    if (onCrosshairMove) {
      r.onHoverTime = (t) => onCrosshairMove(t);
    }
    return () => {
      r.dispose();
      rendererRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol]);

  useEffect(() => {
    rendererRef.current?.setSettings(settings);
  }, [settings]);

  useEffect(() => {
    rendererRef.current?.setSyncedCrosshair(
      syncedCrosshairTime ?? null);
  }, [syncedCrosshairTime]);

  // Data plumbing: history fill, then the live depth topic.
  useEffect(() => {
    let cancelled = false;
    let ws: WebSocket | null = null;
    setState({ kind: 'loading' });

    const load = async () => {
      const r = rendererRef.current;
      if (!r) return;
      const now = Date.now() / 1000;
      // 1. history grid fill
      let demo = false, provider = '';
      try {
        const res = await fetch(
          `/api/orderflow/depth?symbol=${encodeURIComponent(symbol)}` +
          `&from=${now - HISTORY_SECONDS}&to=${now}&column_ms=1000&max_levels=60`);
        if (!res.ok) {
          const body = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }));
          if (!cancelled) {
            setState({ kind: 'nodata', reason: String(body.detail || res.status) });
          }
          return;
        }
        const data = await res.json();
        if (cancelled) return;
        demo = !!data.demo;
        provider = data.provider;
        // live_only sources (crypto public feeds) carry no history: the
        // event list is empty and the pane paints from the live topic,
        // showing its honest range (plan §2.3).
        r.ingestHistory((data.events || []) as DepthEventMsg[]);
      } catch (e) {
        if (!cancelled) {
          setState({ kind: 'nodata', reason: `engine unreachable: ${e}` });
        }
        return;
      }
      // 2. current book for the BBO lines / COB context
      try {
        const res = await fetch(
          `/api/orderflow/book?symbol=${encodeURIComponent(symbol)}`);
        if (res.ok) {
          const b = await res.json();
          r.setBook(b.best_bid ?? null, b.best_ask ?? null);
        }
      } catch { /* BBO lines simply stay off */ }
      if (!cancelled) setState({ kind: 'live', demo, provider });

      // 3. live depth topic: SNAPSHOT on subscribe, coalesced DELTAs, trades
      const proto = location.protocol === 'https:' ? 'wss' : 'ws';
      ws = new WebSocket(
        `${proto}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(symbol)}`);
      ws.onmessage = (m) => {
        if (cancelled) return;
        let frame: DepthWsFrame;
        try { frame = JSON.parse(m.data); } catch { return; }
        const rr = rendererRef.current;
        if (!rr) return;
        if (frame.type === 'depth') {
          rr.applyDepth(frame.event);
          // The subscribe-time SNAPSHOT carries the full transmitted book:
          // derive the BBO lines from it. (Live-only sources like the crypto
          // public feeds have no /api/orderflow/book to seed them from; the
          // proper live BBO tracking arrives with the COB column, H7.)
          if (frame.event.type === 'SNAPSHOT') {
            let bb: number | null = null, ba: number | null = null;
            for (const [p] of frame.event.bids) {
              if (bb === null || p > bb) bb = p;
            }
            for (const [p] of frame.event.asks) {
              if (ba === null || p < ba) ba = p;
            }
            rr.setBook(bb, ba);
          }
        } else if (frame.type === 'trade') {
          rr.addTrade(frame.event);
        } else if (frame.type === 'error') {
          setState({ kind: 'nodata', reason: frame.message });
        }
      };
      ws.onclose = () => { /* pane shows the last painted field; reconnect is
                              the user's refresh — a dead engine is visible */ };
    };
    load();
    return () => {
      cancelled = true;
      try { ws?.close(); } catch { /* already closed */ }
    };
  }, [symbol]);

  // Contrast slider (S3): re-centres the cut-off window around the session
  // percentiles — left widens (more of the gradient in use), right narrows.
  useEffect(() => {
    const base = settings.cutoffMode === 'percentile';
    if (!base) return;
    const span = 90 - contrast * 0.8;      // 50 -> 50pp window
    const lo = Math.max(0, 50 - span / 2);
    const hi = Math.min(100, 50 + span / 2);
    updateSettings({ cutoffLower: lo, cutoffUpper: hi });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contrast]);

  const status = useMemo(() => {
    if (state.kind === 'live' && state.demo) return 'DEMO';
    if (state.kind === 'live') return state.provider.toUpperCase();
    return '';
  }, [state]);

  // interaction handlers
  const onWheel = useCallback((e: React.WheelEvent) => {
    rendererRef.current?.wheel(e.deltaX, e.deltaY, e.shiftKey);
  }, []);
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragRef.current = { x: e.clientX, y: e.clientY };
  }, []);
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    if (dragRef.current && e.buttons & 1) {
      rendererRef.current?.drag(
        e.clientX - dragRef.current.x, e.clientY - dragRef.current.y);
      dragRef.current = { x: e.clientX, y: e.clientY };
    }
    rendererRef.current?.setHover(e.clientX - rect.left, e.clientY - rect.top);
  }, []);
  const onMouseUp = useCallback(() => { dragRef.current = null; }, []);
  const onMouseLeave = useCallback(() => {
    dragRef.current = null;
    rendererRef.current?.setHover(null, null);
  }, []);
  const onDblClick = useCallback(() => {
    rendererRef.current?.recenter();
  }, []);

  return (
    <div style={{
      position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
      background: '#0b0e11', color: '#d1d4dc', fontSize: 11,
    }}>
      {/* contrast slider above the pane + header (S3 placement) */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '2px 8px',
        borderBottom: '1px solid var(--edge, #2a2e39)', flex: '0 0 auto',
      }}>
        <span style={{ opacity: 0.75 }}>DEPTH HEAT</span>
        <span style={{ fontWeight: 600 }}>{symbol}</span>
        {status && (
          <span style={{
            padding: '0 6px', borderRadius: 3, fontSize: 9, letterSpacing: 0.5,
            background: state.kind === 'live' && state.demo
              ? 'rgba(255, 152, 0, 0.25)' : 'rgba(120, 144, 156, 0.25)',
            color: state.kind === 'live' && state.demo ? '#ffb74d' : '#b0bec5',
          }}>{status}</span>
        )}
        <input
          type="range" min={0} max={100} value={contrast}
          onChange={(e) => setContrast(Number(e.target.value))}
          title="Contrast (cut-off window)"
          style={{ width: 90, marginLeft: 'auto', accentColor: '#78909c' }}
        />
        <select
          value={settings.scheme}
          onChange={(e) => updateSettings({ scheme: e.target.value as any })}
          style={{
            background: 'transparent', color: '#d1d4dc', border: '1px solid #2a2e39',
            borderRadius: 3, fontSize: 10,
          }}
          title="Colour scheme"
        >
          <option value="heat">heat</option>
          <option value="greyscale">greyscale</option>
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: 3, cursor: 'pointer' }}
          title="Volume dots">
          <input
            type="checkbox" checked={settings.dots}
            onChange={(e) => updateSettings({ dots: e.target.checked })}
          />
          dots
        </label>
        {onToggleKind && (
          <button
            onClick={onToggleKind}
            title="Switch pane back to the chart"
            style={{
              background: 'transparent', border: '1px solid #2a2e39', color: '#9aa4b2',
              borderRadius: 3, fontSize: 10, padding: '1px 6px', cursor: 'pointer',
            }}
          >chart ⇄</button>
        )}
      </div>

      <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          onWheel={onWheel}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onDoubleClick={onDblClick}
        />
        {state.kind === 'loading' && (
          <div style={overlay}>Loading depth history…</div>
        )}
        {state.kind === 'nodata' && (
          <div style={overlay}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>
              No depth data for {symbol}
            </div>
            <div style={{ opacity: 0.7, maxWidth: 340, textAlign: 'center' }}>
              {state.reason}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const overlay: React.CSSProperties = {
  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
  alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
  color: '#9aa4b2', fontSize: 12,
};
