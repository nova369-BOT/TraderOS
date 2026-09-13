import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { DensityMode } from "../design/tokens";

/**
 * UI shell state (R1: density; R2: sidebar + navigation tree state).
 * Persisted so the user's shell preferences survive reloads.
 */

const UI_STORAGE_KEY = "ot:ui:v1";

type UiState = {
  density: DensityMode;
  setDensity: (mode: DensityMode) => void;
  toggleDensity: () => void;
  /** AppShell sidebar collapsed to icon rail (R2). */
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  /** Collapsed navigation categories, by category id (R2). */
  collapsedNavCategories: Record<string, boolean>;
  toggleNavCategory: (categoryId: string) => void;
  /** Ticker tape visibility in the global bar area (R2). */
  tickerTapeVisible: boolean;
  setTickerTapeVisible: (visible: boolean) => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      density: "normal",
      setDensity: (mode) => set({ density: mode }),
      toggleDensity: () => set({ density: get().density === "normal" ? "compact" : "normal" }),

      sidebarCollapsed: false,
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      toggleSidebar: () => set({ sidebarCollapsed: !get().sidebarCollapsed }),

      collapsedNavCategories: {},
      toggleNavCategory: (categoryId) =>
        set((state) => ({
          collapsedNavCategories: {
            ...state.collapsedNavCategories,
            [categoryId]: !state.collapsedNavCategories[categoryId],
          },
        })),

      tickerTapeVisible: true,
      setTickerTapeVisible: (visible) => set({ tickerTapeVisible: visible }),
    }),
    {
      name: UI_STORAGE_KEY,
      partialize: (state) => ({
        density: state.density,
        sidebarCollapsed: state.sidebarCollapsed,
        collapsedNavCategories: state.collapsedNavCategories,
        tickerTapeVisible: state.tickerTapeVisible,
      }),
    },
  ),
);

export { UI_STORAGE_KEY };
