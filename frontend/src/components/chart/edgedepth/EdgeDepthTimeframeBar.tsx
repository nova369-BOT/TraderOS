// EdgeDepthTimeframeBar.tsx — exact EdgeDepth TF bar, dropdown version — FULL Hyperliquid list
// Top: 1m 5m 15m 1h 4h 1D ▲ with Real-time toggle — CLICK DROPS PANEL
// Panel: TIMEFRAME FAVOURITES 6/6 FULL BAR, TICKS tick, SECONDS PRO 1s 5s 15s 30s, MINUTES 1m 3m 5m 15m 30m, HOURS 1h 2h 4h 6h 8h 12h, DAYS 1D 3D 1W, MONTHS 1M, Custom e.g. 7m 90s 3h Add
// Chrome zinc #1c1c1c/#2a2a2a/#3a3a3a #e8e8e8/#b9b9b9 #21b3a4/#f0426c
// Fix: dropdown z-50, overflow-visible, full list tick 1s 15s 30s 1m 3m 5m 15m 30m 1h 2h 4h 8h 12h 1d 3d 1w 1M + Custom, calls __lseShell.setTimeframe

import React, { useState, useRef, useEffect } from 'react';

export interface TF { label: string; ms: number; sec: number; pro?: boolean }

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
  // Canonical DAY/WEEK/MONTH uppercase only — deduped to prevent 1m 5m 5m bug, no lowercase duplicates
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
    if (raw.toLowerCase() === 'tick') return ALL_TF.find(t => t.label === 'tick') || { label: 'tick', ms: 0, sec: 0 };
    if (raw === '1M' || raw.toLowerCase() === '1mth' || raw.toLowerCase() === '1mo') {
      return ALL_TF.find(t => t.label === '1M')!;
    }
    // support 7m, 90s, 3h, 2D, 1W etc, also months via M uppercase
    const m = raw.match(/^(\d+)(s|m|h|d|w|M)$/i);
    if (!m) return null;
    const n = parseInt(m[1], 10);
    if (!(n > 0)) return null;
    const unitRaw = m[2];
    const unitLow = unitRaw.toLowerCase();
    let ms = 0;
    if (unitRaw === 'M') ms = n * 2592000000; // months
    else if (unitLow === 's') ms = n * 1000;
    else if (unitLow === 'm') ms = n * 60000;
    else if (unitLow === 'h') ms = n * 3600000;
    else if (unitLow === 'd') ms = n * 86400000;
    else if (unitLow === 'w') ms = n * 604800000;
    else return null;
    // allow up to 1M ~ 2592000000, but also allow custom like 7m 90s 3h up to 1 year
    if (ms < 1000 && raw.toLowerCase() !== 'tick') {
      // allow 1s min, but tick is 0
      if (ms === 0) return null;
    }
    if (ms > 31536000000) return null; // >1y not allowed
    const label = unitRaw === 'M' ? `${n}M` : `${n}${unitLow === 'd' ? 'd' : unitLow === 'w' ? 'w' : unitLow}`;
    // keep original case for D/W if user typed uppercase? Normalize to lower except M
    const finalLabel = unitRaw === 'M' ? `${n}M` : unitLow === 'd' && unitRaw === 'D' ? `${n}D` : unitLow === 'w' && unitRaw === 'W' ? `${n}W` : label;
    return { label: finalLabel, ms, sec: Math.floor(ms / 1000) };
  };

  const isFav = (label: string) => favs.has(label) || favs.has(label.toLowerCase()) || favs.has(label.toUpperCase());
  // Dedup favList case-insensitive to prevent 1m 5m 5m bug — user screenshot shows duplicate 5m
  const seenFav = new Set<string>();
  const favListRaw = ALL_TF.filter(t => favs.has(t.label) || favs.has(t.label.toLowerCase()) || favs.has(t.label.toUpperCase()));
  const favList = favListRaw.filter(t => {
    const k = t.label.toLowerCase();
    if (seenFav.has(k)) return false;
    seenFav.add(k);
    return true;
  });
  // Top bar: show favourites if any, else default 1m 5m 15m 1h 4h 1D
  const defaultTop = ['1m', '5m', '15m', '1h', '4h', '1D'];
  const topBarLabelsRaw = favList.length ? favList.map(t => t.label).slice(0, 6) : defaultTop;
  // Ensure topBarLabels unique case-insensitive — professional single bar, no duplicates
  const seenTop = new Set<string>();
  const topBar = topBarLabelsRaw.filter(l => {
    const k = l.toLowerCase();
    if (seenTop.has(k)) return false;
    seenTop.add(k);
    return true;
  });

  const handleSelect = (tf: TF) => {
    onChange(tf);
    setOpen(false);
  };

  // normalize value label for active check (case-insensitive except 1M)
  const norm = (l: string) => {
    if (!l) return '';
    if (l === '1M') return '1M';
    return l.toLowerCase();
  };
  const activeNorm = norm(value.label);

  return (
    <div ref={ref} className="relative" style={{ overflow: 'visible' }}>
      {/* Collapsed top bar — always visible, clicking drops panel */}
      <div className="flex items-center gap-3 px-2 py-1 border border-[#3a3a3a] rounded bg-[#262626] text-[11px] font-mono cursor-pointer select-none overflow-visible"
           onClick={() => setOpen(v => !v)}
           title="Click to drop timeframe panel — exact EdgeDepth full list tick 1s 15s 30s 1m 3m 5m 15m 30m 1h 2h 4h 8h 12h 1d 3d 1w 1M + Custom"
      >
        {topBar.map(l => {
          const tf = ALL_TF.find(t => t.label === l) || ALL_TF.find(t => t.label.toLowerCase() === l.toLowerCase());
          const isActive = tf ? norm(tf.label) === activeNorm || (l.toLowerCase() === '1d' && (activeNorm === '1d' || activeNorm === '1D')) : false;
          return (
            <span
              key={l}
              onClick={e => { e.stopPropagation(); if (tf) handleSelect(tf); }}
              className={`pb-0.5 border-b-[2px] ${isActive ? 'border-[#e8e8e8] text-[#e8e8e8]' : 'border-transparent text-[#b9b9b9] hover:text-[#e8e8e8]'}`}
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

      {/* Dropdown panel — exact screenshot, z-50 to avoid clipping, full list */}
      {open && (
        <div className="absolute top-full left-0 mt-1 z-[100] w-[300px] bg-[#0a0a0a] border border-[#2a2a2a] rounded-[4px] shadow-2xl text-[11px] font-mono overflow-hidden"
             style={{ overflow: 'visible' }}>
          {/* TIMEFRAME header */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#0a0a0a] border-b border-[#1e1e1e]">
            <span className="text-[10px] tracking-[0.15em] text-[#b9b9b9] font-bold">TIMEFRAME</span>
            <span className="text-[10px] text-[#b9b9b9] flex items-center gap-1">
              <span className="text-[#e8e8e8]">★</span> FAVOURITES {favList.length}/6 · FULL BAR
            </span>
          </div>

          <div className="px-3 py-2 space-y-3 bg-[#0a0a0a] max-h-[65vh] overflow-auto">
            {/* TICKS */}
            <div>
              <div className="text-[10px] text-[#b9b9b9] tracking-wider mb-1.5">TICKS</div>
              <div className="flex gap-4 text-[11px] flex-wrap">
                {['tick'].map(l => {
                  const tf = ALL_TF.find(t => t.label === l);
                  const isActive = tf ? norm(tf.label) === activeNorm : false;
                  const fav = isFav(l);
                  return (
                    <button
                      key={l}
                      onClick={() => { if (tf) handleSelect(tf); }}
                      onContextMenu={e => { e.preventDefault(); onToggleFav(l); }}
                      className={`flex items-center gap-0.5 ${isActive ? 'text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]' : 'text-[#b9b9b9] hover:text-[#e8e8e8]'}`}
                      title="Tick chart — one bar per trade, click sets chart"
                    >
                      {l} {fav && <span className="text-[8px]">★</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECONDS — free, no paywall, exact EdgeDepth code present */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] text-[#b9b9b9] tracking-wider">SECONDS</span>
                <span className="text-[9px] px-1 py-0.5 bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] rounded">LIVE</span>
              </div>
              <div className="flex gap-3 text-[11px] flex-wrap">
                {['1s', '5s', '15s', '30s'].map(l => {
                  const tf = ALL_TF.find(t => t.label === l);
                  const isActive = tf ? norm(tf.label) === activeNorm : false;
                  const fav = isFav(l);
                  return (
                    <button
                      key={l}
                      onClick={() => { if (tf) handleSelect(tf); }}
                      onContextMenu={e => { e.preventDefault(); onToggleFav(l); }}
                      className={`flex items-center gap-0.5 ${isActive ? 'text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]' : 'text-[#b9b9b9] hover:text-[#e8e8e8]'}`}
                      title="Seconds — exact EdgeDepth, no paywall"
                    >
                      {l} {fav && <span className="text-[8px]">★</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MINUTES */}
            <div>
              <div className="text-[10px] text-[#b9b9b9] tracking-wider mb-1.5">MINUTES</div>
              <div className="flex gap-3 text-[11px] flex-wrap">
                {['1m', '3m', '5m', '15m', '30m'].map(l => {
                  const tf = ALL_TF.find(t => t.label === l);
                  const isActive = tf ? norm(tf.label) === activeNorm : false;
                  const fav = isFav(l);
                  return (
                    <button
                      key={l}
                      onClick={() => { if (tf) handleSelect(tf); }}
                      onContextMenu={e => { e.preventDefault(); onToggleFav(l); }}
                      className={`flex flex-col items-center gap-0.5 pb-0.5 border-b-[2px] ${isActive ? 'border-[#e8e8e8] text-[#e8e8e8]' : 'border-transparent text-[#b9b9b9] hover:text-[#e8e8e8]'}`}
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
              <div className="flex gap-3 text-[11px] flex-wrap">
                {['1h', '2h', '4h', '6h', '8h', '12h'].map(l => {
                  const tf = ALL_TF.find(t => t.label === l);
                  const isActive = tf ? norm(tf.label) === activeNorm : false;
                  const fav = isFav(l);
                  return (
                    <button
                      key={l}
                      onClick={() => { if (tf) handleSelect(tf); }}
                      onContextMenu={e => { e.preventDefault(); onToggleFav(l); }}
                      className={`flex items-center gap-0.5 ${isActive ? 'text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]' : 'text-[#b9b9b9] hover:text-[#e8e8e8]'}`}
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
              <div className="flex gap-3 text-[11px] flex-wrap">
                {['1d', '3d', '1w'].map(l => {
                  const tf = ALL_TF.find(t => t.label === l);
                  const isActive = tf ? norm(tf.label) === activeNorm : false;
                  const fav = isFav(l);
                  return (
                    <button
                      key={l}
                      onClick={() => { if (tf) handleSelect(tf); }}
                      onContextMenu={e => { e.preventDefault(); onToggleFav(l); }}
                      className={`flex items-center gap-0.5 ${isActive ? 'text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]' : 'text-[#b9b9b9] hover:text-[#e8e8e8]'}`}
                    >
                      {l} {fav && <span className="text-[8px]">★</span>}
                    </button>
                  );
                })}
                {/* also show uppercase aliases */}
                {['1D', '1W'].map(l => {
                  const tf = ALL_TF.find(t => t.label === l);
                  const isActive = tf ? norm(tf.label) === activeNorm : false;
                  const fav = isFav(l);
                  return (
                    <button
                      key={l}
                      onClick={() => { if (tf) handleSelect(tf); }}
                      onContextMenu={e => { e.preventDefault(); onToggleFav(l); }}
                      className={`flex items-center gap-0.5 opacity-70 ${isActive ? 'text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]' : 'text-[#b9b9b9] hover:text-[#e8e8e8]'}`}
                      title="Alias — same as lowercase"
                    >
                      {l} {fav && <span className="text-[8px]">★</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MONTHS */}
            <div>
              <div className="text-[10px] text-[#b9b9b9] tracking-wider mb-1.5">MONTHS</div>
              <div className="flex gap-3 text-[11px] flex-wrap">
                {['1M'].map(l => {
                  const tf = ALL_TF.find(t => t.label === l);
                  const isActive = tf ? tf.label === value.label || (value.label === '1M') : false;
                  const fav = isFav(l);
                  return (
                    <button
                      key={l}
                      onClick={() => { if (tf) handleSelect(tf); }}
                      onContextMenu={e => { e.preventDefault(); onToggleFav(l); }}
                      className={`flex items-center gap-0.5 ${isActive ? 'text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]' : 'text-[#b9b9b9] hover:text-[#e8e8e8]'}`}
                    >
                      {l} {fav && <span className="text-[8px]">★</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom text */}
            <div className="text-[8px] text-[#5a5a5a] tracking-wider pt-2 border-t border-[#1e1e1e]">
              CLICK SETS THE CHART · RIGHT-CLICK PINS IT TO THE BAR (MAX 6) · FULL LIST tick 1s 15s 30s 1m 3m 5m 15m 30m 1h 2h 4h 8h 12h 1d 3d 1w 1M
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
                placeholder="e.g. 7m, 90s, 3h, tick, 1M"
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
            <div className="text-[8px] text-[#4a4a4a]">Custom timeframe — e.g. tick = tick chart, 7m = 7 minutes, 90s = 90 seconds, 3h = 3 hours, 8h = 8 hours, 3d = 3 days, 1M = 1 month, max 1y</div>
          </div>
        </div>
      )}
    </div>
  );
}

export const defaultTF = ALL_TF[5];
export default EdgeDepthTimeframeBar;
