import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchQuotesBatch } from "../../api/marketData";
import { useQuotesStore, useQuotesStream } from "../../realtime/useQuotesStream";

/**
 * Merged quote source for terminal panels: live WS ticks when the quote
 * stream is connected, REST-batch polling as fallback otherwise. Every
 * consumer sees one map with an honest connection label.
 */

export type TerminalQuote = {
  symbol: string;
  last: number | null;
  change: number | null;
  changePct: number | null;
  /** "live" (WS tick) | "polled" (REST fallback) | null (no data) */
  basis: "live" | "polled" | null;
};

const POLL_INTERVAL_MS = 15_000;

export function useTerminalQuotes(market: string, symbols: string[]) {
  const normalizedKey = `${market.trim().toUpperCase()}|${symbols
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean)
    .sort()
    .join(",")}`;

  const [normMarket, symbolsKey] = useMemo(() => {
    const [m, s] = normalizedKey.split("|");
    return [m, s ? s.split(",") : []] as const;
  }, [normalizedKey]);

  const { subscribe, unsubscribe } = useQuotesStream(normMarket);
  const connectionState = useQuotesStore((s) => s.connectionState);
  const ticksByToken = useQuotesStore((s) => s.ticksByToken);

  // Live subscription (ref-counted inside the manager).
  useEffect(() => {
    if (!symbolsKey.length) return;
    subscribe(symbolsKey);
    return () => unsubscribe(symbolsKey);
  }, [symbolsKey, subscribe, unsubscribe]);

  const wsConnected = connectionState === "connected";

  // Polled fallback — only runs while the WS stream is down (or until first
  // tick arrives). Keeps data flowing offline with explicit "polled" basis.
  const poll = useQuery({
    queryKey: ["terminal-quotes", normMarket, symbolsKey.join(",")],
    queryFn: () => fetchQuotesBatch(symbolsKey, normMarket),
    enabled: symbolsKey.length > 0 && !wsConnected,
    refetchInterval: POLL_INTERVAL_MS,
    staleTime: POLL_INTERVAL_MS / 2,
    retry: 1,
  });

  const quoteBySymbol = useMemo(() => {
    const out: Record<string, TerminalQuote> = {};
    for (const symbol of symbolsKey) {
      const token = `${normMarket}:${symbol}`;
      const tick = ticksByToken[token];
      if (tick && Number.isFinite(Number(tick.ltp))) {
        out[symbol] = {
          symbol,
          last: Number(tick.ltp),
          change: Number.isFinite(Number(tick.change)) ? Number(tick.change) : null,
          changePct: Number.isFinite(Number(tick.change_pct)) ? Number(tick.change_pct) : null,
          basis: "live",
        };
        continue;
      }
      const polled = poll.data?.quotes?.find(
        (row: { symbol?: string }) =>
          String(row.symbol ?? "").trim().toUpperCase() === symbol,
      );
      if (polled && Number.isFinite(Number(polled.last))) {
        out[symbol] = {
          symbol,
          last: Number(polled.last),
          change: Number.isFinite(Number(polled.change)) ? Number(polled.change) : null,
          changePct: Number.isFinite(Number(polled.changePct)) ? Number(polled.changePct) : null,
          basis: "polled",
        };
        continue;
      }
      out[symbol] = { symbol, last: null, change: null, changePct: null, basis: null };
    }
    return out;
  }, [symbolsKey, normMarket, ticksByToken, poll.data]);

  return {
    quoteBySymbol,
    connectionState,
    /** Honest data-state label for panels (§46). */
    dataState: wsConnected
      ? ("live" as const)
      : poll.isFetching
        ? ("connecting" as const)
        : poll.data
          ? poll.data.status === "unavailable" || !poll.data.quotes?.length
            ? ("offline" as const)
            : ("polled" as const)
          : symbolsKey.length
            ? ("connecting" as const)
            : ("empty" as const),
  };
}
