import { marketEngine } from './marketEngine';
import type { Timeframe } from './symbols';
import {
  sma, ema, rsi, macd, bollinger, atr, sessionVwap, stochastic, donchian, obv,
  type Candle, last,
} from '../indicators';

/** Strategy-builder rule model (also used by the Strategies workspace) */
export type RuleSource =
  | 'price' | 'sma' | 'ema' | 'rsi' | 'macd' | 'macdSignal' | 'bbUpper' | 'bbLower'
  | 'vwap' | 'atr' | 'volume' | 'volSma' | 'stochK' | 'stochD' | 'donUpper' | 'donLower' | 'obv';

export type RuleOp = '>' | '<' | '>=' | '<=' | 'crossesAbove' | 'crossesBelow';

export interface RuleCondition {
  id: string;
  left: RuleSource;
  leftParam: number;
  op: RuleOp;
  rightKind: 'value' | 'source';
  rightValue: number;
  right: RuleSource;
  rightParam: number;
}

export interface RuleRisk {
  stopType: 'atr' | 'pct' | 'none';
  stopValue: number;
  targetType: 'atr' | 'pct' | 'none';
  targetValue: number;
  maxHoldBars: number; // 0 = no time exit
}

export interface RuleSet {
  entryLong: RuleCondition[];
  entryShort: RuleCondition[];
  exitLong: RuleCondition[];
  exitShort: RuleCondition[];
  risk: RuleRisk;
}

export interface BuiltStrategy {
  id: string;
  name: string;
  description: string;
  symbol: string;
  timeframe: Timeframe;
  rules: RuleSet;
  params: Record<string, number>;
  template: string;
  updatedAt: number;
}

export interface BacktestConfig {
  symbol: string;
  timeframe: Timeframe;
  bars: number;
  capital: number;
  commissionBps: number;
  slippageBps: number;
  sizing: 'fixedQty' | 'equityPct' | 'riskPct';
  sizingValue: number;
  leverage: number;
  strategy: BuiltStrategy;
  longOnly: boolean;
  shortOnly: boolean;
}

export interface BTTrade {
  id: number;
  side: 'LONG' | 'SHORT';
  entryTime: number;
  exitTime: number;
  entry: number;
  exit: number;
  qty: number;
  pnl: number;
  pnlPct: number;
  mae: number;
  mfe: number;
  maePct: number;
  mfePct: number;
  bars: number;
  exitReason: string;
}

export interface BacktestResult {
  id: string;
  config: BacktestConfig;
  ranAt: number;
  trades: BTTrade[];
  equityCurve: Array<{ time: number; equity: number }>;
  drawdownCurve: Array<{ time: number; dd: number; ddPct: number }>;
  monthly: Array<{ month: string; pnl: number; pnlPct: number }>;
  metrics: {
    totalReturn: number; totalReturnPct: number; cagr: number;
    sharpe: number; sortino: number; calmar: number;
    maxDD: number; maxDDPct: number; maxDDDays: number;
    winRate: number; profitFactor: number; expectancy: number;
    avgWin: number; avgLoss: number; avgWinPct: number; avgLossPct: number;
    trades: number; wins: number; losses: number;
    avgHoldBars: number; exposurePct: number;
    commission: number; finalEquity: number;
  };
  pnlHistogram: Array<{ bin: number; count: number; avg: number }>;
}

// ---------------- indicator precompute ----------------
interface Precomp {
  closes: number[];
  sma: Map<number, Array<number | null>>;
  ema: Map<number, Array<number | null>>;
  rsi: Map<number, Array<number | null>>;
  atr: Map<number, Array<number | null>>;
  volSma: Map<number, Array<number | null>>;
  macd: { macd: Array<number | null>; signal: Array<number | null> } | null;
  bb: { upper: Array<number | null>; lower: Array<number | null> } | null;
  vwap: Array<number | null> | null;
  stoch: { k: Array<number | null>; d: Array<number | null> } | null;
  don: { upper: Array<number | null>; lower: Array<number | null> } | null;
  obv: number[] | null;
}

