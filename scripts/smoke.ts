/**
 * TraderOS stabilization smoke suite (headless, runs in Node).
 *
 * Exercises the layers that can fail without any browser:
 *  indicators, symbol universe, market engine, paper broker,
 *  backtest engine + rule compiler, news/intel, and zustand stores.
 *
 * Run: npm run smoke
 */
import {
  sma, ema, rsi, macd, bollinger, atr, sessionVwap, stochastic, obv, adx, donchian,
  heikinAshi, stdev, roc, type Candle,
} from '../src/indicators';
import { SYMBOLS, SYMBOL_MAP, TIMEFRAMES, TF_SECONDS } from '../src/services/symbols';
import { marketEngine } from '../src/services/marketEngine';
import { broker } from '../src/services/tradingService';
import {
  runBacktest, templateStrategies, mkRule, defaultRisk, lastValues,
  type BacktestConfig,
} from '../src/services/backtestService';
import { getNews, getCalendar, marketBrief } from '../src/services/newsService';

let pass = 0;
let fail = 0;
const failures: string[] = [];

function ok(cond: boolean, name: string, extra?: string): void {
  if (cond) { pass++; }
  else { fail++; failures.push(`${name}${extra ? ` — ${extra}` : ''}`); console.error(`  ✗ ${name}${extra ? ` — ${extra}` : ''}`); }
}
function finite(n: number, name: string): void {
  ok(Number.isFinite(n), name, `got ${n}`);
}
function section(name: string): void { console.log(`\n## ${name}`); }

// ---------------------------------------------------------------- symbols
section('symbols');
ok(SYMBOLS.length >= 30, 'universe has 30+ symbols', `got ${SYMBOLS.length}`);
ok(new Set(SYMBOLS.map((s) => s.symbol)).size === SYMBOLS.length, 'symbols unique');
ok(Object.keys(SYMBOL_MAP).length === SYMBOLS.length, 'symbol map complete');
for (const s of SYMBOLS) {
  ok(s.base > 0 && s.tick > 0 && s.tickVol > 0, `symbol ${s.symbol} params sane`);
}
ok(TIMEFRAMES.every((t) => TF_SECONDS[t] > 0), 'all timeframes have seconds');
ok(TIMEFRAMES.length === 11, '11 timeframes');

// ---------------------------------------------------------------- indicators
section('indicators');
const N = 260;
const candles: Candle[] = [];
let px = 100;
let seed = 42;
const rnd = (): number => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
for (let i = 0; i < N; i++) {
  const o = px;
  const drift = (rnd() - 0.5) * 2;
  const c = Math.max(1, o + drift);
  const h = Math.max(o, c) + rnd();
  const l = Math.min(o, c) - rnd();
  candles.push({ time: 1700000000 + i * 60, open: o, high: h, low: l, close: c, volume: 1000 + rnd() * 9000 });
  px = c;
}
const closes = candles.map((c) => c.close);
const allFinite = (arr: Array<number | null>): boolean => arr.every((v) => v === null || Number.isFinite(v));
ok(sma(closes, 20).length === N && allFinite(sma(closes, 20)), 'sma shape/finite');
ok(ema(closes, 21).length === N && allFinite(ema(closes, 21)), 'ema shape/finite');
const r = rsi(closes, 14);
ok(r.length === N && r.every((v) => v === null || (v >= 0 && v <= 100)), 'rsi bounded 0..100');
const m = macd(closes);
ok(m.macd.length === N && m.signal.length === N && m.hist.length === N, 'macd shapes');
ok(m.hist.every((h, i) => h === null || m.macd[i] === null || m.signal[i] === null || Math.abs(h - ((m.macd[i] as number) - (m.signal[i] as number))) < 1e-9), 'macd hist identity');
const b = bollinger(closes);
ok(b.upper.every((u, i) => u === null || b.middle[i] === null || b.lower[i] === null || (u >= (b.middle[i] as number) && (b.middle[i] as number) >= (b.lower[i] as number))), 'bb ordering');
ok(atr(candles, 14).every((v) => v === null || v >= 0), 'atr non-negative');
ok(allFinite(sessionVwap(candles)), 'session vwap finite');
const st = stochastic(candles);
ok(st.k.every((v) => v === null || (v >= 0 && v <= 100)), 'stoch bounded');
ok(obv(candles).length === N, 'obv shape');
const ax = adx(candles);
ok(ax.adx.length === N && allFinite(ax.adx), 'adx shape/finite');
ok(donchian(candles, 20).upper.length === N, 'donchian shape');
ok(heikinAshi(candles).length === N, 'heikin shape');
ok(allFinite(stdev(closes, 20)) && allFinite(roc(closes, 10)), 'stdev/roc finite');

