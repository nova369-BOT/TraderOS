import React, { useMemo, useState } from 'react';
import { FlaskConical, GitCompare, Play, Square, Trash2 } from 'lucide-react';
import { TIMEFRAMES, getSymbol, type Timeframe } from '../services/symbols';
import type { BacktestConfig, BacktestResult } from '../services/backtestService';
import { useResearchStore } from '../store/useResearchStore';
import { useWorkspaceStore } from '../store/useWorkspaceStore';
import { fmtMoney, fmtNum, fmtPct, fmtPrice, fmtSignedMoney, fmtTime } from '../lib/format';
import { Panel, EmptyState } from '../components/primitives/Panel';
import { Metric } from '../components/primitives/Metric';
import { EquityChart, DistBars } from '../components/primitives/Spark';
import { DataGrid, type GridColumn } from '../components/primitives/DataGrid';
import { SplitPane } from '../components/primitives/SplitPane';
import { Field } from '../components/primitives/Modal';
import { summarizeRules } from '../components/research/RuleBuilder';
import { cx } from '../lib/utils';

export function BacktestWorkspace(): React.ReactElement {
  const strategies = useResearchStore((s) => s.strategies);
  const activeStrategyId = useResearchStore((s) => s.activeStrategyId);
  const backtests = useResearchStore((s) => s.backtests);
  const running = useResearchStore((s) => s.running);
  const progress = useResearchStore((s) => s.progress);
  const runBacktestAsync = useResearchStore((s) => s.runBacktestAsync);
  const compareIds = useResearchStore((s) => s.compareIds);
  const toggleCompare = useResearchStore((s) => s.toggleCompare);
  const clearBacktests = useResearchStore((s) => s.clearBacktests);
  const globalSymbol = useWorkspaceStore((s) => s.symbol);

  const [strategyId, setStrategyId] = useState(activeStrategyId);
  const [symbol, setSymbol] = useState(globalSymbol);
  const [timeframe, setTimeframe] = useState<Timeframe>('1h');
  const [bars, setBars] = useState(800);
  const [capital, setCapital] = useState(100000);
  const [commission, setCommission] = useState(2);
  const [slippage, setSlippage] = useState(1);
  const [sizing, setSizing] = useState<BacktestConfig['sizing']>('riskPct');
  const [sizingValue, setSizingValue] = useState(1);
  const [leverage, setLeverage] = useState(1);
  const [direction, setDirection] = useState<'both' | 'long' | 'short'>('both');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);

  const strategy = strategies.find((s) => s.id === strategyId) ?? strategies[0];
  const selected: BacktestResult | null = useMemo(() => {
    if (backtests.length === 0) return null;
    return backtests.find((b) => b.id === (selectedId ?? backtests[0].id)) ?? backtests[0];
  }, [backtests, selectedId]);

  const compared = backtests.filter((b) => compareIds.includes(b.id));

  const run = (): void => {
    if (!strategy) return;
    runBacktestAsync({
      symbol, timeframe, bars, capital,
      commissionBps: commission, slippageBps: slippage,
      sizing, sizingValue, leverage, strategy,
      longOnly: direction === 'long', shortOnly: direction === 'short',
    });
  };

  return (
    <div className="flex-1 min-h-0 flex p-2 gap-2 overflow-hidden">
      <SplitPane
        storageKey="bt-left"
        defaultSize={300} min={250} max={440}
        left={
          <div className="flex-1 min-h-0 flex flex-col gap-2 pr-2 overflow-auto">
            <Panel title="Configuration" bodyClassName="p-2 space-y-2">
              <Field label="Strategy">
                <select className="tselect" value={strategy?.id} onChange={(e) => setStrategyId(e.target.value)}>
                  {strategies.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </Field>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Symbol">
                  <select className="tselect num" value={symbol} onChange={(e) => setSymbol(e.target.value)}>
                    {['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'SPY', 'QQQ', 'NVDA', 'AAPL', 'TSLA', 'MSFT', 'META', 'ES', 'NQ', 'GC', 'CL', 'EURUSD'].map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Timeframe">
                  <select className="tselect" value={timeframe} onChange={(e) => setTimeframe(e.target.value as Timeframe)}>
                    {TIMEFRAMES.filter((t) => !['1s', '5s', '15s'].includes(t)).map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="History (bars)">
                  <select className="tselect num" value={bars} onChange={(e) => setBars(Number(e.target.value))}>
                    {[300, 500, 800, 1200, 2000].map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </Field>
                <Field label="Capital">
                  <input className="tinput num" value={capital} onChange={(e) => setCapital(Number(e.target.value) || 0)} inputMode="numeric" />
                </Field>
                <Field label="Commission (bps)">
                  <input className="tinput num" value={commission} onChange={(e) => setCommission(Number(e.target.value) || 0)} inputMode="decimal" />
                </Field>
                <Field label="Slippage (bps)">
                  <input className="tinput num" value={slippage} onChange={(e) => setSlippage(Number(e.target.value) || 0)} inputMode="decimal" />
                </Field>
                <Field label="Sizing">
                  <select className="tselect" value={sizing} onChange={(e) => setSizing(e.target.value as BacktestConfig['sizing'])}>
                    <option value="riskPct">Risk % / trade</option>
                    <option value="equityPct">Equity % / trade</option>
                    <option value="fixedQty">Fixed qty</option>
                  </select>
                </Field>
                <Field label={sizing === 'fixedQty' ? 'Qty' : 'Value (%)'}>
                  <input className="tinput num" value={sizingValue} onChange={(e) => setSizingValue(Number(e.target.value) || 0)} inputMode="decimal" />
                </Field>
                <Field label="Leverage">
                  <input className="tinput num" value={leverage} onChange={(e) => setLeverage(Math.max(1, Number(e.target.value) || 1))} inputMode="numeric" />
                </Field>
                <Field label="Direction">
                  <select className="tselect" value={direction} onChange={(e) => setDirection(e.target.value as typeof direction)}>
                    <option value="both">Long + Short</option>
                    <option value="long">Long only</option>
                    <option value="short">Short only</option>
                  </select>
                </Field>
              </div>
              <button className="tbtn tbtn-primary w-full !h-[32px] font-bold" onClick={run} disabled={running || !strategy}>
                {running ? <><Square size={13} /> Running… {progress}%</> : <><Play size={13} /> Run backtest</>}
              </button>
              {running && (
                <div className="h-[5px] rounded bg-panel3 overflow-hidden">
                  <div className="h-full bg-accent transition-all" style={{ width: `${progress}%` }} />
                </div>
              )}
              {strategy && (
                <div className="rounded border border-line bg-base p-1.5 space-y-1">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-text3">Under test</div>
                  {summarizeRules(strategy.rules).slice(0, 4).map((l, i) => (
                    <div key={i} className="font-mono text-[10px] text-text2 leading-snug">{l}</div>
                  ))}
                </div>
              )}
            </Panel>
            <Panel
              title="Runs"
              subtitle={`${backtests.length}`}
              actions={backtests.length > 0 ? <button className="tbtn tbtn-ghost tbtn-xs !px-1" title="Clear runs" onClick={clearBacktests}><Trash2 size={11} /></button> : undefined}
              className="shrink-0"
            >
              {backtests.length === 0 && <div className="p-2.5 text-[11px] text-text3">No runs yet. Configure and run your first backtest.</div>}
              <div className="divide-y divide-line/60 max-h-[220px] overflow-auto">
                {backtests.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedId(b.id)}
                    className={cx('w-full text-left px-2.5 py-1.5 hover:bg-hover flex items-center gap-2', selected?.id === b.id && 'bg-accentdim')}
                  >
                    <input
                      type="checkbox" className="shrink-0" title="Add to comparison"
                      checked={compareIds.includes(b.id)}
                      onChange={() => toggleCompare(b.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="flex-1 min-w-0">
                      <span className="block text-[11px] font-bold truncate">{b.config.strategy.name}</span>
                      <span className="block num text-[9.5px] text-text3">{b.config.symbol} {b.config.timeframe} · {b.metrics.trades} trades</span>
                    </span>
                    <span className={cx('num text-[11px] font-bold shrink-0', b.metrics.totalReturnPct >= 0 ? 'text-up' : 'text-down')}>
                      {fmtPct(b.metrics.totalReturnPct, 1)}
                    </span>
                  </button>
                ))}
              </div>
              {compared.length >= 2 && (
                <div className="p-1.5 border-t border-line">
                  <button className={cx('tbtn tbtn-sm w-full', compareMode && '!border-accent/60 !text-accent')} onClick={() => setCompareMode(!compareMode)}>
                    <GitCompare size={12} /> Compare {compared.length} runs {compareMode ? '(on)' : ''}
                  </button>
                </div>
              )}
            </Panel>
          </div>
        }
        right={
          <div className="flex-1 min-h-0 overflow-auto">
            {!selected ? (
              <Panel title="Results" className="h-full">
                <EmptyState
                  icon={<FlaskConical size={26} />}
                  title="No results yet"
                  hint="Run a backtest to see equity curves, drawdowns, trade analytics and monthly breakdowns here."
                  action={<button className="tbtn tbtn-primary tbtn-sm" onClick={run} disabled={!strategy}><Play size={11} /> Run now</button>}
                />
              </Panel>
            ) : compareMode && compared.length >= 2 ? (
              <CompareView runs={compared} />
            ) : (
              <ResultView result={selected} />
            )}
          </div>
        }
      />
    </div>
  );
}

function ResultView({ result }: { result: BacktestResult }): React.ReactElement {
  const m = result.metrics;
  const c = result.config;
  const def = getSymbol(c.symbol);
  const [tab, setTab] = useState<'overview' | 'trades' | 'monthly'>('overview');

  const stats: Array<{ l: string; v: string; t?: 'up' | 'down' | 'warn' }> = [
    { l: 'Net P&L', v: `${fmtSignedMoney(m.totalReturn)} (${fmtPct(m.totalReturnPct, 1)})`, t: m.totalReturn >= 0 ? 'up' : 'down' },
    { l: 'CAGR', v: fmtPct(m.cagr, 1), t: m.cagr >= 0 ? 'up' : 'down' },
    { l: 'Sharpe', v: m.sharpe.toFixed(2), t: m.sharpe >= 1 ? 'up' : m.sharpe < 0 ? 'down' : undefined },
    { l: 'Sortino', v: m.sortino.toFixed(2), t: m.sortino >= 1 ? 'up' : undefined },
    { l: 'Calmar', v: m.calmar.toFixed(2) },
    { l: 'Max DD', v: `−${fmtPct(m.maxDDPct, 1)}`, t: 'down' },
    { l: 'Win rate', v: fmtPct(m.winRate, 1), t: m.winRate >= 50 ? 'up' : undefined },
    { l: 'Profit factor', v: m.profitFactor >= 99 ? '∞' : m.profitFactor.toFixed(2), t: m.profitFactor >= 1.5 ? 'up' : m.profitFactor < 1 ? 'down' : undefined },
    { l: 'Expectancy', v: fmtSignedMoney(m.expectancy), t: m.expectancy >= 0 ? 'up' : 'down' },
    { l: 'Avg win / loss', v: `${fmtMoney(m.avgWin, 0)} / ${fmtMoney(m.avgLoss, 0)}` },
    { l: 'Trades (W/L)', v: `${m.trades} (${m.wins}/${m.losses})` },
    { l: 'Exposure', v: fmtPct(m.exposurePct, 1) },
  ];

  const tradeCols: GridColumn<(typeof result.trades)[number]>[] = [
    { key: 'id', title: '#', render: (r) => <span className="num text-text3">{r.id}</span> },
    { key: 'side', title: 'Side', render: (r) => <span className={cx('badge', r.side === 'LONG' ? 'badge-up' : 'badge-down')}>{r.side}</span> },
    { key: 'entry', title: 'Entry', render: (r) => <span className="num">{fmtPrice(r.entry, def.decimals)}</span> },
    { key: 'exit', title: 'Exit', render: (r) => <span className="num">{fmtPrice(r.exit, def.decimals)}</span> },
    { key: 'qty', title: 'Size', render: (r) => <span className="num">{fmtNum(r.qty, 4)}</span> },
    { key: 'pnl', title: 'P&L', sortable: true, sortVal: (r) => r.pnl, render: (r) => <span className={cx('num font-semibold', r.pnl >= 0 ? 'text-up' : 'text-down')}>{fmtSignedMoney(r.pnl)}</span> },
    { key: 'ret', title: 'Ret%', sortable: true, sortVal: (r) => r.pnlPct, render: (r) => <span className={cx('num', r.pnl >= 0 ? 'text-up' : 'text-down')}>{fmtPct(r.pnlPct)}</span> },
    { key: 'mae', title: 'MAE%', render: (r) => <span className="num text-text2">{fmtPct(r.maePct, 1)}</span> },
    { key: 'mfe', title: 'MFE%', render: (r) => <span className="num text-text2">{fmtPct(r.mfePct, 1)}</span> },
    { key: 'bars', title: 'Bars', sortable: true, sortVal: (r) => r.bars, render: (r) => <span className="num">{r.bars}</span> },
    { key: 'exit', title: 'Exit reason', render: (r) => <span className="text-text2 text-[10.5px]">{r.exitReason}</span> },
    { key: 'time', title: 'Exit time', sortable: true, sortVal: (r) => r.exitTime, render: (r) => <span className="num text-text3">{fmtTime(r.exitTime * 1000)}</span> },
  ];

  return (
    <div className="space-y-2 pb-2">
      <div className="flex items-center gap-2">
        <div className="ttabs">
          {(['overview', 'trades', 'monthly'] as const).map((t) => (
            <button key={t} className={cx('ttab !h-[26px]', tab === t && 'active')} onClick={() => setTab(t)}>
              {t === 'overview' ? 'Overview' : t === 'trades' ? `Trades (${m.trades})` : 'Monthly'}
            </button>
          ))}
        </div>
        <span className="flex-1" />
        <span className="num text-[10.5px] text-text3">{c.strategy.name} · {c.symbol} {c.timeframe} · {c.bars} bars · {c.sizing} {c.sizingValue}</span>
      </div>

      {tab === 'overview' && (
        <>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-px bg-line border border-line rounded-md overflow-hidden">
            {stats.map((s) => (
              <div key={s.l} className="bg-panel px-2.5 py-2 min-w-0">
                <Metric label={s.l} value={s.v} size="sm" tone={s.t} />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
            <Panel title="Equity curve" subtitle={`${fmtMoney(c.capital, 0)} → ${fmtMoney(m.finalEquity, 0)}`} bodyClassName="p-2">
              <EquityChart data={result.equityCurve} height={170} />
            </Panel>
            <Panel title="Drawdown" subtitle={`max −${fmtPct(m.maxDDPct, 2)}`} bodyClassName="p-2">
              <DDChart data={result.drawdownCurve} height={170} />
            </Panel>
            <Panel title="P&L distribution" subtitle="per-trade return %" bodyClassName="p-2">
              <DistBars data={result.pnlHistogram} height={130} />
            </Panel>
            <Panel title="Trade stats" bodyClassName="p-2.5">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
                <Row k="Average win" v={`${fmtMoney(m.avgWin)} (${fmtPct(m.avgWinPct)})`} t="text-up" />
                <Row k="Average loss" v={`${fmtMoney(m.avgLoss)} (${fmtPct(m.avgLossPct)})`} t="text-down" />
                <Row k="Avg hold" v={`${m.avgHoldBars.toFixed(1)} bars`} />
                <Row k="Commissions + slip" v={fmtMoney(m.commission)} />
                <Row k="Final equity" v={fmtMoney(m.finalEquity)} />
                <Row k="Return / maxDD" v={`${(m.maxDDPct ? m.totalReturnPct / m.maxDDPct : 0).toFixed(2)}`} />
              </div>
            </Panel>
          </div>
        </>
      )}

      {tab === 'trades' && (
        <Panel title="Trade list" subtitle={`${m.trades} closed trades · sorted by exit`} bodyClassName="!overflow-auto">
          <DataGrid columns={tradeCols} rows={result.trades} rowKey={(r) => String(r.id)} defaultSort="time" defaultDir="desc" />
        </Panel>
      )}

      {tab === 'monthly' && (
        <Panel title="Monthly returns" subtitle="compounded per month" bodyClassName="p-2.5">
          {result.monthly.length === 0 && <div className="text-[11px] text-text3">Not enough history for monthly breakdown.</div>}
          <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-1.5">
            {result.monthly.map((mo) => (
              <div key={mo.month} className={cx('rounded border px-2 py-1.5', mo.pnl >= 0 ? 'border-up/30 bg-upbg/50' : 'border-down/30 bg-downbg/50')}>
                <div className="num text-[10px] text-text3">{mo.month}</div>
                <div className={cx('num text-[13px] font-bold', mo.pnl >= 0 ? 'text-up' : 'text-down')}>{fmtPct(mo.pnlPct, 1)}</div>
                <div className="num text-[10px] text-text2">{fmtSignedMoney(mo.pnl, 0)}</div>
              </div>
            ))}
          </div>
        </Panel>
      )}
    </div>
  );
}

function Row({ k, v, t }: { k: string; v: string; t?: string }): React.ReactElement {
  return (
    <>
      <span className="text-text3">{k}</span>
      <span className={cx('num text-right', t ?? 'text-text1')}>{v}</span>
    </>
  );
}

function DDChart({ data, height }: { data: Array<{ time: number; ddPct: number }>; height: number }): React.ReactElement {
  const W = 600, H = 200;
  const max = Math.max(0.01, ...data.map((d) => d.ddPct));
  const pts = data.map((d, i) => ({
    x: (i / Math.max(1, data.length - 1)) * (W - 8) + 4,
    y: 6 + (d.ddPct / max) * (H - 16),
  }));
  const d = pts.length ? `M${pts[0].x},${pts[0].y}` + pts.slice(1).map((p) => `L${p.x},${p.y}`).join('') : '';
  return (
    <div className="w-full" style={{ height }}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-full">
        <path d={`${d}L${W - 4},6L4,6Z`} fill="rgba(246,70,93,0.18)" />
        <path d={d} fill="none" stroke="#f6465d" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

function CompareView({ runs }: { runs: BacktestResult[] }): React.ReactElement {
  const colors = ['#4d8dff', '#0ecb81', '#f0b90b', '#8b7cff'];
  const W = 800, H = 240;
  const norm = runs.map((r) => {
    const start = r.equityCurve[0]?.equity ?? 1;
    return r.equityCurve.map((p) => ((p.equity - start) / start) * 100);
  });
  const allMax = Math.max(1, ...norm.flat());
  const allMin = Math.min(-1, ...norm.flat());
  const yOf = (v: number): number => H - 14 - ((v - allMin) / (allMax - allMin)) * (H - 28);
  const rows: Array<{ l: string; get: (r: BacktestResult) => string; num?: (r: BacktestResult) => number }> = [
    { l: 'Net return', get: (r) => fmtPct(r.metrics.totalReturnPct, 1), num: (r) => r.metrics.totalReturnPct },
    { l: 'Sharpe', get: (r) => r.metrics.sharpe.toFixed(2), num: (r) => r.metrics.sharpe },
    { l: 'Max DD', get: (r) => `−${fmtPct(r.metrics.maxDDPct, 1)}`, num: (r) => -r.metrics.maxDDPct },
    { l: 'Win rate', get: (r) => fmtPct(r.metrics.winRate, 1), num: (r) => r.metrics.winRate },
    { l: 'Profit factor', get: (r) => r.metrics.profitFactor.toFixed(2), num: (r) => r.metrics.profitFactor },
    { l: 'Trades', get: (r) => String(r.metrics.trades) },
    { l: 'Expectancy', get: (r) => fmtSignedMoney(r.metrics.expectancy), num: (r) => r.metrics.expectancy },
  ];
  return (
    <div className="space-y-2">
      <Panel title="Equity comparison" subtitle="normalized %" bodyClassName="p-2">
        <div className="flex gap-3 px-1 mb-1 flex-wrap">
          {runs.map((r, i) => (
            <span key={r.id} className="flex items-center gap-1.5 text-[10.5px]">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: colors[i % colors.length] }} />
              <span className="font-semibold">{r.config.strategy.name}</span>
              <span className="num text-text3">{r.config.symbol} {r.config.timeframe}</span>
            </span>
          ))}
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full" style={{ height: 220 }}>
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="#1a2334" strokeWidth="1" />
          ))}
          <line x1="0" x2={W} y1={yOf(0)} y2={yOf(0)} stroke="#273449" strokeWidth="1" strokeDasharray="4 3" />
          {norm.map((series, i) => {
            const step = Math.max(1, Math.floor(series.length / 400));
            const pts = series.filter((_, k) => k % step === 0).map((v, k, arr) => ({
              x: (k / Math.max(1, arr.length - 1)) * (W - 8) + 4, y: yOf(v),
            }));
            const d = pts.length ? `M${pts[0].x},${pts[0].y}` + pts.slice(1).map((p) => `L${p.x},${p.y}`).join('') : '';
            return <path key={i} d={d} fill="none" stroke={colors[i % colors.length]} strokeWidth="1.6" vectorEffect="non-scaling-stroke" />;
          })}
        </svg>
      </Panel>
      <Panel title="Metric comparison" subtitle="best value highlighted" bodyClassName="!overflow-auto">
        <table className="dgrid">
          <thead><tr><th>Metric</th>{runs.map((r) => <th key={r.id}>{r.config.strategy.name.slice(0, 18)}</th>)}</tr></thead>
          <tbody>
            {rows.map((row) => {
              const vals = runs.map((r) => row.num?.(r));
              const best = vals.every((v) => v === undefined) ? null : Math.max(...(vals as number[]));
              return (
                <tr key={row.l}>
                  <td className="!text-left text-text2">{row.l}</td>
                  {runs.map((r) => {
                    const isBest = row.num && row.num(r) === best && runs.length > 1;
                    return <td key={r.id} className={cx('num', isBest ? 'text-up font-bold' : '')}>{isBest ? '● ' : ''}{row.get(r)}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
