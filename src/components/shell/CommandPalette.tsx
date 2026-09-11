import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowRight, Bell, CandlestickChart, ChevronRight, Layers, LineChart, Newspaper,
  Radar, Search, SlidersHorizontal, Swords, Trash2, Wallet, X, Zap, FlaskConical, Bot, Activity,
} from 'lucide-react';
import { SYMBOLS } from '../../services/symbols';
import { useWorkspaceStore, type ViewId } from '../../store/useWorkspaceStore';
import { useMarketStore } from '../../store/useMarketStore';
import { broker } from '../../services/tradingService';
import { submitOrder } from '../../store/useTradingStore';
import { fmtPct, fmtPrice } from '../../lib/format';
import { getSymbol } from '../../services/symbols';
import { cx } from '../../lib/utils';

interface Entry {
  kind: 'symbol' | 'view' | 'action';
  id: string;
  title: string;
  sub?: string;
  icon: React.ReactNode;
  run: () => void;
}

const VIEWS: Array<{ id: ViewId; label: string; icon: React.ReactNode }> = [
  { id: 'markets', label: 'Markets Overview', icon: <Activity size={14} /> },
  { id: 'chart', label: 'Chart', icon: <CandlestickChart size={14} /> },
  { id: 'orderflow', label: 'Order Flow', icon: <Layers size={14} /> },
  { id: 'trade', label: 'Trade / Execution', icon: <Swords size={14} /> },
  { id: 'portfolio', label: 'Portfolio', icon: <Wallet size={14} /> },
  { id: 'scanner', label: 'Scanner', icon: <Radar size={14} /> },
  { id: 'strategies', label: 'Strategies', icon: <SlidersHorizontal size={14} /> },
  { id: 'backtest', label: 'Backtest Lab', icon: <FlaskConical size={14} /> },
  { id: 'intel', label: 'Market Intelligence', icon: <Newspaper size={14} /> },
  { id: 'ai', label: 'AI Assistant', icon: <Bot size={14} /> },
];

