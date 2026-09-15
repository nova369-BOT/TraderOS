import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Quantum Core terminal state — explicit ownership for the workstation
 * context (directive §33).
 *
 * Persisted (localStorage, single mechanism, key `ot:terminal:v1`):
 *   - selected paper portfolio id (account context)
 *   - watchlist favorites
 *   - active tab per panel
 *
 * Session-only:
 *   - selected order / position ids
 *
 * Instrument/market context is NOT duplicated here — it lives in
 * marketContextStore (which delegates to stockStore/settingsStore), keeping a
 * single source of truth for the whole application.
 */

export type MarketDataTab = "chart" | "fundamentals" | "holdings" | "news";
export type OrdersTab = "live" | "history";
export type AccountTab = "balances" | "positions";

type TerminalState = {
  /** Paper portfolio (account) the terminal acts for. */
  /** @deprecated R4: the active account now lives in contextStore (ot:ctx:v1).
   *  Kept only so pre-R4 sessions migrate via ContextSync; product code must
   *  read contextStore.accountPortfolioId. */
  selectedPortfolioId: string | null;
  selectPortfolio: (id: string | null) => void;

  /** Favorite watchlist tickers (upper-cased). */
  favorites: string[];
  toggleFavorite: (ticker: string) => void;

  /** Active tab per panel. */
  marketDataTab: MarketDataTab;
  setMarketDataTab: (tab: MarketDataTab) => void;
  ordersTab: OrdersTab;
  setOrdersTab: (tab: OrdersTab) => void;
  accountTab: AccountTab;
  setAccountTab: (tab: AccountTab) => void;

  /** Session-only selections. */
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
  selectedPositionId: string | null;
  setSelectedPositionId: (id: string | null) => void;
};

export const TERMINAL_STORAGE_KEY = "ot:terminal:v1";

export const useTerminalStore = create<TerminalState>()(
  persist(
    (set, get) => ({
      selectedPortfolioId: null,
      selectPortfolio: (id) => set({ selectedPortfolioId: id }),

      favorites: [],
      toggleFavorite: (ticker) => {
        const key = ticker.trim().toUpperCase();
        if (!key) return;
        const current = get().favorites;
        set({
          favorites: current.includes(key)
            ? current.filter((t) => t !== key)
            : [...current, key],
        });
      },

      marketDataTab: "chart",
      setMarketDataTab: (tab) => set({ marketDataTab: tab }),
      ordersTab: "live",
      setOrdersTab: (tab) => set({ ordersTab: tab }),
      accountTab: "balances",
      setAccountTab: (tab) => set({ accountTab: tab }),

      selectedOrderId: null,
      setSelectedOrderId: (id) => set({ selectedOrderId: id }),
      selectedPositionId: null,
      setSelectedPositionId: (id) => set({ selectedPositionId: id }),
    }),
    {
      name: TERMINAL_STORAGE_KEY,
      partialize: (state) => ({
        selectedPortfolioId: state.selectedPortfolioId,
        favorites: state.favorites,
        marketDataTab: state.marketDataTab,
        ordersTab: state.ordersTab,
        accountTab: state.accountTab,
      }),
    },
  ),
);

/** Layout persistence keys for the Quantum Core split panes (§53). */
export const LAYOUT_KEYS = {
  leftColumn: "ot:qc:split:left:v1",
  rightColumn: "ot:qc:split:right:v1",
  leftRows: "ot:qc:split:left-rows:v1",
  centerRows: "ot:qc:split:center-rows:v1",
} as const;
