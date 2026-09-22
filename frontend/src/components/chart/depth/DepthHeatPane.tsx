// ============================================================================
// depth/DepthHeatPane.tsx — Depth Heat pane (F1, H5) — OWN PROFESSIONAL UI
// Rewritten to clean zinc #1c1c1c/#262626/#2a2a2a/#3a3a3a #e8e8e8/#b9b9b9
// No #0b0e11 legacy colors — matches EdgeDepthHeatmapPane & main top bar
// Functional: history fill 4h, live WS depth, BBO, COB, T&S, sessions, REC
// Zero blank/lag: ResizeObserver DPR, rAF, double-buffer, fallback demo
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

const HISTORY_SECONDS = 4 * 3600;

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
  } catch {}
  if (parsed && (parsed as any).subpanes === undefined && (parsed as any).showVolumeStrip === false) {
    base.subpanes = false;
  }
  const g = loadGlobalScheme();
  if (g.apply) base = { ...base, scheme: g.scheme, applySchemeGlobally: true };
  return base;
}

function saveSettings(symbol: string, s: DepthHeatSettings) {
  try {
    localStorage.setItem(settingsKey(symbol), JSON.stringify(s));
  } catch {}
}

type PaneState =
  | { kind: 'loading' }
  | { kind: 'nodata'; reason: string }
  | { kind: 'live'; demo: boolean; provider: string };

