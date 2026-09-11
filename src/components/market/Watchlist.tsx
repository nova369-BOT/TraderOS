import React, { useMemo, useState } from 'react';
import { CandlestickChart, ChevronDown, Columns3, ListPlus, Plus, Search, Star, Swords, Trash2, X } from 'lucide-react';
import { useWorkspaceStore } from '../../store/useWorkspaceStore';
import { useMarketStore } from '../../store/useMarketStore';
import { getSymbol } from '../../services/symbols';
import { fmtNum, fmtPct, fmtPrice, fmtVol } from '../../lib/format';
import { DataGrid, type GridColumn } from '../primitives/DataGrid';
import { Panel, EmptyState } from '../primitives/Panel';
import { Dropdown, showContextMenu } from '../primitives/Menu';
import { Modal, Field } from '../primitives/Modal';
import { SymbolSearch } from './SymbolSearch';
import { cx } from '../../lib/utils';
import type { Quote } from '../../services/marketEngine';

type ColKey = 'last' | 'chg' | 'chgp' | 'bid' | 'ask' | 'spread' | 'vol' | 'relvol' | 'vwap' | 'high' | 'low';

const ALL_COLS: Array<{ key: ColKey; label: string }> = [
  { key: 'last', label: 'Last' },
  { key: 'chg', label: 'Change' },
  { key: 'chgp', label: 'Change %' },
  { key: 'bid', label: 'Bid' },
  { key: 'ask', label: 'Ask' },
  { key: 'spread', label: 'Spread' },
  { key: 'vol', label: 'Volume' },
  { key: 'relvol', label: 'Rel Vol' },
  { key: 'vwap', label: 'VWAP' },
  { key: 'high', label: 'High' },
  { key: 'low', label: 'Low' },
];

