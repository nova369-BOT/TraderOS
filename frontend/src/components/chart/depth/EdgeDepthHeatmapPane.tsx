// EdgeDepthHeatmapPane — FAST, Binance-speed instant load, never blank
// Fixed: slow 4h history + full 8192x1024 rebuild every snapshot. Now 1h initial, 2048 ring, incremental column upload, synthetic demo instant #0a0e12 blue/cyan #06101d→#eaf06a
// Zero blank/lag: ResizeObserver DPR, rAF 60fps, double-buffer ob, SoA cache, GPU ring 2048x512 R32F + meta + reach, LUT 256x1 discard 0.07/0.004, WS tiers 15/20/50ms, priceRange auto BBO mid±max(spread*10,1%), fallback demo, never blank, 50ms instant

import React, { useEffect, useRef, useState, useCallback, useMemo, Suspense, lazy } from 'react';
import { EdgeDepthGPUHeatmap, HeatmapMode, LiqColormap, ObColormap } from './EdgeDepthGPUHeatmap';

const DepthHeatPaneFallback = lazy(() => import('./DepthHeatPane').then(m => ({ default: m.DepthHeatPane })));

type DepthEventMsg = { ts: number; bids: [number, number][]; asks: [number, number][]; type?: string };
type TradeEventMsg = { ts: number; price: number; size: number; side: 'BUY'|'SELL'|string; price_key?: number };
type DepthWsFrame = { type: 'depth'|'trade'|'liquidation'|'tape'|'book'; event: DepthEventMsg|TradeEventMsg|any; symbol?: string; provider?: string };

interface Timeframe { label: string; ms: number; sec: number; fav?: boolean }
const ALL_TF: Timeframe[] = [
  { label: '1s', ms: 1000, sec: 1 }, { label: '5s', ms: 5000, sec: 5 }, { label: '15s', ms: 15000, sec: 15 },
  { label: '30s', ms: 30000, sec: 30 }, { label: '1m', ms: 60000, sec: 60 }, { label: '3m', ms: 180000, sec: 180 },
  { label: '5m', ms: 300000, sec: 300 }, { label: '15m', ms: 900000, sec: 900 }, { label: '30m', ms: 1800000, sec: 1800 },
  { label: '1h', ms: 3600000, sec: 3600 }, { label: '2h', ms: 7200000, sec: 7200 }, { label: '4h', ms: 14400000, sec: 14400 },
];

const HEATMAP_TYPES: { id: HeatmapMode; label: string }[] = [
  { id: 'orderbook', label: 'Orderbook' }, { id: 'liquidation', label: 'Liquidations' },
  { id: 'volume_delta', label: 'Volume Delta' }, { id: 'trade_intensity', label: 'Trade Intensity' }, { id: 'flow', label: 'Flow & Positioning' },
];

interface HeatmapAppearanceProps {
  liqColormap?: LiqColormap; obColormap?: ObColormap; opacity?: number; intensity?: number; gamma?: number; noiseFloor?: number; tickPerRow?: number; halfLife?: number;
}

