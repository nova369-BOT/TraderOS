import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  createChart, ColorType, CrosshairMode, LineStyle,
  type IChartApi, type ISeriesApi, type UTCTimestamp, type MouseEventParams,
} from 'lightweight-charts';
import { Brush, Eraser, Minus, MoveDiagonal, Spline, TrendingUp, Trash2 } from 'lucide-react';
import { marketEngine } from '../../services/marketEngine';
import { getSymbol, type Timeframe } from '../../services/symbols';
import { useWorkspaceStore } from '../../store/useWorkspaceStore';
import { useMarketStore } from '../../store/useMarketStore';
import { useTradingStore } from '../../store/useTradingStore';
import {
  ema, sma, rsi, macd, bollinger, sessionVwap, heikinAshi, type Candle,
} from '../../indicators';
import { fmtNum, fmtPrice } from '../../lib/format';
import { cx } from '../../lib/utils';

type DrawTool = 'cursor' | 'trend' | 'hline' | 'rect' | 'fib' | 'eraser';
interface Drawing {
  id: string;
  type: Exclude<DrawTool, 'cursor' | 'eraser'>;
  symbol: string;
  a: { t: number; p: number };
  b: { t: number; p: number };
  color: string;
}

const LC = { up: '#0ecb81', down: '#f6465d', grid: 'rgba(38,52,73,0.55)', text: '#5b6a83', cross: '#4d8dff' };
const DRAW_COLORS = ['#4d8dff', '#f0b90b', '#8b7cff', '#22d3ee', '#f6465d', '#0ecb81'];

function loadDrawings(symbol: string): Drawing[] {
  try {
    const raw = localStorage.getItem('traderos-drawings');
    if (!raw) return [];
    return (JSON.parse(raw) as Drawing[]).filter((d) => d.symbol === symbol);
  } catch { return []; }
}
function saveDrawings(symbol: string, list: Drawing[]): void {
  try {
    const raw = localStorage.getItem('traderos-drawings');
    const all: Drawing[] = raw ? JSON.parse(raw) : [];
    const rest = all.filter((d) => d.symbol !== symbol);
    localStorage.setItem('traderos-drawings', JSON.stringify([...rest, ...list]));
  } catch { /* ignore */ }
}

