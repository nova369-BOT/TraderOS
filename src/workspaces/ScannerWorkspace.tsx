import React, { useMemo, useState } from 'react';
import { CandlestickChart, Play, Plus, Swords, Trash2, X } from 'lucide-react';
import { marketEngine } from '../services/marketEngine';
import { SYMBOLS, getSymbol } from '../services/symbols';
import { atr, rsi, sma } from '../indicators';
import { useMarketStore } from '../store/useMarketStore';
import { useWorkspaceStore } from '../store/useWorkspaceStore';
import { useResearchStore, type ScanFilter } from '../store/useResearchStore';
import { fmtNum, fmtPct, fmtPrice, fmtVol } from '../lib/format';
import { Panel, EmptyState } from '../components/primitives/Panel';
import { DataGrid, type GridColumn } from '../components/primitives/DataGrid';
import { SplitPane } from '../components/primitives/SplitPane';
import { Dropdown, showContextMenu } from '../components/primitives/Menu';
import { cx } from '../lib/utils';

const FIELDS: Array<{ id: ScanFilter['field']; label: string; fmt: (v: number) => string }> = [
  { id: 'changePct', label: 'Change %', fmt: (v) => fmtPct(v) },
  { id: 'volume', label: 'Volume', fmt: (v) => fmtVol(v) },
  { id: 'relVol', label: 'Rel Vol', fmt: (v) => `${v.toFixed(2)}x` },
  { id: 'rsi', label: 'RSI 14', fmt: (v) => v.toFixed(1) },
  { id: 'atrPct', label: 'ATR %', fmt: (v) => fmtPct(v) },
  { id: 'priceVsSma50', label: 'Price vs SMA50 %', fmt: (v) => fmtPct(v) },
  { id: 'gapPct', label: 'Gap %', fmt: (v) => fmtPct(v) },
  { id: 'price', label: 'Price', fmt: (v) => fmtNum(v, 2) },
];

const PRESETS: Record<string, ScanFilter[]> = {
  'Momentum': [
    { id: 'f1', field: 'changePct', op: '>', v1: 1.5, v2: 0 },
    { id: 'f2', field: 'relVol', op: '>', v1: 1.2, v2: 0 },
    { id: 'f3', field: 'rsi', op: 'between', v1: 55, v2: 80 },
  ],
  'Oversold bounce': [
    { id: 'f1', field: 'rsi', op: '<', v1: 30, v2: 0 },
    { id: 'f2', field: 'relVol', op: '>', v1: 1.0, v2: 0 },
  ],
  'Breakout': [
    { id: 'f1', field: 'priceVsSma50', op: '>', v1: 2, v2: 0 },
    { id: 'f2', field: 'relVol', op: '>', v1: 1.5, v2: 0 },
    { id: 'f3', field: 'volume', op: '>', v1: 100000, v2: 0 },
  ],
  'High volatility': [
    { id: 'f1', field: 'atrPct', op: '>', v1: 2.5, v2: 0 },
  ],
  'Gap & go': [
    { id: 'f1', field: 'gapPct', op: '>', v1: 1.0, v2: 0 },
    { id: 'f2', field: 'relVol', op: '>', v1: 1.3, v2: 0 },
  ],
  'Quiet range': [
    { id: 'f1', field: 'atrPct', op: '<', v1: 1.2, v2: 0 },
    { id: 'f2', field: 'rsi', op: 'between', v1: 40, v2: 60 },
  ],
};

interface ScanRow {
  symbol: string;
  changePct: number;
  volume: number;
  relVol: number;
  rsi: number;
  atrPct: number;
  priceVsSma50: number;
  gapPct: number;
  price: number;
}

function computeRows(): ScanRow[] {
  return SYMBOLS.map((s) => {
    const q = marketEngine.getQuote(s.symbol);
    const candles = marketEngine.getCandles(s.symbol, '1h', 80);
    const closes = candles.map((c) => c.close);
    const r = rsi(closes, 14);
    const rsiV = r[r.length - 1] ?? 50;
    const a = atr(candles, 14);
    const atrV = a[a.length - 1] ?? 0;
    const s50 = sma(closes, 50);
    const sma50 = s50[s50.length - 1] ?? q.price;
    return {
      symbol: s.symbol,
      changePct: q.changePct,
      volume: q.volume,
      relVol: q.relVol,
      rsi: rsiV,
      atrPct: (atrV / q.price) * 100,
      priceVsSma50: ((q.price - sma50) / sma50) * 100,
      gapPct: ((q.open - q.prevClose) / q.prevClose) * 100,
      price: q.price,
    };
  });
}

