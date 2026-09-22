import React, { useEffect, useState } from 'react';
export default function LiquidationPanel({ symbol, provider='binance' }: { symbol: string; provider?: string }) {
  const [data, setData] = useState<any>(null);
  useEffect(()=>{
    let alive=true;
    const load=async()=>{
      try{
        const r=await fetch(`/api/orderflow/liquidations?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}`);
        if(!r.ok) return;
        const j=await r.json();
        if(alive) setData(j);
      }catch{}
    };
    load();
    const id=setInterval(load, 2000);
    return()=>{alive=false; clearInterval(id);};
  },[symbol,provider]);
  const field=data?.field||data||{};
  const bands=field.bands||[];
  const levels=data?.levels||field.levels||[];
  if(!bands.length && !levels.length) return <div className="p-2 text-xs opacity-60">Liquidation field building from candles...</div>;
  return (
    <div className="h-full overflow-auto bg-[#0b0e11] font-mono text-[10px] p-1">
      <div className="text-[9px] opacity-60 mb-2">Long Risk ${(field.total_long_risk||0).toFixed(0)} Short ${(field.total_short_risk||0).toFixed(0)} Bias {(field.net_bias||0).toFixed(2)}</div>
      <div className="grid grid-cols-2 gap-2">
        <div><div className="text-[9px] opacity-60 mb-1">Modelled 800 bands 0.05%</div>{bands.slice(0,30).map((b:any,i:number)=><div key={i} className="flex justify-between border-b border-white/5 py-0.5"><span>{Number(b.price).toFixed(2)}</span><span className={b.side==='long'?'text-emerald-400':'text-rose-400'}>{b.side}</span><span>{(b.reach_prob*100).toFixed(0)}%</span></div>)}</div>
        <div><div className="text-[9px] opacity-60 mb-1">Real forceOrder</div>{levels.slice(0,30).map((l:any,i:number)=><div key={i} className="flex justify-between border-b border-white/5 py-0.5"><span>{Number(l.price).toFixed(2)}</span><span>{l.side}</span><span>${(l.notional_usd||0).toFixed(0)}</span></div>)}</div>
      </div>
    </div>
  );
}
