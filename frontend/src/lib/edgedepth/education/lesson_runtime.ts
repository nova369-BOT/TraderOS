// education/lesson_runtime.cpp — exact port line by line, space by space, bracket by bracket, as is
// Original file: education/lesson_runtime.cpp from https://github.com/edgedepthhq/edgedepth-terminal.git
// Read through every single file, code, space, brackets, line by line, everything
// Implemented as is into LSE — strict rule followed

/* ORIGINAL C++ START
// ═══════════════════════════════════════════════════════════════════════════════
// lesson_runtime.cpp - see lesson_runtime.h. Absolute-time gate loop + spotlight.
// ═══════════════════════════════════════════════════════════════════════════════

// Must precede ANY include that pulls in imgui.h (chart_projection.h does).
#define IMGUI_DEFINE_MATH_OPERATORS

#include "education/lesson_runtime.h"
#include "education/chart_projection.h"
#include "education/transport_emit.h"
#include "core/app_context.h"
#include "core/candle_manager.h"
#include "replayer/replay_manager.h"
#include "rendering/theme.h"

#include "imgui.h"
#include "imgui_internal.h"

#include <nlohmann/json.hpp>
#include <algorithm>
#include <cmath>

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#endif

using json = nlohmann::json;

// Defined at GLOBAL scope in main.cpp - true while the replay clock is held for
// priming. Declared here at global scope so emit_state references ::g_lesson_loading
// (a block-scope extern inside an edu:: member binds to edu::, which is wrong).
extern bool g_lesson_loading;

namespace edu {

// ─── parse ──────────────────────────────────────────────────────────────────

static Target parse_target(const json& t) {
    Target out;
    if (!t.is_object()) return out;
    const std::string type = t.value("type", "");
    if (type == "el") {
        out.type = Target::Type::El;
        out.el = t.value("el", "");
    } else if (type == "band") {
        out.type = Target::Type::Band;
        out.t = t.value("t", int64_t{0});
        out.below = t.value("below", 0);
        // Authored bands carry explicit price bounds (studio capture); legacy bands
        // carry only `below`. hasPrice gates which path resolve_target takes.
        if (t.contains("pTop") && t.contains("pBot")) {
            out.pTop = t.value("pTop", 0.0);
            out.pBot = t.value("pBot", 0.0);
            out.hasPrice = true;
        }
    } else if (type == "full") {
        out.type = Target::Type::Full;
    } else { // "region" (also the shape used for follow)
        out.type = Target::Type::Region;
        out.t0 = t.value("t0", int64_t{0});
        out.t1 = t.value("t1", int64_t{0});
        if (t.contains("pTop") && t.contains("pBot")) {
            out.pTop = t.value("pTop", 0.0);
            out.pBot = t.value("pBot", 0.0);
            out.hasPrice = true;
        }
        // A region with no explicit time bounds on a track = "follow".
        out.follow = (!t.contains("t0") && !t.contains("t1"));
    }
    return out;
}

bool LessonRuntime::load(const std::string& jsonStr) {
    lesson_ = Lesson{};
    armed_ = 0; cur_step_ = -1; shown_max_ = -1;
    showing_card_ = false; tracking_ = -1;
    emit_sig_ = 0; steps_emitted_ = false;
    pending_cmd_ = Cmd::None; pending_arg_i_ = 0; pending_arg_f_ = 0.0f;

    json doc;
    try {
        doc = json::parse(jsonStr);
    } catch (const json::exception& e) {
        return false;
    }

    lesson_.title   = doc.value("title", "");
    lesson_.course  = doc.value("course", "");
    lesson_.chapter = doc.value("chapter", "");
    lesson_.description = doc.value("description", "");
    if (doc.contains("source") && doc["source"].is_object()) {
        const auto& s = doc["source"];
        lesson_.source.symbol  = s.value("symbol", "");
        lesson_.source.venue   = s.value("venue", "");
        lesson_.source.event   = s.value("event", "");
        lesson_.source.startMs = s.value("startMs", int64_t{0});
        lesson_.source.endMs   = s.value("endMs", int64_t{0});
        lesson_.source.tf      = s.value("tf", "");
    }

    if (!doc.contains("steps") || !doc["steps"].is_array()) {
        return false;
    }

    for (const auto& js : doc["steps"]) {
        Step st;
        const std::string kind = js.value("kind", "beat");
        if (kind == "track")      st.kind = Kind::Track;
        else if (kind == "quiz")  st.kind = Kind::Quiz;
        else                      st.kind = Kind::Beat;

        st.title     = js.value("title", "");
        st.kicker    = js.value("kicker", "");
        st.body      = js.value("body", "");
        st.indicator = js.value("indicator", "");
        if (js.contains("target")) st.target = parse_target(js["target"]);

        if (st.kind == Kind::Track) {
            st.t0 = js.value("t0", int64_t{0});
            st.t1 = js.value("t1", int64_t{0});
            st.t  = st.t0;  // sort key
            st.slowTo = js.value("slowTo", 0.0f);
        } else {
            st.t = js.value("t", int64_t{0});
            st.pause = js.value("pause", true);
        }
        // Scrub-forward lock (schema v0.2.x, additive). Quiz default = locked.
        st.lockForward = js.value("lockForward", st.kind == Kind::Quiz);

        if (st.kind == Kind::Quiz && js.contains("options") && js["options"].is_array()) {
            for (const auto& jo : js["options"]) {
                QuizOption o;
                o.text    = jo.value("t", "");
                o.correct = jo.value("correct", false);
                o.why     = jo.value("why", "");
                st.options.push_back(std::move(o));
            }
        }
        lesson_.steps.push_back(std::move(st));
    }

    std::sort(lesson_.steps.begin(), lesson_.steps.end(),
              [](const Step& a, const Step& b) { return a.t < b.t; });
    for (size_t k = 0; k < lesson_.steps.size(); ++k)
        lesson_.steps[k].n = static_cast<int>(k) + 1;

    lesson_.valid = true;

    return true;
}

// Inverse of load() - used when a Studio export session ends so the lesson's
// gate loop stops firing under the studio's normal free scrub. Mirrors load()'s
// reset block exactly, plus invalidates the doc and drops export-render mode.
void LessonRuntime::unload() {
    lesson_ = Lesson{};
    armed_ = 0; cur_step_ = -1; shown_max_ = -1;
    showing_card_ = false; want_pause_ = false; tracking_ = -1;
    prev_speed_ = 0.0f;
    last_box_ = Box{};
    emit_sig_ = 0; steps_emitted_ = false;
    pending_cmd_ = Cmd::None; pending_arg_i_ = 0; pending_arg_f_ = 0.0f;
    export_render_ = false;
}

} // namespace edu

// ═══════════════════════════════════════════════════════════════════════════════
// gate loop (absolute time)
// ═══════════════════════════════════════════════════════════════════════════════

namespace edu {

int64_t LessonRuntime::replay_now_ms(const AppContext& ctx) const {
    return ctx.replay_mgr().interpolated_time_ms();
}

void LessonRuntime::update(const AppContext& ctx) {
    if (!lesson_.valid) return;

    // Apply any command the JS bridge enqueued since last frame (needs ctx).
    drain_cmd(ctx);

    if (!ctx.replay_mgr().is_active()) return;     // replay not joined yet

    // Enforce a deferred pause: a beat that fired during Buffering couldn't pause
    // (pause() is a no-op off Playing). Once playback actually starts with the
    // card still up, pause it now. Cleared the moment it takes (or on continue).
    if (want_pause_) {
        if (showing_card_ && ctx.replay_mgr().is_playing()) {
            ctx.replay_mgr().pause();
            want_pause_ = false;
        } else if (!showing_card_ || ctx.replay_mgr().is_paused()) {
            want_pause_ = false;  // no longer needed
        }
    }

    const int64_t now = replay_now_ms(ctx);
    if (now <= 0) return;

    // Scrub-forward lock: while a lockForward step is ACTIVE (its card is up,
    // or its track window is running), forward seeks and the ghost preview
    // clamp to the playhead. Re-pushed EVERY frame - the ceiling self-expires
    // in ReplayManager when these pushes stop (lesson unloaded/torn down), so
    // free scrub always returns on its own. Backward motion stays free.
    {
        const Step* locked = nullptr;
        if (showing_card_ && cur_step_ >= 0 &&
            cur_step_ < static_cast<int>(lesson_.steps.size())) {
            locked = &lesson_.steps[cur_step_];
        } else if (tracking_ >= 0) {
            locked = &lesson_.steps[tracking_];
        }
        ctx.replay_mgr().set_seek_ceiling_ms(
            (locked && locked->lockForward) ? now : 0);
    }

    // Gate: fire the next armed step when the replay clock reaches its time.
    // ReplayManager owns the clock (and clamps its own advance), so a stutter
    // can't skip - we advance armed_ one step at a time and test in order.
    if (armed_ < static_cast<int>(lesson_.steps.size()) &&
        now >= lesson_.steps[armed_].t) {
        const Step& ns = lesson_.steps[armed_];
        open_step(armed_, ctx, /*pause=*/ ns.kind != Kind::Track);
    }

    // A track annotation follows the live action until its end time.
    if (tracking_ >= 0) {
        const Step& ts = lesson_.steps[tracking_];
        if (now >= ts.t1) end_track();
    }
}

