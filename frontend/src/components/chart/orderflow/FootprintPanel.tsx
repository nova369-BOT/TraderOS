import React, { useEffect, useState } from 'react';
export default function FootprintPanel({ symbol, provider='binance' }: { symbol: string; provider?: string }) {
  const [data, setData] = useState<any>(null);
  useEffect(()=>{
    let alive=true;
    const load=async()=>{
      try{
        const r=await fetch(`/api/orderflow/footprint?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}`);
        if(!r.ok) return;
        const j=await r.json();
        if(alive) setData(j);
      }catch{}
    };
    load();
    const id=setInterval(load, 1500);
    return()=>{alive=false; clearInterval(id);};
  },[symbol,provider]);
  const cols=data?.columns||[];
  if(!cols.length) return <div className="p-2 text-xs opacity-60">Footprint waiting for trades...</div>;
  return (
    <div className="h-full overflow-auto bg-[#0b0e11] text-[10px] font-mono flex gap-1 p-1">
      {cols.slice(-10).map((c:any,ci:number)=>(
        <div key={ci} className="border border-white/10 min-w-[70px]">
          <div className="text-[8px] bg-white/5 px-1">{new Date(c.timestamp_ms||c.ts*1000).toLocaleTimeString()}</div>
          {(c.levels||[]).slice(0,25).map((lv:any,li:number)=>{
            const buy=lv.buy||0, sell=lv.sell||0, delta=buy-sell;
            const imb=buy>sell*1.8?'buy':sell>buy*1.8?'sell':'';
            return <div key={li} className={`flex justify-between px-1 ${imb==='buy'?'bg-emerald-500/20':imb==='sell'?'bg-rose-500/20':''} ${lv.is_poc?'ring-1 ring-amber-400/40':''}`}><span>{Number(lv.price).toFixed(1)}</span><span className={delta>0?'text-emerald-400':'text-rose-400'}>{delta.toFixed(1)}</span></div>;
          })}
        </div>
      ))}
    </div>
  );
}
