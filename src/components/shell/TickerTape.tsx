import React, { useEffect, useRef } from 'react';
import { useMarketStore } from '../../store/useMarketStore';
import { useWorkspaceStore } from '../../store/useWorkspaceStore';
import { getSymbol } from '../../services/symbols';
import { fmtPct, fmtPrice } from '../../lib/format';
import { cx } from '../../lib/utils';

const TAPE = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'SPY', 'QQQ', 'DIA', 'NVDA', 'AAPL', 'TSLA', 'MSFT', 'META', 'AMZN', 'ES', 'NQ', 'GC', 'CL', 'EURUSD', 'VIX'];

export function TickerTape(): React.ReactElement {
  const quotes = useMarketStore((s) => s.quotes);
  const symbol = useWorkspaceStore((s) => s.symbol);
  const setSymbol = useWorkspaceStore((s) => s.setSymbol);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let x = 0;
    let paused = false;
    const speed = 0.45;
    const loop = (): void => {
      if (!paused && el.scrollWidth > el.clientWidth) {
        x += speed;
        if (x >= el.scrollWidth / 2) x = 0;
        el.scrollLeft = x;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onEnter = (): void => { paused = true; };
    const onLeave = (): void => { paused = false; };
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => { cancelAnimationFrame(raf); el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave); };
  }, []);

  const row = (key: string): React.ReactElement => (
    <div key={key} className="flex items-center shrink-0">
      {TAPE.map((s) => {
        const q = quotes[s];
        if (!q) return null;
        const def = getSymbol(s);
        const chg = q.changePct;
        return (
          <button
            key={s}
            onClick={() => setSymbol(s)}
            className={cx(
              'flex items-center gap-1.5 px-3 h-[26px] border-r border-line hover:bg-hover whitespace-nowrap',
              symbol === s && 'bg-accentdim',
            )}
          >
            <span className="text-[10px] font-bold text-text2">{s}</span>
            <span className="num text-[10.5px] text-text1">{fmtPrice(q.price, def.decimals)}</span>
            <span className={cx('num text-[10px] font-medium', chg >= 0 ? 'text-up' : 'text-down')}>{fmtPct(chg)}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div ref={ref} className="h-[27px] shrink-0 flex items-stretch border-b border-line bg-panel overflow-hidden select-none">
      {row('a')}{row('b')}
    </div>
  );
}
