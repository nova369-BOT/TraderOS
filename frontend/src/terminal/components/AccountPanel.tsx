import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchPaperPerformance, fetchPaperPortfolios, fetchPaperPositions } from "../../api/portfolio";
import type { PaperPortfolio } from "../../types";
import { useSettingsStore } from "../../store/settingsStore";
import { useMarketContextStore } from "../../store/marketContextStore";
import { useTerminalStore } from "../store/terminalStore";
import { formatNumber, formatPct, formatQty, formatSigned, pnlClass } from "../format";
import { TerminalPanel } from "../../components/terminal/TerminalPanel";
import { TerminalBadge } from "../../components/terminal/TerminalBadge";

/**
 * Quantum Core right column — Account (directive §29–32).
 * Persistent account context: balances, positions, unrealized P&L.
 * Clicking a position switches the global instrument context (§32 sync).
 */

type Props = {
  /** Portfolio list override (tests). */
  portfolios?: PaperPortfolio[];
  /** Instrument selection override (tests). */
  onSelectInstrument?: (ticker: string) => void;
};

export function AccountPanel({ portfolios, onSelectInstrument }: Props) {
  const displayCurrency = useSettingsStore((s) => s.displayCurrency);
  const selectedPortfolioId = useTerminalStore((s) => s.selectedPortfolioId);
  const selectPortfolio = useTerminalStore((s) => s.selectPortfolio);
  const selectContextInstrument = useMarketContextStore((s) => s.selectInstrument);
  const tab = useTerminalStore((s) => s.accountTab);
  const setTab = useTerminalStore((s) => s.setAccountTab);
  const selectedPositionId = useTerminalStore((s) => s.selectedPositionId);
  const setSelectedPositionId = useTerminalStore((s) => s.setSelectedPositionId);

  const portfoliosQuery = useQuery({
    queryKey: ["qc-paper-portfolios"],
    queryFn: fetchPaperPortfolios,
    enabled: portfolios === undefined,
    retry: 1,
  });
  const portfolioList = portfolios ?? portfoliosQuery.data ?? [];
  const activePortfolio = useMemo(
    () =>
      portfolioList.find((portfolio) => portfolio.id === selectedPortfolioId) ??
      portfolioList[0] ??
      null,
    [portfolioList, selectedPortfolioId],
  );

  const positionsQuery = useQuery({
    queryKey: ["qc-account", "positions", activePortfolio?.id],
    queryFn: () => fetchPaperPositions(activePortfolio?.id ?? ""),
    enabled: Boolean(activePortfolio?.id),
    refetchInterval: 15_000,
    retry: 1,
  });
  const performanceQuery = useQuery({
    queryKey: ["qc-account", "performance", activePortfolio?.id],
    queryFn: () => fetchPaperPerformance(activePortfolio?.id ?? ""),
    enabled: Boolean(activePortfolio?.id),
    refetchInterval: 30_000,
    retry: 1,
  });

  const positions = positionsQuery.data ?? [];
  const positionsValue = useMemo(
    () => positions.reduce((sum, position) => sum + position.mark_price * position.quantity, 0),
    [positions],
  );
  const unrealizedPnl = useMemo(
    () => positions.reduce((sum, position) => sum + position.unrealized_pnl, 0),
    [positions],
  );
  const equity = performanceQuery.data?.equity ?? (activePortfolio ? activePortfolio.current_cash + positionsValue : null);

  const selectPositionInstrument = (symbol: string, positionId: string) => {
    const bare = symbol.includes(":") ? symbol.split(":").slice(1).join(":") : symbol;
    const ticker = bare.trim().toUpperCase();
    if (!ticker) return;
    setSelectedPositionId(positionId === selectedPositionId ? null : positionId);
    if (onSelectInstrument) onSelectInstrument(ticker);
    else void selectContextInstrument(ticker);
  };

  return (
    <TerminalPanel
      title="ACCOUNT"
      subtitle={activePortfolio?.name ?? undefined}
      actions={
        <div className="flex items-center gap-1.5">
          <TerminalBadge variant="mock">PAPER</TerminalBadge>
          <nav aria-label="Account views" className="flex items-center gap-0.5">
            {(["balances", "positions"] as const).map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={tab === id}
                onClick={() => setTab(id)}
                data-testid={`account-tab-${id}`}
                className={[
                  "rounded-sm border px-1.5 py-0.5 text-[10px] uppercase tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal-accent",
                  tab === id
                    ? "border-terminal-accent bg-terminal-accent/10 text-terminal-accent"
                    : "border-transparent text-terminal-muted hover:border-terminal-border hover:text-terminal-text",
                ].join(" ")}
              >
                {id === "balances" ? "Balances" : "Positions"}
              </button>
            ))}
          </nav>
        </div>
      }
      bodyClassName="flex min-h-0 flex-col"
    >
      {/* Account header (§30) */}
      <div className="border-b border-terminal-border px-2 py-1.5">
        {portfolioList.length > 0 ? (
          <div className="flex items-center justify-between gap-2">
            <select
              aria-label="Select account"
              value={activePortfolio?.id ?? ""}
              onChange={(event) => selectPortfolio(event.target.value || null)}
              className="max-w-[60%] truncate rounded-sm border border-terminal-border bg-terminal-bg px-1 py-0.5 text-[10px] text-terminal-text focus:border-terminal-accent focus:outline-none"
            >
              {portfolioList.map((portfolio) => (
                <option key={portfolio.id} value={portfolio.id}>
                  {portfolio.name}
                </option>
              ))}
            </select>
            <span className="text-[9px] text-terminal-muted">{displayCurrency} · SIMULATED</span>
          </div>
        ) : portfoliosQuery.isLoading ? (
          <span className="text-[10px] text-terminal-muted">Loading accounts…</span>
        ) : (
          <span className="text-[10px] text-terminal-warn">No paper account</span>
        )}

        <dl className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-0.5 text-[10px]">
          <dt className="text-terminal-muted">Portfolio value</dt>
          <dd className="text-right tabular-nums text-terminal-text">{formatNumber(equity, { compact: true })}</dd>
          <dt className="text-terminal-muted">Cash</dt>
          <dd className="text-right tabular-nums text-terminal-text">
            {formatNumber(activePortfolio?.current_cash ?? null, { compact: true })}
          </dd>
          <dt className="text-terminal-muted">Positions value</dt>
          <dd className="text-right tabular-nums text-terminal-text">{formatNumber(positionsValue, { compact: true })}</dd>
          <dt className="text-terminal-muted">Unrealized P&L</dt>
          <dd className={`text-right tabular-nums ${pnlClass(unrealizedPnl)}`}>{formatSigned(unrealizedPnl)}</dd>
          <dt className="text-terminal-muted">Total P&L</dt>
          <dd className={`text-right tabular-nums ${pnlClass(performanceQuery.data?.pnl)}`}>
            {formatSigned(performanceQuery.data?.pnl ?? null)}
          </dd>
        </dl>
      </div>

      {/* Body */}
      <div className="min-h-0 flex-1 overflow-auto" data-testid="account-body">
        {tab === "balances" ? (
          <div className="p-2 text-[10px]">
            {positionsQuery.isLoading ? (
              <div className="text-terminal-muted">Loading balances…</div>
            ) : positionsQuery.isError ? (
              <div className="text-terminal-warn">Account data unavailable</div>
            ) : positions.length === 0 ? (
              <div className="text-terminal-muted">No open positions. Orders you place appear here.</div>
            ) : (
              <table className="w-full tabular-nums">
                <thead>
                  <tr className="text-terminal-muted">
                    <th className="py-0.5 text-left font-normal">Cash</th>
                    <th className="py-0.5 text-right font-normal">Positions</th>
                    <th className="py-0.5 text-right font-normal">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-terminal-border/40">
                    <td className="py-0.5 text-terminal-text">
                      {formatNumber(activePortfolio?.current_cash ?? null)}
                    </td>
                    <td className="py-0.5 text-right text-terminal-text">{formatNumber(positionsValue)}</td>
                    <td className="py-0.5 text-right text-terminal-text">{formatNumber(equity)}</td>
                  </tr>
                </tbody>
              </table>
            )}
            <p className="mt-2 text-[9px] leading-relaxed text-terminal-muted/80">
              Paper account — balances and positions are simulated by the ARQOS paper engine.
            </p>
          </div>
        ) : positionsQuery.isLoading ? (
          <div className="p-2 text-[11px] text-terminal-muted">Loading positions…</div>
        ) : positionsQuery.isError ? (
          <div className="p-2">
            <div className="text-[11px] text-terminal-warn">Positions unavailable</div>
            <button
              type="button"
              onClick={() => void positionsQuery.refetch()}
              className="mt-1 rounded-sm border border-terminal-border px-2 py-0.5 text-[10px] text-terminal-accent hover:border-terminal-accent"
            >
              Retry
            </button>
          </div>
        ) : positions.length === 0 ? (
          <div className="p-2 text-[11px] text-terminal-muted" data-testid="positions-empty">
            No open positions.
          </div>
        ) : (
          <table className="w-full border-collapse text-[10px] tabular-nums">
            <thead className="sticky top-0 bg-terminal-panel text-[9px] uppercase tracking-wide">
              <tr>
                <th className="py-0.5 pl-2 text-left font-normal text-terminal-muted">Security</th>
                <th className="py-0.5 text-right font-normal text-terminal-muted">Qty</th>
                <th className="py-0.5 text-right font-normal text-terminal-muted">Avg</th>
                <th className="py-0.5 text-right font-normal text-terminal-muted">Mark</th>
                <th className="py-0.5 text-right font-normal text-terminal-muted">Value</th>
                <th className="py-0.5 pr-2 text-right font-normal text-terminal-muted">P&L</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position) => (
                <tr
                  key={position.id}
                  data-testid={`position-row-${position.symbol}`}
                  onClick={() => selectPositionInstrument(position.symbol, position.id)}
                  className={[
                    "cursor-pointer border-b border-terminal-border/40 hover:bg-terminal-panel",
                    selectedPositionId === position.id ? "bg-terminal-accent/10" : "",
                  ].join(" ")}
                >
                  <td className="truncate py-0.5 pl-2 text-left text-terminal-text">
                    {position.symbol.includes(":") ? position.symbol.split(":").slice(1).join(":") : position.symbol}
                  </td>
                  <td className="py-0.5 text-right text-terminal-text">{formatQty(position.quantity)}</td>
                  <td className="py-0.5 text-right text-terminal-text">{formatNumber(position.avg_entry_price)}</td>
                  <td className="py-0.5 text-right text-terminal-text">{formatNumber(position.mark_price)}</td>
                  <td className="py-0.5 text-right text-terminal-text">
                    {formatNumber(position.mark_price * position.quantity, { compact: true })}
                  </td>
                  <td className={`py-0.5 pr-2 text-right ${pnlClass(position.unrealized_pnl)}`}>
                    {formatSigned(position.unrealized_pnl)}
                    <span className="ml-1 text-[9px] opacity-80">
                      {formatPct(
                        position.avg_entry_price > 0
                          ? (position.unrealized_pnl / (position.avg_entry_price * position.quantity)) * 100
                          : null,
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-terminal-border text-[10px]">
                <td className="py-0.5 pl-2 text-terminal-muted">Total</td>
                <td colSpan={3} />
                <td className="py-0.5 text-right text-terminal-text">
                  {formatNumber(positionsValue, { compact: true })}
                </td>
                <td className={`py-0.5 pr-2 text-right ${pnlClass(unrealizedPnl)}`}>
                  {formatSigned(unrealizedPnl)}
                </td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </TerminalPanel>
  );
}
