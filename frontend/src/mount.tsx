// ============================================================================
// mount.tsx - bridge between the terminal shell and the chart engine.
// ULTRA-FAST EDITION: heavy islands are code-split via React.lazy so MARKETS
// (ProChart) loads without paying for DataViz (echarts), QuantModels (three),
// Notebooks, EconomicCalendar, Backtesting. Vite's manualChunks groups vendor
// deps separately. The main chart.js is now ES module with hashed chunks.
// ============================================================================

import React, { useCallback, useEffect, useMemo, useRef, useState, lazy, Suspense } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import ProChart from '@/components/chart/ProChart';
import { ChartDrawingOverlay, type Drawing, type DrawingTool } from '@/components/chart/ChartDrawingOverlay';
import { EdgeDepthDrawingRail, type Tool as EDTool } from '@/components/chart/edgedepth/EdgeDepthDrawingRail';
import { EdgeDepthChartTypePicker, type ChartTypeED } from '@/components/chart/edgedepth/EdgeDepthChartTypePicker';
import { EdgeDepthTimeframeBar, type TF as EDTF, ALL_TF as ED_ALL_TF } from '@/components/chart/edgedepth/EdgeDepthTimeframeBar';
import { EdgeDepthAppearancePanel, type AppearanceSettings, defaultAppearance } from '@/components/chart/edgedepth/EdgeDepthAppearancePanel';
import { EdgeDepthFindSymbol } from '@/components/chart/edgedepth/EdgeDepthFindSymbol';
import { EdgeDepthWidgetMenu } from '@/components/chart/edgedepth/EdgeDepthWidgetMenu';
import { DEFAULT_INDICATOR_CONFIG, type IndicatorConfig } from '@/components/chart/IndicatorSettings';
import { getDefaultColors, type Candle, type ChartType } from '@/components/chart/core/types';
import { MemoryRouter } from 'react-router-dom';
import { ChartSettingsProvider, useChartSettings, useHasSavedAppearance } from '@/contexts/ChartSettingsContext';
import { AppearancePanel, ChartSettingsPanel } from '@/components/chart/InlineChartSettings';
import MultiTimeframeLayoutSelector from '@/components/chart/MultiTimeframeLayoutSelector';
import TerminalMultiGrid from '@/components/chart/TerminalMultiGrid';
import { layoutStore, useLayoutState } from '@/lib/layoutStore';
import { setEngineContext } from '@/lib/localEngine';
import { isMarketOpenForPair } from '@/lib/marketHours';
import { initWorkspaceBridge } from '@/lib/workspaceBridge';
import { api, invalidateSection } from '@/lib/api';
import { toCustomIndicators, type EngineIndicatorPayload } from '@/lib/engineIndicators';
import './index.css';

// Heavy islands -> lazy chunks — consolidated to EdgeDepth-only for clean professional UI
const DepthHeatPane = lazy(() => import('@/components/chart/depth/DepthHeatPane'));
const EdgeDepthHeatmapPane = lazy(() => import('@/components/chart/depth/EdgeDepthHeatmapPane'));
const EdgeDepthDOMPanel = lazy(() => import('@/components/chart/edgedepth/EdgeDepthDOMPanel'));
const EdgeDepthTapePanel = lazy(() => import('@/components/chart/edgedepth/EdgeDepthTapePanel'));
const EdgeDepthWatchlist = lazy(() => import('@/components/chart/edgedepth/EdgeDepthWatchlist'));
const EdgeDepthIndicatorsPanel = lazy(() => import('@/components/chart/edgedepth/EdgeDepthIndicators'));
const EdgeDepthLayers = lazy(() => import('@/components/chart/edgedepth/EdgeDepthLayers'));
const EdgeDepthLiquidationPanel = lazy(() => import('@/components/chart/edgedepth/EdgeDepthLiquidationPanel'));
const EdgeDepthVolumeProfilePanel = lazy(() => import('@/components/chart/edgedepth/EdgeDepthVolumeProfilePanel'));
const EdgeDepthFootprintPanel = lazy(() => import('@/components/chart/edgedepth/EdgeDepthFootprintPanel'));
const EdgeDepthTPOPanel = lazy(() => import('@/components/chart/edgedepth/EdgeDepthTPOPanel'));
const BacktestingPage = lazy(() => import('@/pages/Backtesting'));
const BacktestingSetupDialog = lazy(() => import('@/components/backtesting/BacktestingSetupDialog'));
const EconomicCalendarPage = lazy(() => import('@/pages/EconomicCalendar'));
const DataVizPage = lazy(() => import('@/pages/DataViz'));
const QuantModelsPage = lazy(() => import('@/pages/QuantModels'));
const NotebooksPage = lazy(() => import('@/pages/Notebooks'));

const Fallback = () => <div className="h-full w-full flex items-center justify-center text-[11px] text-[var(--dim)]">Loading…</div>;

type Converter = {
  timeToX: (time: number) => number | null;
  xToTime: (x: number) => number | null;
  priceToY: (price: number) => number;
  yToPrice: (y: number) => number;
  priceAxisWidth: number;
};

export interface TradeMarker {
  time: number;
  price: number;
  side: 'buy' | 'sell';
  quantity?: number;
  pnl?: number;
}

export interface ChartProps {
  provider: string;
  symbol: string;
  timeframe: string;
  candles: Candle[];
  chartType?: ChartType;
  trades?: TradeMarker[];
  engineIndicators?: EngineIndicatorPayload;
  quote?: { bid: number; ask: number; synthetic?: boolean } | null;
  positions?: Array<{ id: string; price: number; side: 'buy' | 'sell';
    quantity: number; pnl?: number; stopLoss?: number; takeProfit?: number }>;
  onPositionModify?: (id: string, sl?: number, tp?: number) => void;
  onPositionClose?: (id: string) => void;
  autoSelectPositionId?: string | null;
}

interface TerminalChartProps extends ChartProps {
  indicatorPatch?: Record<string, any> | null;
}

const TF_MS: Record<string, number> = {
  'tick': 0,
  '1s': 1000, '5s': 5000, '10s': 10000, '15s': 15000, '30s': 30000,
  '1m': 60000, '3m': 180000, '5m': 300000, '15m': 900000, '30m': 1800000,
  '1h': 3600000, '2h': 7200000, '4h': 14400000, '6h': 21600000, '8h': 28800000, '12h': 43200000,
  '1d': 86400000, '1D': 86400000, '3d': 259200000, '3D': 259200000,
  '1w': 604800000, '1W': 604800000, '1M': 2592000000,
};

const ctxRow: React.CSSProperties = {
  display: 'block', width: '100%', padding: '3px 10px',
  background: 'transparent', border: 'none', cursor: 'pointer',
  font: 'inherit', color: 'inherit', lineHeight: 1.5, textAlign: 'left',
};
const onCtxRowIn = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.background = 'var(--hover)'; };
const onCtxRowOut = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.background = 'transparent'; };

