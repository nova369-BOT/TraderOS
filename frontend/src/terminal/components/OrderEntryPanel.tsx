import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  fetchPaperPortfolios,
  placePaperOrder,
} from "../../api/portfolio";
import type { PaperOrder, PaperPortfolio } from "../../types";
import { useSettingsStore } from "../../store/settingsStore";
import { useStockStore } from "../../store/stockStore";
import { useTerminalStore } from "../store/terminalStore";
import { useContextStore } from "../../store/contextStore";
import { useTerminalQuotes } from "../hooks/useTerminalQuotes";
import { formatNumber } from "../format";
import { TerminalPanel } from "../../components/terminal/TerminalPanel";
import { TerminalBadge } from "../../components/terminal/TerminalBadge";

/**
 * Quantum Core left column — Order Entry (directive §17–19).
 * Dense, structured, context-aware; validates locally and submits to the
 * paper trading engine. Execution class is always labeled PAPER — this is
 * simulated execution, never represented as live trading.
 */

type OrderSide = "buy" | "sell";
type OrderType = "market" | "limit" | "sl";

type Props = {
  /** Instrument override (tests). Defaults to the global instrument context. */
  instrument?: string;
  /** Market override (tests). Defaults to the selected market. */
  market?: string;
  /** Portfolio list override (tests). */
  portfolios?: PaperPortfolio[];
  /** Submit override (tests). */
  onSubmitOrder?: (payload: {
    portfolio_id: string;
    symbol: string;
    side: OrderSide;
    order_type: OrderType;
    quantity: number;
    limit_price?: number;
    sl_price?: number;
  }) => Promise<PaperOrder>;
};

