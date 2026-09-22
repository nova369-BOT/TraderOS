// EdgeDepthAppearancePanel.tsx — exact EdgeDepth appearance tweaks
// Market colors Teal/rose, Interface accent Neutral/Mint/Indigo/Amber, Colormap Ember/Inferno/Magma/Viridis
// Opacity Intensity Gamma Low Peak Noise floor Tick-per-row Half-life
// Chrome zinc #1c1c1c/#2a2a2a/#3a3a3a #e8e8e8/#b9b9b9

import React from 'react';

export type MarketColors = 'teal_rose' | 'green_red';
export type InterfaceAccent = 'neutral' | 'mint' | 'indigo' | 'amber';
export type LiqColormap = 'ember' | 'inferno' | 'magma' | 'viridis';
export type ObColormap = 'orderbook' | 'deepdom' | 'bookmap' | 'realtime' | 'realtime_warm';

export interface AppearanceSettings {
  marketColors: MarketColors;
  accent: InterfaceAccent;
  liqColormap: LiqColormap;
  obColormap: ObColormap;
  opacity: number; // 0-1
  intensity: number; // 0.1-3 sensitivity
  gamma: number; // 0.5-2.5 pow shaping
  lowPeak: { low: number; peak: number }; // color_low, color_peak for liquidation
  noiseFloor: number; // discard threshold
  tickPerRow: number; // bucket multiplier 1-8
  halfLife: number; // decay minutes
  linearFilter: boolean;
  reachModulation: boolean;
}

const DEFAULT: AppearanceSettings = {
  marketColors: 'teal_rose',
  accent: 'neutral',
  liqColormap: 'ember',
  obColormap: 'orderbook',
  opacity: 0.95,
  intensity: 1.0,
  gamma: 1.3,
  lowPeak: { low: 0, peak: 100000 },
  noiseFloor: 0.004,
  tickPerRow: 1,
  halfLife: 60,
  linearFilter: false,
  reachModulation: false,
};