function TerminalChart({ provider, symbol, timeframe, candles, chartType = 'candlestick', trades = [], engineIndicators, indicatorPatch = null, quote = null, positions = [], onPositionModify, onPositionClose, autoSelectPositionId = null }: TerminalChartProps) {
  // Professionalism fix: hide LSE shell duplicate timeframe bar (user screenshot X marks)
  // The shell's #timeframes nav (tick 1s 15s 30s 5m 15m 1h 2h 8h 12h 1d 3d 1w 1M Custom... Candles Indicators Panes Source)
  // must be hidden when EdgeDepth mode is active — we have single clean EdgeDepth bar only.
  useEffect(() => {
    const id = 'lse-hide-shell-tf-style';
    if (!document.getElementById(id)) {
      const st = document.createElement('style');
      st.id = id;
      st.textContent = `
        /* Hide LSE shell duplicate bars when EdgeDepth terminal active — professional single bar only */
        #timeframes { display: none !important; }
        #subrail { display: none !important; }
        #controls #chart-type, #controls #ind-open, #controls #panes-open, #controls #src-open,
        #controls #tpl-open, #controls #cs-open, #controls #sl-slot { display: none !important; }
        /* Also hide any Simple Moving Average pill that leaks from shell */
        #ind-active { display: none !important; }
      `;
      document.head.appendChild(st);
    }
    // Direct DOM hide as fallback (in case style not applied yet)
    try {
      const tf = document.getElementById('timeframes');
      if (tf) (tf as HTMLElement).style.display = 'none';
      const sr = document.getElementById('subrail');
      if (sr) (sr as HTMLElement).style.display = 'none';
    } catch {}
  }, []);
  const scrollKey = `${provider}|${symbol}|${timeframe}`;
  const [hist, setHist] = useState<{ key: string; older: Candle[]; shift: number }>(() => {
    try {
      const k = `${provider}|${symbol}|${timeframe}`;
      const cached = localStorage.getItem(`lse-candles-${k}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return { key: k, older: parsed.slice(-200), shift: 0 };
        }
      }
    } catch {}
    return { key: scrollKey, older: [], shift: 0 };
  });
  if (hist.key !== scrollKey) setHist({ key: scrollKey, older: [], shift: 0 });
  const olderExhaustedRef = useRef<string | null>(null);
  const olderLoadingRef = useRef(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const allCandles = useMemo(() => {
    if (!hist.older.length || !candles.length) {
      // Cache current candles for instant next load — MT5 speed
      try {
        if (candles.length > 0) {
          localStorage.setItem(`lse-candles-${scrollKey}`, JSON.stringify(candles.slice(-200)));
        }
      } catch {}
      return candles;
    }
    const head = candles[0].time;
    const merged = [...hist.older.filter((c) => c.time < head), ...candles];
    try {
      localStorage.setItem(`lse-candles-${scrollKey}`, JSON.stringify(merged.slice(-200)));
    } catch {}
    return merged;
  }, [hist.older, candles, scrollKey]);
  const handleLoadMore = useCallback(async () => {
    const MAX_HELD = 50000;
    if (olderLoadingRef.current) return;
    if (olderExhaustedRef.current === scrollKey) return;
    const held = allCandles;
    if (!held.length || held.length >= MAX_HELD) return;
    const keyNow = scrollKey;
    const oldest = held[0].time;
    olderLoadingRef.current = true;
    setIsLoadingMore(true);
    try {
      const q = `/api/candles?provider=${encodeURIComponent(provider)}` +
        `&symbol=${encodeURIComponent(symbol)}` +
        `&timeframe=${encodeURIComponent(timeframe)}&limit=5000` +
        `&end=${encodeURIComponent(new Date(oldest).toISOString())}`;
      const res = await fetch(q);
      if (!res.ok) {
        let detail = '';
        try { detail = String((await res.json()).detail || ''); } catch { /* keep */ }
        if (/no (history|prints|data)|served no|no real candles/i.test(detail)) {
          olderExhaustedRef.current = keyNow;
        }
        return;
      }
      const j = await res.json();
      const fresh: Candle[] = (j.candles || [])
        .map(([t, o, h, l, c, v]: number[]) => ({
          time: (t < 1e12 ? t * 1000 : t) as number, open: o, high: h,
          low: l, close: c, volume: v,
        }))
        .filter((c: Candle) => c.time < oldest);
      if (!fresh.length) {
        olderExhaustedRef.current = keyNow;
        return;
      }
      setHist((prev) => prev.key !== keyNow
        ? prev
        : { key: keyNow, older: [...fresh, ...prev.older],
            shift: prev.shift + fresh.length });
    } catch {
    } finally {
      olderLoadingRef.current = false;
      setIsLoadingMore(false);
    }
  }, [allCandles, provider, symbol, timeframe, scrollKey]);

  const [converter, setConverter] = useState<Converter | null>(null);
  const [activeTool, setActiveTool] = useState<DrawingTool>(null);
  const [edActiveTool, setEdActiveTool] = useState<EDTool>('cursor');
  const [edCollapsed, setEdCollapsed] = useState(false);
  const [edMagnet, setEdMagnet] = useState(false);
  const [selectedDrawingId, setSelectedDrawingId] = useState<string | null>(null);
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [indicators, setIndicators] = useState<IndicatorConfig>(DEFAULT_INDICATOR_CONFIG);
  const [drawingsLocked, setDrawingsLocked] = useState(false);
  const [drawingsHidden, setDrawingsHidden] = useState(false);
  const [edChartType, setEdChartType] = useState<ChartTypeED>('candles');
  const [edTf, setEdTf] = useState<EDTF>(() => {
    // init from real chart timeframe prop if possible, else 1m
    try {
      const tfProp = (typeof timeframe === 'string' ? timeframe : '1m') as string;
      const found = ED_ALL_TF.find(t => t.label.toLowerCase() === tfProp.toLowerCase() || t.label === tfProp);
      if (found) return found;
    } catch {}
    return ED_ALL_TF.find(t => t.label === '1m') || ED_ALL_TF[5] || ED_ALL_TF[0];
  });
  const [edFavs, setEdFavs] = useState<Set<string>>(() => {
    try { const s = localStorage.getItem('ed_fav_tf'); return new Set(s ? JSON.parse(s) : ['1m','5m','15m','1h','4h','1D']); } catch { return new Set(['1m','5m','15m','1h','4h','1D']); }
  });
  // Sync edTf from real chart timeframe (upper bar is source of truth, lower must follow)
  useEffect(() => {
    try {
      const tfProp = String(timeframe || '1m');
      const found = ED_ALL_TF.find(t => t.label.toLowerCase() === tfProp.toLowerCase() || t.label === tfProp);
      if (found && found.label.toLowerCase() !== edTf.label.toLowerCase()) {
        setEdTf(found);
      } else if (!found) {
        // custom timeframe: create synthetic TF for display
        const m = tfProp.match(/^(\d+)([smhdwM])$/i);
        if (m) {
          const n = parseInt(m[1],10);
          const unit = m[2];
          let ms = 0;
          const low = unit.toLowerCase();
          if (unit === 'M') ms = n*2592000000;
          else if (low==='s') ms=n*1000;
          else if (low==='m') ms=n*60000;
          else if (low==='h') ms=n*3600000;
          else if (low==='d') ms=n*86400000;
          else if (low==='w') ms=n*604800000;
          if (ms>0) setEdTf({ label: tfProp, ms, sec: Math.floor(ms/1000) });
        } else if (tfProp.toLowerCase()==='tick') {
          setEdTf({ label: 'tick', ms: 0, sec: 0 });
        }
      }
    } catch {}
  }, [timeframe]);
  const [edAppearance, setEdAppearance] = useState<AppearanceSettings>(() => {
    try {
      const raw = localStorage.getItem('ed_appearance');
      if (raw) return { ...defaultAppearance, ...JSON.parse(raw) };
    } catch {}
    return defaultAppearance;
  });
  const [edAppearanceOpen, setEdAppearanceOpen] = useState(false);
  useEffect(() => { try { localStorage.setItem('ed_appearance', JSON.stringify(edAppearance)); } catch {} }, [edAppearance]);
  const [edFindOpen, setEdFindOpen] = useState(false);
  const [rtMode, setRtMode] = useState(true);
  const [edLayersOpen, setEdLayersOpen] = useState(false);
  // Layers lifted state — wired to real chart indicators
  const [edLayers, setEdLayers] = useState(() => {
    try {
      const raw = localStorage.getItem('ed_layers');
      if (raw) return JSON.parse(raw);
    } catch {}
    return [
      { id: 'liquidations', label: 'Liquidations', enabled: true, desc: 'Liquidation heatmap 800 bands 0.05%' },
      { id: 'exposure_v2', label: 'Exposure V2', enabled: true, desc: 'Exposure field V2' },
      { id: 'hyperliquid_levels', label: 'Hyperliquid Levels', enabled: true, desc: 'HL levels' },
      { id: 'market_structure', label: 'Market Structure', enabled: true, desc: 'MS with BOS/CHoCH' },
      { id: 'vpvr', label: 'VPVR', enabled: false, desc: 'Volume Profile Visible Range POC/VAH/VAL' },
      { id: 'leverage_tiers', label: 'Leverage Tiers', enabled: false, desc: 'Leverage tiers 2x/5x/10x/25x/50x' },
      { id: 'session_vwap', label: 'Session VWAP', enabled: false, desc: 'HLC3 weighted by base volume' },
      { id: 'prev_day', label: 'Prev Day High/Low/Close', enabled: false, desc: 'Previous day levels' },
      { id: 'prev_week', label: 'Prev Week High/Low/Close', enabled: false, desc: 'Previous week levels' },
    ];
  });
  const handleLayersChange = useCallback((next: any[]) => {
    setEdLayers(next);
    try { localStorage.setItem('ed_layers', JSON.stringify(next)); } catch {}
    // Wire layers to real indicators — functional, not blank
    const get = (id: string) => next.find((l: any) => l.id === id)?.enabled;
    setIndicators(prev => {
      let changed = false;
      const upd: any = { ...prev };
      if (get('vpvr') !== undefined) {
        const want = !!get('vpvr');
        if ((prev as any).volumeProfile?.enabled !== want) {
          upd.volumeProfile = { ...(prev as any).volumeProfile, enabled: want, numberOfRows: 48, rowWidth: 15, opacity: 60 };
          changed = true;
        }
      }
      if (get('session_vwap') !== undefined) {
        const want = !!get('session_vwap');
        if ((prev as any).vwap?.enabled !== want) {
          upd.vwap = { ...(prev as any).vwap, enabled: want, color: '#2196F3' };
          changed = true;
        }
      }
      if (get('prev_day') !== undefined || get('prev_week') !== undefined) {
        const want = !!get('prev_day') || !!get('prev_week');
        if ((prev as any).pivotPoints?.enabled !== want) {
          upd.pivotPoints = { ...(prev as any).pivotPoints, enabled: want };
          changed = true;
        }
      }
      return changed ? upd : prev;
    });
    // Liquidations layer toggles depth/liquidation panel visibility via layoutStore if needed
    if (get('liquidations') === false) {
      // if user turns off liquidations, we don't force panel change, just keep state
    }
  }, []);
  const openIndicatorBrowser = useCallback(() => {
    window.dispatchEvent(new CustomEvent('lset:open-indicators'));
  }, []);

  // EdgeDepth tool mapping: EDTool -> DrawingTool — exact functional wiring
  // Each ED tool must map to a distinct, working overlay tool; no duplicates
  const mapEdToDrawing = useCallback((t: EDTool): DrawingTool => {
    const map: Record<EDTool, DrawingTool> = {
      cursor: null,
      trendline: 'trend',              // finite segment
      arrow: 'straightArrow',          // arrow head at end
      ray: 'trendRay',                 // extends forward to edge
      extended: 'line',                // extended line — use line (TradingView extended = both sides, our trendRay forward only, line is closest)
      hline: 'horizontal',
      hray: 'horizontalRay',
      vline: 'vertical',
      cross: 'cross',                  // cross shape + lines
      rectangle: 'rectangle',
      channel: 'parallelChannel',      // parallel channel
      polyline: 'freeTriangle',        // 3-click free triangle for polyline
      brush: 'brush',
      fib: 'fibonacci',
      long: 'long',
      short: 'short',
      text: 'text',
      measure: 'measure',
      pricerange: 'measure',           // price range uses measure tool with price readout
      daterange: 'measure',            // date range uses measure tool
    };
    return map[t] ?? null;
  }, []);

  const handleEdToolSelect = useCallback((t: EDTool) => {
    setEdActiveTool(t);
    const dt = mapEdToDrawing(t);
    setActiveTool(dt);
  }, [mapEdToDrawing]);

  const toggleEdFav = useCallback((label: string) => {
    setEdFavs(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else {
        if (next.size >= 6) {
          const first = next.values().next().value;
          if (first) next.delete(first);
        }
        next.add(label);
      }
      try { localStorage.setItem('ed_fav_tf', JSON.stringify([...next])); } catch {}
      return next;
    });
  }, []);

  // Sync edChartType to ProChart chartType
  const proChartType = useMemo((): ChartType => {
    const map: Record<ChartTypeED, ChartType> = {
      candles: 'candlestick',
      fp_cluster: 'footprint_cluster',
      fp_profile: 'footprint_profile',
      heikin_ashi: 'heikin_ashi',
      line: 'line',
      tpo: 'tpo',
      renko: 'renko',
      flow_positioning: 'flow_positioning',
    };
    return map[edChartType] || 'candlestick';
  }, [edChartType]);

  const [ctxMenu, setCtxMenu] = useState<{
    x: number; y: number; price: number | null; ref: number | null;
    trade: { available: boolean; symbol?: string; qty?: number | null;
             pendingTypes?: string[] } | null;
  } | null>(null);
  const [tplOpen, setTplOpen] = useState(false);
  const [tplSaving, setTplSaving] = useState(false);
  const [tplName, setTplName] = useState('');
  const [tplPendingDelete, setTplPendingDelete] = useState<string | null>(null);
  const [tplErr, setTplErr] = useState('');
  const [, setTplTick] = useState(0);
  const [ordForm, setOrdForm] = useState<{ side: string; otype: string } | null>(null);
  const [ordPrice, setOrdPrice] = useState('');
  const [ordQty, setOrdQty] = useState('');
  const [ordErr, setOrdErr] = useState('');
  const [flipped, setFlipped] = useState(false);
  const chartAreaRef = useRef<HTMLDivElement | null>(null);
  const saveTemplate = async () => {
    const name = tplName.trim();
    if (!name) { setTplErr('name the template first'); return; }
    const ok = await (window as any).__lseShell?.saveLayout?.(name);
    if (ok) { setTplSaving(false); setTplErr(''); setTplTick((t) => t + 1); }
    else setTplErr('could not save this template');
  };
  useEffect(() => {
    if (!ctxMenu) return;
    const close = () => {
      setCtxMenu(null); setTplOpen(false);
      setTplSaving(false); setTplPendingDelete(null); setTplErr('');
      setOrdForm(null); setOrdErr('');
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('click', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', close);
      document.removeEventListener('keydown', onKey);
    };
  }, [ctxMenu]);

  const layoutState = useLayoutState();
  const layout = layoutState.layout;
  const syncSettings = layoutState.sync;

  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const [appearanceView, setAppearanceView] = useState<'appearance' | 'chart'>('appearance');
  const appearanceOpenRef = useRef(appearanceOpen);
  appearanceOpenRef.current = appearanceOpen;
  const appearanceViewRef = useRef(appearanceView);
  appearanceViewRef.current = appearanceView;
  useEffect(() => {
    openAppearanceFn = (view?: 'appearance' | 'chart') => {
      if (!appearanceOpenRef.current) {
        setAppearanceView(view || 'appearance');
        setAppearanceOpen(true);
        return;
      }
      if (view && view !== appearanceViewRef.current) {
        setAppearanceView(view);
        return;
      }
      setAppearanceOpen(false);
    };
    return () => { openAppearanceFn = null; };
  }, []);
  useEffect(() => {
    if (!appearanceOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setAppearanceOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [appearanceOpen]);
  const appearanceRef = useRef<HTMLDivElement | null>(null);
  const [appearancePos, setAppearancePos] = useState<{ x: number; y: number } | null>(null);
  useEffect(() => { if (!appearanceOpen) setAppearancePos(null); }, [appearanceOpen]);
  const onAppearanceDrag = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    const panel = appearanceRef.current;
    const host = panel?.offsetParent as HTMLElement | null;
    if (!host || !panel) return;
    const hr = host.getBoundingClientRect();
    const pr = panel.getBoundingClientRect();
    const grabX = e.clientX - pr.left, grabY = e.clientY - pr.top;
    e.preventDefault();
    const move = (ev: PointerEvent) => {
      setAppearancePos({
        x: Math.max(0, Math.min(ev.clientX - hr.left - grabX, hr.width - pr.width)),
        y: Math.max(0, Math.min(ev.clientY - hr.top - grabY, hr.height - 36)),
      });
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }, []);

  const [toolSettings, setToolSettings] = useState({
    color: '#e6e8ea',
    strokeWidth: 2,
    lineStyle: 'solid' as 'solid' | 'dashed' | 'dotted',
    opacity: 100,
  });

  useEffect(() => {
    let alive = true;
    (async () => {
      const saved = await api.getTools();
      if (alive && saved?.drawingDefaults) {
        setToolSettings((prev) => ({ ...prev, ...saved.drawingDefaults }));
      }
    })();
    return () => { alive = false; };
  }, []);

  const requestRedrawRef = useRef<(() => void) | null>(null);
  const scrollOffsetRef = useRef<number>(0);
  const scrollSyncRef = useRef<() => void>(() => {});
  const drawingCursorRef = useRef<Array<{ price: number | null; time: number | null; x: number | null }>>([]);

  useEffect(() => {
    setEngineContext({ provider, symbol });
  }, [provider, symbol]);

  const instrumentKey = `${provider}:${symbol}`;
  const loadedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    let alive = true;
    loadedKeyRef.current = null;
    (async () => {
      const [saved, savedIndicators] = await Promise.all([
        api.getDrawings(instrumentKey),
        api.getIndicators(instrumentKey),
      ]);
      if (!alive) return;
      setDrawings(saved as Drawing[]);
      setIndicators(savedIndicators ?? DEFAULT_INDICATOR_CONFIG);
      setSelectedDrawingId(null);
      loadedKeyRef.current = instrumentKey;
    })();
    return () => { alive = false; };
  }, [instrumentKey]);

  const handleDrawingsChange = useCallback((next: Drawing[]) => {
    setDrawings(next);
    if (loadedKeyRef.current === instrumentKey) {
      void api.setDrawings(instrumentKey, next);
    }
  }, [instrumentKey]);

  const handleIndicatorsChange = useCallback((next: IndicatorConfig) => {
    setIndicators(next);
    if (loadedKeyRef.current === instrumentKey) {
      void api.setIndicators(instrumentKey, next);
    }
  }, [instrumentKey]);

  useEffect(() => {
    if (!indicatorPatch) return;
    setIndicators((prev) => ({ ...prev, ...indicatorPatch } as IndicatorConfig));
  }, [indicatorPatch]);

  const clearAllDrawings = useCallback(() => {
    handleDrawingsChange([]);
    setSelectedDrawingId(null);
  }, [handleDrawingsChange]);

  const deleteDrawing = useCallback((id: string) => {
    handleDrawingsChange(drawings.filter((d) => d.id !== id));
    setSelectedDrawingId(null);
  }, [drawings, handleDrawingsChange]);

  const withEngineIndicators = useMemo(() => {
    const custom = toCustomIndicators(engineIndicators, allCandles);
    if (!custom.length) return indicators;
    return { ...indicators, customIndicators: custom } as IndicatorConfig;
  }, [indicators, engineIndicators, allCandles]);

  const chartSettings = useChartSettings();
  const hasSavedAppearance = useHasSavedAppearance();
  const colors = useMemo(() => {
    const base = getDefaultColors();
    const c = chartSettings?.candles;
    const ch = chartSettings?.chart;
    let out: any;
    if (!hasSavedAppearance || !c || !ch) {
      out = { ...base };
    } else {
      out = {
        ...base,
        background: ch.backgroundColor,
        backgroundOpacity: ch.backgroundOpacity,
        grid: ch.gridColor,
        gridOpacity: ch.gridOpacity,
        axisLabel: ch.axisLabelColor,
        axisLine: ch.axisLineColor,
        crosshair: ch.crosshairColor,
        priceTickerBullish: ch.priceTickerBullish,
        priceTickerBearish: ch.priceTickerBearish,
        bullish: c.bodyBullish,
        bearish: c.bodyBearish,
        bullishBorder: c.bordersBullish,
        bearishBorder: c.bordersBearish,
        bullishWick: c.wickBullish,
        bearishWick: c.wickBearish,
      };
    }
    // EdgeDepth appearance overrides — market colors teal_rose #21b3a4/#f0426c vs green_red
    if (edAppearance.marketColors === 'teal_rose') {
      out.bullish = '#21b3a4';
      out.bearish = '#f0426c';
      out.bullishBorder = '#21b3a4';
      out.bearishBorder = '#f0426c';
      out.bullishWick = '#21b3a4';
      out.bearishWick = '#f0426c';
      out.priceTickerBullish = '#21b3a4';
      out.priceTickerBearish = '#f0426c';
    } else if (edAppearance.marketColors === 'green_red') {
      out.bullish = '#26a69a';
      out.bearish = '#ef5350';
      out.bullishBorder = '#26a69a';
      out.bearishBorder = '#ef5350';
      out.bullishWick = '#26a69a';
      out.bearishWick = '#ef5350';
      out.priceTickerBullish = '#26a69a';
      out.priceTickerBearish = '#ef5350';
    }
    // Interface accent tints grid slightly
    if (edAppearance.accent === 'mint') {
      out.grid = '#21b3a4';
    } else if (edAppearance.accent === 'indigo') {
      out.grid = '#6366f1';
    } else if (edAppearance.accent === 'amber') {
      out.grid = '#f59e0b';
    }
    // Opacity from appearance
    if (edAppearance.opacity !== undefined) {
      out.backgroundOpacity = Math.round(edAppearance.opacity * 100);
    }
    return out;
  }, [chartSettings, hasSavedAppearance, edAppearance]);
  const chartTimezone = chartSettings?.data?.timezone || 'local';
  const timeframeMs = TF_MS[timeframe] ?? 3600000;
  const livePrice = candles.length ? candles[candles.length - 1].close : null;

  const [countdown, setCountdown] = useState('');
  useEffect(() => {
    const tick = () => {
      if (timeframe === 'tick') { setCountdown(''); return; }
      if (!symbol || !isMarketOpenForPair(symbol)) { setCountdown(''); return; }
      const now = Date.now();
      const nextClose = Math.ceil(now / timeframeMs) * timeframeMs;
      const diff = Math.max(0, nextClose - now);
      const s = Math.floor(diff / 1000);
      const m = Math.floor(s / 60) % 60;
      const h = Math.floor(s / 3600);
      const two = (n: number) => String(n).padStart(2, '0');
      setCountdown(h > 0 ? `${h}:${two(m)}:${two(s % 60)}` : `${m}:${two(s % 60)}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [symbol, timeframeMs, timeframe]);

  const indicatorCount = useMemo(
    () => Object.values(indicators || {}).filter((v: any) => v && v.enabled).length,
    [indicators]
  );

  const positionLines = useMemo(
    () => [
      ...trades.map((t, i) => ({
        id: `trade-${i}`,
        price: t.price,
        side: t.side,
        quantity: t.quantity ?? 0,
        symbol,
        pnl: t.pnl,
      })),
      ...positions.map((p) => ({ ...p, symbol })),
    ],
    [trades, positions, symbol]
  );

  if (!symbol) {
    return <div className="h-full w-full" />;
  }

  return (
    <div className="relative h-full w-full flex flex-col bg-[#1c1c1c]" style={{ overflow: 'visible' }}>
      {/* Professional top bar — own design, not EdgeDepth clone — clean, functional */}
      <div className="flex items-center gap-3 px-3 h-[44px] border-b border-[#2a2a2a] bg-[#1c1c1c] text-[12px] shrink-0 overflow-visible relative z-[60]">
        {/* Left: Symbol + Provider */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-wider text-[#e8e8e8] text-[11px]">LSE</span>
            <span className="font-mono font-semibold text-[#e8e8e8] text-[13px]">{symbol}</span>
            <span className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#21b3a4] animate-pulse" />
              {provider.toUpperCase()} • {timeframe}
            </span>
          </div>
          <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]">
            {(['binance','coinbase','hyperliquid'] as const).map(p => {
              const isActive = provider === p;
              const label = p === 'hyperliquid' ? 'HL' : p === 'binance' ? 'BIN' : 'CB';
              const speed = p === 'hyperliquid' ? '15ms' : p === 'binance' ? '20ms' : '50ms';
              return (
                <button
                  key={p}
                  onClick={() => { try { (window as any).__lseShell?.setProvider?.(p); } catch {} }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-colors ${
                    isActive ? 'bg-[#e8e8e8] text-[#1c1c1c] shadow-sm' : 'bg-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]'
                  }`}
                  title={`${p} ${speed} ultra-fast — auto load immediate`}
                >
                  {label} <span className={`text-[9px] ${isActive ? 'text-[#1c1c1c]/60' : 'text-[#6a6a6a]'}`}>{speed}{p==='hyperliquid'?' ⚡':''}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center: Timeframe + Chart Type + View */}
        <div className="flex items-center gap-2 shrink-0" style={{ overflow: 'visible' }}>
          <div style={{ overflow: 'visible', position: 'relative', zIndex: 50 }}>
            <EdgeDepthTimeframeBar value={edTf} onChange={(tf) => {
              setEdTf(tf);
              try { (window as any).__lseShell?.setTimeframe?.(tf.label); } catch {}
            }} favs={edFavs} onToggleFav={toggleEdFav} />
          </div>
          <EdgeDepthChartTypePicker value={edChartType} onChange={setEdChartType} />
          {/* Professional View selector — own UI, not native select */}
          <div className="relative">
            <select
              value={layoutState.panelKinds[0] || 'chart'}
              onChange={e => layoutStore.setPanelKind(0, e.target.value as any)}
              className="appearance-none pl-3 pr-7 py-1.5 rounded-md border border-[#3a3a3a] bg-[#262626] text-[12px] font-medium text-[#e8e8e8] hover:bg-[#343434] hover:border-[#4a4a4a] focus:outline-none focus:border-[#4a4a4a] cursor-pointer"
            >
              <option value="chart">Chart</option>
              <option value="edgedepth">Heatmap Pro</option>
              <option value="depth">Depth Heat</option>
              <option value="dom">DOM Ladder</option>
              <option value="tape">Tape</option>
              <option value="footprint">Footprint</option>
              <option value="vpvr">VPVR</option>
              <option value="tpo">TPO</option>
              <option value="liquidations">Liquidations</option>
              <option value="watchlist">Watchlist</option>
              <option value="indicators">Indicators</option>
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[#6a6a6a]">▼</span>
          </div>
        </div>

        {/* Right: Tools */}
        <div className="ml-auto flex items-center gap-1.5 shrink-0">
          <EdgeDepthWidgetMenu onSelect={(id) => layoutStore.setPanelKind(0, id as any)} />
          <button onClick={() => setEdLayersOpen(v => !v)} className={`px-3 py-1.5 rounded-md border text-[12px] font-medium transition-colors ${edLayersOpen ? 'bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]' : 'bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]'}`}>Layers</button>
          <button onClick={() => setEdFindOpen(true)} className="px-3 py-1.5 rounded-md border border-[#3a3a3a] bg-[#262626] text-[12px] font-medium text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]">Find</button>
          <div className="w-px h-5 bg-[#2a2a2a] mx-1" />
          <button onClick={() => setRtMode(v => !v)} className={`px-2.5 py-1 rounded-full border text-[10px] font-medium flex items-center gap-1.5 transition-colors ${rtMode ? 'bg-[#21b3a4]/10 border-[#21b3a4]/30 text-[#21b3a4]' : 'bg-[#262626] border-[#3a3a3a] text-[#6a6a6a] hover:text-[#b9b9b9]'}`} title="Real-time follow">
            <span className={`w-1.5 h-1.5 rounded-full ${rtMode ? 'bg-[#21b3a4] animate-pulse' : 'bg-[#6a6a6a]'}`} /> {rtMode ? 'LIVE' : 'PAUSED'}
          </button>
          <button onClick={() => setEdAppearanceOpen(v => !v)} className={`w-8 h-8 rounded-md border flex items-center justify-center transition-colors ${edAppearanceOpen ? 'bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]' : 'bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]'}`}>⚙</button>
          <button onClick={openIndicatorBrowser} className="px-3 py-1.5 rounded-md bg-[#e8e8e8] text-[#1c1c1c] text-[12px] font-semibold hover:bg-white transition-colors">Indicators</button>
        </div>
      </div>
      <div className="relative flex-1 min-h-0 w-full flex">
        <EdgeDepthDrawingRail
          activeTool={edActiveTool}
          onToolSelect={handleEdToolSelect}
          magnet={edMagnet}
          onToggleMagnet={() => setEdMagnet(v => !v)}
          hiddenAll={drawingsHidden}
          onToggleHidden={() => setDrawingsHidden(v => !v)}
          onClearAll={clearAllDrawings}
          collapsed={edCollapsed}
          onToggleCollapsed={() => setEdCollapsed(v => !v)}
        />
      <div
        ref={chartAreaRef}
        className="relative flex-1 min-w-0"
        style={flipped ? { transform: 'scaleY(-1)' } : undefined}
        onContextMenu={(e) => {
          e.preventDefault();
          setTplOpen(false);
          setOrdForm(null); setOrdErr('');
          let price: number | null = null;
          if (layout === '1x1' && converter && chartAreaRef.current) {
            const r = chartAreaRef.current.getBoundingClientRect();
            const y = flipped ? r.height - (e.clientY - r.top) : e.clientY - r.top;
            const p = converter.yToPrice(y);
            if (Number.isFinite(p) && p > 0) price = p;
          }
          const trade = (window as any).__lseShell?.tradeInfo?.() || null;
          setCtxMenu({
            x: Math.min(e.clientX, window.innerWidth - 240),
            y: Math.min(e.clientY, window.innerHeight - (trade?.available ? 360 : 230)),
            price, ref: livePrice, trade,
          });
        }}
      >
        {layout !== '1x1' ? (
          <TerminalMultiGrid
            layout={layout}
            syncSettings={syncSettings}
            pair={symbol}
            timeframe={timeframe}
            colors={colors}
            quote={quote}
            sourceProvider={provider}
          />
        ) : (layoutState.panelKinds[0] === 'depth' ? (
          <Suspense fallback={<Fallback />}>
            <DepthHeatPane
              symbol={symbol}
              sourceProvider={provider}
              colors={colors}
              onToggleKind={() => layoutStore.setPanelKind(0, 'chart')}
            />
          </Suspense>
        ) : (layoutState.panelKinds[0] === 'edgedepth' ? (
          <Suspense fallback={<Fallback />}>
            <EdgeDepthHeatmapPane
              symbol={symbol}
              provider={provider}
              embedded
              onToggleKind={() => layoutStore.setPanelKind(0, 'chart')}
              liqColormap={edAppearance.liqColormap as any}
              obColormap={edAppearance.obColormap as any}
              opacity={edAppearance.opacity}
              intensity={edAppearance.intensity}
              gamma={edAppearance.gamma}
              noiseFloor={edAppearance.noiseFloor}
              tickPerRow={edAppearance.tickPerRow}
              halfLife={edAppearance.halfLife}
            />
          </Suspense>
        ) : (['orderflow','dom','tape','footprint','vpvr','tpo','cvd','liquidations','ed_liquidations','ed_vpvr','ed_footprint','ed_tpo','watchlist','indicators'].includes(layoutState.panelKinds[0] as string) ? (
          <Suspense fallback={<Fallback />}>
            {(() => {
              const kind = layoutState.panelKinds[0] as string;
              if (kind === 'dom') return <EdgeDepthDOMPanel symbol={symbol} provider={provider} />;
              if (kind === 'tape') return <EdgeDepthTapePanel symbol={symbol} provider={provider} />;
              if (kind === 'footprint') return <EdgeDepthFootprintPanel symbol={symbol} provider={provider} />;
              if (kind === 'vpvr') return <EdgeDepthVolumeProfilePanel symbol={symbol} provider={provider} />;
              if (kind === 'tpo') return <EdgeDepthTPOPanel symbol={symbol} provider={provider} />;
              if (kind === 'liquidations') return <EdgeDepthLiquidationPanel symbol={symbol} provider={provider} colormap={edAppearance.liqColormap as any} intensity={edAppearance.intensity} opacity={edAppearance.opacity} gamma={edAppearance.gamma} noiseFloor={edAppearance.noiseFloor} tickPerRow={edAppearance.tickPerRow} halfLife={edAppearance.halfLife} lowPeak={edAppearance.lowPeak} />;
              if (kind === 'watchlist') return <EdgeDepthWatchlist activeSymbol={symbol} onSelectSymbol={(s) => { try { (window as any).__lseShell?.selectSymbol?.(s); } catch {} }} />;
              if (kind === 'indicators') return <EdgeDepthIndicatorsPanel symbol={symbol} provider={provider} />;
              return <EdgeDepthDOMPanel symbol={symbol} provider={provider} />;
            })()}
          </Suspense>
        ) : (<>
        {false ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0b0e11] text-[#d1d4dc] text-[13px] font-mono p-4 text-center">
            <div className="font-bold">Loading {symbol} {timeframe} — {provider.toUpperCase()}</div>
          </div>
        ) : (
          <>
            <ProChart
              key={scrollKey}
              candles={allCandles}
              symbol={symbol}
              timeframe={timeframe}
              chartType={proChartType}
              onLoadMore={handleLoadMore}
              isLoadingMore={isLoadingMore}
              prependShift={hist.shift}
              livePrice={livePrice}
              countdown={countdown}
              timezone={chartTimezone}
              rightOffset={6}
              colors={colors}
              indicators={withEngineIndicators}
              onIndicatorsChange={handleIndicatorsChange}
              onRemoveEngineIndicator={(label) => (window as any).__lseShell?.removeIndicator?.(label)}
              onEditEngineIndicator={(label) => {
                if (!(window as any).__lseShell?.editIndicator?.(label)) openIndicatorBrowser();
              }}
              drawings={drawings}
              selectedDrawingId={selectedDrawingId}
              drawingCursorRef={drawingCursorRef}
              requestRedrawRef={requestRedrawRef}
              scrollOffsetRef={scrollOffsetRef}
              onScrollSync={() => scrollSyncRef.current?.()}
              onConverterReady={setConverter}
              onOpenSettings={openIndicatorBrowser}
              positionLines={positionLines}
              onPositionModify={onPositionModify}
              onPositionClose={onPositionClose}
              autoSelectPositionId={autoSelectPositionId}
              showBidAskSpread={!!quote}
              brokerBid={quote?.bid ?? null}
              brokerAsk={quote?.ask ?? null}
            />
            <ChartDrawingOverlay
              activeTool={activeTool}
              onToolSelect={setActiveTool}
              drawings={drawings}
              onDrawingsChange={handleDrawingsChange}
              selectedDrawingId={selectedDrawingId}
              onSelectDrawing={setSelectedDrawingId}
              converter={converter}
              scrollSyncRef={scrollSyncRef}
              scrollOffsetRef={scrollOffsetRef}
              drawingCursorRef={drawingCursorRef}
              requestRedrawRef={requestRedrawRef}
              toolSettings={toolSettings}
              isLocked={drawingsLocked}
              isHidden={drawingsHidden}
              currentSymbol={symbol}
              timeframeMs={timeframeMs}
              currentPrice={livePrice ?? undefined}
              candles={candles}
            />

          </>
        )}
        </>))))}
      </div>

      {appearanceOpen && (
        <div
          ref={appearanceRef}
          className="absolute z-[95] w-80"
          style={{
            ...(appearancePos
              ? { left: appearancePos.x, top: appearancePos.y }
              : { top: 8, right: 8 }),
            background: 'var(--panel)',
            border: '1px solid var(--edge)',
            borderRadius: 3,
            boxShadow: '0 10px 32px var(--shadow)',
          }}>
          <div
            onPointerDown={onAppearanceDrag}
            className="flex items-center justify-between px-3 py-1.5 select-none"
            style={{ borderBottom: '1px solid var(--edge)', cursor: 'move' }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', color: 'var(--dim)' }}>
              CHART LAYOUT
            </span>
            <button
              onClick={() => setAppearanceOpen(false)}
              aria-label="Close settings"
              className="text-muted-foreground hover:text-foreground"
              style={{ fontSize: 14, lineHeight: 1, padding: '0 2px' }}>
              ×
            </button>
          </div>
          <div className="flex items-center" style={{ borderBottom: '1px solid var(--edge)' }}>
            <button
              onClick={() => setAppearanceView('appearance')}
              className="flex-1 px-3 py-1.5 text-xs font-medium transition-colors"
              style={appearanceView === 'appearance'
                ? { color: 'var(--text)', background: 'var(--active)' }
                : { color: 'var(--dim)' }}>
              Appearance
            </button>
            <button
              onClick={() => setAppearanceView('chart')}
              className="flex-1 px-3 py-1.5 text-xs font-medium transition-colors"
              style={appearanceView === 'chart'
                ? { color: 'var(--text)', background: 'var(--active)' }
                : { color: 'var(--dim)' }}>
              Chart
            </button>
          </div>
          <div className="max-h-[70vh] overflow-y-auto">
            {appearanceView === 'appearance'
              ? <AppearancePanel hideHeader onBack={() => setAppearanceOpen(false)} />
              : <ChartSettingsPanel hideHeader onBack={() => setAppearanceOpen(false)} />}
          </div>
          <div
            className="flex justify-end px-3 py-2"
            style={{ borderTop: '1px solid var(--edge)' }}>
            <button
              onClick={() => setAppearanceOpen(false)}
              className="text-xs font-medium"
              style={{
                padding: '3px 16px', color: 'var(--text)',
                background: 'var(--active)', border: '1px solid var(--edge)',
                borderRadius: 2,
              }}>
              Done
            </button>
          </div>
        </div>
      )}

      {edAppearanceOpen && (
        <div className="absolute top-10 right-2 z-[90]">
          <EdgeDepthAppearancePanel settings={edAppearance} onChange={setEdAppearance} onClose={() => setEdAppearanceOpen(false)} />
        </div>
      )}
      {edLayersOpen && (
        <div className="absolute top-10 left-[320px] z-[90]">
          <Suspense fallback={<div className="p-2 text-[10px] text-[#b9b9b9]">Loading layers...</div>}>
            <EdgeDepthLayers layers={edLayers} onChange={handleLayersChange} />
          </Suspense>
        </div>
      )}
      <EdgeDepthFindSymbol open={edFindOpen} onClose={() => setEdFindOpen(false)} onSelect={(s) => { try { (window as any).__lseShell?.selectSymbol?.(s); } catch {} }} />
      {ctxMenu && (
        <div
          className="fixed z-[110]"
          style={{
            left: ctxMenu.x, top: ctxMenu.y, minWidth: 190,
            padding: '2px 0 6px',
            background: 'var(--panel)', border: '1px solid var(--edge)',
            borderRadius: 2, boxShadow: '0 6px 20px var(--shadow)',
            fontSize: 12, color: 'var(--text)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {ctxMenu.trade?.available && (() => {
            const t = ctxMenu.trade!;
            const fp = (p: number) =>
              (window as any).__lseShell?.fmtPrice?.(p) ?? String(p);
            const cap = (s: string) => s === 'limit' ? 'Limit' : 'Stop';
            if (ordForm) {
              const inp: React.CSSProperties = {
                flex: 1, minWidth: 0, padding: '3px 6px', fontSize: 12,
                color: 'var(--text)', background: 'var(--bg2)',
                border: '1px solid var(--edge)', borderRadius: 2,
              };
              const lab: React.CSSProperties = {
                width: 38, fontSize: 11, color: 'var(--dim)', flexShrink: 0,
              };
              const place = () => {
                const pv = parseFloat(ordPrice), qv = parseFloat(ordQty);
                if (!(pv > 0)) { setOrdErr('enter a price'); return; }
                if (!(qv > 0)) { setOrdErr('enter a size'); return; }
                (window as any).__lseShell?.quickOrder?.(ordForm.side, ordForm.otype, pv, qv);
                setCtxMenu(null); setOrdForm(null);
              };
              const key = (e: React.KeyboardEvent) => {
                e.stopPropagation();
                if (e.key === 'Enter') place();
                if (e.key === 'Escape') { setOrdForm(null); setOrdErr(''); }
              };
              return (<>
                <div style={{ ...ctxRow, cursor: 'default', fontWeight: 600 }}>
                  {ordForm.side === 'buy' ? 'Buy' : 'Sell'} {cap(ordForm.otype)} · {t.symbol}
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', margin: '2px 10px 4px' }}
                     onClick={(e) => e.stopPropagation()}>
                  <span style={lab}>Price</span>
                  <input autoFocus value={ordPrice} spellCheck={false} inputMode="decimal"
                         style={inp} onChange={(e) => setOrdPrice(e.target.value)} onKeyDown={key} />
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', margin: '0 10px 4px' }}
                     onClick={(e) => e.stopPropagation()}>
                  <span style={lab}>Units</span>
                  <input value={ordQty} spellCheck={false} inputMode="decimal"
                         style={inp} onChange={(e) => setOrdQty(e.target.value)} onKeyDown={key} />
                </div>
                <div style={{ display: 'flex', gap: 4, margin: '0 10px 2px', justifyContent: 'flex-end' }}
                     onClick={(e) => e.stopPropagation()}>
                  <button
                    style={{ padding: '3px 10px', fontSize: 12, borderRadius: 2, cursor: 'pointer',
                             border: '1px solid var(--edge)', background: 'transparent', color: 'var(--dim)' }}
                    onClick={() => { setOrdForm(null); setOrdErr(''); }}
                  >Back</button>
                  <button
                    style={{ padding: '3px 12px', fontSize: 12, borderRadius: 2, cursor: 'pointer',
                             border: '1px solid var(--edge)', background: 'var(--active)', color: 'var(--text)' }}
                    onClick={place}
                  >Place</button>
                </div>
                {ordErr && <div style={{ ...ctxRow, color: '#e05d5d', cursor: 'default' }}>{ordErr}</div>}
                <div style={{ margin: '3px 0', borderTop: '1px solid var(--edge)' }} />
              </>);
            }
            const qty = t.qty != null ? `${t.qty} ` : '';
            const rows: Array<{ label: string; side: string; otype: string }> = [
              { label: `Buy ${qty}${t.symbol} at market`, side: 'buy', otype: 'market' },
              { label: `Sell ${qty}${t.symbol} at market`, side: 'sell', otype: 'market' },
            ];
            const p = ctxMenu.price, ref = ctxMenu.ref;
            const types = t.pendingTypes || [];
            if (p != null && ref != null && p !== ref && types.length) {
              const pend = p < ref
                ? [{ side: 'buy', otype: 'limit' }, { side: 'sell', otype: 'stop' }]
                : [{ side: 'sell', otype: 'limit' }, { side: 'buy', otype: 'stop' }];
              for (const r of pend) {
                if (!types.includes(r.otype)) continue;
                rows.push({ ...r, label:
                  `${r.side === 'buy' ? 'Buy' : 'Sell'} ${cap(r.otype)} @ ${fp(p)}…` });
              }
            }
            return (<>
              {rows.map((r) => (
                <button
                  key={`${r.side}-${r.otype}`}
                  className="w-full text-left" style={ctxRow}
                  onMouseEnter={onCtxRowIn} onMouseLeave={onCtxRowOut}
                  onClick={(e) => {
                    if (r.otype === 'market') {
                      (window as any).__lseShell?.quickOrder?.(r.side, r.otype, ctxMenu.price);
                      setCtxMenu(null);
                      return;
                    }
                    e.stopPropagation();
                    setOrdForm({ side: r.side, otype: r.otype });
                    setOrdPrice(p != null
                      ? String(+p.toFixed(p >= 1000 ? 2 : p >= 100 ? 3 : p >= 1 ? 4 : 6))
                      : '');
                    setOrdQty(t.qty != null ? String(t.qty) : '');
                    setOrdErr('');
                  }}
                >{r.label}</button>
              ))}
              <div style={{ margin: '3px 0', borderTop: '1px solid var(--edge)' }} />
            </>);
          })()}
          <button
            className="w-full text-left"
            style={{ ...ctxRow, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}
            onMouseEnter={onCtxRowIn} onMouseLeave={onCtxRowOut}
            onClick={() => setTplOpen((v) => !v)}
          >
            <span>Chart template</span>
            <span style={{ color: 'var(--dim)' }}>{tplOpen ? '▾' : '▸'}</span>
          </button>
          {tplOpen && (
            <div className="max-h-48 overflow-y-auto" style={{ borderTop: '1px solid var(--edge)', borderBottom: '1px solid var(--edge)', margin: '3px 0' }}>
              {(((window as any).__lseShell?.layouts?.() || []) as Array<{ id: string; name: string }>).length === 0 ? (
                <div style={{ ...ctxRow, color: 'var(--dim)' }}>No saved templates yet</div>
              ) : (((window as any).__lseShell.layouts()) as Array<{ id: string; name: string }>).map((l) => (
                <div
                  key={l.id}
                  style={{ ...ctxRow, display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 20, cursor: 'pointer' }}
                  onMouseEnter={onCtxRowIn} onMouseLeave={onCtxRowOut}
                  onClick={() => { (window as any).__lseShell?.applyLayout?.(l.id); setCtxMenu(null); }}
                >
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.name}</span>
                  <button
                    title={tplPendingDelete === l.id ? 'Click again to delete' : 'Delete template'}
                    style={{
                      border: 'none', background: 'none', cursor: 'pointer',
                      fontSize: tplPendingDelete === l.id ? 11 : 13, lineHeight: 1, padding: '0 2px',
                      color: tplPendingDelete === l.id ? '#e05d5d' : 'var(--dim)',
                    }}
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (tplPendingDelete !== l.id) { setTplPendingDelete(l.id); return; }
                      await (window as any).__lseShell?.deleteLayout?.(l.id);
                      setTplPendingDelete(null);
                      setTplTick((t) => t + 1);
                    }}
                  >{tplPendingDelete === l.id ? 'sure?' : '×'}</button>
                </div>
              ))}
              {tplSaving ? (
                <div
                  style={{ display: 'flex', gap: 4, margin: '3px 12px 5px', alignItems: 'center' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    autoFocus
                    value={tplName}
                    placeholder="Template name"
                    spellCheck={false}
                    style={{
                      flex: 1, minWidth: 0, padding: '3px 6px', fontSize: 12, color: 'var(--text)',
                      background: 'var(--bg2)', border: '1px solid var(--edge)', borderRadius: 2,
                    }}
                    onChange={(e) => setTplName(e.target.value)}
                    onKeyDown={async (e) => {
                      e.stopPropagation();
                      if (e.key === 'Escape') { setTplSaving(false); return; }
                      if (e.key !== 'Enter') return;
                      await saveTemplate();
                    }}
                  />
                  <button
                    disabled={!tplName.trim()}
                    title={tplName.trim() ? 'Save this chart as a template' : 'Name the template first'}
                    style={{
                      padding: '3px 10px', fontSize: 12, lineHeight: 1.5, borderRadius: 2,
                      border: '1px solid var(--edge)', background: 'var(--active)',
                      color: 'var(--text)', cursor: tplName.trim() ? 'pointer' : 'default',
                      opacity: tplName.trim() ? 1 : 0.5,
                    }}
                    onClick={saveTemplate}
                  >Save</button>
                </div>
              ) : (
                <button
                  className="w-full text-left"
                  style={{ ...ctxRow, paddingLeft: 20, color: 'var(--dim)' }}
                  onMouseEnter={onCtxRowIn} onMouseLeave={onCtxRowOut}
                  onClick={(e) => {
                    e.stopPropagation();
                    setTplName((window as any).__lseShell?.layoutDefaultName?.() || '');
                    setTplErr('');
                    setTplSaving(true);
                  }}
                >+ Save current as template…</button>
              )}
              {tplErr && (
                <div style={{ ...ctxRow, paddingLeft: 20, color: '#e05d5d' }}>{tplErr}</div>
              )}
            </div>
          )}
          <button
            className="w-full text-left" style={ctxRow}
            onMouseEnter={onCtxRowIn} onMouseLeave={onCtxRowOut}
            onClick={() => {
              chartAreaRef.current?.querySelector<HTMLButtonElement>('button[title="Reset view"]')?.click();
              setCtxMenu(null);
            }}
          >Reset chart view</button>
          <button
            className="w-full text-left" style={ctxRow}
            onMouseEnter={onCtxRowIn} onMouseLeave={onCtxRowOut}
            onClick={() => { setFlipped((f) => !f); setCtxMenu(null); }}
          >{flipped ? 'Unflip chart' : 'Flip chart'}</button>
          {drawings.length > 0 && (
            <button
              className="w-full text-left" style={ctxRow}
              onMouseEnter={onCtxRowIn} onMouseLeave={onCtxRowOut}
              onClick={() => { clearAllDrawings(); setCtxMenu(null); }}
            >Remove drawings ({drawings.length})</button>
          )}
          <div style={{ margin: '3px 0', borderTop: '1px solid var(--edge)' }} />
          <button
            className="w-full text-left" style={ctxRow}
            onMouseEnter={onCtxRowIn} onMouseLeave={onCtxRowOut}
            onClick={() => { setAppearanceView('appearance'); setAppearanceOpen(true); setCtxMenu(null); }}
          >Settings...</button>
        </div>
      )}
      </div>
    </div>
  );
}

function PaneChart({ symbol, timeframe, candles, quote }: {
  symbol: string; timeframe: string; candles: Candle[];
  quote?: { bid: number; ask: number } | null;
}) {
  const chartSettings = useChartSettings();
  const colors = useMemo(() => getDefaultColors(), []);
  if (!symbol || !candles.length) {
    return <div className="h-full w-full" />;
  }
  return (
    <ProChart
      candles={candles}
      symbol={symbol}
      timeframe={timeframe}
      chartType="candlestick"
      livePrice={candles[candles.length - 1]?.close ?? null}
      rightOffset={6}
      colors={colors}
      indicators={DEFAULT_INDICATOR_CONFIG}
      timezone={chartSettings?.data?.timezone || 'local'}
      showBidAskSpread={!!quote}
      brokerBid={quote?.bid ?? null}
      brokerAsk={quote?.ask ?? null}
    />
  );
}

const PANES = new Map<HTMLElement, { root: Root; props: any }>();

function renderPane(el: HTMLElement) {
  const inst = PANES.get(el);
  if (!inst) return;
  inst.root.render(
    <MemoryRouter>
      <ChartSettingsProvider>
        <PaneChart {...inst.props} />
      </ChartSettingsProvider>
    </MemoryRouter>
  );
}

const LSEChartPanes = {
  mount(el: HTMLElement, initial: any = {}) {
    if (!PANES.has(el)) PANES.set(el, { root: createRoot(el), props: {} });
    const inst = PANES.get(el)!;
    inst.props = { ...inst.props, ...normalise(initial) };
    renderPane(el);
  },
  update(el: HTMLElement, next: any) {
    const inst = PANES.get(el);
    if (!inst) return;
    inst.props = { ...inst.props, ...normalise(next) };
    renderPane(el);
  },
  unmount(el: HTMLElement) {
    const inst = PANES.get(el);
    if (!inst) return;
    inst.root.unmount();
    PANES.delete(el);
  },
};

function LayoutButton() {
  const s = useLayoutState();
  return (
    <MultiTimeframeLayoutSelector
      selectedLayout={s.layout}
      onLayoutChange={(l) => layoutStore.setLayout(l)}
      syncSettings={s.sync}
      onSyncSettingsChange={(x) => layoutStore.setSync(x)}
      isMultiPanelActive={s.layout !== '1x1'}
      onExitMultiPanel={() => layoutStore.setLayout('1x1')}
    />
  );
}

let root: Root | null = null;
let openAppearanceFn: ((view?: 'appearance' | 'chart') => void) | null = null;
let indicatorPatch: Record<string, any> | null = null;
let props: ChartProps = {
  provider: 'demo', symbol: '', timeframe: '1h', candles: [],
  chartType: 'candlestick', trades: [], engineIndicators: undefined,
};

function render() {
  if (!root) return;
  root.render(
    <MemoryRouter>
      <ChartSettingsProvider>
        <TerminalChart {...props} indicatorPatch={indicatorPatch} />
      </ChartSettingsProvider>
    </MemoryRouter>
  );
}

const CHART_TYPE_ALIASES: Record<string, ChartType> = {
  candles: 'candlestick',
  bars: 'candlestick',
  candlestick: 'candlestick',
  line: 'line',
  area: 'area',
  renko: 'renko',
  heikin_ashi: 'heikin_ashi',
  heikin: 'heikin_ashi',
  tpo: 'tpo',
  footprint_cluster: 'footprint_cluster',
  fp_cluster: 'footprint_cluster',
  footprint_profile: 'footprint_profile',
  fp_profile: 'footprint_profile',
  flow_positioning: 'flow_positioning',
  flow: 'flow_positioning',
};

const MS_THRESHOLD = 1e12;

function normalise(next: Partial<ChartProps>): Partial<ChartProps> {
  const out: Partial<ChartProps> = { ...next };
  if (next.chartType) out.chartType = CHART_TYPE_ALIASES[next.chartType] ?? 'candlestick';
  if ('symbol' in next && !next.symbol) out.symbol = '';
  if (next.candles?.length && next.candles[0].time < MS_THRESHOLD) {
    out.candles = next.candles.map((c) => ({ ...c, time: c.time * 1000 }));
  }
  if (next.trades?.length && next.trades[0].time < MS_THRESHOLD) {
    out.trades = next.trades.map((t) => ({ ...t, time: t.time * 1000 }));
  }
  return out;
}

const LSEChart = {
  async mount(el: HTMLElement, initial: Partial<ChartProps> = {}) {
    props = { ...props, ...normalise(initial) };
    if (!root) root = createRoot(el);
    await initWorkspaceBridge();
    render();
  },
  update(next: Partial<ChartProps>) {
    props = { ...props, ...normalise(next) };
    render();
  },
  unmount() {
    root?.unmount();
    root = null;
  },
  openAppearance(view?: 'appearance' | 'chart') {
    openAppearanceFn?.(view);
  },
  invalidateWorkspaceSection(section: string) {
    invalidateSection(section as any);
  },
  setIndicators(patch: Record<string, any>) {
    indicatorPatch = { ...(indicatorPatch || {}), ...patch };
    render();
  },
  indicatorKeys(): string[] {
    return Object.keys(DEFAULT_INDICATOR_CONFIG);
  },
  indicatorDefaults(): Record<string, any> {
    return JSON.parse(JSON.stringify(DEFAULT_INDICATOR_CONFIG));
  },
};

// -- manual backtesting (bar replay) --
// Now code-split: BacktestingPage + dialog are lazy chunks.
import { Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster as SonnerToaster } from 'sonner';

const btQueryClient = new QueryClient();
const btNav = { inReplay: false };

function ManualBacktestSetup({ onExit }: { onExit: () => void }) {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  useEffect(() => { setOpen(true); }, [location.key]);
  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setTimeout(() => {
        if (!btNav.inReplay) onExit();
      }, 150);
    }
  };
  return (
    <div className="h-full w-full bg-[#0b0d12]">
      <Suspense fallback={<Fallback />}>
        <BacktestingSetupDialog open={open} onOpenChange={handleOpenChange} />
      </Suspense>
    </div>
  );
}

function ManualBacktestRoute({ provider }: { provider: string }) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const sym = searchParams.get('sym');
  const pair = location.pathname.split('/').pop() || '';
  const replayProvider = searchParams.get('provider') || provider;
  setEngineContext({ provider: replayProvider, symbol: sym || pair });
  useEffect(() => {
    btNav.inReplay = true;
    return () => { btNav.inReplay = false; };
  }, []);
  return (
    <Suspense fallback={<Fallback />}>
      <BacktestingPage />
    </Suspense>
  );
}

let btRoot: Root | null = null;

const LSEManualBacktest = {
  async mount(el: HTMLElement, opts: { provider?: string; onExit?: () => void } = {}) {
    const provider = opts.provider || 'demo';
    const onExit = opts.onExit || (() => {});
    if (!btRoot) btRoot = createRoot(el);
    setEngineContext({ provider, symbol: '' });
    await initWorkspaceBridge();
    btRoot.render(
      <QueryClientProvider client={btQueryClient}>
        <MemoryRouter initialEntries={['/']}>
          <ChartSettingsProvider>
            <Routes>
              <Route path="/backtest/:pair" element={<ManualBacktestRoute provider={provider} />} />
              <Route path="*" element={<ManualBacktestSetup onExit={onExit} />} />
            </Routes>
            <SonnerToaster theme="dark" position="bottom-right" />
          </ChartSettingsProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );
  },
  unmount() {
    btRoot?.unmount();
    btRoot = null;
  },
};

let ecRoot: Root | null = null;
const LSEEconCalendar = {
  mount(el: HTMLElement, opts: { onBack?: () => void; view?: string } = {}) {
    if (!ecRoot) ecRoot = createRoot(el);
    ecRoot.render(
      <Suspense fallback={<Fallback />}>
        <EconomicCalendarPage onBack={opts.onBack} initialView={opts.view as any} />
      </Suspense>
    );
  },
  unmount() {
    ecRoot?.unmount();
    ecRoot = null;
  },
};

let dvRoot: Root | null = null;
const LSEDataViz = {
  mount(el: HTMLElement) {
    if (!dvRoot) dvRoot = createRoot(el);
    dvRoot.render(
      <Suspense fallback={<Fallback />}>
        <DataVizPage />
      </Suspense>
    );
  },
  unmount() {
    dvRoot?.unmount();
    dvRoot = null;
  },
};

let qmRoot: Root | null = null;
const LSEQuantModels = {
  mount(el: HTMLElement) {
    if (!qmRoot) qmRoot = createRoot(el);
    qmRoot.render(
      <Suspense fallback={<Fallback />}>
        <QuantModelsPage />
      </Suspense>
    );
  },
  unmount() {
    qmRoot?.unmount();
    qmRoot = null;
  },
};

let nbRoot: Root | null = null;
const LSENotebooks = {
  mount(el: HTMLElement) {
    if (!nbRoot) nbRoot = createRoot(el);
    nbRoot.render(
      <Suspense fallback={<Fallback />}>
        <NotebooksPage />
      </Suspense>
    );
  },
  unmount() {
    nbRoot?.unmount();
    nbRoot = null;
  },
};

declare global {
  interface Window {
    LSEChart: typeof LSEChart;
    LSEChartPanes: typeof LSEChartPanes;
    LSEManualBacktest: typeof LSEManualBacktest;
    LSEEconCalendar: typeof LSEEconCalendar;
    LSEDataViz: typeof LSEDataViz;
    LSEQuantModels: typeof LSEQuantModels;
    LSENotebooks: typeof LSENotebooks;
  }
}
(LSEChart as any).mountLayoutButton = (el: HTMLElement) => {
  createRoot(el).render(<LayoutButton />);
};
(LSEChart as any).layoutStore = layoutStore;
window.LSEChart = LSEChart;
window.LSEChartPanes = LSEChartPanes;
window.LSEManualBacktest = LSEManualBacktest;
window.LSEEconCalendar = LSEEconCalendar;
window.LSEDataViz = LSEDataViz;
window.LSEQuantModels = LSEQuantModels;
window.LSENotebooks = LSENotebooks;

export default LSEChart;
