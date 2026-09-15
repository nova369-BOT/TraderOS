/**
 * Unified marketdata REST client (multi-asset: crypto perps, metals, energy, FX).
 *
 * Every response carries an explicit `provenance` label — "live" (real
 * exchange), "simulated" (labeled offline simulator). UIs MUST surface it.
 */

import { api } from "./base";

export type MarketdataSymbolInfo = {
  symbol: string; // canonical, e.g. "SIM:XAUUSD"
  exchange: string;
  instrument: string;
  base: string | null;
  quote: string | null;
  kind: string; // "perp" | "metal" | "energy" | "forex" | ...
  status: string;
  tick_size: number | null;
  step_size: number | null;
  price_precision: number | null;
  quantity_precision: number | null;
};

export type MarketdataQuoteData = {
  symbol: string;
  bid: number | null;
  bid_qty: number | null;
  ask: number | null;
  ask_qty: number | null;
  last: number | null;
  ts: number;
  source_ts?: number | null;
};

export type MarketdataCandle = {
  symbol: string;
  interval: string;
  open_time: number; // ms epoch
  close_time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  closed: boolean;
  trade_count?: number | null;
};

export type Provenance = "live" | "simulated" | "unavailable" | string;

export async function fetchMarketdataSymbols(query?: string): Promise<MarketdataSymbolInfo[]> {
  const { data } = await api.get<{ items: MarketdataSymbolInfo[]; count: number }>(
    "/marketdata/symbols",
    { params: query ? { query } : {} },
  );
  return data.items ?? [];
}

export async function fetchMarketdataQuote(
  symbol: string,
): Promise<{ symbol: string; provenance: Provenance; source: string | null; data: MarketdataQuoteData | null }> {
  const { data } = await api.get(`/marketdata/quote/${encodeURIComponent(symbol)}`);
  return data;
}

export async function fetchMarketdataCandles(
  symbol: string,
  interval: string,
  limit = 300,
): Promise<{ symbol: string; interval: string; provenance: Provenance; source: string | null; count: number; items: MarketdataCandle[] }> {
  const { data } = await api.get(`/marketdata/candles/${encodeURIComponent(symbol)}`, {
    params: { interval, limit },
  });
  return data;
}

/** True for canonical marketdata instruments (SIM:XAUUSD, BINANCE:BTCUSDT…). */
export function isMarketdataSymbol(symbol: string | null | undefined): boolean {
  if (!symbol) return false;
  return /^(SIM|BINANCE):/i.test(symbol.trim());
}
