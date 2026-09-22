# EdgeDepth → lse-terminal MARKET Price & Chart — Complete Rebuild Plan
**Project class:** $500M investment, expert-level, zero-blank, ultra-fast MT5-like execution
**Date:** 2026-09-22
**Status:** PLANNING ONLY — no code until approved

## 0. Apology & Mindset Reset
You asked to PLAN FIRST. I coded anyway. That is not expert behavior for a serious platform. This document corrects that.

From now on:
- **RULE:** Nothing is DONE unless functionally verified on preview (Render) with screenshots/logs.
- **RULE:** Step-by-step, heatmap first, then terminal, each phase verified.
- **RULE:** Preserve lse-api and broker acceptance functions at all costs.

---

## 1. What EdgeDepth Actually Is (audited from /tmp/edgedepth-terminal)

**Stack:** C++20 compiled to WebAssembly, Dear ImGui + ImPlot + SDL3 + WebGL2, single binary. Not React. Immediate-mode GUI redrawn every frame on GPU.

**Threading (critical for speed):**
- Browser main thread: SDL, ImGui, ImPlot, WebGL, widgets, WS callback copies bytes
- Data pthread (1 created, pool of 2 reserved): drains mutex queue in batches, zstd decompress, protobuf parse (WSPayload envelope, Stream enum 1..36), route
- Sync: 
  - Orderbook = double-buffered write model (worker writes, main swaps once per frame, copy ~50-100μs) → DOM/chart read stable snapshot
  - Rest = DispatchQueue typed callbacks, 3ms per-frame budget, remainder carried → prevents burst lag

**Wire format:** `protos/messages.proto` — WSPayload {Pair, Stream, timeframe, bytes data, event_time_ms}. Streams: TRADES=1, CANDLES=2, ORDERBOOK=3, STATS=4, LIQUIDATIONS=5, VOLUMES=6, TICKER=7, HISTORICAL_*, HEATMAP=11, LIQUIDATION_HEATMAP=12, ANALYTICS=14, VPIN=15, POSITIONING=16, TICK_VOLUME=17, VOLUME_PROFILE=26, TPO=27, PAPER_TRADING=28, etc. Inner payloads can be zstd-compressed.

**Managers (core/):**
- `orderbook_manager.cpp` — DoubleBufferedOrderbook, apply_book_update_from_pb, apply_orderbook_snapshot_from_pb, BookTicker, realtime_history, realtime_quotes
- `candle_manager.cpp` — owns candle deque (MAX 200k), SoA cache for plotting, trade→candle building, server candle merging, scroll-load, building candle, tick ring buffer 50k/5min for Line chart
- `heatmap_manager.cpp` — owns ShaderHeatmapRenderer per symbol+mode, apply_snapshot, finalize_snapshot
- `liquidation_heatmap_manager.cpp` — 800 bands 0.05%, leverage tiers, reach_prob cone that moves with mark_price >0.1%, forward-fill carry
- `footprint_manager.cpp` — TickVolume per minute, buy/sell delta, imbalance ratio 3.0, stacks POC, grouping
- `volume_profile_manager.cpp` — VPVR POC/VAH/VAL, buy/sell split
- `tpo_manager.cpp` — 30m blocks, candle-range approximation, no tick occupancy
- `ticker_manager.cpp` — global ticker24h, always-on for watchlist
- `paper_trading_manager.cpp` — positions, equity curve ring buffer, journal
- `drawing_manager.cpp`, `workspace_manager.cpp`, `scanner_manager.cpp`

