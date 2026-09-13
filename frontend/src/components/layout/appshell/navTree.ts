/**
 * AppShell navigation tree — the single source of truth for primary navigation.
 *
 * R2 organizes every existing route into the workspace categories the rebuild
 * targets (TERMINAL / MARKETS & RESEARCH / PORTFOLIO & RISK / LABS / DATA & OPS).
 * R3 will restructure the routes themselves; until then the tree points at the
 * current URLs so nothing is lost and everything stays reachable.
 *
 * Guardrail: a coverage test walks App.tsx routes and asserts every
 * authenticated, non-redirect route appears here exactly once.
 */

export type NavItem = {
  id: string;
  label: string;
  to: string;
  hint?: string;
};

export type NavGroup = {
  id: string;
  label: string;
  items: NavItem[];
};

export type NavCategory = {
  id: string;
  label: string;
  /** Two-glyph code used by the collapsed icon rail. */
  glyph: string;
  groups: NavGroup[];
};

export const NAV_TREE: NavCategory[] = [
  {
    id: "home",
    label: "Home",
    glyph: "HM",
    groups: [
      {
        id: "home-overview",
        label: "Overview",
        items: [
          { id: "mission-control", label: "Mission Control", to: "/home", hint: "Personal briefing" },
          { id: "dashboard", label: "Dashboard", to: "/equity/dashboard" },
          { id: "launchpad", label: "Launchpad", to: "/equity/launchpad", hint: "All workspaces" },
          { id: "cockpit", label: "Cockpit", to: "/equity/cockpit" },
        ],
      },
    ],
  },
  {
    id: "terminal",
    label: "Terminal",
    glyph: "QT",
    groups: [
      {
        id: "terminal-trading",
        label: "Trading",
        items: [
          { id: "quantum-terminal", label: "Terminal", to: "/terminal", hint: "Order workstation" },
          { id: "paper", label: "Paper Trading", to: "/equity/paper", hint: "Simulated execution" },
          { id: "position-sizer", label: "Position Sizer", to: "/equity/position-sizer" },
        ],
      },
      {
        id: "terminal-views",
        label: "Views",
        items: [
          { id: "chart-workstation", label: "Chart Workstation", to: "/equity/chart-workstation", hint: "Multi-chart" },
          { id: "mta", label: "Multi-Timeframe", to: "/equity/mta" },
          { id: "dom", label: "DOM", to: "/equity/dom", hint: "Depth of market" },
          { id: "tape", label: "Time & Sales", to: "/equity/tape" },
          { id: "saved-views", label: "Saved Views", to: "/equity/saved-views" },
        ],
      },
    ],
  },
  {
    id: "markets",
    label: "Markets & Research",
    glyph: "MK",
    groups: [
      {
        id: "markets-equities",
        label: "Markets",
        items: [
          { id: "stocks", label: "Securities", to: "/equity/stocks" },
          { id: "security-hub", label: "Security Hub", to: "/equity/security" },
          { id: "screener", label: "Screener", to: "/equity/screener" },
          { id: "hotlists", label: "Hotlists", to: "/equity/hotlists", hint: "Movers" },
          { id: "heatmap", label: "Heatmap", to: "/equity/heatmap" },
          { id: "compare", label: "Compare", to: "/equity/compare", hint: "Split view" },
          { id: "commodities", label: "Commodities", to: "/equity/commodities" },
          { id: "forex", label: "Forex", to: "/equity/forex" },
          { id: "crypto", label: "Crypto", to: "/equity/crypto" },
          { id: "etf-analytics", label: "ETF Analytics", to: "/equity/etf-analytics" },
          { id: "mutual-funds", label: "Mutual Funds", to: "/equity/mutual-funds" },
        ],
      },
      {
        id: "markets-macro",
        label: "Macro & Fixed Income",
        items: [
          { id: "economics", label: "Economics", to: "/equity/economics" },
          { id: "sector-rotation", label: "Sector Rotation", to: "/equity/sector-rotation" },
          { id: "bonds", label: "Bonds", to: "/equity/bonds" },
          { id: "yield-curve", label: "Yield Curve", to: "/equity/yield-curve" },
          { id: "bond-analytics", label: "Bond Analytics", to: "/equity/bond-analytics" },
        ],
      },
      {
        id: "markets-derivatives",
        label: "Derivatives (F&O)",
        items: [
          { id: "fno-chain", label: "Options Chain", to: "/fno" },
          { id: "fno-greeks", label: "Greeks", to: "/fno/greeks" },
          { id: "fno-heatmap", label: "Greeks Heatmap", to: "/fno/heatmap" },
          { id: "fno-futures", label: "Futures", to: "/fno/futures" },
          { id: "fno-oi", label: "Open Interest", to: "/fno/oi" },
          { id: "fno-pcr", label: "Put/Call Ratio", to: "/fno/pcr" },
          { id: "fno-flow", label: "Options Flow", to: "/fno/flow" },
          { id: "fno-strategy", label: "Strategy Builder", to: "/fno/strategy" },
          { id: "fno-expiry", label: "Expiry", to: "/fno/expiry" },
        ],
      },
      {
        id: "markets-research",
        label: "Research & Intel",
        items: [
          { id: "research", label: "Research", to: "/equity/research", hint: "Papers" },
          { id: "research-autopilot", label: "Research Autopilot", to: "/equity/research-autopilot" },
          { id: "why", label: "Why Did This Move?", to: "/equity/why" },
          { id: "relationships", label: "Relationships", to: "/equity/relationships", hint: "Graph" },
          { id: "insider", label: "Insider Activity", to: "/equity/insider" },
          { id: "news", label: "News", to: "/equity/news" },
          { id: "intelligence-timeline", label: "Intelligence Timeline", to: "/equity/intelligence-timeline" },
          { id: "dividends", label: "Dividends", to: "/equity/dividends" },
          { id: "rs", label: "Relative Strength", to: "/equity/rs" },
        ],
      },
    ],
  },
  {
    id: "portfolio",
    label: "Portfolio & Risk",
    glyph: "PF",
    groups: [
      {
        id: "portfolio-tracking",
        label: "Portfolio",
        items: [
          { id: "portfolio", label: "Portfolio", to: "/equity/portfolio" },
          { id: "portfolio-lab", label: "Portfolio Lab", to: "/equity/portfolio/lab" },
          { id: "watchlist", label: "Watchlists", to: "/equity/watchlist" },
          { id: "journal", label: "Trade Journal", to: "/equity/journal" },
          { id: "shadow-account", label: "Shadow Account", to: "/equity/shadow-account" },
        ],
      },
      {
        id: "portfolio-risk",
        label: "Risk & Compliance",
        items: [
          { id: "risk", label: "Risk Dashboard", to: "/equity/risk" },
          { id: "correlation", label: "Correlation", to: "/equity/correlation" },
          { id: "oms", label: "OMS & Compliance", to: "/equity/oms" },
          { id: "account", label: "Account", to: "/account" },
        ],
      },
    ],
  },
  {
    id: "labs",
    label: "Labs",
    glyph: "LB",
    groups: [
      {
        id: "labs-models",
        label: "Backtesting & Models",
        items: [
          { id: "backtesting", label: "Backtesting", to: "/backtesting" },
          { id: "model-lab", label: "Model Lab", to: "/backtesting/model-lab" },
          { id: "algorithm-framework", label: "Algorithm Framework", to: "/backtesting/algorithm-framework" },
          { id: "portfolio-optimizer", label: "Portfolio Optimizer", to: "/backtesting/portfolio-optimizer" },
          { id: "model-governance", label: "Model Governance", to: "/backtesting/model-governance" },
        ],
      },
      {
        id: "labs-quant",
        label: "Quant Labs",
        items: [
          { id: "stat-lab", label: "Statistical Lab", to: "/equity/stat-lab" },
          { id: "pair-trading", label: "Pair Trading", to: "/equity/pair-trading" },
          { id: "option-greeks", label: "Option Greeks Calc", to: "/equity/option-greeks" },
          { id: "factors", label: "Factor Dashboard", to: "/equity/factors" },
          { id: "alpha-zoo", label: "Alpha Zoo", to: "/equity/alpha-zoo" },
          { id: "strategy-export", label: "Strategy Export", to: "/equity/strategy-export" },
        ],
      },
    ],
  },
  {
    id: "data-ops",
    label: "Data & Ops",
    glyph: "OP",
    groups: [
      {
        id: "data-ops-system",
        label: "Operations",
        items: [
          { id: "ops", label: "Ops Dashboard", to: "/equity/ops" },
          { id: "data-quality", label: "Data Quality", to: "/equity/data-quality" },
          { id: "alerts", label: "Alerts", to: "/equity/alerts" },
          { id: "plugins", label: "Plugins", to: "/equity/plugins" },
          { id: "settings", label: "Settings", to: "/equity/settings" },
          { id: "about", label: "About", to: "/equity/stocks/about" },
          { id: "fno-about", label: "F&O Guide", to: "/fno/about" },
        ],
      },
    ],
  },
];

/** Every item, depth-first. */
export function flattenNav(): NavItem[] {
  return NAV_TREE.flatMap((category) => category.groups.flatMap((group) => group.items));
}

/** Case-insensitive match across label, hint and path. */
export function searchNav(query: string): NavItem[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return flattenNav();
  return flattenNav().filter(
    (item) =>
      item.label.toLowerCase().includes(needle) ||
      item.to.toLowerCase().includes(needle) ||
      (item.hint?.toLowerCase().includes(needle) ?? false),
  );
}

/** Find the category containing a path (for auto-expand on navigation). */
export function categoryOfPath(path: string): NavCategory | null {
  const match = flattenNav().find((item) => item.to === path);
  if (!match) return null;
  return NAV_TREE.find((category) => category.groups.some((group) => group.items.some((item) => item.id === match.id))) ?? null;
}
