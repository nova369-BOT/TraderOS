import React from 'react';
import { Plus, X } from 'lucide-react';
import { mkRule, type RuleCondition, type RuleOp, type RuleRisk, type RuleSet, type RuleSource } from '../../services/backtestService';
import { cx } from '../../lib/utils';

export const SOURCES: Array<{ id: RuleSource; label: string; param?: string; defRight: number }> = [
  { id: 'price', label: 'Price (close)', defRight: 0 },
  { id: 'sma', label: 'SMA', param: 'len', defRight: 0 },
  { id: 'ema', label: 'EMA', param: 'len', defRight: 0 },
  { id: 'rsi', label: 'RSI', param: 'len', defRight: 30 },
  { id: 'macd', label: 'MACD line', defRight: 0 },
  { id: 'macdSignal', label: 'MACD signal', defRight: 0 },
  { id: 'bbUpper', label: 'BB upper', defRight: 0 },
  { id: 'bbLower', label: 'BB lower', defRight: 0 },
  { id: 'vwap', label: 'Session VWAP', defRight: 0 },
  { id: 'atr', label: 'ATR', param: 'len', defRight: 0 },
  { id: 'volume', label: 'Volume', defRight: 0 },
  { id: 'volSma', label: 'Volume SMA', param: 'len', defRight: 0 },
  { id: 'stochK', label: 'Stoch %K', defRight: 20 },
  { id: 'stochD', label: 'Stoch %D', defRight: 20 },
  { id: 'donUpper', label: 'Donchian upper', param: 'len', defRight: 0 },
  { id: 'donLower', label: 'Donchian lower', param: 'len', defRight: 0 },
  { id: 'obv', label: 'OBV', defRight: 0 },
];

const OPS: Array<{ id: RuleOp; label: string }> = [
  { id: '>', label: '>' },
  { id: '<', label: '<' },
  { id: '>=', label: '≥' },
  { id: '<=', label: '≤' },
  { id: 'crossesAbove', label: 'cross ↑' },
  { id: 'crossesBelow', label: 'cross ↓' },
];

function srcLabel(id: RuleSource): string {
  return SOURCES.find((s) => s.id === id)?.label ?? id;
}

export function condText(c: RuleCondition): string {
  const L = `${srcLabel(c.left)}${SOURCES.find((s) => s.id === c.left)?.param ? `(${c.leftParam})` : ''}`;
  const op = OPS.find((o) => o.id === c.op)?.label ?? c.op;
  const R = c.rightKind === 'value'
    ? String(c.rightValue)
    : `${srcLabel(c.right)}${SOURCES.find((s) => s.id === c.right)?.param ? `(${c.rightParam})` : ''}`;
  return `${L} ${op} ${R}`;
}

