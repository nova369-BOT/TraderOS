import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronRight } from 'lucide-react';
import { cx } from '../../lib/utils';

export interface MenuItem {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: string;
  checked?: boolean;
  danger?: boolean;
  disabled?: boolean;
  divider?: boolean;
  header?: string;
  onClick?: () => void;
  children?: MenuItem[];
}

export function MenuList({ items, onDone }: { items: MenuItem[]; onDone: () => void }): React.ReactElement {
  const [openSub, setOpenSub] = useState<number | null>(null);
  return (
    <div className="py-1 min-w-[190px]" onMouseLeave={() => setOpenSub(null)}>
      {items.map((it, i) => {
        if (it.divider) return <div key={i} className="my-1 border-t border-line" />;
        if (it.header) return <div key={i} className="px-2.5 pt-1.5 pb-1 text-[9px] font-semibold uppercase tracking-wider text-text3">{it.header}</div>;
        return (
          <div key={i} className="relative">
            <button
              className={cx(
                'w-full flex items-center gap-2 px-2.5 h-[26px] text-[11.5px] text-left',
                it.disabled ? 'opacity-40 cursor-default' : 'hover:bg-accentdim cursor-pointer',
                it.danger ? 'text-down' : 'text-text1',
              )}
              disabled={it.disabled}
              onMouseEnter={() => setOpenSub(it.children ? i : null)}
              onClick={() => { if (!it.children) { it.onClick?.(); onDone(); } }}
            >
              <span className="w-4 flex justify-center text-text2">{it.checked ? <Check size={13} className="text-up" /> : it.icon}</span>
              <span className="flex-1 truncate">{it.label}</span>
              {it.shortcut && <span className="kbd">{it.shortcut}</span>}
              {it.children && <ChevronRight size={12} className="text-text3" />}
            </button>
            {it.children && openSub === i && (
              <div className="absolute left-full top-0 ml-0.5 rounded-md border border-line2 bg-panel2 shadow-2xl z-50">
                <MenuList items={it.children} onDone={onDone} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function useFloatingPos(anchorRect: { x: number; y: number } | null, w = 220, h = 300): React.CSSProperties {
  const [style, setStyle] = useState<React.CSSProperties>({ visibility: 'hidden' });
  useLayoutEffect(() => {
    if (!anchorRect) return;
    const x = Math.min(anchorRect.x, window.innerWidth - w - 8);
    const y = Math.min(anchorRect.y, window.innerHeight - h - 8);
    setStyle({ position: 'fixed', left: Math.max(8, x), top: Math.max(8, y), zIndex: 100 });
  }, [anchorRect, w, h]);
  return style;
}

let ctxApi: ((pos: { x: number; y: number }, items: MenuItem[]) => void) | null = null;

export function showContextMenu(x: number, y: number, items: MenuItem[]): void {
  ctxApi?.({ x, y }, items);
}

export function ContextMenuHost(): React.ReactElement | null {
  const [state, setState] = useState<{ pos: { x: number; y: number }; items: MenuItem[] } | null>(null);
  const style = useFloatingPos(state?.pos ?? null, 230, Math.min(420, (state?.items.length ?? 4) * 28 + 16));
  useEffect(() => {
    ctxApi = (pos, items) => setState({ pos, items });
    return () => { ctxApi = null; };
  }, []);
  useEffect(() => {
    if (!state) return;
    const close = (): void => setState(null);
    const onKey = (e: KeyboardEvent): void => { if (e.key === 'Escape') close(); };
    window.addEventListener('mousedown', close);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', close);
    return () => {
      window.removeEventListener('mousedown', close);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', close);
    };
  }, [state]);
  if (!state) return null;
  return createPortal(
    <div
      style={style}
      className="rounded-md border border-line2 bg-panel2 shadow-2xl overflow-visible"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <MenuList items={state.items} onDone={() => setState(null)} />
    </div>,
    document.body,
  );
}

export function Dropdown({ trigger, items, align = 'left' }: {
  trigger: React.ReactNode; items: MenuItem[]; align?: 'left' | 'right';
}): React.ReactElement {
  // NOTE: the menu is portaled to <body> so it is never clipped by
  // overflow-hidden/auto ancestors (toolbars, panel headers, scroll regions).
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  const toggle = (): void => {
    if (open) { setOpen(false); return; }
    const el = anchorRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setRect({ x: r.left, y: r.bottom + 4, w: r.width, h: r.height });
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const close = (): void => setOpen(false);
    const onKey = (e: KeyboardEvent): void => { if (e.key === 'Escape') close(); };
    const onDown = (e: MouseEvent): void => {
      if ((e.target as HTMLElement).closest?.('[data-dropdown-menu]')) return;
      if (anchorRef.current?.contains(e.target as Node)) return;
      close();
    };
    window.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', close);
    window.addEventListener('scroll', close, true);
    return () => {
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', close);
      window.removeEventListener('scroll', close, true);
    };
  }, [open ]);

  const MENU_W = 220;
  const MENU_H = Math.min(400, items.length * 28 + 18);
  let left = 0;
  let top = 0;
  if (rect) {
    left = align === 'right' ? rect.x + rect.w - MENU_W : rect.x;
    left = Math.max(8, Math.min(left, window.innerWidth - MENU_W - 8));
    top = rect.y;
    if (top + MENU_H > window.innerHeight - 8) {
      top = Math.max(8, rect.y - rect.h - 4 - MENU_H); // flip upward near viewport bottom
    }
  }

  return (
    <>
      <div ref={anchorRef} className="inline-block" onClick={toggle}>{trigger}</div>
      {open && rect && createPortal(
        <div
          data-dropdown-menu
          className="fixed z-[70] rounded-md border border-line2 bg-panel2 shadow-2xl overflow-y-auto"
          style={{ left, top, minWidth: Math.max(MENU_W, Math.min(rect.w, 320)), maxHeight: MENU_H }}
          onClick={() => setOpen(false)}
        >
          <MenuList items={items} onDone={() => setOpen(false)} />
        </div>,
        document.body,
      )}
    </>
  );
}
