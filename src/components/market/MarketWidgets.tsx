import React, { useMemo } from 'react';
import { ArrowDownRight, ArrowUpRight, CalendarClock, Flame } from 'lucide-react';
import { marketEngine } from '../../services/marketEngine';
import { SYMBOLS, getSymbol } from '../../services/symbols';
import { useMarketStore } from '../../store/useMarketStore';
import { useWorkspaceStore } from '../../store/useWorkspaceStore';
import { getCalendar, getNews, marketBrief } from '../../services/newsService';
import { fmtNum, fmtPct, fmtPrice, fmtTimeShort, fmtVol, timeAgo } from '../../lib/format';
import { Panel } from '../primitives/Panel';
import { Sparkline } from '../primitives/Spark';
import { Delta } from '../primitives/Metric';
import { cx } from '../../lib/utils';

export function IndexStrip(): React.ReactElement {
  const quotes = useMarketStore((s) => s.quotes);
  const setSymbol = useWorkspaceStore((s) => s.setSymbol);
  const idx = ['SPY', 'QQQ', 'DIA', 'IWM', 'VIX', 'ES', 'NQ', 'GC', 'CL', 'BTCUSDT', 'EURUSD'];
  return (
    <div className="grid shrink-0 gap-px bg-line border border-line rounded-md overflow-hidden" style={{ gridTemplateColumns: `repeat(${idx.length}, 1fr)` }}>
      {idx.map((s) => {
        const q = quotes[s];
        if (!q) return <div key={s} className="bg-panel" />;
        const def = getSymbol(s);
        return (
          <button key={s} className="bg-panel px-2 py-1.5 text-left hover:bg-hover min-w-0" onClick={() => setSymbol(s)}>
            <div className="text-[9px] font-bold text-text3 truncate">{s}</div>
            <div className="num text-[12px] font-semibold leading-tight truncate">{fmtPrice(q.price, def.decimals)}</div>
            <div className={cx('num text-[10px] font-medium leading-tight', q.changePct >= 0 ? 'text-up' : 'text-down')}>{fmtPct(q.changePct)}</div>
          </button>
        );
      })}
    </div>
  );
}

