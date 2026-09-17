// F2 · pure-layer truth entry. Bundled by tests/gen_chart_truth.mjs via the
// frontend's esbuild and executed under node; asserts the invariants the
// canvas relies on. Throws on any violation (non-zero exit fails the gate).

import { computeFootprint, imbalance } from '../frontend/workspace/panes/chart/footprint';
import {
  fmtPrice, morphTargetFor, mulberry32, niceStep,
} from '../frontend/workspace/panes/chart/types';

let checks = 0;
function ok(cond: boolean, msg: string): void {
  if (!cond) throw new Error(`chart pure invariant violated: ${msg}`);
  checks++;
}

// niceStep: always a 1/2/2.5/5 ×10^n, within 4× of the raw target spacing
for (const [range, target] of [[10, 5], [250, 5], [1000, 4], [0.4, 6]] as const) {
  const s = niceStep(range, target);
  ok(s > 0, 'step positive');
  const mant = s / 10 ** Math.floor(Math.log10(s));
  ok([1, 2, 2.5, 5, 10].some((m) => Math.abs(mant - m) < 1e-9), 'nice mantissa');
  ok(range / s >= target * 0.4 && range / s <= target * 2.6, 'tick count sane');
}

// morph: 0 below the unfold window, 1 above, monotone inside
ok(morphTargetFor(2) === 0, 'morph 0 at candle zoom');
ok(morphTargetFor(16) === 0, 'morph 0 at window start');
ok(morphTargetFor(26) === 1, 'morph 1 at footprint zoom');
ok(morphTargetFor(70) === 1, 'morph stays 1');
ok(morphTargetFor(21) > morphTargetFor(18), 'monotone inside window');

// footprint: deterministic, normalised, sane POC
const c = { ts: 1750000000, open: 100, high: 105, low: 99, close: 104, volume: 500 };
const a = computeFootprint(c as any, 12);
const b = computeFootprint(c as any, 12);
ok(JSON.stringify(a.cells) === JSON.stringify(b.cells), 'deterministic cells');
const other = computeFootprint({ ...c, ts: 1750000060 } as any, 12);
ok(JSON.stringify(other.cells) !== JSON.stringify(a.cells), 'seed varies with ts');
ok(a.cells.length === 12, 'row count honoured');
ok(a.total > 0, 'positive weight');
ok(a.poc >= 0 && a.poc < 12, 'poc in range');
ok(Math.abs(a.cells[a.poc].b + a.cells[a.poc].s - a.max) < 1e-9, 'max matches poc');
for (const cell of a.cells) ok(cell.b > 0 && cell.s > 0, 'no zero sides');

// imbalance rule: strict 3:1
ok(imbalance({ b: 4, s: 1 }) === 'buy', 'buy imbalance');
ok(imbalance({ b: 1, s: 4 }) === 'sell', 'sell imbalance');
ok(imbalance({ b: 2.9, s: 1 }) === null, 'below 3:1 is not an imbalance');
ok(imbalance({ b: 1, s: 2.9 }) === null, 'below 3:1 is not an imbalance (sell)');

// prng: same seed same stream
const r1 = mulberry32(42), r2 = mulberry32(42);
ok(r1() === r2() && r1() === r2(), 'prng deterministic');

// formatting
ok(fmtPrice(64000.123) === '64000.1', 'big price 1dp');
ok(fmtPrice(0.0012) === '0.0012', 'small price 4dp');

console.log(JSON.stringify({ ok: true, checks }));
