import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cx } from '../../lib/utils';

/** Resizable two-pane splitter (pixel-based first pane). */
export function SplitPane({ left, right, defaultSize = 300, min = 160, max = 640, direction = 'horizontal', storageKey, flip }: {
  left: React.ReactNode;
  right: React.ReactNode;
  defaultSize?: number;
  min?: number;
  max?: number;
  direction?: 'horizontal' | 'vertical';
  storageKey?: string;
  /** when true, the fixed-size pane (`left`) is rendered at the end */
  flip?: boolean;
}): React.ReactElement {
  const [size, setSize] = useState<number>(() => {
    if (storageKey) {
      try {
        const v = Number(localStorage.getItem(`traderos-split-${storageKey}`));
        if (Number.isFinite(v) && v >= min && v <= max) return v;
      } catch { /* ignore */ }
    }
    return defaultSize;
  });
  const [drag, setDrag] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const clamped = useRef(false);
  // Clamp the restored/default size on mount so the flexible pane always keeps
  // usable space (prevents e.g. a 400px pane crushing its sibling at 720p).
  useLayoutEffect(() => {
    if (clamped.current) return;
    clamped.current = true;
    const el = ref.current;
    if (!el) return;
    const total = direction === 'horizontal' ? el.clientWidth : el.clientHeight;
    if (total > 0) setSize((s) => Math.min(s, Math.max(min, total - 140)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pos = direction === 'horizontal' ? e.clientX - rect.left : e.clientY - rect.top;
    setSize(Math.min(max, Math.max(min, pos)));
  }, [direction, min, max]);

  useEffect(() => {
    if (!drag) return;
    const up = (): void => {
      setDrag(false);
      if (storageKey) {
        try {
          const el = ref.current;
          void el;
        } catch { /* ignore */ }
      }
    };
    document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', up);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [drag, onMove, storageKey, direction]);

  useEffect(() => {
    if (storageKey) {
      try { localStorage.setItem(`traderos-split-${storageKey}`, String(size)); } catch { /* ignore */ }
    }
  }, [size, storageKey]);

  const horiz = direction === 'horizontal';
  return (
    <div ref={ref} className={cx('flex min-h-0 min-w-0 flex-1', horiz ? (flip ? 'flex-row-reverse' : 'flex-row') : (flip ? 'flex-col-reverse' : 'flex-col'))}>
      <div className="min-h-0 min-w-0 flex flex-col" style={horiz ? { width: size, flexShrink: 0 } : { height: size, flexShrink: 0 }}>
        {left}
      </div>
      <div
        className={cx('shrink-0 transition-colors', horiz ? 'w-[5px] resize-handle-x -mx-[2px] z-10' : 'h-[5px] resize-handle-y -my-[2px] z-10', drag ? 'bg-accent/60' : 'hover:bg-accent/40')}
        onMouseDown={(e) => { e.preventDefault(); setDrag(true); }}
      />
      <div className="min-h-0 min-w-0 flex-1 flex flex-col">
        {right}
      </div>
    </div>
  );
}

/** Drag handle for fixed-edge resize (right panel / bottom terminal). */
export function EdgeHandle({ onResize, edge }: {
  onResize: (delta: number) => void;
  edge: 'left' | 'top';
}): React.ReactElement {
  const dragging = useRef(false);
  const last = useRef(0);
  useEffect(() => {
    const move = (e: MouseEvent): void => {
      if (!dragging.current) return;
      const cur = edge === 'left' ? e.clientX : e.clientY;
      onResize(cur - last.current);
      last.current = cur;
    };
    const up = (): void => {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
  }, [onResize, edge]);
  // NOTE: fills its parent — parents absolutely position the grab zone so the
  // handle never consumes layout space or overlays content unintentionally.
  return (
    <div
      className={cx('w-full h-full hover:bg-accent/50 active:bg-accent/70', edge === 'left' ? 'resize-handle-x' : 'resize-handle-y')}
      onMouseDown={(e) => {
        e.preventDefault();
        dragging.current = true;
        last.current = edge === 'left' ? e.clientX : e.clientY;
        document.body.style.cursor = edge === 'left' ? 'col-resize' : 'row-resize';
        document.body.style.userSelect = 'none';
      }}
    />
  );
}
