import { Navigate, useLocation } from "react-router-dom";

/**
 * Legacy URL redirector (R3 IA migration).
 *
 * Every pre-R3 URL keeps working forever: /equity/*, /fno/*, /backtesting/*
 * and the old top-level aliases map to their canonical workspace homes.
 * Query strings are preserved (e.g. ?ticker=RELIANCE, ?symbol=NIFTY&expiry=…)
 * and dynamic segments ride along via prefix rules.
 */

/** Longest-prefix-first rules for the /equity subtree. */
export const EQUITY_RULES: Array<[suffix: string, target: string]> = [
  ["stocks/about", "/about"],
  ["launchpad/popout", "/launchpad/popout"],
  ["launchpad", "/launchpad"],
  ["portfolio/lab", "/portfolio/lab"],
  ["portfolio", "/portfolio"],
  ["stocks", "/markets/stocks"],
  ["security", "/markets/security"],
  ["screener", "/markets/screener"],
  ["hotlists", "/markets/hotlists"],
  ["heatmap", "/markets/heatmap"],
  ["compare", "/markets/compare"],
  ["commodities", "/markets/commodities"],
  ["forex", "/markets/forex"],
  ["crypto", "/markets/crypto"],
  ["etf-analytics", "/markets/etf-analytics"],
  ["mutual-funds", "/markets/mutual-funds"],
  ["economics", "/markets/economics"],
  ["sector-rotation", "/markets/sector-rotation"],
  ["bonds", "/markets/bonds"],
  ["yield-curve", "/markets/yield-curve"],
  ["bond-analytics", "/markets/bond-analytics"],
  ["research-autopilot", "/markets/research-autopilot"],
  ["research", "/markets/research"],
  ["why", "/markets/why"],
  ["relationships", "/markets/relationships"],
  ["insider", "/markets/insider"],
  ["news", "/markets/news"],
  ["intelligence-timeline", "/markets/intelligence-timeline"],
  ["dividends", "/markets/dividends"],
  ["rs", "/markets/rs"],
  ["cockpit", "/markets/cockpit"],
  ["dashboard", "/markets"],
  ["watchlist", "/portfolio/watchlists"],
  ["journal", "/portfolio/journal"],
  ["shadow-account", "/portfolio/shadow-account"],
  ["risk", "/portfolio/risk"],
  ["correlation", "/portfolio/correlation"],
  ["oms", "/portfolio/oms"],
  ["paper", "/terminal/paper"],
  ["position-sizer", "/terminal/position-sizer"],
  ["chart-workstation", "/terminal/chart-workstation"],
  ["mta", "/terminal/mta"],
  ["dom", "/terminal/dom"],
  ["tape", "/terminal/tape"],
  ["saved-views", "/terminal/saved-views"],
  ["stat-lab", "/labs/stat-lab"],
  ["pair-trading", "/labs/pair-trading"],
  ["option-greeks", "/labs/option-greeks"],
  ["factors", "/labs/factors"],
  ["alpha-zoo", "/labs/alpha-zoo"],
  ["strategy-export", "/labs/strategy-export"],
  ["data-quality", "/ops/data-quality"],
  ["alerts", "/ops/alerts"],
  ["plugins", "/ops/plugins"],
  ["ops", "/ops"],
  ["settings", "/settings"],
];

/** Plain subtree re-homes: suffix rides along unchanged. */
export const PREFIX_RULES: Array<[prefix: string, target: string]> = [
  ["/fno", "/markets/derivatives"],
  ["/backtesting", "/labs"],
  ["/model-lab", "/labs/model-lab"],
  ["/portfolio-lab", "/portfolio/lab"],
];

/** Old flat top-level aliases. */
export const FLAT_RULES: Record<string, string> = {
  "/stocks/about": "/about",
  "/dashboard": "/markets",
  "/cockpit": "/markets/cockpit",
  "/stocks": "/markets/stocks",
  "/security": "/markets/security",
  "/commodities": "/markets/commodities",
  "/forex": "/markets/forex",
  "/hotlists": "/markets/hotlists",
  "/screener": "/markets/screener",
  "/compare": "/markets/compare",
  "/mutual-funds": "/markets/mutual-funds",
  "/heatmap": "/markets/derivatives/heatmap",
  "/watchlist": "/portfolio/watchlists",
  "/news": "/markets/news",
  "/alerts": "/ops/alerts",
  "/paper": "/terminal/paper",
  "/risk": "/portfolio/risk",
  "/correlation": "/portfolio/correlation",
  "/oms": "/portfolio/oms",
  "/plugins": "/ops/plugins",
  "/saved-views": "/terminal/saved-views",
};

/** Map a legacy pathname to its canonical home; null when unknown. */
export function mapLegacyPath(pathname: string): string | null {
  if (pathname === "/equity") return "/markets";

  if (pathname.startsWith("/equity/")) {
    const suffix = pathname.slice("/equity/".length);
    for (const [key, target] of EQUITY_RULES) {
      if (suffix === key || suffix.startsWith(`${key}/`)) {
        return suffix === key ? target : `${target}/${suffix.slice(key.length + 1)}`;
      }
    }
    return null;
  }

  for (const [prefix, target] of PREFIX_RULES) {
    if (pathname === prefix) return target;
    if (pathname.startsWith(`${prefix}/`)) return `${target}/${pathname.slice(prefix.length + 1)}`;
  }

  const flat = FLAT_RULES[pathname];
  if (flat) return flat;

  return null;
}

/**
 * Rendered at the legacy catch-all routes. Unknown paths fall through to the
 * app-level catch-all (root redirect).
 */
export function LegacyRedirect() {
  const location = useLocation();
  const target = mapLegacyPath(location.pathname);
  if (!target) {
    return <Navigate to="/" replace />;
  }
  return <Navigate to={{ pathname: target, search: location.search }} replace />;
}
