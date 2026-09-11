export interface Candle {
  time: number; // unix seconds
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type Num = number | null;

function out(len: number): Num[] {
  return new Array<Num>(len).fill(null);
}

export function sma(values: number[], period: number): Num[] {
  const r = out(values.length);
  if (period <= 1) return values.map((v) => v);
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += values[i];
    if (i >= period) sum -= values[i - period];
    if (i >= period - 1) r[i] = sum / period;
  }
  return r;
}

export function ema(values: number[], period: number): Num[] {
  const r = out(values.length);
  if (values.length === 0) return r;
  const k = 2 / (period + 1);
  let prev = values[0];
  for (let i = 0; i < values.length; i++) {
    prev = i === 0 ? values[0] : values[i] * k + prev * (1 - k);
    if (i >= period - 1) r[i] = prev;
  }
  return r;
}

export function wma(values: number[], period: number): Num[] {
  const r = out(values.length);
  const denom = (period * (period + 1)) / 2;
  for (let i = period - 1; i < values.length; i++) {
    let s = 0;
    for (let j = 0; j < period; j++) s += values[i - period + 1 + j] * (j + 1);
    r[i] = s / denom;
  }
  return r;
}

export function rsi(closes: number[], period = 14): Num[] {
  const r = out(closes.length);
  if (closes.length <= period) return r;
  let gain = 0, loss = 0;
  for (let i = 1; i <= period; i++) {
    const d = closes[i] - closes[i - 1];
    if (d >= 0) gain += d; else loss -= d;
  }
  let ag = gain / period, al = loss / period;
  r[period] = al === 0 ? 100 : 100 - 100 / (1 + ag / al);
  for (let i = period + 1; i < closes.length; i++) {
    const d = closes[i] - closes[i - 1];
    ag = (ag * (period - 1) + Math.max(d, 0)) / period;
    al = (al * (period - 1) + Math.max(-d, 0)) / period;
    r[i] = al === 0 ? 100 : 100 - 100 / (1 + ag / al);
  }
  return r;
}

export interface MacdResult { macd: Num[]; signal: Num[]; hist: Num[]; }
export function macd(closes: number[], fast = 12, slow = 26, signalP = 9): MacdResult {
  const ef = ema(closes, fast);
  const es = ema(closes, slow);
  const line: number[] = closes.map((_, i) => (ef[i] !== null && es[i] !== null ? (ef[i] as number) - (es[i] as number) : 0));
  const firstValid = closes.findIndex((_, i) => ef[i] !== null && es[i] !== null);
  const sigRaw = ema(line.slice(Math.max(0, firstValid)), signalP);
  const signal = out(closes.length);
  const macdL = out(closes.length);
  const hist = out(closes.length);
  for (let i = 0; i < closes.length; i++) {
    if (ef[i] !== null && es[i] !== null) macdL[i] = line[i];
  }
  for (let j = 0; j < sigRaw.length; j++) {
    const i = Math.max(0, firstValid) + j;
    if (sigRaw[j] !== null && macdL[i] !== null) {
      signal[i] = sigRaw[j];
      hist[i] = (macdL[i] as number) - (sigRaw[j] as number);
    }
  }
  return { macd: macdL, signal, hist };
}

export interface BBResult { upper: Num[]; middle: Num[]; lower: Num[]; width: Num[]; pctB: Num[]; }
export function bollinger(closes: number[], period = 20, mult = 2): BBResult {
  const mid = sma(closes, period);
  const upper = out(closes.length), lower = out(closes.length), width = out(closes.length), pctB = out(closes.length);
  for (let i = period - 1; i < closes.length; i++) {
    let s = 0;
    for (let j = i - period + 1; j <= i; j++) s += closes[j];
    const m = s / period;
    let v = 0;
    for (let j = i - period + 1; j <= i; j++) v += (closes[j] - m) ** 2;
    const sd = Math.sqrt(v / period);
    upper[i] = m + mult * sd;
    lower[i] = m - mult * sd;
    width[i] = (m === 0 ? 0 : ((m + mult * sd) - (m - mult * sd)) / Math.abs(m)) * 100;
    const range = (m + mult * sd) - (m - mult * sd);
    pctB[i] = range === 0 ? 0.5 : (closes[i] - (m - mult * sd)) / range;
  }
  return { upper, middle: mid, lower, width, pctB };
}

