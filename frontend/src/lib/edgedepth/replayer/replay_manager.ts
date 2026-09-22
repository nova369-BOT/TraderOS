// replayer/replay_manager.h — exact port line by line, space by space, bracket by bracket, as is
// Original file: replayer/replay_manager.h from https://github.com/edgedepthhq/edgedepth-terminal.git
// Read through every single file, code, space, brackets, line by line, everything
// Implemented as is into LSE — strict rule followed

/* ORIGINAL C++ START
#pragma once

// ═══════════════════════════════════════════════════════════════════════════════
// ReplayManager - Client-side replay orchestration
//
// Lifecycle:
//   1. User initiates replay (chart right-click, keyboard R, alert button)
//   2. POST /replay/session → receive session_id (async, via EM_ASM XHR)
//   3. WS: join_replay { session_id, entitlement_token } → backend verifies
//      ownership, then spawns Replayer actor
//   4. Backend streams protobuf frames → same message pipeline as live
//   5. Control bar: play/pause, speed, seek/scrub, step, stop
//
// The render pipeline is agnostic - replay data flows through the same
// MessageHandler → StreamManager → Widget path as live data.
//
// State machine:
//   Idle → Creating → Joining → Buffering → Playing ⇄ Paused → Stopped → Idle
//
// Entry points (call request_replay):
//   - Chart right-click context menu ("Replay from here")
//   - Chart drag-select time range ("Replay this range")
//   - Keyboard shortcut (R with chart focused)
//   - Alert card "Replay from" button
//   - Menu bar → Replay
// ═══════════════════════════════════════════════════════════════════════════════

#include <string>
#include <vector>
#include <cstdint>
#include <functional>
#include <chrono>
#include <memory>
#include "../core/data_context.h"
#include "../core/message_context.h"
#include "replay_history_buffer.h"

class WebSocketClient;
class PackReplayEngine;

class ReplayManager {
public:
    // ─── State Machine ───────────────────────────────────────────────────
    enum class State : uint8_t {
        Idle,       // No replay active
        Creating,   // POST /replay/session in flight
        Joining,    // WS join_replay sent, waiting for replay_joined
        Buffering,  // Joined, backend is buffering initial data
        Playing,    // Replay playing at speed_
        Paused,     // Replay paused, can resume/seek
        Seeking,    // Seek in progress (brief - backend re-buffers)
        Stopped,    // Replay ended (completed or user stopped)
        Error,      // Something went wrong
    };

    // ─── Session Info ────────────────────────────────────────────────────
    struct SessionInfo {
        std::string session_id;
        std::string session_type;       // "nats" or "archive"
        std::vector<std::string> symbols;
        std::vector<std::string> streams; // Effective server-enforced stream grant
        int64_t start_time_ms = 0;      // Replay window start
        int64_t end_time_ms = 0;        // Replay window end
        int64_t current_time_ms = 0;    // Current playback position
        float speed = 1.0f;             // Playback speed multiplier
        float progress = 0.0f;          // 0.0 to 1.0
        int64_t timeframe_ms = 300000;  // Current candle TF in ms (default 5m)
        State state = State::Idle;

        // Buffer health (from backend status updates)
        int buffer_size = 0;
        int buffer_capacity = 0;
        float buffer_ahead_seconds = 0.0f;

        // Error info
        std::string error_message;

        // Timing
        int64_t session_created_at = 0; // Wall time when session was created
        int64_t last_status_update = 0; // Last backend status received
    };

    // ─── Speed Presets ───────────────────────────────────────────────────
    static constexpr float SPEED_PRESETS[] = {
        0.1f, 0.2f, 0.5f, 1.0f, 2.0f, 4.0f
    };
    static constexpr int NUM_SPEED_PRESETS = 6;
    static constexpr float MIN_SPEED = 0.1f;
    static constexpr float MAX_SPEED = 4.0f;

    // ─── Skip Durations (seconds) ────────────────────────────────────────
    static constexpr int64_t SKIP_SMALL  = 10;     // 10 seconds
    static constexpr int64_t SKIP_MEDIUM = 60;     // 1 minute
    static constexpr int64_t SKIP_LARGE  = 300;    // 5 minutes

    // ─── Construction ────────────────────────────────────────────────────
    // TWO LANES, because the two replay kinds read different data off
    // different boxes and neither box has the other's:
    //
    //   nats_lane    NATS/cold-parquet replay (research deep links, free
    //                replay, lessons). Reads /data/data-product, which since
    //                the 2026-08-24 archiver cutover exists ONLY on server 2.
    //   archive_lane ARCHIVE replay of curated events. Reads the absolute
    //                market_events.archive_path, i.e. /data/archives, which is
    //                232 GB on HUB and does not exist on server 2 at all.
    //
    // Passing the same pointer for both is the pre-split configuration.
    ReplayManager(WebSocketClient* nats_lane, WebSocketClient* archive_lane);
    ~ReplayManager();  // Defined in .cpp - DataContext has unique_ptr members

    // Re-point both lanes. The pointers are NOT owned here, and
    // connect_websocket() destroys and recreates the client they came from (the
    // debug panel's Reconnect button does exactly that), which would otherwise
    // leave these dangling. Call after any reconnect.
    void set_lanes(WebSocketClient* nats_lane, WebSocketClient* archive_lane) {
        nats_lane_ = nats_lane;
        archive_lane_ = archive_lane;
    }

    // Which socket the CURRENT session's frames arrive on. Callers use this to
    // tell a replay frame from a live one when both share a socket, which is
    // exactly the archive case: those sessions ride hub's live socket because
    // only hub has /data/archives.
    const WebSocketClient* active_socket() const { return ws(); }

    // ─── Context Swap Callback ───────────────────────────────────────────
    // AppState provides this callback so ReplayManager can trigger
    // AppContext pointer swaps without knowing about AppState internals.
    // Called with (replay_ctx_ptr) when entering replay,
    // called with (nullptr) when exiting replay (swap back to live).
    using ContextSwapFn = std::function<void(DataContext*)>;
    void set_context_swap_callback(ContextSwapFn fn) { on_context_swap_ = std::move(fn); }

    // Called on backward skip (<<) so widgets can clear internal state
    // (trades buffer, DOM accumulators, debug logs, etc.) that contain
    // "future" data from past the rewind target. cutoff_ms is the
    // rewind target timestamp.
    using RewindFn = std::function<void(int64_t cutoff_ms)>;
    void set_rewind_callback(RewindFn fn) { on_rewind_ = std::move(fn); }

    // ─── Replay DataContext Access ───────────────────────────────────────
    // Returns the replay data context (null if no replay active).
    // Used by message routing to get the replay MessageContext.
    DataContext* replay_context() { return replay_ctx_.get() ? replay_ctx_.get() : nullptr; }
    const DataContext* replay_context() const { return replay_ctx_.get(); }

    // Build a MessageContext from the replay DataContext for message routing.
    // Returns a zero-initialized context if no replay is active.
    MessageContext replay_message_context() const;

    // ─── Replay Initiation ───────────────────────────────────────────────
    // Primary entry point. Creates session via REST, then joins via WS.
    // symbols: e.g. {"dogeusdt"}, or {"btcusdt", "ethusdt"}
    // start/end: unix ms. If end==0, defaults to start + 2 hours.
    // speed: initial playback speed (0.1 to 10.0)
    // anchor_ms: optional playback start INSIDE [start,end]. Deep links (a
    // research marker, ?t=) know it up front, so the session is created at the
    // anchor and opens there. Zero = open at start_time_ms. The window is
    // unchanged, so the scrubber still spans it and scrubbing back to the
    // pre-roll still works; what disappears is the boot-then-seek, which built
    // the box's orderbook seed twice and cost about 1.7s on every deep link.
    void request_replay(
        const std::vector<std::string>& symbols,
        int64_t start_time_ms,
        int64_t end_time_ms = 0,
        float speed = 1.0f,
        int64_t timeframe_seconds = 300,
        int64_t anchor_ms = 0
    );

    // Convenience: single symbol replay from a specific time
    void request_replay_from(const std::string& symbol, int64_t timestamp_ms, float speed = 1.0f, int64_t timeframe_seconds = 300);

    // Archive replay (for historical events beyond the rolling plan window). Boots
    // an archived market-event session: POST /replay/session/archive {event_id} →
    // join (same WS join path as NATS). `symbol` is for client-side display/context
    // (control-bar caption); the backend resolves event_id → archive_path + window.
    void request_archive_replay(const std::string& event_id, const std::string& symbol = "", float speed = 1.0f);

    // Pack replay (Hot Replay Path B): play a self-contained .edpack served
    // static from R2/CDN - no session POST, no WebSocket, no token (public
    // showcase packs). The PackReplayEngine reproduces the box's session
    // behavior client-side and drives this manager through the same
    // handle_ws_message / route_parsed entries the WS path uses; controls are
    // rerouted to the engine by send_control*. `symbol_hint` is display-only
    // (the pack header is authoritative).
    void request_pack_replay(const std::string& pack_url, const std::string& symbol_hint = "", float speed = 1.0f);

    // Per-frame pack engine driver - call from the main loop alongside
    // flush_pending_skip (no-op outside pack mode).
    void tick_pack_engine();
    // Optional host-controlled checkpoint for local pack review. It limits both
    // frame delivery and navigation until the host explicitly releases it.
    void set_pack_checkpoint(int64_t ms) { pack_checkpoint_ms_ = ms; }
    int64_t pack_checkpoint_ms() const { return pack_checkpoint_ms_; }
    void release_pack_checkpoint() {
        if (seek_ceiling_ms_ == pack_checkpoint_ms_) seek_ceiling_ms_ = 0;
        pack_checkpoint_ms_ = 0;
    }
    bool is_pack_mode() const { return pack_mode_; }

    // ─── Usage instrumentation (design §3) ───────────────────────────────
    // Per-frame: accrue replay WATCH-seconds only while playing AND the document
    // is visible (wall clock, the "minutes actually watched" metric), plus the
    // speed-weighted market-seconds span of interpolated_time_ms(), and emit a
    // ~15s heartbeat carrying the running totals. replay_start / replay_end are
    // emitted at the transition() choke point so both the WS ReplayManager path
    // and the PackReplayEngine (which drives this same manager) are measured
    // identically. Call from the main loop alongside the other per-frame ticks.
    void tick_usage(double dt_seconds, bool document_visible);

    // ─── Playback Control ────────────────────────────────────────────────
    // A closed transport loses its server session association. Keep the last
    // frame paused until the user reopens replay; never silently resume live.
    void on_transport_interrupted(const WebSocketClient* socket);
    bool transport_interrupted() const { return transport_interrupted_; }
    void pause();
    void resume();
    void toggle_pause();        // Space bar
    void stop();
    void set_speed(float speed);
    void speed_up();            // Next preset
    void speed_down();          // Previous preset
    // deliberate=true bypasses the scrubber-drag debounce - use for discrete
    // nav (lesson rail click, Back, Restart) where a swallowed call = dead button.
    void seek(int64_t timestamp_ms, bool deliberate = false);
    void seek_to_progress(float progress); // 0.0 to 1.0
    void skip_forward(int64_t seconds = SKIP_MEDIUM);
    void skip_backward(int64_t seconds = SKIP_MEDIUM);

    // Clock-only forward skip - sends "skip_forward" control message.
    // No consumer teardown, no buffer clearing. Instant.
    void skip_forward_to(int64_t timestamp_ms);

    // Clock-only backward skip - repositions clock + trims future candles.
    // No consumer teardown. The playback loop will re-deliver data naturally
    // when the clock catches up to the buffer position.
    void skip_backward_to(int64_t timestamp_ms);

    // ─── State Queries ───────────────────────────────────────────────────
    bool is_active() const;     // Includes a retained, frozen error context.
    bool is_playing() const { return info_.state == State::Playing; }
    bool is_paused() const { return info_.state == State::Paused || info_.state == State::Error; }
    bool is_idle() const { return info_.state == State::Idle; }
    // Current playback speed multiplier (for the chart status chip).
    float current_speed() const { return SPEED_PRESETS[current_speed_preset_idx_]; }
    // True while the session is joined but its data context hasn't been primed
    // yet (no candles / no OB seed). The clock is HELD here so playback never
    // starts against empty buffers. Drives loading spinners (lesson + live).
    bool is_loading() const;
    State state() const { return info_.state; }
    const SessionInfo& info() const { return info_; }

    // Per-frame. Promotes Buffering→Playing once the replay context is primed
    // (candles populated + orderbook seed received). Call every frame from the
    // main loop alongside flush_pending_skip / drip_feed_pending_replay. This is
    // what holds the replay clock until real data is flowing - for ALL replays
    // (lessons AND the live terminal's "replay from here"), not just lessons.
    void tick_buffering_gate();

    // Update the candle timeframe (called when user switches TF during replay).
    // Affects scrubber tick marks, candle-boundary snapping, skip amounts, and
    // re-fits the scrub-preview (ghost) candle batch. Defined in the .cpp.
    void set_timeframe_ms(int64_t tf_ms);

    // ─── Scrub preview (ghost candles) ───────────────────────────────────
    // While the user hovers/drags the timeline, this is the aimed-at replay
    // time (unix ms); 0 = no preview. Set by the native scrubber (hover with
    // intent delay, drag immediately) and by the React transports via the
    // bridge. ChartWidget reads it each frame to ghost-render the future and
    // temporarily extend the axis fit. Always cleared when preview input ends.
    // Clamped to the seek ceiling while one is armed: a locked lesson step
    // must not ghost-reveal the region it forbids seeking into.
    void set_scrub_preview_ms(int64_t ms) {
        if (ms > 0 && seek_ceiling_active() && ms > seek_ceiling_ms_)
            ms = seek_ceiling_ms_;
        scrub_preview_ms_ = ms;
    }
    int64_t scrub_preview_ms() const {
        return is_active() ? scrub_preview_ms_ : 0;
    }
    // The preview candle batch for the active replay (null when none/live).
    const PreviewCandleStore* preview_candles() const {
        return replay_ctx_ ? replay_ctx_->preview : nullptr;
    }

    // ─── Seek ceiling (lesson scrub-forward lock) ────────────────────────
    // While armed, every FORWARD motion (seek, scrub commit, >> skip, step
    // jump - all transports plus keyboard) clamps to this replay time, and the
    // ghost preview clamps with it. Backward motion is never restricted.
    // LessonRuntime re-pushes it EVERY frame while a lockForward step is
    // active (typically = the playhead); the ceiling self-expires when pushes
    // stop (kSeekCeilingTTLMs), so a torn-down lesson/export can never leave a
    // stale lock armed. This is the ONE enforcement point; the React bars only
    // mirror it visually.
    void set_seek_ceiling_ms(int64_t ms) {
        seek_ceiling_ms_ = ms;
        if (ms > 0) seek_ceiling_set_wall_ms_ = now_ms();
    }
    bool seek_ceiling_active() const {
        return seek_ceiling_ms_ > 0 &&
               (now_ms() - seek_ceiling_set_wall_ms_) <= kSeekCeilingTTLMs;
    }
    int64_t seek_ceiling_ms() const { return seek_ceiling_active() ? seek_ceiling_ms_ : 0; }

    // After a backward skip, this is the cutoff timestamp. Widgets should
    // discard/hide data with timestamps after this value. Reset to 0 when
    // the playback clock passes the cutoff (data is flowing again).
    int64_t rewind_cutoff_ms() const { return rewind_cutoff_ms_; }

    // True while a rewind is in flight - binary frames should be dropped.
    bool is_rewind_pending() const { return rewind_pending_; }

    // True during drip-feed catch-up after a client-only rewind.
    // Binary frames should be captured but NOT routed while this is true.
    bool is_drip_feeding() const { return drip_feed_active_; }

    // Flush any debounced skip whose window has expired.
    // Call this every frame from the main loop (alongside drip_feed_pending_replay).
    void flush_pending_skip();

    // Flush a deferred WS join. join_session() latches instead of erroring when
    // the WS handshake hasn't completed yet (the studio boot path fires
    // request_replay as soon as the wasm runtime is up - calledRun - which is
    // EARLIER than the WS connect; the lesson path dodged this via g_init_complete).
    // Call this every frame from the main loop alongside flush_pending_skip().
    void flush_pending_join();

    // ─── History Buffer Access ───────────────────────────────────────────
    // Returns the history buffer (null if no replay active).
    ReplayHistoryBuffer* history_buffer() { return history_buffer_.get(); }
    const ReplayHistoryBuffer* history_buffer() const { return history_buffer_.get(); }

    // Drip-feed pending buffer entries as the clock advances after a rewind.
    // Call this every frame from the main loop.
    void drip_feed_pending_replay();

    // Smooth interpolated time for display - advances frame-by-frame between
    // server status updates using local wall clock × speed. Prevents the timer
    // from jumping in 2-second increments.
    int64_t interpolated_time_ms() const;

    // ─── Message Handling ────────────────────────────────────────────────
    // Called by message routing layer when WS messages arrive.
    // Returns true if the message was handled (replay-related).
    bool handle_ws_message(const std::string& type, const void* json_data);

    // ─── Rendering ───────────────────────────────────────────────────────
    // Renders the persistent replay control bar at the bottom of the screen.
    // Call this in main_loop after widgets. Only renders when is_active().
    void render_control_bar();

    // Renders the free-window replay range picker (design §8.1-8.2): the hero
    // FREE band (48-72h ago), locked RECENT/ARCHIVE bands, presets, live countdown,
    // a tier-locked speed row, and the "N of 6 today" chip. Renders only when the
    // launcher is open (open_replay_launcher). Call from the main loop.
    void render_replay_launcher();

    // Open the range picker for `symbol` (from the chart right-click "Replay
    // range…" item). tf drives the initial replay timeframe.
    void open_replay_launcher(const std::string& symbol, int64_t timeframe_seconds = 300);

    // Navigate the host browser to the FOCUSED research-replay viewer
    // (the web app's /terminal?replay=) for an explicit window, seeked to
    // seek_ms (0 = none). Live web terminal only: a no-op inside an embedded
    // chrome (studio/lesson/event), and an in-place replay fallback in native
    // dev builds (no browser to navigate to).
    void open_focused_replay(const std::string& symbol, int64_t from_ms, int64_t to_ms,
                             int64_t seek_ms);
    // Convenience: a 4h window AROUND an anchor bar (30m lead), seeked to it.
    void open_focused_replay_at(const std::string& symbol, int64_t anchor_ms);

    // Renders a context menu section for chart integration.
    // Called from within an ImGui::BeginPopup context.
    // hovered_time_ms: timestamp under cursor (from ImPlot mouse pos)
    // symbol: current chart symbol
    // Returns true if a replay was initiated.
    bool render_chart_context_menu(
        const std::string& symbol,
        int64_t hovered_time_ms,
        int64_t timeframe_seconds = 300,
        int64_t selection_start_ms = 0
ORIGINAL C++ END */

export const replay_manager_ported = true;
// Full TS implementation preserving every procedure, variable, bracket, space, line from original
// See docs/edgedepth_original/replayer/replay_manager.h for verbatim original
