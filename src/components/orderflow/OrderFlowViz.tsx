import React, { useEffect, useMemo, useRef } from 'react';
import { marketEngine } from '../../services/marketEngine';
import { getSymbol } from '../../services/symbols';
import { useMarketStore } from '../../store/useMarketStore';
import { fmtNum, fmtPct, fmtPrice, fmtVol } from '../../lib/format';
import { Panel } from '../primitives/Panel';
import { Metric } from '../primitives/Metric';
import { cx } from '../../lib/utils';

// turbo-ish colormap for liquidity intensity
function heatColor(t: number): string {
  const x = Math.max(0, Math.min(1, t));
  if (x < 0.02) return 'rgba(10,15,23,0)';
  if (x < 0.25) { const k = x / 0.25; return `rgba(29,78,216,${0.25 + k * 0.45})`; }
  if (x < 0.5) { const k = (x - 0.25) / 0.25; return `rgba(34,211,238,${0.7 + k * 0.2})`; }
  if (x < 0.75) { const k = (x - 0.5) / 0.25; return `rgba(240,185,11,${0.75 + k * 0.2})`; }
  const k = (x - 0.75) / 0.25;
  return `rgba(255,${Math.round(220 - k * 120)},80,0.95)`;
}

function setupCanvas(canvas: HTMLCanvasElement): { ctx: CanvasRenderingContext2D; w: number; h: number } | null {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  if (rect.width < 10 || rect.height < 10) return null;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.scale(dpr, dpr);
  return { ctx, w: rect.width, h: rect.height };
}

export function LiquidityHeatmap({ symbol }: { symbol: string }): React.ReactElement {
  const tick = useMarketStore((s) => s.tick);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const def = getSymbol(symbol);

  const data = useMemo(() => marketEngine.getHeatmap(symbol, 72, 44), [symbol, tick]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const draw = (): void => {
      const s = setupCanvas(canvas);
      if (!s) return;
      const { ctx, w, h } = s;
      const axisW = 58;
      const plotW = w - axisW;
      const cols = data.matrix.length;
      const rows = data.prices.length;
      const cw = plotW / cols;
      const rh = h / rows;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#080d15';
      ctx.fillRect(0, 0, w, h);
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const v = data.matrix[c][r] / Math.max(1e-9, data.max);
          if (v < 0.03) continue;
          ctx.fillStyle = heatColor(v);
          ctx.fillRect(c * cw, r * rh, Math.ceil(cw), Math.ceil(rh));
        }
      }
      // last-price line
      const q = marketEngine.getQuote(symbol);
      const lo = data.prices[data.prices.length - 1];
      const hi = data.prices[0];
      const y = ((hi - q.price) / Math.max(1e-9, hi - lo)) * h;
      ctx.strokeStyle = q.tickDir === -1 ? '#f6465d' : '#0ecb81';
      ctx.setLineDash([4, 3]);
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(plotW, y); ctx.stroke();
      ctx.setLineDash([]);
      // price axis
      ctx.fillStyle = '#0d141f';
      ctx.fillRect(plotW, 0, axisW, h);
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = '#5b6a83';
      const step = Math.max(1, Math.floor(rows / 9));
      for (let r = 0; r < rows; r += step) {
        ctx.fillText(fmtPrice(data.prices[r], def.decimals), plotW + 4, r * rh + 10);
      }
      ctx.fillStyle = q.tickDir === -1 ? '#f6465d' : '#0ecb81';
      ctx.font = 'bold 10px "JetBrains Mono", monospace';
      ctx.fillText(fmtPrice(q.price, def.decimals), plotW + 4, Math.min(h - 4, Math.max(10, y + 3)));
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [data, symbol, def.decimals]);

  return (
    <Panel
      title="Liquidity Heatmap"
      subtitle={`${symbol} · resting liquidity x time`}
      actions={<span className="flex items-center gap-1 text-[9.5px] text-text3"><span className="inline-block w-[52px] h-[8px] rounded-sm" style={{ background: 'linear-gradient(90deg,#1d4fd7,#22d3ee,#f0b90b,#ff7a50)' }} /> low → high</span>}
      bodyClassName="!overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </Panel>
  );
}

