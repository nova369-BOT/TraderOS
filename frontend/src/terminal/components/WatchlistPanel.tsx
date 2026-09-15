import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addWatchlistSymbols, fetchWatchlists } from "../../api/watchlist";
import { searchSymbols } from "../../api/marketData";
import {
  fetchMarketdataSymbols,
  isMarketdataSymbol,
  type MarketdataSymbolInfo,
} from "../../api/marketdataFeed";
import { useMarketdataQuotes, useMarketdataStreamStore } from "../../realtime/marketdataStream";
import type { SearchSymbolItem } from "../../api/types";
import { useSettingsStore } from "../../store/settingsStore";
import { useMarketContextStore } from "../../store/marketContextStore";
import { useTerminalStore } from "../store/terminalStore";
import { useTerminalQuotes, type TerminalQuote } from "../hooks/useTerminalQuotes";
import { formatNumber, formatPct, pnlClass } from "../format";
import { TerminalPanel } from "../../components/terminal/TerminalPanel";
import { DataState } from "../../design/components/DataState";
import { TerminalBadge } from "../../components/terminal/TerminalBadge";

/**
 * Quantum Core left column — Watchlist (directive §14–15).
 * Dense security rows, live price with honest data-state labels, favorites,
 * instrument search, keyboard navigation.
 */

const SEARCH_DEBOUNCE_MS = 250;

type Props = {
  /** Instrument selection override (tests). Defaults to the global context store. */
  onSelectInstrument?: (ticker: string) => void;
  /** Search input ref registration for the terminal-level "/" hotkey. */
  registerSearchRef?: (ref: HTMLInputElement | null) => void;
};

