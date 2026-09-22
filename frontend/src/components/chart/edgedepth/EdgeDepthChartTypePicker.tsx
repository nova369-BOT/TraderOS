// Professional Chart Type Picker — own design, not EdgeDepth clone
// Clean zinc UI #1c1c1c/#2a2a2a/#262626/#3a3a3a #e8e8e8/#b9b9b9
// 8 types: Candles, Footprint Cluster, Footprint Profile, Heikin Ashi, Line, TPO, Renko, Flow & Positioning

import React, { useState, useRef, useEffect } from 'react';

export type ChartTypeED =
  | 'candles'
  | 'fp_cluster'
  | 'fp_profile'
  | 'heikin_ashi'
  | 'line'
  | 'tpo'
  | 'renko'
  | 'flow_positioning';

const TYPES: { id: ChartTypeED; label: string; desc: string; icon: string }[] = [
  { id: 'candles', label: 'Candles', desc: 'OHLC candles', icon: '◧' },
  { id: 'fp_cluster', label: 'Cluster', desc: 'Bid/ask volume per price', icon: '▦' },
  { id: 'fp_profile', label: 'Profile', desc: 'Delta profile per candle', icon: '◫' },
  { id: 'heikin_ashi', label: 'Heikin Ashi', desc: 'Smoothed trend', icon: '⬓' },
  { id: 'line', label: 'Line', desc: 'Close price line', icon: '╱' },
  { id: 'tpo', label: 'TPO', desc: 'Time Price Opportunity', icon: '☰' },
  { id: 'renko', label: 'Renko', desc: 'Price-driven bricks', icon: '▭' },
  { id: 'flow_positioning', label: 'Flow', desc: 'Flow & Positioning', icon: '⇄' },
];

export function EdgeDepthChartTypePicker({
  value,
  onChange,
}: {
  value: ChartTypeED;
  onChange: (t: ChartTypeED) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const cur = TYPES.find(t => t.id === value) || TYPES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#3a3a3a] bg-[#262626] text-[12px] font-medium text-[#e8e8e8] hover:bg-[#343434] hover:border-[#4a4a4a] transition-colors"
      >
        <span className="text-[12px] opacity-70">{cur.icon}</span>
        <span>{cur.label}</span>
        <span className="text-[10px] opacity-50 ml-1">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 z-40 w-[260px] rounded-lg border border-[#3a3a3a] bg-[#1c1c1c] shadow-2xl overflow-hidden">
          <div className="px-3 py-2 border-b border-[#2a2a2a] bg-[#222222]">
            <span className="text-[10px] font-semibold tracking-wider text-[#b9b9b9]">CHART TYPE</span>
          </div>
          <div className="p-2 grid grid-cols-1 gap-1 max-h-[320px] overflow-auto">
            {TYPES.map(t => (
              <button
                key={t.id}
                onClick={() => { onChange(t.id); setOpen(false); }}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                  value === t.id ? 'bg-[#e8e8e8] text-[#1c1c1c]' : 'bg-[#262626] border border-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8] hover:border-[#3a3a3a]'
                }`}
              >
                <span className="text-[14px] w-5 text-center">{t.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium leading-tight">{t.label}</div>
                  <div className={`text-[10px] leading-tight mt-0.5 ${value === t.id ? 'text-[#1c1c1c]/70' : 'text-[#6a6a6a]'}`}>{t.desc}</div>
                </div>
                {value === t.id && <span className="text-[10px]">●</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EdgeDepthChartTypePicker;