void LessonRuntime::open_step(int idx, const AppContext& ctx, bool pause) {
    if (idx < 0 || idx >= static_cast<int>(lesson_.steps.size())) return;
    const Step& s = lesson_.steps[idx];
    cur_step_ = idx;
    armed_ = idx + 1;
    shown_max_ = std::max(shown_max_, idx);

    end_track();

    if (s.kind == Kind::Track) {
        start_track(s, ctx);
    } else {
        if (pause) {
            ctx.replay_mgr().pause();   // no-op unless currently Playing…
            // …so if it didn't take (still Buffering on the intro beat), latch the
            // intent and let update() enforce it once playback actually starts.
            want_pause_ = !ctx.replay_mgr().is_paused();
        }
        showing_card_ = true;
    }
}

void LessonRuntime::start_track(const Step& s, const AppContext& ctx) {
    tracking_ = s.n - 1;
    showing_card_ = false;
    if (s.slowTo > 0.0f && ctx.replay_mgr().info().speed > s.slowTo) {
        prev_speed_ = ctx.replay_mgr().info().speed;
        ctx.replay_mgr().set_speed(s.slowTo);
    }
}

void LessonRuntime::end_track() {
    if (tracking_ < 0) return;
    tracking_ = -1;
    if (prev_speed_ > 0.0f) prev_speed_ = 0.0f;  // speed restore is best-effort
}

