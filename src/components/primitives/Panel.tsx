import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Maximize2, Minimize2, MoreHorizontal, X } from 'lucide-react';
import { cx } from '../../lib/utils';

interface PanelProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  tabs?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  collapsible?: boolean;
  closable?: boolean;
  onClose?: () => void;
  noBody?: boolean;
  headerClassName?: string;
}

export function Panel({
  title, subtitle, actions, tabs, children, className, bodyClassName,
  collapsible, closable, onClose, noBody, headerClassName,
}: PanelProps): React.ReactElement {
  const [collapsed, setCollapsed] = useState(false);
  const [maxed, setMaxed] = useState(false);
  return (
    <section
      className={cx('panel', maxed && 'fixed inset-2 z-40 shadow-2xl', className)}
      style={maxed ? { background: 'var(--color-panel)' } : undefined}
    >
      {(title || tabs || actions || collapsible || closable) && (
        <header className={cx('panel-hd', headerClassName)}>
          {tabs ? (
            <div className="flex items-center gap-1 flex-1 min-w-0 overflow-x-auto">{tabs}</div>
          ) : (
            <>
              {typeof title === 'string' ? <span className="panel-title">{title}</span> : title}
              {subtitle && <span className="text-[10px] text-text3 truncate">{subtitle}</span>}
              <span className="flex-1" />
            </>
          )}
          {actions && <div className="flex items-center gap-1 shrink-0">{actions}</div>}
          {(collapsible || closable) && (
            <div className="flex items-center gap-0.5 shrink-0 ml-1">
              {collapsible && (
                <button className="tbtn tbtn-ghost tbtn-xs !px-1" onClick={() => setCollapsed(!collapsed)} title={collapsed ? 'Expand' : 'Collapse'}>
                  {collapsed ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
                </button>
              )}
              <button className="tbtn tbtn-ghost tbtn-xs !px-1" onClick={() => setMaxed(!maxed)} title={maxed ? 'Restore' : 'Maximize'}>
                {maxed ? <Minimize2 size={11} /> : <Maximize2 size={11} />}
              </button>
              {closable && (
                <button className="tbtn tbtn-ghost tbtn-xs !px-1" onClick={onClose} title="Close panel">
                  <X size={12} />
                </button>
              )}
            </div>
          )}
        </header>
      )}
      {!collapsed && (noBody ? children : <div className={cx('panel-body', bodyClassName)}>{children}</div>)}
    </section>
  );
}

export function PanelAction({ icon, title, onClick, active }: {
  icon: React.ReactNode; title: string; onClick?: () => void; active?: boolean;
}): React.ReactElement {
  return (
    <button
      className={cx('tbtn tbtn-ghost tbtn-xs !px-1', active && '!text-accent')}
      title={title}
      onClick={(e) => { e.stopPropagation(); onClick?.(); }}
    >
      {icon}
    </button>
  );
}

export function OverflowBtn({ onClick }: { onClick?: () => void }): React.ReactElement {
  return <PanelAction icon={<MoreHorizontal size={13} />} title="More actions" onClick={onClick} />;
}

export function EmptyState({ icon, title, hint, action }: {
  icon?: React.ReactNode; title: string; hint?: string; action?: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[120px] gap-2 p-6 text-center">
      {icon && <div className="text-text3 mb-1">{icon}</div>}
      <div className="text-[11px] font-medium text-text2">{title}</div>
      {hint && <div className="text-[10.5px] text-text3 max-w-[260px] leading-relaxed">{hint}</div>}
      {action}
    </div>
  );
}

export function LoadingRows({ rows = 8 }: { rows?: number }): React.ReactElement {
  return (
    <div className="p-2 space-y-1.5 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-[18px] rounded bg-panel3" style={{ opacity: 0.35 + (i % 3) * 0.15 }} />
      ))}
    </div>
  );
}
