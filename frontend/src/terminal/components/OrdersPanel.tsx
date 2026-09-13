import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { cancelPaperOrder, fetchPaperOrders } from "../../api/portfolio";
import type { PaperOrder } from "../../types";
import { useTerminalStore, type OrdersTab } from "../store/terminalStore";
import { useUiStore } from "../../store/uiStore";
import { formatNumber, formatQty, formatTime, pnlClass } from "../format";
import { TerminalPanel } from "../../components/terminal/TerminalPanel";
import { TerminalBadge } from "../../components/terminal/TerminalBadge";
import { DataState } from "../../design/components/DataState";
import { useDensity } from "../../design/useDensity";

/**
 * Quantum Core center-bottom — Orders terminal (directive §26–28).
 * Live / History separation, search, filter, sort, density, export, row
 * selection, and cancel actions — all against the real paper-order schema.
 */

const REFRESH_MS = 10_000;
const VIRTUALIZE_THRESHOLD = 120;
const VIRTUAL_WINDOW = 60;

const STATUS_BADGE: Record<string, "live" | "mock" | "warn" | "neutral" | "danger"> = {
  pending: "warn",
  filled: "live",
  cancelled: "neutral",
  rejected: "danger",
};

type SortKey = "time" | "symbol" | "quantity" | "price" | "status";

type Props = {
  /** Portfolio override (tests). */
  portfolioId?: string;
  /** Orders override (tests). */
  orders?: PaperOrder[];
};

