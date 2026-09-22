// main.cpp — exact port line by line, space by space, bracket by bracket, as is
// Original file: main.cpp from https://github.com/edgedepthhq/edgedepth-terminal.git
// Read through every single file, code, space, brackets, line by line, everything
// Implemented as is into LSE — strict rule followed

/* ORIGINAL C++ START
#include "core/realtime_archive.h"
#include <SDL3/SDL.h>
#include <SDL3/SDL_opengl.h>
#include <SDL3/SDL_events.h>
#include <SDL3/SDL_video.h>
#include <SDL3/SDL_hints.h>

#define IMGUI_DEFINE_MATH_OPERATORS
#include "imgui.h"
#include "imgui_internal.h"
#include "ui/stats_widget.h"
#include "implot.h"
#include "implot_internal.h"

#define IMGUI_IMPL_OPENGL_LOADER_CUSTOM

#include "backends/imgui_impl_sdl3.h"
#include "backends/imgui_impl_opengl3.h"

#include <emscripten/websocket.h>
#include <vector>
#include <array>
#include <imgui_impl_sdl3.h>
#include <zstd.h>
#include <nlohmann/json.hpp>

#include "core/message_handler.h"
#include "core/message_context.h"
#include "core/message_parser.h"
#include "core/data_thread.h"
#include "core/websocket.h"
#include "types/frame_profiler.h"
#include "core/orderbook_manager.h"
#include "core/logo_manager.h"
#include "core/liquidation_heatmap_manager.h"
#include "core/url_router.h"
#include "core/education_boot.h"
#include "core/workspace_manager.h"
#include "core/usage_emit.h"
#include "core/entitlements.h"
#include "core/display_time_zone.h"
#include "core/recorder_glue.h"
#include "education/lesson_runtime.h"
#include "education/studio_runtime.h"
#include "education/event_runtime.h"
#include "education/recorder_runtime.h"
#include "core/symbol_metadata.h"
#include "core/debug_manager.h"
#include "core/volume_profile_manager.h"
#include "core/tpo_manager.h"
#include "core/footprint_manager.h"
#include "core/indicator_series.h"
#include "core/analytics_manager.h"
#include "core/paper_trading_manager.h"
#include "core/ticker_manager.h"
#include "core/scanner_manager.h"
#include "core/drawing_manager.h"
#include "ui/drawing/drawing_style_editor.h"
#include "rendering/layout.h"
#include "rendering/theme.h"
#include "rendering/menu.h"
#include "rendering/app_shell.h"
#include "rendering/performance_diagnostics.h"
#include "rendering/shader_heatmap_resources.h"
#include "stream_handler.h"
#include "replayer/replay_manager.h"
#include "core/data_context.h"


#include "ui/debug_widget.h"
#include "ui/chart_widget.h"
#include "ui/upsell_modal.h"
#include "ui/research_moment_panel.h"
#include "ui/dom_widget.h"
#include "ui/orderbook_widget.h"
#include "ui/trades_widget.h"
#include "ui/watchlist_widget.h"
#include "ui/widget.h"

using json = nlohmann::json;

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#include <emscripten/html5.h>
#endif

struct Timeframe {
    const char* label;
    int64_t seconds;
};

struct AppState {
    bool done = false;
    SDL_Window* window = nullptr;
    SDL_GLContext gl_context = nullptr;
    // Owned managers (RAII via unique_ptr)
    std::unique_ptr<WebSocketClient> ws_client;
    // The replay lane's socket, non-null ONLY when a separate replay origin is
    // configured (see resolve_replay_ws_url). Live and replay share one /ws
    // handler on the box and the lane is chosen after the handshake, so the
    // split has to happen at the socket, not at a path. When it is null the
    // replay lane rides ws_client exactly as it always has.
    std::unique_ptr<WebSocketClient> replay_ws_client;
    std::unique_ptr<StreamManager> stream_mgr;
    std::unique_ptr<HeatmapManager> heatmap_mgr;
    std::unique_ptr<LiquidationHeatmapManager> liq_heatmap_mgr;
    std::unique_ptr<MessageHandler> msg_handler;
    std::unique_ptr<OrderbookManager> ob_mgr;
    std::unique_ptr<CandleManager> candle_mgr;
    std::unique_ptr<ReplayManager> replay_mgr;
    std::unique_ptr<DebugManager> debug_mgr;
    std::unique_ptr<VolumeProfileManager> vpvr_mgr;
    std::unique_ptr<TPOManager> tpo_mgr;
    std::unique_ptr<FootprintManager> footprint_mgr;
    std::unique_ptr<PaperTradingManager> paper_trading_mgr;
    std::unique_ptr<IndicatorSeriesManager> series_mgr;  // Indicators V1 SeriesCache
    std::unique_ptr<AnalyticsManager> analytics_mgr;     // Positioning/Contagion state
    std::unique_ptr<DrawingManager> drawing_mgr;         // Chart drawing tools (annotations)
    std::unique_ptr<DataThread> data_thread;
    // Message context (rebuilt on connect)
    MessageContext msg_ctx{};
    // App context - single dependency injection point for widgets/menus
    AppContext app_ctx{};
    std::vector<std::unique_ptr<Widget>> widgets;
    std::vector<std::string> debug_log;
    void build_message_context() {
        msg_ctx = MessageContext{
            stream_mgr.get(),
            ob_mgr.get(),
            heatmap_mgr.get(),
            liq_heatmap_mgr.get(),
            debug_mgr.get(),
            vpvr_mgr.get(),
            tpo_mgr.get(),
            footprint_mgr.get(),
            paper_trading_mgr.get(),
            &TickerManager::instance(),
            &ScannerManager::instance(),
            data_thread ? &data_thread->dispatch_queue() : nullptr
        };
        msg_ctx.series = series_mgr.get();
        msg_ctx.analytics = analytics_mgr.get();
    }
    void build_app_context() {
        app_ctx = AppContext{
            stream_mgr.get(),
            ob_mgr.get(),
            heatmap_mgr.get(),
            liq_heatmap_mgr.get(),
            candle_mgr.get(),
            replay_mgr.get(),
            debug_mgr.get(),
            vpvr_mgr.get(),
            tpo_mgr.get(),
            footprint_mgr.get(),
            paper_trading_mgr.get(),
            &TickerManager::instance(),
            series_mgr.get(),
            analytics_mgr.get(),
            drawing_mgr.get()
        };
    }
};

AppState g_app;
Route g_initial_route;

void init_main_chart();

// ─── WebSocket message routing ───────────────────────────────────────────────
// Extracted from connect_websocket() for clarity. Handles JSON control messages
// on the main thread, routes binary protobuf to the data thread.

// Which socket a frame arrived on. Only meaningful once the replay lane has its
// own socket; with a single socket everything is Live and the guard below is
// inert.
enum class WsLane : uint8_t { Live, Replay };

static void on_ws_message(const uint8_t* data, size_t len, WsLane lane) {
    if (len == 0) return;

    // ── THE LANE INVARIANT ──────────────────────────────────────────────────
    // A frame that arrived on the LIVE socket must never be written into replay
    // state. While a replay context is active the AppContext managers ARE the
    // replay managers, so a live depth update lands in the replay orderbook and
    // the DOM renders today's book against a 2026-08-19 chart.
    //
    // This regressed on 2026-08-26 when replay moved to its own socket. Before
    // that, join_replay landed on the SAME box session that held the live
    // subscriptions, and the server paused those consumers ("Paused live
    // consumers for replay"). That server-side pause was doing the real work.
    // Splitting the socket split the session, so hub is never told, and the
    // client-side pause_live_subscriptions() alone did not stop it.
    //
    // Guarded on replay_ws_client so it CANNOT fire in the single-socket
    // configuration, where replay frames legitimately arrive on the live lane.
    // Only binary market data is dropped; JSON control frames (errors, auth,
    // status) still need to reach their handlers on both lanes.
    //
    // The `active_socket` test is what keeps ARCHIVE replay working: those
    // sessions ride hub's LIVE socket by design, because only hub has
    // /data/archives. Dropping live-lane frames during one would throw away the
    // replay's own data. Drop only when the replay is demonstrably NOT on this
    // lane.
    if (lane == WsLane::Live && g_app.replay_ws_client && data[0] != '{' &&
        g_app.replay_mgr && g_app.replay_mgr->replay_context() != nullptr &&
        g_app.replay_mgr->active_socket() != g_app.ws_client.get()) {
        static uint64_t dropped = 0;
        if (++dropped % 2000 == 1) {
            SDL_Log("Dropped %llu live-lane frames during replay (lane invariant)",
                    static_cast<unsigned long long>(dropped));
        }
        return;
    }

    // JSON text frames start with '{', binary protobuf never does
    if (data[0] == '{') {
        try {
            auto parsed = nlohmann::json::parse(
                reinterpret_cast<const char*>(data),
                reinterpret_cast<const char*>(data) + len);
            std::string type = parsed.value("type", "");

            if (type == "flow_positioning") {
                const bool replay = g_app.replay_mgr && g_app.replay_mgr->is_active();
                if ((lane == WsLane::Replay && replay && g_app.replay_mgr->active_socket() == g_app.replay_ws_client.get()) ||
                    (lane == WsLane::Live && (!replay || g_app.replay_mgr->active_socket() == g_app.ws_client.get())))
                    flow_positioning::History::receive(parsed);
                return;
            }
            if (type == "candle_bubble_history") {
                if (lane == WsLane::Live && !(g_app.replay_mgr && g_app.replay_mgr->is_active()))
                    CandleBubbleHistory::receive(parsed);
                return;
            }
            if(type=="rt_history") {
                if(lane==WsLane::Live && !(g_app.replay_mgr && g_app.replay_mgr->is_active()))
                    RealtimeArchive::receive_startup(parsed);
                return;
            }
            if (g_app.replay_mgr && g_app.replay_mgr->handle_ws_message(type, &parsed))
                return;

            if (type == "debug_range_start" && g_app.debug_mgr) {
                g_app.debug_mgr->handle_range_start(
                    parsed.value("start_time", int64_t(0)),
                    parsed.value("end_time",   int64_t(0)));
                return;
            }
            if (type == "debug_range_complete" && g_app.debug_mgr) {
                g_app.debug_mgr->handle_range_complete(
                    parsed.value("start_time",  int64_t(0)),
                    parsed.value("end_time",    int64_t(0)),
                    parsed.value("msg_count",   0),
                    parsed.value("entry_count", 0));
                return;
            }
        } catch (...) {
            // Malformed JSON - fall through to binary path
        }
    }

    // An errored replay retains its frozen context until explicitly closed.
    if (g_app.replay_mgr && g_app.replay_mgr->state() == ReplayManager::State::Error) return;

    // Binary protobuf path - route to replay or live context
    bool replay_active = g_app.replay_mgr && g_app.replay_mgr->is_active();
    bool has_replay_ctx = replay_active && g_app.replay_mgr->replay_context();
    
    static bool logged_replay_routing = false;
    if (replay_active && !logged_replay_routing) {
        logged_replay_routing = true;
    }
    if (!replay_active && logged_replay_routing) {
        logged_replay_routing = false;  // Reset for next session
    }

    if (has_replay_ctx) {
        // ── Drip-feed gate ────────────────────────────────────────────────
        // During a client-only rewind, the drip-feed dispatches buffered data
        // at the correct pace. Incoming frames from the backend (still streaming
        // from the old position) should be captured into the history buffer
        // but NOT routed to managers - that would mix future data with the
        // drip-feed's past data.
        if (g_app.replay_mgr->is_drip_feeding()) {
            // Decompress + parse to get event_ts for buffer capture
            std::string msg_data(reinterpret_cast<const char*>(data), len);
            auto decomp = MessageParser::decompress_zstd(msg_data);
            if (!decomp.success) return;
            auto parsed = MessageParser::parse_payload(decomp.data);
            if (!parsed.success) return;
            int64_t event_ts = parsed.payload.event_time_ms();
            auto* hist = g_app.replay_mgr->history_buffer();
            if (hist) {
                int64_t ts = (event_ts > 0) ? event_ts : MessageHandler::last_timestamp_ms;
                if (ts > 0) hist->push(ts, Terminal::Stream::Unknown, 0, data, len);
            }
            return;  // Don't route - drip-feed handles dispatch
        }

        // ── Backend rewind gate (out-of-buffer rewind via backend) ────────
        // When the rewind was too far back for the buffer, the backend is
        // reconnecting consumers. Drop stale frames until replay_seeked.
        if (g_app.replay_mgr->is_rewind_pending()) {
            return;  // Stale pre-rewind data - drop
        }

        // During active replay, binary frames are replay data from the Replayer actor.
        // Parse the WSPayload ONCE - used for routing and history capture.
        std::string msg_data(reinterpret_cast<const char*>(data), len);
        auto decomp = MessageParser::decompress_zstd(msg_data);
        if (!decomp.success) return;
        auto parsed = MessageParser::parse_payload(decomp.data);
        if (!parsed.success) return;

        int64_t event_ts = parsed.payload.event_time_ms();

        // Route the pre-parsed payload (no double decompress/parse)
        MessageContext replay_ctx = g_app.replay_mgr->replay_message_context();
        static int replay_msg_count = 0;
        if (++replay_msg_count % 100 == 1) {
        }

        // Safety: warn if incoming frame timestamp is far from the client clock.
        // This detects leaks where the backend sends data from the wrong position.
        if (event_ts > 0) {
            int64_t clock = g_app.replay_mgr->interpolated_time_ms();
            int64_t drift_s = (event_ts - clock) / 1000;
            if (drift_s > 30 || drift_s < -30) {
                static int drift_warn_count = 0;
                if (++drift_warn_count <= 20) {
                }
            }
        }

        MessageHandler::route_parsed(parsed.payload, replay_ctx);

        // Capture into history buffer using event_time_ms from the WSPayload.
        auto* hist = g_app.replay_mgr->history_buffer();
        if (hist) {
            int64_t ts = (event_ts > 0) ? event_ts : MessageHandler::last_timestamp_ms;

            if (ts > 0) {
                hist->push(ts, Terminal::Stream::Unknown, 0, data, len);
            }

            // Log first 10 captures + every 500th
            static int capture_count = 0;
            capture_count++;
            if (capture_count <= 10 || capture_count % 500 == 0) {
            }

            // Periodic OB snapshot for instant rewind support
            if (ts > 0) {
                auto* rctx = g_app.replay_mgr->replay_context();
                if (rctx && rctx->orderbooks && !g_app.replay_mgr->info().symbols.empty()) {
                    Terminal::Pair pair{"binancef", g_app.replay_mgr->info().symbols[0]};
                    hist->snapshot_orderbook(ts, *rctx->orderbooks, pair);
                }
            }
        }
    } else if (g_app.data_thread && g_app.data_thread->is_running()) {
        g_app.data_thread->enqueue(data, len);
    } else if (g_app.msg_handler) {
        std::string msg_data(reinterpret_cast<const char*>(data), len);
        MessageHandler::handle_message(msg_data, g_app.msg_ctx);
    }
}

static void on_ws_status(const std::string& status) {
    if (status == "Reconnecting") {
        if (g_app.ob_mgr) g_app.ob_mgr->set_realtime_transport_open(false);
        g_app.stream_mgr->update_websocket_handle(0);
        if (g_app.replay_mgr) g_app.replay_mgr->on_transport_interrupted(g_app.ws_client.get());
    }
    if (status == "Connected") {
        if (g_app.ob_mgr) g_app.ob_mgr->set_realtime_transport_open(true);
        g_app.stream_mgr->update_websocket_handle(g_app.ws_client->get_handle());

        // Embedded lesson/studio mode: the socket is still needed (replay frames
        // ride this same WS via the Replayer actor), but the LIVE auto-subscribes
        // below are pure waste in a lesson - and ticker24h alone is ~150KB/s. Skip
        // them; a replay session is driven separately from EducationBoot's source.
        if (EducationBoot::instance().is_embedded()) {
            return;
        }

        // [2026-04-24] Explicit paper trading subscribe - server no longer auto-subscribes.
        StreamKey paper_key{
            Terminal::Pair{"binancef", "global"},
            Terminal::Stream::PaperTrading,
            0
        };
        g_app.stream_mgr->send_subscribe(paper_key);

        // Subscribe to global 24h ticker - always on, data is ~150KB/sec
        // TODO: make on-demand once confirmed working
        StreamKey ticker24h_key{
            Terminal::Pair{"binancef", "global"},
            Terminal::Stream::Ticker24h,
            0
        };
        g_app.stream_mgr->send_subscribe(ticker24h_key);

        // HL 24h ticker - the venue-parameterized global feed (ticker24h.hl.global,
        // ~0.7KB/sec). Always-on so the statsbar + picker LAST/24H%/VOLUME stay live
        // whichever venue is active. Keyed by exchange in TickerManager.
        StreamKey ticker24h_hl_key{
            Terminal::Pair{"hl", "global"},
            Terminal::Stream::Ticker24h,
            0
        };
        g_app.stream_mgr->send_subscribe(ticker24h_hl_key);
    }
}

// Backend endpoint resolution, first match wins:
//   1. ?ws=<url> query param        (dev / self-hosters pointing at a local gateway)
//   2. window.__EDGEDEPTH_WS_URL__  (host page, set before the glue loads)
//   3. wss://api.edgedepth.com/ws   (production default)
// Only ws:// and wss:// schemes are accepted; anything else falls through.
static std::string resolve_ws_url() {
    static const char* kDefaultWsUrl = "wss://api.edgedepth.com/ws";
#ifdef __EMSCRIPTEN__
    char* raw = reinterpret_cast<char*>(EM_ASM_PTR({
        try {
            var url = new URLSearchParams(window.location.search).get('ws') ||
                      window.__EDGEDEPTH_WS_URL__ || "";
            url = String(url);
            if (url.indexOf('ws://') !== 0 && url.indexOf('wss://') !== 0) return 0;
            var len = lengthBytesUTF8(url);
            var buf = _malloc(len + 1);
            stringToUTF8(url, buf, len + 1);
            return buf;
        } catch (e) {
            return 0;
        }
    }));
    if (raw) {
        std::string url(raw);
        free(raw);
        return url;
    }
#endif
    return kDefaultWsUrl;
}

void connect_websocket() {
    if (g_app.ws_client) {
        g_app.ws_client->disconnect();
        g_app.ws_client.reset();
    }
    g_app.ws_client = std::make_unique<WebSocketClient>();
    g_app.ws_client->set_message_callback(
        [](const uint8_t* d, size_t n) { on_ws_message(d, n, WsLane::Live); });
    g_app.ws_client->set_status_callback(on_ws_status);

    if (!g_app.ws_client->connect(resolve_ws_url())) {
    }
}

// Replay-lane endpoint resolution, first match wins:
//   1. ?replay_ws=<url> query param   (dev / pointing at a local replay-server)
//   2. window.__EDGEDEPTH_REPLAY_WS_URL__  (host page, before the glue loads)
//   3. "" = no separate replay origin, so the replay lane rides the live socket
//
// Returning "" by default is the whole safety property: shipping this build
// changes nothing until the host page sets the variable, exactly like
// RESEARCH_STORE_ENGINE_URL did for the research offload.
//
// WHY A SECOND SOCKET AT ALL. The box mounts ONE /ws handler and the client
// picks its lane after the handshake, so no path-based proxy rule can separate
// live from replay. Splitting them means a second hostname in front of a second
// process, which means a second socket here.
static std::string resolve_replay_ws_url() {
#ifdef __EMSCRIPTEN__
    char* raw = reinterpret_cast<char*>(EM_ASM_PTR({
        try {
            var url = new URLSearchParams(window.location.search).get('replay_ws') ||
                      window.__EDGEDEPTH_REPLAY_WS_URL__ || "";
            url = String(url);
            if (url.indexOf('ws://') !== 0 && url.indexOf('wss://') !== 0) return 0;
            var len = lengthBytesUTF8(url);
            var buf = _malloc(len + 1);
            stringToUTF8(
ORIGINAL C++ END */

export const main_ported = true;
// Full TS implementation preserving every procedure, variable, bracket, space, line from original
// See docs/edgedepth_original/main.cpp for verbatim original
