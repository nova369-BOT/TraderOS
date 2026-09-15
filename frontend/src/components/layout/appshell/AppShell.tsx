import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { ErrorBoundary } from "../../common/ErrorBoundary";
import { AlertToasts } from "../AlertToasts";
import { CommandPalette } from "../CommandPalette";
import { HotKeyPanelFloat } from "../../trading/HotKeyPanelFloat";
import { HudOverlay } from "../HudOverlay";
import { InstallPromptBanner } from "../InstallPromptBanner";
import { MobileBottomNav } from "../MobileBottomNav";
import { StatusBar } from "../StatusBar";
import { TickerTape } from "../TickerTape";
import { ShortcutOverlay } from "../../common/ShortcutOverlay";
import { useUiStore } from "../../../store/uiStore";
import { useContextStore } from "../../../store/contextStore";
import { AppShellBar } from "./AppShellBar";
import { AppShellContextBar } from "./AppShellContextBar";
import { AppShellSidebar } from "./AppShellSidebar";
import type { WorkspacePreset } from "../TerminalShell";

type Props = {
  children: ReactNode;
  contentClassName?: string;
  statusBarTickerOverride?: string;
  showInstallPrompt?: boolean;
  showMobileBottomNav?: boolean;
  showWorkspaceControls?: boolean;
  /** Workspace preset (absorbs the old WorkspaceControlBar). */
  preset: WorkspacePreset;
  onPresetChange: (preset: WorkspacePreset) => void;
  /** Context rail (per-layout right rail). */
  rightRailEnabled: boolean;
  rightRailOpen: boolean;
  onToggleRightRail: () => void;
  rightRailContent?: ReactNode;
};

/**
 * AppShell (R2) — the one global application frame:
 *
 *   [sidebar tree] │ [global bar]
 *                   [ticker tape]
 *                   [persistent context bar]
 *                   [content + optional context rail]
 *                   [status bar]
 *
 * Consolidates the old IconRail + Sidebar + TopBar + CommandBar +
 * WorkspaceControlBar into a single chrome. Every page renders inside it;
 * overlays (palette, HUD, toasts, shortcuts) mount once at shell level.
 */
export function AppShell({
  children,
  contentClassName = "",
  statusBarTickerOverride,
  showInstallPrompt = false,
  showMobileBottomNav = false,
  showWorkspaceControls = true,
  preset,
  onPresetChange,
  rightRailEnabled,
  rightRailOpen,
  onToggleRightRail,
  rightRailContent,
}: Props) {
  const tickerTapeVisible = useUiStore((s) => s.tickerTapeVisible);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const location = useLocation();

  // R4: remember the active workspace so the next session returns here.
  useEffect(() => {
    const path = location.pathname;
    if (path === "/" || ["/login", "/register", "/forgot-access"].includes(path)) return;
    useContextStore.getState().setLastPath(path);
  }, [location.pathname]);

  // Ctrl/Cmd+B toggles the sidebar (standard shell convention).
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "b") {
        const target = event.target as HTMLElement | null;
        const isEditable =
          target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
        if (isEditable) return;
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleSidebar]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-terminal-bg text-terminal-text">
      <div className="hidden sm:flex">
        <AppShellSidebar />
      </div>

      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <AppShellBar
          preset={preset}
          onPresetChange={onPresetChange}
          showWorkspaceControls={showWorkspaceControls}
          rightRailEnabled={rightRailEnabled}
          rightRailOpen={rightRailOpen}
          onToggleRightRail={onToggleRightRail}
        />
        {tickerTapeVisible ? <TickerTape /> : null}
        <AppShellContextBar />
        <div className="min-h-0 flex flex-1 overflow-hidden">
          <ErrorBoundary>
            <div className={`relative z-0 min-h-0 min-w-0 flex-1 overflow-auto ${contentClassName}`.trim()}>
              {children}
            </div>
          </ErrorBoundary>
          {rightRailEnabled && rightRailOpen ? rightRailContent : null}
        </div>
        <StatusBar tickerOverride={statusBarTickerOverride} />
      </div>

      {showInstallPrompt ? <InstallPromptBanner /> : null}
      {showMobileBottomNav ? <MobileBottomNav /> : null}
      <HotKeyPanelFloat />
      <CommandPalette />
      <HudOverlay />
      <AlertToasts />
      <ShortcutOverlay />
    </div>
  );
}