export function atr(candles: Candle[], period = 14): Num[] {
  const r = out(candles.length);
  if (candles.length <= period) return r;
  const trs: number[] = candles.map((c, i) => {
    if (i === 0) return c.high - c.low;
    const pc = candles[i - 1].close;
    return Math.max(c.high - c.low, Math.abs(c.high - pc), Math.abs(c.low - pc));
  });
  let a = trs.slice(1, period + 1).reduce((s, v) => s + v, 0) / period;
  r[period] = a;
  for (let i = period + 1; i < candles.length; i++) {
    a = (a * (period - 1) + trs[i]) / period;
    r[i] = a;
  }
  return r;
}

export function vwap(candles: Candle[]): Num[] {
  const r = out(candles.length);
  let pv = 0, v = 0;
  for (let i = 0; i < candles.length; i++) {
    const c = candles[i];
    const tp = (c.high + c.low + c.close) / 3;
    pv += tp * c.volume;
    v += c.volume;
    r[i] = v === 0 ? c.close : pv / v;
  }
  return r;
}

/** session-anchored vwap (resets each day) */
export function sessionVwap(candles: Candle[]): Num[] {
  const r = out(candles.length);
  let pv = 0, v = 0, day = -1;
  for (let i = 0; i < candles.length; i++) {
    const d = Math.floor(candles[i].time / 86400);
    if (d !== day) { day = d; pv = 0; v = 0; }
    const c = candles[i];
    const tp = (c.high + c.low + c.close) / 3;
    pv += tp * c.volume;
    v += c.volume;
    r[i] = v === 0 ? c.close : pv / v;
  }
  return r;
}

export interface StochResult { k: Num[]; d: Num[]; }
export function stochastic(candles: Candle[], kP = 14, dP = 3): StochResult {
  const k = out(candles.length), d = out(candles.length);
  for (let i = kP - 1; i < candles.length; i++) {
    let hi = -Infinity, lo = Infinity;
    for (let j = i - kP + 1; j <= i; j++) {
      hi = Math.max(hi, candles[j].high);
      lo = Math.min(lo, candles[j].low);
    }
    k[i] = hi === lo ? 50 : ((candles[i].close - lo) / (hi - lo)) * 100;
  }
  const kf = k.filter((v) => v !== null) as number[];
  const ds = sma(kf, dP);
  let di = 0;
  for (let i = 0; i < candles.length; i++) {
    if (k[i] !== null) { d[i] = ds[di] ?? null; di++; }
  }
  return { k, d };
}

export function obv(candles: Candle[]): number[] {
  const r: number[] = new Array(candles.length).fill(0);
  let acc = 0;
  for (let i = 0; i < candles.length; i++) {
    if (i > 0) {
      if (candles[i].close > candles[i - 1].close) acc += candles[i].volume;
      else if (candles[i].close < candles[i - 1].close) acc -= candles[i].volume;
    }
    r[i] = acc;
  }
  return r;
}