function ConditionRow({ cond, onChange, onDelete }: {
  cond: RuleCondition;
  onChange: (c: RuleCondition) => void;
  onDelete: () => void;
}): React.ReactElement {
  const leftDef = SOURCES.find((s) => s.id === cond.left);
  const rightDef = SOURCES.find((s) => s.id === cond.right);
  return (
    <div className="rounded border border-line bg-panel2 p-1.5">
      <div className="flex items-center gap-1">
        <select className="tselect !h-[24px] !text-[10.5px] flex-[1.4]" value={cond.left} onChange={(e) => onChange({ ...cond, left: e.target.value as RuleSource })}>
          {SOURCES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
        {leftDef?.param && (
          <input className="tinput !h-[24px] !w-[44px] !text-[10.5px] text-center" title={leftDef.param} value={cond.leftParam} onChange={(e) => onChange({ ...cond, leftParam: Number(e.target.value) || 0 })} inputMode="numeric" />
        )}
        <select className="tselect !h-[24px] !text-[10.5px] !w-[74px]" value={cond.op} onChange={(e) => onChange({ ...cond, op: e.target.value as RuleOp })}>
          {OPS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
        </select>
        <button className="tbtn tbtn-ghost tbtn-xs !px-1 shrink-0" onClick={onDelete} title="Remove condition"><X size={11} /></button>
      </div>
      <div className="flex items-center gap-1 mt-1">
        <div className="seg shrink-0">
          <button className={cx(cond.rightKind === 'value' && 'active', '!text-[10px]')} onClick={() => onChange({ ...cond, rightKind: 'value' })}>value</button>
          <button className={cx(cond.rightKind === 'source' && 'active', '!text-[10px]')} onClick={() => onChange({ ...cond, rightKind: 'source' })}>signal</button>
        </div>
        {cond.rightKind === 'value' ? (
          <input className="tinput !h-[24px] !text-[10.5px]" value={cond.rightValue} onChange={(e) => onChange({ ...cond, rightValue: Number(e.target.value) || 0 })} inputMode="decimal" />
        ) : (
          <>
            <select className="tselect !h-[24px] !text-[10.5px] flex-1" value={cond.right} onChange={(e) => onChange({ ...cond, right: e.target.value as RuleSource })}>
              {SOURCES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
            {rightDef?.param && (
              <input className="tinput !h-[24px] !w-[44px] !text-[10.5px] text-center" value={cond.rightParam} onChange={(e) => onChange({ ...cond, rightParam: Number(e.target.value) || 0 })} inputMode="numeric" />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function RuleGroup({ title, accent, conds, onChange, emptyHint }: {
  title: string;
  accent: 'up' | 'down' | 'accent' | 'warn';
  conds: RuleCondition[];
  onChange: (c: RuleCondition[]) => void;
  emptyHint: string;
}): React.ReactElement {
  return (
    <div className={cx('rounded-md border bg-panel overflow-hidden',
      accent === 'up' && 'border-up/30', accent === 'down' && 'border-down/30',
      accent === 'accent' && 'border-accent/30', accent === 'warn' && 'border-warn/30')}>
      <div className={cx('flex items-center px-2 h-[28px] border-b border-line',
        accent === 'up' && 'bg-upbg/60', accent === 'down' && 'bg-downbg/60',
        accent === 'accent' && 'bg-accentdim/60', accent === 'warn' && 'bg-warn/10')}>
        <span className={cx('text-[10px] font-bold uppercase tracking-[0.1em]',
          accent === 'up' && 'text-up', accent === 'down' && 'text-down',
          accent === 'accent' && 'text-accent', accent === 'warn' && 'text-warn')}>{title}</span>
        <span className="flex-1" />
        <span className="text-[9.5px] text-text3 mr-1.5">{conds.length === 0 ? 'disabled' : `${conds.length} condition${conds.length > 1 ? 's (AND)' : ''}`}</span>
        <button className="tbtn tbtn-xs" onClick={() => onChange([...conds, mkRule({ left: 'rsi', leftParam: 14, op: 'crossesBelow', rightValue: 30 })])}>
          <Plus size={10} /> Add
        </button>
      </div>
      <div className="p-1.5 space-y-1.5">
        {conds.length === 0 && <div className="text-[10.5px] text-text3 px-1 py-2">{emptyHint}</div>}
        {conds.map((c, i) => (
          <div key={c.id}>
            {i > 0 && <div className="text-center text-[9px] font-bold text-text3 py-0.5">— AND —</div>}
            <ConditionRow
              cond={c}
              onChange={(nc) => onChange(conds.map((x) => (x.id === c.id ? nc : x)))}
              onDelete={() => onChange(conds.filter((x) => x.id !== c.id))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function RiskEditor({ risk, onChange }: { risk: RuleRisk; onChange: (r: RuleRisk) => void }): React.ReactElement {
  return (
    <div className="rounded-md border border-warn/30 bg-panel overflow-hidden">
      <div className="px-2 h-[28px] flex items-center border-b border-line bg-warn/10">
        <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-warn">Risk · exits</span>
      </div>
      <div className="p-2 grid grid-cols-2 gap-2">
        <div>
          <span className="tlabel">Stop loss</span>
          <div className="flex gap-1">
            <select className="tselect !h-[24px] !text-[10.5px]" value={risk.stopType} onChange={(e) => onChange({ ...risk, stopType: e.target.value as RuleRisk['stopType'] })}>
              <option value="atr">ATR ×</option>
              <option value="pct">% </option>
              <option value="none">None</option>
            </select>
            {risk.stopType !== 'none' && (
              <input className="tinput !h-[24px] !text-[10.5px]" value={risk.stopValue} onChange={(e) => onChange({ ...risk, stopValue: Number(e.target.value) || 0 })} inputMode="decimal" />
            )}
          </div>
        </div>
        <div>
          <span className="tlabel">Take profit</span>
          <div className="flex gap-1">
            <select className="tselect !h-[24px] !text-[10.5px]" value={risk.targetType} onChange={(e) => onChange({ ...risk, targetType: e.target.value as RuleRisk['targetType'] })}>
              <option value="atr">ATR ×</option>
              <option value="pct">% </option>
              <option value="none">None</option>
            </select>
            {risk.targetType !== 'none' && (
              <input className="tinput !h-[24px] !text-[10.5px]" value={risk.targetValue} onChange={(e) => onChange({ ...risk, targetValue: Number(e.target.value) || 0 })} inputMode="decimal" />
            )}
          </div>
        </div>
        <div className="col-span-2">
          <span className="tlabel">Max hold (bars, 0 = no time exit)</span>
          <input className="tinput !h-[24px] !text-[10.5px]" value={risk.maxHoldBars} onChange={(e) => onChange({ ...risk, maxHoldBars: Math.max(0, Math.round(Number(e.target.value) || 0)) })} inputMode="numeric" />
        </div>
      </div>
    </div>
  );
}

export function summarizeRules(rules: RuleSet): string[] {
  const lines: string[] = [];
  if (rules.entryLong.length) lines.push(`LONG when ${rules.entryLong.map(condText).join(' AND ')}`);
  if (rules.entryShort.length) lines.push(`SHORT when ${rules.entryShort.map(condText).join(' AND ')}`);
  if (rules.exitLong.length) lines.push(`Exit longs when ${rules.exitLong.map(condText).join(' AND ')}`);
  if (rules.exitShort.length) lines.push(`Exit shorts when ${rules.exitShort.map(condText).join(' AND ')}`);
  const r = rules.risk;
  const stops: string[] = [];
  if (r.stopType !== 'none') stops.push(`stop ${r.stopValue}${r.stopType === 'atr' ? '×ATR' : '%'}`);
  if (r.targetType !== 'none') stops.push(`target ${r.targetValue}${r.targetType === 'atr' ? '×ATR' : '%'}`);
  if (r.maxHoldBars > 0) stops.push(`time exit ${r.maxHoldBars} bars`);
  if (stops.length) lines.push(`Risk: ${stops.join(' · ')}`);
  return lines.length ? lines : ['No rules defined.'];
}
