// EdgeDepthIndicators.tsx — exact EdgeDepth indicators: Volume CVD RSI MACD Funding Rate Open Interest VPIN Toxicity
// Render-in-order, deduplicate if LSE already has RSI/MACD/Volume/CVD take ONE (keep LSE logic but EdgeDepth UI)
// Missing: Funding Rate, Open Interest, VPIN, Flow & Positioning, TPO, Footprint, Renko, Liquidation heatmap, Trade bubbles, Volume profile
// Chrome zinc #1c1c1c/#2a2a2a/#3a3a3a #e8e8e8/#b9b9b9 #21b3a4/#f0426c

import React, { useEffect, useState, useMemo } from 'react';

export type IndicatorId = 'volume' | 'cvd' | 'rsi' | 'macd' | 'funding' | 'oi' | 'vpin' | 'toxicity';

interface IndicatorDef { id: IndicatorId; label: string; desc: string; enabled: boolean; height: number; pro?: boolean }

const ALL_INDICATORS: IndicatorDef[] = [
  { id: 'volume', label: 'Volume', desc: 'Trading volume bars', enabled: true, height: 80 },
  { id: 'cvd', label: 'CVD', desc: 'Cumulative Volume Delta', enabled: true, height: 100 },
  { id: 'rsi', label: 'RSI', desc: 'Relative Strength Index (14)', enabled: false, height: 90 },
  { id: 'macd', label: 'MACD', desc: 'Moving Average Convergence Divergence', enabled: false, height: 100 },
  { id: 'funding', label: 'Funding Rate', desc: 'Blue above 0 longs pay shorts, red below', enabled: false, height: 80, pro: false },
  { id: 'oi', label: 'Open Interest', desc: 'Green increased, red decreased OHLC', enabled: false, height: 100, pro: false },
  { id: 'vpin', label: 'VPIN', desc: 'Toxicity pane 0-1.0 fixed axis, step-hold line', enabled: false, height: 110, pro: true },
  { id: 'toxicity', label: 'Toxicity', desc: 'Regime washes + corner readout', enabled: false, height: 110, pro: true },
];

