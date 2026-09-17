// Pure magnetic-edge math for the snap canvas. Kept free of React/DOM so it
// can be eyeballed in tests and reused by the resize path unchanged.

export interface SnapResult {
  value: number;
  guide: number | null;   // canvas-fraction of the active guide line
}

/** Snap ``edge`` (a canvas fraction) to the nearest candidate within tol. */
export function snapEdge(edge: number, candidates: number[],
                         tol: number): SnapResult {
  let best: SnapResult = { value: edge, guide: null };
  let bestDist = tol;
  for (const c of candidates) {
    const d = Math.abs(edge - c);
    if (d < bestDist) {
      bestDist = d;
      best = { value: c, guide: c };
    }
  }
  return best;
}

export interface Rect { x: number; y: number; w: number; h: number }

/** Candidate vertical edges from sibling panes plus the canvas borders. */
export function vCandidates(others: Rect[]): number[] {
  const out = [0, 1];
  for (const o of others) out.push(o.x, o.x + o.w);
  return out;
}

export function hCandidates(others: Rect[]): number[] {
  const out = [0, 1];
  for (const o of others) out.push(o.y, o.y + o.h);
  return out;
}

/** Move a pane of size (w,h) so its edges magnetise; returns rect + guides. */
export function snappedMove(orig: Rect, w: number, h: number,
                            dx: number, dy: number,
                            vx: number[], hy: number[],
                            tol: number): { rect: Rect; gx: number | null; gy: number | null } {
  // left edge candidates: siblings' edges and borders; right edge likewise,
  // expressed back through the moving pane's width.
  const leftC = vx.map((c) => c).concat(vx.map((c) => c - w));
  const sx = snapEdge(orig.x + dx, leftC, tol);
  const topC = hy.map((c) => c).concat(hy.map((c) => c - h));
  const sy = snapEdge(orig.y + dy, topC, tol);
  const x = clamp01(sx.value, 0, 1 - w);
  const y = clamp01(sy.value, 0, 1 - h);
  return { rect: { x, y, w, h }, gx: sx.guide, gy: sy.guide };
}

/** Resize so the right/bottom edges magnetise to siblings and borders. */
export function snappedResize(orig: Rect, dw: number, dh: number,
                              vx: number[], hy: number[],
                              tol: number, minW: number, minH: number):
  { rect: Rect; gx: number | null; gy: number | null } {
  const sw = snapEdge(orig.x + orig.w + dw, vx, tol);
  const sh = snapEdge(orig.y + orig.h + dh, hy, tol);
  const w = clamp01(sw.value - orig.x, minW, 1 - orig.x);
  const h = clamp01(sh.value - orig.y, minH, 1 - orig.y);
  return { rect: { ...orig, w, h }, gx: sw.guide, gy: sh.guide };
}

export function clamp01(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}
