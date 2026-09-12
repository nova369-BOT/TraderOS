import { useCallback, useEffect, useRef } from "react";

import { TerminalShell } from "../components/layout/TerminalShell";
import { SplitPane } from "../components/layout/SplitPane";
import { TerminalContextBar } from "./components/TerminalContextBar";
import { WatchlistPanel } from "./components/WatchlistPanel";
import { OrderEntryPanel } from "./components/OrderEntryPanel";
import { MarketDataPanel } from "./components/MarketDataPanel";
import { OrdersPanel } from "./components/OrdersPanel";
import { AccountPanel } from "./components/AccountPanel";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { LAYOUT_KEYS } from "./store/terminalStore";

/**
 * QUANTUM CORE TERMINAL FOUNDATION (directive §2, §12).
 *
 * Global application bar  → provided by TerminalShell (TopBar, palette, status bar)
 * Terminal context        → TerminalContextBar
 * Three-column workspace → SplitPane-based resizable columns
 *
 *   LEFT                CENTER                    RIGHT
 *   Watchlist           Market Data (chart…)      Account
 *   Order Entry         Orders                    Positions
 *
 * Columns resize with bounded minima, persist their ratios, and collapse to
 * a single scrolling column below the desktop breakpoint (§13, §36, §60).
 */

const DESKTOP_QUERY = "(min-width: 1180px)";

export function QuantumTerminalPage() {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const watchlistSearchRef = useRef<HTMLInputElement | null>(null);

  const registerSearchRef = useCallback((ref: HTMLInputElement | null) => {
    watchlistSearchRef.current = ref;
  }, []);

  // Keyboard foundation (§44): "/" focuses the watchlist instrument search.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const typing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target?.isContentEditable;
      if (typing) return;
      event.preventDefault();
      watchlistSearchRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const leftColumn = (
    <SplitPane
      orientation="horizontal"
      initialRatio={55}
      minPrimaryPct={25}
      minSecondaryPct={25}
      storageKey={LAYOUT_KEYS.leftRows}
      primary={<WatchlistPanel registerSearchRef={registerSearchRef} />}
      secondary={<OrderEntryPanel />}
      className="h-full min-h-0"
    />
  );

  const centerColumn = (
    <SplitPane
      orientation="horizontal"
      initialRatio={62}
      minPrimaryPct={25}
      minSecondaryPct={20}
      storageKey={LAYOUT_KEYS.centerRows}
      primary={<MarketDataPanel />}
      secondary={<OrdersPanel />}
      className="h-full min-h-0"
    />
  );

  const rightColumn = <AccountPanel />;

  const workspace = isDesktop ? (
    <SplitPane
      orientation="vertical"
      initialRatio={24}
      minPrimaryPct={16}
      minSecondaryPct={30}
      storageKey={LAYOUT_KEYS.leftColumn}
      primary={leftColumn}
      secondary={
        <SplitPane
          orientation="vertical"
          initialRatio={72}
          minPrimaryPct={40}
          minSecondaryPct={14}
          storageKey={LAYOUT_KEYS.rightColumn}
          primary={centerColumn}
          secondary={rightColumn}
          className="h-full min-h-0"
        />
      }
      className="h-full min-h-0"
    />
  ) : (
    // Narrow viewports (§60): single column, fixed section heights, each
    // region owns its scrolling — no body scroll (§51).
    <div className="flex h-full min-h-0 flex-col gap-1.5 overflow-y-auto p-1.5">
      <section className="h-64 shrink-0">
        <WatchlistPanel registerSearchRef={registerSearchRef} />
      </section>
      <section className="h-72 shrink-0">
        <OrderEntryPanel />
      </section>
      <section className="h-[28rem] shrink-0">
        <MarketDataPanel />
      </section>
      <section className="h-64 shrink-0">
        <OrdersPanel />
      </section>
      <section className="h-80 shrink-0">
        <AccountPanel />
      </section>
    </div>
  );

  return (
    <TerminalShell
      contentClassName="bg-terminal-bg"
      hideTickerLoader
      statusBarTickerOverride="TERMINAL"
    >
      <div className="flex h-full min-h-0 flex-col bg-terminal-bg">
        <TerminalContextBar />
        <main className="min-h-0 flex-1 p-1.5">{workspace}</main>
      </div>
    </TerminalShell>
  );
}
