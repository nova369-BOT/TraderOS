import React, { useEffect, useState } from 'react';
import {
  Bell, ChevronDown, Command, LayoutGrid, Search, Settings, Wifi, WifiOff,
  ArrowUpRight, ArrowDownRight, CircleDollarSign, Zap,
} from 'lucide-react';
import { useWorkspaceStore } from '../../store/useWorkspaceStore';
import { useMarketStore } from '../../store/useMarketStore';
import { useTradingStore } from '../../store/useTradingStore';
import { getSymbol } from '../../services/symbols';
import { fmtMoney, fmtPct, fmtPrice, fmtSignedMoney, fmtVol } from '../../lib/format';
import { cx } from '../../lib/utils';
import { Dropdown } from '../primitives/Menu';

export function Logo({ size = 22 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <rect width="32" height="32" rx="6" fill="#0d1522" stroke="#273449" />
      <path d="M9 22V14M9 14l3-4 3 5 3-7 3 6 2-3" stroke="#0ecb81" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 22h14" stroke="#273449" strokeWidth="2" strokeLinecap="round" />
      <circle cx="23" cy="11" r="2" fill="#4d8dff" />
    </svg>
  );
}

function Clock(): React.ReactElement {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const d = new Date(now);
  const utc = d.toISOString().slice(11, 19);
  const local = d.toLocaleTimeString('en-GB', { hour12: false });
  return (
    <div className="text-right leading-tight hidden xl:block">
      <div className="num text-[11.5px] font-semibold text-text1">{local} <span className="text-text3 font-normal">LOC</span></div>
      <div className="num text-[10px] text-text3">{utc} UTC</div>
    </div>
  );
}

