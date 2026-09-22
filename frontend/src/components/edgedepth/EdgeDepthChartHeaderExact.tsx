// EdgeDepthChartHeaderExact — exact as screenshot: Chart BTC/USDT 1m X 1m 5m 15m 1h 4h 1D dropdown Real-time Footprint profile/Candles dropdown Layers 1 +Widget Draw Indicators Settings Jump to latest
// From edgedepth chart_widget.cpp ChartHeaderWidget {TF dropdown, mode dropdown, layers pill +Widget, draw, indicators, settings, jump_to_latest button centered bottom with SVG down arrow}

import React from 'react';

const TFs = ['1m','5m','15m','1h','4h','1D'];

export function EdgeDepthChartHeaderExact({
  symbol = 'BTC/USDT',
  timeframe = '1m',
  mode = 'Footprint profile',
  onTimeframeChange,
  onModeChange,
  onJumpLatest,
}: {
  symbol?: string;
  timeframe?: string;
  mode?: string;
  onTimeframeChange?: (tf:string)=>void;
  onModeChange?: (m:string)=>void;
  onJumpLatest?: ()=>void;
}) {
  return (
    <div className="relative h-[36px] flex items-center gap-2 px-2 border-b border-[#1a1d25] bg-[#0a0e12] text-[12px] shrink-0">
      <span className="text-[#5f6f7c] text-[12px]">Chart</span>
      <div className="flex items-center gap-1 px-2 py-1 rounded bg-[#05070a] border border-[#1a1d25]">
        <span className="font-bold text-[#e9eff5]">{symbol}</span>
        <span className="text-[#e9eff5]">1m</span>
        <span className="text-[10px] text-[#5f6f7c]">✕</span>
      </div>
      <div className="flex items-center gap-0.5 ml-1 rounded bg-[#05070a] border border-[#1a1d25] p-0.5">
        {TFs.map(tf => (
          <button
            key={tf}
            onClick={()=> onTimeframeChange?.(tf)}
            className={`px-2 py-1 rounded text-[11px] ${timeframe===tf?'bg-[#1a1d25] text-[#e9eff5] font-bold':'text-[#5f6f7c] hover:text-[#e9eff5]'}`}
          >{tf}</button>
        ))}
        <span className="text-[10px] text-[#5f6f7c] ml-1">▼</span>
      </div>
      <div className="flex items-center gap-1 ml-1">
        <div className="w-2 h-2 rounded-full bg-[#15c99e] animate-pulse" />
        <span className="text-[11px] text-[#5f6f7c]">Real-time</span>
      </div>
      <div className="flex items-center gap-1 px-2 py-1 rounded bg-[#05070a] border border-[#1a1d25] ml-1">
        <span className="text-[#e9eff5] text-[12px]">{mode}</span>
        <span className="text-[11px] text-[#5f6f7c]">/Candles</span>
        <span className="text-[10px] text-[#5f6f7c]">▼</span>
      </div>
      <div className="flex items-center gap-1 px-2 py-1 rounded bg-[#05070a] border border-[#1a1d25]">
        <span className="text-[#e9eff5]">Layers</span>
        <span className="px-1 py-0 rounded bg-[#1a1d25] text-[10px] text-[#e9eff5]">1</span>
      </div>
      <button className="px-2 py-1 rounded bg-[#05070a] border border-[#1a1d25] text-[#e9eff5]">+Widget</button>
      <button className="px-2 py-1 rounded bg-[#05070a] border border-[#1a1d25] text-[#e9eff5]">Draw</button>
      <button className="px-2 py-1 rounded bg-[#05070a] border border-[#1a1d25] text-[#e9eff5]">Indicators</button>
      <button className="w-7 h-7 flex items-center justify-center rounded bg-[#05070a] border border-[#1a1d25] text-[#5f6f7c]">⚙</button>

      {/* Jump to latest - centered bottom as in screenshot */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-10">
        <button
          onClick={onJumpLatest}
          className="flex items-center gap-1 px-3 py-1 rounded bg-[#e9eff5] text-[#05070a] text-[11px] font-bold shadow-lg hover:bg-white"
        >
          Jump to latest
          <span className="text-[10px]">▼</span>
        </button>
      </div>
    </div>
  );
}

export default EdgeDepthChartHeaderExact;