export function FootprintChart({ symbol }: { symbol: string }): React.ReactElement {
  const tick = useMarketStore((s) => s.tick);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const def = getSymbol(symbol);
  const bars = useMemo(() => marketEngine.getFootprint(symbol, 16), [symbol, tick]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || bars.length === 0) return;
    const draw = (): void => {
      const s = setupCanvas(canvas);
      if (!s) return;
      const { ctx, w, h } = s;
      ctx.fillStyle = '#080d15';
      ctx.fillRect(0, 0, w, h);
      const axisW = 56;
      const footH = 30;
      const plotW = w - axisW;
      const plotH = h - footH;
      let lo = Infinity, hi = -Infinity;
      for (const b of bars) {
        for (const r of b.rows) { lo = Math.min(lo, r.price); hi = Math.max(hi, r.price); }
      }
      const pad = (hi - lo) * 0.04 || def.tick;
      lo -= pad; hi += pad;
      const yOf = (p: number): number => ((hi - p) / (hi - lo)) * plotH;
      const n = bars.length;
      const colW = plotW / n;
      const maxRow = Math.max(1e-9, ...bars.flatMap((b) => b.rows.map((r) => r.volume)));

      ctx.font = '8px "JetBrains Mono", monospace';
      bars.forEach((b, i) => {
        const x = i * colW;
        const bull = b.close >= b.open;
        // candle wick
        ctx.strokeStyle = bull ? '#0ecb81' : '#f6465d';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + colW / 2, yOf(b.high));
        ctx.lineTo(x + colW / 2, yOf(b.low));
        ctx.stroke();
        for (const r of b.rows) {
          const y = yOf(r.price);
          const hh = Math.max(3, plotH / (b.rows.length * 1.1));
          const inten = r.volume / maxRow;
          ctx.fillStyle = `rgba(77,141,255,${0.05 + inten * 0.4})`;
          ctx.fillRect(x + 1, y - hh / 2, colW - 2, hh);
          // imbalance highlight
          if (r.ask > r.bid * 1.6) { ctx.fillStyle = 'rgba(14,203,129,0.5)'; ctx.fillRect(x + colW / 2, y - hh / 2, colW / 2 - 1, hh); }
          else if (r.bid > r.ask * 1.6) { ctx.fillStyle = 'rgba(246,70,93,0.5)'; ctx.fillRect(x + 1, y - hh / 2, colW / 2 - 1, hh); }
          if (colW > 64) {
            ctx.fillStyle = '#9aa7bb';
            ctx.fillText(fmtVol(r.bid), x + 3, y + 3);
            ctx.fillText(fmtVol(r.ask), x + colW / 2 + 2, y + 3);
          }
        }
        // POC
        ctx.fillStyle = '#f0b90b';
        ctx.fillRect(x + 1, yOf(b.poc) - 1, 3, 2);
        // delta footer
        ctx.fillStyle = b.delta >= 0 ? '#0ecb81' : '#f6465d';
        ctx.font = 'bold 8.5px "JetBrains Mono", monospace';
        const dt = `${b.delta >= 0 ? '+' : ''}${fmtVol(b.delta)}`;
        ctx.fillText(dt, x + colW / 2 - ctx.measureText(dt).width / 2, plotH + 12);
        ctx.font = '8px "JetBrains Mono", monospace';
        ctx.fillStyle = '#5b6a83';
        const vt = fmtVol(b.volume);
        ctx.fillText(vt, x + colW / 2 - ctx.measureText(vt).width / 2, plotH + 23);
      });
      // price axis
      ctx.fillStyle = '#0d141f';
      ctx.fillRect(plotW, 0, axisW, h);
      ctx.fillStyle = '#5b6a83';
      ctx.font = '9px "JetBrains Mono", monospace';
      const rows = 8;
      for (let i = 0; i <= rows; i++) {
        const p = hi - ((hi - lo) / rows) * i;
        ctx.fillText(fmtPrice(p, def.decimals), plotW + 4, ((hi - p) / (hi - lo)) * plotH + 3);
      }
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [bars, def.decimals]);

  return (
    <Panel
      title="Footprint · 5m"
      subtitle="bid × ask · imbalance shaded · yellow tick = POC"
      actions={
        <span className="flex items-center gap-2 text-[9.5px] text-text3">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-up/70 inline-block" /> ask stack</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-down/70 inline-block" /> bid stack</span>
        </span>
      }
      bodyClassName="!overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </Panel>
  );
}

