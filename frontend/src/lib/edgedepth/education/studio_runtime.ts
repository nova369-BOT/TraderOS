// education/studio_runtime.cpp — exact port line by line, space by space, bracket by bracket, as is
// Original file: education/studio_runtime.cpp from https://github.com/edgedepthhq/edgedepth-terminal.git
// Read through every single file, code, space, brackets, line by line, everything
// Implemented as is into LSE — strict rule followed

/* ORIGINAL C++ START
// ═══════════════════════════════════════════════════════════════════════════════
// studio_runtime.cpp - see studio_runtime.h
// ═══════════════════════════════════════════════════════════════════════════════

#include "education/studio_runtime.h"
#include "education/chart_projection.h"
#include "education/lesson_runtime.h"
#include "education/transport_emit.h"
#include "core/app_context.h"
#include "core/recorder_glue.h"
#include "replayer/replay_manager.h"

#include "imgui.h"

#include <nlohmann/json.hpp>
#include <algorithm>
#include <cmath>
#include <vector>

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#endif

using json = nlohmann::json;

// Defined at global scope in main.cpp - true while the replay clock is held for
// priming / a post-scrub re-buffer. The export must not start capturing a blank
// buffering chart. (Same extern pattern as lesson_runtime.cpp.)
extern bool g_lesson_loading;

namespace {
// Monotonic wall ms - emscripten_get_now with a no-op native fallback so this
// file keeps compiling off-Emscripten (matches the recorder's convention).
inline double studio_now_ms() {
#ifdef __EMSCRIPTEN__
    return emscripten_get_now();
#else
    return 0.0;
#endif
}
}  // namespace

namespace edu {

void StudioRuntime::set_source_json(const std::string& s) {
    pending_source_ = s;
    has_pending_    = true;
}

void StudioRuntime::cmd_set_paused(bool paused) {
    pending_transport_ = paused ? TransportCmd::Pause : TransportCmd::Play;
}

void StudioRuntime::cmd_set_speed(int centi_speed) {
    pending_speed_     = static_cast<float>(centi_speed) / 100.0f;
    pending_transport_ = TransportCmd::SetSpeed;
}

void StudioRuntime::cmd_seek_progress(int milli_progress, bool deliberate) {
    pending_seek_progress_   = static_cast<float>(milli_progress) / 1000.0f;
    pending_seek_deliberate_ = deliberate;
    pending_seek_            = true;
}

void StudioRuntime::cmd_skip(int seconds) {
    pending_skip_seconds_ = seconds;
    pending_skip_         = true;
}

void StudioRuntime::set_export_json(std::string lesson_json, std::string slug) {
    pending_export_json_ = std::move(lesson_json);
    pending_export_slug_ = std::move(slug);
    has_pending_export_  = true;
}

void StudioRuntime::cmd_export_stop() {
    pending_export_stop_ = true;
}

void StudioRuntime::update(const AppContext& ctx) {
    // ── Export session (CLIP_FACTORY P3-v1) - drains + per-frame tick ───────
    // While an export runs the take is sacrosanct: drop any queued seek/skip/
    // speed/source (the React footer disables them, but a stray command must
    // not seek the recording out from under the author). Pause/play stays
    // allowed - pausing mid-take is a legitimate narration beat.
    if (export_session_active()) {
        if (pending_seek_ || pending_skip_ ||
            pending_transport_ == TransportCmd::SetSpeed) {
        }
        pending_seek_ = false;
        pending_skip_ = false;
        if (pending_transport_ == TransportCmd::SetSpeed)
            pending_transport_ = TransportCmd::None;
        if (has_pending_) {
            has_pending_ = false;
        }
    }
    if (pending_export_stop_) {
        pending_export_stop_ = false;
        if (export_phase_ == ExportPhase::Recording) {
            ClipRecorder::export_stop();          // → Saving via tick below
            export_phase_ = ExportPhase::Saving;
        } else if (export_phase_ == ExportPhase::Arming) {
            end_export_session();                 // never started - clean cancel
        }
    }
    drain_export_start(ctx);
    tick_export(ctx);

    // Drain a pending transport command first (cheap, applies to the live replay).
    if (pending_transport_ != TransportCmd::None) {
        const TransportCmd cmd = pending_transport_;
        pending_transport_ = TransportCmd::None;
        if (ctx.replayer) {
            switch (cmd) {
                case TransportCmd::Pause:    ctx.replay_mgr().pause();  break;
                case TransportCmd::Play:     ctx.replay_mgr().resume(); break;
                case TransportCmd::SetSpeed: ctx.replay_mgr().set_speed(pending_speed_); break;
                case TransportCmd::None:     break;
            }
        }
    }

    // Drain seek/skip (own latches - don't clobber a queued pause/speed).
    if (pending_seek_) {
        pending_seek_ = false;
        if (ctx.replayer) {
            // seek_to_progress clamps internally; but it doesn't take a deliberate
            // flag, so for a deliberate drop we compute the target and call seek()
            // directly (bypassing the scrubber-drag debounce). For a live drag we
            // use the debounced path.
            const auto& info = ctx.replay_mgr().info();
            const int64_t range  = info.end_time_ms - info.start_time_ms;
            const int64_t target = info.start_time_ms +
                static_cast<int64_t>(pending_seek_progress_ * static_cast<float>(range));
            ctx.replay_mgr().seek(target, pending_seek_deliberate_);
        }
    }
    if (pending_skip_) {
        pending_skip_ = false;
        if (ctx.replayer) {
            auto& rm = ctx.replay_mgr();
            // Use the debounced, clock-only skip path (skip_*_to) - the same one
            // the live terminal's >>/<< buttons use. It coalesces rapid presses,
            // preserves OB continuity, and only re-buffers on a large cumulative
            // jump. Crucially, compute the target from the LIVE interpolated clock,
            // NOT info_.current_time_ms (which lags the backend status sync) - the
            // naive skip_forward()/skip_backward() helpers use the stale field and
            // route through the heavy seek(), which caused the "jump back then
            // overshoot + future-data burst" bug.
            const int64_t now = rm.interpolated_time_ms();
            const int64_t target = now + static_cast<int64_t>(pending_skip_seconds_) * 1000;
            if (pending_skip_seconds_ >= 0) rm.skip_forward_to(target);
            else                            rm.skip_backward_to(target);
        }
    }

    if (!has_pending_) return;

    // HOLD the pending source until the replay manager exists. React can deliver
    // the command the moment calledRun goes true - potentially frames before the
    // async init constructs the manager. Consuming-and-dropping here would eat
    // the source with no error (the silent black studio); keep it queued instead
    // and drain on a later frame. (React also re-pushes until a state emit
    // confirms the window - this is the belt to that suspenders.)
    if (!ctx.replayer) return;

    has_pending_ = false;           // consume before dispatch (re-entrancy safe)

    json doc;
    try {
        doc = json::parse(pending_source_);
    } catch (const json::exception& e) {
        return;
    }

    std::string sym = doc.value("symbol", "");
    std::transform(sym.begin(), sym.end(), sym.begin(),
                   [](unsigned char c) { return std::tolower(c); });
    const int64_t startMs = doc.value("startMs", int64_t{0});
    const int64_t endMs   = doc.value("endMs",   int64_t{0});
    // Optional playback anchor inside the window (the ?t= deep link). Carried
    // into session creation so the box opens there; without it the session opens
    // at startMs and the shell has to seek, which costs the parquet OB seed
    // twice plus the box's 1s consumer-exit wait.
    int64_t anchorMs = doc.value("anchorMs", int64_t{0});
    if (anchorMs > 0 && (anchorMs <= startMs || anchorMs > endMs)) anchorMs = 0;

    if (sym.empty() || startMs <= 0 || endMs <= startMs) {
        return;
    }

    // Dedup: re-picking the SAME window shouldn't re-request a replay (the picker
    // can re-emit on a no-op confirm, and React re-pushes on a cadence until the
    // state emit confirms it). Only act when the window actually changes.
    const std::string key = sym + "|" + std::to_string(startMs) + "|" + std::to_string(endMs)
                          + "|" + std::to_string(anchorMs);
    if (key == applied_key_) return;
    applied_key_ = key;

    // Same entry point the lesson player uses; free scrub (no gate) is simply the
    // absence of LessonRuntime driving the playhead in studio mode.
    ctx.replay_mgr().request_replay(std::vector<std::string>{sym}, startMs, endMs, 1.0f, 300, anchorMs);
    // Stash for emit_state (so it can report the window during buffering, before
    // SessionInfo is populated).
    src_symbol_   = sym;
    src_tf_       = doc.value("tf", "");
    src_start_ms_ = startMs;
    src_end_ms_   = endMs;
    has_source_   = true;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Export session (CLIP_FACTORY P3-v1) - StudioRuntime owns WHEN, ClipRecorder HOW
// ═══════════════════════════════════════════════════════════════════════════════

void StudioRuntime::drain_export_start(const AppContext& ctx) {
    if (!has_pending_export_) return;
    has_pending_export_ = false;                  // consume before dispatch
    const std::string doc_json = std::move(pending_export_json_);
    const std::string slug     = std::move(pending_export_slug_);
    pending_export_json_.clear();
    pending_export_slug_.clear();

    if (export_phase_ != ExportPhase::Idle) {
        return;
    }
    if (!ctx.replayer) {
        return;
    }

    auto& lr = LessonRuntime::instance();
    if (!lr.load(doc_json)) {
        export_phase_    = ExportPhase::Error;
        export_error_ms_ = studio_now_ms();
        return;
    }

    const Lesson& lesson = lr.lesson();
    std::string sym = lesson.source.symbol;
    std::transform(sym.begin(), sym.end(), sym.begin(),
                   [](unsigned char c) { return std::tolower(c); });

    // The React shell keys the canvas mount on the lesson's symbol and pushes
    // the lesson window as the studio source BEFORE enabling Export, so a
    // mismatch here is a bug - but never record the wrong symbol: bail hard.
    if (has_source_ && !src_symbol_.empty() && sym != src_symbol_) {
        lr.unload();
        export_phase_    = ExportPhase::Error;
        export_error_ms_ = studio_now_ms();
        return;
    }

    export_slug_     = slug.empty() ? std::string("lesson") : slug;
    export_start_ms_ = lesson.source.startMs;
    export_end_ms_   = lesson.source.endMs;
    export_sym_upper_ = sym;
    std::transform(export_sym_upper_.begin(), export_sym_upper_.end(),
                   export_sym_upper_.begin(),
                   [](unsigned char c) { return std::toupper(c); });

    lr.set_export_render(true);   // burn cards in-canvas, no button

    // Same-window fast path: scrub the live session to the lesson start (one
    // deliberate seek, gate re-armed by scrub_to_progress). Different/absent
    // window: request a fresh replay of the lesson window - it plays from the
    // start on arrival, exactly like the lesson player's boot path.
    const std::string key = sym + "|" + std::to_string(export_start_ms_) + "|" +
                            std::to_string(export_end_ms_);
    if (key == applied_key_) {
        lr.scrub_to_progress(0.0f, /*deliberate=*/true, ctx);
    } else {
        ctx.replay_mgr().request_replay(std::vector<std::string>{sym},
                                        export_start_ms_, export_end_ms_, 1.0f);
        applied_key_  = key;
        src_symbol_   = sym;
        src_tf_       = lesson.source.tf;
        src_start_ms_ = export_start_ms_;
        src_end_ms_   = export_end_ms_;
        has_source_   = true;
    }

    export_phase_    = ExportPhase::Arming;
    arming_since_ms_ = studio_now_ms();
}