function precompute(candles: Candle[], rules: RuleSet): Precomp {
  const closes = candles.map((c) => c.close);
  const vols = candles.map((c) => c.volume);
  const need = new Set<string>();
  const all = [...rules.entryLong, ...rules.entryShort, ...rules.exitLong, ...rules.exitShort];
  for (const r of all) {
    need.add(`${r.left}:${r.leftParam}`);
    if (r.rightKind === 'source') need.add(`${r.right}:${r.rightParam}`);
  }
  const pre: Precomp = {
    closes, sma: new Map(), ema: new Map(), rsi: new Map(), atr: new Map(), volSma: new Map(),
    macd: null, bb: null, vwap: null, stoch: null, don: null, obv: null,
  };
  for (const key of need) {
    const [src, p] = key.split(':');
    const period = Math.max(1, Math.round(Number(p) || 14));
    if (src === 'sma' && !pre.sma.has(period)) pre.sma.set(period, sma(closes, period));
    if (src === 'ema' && !pre.ema.has(period)) pre.ema.set(period, ema(closes, period));
    if (src === 'rsi' && !pre.rsi.has(period)) pre.rsi.set(period, rsi(closes, period));
    if (src === 'atr' && !pre.atr.has(period)) pre.atr.set(period, atr(candles, period));
    if (src === 'volSma' && !pre.volSma.has(period)) pre.volSma.set(period, sma(vols, period));
    if ((src === 'macd' || src === 'macdSignal') && !pre.macd) pre.macd = macd(closes);
    if ((src === 'bbUpper' || src === 'bbLower') && !pre.bb) { const b = bollinger(closes); pre.bb = { upper: b.upper, lower: b.lower }; }
    if (src === 'vwap' && !pre.vwap) pre.vwap = sessionVwap(candles);
    if ((src === 'stochK' || src === 'stochD') && !pre.stoch) pre.stoch = stochastic(candles);
    if ((src === 'donUpper' || src === 'donLower') && !pre.don) { const d = donchian(candles); pre.don = { upper: d.upper, lower: d.lower }; }
    if (src === 'obv' && !pre.obv) pre.obv = obv(candles);
  }
  if (!pre.atr.has(14)) pre.atr.set(14, atr(candles, 14));
  return pre;
}

function sourceVal(src: RuleSource, param: number, i: number, candles: Candle[], pre: Precomp): number | null {
  const c = candles[i];
  switch (src) {
    case 'price': return c.close;
    case 'volume': return c.volume;
    case 'sma': return pre.sma.get(Math.max(1, Math.round(param)))?.[i] ?? null;
    case 'ema': return pre.ema.get(Math.max(1, Math.round(param)))?.[i] ?? null;
    case 'rsi': return pre.rsi.get(Math.max(1, Math.round(param)))?.[i] ?? null;
    case 'atr': return pre.atr.get(Math.max(1, Math.round(param)))?.[i] ?? null;
    case 'volSma': return pre.volSma.get(Math.max(1, Math.round(param)))?.[i] ?? null;
    case 'macd': return pre.macd?.macd[i] ?? null;
    case 'macdSignal': return pre.macd?.signal[i] ?? null;
    case 'bbUpper': return pre.bb?.upper[i] ?? null;
    case 'bbLower': return pre.bb?.lower[i] ?? null;
    case 'vwap': return pre.vwap?.[i] ?? null;
    case 'stochK': return pre.stoch?.k[i] ?? null;
    case 'stochD': return pre.stoch?.d[i] ?? null;
    case 'donUpper': return pre.don?.upper[i] ?? null;
    case 'donLower': return pre.don?.lower[i] ?? null;
    case 'obv': return pre.obv?.[i] ?? null;
  }
}

function evalCond(r: RuleCondition, i: number, candles: Candle[], pre: Precomp): boolean {
  const l = sourceVal(r.left, r.leftParam, i, candles, pre);
  const rv = r.rightKind === 'value' ? r.rightValue : sourceVal(r.right, r.rightParam, i, candles, pre);
  if (l === null || rv === null || rv === undefined) return false;
  switch (r.op) {
    case '>': return l > rv;
    case '<': return l < rv;
    case '>=': return l >= rv;
    case '<=': return l <= rv;
    case 'crossesAbove': {
      if (i === 0) return false;
      const pl = sourceVal(r.left, r.leftParam, i - 1, candles, pre);
      const prv = r.rightKind === 'value' ? r.rightValue : sourceVal(r.right, r.rightParam, i - 1, candles, pre);
      if (pl === null || prv === null || prv === undefined) return false;
      return pl <= prv && l > rv;
    }
    case 'crossesBelow': {
      if (i === 0) return false;
      const pl = sourceVal(r.left, r.leftParam, i - 1, candles, pre);
      const prv = r.rightKind === 'value' ? r.rightValue : sourceVal(r.right, r.rightParam, i - 1, candles, pre);
      if (pl === null || prv === null || prv === undefined) return false;
      return pl >= prv && l < rv;
    }
  }
}

