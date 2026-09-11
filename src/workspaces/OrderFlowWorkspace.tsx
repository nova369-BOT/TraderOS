import React from 'react';
import { useWorkspaceStore } from '../store/useWorkspaceStore';
import { DomLadder } from '../components/orderflow/DomLadder';
import { Tape } from '../components/orderflow/Tape';
import { FootprintChart, FlowMetrics, LiquidityHeatmap } from '../components/orderflow/OrderFlowViz';
import { SplitPane } from '../components/primitives/SplitPane';

export function OrderFlowWorkspace(): React.ReactElement {
  const symbol = useWorkspaceStore((s) => s.symbol);

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2 p-2 overflow-hidden">
      <FlowMetrics symbol={symbol} />
      <div className="flex-1 min-h-0 flex">
        <SplitPane
          storageKey="flow-left"
          defaultSize={300} min={240} max={460}
          left={<div className="flex-1 min-h-0 flex pr-2"><DomLadder symbol={symbol} rows={13} /></div>}
          right={
            <SplitPane
              storageKey="flow-mid"
              defaultSize={600} min={360} max={1200}
              left={
                <div className="flex-1 min-h-0 flex flex-col gap-2 pr-2">
                  <div className="flex-1 min-h-0 flex"><LiquidityHeatmap symbol={symbol} /></div>
                  <div className="flex-1 min-h-0 flex"><FootprintChart symbol={symbol} /></div>
                </div>
              }
              right={<div className="flex-1 min-h-0 flex"><Tape symbol={symbol} height="100%" /></div>}
            />
          }
        />
      </div>
    </div>
  );
}
