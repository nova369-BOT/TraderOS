import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  runBacktest, templateStrategies,
  type BacktestConfig, type BacktestResult, type BuiltStrategy, type RuleSet,
} from '../services/backtestService';
import type { Timeframe } from '../services/symbols';

export interface ScanFilter {
  id: string;
  field: 'changePct' | 'volume' | 'relVol' | 'rsi' | 'atrPct' | 'priceVsSma50' | 'gapPct' | 'price';
  op: '>' | '<' | 'between';
  v1: number;
  v2: number;
}

interface ResearchState {
  strategies: BuiltStrategy[];
  activeStrategyId: string;
  backtests: BacktestResult[];
  compareIds: string[];
  running: boolean;
  progress: number;
  scanFilters: ScanFilter[];
  scanPreset: string;

  setActiveStrategy: (id: string) => void;
  updateStrategyRules: (id: string, rules: RuleSet) => void;
  updateStrategyMeta: (id: string, patch: Partial<BuiltStrategy>) => void;
  addStrategy: (s: BuiltStrategy) => void;
  duplicateStrategy: (id: string) => void;
  deleteStrategy: (id: string) => void;
  runBacktestAsync: (cfg: BacktestConfig) => void;
  toggleCompare: (id: string) => void;
  clearBacktests: () => void;
  setScanFilters: (f: ScanFilter[]) => void;
  setScanPreset: (p: string) => void;
}

function initialStrategies(): BuiltStrategy[] {
  return templateStrategies('BTCUSDT', '1h');
}

export const useResearchStore = create<ResearchState>()(
  persist(
    (set, get) => ({
  strategies: initialStrategies(),
  activeStrategyId: 'tpl-trend-ema',
  backtests: [],
  compareIds: [],
  running: false,
  progress: 0,
  scanPreset: 'Momentum',
  scanFilters: [
    { id: 'f1', field: 'changePct', op: '>', v1: 1.5, v2: 0 },
    { id: 'f2', field: 'relVol', op: '>', v1: 1.2, v2: 0 },
    { id: 'f3', field: 'rsi', op: 'between', v1: 55, v2: 80 },
  ],

  setActiveStrategy: (activeStrategyId) => set({ activeStrategyId }),
  updateStrategyRules: (id, rules) => set((s) => ({
    strategies: s.strategies.map((x) => (x.id === id ? { ...x, rules, updatedAt: Date.now() } : x)),
  })),
  updateStrategyMeta: (id, patch) => set((s) => ({
    strategies: s.strategies.map((x) => (x.id === id ? { ...x, ...patch, updatedAt: Date.now() } : x)),
  })),
  addStrategy: (s) => set((st) => ({ strategies: [...st.strategies, s], activeStrategyId: s.id })),
  duplicateStrategy: (id) => set((st) => {
    const src = st.strategies.find((x) => x.id === id);
    if (!src) return {};
    const copy: BuiltStrategy = {
      ...JSON.parse(JSON.stringify(src)),
      id: `strat-${Date.now().toString(36)}`,
      name: `${src.name} (copy)`,
      updatedAt: Date.now(),
    };
    return { strategies: [...st.strategies, copy], activeStrategyId: copy.id };
  }),
  deleteStrategy: (id) => set((st) => ({
    strategies: st.strategies.filter((x) => x.id !== id),
    activeStrategyId: st.activeStrategyId === id ? st.strategies[0]?.id : st.activeStrategyId,
  })),

  runBacktestAsync: (cfg) => {
    if (get().running) return;
    set({ running: true, progress: 4 });
    // chunked fake-progress; engine itself is synchronous and fast
    const steps = [18, 42, 68, 88];
    steps.forEach((p, i) => setTimeout(() => set({ progress: p }), 120 * (i + 1)));
    setTimeout(() => {
      try {
        const result = runBacktest(cfg);
        set((s) => ({ backtests: [result, ...s.backtests].slice(0, 24), running: false, progress: 100 }));
        setTimeout(() => set({ progress: 0 }), 600);
      } catch (e) {
        console.error(e);
        set({ running: false, progress: 0 });
      }
    }, 620);
  },
  toggleCompare: (id) => set((s) => ({
    compareIds: s.compareIds.includes(id)
      ? s.compareIds.filter((x) => x !== id)
      : [...s.compareIds, id].slice(-4),
  })),
  clearBacktests: () => set({ backtests: [], compareIds: [] }),
  setScanFilters: (scanFilters) => set({ scanFilters }),
  setScanPreset: (scanPreset) => set({ scanPreset }),
    }),
    {
      name: 'traderos-research',
      storage: createJSONStorage(() => localStorage),
      // Backtest runs are excluded: equity curves are large and any run is
      // exactly reproducible in one click from its persisted strategy.
      partialize: (s) => ({
        strategies: s.strategies,
        activeStrategyId: s.activeStrategyId,
        scanFilters: s.scanFilters,
        scanPreset: s.scanPreset,
      }),
    }
  )
);

export type { Timeframe };
