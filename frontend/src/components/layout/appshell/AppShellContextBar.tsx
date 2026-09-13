import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CountryFlag } from "../../common/CountryFlag";
import { useNavigationHistory } from "../../../hooks/useNavigationHistory";
import { useRecentSecurities } from "../../../hooks/useRecentSecurities";
import { useMarketStatus } from "../../../hooks/useStocks";
import { useQuotesStore } from "../../../realtime/useQuotesStream";
import { useSettingsStore } from "../../../store/settingsStore";
import { useStockStore } from "../../../store/stockStore";
import { COUNTRY_MARKETS } from "../../../types";
import type { CountryCode } from "../../../types";
import { TABULAR_CLASS } from "../../../design/tokens";

const COUNTRY_FLAGS: Record<CountryCode, string> = { IN: "🇮🇳", US: "🇺🇸" };

/**
 * Persistent context bar (R2) — the strip of global context that must never
 * reset while navigating: active instrument, recent securities, market /
 * country / currency selection, and an honest feed-state label.
 *
 * Absorbs TopBar's selectors, breadcrumbs and market badge. R4 will deepen
 * this into the full app-wide context model (account, selection, workspace).
 */
export function AppShellContextBar() {
  const navigate = useNavigate();
  const ticker = useStockStore((s) => s.ticker);
  const stock = useStockStore((s) => s.stock);
  const setTicker = useStockStore((s) => s.setTicker);

  const selectedCountry = useSettingsStore((s) => s.selectedCountry);
  const selectedMarket = useSettingsStore((s) => s.selectedMarket);
  const displayCurrency = useSettingsStore((s) => s.displayCurrency);
  const setSelectedCountry = useSettingsStore((s) => s.setSelectedCountry);
  const setSelectedMarket = useSettingsStore((s) => s.setSelectedMarket);
  const setDisplayCurrency = useSettingsStore((s) => s.setDisplayCurrency);

  const { breadcrumbs } = useNavigationHistory({ autoTrack: true });
  const { recentSecurities } = useRecentSecurities();

  // Honest feed state: realtime store first, polled status as fallback.
  const realtimeStatus = useQuotesStore((s) => s.marketStatus);
  const { data: polledStatus } = useMarketStatus();
  const statusPayload = (realtimeStatus || polledStatus) as {
    error?: string;
    marketState?: Array<{ marketStatus?: string }>;
    nifty50?: number | null;
    sensex?: number | null;
    source?: { nseIndices?: boolean };
  } | null;

  const feedState = useMemo(() => {
    if (statusPayload?.error) return "OFFLINE" as const;
    const hasIndexData =
      typeof statusPayload?.nifty50 === "number" || typeof statusPayload?.sensex === "number";
    if (!hasIndexData) return "OFFLINE" as const;
    const marketStateLabel = String(statusPayload?.marketState?.[0]?.marketStatus || "").toUpperCase();
    if (marketStateLabel === "CLOSE") return "CLOSED" as const;
    if (!statusPayload?.source?.nseIndices) return "FALLBACK" as const;
    return "LIVE" as const;
  }, [statusPayload]);

  const feedTone =
    feedState === "LIVE"
      ? "text-terminal-pos"
      : feedState === "CLOSED"
        ? "text-terminal-muted"
        : feedState === "FALLBACK"
          ? "text-terminal-warning"
          : "text-terminal-neg";

  const marketsForCountry = COUNTRY_MARKETS[selectedCountry];
  const activeName = stock?.company_name?.trim() || "";
  const recents = recentSecurities.slice(0, 5);

  return (
    <div
      role="region"
      aria-label="Global context"
      className="flex h-7 shrink-0 items-center gap-2 overflow-x-auto border-b border-terminal-border bg-terminal-bg/80 px-2 text-[10px]"
    >
      {/* Breadcrumbs — where am I */}
      <nav aria-label="Breadcrumb" className="flex shrink-0 items-center gap-1 text-terminal-muted">
        {breadcrumbs.slice(-3).map((crumb, index, arr) => (
          <span key={`${crumb.path}-${index}`} className="flex items-center gap-1">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {index === arr.length - 1 ? (
              <span className="text-terminal-text">{crumb.label}</span>
            ) : (
              <Link to={crumb.path} className="hover:text-terminal-text">
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      {/* Active instrument — the app-wide selection (R4 makes it fully persistent) */}
      <span
        className="flex shrink-0 items-center gap-1.5 rounded-sm border border-terminal-accent/40 bg-terminal-accent/10 px-1.5 py-0.5"
        data-testid="context-instrument"
        title={activeName || ticker}
      >
        <span className="font-semibold uppercase text-terminal-accent">{ticker || "—"}</span>
        {activeName ? <span className="max-w-40 truncate text-terminal-muted">{activeName}</span> : null}
      </span>

      {/* Recent securities — one click restores the previous selection */}
      {recents.length > 0 ? (
        <span className="flex shrink-0 items-center gap-1" aria-label="Recent securities">
          {recents.map((item) => (
            <button
              key={item.symbol}
              type="button"
              onClick={() => {
                setTicker(item.symbol);
                navigate(`/markets/stocks?ticker=${encodeURIComponent(item.symbol)}`);
              }}
              title={`${item.name} (${item.market})`}
              className={`rounded-sm border border-terminal-border px-1.5 py-0.5 text-terminal-muted hover:border-terminal-accent/50 hover:text-terminal-text ${TABULAR_CLASS}`}
            >
              {item.symbol}
            </button>
          ))}
        </span>
      ) : null}

      {/* Market context selectors — absorbed from TopBar */}
      <div className="ml-auto flex shrink-0 items-center gap-1.5">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value as CountryCode)}
          aria-label="Select country"
          className="h-5 rounded-sm border border-terminal-border bg-terminal-panel px-1 text-[10px] text-terminal-text outline-none focus:border-terminal-accent"
        >
          <option value="IN">{COUNTRY_FLAGS.IN} IN</option>
          <option value="US">{COUNTRY_FLAGS.US} US</option>
        </select>
        <select
          value={selectedMarket}
          onChange={(e) => setSelectedMarket(e.target.value as (typeof marketsForCountry)[number])}
          aria-label="Select market"
          className="h-5 rounded-sm border border-terminal-border bg-terminal-panel px-1 text-[10px] text-terminal-text outline-none focus:border-terminal-accent"
        >
          {marketsForCountry.map((market) => (
            <option key={market} value={market}>
              {market}
            </option>
          ))}
        </select>
        <select
          value={displayCurrency}
          onChange={(e) => setDisplayCurrency(e.target.value as "INR" | "USD")}
          aria-label="Display currency"
          className="h-5 rounded-sm border border-terminal-border bg-terminal-panel px-1 text-[10px] text-terminal-text outline-none focus:border-terminal-accent"
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
        </select>
        <CountryFlag countryCode={selectedCountry} size="sm" />
        <span
          className={`rounded-sm border border-terminal-border px-1.5 py-0.5 font-semibold uppercase tracking-wide ${feedTone}`}
          data-testid="context-feed-state"
          title="Market data feed state"
        >
          {feedState}
        </span>
      </div>
    </div>
  );
}
