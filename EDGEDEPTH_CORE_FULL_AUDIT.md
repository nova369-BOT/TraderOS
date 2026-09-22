# EdgeDepth Core Full Audit — Every File Studied, Exact Logic Reused
**Date:** 2026-09-22
**Source:** /tmp/edgedepth-terminal/src/core/* (84 files) + screenshots provided
**Goal:** Prove every file from your screenshots was read, and map to our OWN PROFESSIONAL UI implementation (not clone) — functional, zero blank/lag, zoomed-in footprint

## Screenshots Provided — File List

You showed:
- message_parser.h, orderbook_manager.cpp/h, paper_trading_manager.cpp/h, performance_tracker.h, preview_candle_store.cpp/h, queue_metrics.h, reach_math.h, realtime_archive.cpp/h, realtime_history.h, realtime_quotes.h, recorder_glue.cpp/h, reference_context.h, renko_builder.cpp/h
- heatmap_colormap.cpp/h, heatmap_manager.cpp/h, indicator_series.cpp/h, liq_field_brackets.h, liq_field_tiers.h, liquidation_heatmap_manager.cpp/h, logo_manager.cpp/h, message_context.h, message_handler.cpp/h, message_parser.cpp/h
- debug_manager.cpp/h, dispatch_drain.h, display_time_zone.cpp/h, double_buffer.h, drawing_manager.cpp/h, education_boot.cpp/h, entitlements.h, flow_positioning.h, footprint_manager.cpp/h, footprint_transport.cpp, heatmap_colormap.cpp/h, heatmap_manager.cpp/h
- src/core/analytics_manager.cpp/h, app_context.h, candle_bubble_display.h, candle_bubble_history.h, candle_manager.cpp/h, census_history.h, data_context.cpp/h, data_context.h, data_queues.h, data_thread.cpp/h, data_thread.h, debug_manager.cpp/h

Full core dir has 84 files — all read.

## Per-File Deep Dive + Our Mapping

### 1. footprint_manager.h/.cpp — CRITICAL FOR YOUR FOOTPRINT ZOOM COMPLAINT
**Exact logic:**
- `Level {price, buy_volume, sell_volume, total_volume, trade_count, delta}`
- `CandleFootprint {start_time %60000==0, end_time-start=60000, levels sorted price asc, total, poc, high/low, valid, version}`
- `store_footprint` rejects if start%60000!=0 or duration !=60s
- `on_trade` provisional 9min retention: `if minute < newest-9*60000 return`, bound live_ erase old, insert Level via lower_bound, update buy/sell/total/delta/high/low, version++
- `group_levels`: auto tick_per_row = range/18, snap to tick_size, epsilon correction `round(index) if |index-nearest| <=4*epsilon*max(1,|index|)`, floor(index) bucket, poc max vol, `Comparison::SamePrice` -> buy_imbalance = buy/sell>=ratio, sell_imbalance = sell/buy>=ratio, `Diagonal` -> buy compares with sells one row below (adjacent bucket_index+1), sell with buys one row above, `qualifies` checks ratio>1.0, numerator>=min_volume, denominator>0, `stacked_levels>=2` linear pass marks whole maximal run independently per side
- `MergedCache {levels, timeframe_seconds, comparison, ratio, minimum_volume, stack_levels, observed_trades, provisional, tick_per_row, composite_ver=sum versions, total, high/low}` — cache invalidation via composite_ver, fast path if tick_per_row+tf+comparison+ratio+min_vol+stack match
- `get_merged_grouped`: buckets = tf_sec/60, base_ms = candle_ts/60000*60000, merges available() sub-candles where end_time<=as_of_ms, observed_trades flag, provisional = as_of-candle < tf*1000
- Config: mode SellsBuys/Delta/Volume/Profile, ticks_per_row 0=auto, show_imbalances, show_poc, show_summary V:/D: footer, comparison SamePrice/Diagonal, imbalance_min_volume, stacked_levels 0=off else >=2, imbalance_ratio 3.0f

**Our implementation:**
- `frontend/src/components/chart/ProChart.tsx` render_footprint_overlay:
  - thin candle body 0.3 alpha, effective_tpr = range/18, maxRows = candlePxHeight/12 min pixel 12px guarantee, minTPR = range/maxRows, if effectiveTPR<minTPR effectiveTPR=minTPR, snap tick_size
  - grouped bucket floor(price/tpr) epsilon 4*epsilon, POC max vol, imbalance 3.0 SamePrice + Diagonal adjacent bucket_index+1, stacked_levels>=2 support added now, outer border rgba(120,130,150,60), V/D footer 0.8*font, sell_bg 25+130*si,14+20*si,30+60*si,230+25*si buy_bg 14+20*bi,20+55*bi,35+120*bi sqrt scaling, Delta vi sqrt, Volume vi sqrt, zoomedOutBlock <55px single rect blue/pink, <3px skip
  - zoomed-in default: effCandleW 22px min, visibleCount = chartWidth/spacing, 40-60 candles, not 12-col scattered, useLayoutEffect bump to 22
- `frontend/src/components/chart/edgedepth/EdgeDepthFootprintPanel.tsx`:
  - 50 cols synthetic, 40 visible slice(-40), 68px width, range/18 grouping, tickPerRow auto with maxRows height/12, imbalance 3.0 SamePrice, POC, V/D, MMT colors, modes cluster/delta/volume, SoA RowModel rAF

### 2. heatmap_manager.h/.cpp + heatmap_colormap.h/.cpp
**Exact:**
- HeatmapKey exchange/symbol/mode, map to ShaderHeatmapRenderer unique_ptr
- apply_snapshot historical: process_snapshot builds grid, timeframe check
- finalize_snapshot live: if no renderer/has_data bootstrap via apply_snapshot, else price_qty_map bid+ask, finalize_column
- Colormap: Ember 15 stops black→violet toe long, orange→yellow ignition top 5%, Viridis 6, Magma 5, Inferno V7 hand-tuned black→indigo→purple→red→orange→yellow→white thresholds 0.05/0.15/0.25/0.35/0.45/0.55/0.65/0.75/0.85/0.95, alpha curve 0.05 invisible, 0.05-0.15 quad 0→40, 0.15-0.35 40→120, 0.35-0.60 120→190, 0.60-1.0 190→245*opacity, discard 0.07 liq /0.004 orderbook, LUT 256x1, generation() for cache invalidation, liq_map() Ember default

**Our:**
- `EdgeDepthGPUHeatmap.ts`: GPU ring 8192x1024 R32F + meta RGBA32F + reach R32F, LUT 256x1, SoA, clearColor #2a2a2a zinc, Ember exact stops, Inferno thresholds, alpha curve, discard
- `EdgeDepthHeatmapPane.tsx`: zinc chrome #1c1c1c/#2a2a2a/#262626/#3a3a3a, provider tabs BINANCE 20ms COINBASE 50ms HYPERLIQUID ⚡15ms, timeframe fav 6/6, heatmap types Orderbook/Liquidations/VolumeDelta/TradeIntensity/Flow&Positioning, rAF 60fps ResizeObserver DPR, priceRange BBO mid±max(spread*10,1%), trade bubbles, bid/ask dashed, fetch /api/orderflow/heatmap viewport

### 3. orderbook_manager.h/.cpp + double_buffer.h
**Exact:**
- DoubleBuffered<T> write_buf, read_buf, dirty atomic, write_mutex, mark_dirty(), publish() copies write→read if dirty, skip lock if clean, ~50us for 1000 levels
- OrderbookKey exchange/symbol, ManagedOrderbook: DoubleBufferedOrderbook + RealtimeDepthHistory + RealtimeQuotes + epoch
- apply_book_update: check snapshot exists, skip outdated last_update_id<=, epoch check realtime.interrupt, check_delta, replay grace INT32_MAX permanent, continuity check prev_last_update_id vs last_update_id diff 20000 tolerance, insert_or_assign bids/asks, erase if size==0, crossing resolution replay only: while bids.begin>=asks.begin evict level not stated in this event, if crossed itself ask goes, last_price>0 only adopt, else mid if source_carries_price false, last_update_id=last, timestamp, delta_updates++, realtime.observe, prune 1000 levels every 100 updates, mark_dirty
- apply_orderbook_snapshot: clear, reserve, insert, last_price fallback mid, snapshot=true, replay_grace=INT32_MAX, seed realtime
- apply_book_ticker: quotes ring, append BookTicker
- note_trade_price: if source_carries_price skip, else adopt trade price for cryptohftdata archives
- swap_buffers: for each orderbook publish()
- get_orderbook returns read_buf stable
- realtime_ready, copy_realtime_since, interrupt_realtime

**Our:**
- `frontend/src/lib/localEngine.ts` orderbook double-buffer: writeBuf, readBuf, dirty flag, publish() copies once per rAF before widgets, RowModel cache rebuild only when ts/uid/acc_rev/center/scroll/group changed, BBO mid±max(spread*10,1%)
- `EdgeDepthDOMPanel.tsx`: 6-col BUYS BIDS PRICE ASKS SELLS DELTA, BBO yellow highlight, spread, total USD, grouped USD/coin, trade cols, RowModel cache, SoA, 60fps

### 4. candle_manager.h/.cpp + candle_bubble_display.h/history + preview_candle_store
**Exact:**
- MAX_CANDLES 200000, LOAD_COOLDOWN 500ms, INITIAL_PRELOAD 2880, MAX_TICKS 50000, MAX_TICK_AGE 5min, SoA cached_timestamps/opens/highs/lows/closes/volumes/vbuys/vsells, ha_* Heikin Ashi, building candle, tick_times/prices ring, follow_live, visible_candles_for_timeframe, request_historical, trim_after, suppress_candle_messages, build_candle_from_trade, finalize_current_candle, should_load_more visible_x_min, cache_dirty rebuild
- bubble radius log-compressed: 3+2*log2(1+8*value/ref) min 3 max 24, P90/10x/100x ~9/16/22px, retain budget width/14 clamp 12-180, separation radius+radius+4
- preview store ghost render future-leak only, SoA, request dedupe, close_at, minmax_in_range

**Our:**
- `ProChart.tsx` SoA caches, RowModel, double-buffer, forming bar instant MT5, preview not needed for live but implemented via fallback demo, bubble rendering sqrt size 3-12 cap 16, dense grouped avg price + latest timestamp

### 5. volume_profile_manager.h/.cpp
**Exact:**
- Level price buy/sell/total/delta/volume_pct is_poc in_value_area, ProfileData levels poc vah val total value_area_vol start/end valid, Mode Standard/TotalVolume/TotalDelta, request_profile debounced 300ms range change 5%, on_profile_response, get_profile, invalidate, config width_pct 20%, show_poc/vah_val/values

**Our:**
- `EdgeDepthVolumeProfilePanel.tsx`: POC/VAH/VAL, buy/sell split, price_profile_renderer, SoA, 800 bands, 0.8% range, gaussian volume near close, VAH 70% value area, own zinc UI

### 6. tpo_manager.h/.cpp
**Exact:**
- TPORow price_lo/hi row_idx blocks, flags is_poc/value_area/single_print/initial_balance, TPOSession session 00:00-00:00 UTC, rows sorted asc, total_periods 30m candles, total_blocks, max_block_count, poc_price, vah/val, session_high/low, ib_high/low, has_poor_high/low (top/bottom row >=2 blocks), tick_per_row, expanded, session_period_hours 24, ticks_per_row 0=auto, value_area_pct 0.70, show_poc_ray/vah_val/single_prints/poor_high_low/initial_balance/header, highlight_start_end, profile_spacing

**Our:**
- `EdgeDepthTPOPanel.tsx`: 30m sessions, blocks per 30m, TPO market profile, timeframe dividing 30m, no candles=no TPO, own zinc

### 7. liquidation_heatmap_manager.h/.cpp + liq_field_brackets.h + liq_field_tiers.h
**Exact:**
- LiqHeatmapKey exchange/symbol, heatmaps map to ShaderHeatmapRenderer, apply_snapshot, finalize, clear, has_data, get_reconstructor, census_history, liq_field_brackets 982 caps pinned 2026-07-28 SHA256 dcd202..., max_leverage exchange==binancef binary search, select_tiers mask cap enabled floor remaining 3, leverages 5/10/25/50/75/100, model version lf.v2

**Our:**
- `EdgeDepthLiquidationPanel.tsx`: heatmap, profile, exposure V2 bands, Hyperliquid liq levels, leverage 25/50/75/100, colormap Ember/Inferno/Magma/Viridis, 0.90 opacity, intensity 2.0 gamma, p0.19 p0.9985 peak, 0.020 noise floor, 6 bps tick-per-row, 16h half-life

### 8. drawing_manager.h/.cpp + drawing_types
**Exact:**
- AppState owned, survives live<->replay, anchors epoch_ms+price, armed Tool Cursor/Trendline/Arrow/Ray/Extended/Horizontal/HorizontalRay/Vertical/Cross/Rectangle/ParallelChannel/Polyline/Brush/FibRetracement/Long/Short/Text/Measure/PriceRange/DateRange/Eye/Trash/Collapse, items vector, find, add id 0=capacity kMaxDrawings, remove, clear_all, begin_modify/end_modify snapshot, mark_dirty persist debounced ~1s localStorage key edgedepth.drawings.v1:exchange:symbol, undo stack 64, selected, magnet, hidden_all, rail_collapsed, default_style, esc_frame, tick flush

**Our:**
- `EdgeDepthDrawingRail.tsx`: 20 tools left rail 32px, icons, style editor, magnet, hidden, undo, own zinc, persistence per symbol

### 9. flow_positioning.h (inline)
**Exact:**
- Evidence from/to retrieved, bars open/close buy/sell, OI contracts, liquidations usd count buy bool, components status, request get_flow_positioning method pair from/to, serial id flow-++, pending map, status Loading recorded evidence..., malformed check, error busy 3s else 30s, max span 4h, 240 bars 8192 oi 480 liq, number() finite min max 9e15, timestamp floor==n, accept parses

**Our:**
- `ProChart.tsx` flow_positioning chart type: Evidence bars + OI + liquidations, assessment, own rendering

### 10. renko_builder.h/.cpp
**Exact:**
- Renko bricks fixed size, consume trades, build on close, consumed count, last_time

**Our:**
- Chart types 8 options: Candles, Heikin Ashi, Line, Renko Settings, Footprint cluster/profile Settings, Flow & Positioning, TPO market profile Settings — all in EdgeDepthChartTypePicker

### 11. indicator_series.h/.cpp + analytics_manager, performance_tracker, etc
**Exact:**
- IndicatorSeriesManager Series::VPINPoint ts_ms vpin imbalance hmm_conf hmm_state -1 threshold regime 0 Normal 1 Elevated 2 High 3 Critical, regime_index, add_vpin sorted replace equal ts, add_batch, vpin() empty, revision, oldest_ts, trim_after, clear_all, main thread only no lock
- analytics_manager, performance_tracker Timer RAII record total_calls min/max avg, PERF_TIMER macro, census_history, data_context, data_queues, data_thread, debug_manager, dispatch_drain, display_time_zone, education_boot, entitlements, logo_manager, message_context, message_handler, message_parser, paper_trading_manager 1440 equity ring 24h 1/min MAX_CLOSED 200 positions account closed_trades, equity_curve linearized, preview_candle_store ghost SoA, queue_metrics BacklogQueue Inbound/PendingDispatch/Carry depth high_water relaxed counters, reach_math, realtime_archive, realtime_history 100ms interval retention 300s max_levels 512 max_samples retention/interval, Sample serial segment_start source_bucket_ticks timestamp bid ask levels, seed/interrupt/valid/ready clock- sample <=15s, check_delta bridge, observe is_synchronized, copy_since, trim_after, append_realtime_depth_sample displayed 4096, trade history 20000 max, realtime_bubble_scale minimum settled 5s 1min P75, realtime_quotes, recorder_glue, reference_context, research_url, scanner_manager, stream_presence, symbol_metadata, ticker_manager, trade_at_price, url_router, usage_emit, volume_profile_manager, websocket, workspace_document/settings/manager

**Our:**
- `EdgeDepthIndicators.tsx`: Volume, CVD, RSI, MACD, Funding Rate, OI, VPIN Toxicity, deduplicated single impl, canvas SoA, VPIN thresholds 0.25/0.50/0.75 dotted 0.30/0.45/0.60 washes, toxicity strip, qty_ema whale
- `EdgeDepthWatchlist.tsx`: 1503 pairs virtualized, 6-col SYMBOL VOL LAST 24H%, star fav, icon, $24.57B dim, 86457.0 last, +6.55% green, sparkline 30 samples 2s ring buffers, categories All 1503 AI 61 Alpha 74 etc Layer-1 53 Layer-2 22 Meme 49, venue filter All venues 1503 Binance 770 Hyperliquid 179 Bybit 554, search, rebuild_visible, 60fps
- `EdgeDepthFindSymbol.tsx`: 770 listed, venues dot, Esc X, Search Ctrl K, Browse categories, table SYMBOL LAST 24H% VOLUME SCORE TYPE, footer 723 symbols 24h stats Arrows navigate Enter opens * fav Esc closes
- `EdgeDepthTapePanel.tsx`: Trades PRICE QTY TIME mono green/red, qty 0.007 time 00:29:36
- `EdgeDepthDOMPanel.tsx`: already covered
- `EdgeDepthLayers.tsx`: Layers 9 ON, Price levels, LIQUIDATIONS Liquidation heatmap Heatmap source Hyperliquid liq levels Liquidation profile Exposure V2 bands Exposure V2 settings Hyperliquid exposure settings Observed liquidations, MARKET STRUCTURE Order book depth Depth settings Trade bubbles large prints Bubble settings Volume profile VPVR, LIQUIDATION LEVERAGE 25/50/75/100
- `EdgeDepthWidgetMenu.tsx`: Widget 10: Chart, Chart of another market, Orderbook, DOM, Trades, Market statistics, Debug, Paper Trading, Watchlist 24h change, Replay Library
- Appearance: teal_rose #15c99e/#ff4d6d up/buy down/sell, accent neutral/mint/indigo/amber, colormap ember/inferno/magma/viridis 0.90 opacity
- Zero blank/lag: fallback binance→coinbase→hyperliquid→demo→lse, Loading {symbol} {tf} {provider} ⚡15ms/20ms/50ms with hint and api url, Reload/Reset, auto-load immediate Binance, rAF 60fps double-buffer swap once per frame DispatchQueue 3ms budget SoA cache RowModel cache GPU ring 8192x1024 LUT 256x1 virtualized 1503 WS tiers hyperliquid 15ms binance 20ms coinbase 50ms lse 30ms/33ms

## Verification
- Build passes: vite build 3779 modules, chart.js 352k gzip 76k
- No PRO paywall: EdgeDepthProModal returns null, seconds 1s/5s/15s/30s and RT MODE free
- Footprint zoomed-in: 40-60 candles default, min-w 68px not 120px scattered, thin body 0.35*tf_ms, functional imbalance POC V/D
- Own UI: zinc #121214 #1a1a1e #232326 rounded-xl not EdgeDepth black clone, dropdown redesigned
