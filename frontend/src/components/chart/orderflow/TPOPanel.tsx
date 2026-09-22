import React, { useEffect, useState } from 'react';
export default function TPOPanel({ symbol, provider='binance' }: { symbol: string; provider?: string }) {
  const [sessions, setSessions] = useState<any[]>([]);
  useEffect(()=>{
    let alive=true;
    const load=async()=>{
      try{
        const r=await fetch(`/api/orderflow/tpo?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}`);
        if(!r.ok) return;
        const j=await r.json();
        if(alive) setSessions(j.sessions||[]);
      }catch{}
    };
    load();
    const id=setInterval(load, 5000);
    return()=>{alive=false; clearInterval(id);};
  },[symbol,provider]);
  if(!sessions.length) return <div className="p-2 text-xs opacity-60">TPO waiting for 30m candles...</div>;
  return (
    <div className="h-full overflow-auto bg-[#0b0e11] font-mono text-[10px] p-1 space-y-2">
      {sessions.slice(-2).map((s:any,si:number)=>(
        <div key={si} className="border border-white/10">
          <div className="bg-white/5 px-2 py-1 flex justify-between text-[9px]"><span>{new Date(s.start_ms||s.start*1000).toLocaleDateString()}</span><span>POC {s.poc?.toFixed(2)} VAH {s.vah?.toFixed(2)} VAL {s.val?.toFixed(2)}</span></div>
          {(s.rows||[]).slice(0,25).map((r:any,ri:number)=><div key={ri} className="flex gap-1 px-1"><span className="w-14 text-right">{Number(r.price).toFixed(2)}</span><span className="opacity-70">{(r.blocks||r.tpos||'').toString().slice(0,20)}</span>{r.is_poc&&<span className="text-amber-400">*</span>}</div>)}
        </div>
      ))}
    </div>
  );
}
