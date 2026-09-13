import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AppShellBar } from "../AppShellBar";
import { OPEN_PALETTE_EVENT } from "../paletteBus";
import { useUiStore } from "../../../../store/uiStore";
import type { WorkspacePreset } from "../../TerminalShell";

vi.mock("../../../notifications/NotificationBell", () => ({
  NotificationBell: () => <button type="button" aria-label="Notifications (mock)" />,
}));
vi.mock("../UserAccountPanel", () => ({
  UserAccountPanel: () => <div data-testid="user-account-panel-mock" />,
}));

function renderBar(props: Partial<Parameters<typeof AppShellBar>[0]> = {}) {
  const onPresetChange = vi.fn();
  const utils = render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppShellBar
        preset="trader"
        onPresetChange={onPresetChange}
        showWorkspaceControls
        rightRailEnabled={false}
        rightRailOpen={false}
        onToggleRightRail={() => {}}
        {...props}
      />
    </MemoryRouter>,
  );
  return { ...utils, onPresetChange };
}

describe("AppShellBar (R2 global bar)", () => {
  beforeEach(() => {
    useUiStore.setState({
      density: "normal",
      sidebarCollapsed: false,
      collapsedNavCategories: {},
      tickerTapeVisible: true,
    });
  });

  it("opens the command palette from the search trigger (event bus)", async () => {
    const spy = vi.fn();
    window.addEventListener(OPEN_PALETTE_EVENT, spy);
    renderBar();
    await userEvent.click(screen.getByRole("button", { name: "Search markets, commands and pages" }));
    expect(spy).toHaveBeenCalledTimes(1);
    window.removeEventListener(OPEN_PALETTE_EVENT, spy);
  });

  it("toggles global density and reflects the mode", async () => {
    renderBar();
    const density = screen.getByRole("button", { name: /density: normal/i });
    expect(density.textContent).toContain("Normal");
    await userEvent.click(density);
    expect(useUiStore.getState().density).toBe("compact");
    expect(screen.getByRole("button", { name: /density: compact/i }).textContent).toContain("Compact");
  });

  it("changes the workspace preset through the selector", async () => {
    const { onPresetChange } = renderBar();
    const preset = screen.getByLabelText("Workspace preset");
    await userEvent.selectOptions(preset, "quant");
    expect(onPresetChange).toHaveBeenCalledWith("quant");
  });

  it("hides the preset selector when workspace controls are off", () => {
    renderBar({ showWorkspaceControls: false });
    expect(screen.queryByLabelText("Workspace preset")).toBeNull();
  });

  it("view popover exposes theme, HUD and ticker tape controls", async () => {
    renderBar();
    await userEvent.click(screen.getByRole("button", { name: "View settings" }));
    expect(screen.getByLabelText("Theme")).toBeTruthy();
    expect(screen.getByRole("button", { name: /HUD overlay: Off/i })).toBeTruthy();

    await userEvent.click(screen.getByRole("button", { name: /Ticker tape: Visible/i }));
    expect(useUiStore.getState().tickerTapeVisible).toBe(false);

    // Escape closes the popover
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByLabelText("Theme")).toBeNull();
  });

  it("renders brand, account and notifications", () => {
    renderBar();
    expect(screen.getByRole("link", { name: "ARQOS home" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Notifications (mock)" })).toBeTruthy();
  });

  it("preset type contract: accepts all five workspace presets", () => {
    const presets: WorkspacePreset[] = ["trader", "quant", "pm", "risk", "ops"];
    expect(presets).toHaveLength(5);
  });
});
