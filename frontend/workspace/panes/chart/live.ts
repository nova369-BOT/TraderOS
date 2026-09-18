// F2 · realtime bridge. Browser-direct WebSocket with the same dual-base
// fallback as the REST chain: Binance's futures edge first, the public
// .vision mirror second (neither blocklist covers both ends for every user).
// Streams aggTrade (every print ticks the forming candle) + kline_<tf>
// (authoritative OHLCV, candle rolls). The pane paints through one rAF, so
// any trade rate stays at display refresh — zero React in the hot path.

import { Timeframe } from './types';

export interface KlineTick {
  openTime: number;                 // epoch seconds
  o: number; h: number; l: number; c: number; v: number;
  closed: boolean;
}
export interface TradeTick { price: number; qty: number; ts: number }

const BASES = ['wss://fstream.binance.com', 'wss://data-stream.binance.vision'];
const MAX_TRIES = BASES.length * 3;   // then give up; REST polling covers

export function openLiveFeed(
    symbol: string, tf: Timeframe,
    onKline: (k: KlineTick) => void,
    onTrade: (t: TradeTick) => void,
    onStatus: (live: boolean) => void): () => void {
  let ws: WebSocket | null = null;
  let dead = false;
  let bi = 0;
  let tries = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const advance = (delay: number) => {
    if (dead) return;
    bi = (bi + 1) % BASES.length;
    tries += 1;
    if (tries > MAX_TRIES) { onStatus(false); return; }
    timer = setTimeout(connect, delay);
  };

  const connect = () => {
    if (dead || typeof WebSocket === 'undefined') return;
    const base = BASES[bi];
    const s = symbol.toLowerCase();
    const url = `${base}/stream?streams=${s}@aggTrade/${s}@kline_${tf}`;
    try {
      ws = new WebSocket(url);
    } catch {
      advance(1000);
      return;
    }
    ws.onopen = () => { tries = 0; onStatus(true); };
    ws.onmessage = (ev) => {
      try {
        const env = JSON.parse(String(ev.data)) as
          { stream?: string; data?: Record<string, unknown> };
        const stream = env.stream ?? '';
        const d = env.data ?? {};
        if (stream.endsWith('@aggTrade')) {
          onTrade({ price: Number(d.p), qty: Number(d.q), ts: Number(d.T) });
        } else if (stream.includes('@kline_')) {
          const k = d.k as Record<string, unknown> | undefined;
          if (!k) return;
          onKline({
            openTime: Math.floor(Number(k.t) / 1000),
            o: Number(k.o), h: Number(k.h), l: Number(k.l),
            c: Number(k.c), v: Number(k.v), closed: !!k.x,
          });
        }
      } catch { /* malformed frame: never kill the feed */ }
    };
    ws.onerror = () => { try { ws?.close(); } catch { /* */ } };
    ws.onclose = () => { onStatus(false); advance(1000 + Math.random() * 800); };
  };

  connect();
  return () => {
    dead = true;
    if (timer) clearTimeout(timer);
    try { ws?.close(); } catch { /* */ }
  };
}
