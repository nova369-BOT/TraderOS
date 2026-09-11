import React, { useMemo, useState } from 'react';
import { ArrowDownUp, Crosshair, Minus, Plus } from 'lucide-react';
import { marketEngine } from '../../services/marketEngine';
import { getSymbol } from '../../services/symbols';
import { atr } from '../../indicators';
import { useMarketStore } from '../../store/useMarketStore';
import { submitOrder, useTradingStore } from '../../store/useTradingStore';
import { broker, type OrderType, type Side, type TIF } from '../../services/tradingService';
import { fmtMoney, fmtNum, fmtPct, fmtPrice, fmtSignedMoney } from '../../lib/format';
import { Modal } from '../primitives/Modal';
import { cx } from '../../lib/utils';

function StepInput({ value, onChange, step, decimals, min }: {
  value: string; onChange: (v: string) => void; step: number; decimals: number; min?: number;
}): React.ReactElement {
  const bump = (dir: 1 | -1): void => {
    const cur = Number(value) || 0;
    const nv = Math.max(min ?? 0, cur + dir * step);
    onChange(nv.toFixed(decimals));
  };
  return (
    <div className="flex items-stretch">
      <button className="tbtn tbtn-sm !px-1.5 !rounded-r-none !border-r-0" onClick={() => bump(-1)}><Minus size={11} /></button>
      <input
        className="tinput !h-[26px] !rounded-none text-center"
        value={value} onChange={(e) => onChange(e.target.value)} inputMode="decimal"
      />
      <button className="tbtn tbtn-sm !px-1.5 !rounded-l-none !border-l-0" onClick={() => bump(1)}><Plus size={11} /></button>
    </div>
  );
}

