// F2 · chart pane data path with an honest, self-diagnosing fallback chain.
//
// Binance's main domains are WAF-418 from datacenter egress (Render) AND
// ISP-blocked in some countries (Nigeria), so every realistic route is a hop:
//
//   1. server  -> fapi, direct native     'BINANCE · LIVE'
//   2. browser -> fapi (residential IP)   'BINANCE · LIVE (browser)'
//   3. browser -> .vision mirror          'BINANCE SPOT · LIVE (browser)'
//   4. demo, with the failed hops named   'BINANCE OFFLINE → DEMO · srv✗ …'
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

// poll fast path remembers the winning hop; run(tf) so a timeframe switch
// never reuses a stale closure
let lastWinner: { tag: string; run: (tf: Timeframe) => Promise<LoadResult> }
  | null = null;

/** First fulfilled wins (Promise.any without the ES2021 dependency). */
function firstWin(jobs: Promise<LoadResult>[]): Promise<LoadResult> {
  return new Promise((resolve, reject) => {
    let left = jobs.length;
    if (!left) return reject(new Error('no hops'));
    for (const j of jobs) {
      j.then(resolve).catch(() => { left -= 1; if (left === 0) reject(new Error('all hops failed')); });
    }
  });
}

/** Browser-direct hops: 4s abort so a blocked network fails fast onward. */
async function browserKlines(base: string, tf: Timeframe): Promise<Candle[]> {
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 4000);
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
    const failed: string[] = [];
    type Hop = { tag: string; run: (tf: Timeframe) => Promise<LoadResult> };
    const hops: Hop[] = [
      { tag: 'srv', run: (tf) => attempt('binance', 'BTCUSDT').then((r) => ({
          candles: r.rows, source: 'binance' as Source,
          badge: r.venue === 'binance-spot' ? 'BINANCE SPOT · LIVE'
                                            : 'BINANCE · LIVE' })) },
      { tag: 'brw', run: (tf) => browserKlines(FAPI_KLINES, tf).then((c) => ({
          candles: c, source: 'binance' as Source,
          badge: 'BINANCE · LIVE (browser)' })) },
      { tag: 'mir', run: (tf) => browserKlines(MIRROR_KLINES, tf).then((c) => ({
          candles: c, source: 'binance' as Source,
          badge: 'BINANCE SPOT · LIVE (browser)' })) },
    ];
    // poll fast path: last round's winner goes direct, no re-race
    if (lastWinner) {
      try { return await lastWinner.run(tf); } catch { /* re-race below */ }
    }
    // race, don't queue: first honest hop to answer wins, so first paint
    // never waits behind a blocked network's timeout
    const jobs = hops.map((h) =>
      h.run(tf).then((r) => { lastWinner = h; return r; })
        .catch((e) => { failed.push(`${h.tag}✗`); throw e; }));
    try {
      return await firstWin(jobs);
    } catch { /* every hop failed — honest demo with the post-mortem */ }
    return { candles: (await attempt('demo', 'DEMO:BTC')).rows,
             badge: `BINANCE OFFLINE → DEMO · ${failed.join(' ')}`,
             source: 'demo' };
  }
  return { candles: (await attempt('demo', 'DEMO:BTC')).rows,
           badge: 'DEMO', source: 'demo' };
}
