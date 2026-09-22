// Professional DOM Panel — own design, not EdgeDepth clone
// Clean zinc UI, ladder with 25 levels per side, grouping, auto-center, USD/Coin, trade columns

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';

interface Level { price: number; size: number; }
interface DOMData { bids: Level[]; asks: Level[]; best_bid?: number; best_ask?: number; last_price?: number; }

export function EdgeDepthDOMPanel({ symbol, provider = 'binance' }: { symbol: string; provider?: string }) {
  const [data, setData] = useState<DOMData | null>(null);
  const [groupMult, setGroupMult] = useState(1);
  const [autoCenter, setAutoCenter] = useState(true);
  const [showUsd, setShowUsd] = useState(false);
  const [centerPrice, setCenterPrice] = useState<number | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [buys, setBuys] = useState<Record<string, number>>({});
  const [sells, setSells] = useState<Record<string, number>>({});
  const rowCache = useRef<{ key: string; rows: any[] } | null>(null);
  const midRef = useRef<number>(0);

  const makeSynthetic = useCallback((mid: number, spread = 0.5) => {
    const bids: Level[] = []; const asks: Level[] = [];
    for (let i = 0; i < 40; i++) {
      bids.push({ price: mid - spread/2 - i*0.5*groupMult, size: Math.random()*5+0.1 });
      asks.push({ price: mid + spread/2 + i*0.5*groupMult, size: Math.random()*5+0.1 });
    }
    return { bids, asks, best_bid: mid-spread/2, best_ask: mid+spread/2, last_price: mid } as DOMData;
  }, [groupMult]);

  const fetchData = useCallback(async () => {
    try {
      const r = await fetch(`/api/orderflow/dom?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}&grouping=${groupMult*0.5}&mode=${showUsd?'usd':'coin'}`);
      if (!r.ok) throw new Error('no dom');
      const j = await r.json();
      if (!j.bids && !j.asks) throw new Error('empty');
      setData(j);
      if (j.best_bid && j.best_ask) midRef.current = (j.best_bid+j.best_ask)/2;
      else if (j.last_price) midRef.current = j.last_price;
      if (autoCenter) {
        if (j.best_bid && j.best_ask) setCenterPrice((j.best_bid+j.best_ask)/2);
        else if (j.last_price) setCenterPrice(j.last_price);
      }
    } catch {
      try {
        const qr = await fetch(`/api/orderflow/quote?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}`);
        if (qr.ok) {
          const qj = await qr.json();
          const mid = qj.mid || qj.last || midRef.current || 50000;
          const spread = qj.spread || Math.max(mid*0.0002, 0.5);
          midRef.current = mid;
          const synth = makeSynthetic(mid, spread);
          setData(synth);
          if (autoCenter) setCenterPrice(mid);
          return;
        }
      } catch {}
      const mid = midRef.current || 50000 + Math.random()*1000;
      midRef.current = mid;
      const synth = makeSynthetic(mid, Math.max(mid*0.001, 1));
      setData(synth);
      if (autoCenter) setCenterPrice(mid);
    }
  }, [symbol, provider, groupMult, showUsd, autoCenter, makeSynthetic]);

  useEffect(() => { fetchData(); const id=setInterval(fetchData,200); return ()=>clearInterval(id); }, [fetchData]);

  useEffect(() => {
    let ws: WebSocket|null=null;
    try {
      const proto = location.protocol==='https:'?'wss':'ws';
      ws = new WebSocket(`${proto}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(provider)}`);
      ws.onmessage = m => {
        try {
          const frame = JSON.parse(m.data);
          if (frame.type==='trade') {
            const tr=frame.event; const price=tr.price?.toFixed(2)||'';
            if (!price) return;
            if (tr.side==='BUY'||tr.side==='B') setBuys(p=>({...p,[price]:(p[price]||0)+(tr.size||0)}));
            else setSells(p=>({...p,[price]:(p[price]||0)+(tr.size||0)}));
          }
        } catch {}
      };
    } catch {}
    return ()=>{ try{ ws?.close(); }catch{} };
  }, [symbol, provider]);

  const rows = useMemo(() => {
    if (!data) return [];
    const key = `${data.best_bid}-${data.best_ask}-${centerPrice}-${scrollOffset}-${groupMult}-${Object.keys(buys).length}`;
    if (rowCache.current && rowCache.current.key===key) return rowCache.current.rows;
    const bids=data.bids||[]; const asks=data.asks||[];
    const center = centerPrice || ((data.best_bid&&data.best_ask)?(data.best_bid+data.best_ask)/2:(bids[0]?.price||asks[0]?.price||0));
    if (!center) return [];
    const tick=0.5*groupMult; const levels=25; const all:any[]=[];
    let max=0; [...bids,...asks].forEach(l=>{ if(l.size>max) max=l.size; }); max=max||1;
    for (let i=levels;i>=-levels;i--) {
      const price=center+i*tick+scrollOffset*tick;
      const bid=bids.find(b=>Math.abs(b.price-price)<tick*0.6);
      const ask=asks.find(a=>Math.abs(a.price-price)<tick*0.6);
      const pk=price.toFixed(2);
      const buy=buys[pk]||0; const sell=sells[pk]||0;
      all.push({ price, bidSize:bid?.size||0, askSize:ask?.size||0, buyQty:buy, sellQty:sell, delta:buy-sell, depth: (bid?.size||ask?.size||0)/max, isBestBid:data.best_bid&&Math.abs(price-data.best_bid)<tick*0.6, isBestAsk:data.best_ask&&Math.abs(price-data.best_ask)<tick*0.6, isCenter:Math.abs(i)<0.6 });
    }
    rowCache.current={key,rows:all}; return all;
  }, [data, centerPrice, scrollOffset, groupMult, buys, sells]);

  useEffect(() => {
    const el=wrapperRef.current; if(!el) return;
    const onWheel=(e:WheelEvent)=>{ e.preventDefault(); if(e.shiftKey) setGroupMult(m=>Math.max(1,Math.min(100,m*(e.deltaY>0?1.2:0.8)))); else { setScrollOffset(o=>o+(e.deltaY>0?1:-1)); setAutoCenter(false); } };
    el.addEventListener('wheel',onWheel,{passive:false}); return ()=>el.removeEventListener('wheel',onWheel);
  }, []);

  if (!data) return <div className="p-4 text-[12px] text-[#b9b9b9] bg-[#1c1c1c] h-full flex items-center justify-center">Loading DOM {symbol}...</div>;

  return (
    <div ref={wrapperRef} className="h-full flex flex-col bg-[#1c1c1c] text-[#e8e8e8] font-mono text-[12px] select-none">
      <div className="flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0">
        <span className="font-semibold tracking-wider text-[11px]">DOM</span>
        <span className="font-mono font-medium text-[13px]">{symbol}</span>
        <span className="px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9]">{provider.toUpperCase()}</span>
        <div className="flex items-center gap-1 ml-3 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]">
          <button onClick={()=>setAutoCenter(v=>!v)} className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${autoCenter?'bg-[#e8e8e8] text-[#1c1c1c]':'bg-transparent text-[#b9b9b9] hover:bg-[#343434]'}`}>Auto</button>
          <button onClick={()=>{setScrollOffset(0);setAutoCenter(true);}} className="px-2.5 py-1 rounded-md text-[11px] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]">Center</button>
        </div>
        <div className="flex items-center gap-0.5 ml-1 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]">
          <button onClick={()=>setShowUsd(false)} className={`px-2 py-1 rounded-md text-[11px] ${!showUsd?'bg-[#e8e8e8] text-[#1c1c1c]':'text-[#b9b9b9] hover:bg-[#343434]'}`}>Coin</button>
          <button onClick={()=>setShowUsd(true)} className={`px-2 py-1 rounded-md text-[11px] ${showUsd?'bg-[#e8e8e8] text-[#1c1c1c]':'text-[#b9b9b9] hover:bg-[#343434]'}`}>USD</button>
        </div>
        <div className="flex items-center gap-0.5 ml-1 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]">
          {([1,10,100] as const).map(m=><button key={m} onClick={()=>setGroupMult(m)} className={`px-2 py-1 rounded-md text-[11px] ${groupMult===m?'bg-[#e8e8e8] text-[#1c1c1c]':'text-[#b9b9b9] hover:bg-[#343434]'}`}>×{m}</button>)}
        </div>
        <span className="ml-auto text-[10px] text-[#6a6a6a]">{rows.length} levels • {groupMult}×</span>
      </div>

      <div className="grid grid-cols-6 px-3 py-2 text-[10px] font-semibold tracking-wider text-[#6a6a6a] uppercase border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0">
        <span>Buys</span><span>Bids</span><span className="text-center">Price</span><span className="text-right">Asks</span><span className="text-right">Sells</span><span className="text-right">Delta</span>
      </div>

      <div className="flex-1 overflow-auto scrollbar-thin">
        {rows.map((r,i)=>(
          <div key={i} className={`grid grid-cols-6 px-3 py-1.5 border-b border-[#2a2a2a]/30 hover:bg-[#262626] text-[12px] ${r.isCenter?'bg-[#262626]/50':''} ${r.isBestBid?'bg-[#21b3a4]/5':''} ${r.isBestAsk?'bg-[#f0426c]/5':''}`}>
            <span className="text-[#21b3a4] tabular-nums">{r.buyQty?r.buyQty.toFixed(2):''}</span>
            <span className="relative tabular-nums"><span className="absolute inset-0 bg-[#21b3a4]/15 rounded" style={{width:`${r.bidSize?r.depth*100:0}%`}} /><span className="relative">{r.bidSize?(showUsd?`$${(r.bidSize*r.price/1000).toFixed(1)}k`:r.bidSize.toFixed(3)):''}</span></span>
            <span className={`text-center tabular-nums font-medium ${r.isBestBid||r.isBestAsk?'text-[#e8e8e8]':''}`}>{r.price.toFixed(2)}</span>
            <span className="relative text-right tabular-nums"><span className="absolute inset-0 bg-[#f0426c]/15 rounded right-0" style={{width:`${r.askSize?r.depth*100:0}%`,left:'auto'}} /><span className="relative">{r.askSize?(showUsd?`$${(r.askSize*r.price/1000).toFixed(1)}k`:r.askSize.toFixed(3)):''}</span></span>
            <span className="text-[#f0426c] text-right tabular-nums">{r.sellQty?r.sellQty.toFixed(2):''}</span>
            <span className={`text-right tabular-nums font-medium ${r.delta>0?'text-[#21b3a4]':r.delta<0?'text-[#f0426c]':'text-[#6a6a6a]'}`}>{r.delta?(r.delta>0?`+${r.delta.toFixed(1)}`:r.delta.toFixed(1)):''}</span>
          </div>
        ))}
      </div>

      <div className="px-3 py-2 text-[10px] text-[#6a6a6a] border-t border-[#2a2a2a] bg-[#1c1c1c] shrink-0">Shift+wheel grouping • Wheel scroll • Auto-center {autoCenter?'ON':'OFF'} • {provider.toUpperCase()} {groupMult}×</div>
    </div>
  );
}

export default EdgeDepthDOMPanel;
