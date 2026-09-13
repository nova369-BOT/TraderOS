import { NavLink } from "react-router-dom";
import { useStockStore } from "../../store/stockStore";
import logo from "../../assets/logo.png";
import { useAlertsStore } from "../../store/alertsStore";
import { UserAccountPanel } from "./UserAccountPanel";

export function Sidebar() {
  const ticker = useStockStore((s) => s.ticker);
  const unreadCount = useAlertsStore((s) => s.unreadCount);
  const nav = [
    { label: "Market", path: "/markets/stocks", key: "F1" },
    { label: "Security Hub", path: "/markets/security", key: "SH", hint: "Research" },
    { label: "Why Did This Move?", path: "/markets/why", key: "WHY", hint: "Intelligence" },
    { label: "Relationships", path: "/markets/relationships", key: "REL", hint: "Graph" },
    { label: "Economics", path: "/markets/economics", key: "E", hint: "Macro" },
    { label: "Commodities", path: "/markets/commodities", key: "CMDTY", hint: "Macro" },
    { label: "Forex", path: "/markets/forex", key: "FX", hint: "Macro" },
    { label: "ETF Analytics", path: "/markets/etf-analytics", key: "ETFA", hint: "Funds" },
    { label: "Bonds", path: "/markets/bonds", key: "BOND", hint: "Fixed Income" },
    { label: "Yield Curve", path: "/markets/yield-curve", key: "YC", hint: "Fixed Income" },
    { label: "Rotation", path: "/markets/sector-rotation", key: "ROT", hint: "Relative" },
    { label: "Crypto", path: "/markets/crypto", key: "CR", hint: "Digital" },
    { label: "Compare", path: "/markets/compare", key: "CMP", hint: "Split View" },
    { label: "Screener", path: "/markets/screener", key: "F2" },
    { label: "Alpha Zoo", path: "/labs/alpha-zoo", key: "AZ", hint: "Quant" },
    { label: "Research Autopilot", path: "/markets/research-autopilot", key: "RA", hint: "Quant" },
    { label: "Strategy Export", path: "/labs/strategy-export", key: "SE", hint: "Quant" },
    { label: "Hotlists", path: "/markets/hotlists", key: "HOT", hint: "Movers" },
    { label: "Insider", path: "/markets/insider", key: "IN", hint: "Research" },
    { label: "Heatmap", path: "/markets/heatmap", key: "HM", hint: "Market" },
    { label: "Dividends", path: "/markets/dividends", key: "DIV", hint: "Income" },
    { label: "RS Analysis", path: "/markets/rs", key: "RS", hint: "Relative" },
    { label: "Launchpad", path: "/launchpad", key: "LP", hint: "Workspace" },
    { label: "Workstation", path: "/terminal/chart-workstation", key: "6", hint: "6 Charts" },
    { label: "Research", path: "/markets/research", key: "RES", hint: "Papers" },
    { label: "MTA", path: "/terminal/mta", key: "MT", hint: "Multi-TF" },
    { label: "DOM", path: "/terminal/dom", key: "D", hint: "Depth" },
    { label: "Tape", path: "/terminal/tape", key: "T", hint: "Time & Sales" },
    { label: "Portfolio", path: "/portfolio", key: "F3" },
    { label: "Portfolio Lab", path: "/portfolio/lab", key: "PLB", hint: "Research" },
    { label: "Paper", path: "/terminal/paper", key: "P" },
    { label: "Position Sizer", path: "/terminal/position-sizer", key: "PS", hint: "Trading" },
    { label: "Journal", path: "/portfolio/journal", key: "J", hint: "Trading" },
    { label: "Shadow Account", path: "/portfolio/shadow-account", key: "SA", hint: "Trading" },
    { label: "Watchlist", path: "/portfolio/watchlists", key: "F4" },
    { label: "News", path: "/markets/news", key: "F5" },
    { label: "Alerts", path: "/ops/alerts", key: "A" },
    { label: "Risk", path: "/portfolio/risk", key: "R" },
    { label: "Correlation", path: "/portfolio/correlation", key: "CR", hint: "Risk" },
    { label: "Stat Lab", path: "/labs/stat-lab", key: "SL", hint: "Quant" },
    { label: "Pair Trading", path: "/labs/pair-trading", key: "PT", hint: "Quant" },
    { label: "OMS", path: "/portfolio/oms", key: "O" },
    { label: "Ops", path: "/ops", key: "K" },
    { label: "Plugins", path: "/ops/plugins", key: "PL" },
    { label: "Settings", path: "/settings", key: "F6" },
    { label: "About", path: "/about", key: "F7" },
    { label: "Model Lab", path: "/labs/model-lab", key: "ML", hint: "Backtest" },
    { label: "Cockpit", path: "/markets/cockpit", key: "CP", hint: "Overview" },
    { label: "Backtesting", path: "/labs", key: "F9" },
  ];

  return (
    <aside className="relative z-30 flex h-full w-48 shrink-0 flex-col border-r border-terminal-border bg-terminal-panel p-0">
      <div className="border-b border-terminal-border bg-terminal-panel px-3 py-2">
        <img src={logo} alt="ARQOS" className="h-8 w-auto object-contain" />
      </div>
      <div className="border-b border-terminal-border px-3 py-2 text-[11px] text-terminal-muted">
        NSE EQUITY ANALYTICS
      </div>
      <div className="space-y-1 border-b border-terminal-border p-2 text-xs">
        <NavLink to="/" className="block rounded px-2 py-2 text-terminal-muted hover:bg-terminal-bg hover:text-terminal-text">
          Home
        </NavLink>
        <NavLink
          to={`/markets/derivatives?symbol=${encodeURIComponent((ticker || "NIFTY").toUpperCase())}`}
          className="block rounded px-2 py-2 text-terminal-muted hover:bg-terminal-bg hover:text-terminal-text"
        >
          Switch To F&O {"->"}
        </NavLink>
      </div>
      <nav className="flex-1 space-y-1 overflow-auto p-2 text-xs">
        {nav.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex cursor-pointer items-center justify-between rounded px-2 py-2 ${
                isActive
                  ? "bg-terminal-accent/20 text-terminal-accent"
                  : "text-terminal-muted hover:bg-terminal-bg hover:text-terminal-text"
              }`
            }
          >
            <div className="flex flex-col">
              <span>{item.label}</span>
              {(item as any).hint && <span className="text-[8px] text-terminal-accent/70 -mt-0.5 uppercase">{(item as any).hint}</span>}
            </div>
            <span className="text-[10px]">
              {item.path === "/ops/alerts" && unreadCount > 0 ? `${unreadCount}` : item.key}
            </span>
          </NavLink>
        ))}
      </nav>
      <UserAccountPanel />
    </aside>
  );
}
