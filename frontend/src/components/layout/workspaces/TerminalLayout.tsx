import { Suspense, type ReactNode } from "react";
import { Outlet } from "react-router-dom";

import { TerminalShell, type WorkspacePreset } from "../TerminalShell";
import { useTickerFromSearchParams } from "../../../hooks/useTickerFromSearchParams";
import { EquityRightRail } from "../../../equity/EquityLayout";

const LAZY_FALLBACK = (
  <div className="flex min-h-[50vh] items-center justify-center p-4">
    <div className="rounded-sm border border-terminal-border bg-terminal-panel px-4 py-3 text-xs text-terminal-muted">
      Loading workspace...
    </div>
  </div>
);

type Props = {
  children?: ReactNode;
  contentClassName?: string;
  defaultPreset?: WorkspacePreset;
  presetStorageKey?: string;
};

/**
 * Terminal workspace layout (R3): the order-execution cluster —
 * workstation (index), paper trading, position sizer, chart workstation,
 * multi-timeframe, DOM, tape, saved views. Symbol-driven, so the
 * ?ticker= sync stays on.
 */
export function TerminalLayout({
  children,
  contentClassName = "bg-terminal-bg",
  defaultPreset = "trader",
  presetStorageKey,
}: Props) {
  useTickerFromSearchParams();
  return (
    <TerminalShell
      contentClassName={contentClassName}
      showMobileBottomNav
      showInstallPrompt
      defaultPreset={defaultPreset}
      workspacePresetStorageKey={presetStorageKey ?? "ot:shell:terminal:preset"}
      rightRailStorageKey="ot:shell:terminal:right-rail"
      rightRailContent={<EquityRightRail />}
    >
      <Suspense fallback={LAZY_FALLBACK}>{children ?? <Outlet />}</Suspense>
    </TerminalShell>
  );
}
