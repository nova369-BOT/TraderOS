// Professional TPO Panel — own design
// Time Price Opportunity 30m blocks

import React, { useEffect, useState } from 'react';

export function EdgeDepthTPOPanel({ symbol, provider = 'binance' }: { symbol: string; provider?: string }) {
  const [blocks, setBlocks] = useState<any[]>([]);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch(`/api/orderflow/tpo?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}`);
        if (r.ok) { const j = await r.json(); if (alive && j.blocks) { setBlocks(j.blocks); return; } }
      } catch {}
      if (!alive) return;
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const mid = 50000;
      const demo = Array.from({ length: 12 }, (_, ci) => ({
        time: `${String(8 + ci).padStart(2, '0')}:00`,
        letter: letters[ci % letters.length],
        levels: Array.from({ length: 20 }, (_, li) => ({
          price: mid + (10 - li) * 5 + Math.random() * 2,
          letter: letters[ci % letters.length],
          count: Math.floor(Math.random() * 3) + (Math.abs(li - 10) < 3 ? 2 : 0),
          is_poc: li === 10 && ci === 6,
        }))
      }));
      setBlocks(demo);
    };
    load();
    const id = setInterval(load, 3000);
    return () => { alive = false; clearInterval(id); };
  }, [symbol, provider]);

  return (
    <div className="h-full flex flex-col bg-[#1c1c1c] text-[#e8e8e8]">
      <div className="flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0">
        <span className="text-[11px] font-semibold tracking-wider">TPO</span>
        <span className="font-mono text-[13px] font-medium">{symbol}</span>
        <span className="px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9]">{provider?.toUpperCase()}</span>
        <span className="ml-auto text-[10px] text-[#6a6a6a]">30m blocks • TPO count</span>
      </div>
      <div className="flex-1 overflow-auto flex gap-1.5 p-2 bg-[#121212]">
        {blocks.map((b, ci) => (
          <div key={ci} className="min-w-[80px] rounded-lg border border-[#2a2a2a] bg-[#1c1c1c] overflow-hidden flex flex-col">
            <div className="px-2 py-1 bg-[#262626] border-b border-[#2a2a2a] flex items-center gap-1.5">
              <span className="w-5 h-5 rounded bg-[#e8e8e8] text-[#1c1c1c] text-[10px] font-bold flex items-center justify-center">{b.letter}</span>
              <span className="text-[10px] text-[#b9b9b9]">{b.time}</span>
            </div>
            <div className="flex-1 p-1 space-y-0.5">
              {(b.levels || []).map((lv: any, li: number) => (
                <div key={li} className={`px-1.5 py-0.5 rounded text-[10px] font-mono flex justify-between ${lv.is_poc ? 'bg-[#f59e0b]/20 border border-[#f59e0b]/30 text-[#f59e0b]' : 'bg-[#262626]/50 text-[#b9b9b9]'}`}>
                  <span>{lv.price.toFixed(1)}</span>
                  <span className="font-bold">{lv.letter.repeat(lv.count)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EdgeDepthTPOPanel;
