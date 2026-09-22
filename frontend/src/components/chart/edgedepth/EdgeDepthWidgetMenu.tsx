// EdgeDepthWidgetMenu.tsx — +Widget 10 items exact EdgeDepth
// Chrome zinc #1c1c1c/#2a2a2a/#3a3a3a #e8e8e8/#b9b9b9

import React, { useState, useRef, useEffect } from 'react';

const WIDGETS = [
  { id: 'chart', label: 'Chart', desc: 'Candles + indicators' },
  { id: 'dom', label: 'DOM', desc: 'Depth ladder BUYS/BIDS/PRICE/ASKS/SELLS/DELTA' },
  { id: 'tape', label: 'Time & Sales', desc: 'PRICE QTY TIME' },
  { id: 'depth', label: 'Depth Heatmap', desc: 'Orderbook heatmap' },
  { id: 'edgedepth', label: 'EdgeDepth Heatmap', desc: 'GPU 8192x1024' },
  { id: 'footprint', label: 'Footprint', desc: 'Cluster/profile' },
  { id: 'vpvr', label: 'VPVR', desc: 'Volume Profile POC/VAH/VAL' },
  { id: 'tpo', label: 'TPO', desc: 'Time Price Opportunity 30m' },
  { id: 'cvd', label: 'CVD', desc: 'Cumulative Volume Delta' },
  { id: 'liquidations', label: 'Liquidations', desc: 'Liq heatmap Ember/Viridis/Magma/Inferno' },
  { id: 'watchlist', label: 'Watchlist', desc: '1503 pairs categories/venues/sparkline' },
  { id: 'indicators', label: 'Indicators', desc: 'Volume CVD RSI MACD Funding OI VPIN' },
];

export function EdgeDepthWidgetMenu({ onSelect }: { onSelect: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(v => !v)} className="px-2 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8] hover:bg-[#343434]">+Widget ▾</button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-30 w-[240px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl py-1">
          <div className="px-2 py-1 text-[9px] text-[#b9b9b9] uppercase tracking-wider">Add widget — 10+ items</div>
          {WIDGETS.map(w => (
            <button key={w.id} onClick={() => { onSelect(w.id); setOpen(false); }} className="w-full text-left px-3 py-1.5 hover:bg-[#343434] flex flex-col">
              <span className="text-[11px] text-[#e8e8e8] font-medium">{w.label}</span>
              <span className="text-[9px] text-[#b9b9b9]/60">{w.desc}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
