// F2 · chart pane data path. Same-origin engine API first, with an honest
// fallback chain. Binance's firewall blocks datacenter egress (Render gets
// 418s), but a visitor's BROWSER is a residential IP — so hop 2 talks to
// fapi.binance.com straight from the page. Every hop is labelled; nothing
// synthetic is ever presented as real.
//
//   1. server  binance   -> 'BINANCE · LIVE'
//   2. browser binance   -> 'BINANCE · LIVE (browser)'
//   3. server  edgedepth -> 'BINANCE · VIA GATEWAY'   (your gateway, if any)
//   4. demo              -> 'BINANCE OFFLINE → DEMO'

import { Candle, Source, Timeframe } from './types';

export interface LoadResult {
  candles: Candle[];
  badge: string;
  source: Source;   // the source that ACTUALLY produced the data
}

const BINANCE_KLINES = 'https://fapi.binance.com/fapi/v1/klines';

/** Hop 2: residential-IP path. Binance public market data, straight from the
    page; 6s abort so a blackholed network fails fast to the next hop. */
async function browserBinance(tf: Timeframe): Promise<Candle[]> {
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 6000);
  try {
    const r = await fetch(
      `${BINANCE_KLINES}?symbol=BTCUSDT&interval=${tf}&limit=400`,
      { signal: ctrl.signal });
    if (!r.ok) throw new Error(`binance ${r.status}`);
    const rows = (await r.json()) as (string | number)[][];
    if (!rows.length) throw new Error('binance served no klines');
    return rows.map((k) => ({
      ts: Number(k[0]) / 1000, open: Number(k[1]), high: Number(k[2]),
      low: Number(k[3]), close: Number(k[4]), volume: Number(k[5]),
    }));
  } finally {
    clearTimeout(to);
  }
}

export async function loadCandles(source: Source,
                                  tf: Timeframe): Promise<LoadResult> {
  const attempt = async (prov: string, sym: string) => {
    const r = await fetch(`/api/candles?provider=${prov}&symbol=${sym}` +
      `&timeframe=${tf}&limit=400`);
    if (!r.ok) throw new Error(`candles ${r.status}`);
    const j = await r.json();
    const rows = (j.candles as number[][]).map((c) => ({
      ts: c[0] > 1e12 ? c[0] / 1000 : c[0],
      open: c[1], high: c[2], low: c[3], close: c[4], volume: c[5],
    }));
    if (!rows.length) throw new Error('candles empty');
    return rows;
  };

  if (source === 'binance') {
    try {
      return { candles: await attempt('binance', 'BTCUSDT'),
               badge: 'BINANCE · LIVE', source: 'binance' };
    } catch { /* server egress blocked — try the browser path */ }
    try {
      return { candles: await browserBinance(tf),
               badge: 'BINANCE · LIVE (browser)', source: 'binance' };
    } catch { /* browser blocked too — gateway, then honest demo */ }
    try {
      return { candles: await attempt('edgedepth', 'BTCUSDT'),
               badge: 'BINANCE · VIA GATEWAY', source: 'binance' };
    } catch {
      return { candles: await attempt('demo', 'DEMO:BTC'),
               badge: 'BINANCE OFFLINE → DEMO', source: 'demo' };
    }
  }
  return { candles: await attempt('demo', 'DEMO:BTC'),
           badge: 'DEMO', source: 'demo' };
}
