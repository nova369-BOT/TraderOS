import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, X, XCircle } from 'lucide-react';
import { useWorkspaceStore, type ViewId } from './store/useWorkspaceStore';
import { useMarketStore } from './store/useMarketStore';
import { useTradingStore } from './store/useTradingStore';
import { getSymbol } from './services/symbols';
import { fmtPrice } from './lib/format';
import { TopBar } from './components/shell/TopBar';
import { LeftNav } from './components/shell/LeftNav';
import { TickerTape } from './components/shell/TickerTape';
import { RightPanel } from './components/shell/RightPanel';
import { BottomTerminal } from './components/shell/BottomTerminal';
import { StatusBar } from './components/shell/StatusBar';
import { CommandPalette } from './components/shell/CommandPalette';
import { ContextMenuHost } from './components/primitives/Menu';
import { MarketsWorkspace } from './workspaces/MarketsWorkspace';
import { ChartWorkspace } from './workspaces/ChartWorkspace';
import { OrderFlowWorkspace } from './workspaces/OrderFlowWorkspace';
import { TradeWorkspace } from './workspaces/TradeWorkspace';
import { PortfolioWorkspace } from './workspaces/PortfolioWorkspace';
import { ScannerWorkspace } from './workspaces/ScannerWorkspace';
import { StrategiesWorkspace } from './workspaces/StrategiesWorkspace';
import { BacktestWorkspace } from './workspaces/BacktestWorkspace';
import { IntelWorkspace } from './workspaces/IntelWorkspace';
import { AIWorkspace } from './workspaces/AIWorkspace';
import { SettingsWorkspace } from './workspaces/SettingsWorkspace';

const VIEW_ORDER: ViewId[] = ['markets', 'chart', 'orderflow', 'scanner', 'trade', 'portfolio', 'strategies', 'backtest', 'intel', 'ai'];

function useShortcuts(): void {
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      const ws = useWorkspaceStore.getState();
      const target = e.target as HTMLElement;
      const typing = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        ws.setPalette(!ws.paletteOpen);
        return;
      }
      if (e.key === 'Escape') {
        if (ws.paletteOpen) ws.setPalette(false);
        return;
      }
      if (typing) return;
      if (e.altKey && /^[0-9]$/.test(e.key)) {
        e.preventDefault();
        const idx = e.key === '0' ? 9 : Number(e.key) - 1;
        const v = VIEW_ORDER[idx];
        if (v) ws.setView(v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
}

function AlertBanner(): React.ReactElement | null {
  const triggeredId = useMarketStore((s) => s.triggeredAlert);
  const alerts = useMarketStore((s) => s.alerts);
  const dismiss = useMarketStore((s) => s.dismissAlert);
  const quotes = useMarketStore((s) => s.quotes);
  const setSymbol = useWorkspaceStore((s) => s.setSymbol);
  const setView = useWorkspaceStore((s) => s.setView);
  if (!triggeredId) return null;
  const a = alerts.find((x) => x.id === triggeredId);
  if (!a) return null;
  const q = quotes[a.symbol];
  return (
    <div className="shrink-0 flex items-center gap-2 px-3 h-[30px] bg-warn/15 border-b border-warn/40 text-[11.5px]">
      <AlertTriangle size={13} className="text-warn shrink-0" />
      <span className="font-bold text-warn">ALERT</span>
      <button
        className="hover:underline"
        onClick={() => { setSymbol(a.symbol); setView('chart'); dismiss(); }}
      >
        <span className="font-bold text-text1">{a.symbol}</span>
        <span className="text-text2"> traded {a.condition} </span>
        <span className="num font-semibold text-text1">{fmtPrice(a.price, getSymbol(a.symbol).decimals)}</span>
        {q && <span className="num text-text3"> · now {fmtPrice(q.price, getSymbol(a.symbol).decimals)}</span>}
      </button>
      <span className="flex-1" />
      <button className="tbtn tbtn-xs" onClick={() => { setSymbol(a.symbol); setView('chart'); dismiss(); }}>Open chart</button>
      <button className="tbtn tbtn-ghost tbtn-xs !px-1" onClick={dismiss}><X size={12} /></button>
    </div>
  );
}

function Toasts(): React.ReactElement | null {
  const lastError = useTradingStore((s) => s.lastError);
  const lastNotice = useTradingStore((s) => s.lastNotice);
  const clear = useTradingStore((s) => s.clearNotice);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!lastError && !lastNotice) return;
    setVisible((v) => v + 1);
    const t = setTimeout(clear, 5000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastError, lastNotice]);

  if (!lastError && !lastNotice) return null;
  return (
    <div className="fixed bottom-8 right-3 z-[96] space-y-1.5 w-[340px]" key={visible}>
      {lastError && (
        <div className="rounded-md border border-down/50 bg-panel2 px-3 py-2 shadow-2xl flex items-start gap-2">
          <XCircle size={14} className="text-down shrink-0 mt-0.5" />
          <div className="flex-1 text-[11.5px] leading-snug">{lastError}</div>
          <button className="tbtn tbtn-ghost tbtn-xs !px-1" onClick={clear}><X size={11} /></button>
        </div>
      )}
      {lastNotice && !lastError && (
        <div className="rounded-md border border-up/40 bg-panel2 px-3 py-2 shadow-2xl flex items-start gap-2">
          <CheckCircle2 size={14} className="text-up shrink-0 mt-0.5" />
          <div className="flex-1 text-[11.5px] leading-snug">{lastNotice}</div>
          <button className="tbtn tbtn-ghost tbtn-xs !px-1" onClick={clear}><X size={11} /></button>
        </div>
      )}
    </div>
  );
}

export default function App(): React.ReactElement {
  const view = useWorkspaceStore((s) => s.view);
  useShortcuts();

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-base text-text1">
      <TopBar />
      <TickerTape />
      <AlertBanner />
      <div className="flex-1 min-h-0 flex">
        <LeftNav />
        <main className="flex-1 min-w-0 flex bg-base">
          {view === 'markets' && <MarketsWorkspace />}
          {view === 'chart' && <ChartWorkspace />}
          {view === 'orderflow' && <OrderFlowWorkspace />}
          {view === 'trade' && <TradeWorkspace />}
          {view === 'portfolio' && <PortfolioWorkspace />}
          {view === 'scanner' && <ScannerWorkspace />}
          {view === 'strategies' && <StrategiesWorkspace />}
          {view === 'backtest' && <BacktestWorkspace />}
          {view === 'intel' && <IntelWorkspace />}
          {view === 'ai' && <AIWorkspace />}
          {view === 'settings' && <SettingsWorkspace />}
        </main>
        <RightPanel />
      </div>
      <BottomTerminal />
      <StatusBar />
      <CommandPalette />
      <ContextMenuHost />
      <Toasts />
    </div>
  );
}