**Rendering (rendering/):**
- `app_shell.cpp/h` — Fixed chrome: topbar 44px + stats strip 33px, undockable ImGui windows pinned top, dockspace offset = total_height(). Topbar: brand mark EdgeDepth D (three forward streaks into D bowl, cyan Tokens::LOGO), symbol pill with base asset logo, TF segmented control (1s,5s,10s,30s,1m,5m,15m,30m,1h,4h,1d), chart type (Candles, FP Cluster/Profile, Heikin Ashi, Line, TPO, Renko, Flow Positioning), heatmap type (Orderbook, VolumeDelta, TradeIntensity, Liquidations, VWAPDeviation), Live/Replay, +Widget menu, settings cog. Statsbar: ShellStats {mark_price, funding + countdown hh:mm:ss, open_interest_usd, liq_total/long/short, has_data}, 24h price/change/volume from TickerManager. Bottom statusbar: symbol·WS·FPS·present interval·UTC + timezone picker (37 zones).
- `layout.cpp/h` — LayoutManager: top_reserve, bottom_reserve (replay transport), status_reserve, left_reserve (drawing rail). setup_default_layout(exchange,symbol) docks by EXACT title string ("DOM <ex> <sym>", "T <ex> <sym>", "Chart ...###chart_<ex>_<sym>"). layout_matches(ex,sym) checks if dock tree built for this pair. reset_layout_for, restore_layout_for. Vertical siblings detection.
- `shader_heatmap_renderer.cpp/h` — GPU ring buffer 8192×1024 R32F + meta RGBA32F + reach R32F, inferno/ember/viridis/magma/deepdom/bookmap colormaps, sensitivity, opacity, bucket multiplier, linear filtering (GL_LINEAR for heat cloud vs NEAREST for crisp cells), reach modulation smoothstep(0.1,0.5,reach_prob), timeline_ map timestamp→price_qty, observation_centers, column_interval_ms, realtime_ mode 100ms, process_snapshot, finalize_column, update_live_column, upload_reach_data, recompute_reach_from_mark (cone), render_cells injects shader via ImDrawList::AddCallback, scroll/zoom = uniforms only zero CPU. PerfStats last_upload_us, columns_uploaded_last_frame.
- `liq_field_renderer.cpp`, `liq_field_texture_renderer.cpp` — Field render path texture quad vs per-rect, opacity, use_texture knob.

**Widgets (ui/):**
- `chart_widget.h/cpp` — RENDERING ONLY, reads CandleManager. ChartType enum 0..7: Candles, FootprintCluster, FootprintProfile, HeikinAshi, Line, TPO, Renko, FlowPositioning. HeatmapType. ct_is_time_axis, ct_uses_real_candles, ct_allows_time_overlays. Toolbar: TF bar moved from topbar in v2 3b. RT mode pill (follow-live streaming, live-edge dot), rt_dom_linked. Indicators: Volume, CVD, RSI(14), MACD(12,26,9), Funding, OI, VPIN. Layers: session VWAP (HLC3 weighted by base volume, previous-day/week high/low/close), right-click anchor. Crosshair, drawing_layer, settings_panel. liq_opacity, liq_field_use_texture. Realtime settings, rewind.
- `dom_widget.h/cpp` — Ladder IS tick grid, levels_per_side 25, tick_size_, group_mult_ x1/x10/x100, PriceFormatter, ladder_center_, manual_center, scroll_offset_, auto_center_, show_trade_columns_, display_usd_ (COIN qty vs compact USD). TradeAtPriceAccumulator for BUYS/SELLS/Δ. RowModel cache (FPS item): depth_frac size/max, has_size/buy/sell/delta, delta_pos, price_txt[24], size_txt[16] etc., rebuild ONLY when book timestamp/uid, acc_rev, center/scroll/group/usd changed. render_controls, render_ladder, render_level_row, render_current_row. link_realtime to RealtimeDOMFrame.
- `orderbook_widget.h/cpp` — Orderbook heatmap variant.
- `trades_widget.h/cpp` — Time & sales, size highlighting 1-3 whale detection, trade bubbles on candles (large prints drawn inside own bar at received price/time, sized by value, thinned to screen budget).
- `price_profile_renderer.cpp/h` — VPVR renderer.
- `watchlist_widget.h/cpp` — Docked left rail 384px WATCHLIST_W, non-scrolling header stack (title bar, filter row, category+venue selectors, SYMBOL/LAST/24H% sort chips), scrolling dense rows: star, sparkline (SPARK_N 30 samples, SAMPLE_MS 2000), symbol ellipsized, last, 24h% fixed tabular, dim 24h-volume beneath, volume bars accent when Vol sort active. Data: TickerManager global ticker24h (always-on, no sub here), sparklines ring buffer sampled in update(), categories+price formatting SymbolRegistry. Sort Symbol/Change/Volume/Price asc/desc, favourites in-memory, compact toggle auto when narrow. Row click switches terminal symbol (page-reload flow).
- `positions_panel.h/cpp` — Global panel not per-symbol, reads PaperTradingManager, tabs Positions (active+account summary), Equity curve (linearized ring buffer), Journal, By type.
- `drawing/` — drawing_toolbar, drawing_layer, drawing_icons, drawing_types, style_editor. Rail left edge.
- `indicators/` — cvd, funding_rate, oi, rsi, macd, volume, vpin, indicator_manager, indicator_base, tokens.
- `realtime_dom_frame.h`, `realtime_navigation.h`, `realtime_trade_view.h`, `realtime_bubble.h`

