// rendering/liq_field_texture_renderer.cpp — exact port line by line, space by space, bracket by bracket, as is
// Original file: rendering/liq_field_texture_renderer.cpp from https://github.com/edgedepthhq/edgedepth-terminal.git
// Read through every single file, code, space, brackets, line by line, everything
// Implemented as is into LSE — strict rule followed

/* ORIGINAL C++ START
#include "liq_field_texture_renderer.h"

#include <algorithm>
#include <cstdio>
#include <cstring>

#include "imgui.h"
#include "implot.h"
#include "core/heatmap_colormap.h"

// ═══════════════════════════════════════════════════════════════════════════
// Shaders - GLSL ES 3.0. The fragment shader is the whole point of WS2:
// sample R8 (pre-gamma tl) → gamma → noise floor → LUT → design alpha curve,
// with the forward cascade computed procedurally right of the live-edge seam.
// ═══════════════════════════════════════════════════════════════════════════

static const char* kLiqFieldVS = R"(#version 300 es
// Bufferless fullscreen triangle (same trick as ShaderHeatmapResources).
void main() {
    vec2 pos = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
    gl_Position = vec4(pos * 2.0 - 1.0, 0.0, 1.0);
}
)";

static const char* kLiqFieldFS = R"(#version 300 es
precision highp float;
precision highp int;

uniform sampler2D u_field;     // R8 WxH: x = candle column, y = log-price row; PRE-gamma tl
uniform sampler2D u_standing;  // R8 1xH: standing tl per row, live carve applied (cascade)
uniform sampler2D u_colormap;  // 256x1 RGBA8 - RGB only; alpha is computed here

uniform vec2  u_plot_origin;   // plot bottom-left, GL framebuffer px
uniform vec2  u_plot_size;     // plot size, GL framebuffer px
uniform float u_view_col_min;  // viewport left/right edges in texture-column coords
uniform float u_view_col_max;
uniform float u_view_price_min;
uniform float u_view_price_max;
uniform float u_inv_lbw;       // 1 / log-price bucket width
uniform float u_row0;          // bucket index of row 0 (row r holds bucket u_row0 + r)
uniform float u_tex_w;
uniform float u_tex_h;
uniform float u_live_col;      // CURRENT live column index (may be raster live + 1)
uniform float u_seam_u;        // live edge (seam) position in plot-uv x
uniform int   u_extend;        // 1 = cascade length ∝ strength; 0 = fixed magnet
uniform float u_magnet_frac;   // cascade length fraction of (right − seam) when !u_extend
uniform float u_max_projection_frac; // maximum cascade length fraction of (right - seam)
uniform float u_gamma;         // live style knobs - no texture re-upload on change
uniform float u_floor;
uniform float u_alpha_floor;
uniform float u_alpha_pow;
uniform float u_opacity;
uniform float u_cascade_alpha; // ×0.78 vs history (design `cascade`)
uniform float u_fade_frac;     // LINEAR fade over the final 12% of the projection
uniform float u_min_row_px;    // rect-path emit_rect row clamp (min painted row px)

out vec4 fragColor;

// Row-COVERAGE sampling (round 3 - the "tidy" fix). LINEAR filtering read as
// mush: a lone row's value bell-curved away from its center, so thin rows
// rendered dimmer/thinner than the rect path's hard full-alpha slabs and the
// cascade rows blurred together. Instead: fetch the ±2 nearest rows exactly
// (texelFetch) and let each PAINT over the fragment the way emit_rect did -
// full strength inside max(native+1px, u_min_row_px px) about its center,
// with only a 0.5px smoothstep feather at the boundary (the design feather).
// Returns vec2(value, coverage). Coverage modulates ALPHA only - the colour
// keeps the row's true LUT hue, exactly like the rect path's hard edges.
vec2 row_cover(sampler2D tex, int c, float rc, float row_px) {
    float h_px = max(0.5 * (row_px + 1.0), 0.5 * u_min_row_px);
    int r0 = int(floor(rc + 0.5));
    float best_v = 0.0, best_cov = 0.0, best_s = 0.0;
    for (int dr = -2; dr <= 2; ++dr) {
        int r = r0 + dr;
        if (r < 0 || r >= int(u_tex_h)) continue;
        float v = texelFetch(tex, ivec2(c, r), 0).r;
        if (v <= 0.0) continue;
        float d_px = abs(rc - float(r)) * row_px;   // distance from row center, px
        float cov = 1.0 - smoothstep(h_px - 0.5, h_px + 0.5, d_px);
        float s = v * cov;
        if (s > best_s) { best_s = s; best_v = v; best_cov = cov; }
    }
    return vec2(best_v, best_cov);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - u_plot_origin) / u_plot_size;
    float price = mix(u_view_price_min, u_view_price_max, uv.y);
    // Continuous row coordinate on the ABSOLUTE log grid: texel r center at
    // rc == r. log() is guarded so rc + its derivative are defined for EVERY
    // fragment BEFORE the first discard (derivative correctness), then the
    // price <= 0 fragments (zoomed-out linear axis under-range) are dropped.
    float rc = log(max(price, 1.0e-30)) * u_inv_lbw - u_row0;
    float rspan = fwidth(rc);   // rows per fragment (fragment price span in rows)
    if (price <= 0.0) discard;
    if (rc < -0.5 || rc > u_tex_h - 0.5) discard;
    float row_px = 1.0 / max(rspan, 1.0e-4);     // pixels per price row at this zoom

    vec2 vc;                    // (row value, row coverage)
    float cascade_mul = 1.0;
    if (uv.x > u_seam_u) {
        // ── Forward CASCADE: procedural projection of the standing fuel ──
        vc = row_cover(u_standing, 0, rc, row_px);
        float tvs = pow(clamp(vc.x, 0.0, 1.0), u_gamma);
        if (tvs < u_floor) discard;              // carved/empty rows cast nothing
        float rel = (uv.x - u_seam_u) / max(1.0 - u_seam_u, 1.0e-4);
        float len = (u_extend == 1)
            ? u_max_projection_frac * (0.15 + 0.85 * tvs)  // strength proportional to length
            : u_magnet_frac;                                // fixed forward magnet
        float ft = rel / max(len, 1.0e-4);
        if (ft > 1.0) discard;
        // Design target: flat, then LINEAR fade over the final u_fade_frac of len -
        // this retires the interim stepped tail (88/95/100% × 100/55/28%).
        float fade = (ft <= 1.0 - u_fade_frac) ? 1.0 : (1.0 - ft) / u_fade_frac;
        cascade_mul = u_cascade_alpha * fade;
    } else {
        // ── History + live column ──
        float col_f = mix(u_view_col_min, u_view_col_max, uv.x);
        // Columns per fragment - ANALYTIC (col_f is linear in gl_FragCoord.x),
        // no fwidth needed, so it's exact and control-flow-safe.
        float cpp = (u_view_col_max - u_view_col_min) / u_plot_size.x;
        float half_c = 0.5 * max(cpp, 0.0);
        if (col_f + half_c < -0.5 || col_f - half_c > u_live_col + 0.5) discard;
        int c_last = min(int(floor(u_live_col + 0.5)), int(u_tex_w) - 1);
        if (cpp <= 1.0) {
            // Zoomed in (≥1px per candle): column snaps to its texel - no
            // horizontal smear across the deposit/consume boundaries, the
            // no-overlap edges stay crisp.
            int c = clamp(int(floor(col_f + 0.5)), 0, int(u_tex_w) - 1);
            if (float(c) > u_live_col + 0.5) discard;
            vc = row_cover(u_field, c, rc, row_px);
        } else {
            // Extreme zoom-out (sub-pixel candles): point sampling would skip
            // columns and SHIMMER during scroll (the WS2 wiggle risk). Instead
            // take the MAX over the fragment's column footprint - "brightest
            // fuel in this pixel", the same painter semantics as the rows.
            // Taps sit on a stride grid anchored to ABSOLUTE column indices
            // (not the fragment), so the sampled set is scroll-invariant and
            // the field stays pinned. ≤8 taps; stride grows past 8 cols/px.
            int k = max(1, int(ceil(cpp / 8.0)));
            int cf_lo = int(floor(col_f - half_c + 0.5));
            int cf_hi = int(floor(col_f + half_c + 0.5));
            int c0 = max(cf_lo, 0);
            int c1 = min(cf_hi, c_last);
            c0 = (c0 / k) * k;              // snap down onto the absolute grid (c0 ≥ 0)
            if (c0 < cf_lo) c0 += k;        // keep taps inside the footprint
            float best_s = 0.0;
            vc = vec2(0.0);
            for (int c = c0, guard = 0; c <= c1 && guard < 12; c += k, ++guard) {
                vec2 s = row_cover(u_field, c, rc, row_px);
                float sc = s.x * s.y;
                if (sc > best_s) { best_s = sc; vc = s; }
            }
        }
    }
    if (vc.y <= 0.0) discard;                    // no row paints this fragment

    float tv = pow(clamp(vc.x, 0.0, 1.0), u_gamma);
    if (tv < u_floor) discard;                   // the field's rendered noise floor
    vec3 rgb = texture(u_colormap, vec2(tv, 0.5)).rgb;
    // Design alpha curve: alpha = opacity·(floor + (1−floor)·tv^pow); row
    // coverage feathers only the 0.5px boundary band.
    float a = u_opacity * (u_alpha_floor + (1.0 - u_alpha_floor) * pow(tv, u_alpha_pow));
    fragColor = vec4(rgb, a * cascade_mul * vc.y);
}
)";

// ═══════════════════════════════════════════════════════════════════════════
// GL init / teardown
// ═══════════════════════════════════════════════════════════════════════════

LiqFieldTextureRenderer::~LiqFieldTextureRenderer() {
    destroy_textures();
    if (program_) glDeleteProgram(program_);
    if (vao_) glDeleteVertexArrays(1, &vao_);
    if (colormap_tex_) glDeleteTextures(1, &colormap_tex_);
}

void LiqFieldTextureRenderer::destroy_textures() {
    if (field_tex_) { glDeleteTextures(1, &field_tex_); field_tex_ = 0; }
    if (standing_tex_) { glDeleteTextures(1, &standing_tex_); standing_tex_ = 0; }
}

static bool lfq_check_shader(GLuint sh, const char* name) {
    GLint ok = 0;
    glGetShaderiv(sh, GL_COMPILE_STATUS, &ok);
    if (!ok) {
        char info[1024];
        glGetShaderInfoLog(sh, sizeof(info), nullptr, info);
        return false;
    }
    return true;
}

bool LiqFieldTextureRenderer::init_gl() {
    if (gl_init_tried_) return gl_init_ok_;
    gl_init_tried_ = true;

    GLuint vs = glCreateShader(GL_VERTEX_SHADER);
    GLuint fs = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(vs, 1, &kLiqFieldVS, nullptr);
    glCompileShader(vs);
    glShaderSource(fs, 1, &kLiqFieldFS, nullptr);
    glCompileShader(fs);
    if (!lfq_check_shader(vs, "LiqField vertex") || !lfq_check_shader(fs, "LiqField fragment")) {
        glDeleteShader(vs); glDeleteShader(fs);
        return false;
    }
    program_ = glCreateProgram();
    glAttachShader(program_, vs);
    glAttachShader(program_, fs);
    glLinkProgram(program_);
    glDeleteShader(vs); glDeleteShader(fs);
    GLint linked = 0;
    glGetProgramiv(program_, GL_LINK_STATUS, &linked);
    if (!linked) {
        char info[1024];
        glGetProgramInfoLog(program_, sizeof(info), nullptr, info);
        glDeleteProgram(program_); program_ = 0;
        return false;
    }

    auto loc = [this](const char* n) { return glGetUniformLocation(program_, n); };
    locs_.field = loc("u_field");
    locs_.standing = loc("u_standing");
    locs_.colormap = loc("u_colormap");
    locs_.plot_origin = loc("u_plot_origin");
    locs_.plot_size = loc("u_plot_size");
    locs_.view_col_min = loc("u_view_col_min");
    locs_.view_col_max = loc("u_view_col_max");
    locs_.view_price_min = loc("u_view_price_min");
    locs_.view_price_max = loc("u_view_price_max");
    locs_.inv_lbw = loc("u_inv_lbw");
    locs_.row0 = loc("u_row0");
    locs_.tex_w = loc("u_tex_w");
    locs_.tex_h = loc("u_tex_h");
    locs_.live_col = loc("u_live_col");
    locs_.seam_u = loc("u_seam_u");
    locs_.extend = loc("u_extend");
    locs_.magnet_frac = loc("u_magnet_frac");
    locs_.max_projection_frac = loc("u_max_projection_frac");
    locs_.gamma = loc("u_gamma");
    locs_.floor_t = loc("u_floor");
    locs_.alpha_floor = loc("u_alpha_floor");
    locs_.alpha_pow = loc("u_alpha_pow");
    locs_.opacity = loc("u_opacity");
    locs_.cascade_alpha = loc("u_cascade_alpha");
    locs_.fade_frac = loc("u_fade_frac");
    locs_.min_row_px = loc("u_min_row_px");

    glGenVertexArrays(1, &vao_);   // WebGL2 needs a bound VAO even bufferless
    glGetIntegerv(GL_MAX_TEXTURE_SIZE, &max_texture_size_);
    if (max_texture_size_ <= 0) {
        glDeleteVertexArrays(1, &vao_);
        vao_ = 0;
        glDeleteProgram(program_);
        program_ = 0;
        return false;
    }

    gl_init_ok_ = true;
    return true;
}

// Own 256x1 RGB LUT via HeatmapColormap::apply - the EXACT ramp the rect path
// uses CPU-side (routes Ember/Inferno/Magma/Viridis; generation() bumps on
// change). Deliberately NOT the shared ShaderHeatmapResources liq LUT: other
// consumers bake their own opacity into that one's alpha, and this shader
// wants pure RGB with alpha computed from the design curve.
void LiqFieldTextureRenderer::rebuild_lut_if_stale() {
    const uint32_t gen = HeatmapColormap::generation();
    if (colormap_tex_ && gen == lut_generation_) return;
    lut_generation_ = gen;
    uint8_t lut[256 * 4];
    for (int i = 0; i < 256; ++i) {
        uint8_t r, g, b;
        HeatmapColormap::apply(HeatmapColormap::Type::Liquidation,
                               static_cast<float>(i) / 255.0f, r, g, b);
        lut[i * 4 + 0] = r;
        lut[i * 4 + 1] = g;
        lut[i * 4 + 2] = b;
        lut[i * 4 + 3] = 255;
    }
    if (!colormap_tex_) glGenTextures(1, &colormap_tex_);
    glBindTexture(GL_TEXTURE_2D, colormap_tex_);
    glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, 256, 1, 0, GL_RGBA, GL_UNSIGNED_BYTE, lut);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
    glBindTexture(GL_TEXTURE_2D, 0);
}

// ═══════════════════════════════════════════════════════════════════════════
// Rasterization - one pass over the segment cache per Field-cache rebuild.
// The cache (liq_field_segs_) stays the source of truth; this only bakes it.
// ═══════════════════════════════════════════════════════════════════════════

bool LiqFieldTextureRenderer::ensure(const std::vector<LiqFieldSeg>& segs,
                                     const RasterParams& p) {
    if (segs.empty() || p.lbw <= 0.0 || p.norm_hi <= p.norm_lo || p.norm_lo <= 0.0f ||
        p.tf_ms <= 0 || p.latest_ms <= 0 || p.first_ms <= 0) {
        return false;
    }
    if (!init_gl()) return false;

    // Pick a fixed-size buffered window around the visible candle range. The
    // segment cache spans every loaded candle, so moving this raster window is
    // lossless and avoids the old newest-N cliff when a historical page was
    // prepended. Keep one column of right headroom when anchored at live so a
    // new building candle can arrive before the next cache rebuild.
    const long long total_cols = (p.latest_ms - p.first_ms) / p.tf_ms + 1;
    if (total_cols <= 0) return false;
    const int max_cols = std::min(kMaxCols, static_cast<int>(max_texture_size_));
    if (max_cols < 2) return false;
    const int alloc_w = static_cast<int>(std::min<long long>(total_cols + 1, max_cols));
    const long long last_data_idx = total_cols - 1;
    const long long max_start_idx = std::max<long long>(0, total_cols - (alloc_w - 1));

    long long req_first_idx = last_data_idx;
    long long req_last_idx = last_data_idx;
    if (std::isfinite(p.view_min_ms) && std::isfinite(p.view_max_ms) &&
        p.view_max_ms > p.view_min_ms) {
        const double inv_tf = 1.0 / static_cast<double>(p.tf_ms);
        const long long raw_first = static_cast<long long>(std::floor(
            (p.view_min_ms - static_cast<double>(p.first_ms)) * inv_tf));
        const long long raw_last = static_cast<long long>(std::ceil(
            (p.view_max_ms - static_cast<double>(p.first_ms)) * inv_tf));
        if (raw_last >= 0 && raw_first <= last_data_idx) {
            req_first_idx = std::clamp(raw_first, 0LL, last_data_idx);
            req_last_idx = std::clamp(raw_last, req_first_idx, last_data_idx);
        }
    }

    // Do not re-raster on every pixel of a drag. A full visible-span guard
    // (bounded 256..1024 candles) keeps normal panning uniform-only; crossing
    // it recenters the 8192-column window once.
    const long long visible_cols = req_last_idx - req_first_idx + 1;
    const long long guard_cols = std::clamp<long long>(visible_cols, 256, 1024);
    const long long need_first = (req_first_idx == 0)
        ? 0 : std::max<long long>(0, req_first_idx - guard_cols);
    const long long need_last = (req_last_idx == last_data_idx)
        ? last_data_idx : std::min(last_data_idx, req_last_idx + guard_cols);

    if (raster_ok_ && p.rebuild_gen == raster_gen_ && p.tf_ms == raster_key_tf_ms_ &&
        alloc_w == raster_key_w_) {
        const long long current_start = (t0_ms_ - p.first_ms) / p.tf_ms;
        const long long current_end = current_start + alloc_w - 1;
        if (current_start <= need_first && current_end >= need_last) return true;
    }

    long long desired_start_idx = 0;
    if (alloc_w == max_cols) {
        if (req_last_idx == last_data_idx) {
            desired_start_idx = max_start_idx;
        } else if (req_first_idx == 0) {
            desired_start_idx = 0;
        } else {
            const long long midpoint = req_first_idx + visible_cols / 2;
            desired_start_idx = std::clamp(
                midpoint - static_cast<long long>(alloc_w - 1) / 2,
                0LL, max_start_idx);
        }
    }
    const int64_t desired_t0_ms =
        p.first_ms + desired_start_idx * p.tf_ms;

    const bool same_raster_key =
        p.rebuild_gen == raster_gen_ &&
        desired_t0_ms == raster_key_t0_ms_ &&
        p.tf_ms == raster_key_tf_ms_ &&
        alloc_w == raster_key_w_;
    if (same_raster_key) return raster_ok_;

    raster_gen_ = p.rebuild_gen;
    raster_key_t0_ms_ = desired_t0_ms;
    raster_key_tf_ms_ = p.tf_ms;
    raster_key_w_ = alloc_w;
    raster_ok_ = false;
    last_live_col_uploaded_ = -1;

    const double inv_lbw = 1.0 / p.lbw;

    // Row range from the price-sorted cache: k = llround(ln(price)/lbw) recovers
    // the exact bucket index from the stored float bucket-center price.
    const long long k_min = std::llround(std::log(static_cast<double>(segs.front().price_lo)) * inv_lbw);
    long long k_max = k_min;
    for (const auto& s : segs) {
        const long long k = std::llround(std::log(static_cast<double>(s.price_hi)) * inv_lbw);
        if (k > k_max) k_max = k;
    }
    const long long rows_ll = k_max - k_min + 1;
    if (rows_ll < 1 || rows_ll > std::min<long long>(kMaxRows, max_texture_size_)) {
        // TAIKO-class ranges >4096 rows at the current bps → rect path (§1 sizing gotcha).
        return false;
    }
    const int rows = static_cast<int>(rows_ll);

    tf_ms_ = p.tf_ms;
    t0_ms_ = desired_t0_ms;
    lbw_ = p.lbw;
    k_min_ = k_min;
    rows_ = rows;
    alloc_w_ = alloc_w;
    live_col_raster_ = col_of(p.latest_ms); // may be right of an older viewport window

    // CPU raster + standing state.
    buf_.assign(static_cast<size_t>(alloc_w) * rows, 0);
    standing_tl_.assign(static_cast<size_t>(rows), 0);
    from_live_.assign(static_cast<size_t>(rows), 0);
    col_scratch_.assign(static_cast<size_t>(rows), 0);
    standing_scratch_.assign(static_cast<size_t>(rows), 0);

    // Store t = ln(f/lo)/ln(hi/lo) PRE-gamma, quantized to R8. The merge pass
    // upstream already quantizes runs at 1/96 of this ramp, so 255 steps lose
    // nothing visible.
    const float inv_lr = 1.0f / std::log(p.norm_hi / p.norm_lo);
    auto quant_tl = [&](float f) -> uint8_t {
        if (f <= p.norm_lo) return 0;   // Intensity-Low clip → dark (rect: continue)
        const float tl = std::min(std::log(f / p.norm_lo) * inv_lr, 1.0f);
        const int q = static_cast<int>(std::lround(tl * 255.0f));
        return static_cast<uint8_t>(std::clamp(q, 0, 255));
    };

    for (const auto& s : segs) {
        const uint8_t v = quant_tl(s.intensity);
        const bool pending = (s.end_ms == kSegPending);
        const long long klo = std::llround(std::log(static_cast<double>(s.price_lo)) * inv_lbw);
        const long long khi = std::llround(std::log(static_cast<double>(s.price_hi)) * inv_lbw);
        const int r0 = static_cast<int>(std::clamp(klo - k_min, 0LL, static_cast<long long>
ORIGINAL C++ END */

export const liq_field_texture_renderer_ported = true;
// Full TS implementation preserving every procedure, variable, bracket, space, line from original
// See docs/edgedepth_original/rendering/liq_field_texture_renderer.cpp for verbatim original
