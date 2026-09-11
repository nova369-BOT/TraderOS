import React, { useState } from 'react';
import {
  AreaChart, BarChart3, Brush, CandlestickChart, ChevronDown, FunctionSquare, LineChart, Search,
} from 'lucide-react';
import { TIMEFRAMES, getSymbol, type Timeframe } from '../services/symbols';
import { useWorkspaceStore } from '../store/useWorkspaceStore';
import { useMarketStore } from '../store/useMarketStore';
import { fmtPct, fmtPrice } from '../lib/format';
import { TerminalChart } from '../components/charts/TerminalChart';
import { DraggableWatchlist } from '../components/market/Watchlist';
import { SplitPane } from '../components/primitives/SplitPane';
import { Dropdown } from '../components/primitives/Menu';
import { Modal } from '../components/primitives/Modal';
import { SymbolSearch } from '../components/market/SymbolSearch';
import { cx } from '../lib/utils';

const CHART_TYPES = [
  { id: 'candles', label: 'Candles', icon: <CandlestickChart size={13} /> },
  { id: 'bars', label: 'Bars', icon: <BarChart3 size={13} /> },
  { id: 'line', label: 'Line', icon: <LineChart size={13} /> },
  { id: 'area', label: 'Area', icon: <AreaChart size={13} /> },
  { id: 'hollow', label: 'Hollow', icon: <CandlestickChart size={13} /> },
  { id: 'heikin', label: 'Heikin Ashi', icon: <CandlestickChart size={13} /> },
] as const;

const INDICATORS = [
  { id: 'ema9', label: 'EMA 9' },
  { id: 'ema21', label: 'EMA 21' },
  { id: 'ema50', label: 'EMA 50' },
  { id: 'sma200', label: 'SMA 200' },
  { id: 'vwap', label: 'VWAP' },
  { id: 'bb', label: 'Bollinger Bands' },
  { id: 'volume', label: 'Volume' },
  { id: 'rsi', label: 'RSI' },
  { id: 'macd', label: 'MACD' },
];

export function ChartWorkspace(): React.ReactElement {
  const symbol = useWorkspaceStore((s) => s.symbol);
  const setSymbol = useWorkspaceStore((s) => s.setSymbol);
  const timeframe = useWorkspaceStore((s) => s.timeframe);
  const setTimeframe = useWorkspaceStore((s) => s.setTimeframe);
  const chartType = useWorkspaceStore((s) => s.chartType);
  const setChartType = useWorkspaceStore((s) => s.setChartType);
  const indicators = useWorkspaceStore((s) => s.indicators);
  const setIndicator = useWorkspaceStore((s) => s.setIndicator);
  const drawingsVisible = useWorkspaceStore((s) => s.drawingsVisible);
  const toggleDrawings = useWorkspaceStore((s) => s.toggleDrawings);
  const quotes = useMarketStore((s) => s.quotes);
  const [symOpen, setSymOpen] = useState(false);

  const def = getSymbol(symbol);
  const q = quotes[symbol];
  const chg = q?.changePct ?? 0;

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      {/* chart header toolbar */}
      <div className="shrink-0 flex items-center gap-1.5 px-2 h-[38px] border-b border-line bg-panel overflow-x-auto select-none">
        <button className="tbtn !h-[26px] gap-1.5 shrink-0" onClick={() => setSymOpen(true)} title="Change symbol">
          <Search size={12} className="text-text3" />
          <span className="font-bold text-[12px]">{symbol}</span>
          <span className="text-[10px] text-text3 font-normal">{def.exchange}</span>
        </button>
        {q && (
          <span className="flex items-center gap-1.5 shrink-0 px-1">
            <span className={cx('num text-[13px] font-bold', q.tickDir === 1 ? 'tick-up' : q.tickDir === -1 ? 'tick-down' : '')}>
              {fmtPrice(q.price, def.decimals)}
            </span>
            <span className={cx('num text-[11px]', chg >= 0 ? 'text-up' : 'text-down')}>{fmtPct(chg)}</span>
          </span>
        )}
        <span className="w-px h-5 bg-line shrink-0 mx-1" />
        <div className="seg shrink-0">
          {TIMEFRAMES.map((tf) => (
            <button key={tf} className={cx(timeframe === tf && 'active')} onClick={() => setTimeframe(tf as Timeframe)}>{tf}</button>
          ))}
        </div>
        <span className="w-px h-5 bg-line shrink-0 mx-1" />
        <Dropdown
          trigger={
            <button className="tbtn !h-[26px] gap-1.5 shrink-0">
              {CHART_TYPES.find((t) => t.id === chartType)?.icon}
              <span className="hidden lg:inline">{CHART_TYPES.find((t) => t.id === chartType)?.label}</span>
              <ChevronDown size={11} className="text-text3" />
            </button>
          }
          items={CHART_TYPES.map((t) => ({ label: t.label, icon: t.icon, checked: chartType === t.id, onClick: () => setChartType(t.id as typeof chartType) }))}
        />
        <Dropdown
          trigger={
            <button className="tbtn !h-[26px] gap-1.5 shrink-0" title="Indicators">
              <FunctionSquare size={13} className="text-violet" />
              <span className="hidden lg:inline">Indicators</span>
              <span className="num text-[10px] text-text3">{Object.values(indicators).filter(Boolean).length}</span>
            </button>
          }
          items={[
            { header: 'Overlays' },
            ...INDICATORS.slice(0, 6).map((i) => ({ label: i.label, checked: !!indicators[i.id], onClick: () => setIndicator(i.id, !indicators[i.id]) })),
            { divider: true },
            { header: 'Panes' },
            ...INDICATORS.slice(6).map((i) => ({ label: i.label, checked: !!indicators[i.id], onClick: () => setIndicator(i.id, !indicators[i.id]) })),
          ]}
        />
        <button className={cx('tbtn !h-[26px] gap-1.5 shrink-0', drawingsVisible && '!border-accent/50 !text-accent')} onClick={toggleDrawings} title="Toggle drawings">
          <Brush size={13} /> <span className="hidden lg:inline">Drawings</span>
        </button>
        <span className="flex-1" />
        <span className="num text-[10px] text-text3 shrink-0 hidden md:inline">
          O {q ? fmtPrice(q.open, def.decimals) : '—'} · H {q ? fmtPrice(q.high, def.decimals) : '—'} · L {q ? fmtPrice(q.low, def.decimals) : '—'} · Vol {q ? q.volume.toLocaleString('en-US', { maximumFractionDigits: 0 }) : '—'}
        </span>
        <span className="badge badge-up shrink-0">Live</span>
      </div>

      {/* chart + side list */}
      <div className="flex-1 min-h-0 flex p-2 gap-2">
        <SplitPane
          storageKey="chart-left"
          defaultSize={330} min={260} max={520}
          left={<div className="flex-1 min-h-0 flex"><DraggableWatchlist /></div>}
          right={
            <div className="flex-1 min-h-0 flex flex-col rounded-md border border-line bg-panel overflow-hidden">
              <TerminalChart symbol={symbol} timeframe={timeframe} />
            </div>
          }
        />
      </div>

      {symOpen && (
        <Modal title="Change symbol" onClose={() => setSymOpen(false)} width={520}>
          <div style={{ height: 400 }} className="flex flex-col">
            <SymbolSearch autoFocus onPick={(s) => { setSymbol(s); setSymOpen(false); }} />
          </div>
        </Modal>
      )}
    </div>
  );
}
