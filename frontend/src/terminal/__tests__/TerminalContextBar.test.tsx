import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";

import { TerminalContextBar } from "../components/TerminalContextBar";

const apiMocks = vi.hoisted(() => ({
  fetchPaperPortfolios: vi.fn().mockResolvedValue([
    { id: "pf-1", name: "Paper One", initial_capital: 100000, current_cash: 90000 },
  ]),
}));

vi.mock("../../api/portfolio", () => apiMocks);
vi.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({ user: { email: "trader@arqos.local", role: "trader" } }),
}));
vi.mock("../../hooks/useStocks", () => ({
  useMarketStatus: () => ({ data: { status: "open" } }),
}));
vi.mock("../../store/stockStore", () => ({
  useStockStore: (selector: (s: { ticker: string }) => string) => selector({ ticker: "RELIANCE" }),
}));

function renderBar() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <TerminalContextBar />
    </QueryClientProvider>,
  );
}

describe("TerminalContextBar (§11)", () => {
  it("answers: where am I, who am I acting for, which account, which instrument", async () => {
    renderBar();
    expect(screen.getByText("Trading Terminal")).toBeTruthy();
    expect(screen.getByText("trader@arqos.local")).toBeTruthy();
    expect(await screen.findByText(/Paper One/)).toBeTruthy();
    expect(screen.getByText("RELIANCE")).toBeTruthy();
    expect(screen.getByText("PAPER")).toBeTruthy();
  });

  it("communicates market state", () => {
    renderBar();
    expect(screen.getByText("MARKET OPEN")).toBeTruthy();
  });
});
