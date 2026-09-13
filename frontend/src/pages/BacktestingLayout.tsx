import { Link, Outlet, useLocation } from "react-router-dom";

import { TerminalShell, useTerminalShellWorkspace } from "../components/layout/TerminalShell";
import { TerminalBadge } from "../components/terminal/TerminalBadge";
import { TerminalPanel } from "../components/terminal/TerminalPanel";
import { useStockStore } from "../store/stockStore";

function BacktestingRightRail() {
  const location = useLocation();
  const { preset } = useTerminalShellWorkspace();
  const ticker = useStockStore((s) => s.ticker);

  const routeLabel = (() => {
    if (location.pathname.includes("/labs/model-lab/compare")) return "Model Lab Compare";
    if (location.pathname.includes("/labs/model-lab/experiments/")) return "Model Lab Experiment";
    if (location.pathname.includes("/labs/model-lab/runs/")) return "Model Lab Run Report";
    if (location.pathname.includes("/labs/model-lab")) return "Model Lab";
    if (location.pathname.includes("/labs/model-governance")) return "Model Governance";
    if (location.pathname.includes("/labs/algorithm-framework")) return "Algorithm Framework Lab";
    if (location.pathname.includes("/labs/portfolio-optimizer")) return "Portfolio Optimizer";
    return "Backtesting Console";
  })();

  return (
    <aside className="hidden xl:flex h-full w-72 shrink-0 flex-col border-l border-terminal-border bg-terminal-panel">
      <div className="border-b border-terminal-border px-3 py-2">
        <div className="ot-type-panel-title text-terminal-accent">Quant Context</div>
        <div className="ot-type-panel-subtitle text-terminal-muted">{routeLabel}</div>
      </div>
      <div className="flex-1 space-y-2 overflow-auto p-2">
        <TerminalPanel
          title="Workspace"
          subtitle="Preset + Asset"
          actions={<TerminalBadge variant="accent">{preset.toUpperCase()}</TerminalBadge>}
          bodyClassName="space-y-2"
        >
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="rounded border border-terminal-border bg-terminal-bg px-2 py-1">
              <div className="text-terminal-muted">Symbol</div>
              <div>{(ticker || "RELIANCE").toUpperCase()}</div>
            </div>
            <div className="rounded border border-terminal-border bg-terminal-bg px-2 py-1">
              <div className="text-terminal-muted">Mode</div>
              <div>Research</div>
            </div>
          </div>
        </TerminalPanel>

        <TerminalPanel title="Quick Jump" subtitle="Backtesting stack" bodyClassName="space-y-1">
          <div className="grid grid-cols-1 gap-1">
            <Link to="/labs" className="rounded-sm border border-terminal-border px-2 py-1 ot-type-label text-terminal-muted hover:text-terminal-text">
              Backtesting Console
            </Link>
            <Link to="/labs/model-lab" className="rounded-sm border border-terminal-border px-2 py-1 ot-type-label text-terminal-muted hover:text-terminal-text">
              Model Lab
            </Link>
            <Link to="/labs/model-governance" className="rounded-sm border border-terminal-border px-2 py-1 ot-type-label text-terminal-muted hover:text-terminal-text">
              Model Governance
            </Link>
            <Link to="/labs/algorithm-framework" className="rounded-sm border border-terminal-border px-2 py-1 ot-type-label text-terminal-muted hover:text-terminal-text">
              Algorithm Framework
            </Link>
            <Link to="/labs/portfolio-optimizer" className="rounded-sm border border-terminal-border px-2 py-1 ot-type-label text-terminal-muted hover:text-terminal-text">
              Portfolio Optimizer
            </Link>
          </div>
        </TerminalPanel>

        <TerminalPanel title="Quant Hints" subtitle="Panel workflow" bodyClassName="space-y-1 text-[11px] text-terminal-muted">
          <div>Backtesting Mosaic now uses a split-pane foundation with keyboard/pointer resizing.</div>
          <div>Panel chrome is standardized for future migration of report/workspace panels.</div>
          <div>Use workspace presets to prepare role-based layouts (Quant / PM / Risk).</div>
        </TerminalPanel>
      </div>
    </aside>
  );
}

export function BacktestingLayout() {
  return (
    <TerminalShell
      workspacePresetStorageKey="ot:shell:backtesting:preset"
      rightRailStorageKey="ot:shell:backtesting:right-rail"
      rightRailContent={<BacktestingRightRail />}
    >
      <Outlet />
    </TerminalShell>
  );
}
