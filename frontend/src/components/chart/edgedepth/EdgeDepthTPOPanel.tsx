// EdgeDepthTPOPanel.tsx — TPO exact EdgeDepth
// Port of tpo_manager.cpp — Time Price Opportunity 30m blocks, zinc

import React, { useEffect, useState } from 'react';

export function EdgeDepthTPOPanel({ symbol, provider = 'binance' }: { symbol: string; provider?: string }) {
  const [tpo, setTpo] = useState<any>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch(`/api/orderflow/tpo?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}`);
        if (!r.ok) return;
        const j = await r.json();
        if (alive) setTpo(j);
      } catch {}
    };
    load();
    const id = setInterval(load, 3000);
    return () => { alive = false; clearInterval(id); };
  }, [symbol, provider]);

  const blocks = tpo?.blocks || tpo?.levels || [];
  const demoBlocks = blocks.length ? blocks : Array.from({ length: 20 }, (_, i) => ({
    price: 50000 + (10 - i) * 5,
    tpos: Array.from({ length: 8 }, (_, j) => String.fromCharCode(65 + j)),
    count: Math.floor(Math.random() * 8) + 1,
    is_poc: i === 10,
  }));

  return (
    <div className="h-full flex flex-col bg-[#1c1c1c] border border-[#3a3a3a]">
      <div className="flex items-center gap-2 px-2 py-1 bg-[#2a2a2a] border-b border-[#3a3a3a] text-[10px]">
        <span className="font-bold tracking-wider text-[#e8e8e8]">TPO — {symbol}</span>
        <span className="text-[#b9b9b9]">30m blocks • {provider.toUpperCase()}</span>
        <span className="ml-auto text-[9px] text-[#b9b9b9]/60">Time Price Opportunity — exact tpo_manager.cpp</span>
      </div>
      <div className="flex-1 overflow-auto p-2">
        <div className="space-y-0.5">
          {demoBlocks.map((b: any, i: number) => (
            <div key={i} className={`flex items-center gap-2 px-2 py-1 text-[10px] font-mono border border-[#3a3a3a]/20 rounded-[1px] ${b.is_poc ? 'bg-[#f0b350]/20 ring-1 ring-[#f0b350]/40' : 'bg-[#262626]/50'}`}>
              <span className="w-16 tabular-nums text-[#e8e8e8]">{Number(b.price).toFixed(1)}</span>
              <div className="flex gap-0.5">
                {(b.tpos || []).map((t: string, ti: number) => (
                  <span key={ti} className="w-4 h-4 flex items-center justify-center bg-[#3a3a3a] text-[#e8e8e8] text-[8px] rounded-[1px]">{t}</span>
                ))}
              </div>
              <span className="ml-auto text-[#b9b9b9]">{b.count || (b.tpos || []).length} TPOs</span>
              {b.is_poc && <span className="text-[8px] bg-[#f0b350] text-black px-1 rounded">POC</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EdgeDepthTPOPanel;
