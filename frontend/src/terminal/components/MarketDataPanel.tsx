import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchChartData } from "../../services/chartDataService";
import { fetchPitFundamentals } from "../../api/equity";
import { fetchLatestNews } from "../../api/news";
import { fetchPaperPositions } from "../../api/portfolio";
import type { ChartPoint } from "../../types";
import { useSettingsStore } from "../../store/settingsStore";
import { useStockStore } from "../../store/stockStore";
import { useTerminalStore } from "../store/terminalStore";
import { useTerminalQuotes } from "../hooks/useTerminalQuotes";
import { formatNumber, formatPct, formatSigned, pnlClass } from "../format";
import { TerminalPanel } from "../../components/terminal/TerminalPanel";
import { TerminalBadge } from "../../components/terminal/TerminalBadge";
import { TradingChart } from "../../components/chart/TradingChart";
import { DataState } from "../../design/components/DataState";

/**
 * Quantum Core center — Market Data (directive §20–25).
 * The chart lives inside a broader market-data context (Chart | Fundamentals |
 * Holdings | News) with a context-rich header. The chart MUST stay inside its
 * geometry (§22): the container owns size via flex/min-h-0, and TradingChart
 * self-resizes through its ResizeObserver.
 */

const TIMEFRAMES = [
  { interval: "1m", range: "1d", label: "1m" },
  { interval: "5m", range: "1d", label: "5m" },
  { interval: "15m", range: "5d", label: "15m" },
  { interval: "1h", range: "1mo", label: "1H" },
  { interval: "1d", range: "1y", label: "1D" },
  { interval: "1w", range: "5y", label: "1W" },
] as const;

type ChartKind = "candles" | "line" | "area";

type Props = {
  /** Instrument override (tests). Defaults to the global instrument context. */
  instrument?: string;
  /** Market override (tests). */
  market?: string;
};

