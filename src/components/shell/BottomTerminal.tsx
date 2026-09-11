import React, { useState } from 'react';
import { ChevronDown, Pencil, X } from 'lucide-react';
import { useWorkspaceStore, type BottomTab } from '../../store/useWorkspaceStore';
import { useTradingStore } from '../../store/useTradingStore';
import { useMarketStore } from '../../store/useMarketStore';
import { broker, type Order } from '../../services/tradingService';
import { getSymbol } from '../../services/symbols';
import { fmtMoney, fmtNum, fmtPct, fmtPrice, fmtSignedMoney, fmtTime, fmtDuration } from '../../lib/format';
import { DataGrid, type GridColumn } from '../primitives/DataGrid';
import { showContextMenu } from '../primitives/Menu';
import { Modal, Field } from '../primitives/Modal';
import { EmptyState } from '../primitives/Panel';
import { cx } from '../../lib/utils';
import { EdgeHandle } from '../primitives/SplitPane';

const TABS: Array<{ id: BottomTab; label: string }> = [
  { id: 'positions', label: 'Positions' },
  { id: 'orders', label: 'Open Orders' },
  { id: 'history', label: 'Order History' },
  { id: 'fills', label: 'Fills' },
  { id: 'log', label: 'Log' },
];

export function BottomTerminal(): React.ReactElement {
  const open = useWorkspaceStore((s) => s.bottomOpen);
  const setOpen = useWorkspaceStore((s) => s.setBottomOpen);
  const tab = useWorkspaceStore((s) => s.bottomTab);
  const setTab = useWorkspaceStore((s) => s.setBottomTab);
  const height = useWorkspaceStore((s) => s.bottomHeight);
  const nudgeBottom = useWorkspaceStore((s) => s.nudgeBottom);
  const positions = useTradingStore((s) => s.positions);
  const orders = useTradingStore((s) => s.orders);
  const openOrders = orders.filter((o) => o.status === 'WORKING');
  const unrealized = useTradingStore((s) => s.unrealized);
  const realized = useTradingStore((s) => s.realized);

  if (!open) return <></>;

  const counts: Record<BottomTab, number> = {
    positions: positions.length,
    orders: openOrders.length,
    history: orders.filter((o) => o.status !== 'WORKING').length,
    fills: useTradingStore.getState().fills.length,
    log: 0,
  };

  return (
    <div className="shrink-0 flex flex-col border-t border-line bg-panel select-none" style={{ height }}>
      <EdgeHandle edge="top" onResize={nudgeBottom} />
      <div className="flex items-center gap-1 px-2 h-[30px] border-b border-line bg-panel2 shrink-0 -mt-[5px] pt-[5px]">
        <div className="ttabs">
          {TABS.map((t) => (
            <button key={t.id} className={cx('ttab', tab === t.id && 'active')} onClick={() => setTab(t.id)}>
              {t.label}
              {counts[t.id] > 0 && <span className="cnt">{counts[t.id]}</span>}
            </button>
          ))}
        </div>
        <span className="flex-1" />
        <span className="num text-[10.5px] text-text3 mr-2 hidden md:inline">
          Unreal <span className={unrealized >= 0 ? 'text-up' : 'text-down'}>{fmtSignedMoney(unrealized)}</span>
          <span className="mx-1.5 text-line2">|</span>
          Realized <span className={realized >= 0 ? 'text-up' : 'text-down'}>{fmtSignedMoney(realized)}</span>
        </span>
        {tab === 'positions' && positions.length > 0 && (
          <button className="tbtn tbtn-xs mr-1" onClick={() => broker.flattenAll()} title="Close all positions at market">Flatten all</button>
        )}
        {tab === 'orders' && openOrders.length > 0 && (
          <button className="tbtn tbtn-xs mr-1" onClick={() => broker.cancelAll()} title="Cancel all working orders">Cancel all</button>
        )}
        <button className="tbtn tbtn-ghost tbtn-xs !px-1" onClick={() => setOpen(false)} title="Hide terminal">
          <ChevronDown size={13} />
        </button>
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        {tab === 'positions' && <PositionsTable />}
        {tab === 'orders' && <OrdersTable />}
        {tab === 'history' && <HistoryTable />}
        {tab === 'fills' && <FillsTable />}
        {tab === 'log' && <LogView />}
      </div>
    </div>
  );
}

