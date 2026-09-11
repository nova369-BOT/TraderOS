import { marketEngine, type Quote } from './marketEngine';
import { getSymbol } from './symbols';
import { uid } from '../lib/utils';

/**
 * PaperBroker — simulated execution layer.
 *
 * Owns the full trading state machine: accounts, orders, fills,
 * positions, realized P&L. The UI only ever talks to this service,
 * so a live brokerage adapter can replace it 1:1 later.
 */

export type Side = 'BUY' | 'SELL';
export type OrderType = 'MKT' | 'LMT' | 'STP' | 'STP_LMT' | 'TRAIL';
export type OrderStatus = 'WORKING' | 'FILLED' | 'CANCELLED' | 'REJECTED';
export type TIF = 'DAY' | 'GTC' | 'IOC' | 'FOK';

export interface Order {
  id: string;
  symbol: string;
  side: Side;
  type: OrderType;
  qty: number;
  filledQty: number;
  limitPrice: number | null;
  stopPrice: number | null;
  trailOffset: number | null;
  tif: TIF;
  status: OrderStatus;
  reduceOnly: boolean;
  leverage: number;
  bracketStop: number | null;
  bracketTarget: number | null;
  parentId: string | null;
  tag: string;
  createdAt: number;
  updatedAt: number;
  avgFill: number | null;
}

export interface Fill {
  id: string;
  orderId: string;
  symbol: string;
  side: Side;
  qty: number;
  price: number;
  fee: number;
  time: number;
  liquidity: 'maker' | 'taker';
}

export interface Position {
  symbol: string;
  side: 'LONG' | 'SHORT';
  qty: number;
  avgEntry: number;
  mark: number;
  unrealized: number;
  unrealizedPct: number;
  realized: number;
  stop: number | null;
  target: number | null;
  leverage: number;
  margin: number;
  notional: number;
  openedAt: number;
}

export interface PlaceOrderInput {
  symbol: string;
  side: Side;
  type: OrderType;
  qty: number;
  limitPrice?: number | null;
  stopPrice?: number | null;
  trailOffset?: number | null;
  tif?: TIF;
  reduceOnly?: boolean;
  leverage?: number;
  bracketStop?: number | null;
  bracketTarget?: number | null;
  tag?: string;
}

const FEE_BPS = 2.5; // taker fee per side

class PaperBroker {
  cash = 250_000;
  startingEquity = 250_000;
  realizedToday = 0;
  feesToday = 0;
  orders: Order[] = [];
  fills: Fill[] = [];
  positions = new Map<string, Position & { realizedAcc: number }>();
  equityHistory: Array<{ time: number; equity: number }> = [];
  private listeners = new Set<() => void>();
  private orderSeq = 1000;

  constructor() {
    // seed a small demo book so the terminal feels alive on first paint
    const now = Date.now();
    for (let i = 60; i >= 1; i--) {
      this.equityHistory.push({ time: now - i * 60000, equity: 250000 + Math.sin(i / 9) * 1400 + (60 - i) * 22 });
    }
    if (typeof window !== 'undefined') {
      marketEngine.subscribe(() => this.onMarketTick());
    }
  }

  subscribe(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => { this.listeners.delete(fn); };
  }

  private emit(): void {
    this.listeners.forEach((fn) => fn());
  }