export function MarketDataPanel({ instrument, market }: Props) {
  const contextTicker = useStockStore((s) => s.ticker);
  const selectedMarket = useSettingsStore((s) => s.selectedMarket);
  const displayCurrency = useSettingsStore((s) => s.displayCurrency);
  const tab = useTerminalStore((s) => s.marketDataTab);
  const setTab = useTerminalStore((s) => s.setMarketDataTab);
  const selectedPortfolioId = useTerminalStore((s) => s.selectedPortfolioId);

  const activeInstrument = (instrument ?? contextTicker ?? "").trim().toUpperCase();
  const activeMarket = (market ?? selectedMarket).trim().toUpperCase();
  const isIndian = activeMarket === "NSE" || activeMarket === "BSE";

  const quotes = useTerminalQuotes(
    isIndian ? "NSE" : "NASDAQ",
    activeInstrument ? [activeInstrument] : [],
  );
  const quote = activeInstrument ? quotes.quoteBySymbol[activeInstrument] : undefined;

  const [timeframeIndex, setTimeframeIndex] = useState(4); // default 1D
  const [chartKind, setChartKind] = useState<ChartKind>("candles");
  const timeframe = TIMEFRAMES[timeframeIndex];

  // Unified (normalized) chart source ONLY — the legacy /chart fallback
  // fabricates synthetic bars offline, which must never be presented as
  // market data (no-false-data law). Provider outage → explicit error state.
  const chartQuery = useQuery({
    queryKey: ["qc-chart", activeInstrument, timeframe.interval, timeframe.range, activeMarket],
    queryFn: () =>
      fetchChartData(activeInstrument, {
        market: activeMarket,
        interval: timeframe.interval,
        period: timeframe.range,
      }),
    enabled: tab === "chart" && Boolean(activeInstrument),
    staleTime: 60_000,
    retry: 1,
  });
  const chartData: ChartPoint[] = useMemo(() => {
    const rows = chartQuery.data?.data ?? [];
    return Array.isArray(rows)
      ? rows.map((row) => ({
          t: Math.floor(Number(row.t) / 1000),
          o: Number(row.o),
          h: Number(row.h),
          l: Number(row.l),
          c: Number(row.c),
          v: Number(row.v ?? 0),
          s: row.s,
          ext: row.ext,
        }))
      : [];
  }, [chartQuery.data]);

  const fundamentalsQuery = useQuery({
    queryKey: ["qc-fundamentals", activeInstrument],
    queryFn: () => fetchPitFundamentals(activeInstrument),
    enabled: tab === "fundamentals" && Boolean(activeInstrument),
    staleTime: 300_000,
    retry: 1,
  });

  const holdingsQuery = useQuery({
    queryKey: ["qc-account", "positions", activeInstrument, selectedPortfolioId],
    queryFn: () => fetchPaperPositions(selectedPortfolioId ?? ""),
    enabled: tab === "holdings" && Boolean(selectedPortfolioId),
    staleTime: 30_000,
    retry: 1,
  });

  const newsQuery = useQuery({
    queryKey: ["qc-news", activeInstrument],
    queryFn: () => fetchLatestNews(60),
    enabled: tab === "news",
    staleTime: 120_000,
    retry: 1,
  });

  const tabs = [
    { id: "chart" as const, label: "Chart" },
    { id: "fundamentals" as const, label: "Fundamentals" },
    { id: "holdings" as const, label: "Holdings" },
    { id: "news" as const, label: "News" },
  ];

  const quoteBasisBadge = () => {
    if (quotes.dataState === "live") return <TerminalBadge variant="live">LIVE</TerminalBadge>;
    if (quotes.dataState === "polled") return <TerminalBadge variant="mock">POLLED</TerminalBadge>;
    if (quotes.dataState === "offline") return <TerminalBadge variant="warn">OFFLINE</TerminalBadge>;
    return null;
  };

  return (
    <TerminalPanel
      title="MARKET DATA"
      subtitle={activeInstrument || "No instrument selected"}
      actions={
        <div className="flex items-center gap-2">
          {quoteBasisBadge()}
          <nav aria-label="Market data views" className="flex items-center gap-0.5">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={tab === item.id}
                onClick={() => setTab(item.id)}
                data-testid={`marketdata-tab-${item.id}`}
                className={[
                  "rounded-sm border px-1.5 py-0.5 text-[10px] uppercase tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal-accent",
                  tab === item.id
                    ? "border-terminal-accent bg-terminal-accent/10 text-terminal-accent"
                    : "border-transparent text-terminal-muted hover:border-terminal-border hover:text-terminal-text",
                ].join(" ")}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      }
      bodyClassName="flex min-h-0 flex-col"
    >
      {/* Context header (§21) */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-terminal-border px-2 py-1.5 text-[10px]">
        {activeInstrument ? (
          <>
            <span className="text-[13px] font-semibold text-terminal-text">{activeInstrument}</span>
            <span className="text-terminal-muted">{activeMarket}</span>
            <span className="text-terminal-muted">{displayCurrency}</span>
            <span className="tabular-nums text-[12px] text-terminal-text">
              {formatNumber(quote?.last ?? null)}
            </span>
            <span className={`tabular-nums ${pnlClass(quote?.changePct)}`}>
              {formatSigned(quote?.change ?? null)} ({formatPct(quote?.changePct ?? null)})
            </span>
            <span className="text-terminal-muted">
              {quote?.basis === "live" ? "Streaming" : quote?.basis === "polled" ? "Polled" : "No quote"}
            </span>
          </>
        ) : (
          <span className="text-terminal-muted">Select an instrument to inspect the market</span>
        )}
      </div>

      {/* Body — the active view owns its scroll/size (§51) */}
      <div className="min-h-0 flex-1 overflow-hidden">
        {tab === "chart" ? (
          <div className="flex h-full min-h-0 flex-col">
            <div className="flex items-center gap-1 border-b border-terminal-border px-1.5 py-1">
              <div role="group" aria-label="Timeframe" className="flex items-center gap-0.5">
                {TIMEFRAMES.map((item, index) => (
                  <button
                    key={item.label}
                    type="button"
                    aria-pressed={timeframeIndex === index}
                    onClick={() => setTimeframeIndex(index)}
                    className={[
                      "rounded-sm border px-1.5 py-0.5 text-[10px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal-accent",
                      timeframeIndex === index
                        ? "border-terminal-accent bg-terminal-accent/10 text-terminal-accent"
                        : "border-transparent text-terminal-muted hover:border-terminal-border hover:text-terminal-text",
                    ].join(" ")}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div role="group" aria-label="Chart type" className="ml-1 flex items-center gap-0.5">
                {(["candles", "line", "area"] as const).map((kind) => (
                  <button
                    key={kind}
                    type="button"
                    aria-pressed={chartKind === kind}
                    onClick={() => setChartKind(kind)}
                    className={[
                      "rounded-sm border px-1.5 py-0.5 text-[10px] capitalize focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal-accent",
                      chartKind === kind
                        ? "border-terminal-accent bg-terminal-accent/10 text-terminal-accent"
                        : "border-transparent text-terminal-muted hover:border-terminal-border hover:text-terminal-text",
                    ].join(" ")}
                  >
                    {kind}
                  </button>
                ))}
              </div>
              <span className="ml-auto text-[9px] text-terminal-muted">
                {chartQuery.isFetching ? "Loading…" : chartData.length ? `${chartData.length} bars` : ""}
              </span>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden" data-testid="chart-container">
              <DataState
                status={
                  !activeInstrument
                    ? "empty"
                    : chartQuery.isLoading
                      ? "loading"
                      : chartQuery.isError
                        ? "error"
                        : chartData.length === 0
                          ? "empty"
                          : "ready"
                }
                loadingLabel="Loading chart"
                error={(chartQuery.error as Error | null) ?? "Chart data unavailable"}
                onRetry={() => void chartQuery.refetch()}
                emptyTitle={!activeInstrument ? "No instrument selected" : "No chart data"}
                emptyHint={!activeInstrument ? "Select an instrument to inspect the market" : `No chart data for ${activeInstrument}`}
              >
                <TradingChart
                  ticker={activeInstrument}
                  data={chartData}
                  mode={chartKind}
                  timeframe={timeframe.interval}
                  market={isIndian ? "IN" : "US"}
                  panelId="qc-terminal-chart"
                />
              </DataState>
            </div>
          </div>
        ) : tab === "fundamentals" ? (
          <div className="h-full overflow-y-auto p-2 text-[10px]">
            {fundamentalsQuery.isLoading ? (
              <div className="text-terminal-muted">Loading fundamentals…</div>
            ) : fundamentalsQuery.isError ? (
              <div className="text-terminal-warn">Fundamentals unavailable</div>
            ) : fundamentalsQuery.data ? (
              <dl className="grid grid-cols-2 gap-x-4 gap-y-1">
                {Object.entries(fundamentalsQuery.data as Record<string, unknown>)
                  .filter(([, value]) => value !== null && value !== undefined)
                  .slice(0, 24)
                  .map(([key, value]) => (
                    <div key={key} className="flex justify-between gap-2 border-b border-terminal-border/40 py-0.5">
                      <dt className="text-terminal-muted">{key}</dt>
                      <dd className="truncate text-right text-terminal-text">{String(value)}</dd>
                    </div>
                  ))}
              </dl>
            ) : (
              <div className="text-terminal-muted">No fundamentals data</div>
            )}
          </div>
        ) : tab === "holdings" ? (
          <div className="h-full overflow-y-auto p-2 text-[10px]">
            {!selectedPortfolioId ? (
              <div className="text-terminal-muted">No account selected</div>
            ) : holdingsQuery.isLoading ? (
              <div className="text-terminal-muted">Loading holdings…</div>
            ) : holdingsQuery.isError ? (
              <div className="text-terminal-warn">Holdings unavailable</div>
            ) : (() => {
                const rows = (holdingsQuery.data ?? []).filter(
                  (position) => position.symbol.toUpperCase().endsWith(`:${activeInstrument}`) || position.symbol.toUpperCase() === activeInstrument,
                );
                if (!rows.length) {
                  return <div className="text-terminal-muted">No holdings in {activeInstrument}</div>;
                }
                return (
                  <table className="w-full tabular-nums">
                    <thead>
                      <tr className="text-terminal-muted">
                        <th className="py-0.5 text-left font-normal">Quantity</th>
                        <th className="py-0.5 text-right font-normal">Avg cost</th>
                        <th className="py-0.5 text-right font-normal">Mark</th>
                        <th className="py-0.5 text-right font-normal">Unrealized P&L</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((position) => (
                        <tr key={position.id} className="border-t border-terminal-border/40">
                          <td className="py-0.5 text-terminal-text">{position.quantity}</td>
                          <td className="py-0.5 text-right text-terminal-text">{formatNumber(position.avg_entry_price)}</td>
                          <td className="py-0.5 text-right text-terminal-text">{formatNumber(position.mark_price)}</td>
                          <td className={`py-0.5 text-right ${pnlClass(position.unrealized_pnl)}`}>
                            {formatSigned(position.unrealized_pnl)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                );
              })()}
          </div>
        ) : (
          <div className="h-full overflow-y-auto p-2 text-[10px]">
            {newsQuery.isLoading ? (
              <div className="text-terminal-muted">Loading news…</div>
            ) : newsQuery.isError ? (
              <div className="text-terminal-warn">News unavailable</div>
            ) : (() => {
                const items = (newsQuery.data ?? []).filter((item) => {
                  if (item.tickers?.some((ticker) => ticker.toUpperCase() === activeInstrument)) return true;
                  const haystack = `${item.title ?? ""} ${item.summary ?? ""}`.toUpperCase();
                  return haystack.includes(activeInstrument);
                });
                if (!items.length) {
                  return <div className="text-terminal-muted">No news mentioning {activeInstrument}</div>;
                }
                return (
                  <ul className="space-y-1.5">
                    {items.slice(0, 20).map((item, index) => (
                      <li key={index} className="border-b border-terminal-border/40 pb-1.5">
                        <div className="text-[11px] text-terminal-text">{item.title}</div>
                        {item.source ? <div className="text-[9px] text-terminal-muted">{item.source}</div> : null}
                      </li>
                    ))}
                  </ul>
                );
              })()}
          </div>
        )}
      </div>
    </TerminalPanel>
  );
}