// ---------------------------------------------------------------- market engine
section('market engine');
const quotes = marketEngine.getAllQuotes();
ok(quotes.length === SYMBOLS.length, 'quotes cover universe');
for (const q of quotes) {
  if (!(q.bid < q.ask && q.spread > 0 && q.high >= q.low && Number.isFinite(q.vwap) && q.volume >= 0)) {
    ok(false, `quote ${q.symbol} sane`, JSON.stringify({ bid: q.bid, ask: q.ask, hi: q.high, lo: q.low }));
    break;
  }
}
ok(true, 'all quotes sane (bid<ask, hi>=lo, finite vwap)');
for (const tf of TIMEFRAMES) {
  const cs = marketEngine.getCandles('BTCUSDT', tf, 120);
  const asc = cs.every((c, i) => i === 0 || c.time > cs[i - 1].time);
  const ohlc = cs.every((c) => c.high >= Math.max(c.open, c.close) && c.low <= Math.min(c.open, c.close) && c.volume > 0);
  ok(cs.length === 120 && asc && ohlc, `candles ${tf} ordered + ohlc-valid`);
}
for (const s of ['BTCUSDT', 'NVDA', 'ES', 'EURUSD']) {
  const book = marketEngine.getBook(s, 15);
  const bidsDesc = book.bids.every((b, i) => i === 0 || b.price < book.bids[i - 1].price);
  const asksAsc = book.asks.every((a, i) => i === 0 || a.price > book.asks[i - 1].price);
  ok(book.bids.length === 15 && book.asks.length === 15 && bidsDesc && asksAsc, `book ${s} sorted`);
  ok(book.bids.every((b) => b.bid > 0) && book.asks.every((a) => a.ask > 0), `book ${s} sizes positive`);
  const tape = marketEngine.getTape(s, 50);
  ok(tape.length > 0 && tape.every((t, i) => i === 0 || t.id < tape[i - 1].id), `tape ${s} newest-first`);
  const fp = marketEngine.getFootprint(s, 10);
  ok(fp.length === 10 && fp.every((f) => Math.abs(f.delta - (f.askTotal - f.bidTotal)) < 1e-6), `footprint ${s} delta identity`);
  ok(fp.every((f) => f.rows.every((rw, i) => i === 0 || rw.price < f.rows[i - 1].price)), `footprint ${s} rows desc`);
  const hm = marketEngine.getHeatmap(s, 72, 44);
  ok(hm.matrix.length === 72 && hm.matrix[0].length === 44 && hm.prices.length === 44 && hm.max > 0, `heatmap ${s} dims`);
}

// ---------------------------------------------------------------- paper broker
section('paper broker');
// reset to known state
broker.cash = 250000;
broker.startingEquity = 250000;
broker.realizedToday = 0;
broker.feesToday = 0;
broker.orders = [];
broker.fills = [];
broker.positions.clear();
const tick = (): void => (broker as unknown as { onMarketTick: () => void }).onMarketTick();

