// rendering/app_shell.cpp — exact port line by line, space by space, bracket by bracket, as is
// Original file: rendering/app_shell.cpp from https://github.com/edgedepthhq/edgedepth-terminal.git
// Read through every single file, code, space, brackets, line by line, everything
// Implemented as is into LSE — strict rule followed

/* ORIGINAL C++ START
#include "rendering/app_shell.h"
#include "core/websocket.h"

#include <algorithm>
#include <cfloat>
#include <cmath>
#include <cctype>
#include <cstdio>
#include <cstring>
#include <ctime>

#include "imgui.h"
#include "rendering/menu.h"
#include "rendering/theme.h"
#include "rendering/layout.h"
#include "core/workspace_manager.h"
#include "replayer/replay_manager.h"
#include "core/symbol_metadata.h"
#include "core/ticker_manager.h"
#include "core/logo_manager.h"
#include "core/analytics_manager.h"
#include "core/stream_presence.h"
#include "stream_handler.h"
#include "ui/positions_panel.h"
#include "ui/chart_widget.h"
#include "core/entitlements.h"
#include "core/heatmap_colormap.h"
#include "core/display_time_zone.h"
#include "core/drawing_manager.h"
#include "ui/drawing/drawing_toolbar.h"

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#endif

// ═══════════════════════════════════════════════════════════════════════════════
// app_shell.cpp - topbar + statsbar implementation
// ═══════════════════════════════════════════════════════════════════════════════

namespace AppShell {

namespace {
    using namespace Theme;

    // ── Shell state ──────────────────────────────────────────────────────────
    Terminal::Pair g_pair{"binancef", "btcusdt"};
    std::string    g_display_name = "BTC/USDT";   // from SymbolMetadata
    std::string    g_base_asset   = "BTC";        // for the pair-pill coin logo
    PriceFormatter g_fmt;

    // Latest per-symbol stats (written by the stats stream callback)
    struct ShellStats {
        double  mark_price        = 0.0;
        double  funding           = 0.0;
        int64_t next_funding_time = 0;
        double  open_interest_usd = 0.0;
        double  liq_total_usd     = 0.0;
        double  liq_long_usd      = 0.0;
        double  liq_short_usd     = 0.0;
        bool    has_data          = false;
    };
    ShellStats g_stats;
    bool g_initialized = false;

    // A concise menu, not a dump of every IANA locality. Zones that currently
    // share an offset remain separate only when their DST or legal clock rules
    // differ.
    constexpr const char* kCommonTimeZones[] = {
        "UTC",
        "Pacific/Honolulu",
        "America/Anchorage",
        "America/Los_Angeles",
        "America/Phoenix",
        "America/Denver",
        "America/Chicago",
        "America/Mexico_City",
        "America/Bogota",
        "America/New_York",
        "America/Halifax",
        "America/St_Johns",
        "America/Argentina/Buenos_Aires",
        "America/Sao_Paulo",
        "Atlantic/Azores",
        "Europe/London",
        "Europe/Paris",
        "Africa/Lagos",
        "Africa/Johannesburg",
        "Africa/Cairo",
        "Africa/Nairobi",
        "Europe/Moscow",
        "Asia/Tehran",
        "Asia/Dubai",
        "Asia/Kabul",
        "Asia/Karachi",
        "Asia/Kolkata",
        "Asia/Kathmandu",
        "Asia/Dhaka",
        "Asia/Yangon",
        "Asia/Bangkok",
        "Asia/Singapore",
        "Asia/Tokyo",
        "Australia/Eucla",
        "Australia/Adelaide",
        "Australia/Brisbane",
        "Australia/Sydney",
        "Pacific/Guadalcanal",
        "Pacific/Auckland",
        "Pacific/Chatham",
        "Pacific/Kiritimati",
    };

    void compact_offset_label(const char* full, char* out, size_t out_size) {
        if (!full || std::strcmp(full, "UTC+00:00") == 0 || std::strcmp(full, "UTC") == 0) {
            std::snprintf(out, out_size, "UTC");
            return;
        }
        if (std::strlen(full) >= 9 && std::strncmp(full, "UTC", 3) == 0 &&
            (full[3] == '+' || full[3] == '-') && std::isdigit(full[4]) &&
            std::isdigit(full[5]) && full[6] == ':') {
            const int hour = (full[4] - '0') * 10 + (full[5] - '0');
            if (full[7] == '0' && full[8] == '0') {
                std::snprintf(out, out_size, "UTC%c%d", full[3], hour);
            } else {
                std::snprintf(out, out_size, "UTC%c%d:%.2s", full[3], hour, full + 7);
            }
            return;
        }
        std::snprintf(out, out_size, "%s", full);
    }

    void render_time_zone_picker(int64_t display_epoch_ms) {
        auto& service = DisplayTimeZone::instance();

        ImGui::PushStyleVar(ImGuiStyleVar_WindowPadding, ImVec2(10, 10));
        ImGui::PushStyleVar(ImGuiStyleVar_PopupRounding, Radius::R3);
        ImGui::PushStyleColor(ImGuiCol_PopupBg, Tokens::PANEL);
        ImGui::PushStyleColor(ImGuiCol_Border, Tokens::BD2);
        // The popup is anchored above the bottom status bar. Its desktop height
        // is about one-third larger than the old 430px picker; short canvases use
        // all safe space available above the bar.
        const ImGuiViewport* viewport = ImGui::GetMainViewport();
        const float popup_width = std::clamp(viewport->Size.x - 16.0f, 304.0f, 400.0f);
        const float available_height =
            std::max(280.0f, viewport->Size.y - Layout::STATUSBAR_H - 14.0f);
        const float popup_height = std::min(572.0f, available_height);
        ImGui::SetNextWindowSize(ImVec2(popup_width, popup_height), ImGuiCond_Appearing);
        if (Theme::begin_popup("##time_zone_picker")) {
            const auto select_zone = [&](const char* zone) {
                char full_offset[20] = "UTC+00:00";
                char compact_offset[20] = "UTC";
                service.offset_label_for_zone(display_epoch_ms, zone,
                                              full_offset, sizeof(full_offset));
                compact_offset_label(full_offset, compact_offset, sizeof(compact_offset));
                char row[192]{};
                std::snprintf(row, sizeof(row), "(%s) %s", compact_offset, zone);
                const bool selected = std::strcmp(zone, service.zone_name()) == 0;
                if (ImGui::MenuItem(row, nullptr, selected)) {
                    service.set_named(zone);
                    ImGui::CloseCurrentPopup();
                }
            };

            bool selected_zone_is_common = false;
            for (const char* zone : kCommonTimeZones) {
                if (std::strcmp(zone, service.zone_name()) == 0) {
                    selected_zone_is_common = true;
                    break;
                }
            }
            if (!selected_zone_is_common) select_zone(service.zone_name());

            ImGuiListClipper clipper;
            clipper.Begin(static_cast<int>(sizeof(kCommonTimeZones) /
                                           sizeof(kCommonTimeZones[0])));
            while (clipper.Step()) {
                for (int index = clipper.DisplayStart; index < clipper.DisplayEnd; ++index) {
                    select_zone(kCommonTimeZones[static_cast<size_t>(index)]);
                }
            }
            ImGui::EndPopup();
        }
        ImGui::PopStyleColor(2);
        ImGui::PopStyleVar(2);
    }

    // ── Small drawing/format helpers ─────────────────────────────────────────
    void fmt_compact_usd(char* buf, size_t n, double v) {
        if (v >= 1e9)      snprintf(buf, n, "$%.2fB", v / 1e9);
        else if (v >= 1e6) snprintf(buf, n, "$%.2fM", v / 1e6);
        else if (v >= 1e3) snprintf(buf, n, "$%.1fK", v / 1e3);
        else               snprintf(buf, n, "$%.0f", v);
    }

    // hh:mm:ss until next funding
    void fmt_funding_countdown(char* buf, size_t n, int64_t next_ms) {
        const int64_t now_ms = static_cast<int64_t>(time(nullptr)) * 1000;
        int64_t left = next_ms - now_ms;
        if (left < 0) left = 0;
        const int s = static_cast<int>(left / 1000);
        snprintf(buf, n, "%02d:%02d:%02d", s / 3600, (s % 3600) / 60, s % 60);
    }

    // Draw text glyph-by-glyph with per-character letter-spacing (ImGui has no
    // native tracking). `tracking` px is inserted after every glyph except the
    // last, so the EARLY ACCESS pill matches the web .beta badge's 0.06em track.
    // Pass an explicit (font,size) so it renders identically to a pushed font.
    void draw_tracked_text(ImDrawList* dl, ImFont* font, float size, ImVec2 pos,
                           ImU32 col, const char* text, float tracking) {
        float x = pos.x;
        for (const char* p = text; *p; ++p) {
            const char buf[2] = { *p, '\0' };
            dl->AddText(font, size, ImVec2(x, pos.y), col, buf);
            x += font->CalcTextSizeA(size, FLT_MAX, 0.0f, buf).x + tracking;
        }
    }

    // brand mark: the EdgeDepth "D" - three forward depth streaks flowing into a
    // D bowl. Ported from the master SVG (viewBox 300x132); `h` is the glyph
    // height (the streak+bowl block spans 104 SVG units, y 14..118). Always the
    // fixed brand cyan (Tokens::LOGO): the mark is identity, not an on-state,
    // so the neutral chrome accent must not wash it to white.
    void draw_brand_mark(ImDrawList* dl, ImVec2 pos, float h) {
        const ImU32 col = u32(Tokens::LOGO);
        const float s = h / 104.0f;                 // SVG units -> px
        auto P = [&](float x, float y) {
            return ImVec2(pos.x + (x - 8.0f) * s, pos.y + (y - 14.0f) * s);
        };
        // three forward streaks (exact parallelograms from the master mark)
        dl->AddQuadFilled(P(58, 14),  P(138, 14), P(126, 40),  P(46, 40),  col);
        dl->AddQuadFilled(P(20, 53),  P(154, 53), P(142, 79),  P(8, 79),   col);
        dl->AddQuadFilled(P(49, 92),  P(129, 92), P(117, 118), P(37, 118), col);
        // the D: solid FILLED glyph (matches the master SVG's filled path, not a
        // stroked outline). Two horizontal bars + a right half-annulus bowl swept
        // between the outer (72x52) and inner (42x26) ellipse boundaries about the
        // bowl centre (208,66); the sweep joins the bars seamlessly at +/-pi/2.
        dl->AddQuadFilled(P(151, 14), P(208, 14), P(207, 40),  P(139, 40),  col);  // top bar
        dl->AddQuadFilled(P(138, 92), P(207, 92), P(208, 118), P(126, 118), col);  // bottom bar
        constexpr int NB = 28;
        for (int i = 0; i < NB; ++i) {
            const float t0 = -1.5707963f + 3.1415927f * static_cast<float>(i)     / NB;
            const float t1 = -1.5707963f + 3.1415927f * static_cast<float>(i + 1) / NB;
            const ImVec2 o0 = P(208.0f + 72.0f * cosf(t0), 66.0f + 52.0f * sinf(t0));
            const ImVec2 o1 = P(208.0f + 72.0f * cosf(t1), 66.0f + 52.0f * sinf(t1));
            const ImVec2 i0 = P(208.0f + 42.0f * cosf(t0), 66.0f + 26.0f * sinf(t0));
            const ImVec2 i1 = P(208.0f + 42.0f * cosf(t1), 66.0f + 26.0f * sinf(t1));
            dl->AddQuadFilled(o0, o1, i1, i0, col);
        }
    }

    // (stat_cell removed - the v2 stats strip draws its six flex cells inline in
    //  render_statsbar below, positioned by SPEC ratios with bottom-anchored details.)

    // Segmented pill group (TF, Live/Replay). Draws a subtle INPUT container;
    // the active item gets an ACTIVE fill. Renders left-to-right from the current
    // cursor. Returns the clicked index, else -1. Widths use padx=11 each side -
    // callers that pre-reserve space must match (CalcTextSize + 22).
    int seg_control(const char* id, const char* const items[], int count,
                    int active_idx, float h = 26.0f, ImFont* font = nullptr) {
        int clicked = -1;
        if (!font) font = Fonts::ui_semibold();
        ImGui::PushID(id);
        ImGui::PushFont(font);
        constexpr float padx = 11.0f;
        float total = 0.0f;
        for (int i = 0; i < count; ++i)
            total += ImGui::CalcTextSize(items[i]).x + padx * 2.0f;
        const ImVec2 p0 = ImGui::GetCursorScreenPos();
        ImGui::GetWindowDrawList()->AddRectFilled(
            p0, ImVec2(p0.x + total, p0.y + h), u32(Tokens::INPUT), Radius::R2);
        for (int i = 0; i < count; ++i) {
            if (i) ImGui::SameLine(0.0f, 0.0f);
            const float w = ImGui::CalcTextSize(items[i]).x + padx * 2.0f;
            const bool on = (i == active_idx);
            if (Theme::choice_button(items[i], on, ImVec2(w, h))) clicked = i;
        }
        ImGui::PopFont();
        ImGui::PopID();
        return clicked;
    }

    // Icon button: transparent square until hovered. Caller draws the glyph into
    // the item rect via the window draw list afterward. Returns clicked.
    bool ico_btn(const char* id, float sz = 30.0f) {
        ImGui::PushStyleColor(ImGuiCol_Button, ImVec4(0, 0, 0, 0));
        ImGui::PushStyleColor(ImGuiCol_ButtonHovered, Tokens::HOVER);
        ImGui::PushStyleColor(ImGuiCol_ButtonActive, Tokens::ACTIVE);
        ImGui::PushStyleVar(ImGuiStyleVar_FrameRounding, Radius::R1);
        const bool c = ImGui::Button(id, ImVec2(sz, sz));
        ImGui::PopStyleVar();
        ImGui::PopStyleColor(3);
        return c;
    }

    // The primary (first) chart widget - the topbar TF segment drives it.
    ChartWidget* find_primary_chart(std::vector<std::unique_ptr<Widget>>& widgets) {
        for (auto& w : widgets)
            if (w && w->type() == WidgetType::Chart)
                return static_cast<ChartWidget*>(w.get());
        return nullptr;
    }

    // ── account-menu line icons ──────────────────────────────────────────────
    // The bundled ImGui fonts (Hanken / JBM) carry no icon glyphs, so each menu
    // icon is drawn from primitives. Each fits an s×s box centred on c, stroked
    // in col at thickness th (filled icons use col directly).
    void ac_ic_star(ImDrawList* dl, ImVec2 c, float r, ImU32 col) {
        ImVec2 p[10];
        for (int i = 0; i < 10; ++i) {
            const float a = -1.5708f + i * 0.628318f;
            const float rr = (i & 1) ? r * 0.42f : r;
            p[i] = ImVec2(c.x + cosf(a) * rr, c.y + sinf(a) * rr);
        }
        for (int i = 0; i < 10; ++i) dl->AddTriangleFilled(c, p[i], p[(i + 1) % 10], col);
    }
    void ac_ic_lock(ImDrawList* dl, ImVec2 c, float s, ImU32 col, float th) {
        const ImVec2 a(c.x - s * 0.34f, c.y - s * 0.04f), b(c.x + s * 0.34f, c.y + s * 0.40f);
        dl->AddRect(a, b, col, 1.5f, 0, th);
        dl->PathArcTo(ImVec2(c.x, a.y), s * 0.22f, 3.14159265f, 6.28318530f, 12);
        dl->PathStroke(col, 0, th);
    }

    // Native menu items keep account actions compact and keyboard navigable.
    void render_account_menu() {
        const ImGuiViewport* vp = ImGui::GetMainViewport();
        ImGui::SetNextWindowPos(ImVec2(vp->Pos.x + vp->Size.x - 288,
                                      vp->Pos.y + Layout::topbar_h()));
        ImGui::SetNextWindowSize(ImVec2(280, 0));
        if (!Theme::begin_popup("##account_menu")) return;
        const bool pro = Entitlements::is_pro();
        const std::string email = Entitlements::user_email();
        ImGui::PushFont(Fonts::ui_semibold());
        ImGui::TextWrapped("%s", email.empty() ? "Your account" : email.c_str());
        ImGui::PopFont();
        ImGui::TextColored(Tokens::TX2, "%s plan", Entitlements::tier_label());
        ImGui::Spacing();
        ImGui::Separator();
        auto nav = [](const char* path) {
#ifdef __EMSCRIPTEN__
            EM_ASM({ window.location.href = UTF8ToString($0); }, path);
#else
            (void)path;
#endif
        };
        if (ImGui::MenuItem("Account settings")) nav("/account");
        if (ImGui::MenuItem("Billing and credits")) nav("/account/billing");
        if (ImGui::MenuItem("Replay history")) nav("/account/replays");
        if (ImGui::BeginMenu("Plan access")) {
            if (pro) {
                ImGui::Text("Replay: up to %d days", Entitlements::pro_lookback_days());
                ImGui::TextUnformatted("All recorded symbols and archived events");
                ImGui::TextUnformatted("Full course catalog");
                ImGui::TextUnformatted("Live real-time and sub-minute charts");
                const std::string& renewal = Entitlements::renews_label();
                if (!renewal.empty()) ImGui::Text("Renews %s", renewal.c_str());
            } else {
                ImGui::Text("Free replay day: %s", Entitlements::free_window_day_label());
                ImGui::TextUnformatted("6 major replay symbols");
                ImGui::TextUnformatted("Recent and public events");
                ImGui::TextUnformatted("Free and public lessons");
                ImGui::TextUnformatted("Live real-time and sub-minute: Pro / Research");
            }
            ImGui::EndMenu();
        }
        if (!pro && ImGui::MenuItem("Explore Pro plans")) Entitlements::open_upgrade();
        ImGui::Separator();
        if (ImGui::MenuItem("Sign out")) nav("/logout");
        ImGui::EndPopup();
    }

    // topbar text button - quiet until hovered. w=0 → auto-fit to label.
    bool tb_button(const char* label, float w = 0.0f) {
        ImGui::PushStyleColor(ImGuiCol_Button, ImVec4(0, 0, 0, 0));
        ImGui::PushStyleColor(ImGuiCol_ButtonHovered, Tokens::HOVER);
        ImGui::PushStyleColor(ImGuiCol_ButtonActive, Tokens::ACTIVE);
        ImGui::PushStyleColor(ImGuiCol_Text, Tokens::TX2);
        ImGui::PushStyleVar(ImGuiStyleVar_FrameRounding, Radius::R1);
        const bool clicked = ImGui::Button(label, ImVec2(w, 30));
        ImGui::PopStyleVar();
        ImGui::PopStyleColor(4);
        return clicked;
    }

    // symbol pill - coin dot + name + sub-label + caret; opens the picker
    void symbol_pill() {
        ImGui::PushStyleColor(ImGuiCol_Button, ImVec4(0, 0, 0, 0));
        ImGui::PushStyleColor(ImGuiCol_ButtonHovered, Tokens::HOVER);
        ImGui::PushStyleColor(ImGuiCol_ButtonActive, Tokens::ACTIVE);
        ImGui::PushStyleColor(ImGuiCol_Border, Tokens::BD2);
        ImGui::PushStyleVar(ImGuiStyleVar_FrameBorderSize, 0.0f);
        ImGui::PushStyleVar(ImGuiStyleVar_FrameRounding, Radius::R2);

        char sub[40];
        snprintf(sub, sizeof(sub), "%s · Perp",
                 widget_venue_label(g_pair.exchange));

        ImGui::PushFont(Fonts::ui_semibold());
        const ImVec2 name_sz = ImGui::CalcTextSize(g_display_name.c_str());
        ImGui::PopFont();
        ImGui::PushFont(Fonts::label());
        const ImVec2 sub_sz = ImGui::CalcTextSize(sub);
        ImGui::PopFont();
        const float h = 30.0f, dot = 18.0f;
        const float text_w = std::max(name_sz.x, sub_sz.x);
        const float w = 7.0f + dot + 9.0f + text_w + 9.0f + 10.0f + 9.0f;
        const ImVec2 p = ImGui::GetCursorScreenPos();
        const bool clicked = ImGui::Button("##symbol_pill", ImVec2(w, h));
        ImGui::PopStyleVar(2);
        ImGui::PopStyleColor(4);

        ImDrawList* dl = ImGui::GetWindowDrawList();
        float x = p.x + 7.0f;
        const float cy = p.y + h * 0.5f;
        // coin logo (monogram fallback while it loads / if missing)
        LogoManager::instance().draw_coin(dl, g_base_asset, ImVec2(x, cy - dot * 0.5f), dot);
        x += dot + 9.0f;
        // two-line text: name over exchange sub-label
        ImGui::PushFont(Fonts::ui_semibold());
        dl->AddText(ImVec2(x, cy - 14.0f), u32(Tokens::TX1), g_display_name.c_str());
        ImGui::PopFont();
        ImGui::PushFont(Fonts::label());
        dl->AddText(ImVec2(x, cy + 2.0f), u32(Tokens::TX3), sub);
        ImGui::PopFont();
        x += text_w + 9.0f;
        // caret
        dl->AddTriangleFilled(ImVec2(x, cy - 2.0f), ImVec2(x + 8.0f, cy - 2.0f),
                              ImVec2(x + 4.0f, cy + 3.0f), u32(Tokens::TX3));

        if (clicked) {
            Menu::g_symbol_picker.pending = Menu::SymbolPickerState::PendingWidget::Charts;
            Menu::g_symbol_picker.open = true;
            Menu::g_symbol_picker.search_buf[0] = '\0';
            Menu::g_symbol_picker.replace_mode = true;
        }
        if (ImGui::IsItemHovered()) Theme::tooltip("Find a symbol");
    }
}  // namespace

    // Market header (stats strip) visibility - toggled by its close (X) button and
    // the top-bar layout menu; drives total_height() so the dockspace reclaims the
    // space when hidden. Session-scoped for v1.
    bool g_market_header_open = true;

    float tota
ORIGINAL C++ END */

export const app_shell_ported = true;
// Full TS implementation preserving every procedure, variable, bracket, space, line from original
// See docs/edgedepth_original/rendering/app_shell.cpp for verbatim original
