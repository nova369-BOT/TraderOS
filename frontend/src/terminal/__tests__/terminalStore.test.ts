import { beforeEach, describe, expect, it } from "vitest";

import { useTerminalStore, TERMINAL_STORAGE_KEY } from "../store/terminalStore";

describe("terminalStore (§33 state ownership)", () => {
  beforeEach(() => {
    useTerminalStore.setState({
      selectedPortfolioId: null,
      favorites: [],
      marketDataTab: "chart",
      ordersTab: "live",
      accountTab: "balances",
      selectedOrderId: null,
      selectedPositionId: null,
    });
    localStorage.clear();
  });

  it("selects the account context", () => {
    useTerminalStore.getState().selectPortfolio("pf-1");
    expect(useTerminalStore.getState().selectedPortfolioId).toBe("pf-1");
    useTerminalStore.getState().selectPortfolio(null);
    expect(useTerminalStore.getState().selectedPortfolioId).toBeNull();
  });

  it("toggles favorites on and off with normalization", () => {
    const store = useTerminalStore.getState();
    store.toggleFavorite(" reliance ");
    expect(useTerminalStore.getState().favorites).toEqual(["RELIANCE"]);
    useTerminalStore.getState().toggleFavorite("RELIANCE");
    expect(useTerminalStore.getState().favorites).toEqual([]);
  });

  it("owns the active tab per panel", () => {
    const store = useTerminalStore.getState();
    store.setMarketDataTab("news");
    store.setOrdersTab("history");
    store.setAccountTab("positions");
    const next = useTerminalStore.getState();
    expect(next.marketDataTab).toBe("news");
    expect(next.ordersTab).toBe("history");
    expect(next.accountTab).toBe("positions");
  });

  it("owns session-only row selections", () => {
    useTerminalStore.getState().setSelectedOrderId("o-1");
    useTerminalStore.getState().setSelectedPositionId("p-1");
    expect(useTerminalStore.getState().selectedOrderId).toBe("o-1");
    expect(useTerminalStore.getState().selectedPositionId).toBe("p-1");
  });

  it("persists context and tabs (not row selections) to localStorage", async () => {
    useTerminalStore.getState().selectPortfolio("pf-9");
    useTerminalStore.getState().toggleFavorite("TCS");
    useTerminalStore.getState().setMarketDataTab("holdings");
    useTerminalStore.getState().setSelectedOrderId("session-only");

    // zustand persist writes asynchronously — flush microtasks
    await Promise.resolve();

    const raw = localStorage.getItem(TERMINAL_STORAGE_KEY);
    expect(raw).toBeTruthy();
    const persisted = JSON.parse(raw!) as Record<string, unknown>;
    const state = persisted.state as Record<string, unknown>;
    expect(state.selectedPortfolioId).toBe("pf-9");
    expect(state.favorites).toEqual(["TCS"]);
    expect(state.marketDataTab).toBe("holdings");
    expect(state.selectedOrderId).toBeUndefined();
  });
});