const q0 = marketEngine.getQuote('BTCUSDT');
let res = broker.placeOrder({ symbol: 'BTCUSDT', side: 'BUY', type: 'MKT', qty: 0.5 });
ok(res.error === null && res.order?.status === 'FILLED', 'market buy fills immediately');
ok(broker.positionList().length === 1 && broker.positionList()[0].side === 'LONG', 'long position opened');
broker.setPositionBracket('BTCUSDT', q0.price * 0.9, q0.price * 1.1);
ok(broker.openOrders().length === 2, 'bracket spawns 2 OCO children');
broker.cancelAll();
ok(broker.openOrders().length === 0, 'cancelAll clears children');
res = broker.placeOrder({ symbol: 'NVDA', side: 'BUY', type: 'LMT', qty: 10, limitPrice: 1 });
ok(res.error === null && res.order?.status === 'WORKING', 'resting limit stays working');
broker.modifyOrder(res.order!.id, { limitPrice: 2 });
ok(broker.openOrders()[0].limitPrice === 2, 'modify updates price');
broker.cancelOrder(res.order!.id);
ok(broker.openOrders().length === 0, 'cancel removes order');
const qAsk = marketEngine.getQuote('ETHUSDT').ask;
res = broker.placeOrder({ symbol: 'ETHUSDT', side: 'BUY', type: 'LMT', qty: 1, limitPrice: qAsk });
tick();
ok(res.order?.status === 'FILLED', 'marketable limit fills on tick');
const qBid = marketEngine.getQuote('SOLUSDT').bid;
res = broker.placeOrder({ symbol: 'SOLUSDT', side: 'BUY', type: 'STP', qty: 5, stopPrice: qBid });
tick();
ok(res.order?.status === 'FILLED', 'triggered stop fills on tick');
res = broker.placeOrder({ symbol: 'BTCUSDT', side: 'BUY', type: 'MKT', qty: 1e9 });
ok(res.error !== null && res.order === null, 'insufficient funds rejected');
broker.reversePosition('BTCUSDT');
ok(broker.positionList().find((p) => p.symbol === 'BTCUSDT')?.side === 'SHORT', 'reverse flips side');
broker.closePosition('BTCUSDT', 0.5);
broker.closePosition('BTCUSDT', 1);
ok(!broker.positionList().find((p) => p.symbol === 'BTCUSDT'), 'close removes position');
broker.flattenAll();
ok(broker.positionList().length === 0, 'flattenAll clears book');
finite(broker.equity(), 'equity finite');
finite(broker.dayPnl(), 'day pnl finite');
ok(broker.buyingPower() >= 0, 'buying power non-negative');
ok(broker.fills.length > 0 && broker.fills.every((f) => f.qty > 0 && f.price > 0 && f.fee >= 0), 'fills sane');

// ---------------------------------------------------------------- backtest engine
section('backtest engine');
const templates = templateStrategies('BTCUSDT', '1h');
ok(templates.length === 5, '5 strategy templates');
const baseCfg = (tf: '1h' | '15m', strat: (typeof templates)[number]): BacktestConfig => ({
  symbol: 'BTCUSDT', timeframe: tf, bars: 600, capital: 100000,
  commissionBps: 2, slippageBps: 1, sizing: 'riskPct', sizingValue: 1,
  leverage: 1, strategy: strat, longOnly: false, shortOnly: false,
});
for (const t of templates) {
  for (const tf of ['1h', '15m'] as const) {
    const bt = runBacktest(baseCfg(tf, t));
    const mm = bt.metrics;
    const allM = [mm.totalReturnPct, mm.cagr, mm.sharpe, mm.sortino, mm.calmar, mm.maxDDPct, mm.winRate, mm.profitFactor, mm.expectancy];
    ok(allM.every(Number.isFinite), `${t.name} ${tf} metrics finite`);
    ok(bt.equityCurve.length > 50 && bt.drawdownCurve.length > 50, `${t.name} ${tf} curves non-empty`);
    ok(mm.finalEquity > 0, `${t.name} ${tf} final equity positive`);
    ok(bt.trades.every((tr) => tr.exitReason.length > 0 && Number.isFinite(tr.pnl)), `${t.name} ${tf} trades sane`);
  }
}
// branch coverage: sizings, directions, risk off, time exit, pct risk
const custom = JSON.parse(JSON.stringify(templates[0])) as (typeof templates)[number];
custom.rules.risk = { stopType: 'none', stopValue: 0, targetType: 'none', targetValue: 0, maxHoldBars: 10 };
const c1 = runBacktest({ ...baseCfg('1h', custom), sizing: 'fixedQty', sizingValue: 0.1, longOnly: true });
ok(c1.metrics.trades >= 0 && c1.trades.every((t) => t.side === 'LONG'), 'fixedQty + longOnly + time exit');
const c2 = runBacktest({ ...baseCfg('1h', custom), sizing: 'equityPct', sizingValue: 10, shortOnly: true, leverage: 3 });
ok(c2.trades.every((t) => t.side === 'SHORT'), 'equityPct + shortOnly + leverage');
const pct = JSON.parse(JSON.stringify(templates[1])) as (typeof templates)[number];
pct.rules.risk = { stopType: 'pct', stopValue: 2, targetType: 'pct', targetValue: 4, maxHoldBars: 0 };
const c3 = runBacktest({ ...baseCfg('15m', pct), bars: 120 });
ok(c3.equityCurve.length > 0, 'pct risk + min bars');
const empty = JSON.parse(JSON.stringify(templates[2])) as (typeof templates)[number];
empty.rules.entryLong = []; empty.rules.entryShort = [];
const c4 = runBacktest(baseCfg('1h', empty));
ok(c4.metrics.trades === 0 && c4.metrics.finalEquity === 100000, 'no rules → no trades, flat equity');
// rule compiler spot checks via exported helper path
const rTest = mkRule({ left: 'rsi', leftParam: 14, op: 'crossesAbove', rightValue: 70 });
ok(rTest.id.startsWith('r') && rTest.op === 'crossesAbove', 'mkRule builds');
ok(defaultRisk().stopType === 'atr', 'defaultRisk sane');
const lv = lastValues('NVDA', '1h');
ok(lv.rsi14 !== null && lv.ema9 !== null && lv.atr14 !== null && lv.vwap !== null, 'lastValues snapshot complete');