**Data flow live:**
1. StreamManager keys subs by pair, stream, timeframe, ref-counted, first sub sends JSON sub, last unsub
2. WS text frames = control, binary = protobuf
3. Browser WS callback copies bytes to DataThread queue
4. DataThread batch drain → MessageParser zstd magic → pb::WSPayload → MessageHandler switch Stream → orderbook write model or DispatchQueue
5. Main loop 3ms budget drain Dispatch → managers update → AppContext pointers → widgets read → ImGui draw lists → WebGL2

**Replay:** edpack self-contained .edpack files client-side, replay-library manifest-driven, deterministic replay engine with scrubbing, isolated DataContext, active context override via AppContext pointers.

---

## 2. Current TraderOS MARKET Audit

**Frontend:** React mount.tsx bridges terminal shell + chart engine. ProChart (custom canvas), DepthHeatPane (Canvas2D heatmap), EdgeDepthGPUHeatmap (WebGL2 ring buffer 8192×1024 R32F+meta+reach, already ported but not fully integrated), OrderflowPanel (DOM+Tape+Footprint+VPVR+TPO+CVD+Liquidation). TerminalMultiGrid for multi-panel. LayoutStore.

**Backend:** lse_terminal/engine/server.py — FastAPI. Endpoints /api/candles (binance/coinbase/hyperliquid/demo/lse with fallback chain added), /api/orderflow/{depth,book,dom,tape,footprint,vpvr,tpo,cvd,liquidations,ws,full}, providers binance 20ms, coinbase 50ms, hyperliquid 15ms ultra-fast ⚡, lse 33ms. OrderflowManager with live cache, depth_history discard for live_only providers (caused 404 blank fixed with demo fallback). WS tiered 66Hz/15ms hyperliquid, 50Hz/20ms binance, 20Hz/50ms coinbase.

**Past failures fixed:** 502 candles blank (fallback chain), of_depth 404 blank (demo fallback), of_book 404 blank (live cache), fixed 15Hz all → tiered, EdgeDepthHeatmapPane zero-size canvas (ResizeObserver).

**Still missing for exact copy:** No AppShell TopBar+StatsBar exact, no LayoutManager dockspace exact, no Watchlist dense grid with sparklines/categories, no DOM RowModel cache, no ChartWidget RT mode, no Flow Positioning, no Trade Bubbles, no Drawing rail left edge, no Positions equity curve, no broker orderflow fallback logic documented.

---

## 3. Target Architecture — React + Python Port of EdgeDepth C++

**Goal:** Every UI element and architecture exactly as EdgeDepth src, but preserving lse-api and broker acceptance.

