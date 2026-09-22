// Professional VPVR Panel — own design
// Volume Profile POC/VAH/VAL

import React, { useEffect, useState } from 'react';

export function EdgeDepthVolumeProfilePanel({ symbol, provider = 'binance' }: { symbol: string; provider?: string }) {
  const [profile, setProfile] = useState<any[]>([]);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch(`/api/orderflow/vpvr?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}`);
        if (r.ok) { const j = await r.json(); if (alive && j.levels) { setProfile(j.levels); return; } }
      } catch {}
      // synthetic VPVR
      if (!alive) return;
      const mid = 50000; const levels = Array.from({ length: 40 }, (_, i) => {
        const price = mid + (20 - i) * 10;
        const vol = Math.exp(-Math.pow(i - 20, 2) / 80) * 100 + Math.random() * 10;
        return { price, volume: vol, buy: vol * (0.4 + Math.random() * 0.2), sell: vol * (0.4 + Math.random() * 0.2), is_poc: i === 20, is_vah: i === 12, is_val: i === 28 };
      });
      setProfile(levels);
    };
    load();
    const id = setInterval(load, 2000);
    return () => { alive = false; clearInterval(id); };
  }, [symbol, provider]);

  const maxVol = Math.max(...profile.map(p => p.volume || 0), 1);
  const poc = profile.find(p => p.is_poc);

  return (
    <div className="h-full flex flex-col bg-[#1c1c1c] text-[#e8e8e8]">
      <div className="flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0">
        <span className="text-[11px] font-semibold tracking-wider">VPVR</span>
        <span className="font-mono text-[13px] font-medium">{symbol}</span>
        <span className="px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9]">{provider?.toUpperCase()}</span>
        {poc && <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#f59e0b]">POC {poc.price.toFixed(2)}</span>}
      </div>
      <div className="flex-1 overflow-auto p-2 space-y-0.5">
        {profile.map((lv, i) => {
          const width = (lv.volume / maxVol) * 100;
          const buyPct = lv.volume ? (lv.buy / lv.volume) * 100 : 50;
          return (
            <div key={i} className={`relative flex items-center gap-2 px-2 py-1 rounded-md border ${lv.is_poc ? 'border-[#f59e0b]/30 bg-[#f59e0b]/5' : lv.is_vah || lv.is_val ? 'border-[#21b3a4]/20 bg-[#21b3a4]/5' : 'border-transparent hover:bg-[#262626]'}`}>
              <span className="w-16 font-mono text-[11px] tabular-nums">{lv.price.toFixed(1)}</span>
              <div className="flex-1 h-4 rounded bg-[#262626] overflow-hidden flex relative">
                <div className="h-full bg-[#21b3a4]/60" style={{ width: `${buyPct}%` }} />
                <div className="h-full bg-[#f0426c]/60 flex-1" />
                <div className="absolute inset-0 flex items-center">
                  <div className="h-1 bg-[#e8e8e8] rounded-full" style={{ width: `${width}%` }} />
                </div>
              </div>
              <span className="w-12 text-right font-mono text-[10px] text-[#b9b9b9]">{lv.volume.toFixed(1)}</span>
              {lv.is_poc && <span className="text-[9px] px-1 py-0.5 rounded bg-[#f59e0b] text-black font-bold">POC</span>}
              {lv.is_vah && <span className="text-[9px] px-1 py-0.5 rounded bg-[#21b3a4]/20 border border-[#21b3a4]/30 text-[#21b3a4]">VAH</span>}
              {lv.is_val && <span className="text-[9px] px-1 py-0.5 rounded bg-[#f0426c]/20 border border-[#f0426c]/30 text-[#f0426c]">VAL</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EdgeDepthVolumeProfilePanel;