export function TopBar(): React.ReactElement {
  const symbol = useWorkspaceStore((s) => s.symbol);
  const setView = useWorkspaceStore((s) => s.setView);
  const setPalette = useWorkspaceStore((s) => s.setPalette);
  const presets = useWorkspaceStore((s) => s.presets);
  const activePreset = useWorkspaceStore((s) => s.activePreset);
  const applyPreset = useWorkspaceStore((s) => s.applyPreset);
  const quotes = useMarketStore((s) => s.quotes);
  const latency = useMarketStore((s) => s.latency);
  const connected = useMarketStore((s) => s.connected);
  const alerts = useMarketStore((s) => s.alerts);
  const setRightTab = useWorkspaceStore((s) => s.setRightTab);
  const equity = useTradingStore((s) => s.equity);
  const dayPnl = useTradingStore((s) => s.dayPnl);
  const dayPnlPct = useTradingStore((s) => s.dayPnlPct);
  const positions = useTradingStore((s) => s.positions);
  const buyingPower = useTradingStore((s) => s.buyingPower);

  const def = getSymbol(symbol);
  const q = quotes[symbol];
  const chg = q?.changePct ?? 0;
  const active = presets.find((p) => p.id === activePreset);
  const liveAlerts = alerts.filter((a) => !a.triggered).length;

  return (
    <header className="h-[46px] shrink-0 flex items-center gap-2 px-2.5 border-b border-line bg-panel select-none overflow-x-auto overflow-y-hidden [&>*]:shrink-0">
      {/* brand */}
      <button className="flex items-center gap-2 pr-1" onClick={() => setView('markets')} title="TraderOS — Overview (Alt+1)">
        <Logo />
        <span className="leading-none text-left">
          <span className="block text-[13px] font-bold tracking-tight text-text1">Trader<span className="text-up">OS</span></span>
          <span className="block text-[8px] font-semibold tracking-[0.18em] text-text3">TERMINAL · PAPER</span>
        </span>
      </button>

      <div className="w-px h-6 bg-line mx-1" />

      {/* workspace switcher */}
      <Dropdown
        trigger={
          <button className="tbtn !h-[30px] !px-2.5 gap-1.5" title="Switch workspace">
            <LayoutGrid size={13} className="text-accent" />
            <span className="font-semibold">{active?.name ?? 'Main'}</span>
            <ChevronDown size={12} className="text-text3" />
          </button>
        }
        items={presets.map((p) => ({
          label: p.name,
          checked: p.id === activePreset,
          onClick: () => applyPreset(p.id),
        }))}
      />

      {/* global search */}
      <button
        className="hidden md:flex items-center gap-2 h-[30px] px-2.5 rounded border border-line bg-base text-text3 hover:border-line2 hover:text-text2 w-[240px] lg:w-[300px]"
        onClick={() => setPalette(true)}
        title="Search symbols, actions, views (Ctrl/⌘+K)"
      >
        <Search size={13} />
        <span className="text-[11px] flex-1 text-left truncate">Search symbol, action, view…</span>
        <span className="kbd">⌘K</span>
      </button>

      {/* active symbol strip */}
      {q && (
        <button
          className="hidden sm:flex items-center gap-2.5 h-[30px] px-2.5 rounded border border-line bg-base hover:border-line2"
          onClick={() => setView('chart')}
          title="Open chart"
        >
          <span className="text-[12px] font-bold text-text1">{symbol}</span>
          <span className={cx('num text-[12px] font-semibold', q.tickDir === 1 ? 'tick-up' : q.tickDir === -1 ? 'tick-down' : 'text-text1')}>
            {fmtPrice(q.price, def.decimals)}
          </span>
          <span className={cx('num text-[11px] font-medium flex items-center', chg >= 0 ? 'text-up' : 'text-down')}>
            {chg >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {fmtPct(chg)}
          </span>
          <span className="num text-[10px] text-text3 hidden lg:inline">Vol {fmtVol(q.volume)}</span>
        </button>
      )}

      <span className="flex-1" />

      {/* connection */}
      <div className="hidden md:flex items-center gap-1.5 px-2" title={connected ? 'Simulated feed · streaming' : 'Feed disconnected'}>
        <span className={cx('pulse-dot', connected ? 'live' : 'off')} />
        <span className={cx('text-[10px] font-bold tracking-wider', connected ? 'text-up' : 'text-down')}>
          {connected ? 'SIM' : 'OFFLINE'}
        </span>
        <span className="num text-[10px] text-text3">{latency}ms</span>
        {connected ? <Wifi size={12} className="text-text3" /> : <WifiOff size={12} className="text-down" />}
      </div>

      <div className="w-px h-6 bg-line mx-1 hidden md:block" />

      {/* account strip */}
      <button className="hidden lg:flex items-center gap-4 px-1" onClick={() => setView('portfolio')} title="Open portfolio">
        <span className="text-right leading-tight">
          <span className="block text-[9px] font-semibold text-text3 uppercase tracking-wider">Equity</span>
          <span className="block num text-[12px] font-semibold text-text1">{fmtMoney(equity)}</span>
        </span>
        <span className="text-right leading-tight">
          <span className="block text-[9px] font-semibold text-text3 uppercase tracking-wider">Day P&amp;L</span>
          <span className={cx('block num text-[12px] font-semibold', dayPnl >= 0 ? 'text-up' : 'text-down')}>
            {fmtSignedMoney(dayPnl)} <span className="text-[10px] font-medium">({fmtPct(dayPnlPct)})</span>
          </span>
        </span>
        <span className="text-right leading-tight">
          <span className="block text-[9px] font-semibold text-text3 uppercase tracking-wider">BP / Pos</span>
          <span className="block num text-[12px] font-semibold text-text1 flex items-center gap-1 justify-end">
            <CircleDollarSign size={11} className="text-text3" />{fmtVol(buyingPower)}
            <span className="text-text3">·</span>
            <span className={positions.length ? 'text-accent' : 'text-text3'}>{positions.length}</span>
          </span>
        </span>
      </button>

      <div className="w-px h-6 bg-line mx-1 hidden lg:block" />
      <Clock />

      {/* actions */}
      <div className="flex items-center gap-1 ml-1">
        <button className="tbtn tbtn-ghost !h-[30px] !px-2" onClick={() => setPalette(true)} title="Command palette (Ctrl/⌘+K)">
          <Command size={14} />
        </button>
        <button
          className="tbtn tbtn-ghost !h-[30px] !px-2 relative"
          onClick={() => setRightTab('alerts')}
          title="Price alerts"
        >
          <Bell size={14} />
          {liveAlerts > 0 && (
            <span className="absolute top-0.5 right-0.5 min-w-[14px] h-[14px] px-0.5 rounded-full bg-warn text-black num text-[8.5px] font-bold flex items-center justify-center">
              {liveAlerts}
            </span>
          )}
        </button>
        <button className="tbtn !h-[30px] !px-2.5 tbtn-primary" onClick={() => setView('trade')} title="Open execution workspace">
          <Zap size={13} /> <span className="hidden sm:inline font-semibold">Trade</span>
        </button>
        <button className="tbtn tbtn-ghost !h-[30px] !px-2" onClick={() => setView('settings')} title="Settings">
          <Settings size={14} />
        </button>
      </div>
    </header>
  );
}