export function MoversPanel({ title = 'Top Movers', count = 8, mode = 'gainers' }: {
  title?: string; count?: number; mode?: 'gainers' | 'losers' | 'volume';
}): React.ReactElement {
  const quotes = useMarketStore((s) => s.quotes);
  const tick = useMarketStore((s) => s.tick);
  const setSymbol = useWorkspaceStore((s) => s.setSymbol);
  const rows = useMemo(() => {
    const all = Object.values(quotes);
    const sorted = [...all].sort((a, b) =>
      mode === 'gainers' ? b.changePct - a.changePct : mode === 'losers' ? a.changePct - b.changePct : b.quoteVolume - a.quoteVolume,
    );
    return sorted.slice(0, count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, mode, count]);
  const max = Math.max(1e-9, ...rows.map((r) => mode === 'volume' ? r.quoteVolume : Math.abs(r.changePct)));
  return (
    <Panel title={title} subtitle="all assets" bodyClassName="!overflow-hidden">
      <div className="divide-y divide-line/60">
        {rows.map((q) => {
          const def = getSymbol(q.symbol);
          const v = mode === 'volume' ? q.quoteVolume : Math.abs(q.changePct);
          return (
            <button key={q.symbol} className="w-full flex items-center gap-2 px-2 h-[30px] hover:bg-hover text-left" onClick={() => setSymbol(q.symbol)}>
              {mode !== 'volume' && (q.changePct >= 0 ? <ArrowUpRight size={12} className="text-up shrink-0" /> : <ArrowDownRight size={12} className="text-down shrink-0" />)}
              {mode === 'volume' && <Flame size={12} className="text-warn shrink-0" />}
              <span className="text-[11px] font-bold w-[64px] truncate shrink-0">{q.symbol}</span>
              <span className="flex-1 h-[4px] rounded bg-panel3 overflow-hidden">
                <span className={cx('block h-full rounded', mode === 'volume' ? 'bg-warn/80' : q.changePct >= 0 ? 'bg-up/80' : 'bg-down/80')} style={{ width: `${(v / max) * 100}%` }} />
              </span>
              <span className="num text-[10.5px] text-text2 w-[62px] text-right shrink-0">{fmtPrice(q.price, def.decimals)}</span>
              <span className={cx('num text-[10.5px] font-semibold w-[56px] text-right shrink-0', q.changePct >= 0 ? 'text-up' : 'text-down')}>{fmtPct(q.changePct)}</span>
            </button>
          );
        })}
      </div>
    </Panel>
  );
}

export function BreadthPanel(): React.ReactElement {
  const tick = useMarketStore((s) => s.tick);
  const brief = useMemo(() => marketBrief(), [tick]); // eslint-disable-line react-hooks/exhaustive-deps
  const setSymbol = useWorkspaceStore((s) => s.setSymbol);
  return (
    <Panel title="Market Breadth" subtitle="us equities" bodyClassName="p-2.5">
      <div className="flex items-end gap-2">
        <span className="num text-[26px] font-bold leading-none">{brief.breadth.toFixed(0)}<span className="text-[13px] text-text3">%</span></span>
        <span className="text-[10.5px] text-text3 pb-0.5">advancing</span>
      </div>
      <div className="h-[7px] rounded bg-panel3 overflow-hidden flex mt-1.5">
        <div className="bg-up" style={{ width: `${brief.breadth}%` }} />
        <div className="bg-down flex-1" />
      </div>
      <p className="text-[10.5px] text-text2 leading-snug mt-1.5">{brief.headline}</p>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div>
          <div className="text-[9px] font-bold uppercase tracking-wider text-up mb-1">Leaders</div>
          {brief.leaders.map((s) => <LeaderRow key={s} s={s} onPick={setSymbol} />)}
        </div>
        <div>
          <div className="text-[9px] font-bold uppercase tracking-wider text-down mb-1">Laggards</div>
          {brief.laggards.map((s) => <LeaderRow key={s} s={s} onPick={setSymbol} />)}
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-line flex items-center justify-between text-[10.5px]">
        <span className="text-text3">Vol regime</span>
        <span className={cx('badge', brief.volRegime === 'elevated' ? 'badge-down' : brief.volRegime === 'compressed' ? 'badge-up' : 'badge-mute')}>{brief.volRegime}</span>
      </div>
    </Panel>
  );
}

function LeaderRow({ s, onPick }: { s: string; onPick: (s: string) => void }): React.ReactElement {
  const q = useMarketStore((st) => st.quotes[s]);
  if (!q) return <></>;
  return (
    <button className="w-full flex items-center justify-between h-[20px] hover:bg-hover px-1 rounded" onClick={() => onPick(s)}>
      <span className="text-[11px] font-semibold">{s}</span>
      <Delta value={q.changePct} size="sm" />
    </button>
  );
}

export function CalendarMini({ limit = 6 }: { limit?: number }): React.ReactElement {
  const evts = useMemo(() => getCalendar().filter((e) => e.time > Date.now() - 3600000 * 3).slice(0, limit), [limit]);
  const tick = useMarketStore((s) => s.tick);
  void tick;
  return (
    <Panel title="Economic Calendar" subtitle="upcoming" actions={<CalendarClock size={12} className="text-text3" />}>
      <div className="divide-y divide-line/60">
        {evts.map((e) => (
          <div key={e.id} className="px-2 py-[7px] flex items-center gap-2">
            <span className={cx('w-[6px] h-[6px] rounded-full shrink-0', e.impact === 'high' ? 'bg-down' : e.impact === 'medium' ? 'bg-warn' : 'bg-text3')} title={`${e.impact} impact`} />
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-medium leading-tight truncate">{e.title}</span>
              <span className="block text-[9.5px] text-text3 leading-tight">{e.country}{e.forecast ? ` · F ${e.forecast}` : ''}{e.previous ? ` · P ${e.previous}` : ''}</span>
            </span>
            <span className="num text-[10px] text-text2 shrink-0">{fmtTimeShort(e.time)}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function NewsFeed({ symbol, limit = 14, compact }: { symbol?: string; limit?: number; compact?: boolean }): React.ReactElement {
  const tick = useMarketStore((s) => s.tick);
  const items = useMemo(() => getNews(symbol, limit), [symbol, limit, Math.floor(tick / 20)]); // eslint-disable-line react-hooks/exhaustive-deps
  const setSymbol = useWorkspaceStore((s) => s.setSymbol);
  return (
    <Panel title={symbol ? `News · ${symbol}` : 'Market News'} subtitle="terminal wire" bodyClassName="!overflow-auto">
      <div className="divide-y divide-line/60">
        {items.map((n) => (
          <div key={n.id} className="px-2 py-[7px] hover:bg-hover cursor-pointer">
            <div className="flex items-center gap-1.5">
              <span className="num text-[9.5px] text-text3 shrink-0">{timeAgo(n.time)}</span>
              <span className={cx('w-[6px] h-[6px] rounded-full shrink-0', n.sentiment === 'bullish' ? 'bg-up' : n.sentiment === 'bearish' ? 'bg-down' : 'bg-text3')} />
              {n.symbols.map((s) => (
                <button key={s} className="num text-[9.5px] font-bold text-accent hover:underline shrink-0" onClick={(e) => { e.stopPropagation(); setSymbol(s); }}>{s}</button>
              ))}
              <span className="flex-1" />
              <span className="text-[9px] text-text3 shrink-0 hidden xl:inline">{n.source}</span>
            </div>
            <div className="text-[11px] font-medium leading-snug mt-0.5">{n.headline}</div>
            {!compact && <div className="text-[10px] text-text3 leading-snug">{n.summary}</div>}
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function SectorBars(): React.ReactElement {
  const tick = useMarketStore((s) => s.tick);
  const rows = useMemo(() => {
    const bySector = new Map<string, number[]>();
    for (const s of SYMBOLS) {
      if (!s.sector) continue;
      const q = marketEngine.getQuote(s.symbol);
      if (!bySector.has(s.sector)) bySector.set(s.sector, []);
      bySector.get(s.sector)!.push(q.changePct);
    }
    return [...bySector.entries()]
      .map(([sector, arr]) => ({ sector, avg: arr.reduce((a, b) => a + b, 0) / arr.length, n: arr.length }))
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 9);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);
  const max = Math.max(0.5, ...rows.map((r) => Math.abs(r.avg)));
  return (
    <Panel title="Sector Performance" subtitle="avg change %" bodyClassName="p-2">
      <div className="space-y-[7px]">
        {rows.map((r) => (
          <div key={r.sector} className="flex items-center gap-2">
            <span className="text-[10px] text-text2 w-[86px] truncate shrink-0">{r.sector}</span>
            <span className="flex-1 h-[12px] relative bg-panel3 rounded-sm overflow-hidden">
              <span className="absolute inset-y-0 left-1/2 w-px bg-line2" />
              <span
                className={cx('absolute inset-y-[2px] rounded-sm', r.avg >= 0 ? 'bg-up/80' : 'bg-down/80')}
                style={r.avg >= 0
                  ? { left: '50%', width: `${(r.avg / max) * 50}%` }
                  : { right: '50%', width: `${(Math.abs(r.avg) / max) * 50}%` }}
              />
            </span>
            <span className={cx('num text-[10px] font-semibold w-[52px] text-right shrink-0', r.avg >= 0 ? 'text-up' : 'text-down')}>{fmtPct(r.avg)}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function SessionStats(): React.ReactElement {
  const quotes = useMarketStore((s) => s.quotes);
  const stats = useMemo(() => {
    const all = Object.values(quotes);
    const ups = all.filter((q) => q.changePct > 0).length;
    const hiVol = all.filter((q) => q.relVol > 1.5).length;
    const totalTurn = all.reduce((s, q) => s + q.quoteVolume, 0);
    const avgChg = all.length ? all.reduce((s, q) => s + Math.abs(q.changePct), 0) / all.length : 0;
    const btc = quotes['BTCUSDT'];
    return { ups, dns: all.length - ups, hiVol, totalTurn, avgChg, btcDom: btc ? 54.2 + btc.changePct * 0.1 : 54 };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotes]);
  return (
    <div className="grid grid-cols-3 xl:grid-cols-6 gap-px bg-line border border-line rounded-md overflow-hidden shrink-0">
      {[
        { l: 'Adv / Dec', v: `${stats.ups} / ${stats.dns}` },
        { l: 'Avg |move|', v: fmtPct(stats.avgChg) },
        { l: 'High rel-vol', v: fmtNum(stats.hiVol, 0) },
        { l: 'Turnover', v: `$${fmtVol(stats.totalTurn)}` },
        { l: 'BTC dom', v: `${stats.btcDom.toFixed(1)}%` },
        { l: 'Session', v: 'US · Open' },
      ].map((s) => (
        <div key={s.l} className="bg-panel px-2 py-1.5">
          <div className="text-[9px] font-semibold uppercase tracking-wider text-text3">{s.l}</div>
          <div className="num text-[13px] font-semibold">{s.v}</div>
        </div>
      ))}
    </div>
  );
}

export function SymbolSparkRow({ symbols }: { symbols: string[] }): React.ReactElement {
  const tick = useMarketStore((s) => s.tick);
  const setSymbol = useWorkspaceStore((s) => s.setSymbol);
  const active = useWorkspaceStore((s) => s.symbol);
  const data = useMemo(() => symbols.map((s) => ({
    s,
    spark: marketEngine.getCandles(s, '5m', 60).map((c) => c.close),
    q: marketEngine.getQuote(s),
  })), [symbols.join(','), Math.floor(tick / 3)]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="grid gap-2 shrink-0" style={{ gridTemplateColumns: `repeat(${symbols.length}, 1fr)` }}>
      {data.map(({ s, spark, q }) => {
        const def = getSymbol(s);
        return (
          <button key={s} onClick={() => setSymbol(s)} className={cx('rounded-md border px-2 py-1.5 text-left bg-panel hover:border-line2', active === s ? 'border-accent/60' : 'border-line')}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold">{s}</span>
              <span className={cx('num text-[10px] font-semibold', q.changePct >= 0 ? 'text-up' : 'text-down')}>{fmtPct(q.changePct)}</span>
            </div>
            <div className="num text-[13px] font-semibold">{fmtPrice(q.price, def.decimals)}</div>
            <Sparkline data={spark} width={130} height={26} />
          </button>
        );
      })}
    </div>
  );
}
