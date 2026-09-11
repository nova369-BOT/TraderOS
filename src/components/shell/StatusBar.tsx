import React from 'react';
import { ChevronUp, PanelBottom, PanelRight } from 'lucide-react';
import { useWorkspaceStore } from '../../store/useWorkspaceStore';
import { useMarketStore } from '../../store/useMarketStore';
import { useTradingStore } from '../../store/useTradingStore';
import { fmtSignedMoney } from '../../lib/format';
import { cx } from '../../lib/utils';

export function StatusBar(): React.ReactElement {
  const symbol = useWorkspaceStore((s) => s.symbol);
  const timeframe = useWorkspaceStore((s) => s.timeframe);
  const bottomOpen = useWorkspaceStore((s) => s.bottomOpen);
  const setBottomOpen = useWorkspaceStore((s) => s.setBottomOpen);
  const rightOpen = useWorkspaceStore((s) => s.rightOpen);
  const setRightOpen = useWorkspaceStore((s) => s.setRightOpen);
  const latency = useMarketStore((s) => s.latency);
  const tick = useMarketStore((s) => s.tick);
  const dayPnl = useTradingStore((s) => s.dayPnl);
  const positions = useTradingStore((s) => s.positions);

  return (
    <footer className="h-[24px] shrink-0 flex items-center gap-3 px-2.5 border-t border-line bg-panel text-[10px] text-text3 select-none overflow-x-auto overflow-y-hidden whitespace-nowrap [&>*]:shrink-0">
      <span className="flex items-center gap-1.5">
        <span className="pulse-dot live" style={{ width: 6, height: 6 }} />
        <span className="font-semibold text-text2">PAPER · SIM FEED</span>
      </span>
      <span className="num">tick #{tick}</span>
      <span className="num">{latency}ms</span>
      <span className="w-px h-3 bg-line" />
      <span className="num font-semibold text-text2">{symbol} · {timeframe}</span>
      <span className="w-px h-3 bg-line" />
      <span>Pos <span className="num text-text2">{positions.length}</span></span>
      <span>Day <span className={cx('num font-semibold', dayPnl >= 0 ? 'text-up' : 'text-down')}>{fmtSignedMoney(dayPnl, 0)}</span></span>
      <span className="flex-1" />
      <span className="hidden md:flex items-center gap-2">
        <span><span className="kbd">⌘K</span> commands</span>
        <span><span className="kbd">⌥1–0</span> views</span>
      </span>
      <button className={cx('flex items-center gap-1 hover:text-text1', rightOpen && 'text-accent')} onClick={() => setRightOpen(!rightOpen)} title="Toggle context panel">
        <PanelRight size={12} /> Panel
      </button>
      <button className={cx('flex items-center gap-1 hover:text-text1', bottomOpen && 'text-accent')} onClick={() => setBottomOpen(!bottomOpen)} title="Toggle terminal">
        {bottomOpen ? <PanelBottom size={12} /> : <ChevronUp size={12} />} Terminal
      </button>
    </footer>
  );
}
