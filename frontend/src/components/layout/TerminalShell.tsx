import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { useNotificationStore } from "../../store/notificationStore";
import { WORKSPACE_PRESET_STORAGE_KEY } from "../../workspace/presets";
import { AppShell } from "./appshell/AppShell";

export type WorkspacePreset = "trader" | "quant" | "pm" | "risk" | "ops";

type TerminalShellContextValue = {
  preset: WorkspacePreset;
  setPreset: (preset: WorkspacePreset) => void;
  rightRailOpen: boolean;
  setRightRailOpen: (open: boolean) => void;
  toggleRightRail: () => void;
};

const TerminalShellContext = createContext<TerminalShellContextValue | null>(null);

type RightRailSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type Props = {
  children: ReactNode;
  contentClassName?: string;
  hideTickerLoader?: boolean;
  statusBarTickerOverride?: string;
  showInstallPrompt?: boolean;
  showMobileBottomNav?: boolean;
  workspacePresetStorageKey?: string;
  defaultPreset?: WorkspacePreset;
  showWorkspaceControls?: boolean;
  rightRailTitle?: string;
  rightRailSections?: RightRailSection[];
  rightRailContent?: ReactNode;
  defaultRightRailOpen?: boolean;
  rightRailStorageKey?: string;
};

function usePersistedState<T>(storageKey: string | undefined, fallback: T): [T, (next: T) => void] {
  const [value, setValue] = useState<T>(() => {
    if (!storageKey) return fallback;
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  });

  const setNext = (next: T) => {
    setValue(next);
    if (!storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // storage unavailable — state still works for this session
    }
  };

  return [value, setNext];
}

function DefaultRightRail({ title, sections }: { title: string; sections: RightRailSection[] }) {
  return (
    <aside
      aria-label={title}
      className="hidden w-72 shrink-0 overflow-y-auto border-l border-terminal-border bg-terminal-panel/60 p-2 xl:block"
    >
      <p className="ot-type-label px-1 pb-2 uppercase tracking-[0.14em] text-terminal-muted">{title}</p>
      {sections.length === 0 ? (
        <p className="px-1 text-[10px] text-terminal-muted">No context sections configured.</p>
      ) : (
        sections.map((section) => (
          <section key={section.id} className="mb-3 rounded-sm border border-terminal-border bg-terminal-panel p-2">
            <p className="ot-type-label mb-1 uppercase tracking-wide text-terminal-accent">{section.title}</p>
            <div className="text-[10px] leading-relaxed text-terminal-muted">{section.content}</div>
          </section>
        ))
      )}
    </aside>
  );
}

/**
 * TerminalShell (R2) — thin compatibility wrapper over the AppShell.
 *
 * Keeps the pre-R2 public API (preset + right-rail props, context) so every
 * layout consumer (Equity, FNO, Backtesting, Account, Home, Terminal) works
 * unchanged, while the chrome itself is the consolidated AppShell.
 */
export function TerminalShell({
  children,
  contentClassName = "",
  statusBarTickerOverride,
  showInstallPrompt = false,
  showMobileBottomNav = false,
  workspacePresetStorageKey,
  defaultPreset = "trader",
  showWorkspaceControls = true,
  rightRailTitle = "Context Rail",
  rightRailSections,
  rightRailContent,
  defaultRightRailOpen = false,
  rightRailStorageKey,
}: Props) {
  // NOTE: `hideTickerLoader` is accepted for API compatibility (R1 contract)
  // — the old TopBar search loader it controlled no longer exists; search is
  // owned by the command palette.
  const [preset, setPreset] = usePersistedState<WorkspacePreset>(
    workspacePresetStorageKey ?? WORKSPACE_PRESET_STORAGE_KEY,
    defaultPreset,
  );
  const [rightRailOpen, setRightRailOpen] = usePersistedState<boolean>(
    rightRailStorageKey,
    defaultRightRailOpen,
  );
  const fetchUnreadCount = useNotificationStore((s) => s.fetchUnreadCount);

  useKeyboardShortcuts();

  const hasRightRail = Boolean(rightRailContent) || Boolean(rightRailSections?.length);

  const shellCtx = useMemo<TerminalShellContextValue>(
    () => ({
      preset,
      setPreset,
      rightRailOpen,
      setRightRailOpen,
      toggleRightRail: () => setRightRailOpen(!rightRailOpen),
    }),
    [preset, setPreset, rightRailOpen, setRightRailOpen],
  );

  useEffect(() => {
    void fetchUnreadCount();
    const timer = window.setInterval(() => {
      void fetchUnreadCount();
    }, 30_000);
    return () => window.clearInterval(timer);
  }, [fetchUnreadCount]);

  // Preset changes broadcast to workspace consumers (pre-R2 contract).
  const applyPreset = (nextPreset: WorkspacePreset) => {
    setPreset(nextPreset);
    window.dispatchEvent(new CustomEvent("ot:preset-change", { detail: nextPreset }));
  };

  return (
    <TerminalShellContext.Provider value={shellCtx}>
      <AppShell
        contentClassName={contentClassName}
        statusBarTickerOverride={statusBarTickerOverride}
        showInstallPrompt={showInstallPrompt}
        showMobileBottomNav={showMobileBottomNav}
        showWorkspaceControls={showWorkspaceControls}
        preset={preset}
        onPresetChange={applyPreset}
        rightRailEnabled={hasRightRail}
        rightRailOpen={rightRailOpen}
        onToggleRightRail={() => setRightRailOpen(!rightRailOpen)}
        rightRailContent={
          rightRailContent ?? <DefaultRightRail title={rightRailTitle} sections={rightRailSections ?? []} />
        }
      >
        {children}
      </AppShell>
    </TerminalShellContext.Provider>
  );
}

export function useTerminalShellWorkspace() {
  const ctx = useContext(TerminalShellContext);
  if (!ctx) {
    throw new Error("useTerminalShellWorkspace must be used within TerminalShell");
  }
  return ctx;
}
