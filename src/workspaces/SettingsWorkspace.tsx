import React, { useState } from 'react';
import { Database, Keyboard, LayoutGrid, Paintbrush, RotateCcw, Save, Trash2 } from 'lucide-react';
import { SYMBOLS } from '../services/symbols';
import { useWorkspaceStore } from '../store/useWorkspaceStore';
import { useMarketStore } from '../store/useMarketStore';
import { useTradingStore } from '../store/useTradingStore';
import { broker } from '../services/tradingService';
import { fmtMoney } from '../lib/format';
import { Panel } from '../components/primitives/Panel';
import { cx } from '../lib/utils';

export function SettingsWorkspace(): React.ReactElement {
  const presets = useWorkspaceStore((s) => s.presets);
  const activePreset = useWorkspaceStore((s) => s.activePreset);
  const applyPreset = useWorkspaceStore((s) => s.applyPreset);
  const savePreset = useWorkspaceStore((s) => s.savePreset);
  const deletePreset = useWorkspaceStore((s) => s.deletePreset);
  const density = useWorkspaceStore((s) => s.density);
  const setDensity = useWorkspaceStore((s) => s.setDensity);
  const latency = useMarketStore((s) => s.latency);
  const tick = useMarketStore((s) => s.tick);
  const equity = useTradingStore((s) => s.equity);
  const [presetName, setPresetName] = useState('');

  const resetPaper = (): void => {
    if (!confirm('Reset the paper account to $250,000 and clear all orders/fills?')) return;
    broker.cash = 250000;
    broker.startingEquity = 250000;
    broker.realizedToday = 0;
    broker.feesToday = 0;
    broker.orders = [];
    broker.fills = [];
    broker.positions.clear();
    broker.equityHistory = [{ time: Date.now(), equity: 250000 }];
    useTradingStore.getState().refresh();
  };

  const wipeUI = (): void => {
    if (!confirm('Clear all saved UI state (layouts, drawings, watchlists)?')) return;
    try {
      Object.keys(localStorage).filter((k) => k.startsWith('traderos-')).forEach((k) => localStorage.removeItem(k));
    } catch { /* ignore */ }
    location.reload();
  };

  return (
    <div className="flex-1 min-h-0 overflow-auto p-3">
      <div className="max-w-[980px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-2 pb-4">
        {/* workspaces */}
        <Panel title="Saved workspaces" subtitle={`${presets.length} presets`} actions={<LayoutGrid size={12} className="text-text3" />}>
          <div className="divide-y divide-line/60">
            {presets.map((p) => (
              <div key={p.id} className={cx('px-2.5 py-2 flex items-center gap-2', p.id === activePreset && 'bg-accentdim/50')}>
                <button className="flex-1 text-left min-w-0" onClick={() => applyPreset(p.id)}>
                  <span className="block text-[12px] font-bold truncate">{p.name} {p.id === activePreset && <span className="badge badge-info ml-1">active</span>}</span>
                  <span className="block num text-[10px] text-text3">{p.view} · {p.symbol} · {p.timeframe}</span>
                </button>
                {presets.length > 1 && (
                  <button className="tbtn tbtn-ghost tbtn-xs !px-1.5" title="Delete preset" onClick={() => deletePreset(p.id)}><Trash2 size={11} /></button>
                )}
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-line flex gap-1.5">
            <input className="tinput" placeholder="Save current layout as…" value={presetName} onChange={(e) => setPresetName(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && presetName.trim()) { savePreset(presetName.trim()); setPresetName(''); } }} />
            <button className="tbtn tbtn-primary shrink-0" disabled={!presetName.trim()} onClick={() => { savePreset(presetName.trim()); setPresetName(''); }}>
              <Save size={12} /> Save
            </button>
          </div>
        </Panel>

        {/* appearance */}
        <Panel title="Appearance" actions={<Paintbrush size={12} className="text-text3" />} bodyClassName="p-2.5 space-y-2.5">
          <div>
            <span className="tlabel">Density</span>
            <div className="seg">
              <button className={cx(density === 'compact' && 'active')} onClick={() => setDensity('compact')}>Compact (terminal)</button>
              <button className={cx(density === 'comfortable' && 'active')} onClick={() => setDensity('comfortable')}>Comfortable</button>
            </div>
            <p className="text-[10px] text-text3 mt-1">Compact matches institutional terminal density. Comfortable adds breathing room on smaller screens.</p>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { l: 'Up', c: '#0ecb81' }, { l: 'Down', c: '#f6465d' },
              { l: 'Accent', c: '#4d8dff' }, { l: 'Warn', c: '#f0b90b' },
            ].map((s) => (
              <div key={s.l} className="rounded border border-line bg-base p-1.5 text-center">
                <div className="w-full h-[18px] rounded" style={{ background: s.c }} />
                <div className="text-[10px] text-text2 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </Panel>

        {/* data + engine */}
        <Panel title="Data & execution engine" actions={<Database size={12} className="text-text3" />} bodyClassName="p-2.5 space-y-2">
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <InfoRow k="Feed" v="SIM · tick engine" />
            <InfoRow k="Latency" v={`${latency}ms`} />
            <InfoRow k="Ticks processed" v={tick.toLocaleString()} />
            <InfoRow k="Symbols" v={`${SYMBOLS.length} · 5 asset classes`} />
            <InfoRow k="Broker" v="Paper (simulated)" />
            <InfoRow k="Fees" v="2.5 bps taker" />
            <InfoRow k="Account equity" v={fmtMoney(equity, 0)} />
            <InfoRow k="Margin mode" v="Cross · up to 20x" />
          </div>
          <p className="text-[10.5px] text-text3 leading-relaxed">
            TraderOS runs on a simulated market-data feed and paper broker that mirror the interfaces of production
            adapters (quotes, candles, book, tape, orders, fills). A live backend can replace these services without UI changes.
          </p>
          <div className="flex gap-1.5">
            <button className="tbtn tbtn-sm" onClick={resetPaper}><RotateCcw size={11} /> Reset paper account</button>
            <button className="tbtn tbtn-sm" onClick={wipeUI}><Trash2 size={11} /> Clear saved UI state</button>
          </div>
        </Panel>

        {/* shortcuts */}
        <Panel title="Keyboard shortcuts" actions={<Keyboard size={12} className="text-text3" />} bodyClassName="p-2.5">
          <div className="space-y-1.5 text-[11px]">
            {[
              ['⌘/Ctrl + K', 'Command palette (symbols, views, actions)'],
              ['Alt + 1…0', 'Jump to Markets, Chart, Order Flow, Scanner, Trade, Portfolio, Strategies, Backtest, Intel, AI'],
              ['↑ / ↓ + Enter', 'Navigate palette & search results'],
              ['Esc', 'Close dialogs & palette'],
              ['Double-click row', 'Open symbol in chart'],
              ['Right-click', 'Context actions everywhere'],
            ].map(([k, d]) => (
              <div key={k} className="flex items-center gap-2">
                <span className="kbd shrink-0">{k}</span>
                <span className="text-text2">{d}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-2 border-t border-line text-[10px] text-text3 leading-relaxed">
            TraderOS v1.0 · paper-trading terminal. Simulated data and execution — no real orders are routed.
            Nothing here is financial advice. Trade at your own risk.
          </div>
        </Panel>
      </div>
    </div>
  );
}

function InfoRow({ k, v }: { k: string; v: string }): React.ReactElement {
  return (
    <div className="rounded bg-base border border-line px-2 py-1.5">
      <div className="text-[9px] font-bold uppercase tracking-wider text-text3">{k}</div>
      <div className="num text-[11.5px] font-semibold mt-0.5">{v}</div>
    </div>
  );
}
