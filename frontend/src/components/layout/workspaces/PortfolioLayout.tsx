import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { TerminalShell } from "../TerminalShell";
import { useTickerFromSearchParams } from "../../../hooks/useTickerFromSearchParams";
import { EquityRightRail } from "../../../equity/EquityLayout";

/**
 * Portfolio & Risk workspace layout (R3): portfolio, watchlists, journal,
 * shadow account, portfolio lab, risk, correlation, OMS. The ?ticker= sync
 * stays on for behavior parity with the pre-R3 shell.
 */
export function PortfolioLayout() {
  useTickerFromSearchParams();
  return (
    <TerminalShell
      contentClassName="pb-16 md:pb-0"
      showMobileBottomNav
      showInstallPrompt
      workspacePresetStorageKey="ot:shell:portfolio:preset"
      rightRailStorageKey="ot:shell:portfolio:right-rail"
      rightRailContent={<EquityRightRail />}
    >
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center p-4">
            <div className="rounded-sm border border-terminal-border bg-terminal-panel px-4 py-3 text-xs text-terminal-muted">
              Loading workspace...
            </div>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </TerminalShell>
  );
}