function allTrue(conds: RuleCondition[], i: number, candles: Candle[], pre: Precomp): boolean {
  if (conds.length === 0) return false;
  return conds.every((c) => evalCond(c, i, candles, pre));
}

// ---------------- backtest engine ----------------
export function runBacktest(cfg: BacktestConfig): BacktestResult {
  const t0 = performance.now();
  void t0;
  const candles = marketEngine.getCandles(cfg.symbol, cfg.timeframe, Math.min(2000, Math.max(120, cfg.bars)));
  const closes = candles.map((c) => c.close);
  const pre = precompute(candles, cfg.strategy.rules);
  const atr14 = atr(candles, 14);

  const trades: BTTrade[] = [];
  const equityCurve: Array<{ time: number; equity: number }> = [];
  let equity = cfg.capital;
  let peak = equity;
  let commission = 0;
  const ddCurve: Array<{ time: number; dd: number; ddPct: number }> = [];
  let maxDD = 0, maxDDPct = 0, ddStart = 0, maxDDDays = 0;
  let barsInMarket = 0;

  interface OpenPos { side: 'LONG' | 'SHORT'; entry: number; entryIdx: number; qty: number; stop: number | null; target: number | null; worst: number; best: number; }
  let pos: OpenPos | null = null;
  let tradeId = 1;

  const costRate = (cfg.commissionBps + cfg.slippageBps) / 10000;

  const sizeQty = (px: number, i: number): number => {
    if (cfg.sizing === 'fixedQty') return Math.max(0.000001, cfg.sizingValue);
    if (cfg.sizing === 'equityPct') return Math.max(0.000001, ((equity * cfg.sizingValue) / 100) * cfg.leverage / px);
    // riskPct: size so that stop distance = risk% of equity
    const a = atr14[i] ?? px * 0.01;
    const stopDist = cfg.strategy.rules.risk.stopType === 'pct'
      ? px * (cfg.strategy.rules.risk.stopValue / 100)
      : a * Math.max(0.25, cfg.strategy.rules.risk.stopValue || 1.5);
    const riskAmt = (equity * cfg.sizingValue) / 100;
    return Math.max(0.000001, (riskAmt / Math.max(stopDist, px * 0.0001)) * 1);
  };

  const warmup = 60;
  for (let i = warmup; i < candles.length; i++) {
    const c = candles[i];
    const execPx = c.open; // enter/exit on next-bar open semantics approximated at bar open

    // manage open position: intrabar stop/target check
    if (pos) {
      barsInMarket++;
      const dir = pos.side === 'LONG' ? 1 : -1;
      pos.worst = pos.side === 'LONG' ? Math.min(pos.worst, c.low) : Math.max(pos.worst, c.high);
      pos.best = pos.side === 'LONG' ? Math.max(pos.best, c.high) : Math.min(pos.best, c.low);
      let exitPx: number | null = null;
      let reason = '';
      // stop first (conservative)
      if (pos.stop !== null) {
        if (pos.side === 'LONG' && c.low <= pos.stop) { exitPx = pos.stop; reason = 'Stop loss'; }
        if (pos.side === 'SHORT' && c.high >= pos.stop) { exitPx = pos.stop; reason = 'Stop loss'; }
      }
      if (exitPx === null && pos.target !== null) {
        if (pos.side === 'LONG' && c.high >= pos.target) { exitPx = pos.target; reason = 'Take profit'; }
        if (pos.side === 'SHORT' && c.low <= pos.target) { exitPx = pos.target; reason = 'Take profit'; }
      }
      // time exit
      const maxHold = cfg.strategy.rules.risk.maxHoldBars;
      if (exitPx === null && maxHold > 0 && i - pos.entryIdx >= maxHold) { exitPx = execPx; reason = 'Time exit'; }
      // rule exit evaluated on close
      if (exitPx === null) {
        const exitConds = pos.side === 'LONG' ? cfg.strategy.rules.exitLong : cfg.strategy.rules.exitShort;
        if (exitConds.length > 0 && allTrue(exitConds, i, candles, pre)) { exitPx = c.close; reason = 'Exit signal'; }
      }
      if (exitPx !== null) {
        const gross = (exitPx - pos.entry) * pos.qty * dir;
        const fee = (pos.qty * pos.entry + pos.qty * exitPx) * costRate;
        commission += fee;
        const pnl = gross - fee;
        equity += pnl;
        const mae = pos.side === 'LONG' ? pos.entry - pos.worst : pos.worst - pos.entry;
        const mfe = pos.side === 'LONG' ? pos.best - pos.entry : pos.entry - pos.best;
        trades.push({
          id: tradeId++, side: pos.side, entryTime: candles[pos.entryIdx].time, exitTime: c.time,
          entry: pos.entry, exit: exitPx, qty: pos.qty, pnl,
          pnlPct: ((exitPx - pos.entry) / pos.entry) * 100 * dir,
          mae, mfe, maePct: (mae / pos.entry) * 100, mfePct: (mfe / pos.entry) * 100,
          bars: i - pos.entryIdx, exitReason: reason,
        });
        pos = null;
      }
    }

    // entries
    if (!pos) {
      const longSig = !cfg.shortOnly && allTrue(cfg.strategy.rules.entryLong, i, candles, pre);
      const shortSig = !cfg.longOnly && allTrue(cfg.strategy.rules.entryShort, i, candles, pre);
      if (longSig || shortSig) {
        const side: 'LONG' | 'SHORT' = longSig ? 'LONG' : 'SHORT';
        const px = i + 1 < candles.length ? candles[i + 1].open : c.close;
        const qty = sizeQty(px, i);
        const a = atr14[i] ?? px * 0.01;
        const rk = cfg.strategy.rules.risk;
        const stopDist = rk.stopType === 'none' ? 0 : rk.stopType === 'pct' ? px * (rk.stopValue / 100) : a * rk.stopValue;
        const tgtDist = rk.targetType === 'none' ? 0 : rk.targetType === 'pct' ? px * (rk.targetValue / 100) : a * rk.targetValue;
        const dir = side === 'LONG' ? 1 : -1;
        pos = {
          side, entry: px, entryIdx: Math.min(i + 1, candles.length - 1), qty,
          stop: stopDist > 0 ? px - dir * stopDist : null,
          target: tgtDist > 0 ? px + dir * tgtDist : null,
          worst: px, best: px,
        };
        // Entry leg fee is counted at exit as a round-trip cost (see exit block).
      }
    }

    // mark-to-market for equity curve
    const mtm = pos ? (c.close - pos.entry) * pos.qty * (pos.side === 'LONG' ? 1 : -1) : 0;
    const eq = equity + mtm;
    equityCurve.push({ time: c.time, equity: eq });
    if (eq > peak) { peak = eq; ddStart = c.time; }
    const dd = peak - eq;
    const ddPct = peak === 0 ? 0 : (dd / peak) * 100;
    ddCurve.push({ time: c.time, dd, ddPct });
    if (ddPct > maxDDPct) { maxDDPct = ddPct; maxDD = dd; maxDDDays = (c.time - ddStart) / 86400; }
  }

  // force-close dangling position at last close
  if (pos) {
    const c = candles[candles.length - 1];
    const dir = pos.side === 'LONG' ? 1 : -1;
    const gross = (c.close - pos.entry) * pos.qty * dir;
    const fee = (pos.qty * pos.entry + pos.qty * c.close) * costRate;
    commission += fee;
    equity += gross - fee;
    trades.push({
      id: tradeId++, side: pos.side, entryTime: candles[pos.entryIdx].time, exitTime: c.time,
      entry: pos.entry, exit: c.close, qty: pos.qty, pnl: gross - fee,
      pnlPct: ((c.close - pos.entry) / pos.entry) * 100 * dir,
      mae: 0, mfe: 0, maePct: 0, mfePct: 0, bars: candles.length - 1 - pos.entryIdx, exitReason: 'End of data',
    });
  }

  // ---------- metrics ----------
  const wins = trades.filter((t) => t.pnl > 0);
  const losses = trades.filter((t) => t.pnl <= 0);
  const grossWin = wins.reduce((s, t) => s + t.pnl, 0);
  const grossLoss = Math.abs(losses.reduce((s, t) => s + t.pnl, 0));
  const totalReturn = equity - cfg.capital;
  const totalReturnPct = (totalReturn / cfg.capital) * 100;
  const years = Math.max(1 / 365, (candles[candles.length - 1].time - candles[0].time) / (365 * 86400));
  const cagr = (Math.pow(Math.max(0.0001, equity / cfg.capital), 1 / years) - 1) * 100;

  // daily-ish returns from equity curve sampling
  const rets: number[] = [];
  const step = Math.max(1, Math.floor(equityCurve.length / 250));
  for (let i = step; i < equityCurve.length; i += step) {
    const prev = equityCurve[i - step].equity;
    if (prev > 0) rets.push((equityCurve[i].equity - prev) / prev);
  }
  const mean = rets.length ? rets.reduce((a, b) => a + b, 0) / rets.length : 0;
  const sd = rets.length > 1 ? Math.sqrt(rets.reduce((a, b) => a + (b - mean) ** 2, 0) / (rets.length - 1)) : 0;
  const downside = rets.filter((r) => r < 0);
  const dsd = downside.length > 1
    ? Math.sqrt(downside.reduce((a, b) => a + b * b, 0) / downside.length)
    : 0;
  const ann = Math.sqrt(252 / Math.max(1, step));
  const sharpe = sd === 0 ? 0 : (mean / sd) * ann;
  const sortino = dsd === 0 ? (mean > 0 ? 8 : 0) : (mean / dsd) * ann;
  const calmar = maxDDPct === 0 ? (totalReturnPct > 0 ? 10 : 0) : totalReturnPct / maxDDPct;

  const monthly = new Map<string, { pnl: number; start: number }>();
  let mStart = cfg.capital;
  for (const p of equityCurve) {
    const d = new Date(p.time * 1000);
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    if (!monthly.has(key)) { monthly.set(key, { pnl: 0, start: mStart }); }
    const m = monthly.get(key)!;
    m.pnl = p.equity - m.start;
    mStart = p.equity;
  }
  void closes;

  const hist = new Map<number, { count: number; sum: number }>();
  for (const t of trades) {
    const b = Math.round(t.pnlPct * 2) / 2;
    const e = hist.get(b) ?? { count: 0, sum: 0 };
    e.count++; e.sum += t.pnl;
    hist.set(b, e);
  }
  const pnlHistogram = [...hist.entries()]
    .sort((a, b) => a[0] - b[0])
    .slice(0, 40)
    .map(([bin, v]) => ({ bin, count: v.count, avg: v.sum / v.count }));

  return {
    id: `BT-${Date.now().toString(36)}`,
    config: cfg,
    ranAt: Date.now(),
    trades,
    equityCurve,
    drawdownCurve: ddCurve,
    monthly: [...monthly.entries()].map(([month, v]) => ({ month, pnl: v.pnl, pnlPct: (v.pnl / v.start) * 100 })),
    metrics: {
      totalReturn, totalReturnPct, cagr,
      sharpe, sortino, calmar,
      maxDD, maxDDPct, maxDDDays,
      winRate: trades.length ? (wins.length / trades.length) * 100 : 0,
      profitFactor: grossLoss === 0 ? (grossWin > 0 ? 99 : 0) : grossWin / grossLoss,
      expectancy: trades.length ? totalReturn / trades.length : 0,
      avgWin: wins.length ? grossWin / wins.length : 0,
      avgLoss: losses.length ? grossLoss / losses.length : 0,
      avgWinPct: wins.length ? wins.reduce((s, t) => s + t.pnlPct, 0) / wins.length : 0,
      avgLossPct: losses.length ? losses.reduce((s, t) => s + t.pnlPct, 0) / losses.length : 0,
      trades: trades.length, wins: wins.length, losses: losses.length,
      avgHoldBars: trades.length ? trades.reduce((s, t) => s + t.bars, 0) / trades.length : 0,
      exposurePct: candles.length ? (barsInMarket / candles.length) * 100 : 0,
      commission, finalEquity: equity,
    },
    pnlHistogram,
  };
}