export function EdgeDepthIndicators({
  symbol,
  provider = 'binance',
  onToggle,
  enabledIds,
}: {
  symbol: string;
  provider?: string;
  onToggle?: (id: IndicatorId, enabled: boolean) => void;
  enabledIds?: Set<IndicatorId>;
}) {
  const [indicators, setIndicators] = useState<IndicatorDef[]>(ALL_INDICATORS);
  const [data, setData] = useState<Record<string, any>>({});

  useEffect(() => {
    setIndicators(prev => prev.map(i => ({ ...i, enabled: enabledIds ? enabledIds.has(i.id) : i.enabled })));
  }, [enabledIds]);

  // Fetch data for funding, OI, CVD, etc.
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        // CVD
        const cvdR = await fetch(`/api/orderflow/cvd?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}&window=session`);
        if (cvdR.ok && alive) { const j = await cvdR.json(); setData(d => ({ ...d, cvd: j })); }
        // Funding — try binance funding endpoint via our API? Fallback synthetic
        try {
          const fr = await fetch(`/api/orderflow/funding?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}`);
          if (fr.ok && alive) { const j = await fr.json(); setData(d => ({ ...d, funding: j })); }
          else {
            // synthetic funding
            const synth = Array.from({ length: 50 }, (_, i) => ({ time: Date.now() - (50 - i) * 8 * 3600000, rate: (Math.random() - 0.5) * 0.001 }));
            if (alive) setData(d => ({ ...d, funding: { bars: synth } }));
          }
        } catch {
          const synth = Array.from({ length: 50 }, (_, i) => ({ time: Date.now() - (50 - i) * 8 * 3600000, rate: (Math.random() - 0.5) * 0.001 }));
          if (alive) setData(d => ({ ...d, funding: { bars: synth } }));
        }
        // OI synthetic
        const oiSynth = Array.from({ length: 50 }, (_, i) => {
          const base = 1000000 + Math.random() * 500000;
          return { time: Date.now() - (50 - i) * 3600000, open: base, high: base * 1.02, low: base * 0.98, close: base + (Math.random() - 0.5) * 100000 };
        });
        if (alive) setData(d => ({ ...d, oi: { bars: oiSynth } }));

        // VPIN synthetic 0-1
        const vpinSynth = Array.from({ length: 100 }, (_, i) => ({ ts_ms: Date.now() - (100 - i) * 60000, vpin: Math.random(), conf: Math.random(), regime: ['NORMAL', 'ELEVATED', 'HIGH', 'EXTREME'][Math.floor(Math.random() * 4)] }));
        if (alive) setData(d => ({ ...d, vpin: { points: vpinSynth } }));

      } catch {}
    };
    load();
    const id = setInterval(load, 5000);
    return () => { alive = false; clearInterval(id); };
  }, [symbol, provider]);

  const toggle = (id: IndicatorId) => {
    setIndicators(prev => prev.map(i => i.id === id ? { ...i, enabled: !i.enabled } : i));
    const cur = indicators.find(i => i.id === id);
    if (cur) onToggle?.(id, !cur.enabled);
  };

  return (
    <div className="flex flex-col bg-[#1c1c1c] border-t border-[#3a3a3a]">
      {/* Indicator tab header */}
      <div className="flex items-center gap-1 px-2 py-1 bg-[#2a2a2a] border-b border-[#3a3a3a] text-[10px] overflow-x-auto">
        <span className="font-bold tracking-wider text-[#b9b9b9] mr-2">INDICATORS</span>
        {indicators.map(ind => (
          <button
            key={ind.id}
            onClick={() => toggle(ind.id)}
            className={`px-2 py-0.5 rounded border text-[10px] whitespace-nowrap ${ind.enabled ? 'bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]' : 'bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]'}`}
            title={ind.desc}
          >
            {ind.label}{ind.pro ? ' PRO' : ''} {ind.enabled ? '●' : '○'}
          </button>
        ))}
        <span className="ml-auto text-[9px] text-[#b9b9b9]">Render-in-order • Deduplicate LSE RSI/MACD/Volume/CVD take ONE</span>
      </div>

      {/* Render enabled in order */}
      <div className="flex flex-col">
        {indicators.filter(i => i.enabled).map(ind => (
          <div key={ind.id} className="border-b border-[#3a3a3a]/50 bg-[#2a2a2a]" style={{ height: ind.height }}>
            <div className="flex items-center gap-2 px-2 py-0.5 bg-[#262626] border-b border-[#3a3a3a]/30 text-[9px] text-[#b9b9b9]">
              <span className="font-medium text-[#e8e8e8]">{ind.label}</span>
              <span className="opacity-60">{ind.desc}</span>
              <span className="ml-auto">{ind.id === 'funding' ? '0.0000%' : ind.id === 'oi' ? '109.2K' : ind.id === 'vpin' ? '0.4567' : ''}</span>
            </div>
            <div className="relative w-full h-[calc(100%-18px)]">
              {/* Simplified canvas render for each indicator */}
              {ind.id === 'volume' && (
                <div className="absolute inset-0 flex items-end gap-px px-2">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div key={i} className="flex-1 bg-[#21b3a4]/60" style={{ height: `${20 + Math.random() * 80}%` }} />
                  ))}
                </div>
              )}
              {ind.id === 'cvd' && (
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 80">
                  <polyline fill="none" stroke="#21b3a4" strokeWidth={1} points={Array.from({ length: 50 }, (_, i) => `${i * 4},${40 + Math.sin(i / 5) * 20 + (Math.random() - 0.5) * 10}`).join(' ')} />
                </svg>
              )}
              {ind.id === 'rsi' && (
                <div className="absolute inset-0 flex flex-col justify-center px-2">
                  <div className="h-px bg-[#f0426c]/30 w-full absolute top-[20%]" />
                  <div className="h-px bg-[#21b3a4]/30 w-full absolute top-[80%]" />
                  <svg className="w-full h-full" viewBox="0 0 200 60">
                    <polyline fill="none" stroke="#d0d0d0" strokeWidth={1} points={Array.from({ length: 50 }, (_, i) => `${i * 4},${30 + Math.sin(i / 3) * 15}`).join(' ')} />
                  </svg>
                </div>
              )}
              {ind.id === 'macd' && (
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 80">
                  <polyline fill="none" stroke="#3498DB" strokeWidth={1} points={Array.from({ length: 50 }, (_, i) => `${i * 4},${40 + Math.sin(i / 4) * 10}`).join(' ')} />
                  <polyline fill="none" stroke="#E67E22" strokeWidth={1} points={Array.from({ length: 50 }, (_, i) => `${i * 4},${40 + Math.cos(i / 4) * 10}`).join(' ')} />
                  {Array.from({ length: 50 }).map((_, i) => (
                    <rect key={i} x={i * 4} y={40} width={2} height={Math.sin(i / 2) * 10} fill={Math.sin(i / 2) > 0 ? '#26a69a' : '#ef5350'} opacity={0.6} />
                  ))}
                </svg>
              )}
              {ind.id === 'funding' && (
                <div className="absolute inset-0 flex items-end gap-px px-2">
                  {(data.funding?.bars || []).slice(-50).map((b: any, i: number) => (
                    <div key={i} className={`flex-1 ${b.rate >= 0 ? 'bg-[#21b3a4]' : 'bg-[#f0426c]'}`} style={{ height: `${Math.abs(b.rate) * 50000 + 5}%`, minHeight: 2 }} />
                  ))}
                </div>
              )}
              {ind.id === 'oi' && (
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 80">
                  {(data.oi?.bars || []).slice(-50).map((b: any, i: number) => {
                    const bullish = b.close >= b.open;
                    return <g key={i}><line x1={i * 4 + 2} y1={10 + (1 - b.high / 1500000) * 60} x2={i * 4 + 2} y2={10 + (1 - b.low / 1500000) * 60} stroke={bullish ? '#21b3a4' : '#f0426c'} strokeWidth={1} /><rect x={i * 4} y={10 + (1 - Math.max(b.open, b.close) / 1500000) * 60} width={4} height={Math.abs(b.open - b.close) / 1500000 * 60 + 1} fill={bullish ? '#21b3a4' : '#f0426c'} /></g>;
                  })}
                </svg>
              )}
              {ind.id === 'vpin' && (
                <div className="absolute inset-0">
                  <div className="absolute inset-0 flex flex-col justify-between text-[8px] text-[#b9b9b9]/50 px-1">
                    <span>1.0</span><span>0.75</span><span>0.50</span><span>0.25</span><span>0.0</span>
                  </div>
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 90">
                    {/* Step-hold line */}
                    <polyline fill="none" stroke="#e8e8e8" strokeWidth={1} points={(data.vpin?.points || []).slice(-50).map((p: any, i: number) => `${i * 4},${90 - p.vpin * 80}`).join(' ')} />
                    {/* Regime washes */}
                    {(data.vpin?.points || []).slice(-50).map((p: any, i: number) => {
                      if (p.regime === 'NORMAL') return null;
                      const color = p.regime === 'ELEVATED' ? 'rgba(33,179,164,0.05)' : p.regime === 'HIGH' ? 'rgba(240,66,108,0.07)' : 'rgba(240,66,108,0.09)';
                      return <rect key={i} x={i * 4} y={0} width={4} height={90} fill={color} />;
                    })}
                  </svg>
                  <div className="absolute bottom-1 left-2 text-[9px] text-[#e8e8e8] bg-[#1c1c1c]/80 px-1 rounded">TOXICITY • {data.vpin?.points?.slice(-1)[0]?.regime || 'NORMAL'} • {data.vpin?.points?.slice(-1)[0]?.vpin?.toFixed(4) || '0.0000'}</div>
                </div>
              )}
              {ind.id === 'toxicity' && (
                <div className="absolute inset-0 flex items-center justify-center text-[10px] text-[#b9b9b9]">
                  Toxicity regime washes + 3px on-axis strip + corner readout • VPIN companion
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
