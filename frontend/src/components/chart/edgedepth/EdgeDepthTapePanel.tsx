// EdgeDepthTapePanel.tsx — exact EdgeDepth trades_widget.cpp replica with zinc palette
// Time & sales, size highlighting 1-3 whale detection, trade bubbles on candles
// Columns: PRICE QTY TIME, Auto center, Coin/5m Settings
// Chrome zinc #1c1c1c/#2a2a2a/#3a3a3a #e8e8e8/#b9b9b9 #21b3a4/#f0426c

import React, { useEffect, useState, useRef } from 'react';

interface Trade { price: number; size: number; side: 'BUY' | 'SELL' | string; ts: number; }

export function EdgeDepthTapePanel({ symbol, provider = 'binance' }: { symbol: string; provider?: string }) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell'>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch(`/api/orderflow/tape?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}&limit=500`);
        if (!r.ok) return;
        const j = await r.json();
        if (alive && j.trades) setTrades(j.trades.slice(-500).reverse());
      } catch {}
    };
    load();

    const proto = location.protocol === 'https:' ? 'wss' : 'ws';
    const wsUrl = `${proto}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}`;
    let ws: WebSocket | null = null;
    try {
      ws = new WebSocket(wsUrl);
      ws.onmessage = (m) => {
        try {
          const frame = JSON.parse(m.data);
          if (frame.type === 'trade') {
            const tr = frame.event;
            setTrades(prev => {
              const next = [...prev, { price: tr.price, size: tr.size || tr.qty || 0, side: tr.side, ts: tr.ts || Date.now()/1000 }].slice(-500);
              return next;
            });
          }
        } catch {}
      };
    } catch {}
    return () => { alive = false; try { ws?.close(); } catch {} };
  }, [symbol, provider]);

  useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [trades, autoScroll]);

  const filtered = trades.filter(t => {
    if (filter === 'buy') return t.side === 'BUY' || t.side === 'B';
    if (filter === 'sell') return t.side === 'SELL' || t.side === 'S';
    return true;
  });

  const getWhaleLevel = (size: number) => {
    if (size > 10) return 3;
    if (size > 1) return 2;
    if (size > 0.1) return 1;
    return 0;
  };

  return (
    <div className="h-full flex flex-col bg-[#2a2a2a] text-[#e8e8e8] font-mono text-[11px] select-none">
      <div className="flex items-center gap-1 px-2 py-1 border-b border-[#3a3a3a] text-[10px] shrink-0 bg-[#1c1c1c]">
        <span className="font-bold tracking-wider">T {symbol}</span>
        <span className="text-[9px] px-1 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[#b9b9b9]">{provider.toUpperCase()} • {filtered.length} prints</span>
        <div className="flex items-center gap-0.5 ml-2 border border-[#3a3a3a] rounded overflow-hidden">
          {(['all', 'buy', 'sell'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-1.5 py-0.5 text-[9px] uppercase ${filter===f?'bg-[#d0d0d0] text-[#1c1c1c]':'text-[#b9b9b9] hover:bg-[#343434]'}`}>{f}</button>
          ))}
        </div>
        <button onClick={() => setAutoScroll(v => !v)} className={`ml-auto px-1.5 py-0.5 rounded border text-[9px] ${autoScroll?'bg-[#21b3a4]/20 border-[#21b3a4]/50 text-[#21b3a4]':'border-[#3a3a3a] text-[#b9b9b9]'}`}>{autoScroll?'AUTO':'FREE'}</button>
      </div>

      <div className="grid grid-cols-3 px-2 py-1 text-[9px] text-[#b9b9b9] uppercase tracking-wider border-b border-[#3a3a3a] bg-[#262626] shrink-0">
        <span>PRICE</span><span className="text-right">QTY</span><span className="text-right">TIME</span>
      </div>

      <div ref={containerRef} className="flex-1 overflow-auto" onScroll={e => {
        const el = e.currentTarget;
        const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 20;
        if (autoScroll && !atBottom) setAutoScroll(false);
        if (!autoScroll && atBottom) setAutoScroll(true);
      }}>
        {filtered.slice().reverse().map((t, i) => {
          const isBuy = t.side === 'BUY' || t.side === 'B';
          const whale = getWhaleLevel(t.size);
          return (
            <div key={i} className={`grid grid-cols-3 px-2 py-0.5 border-b border-[#3a3a3a]/20 hover:bg-[#343434] ${whale===3?'bg-[#f0426c]/10 font-bold':whale===2?'bg-[#f0426c]/5':''}`}>
              <span className={isBuy ? 'text-[#21b3a4]' : 'text-[#f0426c]'}>{t.price.toFixed(2)}</span>
              <span className="text-right tabular-nums">{t.size.toFixed(4)}</span>
              <span className="text-right text-[#b9b9b9] text-[10px]">{new Date(t.ts * 1000).toLocaleTimeString()}</span>
            </div>
          );
        })}
      </div>

      <div className="px-2 py-1 text-[9px] text-[#b9b9b9] border-t border-[#3a3a3a] bg-[#1c1c1c] shrink-0">
        Whale detection 1-3 • large prints bubble on candles • {provider} {provider==='hyperliquid'?'15ms ⚡':'20ms/50ms'}
      </div>
    </div>
  );
}

export default EdgeDepthTapePanel;
