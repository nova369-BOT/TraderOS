import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { WatchlistPanel } from "../components/WatchlistPanel";
import { useTerminalStore } from "../store/terminalStore";

const watchlistsMocks = vi.hoisted(() => ({
  fetchWatchlists: vi.fn(),
  addWatchlistSymbols: vi.fn(),
}));

vi.mock("../../api/watchlist", () => watchlistsMocks);
vi.mock("../../api/marketData", () => ({ searchSymbols: vi.fn() }));
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

function renderPanel(props?: Parameters<typeof WatchlistPanel>[0]) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <WatchlistPanel {...props} />
    </QueryClientProvider>,
  );
}

describe("WatchlistPanel (§14–15)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useTerminalStore.setState({ favorites: [] });
  });

  it("renders dense rows for watchlist instruments with count", async () => {
    watchlistsMocks.fetchWatchlists.mockResolvedValue([
      { id: "wl-1", name: "Core", symbols: ["RELIANCE", "TCS", "HDFCBANK"] },
    ]);
    renderPanel();
    expect(await screen.findByText("3")).toBeTruthy();
    expect(screen.getByTestId("watchlist-row-RELIANCE")).toBeTruthy();
    expect(screen.getByTestId("watchlist-row-TCS")).toBeTruthy();
    expect(screen.getByText("WATCHLIST")).toBeTruthy();
  });

  it("selects an instrument into the terminal context on row click", async () => {
    watchlistsMocks.fetchWatchlists.mockResolvedValue([
      { id: "wl-1", name: "Core", symbols: ["RELIANCE"] },
    ]);
    const onSelect = vi.fn();
    renderPanel({ onSelectInstrument: onSelect });
    await screen.findByTestId("watchlist-row-RELIANCE");
    screen.getByTestId("watchlist-row-RELIANCE").click();
    expect(onSelect).toHaveBeenCalledWith("RELIANCE");
  });

  it("pins favorites above results", async () => {
    watchlistsMocks.fetchWatchlists.mockResolvedValue([
      { id: "wl-1", name: "Core", symbols: ["RELIANCE", "TCS", "INFY"] },
    ]);
    useTerminalStore.setState({ favorites: ["TCS"] });
    renderPanel();
    await screen.findByTestId("watchlist-row-TCS");
    const favoritesLabelIndex = screen.getByText("Favorites").compareDocumentPosition(
      screen.getByText("Results"),
    );
    // Favorites header must precede the Results header
    expect(favoritesLabelIndex & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("shows an honest error state with retry when the watchlist is unavailable", async () => {
    watchlistsMocks.fetchWatchlists.mockRejectedValue(new Error("network down"));
    renderPanel();
    expect(await screen.findByText("Watchlist unavailable", {}, { timeout: 4000 })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Retry" })).toBeTruthy();
  });

  it("shows an explicit empty state", async () => {
    watchlistsMocks.fetchWatchlists.mockResolvedValue([{ id: "wl-1", name: "Core", symbols: [] }]);
    renderPanel();
    expect(await screen.findByText(/No instruments/i)).toBeTruthy();
  });
});