export function EdgeDepthAppearancePanel({
  settings,
  onChange,
  onClose,
}: {
  settings: AppearanceSettings;
  onChange: (s: AppearanceSettings) => void;
  onClose?: () => void;
}) {
  const upd = (p: Partial<AppearanceSettings>) => onChange({ ...settings, ...p });

  return (
    <div className="w-[340px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl text-[11px]">
      <div className="flex justify-between items-center px-3 py-2 border-b border-[#3a3a3a]">
        <span className="font-bold tracking-wider text-[10px] text-[#b9b9b9]">APPEARANCE — ADVANCED</span>
        {onClose && <button onClick={onClose} className="text-[14px] text-[#b9b9b9] hover:text-[#e8e8e8]">×</button>}
      </div>
      <div className="p-3 space-y-3 max-h-[70vh] overflow-auto">
        {/* Market colors */}
        <div>
          <div className="text-[10px] text-[#b9b9b9] uppercase mb-1">Market colors</div>
          <div className="flex gap-1">
            {(['teal_rose', 'green_red'] as MarketColors[]).map(c => (
              <button key={c} onClick={() => upd({ marketColors: c })}
                className={`flex-1 py-1 rounded border text-[10px] capitalize ${settings.marketColors===c?'bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]':'border-[#3a3a3a] bg-[#2a2a2a] text-[#b9b9b9] hover:bg-[#343434]'}`}>
                {c === 'teal_rose' ? 'Teal / Rose #21b3a4 / #f0426c' : 'Green / Red'}
              </button>
            ))}
          </div>
        </div>
        {/* Interface accent */}
        <div>
          <div className="text-[10px] text-[#b9b9b9] uppercase mb-1">Interface accent</div>
          <div className="flex gap-1">
            {(['neutral', 'mint', 'indigo', 'amber'] as InterfaceAccent[]).map(a => (
              <button key={a} onClick={() => upd({ accent: a })}
                className={`flex-1 py-1 rounded border text-[10px] capitalize ${settings.accent===a?'bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]':'border-[#3a3a3a] bg-[#2a2a2a] text-[#b9b9b9] hover:bg-[#343434]'}`}>
                {a}
              </button>
            ))}
          </div>
        </div>
        {/* Colormap */}
        <div>
          <div className="text-[10px] text-[#b9b9b9] uppercase mb-1">Colormap — data colors exact EdgeDepth, chrome zinc</div>
          <div className="space-y-1">
            <div className="text-[9px] text-[#b9b9b9]">Liquidation</div>
            <div className="flex gap-1">
              {(['ember', 'inferno', 'viridis', 'magma'] as LiqColormap[]).map(cm => (
                <button key={cm} onClick={() => upd({ liqColormap: cm })}
                  className={`flex-1 py-1 rounded border text-[10px] capitalize ${settings.liqColormap===cm?'bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]':'border-[#3a3a3a] bg-[#2a2a2a] text-[#b9b9b9] hover:bg-[#343434]'}`}>
                  {cm}
                </button>
              ))}
            </div>
            <div className="text-[9px] text-[#b9b9b9] mt-2">Orderbook</div>
            <div className="flex gap-1">
              {(['orderbook', 'deepdom', 'bookmap', 'realtime', 'realtime_warm'] as ObColormap[]).map(cm => (
                <button key={cm} onClick={() => upd({ obColormap: cm })}
                  className={`flex-1 py-1 rounded border text-[10px] capitalize ${settings.obColormap===cm?'bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]':'border-[#3a3a3a] bg-[#2a2a2a] text-[#b9b9b9] hover:bg-[#343434]'}`}>
                  {cm}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label className="flex flex-col gap-1">
            <span className="text-[10px] text-[#b9b9b9]">Opacity {Math.round(settings.opacity*100)}%</span>
            <input type="range" min={0.1} max={1} step={0.05} value={settings.opacity} onChange={e => upd({ opacity: parseFloat(e.target.value) })} className="accent-[#d0d0d0]" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[10px] text-[#b9b9b9]">Intensity {settings.intensity.toFixed(2)}</span>
            <input type="range" min={0.1} max={3} step={0.1} value={settings.intensity} onChange={e => upd({ intensity: parseFloat(e.target.value) })} className="accent-[#d0d0d0]" />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <label className="flex flex-col gap-1">
            <span className="text-[10px] text-[#b9b9b9]">Gamma {settings.gamma.toFixed(2)}</span>
            <input type="range" min={0.5} max={2.5} step={0.1} value={settings.gamma} onChange={e => upd({ gamma: parseFloat(e.target.value) })} className="accent-[#d0d0d0]" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[10px] text-[#b9b9b9]">Noise floor {settings.noiseFloor.toFixed(3)}</span>
            <input type="range" min={0.001} max={0.1} step={0.001} value={settings.noiseFloor} onChange={e => upd({ noiseFloor: parseFloat(e.target.value) })} className="accent-[#d0d0d0]" />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <label className="flex flex-col gap-1">
            <span className="text-[10px] text-[#b9b9b9]">Low {settings.lowPeak.low}</span>
            <input type="number" value={settings.lowPeak.low} onChange={e => upd({ lowPeak: { ...settings.lowPeak, low: parseFloat(e.target.value)||0 } })} className="px-2 py-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8]" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[10px] text-[#b9b9b9]">Peak {settings.lowPeak.peak}</span>
            <input type="number" value={settings.lowPeak.peak} onChange={e => upd({ lowPeak: { ...settings.lowPeak, peak: parseFloat(e.target.value)||100000 } })} className="px-2 py-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8]" />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <label className="flex flex-col gap-1">
            <span className="text-[10px] text-[#b9b9b9]">Tick-per-row ×{settings.tickPerRow}</span>
            <input type="range" min={1} max={8} step={1} value={settings.tickPerRow} onChange={e => upd({ tickPerRow: parseInt(e.target.value) })} className="accent-[#d0d0d0]" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[10px] text-[#b9b9b9]">Half-life {settings.halfLife}m</span>
            <input type="range" min={1} max={240} step={1} value={settings.halfLife} onChange={e => upd({ halfLife: parseInt(e.target.value) })} className="accent-[#d0d0d0]" />
          </label>
        </div>
        <div className="flex gap-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={settings.linearFilter} onChange={e => upd({ linearFilter: e.target.checked })} />
            <span className="text-[10px] text-[#e8e8e8]">Linear filter (smooth cloud)</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={settings.reachModulation} onChange={e => upd({ reachModulation: e.target.checked })} />
            <span className="text-[10px] text-[#e8e8e8]">Reach modulation (cone)</span>
          </label>
        </div>

        <div className="pt-2 border-t border-[#3a3a3a] space-y-1 text-[10px] text-[#b9b9b9]">
          <div>• GPU ring 8192×1024 R32F + meta + reach — exact EdgeDepth</div>
          <div>• Market colors Teal #21b3a4 Rose #f0426c, accent Neutral #d0d0d0</div>
          <div>• Colormap Ember/Inferno/Magma/Viridis exact stops, discard 0.07/0.004</div>
        </div>
      </div>
    </div>
  );
}

export const defaultAppearance: AppearanceSettings = DEFAULT;

export default EdgeDepthAppearancePanel;
