import React, { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, Pause, Play } from 'lucide-react';
import { marketEngine } from '../../services/marketEngine';
import { getSymbol } from '../../services/symbols';
import { useMarketStore } from '../../store/useMarketStore';
import { fmtNum, fmtPrice, fmtTime } from '../../lib/format';
import { Panel } from '../primitives/Panel';
import { VirtualList } from '../primitives/DataGrid';
import { cx } from '../../lib/utils';

export function Tape({ symbol, height = 300 }: { symbol: string; height?: number | string }): React.ReactElement {
  const tick = useMarketStore((s) => s.tick);
  const [paused, setPaused] = useState(false);
  const [minSize, setMinSize] = useState('');
  const [sideFilter, setSideFilter] = useState<'all' | 'buy' | 'sell'>('all');
  const def = getSymbol(symbol);

  const live = useMemo(() => {
    const all = marketEngine.getTape(symbol, 160);
    const ms = Number(minSize) || 0;
    return all.filter((t) => (sideFilter === 'all' || t.side === sideFilter) && t.size >= ms);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, tick, minSize, sideFilter]);
  // Pause genuinely freezes the viewport on the last visible prints.
  const [frozen, setFrozen] = useState(live);
  useEffect(() => { if (!paused) setFrozen(live); }, [live, paused]);
  const trades = paused ? frozen : live;

  const maxNotional = Math.max(1, ...trades.slice(0, 60).map((t) => t.notional));

  return (
    <Panel
      className="flex-1 min-h-0"
      title="Time & Sales"
      subtitle={`${trades.length} prints`}
      actions={
        <>
          <div className="seg">
            <button className={sideFilter === 'all' ? 'active' : ''} onClick={() => setSideFilter('all')}>All</button>
            <button className={sideFilter === 'buy' ? 'active' : ''} onClick={() => setSideFilter('buy')}>Bids</button>
            <button className={sideFilter === 'sell' ? 'active' : ''} onClick={() => setSideFilter('sell')}>Asks</button>
          </div>
          <input className="tinput !h-[20px] !w-[70px] !text-[10px]" placeholder="Min size" value={minSize} onChange={(e) => setMinSize(e.target.value)} inputMode="decimal" />
          <button className="tbtn tbtn-xs" onClick={() => setPaused(!paused)} title={paused ? 'Resume' : 'Pause'}>
            {paused ? <Play size={11} /> : <Pause size={11} />}
          </button>
        </>
      }
      bodyClassName="!overflow-hidden flex flex-col"
    >
      <div className="grid grid-cols-[52px_1fr_64px_52px] px-2 h-[20px] items-center text-[9px] font-semibold uppercase tracking-wider text-text3 border-b border-line shrink-0">
        <span>Time</span><span className="text-right">Price</span><span className="text-right">Size</span><span className="text-right">Side</span>
      </div>
      <div className="flex-1 min-h-0">
      <VirtualList
        items={trades}
        rowHeight={19}
        height={height}
        render={(t, i) => {
          const block = t.notional >= maxNotional * 0.5 && i < 40;
          const buy = t.side === 'buy';
          return (
            <div
              className={cx('grid grid-cols-[52px_1fr_64px_52px] px-2 items-center h-[19px] border-b border-line/40 num text-[10.5px]', block ? (buy ? 'bg-upbg' : 'bg-downbg') : i === 0 ? (buy ? 'bg-upbg/60' : 'bg-downbg/60') : '')}
              title={`${t.exchange} · $${fmtNum(t.notional, 0)} notional`}
            >
              <span className="text-text3">{fmtTime(t.time)}</span>
              <span className={cx('text-right font-semibold', buy ? 'text-up' : 'text-down')}>{fmtPrice(t.price, def.decimals)}</span>
              <span className={cx('text-right', block ? 'font-bold text-text1' : 'text-text2')}>{fmtNum(t.size, def.asset === 'FX' ? 0 : t.size < 10 ? 3 : 1)}</span>
              <span className={cx('text-right flex items-center justify-end gap-0.5', buy ? 'text-up' : 'text-down')}>
                {buy ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                <span className="text-[9px] font-bold">{buy ? 'B' : 'S'}</span>
              </span>
            </div>
          );
        }}
      />
      </div>
    </Panel>
  );
}
