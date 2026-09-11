import React from 'react';
import {
  Activity, Bot, Briefcase, CalendarClock, CandlestickChart, ChevronsLeft, ChevronsRight,
  FlaskConical, Layers, Newspaper, Radar, Settings, SlidersHorizontal, Swords, Wallet,
} from 'lucide-react';
import { useWorkspaceStore, type ViewId } from '../../store/useWorkspaceStore';
import { useTradingStore } from '../../store/useTradingStore';
import { cx } from '../../lib/utils';

interface NavItem {
  id: ViewId | 'orders-link' | 'positions-link';
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  badge?: number;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

function icon(el: React.ReactNode): React.ReactNode {
  return React.cloneElement(el as React.ReactElement, { size: 15 });
}

export function LeftNav(): React.ReactElement {
  const view = useWorkspaceStore((s) => s.view);
  const setView = useWorkspaceStore((s) => s.setView);
  const collapsed = useWorkspaceStore((s) => s.leftCollapsed);
  const toggleLeft = useWorkspaceStore((s) => s.toggleLeft);
  const setBottomTab = useWorkspaceStore((s) => s.setBottomTab);
  const orders = useTradingStore((s) => s.orders);
  const positions = useTradingStore((s) => s.positions);
  const openOrders = orders.filter((o) => o.status === 'WORKING').length;

  const groups: NavGroup[] = [
    {
      title: 'Overview',
      items: [
        { id: 'markets', label: 'Markets', icon: icon(<Activity />), shortcut: '1' },
        { id: 'chart', label: 'Chart', icon: icon(<CandlestickChart />), shortcut: '2' },
        { id: 'orderflow', label: 'Order Flow', icon: icon(<Layers />), shortcut: '3' },
        { id: 'scanner', label: 'Scanner', icon: icon(<Radar />), shortcut: '4' },
      ],
    },
    {
      title: 'Trading',
      items: [
        { id: 'trade', label: 'Trade', icon: icon(<Swords />), shortcut: '5' },
        { id: 'orders-link', label: 'Orders', icon: icon(<CalendarClock />), badge: openOrders },
        { id: 'positions-link', label: 'Positions', icon: icon(<Briefcase />), badge: positions.length },
        { id: 'portfolio', label: 'Portfolio', icon: icon(<Wallet />), shortcut: '6' },
      ],
    },
    {
      title: 'Research',
      items: [
        { id: 'strategies', label: 'Strategies', icon: icon(<SlidersHorizontal />), shortcut: '7' },
        { id: 'backtest', label: 'Backtest', icon: icon(<FlaskConical />), shortcut: '8' },
      ],
    },
    {
      title: 'Intel',
      items: [
        { id: 'intel', label: 'Intelligence', icon: icon(<Newspaper />), shortcut: '9' },
        { id: 'ai', label: 'AI Assistant', icon: icon(<Bot />), shortcut: '0' },
      ],
    },
  ];

  const handle = (id: NavItem['id']): void => {
    if (id === 'orders-link') { setView('trade'); setBottomTab('orders'); return; }
    if (id === 'positions-link') { setView('trade'); setBottomTab('positions'); return; }
    setView(id as ViewId);
  };

  const isActive = (id: NavItem['id']): boolean => {
    if (id === 'orders-link' || id === 'positions-link') return false;
    return view === id;
  };

  return (
    <nav
      className={cx(
        'shrink-0 border-r border-line bg-panel flex flex-col py-1.5 overflow-y-auto overflow-x-hidden select-none transition-all',
        collapsed ? 'w-[52px]' : 'w-[172px]',
      )}
    >
      <div className="flex-1 space-y-3">
        {groups.map((g) => (
          <div key={g.title}>
            {!collapsed && (
              <div className="px-3 pb-1 text-[9px] font-bold uppercase tracking-[0.14em] text-text3">{g.title}</div>
            )}
            <div className="space-y-px px-1.5">
              {g.items.map((it) => (
                <button
                  key={it.id}
                  onClick={() => handle(it.id)}
                  title={collapsed ? `${it.label}${it.shortcut ? ` (Alt+${it.shortcut})` : ''}` : it.shortcut ? `Alt+${it.shortcut}` : it.label}
                  className={cx(
                    'w-full flex items-center gap-2.5 rounded-md text-[12px] font-medium transition-colors relative',
                    collapsed ? 'h-[34px] justify-center px-0' : 'h-[30px] px-2.5',
                    isActive(it.id)
                      ? 'bg-accentdim text-text1 shadow-[inset_2px_0_0_var(--color-accent)]'
                      : 'text-text2 hover:bg-hover hover:text-text1',
                  )}
                >
                  <span className={cx('shrink-0', isActive(it.id) ? 'text-accent' : 'text-text3')}>{it.icon}</span>
                  {!collapsed && <span className="flex-1 text-left truncate">{it.label}</span>}
                  {!collapsed && it.shortcut && (
                    <span className="num text-[9px] text-text3 opacity-70">⌥{it.shortcut}</span>
                  )}
                  {it.badge !== undefined && it.badge > 0 && (
                    <span className={cx(
                      'num text-[9px] font-bold px-1.5 h-[15px] rounded-full flex items-center',
                      'bg-accent text-white',
                      collapsed && 'absolute top-0.5 right-0.5',
                    )}>
                      {it.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* footer */}
      <div className="pt-2 mt-2 border-t border-line space-y-px px-1.5">
        {!collapsed ? (
          <>
            <button
              onClick={() => setView('settings')}
              className={cx('w-full flex items-center gap-2.5 h-[30px] px-2.5 rounded-md text-[12px] font-medium', view === 'settings' ? 'bg-accentdim text-text1' : 'text-text2 hover:bg-hover hover:text-text1')}
            >
              <Settings size={15} className="text-text3" /> Settings
            </button>
            <div className="px-2.5 pt-1.5 pb-0.5 flex items-center gap-1.5 text-text3">
              <span className="pulse-dot live" />
              <span className="num text-[9.5px]">FEED · v1.0 paper</span>
            </div>
          </>
        ) : (
          <button onClick={() => setView('settings')} className="w-full h-[34px] flex items-center justify-center text-text3 hover:text-text1" title="Settings">
            <Settings size={15} />
          </button>
        )}
        <button
          onClick={toggleLeft}
          className="w-full flex items-center justify-center h-[26px] text-text3 hover:text-text1 hover:bg-hover rounded-md"
          title={collapsed ? 'Expand navigation' : 'Collapse navigation'}
        >
          {collapsed ? <ChevronsRight size={14} /> : <ChevronsLeft size={14} />}
        </button>
      </div>

    </nav>
  );
}
