import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";

import { StatusBar } from "../components/terminal/StatusBar";

type MarketStatusShape = {
  data?: { fallbackEnabled?: boolean; error?: string };
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
};

function makeStatusShape(overrides: Partial<MarketStatusShape> = {}): MarketStatusShape {
  return {
    data: undefined,
    isLoading: false,
    isFetching: false,
    error: null,
    ...overrides,
  };
}

vi.mock("../hooks/useStocks", () => ({
  useMarketStatus: () => currentStatus,
}));

const currentStatus: MarketStatusShape = makeStatusShape();

vi.mock("../store/settingsStore", () => ({
  useSettingsStore: (selector: (s: { selectedMarket: string; displayCurrency: string }) => string) =>
    selector({ selectedMarket: "NSE", displayCurrency: "INR" }),
}));

vi.mock("../store/stockStore", () => ({
  useStockStore: (selector: (s: { ticker: string; loading: boolean; error: string | null }) => unknown) =>
    selector({ ticker: "RELIANCE", loading: false, error: null }),
}));

function renderStatusBar() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <StatusBar />
    </QueryClientProvider>,
  );
}

describe("StatusBar data-provenance badge (B3)", () => {
  it("shows LIVE when the status payload is healthy", () => {
    Object.assign(currentStatus, makeStatusShape({ data: { fallbackEnabled: false } }));
    renderStatusBar();
    expect(screen.getByText("LIVE")).toBeTruthy();
  });

  it("shows MOCK when fallback data is enabled", () => {
    Object.assign(currentStatus, makeStatusShape({ data: { fallbackEnabled: true } }));
    renderStatusBar();
    expect(screen.getByText("MOCK")).toBeTruthy();
  });

  it("shows MOCK when the status payload carries an error", () => {
    Object.assign(currentStatus, makeStatusShape({ data: { error: "provider down" } }));
    renderStatusBar();
    expect(screen.getByText("MOCK")).toBeTruthy();
  });

  it("shows MOCK when the status query itself errored (no payload)", () => {
    Object.assign(currentStatus, makeStatusShape({ data: undefined, error: new Error("network") }));
    renderStatusBar();
    expect(screen.getByText("MOCK")).toBeTruthy();
  });
});
