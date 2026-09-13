import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { DataState } from "../components/DataState";
import { MetricValue } from "../components/MetricValue";
import { TerminalSkeleton } from "../components/TerminalSkeleton";
import { DENSITY, SPACING, TYPE_SCALE, Z_INDEX, DATA_STATES } from "../tokens";

describe("design tokens (R1)", () => {
  it("keeps spacing on the 2px base grid", () => {
    for (const value of Object.values(SPACING)) {
      expect(value % 2).toBe(0);
    }
  });

  it("keeps the type scale monotonic from micro to display", () => {
    const sizes = Object.values(TYPE_SCALE);
    const sorted = [...sizes].sort((a, b) => a - b);
    expect(sizes).toEqual(sorted);
  });

  it("defines both density modes with sane geometry", () => {
    expect(DENSITY.normal.rowHeight).toBeGreaterThan(DENSITY.compact.rowHeight);
    expect(DENSITY.compact.padY).toBeLessThan(DENSITY.normal.padY);
  });

  it("keeps stacking layers strictly ordered", () => {
    const layers = Object.values(Z_INDEX);
    const sorted = [...layers].sort((a, b) => a - b);
    expect(layers).toEqual(sorted);
  });

  it("enumerates all five mandated data states", () => {
    expect([...DATA_STATES]).toEqual(["loading", "empty", "error", "offline", "ready"]);
  });
});

describe("DataState (§46 unified states)", () => {
  it("renders children when ready", () => {
    render(<DataState status="ready">REAL CONTENT</DataState>);
    expect(screen.getByText("REAL CONTENT")).toBeTruthy();
  });

  it("renders a labeled skeleton when loading", () => {
    render(<DataState status="loading" loadingLabel="Loading watchlist" />);
    expect(screen.getByRole("status", { name: "Loading watchlist" })).toBeTruthy();
  });

  it("renders the empty state with title, hint and action", () => {
    render(
      <DataState
        status="empty"
        emptyTitle="No instruments"
        emptyHint="Add instruments via search."
        emptyAction={<button type="button">Browse</button>}
      />,
    );
    expect(screen.getByTestId("data-state-empty").textContent).toContain("No instruments");
    expect(screen.getByText("Add instruments via search.")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Browse" })).toBeTruthy();
  });

  it("renders the error state with the message and a working retry", async () => {
    const onRetry = vi.fn();
    render(
      <DataState
        status="error"
        error={new Error("provider unreachable")}
        onRetry={onRetry}
      />,
    );
    expect(screen.getByTestId("data-state-error").textContent).toContain("provider unreachable");
    await userEvent.click(screen.getByRole("button", { name: "Retry" }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders the offline state with a hint and retry", async () => {
    const onRetry = vi.fn();
    render(<DataState status="offline" onRetry={onRetry} offlineHint="Feed disconnected." />);
    expect(screen.getByTestId("data-state-offline").textContent).toContain("Offline");
    expect(screen.getByText("Feed disconnected.")).toBeTruthy();
    await userEvent.click(screen.getByRole("button", { name: "Retry" }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("shows no retry button when none is provided", () => {
    render(<DataState status="error" error="boom" />);
    expect(screen.queryByRole("button", { name: "Retry" })).toBeNull();
  });
});

describe("TerminalSkeleton", () => {
  it("renders the requested number of lines with an accessible label", () => {
    render(<TerminalSkeleton lines={4} label="Loading orders" />);
    expect(screen.getByRole("status", { name: "Loading orders" })).toBeTruthy();
    expect(document.querySelectorAll(".ot-skeleton-line")).toHaveLength(4);
  });
});

describe("MetricValue (§39 numeric presentation)", () => {
  it("renders label and formatted value with tabular numerals", () => {
    render(<MetricValue label="Portfolio value" value={250120} />);
    const metric = screen.getByTestId("metric-value");
    expect(metric.textContent).toContain("Portfolio value");
    expect(metric.textContent).toContain("250,120");
    expect(metric.querySelector(".ot-tabular")).toBeTruthy();
    expect(metric.querySelector(".uppercase")).toBeTruthy(); // label renders uppercase
  });

  it("renders an honest dash for missing values", () => {
    render(<MetricValue label="Cash" value={null} />);
    expect(screen.getByTestId("metric-value").textContent).toContain("--");
  });

  it("colors values semantically via valueTone", () => {
    const { rerender } = render(<MetricValue label="P&L" value="+412.55" valueTone="pos" />);
    expect(screen.getByText("+412.55").className).toContain("text-terminal-pos");
    rerender(<MetricValue label="P&L" value="-120.10" valueTone="neg" />);
    expect(screen.getByText("-120.10").className).toContain("text-terminal-neg");
  });

  it("renders a signed delta chip with suffix", () => {
    render(<MetricValue label="Day" value="2,951.40" delta={0.42} deltaSuffix="%" />);
    const metric = screen.getByTestId("metric-value");
    expect(metric.textContent).toContain("+0.42%");
    expect(screen.getByText("+0.42%").className).toContain("text-terminal-pos");
  });

  it("renders a skeleton instead of a fabricated value while loading", () => {
    render(<MetricValue label="Equity" value={null} loading />);
    expect(screen.getByTestId("metric-value").textContent).not.toContain("--");
    expect(document.querySelector(".ot-skeleton-line")).toBeTruthy();
  });
});