export function CommandPalette(): React.ReactElement | null {
  const open = useWorkspaceStore((s) => s.paletteOpen);
  const setPalette = useWorkspaceStore((s) => s.setPalette);
  const symbol = useWorkspaceStore((s) => s.symbol);
  const [q, setQ] = useState('');
  const [hi, setHi] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setQ('');
      setHi(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open ]);

  const entries: Entry[] = useMemo(() => {
    const ws = useWorkspaceStore.getState();
    const out: Entry[] = [];
    const needle = q.trim().toLowerCase();
    const match = (s: string): boolean => !needle || s.toLowerCase().includes(needle);

    for (const s of SYMBOLS) {
      if (!match(`${s.symbol} ${s.name} ${s.exchange}`)) continue;
      out.push({
        kind: 'symbol', id: `sym-${s.symbol}`, title: s.symbol, sub: `${s.name} · ${s.exchange}`,
        icon: <LineChart size={14} className="text-accent" />,
        run: () => { ws.setSymbol(s.symbol); },
      });
      if (out.length > 14) break;
    }
    if (out.length <= 14) {
      for (const v of VIEWS) {
        if (!match(v.label) && !match(`go ${v.label}`)) continue;
        out.push({
          kind: 'view', id: `view-${v.id}`, title: `Go to ${v.label}`,
          icon: v.icon,
          run: () => ws.setView(v.id),
        });
      }
    }
    const acts: Array<{ t: string; icon: React.ReactNode; run: () => void; k?: string }> = [
      { t: `Buy ${symbol} at market`, icon: <Zap size={14} className="text-up" />, run: () => submitOrder({ symbol, side: 'BUY', type: 'MKT', qty: 1 }), k: 'buy market long' },
      { t: `Sell ${symbol} at market`, icon: <Zap size={14} className="text-down" />, run: () => submitOrder({ symbol, side: 'SELL', type: 'MKT', qty: 1 }), k: 'sell market short' },
      { t: `Close ${symbol} position`, icon: <X size={14} />, run: () => broker.closePosition(symbol), k: 'close position exit' },
      { t: 'Flatten all positions', icon: <Trash2 size={14} className="text-down" />, run: () => broker.flattenAll(), k: 'flatten close all' },
      { t: 'Cancel all working orders', icon: <X size={14} />, run: () => broker.cancelAll(), k: 'cancel orders' },
      { t: 'Add price alert here', icon: <Bell size={14} className="text-warn" />, run: () => ws.setRightTab('alerts'), k: 'alert' },
      { t: 'Toggle right panel', icon: <ChevronRight size={14} />, run: () => ws.setRightOpen(!ws.rightOpen), k: 'panel sidebar' },
      { t: 'Toggle bottom terminal', icon: <ChevronRight size={14} />, run: () => ws.setBottomOpen(!ws.bottomOpen), k: 'terminal bottom' },
      { t: 'Toggle navigation', icon: <ChevronRight size={14} />, run: () => ws.toggleLeft(), k: 'nav sidebar' },
    ];
    for (const a of acts) {
      if (!match(`${a.t} ${a.k ?? ''}`)) continue;
      out.push({ kind: 'action', id: `act-${a.t}`, title: a.t, icon: a.icon, run: a.run });
    }
    return out.slice(0, 18);
  }, [q, symbol]);

  useEffect(() => setHi(0), [entries.length]);

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${hi}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [hi]);

  if (!open) return null;

  const runEntry = (e: Entry): void => {
    setPalette(false);
    setTimeout(() => e.run(), 10);
  };

  return createPortal(
    <div className="fixed inset-0 z-[95] flex justify-center pt-[12vh] px-4" style={{ background: 'rgba(3,6,10,0.65)' }} onMouseDown={() => setPalette(false)}>
      <div
        className="panel !rounded-lg shadow-2xl w-[620px] max-w-full overflow-hidden"
        style={{ height: 'fit-content', maxHeight: '70vh' }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-3 border-b border-line h-[44px] shrink-0">
          <Search size={15} className="text-text3 shrink-0" />
          <input
            ref={inputRef}
            className="flex-1 bg-transparent outline-none text-[13px] text-text1 placeholder:text-text3"
            placeholder="Type a symbol, view, or action…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') { e.preventDefault(); setHi(Math.min(entries.length - 1, hi + 1)); }
              if (e.key === 'ArrowUp') { e.preventDefault(); setHi(Math.max(0, hi - 1)); }
              if (e.key === 'Enter' && entries[hi]) runEntry(entries[hi]);
              if (e.key === 'Escape') setPalette(false);
            }}
          />
          <span className="kbd">esc</span>
        </div>
        <div ref={listRef} className="overflow-auto p-1.5" style={{ maxHeight: '52vh' }}>
          {entries.map((e, i) => (
            <PaletteRow key={e.id} entry={e} active={i === hi} idx={i} onPick={() => runEntry(e)} onHover={() => setHi(i)} />
          ))}
          {entries.length === 0 && (
            <div className="py-8 text-center text-[11.5px] text-text3">No matches. Try a symbol like <span className="num text-text2">NVDA</span> or an action like <span className="text-text2">flatten</span>.</div>
          )}
        </div>
        <div className="flex items-center gap-3 px-3 h-[28px] border-t border-line text-[10px] text-text3 shrink-0">
          <span className="flex items-center gap-1"><span className="kbd">↑↓</span> navigate</span>
          <span className="flex items-center gap-1"><span className="kbd">↵</span> select</span>
          <span className="flex items-center gap-1"><ArrowRight size={10} /> symbols · views · actions</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function PaletteRow({ entry, active, idx, onPick, onHover }: {
  entry: Entry; active: boolean; idx: number; onPick: () => void; onHover: () => void;
}): React.ReactElement {
  const quotes = useMarketStore((s) => s.quotes);
  const q = entry.kind === 'symbol' ? quotes[entry.title] : null;
  const def = entry.kind === 'symbol' ? getSymbol(entry.title) : null;
  return (
    <button
      data-idx={idx}
      onMouseEnter={onHover}
      onClick={onPick}
      className={cx('w-full flex items-center gap-2.5 px-2.5 h-[36px] rounded-md text-left', active ? 'bg-accentdim' : '')}
    >
      <span className="w-5 flex justify-center text-text2 shrink-0">{entry.icon}</span>
      <span className="flex-1 min-w-0">
        <span className="block text-[12.5px] font-semibold text-text1 leading-tight truncate">{entry.title}</span>
        {entry.sub && <span className="block text-[10px] text-text3 leading-tight truncate">{entry.sub}</span>}
      </span>
      {q && def && (
        <span className="text-right shrink-0">
          <span className="num text-[11.5px] text-text1">{fmtPrice(q.price, def.decimals)}</span>
          <span className={cx('num text-[10.5px] ml-2', q.changePct >= 0 ? 'text-up' : 'text-down')}>{fmtPct(q.changePct)}</span>
        </span>
      )}
      <span className={cx('badge shrink-0', entry.kind === 'symbol' ? 'badge-info' : entry.kind === 'view' ? 'badge-mute' : 'badge-warn')}>
        {entry.kind}
      </span>
    </button>
  );
}