export function WatchlistPanel({ onSelectInstrument, registerSearchRef }: Props) {
  const queryClient = useQueryClient();
  const selectedMarket = useSettingsStore((s) => s.selectedMarket);
  const selectContextInstrument = useMarketContextStore((s) => s.selectInstrument);
  const favorites = useTerminalStore((s) => s.favorites);
  const toggleFavorite = useTerminalStore((s) => s.toggleFavorite);

  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    registerSearchRef?.(searchRef.current);
    return () => registerSearchRef?.(null);
  }, [registerSearchRef]);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search.trim()), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [search]);

  const watchlistsQuery = useQuery({
    queryKey: ["qc-watchlists"],
    queryFn: fetchWatchlists,
    retry: 1,
  });

  const activeWatchlist = watchlistsQuery.data?.[0] ?? null;
  const symbols = useMemo(() => {
    const list = activeWatchlist?.symbols ?? [];
    return list.map((s) => s.trim().toUpperCase()).filter(Boolean);
  }, [activeWatchlist]);

  // Bucket symbols by market (IN → NSE, US → NASDAQ) using the selected
  // market as the default — quotes are per-market.
  const { inSymbols, usSymbols } = useMemo(() => {
    const inSet = new Set<string>();
    const usSet = new Set<string>();
    const baseIsIn = selectedMarket === "NSE" || selectedMarket === "BSE";
    for (const symbol of symbols) {
      if (baseIsIn) inSet.add(symbol);
      else usSet.add(symbol);
    }
    return { inSymbols: Array.from(inSet), usSymbols: Array.from(usSet) };
  }, [symbols, selectedMarket]);

  const inQuotes = useTerminalQuotes("NSE", inSymbols);
  const usQuotes = useTerminalQuotes("NASDAQ", usSymbols);

  // Multi-asset instruments (SIM:/BINANCE: crypto, metals, energy, FX) stream
  // through the unified marketdata WS; provenance rides every quote.
  const mdSymbols = useMemo(() => symbols.filter(isMarketdataSymbol), [symbols]);
  useMarketdataQuotes(mdSymbols);
  const mdQuotes = useMarketdataStreamStore((state) => state.quotes);
  const mdConnected = useMarketdataStreamStore((state) => state.connected);

  const quoteFor = useMemo(() => {
    const map = new Map<string, TerminalQuote>();
    for (const [symbol, quote] of Object.entries(inQuotes.quoteBySymbol)) map.set(symbol, quote);
    for (const [symbol, quote] of Object.entries(usQuotes.quoteBySymbol)) map.set(symbol, quote);
    for (const symbol of mdSymbols) {
      const quote = mdQuotes[symbol];
      if (quote) {
        map.set(symbol, {
          symbol,
          last: quote.last ?? (quote.ask && quote.bid ? (quote.ask + quote.bid) / 2 : null),
          change: null,
          changePct: null,
          basis: "live",
        });
      }
    }
    return map;
  }, [inQuotes.quoteBySymbol, usQuotes.quoteBySymbol, mdQuotes, mdSymbols]);

  const equityState = inSymbols.length && usSymbols.length
    ? (inQuotes.dataState === "live" || usQuotes.dataState === "live" ? "live" : inQuotes.dataState)
    : inSymbols.length
      ? inQuotes.dataState
      : usQuotes.dataState;
  const quotesState =
    mdSymbols.length > 0 && equityState !== "live"
      ? mdConnected
        ? "live"
        : equityState
      : equityState;

  // Instrument search (adds to the watchlist / selects).
  const searchResults = useQuery({
    queryKey: ["qc-symbol-search", debounced, selectedMarket],
    queryFn: () => searchSymbols(debounced, selectedMarket),
    enabled: debounced.length >= 1,
    staleTime: 30_000,
    retry: 1,
  });
  const mdSearch = useQuery({
    queryKey: ["qc-md-symbol-search", debounced],
    queryFn: () => fetchMarketdataSymbols(debounced),
    enabled: debounced.length >= 1,
    staleTime: 60_000,
    retry: 1,
  });

  const addSymbols = useMutation({
    mutationFn: (tickers: string[]) => {
      if (!activeWatchlist) throw new Error("No watchlist available");
      return addWatchlistSymbols(activeWatchlist.id, tickers);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["qc-watchlists"] }),
  });

  const orderedSymbols = useMemo(() => {
    const favs = symbols.filter((s) => favorites.includes(s));
    const rest = symbols.filter((s) => !favorites.includes(s));
    return [...favs, ...rest];
  }, [symbols, favorites]);

  const selectInstrument = (ticker: string) => {
    const clean = ticker.trim().toUpperCase();
    if (!clean) return;
    if (onSelectInstrument) {
      onSelectInstrument(clean);
    } else {
      void selectContextInstrument(clean);
    }
  };

  // Keyboard navigation: ↑/↓ move, Enter selects (§15 keyboard focus).
  const onListKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!orderedSymbols.length) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => {
        const next = event.key === "ArrowDown"
          ? Math.min(index + 1, orderedSymbols.length - 1)
          : Math.max(index - 1, 0);
        const node = listRef.current?.querySelector<HTMLElement>(`[data-row-index="${next}"]`);
        node?.scrollIntoView({ block: "nearest" });
        return next;
      });
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      selectInstrument(orderedSymbols[activeIndex]);
    }
  };

  const renderRow = (symbol: string, index: number) => {
    const quote = quoteFor.get(symbol);
    const isFavorite = favorites.includes(symbol);
    return (
      <div
        key={symbol}
        data-row-index={index}
        data-testid={`watchlist-row-${symbol}`}
        role="button"
        tabIndex={-1}
        aria-label={`Select ${symbol}`}
        onClick={() => selectInstrument(symbol)}
        className={[
          "group flex cursor-pointer items-center gap-2 border-b border-terminal-border/50 px-2 py-1",
          activeIndex === index ? "bg-terminal-accent/10" : "hover:bg-terminal-panel",
        ].join(" ")}
      >
        <button
          type="button"
          aria-label={isFavorite ? `Remove ${symbol} from favorites` : `Add ${symbol} to favorites`}
          aria-pressed={isFavorite}
          onClick={(event) => {
            event.stopPropagation();
            toggleFavorite(symbol);
          }}
          className={[
            "flex h-4 w-4 shrink-0 items-center justify-center text-[11px] leading-none",
            isFavorite ? "text-terminal-accent" : "text-terminal-muted/50 hover:text-terminal-accent",
          ].join(" ")}
        >
          {isFavorite ? "★" : "☆"}
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-[11px] font-medium text-terminal-text">
              {isMarketdataSymbol(symbol) ? symbol.split(":")[1] : symbol}
            </span>
            {mdQuotes[symbol]?.provenance === "simulated" ? (
              <span className="shrink-0 rounded-sm border border-terminal-border px-1 text-[8px] uppercase text-terminal-warn">
                sim
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 tabular-nums">
          <span className="text-[11px] text-terminal-text">{formatNumber(quote?.last ?? null)}</span>
          <span className={`w-14 text-right text-[10px] ${pnlClass(quote?.changePct)}`}>
            {formatPct(quote?.changePct ?? null)}
          </span>
        </div>
      </div>
    );
  };

  const dataStateBadge = () => {
    if (quotesState === "live") return <TerminalBadge variant="live">LIVE</TerminalBadge>;
    if (quotesState === "polled") return <TerminalBadge variant="mock">POLLED</TerminalBadge>;
    if (quotesState === "offline") return <TerminalBadge variant="warn">OFFLINE</TerminalBadge>;
    if (quotesState === "connecting") return <TerminalBadge variant="neutral">CONNECTING</TerminalBadge>;
    return null;
  };

  return (
    <TerminalPanel
      title="WATCHLIST"
      subtitle={activeWatchlist?.name ?? undefined}
      actions={
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-terminal-muted">{orderedSymbols.length}</span>
          {dataStateBadge()}
        </div>
      }
      bodyClassName="flex min-h-0 flex-col"
    >
      <div className="border-b border-terminal-border p-1.5">
        <div className="flex items-center gap-1.5">
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search instruments…  ( / )"
            aria-label="Search instruments"
            data-testid="watchlist-search"
            className="w-full rounded-sm border border-terminal-border bg-terminal-bg px-2 py-1 text-[11px] text-terminal-text placeholder:text-terminal-muted/60 focus:border-terminal-accent focus:outline-none"
          />
        </div>
        {search.trim().length >= 1 ? (
          <div className="mt-1.5 max-h-32 overflow-y-auto rounded-sm border border-terminal-border bg-terminal-bg">
            {searchResults.isLoading && mdSearch.isLoading ? (
              <div className="px-2 py-1 text-[10px] text-terminal-muted">Searching…</div>
            ) : searchResults.isError && mdSearch.isError ? (
              <div className="px-2 py-1 text-[10px] text-terminal-warn">Search unavailable</div>
            ) : (searchResults.data ?? []).length === 0 && (mdSearch.data ?? []).length === 0 ? (
              <div className="px-2 py-1 text-[10px] text-terminal-muted">No matches</div>
            ) : (
              <>
              {(mdSearch.data ?? []).slice(0, 6).map((item: MarketdataSymbolInfo) => (
                <div
                  key={`md-${item.symbol}`}
                  className="flex items-center gap-2 border-b border-terminal-border/40 px-2 py-1 hover:bg-terminal-panel"
                  data-testid={`search-md-${item.instrument}`}
                >
                  <button
                    type="button"
                    onClick={() => selectInstrument(item.symbol)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-[11px] text-terminal-text">{item.instrument}</span>
                      <span className="shrink-0 rounded-sm border border-terminal-border px-1 text-[8px] uppercase text-terminal-accent">
                        {item.kind}
                      </span>
                      <span className="shrink-0 text-[8px] uppercase text-terminal-muted/80">
                        {item.exchange === "SIM" ? "simulated" : item.exchange}
                      </span>
                    </div>
                    <div className="truncate text-[9px] text-terminal-muted">
                      {item.base ?? ""}{item.quote ? `/${item.quote}` : ""} · {item.kind === "forex" ? "FX pair" : item.kind}
                    </div>
                  </button>
                  {activeWatchlist && !symbols.includes(item.symbol.toUpperCase()) ? (
                    <button
                      type="button"
                      aria-label={`Add ${item.instrument} to watchlist`}
                      onClick={() => addSymbols.mutate([item.symbol])}
                      className="shrink-0 rounded-sm border border-terminal-border px-1.5 py-0.5 text-[10px] text-terminal-accent hover:border-terminal-accent"
                    >
                      + Add
                    </button>
                  ) : null}
                </div>
              ))}
              {(searchResults.data ?? []).slice(0, 8).map((item: SearchSymbolItem) => (
                <div
                  key={item.ticker}
                  className="flex items-center gap-2 border-b border-terminal-border/40 px-2 py-1 last:border-b-0 hover:bg-terminal-panel-hover"
                >
                  <button
                    type="button"
                    onClick={() => selectInstrument(item.ticker)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <div className="truncate text-[11px] text-terminal-text">{item.ticker}</div>
                    <div className="truncate text-[9px] text-terminal-muted">{item.name}</div>
                  </button>
                  {activeWatchlist && !symbols.includes(item.ticker.toUpperCase()) ? (
                    <button
                      type="button"
                      aria-label={`Add ${item.ticker} to watchlist`}
                      onClick={() => addSymbols.mutate([item.ticker])}
                      className="shrink-0 rounded-sm border border-terminal-border px-1.5 py-0.5 text-[10px] text-terminal-accent hover:border-terminal-accent"
                    >
                      + Add
                    </button>
                  ) : null}
                </div>
              ))}
              </>
            )}
          </div>
        ) : null}
      </div>

      <div
        ref={listRef}
        role="listbox"
        aria-label="Watchlist instruments"
        tabIndex={0}
        onKeyDown={onListKeyDown}
        data-testid="watchlist-rows"
        className="min-h-0 flex-1 overflow-y-auto outline-none focus-visible:ring-1 focus-visible:ring-terminal-accent"
      >
        <DataState
          status={
            watchlistsQuery.isLoading
              ? "loading"
              : watchlistsQuery.isError
                ? "error"
                : orderedSymbols.length === 0
                  ? "empty"
                  : "ready"
          }
          loadingLabel="Loading watchlist"
          error={(watchlistsQuery.error as Error | null) ?? "Watchlist unavailable"}
          onRetry={() => void watchlistsQuery.refetch()}
          emptyTitle="No instruments"
          emptyHint="Use the search above to add instruments to the watchlist."
        >
          <>
            {favorites.length > 0 ? (
              <div className="px-2 pb-0.5 pt-1.5 text-[9px] uppercase tracking-wider text-terminal-muted/70">
                Favorites
              </div>
            ) : null}
            {orderedSymbols
              .filter((symbol) => favorites.includes(symbol))
              .map((symbol, index) => renderRow(symbol, index))}
            {favorites.length > 0 ? (
              <div className="px-2 pb-0.5 pt-1.5 text-[9px] uppercase tracking-wider text-terminal-muted/70">
                Results
              </div>
            ) : null}
            {orderedSymbols
              .filter((symbol) => !favorites.includes(symbol))
              .map((symbol, index) => renderRow(symbol, index + favorites.length))}
          </>
        </DataState>
      </div>

      {addSymbols.isError ? (
        <div className="border-t border-terminal-border px-2 py-1 text-[10px] text-terminal-warn">
          Could not add symbol: {(addSymbols.error as Error).message}
        </div>
      ) : null}
    </TerminalPanel>
  );
}
