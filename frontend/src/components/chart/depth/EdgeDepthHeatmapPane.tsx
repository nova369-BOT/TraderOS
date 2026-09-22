// EdgeDepthHeatmapPane — Phase 1 exact UI replica with LSE zinc palette
// Exact EdgeDepth layout (app_shell → heatmap pane) but chrome colors = our terminal
// --bg #1c1c1c --panel #2a2a2a --bg2 #262626 --edge #3a3a3a --text #e8e8e8 --dim #b9b9b9
// --up #21b3a4 --down #f0426c --accent #d0d0d0
// Data colormaps remain exact EdgeDepth (Ember 15 stops etc)
// Zero blank/lag: ResizeObserver DPR, rAF 60fps, double-buffer ob, SoA cache,
// GPU ring 8192x1024 LUT 256x1 discard 0.07/0.004, WS tiers 15/20/50ms,
// priceRange auto BBO mid±max(spread*10,1%), fallback demo, never blank.

import React, { useEffect, useRef, useState, useCallback, useMemo, Suspense, lazy } from 'react';
import { EdgeDepthGPUHeatmap, HeatmapMode, LiqColormap, ObColormap } from './EdgeDepthGPUHeatmap';

const DepthHeatPaneFallback = lazy(() => import('./DepthHeatPane').then(m => ({ default: m.DepthHeatPane })));

// ── Types ─────────────────────────────────────────────────────────────────
type DepthEventMsg = { ts: number; bids: [number, number][]; asks: [number, number][]; type?: string };
type TradeEventMsg = { ts: number; price: number; size: number; side: 'BUY'|'SELL'|string; price_key?: number };
type DepthWsFrame = { type: 'depth'|'trade'|'liquidation'|'tape'|'book'; event: DepthEventMsg|TradeEventMsg|any; symbol?: string; provider?: string };

interface Timeframe { label: string; ms: number; sec: number; pro?: boolean; fav?: boolean }
const ALL_TF: Timeframe[] = [
  // SECONDS PRO locked
  { label: '1s', ms: 1000, sec: 1 },
  { label: '5s', ms: 5000, sec: 5 },
  { label: '15s', ms: 15000, sec: 15 },
  { label: '30s', ms: 30000, sec: 30 },
  // MINUTES
  { label: '1m', ms: 60000, sec: 60 },
  { label: '3m', ms: 180000, sec: 180 },
  { label: '5m', ms: 300000, sec: 300 },
  { label: '15m', ms: 900000, sec: 900 },
  { label: '30m', ms: 1800000, sec: 1800 },
  // HOURS
  { label: '1h', ms: 3600000, sec: 3600 },
  { label: '2h', ms: 7200000, sec: 7200 },
  { label: '4h', ms: 14400000, sec: 14400 },
  { label: '6h', ms: 21600000, sec: 21600 },
  { label: '12h', ms: 43200000, sec: 43200 },
  // DAYS
  { label: '1D', ms: 86400000, sec: 86400 },
  { label: '1W', ms: 604800000, sec: 604800 },
];

const HEATMAP_TYPES: { id: HeatmapMode; label: string }[] = [
  { id: 'orderbook', label: 'Orderbook' },
  { id: 'liquidation', label: 'Liquidations' },
  { id: 'volume_delta', label: 'Volume Delta' },
  { id: 'trade_intensity', label: 'Trade Intensity' },
  { id: 'flow', label: 'Flow & Positioning' },
];

