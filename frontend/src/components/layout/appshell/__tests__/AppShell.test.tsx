/**
 * AppShell composition tests (R2).
 *
 * Verifies the consolidated chrome: one global bar, one sidebar tree, one
 * persistent context bar, one status bar — and that the legacy chrome
 * (IconRail, TopBar, CommandBar) is no longer mounted anywhere in the shell.
 */

import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it } from "vitest";

import { AppShell } from "../AppShell";
import { TerminalShell, useTerminalShellWorkspace } from "../../TerminalShell";
import { useUiStore } from "../../../../store/uiStore";

vi.mock("../../TickerTape", () => ({
  TickerTape: () => <div data-testid="ticker-tape-mock" aria-label="Ticker tape" />,
}));
vi.mock("../../../notifications/NotificationBell", () => ({
  NotificationBell: () => <button type="button" aria-label="Notifications (mock)" />,
}));
vi.mock("../UserAccountPanel", () => ({
  UserAccountPanel: () => <div data-testid="user-account-panel-mock" />,
}));
vi.mock("../../HudOverlay", () => ({ HudOverlay: () => null }));
vi.mock("../../InstallPromptBanner", () => ({ InstallPromptBanner: () => null }));
vi.mock("../../MobileBottomNav", () => ({ MobileBottomNav: () => null }));
vi.mock("../../../trading/HotKeyPanelFloat", () => ({ HotKeyPanelFloat: () => null }));
vi.mock("../../../common/ShortcutOverlay", () => ({ ShortcutOverlay: () => null }));
vi.mock("../../CommandPalette", () => ({
  CommandPalette: () => <div data-testid="command-palette-mock" />,
}));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

function renderShell(ui: React.ReactElement, route = "/terminal") {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }} initialEntries={[route]}>
        {ui}
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("AppShell composition (R2)", () => {
  beforeEach(() => {
    useUiStore.setState({
      density: "normal",
      sidebarCollapsed: false,
      collapsedNavCategories: {},
      tickerTapeVisible: true,
    });
  });

  it("mounts the consolidated chrome around page content", () => {
    renderShell(
      <AppShell
        preset="trader"
        onPresetChange={() => {}}
        showWorkspaceControls
        rightRailEnabled={false}
        rightRailOpen={false}
        onToggleRightRail={() => {}}
      >
        <div data-testid="page-content">PAGE</div>
      </AppShell>,
    );

    expect(screen.getByRole("banner")).toBeTruthy(); // global bar
    expect(screen.getByLabelText("Primary navigation")).toBeTruthy(); // sidebar tree
    expect(screen.getByRole("region", { name: "Global context" })).toBeTruthy(); // context bar
    expect(screen.getByTestId("page-content").textContent).toBe("PAGE");
    expect(screen.getByTestId("ticker-tape-mock")).toBeTruthy();
    expect(screen.getByTestId("command-palette-mock")).toBeTruthy();
  });

  it("legacy chrome is NOT mounted (IconRail / CommandBar gone)", () => {
    renderShell(
      <AppShell
        preset="trader"
        onPresetChange={() => {}}
        showWorkspaceControls
        rightRailEnabled={false}
        rightRailOpen={false}
        onToggleRightRail={() => {}}
      >
        <div />
      </AppShell>,
    );
    expect(screen.queryByLabelText("Primary icon rail")).toBeNull();
    expect(screen.queryByLabelText("Command bar")).toBeNull();
    expect(screen.queryByPlaceholderText(/Type ticker, command, or search/i)).toBeNull();
  });

  it("ticker tape honors the visibility preference", async () => {
    renderShell(
      <AppShell
        preset="trader"
        onPresetChange={() => {}}
        showWorkspaceControls
        rightRailEnabled={false}
        rightRailOpen={false}
        onToggleRightRail={() => {}}
      >
        <div />
      </AppShell>,
    );
    expect(screen.getByTestId("ticker-tape-mock")).toBeTruthy();
    act(() => useUiStore.getState().setTickerTapeVisible(false));
    expect(screen.queryByTestId("ticker-tape-mock")).toBeNull();
  });

  it("Ctrl+B collapses and expands the sidebar", async () => {
    renderShell(
      <AppShell
        preset="trader"
        onPresetChange={() => {}}
        showWorkspaceControls
        rightRailEnabled={false}
        rightRailOpen={false}
        onToggleRightRail={() => {}}
      >
        <div />
      </AppShell>,
    );
    expect(screen.getByLabelText("Filter navigation")).toBeTruthy();
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "b", ctrlKey: true }));
    expect(useUiStore.getState().sidebarCollapsed).toBe(true);
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "b", ctrlKey: true }));
    expect(useUiStore.getState().sidebarCollapsed).toBe(false);
  });

  it("context rail renders when enabled and open", () => {
    renderShell(
      <AppShell
        preset="trader"
        onPresetChange={() => {}}
        showWorkspaceControls
        rightRailEnabled
        rightRailOpen
        onToggleRightRail={() => {}}
        rightRailContent={<aside data-testid="context-rail-mock">RAIL</aside>}
      >
        <div />
      </AppShell>,
    );
    expect(screen.getByTestId("context-rail-mock")).toBeTruthy();
  });
});

describe("TerminalShell compatibility wrapper (R2)", () => {
  it("still exposes the workspace context and broadcasts preset changes", async () => {
    let lastContext: ReturnType<typeof useTerminalShellWorkspace> | null = null;
    function Probe() {
      lastContext = useTerminalShellWorkspace();
      return null;
    }

    const events: string[] = [];
    const onPreset = (event: Event) => events.push((event as CustomEvent).detail);
    window.addEventListener("ot:preset-change", onPreset);

    renderShell(
      <TerminalShell>
        <Probe />
      </TerminalShell>,
    );

    expect(lastContext).toMatchObject({ preset: "trader", rightRailOpen: false });
    expect(screen.getByRole("banner")).toBeTruthy(); // AppShell chrome present

    // preset selection through the global bar dropdown
    await userEvent.selectOptions(screen.getByLabelText("Workspace preset"), "risk");
    expect(lastContext).toMatchObject({ preset: "risk" });
    expect(events).toContain("risk");

    window.removeEventListener("ot:preset-change", onPreset);
  });

  it("accepts the legacy props without breaking (API compatibility)", () => {
    renderShell(
      <TerminalShell
        contentClassName="pb-16 md:pb-0"
        hideTickerLoader
        statusBarTickerOverride="TERMINAL"
        showWorkspaceControls={false}
      >
        <div data-testid="legacy-child">OK</div>
      </TerminalShell>,
    );
    expect(screen.getByTestId("legacy-child").textContent).toBe("OK");
    expect(screen.queryByLabelText("Workspace preset")).toBeNull();
  });
});
