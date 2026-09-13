/**
 * Navigation coverage guardrail (R2).
 *
 * The AppShell sidebar is the primary navigation surface, so every
 * authenticated route must be reachable from it. This test parses App.tsx
 * route declarations and cross-checks them against navTree.ts:
 *
 *   1. Every navTree target must be a real route (no dead links).
 *   2. Every real route (minus documented exclusions) must be in navTree.
 */

import { describe, expect, it } from "vitest";

import { NAV_TREE, categoryOfPath, flattenNav, searchNav } from "../navTree";
import { ROUTE_PATHS } from "./parseAppRoutes";

/** Auth/utility pages that deliberately live outside the primary nav. */
const EXCLUDED_FROM_NAV = new Set([
  "/",
  "/login",
  "/register",
  "/forgot-access",
  "/equity", // pure layout container — its index redirects to /equity/stocks
  "/equity/launchpad/popout", // utility popout window, opened from the Launchpad page
]);

/**
 * Legacy alias routes kept working for old links/bookmarks. The nav points at
 * their canonical homes instead (e.g. /backtesting/model-lab, not /model-lab).
 */
function isLegacyAlias(path: string): boolean {
  return path.startsWith("/model-lab") || path.startsWith("/portfolio-lab");
}

describe("navTree coverage (R2 guardrail)", () => {
  it("parses a representative set of routes from App.tsx", () => {
    expect(ROUTE_PATHS.size).toBeGreaterThan(55);
    for (const probe of [
      "/terminal",
      "/terminal/paper",
      "/markets",
      "/markets/stocks",
      "/markets/derivatives/greeks",
      "/portfolio/risk",
      "/labs/model-lab",
      "/ops/data-quality",
      "/settings",
      "/account",
    ]) {
      expect(ROUTE_PATHS.has(probe), `parser missed ${probe}`).toBe(true);
    }
    // legacy splats must not leak into the route set
    for (const gone of ["/equity/*", "/fno", "/backtesting/model-lab", "/equity/stocks"]) {
      expect(ROUTE_PATHS.has(gone), `parser leaked legacy ${gone}`).toBe(false);
    }
  });

  it("every navTree target is a real route — no dead links", () => {
    for (const item of flattenNav()) {
      expect(
        ROUTE_PATHS.has(item.to),
        `nav item "${item.label}" → ${item.to} is not a route in App.tsx`,
      ).toBe(true);
    }
  });

  it("every authenticated route is reachable from the sidebar", () => {
    const navTargets = new Set(flattenNav().map((item) => item.to));

    // A route is reachable if it is a nav target OR lives beneath one
    // (detail/sub-resource pages are opened from their parent page:
    // /equity/portfolio/lab/runs/:runId is reached from Portfolio Lab).
    const isCovered = (path: string): boolean => {
      let candidate: string = path;
      while (candidate.includes("/")) {
        if (navTargets.has(candidate)) return true;
        const idx = candidate.lastIndexOf("/");
        if (idx <= 0) break;
        candidate = candidate.slice(0, idx);
      }
      return false;
    };

    const missing: string[] = [];
    for (const path of ROUTE_PATHS) {
      if (EXCLUDED_FROM_NAV.has(path)) continue;
      if (!isCovered(path)) missing.push(path);
    }
    expect(missing, `routes missing from navTree: ${missing.join(", ")}`).toEqual([]);
  });

  it("has no duplicate nav targets", () => {
    const targets = flattenNav().map((item) => item.to);
    expect(new Set(targets).size).toBe(targets.length);
  });

  it("covers the six rebuild workspace categories", () => {
    expect(NAV_TREE.map((category) => category.id)).toEqual([
      "home",
      "terminal",
      "markets",
      "portfolio",
      "labs",
      "data-ops",
    ]);
  });

  it("searchNav matches labels, paths and hints", () => {
    expect(searchNav("screener").map((item) => item.id)).toContain("screener");
    expect(searchNav("DOM").map((item) => item.id)).toContain("dom");
    expect(searchNav("depth").map((item) => item.id)).toContain("dom"); // via hint
    expect(searchNav("zzz-no-match")).toEqual([]);
    expect(searchNav("").length).toBe(flattenNav().length);
  });

  it("categoryOfPath finds the owning category", () => {
    expect(categoryOfPath("/terminal")?.id).toBe("terminal");
    expect(categoryOfPath("/markets/derivatives/greeks")?.id).toBe("markets");
    expect(categoryOfPath("/settings")?.id).toBe("data-ops");
    expect(categoryOfPath("/no/such/path")).toBeNull();
  });
});