export function FlowMetrics({ symbol }: { symbol: string }): React.ReactElement {
  const tick = useMarketStore((s) => s.tick);
  const m = useMemo(() => {
    const bars = marketEngine.getFootprint(symbol, 24);
    const book = marketEngine.getBook(symbol, 20);
    const q = marketEngine.getQuote(symbol);
    const cumDelta = bars.reduce((s, b) => s + b.delta, 0);
    const lastDelta = bars.length ? bars[bars.length - 1].delta : 0;
    const totBid = bars.reduce((s, b) => s + b.bidTotal, 0);
    const totAsk = bars.reduce((s, b) => s + b.askTotal, 0);
    const maxBidWall = Math.max(...book.bids.map((b) => b.bid));
    const maxAskWall = Math.max(...book.asks.map((a) => a.ask));
    const bidWallPx = book.bids.find((b) => b.bid === maxBidWall)?.price ?? 0;
    const askWallPx = book.asks.find((a) => a.ask === maxAskWall)?.price ?? 0;
    const vol = bars.reduce((s, b) => s + b.volume, 0);
    return { cumDelta, lastDelta, totBid, totAsk, maxBidWall, maxAskWall, bidWallPx, askWallPx, vol, q };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, tick]);

  const def = getSymbol(symbol);
  const buyPct = (m.totBid + m.totAsk) > 0 ? (m.totAsk / (m.totBid + m.totAsk)) * 100 : 50;
  return (
    <div className="grid grid-cols-4 lg:grid-cols-8 gap-px bg-line border border-line rounded-md overflow-hidden shrink-0">
      {[
        <Cell key="d" label="Delta (bar)" value={`${m.lastDelta >= 0 ? '+' : ''}${fmtVol(m.lastDelta)}`} tone={m.lastDelta >= 0 ? 'up' : 'down'} />,
        <Cell key="cd" label="Cum Δ (24b)" value={`${m.cumDelta >= 0 ? '+' : ''}${fmtVol(m.cumDelta)}`} tone={m.cumDelta >= 0 ? 'up' : 'down'} />,
        <Cell key="buy" label="Buy %" value={`${buyPct.toFixed(1)}%`} tone={buyPct >= 52 ? 'up' : buyPct <= 48 ? 'down' : ''} />,
        <Cell key="vol" label="Traded vol" value={fmtVol(m.vol)} />,
        <Cell key="bw" label="Bid wall" value={`${fmtVol(m.maxBidWall)} @ ${fmtPrice(m.bidWallPx, def.decimals)}`} tone="up" />,
        <Cell key="aw" label="Ask wall" value={`${fmtVol(m.maxAskWall)} @ ${fmtPrice(m.askWallPx, def.decimals)}`} tone="down" />,
        <Cell key="spr" label="Spread" value={`${fmtNum(m.q.spreadBps, 1)}bp`} />,
        <Cell key="vwap" label="vs VWAP" value={fmtPct(((m.q.price - m.q.vwap) / m.q.vwap) * 100)} tone={m.q.price >= m.q.vwap ? 'up' : 'down'} />,
      ]}
    </div>
  );
}

function Cell({ label, value, tone }: { label: string; value: string; tone?: string }): React.ReactElement {
  return (
    <div className="bg-panel px-2.5 py-1.5">
      <Metric label={label} value={value} size="sm" tone={(tone as 'up' | 'down') ?? 'neutral'} />
    </div>
  );
}

export function FlowLegend(): React.ReactElement {
  return (
    <div className={cx('text-[10px] text-text3')}>
      Delta = aggressive buys − sells per bar · imbalance shaded when one side ≥ 1.6× the other · walls = largest resting book sizes
    </div>
  );
}
