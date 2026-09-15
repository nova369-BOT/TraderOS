/**
 * R4 context model tests — the selections that must never reset:
 * instrument, active account, last workspace.
 */

import { act, render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ContextSync } from "../components/ContextSync";
import { CONTEXT_STORAGE_KEY, useContextStore } from "../store/contextStore";
import { useStockStore } from "../store/stockStore";
import { useTerminalStore } from "../terminal/store/terminalStore";

import { RootRedirect } from "../components/RootRedirect";

// RootRedirect pulls AuthContext; mock it as authenticated
vi.mock("../contexts/AuthContext", () => ({
  useAuth: () => ({
    isAuthenticated: true,
    isInitializing: false,
  }),
}));

function renderRootRedirect(_authenticated: boolean) {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }} initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/terminal" element={<div data-testid="terminal">TERMINAL</div>} />
        <Route path="/markets/stocks" element={<div data-testid="markets">MARKETS</div>} />
        <Route path="/labs/model-lab" element={<div data-testid="labs">LABS</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("contextStore (R4)", () => {
  beforeEach(() => {
    useContextStore.setState({ instrument: null, accountPortfolioId: null, lastPath: null });
    localStorage.clear();
  });

  it("normalizes instruments on write", () => {
    act(() => useContextStore.getState().setInstrument(" rel "));
    expect(useContextStore.getState().instrument).toBe("REL");
    act(() => useContextStore.getState().setInstrument(""));
    expect(useContextStore.getState().instrument).toBeNull();
  });

  it("persists the context of record under ot:ctx:v1", async () => {
    act(() => {
      useContextStore.getState().setInstrument("TCS");
      useContextStore.getState().setAccountPortfolioId("pf-42");
      useContextStore.getState().setLastPath("/markets/stocks");
    });
    await Promise.resolve();
    const raw = localStorage.getItem(CONTEXT_STORAGE_KEY);
    expect(raw).toBeTruthy();
    const persisted = JSON.parse(raw!) as { state: Record<string, unknown> };
    expect(persisted.state).toMatchObject({
      instrument: "TCS",
      accountPortfolioId: "pf-42",
      lastPath: "/markets/stocks",
    });
  });

  it("account ids: empty strings become null (no phantom accounts)", () => {
    act(() => useContextStore.getState().setAccountPortfolioId(""));
    expect(useContextStore.getState().accountPortfolioId).toBeNull();
  });
});

describe("ContextSync (R4)", () => {
  beforeEach(() => {
    localStorage.clear();
    useContextStore.setState({ instrument: null, accountPortfolioId: null, lastPath: null });
    useStockStore.setState({ ticker: "RELIANCE" });
    useTerminalStore.setState({ selectedPortfolioId: null });
  });

  it("hydrates the runtime instrument from the persisted context on mount", () => {
    useContextStore.setState({ instrument: "TCS" });
    render(<ContextSync />);
    expect(useStockStore.getState().ticker).toBe("TCS");
  });

  it("mirrors every runtime instrument selection into the context of record", () => {
    render(<ContextSync />);
    act(() => useStockStore.getState().setTicker("infy"));
    expect(useContextStore.getState().instrument).toBe("INFY");
  });

  it("does not clobber the context when the runtime ticker is unchanged", () => {
    useContextStore.setState({ instrument: "TCS" });
    useStockStore.setState({ ticker: "TCS" });
    render(<ContextSync />);
    expect(useContextStore.getState().instrument).toBe("TCS");
  });

  it("bridges legacy terminal-store account selections into the context", () => {
    render(<ContextSync />);
    act(() => useTerminalStore.getState().selectPortfolio("pf-legacy"));
    expect(useContextStore.getState().accountPortfolioId).toBe("pf-legacy");
  });
});

describe("RootRedirect workspace restore (R4)", () => {
  beforeEach(() => {
    useContextStore.setState({ instrument: null, accountPortfolioId: null, lastPath: null });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("restores the last workspace when one is remembered", () => {
    useContextStore.setState({ lastPath: "/markets/stocks" });
    renderRootRedirect(true);
    expect(document.querySelector('[data-testid="markets"]')).toBeTruthy();
  });

  it("defaults to /terminal when nothing is remembered", () => {
    renderRootRedirect(true);
    expect(document.querySelector('[data-testid="terminal"]')).toBeTruthy();
  });

  it("never restores auth pages or external paths", () => {
    for (const bad of ["/login", "/register", "/forgot-access", "/", "https://evil.example"]) {
      useContextStore.setState({ lastPath: bad });
      const view = renderRootRedirect(true);
      expect(document.querySelector('[data-testid="terminal"]'), `lastPath=${bad}`).toBeTruthy();
      view.unmount();
    }
  });
});
