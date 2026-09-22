// EdgeDepthTopBarExact — exact as screenshot: edgedepth EARLY ACCESS BTC/USDT Binance Futures · Perp Courses Live Replay Workspace sun fullscreen profile
// From app_shell.cpp total_height = TOPBAR_H 44 + STATSBAR_H 33 = 77px dockspace offset
// draw_brand_mark D mark 3 forward streaks exact parallelograms from master SVG viewBox 300x132 h 104 units y 14..118 cyan LOGO top bar P(58,14) P(138,14) P(126,40) P(46,40) etc + D bowl filled two bars + half-annulus outer 72x52 inner 42x26 center 208,66 sweep +/-pi/2
// draw_tracked_text glyph-by-glyph letter-spacing EARLY ACCESS pill 0.06em track

import React from 'react';

export function EdgeDepthTopBarExact({ symbol = 'BTC/USDT' }: { symbol?: string }) {
  return (
    <div className="h-[44px] flex items-center gap-3 px-3 border-b border-[#1a1d25] bg-[#05070a] text-[13px] shrink-0 overflow-x-auto">
      {/* Brand */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-1">
          <div className="w-7 h-5 relative">
            <svg viewBox="0 0 300 132" className="w-full h-full">
              <g fill="#22c5db">
                <polygon points="58,14 138,14 126,40 46,40" />
                <polygon points="46,46 126,46 114,72 34,72" />
                <polygon points="34,78 114,78 102,104 22,104" />
                <path d="M 140 14 L 180 14 L 180 118 L 140 118 Z" />
                <path d="M 180 14 L 208 14 A 72 52 0 0 1 208 118 L 180 118 A 42 26 0 0 0 180 66 A 42 26 0 0 0 180 14" />
              </g>
            </svg>
          </div>
          <span className="font-bold tracking-wider text-[13px] text-[#e9eff5] lowercase">edgedepth</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-[#1a1d25] border border-[#2a2e39] text-[9px] tracking-[0.06em] text-[#98aab8] font-bold">EARLY ACCESS</span>
      </div>

      {/* Symbol pill */}
      <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#0a0e12] border border-[#1a1d25] shrink-0">
        <div className="w-5 h-5 rounded-full bg-[#f7931a] flex items-center justify-center text-[10px] font-bold text-black">₿</div>
        <span className="font-bold text-[#e9eff5]">{symbol}</span>
        <span className="text-[11px] text-[#5f6f7c]">Binance Futures · Perp</span>
        <span className="text-[10px] text-[#5f6f7c]">▼</span>
      </div>

      {/* Right: Courses Live Replay Workspace */}
      <div className="ml-auto flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-0.5 rounded bg-[#0a0e12] border border-[#1a1d25] p-0.5">
          <button className="px-3 py-1 text-[12px] text-[#5f6f7c] hover:text-[#e9eff5]">Courses</button>
          <button className="px-3 py-1 text-[12px] bg-[#1a1d25] text-[#e9eff5] rounded font-bold">Live</button>
          <button className="px-3 py-1 text-[12px] text-[#5f6f7c] hover:text-[#e9eff5]">Replay</button>
          <div className="w-px h-4 bg-[#1a1d25] mx-1" />
          <button className="px-3 py-1 text-[12px] text-[#5f6f7c] hover:text-[#e9eff5]">Workspace</button>
        </div>
        <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#0a0e12] text-[#5f6f7c]">☀</button>
        <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#0a0e12] text-[#5f6f7c]">⛶</button>
        <button className="w-7 h-7 rounded-full bg-[#1a1d25] border border-[#2a2e39] flex items-center justify-center text-[#98aab8]">👤</button>
      </div>
    </div>
  );
}

export default EdgeDepthTopBarExact;
