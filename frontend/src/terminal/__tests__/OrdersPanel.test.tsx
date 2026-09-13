import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { OrdersPanel } from "../components/OrdersPanel";
import { useTerminalStore } from "../store/terminalStore";

const apiMocks = vi.hoisted(() => ({
  cancelPaperOrder: vi.fn(),
  fetchPaperOrders: vi.fn(),
  fetchPaperPortfolios: vi.fn(),
  fetchPaperPositions: vi.fn(),
  fetchPaperPerformance: vi.fn(),
  placePaperOrder: vi.fn(),
}));

vi.mock("../../api/portfolio", () => apiMocks);

import type { PaperOrder } from "../../types";

const ORDERS: PaperOrder[] = [
  { id: "o-1", symbol: "NSE:RELIANCE", side: "buy", order_type: "limit", quantity: 10, limit_price: 100, status: "pending" },
  { id: "o-2", symbol: "NSE:TCS", side: "sell", order_type: "market", quantity: 5, status: "filled", fill_price: 3200, fill_time: "2026-09-12T09:30:00Z" },
  { id: "o-3", symbol: "NSE:INFY", side: "buy", order_type: "market", quantity: 3, status: "cancelled" },
];

function renderPanel(props?: Parameters<typeof OrdersPanel>[0]) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <OrdersPanel portfolioId="pf-1" orders={ORDERS} {...props} />
    </QueryClientProvider>,
  );
}

describe("OrdersPanel (§26–28)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useTerminalStore.setState({ ordersTab: "live", selectedOrderId: null });
  });

  it("separates working orders from history", async () => {
    renderPanel();
    expect(screen.getByTestId("order-row-o-1")).toBeTruthy();
    expect(screen.queryByTestId("order-row-o-2")).toBeNull();

    useTerminalStore.getState().setOrdersTab("history");
    expect(await screen.findByTestId("order-row-o-2")).toBeTruthy();
    expect(screen.getByTestId("order-row-o-3")).toBeTruthy();
    expect(screen.queryByTestId("order-row-o-1")).toBeNull();
  });

  it("searches across instrument, side, and id", async () => {
    renderPanel();
    useTerminalStore.getState().setOrdersTab("history");
    await screen.findByTestId("order-row-o-2");
    await userEvent.type(screen.getByTestId("orders-search"), "tcs");
    expect(screen.getByTestId("order-row-o-2")).toBeTruthy();
    expect(screen.queryByTestId("order-row-o-3")).toBeNull();
  });

  it("filters by status", async () => {
    renderPanel();
    useTerminalStore.getState().setOrdersTab("history");
    await screen.findByTestId("order-row-o-2");
    const filter = screen.getByLabelText("Filter by status") as HTMLSelectElement;
    await userEvent.selectOptions(filter, "cancelled");
    expect(screen.queryByTestId("order-row-o-2")).toBeNull();
    expect(screen.getByTestId("order-row-o-3")).toBeTruthy();
  });

  it("offers cancel only for working orders and calls the API", async () => {
    apiMocks.cancelPaperOrder.mockResolvedValue(undefined);
    renderPanel();
    expect(screen.getByTestId("order-row-o-1").textContent).toContain("PENDING");
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(apiMocks.cancelPaperOrder).toHaveBeenCalledWith("o-1");

    useTerminalStore.getState().setOrdersTab("history");
    await screen.findByTestId("order-row-o-2");
    // no pending rows → no cancel buttons
    expect(screen.queryByRole("button", { name: "Cancel" })).toBeNull();
  });

  it("selects a row into the terminal state", async () => {
    renderPanel();
    await userEvent.click(screen.getByTestId("order-row-o-1"));
    expect(useTerminalStore.getState().selectedOrderId).toBe("o-1");
    await userEvent.click(screen.getByTestId("order-row-o-1"));
    expect(useTerminalStore.getState().selectedOrderId).toBeNull();
  });

  it("shows an explicit empty state for a clean account", () => {
    renderPanel({ orders: [] });
    expect(screen.getByTestId("data-state-empty").textContent).toContain("No working orders");
  });
});
