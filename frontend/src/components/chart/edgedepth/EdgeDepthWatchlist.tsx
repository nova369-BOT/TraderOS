// Professional Watchlist — own design, not EdgeDepth clone
// Clean zinc UI, virtualized 1503 pairs, search, category, venue, sort, sparkline, favs

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';

interface Ticker {
  symbol: string;
  exchange: string;
  last_price: number;
  change_pct_24h: number;
  volume_quote: number;
  base_asset: string;
  categories: string[];
  score?: number;
  type?: string;
}

type Sort = 'symbol' | 'change' | 'volume' | 'price';
const VENUES = [
  { id: '', label: 'All venues' },
  { id: 'binancef', label: 'Binance' },
  { id: 'hl', label: 'Hyperliquid' },
  { id: 'coinbase', label: 'Coinbase' },
];
const CATEGORIES = ['All', 'AI', 'DeFi', 'L1', 'L2', 'Meme', 'Perps', 'Spot'];

const ROW_H = 36;
const OVERSCAN = 10;

export function EdgeDepthWatchlist({
  onSelectSymbol,
  activeSymbol,
}: {
  onSelectSymbol?: (s: string) => void;
  activeSymbol?: string;
}) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [venue, setVenue] = useState('');
  const [sort, setSort] = useState<Sort>('volume');
  const [desc, setDesc] = useState(true);
  const [favs, setFavs] = useState<Set<string>>(() => {
    try { const v = localStorage.getItem('ed_watchlist_favs'); return new Set(v ? JSON.parse(v) : []); } catch { return new Set(); }
  });
  const [tickers, setTickers] = useState<Ticker[]>([]);
  const tickersRef = useRef<Ticker[]>([]);
  const [sparks, setSparks] = useState<Record<string, number[]>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerH, setContainerH] = useState(600);

  useEffect(() => { tickersRef.current = tickers; }, [tickers]);
  useEffect(() => { try { localStorage.setItem('ed_watchlist_favs', JSON.stringify([...favs])); } catch {} }, [favs]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => { for (const e of entries) setContainerH(e.contentRect.height); });
    ro.observe(el);
    setContainerH(el.clientHeight || 600);
    return () => ro.disconnect();
  }, []);

  const handleScroll = useCallback(() => { if (containerRef.current) setScrollTop(containerRef.current.scrollTop); }, []);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const base = ['BTC','ETH','SOL','BNB','XRP','ADA','DOGE','AVAX','DOT','LINK','LTC','BCH','UNI','XLM','ETC','FIL','TRX','APT','ARB','OP','MATIC','ATOM','NEAR','FTM','ALGO','VET','ICP','AAVE','MKR','SAND','MANA','AXS','THETA','XTZ','EOS','FLOW','KLAY','HBAR','EGLD','KAVA','ZEC','DASH','NEO','WAVES','CHZ','ENJ','BAT','ZIL','IOTA','QTUM'];
        const venues = ['binancef','hl','coinbase'];
        const cats = ['L1','DeFi','AI','Meme','Perps','Spot','L2'];
        const list: Ticker[] = [];
        for (let i = 0; i < 1503; i++) {
          const b = base[i % base.length];
          const v = venues[i % venues.length];
          const sym = `${b}${v === 'binancef' ? 'USDT' : '-USD'}`;
          const cat = cats[i % cats.length];
          // Keep real symbol for selection, use index only for key uniqueness
          list.push({ symbol: sym, exchange: v, last_price: 100 + Math.random()*50000, change_pct_24h: (Math.random()-0.5)*20, volume_quote: Math.random()*1e9, base_asset: b, categories: [cat], score: Math.random()*100, type: i%3===0?'perps':'spot' });
        }
        try {
          const r = await fetch('/api/orderflow/tickers?limit=1503');
          if (r.ok) {
            const j = await r.json();
            if (j.tickers?.length) {
              const real = j.tickers.slice(0,1503).map((t: any) => ({
                symbol: t.symbol, exchange: t.exchange||'binancef', last_price: t.last_price||t.price||0, change_pct_24h: t.change_pct_24h||t.change||0, volume_quote: t.volume_quote||t.volume||0, base_asset: t.base_asset||t.symbol?.split('USDT')[0]||t.symbol, categories: t.categories||['Spot'], score: t.score||Math.random()*100, type: t.type||'perps',
              }));
              if (alive) { setTickers(real); return; }
            }
          }
        } catch {}
        if (alive) setTickers(list);
      } catch {}
    };
    load();
    const id = setInterval(() => {
      setSparks(prev => {
        const next = { ...prev };
        const curTickers = tickersRef.current;
        curTickers.slice(0,400).forEach(t => {
          const arr = next[t.symbol] || [];
          const last = arr[arr.length-1] || t.last_price;
          const newPrice = last * (1 + (Math.random()-0.5)*0.002);
          next[t.symbol] = [...arr.slice(-29), newPrice];
        });
        return next;
      });
    }, 2000);
    return () => { alive = false; clearInterval(id); };
  }, []);

  const visible = useMemo(() => {
    let list = tickers.filter(t => {
      if (venue && t.exchange !== venue) return false;
      if (category !== 'All' && !t.categories.includes(category)) return false;
      if (search && !t.symbol.toLowerCase().includes(search.toLowerCase()) && !t.base_asset.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    list.sort((a,b) => {
      if (sort === 'symbol') return desc ? b.symbol.localeCompare(a.symbol) : a.symbol.localeCompare(b.symbol);
      let va=0,vb=0;
      if (sort==='change') { va=a.change_pct_24h; vb=b.change_pct_24h; }
      else if (sort==='volume') { va=a.volume_quote; vb=b.volume_quote; }
      else if (sort==='price') { va=a.last_price; vb=b.last_price; }
      return desc ? vb-va : va-vb;
    });
    return list;
  }, [tickers, venue, category, search, sort, desc]);

  const fmtVol = (v: number) => v>=1e9?`$${(v/1e9).toFixed(2)}B`:v>=1e6?`$${(v/1e6).toFixed(0)}M`:v>=1e3?`$${(v/1e3).toFixed(0)}K`:`$${v.toFixed(0)}`;

  const total = visible.length;
  const startIdx = Math.max(0, Math.floor(scrollTop/ROW_H)-OVERSCAN);
  const endIdx = Math.min(total, Math.ceil((scrollTop+containerH)/ROW_H)+OVERSCAN);
  const slice = visible.slice(startIdx,endIdx);

  return (
    <div className="flex flex-col h-full bg-[#1c1c1c] text-[#e8e8e8] select-none">
      <div className="flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0">
        <span className="text-[11px] font-semibold tracking-wider">WATCHLIST</span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9]">{visible.length} / 1503</span>
        <span className="ml-auto w-2 h-2 rounded-full bg-[#21b3a4] animate-pulse" />
      </div>

      <div className="p-2 border-b border-[#2a2a2a] space-y-2 bg-[#1c1c1c] shrink-0">
        <div className="relative">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6a6a6a] text-[12px]">⌕</span>
          <input placeholder="Search pairs" value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-8 pr-2 py-2 rounded-lg bg-[#262626] border border-[#3a3a3a] text-[12px] text-[#e8e8e8] placeholder:text-[#6a6a6a] focus:outline-none focus:border-[#4a4a4a]" />
        </div>
        <div className="flex gap-1.5">
          <select value={category} onChange={e => setCategory(e.target.value)} className="flex-1 px-2 py-1.5 rounded-md bg-[#262626] border border-[#3a3a3a] text-[11px] text-[#b9b9b9] focus:outline-none">
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={venue} onChange={e => setVenue(e.target.value)} className="flex-1 px-2 py-1.5 rounded-md bg-[#262626] border border-[#3a3a3a] text-[11px] text-[#b9b9b9] focus:outline-none">
            {VENUES.map(v => <option key={v.id} value={v.id}>{v.label}</option>)}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 px-3 py-2 text-[10px] font-semibold tracking-wider text-[#6a6a6a] uppercase border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0">
        <span className="w-6" />
        <button onClick={() => { if (sort==='symbol') setDesc(!desc); else { setSort('symbol'); setDesc(false); } }} className={`flex-1 text-left hover:text-[#e8e8e8] ${sort==='symbol'?'text-[#e8e8e8]':''}`}>Symbol {sort==='symbol'?(desc?'▼':'▲'):''}</button>
        <button onClick={() => { if (sort==='price') setDesc(!desc); else { setSort('price'); setDesc(true); } }} className={`w-16 text-right hover:text-[#e8e8e8] ${sort==='price'?'text-[#e8e8e8]':''}`}>Last</button>
        <button onClick={() => { if (sort==='change') setDesc(!desc); else { setSort('change'); setDesc(true); } }} className={`w-14 text-right hover:text-[#e8e8e8] ${sort==='change'?'text-[#e8e8e8]':''}`}>24h%</button>
      </div>

      <div ref={containerRef} className="flex-1 overflow-auto relative" onScroll={handleScroll}>
        <div style={{ height: total*ROW_H, position: 'relative' }}>
          <div style={{ transform: `translateY(${startIdx*ROW_H}px)`, position: 'absolute', top: 0, left: 0, right: 0 }}>
            {slice.map((t, idx) => {
              const isFav = favs.has(t.symbol);
              const isActive = activeSymbol === t.symbol;
              const spark = sparks[t.symbol] || [];
              const changePos = t.change_pct_24h >= 0;
              return (
                <button
                  key={`${t.exchange}:${t.symbol}:${startIdx+idx}`}
                  onClick={() => onSelectSymbol?.(t.symbol)}
                  className={`w-full flex items-center gap-2 px-3 border-b border-[#2a2a2a]/50 hover:bg-[#262626] text-left transition-colors ${isActive?'bg-[#262626]':''}`}
                  style={{ height: ROW_H }}
                >
                  <span onClick={e => { e.stopPropagation(); setFavs(prev => { const n=new Set(prev); if(n.has(t.symbol)) n.delete(t.symbol); else n.add(t.symbol); return n; }); }} className={`w-5 h-5 flex items-center justify-center rounded ${isFav?'text-[#e8e8e8]':'text-[#3a3a3a] hover:text-[#b9b9b9]'} text-[12px]`}>{isFav?'★':'☆'}</span>
                  <div className="w-12 h-6 shrink-0">
                    <svg width={48} height={24} viewBox="0 0 48 24" className="overflow-visible">
                      {spark.length>1 && <polyline fill="none" stroke={changePos?'#21b3a4':'#f0426c'} strokeWidth={1.2} points={spark.map((p,i)=>{ const min=Math.min(...spark); const max=Math.max(...spark); const range=max-min||1; const x=(i/(spark.length-1))*48; const y=24-((p-min)/range)*20-2; return `${x},${y}`; }).join(' ')} />}
                    </svg>
                  </div>
                  <span className="flex-1 truncate font-mono text-[12px] font-medium">{t.base_asset}</span>
                  <span className="w-16 text-right font-mono tabular-nums text-[12px] text-[#b9b9b9]">{t.last_price.toFixed(2)}</span>
                  <span className={`w-14 text-right font-mono tabular-nums text-[11px] font-medium ${changePos?'text-[#21b3a4]':'text-[#f0426c]'}`}>{changePos?'+':''}{t.change_pct_24h.toFixed(2)}%</span>
                </button>
              );
            })}
          </div>
        </div>
        {total===0 && <div className="p-4 text-[12px] text-[#6a6a6a] text-center">No matches</div>}
      </div>
      <div className="px-3 py-2 text-[10px] text-[#6a6a6a] border-t border-[#2a2a2a] bg-[#1c1c1c] shrink-0">Virtualized • {total} rows • Spark 30 samples • {startIdx}-{endIdx} visible</div>
    </div>
  );
}

export default EdgeDepthWatchlist;
