/**
 * AppShell navigation tree — the single source of truth for primary navigation.
 *
 * R3: URLs now mirror the workspace information architecture.
 * TERMINAL / MARKETS & RESEARCH / PORTFOLIO & RISK / LABS / DATA & OPS (+ Settings).
 * All pre-R3 URLs redirect via components/LegacyRedirect.tsx.
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
          { id: "launchpad", label: "Launchpad", to: "/launchpad", hint: "All workspaces" },
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
          { id: "paper", label: "Paper Trading", to: "/terminal/paper", hint: "Simulated execution" },
          { id: "position-sizer", label: "Position Sizer", to: "/terminal/position-sizer" },
        ],
      },
      {
        id: "terminal-views",
        label: "Views",
        items: [
          { id: "chart-workstation", label: "Chart Workstation", to: "/terminal/chart-workstation", hint: "Multi-chart" },
          { id: "mta", label: "Multi-Timeframe", to: "/terminal/mta" },
          { id: "dom", label: "DOM", to: "/terminal/dom", hint: "Depth of market" },
          { id: "tape", label: "Time & Sales", to: "/terminal/tape" },
          { id: "saved-views", label: "Saved Views", to: "/terminal/saved-views" },
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
          { id: "market-overview", label: "Market Overview", to: "/markets" },
          { id: "stocks", label: "Securities", to: "/markets/stocks" },
          { id: "security-hub", label: "Security Hub", to: "/markets/security" },
          { id: "screener", label: "Screener", to: "/markets/screener" },
          { id: "hotlists", label: "Hotlists", to: "/markets/hotlists", hint: "Movers" },
          { id: "heatmap", label: "Heatmap", to: "/markets/heatmap" },
          { id: "compare", label: "Compare", to: "/markets/compare", hint: "Split view" },
          { id: "commodities", label: "Commodities", to: "/markets/commodities" },
          { id: "forex", label: "Forex", to: "/markets/forex" },
          { id: "crypto", label: "Crypto", to: "/markets/crypto" },
          { id: "etf-analytics", label: "ETF Analytics", to: "/markets/etf-analytics" },
          { id: "mutual-funds", label: "Mutual Funds", to: "/markets/mutual-funds" },
        ],
      },
      {
        id: "markets-macro",
        label: "Macro & Fixed Income",
        items: [
          { id: "economics", label: "Economics", to: "/markets/economics" },
          { id: "sector-rotation", label: "Sector Rotation", to: "/markets/sector-rotation" },
          { id: "bonds", label: "Bonds", to: "/markets/bonds" },
          { id: "yield-curve", label: "Yield Curve", to: "/markets/yield-curve" },
          { id: "bond-analytics", label: "Bond Analytics", to: "/markets/bond-analytics" },
        ],
      },
      {
        id: "markets-derivatives",
        label: "Derivatives (F&O)",
        items: [
          { id: "fno-chain", label: "Options Chain", to: "/markets/derivatives" },
          { id: "fno-greeks", label: "Greeks", to: "/markets/derivatives/greeks" },
          { id: "fno-heatmap", label: "Greeks Heatmap", to: "/markets/derivatives/heatmap" },
          { id: "fno-futures", label: "Futures", to: "/markets/derivatives/futures" },
          { id: "fno-oi", label: "Open Interest", to: "/markets/derivatives/oi" },
          { id: "fno-pcr", label: "Put/Call Ratio", to: "/markets/derivatives/pcr" },
          { id: "fno-flow", label: "Options Flow", to: "/markets/derivatives/flow" },
          { id: "fno-strategy", label: "Strategy Builder", to: "/markets/derivatives/strategy" },
          { id: "fno-expiry", label: "Expiry", to: "/markets/derivatives/expiry" },
        ],
      },
      {
        id: "markets-research",
        label: "Research & Intel",
        items: [
          { id: "cockpit", label: "Cockpit", to: "/markets/cockpit", hint: "Analyst intelligence" },
          { id: "research", label: "Research", to: "/markets/research", hint: "Papers" },
          { id: "research-autopilot", label: "Research Autopilot", to: "/markets/research-autopilot" },
          { id: "why", label: "Why Did This Move?", to: "/markets/why" },
          { id: "relationships", label: "Relationships", to: "/markets/relationships", hint: "Graph" },
          { id: "insider", label: "Insider Activity", to: "/markets/insider" },
          { id: "news", label: "News", to: "/markets/news" },
          { id: "intelligence-timeline", label: "Intelligence Timeline", to: "/markets/intelligence-timeline" },
          { id: "dividends", label: "Dividends", to: "/markets/dividends" },
          { id: "rs", label: "Relative Strength", to: "/markets/rs" },
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
          { id: "portfolio", label: "Portfolio", to: "/portfolio" },
          { id: "portfolio-lab", label: "Portfolio Lab", to: "/portfolio/lab" },
          { id: "watchlist", label: "Watchlists", to: "/portfolio/watchlists" },
          { id: "journal", label: "Trade Journal", to: "/portfolio/journal" },
          { id: "shadow-account", label: "Shadow Account", to: "/portfolio/shadow-account" },
        ],
      },
      {
        id: "portfolio-risk",
        label: "Risk & Compliance",
        items: [
          { id: "risk", label: "Risk Dashboard", to: "/portfolio/risk" },
          { id: "correlation", label: "Correlation", to: "/portfolio/correlation" },
          { id: "oms", label: "OMS & Compliance", to: "/portfolio/oms" },
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
          { id: "backtesting", label: "Backtesting", to: "/labs" },
          { id: "model-lab", label: "Model Lab", to: "/labs/model-lab" },
          { id: "algorithm-framework", label: "Algorithm Framework", to: "/labs/algorithm-framework" },
          { id: "portfolio-optimizer", label: "Portfolio Optimizer", to: "/labs/portfolio-optimizer" },
          { id: "model-governance", label: "Model Governance", to: "/labs/model-governance" },
        ],
      },
      {
        id: "labs-quant",
        label: "Quant Labs",
        items: [
          { id: "stat-lab", label: "Statistical Lab", to: "/labs/stat-lab" },
          { id: "pair-trading", label: "Pair Trading", to: "/labs/pair-trading" },
          { id: "option-greeks", label: "Option Greeks Calc", to: "/labs/option-greeks" },
          { id: "factors", label: "Factor Dashboard", to: "/labs/factors" },
          { id: "alpha-zoo", label: "Alpha Zoo", to: "/labs/alpha-zoo" },
          { id: "strategy-export", label: "Strategy Export", to: "/labs/strategy-export" },
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
          { id: "ops", label: "Ops Dashboard", to: "/ops" },
          { id: "data-quality", label: "Data Quality", to: "/ops/data-quality" },
          { id: "alerts", label: "Alerts", to: "/ops/alerts" },
          { id: "plugins", label: "Plugins", to: "/ops/plugins" },
          { id: "settings", label: "Settings", to: "/settings" },
          { id: "about", label: "About", to: "/about" },
          { id: "fno-about", label: "F&O Guide", to: "/markets/derivatives/about" },
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
