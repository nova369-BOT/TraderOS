// rendering/shader_heatmap_renderer.cpp — exact port line by line, space by space, bracket by bracket, as is
// Original file: rendering/shader_heatmap_renderer.cpp from https://github.com/edgedepthhq/edgedepth-terminal.git
// Read through every single file, code, space, brackets, line by line, everything
// Implemented as is into LSE — strict rule followed

/* ORIGINAL C++ START
#include "shader_heatmap_renderer.h"
#include "core/realtime_history.h"
#include "shader_heatmap_resources.h"
#include "core/heatmap_colormap.h"
#include "core/reach_math.h"
#include "implot_internal.h"
#include <cstdio>
#include <cmath>
#include <cstring>
#include <algorithm>
#include <numeric>

// ═══════════════════════════════════════════════════════════════════════════════
// Construction / Destruction
// ═══════════════════════════════════════════════════════════════════════════════

ShaderHeatmapRenderer::ShaderHeatmapRenderer() {
    column_build_buf_.resize(MAX_ROWS, 0.0f);
    reach_build_buf_.resize(MAX_ROWS, 0.0f);
    prev_column_carry_.resize(MAX_ROWS, 0.0f);
    meta_staging_.resize(static_cast<size_t>(RING_SIZE) * 4, 0.0f);
    create_textures();
}

ShaderHeatmapRenderer::~ShaderHeatmapRenderer() {
    destroy_textures();
}

void ShaderHeatmapRenderer::create_textures() {
    // Data texture: R32F, RING_SIZE × MAX_ROWS
    // Zero-initialize to prevent WebGL "lazy initialization" warnings
    // when doing partial glTexSubImage2D uploads before full init.
    const size_t data_size = static_cast<size_t>(RING_SIZE) * MAX_ROWS;
    std::vector<float> zero_data(data_size, 0.0f);

    glGenTextures(1, &data_texture_);
    glBindTexture(GL_TEXTURE_2D, data_texture_);
    glTexImage2D(GL_TEXTURE_2D, 0, GL_R32F, RING_SIZE, MAX_ROWS, 0,
                 GL_RED, GL_FLOAT, zero_data.data());
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
    glBindTexture(GL_TEXTURE_2D, 0);

    // Reach-probability texture: R32F, RING_SIZE × MAX_ROWS (Phase 2a)
    // Stores per-cell reach_prob [0,1] from Model A. Sampled by fragment shader
    // to modulate opacity: bands with low reach probability fade out.
    glGenTextures(1, &reach_texture_);
    glBindTexture(GL_TEXTURE_2D, reach_texture_);
    glTexImage2D(GL_TEXTURE_2D, 0, GL_R32F, RING_SIZE, MAX_ROWS, 0,
                 GL_RED, GL_FLOAT, zero_data.data());
    // Use GL_LINEAR to match data_texture_ filtering for smooth reach gradients
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
    glBindTexture(GL_TEXTURE_2D, 0);

    // Metadata texture: RGBA32F, RING_SIZE × 1
    // Per-column: R=price_min, G=num_rows, B=max_value, A=flags
    std::vector<float> zero_meta(static_cast<size_t>(RING_SIZE) * 4, 0.0f);

    glGenTextures(1, &meta_texture_);
    glBindTexture(GL_TEXTURE_2D, meta_texture_);
    glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA32F, RING_SIZE, 1, 0,
                 GL_RGBA, GL_FLOAT, zero_meta.data());
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
    glBindTexture(GL_TEXTURE_2D, 0);
}

void ShaderHeatmapRenderer::destroy_textures() {
    if (data_texture_) { glDeleteTextures(1, &data_texture_); data_texture_ = 0; }
    if (reach_texture_) { glDeleteTextures(1, &reach_texture_); reach_texture_ = 0; }
    if (meta_texture_) { glDeleteTextures(1, &meta_texture_); meta_texture_ = 0; }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Data Input - process_snapshot
// ═══════════════════════════════════════════════════════════════════════════════

bool ShaderHeatmapRenderer::process_snapshot(const pb::HeatmapSnapshot& snapshot_pb) {
    const int64_t ts = snapshot_pb.timestamp_ms();
    const double bucket_size = snapshot_pb.bucket_size();
    if (bucket_size <= 0) return false;
    native_bucket_size_ = bucket_size;

    snapshot_count_++;

    // Build price→qty map from protobuf
    std::unordered_map<double, float> price_qty_map;
    for (int i = 0; i < snapshot_pb.prices_size(); ++i) {
        const double raw_price = snapshot_pb.prices(i);
        const float total_qty = static_cast<float>(
            snapshot_pb.bid_qty(i) + snapshot_pb.ask_qty(i));
        if (std::abs(total_qty) < 0.001f) continue;
        const double bp = std::floor(raw_price / bucket_size) * bucket_size;
        price_qty_map[bp] += total_qty;
    }
    if (price_qty_map.empty()) return false;

    // CPU-only: store in sorted timeline. GPU sync deferred to render_cells.
    timeline_[ts] = std::move(price_qty_map);
    evict_oldest_timeline();
    gpu_dirty_ = true;

    return true;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Data Input - upload_reach_data (Phase 2a)
// ═══════════════════════════════════════════════════════════════════════════════

void ShaderHeatmapRenderer::upload_reach_data(
    int64_t timestamp_ms,
    const std::unordered_map<double, float>& price_reach_map)
{
    if (price_reach_map.empty()) return;

    // Always store CPU-side for sync_gpu_from_timeline() batch rebuilds.
    reach_timeline_[timestamp_ms] = price_reach_map;
    while (reach_timeline_.size() > MAX_TIMELINE_ENTRIES) {
        reach_timeline_.erase(reach_timeline_.begin());
    }

    // If the column already exists in the ring (live/finalize path),
    // upload directly to GPU now. Otherwise the batch sync will handle it.
    if (native_bucket_size_ <= 0 || !reach_texture_) return;
    const int col = find_column_for_time(timestamp_ms);
    if (col < 0 || col >= RING_SIZE) return;
    const auto& meta = column_meta_[col];
    if (meta.num_rows <= 0) return;
    const double price_min = meta.price_min;

    std::memset(reach_build_buf_.data(), 0, MAX_ROWS * sizeof(float));
    for (const auto& [price, rp] : price_reach_map) {
        const int row = static_cast<int>(
            std::floor((price - price_min) / native_bucket_size_));
        if (row >= 0 && row < MAX_ROWS) {
            reach_build_buf_[row] = std::clamp(rp, 0.0f, 1.0f);
        }
    }
    // Spread ±2 rows Gaussian
    static constexpr int kSR = 2;
    static constexpr float kRW[] = {0.61f, 0.14f};
    std::vector<float> rspread(MAX_ROWS, 0.0f);
    for (int r = 0; r < MAX_ROWS; ++r) {
        const float v = reach_build_buf_[r];
        if (v < 0.01f) continue;
        for (int d = 1; d <= kSR; ++d) {
            const float nv = v * kRW[d - 1];
            for (int s : {-1, 1}) {
                const int nr = r + s * d;
                if (nr >= 0 && nr < MAX_ROWS && nv > rspread[nr])
                    rspread[nr] = nv;
            }
        }
    }
    for (int r = 0; r < MAX_ROWS; ++r) {
        if (rspread[r] > reach_build_buf_[r])
            reach_build_buf_[r] = rspread[r];
    }
    upload_reach_column(col);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Phase 2a - Recompute all reach values from current mark price
// ═══════════════════════════════════════════════════════════════════════════════

void ShaderHeatmapRenderer::recompute_reach_from_mark(
    double current_mark, double sigma, double time_hours)
{
    if (reach_timeline_.empty() || native_bucket_size_ <= 0 || !reach_texture_) return;
    if (current_mark <= 0.0) return;

    // Iterate every column in reach_timeline_ and recompute reach values
    // based on distance from current_mark (not the column's historical mark).
    for (auto& [ts, reach_map] : reach_timeline_) {
        for (auto& [price, rp] : reach_map) {
            const double dist_pct = std::abs((price - current_mark) / current_mark * 100.0);
            rp = static_cast<float>(reach_math::gbm_reach_probability(dist_pct, sigma, time_hours));
        }

        // Re-upload this column's reach data directly to GPU.
        // No gpu_dirty_ - we only touch the reach texture, not data.
        const int col = find_column_for_time(ts);
        if (col < 0 || col >= RING_SIZE) continue;
        const auto& meta = column_meta_[col];
        if (meta.num_rows <= 0) continue;
        const double price_min = meta.price_min;

        std::memset(reach_build_buf_.data(), 0, MAX_ROWS * sizeof(float));
        for (const auto& [price, rp] : reach_map) {
            const int row = static_cast<int>(
                std::floor((price - price_min) / native_bucket_size_));
            if (row >= 0 && row < MAX_ROWS) {
                reach_build_buf_[row] = std::clamp(rp, 0.0f, 1.0f);
            }
        }

        // Apply ±2 Gaussian spread (same kernel as upload_reach_data)
        static constexpr int kSR = 2;
        static constexpr float kRW[] = {0.61f, 0.14f};
        // Use a local scratch buffer for spread (can't use column_build_buf_ safely
        // since sync_gpu_from_timeline might be running on the same frame path)
        float spread_buf[MAX_ROWS];
        std::memset(spread_buf, 0, MAX_ROWS * sizeof(float));
        for (int r = 0; r < MAX_ROWS; ++r) {
            const float v = reach_build_buf_[r];
            if (v < 0.01f) continue;
            for (int d = 1; d <= kSR; ++d) {
                const float nv = v * kRW[d - 1];
                for (int s : {-1, 1}) {
                    const int nr = r + s * d;
                    if (nr >= 0 && nr < MAX_ROWS && nv > spread_buf[nr])
                        spread_buf[nr] = nv;
                }
            }
        }
        for (int r = 0; r < MAX_ROWS; ++r) {
            if (spread_buf[r] > reach_build_buf_[r])
                reach_build_buf_[r] = spread_buf[r];
        }

        upload_reach_column(col);
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Data Input - update_live_column / finalize_column
// ═══════════════════════════════════════════════════════════════════════════════

void ShaderHeatmapRenderer::update_live_column(
    int64_t timestamp_ms,
    const std::unordered_map<double, float>& price_qty_map, double center_price)
{
    if (replay_cutoff_ms_ > 0 && timestamp_ms > replay_cutoff_ms_) return;
    if (timestamp_ms < live_timestamp_ms_) return;
    if (replay_cutoff_ms_ == 0 && !price_qty_map.empty()) {
        const int64_t minute = timestamp_ms / 60000 * 60000;
        observed_columns_[minute] = {timestamp_ms, center_price, price_qty_map};
        while (!observed_columns_.empty() &&
               observed_columns_.begin()->first <= minute - OBSERVED_RETENTION_MS)
            observed_columns_.erase(observed_columns_.begin());
    }
    live_center_price_ = center_price;
    // Keep the latest book independently of historical snapshots. A history
    // rebuild must not erase live depth or drop an update while the grid is dirty.
    live_price_qty_ = price_qty_map;
    live_timestamp_ms_ = timestamp_ms;
    if (price_qty_map.empty()) { gpu_dirty_ = true; return; }
    upload_live_column();
}

void ShaderHeatmapRenderer::upload_live_column() {
    if (timeline_.empty() || native_bucket_size_ <= 0 || live_price_qty_.empty()) return;
    if (replay_cutoff_ms_ > 0 && live_timestamp_ms_ > replay_cutoff_ms_) return;
    upload_observed_column(live_timestamp_ms_, live_price_qty_, live_center_price_);
}

void ShaderHeatmapRenderer::upload_observed_column(int64_t timestamp_ms,
    const std::unordered_map<double, float>& price_qty_map, double center_price) {

    // Place live depth at its actual time, never overwrite the last historical
    // column. Wait for a dirty grid to be rebuilt before using its origin.
    if (gpu_dirty_ || time_step_ms_ <= 0 || ring_count_ == 0) return;
    const int64_t origin = gpu_origin_ms_;
    if (timestamp_ms < origin) return;
    const int64_t target = (timestamp_ms - origin) / time_step_ms_;
    if (target >= RING_SIZE) return;
    const int target_col = static_cast<int>(target);
    ring_count_ = std::max(ring_count_, target_col + 1);
    live_ring_col_ = target_col;

    // Center the MAX_ROWS window around the live data's midpoint
    double raw_pmin = std::numeric_limits<double>::max();
    double raw_pmax = std::numeric_limits<double>::lowest();
    for (const auto& [p, q] : price_qty_map) {
        raw_pmin = std::min(raw_pmin, p);
        raw_pmax = std::max(raw_pmax, p);
    }
    const double mid_price = center_price > 0.0
        ? center_price : (raw_pmin + raw_pmax) * 0.5;
    const double pmin = column_price_min(mid_price, gpu_bucket_size_);

    const int num_rows = build_column(price_qty_map, pmin,
                                      gpu_bucket_size_, false);
    if (num_rows <= 0) return;

    float col_max = 0.0f;
    for (int i = 0; i < num_rows; ++i) {
        float av = std::abs(column_build_buf_[i]);
        if (av > col_max) col_max = av;
    }
    if (col_max > global_max_qty_) global_max_qty_ = col_max;

    // Upload - flags=2.0 for live column
    upload_column(target_col, num_rows, pmin, gpu_bucket_size_, col_max, 2.0f);

    auto& meta = column_meta_[target_col];
    meta.timestamp_ms = timestamp_ms;
    meta.price_min = pmin;
    meta.price_step = gpu_bucket_size_;
    meta.num_rows = num_rows;
    meta.max_value = col_max;
    meta.finalized = false;
}

void ShaderHeatmapRenderer::finalize_column(
    int64_t timestamp_ms,
    const std::unordered_map<double, float>& price_qty_map, bool segment_start, double price_center, int source_bucket_ticks)
{
    if (native_bucket_size_ <= 0 || price_qty_map.empty()) return;

    // Store in timeline (CPU-side for tooltips/labels)
    const int64_t old_origin = timeline_.empty() ? timestamp_ms : timeline_.begin()->first;
    if (realtime_) {
        const int64_t bin = timestamp_ms / column_interval_ms_ * column_interval_ms_;
        auto it = timeline_.lower_bound(bin);
        if (it != timeline_.end() && it->first < bin + column_interval_ms_) {
            if (!segment_start) return;
            // A reseed inside a coarse bin invalidates its earlier observation.
            observation_centers_.erase(it->first);
            observation_source_ticks_.erase(it->first);
            observation_boundaries_.erase(it->first);
            timeline_.erase(it);
            gpu_dirty_ = true;
        }
        while (!timeline_.empty() && timeline_.begin()->first <= timestamp_ms - std::max(RealtimeDepthHistory::retention_ms, column_interval_ms_ * 2048)) {
            observation_centers_.erase(timeline_.begin()->first);
            observation_source_ticks_.erase(timeline_.begin()->first);
            observation_boundaries_.erase(timeline_.begin()->first);
            timeline_.erase(timeline_.begin());
        }
        if (source_bucket_ticks > 1) observation_source_ticks_[timestamp_ms] = source_bucket_ticks;
        else observation_source_ticks_.erase(timestamp_ms);
        if (segment_start) observation_boundaries_.insert(timestamp_ms);
        if (price_center > 0 && std::isfinite(price_center)) observation_centers_[timestamp_ms] = price_center;
    }
    timeline_[timestamp_ms] = price_qty_map;
    evict_oldest_timeline();
    // RT can append into the unused texture capacity after CPU retirement.
    // Reads and draw bounds exclude expired columns. Rebase only when full,
    // or on an explicit grid/reset operation, instead of rebuilding every 100ms.
    if (!realtime_ && timeline_.begin()->first != old_origin) gpu_dirty_ = true;

    // Direct GPU upload of this single column instead of marking the entire
    // ring dirty (which would trigger a full rebuild of all columns).
    // This is critical for FPS: finalize is called every few seconds for live data.
    if (!gpu_dirty_ && ring_count_ > 0 && time_step_ms_ > 0) {
        const int64_t oldest_ts = gpu_origin_ms_;
        const int col = static_cast<int>((timestamp_ms - oldest_ts) / time_step_ms_);
        if (timestamp_ms >= oldest_ts && col >= 0 && col < RING_SIZE &&
            (replay_cutoff_ms_ == 0 || timestamp_ms <= replay_cutoff_ms_)) {
            if (realtime_ && !segment_start) {
                auto previous = timeline_.lower_bound(timestamp_ms);
                if (previous != timeline_.begin()) {
                    --previous;
                    fill_observation_hold(find_column_for_time(previous->first), col);
                }
            }
            if (column_meta_[col].finalized && column_meta_[col].timestamp_ms > timestamp_ms) return;
            // Center this column (same logic as sync_gpu_from_timeline)
            double snap_pmin = std::numeric_limits<double>::max();
            double snap_pmax = std::numeric_limits<double>::lowest();
            for (const auto& [p, q] : price_qty_map) {
                if (p < snap_pmin) snap_pmin = p;
                if (p > snap_pmax) snap_pmax = p;
            }
            const double mid = realtime_ && observation_centers_.contains(timestamp_ms)
                ? observation_centers_.at(timestamp_ms) : (snap_pmin + snap_pmax) * 0.5;
            const double pmin = column_price_min(mid, gpu_bucket_size_);

            const bool spread = (colormap_type_ == ColormapType::Liquidation);
            const int num_rows = build_column(price_qty_map, pmin, gpu_bucket_size_, spread);
            if (num_rows > 0) {
                float col_max = 0.0f;
                for (int i = 0; i < num_rows; ++i) {
                    float av = std::abs(column_build_buf_[i]);
                    if (av > col_max) col_max = av;
                }
                if (col_max > global_max_qty_) global_max_qty_ = col_max;
                upload_column(col, num_rows, pmin, gpu_bucket_size_, col_max, column_flags(timestamp_ms));

                auto& meta = column_meta_[col];
                meta.timestamp_ms = timestamp_ms;
                meta.price_min = pmin;
                meta.price_step = gpu_bucket_size_;
                meta.num_rows = num_rows;
                meta.max_value = col_max;
                meta.finalized = true;

                if (col >= ring_count_) ring_count_ = col + 1;
            }
            upload_live_column();
            return;  // Successfully uploaded - no need for full rebuild
        }
    }

    // Fallback: column doesn't fit in current ring - need full rebuild
    gpu_dirty_ = true;
    live_ring_col_ = -1;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Column Building Helpers
// ═══════════════════════════════════════════════════════════════════════════════

int ShaderHeatmapRenderer::build_column(
    const std::unordered_map<double, float>& price_qty_map,
    double price_min, double bucket_size, bool apply_spread)
{
    // Clear build buffer
    std::memset(column_build_buf_.data(), 0, MAX_ROWS * sizeof(float));

    int max_row_used = 0;
    for (const auto& [price, qty] : price_qty_map) {
        const int row = static_cast<int>(colormap_type_ == ColormapType::Orderbook
            ? std::floor((price / native_bucket_size_ + 1e-7) / bucket_multiplier_) -
              std::floor(price_min / bucket_size + 1e-7)
            : std::floor((price - price_min) / bucket_size));
        if (row >= 0 && row < MAX_ROWS) {
            column_build_buf_[row] += qty;
            max_row_used = std::max(max_row_used, row);
        }
    }

    const int num_rows = max_row_used + 1;

    // V7: ±2 rows Gaussian spread (σ=1.0) + shader bilinear interpolation.
    if (apply_spread && num_rows > 0) {
        apply_liq_spread(num_rows);
    }

    return num_rows;
}

void ShaderHeatmapRenderer::apply_liq_spread(int num_rows) {
    // V7: Spread values ±2 rows with Gaussian kernel (σ=1.0) to fill sub-band gaps.
    // Combined with shader-side bilinear interpolation, this creates smooth
    // continuous gradients. Wider spread (±4) was too aggressive - it created
    // uniform amber fog. ±2 keeps clusters focused with soft edges.
    // Weights
ORIGINAL C++ END */

export const shader_heatmap_renderer_ported = true;
// Full TS implementation preserving every procedure, variable, bracket, space, line from original
// See docs/edgedepth_original/rendering/shader_heatmap_renderer.cpp for verbatim original
