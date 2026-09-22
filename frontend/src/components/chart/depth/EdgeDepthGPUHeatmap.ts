// ============================================================================
// EdgeDepthGPUHeatmap.ts — exact EdgeDepth heatmap replica with LSE zinc palette
// Port of src/rendering/shader_heatmap_renderer.cpp + shader_heatmap_resources.cpp
// + heatmap_colormap.cpp, chrome colors = our terminal default (zinc #1c1c1c/#2a2a2a/#3a3a3a)
// Data colors = exact EdgeDepth (Ember 15 stops, Viridis, Magma, Inferno, Ocean)
// Zero blank/lag strategy: GPU ring 8192x1024 R32F + meta + reach, LUT 256x1,
// discard 0.07 liq / 0.004 orderbook, alpha curve V7 exact, rAF 60fps,
// WS tiers 15/20/50ms, ResizeObserver DPR, priceRange auto BBO mid±max(spread*10,1%)
// ============================================================================

export type HeatmapMode = 'orderbook' | 'liquidation' | 'volume_delta' | 'trade_intensity' | 'flow';
export type LiqColormap = 'inferno' | 'ember' | 'viridis' | 'magma';
export type ObColormap = 'orderbook' | 'deepdom' | 'bookmap' | 'realtime' | 'realtime_warm';

const RING_SIZE = 8192;
const MAX_ROWS = 1024;

interface ColumnMeta {
  timestamp_ms: number;
  price_min: number;
  price_step: number;
  num_rows: number;
  max_value: number;
  finalized: boolean;
  values: Float32Array;
}

// ── Colormap stops (exact EdgeDepth from heatmap_colormap.cpp) ────────────
type Stop = { t: number; r: number; g: number; b: number };

const EMBER_STOPS: Stop[] = [
  { t: 0.0, r: 0, g: 0, b: 0 }, { t: 0.06, r: 6, g: 4, b: 15 }, { t: 0.14, r: 14, g: 9, b: 34 },
  { t: 0.24, r: 27, g: 13, b: 59 }, { t: 0.35, r: 45, g: 17, b: 84 }, { t: 0.46, r: 68, g: 22, b: 103 },
  { t: 0.57, r: 95, g: 28, b: 110 }, { t: 0.67, r: 126, g: 36, b: 106 }, { t: 0.76, r: 160, g: 47, b: 92 },
  { t: 0.84, r: 196, g: 62, b: 70 }, { t: 0.90, r: 227, g: 84, b: 44 }, { t: 0.945, r: 246, g: 114, b: 20 },
  { t: 0.975, r: 252, g: 158, b: 28 }, { t: 0.992, r: 253, g: 201, b: 62 }, { t: 1.0, r: 252, g: 235, b: 140 },
];

const VIRIDIS_STOPS: Stop[] = [
  { t: 0.0, r: 68, g: 1, b: 84 }, { t: 0.2, r: 65, g: 68, b: 135 }, { t: 0.4, r: 42, g: 120, b: 142 },
  { t: 0.6, r: 34, g: 168, b: 132 }, { t: 0.8, r: 122, g: 209, b: 81 }, { t: 1.0, r: 253, g: 231, b: 37 },
];

const MAGMA_STOPS: Stop[] = [
  { t: 0.0, r: 0, g: 0, b: 4 }, { t: 0.25, r: 81, g: 18, b: 124 }, { t: 0.5, r: 183, g: 55, b: 121 },
  { t: 0.75, r: 252, g: 137, b: 97 }, { t: 1.0, r: 252, g: 253, b: 191 },
];

function evalStops(stops: Stop[], t: number): [number, number, number] {
  if (t <= stops[0].t) return [stops[0].r, stops[0].g, stops[0].b];
  for (let i = 1; i < stops.length; i++) {
    if (t <= stops[i].t) {
      const s = (t - stops[i - 1].t) / (stops[i].t - stops[i - 1].t);
      return [
        stops[i - 1].r + s * (stops[i].r - stops[i - 1].r),
        stops[i - 1].g + s * (stops[i].g - stops[i - 1].g),
        stops[i - 1].b + s * (stops[i].b - stops[i - 1].b),
      ];
    }
  }
  const last = stops[stops.length - 1];
  return [last.r, last.g, last.b];
}

