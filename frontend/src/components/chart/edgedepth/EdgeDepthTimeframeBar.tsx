// EdgeDepthTimeframeBar.tsx — exact EdgeDepth TF segmented control
// SECONDS PRO locked 1s/5s/15s/30s, MINUTES 1m/3m/5m/15m/30m, HOURS 1h/2h/4h/6h/12h, DAYS 1D/1W
// FAVOURITES 6/6 FULL BAR, Custom Add, CLICK SETS RIGHT-CLICK PINS MAX 6
// Chrome zinc #2a2a2a/#3a3a3a #e8e8e8/#b9b9b9 #f0426c for PRO

import React, { useState, useEffect } from 'react';

export interface TF { label: string; ms: number; sec: number; pro?: boolean }

export const ALL_TF: TF[] = [
  { label: '1s', ms: 1000, sec: 1, pro: true },
  { label: '5s', ms: 5000, sec: 5, pro: true },
  { label: '15s', ms: 15000, sec: 15, pro: true },
  { label: '30s', ms: 30000, sec: 30, pro: true },
  { label: '1m', ms: 60000, sec: 60 },
  { label: '3m', ms: 180000, sec: 180 },
  { label: '5m', ms: 300000, sec: 300 },
  { label: '15m', ms: 900000, sec: 900 },
  { label: '30m', ms: 1800000, sec: 1800 },
  { label: '1h', ms: 3600000, sec: 3600 },
  { label: '2h', ms: 7200000, sec: 7200 },
  { label: '4h', ms: 14400000, sec: 14400 },
  { label: '6h', ms: 21600000, sec: 21600 },
  { label: '12h', ms: 43200000, sec: 43200 },
  { label: '1D', ms: 86400000, sec: 86400 },
  { label: '1W', ms: 604800000, sec: 604800 },
];

export function EdgeDepthTimeframeBar({
  value,
  onChange,
  favs,
  onToggleFav,
}: {
  value: TF;
  onChange: (t: TF) => void;
  favs: Set<string>;
  onToggleFav: (label: string) => void;
}) {
  const [customOpen, setCustomOpen] = useState(false);
  const [customVal, setCustomVal] = useState('2m');

  const favList = ALL_TF.filter(t => favs.has(t.label));
  const nonFav = ALL_TF.filter(t => !favs.has(t.label));

  const parseCustom = (s: string): TF | null => {
    const m = s.match(/^(\d+)(s|m|h|D|W)$/);
    if (!m) return null;
    const n = parseInt(m[1]);
    const unit = m[2];
    let ms = 0;
    if (unit === 's') ms = n * 1000;
    else if (unit === 'm') ms = n * 60000;
    else if (unit === 'h') ms = n * 3600000;
    else if (unit === 'D') ms = n * 86400000;
    else if (unit === 'W') ms = n * 604800000;
    if (ms < 1000 || ms > 604800000) return null;
    return { label: s, ms, sec: Math.floor(ms / 1000) };
  };

  return (
    <div className="flex items-center gap-0.5 border border-[#3a3a3a] rounded overflow-hidden bg-[#262626]">
      {/* FAV bar */}
      <div className="flex items-center gap-0">
        {favList.map(t => (
          <button
            key={t.label}
            onClick={() => onChange(t)}
            onContextMenu={e => { e.preventDefault(); onToggleFav(t.label); }}
            className={`px-1.5 py-0.5 text-[10px] border-r border-[#3a3a3a]/50 last:border-0
              ${value.label === t.label ? 'bg-[#414141] text-[#e8e8e8]' : 'text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]'}
              ${t.pro ? 'text-[#f0426c]' : ''}`}
            title={t.pro ? 'SECONDS PRO — locked' : `Right-click to unpin (fav ${favList.length}/6)`}
          >
            {t.label}{t.pro ? ' PRO' : ''}
          </button>
        ))}
        <span className="text-[8px] px-1 text-[#b9b9b9] border-l border-[#3a3a3a] ml-0.5">FAV {favList.length}/6</span>
      </div>

      {/* All TF dropdown trigger */}
      <div className="relative ml-1">
        <button
          onClick={() => setCustomOpen(v => !v)}
          className="px-1.5 py-0.5 text-[10px] text-[#b9b9b9] hover:text-[#e8e8e8] hover:bg-[#343434] border-l border-[#3a3a3a]"
        >
          ▾ {value.label}
        </button>
        {customOpen && (
          <div className="absolute top-full left-0 mt-1 z-30 w-[320px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl p-2">
            <div className="text-[9px] text-[#b9b9b9] uppercase tracking-wider mb-1">Seconds PRO locked</div>
            <div className="flex flex-wrap gap-1 mb-2">
              {ALL_TF.filter(t => t.pro).map(t => (
                <button key={t.label} onClick={() => { onChange(t); setCustomOpen(false); }} onContextMenu={e => { e.preventDefault(); onToggleFav(t.label); }}
                  className={`px-2 py-1 text-[10px] rounded border ${value.label===t.label?'bg-[#414141] text-[#e8e8e8] border-[#414141]':'bg-[#2a2a2a] text-[#f0426c] border-[#3a3a3a] hover:bg-[#343434]'}`}>
                  {t.label} PRO
                </button>
              ))}
            </div>
            <div className="text-[9px] text-[#b9b9b9] uppercase tracking-wider mb-1">Minutes</div>
            <div className="flex flex-wrap gap-1 mb-2">
              {ALL_TF.filter(t => !t.pro && t.sec < 3600).map(t => (
                <button key={t.label} onClick={() => { onChange(t); setCustomOpen(false); }} onContextMenu={e => { e.preventDefault(); onToggleFav(t.label); }}
                  className={`px-2 py-1 text-[10px] rounded border ${value.label===t.label?'bg-[#414141] text-[#e8e8e8] border-[#414141]':'bg-[#2a2a2a] text-[#b9b9b9] border-[#3a3a3a] hover:bg-[#343434] hover:text-[#e8e8e8]'}`}>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="text-[9px] text-[#b9b9b9] uppercase tracking-wider mb-1">Hours / Days</div>
            <div className="flex flex-wrap gap-1 mb-3">
              {ALL_TF.filter(t => !t.pro && t.sec >= 3600).map(t => (
                <button key={t.label} onClick={() => { onChange(t); setCustomOpen(false); }} onContextMenu={e => { e.preventDefault(); onToggleFav(t.label); }}
                  className={`px-2 py-1 text-[10px] rounded border ${value.label===t.label?'bg-[#414141] text-[#e8e8e8] border-[#414141]':'bg-[#2a2a2a] text-[#b9b9b9] border-[#3a3a3a] hover:bg-[#343434] hover:text-[#e8e8e8]'}`}>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="border-t border-[#3a3a3a] pt-2 flex items-center gap-2">
              <span className="text-[10px] text-[#b9b9b9]">Custom</span>
              <input value={customVal} onChange={e => setCustomVal(e.target.value)} placeholder="e.g. 2m"
                className="flex-1 px-2 py-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8]" />
              <button onClick={() => {
                const tf = parseCustom(customVal);
                if (tf) { onChange(tf); setCustomOpen(false); }
              }} className="px-2 py-1 bg-[#d0d0d0] text-[#1c1c1c] rounded text-[10px]">Add</button>
            </div>
            <div className="text-[8px] text-[#b9b9b9] mt-1 opacity-60">Click sets, right-click pins max 6. PRO seconds locked behind upsell.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EdgeDepthTimeframeBar;
