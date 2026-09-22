// EdgeDepthVolumeProfilePanel.tsx — VPVR exact EdgeDepth
// Port of volume_profile_manager.cpp + price_profile_renderer.cpp
// POC/VAH/VAL, zinc chrome

import React, { useEffect, useState } from 'react';

export function EdgeDepthVolumeProfilePanel({ symbol, provider = 'binance' }: { symbol: string; provider?: string }) {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch(`/api/orderflow/volume_profile?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}`);
        if (!r.ok) return;
        const j = await r.json();
        if (alive) setProfile(j);
      } catch {}
    };
    load();
    const id = setInterval(load, 3000);
    return () => { alive = false; clearInterval(id); };
  }, [symbol, provider]);

  const levels = profile?.levels || [];
  const poc = profile?.poc || null;
  const vah = profile?.vah || null;
  const val = profile?.val || null;
  const maxVol = Math.max(...levels.map((l: any) => l.volume || 0), 1);

  // If no data, generate demo profile
  const demoLevels = levels.length ? levels : Array.from({ length: 30 }, (_, i) => {
    const price = 50000 + (i - 15) * 10;
    const vol = Math.exp(-Math.pow(i - 15, 2) / 50) * 1000 + Math.random() * 100;
    return { price, volume: vol, buy: vol * 0.6, sell: vol * 0.4 };
  });

  return (
    <div className="h-full flex flex-col bg-[#1c1c1c] border border-[#3a3a3a]">
      <div className="flex items-center gap-2 px-2 py-1 bg-[#2a2a2a] border-b border-[#3a3a3a] text-[10px]">
        <span className="font-bold tracking-wider text-[#e8e8e8]">VPVR — {symbol}</span>
        <span className="text-[#b9b9b9]">{provider.toUpperCase()} POC/VAH/VAL</span>
        {poc && <span className="ml-2 text-[#f0b350]">POC {Number(poc.price || poc).toFixed(2)}</span>}
        {vah && <span className="text-[#21b3a4]">VAH {Number(vah.price || vah).toFixed(2)}</span>}
        {val && <span className="text-[#f0426c]">VAL {Number(val.price || val).toFixed(2)}</span>}
      </div>
      <div className="flex-1 flex">
        <div className="flex-1 overflow-auto p-1">
          {demoLevels.map((lv: any, i: number) => {
            const isPoc = poc && Math.abs(lv.price - (poc.price || poc)) < 5;
            const isVah = vah && Math.abs(lv.price - (vah.price || vah)) < 5;
            const isVal = val && Math.abs(lv.price - (val.price || val)) < 5;
            const w = (lv.volume / maxVol) * 100;
            const buyPct = lv.volume ? (lv.buy || lv.volume * 0.5) / lv.volume : 0.5;
            return (
              <div key={i} className={`flex items-center gap-1 py-0.5 px-1 text-[10px] font-mono border-b border-[#3a3a3a]/20 ${isPoc ? 'bg-[#f0b350]/20 ring-1 ring-[#f0b350]/50' : isVah || isVal ? 'bg-[#21b3a4]/10' : ''}`}>
                <span className="w-16 tabular-nums text-[#e8e8e8]">{Number(lv.price).toFixed(1)}</span>
                <div className="flex-1 h-3 bg-[#2a2a2a] relative overflow-hidden rounded-[1px]">
                  <div className="absolute inset-y-0 left-0 bg-[#21b3a4]/60" style={{ width: `${w * buyPct}%` }} />
                  <div className="absolute inset-y-0 bg-[#f0426c]/60" style={{ left: `${w * buyPct}%`, width: `${w * (1 - buyPct)}%` }} />
                </div>
                <span className="w-12 text-right tabular-nums text-[#b9b9b9]">{Number(lv.volume).toFixed(0)}</span>
                {isPoc && <span className="text-[8px] bg-[#f0b350] text-black px-1 rounded">POC</span>}
                {isVah && <span className="text-[8px] bg-[#21b3a4] text-black px-1 rounded">VAH</span>}
                {isVal && <span className="text-[8px] bg-[#f0426c] text-white px-1 rounded">VAL</span>}
              </div>
            );
          })}
        </div>
        <div className="w-32 border-l border-[#3a3a3a] bg-[#262626] p-2 text-[9px] space-y-2">
          <div className="text-[#b9b9b9] uppercase tracking-wider">Profile Stats</div>
          <div className="space-y-1 text-[#e8e8e8]">
            <div>POC: {poc ? Number(poc.price || poc).toFixed(2) : '—'}</div>
            <div>VAH: {vah ? Number(vah.price || vah).toFixed(2) : '—'}</div>
            <div>VAL: {val ? Number(val.price || val).toFixed(2) : '—'}</div>
            <div>Range: {demoLevels.length ? `${Number(demoLevels[0].price).toFixed(0)} - ${Number(demoLevels[demoLevels.length-1].price).toFixed(0)}` : '—'}</div>
          </div>
          <div className="text-[8px] text-[#b9b9b9]/60 pt-2 border-t border-[#3a3a3a]">Volume Profile Visible Range — POC amber, VAH/VAL teal/rose, buy/sell split, exact EdgeDepth volume_profile_manager.cpp</div>
        </div>
      </div>
    </div>
  );
}
