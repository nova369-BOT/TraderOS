// Layout state + persistence for the F2 snap canvas.
// localStorage only in v1; shareable JSON export lands with phase 6.

import { PANE_KINDS, PaneKind, PaneSpec, WorkspaceState, paneId } from './types';
import { sanitizeState } from './sanitize';

const LAYOUT_KEY = 'f2.layout.v1';
const WS_PREFIX = 'f2.workspace.';

export function defaultState(): WorkspaceState {
  return { panes: presetPanes(4), theme: 'charcoal' };
}

/** Equal-split presets; kinds cycle through the v1 inventory. */
export function presetPanes(n: 1 | 2 | 4 | 9): PaneSpec[] {
  const cols = n === 1 ? 1 : n === 2 ? 2 : n === 4 ? 2 : 3;
  const rows = n === 1 ? 1 : n === 2 ? 1 : n === 4 ? 2 : 3;
  const out: PaneSpec[] = [];
  let i = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      out.push({
        id: paneId(),
        kind: PANE_KINDS[i % PANE_KINDS.length] as PaneKind,
        x: c / cols, y: r / rows, w: 1 / cols, h: 1 / rows,
        group: 1,
      });
      i++;
    }
  }
  return out;
}

export function loadState(): WorkspaceState {
  try {
    const raw = localStorage.getItem(LAYOUT_KEY);
    if (raw) return sanitizeState(JSON.parse(raw) as WorkspaceState, defaultState);
  } catch { /* private mode etc: fall through to defaults */ }
  return defaultState();
}

export function saveState(s: WorkspaceState): void {
  try { localStorage.setItem(LAYOUT_KEY, JSON.stringify(s)); } catch { /* */ }
}

export function addPane(s: WorkspaceState): WorkspaceState {
  const used = s.panes.length;
  const kind = PANE_KINDS[used % PANE_KINDS.length] as PaneKind;
  // drop into the biggest free quadrant-ish spot: simple cascade offset.
  const off = (used % 4) * 0.06;
  const pane: PaneSpec = {
    id: paneId(), kind,
    x: 0.08 + off, y: 0.08 + off, w: 0.44, h: 0.4,
    group: 1,
  };
  return { ...s, panes: [...s.panes, pane] };
}

// ── named workspaces ─────────────────────────────────────────────────────

export function listWorkspaces(): string[] {
  const out: string[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(WS_PREFIX)) out.push(k.slice(WS_PREFIX.length));
    }
  } catch { /* */ }
  return out.sort();
}

export function saveWorkspace(name: string, s: WorkspaceState): void {
  try { localStorage.setItem(WS_PREFIX + name, JSON.stringify(s)); } catch { /* */ }
}

export function loadWorkspace(name: string): WorkspaceState | null {
  try {
    const raw = localStorage.getItem(WS_PREFIX + name);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as WorkspaceState;
    if (!parsed || !Array.isArray(parsed.panes) || !parsed.panes.length) {
      return null;
    }
    // panes non-empty, so the fallback is unreachable; sanitize repairs NaNs
    return sanitizeState(parsed, () => parsed);
  } catch { return null; }
}

export function deleteWorkspace(name: string): void {
  try { localStorage.removeItem(WS_PREFIX + name); } catch { /* */ }
}
