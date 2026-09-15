import { useEffect } from "react";

import { useContextStore } from "../store/contextStore";
import { useStockStore } from "../store/stockStore";
import { useTerminalStore } from "../terminal/store/terminalStore";

/**
 * ContextSync (R4) — bridges the persisted context of record (contextStore)
 * and the runtime owners.
 *
 * On mount: hydrate the runtime instrument from the persisted context so the
 * app comes back exactly where the user left it (instrument survives reload).
 * While running: mirror every instrument selection into the persisted context
 * (stockStore is the single runtime owner — all selection paths delegate to
 * it, so this one subscription covers watchlist, palette, context bar, URLs).
 *
 * The active account lives directly in contextStore (no bridge needed).
 */

let hydrated = false;

export function ContextSync() {
  // Hydrate once per page load — before any panel reads the instrument.
  useEffect(() => {
    if (hydrated) return;
    hydrated = true;
    const persistedInstrument = useContextStore.getState().instrument;
    if (persistedInstrument) {
      const current = useStockStore.getState().ticker;
      if (current !== persistedInstrument) {
        useStockStore.getState().setTicker(persistedInstrument);
      }
    }
  }, []);

  // Mirror runtime instrument selections → persisted context of record.
  useEffect(() => {
    const unsubscribe = useStockStore.subscribe((state, previous) => {
      if (state.ticker !== previous.ticker) {
        const next = state.ticker.trim().toUpperCase() || null;
        if (useContextStore.getState().instrument !== next) {
          useContextStore.getState().setInstrument(next);
        }
      }
    });
    return unsubscribe;
  }, []);

  // Legacy bridge: any residual writer to the old terminal-store account field
  // (pre-R4 bookmarks / tests) is mirrored into the context of record.
  useEffect(() => {
    const unsubscribe = useTerminalStore.subscribe((state, previous) => {
      if (state.selectedPortfolioId !== previous.selectedPortfolioId) {
        if (useContextStore.getState().accountPortfolioId !== state.selectedPortfolioId) {
          useContextStore.getState().setAccountPortfolioId(state.selectedPortfolioId);
        }
      }
    });
    return unsubscribe;
  }, []);

  return null;
}
