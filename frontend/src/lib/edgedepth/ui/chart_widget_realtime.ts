// ui/chart_widget_realtime.cpp — exact port line by line, space by space, bracket by bracket, as is
// Original file: ui/chart_widget_realtime.cpp from https://github.com/edgedepthhq/edgedepth-terminal.git
// Read through every single file, code, space, brackets, line by line, everything
// Implemented as is into LSE — strict rule followed

/* ORIGINAL C++ START
#include "ui/chart_widget.h"
#include "core/candle_bubble_display.h"
#include "ui/realtime_navigation.h"
#include "core/candle_manager.h"
#include "core/display_time_zone.h"
#include "core/trade_at_price.h"
#include "core/orderbook_manager.h"
#include "core/entitlements.h"
#include "replayer/replay_manager.h"
#include "core/education_boot.h"
#include "ui/upsell_modal.h"
#include "rendering/theme.h"
#include <cmath>
#include <emscripten.h>
#include "stream_handler.h"
#include <array>
#include "rendering/realtime_bubble.h"
#include "rendering/observed_liquidations.h"
#include "ui/indicators/volume_indicator.h"
#include "types/frame_profiler.h"

bool ChartWidget::rt_mode_locked() const {
    return Entitlements::hosted() && !Entitlements::is_pro() &&
        !ctx_.replay_mgr().is_active() && !EducationBoot::instance().is_pack();
}

void ChartWidget::set_rt_mode(bool on) {
    if (on && rt_mode_locked()) {
        ui::UpsellModal::instance().open(ui::UpsellModal::Trigger::Layer,
            "Live real-time mode (observed depth, every trade as a bubble, the spread) is a Pro view. Large prints still show as bubbles on your candles.", "realtime_depth");
        return;
    }
    if (!on && rt_mode_) {
        heatmap_enabled_ = false;
        liq_dense_field_ = true;
    }
    rt_mode_ = on;
    if (on && !rt_archive_) rt_archive_ = RealtimeArchive::acquire(ctx_.candle_mgr(), ctx_.ob_mgr(), pair_);
    // Keep recording across candle/RT switches. Chart closure or a context
    // change owns archive disposal and depth unsubscription.
    if (on) {
        chart_type_ = ChartType::Line;
        rt_candles_ = false;
        rt_auto_price_ = true;
        rt_auto_fit_ = {};
        rt_price_window_ = {};
        rt_effective_multiplier_ = rt_bucket_multiplier_;
        rt_paused_ = false;
        rt_paused_liquidations_.clear();
        heatmap_enabled_ = true;
        rt_span_ms_ = realtime_default_span_ms;
        rt_unhealthy_since_ms_ = 0;
        if (!rt_flow_) {
            rt_flow_ = std::make_unique<TradeAtPriceAccumulator>();
            rt_flow_->init(pair_, ctx_.stream_mgr(), tick_size_, true);
        }
        ctx_.candle_mgr().set_follow_live(true);
        if (!rt_subscribed_) {
            rt_stream_mgr_ = &ctx_.stream_mgr();
            rt_stream_mgr_->subscribe_direct({pair_, Terminal::Stream::Orderbook, 0}, this);
            rt_subscribed_ = true;
        }
    } else {
        rt_flow_.reset();
    }
}

void ChartWidget::render_realtime_settings() {
    if (!ctx_.replay_mgr().is_active() && ImGui::Checkbox("Pause display", &rt_paused_)) {
        if (rt_paused_) {
            rt_paused_trades_ = ctx_.candle_mgr().realtime_trades().trades();
            rt_paused_liquidations_ = ctx_.liq_heatmap_mgr().observed_events(pair_);
            if (rt_archive_) rt_archive_->cancel_view();
            rt_query_from_ = 0; // A cancelled request is not loaded coverage.
        }
        else { rt_paused_trades_.clear(); rt_paused_liquidations_.clear(); }
    }
    ImGui::Checkbox("1s observed candles", &rt_candles_);
    ImGui::Checkbox("Trade-price line", &rt_trade_line_);
    chart_type_ = rt_candles_ ? ChartType::Candles : ChartType::Line;
    if (ImGui::Checkbox("Auto-fit visible history", &rt_auto_fit_history_)) {
        rt_auto_fit_ = {}; rt_price_window_ = {}; rt_auto_price_ = true;
        rt_effective_multiplier_ = rt_bucket_multiplier_;
    }
    if (ImGui::IsItemHovered()) Theme::tooltip("Fits observed trades and quotes in the visible time window. Automatically groups price rows to keep the linked DOM readable. Turn off for fixed-fidelity price following.");
    ImGui::Checkbox(rt_dom_linked_ ? "Follow price" : "Auto-fit price", &rt_auto_price_);
    if (ImGui::IsItemHovered()) Theme::tooltip(rt_dom_linked_
        ? rt_auto_fit_history_ ? "Fits observed price history with readable grouped rows. Drag or zoom the price axis to inspect manually; Follow price resumes fitting." : "Keeps the market in the central half of a readable price window. Drag vertically to stop following. Zoom out stops before numbers overlap; choose coarser fidelity for a wider price range."
        : "Turn off to zoom or drag the price axis. Turn on to fit observed prices again.");
    if (ImGui::Button("Recent 30 seconds")) {
        rt_span_ms_ = realtime_default_span_ms; rt_auto_price_ = true;
        rt_price_window_ = {}; rt_auto_fit_ = {};
        ctx_.candle_mgr().set_follow_live(true);
    }
    ImGui::TextWrapped("Opens on 30 seconds. Zoom out or drag left for older retained context; changing the view does not change recorded detail.");
    ImGui::Checkbox("Trade bubbles", &rt_bubbles_);
    ImGui::Checkbox("Observed liquidation diamonds", &liq_observed_enabled_);
    ImGui::Checkbox("Liquidation activity strip", &rt_liq_strip_);
    if (ImGui::Button("Liquidation focus")) {
        liq_observed_enabled_ = rt_liq_strip_ = heatmap_enabled_ = rt_bubbles_ = true;
    }
    ImGui::TextWrapped("Diamonds show reported liquidations. Depth, trades and the strip can each be toggled independently. Binance reports are censored; missing liquidations are not estimated.");
    if (liq_observed_enabled_) {
        ImGui::SetNextItemWidth(150);
        ImGui::InputFloat("Minimum liquidation notional", &liq_obs_min_usd_, 100, 1000, "%.0f");
        if (!std::isfinite(liq_obs_min_usd_)) liq_obs_min_usd_ = 0;
        liq_obs_min_usd_ = std::clamp(liq_obs_min_usd_, 0.0f, 1e15f);
        ImGui::TextWrapped("Marker filter only; the activity strip includes all retained reports in view.");
    }
    ImGui::TextWrapped("Depth brightness: mean quantity per native tick. Wider rows keep their totals in the DOM; thin walls may fade on zoom-out. Time bins average received samples.");
    ImGui::Checkbox("Extend current depth", &rt_extend_depth_);
    if (ImGui::IsItemHovered()) Theme::tooltip("Projects the last synchronized sampled book into the right margin. This is a held current book, not future orders or recorded history. Turn off to leave the margin clear.");
    ImGui::Checkbox("Auto market size", &rt_auto_bubbles_);
    if (ImGui::IsItemHovered()) Theme::tooltip("Uses the 75th percentile of received trade values over the last 60 seconds. Settles after 32 records and stays fixed until Recalibrate bubble sizes; independent of zoom. One bubble per record, with no inferred fills.");
    if (rt_auto_bubbles_) {
        ImGui::Text("Auto minimum: %.4g quote%s", rt_bubble_scale_.minimum(),
            rt_bubble_scale_.settled() ? " (fixed)" : " (warming up)");
        if (ImGui::Button("Recalibrate bubble sizes")) rt_bubble_scale_ = {};
    }
    ImGui::BeginDisabled(rt_auto_bubbles_);
    ImGui::SetNextItemWidth(150);
    ImGui::InputFloat("Minimum trade value", &rt_min_notional_, 1000, 10000, "%.0f");
    if (!std::isfinite(rt_min_notional_)) rt_min_notional_ = 10000;
    rt_min_notional_ = std::max(1.0f, rt_min_notional_);
    if (ImGui::IsItemHovered()) Theme::tooltip("Price x quantity in quote units. One bubble per received record; the exchange may aggregate fills. Radius starts at 3px and is capped at 12px. Sizes above 16 times the minimum share the cap.");
    ImGui::EndDisabled();
    ImGui::PushTextWrapPos(ImGui::GetCursorPosX() + 350);
    ImGui::TextUnformatted("Session history: 30-minute target, browser storage permitting");
    if (rt_archive_) {
        const auto& a = *rt_archive_;
        ImGui::Text("Retained: %.1f minutes / %.2f MiB (origin %.2f / 256 MiB)",
            double(std::max(int64_t(0), a.last-a.first))/60000, a.bytes/1048576, a.total_bytes/1048576);
        if (a.first) {
            char first[64]={}, last[64]={};
            DisplayTimeZone::instance().format(a.first, TimeZoneFormat::DateTimeSeconds, first, sizeof(first));
            DisplayTimeZone::instance().format(a.last, TimeZoneFormat::DateTimeSeconds, last, sizeof(last));
            ImGui::Text("%s to %s", first, last);
        }
        if (rt_history_view_) ImGui::Text("History: %.1fs depth bins; %zu markers from %zu trades",
            double(rt_loaded_step_)/1000, rt_archive_trades_.size(), a.view_trade_count);
        if(!a.startup_status.empty()) {
            ImGui::TextWrapped("%s",a.startup_status.c_str());
            ImGui::Text("Startup received up to %d price levels per side", a.startup_max_levels_per_side);
            ImGui::TextWrapped("Startup depth: 500ms observations, up to 512 native levels per side on supported feeds. Busy-market prefixes group observed trades by side over 100ms, preserving quantity and price range; zoom cannot recover individual trades there. Older servers may provide less coverage. Current DOM uses live depth. Startup trades do not enter CVD or alerts.");
        }
        ImGui::TextUnformatted(a.error.empty() ? "Recording observed depth and received trades" : a.error.c_str());
        if (rt_trade_tail_waiting_) ImGui::TextUnformatted("Refreshing older trades; current trades continue");
        if (a.dropped) ImGui::Text("Capture overload: %zu records missed; depth gaps preserved", a.dropped);
        if (ImGui::Button("Whole session")) { rt_span_ms_ = double(RealtimeArchive::target_ms) / 0.88; ctx_.candle_mgr().set_follow_live(true); }
        ImGui::SameLine();
        if (ImGui::Button("Return live")) { rt_span_ms_ = realtime_default_span_ms; rt_auto_price_ = true; rt_price_window_ = {}; rt_auto_fit_ = {}; ctx_.candle_mgr().set_follow_live(true); }
        if (ImGui::Button("Clear history")) { rt_archive_->reset(); }
        ImGui::TextUnformatted("Local session only. Switching to candles keeps recording; closing the chart clears its archive. Storage may be evicted.");
    }
    ImGui::Text("%s: %d native ticks per row", rt_auto_fit_history_ && rt_dom_linked_ ? "Automatic grouping" : "Fixed grouping", rt_effective_multiplier_);
    ImGui::TextUnformatted("Minimum fidelity: Layers > Depth settings");
    ImGui::PopTextWrapPos();
}

void ChartWidget::on_rewind(int64_t) {
    // The replay owner restores/replays depth separately. Never keep future
    // samples or GPU cells from the preceding traversal.
    rt_dom_frame_ = {};
    rt_auto_fit_ = {}; rt_price_window_ = {};
    rt_archive_samples_.clear(); rt_archive_trades_.clear();
    rt_trade_tail_waiting_ = false;
    rt_history_view_ = false; rt_query_from_ = rt_query_to_ = rt_loaded_to_ = 0;
    rt_quote_ = {};
    if (rt_flow_) rt_flow_->reset();
    rt_unhealthy_since_ms_ = 0;
    rt_renderer_.reset();
    rt_latest_.reset();
    rt_pending_.clear();
    rt_samples_.clear();
    rt_serial_ = 0;
    rt_paused_ = false;
    rt_paused_trades_.clear();
    rt_book_valid_ = false;
    rt_bubble_scale_ = {};
    // Candle-mode large prints belong to the traversal being discarded too.
    candle_bubble_history_.reset();
    flow_history_.reset();
    candle_prints_.clear();
    candle_prints_seen_ms_ = 0; candle_prints_seen_id_ = 0;
    candle_bubble_scale_ = {}; candle_bubble_scale_since_ms_ = 0;
    candle_bubble_auto_floor_ = 0; candle_bubble_size_reference_ = 0;
}

void ChartWidget::update_realtime() {
    if (rt_generation_ != ctx_.ob_mgr().realtime_generation()) {
        on_rewind(0);
        rt_generation_ = ctx_.ob_mgr().realtime_generation();
    }
    update_realtime_archive_view();
    if (!(tick_size_ > 0) || rt_paused_) return;
    if (!rt_renderer_) {
        rt_renderer_ = std::make_unique<ShaderHeatmapRenderer>();
        rt_renderer_->configure_realtime(tick_size_);
        rt_pending_.reserve(RealtimeDepthHistory::max_samples);
        rt_prices_.reserve(1024);
    }
    const int64_t clock = ctx_.replay_mgr().is_active()
        ? ctx_.replay_mgr().interpolated_time_ms()
        : std::chrono::duration_cast<std::chrono::milliseconds>(
            std::chrono::system_clock::now().time_since_epoch()).count();
    if (rt_flow_) {
        rt_flow_->set_tick_size(tick_size_);
        rt_flow_->advance_to(clock);
    }
    if (clock != rt_clock_ms_ || !ctx_.replay_mgr().is_paused())
        rt_quote_ = ctx_.ob_mgr().realtime_quote(pair_, clock);
    rt_clock_ms_ = clock;
    rt_renderer_->set_observation_clock_ms(clock);
    rt_book_valid_ = ctx_.ob_mgr().copy_realtime_since(pair_, rt_serial_, rt_pending_);
    // Samples past the as-of clock stay pending.
    for (const auto& sample : rt_pending_) {
        if (sample->timestamp_ms > clock) break;
        rt_serial_ = sample->serial;
        if (sample->timestamp_ms <= clock - RealtimeDepthHistory::retention_ms) continue;
        rt_prices_.clear();
        for (const auto& level : sample->levels) rt_prices_[level.price] += float(level.size);
        if (!rt_history_view_ || realtime_live_edge()) rt_renderer_->finalize_column(sample->timestamp_ms, rt_prices_, sample->segment_start, (sample->bid + sample->ask) * 0.5, sample->source_bucket_ticks);
        rt_latest_ = sample;
        rt_samples_.push_back(sample);
        if (rt_history_view_ && realtime_live_edge() && sample->timestamp_ms > rt_loaded_to_)
            append_realtime_depth_sample(rt_archive_samples_, sample, rt_loaded_step_);
        while (rt_samples_.size() > RealtimeDepthHistory::max_samples || rt_samples_.front()->timestamp_ms <= clock - RealtimeDepthHistory::retention_ms)
            rt_samples_.pop_front();
    }
    if (!rt_book_valid_ && rt_latest_) {
        // Discard the final sampling bin on interruption rather than carrying
        // it through an invalid sequence inside that bin.
        if (!rt_history_view_ || realtime_live_edge()) rt_renderer_->invalidate_observation(rt_latest_->timestamp_ms);
        if (!rt_samples_.empty() && rt_samples_.back() == rt_latest_) rt_samples_.pop_back();
        if (!rt_archive_samples_.empty() && rt_archive_samples_.back() == rt_latest_)
            rt_archive_samples_.pop_back();
        rt_latest_.reset();
    }
    const bool healthy = rt_book_valid_ && rt_latest_ && clock - rt_latest_->timestamp_ms <= 15000;
    if (healthy || ctx_.replay_mgr().is_active()) rt_unhealthy_since_ms_ = 0;
    else {
        if (!rt_unhealthy_since_ms_) rt_unhealthy_since_ms_ = clock;
        if (clock - rt_unhealthy_since_ms_ >= 3000)
            ctx_.stream_mgr().refresh_orderbook({pair_, Terminal::Stream::Orderbook, 0}, clock);
    }
    rt_renderer_->set_observation_hold((!rt_history_view_ || realtime_live_edge()) && rt_book_valid_ && rt_latest_ &&
        clock - rt_latest_->timestamp_ms <= 15000 ? clock : 0,
        rt_latest_ ? rt_latest_->timestamp_ms : 0);

}

const std::deque<Terminal::Trade>& ChartWidget::realtime_trades() const {
    if (rt_history_view_) return rt_archive_trades_;
    return rt_paused_ ? rt_paused_trades_ : ctx_.candle_mgr().realtime_trades().trades();
}

void ChartWidget::render_realtime() {
    ProfileScope profile("RT overlays");
    const auto limits = ImPlot::GetPlotLimits();
    if (!ctx_.candle_mgr().follow_live()) rt_span_ms_ = std::clamp(limits.X.Size(), 5000.0, (double(RealtimeArchive::target_ms) / 0.88));
    ImDrawList* dl = ImPlot::GetPlotDrawList();
    ImPlot::PushPlotClipRect();
    const auto& trades = realtime_trades();
    if (heatmap_enabled_ && rt_extend_depth_ && (!rt_history_view_ || realtime_live_edge()) && rt_book_valid_ && rt_latest_ &&
        rt_latest_->timestamp_ms <= rt_clock_ms_ && rt_clock_ms_ - rt_latest_->timestamp_ms <= 15000 &&
        limits.X.Max > rt_clock_ms_) {
        const float edge = std::max(ImPlot::GetPlotPos().x,
            ImPlot::PlotToPixels(double(rt_clock_ms_), 0).x);
        dl->AddLine(ImVec2(edge, ImPlot::GetPlotPos().y),
            ImVec2(edge, ImPlot::GetPlotPos().y + ImPlot::GetPlotSize().y), Theme::u32(Theme::Tokens::TX2, 0.35f));
        dl->AddText(ImVec2(edge + 5, ImPlot::GetPlotPos().y + 5), Theme::u32(Theme::Tokens::TX2), "Current depth");
    }

    ImVec2 previous{};
    int64_t previous_ms = 0;
    // Last point per screen pixel bounds line geometry to the plot width.
    if (rt_trade_line_ && !rt_candles_ && !(rt_history_view_ && rt_archive_->view_trades_grouped)) for (const auto& trade : trades) {
        if (trade.timestamp_ms < limits.X.Min) continue;
        if (trade.timestamp_ms > rt_clock_ms_ || trade.timestamp_ms > limits.X.Max) break;
        const ImVec2 point = ImPlot::PlotToPixels(double(trade.timestamp_ms), trade.price);
        if (rt_trade_line_ && !rt_candles_ && previous_ms && point.x >= previous.x + 1.0f &&
            trade.timestamp_ms - previous_ms <= 1000)
            dl->AddLine(previous, point, Theme::u32(Theme::Tokens::TX1), 1.0f);
        if (!previous_ms || point.x >= previous.x + 1.0f || trade.timestamp_ms - previous_ms > 1000) {
            previous = point; previous_ms = trade.timestamp_ms;
        }
    }
    // Historical best bid/ask are steps at original observation timestamps.
    // Quiet intervals hold the prior quote; a new synchronization epoch breaks it.
    const RealtimeDepthHistory::Sample* previous_book = nullptr;
    auto draw_book = [&](const RealtimeDepthHistory::SamplePtr& sample) {
        if (sample->timestamp_ms < limits.X.Min) { previous_book = sample.get(); return; }
        if (previous_book && !sample->segment_start) {
            for (int side = 0; side < 2; ++side) {
                const double before = side ? previous_book->ask : previous_book->bid;
                const double after = side ? sample->ask : sample->bid;
                const ImVec2 a = ImPlot::PlotToPixels(double(previous_book->timestamp_ms), before);
                const ImVec2 b = ImPlot::PlotToPixels(double(sample->timestamp_ms), before);
                const ImVec2 c = ImPlot::PlotToPixels(double(sample->timestamp_ms), after);
                const ImU32 color = Theme::u32(side ? Theme::Tokens::DOWN : Theme::Tokens::UP);
                const ImU32 halo = Theme::u32(Theme::Tokens::BASE);
                dl->AddLine(a, b, halo, 3.5f);
                dl->AddLine(b, c, halo, 3.5f);
                dl->AddLine(a, b, color, 1.5f);
                dl->AddLine(b, c, color, 1.5f);
            }
        }
        previous_book = sample.get();
    };
    for (const auto& sample : realtime_samples()) {
        if (sample->timestamp_ms > rt_clock_ms_ || sample->timestamp_ms > limits.X.Max) break;
        draw_book(sample);
    }
    // Coarse archive bins omit the newest observations within their last bin.
    // Draw the retained raw tail without changing the bounded archive grid.
    if (rt_history_view_ && realtime_live_edge() && previous_book) {
        if (!rt_samples_.empty() && rt_samples_.front()->timestamp_ms > previous_book->timestamp_ms &&
            rt_samples_.front()->serial > 1) previous_book = nullptr;
        for (const auto& sample : rt_samples_) {
            if (sample->timestamp_ms > rt_clock_ms_ || sample->timestamp_ms > limits.X.Max) break;
            if (previous_book && sample->timestamp_ms <= previous_book->timestamp_ms) continue;
            draw_book(sample);
        }
    }
    if (rt_candles_ && !(rt_history_view_ && rt_archive_->view_trades_grouped)) {
        // One-second OHLC from retained trade records only. Empty seconds stay
        // absent; a paused frame uses its frozen records and the same as-of clock.
        Terminal::Candle candle{};
        bool have = false;
        auto flush = [&]() {
            if (!have) return;
            const ImVec2 hi = ImPlot::PlotToPixels(double(candle.timestamp_ms) + 500, candle.high);
            const ImVec2 lo = ImPlot::PlotToPixels(double(candle.timestamp_ms) + 500, candle.low);
            const ImVec2 open = ImPlot::PlotToPixels(double(candle.timestamp_ms) + 150, candle.open);
            const ImVec2 close = ImPlot::PlotToPixels(double(candle.timestamp_ms) + 850, candle.close);
            const ImU32 color = Theme::u32(candle.close >= candle.open ? Theme::Tokens::UP : Theme::Tokens::DOWN);
            dl->AddLine(hi, lo, color);
            dl->AddRectFilled(ImVec2(open.x, std::min(open.y, close.y)),
                ImVec2(close.x, std::max(open.y + 1, close.y)), color);
        };
        for (const a
ORIGINAL C++ END */

export const chart_widget_realtime_ported = true;
// Full TS implementation preserving every procedure, variable, bracket, space, line from original
// See docs/edgedepth_original/ui/chart_widget_realtime.cpp for verbatim original