function PositionsTable(): React.ReactElement {
  const positions = useTradingStore((s) => s.positions);
  const setSymbol = useWorkspaceStore((s) => s.setSymbol);
  const [bracketFor, setBracketFor] = useState<string | null>(null);
  if (positions.length === 0) {
    return <EmptyState title="No open positions" hint="Positions appear here after fills. Use the order ticket (right panel) or press Trade to enter the market." />;
  }
  const cols: GridColumn<(typeof positions)[number]>[] = [
    { key: 'symbol', title: 'Symbol', sortable: true, sortVal: (r) => r.symbol, render: (r) => <span className="font-bold">{r.symbol}</span> },
    {
      key: 'side', title: 'Side', sortable: true, sortVal: (r) => r.side,
      render: (r) => <span className={cx('badge', r.side === 'LONG' ? 'badge-up' : 'badge-down')}>{r.side}</span>,
    },
    { key: 'qty', title: 'Qty', sortable: true, sortVal: (r) => r.qty, render: (r) => <span className="num">{fmtNum(r.qty, 4)}</span> },
    { key: 'entry', title: 'Entry', sortable: true, sortVal: (r) => r.avgEntry, render: (r) => <span className="num">{fmtPrice(r.avgEntry, getSymbol(r.symbol).decimals)}</span> },
    { key: 'mark', title: 'Mark', sortable: true, sortVal: (r) => r.mark, render: (r) => <span className="num text-accent">{fmtPrice(r.mark, getSymbol(r.symbol).decimals)}</span> },
    { key: 'pnl', title: 'uPnL', sortable: true, sortVal: (r) => r.unrealized, render: (r) => <span className={cx('num font-semibold', r.unrealized >= 0 ? 'text-up' : 'text-down')}>{fmtSignedMoney(r.unrealized)}</span> },
    { key: 'pnlp', title: 'uPnL %', sortable: true, sortVal: (r) => r.unrealizedPct, render: (r) => <span className={cx('num', r.unrealized >= 0 ? 'text-up' : 'text-down')}>{fmtPct(r.unrealizedPct)}</span> },
    { key: 'stop', title: 'Stop', render: (r) => <span className="num text-down">{r.stop ? fmtPrice(r.stop, getSymbol(r.symbol).decimals) : '—'}</span> },
    { key: 'target', title: 'Target', render: (r) => <span className="num text-up">{r.target ? fmtPrice(r.target, getSymbol(r.symbol).decimals) : '—'}</span> },
    { key: 'lev', title: 'Lev', render: (r) => <span className="num">{r.leverage}x</span> },
    { key: 'margin', title: 'Margin', sortable: true, sortVal: (r) => r.margin, render: (r) => <span className="num">{fmtMoney(r.margin, 0)}</span> },
    { key: 'dur', title: 'Duration', render: (r) => <span className="num text-text2">{fmtDuration(Date.now() - r.openedAt)}</span> },
    {
      key: 'act', title: '', render: (r) => (
        <span className="inline-flex gap-1" onClick={(e) => e.stopPropagation()}>
          <button className="tbtn tbtn-xs" title="Edit stop / target" onClick={() => setBracketFor(r.symbol)}><Pencil size={10} /></button>
          <button className="tbtn tbtn-xs" title="Close 50%" onClick={() => broker.closePosition(r.symbol, 0.5)}>½</button>
          <button className="tbtn tbtn-xs" title="Close position at market" onClick={() => broker.closePosition(r.symbol, 1)}><X size={10} /></button>
        </span>
      ),
    },
  ];
  return (
    <>
      <DataGrid
        columns={cols} rows={positions} rowKey={(r) => r.symbol}
        onRowClick={(r) => setSymbol(r.symbol)}
        onRowContext={(r, e) => showContextMenu(e.clientX, e.clientY, [
          { label: `Close ${r.symbol}`, icon: <X size={13} />, onClick: () => broker.closePosition(r.symbol) },
          { label: 'Scale out 50%', onClick: () => broker.closePosition(r.symbol, 0.5) },
          { label: 'Reverse position', danger: true, onClick: () => broker.reversePosition(r.symbol) },
          { divider: true },
          { label: 'Edit stop / target…', icon: <Pencil size={13} />, onClick: () => setBracketFor(r.symbol) },
          { label: 'Open chart', onClick: () => { setSymbol(r.symbol); useWorkspaceStore.getState().setView('chart'); } },
        ])}
      />
      {bracketFor && <BracketModal symbol={bracketFor} onClose={() => setBracketFor(null)} />}
    </>
  );
}