export function TerminalChart({ symbol, timeframe, showDrawToolbar = true, showLegend = true }: {
  symbol: string;
  timeframe: Timeframe;
  showDrawToolbar?: boolean;
  showLegend?: boolean;
}): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const mainRef = useRef<ISeriesApi<'Candlestick' | 'Bar' | 'Line' | 'Area'> | null>(null);
  const volRef = useRef<ISeriesApi<'Histogram'> | null>(null);
  const ovRefs = useRef<ISeriesApi<'Line'>[]>([]);
  const subRefs = useRef<ISeriesApi<'Line' | 'Histogram'>[]>([]);
  const lastTimeRef = useRef<number>(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  const chartType = useWorkspaceStore((s) => s.chartType);
  const indicators = useWorkspaceStore((s) => s.indicators);
  const drawingsVisible = useWorkspaceStore((s) => s.drawingsVisible);
  const tick = useMarketStore((s) => s.tick);
  const alerts = useMarketStore((s) => s.alerts);
  const positions = useTradingStore((s) => s.positions);

  const [tool, setTool] = useState<DrawTool>('cursor');
  const [drawColor, setDrawColor] = useState(DRAW_COLORS[0]);
  const [drawings, setDrawings] = useState<Drawing[]>(() => loadDrawings(symbol));
  const [pending, setPending] = useState<{ t: number; p: number } | null>(null);
  const [ghost, setGhost] = useState<{ t: number; p: number } | null>(null);
  const [rev, setRev] = useState(0);
  const [ohlc, setOhlc] = useState<Candle | null>(null);
  const [hoverPx, setHoverPx] = useState<number | null>(null);

  const def = getSymbol(symbol);
  const pos = positions.find((p) => p.symbol === symbol);
  const symAlerts = alerts.filter((a) => a.symbol === symbol && !a.triggered);

  useEffect(() => { setDrawings(loadDrawings(symbol)); setPending(null); }, [symbol]);
  useEffect(() => { saveDrawings(symbol, drawings); }, [symbol, drawings]);

  const candles: Candle[] = useMemo(() => {
    const raw = marketEngine.getCandles(symbol, timeframe, 520);
    return chartType === 'heikin' ? heikinAshi(raw) : raw;
  }, [symbol, timeframe, chartType, tick]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---------- build chart ----------
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const chart = createChart(el, {
      layout: { background: { type: ColorType.Solid, color: 'transparent' }, textColor: LC.text, fontFamily: "'JetBrains Mono', monospace", fontSize: 10 },
      grid: { vertLines: { color: LC.grid }, horzLines: { color: LC.grid } },
      crosshair: { mode: CrosshairMode.Normal, vertLine: { color: LC.cross, labelBackgroundColor: '#1d4fd7' }, horzLine: { color: LC.cross, labelBackgroundColor: '#1d4fd7' } },
      rightPriceScale: { borderColor: '#1a2334' },
      timeScale: { borderColor: '#1a2334', timeVisible: true, secondsVisible: timeframe === '1s' || timeframe === '5s' || timeframe === '15s' },
    });
    chartRef.current = chart;
    const ro = new ResizeObserver(() => {
      const w = wrapRef.current;
      if (w) chart.resize(w.clientWidth - (showDrawToolbar ? 30 : 0), w.clientHeight);
      setRev((r) => r + 1);
    });
    if (wrapRef.current) ro.observe(wrapRef.current);
    chart.timeScale().subscribeVisibleLogicalRangeChange(() => setRev((r) => r + 1));
    chart.subscribeCrosshairMove((p: MouseEventParams) => {
      const main = mainRef.current;
      if (!main || !p.time || !p.seriesData.has(main as never)) { setOhlc(null); setHoverPx(null); return; }
      const d = p.seriesData.get(main as never) as { open?: number; high?: number; low?: number; close?: number; value?: number };
      const t = (p.time as number) * 1000;
      const c = marketEngine.getCandles(symbol, timeframe, 520).find((x) => x.time === p.time);
      setOhlc(c ?? null);
      void t;
      setHoverPx(d.close ?? d.value ?? null);
    });
    return () => { ro.disconnect(); chart.remove(); chartRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, timeframe, showDrawToolbar]);

  // ---------- series + data ----------
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || candles.length === 0) return;
    // clear old
    try {
      if (mainRef.current) chart.removeSeries(mainRef.current as never);
      if (volRef.current) chart.removeSeries(volRef.current as never);
      ovRefs.current.forEach((s) => chart.removeSeries(s as never));
      subRefs.current.forEach((s) => chart.removeSeries(s as never));
    } catch { /* ignore */ }
    ovRefs.current = [];
    subRefs.current = [];
    lastTimeRef.current = 0;

    const hollow = chartType === 'hollow';
    const base = chartType === 'line' ? chart.addLineSeries({ color: '#4d8dff', lineWidth: 2, priceLineVisible: false, lastValueVisible: true })
      : chartType === 'area' ? chart.addAreaSeries({ lineColor: '#4d8dff', topColor: 'rgba(77,141,255,0.35)', bottomColor: 'rgba(77,141,255,0)', lineWidth: 2, priceLineVisible: false })
      : chartType === 'bars' ? chart.addBarSeries({ upColor: LC.up, downColor: LC.down, priceLineVisible: false })
      : chart.addCandlestickSeries({
          upColor: LC.up, downColor: LC.down, wickUpColor: hollow ? LC.up : LC.up, wickDownColor: LC.down,
          borderVisible: !hollow, priceLineVisible: false,
        });
    mainRef.current = base as never;

    const closes = candles.map((c) => c.close);
    if (chartType === 'line' || chartType === 'area') {
      (base as ISeriesApi<'Line'>).setData(candles.map((c) => ({ time: c.time as UTCTimestamp, value: c.close })));
    } else if (chartType === 'bars') {
      (base as ISeriesApi<'Bar'>).setData(candles.map((c) => ({ time: c.time as UTCTimestamp, open: c.open, high: c.high, low: c.low, close: c.close })));
    } else {
      (base as ISeriesApi<'Candlestick'>).setData(candles.map((c) => ({
        time: c.time as UTCTimestamp,
        open: c.open, high: c.high, low: c.low,
        close: hollow && c.close < c.open ? c.open : c.close,
        ...(hollow ? { open: c.close < c.open ? c.close : c.open } : {}),
      })));
    }

    // volume
    if (indicators.volume) {
      const vol = chart.addHistogramSeries({ priceScaleId: '', priceFormat: { type: 'volume' } });
      chart.priceScale('').applyOptions({ scaleMargins: { top: 0.84, bottom: 0 } });
      vol.setData(candles.map((c) => ({ time: c.time as UTCTimestamp, value: c.volume, color: c.close >= c.open ? 'rgba(14,203,129,0.45)' : 'rgba(246,70,93,0.45)' })));
      volRef.current = vol;
    } else {
      volRef.current = null;
      chart.priceScale('').applyOptions({ scaleMargins: { top: 0.9, bottom: 0 } });
    }
    const mkLine = (color: string, width: 1 | 2 = 1, scaleId?: string): ISeriesApi<'Line'> => {
      const s = chart.addLineSeries({
        color, lineWidth: width, priceLineVisible: false, lastValueVisible: scaleId ? false : true,
        crosshairMarkerVisible: !scaleId, ...(scaleId ? { priceScaleId: scaleId } : {}),
      });
      return s;
    };
    const line = (vals: Array<number | null>, color: string, w: 1 | 2 = 1): void => {
      const s = mkLine(color, w);
      s.setData(candles.map((c, i) => vals[i] === null ? null : { time: c.time as UTCTimestamp, value: vals[i] as number }).filter(Boolean) as Array<{ time: UTCTimestamp; value: number }>);
      ovRefs.current.push(s);
    };
    if (indicators.ema9) line(ema(closes, 9), '#f0b90b');
    if (indicators.ema21) line(ema(closes, 21), '#8b7cff');
    if (indicators.ema50) line(ema(closes, 50), '#22d3ee');
    if (indicators.sma200) line(sma(closes, 200), '#f6465d');
    if (indicators.vwap) line(sessionVwap(candles), '#4d8dff', 2);
    if (indicators.bb) {
      const b = bollinger(closes);
      line(b.upper, 'rgba(139,124,255,0.8)'); line(b.middle, 'rgba(139,124,255,0.4)'); line(b.lower, 'rgba(139,124,255,0.8)');
    }
    // subpanes
    const showRsi = !!indicators.rsi;
    const showMacd = !!indicators.macd;
    if (showRsi) {
      const anchor = chart.addLineSeries({ priceScaleId: 'rsi', color: 'transparent', lineVisible: false, priceLineVisible: false, lastValueVisible: false, crosshairMarkerVisible: false });
      subRefs.current.push(anchor as never);
      chart.priceScale('rsi').applyOptions({ scaleMargins: showMacd ? { top: 0.78, bottom: 0.12 } : { top: 0.82, bottom: 0.02 } });
      const r = rsi(closes, 14);
      const rs = mkLine('#c084fc', 1, 'rsi');
      rs.setData(candles.map((c, i) => r[i] === null ? null : { time: c.time as UTCTimestamp, value: r[i] as number }).filter(Boolean) as Array<{ time: UTCTimestamp; value: number }>);
      subRefs.current.push(rs as never);
      for (const lvl of [70, 50, 30]) {
        rs.createPriceLine({ price: lvl, color: lvl === 50 ? '#3a4a63' : '#f6465d55', lineWidth: 1, lineStyle: LineStyle.Dashed, axisLabelVisible: true, title: '' });
      }
    }
    if (showMacd) {
      chart.priceScale('macd').applyOptions({ scaleMargins: showRsi ? { top: 0.9, bottom: 0 } : { top: 0.82, bottom: 0.02 } });
      const m = macd(closes);
      const ml = mkLine('#4d8dff', 1, 'macd');
      const sl = mkLine('#f0b90b', 1, 'macd');
      ml.setData(candles.map((c, i) => m.macd[i] === null ? null : { time: c.time as UTCTimestamp, value: m.macd[i] as number }).filter(Boolean) as Array<{ time: UTCTimestamp; value: number }>);
      sl.setData(candles.map((c, i) => m.signal[i] === null ? null : { time: c.time as UTCTimestamp, value: m.signal[i] as number }).filter(Boolean) as Array<{ time: UTCTimestamp; value: number }>);
      const mh = chart.addHistogramSeries({ priceScaleId: 'macd', priceLineVisible: false, lastValueVisible: false });
      mh.setData(candles.map((c, i) => m.hist[i] === null ? null : { time: c.time as UTCTimestamp, value: m.hist[i] as number, color: (m.hist[i] as number) >= 0 ? 'rgba(14,203,129,0.5)' : 'rgba(246,70,93,0.5)' }).filter(Boolean) as never);
      subRefs.current.push(ml as never, sl as never, mh as never);
    }

    // position + alert price lines
    if (pos) {
      const mk = (price: number, color: string, title: string, style = LineStyle.Solid): void => {
        (base as ISeriesApi<'Candlestick'>).createPriceLine({ price, color, lineWidth: 1, lineStyle: style, axisLabelVisible: true, title });
      };
      mk(pos.avgEntry, '#4d8dff', `Entry ${fmtPrice(pos.avgEntry, def.decimals)}`, LineStyle.Dashed);
      if (pos.stop) mk(pos.stop, '#f6465d', `SL ${fmtPrice(pos.stop, def.decimals)}`);
      if (pos.target) mk(pos.target, '#0ecb81', `TP ${fmtPrice(pos.target, def.decimals)}`);
    }
    for (const a of symAlerts) {
      (base as ISeriesApi<'Candlestick'>).createPriceLine({ price: a.price, color: '#f0b90b', lineWidth: 1, lineStyle: LineStyle.Dotted, axisLabelVisible: true, title: `◉ ${a.condition}` });
    }

    lastTimeRef.current = candles[candles.length - 1].time;
    chart.timeScale().scrollToRealTime();
    setRev((r) => r + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, timeframe, chartType, JSON.stringify(indicators), pos?.avgEntry, pos?.stop, pos?.target, symAlerts.length]);

  // live update of the forming bar
  useEffect(() => {
    const chart = chartRef.current;
    const main = mainRef.current;
    if (!chart || !main || candles.length === 0) return;
    const lc = candles[candles.length - 1];
    if (lc.time !== lastTimeRef.current) {
      // new bar — full refresh is cheapest correct path
      lastTimeRef.current = lc.time;
      setRev((r) => r + 1);
      return;
    }
    try {
      if (chartType === 'line' || chartType === 'area') (main as unknown as ISeriesApi<'Line'>).update({ time: lc.time as UTCTimestamp, value: lc.close });
      else if (chartType === 'bars') (main as unknown as ISeriesApi<'Bar'>).update({ time: lc.time as UTCTimestamp, open: lc.open, high: lc.high, low: lc.low, close: lc.close });
      else (main as unknown as ISeriesApi<'Candlestick'>).update({ time: lc.time as UTCTimestamp, open: lc.open, high: lc.high, low: lc.low, close: lc.close });
      volRef.current?.update({ time: lc.time as UTCTimestamp, value: lc.volume, color: lc.close >= lc.open ? 'rgba(14,203,129,0.45)' : 'rgba(246,70,93,0.45)' });
    } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  // ---------- drawing helpers ----------
  const toXY = (t: number, p: number): { x: number; y: number } | null => {
    const chart = chartRef.current;
    const main = mainRef.current;
    if (!chart || !main) return null;
    const x = chart.timeScale().timeToCoordinate(t as UTCTimestamp);
    const y = (main as ISeriesApi<'Line'>).priceToCoordinate(p);
    if (x === null || y === null) return null;
    return { x, y };
  };
  const fromXY = (x: number, y: number): { t: number; p: number } | null => {
    const chart = chartRef.current;
    const main = mainRef.current;
    if (!chart || !main) return null;
    const t = chart.timeScale().coordinateToTime(x);
    const p = (main as ISeriesApi<'Line'>).coordinateToPrice(y);
    if (t === null || p === null) return null;
    return { t: t as number, p };
  };

  const commitDrawing = (a: { t: number; p: number }, b: { t: number; p: number }): void => {
    const id = `d-${Date.now().toString(36)}-${Math.floor(Math.random() * 999)}`;
    const type = tool === 'cursor' || tool === 'eraser' ? 'trend' : tool;
    setDrawings((d) => [...d, { id, type, symbol, a, b, color: drawColor }]);
    setPending(null);
    setGhost(null);
  };

  const onOverlayClick = (e: React.MouseEvent<SVGElement>): void => {
    if (tool === 'cursor') return;
    const rect = (e.currentTarget as SVGElement).getBoundingClientRect();
    const pt = fromXY(e.clientX - rect.left, e.clientY - rect.top);
    if (!pt) return;
    if (tool === 'eraser') {
      // delete nearest drawing within 8px
      const chart = chartRef.current;
      const main = mainRef.current;
      if (!chart || !main) return;
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      let best: string | null = null;
      let bestD = 10;
      for (const d of drawings) {
        const A = toXY(d.a.t, d.a.p);
        const B = toXY(d.b.t, d.b.p);
        if (!A || !B) continue;
        const mid = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
        const dist = Math.min(
          Math.hypot(A.x - mx, A.y - my),
          Math.hypot(B.x - mx, B.y - my),
          Math.hypot(mid.x - mx, mid.y - my),
        );
        if (dist < bestD) { bestD = dist; best = d.id; }
      }
      if (best) setDrawings((ds) => ds.filter((x) => x.id !== best));
      return;
    }
    if (tool === 'hline') {
      commitDrawing({ t: candles[0]?.time ?? pt.t, p: pt.p }, { t: candles[candles.length - 1]?.time ?? pt.t, p: pt.p });
      return;
    }
    if (!pending) setPending(pt);
    else commitDrawing(pending, pt);
  };

  const onOverlayMove = (e: React.MouseEvent<SVGElement>): void => {
    if (!pending || tool === 'cursor' || tool === 'eraser' || tool === 'hline') { setGhost(null); return; }
    const rect = (e.currentTarget as SVGElement).getBoundingClientRect();
    const pt = fromXY(e.clientX - rect.left, e.clientY - rect.top);
    setGhost(pt);
  };

  const renderDrawing = (d: Drawing, ghostPt?: { t: number; p: number } | null): React.ReactElement | null => {
    const B = ghostPt ?? d.b;
    const A = toXY(d.a.t, d.a.p);
    const Bp = toXY(B.t, B.p);
    if (!A || !Bp) return null;
    void rev;
    const c = d.color;
    if (d.type === 'hline') {
      const w = containerRef.current?.clientWidth ?? 800;
      return <g key={d.id}><line x1={0} x2={w} y1={A.y} y2={A.y} stroke={c} strokeWidth={1.2} strokeDasharray="5 3" /><circle cx={w - 4} cy={A.y} r={3} fill={c} /></g>;
    }
    if (d.type === 'trend') {
      // ray to the right
      const w = containerRef.current?.clientWidth ?? 800;
      const dx = Bp.x - A.x || 1;
      const slope = (Bp.y - A.y) / dx;
      const yEnd = A.y + slope * (w - A.x);
      return (
        <g key={d.id}>
          <line x1={A.x} y1={A.y} x2={w} y2={yEnd} stroke={c} strokeWidth={1.4} />
          <circle cx={A.x} cy={A.y} r={3} fill={c} />
          <circle cx={Bp.x} cy={Bp.y} r={3} fill={c} fillOpacity={0.4} />
        </g>
      );
    }
    if (d.type === 'rect') {
      return (
        <g key={d.id}>
          <rect x={Math.min(A.x, Bp.x)} y={Math.min(A.y, Bp.y)} width={Math.abs(Bp.x - A.x)} height={Math.abs(Bp.y - A.y)} fill={`${c}22`} stroke={c} strokeWidth={1.2} />
        </g>
      );
    }
    // fib
    const w = containerRef.current?.clientWidth ?? 800;
    const levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
    const hi = Math.max(A.y, Bp.y), lo = Math.min(A.y, Bp.y);
    return (
      <g key={d.id}>
        {levels.map((f) => {
          const y = hi - (hi - lo) * f;
          return (
            <g key={f}>
              <line x1={Math.min(A.x, Bp.x)} x2={w} y1={y} y2={y} stroke={c} strokeWidth={1} strokeDasharray={f === 0.5 ? '6 3' : '3 3'} opacity={0.85} />
              <text x={Math.min(A.x, Bp.x) + 3} y={y - 3} fill={c} fontSize={9} fontFamily="JetBrains Mono">{(f * 100).toFixed(1)}%</text>
            </g>
          );
        })}
      </g>
    );
  };

  const last = candles[candles.length - 1];
  const shown = ohlc ?? last;
  const chgPct = shown && candles.length > 1 ? ((shown.close - (candles[candles.indexOf(shown) - 1]?.close ?? shown.open)) / shown.open) * 100 : 0;

  const tools: Array<{ id: DrawTool; icon: React.ReactNode; tip: string }> = [
    { id: 'cursor', icon: <Spline size={13} />, tip: 'Crosshair' },
    { id: 'trend', icon: <TrendingUp size={13} />, tip: 'Trend line (ray)' },
    { id: 'hline', icon: <Minus size={13} />, tip: 'Horizontal line' },
    { id: 'rect', icon: <MoveDiagonal size={13} />, tip: 'Rectangle' },
    { id: 'fib', icon: <Brush size={13} />, tip: 'Fibonacci retracement' },
    { id: 'eraser', icon: <Eraser size={13} />, tip: 'Eraser — click a drawing to delete' },
  ];

  return (
    <div ref={wrapRef} className="flex-1 min-h-0 flex relative">
      {showDrawToolbar && (
        <div className="w-[30px] shrink-0 border-r border-line bg-panel2 flex flex-col items-center py-1 gap-0.5">
          {tools.map((t) => (
            <button
              key={t.id}
              title={t.tip}
              onClick={() => { setTool(t.id); setPending(null); }}
              className={cx('w-[24px] h-[24px] rounded flex items-center justify-center', tool === t.id ? 'bg-accentdim text-accent' : 'text-text3 hover:text-text1 hover:bg-hover')}
            >
              {t.icon}
            </button>
          ))}
          <div className="w-4 border-t border-line my-1" />
          {DRAW_COLORS.map((c) => (
            <button key={c} title={`Color ${c}`} onClick={() => setDrawColor(c)} className="w-[14px] h-[14px] rounded-sm my-[1px]" style={{ background: c, outline: drawColor === c ? '1.5px solid #fff' : 'none', outlineOffset: 1 }} />
          ))}
          <span className="flex-1" />
          <button title="Clear all drawings" onClick={() => setDrawings([])} className="w-[24px] h-[24px] rounded flex items-center justify-center text-text3 hover:text-down hover:bg-hover">
            <Trash2 size={13} />
          </button>
        </div>
      )}
      <div className="flex-1 min-w-0 relative">
        <div ref={containerRef} className="absolute inset-0" />
        {/* OHLC legend */}
        {showLegend && shown && (
          <div className="absolute top-1.5 left-2 flex items-center gap-2 text-[10.5px] num pointer-events-none z-10">
            <span className="font-bold text-text1">{symbol} · {timeframe}</span>
            <span className="text-text3">O <span className="text-text2">{fmtPrice(shown.open, def.decimals)}</span></span>
            <span className="text-text3">H <span className="text-text2">{fmtPrice(shown.high, def.decimals)}</span></span>
            <span className="text-text3">L <span className="text-text2">{fmtPrice(shown.low, def.decimals)}</span></span>
            <span className="text-text3">C <span className={shown.close >= shown.open ? 'text-up' : 'text-down'}>{fmtPrice(shown.close, def.decimals)}</span></span>
            <span className={chgPct >= 0 ? 'text-up' : 'text-down'}>{chgPct >= 0 ? '+' : ''}{fmtNum(chgPct, 2)}%</span>
            <span className="text-text3">Vol <span className="text-text2">{fmtNum(shown.volume, 0)}</span></span>
            {hoverPx !== null && ohlc && <span className="text-accent">@ {fmtPrice(hoverPx, def.decimals)}</span>}
          </div>
        )}
        {/* position chip */}
        {pos && (
          <div className="absolute bottom-1.5 left-2 z-10 flex items-center gap-1.5 px-2 h-[22px] rounded bg-panel2/90 border border-line2 text-[10px]">
            <span className={cx('badge !h-[14px]', pos.side === 'LONG' ? 'badge-up' : 'badge-down')}>{pos.side}</span>
            <span className="num text-text2">{fmtNum(pos.qty, 4)} @ {fmtPrice(pos.avgEntry, def.decimals)}</span>
            <span className={cx('num font-bold', pos.unrealized >= 0 ? 'text-up' : 'text-down')}>{pos.unrealized >= 0 ? '+' : ''}{fmtNum(pos.unrealized, 0)}</span>
          </div>
        )}
        {/* drawings overlay */}
        {drawingsVisible && (
          <svg
            className="absolute inset-0 z-[5]"
            style={{ pointerEvents: tool === 'cursor' ? 'none' : 'auto', cursor: tool === 'cursor' ? 'crosshair' : 'copy', width: '100%', height: '100%' }}
            onClick={onOverlayClick}
            onMouseMove={onOverlayMove}
            onMouseLeave={() => setGhost(null)}
          >
            {drawings.map((d) => renderDrawing(d))}
            {pending && ghost && tool !== 'hline' && renderDrawing({ id: '__ghost', type: tool as Drawing['type'], symbol, a: pending, b: ghost, color: drawColor }, ghost)}
            {pending && !ghost && <circle cx={toXY(pending.t, pending.p)?.x} cy={toXY(pending.t, pending.p)?.y} r={3.5} fill={drawColor} />}
          </svg>
        )}
        {pending && (
          <div className="absolute top-1.5 right-2 z-10 px-2 h-[20px] rounded bg-accentdim border border-accent/40 text-[10px] text-accent flex items-center">
            Click to set point B · Esc cancels
          </div>
        )}
      </div>
    </div>
  );
}
