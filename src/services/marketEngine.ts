import { SYMBOLS, SYMBOL_MAP, TF_SECONDS, type SymbolDef, type Timeframe } from './symbols';
import type { Candle } from '../indicators';
import { mulberry32, hashStr } from '../lib/utils';

/**
 * MarketEngine — simulated live market-data feed.
 *
 * Presents the same interface a real websocket-backed feed would:
 * quotes, candles, order book, tape, footprint. A real backend can
 * replace this module without touching any UI code.
 */

export interface Quote {
  symbol: string;
  price: number;
  prevPrice: number;
  prevClose: number;
  open: number;
  high: number;
  low: number;
  change: number;
  changePct: number;
  bid: number;
  ask: number;
  spread: number;
  spreadBps: number;
  volume: number;
  quoteVolume: number;
  relVol: number;
  vwap: number;
  trades: number;
  lastSize: number;
  lastSide: 'buy' | 'sell';
  time: number;
  tickDir: 1 | -1 | 0;
}

export interface BookLevel {
  price: number;
  bid: number;
  ask: number;
  bidOrders: number;
  askOrders: number;
}

export interface TapeTrade {
  id: number;
  time: number;
  price: number;
  size: number;
  notional: number;
  side: 'buy' | 'sell';
  exchange: string;
}

export interface FootprintBar {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  rows: Array<{ price: number; bid: number; ask: number; delta: number; volume: number }>;
  delta: number;
  volume: number;
  bidTotal: number;
  askTotal: number;
  poc: number;
}

interface SymState {
  def: SymbolDef;
  price: number;
  prevPrice: number;
  open: number;
  high: number;
  low: number;
  prevClose: number;
  volume: number;
  quoteVolume: number;
  trades: number;
  vwapNum: number;
  vwapDen: number;
  tickDir: 1 | -1 | 0;
  lastSize: number;
  lastSide: 'buy' | 'sell';
  daySeed: number;
  tape: TapeTrade[];
  tradeId: number;
  bookBias: number;
}

const TICK_MS = 800;
const MAX_TAPE = 160;

class MarketEngine {
  version = 0;
  latencyMs = 14;
  connected = true;
  sessionStart = Date.now();
  private states = new Map<string, SymState>();
  private candleCache = new Map<string, Candle[]>();
  private footprintCache = new Map<string, { bars: FootprintBar[]; stamp: number }>();
  private timer: ReturnType<typeof setInterval> | null = null;
  private listeners = new Set<() => void>();

  constructor() {
    const dayId = Math.floor(Date.now() / 86400000);
    for (const def of SYMBOLS) {
      const rnd = mulberry32(hashStr(def.symbol) ^ dayId);
      const gap = (rnd() - 0.48) * def.tickVol * 22;
      const open = def.base * (1 + gap);
      const prevClose = def.base;
      this.states.set(def.symbol, {
        def,
        price: open,
        prevPrice: open,
        open,
        high: open,
        low: open,
        prevClose,
        volume: 0,
        quoteVolume: 0,
        trades: 0,
        vwapNum: 0,
        vwapDen: 0,
        tickDir: 0,
        lastSize: 0,
        lastSide: 'buy',
        daySeed: hashStr(def.symbol + dayId),
        tape: [],
        tradeId: 1,
        bookBias: rnd() - 0.5,
      });
    }
    // prime day volume so relVol / vwap look real from the first paint
    for (const st of this.states.values()) {
      const rnd = mulberry32(st.daySeed ^ 0x9e37);
      const frac = 0.18 + rnd() * 0.3;
      const v = st.def.avgVol * frac;
      st.volume = v;
      st.quoteVolume = v * st.price;
      st.vwapNum = v * st.price * (1 + (rnd() - 0.5) * 0.001);
      st.vwapDen = v;
      st.trades = Math.floor(v / Math.max(1, this.typSize(st.def)));
      let hi = st.open, lo = st.open;
      const steps = 40;
      let p = st.prevClose;
      for (let i = 0; i < steps; i++) {
        p *= 1 + (rnd() - 0.5) * st.def.tickVol * 6;
        hi = Math.max(hi, p);
        lo = Math.min(lo, p);
      }
      st.high = Math.max(hi, st.open);
      st.low = Math.min(lo, st.open);
      // prime tape
      for (let i = 0; i < 40; i++) this.pushTrade(st, Date.now() - (40 - i) * 9000 - Math.floor(rnd() * 8000), true);
    }
  }

  // ---------- lifecycle ----------
  start(): void {
    if (this.timer) return;
    this.timer = setInterval(() => this.tick(), TICK_MS);
  }

  subscribe(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => { this.listeners.delete(fn); };
  }

  private emit(): void {
    this.version++;
    this.listeners.forEach((fn) => fn());
  }

