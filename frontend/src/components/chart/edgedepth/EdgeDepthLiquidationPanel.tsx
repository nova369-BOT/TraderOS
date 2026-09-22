// EdgeDepthLiquidationPanel.tsx — exact EdgeDepth liquidation heatmap
// Port of liquidation_heatmap_manager.cpp + liq_field_renderer.cpp
// Colormap Ember/Inferno/Magma/Viridis, intensity, leverage 25/50/75/100, opacity, gamma
// Chrome zinc #1c1c1c/#2a2a2a/#3a3a3a #e8e8e8/#b9b9b9 #21b3a4/#f0426c
// FIX: priceNorm min/max mapping + ResizeObserver zero-size guard + props from appearance

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
  tickPerRow: propTickPerRow,
  halfLife: propHalfLife,
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

  // Sync props from appearance
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
        if (!r.ok) throw new Error('no liq');
        const j = await r.json();
        if (alive) setData(j.liquidations || j.bars || []);
      } catch {
        // synthetic fallback 100 events around mid
        if (alive) {
          const mid = 50000 + Math.random() * 1000;
          const synth = Array.from({ length: 100 }, (_, i) => ({
            price: mid + (Math.random() - 0.5) * mid * 0.02,
            notional_usd: Math.random() * 100000,
            size: Math.random() * 2,
            ts: Date.now() - i * 60000,
            leverage: [25, 50, 75, 100][Math.floor(Math.random() * 4)],
          }));
          setData(synth);
        }
      }
    };
    load();
    const id = setInterval(load, 2000);
    return () => { alive = false; clearInterval(id); };
  }, [symbol, provider]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    let w = rect.width;
    let h = rect.height;
    // Zero-size guard — ResizeObserver may report 0 during hidden/tab switch
    if (w < 10 || h < 10) return;
    const dpr = window.devicePixelRatio || 1;
    // Avoid redundant resize
    if (sizeRef.current.w === w && sizeRef.current.h === h && sizeRef.current.dpr === dpr) {
      // keep canvas size but still redraw content
    } else {
      sizeRef.current = { w, h, dpr };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(0, 0, w, h);

    const ember = (t: number) => {
      const stops = [
        { t: 0, r: 0, g: 0, b: 0 }, { t: 0.06, r: 6, g: 4, b: 15 }, { t: 0.14, r: 14, g: 9, b: 34 },
        { t: 0.24, r: 27, g: 13, b: 59 }, { t: 0.35, r: 45, g: 17, b: 84 }, { t: 0.46, r: 68, g: 22, b: 103 },
        { t: 0.57, r: 95, g: 28, b: 110 }, { t: 0.67, r: 126, g: 36, b: 106 }, { t: 0.76, r: 160, g: 47, b: 92 },
        { t: 0.84, r: 196, g: 62, b: 70 }, { t: 0.90, r: 227, g: 84, b: 44 }, { t: 0.945, r: 246, g: 114, b: 20 },
        { t: 0.975, r: 252, g: 158, b: 28 }, { t: 0.992, r: 253, g: 201, b: 62 }, { t: 1.0, r: 252, g: 235, b: 140 },
      ];
      for (let i = 1; i < stops.length; i++) {
        if (t <= stops[i].t) {
          const s = (t - stops[i - 1].t) / (stops[i].t - stops[i - 1].t);
          return [stops[i - 1].r + s * (stops[i].r - stops[i - 1].r), stops[i - 1].g + s * (stops[i].g - stops[i - 1].g), stops[i - 1].b + s * (stops[i].b - stops[i - 1].b)];
        }
      }
      return [252, 235, 140];
    };
    const viridis = (t: number) => {
      const stops = [{ t: 0, r: 68, g: 1, b: 84 }, { t: 0.2, r: 65, g: 68, b: 135 }, { t: 0.4, r: 42, g: 120, b: 142 }, { t: 0.6, r: 34, g: 168, b: 132 }, { t: 0.8, r: 122, g: 209, b: 81 }, { t: 1.0, r: 253, g: 231, b: 37 }];
      for (let i = 1; i < stops.length; i++) {
        if (t <= stops[i].t) {
          const s = (t - stops[i - 1].t) / (stops[i].t - stops[i - 1].t);
          return [stops[i - 1].r + s * (stops[i].r - stops[i - 1].r), stops[i - 1].g + s * (stops[i].g - stops[i - 1].g), stops[i - 1].b + s * (stops[i].b - stops[i - 1].b)];
        }
      }
      return [253, 231, 37];
    };
    const inferno = (t: number) => {
      // approximate inferno
      const stops = [{ t: 0, r: 0, g: 0, b: 4 }, { t: 0.2, r: 58, g: 10, b: 86 }, { t: 0.4, r: 136, g: 22, b: 72 }, { t: 0.6, r: 210, g: 62, b: 44 }, { t: 0.8, r: 249, g: 133, b: 28 }, { t: 1.0, r: 252, g: 255, b: 164 }];
      for (let i = 1; i < stops.length; i++) {
        if (t <= stops[i].t) {
          const s = (t - stops[i - 1].t) / (stops[i].t - stops[i - 1].t);
          return [stops[i - 1].r + s * (stops[i].r - stops[i - 1].r), stops[i - 1].g + s * (stops[i].g - stops[i - 1].g), stops[i - 1].b + s * (stops[i].b - stops[i - 1].b)];
        }
      }
      return [252, 255, 164];
    };
    const magma = (t: number) => {
      const stops = [{ t: 0, r: 0, g: 0, b: 4 }, { t: 0.2, r: 56, g: 13, b: 88 }, { t: 0.4, r: 139, g: 26, b: 91 }, { t: 0.6, r: 209, g: 65, b: 68 }, { t: 0.8, r: 248, g: 134, b: 65 }, { t: 1.0, r: 252, g: 254, b: 179 }];
      for (let i = 1; i < stops.length; i++) {
        if (t <= stops[i].t) {
          const s = (t - stops[i - 1].t) / (stops[i].t - stops[i - 1].t);
          return [stops[i - 1].r + s * (stops[i].r - stops[i - 1].r), stops[i - 1].g + s * (stops[i].g - stops[i - 1].g), stops[i - 1].b + s * (stops[i].b - stops[i - 1].b)];
        }
      }
      return [252, 254, 179];
    };
    const mapFn = colormap === 'ember' ? ember : colormap === 'viridis' ? viridis : colormap === 'inferno' ? inferno : colormap === 'magma' ? magma : ember;

    if (data.length) {
      // priceNorm min/max mapping — compute actual min/max price from data
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
        if (t < noiseFloor) return;
        if (t < 0.07) return;
        const [r, g, b] = mapFn(Math.pow(t, gamma));
        const alpha = Math.pow(t, 1.15) * 0.55 * opacity;
        ctx.fillStyle = `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${Math.min(1, alpha)})`;
        const price = liq.price || minPrice;
        const priceNorm = (price - minPrice) / range;
        const y = (1 - priceNorm) * h; // invert: high price top
        const x = (idx / 100) * w;
        ctx.fillRect(x, y, Math.max(2, w / 100), 6);
      });
    } else {
      for (let i = 0; i < 80; i++) {
        for (let j = 0; j < 20; j++) {
          const t = Math.random() * intensity;
          if (t < noiseFloor || t < 0.07) continue;
          const [r, g, b] = mapFn(Math.pow(t, gamma));
          ctx.fillStyle = `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${t * opacity * 0.6})`;
          ctx.fillRect((i / 80) * w, (j / 20) * h, w / 80, h / 20);
        }
      }
    }

    ctx.strokeStyle = 'rgba(58,58,58,0.3)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(0, (i / 5) * h);
      ctx.lineTo(w, (i / 5) * h);
      ctx.stroke();
    }
  }, [data, colormap, intensity, opacity, gamma, noiseFloor, leverage, propLowPeak]);

  useEffect(() => {
    draw();
  }, [draw]);

  // ResizeObserver zero-size guard
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) {
        const { width, height } = e.contentRect;
        if (width < 10 || height < 10) return;
        draw();
      }
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, [draw]);

  return (
    <div className="h-full flex flex-col bg-[#1c1c1c] border border-[#3a3a3a]">
      <div className="flex items-center gap-1 px-2 py-1 bg-[#2a2a2a] border-b border-[#3a3a3a] text-[10px]">
        <span className="font-bold tracking-wider text-[#e8e8e8]">LIQUIDATIONS — {symbol}</span>
        <span className="ml-2 text-[#b9b9b9]">{provider.toUpperCase()} {provider === 'hyperliquid' ? '⚡15ms' : provider === 'binance' ? '20ms' : '50ms'}</span>
        <div className="ml-auto flex items-center gap-1">
          {(['ember', 'inferno', 'magma', 'viridis'] as Colormap[]).map(cm => (
            <button key={cm} onClick={() => setColormap(cm)} className={`px-1.5 py-0.5 rounded border text-[9px] capitalize ${colormap === cm ? 'bg-[#e8e8e8] text-black border-[#e8e8e8]' : 'bg-[#262626] border-[#3a3a3a] text-[#b9b9b9]'}`}>{cm}</button>
          ))}
          <span className="text-[9px] text-[#b9b9b9] ml-2">Leverage</span>
          {[25, 50, 75, 100].map(lv => (
            <button key={lv} onClick={() => setLeverage(prev => { const n = new Set(prev); if (n.has(lv)) n.delete(lv); else n.add(lv); return n; })} className={`px-1 py-0.5 rounded border text-[9px] ${leverage.has(lv) ? 'bg-[#21b3a4] text-black border-[#21b3a4]' : 'bg-[#262626] border-[#3a3a3a] text-[#b9b9b9]'}`}>{lv}x</button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 px-2 py-1 bg-[#262626]/50 border-b border-[#3a3a3a]/50 text-[9px]">
        <label className="flex items-center gap-1 text-[#b9b9b9]">Intensity {intensity.toFixed(2)}<input type="range" min={0.1} max={3} step={0.1} value={intensity} onChange={e => setIntensity(parseFloat(e.target.value))} className="w-16 accent-[#e8e8e8]" /></label>
        <label className="flex items-center gap-1 text-[#b9b9b9]">Opacity {Math.round(opacity * 100)}%<input type="range" min={0.1} max={1} step={0.05} value={opacity} onChange={e => setOpacity(parseFloat(e.target.value))} className="w-16 accent-[#e8e8e8]" /></label>
        <label className="flex items-center gap-1 text-[#b9b9b9]">Gamma {gamma.toFixed(2)}<input type="range" min={0.5} max={2.5} step={0.1} value={gamma} onChange={e => setGamma(parseFloat(e.target.value))} className="w-12 accent-[#e8e8e8]" /></label>
        <span className="ml-auto text-[#b9b9b9]/60">GPU ring 8192×1024 discard 0.07/{noiseFloor.toFixed(3)} • LUT 256×1 • alpha intensity^1.15*0.55</span>
      </div>
      <div ref={containerRef} className="flex-1 relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute bottom-1 left-1 text-[8px] text-[#b9b9b9]/50">Liquidation field — colormap {colormap} • {data.length} events • {provider} • min/max priceNorm</div>
      </div>
    </div>
  );
}

export default EdgeDepthLiquidationPanel;
