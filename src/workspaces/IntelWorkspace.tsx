import React, { useMemo, useState } from 'react';
import { BrainCircuit, Newspaper } from 'lucide-react';
import { useMarketStore } from '../store/useMarketStore';
import { useWorkspaceStore } from '../store/useWorkspaceStore';
import { getCalendar, getNews, marketBrief } from '../services/newsService';
import { fmtDate, fmtTimeShort, timeAgo } from '../lib/format';
import { Panel } from '../components/primitives/Panel';
import { SplitPane } from '../components/primitives/SplitPane';
import { BreadthPanel, MoversPanel, SectorBars } from '../components/market/MarketWidgets';
import { Delta } from '../components/primitives/Metric';
import { cx } from '../lib/utils';

export function IntelWorkspace(): React.ReactElement {
  const tick = useMarketStore((s) => s.tick);
  const setSymbol = useWorkspaceStore((s) => s.setSymbol);
  const setView = useWorkspaceStore((s) => s.setView);
  const [sentFilter, setSentFilter] = useState<'all' | 'bullish' | 'bearish' | 'neutral'>('all');
  const [impactFilter, setImpactFilter] = useState<'all' | 'high' | 'medium'>('all');

  const news = useMemo(() => getNews(undefined, 80), [Math.floor(tick / 30)]); // eslint-disable-line react-hooks/exhaustive-deps
  const filtered = news.filter((n) =>
    (sentFilter === 'all' || n.sentiment === sentFilter) &&
    (impactFilter === 'all' || n.impact === impactFilter || (impactFilter === 'medium' && n.impact === 'high')),
  );
  const counts = useMemo(() => ({
    bullish: news.filter((n) => n.sentiment === 'bullish').length,
    bearish: news.filter((n) => n.sentiment === 'bearish').length,
    neutral: news.filter((n) => n.sentiment === 'neutral').length,
  }), [news]);
  const brief = useMemo(() => marketBrief(), [tick]); // eslint-disable-line react-hooks/exhaustive-deps
  const cal = useMemo(() => getCalendar(), []);

  const total = Math.max(1, counts.bullish + counts.bearish + counts.neutral);
  const score = ((counts.bullish - counts.bearish) / total) * 100;

  return (
    <div className="flex-1 min-h-0 flex p-2 gap-2 overflow-hidden">
      <SplitPane
        storageKey="intel-left"
        defaultSize={460} min={340} max={700}
        left={
          <div className="flex-1 min-h-0 flex pr-2">
            <Panel
              className="flex-1 min-h-0"
              title="Terminal Wire"
              subtitle={`${filtered.length} stories`}
              actions={
                <>
                  <div className="seg">
                    {(['all', 'bullish', 'bearish', 'neutral'] as const).map((s) => (
                      <button key={s} className={cx(sentFilter === s && 'active')} onClick={() => setSentFilter(s)}>
                        {s === 'all' ? 'All' : s.slice(0, 4)}
                      </button>
                    ))}
                  </div>
                  <div className="seg">
                    {(['all', 'high', 'medium'] as const).map((s) => (
                      <button key={s} className={cx(impactFilter === s && 'active')} onClick={() => setImpactFilter(s)}>
                        {s === 'all' ? 'Any' : s.slice(0, 4)}
                      </button>
                    ))}
                  </div>
                </>
              }
              bodyClassName="!overflow-auto"
            >
              <div className="divide-y divide-line/60">
                {filtered.map((n) => (
                  <div key={n.id} className="px-2.5 py-2 hover:bg-hover cursor-pointer" onClick={() => { setSymbol(n.symbols[0]); }}>
                    <div className="flex items-center gap-1.5">
                      <span className="num text-[10px] text-text3">{timeAgo(n.time)}</span>
                      <span className={cx('badge !h-[14px]', n.sentiment === 'bullish' ? 'badge-up' : n.sentiment === 'bearish' ? 'badge-down' : 'badge-mute')}>{n.sentiment}</span>
                      {n.impact === 'high' && <span className="badge badge-warn !h-[14px]">high impact</span>}
                      <span className="flex-1" />
                      <span className="text-[9.5px] text-text3">{n.source}</span>
                    </div>
                    <div className="text-[12px] font-semibold leading-snug mt-0.5">{n.headline}</div>
                    <div className="text-[10.5px] text-text3 leading-snug mt-0.5">{n.summary}</div>
                    <div className="flex gap-1.5 mt-1">
                      {n.symbols.map((s) => (
                        <button key={s} className="num text-[10px] font-bold text-accent hover:underline" onClick={(e) => { e.stopPropagation(); setSymbol(s); setView('chart'); }}>{s}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        }
        right={
          <SplitPane
            storageKey="intel-right"
            defaultSize={340} min={280} max={520}
            flip
            left={
              <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-auto pl-2">
                <BreadthPanel />
                <SectorBars />
                <MoversPanel mode="volume" count={6} title="Volume Leaders" />
              </div>
            }
            right={
              <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-auto">
                {/* desk brief */}
                <Panel title="Desk Brief" subtitle="auto-generated" actions={<BrainCircuit size={12} className="text-violet" />} bodyClassName="p-2.5">
                  <p className="text-[11.5px] leading-relaxed">{brief.headline}</p>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="rounded bg-base border border-line p-1.5">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-text3">Breadth</div>
                      <div className="num text-[15px] font-bold">{brief.breadth.toFixed(0)}%</div>
                    </div>
                    <div className="rounded bg-base border border-line p-1.5">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-text3">Vol regime</div>
                      <div className="text-[13px] font-bold capitalize pt-0.5">{brief.volRegime}</div>
                    </div>
                    <div className="rounded bg-base border border-line p-1.5">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-text3">News score</div>
                      <Delta value={score} size="md" />
                    </div>
                  </div>
                </Panel>
                {/* sentiment */}
                <Panel title="News Sentiment" subtitle={`${news.length} stories`} bodyClassName="p-2.5">
                  <div className="h-[8px] rounded bg-panel3 overflow-hidden flex">
                    <div className="bg-up" style={{ width: `${(counts.bullish / total) * 100}%` }} />
                    <div className="bg-text3" style={{ width: `${(counts.neutral / total) * 100}%` }} />
                    <div className="bg-down flex-1" />
                  </div>
                  <div className="flex justify-between mt-1.5 text-[10.5px]">
                    <span className="text-up font-semibold">▲ {counts.bullish} bullish</span>
                    <span className="text-text3">{counts.neutral} neutral</span>
                    <span className="text-down font-semibold">▼ {counts.bearish} bearish</span>
                  </div>
                </Panel>
                {/* calendar */}
                <Panel title="Economic Calendar" subtitle="all events" actions={<Newspaper size={12} className="text-text3" />}>
                  <div className="divide-y divide-line/60">
                    {cal.map((e) => {
                      const past = e.time < Date.now();
                      return (
                        <div key={e.id} className={cx('px-2.5 py-[7px] flex items-center gap-2', past && 'opacity-55')}>
                          <span className={cx('w-[7px] h-[7px] rounded-full shrink-0', e.impact === 'high' ? 'bg-down' : e.impact === 'medium' ? 'bg-warn' : 'bg-text3')} />
                          <span className="min-w-0 flex-1">
                            <span className="block text-[11.5px] font-semibold leading-tight">{e.title}</span>
                            <span className="block text-[10px] text-text3 leading-tight mt-0.5">
                              {fmtDate(e.time)} · {fmtTimeShort(e.time)} UTC
                              {e.actual ? ` · A ${e.actual}` : ''}{e.forecast ? ` · F ${e.forecast}` : ''}{e.previous ? ` · P ${e.previous}` : ''}
                            </span>
                          </span>
                          <span className="badge badge-mute shrink-0">{e.country}</span>
                          {past && e.actual && <span className="badge badge-mute shrink-0">released</span>}
                        </div>
                      );
                    })}
                  </div>
                </Panel>
              </div>
            }
          />
        }
      />
    </div>
  );
}
