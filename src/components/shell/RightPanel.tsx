import React, { useState } from 'react';
import { Bell, BellPlus, Info, Newspaper, Swords, Trash2, X } from 'lucide-react';
import { useWorkspaceStore, type RightTab } from '../../store/useWorkspaceStore';
import { useMarketStore } from '../../store/useMarketStore';
import { marketEngine } from '../../services/marketEngine';
import { getSymbol } from '../../services/symbols';
import { lastValues } from '../../services/backtestService';
import { getNews } from '../../services/newsService';
import { fmtMoney, fmtNum, fmtPct, fmtPrice, fmtTime, fmtVol, timeAgo } from '../../lib/format';
import { OrderTicket } from '../trading/OrderTicket';
import { EdgeHandle } from '../primitives/SplitPane';
import { Metric, Delta } from '../primitives/Metric';
import { cx } from '../../lib/utils';

const TABS: Array<{ id: RightTab; label: string; icon: React.ReactNode }> = [
  { id: 'ticket', label: 'Ticket', icon: <Swords size={12} /> },
  { id: 'symbol', label: 'Symbol', icon: <Info size={12} /> },
  { id: 'alerts', label: 'Alerts', icon: <Bell size={12} /> },
  { id: 'news', label: 'News', icon: <Newspaper size={12} /> },
];

export function RightPanel(): React.ReactElement {
  const open = useWorkspaceStore((s) => s.rightOpen);
  const setOpen = useWorkspaceStore((s) => s.setRightOpen);
  const tab = useWorkspaceStore((s) => s.rightTab);
  const setTab = useWorkspaceStore((s) => s.setRightTab);
  const width = useWorkspaceStore((s) => s.rightWidth);
  const nudgeRight = useWorkspaceStore((s) => s.nudgeRight);
  const symbol = useWorkspaceStore((s) => s.symbol);
  const alerts = useMarketStore((s) => s.alerts);
  const liveN = alerts.filter((a) => !a.triggered).length;

  if (!open) return <></>;
  return (
    <div className="shrink-0 flex border-l border-line bg-panel select-none" style={{ width }}>
      <EdgeHandle edge="left" onResize={nudgeRight} />
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-center gap-0.5 px-1.5 h-[32px] border-b border-line bg-panel2 shrink-0">
          <div className="ttabs flex-1">
            {TABS.map((t) => (
              <button key={t.id} className={cx('ttab', tab === t.id && 'active')} onClick={() => setTab(t.id)}>
                {t.icon}{t.label}
                {t.id === 'alerts' && liveN > 0 && <span className="cnt">{liveN}</span>}
              </button>
            ))}
          </div>
          <button className="tbtn tbtn-ghost tbtn-xs !px-1" onClick={() => setOpen(false)} title="Hide panel"><X size={12} /></button>
        </div>
        <div className="flex-1 min-h-0 overflow-auto">
          {tab === 'ticket' && <OrderTicket symbol={symbol} />}
          {tab === 'symbol' && <SymbolInfo symbol={symbol} />}
          {tab === 'alerts' && <AlertsPanel />}
          {tab === 'news' && <SymbolNews symbol={symbol} />}
        </div>
      </div>
    </div>
  );
}

function Row({ k, v, tone }: { k: string; v: React.ReactNode; tone?: string }): React.ReactElement {
  return (
    <div className="flex items-center justify-between h-[23px] border-b border-line/60">
      <span className="text-[10.5px] text-text3">{k}</span>
      <span className={cx('num text-[11px]', tone ?? 'text-text1')}>{v}</span>
    </div>
  );
}

