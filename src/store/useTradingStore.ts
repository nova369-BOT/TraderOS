import { create } from 'zustand';
import { broker, type Order, type Fill, type Position } from '../services/tradingService';

interface TradingState {
  rev: number;
  orders: Order[];
  fills: Fill[];
  positions: Position[];
  equity: number;
  cash: number;
  dayPnl: number;
  dayPnlPct: number;
  unrealized: number;
  realized: number;
  fees: number;
  buyingPower: number;
  marginUsed: number;
  exposure: number;
  equityCurve: Array<{ time: number; equity: number }>;
  lastError: string | null;
  lastNotice: string | null;
  refresh: () => void;
  clearNotice: () => void;
}

let subscribed = false;

export const useTradingStore = create<TradingState>()((set, get) => {
  if (!subscribed && typeof window !== 'undefined') {
    subscribed = true;
    broker.subscribe(() => get().refresh());
    setTimeout(() => get().refresh(), 0);
  }
  return {
    rev: 0,
    orders: [],
    fills: [],
    positions: [],
    equity: 250000,
    cash: 250000,
    dayPnl: 0,
    dayPnlPct: 0,
    unrealized: 0,
    realized: 0,
    fees: 0,
    buyingPower: 1000000,
    marginUsed: 0,
    exposure: 0,
    equityCurve: [],
    lastError: null,
    lastNotice: null,
    refresh: () => set((s) => ({
      rev: s.rev + 1,
      orders: [...broker.orders],
      fills: [...broker.fills],
      positions: broker.positionList(),
      equity: broker.equity(),
      cash: broker.cash,
      dayPnl: broker.dayPnl(),
      dayPnlPct: broker.dayPnlPct(),
      unrealized: broker.unrealized(),
      realized: broker.realizedToday,
      fees: broker.feesToday,
      buyingPower: broker.buyingPower(),
      marginUsed: broker.marginUsed(),
      exposure: broker.grossExposure(),
      equityCurve: [...broker.equityHistory],
    })),
    clearNotice: () => set({ lastError: null, lastNotice: null }),
  };
});

/** order-entry helper that surfaces broker errors into the store */
export function submitOrder(input: Parameters<typeof broker.placeOrder>[0]): boolean {
  const { error } = broker.placeOrder(input);
  if (error) {
    useTradingStore.setState({ lastError: error });
    return false;
  }
  useTradingStore.setState({ lastError: null, lastNotice: `${input.side} ${input.qty} ${input.symbol} submitted` });
  return true;
}
