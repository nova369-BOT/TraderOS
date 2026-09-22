// EdgeDepthLayers.tsx — exact EdgeDepth layers: 4 ON with liquidations/Exposure V2/Hyperliquid levels/Market structure/VPVR/leverage tiers
// Chrome zinc #1c1c1c/#2a2a2a/#3a3a3a #e8e8e8/#b9b9b9

import React, { useState } from 'react';

interface Layer { id: string; label: string; enabled: boolean; desc: string }

const DEFAULT_LAYERS: Layer[] = [
  { id: 'liquidations', label: 'Liquidations', enabled: true, desc: 'Liquidation heatmap 800 bands 0.05%' },
  { id: 'exposure_v2', label: 'Exposure V2', enabled: true, desc: 'Exposure field V2' },
  { id: 'hyperliquid_levels', label: 'Hyperliquid Levels', enabled: true, desc: 'HL levels' },
  { id: 'market_structure', label: 'Market Structure', enabled: true, desc: 'MS with BOS/CHoCH' },
  { id: 'vpvr', label: 'VPVR', enabled: false, desc: 'Volume Profile Visible Range POC/VAH/VAL' },
  { id: 'leverage_tiers', label: 'Leverage Tiers', enabled: false, desc: 'Leverage tiers 2x/5x/10x/25x/50x' },
  { id: 'session_vwap', label: 'Session VWAP', enabled: false, desc: 'HLC3 weighted by base volume' },
  { id: 'prev_day', label: 'Prev Day High/Low/Close', enabled: false, desc: 'Previous day levels' },
  { id: 'prev_week', label: 'Prev Week High/Low/Close', enabled: false, desc: 'Previous week levels' },
];

export function EdgeDepthLayers({ onChange }: { onChange?: (layers: Layer[]) => void }) {
  const [layers, setLayers] = useState<Layer[]>([
    { id: 'liquidations', label: 'Liquidations', enabled: true, desc: 'Liquidation heatmap 800 bands 0.05%' },
    { id: 'exposure_v2', label: 'Exposure V2', enabled: true, desc: 'Exposure field V2' },
    { id: 'hyperliquid_levels', label: 'Hyperliquid Levels', enabled: true, desc: 'HL levels' },
    { id: 'market_structure', label: 'Market Structure', enabled: true, desc: 'MS with BOS/CHoCH' },
    { id: 'vpvr', label: 'VPVR', enabled: false, desc: 'Volume Profile Visible Range POC/VAH/VAL' },
    { id: 'leverage_tiers', label: 'Leverage Tiers', enabled: false, desc: 'Leverage tiers 2x/5x/10x/25x/50x' },
    { id: 'session_vwap', label: 'Session VWAP', enabled: false, desc: 'HLC3 weighted by base volume' },
    { id: 'prev_day', label: 'Prev Day High/Low/Close', enabled: false, desc: 'Previous day levels' },
    { id: 'prev_week', label: 'Prev Week High/Low/Close', enabled: false, desc: 'Previous week levels' },
  ]);

  const toggle = (id: string) => {
    const next = layers.map(l => l.id === id ? { ...l, enabled: !l.enabled } : l);
    setLayers(next);
    onChange?.(next);
  };

  return (
    <div className="w-[260px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl text-[11px]">
      <div className="px-3 py-2 border-b border-[#3a3a3a] flex justify-between items-center">
        <span className="font-bold tracking-wider text-[10px] text-[#b9b9b9]">LAYERS — 4 ON</span>
        <span className="text-[9px] text-[#b9b9b9]">{layers.filter(l => l.enabled).length} ON</span>
      </div>
      <div className="p-2 space-y-1">
        {layers.map(l => (
          <label key={l.id} className="flex items-center gap-2 px-2 py-1 hover:bg-[#343434] rounded cursor-pointer">
            <input type="checkbox" checked={l.enabled} onChange={() => toggle(l.id)} className="accent-[#d0d0d0]" />
            <span className={`text-[11px] ${l.enabled?'text-[#e8e8e8]':'text-[#b9b9b9]'}`}>{l.label}</span>
            <span className="ml-auto text-[8px] text-[#b9b9b9]/60 truncate max-w-[100px]">{l.desc}</span>
          </label>
        ))}
      </div>
      <div className="px-3 py-2 border-t border-[#3a3a3a] text-[9px] text-[#b9b9b9]/60">
        Layers: liquidations/Exposure V2/Hyperliquid levels/Market structure/VPVR/leverage tiers — exact EdgeDepth
      </div>
    </div>
  );
}
