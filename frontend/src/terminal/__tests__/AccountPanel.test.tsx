import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AccountPanel } from "../components/AccountPanel";
import { useTerminalStore } from "../store/terminalStore";
import { useContextStore } from "../../store/contextStore";

const apiMocks = vi.hoisted(() => ({
  fetchPaperPortfolios: vi.fn(),
  fetchPaperPositions: vi.fn(),
  fetchPaperPerformance: vi.fn(),
  fetchPaperOrders: vi.fn(),
  cancelPaperOrder: vi.fn(),
  placePaperOrder: vi.fn(),
}));

vi.mock("../../api/portfolio", () => apiMocks);

const PORTFOLIOS = [
  { id: "pf-1", name: "Paper One", initial_capital: 100000, current_cash: 90000 },
];

const POSITIONS = [
  { id: "p-1", symbol: "NSE:RELIANCE", quantity: 10, avg_entry_price: 100, mark_price: 110, unrealized_pnl: 100 },
  { id: "p-2", symbol: "NSE:TCS", quantity: -5, avg_entry_price: 3300, mark_price: 3200, unrealized_pnl: 500 },
];

function renderPanel(props?: Parameters<typeof AccountPanel>[0]) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <AccountPanel portfolios={PORTFOLIOS} {...props} />
    </QueryClientProvider>,
  );
}

describe("AccountPanel (§29–32)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useTerminalStore.setState({
            accountTab: "balances",
      selectedPositionId: null,
    });
    useContextStore.setState({ accountPortfolioId: "pf-1" });
    apiMocks.fetchPaperPositions.mockResolvedValue(POSITIONS);
    apiMocks.fetchPaperPerformance.mockResolvedValue({
      portfolio_id: "pf-1",
      equity: 91600,
      pnl: 600,
    });
  });

  it("shows the account header: value, cash, unrealized and total P&L (§30)", async () => {
    renderPanel();
    expect(await screen.findByText("Portfolio value")).toBeTruthy();
    expect(screen.getByText("Unrealized P&L")).toBeTruthy();
    // unrealized (100+500) and total P&L both land at +600.00
    expect((await screen.findAllByText("+600.00")).length).toBe(2);
    expect(screen.getByText("PAPER")).toBeTruthy();
    expect(screen.getByText(/SIMULATED/)).toBeTruthy();
  });

  it("renders dense position rows with semantic P&L (§31)", async () => {
    renderPanel();
    await userEvent.click(screen.getByTestId("account-tab-positions"));
    expect(await screen.findByTestId("position-row-NSE:RELIANCE")).toBeTruthy();
    const row = screen.getByTestId("position-row-NSE:RELIANCE");
    expect(row.textContent).toContain("110.00"); // mark
    expect(row.textContent).toContain("+100.00"); // unrealized pnl
    expect(screen.getByTestId("position-row-NSE:TCS")).toBeTruthy();
  });

  it("synchronizes instrument context when a position is selected (§32)", async () => {
    const onSelect = vi.fn();
    renderPanel({ onSelectInstrument: onSelect });
    await userEvent.click(screen.getByTestId("account-tab-positions"));
    await userEvent.click(screen.getByTestId("position-row-NSE:TCS"));
    expect(onSelect).toHaveBeenCalledWith("TCS");
    expect(useTerminalStore.getState().selectedPositionId).toBe("p-2");
  });

  it("shows totals across positions", async () => {
    renderPanel();
    await userEvent.click(screen.getByTestId("account-tab-positions"));
    expect(await screen.findByText("Total")).toBeTruthy();
    // RELIANCE 10×110 = 1100, TCS -5×3200 = -16000 → -14900
    expect(screen.getByTestId("account-body").textContent).toContain("-14,900.00");
  });

  it("shows an honest empty state with no positions", async () => {
    apiMocks.fetchPaperPositions.mockResolvedValue([]);
    renderPanel();
    await userEvent.click(screen.getByTestId("account-tab-positions"));
    expect(await screen.findByTestId("data-state-empty")).toBeTruthy();
  });
});