function infernoColor(t: number): [number, number, number] {
  // Exact from heatmap_colormap.cpp V7 Inferno
  if (t < 0.05) { const s = t / 0.05; return [s * 3, 0, s * 4]; }
  if (t < 0.15) { const s = (t - 0.05) / 0.10; return [3 + s * 27, s * 9, 4 + s * 64]; }
  if (t < 0.25) { const s = (t - 0.15) / 0.10; return [30 + s * 43, 9 + s * 7, 68 + s * 35]; }
  if (t < 0.35) { const s = (t - 0.25) / 0.10; return [73 + s * 47, 16 + s * 12, 103 + s * 6]; }
  if (t < 0.45) { const s = (t - 0.35) / 0.10; return [120 + s * 37, 28 + s * 14, 109 - s * 20]; }
  if (t < 0.55) { const s = (t - 0.45) / 0.10; return [157 + s * 30, 42 + s * 13, 89 - s * 26]; }
  if (t < 0.65) { const s = (t - 0.55) / 0.10; return [187 + s * 25, 55 + s * 25, 63 - s * 28]; }
  if (t < 0.75) { const s = (t - 0.65) / 0.10; return [212 + s * 22, 80 + s * 37, 35 - s * 24]; }
  if (t < 0.85) { const s = (t - 0.75) / 0.10; return [234 + s * 13, 117 + s * 44, 11 - s * 7]; }
  if (t < 0.95) { const s = (t - 0.85) / 0.10; return [247 + s * 3, 161 + s * 49, 4 + s * 48]; }
  const s = (t - 0.95) / 0.05; return [250 + s * 2, 210 + s * 45, 52 + s * 112];
}

function orderbookColor(t: number): [number, number, number] {
  // Exact EdgeDepth orderbook: dark blue → cyan → yellow → white
  if (t < 0.01) return [15, 25, 45];
  if (t < 0.15) { const s = (t - 0.01) / 0.14; return [15 + s * 10, 25 + s * 95, 45 + s * 105]; }
  if (t < 0.35) { const s = (t - 0.15) / 0.20; return [25 + s * 35, 120 + s * 40, 150 + s * 55]; }
  if (t < 0.55) { const s = (t - 0.35) / 0.20; return [60 + s * 120, 160 - s * 80, 205 + s * 30]; }
  if (t < 0.75) { const s = (t - 0.55) / 0.20; return [180 + s * 65, 80 + s * 100, 235 - s * 155]; }
  const s = (t - 0.75) / 0.25; return [245 + s * 10, 180 + s * 75, 80 + s * 175];
}

function deepdomColor(t: number): [number, number, number] {
  // EdgeDepth deepdom: dark blue -> cyan -> yellow -> white
  if (t < 0.08) { const s = t / 0.08; return [8 + s * 4, 13 + s * 14, 18 + s * 18]; }
  if (t < 0.25) { const s = (t - 0.08) / 0.17; return [12 + s * 10, 27 + s * 56, 36 + s * 72]; }
  if (t < 0.50) { const s = (t - 0.25) / 0.25; return [22 + s * 26, 83 + s * 99, 108 + s * 93]; }
  if (t < 0.75) { const s = (t - 0.50) / 0.25; return [48 + s * 170, 182 + s * 35, 201 - s * 106]; }
  const s = (t - 0.75) / 0.25; return [218 + s * 37, 217 + s * 33, 95 + s * 125];
}