  // ---------------- order entry ----------------
  placeOrder(input: PlaceOrderInput): { order: Order | null; error: string | null } {
    const def = getSymbol(input.symbol);
    const q = marketEngine.getQuote(input.symbol);
    const qty = Math.floor(input.qty * 1e8) / 1e8;
    if (!qty || qty <= 0) return { order: null, error: 'Quantity must be greater than zero.' };
    if (!input.reduceOnly) {
      const px = input.type === 'MKT' ? q.price : input.limitPrice ?? input.stopPrice ?? q.price;
      const notional = qty * px;
      const margin = notional / Math.max(1, input.leverage ?? 1);
      if (margin > this.buyingPower()) {
        return { order: null, error: `Insufficient buying power. Need ${fmtMoneyShort(margin)}, have ${fmtMoneyShort(this.buyingPower())}.` };
      }
    }
    if ((input.type === 'LMT' || input.type === 'STP_LMT') && !(input.limitPrice! > 0)) {
      return { order: null, error: 'Limit price is required for limit orders.' };
    }
    if ((input.type === 'STP' || input.type === 'STP_LMT') && !(input.stopPrice! > 0)) {
      return { order: null, error: 'Stop price is required for stop orders.' };
    }
    const order: Order = {
      id: `O-${this.orderSeq++}`,
      symbol: input.symbol,
      side: input.side,
      type: input.type,
      qty: roundQty(qty, def),
      filledQty: 0,
      limitPrice: input.limitPrice ?? null,
      stopPrice: input.stopPrice ?? null,
      trailOffset: input.trailOffset ?? null,
      tif: input.tif ?? 'GTC',
      status: 'WORKING',
      reduceOnly: input.reduceOnly ?? false,
      leverage: input.leverage ?? 1,
      bracketStop: input.bracketStop ?? null,
      bracketTarget: input.bracketTarget ?? null,
      parentId: null,
      tag: input.tag ?? 'manual',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      avgFill: null,
    };
    void def;
    if (order.type === 'MKT') {
      this.fillOrder(order, order.side === 'BUY' ? q.ask : q.bid, order.qty, 'taker');
    } else {
      this.orders.unshift(order);
      // IOC/FOK get one immediate chance
      if (order.tif === 'IOC' || order.tif === 'FOK') this.tryFillResting(order, q);
    }
    this.emit();
    return { order, error: null };
  }

  cancelOrder(id: string): void {
    const o = this.orders.find((x) => x.id === id);
    if (o && o.status === 'WORKING') {
      o.status = 'CANCELLED';
      o.updatedAt = Date.now();
      // cancel bracket children
      for (const c of this.orders) {
        if (c.parentId === id && c.status === 'WORKING') {
          c.status = 'CANCELLED';
          c.updatedAt = Date.now();
        }
      }
      this.emit();
    }
  }

  modifyOrder(id: string, patch: { limitPrice?: number | null; stopPrice?: number | null; qty?: number }): void {
    const o = this.orders.find((x) => x.id === id);
    if (!o || o.status !== 'WORKING') return;
    if (patch.limitPrice !== undefined) o.limitPrice = patch.limitPrice;
    if (patch.stopPrice !== undefined) o.stopPrice = patch.stopPrice;
    if (patch.qty !== undefined && patch.qty > o.filledQty) o.qty = patch.qty;
    o.updatedAt = Date.now();
    this.emit();
  }

  closePosition(symbol: string, pct = 1): void {
    const p = this.positions.get(symbol);
    if (!p) return;
    const qty = p.qty * pct;
    if (qty <= 0) return;
    const q = marketEngine.getQuote(symbol);
    const fillPx = p.side === 'LONG' ? q.bid : q.ask;
    this.applyFill({
      id: uid('F'), orderId: 'MANUAL', symbol, side: p.side === 'LONG' ? 'SELL' : 'BUY',
      qty, price: fillPx, fee: (qty * fillPx * FEE_BPS) / 10000, time: Date.now(), liquidity: 'taker',
    });
    // cancel resting bracket children
    for (const o of this.orders) {
      if (o.symbol === symbol && o.status === 'WORKING' && o.parentId) {
        o.status = 'CANCELLED';
        o.updatedAt = Date.now();
      }
    }
    this.emit();
  }

  reversePosition(symbol: string): void {
    const p = this.positions.get(symbol);
    if (!p) return;
    const qty = p.qty;
    this.closePosition(symbol, 1);
    this.placeOrder({
      symbol,
      side: p.side === 'LONG' ? 'SELL' : 'BUY',
      type: 'MKT',
      qty,
      leverage: p.leverage,
      tag: 'reverse',
    });
  }

