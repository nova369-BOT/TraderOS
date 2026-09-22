// Professional Widget Menu — own design, not EdgeDepth clone
// Clean zinc UI, 10 items: Chart, DOM, Tape, Depth Heatmap, EdgeDepth Heatmap, Footprint, VPVR, TPO, Liquidations, Watchlist

import React, { useState, useRef, useEffect } from 'react';

const WIDGETS = [
  { id: 'chart', label: 'Chart', desc: 'Candles + indicators', icon: '◧' },
  { id: 'dom', label: 'DOM', desc: 'Depth ladder with delta', icon: '☰' },
  { id: 'tape', label: 'Tape', desc: 'Time & sales', icon: '≡' },
  { id: 'depth', label: 'Depth Heat', desc: 'Orderbook heatmap', icon: '▤' },
  { id: 'edgedepth', label: 'EdgeDepth', desc: 'GPU heatmap 8192×1024', icon: '◫' },
  { id: 'footprint', label: 'Footprint', desc: 'Cluster & profile', icon: '▦' },
  { id: 'vpvr', label: 'VPVR', desc: 'Volume profile POC/VAH/VAL', icon: '◨' },
  { id: 'tpo', label: 'TPO', desc: 'Time price opportunity', icon: '◰' },
  { id: 'liquidations', label: 'Liquidations', desc: 'Liquidation heatmap', icon: '⚡' },
  { id: 'watchlist', label: 'Watchlist', desc: '1503 pairs', icon: '☆' },
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
      <button onClick={() => setOpen(v => !v)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#3a3a3a] bg-[#262626] text-[12px] font-medium text-[#e8e8e8] hover:bg-[#343434] hover:border-[#4a4a4a] transition-colors">
        <span className="text-[14px]">+</span> Widget <span className="text-[10px] opacity-50 ml-1">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 z-40 w-[280px] rounded-lg border border-[#3a3a3a] bg-[#1c1c1c] shadow-2xl overflow-hidden">
          <div className="px-3 py-2 border-b border-[#2a2a2a] bg-[#222222] flex items-center justify-between">
            <span className="text-[10px] font-semibold tracking-wider text-[#b9b9b9]">ADD WIDGET</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#2a2a2a] border border-[#3a3a3a] text-[#6a6a6a]">{WIDGETS.length} items</span>
          </div>
          <div className="p-2 grid gap-1 max-h-[380px] overflow-auto">
            {WIDGETS.map(w => (
              <button key={w.id} onClick={() => { onSelect(w.id); setOpen(false); }} className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-[#262626] border border-transparent text-left hover:bg-[#343434] hover:border-[#3a3a3a] hover:text-[#e8e8e8] text-[#b9b9b9] transition-colors">
                <span className="text-[16px] w-6 text-center opacity-80">{w.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium text-[#e8e8e8]">{w.label}</div>
                  <div className="text-[10px] text-[#6a6a6a] mt-0.5 leading-tight">{w.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EdgeDepthWidgetMenu;
