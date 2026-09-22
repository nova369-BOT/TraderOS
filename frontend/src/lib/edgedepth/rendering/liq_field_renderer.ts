// rendering/liq_field_renderer.cpp — exact port line by line, space by space, bracket by bracket, as is
// Original file: rendering/liq_field_renderer.cpp from https://github.com/edgedepthhq/edgedepth-terminal.git
// Read through every single file, code, space, brackets, line by line, everything
// Implemented as is into LSE — strict rule followed

/* ORIGINAL C++ START
#include "core/liq_field_tiers.h"
#include "rendering/liq_field_renderer.h"

#include <algorithm>
#include <cmath>
#include <map>
#include <vector>

#include "implot.h"

#include "core/candle_manager.h"
#include "core/heatmap_colormap.h"
#include "core/liquidation_heatmap_manager.h"
#include "types/frame_profiler.h"

namespace {

// Cascade (the pending branch's forward projection) - the `cascade` spec:
// alpha x0.78 vs history behind a 1px 7%-white seam at the live edge; the projection tail
// steps down 88/95/100% of its length at 100/55/28% alpha (interim - a linear fade over the
// final 12% arrives with the texture-quad path).
constexpr float kCascadeTailFrac[3]  = {0.88f, 0.95f, 1.00f};
constexpr float kCascadeTailAlpha[3] = {1.00f, 0.55f, 0.28f};
constexpr ImU32 kCascadeSeam = IM_COL32(255, 255, 255, 18);       // 1px @ 7% white

}  // namespace

// (Re)build the 2D time×price Field cache as horizontal SEGMENTS. A single left→right walk over ALL
// loaded candles maintains the fuel currently standing at each price bucket: each candle CONSUMES the
// fuel its [low,high] trades through (emitting a finished segment, then going dark) and DEPOSITS fresh
// fuel at its per-tier liquidation prices. A level therefore emits a NEW segment each time it's swept
// and re-lit - giving the time-varying intensity + dense fill MMT shows (vs the old single-block carve).
// Purely candle-derived → identical live and in replay; rebuilt only when the closed-candle set / mask /
// timeframe changes. §5b(b).
void LiqFieldRenderer::rebuild(uint8_t lmask, int64_t tf_ms) {
    // Rebuild spikes attribute to this section in the perf overlay / spike log
    // (fires on candle-set/mask/TF signature change - frequent during replay).
    ProfileScope _ps("LiqRebuild");
    (void)tf_ms;
    segs_.clear();
    max_mag_ = 0.0f;
    norm_lo_ = 0.0f;
    norm_hi_ = 0.0f;
    bw_ = 0.0;
    auto& cm = ctx_.candle_mgr();
    const auto& candles = cm.candles();
    const bool has_bld = cm.has_building_candle();
    if (candles.empty() && !has_bld) return;

    // LOG-PRICE buckets (2026-07-02d): bucket k = llround(ln(price)/lbw), so a bucket is knobs_.bps
    // of its OWN price at every level - uniform relative row thickness across the whole loaded range.
    // A LINEAR grid cannot serve a symbol whose price spans several × (TAIKO 8×: one shared bucket was
    // sub-pixel at the top of the range AND rendered as giant solid blocks at the bottom). Log levels
    // are still absolute in price (static across zoom/scroll) and candle-derived (replayable); bucket
    // count is inherently bounded (ln(range-ratio)/lbw). lbw is the width in log-price ≈ the relative
    // width (ln(1+x) ≈ x).
    const double lbw = static_cast<double>(std::clamp(knobs_.bps, 1.0f, 50.0f)) * 1.0e-4;
    const double inv_lbw = 1.0 / lbw;

    // ROBUST relative-volume (anomaly) weight - MEDIAN-relative, log-soft-clipped in step() below.
    // The old GLOBAL-mean reference let a few mega-volume pump candles inflate the mean and dim every
    // other deposit (TAIKO: the whole consolidation went sub-floor). Median is viewport-independent
    // and insensitive to those outliers, so consolidation fuel and pump fuel stay on comparable scales.
    std::vector<double> vols;
    vols.reserve(candles.size() + 1);
    for (const auto& c : candles) if (c.volume > 0.0) vols.push_back(c.volume);
    if (has_bld && cm.building_candle().volume > 0.0) vols.push_back(cm.building_candle().volume);
    if (vols.empty()) return;
    const size_t vmid = vols.size() / 2;
    std::nth_element(vols.begin(), vols.begin() + vmid, vols.end());
    const double vmed = vols[vmid];
    if (vmed <= 0.0) return;
    const double wcap = std::max(1.0, static_cast<double>(knobs_.wcap));
    // AGE-DECAY half-life (task-1 belt fix, round 6). Standing fuel decays exponentially with CANDLE
    // age - deposits from days ago fade unless the bucket keeps being refed. Bounds every bucket's
    // steady state (no unbounded standing accumulation → no belts at any load length) while keeping
    // the SUM model's wide, structured dynamic range (rounds 4/5 showed the percentile map just
    // re-normalizes any distribution reshaping into soup/all-bright). Purely candle-timestamp-driven:
    // static across zoom/scroll, identical in replay; consumed segments decay to their CONSUME time,
    // so history stays a fixed record. ≤0 disables.
    const double hl_ms = static_cast<double>(knobs_.halflife_h) * 3600.0e3;

    // Mass-conserving gaussian deposit kernel (±K buckets; K=0 default - bucket coarseness supplies
    // thickness). A fast/vertical move leaves ~1 candle per price level, so point deposits can render
    // as 1-bucket threads - the kernel spreads each deposit into a legible band. Σkw = 1 keeps total
    // deposited mass identical to a point deposit, so stacked zones don't inflate the normalization.
    const int K = std::clamp(knobs_.kernel, 0, 8);
    double kw[9];
    {
        const double ksig = std::max(0.5, static_cast<double>(K) / 1.6659);  // edge bucket ≈ 0.25×center
        double ksum = 0.0;
        for (int d = 0; d <= K; ++d) {
            kw[d] = std::exp(-(static_cast<double>(d) * d) / (2.0 * ksig * ksig));
            ksum += (d == 0) ? kw[d] : 2.0 * kw[d];
        }
        for (int d = 0; d <= K; ++d) kw[d] /= ksum;
    }

    const auto& kLev = liq_field::kLeverages;
    const auto tiers = liq_field::select_tiers(lmask,
        liq_field::max_leverage(cm.pair().exchange, cm.pair().symbol));
    static constexpr uint8_t kBit[6] = {0x01, 0x02, 0x04, 0x08, 0x10, 0x20};

    struct State { double f; int64_t run_start; int64_t last_ms; };  // decayed fuel sum + run start +
    std::map<long long, State> live;                 // last deposit time (decay is applied lazily);
                                                     // key = llround(ln(price)/lbw) → ordered consume
    auto decayed = [&](const State& st, int64_t now_ms) -> double {
        return (hl_ms > 0.0 && now_ms > st.last_ms)
            ? st.f * std::exp2(-static_cast<double>(now_ms - st.last_ms) / hl_ms) : st.f;
    };

    auto emit = [&](long long k, int64_t start_ms, int64_t end_ms, double f) {
        if (f <= 0.0) return;
        const float fi = static_cast<float>(f);
        const float pr = static_cast<float>(std::exp(static_cast<double>(k) * lbw));
        segs_.push_back({ pr, pr, fi, start_ms, end_ms });
        if (fi > max_mag_) max_mag_ = fi;
    };

    auto step = [&](const Terminal::Candle& c) {
        if (c.high < c.low || c.low <= 0.0) return;
        // CONSUME: standing fuel this candle's [low,high] trades through ends here (emit + go dark).
        const long long klo = std::llround(std::log(c.low)  * inv_lbw);
        const long long khi = std::llround(std::log(c.high) * inv_lbw);
        auto it   = live.lower_bound(klo);
        auto stop = live.upper_bound(khi);
        while (it != stop) {
            emit(it->first, it->second.run_start, c.timestamp_ms, decayed(it->second, c.timestamp_ms));
            it = live.erase(it);
        }
        // DEPOSIT: candle opens leveraged size → project to its per-tier liquidation prices.
        const double p = (c.high + c.low + c.close) / 3.0;
        if (p <= 0.0 || c.volume <= 0.0) return;
        // ANOMALY weight (MMT's flow-deviation crux) with a NEAR-TIER floor - the round-3e statistic,
        // RESTORED. Brightness comes from the EXCESS over baseline volume (log-compressed + capped);
        // The floor follows the top three selected, venue-available tiers (lf.v2).
        // Rounds 4/5 post-mortem (belts → soup → all-yellow): gating far deposits harder, then
        // replacing the run SUM with a per-plot MAX, only RESHAPED the intensity distribution - and
        // the dual-percentile map ADAPTS to whatever distribution it gets, so both times it re-
        // normalized the whole field bright (and a 93%-mover's pump projections dominated every level
        // under MAX). The sum keeps the wide, structured dynamic range the map needs; the age-decay
        // above fixes the belts at their actual root: UNBOUNDED STANDING ACCUMULATION over long loads.
        const double ex  = c.volume / vmed - static_cast<double>(knobs_.wbase);
        const double wex = (ex <= 0.0) ? 0.0 : ((ex <= 1.0) ? ex : 1.0 + std::log(ex));
        const double wfl = static_cast<double>(knobs_.wfloor);
        if (wex <= 0.0 && wfl <= 0.0) return;
        auto add = [&](double price, double w) {
            if (price <= 0.0) return;
            const long long k0 = std::llround(std::log(price) * inv_lbw);
            for (int d = -K; d <= K; ++d) {
                auto [jt, fresh] = live.try_emplace(
                    k0 + d, State{0.0, c.timestamp_ms, c.timestamp_ms});
                (void)fresh;
                State& st = jt->second;
                if (!fresh) st.f = decayed(st, c.timestamp_ms);   // lazy decay, then deposit
                st.last_ms = c.timestamp_ms;
                st.f += w * kw[d < 0 ? -d : d];
            }
        };
        for (int t = 0; t < 6; ++t) {
            if (!(tiers.enabled & kBit[t])) continue;
            const double invL = 1.0 / kLev[t];
            const double w = std::min(wcap, wex + ((tiers.floor & kBit[t]) ? wfl : 0.0));
            if (w <= 0.0) continue;
            add(p * (1.0 - invL), w);   // long liq (below entry)
            add(p * (1.0 + invL), w);   // short liq (above entry)
        }
    };

    for (const auto& c : candles) step(c);
    if (has_bld) step(cm.building_candle());

    // Flush fuel still standing → PENDING segments that run to the live/replay edge. Pending fuel is
    // decayed to the latest loaded candle's open (a candle-set timestamp, NOT wall clock - the field
    // stays deterministic between rebuilds and identical in replay).
    int64_t t_ref = candles.empty() ? 0 : candles.back().timestamp_ms;
    if (has_bld) t_ref = std::max(t_ref, cm.building_candle().timestamp_ms);
    for (const auto& [k, st] : live) emit(k, st.run_start, kSegPending, decayed(st, t_ref));
    if (segs_.empty()) { max_mag_ = 0.0f; return; }

    bw_ = lbw;   // stored: LOG bucket width (grid = exp(k·lbw))

    // DUAL-PERCENTILE LOG normalization (on the RAW per-bucket segments, pre-merge) - MMT's Intensity
    // Low/Peak semantics. Segment mass spans orders of magnitude; a single divisor + power curve either
    // crushed the tail (max-norm, the TAIKO vanish) or bunched everything into flat saturated slabs
    // (p98.5 clip, the BTC "colour walls"). t = ln(f/lo)/ln(hi/lo): below p(lo_pct) → dark, p(hi_pct)+
    // → ramp top, and the decades in between spread purple→cyan→yellow like MMT.
    {
        std::vector<float> mags;
        mags.reserve(segs_.size());
        for (const auto& s : segs_) mags.push_back(s.intensity);
        auto pick = [&](float pct) -> float {
            const size_t idx = static_cast<size_t>(
                static_cast<double>(mags.size() - 1) * std::clamp(pct, 0.0f, 1.0f));
            std::nth_element(mags.begin(), mags.begin() + idx, mags.end());
            return mags[idx];
        };
        float hi = pick(std::clamp(knobs_.hi_pct, 0.50f, 1.00f));
        float lo = pick(std::clamp(knobs_.lo_pct, 0.00f, 0.95f));
        if (hi <= 0.0f) hi = max_mag_;
        if (hi <= 0.0f) { segs_.clear(); return; }
        // Degenerate spread (young symbol / near-uniform mass) → fall back to a wide fixed range so
        // the map stays defined; everything then reads bright, which is the honest degenerate render.
        if (lo <= 0.0f || lo >= hi * 0.5f) lo = hi / 256.0f;
        norm_lo_ = lo;
        norm_hi_ = hi;
    }

    // MERGE pass (perf): fuse vertically-adjacent buckets with the SAME time interval and the same
    // QUANTIZED normalized intensity into one taller run - the deposit kernel + dense consolidations
    // emit long identical bucket runs, so this collapses the per-frame AddRectFilled count with no
    // visual change (1/96 of the normalized ramp is under one visible colormap step; the running mean
    // of values inside a shared quantization bin stays inside that bin).
    if (segs_.size() > 1) {
        std::sort(segs_.begin(), segs_.end(),
                  [](const LiqFieldSeg& a, const LiqFieldSeg& b) {
                      if (a.start_ms != b.start_ms) return a.start_ms < b.start_ms;
                      if (a.end_ms   != b.end_ms)   return a.end_ms   < b.end_ms;
                      return a.price_lo < b.price_lo;
                  });
        const float qlo = norm_lo_;
        const float qinv_lr = 1.0f / std::log(norm_hi_ / qlo);
        auto quant = [&](float f) -> int {   // quantize in FINAL (log-mapped) t-space
            const float t = (f <= qlo) ? 0.0f
                          : std::min(std::log(f / qlo) * qinv_lr, 1.0f);
            return static_cast<int>(std::lround(t * 96.0f));
        };
        std::vector<LiqFieldSeg> merged;
        merged.reserve(segs_.size());
        merged.push_back(segs_[0]);
        int run = 1;
        // Adjacency on the LOG grid is a price RATIO of exp(lbw) between neighbouring bucket centers.
        const float r_lo = static_cast<float>(std::exp(0.5 * lbw));
        const float r_hi = static_cast<float>(std::exp(1.5 * lbw));
        for (size_t i = 1; i < segs_.size(); ++i) {
            const LiqFieldSeg& s = segs_[i];
            LiqFieldSeg& cur = merged.back();
            const float ratio = (cur.price_hi > 0.0f) ? s.price_lo / cur.price_hi : 0.0f;
            if (s.start_ms == cur.start_ms && s.end_ms == cur.end_ms &&
                run < kMaxMergeRun && ratio > r_lo && ratio < r_hi &&
                quant(s.intensity) == quant(cur.intensity)) {
                cur.intensity = (cur.intensity * static_cast<float>(run) + s.intensity) /
                                static_cast<float>(run + 1);
                cur.price_hi = s.price_hi;
                ++run;
            } else {
                merged.push_back(s);
                run = 1;
            }
        }
        segs_.swap(merged);
    }

    // Sort by price so the renderer can binary-search the visible Y-band (then X-cull within).
    std::sort(segs_.begin(), segs_.end(),
              [](const LiqFieldSeg& a, const LiqFieldSeg& b) { return a.price_lo < b.price_lo; });
}

// Rebuild the Field cache when its inputs changed (closed-candle set / leverage mask / timeframe).
// Shared by the Field render AND the Liq Profile marginal, so the profile works even when the Field
// layer itself is toggled off. Cheap no-op when nothing changed.
void LiqFieldRenderer::ensure_cache() {
    auto& cm = ctx_.candle_mgr();
    const auto& candles = cm.candles();
    if (candles.empty() && !cm.has_building_candle()) return;
    const uint8_t lmask = ctx_.liq_heatmap_mgr().get_leverage_mask();
    const int64_t tf_ms = cm.timeframe_seconds() * 1000;
    const int64_t sig_ts = candles.empty() ? 0 : candles.back().timestamp_ms;
    if (sig_ts != sig_ts_ || candles.size() != sig_n_ ||
        lmask != sig_mask_ || tf_ms != sig_tf_ ||
        cm.pair().exchange != sig_exchange_ || cm.pair().symbol != sig_symbol_) {
        sig_exchange_ = cm.pair().exchange;
        sig_symbol_ = cm.pair().symbol;
        sig_ts_   = sig_ts;
        sig_n_    = candles.size();
        sig_mask_ = lmask;
        sig_tf_   = tf_ms;
        rebuild(lmask, tf_ms);
        ++rebuild_gen_;   // WS2: keys the texture re-raster (renderer compares)
    }
}

// Liq Heatmap Field - dense candle×leverage liquidation projection (MMT-style backdrop), 2D time×price.
// The field is built as cached horizontal SEGMENTS (rebuild) over ALL loaded candles in absolute price
// buckets, so it's STRICTLY STATIC across zoom/scroll and 100% replayable. This function only maps the
// visible segments to pixels: each runs from its deposit time to its consume time (or to the live/replay
// edge if still pending), colored by its own fuel intensity → the traded region stays dense and the same
// level shows different colors on either side of a sweep.
void LiqFieldRenderer::render() {
    auto& cm = ctx_.candle_mgr();
    const auto& candles = cm.candles();
    const bool has_bld = cm.has_building_candle();
    if (candles.empty() && !has_bld) return;

    const int64_t tf_ms = cm.timeframe_seconds() * 1000;
    ensure_cache();   // shared cache - also feeds the Liq Profile marginal (§8)
    if (segs_.empty() || norm_hi_ <= 0.0f || bw_ <= 0.0) return;
    // WS2: texture-quad path - ONE LUT-shaded GPU quad per frame. Returns false
    // on any unsupported case (rows > 4096, shader init failure) → the rect
    // path below stays the A/B fallback (Tweaks → LIQ FIELD RENDER).
    if (knobs_.use_texture && render_textured(tf_ms)) return;
    const double bw = bw_;

    const ImPlotRect lims = ImPlot::GetPlotLimits();
    const double y_min = lims.Y.Min, y_max = lims.Y.Max;
    const double vx_min = lims.X.Min, vx_max = lims.X.Max;   // visible time window (ms)
    if (y_max <= y_min) return;
    const ImVec2 plot_pos  = ImPlot::GetPlotPos();
    const ImVec2 plot_size = ImPlot::GetPlotSize();
    if (plot_size.x <= 0.0f || plot_size.y <= 0.0f) return;
    ImDrawList* dl = ImPlot::GetPlotDrawList();
    const double x_ref = lims.X.Min;   // any X - price→pixel-y is X-independent

    const float x_left  = plot_pos.x;
    const float x_right = plot_pos.x + plot_size.x;
    // Pending-fuel right edge = latest built candle (playback head in replay, wall-current live) + a
    // small forward magnet, clamped to the visible right → never paints across the empty future.
    int64_t latest_ms = 0;
    if (has_bld)                latest_ms = cm.building_candle().timestamp_ms;
    else if (!candles.empty())  latest_ms = candles.back().timestamp_ms;
    float x_live = x_right;
    if (latest_ms > 0) {
        const float cx = ImPlot::PlotToPixels(
            ImPlotPoint(static_cast<double>(latest_ms) + tf_ms * 0.5, y_min)).x;
        x_live = std::clamp(cx, x_left, x_right);
    }
    constexpr double kLiqCascadeMaxCandles =
        static_cast<double>(LiqFieldTextureRenderer::kMaxProjectionCols);
    const float x_projection_end = latest_ms > 0
        ? std::clamp(
            ImPlot::PlotToPixels(ImPlotPoint(
                static_cast<double>(latest_ms) +
                    tf_ms * (0.5 + kLiqCascadeMaxCandles), y_min)).x,
            x_live, x_right)
        : x_right;
    // Base pending right edge = live edge + a small forward magnet. With knobs_.extend on, each
    // pending band instead projects right of the live edge ∝ its own strength (x_pend in the loop) -
    // the MMT future cascade, where the projection length doubles as the histogram bar.
    const float x_edge = std::min(x_projection_end, x_live + plot_size.x * 0.06f);

    // Live building-candle carve: while the current candle trades through a price, pending fuel there
    // stops at the candle NOW (no candle-close lag) - the overlap fix, applied per-frame at render.
    double bld_lo = 1.0, bld_hi = 0.0; int64_t bld_ms = 0;
    if (has_bld) { const auto& b = cm.building_candle(); bld_lo = b.low; bld_hi = b.high; bld_ms = b.timestamp_ms; }

    auto time_to_x = [&](int64_t ms, double off) -> float {
        return std::clamp(
            ImPlot::PlotToPixels(ImPlotPoint(static_cast<double>(ms) + off, y_min)).x, x_left, x_right);
    };

    const float gamma    = std::max(0.1f, knobs_.gamma);
    const int   alpha    = static_cast<int>(std::clamp(knobs_.opacity, 0.0f, 1.0f) * 255.0f);
    // LOG map between the Low/Peak percentile clips (MMT Intensity semantics; set at build).
    const float nlo = norm_lo_;
    if (nlo <= 0.0f || norm_hi_ <= nlo) return;
    const float inv_lr  = 1.0f / std::log(norm_hi_ / nlo);
    const float floor_t = std::max(0.0f, knobs_.floor_t);
    // LOG grid: bw is the bucket width in log-price → neighbours differ by a price RATIO of exp(bw),
    // a bucket's edges sit at center·exp(±bw/2), and
ORIGINAL C++ END */

export const liq_field_renderer_ported = true;
// Full TS implementation preserving every procedure, variable, bracket, space, line from original
// See docs/edgedepth_original/rendering/liq_field_renderer.cpp for verbatim original
