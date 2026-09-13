import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

import { useUiStore } from "../../../store/uiStore";
import { useSettingsStore, type ThemeVariant } from "../../../store/settingsStore";
import { NotificationBell } from "../../notifications/NotificationBell";
import { UserAccountPanel } from "../UserAccountPanel";
import { TerminalSelect } from "../../terminal/TerminalSelect";
import { openCommandPalette } from "./paletteBus";
import { TABULAR_CLASS } from "../../../design/tokens";
import type { WorkspacePreset } from "../TerminalShell";

const PRESET_OPTIONS: Array<{ id: WorkspacePreset; label: string }> = [
  { id: "trader", label: "Trader" },
  { id: "quant", label: "Quant" },
  { id: "pm", label: "PM" },
  { id: "risk", label: "Risk" },
  { id: "ops", label: "Ops" },
];

const THEME_OPTIONS: Array<{ value: ThemeVariant; label: string }> = [
  { value: "terminal-noir", label: "Terminal Noir" },
  { value: "classic-bloomberg", label: "Classic Bloomberg" },
  { value: "light-desk", label: "Light Desk" },
  { value: "custom", label: "Custom" },
];

/** Tiny accessible popover: trigger + panel, Escape/outside-click to close. */
function Popover({
  label,
  title,
  children,
  align = "right",
  buttonClassName = "",
}: {
  label: ReactNode;
  title: string;
  children: ReactNode;
  align?: "left" | "right";
  buttonClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        title={title}
        aria-label={title}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex h-6 items-center gap-1 rounded-sm border border-terminal-border px-1.5 text-[10px] text-terminal-muted hover:border-terminal-accent/50 hover:text-terminal-text ${buttonClassName}`}
      >
        {label}
      </button>
      {open ? (
        <div
          role="dialog"
          aria-label={title}
          className={`absolute top-7 z-40 w-56 rounded-sm border border-terminal-border bg-terminal-panel p-2 shadow-lg ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

type Props = {
  preset: WorkspacePreset;
  onPresetChange: (preset: WorkspacePreset) => void;
  showWorkspaceControls: boolean;
  rightRailEnabled: boolean;
  rightRailOpen: boolean;
  onToggleRightRail: () => void;
};

/**
 * The one compact global bar (R2): brand, federated search trigger (⌘K),
 * workspace preset, view settings (theme / HUD / density / ticker tape),
 * notifications, and account. Absorbs TopBar, CommandBar and the old
 * WorkspaceControlBar — no page-level chrome duplication.
 */
export function AppShellBar({
  preset,
  onPresetChange,
  showWorkspaceControls,
  rightRailEnabled,
  rightRailOpen,
  onToggleRightRail,
}: Props) {
  const sidebarCollapsed = useUiStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const density = useUiStore((s) => s.density);
  const toggleDensity = useUiStore((s) => s.toggleDensity);
  const tickerTapeVisible = useUiStore((s) => s.tickerTapeVisible);
  const setTickerTapeVisible = useUiStore((s) => s.setTickerTapeVisible);

  const themeVariant = useSettingsStore((s) => s.themeVariant);
  const setThemeVariant = useSettingsStore((s) => s.setThemeVariant);
  const customAccentColor = useSettingsStore((s) => s.customAccentColor);
  const setCustomAccentColor = useSettingsStore((s) => s.setCustomAccentColor);
  const hudOverlayEnabled = useSettingsStore((s) => s.hudOverlayEnabled);
  const setHudOverlayEnabled = useSettingsStore((s) => s.setHudOverlayEnabled);

  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

  return (
    <header
      role="banner"
      className="flex h-9 shrink-0 items-center gap-2 border-b border-terminal-border bg-terminal-panel px-2"
    >
      <button
        type="button"
        onClick={toggleSidebar}
        aria-label={sidebarCollapsed ? "Expand navigation sidebar" : "Collapse navigation sidebar"}
        aria-expanded={!sidebarCollapsed}
        title="Toggle sidebar (Ctrl+B)"
        className="inline-flex h-6 w-6 items-center justify-center rounded-sm border border-terminal-border text-[11px] text-terminal-muted hover:border-terminal-accent/50 hover:text-terminal-text"
      >
        ☰
      </button>

      <Link
        to="/"
        className="inline-flex h-6 items-center gap-1.5 rounded-sm border border-terminal-border bg-terminal-bg px-1.5"
        aria-label="ARQOS home"
        title="ARQOS home"
      >
        <img src="/favicon.png" alt="" className="h-4 w-4 object-contain" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terminal-accent">ARQOS</span>
      </Link>

      {/* Federated search trigger — the palette owns execution (⌘K / "/"). */}
      <button
        type="button"
        onClick={openCommandPalette}
        aria-label="Search markets, commands and pages"
        className="mx-1 flex h-6 max-w-md flex-1 items-center gap-2 rounded-sm border border-terminal-border bg-terminal-bg px-2 text-left text-[11px] text-terminal-muted hover:border-terminal-accent/50"
      >
        <span aria-hidden="true">⌕</span>
        <span className="truncate">Search markets, commands, pages…</span>
        <span className="ml-auto shrink-0 rounded-sm border border-terminal-border px-1 text-[9px] uppercase text-terminal-muted/80" aria-hidden="true">
          {isMac ? "⌘K" : "Ctrl K"}
        </span>
      </button>

      <div className="ml-auto flex items-center gap-1.5">
        {showWorkspaceControls ? (
          <label className="hidden items-center gap-1 text-[10px] text-terminal-muted sm:inline-flex" title="Workspace preset">
            <span className="uppercase tracking-wide">Preset</span>
            <TerminalSelect
              size="sm"
              tone="ui"
              className="min-w-24"
              value={preset}
              onChange={(e) => onPresetChange(e.target.value as WorkspacePreset)}
              aria-label="Workspace preset"
            >
              {PRESET_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </TerminalSelect>
          </label>
        ) : null}

        <button
          type="button"
          onClick={toggleDensity}
          aria-label={`Density: ${density}. Click to switch.`}
          title={`Row density: ${density} (global, persisted)`}
          className={`inline-flex h-6 items-center rounded-sm border px-1.5 text-[10px] uppercase ${
            density === "compact"
              ? "border-terminal-accent text-terminal-accent"
              : "border-terminal-border text-terminal-muted hover:text-terminal-text"
          }`}
        >
          <span className={TABULAR_CLASS}>{density === "compact" ? "Compact" : "Normal"}</span>
        </button>

        <Popover label={<span aria-hidden="true">◷ View</span>} title="View settings">
          <div className="flex flex-col gap-2">
            <label className="flex items-center justify-between gap-2 text-[10px] text-terminal-muted">
              Theme
              <TerminalSelect
                size="sm"
                tone="ui"
                className="min-w-32"
                value={themeVariant}
                onChange={(e) => setThemeVariant(e.target.value as ThemeVariant)}
                aria-label="Theme"
              >
                {THEME_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TerminalSelect>
            </label>
            {themeVariant === "custom" ? (
              <label className="flex items-center justify-between gap-2 text-[10px] text-terminal-muted">
                Accent
                <input
                  type="color"
                  className="h-6 w-10 cursor-pointer rounded-sm border border-terminal-border bg-transparent p-0"
                  aria-label="Custom accent color"
                  value={customAccentColor}
                  onChange={(e) => setCustomAccentColor(e.target.value)}
                />
              </label>
            ) : null}
            <button
              type="button"
              onClick={() => setHudOverlayEnabled(!hudOverlayEnabled)}
              aria-pressed={hudOverlayEnabled}
              className={`rounded-sm border px-2 py-1 text-left text-[10px] ${
                hudOverlayEnabled
                  ? "border-terminal-accent text-terminal-accent"
                  : "border-terminal-border text-terminal-muted hover:text-terminal-text"
              }`}
            >
              HUD overlay: {hudOverlayEnabled ? "On" : "Off"}
            </button>
            <button
              type="button"
              onClick={() => setTickerTapeVisible(!tickerTapeVisible)}
              aria-pressed={tickerTapeVisible}
              className={`rounded-sm border px-2 py-1 text-left text-[10px] ${
                tickerTapeVisible
                  ? "border-terminal-accent text-terminal-accent"
                  : "border-terminal-border text-terminal-muted hover:text-terminal-text"
              }`}
            >
              Ticker tape: {tickerTapeVisible ? "Visible" : "Hidden"}
            </button>
          </div>
        </Popover>

        {rightRailEnabled ? (
          <button
            type="button"
            onClick={onToggleRightRail}
            aria-label={rightRailOpen ? "Hide context rail" : "Show context rail"}
            aria-pressed={rightRailOpen}
            title="Toggle context rail"
            className={`hidden h-6 items-center rounded-sm border px-1.5 text-[10px] xl:inline-flex ${
              rightRailOpen
                ? "border-terminal-accent text-terminal-accent"
                : "border-terminal-border text-terminal-muted hover:text-terminal-text"
            }`}
          >
            Rail
          </button>
        ) : null}

        <NotificationBell />

        <Popover label={<span aria-hidden="true">👤</span>} title="Account">
          <UserAccountPanel />
        </Popover>
      </div>
    </header>
  );
}