function BracketModal({ symbol, onClose }: { symbol: string; onClose: () => void }): React.ReactElement {
  const pos = useTradingStore((s) => s.positions.find((p) => p.symbol === symbol));
  const [stop, setStop] = useState(pos?.stop ? String(pos.stop) : '');
  const [target, setTarget] = useState(pos?.target ? String(pos.target) : '');
  if (!pos) return <></>;
  return (
    <Modal title={`${symbol} — Stop / Target`} subtitle={`${pos.side} ${fmtNum(pos.qty, 4)} @ ${fmtPrice(pos.avgEntry, getSymbol(symbol).decimals)}`} onClose={onClose} width={400}
      footer={<><button className="tbtn" onClick={onClose}>Cancel</button><button className="tbtn tbtn-primary" onClick={() => { broker.setPositionBracket(symbol, stop ? Number(stop) : null, target ? Number(target) : null); onClose(); }}>Apply bracket</button></>}>
      <div className="grid grid-cols-2 gap-2">
        <Field label={`Stop price (${pos.side === 'LONG' ? 'below' : 'above'} mark)`}>
          <input className="tinput" value={stop} onChange={(e) => setStop(e.target.value)} placeholder="—" inputMode="decimal" />
        </Field>
        <Field label={`Target price (${pos.side === 'LONG' ? 'above' : 'below'} mark)`}>
          <input className="tinput" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="—" inputMode="decimal" />
        </Field>
      </div>
      <p className="text-[10.5px] text-text3 mt-2 leading-relaxed">Creates linked reduce-only stop + limit orders (OCO). Filling one cancels the other. Clearing a field removes that leg.</p>
    </Modal>
  );
}

function OrdersTable(): React.ReactElement {
  const orders = useTradingStore((s) => s.orders);
  const setSymbol = useWorkspaceStore((s) => s.setSymbol);
  const [modFor, setModFor] = useState<string | null>(null);
  const open = orders.filter((o) => o.status === 'WORKING');
  if (open.length === 0) {
    return <EmptyState title="No working orders" hint="Limit, stop and bracket orders rest here until they fill, cancel or expire." />;
  }
  const cols: GridColumn<Order>[] = [
    { key: 'id', title: 'ID', render: (r) => <span className="num text-text2">{r.id}</span> },
    { key: 'symbol', title: 'Symbol', sortable: true, sortVal: (r) => r.symbol, render: (r) => <span className="font-bold">{r.symbol}</span> },
    { key: 'side', title: 'Side', render: (r) => <span className={cx('badge', r.side === 'BUY' ? 'badge-up' : 'badge-down')}>{r.side}</span> },
    { key: 'type', title: 'Type', render: (r) => <span className="num text-text2">{r.type}{r.reduceOnly ? ' · R' : ''}</span> },
    { key: 'qty', title: 'Qty', render: (r) => <span className="num">{fmtNum(r.qty, 4)}</span> },
    { key: 'limit', title: 'Limit', render: (r) => <span className="num">{r.limitPrice ? fmtPrice(r.limitPrice, getSymbol(r.symbol).decimals) : '—'}</span> },
    { key: 'stop', title: 'Stop', render: (r) => <span className="num">{r.stopPrice ? fmtPrice(r.stopPrice, getSymbol(r.symbol).decimals) : '—'}</span> },
    { key: 'tif', title: 'TIF', render: (r) => <span className="num text-text2">{r.tif}</span> },
    { key: 'tag', title: 'Tag', render: (r) => <span className="text-text3 text-[10.5px]">{r.tag}{r.parentId ? ` · ${r.parentId}` : ''}</span> },
    { key: 'time', title: 'Placed', sortable: true, sortVal: (r) => r.createdAt, render: (r) => <span className="num text-text2">{fmtTime(r.createdAt)}</span> },
    {
      key: 'act', title: '', render: (r) => (
        <span className="inline-flex gap-1" onClick={(e) => e.stopPropagation()}>
          <button className="tbtn tbtn-xs" title="Modify" onClick={() => setModFor(r.id)}><Pencil size={10} /></button>
          <button className="tbtn tbtn-xs" title="Cancel" onClick={() => broker.cancelOrder(r.id)}><X size={10} /></button>
        </span>
      ),
    },
  ];
  const mod = modFor ? orders.find((o) => o.id === modFor) : null;
  return (
    <>
      <DataGrid columns={cols} rows={open} rowKey={(r) => r.id}
        onRowClick={(r) => setSymbol(r.symbol)}
        onRowContext={(r, e) => showContextMenu(e.clientX, e.clientY, [
          { label: 'Modify…', icon: <Pencil size={13} />, onClick: () => setModFor(r.id) },
          { label: 'Cancel order', icon: <X size={13} />, danger: true, onClick: () => broker.cancelOrder(r.id) },
          { divider: true },
          { label: 'Cancel all in symbol', onClick: () => broker.cancelAll(r.symbol) },
        ])}
      />
      {mod && (
        <ModifyModal order={mod} onClose={() => setModFor(null)} />
      )}
    </>
  );
}

