// Professional Layers Panel — own design, not EdgeDepth clone
// Clean zinc UI, 9 layers, toggles functional

import React, { useState } from 'react';

export type LayerId = 'liquidations' | 'exposure_v2' | 'hyperliquid_levels' | 'market_structure' | 'vpvr' | 'leverage_tiers' | 'session_vwap' | 'prev_day' | 'prev_week';
export interface Layer { id: LayerId; label: string; enabled: boolean; desc: string }

export const DEFAULT_LAYERS: Layer[] = [
  { id: 'liquidations', label: 'Liquidations', enabled: true, desc: 'Liquidation heatmap 800 bands' },
  { id: 'exposure_v2', label: 'Exposure V2', enabled: true, desc: 'Exposure field V2' },
  { id: 'hyperliquid_levels', label: 'Hyperliquid Levels', enabled: true, desc: 'HL levels' },
  { id: 'market_structure', label: 'Market Structure', enabled: true, desc: 'BOS/CHoCH' },
  { id: 'vpvr', label: 'VPVR', enabled: false, desc: 'Volume Profile POC/VAH/VAL' },
  { id: 'leverage_tiers', label: 'Leverage Tiers', enabled: false, desc: '2x/5x/10x/25x/50x' },
  { id: 'session_vwap', label: 'Session VWAP', enabled: false, desc: 'HLC3 weighted' },
  { id: 'prev_day', label: 'Prev Day HL/C', enabled: false, desc: 'Previous day levels' },
  { id: 'prev_week', label: 'Prev Week HL/C', enabled: false, desc: 'Previous week levels' },
];

export function EdgeDepthLayers({ layers: controlledLayers, onChange }: { layers?: Layer[]; onChange?: (layers: Layer[]) => void }) {
  const [internal, setInternal] = useState<Layer[]>(DEFAULT_LAYERS);
  const layers = controlledLayers ?? internal;

  const toggle = (id: string) => {
    const next = layers.map(l => l.id === id ? { ...l, enabled: !l.enabled } : l);
    if (!controlledLayers) setInternal(next);
    onChange?.(next);
  };

  const onCount = layers.filter(l => l.enabled).length;

  return (
    <div className="w-[300px] rounded-xl border border-[#3a3a3a] bg-[#1c1c1c] shadow-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-[#2a2a2a] bg-[#222222] flex justify-between items-center">
        <span className="font-semibold tracking-wider text-[11px] text-[#e8e8e8]">LAYERS</span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9]">{onCount} active</span>
      </div>
      <div className="p-2 space-y-1 max-h-[380px] overflow-auto">
        {layers.map(l => (
          <button key={l.id} onClick={() => toggle(l.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-colors ${l.enabled ? 'bg-[#262626] border-[#3a3a3a] text-[#e8e8e8]' : 'bg-transparent border-transparent text-[#6a6a6a] hover:bg-[#262626] hover:border-[#2a2a2a] hover:text-[#b9b9b9]'}`}>
            <span className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors ${l.enabled ? 'bg-[#21b3a4] justify-end' : 'bg-[#3a3a3a] justify-start'}`}>
              <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-medium leading-tight">{l.label}</div>
              <div className="text-[10px] text-[#6a6a6a] leading-tight mt-0.5 truncate">{l.desc}</div>
            </div>
          </button>
        ))}
      </div>
      <div className="px-4 py-2 border-t border-[#2a2a2a] bg-[#222222] text-[10px] text-[#6a6a6a]">Toggle layers to overlay on chart • VPVR, VWAP, pivots wired to indicators</div>
    </div>
  );
}

export default EdgeDepthLayers;
