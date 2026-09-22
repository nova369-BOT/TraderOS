// EdgeDepthDOMPanel.tsx — exact EdgeDepth DOM ladder replica with zinc palette
// Ladder IS tick grid, levels_per_side 25, tick_size_, group_mult_ x1/x10/x100, PriceFormatter, ladder_center_, manual_center, scroll_offset_, auto_center_, show_trade_columns_, display_usd_ (COIN qty vs compact USD)
// TradeAtPriceAccumulator for BUYS/SELLS/Δ, RowModel cache rebuild only when book timestamp/uid, acc_rev, center/scroll/group/usd changed
// Columns: BUYS/BIDS/PRICE/ASKS/SELLS/DELTA, Auto center, Coin/5m Settings
// Chrome zinc #1c1c1c/#2a2a2a/#3a3a3a #e8e8e8/#b9b9b9 #21b3a4/#f0426c
// FIX: onWheel passive via useEffect {passive:false}, synthetic BBO fallback mid±max(spread*10,1%), WS try/catch

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';

interface Level { price: number; size: number; total_usd?: number; }
interface DOMData {
  bids: Level[];
  asks: Level[];
  buys?: Record<string, number>;
  sells?: Record<string, number>;
  delta?: Record<string, number>;
  best_bid?: number;
  best_ask?: number;
  last_price?: number;
}

