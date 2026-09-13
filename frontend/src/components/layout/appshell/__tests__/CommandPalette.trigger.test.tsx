/**
 * CommandPalette × AppShell integration (R2):
 * - the palette opens from UI triggers via the event bus
 * - recent securities appear in the empty state (absorbed from CommandBar)
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CommandPalette } from "../../CommandPalette";
import { openCommandPalette } from "../paletteBus";
import { useSettingsStore } from "../../../../store/settingsStore";

vi.mock("../../../../api/client", () => ({
  searchSymbols: vi.fn().mockResolvedValue([]),
  fetchCryptoSearch: vi.fn().mockResolvedValue([]),
}));

function renderPalette() {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }} initialEntries={["/home"]}>
      <CommandPalette />
    </MemoryRouter>,
  );
}

describe("CommandPalette trigger bus + recents (R2)", () => {
  beforeEach(() => {
    window.localStorage.clear();
    useSettingsStore.setState({
      recentSecurities: [
        {
          symbol: "RELIANCE",
          name: "Reliance Industries",
          assetClass: "equity",
          market: "IN",
          visitedAt: Date.now(),
        },
        {
          symbol: "BTCUSDT",
          name: "Bitcoin Perp",
          assetClass: "crypto",
          market: "US",
          visitedAt: Date.now() - 1000,
        },
      ],
    });
  });

  it("opens when a UI element dispatches the palette event", async () => {
    renderPalette();
    expect(screen.queryByRole("dialog")).toBeNull();
    openCommandPalette();
    await waitFor(() => expect(screen.getByRole("dialog")).toBeTruthy());
  });

  it("shows recent securities in the empty state", async () => {
    renderPalette();
    openCommandPalette();
    await waitFor(() => expect(screen.getByRole("dialog")).toBeTruthy());
    // The recent-securities rows carry the security name + market description.
    expect(await screen.findByText("Reliance Industries (IN)")).toBeTruthy();
    expect(screen.getByText(/Bitcoin Perp/)).toBeTruthy();
  });

  it("restores the instrument selection from a recent security", async () => {
    renderPalette();
    openCommandPalette();
    const description = await screen.findByText("Reliance Industries (IN)");
    const option = description.closest('[role="option"]') ?? description;
    await userEvent.click(option as HTMLElement);
    // Palette closes after execution
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });
});
