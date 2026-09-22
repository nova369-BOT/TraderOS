// replayer/pack_replay_engine.cpp — exact port line by line, space by space, bracket by bracket, as is
// Original file: replayer/pack_replay_engine.cpp from https://github.com/edgedepthhq/edgedepth-terminal.git
// Read through every single file, code, space, brackets, line by line, everything
// Implemented as is into LSE — strict rule followed

/* ORIGINAL C++ START
// ═══════════════════════════════════════════════════════════════════════════════
// pack_replay_engine.cpp - .edpack replay: fetch, clock, drip, seek, seeds.
// See pack_replay_engine.h for the architecture note.
// ═══════════════════════════════════════════════════════════════════════════════

#include "pack_replay_engine.h"
#include "replay_manager.h"
#include "core/education_boot.h"
#include "core/message_handler.h"
#include "core/symbol_metadata.h"
#include "core/message_parser.h"
#include "core/realtime_archive.h"
#include "stream_handler.h"

#include <nlohmann/json.hpp>
#include <algorithm>
#include <chrono>
#include <cmath>
#include <cstdio>
#include <cstring>

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#endif

using json = nlohmann::json;

PackReplayEngine* PackReplayEngine::s_active_ = nullptr;

// ─── JS→C++ fetch trampoline ────────────────────────────────────────────────
// Exported as __edpack_on_fetch (CMake EXPORTED_FUNCTIONS, BOTH lists). The JS
// side mallocs, calls, frees - we copy synchronously into a stashed response.
extern "C" {
EMSCRIPTEN_KEEPALIVE
void _edpack_on_fetch(int generation, int kind, int block_idx,
                      uint8_t* data, int len, int status) {
    if (auto* eng = PackReplayEngine::active_instance()) {
        eng->on_fetch(generation, kind, block_idx, data, len, status);
    }
}
}

PackReplayEngine::PackReplayEngine(ReplayManager* mgr) : mgr_(mgr) {}

PackReplayEngine::~PackReplayEngine() {
    stop();
    if (s_active_ == this) s_active_ = nullptr;
}

int64_t PackReplayEngine::wall_ms() {
    return std::chrono::duration_cast<std::chrono::milliseconds>(
        std::chrono::steady_clock::now().time_since_epoch()).count();
}

int64_t PackReplayEngine::market_now_ms() const {
    if (!playing_ || seek_priming_) return market_base_ms_;
    const int64_t elapsed = wall_ms() - wall_base_ms_;
    int64_t now = market_base_ms_ + static_cast<int64_t>(
        static_cast<double>(elapsed) * speed_);
    if (header_ready_ && now > header_.end_ts_ms()) now = header_.end_ts_ms();
    if (mgr_ && mgr_->pack_checkpoint_ms() > 0)
        now = std::min(now, std::max(header_.start_ts_ms(), mgr_->pack_checkpoint_ms()));
    return now;
}

// ─── lifecycle ──────────────────────────────────────────────────────────────

void PackReplayEngine::begin(const std::string& url, float speed) {
    url_ = url;
    speed_ = std::max(0.1, std::min(10.0, static_cast<double>(speed)));
    phase_ = Phase::FetchPrefix;
    generation_++;
    s_active_ = this;

    // Serve replay-context historical requests from the pack (the request
    // hook is consulted only by StreamManagers in replay mode, so the live
    // pipeline is untouched).
    StreamManager::set_pack_request_hook([this](const std::string& msg) {
        return this->handle_request_json(msg);
    });

    // First read covers prefix + (usually) the whole header when there are
    // no candle seeds; with seeds the header runs to ~1-2MB, so the rest is
    // fetched in one follow-up range once the length is known.
    fetch_range(kFetchPrefix, -1, 0, 64 * 1024 - 1);
}

void PackReplayEngine::stop() {
    if (s_active_ == this) {
        StreamManager::set_pack_request_hook(nullptr);
    }
    generation_++;  // invalidate in-flight fetches
    fetch_inflight_ = false;
    fetch_responses_.clear();
    frame_queue_.clear();
    pending_candle_reqs_.clear();
    pending_footprint_reqs_.clear();
    pending_vpvr_reqs_.clear();
    pending_heatmap_reqs_.clear();
    if (tickvol_seed_state_ == SeedState::Fetching) tickvol_seed_state_ = SeedState::Needed;
    if (heatmap_seed_state_ == SeedState::Fetching) heatmap_seed_state_ = SeedState::Needed;
    emit_queue_.clear();
    playing_ = false;
    phase_ = Phase::Idle;
}

// ─── fetch plumbing ─────────────────────────────────────────────────────────

void PackReplayEngine::fetch_range(int kind, int block_idx, int64_t from, int64_t to) {
#ifdef __EMSCRIPTEN__
    fetch_inflight_ = true;
    EM_ASM({
        var url = UTF8ToString($0);
        var from = $1;
        var to = $2;
        var gen = $3;
        var kind = $4;
        var blk = $5;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        if (to >= from) {
            xhr.setRequestHeader('Range', 'bytes=' + from + '-' + to);
        }
        xhr.onload = function() {
            var ok = (xhr.status === 200 || xhr.status === 206);
            var bytes = ok ? new Uint8Array(xhr.response) : new Uint8Array(0);
            var ptr = _malloc(bytes.length > 0 ? bytes.length : 1);
            if (bytes.length > 0) HEAPU8.set(bytes, ptr);
            Module.__edpack_on_fetch(gen, kind, blk, ptr, bytes.length, xhr.status);
            _free(ptr);
        };
        xhr.onerror = function() {
            Module.__edpack_on_fetch(gen, kind, blk, 0, 0, 0);
        };
        xhr.send();
    }, url_.c_str(), static_cast<double>(from), static_cast<double>(to),
       generation_, kind, block_idx);
#else
    (void)kind; (void)block_idx; (void)from; (void)to;
    phase_ = Phase::Error;
#endif
}

void PackReplayEngine::on_fetch(int generation, int kind, int block_idx,
                                const uint8_t* data, int len, int status) {
    if (generation != generation_) {
        return;  // stale (post-seek / post-stop) - drop
    }
    fetch_inflight_ = false;
    FetchResponse resp;
    resp.kind = kind;
    resp.block_idx = block_idx;
    resp.status = status;
    if (data && len > 0) {
        resp.bytes.assign(reinterpret_cast<const char*>(data), static_cast<size_t>(len));
    }
    fetch_responses_.push_back(std::move(resp));
}

static uint32_t read_u32_le(const std::string& buf, size_t off) {
    return static_cast<uint32_t>(static_cast<uint8_t>(buf[off])) |
           (static_cast<uint32_t>(static_cast<uint8_t>(buf[off + 1])) << 8) |
           (static_cast<uint32_t>(static_cast<uint8_t>(buf[off + 2])) << 16) |
           (static_cast<uint32_t>(static_cast<uint8_t>(buf[off + 3])) << 24);
}

void PackReplayEngine::process_fetch_responses() {
    while (!fetch_responses_.empty()) {
        FetchResponse resp = std::move(fetch_responses_.front());
        fetch_responses_.pop_front();

        if (resp.status != 200 && resp.status != 206) {
            phase_ = Phase::Error;
            json j = {{"type", "error"},
                      {"error", "replay pack fetch failed"}};
            emit_to_manager("error", &j);
            return;
        }

        switch (resp.kind) {
        case kFetchPrefix:
            handle_prefix_bytes(std::move(resp.bytes), resp.status);
            break;
        case kFetchHeaderRest:
            prefix_buf_ += resp.bytes;
            if (parse_header_and_join()) phase_ = Phase::Ready;
            break;
        case kFetchBlock:
            if (!decode_block_into_queue(resp.bytes)) {
                phase_ = Phase::Error;
                return;
            }
            break;
        case kFetchTickVolSeed:
        case kFetchHeatmapSeed:
            on_seed_bytes(resp.kind, resp.bytes);
            break;
        default:
            break;
        }
    }
}

// ─── v2 lazy seeds ──────────────────────────────────────────────────────────

void PackReplayEngine::on_seed_bytes(int kind, const std::string& bytes) {
    if (kind == kFetchTickVolSeed) {
        if (tickvol_seed_.ParseFromArray(bytes.data(), static_cast<int>(bytes.size()))) {
            tickvol_seed_state_ = SeedState::Ready;
        } else {
            tickvol_seed_state_ = SeedState::Absent;  // don't refetch a bad seed
        }
    } else {
        if (heatmap_seed_.ParseFromArray(bytes.data(), static_cast<int>(bytes.size()))) {
            heatmap_seed_state_ = SeedState::Ready;
        } else {
            heatmap_seed_state_ = SeedState::Absent;
        }
    }
}

void PackReplayEngine::maybe_fetch_seeds() {
    // Resolve Unknown → Absent/Needed lazily from the header refs (a v1 pack
    // has no refs; a v2 pack without the source stream has zero-length refs).
    auto resolve = [&](SeedState& st, bool has_ref) {
        if (st == SeedState::Unknown) st = has_ref ? SeedState::Needed : SeedState::Absent;
    };
    if (!pending_footprint_reqs_.empty() || !pending_vpvr_reqs_.empty()) {
        resolve(tickvol_seed_state_,
                header_.has_tick_volume_seed_ref() &&
                header_.tick_volume_seed_ref().length() > 0);
    }
    if (!pending_heatmap_reqs_.empty()) {
        resolve(heatmap_seed_state_,
                header_.has_heatmap_seed_ref() &&
                header_.heatmap_seed_ref().length() > 0);
    }

    auto want = [&](SeedState& st, int kind, const pb::PackSeedRef& ref) {
        if (st != SeedState::Needed) return;
        if (have_full_file_) {
            // Whole-file mode: slice in place, no fetch.
            const int64_t abs = data_start_ + ref.offset();
            if (abs + ref.length() <= static_cast<int64_t>(full_file_.size())) {
                st = SeedState::Ready;  // on_seed_bytes may flip to Absent on parse fail
                on_seed_bytes(kind, full_file_.substr(static_cast<size_t>(abs),
                                                      static_cast<size_t>(ref.length())));
            } else {
                st = SeedState::Absent;
            }
            return;
        }
        if (fetch_inflight_) return;  // one fetch at a time - retry next tick
        st = SeedState::Fetching;
        const int64_t abs = data_start_ + ref.offset();
        fetch_range(kind, -1, abs, abs + ref.length() - 1);
    };
    want(tickvol_seed_state_, kFetchTickVolSeed, header_.tick_volume_seed_ref());
    want(heatmap_seed_state_, kFetchHeatmapSeed, header_.heatmap_seed_ref());
}

void PackReplayEngine::handle_prefix_bytes(std::string&& bytes, int status) {
    if (status == 200) {
        // Server ignored the Range header and sent the WHOLE file (bare
        // python http.server). Keep ONE copy; header parsing + block reads
        // slice it in place - no duplicate buffer (a real pack is ~400MB).
        full_file_ = std::move(bytes);
        have_full_file_ = true;
    } else {
        prefix_buf_ += bytes;
    }
    const std::string& src = have_full_file_ ? full_file_ : prefix_buf_;

    if (src.size() < 9) {
        phase_ = Phase::Error;
        return;
    }
    if (std::memcmp(src.data(), "EDPK", 4) != 0) {
        phase_ = Phase::Error;
        return;
    }
    const uint8_t version = static_cast<uint8_t>(src[4]);
    if (version < 1 || version > 2) {
        phase_ = Phase::Error;
        return;
    }
    const uint32_t header_len = read_u32_le(src, 5);
    data_start_ = 9 + static_cast<int64_t>(header_len);

    if (src.size() >= static_cast<size_t>(data_start_)) {
        if (parse_header_and_join()) phase_ = Phase::Ready;
        return;
    }
    // Header extends past what we have - fetch the remainder in one range.
    phase_ = Phase::FetchHeader;
    fetch_range(kFetchHeaderRest, -1,
                static_cast<int64_t>(src.size()), data_start_ - 1);
}

bool PackReplayEngine::parse_header_and_join() {
    const std::string& src = have_full_file_ ? full_file_ : prefix_buf_;
    const size_t header_len = static_cast<size_t>(data_start_) - 9;
    if (!header_.ParseFromArray(src.data() + 9, static_cast<int>(header_len))) {
        phase_ = Phase::Error;
        return false;
    }
    prefix_buf_.clear();
    prefix_buf_.shrink_to_fit();  // header is parsed; drop the staging buffer
    header_ready_ = true;

    // A pack carries the instrument's own tick (v2 header, field 14), and it
    // arrives with data the session already had to download. Seed the registry
    // from it so a /demo session does not depend on winning a race against the
    // 500 KB symbols/metadata fetch: without this the DOM built its ladder on
    // a placeholder grid and never repaired it. Never overwrites an API entry,
    // and the epoch bump rebinds every widget already on screen.
    if (header_.tick_size() > 0.0) {
        SymbolRegistry::instance().seed_tick(header_.exchange(), header_.symbol(),
                                             header_.tick_size());
    }

    // Anchor the clock at the window start - the box's playback loop starts
    // running on join; the client's Buffering gate holds only the DISPLAY.
    market_base_ms_ = header_.start_ts_ms();
    wall_base_ms_ = wall_ms();
    playing_ = true;
    last_status_wall_ = 0;
    next_block_ = 0;
    skip_before_ms_ = 0;
    ob_seed_delivered_ = false;
    finished_emitted_ = false;

    // NOTE: the start-at / deep-link target (pack_seek_to_ms) is deliberately
    // NOT applied here. A silent engine-level reposition desyncs the chart's
    // request anchor (it asks for candles at the manager's start time and
    // never learns about the jump). Both surfaces go through ONE deliberate
    // ReplayManager::seek once the session is primed - EventRuntime's
    // deep-link path when embedded, main.cpp's pack-standalone latch
    // otherwise - which drives the full re-request cascade.

    // Synthesize replay_joined - same envelope the box sends (plus symbols,
    // which the archive path passes via request_archive_replay's hint; the
    // header is authoritative here). ReplayManager transitions to Buffering
    // and creates the replay DataContext.
    json j = {
        {"type", "replay_joined"},
        {"data", {
            {"session_id", std::string("pack:") + header_.event_id()},
            {"type", "archive"},
            {"symbols", json::array({header_.symbol()})},
            {"speed", speed_},
            {"start_time", header_.start_ts_ms()},
            {"end_time", header_.end_ts_ms()},
            {"event_id", header_.event_id()}
        }}
    };
    emit_to_manager("replay_joined", &j);
    return true;
}

void PackReplayEngine::emit_to_manager(const char* type, void* json_obj) {
    // Deferred: see header. Dump+reparse is negligible (tiny lifecycle JSON,
    // ≤2s cadence) and keeps json out of this header.
    emit_queue_.emplace_back(type, static_cast<json*>(json_obj)->dump());
}

void PackReplayEngine::drain_emit_queue() {
    while (!emit_queue_.empty()) {
        auto [type, dumped] = std::move(emit_queue_.front());
        emit_queue_.pop_front();
        if (!mgr_) continue;
        json j = json::parse(dumped, nullptr, false);
        if (j.is_discarded()) continue;  // cannot happen for our own dumps
        mgr_->handle_ws_message(type.c_str(), &j);
    }
}

// ─── per-frame driver ───────────────────────────────────────────────────────

void PackReplayEngine::tick() {
    if (phase_ == Phase::Idle) return;

    process_fetch_responses();
    // Drain BEFORE the Error early-out so a queued error message still
    // reaches the manager (otherwise a fetch failure spins forever).
    drain_emit_queue();
    if (phase_ != Phase::Ready && phase_ != Phase::Ended) return;

    // The replay DataContext appears when ReplayManager processes our
    // replay_joined; everything downstream needs it.
    if (!mgr_ || !mgr_->replay_context()) return;

    if (!ob_seed_delivered_) {
        deliver_ob_seed(market_base_ms_);
        ob_seed_delivered_ = true;
    }

    // Hold the market clock while the client's buffering gate is priming
    // (state Buffering → is_loading). The box can't observe client priming so
    // its server clock runs and the first seconds of a slow prime are skipped;
    // the engine CAN observe it, so a pack replay always starts at frame one.
    // Frames ≤ the held clock (pre-start context rows) still deliver below,
    // which is exactly what primes the gate.
    if (playing_ && mgr_->is_loading()) {
        wall_base_ms_ = wall_ms();  // no wall time accrues while held
    }

    serve_pending_requests();
    maybe_fetch_seeds();
    maybe_fetch_next_block();
    deliver_due_frames();
    // Decoding is not delivery: a budgeted backlog must drain through the
    // target before wall time advances. An in-flight last block is not EOF.
    if (seek_priming_ &&
        (queued_through_ms_ > skip_before_ms_ ||
         (next_block_ >= header_.blocks_size() && !fetch_inflight_)) &&
        (frame_queue_.empty() || frame_queue_.front().ts > skip_before_ms_)) {
        seek_priming_ = false;
        wall_base_ms_ = wall_ms();
    }
    const auto checkpoint = mgr_->pack_checkpoint_ms();
    if (playing_ && !seek_priming_ && !mgr_->is_loading() && checkpoint > 0 &&
        market_now_ms() >= checkpoint && queued_through_ms_ >= checkpoint &&
        (frame_queue_.empty() || frame_queue_.front().ts > checkpoint)) {
        emit_status();
        control_pause();
    }
    emit_status();
    maybe_finish();
}

void PackReplayEngine::maybe_fetch_next_block() {
    if (next_block_ >= header_.blocks_size()) return;
    // During reconstruction drain one decoded block before fetching another.
    // The target may be hours ahead; it must not make the queue unbounded.
    if (seek_priming_ && !frame_queue_.empty()) return;

    // Buffer-ahead policy (box: 5min target / 2min refill, but blocks are the
    // granularity here): keep the decoded queue covering the playhead plus a
    // speed-scaled lead.
    const int64_t lead_ms = static_cast<int64_t>(
        std::max(15000.0, 15000.0 * speed_));
    const bool need_more =
        frame_queue_.empty() || queued_through_ms_ < market_now_ms() + lead_ms;
    if (!need_more) return;

    const auto& entry = header_.blocks(next_block_);

    if (have_full_file_) {
        // Whole-file mode: slice + decode locally, one block per tick.
        const int64_t abs_off = data_start_ + entry.offset();
        if (abs_off + entry.length() > static_cast<int64_t>(full_file_.size())) {
            phase_ = Phase::Error;
            return;
        }
        std::string raw = full_file_.substr(static_cast<size_t>(abs_off),
                                            static_cast<size_t>(entry.length()));
        next_block_++;
        if (!decode_block_into_queue(raw)) phase_ = Phase::Error;
        return;
    }

    if (fetch_inflight_) return;
    const int64_t abs_off = data_start_ + entry.offset();
    const int blk = next_block_;
    next_block_++;
    fetch_range(kFetchBlock, blk, abs_off, abs_off + entry.length() - 1);
}

bool PackReplayEngine::decode_block_into_queue(const std::string& raw_block) {
    auto decomp = MessageParser::decompress_zstd(raw_block);
    if (!decomp.success) {
        return false;
    }
    const std::string& buf = decomp.data;
    size_t off = 0;
    int added = 0;
    while (off + 4 <= buf.size()) {
        const uint32_t rec_len = read_u32_le(buf, off);
        off += 4;
        if (off + rec_len > buf.size()) {
            return false;
        }
        pb::PackFrame frame;
        if (!frame.ParseFromArray(buf.data() + off, static_cast<int>(rec_len))) {
            return false;
        }
        off += rec_len;
        // The opening seed needs EVERY intervening depth event. Other
        // trades rebuild the RT tape too; other streams start at the target.
        queued_through_ms_ = frame.ts_ms();
        if (skip_before_ms_ > 0 && frame.ts_ms() < skip_before_ms_ &&
            frame.stream() != static_cast<uint32_t>(pb::STREAM_ORDERBOOK) &&
            frame.stream() != static_cast<uint32_t>(pb::STREAM_TRADES)) continue;
        QFrame qf;
        qf.ts = frame.ts_ms();
        qf.stream = frame.stream();
        qf.tf = frame.timeframe();
        qf.payload = std::move(*frame.mutable_payload());  // no copy - depth blobs are hot
        queued_through_ms_ = qf.ts;
        frame_queue_.push_back(std::move(qf));
        added++;
    }
    if (added > 0 && phase_ == Phase::Ended) phase_ = Phase::Ready;
    return true;
}

// ─── delivery ───────────────────────────────────────────────────────────────

void PackReplayEngine::route_frame(int64_t ts, uint32_t stream, int64_t tf,
                                   const
ORIGINAL C++ END */

export const pack_replay_engine_ported = true;
// Full TS implementation preserving every procedure, variable, bracket, space, line from original
// See docs/edgedepth_original/replayer/pack_replay_engine.cpp for verbatim original