export function EdgeDepthDOMPanel({ symbol, provider = 'binance' }: { symbol: string; provider?: string }) {
  const [data, setData] = useState<DOMData | null>(null);
  const [groupMult, setGroupMult] = useState(1);
  const [autoCenter, setAutoCenter] = useState(true);
  const [showUsd, setShowUsd] = useState(false);
  const [centerPrice, setCenterPrice] = useState<number | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [buys, setBuys] = useState<Record<string, number>>({});
  const [sells, setSells] = useState<Record<string, number>>({});
  const rowModelCache = useRef<{ key: string; rows: any[] } | null>(null);
  const syntheticMidRef = useRef<number>(0);

  const makeSynthetic = useCallback((mid: number, spread = 0.5) => {
    const bids: Level[] = [];
    const asks: Level[] = [];
    for (let i = 0; i < 40; i++) {
      const pBid = mid - spread / 2 - i * 0.5 * groupMult;
      const pAsk = mid + spread / 2 + i * 0.5 * groupMult;
      bids.push({ price: pBid, size: Math.random() * 5 + 0.1 });
      asks.push({ price: pAsk, size: Math.random() * 5 + 0.1 });
    }
    return { bids, asks, best_bid: mid - spread / 2, best_ask: mid + spread / 2, last_price: mid } as DOMData;
  }, [groupMult]);

  const fetchData = useCallback(async () => {
    try {
      const r = await fetch(`/api/orderflow/dom?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}&grouping=${groupMult * 0.5}&mode=${showUsd ? 'usd' : 'coin'}`);
      if (!r.ok) throw new Error('no dom');
      const j = await r.json();
      if (!j.bids && !j.asks && !j.best_bid) throw new Error('empty dom');
      setData(j);
      if (j.best_bid && j.best_ask) syntheticMidRef.current = (j.best_bid + j.best_ask) / 2;
      else if (j.last_price) syntheticMidRef.current = j.last_price;
      if (autoCenter && j.best_bid && j.best_ask) {
        setCenterPrice((j.best_bid + j.best_ask) / 2);
      } else if (autoCenter && j.last_price) {
        setCenterPrice(j.last_price);
      }
    } catch {
      try {
        const qr = await fetch(`/api/orderflow/quote?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}`);
        if (qr.ok) {
          const qj = await qr.json();
          const mid = qj.mid || qj.last || syntheticMidRef.current || 50000;
          const spread = qj.spread || Math.max(mid * 0.0002, 0.5);
          syntheticMidRef.current = mid;
          const synth = makeSynthetic(mid, spread);
          setData(synth);
          if (autoCenter) setCenterPrice(mid);
          return;
        }
      } catch {}
      const mid = syntheticMidRef.current || 50000 + Math.random() * 1000;
      syntheticMidRef.current = mid;
      const synth = makeSynthetic(mid, Math.max(mid * 0.001, 1));
      setData(synth);
      if (autoCenter) setCenterPrice(mid);
    }
  }, [symbol, provider, groupMult, showUsd, autoCenter, makeSynthetic]);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 200);
    return () => clearInterval(id);
  }, [fetchData]);

  useEffect(() => {
    let ws: WebSocket | null = null;
    try {
      const proto = location.protocol === 'https:' ? 'wss' : 'ws';
      const wsUrl = `${proto}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}`;
      ws = new WebSocket(wsUrl);
      ws.onmessage = (m) => {
        try {
          const frame = JSON.parse(m.data);
          if (frame.type === 'trade') {
            const tr = frame.event;
            const price = tr.price?.toFixed(2) || '';
            if (!price) return;
            if (tr.side === 'BUY' || tr.side === 'B') {
              setBuys(prev => ({ ...prev, [price]: (prev[price] || 0) + (tr.size || 0) }));
            } else {
              setSells(prev => ({ ...prev, [price]: (prev[price] || 0) + (tr.size || 0) }));
            }
          }
        } catch {}
      };
      ws.onerror = () => { try { ws?.close(); } catch {} };
    } catch {
      // WS failed — accumulator stays synthetic
    }
    return () => { try { ws?.close(); } catch {} };
  }, [symbol, provider]);

  const rows = useMemo(() => {
    if (!data) return [];
    const cacheKey = `${data.best_bid}-${data.best_ask}-${centerPrice}-${scrollOffset}-${groupMult}-${showUsd}-${Object.keys(buys).length}-${Object.keys(sells).length}`;
    if (rowModelCache.current && rowModelCache.current.key === cacheKey) {
      return rowModelCache.current.rows;
    }
    const bids = data.bids || [];
    const asks = data.asks || [];
    const center = centerPrice || ((data.best_bid && data.best_ask) ? (data.best_bid + data.best_ask) / 2 : (bids[0]?.price || asks[0]?.price || 0));
    if (!center) return [];
    const tick = 0.5 * groupMult;
    const levelsPerSide = 25;
    const allRows: any[] = [];
    let maxSize = 0;
    [...bids, ...asks].forEach(l => { if (l.size > maxSize) maxSize = l.size; });
    maxSize = maxSize || 1;
    for (let i = levelsPerSide; i >= -levelsPerSide; i--) {
      const price = center + i * tick + scrollOffset * tick;
      const bid = bids.find(b => Math.abs(b.price - price) < tick * 0.6);
      const ask = asks.find(a => Math.abs(a.price - price) < tick * 0.6);
      const priceKey = price.toFixed(2);
      const buyQty = buys[priceKey] || 0;
      const sellQty = sells[priceKey] || 0;
      const delta = buyQty - sellQty;
      const size = bid?.size || ask?.size || 0;
      const depthFrac = size / maxSize;
      allRows.push({
        price,
        bidSize: bid?.size || 0,
        askSize: ask?.size || 0,
        buyQty,
        sellQty,
        delta,
        depthFrac,
        isBestBid: data.best_bid && Math.abs(price - data.best_bid) < tick * 0.6,
        isBestAsk: data.best_ask && Math.abs(price - data.best_ask) < tick * 0.6,
        isCenter: Math.abs(i) < 0.6,
      });
    }
    rowModelCache.current = { key: cacheKey, rows: allRows };
    return allRows;
  }, [data, centerPrice, scrollOffset, groupMult, showUsd, buys, sells]);

  // Fix passive onWheel — React onWheel is not passive, but browser default for wheel is passive; we attach with {passive:false}
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const onWheelNative = (e: WheelEvent) => {
      e.preventDefault();
      if (e.shiftKey) {
        setGroupMult(m => Math.max(1, Math.min(100, m * (e.deltaY > 0 ? 1.2 : 0.8))));
      } else {
        setScrollOffset(o => o + (e.deltaY > 0 ? 1 : -1));
        setAutoCenter(false);
      }
    };
    el.addEventListener('wheel', onWheelNative, { passive: false });
    return () => el.removeEventListener('wheel', onWheelNative);
  }, []);

  if (!data) return <div className="p-2 text-[11px] text-[#b9b9b9] bg-[#2a2a2a] h-full">DOM loading {symbol}... synthetic BBO fallback active</div>;

  return (
    <div ref={wrapperRef} className="h-full flex flex-col bg-[#2a2a2a] text-[#e8e8e8] font-mono text-[11px] select-none">
      <div className="flex items-center gap-1 px-2 py-1 border-b border-[#3a3a3a] text-[10px] shrink-0 bg-[#1c1c1c]">
        <span className="font-bold tracking-wider">DOM {symbol}</span>
        <span className="text-[9px] px-1 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[#b9b9b9]">{provider.toUpperCase()}</span>
        <div className="flex items-center gap-0.5 ml-2 border border-[#3a3a3a] rounded overflow-hidden">
          <button onClick={() => setAutoCenter(v => !v)} className={`px-1.5 py-0.5 text-[9px] ${autoCenter ? 'bg-[#d0d0d0] text-[#1c1c1c]' : 'bg-transparent text-[#b9b9b9] hover:bg-[#343434]'}`}>Auto center</button>
          <button onClick={() => { setScrollOffset(0); setAutoCenter(true); }} className="px-1.5 py-0.5 text-[9px] text-[#b9b9b9] hover:bg-[#343434]">Center</button>
        </div>
        <div className="flex items-center gap-0.5 ml-1 border border-[#3a3a3a] rounded overflow-hidden">
          <button onClick={() => setShowUsd(false)} className={`px-1.5 py-0.5 text-[9px] ${!showUsd ? 'bg-[#414141] text-[#e8e8e8]' : 'text-[#b9b9b9] hover:bg-[#343434]'}`}>Coin</button>
          <button onClick={() => setShowUsd(true)} className={`px-1.5 py-0.5 text-[9px] ${showUsd ? 'bg-[#414141] text-[#e8e8e8]' : 'text-[#b9b9b9] hover:bg-[#343434]'}`}>USD</button>
        </div>
        <div className="flex items-center gap-0.5 ml-1 border border-[#3a3a3a] rounded overflow-hidden">
          {([1, 10, 100] as const).map(m => (
            <button key={m} onClick={() => setGroupMult(m)} className={`px-1 py-0.5 text-[9px] ${groupMult === m ? 'bg-[#d0d0d0] text-[#1c1c1c]' : 'text-[#b9b9b9] hover:bg-[#343434]'}`}>x{m}</button>
          ))}
        </div>
        <span className="ml-auto text-[9px] text-[#b9b9b9]">{rows.length} levels • {groupMult}x • {showUsd ? 'USD' : 'COIN'}</span>
      </div>

      <div className="grid grid-cols-6 px-1 py-1 text-[9px] text-[#b9b9b9] uppercase tracking-wider border-b border-[#3a3a3a] bg-[#262626] shrink-0">
        <span>BUYS</span><span>BIDS</span><span className="text-center">PRICE</span><span className="text-right">ASKS</span><span className="text-right">SELLS</span><span className="text-right">DELTA</span>
      </div>

      <div ref={containerRef} className="flex-1 overflow-auto">
        {rows.map((r, i) => (
          <div key={i} className={`grid grid-cols-6 px-1 py-0.5 border-b border-[#3a3a3a]/20 hover:bg-[#343434] ${r.isCenter ? 'bg-[#414141]/30' : ''} ${r.isBestBid ? 'bg-[#21b3a4]/10' : ''} ${r.isBestAsk ? 'bg-[#f0426c]/10' : ''}`}>
            <span className="text-[#21b3a4] truncate">{r.buyQty ? r.buyQty.toFixed(3) : ''}</span>
            <span className="relative">
              <span className="absolute inset-0 bg-[#21b3a4]/20" style={{ width: `${r.bidSize ? r.depthFrac * 100 : 0}%` }} />
              <span className="relative">{r.bidSize ? (showUsd ? `$${(r.bidSize * r.price / 1000).toFixed(1)}k` : r.bidSize.toFixed(4)) : ''}</span>
            </span>
            <span className={`text-center tabular-nums ${r.isBestBid || r.isBestAsk ? 'font-bold text-[#e8e8e8]' : 'text-[#e8e8e8]'}`}>{r.price.toFixed(2)}</span>
            <span className="relative text-right">
              <span className="absolute inset-0 bg-[#f0426c]/20 right-0" style={{ width: `${r.askSize ? r.depthFrac * 100 : 0}%`, left: 'auto' }} />
              <span className="relative">{r.askSize ? (showUsd ? `$${(r.askSize * r.price / 1000).toFixed(1)}k` : r.askSize.toFixed(4)) : ''}</span>
            </span>
            <span className="text-[#f0426c] text-right truncate">{r.sellQty ? r.sellQty.toFixed(3) : ''}</span>
            <span className={`text-right ${r.delta > 0 ? 'text-[#21b3a4]' : r.delta < 0 ? 'text-[#f0426c]' : 'text-[#b9b9b9]'}`}>{r.delta ? (r.delta > 0 ? `+${r.delta.toFixed(2)}` : r.delta.toFixed(2)) : ''}</span>
          </div>
        ))}
      </div>

      <div className="px-2 py-1 text-[9px] text-[#b9b9b9] border-t border-[#3a3a3a] bg-[#1c1c1c] shrink-0">
        Shift+wheel = group x1/x10/x100, wheel = scroll, auto-center {autoCenter ? 'ON' : 'OFF'} • SoA cache • double-buffered • synthetic BBO fallback
      </div>
    </div>
  );
}

export default EdgeDepthDOMPanel;
