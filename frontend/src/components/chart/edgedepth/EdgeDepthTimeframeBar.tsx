// EdgeDepthTimeframeBar.tsx — exact EdgeDepth TF bar from screenshot, dropdown version
// Top: 1m 5m 15m 1h 4h 1D ▲ with Real-time toggle — CLICK DROPS PANEL
// Panel: TIMEFRAME FAVOURITES 6/6 FULL BAR, SECONDS PRO 1s 5s 15s 30s, MINUTES 1m 3m 5m 15m 30m with stars, HOURS 1h 2h 4h 6h 12h, DAYS 1D 1W, CLICK SETS RIGHT-CLICK PINS MAX 6, Custom e.g. 7m 90s 3h Add
// Chrome zinc #1c1c1c/#2a2a2a/#3a3a3a #e8e8e8/#b9b9b9 #21b3a4/#f0426c

import React, { useState, useRef, useEffect } from 'react';

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
  const [open, setOpen] = useState(false);
  const [customVal, setCustomVal] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const parseCustom = (s: string): TF | null => {
    const m = s.trim().match(/^(\d+)(s|m|h|D|W)$/);
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
    return { label: s.trim(), ms, sec: Math.floor(ms / 1000) };
  };

  const isFav = (label: string) => favs.has(label);
  const favList = ALL_TF.filter(t => favs.has(t.label));
  const topBar = ['1m', '5m', '15m', '1h', '4h', '1D'];

  const handleSelect = (tf: TF) => {
    onChange(tf);
    // Keep open for pinning, but close if not fav action — EdgeDepth keeps open until click outside
    // For UX, close after select unless user is pinning via right-click
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      {/* Collapsed top bar — always visible, clicking drops panel */}
      <div className="flex items-center gap-3 px-2 py-1 border border-[#3a3a3a] rounded bg-[#262626] text-[11px] font-mono cursor-pointer select-none"
           onClick={() => setOpen(v => !v)}
           title="Click to drop timeframe panel — exact EdgeDepth"
      >
        {topBar.map(l => {
          const tf = ALL_TF.find(t => t.label === l);
          const active = value.label === l;
          return (
            <span
              key={l}
              onClick={e => { e.stopPropagation(); tf && handleSelect(tf); }}
              className={`pb-0.5 border-b-[2px] ${active ? 'border-[#e8e8e8] text-[#e8e8e8]' : 'border-transparent text-[#b9b9b9] hover:text-[#e8e8e8]'}`}
            >
              {l}
            </span>
          );
        })}
        <span className="text-[#b9b9b9] ml-1 text-[10px]">{open ? '▼' : '▲'}</span>
        <span className="ml-2 flex items-center gap-1 text-[10px] text-[#b9b9b9]">
          <span className="w-1.5 h-1.5 rounded-full border border-[#b9b9b9] inline-block"></span> Real-time
        </span>
      </div>

      {/* Dropdown panel — exact screenshot */}
      {open && (
        <div className="absolute top-full left-0 mt-1 z-40 w-[280px] bg-[#0a0a0a] border border-[#2a2a2a] rounded-[4px] shadow-2xl text-[11px] font-mono overflow-hidden">
          {/* TIMEFRAME header */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#0a0a0a] border-b border-[#1e1e1e]">
            <span className="text-[10px] tracking-[0.15em] text-[#b9b9b9] font-bold">TIMEFRAME</span>
            <span className="text-[10px] text-[#b9b9b9] flex items-center gap-1">
              <span className="text-[#e8e8e8]">★</span> FAVOURITES {favList.length}/6 · FULL BAR
            </span>
          </div>

          <div className="px-3 py-2 space-y-3 bg-[#0a0a0a] max-h-[60vh] overflow-auto">
            {/* SECONDS PRO */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] text-[#b9b9b9] tracking-wider">SECONDS</span>
                <span className="text-[9px] px-1 py-0.5 bg-[#1e2a2a] border border-[#21b3a4]/30 text-[#21b3a4] rounded flex items-center gap-0.5">
                  🔒 PRO
                </span>
              </div>
              <div className="flex gap-4 text-[11px]">
                {['1s', '5s', '15s', '30s'].map(l => (
                  <button
                    key={l}
                    onClick={() => {
                      const tf = ALL_TF.find(t => t.label === l);
                      if (tf) handleSelect(tf);
                    }}
                    onContextMenu={e => { e.preventDefault(); onToggleFav(l); }}
                    className="text-[#4a4a4a] hover:text-[#b9b9b9] flex items-center gap-0.5"
                    title="SECONDS PRO — locked, click triggers upsell"
                  >
                    {l} <span className="text-[8px]">🔒</span>
                  </button>
                ))}
              </div>
            </div>

            {/* MINUTES */}
            <div>
              <div className="text-[10px] text-[#b9b9b9] tracking-wider mb-1.5">MINUTES</div>
              <div className="flex gap-3 text-[11px] flex-wrap">
                {['1m', '3m', '5m', '15m', '30m'].map(l => {
                  const active = value.label === l;
                  const fav = isFav(l);
                  return (
                    <button
                      key={l}
                      onClick={() => {
                        const tf = ALL_TF.find(t => t.label === l);
                        if (tf) handleSelect(tf);
                      }}
                      onContextMenu={e => { e.preventDefault(); onToggleFav(l); }}
                      className={`flex flex-col items-center gap-0.5 pb-0.5 border-b-[2px] ${active ? 'border-[#e8e8e8] text-[#e8e8e8]' : 'border-transparent text-[#b9b9b9] hover:text-[#e8e8e8]'}`}
                      title="Click sets chart, right-click pins to bar (max 6)"
                    >
                      <span className="flex items-center gap-0.5">
                        {l} {fav && <span className="text-[8px] text-[#e8e8e8]">★</span>}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* HOURS */}
            <div>
              <div className="text-[10px] text-[#b9b9b9] tracking-wider mb-1.5">HOURS</div>
              <div className="flex gap-4 text-[11px] flex-wrap">
                {['1h', '2h', '4h', '6h', '12h'].map(l => {
                  const fav = isFav(l);
                  const active = value.label === l;
                  return (
                    <button
                      key={l}
                      onClick={() => {
                        const tf = ALL_TF.find(t => t.label === l);
                        if (tf) handleSelect(tf);
                      }}
                      onContextMenu={e => { e.preventDefault(); onToggleFav(l); }}
                      className={`flex items-center gap-0.5 ${active ? 'text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]' : 'text-[#b9b9b9] hover:text-[#e8e8e8]'}`}
                    >
                      {l} {fav && <span className="text-[8px]">★</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DAYS */}
            <div>
              <div className="text-[10px] text-[#b9b9b9] tracking-wider mb-1.5">DAYS</div>
              <div className="flex gap-4 text-[11px]">
                {['1D', '1W'].map(l => {
                  const fav = isFav(l);
                  const active = value.label === l;
                  return (
                    <button
                      key={l}
                      onClick={() => {
                        const tf = ALL_TF.find(t => t.label === l);
                        if (tf) handleSelect(tf);
                      }}
                      onContextMenu={e => { e.preventDefault(); onToggleFav(l); }}
                      className={`flex items-center gap-0.5 ${active ? 'text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]' : 'text-[#b9b9b9] hover:text-[#e8e8e8]'}`}
                    >
                      {l} {fav && <span className="text-[8px]">★</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom text */}
            <div className="text-[8px] text-[#5a5a5a] tracking-wider pt-2 border-t border-[#1e1e1e]">
              CLICK SETS THE CHART · RIGHT-CLICK PINS IT TO THE BAR (MAX 6)
            </div>

            {/* Custom — exact from image: Custom e.g. 7m, 90s, 3h Add */}
            <div className="flex items-center gap-2 pt-1 border-t border-[#1e1e1e] mt-2">
              <span className="text-[11px] text-[#b9b9b9] shrink-0">Custom</span>
              <input
                value={customVal}
                onChange={e => setCustomVal(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    const tf = parseCustom(customVal);
                    if (tf) handleSelect(tf);
                  }
                }}
                placeholder="e.g. 7m, 90s, 3h"
                className="flex-1 px-2 py-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded text-[11px] text-[#e8e8e8] placeholder:text-[#4a4a4a] focus:border-[#3a3a3a] focus:outline-none"
              />
              <button
                onClick={() => {
                  const tf = parseCustom(customVal);
                  if (tf) handleSelect(tf);
                }}
                className="px-3 py-1.5 bg-[#2a2a2a] border border-[#3a3a3a] rounded text-[11px] text-[#e8e8e8] hover:bg-[#3a3a3a] shrink-0"
              >
                Add
              </button>
            </div>
            <div className="text-[8px] text-[#4a4a4a]">Custom timeframe — e.g. 7m = 7 minutes, 90s = 90 seconds, 3h = 3 hours, max 1W</div>
          </div>
        </div>
      )}
    </div>
  );
}

export const defaultTF = ALL_TF[4];
export default EdgeDepthTimeframeBar;
