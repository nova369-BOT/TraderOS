// F2 · footprint cell model (pure). On DEMO (and on BINANCE until the real
// print-history aggregation lands in phase 6) the bid×ask split per row is a
// deterministic model of the candle's volume — stable across repaints and
// BADGED as modelled in the pane readout. Never presented as exchange data.

import { Candle, mulberry32 } from './types';

export interface FootCell { b: number; s: number }

export interface Footprint {
  cells: FootCell[];
  poc: number;     // row index of max total volume
  max: number;     // max (b+s) across rows
  total: number;   // sum of weights (normalises to candle volume)
}

export function computeFootprint(c: Candle, rows: number): Footprint {
  const rnd = mulberry32((Math.floor(c.ts) ^ (rows * 2654435761)) >>> 0);
  const bullish = c.close >= c.open;
  const base = bullish ? 0.60 : 0.40;
  // volume clusters around a seeded centre of the candle range
  const centre = 0.25 + rnd() * 0.5;
  const cells: FootCell[] = [];
  let total = 0;
  for (let r = 0; r < rows; r++) {
    const t = rows === 1 ? 0.5 : r / (rows - 1);          // 0=high .. 1=low
    const bell = Math.exp(-((t - centre) ** 2) / 0.18);
    // sellers more active into strength (upper rows), buyers into weakness
    const tilt = bullish ? (t - 0.5) * 0.25 : (0.5 - t) * 0.25;
    const b = Math.max(0.03, bell * (base + tilt + (rnd() - 0.5) * 0.22));
    const s = Math.max(0.03, bell * (1 - base - tilt + (rnd() - 0.5) * 0.22));
    cells.push({ b, s });
    total += b + s;
  }
  let poc = 0, max = 0;
  cells.forEach((cell, i) => {
    if (cell.b + cell.s > max) { max = cell.b + cell.s; poc = i; }
  });
  return { cells, poc, max, total };
}

/** 3:1 same-row imbalance, the entry-level read (diagonal lands later). */
export function imbalance(cell: FootCell): 'buy' | 'sell' | null {
  if (cell.b > cell.s * 3) return 'buy';
  if (cell.s > cell.b * 3) return 'sell';
  return null;
}
