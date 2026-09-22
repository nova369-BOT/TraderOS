// TerminalMultiGrid - clean professional unique interface
// Consolidates to EdgeDepth-only panels for MARKET — no irrelevant legacy duplicates
// 10 widgets: chart/dom/tape/depth/edgedepth/footprint/vpvr/tpo/liquidations/watchlist + indicators tab

import React, { useCallback, useEffect, useMemo, useRef, useState, lazy, Suspense } from 'react';
import ProChart from '@/components/chart/ProChart';
import DepthHeatPane from '@/components/chart/depth/DepthHeatPane';
const EdgeDepthHeatmapPane = lazy(() => import('@/components/chart/depth/EdgeDepthHeatmapPane'));
const EdgeDepthDOMPanel = lazy(() => import('@/components/chart/edgedepth/EdgeDepthDOMPanel'));
const EdgeDepthTapePanel = lazy(() => import('@/components/chart/edgedepth/EdgeDepthTapePanel'));
const EdgeDepthFootprintPanel = lazy(() => import('@/components/chart/edgedepth/EdgeDepthFootprintPanel'));
const EdgeDepthVolumeProfilePanel = lazy(() => import('@/components/chart/edgedepth/EdgeDepthVolumeProfilePanel'));
const EdgeDepthTPOPanel = lazy(() => import('@/components/chart/edgedepth/EdgeDepthTPOPanel'));
const EdgeDepthLiquidationPanel = lazy(() => import('@/components/chart/edgedepth/EdgeDepthLiquidationPanel'));
const EdgeDepthWatchlist = lazy(() => import('@/components/chart/edgedepth/EdgeDepthWatchlist'));
const EdgeDepthIndicators = lazy(() => import('@/components/chart/edgedepth/EdgeDepthIndicators'));
const Fallback = () => <div className="h-full w-full flex items-center justify-center text-[11px] text-[var(--dim)]">Loading…</div>;

import { DEFAULT_INDICATOR_CONFIG } from '@/components/chart/IndicatorSettings';
import { getDefaultColors, type Candle } from '@/components/chart/core/types';
import { type LayoutType, type SyncSettings } from '@/components/chart/MultiTimeframeLayoutSelector';
import { fetchLocalCandles } from '@/lib/localEngine';
import { layoutStore, useLayoutState, type PanelKind } from '@/lib/layoutStore';
import { useChartSettings } from '@/contexts/ChartSettingsContext';

const LAYOUTS: Record<LayoutType, { count: number; cols: number; rows: number }> = {
  '1x1': { count: 1, cols: 1, rows: 1 },
  '2x1': { count: 2, cols: 2, rows: 1 },
  '1x2': { count: 2, cols: 1, rows: 2 },
  '2x2': { count: 4, cols: 2, rows: 2 },
  '3x1': { count: 3, cols: 3, rows: 1 },
  '1x3': { count: 3, cols: 1, rows: 3 },
  '4x1': { count: 4, cols: 4, rows: 1 },
  '3x2': { count: 6, cols: 3, rows: 2 },
  '2x3': { count: 6, cols: 2, rows: 3 },
  '4x2': { count: 8, cols: 4, rows: 2 },
};

const STAGGER = ['1h', '4h', '1d', '15m', '5m', '1w', '30m', '1m'];

