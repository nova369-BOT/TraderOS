// F2 · realtime bridge. Browser-direct WebSocket, BOTH bases raced in
// parallel (Binance futures edge + the public .vision mirror): first socket
// open wins so RT ticks start as soon as any route exists for this network,
// and the loser is closed. If the winner dies, reconnect re-races. Streams
// aggTrade (every print ticks the forming candle) + kline_<tf> (authoritative
// OHLCV, candle rolls). The pane paints through one rAF, so any trade rate
// stays at display refresh — zero React in the hot path.

import { Timeframe } from './types';

export interface KlineTick {
  openTime: number;                 // epoch seconds
  o: number; h: number; l: number; c: number; v: number;
  closed: boolean;
}
export interface TradeTick { price: number; qty: number; ts: number }

const BASES = ['wss://fstream.binance.com', 'wss://data-stream.binance.vision'];
const MAX_CYCLES = 3;   // full parallel races before giving up to REST polling

export function openLiveFeed(
    symbol: string, tf: Timeframe,
    onKline: (k: KlineTick) => void,
    onTrade: (t: TradeTick) => void,
    onStatus: (live: boolean) => void): () => void {
  let dead = false;
  let gen = 0;
  let cycles = 0;
  let socks: WebSocket[] = [];
  let timer: ReturnType<typeof setTimeout> | null = null;

  const handle = (env: { stream?: string; data?: Record<string, unknown> }) => {
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
  };

  const connect = () => {
    if (dead || typeof WebSocket === 'undefined') return;
    const g = ++gen;
    const s = symbol.toLowerCase();
    const url = (base: string) =>
      `${base}/stream?streams=${s}@aggTrade/${s}@kline_${tf}`;
    let winner: WebSocket | null = null;
    let failures = 0;
    socks = BASES.map((base) => {
      let ws: WebSocket;
      try { ws = new WebSocket(url(base)); } catch { failures++; return null; }
      ws.onopen = () => {
        if (g !== gen) { try { ws.close(); } catch { /* */ } return; }
        if (winner && winner !== ws) { try { ws.close(); } catch { /* */ }
                                       return; }
        winner = ws; cycles = 0; onStatus(true);
      };
      ws.onmessage = (ev) => {
        if (winner !== ws || dead) return;
        try { handle(JSON.parse(String(ev.data))); } catch { /* never die */ }
      };
      ws.onerror = () => { try { ws.close(); } catch { /* */ } };
      ws.onclose = () => {
        if (g !== gen) return;
        if (winner === ws) { winner = null; onStatus(false); }
        failures += 1;
        if (failures >= BASES.length) scheduleRetry();
      };
      return ws;
    }).filter((w): w is WebSocket => w !== null);
  };

  const scheduleRetry = () => {
    if (dead) return;
    gen++;                                  // invalidate any stragglers
    cycles += 1;
    if (cycles > MAX_CYCLES) { onStatus(false); return; }
    timer = setTimeout(connect, 1000 + Math.random() * 800);
  };

  connect();
  return () => {
    dead = true;
    gen++;
    if (timer) clearTimeout(timer);
    for (const w of socks) { try { w.close(); } catch { /* */ } }
  };
}
