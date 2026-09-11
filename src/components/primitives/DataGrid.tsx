import React, { useMemo, useRef, useState, useEffect } from 'react';
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';
import { cx } from '../../lib/utils';

export interface GridColumn<T> {
  key: string;
  title: React.ReactNode;
  align?: 'l' | 'r' | 'c';
  width?: number | string;
  sortable?: boolean;
  sortVal?: (row: T) => number | string;
  render: (row: T, index: number) => React.ReactNode;
  className?: string;
}

interface DataGridProps<T> {
  columns: GridColumn<T>[];
  rows: T[];
  rowKey: (row: T, i: number) => string;
  onRowClick?: (row: T, e: React.MouseEvent) => void;
  onRowContext?: (row: T, e: React.MouseEvent) => void;
  onRowDouble?: (row: T) => void;
  activeKey?: string | null;
  defaultSort?: string;
  defaultDir?: 'asc' | 'desc';
  rowClass?: (row: T) => string;
  empty?: React.ReactNode;
  flashKey?: (row: T) => string | undefined;
  /** controlled sort (optional) */
  sort?: { key: string | null; dir: 'asc' | 'desc' };
  onSort?: (key: string | null, dir: 'asc' | 'desc') => void;
}

export function DataGrid<T>({
  columns, rows, rowKey, onRowClick, onRowContext, onRowDouble,
  activeKey, defaultSort, defaultDir = 'desc', rowClass, empty = 'No rows', flashKey, sort, onSort,
}: DataGridProps<T>): React.ReactElement {
  const [innerKey, setInnerKey] = useState<string | null>(defaultSort ?? null);
  const [innerDir, setInnerDir] = useState<'asc' | 'desc'>(defaultDir);
  const controlled = sort !== undefined;
  const sortKey = controlled ? sort.key : innerKey;
  const dir = controlled ? sort.dir : innerDir;
  const applySort = (key: string | null, d: 'asc' | 'desc'): void => {
    if (controlled) onSort?.(key, d);
    else { setInnerKey(key); setInnerDir(d); }
  };

  const sorted = useMemo(() => {
    if (!sortKey) return rows;
    const col = columns.find((c) => c.key === sortKey);
    if (!col?.sortVal) return rows;
    const sv = col.sortVal;
    const arr = [...rows];
    arr.sort((a, b) => {
      const va = sv(a), vb = sv(b);
      const cmp = typeof va === 'number' && typeof vb === 'number' ? va - vb : String(va).localeCompare(String(vb));
      return dir === 'asc' ? cmp : -cmp;
    });
    return arr;
  }, [rows, sortKey, dir, columns]);

  return (
    <table className="dgrid">
      <thead>
        <tr>
          {columns.map((c, ci) => (
            <th
              key={c.key}
              style={{ width: c.width, textAlign: c.align === 'l' || ci === 0 ? 'left' : c.align === 'c' ? 'center' : 'right', cursor: c.sortable ? 'pointer' : undefined, userSelect: 'none' }}
              onClick={() => {
                if (!c.sortable) return;
                if (sortKey === c.key) applySort(c.key, dir === 'asc' ? 'desc' : 'asc');
                else applySort(c.key, defaultDir);
              }}
              className={c.className}
            >
              <span className="inline-flex items-center gap-1">
                {c.title}
                {c.sortable && (
                  sortKey !== c.key ? <ChevronsUpDown size={10} className="opacity-40" />
                    : dir === 'asc' ? <ArrowUp size={10} className="text-accent" /> : <ArrowDown size={10} className="text-accent" />
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.length === 0 && (
          <tr><td colSpan={columns.length} className="!text-center px-3 py-8 text-[11px] text-mute">{empty}</td></tr>
        )}
        {sorted.map((row, i) => {
          const key = rowKey(row, i);
          return (
            <tr
              key={key}
              className={cx(activeKey === key && 'active', rowClass?.(row))}
              onClick={(e) => onRowClick?.(row, e)}
              onDoubleClick={() => onRowDouble?.(row)}
              onContextMenu={(e) => { if (onRowContext) { e.preventDefault(); onRowContext(row, e); } }}
            >
              {columns.map((c, ci) => (
                <td
                  key={c.key}
                  style={{ textAlign: c.align === 'l' || ci === 0 ? 'left' : c.align === 'c' ? 'center' : 'right' }}
                  data-flash={flashKey?.(row)}
                >
                  {c.render(row, i)}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function GridEmpty({ text }: { text: string }): React.ReactElement {
  return <div className="px-3 py-6 text-center text-[11px] text-text3">{text}</div>;
}

/** Lightweight windowed list for long streams (tape, logs). */
export function VirtualList<T>({
  items, rowHeight, height, render, overscan = 6, className,
}: {
  items: T[];
  rowHeight: number;
  height: number | string;
  render: (item: T, i: number) => React.ReactNode;
  overscan?: number;
  className?: string;
}): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewH, setViewH] = useState(300);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setViewH(el.clientHeight));
    ro.observe(el);
    setViewH(el.clientHeight);
    return () => ro.disconnect();
  }, []);

  const start = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const end = Math.min(items.length, Math.ceil((scrollTop + viewH) / rowHeight) + overscan);
  const slice = items.slice(start, end);

  return (
    <div
      ref={ref}
      className={cx('overflow-auto relative', className)}
      style={{ height }}
      onScroll={(e) => setScrollTop((e.target as HTMLDivElement).scrollTop)}
    >
      <div style={{ height: items.length * rowHeight, position: 'relative' }}>
        <div style={{ position: 'absolute', top: start * rowHeight, left: 0, right: 0 }}>
          {slice.map((item, k) => (
            <div key={start + k} style={{ height: rowHeight }}>
              {render(item, start + k)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
