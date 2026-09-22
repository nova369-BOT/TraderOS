// Professional Drawing Rail — own design, not EdgeDepth clone
// Clean zinc UI, 20 tools grouped, functional wiring to overlay
// Groups: Pointer, Lines (8), Shapes (4), Analysis (3), Notes (4) = 20
// Own professional styling: 48px rail, rounded buttons, accent #21b3a4 active, tooltips

import React, { useState } from 'react';

export type Tool =
  | 'cursor'
  | 'trendline' | 'arrow' | 'ray' | 'extended' | 'hline' | 'hray' | 'vline' | 'cross'
  | 'rectangle' | 'channel' | 'polyline' | 'brush'
  | 'fib' | 'long' | 'short'
  | 'text' | 'measure' | 'pricerange' | 'daterange';

const TOOL_GROUPS: { title: string; tools: Tool[] }[] = [
  { title: 'Select', tools: ['cursor'] },
  { title: 'Lines', tools: ['trendline', 'arrow', 'ray', 'extended', 'hline', 'hray', 'vline', 'cross'] },
  { title: 'Shapes', tools: ['rectangle', 'channel', 'polyline', 'brush'] },
  { title: 'Levels', tools: ['fib', 'long', 'short'] },
  { title: 'Notes', tools: ['text', 'measure', 'pricerange', 'daterange'] },
];

const TOOL_LABELS: Record<Tool, { label: string; icon: string }> = {
  cursor: { label: 'Cursor', icon: '↖' },
  trendline: { label: 'Trendline', icon: '╱' },
  arrow: { label: 'Arrow', icon: '↗' },
  ray: { label: 'Ray', icon: '⤢' },
  extended: { label: 'Extended', icon: '⟷' },
  hline: { label: 'Horizontal', icon: '─' },
  hray: { label: 'H Ray', icon: '⇥' },
  vline: { label: 'Vertical', icon: '│' },
  cross: { label: 'Cross', icon: '+' },
  rectangle: { label: 'Rectangle', icon: '▭' },
  brush: { label: 'Brush', icon: '〰' },
  measure: { label: 'Measure', icon: '📏' },
  pricerange: { label: 'Price Range', icon: '↕' },
  daterange: { label: 'Date Range', icon: '↔' },
  fib: { label: 'Fib', icon: '≋' },
  long: { label: 'Long', icon: '▲' },
  short: { label: 'Short', icon: '▼' },
  text: { label: 'Text', icon: 'T' },
  channel: { label: 'Channel', icon: '═' },
  polyline: { label: 'Polyline', icon: '◿' },
};

function ToolButton({ active, title, icon, onClick }: { active?: boolean; title: string; icon: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`relative w-9 h-9 flex items-center justify-center rounded-md text-[14px] font-medium transition-all
        ${active ? 'bg-[#e8e8e8] text-[#1c1c1c] shadow-sm' : 'bg-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]'}
      `}
    >
      {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-[#21b3a4] rounded-r" />}
      <span className="leading-none">{icon}</span>
    </button>
  );
}

function UtilButton({ active, title, icon, onClick }: { active?: boolean; title: string; icon: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`w-9 h-9 flex items-center justify-center rounded-md text-[13px] transition-colors
        ${active ? 'bg-[#343434] text-[#e8e8e8] border border-[#4a4a4a]' : 'text-[#6a6a6a] hover:bg-[#262626] hover:text-[#b9b9b9]'}
      `}
    >
      {icon}
    </button>
  );
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
  const railW = collapsed ? 16 : 48;

  if (collapsed) {
    return (
      <div className="flex flex-col items-center bg-[#1c1c1c] border-r border-[#2a2a2a] shrink-0 py-2" style={{ width: railW, minWidth: railW }}>
        <button onClick={() => onToggleCollapsed?.()} className="w-6 h-6 flex items-center justify-center rounded bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] hover:text-[#e8e8e8] hover:bg-[#343434] text-[10px]">›</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#1c1c1c] border-r border-[#2a2a2a] shrink-0 select-none" style={{ width: railW, minWidth: railW }}>
      <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col items-center gap-1 px-1 py-2 scrollbar-thin">
        {TOOL_GROUPS.map((g, gi) => (
          <React.Fragment key={gi}>
            {gi > 0 && <div className="w-8 h-px bg-[#2a2a2a] my-2 shrink-0" />}
            <div className="flex flex-col items-center gap-1">
              {g.tools.map(t => {
                const meta = TOOL_LABELS[t];
                return (
                  <ToolButton
                    key={t}
                    active={activeTool === t}
                    title={meta.label}
                    icon={meta.icon}
                    onClick={() => {
                      if (activeTool === t) onToolSelect?.('cursor');
                      else onToolSelect?.(t);
                    }}
                  />
                );
              })}
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="shrink-0 flex flex-col items-center gap-1 px-1 py-2 border-t border-[#2a2a2a]">
        <UtilButton active={magnet} title={magnet ? 'Magnet ON — snap to OHLC' : 'Magnet OFF'} icon="🧲" onClick={() => onToggleMagnet?.()} />
        <UtilButton active={hiddenAll} title={hiddenAll ? 'Show drawings' : 'Hide all'} icon={hiddenAll ? '👁‍🗨' : '👁'} onClick={() => onToggleHidden?.()} />
        <UtilButton title="Remove all drawings" icon="🗑" onClick={() => setConfirmOpen(true)} />
        <div className="w-8 h-px bg-[#2a2a2a] my-1" />
        <UtilButton title="Collapse toolbar" icon="‹" onClick={() => onToggleCollapsed?.()} />
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[#1c1c1c] border border-[#3a3a3a] rounded-lg p-4 w-[260px] shadow-2xl">
            <div className="text-[13px] font-semibold text-[#e8e8e8] mb-1">Remove all drawings?</div>
            <div className="text-[11px] text-[#b9b9b9] mb-4">This will clear all drawings on the chart. This action cannot be undone.</div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setConfirmOpen(false)} className="px-4 py-1.5 text-[12px] rounded-md bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]">Cancel</button>
              <button onClick={() => { onClearAll?.(); setConfirmOpen(false); }} className="px-4 py-1.5 text-[12px] rounded-md bg-[#f0426c] text-white hover:bg-[#d93a5e] font-medium">Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EdgeDepthDrawingRail;
