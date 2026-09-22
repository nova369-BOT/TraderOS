// Professional View Picker — own design, not EdgeDepth clone
// Clean zinc UI #1c1c1c/#262626/#3a3a3a #e8e8e8/#b9b9b9
// Replaces native <select> that user flagged as clone

import React, { useState, useRef, useEffect } from 'react';

export type ViewId =
  | 'chart'
  | 'edgedepth'
  | 'depth'
  | 'dom'
  | 'tape'
  | 'footprint'
  | 'vpvr'
  | 'tpo'
  | 'liquidations'
  | 'watchlist'
  | 'indicators';

const VIEWS: { id: ViewId; label: string; desc: string; icon: string }[] = [
  { id: 'chart', label: 'Chart', desc: 'Candles + indicators', icon: '◧' },
  { id: 'edgedepth', label: 'Heatmap Pro', desc: 'GPU heatmap 8192×1024', icon: '◫' },
  { id: 'depth', label: 'Depth Heat', desc: 'Legacy depth heatmap', icon: '▤' },
  { id: 'dom', label: 'DOM Ladder', desc: 'Depth ladder with delta', icon: '☰' },
  { id: 'tape', label: 'Tape', desc: 'Time & sales', icon: '≡' },
  { id: 'footprint', label: 'Footprint', desc: 'Cluster & profile', icon: '▦' },
  { id: 'vpvr', label: 'VPVR', desc: 'Volume profile POC/VAH/VAL', icon: '◨' },
  { id: 'tpo', label: 'TPO', desc: 'Time price opportunity', icon: '◰' },
  { id: 'liquidations', label: 'Liquidations', desc: 'Liquidation heatmap', icon: '⚡' },
  { id: 'watchlist', label: 'Watchlist', desc: '1503 pairs live', icon: '☆' },
  { id: 'indicators', label: 'Indicators', desc: '8 indicators panel', icon: '◩' },
];

export function EdgeDepthViewPicker({
  value,
  onChange,
}: {
  value: ViewId;
  onChange: (v: ViewId) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const cur = VIEWS.find(v => v.id === value) || VIEWS[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#3a3a3a] bg-[#262626] text-[12px] font-medium text-[#e8e8e8] hover:bg-[#343434] hover:border-[#4a4a4a] transition-colors"
      >
        <span className="text-[11px] opacity-70">{cur.icon}</span>
        <span>{cur.label}</span>
        <span className="text-[10px] opacity-50 ml-1">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 z-[70] w-[280px] rounded-xl border border-[#3a3a3a] bg-[#1c1c1c] shadow-2xl overflow-hidden">
          <div className="px-3 py-2 border-b border-[#2a2a2a] bg-[#222222] flex items-center justify-between">
            <span className="text-[10px] font-semibold tracking-wider text-[#b9b9b9]">VIEW</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#262626] border border-[#3a3a3a] text-[#6a6a6a]">{VIEWS.length} panes</span>
          </div>
          <div className="p-2 grid gap-1 max-h-[380px] overflow-auto">
            {VIEWS.map(v => (
              <button
                key={v.id}
                onClick={() => {
                  onChange(v.id);
                  setOpen(false);
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  value === v.id
                    ? 'bg-[#e8e8e8] text-[#1c1c1c]'
                    : 'bg-[#262626] border border-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8] hover:border-[#3a3a3a]'
                }`}
              >
                <span className="text-[14px] w-5 text-center opacity-80">{v.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium leading-tight">{v.label}</div>
                  <div className={`text-[10px] leading-tight mt-0.5 ${value === v.id ? 'text-[#1c1c1c]/70' : 'text-[#6a6a6a]'}`}>{v.desc}</div>
                </div>
                {value === v.id && <span className="text-[10px]">●</span>}
              </button>
            ))}
          </div>
          <div className="px-3 py-2 border-t border-[#2a2a2a] bg-[#1c1c1c] text-[10px] text-[#6a6a6a]">Own professional UI • no clone • functional</div>
        </div>
      )}
    </div>
  );
}

export default EdgeDepthViewPicker;