export function OrderEntryPanel({ instrument, market, portfolios, onSubmitOrder }: Props) {
  const queryClient = useQueryClient();
  const contextTicker = useStockStore((s) => s.ticker);
  const selectedMarket = useSettingsStore((s) => s.selectedMarket);
  const displayCurrency = useSettingsStore((s) => s.displayCurrency);
  const selectedPortfolioId = useContextStore((s) => s.accountPortfolioId);
  const selectPortfolio = useContextStore((s) => s.setAccountPortfolioId);
  const setOrdersTab = useTerminalStore((s) => s.setOrdersTab);

  const activeInstrument = (instrument ?? contextTicker ?? "").trim().toUpperCase();
  const activeMarket = (market ?? selectedMarket).trim().toUpperCase();

  const portfoliosQuery = useQuery({
    queryKey: ["qc-paper-portfolios"],
    queryFn: fetchPaperPortfolios,
    enabled: portfolios === undefined,
    retry: 1,
  });
  const portfolioList = portfolios ?? portfoliosQuery.data ?? [];

  // Default the account selection to the persisted choice or the first portfolio.
  const effectivePortfolioId = useMemo(() => {
    if (selectedPortfolioId && portfolioList.some((p) => p.id === selectedPortfolioId)) {
      return selectedPortfolioId;
    }
    return portfolioList[0]?.id ?? null;
  }, [selectedPortfolioId, portfolioList]);

  useEffect(() => {
    if (effectivePortfolioId && effectivePortfolioId !== selectedPortfolioId) {
      selectPortfolio(effectivePortfolioId);
    }
  }, [effectivePortfolioId, selectedPortfolioId, selectPortfolio]);

  const quotes = useTerminalQuotes(
    activeMarket === "NSE" || activeMarket === "BSE" ? "NSE" : "NASDAQ",
    activeInstrument ? [activeInstrument] : [],
  );
  const quote = activeInstrument ? quotes.quoteBySymbol[activeInstrument] : undefined;

  const [side, setSide] = useState<OrderSide>("buy");
  const [orderType, setOrderType] = useState<OrderType>("market");
  const [quantityInput, setQuantityInput] = useState("");
  const [limitPriceInput, setLimitPriceInput] = useState("");
  const [slPriceInput, setSlPriceInput] = useState("");
  const [feedback, setFeedback] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  const validation = useMemo(() => {
    const errors: string[] = [];
    if (!activeInstrument) errors.push("No instrument selected");
    if (!effectivePortfolioId) errors.push("No account (paper portfolio) available");
    const qty = Number(quantityInput);
    if (!quantityInput.trim() || !Number.isFinite(qty) || qty <= 0) errors.push("Quantity must be greater than zero");
    if (orderType === "limit") {
      const price = Number(limitPriceInput);
      if (!limitPriceInput.trim() || !Number.isFinite(price) || price <= 0) errors.push("Limit orders require a positive limit price");
    }
    if (orderType === "sl") {
      const sl = Number(slPriceInput);
      if (!slPriceInput.trim() || !Number.isFinite(sl) || sl <= 0) errors.push("Stop-loss orders require a positive trigger price");
    }
    return errors;
  }, [activeInstrument, effectivePortfolioId, quantityInput, orderType, limitPriceInput, slPriceInput]);

  const submit = useMutation({
    mutationFn: async () => {
      if (!effectivePortfolioId || !activeInstrument) {
        throw new Error("Missing order context");
      }
      const payload = {
        portfolio_id: effectivePortfolioId,
        symbol: `${activeMarket}:${activeInstrument}`,
        side,
        order_type: orderType,
        quantity: Number(quantityInput),
        ...(orderType === "limit" ? { limit_price: Number(limitPriceInput) } : {}),
        ...(orderType === "sl" ? { sl_price: Number(slPriceInput) } : {}),
      };
      if (onSubmitOrder) return onSubmitOrder(payload);
      return placePaperOrder(payload);
    },
    onSuccess: (order) => {
      setFeedback({
        kind: "ok",
        text: `${order.symbol} ${order.side.toUpperCase()} ${order.quantity} — ${order.status.toUpperCase()}${order.fill_price ? ` @ ${order.fill_price}` : ""}`,
      });
      setQuantityInput("");
      setOrdersTab("live");
      void queryClient.invalidateQueries({ queryKey: ["qc-orders"] });
      void queryClient.invalidateQueries({ queryKey: ["qc-account"] });
    },
    onError: (error: Error) => {
      setFeedback({ kind: "error", text: error.message || "Order rejected" });
    },
  });

  const sideButton = (value: OrderSide, label: string, className: string) => (
    <button
      type="button"
      aria-pressed={side === value}
      onClick={() => setSide(value)}
      className={[
        "flex-1 rounded-sm border px-2 py-1 text-[11px] font-semibold uppercase tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal-accent",
        side === value ? className : "border-terminal-border text-terminal-muted hover:border-terminal-muted",
      ].join(" ")}
    >
      {label}
    </button>
  );

  const typeButton = (value: OrderType, label: string) => (
    <button
      type="button"
      aria-pressed={orderType === value}
      onClick={() => setOrderType(value)}
      className={[
        "flex-1 rounded-sm border px-1.5 py-1 text-[10px] uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal-accent",
        orderType === value
          ? "border-terminal-accent bg-terminal-accent/10 text-terminal-accent"
          : "border-terminal-border text-terminal-muted hover:border-terminal-muted",
      ].join(" ")}
    >
      {label}
    </button>
  );

  return (
    <TerminalPanel
      title="ORDER ENTRY"
      subtitle={activeInstrument || "No instrument"}
      actions={<TerminalBadge variant="mock">PAPER</TerminalBadge>}
      bodyClassName="flex min-h-0 flex-col"
    >
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-2">
        {/* Context (§17–18): instrument / account / currency / custodian */}
        <section aria-label="Order context" className="grid grid-cols-2 gap-x-2 gap-y-1 border-b border-terminal-border/60 pb-2 text-[10px]">
          <div className="text-terminal-muted">Instrument</div>
          <div className="truncate text-right font-medium text-terminal-text">{activeInstrument || "--"}</div>
          <div className="text-terminal-muted">Account</div>
          <div className="truncate text-right text-terminal-text">
            {portfolioList.length > 0 ? (
              <select
                aria-label="Select account"
                value={effectivePortfolioId ?? ""}
                onChange={(event) => selectPortfolio(event.target.value || null)}
                className="max-w-full rounded-sm border border-terminal-border bg-terminal-bg px-1 py-0.5 text-right text-[10px] text-terminal-text focus:border-terminal-accent focus:outline-none"
              >
                {portfolioList.map((portfolio) => (
                  <option key={portfolio.id} value={portfolio.id}>
                    {portfolio.name}
                  </option>
                ))}
              </select>
            ) : portfoliosQuery.isLoading ? (
              <span className="text-terminal-muted">Loading…</span>
            ) : (
              <span className="text-terminal-warn">No paper account</span>
            )}
          </div>
          <div className="text-terminal-muted">Market</div>
          <div className="text-right text-terminal-text">{activeMarket}</div>
          <div className="text-terminal-muted">Currency</div>
          <div className="text-right text-terminal-text">{displayCurrency}</div>
          <div className="text-terminal-muted">Custodian</div>
          <div className="text-right text-terminal-text">ARQOS Paper Engine</div>
        </section>

        {/* Side */}
        <div className="flex gap-1.5">
          {sideButton("buy", "Buy", "border-terminal-pos bg-terminal-pos/10 text-terminal-pos")}
          {sideButton("sell", "Sell", "border-terminal-neg bg-terminal-neg/10 text-terminal-neg")}
        </div>

        {/* Operation */}
        <div className="flex gap-1.5" role="group" aria-label="Order type">
          {typeButton("market", "MKT")}
          {typeButton("limit", "LMT")}
          {typeButton("sl", "SL")}
        </div>

        {/* Parameters */}
        <div className="grid grid-cols-2 gap-1.5">
          <label className="block">
            <span className="text-[9px] uppercase tracking-wider text-terminal-muted">Quantity</span>
            <input
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={quantityInput}
              onChange={(event) => setQuantityInput(event.target.value)}
              aria-label="Order quantity"
              data-testid="order-quantity"
              className="mt-0.5 w-full rounded-sm border border-terminal-border bg-terminal-bg px-2 py-1 text-right text-[11px] tabular-nums text-terminal-text focus:border-terminal-accent focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-[9px] uppercase tracking-wider text-terminal-muted">
              {orderType === "sl" ? "Trigger price" : "Limit price"}
            </span>
            <input
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={orderType === "sl" ? slPriceInput : limitPriceInput}
              onChange={(event) =>
                orderType === "sl"
                  ? setSlPriceInput(event.target.value)
                  : setLimitPriceInput(event.target.value)
              }
              disabled={orderType === "market"}
              aria-label={orderType === "sl" ? "Stop-loss trigger price" : "Limit price"}
              data-testid="order-price"
              className="mt-0.5 w-full rounded-sm border border-terminal-border bg-terminal-bg px-2 py-1 text-right text-[11px] tabular-nums text-terminal-text focus:border-terminal-accent focus:outline-none disabled:opacity-40"
            />
          </label>
        </div>

        {quote?.last ? (
          <div className="flex items-center justify-between text-[10px] text-terminal-muted">
            <span>
              Last <span className="tabular-nums text-terminal-text">{formatNumber(quote.last)}</span>
            </span>
            <button
              type="button"
              onClick={() => {
                if (orderType === "sl") setSlPriceInput(String(quote.last ?? ""));
                else setLimitPriceInput(String(quote.last ?? ""));
              }}
              className="rounded-sm border border-terminal-border px-1.5 py-0.5 text-[9px] text-terminal-accent hover:border-terminal-accent"
            >
              Fill price
            </button>
          </div>
        ) : null}

        {/* Validation (§19) — local, explicit, never silent */}
        {validation.length > 0 ? (
          <ul aria-label="Order validation errors" className="space-y-0.5" data-testid="order-validation">
            {validation.map((error) => (
              <li key={error} className="text-[10px] text-terminal-warn">
                • {error}
              </li>
            ))}
          </ul>
        ) : null}

        {feedback ? (
          <div
            role="status"
            data-testid="order-feedback"
            className={[
              "rounded-sm border px-2 py-1 text-[10px]",
              feedback.kind === "ok"
                ? "border-terminal-pos/50 text-terminal-pos"
                : "border-terminal-warn/50 text-terminal-warn",
            ].join(" ")}
          >
            {feedback.text}
          </div>
        ) : null}

        <button
          type="button"
          disabled={validation.length > 0 || submit.isPending}
          onClick={() => submit.mutate()}
          data-testid="order-submit"
          className={[
            "w-full rounded-sm border px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal-accent",
            validation.length > 0 || submit.isPending
              ? "cursor-not-allowed border-terminal-border text-terminal-muted"
              : side === "buy"
                ? "border-terminal-pos bg-terminal-pos/15 text-terminal-pos hover:bg-terminal-pos/25"
                : "border-terminal-neg bg-terminal-neg/15 text-terminal-neg hover:bg-terminal-neg/25",
          ].join(" ")}
        >
          {submit.isPending ? "Submitting…" : `${side === "buy" ? "Buy" : "Sell"} ${activeInstrument || ""} · Paper`}
        </button>

        <p className="text-[9px] leading-relaxed text-terminal-muted/80">
          Paper execution — orders fill against the ARQOS simulated execution engine.
          No live exchange connectivity.
        </p>
      </div>
    </TerminalPanel>
  );
}
