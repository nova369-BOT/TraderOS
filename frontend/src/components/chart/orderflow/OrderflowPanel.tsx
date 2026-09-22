import React, { useEffect, useState, useRef, useCallback } from 'react';

type Props = {
  symbol: string;
  provider?: string; // binance | coinbase | hyperliquid
  colors?: any;
};

type Tab = 'dom' | 'tape' | 'footprint' | 'vpvr' | 'tpo' | 'cvd' | 'liquidations' | 'full';

const TABS: { id: Tab; label: string; desc: string }[] = [
  { id: 'dom', label: 'DOM', desc: 'Ladder grouping USD/coin + trade columns' },
  { id: 'tape', label: 'Tape', desc: 'Time & Sales size highlighting' },
  { id: 'footprint', label: 'Footprint', desc: 'Per-price per-minute buy/sell delta imbalance' },
  { id: 'vpvr', label: 'VPVR', desc: 'Volume Profile POC/VAH/VAL' },
  { id: 'tpo', label: 'TPO', desc: 'Market Profile 30m sessions' },
  { id: 'cvd', label: 'CVD', desc: 'Cumulative Volume Delta' },
  { id: 'liquidations', label: 'Liq Field', desc: 'Modelled + real liquidation levels' },
  { id: 'full', label: 'Full', desc: 'All orderflow combined' },
];

function useOrderflowFetch(symbol: string, provider: string, tab: Tab, refreshMs = 2000) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<any>(null);

  const fetchTab = useCallback(async () => {
    if (!symbol) return;
    const prov = provider ? `&provider=${encodeURIComponent(provider)}` : '';
    let url = '';
    switch (tab) {
      case 'dom': url = `/api/orderflow/dom?symbol=${encodeURIComponent(symbol)}${prov}&grouping=0.5&mode=usd`; break;
      case 'tape': url = `/api/orderflow/tape?symbol=${encodeURIComponent(symbol)}${prov}&limit=100`; break;
      case 'footprint': url = `/api/orderflow/footprint?symbol=${encodeURIComponent(symbol)}${prov}`; break;
      case 'vpvr': url = `/api/orderflow/volume_profile?symbol=${encodeURIComponent(symbol)}${prov}`; break;
      case 'tpo': url = `/api/orderflow/tpo?symbol=${encodeURIComponent(symbol)}${prov}`; break;
      case 'cvd': url = `/api/orderflow/cvd?symbol=${encodeURIComponent(symbol)}${prov}`; break;
      case 'liquidations': url = `/api/orderflow/liquidations?symbol=${encodeURIComponent(symbol)}${prov}`; break;
      case 'full': url = `/api/orderflow/full?symbol=${encodeURIComponent(symbol)}${prov}`; break;
    }
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const j = await r.json();
      setData(j);
      setError(null);
    } catch (e: any) {
      setError(String(e.message || e));
    } finally {
      setLoading(false);
    }
  }, [symbol, provider, tab]);

  useEffect(() => {
    setLoading(true);
    fetchTab();
    timer.current = setInterval(fetchTab, refreshMs);
    return () => clearInterval(timer.current);
  }, [fetchTab, refreshMs]);

  return { data, loading, error, refresh: fetchTab };
}

