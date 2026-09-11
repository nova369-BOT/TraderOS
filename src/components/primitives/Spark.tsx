import React, { useId, useMemo } from 'react';
import { cx } from '../../lib/utils';

function path(pts: Array<{ x: number; y: number }>): string {
  if (!pts.length) return '';
  return `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}` + pts.slice(1).map((p) => `L${p.x.toFixed(1)},${p.y.toFixed(1)}`).join('');
}

export function Sparkline({ data, width = 96, height = 28, tone, fill = true, strokeWidth = 1.25 }: {
  data: number[]; width?: number; height?: number; tone?: 'up' | 'down' | 'accent'; fill?: boolean; strokeWidth?: number;
}): React.ReactElement {
  const gid = useId();
  const { d, area, color } = useMemo(() => {
    if (!data.length) return { d: '', area: '', color: '#4d8dff' };
    const min = Math.min(...data), max = Math.max(...data);
    const rng = max - min || 1;
    const px = (i: number): number => (i / Math.max(1, data.length - 1)) * (width - 2) + 1;
    const py = (v: number): number => height - 2 - ((v - min) / rng) * (height - 5);
    const pts = data.map((v, i) => ({ x: px(i), y: py(v) }));
    const up = data[data.length - 1] >= data[0];
    const c = tone === 'up' ? '#0ecb81' : tone === 'down' ? '#f6465d' : tone === 'accent' ? '#4d8dff' : up ? '#0ecb81' : '#f6465d';
    return { d: path(pts), area: `${path(pts)}L${width - 1},${height}L1,${height}Z`, color: c };
  }, [data, width, height, tone]);
  return (
    <svg width={width} height={height} className="shrink-0">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.35} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      {fill && <path d={area} fill={`url(#${gid})`} />}
      <path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  );
}

export function EquityChart({ data, height = 120, className, benchmark }: {
  data: Array<{ time: number; equity: number }>;
  height?: number;
  className?: string;
  benchmark?: number[];
}): React.ReactElement {
  const gid = useId();
  const W = 600, H = 200;
  const { d, area, up, min, max } = useMemo(() => {
    const vals = data.map((p) => p.equity);
    if (!vals.length) return { d: '', area: '', up: true, min: 0, max: 0 };
    const mn = Math.min(...vals), mx = Math.max(...vals);
    const rng = mx - mn || 1;
    const pts = vals.map((v, i) => ({
      x: (i / Math.max(1, vals.length - 1)) * (W - 8) + 4,
      y: H - 10 - ((v - mn) / rng) * (H - 20),
    }));
    const dd = path(pts);
    return { d: dd, area: `${dd}L${W - 4},${H}L4,${H}Z`, up: vals[vals.length - 1] >= vals[0], min: mn, max: mx };
  }, [data]);
  const color = up ? '#0ecb81' : '#f6465d';
  return (
    <div className={cx('relative w-full', className)} style={{ height }}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-full equity-glow">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="#1a2334" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
        <path d={area} fill={`url(#${gid})`} />
        <path d={d} fill="none" stroke={color} strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        {benchmark && benchmark.length > 1 && (
          <path d={path(benchmark.map((v, i) => {
            const mn = Math.min(...benchmark), mx = Math.max(...benchmark);
            const rng = mx - mn || 1;
            return { x: (i / (benchmark.length - 1)) * (W - 8) + 4, y: H - 10 - ((v - mn) / rng) * (H - 20) };
          }))} fill="none" stroke="#4d8dff" strokeWidth="1" strokeDasharray="4 3" vectorEffect="non-scaling-stroke" opacity={0.8} />
        )}
      </svg>
      <div className="absolute top-0 right-1 num text-[9px] text-text3">
        {max.toLocaleString('en-US', { maximumFractionDigits: 0 })}
      </div>
      <div className="absolute bottom-0 right-1 num text-[9px] text-text3">
        {min.toLocaleString('en-US', { maximumFractionDigits: 0 })}
      </div>
    </div>
  );
}

export function DistBars({ data, height = 90 }: {
  data: Array<{ bin: number; count: number }>; height?: number;
}): React.ReactElement {
  const max = Math.max(1, ...data.map((d) => d.count));
  const W = 600, H = 160;
  const bw = W / Math.max(1, data.length);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full" style={{ height }}>
      {data.map((d, i) => {
        const h = (d.count / max) * (H - 14);
        return (
          <rect
            key={i}
            x={i * bw + 1}
            y={H - 8 - h}
            width={Math.max(1, bw - 2)}
            height={Math.max(1, h)}
            rx={1}
            fill={d.bin >= 0 ? '#0ecb81' : '#f6465d'}
            opacity={0.75}
          />
        );
      })}
      <line x1="0" x2={W} y1={H - 8} y2={H - 8} stroke="#273449" strokeWidth="1" />
    </svg>
  );
}

export function Donut({ slices, size = 120, thickness = 16 }: {
  slices: Array<{ value: number; color: string; label: string }>; size?: number; thickness?: number;
}): React.ReactElement {
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  const R = (size - thickness) / 2;
  const C = 2 * Math.PI * R;
  let acc = 0;
  return (
    <svg width={size} height={size}>
      <circle cx={size / 2} cy={size / 2} r={R} fill="none" stroke="#141c2a" strokeWidth={thickness} />
      {slices.map((s, i) => {
        const frac = s.value / total;
        const dash = `${frac * C} ${C - frac * C}`;
        const off = -acc * C;
        acc += frac;
        return (
          <circle key={i} cx={size / 2} cy={size / 2} r={R} fill="none"
            stroke={s.color} strokeWidth={thickness} strokeDasharray={dash}
            strokeDashoffset={off} transform={`rotate(-90 ${size / 2} ${size / 2})`} opacity={0.9} />
        );
      })}
    </svg>
  );
}