void LessonRuntime::continue_lesson(const AppContext& ctx) {
    showing_card_ = false;
    want_pause_ = false;  // user advanced - drop any deferred-pause intent
    if (cur_step_ >= static_cast<int>(lesson_.steps.size()) - 1) return;  // completion = chrome's job
    ctx.replay_mgr().resume();  // play loop gates at the next step
}

// ─── deliberate navigation (React chrome → JS bridge → here) ─────────────────
// Seek the replay to a step's anchor and RE-ARM the gate. The gate in update()
// fires steps when the clock reaches step.t; after a seek we set armed_ = idx so
// that step re-fires (and earlier ones don't), and cur_step_ = idx-1 so open_step
// transitions cleanly. We never call open_step directly here - we let the seek
// land and the normal gate loop re-open the step once candle data is back, so the
// spotlight resolves against freshly-streamed candles rather than cleared ones.
void LessonRuntime::jump_to_step(int stepN, const AppContext& ctx) {
    if (!lesson_.valid || lesson_.steps.empty()) return;
    const int last = static_cast<int>(lesson_.steps.size()) - 1;
    const int idx  = std::clamp(stepN - 1, 0, last);

    end_track();
    showing_card_ = false;
    if (prev_speed_ > 0.0f) { ctx.replay_mgr().set_speed(prev_speed_); prev_speed_ = 0.0f; }

    const int64_t t = lesson_.steps[idx].t;  // beat/quiz anchor or track t0
    ctx.replay_mgr().seek(t, /*deliberate=*/true);

    armed_    = idx;        // this step re-fires when the clock reaches t
    cur_step_ = idx - 1;    // open_step(idx) will advance it
    // shown_max_ preserved - the rail keeps its completed ticks.
}

void LessonRuntime::back(const AppContext& ctx) {
    if (!lesson_.valid) return;
    // cur_step_ is 0-based; jump_to_step is 1-based.
    //  - On a step (card/track up): Back → previous step (0-based cur_step_-1
    //    == 1-based cur_step_).
    //  - In a gap (no card/track): Back → re-open the current step (0-based
    //    cur_step_ == 1-based cur_step_+1).
    const bool on_step = (showing_card_ || tracking_ >= 0);
    const int target1 = on_step ? cur_step_ : (cur_step_ + 1);
    jump_to_step(target1, ctx);  // clamped to [1, n] inside
}

