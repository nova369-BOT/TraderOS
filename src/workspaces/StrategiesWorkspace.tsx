import React, { useState } from 'react';
import { Copy, FlaskConical, Plus, Trash2 } from 'lucide-react';
import { TIMEFRAMES, type Timeframe } from '../services/symbols';
import { defaultRisk, mkRule, templateStrategies, type BuiltStrategy } from '../services/backtestService';
import { useResearchStore } from '../store/useResearchStore';
import { useWorkspaceStore } from '../store/useWorkspaceStore';
import { Panel, EmptyState } from '../components/primitives/Panel';
import { SplitPane } from '../components/primitives/SplitPane';
import { Modal, Field } from '../components/primitives/Modal';
import { SymbolSearch } from '../components/market/SymbolSearch';
import { RiskEditor, RuleGroup, summarizeRules } from '../components/research/RuleBuilder';
import { fmtDateTime } from '../lib/format';
import { cx } from '../lib/utils';

export function StrategiesWorkspace(): React.ReactElement {
  const strategies = useResearchStore((s) => s.strategies);
  const activeId = useResearchStore((s) => s.activeStrategyId);
  const setActive = useResearchStore((s) => s.setActiveStrategy);
  const updateRules = useResearchStore((s) => s.updateStrategyRules);
  const updateMeta = useResearchStore((s) => s.updateStrategyMeta);
  const addStrategy = useResearchStore((s) => s.addStrategy);
  const duplicate = useResearchStore((s) => s.duplicateStrategy);
  const del = useResearchStore((s) => s.deleteStrategy);
  const setView = useWorkspaceStore((s) => s.setView);
  const [newOpen, setNewOpen] = useState(false);

  const active = strategies.find((s) => s.id === activeId) ?? strategies[0];

  return (
    <div className="flex-1 min-h-0 flex p-2 gap-2 overflow-hidden">
      <SplitPane
        storageKey="strat-left"
        defaultSize={250} min={200} max={380}
        left={
          <div className="flex-1 min-h-0 flex pr-2">
            <Panel
              title="Strategies"
              subtitle={`${strategies.length} saved`}
              actions={<button className="tbtn tbtn-xs" onClick={() => setNewOpen(true)}><Plus size={11} /> New</button>}
            >
              <div className="divide-y divide-line/60">
                {strategies.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    className={cx('w-full text-left px-2.5 py-2 hover:bg-hover', s.id === active?.id && 'bg-accentdim')}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px] font-bold truncate flex-1">{s.name}</span>
                      {s.template !== 'custom' && <span className="badge badge-mute !h-[14px]">{s.template}</span>}
                    </div>
                    <div className="num text-[10px] text-text3 mt-0.5">{s.symbol} · {s.timeframe} · {s.rules.entryLong.length + s.rules.entryShort.length} entries</div>
                  </button>
                ))}
              </div>
            </Panel>
          </div>
        }
        right={
          active ? (
            <SplitPane
              storageKey="strat-right"
              defaultSize={320} min={260} max={480}
              flip
              left={
                <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-auto pl-2">
                  <Panel title="Definition" bodyClassName="p-2 space-y-2">
                    <Field label="Name">
                      <input className="tinput" value={active.name} onChange={(e) => updateMeta(active.id, { name: e.target.value })} />
                    </Field>
                    <Field label="Description">
                      <textarea
                        className="tinput !h-auto !py-1.5 !font-sans !text-[11px] leading-snug resize-none"
                        rows={2}
                        value={active.description}
                        onChange={(e) => updateMeta(active.id, { description: e.target.value })}
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Symbol">
                        <SymbolPickerButton symbol={active.symbol} onPick={(symbol) => updateMeta(active.id, { symbol })} />
                      </Field>
                      <Field label="Timeframe">
                        <select className="tselect" value={active.timeframe} onChange={(e) => updateMeta(active.id, { timeframe: e.target.value as Timeframe })}>
                          {TIMEFRAMES.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </Field>
                    </div>
                    <div className="text-[10px] text-text3">Updated {fmtDateTime(active.updatedAt)}</div>
                    <div className="flex gap-1">
                      <button className="tbtn tbtn-sm flex-1" onClick={() => duplicate(active.id)}><Copy size={11} /> Duplicate</button>
                      <button className="tbtn tbtn-sm" onClick={() => del(active.id)} title="Delete strategy"><Trash2 size={11} /></button>
                    </div>
                  </Panel>
                  <RiskEditor risk={active.rules.risk} onChange={(risk) => updateRules(active.id, { ...active.rules, risk })} />
                  <Panel title="Compiled logic" bodyClassName="p-2">
                    <div className="font-mono text-[10.5px] leading-relaxed space-y-1">
                      {summarizeRules(active.rules).map((l, i) => (
                        <div key={i} className="rounded bg-base border border-line px-2 py-1 text-text2">{l}</div>
                      ))}
                    </div>
                    <button
                      className="tbtn tbtn-primary w-full mt-2 !h-[30px] font-semibold"
                      onClick={() => {
                        setView('backtest');
                      }}
                    >
                      <FlaskConical size={13} /> Open in Backtest Lab
                    </button>
                  </Panel>
                </div>
              }
              right={
                <div className="flex-1 min-h-0 overflow-auto">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                    <RuleGroup
                      title="▲ Enter long" accent="up"
                      conds={active.rules.entryLong}
                      onChange={(entryLong) => updateRules(active.id, { ...active.rules, entryLong })}
                      emptyHint="No long entries — strategy will never go long."
                    />
                    <RuleGroup
                      title="▼ Enter short" accent="down"
                      conds={active.rules.entryShort}
                      onChange={(entryShort) => updateRules(active.id, { ...active.rules, entryShort })}
                      emptyHint="No short entries — strategy will never go short."
                    />
                    <RuleGroup
                      title="Exit long" accent="accent"
                      conds={active.rules.exitLong}
                      onChange={(exitLong) => updateRules(active.id, { ...active.rules, exitLong })}
                      emptyHint="No long exits — longs rely on stop / target / time exits."
                    />
                    <RuleGroup
                      title="Exit short" accent="warn"
                      conds={active.rules.exitShort}
                      onChange={(exitShort) => updateRules(active.id, { ...active.rules, exitShort })}
                      emptyHint="No short exits — shorts rely on stop / target / time exits."
                    />
                  </div>
                </div>
              }
            />
          ) : (
            <div className="flex-1"><EmptyState title="No strategies" hint="Create one from a template to start building." /></div>
          )
        }
      />
      {newOpen && <NewStrategyModal onClose={() => setNewOpen(false)} onCreate={(s) => { addStrategy(s); setNewOpen(false); }} />}
    </div>
  );
}

