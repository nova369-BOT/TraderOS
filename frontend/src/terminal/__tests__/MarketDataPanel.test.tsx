import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { MarketDataPanel } from "../components/MarketDataPanel";
import { useTerminalStore } from "../store/terminalStore";

const apiMocks = vi.hoisted(() => ({
  fetchChart: vi.fn(),
  fetchPitFundamentals: vi.fn(),
  fetchLatestNews: vi.fn(),
  fetchPaperPositions: vi.fn(),
  fetchPaperPortfolios: vi.fn(),
  fetchPaperPerformance: vi.fn(),
}));

vi.mock("../../services/chartDataService", () => ({ fetchChartData: apiMocks.fetchChart }));
vi.mock("../../api/equity", () => ({ fetchPitFundamentals: apiMocks.fetchPitFundamentals }));
vi.mock("../../api/news", () => ({ fetchLatestNews: apiMocks.fetchLatestNews }));
vi.mock("../../api/portfolio", () => ({
  fetchPaperPositions: apiMocks.fetchPaperPositions,
  fetchPaperPortfolios: apiMocks.fetchPaperPortfolios,
  fetchPaperPerformance: apiMocks.fetchPaperPerformance,
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
vi.mock("../../components/chart/TradingChart", () => ({
  TradingChart: (props: { ticker: string }) => (
    <div data-testid="chart-stub" data-ticker={props.ticker}>
      chart:{props.ticker}
    </div>
  ),
}));

function renderPanel(props?: Parameters<typeof MarketDataPanel>[0]) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <MarketDataPanel instrument="RELIANCE" market="NSE" {...props} />
    </QueryClientProvider>,
  );
}

describe("MarketDataPanel (§20–25)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useTerminalStore.setState({
      marketDataTab: "chart",
      selectedPortfolioId: "pf-1",
    });
  });

  it("renders the market-data views: Chart, Fundamentals, Holdings, News", () => {
    renderPanel();
    expect(screen.getByTestId("marketdata-tab-chart")).toBeTruthy();
    expect(screen.getByTestId("marketdata-tab-fundamentals")).toBeTruthy();
    expect(screen.getByTestId("marketdata-tab-holdings")).toBeTruthy();
    expect(screen.getByTestId("marketdata-tab-news")).toBeTruthy();
  });

  it("renders the instrument context header with market and currency", () => {
    renderPanel();
    expect(screen.getAllByText("RELIANCE").length).toBeGreaterThan(0);
    expect(screen.getAllByText("NSE").length).toBeGreaterThan(0);
  });

  it("mounts the real chart core inside its container when data is available", async () => {
    apiMocks.fetchChart.mockResolvedValue({
      symbol: "RELIANCE",
      interval: "1d",
      count: 2,
      data: [
        { t: 1_000, o: 1, h: 2, l: 0.5, c: 1.5, v: 100 },
        { t: 2_000, o: 1.5, h: 2.5, l: 1, c: 2, v: 120 },
      ],
    });
    renderPanel();
    expect(await screen.findByTestId("chart-stub")).toBeTruthy();
    expect(screen.getByTestId("chart-stub").dataset.ticker).toBe("RELIANCE");
  });

  it("degrades honestly when chart data is unavailable", async () => {
    apiMocks.fetchChart.mockRejectedValue(new Error("provider down"));
    renderPanel();
    const state = await screen.findByTestId("data-state-error", {}, { timeout: 4000 });
    expect(state.textContent).toContain("Unavailable");
    expect(state.textContent).toContain("provider down"); // the real error, not a vague label
    expect(screen.getByRole("button", { name: "Retry" })).toBeTruthy();
  });

  it("shows an explicit no-instrument state", () => {
    renderPanel({ instrument: "" });
    expect(screen.getAllByText("No instrument selected").length).toBeGreaterThan(0);
  });

  it("switches timeframes and refetches chart data", async () => {
    apiMocks.fetchChart.mockResolvedValue({
      symbol: "RELIANCE",
      interval: "1d",
      count: 1,
      data: [{ t: 1_000, o: 1, h: 2, l: 0.5, c: 1.5, v: 100 }],
    });
    renderPanel();
    await screen.findByTestId("chart-stub");
    await userEvent.click(screen.getByRole("button", { name: "5m" }));
    await waitFor(() => {
      expect(apiMocks.fetchChart).toHaveBeenLastCalledWith("RELIANCE", {
        market: "NSE",
        interval: "5m",
        period: "1d",
      });
    });
  });
});