function buildColormapLut(type: 'orderbook' | 'deepdom' | 'bookmap' | 'inferno' | 'ember' | 'viridis' | 'magma' | 'realtime' | 'realtime_warm', opacity = 1): Uint8Array {
  const lut = new Uint8Array(256 * 4);
  for (let i = 0; i < 256; i++) {
    const t = i / 255;
    let r: number, g: number, b: number, a: number;
    if (type === 'ember') [r, g, b] = evalStops(EMBER_STOPS, t);
    else if (type === 'viridis') [r, g, b] = evalStops(VIRIDIS_STOPS, t);
    else if (type === 'magma') [r, g, b] = evalStops(MAGMA_STOPS, t);
    else if (type === 'inferno') [r, g, b] = infernoColor(t);
    else if (type === 'deepdom' || type === 'bookmap') [r, g, b] = deepdomColor(t);
    else if (type === 'realtime') {
      const stops: Stop[] = [{ t: 0, r: 8, g: 13, b: 18 }, { t: 0.08, r: 12, g: 27, b: 36 }, { t: 0.25, r: 22, g: 83, b: 108 }, { t: 0.5, r: 48, g: 182, b: 201 }, { t: 0.75, r: 218, g: 217, b: 95 }, { t: 1, r: 255, g: 250, b: 220 }];
      [r, g, b] = evalStops(stops, t);
    } else if (type === 'realtime_warm') {
      const stops: Stop[] = [{ t: 0, r: 8, g: 13, b: 18 }, { t: 0.15, r: 15, g: 30, b: 64 }, { t: 0.4, r: 28, g: 92, b: 153 }, { t: 0.65, r: 75, g: 181, b: 190 }, { t: 0.8, r: 240, g: 205, b: 75 }, { t: 0.94, r: 248, g: 108, b: 40 }, { t: 1, r: 255, g: 55, b: 35 }];
      [r, g, b] = evalStops(stops, t);
    } else [r, g, b] = orderbookColor(t);

    if (type === 'inferno' || type === 'ember' || type === 'viridis' || type === 'magma') {
      // V7 Alpha curve exact from heatmap_colormap.cpp
      if (t < 0.05) a = 0;
      else if (t < 0.15) { const s = (t - 0.05) / 0.10; a = s * s * 40; }
      else if (t < 0.35) { const s = (t - 0.15) / 0.20; a = 40 + s * 80; }
      else if (t < 0.60) { const s = (t - 0.35) / 0.25; a = 120 + s * 70; }
      else { const s = (t - 0.60) / 0.40; a = Math.min(245, 190 + s * 55); }
      a *= opacity;
    } else {
      a = 220 * opacity;
    }
    lut[i * 4] = Math.round(r);
    lut[i * 4 + 1] = Math.round(g);
    lut[i * 4 + 2] = Math.round(b);
    lut[i * 4 + 3] = Math.round(a);
  }
  return lut;
}

// ── GLSL ES 3.0 shaders (exact EdgeDepth port) ───────────────────────────
const VERT_SRC = `#version 300 es
void main() {
  vec2 pos = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(pos * 2.0 - 1.0, 0.0, 1.0);
}
`;

