import React, { useRef, useState } from 'react';
import { hCandidates, snappedMove, snappedResize, vCandidates } from './snap';
import { MIN_H, MIN_W, PaneSpec, SNAP_TOL, WorkspaceState } from './types';
import Pane from './Pane';

interface DragState {
  id: string;
  mode: 'move' | 'resize';
  free: boolean;             // shift held: freeform, snap off
  startX: number; startY: number;
  orig: PaneSpec;
}

interface Props {
  state: WorkspaceState;
  onChange: (s: WorkspaceState) => void;
}

/** The snap canvas: magnetic edges, shift for freeform, per-pane resize. */
export default function WorkspaceGrid({ state, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<DragState | null>(null);
  const [guides, setGuides] = useState<{ gx: number | null; gy: number | null }>(
    { gx: null, gy: null });

  const patch = (id: string, p: Partial<PaneSpec>) =>
    onChange({
      ...state,
      panes: state.panes.map((q) => (q.id === id ? { ...q, ...p } : q)),
    });

  const beginDrag = (id: string, mode: 'move' | 'resize',
                     e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const pane = state.panes.find((p) => p.id === id);
    if (!pane) return;
    e.preventDefault();
    setDrag({ id, mode, free: e.shiftKey, startX: e.clientX,
              startY: e.clientY, orig: { ...pane } });
  };

  const onMove = (e: React.PointerEvent) => {
    if (!drag || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - drag.startX) / r.width;
    const dy = (e.clientY - drag.startY) / r.height;
    const others = state.panes.filter((p) => p.id !== drag.id);
    if (drag.mode === 'move') {
      if (drag.free) {
        const x = Math.min(1 - drag.orig.w, Math.max(0, drag.orig.x + dx));
        const y = Math.min(1 - drag.orig.h, Math.max(0, drag.orig.y + dy));
        patch(drag.id, { x, y });
        setGuides({ gx: null, gy: null });
      } else {
        const { rect, gx, gy } = snappedMove(
          drag.orig, drag.orig.w, drag.orig.h, dx, dy,
          vCandidates(others), hCandidates(others), SNAP_TOL);
        patch(drag.id, { x: rect.x, y: rect.y });
        setGuides({ gx, gy });
      }
    } else {
      const { rect, gx, gy } = snappedResize(
        drag.orig, dx, dy, vCandidates(others), hCandidates(others),
        drag.free ? 0 : SNAP_TOL, MIN_W, MIN_H);
      patch(drag.id, { w: rect.w, h: rect.h });
      setGuides({ gx: drag.free ? null : gx, gy: drag.free ? null : gy });
    }
  };

  const endDrag = () => { setDrag(null); setGuides({ gx: null, gy: null }); };

  return (
    <div
      ref={ref}
      className="ws-canvas"
      onPointerMove={onMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      {state.panes.map((p) => (
        <Pane
          key={p.id}
          pane={p}
          onGroupCycle={(id) => {
            const cur = state.panes.find((q) => q.id === id);
            patch(id, { group: ((cur?.group ?? 0) + 1) % 5 });
          }}
          onClose={(id) =>
            onChange({ ...state, panes: state.panes.filter((q) => q.id !== id) })}
          onHeaderDown={(id, e) => beginDrag(id, 'move', e)}
          onHandleDown={(id, e) => beginDrag(id, 'resize', e)}
        />
      ))}
      {guides.gx !== null && (
        <div className="ws-guide-v" style={{ left: `${guides.gx * 100}%` }} />
      )}
      {guides.gy !== null && (
        <div className="ws-guide-h" style={{ top: `${guides.gy * 100}%` }} />
      )}
    </div>
  );
}
