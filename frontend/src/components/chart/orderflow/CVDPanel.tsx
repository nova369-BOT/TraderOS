import React, { useEffect, useState } from 'react';
export default function CVDPanel({ symbol, provider='binance' }: { symbol: string; provider?: string }) {
  const [data, setData] = useState<any>(null);
  useEffect(()=>{
    let alive=true;
    const load=async()=>{
      try{
        const r=await fetch(`/api/orderflow/cvd?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}`);
        if(!r.ok) return;
        const j=await r.json();
        if(alive) setData(j);
      }catch{}
    };
    load();
    const id=setInterval(load, 1000);
    return()=>{alive=false; clearInterval(id);};
  },[symbol,provider]);
  const bars=data?.bars||[];
  const last=bars[bars.length-1];
  if(!bars.length) return <div className="p-2 text-xs opacity-60">CVD waiting...</div>;
  return (
    <div className="h-full bg-[#0b0e11] font-mono text-[11px] p-2">
      <div className="flex justify-between mb-2 p-2 bg-white/5 rounded"><span>CVD <span className={(last?.cvd||0)>=0?'text-emerald-400':'text-rose-400'}>{last?.cvd?.toFixed(2)}</span></span><span>Delta {last?.delta?.toFixed(2)}</span></div>
      <div className="space-y-0.5 max-h-[400px] overflow-auto">
        {bars.slice(-40).map((b:any,i:number)=><div key={i} className="flex justify-between border-b border-white/5 py-0.5"><span className="opacity-50 text-[10px]">{new Date(b.timestamp_ms||b.ts*1000).toLocaleTimeString()}</span><span className={b.delta>=0?'text-emerald-400':'text-rose-400'}>{b.delta?.toFixed(2)}</span><span>{b.cvd?.toFixed(2)}</span></div>)}
      </div>
    </div>
  );
}