export function OrderTicket({ symbol, onDone }: { symbol: string; onDone?: () => void }): React.ReactElement {
  const def = getSymbol(symbol);
  const quotes = useMarketStore((s) => s.quotes);
  const q = quotes[symbol] ?? marketEngine.getQuote(symbol);
  const equity = useTradingStore((s) => s.equity);
  const buyingPower = useTradingStore((s) => s.buyingPower);
  const positions = useTradingStore((s) => s.positions);
  const lastError = useTradingStore((s) => s.lastError);
  const pos = positions.find((p) => p.symbol === symbol);

  const [side, setSide] = useState<Side>('BUY');
  const [type, setType] = useState<OrderType>('LMT');
  const [qty, setQty] = useState('1');
  const [limit, setLimit] = useState('');
  const [stop, setStop] = useState('');
  const [tif, setTif] = useState<TIF>('GTC');
  const [reduceOnly, setReduceOnly] = useState(false);
  const [leverage, setLeverage] = useState(1);
  const [useBracket, setUseBracket] = useState(true);
  const [stopAtr, setStopAtr] = useState('1.5');
  const [targetAtr, setTargetAtr] = useState('3');
  const [review, setReview] = useState(false);

  const tick = def.tick;
  const px = type === 'MKT' ? (side === 'BUY' ? q.ask : q.bid) : Number(limit) || q.price;
  const qtyN = Math.max(0, Number(qty) || 0);

  const atrVal = useMemo(() => {
    const candles = marketEngine.getCandles(symbol, '15m', 60);
    const a = atr(candles, 14);
    return a[a.length - 1] ?? q.price * 0.01;
  }, [symbol, q.price]);

  const dir = side === 'BUY' ? 1 : -1;
  const bStop = useBracket ? px - dir * atrVal * (Number(stopAtr) || 0) : null;
  const bTarget = useBracket ? px + dir * atrVal * (Number(targetAtr) || 0) : null;
  const notional = qtyN * px;
  const margin = notional / Math.max(1, leverage);
  const fee = (notional * 2.5) / 10000;
  const maxLoss = bStop ? Math.abs(px - bStop) * qtyN + fee : fee;
  const maxGain = bTarget ? Math.abs(bTarget - px) * qtyN - fee : 0;
  const riskPct = equity > 0 ? (maxLoss / equity) * 100 : 0;
  const rMultiple = maxLoss > fee ? maxGain / Math.max(1e-9, maxLoss - fee) : 0;

  const qtyPresets = [0.25, 0.5, 0.75, 1];
  const setQtyPct = (f: number): void => {
    const maxQ = buyingPower / Math.max(1e-9, px);
    setQty((maxQ * f).toFixed(def.asset === 'FX' ? 0 : def.asset === 'CRYPTO' && px > 1000 ? 4 : 2));
  };

  const submit = (): void => {
    const touch = side === 'BUY' ? q.bid : q.ask;
    const ok = submitOrder({
      symbol,
      side,
      type,
      qty: qtyN,
      limitPrice: type === 'LMT' || type === 'STP_LMT' ? Number(limit) || touch : null,
      stopPrice: type === 'STP' || type === 'STP_LMT' ? Number(stop) || null : null,
      tif,
      reduceOnly,
      leverage,
      bracketStop: type === 'MKT' || type === 'LMT' ? bStop : null,
      bracketTarget: type === 'MKT' || type === 'LMT' ? bTarget : null,
      tag: 'ticket',
    });
    if (ok) {
      setReview(false);
      onDone?.();
    }
  };

  const needLimit = type === 'LMT' || type === 'STP_LMT';
  const needStop = type === 'STP' || type === 'STP_LMT';

  return (
    <div className="flex flex-col gap-2 p-2.5">
      {/* side */}
      <div className="grid grid-cols-2 gap-1.5">
        <button className={cx('h-[32px] rounded font-bold text-[12.5px] transition-colors', side === 'BUY' ? 'bg-up text-[#04120c]' : 'bg-upbg text-up border border-up/40 hover:bg-up hover:text-[#04120c]')} onClick={() => setSide('BUY')}>
          BUY / LONG
        </button>
        <button className={cx('h-[32px] rounded font-bold text-[12.5px] transition-colors', side === 'SELL' ? 'bg-down text-[#1a0508]' : 'bg-downbg text-down border border-down/40 hover:bg-down hover:text-[#1a0508]')} onClick={() => setSide('SELL')}>
          SELL / SHORT
        </button>
      </div>

      {/* type */}
      <div>
        <span className="tlabel">Order type</span>
        <div className="seg w-full !flex">
          {(['MKT', 'LMT', 'STP', 'STP_LMT'] as OrderType[]).map((t) => (
            <button key={t} className={cx('flex-1', type === t && 'active')} onClick={() => setType(t)}>
              {t === 'STP_LMT' ? 'STP-LMT' : t}
            </button>
          ))}
        </div>
      </div>

      {/* price fields */}
      <div className="grid grid-cols-2 gap-1.5">
        {needLimit && (
          <div>
            <span className="tlabel">Limit price</span>
            <StepInput value={limit || String(q.price.toFixed(def.decimals))} onChange={setLimit} step={tick * 5} decimals={def.decimals} />
          </div>
        )}
        {needStop && (
          <div>
            <span className="tlabel">Stop price</span>
            <StepInput value={stop} onChange={setStop} step={tick * 5} decimals={def.decimals} />
          </div>
        )}
        <div className={needLimit && needStop ? 'col-span-2' : ''}>
          <span className="tlabel">Quantity</span>
          <StepInput value={qty} onChange={setQty} step={def.asset === 'FX' ? 1000 : 1} decimals={def.asset === 'FX' ? 0 : 4} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1">
        {qtyPresets.map((f) => (
          <button key={f} className="tbtn tbtn-xs" onClick={() => setQtyPct(f)} title={`${f * 100}% of buying power`}>{f * 100}%</button>
        ))}
      </div>

      {/* tif / leverage / reduce */}
      <div className="grid grid-cols-3 gap-1.5">
        <div>
          <span className="tlabel">TIF</span>
          <select className="tselect !h-[26px]" value={tif} onChange={(e) => setTif(e.target.value as TIF)}>
            <option value="GTC">GTC</option>
            <option value="DAY">DAY</option>
            <option value="IOC">IOC</option>
            <option value="FOK">FOK</option>
          </select>
        </div>
        <div>
          <span className="tlabel">Leverage {leverage}x</span>
          <input type="range" min={1} max={def.asset === 'EQUITY' ? 4 : 20} value={leverage} onChange={(e) => setLeverage(Number(e.target.value))} className="w-full h-[26px]" />
        </div>
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-1.5 text-[11px] text-text2 cursor-pointer">
            <input type="checkbox" checked={reduceOnly} onChange={(e) => setReduceOnly(e.target.checked)} />
            Reduce-only
          </label>
        </div>
      </div>

      {/* bracket */}
      <div className="rounded border border-line bg-panel2 p-2">
        <label className="flex items-center gap-1.5 text-[11px] font-medium text-text1 cursor-pointer">
          <input type="checkbox" checked={useBracket} onChange={(e) => setUseBracket(e.target.checked)} />
          Bracket (stop + target, OCO)
        </label>
        {useBracket && (
          <div className="grid grid-cols-2 gap-1.5 mt-1.5">
            <div>
              <span className="tlabel">Stop · ATR ×</span>
              <input className="tinput !h-[26px]" value={stopAtr} onChange={(e) => setStopAtr(e.target.value)} inputMode="decimal" />
              <div className="num text-[10px] text-down mt-0.5">{bStop ? fmtPrice(bStop, def.decimals) : '—'}</div>
            </div>
            <div>
              <span className="tlabel">Target · ATR ×</span>
              <input className="tinput !h-[26px]" value={targetAtr} onChange={(e) => setTargetAtr(e.target.value)} inputMode="decimal" />
              <div className="num text-[10px] text-up mt-0.5">{bTarget ? fmtPrice(bTarget, def.decimals) : '—'}</div>
            </div>
          </div>
        )}
      </div>

      {/* risk calc */}
      <div className="rounded border border-line bg-base px-2 py-1.5 grid grid-cols-2 gap-x-3 gap-y-1 text-[10.5px]">
        <span className="text-text3">Ref price</span><span className="num text-right text-text1">{fmtPrice(px, def.decimals)}</span>
        <span className="text-text3">Notional</span><span className="num text-right text-text1">{fmtMoney(notional, 0)}</span>
        <span className="text-text3">Margin ({leverage}x)</span><span className="num text-right text-text1">{fmtMoney(margin, 0)}</span>
        <span className="text-text3">Est. fee</span><span className="num text-right text-text2">{fmtMoney(fee)}</span>
        <span className="text-text3">Max loss</span><span className="num text-right text-down font-semibold">{fmtSignedMoney(-maxLoss)}</span>
        <span className="text-text3">Risk % equity</span><span className={cx('num text-right font-semibold', riskPct > 2 ? 'text-down' : riskPct > 1 ? 'text-warn' : 'text-text1')}>{fmtPct(riskPct)}</span>
        <span className="text-text3">Reward : Risk</span><span className="num text-right text-up font-semibold">{rMultiple.toFixed(2)}R</span>
        <span className="text-text3">ATR(14)</span><span className="num text-right text-text2">{fmtPrice(atrVal, def.decimals)}</span>
      </div>

      {lastError && (
        <div className="rounded border border-down/50 bg-downbg px-2 py-1.5 text-[10.5px] text-down leading-snug">{lastError}</div>
      )}

      <button
        className={cx('h-[34px] rounded font-bold text-[13px]', side === 'BUY' ? 'bg-up text-[#04120c] hover:brightness-110' : 'bg-down text-[#1a0508] hover:brightness-110')}
        onClick={() => setReview(true)}
        disabled={qtyN <= 0}
      >
        Review {side} {qty || '0'} {symbol}
      </button>

      {/* open position in symbol */}
      {pos && (
        <div className="rounded border border-line2 bg-panel2 p-2">
          <div className="flex items-center gap-1.5 mb-1">
            <Crosshair size={11} className="text-accent" />
            <span className="text-[10.5px] font-semibold text-text1">Open {pos.side}</span>
            <span className="num text-[10.5px] text-text2">{fmtNum(pos.qty, 4)} @ {fmtPrice(pos.avgEntry, def.decimals)}</span>
            <span className="flex-1" />
            <span className={cx('num text-[11px] font-bold', pos.unrealized >= 0 ? 'text-up' : 'text-down')}>{fmtSignedMoney(pos.unrealized)}</span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <button className="tbtn tbtn-xs" onClick={() => broker.closePosition(symbol, 0.5)}>Close ½</button>
            <button className="tbtn tbtn-xs" onClick={() => broker.closePosition(symbol, 1)}>Close all</button>
            <button className="tbtn tbtn-xs" onClick={() => broker.reversePosition(symbol)} title="Close and open opposite"><ArrowDownUp size={10} /> Reverse</button>
          </div>
        </div>
      )}

      {/* review modal */}
      {review && (
        <Modal
          title={`Review ${side} order`}
          subtitle={`${symbol} · ${type} · ${tif}${reduceOnly ? ' · reduce-only' : ''}`}
          onClose={() => setReview(false)}
          width={420}
          footer={
            <>
              <button className="tbtn" onClick={() => setReview(false)}>Back</button>
              <button className={cx('tbtn font-bold', side === 'BUY' ? 'tbtn-buy' : 'tbtn-sell')} onClick={submit}>
                Confirm {side} {qty} {symbol}
              </button>
            </>
          }
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11.5px]">
            <span className="text-text3">Side / Type</span><span className={cx('text-right font-bold', side === 'BUY' ? 'text-up' : 'text-down')}>{side} · {type}</span>
            <span className="text-text3">Quantity</span><span className="num text-right">{fmtNum(qtyN, 4)}</span>
            <span className="text-text3">Reference price</span><span className="num text-right">{fmtPrice(px, def.decimals)}</span>
            {needLimit && <><span className="text-text3">Limit</span><span className="num text-right">{limit || '—'}</span></>}
            {needStop && <><span className="text-text3">Stop</span><span className="num text-right">{stop || '—'}</span></>}
            <span className="text-text3">Notional / Margin</span><span className="num text-right">{fmtMoney(notional, 0)} / {fmtMoney(margin, 0)}</span>
            {useBracket && <><span className="text-text3">Bracket stop</span><span className="num text-right text-down">{bStop ? fmtPrice(bStop, def.decimals) : '—'}</span></>}
            {useBracket && <><span className="text-text3">Bracket target</span><span className="num text-right text-up">{bTarget ? fmtPrice(bTarget, def.decimals) : '—'}</span></>}
            <span className="text-text3">Max loss / Risk</span><span className="num text-right text-down font-semibold">{fmtSignedMoney(-maxLoss)} ({fmtPct(riskPct)})</span>
          </div>
          <p className="text-[10px] text-text3 mt-2">Paper execution: market orders fill at touch, resting orders fill on touch-through with 2.5bps taker fee. No real capital at risk.</p>
        </Modal>
      )}
    </div>
  );
}