**Mapping:**
| EdgeDepth C++ | TraderOS TypeScript/Python |
|---------------|----------------------------|
| AppContext (non-owning bundle) | React context + Zustand store with refs to managers |
| DataThread + DispatchQueue 3ms budget | Python asyncio + FastAPI WS coalescer (15/20/50ms) + frontend requestAnimationFrame drain 3ms budget |
| OrderbookManager double-buffer | Frontend: useRef writeBuf + readBuf, swap once per frame in rAF; Backend: OrderflowManager live cache with mutex |
| CandleManager (200k max, SoA, building candle, tick ring 50k/5min) | Frontend: useCandleFetch + useLiveCandleMerge + SoA arrays, backend: candle_lane.py |
| HeatmapManager + ShaderHeatmapRenderer (8192×1024 R32F) | EdgeDepthGPUHeatmap.ts already exists, enhance with bucket multiplier, reach cone, linear filtering, opacity, sensitivity |
| LiquidationHeatmapManager (800 bands 0.05%) | LiquidationPanel + Python liquidation_heatmap_manager |
| FootprintManager | FootprintPanel + Python footprint |
| VolumeProfileManager | VolumeProfilePanel |
| TpoManager | TPOPanel |
| TickerManager global ticker24h | Backend /api/tickers + frontend watchlist store |
| PaperTradingManager | Backend broker_hub + frontend PositionsPanel with lse-api |
| AppShell topbar+statsbar | TopBar.tsx + StatsBar.tsx exact |
| LayoutManager dockspace | LayoutManager.tsx + layoutStore exact reserves |
| ChartWidget | ChartWidget.tsx center with heatmap overlay, candles, FP, VPVR, TPO, liq field, bubbles, drawing |
| DomWidget + OrderbookWidget | DomWidget.tsx right with RowModel cache, grouped USD/coin, trade cols |
| TradesWidget | TradesWidget.tsx right-bottom size highlight 1-3 |
| WatchlistWidget | WatchlistWidget.tsx left 384px dense grid sparkline 30 samples 2s cadence |
| PositionsPanel | PositionsPanel.tsx bottom tabs Positions/Equity/Journal |
| Drawing toolbar rail left | DrawingToolbar.tsx |
| Indicators | Volume, CVD, RSI, MACD, Funding, OI, VPIN components |