export function OrdersPanel({ portfolioId, orders }: Props) {
  const queryClient = useQueryClient();
  const tab = useTerminalStore((s) => s.ordersTab);
  const setTab = useTerminalStore((s) => s.setOrdersTab);
  const selectedOrderId = useTerminalStore((s) => s.selectedOrderId);
  const setSelectedOrderId = useTerminalStore((s) => s.setSelectedOrderId);
  const storePortfolioId = useTerminalStore((s) => s.selectedPortfolioId);
  const activePortfolioId = portfolioId ?? storePortfolioId;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  // Global density mode (design system R1) — the toggle drives the app-wide mode.
  const { density } = useDensity();
  const toggleDensity = useUiStore((s) => s.toggleDensity);
  const dense = density === "compact";
  const [sortKey, setSortKey] = useState<SortKey>("time");
  const [sortAsc, setSortAsc] = useState(false);
  const [windowOffset, setWindowOffset] = useState(0);

  const ordersQuery = useQuery({
    queryKey: ["qc-orders", activePortfolioId],
    queryFn: () => fetchPaperOrders(activePortfolioId ?? ""),
    enabled: orders === undefined && Boolean(activePortfolioId),
    refetchInterval: REFRESH_MS,
    retry: 1,
  });
  const allOrders = orders ?? ordersQuery.data ?? [];

  const cancel = useMutation({
    mutationFn: (orderId: string) => cancelPaperOrder(orderId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["qc-orders"] });
      void queryClient.invalidateQueries({ queryKey: ["qc-account"] });
    },
  });

  const liveOrders = useMemo(
    () => allOrders.filter((order) => order.status === "pending"),
    [allOrders],
  );
  const historyOrders = useMemo(
    () => allOrders.filter((order) => order.status !== "pending"),
    [allOrders],
  );

  const tableRows = useMemo(() => {
    const source = tab === "live" ? liveOrders : historyOrders;
    const query = search.trim().toUpperCase();
    const filtered = source.filter((order) => {
      if (statusFilter !== "all" && order.status !== statusFilter) return false;
      if (!query) return true;
      return (
        order.symbol.toUpperCase().includes(query) ||
        order.side.toUpperCase().includes(query) ||
        order.id.toUpperCase().includes(query)
      );
    });
    const sorted = [...filtered].sort((a, b) => {
      let result = 0;
      if (sortKey === "symbol") result = a.symbol.localeCompare(b.symbol);
      else if (sortKey === "quantity") result = a.quantity - b.quantity;
      else if (sortKey === "price") result = (a.fill_price ?? a.limit_price ?? 0) - (b.fill_price ?? b.limit_price ?? 0);
      else if (sortKey === "status") result = a.status.localeCompare(b.status);
      else result = (Date.parse(b.fill_time ?? "") || 0) - (Date.parse(a.fill_time ?? "") || 0);
      return sortAsc ? result : -result;
    });
    return sorted;
  }, [tab, liveOrders, historyOrders, search, statusFilter, sortKey, sortAsc]);

  // Lightweight virtualization: render a sliding window when very large.
  const virtualized = tableRows.length > VIRTUALIZE_THRESHOLD;
  const visibleRows = useMemo(
    () => (virtualized ? tableRows.slice(windowOffset, windowOffset + VIRTUAL_WINDOW) : tableRows),
    [tableRows, virtualized, windowOffset],
  );

  const exportCsv = () => {
    const header = "id,symbol,side,type,quantity,limit_price,fill_price,status,fill_time";
    const lines = tableRows.map((order) =>
      [
        order.id,
        order.symbol,
        order.side,
        order.order_type,
        order.quantity,
        order.limit_price ?? "",
        order.fill_price ?? "",
        order.status,
        order.fill_time ?? "",
      ].join(","),
    );
    const blob = new Blob([[header, ...lines].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `arqos-orders-${tab}-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const headerCell = (key: SortKey, label: string, className = "") => {
    const active = sortKey === key;
    return (
      <th
        className={[
          "select-none py-0.5 font-normal",
          key === "time" ? "pl-1 text-left" : "text-right",
          className,
        ].join(" ")}
      >
        <button
          type="button"
          onClick={() => {
            if (active) setSortAsc((previous) => !previous);
            else {
              setSortKey(key);
              setSortAsc(false);
            }
          }}
          className={[
            "inline-flex items-center gap-0.5",
            active ? "text-terminal-accent" : "text-terminal-muted hover:text-terminal-text",
          ].join(" ")}
          aria-label={`Sort by ${label}`}
        >
          {label}
          {active ? <span aria-hidden>{sortAsc ? "▲" : "▼"}</span> : null}
        </button>
      </th>
    );
  };

  const rowClass = dense ? "py-0" : "py-0.5";

  return (
    <TerminalPanel
      title="ORDERS"
      subtitle={activePortfolioId ? undefined : "No account selected"}
      actions={
        <div className="flex items-center gap-1.5">
          <TerminalBadge variant={tab === "live" ? "warn" : "neutral"}>{tab === "live" ? `${liveOrders.length} OPEN` : `${historyOrders.length} CLOSED`}</TerminalBadge>
          <nav aria-label="Orders views" className="flex items-center gap-0.5">
            {(["live", "history"] as const).map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={tab === id}
                onClick={() => {
                  setTab(id);
                  setWindowOffset(0);
                }}
                data-testid={`orders-tab-${id}`}
                className={[
                  "rounded-sm border px-1.5 py-0.5 text-[10px] uppercase tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal-accent",
                  tab === id
                    ? "border-terminal-accent bg-terminal-accent/10 text-terminal-accent"
                    : "border-transparent text-terminal-muted hover:border-terminal-border hover:text-terminal-text",
                ].join(" ")}
              >
                {id === "live" ? "Live" : "History"}
              </button>
            ))}
          </nav>
        </div>
      }
      bodyClassName="flex min-h-0 flex-col"
    >
      {/* Controls (§26): search, filter, density, export */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-terminal-border p-1.5">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search orders…"
          aria-label="Search orders"
          data-testid="orders-search"
          className="w-40 rounded-sm border border-terminal-border bg-terminal-bg px-2 py-0.5 text-[11px] text-terminal-text placeholder:text-terminal-muted/60 focus:border-terminal-accent focus:outline-none"
        />
        <select
          aria-label="Filter by status"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-sm border border-terminal-border bg-terminal-bg px-1 py-0.5 text-[10px] text-terminal-text focus:border-terminal-accent focus:outline-none"
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="filled">Filled</option>
          <option value="cancelled">Cancelled</option>
          <option value="rejected">Rejected</option>
        </select>
        <button
          type="button"
          aria-pressed={dense}
          onClick={toggleDensity}
          title="Toggle global density"
          className="rounded-sm border border-terminal-border px-1.5 py-0.5 text-[10px] text-terminal-muted hover:border-terminal-muted hover:text-terminal-text"
        >
          {dense ? "Compact" : "Normal"}
        </button>
        <button
          type="button"
          onClick={exportCsv}
          disabled={tableRows.length === 0}
          className="rounded-sm border border-terminal-border px-1.5 py-0.5 text-[10px] text-terminal-muted hover:border-terminal-muted hover:text-terminal-text disabled:opacity-40"
        >
          Export CSV
        </button>
        <button
          type="button"
          onClick={() => void ordersQuery.refetch()}
          className="ml-auto rounded-sm border border-terminal-border px-1.5 py-0.5 text-[10px] text-terminal-accent hover:border-terminal-accent"
        >
          Refresh
        </button>
      </div>

      {/* Data grid (§27–28) */}
      <div className="min-h-0 flex-1 overflow-auto" data-testid="orders-grid">
        <DataState
          status={
            orders === undefined && ordersQuery.isLoading
              ? "loading"
              : orders === undefined && ordersQuery.isError
                ? "error"
                : tableRows.length === 0
                  ? "empty"
                  : "ready"
          }
          loadingLabel="Loading orders"
          error={(ordersQuery.error as Error | null) ?? "Orders unavailable"}
          onRetry={() => void ordersQuery.refetch()}
          emptyTitle={`${tab === "live" ? "No working orders" : "No order history"}${search || statusFilter !== "all" ? " for the current filter" : ""}.`}
        >
          <table className="w-full border-collapse text-[10px] tabular-nums">
            <thead className="sticky top-0 z-10 bg-terminal-panel text-[9px] uppercase tracking-wide">
              <tr>
                {headerCell("time", "Time")}
                {headerCell("symbol", "Instrument")}
                <th className="py-0.5 text-right font-normal text-terminal-muted">Side</th>
                <th className="py-0.5 text-right font-normal text-terminal-muted">Type</th>
                {headerCell("quantity", "Qty")}
                {headerCell("price", "Price")}
                {headerCell("status", "Status")}
                <th className="py-0.5 pr-1 text-right font-normal text-terminal-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((order) => (
                <tr
                  key={order.id}
                  data-testid={`order-row-${order.id}`}
                  onClick={() => setSelectedOrderId(order.id === selectedOrderId ? null : order.id)}
                  className={[
                    "cursor-pointer border-b border-terminal-border/40 hover:bg-terminal-panel",
                    selectedOrderId === order.id ? "bg-terminal-accent/10" : "",
                    rowClass,
                  ].join(" ")}
                >
                  <td className="whitespace-nowrap pl-1 text-left text-terminal-muted">
                    {formatTime(order.fill_time)}
                  </td>
                  <td className="text-right text-terminal-text">{order.symbol}</td>
                  <td className={`text-right font-medium ${order.side === "buy" ? "text-terminal-pos" : "text-terminal-neg"}`}>
                    {order.side.toUpperCase()}
                  </td>
                  <td className="text-right uppercase text-terminal-muted">{order.order_type}</td>
                  <td className="text-right text-terminal-text">{formatQty(order.quantity)}</td>
                  <td className="text-right text-terminal-text">
                    {formatNumber(order.fill_price ?? order.limit_price ?? null)}
                  </td>
                  <td className="text-right">
                    <TerminalBadge variant={STATUS_BADGE[order.status] ?? "neutral"}>
                      {order.status.toUpperCase()}
                    </TerminalBadge>
                  </td>
                  <td className="pr-1 text-right">
                    {order.status === "pending" ? (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          cancel.mutate(order.id);
                        }}
                        className="rounded-sm border border-terminal-border px-1.5 py-0.5 text-[9px] text-terminal-warn hover:border-terminal-warn"
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-terminal-muted/50">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataState>
      </div>

      {virtualized ? (
        <div className="flex items-center justify-between border-t border-terminal-border px-2 py-1 text-[10px] text-terminal-muted">
          <span>
            Showing {windowOffset + 1}–{Math.min(windowOffset + VIRTUAL_WINDOW, tableRows.length)} of{" "}
            {tableRows.length}
          </span>
          <span className="flex gap-1">
            <button
              type="button"
              disabled={windowOffset === 0}
              onClick={() => setWindowOffset((previous) => Math.max(0, previous - VIRTUAL_WINDOW))}
              className="rounded-sm border border-terminal-border px-1.5 py-0.5 disabled:opacity-40"
            >
              Prev
            </button>
            <button
              type="button"
              disabled={windowOffset + VIRTUAL_WINDOW >= tableRows.length}
              onClick={() => setWindowOffset((previous) => previous + VIRTUAL_WINDOW)}
              className="rounded-sm border border-terminal-border px-1.5 py-0.5 disabled:opacity-40"
            >
              Next
            </button>
          </span>
        </div>
      ) : null}

      {cancel.isError ? (
        <div className="border-t border-terminal-border px-2 py-1 text-[10px] text-terminal-warn">
          Cancel failed: {(cancel.error as Error).message}
        </div>
      ) : null}
    </TerminalPanel>
  );
}