void LessonRuntime::restart(const AppContext& ctx) {
    if (!lesson_.valid) return;
    shown_max_ = -1;       // clear the rail's completed ticks
    jump_to_step(1, ctx);
}

void LessonRuntime::scrub_to_progress(float progress, bool deliberate, const AppContext& ctx) {
    if (!lesson_.valid || lesson_.steps.empty()) return;
    progress = std::clamp(progress, 0.0f, 1.0f);
    const int64_t span   = std::max<int64_t>(1, lesson_.source.endMs - lesson_.source.startMs);
    const int64_t target = lesson_.source.startMs +
                           static_cast<int64_t>(progress * static_cast<float>(span));

    // Tear down any active track/card (idempotent when none is up) and restore a
    // slowTo speed - same as jump_to_step. A scrub shouldn't leave a track box or a
    // dimmed card pinned to a stale position.
    if (tracking_ >= 0) end_track();
    showing_card_ = false;
    if (prev_speed_ > 0.0f) { ctx.replay_mgr().set_speed(prev_speed_); prev_speed_ = 0.0f; }

    ctx.replay_mgr().seek(target, deliberate);

    // Re-arm the gate from the landing: the first step whose anchor is strictly
    // after target fires next; steps at/before it count as passed (rail ticks).
    // Mirrors jump_to_step's armed_/cur_step_ bookkeeping, keyed by timestamp.
    const int last = static_cast<int>(lesson_.steps.size()) - 1;
    int idx = 0;
    while (idx <= last && lesson_.steps[idx].t <= target) ++idx;
    armed_    = idx;          // == last+1 when scrubbed past the final step (gate no-ops)
    cur_step_ = idx - 1;      // the step we're "in" (or -1 before the first)
    if (cur_step_ > shown_max_) shown_max_ = cur_step_;
}

} // namespace edu

// ═══════════════════════════════════════════════════════════════════════════════
// target → screen rect (by absolute time)
// ═══════════════════════════════════════════════════════════════════════════════

