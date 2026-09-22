// EdgeDepthDrawingRail.tsx — exact EdgeDepth drawing toolbar rail replica
// Port of src/ui/drawing/drawing_toolbar.cpp + drawing_icons.cpp
// 40px rail, 14px collapsed, 28px buttons, 2px gap, hairline separators
// Groups: Pointer(1), Lines(8), Shapes(4), Analysis(3), Notes(4) = 20 tools
// Utility cluster bottom: magnet, eye/trash/collapse, confirm popup
// Chrome: zinc #1c1c1c/#2a2a2a/#3a3a3a #e8e8e8/#b9b9b9 #21b3a4/#f0426c #d0d0d0
// Icons: SVG vector glyphs exact from drawing_icons.cpp at() logic

import React, { useState } from 'react';

export type Tool =
  | 'cursor'
  | 'trendline' | 'arrow' | 'ray' | 'extended' | 'hline' | 'hray' | 'vline' | 'cross'
  | 'rectangle' | 'channel' | 'polyline' | 'brush'
  | 'fib' | 'long' | 'short'
  | 'text' | 'measure' | 'pricerange' | 'daterange';

const TOOL_GROUPS: { tools: Tool[] }[] = [
  { tools: ['cursor'] },
  { tools: ['trendline', 'arrow', 'ray', 'extended', 'hline', 'hray', 'vline', 'cross'] },
  { tools: ['rectangle', 'channel', 'polyline', 'brush'] },
  { tools: ['fib', 'long', 'short'] },
  { tools: ['text', 'measure', 'pricerange', 'daterange'] },
];

const TOOL_LABELS: Record<Tool, string> = {
  cursor: 'Cursor',
  trendline: 'Trendline',
  arrow: 'Arrow',
  ray: 'Ray',
  extended: 'Extended line',
  hline: 'Horizontal line',
  hray: 'Horizontal ray',
  vline: 'Vertical line',
  cross: 'Cross line',
  rectangle: 'Rectangle',
  brush: 'Brush',
  measure: 'Measure',
  pricerange: 'Price range',
  daterange: 'Date range',
  fib: 'Fib retracement',
  long: 'Long position',
  short: 'Short position',
  text: 'Text',
  channel: 'Parallel channel',
  polyline: 'Polyline',
};

// SVG icon components — exact vector from drawing_icons.cpp at(c,s,x,y)
function IconWrapper({ children, size = 28, active = false, title, onClick }: { children: React.ReactNode; size?: number; active?: boolean; title?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`relative flex items-center justify-center rounded-[2px] transition-colors shrink-0
        ${active ? 'bg-[#343434] text-[#e8e8e8]' : 'text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]'}
      `}
      style={{ width: size, height: size }}
    >
      {active && <span className="absolute left-[1px] top-[6px] bottom-[6px] w-[2px] bg-[#e8e8e8] rounded-r" />}
      <svg width={14} height={14} viewBox="-1 -1 2 2" className="overflow-visible">
        <g stroke="currentColor" strokeWidth={0.14} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {children}
        </g>
      </svg>
    </button>
  );
}

