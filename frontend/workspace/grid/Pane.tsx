import React from 'react';
import { GROUP_COLORS } from '../tokens';
import { PANE_PHASE, PANE_TITLES, PaneSpec } from './types';

interface Props {
  pane: PaneSpec;
  onGroupCycle: (id: string) => void;
  onClose: (id: string) => void;
  onHeaderDown: (id: string, e: React.PointerEvent) => void;
  onHandleDown: (id: string, e: React.PointerEvent) => void;
}

/** One pane: chrome now, canvas engines in later phases. */
export default function Pane({ pane, onGroupCycle, onClose, onHeaderDown,
                              onHandleDown }: Props) {
  const groupColor = pane.group > 0
    ? GROUP_COLORS[(pane.group - 1) % GROUP_COLORS.length]
    : null;
  return (
    <div
      className="ws-pane"
      style={{
        left: `${pane.x * 100}%`, top: `${pane.y * 100}%`,
        width: `${pane.w * 100}%`, height: `${pane.h * 100}%`,
        borderColor: groupColor ?? undefined,
      }}
    >
      <div
        className="ws-pane-head"
        onPointerDown={(e) => onHeaderDown(pane.id, e)}
        style={groupColor ? { borderBottomColor: groupColor } : undefined}
      >
        <span className="ws-pane-title">{PANE_TITLES[pane.kind]}</span>
        <span className="ws-pane-phase">{PANE_PHASE[pane.kind]}</span>
        <button
          className="ws-chip"
          title="Link group: panes in a group share symbol, crosshair and axis"
          style={groupColor ? { color: groupColor, borderColor: groupColor } : undefined}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onGroupCycle(pane.id)}
        >
          {pane.group > 0 ? `LNK ${String.fromCharCode(64 + pane.group)}` : 'LINK'}
        </button>
        <button
          className="ws-close"
          title="Close pane"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onClose(pane.id)}
        >×</button>
      </div>
      <div className="ws-pane-body">
        <span className="ws-pane-ghost">{PANE_TITLES[pane.kind]}</span>
      </div>
      <div
        className="ws-resize"
        onPointerDown={(e) => onHandleDown(pane.id, e)}
        title="Resize"
      />
    </div>
  );
}