// ---------------- strategy templates ----------------
let ruleSeq = 1;
export function mkRule(partial: Partial<RuleCondition> & { left: RuleSource; op: RuleOp }): RuleCondition {
  return {
    id: `r${ruleSeq++}`,
    left: partial.left,
    leftParam: partial.leftParam ?? 14,
    op: partial.op,
    rightKind: partial.rightKind ?? 'value',
    rightValue: partial.rightValue ?? 0,
    right: partial.right ?? 'price',
    rightParam: partial.rightParam ?? 14,
  };
}

export function defaultRisk(): RuleRisk {
  return { stopType: 'atr', stopValue: 1.5, targetType: 'atr', targetValue: 3, maxHoldBars: 0 };
}

export function templateStrategies(symbol: string, tf: Timeframe): BuiltStrategy[] {
  const now = Date.now();
  return [
    {
      id: 'tpl-trend-ema', name: 'EMA Trend Rider', template: 'trend',
      description: 'Long when price is above EMA-50 and EMA-9 crosses above EMA-21. ATR stop, 2R target.',
      symbol, timeframe: tf, updatedAt: now,
      params: { fast: 9, slow: 21, trend: 50 },
      rules: {
        entryLong: [
          mkRule({ left: 'price', op: '>', rightKind: 'source', right: 'ema', rightParam: 50 }),
          mkRule({ left: 'ema', leftParam: 9, op: 'crossesAbove', rightKind: 'source', right: 'ema', rightParam: 21 }),
        ],
        entryShort: [
          mkRule({ left: 'price', op: '<', rightKind: 'source', right: 'ema', rightParam: 50 }),
          mkRule({ left: 'ema', leftParam: 9, op: 'crossesBelow', rightKind: 'source', right: 'ema', rightParam: 21 }),
        ],
        exitLong: [mkRule({ left: 'ema', leftParam: 9, op: 'crossesBelow', rightKind: 'source', right: 'ema', rightParam: 21 })],
        exitShort: [mkRule({ left: 'ema', leftParam: 9, op: 'crossesAbove', rightKind: 'source', right: 'ema', rightParam: 21 })],
        risk: { stopType: 'atr', stopValue: 1.5, targetType: 'atr', targetValue: 3, maxHoldBars: 0 },
      },
    },
    {
      id: 'tpl-rsi-mr', name: 'RSI Mean Reversion', template: 'meanrev',
      description: 'Fades RSI-14 extremes: long below 30, short above 70. Exits on RSI crossing 50.',
      symbol, timeframe: tf, updatedAt: now,
      params: { rsi: 14, oversold: 30, overbought: 70 },
      rules: {
        entryLong: [mkRule({ left: 'rsi', leftParam: 14, op: 'crossesBelow', rightValue: 30 })],
        entryShort: [mkRule({ left: 'rsi', leftParam: 14, op: 'crossesAbove', rightValue: 70 })],
        exitLong: [mkRule({ left: 'rsi', leftParam: 14, op: 'crossesAbove', rightValue: 50 })],
        exitShort: [mkRule({ left: 'rsi', leftParam: 14, op: 'crossesBelow', rightValue: 50 })],
        risk: { stopType: 'atr', stopValue: 2, targetType: 'atr', targetValue: 2.5, maxHoldBars: 0 },
      },
    },
    {
      id: 'tpl-vwap', name: 'VWAP Momentum Break', template: 'breakout',
      description: 'Long breakouts above VWAP with volume confirmation (2x 20-bar average).',
      symbol, timeframe: tf, updatedAt: now,
      params: { volMult: 2, volLen: 20 },
      rules: {
        entryLong: [
          mkRule({ left: 'price', op: 'crossesAbove', rightKind: 'source', right: 'vwap', rightParam: 0 }),
          mkRule({ left: 'volume', leftParam: 0, op: '>', rightKind: 'source', right: 'volSma', rightParam: 20 }),
        ],
        entryShort: [
          mkRule({ left: 'price', op: 'crossesBelow', rightKind: 'source', right: 'vwap', rightParam: 0 }),
          mkRule({ left: 'volume', leftParam: 0, op: '>', rightKind: 'source', right: 'volSma', rightParam: 20 }),
        ],
        exitLong: [mkRule({ left: 'price', op: 'crossesBelow', rightKind: 'source', right: 'vwap', rightParam: 0 })],
        exitShort: [mkRule({ left: 'price', op: 'crossesAbove', rightKind: 'source', right: 'vwap', rightParam: 0 })],
        risk: { stopType: 'atr', stopValue: 1.2, targetType: 'atr', targetValue: 2.4, maxHoldBars: 0 },
      },
    },
    {
      id: 'tpl-donch', name: 'Donchian Breakout 20/10', template: 'breakout',
      description: 'Classic turtle-style: 20-bar breakout entries, 10-bar channel exits.',
      symbol, timeframe: tf, updatedAt: now,
      params: { entry: 20, exit: 10 },
      rules: {
        entryLong: [mkRule({ left: 'price', op: '>', rightKind: 'source', right: 'donUpper', rightParam: 20 })],
        entryShort: [mkRule({ left: 'price', op: '<', rightKind: 'source', right: 'donLower', rightParam: 20 })],
        exitLong: [mkRule({ left: 'price', op: '<', rightKind: 'source', right: 'donLower', rightParam: 10 })],
        exitShort: [mkRule({ left: 'price', op: '>', rightKind: 'source', right: 'donUpper', rightParam: 10 })],
        risk: { stopType: 'atr', stopValue: 3, targetType: 'none', targetValue: 0, maxHoldBars: 0 },
      },
    },
    {
      id: 'tpl-macd', name: 'MACD Momentum', template: 'momentum',
      description: 'MACD line crosses with ADX-style trend filter via EMA stack.',
      symbol, timeframe: tf, updatedAt: now,
      params: {},
      rules: {
        entryLong: [
          mkRule({ left: 'macd', op: 'crossesAbove', rightKind: 'source', right: 'macdSignal' }),
          mkRule({ left: 'ema', leftParam: 21, op: '>', rightKind: 'source', right: 'ema', rightParam: 50 }),
        ],
        entryShort: [
          mkRule({ left: 'macd', op: 'crossesBelow', rightKind: 'source', right: 'macdSignal' }),
          mkRule({ left: 'ema', leftParam: 21, op: '<', rightKind: 'source', right: 'ema', rightParam: 50 }),
        ],
        exitLong: [mkRule({ left: 'macd', op: 'crossesBelow', rightKind: 'source', right: 'macdSignal' })],
        exitShort: [mkRule({ left: 'macd', op: 'crossesAbove', rightKind: 'source', right: 'macdSignal' })],
        risk: { stopType: 'atr', stopValue: 2, targetType: 'atr', targetValue: 3, maxHoldBars: 0 },
      },
    },
  ];
}

