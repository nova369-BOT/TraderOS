// Layout sanitation. A drag/resize event that fires while the canvas has
// zero size divides by zero and poisons pane rects with NaN, which autosave
// then persists forever and renders every pane invisible. These guards make
// the state self-healing: nothing non-finite ever enters or survives a load.

import { MIN_H, MIN_W, PaneSpec, WorkspaceState } from './types';

export function isFiniteRect(p: PaneSpec): boolean {
  return [p.x, p.y, p.w, p.h].every((v) => Number.isFinite(v));
}

/** Clamp one pane into sane bounds; NaN rects are rebuilt, not propagated. */
export function repairPane(p: PaneSpec, index: number): PaneSpec {
  const cols = 2, row = Math.floor(index / cols), col = index % cols;
  const fallback = { x: col * 0.5, y: row * 0.5, w: 0.5, h: 0.5 };
  const x = Number.isFinite(p.x) ? Math.min(0.98, Math.max(0, p.x)) : fallback.x;
  const y = Number.isFinite(p.y) ? Math.min(0.98, Math.max(0, p.y)) : fallback.y;
  const w = Number.isFinite(p.w) ? Math.min(1 - x, Math.max(MIN_W, p.w)) : fallback.w;
  const h = Number.isFinite(p.h) ? Math.min(1 - y, Math.max(MIN_H, p.h)) : fallback.h;
  return { ...p, x, y, w, h };
}

export function sanitizeState(s: WorkspaceState,
                              fallback: () => WorkspaceState): WorkspaceState {
  if (!s || !Array.isArray(s.panes)) return fallback();
  const panes = s.panes
    .filter((p) => p && typeof p.id === 'string' && typeof p.kind === 'string')
    .map(repairPane);
  if (!panes.length) return fallback();
  return { ...s, panes };
}