function ModifyModal({ order, onClose }: { order: Order; onClose: () => void }): React.ReactElement {
  const [limit, setLimit] = useState(order.limitPrice ? String(order.limitPrice) : '');
  const [stop, setStop] = useState(order.stopPrice ? String(order.stopPrice) : '');
  const [qty, setQty] = useState(String(order.qty));
  return (
    <Modal title={`Modify ${order.id}`} subtitle={`${order.side} ${order.qty} ${order.symbol} · ${order.type}`} onClose={onClose} width={420}
      footer={<><button className="tbtn" onClick={onClose}>Cancel</button><button className="tbtn tbtn-primary" onClick={() => {
        broker.modifyOrder(order.id, { limitPrice: limit ? Number(limit) : null, stopPrice: stop ? Number(stop) : null, qty: Number(qty) });
        onClose();
      }}>Apply changes</button></>}>
      <div className="grid grid-cols-3 gap-2">
        <Field label="Limit price"><input className="tinput" value={limit} onChange={(e) => setLimit(e.target.value)} inputMode="decimal" /></Field>
        <Field label="Stop price"><input className="tinput" value={stop} onChange={(e) => setStop(e.target.value)} inputMode="decimal" /></Field>
        <Field label="Quantity"><input className="tinput" value={qty} onChange={(e) => setQty(e.target.value)} inputMode="decimal" /></Field>
      </div>
    </Modal>
  );
}

function HistoryTable(): React.ReactElement {
  const orders = useTradingStore((s) => s.orders);
  const done = orders.filter((o) => o.status !== 'WORKING');
  if (done.length === 0) return <EmptyState title="No order history yet" hint="Filled, cancelled and rejected orders are recorded here with timestamps." />;
  const cols: GridColumn<Order>[] = [
    { key: 'id', title: 'ID', render: (r) => <span className="num text-text2">{r.id}</span> },
    { key: 'symbol', title: 'Symbol', sortable: true, sortVal: (r) => r.symbol, render: (r) => <span className="font-bold">{r.symbol}</span> },
    { key: 'side', title: 'Side', render: (r) => <span className={cx('badge', r.side === 'BUY' ? 'badge-up' : 'badge-down')}>{r.side}</span> },
    { key: 'type', title: 'Type', render: (r) => <span className="num text-text2">{r.type}</span> },
    { key: 'qty', title: 'Qty', render: (r) => <span className="num">{fmtNum(r.qty, 4)}</span> },
    { key: 'avg', title: 'Avg Fill', render: (r) => <span className="num">{r.avgFill ? fmtPrice(r.avgFill, getSymbol(r.symbol).decimals) : '—'}</span> },
    {
      key: 'status', title: 'Status', render: (r) => (
        <span className={cx('badge', r.status === 'FILLED' ? 'badge-up' : r.status === 'CANCELLED' ? 'badge-mute' : 'badge-down')}>{r.status}</span>
      ),
    },
    { key: 'time', title: 'Updated', sortable: true, sortVal: (r) => r.updatedAt, render: (r) => <span className="num text-text2">{fmtTime(r.updatedAt)}</span> },
  ];
  return <DataGrid columns={cols} rows={done} rowKey={(r) => r.id} defaultSort="time" />;
}

