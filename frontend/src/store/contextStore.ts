import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * App-wide context of record (R4).
 *
 * The single PERSISTED home for the selections that must survive navigation
 * and reloads:
 *
 * - `instrument` — the active instrument. Runtime owner is `stockStore`
 *   (every selection path already delegates there); ContextSync mirrors the
 *   value here so it persists, and hydrates stockStore on boot.
 * - `accountPortfolioId` — the active paper account. Read/written directly by
 *   every account-aware surface (Order Entry, Account, Positions).
 * - `lastPath` — the last workspace the user visited; RootRedirect restores it.
 *
 * Market/country/currency selections remain in `settingsStore` (already
 * persisted there) — do not duplicate them here.
 */

const CONTEXT_STORAGE_KEY = "ot:ctx:v1";

type ContextState = {
  instrument: string | null;
  setInstrument: (symbol: string | null) => void;
  accountPortfolioId: string | null;
  setAccountPortfolioId: (id: string | null) => void;
  lastPath: string | null;
  setLastPath: (path: string | null) => void;
};

function normalizeSymbol(symbol: string | null): string | null {
  const clean = (symbol ?? "").trim().toUpperCase();
  return clean || null;
}

export const useContextStore = create<ContextState>()(
  persist(
    (set) => ({
      instrument: null,
      setInstrument: (symbol) => set({ instrument: normalizeSymbol(symbol) }),
      accountPortfolioId: null,
      setAccountPortfolioId: (id) => set({ accountPortfolioId: id || null }),
      lastPath: null,
      setLastPath: (path) => set({ lastPath: path || null }),
    }),
    {
      name: CONTEXT_STORAGE_KEY,
      partialize: (state) => ({
        instrument: state.instrument,
        accountPortfolioId: state.accountPortfolioId,
        lastPath: state.lastPath,
      }),
    },
  ),
);

export { CONTEXT_STORAGE_KEY };
