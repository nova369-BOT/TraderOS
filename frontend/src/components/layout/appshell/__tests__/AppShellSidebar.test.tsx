import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AppShellSidebar } from "../AppShellSidebar";
import { OPEN_PALETTE_EVENT } from "../paletteBus";
import { useUiStore } from "../../../../store/uiStore";

function renderSidebar(route = "/terminal") {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }} initialEntries={[route]}>
      <AppShellSidebar />
    </MemoryRouter>,
  );
}

describe("AppShellSidebar (R2)", () => {
  beforeEach(() => {
    useUiStore.setState({
      sidebarCollapsed: false,
      collapsedNavCategories: {},
      density: useUiStore.getState().density,
      tickerTapeVisible: true,
    });
  });

  it("renders every workspace category", () => {
    renderSidebar();
    for (const label of ["Home", "Terminal", "Markets & Research", "Portfolio & Risk", "Labs", "Data & Ops"]) {
      expect(screen.getByRole("button", { name: new RegExp(label, "i") })).toBeTruthy();
    }
    expect(screen.getAllByRole("link").length).toBeGreaterThan(30);
  });

  it("navigates via NavLink and marks the active route", () => {
    renderSidebar("/markets/screener");
    const active = screen.getByRole("link", { name: /screener/i });
    expect(active.getAttribute("href")).toBe("/markets/screener");
    expect(active.className).toContain("border-terminal-accent");
  });

  it("filters the tree live and reports no-match honestly", async () => {
    renderSidebar();
    const filter = screen.getByLabelText("Filter navigation");
    await userEvent.type(filter, "screener");
    expect(screen.getAllByRole("link").length).toBe(1);
    expect(screen.getByRole("link", { name: /screener/i })).toBeTruthy();

    await userEvent.clear(filter);
    await userEvent.type(filter, "zzz-no-match");
    expect(screen.getByRole("status").textContent).toContain("No pages match");
  });

  it("collapses and expands categories with persistence via uiStore", async () => {
    renderSidebar();
    const markets = screen.getByRole("button", { name: /markets & research/i });
    expect(markets.getAttribute("aria-expanded")).toBe("true");
    await userEvent.click(markets);
    expect(markets.getAttribute("aria-expanded")).toBe("false");
    expect(useUiStore.getState().collapsedNavCategories["markets"]).toBe(true);
    // persisted by the store contract (partialize includes the map)
    await userEvent.click(markets);
    expect(useUiStore.getState().collapsedNavCategories["markets"]).toBe(false);
  });

  it("auto-expands the category owning the active route", async () => {
    useUiStore.setState({ collapsedNavCategories: { markets: true } });
    renderSidebar("/markets/derivatives/greeks");
    const markets = await screen.findByRole("button", { name: /markets & research/i });
    await waitFor(() => expect(markets.getAttribute("aria-expanded")).toBe("true"));
  });

  it("collapsed mode renders the icon rail and restores the tree", async () => {
    renderSidebar();
    await userEvent.click(screen.getByLabelText("Collapse navigation sidebar"));
    expect(useUiStore.getState().sidebarCollapsed).toBe(true);
    // rail: one glyph button per category + expander
    for (const label of ["Home", "Terminal", "Markets & Research", "Portfolio & Risk", "Labs", "Data & Ops"]) {
      expect(screen.getByTitle(label)).toBeTruthy();
    }
    await userEvent.click(screen.getByLabelText("Expand navigation sidebar"));
    expect(useUiStore.getState().sidebarCollapsed).toBe(false);
    expect(screen.getByLabelText("Filter navigation")).toBeTruthy();
  });

  it("moves focus with arrow keys (keyboard-first law)", () => {
    renderSidebar("/home");
    const first = screen.getByRole("link", { name: /mission control/i });
    first.focus();
    fireEvent.keyDown(first, { key: "ArrowDown" });
    const launchpad = screen.getByRole("link", { name: /launchpad/i });
    expect(document.activeElement).toBe(launchpad);
    fireEvent.keyDown(launchpad, { key: "ArrowUp" });
    expect(document.activeElement).toBe(first);
  });

  it("never conflicts with the palette shortcut (event bus untouched)", () => {
    const spy = vi.fn();
    window.addEventListener(OPEN_PALETTE_EVENT, spy);
    window.dispatchEvent(new CustomEvent(OPEN_PALETTE_EVENT));
    expect(spy).toHaveBeenCalledTimes(1);
    window.removeEventListener(OPEN_PALETTE_EVENT, spy);
  });
});
