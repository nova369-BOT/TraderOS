import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { TerminalShell } from "../TerminalShell";
import { EquityRightRail } from "../../../equity/EquityLayout";

/**
 * Data & Ops workspace layout (R3): ops dashboard, data quality, alerts,
 * plugins, settings, about. Not symbol-driven — no ticker sync.
 */
export function OpsLayout() {
  return (
    <TerminalShell
      contentClassName="pb-16 md:pb-0"
      showMobileBottomNav
      showInstallPrompt
      workspacePresetStorageKey="ot:shell:ops:preset"
      rightRailStorageKey="ot:shell:ops:right-rail"
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