  // ---------- tick simulation ----------
  private typSize(def: SymbolDef): number {
    if (def.asset === 'FX') return 1_000_000;
    if (def.asset === 'CRYPTO') return Math.max(0.001, (25000 / def.base) * 2);
    if (def.asset === 'FUTURES') return 4;
    return 120;
  }

  private tick(): void {
    const now = Date.now();
    this.latencyMs = Math.round(9 + Math.random() * 26 + (Math.random() < 0.04 ? 60 : 0));
    for (const st of this.states.values()) {
      const d = st.def;
      // regime: slow sine + noise keeps trends alive for a while
      const t = now / 1000;
      const regime = Math.sin(t / 900 + (st.daySeed % 100) / 10) * 0.6 + Math.sin(t / 211 + (st.daySeed % 37)) * 0.4;
      const shock = Math.random() < 0.006 ? (Math.random() - 0.5) * d.tickVol * 30 : 0;
      const drift = (Math.random() - 0.5) * 2 * d.tickVol + d.drift + regime * d.tickVol * 0.35 + shock;
      // gentle mean reversion to session VWAP-ish anchor
      const anchor = st.vwapDen > 0 ? st.vwapNum / st.vwapDen : st.open;
      const mr = ((anchor - st.price) / st.price) * 0.004;
      const prev = st.price;
      st.prevPrice = prev;
      st.price = Math.max(d.tick, prev * (1 + drift + mr));
      st.tickDir = st.price > prev ? 1 : st.price < prev ? -1 : 0;
      st.high = Math.max(st.high, st.price);
      st.low = Math.min(st.low, st.price);
      const nTrades = 1 + Math.floor(Math.random() * (d.asset === 'CRYPTO' ? 6 : 3));
      for (let i = 0; i < nTrades; i++) this.pushTrade(st, now, false);
      st.bookBias = Math.max(-1, Math.min(1, st.bookBias + (Math.random() - 0.5) * 0.12));
    }
    this.emit();
  }

  private pushTrade(st: SymState, now: number, prime: boolean): void {
    const d = st.def;
    const rnd = prime ? mulberry32(st.daySeed ^ st.tradeId ^ 0x51f3) : Math.random;
    const side: 'buy' | 'sell' = rnd() < 0.5 + st.bookBias * 0.2 + (st.tickDir * 0.08) ? 'buy' : 'sell';
    const base = this.typSize(d);
    const logn = Math.exp((rnd() + rnd() + rnd() - 1.5) * 1.6);
    const block = rnd() < 0.012 ? 18 + rnd() * 40 : 1;
    const size = Math.max(d.asset === 'FX' ? 1000 : 0.0001, base * logn * block);
    const slipTicks = Math.floor(rnd() * 2);
    const price = st.price + (side === 'buy' ? 1 : -1) * slipTicks * d.tick * 0.5;
    const trade: TapeTrade = {
      id: st.tradeId++,
      time: now,
      price,
      size,
      notional: size * price,
      side,
      exchange: d.exchange,
    };
    st.tape.unshift(trade);
    if (st.tape.length > MAX_TAPE) st.tape.pop();
    if (!prime) {
      st.volume += size;
      st.quoteVolume += size * price;
      st.trades += 1;
      st.vwapNum += size * price;
      st.vwapDen += size;
      st.lastSize = size;
      st.lastSide = side;
    }
  }

  // ---------- quotes ----------
  getQuote(symbol: string): Quote {
    const st = this.states.get(symbol) ?? this.states.get('BTCUSDT')!;
    const d = st.def;
    const halfSpread = Math.max(d.tick / 2, st.price * 0.000008);
    const bid = st.price - halfSpread;
    const ask = st.price + halfSpread;
    const expected = Math.max(1, d.avgVol * this.sessionFrac());
    return {
      symbol: d.symbol,
      price: st.price,
      prevPrice: st.prevPrice,
      prevClose: st.prevClose,
      open: st.open,
      high: st.high,
      low: st.low,
      change: st.price - st.prevClose,
      changePct: ((st.price - st.prevClose) / st.prevClose) * 100,
      bid,
      ask,
      spread: ask - bid,
      spreadBps: ((ask - bid) / st.price) * 10000,
      volume: st.volume,
      quoteVolume: st.quoteVolume,
      relVol: d.avgVol === 0 ? 1 : st.volume / expected,
      vwap: st.vwapDen > 0 ? st.vwapNum / st.vwapDen : st.price,
      trades: st.trades,
      lastSize: st.lastSize,
      lastSide: st.lastSide,
      time: Date.now(),
      tickDir: st.tickDir,
    };
  }

  getQuotes(symbols: string[]): Quote[] {
    return symbols.map((s) => this.getQuote(s));
  }

  getAllQuotes(): Quote[] {
    return SYMBOLS.map((d) => this.getQuote(d.symbol));
  }