function loadCols(): ColKey[] {
  try {
    const raw = localStorage.getItem('traderos-wl-cols');
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return ['last', 'chgp', 'vol', 'relvol', 'vwap', 'high', 'low'];
}

export function Watchlist({ height, sort, onSort }: {
  height?: number | string;
  sort?: { key: string | null; dir: 'asc' | 'desc' };
  onSort?: (key: string | null, dir: 'asc' | 'desc') => void;
}): React.ReactElement {
  const symbol = useWorkspaceStore((s) => s.symbol);
  const setSymbol = useWorkspaceStore((s) => s.setSymbol);
  const setView = useWorkspaceStore((s) => s.setView);
  const setRightTab = useWorkspaceStore((s) => s.setRightTab);
  const quotes = useMarketStore((s) => s.quotes);
  const watchlists = useMarketStore((s) => s.watchlists);
  const activeList = useMarketStore((s) => s.activeWatchlist);
  const favorites = useMarketStore((s) => s.favorites);

  const [filter, setFilter] = useState('');
  const [cols, setCols] = useState<ColKey[]>(loadCols);
  const [addOpen, setAddOpen] = useState(false);
  const [newListOpen, setNewListOpen] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const persistCols = (c: ColKey[]): void => {
    setCols(c);
    try { localStorage.setItem('traderos-wl-cols', JSON.stringify(c)); } catch { /* ignore */ }
  };

  const names = Object.keys(watchlists);
  const symbols = useMemo(() => {
    const arr = watchlists[activeList] ?? [];
    const f = filter.trim().toLowerCase();
    if (!f) return arr;
    return arr.filter((s) => s.toLowerCase().includes(f) || getSymbol(s).name.toLowerCase().includes(f));
  }, [watchlists, activeList, filter]);

  const rows: Quote[] = useMemo(
    () => symbols.map((s) => quotes[s]).filter(Boolean),
    [symbols, quotes],
  );

  const openMenu = (r: Quote, x: number, y: number): void => {
    const ms = useMarketStore.getState();
    const ws = useWorkspaceStore.getState();
    showContextMenu(x, y, [
      { label: `Chart ${r.symbol}`, icon: <CandlestickChart size={13} />, onClick: () => { ws.setSymbol(r.symbol); ws.setView('chart'); } },
      { label: `Trade ${r.symbol}`, icon: <Swords size={13} />, onClick: () => { ws.setSymbol(r.symbol); ws.setRightTab('ticket'); } },
      { label: favorites.includes(r.symbol) ? 'Remove favorite' : 'Add favorite', icon: <Star size={13} />, onClick: () => ms.toggleFavorite(r.symbol) },
      {
        label: 'Add to list…', icon: <ListPlus size={13} />,
        children: names.filter((n) => n !== activeList).map((n) => ({ label: n, onClick: () => ms.addToWatchlist(n, r.symbol) })),
      },
      { divider: true },
      { label: 'Remove from list', icon: <Trash2 size={13} />, danger: true, onClick: () => ms.removeFromWatchlist(activeList, r.symbol) },
    ]);
  };

  const columns: GridColumn<Quote>[] = useMemo(() => {
    const c: GridColumn<Quote>[] = [
      {
        key: 'symbol', title: 'Symbol', sortable: true, sortVal: (r) => r.symbol,
        render: (r) => (
          <span className="flex items-center gap-1.5">
            {favorites.includes(r.symbol) && <Star size={10} className="text-warn shrink-0" fill="currentColor" />}
            <span className="font-bold">{r.symbol}</span>
            <span className="opacity-0 group-hover:opacity-100 flex gap-0.5" onClick={(e) => e.stopPropagation()}>
              <button className="tbtn tbtn-ghost tbtn-xs !px-1" title="Chart" onClick={() => { setSymbol(r.symbol); setView('chart'); }}><CandlestickChart size={11} /></button>
              <button className="tbtn tbtn-ghost tbtn-xs !px-1" title="Trade" onClick={() => { setSymbol(r.symbol); setRightTab('ticket'); }}><Swords size={11} /></button>
            </span>
          </span>
        ),
      },
    ];
    const push = (col: GridColumn<Quote>): void => { c.push(col); };
    if (cols.includes('last')) push({ key: 'last', title: 'Last', sortable: true, sortVal: (r) => r.price, render: (r) => <span className={cx('num font-semibold', r.tickDir === 1 ? 'tick-up' : r.tickDir === -1 ? 'tick-down' : '')}>{fmtPrice(r.price, getSymbol(r.symbol).decimals)}</span> });
    if (cols.includes('chg')) push({ key: 'chg', title: 'Chg', sortable: true, sortVal: (r) => r.change, render: (r) => <span className={cx('num', r.change >= 0 ? 'text-up' : 'text-down')}>{r.change >= 0 ? '+' : '−'}{fmtPrice(Math.abs(r.change), getSymbol(r.symbol).decimals)}</span> });
    if (cols.includes('chgp')) push({ key: 'chgp', title: 'Chg%', sortable: true, sortVal: (r) => r.changePct, render: (r) => <span className={cx('num', r.changePct >= 0 ? 'text-up' : 'text-down')}>{fmtPct(r.changePct)}</span> });
    if (cols.includes('bid')) push({ key: 'bid', title: 'Bid', render: (r) => <span className="num text-text2">{fmtPrice(r.bid, getSymbol(r.symbol).decimals)}</span> });
    if (cols.includes('ask')) push({ key: 'ask', title: 'Ask', render: (r) => <span className="num text-text2">{fmtPrice(r.ask, getSymbol(r.symbol).decimals)}</span> });
    if (cols.includes('spread')) push({ key: 'spread', title: 'Sprd', sortable: true, sortVal: (r) => r.spreadBps, render: (r) => <span className="num text-text2">{fmtNum(r.spreadBps, 1)}bp</span> });
    if (cols.includes('vol')) push({ key: 'vol', title: 'Volume', sortable: true, sortVal: (r) => r.volume, render: (r) => <span className="num">{fmtVol(r.volume)}</span> });
    if (cols.includes('relvol')) push({ key: 'relvol', title: 'RelVol', sortable: true, sortVal: (r) => r.relVol, render: (r) => <span className={cx('num', r.relVol > 1.8 ? 'text-up font-bold' : '')}>{fmtNum(r.relVol, 2)}x</span> });
    if (cols.includes('vwap')) push({ key: 'vwap', title: 'VWAP', render: (r) => <span className={cx('num', r.price >= r.vwap ? 'text-up' : 'text-down')}>{fmtPrice(r.vwap, getSymbol(r.symbol).decimals)}</span> });
    if (cols.includes('high')) push({ key: 'high', title: 'High', render: (r) => <span className="num text-text2">{fmtPrice(r.high, getSymbol(r.symbol).decimals)}</span> });
    if (cols.includes('low')) push({ key: 'low', title: 'Low', render: (r) => <span className="num text-text2">{fmtPrice(r.low, getSymbol(r.symbol).decimals)}</span> });
    return c;
  }, [cols, favorites, setSymbol, setView, setRightTab]);

  return (
    <Panel
      title={
        <Dropdown
          trigger={
            <button className="flex items-center gap-1 hover:text-text1">
              <span className="panel-title !text-text1">{activeList}</span>
              <ChevronDown size={12} className="text-text3" />
            </button>
          }
          items={[
            { header: 'Watchlists' },
            ...names.map((n) => ({
              label: `${n} (${(watchlists[n] ?? []).length})`,
              checked: n === activeList,
              onClick: () => useMarketStore.getState().setActiveWatchlist(n),
            })),
            { divider: true },
            { label: 'New watchlist…', icon: <Plus size={13} />, onClick: () => setNewListOpen(true) },
            ...(names.length > 1 ? [{ label: `Delete “${activeList}”`, icon: <Trash2 size={13} />, danger: true, onClick: () => useMarketStore.getState().removeWatchlist(activeList) }] : []),
          ]}
        />
      }
      subtitle={`${rows.length} symbols`}
      actions={
        <>
          <div className="relative">
            <Search size={11} className="absolute left-1.5 top-1/2 -translate-y-1/2 text-text3" />
            <input className="tinput !h-[20px] !w-[110px] !pl-6 !text-[10px]" placeholder="Filter" value={filter} onChange={(e) => setFilter(e.target.value)} />
            {filter && <button className="absolute right-1 top-1/2 -translate-y-1/2 text-text3 hover:text-text1" onClick={() => setFilter('')}><X size={10} /></button>}
          </div>
          <Dropdown
            trigger={<button className="tbtn tbtn-ghost tbtn-xs !px-1" title="Columns"><Columns3 size={12} /></button>}
            align="right"
            items={[
              { header: 'Columns' },
              ...ALL_COLS.map((c) => ({
                label: c.label,
                checked: cols.includes(c.key),
                onClick: () => persistCols(cols.includes(c.key) ? cols.filter((k) => k !== c.key) : [...cols, c.key]),
              })),
            ]}
          />
          <button className="tbtn tbtn-xs" title="Add symbol" onClick={() => setAddOpen(true)}><Plus size={11} /> Add</button>
        </>
      }
      bodyClassName="!overflow-auto group"
    >
      <div style={height ? { height } : undefined} className="min-h-0">
        {rows.length === 0 ? (
          <EmptyState title="List is empty" hint="Add symbols to start tracking them here." action={<button className="tbtn tbtn-sm" onClick={() => setAddOpen(true)}><Plus size={11} /> Add symbol</button>} />
        ) : (
          <DataGrid
            columns={columns}
            rows={rows}
            rowKey={(r) => r.symbol}
            activeKey={symbol}
            sort={sort}
            onSort={onSort}
            onRowClick={(r) => setSymbol(r.symbol)}
            onRowDouble={(r) => { setSymbol(r.symbol); setView('chart'); }}
            onRowContext={(r, e) => openMenu(r, e.clientX, e.clientY)}
            rowClass={() => 'wl-row'}
          />
        )}
        {/* drag reorder affordance */}
        <div className="hidden">{dragIdx}</div>
      </div>
      {addOpen && (
        <Modal title="Add to watchlist" subtitle={activeList} onClose={() => setAddOpen(false)} width={480}>
          <div style={{ height: 380 }} className="flex flex-col">
            <SymbolSearch autoFocus onPick={(s) => { useMarketStore.getState().addToWatchlist(activeList, s); setAddOpen(false); }} />
          </div>
        </Modal>
      )}
      {newListOpen && <NewListModal onClose={() => setNewListOpen(false)} />}
    </Panel>
  );
}

function NewListModal({ onClose }: { onClose: () => void }): React.ReactElement {
  const [name, setName] = useState('');
  const addWatchlist = useMarketStore((s) => s.addWatchlist);
  return (
    <Modal
      title="New watchlist" onClose={onClose} width={380}
      footer={<><button className="tbtn" onClick={onClose}>Cancel</button><button className="tbtn tbtn-primary" disabled={!name.trim()} onClick={() => { addWatchlist(name.trim()); onClose(); }}>Create list</button></>}
    >
      <Field label="List name">
        <input className="tinput" autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Earnings plays" onKeyDown={(e) => { if (e.key === 'Enter' && name.trim()) { addWatchlist(name.trim()); onClose(); } }} />
      </Field>
    </Modal>
  );
}
/** wrapper that enables drag-reorder rows (only while unsorted, so order stays meaningful) */
export function DraggableWatchlist(props: { height?: number | string }): React.ReactElement {
  const activeList = useMarketStore((s) => s.activeWatchlist);
  const move = useMarketStore((s) => s.moveInWatchlist);
  const [from, setFrom] = useState<number | null>(null);
  const [sort, setSort] = useState<{ key: string | null; dir: 'asc' | 'desc' }>({ key: null, dir: 'desc' });
  const dragOn = sort.key === null;
  return (
    <div
      className="flex flex-col min-h-0 flex-1 [&_tbody_tr]:cursor-grab"
      onMouseOver={(e) => {
        const box = e.currentTarget;
        box.querySelectorAll('tbody tr[draggable="true"]').forEach((el) => el.removeAttribute('draggable'));
        if (!dragOn) return;
        const t = (e.target as HTMLElement).closest?.('tbody tr');
        if (t && box.contains(t)) t.setAttribute('draggable', 'true');
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        if (!dragOn) { setFrom(null); return; }
        const t = (e.target as HTMLElement).closest('tr');
        if (!t || from === null) { setFrom(null); return; }
        const rows = [...(t.parentElement?.querySelectorAll('tr') ?? [])];
        const to = rows.indexOf(t);
        if (to >= 0 && to !== from) move(activeList, from, to);
        setFrom(null);
      }}
      onDragStart={(e) => {
        if (!dragOn) { e.preventDefault(); return; }
        const t = (e.target as HTMLElement).closest('tr');
        if (!t) return;
        const rows = [...(t.parentElement?.querySelectorAll('tr') ?? [])];
        setFrom(rows.indexOf(t));
      }}
      onDragEnd={() => setFrom(null)}
      title={dragOn ? 'Drag rows to reorder' : 'Clear sorting to reorder rows'}
    >
      <Watchlist height={props.height} sort={sort} onSort={(key, dir) => setSort({ key, dir })} />
    </div>
  );
}
