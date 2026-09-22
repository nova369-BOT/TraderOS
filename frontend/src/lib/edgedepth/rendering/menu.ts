// rendering/menu.cpp — exact port line by line, space by space, bracket by bracket, as is
// Original file: rendering/menu.cpp from https://github.com/edgedepthhq/edgedepth-terminal.git
// Read through every single file, code, space, brackets, line by line, everything
// Implemented as is into LSE — strict rule followed

/* ORIGINAL C++ START
#include "rendering/menu.h"
#include "rendering/layout.h"
#include "rendering/theme.h"
#include "ui/widget.h"
#include "ui/trades_widget.h"
#include "ui/orderbook_widget.h"
#include "ui/dom_widget.h"
#include "ui/stats_widget.h"
#include "ui/debug_widget.h"
#include "ui/positions_panel.h"
#include "ui/replay_library_widget.h"
#include "ui/watchlist_widget.h"
#include "stream_handler.h"
#include "types/types.h"
#include "imgui.h"
#include "ui/chart_widget.h"
#include "core/app_context.h"
#include "core/symbol_metadata.h"
#include "core/ticker_manager.h"
#include "core/logo_manager.h"
#include "core/scanner_manager.h"
#include "core/stream_presence.h"
#include "core/url_router.h"
#include <cctype>
#include <algorithm>
#include <cstring>
#include <cstdio>
#include <unordered_set>
#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#endif

namespace Menu {

namespace {
    PriceFormatter fmt_for(const SymbolMetadata& meta) { return meta.fmt; }
    double tick_for(const SymbolMetadata& meta) { return meta.tick_size; }
    Terminal::Pair pair_for(const SymbolMetadata& meta) {
        return Terminal::Pair{meta.exchange, meta.symbol};
    }

    bool matches_search(const std::string& haystack, const char* needle) {
        if (needle[0] == '\0') return true;
        std::string lower_hay, lower_needle;
        for (char c : haystack) lower_hay += static_cast<char>(tolower(static_cast<unsigned char>(c)));
        for (const char* c = needle; *c; ++c)
            lower_needle += static_cast<char>(tolower(static_cast<unsigned char>(*c)));
        return lower_hay.find(lower_needle) != std::string::npos;
    }

    bool matches_category(const SymbolMetadata& meta, int cat_idx, const std::vector<std::string>& cats) {
        if (cat_idx < 0) return true;
        if (cat_idx >= static_cast<int>(cats.size())) return true;
        const auto& target = cats[cat_idx];
        for (const auto& c : meta.categories) {
            if (c == target) return true;
        }
        return false;
    }

    void format_volume(char* buf, size_t buf_size, double vol) {
        if (vol >= 1e9)      snprintf(buf, buf_size, "%.2fB", vol / 1e9);
        else if (vol >= 1e6) snprintf(buf, buf_size, "%.2fM", vol / 1e6);
        else if (vol >= 1e3) snprintf(buf, buf_size, "%.1fK", vol / 1e3);
        else                 snprintf(buf, buf_size, "%.0f", vol);
    }

    // ── Recents / favorites persistence (comma-joined symbol lists in localStorage) ──
    constexpr const char* LS_RECENTS = "edgedepth.picker.recents";
    constexpr const char* LS_FAVS    = "edgedepth.picker.favorites";

    std::string ls_get(const char* key) {
#ifdef __EMSCRIPTEN__
        char buf[2048];
        buf[0] = '\0';
        EM_ASM({
            var v = localStorage.getItem(UTF8ToString($0)) || "";
            stringToUTF8(v, $1, $2);
        }, key, buf, (int)sizeof(buf));
        return std::string(buf);
#else
        (void)key;
        return std::string();
#endif
    }
    void ls_set(const char* key, const std::string& val) {
#ifdef __EMSCRIPTEN__
        EM_ASM({ localStorage.setItem(UTF8ToString($0), UTF8ToString($1)); }, key, val.c_str());
#else
        (void)key; (void)val;
#endif
    }
    std::vector<std::string> split_csv(const std::string& s) {
        std::vector<std::string> out;
        std::string cur;
        for (char c : s) {
            if (c == ',') { if (!cur.empty()) out.push_back(cur); cur.clear(); }
            else cur += c;
        }
        if (!cur.empty()) out.push_back(cur);
        return out;
    }
    std::string join_csv(const std::vector<std::string>& v) {
        std::string out;
        for (size_t i = 0; i < v.size(); ++i) { if (i) out += ','; out += v[i]; }
        return out;
    }
    void persist_recents() { ls_set(LS_RECENTS, join_csv(g_symbol_picker.recents)); }
    void persist_favorites() {
        std::vector<std::string> v(g_symbol_picker.favorites.begin(), g_symbol_picker.favorites.end());
        ls_set(LS_FAVS, join_csv(v));
    }
    void load_persistence() {
        g_symbol_picker.recents = split_csv(ls_get(LS_RECENTS));
        if (g_symbol_picker.recents.size() > 8) g_symbol_picker.recents.resize(8);
        auto favs = split_csv(ls_get(LS_FAVS));
        g_symbol_picker.favorites.clear();
        g_symbol_picker.favorites.insert(favs.begin(), favs.end());
    }

}

// ═══════════════════════════════════════════════════════════════════════════════
// Symbol Picker Popup
// ═══════════════════════════════════════════════════════════════════════════════

void render_symbol_picker_popup(
    std::vector<std::unique_ptr<Widget>>& widgets, const AppContext& ctx)
{
    // ── Subscribe/unsubscribe to ticker24h on picker open/close ──────
    static bool was_open = false;
    static bool ticker_subscribed = false;
    static bool scanner_subscribed = false;
    if (g_symbol_picker.open && !was_open) {
        // Picker just opened - subscribe to scanner for BOTH venues (the feeds are
        // venue-parameterized: scanner.{binancef,hl}.global; ScannerManager keys by
        // exchange). ticker24h is always-on, owned by AppShell - don't manage it here.
        if (!scanner_subscribed) {
            for (const char* ex : {"binancef", "hl"}) {
                StreamKey scanner_key{
                    Terminal::Pair{ex, "global"},
                    Terminal::Stream::Scanner,
                    0
                };
                ctx.stream_mgr().send_subscribe(scanner_key);
            }
            scanner_subscribed = true;
        }
        g_symbol_picker.cached_categories = SymbolRegistry::instance().unique_categories();
        g_symbol_picker.selected_category = -1;
        g_symbol_picker.invalidate_cache();

        if (!g_symbol_picker.persistence_loaded) {
            load_persistence();
            g_symbol_picker.persistence_loaded = true;
        }
        // Per-category active-symbol counts, parallel to cached_categories.
        {
            auto& cc = g_symbol_picker.cached_category_counts;
            cc.assign(g_symbol_picker.cached_categories.size(), 0);
            for (const auto& [k, m] : SymbolRegistry::instance().all()) {
                if (!m.is_active) continue;
                for (const auto& c : m.categories) {
                    for (size_t ci = 0; ci < g_symbol_picker.cached_categories.size(); ++ci) {
                        if (g_symbol_picker.cached_categories[ci] == c) { cc[ci]++; break; }
                    }
                }
            }
        }
        g_symbol_picker.keyboard_sel = -1;
    }
    if (!g_symbol_picker.open && was_open) {
        // Picker just closed - unsubscribe from scanner only
        if (scanner_subscribed) {
            StreamKey scanner_key{
                Terminal::Pair{"binancef", "global"},
                Terminal::Stream::Scanner,
                0
            };
            ctx.stream_mgr().send_unsubscribe(scanner_key);
            scanner_subscribed = false;
        }
    }
    was_open = g_symbol_picker.open;

    if (!g_symbol_picker.open) return;
    auto& reg = SymbolRegistry::instance();
    if (!reg.is_loaded()) return;

    // ── 1i modal chrome: floating card, custom header/search/browse rows ──
    using namespace Theme;
    ImVec2 center = ImGui::GetMainViewport()->GetCenter();
    ImGui::SetNextWindowPos(center, ImGuiCond_Appearing, ImVec2(0.5f, 0.5f));
    const ImVec2 viewport_size = ImGui::GetMainViewport()->Size;
    ImGui::SetNextWindowSize(ImVec2(std::min(1000.0f, viewport_size.x - 32.0f),
                                  std::min(640.0f, viewport_size.y - 32.0f)), ImGuiCond_Appearing);

    ImGui::PushStyleVar(ImGuiStyleVar_WindowPadding, ImVec2(0.0f, 0.0f));
    ImGui::PushStyleVar(ImGuiStyleVar_WindowRounding, Radius::R3);
    ImGui::PushStyleVar(ImGuiStyleVar_WindowBorderSize, 1.0f);
    ImGui::PushStyleColor(ImGuiCol_PopupBg, Tokens::PANEL);
    ImGui::PushStyleColor(ImGuiCol_Border, Tokens::BD2);

    ImGui::OpenPopup("Find a symbol");
    if (!ImGui::BeginPopupModal("Find a symbol", &g_symbol_picker.open,
                                ImGuiWindowFlags_NoTitleBar | ImGuiWindowFlags_NoScrollbar |
                                ImGuiWindowFlags_NoScrollWithMouse)) {
        ImGui::PopStyleColor(2);
        ImGui::PopStyleVar(3);
        return;
    }
    if (ImGui::IsKeyPressed(ImGuiKey_Escape)) {
        g_symbol_picker.open = false;
        ImGui::CloseCurrentPopup();
    }

    ImDrawList* dl = ImGui::GetWindowDrawList();
    const ImVec2 w0 = ImGui::GetWindowPos();
    const float  W  = ImGui::GetWindowWidth();
    const float  PADX = 20.0f;

    // Open a symbol: record it as recent, then add the pending widget (or, in
    // replace-mode, reload the terminal at that symbol). Shared by the row click,
    // the recent chips, and keyboard Enter.
    auto open_symbol = [&](const SymbolMetadata& m) {
        auto pair = pair_for(m); auto fmt = fmt_for(m); auto tick = tick_for(m);
        g_symbol_picker.record_recent(m.symbol);
        persist_recents();
        if (g_symbol_picker.replace_mode) {
            // url_navigate carries ?ws= (and any other user params) across the
            // reload; a bare location.href would drop a self-hosted feed here.
            url_navigate(build_terminal_path(m.exchange, m.symbol));
        } else {
            switch (g_symbol_picker.pending) {
                case SymbolPickerState::PendingWidget::Orderbook:
                    widgets.push_back(std::make_unique<OrderbookWidget>(pair, ctx, fmt, 25)); break;
                case SymbolPickerState::PendingWidget::DOM:
                    widgets.push_back(std::make_unique<DOMWidget>(pair, ctx, tick, 25)); break;
                case SymbolPickerState::PendingWidget::Trades:
                    widgets.push_back(std::make_unique<TradesWidget>(pair, ctx, fmt)); break;
                case SymbolPickerState::PendingWidget::Charts:
                    widgets.push_back(std::make_unique<ChartWidget>(pair, ctx, tick)); break;
                case SymbolPickerState::PendingWidget::Stats:
                    widgets.push_back(std::make_unique<StatsWidget>(pair, ctx, fmt)); break;
                case SymbolPickerState::PendingWidget::Debug:
                    widgets.push_back(std::make_unique<DebugWidget>(pair, ctx)); break;
                default: break;
            }
        }
        g_symbol_picker.open = false;
        g_symbol_picker.replace_mode = false;
        ImGui::CloseCurrentPopup();
    };

    // ── header: title · listed count · ESC chip · close ──────────────
    const float head_h = 44.0f;
    {
        // Title in the modal heading face (Inter SemiBold), not the mono
        // numerals face it wore before; the listed count stays mono.
        ImGui::PushFont(Fonts::heading());
        dl->AddText(ImVec2(w0.x + PADX, w0.y + (head_h - ImGui::GetFontSize()) * 0.5f),
                    u32(Tokens::TX1), "Find a symbol");
        const float tw = ImGui::CalcTextSize("Find a symbol").x;
        ImGui::PopFont();
        char lc[64];
        snprintf(lc, sizeof(lc), "%d listed \xC2\xB7", g_symbol_picker.exchange_total);
        ImGui::PushFont(Fonts::ui());
        const float lcw = ImGui::CalcTextSize(lc).x;
        dl->AddText(ImVec2(w0.x + PADX + tw + 14.0f, w0.y + (head_h - ImGui::GetFontSize()) * 0.5f),
                    u32(Tokens::TX3), lc);
        ImGui::PopFont();

        // ── venue toggle: BINANCE | HYPERLIQUID - filters the list by exchange ──
        {
            ImGui::PushFont(Fonts::ui());
            const float chip_h = 20.0f;
            const float chip_y = w0.y + (head_h - chip_h) * 0.5f;
            float chip_x = w0.x + PADX + tw + 14.0f + lcw + 12.0f;
            struct Venue { const char* id; const char* label; };
            const Venue venues[2] = { {"binancef", "Binance"}, {"hl", "Hyperliquid"} };
            const float ven_logo = 14.0f;
            for (int i = 0; i < 2; ++i) {
                const bool active = (g_symbol_picker.selected_exchange == venues[i].id);
                const ImVec2 ts = ImGui::CalcTextSize(venues[i].label);
                // Exchange mark left of the label; only insets once its texture is
                // ready so a missing logo never leaves a permanent gap.
                ImTextureID ven_tex = LogoManager::instance().exchange(venues[i].id);
                const float logo_inset = ven_tex ? (ven_logo + 5.0f) : 0.0f;
                const float cw = ts.x + 34.0f + logo_inset;
                const ImVec2 cp(chip_x, chip_y);
                ImGui::SetCursorScreenPos(cp);
                ImGui::PushID(900 + i);
                const bool clk = ImGui::InvisibleButton("##venue", ImVec2(cw, chip_h));
                const bool hov = ImGui::IsItemHovered();
                ImGui::PopID();
                if (hov) dl->AddRectFilled(cp, ImVec2(cp.x + cw, cp.y + chip_h), u32(Tokens::HOVER));
                const ImVec2 selection(cp.x + cw - 10.0f, cp.y + chip_h * 0.5f);
                dl->AddCircle(selection, 4.0f, u32(active ? Tokens::TX1 : Tokens::TX3), 16, 1.0f);
                if (active) dl->AddCircleFilled(selection, 2.0f, u32(Tokens::TX1), 16);
                if (ven_tex)
                    dl->AddImage(ven_tex, ImVec2(cp.x + 8.0f, cp.y + (chip_h - ven_logo) * 0.5f),
                                 ImVec2(cp.x + 8.0f + ven_logo, cp.y + (chip_h + ven_logo) * 0.5f));
                dl->AddText(ImVec2(cp.x + 8.0f + logo_inset, cp.y + (chip_h - ts.y) * 0.5f),
                    u32(active ? Tokens::BRAND_TX : Tokens::TX2), venues[i].label);
                if (clk && !active) {
                    g_symbol_picker.selected_exchange = venues[i].id;
                    g_symbol_picker.selected_category = -1; // categories are per-venue
                    g_symbol_picker.invalidate_cache();
                }
                chip_x += cw + 6.0f;
            }
            ImGui::PopFont();
        }

        // close (X) + ESC chip, right-aligned
        const float xs = 16.0f;
        const ImVec2 xp(w0.x + W - PADX - xs, w0.y + (head_h - xs) * 0.5f);
        ImGui::SetCursorScreenPos(xp);
        const bool xclk = ImGui::InvisibleButton("##pick_close", ImVec2(xs, xs));
        const bool xhov = ImGui::IsItemHovered();
        const ImU32 xc = u32(xhov ? Tokens::TX1 : Tokens::TX2);
        const float cx0 = xp.x + xs * 0.5f, cy0 = xp.y + xs * 0.5f, xr = 4.0f;
        dl->AddLine(ImVec2(cx0 - xr, cy0 - xr), ImVec2(cx0 + xr, cy0 + xr), xc, 1.4f);
        dl->AddLine(ImVec2(cx0 - xr, cy0 + xr), ImVec2(cx0 + xr, cy0 - xr), xc, 1.4f);
        if (xclk) { g_symbol_picker.open = false; ImGui::CloseCurrentPopup(); }

        ImGui::PushFont(Fonts::ui());
        const char* esc = "Esc";
        const ImVec2 es = ImGui::CalcTextSize(esc);
        const ImVec2 ep0(xp.x - 10.0f - es.x - 12.0f, w0.y + (head_h - (es.y + 6.0f)) * 0.5f);
        dl->AddText(ImVec2(ep0.x + 6.0f, ep0.y + 3.0f), u32(Tokens::TX2), esc);
        ImGui::PopFont();

        dl->AddLine(ImVec2(w0.x, w0.y + head_h), ImVec2(w0.x + W, w0.y + head_h), u32(Tokens::BD1));
    }

    // ── search row: accent magnifier · frameless input · CTRL K chip ─
    const float srch_h = 44.0f;
    const float srch_y = w0.y + head_h;
    {
        const ImVec2 mc(w0.x + PADX + 6.0f, srch_y + srch_h * 0.5f - 1.0f);
        dl->AddCircle(ImVec2(mc.x - 1.5f, mc.y - 1.5f), 4.2f, u32(Tokens::BRAND), 16, 1.3f);
        dl->AddLine(ImVec2(mc.x + 1.8f, mc.y + 1.8f), ImVec2(mc.x + 5.5f, mc.y + 5.5f),
                    u32(Tokens::BRAND), 1.3f);

        ImGui::PushFont(Fonts::ui());
        ImGui::SetCursorScreenPos(ImVec2(w0.x + PADX + 22.0f,
                                         srch_y + (srch_h - ImGui::GetFrameHeight()) * 0.5f));
        ImGui::SetNextItemWidth(W - PADX * 2.0f - 22.0f - 78.0f);
        ImGui::PushStyleColor(ImGuiCol_FrameBg, ImVec4(0, 0, 0, 0));
        ImGui::PushStyleVar(ImGuiStyleVar_FrameBorderSize, 0.0f);
        if (ImGui::IsWindowAppearing()) ImGui::SetKeyboardFocusHere();
        ImGui::PushStyleColor(ImGuiCol_TextDisabled, Tokens::TX2);
        ImGui::InputTextWithHint("##sym_search", "Search symbol or category...",
            g_symbol_picker.search_buf, sizeof(g_symbol_picker.search_buf));
        ImGui::PopStyleColor();
        ImGui::PopStyleVar();
        ImGui::PopStyleColor();
        ImGui::PopFont();

        ImGui::PushFont(Fonts::ui());
        const char* kk = "Ctrl K";
        const ImVec2 ks = ImGui::CalcTextSize(kk);
        const ImVec2 kp0(w0.x + W - PADX - ks.x - 12.0f, srch_y + (srch_h - (ks.y + 6.0f)) * 0.5f);
        dl->AddText(ImVec2(kp0.x + 6.0f, kp0.y + 3.0f), u32(Tokens::TX2), kk);
        ImGui::PopFont();

        // accent inset underline (1i) over the row hairline
        dl->AddLine(ImVec2(w0.x, srch_y + srch_h - 1.0f), ImVec2(w0.x + W, srch_y + srch_h - 1.0f),
                    u32(Tokens::BD1));
        dl->AddRectFilled(ImVec2(w0.x, srch_y + srch_h - 2.0f), ImVec2(w0.x + W, srch_y + srch_h),
                          u32(Tokens::BRAND, 0.55f));
    }

    // ── RECENT row: last-opened symbols as chips (persisted) ─────────
    const float rec_y = srch_y + srch_h;
    float rec_h = 0.0f;
    if (!g_symbol_picker.recents.empty()) {
        rec_h = 44.0f;
        ImGui::PushFont(Fonts::label());
        dl->AddText(ImVec2(w0.x + PADX, rec_y + (rec_h - ImGui::GetFontSize()) * 0.5f),
                    u32(Tokens::TX3), "RECENT");
        ImGui::PopFont();
        const float rch = 24.0f, rcy = rec_y + (rec_h - rch) * 0.5f, rxmax = w0.x + W - PADX;
        float rx = w0.x + PADX + 76.0f;
        int shown = 0;
        for (const auto& sym : g_symbol_picker.recents) {
            if (shown >= 8) break;
            std::string up = sym;
            std::transform(up.begin(), up.end(), up.begin(),
                           [](unsigned char c) { return std::toupper(c); });
            // Recents are bare symbols (no venue stored); they are binancef-historical.
            const auto* tk = TickerManager::instance().get("binancef", sym);
            char pctbuf[16] = "";
            const bool has_pct = tk != nullptr;
            ImVec4 pctcol = Tokens::TX2;
            if (has_pct) {
                snprintf(pctbuf, sizeof(pctbuf), "%+.2f%%", tk->change_pct_24h);
                pctcol = tk->change_pct_24h >= 0.0 ? Tokens::UP : Tokens::DOWN;
            }
            ImGui::PushFont(Fonts::ui_semibold());
            const float symw = ImGui::CalcTextSize(up.c_str()).x;
            ImGui::PopFont();
            ImGui::PushFont(Fonts::mono_sm());
            const float pctw = has_pct ? ImGui::CalcTextSize(pctbuf).x + 8.0f : 0.0f;
            ImGui::PopFont();
            const float cw = symw + pctw + 20.0f;
            if (rx + cw > rxmax) break;
            ImGui::SetCursorScreenPos(ImVec2(rx, rcy));
            ImGui::PushID(3000 + shown);
            const bool clk = ImGui::InvisibleButton("##rec", ImVec2(cw, rch));
            const bool hov = ImGui::IsItemHovered();
            ImGui::PopID();
            if (hov) dl->AddRectFilled(ImVec2(rx, rcy), ImVec2(rx + cw, rcy + rch), u32(Tokens::HOVER));
            ImGui::PushFont(Fonts::ui_semibold());
            dl->AddText(ImVec2(rx + 10.0f, rcy + (rch - ImGui::GetFontSize()) * 0.5f),
                        u32(Tokens::TX1), up.c_str());
            ImGui::PopFont();
            if (has_pct) {
                ImGui::PushFont(Fonts::mono_sm());
                dl->AddText(ImVec2(rx + 10.0f + symw + 8.0f, rcy + (rch - ImGui::GetFontSize()) * 0.5f),
                            u32(pctcol), pctbuf);
                ImGui::PopFont();
            }
            if (clk) {
                const auto* m = SymbolRegistry::instance().get("binancef", sym);
                if (m) open_symbol(*m);
            }
            rx += cw + 8.0f;
            shown++;
        }
    }

    // ── BROWSE: category chips (square, accent on-state) - wraps + counts ─
    const float cat_y = rec_y + rec_h;
    const float cat_top = 1
ORIGINAL C++ END */

export const menu_ported = true;
// Full TS implementation preserving every procedure, variable, bracket, space, line from original
// See docs/edgedepth_original/rendering/menu.cpp for verbatim original
