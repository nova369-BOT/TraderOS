import React from 'react';
import { useWorkspaceStore } from '../store/useWorkspaceStore';
import { useTradingStore } from '../store/useTradingStore';
import { TerminalChart } from '../components/charts/TerminalChart';
import { OrderTicket } from '../components/trading/OrderTicket';
import { DomLadder } from '../components/orderflow/DomLadder';
import { Tape } from '../components/orderflow/Tape';
import { SplitPane } from '../components/primitives/SplitPane';
import { Panel } from '../components/primitives/Panel';
import { Metric } from '../components/primitives/Metric';
import { fmtMoney, fmtPct, fmtSignedMoney } from '../lib/format';

export function TradeWorkspace(): React.ReactElement {
  const symbol = useWorkspaceStore((s) => s.symbol);
  const timeframe = useWorkspaceStore((s) => s.timeframe);
  const equity = useTradingStore((s) => s.equity);
  const dayPnl = useTradingStore((s) => s.dayPnl);
  const dayPnlPct = useTradingStore((s) => s.dayPnlPct);
  const buyingPower = useTradingStore((s) => s.buyingPower);
  const marginUsed = useTradingStore((s) => s.marginUsed);
  const exposure = useTradingStore((s) => s.exposure);
  const positions = useTradingStore((s) => s.positions);

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2 p-2 overflow-hidden">
      {/* account strip */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-px bg-line border border-line rounded-md overflow-hidden shrink-0">
        {[
          { l: 'Equity', v: fmtMoney(equity), t: undefined },
          { l: 'Day P&L', v: `${fmtSignedMoney(dayPnl)} (${fmtPct(dayPnlPct)})`, t: dayPnl >= 0 ? 'up' : 'down' },
          { l: 'Buying power', v: fmtMoney(buyingPower, 0), t: undefined },
          { l: 'Margin used', v: fmtMoney(marginUsed, 0), t: undefined },
          { l: 'Gross exposure', v: fmtMoney(exposure, 0), t: undefined },
          { l: 'Open positions', v: String(positions.length), t: positions.length ? 'accent' : undefined },
        ].map((m) => (
          <div key={m.l} className="bg-panel px-2.5 py-1.5 min-w-0">
            <Metric label={m.l} value={m.v} size="sm" tone={m.t as 'up' | 'down' | 'accent'} />
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-0 flex">
        <SplitPane
          storageKey="trade-ticket"
          defaultSize={280} min={240} max={420}
          flip
          left={
            <div className="flex-1 min-h-0 flex pl-2">
              <Panel title="Order Entry" subtitle={symbol} className="flex-1" bodyClassName="!overflow-auto">
                <OrderTicket symbol={symbol} />
              </Panel>
            </div>
          }
          right={
            <SplitPane
              storageKey="trade-dom"
              defaultSize={270} min={220} max={420}
              flip
              left={
                <div className="flex-1 min-h-0 flex pl-2">
                  <DomLadder symbol={symbol} rows={11} />
                </div>
              }
              right={
                <SplitPane
                  storageKey="trade-tape"
                  direction="vertical"
                  defaultSize={400} min={200} max={800}
                  left={
                    <div className="flex-1 min-h-0 flex pb-2">
                      <Panel title="Execution chart" subtitle={`${symbol} · ${timeframe}`} className="flex-1" bodyClassName="!overflow-hidden flex">
                        <TerminalChart symbol={symbol} timeframe={timeframe} showDrawToolbar={false} />
                      </Panel>
                    </div>
                  }
                  right={<div className="flex-1 min-h-0 flex"><Tape symbol={symbol} height="100%" /></div>}
                />
              }
            />
          }
        />
      </div>
    </div>
  );
}
