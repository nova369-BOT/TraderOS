import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, Star } from 'lucide-react';
import { SYMBOLS, type AssetClass } from '../../services/symbols';
import { useMarketStore } from '../../store/useMarketStore';
import { fmtPct, fmtPrice } from '../../lib/format';
import { cx } from '../../lib/utils';

const FILTERS: Array<'ALL' | AssetClass> = ['ALL', 'CRYPTO', 'EQUITY', 'FUTURES', 'FX', 'INDEX'];

export function SymbolSearch({ onPick, autoFocus, placeholder = 'Search symbol, company, exchange…' }: {
  onPick: (symbol: string) => void;
  autoFocus?: boolean;
  placeholder?: string;
}): React.ReactElement {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('ALL');
  const [hi, setHi] = useState(0);
  const quotes = useMarketStore((s) => s.quotes);
  const favorites = useMarketStore((s) => s.favorites);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (autoFocus) inputRef.current?.focus(); }, [autoFocus]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return SYMBOLS.filter((s) => {
      if (filter !== 'ALL' && s.asset !== filter) return false;
      if (!needle) return true;
      return s.symbol.toLowerCase().includes(needle) || s.name.toLowerCase().includes(needle) || s.exchange.toLowerCase().includes(needle);
    }).slice(0, 40);
  }, [q, filter]);

  useEffect(() => setHi(0), [q, filter]);

  return (
    <div className="flex flex-col min-h-0">
      <div className="relative shrink-0">
        <Search size={13} className="absolute left-2 top-1/2 -translate-y-1/2 text-text3" />
        <input
          ref={inputRef}
          className="tinput !h-[30px] !pl-7 !text-[12px]"
          placeholder={placeholder}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setHi(Math.min(results.length - 1, hi + 1)); }
            if (e.key === 'ArrowUp') { e.preventDefault(); setHi(Math.max(0, hi - 1)); }
            if (e.key === 'Enter' && results[hi]) onPick(results[hi].symbol);
          }}
        />
      </div>
      <div className="flex items-center gap-1 py-1.5 shrink-0 overflow-x-auto">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={cx('tbtn tbtn-xs shrink-0', filter === f ? '!bg-panel3 !border-line2 !text-text1' : '!border-transparent text-text3')}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="flex-1 min-h-0 overflow-auto -mx-1 px-1">
        {results.map((s, i) => {
          const qt = quotes[s.symbol];
          const chg = qt?.changePct ?? 0;
          return (
            <button
              key={s.symbol}
              className={cx('w-full flex items-center gap-2 px-2 h-[34px] rounded text-left', i === hi ? 'bg-accentdim' : 'hover:bg-hover')}
              onMouseEnter={() => setHi(i)}
              onClick={() => onPick(s.symbol)}
            >
              {favorites.includes(s.symbol) && <Star size={10} className="text-warn shrink-0" fill="currentColor" />}
              <span className="min-w-0 flex-1">
                <span className="block text-[12px] font-bold text-text1 leading-tight truncate">{s.symbol}</span>
                <span className="block text-[10px] text-text3 leading-tight truncate">{s.name} · {s.exchange}</span>
              </span>
              {qt && (
                <span className="text-right shrink-0">
                  <span className="block num text-[11.5px] text-text1 leading-tight">{fmtPrice(qt.price, s.decimals)}</span>
                  <span className={cx('block num text-[10px] leading-tight', chg >= 0 ? 'text-up' : 'text-down')}>{fmtPct(chg)}</span>
                </span>
              )}
              <span className="badge badge-mute shrink-0">{s.asset}</span>
            </button>
          );
        })}
        {results.length === 0 && <div className="py-6 text-center text-[11px] text-text3">No symbols match “{q}”.</div>}
      </div>
    </div>
  );
}
