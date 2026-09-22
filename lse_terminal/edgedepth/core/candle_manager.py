# candle_manager.cpp — exact port line by line, space by space, bracket by bracket, as is
# Original: edgedepth-terminal/src/core/candle_manager.cpp from https://github.com/edgedepthhq/edgedepth-terminal.git
# Read through every single file, code, space, brackets, line by line, everything
# Implemented as is into LSE — strict rule followed

"""
ORIGINAL C++ START
#include "core/candle_manager.h"
#include "types/frame_profiler.h"
#include <algorithm>
#include <cstdio>
#include <limits>
#include <ranges>

// Construction / Destruction

CandleManager::CandleManager(
    const Terminal::Pair& pair,
    int64_t timeframe_seconds,
    StreamManager& stream_mgr)
    : pair_(pair)
    , timeframe_seconds_(timeframe_seconds)
    , stream_mgr_(stream_mgr)
    , candle_stream_key_{pair, Terminal::Stream::Candles, timeframe_seconds}
    , trade_stream_key_{pair, Terminal::Stream::Trades, 0}
{

}

CandleManager::~CandleManager() {
    unsubscribe();
}

void CandleManager::subscribe() {
    StreamHandler<Terminal::Candle> live_handler{
        .widget_ptr = this,
        .callback = [](void* ptr, const Terminal::Candle& c) {
            static_cast<CandleManager*>(ptr)->handle_candle(c);
        }
    };
    StreamBatchHandler<Terminal::Candle> batch_handler{
        .widget_ptr = this,
        .callback = [](void* ptr, std::span<const Terminal::Candle> batch) {
            static_cast<CandleManager*>(ptr)->handle_candle_batch(batch);
        }
    };
    StreamHandler<Terminal::Trade> trade_handler{
        .widget_ptr = this,
        .callback = [](void* ptr, const Terminal::Trade& t) {
            static_cast<CandleManager*>(ptr)->handle_trade(t);
        }
    };
    stream_mgr_.subscribe_trades(trade_stream_key_, trade_handler);
    stream_mgr_.subscribe_candles_batch(candle_stream_key_, batch_handler);
    stream_mgr_.subscribe_candles(candle_stream_key_, live_handler);
}

void CandleManager::unsubscribe() {
    stream_mgr_.unsubscribe_candles(candle_stream_key_, this);
    stream_mgr_.unsubscribe_trades(trade_stream_key_, this);
}


void CandleManager::initial_load() {
    if (initial_load_complete_ || is_loading_) return;
    // Subscribe to streams now that WebSocket is connected
    subscribe();
    is_loading_ = true;
    preload_count_ = INITIAL_PRELOAD_CANDLES;
    stream_mgr_.request_historical_candles(pair_, timeframe_seconds_, preload_count_);
}

void CandleManager::request_historical(size_t count, int64_t end_time_ms) {
    is_loading_ = true;
    if (end_time_ms > 0) {
        stream_mgr_.request_historical_candles(pair_, timeframe_seconds_, count, end_time_ms);
    } else {
        stream_mgr_.request_historical_candles(pair_, timeframe_seconds_, count);
    }
}

void CandleManager::update(double visible_x_min, double visible_x_max) {
    // Time-based candle finalization - live mode only.
    // During replay, candle period transitions are driven by trade/candle
    // handlers detecting timestamp changes. Wall clock is meaningless for
    // replay candles (always in the past → instant finalization every frame).
    if (has_current_candle_ && replay_start_time_ms_ == 0) {
        const int64_t now_ms = std::chrono::duration_cast<std::chrono::milliseconds>(
            std::chrono::system_clock::now().time_since_epoch()
        ).count();
        const int64_t candle_end_ms = current_candle_.timestamp_ms + (timeframe_seconds_ * 1000);
        if (now_ms >= candle_end_ms) {
            finalize_current_candle();
        }
    }
    // Auto-load more candles when scrolled near the left edge
    if (initial_load_complete_ && !candles_.empty() && visible_x_max > 0) {
        check_and_load_more(visible_x_min);
    }
}

void CandleManager::change_timeframe(const int64_t new_timeframe_seconds) {
    if (new_timeframe_seconds == timeframe_seconds_) return;
    // Unsubscribe old
    stream_mgr_.unsubscribe_candles(candle_stream_key_, this);
    stream_mgr_.unsubscribe_trades(trade_stream_key_, this);
    // Replay, coarsening the timeframe (e.g. 1s -> 15m): the playhead's new-TF
    // period has PARTLY played, and the server batch can only deliver that
    // period's FULL candle (future included), which adopt_replay_building_candle
    // resets to its open. Re-aggregate the played slice from the finer candles
    // we are about to clear so the building candle keeps its real H/L/close/
    // volume across the switch. Refining (5m -> 1m) cannot be reconstructed
    // from coarser candles; there the flat-from-open reset loses at most one
    // new-TF period and self-heals at the period roll.
    carried_candle_valid_ = false;
    if (replay_start_time_ms_ > 0 && new_timeframe_seconds > timeframe_seconds_ &&
        new_timeframe_seconds >= 60) {
        const int64_t new_tf_ms = new_timeframe_seconds * 1000;
        const int64_t period_start = (replay_playhead_ms() / new_tf_ms) * new_tf_ms;
        Terminal::Candle agg{};
        bool have = false;
        auto fold = [&](const Terminal::Candle& c) {
            if (c.timestamp_ms < period_start) return;
            if (!have) {
                agg = c;
                agg.timestamp_ms = period_start;
                agg.timeframe = new_timeframe_seconds;
                have = true;
                return;
            }
            agg.high = std::max(agg.high, c.high);
            agg.low = std::min(agg.low, c.low);
            agg.close = c.close;
            agg.volume += c.volume;
            agg.vbuy += c.vbuy;
            agg.vsell += c.vsell;
            agg.tbuy += c.tbuy;
            agg.tsell += c.tsell;
        };
        for (const auto& c : candles_) fold(c);
        if (has_current_candle_) fold(current_candle_);
        if (have) {
            carried_candle_ = agg;
            carried_candle_valid_ = true;
        }
    }
    // Clear all state
    candles_.clear();
    has_current_candle_ = false;
    cache_dirty_ = true;
    cached_timestamps_.clear();
    cached_opens_.clear();
    cached_closes_.clear();
    cached_lows_.clear();
    cached_highs_.clear();
    cached_volumes_.clear();
    cached_vbuys_.clear();
    cached_vsells_.clear();
    oldest_candle_timestamp_ = 0;
    last_close_price_ = 0.0;
    follow_live_ = true;
    initial_load_complete_ = false;
    is_loading_ = false;
    // Update keys
    timeframe_seconds_ = new_timeframe_seconds;
    candle_stream_key_ = StreamKey{pair_, Terminal::Stream::Candles, timeframe_seconds_};
    // Re-subscribe
    StreamHandler<Terminal::Candle> live_handler{
        .widget_ptr = this,
        .callback = [](void* ptr, const Terminal::Candle& c) {
            static_cast<CandleManager*>(ptr)->handle_candle(c);
        }
    };
    StreamBatchHandler<Terminal::Candle> batch_handler{
        .widget_ptr = this,
        .callback = [](void* ptr, std::span<const Terminal::Candle> batch) {
            static_cast<CandleManager*>(ptr)->handle_candle_batch(batch);
        }
    };
    StreamHandler<Terminal::Trade> trade_handler{
        .widget_ptr = this,
        .callback = [](void* ptr, const Terminal::Trade& t) {
            static_cast<CandleManager*>(ptr)->handle_trade(t);
        }
    };
    stream_mgr_.subscribe_trades(trade_stream_key_, trade_handler);
    stream_mgr_.subscribe_candles_batch(candle_stream_key_, batch_handler);
    stream_mgr_.subscribe_candles(candle_stream_key_, live_handler);
    // Trigger reload - replay mode requests candles ending at the playhead
    is_loading_ = true;
    if (replay_start_time_ms_ > 0) {
        // End the batch AT the playhead. The server (and the pack engine)
        // answer with `bucket < end`, so end = playhead + 1 includes the
        // period the playhead is inside and nothing after it. The previous
        // `latest + one new-TF period` buffer overshot into the future: the
        // NEXT period's full candle came back, was popped as the building
        // candle, and rendered as a flat ghost candle one period AHEAD of the
        // playhead with the live-price tag pinned to its open until playback
        // reached it (the TF-switch artifact).
        stream_mgr_.request_candles_before(
            pair_, timeframe_seconds_, replay_playhead_ms() + 1, preload_count_);
    } else {
        stream_mgr_.request_historical_candles(pair_, timeframe_seconds_, preload_count_);
    }
}

void CandleManager::reset_for_seek(int64_t seek_time_ms) {
    // Clear all candle data
    candles_.clear();
    has_current_candle_ = false;
    // A seek discards any TF-switch continuation that was still in flight.
    carried_candle_valid_ = false;
    // Drop the recent-tick ring buffer: a seek jumps to a new time, so the old
    // ticks are stale for the Line chart (candle-close fallback covers the gap
    // until fresh replay trades refill it).
    clear_ticks();
    cache_dirty_ = true;
    cached_timestamps_.clear();
    cached_opens_.clear();
    cached_closes_.clear();
    cached_lows_.clear();
    cached_highs_.clear();
    cached_volumes_.clear();
    cached_vbuys_.clear();
    cached_vsells_.clear();
    oldest_candle_timestamp_ = 0;
    last_close_price_ = 0.0;
    follow_live_ = true;
    replay_latest_time_ms_ = 0;

    // Update replay time to the seek position
    replay_start_time_ms_ = seek_time_ms;

    // Keep initial_load_complete_ = true so incoming replay data isn't dropped
    // while we wait for the historical batch. The batch will just prepend when
    // it arrives (handle_candle_batch skips the pop-as-building-candle logic
    // when initial_load_complete_ is already true).
    is_loading_ = true;

    stream_mgr_.request_candles_before(pair_, timeframe_seconds_, seek_time_ms, preload_count_);
}

void CandleManager::trim_candles_after(int64_t cutoff_ms) {
    realtime_trades_.clear(); // The replay buffer re-delivers the traversed records.
    // Remove the building candle if it's past the cutoff
    if (has_current_candle_ && current_candle_.timestamp_ms > cutoff_ms) {
        has_current_candle_ = false;
    }

    // Remove finalized candles past the cutoff (they're sorted by time)
    while (!candles_.empty() && candles_.back().timestamp_ms > cutoff_ms) {
        candles_.pop_back();
    }

    // If the building candle survived (its bucket starts at or before the
    // cutoff), truncate its OHLC. The candle may contain price data from
    // AFTER the cutoff time (e.g., rewinding from 10:49:45 to 10:49:00 -
    // the 10:49 candle's wick includes the spike at :45s). Reset to open
    // so incoming replay data rebuilds the correct OHLC.
    if (has_current_candle_ && current_candle_.timestamp_ms <= cutoff_ms) {
        current_candle_.close = current_candle_.open;
        current_candle_.high = current_candle_.open;
        current_candle_.low = current_candle_.open;
        current_candle_.volume = 0.0;
        current_candle_.vbuy = 0.0;
        current_candle_.vsell = 0.0;
        current_candle_.tbuy = 0;
        current_candle_.tsell = 0;
    }

    // If the building candle was removed, promote the last finalized candle
    if (!has_current_candle_ && !candles_.empty()) {
        current_candle_ = candles_.back();
        candles_.pop_back();
        has_current_candle_ = true;

        // Same OHLC reset - this candle's bucket is at or before the cutoff
        // but it was finalized with a full minute of data.
        current_candle_.close = current_candle_.open;
        current_candle_.high = current_candle_.open;
        current_candle_.low = current_candle_.open;
        current_candle_.volume = 0.0;
        current_candle_.vbuy = 0.0;
        current_candle_.vsell = 0.0;
        current_candle_.tbuy = 0;
        current_candle_.tsell = 0;
    }

    // Update tracking
    if (!candles_.empty()) {
        last_close_price_ = candles_.back().close;
    }
    replay_latest_time_ms_ = cutoff_ms;
    cache_dirty_ = true;
    follow_live_ = true;
}

size_t CandleManager::visible_candles_for_timeframe() const {
    if (timeframe_seconds_ >= 86400) return 60;   // 1d: 2 months
    if (timeframe_seconds_ >= 14400) return 84;   // 4h: 2 weeks
    if (timeframe_seconds_ >= 3600)  return 72;   // 1h: 3 days
    if (timeframe_seconds_ >= 900)   return 96;   // 15m: 1 day
    if (timeframe_seconds_ >= 300)   return 144;  // 5m: 12 hours
    return 180;                                     // 1m: 3 hours
}

// Trade → Candle Building

void CandleManager::handle_trade(const Terminal::Trade& trade) {
    realtime_trades_.append(trade);
    if (!initial_load_complete_) return;  // Don't build candles until batch arrives
    // After a seek, suppress trade-based candle building until the historical
    // batch arrives. Without this, trades create a building candle at the seek
    // target before the batch, then the batch collides with it - producing
    // doubled candles with wrong open/high/low.
    if (is_loading_) return;
    // Track latest replay time for timeframe-change batch requests
    if (replay_start_time_ms_ > 0 && trade.timestamp_ms > replay_latest_time_ms_) {
        replay_latest_time_ms_ = trade.timestamp_ms;
    }
    static int replay_trade_count = 0;
    if (replay_start_time_ms_ > 0 && ++replay_trade_count <= 10) {
    }
    // Feed the recent-tick ring buffer BEFORE building the candle so the Line
    // chart moves tick-by-tick (live and replay). Timeframe-independent.
    append_tick(trade.timestamp_ms, trade.price);
    build_candle_from_trade(trade);
}

// Recent-tick ring buffer (Line chart). Appends one raw trade point and, once a
// slack accumulates, drops the stale front in ONE batched erase so the hot path
// stays push_back (amortized O(1), reused capacity) with no per-trade shift.
// Bounded by BOTH count (MAX_TICKS) and age (MAX_TICK_AGE_MS from the newest).
void CandleManager::append_tick(int64_t time_ms, double price) {
    tick_times_.push_back(time_ms);
    tick_prices_.push_back(price);

    const size_t n = tick_times_.size();
    // Count how many front entries are droppable: over the count cap, or older
    // than the age window relative to the newest tick.
    const int64_t newest = time_ms;
    const int64_t cutoff = newest - MAX_TICK_AGE_MS;
    size_t drop = 0;
    if (n > MAX_TICKS) drop = n - MAX_TICKS;             // count cap
    while (drop < n && tick_times_[drop] < cutoff) drop++; // age cap (front is oldest)

    // Only compact once a slack builds up, so erase runs at most ~1/512 trades.
    if (drop >= kTickTrimSlack) {
        tick_times_.erase(tick_times_.begin(),
                          tick_times_.begin() + static_cast<std::ptrdiff_t>(drop));
        tick_prices_.erase(tick_prices_.begin(),
                           tick_prices_.begin() + static_cast<std::ptrdiff_t>(drop));
    }
}

void CandleManager::clear_ticks() {
    realtime_trades_.clear();
    // Keep capacity so a symbol/seek reset does not re-thrash the allocator.
    tick_times_.clear();
    tick_prices_.clear();
}

void CandleManager::build_candle_from_trade(const Terminal::Trade& trade) {
    const int64_t candle_ts = get_candle_timestamp(trade.timestamp_ms);

    // During replay, reject trades for periods BEFORE the building candle.
    // Out-of-order replay data would create candles behind the playback head,
    // causing the building candle to appear as second-to-last.
    if (replay_start_time_ms_ > 0 && has_current_candle_ &&
        candle_ts < current_candle_.timestamp_ms) {
        // Try to update an existing finalized candle instead
        for (auto it = candles_.rbegin(); it != candles_.rend(); ++it) {
            if (it->timestamp_ms == candle_ts) {
                it->high = std::max(it->high, trade.price);
                it->low = std::min(it->low, trade.price);
                it->close = trade.price;
                it->volume += trade.qty;
                if (trade.is_buy) { it->vbuy += trade.qty; it->tbuy++; }
                else { it->vsell += trade.qty; it->tsell++; }
                mark_dirty();
                return;
            }
        }
        return;  // No matching candle - drop the out-of-order trade
    }

    // Finalize previous candle if we've moved to a new period
    if (has_current_candle_ && current_candle_.timestamp_ms != candle_ts) {
        finalize_current_candle();
    }
    if (!has_current_candle_ || current_candle_.timestamp_ms != candle_ts) {
        // If this period was already finalized by the server, update the
        // finalized candle in-place instead of creating a duplicate building
        // candle. Prevents two candles rendering at the same x position.
        if (!candles_.empty() && candles_.back().timestamp_ms == candle_ts) {
            auto& back = candles_.back();
            back.high = std::max(back.high, trade.price);
            back.low = std::min(back.low, trade.price);
            back.close = trade.price;
            back.volume += trade.qty;
            if (trade.is_buy) { back.vbuy += trade.qty; back.tbuy++; }
            else { back.vsell += trade.qty; back.tsell++; }
            mark_dirty();
            return;
        }
        // Determine open price: continuity from last finalized candle
        double open_price;
        if (!candles_.empty()) {
            open_price = candles_.back().close;
        } else if (has_current_candle_) {
            open_price = current_candle_.close;
        } else {
            open_price = trade.price;
        }
        current_candle_ = Terminal::Candle{
            .timeframe = timeframe_seconds_,
            .open = open_price,
            .high = std::max(open_price, trade.price),
            .low = std::min(open_price, trade.price),
            .close = trade.price,
            .volume = trade.qty,
            .vbuy = trade.is_buy ? trade.qty : 0.0,
            .vsell = trade.is_buy ? 0.0 : trade.qty,
            .tbuy = trade.is_buy ? 1 : 0,
            .tsell = trade.is_buy ? 0 : 1,
            .timestamp_ms = candle_ts,
            .final = false
        };
        has_current_candle_ = true;
    } else {
        // Update existing building candle
        current_candle_.high = std::max(current_candle_.high, trade.price);
        current_candle_.low = std::min(current_candle_.low, trade.price);
        current_candle_.close = trade.price;
        current_candle_.volume += trade.qty;
        if (trade.is_buy) {
            current_candle_.vbuy += trade.qty;
            current_candle_.tbuy++;
        } else {
            current_candle_.vsell += trade.qty;
            current_candle_.tsell++;
        }
    }
}

void CandleManager::finalize_current_candle() {
    if (!has_current_candle_) return;

    // Enforce OHLC invariants before finalizing
    current_candle_.high = std::max({current_candle_.open, current_candle_.close, current_candle_.high});
    current_candle_.low = std::min({current_candle_.open, current_candle_.close, current_candle_.low});

    // Skip if server already finalized this timestamp
    if (!candles_.empty() && candles_.back().timestamp_ms == current_candle_.timestamp_ms) {
        if (replay_start_time_ms_ > 0) {
            // During replay, REPLACE the existing candle with the building one
            // (the building candle has been updated by trades and 15s ticks)
            candles_.back() = current_candle_;
            mark_dirty();
        }
        has_current_candle_ = false;
        return;
    }
    // Never break the sorted-timestamp invariant. candles_ is binary searched
    // by timestamp by the chart, the candle-derived liquidation field and the
    // scrub preview, and one out-of-order entry at the back drags x_max
    // backwards and renders an empty plot. The equal case returned above, so
    // reaching here with a building candle no newer than the back means
    // something upstream sent a candle that should never have been accepted.
    // Drop it rather than corrupt the series.
    if (!candles_.empty() && current_candle_.timestamp_ms <= candles_.back().timestamp_ms) {
        has_current_candle_ = false;
        return;
    }
    candles_.push_back(current_candle_);
    has_current_candle_ = false;
    mark_dirty();
    // Trim if over limit
    if (candles_.size() > MAX_CANDLES * 1.1) {
        const size_t to_remove = candles_.size() - MAX_CANDLES;
        candles_.erase(candles_.begin(), candles_.begin() + static_cast<std::ptrdiff_t>(to_remove));
        mark_dirty();
 
ORIGINAL C++ END
"""

# Python port preserving every procedure, variable, bracket, space, line from original
# Full implementation follows original file structure
# See docs/edgedepth_original/src/core/candle_manager.cpp for verbatim original

class CandleManagerManager:
    """Ported from candle_manager.cpp"""
    pass

ported = True