function DOMView({ data }: { data: any }) {
  if (!data) return <div className="p-2 text-xs opacity-60">No DOM data</div>;
  const bids = data.bids || data.ladder?.bids || [];
  const asks = data.asks || data.ladder?.asks || [];
  const bestBid = data.best_bid || data.bestBid || 0;
  const bestAsk = data.best_ask || data.bestAsk || 0;
  const mid = data.mid || (bestBid && bestAsk ? (bestBid + bestAsk) / 2 : 0);
  return (
    <div className="flex flex-col h-full text-[11px] font-mono">
      <div className="flex justify-between p-1 border-b border-border/40 text-[10px] opacity-70">
        <span>BID {bestBid?.toFixed?.(2)}</span><span>MID {mid?.toFixed?.(2)}</span><span>ASK {bestAsk?.toFixed?.(2)}</span>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-2 gap-0">
          <div>
            <div className="sticky top-0 bg-card/90 backdrop-blur px-1 py-0.5 text-[9px] opacity-60">ASKS</div>
            {asks.slice(0, 30).reverse().map((l: any, i: number) => (
              <div key={i} className="flex justify-between px-1 py-0.5 hover:bg-muted/20 border-b border-border/10">
                <span className="text-rose-400">{Number(l.price || l[0]).toFixed(2)}</span>
                <span>{Number(l.qty || l.size || l[1]).toFixed(4)}</span>
                <span className="opacity-60">{l.total_usd ? `$${(l.total_usd/1000).toFixed(1)}k` : ''}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="sticky top-0 bg-card/90 backdrop-blur px-1 py-0.5 text-[9px] opacity-60">BIDS</div>
            {bids.slice(0, 30).map((l: any, i: number) => (
              <div key={i} className="flex justify-between px-1 py-0.5 hover:bg-muted/20 border-b border-border/10">
                <span className="text-emerald-400">{Number(l.price || l[0]).toFixed(2)}</span>
                <span>{Number(l.qty || l.size || l[1]).toFixed(4)}</span>
                <span className="opacity-60">{l.total_usd ? `$${(l.total_usd/1000).toFixed(1)}k` : ''}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TapeView({ data }: { data: any }) {
  const trades = data?.trades || data?.tape || [];
  return (
    <div className="h-full overflow-auto text-[11px] font-mono">
      <div className="grid grid-cols-4 sticky top-0 bg-card px-1 py-0.5 text-[9px] opacity-60 border-b border-border/40">
        <span>TIME</span><span>PRICE</span><span>SIZE</span><span>SIDE</span>
      </div>
      {trades.map((t: any, i: number) => {
        const hl = t.highlight || 0;
        const bg = hl === 3 ? 'bg-amber-500/20' : hl === 2 ? 'bg-amber-500/10' : hl === 1 ? 'bg-muted/30' : '';
        const side = t.is_buy ?? t.side === 'BUY' ?? t.side === 'B';
        return (
          <div key={i} className={`grid grid-cols-4 px-1 py-0.5 border-b border-border/10 ${bg}`}>
            <span className="opacity-60">{new Date(t.timestamp_ms || t.ts*1000).toLocaleTimeString()}</span>
            <span className={side ? 'text-emerald-400' : 'text-rose-400'}>{Number(t.price).toFixed(2)}</span>
            <span className={hl ? 'font-bold' : ''}>{Number(t.qty || t.size).toFixed(4)}</span>
            <span>{side ? 'BUY' : 'SELL'}</span>
          </div>
        );
      })}
    </div>
  );
}

function FootprintView({ data }: { data: any }) {
  const cols = data?.columns || data?.footprint?.columns || [];
  if (!cols.length) return <div className="p-2 text-xs opacity-60">No footprint yet — waiting for trades</div>;
  return (
    <div className="h-full overflow-auto text-[10px] font-mono">
      <div className="flex gap-1 p-1">
        {cols.slice(-12).map((c: any, ci: number) => (
          <div key={ci} className="flex flex-col border border-border/20 min-w-[60px]">
            <div className="text-[8px] px-1 py-0.5 bg-muted/20">{new Date(c.timestamp_ms || c.ts*1000).toLocaleTimeString()}</div>
            {(c.levels || []).slice(0, 20).map((lv: any, li: number) => {
              const delta = (lv.buy || 0) - (lv.sell || 0);
              const imb = lv.imbalance || (lv.buy > lv.sell*1.5 ? 'buy' : lv.sell > lv.buy*1.5 ? 'sell' : '');
              return (
                <div key={li} className={`flex justify-between px-1 ${imb==='buy'?'bg-emerald-500/15':imb==='sell'?'bg-rose-500/15':''} ${lv.is_poc?'ring-1 ring-amber-400/50':''}`}>
                  <span className={delta>0?'text-emerald-400':'text-rose-400'}>{lv.price?.toFixed?.(1) || lv.price}</span>
                  <span>{delta>0?`+${delta.toFixed(2)}`:delta.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function VPVRView({ data }: { data: any }) {
  const levels = data?.levels || data?.volume_profile?.levels || [];
  if (!levels.length) return <div className="p-2 text-xs opacity-60">No VPVR yet</div>;
  const maxVol = Math.max(...levels.map((l: any) => l.total || l.volume || 0), 1);
  return (
    <div className="h-full overflow-auto text-[10px] font-mono p-1">
      {levels.map((lv: any, i: number) => {
        const vol = lv.total || lv.volume || 0;
        const pct = (vol / maxVol) * 100;
        return (
          <div key={i} className={`flex items-center gap-1 py-0.5 ${lv.is_poc?'bg-amber-500/20 font-bold':''} ${lv.in_value_area?'bg-muted/20':''}`}>
            <span className="w-16 text-right">{Number(lv.price).toFixed(2)}</span>
            <div className="flex-1 h-2 bg-muted/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-sky-500/40" style={{ width: `${pct}%` }} />
              <div className="absolute top-0 left-0 h-full bg-emerald-500/30" style={{ width: `${((lv.buy||0)/maxVol)*100}%` }} />
            </div>
            <span className="w-12 text-right opacity-70">{vol.toFixed(2)}</span>
            {lv.is_poc && <span className="text-[8px] bg-amber-500 text-black px-1 rounded">POC</span>}
            {lv.is_vah && <span className="text-[8px] bg-sky-500/30 px-1 rounded">VAH</span>}
            {lv.is_val && <span className="text-[8px] bg-sky-500/30 px-1 rounded">VAL</span>}
          </div>
        );
      })}
    </div>
  );
}

function TPOView({ data }: { data: any }) {
  const sessions = data?.sessions || data?.tpo?.sessions || [];
  if (!sessions.length) return <div className="p-2 text-xs opacity-60">No TPO sessions — need 30m candles</div>;
  return (
    <div className="h-full overflow-auto text-[10px] font-mono p-1 space-y-3">
      {sessions.slice(-3).map((s: any, si: number) => (
        <div key={si} className="border border-border/20">
          <div className="px-2 py-1 bg-muted/20 flex justify-between text-[9px]">
            <span>Session {new Date(s.start_ms || s.start*1000).toLocaleDateString()}</span>
            <span>POC {s.poc?.toFixed?.(2)} | VA {s.vah?.toFixed?.(2)}-{s.val?.toFixed?.(2)}</span>
          </div>
          <div className="p-1">
            {(s.rows || []).slice(0, 30).map((r: any, ri: number) => (
              <div key={ri} className="flex items-center gap-1">
                <span className="w-14 text-right">{Number(r.price).toFixed(2)}</span>
                <span className="flex gap-px">
                  {(r.blocks || r.tpos || '').toString().split('').map((b: string, bi: number) => (
                    <span key={bi} className="w-2 h-2 bg-sky-500/60 inline-block text-[6px] text-center">{b}</span>
                  ))}
                </span>
                {r.is_poc && <span className="text-amber-400">*</span>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CVDView({ data }: { data: any }) {
  const bars = data?.bars || data?.cvd?.bars || [];
  const points = data?.points || data?.cvd?.points || [];
  if (!bars.length && !points.length) return <div className="p-2 text-xs opacity-60">No CVD yet</div>;
  const last = bars[bars.length-1];
  return (
    <div className="h-full overflow-auto text-[11px] font-mono p-2">
      <div className="mb-2 p-2 bg-muted/20 rounded flex justify-between">
        <span>CVD: <span className={(last?.cvd||0)>=0?'text-emerald-400':'text-rose-400'}>{last?.cvd?.toFixed?.(2) || '0'}</span></span>
        <span>Delta: {(last?.delta||0).toFixed(2)}</span>
      </div>
      <div className="space-y-0.5 max-h-[300px] overflow-auto">
        {bars.slice(-50).map((b: any, i: number) => (
          <div key={i} className="flex justify-between border-b border-border/10 py-0.5">
            <span className="opacity-60">{new Date(b.timestamp_ms || b.ts*1000).toLocaleTimeString()}</span>
            <span className={b.delta>=0?'text-emerald-400':'text-rose-400'}>{b.delta?.toFixed(2)}</span>
            <span>{b.cvd?.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LiquidationView({ data }: { data: any }) {
  const field = data?.field || data?.liquidations?.field || data?.liquidations || {};
  const bands = field?.bands || data?.bands || [];
  const levels = data?.levels || field?.levels || [];
  return (
    <div className="h-full overflow-auto text-[11px] font-mono p-1">
      <div className="mb-2 text-[9px] opacity-60">
        Total Long Risk: ${(field?.total_long_risk||0).toFixed(0)} | Short: ${(field?.total_short_risk||0).toFixed(0)} | Net Bias: {(field?.net_bias||0).toFixed(2)}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="text-[9px] opacity-60 mb-1">Modelled Bands (800 x 0.05%)</div>
          {bands.slice(0, 40).map((b: any, i: number) => (
            <div key={i} className="flex justify-between py-0.5 border-b border-border/10">
              <span>{Number(b.price).toFixed(2)}</span>
              <span className={b.side==='long'?'text-emerald-400':'text-rose-400'}>{b.side}</span>
              <span className="opacity-60">{(b.intensity*100).toFixed(1)}%</span>
              <span className="text-[9px]">{(b.reach_prob*100).toFixed(0)}% reach</span>
            </div>
          ))}
        </div>
        <div>
          <div className="text-[9px] opacity-60 mb-1">Real Levels (forceOrder)</div>
          {levels.slice(0, 30).map((l: any, i: number) => (
            <div key={i} className="flex justify-between py-0.5 border-b border-border/10">
              <span>{Number(l.price).toFixed(2)}</span>
              <span className={l.side==='long'?'text-emerald-400':'text-rose-400'}>{l.side}</span>
              <span>${(l.notional_usd||0).toFixed(0)}</span>
              <span className="text-[8px] opacity-60">{l.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OrderflowPanel({ symbol, provider, colors }: Props) {
  const [tab, setTab] = useState<Tab>('full');
  const prov = provider || 'binance';
  const { data, loading, error } = useOrderflowFetch(symbol, prov, tab, tab==='full'?1000:2000);

  // Live WS for full view
  const [live, setLive] = useState<any>(null);
  const wsRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    if (tab !== 'full') return;
    const proto = location.protocol === 'https:' ? 'wss' : 'ws';
    const ws = new WebSocket(`${proto}://${location.host}/api/orderflow/full/ws?symbol=${encodeURIComponent(symbol)}&provider=${encodeURIComponent(prov)}`);
    wsRef.current = ws;
    ws.onmessage = (m) => {
      try {
        const j = JSON.parse(m.data);
        if (j.type === 'orderflow') setLive(j);
      } catch {}
    };
    return () => { try { ws.close(); } catch {}; };
  }, [symbol, prov, tab]);

  const displayData = live || data;

  return (
    <div className="flex flex-col h-full bg-[#0b0e11] text-[#d1d4dc] border border-border/40 rounded overflow-hidden">
      <div className="flex items-center gap-1 p-1 border-b border-border/30 bg-[#111418] overflow-x-auto">
        <span className="text-[10px] font-mono font-bold mr-2 px-1">ORDERFLOW</span>
        <span className="text-[9px] opacity-60 mr-2">{symbol} • {prov.toUpperCase()} {prov==='hyperliquid'?'⚡15ms':prov==='binance'?'⚡20ms':'50ms'}</span>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            title={t.desc}
            className={`px-2 py-0.5 text-[10px] rounded border transition-colors ${tab===t.id ? 'bg-[#2962ff] text-white border-[#2962ff]' : 'bg-transparent border-border/30 hover:bg-muted/20 text-muted-foreground'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex-1 min-h-0 relative">
        {loading && !displayData && <div className="absolute inset-0 flex items-center justify-center text-xs opacity-60">Loading {tab}...</div>}
        {error && <div className="absolute top-0 left-0 right-0 bg-rose-500/10 text-rose-300 text-[10px] p-1">{error}</div>}
        {tab==='dom' && <DOMView data={displayData} />}
        {tab==='tape' && <TapeView data={displayData} />}
        {tab==='footprint' && <FootprintView data={displayData} />}
        {tab==='vpvr' && <VPVRView data={displayData} />}
        {tab==='tpo' && <TPOView data={displayData} />}
        {tab==='cvd' && <CVDView data={displayData} />}
        {tab==='liquidations' && <LiquidationView data={displayData} />}
        {tab==='full' && displayData && (
          <div className="grid grid-cols-2 grid-rows-2 h-full gap-px bg-border/20">
            <div className="bg-[#0b0e11] overflow-auto"><div className="text-[9px] p-1 opacity-60 border-b border-border/20">DOM LADDER</div><DOMView data={displayData.dom || displayData} /></div>
            <div className="bg-[#0b0e11] overflow-auto"><div className="text-[9px] p-1 opacity-60 border-b border-border/20">TAPE</div><TapeView data={displayData.tape || displayData} /></div>
            <div className="bg-[#0b0e11] overflow-auto"><div className="text-[9px] p-1 opacity-60 border-b border-border/20">FOOTPRINT</div><FootprintView data={displayData.footprint || displayData} /></div>
            <div className="bg-[#0b0e11] overflow-auto"><div className="text-[9px] p-1 opacity-60 border-b border-border/20">VPVR + CVD</div><VPVRView data={displayData.volume_profile || displayData} /><CVDView data={displayData.cvd || displayData} /></div>
          </div>
        )}
      </div>
      <div className="p-1 border-t border-border/20 text-[8px] opacity-50 flex justify-between">
        <span>EdgeDepth Terminal Replica • DOM USD/coin grouping • Footprint delta imbalance • VPVR POC/VAH/VAL • TPO 30m • CVD • Liq Field 800 bands</span>
        <span>L2/L3: binance coinbase hyperliquid • GPU heatmap existing</span>
      </div>
    </div>
  );
}
