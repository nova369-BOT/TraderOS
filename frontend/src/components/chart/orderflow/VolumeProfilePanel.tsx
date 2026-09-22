import React, { useEffect, useState } from 'react';
export default function VolumeProfilePanel({ symbol, provider='binance' }: { symbol: string; provider?: string }) {
  const [levels, setLevels] = useState<any[]>([]);
  const [poc, setPoc] = useState<number|null>(null);
  useEffect(()=>{
    let alive=true;
    const load=async()=>{
      try{
        const r=await fetch(`/api/orderflow/volume_profile?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}`);
        if(!r.ok) return;
        const j=await r.json();
        if(alive){ setLevels(j.levels||[]); setPoc(j.poc||j.poc_price||null); }
      }catch{}
    };
    load();
    const id=setInterval(load, 2000);
    return()=>{alive=false; clearInterval(id);};
  },[symbol,provider]);
  if(!levels.length) return <div className="p-2 text-xs opacity-60">VPVR waiting...</div>;
  const maxV=Math.max(...levels.map((l:any)=>l.total||l.volume||0),1);
  return (
    <div className="h-full overflow-auto bg-[#0b0e11] font-mono text-[10px] p-1">
      {levels.map((lv:any,i:number)=>{
        const vol=lv.total||lv.volume||0;
        return <div key={i} className={`flex items-center gap-1 ${lv.is_poc?'bg-amber-500/20':''}`}><span className="w-16 text-right">{Number(lv.price).toFixed(2)}</span><div className="flex-1 h-2 bg-white/5 relative"><div className="absolute h-full bg-sky-500/50" style={{width:`${(vol/maxV)*100}%`}} /></div><span className="w-10 text-right opacity-60">{vol.toFixed(1)}</span>{lv.is_poc&&<span className="text-[7px] bg-amber-400 text-black px-1 rounded">POC</span>}</div>;
      })}
    </div>
  );
}
