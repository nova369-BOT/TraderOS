import { useAuth } from "../../contexts/AuthContext";
import { useMarketStatus } from "../../hooks/useStocks";
import { useSettingsStore } from "../../store/settingsStore";
import { useStockStore } from "../../store/stockStore";
import { useTerminalStore } from "../store/terminalStore";
import { useQuery } from "@tanstack/react-query";
import { fetchPaperPortfolios } from "../../api/portfolio";
import { TerminalBadge } from "../../components/terminal/TerminalBadge";
import { APP_VERSION } from "../../utils/constants";

/**
 * Quantum Core terminal context bar (directive §11).
 * Answers, at a glance: where am I, who am I acting for, which account,
 * which instrument, which market. Subordinate to the global header.
 */

type Props = {
  /** Breadcrumb segment override (tests). */
  marketLabelOverride?: string;
};

export function TerminalContextBar({ marketLabelOverride }: Props) {
  const { user } = useAuth();
  const ticker = useStockStore((s) => s.ticker);
  const selectedMarket = useSettingsStore((s) => s.selectedMarket);
  const displayCurrency = useSettingsStore((s) => s.displayCurrency);
  const selectedPortfolioId = useTerminalStore((s) => s.selectedPortfolioId);

  const { data: marketStatus } = useMarketStatus();
  const portfoliosQuery = useQuery({
    queryKey: ["qc-paper-portfolios"],
    queryFn: fetchPaperPortfolios,
    retry: 1,
  });
  const portfolio = (portfoliosQuery.data ?? []).find((item) => item.id === selectedPortfolioId)
    ?? (portfoliosQuery.data ?? [])[0]
    ?? null;

  const statusPayload = marketStatus as { status?: string; label?: string; fallbackEnabled?: boolean; error?: string } | undefined;
  const marketOpen = statusPayload?.status === "open";
  const marketLabel = marketLabelOverride ?? selectedMarket;

  return (
    <div
      role="region"
      aria-label="Terminal context"
      className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-terminal-border bg-terminal-panel px-3 py-1.5 text-[10px]"
    >
      {/* Location */}
      <span className="flex items-center gap-1.5">
        <span className="font-semibold uppercase tracking-widest text-terminal-accent">Trading Terminal</span>
        <span className="text-terminal-muted/60">v{APP_VERSION}</span>
      </span>
      <span className="text-terminal-muted/60" aria-hidden>
        /
      </span>
      <span className="text-terminal-muted">{marketLabel}</span>

      {/* Who am I acting for (§16 client context) */}
      <span className="flex items-center gap-1">
        <span className="text-terminal-muted">Client</span>
        <span className="max-w-[160px] truncate text-terminal-text" title={user?.email ?? undefined}>
          {user?.email ?? "—"}
        </span>
      </span>

      {/* Account */}
      <span className="flex items-center gap-1">
        <span className="text-terminal-muted">Account</span>
        {portfolio ? (
          <span className="text-terminal-text">
            {portfolio.name} <span className="text-terminal-muted/60">({portfolio.id.slice(0, 8)})</span>
          </span>
        ) : (
          <span className="text-terminal-warn">No paper account</span>
        )}
        <TerminalBadge variant="mock">PAPER</TerminalBadge>
      </span>

      {/* Instrument */}
      <span className="flex items-center gap-1">
        <span className="text-terminal-muted">Instrument</span>
        <span className="font-medium text-terminal-text">{ticker || "—"}</span>
        <span className="text-terminal-muted/60">· {displayCurrency}</span>
      </span>

      {/* Market state */}
      <span className="ml-auto flex items-center gap-2">
        {statusPayload?.fallbackEnabled || statusPayload?.error ? (
          <TerminalBadge variant="mock">MARKET DATA: DEGRADED</TerminalBadge>
        ) : marketOpen ? (
          <TerminalBadge variant="live">MARKET OPEN</TerminalBadge>
        ) : (
          <TerminalBadge variant="neutral">MARKET CLOSED</TerminalBadge>
        )}
      </span>
    </div>
  );
}
