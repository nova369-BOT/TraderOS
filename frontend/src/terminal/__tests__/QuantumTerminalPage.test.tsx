import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { QuantumTerminalPage } from "../QuantumTerminalPage";

/**
 * Composition test (§56): the three-column Quantum Core workstation must
 * mount every panel together — Watchlist, Order Entry, Market Data, Orders,
 * Account — under the terminal context bar.
 */

vi.mock("../../components/layout/TerminalShell", () => ({
  TerminalShell: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("../../api/watchlist", () => ({
  fetchWatchlists: vi.fn().mockResolvedValue([]),
  addWatchlistSymbols: vi.fn(),
}));
vi.mock("../../api/marketData", () => ({
  searchSymbols: vi.fn().mockResolvedValue([]),
  fetchChart: vi.fn().mockResolvedValue({ data: [] }),
  fetchQuotesBatch: vi.fn().mockResolvedValue({ market: "NSE", status: "unavailable", quotes: [] }),
}));
vi.mock("../../api/portfolio", () => ({
  fetchPaperPortfolios: vi.fn().mockResolvedValue([]),
  fetchPaperOrders: vi.fn().mockResolvedValue([]),
  fetchPaperPositions: vi.fn().mockResolvedValue([]),
  fetchPaperPerformance: vi.fn().mockResolvedValue({}),
  placePaperOrder: vi.fn(),
  cancelPaperOrder: vi.fn(),
}));
vi.mock("../../api/equity", () => ({
  fetchPitFundamentals: vi.fn().mockResolvedValue({}),
}));
vi.mock("../../api/news", () => ({
  fetchLatestNews: vi.fn().mockResolvedValue([]),
}));
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
vi.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({ user: { email: "trader@arqos.local" } }),
}));
vi.mock("../../hooks/useStocks", () => ({
  useMarketStatus: () => ({ data: null }),
}));

describe("QuantumTerminalPage composition (§2, §12, §56)", () => {
  it("mounts the full workstation: context bar + all six panels", () => {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    render(
      <MemoryRouter>
        <QueryClientProvider client={client}>
          <QuantumTerminalPage />
        </QueryClientProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText("Trading Terminal")).toBeTruthy();
    expect(screen.getByText("WATCHLIST")).toBeTruthy();
    expect(screen.getByText("ORDER ENTRY")).toBeTruthy();
    expect(screen.getByText("MARKET DATA")).toBeTruthy();
    expect(screen.getByText("ORDERS")).toBeTruthy();
    expect(screen.getByText("ACCOUNT")).toBeTruthy();
  });
});
