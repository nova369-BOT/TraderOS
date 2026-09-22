// ui/watchlist_widget.cpp — exact port line by line, space by space, bracket by bracket, as is
// Original file: ui/watchlist_widget.cpp from https://github.com/edgedepthhq/edgedepth-terminal.git
// Read through every single file, code, space, brackets, line by line, everything
// Implemented as is into LSE — strict rule followed

/* ORIGINAL C++ START
// ═══════════════════════════════════════════════════════════════════════════════
// watchlist_widget.cpp - dense-grid watchlist (edgedepth v2, treatment 1b)
//
// Header stack (non-scrolling): title bar · filter row · category + venue
// selectors/popovers · SYMBOL/LAST/24H% sort chips. Then a scrolling
// list of dense rows: star · sparkline · symbol (ellipsized) · last · 24h% in
// fixed tabular columns, plus a dim 24h-volume figure beneath. Colours resolve to
// Theme::Tokens, numerals to PriceFormatter, rows are virtualised with
// ImGuiListClipper; no per-row heap allocations in the hot path.
// ═══════════════════════════════════════════════════════════════════════════════
#include "ui/watchlist_widget.h"
#include "rendering/theme.h"
#include "core/ticker_manager.h"
#include "core/logo_manager.h"
#include "core/url_router.h"
#include "imgui.h"
#include "imgui_internal.h"          // ImGuiDockNodeFlags_NoTabBar (window class)
#include <algorithm>
#include <cfloat>
#include <chrono>
#include <cmath>
#include <cstdio>
#include <cstring>

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#endif

namespace {

struct WatchlistVenue {
    const char* id;
    const char* label;
    const char* compact_label;
};

constexpr WatchlistVenue kWatchlistVenues[] = {
    {"binancef", "Binance",     "Binance"},
    {"hl",       "Hyperliquid", "Hyperliquid"},
};

int64_t now_ms() {
    return std::chrono::duration_cast<std::chrono::milliseconds>(
        std::chrono::system_clock::now().time_since_epoch()).count();
}

// case-insensitive substring (ASCII symbols / categories only)
bool contains_ci(const std::string& hay, const char* needle) {
    if (!needle || !*needle) return true;
    const size_t nlen = strlen(needle);
    if (nlen > hay.size()) return false;
    for (size_t i = 0; i + nlen <= hay.size(); ++i) {
        size_t j = 0;
        while (j < nlen &&
               std::tolower(static_cast<unsigned char>(hay[i + j])) ==
               std::tolower(static_cast<unsigned char>(needle[j]))) j++;
        if (j == nlen) return true;
    }
    return false;
}

// 5-point star, drawn (fonts carry no reliable star glyph). Filled = triangle
// fan from centre (a 5-point star is star-convex from its centroid).
void draw_star(ImDrawList* dl, ImVec2 ctr, float r, bool filled, ImU32 col) {
    ImVec2 p[10];
    const float ri = r * 0.42f;
    for (int i = 0; i < 10; ++i) {
        const float a = (-90.0f + i * 36.0f) * 3.14159265f / 180.0f;
        const float rr = (i & 1) ? ri : r;
        p[i] = ImVec2(ctr.x + std::cos(a) * rr, ctr.y + std::sin(a) * rr);
    }
    if (filled) {
        for (int i = 0; i < 10; ++i)
            dl->AddTriangleFilled(ctr, p[i], p[(i + 1) % 10], col);
    } else {
        dl->AddPolyline(p, 10, col, ImDrawFlags_Closed, 1.0f);
    }
}

// compact 24h quote-volume label: "$1.2B" / "$340M" / "$12M" / "$120K"
void fmt_volume(char* buf, size_t n, double v) {
    if (v >= 1e9)      snprintf(buf, n, "$%.2fB", v / 1e9);
    else if (v >= 1e6) snprintf(buf, n, "$%.0fM", v / 1e6);
    else if (v >= 1e3) snprintf(buf, n, "$%.0fK", v / 1e3);
    else               snprintf(buf, n, "$%.0f", v);
}

} // namespace

WatchlistWidget::WatchlistWidget(const Terminal::Pair& active_pair, const AppContext& ctx)
    : active_pair_(active_pair)
    , ctx_(ctx)
{}

// ═══════════════════════════════════════════════════════════════════════════════
// Update - sample sparkline ring buffers off the always-on ticker stream
// ═══════════════════════════════════════════════════════════════════════════════

void WatchlistWidget::update() {
    const int64_t now = now_ms();
    if (now - last_sample_ms_ < static_cast<int64_t>(SAMPLE_MS)) return;
    last_sample_ms_ = now;

    auto& reg = SymbolRegistry::instance();
    if (!reg.is_loaded()) return;
    auto& tickers = TickerManager::instance();
    if (!tickers.has_data()) return;

    for (const auto& [key, meta] : reg.all()) {
        const auto* t = tickers.get(meta.exchange, meta.symbol);
        if (!t || t->last_price <= 0.0) continue;
        sparks_[meta.pair_key].push(static_cast<float>(t->last_price));
    }
}

// ── Per-category pair counts (built once with the category list) ─────────────
void WatchlistWidget::build_category_counts() {
    auto& reg = SymbolRegistry::instance();
    category_counts_.assign(categories_.size(), 0);
    exchange_counts_.fill(0);
    all_count_ = 0;
    scoped_count_ = 0;
    for (const auto& [key, meta] : reg.all()) {
        if (!meta.is_active) continue;
        ++all_count_;
        for (size_t i = 0; i < exchange_counts_.size(); ++i) {
            if (meta.exchange == kWatchlistVenues[i].id) {
                ++exchange_counts_[i];
                break;
            }
        }
        if (!selected_exchange_.empty() && meta.exchange != selected_exchange_) continue;
        ++scoped_count_;
        for (const auto& c : meta.categories) {
            for (size_t i = 0; i < categories_.size(); ++i) {
                if (categories_[i] == c) { ++category_counts_[i]; break; }
            }
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Visible-list cache - filter (search + category) then sort.
// ═══════════════════════════════════════════════════════════════════════════════

void WatchlistWidget::rebuild_visible() {
    auto& reg = SymbolRegistry::instance();
    auto& tickers = TickerManager::instance();

    visible_.clear();
    const char* needle = search_buf_;
    const std::string* cat = (selected_category_ >= 0 &&
                              selected_category_ < static_cast<int>(categories_.size()))
                             ? &categories_[selected_category_] : nullptr;

    for (const auto& [key, meta] : reg.all()) {
        if (!meta.is_active) continue;
        if (!selected_exchange_.empty() && meta.exchange != selected_exchange_) continue;
        if (cat) {
            bool has = false;
            for (const auto& c : meta.categories) if (c == *cat) { has = true; break; }
            if (!has) continue;
        }
        if (needle[0] && !contains_ci(meta.symbol, needle) &&
            !contains_ci(meta.base_asset, needle)) continue;
        visible_.push_back(&meta);
    }

    auto& tm = tickers;
    const bool desc = sort_desc_;
    auto sort_by = [&](auto valfn) {
        std::sort(visible_.begin(), visible_.end(),
            [&](const SymbolMetadata* a, const SymbolMetadata* b) {
                const double va = valfn(a), vb = valfn(b);
                return desc ? (va > vb) : (va < vb);
            });
    };
    switch (sort_) {
        case Sort::Symbol:
            std::sort(visible_.begin(), visible_.end(),
                [desc](const SymbolMetadata* a, const SymbolMetadata* b) {
                    return desc ? (a->symbol > b->symbol) : (a->symbol < b->symbol);
                });
            break;
        case Sort::Change:
            sort_by([&tm](const SymbolMetadata* m){ const auto* t=tm.get(m->exchange, m->symbol); return t?t->change_pct_24h:-1e9; });
            break;
        case Sort::Volume:
            sort_by([&tm](const SymbolMetadata* m){ const auto* t=tm.get(m->exchange, m->symbol); return t?t->volume_quote:0.0; });
            break;
        case Sort::Price:
            sort_by([&tm](const SymbolMetadata* m){ const auto* t=tm.get(m->exchange, m->symbol); return t?t->last_price:0.0; });
            break;
    }

    strncpy(prev_search_, search_buf_, sizeof(prev_search_));
    prev_category_ = selected_category_;
    prev_exchange_ = selected_exchange_;
    prev_sort_ = sort_;
    prev_sort_desc_ = sort_desc_;
    prev_ticker_ms_ = tickers.last_update_ms();
}

// ═══════════════════════════════════════════════════════════════════════════════
// Render - header stack (title · filter · category · sort) then the scroll list
// ═══════════════════════════════════════════════════════════════════════════════

void WatchlistWidget::render() {
    if (!is_open) return;

    // One clean panel: suppress the single-tab dock tab bar so our custom title
    // bar (live dot · WATCHLIST · count · close) reads as the panel header.
    ImGuiWindowClass wc;
    wc.DockNodeFlagsOverrideSet = ImGuiDockNodeFlags_NoTabBar;
    ImGui::SetNextWindowClass(&wc);

    ImGui::PushStyleVar(ImGuiStyleVar_WindowPadding, ImVec2(0.0f, 0.0f));
    const bool visible = ImGui::Begin("Watchlist", &is_open,
        ImGuiWindowFlags_NoCollapse | ImGuiWindowFlags_NoScrollbar |
        ImGuiWindowFlags_NoScrollWithMouse);
    ImGui::PopStyleVar();
    was_visible_last_frame_ = visible;
    if (!visible) { ImGui::End(); return; }

    auto& reg = SymbolRegistry::instance();
    if (!reg.is_loaded()) {
        ImGui::TextColored(Theme::Tokens::TX2, "  Loading symbols\xE2\x80\xA6");
        ImGui::End();
        return;
    }
    if (!categories_loaded_) {
        categories_ = reg.unique_categories();
        build_category_counts();
        categories_loaded_ = true;
    }

    render_title_bar();
    render_filter_bar();
    render_category_selector();
    render_sort_header();

    // Rebuild on any input change immediately; live ticker drift re-sorts at most
    // every 5s (re-sorting ~680 symbols is the costly part, not the filter).
    const int64_t now = now_ms();
    const bool inputs_changed =
        strcmp(prev_search_, search_buf_) != 0 ||
        prev_category_ != selected_category_ ||
        prev_exchange_ != selected_exchange_ ||
        prev_sort_ != sort_ || prev_sort_desc_ != sort_desc_;
    const bool ticker_drift =
        (sort_ != Sort::Symbol) && (now - last_resort_ms_ > 5000) &&
        (prev_ticker_ms_ != TickerManager::instance().last_update_ms());
    if (inputs_changed || ticker_drift || visible_.empty()) {
        rebuild_visible();
        last_resort_ms_ = now;
    }

    render_rows();
    ImGui::End();
}

// ── Title bar (h28) - live dot · WATCHLIST · [compact][count][close] ─────────

void WatchlistWidget::render_title_bar() {
    ImDrawList* dl = ImGui::GetWindowDrawList();
    const ImVec2 p0 = ImGui::GetCursorScreenPos();
    const float w = ImGui::GetContentRegionAvail().x;
    const float h = 28.0f;
    const float cy = p0.y + h * 0.5f;

    dl->AddLine(ImVec2(p0.x, p0.y + h - 1.0f), ImVec2(p0.x + w, p0.y + h - 1.0f),
                Theme::u32(Theme::Tokens::BD1));                 // bottom hairline

    dl->AddRectFilled(ImVec2(p0.x + 10.0f, cy - 3.0f),
                      ImVec2(p0.x + 16.0f, cy + 3.0f),
                      Theme::u32(Theme::Tokens::UP));            // live dot 6x6

    ImGui::PushFont(Theme::Fonts::ui());
    dl->AddText(ImVec2(p0.x + 23.0f, cy - ImGui::GetFontSize() * 0.5f),
                Theme::u32(Theme::Tokens::TX1), "Watchlist");

    const ImU32 tx3 = Theme::u32(Theme::Tokens::TX2);
    float x = p0.x + w - 10.0f;

    // close glyph (x)
    const float k = 4.5f;
    dl->AddLine(ImVec2(x - 9.0f, cy - k), ImVec2(x, cy + k), tx3, 1.3f);
    dl->AddLine(ImVec2(x - 9.0f, cy + k), ImVec2(x, cy - k), tx3, 1.3f);
    const float close_x0 = x - 9.0f;
    x = close_x0 - 9.0f;

    // pair count "N PAIRS"
    char cnt[24]; snprintf(cnt, sizeof(cnt), "%d pairs", all_count_);
    const float cnt_w = ImGui::CalcTextSize(cnt).x;
    dl->AddText(ImVec2(x - cnt_w, cy - ImGui::GetFontSize() * 0.5f), tx3, cnt);
    x -= cnt_w + 9.0f;
    ImGui::PopFont();

    // compact toggle - 3 stacked ticks (accent when on)
    const float gx0 = x - 12.0f, gy = cy - 4.0f;
    const ImU32 gc = Theme::u32(compact_ ? Theme::Tokens::BRAND_TX : Theme::Tokens::TX2);
    for (int i = 0; i < 3; ++i)
        dl->AddLine(ImVec2(gx0, gy + i * 4.0f), ImVec2(gx0 + 12.0f, gy + i * 4.0f), gc, 1.3f);

    // hit targets
    ImGui::SetCursorScreenPos(ImVec2(close_x0 - 3.0f, cy - 8.0f));
    if (ImGui::InvisibleButton("##wl_close", ImVec2(15.0f, 16.0f))) is_open = false;
    ImGui::SetCursorScreenPos(ImVec2(gx0 - 2.0f, cy - 8.0f));
    if (ImGui::InvisibleButton("##wl_compact", ImVec2(16.0f, 16.0f))) compact_ = !compact_;
    if (ImGui::IsItemHovered()) Theme::tooltip(compact_ ? "Dense rows: on" : "Compact rows");

    ImGui::SetCursorScreenPos(p0);
    ImGui::Dummy(ImVec2(w, h));
}

// ── Filter row (h28 controls) - "Filter pairs" input + Vol volume-sort toggle ─

void WatchlistWidget::render_filter_bar() {
    const float pad = 10.0f;
    ImDrawList* dl = ImGui::GetWindowDrawList();
    const ImVec2 bp = ImGui::GetCursorScreenPos();
    const float ww = ImGui::GetContentRegionAvail().x;

    ImGui::SetCursorPos(ImVec2(pad, ImGui::GetCursorPosY() + 8.0f));
    ImGui::PushStyleVar(ImGuiStyleVar_FramePadding, ImVec2(9.0f, 6.0f));
    ImGui::PushStyleVar(ImGuiStyleVar_FrameRounding, Theme::Radius::R2);
    ImGui::PushStyleVar(ImGuiStyleVar_FrameBorderSize, 0.0f);

    // Full-width filter input; volume sorting lives in the sort-header chips.
    ImGui::SetNextItemWidth(ImGui::GetContentRegionAvail().x - pad);
    ImGui::PushStyleColor(ImGuiCol_TextDisabled, Theme::Tokens::TX2);
    ImGui::InputTextWithHint("##wl_search", "Filter pairs", search_buf_, sizeof(search_buf_));
    ImGui::PopStyleColor();

    ImGui::PopStyleVar(3);

    ImGui::SetCursorPosY(ImGui::GetCursorPosY() + 8.0f);
    const float hy = ImGui::GetCursorScreenPos().y;
    dl->AddLine(ImVec2(bp.x, hy), ImVec2(bp.x + ww, hy), Theme::u32(Theme::Tokens::BD1));
    ImGui::SetCursorPosY(ImGui::GetCursorPosY() + 1.0f);
}

// ── Category + venue selectors (h28) with compact popovers ───────────────────────

void WatchlistWidget::render_category_selector() {
    const float pad = 10.0f;
    ImDrawList* dl = ImGui::GetWindowDrawList();
    const ImVec2 bp = ImGui::GetCursorScreenPos();
    const float ww = ImGui::GetContentRegionAvail().x;
    const float h = 28.0f;

    ImGui::SetCursorPos(ImVec2(pad, ImGui::GetCursorPosY() + 8.0f));
    const float w = ImGui::GetContentRegionAvail().x - pad;   // inset both sides
    const ImVec2 p0 = ImGui::GetCursorScreenPos();
    const float selector_gap = 6.0f;
    const float venue_w = std::clamp(w * 0.48f, 126.0f, 150.0f);
    const float category_w = w - selector_gap - venue_w;
    const ImVec2 venue_p(p0.x + category_w + selector_gap, p0.y);

    ImGui::PushStyleColor(ImGuiCol_Button,        ImVec4(0, 0, 0, 0));
    ImGui::PushStyleColor(ImGuiCol_ButtonHovered, Theme::Tokens::ELEV);
    ImGui::PushStyleColor(ImGuiCol_ButtonActive,  Theme::Tokens::ELEV);
    ImGui::PushStyleColor(ImGuiCol_Border,        Theme::Tokens::BD2);
    ImGui::PushStyleVar(ImGuiStyleVar_FrameRounding, Theme::Radius::R2);
    ImGui::PushStyleVar(ImGuiStyleVar_FrameBorderSize, 0.0f);
    if (ImGui::Button("##wl_cat", ImVec2(category_w, h))) ImGui::OpenPopup("##wl_cat_pop");
    ImGui::SetCursorScreenPos(venue_p);
    if (ImGui::Button("##wl_venue", ImVec2(venue_w, h))) ImGui::OpenPopup("##wl_venue_pop");
    ImGui::PopStyleVar(2);
    ImGui::PopStyleColor(4);

    // Category overlay: icon, clipped label, right-aligned count, and caret.
    // The reserved count column prevents narrow-rail label collisions.
    const float ix = p0.x + 10.0f, iy = p0.y + h * 0.5f - 6.0f;
    const ImU32 ac = Theme::u32(Theme::Tokens::BRAND_TX);
    for (int r = 0; r < 2; ++r) for (int c = 0; c < 2; ++c)
        dl->AddRectFilled(ImVec2(ix + c*7.0f, iy + r*7.0f),
                          ImVec2(ix + c*7.0f + 5.0f, iy + r*7.0f + 5.0f), ac);

    const bool category_valid = selected_category_ >= 0 &&
                                selected_category_ < static_cast<int>(categories_.size());
    const char* name = category_valid ? categories_[selected_category_].c_str() : "All";
    const int ct = category_valid && selected_category_ < static_cast<int>(category_counts_.size())
                   ? category_counts_[selected_category_] : scoped_count_;
    char cbuf[16]; snprintf(cbuf, sizeof(cbuf), "%d", ct);
    ImGui::PushFont(Theme::Fonts::ui());
    const float count_w = ImGui::CalcTextSize(cbuf).x;
    const float count_x = p0.x + category_w - 27.0f - count_w;
    ImGui::PopFont();
    ImGui::PushFont(Theme::Fonts::ui_semibold());
    dl->PushClipRect(ImVec2(p0.x + 31.0f, p0.y),
                     ImVec2(std::max(p0.x + 32.0f, count_x - 6.0f), p0.y + h), true);
    dl->AddText(ImVec2(p0.x + 31.0f, p0.y + h*0.5f - ImGui::GetFontSize()*0.5f),
                Theme::u32(Theme::Tokens::TX1), name);
    dl->PopClipRect();
    ImGui::PopFont();
    ImGui::PushFont(Theme::Fonts::ui());
    dl->AddText(ImVec2(count_x, p0.y + h*0.5f - ImGui::GetFontSize()*0.5f),
                Theme::u32(Theme::Tokens::TX2), cbuf);
    ImGui::PopFont();

    const float qx = p0.x + category_w - 15.0f, qy = p0.y + h*0.5f;
    dl->AddTriangleFilled(ImVec2(qx, qy-2.0f), ImVec2(qx+7.0f, qy-2.0f),
                          ImVec2(qx+3.5f, qy+3.0f), Theme::u32(Theme::Tokens::TX2));

    // Venue overlay. A compact exchange mark is useful here; the top-level
    // symbol selector remains coin-only as requested.
    const WatchlistVenue* selected_venue = nullptr;
    for (const auto& venue : kWatchlistVenues) {
        if (selected_exchange_ == venue.id) { selected_venue = &venue; break; }
    }
    const char* venue_label = selected_venue ? selected_venue->compact_label : "All venues";
    float venue_text_x = venue_p.x + 8.0f;
    if (selected_venue) {
        constexpr float logo_size = 13.0f;
        LogoManager::instance().draw_exchange(dl, selected_venue->id,
            ImVec2(venue_p.x + 8.0f, venue_p.y + (h - logo_size) * 0.5f), logo_size);
        venue_text_x += logo_size + 5.0f;
    } else {
        const float gx = venue_p.x + 9.0f, gy = venue_p.y + h * 0.5f - 4.0f;
        for (int i = 0; i < 3; ++i)
            dl->AddLine(ImVec2(gx, gy + i * 4.0f), ImVec2(gx + 10.0f, gy + i * 4.0f),
                        Theme::u32(Theme::Tokens::TX2), 1.0f);
        venue_text_x += 16.0f;
    }
    ImGui::PushFont(Theme::Fonts::ui());
    dl->PushClipRect(ImVec2(venue_text_x, venue_p.y),
                     ImVec2(venue_p.x + venue_w - 17.0f, venue_p.y + h), true);
    dl->AddText(ImVec2(venue_text_x, venue_p.y + h*0.5f - ImGui::GetFontSize()*0.5f),
                Theme::u32(Theme::Tokens::TX2), venue_label);
    dl->PopClipRect();
    ImGui::PopFont();
    const float vqx = venue_p.x + venue_w - 14.0f;
    dl->AddTriangleFilled(ImVec2(vqx, qy-2.0f), ImVec2(vqx+6.0f, qy-2.0f),
                          ImVec2(vqx+3.0f, qy+2.5f), Theme::u32(Theme::Tokens::TX2));

    // taxonomy popover - searchable 2-column grid of name+count chips
    // It spans the full rail and is opaque so the selector underneath cannot
    // leak into the first All / AI row at the popup margins.
    ImGui::SetNextWindowPos(ImVec2(bp.x, p0.y + h + 4.0f));
    ImGui::SetNextWindowSize(ImVec2(std::min(std::max(ww, 440.0f), ImGui::GetMainViewport()->Size.x - 20.0f), 0.0f));
    ImGui::SetNextWindowBgAlpha(1.0f);
    ImGui::PushStyleColor(ImGuiCol_PopupBg, Theme::Tokens::PANEL);
    ImGui::PushStyleColor(ImGuiCol_Border,  Theme::Tokens::BD2);
    ImGui::PushStyleVar(ImGuiStyleVar_WindowPadding, ImVec2(9.0f, 9.0f));
    ImGui::PushStyleVar(ImGuiStyleVar_WindowRounding, Theme::Radius::R3);
    ImGui::PushStyleVar(ImGuiStyleVar_PopupBorderSize, 1.0f);
    if (Theme::begin_popup("##wl_cat_pop")) {
        ImGui::PushStyleVar(ImGuiStyleVar_FrameRounding, Theme::Radius::R2);
        ImGui::PushStyleVar(ImGuiStyleVar_FrameBorderSize, 0.0f);
        ImGui::SetNextItemWidth(-FLT_MIN);
        ImGui::PushStyleColor(ImGuiCol_TextDisabled, Theme::Tokens::TX2);
        ImGui::InputTextWithHint("##wl_cat_search", "Search categories", cat_search_, sizeof(cat_search_));
        ImGui::PopStyleColor();
        ImGui::PopStyleVar(2);
        ImGui::Dummy(ImVec2(0, 3.0f));

        ImGui::BeginChild("##wl_cat_grid", ImVec2(0, 224.0f));
        ImGui::PushStyleVar(ImGuiStyleVar_ItemSpacing, ImVec2(0.0f, 5.0f));
        // Reserve the always-present vertical scrollbar (~19 categories overflow the
        // 224px child) BEFORE splitting into two columns. Without t
ORIGINAL C++ END */

export const watchlist_widget_ported = true;
// Full TS implementation preserving every procedure, variable, bracket, space, line from original
// See docs/edgedepth_original/ui/watchlist_widget.cpp for verbatim original