  setPositionBracket(symbol: string, stop: number | null, target: number | null): void {
    const p = this.positions.get(symbol);
    if (!p) return;
    p.stop = stop;
    p.target = target;
    // cancel old auto children
    for (const o of this.orders) {
      if (o.symbol === symbol && o.status === 'WORKING' && o.parentId === `POS-${symbol}`) {
        o.status = 'CANCELLED';
        o.updatedAt = Date.now();
      }
    }
    const mkChild = (side: Side, type: OrderType, stopPrice: number | null, limitPrice: number | null): void => {
      this.orders.unshift({
        id: `O-${this.orderSeq++}`, symbol, side, type, qty: p.qty, filledQty: 0,
        limitPrice, stopPrice, trailOffset: null, tif: 'GTC', status: 'WORKING',
        reduceOnly: true, leverage: p.leverage, bracketStop: null, bracketTarget: null,
        parentId: `POS-${symbol}`, tag: 'bracket', createdAt: Date.now(), updatedAt: Date.now(), avgFill: null,
      });
    };
    if (stop) mkChild(p.side === 'LONG' ? 'SELL' : 'BUY', 'STP', stop, null);
    if (target) mkChild(p.side === 'LONG' ? 'SELL' : 'BUY', 'LMT', null, target);
    this.emit();
  }

  flattenAll(): void {
    for (const sym of [...this.positions.keys()]) this.closePosition(sym, 1);
  }

  cancelAll(symbol?: string): void {
    for (const o of this.orders) {
      if (o.status === 'WORKING' && (!symbol || o.symbol === symbol)) {
        o.status = 'CANCELLED';
        o.updatedAt = Date.now();
      }
    }
    this.emit();
  }

  // ---------------- matching (runs on every market tick) ----------------
  private onMarketTick(): void {
    let changed = false;
    for (const o of this.orders) {
      if (o.status !== 'WORKING') continue;
      const q = marketEngine.getQuote(o.symbol);
      if (this.tryFillResting(o, q)) changed = true;
    }
    // re-mark positions
    for (const p of this.positions.values()) {
      const q = marketEngine.getQuote(p.symbol);
      p.mark = q.price;
      const dir = p.side === 'LONG' ? 1 : -1;
      p.unrealized = (q.price - p.avgEntry) * p.qty * dir;
      p.unrealizedPct = ((q.price - p.avgEntry) / p.avgEntry) * 100 * dir;
      p.notional = p.qty * q.price;
      p.margin = p.notional / Math.max(1, p.leverage);
    }
    const eq = this.equity();
    const lastT = this.equityHistory.length ? this.equityHistory[this.equityHistory.length - 1].time : 0;
    if (Date.now() - lastT > 20000) {
      this.equityHistory.push({ time: Date.now(), equity: eq });
      if (this.equityHistory.length > 400) this.equityHistory.shift();
      changed = true;
    }
    if (changed) this.emit();
  }

  private tryFillResting(o: Order, q: Quote): boolean {
    let fillPx: number | null = null;
    let liq: 'maker' | 'taker' = 'maker';
    if (o.side === 'BUY') {
      if (o.type === 'LMT' && o.limitPrice !== null && q.ask <= o.limitPrice) fillPx = Math.min(o.limitPrice, q.ask);
      else if (o.type === 'STP' && o.stopPrice !== null && q.ask >= o.stopPrice) { fillPx = q.ask; liq = 'taker'; }
      else if (o.type === 'STP_LMT' && o.stopPrice !== null && o.limitPrice !== null && q.ask >= o.stopPrice) {
        if (q.ask <= o.limitPrice) fillPx = q.ask; else { o.type = 'LMT'; o.updatedAt = Date.now(); return true; }
      }
    } else {
      if (o.type === 'LMT' && o.limitPrice !== null && q.bid >= o.limitPrice) fillPx = Math.max(o.limitPrice, q.bid);
      else if (o.type === 'STP' && o.stopPrice !== null && q.bid <= o.stopPrice) { fillPx = q.bid; liq = 'taker'; }
      else if (o.type === 'STP_LMT' && o.stopPrice !== null && o.limitPrice !== null && q.bid <= o.stopPrice) {
        if (q.bid >= o.limitPrice) fillPx = q.bid; else { o.type = 'LMT'; o.updatedAt = Date.now(); return true; }
      }
    }
    if (fillPx === null) {
      if ((o.tif === 'IOC' || o.tif === 'FOK') && o.filledQty === 0) {
        o.status = 'CANCELLED';
        o.updatedAt = Date.now();
        return true;
      }
      return false;
    }
    this.fillOrder(o, fillPx, o.qty - o.filledQty, liq);
    return true;
  }

