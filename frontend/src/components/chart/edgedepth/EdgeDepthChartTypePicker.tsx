// EdgeDepthChartTypePicker.tsx — exact EdgeDepth chart type 8 options
// Port of ChartType enum in chart_widget.h: Candles, FP Cluster, FP Profile, Heikin Ashi, Line, TPO, Renko, Flow Positioning
// Chrome zinc #2a2a2a/#3a3a3a #e8e8e8/#b9b9b9

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

const TYPES: { id: ChartTypeED; label: string; desc: string }[] = [
  { id: 'candles', label: 'Candles', desc: 'OHLC candles' },
  { id: 'fp_cluster', label: 'Footprint Cluster', desc: 'Bid/ask volume per price' },
  { id: 'fp_profile', label: 'Footprint Profile', desc: 'Delta profile per candle' },
  { id: 'heikin_ashi', label: 'Heikin Ashi', desc: 'Smoothed trend candles' },
  { id: 'line', label: 'Line', desc: 'Close price line + live dot' },
  { id: 'tpo', label: 'TPO', desc: 'Time Price Opportunity 30m blocks' },
  { id: 'renko', label: 'Renko', desc: 'Brick size in ticks, price-driven' },
  { id: 'flow_positioning', label: 'Flow & Positioning', desc: 'Analytics flow' },
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
        className="flex items-center gap-1 px-2 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8] hover:bg-[#343434]"
      >
        <span className="font-medium">{cur.label}</span>
        <span className="text-[8px] opacity-60">▾</span>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-30 w-[200px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl py-1">
          {TYPES.map(t => (
            <button
              key={t.id}
              onClick={() => { onChange(t.id); setOpen(false); }}
              className={`w-full text-left px-3 py-1.5 text-[11px] flex flex-col hover:bg-[#343434] ${value === t.id ? 'bg-[#343434] text-[#e8e8e8]' : 'text-[#b9b9b9]'}`}
            >
              <span className="font-medium">{t.label}</span>
              <span className="text-[9px] opacity-60">{t.desc}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
