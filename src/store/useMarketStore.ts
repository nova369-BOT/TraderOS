import { create } from 'zustand';
import { marketEngine, type Quote } from '../services/marketEngine';

interface MarketState {
  tick: number;
  latency: number;
  connected: boolean;
  quotes: Record<string, Quote>;
  flash: Record<string, 1 | -1>;
  watchlists: Record<string, string[]>;
  activeWatchlist: string;
  favorites: string[];
  alerts: Array<{ id: string; symbol: string; condition: 'above' | 'below'; price: number; triggered: boolean; createdAt: number }>;
  triggeredAlert: string | null;

  refresh: () => void;
  addWatchlist: (name: string) => void;
  removeWatchlist: (name: string) => void;
  renameWatchlist: (oldN: string, newN: string) => void;
  setActiveWatchlist: (name: string) => void;
  addToWatchlist: (list: string, symbol: string) => void;
  removeFromWatchlist: (list: string, symbol: string) => void;
  moveInWatchlist: (list: string, from: number, to: number) => void;
  toggleFavorite: (symbol: string) => void;
  addAlert: (symbol: string, condition: 'above' | 'below', price: number) => void;
  removeAlert: (id: string) => void;
  dismissAlert: () => void;
}

const DEFAULT_LISTS: Record<string, string[]> = {
  'Main': ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'SPY', 'QQQ', 'NVDA', 'AAPL', 'TSLA', 'MSFT', 'META', 'ES', 'NQ', 'GC', 'EURUSD'],
  'Crypto': ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'XRPUSDT', 'DOGEUSDT', 'ADAUSDT', 'AVAXUSDT', 'LINKUSDT', 'TONUSDT'],
  'Mega Caps': ['AAPL', 'NVDA', 'MSFT', 'TSLA', 'AMZN', 'META', 'GOOGL', 'AMD', 'NFLX', 'CRM', 'COIN', 'PLTR'],
  'Futures': ['ES', 'NQ', 'YM', 'RTY', 'CL', 'GC'],
  'FX': ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 'USDCHF'],
};

function loadLists(): Record<string, string[]> {
  try {
    const raw = localStorage.getItem('traderos-watchlists');
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return DEFAULT_LISTS;
}

function saveLists(lists: Record<string, string[]>): void {
  try { localStorage.setItem('traderos-watchlists', JSON.stringify(lists)); } catch { /* ignore */ }
}

let alertSeq = 1;
let prevPrices: Record<string, number> = {};
let subscribed = false;

export const useMarketStore = create<MarketState>()((set, get) => {
  if (!subscribed && typeof window !== 'undefined') {
    subscribed = true;
    marketEngine.subscribe(() => get().refresh());
    // initial paint
    setTimeout(() => get().refresh(), 0);
  }
  return {
    tick: 0,
    latency: 14,
    connected: true,
    quotes: {},
    flash: {},
    watchlists: loadLists(),
    activeWatchlist: 'Main',
    favorites: ['BTCUSDT', 'NVDA', 'ES'],
    alerts: [],
    triggeredAlert: null,

    refresh: () => {
      const quotes: Record<string, Quote> = {};
      const flash: Record<string, 1 | -1> = {};
      for (const q of marketEngine.getAllQuotes()) {
        quotes[q.symbol] = q;
        const prev = prevPrices[q.symbol];
        if (prev !== undefined && q.price !== prev) flash[q.symbol] = q.price > prev ? 1 : -1;
        prevPrices[q.symbol] = q.price;
      }
      // check alerts
      const alerts = get().alerts;
      let triggeredAlert: string | null = null;
      let alertsChanged = false;
      for (const a of alerts) {
        if (a.triggered) continue;
        const q = quotes[a.symbol];
        if (!q) continue;
        const hit = a.condition === 'above' ? q.price >= a.price : q.price <= a.price;
        if (hit) {
          a.triggered = true;
          alertsChanged = true;
          triggeredAlert = a.id;
        }
      }
      set({
        tick: marketEngine.version,
        latency: marketEngine.latencyMs,
        connected: marketEngine.connected,
        quotes,
        flash,
        ...(alertsChanged ? { alerts: [...alerts], triggeredAlert } : {}),
      });
    },

    addWatchlist: (name) => {
      const lists = { ...get().watchlists, [name]: [] };
      saveLists(lists);
      set({ watchlists: lists, activeWatchlist: name });
    },
    removeWatchlist: (name) => {
      const lists = { ...get().watchlists };
      delete lists[name];
      saveLists(lists);
      set({ watchlists: lists, activeWatchlist: Object.keys(lists)[0] ?? 'Main' });
    },
    renameWatchlist: (oldN, newN) => {
      const lists = { ...get().watchlists };
      lists[newN] = lists[oldN] ?? [];
      delete lists[oldN];
      saveLists(lists);
      set({ watchlists: lists, activeWatchlist: newN });
    },
    setActiveWatchlist: (activeWatchlist) => set({ activeWatchlist }),
    addToWatchlist: (list, symbol) => {
      const lists = { ...get().watchlists };
      const arr = lists[list] ?? [];
      if (!arr.includes(symbol)) lists[list] = [...arr, symbol];
      saveLists(lists);
      set({ watchlists: lists });
    },
    removeFromWatchlist: (list, symbol) => {
      const lists = { ...get().watchlists };
      lists[list] = (lists[list] ?? []).filter((s) => s !== symbol);
      saveLists(lists);
      set({ watchlists: lists });
    },
    moveInWatchlist: (list, from, to) => {
      const lists = { ...get().watchlists };
      const arr = [...(lists[list] ?? [])];
      const [m] = arr.splice(from, 1);
      arr.splice(to, 0, m);
      lists[list] = arr;
      saveLists(lists);
      set({ watchlists: lists });
    },
    toggleFavorite: (symbol) => set((s) => ({
      favorites: s.favorites.includes(symbol)
        ? s.favorites.filter((f) => f !== symbol)
        : [...s.favorites, symbol],
    })),
    addAlert: (symbol, condition, price) => set((s) => ({
      alerts: [...s.alerts, { id: `A-${alertSeq++}`, symbol, condition, price, triggered: false, createdAt: Date.now() }],
    })),
    removeAlert: (id) => set((s) => ({ alerts: s.alerts.filter((a) => a.id !== id) })),
    dismissAlert: () => set({ triggeredAlert: null }),
  };
});