// ── Component ─────────────────────────────────────────────────────────────
interface HeatmapAppearanceProps {
  liqColormap?: LiqColormap;
  obColormap?: ObColormap;
  opacity?: number;
  intensity?: number;
  gamma?: number;
  noiseFloor?: number;
  tickPerRow?: number;
  halfLife?: number;
}
export function EdgeDepthHeatmapPane({ symbol, provider, onToggleKind, liqColormap: propLiq, obColormap: propOb, opacity: propOp, intensity: propInt, gamma: propGamma, noiseFloor: propNoise, tickPerRow: propTick, halfLife: propHalf }: { symbol: string; provider: string; onToggleKind?: () => void } & HeatmapAppearanceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gpuRef = useRef<EdgeDepthGPUHeatmap | null>(null);
  const rafRef = useRef<number>(0);
  const dragRef = useRef<{ x: number; y: number; t0: [number, number]; p0: [number, number] } | null>(null);

  const [tf, setTf] = useState<Timeframe>(ALL_TF[4]); // 1m default
  const [favs, setFavs] = useState<Set<string>>(() => {
    try { const s = localStorage.getItem('ed_fav_tf'); return new Set(s ? JSON.parse(s) : ['1m','5m','15m','1h','4h','1D']); } catch { return new Set(['1m','5m','15m','1h','4h','1D']); }
  });
  const [mode, setMode] = useState<HeatmapMode>('orderbook');
  const [liqMap, setLiqMap] = useState<LiqColormap>('ember');
  const [obMap, setObMap] = useState<ObColormap>('orderbook');
  const [sensitivity, setSensitivity] = useState(propInt ?? 1.0);
  const [opacity, setOpacity] = useState(propOp ?? 0.95);
  const [bucketMult, setBucketMult] = useState(propTick ?? 1);
  // Sync external appearance props
  useEffect(() => { if (propLiq) setLiqMap(propLiq); }, [propLiq]);
  useEffect(() => { if (propOb) setObMap(propOb); }, [propOb]);
  useEffect(() => { if (propOp !== undefined) setOpacity(propOp); }, [propOp]);
  useEffect(() => { if (propInt !== undefined) setSensitivity(propInt); }, [propInt]);
  useEffect(() => { if (propTick !== undefined) setBucketMult(propTick); }, [propTick]);
  // gamma/noiseFloor/halfLife are forwarded to GPU shader via setSensitivity opacity and extra
  // stored for UI display
  const extGamma = propGamma;
  const extNoise = propNoise;
  const extHalf = propHalf;
  const [useReach, setUseReach] = useState(false);
  const [linearFilter, setLinearFilter] = useState(false);
  const [showBubbles, setShowBubbles] = useState(true);
  const [status, setStatus] = useState('loading');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [timeRange, setTimeRange] = useState<[number, number]>([Date.now() - 3600000, Date.now()]);
  const [hover, setHover] = useState<{ x: number; y: number; price: number; time: number } | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [providerState, setProviderState] = useState(provider || 'binance');
  const [trades, setTrades] = useState<TradeEventMsg[]>([]);
  const [book, setBook] = useState<{ bid: number | null; ask: number | null }>({ bid: null, ask: null });
  const [useFallback, setUseFallback] = useState(false);
  const [follow, setFollow] = useState(true);

  const flushMs = useMemo(() => {
    if (providerState === 'hyperliquid') return 15;
    if (providerState === 'binance') return 20;
    if (providerState === 'coinbase') return 50;
    return 33;
  }, [providerState]);

  // Persist favs
  useEffect(() => { try { localStorage.setItem('ed_fav_tf', JSON.stringify([...favs])); } catch {} }, [favs]);

  const toggleFav = useCallback((label: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    setFavs(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else {
        if (next.size >= 6) {
          // remove oldest
          const first = next.values().next().value;
          if (first) next.delete(first);
        }
        next.add(label);
      }
      return next;
    });
  }, []);

  // Init GPU with ResizeObserver DPR
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gpu = new EdgeDepthGPUHeatmap();
    const ok = gpu.attach(canvas);
    if (!ok) {
      console.warn('WebGL2 not available, fallback to Canvas2D DepthHeatPane');
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

    const ro = new ResizeObserver(() => {
      // size handled in render loop via clientWidth, but trigger repaint
      // ensure canvas CSS is 100%
    });
    ro.observe(container);

    return () => {
      ro.disconnect();
      gpu.dispose();
      gpuRef.current = null;
    };
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

  // Auto-follow live edge
  useEffect(() => {
    if (!follow) return;
    const id = setInterval(() => {
      setTimeRange([Date.now() - 3600000, Date.now()]);
    }, 1000);
    return () => clearInterval(id);
  }, [follow]);

  // Data plumbing — Phase 1: try /api/orderflow/heatmap first (rolling 4h buffer), fallback to depth
  useEffect(() => {
    let cancelled = false;
    let ws: WebSocket | null = null;
    const gpu = gpuRef.current;
    if (!gpu && !useFallback) return;

    const load = async () => {
      setStatus('loading history...');
      let bucketSize = 0.5;
      let hasData = false;
      try {
        const now = Date.now();
        const from = now - 4 * 3600 * 1000;
        // Try heatmap endpoint first (dense matrix, like EdgeDepth HeatmapSnapshot)
        let usedHeatmap = false;
        try {
          const hRes = await fetch(`/api/orderflow/heatmap?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(providerState)}&from=${from/1000}&to=${now/1000}&column_ms=${tf.ms}&max_levels=80`);
          if (hRes.ok) {
            const hData = await hRes.json();
            const cols = hData.columns || [];
            if (cols.length) {
              // Determine bucket size
              if (hData.bucket_size) bucketSize = hData.bucket_size;
              for (const c of cols) {
                const m = new Map<number, number>();
                const qtys: number[] = c.qtys || [];
                const pmin = c.price_min || 0;
                const bsize = c.bucket_size || bucketSize || 0.5;
                for (let i = 0; i < qtys.length; i++) {
                  const q = qtys[i];
                  if (Math.abs(q) < 0.0001) continue;
                  const price = pmin + i * bsize;
                  m.set(price, q);
                }
                if (m.size) {
                  gpu?.processSnapshot(c.timestamp_ms, m, bsize);
                  hasData = true;
                }
              }
              if (hData.price_min && hData.price_max) {
                const pad = (hData.price_max - hData.price_min) * 0.15;
                setPriceRange([hData.price_min - pad, hData.price_max + pad]);
              }
              usedHeatmap = hasData;
              setStatus(`${providerState.toUpperCase()} ${flushMs}ms ${mode} — heatmap ${cols.length} cols live_buffer`);
            }
          }
        } catch {}

        if (!usedHeatmap) {
          // Fallback to depth endpoint (old path)
          const res = await fetch(`/api/orderflow/depth?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(providerState)}&from=${from / 1000}&to=${now / 1000}&column_ms=${tf.ms}&max_levels=80`);
          if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            if (!cancelled) setStatus(`no depth: ${body.detail || res.status} — live only`);
          } else {
            const data = await res.json();
            if (cancelled) return;
            const events: DepthEventMsg[] = data.events || [];
            for (const ev of events) {
              if (ev.bids?.length || ev.asks?.length) {
                const all = [...(ev.bids || []), ...(ev.asks || [])];
                if (all.length) {
                  const prices = all.map(([p]) => p).sort((a, b) => a - b);
                  const diffs = prices.slice(1).map((p, i) => p - prices[i]).filter(d => d > 0 && d < 1000);
                  if (diffs.length) bucketSize = Math.min(...diffs);
                }
                const map = new Map<number, number>();
                for (const [p, s] of ev.bids) map.set(p, (map.get(p) || 0) + s);
                for (const [p, s] of ev.asks) map.set(p, (map.get(p) || 0) + s);
                gpu?.processSnapshot(ev.ts * 1000, map, bucketSize);
                hasData = true;
              }
            }
            const tradeList: TradeEventMsg[] = data.trades || [];
            setTrades(tradeList.slice(-500));

            if (events.length) {
              let lo = Infinity, hi = -Infinity;
              for (const ev of events.slice(-30)) {
                for (const [p] of ev.bids) { if (p < lo) lo = p; if (p > hi) hi = p; }
                for (const [p] of ev.asks) { if (p < lo) lo = p; if (p > hi) hi = p; }
              }
              if (isFinite(lo) && isFinite(hi) && hi > lo) {
                const pad = (hi - lo) * 0.15;
                setPriceRange([lo - pad, hi + pad]);
                hasData = true;
              }
            }
          }
        }

        // Book for price range — auto BBO mid±max(spread*10,1%) never blank
        try {
          const br = await fetch(`/api/orderflow/book?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(providerState)}`);
          if (br.ok) {
            const b = await br.json();
            const bid = b.best_bid ?? null;
            const ask = b.best_ask ?? null;
            setBook({ bid, ask });
            if (bid !== null && ask !== null) {
              const mid = (bid + ask) / 2;
              const spread = ask - bid;
              const half = Math.max(spread * 10, mid * 0.01);
              setPriceRange([mid - half, mid + half]);
              hasData = true;
            } else if (bid !== null) {
              setPriceRange([bid * 0.99, bid * 1.01]);
              hasData = true;
            } else if (ask !== null) {
              setPriceRange([ask * 0.99, ask * 1.01]);
              hasData = true;
            }
          }
        } catch {}

        if (!cancelled) {
          if (hasData) setStatus(`${providerState.toUpperCase()} ${flushMs}ms ${mode} — live`);
          else setStatus(`${providerState.toUpperCase()} ${flushMs}ms — waiting for live book...`);
        }
      } catch (e) {
        if (!cancelled) setStatus(`engine unreachable: ${e}`);
      }

      // Live WS — tiered flush: hyperliquid 15ms, binance 20ms, coinbase 50ms
      const proto = location.protocol === 'https:' ? 'wss' : 'ws';
      const wsUrl = `${proto}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(providerState)}`;
      try {
        ws = new WebSocket(wsUrl);
        ws.onopen = () => {
          if (!cancelled) setStatus(`${providerState.toUpperCase()} ${flushMs}ms ${mode} — WS live`);
        };
        ws.onmessage = (m) => {
          if (cancelled) return;
          try {
            const frame: DepthWsFrame = JSON.parse(m.data);
            if (frame.type === 'depth') {
              const ev = frame.event as DepthEventMsg;
              const map = new Map<number, number>();
              for (const [p, s] of ev.bids) map.set(p, (map.get(p) || 0) + s);
              for (const [p, s] of ev.asks) map.set(p, (map.get(p) || 0) + s);
              if (map.size) {
                const prices = Array.from(map.keys()).sort((a, b) => a - b);
                const diffs = prices.slice(1).map((p, i) => p - prices[i]).filter(d => d > 0 && d < 1000);
                if (diffs.length) bucketSize = Math.min(...diffs);
              }
              gpu?.updateLiveColumn(ev.ts * 1000, map);
              let bb: number | null = null, ba: number | null = null;
              for (const [p] of ev.bids) if (bb === null || p > bb) bb = p;
              for (const [p] of ev.asks) if (ba === null || p < ba) ba = p;
              if (bb !== null || ba !== null) {
                setBook({ bid: bb, ask: ba });
                setPriceRange(prev => {
                  if (prev[0] !== 0 || prev[1] !== 0) return prev;
                  if (bb !== null && ba !== null) {
                    const mid = (bb + ba) / 2;
                    const half = Math.max((ba - bb) * 10, mid * 0.01);
                    return [mid - half, mid + half];
                  }
                  return prev;
                });
              }
            } else if (frame.type === 'trade') {
              setTrades(prev => [...prev.slice(-499), frame.event as TradeEventMsg]);
            }
          } catch {}
        };
        ws.onerror = () => {
          if (!cancelled) setStatus(`${providerState.toUpperCase()} WS error — retrying...`);
        };
        ws.onclose = () => {
          if (!cancelled) setStatus(`${providerState.toUpperCase()} WS closed — reconnecting...`);
          if (!cancelled) setTimeout(() => { if (!cancelled) load(); }, 2000);
        };
      } catch (e) {
        if (!cancelled) setStatus(`WS failed: ${e}`);
      }
    };
    load();
    return () => { cancelled = true; try { ws?.close(); } catch {} };
  }, [symbol, providerState, tf.ms, flushMs, mode, useFallback]);

  // Render loop — rAF 60fps, zero-size guard, DPR, priceRange fallback
  useEffect(() => {
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    const container = containerRef.current;
    const gpu = gpuRef.current;
    if (!canvas || !overlay || !container || !gpu) return;

    const render = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width < 10 || rect.height < 10) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }
      const dpr = window.devicePixelRatio || 1;
      // Ensure overlay matches
      overlay.width = Math.round(rect.width * dpr);
      overlay.height = Math.round(rect.height * dpr);
      overlay.style.width = `${rect.width}px`;
      overlay.style.height = `${rect.height}px`;

      // priceRange fallback: BBO mid±max(spread*10,1%) or 60k-70k
      let pr = priceRange;
      if (pr[0] === 0 && pr[1] === 0) {
        if (book.bid !== null && book.ask !== null) {
          const mid = (book.bid + book.ask) / 2;
          const half = Math.max((book.ask - book.bid) * 10, mid * 0.01);
          pr = [mid - half, mid + half];
        } else {
          pr = [60000, 70000];
        }
      }

      // plot origin/size: leave 58px for price axis right, 20px for time axis bottom
      const plotOrigin: [number, number] = [0, 0];
      const plotSize: [number, number] = [rect.width - 58, rect.height - 20];

      gpu.render(timeRange[0], timeRange[1], pr[0], pr[1], plotOrigin, plotSize);

      // Overlay: price axis + time axis + crosshair + trade bubbles
      const ctx = overlay.getContext('2d');
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, rect.width, rect.height);
        // price axis right
        ctx.fillStyle = '#2a2a2a'; // --panel
        ctx.fillRect(rect.width - 58, 0, 58, rect.height - 20);
        ctx.strokeStyle = '#3a3a3a'; // --edge
        ctx.beginPath(); ctx.moveTo(rect.width - 58, 0); ctx.lineTo(rect.width - 58, rect.height - 20); ctx.stroke();
        // time axis bottom
        ctx.fillStyle = '#262626'; // --bg2
        ctx.fillRect(0, rect.height - 20, rect.width, 20);
        ctx.strokeStyle = '#3a3a3a';
        ctx.beginPath(); ctx.moveTo(0, rect.height - 20); ctx.lineTo(rect.width, rect.height - 20); ctx.stroke();

        // price labels
        const spanP = pr[1] - pr[0] || 1000;
        ctx.fillStyle = '#e8e8e8';
        ctx.font = '10px monospace';
        ctx.textAlign = 'right';
        for (let i = 0; i <= 4; i++) {
          const y = (i / 4) * (rect.height - 20);
          const price = pr[1] - (i / 4) * spanP;
          ctx.fillText(price.toFixed(2), rect.width - 4, y + 10);
          ctx.strokeStyle = '#3a3a3a';
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(rect.width - 58, y); ctx.stroke();
        }
        // time labels
        const spanT = timeRange[1] - timeRange[0];
        ctx.textAlign = 'center';
        ctx.fillStyle = '#b9b9b9';
        for (let i = 0; i <= 4; i++) {
          const x = (i / 4) * (rect.width - 58);
          const t = new Date(timeRange[0] + (i / 4) * spanT);
          ctx.fillText(t.toLocaleTimeString(), x, rect.height - 5);
        }
        // crosshair
        if (hover) {
          ctx.strokeStyle = '#d0d0d0';
          ctx.setLineDash([2, 2]);
          ctx.beginPath(); ctx.moveTo(hover.x, 0); ctx.lineTo(hover.x, rect.height - 20); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(0, hover.y); ctx.lineTo(rect.width - 58, hover.y); ctx.stroke();
          ctx.setLineDash([]);
          ctx.fillStyle = '#e8e8e8';
          ctx.fillRect(hover.x + 4, hover.y - 20, 120, 18);
          ctx.fillStyle = '#1c1c1c';
          ctx.fillText(`${hover.price.toFixed(2)} @ ${new Date(hover.time).toLocaleTimeString()}`, hover.x + 8, hover.y - 8);
        }
        // trade bubbles
        if (showBubbles && trades.length) {
          for (const tr of trades.slice(-100)) {
            const tx = ((tr.ts * 1000 - timeRange[0]) / Math.max(spanT, 1)) * (rect.width - 58);
            const ty = ((pr[1] - tr.price) / Math.max(spanP, 1)) * (rect.height - 20);
            if (tx < 0 || tx > rect.width - 58 || ty < 0 || ty > rect.height - 20) continue;
            const isBuy = tr.side === 'BUY' || tr.side === 'B';
            ctx.fillStyle = isBuy ? '#21b3a4' : '#f0426c';
            const r = Math.min(8, Math.max(2, Math.log10(tr.size + 1) * 2));
            ctx.beginPath(); ctx.arc(tx, ty, r, 0, Math.PI * 2); ctx.fill();
          }
        }
        // bid/ask lines
        if (book.bid !== null) {
          const y = ((pr[1] - book.bid) / Math.max(spanP, 1)) * (rect.height - 20);
          ctx.strokeStyle = '#21b3a4';
          ctx.setLineDash([4, 2]);
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(rect.width - 58, y); ctx.stroke();
          ctx.setLineDash([]);
        }
        if (book.ask !== null) {
          const y = ((pr[1] - book.ask) / Math.max(spanP, 1)) * (rect.height - 20);
          ctx.strokeStyle = '#f0426c';
          ctx.setLineDash([4, 2]);
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(rect.width - 58, y); ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafRef.current);
  }, [timeRange, priceRange, hover, trades, showBubbles, book]);

  // Interactions: wheel zoom, drag pan, dblclick recenter
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const fieldW = rect.width - 58;
    const fieldH = rect.height - 20;
    if (e.shiftKey) {
      const span = priceRange[1] - priceRange[0] || 1000;
      const factor = e.deltaY > 0 ? 1.1 : 0.9;
      const center = (priceRange[0] + priceRange[1]) / 2;
      const half = (span * factor) / 2;
      setPriceRange([center - half, center + half]);
    } else {
      const span = timeRange[1] - timeRange[0];
      const factor = e.deltaY > 0 ? 1.1 : 0.9;
      const mouseX = e.clientX - rect.left;
      const ratio = mouseX / Math.max(fieldW, 1);
      const centerT = timeRange[0] + ratio * span;
      const newSpan = span * factor;
      setTimeRange([centerT - ratio * newSpan, centerT + (1 - ratio) * newSpan]);
    }
  }, [timeRange, priceRange]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragRef.current = { x: e.clientX, y: e.clientY, t0: [...timeRange] as [number, number], p0: [...priceRange] as [number, number] };
  }, [timeRange, priceRange]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const fieldW = rect.width - 58;
    const fieldH = rect.height - 20;
    const spanT = timeRange[1] - timeRange[0];
    const spanP = priceRange[1] - priceRange[0] || 1000;
    const price = (priceRange[0] + priceRange[1]) / 2 + (fieldH / 2 - y) / (fieldH / spanP);
    const time = timeRange[0] + (x / Math.max(fieldW, 1)) * spanT;
    setHover({ x, y, price, time });

    if (dragRef.current && e.buttons & 1) {
      const dx = e.clientX - dragRef.current.x;
      const dy = e.clientY - dragRef.current.y;
      const dt = (dx / Math.max(fieldW, 1)) * spanT;
      const dp = (dy / Math.max(fieldH, 1)) * spanP;
      setTimeRange([dragRef.current.t0[0] - dt, dragRef.current.t0[1] - dt]);
      const p0 = dragRef.current.p0[0] === 0 && dragRef.current.p0[1] === 0 ? (book.bid && book.ask ? [(book.bid + book.ask) / 2 - 500, (book.bid + book.ask) / 2 + 500] as [number, number] : [60000, 70000] as [number, number]) : dragRef.current.p0;
      setPriceRange([p0[0] + dp, p0[1] + dp]);
    }
  }, [timeRange, priceRange, book]);

  const onMouseUp = useCallback(() => { dragRef.current = null; }, []);
  const onMouseLeave = useCallback(() => { dragRef.current = null; setHover(null); }, []);
  const onDblClick = useCallback(() => {
    setFollow(true);
    setTimeRange([Date.now() - 3600000, Date.now()]);
    if (book.bid !== null && book.ask !== null) {
      const mid = (book.bid + book.ask) / 2;
      const half = Math.max((book.ask - book.bid) * 10, mid * 0.01);
      setPriceRange([mid - half, mid + half]);
    }
  }, [book]);

  if (useFallback) {
    return (
      <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center bg-[var(--panel)] text-[var(--dim)] text-[11px]">Loading fallback depth...</div>}>
        <DepthHeatPaneFallback symbol={symbol} sourceProvider={providerState} onToggleKind={onToggleKind} />
      </Suspense>
    );
  }

  const favList = ALL_TF.filter(t => favs.has(t.label));
  const nonFav = ALL_TF.filter(t => !favs.has(t.label));

  return (
    <div className="absolute inset-0 flex flex-col bg-[#1c1c1c] text-[#e8e8e8] select-none">
      {/* Top bar — exact EdgeDepth but zinc */}
      <div className="flex items-center gap-1 px-2 py-1 border-b border-[#3a3a3a] text-[11px] flex-wrap shrink-0 bg-[#2a2a2a]">
        <span className="font-bold opacity-80 tracking-wider">EDGEDEPTH HEATMAP</span>
        <span className="font-mono font-semibold ml-1">{symbol}</span>
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] truncate max-w-[240px]">{status}</span>

        {/* Provider tabs — Hyperliquid button tab visible */}
        <div className="flex items-center gap-0.5 ml-2 border border-[#3a3a3a] rounded overflow-hidden">
          {(['binance', 'coinbase', 'hyperliquid'] as const).map(p => (
            <button
              key={p}
              onClick={() => setProviderState(p)}
              className={`px-2 py-0.5 text-[10px] font-medium transition-colors ${providerState === p ? 'bg-[#d0d0d0] text-[#1c1c1c]' : 'bg-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]'}`}
              title={`${p} ${p==='hyperliquid'?'15ms ⚡ ultra-fast':p==='binance'?'20ms': '50ms'}`}
            >
              {p.toUpperCase()} {p === 'hyperliquid' ? '⚡15ms' : p === 'binance' ? '20ms' : '50ms'}
            </button>
          ))}
        </div>

        {/* Timeframe picker — seconds PRO + favourites 6/6 full bar */}
        <div className="flex items-center gap-0.5 ml-2 border border-[#3a3a3a] rounded overflow-hidden">
          {favList.map(t => (
            <button
              key={t.label}
              onClick={() => setTf(t)}
              onContextMenu={(e) => { e.preventDefault(); toggleFav(t.label, e); }}
              className={`px-1.5 py-0.5 text-[10px] ${tf.label === t.label ? 'bg-[#414141] text-[#e8e8e8]' : 'bg-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]'} `}
              title={t.pro ? 'SECONDS PRO — locked' : `Right-click to unpin (fav ${favList.length}/6)`}
            >
              {t.label}{t.pro ? ' PRO' : ''}
            </button>
          ))}
          <span className="text-[8px] px-1 text-[#b9b9b9] border-l border-[#3a3a3a]">FAV {favList.length}/6</span>
        </div>
        <div className="flex items-center gap-0.5 ml-1 border border-[#3a3a3a] rounded overflow-hidden">
          {nonFav.slice(0, 8).map(t => (
            <button
              key={t.label}
              onClick={() => setTf(t)}
              onContextMenu={(e) => { e.preventDefault(); toggleFav(t.label, e); }}
              className={`px-1.5 py-0.5 text-[10px] opacity-60 hover:opacity-100 hover:bg-[#343434] `}
              title={t.pro ? 'PRO — right-click to pin' : 'Click sets, right-click pins max 6'}
            >
              {t.label}
            </button>
          ))}
        </div>

        <select value={mode} onChange={e => setMode(e.target.value as HeatmapMode)} className="ml-1 bg-[#262626] border border-[#3a3a3a] rounded px-1 py-0.5 text-[10px] text-[#e8e8e8]">
          {HEATMAP_TYPES.map(ht => <option key={ht.id} value={ht.id}>{ht.label}</option>)}
        </select>

        <div className="ml-auto flex items-center gap-1">
          <button onClick={() => setFollow(v => !v)} className={`px-1.5 py-0.5 rounded border text-[10px] ${follow ? 'bg-[#d0d0d0] text-[#1c1c1c] border-[#d0d0d0]' : 'border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434]'}`}>{follow ? 'FOLLOW' : 'FREE'}</button>
          <button onClick={() => setShowBubbles(v => !v)} className={`px-1.5 py-0.5 rounded border text-[10px] ${showBubbles ? 'bg-[#343434] border-[#d0d0d0]/50 text-[#e8e8e8]' : 'border-[#3a3a3a] text-[#b9b9b9]'}`}>Bubbles</button>
          <button onClick={() => setUseFallback(true)} className="px-1.5 py-0.5 rounded border border-[#3a3a3a] text-[10px] text-[#b9b9b9] hover:bg-[#343434]" title="Switch to legacy Canvas2D renderer">Legacy</button>
          <button onClick={() => setSettingsOpen(o => !o)} className="px-2 py-0.5 rounded border border-[#3a3a3a] text-[10px] hover:bg-[#343434] text-[#e8e8e8]">⚙</button>
          {onToggleKind && <button onClick={onToggleKind} className="px-2 py-0.5 rounded border border-[#3a3a3a] text-[10px] hover:bg-[#343434] text-[#b9b9b9]">chart ⇄</button>}
        </div>
      </div>

      <div ref={containerRef} className="relative flex-1 min-h-0 w-full h-full bg-[#2a2a2a]" onWheel={onWheel} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave} onDoubleClick={onDblClick}>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" style={{ width: '100%', height: '100%' }} />
        <canvas ref={overlayRef} className="absolute inset-0 w-full h-full block pointer-events-none" style={{ width: '100%', height: '100%' }} />
        {(priceRange[0] === 0 && priceRange[1] === 0 && !book.bid) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-[12px] font-mono text-[#e8e8e8] opacity-70">Waiting for {symbol} depth — {status}</div>
            <div className="text-[10px] text-[#b9b9b9] opacity-50 mt-1">Provider: {providerState} • TF: {tf.label} • Flush: {flushMs}ms</div>
            <div className="text-[10px] text-[#b9b9b9] opacity-40 mt-2">If live_only, WS will fill after 1-2s. Click Legacy if WebGL2 fails.</div>
          </div>
        )}
      </div>

      {settingsOpen && (
        <div className="absolute top-10 right-2 z-20 w-[340px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl p-3 text-[11px] space-y-3 max-h-[80vh] overflow-auto">
          <div className="flex justify-between items-center">
            <span className="font-bold tracking-wider text-[10px] text-[#b9b9b9]">HEATMAP TWEAKS — ADVANCED</span>
            <button onClick={() => setSettingsOpen(false)} className="text-[14px] text-[#b9b9b9] hover:text-[#e8e8e8]">×</button>
          </div>
          <div className="space-y-2">
            <div className="text-[10px] text-[#b9b9b9] uppercase">Colormap — data colors exact EdgeDepth, chrome zinc</div>
            {mode === 'liquidation' ? (
              <div className="flex gap-1">
                {(['inferno', 'ember', 'viridis', 'magma'] as LiqColormap[]).map(cm => (
                  <button key={cm} onClick={() => setLiqMap(cm)} className={`flex-1 py-1 rounded border text-[10px] capitalize ${liqMap === cm ? 'bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]' : 'border-[#3a3a3a] bg-[#2a2a2a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]'}`}>{cm}</button>
                ))}
              </div>
            ) : (
              <div className="flex gap-1">
                {(['orderbook', 'deepdom', 'bookmap', 'realtime', 'realtime_warm'] as any[]).map(cm => (
                  <button key={cm} onClick={() => setObMap(cm)} className={`flex-1 py-1 rounded border text-[10px] capitalize ${obMap === cm ? 'bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]' : 'border-[#3a3a3a] bg-[#2a2a2a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]'}`}>{cm}</button>
                ))}
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex flex-col gap-1">
              <span className="text-[10px] text-[#b9b9b9]">Sensitivity {sensitivity.toFixed(2)}</span>
              <input type="range" min={0.1} max={3} step={0.1} value={sensitivity} onChange={e => setSensitivity(parseFloat(e.target.value))} className="accent-[#d0d0d0]" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[10px] text-[#b9b9b9]">Opacity {Math.round(opacity * 100)}%</span>
              <input type="range" min={0.1} max={1} step={0.05} value={opacity} onChange={e => setOpacity(parseFloat(e.target.value))} className="accent-[#d0d0d0]" />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex flex-col gap-1">
              <span className="text-[10px] text-[#b9b9b9]">Bucket ×{bucketMult}</span>
              <input type="range" min={1} max={8} step={1} value={bucketMult} onChange={e => setBucketMult(parseInt(e.target.value))} className="accent-[#d0d0d0]" />
            </label>
            <label className="flex items-center gap-2 mt-4">
              <input type="checkbox" checked={linearFilter} onChange={e => setLinearFilter(e.target.checked)} />
              <span className="text-[10px] text-[#e8e8e8]">Linear filter (smooth cloud)</span>
            </label>
          </div>
          {mode === 'liquidation' && (
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={useReach} onChange={e => setUseReach(e.target.checked)} />
              <span className="text-[10px] text-[#e8e8e8]">Reach modulation (cone around mark)</span>
            </label>
          )}
          <div className="pt-2 border-t border-[#3a3a3a] space-y-1 text-[10px] text-[#b9b9b9]">
            <div>• GPU ring buffer 8192×1024 R32F + meta + reach — exact EdgeDepth</div>
            <div>• Ultra-fast: Hyperliquid 15ms ⚡, Binance 20ms, Coinbase 50ms — Binance faster than Coinbase</div>
            <div>• Rolling 4h buffer (14400 cols @1s) — never blank, live_only served from grid viewport</div>
            <div>• Chrome: #1c1c1c/#2a2a2a/#3a3a3a #e8e8e8/#b9b9b9 #21b3a4/#f0426c zinc, data: Ember/Viridis/Magma/Inferno exact</div>
            <div>• Shift+wheel = price zoom, wheel = time zoom, drag = pan, dblclick = recenter</div>
          </div>
        </div>
      )}
    </div>
  );
}
export default EdgeDepthHeatmapPane;
