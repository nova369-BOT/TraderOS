import React, { useEffect, useState } from 'react';

export default function DOMPanel({ symbol, provider = 'binance', grouping = 0.5 }: { symbol: string; provider?: string; grouping?: number }) {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch(`/api/orderflow/dom?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}&grouping=${grouping}&mode=usd`);
        if (!r.ok) return;
        const j = await r.json();
        if (alive) setData(j);
      } catch {}
    };
    load();
    const id = setInterval(load, 500);
    return () => { alive = false; clearInterval(id); };
  }, [symbol, provider, grouping]);

  if (!data) return <div className="p-2 text-xs opacity-60">DOM loading...</div>;
  const bids = data.bids || [];
  const asks = data.asks || [];
  return (
    <div className="h-full flex flex-col font-mono text-[11px] bg-[#0b0e11] text-[#d1d4dc]">
      <div className="grid grid-cols-3 px-2 py-1 text-[9px] opacity-60 border-b border-border/20"><span>PRICE</span><span>SIZE</span><span>TOTAL USD</span></div>
      <div className="flex-1 overflow-auto">
        {asks.slice(0, 25).reverse().map((l: any, i: number) => (
          <div key={`a-${i}`} className="grid grid-cols-3 px-2 py-0.5 text-rose-300/80 border-b border-border/10"><span>{Number(l.price).toFixed(2)}</span><span>{Number(l.qty||l.size).toFixed(4)}</span><span className="opacity-60">{l.total_usd ? `$${(l.total_usd/1000).toFixed(1)}k` : ''}</span></div>
        ))}
        <div className="h-px bg-amber-400/50 my-1" />
        {bids.slice(0, 25).map((l: any, i: number) => (
          <div key={`b-${i}`} className="grid grid-cols-3 px-2 py-0.5 text-emerald-300/80 border-b border-border/10"><span>{Number(l.price).toFixed(2)}</span><span>{Number(l.qty||l.size).toFixed(4)}</span><span className="opacity-60">{l.total_usd ? `$${(l.total_usd/1000).toFixed(1)}k` : ''}</span></div>
        ))}
      </div>
    </div>
  );
}