function FillsTable(): React.ReactElement {
  const fills = useTradingStore((s) => s.fills);
  if (fills.length === 0) return <EmptyState title="No fills yet" hint="Every execution prints here with price, size, fee and liquidity flag." />;
  const cols: GridColumn<(typeof fills)[number]>[] = [
    { key: 'time', title: 'Time', sortable: true, sortVal: (r) => r.time, render: (r) => <span className="num text-text2">{fmtTime(r.time)}</span> },
    { key: 'symbol', title: 'Symbol', sortable: true, sortVal: (r) => r.symbol, render: (r) => <span className="font-bold">{r.symbol}</span> },
    { key: 'side', title: 'Side', render: (r) => <span className={cx('badge', r.side === 'BUY' ? 'badge-up' : 'badge-down')}>{r.side}</span> },
    { key: 'qty', title: 'Qty', render: (r) => <span className="num">{fmtNum(r.qty, 4)}</span> },
    { key: 'px', title: 'Price', render: (r) => <span className="num">{fmtPrice(r.price, getSymbol(r.symbol).decimals)}</span> },
    { key: 'not', title: 'Notional', sortable: true, sortVal: (r) => r.qty * r.price, render: (r) => <span className="num">{fmtMoney(r.qty * r.price, 0)}</span> },
    { key: 'fee', title: 'Fee', render: (r) => <span className="num text-text2">{fmtMoney(r.fee)}</span> },
    { key: 'liq', title: 'Liq', render: (r) => <span className={cx('badge', r.liquidity === 'maker' ? 'badge-info' : 'badge-mute')}>{r.liquidity}</span> },
    { key: 'oid', title: 'Order', render: (r) => <span className="num text-text3">{r.orderId}</span> },
  ];
  return <DataGrid columns={cols} rows={fills} rowKey={(r) => r.id} defaultSort="time" />;
}

function LogView(): React.ReactElement {
  const orders = useTradingStore((s) => s.orders);
  const fills = useTradingStore((s) => s.fills);
  const lastError = useTradingStore((s) => s.lastError);
  const lastNotice = useTradingStore((s) => s.lastNotice);
  const tick = useMarketStore((s) => s.tick);
  const lines = [
    ...(lastError ? [{ t: Date.now(), lvl: 'ERR', msg: lastError }] : []),
    ...(lastNotice ? [{ t: Date.now(), lvl: 'INF', msg: lastNotice }] : []),
    ...fills.slice(0, 30).map((f) => ({ t: f.time, lvl: 'FILL', msg: `${f.side} ${fmtNum(f.qty, 4)} ${f.symbol} @ ${fmtPrice(f.price, getSymbol(f.symbol).decimals)} [${f.orderId}]` })),
    ...orders.slice(0, 30).map((o) => ({ t: o.updatedAt, lvl: o.status === 'FILLED' ? 'FILL' : o.status === 'CANCELLED' ? 'WRN' : 'INF', msg: `Order ${o.id} ${o.side} ${o.qty} ${o.symbol} ${o.type} → ${o.status}` })),
  ].sort((a, b) => b.t - a.t).slice(0, 60);
  void tick;
  return (
    <div className="p-2 font-mono text-[10.5px] leading-[1.7]">
      <div className="text-text3">[sys] paper-broker connected · tick engine live · fees 2.5bps taker</div>
      {lines.map((l, i) => (
        <div key={i} className="flex gap-2">
          <span className="text-text3 shrink-0">{fmtTime(l.t)}</span>
          <span className={cx('shrink-0 w-[34px] font-bold', l.lvl === 'ERR' ? 'text-down' : l.lvl === 'WRN' ? 'text-warn' : l.lvl === 'FILL' ? 'text-up' : 'text-accent')}>{l.lvl}</span>
          <span className="text-text2 truncate">{l.msg}</span>
        </div>
      ))}
    </div>
  );
}