function SymbolInfo({ symbol }: { symbol: string }): React.ReactElement {
  const quotes = useMarketStore((s) => s.quotes);
  const timeframe = useWorkspaceStore((s) => s.timeframe);
  const q = quotes[symbol];
  const def = getSymbol(symbol);
  if (!q) return <div className="p-3 text-text3 text-[11px]">No data.</div>;
  const v = lastValues(symbol, timeframe);
  const dayRange = q.high - q.low;
  const rangePos = dayRange > 0 ? ((q.price - q.low) / dayRange) * 100 : 50;
  const rsi = v.rsi14 ?? 50;
  const trend = (v.ema9 ?? 0) > (v.ema21 ?? 0) && q.price > (v.vwap ?? 0) ? 'Bullish'
    : (v.ema9 ?? 0) < (v.ema21 ?? 0) && q.price < (v.vwap ?? 0) ? 'Bearish' : 'Mixed';

  return (
    <div className="p-2.5 space-y-3">
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-[15px] font-bold">{symbol}</span>
          <span className="text-[10px] text-text3">{def.name}</span>
        </div>
        <div className="text-[10px] text-text3">{def.exchange} · {def.asset} · {def.sector ?? '—'} · Tick {def.tick}</div>
        <div className="flex items-end gap-2 mt-1">
          <span className={cx('num text-[22px] font-bold leading-none', q.tickDir === 1 ? 'tick-up' : q.tickDir === -1 ? 'tick-down' : '')}>
            {fmtPrice(q.price, def.decimals)}
          </span>
          <Delta value={q.changePct} />
          <span className={cx('num text-[11px]', q.change >= 0 ? 'text-up' : 'text-down')}>{q.change >= 0 ? '+' : '−'}{fmtPrice(Math.abs(q.change), def.decimals)}</span>
        </div>
        {/* day range */}
        <div className="mt-2">
          <div className="flex justify-between num text-[9.5px] text-text3 mb-0.5">
            <span>L {fmtPrice(q.low, def.decimals)}</span>
            <span>Day range</span>
            <span>H {fmtPrice(q.high, def.decimals)}</span>
          </div>
          <div className="h-[5px] rounded bg-panel3 relative">
            <div className="absolute inset-y-0 left-0 rounded bg-gradient-to-r from-down/60 to-up/60" style={{ width: `${rangePos}%` }} />
            <div className="absolute top-[-2px] w-[2px] h-[9px] bg-text1" style={{ left: `${rangePos}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Metric label="Bid" value={fmtPrice(q.bid, def.decimals)} size="sm" />
        <Metric label="Ask" value={fmtPrice(q.ask, def.decimals)} size="sm" />
        <Metric label="Spread" value={`${fmtNum(q.spreadBps, 1)}bp`} size="sm" />
        <Metric label="Volume" value={fmtVol(q.volume)} size="sm" />
        <Metric label="Rel Vol" value={`${fmtNum(q.relVol, 2)}x`} size="sm" tone={q.relVol > 1.5 ? 'up' : 'neutral'} />
        <Metric label="VWAP" value={fmtPrice(q.vwap, def.decimals)} size="sm" tone={q.price >= q.vwap ? 'up' : 'down'} />
        <Metric label="Trades" value={fmtNum(q.trades, 0)} size="sm" />
        <Metric label="Turnover" value={def.asset === 'FX' ? '—' : fmtMoney(q.quoteVolume, 0)} size="sm" />
        <Metric label="Trend" value={trend} size="sm" tone={trend === 'Bullish' ? 'up' : trend === 'Bearish' ? 'down' : 'neutral'} />
      </div>

      <div>
        <div className="panel-title mb-1">Session stats</div>
        <Row k="Open" v={fmtPrice(q.open, def.decimals)} />
        <Row k="Prev close" v={fmtPrice(q.prevClose, def.decimals)} />
        <Row k="Gap" v={fmtPct(((q.open - q.prevClose) / q.prevClose) * 100)} tone={q.open >= q.prevClose ? 'text-up' : 'text-down'} />
        <Row k="Last size / side" v={`${fmtNum(q.lastSize, def.asset === 'FX' ? 0 : 2)} · ${q.lastSide}`} tone={q.lastSide === 'buy' ? 'text-up' : 'text-down'} />
        <Row k="Price vs VWAP" v={fmtPct(((q.price - q.vwap) / q.vwap) * 100)} tone={q.price >= q.vwap ? 'text-up' : 'text-down'} />
      </div>

      <div>
        <div className="panel-title mb-1">Indicators · {timeframe}</div>
        <Row k="RSI(14)" v={rsi.toFixed(1)} tone={rsi > 70 ? 'text-down' : rsi < 30 ? 'text-up' : 'text-text1'} />
        <Row k="EMA 9 / 21 / 50" v={`${v.ema9 ? fmtPrice(v.ema9, def.decimals) : '—'} · ${v.ema21 ? fmtPrice(v.ema21, def.decimals) : '—'} · ${v.ema50 ? fmtPrice(v.ema50, def.decimals) : '—'}`} />
        <Row k="MACD / Signal" v={`${v.macd?.toFixed(2) ?? '—'} / ${v.macdSignal?.toFixed(2) ?? '—'}`} tone={(v.macdHist ?? 0) >= 0 ? 'text-up' : 'text-down'} />
        <Row k="ATR(14)" v={v.atr14 ? fmtPrice(v.atr14, def.decimals) : '—'} />
        <Row k="BB %B / width" v={`${v.pctB !== null && v.pctB !== undefined ? (v.pctB * 100).toFixed(0) + '%' : '—'} / ${v.bbWidth?.toFixed(2) ?? '—'}`} />
        <Row k="Stoch K / D" v={`${v.stochK?.toFixed(1) ?? '—'} / ${v.stochD?.toFixed(1) ?? '—'}`} />
        <Row k="Volume vs avg20" v={v.volSma20 ? `${(q.volume / Math.max(1, v.volSma20 * 20)).toFixed(2)}x` : '—'} />
      </div>
    </div>
  );
}

function AlertsPanel(): React.ReactElement {
  const symbol = useWorkspaceStore((s) => s.symbol);
  const quotes = useMarketStore((s) => s.quotes);
  const alerts = useMarketStore((s) => s.alerts);
  const addAlert = useMarketStore((s) => s.addAlert);
  const removeAlert = useMarketStore((s) => s.removeAlert);
  const q = quotes[symbol] ?? marketEngine.getQuote(symbol);
  const def = getSymbol(symbol);
  const [cond, setCond] = useState<'above' | 'below'>('above');
  const [price, setPrice] = useState('');

  const quick = (mult: number, c: 'above' | 'below'): void => {
    addAlert(symbol, c, q.price * mult);
  };

  return (
    <div className="p-2.5 space-y-2.5">
      <div className="rounded border border-line bg-panel2 p-2">
        <div className="flex items-center gap-1.5 mb-2">
          <BellPlus size={12} className="text-warn" />
          <span className="text-[11px] font-semibold">New alert · {symbol}</span>
          <span className="flex-1" />
          <span className="num text-[10.5px] text-text3">@ {fmtPrice(q.price, def.decimals)}</span>
        </div>
        <div className="seg w-full !flex mb-1.5">
          <button className={cx('flex-1', cond === 'above' && 'active')} onClick={() => setCond('above')}>Price above</button>
          <button className={cx('flex-1', cond === 'below' && 'active')} onClick={() => setCond('below')}>Price below</button>
        </div>
        <div className="flex gap-1.5">
          <input className="tinput" placeholder={fmtPrice(q.price, def.decimals)} value={price} onChange={(e) => setPrice(e.target.value)} inputMode="decimal" />
          <button
            className="tbtn tbtn-primary shrink-0"
            onClick={() => { if (Number(price) > 0) { addAlert(symbol, cond, Number(price)); setPrice(''); } }}
          >
            Create
          </button>
        </div>
        <div className="grid grid-cols-4 gap-1 mt-1.5">
          <button className="tbtn tbtn-xs" onClick={() => quick(1.01, 'above')}>+1%</button>
          <button className="tbtn tbtn-xs" onClick={() => quick(0.99, 'below')}>−1%</button>
          <button className="tbtn tbtn-xs" onClick={() => addAlert(symbol, 'above', q.high)}>HOD</button>
          <button className="tbtn tbtn-xs" onClick={() => addAlert(symbol, 'below', q.low)}>LOD</button>
        </div>
      </div>

      <div>
        <div className="panel-title mb-1">Active ({alerts.filter((a) => !a.triggered).length})</div>
        {alerts.length === 0 && <div className="text-[11px] text-text3 py-4 text-center">No alerts. Create one above — triggered alerts fire a terminal banner.</div>}
        <div className="space-y-1">
          {alerts.map((a) => {
            const aq = quotes[a.symbol];
            const ad = getSymbol(a.symbol);
            const dist = aq ? ((a.price - aq.price) / aq.price) * 100 : 0;
            return (
              <div key={a.id} className={cx('rounded border px-2 py-1.5', a.triggered ? 'border-up/40 bg-upbg' : 'border-line bg-panel2')}>
                <div className="flex items-center gap-1.5">
                  <Bell size={11} className={a.triggered ? 'text-up' : 'text-warn'} />
                  <span className="text-[11px] font-bold">{a.symbol}</span>
                  <span className="text-[10.5px] text-text2">{a.condition} <span className="num">{fmtPrice(a.price, ad.decimals)}</span></span>
                  <span className="flex-1" />
                  <button className="tbtn tbtn-ghost tbtn-xs !px-1" onClick={() => removeAlert(a.id)}><Trash2 size={11} /></button>
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-[10px] text-text3">
                  <span>{a.triggered ? 'TRIGGERED' : `${dist >= 0 ? '+' : ''}${dist.toFixed(2)}% away`}</span>
                  <span>·</span>
                  <span>{fmtTime(a.createdAt)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SymbolNews({ symbol }: { symbol: string }): React.ReactElement {
  const tick = useMarketStore((s) => s.tick);
  void tick;
  const items = getNews(symbol, 30);
  if (items.length === 0) return <div className="p-3 text-[11px] text-text3">No recent headlines for {symbol}.</div>;
  return (
    <div className="divide-y divide-line/60">
      {items.map((n) => (
        <div key={n.id} className="px-2.5 py-2 hover:bg-hover cursor-pointer">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="num text-[9.5px] text-text3">{timeAgo(n.time)}</span>
            <span className={cx('badge !h-[14px]', n.sentiment === 'bullish' ? 'badge-up' : n.sentiment === 'bearish' ? 'badge-down' : 'badge-mute')}>{n.sentiment}</span>
            <span className="flex-1" />
            <span className="text-[9.5px] text-text3">{n.source}</span>
          </div>
          <div className="text-[11.5px] font-medium leading-snug">{n.headline}</div>
          <div className="text-[10.5px] text-text3 leading-snug mt-0.5">{n.summary}</div>
        </div>
      ))}
    </div>
  );
}
