import React from 'react';
import { useWorkspaceStore } from '../store/useWorkspaceStore';
import { TerminalChart } from '../components/charts/TerminalChart';
import { DraggableWatchlist } from '../components/market/Watchlist';
import {
  IndexStrip, MoversPanel, BreadthPanel, CalendarMini, NewsFeed, SectorBars, SessionStats, SymbolSparkRow,
} from '../components/market/MarketWidgets';
import { SplitPane } from '../components/primitives/SplitPane';
import { Panel } from '../components/primitives/Panel';

export function MarketsWorkspace(): React.ReactElement {
  const symbol = useWorkspaceStore((s) => s.symbol);
  const timeframe = useWorkspaceStore((s) => s.timeframe);

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2 p-2 overflow-hidden">
      <IndexStrip />
      <SessionStats />
      <div className="flex-1 min-h-0 flex">
        <SplitPane
          storageKey="markets-left"
          defaultSize={380} min={300} max={560}
          left={
            <div className="flex-1 min-h-0 flex pr-2">
              <DraggableWatchlist />
            </div>
          }
          right={
            <SplitPane
              storageKey="markets-right"
              defaultSize={330} min={270} max={520}
              flip
              left={
                <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-auto pl-2">
                  <BreadthPanel />
                  <SectorBars />
                  <CalendarMini limit={5} />
                  <NewsFeed limit={8} compact />
                </div>
              }
              right={
                <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-auto">
                  <SymbolSparkRow symbols={['BTCUSDT', 'SPY', 'NVDA', 'ES']} />
                  <Panel title="Active chart" subtitle={`${symbol} · ${timeframe}`} className="flex-1 min-h-[220px]" bodyClassName="!overflow-hidden flex">
                    <TerminalChart symbol={symbol} timeframe={timeframe} showDrawToolbar={false} />
                  </Panel>
                  <div className="grid grid-cols-2 gap-2 shrink-0 h-[218px] min-h-0">
                    <MoversPanel mode="gainers" count={6} title="Top Gainers" />
                    <MoversPanel mode="losers" count={6} title="Top Losers" />
                  </div>
                </div>
              }
            />
          }
        />
      </div>
    </div>
  );
}
