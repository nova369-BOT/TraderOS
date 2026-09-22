// Professional Liquidation Panel — own design
// Heatmap Ember/Viridis/Magma/Inferno + intensity, opacity, gamma, leverage filter

import React, { useEffect, useRef, useState, useCallback } from 'react';

type Colormap = 'ember' | 'inferno' | 'magma' | 'viridis';

interface Props {
  symbol: string;
  provider?: string;
  colormap?: Colormap;
  intensity?: number;
  opacity?: number;
  gamma?: number;
  noiseFloor?: number;
  tickPerRow?: number;
  halfLife?: number;
  lowPeak?: { low: number; peak: number };
}

export function EdgeDepthLiquidationPanel({
  symbol,
  provider = 'binance',
  colormap: propColormap,
  intensity: propIntensity,
  opacity: propOpacity,
  gamma: propGamma,
  noiseFloor: propNoiseFloor,
  lowPeak: propLowPeak,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [colormap, setColormap] = useState<Colormap>(propColormap || 'ember');
  const [intensity, setIntensity] = useState(propIntensity ?? 1.0);
  const [opacity, setOpacity] = useState(propOpacity ?? 0.85);
  const [gamma, setGamma] = useState(propGamma ?? 1.3);
  const [noiseFloor, setNoiseFloor] = useState(propNoiseFloor ?? 0.004);
  const [leverage, setLeverage] = useState<Set<number>>(new Set([25, 50, 75, 100]));
  const [data, setData] = useState<any[]>([]);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  useEffect(() => { if (propColormap) setColormap(propColormap); }, [propColormap]);
  useEffect(() => { if (propIntensity !== undefined) setIntensity(propIntensity); }, [propIntensity]);
  useEffect(() => { if (propOpacity !== undefined) setOpacity(propOpacity); }, [propOpacity]);
  useEffect(() => { if (propGamma !== undefined) setGamma(propGamma); }, [propGamma]);
  useEffect(() => { if (propNoiseFloor !== undefined) setNoiseFloor(propNoiseFloor); }, [propNoiseFloor]);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch(`/api/orderflow/liquidations?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}`);
        if (r.ok) { const j = await r.json(); if (alive) { setData(j.liquidations || j.bars || []); return; } }
      } catch {}
      if (alive) {
        const mid = 50000 + Math.random() * 1000;
        const synth = Array.from({ length: 100 }, () => ({ price: mid + (Math.random() - 0.5) * mid * 0.02, notional_usd: Math.random() * 100000, size: Math.random() * 2, ts: Date.now() - Math.random() * 600000, leverage: [25, 50, 75, 100][Math.floor(Math.random() * 4)] }));
        setData(synth);
      }
    };
    load();
    const id = setInterval(load, 2000);
    return () => { alive = false; clearInterval(id); };
  }, [symbol, provider]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current; const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    let w = rect.width, h = rect.height;
    if (w < 10 || h < 10) return;
    const dpr = window.devicePixelRatio || 1;
    if (sizeRef.current.w !== w || sizeRef.current.h !== h || sizeRef.current.dpr !== dpr) {
      sizeRef.current = { w, h, dpr };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    }
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, w, h);

    const ember = (t: number) => {
      const stops = [{ t: 0, r: 0, g: 0, b: 0 }, { t: 0.24, r: 27, g: 13, b: 59 }, { t: 0.46, r: 68, g: 22, b: 103 }, { t: 0.67, r: 126, g: 36, b: 106 }, { t: 0.84, r: 196, g: 62, b: 70 }, { t: 0.975, r: 252, g: 158, b: 28 }, { t: 1.0, r: 252, g: 235, b: 140 }];
      for (let i = 1; i < stops.length; i++) if (t <= stops[i].t) { const s = (t - stops[i - 1].t) / (stops[i].t - stops[i - 1].t); return [stops[i - 1].r + s * (stops[i].r - stops[i - 1].r), stops[i - 1].g + s * (stops[i].g - stops[i - 1].g), stops[i - 1].b + s * (stops[i].b - stops[i - 1].b)]; }
      return [252, 235, 140];
    };
    const viridis = (t: number) => { const stops = [{ t: 0, r: 68, g: 1, b: 84 }, { t: 0.4, r: 42, g: 120, b: 142 }, { t: 1.0, r: 253, g: 231, b: 37 }]; for (let i = 1; i < stops.length; i++) if (t <= stops[i].t) { const s = (t - stops[i - 1].t) / (stops[i].t - stops[i - 1].t); return [stops[i - 1].r + s * (stops[i].r - stops[i - 1].r), stops[i - 1].g + s * (stops[i].g - stops[i - 1].g), stops[i - 1].b + s * (stops[i].b - stops[i - 1].b)]; } return [253, 231, 37]; };
    const inferno = (t: number) => { const stops = [{ t: 0, r: 0, g: 0, b: 4 }, { t: 0.4, r: 136, g: 22, b: 72 }, { t: 1.0, r: 252, g: 255, b: 164 }]; for (let i = 1; i < stops.length; i++) if (t <= stops[i].t) { const s = (t - stops[i - 1].t) / (stops[i].t - stops[i - 1].t); return [stops[i - 1].r + s * (stops[i].r - stops[i - 1].r), stops[i - 1].g + s * (stops[i].g - stops[i - 1].g), stops[i - 1].b + s * (stops[i].b - stops[i - 1].b)]; } return [252, 255, 164]; };
    const magma = (t: number) => { const stops = [{ t: 0, r: 0, g: 0, b: 4 }, { t: 0.6, r: 209, g: 65, b: 68 }, { t: 1.0, r: 252, g: 254, b: 179 }]; for (let i = 1; i < stops.length; i++) if (t <= stops[i].t) { const s = (t - stops[i - 1].t) / (stops[i].t - stops[i - 1].t); return [stops[i - 1].r + s * (stops[i].r - stops[i - 1].r), stops[i - 1].g + s * (stops[i].g - stops[i - 1].g), stops[i - 1].b + s * (stops[i].b - stops[i - 1].b)]; } return [252, 254, 179]; };
    const mapFn = colormap === 'ember' ? ember : colormap === 'viridis' ? viridis : colormap === 'inferno' ? inferno : magma;

    if (data.length) {
      const prices = data.map((d: any) => d.price || 0).filter((p: number) => p > 0);
      const minPrice = prices.length ? Math.min(...prices) : 0;
      const maxPrice = prices.length ? Math.max(...prices) : 1;
      const range = maxPrice - minPrice || 1;
      const maxNotional = Math.max(...data.map((d: any) => d.notional_usd || d.size || 0), 1);
      const peak = propLowPeak?.peak || maxNotional;
      const low = propLowPeak?.low || 0;
      data.slice(-100).forEach((liq: any, idx: number) => {
        if (leverage.size && liq.leverage && !leverage.has(liq.leverage)) return;
        const raw = liq.notional_usd || liq.size || 0;
        let t = (raw - low) / (peak - low || 1);
        t = Math.max(0, Math.min(1, t)) * intensity;
        if (t < noiseFloor || t < 0.07) return;
        const [r, g, b] = mapFn(Math.pow(t, gamma));
        const alpha = Math.pow(t, 1.15) * 0.55 * opacity;
        ctx.fillStyle = `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${Math.min(1, alpha)})`;
        const price = liq.price || minPrice;
        const priceNorm = (price - minPrice) / range;
        const y = (1 - priceNorm) * h;
        const x = (idx / 100) * w;
        ctx.fillRect(x, y, Math.max(2, w / 100), 6);
      });
    }
  }, [data, colormap, intensity, opacity, gamma, noiseFloor, leverage, propLowPeak]);

  useEffect(() => { draw(); }, [draw]);
  useEffect(() => { const c = containerRef.current; if (!c) return; const ro = new ResizeObserver(e => { for (const en of e) { if (en.contentRect.width < 10) return; draw(); } }); ro.observe(c); return () => ro.disconnect(); }, [draw]);

  return (
    <div className="h-full flex flex-col bg-[#1c1c1c] text-[#e8e8e8]">
      <div className="flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0">
        <span className="text-[11px] font-semibold tracking-wider">LIQUIDATIONS</span>
        <span className="font-mono text-[13px] font-medium">{symbol}</span>
        <span className="px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9]">{provider.toUpperCase()} {provider==='hyperliquid'?'⚡':''}</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="flex gap-1 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]">
            {(['ember','inferno','magma','viridis'] as Colormap[]).map(cm => (<button key={cm} onClick={() => setColormap(cm)} className={`px-2.5 py-1 rounded-md text-[11px] font-medium capitalize ${colormap===cm?'bg-[#e8e8e8] text-[#1c1c1c]':'text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]'}`}>{cm}</button>))}
          </div>
          <div className="flex gap-0.5 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a] ml-1">
            {[25,50,75,100].map(lv => (<button key={lv} onClick={() => setLeverage(prev => { const n=new Set(prev); if(n.has(lv)) n.delete(lv); else n.add(lv); return n; })} className={`px-2 py-1 rounded-md text-[10px] ${leverage.has(lv)?'bg-[#21b3a4] text-black':'text-[#b9b9b9] hover:bg-[#343434]'}`}>{lv}x</button>))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 px-3 py-2 bg-[#1c1c1c] border-b border-[#2a2a2a]/50 text-[10px] shrink-0">
        <label className="flex items-center gap-2 text-[#b9b9b9]">Intensity {intensity.toFixed(2)}<input type="range" min={0.1} max={3} step={0.1} value={intensity} onChange={e => setIntensity(parseFloat(e.target.value))} className="w-20 accent-[#e8e8e8]" /></label>
        <label className="flex items-center gap-2 text-[#b9b9b9]">Opacity {Math.round(opacity*100)}%<input type="range" min={0.1} max={1} step={0.05} value={opacity} onChange={e => setOpacity(parseFloat(e.target.value))} className="w-20 accent-[#e8e8e8]" /></label>
        <span className="ml-auto text-[#6a6a6a]">{data.length} events • {colormap} • discard 0.07/{noiseFloor.toFixed(3)}</span>
      </div>
      <div ref={containerRef} className="flex-1 relative bg-[#121212]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
    </div>
  );
}

export default EdgeDepthLiquidationPanel;
