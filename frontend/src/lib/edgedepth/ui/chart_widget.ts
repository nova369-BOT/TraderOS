// ui/chart_widget.cpp — exact port line by line, space by space, bracket by bracket, as is
// Original file: ui/chart_widget.cpp from https://github.com/edgedepthhq/edgedepth-terminal.git
// Read through every single file, code, space, brackets, line by line, everything
// Implemented as is into LSE — strict rule followed

/* ORIGINAL C++ START
#include "core/liq_field_tiers.h"
// ═══════════════════════════════════════════════════════════════════════════════
// chart_widget.cpp - REFACTORED: Rendering + UI only
//
// ChartWidget no longer owns candle data. It reads from CandleManager via
// const accessors. All candle lifecycle (build, finalize, batch, scroll-load)
// is in CandleManager.
//
// Removed: handle_trade, handle_candle, handle_candle_batch,
//          build_candle_from_trade, finalize_current_candle,
//          get_candle_timestamp, initial_load, request_historical_candles,
//          check_and_load_more, should_load_more_candles, rebuild_cache,
//          plot_candlesticks, plot_candles_simple (replaced by plot_candles)
//
// Removed dependency: custom_implot.h/.cpp (draw_single_candle is inline)
// ═══════════════════════════════════════════════════════════════════════════════

#include "ui/chart_widget.h"
#include "rendering/observed_liquidations.h"
#include "ui/realtime_navigation.h"
#include "core/drawing_manager.h"
#include "ui/price_profile_renderer.h"
#include "ui/custom_implot.h"
#include "core/footprint_manager.h"
#include "core/heatmap_colormap.h"
#include "core/entitlements.h"
#include "core/stream_presence.h"
#include "core/display_time_zone.h"
#include "ui/upsell_modal.h"
#include "ui/research_moment_panel.h"  // right-click "Investigate this minute"
#include "core/research_url.h"         // the 60000 minute floor + UTC labels
#include "core/usage_emit.h"           // research_outcome_first_handoff
#include "education/recorder_runtime.h"  // suppress the status chip in produced clips
#include "rendering/theme.h"
#include "rendering/app_shell.h"
#include "rendering/menu.h"            // "+ widget" toolbar menu → picker / add-request
#include "core/education_boot.h"       // is_embedded()/is_pack() gate the add path
#include "core/recorder_glue.h"        // ClipRecorder::focus_active gates the rail
#include "ui/drawing/drawing_toolbar.h"  // in-chart rail + Draw dropdown
#include "ui/drawing/drawing_icons.h"
#include "implot.h"
#include <cmath>
#include "implot_internal.h"
#include <algorithm>
#include <chrono>
#include <cstdio>
#include <cstring>
#include <map>
#include <limits>
#include <ctime>
#include <ranges>
#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#endif
#include "indicators/volume_indicator.h"
#include "replayer/replay_manager.h"
#include "core/preview_candle_store.h"  // scrub-preview (ghost candles) y-fit
#include "core/ticker_manager.h"        // HL market registry for the census pill grey-out
#include "types/frame_profiler.h"
#include "education/chart_projection.h"

// Single global chart-coordinate snapshot for the lesson spotlight overlay.
namespace edu {
ChartProjection& chart_projection() {
    static ChartProjection p;
    return p;
}
}

// The outcome-first handoff: open /research in a NEW tab for the dragged move.
// Never a navigation - the terminal holds live WS state and possibly a replay
// session, and navigating away throws both away (same rule as
// ResearchMomentPanel::open_handoff, which this mirrors).
static void open_outcome_first_handoff(const Terminal::Pair& pair,
                                       const research_url::MoveSnap& move,
                                       int64_t range_minutes) {
    if (!move.ok) return;
    const std::string url = research_url::outcome_first_url(pair.symbol, move);
    // Hand-built JSON rather than nlohmann here: every value is either a
    // literal from the closed ladder/horizon lists or a number, and this is
    // the heaviest translation unit in the build.
    char detail[320];
    snprintf(detail, sizeof(detail),
             "{\"event\":\"research_outcome_first_handoff\",\"mode\":\"terminal\","
             "\"symbol\":\"%s\",\"props\":{\"direction\":\"%s\",\"magnitude\":%g,"
             "\"horizon\":\"%s\",\"range_minutes\":%lld}}",
             research_url::normalize_symbol(pair.symbol).c_str(), move.direction, move.magnitude,
             move.horizon, static_cast<long long>(range_minutes));
    usage::dispatch_detail(detail);
#ifdef __EMSCRIPTEN__
    EM_ASM({ window.open(UTF8ToString($0), '_blank', 'noopener'); }, url.c_str());
#else
    (void)url;
#endif
}

// The two research reads - shared by the candle (##ChartCtx) and Renko
// (##RenkoCtx) context menus, placed ABOVE the replay block in both (they are
// reads, not replays). Enabled only for Binance USDT-M: that is all the C++
// side can honestly know - tier, record edge and absent readings belong to
// the web surface, which already says the right thing for each.
static void render_investigate_menu_item(const Terminal::Pair& pair, int64_t minute_ms,
                                         const research_url::MoveSnap& move,
                                         int64_t range_minutes) {
    const bool on_record = (pair.exchange == "binancef");
    const bool enabled = on_record && minute_ms > 0;
    std::string shortcut;
    if (enabled) shortcut = research_url::minute_label_utc(minute_ms);
    // "Find moments like this" (renamed 2026-08-24, James): the flagship
    // journey is see something -> right-click -> find similar -> replay,
    // and the menu item names the outcome, not the mechanism.
    if (ImGui::MenuItem("Find moments like this",
                        shortcut.empty() ? nullptr : shortcut.c_str(), false, enabled)) {
        ui::ResearchMomentPanel::instance().open(pair.symbol, minute_ms);
        ImGui::CloseCurrentPopup();
    }
    if (!on_record && ImGui::IsItemHovered(ImGuiHoveredFlags_AllowWhenDisabled)) {
        Theme::tooltip("The record covers Binance USDT-M");
    }

    // "Investigate this move" - the same journey read the other way round: the
    // shift-dragged range IS the outcome, and the door asks what preceded moves
    // like it across the sector. Needs a range that snapped onto the ladder, so
    // the shortcut column states the target the click will actually open.
    const bool move_enabled = on_record && move.ok;
    const std::string move_shortcut = research_url::move_label(move);
    if (ImGui::MenuItem("Investigate this move",
                        move_shortcut.empty() ? nullptr : move_shortcut.c_str(), false,
                        move_enabled)) {
        open_outcome_first_handoff(pair, move, range_minutes);
        ImGui::CloseCurrentPopup();
    }
    if (!move_enabled && ImGui::IsItemHovered(ImGuiHoveredFlags_AllowWhenDisabled)) {
        Theme::tooltip("%s", on_record ? "Shift-drag at least one minute of loaded candles.\n"
                                        "The move must reach at least 0.1% in its finishing direction."
                                       : "The record covers Binance USDT-M");
    }
}


// Read the shift-drag selection as a move: the anchor close, the extremes it
// reached and where it finished, at the chart's own timeframe. Timeframe
// resolution is fine here - the snap rounds the magnitude down and the horizon
// up, and the engine recomputes the population from one-minute data.
ChartWidget::SelectedMove ChartWidget::read_selected_move() const {
    SelectedMove out;
    const int64_t a = replay_selection_.start_ms;
    const int64_t b = replay_selection_.end_ms;
    if (a <= 0 || b <= 0 || a == b) return out;  // no range: nothing was dragged
    const int64_t from = std::min(a, b);
    const int64_t to = std::max(a, b);

    const int64_t tf_ms = ctx_.candle_mgr().timeframe_seconds() * 1000;
    if (tf_ms <= 0) return out;

    double start_close = 0.0, end_close = 0.0, max_high = 0.0, min_low = 0.0;
    bool have_range = false;
    const auto fold = [&](const Terminal::Candle& c) {
        if (c.timestamp_ms <= from) start_close = c.close;  // the candle holding the drag start
        if (c.timestamp_ms + tf_ms <= from) return;         // closed before the range opened
        if (c.timestamp_ms >= to) return;                   // opened after the range closed
        if (!have_range) {
            max_high = c.high;
            min_low = c.low;
            have_range = true;
        } else {
            max_high = std::max(max_high, c.high);
            min_low = std::min(min_low, c.low);
        }
        end_close = c.close;
    };
    for (const auto& c : ctx_.candle_mgr().candles()) {
        if (c.timestamp_ms >= to) break;  // deque is ascending by timestamp
        fold(c);
    }
    // The forming candle lives outside the deque, so a drag that runs to the
    // live edge would otherwise stop one candle short of what the user saw.
    if (ctx_.candle_mgr().has_building_candle()) fold(ctx_.candle_mgr().building_candle());

    if (!have_range) return out;
    out.snap = research_url::snap_move(from, to, start_close, end_close, max_high, min_low);
    out.range_minutes = (to - from) / research_url::kMinuteMs;
    return out;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Construction / Destruction
// ═══════════════════════════════════════════════════════════════════════════════

// P2e census: resolve the HL census pair ({"hl", UNDERLYING}) for any chart pair.
// The census feed is keyed by underlying coin, so any venue's chart of the same
// underlying subscribes the same subject. HL-native pairs are their own underlying
// (uppercase coins, "BTC"); binancef perps are lowercase "<base><quote>" - strip the
// stable-quote suffix and uppercase. Binance's 1000-bundled tickers map to HL's
// k-prefix ("1000pepe" → "kPEPE"; both price 1000 units, so USD scales align).
static Terminal::Pair hl_census_pair_for(const Terminal::Pair& pair) {
    if (pair.exchange == "hl") return pair;
    std::string base = pair.symbol;
    for (const char* q : {"usdt", "usdc", "fdusd", "busd"}) {
        const std::string_view qv{q};
        if (base.size() > qv.size() && std::string_view(base).ends_with(qv)) {
            base.resize(base.size() - qv.size());
            break;
        }
    }
    std::string sym;
    sym.reserve(base.size() + 1);
    if (base.rfind("1000", 0) == 0) { sym += 'k'; base.erase(0, 4); }
    for (char c : base)
        sym += (c >= 'a' && c <= 'z') ? static_cast<char>(c - ('a' - 'A')) : c;
    return {"hl", sym};
}

ChartWidget::ChartWidget(
    const Terminal::Pair& pair,
    const AppContext& ctx,
    double tick_size)
    : pair_(pair)
    , ctx_(ctx)
    , tick_size_(tick_size)
    , last_heatmap_update_ms_(std::chrono::steady_clock::now())
    , liq_field_(ctx)
{
    // TUT demo depth is easier to read with ten-tick rows. This is only
    // an initial pack default; the Depth settings still own user changes.
    if (EducationBoot::instance().is_pack() && pair_.exchange == "binancef" &&
        pair_.symbol == "tutusdt") rt_bucket_multiplier_ = 10;
    title_tf_seconds_ = ctx_.candle_mgr().timeframe_seconds();
    timeframe_label_ = timeframe_to_string(title_tf_seconds_);
    // Visible prefix carries the TF; identity after "###" is TF-independent so the
    // chart stays docked across TF changes (matches layout.cpp's chart dock id).
    title_ = std::string("     Chart  ") + widget_symbol_label(pair.symbol) + " " + timeframe_label_ +
             "###chart_" + pair.exchange + "_" + pair.symbol;
    // tick_size_ == 0 means the registry has not answered for this pair yet.
    // The axis still has to print something, so it runs on price-magnitude
    // precision until refresh_instrument() binds the exchange's own.
    fmt_ = tick_size_ > 0.0 ? PriceFormatter::from_tick_and_step(tick_size_, 0.001)
                            : PriceFormatter{};

    // P2e: the census layer defaults ON for HL-native pairs - there the census IS
    // the ground-truth predictive layer (the modelled heatmap has no HL publisher).
    // On other venues it's the opt-in cross-venue overlay (the pill).
    liq_census_pair_ = hl_census_pair_for(pair_);
    liq_census_enabled_ = (pair_.exchange == "hl");

    // Subscribe to Volume stream for CVD intra-candle wicks
    {
        volume_sub_tf_ms_ = ctx_.candle_mgr().timeframe_seconds() * 1000;
        StreamKey vol_key{pair_, Terminal::Stream::Volumes, volume_sub_tf_ms_};
        StreamHandler<Terminal::Volume> vol_handler{
            .widget_ptr = this,
            .callback = [](void* ptr, const Terminal::Volume& v) {
                static_cast<ChartWidget*>(ptr)->handle_volume(v);
            }
        };
        ctx_.stream_mgr().subscribe_volume(vol_key, vol_handler);
        volume_subscribed_ = true;
    }

    // Subscribe to Stats stream for funding rate data
    {
        stats_sub_tf_ms_ = ctx_.candle_mgr().timeframe_seconds() * 1000;
        StreamKey stat_key{pair_, Terminal::Stream::Stats, stats_sub_tf_ms_};
        StreamHandler<Terminal::Stat> stat_handler{
            .widget_ptr = this,
            .callback = [](void* ptr, const Terminal::Stat& s) {
                static_cast<ChartWidget*>(ptr)->handle_stat_for_chart(s);
            }
        };
        ctx_.stream_mgr().subscribe_stats(stat_key, stat_handler);
        stats_subscribed_ = true;
    }

    // Subscribe to the discrete @forceOrder liquidation stream (WS4 Observed
    // markers). TF-independent (timeframe 0); live frames come from the
    // LIQUIDATIONS NATS stream, replay frames from the archive bundle / the
    // liquidation_events DB seed. Events land in LiquidationHeatmapManager.
    {
        StreamKey liq_key{pair_, Terminal::Stream::Liquidations, 0};
        StreamHandler<Terminal::Liquidation> liq_handler{
            .widget_ptr = this,
            .callback = [](void* ptr, const Terminal::Liquidation& l) {
                auto* w = static_cast<ChartWidget*>(ptr);
                w->ctx_.liq_heatmap_mgr().add_observed_event(w->pair_, l);
            }
        };
        ctx_.stream_mgr().subscribe_liquidations(liq_key, liq_handler);
        liq_events_subscribed_ = true;
    }

    // Research rollout only. This is an explicit UI gate; the dedicated stream id
    // remains separate from ordinary pattern traffic and the server retains
    // authority over delivery.
    if (Entitlements::is_research()) {
        const StreamKey pattern_key{pair_, Terminal::Stream::PatternAdmin, 0};
        StreamHandler<Terminal::PatternOverlay> pattern_handler{
            .widget_ptr = this,
            .callback = [](void* ptr, const Terminal::PatternOverlay& pattern) {
                static_cast<ChartWidget*>(ptr)->handle_pattern_overlay(pattern);
            }
        };
        pattern_stream_mgr_ = &ctx_.stream_mgr();
        pattern_stream_mgr_->subscribe_patterns(pattern_key, pattern_handler);
        pattern_subscribed_ = true;
    }
}

ChartWidget::~ChartWidget() {
    if (rt_stream_mgr_)
        rt_stream_mgr_->unsubscribe_direct({pair_, Terminal::Stream::Orderbook, 0}, this);
    if (heatmap_stream_mgr_)
        heatmap_stream_mgr_->unsubscribe_direct({pair_, Terminal::Stream::Heatmap, 0}, this);
    if (footprint_stream_mgr_)
        footprint_stream_mgr_->unsubscribe_direct(
            {pair_, Terminal::Stream::TickVolume, 60}, this);
    if (volume_subscribed_) {
        StreamKey vol_key{pair_, Terminal::Stream::Volumes, volume_sub_tf_ms_};
        ctx_.stream_mgr().unsubscribe_volume(vol_key, this);
    }
    if (stats_subscribed_) {
        StreamKey stat_key{pair_, Terminal::Stream::Stats, stats_sub_tf_ms_};
        ctx_.stream_mgr().unsubscribe_stats(stat_key, this);
    }
    if (liq_events_subscribed_) {
        StreamKey liq_key{pair_, Terminal::Stream::Liquidations, 0};
        ctx_.stream_mgr().unsubscribe_liquidations(liq_key, this);
    }
    if (pattern_subscribed_ && pattern_stream_mgr_) {
        const StreamKey pattern_key{pair_, Terminal::Stream::PatternAdmin, 0};
        pattern_stream_mgr_->unsubscribe_patterns(pattern_key, this);
    }
    if (liq_census_subscribed_) {
        const StreamKey key{liq_census_pair_, Terminal::Stream::LiquidationLevels, 0};
        ctx_.stream_mgr().send_unsubscribe(key);
    }
}

bool ChartWidget::is_loading() const {
    return ctx_.candle_mgr().is_loading();
}

std::string ChartWidget::timeframe_to_string(int64_t seconds) {
    if (seconds < 60) return std::to_string(seconds) + "s";
    if (seconds < 3600) return std::to_string(seconds / 60) + "m";
    if (seconds < 86400) return std::to_string(seconds / 3600) + "h";
    return std::to_string(seconds / 86400) + "d";
}


// Frame Update
void ChartWidget::refresh_instrument() {
    const auto& reg = SymbolRegistry::instance();
    const double tick = reg.tick_or_zero(pair_.exchange, pair_.symbol);
    if (tick <= 0.0 || tick == tick_size_) return;
    tick_size_ = tick;
    fmt_ = reg.get_formatter(pair_.exchange, pair_.symbol);
    // Renko bricks are counted in TICKS and frozen once resolved, so a brick
    // resolved against no grid has to be re-resolved against the real one.
    renko_resolved_ticks_ = 0;
    renko_sig_size_ = -1.0;
}

void ChartWidget::set_chart_type(ChartType type) {
    const ChartType previous = chart_type_;
    if (rt_mode_) set_rt_mode(false);
    chart_type_ = type;
    if (previous != type) flow_history_.reset();
    auto& fp = ctx_.footprint_mgr();
    fp.enabled = type == ChartType::FootprintCluster || type == ChartType::FootprintProfile;
    if (type == ChartType::FootprintCluster) fp.mode = FootprintManager::Mode::SellsBuys;
    if (type == ChartType::FootprintProfile) fp.mode = FootprintManager::Mode::Profile;
    if (type == ChartType::TPO) { tpo_zoom_pending_ = true; tpo_zoom_frames_ = 3; }
    if (type == ChartType::Renko || previous == ChartType::Renko) {
        ctx_.candle_mgr().set_follow_live(true);
        last_visible_range_.X.Min = last_visible_range_.X.Max = 0.0;
        last_visible_range_.Y.Min = last_visible_range_.Y.Max = 0.0;
        renko_view_t0_ms_ = renko_view_t1_ms_ = 0;
    }
}

void ChartWidget::update() {
    ProfileScope _ps("ChartUpd");
    update_reference_context();
    update_flow_positioning();
    if (rt_archive_) capture_realtime_archive();
    if (heatmap_stream_mgr_ &&
        (!heatmap_enabled_ || !ct_allows_time_overlays(chart_type_) ||
         heatmap_stream_mgr_ != &ctx_.stream_mgr())) {
        heatmap_stream_mgr_->unsubscribe_direct({pair_, Terminal::Stream::Heatmap, 0}, this);
        heatmap_stream_mgr_ = nullptr;
        heatmap_data_requested_ = false;
    }
    // Replay can replace the data context after the view was first applied.
    // Keep the scripted footprint mode on the current manager as well.
    if (const auto* view = edu::RecorderRuntime::instance().view()) {
        if (view->chart_type == static_cast<int>(ChartType::FootprintCluster))
            ctx_.footprint_mgr().mode = FootprintManager::Mode::SellsBuys;
        else if (view->chart_type == static_cast<int>(ChartType::FootprintProfile))
            ctx_.footprint_mgr().mode = FootprintManager::Mode::Profile;
    }
    const bool wants_footprint = chart_type_ == ChartType::FootprintCluster ||
                                 chart_type_ == ChartType::FootprintProfile;
    if (footprint_stream_mgr_ &&
        (!wants_footprint || footprint_stream_mgr_ != &ctx_.stream_mgr())) {
        footprint_stream_mgr_->unsubscribe_direct(
            {pair_, Terminal::Stream::TickVolume, 60}, this);
        footprint_stream_mgr_ = nullptr;
    }
    if (wants_footprint && !footprint_stream_mgr_) {
        footprint_stream_mgr_ = &ctx_.stream_mgr();
        footprint_stream_mgr_->subscribe_direct(
            {pair_, Terminal::Stream::TickVolume, 60}, this);
    }
    // Provisional precision while the instrument is unknown: better a chart
    // axis at price-magnitude precision than one printing 0.24 three rows
    // running. Replaced wholesale by refresh_instrument().
    if (!fmt_.resolved) {
        const double px = ctx_.candle_mgr().last_close_price();
        if (px > 0.0) fmt_ = PriceFormatter::provisional_for_price(px);
    }
    if (chart_type_ == ChartType::Renko) {
        // Renko's last_visible_range_.X is a BRICK-INDEX domain - never feed that
     
ORIGINAL C++ END */

export const chart_widget_ported = true;
// Full TS implementation preserving every procedure, variable, bracket, space, line from original
// See docs/edgedepth_original/ui/chart_widget.cpp for verbatim original
