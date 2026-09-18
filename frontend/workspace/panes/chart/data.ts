// F2 · chart pane data path. Same-origin engine API; source switch with an
// honest fallback chain: BINANCE first tries the direct spine (the
// edgedepth-gateway adapter, ported into the engine — zero config), then
// the user's gateway if one is configured, and only then DEMO, labelled.

import { Candle, Source, Timeframe } from './types';

export interface LoadResult {
  candles: Candle[];
  badge: string;
  source: Source;   // the source that ACTUALLY produced the data
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
      // direct Binance spine first: zero-config, no gateway needed
      return { candles: await attempt('binance', 'BTCUSDT'),
               badge: 'BINANCE · LIVE', source: 'binance' };
    } catch { /* fall through to the gateway path */ }
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