function SymbolPickerButton({ symbol, onPick }: { symbol: string; onPick: (s: string) => void }): React.ReactElement {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="tinput !h-[24px] text-left font-bold" onClick={() => setOpen(true)}>{symbol}</button>
      {open && (
        <Modal title="Strategy symbol" onClose={() => setOpen(false)} width={480}>
          <div style={{ height: 360 }} className="flex flex-col">
            <SymbolSearch autoFocus onPick={(s) => { onPick(s); setOpen(false); }} />
          </div>
        </Modal>
      )}
    </>
  );
}

function NewStrategyModal({ onClose, onCreate }: { onClose: () => void; onCreate: (s: BuiltStrategy) => void }): React.ReactElement {
  const [name, setName] = useState('My strategy');
  const [tpl, setTpl] = useState(0);
  const templates = templateStrategies('BTCUSDT', '1h');
  return (
    <Modal
      title="New strategy" subtitle="Start blank or clone a template" onClose={onClose} width={520}
      footer={
        <>
          <button className="tbtn" onClick={onClose}>Cancel</button>
          <button
            className="tbtn tbtn-primary"
            onClick={() => {
              if (tpl < 0) {
                onCreate({
                  id: `strat-${Date.now().toString(36)}`, name, description: 'Custom rule-based strategy.',
                  symbol: 'BTCUSDT', timeframe: '1h', template: 'custom', updatedAt: Date.now(), params: {},
                  rules: {
                    entryLong: [mkRule({ left: 'rsi', leftParam: 14, op: 'crossesBelow', rightValue: 30 })],
                    entryShort: [], exitLong: [mkRule({ left: 'rsi', leftParam: 14, op: 'crossesAbove', rightValue: 50 })],
                    exitShort: [], risk: defaultRisk(),
                  },
                });
              } else {
                const t = templates[tpl];
                onCreate({ ...JSON.parse(JSON.stringify(t)), id: `strat-${Date.now().toString(36)}`, name, updatedAt: Date.now() });
              }
            }}
          >
            Create strategy
          </button>
        </>
      }
    >
      <Field label="Name">
        <input className="tinput" autoFocus value={name} onChange={(e) => setName(e.target.value)} />
      </Field>
      <div className="tlabel mt-2">Template</div>
      <div className="space-y-1.5">
        <button className={cx('w-full text-left rounded border px-2.5 py-2 hover:border-line2', tpl === -1 ? 'border-accent bg-accentdim' : 'border-line')} onClick={() => setTpl(-1)}>
          <div className="text-[12px] font-bold">Blank canvas</div>
          <div className="text-[10.5px] text-text3">RSI mean-reversion starter with ATR risk.</div>
        </button>
        {templates.map((t, i) => (
          <button key={t.id} className={cx('w-full text-left rounded border px-2.5 py-2 hover:border-line2', tpl === i ? 'border-accent bg-accentdim' : 'border-line')} onClick={() => { setTpl(i); if (!name || name === 'My strategy') setName(`${t.name} (mine)`); }}>
            <div className="text-[12px] font-bold">{t.name} <span className="badge badge-mute ml-1">{t.template}</span></div>
            <div className="text-[10.5px] text-text3">{t.description}</div>
          </button>
        ))}
      </div>
    </Modal>
  );
}