  private fillOrder(o: Order, px: number, qty: number, liq: 'maker' | 'taker'): void {
    if (qty <= 0) return;
    o.filledQty += qty;
    o.avgFill = o.avgFill === null ? px : (o.avgFill * (o.filledQty - qty) + px * qty) / o.filledQty;
    if (o.filledQty >= o.qty - 1e-12) {
      o.status = 'FILLED';
      if (o.type === 'MKT' && !this.orders.includes(o)) this.orders.unshift(o);
    } else if (!this.orders.includes(o)) {
      this.orders.unshift(o);
    }
    o.updatedAt = Date.now();
    const fee = ((qty * px * FEE_BPS) / 10000) * (liq === 'maker' ? 0.6 : 1);
    this.applyFill({ id: uid('F'), orderId: o.id, symbol: o.symbol, side: o.side, qty, price: px, fee, time: Date.now(), liquidity: liq });
    // spawn bracket children on parent fill
    if (o.status === 'FILLED' && (o.bracketStop || o.bracketTarget) && !o.parentId) {
      const childSide: Side = o.side === 'BUY' ? 'SELL' : 'BUY';
      if (o.bracketStop) {
        this.orders.unshift({
          id: `O-${this.orderSeq++}`, symbol: o.symbol, side: childSide, type: 'STP',
          qty: o.qty, filledQty: 0, limitPrice: null, stopPrice: o.bracketStop, trailOffset: null,
          tif: 'GTC', status: 'WORKING', reduceOnly: true, leverage: o.leverage,
          bracketStop: null, bracketTarget: null, parentId: o.id, tag: 'bracket-stop',
          createdAt: Date.now(), updatedAt: Date.now(), avgFill: null,
        });
      }
      if (o.bracketTarget) {
        this.orders.unshift({
          id: `O-${this.orderSeq++}`, symbol: o.symbol, side: childSide, type: 'LMT',
          qty: o.qty, filledQty: 0, limitPrice: o.bracketTarget, stopPrice: null, trailOffset: null,
          tif: 'GTC', status: 'WORKING', reduceOnly: true, leverage: o.leverage,
          bracketStop: null, bracketTarget: null, parentId: o.id, tag: 'bracket-target',
          createdAt: Date.now(), updatedAt: Date.now(), avgFill: null,
        });
      }
    }
    // OCO: when a reduce-only bracket child fills, cancel its sibling
    if (o.status === 'FILLED' && o.reduceOnly && o.parentId) {
      for (const s of this.orders) {
        if (s.parentId === o.parentId && s.id !== o.id && s.status === 'WORKING') {
          s.status = 'CANCELLED';
          s.updatedAt = Date.now();
        }
      }
    }
  }