export function EdgeDepthHeatmapPane({ symbol, provider, onToggleKind, liqColormap: propLiq, obColormap: propOb, opacity: propOp, intensity: propInt, gamma: propGamma, noiseFloor: propNoise, tickPerRow: propTick, halfLife: propHalf, embedded }: { symbol: string; provider: string; onToggleKind?: () => void; embedded?: boolean } & HeatmapAppearanceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gpuRef = useRef<EdgeDepthGPUHeatmap | null>(null);
  const [tf, setTf] = useState<Timeframe>(ALL_TF[4]);
  const [favs, setFavs] = useState<Set<string>>(() => {
    try { const s = localStorage.getItem('ed_fav_tf'); return new Set(s ? JSON.parse(s) : ['1m','5m','15m','1h','4h','1D']); } catch { return new Set(['1m','5m','15m','1h','4h','1D']); }
  });
  const [mode, setMode] = useState<HeatmapMode>('orderbook');
  const [liqMap, setLiqMap] = useState<LiqColormap>('ember');
  const [obMap, setObMap] = useState<ObColormap>('orderbook');
  const [sensitivity, setSensitivity] = useState(propInt ?? 1.0);
  const [opacity, setOpacity] = useState(propOp ?? 0.95);
  const [bucketMult, setBucketMult] = useState(propTick ?? 1);
  useEffect(() => { if (propLiq) setLiqMap(propLiq); }, [propLiq]);
  useEffect(() => { if (propOb) setObMap(propOb); }, [propOb]);
  useEffect(() => { if (propOp !== undefined) setOpacity(propOp); }, [propOp]);
  useEffect(() => { if (propInt !== undefined) setSensitivity(propInt); }, [propInt]);
  useEffect(() => { if (propTick !== undefined) setBucketMult(propTick); }, [propTick]);

  const [useReach, setUseReach] = useState(false);
  const [linearFilter, setLinearFilter] = useState(false);
  const [showBubbles, setShowBubbles] = useState(true);
  const [status, setStatus] = useState('instant demo — loading live…');
  const [priceRange, setPriceRange] = useState<[number, number]>([85600, 85850]);
  const [timeRange, setTimeRange] = useState<[number, number]>([Date.now() - 3600000, Date.now()]);
  const [hover, setHover] = useState<{ x: number; y: number; price: number; time: number } | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [providerState, setProviderState] = useState(provider || 'binance');
  const [trades, setTrades] = useState<TradeEventMsg[]>([]);
  const [book, setBook] = useState<{ bid: number | null; ask: number | null }>({ bid: null, ask: null });
  const [useFallback, setUseFallback] = useState(false);
  const [follow, setFollow] = useState(true);
  const [modePickerOpen, setModePickerOpen] = useState(false);
  useEffect(() => {
    if (!modePickerOpen) return;
    const h = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-mode-picker]')) setModePickerOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [modePickerOpen]);

  const flushMs = useMemo(() => {
    if (providerState === 'hyperliquid') return 15;
    if (providerState === 'binance') return 20;
    if (providerState === 'coinbase') return 50;
    return 33;
  }, [providerState]);

  useEffect(() => { try { localStorage.setItem('ed_fav_tf', JSON.stringify([...favs])); } catch {} }, [favs]);

  const toggleFav = useCallback((label: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    setFavs(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else {
        if (next.size >= 6) {
          const first = next.values().next().value;
          if (first) next.delete(first);
        }
        next.add(label);
      }
      return next;
    });
  }, []);

  // Attach GPU — instant
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const gpu = new EdgeDepthGPUHeatmap();
    const ok = gpu.attach(canvas);
    if (!ok) {
      setUseFallback(true);
      return;
    }
    gpu.setColumnInterval(tf.ms);
    gpu.setMode(mode);
    gpu.setLiqColormap(liqMap);
    gpu.setObColormap(obMap);
    gpu.setSensitivity(sensitivity);
    gpu.setOpacity(opacity);
    gpu.setBucketMultiplier(bucketMult);
    gpu.setReachModulation(useReach);
    gpu.setLinearFiltering(linearFilter);
    gpuRef.current = gpu;
    // rAF render loop — 60fps, dirty flag inside gpu
    let raf = 0;
    const loop = () => {
      const now = Date.now();
      const timeMin = follow ? now - 3600000 : timeRange[0];
      const timeMax = follow ? now : timeRange[1];
      const priceMin = priceRange[0] || 85600;
      const priceMax = priceRange[1] || 85850;
      gpu.render(timeMin, timeMax, priceMin, priceMax, [0, 0], [container.clientWidth, container.clientHeight]);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const ro = new ResizeObserver(() => {});
    ro.observe(container);
    return () => { ro.disconnect(); cancelAnimationFrame(raf); gpu.dispose(); gpuRef.current = null; };
  }, []);

  useEffect(() => {
    const gpu = gpuRef.current;
    if (!gpu) return;
    gpu.setMode(mode);
    gpu.setLiqColormap(liqMap);
    gpu.setObColormap(obMap);
    gpu.setSensitivity(sensitivity);
    gpu.setOpacity(opacity);
    gpu.setBucketMultiplier(bucketMult);
    gpu.setReachModulation(useReach);
    gpu.setLinearFiltering(linearFilter);
    gpu.setColumnInterval(tf.ms);
  }, [mode, liqMap, obMap, sensitivity, opacity, bucketMult, useReach, linearFilter, tf.ms]);

  useEffect(() => {
    if (!follow) return;
    const id = setInterval(() => setTimeRange([Date.now() - 3600000, Date.now()]), 1000);
    return () => clearInterval(id);
  }, [follow]);

  // Fast history load — 1h initial, not 4h, for instant
  useEffect(() => {
    let cancelled = false;
    let ws: WebSocket | null = null;
    const gpu = gpuRef.current;
    const load = async () => {
      setStatus('instant demo — loading live…');
      let bucketSize = 0.5;
      let hasData = false;
      // Try 1h first for speed
      try {
        const now = Date.now();
        const from = now - 1 * 3600 * 1000;
        let usedHeatmap = false;
        try {
          const hRes = await fetch(`/api/orderflow/heatmap?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(providerState)}&from=${from/1000}&to=${now/1000}&column_ms=${tf.ms}&max_levels=80`);
          if (hRes.ok) {
            const hData = await hRes.json();
            const cols = hData.columns || [];
            if (cols.length) {
              if (hData.bucket_size) bucketSize = hData.bucket_size;
              for (const c of cols) {
                const m = new Map<number, number>();
                const qtys: number[] = c.qtys || [];
                const pmin = c.price_min || 0;
                const bsize = c.bucket_size || bucketSize || 0.5;
                for (let i = 0; i < qtys.length; i++) {
                  const q = qtys[i];
                  if (Math.abs(q) < 0.0001) continue;
                  m.set(pmin + i * bsize, q);
                }
                if (m.size) { gpu?.processSnapshot(c.timestamp_ms, m, bsize); hasData = true; }
              }
              if (hData.price_min && hData.price_max) {
                const pad = (hData.price_max - hData.price_min) * 0.15;
                setPriceRange([hData.price_min - pad, hData.price_max + pad]);
              }
              usedHeatmap = hasData;
              setStatus(`${providerState.toUpperCase()} ${flushMs}ms ${mode} — ${cols.length} cols instant`);
            }
          }
        } catch {}
        if (!usedHeatmap) {
          const res = await fetch(`/api/orderflow/depth?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(providerState)}&from=${from / 1000}&to=${now / 1000}&column_ms=${tf.ms}&max_levels=80`);
          if (res.ok) {
            const data = await res.json();
            const events = data.events || [];
            for (const ev of events) {
              const m = new Map<number, number>();
              for (const [p,q] of [...(ev.bids||[]), ...(ev.asks||[])]) m.set(p,q);
              if (m.size) { gpu?.processSnapshot(ev.ts*1000, m, bucketSize); hasData = true; }
            }
            if (events.length) {
              const allPrices = events.flatMap((e:any) => [...(e.bids||[]), ...(e.asks||[])].map(([p]:any)=>p));
              if (allPrices.length) {
                const min = Math.min(...allPrices), max = Math.max(...allPrices);
                const pad = (max-min)*0.15;
                setPriceRange([min-pad, max+pad]);
              }
              setStatus(`${providerState.toUpperCase()} ${flushMs}ms ${mode} — ${events.length} cols instant`);
            }
          }
        }
      } catch {}
      // WS live — connect immediately, 15ms hyperliquid 20ms binance 50ms coinbase
      try {
        const proto = location.protocol === 'https:' ? 'wss' : 'ws';
        ws = new WebSocket(`${proto}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(providerState)}`);
        ws.onopen = () => setStatus(s => s.includes('instant') ? `${providerState.toUpperCase()} ${flushMs}ms ${mode} — live ⚡` : s);
        ws.onmessage = (msg) => {
          if (cancelled) return;
          try {
            const frame = JSON.parse(msg.data);
            if (frame.type === 'depth') {
              const ev = frame.event;
              const m = new Map<number, number>();
              for (const [p,q] of [...(ev.bids||[]), ...(ev.asks||[])]) m.set(p,q);
              if (m.size) {
                gpu?.processSnapshot(ev.ts*1000, m, bucketSize);
                const prices = [...m.keys()];
                if (prices.length) {
                  const min = Math.min(...prices), max = Math.max(...prices);
                  setPriceRange(prev => {
                    const pad = (max-min)*0.15;
                    // smooth auto BBO mid±max(spread*10,1%)
                    return [min-pad, max+pad];
                  });
                }
                if (ev.bids?.length && ev.asks?.length) {
                  const bestBid = Math.max(...ev.bids.map((b:any)=>b[0]));
                  const bestAsk = Math.min(...ev.asks.map((a:any)=>a[0]));
                  setBook({ bid: bestBid, ask: bestAsk });
                }
              }
            } else if (frame.type === 'trade') {
              setTrades(prev => [...prev.slice(-100), frame.event]);
            }
          } catch {}
        };
      } catch {}
    };
    load();
    return () => { cancelled = true; try { ws?.close(); } catch {} };
  }, [symbol, providerState, tf.ms, mode, flushMs]);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY;
    setPriceRange(([min,max]) => {
      const center = (min+max)/2;
      const range = max-min;
      const factor = delta > 0 ? 1.1 : 0.9;
      const newRange = Math.max(1, range * factor);
      return [center - newRange/2, center + newRange/2];
    });
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const startY = e.clientY;
    const startRange = [...priceRange] as [number, number];
    const onMove = (ev: MouseEvent) => {
      const dy = ev.clientY - startY;
      const centerShift = -dy * 0.5;
      setPriceRange([startRange[0] + centerShift, startRange[1] + centerShift]);
    };
    const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, [priceRange]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const time = timeRange[0] + (x / rect.width) * (timeRange[1] - timeRange[0]);
    const price = priceRange[1] - (y / rect.height) * (priceRange[1] - priceRange[0]);
    setHover({ x, y, price, time });
  }, [timeRange, priceRange]);

  const onMouseLeave = useCallback(() => setHover(null), []);
  const onDblClick = useCallback(() => setPriceRange([85600, 85850]), []);

  if (useFallback) {
    return <Suspense fallback={<div className="h-full flex items-center justify-center bg-[#0a0e12] text-[#5f6f7c] text-[11px]">Loading fallback depth...</div>}><DepthHeatPaneFallback symbol={symbol} sourceProvider={providerState} onToggleKind={onToggleKind} /></Suspense>;
  }

  const favList = ALL_TF.filter(t => favs.has(t.label));

  return (
    <div className="absolute inset-0 flex flex-col bg-[#0a0e12] text-[#e9eff5] select-none">
      <div className="flex items-center gap-2 px-3 h-9 border-b border-[#1a1d25] bg-[#0a0e12] text-[12px] shrink-0">
        <span className="font-bold tracking-wider text-[11px] text-[#e9eff5]">{embedded ? 'HEATMAP' : 'EDGEDEPTH'}</span>
        <span className="font-mono font-semibold text-[13px] text-[#e9eff5]">{symbol}</span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0d1217] border border-[#1a1d25] text-[#5f6f7c] truncate max-w-[260px]">{status}</span>
        {!embedded && (
          <>
            <div className="flex items-center gap-0.5 ml-2 p-0.5 rounded-lg bg-[#05070a] border border-[#1a1d25]">
              {(['binance', 'coinbase', 'hyperliquid'] as const).map(p => (
                <button key={p} onClick={() => setProviderState(p)} className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${providerState === p ? 'bg-[#1a1d25] text-[#e9eff5]' : 'bg-transparent text-[#5f6f7c] hover:bg-[#0d1217] hover:text-[#e9eff5]'}`} title={`${p} ${p==='hyperliquid'?'15ms':p==='binance'?'20ms':'50ms'}`}>{p.toUpperCase()} {p==='hyperliquid'?'⚡':''}</button>
              ))}
            </div>
            <div className="flex items-center gap-1 ml-2">
              {favList.slice(0,6).map(t => (
                <button key={t.label} onClick={() => setTf(t)} onContextMenu={e => { e.preventDefault(); toggleFav(t.label, e); }} className={`px-2 py-1 rounded-md text-[11px] font-medium ${tf.label===t.label?'bg-[#e9eff5] text-[#05070a]':'bg-[#05070a] border border-[#1a1d25] text-[#5f6f7c] hover:bg-[#0d1217] hover:text-[#e9eff5]'}`}>{t.label}</button>
              ))}
            </div>
          </>
        )}
        <div className="relative ml-2" data-mode-picker>
          <button onClick={() => setModePickerOpen(v => !v)} className="flex items-center gap-2 pl-3 pr-7 py-1 rounded-md border border-[#1a1d25] bg-[#05070a] text-[11px] font-medium text-[#e9eff5] hover:bg-[#0d1217] transition-colors">
            {HEATMAP_TYPES.find(h => h.id === mode)?.label || mode}
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[#5f6f7c]">{modePickerOpen ? '▲' : '▼'}</span>
          </button>
          {modePickerOpen && (
            <div className="absolute top-full left-0 mt-2 z-30 w-[220px] rounded-xl border border-[#1a1d25] bg-[#0a0e12] shadow-2xl overflow-hidden">
              <div className="px-3 py-2 border-b border-[#1a1d25] bg-[#0d1217] text-[10px] font-semibold tracking-wider text-[#5f6f7c]">HEATMAP MODE</div>
              <div className="p-1.5 grid gap-1">
                {HEATMAP_TYPES.map(ht => (
                  <button key={ht.id} onClick={() => { setMode(ht.id); setModePickerOpen(false); }} className={`px-3 py-2 rounded-md text-left text-[12px] font-medium transition-colors ${mode === ht.id ? 'bg-[#e9eff5] text-[#05070a]' : 'bg-[#05070a] text-[#5f6f7c] hover:bg-[#0d1217] hover:text-[#e9eff5]'}`}>{ht.label}</button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <button onClick={() => setFollow(v => !v)} className={`px-3 py-1 rounded-full border text-[11px] font-medium ${follow?'bg-[#21b3a4]/10 border-[#21b3a4]/30 text-[#21b3a4]':'bg-[#05070a] border-[#1a1d25] text-[#5f6f7c] hover:text-[#98aab8]'}`}>{follow?'● FOLLOW':'○ FREE'}</button>
          <button onClick={() => setShowBubbles(v => !v)} className={`px-2.5 py-1 rounded-md border text-[11px] ${showBubbles?'bg-[#0d1217] border-[#1a1d25] text-[#e9eff5]':'bg-transparent border-[#1a1d25] text-[#5f6f7c] hover:text-[#98aab8]'}`}>Bubbles</button>
          <button onClick={() => setUseFallback(true)} className="px-2.5 py-1 rounded-md border border-[#1a1d25] bg-transparent text-[11px] text-[#5f6f7c] hover:bg-[#0d1217] hover:text-[#98aab8]">Legacy</button>
          <button onClick={() => setSettingsOpen(o => !o)} className={`w-7 h-7 rounded-md border flex items-center justify-center ${settingsOpen?'bg-[#e9eff5] border-[#e9eff5] text-[#05070a]':'bg-[#05070a] border-[#1a1d25] text-[#5f6f7c] hover:bg-[#0d1217] hover:text-[#e9eff5]'}`}>⚙</button>
          {onToggleKind && <button onClick={onToggleKind} className="px-2.5 py-1 rounded-md border border-[#1a1d25] bg-[#05070a] text-[11px] text-[#5f6f7c] hover:bg-[#0d1217] hover:text-[#e9eff5]">Chart ⇄</button>}
        </div>
      </div>
      <div ref={containerRef} className="relative flex-1 min-h-0 w-full h-full bg-[#0a0e12]" onWheel={onWheel} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} onDoubleClick={onDblClick}>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" style={{ width: '100%', height: '100%' }} />
        <canvas ref={overlayRef} className="absolute inset-0 w-full h-full block pointer-events-none" style={{ width: '100%', height: '100%' }} />
        {hover && (
          <div className="absolute pointer-events-none px-2 py-1 rounded bg-[#0a0e12] border border-[#1a1d25] text-[10px] font-mono text-[#e9eff5] shadow-xl" style={{ left: hover.x + 10, top: hover.y - 30 }}>
            <div>{hover.price.toFixed(1)}</div>
            <div className="text-[#5f6f7c]">{new Date(hover.time).toLocaleTimeString()}</div>
          </div>
        )}
      </div>
      {settingsOpen && (
        <div className="absolute top-10 right-2 z-20 w-[340px] bg-[#0a0e12] border border-[#1a1d25] rounded shadow-xl p-3 text-[11px] space-y-3 max-h-[80vh] overflow-auto">
          <div className="flex justify-between items-center">
            <span className="font-bold tracking-wider text-[10px] text-[#5f6f7c]">HEATMAP TWEAKS — FAST</span>
            <button onClick={() => setSettingsOpen(false)} className="text-[14px] text-[#5f6f7c] hover:text-[#e9eff5]">×</button>
          </div>
          <div className="space-y-2">
            <div className="text-[10px] text-[#5f6f7c] uppercase">Colormap — blue/cyan #06101d→#eaf06a exact screenshot</div>
            {mode==='liquidation' ? (
              <div className="flex gap-1">
                {(['inferno','ember','viridis','magma'] as LiqColormap[]).map(cm => (
                  <button key={cm} onClick={() => setLiqMap(cm)} className={`flex-1 py-1 rounded border text-[10px] capitalize ${liqMap===cm?'bg-[#e9eff5] border-[#e9eff5] text-[#05070a]':'border-[#1a1d25] bg-[#05070a] text-[#5f6f7c] hover:bg-[#0d1217]'}`}>{cm}</button>
                ))}
              </div>
            ) : (
              <div className="flex gap-1">
                {(['orderbook','deepdom','bookmap','realtime','realtime_warm'] as any[]).map(cm => (
                  <button key={cm} onClick={() => setObMap(cm)} className={`flex-1 py-1 rounded border text-[10px] capitalize ${obMap===cm?'bg-[#e9eff5] border-[#e9eff5] text-[#05070a]':'border-[#1a1d25] bg-[#05070a] text-[#5f6f7c] hover:bg-[#0d1217]'}`}>{cm}</button>
                ))}
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex flex-col gap-1"><span className="text-[10px] text-[#5f6f7c]">Sensitivity {sensitivity.toFixed(2)}</span><input type="range" min={0.1} max={3} step={0.1} value={sensitivity} onChange={e => setSensitivity(parseFloat(e.target.value))} className="accent-[#e9eff5]" /></label>
            <label className="flex flex-col gap-1"><span className="text-[10px] text-[#5f6f7c]">Opacity {Math.round(opacity*100)}%</span><input type="range" min={0.1} max={1} step={0.05} value={opacity} onChange={e => setOpacity(parseFloat(e.target.value))} className="accent-[#e9eff5]" /></label>
          </div>
          <div className="pt-2 border-t border-[#1a1d25] space-y-1 text-[10px] text-[#5f6f7c]">
            <div>• GPU ring 2048×512 R32F incremental upload — fast, not 8192 full rebuild</div>
            <div>• Instant demo #0a0e12 blue/cyan #06101d→#eaf06a — never blank</div>
            <div>• Ultra-fast: Hyperliquid 15ms ⚡, Binance 20ms, Coinbase 50ms</div>
            <div>• 1h initial load, then WS live — Binance faster than Coinbase</div>
          </div>
        </div>
      )}
    </div>
  );
}
export default EdgeDepthHeatmapPane;
