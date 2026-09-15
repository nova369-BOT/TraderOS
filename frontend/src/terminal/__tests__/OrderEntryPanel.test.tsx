import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { OrderEntryPanel } from "../components/OrderEntryPanel";
import { useTerminalStore } from "../store/terminalStore";
import { useContextStore } from "../../store/contextStore";

const portfolioMocks = vi.hoisted(() => ({
  fetchPaperPortfolios: vi.fn(),
  placePaperOrder: vi.fn(),
  fetchPaperOrders: vi.fn(),
  fetchPaperPositions: vi.fn(),
  fetchPaperPerformance: vi.fn(),
  cancelPaperOrder: vi.fn(),
}));

vi.mock("../../api/portfolio", () => portfolioMocks);
vi.mock("../../realtime/useQuotesStream", () => ({
  useQuotesStore: (selector: (s: { connectionState: string; ticksByToken: Record<string, unknown> }) => unknown) =>
    selector({ connectionState: "disconnected", ticksByToken: {} }),
  useQuotesStream: () => ({
    subscribe: vi.fn(),
    unsubscribe: vi.fn(),
    connectionState: "disconnected",
    isConnected: false,
  }),
}));

const PORTFOLIOS = [
  { id: "pf-1", name: "Paper One", initial_capital: 100000, current_cash: 90000 },
  { id: "pf-2", name: "Paper Two", initial_capital: 50000, current_cash: 50000 },
];

function renderPanel(props?: Parameters<typeof OrderEntryPanel>[0]) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <OrderEntryPanel portfolios={PORTFOLIOS} {...props} />
    </QueryClientProvider>,
  );
}

describe("OrderEntryPanel (§17–19)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useContextStore.setState({ accountPortfolioId: "pf-1" });
    useTerminalStore.setState({ ordersTab: "live" });
  });

  it("renders the institutional context block with the PAPER execution label", () => {
    renderPanel({ instrument: "RELIANCE", market: "NSE" });
    expect(screen.getByText("ORDER ENTRY")).toBeTruthy();
    expect(screen.getAllByText("RELIANCE").length).toBeGreaterThan(0);
    expect(screen.getByText("ARQOS Paper Engine")).toBeTruthy();
    expect(screen.getByText("PAPER")).toBeTruthy();
  });

  it("validates locally: missing quantity and missing price are explicit", async () => {
    renderPanel({ instrument: "RELIANCE", market: "NSE" });
    const validation = screen.getByTestId("order-validation");
    expect(validation.textContent).toContain("Quantity must be greater than zero");

    await userEvent.type(screen.getByTestId("order-quantity"), "10");
    // market order: no price required → no validation errors
    expect(screen.queryByTestId("order-validation")).toBeNull();

    // switch to limit without a price
    await userEvent.click(screen.getByRole("button", { name: "LMT" }));
    const withLimit = screen.getByTestId("order-validation");
    expect(withLimit.textContent).toContain("Limit orders require a positive limit price");
  });

  it("disables submission while validation fails", () => {
    renderPanel({ instrument: "RELIANCE", market: "NSE" });
    expect((screen.getByTestId("order-submit") as HTMLButtonElement).disabled).toBe(true);
  });

  it("submits a valid order to the paper engine with the account context", async () => {
    const onSubmit = vi.fn().mockResolvedValue({
      id: "o-1",
      symbol: "NSE:RELIANCE",
      side: "buy",
      order_type: "market",
      quantity: 10,
      status: "filled",
      fill_price: 100.5,
    });
    renderPanel({ instrument: "RELIANCE", market: "NSE", onSubmitOrder: onSubmit });

    await userEvent.type(screen.getByTestId("order-quantity"), "10");
    await userEvent.click(screen.getByTestId("order-submit"));

    await screen.findByTestId("order-feedback");
    expect(onSubmit).toHaveBeenCalledWith({
      portfolio_id: "pf-1",
      symbol: "NSE:RELIANCE",
      side: "buy",
      order_type: "market",
      quantity: 10,
    });
    expect(screen.getByTestId("order-feedback").textContent).toContain("FILLED");
  });

  it("surfaces submission errors instead of failing silently", async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error("insufficient cash"));
    renderPanel({ instrument: "TCS", market: "NSE", onSubmitOrder: onSubmit });

    await userEvent.type(screen.getByTestId("order-quantity"), "5");
    await userEvent.click(screen.getByTestId("order-submit"));

    expect(await screen.findByText(/insufficient cash/i)).toBeTruthy();
  });

  it("flags a missing instrument in validation", () => {
    renderPanel({ instrument: "", market: "NSE" });
    expect(screen.getByTestId("order-validation").textContent).toContain("No instrument selected");
  });
});