function pass(row: ScanRow, f: ScanFilter): boolean {
  const v = row[f.field];
  if (f.op === '>') return v > f.v1;
  if (f.op === '<') return v < f.v1;
  return v >= Math.min(f.v1, f.v2) && v <= Math.max(f.v1, f.v2);
}

let seq = 10;

export function ScannerWorkspace(): React.ReactElement {
  const tick = useMarketStore((s) => s.tick);
  const symbol = useWorkspaceStore((s) => s.symbol);
  const setSymbol = useWorkspaceStore((s) => s.setSymbol);
  const setView = useWorkspaceStore((s) => s.setView);
  const setRightTab = useWorkspaceStore((s) => s.setRightTab);
  const filters = useResearchStore((s) => s.scanFilters);
  const setFilters = useResearchStore((s) => s.setScanFilters);
  const preset = useResearchStore((s) => s.scanPreset);
  const setPreset = useResearchStore((s) => s.setScanPreset);
  const [running, setRunning] = useState(true);

  const rows = useMemo(() => {
    const all = computeRows();
    return all.filter((r) => filters.every((f) => pass(r, f)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, filters, running]);

  const update = (id: string, patch: Partial<ScanFilter>): void => {
    setFilters(filters.map((f) => (f.id === id ? { ...f, ...patch } : f)));
    setPreset('Custom');
  };

  const cols: GridColumn<ScanRow>[] = [
    {
      key: 'symbol', title: 'Symbol', sortable: true, sortVal: (r) => r.symbol,
      render: (r) => (
        <span className="flex items-center gap-1.5">
          <span className="font-bold">{r.symbol}</span>
          <span className="badge badge-mute !h-[14px]">{getSymbol(r.symbol).asset}</span>
        </span>
      ),
    },
    { key: 'price', title: 'Price', sortable: true, sortVal: (r) => r.price, render: (r) => <span className="num">{fmtPrice(r.price, getSymbol(r.symbol).decimals)}</span> },
    { key: 'chg', title: 'Chg%', sortable: true, sortVal: (r) => r.changePct, render: (r) => <span className={cx('num font-semibold', r.changePct >= 0 ? 'text-up' : 'text-down')}>{fmtPct(r.changePct)}</span> },
    { key: 'rsi', title: 'RSI', sortable: true, sortVal: (r) => r.rsi, render: (r) => <span className={cx('num', r.rsi > 70 ? 'text-down font-bold' : r.rsi < 30 ? 'text-up font-bold' : '')}>{r.rsi.toFixed(1)}</span> },
    { key: 'relvol', title: 'RelVol', sortable: true, sortVal: (r) => r.relVol, render: (r) => <span className={cx('num', r.relVol > 1.8 ? 'text-up font-bold' : '')}>{r.relVol.toFixed(2)}x</span> },
    { key: 'vol', title: 'Volume', sortable: true, sortVal: (r) => r.volume, render: (r) => <span className="num">{fmtVol(r.volume)}</span> },
    { key: 'atr', title: 'ATR%', sortable: true, sortVal: (r) => r.atrPct, render: (r) => <span className="num">{fmtPct(r.atrPct)}</span> },
    { key: 'sma', title: 'vs SMA50', sortable: true, sortVal: (r) => r.priceVsSma50, render: (r) => <span className={cx('num', r.priceVsSma50 >= 0 ? 'text-up' : 'text-down')}>{fmtPct(r.priceVsSma50)}</span> },
    { key: 'gap', title: 'Gap%', sortable: true, sortVal: (r) => r.gapPct, render: (r) => <span className="num">{fmtPct(r.gapPct)}</span> },
    {
      key: 'act', title: '', render: (r) => (
        <span className="inline-flex gap-1" onClick={(e) => e.stopPropagation()}>
          <button className="tbtn tbtn-xs" title="Open chart" onClick={() => { setSymbol(r.symbol); setView('chart'); }}><CandlestickChart size={10} /></button>
          <button className="tbtn tbtn-xs" title="Trade" onClick={() => { setSymbol(r.symbol); setRightTab('ticket'); }}><Swords size={10} /></button>
        </span>
      ),
    },
  ];

  return (
    <div className="flex-1 min-h-0 flex p-2 gap-2 overflow-hidden">
      <SplitPane
        storageKey="scan-left"
        defaultSize={300} min={250} max={440}
        left={
          <div className="flex-1 min-h-0 flex pr-2">
            <Panel
              title="Scan builder"
              subtitle={`${filters.length} filters`}
              actions={
                <button className={cx('tbtn tbtn-xs', running && '!border-up/50 !text-up')} onClick={() => setRunning(!running)} title="Live re-scan on every tick">
                  <Play size={10} /> {running ? 'Live' : 'Paused'}
                </button>
              }
              bodyClassName="p-2 space-y-2 !overflow-auto"
            >
              <div>
                <span className="tlabel">Preset scans</span>
                <div className="grid grid-cols-2 gap-1">
                  {Object.keys(PRESETS).map((p) => (
                    <button key={p} className={cx('tbtn tbtn-sm justify-start', preset === p && '!border-accent/60 !text-accent')} onClick={() => { setFilters(PRESETS[p]); setPreset(p); }}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <span className="tlabel !mb-0">Filters (AND)</span>
                  <span className="flex-1" />
                  <button className="tbtn tbtn-xs" onClick={() => { setFilters([...filters, { id: `f${seq++}`, field: 'changePct', op: '>', v1: 0, v2: 0 }]); setPreset('Custom'); }}>
                    <Plus size={10} /> Add
                  </button>
                </div>
                <div className="space-y-1.5">
                  {filters.map((f) => (
                    <div key={f.id} className="rounded border border-line bg-panel2 p-1.5">
                      <div className="flex items-center gap-1">
                        <select className="tselect !h-[22px] !text-[10.5px] flex-1" value={f.field} onChange={(e) => update(f.id, { field: e.target.value as ScanFilter['field'] })}>
                          {FIELDS.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
                        </select>
                        <button className="tbtn tbtn-ghost tbtn-xs !px-1" onClick={() => { setFilters(filters.filter((x) => x.id !== f.id)); setPreset('Custom'); }}><X size={11} /></button>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="seg">
                          {(['>', '<', 'between'] as const).map((op) => (
                            <button key={op} className={cx(f.op === op && 'active', '!px-1.5')} onClick={() => update(f.id, { op })}>{op === 'between' ? '><' : op}</button>
                          ))}
                        </div>
                        <input className="tinput !h-[22px] !text-[10.5px]" value={f.v1} onChange={(e) => update(f.id, { v1: Number(e.target.value) || 0 })} inputMode="decimal" />
                        {f.op === 'between' && (
                          <input className="tinput !h-[22px] !text-[10.5px]" value={f.v2} onChange={(e) => update(f.id, { v2: Number(e.target.value) || 0 })} inputMode="decimal" />
                        )}
                      </div>
                    </div>
                  ))}
                  {filters.length === 0 && <div className="text-[11px] text-text3">No filters — showing full universe.</div>}
                </div>
              </div>
              <Dropdown
                trigger={<button className="tbtn tbtn-sm w-full"><Trash2 size={11} /> Reset</button>}
                items={[{ label: 'Clear all filters', onClick: () => { setFilters([]); setPreset('Custom'); } }]}
              />
            </Panel>
          </div>
        }
        right={
          <div className="flex-1 min-h-0 flex">
            <Panel
              title={`Results · ${preset}`}
              subtitle={`${rows.length} of ${SYMBOLS.length} pass`}
              actions={<span className="badge badge-up">live scan</span>}
              className="flex-1"
              bodyClassName="!overflow-auto"
            >
              {rows.length === 0 ? (
                <EmptyState title="No symbols pass" hint="Loosen a filter or try a different preset to widen the scan." />
              ) : (
                <DataGrid
                  columns={cols} rows={rows} rowKey={(r) => r.symbol}
                  activeKey={symbol}
                  defaultSort="chg" defaultDir="desc"
                  onRowClick={(r) => setSymbol(r.symbol)}
                  onRowDouble={(r) => { setSymbol(r.symbol); setView('chart'); }}
                  onRowContext={(r, e) => showContextMenu(e.clientX, e.clientY, [
                    { label: `Chart ${r.symbol}`, icon: <CandlestickChart size={13} />, onClick: () => { setSymbol(r.symbol); setView('chart'); } },
                    { label: `Trade ${r.symbol}`, icon: <Swords size={13} />, onClick: () => { setSymbol(r.symbol); setRightTab('ticket'); } },
                    { label: 'Add to watchlist…', children: Object.keys(useMarketStore.getState().watchlists).map((n) => ({ label: n, onClick: () => useMarketStore.getState().addToWatchlist(n, r.symbol) })) },
                  ])}
                />
              )}
            </Panel>
          </div>
        }
      />
    </div>
  );
}
