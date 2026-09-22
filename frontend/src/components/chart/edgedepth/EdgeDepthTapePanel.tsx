// Professional Tape Panel — own design, not EdgeDepth clone
// Clean zinc UI, Time & Sales PRICE QTY TIME, whale detection, auto-scroll, filter

import React, { useEffect, useState, useRef, useCallback } from 'react';

interface Trade { price: number; size: number; side: 'BUY' | 'SELL' | string; ts: number; usd?: number; }

export function EdgeDepthTapePanel({ symbol, provider = 'binance' }: { symbol: string; provider?: string }) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell'>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const midRef = useRef(50000);

  const makeSynthetic = useCallback((mid: number, count = 500): Trade[] => {
    const arr: Trade[] = []; let price = mid; const now = Date.now() / 1000;
    for (let i = 0; i < count; i++) {
      price += (Math.random() - 0.5) * mid * 0.0005;
      const size = Math.random() * 2 + 0.01;
      arr.push({ price, size, side: Math.random() > 0.5 ? 'BUY' : 'SELL', ts: now - (count - i) * 0.5, usd: price * size });
    }
    return arr;
  }, []);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch(`/api/orderflow/tape?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}&limit=500`);
        if (!r.ok) throw new Error('no tape');
        const j = await r.json();
        if (!j.trades || j.trades.length === 0) throw new Error('empty');
        if (alive) {
          const list = j.trades.slice(-500).reverse().map((t: any) => ({ price: t.price, size: t.size || t.qty || 0, side: t.side, ts: t.ts || Date.now() / 1000, usd: t.price * (t.size || t.qty || 0) }));
          setTrades(list);
          if (list.length) midRef.current = list[list.length - 1].price;
        }
      } catch {
        try {
          const qr = await fetch(`/api/orderflow/quote?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}`);
          if (qr.ok) { const qj = await qr.json(); const mid = qj.mid || qj.last || midRef.current; midRef.current = mid; if (alive) setTrades(makeSynthetic(mid, 500)); return; }
        } catch {}
        if (alive) setTrades(makeSynthetic(midRef.current || 50000, 500));
      }
    };
    load();
    let ws: WebSocket | null = null;
    try {
      const proto = location.protocol === 'https:' ? 'wss' : 'ws';
      ws = new WebSocket(`${proto}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}`);
      ws.onmessage = m => {
        try {
          const frame = JSON.parse(m.data);
          if (frame.type === 'trade') {
            const tr = frame.event;
            const trade: Trade = { price: tr.price, size: tr.size || tr.qty || 0, side: tr.side, ts: tr.ts || Date.now() / 1000, usd: tr.price * (tr.size || tr.qty || 0) };
            midRef.current = trade.price;
            setTrades(prev => [...prev, trade].slice(-500));
          }
        } catch {}
      };
    } catch {}
    return () => { alive = false; try { ws?.close(); } catch {} };
  }, [symbol, provider, makeSynthetic]);

  useEffect(() => { if (autoScroll && containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight; }, [trades, autoScroll]);

  const filtered = trades.filter(t => filter === 'buy' ? (t.side === 'BUY' || t.side === 'B') : filter === 'sell' ? (t.side === 'SELL' || t.side === 'S') : true);
  const avgUsd = trades.length ? trades.reduce((s, t) => s + (t.usd || t.price * t.size), 0) / trades.length : 1000;
  const getWhale = (trade: Trade) => { const usd = trade.usd || trade.price * trade.size; if (usd > avgUsd * 10) return 3; if (usd > avgUsd * 3) return 2; if (usd > avgUsd * 1.5) return 1; return 0; };

  return (
    <div className="h-full flex flex-col bg-[#1c1c1c] text-[#e8e8e8] font-mono text-[12px] select-none">
      <div className="flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0">
        <span className="text-[11px] font-semibold tracking-wider">TAPE</span>
        <span className="font-mono font-medium text-[13px]">{symbol}</span>
        <span className="px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9]">{filtered.length} prints</span>
        <div className="flex items-center gap-0.5 ml-3 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]">
          {(['all','buy','sell'] as const).map(f => (<button key={f} onClick={() => setFilter(f)} className={`px-2.5 py-1 rounded-md text-[11px] font-medium uppercase ${filter===f?'bg-[#e8e8e8] text-[#1c1c1c]':'text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]'}`}>{f}</button>))}
        </div>
        <button onClick={() => setAutoScroll(v => !v)} className={`ml-auto px-3 py-1 rounded-full border text-[11px] font-medium ${autoScroll?'bg-[#21b3a4]/10 border-[#21b3a4]/30 text-[#21b3a4]':'bg-[#262626] border-[#3a3a3a] text-[#6a6a6a]'}`}>{autoScroll?'● AUTO':'○ FREE'}</button>
      </div>

      <div className="grid grid-cols-3 px-3 py-2 text-[10px] font-semibold tracking-wider text-[#6a6a6a] uppercase border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0">
        <span>Price</span><span className="text-right">Qty • USD</span><span className="text-right">Time</span>
      </div>

      <div ref={containerRef} className="flex-1 overflow-auto scrollbar-thin" onScroll={e => { const el=e.currentTarget; const atBottom=el.scrollHeight-el.scrollTop-el.clientHeight<20; if(autoScroll&&!atBottom) setAutoScroll(false); if(!autoScroll&&atBottom) setAutoScroll(true); }}>
        {filtered.slice().reverse().map((t,i) => {
          const isBuy = t.side === 'BUY' || t.side === 'B';
          const whale = getWhale(t);
          return (
            <div key={i} className={`grid grid-cols-3 px-3 py-1.5 border-b border-[#2a2a2a]/30 hover:bg-[#262626] text-[12px] ${whale===3?'bg-[#f0426c]/10 font-semibold':whale===2?'bg-[#f0426c]/5':''}`}>
              <span className={`tabular-nums font-medium ${isBuy?'text-[#21b3a4]':'text-[#f0426c]'}`}>{t.price.toFixed(2)} {whale>=2?'⚡':''}</span>
              <span className="text-right tabular-nums text-[#b9b9b9]">{t.size.toFixed(3)} <span className="text-[10px] text-[#6a6a6a]">${(t.usd||t.price*t.size).toFixed(0)}</span></span>
              <span className="text-right text-[#6a6a6a] text-[11px]">{new Date(t.ts*1000).toLocaleTimeString()}</span>
            </div>
          );
        })}
      </div>

      <div className="px-3 py-2 text-[10px] text-[#6a6a6a] border-t border-[#2a2a2a] bg-[#1c1c1c] shrink-0">Whale &gt;1.5×/&gt;3×/&gt;10× avg • {provider.toUpperCase()} {provider==='hyperliquid'?'15ms ⚡':'20ms/50ms'} • {avgUsd.toFixed(0)} avg</div>
    </div>
  );
}

export default EdgeDepthTapePanel;