function ToolIcon({ tool }: { tool: Tool }) {
  switch (tool) {
    case 'cursor':
      return (
        <>
          <path d="M -0.35 -0.8 L -0.35 0.45 L 0.30 0.05 Z" fill="currentColor" stroke="none" />
          <line x1={0.05} y1={0.20} x2={0.45} y2={0.80} />
        </>
      );
    case 'trendline':
      return (
        <>
          <line x1={-0.55} y1={0.55} x2={0.55} y2={-0.55} />
          <circle cx={-0.75} cy={0.75} r={0.12} fill="none" />
          <circle cx={0.75} cy={-0.75} r={0.12} fill="none" />
        </>
      );
    case 'arrow':
      return (
        <>
          <line x1={-0.75} y1={0.75} x2={0.60} y2={-0.60} />
          <path d="M 0.75 -0.75 L 0.35 -0.55 L 0.55 -0.35 Z" fill="currentColor" stroke="none" />
        </>
      );
    case 'ray':
      return (
        <>
          <circle cx={-0.65} cy={0.65} r={0.12} fill="none" />
          <line x1={-0.45} y1={0.45} x2={0.95} y2={-0.95} />
        </>
      );
    case 'extended':
      return (
        <>
          <line x1={-0.95} y1={0.95} x2={0.95} y2={-0.95} />
          <circle cx={-0.35} cy={0.35} r={0.10} fill="none" />
          <circle cx={0.35} cy={-0.35} r={0.10} fill="none" />
        </>
      );
    case 'hline':
      return (
        <>
          <line x1={-0.95} y1={0} x2={0.95} y2={0} />
          <circle cx={0} cy={0} r={0.12} fill="none" />
        </>
      );
    case 'hray':
      return (
        <>
          <circle cx={-0.70} cy={0} r={0.12} fill="none" />
          <line x1={-0.48} y1={0} x2={0.95} y2={0} />
        </>
      );
    case 'vline':
      return (
        <>
          <line x1={0} y1={-0.95} x2={0} y2={0.95} />
          <circle cx={0} cy={0} r={0.12} fill="none" />
        </>
      );
    case 'cross':
      return (
        <>
          <line x1={-0.95} y1={0} x2={0.95} y2={0} />
          <line x1={0} y1={-0.95} x2={0} y2={0.95} />
        </>
      );
    case 'rectangle':
      return <rect x={-0.75} y={-0.55} width={1.5} height={1.1} rx={0.05} />;
    case 'brush':
      return <path d="M -0.85 0.55 C -0.25 -0.85 0.25 0.85 0.85 -0.55" />;
    case 'measure':
      return (
        <>
          <line x1={-0.80} y1={0.60} x2={0.80} y2={-0.60} />
          <line x1={-0.55} y1={0.15} x2={-0.30} y2={0.50} />
          <line x1={0.00} y1={-0.28} x2={0.25} y2={0.08} />
          <line x1={0.52} y1={-0.68} x2={0.78} y2={-0.32} />
        </>
      );
    case 'pricerange':
      return (
        <>
          <line x1={-0.85} y1={-0.80} x2={0.85} y2={-0.80} />
          <line x1={-0.85} y1={0.80} x2={0.85} y2={0.80} />
          <line x1={0} y1={-0.62} x2={0} y2={0.62} />
          <path d="M 0 -0.62 L -0.12 -0.45 L 0.12 -0.45 Z" fill="currentColor" stroke="none" />
          <path d="M 0 0.62 L -0.12 0.45 L 0.12 0.45 Z" fill="currentColor" stroke="none" />
        </>
      );
    case 'daterange':
      return (
        <>
          <line x1={-0.80} y1={-0.85} x2={-0.80} y2={0.85} />
          <line x1={0.80} y1={-0.85} x2={0.80} y2={0.85} />
          <line x1={-0.62} y1={0} x2={0.62} y2={0} />
          <path d="M -0.62 0 L -0.45 -0.12 L -0.45 0.12 Z" fill="currentColor" stroke="none" />
          <path d="M 0.62 0 L 0.45 -0.12 L 0.45 0.12 Z" fill="currentColor" stroke="none" />
        </>
      );
    case 'fib':
      return (
        <>
          <line x1={-0.85} y1={-0.65} x2={0.85} y2={-0.65} />
          <line x1={-0.85} y1={-0.10} x2={0.30} y2={-0.10} />
          <line x1={-0.85} y1={0.35} x2={0.60} y2={0.35} />
          <line x1={-0.85} y1={0.80} x2={0.85} y2={0.80} />
        </>
      );
    case 'long':
      return (
        <>
          <rect x={-0.80} y={-0.85} width={1.6} height={0.80} rx={0.05} />
          <line x1={-0.80} y1={0.45} x2={0.80} y2={0.45} />
          <path d="M 0 -0.60 L -0.12 -0.40 L 0.12 -0.40 Z" fill="currentColor" stroke="none" />
        </>
      );
    case 'short':
      return (
        <>
          <rect x={-0.80} y={0.05} width={1.6} height={0.80} rx={0.05} />
          <line x1={-0.80} y1={-0.45} x2={0.80} y2={-0.45} />
          <path d="M 0 0.60 L -0.12 0.40 L 0.12 0.40 Z" fill="currentColor" stroke="none" />
        </>
      );
    case 'text':
      return (
        <>
          <line x1={-0.70} y1={-0.70} x2={0.70} y2={-0.70} />
          <line x1={0} y1={-0.70} x2={0} y2={0.80} />
          <line x1={-0.28} y1={0.80} x2={0.28} y2={0.80} />
        </>
      );
    case 'channel':
      return (
        <>
          <line x1={-0.85} y1={0.35} x2={0.55} y2={-0.85} />
          <line x1={-0.55} y1={0.85} x2={0.85} y2={-0.35} />
        </>
      );
    case 'polyline':
      return (
        <>
          <line x1={-0.85} y1={0.55} x2={-0.20} y2={-0.60} />
          <line x1={-0.20} y1={-0.60} x2={0.30} y2={0.30} />
          <line x1={0.30} y1={0.30} x2={0.85} y2={-0.45} />
          <circle cx={-0.20} cy={-0.60} r={0.08} fill="none" />
          <circle cx={0.30} cy={0.30} r={0.08} fill="none" />
        </>
      );
    default:
      return null;
  }
}

