import { create } from "zustand";

import { useSettingsStore } from "./settingsStore";
import { useStockStore } from "./stockStore";
import { normalizeTicker } from "../utils/ticker";

/**
 * Market Context Engine — the unified "current context" object for the
 * terminal. It deliberately *wraps* (does not duplicate) the authoritative
 * instrument store (`stockStore`) and market setting (`settingsStore`):
 *
 *  - `instrument` / `interval` / `range` mirror `stockStore`
 *  - `market` mirrors `settingsStore.selectedMarket`
 *  - `compare` is the terminal-wide comparison set
 *  - `regime` is the last computed regime snapshot (observed/derived only)
 *  - `updatedAt` drives data-freshness displays
 *
 * Every surface may read this store; writes always delegate to the existing
 * stores so historical behavior is preserved.
 */

export type RegimeLabel =
  | "RISK ON"
  | "RISK OFF"
  | "TRENDING"
  | "MEAN REVERTING"
  | "HIGH VOLATILITY"
  | "LOW VOLATILITY"
  | "BREADTH EXPANSION"
  | "BREADTH CONTRACTION";

export type RegimeSnapshot = {
  label: RegimeLabel;
  /** 0–100 */
  confidence: number;
  /** short human evidence strings (observed facts only) */
  evidence: string[];
  /** "observed" | "derived" — never "ai" unless model-backed */
  basis: "observed" | "derived";
  computedAt: number;
};

export type MarketContextState = {
  instrument: string;
  market: string;
  interval: string;
  range: string;
  compare: string[];
  regime: RegimeSnapshot | null;
  updatedAt: number | null;

  /** Switch the global instrument context (delegates to stockStore). */
  selectInstrument: (ticker: string, opts?: { reload?: boolean }) => Promise<void>;
  /** Change global chart timeframe (delegates to stockStore). */
  setTimeframe: (interval: string, range?: string) => void;
  setCompare: (tickers: string[]) => void;
  addCompare: (ticker: string) => void;
  removeCompare: (ticker: string) => void;
  clearCompare: () => void;
  setRegime: (snapshot: RegimeSnapshot | null) => void;
};

const MAX_COMPARE = 8;

export const useMarketContextStore = create<MarketContextState>()((set, get) => ({
  instrument: useStockStore.getState().ticker,
  market: useSettingsStore.getState().selectedMarket,
  interval: useStockStore.getState().interval,
  range: useStockStore.getState().range,
  compare: [],
  regime: null,
  updatedAt: null,

  selectInstrument: async (ticker, opts) => {
    const reload = opts?.reload ?? true;
    useStockStore.getState().setTicker(ticker);
    if (reload) {
      await useStockStore.getState().load();
    }
  },

  setTimeframe: (interval, range) => {
    useStockStore.getState().setInterval(interval);
    if (range) {
      useStockStore.getState().setRange(range);
    }
    set({ updatedAt: Date.now() });
  },

  setCompare: (tickers) =>
    set({
      compare: Array.from(
        new Set(tickers.map((t) => normalizeTicker(t)).filter(Boolean)),
      ).slice(0, MAX_COMPARE),
      updatedAt: Date.now(),
    }),

  addCompare: (ticker) => {
    const t = normalizeTicker(ticker);
    if (!t) return;
    const { compare } = get();
    if (compare.includes(t) || compare.length >= MAX_COMPARE) return;
    set({ compare: [...compare, t], updatedAt: Date.now() });
  },

  removeCompare: (ticker) => {
    const t = normalizeTicker(ticker);
    set({ compare: get().compare.filter((c) => c !== t), updatedAt: Date.now() });
  },

  clearCompare: () => set({ compare: [], updatedAt: Date.now() }),

  setRegime: (snapshot) => set({ regime: snapshot }),
}));

// --- Mirror the authoritative stores into the context ---------------------

useStockStore.subscribe((state, prev) => {
  if (
    state.ticker !== prev.ticker ||
    state.interval !== prev.interval ||
    state.range !== prev.range ||
    state.loading !== prev.loading
  ) {
    useMarketContextStore.setState({
      instrument: state.ticker,
      interval: state.interval,
      range: state.range,
      updatedAt: state.loading ? useMarketContextStore.getState().updatedAt : Date.now(),
    });
  }
});

useSettingsStore.subscribe((state, prev) => {
  if (state.selectedMarket !== prev.selectedMarket) {
    useMarketContextStore.setState({
      market: state.selectedMarket,
      updatedAt: Date.now(),
    });
  }
});

/** Convenience selector hook-free accessor for non-React code. */
export function getMarketContext() {
  return useMarketContextStore.getState();
}
