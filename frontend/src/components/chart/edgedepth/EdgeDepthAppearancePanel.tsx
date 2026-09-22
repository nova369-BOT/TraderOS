// Professional Appearance Panel — own design, not EdgeDepth clone
// Clean zinc UI, market colors, accent, colormaps, opacity, intensity, etc

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
  opacity: number;
  intensity: number;
  gamma: number;
  lowPeak: { low: number; peak: number };
  noiseFloor: number;
  tickPerRow: number;
  halfLife: number;
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
    <div className="w-[360px] rounded-xl border border-[#3a3a3a] bg-[#1c1c1c] shadow-2xl overflow-hidden">
      <div className="flex justify-between items-center px-4 py-3 border-b border-[#2a2a2a] bg-[#222222]">
        <span className="font-semibold tracking-wider text-[11px] text-[#e8e8e8]">APPEARANCE</span>
        {onClose && <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-md bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] hover:text-[#e8e8e8] hover:bg-[#343434]">×</button>}
      </div>
      <div className="p-4 space-y-5 max-h-[70vh] overflow-auto scrollbar-thin">
        <div>
          <div className="text-[10px] font-semibold tracking-wider text-[#b9b9b9] mb-2">MARKET COLORS</div>
          <div className="grid grid-cols-2 gap-2">
            {(['teal_rose', 'green_red'] as MarketColors[]).map(c => (
              <button key={c} onClick={() => upd({ marketColors: c })}
                className={`p-2.5 rounded-lg border text-left transition-colors ${settings.marketColors===c?'bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]':'bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]'}`}>
                <div className="text-[12px] font-medium">{c === 'teal_rose' ? 'Teal / Rose' : 'Green / Red'}</div>
                <div className="text-[10px] opacity-60 mt-0.5">{c === 'teal_rose' ? '#21b3a4 / #f0426c' : '#26a69a / #ef5350'}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] font-semibold tracking-wider text-[#b9b9b9] mb-2">INTERFACE ACCENT</div>
          <div className="grid grid-cols-4 gap-1.5">
            {(['neutral', 'mint', 'indigo', 'amber'] as InterfaceAccent[]).map(a => (
              <button key={a} onClick={() => upd({ accent: a })}
                className={`py-2 rounded-lg border text-[11px] font-medium capitalize transition-colors ${settings.accent===a?'bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]':'bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434]'}`}>
                {a}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] font-semibold tracking-wider text-[#b9b9b9] mb-2">HEATMAP COLORMAP</div>
          <div className="space-y-3">
            <div>
              <div className="text-[10px] text-[#6a6a6a] mb-1.5">Liquidation</div>
              <div className="grid grid-cols-4 gap-1.5">
                {(['ember', 'inferno', 'viridis', 'magma'] as LiqColormap[]).map(cm => (
                  <button key={cm} onClick={() => upd({ liqColormap: cm })}
                    className={`py-2 rounded-lg border text-[11px] font-medium capitalize transition-colors ${settings.liqColormap===cm?'bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]':'bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434]'}`}>
                    {cm}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#6a6a6a] mb-1.5">Orderbook</div>
              <div className="grid grid-cols-3 gap-1.5">
                {(['orderbook', 'deepdom', 'bookmap'] as ObColormap[]).map(cm => (
                  <button key={cm} onClick={() => upd({ obColormap: cm })}
                    className={`py-2 rounded-lg border text-[10px] font-medium capitalize transition-colors ${settings.obColormap===cm?'bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]':'bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434]'}`}>
                    {cm}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-[11px] text-[#b9b9b9]">Opacity <span className="text-[#e8e8e8] font-medium">{Math.round(settings.opacity*100)}%</span></span>
            <input type="range" min={0.1} max={1} step={0.05} value={settings.opacity} onChange={e => upd({ opacity: parseFloat(e.target.value) })} className="accent-[#e8e8e8]" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[11px] text-[#b9b9b9]">Intensity <span className="text-[#e8e8e8] font-medium">{settings.intensity.toFixed(2)}</span></span>
            <input type="range" min={0.1} max={3} step={0.1} value={settings.intensity} onChange={e => upd({ intensity: parseFloat(e.target.value) })} className="accent-[#e8e8e8]" />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-[11px] text-[#b9b9b9]">Gamma <span className="text-[#e8e8e8] font-medium">{settings.gamma.toFixed(2)}</span></span>
            <input type="range" min={0.5} max={2.5} step={0.1} value={settings.gamma} onChange={e => upd({ gamma: parseFloat(e.target.value) })} className="accent-[#e8e8e8]" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[11px] text-[#b9b9b9]">Tick ×<span className="text-[#e8e8e8] font-medium">{settings.tickPerRow}</span></span>
            <input type="range" min={1} max={8} step={1} value={settings.tickPerRow} onChange={e => upd({ tickPerRow: parseInt(e.target.value) })} className="accent-[#e8e8e8]" />
          </label>
        </div>

        <div className="flex gap-4 pt-2 border-t border-[#2a2a2a]">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={settings.linearFilter} onChange={e => upd({ linearFilter: e.target.checked })} className="accent-[#e8e8e8]" />
            <span className="text-[11px] text-[#b9b9b9]">Smooth</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={settings.reachModulation} onChange={e => upd({ reachModulation: e.target.checked })} className="accent-[#e8e8e8]" />
            <span className="text-[11px] text-[#b9b9b9]">Reach cone</span>
          </label>
        </div>

        <div className="pt-3 border-t border-[#2a2a2a] space-y-1 text-[10px] text-[#6a6a6a] leading-relaxed">
          <div>• GPU 8192×1024 • Teal #21b3a4 Rose #f0426c • Zinc chrome #1c1c1c/#2a2a2a/#3a3a3a</div>
          <div>• Ember/Viridis/Magma/Inferno colormaps • Shift+wheel price zoom • Drag pan • Dblclick recenter</div>
        </div>
      </div>
    </div>
  );
}

export const defaultAppearance: AppearanceSettings = DEFAULT;

export default EdgeDepthAppearancePanel;