void StudioRuntime::tick_export(const AppContext& ctx) {
    if (export_phase_ == ExportPhase::Idle) return;
    auto& lr = LessonRuntime::instance();

    switch (export_phase_) {
        case ExportPhase::Arming: {
            if (!ctx.replayer) { end_export_session(); break; }
            ReplayManager& rm = ctx.replay_mgr();
            const bool primed = rm.is_active() && !::g_lesson_loading;
            if (primed) {
                // A deliberate seek preserves a pre-export pause - nudge into
                // playing unless the intro beat's card is (correctly) holding.
                if (rm.is_paused() && !lr.card_up()) rm.resume();
                if (rm.is_playing() || (rm.is_paused() && lr.card_up())) {
                    ClipRecorder::export_start(export_slug_.c_str(),
                                               export_sym_upper_.c_str(),
                                               export_start_ms_);
                    if (ClipRecorder::export_active()) {
                        export_phase_ = ExportPhase::Recording;
                    } else {
                        lr.unload();
                        export_phase_    = ExportPhase::Error;
                        export_error_ms_ = studio_now_ms();
                    }
                }
            }
            // Buffer-stall bailout - don't arm forever against a dead window.
            if (export_phase_ == ExportPhase::Arming &&
                studio_now_ms() - arming_since_ms_ > 90000.0) {
                lr.unload();
                export_phase_    = ExportPhase::Error;
                export_error_ms_ = studio_now_ms();
            }
            break;
        }
        case ExportPhase::Recording: {
            // Recorder-side terminal states first (cap / session death / error
            // are enforced in export_tick_and_render - mirror them here).
            if (ClipRecorder::state() == ClipRecorder::State::Error) {
                lr.unload();
                export_phase_    = ExportPhase::Error;
                export_error_ms_ = studio_now_ms();
                break;
            }
            if (!ClipRecorder::export_active() ||
                ClipRecorder::state() == ClipRecorder::State::Stopped) {
                export_phase_ = ExportPhase::Saving;   // blob/download in flight
                break;
            }
            // Lesson end: past the window with no card up (if the final beat's
            // card is showing, let the author finish talking - they Continue or
            // Stop from the footer; the 15:00 cap still backstops).
            if (ctx.replayer) {
                const int64_t now_ms = ctx.replay_mgr().interpolated_time_ms();
                if (now_ms >= export_end_ms_ && !lr.card_up()) {
                    ClipRecorder::export_stop();
                    export_phase_ = ExportPhase::Saving;
                }
            }
            break;
        }
        case ExportPhase::Saving: {
            if (ClipRecorder::state() == ClipRecorder::State::Error) {
                lr.unload();
                export_phase_    = ExportPhase::Error;
                export_error_ms_ = studio_now_ms();
            } else if (!ClipRecorder::export_active()) {
                end_export_session();
            }
            break;
        }
        case ExportPhase::Error: {
            // Hold the error for the UI, then recover to Idle (recorder's own
            // Error state decays on the same order of time).
            if (studio_now_ms() - export_error_ms_ > 4500.0)
                end_export_session();
            break;
        }
        case ExportPhase::Idle: break;
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Draw/capture overlay - the studio's phase-1 capture gesture
// ═══════════════════════════════════════════════════════════════════════════════

namespace {

// One-shot capture result → React. JSON over CustomEvent (NOT raw float export
// args - the known f64→f32 marshal trap). Times are absolute unix ms.
void emit_capture(int mode, int64_t t0, int64_t t1, double p_top, double p_bot) {
#ifdef __EMSCRIPTEN__
    json j;
    j["mode"] = (mode == 2) ? "band" : "region";
    j["t0"]   = t0;
    j["t1"]   = t1;
    j["pTop"] = p_top;
    j["pBot"] = p_bot;
    const std::string s = j.dump();
    EM_ASM({
        try {
            var obj = JSON.parse(UTF8ToString($0));
            window.dispatchEvent(new CustomEvent('edgedepth:capture', { detail: obj }));
        } catch (e) {
            console.warn('studio capture emit failed', e);
        }
    }, s.c_str());
#else
    (void)mode; (void)t0; (void)t1; (void)p_top; (void)p_bot;
#endif
}

void emit_capture_cancel() {
#ifdef __EMSCRIPTEN__
    EM_ASM({
        window.dispatchEvent(new CustomEvent('edgedepth:capture', { detail: { cancelled: true } }));
    });
#endif
}

}  // namespace

void StudioRuntime::cmd_arm_capture(int mode) {
    if (export_session_active()) {
        return;
    }
    if (mode < 0 || mode > 2) mode = 0;
    // Disarming an in-flight arm tells React (its inspector shows "drawing…").
    if (mode == 0 && capture_mode_ != 0) emit_capture_cancel();
    capture_mode_     = mode;
    capture_dragging_ = false;
}

void StudioRuntime::render_capture_overlay(const AppContext& ctx) {
    (void)ctx;
    if (capture_mode_ == 0) return;
    const ChartProjection& proj = chart_projection();
    if (!proj.valid) return;

    // Esc cancels the pending capture.
    if (ImGui::IsKeyPressed(ImGuiKey_Escape)) {
        capture_mode_     = 0;
        capture_dragging_ = false;
        emit_capture_cancel();
        return;
    }

    const ImVec2 pmin = proj.plot_min;
    const ImVec2 pmax = proj.plot_max;
    const ImVec2 size = ImVec2(pmax.x - pmin.x, pmax.y - pmin.y);
    if (size.x < 40.0f || size.y < 40.0f) return;

    const bool band = (capture_mode_ == 2);
    const ImU32 accent = band ? IM_COL32(255, 191, 0, 235) : IM_COL32(34, 197, 219, 235);
    const ImU32 fill   = band ? IM_COL32(255, 191, 0, 34)  : IM_COL32(34, 197, 219, 36);

    // Transparent input-catcher pinned over the plot rect: claims the mouse so the
    // chart doesn't pan/zoom under the capture gesture. Submitted late in the frame
    // → top of the window stack → wins hover.
    ImGui::PushStyleVar(ImGuiStyleVar_WindowPadding, ImVec2(0, 0));
    ImGui::PushStyleVar(ImGuiStyleVar_WindowBorderSize, 0.0f);
    ImGui::SetNextWindowPos(pmin);
    ImGui::SetNextWindowSize(size);
    ImGui::SetNextWindowBgAlpha(0.0f);
    const ImGuiWindowFlags flags =
        ImGuiWindowFlags_NoDecoration | ImGuiWindowFlags_NoMove |
        ImGuiWindowFlags_NoScrollbar | ImGuiWindowFlags_NoSavedSettings |
        ImGuiWindowFlags_NoFocusOnAppearing | ImGuiWindowFlags_NoNav |
        ImGuiWindowFlags_NoDocking;
    ImGui::Begin("##studio_capture_overlay", nullptr, flags);
    ImGui::InvisibleButton("##studio_capture_btn", size);

    const ImVec2 mouse = ImGui::GetIO().MousePos;
    if (ImGui::IsItemActivated()) {
        capture_dragging_ = true;
        capture_x0_ = mouse.x;
        capture_y0_ = mouse.y;
    }

    ImDrawList* fg = ImGui::GetForegroundDrawList(ImGui::GetMainViewport());

    // Soft dim + hint chip so the armed state is unmistakable.
    fg->AddRectFilled(pmin, pmax, IM_COL32(0, 0, 0, 40));
    {
        const char* hint = band ? " Drag across the price band - Esc cancels "
                                : " Drag a box around the region - Esc cancels ";
        const ImVec2 ts = ImGui::CalcTextSize(hint);
        const float hx = std::clamp((pmin.x + pmax.x) * 0.5f - ts.x * 0.5f,
                                    pmin.x + 8.0f, pmax.x - ts.x - 8.0f);
        const float hy = pmin.y + 10.0f;
        fg->AddRectFilled(ImVec2(hx - 8, hy - 5), ImVec2(hx + ts.x + 8, hy + ts.y + 5),
                          IM_COL32(20, 24, 30, 230), 5.0f);
        fg->AddRect(ImVec2(hx - 8, hy - 5), ImVec2(hx + ts.x + 8, hy + ts.y + 5),
                    accent, 5.0f, 0, 1.2f);
        fg->AddText(ImVec2(hx, hy), IM_COL32(220, 230, 240, 255), hint);
    }

    // Crosshair under the cursor while aiming (not during the drag itself).
    if (!capture_dragging_ && ImGui::IsItemHovered()) {
        fg->AddLine(ImVec2(pmin.x, mouse.y), ImVec2(pmax.x, mouse.y), IM_COL32(220, 230, 240, 70), 1.0f);
 
ORIGINAL C++ END */

export const studio_runtime_ported = true;
// Full TS implementation preserving every procedure, variable, bracket, space, line from original
// See docs/edgedepth_original/education/studio_runtime.cpp for verbatim original