  private sessionFrac(): number {
    // pretend we're partway through whatever session is active
    const h = new Date().getUTCHours() + new Date().getUTCMinutes() / 60;
    return Math.min(0.95, Math.max(0.12, (h % 12) / 12 + 0.15));
  }

  // ---------- candles ----------
  getCandles(symbol: string, tf: Timeframe, count = 400): Candle[] {
    const key = `${symbol}|${tf}|${count}`;
    const cached = this.candleCache.get(key);
    if (cached) {
      // merge live price into the forming candle (intraday tfs)
      const last = cached[cached.length - 1];
      const st = this.states.get(symbol);
      if (st && last && TF_SECONDS[tf] < 86400) {
        last.close = st.price;
        last.high = Math.max(last.high, st.price);
        last.low = Math.min(last.low, st.price);
      }
      return cached;
    }
    const def = SYMBOL_MAP[symbol] ?? SYMBOLS[0];
    const tfSec = TF_SECONDS[tf];
    const now = Math.floor(Date.now() / 1000);
    const aligned = Math.floor(now / tfSec) * tfSec;
    const scale = Math.sqrt(tfSec / 0.8) * def.tickVol;
    const rnd = mulberry32((hashStr(symbol + tf) ^ 0x51ab3) >>> 0);
    // walk backwards from a value near current session open so history joins live price
    const st = this.states.get(symbol);
    const anchor = st ? st.open : def.base;
    const closes: number[] = new Array(count);
    closes[count - 1] = anchor;
    let trend = (rnd() - 0.5) * 2;
    for (let i = count - 2; i >= 0; i--) {
      if (rnd() < 0.02) trend = (rnd() - 0.5) * 3;
      const shock = rnd() < 0.015 ? (rnd() - 0.5) * scale * 14 : 0;
      const ret = (rnd() - 0.5) * 2 * scale + trend * scale * 0.25 + shock;
      const mr = ((def.base - closes[i + 1]) / def.base) * 0.002;
      closes[i] = Math.max(def.tick, closes[i + 1] / (1 + ret + mr));
    }
    const candles: Candle[] = [];
    const volBase = def.avgVol === 0 ? 1000 : def.avgVol / (tfSec >= 86400 ? 1 : Math.max(1, 86400 / tfSec));
    for (let i = 0; i < count; i++) {
      const open = i === 0 ? closes[0] * (1 + (rnd() - 0.5) * scale) : closes[i - 1];
      const close = closes[i];
      const spread = Math.abs(close - open) + closes[i] * scale * (0.4 + rnd());
      const high = Math.max(open, close) + spread * rnd() * 0.7;
      const low = Math.min(open, close) - spread * rnd() * 0.7;
      const volSpike = rnd() < 0.03 ? 3 + rnd() * 5 : 1;
      const volume = Math.max(1, volBase * (0.35 + rnd() * 1.1) * volSpike * (Math.abs(close - open) / (closes[i] * scale + 1e-12) * 0.4 + 0.8));
      candles.push({ time: aligned - (count - 1 - i) * tfSec, open, high, low, close, volume });
    }
    // join last candle to live price
    const lastC = candles[candles.length - 1];
    if (st && tfSec < 86400) {
      lastC.close = st.price;
      lastC.high = Math.max(lastC.high, st.price);
      lastC.low = Math.min(lastC.low, st.price);
    }
    this.candleCache.set(key, candles);
    // bound cache
    if (this.candleCache.size > 60) {
      const first = this.candleCache.keys().next().value;
      if (first) this.candleCache.delete(first);
    }
    return candles;
  }

  // ---------- order book ----------
  getBook(symbol: string, rows = 15): { bids: BookLevel[]; asks: BookLevel[]; mid: number } {
    const st = this.states.get(symbol) ?? this.states.get('BTCUSDT')!;
    const d = st.def;
    const q = this.getQuote(symbol);
    const mid = (q.bid + q.ask) / 2;
    const rnd = mulberry32((hashStr(symbol) ^ (this.version * 2654435761)) >>> 0);
    const bids: BookLevel[] = [];
    const asks: BookLevel[] = [];
    const baseSize = this.typSize(d);
    for (let i = 0; i < rows; i++) {
      const wall = rnd() < 0.06 ? 8 + rnd() * 22 : 1;
      const wallA = rnd() < 0.06 ? 8 + rnd() * 22 : 1;
      const depthDecay = 1 / (1 + i * 0.28);
      const bidBias = 1 + st.bookBias * 0.5;
      const askBias = 1 - st.bookBias * 0.5;
      bids.push({
        price: q.bid - i * d.tick,
        bid: Math.max(baseSize * 0.02, baseSize * (0.25 + rnd() * 1.6) * depthDecay * bidBias * wall),
        ask: 0,
        bidOrders: 1 + Math.floor(rnd() * 9),
        askOrders: 0,
      });
      asks.push({
        price: q.ask + i * d.tick,
        bid: 0,
        ask: Math.max(baseSize * 0.02, baseSize * (0.25 + rnd() * 1.6) * depthDecay * askBias * wallA),
        bidOrders: 0,
        askOrders: 1 + Math.floor(rnd() * 9),
      });
    }
    return { bids, asks, mid };
  }