// ---------------------------------------------------------------- news / intel
section('news + intel');
const news = getNews(undefined, 60);
ok(news.length > 0 && news.every((n) => n.headline.length > 5 && n.symbols.length > 0 && n.time <= Date.now()), 'news items sane');
const cal = getCalendar();
ok(cal.length === 14 && cal.every((e) => e.title.length > 0), 'calendar has 14 events');
const brief = marketBrief();
ok(brief.breadth >= 0 && brief.breadth <= 100 && brief.leaders.length === 3, 'market brief sane');

// ---------------------------------------------------------------- stores (with DOM shims)
section('stores');
const mem = new Map<string, string>();
(globalThis as unknown as { localStorage: Storage }).localStorage = {
  getItem: (k: string) => mem.get(k) ?? null,
  setItem: (k: string, v: string) => { mem.set(k, v); },
  removeItem: (k: string) => { mem.delete(k); },
  clear: () => mem.clear(),
  key: (i: number) => [...mem.keys()][i] ?? null,
  length: 0,
} as Storage;
const { useWorkspaceStore } = await import('../src/store/useWorkspaceStore');
const { useMarketStore } = await import('../src/store/useMarketStore');
const { useResearchStore } = await import('../src/store/useResearchStore');
useWorkspaceStore.getState().applyPreset('p-day');
ok(useWorkspaceStore.getState().view === 'chart' && useWorkspaceStore.getState().symbol === 'NVDA', 'preset applies view+symbol');
useWorkspaceStore.getState().savePreset('Smoke');
ok(useWorkspaceStore.getState().presets.some((p) => p.name === 'Smoke'), 'preset saves');
useWorkspaceStore.getState().deletePreset(useWorkspaceStore.getState().presets.find((p) => p.name === 'Smoke')!.id);
ok(!useWorkspaceStore.getState().presets.some((p) => p.name === 'Smoke'), 'preset deletes');
useWorkspaceStore.getState().nudgeRight(50);
ok(useWorkspaceStore.getState().rightWidth === 250, 'nudgeRight math');
useWorkspaceStore.getState().nudgeBottom(-40);
ok(useWorkspaceStore.getState().bottomHeight === 252, 'nudgeBottom math');
useMarketStore.getState().addWatchlist('SmokeList');
useMarketStore.getState().addToWatchlist('SmokeList', 'NVDA');
useMarketStore.getState().addToWatchlist('SmokeList', 'AAPL');
useMarketStore.getState().moveInWatchlist('SmokeList', 0, 1);
ok(useMarketStore.getState().watchlists['SmokeList'][0] === 'AAPL', 'watchlist reorder');
useMarketStore.getState().removeFromWatchlist('SmokeList', 'AAPL');
useMarketStore.getState().removeWatchlist('SmokeList');
ok(!useMarketStore.getState().watchlists['SmokeList'], 'watchlist removes');
useMarketStore.getState().addAlert('BTCUSDT', 'above', 99999999);
ok(useMarketStore.getState().alerts.length === 1, 'alert adds');
useMarketStore.getState().removeAlert(useMarketStore.getState().alerts[0].id);
ok(useMarketStore.getState().alerts.length === 0, 'alert removes');
useResearchStore.getState().duplicateStrategy('tpl-trend-ema');
ok(useResearchStore.getState().strategies.length === 6, 'strategy duplicates');
useResearchStore.getState().deleteStrategy(useResearchStore.getState().activeStrategyId);
ok(useResearchStore.getState().strategies.length === 5, 'strategy deletes');

// ---------------------------------------------------------------- summary
console.log(`\n${'='.repeat(48)}\nPASS: ${pass}  FAIL: ${fail}`);
if (fail > 0) { console.error('\nFailures:'); failures.forEach((f) => console.error(` - ${f}`)); process.exit(1); }
console.log('SMOKE OK');
