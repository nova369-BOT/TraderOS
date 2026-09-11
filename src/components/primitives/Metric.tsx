import React from 'react';
import { cx } from '../../lib/utils';

export function Metric({ label, value, sub, tone, size = 'md', align = 'left' }: {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  tone?: 'up' | 'down' | 'neutral' | 'accent' | 'warn';
  size?: 'sm' | 'md' | 'lg';
  align?: 'left' | 'right';
}): React.ReactElement {
  return (
    <div className={cx('min-w-0', align === 'right' && 'text-right')}>
      <div className="text-[9.5px] font-semibold uppercase tracking-[0.07em] text-text3 truncate">{label}</div>
      <div className={cx(
        'num font-semibold truncate leading-tight mt-0.5',
        size === 'sm' && 'text-[12px]',
        size === 'md' && 'text-[15px]',
        size === 'lg' && 'text-[20px]',
        tone === 'up' && 'text-up',
        tone === 'down' && 'text-down',
        tone === 'accent' && 'text-accent',
        tone === 'warn' && 'text-warn',
        !tone && 'text-text1',
      )}>
        {value}
      </div>
      {sub !== undefined && <div className="text-[10px] text-text3 truncate mt-0.5">{sub}</div>}
    </div>
  );
}

export function Delta({ value, suffix = '%', decimals = 2, size = 'md' }: {
  value: number; suffix?: string; decimals?: number; size?: 'sm' | 'md' | 'lg';
}): React.ReactElement {
  const up = value > 0;
  const dn = value < 0;
  const sign = up ? '+' : dn ? '−' : '';
  return (
    <span className={cx(
      'num font-semibold',
      size === 'sm' && 'text-[10.5px]', size === 'md' && 'text-[12px]', size === 'lg' && 'text-[15px]',
      up && 'text-up', dn && 'text-down', !up && !dn && 'text-text2',
    )}>
      {sign}{Math.abs(value).toFixed(decimals)}{suffix}
    </span>
  );
}

/** price that flashes on tick direction */
export function TickPrice({ value, decimals = 2, dir, size = 'md', prefix = '' }: {
  value: number; decimals?: number; dir: 1 | -1 | 0; size?: 'sm' | 'md' | 'lg'; prefix?: string;
}): React.ReactElement {
  return (
    <span className={cx(
      'num font-semibold transition-colors duration-300',
      size === 'sm' && 'text-[11px]', size === 'md' && 'text-[13px]', size === 'lg' && 'text-[18px]',
      dir === 1 && 'tick-up', dir === -1 && 'tick-down', dir === 0 && 'text-text1',
    )}>
      {prefix}{value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
    </span>
  );
}

export function SymBadge({ symbol, exchange, size = 'md', onClick }: {
  symbol: string; exchange?: string; size?: 'sm' | 'md'; onClick?: () => void;
}): React.ReactElement {
  return (
    <button
      className={cx('inline-flex items-baseline gap-1.5 min-w-0', onClick && 'cursor-pointer hover:opacity-80')}
      onClick={onClick}
      title={exchange ? `${symbol} · ${exchange}` : symbol}
    >
      <span className={cx('font-bold text-text1 truncate', size === 'sm' ? 'text-[11px]' : 'text-[12.5px]')}>{symbol}</span>
      {exchange && <span className="text-[9px] font-medium text-text3 shrink-0">{exchange}</span>}
    </button>
  );
}

export function Bar({ value, max, tone, height = 3 }: {
  value: number; max: number; tone: 'up' | 'down' | 'accent'; height?: number;
}): React.ReactElement {
  const pct = max <= 0 ? 0 : Math.min(100, (Math.abs(value) / max) * 100);
  return (
    <div className="w-full rounded-sm bg-panel3 overflow-hidden" style={{ height }}>
      <div
        className={cx('h-full rounded-sm', tone === 'up' && 'bg-up', tone === 'down' && 'bg-down', tone === 'accent' && 'bg-accent')}
        style={{ width: `${pct}%`, opacity: 0.85 }}
      />
    </div>
  );
}
