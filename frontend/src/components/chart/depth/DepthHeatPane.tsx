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
  GLOBAL_SCHEME_EVENT,
  loadGlobalScheme,
  saveGlobalScheme,
  type DepthEventMsg,
  type DepthHeatSettings,
  type DepthWsFrame,
  type TradeEventMsg,
} from './depthHeatTypes';
import { DepthHeatRenderer } from './DepthHeatRenderer';
import DepthHeatSettingsWindow from './DepthHeatSettingsWindow';
import DepthHeatCob, { ClientBook } from './DepthHeatCob';
import DepthHeatSessions, { type SessionMeta } from './DepthHeatSessions';
import DepthHeatTsPanel from './DepthHeatTsPanel';

const HISTORY_SECONDS = 4 * 3600;   // pane-open history fill (S1)

function settingsKey(symbol: string) {
  return `lset-depth-settings:${symbol}`;
}

function loadSettings(symbol: string): DepthHeatSettings {
  let base = { ...DEFAULT_DEPTH_SETTINGS };
  let parsed: Partial<DepthHeatSettings> | null = null;
  try {
    const raw = localStorage.getItem(settingsKey(symbol));
    if (raw) {
      parsed = JSON.parse(raw);
      base = { ...base, ...parsed };
    }
  } catch { /* fall through to defaults */ }
  // V3 migration: the V2 overlay strip's off-state carries over to the
  // context-stack toggle.
  if (parsed && parsed.subpanes === undefined
    && (parsed as any).showVolumeStrip === false) {
    base.subpanes = false;
  }
  // "Apply scheme globally" (S2): the terminal-wide scheme wins on load.
  const g = loadGlobalScheme();
  if (g.apply) base = { ...base, scheme: g.scheme, applySchemeGlobally: true };
  return base;
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
  // The COB column's persistent book (S8): engine patch semantics, seeded
  // from /api/orderflow/book, then fed by the live depth frames.
  const cobBookRef = useRef<ClientBook | null>(null);
  if (!cobBookRef.current) cobBookRef.current = new ClientBook();
  const [state, setState] = useState<PaneState>({ kind: 'loading' });
  const [settings, setSettings] = useState<DepthHeatSettings>(
    () => loadSettings(symbol));
  const [contrast, setContrast] = useState(50);   // S3 slider above the pane
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [cutoffRange, setCutoffRange] = useState<[number, number] | null>(null);
  const [sessionsOpen, setSessionsOpen] = useState(false);
  const [recording, setRecording] = useState<{ rid: string; since: number } | null>(null);
  const [recError, setRecError] = useState<string | null>(null);
  const [recElapsed, setRecElapsed] = useState(0);
  const [loadedSession, setLoadedSession] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  // Settings persistence (per instrument — H6) with live renderer apply.
  const updateSettings = useCallback((patch: Partial<DepthHeatSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      // Scheme changes broadcast terminal-wide when "apply globally" is on.
      if (next.applySchemeGlobally && patch.scheme && patch.scheme !== prev.scheme) {
        saveGlobalScheme(patch.scheme, true);
        window.dispatchEvent(new CustomEvent(GLOBAL_SCHEME_EVENT,
          { detail: { scheme: patch.scheme, source: symbol } }));
      }
      saveSettings(symbol, next);
      rendererRef.current?.setSettings(next);
      rendererRef.current?.refreshCutoffs();
      return next;
    });
  }, [symbol]);

  // Follow terminal-wide scheme changes made from sibling panes.
  useEffect(() => {
    const onGlobal = (e: Event) => {
      const d = (e as CustomEvent).detail as { scheme: 'heat' | 'greyscale'; source: string };
      if (d.source === symbol) return;   // own broadcast already applied
      setSettings((prev) => {
        if (!prev.applySchemeGlobally || prev.scheme === d.scheme) return prev;
        const next = { ...prev, scheme: d.scheme };
        saveSettings(symbol, next);
        rendererRef.current?.setSettings(next);
        return next;
      });
    };
    window.addEventListener(GLOBAL_SCHEME_EVENT, onGlobal);
    return () => window.removeEventListener(GLOBAL_SCHEME_EVENT, onGlobal);
  }, [symbol]);

  // ── recording (S10): start/stop + elapsed ticker ─────────────────────
  const startRecording = useCallback(async () => {
    setRecError(null);
    try {
      const r = await fetch('/api/orderflow/record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol }),
      });
      const body = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(String(body.detail || `HTTP ${r.status}`));
      setRecording({ rid: body.id ?? body.sid ?? '', since: Date.now() });
    } catch (e) {
      setRecError(String(e));
    }
  }, [symbol]);

  const stopRecording = useCallback(async () => {
    try {
      await fetch('/api/orderflow/record/stop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: recording?.rid ?? '' }),
      });
    } catch { /* the sessions list shows the true state regardless */ }
    setRecording(null);
    setRecElapsed(0);
  }, [recording]);

  useEffect(() => {
    if (!recording) return;
    const iv = setInterval(() => {
      setRecElapsed(Math.floor((Date.now() - recording.since) / 1000));
    }, 1000);
    return () => clearInterval(iv);
  }, [recording]);

  // ── session loading (S10): a recording becomes the pane's history ────
  const loadSessionEvents = useCallback((events: any[], meta: SessionMeta) => {
    const r = rendererRef.current;
    if (!r || !events.length) return;
    const depths = events.filter((e) =>
      e.type === 'SNAPSHOT' || e.type === 'DELTA') as DepthEventMsg[];
    const trades = events.filter((e) => typeof e.side === 'string');
    r.ingestHistory(depths);              // resets columns, cutoffs, dots
    cobBookRef.current?.seed([], []);
    for (const ev of depths) cobBookRef.current?.apply(ev);
    for (const t of trades) r.addTrade(t);
    setLoadedSession(meta.id);
  }, []);

  const backToLive = useCallback(() => {
    setLoadedSession(null);
    setReloadToken((t) => t + 1);
  }, []);

  // Renderer lifecycle.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const r = new DepthHeatRenderer(loadSettings(symbol));
    rendererRef.current = r;
    r.attach(canvas);
    r.setBookSource(cobBookRef.current);   // V4 fused ladder reads the book
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
    cobBookRef.current?.seed([], []);   // fresh book per symbol

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
        // V3: deterministic print history — bubbles, path and the context
        // strips render on open instead of waiting for live warm-up.
        for (const t of (data.trades || []) as TradeEventMsg[]) {
          r.addTrade(t);
        }
      } catch (e) {
        if (!cancelled) {
          setState({ kind: 'nodata', reason: `engine unreachable: ${e}` });
        }
        return;
      }
      // 2. current book for the BBO lines / COB context (honours the
      //    pane's active-range override + depth-reset policy — S6/S11)
      try {
        const st = loadSettings(symbol);
        const q = new URLSearchParams({ symbol });
        if (st.activeRange > 0) q.set('active_levels', String(st.activeRange));
        q.set('reset', st.resetPolicy);
        if (st.resetPolicy === 'interval') {
          q.set('reset_interval_min', String(st.resetIntervalMin));
        }
        const res = await fetch(`/api/orderflow/book?${q.toString()}`);
        if (res.ok) {
          const b = await res.json();
          r.setBook(b.best_bid ?? null, b.best_ask ?? null);
          cobBookRef.current?.seed(b.bids ?? [], b.asks ?? []);
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
          cobBookRef.current?.apply(frame.event);   // S8 ladder live feed
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, reloadToken]);

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
        {/* view mode: liquidity heat vs classic footprint */}
        <span style={{
          display: 'inline-flex', border: '1px solid #2a2e39', borderRadius: 4,
          overflow: 'hidden',
        }}>
          {(['heat', 'footprint'] as const).map((v) => (
            <button
              key={v}
              onClick={() => updateSettings({ view: v })}
              title={v === 'heat'
                ? 'Resting liquidity heat field'
                : 'Footprint: bid×ask executed volume per price and time bucket'}
              style={{
                background: settings.view === v ? '#2b3547' : 'transparent',
                color: settings.view === v ? '#eef1f6' : '#93a0b1',
                border: 'none', fontSize: 9, letterSpacing: 0.5,
                padding: '2px 7px', cursor: 'pointer',
              }}
            >{v === 'heat' ? 'HEAT' : 'FOOTPRINT'}</button>
          ))}
        </span>
        {status && (
          <span style={{
            padding: '0 6px', borderRadius: 3, fontSize: 9, letterSpacing: 0.5,
            background: state.kind === 'live' && state.demo
              ? 'rgba(255, 152, 0, 0.25)' : 'rgba(120, 144, 156, 0.25)',
            color: state.kind === 'live' && state.demo ? '#ffb74d' : '#b0bec5',
          }}>{status}</span>
        )}
        <span style={{
          marginLeft: 'auto', fontSize: 9, letterSpacing: 0.6, opacity: 0.55,
        }}>CUT-OFF</span>
        <input
          type="range" min={0} max={100} value={contrast}
          onChange={(e) => setContrast(Number(e.target.value))}
          title="Cut-off window — narrows/widens where the gradient saturates (S3)"
          style={{ width: 90, accentColor: '#78909c' }}
        />
        {/* recording controls (S10) */}
        {recording ? (
          <button
            onClick={stopRecording}
            title="Stop recording this symbol's depth to MY DATA"
            style={{
              background: 'rgba(239, 83, 80, 0.14)', border: '1px solid rgba(239, 83, 80, 0.6)',
              color: '#ef9a9a', borderRadius: 4, fontSize: 10, padding: '1px 7px',
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5,
            }}
          >
            <span style={{
              width: 7, height: 7, borderRadius: '50%', background: '#ef5350',
              boxShadow: '0 0 6px rgba(239,83,80,0.9)', animation: 'dh-pulse 1.1s infinite',
            }} />
            REC {Math.floor(recElapsed / 60)}:{String(recElapsed % 60).padStart(2, '0')} — stop
          </button>
        ) : (
          <button
            onClick={startRecording}
            title="Record live depth + trades to workspace/MY DATA (S10)"
            style={{
              background: 'transparent', border: '1px solid #2a2e39', color: '#9aa4b2',
              borderRadius: 4, fontSize: 10, padding: '1px 7px', cursor: 'pointer',
            }}
          >● REC</button>
        )}
        <button
          onClick={() => setSessionsOpen(true)}
          title="Recorded sessions (workspace/MY DATA)"
          style={{
            background: 'transparent', border: '1px solid #2a2e39', color: '#9aa4b2',
            borderRadius: 4, fontSize: 10, padding: '1px 7px', cursor: 'pointer',
          }}
        >🗂 sessions</button>
        <button
          onClick={() => updateSettings({ showTsPanel: !settings.showTsPanel })}
          title="Time & sales drawer: every executed print with min-size and side filters (V4)"
          style={{
            background: settings.showTsPanel ? '#1d232e' : 'transparent',
            border: '1px solid #2a2e39', color: '#9aa4b2',
            borderRadius: 4, fontSize: 10, padding: '1px 7px', cursor: 'pointer',
          }}
        >T&amp;S</button>
        {loadedSession && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 9,
            padding: '1px 6px', borderRadius: 3, letterSpacing: 0.4,
            background: 'rgba(120, 144, 156, 0.18)', color: '#a7b4c2',
          }}>
            SESSION LOADED
            <button
              onClick={backToLive}
              title="Return to the live feed"
              style={{
                background: 'transparent', border: 'none', color: '#c8cfda',
                cursor: 'pointer', fontSize: 10, padding: 0,
              }}
            >✕</button>
          </span>
        )}
        {recError && (
          <span title={recError} style={{
            fontSize: 9, color: '#ef9a9a', maxWidth: 150,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>rec: {recError}</span>
        )}
        <button
          onClick={() => {
            setCutoffRange(rendererRef.current?.getCutoffs() ?? null);
            setSettingsOpen(true);
          }}
          title="Depth Heat settings (or right-click the heatmap)"
          style={{
            background: settingsOpen ? '#1d232e' : 'transparent',
            border: '1px solid #2a2e39', color: '#c8cfda',
            borderRadius: 4, fontSize: 11, padding: '1px 7px', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 4,
          }}
        >⚙<span style={{ fontSize: 10, opacity: 0.8 }}>settings</span></button>
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

      <div
        style={{
          position: 'relative', flex: 1, minHeight: 0,
          display: 'flex', flexDirection: 'row',
        }}
        onContextMenu={(e) => {
          // Right-click = pane settings (matches chart conventions, §5.2).
          e.preventDefault();
          setCutoffRange(rendererRef.current?.getCutoffs() ?? null);
          setSettingsOpen(true);
        }}
      >
        <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
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
        {/* COB column (S8): numeric ladder, pixel-aligned with the heat.
            In fused ladder mode (V4) the figures live in the axis gutter
            instead, so the panel stays hidden. */}
        {settings.cob && settings.ladderMode === 'panel' && state.kind === 'live' && (
          <DepthHeatCob
            rendererRef={rendererRef}
            book={cobBookRef.current!}
            settings={settings}
          />
        )}
        {settingsOpen && (
          <DepthHeatSettingsWindow
            symbol={symbol}
            settings={settings}
            cutoffRange={cutoffRange}
            onChange={(patch) => {
              updateSettings(patch);
              // keep the resolved cut-off readout honest while editing
              setCutoffRange(rendererRef.current?.getCutoffs() ?? null);
            }}
            onClose={() => setSettingsOpen(false)}
          />
        )}
        {sessionsOpen && (
          <DepthHeatSessions
            symbol={symbol}
            onLoad={loadSessionEvents}
            onClose={() => setSessionsOpen(false)}
          />
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