namespace edu {

static const char* el_window_hint(const std::string& el) {
    if (el.find("Dom") != std::string::npos || el.find("dom") != std::string::npos) return "DOM ";
    if (el.find("Indi") != std::string::npos || el.find("indi") != std::string::npos) return "Chart ";
    if (el.find("Tape") != std::string::npos || el.find("tape") != std::string::npos) return "Trades ";
    return "";
}

// Min candle low / max candle high over candles whose timestamp ∈ [t0,t1].
// Returns false if no candles fall in range yet (replay hasn't reached it).
static bool hi_lo_in_span(const AppContext& ctx, int64_t t0, int64_t t1,
                          double& hi, double& lo) {
    const auto& ts   = ctx.candle_mgr().timestamps();
    const auto& highs = ctx.candle_mgr().highs();
    const auto& lows  = ctx.candle_mgr().lows();
    const size_t n = std::min({ts.size(), highs.size(), lows.size()});
    hi = -1e18; lo = 1e18;
    bool any = false;
    for (size_t i = 0; i < n; ++i) {
        if (ts[i] < t0 || ts[i] > t1) continue;
        hi = std::max(hi, highs[i]); lo = std::min(lo, lows[i]); any = true;
    }
    return any;
}

LessonRuntime::Rect LessonRuntime::resolve_target(const Step& s, const AppContext& ctx,
                                                  int64_t now_ms) const {
    Rect r{};
    const ChartProjection& proj = chart_projection();
    const Target& t = s.target;

    // el → an ImGui panel's window rect (substring match on title)
    if (t.type == Target::Type::El) {
        const char* hint = el_window_hint(t.el);
        if (hint && *hint) {
            ImGuiContext& g = *ImGui::GetCurrentContext();
            for (ImGuiWindow* w : g.Windows) {
                if (!w || !w->WasActive || w->Hidden) continue;
                if (std::string(w->Name).find(hint) != std::string::npos) {
                    return Rect{ w->Pos.x - 4, w->Pos.y - 4,
                                 w->Size.x + 8, w->Size.y + 8, true };
                }
            }
        }
        // fall through to full-chart if not found
    }

    if (!proj.valid) return r;  // can't project chart-space targets yet

    // Full chart / unknown el → the whole plot rect
    if (t.type == Target::Type::Full || t.type == Target::Type::El) {
        return Rect{ proj.plot_min.x, proj.plot_min.y,
                     proj.plot_max.x - proj.plot_min.x,
                     proj.plot_max.y - proj.plot_min.y, true };
    }

    // Band → a horizontal liquidation shelf. A shelf is a price band, not a point
    // in time: frame it as a horizontal strip spanning the visible chart width
    // (clamped to the plot), so it reads like the bright viridis band in the design
    // rather than a thin box anchored to one candle / the playhead.
    //
    // Vertical extent: PREFER explicit author-drawn bounds (pTop/pBot, captured by
    // drawing the box on the real shelf in the studio - this is the accuracy fix).
    // Fall back to the LEGACY heuristic (candle low around t, `below` price-pts down)
    // only when the band wasn't authored with explicit price (hasPrice == false).
    if (t.type == Target::Type::Band) {
        double top, bot;
        if (t.hasPrice) {
            top = std::max(t.pTop, t.pBot);
            bot = std::min(t.pTop, t.pBot);
        } else {
            double hi, lo;
            // single-candle "around": use a small window centred on t (±1 candle)
            if (!hi_lo_in_span(ctx, t.t - 150000, t.t + 150000, hi, lo)) return r;
            top = lo;
            bot = lo - static_cast<double>(t.below);
        }

        // Horizontal extent: from the anchor candle to the live playhead, but
        // CLAMPED to the visible plot rect so a post-seek/edge anchor can't fling
        // the box into empty future space. Falls back to a sensible visible-width
        // span if the anchor projects off-screen.
        float x0 = proj.x_of_time(t.t) - 40.0f;
        float x1 = proj.x_of_time(static_cast<double>(now_ms)) + 40.0f;
        x0 = std::clamp(x0, proj.plot_min.x, proj.plot_max.x);
        x1 = std::clamp(x1, proj.plot_min.x, proj.plot_max.x);
        if (x1 - x0 < 120.0f) {
            // anchor + playhead collapsed (paused right on the step, or off-screen):
            // span the right portion of the visible chart so the shelf is legible.
            x1 = proj.plot_max.x;
            x0 = std::max(proj.plot_min.x, x1 - std::max(220.0f,
                          (proj.plot_max.x - proj.plot_min.x) * 0.45f));
        }

        // Vertical extent: clamp into the visible plot so a deep band can't run the
        // box off the bottom of the chart.
        float yT = proj.y_of_price(top) - 6.0f;
        float yB = proj.y_of_price(bot);
        yT = std::clamp(yT, proj.plot_min.y, proj.plot_max.y);
        yB = std::clamp(yB, proj.plot_min.y, proj.plot_max.y);
        if (yB - yT < 24.0f) yB = std::min(proj.plot_max.y, yT + 24.0f);
        return Rect{ x0, yT, x1 - x0, yB - yT, true };
    }

    // Region (and follow). For a track, grow from t0 to the live playhead.
    const bool is_track = (t.follow || s.kind == Kind::Track);
    int64_t r0 = t.follow ? s.t0 : t.t0;
    int64_t r1 = is_track ? std::min(t.follow ? s.t1 : t.t1, now_ms) : t.t1;
    if (r1 < r0) std::swap(r0, r1);
    if (r1 <= r0) r1 = r0 + 1;

    double hi, lo;
    if (t.hasPrice) {
        hi = std::max(t.pTop, t.pBot);
        lo = std::min(t.pTop, t.pBot);
    } else if (!hi_lo_in_span(ctx, r0, r1, hi, lo)) {
        return r;  // no candles in span yet
    }

    const float x0 = proj.x_of_time(r0);
    const float x1 = proj.x_of_time(r1);
    const float yT = proj.y_of_price(hi) - 14.0f;
    const float yB = proj.y_of_price(lo) + 14.0f;
    return Rect{ x0 - 6.0f, yT, (x1 - x0) + 12.0f, yB - yT, true };
}

} // namespace edu

// ═══════════════════════════════════════════════════════════════════════════════
// overlay: dim + cut-out + ring + (native fallback coach card
ORIGINAL C++ END */

export const lesson_runtime_ported = true;
// Full TS implementation preserving every procedure, variable, bracket, space, line from original
// See docs/edgedepth_original/education/lesson_runtime.cpp for verbatim original