  // ---------- tape ----------
  getTape(symbol: string, limit = 80): TapeTrade[] {
    const st = this.states.get(symbol);
    return st ? st.tape.slice(0, limit) : [];
  }

  // ---------- footprint ----------
  getFootprint(symbol: string, bars = 18): FootprintBar[] {
    const cached = this.footprintCache.get(symbol);
    if (cached && this.version - cached.stamp < 3) return cached.bars.slice(-bars);
    const candles = this.getCandles(symbol, '5m', 60);
    const slice = candles.slice(-bars);
    const def = SYMBOL_MAP[symbol] ?? SYMBOLS[0];
    const out: FootprintBar[] = slice.map((c, bi) => {
      const rnd = mulberry32(hashStr(symbol + c.time) >>> 0);
      const range = Math.max(c.high - c.low, def.tick * 4);
      const n = 14;
      const step = range / n;
      const rows: FootprintBar['rows'] = [];
      let bidT = 0, askT = 0;
      const bull = c.close >= c.open ? 1 : -1;
      for (let r = 0; r < n; r++) {
        const price = c.low + step * (r + 0.5);
        const distTop = (c.high - price) / range;
        const center = 1 - Math.abs(r / (n - 1) - 0.5) * 1.6;
        const w = Math.max(0.08, center + rnd() * 0.3);
        const rowVol = (c.volume / n) * w * 2;
        const askShare = Math.min(0.92, Math.max(0.08, 0.5 + bull * 0.14 * (0.5 - distTop) + (rnd() - 0.5) * 0.35));
        const ask = rowVol * askShare;
        const bid = rowVol * (1 - askShare);
        bidT += bid; askT += ask;
        rows.push({ price, bid, ask, delta: ask - bid, volume: rowVol });
      }
      rows.sort((a, b) => b.price - a.price);
      const poc = rows.reduce((m, r) => (r.volume > m.volume ? r : m), rows[0]).price;
      void bi;
      return { time: c.time, open: c.open, high: c.high, low: c.low, close: c.close, rows, delta: askT - bidT, volume: c.volume, bidTotal: bidT, askTotal: askT, poc };
    });
    this.footprintCache.set(symbol, { bars: out, stamp: this.version });
    return out;
  }

  // ---------- heatmap matrix (price x time liquidity) ----------
  getHeatmap(symbol: string, cols = 72, rows = 44): { matrix: number[][]; prices: number[]; max: number; midRow: number } {
    const st = this.states.get(symbol) ?? this.states.get('BTCUSDT')!;
    const d = st.def;
    const candles = this.getCandles(symbol, '1m', cols + 10).slice(-cols);
    let lo = Infinity, hi = -Infinity;
    for (const c of candles) { lo = Math.min(lo, c.low); hi = Math.max(hi, c.high); }
    const pad = (hi - lo) * 0.12 + d.tick * 2;
    lo -= pad; hi += pad;
    const step = (hi - lo) / rows;
    const prices: number[] = [];
    for (let r = 0; r < rows; r++) prices.push(hi - step * (r + 0.5));
    const matrix: number[][] = [];
    let max = 0;
    for (let c = 0; c < cols; c++) {
      const cd = candles[c] ?? candles[candles.length - 1];
      const col: number[] = [];
      const rnd = mulberry32((hashStr(symbol + cd.time) ^ (c * 97)) >>> 0);
      const fresh = c / cols; // recent columns brighter
      for (let r = 0; r < rows; r++) {
        const p = prices[r];
        const inRange = p >= cd.low && p <= cd.high ? 1 : 0;
        const distMid = Math.abs(p - (cd.high + cd.low) / 2) / ((hi - lo) / 2);
        const wall = rnd() < 0.02 ? 3.2 : 1;
        const v = (inRange * (1.4 + rnd() * 1.8) + Math.max(0, 1 - distMid * 2.4) * (0.3 + rnd() * 0.7)) * (0.45 + fresh * 0.85) * wall;
        col.push(v);
        if (v > max) max = v;
      }
      matrix.push(col);
    }
    const midRow = Math.min(rows - 1, Math.max(0, Math.round(((hi - st.price) / (hi - lo)) * rows)));
    return { matrix, prices, max, midRow };
  }
}

export const marketEngine = new MarketEngine();
if (typeof window !== 'undefined') marketEngine.start();
