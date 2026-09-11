import React, { useMemo } from 'react';
import { ShieldAlert } from 'lucide-react';
import { useTradingStore } from '../store/useTradingStore';
import { useMarketStore } from '../store/useMarketStore';
import { useWorkspaceStore } from '../store/useWorkspaceStore';
import { getSymbol } from '../services/symbols';
import { broker } from '../services/tradingService';
import { fmtMoney, fmtNum, fmtPct, fmtPrice, fmtSignedMoney } from '../lib/format';
import { Panel, EmptyState } from '../components/primitives/Panel';
import { Metric } from '../components/primitives/Metric';
import { EquityChart, Donut } from '../components/primitives/Spark';
import { DataGrid, type GridColumn } from '../components/primitives/DataGrid';
import { SplitPane } from '../components/primitives/SplitPane';
import { showContextMenu } from '../components/primitives/Menu';
import { cx } from '../lib/utils';

const PALETTE = ['#4d8dff', '#0ecb81', '#f0b90b', '#8b7cff', '#22d3ee', '#f6465d', '#94a3b8', '#fb923c'];

export function PortfolioWorkspace(): React.ReactElement {
  const positions = useTradingStore((s) => s.positions);
  const equity = useTradingStore((s) => s.equity);
  const cash = useTradingStore((s) => s.cash);
  const dayPnl = useTradingStore((s) => s.dayPnl);
  const dayPnlPct = useTradingStore((s) => s.dayPnlPct);
  const unrealized = useTradingStore((s) => s.unrealized);
  const realized = useTradingStore((s) => s.realized);
  const fees = useTradingStore((s) => s.fees);
  const exposure = useTradingStore((s) => s.exposure);
  const marginUsed = useTradingStore((s) => s.marginUsed);
  const equityCurve = useTradingStore((s) => s.equityCurve);
  const fills = useTradingStore((s) => s.fills);
  const setSymbol = useWorkspaceStore((s) => s.setSymbol);
  const tick = useMarketStore((s) => s.tick);
  void tick;

  const stats = useMemo(() => {
    let peak = equityCurve[0]?.equity ?? equity;
    let maxDD = 0, maxDDPct = 0;
    for (const p of equityCurve) {
      peak = Math.max(peak, p.equity);
      const dd = peak - p.equity;
      maxDD = Math.max(maxDD, dd);
      maxDDPct = Math.max(maxDDPct, peak ? (dd / peak) * 100 : 0);
    }
    const grossW = fills.filter((f) => f.side === 'BUY').reduce((s, f) => s + f.qty * f.price, 0);
    const lev = equity > 0 ? exposure / equity : 0;
    const marginPct = equity > 0 ? (marginUsed / equity) * 100 : 0;
    const largest = positions.reduce((m, p) => Math.max(m, p.notional), 0);
    const concPct = equity > 0 ? (largest / equity) * 100 : 0;
    const longs = positions.filter((p) => p.side === 'LONG').reduce((s, p) => s + p.notional, 0);
    const shorts = positions.filter((p) => p.side === 'SHORT').reduce((s, p) => s + p.notional, 0);
    return { maxDD, maxDDPct, grossW, lev, marginPct, concPct, longs, shorts, net: longs - shorts };
  }, [equityCurve, equity, fills, exposure, marginUsed, positions]);

  const alloc = useMemo(() => {
    const rows = positions.map((p, i) => ({
      symbol: p.symbol, value: p.notional, color: PALETTE[i % PALETTE.length],
      asset: getSymbol(p.symbol).asset, side: p.side, pnl: p.unrealized,
    }));
    const cashRow = { symbol: 'CASH', value: Math.max(0, equity - exposure), color: '#263449', asset: 'CASH' as const, side: '' as const, pnl: 0 };
    return [...rows, cashRow].filter((r) => r.value > 0.01);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positions, equity, exposure, tick]);

  const byAsset = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of positions) {
      const a = getSymbol(p.symbol).asset;
      m.set(a, (m.get(a) ?? 0) + p.notional);
    }
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [positions]);

  const posCols: GridColumn<(typeof positions)[number]>[] = [
    { key: 'symbol', title: 'Symbol', sortable: true, sortVal: (r) => r.symbol, render: (r) => <span className="font-bold">{r.symbol}</span> },
    { key: 'side', title: 'Side', render: (r) => <span className={cx('badge', r.side === 'LONG' ? 'badge-up' : 'badge-down')}>{r.side}</span> },
    { key: 'qty', title: 'Qty', render: (r) => <span className="num">{fmtNum(r.qty, 4)}</span> },
    { key: 'entry', title: 'Entry', render: (r) => <span className="num">{fmtPrice(r.avgEntry, getSymbol(r.symbol).decimals)}</span> },
    { key: 'mark', title: 'Mark', render: (r) => <span className="num text-accent">{fmtPrice(r.mark, getSymbol(r.symbol).decimals)}</span> },
    { key: 'not', title: 'Notional', sortable: true, sortVal: (r) => r.notional, render: (r) => <span className="num">{fmtMoney(r.notional, 0)}</span> },
    { key: 'w', title: 'Weight', sortable: true, sortVal: (r) => r.notional, render: (r) => <span className="num">{equity ? fmtPct((r.notional / equity) * 100) : '—'}</span> },
    { key: 'pnl', title: 'uPnL', sortable: true, sortVal: (r) => r.unrealized, render: (r) => <span className={cx('num font-semibold', r.unrealized >= 0 ? 'text-up' : 'text-down')}>{fmtSignedMoney(r.unrealized)}</span> },
  ];

  const riskFlags: Array<{ label: string; level: 'ok' | 'warn' | 'bad'; detail: string }> = [
    { label: 'Leverage', level: stats.lev > 3 ? 'bad' : stats.lev > 1.5 ? 'warn' : 'ok', detail: `${stats.lev.toFixed(2)}x gross` },
    { label: 'Margin use', level: stats.marginPct > 60 ? 'bad' : stats.marginPct > 35 ? 'warn' : 'ok', detail: fmtPct(stats.marginPct, 1) },
    { label: 'Concentration', level: stats.concPct > 40 ? 'bad' : stats.concPct > 25 ? 'warn' : 'ok', detail: `largest ${fmtPct(stats.concPct, 1)}` },
    { label: 'Drawdown', level: stats.maxDDPct > 8 ? 'bad' : stats.maxDDPct > 4 ? 'warn' : 'ok', detail: `−${stats.maxDDPct.toFixed(2)}%` },
    { label: 'Net exposure', level: Math.abs(stats.net) / Math.max(1, equity) > 1 ? 'warn' : 'ok', detail: `${stats.net >= 0 ? 'long' : 'short'} ${fmtMoney(Math.abs(stats.net), 0)}` },
  ];

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2 p-2 overflow-hidden">
      {/* KPI strip */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-px bg-line border border-line rounded-md overflow-hidden shrink-0">
        {[
          { l: 'Equity', v: fmtMoney(equity), t: undefined },
          { l: 'Day P&L', v: `${fmtSignedMoney(dayPnl)}`, t: dayPnl >= 0 ? 'up' : 'down' },
          { l: 'Unrealized', v: fmtSignedMoney(unrealized), t: unrealized >= 0 ? 'up' : 'down' },
          { l: 'Realized', v: fmtSignedMoney(realized), t: realized >= 0 ? 'up' : 'down' },
          { l: 'Fees paid', v: fmtMoney(fees), t: 'warn' },
          { l: 'Cash', v: fmtMoney(cash, 0), t: undefined },
          { l: 'Max DD', v: `−${stats.maxDDPct.toFixed(2)}%`, t: stats.maxDDPct > 4 ? 'down' : undefined },
          { l: 'Leverage', v: `${stats.lev.toFixed(2)}x`, t: stats.lev > 2 ? 'warn' : undefined },
        ].map((m) => (
          <div key={m.l} className="bg-panel px-2.5 py-2">
            <Metric label={m.l} value={m.v} size="sm" tone={m.t as 'up' | 'down' | 'warn'} />
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-0 flex">
        <SplitPane
          storageKey="pf-left"
          defaultSize={560} min={380} max={900}
          left={
            <div className="flex-1 min-h-0 flex flex-col gap-2 pr-2 overflow-hidden">
              <Panel title="Equity curve" subtitle="session · live" className="shrink-0" bodyClassName="p-2">
                <EquityChart data={equityCurve} height={150} />
                <div className="flex items-center gap-4 mt-1 px-1 text-[10px] text-text3">
                  <span>Peak <span className="num text-text1">{fmtMoney(Math.max(...equityCurve.map((e) => e.equity), equity), 0)}</span></span>
                  <span>Max DD <span className="num text-down">{fmtSignedMoney(-stats.maxDD, 0)}</span></span>
                  <span>Turnover <span className="num text-text1">{fmtMoney(stats.grossW * 2, 0)}</span></span>
                  <span>Fills <span className="num text-text1">{fills.length}</span></span>
                </div>
              </Panel>
              <Panel title="Holdings" subtitle={`${positions.length} positions`} className="flex-1 min-h-0" bodyClassName="!overflow-auto">
                {positions.length === 0 ? (
                  <EmptyState title="No holdings" hint="Open positions will appear here with weights and live marks." />
                ) : (
                  <DataGrid
                    columns={posCols} rows={positions} rowKey={(r) => r.symbol}
                    onRowClick={(r) => setSymbol(r.symbol)}
                    onRowContext={(r, e) => showContextMenu(e.clientX, e.clientY, [
                      { label: `Close ${r.symbol}`, onClick: () => broker.closePosition(r.symbol) },
                      { label: 'Reverse', danger: true, onClick: () => broker.reversePosition(r.symbol) },
                    ])}
                  />
                )}
              </Panel>
            </div>
          }
          right={
            <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-auto">
              <Panel title="Allocation" subtitle="by symbol">
                <div className="p-3 flex items-center gap-4">
                  <Donut slices={alloc.map((a) => ({ value: a.value, color: a.color, label: a.symbol }))} size={128} thickness={20} />
                  <div className="flex-1 space-y-1 min-w-0">
                    {alloc.slice(0, 7).map((a) => (
                      <button key={a.symbol} className="w-full flex items-center gap-2 text-[11px] hover:bg-hover rounded px-1" onClick={() => a.symbol !== 'CASH' && setSymbol(a.symbol)}>
                        <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: a.color }} />
                        <span className="font-bold shrink-0">{a.symbol}</span>
                        <span className="flex-1" />
                        <span className="num text-text2">{fmtMoney(a.value, 0)}</span>
                        <span className="num font-semibold w-[48px] text-right">{equity ? fmtPct((a.value / equity) * 100, 1) : '—'}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </Panel>
              <Panel title="Exposure by asset class" bodyClassName="p-2.5">
                {byAsset.length === 0 && <div className="text-[11px] text-text3">No exposure.</div>}
                <div className="space-y-2">
                  {byAsset.map(([a, v]) => (
                    <div key={a}>
                      <div className="flex justify-between text-[10.5px] mb-0.5">
                        <span className="font-semibold">{a}</span>
                        <span className="num text-text2">{fmtMoney(v, 0)} · {equity ? fmtPct((v / equity) * 100, 1) : '—'}</span>
                      </div>
                      <div className="h-[6px] rounded bg-panel3 overflow-hidden">
                        <div className="h-full bg-accent/80 rounded" style={{ width: `${Math.min(100, (v / Math.max(1, equity)) * 100)}%` }} />
                      </div>
                    </div>
                  ))}
                  <div>
                    <div className="flex justify-between text-[10.5px] mb-0.5">
                      <span className="font-semibold">Long / Short</span>
                      <span className="num text-text2">{fmtMoney(stats.longs, 0)} / {fmtMoney(stats.shorts, 0)}</span>
                    </div>
                    <div className="h-[6px] rounded bg-panel3 overflow-hidden flex">
                      <div className="bg-up/80" style={{ width: `${(stats.longs / Math.max(1, stats.longs + stats.shorts)) * 100}%` }} />
                      <div className="bg-down/80 flex-1" />
                    </div>
                  </div>
                </div>
              </Panel>
              <Panel title="Risk monitor" actions={<ShieldAlert size={12} className="text-warn" />}>
                <div className="divide-y divide-line/60">
                  {riskFlags.map((r) => (
                    <div key={r.label} className="flex items-center gap-2 px-2.5 h-[30px]">
                      <span className={cx('w-[7px] h-[7px] rounded-full', r.level === 'ok' ? 'bg-up' : r.level === 'warn' ? 'bg-warn' : 'bg-down')} />
                      <span className="text-[11px] font-medium">{r.label}</span>
                      <span className="flex-1" />
                      <span className="num text-[11px] text-text2">{r.detail}</span>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          }
        />
      </div>
    </div>
  );
}