export function lastValues(symbol: string, tf: Timeframe): Record<string, number | null> {
  const candles = marketEngine.getCandles(symbol, tf, 220);
  const closes = candles.map((c) => c.close);
  const vols = candles.map((c) => c.volume);
  const out: Record<string, number | null> = {};
  out.price = closes[closes.length - 1];
  out.sma20 = last(sma(closes, 20)); out.sma50 = last(sma(closes, 50)); out.sma200 = last(sma(closes, 200));
  out.ema9 = last(ema(closes, 9)); out.ema21 = last(ema(closes, 21)); out.ema50 = last(ema(closes, 50));
  out.rsi14 = last(rsi(closes, 14)); out.rsi7 = last(rsi(closes, 7));
  const m = macd(closes);
  out.macd = last(m.macd); out.macdSignal = last(m.signal); out.macdHist = last(m.hist);
  const b = bollinger(closes);
  out.bbUpper = last(b.upper); out.bbMid = last(b.middle); out.bbLower = last(b.lower); out.bbWidth = last(b.width); out.pctB = last(b.pctB);
  out.atr14 = last(atr(candles, 14));
  out.vwap = last(sessionVwap(candles));
  const s = stochastic(candles);
  out.stochK = last(s.k); out.stochD = last(s.d);
  const d = donchian(candles);
  out.donUpper = last(d.upper); out.donLower = last(d.lower);
  out.volSma20 = last(sma(vols, 20));
  out.obv = obv(candles)[candles.length - 1];
  return out;
}
