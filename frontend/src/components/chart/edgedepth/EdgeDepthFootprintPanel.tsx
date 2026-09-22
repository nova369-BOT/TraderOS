// Professional Footprint Panel — own design
// Cluster/profile, bid/ask volume, delta, imbalance, POC, trade bubbles

import React, { useEffect, useState } from 'react';

export function EdgeDepthFootprintPanel({ symbol, provider = 'binance' }: { symbol: string; provider?: string }) {
  const [data, setData] = useState<any>(null);
  const [mode, setMode] = useState<'cluster' | 'profile'>('cluster');

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch(`/api/orderflow/footprint?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}`);
        if (r.ok) { const j = await r.json(); if (alive) setData(j); return; }
      } catch {}
    };
    load();
    const id = setInterval(load, 1500);
    return () => { alive = false; clearInterval(id); };
  }, [symbol, provider]);

  const columns = data?.columns || [];
  const demo = columns.length ? columns : Array.from({ length: 12 }, (_, ci) => ({
    timestamp_ms: Date.now() - (12 - ci) * 60000,
    levels: Array.from({ length: 20 }, (_, li) => {
      const price = 50000 + (10 - li) * 2 + ci * 0.5;
      const buy = Math.random() * 50 + (li === 10 ? 100 : 0);
      const sell = Math.random() * 50;
      return { price, buy, sell, is_poc: li === 10, delta: buy - sell };
    })
  }));

  return (
    <div className="h-full flex flex-col bg-[#1c1c1c] text-[#e8e8e8]">
      <div className="flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0">
        <span className="text-[11px] font-semibold tracking-wider">FOOTPRINT</span>
        <span className="font-mono text-[13px] font-medium">{symbol}</span>
        <span className="px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9]">{provider.toUpperCase()} {provider==='hyperliquid'?'⚡':''}</span>
        <div className="ml-auto flex gap-1 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]">
          {(['cluster','profile'] as const).map(m => (<button key={m} onClick={() => setMode(m)} className={`px-3 py-1 rounded-md text-[11px] font-medium capitalize ${mode===m?'bg-[#e8e8e8] text-[#1c1c1c]':'text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]'}`}>{m}</button>))}
        </div>
      </div>
      <div className="flex-1 overflow-auto flex gap-2 p-2 bg-[#121212]">
        {demo.slice(-12).map((col: any, ci: number) => (
          <div key={ci} className="min-w-[110px] rounded-lg border border-[#2a2a2a] bg-[#1c1c1c] overflow-hidden flex flex-col">
            <div className="px-2 py-1 bg-[#262626] border-b border-[#2a2a2a] text-[10px] text-[#b9b9b9]">{new Date(col.timestamp_ms).toLocaleTimeString()}</div>
            <div className="flex-1">
              {(col.levels||[]).slice(0,24).map((lv: any, li: number) => {
                const buy=lv.buy||0, sell=lv.sell||0, delta=buy-sell;
                const imb = buy>sell*1.8?'buy':sell>buy*1.8?'sell':'';
                return (
                  <div key={li} className={`flex justify-between items-center px-2 py-1 text-[11px] font-mono border-b border-[#2a2a2a]/30 ${imb==='buy'?'bg-[#21b3a4]/10':imb==='sell'?'bg-[#f0426c]/10':''} ${lv.is_poc?'bg-[#f59e0b]/10 ring-1 ring-[#f59e0b]/20':''}`}>
                    <span className="text-[#e8e8e8]">{Number(lv.price).toFixed(1)}</span>
                    {mode==='cluster' ? <span className="flex gap-1.5"><span className="text-[#21b3a4]">{buy.toFixed(1)}</span><span className="text-[#f0426c]">{sell.toFixed(1)}</span></span> : <span className={`${delta>0?'text-[#21b3a4]':'text-[#f0426c]'} font-medium`}>{delta>0?'+':''}{delta.toFixed(1)}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EdgeDepthFootprintPanel;