export default function DepthHeatPane({
  symbol,
  sourceProvider,
  colors,
  syncedCrosshairTime,
  onCrosshairMove,
  onToggleKind,
}: {
  symbol: string;
  sourceProvider?: string;
  colors?: any;
  syncedCrosshairTime?: number | null;
  onCrosshairMove?: (t: number | null) => void;
  onToggleKind?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<DepthHeatRenderer | null>(null);
  const cobBookRef = useRef<ClientBook | null>(null);
  if (!cobBookRef.current) cobBookRef.current = new ClientBook();
  const [state, setState] = useState<PaneState>({ kind: 'loading' });
  const [settings, setSettings] = useState<DepthHeatSettings>(() => loadSettings(symbol));
  const [contrast, setContrast] = useState(50);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [cutoffRange, setCutoffRange] = useState<[number, number] | null>(null);
  const [sessionsOpen, setSessionsOpen] = useState(false);
  const [recording, setRecording] = useState<{ rid: string; since: number } | null>(null);
  const [recError, setRecError] = useState<string | null>(null);
  const [recElapsed, setRecElapsed] = useState(0);
  const [loadedSession, setLoadedSession] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const updateSettings = useCallback(
    (patch: Partial<DepthHeatSettings>) => {
      setSettings(prev => {
        const next = { ...prev, ...patch };
        if (next.applySchemeGlobally && patch.scheme && patch.scheme !== prev.scheme) {
          saveGlobalScheme(patch.scheme, true);
          window.dispatchEvent(new CustomEvent(GLOBAL_SCHEME_EVENT, { detail: { scheme: patch.scheme, source: symbol } }));
        }
        saveSettings(symbol, next);
        rendererRef.current?.setSettings(next);
        rendererRef.current?.refreshCutoffs();
        return next;
      });
    },
    [symbol]
  );

  useEffect(() => {
    const onGlobal = (e: Event) => {
      const d = (e as CustomEvent).detail as { scheme: 'heat' | 'greyscale'; source: string };
      if (d.source === symbol) return;
      setSettings(prev => {
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
    } catch {}
    setRecording(null);
    setRecElapsed(0);
  }, [recording]);

  useEffect(() => {
    if (!recording) return;
    const iv = setInterval(() => setRecElapsed(Math.floor((Date.now() - recording.since) / 1000)), 1000);
    return () => clearInterval(iv);
  }, [recording]);

  const loadSessionEvents = useCallback((events: any[], meta: SessionMeta) => {
    const r = rendererRef.current;
    if (!r || !events.length) return;
    const depths = events.filter(e => e.type === 'SNAPSHOT' || e.type === 'DELTA') as DepthEventMsg[];
    const trades = events.filter(e => typeof e.side === 'string');
    r.ingestHistory(depths);
    cobBookRef.current?.seed([], []);
    for (const ev of depths) cobBookRef.current?.apply(ev);
    for (const t of trades) r.addTrade(t);
    setLoadedSession(meta.id);
  }, []);

  const backToLive = useCallback(() => {
    setLoadedSession(null);
    setReloadToken(t => t + 1);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const r = new DepthHeatRenderer(loadSettings(symbol));
    rendererRef.current = r;
    r.attach(canvas);
    r.setBookSource(cobBookRef.current);
    if (onCrosshairMove) r.onHoverTime = t => onCrosshairMove(t);
    return () => {
      r.dispose();
      rendererRef.current = null;
    };
  }, [symbol]);

  useEffect(() => {
    rendererRef.current?.setSettings(settings);
  }, [settings]);

  useEffect(() => {
    rendererRef.current?.setSyncedCrosshair(syncedCrosshairTime ?? null);
  }, [syncedCrosshairTime]);

  useEffect(() => {
    let cancelled = false;
    let ws: WebSocket | null = null;
    setState({ kind: 'loading' });
    cobBookRef.current?.seed([], []);

    const load = async () => {
      const r = rendererRef.current;
      if (!r) return;
      const now = Date.now() / 1000;
      const prov = sourceProvider ? `&provider=${encodeURIComponent(sourceProvider)}` : '';
      let demo = false,
        provider = '';
      try {
        const res = await fetch(
          `/api/orderflow/depth?symbol=${encodeURIComponent(symbol)}` + prov + `&from=${now - HISTORY_SECONDS}&to=${now}&column_ms=1000&max_levels=60`
        );
        if (!res.ok) {
          const body = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }));
          if (!cancelled) setState({ kind: 'nodata', reason: String(body.detail || res.status) });
          return;
        }
        const data = await res.json();
        if (cancelled) return;
        demo = !!data.demo;
        provider = data.provider;
        r.ingestHistory((data.events || []) as DepthEventMsg[]);
        for (const t of (data.trades || []) as TradeEventMsg[]) r.addTrade(t);
      } catch (e) {
        if (!cancelled) setState({ kind: 'nodata', reason: `engine unreachable: ${e}` });
        return;
      }
      try {
        const st = loadSettings(symbol);
        const q = new URLSearchParams({ symbol });
        if (sourceProvider) q.set('provider', sourceProvider);
        if (st.activeRange > 0) q.set('active_levels', String(st.activeRange));
        q.set('reset', st.resetPolicy);
        if (st.resetPolicy === 'interval') q.set('reset_interval_min', String(st.resetIntervalMin));
        const res = await fetch(`/api/orderflow/book?${q.toString()}`);
        if (res.ok) {
          const b = await res.json();
          r.setBook(b.best_bid ?? null, b.best_ask ?? null);
          cobBookRef.current?.seed(b.bids ?? [], b.asks ?? []);
        }
      } catch {}
      if (!cancelled) setState({ kind: 'live', demo, provider });

      const proto = location.protocol === 'https:' ? 'wss' : 'ws';
      ws = new WebSocket(`${proto}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(symbol)}${prov}`);
      ws.onmessage = m => {
        if (cancelled) return;
        let frame: DepthWsFrame;
        try {
          frame = JSON.parse(m.data);
        } catch {
          return;
        }
        const rr = rendererRef.current;
        if (!rr) return;
        if (frame.type === 'depth') {
          rr.applyDepth(frame.event);
          cobBookRef.current?.apply(frame.event);
          if (frame.event.type === 'SNAPSHOT') {
            let bb: number | null = null,
              ba: number | null = null;
            for (const [p] of frame.event.bids) if (bb === null || p > bb) bb = p;
            for (const [p] of frame.event.asks) if (ba === null || p < ba) ba = p;
            rr.setBook(bb, ba);
          }
        } else if (frame.type === 'trade') {
          rr.addTrade(frame.event);
        } else if (frame.type === 'error') {
          setState({ kind: 'nodata', reason: frame.message });
        }
      };
    };
    load();
    return () => {
      cancelled = true;
      try {
        ws?.close();
      } catch {}
    };
  }, [symbol, reloadToken, sourceProvider]);

  useEffect(() => {
    const base = settings.cutoffMode === 'percentile';
    if (!base) return;
    const span = 90 - contrast * 0.8;
    const lo = Math.max(0, 50 - span / 2);
    const hi = Math.min(100, 50 + span / 2);
    updateSettings({ cutoffLower: lo, cutoffUpper: hi });
  }, [contrast]);

  const status = useMemo(() => {
    if (state.kind === 'live' && state.demo) return 'DEMO';
    if (state.kind === 'live') return state.provider.toUpperCase();
    return '';
  }, [state]);

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
      rendererRef.current?.drag(e.clientX - dragRef.current.x, e.clientY - dragRef.current.y);
      dragRef.current = { x: e.clientX, y: e.clientY };
    }
    rendererRef.current?.setHover(e.clientX - rect.left, e.clientY - rect.top);
  }, []);
  const onMouseUp = useCallback(() => {
    dragRef.current = null;
  }, []);
  const onMouseLeave = useCallback(() => {
    dragRef.current = null;
    rendererRef.current?.setHover(null, null);
  }, []);
  const onDblClick = useCallback(() => {
    rendererRef.current?.recenter();
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col bg-[#1c1c1c] text-[#e8e8e8] select-none">
      {/* Professional top bar — own zinc design */}
      <div className="flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] text-[12px] shrink-0">
        <span className="font-bold tracking-wider text-[11px] text-[#e8e8e8]">DEPTH HEAT</span>
        <span className="font-mono font-semibold text-[13px] text-[#e8e8e8]">{symbol}</span>
        <div className="flex items-center gap-0.5 ml-2 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]">
          {(['heat', 'footprint'] as const).map(v => (
            <button
              key={v}
              onClick={() => updateSettings({ view: v })}
              title={v === 'heat' ? 'Resting liquidity heat field' : 'Footprint: bid×ask executed volume'}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                settings.view === v ? 'bg-[#e8e8e8] text-[#1c1c1c] shadow-sm' : 'bg-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]'
              }`}
            >
              {v === 'heat' ? 'HEAT' : 'FOOTPRINT'}
            </button>
          ))}
        </div>
        {status && (
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
              state.kind === 'live' && (state as any).demo
                ? 'bg-[#f59e0b]/10 border-[#f59e0b]/20 text-[#f59e0b]'
                : 'bg-[#262626] border-[#3a3a3a] text-[#b9b9b9]'
            }`}
          >
            {status}
          </span>
        )}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-[10px] tracking-wider text-[#6a6a6a] hidden lg:block">CUT-OFF</span>
          <input
            type="range"
            min={0}
            max={100}
            value={contrast}
            onChange={e => setContrast(Number(e.target.value))}
            title="Cut-off window — narrows/widens where gradient saturates"
            className="w-[90px] accent-[#e8e8e8]"
          />
          {recording ? (
            <button
              onClick={stopRecording}
              title="Stop recording"
              className="px-3 py-1 rounded-full border text-[11px] font-medium flex items-center gap-1.5 bg-[#f0426c]/10 border-[#f0426c]/30 text-[#f0426c] hover:bg-[#f0426c]/20 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#f0426c] animate-pulse" /> REC {Math.floor(recElapsed / 60)}:{String(recElapsed % 60).padStart(2, '0')}
            </button>
          ) : (
            <button
              onClick={startRecording}
              title="Record live depth to MY DATA"
              className="px-2.5 py-1 rounded-md border border-[#3a3a3a] bg-[#262626] text-[11px] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8] transition-colors"
            >
              ● REC
            </button>
          )}
          <button
            onClick={() => setSessionsOpen(true)}
            title="Recorded sessions"
            className="px-2.5 py-1 rounded-md border border-[#3a3a3a] bg-[#262626] text-[11px] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8] transition-colors"
          >
            Sessions
          </button>
          <button
            onClick={() => updateSettings({ showTsPanel: !settings.showTsPanel })}
            title="Time & sales drawer"
            className={`px-2.5 py-1 rounded-md border text-[11px] transition-colors ${
              settings.showTsPanel ? 'bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]' : 'bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]'
            }`}
          >
            T&S
          </button>
          {loadedSession && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9]">
              SESSION
              <button onClick={backToLive} className="ml-1 w-4 h-4 rounded-full bg-[#1c1c1c] border border-[#3a3a3a] flex items-center justify-center hover:text-[#e8e8e8]">
                ×
              </button>
            </span>
          )}
          <button
            onClick={() => {
              setCutoffRange(rendererRef.current?.getCutoffs() ?? null);
              setSettingsOpen(true);
            }}
            title="Depth Heat settings"
            className={`w-8 h-8 rounded-md border flex items-center justify-center transition-colors ${
              settingsOpen ? 'bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]' : 'bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]'
            }`}
          >
            ⚙
          </button>
          {onToggleKind && (
            <button
              onClick={onToggleKind}
              className="px-3 py-1.5 rounded-md border border-[#3a3a3a] bg-[#262626] text-[11px] font-medium text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8] transition-colors"
            >
              Chart ⇄
            </button>
          )}
        </div>
      </div>

      <div
        className="relative flex-1 min-h-0 flex flex-row bg-[#1c1c1c]"
        onContextMenu={e => {
          e.preventDefault();
          setCutoffRange(rendererRef.current?.getCutoffs() ?? null);
          setSettingsOpen(true);
        }}
      >
        <div className="relative flex-1 min-w-0">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block"
            onWheel={onWheel}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onDoubleClick={onDblClick}
          />
          {state.kind === 'loading' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-[#1c1c1c]/80 backdrop-blur-sm">
              <div className="text-[12px] font-mono text-[#e8e8e8]">Loading depth history…</div>
              <div className="text-[10px] text-[#6a6a6a] mt-1">{symbol} • 4h buffer</div>
            </div>
          )}
          {state.kind === 'nodata' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1c1c1c] text-center p-6">
              <div className="w-12 h-12 rounded-full bg-[#262626] border border-[#3a3a3a] flex items-center justify-center text-[20px] mb-3">◧</div>
              <div className="text-[13px] font-semibold text-[#e8e8e8]">No depth data for {symbol}</div>
              <div className="text-[11px] text-[#6a6a6a] mt-2 max-w-[360px]">{state.reason}</div>
              <button onClick={() => setReloadToken(t => t + 1)} className="mt-4 px-4 py-1.5 rounded-md bg-[#262626] border border-[#3a3a3a] text-[12px] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]">
                Retry
              </button>
            </div>
          )}
        </div>
        {settings.cob && settings.ladderMode === 'panel' && state.kind === 'live' && (
          <DepthHeatCob rendererRef={rendererRef} book={cobBookRef.current!} settings={settings} />
        )}
        {settingsOpen && (
          <DepthHeatSettingsWindow
            symbol={symbol}
            settings={settings}
            cutoffRange={cutoffRange}
            onChange={patch => {
              updateSettings(patch);
              setCutoffRange(rendererRef.current?.getCutoffs() ?? null);
            }}
            onClose={() => setSettingsOpen(false)}
          />
        )}
        {sessionsOpen && <DepthHeatSessions symbol={symbol} onLoad={loadSessionEvents} onClose={() => setSessionsOpen(false)} />}
      </div>
      {recError && (
        <div className="px-3 py-1.5 text-[10px] text-[#f0426c] bg-[#f0426c]/5 border-t border-[#f0426c]/10 truncate">rec: {recError}</div>
      )}
    </div>
  );
}
