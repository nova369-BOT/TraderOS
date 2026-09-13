import { act, render } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { DensityRuntime } from "../DensityRuntime";
import { useDensity } from "../useDensity";
import { useUiStore, UI_STORAGE_KEY } from "../../store/uiStore";

describe("density system (R1)", () => {
  beforeEach(() => {
    useUiStore.setState({ density: "normal" });
    localStorage.clear();
    delete document.documentElement.dataset.density;
  });

  it("toggles between normal and compact", () => {
    expect(useUiStore.getState().density).toBe("normal");
    act(() => useUiStore.getState().toggleDensity());
    expect(useUiStore.getState().density).toBe("compact");
    act(() => useUiStore.getState().toggleDensity());
    expect(useUiStore.getState().density).toBe("normal");
  });

  it("persists the density preference", async () => {
    act(() => useUiStore.getState().setDensity("compact"));
    await Promise.resolve();
    const raw = localStorage.getItem(UI_STORAGE_KEY);
    expect(raw).toBeTruthy();
    expect((JSON.parse(raw!) as { state: { density: string } }).state.density).toBe("compact");
  });

  it("DensityRuntime applies the mode to the document root", () => {
    render(<DensityRuntime />);
    expect(document.documentElement.dataset.density).toBe("normal");
    act(() => useUiStore.getState().setDensity("compact"));
    expect(document.documentElement.dataset.density).toBe("compact");
  });

  it("useDensity exposes matching geometry per mode", () => {
    let last: ReturnType<typeof useDensity> | null = null;
    function Probe() {
      last = useDensity();
      return null;
    }
    render(<Probe />);
    expect(last).toMatchObject({ density: "normal", rowHeight: 26, padY: 4 });
    act(() => useUiStore.getState().setDensity("compact"));
    expect(last).toMatchObject({ density: "compact", rowHeight: 22, padY: 2, rowClass: "ot-row-compact" });
  });
});
