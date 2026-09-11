import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Timeframe } from '../services/symbols';

export type ViewId =
  | 'markets' | 'chart' | 'orderflow' | 'trade' | 'portfolio'
  | 'scanner' | 'strategies' | 'backtest' | 'intel' | 'ai' | 'settings';

export type RightTab = 'ticket' | 'symbol' | 'alerts' | 'news';
export type BottomTab = 'positions' | 'orders' | 'history' | 'fills' | 'log';

export interface WorkspacePreset {
  id: string;
  name: string;
  view: ViewId;
  symbol: string;
  timeframe: Timeframe;
  rightOpen: boolean;
  bottomOpen: boolean;
}

interface WorkspaceState {
  view: ViewId;
  symbol: string;
  timeframe: Timeframe;
  chartType: 'candles' | 'bars' | 'line' | 'area' | 'hollow' | 'heikin';
  leftCollapsed: boolean;
  rightOpen: boolean;
  rightTab: RightTab;
  rightWidth: number;
  bottomOpen: boolean;
  bottomTab: BottomTab;
  bottomHeight: number;
  paletteOpen: boolean;
  activePreset: string;
  presets: WorkspacePreset[];
  indicators: Record<string, boolean | number | string>;
  drawingsVisible: boolean;
  density: 'compact' | 'comfortable';

  setView: (v: ViewId) => void;
  setSymbol: (s: string) => void;
  setTimeframe: (t: Timeframe) => void;
  setChartType: (t: WorkspaceState['chartType']) => void;
  toggleLeft: () => void;
  setRightOpen: (o: boolean) => void;
  setRightTab: (t: RightTab) => void;
  setRightWidth: (w: number) => void;
  nudgeRight: (d: number) => void;
  setBottomOpen: (o: boolean) => void;
  setBottomTab: (t: BottomTab) => void;
  setBottomHeight: (h: number) => void;
  nudgeBottom: (d: number) => void;
  setPalette: (o: boolean) => void;
  setIndicator: (k: string, v: boolean | number | string) => void;
  toggleDrawings: () => void;
  setDensity: (d: 'compact' | 'comfortable') => void;
  applyPreset: (id: string) => void;
  savePreset: (name: string) => void;
  deletePreset: (id: string) => void;
}

const DEFAULT_PRESETS: WorkspacePreset[] = [
  { id: 'p-main', name: 'Main', view: 'markets', symbol: 'BTCUSDT', timeframe: '15m', rightOpen: true, bottomOpen: true },
  { id: 'p-day', name: 'Day Trading', view: 'chart', symbol: 'NVDA', timeframe: '5m', rightOpen: true, bottomOpen: true },
  { id: 'p-flow', name: 'Order Flow', view: 'orderflow', symbol: 'ES', timeframe: '1m', rightOpen: false, bottomOpen: true },
  { id: 'p-crypto', name: 'Crypto', view: 'markets', symbol: 'ETHUSDT', timeframe: '1h', rightOpen: true, bottomOpen: false },
  { id: 'p-exec', name: 'Execution', view: 'trade', symbol: 'BTCUSDT', timeframe: '1m', rightOpen: true, bottomOpen: true },
  { id: 'p-research', name: 'Research', view: 'backtest', symbol: 'SPY', timeframe: '1D', rightOpen: false, bottomOpen: false },
];

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      view: 'markets',
      symbol: 'BTCUSDT',
      timeframe: '15m',
      chartType: 'candles',
      leftCollapsed: false,
      rightOpen: true,
      rightTab: 'ticket',
      rightWidth: 300,
      bottomOpen: true,
      bottomTab: 'positions',
      bottomHeight: 212,
      paletteOpen: false,
      activePreset: 'p-main',
      presets: DEFAULT_PRESETS,
      drawingsVisible: true,
      density: 'compact',
      indicators: {
        ema9: true, ema21: true, ema50: false, sma200: false,
        vwap: true, bb: false, volume: true, rsi: true, macd: false,
      },

      setView: (view) => set({ view }),
      setSymbol: (symbol) => set({ symbol }),
      setTimeframe: (timeframe) => set({ timeframe }),
      setChartType: (chartType) => set({ chartType }),
      toggleLeft: () => set((s) => ({ leftCollapsed: !s.leftCollapsed })),
      setRightOpen: (rightOpen) => set({ rightOpen }),
      setRightTab: (rightTab) => set({ rightTab, rightOpen: true }),
      setRightWidth: (rightWidth) => set({ rightWidth: Math.min(480, Math.max(240, rightWidth)) }),
      nudgeRight: (d) => set((s) => ({ rightWidth: Math.min(480, Math.max(240, s.rightWidth - d)) })),
      setBottomOpen: (bottomOpen) => set({ bottomOpen }),
      setBottomTab: (bottomTab) => set({ bottomTab, bottomOpen: true }),
      setBottomHeight: (bottomHeight) => set({ bottomHeight: Math.min(520, Math.max(120, bottomHeight)) }),
      nudgeBottom: (d) => set((s) => ({ bottomHeight: Math.min(520, Math.max(120, s.bottomHeight - d)) })),
      setPalette: (paletteOpen) => set({ paletteOpen }),
      setIndicator: (k, v) => set((s) => ({ indicators: { ...s.indicators, [k]: v } })),
      toggleDrawings: () => set((s) => ({ drawingsVisible: !s.drawingsVisible })),
      setDensity: (density) => set({ density }),

      applyPreset: (id) => {
        const p = get().presets.find((x) => x.id === id);
        if (!p) return;
        set({
          activePreset: id, view: p.view, symbol: p.symbol, timeframe: p.timeframe,
          rightOpen: p.rightOpen, bottomOpen: p.bottomOpen,
        });
      },
      savePreset: (name) => {
        const s = get();
        const id = `p-${Date.now().toString(36)}`;
        const preset: WorkspacePreset = {
          id, name, view: s.view, symbol: s.symbol, timeframe: s.timeframe,
          rightOpen: s.rightOpen, bottomOpen: s.bottomOpen,
        };
        set({ presets: [...s.presets, preset], activePreset: id });
      },
      deletePreset: (id) => set((s) => ({
        presets: s.presets.filter((p) => p.id !== id),
        activePreset: s.activePreset === id ? 'p-main' : s.activePreset,
      })),
    }),
    {
      name: 'traderos-workspace',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        symbol: s.symbol, timeframe: s.timeframe, chartType: s.chartType,
        leftCollapsed: s.leftCollapsed, rightOpen: s.rightOpen, rightWidth: s.rightWidth,
        bottomOpen: s.bottomOpen, bottomHeight: s.bottomHeight,
        activePreset: s.activePreset, presets: s.presets,
        indicators: s.indicators, density: s.density,
      }),
    }
  )
);
