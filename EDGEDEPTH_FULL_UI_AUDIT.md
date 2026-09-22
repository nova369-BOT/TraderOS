# EdgeDepth Full UI Audit — Exact Replica with LSE Terminal Default Colors
**Date:** 2026-09-22
**Source:** /tmp/edgedepth-terminal src + 20 screenshots provided by user (pixel audit)
**Goal:** Same UI as EdgeDepth, no changes to layout/structure, but color = default of our terminal (LSE zinc #1c1c1c/#2a2a2a/#3a3a3a)
**Free to use exact src code — studied everything for smooth implementation with zero errors/lag/blank**

---

## 1. Screenshots Audit — Every Single UI Element

### Main Terminal View (Screenshot 002932, 002941, 005908)
- **Topbar (44px):** 
  - Left: `edgedepth` logo (lowercase, teal dot?) + `EARLY ACCESS` pill
  - Symbol pill: `BTC/USDT` + `Binance Futures · Perp` + dropdown arrow
  - Right: `Courses | Live | Replay | Workspace` segmented, sun icon theme toggle, fullscreen icon, profile icon
  - Second row (statsbar 33px): `Last 86457.0`, `24h +6.55%` green, `Funding +0.0070%`, `Open interest $9.43B`, `Volume 24h $24.57B`, `Market details` right
- **Left rail Watchlist (254px per tokens.json):**
  - Header: `Watchlist` + `1503 pairs` + `X` close + hamburger icon + filter icon
  - `Filter pairs` input
  - Category selector: `All 1503` + `All venues` dropdown → `All venues 1503`, `Binance 770`, `Hyperliquid 179`, `Bybit 554`
  - Sub-categories: `All 1503`, `AI 61`, `Alpha 74`, `Chinese 3`, `Crypto 525`, `DeFi 121`, etc + `Layer-1 53`, `Layer-2 22`, `Meme 49`, etc
  - Table header: `SYMBOL`, `VOL`, `LAST`, `24H%` with sort arrows
  - Rows: star fav (☆/★), icon (BTC/ETH/SOL/ZEC/XRP/DOGE/NEAR/1000PEPE/SUI/HYPE/BNB/UNI...), `BTC/USDT`, `$24.57B` volume dim, `86457.0` last, `+6.55%` green / `-2.28%` red, type icons
  - Bottom status: `BTCUSDT · Live · Connected`, `60 fps`, `UTC+01 · 00:29:37`
- **Center Chart (flex):**
  - Header: `Chart BTC/USDT 1m X`, timeframe `1m 5m 15m 1h 4h 1D` + dropdown arrow, `Real-time` locked pill with lock icon, `Candles` dropdown, `Layers 4` dropdown, `Tools` dropdown, `+ Widget`, `Draw`
  - Chart body: heatmap depth background (blue/cyan ocean ramp #06101d→#eaf06a, dark blue small → yellow large), candlesticks teal up #15c99e / rose down #ff4d6d, trade bubbles large prints (green/red circles, radius sqrt size 3px-12px cap 16x min, up to 1500 individual, dense grouped avg price + latest timestamp), price axis right 66px, time axis bottom 22px, crosshair, `Jump to latest` button top-left, `Depth gaps: no observation loaded` warning when no depth
  - Price lines: white horizontal lines at 86654.1, 86590 etc with label, current price 86457.0 red/green pill right
- **Right rail DOM (388px):**
  - Header: `DOM BTC/USDT X` + collapse icon + Binance icon, `Auto center`, `Coin / 5m`, `Settings` tabs
  - Table: `BUYS`, `BIDS`, `PRICE`, `ASKS`, `SELLS`, `DELTA` columns, mono tabular
  - Rows: 0.007 etc buys, 0.002 bids, price 86457.9 etc, 0.004 asks, 0.001 sells, +0.002 delta green / -0.007 red, BBO highlight yellow 86457.0, spread info, total 70.973 / 133.758 etc bottom
  - Gutter markers: best bid/ask separate halves
- **Right bottom Trades (150px):**
  - Header: `Trades BTC/USDT X` collapse
  - Table: `PRICE`, `QTY`, `TIME` mono, green/red price, qty 0.007 etc, time 00:29:36
- **Bottom telemetry:** `58 fps`, `UTC+01 · 00:58:49`

### Find a Symbol Modal (Screenshot 005854)
- Header: `Find a symbol` `770 listed` + Binance/Hyperliquid/Bybit venues with dot, `Esc X` close
- Search: `Search symbol or category...` + `Ctrl K`
- Browse: `All 1503`, `AI 61`, `Alpha 74`, `Chinese 3`, `Crypto 525`, `DeFi 121`, `Gaming 27`, `Index 2`, `Infrastructure 62`, `Layer-1 53`, `Layer-2 22`, `Meme 49`, `Metaverse 13`, `NFT 12`, `Payment 7`, `PoW 16`, `Pre-IPO 2`, `RWA 4`, `Storage 6`, `TradFi 198`
- Table: `SYMBOL ▲`, `LAST`, `24H %`, `VOLUME`, `SCORE`, `TYPE`, star fav, icon, symbol `0G/USDT`, last `0.2345`, 24h% `+4.32%` green, volume `9.11M`, score `51`, type `Layer-1`
- Footer: `723 symbols · 24h statistics`, `Arrows navigate · Enter opens · * favorites · Esc closes`

### Category Dropdowns (005908, 005917, 005920, 005945, 005956)
- `Search categories` input
- List: `Gaming 27`, `Index 2`, `Infrastructure 62`, `Layer-1 53`, `Layer-2 22`, `Meme 49`, `Metaverse 13`, `NFT 12`, `Payment 7`, `PoW 16`, `Pre-IPO 2`, `RWA 4`, `Storage 6`, `TradFi 198`, `All 1503`, `AI 61`, `Alpha 74`, `Crypto 525`, `DeFi 121`
- Venue dropdown: `All venues 1503`, `Binance 770`, `Hyperliquid 179`, `Bybit 554`

### Timeframe Picker (010006)
- Header: `Chart BTC/USDT 1m X`, `1m 5m 15m 1h 4h 1D ▲` + `Real-time` locked
- Body: `TIMEFRAME` `* FAVOURITES 6/6 · FULL BAR`
- `SECONDS` `PRO` locked: `1s 🔒`, `5s 🔒`, `15s 🔒`, `30s 🔒`
- `MINUTES`: `1m *`, `3m`, `5m *`, `15m *`, `30m`
- `HOURS`: `1h *`, `2h`, `4h *`, `6h`, `12h`
- `DAYS`: `1D *`, `1W`
- Footer: `CLICK SETS THE CHART · RIGHT-CLICK PINS IT TO THE BAR (MAX 6)`, `Custom e.g. 7m, 90s, 3h` input + `Add` button

### Chart View 8 Options (010014)
- Header: `CHART VIEW · 8 OPTIONS`, `PRICE`
- `Candles` ✓ check, `Heikin Ashi`, `Line`, `Renko` Settings
- `ORDER FLOW`: `Footprint cluster` Settings, `Footprint profile` Settings, `Flow & Positioning`, `TPO market profile` Settings
- Footer: `SETTINGS ALSO OPEN WITH RIGHT-CLICK`

### Drawing Toolbar Left Rail (010020, 010039)
- Vertical rail left edge of chart, icons top-bottom:
  - Cursor arrow, Trendline diagonal, Arrow, Ray, Extended line, Horizontal line, Horizontal ray, Vertical line, Cross line, Rectangle, Parallel channel, Polyline, Brush squiggle, Fib retracement 3 lines, Long position, Short position, Text T, Measure ruler, Price range I, Date range H, Eye hide, Trash delete, Collapse <, `9/2` indicator count
- Top: hamburger menu, edit pencil, fullscreen, profile icons (010256)

### +Widget Menu (010028)
- `+ Widget` `Draw`, `ADD WIDGET`
- `Chart` `BTC/US...`, `Chart of another market...`, `Orderbook`, `Depth of market (DOM)`, `Trades`, `Market statistics`, `Debug`, `Paper Trading`, `Watchlist (24h change)`, `Replay Library`

### Layers Menu (010034)
- `LAYERS · 4 ON`
- `▶ Price levels`
- `LIQUIDATIONS`: `☑ Liquidation heatmap`, `▶ Heatmap source`, `🔒 Hyperliquid liq levels`, `☑ Liquidation profile`, `🔒 Exposure V2 bands (pilot)`, `▶ Exposure V2 settings`, `▶ Hyperliquid exposure settings`, `🔒 Observed liquidations`
- `MARKET STRUCTURE`: `☑ Order book depth`, `Depth settings...`, `☑ Trade bubbles (large prints)`, `▶ Bubble settings`, `☐ Volume profile (VPVR)`
- `LIQUIDATION LEVERAGE`: `25×`, `50×`, `75×`, `100×`

### Indicators Menu (010046)
- `INDICATORS` `0 ACTIVE`
- `SUBPLOTS · RENDER IN ORDER`
- `Volume` toggle, `CVD` toggle, `RSI` toggle, `MACD` toggle, `Funding Rate` toggle, `Open Interest` toggle, `VPIN · Toxicity` toggle
- Footer: `TOGGLES FLIP LIVE · MENU STAYS OPEN · ESC CLOSE`

### Appearance Settings (010147, 010154, 010201, 010206)
- Tabs: `Appearance` (active blue), `Style`, `Intensity`
- `Market colors`: `Teal / rose` dropdown ▼, `Up / buy` teal square #15c99e, `Down / sell` pink #ff4d6d, text `Applies to candles, trade bubbles and signed market data throughout the terminal.`
- `Interface accent`: `Neutral` dropdown ▼, options `Neutral`, `Mint`, `Indigo`, `Amber`, `Neutral` (list)
- `Reset appearance` button
- `Colormap`: `Ember` (active), `Inferno`, `Magma`, `Viridis`, `0.90 Opacity` + white square
- `Intensity`: `2.0 Gamma`, `Low`, `p0.19`, `p0.9985 Peak`, `0.020 Noise floor`, `6 bps Tick-per-row`, `16 h Half-life` + white squares

### Pro Upsell Modal (010046 second)
- `EDGEDEPTH PRO` `X` close
- `Read the market in more detail.`
- `Live real-time mode (observed depth, every trade as a bubble, the spread) is a Pro view. Large prints still show as bubbles on your candles.`
- `Read the live pressure`: `Real-time depth, trade bubbles and sub-minute candles.`
- `Add liquidation context`: `Hyperliquid sampled-position levels, available history and reported events.`
- `Go back and study the move`: `90-day tick replay. Every recorded pair. Up to 4× speed.`
- `Annual · save $108` underline + `Monthly`
- `$20 / month`, `$240 billed yearly on card. Founder rate locks while subscribed.`
- `Need deeper research? Research includes Pro, more credits and deeper available replay history.`
- Buttons: `Maybe later`, `Explore Pro plans` underlined

---

## 2. EdgeDepth Exact Src Code Mapping (free to use)

**Theme (`rendering/theme.cpp`, `design/tokens.json`):**
- `Tokens::BASE #05070a`, `PANEL #0a0e12`, `ELEV #0d1217`, `INPUT #11171d`, `HOVER #161d25`, `ACTIVE #1d2630`
- `BD1 rgba(150,168,184,0.07)`, `BD2 0.13`, `BD3 0.22`, `GRID 0.045`
- `TX1 #e9eff5`, `TX2 #98aab8`, `TX3 #5f6f7c`, `TX4 #3a4651`
- `UP #15c99e`, `DOWN #ff4d6d`, `BRAND #22c5db`, `WARN #f3b24a`
- Fonts: `Inter-400/600` UI, `RobotoMono-400/500` + `JetBrainsMono` mono, `HankenGrotesk` headings, CJK subset NotoSansCJK 2KB for 龙虾USDT
- Metrics: `WindowRounding 0`, `FrameRounding R2 5px`, `PopupRounding R3 8px`, `TabRounding 0`, `ScrollbarSize 9px`, `CellPadding 6,2`, `ItemSpacing 8,6`, `FramePadding 9,4`, `WindowPadding 0,0`, `GrabMinSize 16`, `DisabledAlpha 0.65`
- DPI: `devicePixelRatio`, raster_scale min 2x supersample, ui_scale 1.15

**AppShell (`rendering/app_shell.cpp/h`):**
- `total_height() = TOPBAR_H 44 + STATSBAR_H 33 = 77px` dockspace offset
- `ShellStats {mark_price, funding, next_funding_time, open_interest_usd, liq_total_usd, liq_long_usd, liq_short_usd, has_data}`
- `g_pair binancef/btcusdt`, `g_display_name BTC/USDT` from SymbolMetadata, `g_base_asset BTC` for coin logo
- `fmt_compact_usd()` $K/M/B, `fmt_funding_countdown()` hh:mm:ss
- `draw_brand_mark()` D mark: 3 forward streaks exact parallelograms from master SVG viewBox 300x132, h 104 units y 14..118, cyan LOGO, top bar P(58,14) P(138,14) P(126,40) P(46,40) etc + D bowl filled two bars + half-annulus outer 72x52 inner 42x26 center 208,66 sweep +/-pi/2
- `draw_tracked_text()` glyph-by-glyph letter-spacing for EARLY ACCESS pill 0.06em track
- `render_chart_tf()` favourites timeframe bar + grouped dropdown, moved out of topbar in v2 3b so chart toolbar can host it
- `init()` subscribes shell stats handler for active symbol + global ticker24h feed once
- `render()` renders both bars fixed undockable ImGui windows pinned top, `render_statusbar()` bottom telemetry symbol·WS·FPS·present interval·UTC + timezone picker 37 zones compact_offset_label UTC+00:00 → UTC

**Layout (`rendering/layout.cpp/h`):**
- `top_reserve`, `bottom_reserve` replay control bar, `status_reserve` telemetry under bottom_reserve, `left_reserve` drawing-tools rail
- `setup_default_layout(exchange,symbol)` docks by EXACT title string, `layout_matches()` checks, `reset_layout()`, `restore_layout_for()`, `reset_layout_for()`, `vertical_siblings()`, `is_initialized`
- Pending exchange/symbol, layout_exchange/symbol

**Shader Heatmap (`rendering/shader_heatmap_renderer.cpp/h`, `shader_heatmap_resources.cpp`, `core/heatmap_colormap.cpp/h`):**
- Ring buffer `RING_SIZE 8192`, `MAX_ROWS 1024`, textures `R32F` data + `RGBA32F` meta + `R32F` reach + colormap 256x1 LUTs
- `LiqMap Ember default` (15 stops hand ramp black→violet toe longer, orange→yellow top compressed top 5% rare) + Viridis/Magma/Inferno switchable in Tweaks `set_liq_map()`, generation counter
- Ember stops: 0.000 0,0,0; 0.060 6,4,15; 0.140 14,9,34; 0.240 27,13,59; 0.350 45,17,84; 0.460 68,22,103; 0.570 95,28,110; 0.670 126,36,106; 0.760 160,47,92; 0.840 196,62,70; 0.900 227,84,44; 0.945 246,114,20; 0.975 252,158,28; 0.992 253,201,62; 1.000 252,235,140
- Viridis: 0.00 68,1,84; 0.20 65,68,135; 0.40 42,120,142; 0.60 34,168,132; 0.80 122,209,81; 1.00 253,231,37
- Magma: 0.00 0,0,4; 0.25 81,18,124; 0.50 183,55,121; 0.75 252,137,97; 1.00 252,253,191
- Inferno V7 ramp black→indigo→purple→red→orange→yellow→white perceptual, direction by position relative to mark not color
- Alpha curve V7: t<0.05 invisible noise floor Gaussian tails, 0.05-0.15 faint glow outer halo quadratic s*s*40 max 40, 0.15-0.35 emerging 40→120, 0.35-0.60 visible 120→190, 0.60-1.0 strong 190→245, *opacity
- Orderbook colormap: t<0.01 15,25,45 dark; 0.01-0.15 15→25,25→120,45→150; 0.15-0.35 25→60,120→160,150→205; 0.35-0.55 60→180,160→80,205→235; 0.55-0.75 180→245,80→180,235→80; 0.75-1.0 245→255,180→255,80→255
- Realtime: Weak stays dark; high → cyan→yellow→white, stops 0.00 8,13,18; 0.08 12,27,36; 0.25 22,83,108; 0.50 48,182,201; 0.75 218,217,95; 1.00 255,250,220
- RealtimeWarm: 0.00 8,13,18; 0.15 15,30,64; 0.40 28,92,153; 0.65 75,181,190; 0.80 240,205,75; 0.94 248,108,40; 1.00 255,55,35
- Ocean DOM: deep blue #06101d → #0e2f5e → #1c6a8e → #26a59a → #7fd17a → #eaf06a
- GLSL ES 3.0 vert: full-screen triangle gl_VertexID, frag: uv = (gl_FragCoord - plot_origin)/plot_size, time = mix(viewport_time_min/max, uv.x), price = mix(viewport_price_min/max, uv.y), col_offset_f = (time - data_time_start)/time_step, col_offset = floor, held_tail if >=ring_count + observation_hold_until, tex_col = (ring_start+col_offset)%ring_size, meta = texelFetch(meta, ivec2(tex_col,0)), if meta.a>=3.0 && fract(col_offset_f)<fract(meta.a) handle segment start, col_price_min=meta.r, col_num_rows=meta.g, col_flags=meta.a, discard if <0.5 or <1, display_bucket = bucket_size * bucket_multiplier, base_row = floor((price - col_price_min)/bucket_size), agg_base = (base_row/multiplier)*multiplier, discard if agg_base+mult<=0 or >=num_rows, value accumulation: if mode==1 (liquidation) max abs else sum, t calculation: if mode!=1 relative = value*sensitivity/max_qty, shoulder = relative/sqrt(0.25+relative*relative), t = mode==2? shoulder*shoulder : sqrt(relative/(9+relative)), else liquidation t = clamp((value - color_low)/(color_peak - color_low),0,1), discard_threshold 0.07 liq vs 0.004 orderbook, if liq t=pow(t,1.3), fragColor = texture(colormap, vec2(t,0.5)), if liq smooth_alpha smoothstep 0.0,0.15,t * alpha, if use_reach reach = texelFetch(reach_data, ivec2(tex_col,base_row)).r, shaped pow(clamp(reach,0,1),2.5), alpha *= smoothstep 0.02,0.4,shaped, alpha *= opacity
- Timeline: map timestamp→price_qty_map, reachTimeline price→reach_prob, columnMeta timestamp_ms, price_min, price_step, num_rows, max_value, finalized, values Float32Array, ringCount, gpuDirty, nativeBucket, bucketMultiplier, timeStepMs, columnIntervalMs, globalMaxQty 0.01, opacity 1.0, sensitivity 1.0, colorLow 0, colorPeak 100000, mode orderbook/liquidation, liqColormap inferno, obColormap orderbook, useReach false, linearFiltering false, gpuOriginMs, gpuBucketSize, observationHoldUntilMs, viewTimeMin/Max, viewPriceMin/Max, dpr, canvas
- Methods: `process_snapshot(pb::HeatmapSnapshot)`, `finalize_column()`, `update_live_column()`, `upload_reach_data()`, `recompute_reach_from_mark(current_mark, sigma, time_hours)` cone, `configure_realtime(tick_size, interval 100)`, `invalidate_observation()`, `set_observation_hold()`, `set_observation_clock_ms()`, `clear()`, `clear_realtime_view(interval)`, `mark_dirty()`, `set_column_interval_ms()`, `display_time_to_bucket()`, `render_cells(timeframe_ms, sensitivity, show_labels, extend_current_depth)` injects shader via AddCallback between BeginPlot/EndPlot, `set_colormap_type()`, `set_bucket_multiplier()`, `set_realtime_warm()`, `recalibrate_realtime_colors()`, `set_time_offset_ms()`, `set_opacity()`, `set_smooth_mode()`, `set_extend_levels()`, `set_linear_filtering()`, `set_reach_modulation()`, `set_color_low/peak()`, `set_replay_cutoff_ms()`, `has_data()`, `get_snapshot_count()`, `get_texture_id()`, `get_value_at_price_and_time()`, `has_missing_columns()`, `get_min/max_time/price`, `get_native/display_bucket_size()`, `get_max_qty()`, `set_candle_price_window(low,high)`, `recalibrate_candle_colors()`, `candle_intensity(qty,sensitivity)`, `candle_coverage()`, `candle_depth_seconds()` minute when fits else bounded explicit sampling 60,300,900,3600,14400,86400 never coarser than candles, `get_data_mean/stddev()`, `get_viewport_stats()`, cached viewport stats, PerfStats last_upload_us, columns_uploaded_last_frame, total_valid_columns, `build_column()`, `upload_column()`, `upload_reach_column()`, `apply_liq_spread()` ±2 row Gaussian, `apply_extend_levels()` forward-fill from prev_column_carry, `sync_gpu_from_timeline()`, `find_ring_col()`

**Managers:**
- `orderbook_manager.h`: DoubleBufferedOrderbook = DoubleBuffered<Orderbook>, OrderbookKey exchange+symbol hash, ManagedOrderbook : DoubleBuffered + RealtimeDepthHistory + RealtimeQuotes + quote_epoch + epoch, realtime_epoch atomic, realtime_transport_open atomic, realtime_generation, replay_mode, get_or_create(), apply_book_update_from_pb(), apply_orderbook_snapshot_from_pb(snapshot_pb, observed_source), apply_book_ticker_from_pb(), note_trade_price() adopt traded price for sources whose depth carries none, no-op once feed has real last_price, set_replay_mode(), get_orderbook() returns READ buffer stable entire frame, swap_buffers() copies write→read once per frame dirty only, clear_all() ++realtime_generation, reset_update_ids() zero last_update_id on all when data source changes >> forward skip kills drip-feed, realtime_quote(pair, clock), realtime_ready(pair, clock_ms, required_ms), copy_realtime_since(pair, serial, out), interrupt_realtime() epoch++, set_realtime_transport_open(), prune_orderbook()
- `candle_manager.h`: MAX_CANDLES 200000, LOAD_COOLDOWN_MS 500, INITIAL_PRELOAD 2880, MAX_TICKS 50000 MAX_TICK_AGE_MS 5*60*1000, realtime_trades RealtimeTradeHistory + observer, pair, timeframe_seconds, StreamManager&, deque<Candle> candles_, current_candle building, has_current_candle, last_close_price, carried_candle for replay TF switch re-aggregated from old TF before clear, is_loading, initial_load_complete, oldest_timestamp, flat bar-count paging Binance klines/TradingView, SoA cached_timestamps/opens/highs/lows/closes/volumes/vbuys/vsells + ha_opens/highs/lows/closes Heikin Ashi derived parallel, tick_times/prices recent-tick ring buffer Line chart real-time resolution tick-by-tick not once per close bounded count+age <1MB covering ~5min live frame, handle_trade(), handle_candle(), handle_candle_batch(), update(visible_x_min/max) time-based finalization + auto-scroll-load, change_timeframe(), initial_load(), request_historical(count, end_time_ms), subscribe() registers callbacks on StreamManager called from initial_load() live or DataContext factory replay, mark_ready_for_replay(), set_replay_time(start_time_ms), reset_for_seek(seek_time_ms) clear + re-request historical context, trim_candles_after(cutoff_ms) for << backward skip, set_suppress_candle_messages() trades still build during drip-feed after rewind server candle messages carry FULL 15s tick OHLCV including future, unsubscribe(), build_candle_from_trade(), finalize_current_candle(), adopt_replay_building_candle(), get_candle_timestamp(), replay_playhead_ms() max(start,latest), should_load_more(), check_and_load_more(), rebuild_cache(), ensure_cache() if dirty rebuild, mark_dirty()
- `footprint_manager.h`: TickVolume per minute, CandleFootprint, Comparison SamePrice/Diagonal, Imbalance, Stacks, POC, show_imbalances, show_poc, show_summary V:/D: footer per candle, imbalance_min_volume, stacked_levels 0=off else >=2, imbalance_ratio 3.0, ticks_per_row 0=auto, enabled, symbol→(start_time→CandleFootprint) data_ + live_, available(market,start,as_of_ms), loading_, data_version_ ++ on every on_tick_volume_update, merged_cache_ symbol→(candle_ts→MergedCache), last_symbol/start/end dedupe, candle_count()
- `volume_profile_manager.cpp/h`: VPVR POC/VAH/VAL, buy/sell split, price_profile_renderer
- `tpo_manager.cpp/h`: 30m blocks, candle-range approx not tick occupancy, 30m or smaller timeframe dividing 30m, no candles=no TPO
- `liquidation_heatmap_manager.cpp/h`: 800 bands 0.05%, leverage tiers 25/50/75/100, flow_intensity coverage_frac, reach_prob cone, est_Nx notional by REAL leverage tier, FlowLiquidityUpdate, FlowDeviation pilot, LiqRail MMT zero-overlap render, observed_liquidations, liq_field_brackets/tiers
- `ticker_manager.cpp/h`: global ticker24h always-on, Ticker24hEntry/Update
- `paper_trading_manager.cpp/h`: positions, equity curve ring buffer linearized each frame, journal, by type, PaperPositionUpdate, PaperAccountState, PaperTradingSnapshot
- `drawing_manager.cpp/h`, `workspace_manager.cpp/h`, `scanner_manager.cpp/h`, `analytics_manager.cpp/h`, `candle_bubble_history/display.h`, `flow_positioning.h`, `indicator_series.cpp/h`, `renko_builder.cpp/h`, `preview_candle_store.cpp/h`, `realtime_archive.cpp/h`, `realtime_history.h`, `realtime_quotes.h`, `trade_at_price.h`, `symbol_metadata.cpp/h`, `logo_manager.cpp/h`, `display_time_zone.cpp/h`, `performance_tracker.h`, `data_context.cpp/h`, `data_thread.cpp/h`, `message_handler/parser.cpp/h`, `websocket.cpp/h`, etc.

**Widgets:**
- `chart_widget.h/cpp`: RENDERING ONLY reads CandleManager, ChartType 0..7 Candles FootprintCluster FootprintProfile HeikinAshi Line TPO Renko FlowPositioning, HeatmapType OrderbookDepth VolumeDelta TradeIntensity Liquidations VWAPDeviation, ct_is_time_axis, ct_uses_real_candles, ct_allows_time_overlays, pair(), refresh_instrument() binds real tick+price precision when registry answers after chart built provisional precision PriceFormatter::provisional_for_price never guessed tick, render(), update(), type() Chart, title(), change_timeframe(), set_chart_type(), timeframe_seconds() live source CandleManager title tf lags frame, rt_mode(), subplots_suppressed() rt_mode || Renko, set_rt_dom_linked(), realtime_dom_frame(), set_rt_mode(), toggle_rt_mode(), rt_mode_locked() Free viewer on hosted LIVE feed, replay/local packs open to everyone, toolbar pill padlock, render_realtime_settings(), on_rewind(), liq_opacity() Tweaks, set_liq_opacity() push to reconstructor, liq_field_use_texture() Field render path texture quad GPU vs per-rect CPU, set_liq_field_use_texture(), add_volume/cvd/rsi/macd/funding_rate/oi/vpin_indicator(), reset_overlay_subscriptions() on replay context swap, add_indicator<IndicatorType>, get_indicator_manager(), timeframe_to_string(), is_loading(), CrosshairState is_active plot_pos first_plot_min, reference_context, trade_at_price, realtime_history, realtime_archive, realtime_trade_view, liq_field_renderer, drawing_layer, settings_panel, indicator_manager, etc., selection_escape_consumed(), save_settings() workspace::Json, load_settings(), renko_builder, volume_profile_manager, tpo_manager, symbol_metadata, research_url MoveSnap shift-drag snapped to outcome ladder
- `dom_widget.h/cpp`: pair, AppContext&, StreamKey, title, TradeAtPriceAccumulator trade_accumulator_, tick_size_, levels_per_side_ 25, PriceFormatter fmt_, ladder_center_, manual_center_price_, scroll_offset_, group_mult_ x1/x10/x100, link_rt_ true, rt_frame_ bound per render only, render_linked_ladder(), LinkedRow bid/ask/buy/sell, auto_center_ true, show_trade_columns_ true, display_usd_ false COIN qty vs compact USD notional, max_bid/ask_size bar normalization, RowModel rows_ask_ index0 closest-to-center ask + rows_bid_ + CurrentRowModel row_current_ has_buy/sell delta_pos price_txt[24] buy_txt[16] etc, cache key cache_ob_ts -1, cache_ob_uid -1, cache_acc_rev ~0ull, cache_center 0.0, cache_scroll INT_MIN, cache_group 0, cache_usd false, cache_trade_cols false, build_row_models(ob) re-formats ONLY when input changed book timestamp + last_update_id strictly increasing on every delta/snapshot + accumulator revision + center/scroll/group/display, render_ladder() just draws cached strings/fractions each frame thousands redundant formats/sec avoided at 160fps, handle_keyboard/mouse_input(), update_max_sizes(), fmt_value(qty,price,buf,n) COIN vs USD, fmt_signed(), render_controls(), render_ladder(), render_level_row(RowModel,is_ask,dl,pad_y), render_current_row(), refresh_instrument(), on_rewind() reset accumulator + max_bid/ask
- `orderbook_widget.h/cpp`, `trades_widget.h/cpp` (time & sales size highlight 1-3 whale), `price_profile_renderer.cpp/h` (VPVR renderer), `realtime_dom_frame.h`, `realtime_navigation.h`, `watchlist_widget.h/cpp` (dense grid 384px WATCHLIST_W non-scrolling header stack title bar·filter row·category+venue selectors·SYMBOL/LAST/24H% sort chips pinned above scrolling list dense rows star·sparkline·symbol ellipsized·last·24h% fixed tabular + dim 24h-volume beneath, last/24h%/volume from always-on TickerManager owned by AppShell no subscription here, sparklines client-side ring buffer sampled in update(), categories+price formatting SymbolRegistry, row click switches terminal symbol page-reload flow, Sort Symbol/Change/Volume/Price asc/desc active-volume sort turns row volume bars accent, star favourites in-memory only no persistence yet, compact toggle auto when rail dragged narrow drop sparkline denser, SPARK_N 30 SAMPLE_MS 2000, Spark v[30] head next write count valid push(), selected_category_ -1=All, selected_exchange_ empty=all venues, sort_ Volume sort_desc_ true Symbol defaults A->Z others biggest first, categories_ + category_counts_ aligned, all_count_ active-symbol total All count, scoped_count_ active after exchange filter, exchange_counts_ Binance Futures Hyperliquid, categories_loaded_, favorites_ unordered_set, compact_ user toggle, cat_search_ popover substring filter, sparks_ map pair key→samples sampled in update(), visible_ cached visible list rebuilt when filter/sort/ticker changes, prev_ticker_ms, last_resort_ms, prev_search, prev_category, prev_exchange, prev_sort, prev_sort_desc, rebuild_visible(), build_category_counts(), render_title_bar(), render_filter_bar(), render_category_selector(), render_sort_header(), render_rows(), draw_sparkline(), save/load_settings workspace::Json, type() Watchlist, title() Watchlist, update_frequency() Slow)
- `positions_panel.h/cpp`: global not per-symbol reads PaperTradingManager, tabs Positions active+account summary, Equity curve linearized ring buffer each frame, Journal, By type, render_account_summary(acct,open_pnl), render_positions/equity/journal/by_type_tab(), format_duration(), type() PaperTrading, title() Paper Trading, update_frequency() Standard, equity_cache_ vector<EquityPoint>
- `drawing/`: drawing_toolbar.cpp/h, drawing_layer.cpp/h, drawing_icons.cpp/h, drawing_types.h, drawing_style_editor.cpp/h
- `indicators/`: indicator_base.h, indicator_manager.cpp/h, indicator_tokens.h, volume_indicator.cpp/h, cvd_indicator.cpp/h (cumulative Volume Delta rendered as candlesticks open=prev cumulative close=current cumulative high/low intra-candle extremes green rising red falling, add_candle(time,vbuy,vsell), add_candle_with_cvd(time,delta,cvd_high,cvd_low), set_building_candle(), set_timeframe(), bar_count(), render_content(x_min,x_max), get_y_limits(), update(), clear(), get_name() CVD, get_y_formatter() abbreviated 1.2M -350K, get_latest_value() current cumulative colored rising/falling, format_latest_value(), DeltaBar time delta cvd_high/low has_hl Volume stream, CVDCandle time open close high low bullish, timeframe_seconds_ 300, building_time/delta has_building cache_dirty rebuild_cache()), rsi_indicator.cpp/h (period 14), macd_indicator.cpp/h (fast 12 slow 26 signal 9), funding_rate_indicator.cpp/h, oi_indicator.cpp/h, vpin_indicator.cpp/h, etc.
- `stats_widget.cpp/h`, `debug_widget.cpp/h`, `replay_library_widget.cpp/h` manifest-driven browser free curated .edpack recordings local replay regression testing, `research_moment_panel.cpp/h`, `workspace_settings.cpp`, `settings_panel.h`, `custom_implot.cpp/h`, `datetime_picker.cpp/h`, `widget.h` base save_settings/load_settings type title update_frequency update render on_rewind refresh_instrument

**Data flow (from ARCHITECTURE.md + REALTIME_DEPTH.md):**
- StreamManager keys subs by pair, stream, timeframe, ref-counted first sub JSON sub final unsub, global/shared streams explicit rules, historical requests same control channel
- Live binary frame path: Browser WS callback copies bytes → DataThread inbound queue mutex-protected owned by DataThread → drain batches → MessageParser zstd magic detect decompress thread-local context → pb::WSPayload parse → MessageHandler switch numeric Stream parse inner protobuf → orderbook write model OR DispatchQueue typed callback → StreamManager or dedicated manager → CandleManager, trades, stats, heatmaps, liquidation, profiles, indicators → widgets read active managers during update/render → ImGui draw lists → WebGL2
- RT depth: Select RT in timeframe menu default combines observed resting liquidity historical best bid/ask steps received trade records opens without candles right gutter current fresh book, startup history up to 30s recent depth identified trades while live continues depth observed every 500ms up to 128 levels each side historical coverage shorter after server restart gaps busy bursts chart shows depth and trade coverage separately RT settings limits, community gateway currently live observations only selecting RT against gateway does not manufacture history from initial book snapshot client change requires matching server endpoint, bubble center received trade timestamp+execution price radius size square-root 3px-12px cap values >=16x min share cap flat signed fills thin dark edges newer on top individual centers at received timestamps/prices up to 1500 qualifying records draw individually denser grouped time+side whole visible period grouped centers avg price latest contributing timestamp archive preserves original records dense queries group all received volume before rendering auto size based on 75th percentile received quote notionals over 60s after >=32 eligible records reference stays fixed until explicit recalibration/replay reset recalibrate bubble sizes reset automatic reference deliberately resizes refilters historical bubbles, quote lines synchronized depth observations keeping first actual event in each 100ms display bin trades own source timestamps separate streams not atomic quote-and-trade record prices can move between observations aggressive order can execute at several prices trade center outside displayed sampled spread possible not proof erroneous fill nor executable quote at exact instant never clamp trades to drawn lines Binance documents separate depth and trade streams, detail resolution each bubble one received record dense views summed volume at avg prices zoom restores individual source may aggregate fills no trade IDs for dedup renderer preserves received price/time/qty/side cannot verify every exchange fill from screenshot, settings table Timeframe>RT Pause display freeze displayed book clock trades while collection continues replay transport pause, 1s observed candles partial OHLC from received trades not historical backfill, Trade-price line connect eligible observed trade prices, Trade bubbles show/hide, Auto market size default on minimum based 75th percentile quote notionals 60s after >=32 fixed until recalibration/replay reset, Recalibrate bubble sizes, DOM Link RT default on use matching RT chart sampled book display clock exact price-to-screen mapping includes buys sells delta CVD, Minimum trade value with auto off set price*qty quote units USDT threshold manual 10k default, Layers>Depth settings Fidelity UHD/HD/SD/LD/ULD min grouping 1/2/5/10/20 native ticks auto-fit may use coarser disable to keep fixed, RT settings Auto-fit visible history default on expand to fit observed prices visible time interval padding group rows keep linked DOM readable reduce grouping only after 5s spare room price-axis zoom vertical pan enters manual inspection Follow price resumes fitting, Cool-to-warm palette default deep-blue/cyan/yellow/orange/red same fixed intensity scale, Recalibrate colors explicitly recalibrate brightness currently visible liquidity deliberately recolors history normal updates do not, Chart navigation Time zoom/Follow show 5s through retained session whole session fits 30min target Return live restores 60s view wheel zoom keeps Following live/replay both directions pan detaches zoom in keeps inspected history while running zoom out resumes Follow paused history stays detached both directions Follow returns current display clock without unpausing use Pause display/replay transport to resume time price auto-fits eligible visible trades quote steps, linked DOM charts render before DOMs each frame ladder consumes chart final price bounds absolute screen coordinates after zoom pan resize never independently recenters stretches prices to fill own panel hidden chart waiting state not stale transform, linked mode same immutable sampled book as RT chart including 100ms sampling 512-level-per-side coverage 15s freshness boundary live display pause replay as-of clock does not use independent DOM current read buffer 6 columns buys bids price asks sells delta trade flow advances only through chart clock CVD header received buy qty minus sell qty since latest reset resets every 5min market time not wall time starts when RT enabled not backfilled exchange-session total CVD stays base qty when row display switches quote value, header prints exact best bid/ask spread price units native ticks Native BBO or Depth BBO identifying quote source native quotes sampled depth separate ages at chart clock pause freezes both ages one-tick spread may be smaller than one screen pixel two gutter markers separate horizontal halves both identifiable without moving vertically no minimum visual spread manufactured, wider price ranges nearby native ticks summed readable rows Auto N ticks/row prices are centers states effective grouping PRICE labels bucket centers not native executable quotes bids asks can share grouped row both resting depth traded volume same row groups as RT heatmap automatic grouping changes display grid recalibrates colors does not rewrite retained observations or move trade coordinates zooming back in restores finer retained detail best bid/ask lines retain exact prices printed header Qty/Quote toggles row amounts base qty sum actual price*qty, live depth interruptions request fresh seed after 3s unhealthy RT state retries no more than once every 5s per subscription sequence validation strict missing interval visible replay never requests live recovery unverified pack seeks withhold depth header identifies live/replay paused state, pausing freezes CVD flow columns along with chart reception bounded 20000 pending trade records long busy pause exceeds budget resuming starts fresh totals displays reset after gap instead incomplete accumulation as continuous CVD, simple vertical DOM/tape split linked mode temporarily hides matching tape so ladder can use full right column turning linking off leaving RT restores tape split floating tabbed arrangements preserved rows outside custom panel bounds clipped never moved to fit independent mode explicitly labelled may continue updating while RT chart live display paused close independent panel or restore linking when comparing frozen chart depth, historical depth stays fixed observation owns original time prices quantities new columns GPU rebuilds use...

---

## 3. LSE Terminal Default Color Mapping — Exact UI, No Changes, Our Colors

**Our terminal dark default (from style.css):**
- `--bg #1c1c1c` floor below old #212121 panels tile visibly depth floor/surface gap
- `--panel #2a2a2a` panels
- `--edge #3a3a3a` borders
- `--hairline rgba(255,255,255,.045)` machined top edge major surfaces
- `--text #e8e8e8`, `--dim #b9b9b9` readability floor ≥7:1
- `--up #21b3a4` teal, `--down #f0426c` red-pink (close to EdgeDepth teal/rose)
- `--bg2 #262626` code wells previews, `--hover #343434` card+row hover, `--active #414141` selected rows, `--quote #2e2e2e` user chat turn, `--item #2f2f2f` keybar list items, `--raise #414141` primary Run/OK, `--raise-h #4c4c4c`, `--line-strong #555555` focus, `--accent-bar #d0d0d0` active tab underline selected row bar, `--title #c0c0c0` section+table headers, `--dash #474747` dashed drop-zone, `--scroll #3a3a3a` thumb, `--scroll-h #474747`, `--err #f87171`, `--ohlcv-bg #1b4a42` `--ohlcv-tx #7fe0d2`, `--shadow rgba(0,0,0,.55)`, `--overlay rgba(0,0,0,.62)`, `--legend-shadow 0 1px 2px #000`
- Density: `--t-2xs 9px` micro caps, `--t-xs 10px` dim labels section text, `--t-sm 10.5px` body, `--t-md 11px` inputs strong body prices, `--t-lg 11.5px` panel headers toolbar, `--t-xl 12px` page titles big glyphs, `--t-2xl 12.5px` display, `--t-3xl 14px`, `--t-4xl 16px`, `--row-y 1px` dense
- Fonts: `-apple-system, Segoe UI, Roboto, sans-serif`, `--mono ui-monospace, Cascadia Code, SFMono-Regular, Consolas, monospace`, `--code-font Consolas, Cascadia Mono, ui-monospace, SFMono-Regular, Menlo, Courier New`
- Chrome: header/top edge inset 0 1px 0 var(--hairline), acct-dock inset+lift shadow, header double rule inset + 0 4px 0 -3px var(--edge), sidebar category heads bands background var(--bg2) border-top, positions table banded header bg var(--bg2) border-bottom zebra tr:nth-child(even):not(:hover) td bg var(--bg2), timeframe buttons mono tabular, account summary keys mono letter-spacing .08em, toolbar group seams vertical rule nav#timeframes border-right 1px var(--edge)

**Mapping table (exact UI, our colors):**

| EdgeDepth | LSE | Mapping Logic |
|---|---|---|
| --bg-base #05070a | --bg #1c1c1c | app background behind all panels — our zinc floor, not deep black (banned) |
| --bg-panel #0a0e12 | --panel #2a2a2a | panel fill — our charcoal, lifted ~0x12-0x14 ladder bg<bg2<panel<hover<edge<active |
| --bg-elev #0d1217 | --bg2 #262626 | panel headers / elevated chrome |
| --bg-input #11171d | --bg2 #262626 | inputs, idle controls |
| --bg-hover #161d25 | --hover #343434 | hover state |
| --bg-active #1d2630 | --active #414141 | active/pressed/rails |
| --bd-1 rgba(150,168,184,.07) | --edge #3a3a3a + --hairline rgba(255,255,255,.045) | hairline dividers — machined top edge |
| --bd-2 rgba(...0.13) | --edge #3a3a3a | control borders emphasis |
| --bd-3 0.22 | --line-strong #555555 | hover borders focus |
| --grid rgba(...0.045) | --edge #3a3a3a 0.045 or --hairline | chart gridlines |
| --tx-1 #e9eff5 | --text #e8e8e8 | prices primary values |
| --tx-2 #98aab8 | --dim #b9b9b9 | labels secondary data |
| --tx-3 #5f6f7c | --dim #b9b9b9 | muted captions |
| --tx-4 #3a4651 | --dim #b9b9b9 0.7 | axis ticks disabled |
| --up #15c99e teal | --up #21b3a4 teal | up candle/bid/positive — close, keep ours |
| --down #ff4d6d rose | --down #f0426c | down candle/ask/negative — close, keep ours |
| --brand #22c5db cyan | --accent-bar #d0d0d0 neutral + keep cyan ONLY for brand D mark (3 streaks) identity, not on-state, else neutral per no-neon rule chrome stays neutral nothing glows | focus selection replay accents play control used sparingly |
| --warn #f3b24a amber | --warning #c58435 or #d0a24a | replay/live badge POC line event flags |
| Hanken Grotesk UI | -apple-system Segoe UI Roboto | chrome labels headings — our terminal default sans |
| JetBrains Mono mono tabular | --mono ui-monospace Cascadia Code SFMono + --code-font Consolas Cascadia Mono | ALL numerics tabular tnum zero — already in index.css .font-mono tabular-nums |
| r1 3px r2 5px r3 8px pill 999px | 2px corners (LSE) but keep EdgeDepth radii for exact UI? User says same UI no changes but color default of our terminal — so keep EdgeDepth radii (3/5/8) for exact UI, but use LSE density scale 9px-16px for type |
| topbar_h 44 statsbar_h 33 watchlist_w 254 rightcol_w 388 indicator_pane_h 172 | Keep exact EdgeDepth layout 44/33/254/388/172 for exact UI replica — our sidebar was 236px but we go 254px to match EdgeDepth |
| heatmap liquidation viridis default + magma/inferno/ember | Keep exact EdgeDepth colormap src — market data color lives only in chart, not chrome, so keep ember-k 15 stops exact, viridis stops exact, ocean ramp exact |
| density 8/10 row-h 20.5px | Our density v2 row-y 1px t-sm 10.5px t-md 11px — keep our density scale but apply to EdgeDepth rows (dense list) |

**Smart thinking:** Keep layout/pixels exact, swap chrome colors to our zinc neutral, keep market data colors exact (teal/rose, viridis/magma/inferno/ember, ocean) because color lives only in market data per LSE house rule. Brand D mark stays cyan identity.

---

## 4. Deduplication — RSI etc.

**We already have (LSE):**
- RSI (14), MACD (12,26,9), Volume, CVD, etc in ProChart + indicatorRegistry
- Candlesticks, Line, Heikin Ashi, Renko (maybe), drawing tools (trendline, fib, etc), watchlist, positions, orderbook, DOM, trades, VPVR, TPO, etc.

**EdgeDepth has that we don't (or better):**
- Funding Rate indicator (funding_rate_indicator.cpp) — funding + countdown hh:mm:ss until next_funding_time, from Stat stream
- Open Interest indicator (oi_indicator.cpp) — open_interest_usd, oi_open/high/low/close, OI change 24h
- VPIN Toxicity (vpin_indicator.cpp) — VPINStateUpdate vpin, regime Normal/Elevated/High/Critical, buy/sell pressure unused, mark_price, hmm_state 0-3 or -1 warmup/fallback, hmm_confidence, order_imbalance most recently COMPLETED volume bucket, VPINHistoryPoint time_ms bucket end_time volume-clock grain irregular timestamps, CFTIUpdate vpin_score delta_imbalance_score volume_accel_score flow_persistence_score composite_score regime normal..extreme confidence directional_bias alignment_boost_active elevated_components regime_changed previous_regime, ContagionSnapshot market_stress 0..1 stress_regime calm/elevated/stress/crisis
- Flow & Positioning (flow_positioning.h) — chart view aligning selected-minute aggression with raw open-interest contracts and reported liquidations, missing and stale states explicit, JSON export, needs backend get_flow_positioning, community gateway reports unavailable rather than inventing
- TPO market profile exact: 30m blocks candle-range approximation not tick-by-tick time occupancy, choose 30m or smaller timeframe dividing 30m, no candles=no TPO, TPOBlock, TPOPeriod, TPOSession 15 periods
- Footprint cluster/profile exact: TickVolume per minute, buy/sell delta, imbalance SamePrice/Diagonal, ratio 3.0, min volume, stacked_levels 0=off else >=2, POC, summary V:/D: footer per candle, right-click Imbalances menu
- Volume profile VPVR exact: POC/VAH/VAL, buy/sell split, price_profile_renderer
- Liquidation heatmap layers: dense Field computed client-side from candles (works any feed), leverage-tier levels, profile rendering, Field swap scorer gate, FlowLiquidityUpdate same 0.05%×800 band grid as LiquidationHeatmapUpdate, LiqRail MMT zero-overlap render lifecycle, observed_liquidations, liq_field_brackets/tiers, liq_field_renderer texture quad GPU vs per-rect CPU, opacity, use_texture knob, reach modulation cone, Hyperliquid liq levels ground-truth predictive liquidation levels clearinghouseState census P2e REAL open positions liq prices NOT modelled heatmap reuses LiquidationHeatmapUpdate est_Nx notional by REAL leverage tier flow_intensity coverage_frac distinct stream id 34 so real vs modelled never conflate, PatternDetected TrendlineData Point MarketContext, Exposure V2 bands pilot, Exposure V2 settings, Hyperliquid exposure settings
- Trade bubbles large prints exact: live tape large prints drawn inside own bar at received price/time sized by value thinned to screen budget zoom reveals more, any feed supplies live prints recorded bubbles earlier bars need backend get_candle_bubbles, settings: auto market size default on minimum based 75th percentile received quote notionals 60s after >=32 eligible records reference stays fixed until explicit recalibration/replay reset, recalibrate bubble sizes reset automatic reference deliberately resizes refilters historical bubbles, minimum trade value with auto off price*qty quote units USDT threshold manual 10k default
- DOM ladder exact: independent depth grouping USD/coin modes trade columns or default RT link sharing chart price positions sampled book pause state, RT guide, auto_center, Coin/5m Settings, BUYS/BIDS/PRICE/ASKS/SELLS/DELTA 6 columns buys bids price asks sells delta, trade flow advances only through chart clock CVD header received buy qty minus sell qty since latest reset every 5min market time not wall time, header prints exact best bid/ask spread price units native ticks Native BBO or Depth BBO, one-tick spread may be smaller than one screen pixel two gutter markers separate horizontal halves, nearby native ticks summed readable rows Auto N ticks/row prices are centers PRICE labels bucket centers not native executable quotes bids asks can share grouped row both resting depth traded volume same row groups as RT heatmap grouping changes display grid recalibrates colors not rewrite retained observations, Qty/Quote toggles base qty sum actual price*qty, live depth interruptions fresh seed after 3s unhealthy RT state retries no more than once every 5s per subscription sequence validation strict missing interval visible, pausing freezes CVD flow columns reception bounded 20000 pending trade records long busy pause exceeds budget resuming fresh totals displays reset after gap, vertical DOM/tape split linked mode temporarily hides matching tape so ladder can use full right column, floating tabbed preserved rows outside custom panel bounds clipped never moved, independent mode explicitly labelled may continue updating while RT chart paused
- Watchlist exact: dense grid 1b 384px? Actually 254px per tokens but 384px per watchlist_widget.h comment, non-scrolling header stack title bar·filter row·category+venue selectors·SYMBOL/LAST/24H% sort chips pinned above scrolling list dense rows star·sparkline·symbol ellipsized·last·24h% fixed tabular + dim 24h-volume beneath, last/24h%/volume from always-on TickerManager owned by AppShell no subscription here, sparklines client-side ring buffer sampled in update() 30 samples 2s cadence, categories+price formatting SymbolRegistry, row click switches terminal symbol page-reload flow, Sort Symbol/Change/Volume/Price asc/desc active-volume sort turns row volume bars accent, star favourites in-memory only no persistence yet, compact toggle auto when rail dragged narrow drop sparkline denser variant, categories_counts, all_count, scoped_count, exchange_counts Binance Futures Hyperliquid, favorites_ unordered_set, compact_, cat_search_, sparks_ map, visible_ cached, prev_ticker_ms, last_resort_ms, rebuild_visible(), build_category_counts(), render_title_bar/filter_bar/category_selector/sort_header/rows(), draw_sparkline(), save/load_settings, type Watchlist, title Watchlist, update_frequency Slow
- Scanner: every symbol feed lists 24h stats, composite scores, 900 symbols 737 Binance USDT-M perps counted 2026-08-15 exchanges list/delist drift, MarketScannerUpdate, ScannerEntry
- Paper Trading: simulated positions against live data, global panel not per-symbol reads PaperTradingManager, tabs Positions active+account summary, Equity curve linearized ring buffer each frame, Journal, By type, PaperPositionUpdate, PaperAccountState, PaperTradingSnapshot, account summary, equity tab, journal tab, by type tab, format_duration()
- Replay Library: manifest-driven browser free curated .edpack recordings local replay regression testing, PackReplayEngine, ReplayHistoryBuffer, ReplayManager, edpack docs, replay-library manifest.json, .edpack self-contained no server, deterministic replay engine scrubbing, isolated DataContext active context override via AppContext pointers, replay transport bottom 66px, scrub-preview candle batch full replay window candles ghost-rendering ahead of playhead distinct stream id 33 so batch never routed into main candle series deliberate future-leak replay sessions only, preview_candle_store
- Layers: session VWAP HLC3 weighted by base volume not exact trade-price VWAP previous-day/week high low close right-click anchor VWAP sessions start midnight UTC weeks Monday missing bars stop VWAP suppress incomplete period levels Load reference history when offered data source still determines coverage TPO and Renko do not display overlays
- Drawing: drawing_toolbar, drawing_layer, drawing_icons, drawing_types, style_editor, drawing_manager, education_boot, etc., 20 tools exact icons
- Appearance: market colors Teal/rose classic muted, alt_candles conventions, alt_accents indigo amber mono, Interface accent Neutral Mint Indigo Amber Mono, Reset appearance, Colormap Ember Inferno Magma Viridis, Intensity Gamma Low Peak Noise floor Tick-per-row Half-life, Opacity 0.90, 2.0 Gamma, p0.19 Low, p0.9985 Peak, 0.020 Noise floor, 6 bps Tick-per-row, 16 h Half-life
- Data: lse-api still works /api/candles /api/orderflow/* /api/providers broker:*, orderflow from broker if broker provides L2 else fallback crypto feeds Binance 20ms Coinbase 50ms Hyperliquid 15ms, no blank fallback chain binance/coinbase/hyperliquid→demo→lse, ultra-fast tiers 66Hz/15ms hyperliquid 50Hz/20ms binance 20Hz/50ms coinbase 33ms lse, MT5-like speed
- Bottom status: symbol·WS·FPS·present interval·UTC timezone picker 37 zones

**Deduplication rule:**
- If LSE already has RSI (14) etc, keep ONE implementation — use LSE's indicatorRegistry but render with EdgeDepth UI (subplots render in order, toggles flip live, menu stays open, esc close, height_ratio 0.25 CVD, etc.)
- If LSE missing Funding Rate, OI, VPIN, Flow & Positioning, TPO, Footprint cluster/profile exact, Liquidation heatmap with Ember/Viridis/Magma/Inferno + intensity settings, Trade bubbles large prints, DOM BUYS/SELLS/DELTA, Watchlist categories/venues/score, Replay Library, Paper Trading equity curve, Layers 4 ON, Exposure V2 bands, Hyperliquid liq levels ground-truth — implement new from EdgeDepth exact src.

---

## 5. Zero Errors / Lag / Blank Strategy — Smart Thinking

### No Blank (past failures: candles 502, of_depth 404, of_book 404, zero-size canvas)
- **Fallback chain:** `/api/candles?provider=binance` → try binance, if 502 try coinbase, hyperliquid, demo, lse, map BTCUSDT→BTC for demo, return 200 with X-Fallback-Provider, final fallback demo BTC if all fail (already implemented, keep)
- **of_depth fallback:** live_only providers return demo history DEMO:BTC/ETH with fallback:true instead of 404, heatmap always has data (already implemented, but enhance to store rolling 4h buffer in memory like gateway 60min/50k cells, not just demo)
- **of_book fallback:** returns orderflow_manager.get_book live snapshot with active_levels override, or {live:true,bids:[],asks:[]} empty live_only, never 404 (already)
- **Canvas zero-size:** containerRef ResizeObserver + DPR sizing, check rect.width<10 or height<10 return, canvas.width/height = clientWidth*dpr each frame (already fixed)
- **PriceRange auto:** from BBO mid±max(spread*10,1%), fallback BTC 60k-70k ETH 2.5k-3.5k, follow live edge 1s, reconnect 2s, BBO chips + trade bubbles overlay, Legacy fallback button
- **Mount ProChart empty overlay:** Loading {symbol} {tf} {provider} ⚡15ms/20ms/50ms with fallback hint and api url, Reload + Reset Panes buttons (already)
- **Build:** chart.js 284KB depth 140KB, manualChunks vendor, lazy Suspense Fallback Loading…

### No Lag / Ultra-Fast / MT5-like / 50ms / Binance faster than Coinbase
- **WS tiers already:** tick pump `/api/ws` 15ms hyperliquid 20ms binance 50ms coinbase 33ms lse, orderflow ws `/api/orderflow/ws` 66Hz/15ms hyperliquid, 50Hz/20ms binance, 20Hz/50ms coinbase, subscribed frame includes flush_ms+hz, full ws same tiers
- **Double-buffer:** OrderbookManager write_buf mutex, read_buf stable entire frame, swap once per frame ~50-100μs FlatMap memcpy cache-friendly, copy instead pointer swap to avoid half-mutated state during WS callback
- **DispatchQueue 3ms budget:** drain in order, remainder carried, prevents ingest burst consuming entire frame, widget callbacks + GPU work on render thread
- **RowModel cache (DOM FPS item 2026-07-05):** build_row_models() re-formats ONLY when input changed ob timestamp + last_update_id strictly increasing + acc_rev + center/scroll/group/display, render_ladder() just draws cached strings/fractions each frame, per row grouped FlatMap binary searches + up to 6 snprintf at 160fps thousands redundant avoided
- **SoA cache (CandleManager):** timestamps/opens/highs/lows/closes/volumes/vbuys/vsells + ha_* Heikin Ashi parallel, cache_dirty_ rebuild, prepend shift for scroll-load
- **GPU ring buffer:** 8192×1024 R32F + meta + reach, scroll/zoom only uniforms zero CPU, LUT texture 256x1, discard_threshold 0.07 liq vs 0.004 orderbook, viewport stats cached avoids iterating timeline every frame, PerfStats last_upload_us columns_uploaded_last_frame
- **Watchlist virtualization:** 1503 rows, SPARK_N 30 samples SAMPLE_MS 2000, rebuild_visible() only when filter/sort/ticker changes, sparkline ring buffers sampled in update() Slow frequency
- **rAF 60fps:** formingMorphRef easing 0.35 ~96% at 60fps MT5 glide, offscreen canvas double-buffering blit single drawImage eliminates ghost chart flicker when drawing >16ms large datasets + many indicators
- **Binance faster than Coinbase:** Binance _WS_OPEN_TIMEOUT_S 0.3s faster than Coinbase 0.8s, _BACKOFF_CAP_S 0.3s faster, flush 20ms vs 50ms, but underlying Binance depth20@100ms is 10Hz venue limitation document honesty, Hyperliquid 15ms fastest for ultra-fast demo
- **No lags verification:** console ws flush_ms+hz, FPS counter 58-60 fps bottom, trade bubbles square-root radius 3px-12px cap 16x min, up to 1500 individual

### No Errors
- **Capability detection:** `capabilities()` discards depth_history for live_only providers honesty, trade_history uses recentTrades REST honest short history seconds deep not faked, liquidation_stream proxy large trades >100k notional for Hyperliquid no public liq stream
- **Symbol validation:** BTCUSDT Binance, BTCUSD Coinbase, BTC Hyperliquid, BTC demo, mapping layer frontend+backend, demo symbol mapping
- **Geo law D14:** Binance trading domains fapi/api.binance.com answer geo-restricted egresses HTTP 451 datacenter/ISP WAF 418/TLS drops legal/network answer not out-coded, public data mirror data-api.binance.vision/data-stream.binance.vision spot shape no eligibility gate, two-rung ladder venue first mirror on geo/WAF/unreachable trigger, winner pinned after first success chart paths never re-race, venue label always says which rung fed data binance/binance-spot honesty not bug
- **Error boundaries:** try/catch around WebGL2 compile, fallback to Canvas2D DepthHeatPane, WebGL2 not available warning, error messages with venue own code/message not retry masquerading as truth, 429 rate answer not flipped to mirror
- **Hosted guard:** _LocalOnlyGuard rejects cross-site DNS-rebinding Host must be loopback Origin must be loopback, _HostedRateLimit per-client token bucket 300 capacity 5/s refill heavy costs 40 dataviz 12 sim etc max 20000 clients evict stalest quarter
- **Thread safety:** orderbooks_ unordered_map mutex per ManagedOrderbook write_mutex, realtime_epoch atomic, realtime_transport_open atomic, realtime_generation, replay_mode, prune_orderbook()
- **Workspace persistence:** localStorage layout kinds, drawings per instrumentKey provider:symbol, indicators per instrumentKey, workspace JSON export/import, one panel per type v1, browser storage can be cleared export setups you need to keep

---

## 6. Implementation Phases — Exact UI Replica with Our Colors, No Errors/Lag/Blank

### Phase 0: Baseline & Study (done)
- Audit src + screenshots, tokens, theme, managers, widgets, data flow
- Document color mapping, deduplication, zero-error strategy
- Verify current MARKET page no blank fallback chain Loading+Reload/Reset

### Phase 1: Heatmap — Exact EdgeDepth Shader Renderer + Our Colors (3 days)
- Backend: store rolling 4h depth history in memory for live_only providers (like gateway 60min/50k), /api/orderflow/depth returns events bids/asks per column_ms + trades + price precision, /api/orderflow/heatmap mirroring pb::HeatmapSnapshot timestamp_ms price_min bucket_size max_qty qtys RLE flags, column_interval_ms = timeframe per candle_depth_seconds logic 60,300,900,3600,14400,86400 never coarser than candles
- Frontend: EdgeDepthGPUHeatmap.ts keep exact frag/vert + ember/viridis/magma/inferno stops exact + ocean ramp exact + alpha curve exact, but chrome bg = var(--panel) #2a2a2a not #0b0e11, border = var(--edge) #3a3a3a, text = var(--text) #e8e8e8, dim = var(--dim) #b9b9b9, up = var(--up) #21b3a4, down = var(--down) #f0426c, settings window bg var(--panel) border var(--edge) shadow var(--shadow)
- EdgeDepthHeatmapPane.tsx: containerRef ResizeObserver DPR, priceRange auto BBO mid±max(spread*10,1%) fallback BTC 60k-70k ETH 2.5k-3.5k, follow live edge 1s, reconnect 2s, BBO chips, trade bubbles overlay, colormap picker Ember/Inferno/Magma/Viridis + Opacity 0.90 + Style Intensity Gamma Low Peak Noise floor Tick-per-row Half-life exact UI from screenshots, timeframe segmented control 1s-1d exact, provider switch Binance 20ms Coinbase 50ms Hyperliquid ⚡15ms LSE 33ms with live status, sensitivity slider, bucket mult, reach toggle, linear toggle, follow/free, bubbles toggle, legacy button, settings cog
- Verification: Binance faster than Coinbase (console flush_ms+hz), Hyperliquid fastest ⚡15ms button visible, no blank, 60 fps, MT5-like glide

### Phase 2: AppShell — TopBar + StatsBar Exact + Our Colors (2 days)
- TopBar.tsx 44px: brand mark D 3 streaks exact SVG viewBox 300x132 h 104 y 14..118 cyan #22c5db or #00e5ff identity, but bg = var(--bg2) #262626 + gradient var(--bg2)->var(--panel) per edgedepth.css, border-bottom 1px var(--edge), brand-name font-weight 700 14px letter-spacing -.01em, span brand color, tb-div 1px 20px bg var(--edge) margin 0 4px, sym-pill height 30px padding 0 9px 0 7px border 1px var(--edge) radius var(--r2) 5px bg var(--bg2) hover border var(--line-strong) bg var(--hover), sym-icon, display_name BTC/USDT, base_asset BTC logo, TF segmented control 1s-1d favourites 6/6 full bar + dropdown, chart type Candles dropdown, heatmap type, provider switch, Live/Replay segmented +Widget Draw, Courses Live Replay Workspace, theme toggle sun, fullscreen, profile, edit pencil
- StatsBar.tsx 33px: Last, 24h%, Funding + countdown hh:mm:ss next_funding_time, Open interest $9.45B, Volume 24h $24.55B, Market details right, mark_price, funding, OI, liq total/long/short, CVD, volume, timezone picker 37 zones compact_offset_label UTC+00:00→UTC, mono tabular, bg var(--panel) #2a2a2a border-bottom var(--edge), text var(--text) #e8e8e8 dim var(--dim) #b9b9b9 up var(--up) down var(--down)
- Backend: /api/orderflow/stats + /api/tickers global ticker24h always-on
- Verification: pixel match to screenshots but colors #1c1c1c/#2a2a2a/#3a3a3a not #05070a/#0a0e12

### Phase 3: LayoutManager — Dockspace Exact + Our Colors (2 days)
- top_reserve 44+33=77px, bottom_reserve transport 66px replay control, status_reserve telemetry, left_reserve drawing rail 32px
- setup_default_layout(exchange,symbol) docks by EXACT title string Chart BTC/USDT 1m, DOM BTC/USDT, Trades BTC/USDT, Watchlist, Paper Trading, etc., layout_matches(ex,sym) check, reset_layout_for, restore_layout_for, vertical_siblings()
- layoutStore panelKinds setPanelKind setLayout syncSettings persist localStorage lset-layout-kinds
- Frontend: bg var(--bg) #1c1c1c floor, panels bg var(--panel) #2a2a2a border var(--edge) #3a3a3a, machined top edge inset 0 1px 0 var(--hairline), double rule header 0 4px 0 -3px var(--edge), banded wgroup bg var(--bg2) border-top, zebra rows
- Verification: drag split persist symbol switch rebuilds dock if layout doesn't match, 1503 pairs Watchlist left 254px, Chart center, DOM right 388px, Trades right-bottom, Positions bottom, Drawing rail left 32px

### Phase 4: ChartWidget — Center with All Overlays Exact + Our Colors (5 days)
- ChartType 0..7 Candles FootprintCluster FootprintProfile HeikinAshi Line TPO Renko FlowPositioning, ct_is_time_axis, ct_uses_real_candles, ct_allows_time_overlays
- Heatmap overlay shader renderer render_cells between BeginPlot/EndPlot time_offset_ms bucket_multiplier opacity sensitivity extend_levels forward-fill linear filtering reach modulation
- Liquidation Field dense 800 bands 0.05% client-side from candles any feed, leverage-tier levels profile rendering Field swap scorer gate FlowLiquidityUpdate 0.05%×800, LiqRail MMT zero-overlap, observed_liquidations, liq_field_brackets/tiers, texture quad GPU vs per-rect CPU opacity use_texture knob
- Trade bubbles large prints live tape inside own bar received price/time sized by value thinned screen budget zoom reveals more any feed supplies live prints recorded bubbles earlier bars need get_candle_bubbles, settings auto market size 75th percentile 60s after >=32 fixed until recalibration, recalibrate bubble sizes, minimum trade value 10k manual
- Volume CVD RSI MACD Funding Rate Open Interest VPIN Toxicity subplots render in order height_ratio 0.25 CVD, toggles flip live menu stays open esc close, suppressed when RT mode or Renko
- RT mode pill follow-live streaming live-edge dot rt_dom_linked, rt_mode_locked Free viewer hosted LIVE feed padlock, replay/local packs open, render_realtime_settings(), rewind
- Crosshair, drawing_layer, layers session VWAP HLC3 weighted base volume not exact trade-price VWAP previous-day/week high low close right-click anchor VWAP sessions midnight UTC weeks Monday missing bars stop VWAP suppress incomplete period levels Load reference history, TPO Renko no overlays
- Backend CandleManager SoA building candle historical batch scroll-load tick ring 50k/5min
- Verification: all chart types switch without blank, heatmap overlay scroll/zoom zero CPU uniforms only, layers 4 ON count

### Phase 5: DOM Ladder + Orderbook + Trades Exact + Our Colors (4 days)
- DomWidget right 388px RowModel cache FPS item rebuild ONLY when ob ts/uid acc_rev center/scroll/group/usd changed render_ladder just draws cached strings/fractions, TradeAtPriceAccumulator BUYS/SELLS/Δ, group_mult x1/x10/x100, display_usd COIN qty vs compact USD $K/M/B, auto_center true show_trade_columns_ true ladder_center_ manual_center_price_ scroll_offset_, max_bid/ask bar normalization book-imbalance meter, linked ladder RealtimeDOMFrame 2-min axis, 6 columns BUYS BIDS PRICE ASKS SELLS DELTA mono tabular, BBO highlight yellow, spread price units native ticks Native BBO Depth BBO, one-tick spread smaller than one pixel two gutter markers separate horizontal halves, nearby ticks summed readable rows Auto N ticks/row prices centers PRICE labels bucket centers not native executable quotes bids asks can share grouped row same row groups as RT heatmap grouping changes display grid recalibrates colors not rewrite observations zoom restores finer detail best bid/ask exact prices printed header Qty/Quote toggles base qty sum actual price*qty, live interruptions fresh seed after 3s unhealthy retries <=once every 5s per sub sequence strict missing interval visible replay never requests live recovery unverified pack seeks withhold depth header live/replay paused, pausing freezes CVD flow columns reception bounded 20000 pending trade records long busy pause exceeds budget resuming fresh totals reset after gap, vertical DOM/tape split linked mode hides matching tape so ladder full right column turning linking off leaving RT restores tape split floating tabbed preserved rows outside custom panel bounds clipped never moved independent mode labelled may continue updating while RT paused
- TradesWidget size highlight 1-3 whale detection time & sales
- Backend orderbook_manager double-buffer BookUpdate snapshot vs delta last_update_id continuity realtime_history 60min/50k cells realtime_quotes
- Verification: DOM 25 levels grouping changes bar width trade columns update BBO spread total USD

### Phase 6: Volume Profile + Footprint + TPO Exact + Our Colors (3 days)
- VPVR POC/VAH/VAL buy/sell split price_profile_renderer
- Footprint per-price per-minute tick-volume buy/sell delta imbalance SamePrice/Diagonal ratio 3.0 min volume stacked_levels 0=off else >=2 POC summary V:/D: footer per candle right-click Imbalances
- TPO 30m sessions blocks candle-range approx no tick occupancy 30m or smaller timeframe dividing 30m no candles=no TPO
- Backend footprint_manager volume_profile_manager tpo_manager bounded observations after warmup starts next minute boundary after join/gap closes minute on later trade

### Phase 7: Watchlist + Scanner + Positions Exact + Our Colors (3 days)
- WatchlistWidget left 254px dense grid header stack pinned title bar filter row category+venue selectors SYMBOL/LAST/24H% sort chips scrolling list dense rows star sparkline symbol ellipsized last 24h% fixed tabular dim volume beneath volume bars accent when Vol sort favourites in-memory compact toggle auto when rail dragged narrow drop sparkline denser, last/24h%/volume from always-on TickerManager owned by AppShell no sub here sparklines client-side ring buffer sampled in update() 30 samples 2s, categories+price formatting SymbolRegistry, row click switches terminal symbol page-reload flow, Sort Symbol/Change/Volume/Price asc/desc, categories_counts all_count scoped_count exchange_counts Binance Futures Hyperliquid, favorites unordered_set compact_ cat_search_ sparks_ map visible_ cached prev_ticker_ms last_resort_ms rebuild_visible build_category_counts render_title_bar/filter_bar/category_selector/sort_header/rows draw_sparkline save/load_settings type Watchlist title Watchlist update_frequency Slow
- Find a symbol modal 770 listed Binance Hyperliquid Bybit search Ctrl K browse All 1503 AI 61 Alpha 74 etc table SYMBOL LAST 24H% VOLUME SCORE TYPE star fav icon last 0.2345 24h% +4.32% green volume 9.11M score 51 type Layer-1 footer 723 symbols 24h stats Arrows navigate Enter opens * favorites Esc closes
- Category dropdowns Search categories Gaming 27 Index 2 etc All venues 1503 Binance 770 Hyperliquid 179 Bybit 554
- Scanner every symbol feed lists 24h stats composite scores 900 symbols 737 Binance USDT-M perps counted 2026-08-15 drift, MarketScannerUpdate ScannerEntry
- PositionsPanel global not per-symbol PaperTradingManager tabs Positions active+account summary Equity curve linearized ring buffer each frame Journal By type render_account_summary acct open_pnl render_positions/equity/journal/by_type_tab format_duration type PaperTrading title Paper Trading update_frequency Standard equity_cache_ vector<EquityPoint>
- Backend ticker_manager global ticker24h subscribed once at init symbol_metadata registry
- Colors: bg var(--panel) #2a2a2a, border var(--edge) #3a3a3a, text var(--text) #e8e8e8, dim var(--dim) #b9b9b9, up var(--up) #21b3a4, down var(--down) #f0426c, volume bars accent var(--accent-bar) #d0d0d0, star fav #e2b93d

### Phase 8: Drawing Tools + Indicators + Workspace Exact + Our Colors (3 days)
- Drawing toolbar rail left edge 32px vertical icons Cursor Trendline Arrow Ray Extended line Horizontal line Horizontal ray Vertical line Cross line Rectangle Parallel channel Polyline Brush Fib retracement Long position Short position Text T Measure Price range Date range Eye Trash Collapse 9/2 indicator count, hamburger menu, edit pencil, fullscreen, profile, drawing_layer drawing_icons drawing_types style_editor drawing_manager education_boot
- Indicators Volume CVD RSI MACD Funding Rate Open Interest VPIN Toxicity exact src, subplots render in order height_ratio 0.25 CVD, toggles flip live menu stays open esc close, indicator_manager indicator_base tokens, volume_indicator cvd_indicator rsi macd funding_rate oi vpin, add_volume/cvd/rsi/macd/funding_rate/oi/vpin_indicator, add_indicator<IndicatorType>, get_indicator_manager, get_y_limits, render_content, update, clear, get_name, get_y_formatter abbreviated, get_latest_value current cumulative colored rising/falling format_latest_value
- Workspace save named setup switch Order Flow Liquidity Replay Review presets export/import JSON layout+panel settings restore one panel per type v1 browser storage can be cleared export setups you need to keep
- Appearance Market colors Teal/rose classic muted alt_candles alt_accents indigo amber mono Interface accent Neutral Mint Indigo Amber Mono Reset appearance Colormap Ember Inferno Magma Viridis Opacity 0.90 Style Intensity Gamma Low Peak Noise floor Tick-per-row Half-life 2.0 Gamma p0.19 Low p0.9985 Peak 0.020 Noise floor 6 bps Tick-per-row 16 h Half-life
- Deduplication: if LSE already has RSI MACD Volume CVD etc keep ONE implementation use LSE indicatorRegistry but render with EdgeDepth UI

### Phase 9: Broker Integration + Orderflow Fallback (2 days)
- Provider = broker:* check capability depth_stream
- If broker provides MBO/L2 use broker orderbook_manager show broker badge
- Else orderflow from binance/coinbase/hyperliquid configurable default binance 20ms for visibility execution via broker_hub banner BROKER MODE orderflow from Binance/Coinbase/Hyperliquid broker has no L2 execution via broker LSE-API
- Paper trading via lse-api when no broker
- Positions bottom shows broker positions via /api/positions
- Verification: broker mode banner orderflow still visible positions from broker

### Phase 10: Ultra-Fast & No-Blank Hardening (2 days)
- WS tiers hyperliquid 66Hz/15ms binance 50Hz/20ms coinbase 20Hz/50ms lse 30Hz/33ms already but verify
- Fallback chain binance→coinbase→hyperliquid→demo→lse Loading {symbol} {tf} {provider} ⚡15ms/20ms/50ms with fallback hint api url Reload/Reset Panes buttons
- Auto-load immediately on Binance click no waiting no stale
- MT5-like speed rAF 60fps double-buffer swap once per frame DispatchQueue 3ms budget SoA cache RowModel cache
- Verification: Render preview shows Hyperliquid button tab Binance moves faster than Coinbase Hyperliquid fastest no blank 50ms target met

---

## 7. File Structure Target — Exact UI Replica with Our Colors

frontend/src/components/edgedepth/
- EdgeDepthTerminal.tsx root composes AppShell + LayoutManager + all widgets bg var(--bg) #1c1c1c text var(--text) #e8e8e8
- TopBar.tsx 44px exact app_shell topbar bg var(--bg2) #262626 gradient var(--bg2)->var(--panel) border-bottom var(--edge) brand mark D 3 streaks exact SVG viewBox 300x132 h 104 y 14..118 cyan #22c5db identity + EARLY ACCESS pill tracked text 0.06em + symbol pill 30px border var(--edge) radius 5px bg var(--bg2) + TF seg 1m 5m 15m 1h 4h 1D Real-time locked + Candles dropdown 8 options + Layers 4 dropdown + Tools + +Widget Draw + Courses Live Replay Workspace + theme toggle + fullscreen + profile
- StatsBar.tsx 33px Last 24h% Funding countdown hh:mm:ss OI Volume Market details mono tabular bg var(--panel) border-bottom var(--edge)
- LayoutManager.tsx dockspace reserves top 77 bottom 66 status left 32 setup_default_layout exact title string layout_matches reset/restore vertical_siblings is_initialized
- ChartWidget.tsx center heatmap overlay candles FP VPVR TPO liq field bubbles drawing crosshair VWAP previous-day/week high/low/close RT mode pill follow-live live-edge dot rt_dom_linked rt_mode_locked padlock
- DomWidget.tsx right 388px RowModel cache grouped USD/coin trade cols BUYS BIDS PRICE ASKS SELLS DELTA mono tabular BBO yellow spread total USD
- TradesWidget.tsx right-bottom size highlight 1-3 PRICE QTY TIME
- WatchlistWidget.tsx left 254px dense grid 1503 pairs filter All venues 1503 Binance 770 Hyperliquid 179 Bybit 554 categories All 1503 AI 61 Alpha 74 etc SYMBOL VOL LAST 24H% star sparkline 30 samples 2s volume beneath volume bars accent fav in-memory compact auto
- FindSymbolModal.tsx 770 listed search Ctrl K browse table SYMBOL LAST 24H% VOLUME SCORE TYPE
- TimeframePicker.tsx 1m 5m 15m 1h 4h 1D Real-time locked SECONDS PRO locked MINUTES HOURS DAYS favourites 6/6 full bar custom Add
- ChartViewPicker.tsx 8 options Candles Heikin Ashi Line Renko Footprint cluster profile Flow & Positioning TPO market profile Settings right-click
- LayersMenu.tsx 4 ON Price levels Liquidations heatmap source Hyperliquid liq levels locked profile Exposure V2 bands pilot locked settings Observed liquidations Market structure Order book depth Depth settings Trade bubbles Bubble settings VPVR Liquidation leverage 25x 50x 75x 100x
- WidgetMenu.tsx +Widget Draw ADD WIDGET Chart Chart of another market Orderbook DOM Trades Market statistics Debug Paper Trading Watchlist Replay Library
- IndicatorsMenu.tsx 0 ACTIVE SUBPLOTS RENDER IN ORDER Volume CVD RSI MACD Funding Rate Open Interest VPIN Toxicity toggles flip live menu stays open esc close
- AppearanceMenu.tsx Appearance Style Intensity Market colors Teal/rose Up/buy Down/sell Interface accent Neutral Mint Indigo Amber Neutral Reset appearance Colormap Ember Inferno Magma Viridis Opacity Gamma Low Peak Noise floor Tick-per-row Half-life
- PositionsPanel.tsx bottom Paper Trading Positions Equity Journal By type account summary equity curve ring buffer
- DrawingToolbar.tsx left rail 32px vertical icons Cursor Trendline Arrow Ray Extended line Horizontal line Horizontal ray Vertical line Cross line Rectangle Parallel channel Polyline Brush Fib retracement Long position Short position Text Measure Price range Date range Eye Trash Collapse 9/2
- ShaderHeatmapRenderer.ts exact port shader_heatmap_renderer.cpp + heatmap_colormap.cpp ember-k 15 stops viridis magma inferno ocean alpha curve 0.05/0.15/0.35/0.60/1.0 0/40/120/190/245 opacity 220 orderbook
- PriceProfileRenderer.ts VPVR POC/VAH/VAL
- RealtimeDOMFrame.ts RealtimeDepthHistory RealtimeQuotes TradeAtPriceAccumulator

lse_terminal/engine/
- orderflow/ orderbook_manager.py double-buffer swap_buffers once per frame, heatmap_manager.py, liquidation_heatmap_manager.py 800 bands 0.05% reach cone, footprint_manager.py TickVolume per minute, volume_profile_manager.py, tpo_manager.py 30m blocks, candle_manager.py MAX 200k SoA building tick ring 50k/5min, ticker_manager.py global ticker24h
- server.py /api/candles fallback chain + /api/orderflow/depth/book/dom/tape/footprint/vpvr/tpo/cvd/liquidations/stats/heatmap/tickers/positions + /api/providers + ws tiers 15/20/50ms
- broker_hub.py broker orderflow capability detection

---

## 8. Verification Checklist — RULE Nothing DONE Unless Functionally Verified on Render Preview

- [ ] Heatmap visible on Render, no blank, Binance 20ms faster than Coinbase 50ms, Hyperliquid 15ms fastest ⚡ button visible, MT5-like glide formingMorphRef 0.35 easing, 58-60 fps, offscreen canvas double-buffer no ghost flicker
- [ ] TopBar exact 44px D mark 3 streaks SVG viewBox 300x132 h 104 y 14..118 cyan identity + EARLY ACCESS pill tracked 0.06em + BTC/USDT Binance Futures Perp dropdown + Last 24h% Funding countdown OI Volume + Courses Live Replay Workspace + theme toggle + fullscreen + profile but colors #1c1c1c/#2a2a2a/#3a3a3a #e8e8e8/#b9b9b9 #21b3a4/#f0426c not #05070a/#0a0e12
- [ ] StatsBar exact 33px mark funding countdown OI liq total/long/short CVD volume timezone 37 zones
- [ ] LayoutManager exact reserves top 77 bottom 66 status left 32 setup_default_layout exact title string layout_matches reset/restore vertical_siblings is_initialized, dockspace Watchlist left 254px Chart center DOM right 388px Trades right-bottom Positions bottom Drawing rail left 32px
- [ ] Chart header exact Chart BTC/USDT 1m X timeframe 1m 5m 15m 1h 4h 1D dropdown Real-time locked Jump to latest Candles 8 options Layers 4 Tools +Widget Draw
- [ ] Timeframe picker exact SECONDS PRO locked 1s 5s 15s 30s MINUTES 1m 3m 5m 15m 30m HOURS 1h 2h 4h 6h 12h DAYS 1D 1W favourites 6/6 full bar custom Add CLICK SETS RIGHT-CLICK PINS MAX 6
- [ ] Chart view 8 options exact Candles Heikin Ashi Line Renko Settings Footprint cluster profile Flow & Positioning TPO market profile Settings right-click
- [ ] Layers exact 4 ON Price levels Liquidations heatmap source Hyperliquid liq levels locked profile Exposure V2 bands pilot locked settings Observed liquidations Market structure Order book depth Depth settings Trade bubbles Bubble settings VPVR Liquidation leverage 25x 50x 75x 100x
- [ ] Drawing toolbar exact 20 tools Cursor Trendline Arrow Ray Extended line Horizontal line Horizontal ray Vertical line Cross line Rectangle Parallel channel Polyline Brush Fib retracement Long position Short position Text Measure Price range Date range Eye Trash Collapse 9/2
- [ ] +Widget exact Chart Chart of another market Orderbook DOM Trades Market statistics Debug Paper Trading Watchlist Replay Library
- [ ] Indicators exact 0 ACTIVE SUBPLOTS RENDER IN ORDER Volume CVD RSI MACD Funding Rate Open Interest VPIN Toxicity toggles flip live menu stays open esc close — deduplicate RSI MACD Volume CVD if LSE already has take ONE else implement Funding Rate OI VPIN Flow & Positioning TPO Footprint etc.
- [ ] Appearance exact Market colors Teal/rose Up/buy Down/sell Interface accent Neutral Mint Indigo Amber Neutral Reset appearance Colormap Ember Inferno Magma Viridis Opacity 0.90 Style Intensity Gamma Low Peak Noise floor Tick-per-row Half-life 2.0 Gamma p0.19 Low p0.9985 Peak 0.020 Noise floor 6 bps Tick-per-row 16 h Half-life
- [ ] Watchlist exact 1503 pairs filter All 1503 All venues 1503 Binance 770 Hyperliquid 179 Bybit 554 categories All 1503 AI 61 Alpha 74 etc SYMBOL VOL LAST 24H% star fav sparkline 30 samples 2s volume beneath volume bars accent compact auto bottom BTCUSDT Live Connected 58 fps UTC+01
- [ ] Find a symbol exact 770 listed Binance Hyperliquid Bybit search Ctrl K browse All 1503 AI 61 etc table SYMBOL LAST 24H% VOLUME SCORE TYPE star fav icon
- [ ] DOM exact Auto center Coin/5m Settings BUYS BIDS PRICE ASKS SELLS DELTA mono tabular BBO yellow spread total USD RowModel cache FPS rebuild ONLY when ob ts/uid acc_rev center/scroll/group/usd changed
- [ ] Trades exact PRICE QTY TIME size highlight 1-3 whale
- [ ] Liquidation heatmap exact dense Field client-side from candles 800 bands 0.05% leverage-tier levels profile rendering reach cone mark >0.1% forward-fill carry texture quad vs per-rect opacity use_texture Hyperliquid liq levels ground-truth REAL positions not modelled distinct stream id 34
- [ ] Trade bubbles exact large prints inside own bar received price/time sized by value thinned screen budget zoom reveals more 75th percentile 60s after >=32 fixed until recalibration 10k manual threshold square-root radius 3px-12px cap 16x min up to 1500 individual
- [ ] VPVR POC/VAH/VAL buy/sell split, Footprint per-price per-minute delta imbalance SamePrice/Diagonal ratio 3.0 min volume stacked_levels POC summary V:/D: footer Imbalances menu, TPO 30m blocks candle-range approx no tick occupancy no candles=no TPO
- [ ] Flow & Positioning minute aggression OI contracts liquidations missing stale explicit JSON export needs get_flow_positioning backend
- [ ] Paper Trading global Positions active+account summary Equity curve ring buffer Journal By type, Replay Library manifest-driven .edpack no server deterministic scrubbing DataContext override transport 66px
- [ ] Broker mode banner orderflow from crypto feeds if broker no L2 execution via broker LSE-API positions from broker via /api/positions
- [ ] lse-api still works /api/candles /api/orderflow/* /api/providers
- [ ] No blank fallback chain Loading {symbol} {tf} {provider} ⚡15ms/20ms/50ms fallback hint api url Reload Reset Panes
- [ ] No lag ultra-fast tiers hyperliquid 66Hz/15ms binance 50Hz/20ms coinbase 20Hz/50ms lse 30Hz/33ms rAF 60fps double-buffer DispatchQueue 3ms SoA RowModel virtualized 1503 rows GPU ring 8192x1024 LUT 256x1 discard_threshold 0.07/0.004 viewport cached PerfStats
- [ ] No errors capability detection symbol mapping BTCUSDT vs BTC vs BTC-USD demo mapping geo law D14 venue first mirror on 451/418/403 pin winner honesty label binance vs binance-spot, error boundaries WebGL2 fallback Canvas2D, Hosted guard LocalOnlyGuard Origin validation, HostedRateLimit token bucket 300 capacity 5/s refill heavy costs 40 12 6 max 20000 evict stalest quarter, thread safety mutex atomic generation replay_mode prune
- [ ] Build passes chart.js 284KB depth 140KB manualChunks lazy Suspense Fallback Loading…
- [ ] Color = default of our terminal #1c1c1c/#2a2a2a/#3a3a3a #e8e8e8/#b9b9b9 #21b3a4/#f0426c not EdgeDepth #05070a/#0a0e12 but layout exact no changes

---

## 9. Next Step — Awaiting Your Approval to Code

I have studied everything — exact src code, tokens, theme, managers, widgets, data flow, every screenshot pixel. I will NOT code until you approve.

Choose:
1. Approve Phase 1 Heatmap Only (recommended) — exact shader renderer + our colors + ultra-fast 15/20/50ms + no blank + Hyperliquid button visible on Render verified
2. Approve Full Terminal Rebuild Phases 0-10 — step-by-step verified each phase
3. Request Changes — what to adjust

This is serious $500M project. I will act as expert, not fast. Screenshots you provided are now the reference for pixel-perfect replica with our terminal default colors.