export function adx(candles: Candle[], period = 14): { adx: Num[]; plusDI: Num[]; minusDI: Num[] } {
  const adxR = out(candles.length), pdi = out(candles.length), mdi = out(candles.length);
  if (candles.length <= period * 2) return { adx: adxR, plusDI: pdi, minusDI: mdi };
  let spdm = 0, smdm = 0, str = 0;
  for (let i = 1; i <= period; i++) {
    const c = candles[i], p = candles[i - 1];
    const up = c.high - p.high, dn = p.low - c.low;
    spdm += up > dn && up > 0 ? up : 0;
    smdm += dn > up && dn > 0 ? dn : 0;
    str += Math.max(c.high - c.low, Math.abs(c.high - p.close), Math.abs(c.low - p.close));
  }
  let pdiV = str === 0 ? 0 : (spdm / str) * 100;
  let mdiV = str === 0 ? 0 : (smdm / str) * 100;
  let dx = pdiV + mdiV === 0 ? 0 : (Math.abs(pdiV - mdiV) / (pdiV + mdiV)) * 100;
  let adxV = dx;
  pdi[period] = pdiV; mdi[period] = mdiV;
  for (let i = period + 1; i < candles.length; i++) {
    const c = candles[i], p = candles[i - 1];
    const up = c.high - p.high, dn = p.low - c.low;
    const pdm = up > dn && up > 0 ? up : 0;
    const mdm = dn > up && dn > 0 ? dn : 0;
    const tr = Math.max(c.high - c.low, Math.abs(c.high - p.close), Math.abs(c.low - p.close));
    spdm = spdm - spdm / period + pdm;
    smdm = smdm - smdm / period + mdm;
    str = str - str / period + tr;
    pdiV = str === 0 ? 0 : (spdm / str) * 100;
    mdiV = str === 0 ? 0 : (smdm / str) * 100;
    dx = pdiV + mdiV === 0 ? 0 : (Math.abs(pdiV - mdiV) / (pdiV + mdiV)) * 100;
    adxV = (adxV * (period - 1) + dx) / period;
    pdi[i] = pdiV; mdi[i] = mdiV; adxR[i] = adxV;
  }
  return { adx: adxR, plusDI: pdi, minusDI: mdi };
}

export function donchian(candles: Candle[], period = 20): { upper: Num[]; lower: Num[]; mid: Num[] } {
  const upper = out(candles.length), lower = out(candles.length), mid = out(candles.length);
  for (let i = period - 1; i < candles.length; i++) {
    let hi = -Infinity, lo = Infinity;
    for (let j = i - period + 1; j <= i; j++) {
      hi = Math.max(hi, candles[j].high);
      lo = Math.min(lo, candles[j].low);
    }
    upper[i] = hi; lower[i] = lo; mid[i] = (hi + lo) / 2;
  }
  return { upper, lower, mid };
}

export function heikinAshi(candles: Candle[]): Candle[] {
  const r: Candle[] = [];
  let po = candles.length ? candles[0].open : 0, pc = candles.length ? candles[0].close : 0;
  for (const c of candles) {
    const close = (c.open + c.high + c.low + c.close) / 4;
    const open = (po + pc) / 2;
    const high = Math.max(c.high, open, close);
    const low = Math.min(c.low, open, close);
    r.push({ time: c.time, open, high, low, close, volume: c.volume });
    po = open; pc = close;
  }
  return r;
}

export function stdev(values: number[], period: number): Num[] {
  const r = out(values.length);
  for (let i = period - 1; i < values.length; i++) {
    const slice = values.slice(i - period + 1, i + 1);
    const m = slice.reduce((a, b) => a + b, 0) / period;
    r[i] = Math.sqrt(slice.reduce((a, b) => a + (b - m) ** 2, 0) / period);
  }
  return r;
}

export function roc(values: number[], period: number): Num[] {
  const r = out(values.length);
  for (let i = period; i < values.length; i++) {
    r[i] = values[i - period] === 0 ? 0 : ((values[i] - values[i - period]) / values[i - period]) * 100;
  }
  return r;
}

export function trueRange(candles: Candle[]): number[] {
  return candles.map((c, i) => {
    if (i === 0) return c.high - c.low;
    const pc = candles[i - 1].close;
    return Math.max(c.high - c.low, Math.abs(c.high - pc), Math.abs(c.low - pc));
  });
}

export function last<T>(arr: Array<T | null>): T | null {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] !== null && arr[i] !== undefined) return arr[i] as T;
  }
  return null;
}