function Panel({
  symbol, sourceProvider, timeframe, colors, active, onActivate, kind, onToggleKind,
  syncedCrosshairTime, onCrosshairMove, syncedViewportTime, onViewportTimeChange,
  quote,
}: {
  symbol: string; sourceProvider?: string; timeframe: string; colors: any; active: boolean;
  onActivate: () => void;
  kind: PanelKind;
  onToggleKind: () => void;
  syncedCrosshairTime: number | null;
  onCrosshairMove: (t: number | null) => void;
  syncedViewportTime: number | null;
  onViewportTimeChange: (t: number | null) => void;
  quote?: { bid: number; ask: number } | null;
}) {
  const [candles, setCandles] = useState<Candle[]>([]);
  const chartSettings = useChartSettings();
  useEffect(() => {
    if (kind !== 'chart') return;
    let cancelled = false;
    setCandles([]);
    const load = async () => {
      try {
        const rows = await fetchLocalCandles('multi_panel', { symbol, timeframe, limit: 500 });
        if (!cancelled && rows?.length) {
          setCandles(rows.map((r: any) => ({
            time: Date.parse(r.timestamp),
            open: r.open, high: r.high, low: r.low, close: r.close,
            volume: r.volume,
          })));
        }
      } catch {}
    };
    load();
    const t = setInterval(load, 10_000);
    return () => { cancelled = true; clearInterval(t); };
  }, [symbol, timeframe, kind]);

  const renderContent = () => {
    const k = kind as string;
    if (k === 'depth') {
      return <DepthHeatPane symbol={symbol} sourceProvider={sourceProvider} colors={colors} syncedCrosshairTime={syncedCrosshairTime} onCrosshairMove={onCrosshairMove} onToggleKind={onToggleKind} />;
    }
    if (k === 'edgedepth') {
      return <Suspense fallback={<Fallback />}><EdgeDepthHeatmapPane symbol={symbol} provider={sourceProvider || 'binance'} onToggleKind={onToggleKind} /></Suspense>;
    }
    if (['dom','tape','footprint','vpvr','tpo','liquidations','watchlist','indicators','ed_liquidations','ed_vpvr','ed_footprint','ed_tpo'].includes(k)) {
      return (
        <Suspense fallback={<Fallback />}>
          {(k === 'dom') && <EdgeDepthDOMPanel symbol={symbol} provider={sourceProvider || 'binance'} />}
          {(k === 'tape') && <EdgeDepthTapePanel symbol={symbol} provider={sourceProvider || 'binance'} />}
          {(k === 'footprint' || k === 'ed_footprint') && <EdgeDepthFootprintPanel symbol={symbol} provider={sourceProvider || 'binance'} />}
          {(k === 'vpvr' || k === 'ed_vpvr') && <EdgeDepthVolumeProfilePanel symbol={symbol} provider={sourceProvider || 'binance'} />}
          {(k === 'tpo' || k === 'ed_tpo') && <EdgeDepthTPOPanel symbol={symbol} provider={sourceProvider || 'binance'} />}
          {(k === 'liquidations' || k === 'ed_liquidations') && <EdgeDepthLiquidationPanel symbol={symbol} provider={sourceProvider || 'binance'} />}
          {(k === 'watchlist') && <EdgeDepthWatchlist activeSymbol={symbol} onSelectSymbol={(s) => { try { (window as any).__lseShell?.selectSymbol?.(s); } catch {} }} />}
          {(k === 'indicators') && <EdgeDepthIndicators symbol={symbol} provider={sourceProvider || 'binance'} />}
        </Suspense>
      );
    }
    return candles.length > 0 ? (
      <ProChart
        candles={candles}
        symbol={symbol}
        timeframe={timeframe}
        chartType="candlestick"
        livePrice={candles[candles.length - 1]?.close ?? null}
        rightOffset={6}
        colors={colors}
        indicators={DEFAULT_INDICATOR_CONFIG}
        timezone={chartSettings?.data?.timezone || 'local'}
        syncedCrosshairTime={syncedCrosshairTime ?? undefined}
        onCrosshairMove={onCrosshairMove}
        syncedViewportTime={syncedViewportTime ?? undefined}
        onViewportTimeChange={onViewportTimeChange}
        showBidAskSpread={!!quote}
        brokerBid={quote?.bid ?? null}
        brokerAsk={quote?.ask ?? null}
      />
    ) : null;
  };

  return (
    <div
      onMouseDown={onActivate}
      style={{
        position: 'relative', minWidth: 0, minHeight: 0, overflow: 'hidden',
        border: active ? '1px solid var(--accent-bar, #888)' : '1px solid var(--edge, #2a2e39)',
      }}
    >
      {renderContent()}
    </div>
  );
}

export default function TerminalMultiGrid({
  layout, syncSettings, pair, timeframe, colors, quote, sourceProvider,
}: {
  layout: LayoutType;
  syncSettings: SyncSettings;
  pair: string;
  timeframe: string;
  colors: any;
  quote?: { bid: number; ask: number } | null;
  sourceProvider?: string;
}) {
  const cfg = LAYOUTS[layout] || LAYOUTS['2x2'];
  const { activePanel, panelSymbols, panelKinds } = useLayoutState();
  const active = Math.min(activePanel, cfg.count - 1);
  const [panelTfs, setPanelTfs] = useState<string[]>([]);
  const [crossT, setCrossT] = useState<number | null>(null);
  const [viewT, setViewT] = useState<number | null>(null);
  const base = useMemo(() => colors || getDefaultColors(), [colors]);

  useEffect(() => {
    setPanelTfs((prev) => {
      const next = [...prev];
      for (let i = next.length; i < cfg.count; i++) {
        next.push(i === 0 ? timeframe : STAGGER[i % STAGGER.length]);
      }
      return next.slice(0, cfg.count);
    });
  }, [cfg.count, timeframe]);

  const onCross = useCallback((t: number | null) => { if (syncSettings.syncCrosshair) setCrossT(t); }, [syncSettings.syncCrosshair]);
  const onView = useCallback((t: number | null) => { if (syncSettings.syncTime) setViewT(t); }, [syncSettings.syncTime]);

  return (
    <div style={{
      display: 'grid', width: '100%', height: '100%', gap: 2,
      gridTemplateColumns: `repeat(${cfg.cols}, 1fr)`,
      gridTemplateRows: `repeat(${cfg.rows}, 1fr)`,
    }}>
      {Array.from({ length: cfg.count }, (_, i) => (
        <Panel
          key={i}
          symbol={syncSettings.syncSymbol ? pair : (panelSymbols[i] || pair)}
          sourceProvider={sourceProvider}
          timeframe={syncSettings.syncInterval ? timeframe : (panelTfs[i] || timeframe)}
          colors={base}
          active={i === active}
          onActivate={() => layoutStore.setActivePanel(i)}
          kind={panelKinds[i] || 'chart'}
          onToggleKind={() => {
            const cur = panelKinds[i] || 'chart';
            const order: PanelKind[] = ['chart','edgedepth','depth','dom','tape','footprint','vpvr','tpo','liquidations','watchlist','indicators'] as PanelKind[];
            const idx = order.indexOf(cur as PanelKind);
            const next = order[(idx + 1) % order.length];
            layoutStore.setPanelKind(i, next);
          }}
          syncedCrosshairTime={syncSettings.syncCrosshair ? crossT : null}
          onCrosshairMove={onCross}
          syncedViewportTime={syncSettings.syncTime ? viewT : null}
          onViewportTimeChange={onView}
          quote={quote}
        />
      ))}
    </div>
  );
}
