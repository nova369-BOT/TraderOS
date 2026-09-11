import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cx } from '../../lib/utils';

export function Modal({ title, subtitle, onClose, children, width = 560, footer }: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
  footer?: React.ReactNode;
}): React.ReactElement {
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" style={{ background: 'rgba(3,6,10,0.7)', backdropFilter: 'blur(2px)' }} onMouseDown={onClose}>
      <div
        className="panel !rounded-lg shadow-2xl max-h-[86vh]"
        style={{ width, maxWidth: '94vw' }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="panel-hd !h-[38px]">
          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-text1 truncate">{title}</div>
            {subtitle && <div className="text-[10px] text-text3 truncate">{subtitle}</div>}
          </div>
          <span className="flex-1" />
          <button className="tbtn tbtn-ghost tbtn-sm !px-1.5" onClick={onClose}><X size={14} /></button>
        </header>
        <div className="panel-body p-3">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 px-3 py-2 border-t border-line bg-panel2">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}

export function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }): React.ReactElement {
  return (
    <label className={cx('block min-w-0', className)}>
      <span className="tlabel">{label}</span>
      {children}
    </label>
  );
}
