// Professional Timeframe Bar — own design, not EdgeDepth clone
// Clean zinc UI #1c1c1c/#2a2a2a/#262626/#3a3a3a #e8e8e8/#b9b9b9 #21b3a4/#f0426c
// Functionality: tick, 1s 5s 15s 30s, 1m 3m 5m 15m 30m, 1h 2h 4h 6h 8h 12h, 1D 3D 1W 1M, custom e.g. 7m 90s 3h
// Professional dropdown: sections with grid, favourites with star, active highlight, custom input
// No PRO gating, no EdgeDepth copy — own made professional UI

import React, { useState, useRef, useEffect } from 'react';

export interface TF { label: string; ms: number; sec: number }

export const ALL_TF: TF[] = [
  { label: 'tick', ms: 0, sec: 0 },
  { label: '1s', ms: 1000, sec: 1 },
  { label: '5s', ms: 5000, sec: 5 },
  { label: '15s', ms: 15000, sec: 15 },
  { label: '30s', ms: 30000, sec: 30 },
  { label: '1m', ms: 60000, sec: 60 },
  { label: '3m', ms: 180000, sec: 180 },
  { label: '5m', ms: 300000, sec: 300 },
  { label: '15m', ms: 900000, sec: 900 },
  { label: '30m', ms: 1800000, sec: 1800 },
  { label: '1h', ms: 3600000, sec: 3600 },
  { label: '2h', ms: 7200000, sec: 7200 },
  { label: '4h', ms: 14400000, sec: 14400 },
  { label: '6h', ms: 21600000, sec: 21600 },
  { label: '8h', ms: 28800000, sec: 28800 },
  { label: '12h', ms: 43200000, sec: 43200 },
  { label: '1D', ms: 86400000, sec: 86400 },
  { label: '3D', ms: 259200000, sec: 259200 },
  { label: '1W', ms: 604800000, sec: 604800 },
  { label: '1M', ms: 2592000000, sec: 2592000 },
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
    const raw = s.trim();
    if (!raw) return null;
    if (raw.toLowerCase() === 'tick') return ALL_TF.find(t => t.label === 'tick')!;
    const m = raw.match(/^(\d+)(s|m|h|d|w|M)$/i);
    if (!m) return null;
    const n = parseInt(m[1], 10);
    if (!(n > 0)) return null;
    const unitRaw = m[2];
    const unitLow = unitRaw.toLowerCase();
    let ms = 0;
    if (unitRaw === 'M') ms = n * 2592000000;
    else if (unitLow === 's') ms = n * 1000;
    else if (unitLow === 'm') ms = n * 60000;
    else if (unitLow === 'h') ms = n * 3600000;
    else if (unitLow === 'd') ms = n * 86400000;
    else if (unitLow === 'w') ms = n * 604800000;
    else return null;
    if (ms > 31536000000) return null;
    const finalLabel = unitRaw === 'M' ? `${n}M` : unitLow === 'd' ? `${n}D` : unitLow === 'w' ? `${n}W` : `${n}${unitLow}`;
    return { label: finalLabel, ms, sec: Math.floor(ms / 1000) };
  };

  const isFav = (label: string) => favs.has(label) || favs.has(label.toLowerCase()) || favs.has(label.toUpperCase());

  // Dedup case-insensitive
  const seenFav = new Set<string>();
  const favList = ALL_TF.filter(t => favs.has(t.label) || favs.has(t.label.toLowerCase()) || favs.has(t.label.toUpperCase())).filter(t => {
    const k = t.label.toLowerCase();
    if (seenFav.has(k)) return false;
    seenFav.add(k);
    return true;
  });

  const defaultTop = ['1m', '5m', '15m', '1h', '4h', '1D'];
  const topLabelsRaw = favList.length ? favList.map(t => t.label).slice(0, 6) : defaultTop;
  const seenTop = new Set<string>();
  const topBar = topLabelsRaw.filter(l => {
    const k = l.toLowerCase();
    if (seenTop.has(k)) return false;
    seenTop.add(k);
    return true;
  });

  const handleSelect = (tf: TF) => {
    onChange(tf);
    setOpen(false);
  };

  const norm = (l: string) => (l === '1M' ? '1M' : l.toLowerCase());
  const activeNorm = norm(value.label);

  const sections: { title: string; items: string[] }[] = [
    { title: 'Ticks', items: ['tick'] },
    { title: 'Seconds', items: ['1s', '5s', '15s', '30s'] },
    { title: 'Minutes', items: ['1m', '3m', '5m', '15m', '30m'] },
    { title: 'Hours', items: ['1h', '2h', '4h', '6h', '8h', '12h'] },
    { title: 'Days & Months', items: ['1D', '3D', '1W', '1M'] },
  ];

  return (
    <div ref={ref} className="relative" style={{ overflow: 'visible' }}>
      {/* Professional collapsed bar — own UI, not EdgeDepth clone */}
      <div className="flex items-center gap-1 px-2 py-1 rounded-md border border-[#3a3a3a] bg-[#262626] text-[12px] select-none">
        <div className="flex items-center gap-1">
          {topBar.map(l => {
            const tf = ALL_TF.find(t => t.label.toLowerCase() === l.toLowerCase()) || ALL_TF.find(t => t.label === l);
            const isActive = tf ? norm(tf.label) === activeNorm : false;
            return (
              <button
                key={l}
                onClick={e => { e.stopPropagation(); if (tf) handleSelect(tf); }}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  isActive
                    ? 'bg-[#e8e8e8] text-[#1c1c1c]'
                    : 'bg-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]'
                }`}
              >
                {l}
              </button>
            );
          })}
        </div>
        <div className="w-px h-4 bg-[#3a3a3a] mx-1" />
        <button
          onClick={() => setOpen(v => !v)}
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#2a2a2a] border border-[#3a3a3a] text-[#e8e8e8] hover:bg-[#343434] text-[11px] font-medium"
        >
          <span>{value.label}</span>
          <span className="text-[10px] opacity-60">{open ? '▲' : '▼'}</span>
        </button>
        <span className="ml-2 hidden md:flex items-center gap-1.5 text-[10px] text-[#b9b9b9]">
          <span className="w-2 h-2 rounded-full bg-[#21b3a4] animate-pulse" />
          Live
        </span>
      </div>

      {/* Professional dropdown — own design, clean zinc, not EdgeDepth black */}
      {open && (
        <div className="absolute top-full left-0 mt-2 z-[100] w-[340px] rounded-lg border border-[#3a3a3a] bg-[#1c1c1c] shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#2a2a2a] bg-[#222222]">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold tracking-wider text-[#e8e8e8]">TIMEFRAME</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#2a2a2a] border border-[#3a3a3a] text-[#b9b9b9]">
                {favList.length}/6 favs
              </span>
            </div>
            <button onClick={() => setOpen(false)} className="text-[#b9b9b9] hover:text-[#e8e8e8] text-[14px]">×</button>
          </div>

          <div className="p-3 space-y-4 max-h-[60vh] overflow-auto scrollbar-thin">
            {/* Favourites */}
            {favList.length > 0 && (
              <div>
                <div className="text-[10px] font-semibold tracking-wider text-[#b9b9b9] mb-2 flex items-center gap-1">
                  <span className="text-[#e8e8e8]">★</span> FAVOURITES
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {favList.map(t => {
                    const isActive = norm(t.label) === activeNorm;
                    return (
                      <button
                        key={t.label}
                        onClick={() => handleSelect(t)}
                        className={`group flex items-center gap-1 px-2.5 py-1 rounded-md border text-[11px] font-medium transition-colors ${
                          isActive ? 'bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]' : 'bg-[#262626] border-[#3a3a3a] text-[#e8e8e8] hover:bg-[#343434]'
                        }`}
                      >
                        {t.label}
                        <span
                          onClick={e => { e.stopPropagation(); onToggleFav(t.label); }}
                          className="ml-1 text-[10px] opacity-60 hover:opacity-100"
                          title="Remove from favourites"
                        >
                          ★
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sections */}
            {sections.map(sec => (
              <div key={sec.title}>
                <div className="text-[10px] font-semibold tracking-wider text-[#b9b9b9] mb-2">{sec.title.toUpperCase()}</div>
                <div className="grid grid-cols-5 gap-1.5">
                  {sec.items.map(l => {
                    const tf = ALL_TF.find(t => t.label === l);
                    if (!tf) return null;
                    const isActive = norm(tf.label) === activeNorm;
                    const fav = isFav(l);
                    return (
                      <button
                        key={l}
                        onClick={() => handleSelect(tf)}
                        onContextMenu={e => { e.preventDefault(); onToggleFav(l); }}
                        className={`relative px-2 py-1.5 rounded-md border text-[11px] font-medium transition-colors ${
                          isActive
                            ? 'bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]'
                            : 'bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8] hover:border-[#4a4a4a]'
                        }`}
                        title={fav ? 'Favourite — right-click to remove' : 'Right-click to add to favourites'}
                      >
                        {l}
                        {fav && <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#21b3a4] rounded-full" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Custom */}
            <div className="pt-3 border-t border-[#2a2a2a]">
              <div className="text-[10px] font-semibold tracking-wider text-[#b9b9b9] mb-2">CUSTOM</div>
              <div className="flex items-center gap-2">
                <input
                  value={customVal}
                  onChange={e => setCustomVal(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      const tf = parseCustom(customVal);
                      if (tf) handleSelect(tf);
                    }
                  }}
                  placeholder="e.g. 7m, 90s, 3h, tick, 1M"
                  className="flex-1 px-3 py-2 rounded-md bg-[#262626] border border-[#3a3a3a] text-[12px] text-[#e8e8e8] placeholder:text-[#6a6a6a] focus:border-[#4a4a4a] focus:outline-none"
                />
                <button
                  onClick={() => {
                    const tf = parseCustom(customVal);
                    if (tf) handleSelect(tf);
                  }}
                  className="px-4 py-2 rounded-md bg-[#e8e8e8] text-[#1c1c1c] text-[11px] font-semibold hover:bg-white transition-colors"
                >
                  Apply
                </button>
              </div>
              <div className="mt-2 text-[10px] text-[#6a6a6a] leading-relaxed">
                Right-click any timeframe to pin to favourites (max 6). Supports tick, seconds (s), minutes (m), hours (h), days (D), weeks (W), months (M).
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const defaultTF = ALL_TF[5];
export default EdgeDepthTimeframeBar;