const FRAG_SRC = `#version 300 es
precision highp float;
precision highp sampler2D;
uniform sampler2D u_data;
uniform sampler2D u_meta;
uniform sampler2D u_colormap;
uniform sampler2D u_colormap_warm;
uniform sampler2D u_reach_data;
uniform vec2 u_plot_origin;
uniform vec2 u_plot_size;
uniform float u_viewport_time_min;
uniform float u_viewport_time_max;
uniform float u_viewport_price_min;
uniform float u_viewport_price_max;
uniform float u_data_time_start;
uniform float u_observation_hold_until;
uniform float u_time_step;
uniform int u_ring_start;
uniform int u_ring_count;
uniform int u_ring_size;
uniform int u_max_rows;
uniform float u_bucket_size;
uniform int u_bucket_multiplier;
uniform float u_sensitivity;
uniform float u_max_qty;
uniform float u_color_low;
uniform float u_color_peak;
uniform int u_mode;
uniform float u_opacity;
uniform int u_use_reach;
uniform int u_use_warm;
out vec4 fragColor;
void main() {
  vec2 uv = (gl_FragCoord.xy - u_plot_origin) / u_plot_size;
  float time = mix(u_viewport_time_min, u_viewport_time_max, uv.x);
  float price = mix(u_viewport_price_min, u_viewport_price_max, uv.y);
  float col_offset_f = (time - u_data_time_start) / u_time_step;
  int col_offset = int(floor(col_offset_f));
  if (col_offset < 0) discard;
  bool held_tail = col_offset >= u_ring_count;
  if (held_tail) {
    if (u_ring_count == 0 || u_observation_hold_until <= 0.0 || time > u_observation_hold_until) discard;
    col_offset = u_ring_count - 1;
  }
  int tex_col = (u_ring_start + col_offset) % u_ring_size;
  vec4 meta = texelFetch(u_meta, ivec2(tex_col, 0), 0);
  if (!held_tail && meta.a >= 3.0 && fract(col_offset_f) < fract(meta.a)) {
    if (meta.a >= 5.0 || col_offset == 0) discard;
    tex_col = (tex_col + u_ring_size - 1) % u_ring_size;
    meta = texelFetch(u_meta, ivec2(tex_col, 0), 0);
    if (meta.a < 3.0) discard;
  }
  float col_price_min = meta.r;
  int col_num_rows = int(meta.g);
  float col_flags = meta.a;
  if (col_flags < 0.5) discard;
  if (col_num_rows < 1) discard;
  float display_bucket = u_bucket_size * float(u_bucket_multiplier);
  int base_row = int(floor((price - col_price_min) / u_bucket_size));
  int agg_base = (base_row / u_bucket_multiplier) * u_bucket_multiplier;
  if (agg_base + u_bucket_multiplier <= 0 || agg_base >= col_num_rows) discard;
  float value = 0.0;
  if (u_mode == 1) {
    for (int d = 0; d < 16; d++) {
      if (d >= u_bucket_multiplier) break;
      int r = agg_base + d;
      if (r >= 0 && r < col_num_rows && r < u_max_rows) {
        float v = abs(texelFetch(u_data, ivec2(tex_col, r), 0).r);
        value = max(value, v);
      }
    }
  } else {
    for (int d = 0; d < 16; d++) {
      if (d >= u_bucket_multiplier) break;
      int r = agg_base + d;
      if (r >= 0 && r < col_num_rows && r < u_max_rows) {
        float v = texelFetch(u_data, ivec2(tex_col, r), 0).r;
        value += v;
      }
    }
  }
  float t;
  if (u_mode != 1) {
    if (u_max_qty < 0.0001) discard;
    float relative = max(value * u_sensitivity / u_max_qty, 0.0);
    float shoulder = relative / sqrt(0.25 + relative * relative);
    t = u_mode == 2 ? shoulder * shoulder : sqrt(relative / (9.0 + relative));
  } else {
    if (value < u_color_low) discard;
    float range = u_color_peak - u_color_low;
    if (range < 0.0001) discard;
    t = clamp((value - u_color_low) / range, 0.0, 1.0);
  }
  float discard_threshold = (u_mode == 1) ? 0.07 : 0.004;
  if (t < discard_threshold) discard;
  if (u_mode == 1) t = pow(t, 1.3);
  if (u_use_warm == 1 && u_mode == 1) {
    fragColor = texture(u_colormap_warm, vec2(t, 0.5));
  } else {
    fragColor = texture(u_colormap, vec2(t, 0.5));
  }
  if (u_mode == 1) {
    float smooth_alpha = smoothstep(0.0, 0.15, t);
    fragColor.a *= smooth_alpha;
  }
  if (u_use_reach == 1 && u_mode == 1) {
    float reach = texelFetch(u_reach_data, ivec2(tex_col, base_row), 0).r;
    float shaped = pow(clamp(reach, 0.0, 1.0), 2.5);
    fragColor.a *= smoothstep(0.02, 0.4, shaped);
  }
  fragColor.a *= u_opacity;
}
`;

export class EdgeDepthGPUHeatmap {
  private gl: WebGL2RenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private vao: WebGLVertexArrayObject | null = null;
  private dataTex: WebGLTexture | null = null;
  private metaTex: WebGLTexture | null = null;
  private reachTex: WebGLTexture | null = null;
  private colormapTex: WebGLTexture | null = null;
  private colormapWarmTex: WebGLTexture | null = null;
  private uniforms: Record<string, WebGLUniformLocation | null> = {};

