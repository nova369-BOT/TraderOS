/**
 * Legacy URL redirect guardrail (R3).
 *
 * Every pre-R3 URL must redirect to a REAL canonical route — no dead ends,
 * no redirect loops, no lost query strings or params.
 */

import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";

import {
  EQUITY_RULES,
  FLAT_RULES,
  PREFIX_RULES,
  LegacyRedirect,
  mapLegacyPath,
} from "../LegacyRedirect";
import { ROUTE_PATHS } from "../layout/appshell/__tests__/parseAppRoutes";

describe("mapLegacyPath table (R3)", () => {
  it("every /equity rule redirects to a real canonical route", () => {
    for (const [suffix] of EQUITY_RULES) {
      const target = mapLegacyPath(`/equity/${suffix}`);
      expect(target, `/equity/${suffix} must map`).toBeTruthy();
      expect(
        ROUTE_PATHS.has(target!),
        `/equity/${suffix} → ${target} is not a real route`,
      ).toBe(true);
    }
  });

  it("every prefix and flat alias redirects to a real canonical route", () => {
    for (const [prefix] of PREFIX_RULES) {
      const target = mapLegacyPath(prefix);
      expect(ROUTE_PATHS.has(target!), `${prefix} → ${target} is not a real route`).toBe(true);
    }
    for (const [flat] of Object.entries(FLAT_RULES)) {
      const target = mapLegacyPath(flat);
      expect(ROUTE_PATHS.has(target!), `${flat} → ${target} is not a real route`).toBe(true);
    }
  });

  it("dynamic segments ride along", () => {
    expect(mapLegacyPath("/equity/security/RELIANCE")).toBe("/markets/security/RELIANCE");
    expect(mapLegacyPath("/equity/why/AAPL")).toBe("/markets/why/AAPL");
    expect(mapLegacyPath("/equity/relationships/TCS")).toBe("/markets/relationships/TCS");
    expect(mapLegacyPath("/equity/portfolio/lab/runs/abc123")).toBe("/portfolio/lab/runs/abc123");
    expect(mapLegacyPath("/backtesting/model-lab/experiments/42")).toBe("/labs/model-lab/experiments/42");
    expect(mapLegacyPath("/fno/greeks")).toBe("/markets/derivatives/greeks");
  });

  it("never redirects into a legacy namespace (no loops)", () => {
    const all = [
      ...EQUITY_RULES.map(([suffix]) => `/equity/${suffix}`),
      ...PREFIX_RULES.map(([prefix]) => prefix),
      ...Object.keys(FLAT_RULES),
    ];
    for (const legacy of all) {
      const target = mapLegacyPath(legacy)!;
      expect(
        target.startsWith("/equity") || target.startsWith("/fno") ||
          target.startsWith("/backtesting") || target.startsWith("/model-lab") ||
          target.startsWith("/portfolio-lab"),
        `${legacy} → ${target} redirects into a legacy namespace`,
      ).toBe(false);
    }
  });

  it("unknown legacy paths fall through to root", () => {
    expect(mapLegacyPath("/equity/not-a-real-page")).toBeNull();
    expect(mapLegacyPath("/fno/not-real")).toBe("/markets/derivatives/not-real"); // prefix rides — page catch-all handles
  });
});

function renderAt(path: string) {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }} initialEntries={[path]}>
      <Routes>
        <Route path="/equity/*" element={<LegacyRedirect />} />
        <Route path="/fno/*" element={<LegacyRedirect />} />
        <Route path="/backtesting/*" element={<LegacyRedirect />} />
        <Route path="/markets/stocks" element={<div data-testid="canonical-stocks">STOCKS</div>} />
        <Route path="/markets/derivatives" element={<div data-testid="canonical-derivatives">DERIVATIVES</div>} />
        <Route path="/markets/security/:ticker" element={<div data-testid="canonical-security">SECURITY</div>} />
        <Route path="/labs/model-lab" element={<div data-testid="canonical-labs">LABS</div>} />
        <Route path="/" element={<div data-testid="root">ROOT</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("LegacyRedirect component (R3)", () => {
  it("redirects a legacy page URL with its query string", () => {
    renderAt("/equity/stocks?ticker=RELIANCE");
    expect(screen.getByTestId("canonical-stocks")).toBeTruthy();
  });

  it("redirects a legacy param route", () => {
    renderAt("/equity/security/RELIANCE");
    expect(screen.getByTestId("canonical-security")).toBeTruthy();
  });

  it("redirects the fno subtree root", () => {
    renderAt("/fno");
    expect(screen.getByTestId("canonical-derivatives")).toBeTruthy();
  });

  it("redirects the backtesting subtree", () => {
    renderAt("/backtesting/model-lab");
    expect(screen.getByTestId("canonical-labs")).toBeTruthy();
  });

  it("unknown legacy path falls to root", () => {
    renderAt("/equity/not-a-real-page");
    expect(screen.getByTestId("root")).toBeTruthy();
  });
});
