import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { WhyDidThisMove } from "../components/intelligence/WhyDidThisMove";

vi.mock("../api/client", () => ({
  fetchStock: vi.fn().mockResolvedValue({
    ticker: "AAPL",
    symbol: "AAPL",
    company_name: "Apple Inc.",
    sector: "Technology",
    exchange: "NASDAQ",
    current_price: 210.5,
    change_pct: 3.42,
  }),
  fetchChart: vi.fn().mockResolvedValue({
    ticker: "AAPL",
    interval: "1d",
    range: "1y",
    data: Array.from({ length: 60 }, (_, i) => ({
      t: 1700000000 + i * 86400,
      o: 190 + i * 0.3,
      h: 191 + i * 0.3,
      l: 189 + i * 0.3,
      c: i === 59 ? 210.5 : 190 + i * 0.3,
      v: i === 59 ? 30_000_000 : 10_000_000 + (i % 5) * 100_000,
    })),
  }),
  fetchTopBarTickers: vi.fn().mockResolvedValue({
    tickers: [
      { symbol: "^IXIC", name: "NASDAQ", change_pct: 1.2 },
      { symbol: "^GSPC", name: "S&P 500", change_pct: 0.8 },
    ],
  }),
  fetchFnoSignal: vi.fn().mockResolvedValue(null),
}));

vi.mock("../api/intelligence", () => ({ fetchFnoSignal: vi.fn().mockResolvedValue(null), fetchDashboardResults: vi.fn(), fetchIntelligenceTimeline: vi.fn() }));
vi.mock("../api/news", () => ({
  fetchNewsByTicker: vi.fn().mockResolvedValue([
    {
      id: "n1",
      title: "Apple unveils new AI features",
      url: "https://example.com/1",
      published_at: new Date(Date.now() - 2 * 3600_000).toISOString(),
      source: "Wire",
      sentiment_label: "positive",
      tickers: ["AAPL"],
    },
  ]),
}));

vi.mock("../api/equity", () => ({
  fetchPeers: vi.fn().mockResolvedValue({ ticker: "AAPL", universe: "US Tech Mega", metrics: [] }),
}));

vi.mock("../api/statlab", () => ({
  postRegimes: vi.fn().mockResolvedValue({
    ticker: "AAPL",
    k_regimes: 2,
    n_obs: 250,
    current_regime: "low_vol",
    current_high_vol_prob: 0.12,
    high_vol_regime: {},
    low_vol_regime: {},
  }),
  postCointegration: vi.fn(),
  postStationarity: vi.fn(),
  postDecomposition: vi.fn(),
  postRegression: vi.fn(),
  postAutocorrelation: vi.fn(),
  postCausality: vi.fn(),
  fetchStatlabMethods: vi.fn(),
  postForecast: vi.fn(),
}));

describe("WhyDidThisMove (Movement Intelligence)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders instrument header with observed price move", { timeout: 15000 }, async () => {
    render(
      <MemoryRouter>
        <WhyDidThisMove ticker="AAPL" />
      </MemoryRouter>,
    );
    await waitFor(
      () => {
        expect(document.body.textContent).toContain("Apple Inc.");
        expect(document.body.textContent).toMatch(/\+3\.42%/);
      },
      { timeout: 10000 },
    );
  });

  it("labels every insight OBSERVED / DERIVED / AI — never unlabeled", async () => {
    render(
      <MemoryRouter>
        <WhyDidThisMove ticker="AAPL" />
      </MemoryRouter>,
    );
    expect((await screen.findAllByText("OBSERVED")).length).toBeGreaterThanOrEqual(2);
    expect((await screen.findAllByText("DERIVED")).length).toBeGreaterThanOrEqual(2);
    expect((await screen.findAllByText("AI")).length).toBeGreaterThanOrEqual(1);
  });

  it("shows derived volume and sigma evidence with explicit heuristic labels", async () => {
    render(
      <MemoryRouter>
        <WhyDidThisMove ticker="AAPL" />
      </MemoryRouter>,
    );
    expect(await screen.findByText("Volume vs 20-day average")).toBeTruthy();
    expect(await screen.findByText("Move vs 1y daily volatility")).toBeTruthy();
    expect((await screen.findAllByText(/heuristic:/)).length).toBeGreaterThanOrEqual(2);
  });

  it("is honest about AI unavailability instead of fabricating narrative", async () => {
    render(
      <MemoryRouter>
        <WhyDidThisMove ticker="AAPL" />
      </MemoryRouter>,
    );
    const ai = await screen.findByText(/AI interpretation unavailable/);
    expect(ai.textContent).toMatch(/No inference endpoint is configured/);
  });

  it("shows data confidence as an explicit number and freshness timestamp", async () => {
    render(
      <MemoryRouter>
        <WhyDidThisMove ticker="AAPL" />
      </MemoryRouter>,
    );
    expect(await screen.findByText("DATA CONFIDENCE", { exact: false })).toBeTruthy();
    expect(await screen.findByText(/LAST UPDATED/)).toBeTruthy();
  });
});