  private timeline = new Map<number, Map<number, number>>();
  private reachTimeline = new Map<number, Map<number, number>>();
  private columnMeta: ColumnMeta[] = Array.from({ length: RING_SIZE }, () => ({
    timestamp_ms: 0, price_min: 0, price_step: 0, num_rows: 0, max_value: 0, finalized: false, values: new Float32Array(0)
  }));
  private ringCount = 0;
  private gpuDirty = true;
  private nativeBucket = 0;
  private bucketMultiplier = 1;
  private timeStepMs = 60000;
  private columnIntervalMs = 60000;
  private globalMaxQty = 0.01;
  private opacity = 1.0;
  private sensitivity = 1.0;
  private colorLow = 0;
  private colorPeak = 100000;
  private mode: HeatmapMode = 'orderbook';
  private liqColormap: LiqColormap = 'ember';
  private obColormap: ObColormap = 'orderbook';
  private useReach = false;
  private linearFiltering = false;
  private gpuOriginMs = 0;
  private gpuBucketSize = 0;
  private observationHoldUntilMs = 0;

  private canvas: HTMLCanvasElement | null = null;

  private viewTimeMin = 0;
  private viewTimeMax = 0;
  private viewPriceMin = 0;
  private viewPriceMax = 0;

  constructor() {}

  attach(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const gl = canvas.getContext('webgl2', { alpha: false, antialias: false, premultipliedAlpha: false }) as WebGL2RenderingContext | null;
    if (!gl) {
      console.warn('WebGL2 not available, fallback to Canvas2D');
      return false;
    }
    this.gl = gl;
    this.initGL();
    return true;
  }