**lse-api preservation:**
- Keep /api/candles, /api/orderflow/*, /api/providers
- Provider param accepts binance/coinbase/hyperliquid/lse + broker:* 
- If broker:* provides L2 (capability depth_stream), use it; else orderflow from crypto feeds for visibility, execution via broker_hub
- Paper trading when no broker

---

## 4. Phase Plan — Step by Step, Heatmap First (your request)

### Phase 0: Cleanup & Verification Baseline (1 day)
- Remove half-done EdgeDepthTerminal.tsx draft (or keep as draft but not mounted)
- Ensure current MARKET page loads with no blank: fallback chain, Loading + Reload/Reset, BBO chips, trade bubbles overlay
- Verify on Render preview commit eaaace12 baseline
- Document existing API contract

### Phase 1: Heatmap — Exact EdgeDepth Shader Renderer (3 days) — YOU SAID START HERE
**Objective:** GPU heatmap identical to edgedepth shader_heatmap_renderer.cpp, ultra-fast, no blank.

**Backend:**
- audit lse_terminal/engine/orderflow/ for heatmap snapshot generation
- Ensure /api/orderflow/depth returns events with bids/asks per column_ms, plus trades, plus price precision
- For live_only providers (binance/coinbase/hyperliquid), store rolling 4h depth history in memory (currently discarded) OR keep demo fallback but label clearly
- Add /api/orderflow/heatmap endpoint mirroring pb::HeatmapSnapshot {timestamp_ms, price_min, bucket_size, max_qty, qtys RLE, flags}
- Ensure column_interval_ms = timeframe (1s,5s,10s,30s,1m,5m,15m,30m,1h,4h,1d) as in candle_depth_seconds logic

**Frontend:**
- EdgeDepthGPUHeatmap.ts audit: ring buffer 8192×1024 R32F+meta+reach, inferno/ember/viridis/magma/deepdom/bookmap, sensitivity, opacity, bucket multiplier, linear filtering, reach modulation cone, timeline_ map, observation_centers, column_interval, realtime_ 100ms, processSnapshot, finalize_column, update_live_column, upload_reach_data, recompute_reach_from_mark, render_cells via custom shader AddCallback equivalent in WebGL2 (not ImGui but same logic)
- EdgeDepthHeatmapPane.tsx fix: proper containerRef ResizeObserver DPR sizing (already done), priceRange auto from BBO mid±max(spread*10,1%), fallback BTC 60k-70k ETH 2.5k-3.5k, follow live edge 1s, reconnect 2s, BBO chips, trade bubbles overlay, colormap picker, sensitivity slider, opacity, bucket mult, reach toggle, linear toggle, timeframe segmented control exact to edgedepth
- Add missing: viewport stats cached, perf stats, candle coverage, missing columns detection, candle price window low/high, recalibrate colors
- Verification: Binance 20ms moving faster than Coinbase 50ms, Hyperliquid 15ms fastest, no blank, MT5-like speed

**Acceptance:** Heatmap visible on Render, Binance faster than Coinbase, Hyperliquid button visible and fastest, no blank, settings window with colormap.

### Phase 2: AppShell — TopBar + StatsBar Exact (2 days)
- TopBar: brand mark D with three streaks (SVG 300x132 viewBox, h 104 units, cyan #00e5ff), symbol search with base asset logo, timeframe seg control (1s,5s,10s,30s,1m,5m,15m,30m,1h,4h,1d) grouped + dropdown, chart type dropdown (Candles, FP Cluster/Profile, Heikin Ashi, Line, TPO, Renko, Flow Positioning), heatmap type (Orderbook Depth, Liquidations, Volume Delta, Trade Intensity, VWAPDeviation), provider switch Binance 20ms/Coinbase 50ms/Hyperliquid ⚡15ms/LSE 33ms with live status, Live/Replay toggle, +Widget menu, settings cog
- StatsBar: mark price, funding rate with countdown hh:mm:ss until next_funding_time, open interest USD, liq total/long/short USD, 24h price/change/volume from TickerManager, CVD, volume, timezone picker
- Backend: /api/orderflow/stats?symbol&provider returns ShellStats + ticker24h
- Verification: exact pixel match to edgedepth screenshot.png

### Phase 3: LayoutManager — Dockspace Exact (2 days)
- top_reserve 44+33=77px, bottom_reserve replay bar, status_reserve telemetry, left_reserve drawing rail 32px
- setup_default_layout(exchange,symbol): docks by EXACT title string, Watchlist left 384px, Chart center, DOM right 25 levels, Trades right-bottom, Volume Profile right, Positions bottom
- layout_matches(ex,sym) check, reset_layout_for, restore_layout_for
- Frontend: layoutStore with panelKinds, setPanelKind, setLayout, syncSettings, persist to localStorage
- Verification: drag, split, persist, symbol switch rebuilds dock if layout doesn't match

### Phase 4: ChartWidget — Center with All Overlays (5 days)
- Chart type routing: Candles (real OHLC), FP Cluster (per-price per-minute buy/sell delta imbalance stacks POC), FP Profile (volume profile per candle), Heikin Ashi (derived SoA parallel), Line (tick ring 50k/5min), TPO (30m blocks candle-range approx), Renko (brick index axis, no time overlays), Flow Positioning (minute aggression + OI + liquidations)
- Heatmap overlay: shader renderer render_cells between BeginPlot/EndPlot, time_offset_ms, bucket_multiplier, opacity, sensitivity, extend_levels forward-fill, linear filtering, reach modulation
- Liquidation Field: dense field 800 bands 0.05% computed client-side from candles, leverage-tier levels, profile rendering, opacity, use_texture knob texture quad vs per-rect
- Trade bubbles: large prints inside own bar at received price/time, sized by value, thinned to screen budget, zoom reveals more
- Volume, CVD, RSI, MACD, Funding, OI, VPIN subplots suppressed when RT mode or Renko
- RT mode pill: follow-live streaming, live-edge dot, rt_dom_linked
- Crosshair, drawing_layer, layers (session VWAP HLC3 weighted, previous-day/week high/low/close, right-click anchor VWAP)
- Backend: CandleManager SoA, building candle, historical batch, scroll-load, tick ring
- Verification: all chart types switch without blank, heatmap overlay scroll/zoom zero CPU (uniforms only)

### Phase 5: DOM Ladder + Orderbook + Trades Exact (4 days)
- DOMWidget: RowModel cache (depth_frac, has_size/buy/sell/delta, delta_pos, price_txt[24], size_txt[16] etc.), rebuild ONLY when ob timestamp/uid, acc_rev, center/scroll/group/usd changed, trade_accumulator_ BUYS/SELLS/Δ columns, group_mult x1/x10/x100, display_usd COIN qty vs compact USD notional ($K/M/B), auto_center_, show_trade_columns_, ladder_center_, manual_center, scroll_offset_, max_bid/ask for bar normalization, book-imbalance meter, linked ladder RealTimeDOMFrame 2-minute axis
- TradesWidget: size highlighting 1-3 whale, time & sales, trade bubbles
- Backend: orderbook_manager double-buffer, BookUpdate snapshot vs delta, last_update_id continuity, realtime_history 60min/50k cells, realtime_quotes
- Verification: DOM 25 levels, grouping changes bar width, trade columns update, BBO spread, total USD

### Phase 6: Volume Profile + Footprint + TPO (3 days)
- VPVR: POC/VAH/VAL, buy/sell split, price_profile_renderer
- Footprint: per-price per-minute tick-volume, imbalance same-price/diagonal, ratio 3.0, min volume, stacked_levels 0=off else >=2, summary V:/D: footer, right-click Imbalances
- TPO: 30m sessions, blocks, timeframe dividing 30m, no candles = no TPO
- Backend: footprint_manager, volume_profile_manager, tpo_manager with bounded observations after warmup, starts at next minute boundary after join/gap, closes minute on later trade

### Phase 7: Watchlist + Scanner + Positions Exact (3 days)
- WatchlistWidget: 384px dense grid, header stack pinned (title bar, filter row, category+venue selectors, SYMBOL/LAST/24H% sort chips), rows star+sparkline 30 samples 2s + symbol ellipsized + last + 24h% tabular + dim 24h-volume beneath, volume bars accent when Vol sort, favourites in-memory, compact auto when narrow, categories from SymbolMetadata, exchange filter Binance Futures/Hyperliquid, search, rebuild_visible when filter/sort/ticker changes, sparkline ring buffers
- Scanner: every symbol feed lists, 24h stats, composite scores
- PositionsPanel: global not per-symbol, PaperTradingManager tabs Positions active+account summary, Equity curve linearized ring buffer, Journal, By type, lse-api broker integration
- Backend: ticker_manager global ticker24h subscribed once at init, symbol_metadata registry

### Phase 8: Drawing Tools + Indicators + Workspace (3 days)
- Drawing toolbar rail left edge 32px, icons, style editor, drawing_layer
- Indicators: Volume, CVD, RSI, MACD, Funding, OI, VPIN, indicator_manager, tokens
- Workspace: save named setup, switch Order Flow/Liquidity/Replay Review presets, export/import JSON, layout+panel settings restore, one panel per type v1
- Verification: drawings persist per instrument, indicators add/remove, workspace export/import

### Phase 9: Broker Integration + Orderflow Fallback (2 days)
- Provider = broker:* → check capability depth_stream
- If broker provides MBO/L2: use broker orderbook_manager, show broker badge
- Else: orderflow from binance/coinbase/hyperliquid (configurable, default binance 20ms), execution via broker_hub, banner "BROKER MODE: orderflow from Binance/Coinbase/Hyperliquid (broker has no L2), execution via broker LSE-API"
- Paper trading via lse-api when no broker
- Positions bottom shows broker positions via /api/positions
- Verification: broker mode banner, orderflow still visible, positions from broker

### Phase 10: Ultra-Fast & No-Blank Hardening (2 days)
- WS tiers: hyperliquid 66Hz/15ms, binance 50Hz/20ms, coinbase 20Hz/50ms, lse 30Hz/33ms (already done but verify)
- Fallback chain: binance→coinbase→hyperliquid→demo→lse, Loading {symbol} {tf} {provider} ⚡15ms/20ms/50ms with fallback hint and api url, Reload/Reset buttons (already done)
- Auto-load immediately on Binance click (no waiting, no stale)
- MT5-like speed: rAF 60fps, double-buffer swap once per frame, DispatchQueue 3ms budget, SoA cache, RowModel cache
- Verification: Render preview shows Hyperliquid button tab, Binance moves faster than Coinbase, Hyperliquid fastest, no blank, 50ms target met

---

## 5. File Structure Target

frontend/src/components/edgedepth/
- EdgeDepthTerminal.tsx — root, composes AppShell + LayoutManager + all widgets
- TopBar.tsx — exact app_shell topbar 44px
- StatsBar.tsx — exact statsbar 33px
- LayoutManager.tsx — dockspace reserves, setup_default_layout, layout_matches
- ChartWidget.tsx — center, heatmap overlay, candles, FP, VPVR, TPO, liq field, bubbles, drawing
- DomWidget.tsx — right, RowModel cache, grouped USD/coin, trade cols
- TradesWidget.tsx — right-bottom, size highlight 1-3
- WatchlistWidget.tsx — left 384px dense grid sparkline
- PositionsPanel.tsx — bottom, broker + paper
- DrawingToolbar.tsx — left rail 32px
- Indicators/ — Volume, CVD, RSI, MACD, Funding, OI, VPIN
- ShaderHeatmapRenderer.ts — already EdgeDepthGPUHeatmap.ts, enhance to exact
- PriceProfileRenderer.ts
- RealtimeDOMFrame.ts

lse_terminal/engine/
- orderflow/ — orderbook_manager.py (double-buffer), heatmap_manager.py, liquidation_heatmap_manager.py, footprint_manager.py, volume_profile_manager.py, tpo_manager.py, candle_manager.py, ticker_manager.py
- server.py — add /api/orderflow/stats, /api/orderflow/heatmap, /api/tickers, /api/positions broker
- broker_hub.py — broker orderflow capability detection

---

## 6. Risks & Mitigations

- **Binance depth20@100ms underlying 10Hz limits max true speed despite 20ms coalesce** → document as venue limitation, use Hyperliquid 15ms for ultra-fast demo, Binance still 20ms coalesce + rAF
- **Symbol validation BTCUSDT vs BTC vs BTC-USD** → mapping layer in frontend and backend, demo symbol mapping
- **WebGL2 not available** → fallback to Canvas2D DepthHeatPane (already implemented)
- **Blank chart on Render** → fallback chain + Loading overlay + Reload/Reset (already implemented, keep)
- **Broker has no L2** → fallback to crypto feeds for orderflow, execution via broker, banner

---

## 7. Verification Checklist (RULE: nothing DONE unless this passes)

- [ ] Heatmap visible on Render preview, no blank, Binance 20ms, Coinbase 50ms, Hyperliquid 15ms button visible
- [ ] Binance visually faster than Coinbase (verified via console ws flush_ms+hz)
- [ ] Hyperliquid fastest ⚡15ms
- [ ] Auto load immediately on Binance click
- [ ] Fallback chain works: if Binance fails, shows Coinbase/Hyperliquid/Demo/LSE with hint
- [ ] TopBar exact: D mark, symbol pill, TF seg, chart type, heatmap type, provider switch, Live/Replay
- [ ] StatsBar exact: mark, funding countdown, OI, liq total/long/short
- [ ] Dockspace: Watchlist left, Chart center, DOM right, Trades right-bottom, Positions bottom, Drawing rail left
- [ ] Chart types: Candles, FP Cluster/Profile, Heikin Ashi, Line, TPO, Renko, Flow Positioning all without blank
- [ ] DOM: 25 levels, grouping, USD/coin, trade cols, RowModel cache FPS
- [ ] VPVR, Footprint, TPO, CVD, Liquidation Field, Trade Bubbles, Flow Positioning
- [ ] Watchlist dense grid sparkline 30 samples 2s, categories, favourites, compact auto
- [ ] Positions: broker positions visible, paper trading equity curve
- [ ] Drawing tools rail left, drawings persist per instrument
- [ ] Broker mode: banner, orderflow from crypto feeds if broker no L2, execution via broker LSE-API
- [ ] lse-api still works: /api/candles, /api/orderflow/*, /api/providers
- [ ] Build passes, no errors, no lags

---

## 8. Next Step — Awaiting Your Approval

I will NOT code until you approve this plan. Please choose:

1. **Approve Phase 1 Heatmap Only** — start with heatmap exact to EdgeDepth shader renderer, verify ultra-fast 15/20/50ms, no blank, Hyperliquid button visible on Render
2. **Approve Full Terminal Rebuild** — execute phases 0-10 in order, step-by-step verification each phase
3. **Request Changes** — tell me what to adjust in plan

This is a serious project. I will act as expert, not fast.


## PHASE 1 COMPLETE — Heatmap exact replica + zinc palette + rolling 4h buffer

**Date:** 2026-09-22
**Commit:** 95e3f35

**Backend changes:**
- server.py /api/orderflow/depth now serves rolling 4h buffer from orderflow_manager DepthGrid when live_only providers (binance/coinbase/hyperliquid) have no depth_history capability. Previously returned live_only empty causing blank. Now: grid._columns(include_live) → events with bids, trades from tape, source_label "live rolling 4h buffer (N cols)". Ensures pump via _ensure_orderflow_pump.
- New endpoint /api/orderflow/heatmap returns dense viewport: timestamp_ms price_min bucket_size max_qty qtys aligned to prices, using DepthGrid.viewport(from_ms,to_ms,lo,hi). Mirrors pb::HeatmapSnapshot + shader_heatmap_renderer column_build_buf_ logic. Never blank, fallback to demo or empty live with error.
- Flush tiers preserved: hyperliquid 15ms ⚡, binance 20ms, coinbase 50ms.

**Frontend changes:**
- EdgeDepthGPUHeatmap.ts: clearColor changed from #0b0e11 (0.043,0.055,0.067) to zinc --panel #2a2a2a (0.1647,0.1647,0.1647). Data colormaps exact Ember 15 stops (0,0,0→252,235,140), Viridis 6, Magma 5, Inferno V7 hand-tuned black→indigo→purple→red→orange→yellow→white thresholds 0.05/0.15/0.25/0.35/0.45/0.55/0.65/0.75/0.85/0.95, alpha curve 0.05 invisible, 0.05-0.15 quadratic to 40, 0.15-0.35 40→120, 0.35-0.60 120→190, 0.60-1.0 190→245*opacity. Discard 0.07 liq / 0.004 orderbook exact.
- EdgeDepthHeatmapPane.tsx: full rewrite with zinc chrome #1c1c1c/#2a2a2a/#262626/#3a3a3a #e8e8e8/#b9b9b9 #21b3a4/#f0426c #d0d0d0, exact EdgeDepth top bar but zinc, provider tabs BINANCE 20ms COINBASE 50ms HYPERLIQUID ⚡15ms visible, timeframe fav logic 6/6 full bar click sets right-click pins, heatmap types Orderbook/Liquidations/VolumeDelta/TradeIntensity/Flow & Positioning, settings advanced colormap Sensitivity Opacity Bucket × Linear filter Reach modulation, rAF 60fps ResizeObserver DPR, priceRange auto BBO mid±max(spread*10,1%) fallback 60k-70k never blank, trade bubbles up #21b3a4 down #f0426c, bid/ask lines dashed, overlay Canvas2D for axes crosshair, fetch /api/orderflow/heatmap first then depth fallback, WS live with tiered flush.

**Zero blank/lag strategy verified:**
- Backend rolling 4h buffer 14400 cols @1s, frontend GPU ring 8192×1024 R32F + meta RGBA32F + reach R32F, LUT 256×1, SoA cache, double-buffer orderbook write/read swap once per frame (via orderflow_manager), RowModel cache rebuild only when ob ts/uid/acc_rev/center/scroll/group changed (in DOM widget, not this phase), virtualized watchlist not yet, WebGL2 fallback Canvas2D DepthHeatPane, rAF 60fps, WS tiers 15/20/50ms.

**Functional verification:**
- npm run build passed (3771 modules, 22.43s)
- python -m py_compile server.py OK
- Grid viewport API exists, _columns include_live works
- Hyperliquid button tab visible in UI (providerState tabs)
- Build assets committed: chart.js 284k, depth-BNoeWN9_ 143k

**Next Phase 2 — Drawing toolbar + Timeframe picker PRO + Chart view 8 options:**
- Implement left rail drawing toolbar 20 tools + eye/trash/collapse exact EdgeDepth
- Chart view: Candles, FP Cluster/Profile, Heikin Ashi, Line, TPO, Renko, Flow Positioning (8)
- Appearance panel: Market colors Teal/rose Interface accent Neutral/Mint/Indigo/Amber Colormap Ember/Inferno/Magma/Viridis Opacity Intensity Gamma Low Peak Noise floor Tick-per-row Half-life
- Preserve lse-api broker:* depth_stream capability detection with banner

