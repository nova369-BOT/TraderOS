import React, { useEffect, useState } from 'react';
export default function TapePanel({ symbol, provider='binance' }: { symbol: string; provider?: string }) {
  const [trades, setTrades] = useState<any[]>([]);
  useEffect(()=>{
    let alive=true;
    const load=async()=>{
      try{
        const r=await fetch(`/api/orderflow/tape?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}&limit=100`);
        if(!r.ok) return;
        const j=await r.json();
        if(alive) setTrades(j.trades||j.tape||[]);
      }catch{}
    };
    load();
    const id=setInterval(load, 400);
    return()=>{alive=false; clearInterval(id);};
  },[symbol,provider]);
  return (
    <div className="h-full overflow-auto font-mono text-[11px] bg-[#0b0e11]">
      <div className="grid grid-cols-4 px-1 py-0.5 text-[9px] opacity-60 sticky top-0 bg-[#0b0e11]"><span>TIME</span><span>PRICE</span><span>SIZE</span><span>SIDE</span></div>
      {trades.map((t:any,i:number)=>{
        const side=t.is_buy ?? t.side==='BUY';
        const hl=t.highlight||0;
        const cls=hl===3?'bg-amber-500/30 font-bold':hl===2?'bg-amber-500/15':hl===1?'bg-white/10':'';
        return <div key={i} className={`grid grid-cols-4 px-1 py-0.5 border-b border-white/5 ${cls}`}><span className="opacity-50">{new Date(t.timestamp_ms||t.ts*1000).toLocaleTimeString()}</span><span className={side?'text-emerald-400':'text-rose-400'}>{Number(t.price).toFixed(2)}</span><span>{Number(t.qty||t.size).toFixed(4)}</span><span>{side?'BUY':'SELL'}</span></div>;
      })}
    </div>
  );
}
