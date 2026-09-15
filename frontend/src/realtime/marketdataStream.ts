/**
 * Marketdata live stream (R-multiasset): WebSocket client for /api/ws/market
 * with a zustand store for the latest quotes.
 *
 * - One socket, ref-counted topic subscriptions (mirrors the backend
 *   service's per-topic ref counting — two panels → one upstream sub).
 * - Auto-reconnect with backoff while topics are wanted.
 * - Envelope provenance is preserved on every quote (live vs simulated).
 */

import { useEffect } from "react";
import { create } from "zustand";

export type StreamQuote = {
  symbol: string;
  bid: number | null;
  ask: number | null;
  last: number | null;
  ts: number;
  provenance: string;
  source: string | null;
};

type MarketdataStreamState = {
  connected: boolean;
  quotes: Record<string, StreamQuote>;
  setConnected: (connected: boolean) => void;
  applyQuote: (quote: StreamQuote) => void;
};

export const useMarketdataStreamStore = create<MarketdataStreamState>((set) => ({
  connected: false,
  quotes: {},
  setConnected: (connected) => set({ connected }),
  applyQuote: (quote) =>
    set((state) => ({ quotes: { ...state.quotes, [quote.symbol]: quote } })),
}));

const ACCESS_TOKEN_KEY = "ot-access-token";

type Envelope = {
  type: string;
  event?: string;
  topic?: string;
  symbol?: string;
  data?: {
    bid?: number | null;
    ask?: number | null;
    last?: number | null;
    ts?: number;
  };
  provenance?: string;
  source?: string | null;
  ts?: number;
};

class MarketdataStreamClient {
  private socket: WebSocket | null = null;
  private topicCounts = new Map<string, number>();
  private reconnectTimer: number | null = null;
  private reconnectAttempt = 0;

  acquire(topics: string[]): () => void {
    const added: string[] = [];
    for (const topic of topics) {
      const next = (this.topicCounts.get(topic) ?? 0) + 1;
      this.topicCounts.set(topic, next);
      if (next === 1) added.push(topic);
    }
    if (added.length) this.send({ op: "subscribe", topics: added });
    this.ensureConnected();
    let released = false;
    return () => {
      if (released) return;
      released = true;
      const removed: string[] = [];
      for (const topic of topics) {
        const next = (this.topicCounts.get(topic) ?? 1) - 1;
        if (next <= 0) {
          this.topicCounts.delete(topic);
          removed.push(topic);
        } else {
          this.topicCounts.set(topic, next);
        }
      }
      if (removed.length) this.send({ op: "unsubscribe", topics: removed });
      if (this.topicCounts.size === 0) this.teardown();
    };
  }

  private ensureConnected() {
    if (
      this.socket &&
      (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }
    this.connect();
  }

  private connect() {
    this.clearReconnectTimer();
    const proto = window.location.protocol === "https:" ? "wss" : "ws";
    const token = window.localStorage.getItem(ACCESS_TOKEN_KEY);
    const url = `${proto}://${window.location.host}/api/ws/market${token ? `?token=${encodeURIComponent(token)}` : ""}`;
    let ws: WebSocket;
    try {
      ws = new WebSocket(url);
    } catch {
      this.scheduleReconnect();
      return;
    }
    this.socket = ws;

    ws.onopen = () => {
      this.reconnectAttempt = 0;
      useMarketdataStreamStore.getState().setConnected(true);
      const topics = [...this.topicCounts.keys()];
      if (topics.length) this.send({ op: "subscribe", topics });
    };

    ws.onmessage = (event) => {
      let payload: Envelope | null = null;
      try {
        payload = JSON.parse(String(event.data)) as Envelope;
      } catch {
        return;
      }
      if (!payload || payload.type !== "event") return;
      if (payload.event !== "quote" || !payload.symbol) return;
      useMarketdataStreamStore.getState().applyQuote({
        symbol: payload.symbol,
        bid: payload.data?.bid ?? null,
        ask: payload.data?.ask ?? null,
        last: payload.data?.last ?? null,
        ts: payload.ts ?? payload.data?.ts ?? Date.now(),
        provenance: payload.provenance ?? "unavailable",
        source: payload.source ?? null,
      });
    };

    ws.onclose = () => {
      useMarketdataStreamStore.getState().setConnected(false);
      this.socket = null;
      if (this.topicCounts.size > 0) this.scheduleReconnect();
    };

    ws.onerror = () => {
      // onclose follows; reconnect handled there
    };
  }

  private send(message: { op: string; topics: string[] }) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  private scheduleReconnect() {
    this.clearReconnectTimer();
    const delay = Math.min(1000 * 2 ** Math.min(this.reconnectAttempt, 4), 15_000);
    this.reconnectAttempt += 1;
    this.reconnectTimer = window.setTimeout(() => this.connect(), delay);
  }

  private clearReconnectTimer() {
    if (this.reconnectTimer !== null) {
      window.clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  private teardown() {
    this.clearReconnectTimer();
    if (this.socket) {
      this.socket.onclose = null;
      this.socket.close();
      this.socket = null;
    }
    useMarketdataStreamStore.getState().setConnected(false);
  }
}

const client = new MarketdataStreamClient();

/**
 * Acquire an arbitrary topic (e.g. candle:SIM:XAUUSD:1m) for the caller's
 * lifetime. Returns a release function.
 */
export function createCandleTopicSubscription(symbol: string, interval: string): () => void {
  return client.acquire([`candle:${symbol.toUpperCase()}:${interval}`]);
}

/**
 * Subscribe to quote topics for canonical symbols for the component's
 * lifetime; returns nothing — read quotes from useMarketdataStreamStore.
 */
export function useMarketdataQuotes(symbols: Array<string | null | undefined>): void {
  const key = symbols.filter((s): s is string => Boolean(s)).join(",");
  useEffect(() => {
    const list = key ? key.split(",") : [];
    if (!list.length) return;
    const release = client.acquire(list.map((symbol) => `quote:${symbol.toUpperCase()}`));
    return release;
  }, [key]);
}