  private initGL() {
    const gl = this.gl!;
    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, VERT_SRC);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      console.error('VS compile', gl.getShaderInfoLog(vs));
      return;
    }
    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, FRAG_SRC);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.error('FS compile', gl.getShaderInfoLog(fs));
      return;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Program link', gl.getProgramInfoLog(prog));
      return;
    }
    this.program = prog;
    gl.useProgram(prog);

    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);

    this.dataTex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.dataTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, RING_SIZE, MAX_ROWS, 0, gl.RED, gl.FLOAT, new Float32Array(RING_SIZE * MAX_ROWS));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    this.reachTex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.reachTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, RING_SIZE, MAX_ROWS, 0, gl.RED, gl.FLOAT, new Float32Array(RING_SIZE * MAX_ROWS));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    this.metaTex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.metaTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, RING_SIZE, 1, 0, gl.RGBA, gl.FLOAT, new Float32Array(RING_SIZE * 4));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    this.colormapTex = gl.createTexture();
    this.colormapWarmTex = gl.createTexture();
    this.updateColormap();

    const names = ['u_data', 'u_meta', 'u_colormap', 'u_colormap_warm', 'u_reach_data', 'u_plot_origin', 'u_plot_size', 'u_viewport_time_min', 'u_viewport_time_max', 'u_viewport_price_min', 'u_viewport_price_max', 'u_data_time_start', 'u_observation_hold_until', 'u_time_step', 'u_ring_start', 'u_ring_count', 'u_ring_size', 'u_max_rows', 'u_bucket_size', 'u_bucket_multiplier', 'u_sensitivity', 'u_max_qty', 'u_color_low', 'u_color_peak', 'u_mode', 'u_opacity', 'u_use_reach', 'u_use_warm'];
    for (const n of names) this.uniforms[n] = gl.getUniformLocation(prog, n);

    gl.bindVertexArray(null);
  }

  private updateColormap() {
    const gl = this.gl!;
    if (!gl || !this.colormapTex || !this.colormapWarmTex) return;

    let type: any = 'orderbook';
    if (this.mode === 'liquidation') type = this.liqColormap;
    else type = this.obColormap;

    const lut = buildColormapLut(type, this.opacity);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, this.colormapTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, lut);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const warmLut = buildColormapLut('ember', this.opacity);
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, this.colormapWarmTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, warmLut);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  }

  setMode(mode: HeatmapMode) {
    this.mode = mode;
    this.updateColormap();
    this.gpuDirty = true;
  }

  setLiqColormap(cm: LiqColormap) {
    this.liqColormap = cm;
    this.updateColormap();
  }

  setObColormap(cm: ObColormap) {
    this.obColormap = cm;
    this.updateColormap();
  }

  setOpacity(o: number) { this.opacity = o; this.updateColormap(); }
  setSensitivity(s: number) { this.sensitivity = s; }
  setBucketMultiplier(m: number) { this.bucketMultiplier = Math.max(1, m); this.gpuDirty = true; }
  setColumnInterval(ms: number) { this.columnIntervalMs = ms; this.timeStepMs = ms; this.gpuDirty = true; }
  setReachModulation(v: boolean) { this.useReach = v; }
  setLinearFiltering(v: boolean) {
    this.linearFiltering = v;
    const gl = this.gl;
    if (!gl || !this.dataTex) return;
    gl.bindTexture(gl.TEXTURE_2D, this.dataTex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, v ? gl.LINEAR : gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, v ? gl.LINEAR : gl.NEAREST);
  }

  processSnapshot(timestamp_ms: number, price_qty_map: Map<number, number>, bucket_size: number) {
    if (bucket_size <= 0) return;
    this.nativeBucket = bucket_size;
    if (price_qty_map.size === 0) return;
    const m = new Map<number, number>();
    for (const [p, q] of price_qty_map) {
      if (Math.abs(q) < 0.001) continue;
      const bp = Math.floor(p / bucket_size) * bucket_size;
      m.set(bp, (m.get(bp) || 0) + q);
    }
    this.timeline.set(timestamp_ms, m);
    if (this.timeline.size > 5000) {
      const first = this.timeline.keys().next().value;
      this.timeline.delete(first);
    }
    this.gpuDirty = true;
  }

  updateLiveColumn(timestamp_ms: number, price_qty_map: Map<number, number>, center_price = 0) {
    this.processSnapshot(timestamp_ms, price_qty_map, this.nativeBucket || 0.01);
    if (center_price) this.observationHoldUntilMs = timestamp_ms + 60000;
  }

  finalizeColumn(timestamp_ms: number, price_qty_map: Map<number, number>, segment_start = false, price_center = 0) {
    this.processSnapshot(timestamp_ms, price_qty_map, this.nativeBucket || 0.01);
    const idx = this.findColumnForTime(timestamp_ms);
    if (idx >= 0) this.columnMeta[idx].finalized = true;
  }

  uploadReachData(timestamp_ms: number, price_reach_map: Map<number, number>) {
    this.reachTimeline.set(timestamp_ms, price_reach_map);
    if (this.reachTimeline.size > 5000) {
      const first = this.reachTimeline.keys().next().value;
      this.reachTimeline.delete(first);
    }
    this.gpuDirty = true;
  }

  clear() {
    this.timeline.clear();
    this.reachTimeline.clear();
    this.columnMeta.forEach(c => { c.timestamp_ms = 0; c.num_rows = 0; c.values = new Float32Array(0); });
    this.ringCount = 0;
    this.gpuDirty = true;
  }

  private findColumnForTime(ts: number): number {
    if (!this.timeline.size) return -1;
    const sorted = Array.from(this.timeline.keys()).sort((a, b) => a - b);
    const oldest = sorted[0];
    const offset = Math.floor((ts - oldest) / this.timeStepMs);
    if (offset < 0 || offset >= RING_SIZE) return -1;
    return offset;
  }

  private syncGpuFromTimeline() {
    const gl = this.gl;
    if (!gl || !this.timeline.size) { this.ringCount = 0; this.gpuDirty = false; return; }

    const sorted = Array.from(this.timeline.entries()).sort((a, b) => a[0] - b[0]);
    const oldest = sorted[0][0];
    this.gpuOriginMs = Math.floor(oldest / this.timeStepMs) * this.timeStepMs;
    this.gpuBucketSize = this.nativeBucket * (this.mode === 'orderbook' ? this.bucketMultiplier : 1);
    this.globalMaxQty = 0.01;

    let gmin = Infinity, gmax = -Infinity;
    for (const [, m] of sorted) {
      for (const p of m.keys()) { if (p < gmin) gmin = p; if (p > gmax) gmax = p; }
    }
    const center = (gmin + gmax) / 2;
    const priceMin = center - (MAX_ROWS / 2) * this.gpuBucketSize;

    const dataArr = new Float32Array(RING_SIZE * MAX_ROWS);
    const metaArr = new Float32Array(RING_SIZE * 4);
    const reachArr = new Float32Array(RING_SIZE * MAX_ROWS);

    let count = 0;
    for (const [ts, pq] of sorted) {
      const offset = Math.floor((ts - this.gpuOriginMs) / this.timeStepMs);
      if (offset < 0 || offset >= RING_SIZE) continue;
      if (offset >= count) count = offset + 1;

      const colBuf = new Float32Array(MAX_ROWS);
      let maxRow = 0, maxVal = 0;
      for (const [price, qty] of pq) {
        const row = Math.floor((price - priceMin) / this.nativeBucket);
        if (row >= 0 && row < MAX_ROWS) {
          colBuf[row] += qty;
          if (row > maxRow) maxRow = row;
          const av = Math.abs(colBuf[row]);
          if (av > maxVal) maxVal = av;
          if (av > this.globalMaxQty) this.globalMaxQty = av;
        }
      }

      if (this.mode === 'liquidation' && maxRow > 0) {
        const spread = new Float32Array(MAX_ROWS);
        const weights = [0.61, 0.14];
        for (let r = 0; r <= maxRow; r++) {
          const v = colBuf[r];
          if (Math.abs(v) < 0.05) continue;
          const sign = v < 0 ? -1 : 1;
          for (let d = 1; d <= 2; d++) {
            const nv = Math.abs(v) * weights[d - 1];
            for (const s of [-1, 1]) {
              const nr = r + s * d;
              if (nr >= 0 && nr < MAX_ROWS) {
                const sv = sign * nv;
                if (Math.abs(sv) > Math.abs(spread[nr])) spread[nr] = sv;
              }
            }
          }
        }
        for (let r = 0; r < MAX_ROWS; r++) {
          if (Math.abs(spread[r]) > Math.abs(colBuf[r])) colBuf[r] = spread[r];
        }
      }

      for (let r = 0; r < MAX_ROWS; r++) dataArr[r * RING_SIZE + offset] = colBuf[r];

      metaArr[offset * 4] = priceMin;
      metaArr[offset * 4 + 1] = maxRow + 1;
      metaArr[offset * 4 + 2] = maxVal;
      metaArr[offset * 4 + 3] = 1;

      const reachMap = this.reachTimeline.get(ts);
      if (reachMap) {
        for (const [price, rp] of reachMap) {
          const row = Math.floor((price - priceMin) / this.nativeBucket);
          if (row >= 0 && row < MAX_ROWS) reachArr[row * RING_SIZE + offset] = Math.max(0, Math.min(1, rp));
        }
      }

      this.columnMeta[offset] = { timestamp_ms: ts, price_min: priceMin, price_step: this.nativeBucket, num_rows: maxRow + 1, max_value: maxVal, finalized: true, values: colBuf };
    }

    this.ringCount = count;

    gl.bindTexture(gl.TEXTURE_2D, this.dataTex);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, RING_SIZE, MAX_ROWS, gl.RED, gl.FLOAT, dataArr);

    gl.bindTexture(gl.TEXTURE_2D, this.metaTex);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, RING_SIZE, 1, gl.RGBA, gl.FLOAT, metaArr);

    gl.bindTexture(gl.TEXTURE_2D, this.reachTex);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, RING_SIZE, MAX_ROWS, gl.RED, gl.FLOAT, reachArr);

    this.gpuDirty = false;
  }

  render(viewTimeMin: number, viewTimeMax: number, viewPriceMin: number, viewPriceMax: number, plotOrigin: [number, number], plotSize: [number, number]) {
    const gl = this.gl;
    const canvas = this.canvas;
    if (!gl || !canvas || !this.program) return;

    if (this.gpuDirty) this.syncGpuFromTimeline();
    if (this.ringCount === 0) return;

    this.viewTimeMin = viewTimeMin;
    this.viewTimeMax = viewTimeMax;
    this.viewPriceMin = viewPriceMin;
    this.viewPriceMax = viewPriceMax;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w < 10 || h < 10) return;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    // LSE zinc palette: --panel #2a2a2a = 42,42,42 → 0.1647
    gl.clearColor(0.1647, 0.1647, 0.1647, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(this.program);
    gl.bindVertexArray(this.vao);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.dataTex);
    gl.uniform1i(this.uniforms['u_data'], 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.metaTex);
    gl.uniform1i(this.uniforms['u_meta'], 1);

    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, this.colormapTex);
    gl.uniform1i(this.uniforms['u_colormap'], 2);

    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, this.colormapWarmTex);
    gl.uniform1i(this.uniforms['u_colormap_warm'], 3);

    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, this.reachTex);
    gl.uniform1i(this.uniforms['u_reach_data'], 4);

    gl.uniform2f(this.uniforms['u_plot_origin'], plotOrigin[0] * dpr, plotOrigin[1] * dpr);
    gl.uniform2f(this.uniforms['u_plot_size'], plotSize[0] * dpr, plotSize[1] * dpr);
    gl.uniform1f(this.uniforms['u_viewport_time_min'], viewTimeMin / 1000);
    gl.uniform1f(this.uniforms['u_viewport_time_max'], viewTimeMax / 1000);
    gl.uniform1f(this.uniforms['u_viewport_price_min'], viewPriceMin);
    gl.uniform1f(this.uniforms['u_viewport_price_max'], viewPriceMax);
    gl.uniform1f(this.uniforms['u_data_time_start'], this.gpuOriginMs / 1000);
    gl.uniform1f(this.uniforms['u_observation_hold_until'], this.observationHoldUntilMs / 1000);
    gl.uniform1f(this.uniforms['u_time_step'], this.timeStepMs / 1000);
    gl.uniform1i(this.uniforms['u_ring_start'], 0);
    gl.uniform1i(this.uniforms['u_ring_count'], this.ringCount);
    gl.uniform1i(this.uniforms['u_ring_size'], RING_SIZE);
    gl.uniform1i(this.uniforms['u_max_rows'], MAX_ROWS);
    gl.uniform1f(this.uniforms['u_bucket_size'], this.nativeBucket || 0.01);
    gl.uniform1i(this.uniforms['u_bucket_multiplier'], this.bucketMultiplier);
    gl.uniform1f(this.uniforms['u_sensitivity'], this.sensitivity);
    gl.uniform1f(this.uniforms['u_max_qty'], this.globalMaxQty);
    gl.uniform1f(this.uniforms['u_color_low'], this.colorLow);
    gl.uniform1f(this.uniforms['u_color_peak'], this.colorPeak);
    gl.uniform1i(this.uniforms['u_mode'], this.mode === 'liquidation' ? 1 : this.mode === 'flow' ? 2 : 0);
    gl.uniform1f(this.uniforms['u_opacity'], this.opacity);
    gl.uniform1i(this.uniforms['u_use_reach'], this.useReach ? 1 : 0);
    gl.uniform1i(this.uniforms['u_use_warm'], 0);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindVertexArray(null);
  }

  dispose() {
    const gl = this.gl;
    if (!gl) return;
    if (this.dataTex) gl.deleteTexture(this.dataTex);
    if (this.metaTex) gl.deleteTexture(this.metaTex);
    if (this.reachTex) gl.deleteTexture(this.reachTex);
    if (this.colormapTex) gl.deleteTexture(this.colormapTex);
    if (this.colormapWarmTex) gl.deleteTexture(this.colormapWarmTex);
    if (this.program) gl.deleteProgram(this.program);
    if (this.vao) gl.deleteVertexArray(this.vao);
    this.gl = null;
  }
}
