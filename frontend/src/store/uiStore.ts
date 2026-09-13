import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { DensityMode } from "../design/tokens";

/**
 * UI shell state (R1: density; R2 extends with sidebar/palette state).
 * Persisted so the user's density preference survives reloads.
 */

const UI_STORAGE_KEY = "ot:ui:v1";

type UiState = {
  density: DensityMode;
  setDensity: (mode: DensityMode) => void;
  toggleDensity: () => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      density: "normal",
      setDensity: (mode) => set({ density: mode }),
      toggleDensity: () => set({ density: get().density === "normal" ? "compact" : "normal" }),
    }),
    { name: UI_STORAGE_KEY, partialize: (state) => ({ density: state.density }) },
  ),
);

export { UI_STORAGE_KEY };