function UiIcon({ type }: { type: 'magnet' | 'eye' | 'eyeOff' | 'trash' | 'chevronLeft' | 'chevronRight' }) {
  switch (type) {
    case 'magnet':
      return (
        <>
          <path d="M -0.62 -0.15 A 0.62 0.62 0 0 0 0.62 -0.15" fill="none" />
          <line x1={-0.62} y1={-0.15} x2={-0.62} y2={0.70} />
          <line x1={0.62} y1={-0.15} x2={0.62} y2={0.70} />
          <line x1={-0.80} y1={0.42} x2={-0.44} y2={0.42} />
          <line x1={0.44} y1={0.42} x2={0.80} y2={0.42} />
        </>
      );
    case 'eye':
      return (
        <>
          <path d="M -0.70 -0.20 C -0.30 -0.80 0.30 -0.80 0.70 -0.20" fill="none" />
          <path d="M -0.70 0.20 C -0.30 0.80 0.30 0.80 0.70 0.20" fill="none" />
          <circle cx={0} cy={0} r={0.18} fill="currentColor" stroke="none" />
        </>
      );
    case 'eyeOff':
      return (
        <>
          <path d="M -0.70 -0.20 C -0.30 -0.80 0.30 -0.80 0.70 -0.20" fill="none" />
          <path d="M -0.70 0.20 C -0.30 0.80 0.30 0.80 0.70 0.20" fill="none" />
          <circle cx={0} cy={0} r={0.18} fill="currentColor" stroke="none" />
          <line x1={-0.75} y1={0.75} x2={0.75} y2={-0.75} />
        </>
      );
    case 'trash':
      return (
        <>
          <line x1={-0.80} y1={-0.55} x2={0.80} y2={-0.55} />
          <rect x={-0.55} y={-0.55} width={1.10} height={1.40} rx={0.05} />
          <line x1={-0.18} y1={-0.25} x2={-0.18} y2={0.55} />
          <line x1={0.18} y1={-0.25} x2={0.18} y2={0.55} />
        </>
      );
    case 'chevronLeft':
      return (
        <>
          <line x1={0.35} y1={-0.65} x2={-0.35} y2={0} />
          <line x1={-0.35} y1={0} x2={0.35} y2={0.65} />
        </>
      );
    case 'chevronRight':
      return (
        <>
          <line x1={-0.35} y1={-0.65} x2={0.35} y2={0} />
          <line x1={0.35} y1={0} x2={-0.35} y2={0.65} />
        </>
      );
  }
}

export function EdgeDepthDrawingRail({
  activeTool = 'cursor',
  onToolSelect,
  magnet = false,
  onToggleMagnet,
  hiddenAll = false,
  onToggleHidden,
  onClearAll,
  collapsed = false,
  onToggleCollapsed,
}: {
  activeTool?: Tool;
  onToolSelect?: (t: Tool) => void;
  magnet?: boolean;
  onToggleMagnet?: () => void;
  hiddenAll?: boolean;
  onToggleHidden?: () => void;
  onClearAll?: () => void;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const railW = collapsed ? 14 : 40;

  if (collapsed) {
    return (
      <div
        className="flex flex-col items-center bg-[#2a2a2a] border-r border-[#3a3a3a] shrink-0"
        style={{ width: railW, minWidth: railW }}
      >
        <div className="h-1" />
        <IconWrapper size={28} title="Show drawing tools" onClick={() => onToggleCollapsed?.()}>
          <UiIcon type="chevronRight" />
        </IconWrapper>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col bg-[#2a2a2a] border-r border-[#3a3a3a] shrink-0 select-none"
      style={{ width: railW, minWidth: railW }}
    >
      <div className="h-1 shrink-0" />
      <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col items-center gap-[2px] px-0 py-1 scrollbar-thin">
        {TOOL_GROUPS.map((g, gi) => (
          <React.Fragment key={gi}>
            {gi > 0 && <div className="w-[26px] h-px bg-[#3a3a3a] my-[5px] shrink-0" />}
            {g.tools.map(t => (
              <IconWrapper
                key={t}
                active={activeTool === t}
                title={TOOL_LABELS[t]}
                onClick={() => {
                  if (activeTool === t) onToolSelect?.('cursor');
                  else onToolSelect?.(t);
                }}
              >
                <ToolIcon tool={t} />
              </IconWrapper>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Utility cluster pinned bottom */}
      <div className="shrink-0 flex flex-col items-center gap-[2px] pb-1">
        <div className="w-[26px] h-px bg-[#3a3a3a] my-[5px]" />
        <IconWrapper active={magnet} title="Magnet (snap to OHLC)" onClick={() => onToggleMagnet?.()}>
          <UiIcon type="magnet" />
        </IconWrapper>
        <IconWrapper active={hiddenAll} title={hiddenAll ? 'Show drawings' : 'Hide all drawings'} onClick={() => onToggleHidden?.()}>
          <UiIcon type={hiddenAll ? 'eyeOff' : 'eye'} />
        </IconWrapper>
        <IconWrapper title="Remove all drawings" onClick={() => setConfirmOpen(true)}>
          <UiIcon type="trash" />
        </IconWrapper>
        <IconWrapper title="Hide drawing toolbar" onClick={() => onToggleCollapsed?.()}>
          <UiIcon type="chevronLeft" />
        </IconWrapper>
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
          <div className="bg-[#262626] border border-[#3a3a3a] rounded-[3px] p-3 w-[200px] shadow-xl">
            <div className="text-[11px] text-[#e8e8e8] font-medium mb-3">Remove all drawings?</div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-3 py-1 text-[11px] bg-[#2a2a2a] border border-[#3a3a3a] text-[#b9b9b9] rounded-[2px] hover:bg-[#343434]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onClearAll?.();
                  setConfirmOpen(false);
                }}
                className="px-3 py-1 text-[11px] bg-[#f0426c] text-white rounded-[2px] hover:bg-[#d93a5e]"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