  private applyFill(f: Fill): void {
    this.fills.unshift(f);
    this.feesToday += f.fee;
    this.cash -= f.fee;
    const existing = this.positions.get(f.symbol);
    const dir = f.side === 'BUY' ? 1 : -1;
    if (!existing) {
      const q = marketEngine.getQuote(f.symbol);
      const order = this.orders.find((o) => o.id === f.orderId);
      const leverage = order?.leverage ?? 1;
      const pos = {
        symbol: f.symbol,
        side: (dir === 1 ? 'LONG' : 'SHORT') as 'LONG' | 'SHORT',
        qty: f.qty,
        avgEntry: f.price,
        mark: q.price,
        unrealized: 0,
        unrealizedPct: 0,
        realized: 0,
        realizedAcc: 0,
        stop: order?.bracketStop ?? null,
        target: order?.bracketTarget ?? null,
        leverage,
        margin: (f.qty * f.price) / Math.max(1, leverage),
        notional: f.qty * f.price,
        openedAt: Date.now(),
      };
      pos.unrealized = (q.price - pos.avgEntry) * pos.qty * dir;
      pos.unrealizedPct = ((q.price - pos.avgEntry) / pos.avgEntry) * 100 * dir;
      this.positions.set(f.symbol, pos);
      this.cash -= dir * f.qty * f.price * 0; // margin accounting handled via equity calc
    } else {
      const posDir = existing.side === 'LONG' ? 1 : -1;
      if (dir === posDir) {
        existing.avgEntry = (existing.avgEntry * existing.qty + f.price * f.qty) / (existing.qty + f.qty);
        existing.qty += f.qty;
      } else {
        const closed = Math.min(existing.qty, f.qty);
        const pnl = (f.price - existing.avgEntry) * closed * posDir;
        existing.realized += pnl;
        existing.realizedAcc += pnl;
        this.realizedToday += pnl;
        this.cash += pnl;
        existing.qty -= closed;
        if (existing.qty <= 1e-12) {
          this.positions.delete(f.symbol);
        } else if (f.qty > closed) {
          // flip
          const rem = f.qty - closed;
          existing.side = dir === 1 ? 'LONG' : 'SHORT';
          existing.qty = rem;
          existing.avgEntry = f.price;
          existing.openedAt = Date.now();
        }
      }
      if (this.positions.has(f.symbol)) {
        const p = this.positions.get(f.symbol)!;
        const q = marketEngine.getQuote(f.symbol);
        const dd = p.side === 'LONG' ? 1 : -1;
        p.mark = q.price;
        p.unrealized = (q.price - p.avgEntry) * p.qty * dd;
        p.unrealizedPct = ((q.price - p.avgEntry) / p.avgEntry) * 100 * dd;
        p.notional = p.qty * q.price;
        p.margin = p.notional / Math.max(1, p.leverage);
      }
    }
  }

  // ---------------- account ----------------
  openOrders(symbol?: string): Order[] {
    return this.orders.filter((o) => o.status === 'WORKING' && (!symbol || o.symbol === symbol));
  }

  orderHistory(): Order[] {
    return this.orders.filter((o) => o.status !== 'WORKING');
  }

  positionList(): Position[] {
    return [...this.positions.values()];
  }

  unrealized(): number {
    let s = 0;
    for (const p of this.positions.values()) s += p.unrealized;
    return s;
  }

  grossExposure(): number {
    let s = 0;
    for (const p of this.positions.values()) s += p.notional;
    return s;
  }

  marginUsed(): number {
    let s = 0;
    for (const p of this.positions.values()) s += p.margin;
    return s;
  }

  equity(): number {
    return this.cash + this.unrealized();
  }

  dayPnl(): number {
    return this.equity() - this.startingEquity;
  }

  dayPnlPct(): number {
    return ((this.equity() - this.startingEquity) / this.startingEquity) * 100;
  }

  buyingPower(): number {
    return Math.max(0, this.equity() * 4 - this.marginUsed());
  }
}

function roundQty(qty: number, def: { symbol: string }): number {
  void def;
  return Math.round(qty * 1e6) / 1e6;
}

function fmtMoneyShort(v: number): string {
  if (Math.abs(v) >= 1e6) return `$${(v / 1e6).toFixed(2)}M`;
  if (Math.abs(v) >= 1e3) return `$${(v / 1e3).toFixed(1)}K`;
  return `$${v.toFixed(0)}`;
}

export const broker = new PaperBroker();
