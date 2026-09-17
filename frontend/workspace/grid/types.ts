// F2 grid model. Coordinates are FRACTIONS of the canvas (0..1) so layouts
// are resolution-independent and survive window resizes.

export type PaneKind = 'chart' | 'heat' | 'dom' | 'ts' | 'profile';

export const PANE_KINDS: PaneKind[] = ['chart', 'heat', 'dom', 'ts', 'profile'];

export const PANE_TITLES: Record<PaneKind, string> = {
  chart: 'CANDLES · FOOTPRINT',
  heat: 'RT DEPTH HEAT',
  dom: 'LINKED DOM',
  ts: 'TIME & SALES',
  profile: 'VOLUME PROFILE',
};

export const PANE_PHASE: Record<PaneKind, string> = {
  chart: 'phase 2',
  heat: 'phase 3',
  dom: 'phase 4',
  ts: 'phase 4',
  profile: 'phase 4',
};

export interface PaneSpec {
  id: string;
  kind: PaneKind;
  x: number; y: number; w: number; h: number;
  group: number;            // 0 = unlinked; 1..N link groups
}

export interface WorkspaceState {
  panes: PaneSpec[];
  theme: 'charcoal' | 'sonar';
}

export const MIN_W = 0.12;
export const MIN_H = 0.12;
// Magnetic tolerance as a fraction of the canvas (~8px on a 1000px canvas).
export const SNAP_TOL = 0.012;

let nextId = 1;
export function paneId(): string {
  return `p${Date.now().toString(36)}-${nextId++}`;
}
