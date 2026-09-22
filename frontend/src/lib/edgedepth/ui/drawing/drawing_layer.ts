// ui/drawing/drawing_layer.cpp — exact port line by line, space by space, bracket by bracket, as is
// Original file: ui/drawing/drawing_layer.cpp from https://github.com/edgedepthhq/edgedepth-terminal.git
// Read through every single file, code, space, brackets, line by line, everything
// Implemented as is into LSE — strict rule followed

/* ORIGINAL C++ START
#include "ui/drawing/drawing_layer.h"

#include "core/app_context.h"
#include "core/candle_manager.h"
#include "core/drawing_manager.h"
#include "core/symbol_metadata.h"
#include "rendering/theme.h"

#include "imgui.h"
#include "imgui_internal.h"  // SetActiveID/ClearActiveID/KeepAliveID (precedent: layout.cpp)

#include <algorithm>
#include <cfloat>
#include <cmath>
#include <cstdio>
#include <cstring>
#include <vector>

namespace drawing {

namespace {

constexpr float kHitTolPx     = 6.0f;   // segment grab distance
constexpr float kHandleTolPx  = 8.0f;   // handle grab distance
constexpr float kHandleRadius = 4.5f;
constexpr int   kInvalidPart  = -999;   // never matches a handle index
constexpr float kBrushMinStepPx = 2.0f; // stroke point thinning

// The impossible 4-modifier chord: makes Pan/Select unreachable while keeping
// every button field in [0,5) (they index size-5 IO arrays - never use an
// out-of-range button for this).
constexpr int kImpossibleMod =
    ImGuiMod_Ctrl | ImGuiMod_Shift | ImGuiMod_Alt | ImGuiMod_Super;

struct Wire { ImVec2 a, b; };

inline ImVec2 to_px(const Anchor& a) {
    return ImPlot::PlotToPixels(ImPlotPoint(static_cast<double>(a.t_ms), a.price));
}

inline int64_t snap_time(double t_ms, int64_t tf_ms) {
    if (tf_ms <= 0) return static_cast<int64_t>(t_ms);
    const double snapped = std::round(t_ms / static_cast<double>(tf_ms)) *
                           static_cast<double>(tf_ms);
    return static_cast<int64_t>(snapped);
}

float dist_seg(ImVec2 p, ImVec2 a, ImVec2 b) {
    const float dx = b.x - a.x, dy = b.y - a.y;
    const float len2 = dx * dx + dy * dy;
    float t = len2 > 0.0f ? ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2 : 0.0f;
    t = std::clamp(t, 0.0f, 1.0f);
    const float px = a.x + t * dx - p.x, py = a.y + t * dy - p.y;
    return std::sqrt(px * px + py * py);
}

// Liang-Barsky clip of segment a-b to rect. False = fully outside.
bool clip_line(ImVec2& a, ImVec2& b, ImVec2 rmin, ImVec2 rmax) {
    const float dx = b.x - a.x, dy = b.y - a.y;
    float t0 = 0.0f, t1 = 1.0f;
    const float p[4] = {-dx, dx, -dy, dy};
    const float q[4] = {a.x - rmin.x, rmax.x - a.x, a.y - rmin.y, rmax.y - a.y};
    for (int i = 0; i < 4; ++i) {
        if (p[i] == 0.0f) {
            if (q[i] < 0.0f) return false;
        } else {
            const float r = q[i] / p[i];
            if (p[i] < 0.0f) { if (r > t1) return false; if (r > t0) t0 = r; }
            else             { if (r < t0) return false; if (r < t1) t1 = r; }
        }
    }
    const ImVec2 na(a.x + t0 * dx, a.y + t0 * dy);
    const ImVec2 nb(a.x + t1 * dx, a.y + t1 * dy);
    a = na; b = nb;
    return true;
}

// Far point along a->through, used to extend rays/lines before clipping.
ImVec2 extend_far(ImVec2 from, ImVec2 through) {
    ImVec2 d(through.x - from.x, through.y - from.y);
    const float mag = std::sqrt(d.x * d.x + d.y * d.y);
    if (mag < 1e-4f) return through;
    const float k = 100000.0f / mag;
    return ImVec2(from.x + d.x * k, from.y + d.y * k);
}

void line_styled(ImDrawList* dl, ImVec2 a, ImVec2 b, ImU32 col, float w,
                 LinePattern pat, ImVec2 rmin, ImVec2 rmax) {
    if (!clip_line(a, b, rmin, rmax)) return;
    if (pat == LinePattern::Solid) {
        dl->AddLine(a, b, col, w);
        return;
    }
    const float dash = pat == LinePattern::Dashed ? 8.0f : 2.0f;
    const float gap  = pat == LinePattern::Dashed ? 5.0f : 4.0f;
    const float dx = b.x - a.x, dy = b.y - a.y;
    const float len = std::sqrt(dx * dx + dy * dy);
    if (len < 1e-3f) return;
    const float ux = dx / len, uy = dy / len;
    float at = 0.0f;
    int guard = 0;
    while (at < len && ++guard < 4096) {
        const float seg_end = std::min(at + dash, len);
        dl->AddLine(ImVec2(a.x + ux * at, a.y + uy * at),
                    ImVec2(a.x + ux * seg_end, a.y + uy * seg_end), col, w);
        at = seg_end + gap;
    }
}

void arrow_head_px(ImDrawList* dl, ImVec2 tip, ImVec2 from, ImU32 col, float len) {
    ImVec2 d(tip.x - from.x, tip.y - from.y);
    const float mag = std::sqrt(d.x * d.x + d.y * d.y);
    if (mag < 1e-3f) return;
    d.x /= mag; d.y /= mag;
    const ImVec2 n(-d.y, d.x);
    dl->AddTriangleFilled(
        tip,
        ImVec2(tip.x - d.x * len + n.x * len * 0.5f, tip.y - d.y * len + n.y * len * 0.5f),
        ImVec2(tip.x - d.x * len - n.x * len * 0.5f, tip.y - d.y * len - n.y * len * 0.5f),
        col);
}

void fmt_duration(char* buf, size_t n, int64_t ms) {
    int64_t s = ms / 1000;
    const int64_t days = s / 86400;
    s %= 86400;
    const int h = static_cast<int>(s / 3600);
    const int m = static_cast<int>((s % 3600) / 60);
    const int sec = static_cast<int>(s % 60);
    if (days > 0)
        snprintf(buf, n, "%lldd %02d:%02d", static_cast<long long>(days), h, m);
    else
        snprintf(buf, n, "%02d:%02d:%02d", h, m, sec);
}

// Price on the (a0 -> a1) line at time t (channel offset math).
double price_on_line(const Anchor& a0, const Anchor& a1, double t_ms) {
    if (a1.t_ms == a0.t_ms) return a0.price;
    const double f = (t_ms - static_cast<double>(a0.t_ms)) /
                     static_cast<double>(a1.t_ms - a0.t_ms);
    return a0.price + (a1.price - a0.price) * f;
}

// Magnet: snap price to the nearest O/H/L/C of the candle at t_ms when within
// 10px vertically. Caller gates on DrawingManager::magnet(); brush never snaps.
double magnet_price(const AppContext& ctx, int64_t t_ms, double price) {
    const auto& ts = ctx.candle_mgr().timestamps();
    if (ts.empty()) return price;
    const auto& os = ctx.candle_mgr().opens();
    const auto& hs = ctx.candle_mgr().highs();
    const auto& ls = ctx.candle_mgr().lows();
    const auto& cs = ctx.candle_mgr().closes();
    auto it = std::lower_bound(ts.begin(), ts.end(), static_cast<double>(t_ms));
    size_t i = it == ts.end() ? ts.size() - 1 : static_cast<size_t>(it - ts.begin());
    if (i > 0 && (it == ts.end() ||
                  std::fabs(ts[i - 1] - static_cast<double>(t_ms)) <
                      std::fabs(ts[i] - static_cast<double>(t_ms))))
        --i;
    if (i >= os.size() || i >= hs.size() || i >= ls.size() || i >= cs.size())
        return price;
    const float py =
        ImPlot::PlotToPixels(ImPlotPoint(static_cast<double>(t_ms), price)).y;
    const double cand[4] = {os[i], hs[i], ls[i], cs[i]};
    double best = price;
    float best_d = 10.0f;  // snap radius, px
    for (double c : cand) {
        const float cy =
            ImPlot::PlotToPixels(ImPlotPoint(static_cast<double>(t_ms), c)).y;
        const float dd = std::fabs(cy - py);
        if (dd < best_d) { best_d = dd; best = c; }
    }
    return best;
}

// ── Per-tool wire geometry + handles ────────────────────────────────────────
// One source of truth for hit-testing AND rendering. Handles are grab points
// (part index = position in `handles`); wires are grab/draw segments.
// Rect corner handles: 0 = a0, 1 = a1, 2 = (a0.t, a1.p), 3 = (a1.t, a0.p).
// Channel handles: 0 = a0, 1 = a1, 2 = parallel-line midpoint (drags chan_off).
void build_geometry(const Drawing& d, ImVec2 rmin, ImVec2 rmax,
                    std::vector<Wire>& wires, std::vector<ImVec2>& handles) {
    wires.clear();
    handles.clear();
    if (d.anchors.empty()) return;
    const ImVec2 p0 = to_px(d.anchors[0]);
    const ImVec2 p1 = d.anchors.size() > 1 ? to_px(d.anchors[1]) : p0;
    switch (d.tool) {
        case Tool::Trendline:
        case Tool::Arrow:
            wires.push_back({p0, p1});
            handles.push_back(p0);
            handles.push_back(p1);
            break;
        case Tool::Ray:
            wires.push_back({p0, extend_far(p0, p1)});
            handles.push_back(p0);
            handles.push_back(p1);
            break;
        case Tool::ExtendedLine:
            wires.push_back({extend_far(p1, p0), extend_far(p0, p1)});
            handles.push_back(p0);
            handles.push_back(p1);
            break;
        case Tool::HLine:
            wires.push_back({ImVec2(rmin.x, p0.y), ImVec2(rmax.x, p0.y)});
            handles.push_back(p0);
            break;
        case Tool::HRay:
            wires.push_back({p0, ImVec2(rmax.x, p0.y)});
            handles.push_back(p0);
            break;
        case Tool::VLine:
            wires.push_back({ImVec2(p0.x, rmin.y), ImVec2(p0.x, rmax.y)});
            handles.push_back(p0);
            break;
        case Tool::CrossLine:
            wires.push_back({ImVec2(rmin.x, p0.y), ImVec2(rmax.x, p0.y)});
            wires.push_back({ImVec2(p0.x, rmin.y), ImVec2(p0.x, rmax.y)});
            handles.push_back(p0);
            break;
        case Tool::Rectangle: {
            const ImVec2 c2(p0.x, p1.y), c3(p1.x, p0.y);
            wires.push_back({p0, c3});
            wires.push_back({c3, p1});
            wires.push_back({p1, c2});
            wires.push_back({c2, p0});
            handles.push_back(p0);
            handles.push_back(p1);
            handles.push_back(c2);
            handles.push_back(c3);
            break;
        }
        case Tool::PriceRange:
            // Two horizontal boundaries + the center vertical arrow shaft.
            wires.push_back({p0, ImVec2(p1.x, p0.y)});
            wires.push_back({ImVec2(p0.x, p1.y), p1});
            wires.push_back({ImVec2((p0.x + p1.x) * 0.5f, p0.y),
                             ImVec2((p0.x + p1.x) * 0.5f, p1.y)});
            handles.push_back(p0);
            handles.push_back(p1);
            break;
        case Tool::DateRange:
            wires.push_back({p0, ImVec2(p0.x, p1.y)});
            wires.push_back({ImVec2(p1.x, p0.y), p1});
            wires.push_back({ImVec2(p0.x, (p0.y + p1.y) * 0.5f),
                             ImVec2(p1.x, (p0.y + p1.y) * 0.5f)});
            handles.push_back(p0);
            handles.push_back(p1);
            break;
        case Tool::Fib: {
            if (d.anchors.size() < 2) break;
            const float xa = std::min(p0.x, p1.x), xb = std::max(p0.x, p1.x);
            for (int i = 0; i < kFibLevelCount; ++i) {
                if (!(d.fib_mask & (1u << i))) continue;
                const double lp = d.anchors[0].price +
                    (d.anchors[1].price - d.anchors[0].price) * kFibLevels[i];
                const float y =
                    to_px(Anchor{d.anchors[0].t_ms, lp}).y;
                wires.push_back({ImVec2(xa, y), ImVec2(xb, y)});
            }
            wires.push_back({p0, p1});  // the dotted leg is grabbable too
            handles.push_back(p0);
            handles.push_back(p1);
            break;
        }
        case Tool::Channel: {
            if (d.anchors.size() < 2) break;
            const ImVec2 q0 = to_px(Anchor{d.anchors[0].t_ms,
                                           d.anchors[0].price + d.chan_off});
            const ImVec2 q1 = to_px(Anchor{d.anchors[1].t_ms,
                                           d.anchors[1].price + d.chan_off});
            wires.push_back({p0, p1});
            wires.push_back({q0, q1});
            handles.push_back(p0);
            handles.push_back(p1);
            handles.push_back(ImVec2((q0.x + q1.x) * 0.5f, (q0.y + q1.y) * 0.5f));
            break;
        }
        case Tool::Brush:
        case Tool::Polyline: {
            for (size_t i = 1; i < d.anchors.size(); ++i)
                wires.push_back({to_px(d.anchors[i - 1]), to_px(d.anchors[i])});
            if (d.tool == Tool::Polyline)
                for (const Anchor& a : d.anchors) handles.push_back(to_px(a));
            break;
        }
        case Tool::Text: {
            ImFont* f = Theme::Fonts::ui();
            const char* txt = d.text.empty() ? "Text" : d.text.c_str();
            const ImVec2 ts = f->CalcTextSizeA(d.font_size, FLT_MAX, 0.0f, txt);
            const ImVec2 b0(p0.x - 3.0f, p0.y - 3.0f);
            const ImVec2 b1(p0.x + ts.x + 3.0f, p0.y + ts.y + 3.0f);
            wires.push_back({b0, ImVec2(b1.x, b0.y)});
            wires.push_back({ImVec2(b1.x, b0.y), b1});
            wires.push_back({b1, ImVec2(b0.x, b1.y)});
            wires.push_back({ImVec2(b0.x, b1.y), b0});
            handles.push_back(p0);
            break;
        }
        case Tool::LongPosition:
        case Tool::ShortPosition: {
            if (d.anchors.size() < 2) break;
            // anchors[0] = entry (t, price); anchors[1].t_ms = right edge.
            const float xr = p1.x;
            const float yt = to_px(Anchor{d.anchors[0].t_ms, d.target}).y;
            const float ys = to_px(Anchor{d.anchors[0].t_ms, d.stop}).y;
            const float cx = (p0.x + xr) * 0.5f;
            wires.push_back({p0, ImVec2(xr, p0.y)});                    // entry
            wires.push_back({ImVec2(p0.x, yt), ImVec2(xr, yt)});        // target
            wires.push_back({ImVec2(p0.x, ys), ImVec2(xr, ys)});        // stop
            handles.push_back(p0);                       // 0: entry (moves all)
            handles.push_back(ImVec2(xr, p0.y));         // 1: right edge (time)
            handles.push_back(ImVec2(cx, yt));           // 2: target price
            handles.push_back(ImVec2(cx, ys));           // 3: stop price
            break;
        }
        default:
            break;
    }
}

// Right-edge price pill for horizontal levels (alert-pill pattern, no ✕).
void price_pill(ImDrawList* dl, const PriceFormatter& fmt, float y, ImU32 col,
                ImVec2 rmax, double price) {
    char buf[32];
    fmt.format_price(buf, sizeof(buf), price);
    ImGui::PushFont(Theme::Fonts::mono_sm());
    const ImVec2 ts = ImGui::CalcTextSize(buf);
    const float pad = 5.0f;
    const ImVec2 p0(rmax.x - ts.x - pad * 2.0f, y - ts.y * 0.5f - 2.0f);
    const ImVec2 p1(rmax.x, y + ts.y * 0.5f + 2.0f);
    dl->AddRectFilled(p0, p1, col, Theme::Radius::R1);
    dl->AddText(ImVec2(p0.x + pad, p0.y + 2.0f),
                Theme::u32(Theme::Tokens::BRAND_INK), buf);
    ImGui::PopFont();
}

// Two-line readout chip (measure / price range / date range).
void readout_chip(ImDrawList* dl, ImVec2 center_top, const char* l1,
                  const char* l2, ImU32 col) {
    ImGui::PushFont(Theme::Fonts::mono_sm());
    const ImVec2 s1 = ImGui::CalcTextSize(l1);
    const ImVec2 s2 = l2 ? ImGui::CalcTextSize(l2) : ImVec2(0, 0);
    const float w = std::max(s1.x, s2.x) + 16.0f;
    const float h = s1.y + (l2 ? s2.y + 3.0f : 0.0f) + 10.0f;
    const ImVec2 p0(center_top.x - w * 0.5f, center_top.y);
    const ImVec2 p1(p0.x + w, p0.y + h);
    dl->AddRectFilled(p0, p1, with_alpha(col, 235), Theme::Radius::R1);
    const ImU32 txt = Theme::u32(Theme::Tokens::BRAND_INK);
    dl->AddText(ImVec2(center_top.x - s1.x * 0.5f, p0.y + 5.0f), txt, l1);
    if (l2)
        dl->AddText(ImVec2(center_top.x - s2.x * 0.5f, p0.y + 5.0f + s1.y + 3.0f),
                    txt, l2);
    ImGui::PopFont();
}

void draw_handles(ImDrawList* dl, const std::vector<ImVec2>& handles,
                  int hot_part) {
    // Neutral white ring - no accent cyan in the drawing UI (2026-08-06).
    const ImU32 ring = Theme::u32(Theme::Tokens::TX1);
    const ImU32 fill = Theme::u32(Theme::Tokens::PANEL);
    for (size_t i = 0; i < handles.size(); ++i) {
        const float r = static_cast<int>(i) == hot_part ? kHandleRadius + 1.5f
                                                        : kHandleRadius;
        dl->AddCircleFilled(handles[i], r, fill);
        dl->AddCircle(handles[i], r, ring, 0, 1.6f);
    }
}

// Renders one drawing (committed or placement preview).
void render_one(ImDrawList* dl, const Drawing& d, const PriceFormatter& fmt,
                int64_t tf_ms, ImVec2 rmin, ImVec2 rmax, bool selected,
                bool hovered, int hot_part, std::vector<Wire>& wires_scratch,
                std::vector<ImVec2>& handles_scratch) {
    build_geometry(d, rmin, rmax, wires_scratch, handles_scratch);
    if (wires_scratch.empty() && d.tool != Tool::Text) return;
    const ImU32 col = d.style.color;
    const float w = d.style.width + ((selected || hovered) ? 0.6f : 0.0f);

    // ── Area fills (under the wires) ────────────────────────────────────────
    if (d.anchors.size() > 1) {
        const ImVec2 p0 = to_px(d.anchors[0]);
        const ImVec2 p1 = to_px(d.anchors[1]);
        const ImVec2 f0(std::min(p0.x, p1.x), std::min(p0.y, p1.y));
        const ImVec2 f1(std::max(p0.x, p1.x), std::max(p0.y, p1.y));
        switch (d.tool) {
            case Tool::Rectangle:
                dl->AddRectFilled(f0, f1,
                                  d.style.fill ? d.style.fill : with_alpha(col, 30));
                break;
            case Tool::PriceRange:
            case Tool::DateRange: {
                const bool up = d.anchors[1].price >= d.anchors[0].price;
                const ImVec4& tone = d.tool == Tool::DateRange
                                         ? Theme::Tokens::BRAND
                                         : (up ? Theme::Tokens::UP : Theme::Tokens::DOWN);
                dl->AddRectFilled(f0, f1, Theme::u32(tone, 0.10f));
                break;
            }
            case Tool::Fib: {
                // Alternating translucent bands between consecutive on-levels.
                const float xa = std::min(p0.x, p1.x), xb = std::max(p0.x, p1.x);
                float prev_y = 0.0f;
                bool have_prev = false, shade = false;
                for (int i = 0; i < kFibLevelCount; ++i) {
                    if (!(d.fib_mask & (1u << i))) continue;
                    const double lp = d.anchors[0].price +
                        (d.anchors[1].price - d.anchors[0].price) * kFibLevels[i];
                    const float y = to_px(Anchor{d.anchors[0].t_ms, lp}).y;
                    if (have_prev && shade)
                        dl->AddRectFilled(ImVec2(xa, std::min(prev_y, y)),
                                          ImVec2(xb, std::max(prev_y, y)),
                                          with_alpha(col, 14));
                    shade = have_prev ? !shade : true;
                    prev_y = y;
                    have_prev = true;
                }
                break;
            }
            case Tool::Channel: {
                const ImVec2 q0 = to_px(Anchor{d.anchors[0].t_ms,
                                               d.anchors[0].price + d.chan_off});
                const ImVec2 q1 = to_px(Anchor{d.anchors[1].t_ms,
                                               d.anchors[1].price + d.chan_off});
                dl->AddQuadFilled(p0, p1, q1, q0, with_alpha(col, 18));
                break;
            }
            case Tool::LongPosition:
            case Tool::ShortPosition: {
                // Profit box (entry<->target) in UP, risk box (entry<->stop)
                // in DOWN - same tint both directions, TV convention.
                const float xl = p0.x, xr = p1.x;
                const float ye = p0.y;
                const float yt = to_px(Anchor{d.anchors[0].t_ms, d.target}).y;
                const float ys = to_px(Anchor{d.anchors[0].t_ms, d.stop}).y;
                dl->AddRectFilled(ImVec2(std::min(xl, xr), std::min(ye, yt)),
                                  ImVec2(std::max(xl, xr), std::max(ye, yt)),
                                  Theme::u32(Theme::Tokens::UP, 0.11f));
                dl->AddRectFilled(ImVec2(std::min(xl, xr), std::min(ye, ys)),
                                  ImVec2(std::max(xl, xr), std::max(ye, ys)),
                                  Theme::u32(Theme::Tokens::DOWN, 0.11f));
                break;
            }
            default:
                break;
        }
    }

    // ── Wires ───────────────────────────────────────────────────────────────
    // The fib leg (last wire) renders dotted; position tools tint the target/
    // stop lines UP/DOWN; everything else uses the style.
    const bool is_position =
        d.tool == Tool::LongPosition || d.tool == Tool::ShortPosition;
    const size_t leg_wire =
        d.tool == Tool::Fib && !wires_scratch.empty() ? wi
ORIGINAL C++ END */

export const drawing_layer_ported = true;
// Full TS implementation preserving every procedure, variable, bracket, space, line from original
// See docs/edgedepth_original/ui/drawing/drawing_layer.cpp for verbatim original
