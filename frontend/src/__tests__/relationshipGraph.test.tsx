import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

// --- jsdom mocks required by reactflow -------------------------------------
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(globalThis as Record<string, unknown>).ResizeObserver = ResizeObserverMock;

class DOMMatrixReadOnlyMock {
  m22: number;
  constructor(transform?: string) {
    const scale = transform?.match(/scale\(([\d.]+)\)/)?.[1];
    this.m22 = scale ? Number(scale) : 1;
  }
}
(globalThis as Record<string, unknown>).DOMMatrixReadOnly = DOMMatrixReadOnlyMock;

Object.defineProperties(HTMLElement.prototype, {
  offsetHeight: { configurable: true, value: 640 },
  offsetWidth: { configurable: true, value: 960 },
});
(globalThis.SVGElement.prototype as unknown as { getBBox: () => object }).getBBox = () => ({
  x: 0, y: 0, width: 0, height: 0,
});

import { RelationshipGraph } from "../components/graph/RelationshipGraph";

vi.mock("../api/client", () => ({
  fetchStock: vi.fn().mockResolvedValue({
    ticker: "AAPL",
    company_name: "Apple Inc.",
    sector: "Technology",
    exchange: "NASDAQ",
    indices: ["NASDAQ 100"],
    classification: { has_options: true },
  }),
}));

vi.mock("../api/equity", () => ({
  fetchPeers: vi.fn().mockResolvedValue({ ticker: "AAPL", universe: "US Tech Mega", metrics: [] }),
}));

vi.mock("../api/news", () => ({
  fetchNewsByTicker: vi.fn().mockResolvedValue([
    { id: "1", title: "t", url: "u", published_at: "2026-09-10T00:00:00Z", source: "s", tickers: ["AAPL", "MSFT", "MSFT"] },
    { id: "2", title: "t2", url: "u", published_at: "2026-09-10T00:00:00Z", source: "s", tickers: ["AAPL", "TSM"] },
  ]),
}));

vi.mock("../api/portfolio", () => ({
  fetchPortfolios: vi.fn().mockResolvedValue([{ id: "p1", name: "Core", description: "" }]),
  fetchPortfolioHoldings: vi.fn().mockResolvedValue([
    { id: "h1", symbol: "AAPL", shares: 10 },
    { id: "h2", symbol: "MSFT", shares: 5 },
  ]),
}));

describe("RelationshipGraph", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders the center instrument and observed relationship edges", async () => {
    render(
      <MemoryRouter>
        <RelationshipGraph ticker="AAPL" />
      </MemoryRouter>,
    );
    expect((await screen.findAllByText("AAPL")).length).toBeGreaterThanOrEqual(1);
    // sector edge (kind=sector) and index membership
    expect(await screen.findByText("◆ Technology")).toBeTruthy();
    expect(await screen.findByText("NASDAQ 100")).toBeTruthy();
    // peer universe from peers endpoint
    expect(await screen.findByText("PEERS · US Tech Mega")).toBeTruthy();
    // co-mentioned ticker from observed news AND co-held via portfolio (>= 2 nodes)
    expect((await screen.findAllByText("MSFT")).length).toBeGreaterThanOrEqual(2);
    // portfolio exposure from observed holdings
    expect(await screen.findByText("◈ Core")).toBeTruthy();
    // F&O availability
    expect(await screen.findByText("F&O")).toBeTruthy();
  });

  it("shows the observed-only legend and honest empty states", async () => {
    render(
      <MemoryRouter>
        <RelationshipGraph ticker="AAPL" />
      </MemoryRouter>,
    );
    expect(await screen.findByText(/observed edges only/)).toBeTruthy();
  });
});
