// F2 · chart pane data path with an honest, self-diagnosing fallback chain.
//
// Binance's main domains are WAF-418 from datacenter egress (Render) AND
// ISP-blocked in some countries (Nigeria), so every realistic route is a hop:
//
//   1. server  -> fapi, mirror fallback   'BINANCE · LIVE' / 'BINANCE SPOT · LIVE'
//   2. browser -> fapi (residential IP)   'BINANCE · LIVE (browser)'
//   3. browser -> .vision mirror          'BINANCE SPOT · LIVE (browser)'
//   4. server  -> your edgedepth gateway  'BINANCE · VIA GATEWAY'
//   5. demo, with the failed hops named   'BINANCE OFFLINE → DEMO · srv✗ …'
//
// Nothing synthetic is ever presented as real.

import { Candle, Source, Timeframe } from './types';

export interface LoadResult {
  candles: Candle[];
  badge: string;
  source: Source;   // the source that ACTUALLY produced the data
}

const FAPI_KLINES = 'https://fapi.binance.com/fapi/v1/klines';
const MIRROR_KLINES = 'https://data-api.binance.vision/api/v3/klines';

/** Browser-direct hops: 6s abort so a blocked network fails fast onward. */
async function browserKlines(base: string, tf: Timeframe): Promise<Candle[]> {
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 6000);
  try {
    const r = await fetch(
      `${base}?symbol=BTCUSDT&interval=${tf}&limit=400`,
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
    return { rows, venue: String(j.venue ?? prov) };
  };

  if (source === 'binance') {
    const hops: string[] = [];
    try {
      const { rows, venue } = await attempt('binance', 'BTCUSDT');
      return { candles: rows, source: 'binance',
               badge: venue === 'binance-spot'
                 ? 'BINANCE SPOT · LIVE' : 'BINANCE · LIVE' };
    } catch { hops.push('srv✗'); }
    try {
      return { candles: await browserKlines(FAPI_KLINES, tf),
               badge: 'BINANCE · LIVE (browser)', source: 'binance' };
    } catch { hops.push('brw✗'); }
    try {
      return { candles: await browserKlines(MIRROR_KLINES, tf),
               badge: 'BINANCE SPOT · LIVE (browser)', source: 'binance' };
    } catch { hops.push('mir✗'); }
    try {
      return { candles: (await attempt('edgedepth', 'BTCUSDT')).rows,
               badge: 'BINANCE · VIA GATEWAY', source: 'binance' };
    } catch { hops.push('gw✗'); }
    return { candles: (await attempt('demo', 'DEMO:BTC')).rows,
             badge: `BINANCE OFFLINE → DEMO · ${hops.join(' ')}`,
             source: 'demo' };
  }
  return { candles: (await attempt('demo', 'DEMO:BTC')).rows,
           badge: 'DEMO', source: 'demo' };
}
