import React, { useMemo, useRef, useState } from 'react';
import { Crosshair } from 'lucide-react';
import { marketEngine } from '../../services/marketEngine';
import { getSymbol } from '../../services/symbols';
import { useMarketStore } from '../../store/useMarketStore';
import { submitOrder } from '../../store/useTradingStore';
import { fmtNum, fmtPrice, fmtVol } from '../../lib/format';
import { Panel } from '../primitives/Panel';
import { cx } from '../../lib/utils';

export function DomLadder({ symbol, rows = 15 }: { symbol: string; rows?: number }): React.ReactElement {
  const tick = useMarketStore((s) => s.tick);
  const [qty, setQty] = useState('1');
  const bodyRef = useRef<HTMLDivElement>(null);
  const recenter = (): void => {
    bodyRef.current?.querySelector('[data-spread]')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  };
  const def = getSymbol(symbol);

  const book = useMemo(() => marketEngine.getBook(symbol, rows), [symbol, rows, tick]); // eslint-disable-line react-hooks/exhaustive-deps
  const q = marketEngine.getQuote(symbol);

  const maxSize = Math.max(1e-9, ...book.bids.map((b) => b.bid), ...book.asks.map((a) => a.ask));
  const totBid = book.bids.reduce((s, b) => s + b.bid, 0);
  const totAsk = book.asks.reduce((s, a) => s + a.ask, 0);
  const imb = totBid + totAsk > 0 ? ((totBid - totAsk) / (totBid + totAsk)) * 100 : 0;
  const qtyN = Math.max(0, Number(qty) || 0);

  const joinBid = (px: number): void => {
    submitOrder({ symbol, side: 'BUY', type: 'LMT', qty: qtyN, limitPrice: px, tag: 'dom' });
  };
  const joinAsk = (px: number): void => {
    submitOrder({ symbol, side: 'SELL', type: 'LMT', qty: qtyN, limitPrice: px, tag: 'dom' });
  };

  // merge into ladder rows top (asks desc) -> bottom (bids desc)
  const ladder = [
    ...[...book.asks].reverse().map((a) => ({ price: a.price, bid: 0, ask: a.ask, side: 'ask' as const })),
    ...book.bids.map((b) => ({ price: b.price, bid: b.bid, ask: 0, side: 'bid' as const })),
  ];

  return (
    <Panel
      className="flex-1 min-h-0"
      title="Depth of Market"
      subtitle={`${symbol} · ${def.exchange}`}
      actions={
        <>
          <span className="text-[10px] text-text3">Qty</span>
          <input className="tinput !h-[20px] !w-[64px]" value={qty} onChange={(e) => setQty(e.target.value)} inputMode="decimal" />
          <button className="tbtn tbtn-xs" title="Re-center ladder" onClick={recenter}><Crosshair size={11} /></button>
        </>
      }
      bodyClassName="!overflow-hidden flex flex-col"
    >
      {/* imbalance header */}
      <div className="px-2 pt-1.5 pb-1 shrink-0">
        <div className="flex justify-between num text-[9.5px] mb-0.5">
          <span className="text-up font-semibold">{fmtVol(totBid)}</span>
          <span className={cx('font-bold', imb >= 0 ? 'text-up' : 'text-down')}>{imb >= 0 ? '+' : ''}{imb.toFixed(1)}%</span>
          <span className="text-down font-semibold">{fmtVol(totAsk)}</span>
        </div>
        <div className="h-[5px] rounded bg-panel3 overflow-hidden flex">
          <div className="bg-up/70" style={{ width: `${(totBid / (totBid + totAsk)) * 100}%` }} />
          <div className="bg-down/70 flex-1" />
        </div>
      </div>
      <div className="grid grid-cols-[1fr_64px_1fr] text-[9px] font-semibold uppercase tracking-wider text-text3 px-2 pb-1 shrink-0">
        <span className="text-left">Bid size</span>
        <span className="text-center">Price</span>
        <span className="text-right">Ask size</span>
      </div>
      <div ref={bodyRef} className="flex-1 min-h-0 overflow-auto px-1 pb-1 font-mono">
        {ladder.map((r, i) => {
          const isSpreadTop = r.side === 'bid' && i === book.asks.length;
          const isSpreadBot = r.side === 'ask' && i === book.asks.length - 1;
          const atTouch = isSpreadTop || isSpreadBot;
          return (
            <div key={`${r.price}-${i}`}>
              {isSpreadTop && (
                <div data-spread="1" className="flex items-center justify-center gap-2 h-[20px] my-0.5 rounded bg-panel3 border border-line2">
                  <span className="num text-[10px] text-text1 font-bold">{fmtPrice(q.price, def.decimals)}</span>
                  <span className="num text-[9px] text-text3">SPRD {fmtNum(q.spreadBps, 1)}bp</span>
                </div>
              )}
              <div className={cx('grid grid-cols-[1fr_64px_1fr] h-[19px] items-stretch rounded-sm group/row', atTouch && 'outline outline-1 outline-line2')}>
                <button
                  className="relative text-left overflow-hidden rounded-l-sm hover:brightness-150"
                  style={{ background: r.bid > 0 ? `linear-gradient(90deg, rgba(14,203,129,${0.08 + (r.bid / maxSize) * 0.5}) ${(r.bid / maxSize) * 100}%, transparent ${(r.bid / maxSize) * 100}%)` : undefined }}
                  onClick={() => r.bid > 0 && joinBid(r.price)}
                  title={r.bid > 0 ? `Buy ${qtyN} @ ${fmtPrice(r.price, def.decimals)}` : undefined}
                >
                  {r.bid > 0 && (
                    <span className="num text-[10.5px] pl-1.5 flex items-center gap-1">
                      {r.bid >= maxSize * 0.85 && <span className="w-[5px] h-[5px] rounded-full bg-up inline-block" title="Large resting order" />}
                      {fmtVol(r.bid)}
                      <span className="opacity-0 group-hover/row:opacity-100 text-up font-bold">B</span>
                    </span>
                  )}
                </button>
                <div className={cx('num text-[10.5px] flex items-center justify-center', r.side === 'ask' ? 'text-down/90' : 'text-up/90', atTouch && 'font-bold text-text1')}>
                  {fmtPrice(r.price, def.decimals)}
                </div>
                <button
                  className="relative text-right overflow-hidden rounded-r-sm hover:brightness-150"
                  style={{ background: r.ask > 0 ? `linear-gradient(270deg, rgba(246,70,93,${0.08 + (r.ask / maxSize) * 0.5}) ${(r.ask / maxSize) * 100}%, transparent ${(r.ask / maxSize) * 100}%)` : undefined }}
                  onClick={() => r.ask > 0 && joinAsk(r.price)}
                  title={r.ask > 0 ? `Sell ${qtyN} @ ${fmtPrice(r.price, def.decimals)}` : undefined}
                >
                  {r.ask > 0 && (
                    <span className="num text-[10.5px] pr-1.5 flex items-center gap-1 justify-end">
                      <span className="opacity-0 group-hover/row:opacity-100 text-down font-bold">S</span>
                      {fmtVol(r.ask)}
                      {r.ask >= maxSize * 0.85 && <span className="w-[5px] h-[5px] rounded-full bg-down inline-block" title="Large resting order" />}
                    </span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-2 py-1 border-t border-line text-[9.5px] text-text3 shrink-0">
        Click a bid size to join the bid · click an ask size to join the offer · highlights mark large resting orders
      </div>
    </Panel>
  );
}
