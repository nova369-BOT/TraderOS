import { r as y, j as n, g as Tt } from "./react-vendor-C0yw3i6b.js";
const ot = ["deepdom", "bookmap", "heat", "greyscale"], vt = [
  [0, [6, 2, 5]],
  [0.3, [58, 10, 16]],
  [0.55, [126, 26, 16]],
  [0.75, [206, 64, 12]],
  [0.9, [255, 140, 0]],
  [1, [255, 214, 96]]
], _t = [
  [0, [2, 5, 11]],
  [0.3, [6, 24, 50]],
  [0.55, [10, 48, 94]],
  [0.75, [13, 92, 112]],
  [0.9, [26, 190, 92]],
  [1, [126, 255, 152]]
], Mt = [
  [0, [0, 0, 0]],
  [0.35, [8, 34, 61]],
  [0.6, [14, 107, 168]],
  [0.8, [110, 185, 228]],
  [0.9, [226, 244, 255]],
  [0.95, [255, 202, 62]],
  [1, [255, 92, 40]]
], Ke = [
  [0, [0, 0, 0]],
  [0.25, [0, 0, 255]],
  [0.55, [255, 255, 0]],
  [0.78, [255, 140, 0]],
  [1, [255, 0, 0]]
];
function Je(t, e) {
  switch (t) {
    case "deepdom":
      return e === "ask" ? vt : _t;
    case "bookmap":
      return Mt;
    case "heat":
      return Ke;
    case "greyscale":
      return Ke;
  }
}
function wt(t, e) {
  for (let s = 1; s < t.length; s++) {
    const [o, a] = t[s], [r, l] = t[s - 1];
    if (e <= o) {
      const i = (e - r) / (o - r);
      return [
        l[0] + (a[0] - l[0]) * i,
        l[1] + (a[1] - l[1]) * i,
        l[2] + (a[2] - l[2]) * i
      ];
    }
  }
  return t[t.length - 1][1];
}
function He(t, e, s) {
  const o = new Uint8ClampedArray(1024), a = 1 - Math.min(1, Math.max(0, e.dimming)), r = 1 + e.contrast, l = e.brightness * 255, i = s >= 2 ? Math.ceil(256 / Math.min(s, 256)) : 1, h = (c) => {
    const b = c / 255;
    let T, v, f;
    t === null ? T = v = f = b * 255 : [T, v, f] = wt(t, b);
    const g = (T + v + f) / 3;
    return T = g + (T - g) * e.intensity, v = g + (v - g) * e.intensity, f = g + (f - g) * e.intensity, T *= a, v *= a, f *= a, T = (T / 255 - 0.5) * r * 255 + 127.5 + l, v = (v / 255 - 0.5) * r * 255 + 127.5 + l, f = (f / 255 - 0.5) * r * 255 + 127.5 + l, [
      Math.min(255, Math.max(0, T)),
      Math.min(255, Math.max(0, v)),
      Math.min(255, Math.max(0, f))
    ];
  };
  for (let c = 0; c < 256; c++) {
    const b = i > 1 ? Math.min(Math.floor(c / i) * i + Math.floor(i / 2), 255) : c, [T, v, f] = h(b);
    o[c * 4] = T, o[c * 4 + 1] = v, o[c * 4 + 2] = f, o[c * 4 + 3] = 255;
  }
  return o;
}
function Be(t, e) {
  const s = e !== void 0 ? e : t.smoothing, o = ot.includes(t.scheme) ? t.scheme : "heat";
  if (o === "greyscale") {
    const l = He(null, t, s);
    return { ask: l, bid: l };
  }
  const a = He(Je(o, "ask"), t, s), r = o === "deepdom" ? He(Je(o, "bid"), t, s) : a;
  return { ask: a, bid: r };
}
function St(t) {
  switch (t) {
    case "deepdom":
      return "DeepDom · side-aware ember/water";
    case "bookmap":
      return "Bookmap · blue water, hot walls";
    case "heat":
      return "Classic heat";
    case "greyscale":
      return "Greyscale";
  }
}
const at = {
  view: "heat",
  // First open should read like the reference class (02-visual-excellence §1):
  // side-aware field + glow + path + bubbles, candles off (the heat is hero).
  scheme: "deepdom",
  applySchemeGlobally: !1,
  intensity: 1,
  dimming: 0,
  contrast: 0,
  brightness: 0,
  gamma: 0.6,
  glow: !0,
  smoothColumns: !1,
  showPath: !0,
  showCandles: !1,
  bigTradeK: 6,
  subpanes: !0,
  ladderMode: "fused",
  // the reference look: ladder lives in the axis gutter
  showTsPanel: !1,
  tsSide: "all",
  tsMinSize: 0,
  // Auto-tuned defaults per research §3: session p5/p95 of observed sizes.
  cutoffMode: "percentile",
  cutoffLower: 5,
  cutoffUpper: 95,
  smoothingMode: "auto",
  smoothing: 0,
  dots: !0,
  dotType: "pie",
  // V2: pie-split sphere bubbles are the reference look
  dotMinSize: 0,
  dotScale: 1,
  dotAlpha: 0.85,
  activeRange: 0,
  cob: !0,
  cobCumulative: !0,
  recenterMode: "bbo",
  recenterTolerance: 15,
  resetPolicy: "session",
  resetIntervalMin: 60
}, rt = "lset-depth-global-scheme", lt = "lset-depth-global-apply", Fe = "lse-depth-global-scheme";
function kt() {
  let t = "heat", e = !1;
  try {
    const s = localStorage.getItem(rt);
    (s === "heat" || s === "greyscale" || s === "deepdom" || s === "bookmap") && (t = s), e = localStorage.getItem(lt) === "1";
  } catch {
  }
  return { scheme: t, apply: e };
}
function Ve(t, e) {
  try {
    localStorage.setItem(rt, t), localStorage.setItem(lt, e ? "1" : "0");
  } catch {
  }
}
function Et(t, e, s, o) {
  if (e === "exact") {
    let h = s, c = o;
    return c <= h && (c = h + Math.max(Math.abs(h) * 1e-6, 1e-9)), [h, c];
  }
  const a = t.filter((h) => h > 0).sort((h, c) => h - c);
  if (!a.length) return [0, 1];
  const r = (h) => {
    const c = Math.min(
      a.length - 1,
      Math.max(0, Math.round(h / 100 * (a.length - 1)))
    );
    return a[c];
  };
  let l = r(s), i = r(o);
  return i <= l && (i = l + Math.max(Math.abs(l) * 1e-6, 1e-9)), [l, i];
}
function Rt(t, e, s, o = 1) {
  s <= e && (s = e + Math.max(Math.abs(e) * 1e-6, 1e-9));
  const a = Math.min(1, Math.max(0, (t - e) / (s - e)));
  return Math.round(Math.pow(a, o) * 255);
}
const Le = "9px ui-monospace, Menlo, Consolas, monospace";
function Ct(t, e = 7) {
  const s = t / Math.max(1, e), o = Math.pow(10, Math.floor(Math.log10(Math.max(s, 1e-12))));
  for (const a of [1, 2, 2.5, 5, 10])
    if (s <= a * o) return a * o;
  return 10 * o;
}
function We(t, e) {
  const s = e >= 1 ? e >= 10 ? 0 : 1 : Math.min(6, Math.ceil(-Math.log10(e)));
  return t.toFixed(s);
}
function Qe(t, e, s, o, a, r, l) {
  t.save(), t.strokeStyle = "rgba(255, 255, 255, 0.06)", t.lineWidth = 1, t.setLineDash([2, 4]);
  const i = Math.ceil(a / l) * l;
  t.beginPath();
  for (let h = i; h <= r; h += l) {
    const c = Math.round(o(h)) + 0.5;
    c < 0 || c > e || (t.moveTo(c, 0), t.lineTo(c, s));
  }
  t.stroke(), t.restore();
}
function Pt(t, e) {
  const { fieldW: s, cssW: o, cssH: a, centre: r, ppu: l, pLo: i, pHi: h } = e, c = (f) => a / 2 - (f - r) * l;
  t.fillStyle = "#0c0f14", t.fillRect(s, 0, o - s, a), t.strokeStyle = "#232a35", t.beginPath(), t.moveTo(s + 0.5, 0), t.lineTo(s + 0.5, a), t.stroke();
  const b = Ct(h - i), T = Math.ceil(i / b) * b;
  t.font = Le, t.textAlign = "right", t.save(), t.setLineDash([1, 3]);
  for (let f = T; f <= h; f += b) {
    const g = Math.round(c(f)) + 0.5;
    g < 8 || g > a - 4 || (t.strokeStyle = "rgba(255, 255, 255, 0.05)", t.beginPath(), t.moveTo(0, g), t.lineTo(s, g), t.stroke(), t.strokeStyle = "#3a4453", t.beginPath(), t.moveTo(s, g), t.lineTo(s + 4, g), t.stroke(), e.fused || (t.fillStyle = "#8b96a5", t.fillText(We(f, b), o - 5, g + 3)));
  }
  t.restore();
  const v = (f, g, w) => {
    const u = c(f);
    u < 8 || u > a - 8 || (t.fillStyle = g, t.fillRect(s + 2, u - 8, o - s - 4, 16), t.fillStyle = w, t.font = `600 ${Le}`, t.fillText(We(f, b), o - 5, u + 3), t.font = Le);
  };
  if (e.bookAsk !== null && v(e.bookAsk, "rgba(239, 83, 80, 0.92)", "#2b0b0a"), e.bookBid !== null && v(e.bookBid, "rgba(38, 166, 154, 0.92)", "#06201c"), e.lastPrice !== null) {
    const f = c(e.lastPrice);
    f >= 0 && f <= a && (t.save(), t.strokeStyle = e.lastBuy ? "rgba(38, 166, 154, 0.65)" : "rgba(239, 83, 80, 0.65)", t.setLineDash([5, 4]), t.beginPath(), t.moveTo(0, Math.round(f) + 0.5), t.lineTo(s, Math.round(f) + 0.5), t.stroke(), t.restore(), f >= 8 && f <= a - 8 && (t.fillStyle = e.lastBuy ? "#26a69a" : "#ef5350", t.fillRect(s + 2, f - 8, o - s - 4, 16), t.fillStyle = "#08131a", t.font = `700 ${Le}`, t.fillText(We(e.lastPrice, b), o - 5, f + 3), t.font = Le));
  }
  t.textAlign = "left";
}
const jt = "9px ui-monospace, Menlo, Consolas, monospace", ct = "#26a69a", ht = "#ef5350";
function $e(t) {
  return t >= 1e4 ? `${(t / 1e3).toFixed(0)}k` : t >= 1e3 ? `${(t / 1e3).toFixed(1)}k` : t >= 100 || t >= 10 ? t.toFixed(0) : t.toFixed(1);
}
function Dt(t, e, s, o, a, r, l, i) {
  const h = (c, b) => {
    t.strokeStyle = b, t.lineWidth = 1, t.beginPath();
    let T = null, v = 0;
    for (let f = s; f < o; f++) {
      const g = c(e[f]), w = a(e[f].tsMs), u = f + 1 < o ? a(e[f + 1].tsMs) : w + 1;
      if (g === null || g < l || g > i) {
        T = null;
        continue;
      }
      const x = Math.round(r(g)) + 0.5;
      T !== null ? (t.moveTo(v, T), t.lineTo(w, T), t.lineTo(w, x)) : t.moveTo(w, x), t.lineTo(u, x), T = x, v = u;
    }
    t.stroke();
  };
  h((c) => c.bb, "rgba(38, 166, 154, 0.85)"), h((c) => c.ba, "rgba(239, 83, 80, 0.85)");
}
function At(t, e, s, o, a, r, l, i, h) {
  if (h.alpha <= 0) return;
  t.save(), t.globalAlpha = h.alpha;
  const c = [];
  if (h.mode === "pie") {
    const b = Math.max(4, h.cssH / 80), T = Math.max(5, 1400 / Math.max(0.5, (o - s) / Math.max(1, h.fieldW))), v = /* @__PURE__ */ new Map();
    for (const f of e) {
      if (f.tsMs < s || f.tsMs > o || f.price < a || f.price > r) continue;
      const g = l(f.tsMs), w = i(f.price), u = `${Math.round(g / T)}:${Math.round(w / b)}`;
      let x = v.get(u);
      x || (x = { x: 0, y: 0, n: 0, size: 0, buy: 0, sell: 0 }, v.set(u, x)), x.x += g, x.y += w, x.n += 1, x.size += f.size, f.buy ? x.buy += f.size : x.sell += f.size;
    }
    for (const f of v.values()) c.push({ ...f, x: f.x / f.n, y: f.y / f.n });
  } else
    for (const b of e)
      b.tsMs < s || b.tsMs > o || b.price < a || b.price > r || c.push({
        x: l(b.tsMs),
        y: i(b.price),
        n: 1,
        size: b.size,
        buy: b.buy ? b.size : 0,
        sell: b.buy ? 0 : b.size
      });
  for (const b of c) {
    const T = Math.min(16, Math.max(2.5, Math.sqrt(b.size) * 0.9 * h.scale)), v = b.buy + b.sell, f = v > 0 ? b.buy / v : 0.5, g = -Math.PI / 2;
    if (t.beginPath(), t.moveTo(b.x, b.y), t.arc(b.x, b.y, T, g, g + f * Math.PI * 2), t.closePath(), t.fillStyle = ct, t.fill(), f < 1 && (t.beginPath(), t.moveTo(b.x, b.y), t.arc(b.x, b.y, T, g + f * Math.PI * 2, g + Math.PI * 2), t.closePath(), t.fillStyle = ht, t.fill()), h.mode !== "solid") {
      const w = t.createRadialGradient(
        b.x - T * 0.35,
        b.y - T * 0.42,
        T * 0.1,
        b.x,
        b.y,
        T
      );
      w.addColorStop(0, "rgba(255, 255, 255, 0.5)"), w.addColorStop(0.45, "rgba(255, 255, 255, 0.08)"), w.addColorStop(0.85, "rgba(0, 0, 0, 0.18)"), w.addColorStop(1, "rgba(0, 0, 0, 0.5)"), t.beginPath(), t.arc(b.x, b.y, T, 0, Math.PI * 2), t.fillStyle = w, t.fill();
    }
    if (t.lineWidth = 1, t.strokeStyle = "rgba(0, 0, 0, 0.55)", t.beginPath(), t.arc(b.x, b.y, T, 0, Math.PI * 2), t.stroke(), h.bigK > 0 && h.bigMedian > 0 && b.size >= h.bigK * h.bigMedian) {
      const w = b.buy >= b.sell;
      t.beginPath(), t.arc(b.x, b.y, T + 3, 0, Math.PI * 2), t.lineWidth = 1.5, t.strokeStyle = w ? "rgba(38, 166, 154, 0.95)" : "rgba(239, 83, 80, 0.95)", t.stroke();
      const u = `${w ? "+" : "−"}${$e(b.size)}`;
      t.font = `700 ${jt}`;
      const x = t.measureText(u).width + 8;
      let _ = b.x + T + 6;
      _ + x > h.fieldW - 2 && (_ = b.x - T - 6 - x);
      const p = Math.min(h.cssH - 16, Math.max(2, b.y - 8));
      t.fillStyle = w ? "rgba(38, 166, 154, 0.92)" : "rgba(239, 83, 80, 0.92)", t.fillRect(_, p, x, 14), t.fillStyle = "#08131a", t.fillText(u, _ + 4, p + 10);
    }
  }
  t.restore();
}
function Nt(t, e, s, o, a, r, l, i, h, c) {
  const T = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 36e5].find((g) => g / h >= 18) ?? 36e5, v = /* @__PURE__ */ new Map();
  for (const g of e) {
    if (g.tsMs < s || g.tsMs > o || g.price < a || g.price > r) continue;
    const w = Math.floor(g.tsMs / T);
    let u = v.get(w);
    u || (u = { o: g.price, h: g.price, l: g.price, c: g.price }, v.set(w, u)), u.h = Math.max(u.h, g.price), u.l = Math.min(u.l, g.price), u.c = g.price;
  }
  const f = Math.min(9, Math.max(2, T / h * 0.6));
  t.save(), t.globalAlpha = 0.92;
  for (const [g, w] of v) {
    const u = l(g * T + T / 2);
    if (u < -f || u > c + f) continue;
    const _ = w.c >= w.o ? ct : ht;
    t.strokeStyle = _, t.fillStyle = _, t.lineWidth = 1, t.beginPath(), t.moveTo(Math.round(u) + 0.5, i(w.h)), t.lineTo(Math.round(u) + 0.5, i(w.l)), t.stroke();
    const p = i(w.o), E = i(w.c), d = Math.min(p, E);
    t.fillRect(u - f / 2, d, f, Math.max(1, Math.abs(p - E)));
  }
  t.restore();
}
const Lt = 78, Ut = 16, dt = "9px ui-monospace, Menlo, Consolas, monospace";
function zt(t, e, s, o, a, r, l, i, h) {
  t.fillStyle = "#0a0d12", t.fillRect(0, l, h, i - l), t.strokeStyle = "#232a35", t.beginPath(), t.moveTo(0, Math.round(l) + 0.5), t.lineTo(h, Math.round(l) + 0.5), t.stroke();
  const c = i - Ut - 2, b = c - l - 14;
  if (b < 8) return;
  const v = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 36e5].find((d) => d / r >= 5) ?? 36e5, f = /* @__PURE__ */ new Map();
  let g = 0;
  for (const d of e) {
    if (d.tsMs < s || d.tsMs > o) continue;
    const k = Math.floor(d.tsMs / v);
    let C = f.get(k);
    C || (C = { b: 0, s: 0 }, f.set(k, C)), d.buy ? C.b += d.size : C.s += d.size, g = Math.max(g, C.b, C.s);
  }
  const w = [...f.keys()].sort((d, k) => d - k);
  let u = 0, x = 0, _ = 0;
  const p = [];
  for (const d of w) {
    const k = f.get(d);
    u += k.b - k.s, p.push([d, u]), x = Math.min(x, u), _ = Math.max(_, u);
  }
  t.font = "600 8px ui-monospace, Menlo, monospace";
  const E = Math.floor(s / v) * v;
  for (let d = E; d <= o; d += v) {
    const k = a(d), C = a(d + v);
    if (C < -4 || k > h + 4) continue;
    const O = C - k, L = f.get(Math.floor(d / v));
    if (!L) continue;
    const q = Math.max(1, O * 0.36), N = k + O / 2, I = g > 0 ? L.s / g * b : 0, $ = g > 0 ? L.b / g * b : 0;
    t.fillStyle = "rgba(239, 83, 80, 0.85)", t.fillRect(N - q - 0.5, c - I, q, I), t.fillStyle = "rgba(100, 165, 240, 0.85)", t.fillRect(N + 0.5, c - $, q, $), O >= 26 && (t.textAlign = "center", t.fillStyle = "rgba(255, 150, 147, 0.9)", t.fillText($e(L.s), N - q / 2, c - I - 3), t.fillStyle = "rgba(147, 197, 253, 0.9)", t.fillText($e(L.b), N + q / 2 + 1, c - $ - 3));
  }
  if (p.length > 1 && _ > x && (t.strokeStyle = "rgba(226, 238, 255, 0.6)", t.lineWidth = 1, t.beginPath(), p.forEach(([d, k], C) => {
    const O = a(d * v + v / 2), L = c - 2 - (k - x) / (_ - x) * (b - 4);
    C === 0 ? t.moveTo(O, L) : t.lineTo(O, L);
  }), t.stroke()), u !== 0) {
    const d = `CVD ${u > 0 ? "+" : "−"}${$e(Math.abs(u))}`;
    t.font = `700 ${dt}`;
    const k = t.measureText(d).width + 8;
    t.fillStyle = "rgba(10, 13, 18, 0.85)", t.fillRect(h - k - 4, l + 3, k, 13), t.fillStyle = u > 0 ? "#26a69a" : "#ef5350", t.fillText(d, h - k, l + 13);
  }
  t.textAlign = "left";
}
function Ft(t, e, s, o) {
  let a = 0, r = 0;
  for (const g of e)
    g.tsMs < s || g.tsMs > o || (g.buy ? a += g.size : r += g.size);
  const l = a + r, i = l > 0 ? (a - r) / l : 0, h = l > 0 ? (a - r) / l : 0, c = 178, b = 44, T = 8, v = 8;
  t.save(), t.fillStyle = "rgba(10, 13, 18, 0.78)", t.fillRect(T, v, c, b), t.strokeStyle = "#232a35", t.strokeRect(T + 0.5, v + 0.5, c - 1, b - 1);
  const f = (g, w, u, x) => {
    t.font = `700 ${dt}`, t.fillStyle = "#8b96a5", t.fillText(g, T + 8, x + 7);
    const _ = T + 40, p = 92, E = 6;
    t.fillStyle = "rgba(239, 83, 80, 0.55)", t.fillRect(_, x, p / 2, E), t.fillStyle = "rgba(38, 166, 154, 0.55)", t.fillRect(_ + p / 2, x, p / 2, E);
    const d = _ + p / 2 + (u ? w * (p / 2 - 2) : 0);
    t.fillStyle = u ? "#eef1f6" : "#5c6672", t.fillRect(d - 1, x - 2, 2, E + 4), t.textAlign = "right", t.fillStyle = u ? w >= 0 ? "#26a69a" : "#ef5350" : "#5c6672", t.fillText(u ? `${w >= 0 ? "+" : "−"}${Math.abs(Math.round(w * 100))}%` : "—", T + c - 8, x + 7), t.textAlign = "left";
  };
  f("IMB", i, l > 0, v + 8), f("CVD", h, l > 0, v + 26), t.restore();
}
function It(t) {
  return t >= 1e3 ? `${(t / 1e3).toFixed(1)}k` : t >= 100 ? t.toFixed(0) : t >= 1 ? t.toFixed(1) : t.toPrecision(2);
}
function Ot(t) {
  return t >= 1e3 ? t.toFixed(1) : t >= 1 ? t.toFixed(2) : Bt(t);
}
function Bt(t) {
  return t.toPrecision(4);
}
function $t(t, e, s, o) {
  const { bids: a, asks: r } = s.sorted();
  if (!a.length && !r.length) return;
  const l = (_) => e.fH / 2 - (_ - e.centre) * e.ppu, i = o.activeRange > 0, h = [...a, ...r].filter(([_]) => _ >= e.lo && _ <= e.hi).map(([_]) => _).sort((_, p) => _ - p);
  let c = 8;
  if (h.length >= 2) {
    const _ = [];
    for (let p = 1; p < h.length; p++)
      _.push(h[p] - h[p - 1]);
    _.sort((p, E) => p - E), c = Math.min(20, Math.max(2.5, e.ppu * _[_.length >> 1]));
  }
  let b = 0;
  for (const [_, p] of [...a, ...r])
    _ >= e.lo && _ <= e.hi && (b = Math.max(b, p));
  const T = e.fieldW + 5, v = e.fieldW + 46, f = 22, g = e.cssW - 4, w = (_, p, E, d, k) => {
    const C = l(_);
    if (C < -c || C > e.fH + c) return;
    const O = C - c / 2, L = b > 0 ? Math.max(1.5, p / b * f) : 1.5;
    t.fillStyle = E === "bid" ? d ? "rgba(38,166,154,0.18)" : "rgba(38, 166, 154, 0.68)" : d ? "rgba(239,83,80,0.18)" : "rgba(239, 83, 80, 0.68)", t.fillRect(v, O, L, Math.max(1, c - 1)), t.font = k ? "700 9px ui-monospace, Menlo, monospace" : "9px ui-monospace, Menlo, monospace", t.textAlign = "left", t.fillStyle = d ? "#4a5260" : k ? E === "bid" ? "#26a69a" : "#ef5350" : "#8b96a5", t.fillText(Ot(_), T, C + 3), t.textAlign = "right", t.fillStyle = d ? "#4a5260" : E === "bid" ? "#9fd6cd" : "#f4b3ae", t.fillText(It(p), g, C + 3);
  }, u = a.length ? a[0][0] : null, x = r.length ? r[0][0] : null;
  if (a.forEach(([_, p], E) => {
    w(_, p, "bid", i && E >= o.activeRange, _ === u);
  }), r.forEach(([_, p], E) => {
    w(_, p, "ask", i && E >= o.activeRange, _ === x);
  }), i) {
    t.strokeStyle = "rgba(255, 179, 0, 0.75)", t.setLineDash([3, 3]);
    const _ = [];
    a.length && o.activeRange <= a.length && _.push(l(a[o.activeRange - 1][0]) + c / 2 + 1), r.length && o.activeRange <= r.length && _.push(l(r[o.activeRange - 1][0]) - c / 2 - 1);
    for (const p of _)
      p < 0 || p > e.fH || (t.beginPath(), t.moveTo(e.fieldW, p), t.lineTo(e.cssW, p), t.stroke());
    t.setLineDash([]);
  }
  t.textAlign = "left";
}
const Ze = 14400, Xt = 220, Ht = 58, Wt = 96, Gt = 228;
class qt {
  // data
  cols = [];
  state = /* @__PURE__ */ new Map();
  // carried book field
  stateSide = /* @__PURE__ */ new Map();
  // which side carries it
  stateTs = /* @__PURE__ */ new Map();
  cur = /* @__PURE__ */ new Map();
  // live column overlay
  curSide = /* @__PURE__ */ new Map();
  curTsMs = null;
  dots = [];
  bookBid = null;
  bookAsk = null;
  lastTradePrice = null;
  lastTradeBuy = !0;
  bookSource = null;
  // V4 fused ladder
  tsLog = [];
  tsVersion = 0;
  recentSizes = [];
  // rolling window for the big-trade median
  bigMedian = 0;
  lastEventTs = 0;
  // view
  msPerPx = 8;
  // time zoom
  rightOffsetPx = 40;
  // live edge sits this far from the right
  follow = !0;
  // auto-scroll with the live edge
  priceCenter = null;
  pxPerUnit = null;
  // null = auto price fit
  basePpu = null;
  // first-fit zoom reference (S4)
  recenterTarget = null;
  // S9 eased recentering
  hover = null;
  syncedCrosshair = null;
  // Last painted viewport — the COB column (S8) pixel-aligns against it.
  viewLo = 0;
  viewHi = 1;
  viewCentre = 0.5;
  viewPpu = 1;
  viewH = 0;
  viewVersion = 0;
  // bumped on every painted frame
  // colour
  settings;
  luts;
  lo = 0;
  hi = 1;
  sizeSample = [];
  // canvas plumbing
  canvas = null;
  ctx = null;
  off;
  offCtx;
  glow;
  glowCtx;
  raf = 0;
  dirty = !0;
  dpr = 1;
  cssW = 0;
  cssH = 0;
  disposed = !1;
  onHoverTime = null;
  constructor(e) {
    this.settings = e, this.luts = Be(e), this.off = document.createElement("canvas"), this.offCtx = this.off.getContext("2d"), this.glow = document.createElement("canvas"), this.glowCtx = this.glow.getContext("2d");
  }
  // ── public API ─────────────────────────────────────────────────────────
  attach(e) {
    this.canvas = e, this.ctx = e.getContext("2d"), new ResizeObserver(() => this.resize()).observe(e), this.resize();
    const o = () => {
      this.disposed || (this.dirty && this.paint(), this.raf = requestAnimationFrame(o));
    };
    this.raf = requestAnimationFrame(o);
  }
  dispose() {
    this.disposed = !0, cancelAnimationFrame(this.raf), this.canvas = null, this.ctx = null;
  }
  resize() {
    if (!this.canvas) return;
    const e = this.canvas.getBoundingClientRect();
    this.dpr = window.devicePixelRatio || 1, this.cssW = Math.max(50, e.width), this.cssH = Math.max(50, e.height), this.canvas.width = Math.round(this.cssW * this.dpr), this.canvas.height = Math.round(this.cssH * this.dpr), this.dirty = !0;
  }
  /** The heat field's right edge: the price axis gutter is permanent; in
   * fused ladder mode (V4) it widens to carry the ladder figures. */
  fieldW() {
    const e = this.settings.ladderMode === "fused" ? Wt : Ht;
    return Math.max(50, this.cssW - e);
  }
  /** V4: the pane's ClientBook feeds the fused ladder (same data as the
   * panel mode, so both modes always agree). */
  setBookSource(e) {
    this.bookSource = e, this.dirty = !0;
  }
  /** V4: unfiltered print log for the time & sales drawer. */
  getTsLog() {
    return { version: this.tsVersion, rows: this.tsLog };
  }
  /** V3: the bottom context stack (volume + CVD) reserves real height so
   * the field and the strips never fight for pixels. */
  subH() {
    return this.settings.subpanes ? Lt : 0;
  }
  /** The field's drawable height (full canvas minus the context stack). */
  fieldH() {
    return Math.max(40, this.cssH - this.subH());
  }
  setSettings(e) {
    this.settings = e, this.luts = Be(e, this.effSmoothing()), this.dirty = !0;
  }
  /** S4: resolved vertical-smoothing shade count (0 = no quantization).
   * Auto = zoom-adaptive: the tighter the price zoom, the finer the bands. */
  effSmoothing() {
    const e = this.settings;
    if (e.smoothingMode === "none") return 0;
    if (e.smoothingMode === "manual")
      return Math.min(20, Math.max(0, Math.round(e.smoothing)));
    const s = this.pxPerUnit ?? this.basePpu ?? 0;
    if (!s || !this.basePpu) return 24;
    const o = Math.max(0.02, s / this.basePpu);
    return Math.min(64, Math.max(4, Math.round(24 / Math.sqrt(o))));
  }
  setSyncedCrosshair(e) {
    this.syncedCrosshair !== e && (this.syncedCrosshair = e, this.dirty = !0);
  }
  /** Bulk history ingest (pane open, or a loaded recording). Deterministic
   * fold over the events; the dot trail belongs to the new timeline. */
  ingestHistory(e) {
    this.cols = [], this.state.clear(), this.stateSide.clear(), this.stateTs.clear(), this.cur.clear(), this.curSide.clear(), this.curTsMs = null, this.sizeSample = [], this.dots = [], this.tsLog = [], this.tsVersion = 0, this.recentSizes = [], this.bigMedian = 0, this.lastTradePrice = null;
    for (const s of e) this.foldEvent(s, !0);
    this.flushColumn(), this.recalcCutoffs(), this.follow = !0, this.priceCenter = null, this.pxPerUnit = null, this.dirty = !0;
  }
  /** One live depth frame (already coalesced engine-side). */
  applyDepth(e) {
    this.foldEvent(e, !1), this.sizeSample.length > 6e4 && (this.sizeSample = this.sizeSample.slice(-3e4), this.recalcCutoffs()), this.dirty = !0;
  }
  addTrade(e) {
    const s = e.side === "BUY" || e.side === "INFERRED-BUY";
    if (this.tsLog.push({ ts: e.ts, price: e.price, size: e.size, buy: s }), this.tsLog.length > 2e3 && this.tsLog.splice(0, this.tsLog.length - 1500), this.tsVersion += 1, !(e.size <= (this.settings.dotMinSize || 0))) {
      if (this.dots.push({ tsMs: e.ts * 1e3, price: e.price, size: e.size, buy: s }), this.dots.length > 5e3 && this.dots.splice(0, this.dots.length - 4e3), this.recentSizes.push(e.size), this.recentSizes.length > 1024 && this.recentSizes.splice(0, this.recentSizes.length - 512), this.recentSizes.length % 64 === 0 || this.bigMedian === 0) {
        const o = [...this.recentSizes].sort((a, r) => a - r);
        this.bigMedian = o[Math.floor(o.length / 2)] ?? 0;
      }
      this.lastTradePrice = e.price, this.lastTradeBuy = s, this.settings.recenterMode === "trades" && this.requestRecenter(e.price), this.dirty = !0;
    }
  }
  setBook(e, s) {
    if (this.bookBid = e, this.bookAsk = s, this.settings.recenterMode === "bbo") {
      const o = e !== null && s !== null ? (e + s) / 2 : e ?? s;
      o !== null && this.requestRecenter(o);
    }
    this.dirty = !0;
  }
  /** S9 auto-recentering: engage only when the anchor drifts beyond the
   * tolerance fraction of the visible half-range (prevents jitter). The
   * actual motion is eased in the paint loop; manual interaction cancels. */
  requestRecenter(e) {
    if (this.priceCenter === null || this.pxPerUnit === null) return;
    const o = this.fieldH() / 2 / this.pxPerUnit * Math.min(90, Math.max(1, this.settings.recenterTolerance)) / 100;
    Math.abs(e - this.priceCenter) > o && (this.recenterTarget = e, this.dirty = !0);
  }
  // ── interaction ───────────────────────────────────────────────────────
  wheel(e, s, o) {
    if (this.recenterTarget = null, o) {
      const a = Math.exp(-s * 1e-3);
      this.pxPerUnit = (this.pxPerUnit ?? this.autoPxPerUnit()) * a, this.settings.smoothingMode === "auto" && (this.luts = Be(this.settings, this.effSmoothing()));
    } else {
      const a = Math.exp(s * 1e-3);
      this.msPerPx = Math.min(120, Math.max(0.5, this.msPerPx * a)), this.follow = !1;
    }
    this.dirty = !0;
  }
  drag(e, s) {
    this.recenterTarget = null, this.follow = !1, this.priceCenter = (this.priceCenter ?? this.autoPriceCenter()) + s / (this.pxPerUnit ?? this.autoPxPerUnit()), this.rightOffsetPx += e, this.rightOffsetPx = Math.max(-this.cssW, this.rightOffsetPx), this.dirty = !0;
  }
  recenter() {
    this.follow = !0, this.priceCenter = null, this.pxPerUnit = null, this.recenterTarget = null, this.dirty = !0;
  }
  setHover(e, s) {
    this.hover = e === null || s === null ? null : { x: e, y: s }, this.onHoverTime && this.onHoverTime(this.hover ? this.xToTs(this.hover.x) : null), this.dirty = !0;
  }
  // ── data folding (mirror of engine/orderflow/grid.py) ──────────────────
  columnMs() {
    return 1e3;
  }
  foldEvent(e, s) {
    const o = Math.floor(e.ts * 1e3), a = Math.floor(o / this.columnMs()) * this.columnMs();
    for (this.curTsMs === null && (this.curTsMs = a); a > this.curTsMs; ) this.advanceColumn();
    for (const [r, l] of e.bids) this.patchLevel(r, l, 0, s);
    for (const [r, l] of e.asks) this.patchLevel(r, l, 1, s);
    this.lastEventTs = Math.max(this.lastEventTs, o);
  }
  patchLevel(e, s, o, a) {
    const r = Math.round(e * 1e6) / 1e6;
    this.cur.set(r, s), s > 0 && this.curSide.set(r, o), s > 0 && a && this.sizeSample.length < 6e4 && this.sizeSample.push(s);
  }
  advanceColumn() {
    this.flushColumn(), this.curTsMs = (this.curTsMs ?? 0) + this.columnMs();
  }
  flushColumn() {
    if (this.curTsMs === null) return;
    for (const [l, i] of this.cur)
      i <= 0 ? (this.state.delete(l), this.stateSide.delete(l), this.stateTs.delete(l)) : (this.state.set(l, i), this.stateSide.set(l, this.curSide.get(l) ?? 0), this.stateTs.set(l, this.curTsMs));
    if (this.cur.clear(), this.curSide.clear(), this.state.size > 4096) {
      const l = [...this.stateTs.entries()].sort((h, c) => c[1] - h[1]).slice(0, 4096).map(([h]) => h), i = new Set(l);
      for (const h of [...this.state.keys()])
        i.has(h) || (this.state.delete(h), this.stateSide.delete(h), this.stateTs.delete(h));
    }
    const e = [...this.state.keys()].sort((l, i) => l - i), s = e.map((l) => this.state.get(l)), o = e.map((l) => this.stateSide.get(l) ?? 0);
    let a = null, r = null;
    for (let l = 0; l < e.length; l++)
      o[l] === 0 ? a = e[l] : r = r === null ? e[l] : r;
    this.cols.push({
      tsMs: this.curTsMs,
      keys: Float64Array.from(e),
      sizes: Float64Array.from(s),
      sides: Uint8Array.from(o),
      bb: a,
      ba: r
    }), this.cols.length > Ze && this.cols.splice(0, this.cols.length - Ze);
  }
  recalcCutoffs() {
    [this.lo, this.hi] = Et(
      this.sizeSample,
      this.settings.cutoffMode,
      this.settings.cutoffLower,
      this.settings.cutoffUpper
    );
  }
  /** Recompute cut-offs from the rolling session sample (called by pane). */
  refreshCutoffs() {
    this.recalcCutoffs(), this.dirty = !0;
  }
  /** The resolved cut-off sizes [lo, hi] — the settings window shows them
   * next to the percentile controls so the mapping stays tangible. */
  getCutoffs() {
    return [this.lo, this.hi];
  }
  /** Viewport metrics for the COB column (S8): the ladder pixel-aligns its
   * rows with the heatmap's price axis. `version` bumps every painted frame
   * so the ladder knows when to redraw without sharing React state. */
  getViewMetrics() {
    const e = this.viewCentre, s = this.viewPpu, o = this.viewH;
    return {
      lo: this.viewLo,
      hi: this.viewHi,
      centre: e,
      ppu: s,
      cssH: o,
      version: this.viewVersion,
      yOf: (a) => o / 2 - (a - e) * s
    };
  }
  // ── coordinate mapping ─────────────────────────────────────────────────
  liveEdgeMs() {
    return this.cols.length ? this.cols[this.cols.length - 1].tsMs + this.columnMs() : Date.now();
  }
  rightEdgeTs() {
    return this.liveEdgeMs() + this.rightOffsetPx * this.msPerPx;
  }
  tsToX(e) {
    return this.fieldW() - (this.rightEdgeTs() - e) / this.msPerPx;
  }
  xToTs(e) {
    return this.rightEdgeTs() - (this.fieldW() - e) * this.msPerPx;
  }
  visiblePriceRange() {
    if (this.priceCenter !== null && this.pxPerUnit !== null) {
      const r = this.fieldH() / 2 / this.pxPerUnit;
      return [this.priceCenter - r, this.priceCenter + r];
    }
    let e = 1 / 0, s = -1 / 0;
    const o = this.liveEdgeMs() - Math.min(this.fieldW(), 600) * this.msPerPx;
    for (let r = this.cols.length - 1; r >= 0; r--) {
      const l = this.cols[r];
      if (l.tsMs < o) break;
      l.keys.length && (e = Math.min(e, l.keys[0]), s = Math.max(s, l.keys[l.keys.length - 1]));
    }
    this.bookBid !== null && (e = Math.min(e, this.bookBid)), this.bookAsk !== null && (s = Math.max(s, this.bookAsk)), (!isFinite(e) || !isFinite(s)) && (e = 0, s = 1), s <= e && (s = e + 1);
    const a = (s - e) * 0.08;
    return [e - a, s + a];
  }
  autoPriceCenter() {
    const [e, s] = this.visiblePriceRange();
    return (e + s) / 2;
  }
  autoPxPerUnit() {
    const [e, s] = this.visiblePriceRange();
    return this.fieldH() / Math.max(s - e, 1e-9);
  }
  // ── painting ───────────────────────────────────────────────────────────
  paint() {
    this.dirty = !1;
    const e = this.ctx;
    if (!e || !this.cssW || !this.cssH || (e.setTransform(this.dpr, 0, 0, this.dpr, 0, 0), e.fillStyle = "#0b0e11", e.fillRect(0, 0, this.cssW, this.cssH), !this.cols.length)) return;
    if (this.recenterTarget !== null && this.priceCenter !== null) {
      const p = this.recenterTarget - this.priceCenter, E = Math.max(
        1e-9,
        this.fieldH() / 2 / (this.pxPerUnit ?? 1) / 240
      );
      Math.abs(p) <= E ? (this.priceCenter = this.recenterTarget, this.recenterTarget = null) : (this.priceCenter += p * 0.14, this.dirty = !0);
    }
    const [s, o] = this.visiblePriceRange(), a = this.fieldH(), r = this.pxPerUnit ?? a / Math.max(o - s, 1e-9);
    this.basePpu === null && (this.basePpu = r);
    const l = this.priceCenter ?? (s + o) / 2, i = (p) => a / 2 - (p - l) * r;
    this.viewLo = s, this.viewHi = o, this.viewCentre = l, this.viewPpu = r, this.viewH = a, this.viewVersion += 1;
    const h = this.fieldW(), c = this.settings.subpanes, b = this.xToTs(0), T = this.xToTs(h);
    let v = this.lowerBound(b), f = this.lowerBound(T);
    f = Math.min(f, this.cols.length), this.follow && this.rightOffsetPx <= 0 && (this.rightOffsetPx = 0);
    const g = c ? this.cssH - 14 : a;
    this.settings.view === "footprint" ? (this.paintFootprint(e, b, T, s, o, i, a), Qe(
      e,
      h,
      g,
      (p) => this.tsToX(p),
      b,
      T,
      this.niceTimeStep(h * this.msPerPx)
    )) : this.paintHeatField(e, v, f, b, T, s, o, i, h, a, g), c && (zt(
      e,
      this.dots,
      b,
      T,
      (p) => this.tsToX(p),
      this.msPerPx,
      a,
      this.cssH,
      h
    ), this.settings.view === "heat" && Ft(e, this.dots, b, T));
    const w = (p, E) => {
      if (p === null || p < s || p > o) return;
      const d = i(p);
      e.strokeStyle = E, e.setLineDash([4, 3]), e.beginPath(), e.moveTo(0, d), e.lineTo(h, d), e.stroke(), e.setLineDash([]);
    };
    if (w(this.bookBid, "rgba(38, 166, 154, 0.55)"), w(this.bookAsk, "rgba(239, 83, 80, 0.55)"), this.syncedCrosshair !== null) {
      const p = this.tsToX(this.syncedCrosshair);
      p >= 0 && p <= h && (e.strokeStyle = "rgba(150, 160, 175, 0.55)", e.setLineDash([3, 3]), e.beginPath(), e.moveTo(p, 0), e.lineTo(p, a), e.stroke(), e.setLineDash([]));
    }
    if (this.hover) {
      const { x: p, y: E } = this.hover;
      p <= h && E <= a && (e.strokeStyle = "rgba(150, 160, 175, 0.45)", e.setLineDash([3, 3]), e.beginPath(), e.moveTo(p, 0), e.lineTo(p, a), e.moveTo(0, E), e.lineTo(h, E), e.stroke(), e.setLineDash([]));
      const d = l + (a / 2 - E) / r;
      e.fillStyle = "rgba(30, 34, 41, 0.95)", e.fillRect(h - 74, E - 9, 72, 18), e.fillStyle = "#d1d4dc", e.font = "10px monospace", e.textAlign = "right", e.fillText(d.toPrecision(6), h - 6, E + 3);
      const C = new Date(this.xToTs(p)).toISOString().slice(11, 19);
      e.fillRect(Math.min(p, h - 30) - 28, this.cssH - 16, 56, 15), e.textAlign = "center", e.fillText(C, Math.min(p, h - 30), this.cssH - 5);
    }
    e.fillStyle = "rgba(150,160,175,0.7)", e.font = "9px monospace", e.textAlign = "left";
    const u = this.niceTimeStep(h * this.msPerPx), x = Math.ceil(b / u) * u;
    for (let p = x; p <= T; p += u) {
      const E = this.tsToX(p);
      if (E > h - 52) continue;
      const d = new Date(p);
      e.fillText(d.toISOString().slice(11, 19), E + 2, this.cssH - 4), e.fillRect(E, this.cssH - 14, 1, 4);
    }
    const _ = this.settings.ladderMode === "fused";
    Pt(e, {
      fieldW: h,
      cssW: this.cssW,
      cssH: this.cssH,
      centre: l,
      ppu: r,
      pLo: s,
      pHi: o,
      bookBid: this.bookBid,
      bookAsk: this.bookAsk,
      lastPrice: this.lastTradePrice,
      lastBuy: this.lastTradeBuy,
      fused: _
    }), _ && this.bookSource && $t(e, {
      fieldW: h,
      cssW: this.cssW,
      fH: a,
      centre: l,
      ppu: r,
      lo: s,
      hi: o
    }, this.bookSource, { activeRange: this.settings.activeRange });
  }
  /** V1+V2 heat field: intensity+side offscreen fold → per-side LUT
   * colourise → blit → glow → time grid → path → candles → bubbles →
   * volume strip. */
  paintHeatField(e, s, o, a, r, l, i, h, c, b, T) {
    const v = this.settings, f = Math.max(1, o - s), g = Xt, w = (i - l) / g;
    (this.off.width !== f || this.off.height !== g) && (this.off.width = f, this.off.height = g, this.glow.width = f, this.glow.height = g);
    const u = Math.min(1, Math.max(0.25, v.gamma || 1)), x = new Uint8ClampedArray(f * g), _ = new Uint8Array(f * g).fill(255);
    for (let N = 0; N < f; N++) {
      const I = this.cols[s + N], { keys: $, sizes: W, sides: J } = I;
      for (let ye = 0; ye < $.length; ye++) {
        const pe = $[ye];
        if (pe < l || pe > i) continue;
        const be = W[ye];
        if (be <= 0) continue;
        const de = Math.min(g - 1, Math.max(0, Math.floor((i - pe) / w))) * f + N, R = Rt(be, this.lo, this.hi, u);
        R > x[de] && (x[de] = R, _[de] = J[ye]);
      }
    }
    const p = this.offCtx.createImageData(f, g), E = this.glowCtx.createImageData(f, g), d = p.data, k = E.data;
    for (let N = 0; N < x.length; N++) {
      const I = _[N];
      if (I === 255) continue;
      const $ = I === 1 ? this.luts.ask : this.luts.bid, W = x[N] * 4, J = N * 4;
      d[J] = $[W], d[J + 1] = $[W + 1], d[J + 2] = $[W + 2], d[J + 3] = 255, x[N] >= Gt && (k[J] = $[W], k[J + 1] = $[W + 1], k[J + 2] = $[W + 2], k[J + 3] = 255);
    }
    this.offCtx.putImageData(p, 0, 0), this.glowCtx.putImageData(E, 0, 0);
    const C = this.tsToX(this.cols[s].tsMs), O = this.tsToX(this.cols[s].tsMs + f * this.columnMs()), L = h(i), q = h(l);
    if (e.imageSmoothingEnabled = v.smoothColumns, e.drawImage(this.off, C, L, Math.max(1, O - C), Math.max(1, q - L)), e.imageSmoothingEnabled = !1, v.glow && (e.save(), e.globalCompositeOperation = "lighter", e.globalAlpha = 0.38, "filter" in e && (e.filter = "blur(6px)"), e.imageSmoothingEnabled = !0, e.drawImage(this.glow, C, L, Math.max(1, O - C), Math.max(1, q - L)), e.restore()), Qe(
      e,
      c,
      T,
      (N) => this.tsToX(N),
      a,
      r,
      this.niceTimeStep(c * this.msPerPx)
    ), v.showPath && Dt(e, this.cols, s, o, (N) => this.tsToX(N), h, l, i), v.showCandles && Nt(
      e,
      this.dots,
      a,
      r,
      l,
      i,
      (N) => this.tsToX(N),
      h,
      this.msPerPx,
      c
    ), v.dots) {
      const N = v.dotType === "pie" ? "pie" : v.dotType === "solid" ? "solid" : "sphere";
      At(
        e,
        this.dots,
        a,
        r,
        l,
        i,
        (I) => this.tsToX(I),
        h,
        {
          alpha: Math.min(1, Math.max(0, v.dotAlpha)),
          scale: v.dotScale,
          mode: N,
          bigK: v.bigTradeK,
          bigMedian: this.bigMedian,
          fieldW: c,
          cssH: b
        }
      );
    }
  }
  /** Classic order-flow footprint: executed volume split by aggressor side
   * per price zone (rows) and time bucket (columns). Bucket width adapts to
   * the time zoom; zones snap to nice price steps. Imbalanced zones (≥3:1)
   * get a tinted backdrop; wide buckets print sell×buy figures. Prints
   * without a side never enter — the view stays honest about its data. */
  paintFootprint(e, s, o, a, r, l, i) {
    const c = [5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 36e5].find((d) => d / this.msPerPx >= 72) ?? 36e5, b = r - a, v = [
      1e-3,
      2e-3,
      5e-3,
      0.01,
      0.02,
      0.05,
      0.1,
      0.2,
      0.25,
      0.5,
      1,
      2,
      2.5,
      5,
      10,
      20,
      25,
      50,
      100,
      250,
      500,
      1e3
    ].find((d) => b / d <= 20) ?? b / 20, f = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map();
    let w = 0, u = 0;
    for (const d of this.dots) {
      if (d.tsMs < s || d.tsMs > o || d.price < a || d.price > r) continue;
      u += 1;
      const k = Math.floor(d.tsMs / c), C = Math.floor(d.price / v), O = k + ":" + C;
      let L = f.get(O);
      L || (L = { b: 0, s: 0 }, f.set(O, L)), d.buy ? L.b += d.size : L.s += d.size, w = Math.max(w, L.b, L.s);
      let q = g.get(k);
      q || (q = { b: 0, s: 0 }, g.set(k, q)), d.buy ? q.b += d.size : q.s += d.size;
    }
    if (!u) {
      e.fillStyle = "#5c6672", e.font = "11px ui-monospace, Menlo, monospace", e.textAlign = "center", e.fillText("no side-stamped prints in view", this.cssW / 2, i / 2 - 8), e.font = "10px ui-monospace, Menlo, monospace", e.fillText("the footprint builds from executed trades (demo and", this.cssW / 2, i / 2 + 10), e.fillText("crypto feeds carry sides; sources without prints stay blank)", this.cssW / 2, i / 2 + 24);
      return;
    }
    const x = (d) => d >= 1e3 ? `${(d / 1e3).toFixed(1)}k` : d >= 100 || d >= 10 ? d.toFixed(0) : d.toFixed(1), _ = this.fieldW(), p = Math.min(22, Math.max(9, v * this.viewPpu * 0.85)), E = Math.floor(s / c) * c;
    for (let d = E; d <= o; d += c) {
      const k = this.tsToX(d), C = this.tsToX(d + c);
      if (C < -4 || k > _ + 4) continue;
      const O = C - k, L = Math.floor(d / c), q = O >= 92, N = O / 2 - 4;
      e.strokeStyle = "rgba(30, 36, 47, 0.95)", e.beginPath(), e.moveTo(Math.round(C) + 0.5, 0), e.lineTo(Math.round(C) + 0.5, i), e.stroke();
      for (const [$, W] of f) {
        const [J, ye] = $.split(":");
        if (Number(J) !== L) continue;
        const pe = Number(ye), be = l((pe + 0.5) * v);
        if (be < -p || be > i + p) continue;
        const ce = be - (p - 2) / 2, de = W.b >= W.s * 3 && W.b > 0 ? 1 : W.s >= W.b * 3 && W.s > 0 ? -1 : 0;
        de !== 0 && (e.fillStyle = de > 0 ? "rgba(38, 166, 154, 0.13)" : "rgba(239, 83, 80, 0.13)", e.fillRect(k + 2, ce, O - 4, p - 2));
        const R = k + O / 2, A = w > 0 ? W.s / w * N : 0, H = w > 0 ? W.b / w * N : 0;
        e.fillStyle = "rgba(239, 83, 80, 0.75)", e.fillRect(R - 1 - A, ce, A, p - 2), e.fillStyle = "rgba(38, 166, 154, 0.75)", e.fillRect(R + 1, ce, H, p - 2), q && (e.font = "9px ui-monospace, Menlo, monospace", e.textAlign = "right", e.fillStyle = de < 0 ? "#ffc9c5" : "#b2807d", e.fillText(x(W.s), R - 4, be + 3), e.textAlign = "left", e.fillStyle = de > 0 ? "#b8f2e9" : "#7fa8a1", e.fillText(x(W.b), R + 4, be + 3));
      }
      const I = g.get(L);
      if (I) {
        const $ = I.b - I.s;
        e.font = "9px ui-monospace, Menlo, monospace", e.textAlign = "center", e.fillStyle = $ > 0 ? "#26a69a" : $ < 0 ? "#ef5350" : "#8b96a5", e.fillText(
          `Δ${$ >= 0 ? "+" : "−"}${x(Math.abs($))} · ${x(I.b + I.s)}`,
          k + O / 2,
          i - 6
        );
      }
    }
  }
  lowerBound(e) {
    let s = 0, o = this.cols.length;
    for (; s < o; ) {
      const a = s + o >> 1;
      this.cols[a].tsMs < e ? s = a + 1 : o = a;
    }
    return Math.max(0, s - 1);
  }
  niceTimeStep(e) {
    const s = [
      1e3,
      5e3,
      15e3,
      3e4,
      6e4,
      3e5,
      9e5,
      18e5,
      36e5,
      144e5,
      864e5
    ];
    for (const o of s) if (e / o <= 12) return o;
    return 864e5;
  }
}
function re({ label: t, children: e, hint: s }) {
  return /* @__PURE__ */ n.jsxs("div", { className: "dh-row", title: s, children: [
    /* @__PURE__ */ n.jsx("span", { className: "dh-label", children: t }),
    e
  ] });
}
function _e({ label: t, value: e, min: s, max: o, step: a, onChange: r, fmt: l, hint: i, disabled: h }) {
  return /* @__PURE__ */ n.jsxs("div", { className: "dh-row", style: h ? { opacity: 0.45 } : void 0, title: i, children: [
    /* @__PURE__ */ n.jsx("span", { className: "dh-label", children: t }),
    /* @__PURE__ */ n.jsx(
      "input",
      {
        className: "dh-slider",
        type: "range",
        min: s,
        max: o,
        step: a,
        value: e,
        disabled: h,
        onChange: (c) => r(Number(c.target.value))
      }
    ),
    /* @__PURE__ */ n.jsx("span", { className: "dh-value", children: (l ?? ((c) => c.toFixed(2)))(e) })
  ] });
}
function De({ options: t, value: e, onChange: s }) {
  return /* @__PURE__ */ n.jsx("div", { className: "dh-seg", role: "tablist", children: t.map((o) => /* @__PURE__ */ n.jsx(
    "button",
    {
      role: "tab",
      "aria-selected": o.id === e,
      className: o.id === e ? "on" : "",
      title: o.title,
      onClick: () => s(o.id),
      children: o.label
    },
    o.id
  )) });
}
function Ee({ on: t, onChange: e, label: s }) {
  return /* @__PURE__ */ n.jsx(
    "button",
    {
      className: `dh-toggle${t ? " on" : ""}`,
      role: "switch",
      "aria-checked": t,
      onClick: () => e(!t),
      title: s
    }
  );
}
function Ue({ value: t, onCommit: e, min: s, max: o, disabled: a, suffix: r }) {
  const [l, i] = Tt.useState(String(t));
  y.useEffect(() => {
    i(String(t));
  }, [t]);
  const h = () => {
    let c = Number(l);
    if (!isFinite(c)) {
      i(String(t));
      return;
    }
    s !== void 0 && (c = Math.max(s, c)), o !== void 0 && (c = Math.min(o, c)), i(String(c)), e(c);
  };
  return /* @__PURE__ */ n.jsxs("span", { style: { display: "inline-flex", alignItems: "center", gap: 4 }, children: [
    /* @__PURE__ */ n.jsx(
      "input",
      {
        className: "dh-num",
        value: l,
        disabled: a,
        onChange: (c) => i(c.target.value),
        onBlur: h,
        onKeyDown: (c) => {
          c.key === "Enter" && c.target.blur();
        }
      }
    ),
    r && /* @__PURE__ */ n.jsx("span", { className: "dh-hint", children: r })
  ] });
}
function Vt({ settings: t }) {
  const e = y.useRef(null);
  return y.useEffect(() => {
    const s = e.current;
    if (!s) return;
    s.width = 256, s.height = 14;
    const o = s.getContext("2d"), { ask: a, bid: r } = Be({ ...t }), l = o.createImageData(256, 14);
    for (let i = 0; i < 256; i++)
      for (let h = 0; h < 14; h++) {
        const c = h < 7 ? a : r, b = (h * 256 + i) * 4;
        l.data[b] = c[i * 4], l.data[b + 1] = c[i * 4 + 1], l.data[b + 2] = c[i * 4 + 2], l.data[b + 3] = 255;
      }
    o.putImageData(l, 0, 0);
  }, [
    t.scheme,
    t.intensity,
    t.dimming,
    t.contrast,
    t.brightness,
    t.gamma
  ]), /* @__PURE__ */ n.jsx("canvas", { ref: e });
}
function Yt({
  symbol: t,
  settings: e,
  cutoffRange: s,
  onChange: o,
  onClose: a
}) {
  y.useEffect(() => {
    const i = (h) => {
      h.key === "Escape" && a();
    };
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [a]);
  const r = e, l = y.useMemo(() => {
    if (!s) return null;
    const i = (h) => h >= 100 ? h.toFixed(0) : h >= 1 ? h.toFixed(2) : h.toPrecision(3);
    return `${i(s[0])} → ${i(s[1])}`;
  }, [s]);
  return /* @__PURE__ */ n.jsx("div", { className: "dh-backdrop", onMouseDown: a, children: /* @__PURE__ */ n.jsxs("div", { className: "dh-window", onMouseDown: (i) => i.stopPropagation(), children: [
    /* @__PURE__ */ n.jsxs("div", { className: "dh-head", children: [
      /* @__PURE__ */ n.jsx("span", { className: "dh-head-title", children: "DEPTH HEAT · SETTINGS" }),
      /* @__PURE__ */ n.jsx("span", { className: "dh-head-sym", children: t }),
      /* @__PURE__ */ n.jsx("button", { className: "dh-close", onClick: a, title: "Close (Esc)", children: "✕" })
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "dh-body", children: [
      /* @__PURE__ */ n.jsxs("div", { className: "dh-section", children: [
        /* @__PURE__ */ n.jsx("div", { className: "dh-section-title", children: "COLOUR" }),
        /* @__PURE__ */ n.jsx("div", { className: "dh-schemes", children: ot.map((i) => /* @__PURE__ */ n.jsxs(
          "button",
          {
            className: `dh-scheme${r.scheme === i ? " on" : ""}`,
            title: St(i),
            onClick: () => {
              o({ scheme: i }), r.applySchemeGlobally && (Ve(i, !0), window.dispatchEvent(new CustomEvent(
                Fe,
                { detail: { scheme: i, source: t } }
              )));
            },
            children: [
              /* @__PURE__ */ n.jsx("div", { className: "dh-scheme-name", children: i === "deepdom" ? "DEEPDOM" : i === "bookmap" ? "BOOKMAP" : i === "heat" ? "HEAT" : "GREYSCALE" }),
              /* @__PURE__ */ n.jsx(Vt, { settings: { ...r, scheme: i } })
            ]
          },
          i
        )) }),
        /* @__PURE__ */ n.jsx(
          _e,
          {
            label: "Intensity",
            value: r.intensity,
            min: 0,
            max: 2,
            step: 0.05,
            onChange: (i) => o({ intensity: i }),
            hint: "Chroma strength. 1 = true scheme colours, 0 = luminance only."
          }
        ),
        /* @__PURE__ */ n.jsx(
          _e,
          {
            label: "Dimming",
            value: r.dimming,
            min: 0,
            max: 0.9,
            step: 0.02,
            onChange: (i) => o({ dimming: i }),
            hint: "Dims the whole field toward black for dark rooms."
          }
        ),
        /* @__PURE__ */ n.jsxs(
          re,
          {
            label: "Apply scheme globally",
            hint: "Persists the colour scheme terminal-wide; every Depth Heat pane follows it.",
            children: [
              /* @__PURE__ */ n.jsx(Ee, { on: r.applySchemeGlobally, onChange: (i) => {
                Ve(r.scheme, i), o({ applySchemeGlobally: i }), window.dispatchEvent(new CustomEvent(
                  Fe,
                  { detail: { scheme: r.scheme, source: t } }
                ));
              } }),
              /* @__PURE__ */ n.jsx("span", { className: "dh-hint", children: "all symbols use this scheme" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "dh-section", children: [
        /* @__PURE__ */ n.jsx("div", { className: "dh-section-title", children: "FIELD & OVERLAYS" }),
        /* @__PURE__ */ n.jsx(
          _e,
          {
            label: "Intensity γ",
            value: r.gamma,
            min: 0.25,
            max: 1,
            step: 0.05,
            onChange: (i) => o({ gamma: i }),
            hint: "Perceptual exponent: <1 lifts small liquidity out of the dark and lets walls saturate (the reference feel). 1 = linear."
          }
        ),
        /* @__PURE__ */ n.jsx(
          re,
          {
            label: "Wall glow",
            hint: "Bloom pass over the hottest levels — walls burn against a calm field.",
            children: /* @__PURE__ */ n.jsx(Ee, { on: r.glow, onChange: (i) => o({ glow: i }) })
          }
        ),
        /* @__PURE__ */ n.jsx(
          re,
          {
            label: "Smooth columns",
            hint: "Bilinear blend between columns (watercolour feel). Off = crisp terminal columns.",
            children: /* @__PURE__ */ n.jsx(
              Ee,
              {
                on: r.smoothColumns,
                onChange: (i) => o({ smoothColumns: i })
              }
            )
          }
        ),
        /* @__PURE__ */ n.jsx(
          re,
          {
            label: "Price path",
            hint: "Stepped bid/ask lines from the carried book — the Bookmap/DeepDom signature overlay.",
            children: /* @__PURE__ */ n.jsx(Ee, { on: r.showPath, onChange: (i) => o({ showPath: i }) })
          }
        ),
        /* @__PURE__ */ n.jsxs(
          re,
          {
            label: "Candles over heat",
            hint: "OHLC candles derived from the executed print stream (trade-derived — no invented feed).",
            children: [
              /* @__PURE__ */ n.jsx(
                Ee,
                {
                  on: r.showCandles,
                  onChange: (i) => o({ showCandles: i })
                }
              ),
              /* @__PURE__ */ n.jsx("span", { className: "dh-hint", children: "trade-derived" })
            ]
          }
        ),
        /* @__PURE__ */ n.jsx(
          re,
          {
            label: "Context strips",
            hint: "V3 bottom stack sharing the time axis: buy/sell-split volume histogram + CVD line, and the Imb/Cvd gauges top-left.",
            children: /* @__PURE__ */ n.jsx(
              Ee,
              {
                on: r.subpanes,
                onChange: (i) => o({ subpanes: i })
              }
            )
          }
        ),
        /* @__PURE__ */ n.jsx(
          _e,
          {
            label: "Big-trade ×",
            value: r.bigTradeK,
            min: 2,
            max: 12,
            step: 1,
            onChange: (i) => o({ bigTradeK: i }),
            fmt: (i) => `${i.toFixed(0)}×med`,
            hint: "Prints at or above this multiple of the rolling median size get a ring + size tag."
          }
        )
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "dh-section", children: [
        /* @__PURE__ */ n.jsx("div", { className: "dh-section-title", children: "CUT-OFF" }),
        /* @__PURE__ */ n.jsxs(re, { label: "Mode", hint: "Percentile: relative to this session's sizes. Exact: fixed size thresholds.", children: [
          /* @__PURE__ */ n.jsx(
            De,
            {
              value: r.cutoffMode,
              onChange: (i) => o({ cutoffMode: i }),
              options: [
                { id: "percentile", label: "Percentile" },
                { id: "exact", label: "Exact size" }
              ]
            }
          ),
          l && /* @__PURE__ */ n.jsx("span", { className: "dh-hint", title: "Resolved cut-off sizes currently in effect", children: l })
        ] }),
        r.cutoffMode === "percentile" ? /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
          /* @__PURE__ */ n.jsx(
            _e,
            {
              label: "Lower",
              value: r.cutoffLower,
              min: 0,
              max: 99,
              step: 1,
              onChange: (i) => o({
                cutoffLower: i,
                cutoffUpper: Math.max(i + 1, r.cutoffUpper)
              }),
              fmt: (i) => `${i.toFixed(0)}%`,
              hint: "Sizes at/below this percentile render solid bottom colour."
            }
          ),
          /* @__PURE__ */ n.jsx(
            _e,
            {
              label: "Upper",
              value: r.cutoffUpper,
              min: 1,
              max: 100,
              step: 1,
              onChange: (i) => o({
                cutoffUpper: i,
                cutoffLower: Math.min(i - 1, r.cutoffLower)
              }),
              fmt: (i) => `${i.toFixed(0)}%`,
              hint: "Sizes at/above this percentile saturate to the top colour."
            }
          )
        ] }) : /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
          /* @__PURE__ */ n.jsx(re, { label: "Lower size", children: /* @__PURE__ */ n.jsx(
            Ue,
            {
              value: r.cutoffLower,
              min: 0,
              onCommit: (i) => o({
                cutoffLower: i,
                cutoffUpper: Math.max(i + 1e-9, r.cutoffUpper)
              })
            }
          ) }),
          /* @__PURE__ */ n.jsx(re, { label: "Upper size", children: /* @__PURE__ */ n.jsx(
            Ue,
            {
              value: r.cutoffUpper,
              min: 0,
              onCommit: (i) => o({
                cutoffUpper: i,
                cutoffLower: Math.min(i - 1e-9, r.cutoffLower)
              })
            }
          ) })
        ] }),
        /* @__PURE__ */ n.jsx("div", { className: "dh-row", children: /* @__PURE__ */ n.jsx("span", { className: "dh-hint", style: { marginLeft: 128 }, children: "The contrast slider above the pane narrows/widens this same window." }) })
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "dh-section", children: [
        /* @__PURE__ */ n.jsx("div", { className: "dh-section-title", children: "VERTICAL SMOOTHING" }),
        /* @__PURE__ */ n.jsx(re, { label: "Mode", hint: "Auto adapts the shade count to your price zoom.", children: /* @__PURE__ */ n.jsx(
          De,
          {
            value: r.smoothingMode,
            onChange: (i) => o({ smoothingMode: i }),
            options: [
              { id: "auto", label: "Auto" },
              { id: "manual", label: "Manual" },
              { id: "none", label: "None" }
            ]
          }
        ) }),
        /* @__PURE__ */ n.jsx(
          _e,
          {
            label: "Shades",
            value: r.smoothing,
            min: 0,
            max: 20,
            step: 1,
            disabled: r.smoothingMode !== "manual",
            onChange: (i) => o({ smoothing: i }),
            fmt: (i) => i < 2 ? "off" : i.toFixed(0),
            hint: "Number of flat gradient bands. 0–1 = no quantization."
          }
        )
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "dh-section", children: [
        /* @__PURE__ */ n.jsx("div", { className: "dh-section-title", children: "ADVANCED COLOUR" }),
        /* @__PURE__ */ n.jsx(
          _e,
          {
            label: "Contrast",
            value: r.contrast,
            min: -0.6,
            max: 1,
            step: 0.02,
            onChange: (i) => o({ contrast: i }),
            hint: "Final-output contrast around mid grey."
          }
        ),
        /* @__PURE__ */ n.jsx(
          _e,
          {
            label: "Brightness",
            value: r.brightness,
            min: -0.5,
            max: 0.5,
            step: 0.02,
            onChange: (i) => o({ brightness: i }),
            hint: "Final-output brightness offset."
          }
        )
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "dh-section", children: [
        /* @__PURE__ */ n.jsx("div", { className: "dh-section-title", children: "VOLUME DOTS" }),
        /* @__PURE__ */ n.jsx(re, { label: "Show executed trades", children: /* @__PURE__ */ n.jsx(Ee, { on: r.dots, onChange: (i) => o({ dots: i }) }) }),
        /* @__PURE__ */ n.jsx(
          re,
          {
            label: "Drawing type",
            hint: "Pie aggregates prints per price-time cell and splits the disc by aggressor-side volume.",
            children: /* @__PURE__ */ n.jsx(
              De,
              {
                value: r.dotType,
                onChange: (i) => o({ dotType: i }),
                options: [
                  { id: "gradient", label: /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
                    /* @__PURE__ */ n.jsx("span", { className: "dh-dotglyph gradient" }),
                    "Gradient"
                  ] }) },
                  { id: "solid", label: /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
                    /* @__PURE__ */ n.jsx("span", { className: "dh-dotglyph solid" }),
                    "Solid"
                  ] }) },
                  { id: "pie", label: /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
                    /* @__PURE__ */ n.jsx("span", { className: "dh-dotglyph pie" }),
                    "Pie"
                  ] }) }
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ n.jsx(re, { label: "Min accountable size", hint: "Prints below this size draw no dot.", children: /* @__PURE__ */ n.jsx(
          Ue,
          {
            value: r.dotMinSize,
            min: 0,
            disabled: !r.dots,
            onCommit: (i) => o({ dotMinSize: i })
          }
        ) }),
        /* @__PURE__ */ n.jsx(
          _e,
          {
            label: "Dot size",
            value: r.dotScale,
            min: 0.2,
            max: 3,
            step: 0.05,
            disabled: !r.dots,
            onChange: (i) => o({ dotScale: i })
          }
        ),
        /* @__PURE__ */ n.jsx(
          _e,
          {
            label: "Transparency",
            value: 1 - r.dotAlpha,
            min: 0,
            max: 0.95,
            step: 0.02,
            disabled: !r.dots,
            onChange: (i) => o({ dotAlpha: 1 - i }),
            fmt: (i) => `${Math.round(i * 100)}%`
          }
        )
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "dh-section", children: [
        /* @__PURE__ */ n.jsx("div", { className: "dh-section-title", children: "BOOK & MOTION" }),
        /* @__PURE__ */ n.jsx(
          re,
          {
            label: "Ladder",
            hint: "V4: fused puts the size figures + bars inside the price-axis gutter (Bookmap layout); panel keeps the separate COB column.",
            children: /* @__PURE__ */ n.jsx(
              De,
              {
                value: r.ladderMode,
                onChange: (i) => o({ ladderMode: i }),
                options: [
                  { id: "fused", label: "Fused", title: "Ladder in the axis gutter" },
                  { id: "panel", label: "Panel", title: "Separate COB column" }
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ n.jsx(
          re,
          {
            label: "Time & sales",
            hint: "V4 drawer: every executed print with min-size and ALL/BUY/SELL filters.",
            children: /* @__PURE__ */ n.jsx(
              Ee,
              {
                on: r.showTsPanel,
                onChange: (i) => o({ showTsPanel: i })
              }
            )
          }
        ),
        /* @__PURE__ */ n.jsxs(
          re,
          {
            label: "COB column",
            hint: "S8: the numeric DOM ladder beside the heatmap — per-level size + cumulative, spread and BBO rows.",
            children: [
              /* @__PURE__ */ n.jsx(Ee, { on: r.cob, onChange: (i) => o({ cob: i }) }),
              /* @__PURE__ */ n.jsx("span", { className: "dh-hint", style: { marginLeft: r.cob ? 0 : 8 }, children: "cumulative column" }),
              /* @__PURE__ */ n.jsx(
                Ee,
                {
                  on: r.cobCumulative,
                  onChange: (i) => o({ cobCumulative: i })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ n.jsxs(
          re,
          {
            label: "Active range",
            hint: "S6 override: expose only N levels around mid instead of the full transmitted book. Amber boundary lines mark the window on the COB column.",
            children: [
              /* @__PURE__ */ n.jsx(
                Ee,
                {
                  on: r.activeRange > 0,
                  onChange: (i) => o({ activeRange: i ? 10 : 0 })
                }
              ),
              /* @__PURE__ */ n.jsx(
                Ue,
                {
                  value: r.activeRange || 10,
                  min: 1,
                  max: 200,
                  disabled: r.activeRange === 0,
                  suffix: "levels",
                  onCommit: (i) => o({ activeRange: Math.round(i) })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ n.jsx(
          re,
          {
            label: "Auto-recenter",
            hint: "S9: glides the price axis back when the anchor drifts beyond tolerance. Double-click recenters instantly.",
            children: /* @__PURE__ */ n.jsx(
              De,
              {
                value: r.recenterMode,
                onChange: (i) => o({ recenterMode: i }),
                options: [
                  { id: "bbo", label: "On BBO", title: "Follow the bid/ask mid" },
                  { id: "trades", label: "On trades", title: "Follow the last print" },
                  { id: "off", label: "Off" }
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ n.jsx(
          _e,
          {
            label: "Tolerance",
            value: r.recenterTolerance,
            min: 1,
            max: 90,
            step: 1,
            disabled: r.recenterMode === "off",
            onChange: (i) => o({ recenterTolerance: i }),
            fmt: (i) => `${i.toFixed(0)}%`,
            hint: "Recenter only when the anchor drifts beyond this share of the visible range (prevents jitter)."
          }
        ),
        /* @__PURE__ */ n.jsxs(
          re,
          {
            label: "Depth reset",
            hint: "S11: how stale last-seen liquidity is dropped — per session, or on a fixed interval.",
            children: [
              /* @__PURE__ */ n.jsx(
                De,
                {
                  value: r.resetPolicy,
                  onChange: (i) => o({ resetPolicy: i }),
                  options: [
                    { id: "session", label: "Session" },
                    { id: "interval", label: "Interval" }
                  ]
                }
              ),
              /* @__PURE__ */ n.jsx(
                Ue,
                {
                  value: r.resetIntervalMin,
                  min: 1,
                  max: 1440,
                  disabled: r.resetPolicy !== "interval",
                  suffix: "min",
                  onCommit: (i) => o({ resetIntervalMin: Math.round(i) })
                }
              )
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "dh-foot", children: [
      /* @__PURE__ */ n.jsx(
        "button",
        {
          className: "dh-btn",
          onClick: () => o({ ...at }),
          children: "Reset to defaults"
        }
      ),
      /* @__PURE__ */ n.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ n.jsx("span", { className: "dh-hint", children: "changes apply live & save automatically" }),
      /* @__PURE__ */ n.jsx("button", { className: "dh-btn primary", onClick: a, children: "Done" })
    ] })
  ] }) });
}
const et = 1e-9;
class Ae {
  bids = /* @__PURE__ */ new Map();
  asks = /* @__PURE__ */ new Map();
  version = 0;
  static key(e) {
    return Math.round(e / et) * et;
  }
  apply(e) {
    for (const [s, o] of e.bids) {
      const a = Ae.key(s);
      o <= 0 ? this.bids.delete(a) : this.bids.set(a, o);
    }
    for (const [s, o] of e.asks) {
      const a = Ae.key(s);
      o <= 0 ? this.asks.delete(a) : this.asks.set(a, o);
    }
    this.version += 1;
  }
  /** Seed from the /api/orderflow/book snapshot shape. */
  seed(e, s) {
    this.bids.clear(), this.asks.clear();
    for (const [o, a] of e) a > 0 && this.bids.set(Ae.key(o), a);
    for (const [o, a] of s) a > 0 && this.asks.set(Ae.key(o), a);
    this.version += 1;
  }
  bestBid() {
    let e = null;
    for (const s of this.bids.keys()) (e === null || s > e) && (e = s);
    return e;
  }
  bestAsk() {
    let e = null;
    for (const s of this.asks.keys()) (e === null || s < e) && (e = s);
    return e;
  }
  /** Bids best-first, asks best-first (mirrors book.py's ranked views). */
  sorted() {
    return {
      bids: [...this.bids.entries()].sort((e, s) => s[0] - e[0]),
      asks: [...this.asks.entries()].sort((e, s) => e[0] - s[0])
    };
  }
}
function Kt(t) {
  return t >= 1e3 ? `${(t / 1e3).toFixed(1)}k` : t >= 100 ? t.toFixed(0) : t >= 1 ? t.toFixed(1) : t.toPrecision(2);
}
function Jt(t) {
  return t >= 1e3 ? t.toFixed(1) : t >= 1 ? t.toFixed(2) : t.toPrecision(4);
}
function Qt({
  rendererRef: t,
  book: e,
  settings: s,
  width: o = 148
}) {
  const a = y.useRef(null), r = y.useRef(s);
  return r.current = s, y.useEffect(() => {
    const l = a.current;
    if (!l) return;
    const i = l.getContext("2d");
    let h = 0, c = -1, b = -1, T = !1;
    const v = () => {
      const u = l.getBoundingClientRect(), x = window.devicePixelRatio || 1;
      l.width = Math.max(1, Math.round(u.width * x)), l.height = Math.max(1, Math.round(u.height * x)), c = -1;
    }, f = new ResizeObserver(v);
    f.observe(l), v();
    const g = () => {
      const u = t.current;
      if (!u) return;
      const x = u.getViewMetrics();
      if (x.version === c && e.version === b) return;
      c = x.version, b = e.version;
      const _ = window.devicePixelRatio || 1, p = l.width / _, E = l.height / _;
      i.setTransform(_, 0, 0, _, 0, 0), i.fillStyle = "#0d1117", i.fillRect(0, 0, p, E);
      const { bids: d, asks: k } = e.sorted();
      if (!d.length && !k.length) {
        i.fillStyle = "#5c6672", i.font = "10px monospace", i.textAlign = "center", i.fillText("no book", p / 2, E / 2);
        return;
      }
      const C = r.current, O = e.bestBid(), L = e.bestAsk(), q = C.activeRange > 0, N = [...d, ...k].filter(([R]) => R >= x.lo && R <= x.hi).map(([R]) => R).sort((R, A) => R - A);
      let I = 8;
      if (N.length >= 2) {
        const R = [];
        for (let A = 1; A < N.length; A++) R.push(N[A] - N[A - 1]);
        R.sort((A, H) => A - H), I = Math.min(20, Math.max(2.5, x.ppu * R[R.length >> 1]));
      }
      let $ = 0, W = 0;
      {
        let R = 0;
        for (const [A, H] of d)
          A >= x.lo && A <= x.hi && ($ = Math.max($, H)), R += H, W = Math.max(W, R);
        R = 0;
        for (const [A, H] of k)
          A >= x.lo && A <= x.hi && ($ = Math.max($, H)), R += H, W = Math.max(W, R);
      }
      const J = p - 52, ye = C.cobCumulative ? 26 : 0, pe = p - 8 - ye - 40, be = (R, A, H, Te, oe) => {
        const ue = x.yOf(R);
        if (ue < -I || ue > E + I) return;
        const Z = ue - I / 2, S = q && !oe;
        if (C.cobCumulative && W > 0) {
          const ee = Math.max(1, Te / W * 18);
          i.fillStyle = H === "bid" ? "rgba(38, 166, 154, 0.14)" : "rgba(239, 83, 80, 0.14)", i.fillRect(p - 20, Z, 18, I - 1), i.fillStyle = H === "bid" ? "rgba(38, 166, 154, 0.45)" : "rgba(239, 83, 80, 0.45)", i.fillRect(p - 20, Z, ee, I - 1);
        }
        const U = $ > 0 ? Math.max(1.5, A / $ * J) : 1.5;
        i.fillStyle = H === "bid" ? S ? "rgba(38,166,154,0.16)" : "rgba(38, 166, 154, 0.62)" : S ? "rgba(239,83,80,0.16)" : "rgba(239, 83, 80, 0.62)", i.fillRect(pe + 40 - U, Z, U, I - 1), i.font = "9px monospace", i.textAlign = "right", i.fillStyle = S ? "#4a5260" : H === "bid" ? "#9fd6cd" : "#f4b3ae", i.fillText(Kt(A), pe + 38, ue + 3);
      };
      let ce = 0;
      for (let R = 0; R < d.length; R++) {
        const [A, H] = d[R];
        ce += H, !(A < x.lo - I || A > x.hi + I) && be(A, H, "bid", ce, !q || R < C.activeRange);
      }
      ce = 0;
      for (let R = 0; R < k.length; R++) {
        const [A, H] = k[R];
        ce += H, !(A < x.lo - I || A > x.hi + I) && be(A, H, "ask", ce, !q || R < C.activeRange);
      }
      const de = (R, A) => {
        const H = x.yOf(R);
        H < 0 || H > E || (i.strokeStyle = A, i.lineWidth = 1, i.beginPath(), i.moveTo(0, Math.round(H) + 0.5), i.lineTo(p, Math.round(H) + 0.5), i.stroke());
      };
      if (O !== null && de(O, "rgba(38, 166, 154, 0.95)"), L !== null && de(L, "rgba(239, 83, 80, 0.95)"), O !== null && L !== null && L > O) {
        const R = (x.yOf(O) + x.yOf(L)) / 2;
        if (R > 10 && R < E - 10) {
          const A = `Δ ${Jt(L - O)}`;
          i.font = "9px monospace";
          const H = i.measureText(A).width + 10;
          i.fillStyle = "rgba(20, 24, 31, 0.95)", i.fillRect(2, R - 8, H, 16), i.strokeStyle = "#2a3140", i.strokeRect(2.5, R - 7.5, H - 1, 15), i.fillStyle = "#c8cfda", i.textAlign = "left", i.fillText(A, 7, R + 3);
        }
      }
      if (q) {
        const R = [];
        d.length && C.activeRange <= d.length && R.push(x.yOf(d[C.activeRange - 1][0]) + I / 2 + 1), k.length && C.activeRange <= k.length && R.push(x.yOf(k[C.activeRange - 1][0]) - I / 2 - 1), i.strokeStyle = "rgba(255, 179, 0, 0.75)", i.setLineDash([3, 3]);
        for (const A of R)
          A < 0 || A > E || (i.beginPath(), i.moveTo(0, A), i.lineTo(p, A), i.stroke());
        i.setLineDash([]);
      }
    }, w = () => {
      T || (g(), h = requestAnimationFrame(w));
    };
    return h = requestAnimationFrame(w), () => {
      T = !0, cancelAnimationFrame(h), f.disconnect();
    };
  }, [t, e]), /* @__PURE__ */ n.jsxs("div", { style: {
    flex: `0 0 ${o}px`,
    width: o,
    borderLeft: "1px solid #232936",
    position: "relative",
    background: "#0d1117"
  }, children: [
    /* @__PURE__ */ n.jsx("div", { style: {
      position: "absolute",
      top: 4,
      right: 6,
      fontSize: 8,
      letterSpacing: 1,
      color: "#5c6672",
      pointerEvents: "none",
      zIndex: 1
    }, children: "COB" }),
    /* @__PURE__ */ n.jsx(
      "canvas",
      {
        ref: a,
        style: { position: "absolute", inset: 0, width: "100%", height: "100%" }
      }
    )
  ] });
}
function Zt(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} MB` : t >= 1e3 ? `${(t / 1e3).toFixed(0)} KB` : `${t} B`;
}
function es(t) {
  const e = new Date(t * 1e3);
  return e.toLocaleDateString(void 0, { month: "short", day: "numeric" }) + " " + e.toLocaleTimeString(void 0, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !1
  });
}
function ts(t, e) {
  const s = Math.max(0, Math.round((e ?? Date.now() / 1e3) - t)), o = Math.floor(s / 3600), a = Math.floor(s % 3600 / 60);
  return o ? `${o}h ${a}m` : a ? `${a}m ${s % 60}s` : `${s}s`;
}
function ss({
  symbol: t,
  onLoad: e,
  onClose: s
}) {
  const [o, a] = y.useState(null), [r, l] = y.useState(null), [i, h] = y.useState(null), [c, b] = y.useState(null), [T, v] = y.useState(null), f = y.useCallback(() => {
    fetch("/api/orderflow/sessions").then((u) => u.ok ? u.json() : Promise.reject(new Error(`HTTP ${u.status}`))).then((u) => {
      a(u.filter((x) => x.symbol === t)), l(null);
    }).catch((u) => l(String(u)));
  }, [t]);
  y.useEffect(() => {
    f();
    const u = setInterval(f, 4e3);
    return () => clearInterval(u);
  }, [f]), y.useEffect(() => {
    const u = (x) => {
      x.key === "Escape" && s();
    };
    return window.addEventListener("keydown", u), () => window.removeEventListener("keydown", u);
  }, [s]);
  const g = async (u) => {
    h(u.id), v(null);
    try {
      const x = await fetch(
        `/api/orderflow/sessions/${encodeURIComponent(u.id)}/events`
      );
      if (!x.ok) {
        const p = await x.json().catch(() => ({ detail: `HTTP ${x.status}` }));
        throw new Error(String(p.detail || x.status));
      }
      const _ = await x.json();
      await e(_.events || [], { ...u, rows: (_.events || []).length }), _.truncated && v("Large session: loaded up to the event cap — the tail stays in the file."), s();
    } catch (x) {
      l(String(x));
    } finally {
      h(null);
    }
  }, w = async (u) => {
    if (c !== u.id) {
      b(u.id);
      return;
    }
    b(null);
    try {
      const x = await fetch(
        `/api/orderflow/sessions/${encodeURIComponent(u.id)}`,
        { method: "DELETE" }
      );
      if (!x.ok) {
        const _ = await x.json().catch(() => ({ detail: `HTTP ${x.status}` }));
        throw new Error(String(_.detail || x.status));
      }
      f();
    } catch (x) {
      l(String(x));
    }
  };
  return /* @__PURE__ */ n.jsx("div", { className: "dh-backdrop", onMouseDown: s, children: /* @__PURE__ */ n.jsxs("div", { className: "dh-window", onMouseDown: (u) => u.stopPropagation(), children: [
    /* @__PURE__ */ n.jsxs("div", { className: "dh-head", children: [
      /* @__PURE__ */ n.jsx("span", { className: "dh-head-title", children: "RECORDED SESSIONS" }),
      /* @__PURE__ */ n.jsx("span", { className: "dh-head-sym", children: t }),
      /* @__PURE__ */ n.jsx("button", { className: "dh-close", onClick: s, title: "Close (Esc)", children: "✕" })
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "dh-body", style: { minHeight: 120 }, children: [
      o === null && !r && /* @__PURE__ */ n.jsx("div", { className: "dh-empty", children: "Reading MY DATA…" }),
      r && /* @__PURE__ */ n.jsx("div", { className: "dh-empty", style: { color: "#ef9a9a" }, children: r }),
      o && o.length === 0 && /* @__PURE__ */ n.jsxs("div", { className: "dh-empty", children: [
        "No recordings for ",
        t,
        " yet.",
        /* @__PURE__ */ n.jsx("br", {}),
        "Press ",
        /* @__PURE__ */ n.jsx("b", { children: "● REC" }),
        " above the heatmap to capture live depth — it lands here, in workspace/MY DATA."
      ] }),
      o?.map((u) => /* @__PURE__ */ n.jsxs("div", { className: "dh-sess", children: [
        /* @__PURE__ */ n.jsxs("div", { style: { minWidth: 0, flex: 1 }, children: [
          /* @__PURE__ */ n.jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexWrap: "wrap"
          }, children: [
            u.recording && /* @__PURE__ */ n.jsx("span", { className: "dh-rec-dot", title: "Recording now" }),
            /* @__PURE__ */ n.jsx("span", { style: { fontFamily: "ui-monospace, Menlo, monospace" }, children: u.id }),
            u.demo && /* @__PURE__ */ n.jsx("span", { className: "dh-chip demo", children: "DEMO" }),
            /* @__PURE__ */ n.jsx("span", { className: "dh-chip", children: u.source || "live" })
          ] }),
          /* @__PURE__ */ n.jsxs("div", { className: "dh-hint", style: { marginTop: 2 }, children: [
            es(u.started),
            " · ",
            ts(u.started, u.stopped),
            " · ",
            Zt(u.bytes),
            " · ",
            u.rows.toLocaleString(),
            " rows",
            u.stopped === null ? " · recording…" : ""
          ] })
        ] }),
        /* @__PURE__ */ n.jsx(
          "button",
          {
            className: "dh-btn primary",
            disabled: i !== null,
            onClick: () => g(u),
            title: "Load this recording into the pane",
            children: i === u.id ? "loading…" : "Load"
          }
        ),
        /* @__PURE__ */ n.jsx(
          "button",
          {
            className: "dh-btn",
            style: c === u.id ? { borderColor: "#ef5350", color: "#ef9a9a" } : void 0,
            onClick: () => w(u),
            title: "Delete this recording",
            children: c === u.id ? "sure?" : "Delete"
          }
        )
      ] }, u.id)),
      T && /* @__PURE__ */ n.jsx("div", { className: "dh-empty", children: T })
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "dh-foot", children: [
      /* @__PURE__ */ n.jsx("span", { className: "dh-hint", children: "recordings are parquet files in workspace/MY DATA" }),
      /* @__PURE__ */ n.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ n.jsx("button", { className: "dh-btn primary", onClick: s, children: "Done" })
    ] })
  ] }) });
}
const is = 4 * 3600;
function ut(t) {
  return `lset-depth-settings:${t}`;
}
function Ge(t) {
  let e = { ...at }, s = null;
  try {
    const a = localStorage.getItem(ut(t));
    a && (s = JSON.parse(a), e = { ...e, ...s });
  } catch {
  }
  s && s.subpanes === void 0 && s.showVolumeStrip === !1 && (e.subpanes = !1);
  const o = kt();
  return o.apply && (e = { ...e, scheme: o.scheme, applySchemeGlobally: !0 }), e;
}
function tt(t, e) {
  try {
    localStorage.setItem(ut(t), JSON.stringify(e));
  } catch {
  }
}
function ns({
  symbol: t,
  sourceProvider: e,
  colors: s,
  syncedCrosshairTime: o,
  onCrosshairMove: a,
  onToggleKind: r
}) {
  const l = y.useRef(null), i = y.useRef(null), h = y.useRef(null);
  h.current || (h.current = new Ae());
  const [c, b] = y.useState({ kind: "loading" }), [T, v] = y.useState(
    () => Ge(t)
  ), [f, g] = y.useState(50), [w, u] = y.useState(!1), [x, _] = y.useState(null), [p, E] = y.useState(!1), [d, k] = y.useState(null), [C, O] = y.useState(null), [L, q] = y.useState(0), [N, I] = y.useState(null), [$, W] = y.useState(0), J = y.useCallback((S) => {
    v((U) => {
      const ee = { ...U, ...S };
      return ee.applySchemeGlobally && S.scheme && S.scheme !== U.scheme && (Ve(S.scheme, !0), window.dispatchEvent(new CustomEvent(
        Fe,
        { detail: { scheme: S.scheme, source: t } }
      ))), tt(t, ee), i.current?.setSettings(ee), i.current?.refreshCutoffs(), ee;
    });
  }, [t]);
  y.useEffect(() => {
    const S = (U) => {
      const ee = U.detail;
      ee.source !== t && v((fe) => {
        if (!fe.applySchemeGlobally || fe.scheme === ee.scheme) return fe;
        const Me = { ...fe, scheme: ee.scheme };
        return tt(t, Me), i.current?.setSettings(Me), Me;
      });
    };
    return window.addEventListener(Fe, S), () => window.removeEventListener(Fe, S);
  }, [t]);
  const ye = y.useCallback(async () => {
    O(null);
    try {
      const S = await fetch("/api/orderflow/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol: t })
      }), U = await S.json().catch(() => ({}));
      if (!S.ok) throw new Error(String(U.detail || `HTTP ${S.status}`));
      k({ rid: U.id ?? U.sid ?? "", since: Date.now() });
    } catch (S) {
      O(String(S));
    }
  }, [t]), pe = y.useCallback(async () => {
    try {
      await fetch("/api/orderflow/record/stop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: d?.rid ?? "" })
      });
    } catch {
    }
    k(null), q(0);
  }, [d]);
  y.useEffect(() => {
    if (!d) return;
    const S = setInterval(() => {
      q(Math.floor((Date.now() - d.since) / 1e3));
    }, 1e3);
    return () => clearInterval(S);
  }, [d]);
  const be = y.useCallback((S, U) => {
    const ee = i.current;
    if (!ee || !S.length) return;
    const fe = S.filter((G) => G.type === "SNAPSHOT" || G.type === "DELTA"), Me = S.filter((G) => typeof G.side == "string");
    ee.ingestHistory(fe), h.current?.seed([], []);
    for (const G of fe) h.current?.apply(G);
    for (const G of Me) ee.addTrade(G);
    I(U.id);
  }, []), ce = y.useCallback(() => {
    I(null), W((S) => S + 1);
  }, []);
  y.useEffect(() => {
    const S = l.current;
    if (!S) return;
    const U = new qt(Ge(t));
    return i.current = U, U.attach(S), U.setBookSource(h.current), a && (U.onHoverTime = (ee) => a(ee)), () => {
      U.dispose(), i.current = null;
    };
  }, [t]), y.useEffect(() => {
    i.current?.setSettings(T);
  }, [T]), y.useEffect(() => {
    i.current?.setSyncedCrosshair(
      o ?? null
    );
  }, [o]), y.useEffect(() => {
    let S = !1, U = null;
    return b({ kind: "loading" }), h.current?.seed([], []), (async () => {
      const fe = i.current;
      if (!fe) return;
      const Me = Date.now() / 1e3, G = e ? `&provider=${encodeURIComponent(e)}` : "";
      let Ie = !1, Pe = "";
      try {
        const F = await fetch(
          `/api/orderflow/depth?symbol=${encodeURIComponent(t)}` + G + `&from=${Me - is}&to=${Me}&column_ms=1000&max_levels=60`
        );
        if (!F.ok) {
          const ge = await F.json().catch(() => ({ detail: `HTTP ${F.status}` }));
          S || b({ kind: "nodata", reason: String(ge.detail || F.status) });
          return;
        }
        const Q = await F.json();
        if (S) return;
        Ie = !!Q.demo, Pe = Q.provider, fe.ingestHistory(Q.events || []);
        for (const ge of Q.trades || [])
          fe.addTrade(ge);
      } catch (F) {
        S || b({ kind: "nodata", reason: `engine unreachable: ${F}` });
        return;
      }
      try {
        const F = Ge(t), Q = new URLSearchParams({ symbol: t });
        e && Q.set("provider", e), F.activeRange > 0 && Q.set("active_levels", String(F.activeRange)), Q.set("reset", F.resetPolicy), F.resetPolicy === "interval" && Q.set("reset_interval_min", String(F.resetIntervalMin));
        const ge = await fetch(`/api/orderflow/book?${Q.toString()}`);
        if (ge.ok) {
          const ve = await ge.json();
          fe.setBook(ve.best_bid ?? null, ve.best_ask ?? null), h.current?.seed(ve.bids ?? [], ve.asks ?? []);
        }
      } catch {
      }
      S || b({ kind: "live", demo: Ie, provider: Pe });
      const Oe = location.protocol === "https:" ? "wss" : "ws";
      U = new WebSocket(
        `${Oe}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(t)}${G}`
      ), U.onmessage = (F) => {
        if (S) return;
        let Q;
        try {
          Q = JSON.parse(F.data);
        } catch {
          return;
        }
        const ge = i.current;
        if (ge)
          if (Q.type === "depth") {
            if (ge.applyDepth(Q.event), h.current?.apply(Q.event), Q.event.type === "SNAPSHOT") {
              let ve = null, Re = null;
              for (const [Ce] of Q.event.bids)
                (ve === null || Ce > ve) && (ve = Ce);
              for (const [Ce] of Q.event.asks)
                (Re === null || Ce < Re) && (Re = Ce);
              ge.setBook(ve, Re);
            }
          } else Q.type === "trade" ? ge.addTrade(Q.event) : Q.type === "error" && b({ kind: "nodata", reason: Q.message });
      }, U.onclose = () => {
      };
    })(), () => {
      S = !0;
      try {
        U?.close();
      } catch {
      }
    };
  }, [t, $]), y.useEffect(() => {
    if (!(T.cutoffMode === "percentile")) return;
    const U = 90 - f * 0.8, ee = Math.max(0, 50 - U / 2), fe = Math.min(100, 50 + U / 2);
    J({ cutoffLower: ee, cutoffUpper: fe });
  }, [f]);
  const de = y.useMemo(() => c.kind === "live" && c.demo ? "DEMO" : c.kind === "live" ? c.provider.toUpperCase() : "", [c]), R = y.useCallback((S) => {
    i.current?.wheel(S.deltaX, S.deltaY, S.shiftKey);
  }, []), A = y.useRef(null), H = y.useCallback((S) => {
    A.current = { x: S.clientX, y: S.clientY };
  }, []), Te = y.useCallback((S) => {
    const U = S.currentTarget.getBoundingClientRect();
    A.current && S.buttons & 1 && (i.current?.drag(
      S.clientX - A.current.x,
      S.clientY - A.current.y
    ), A.current = { x: S.clientX, y: S.clientY }), i.current?.setHover(S.clientX - U.left, S.clientY - U.top);
  }, []), oe = y.useCallback(() => {
    A.current = null;
  }, []), ue = y.useCallback(() => {
    A.current = null, i.current?.setHover(null, null);
  }, []), Z = y.useCallback(() => {
    i.current?.recenter();
  }, []);
  return /* @__PURE__ */ n.jsxs("div", { style: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    background: "#0b0e11",
    color: "#d1d4dc",
    fontSize: 11
  }, children: [
    /* @__PURE__ */ n.jsxs("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "2px 8px",
      borderBottom: "1px solid var(--edge, #2a2e39)",
      flex: "0 0 auto"
    }, children: [
      /* @__PURE__ */ n.jsx("span", { style: { opacity: 0.75 }, children: "DEPTH HEAT" }),
      /* @__PURE__ */ n.jsx("span", { style: { fontWeight: 600 }, children: t }),
      /* @__PURE__ */ n.jsx("span", { style: {
        display: "inline-flex",
        border: "1px solid #2a2e39",
        borderRadius: 4,
        overflow: "hidden"
      }, children: ["heat", "footprint"].map((S) => /* @__PURE__ */ n.jsx(
        "button",
        {
          onClick: () => J({ view: S }),
          title: S === "heat" ? "Resting liquidity heat field" : "Footprint: bid×ask executed volume per price and time bucket",
          style: {
            background: T.view === S ? "#2b3547" : "transparent",
            color: T.view === S ? "#eef1f6" : "#93a0b1",
            border: "none",
            fontSize: 9,
            letterSpacing: 0.5,
            padding: "2px 7px",
            cursor: "pointer"
          },
          children: S === "heat" ? "HEAT" : "FOOTPRINT"
        },
        S
      )) }),
      de && /* @__PURE__ */ n.jsx("span", { style: {
        padding: "0 6px",
        borderRadius: 3,
        fontSize: 9,
        letterSpacing: 0.5,
        background: c.kind === "live" && c.demo ? "rgba(255, 152, 0, 0.25)" : "rgba(120, 144, 156, 0.25)",
        color: c.kind === "live" && c.demo ? "#ffb74d" : "#b0bec5"
      }, children: de }),
      /* @__PURE__ */ n.jsx("span", { style: {
        marginLeft: "auto",
        fontSize: 9,
        letterSpacing: 0.6,
        opacity: 0.55
      }, children: "CUT-OFF" }),
      /* @__PURE__ */ n.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 100,
          value: f,
          onChange: (S) => g(Number(S.target.value)),
          title: "Cut-off window — narrows/widens where the gradient saturates (S3)",
          style: { width: 90, accentColor: "#78909c" }
        }
      ),
      d ? /* @__PURE__ */ n.jsxs(
        "button",
        {
          onClick: pe,
          title: "Stop recording this symbol's depth to MY DATA",
          style: {
            background: "rgba(239, 83, 80, 0.14)",
            border: "1px solid rgba(239, 83, 80, 0.6)",
            color: "#ef9a9a",
            borderRadius: 4,
            fontSize: 10,
            padding: "1px 7px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 5
          },
          children: [
            /* @__PURE__ */ n.jsx("span", { style: {
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#ef5350",
              boxShadow: "0 0 6px rgba(239,83,80,0.9)",
              animation: "dh-pulse 1.1s infinite"
            } }),
            "REC ",
            Math.floor(L / 60),
            ":",
            String(L % 60).padStart(2, "0"),
            " — stop"
          ]
        }
      ) : /* @__PURE__ */ n.jsx(
        "button",
        {
          onClick: ye,
          title: "Record live depth + trades to workspace/MY DATA (S10)",
          style: {
            background: "transparent",
            border: "1px solid #2a2e39",
            color: "#9aa4b2",
            borderRadius: 4,
            fontSize: 10,
            padding: "1px 7px",
            cursor: "pointer"
          },
          children: "● REC"
        }
      ),
      /* @__PURE__ */ n.jsx(
        "button",
        {
          onClick: () => E(!0),
          title: "Recorded sessions (workspace/MY DATA)",
          style: {
            background: "transparent",
            border: "1px solid #2a2e39",
            color: "#9aa4b2",
            borderRadius: 4,
            fontSize: 10,
            padding: "1px 7px",
            cursor: "pointer"
          },
          children: "🗂 sessions"
        }
      ),
      /* @__PURE__ */ n.jsx(
        "button",
        {
          onClick: () => J({ showTsPanel: !T.showTsPanel }),
          title: "Time & sales drawer: every executed print with min-size and side filters (V4)",
          style: {
            background: T.showTsPanel ? "#1d232e" : "transparent",
            border: "1px solid #2a2e39",
            color: "#9aa4b2",
            borderRadius: 4,
            fontSize: 10,
            padding: "1px 7px",
            cursor: "pointer"
          },
          children: "T&S"
        }
      ),
      N && /* @__PURE__ */ n.jsxs("span", { style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 9,
        padding: "1px 6px",
        borderRadius: 3,
        letterSpacing: 0.4,
        background: "rgba(120, 144, 156, 0.18)",
        color: "#a7b4c2"
      }, children: [
        "SESSION LOADED",
        /* @__PURE__ */ n.jsx(
          "button",
          {
            onClick: ce,
            title: "Return to the live feed",
            style: {
              background: "transparent",
              border: "none",
              color: "#c8cfda",
              cursor: "pointer",
              fontSize: 10,
              padding: 0
            },
            children: "✕"
          }
        )
      ] }),
      C && /* @__PURE__ */ n.jsxs("span", { title: C, style: {
        fontSize: 9,
        color: "#ef9a9a",
        maxWidth: 150,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }, children: [
        "rec: ",
        C
      ] }),
      /* @__PURE__ */ n.jsxs(
        "button",
        {
          onClick: () => {
            _(i.current?.getCutoffs() ?? null), u(!0);
          },
          title: "Depth Heat settings (or right-click the heatmap)",
          style: {
            background: w ? "#1d232e" : "transparent",
            border: "1px solid #2a2e39",
            color: "#c8cfda",
            borderRadius: 4,
            fontSize: 11,
            padding: "1px 7px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 4
          },
          children: [
            "⚙",
            /* @__PURE__ */ n.jsx("span", { style: { fontSize: 10, opacity: 0.8 }, children: "settings" })
          ]
        }
      ),
      r && /* @__PURE__ */ n.jsx(
        "button",
        {
          onClick: r,
          title: "Switch pane back to the chart",
          style: {
            background: "transparent",
            border: "1px solid #2a2e39",
            color: "#9aa4b2",
            borderRadius: 3,
            fontSize: 10,
            padding: "1px 6px",
            cursor: "pointer"
          },
          children: "chart ⇄"
        }
      )
    ] }),
    /* @__PURE__ */ n.jsxs(
      "div",
      {
        style: {
          position: "relative",
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "row"
        },
        onContextMenu: (S) => {
          S.preventDefault(), _(i.current?.getCutoffs() ?? null), u(!0);
        },
        children: [
          /* @__PURE__ */ n.jsxs("div", { style: { position: "relative", flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ n.jsx(
              "canvas",
              {
                ref: l,
                style: { position: "absolute", inset: 0, width: "100%", height: "100%" },
                onWheel: R,
                onMouseDown: H,
                onMouseMove: Te,
                onMouseUp: oe,
                onMouseLeave: ue,
                onDoubleClick: Z
              }
            ),
            c.kind === "loading" && /* @__PURE__ */ n.jsx("div", { style: st, children: "Loading depth history…" }),
            c.kind === "nodata" && /* @__PURE__ */ n.jsxs("div", { style: st, children: [
              /* @__PURE__ */ n.jsxs("div", { style: { fontWeight: 600, marginBottom: 6 }, children: [
                "No depth data for ",
                t
              ] }),
              /* @__PURE__ */ n.jsx("div", { style: { opacity: 0.7, maxWidth: 340, textAlign: "center" }, children: c.reason })
            ] })
          ] }),
          T.cob && T.ladderMode === "panel" && c.kind === "live" && /* @__PURE__ */ n.jsx(
            Qt,
            {
              rendererRef: i,
              book: h.current,
              settings: T
            }
          ),
          w && /* @__PURE__ */ n.jsx(
            Yt,
            {
              symbol: t,
              settings: T,
              cutoffRange: x,
              onChange: (S) => {
                J(S), _(i.current?.getCutoffs() ?? null);
              },
              onClose: () => u(!1)
            }
          ),
          p && /* @__PURE__ */ n.jsx(
            ss,
            {
              symbol: t,
              onLoad: be,
              onClose: () => E(!1)
            }
          )
        ]
      }
    )
  ] });
}
const st = {
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
  color: "#9aa4b2",
  fontSize: 12
}, os = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ns
}, Symbol.toStringTag, { value: "Module" })), le = 8192, he = 1024, as = [
  { t: 0, r: 0, g: 0, b: 0 },
  { t: 0.06, r: 6, g: 4, b: 15 },
  { t: 0.14, r: 14, g: 9, b: 34 },
  { t: 0.24, r: 27, g: 13, b: 59 },
  { t: 0.35, r: 45, g: 17, b: 84 },
  { t: 0.46, r: 68, g: 22, b: 103 },
  { t: 0.57, r: 95, g: 28, b: 110 },
  { t: 0.67, r: 126, g: 36, b: 106 },
  { t: 0.76, r: 160, g: 47, b: 92 },
  { t: 0.84, r: 196, g: 62, b: 70 },
  { t: 0.9, r: 227, g: 84, b: 44 },
  { t: 0.945, r: 246, g: 114, b: 20 },
  { t: 0.975, r: 252, g: 158, b: 28 },
  { t: 0.992, r: 253, g: 201, b: 62 },
  { t: 1, r: 252, g: 235, b: 140 }
], rs = [
  { t: 0, r: 68, g: 1, b: 84 },
  { t: 0.2, r: 65, g: 68, b: 135 },
  { t: 0.4, r: 42, g: 120, b: 142 },
  { t: 0.6, r: 34, g: 168, b: 132 },
  { t: 0.8, r: 122, g: 209, b: 81 },
  { t: 1, r: 253, g: 231, b: 37 }
], ls = [
  { t: 0, r: 0, g: 0, b: 4 },
  { t: 0.25, r: 81, g: 18, b: 124 },
  { t: 0.5, r: 183, g: 55, b: 121 },
  { t: 0.75, r: 252, g: 137, b: 97 },
  { t: 1, r: 252, g: 253, b: 191 }
];
function ze(t, e) {
  if (e <= t[0].t) return [t[0].r, t[0].g, t[0].b];
  for (let o = 1; o < t.length; o++)
    if (e <= t[o].t) {
      const a = (e - t[o - 1].t) / (t[o].t - t[o - 1].t);
      return [
        t[o - 1].r + a * (t[o].r - t[o - 1].r),
        t[o - 1].g + a * (t[o].g - t[o - 1].g),
        t[o - 1].b + a * (t[o].b - t[o - 1].b)
      ];
    }
  const s = t[t.length - 1];
  return [s.r, s.g, s.b];
}
function cs(t) {
  if (t < 0.05) {
    const s = t / 0.05;
    return [s * 3, 0, s * 4];
  }
  if (t < 0.15) {
    const s = (t - 0.05) / 0.1;
    return [3 + s * 27, s * 9, 4 + s * 64];
  }
  if (t < 0.25) {
    const s = (t - 0.15) / 0.1;
    return [30 + s * 43, 9 + s * 7, 68 + s * 35];
  }
  if (t < 0.35) {
    const s = (t - 0.25) / 0.1;
    return [73 + s * 47, 16 + s * 12, 103 + s * 6];
  }
  if (t < 0.45) {
    const s = (t - 0.35) / 0.1;
    return [120 + s * 37, 28 + s * 14, 109 - s * 20];
  }
  if (t < 0.55) {
    const s = (t - 0.45) / 0.1;
    return [157 + s * 30, 42 + s * 13, 89 - s * 26];
  }
  if (t < 0.65) {
    const s = (t - 0.55) / 0.1;
    return [187 + s * 25, 55 + s * 25, 63 - s * 28];
  }
  if (t < 0.75) {
    const s = (t - 0.65) / 0.1;
    return [212 + s * 22, 80 + s * 37, 35 - s * 24];
  }
  if (t < 0.85) {
    const s = (t - 0.75) / 0.1;
    return [234 + s * 13, 117 + s * 44, 11 - s * 7];
  }
  if (t < 0.95) {
    const s = (t - 0.85) / 0.1;
    return [247 + s * 3, 161 + s * 49, 4 + s * 48];
  }
  const e = (t - 0.95) / 0.05;
  return [250 + e * 2, 210 + e * 45, 52 + e * 112];
}
function hs(t) {
  if (t < 0.01) return [15, 25, 45];
  if (t < 0.15) {
    const s = (t - 0.01) / 0.14;
    return [15 + s * 10, 25 + s * 95, 45 + s * 105];
  }
  if (t < 0.35) {
    const s = (t - 0.15) / 0.2;
    return [25 + s * 35, 120 + s * 40, 150 + s * 55];
  }
  if (t < 0.55) {
    const s = (t - 0.35) / 0.2;
    return [60 + s * 120, 160 - s * 80, 205 + s * 30];
  }
  if (t < 0.75) {
    const s = (t - 0.55) / 0.2;
    return [180 + s * 65, 80 + s * 100, 235 - s * 155];
  }
  const e = (t - 0.75) / 0.25;
  return [245 + e * 10, 180 + e * 75, 80 + e * 175];
}
function ds(t) {
  if (t < 0.08) {
    const s = t / 0.08;
    return [8 + s * 4, 13 + s * 14, 18 + s * 18];
  }
  if (t < 0.25) {
    const s = (t - 0.08) / 0.17;
    return [12 + s * 10, 27 + s * 56, 36 + s * 72];
  }
  if (t < 0.5) {
    const s = (t - 0.25) / 0.25;
    return [22 + s * 26, 83 + s * 99, 108 + s * 93];
  }
  if (t < 0.75) {
    const s = (t - 0.5) / 0.25;
    return [48 + s * 170, 182 + s * 35, 201 - s * 106];
  }
  const e = (t - 0.75) / 0.25;
  return [218 + e * 37, 217 + e * 33, 95 + e * 125];
}
function it(t, e = 1) {
  const s = new Uint8Array(1024);
  for (let o = 0; o < 256; o++) {
    const a = o / 255;
    let r, l, i, h;
    if (t === "ember" ? [r, l, i] = ze(as, a) : t === "viridis" ? [r, l, i] = ze(rs, a) : t === "magma" ? [r, l, i] = ze(ls, a) : t === "inferno" ? [r, l, i] = cs(a) : t === "deepdom" || t === "bookmap" ? [r, l, i] = ds(a) : t === "realtime" ? [r, l, i] = ze([{ t: 0, r: 8, g: 13, b: 18 }, { t: 0.08, r: 12, g: 27, b: 36 }, { t: 0.25, r: 22, g: 83, b: 108 }, { t: 0.5, r: 48, g: 182, b: 201 }, { t: 0.75, r: 218, g: 217, b: 95 }, { t: 1, r: 255, g: 250, b: 220 }], a) : t === "realtime_warm" ? [r, l, i] = ze([{ t: 0, r: 8, g: 13, b: 18 }, { t: 0.15, r: 15, g: 30, b: 64 }, { t: 0.4, r: 28, g: 92, b: 153 }, { t: 0.65, r: 75, g: 181, b: 190 }, { t: 0.8, r: 240, g: 205, b: 75 }, { t: 0.94, r: 248, g: 108, b: 40 }, { t: 1, r: 255, g: 55, b: 35 }], a) : [r, l, i] = hs(a), t === "inferno" || t === "ember" || t === "viridis" || t === "magma") {
      if (a < 0.05) h = 0;
      else if (a < 0.15) {
        const c = (a - 0.05) / 0.1;
        h = c * c * 40;
      } else if (a < 0.35)
        h = 40 + (a - 0.15) / 0.2 * 80;
      else if (a < 0.6)
        h = 120 + (a - 0.35) / 0.25 * 70;
      else {
        const c = (a - 0.6) / 0.4;
        h = Math.min(245, 190 + c * 55);
      }
      h *= e;
    } else
      h = 220 * e;
    s[o * 4] = Math.round(r), s[o * 4 + 1] = Math.round(l), s[o * 4 + 2] = Math.round(i), s[o * 4 + 3] = Math.round(h);
  }
  return s;
}
const us = `#version 300 es
void main() {
  vec2 pos = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(pos * 2.0 - 1.0, 0.0, 1.0);
}
`, fs = `#version 300 es
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
class ms {
  gl = null;
  program = null;
  vao = null;
  dataTex = null;
  metaTex = null;
  reachTex = null;
  colormapTex = null;
  colormapWarmTex = null;
  uniforms = {};
  timeline = /* @__PURE__ */ new Map();
  reachTimeline = /* @__PURE__ */ new Map();
  columnMeta = Array.from({ length: le }, () => ({
    timestamp_ms: 0,
    price_min: 0,
    price_step: 0,
    num_rows: 0,
    max_value: 0,
    finalized: !1,
    values: new Float32Array(0)
  }));
  ringCount = 0;
  gpuDirty = !0;
  nativeBucket = 0;
  bucketMultiplier = 1;
  timeStepMs = 6e4;
  columnIntervalMs = 6e4;
  globalMaxQty = 0.01;
  opacity = 1;
  sensitivity = 1;
  colorLow = 0;
  colorPeak = 1e5;
  mode = "orderbook";
  liqColormap = "ember";
  obColormap = "orderbook";
  useReach = !1;
  linearFiltering = !1;
  gpuOriginMs = 0;
  gpuBucketSize = 0;
  observationHoldUntilMs = 0;
  canvas = null;
  viewTimeMin = 0;
  viewTimeMax = 0;
  viewPriceMin = 0;
  viewPriceMax = 0;
  constructor() {
  }
  attach(e) {
    this.canvas = e;
    const s = e.getContext("webgl2", { alpha: !1, antialias: !1, premultipliedAlpha: !1 });
    return s ? (this.gl = s, this.initGL(), !0) : (console.warn("WebGL2 not available, fallback to Canvas2D"), !1);
  }
  initGL() {
    const e = this.gl, s = e.createShader(e.VERTEX_SHADER);
    if (e.shaderSource(s, us), e.compileShader(s), !e.getShaderParameter(s, e.COMPILE_STATUS)) {
      console.error("VS compile", e.getShaderInfoLog(s));
      return;
    }
    const o = e.createShader(e.FRAGMENT_SHADER);
    if (e.shaderSource(o, fs), e.compileShader(o), !e.getShaderParameter(o, e.COMPILE_STATUS)) {
      console.error("FS compile", e.getShaderInfoLog(o));
      return;
    }
    const a = e.createProgram();
    if (e.attachShader(a, s), e.attachShader(a, o), e.linkProgram(a), !e.getProgramParameter(a, e.LINK_STATUS)) {
      console.error("Program link", e.getProgramInfoLog(a));
      return;
    }
    this.program = a, e.useProgram(a), this.vao = e.createVertexArray(), e.bindVertexArray(this.vao), this.dataTex = e.createTexture(), e.bindTexture(e.TEXTURE_2D, this.dataTex), e.texImage2D(e.TEXTURE_2D, 0, e.R32F, le, he, 0, e.RED, e.FLOAT, new Float32Array(le * he)), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), this.reachTex = e.createTexture(), e.bindTexture(e.TEXTURE_2D, this.reachTex), e.texImage2D(e.TEXTURE_2D, 0, e.R32F, le, he, 0, e.RED, e.FLOAT, new Float32Array(le * he)), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), this.metaTex = e.createTexture(), e.bindTexture(e.TEXTURE_2D, this.metaTex), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA32F, le, 1, 0, e.RGBA, e.FLOAT, new Float32Array(le * 4)), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), this.colormapTex = e.createTexture(), this.colormapWarmTex = e.createTexture(), this.updateColormap();
    const r = ["u_data", "u_meta", "u_colormap", "u_colormap_warm", "u_reach_data", "u_plot_origin", "u_plot_size", "u_viewport_time_min", "u_viewport_time_max", "u_viewport_price_min", "u_viewport_price_max", "u_data_time_start", "u_observation_hold_until", "u_time_step", "u_ring_start", "u_ring_count", "u_ring_size", "u_max_rows", "u_bucket_size", "u_bucket_multiplier", "u_sensitivity", "u_max_qty", "u_color_low", "u_color_peak", "u_mode", "u_opacity", "u_use_reach", "u_use_warm"];
    for (const l of r) this.uniforms[l] = e.getUniformLocation(a, l);
    e.bindVertexArray(null);
  }
  updateColormap() {
    const e = this.gl;
    if (!e || !this.colormapTex || !this.colormapWarmTex) return;
    let s = "orderbook";
    this.mode === "liquidation" ? s = this.liqColormap : s = this.obColormap;
    const o = it(s, this.opacity);
    e.activeTexture(e.TEXTURE2), e.bindTexture(e.TEXTURE_2D, this.colormapTex), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 256, 1, 0, e.RGBA, e.UNSIGNED_BYTE, o), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
    const a = it("ember", this.opacity);
    e.activeTexture(e.TEXTURE3), e.bindTexture(e.TEXTURE_2D, this.colormapWarmTex), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 256, 1, 0, e.RGBA, e.UNSIGNED_BYTE, a), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
  }
  setMode(e) {
    this.mode = e, this.updateColormap(), this.gpuDirty = !0;
  }
  setLiqColormap(e) {
    this.liqColormap = e, this.updateColormap();
  }
  setObColormap(e) {
    this.obColormap = e, this.updateColormap();
  }
  setOpacity(e) {
    this.opacity = e, this.updateColormap();
  }
  setSensitivity(e) {
    this.sensitivity = e;
  }
  setBucketMultiplier(e) {
    this.bucketMultiplier = Math.max(1, e), this.gpuDirty = !0;
  }
  setColumnInterval(e) {
    this.columnIntervalMs = e, this.timeStepMs = e, this.gpuDirty = !0;
  }
  setReachModulation(e) {
    this.useReach = e;
  }
  setLinearFiltering(e) {
    this.linearFiltering = e;
    const s = this.gl;
    !s || !this.dataTex || (s.bindTexture(s.TEXTURE_2D, this.dataTex), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MIN_FILTER, e ? s.LINEAR : s.NEAREST), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MAG_FILTER, e ? s.LINEAR : s.NEAREST));
  }
  processSnapshot(e, s, o) {
    if (o <= 0 || (this.nativeBucket = o, s.size === 0)) return;
    const a = /* @__PURE__ */ new Map();
    for (const [r, l] of s) {
      if (Math.abs(l) < 1e-3) continue;
      const i = Math.floor(r / o) * o;
      a.set(i, (a.get(i) || 0) + l);
    }
    if (this.timeline.set(e, a), this.timeline.size > 5e3) {
      const r = this.timeline.keys().next().value;
      this.timeline.delete(r);
    }
    this.gpuDirty = !0;
  }
  updateLiveColumn(e, s, o = 0) {
    this.processSnapshot(e, s, this.nativeBucket || 0.01), o && (this.observationHoldUntilMs = e + 6e4);
  }
  finalizeColumn(e, s, o = !1, a = 0) {
    this.processSnapshot(e, s, this.nativeBucket || 0.01);
    const r = this.findColumnForTime(e);
    r >= 0 && (this.columnMeta[r].finalized = !0);
  }
  uploadReachData(e, s) {
    if (this.reachTimeline.set(e, s), this.reachTimeline.size > 5e3) {
      const o = this.reachTimeline.keys().next().value;
      this.reachTimeline.delete(o);
    }
    this.gpuDirty = !0;
  }
  clear() {
    this.timeline.clear(), this.reachTimeline.clear(), this.columnMeta.forEach((e) => {
      e.timestamp_ms = 0, e.num_rows = 0, e.values = new Float32Array(0);
    }), this.ringCount = 0, this.gpuDirty = !0;
  }
  findColumnForTime(e) {
    if (!this.timeline.size) return -1;
    const o = Array.from(this.timeline.keys()).sort((r, l) => r - l)[0], a = Math.floor((e - o) / this.timeStepMs);
    return a < 0 || a >= le ? -1 : a;
  }
  syncGpuFromTimeline() {
    const e = this.gl;
    if (!e || !this.timeline.size) {
      this.ringCount = 0, this.gpuDirty = !1;
      return;
    }
    const s = Array.from(this.timeline.entries()).sort((v, f) => v[0] - f[0]), o = s[0][0];
    this.gpuOriginMs = Math.floor(o / this.timeStepMs) * this.timeStepMs, this.gpuBucketSize = this.nativeBucket * (this.mode === "orderbook" ? this.bucketMultiplier : 1), this.globalMaxQty = 0.01;
    let a = 1 / 0, r = -1 / 0;
    for (const [, v] of s)
      for (const f of v.keys())
        f < a && (a = f), f > r && (r = f);
    const i = (a + r) / 2 - he / 2 * this.gpuBucketSize, h = new Float32Array(le * he), c = new Float32Array(le * 4), b = new Float32Array(le * he);
    let T = 0;
    for (const [v, f] of s) {
      const g = Math.floor((v - this.gpuOriginMs) / this.timeStepMs);
      if (g < 0 || g >= le) continue;
      g >= T && (T = g + 1);
      const w = new Float32Array(he);
      let u = 0, x = 0;
      for (const [p, E] of f) {
        const d = Math.floor((p - i) / this.nativeBucket);
        if (d >= 0 && d < he) {
          w[d] += E, d > u && (u = d);
          const k = Math.abs(w[d]);
          k > x && (x = k), k > this.globalMaxQty && (this.globalMaxQty = k);
        }
      }
      if (this.mode === "liquidation" && u > 0) {
        const p = new Float32Array(he), E = [0.61, 0.14];
        for (let d = 0; d <= u; d++) {
          const k = w[d];
          if (Math.abs(k) < 0.05) continue;
          const C = k < 0 ? -1 : 1;
          for (let O = 1; O <= 2; O++) {
            const L = Math.abs(k) * E[O - 1];
            for (const q of [-1, 1]) {
              const N = d + q * O;
              if (N >= 0 && N < he) {
                const I = C * L;
                Math.abs(I) > Math.abs(p[N]) && (p[N] = I);
              }
            }
          }
        }
        for (let d = 0; d < he; d++)
          Math.abs(p[d]) > Math.abs(w[d]) && (w[d] = p[d]);
      }
      for (let p = 0; p < he; p++) h[p * le + g] = w[p];
      c[g * 4] = i, c[g * 4 + 1] = u + 1, c[g * 4 + 2] = x, c[g * 4 + 3] = 1;
      const _ = this.reachTimeline.get(v);
      if (_)
        for (const [p, E] of _) {
          const d = Math.floor((p - i) / this.nativeBucket);
          d >= 0 && d < he && (b[d * le + g] = Math.max(0, Math.min(1, E)));
        }
      this.columnMeta[g] = { timestamp_ms: v, price_min: i, price_step: this.nativeBucket, num_rows: u + 1, max_value: x, finalized: !0, values: w };
    }
    this.ringCount = T, e.bindTexture(e.TEXTURE_2D, this.dataTex), e.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, le, he, e.RED, e.FLOAT, h), e.bindTexture(e.TEXTURE_2D, this.metaTex), e.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, le, 1, e.RGBA, e.FLOAT, c), e.bindTexture(e.TEXTURE_2D, this.reachTex), e.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, le, he, e.RED, e.FLOAT, b), this.gpuDirty = !1;
  }
  render(e, s, o, a, r, l) {
    const i = this.gl, h = this.canvas;
    if (!i || !h || !this.program || (this.gpuDirty && this.syncGpuFromTimeline(), this.ringCount === 0)) return;
    this.viewTimeMin = e, this.viewTimeMax = s, this.viewPriceMin = o, this.viewPriceMax = a;
    const c = window.devicePixelRatio || 1, b = h.clientWidth, T = h.clientHeight;
    b < 10 || T < 10 || (h.width = Math.round(b * c), h.height = Math.round(T * c), i.viewport(0, 0, h.width, h.height), i.clearColor(0.1647, 0.1647, 0.1647, 1), i.clear(i.COLOR_BUFFER_BIT), i.useProgram(this.program), i.bindVertexArray(this.vao), i.activeTexture(i.TEXTURE0), i.bindTexture(i.TEXTURE_2D, this.dataTex), i.uniform1i(this.uniforms.u_data, 0), i.activeTexture(i.TEXTURE1), i.bindTexture(i.TEXTURE_2D, this.metaTex), i.uniform1i(this.uniforms.u_meta, 1), i.activeTexture(i.TEXTURE2), i.bindTexture(i.TEXTURE_2D, this.colormapTex), i.uniform1i(this.uniforms.u_colormap, 2), i.activeTexture(i.TEXTURE3), i.bindTexture(i.TEXTURE_2D, this.colormapWarmTex), i.uniform1i(this.uniforms.u_colormap_warm, 3), i.activeTexture(i.TEXTURE4), i.bindTexture(i.TEXTURE_2D, this.reachTex), i.uniform1i(this.uniforms.u_reach_data, 4), i.uniform2f(this.uniforms.u_plot_origin, r[0] * c, r[1] * c), i.uniform2f(this.uniforms.u_plot_size, l[0] * c, l[1] * c), i.uniform1f(this.uniforms.u_viewport_time_min, e / 1e3), i.uniform1f(this.uniforms.u_viewport_time_max, s / 1e3), i.uniform1f(this.uniforms.u_viewport_price_min, o), i.uniform1f(this.uniforms.u_viewport_price_max, a), i.uniform1f(this.uniforms.u_data_time_start, this.gpuOriginMs / 1e3), i.uniform1f(this.uniforms.u_observation_hold_until, this.observationHoldUntilMs / 1e3), i.uniform1f(this.uniforms.u_time_step, this.timeStepMs / 1e3), i.uniform1i(this.uniforms.u_ring_start, 0), i.uniform1i(this.uniforms.u_ring_count, this.ringCount), i.uniform1i(this.uniforms.u_ring_size, le), i.uniform1i(this.uniforms.u_max_rows, he), i.uniform1f(this.uniforms.u_bucket_size, this.nativeBucket || 0.01), i.uniform1i(this.uniforms.u_bucket_multiplier, this.bucketMultiplier), i.uniform1f(this.uniforms.u_sensitivity, this.sensitivity), i.uniform1f(this.uniforms.u_max_qty, this.globalMaxQty), i.uniform1f(this.uniforms.u_color_low, this.colorLow), i.uniform1f(this.uniforms.u_color_peak, this.colorPeak), i.uniform1i(this.uniforms.u_mode, this.mode === "liquidation" ? 1 : this.mode === "flow" ? 2 : 0), i.uniform1f(this.uniforms.u_opacity, this.opacity), i.uniform1i(this.uniforms.u_use_reach, this.useReach ? 1 : 0), i.uniform1i(this.uniforms.u_use_warm, 0), i.drawArrays(i.TRIANGLES, 0, 3), i.bindVertexArray(null));
  }
  dispose() {
    const e = this.gl;
    e && (this.dataTex && e.deleteTexture(this.dataTex), this.metaTex && e.deleteTexture(this.metaTex), this.reachTex && e.deleteTexture(this.reachTex), this.colormapTex && e.deleteTexture(this.colormapTex), this.colormapWarmTex && e.deleteTexture(this.colormapWarmTex), this.program && e.deleteProgram(this.program), this.vao && e.deleteVertexArray(this.vao), this.gl = null);
  }
}
const ps = y.lazy(() => Promise.resolve().then(() => os).then((t) => ({ default: t.DepthHeatPane }))), qe = [
  // SECONDS PRO locked
  { label: "1s", ms: 1e3, sec: 1 },
  { label: "5s", ms: 5e3, sec: 5 },
  { label: "15s", ms: 15e3, sec: 15 },
  { label: "30s", ms: 3e4, sec: 30 },
  // MINUTES
  { label: "1m", ms: 6e4, sec: 60 },
  { label: "3m", ms: 18e4, sec: 180 },
  { label: "5m", ms: 3e5, sec: 300 },
  { label: "15m", ms: 9e5, sec: 900 },
  { label: "30m", ms: 18e5, sec: 1800 },
  // HOURS
  { label: "1h", ms: 36e5, sec: 3600 },
  { label: "2h", ms: 72e5, sec: 7200 },
  { label: "4h", ms: 144e5, sec: 14400 },
  { label: "6h", ms: 216e5, sec: 21600 },
  { label: "12h", ms: 432e5, sec: 43200 },
  // DAYS
  { label: "1D", ms: 864e5, sec: 86400 },
  { label: "1W", ms: 6048e5, sec: 604800 }
], bs = [
  { id: "orderbook", label: "Orderbook" },
  { id: "liquidation", label: "Liquidations" },
  { id: "volume_delta", label: "Volume Delta" },
  { id: "trade_intensity", label: "Trade Intensity" },
  { id: "flow", label: "Flow & Positioning" }
];
function nt({ symbol: t, provider: e, onToggleKind: s, liqColormap: o, obColormap: a, opacity: r, intensity: l, gamma: i, noiseFloor: h, tickPerRow: c, halfLife: b }) {
  const T = y.useRef(null), v = y.useRef(null), f = y.useRef(null), g = y.useRef(null), w = y.useRef(0), u = y.useRef(null), [x, _] = y.useState(qe[4]), [p, E] = y.useState(() => {
    try {
      const m = localStorage.getItem("ed_fav_tf");
      return new Set(m ? JSON.parse(m) : ["1m", "5m", "15m", "1h", "4h", "1D"]);
    } catch {
      return /* @__PURE__ */ new Set(["1m", "5m", "15m", "1h", "4h", "1D"]);
    }
  }), [d, k] = y.useState("orderbook"), [C, O] = y.useState("ember"), [L, q] = y.useState("orderbook"), [N, I] = y.useState(l ?? 1), [$, W] = y.useState(r ?? 0.95), [J, ye] = y.useState(c ?? 1);
  y.useEffect(() => {
    o && O(o);
  }, [o]), y.useEffect(() => {
    a && q(a);
  }, [a]), y.useEffect(() => {
    r !== void 0 && W(r);
  }, [r]), y.useEffect(() => {
    l !== void 0 && I(l);
  }, [l]), y.useEffect(() => {
    c !== void 0 && ye(c);
  }, [c]);
  const [pe, be] = y.useState(!1), [ce, de] = y.useState(!1), [R, A] = y.useState(!0), [H, Te] = y.useState("loading"), [oe, ue] = y.useState([0, 0]), [Z, S] = y.useState([Date.now() - 36e5, Date.now()]), [U, ee] = y.useState(null), [fe, Me] = y.useState(!1), [G, Ie] = y.useState(e || "binance"), [Pe, Oe] = y.useState([]), [F, Q] = y.useState({ bid: null, ask: null }), [ge, ve] = y.useState(!1), [Re, Ce] = y.useState(!0), je = y.useMemo(() => G === "hyperliquid" ? 15 : G === "binance" ? 20 : G === "coinbase" ? 50 : 33, [G]);
  y.useEffect(() => {
    try {
      localStorage.setItem("ed_fav_tf", JSON.stringify([...p]));
    } catch {
    }
  }, [p]);
  const Ye = y.useCallback((m, B) => {
    B?.preventDefault(), E((K) => {
      const te = new Set(K);
      if (te.has(m)) te.delete(m);
      else {
        if (te.size >= 6) {
          const se = te.values().next().value;
          se && te.delete(se);
        }
        te.add(m);
      }
      return te;
    });
  }, []);
  y.useEffect(() => {
    const m = T.current, B = f.current;
    if (!m || !B) return;
    const K = new ms();
    if (!K.attach(m)) {
      console.warn("WebGL2 not available, fallback to Canvas2D DepthHeatPane"), ve(!0);
      return;
    }
    K.setColumnInterval(x.ms), K.setMode(d), K.setLiqColormap(C), K.setObColormap(L), K.setSensitivity(N), K.setOpacity($), K.setBucketMultiplier(J), K.setReachModulation(pe), K.setLinearFiltering(ce), g.current = K;
    const se = new ResizeObserver(() => {
    });
    return se.observe(B), () => {
      se.disconnect(), K.dispose(), g.current = null;
    };
  }, []), y.useEffect(() => {
    const m = g.current;
    m && (m.setMode(d), m.setLiqColormap(C), m.setObColormap(L), m.setSensitivity(N), m.setOpacity($), m.setBucketMultiplier(J), m.setReachModulation(pe), m.setLinearFiltering(ce), m.setColumnInterval(x.ms));
  }, [d, C, L, N, $, J, pe, ce, x.ms]), y.useEffect(() => {
    if (!Re) return;
    const m = setInterval(() => {
      S([Date.now() - 36e5, Date.now()]);
    }, 1e3);
    return () => clearInterval(m);
  }, [Re]), y.useEffect(() => {
    let m = !1, B = null;
    const K = g.current;
    if (!K && !ge) return;
    const te = async () => {
      Te("loading history...");
      let se = 0.5, P = !1;
      try {
        const me = Date.now(), we = me - 4 * 3600 * 1e3;
        let M = !1;
        try {
          const V = await fetch(`/api/orderflow/heatmap?symbol=${encodeURIComponent(t)}&provider=${encodeURIComponent(G)}&from=${we / 1e3}&to=${me / 1e3}&column_ms=${x.ms}&max_levels=80`);
          if (V.ok) {
            const X = await V.json(), D = X.columns || [];
            if (D.length) {
              X.bucket_size && (se = X.bucket_size);
              for (const j of D) {
                const z = /* @__PURE__ */ new Map(), Y = j.qtys || [], ie = j.price_min || 0, ne = j.bucket_size || se || 0.5;
                for (let Se = 0; Se < Y.length; Se++) {
                  const ke = Y[Se];
                  if (Math.abs(ke) < 1e-4) continue;
                  const Ne = ie + Se * ne;
                  z.set(Ne, ke);
                }
                z.size && (K?.processSnapshot(j.timestamp_ms, z, ne), P = !0);
              }
              if (X.price_min && X.price_max) {
                const j = (X.price_max - X.price_min) * 0.15;
                ue([X.price_min - j, X.price_max + j]);
              }
              M = P, Te(`${G.toUpperCase()} ${je}ms ${d} — heatmap ${D.length} cols live_buffer`);
            }
          }
        } catch {
        }
        if (!M) {
          const V = await fetch(`/api/orderflow/depth?symbol=${encodeURIComponent(t)}&provider=${encodeURIComponent(G)}&from=${we / 1e3}&to=${me / 1e3}&column_ms=${x.ms}&max_levels=80`);
          if (V.ok) {
            const X = await V.json();
            if (m) return;
            const D = X.events || [];
            for (const z of D)
              if (z.bids?.length || z.asks?.length) {
                const Y = [...z.bids || [], ...z.asks || []];
                if (Y.length) {
                  const ne = Y.map(([ke]) => ke).sort((ke, Ne) => ke - Ne), Se = ne.slice(1).map((ke, Ne) => ke - ne[Ne]).filter((ke) => ke > 0 && ke < 1e3);
                  Se.length && (se = Math.min(...Se));
                }
                const ie = /* @__PURE__ */ new Map();
                for (const [ne, Se] of z.bids) ie.set(ne, (ie.get(ne) || 0) + Se);
                for (const [ne, Se] of z.asks) ie.set(ne, (ie.get(ne) || 0) + Se);
                K?.processSnapshot(z.ts * 1e3, ie, se), P = !0;
              }
            const j = X.trades || [];
            if (Oe(j.slice(-500)), D.length) {
              let z = 1 / 0, Y = -1 / 0;
              for (const ie of D.slice(-30)) {
                for (const [ne] of ie.bids)
                  ne < z && (z = ne), ne > Y && (Y = ne);
                for (const [ne] of ie.asks)
                  ne < z && (z = ne), ne > Y && (Y = ne);
              }
              if (isFinite(z) && isFinite(Y) && Y > z) {
                const ie = (Y - z) * 0.15;
                ue([z - ie, Y + ie]), P = !0;
              }
            }
          } else {
            const X = await V.json().catch(() => ({}));
            m || Te(`no depth: ${X.detail || V.status} — live only`);
          }
        }
        try {
          const V = await fetch(`/api/orderflow/book?symbol=${encodeURIComponent(t)}&provider=${encodeURIComponent(G)}`);
          if (V.ok) {
            const X = await V.json(), D = X.best_bid ?? null, j = X.best_ask ?? null;
            if (Q({ bid: D, ask: j }), D !== null && j !== null) {
              const z = (D + j) / 2, Y = j - D, ie = Math.max(Y * 10, z * 0.01);
              ue([z - ie, z + ie]), P = !0;
            } else D !== null ? (ue([D * 0.99, D * 1.01]), P = !0) : j !== null && (ue([j * 0.99, j * 1.01]), P = !0);
          }
        } catch {
        }
        m || Te(P ? `${G.toUpperCase()} ${je}ms ${d} — live` : `${G.toUpperCase()} ${je}ms — waiting for live book...`);
      } catch (me) {
        m || Te(`engine unreachable: ${me}`);
      }
      const ae = `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(t)}&provider=${encodeURIComponent(G)}`;
      try {
        B = new WebSocket(ae), B.onopen = () => {
          m || Te(`${G.toUpperCase()} ${je}ms ${d} — WS live`);
        }, B.onmessage = (me) => {
          if (!m)
            try {
              const we = JSON.parse(me.data);
              if (we.type === "depth") {
                const M = we.event, V = /* @__PURE__ */ new Map();
                for (const [j, z] of M.bids) V.set(j, (V.get(j) || 0) + z);
                for (const [j, z] of M.asks) V.set(j, (V.get(j) || 0) + z);
                if (V.size) {
                  const j = Array.from(V.keys()).sort((Y, ie) => Y - ie), z = j.slice(1).map((Y, ie) => Y - j[ie]).filter((Y) => Y > 0 && Y < 1e3);
                  z.length && (se = Math.min(...z));
                }
                K?.updateLiveColumn(M.ts * 1e3, V);
                let X = null, D = null;
                for (const [j] of M.bids) (X === null || j > X) && (X = j);
                for (const [j] of M.asks) (D === null || j < D) && (D = j);
                (X !== null || D !== null) && (Q({ bid: X, ask: D }), ue((j) => {
                  if (j[0] !== 0 || j[1] !== 0) return j;
                  if (X !== null && D !== null) {
                    const z = (X + D) / 2, Y = Math.max((D - X) * 10, z * 0.01);
                    return [z - Y, z + Y];
                  }
                  return j;
                }));
              } else we.type === "trade" && Oe((M) => [...M.slice(-499), we.event]);
            } catch {
            }
        }, B.onerror = () => {
          m || Te(`${G.toUpperCase()} WS error — retrying...`);
        }, B.onclose = () => {
          m || Te(`${G.toUpperCase()} WS closed — reconnecting...`), m || setTimeout(() => {
            m || te();
          }, 2e3);
        };
      } catch (me) {
        m || Te(`WS failed: ${me}`);
      }
    };
    return te(), () => {
      m = !0;
      try {
        B?.close();
      } catch {
      }
    };
  }, [t, G, x.ms, je, d, ge]), y.useEffect(() => {
    const m = T.current, B = v.current, K = f.current, te = g.current;
    if (!m || !B || !K || !te) return;
    const se = () => {
      const P = K.getBoundingClientRect();
      if (P.width < 10 || P.height < 10) {
        w.current = requestAnimationFrame(se);
        return;
      }
      const xe = window.devicePixelRatio || 1;
      B.width = Math.round(P.width * xe), B.height = Math.round(P.height * xe), B.style.width = `${P.width}px`, B.style.height = `${P.height}px`;
      let ae = oe;
      if (ae[0] === 0 && ae[1] === 0)
        if (F.bid !== null && F.ask !== null) {
          const V = (F.bid + F.ask) / 2, X = Math.max((F.ask - F.bid) * 10, V * 0.01);
          ae = [V - X, V + X];
        } else
          ae = [6e4, 7e4];
      const me = [0, 0], we = [P.width - 58, P.height - 20];
      te.render(Z[0], Z[1], ae[0], ae[1], me, we);
      const M = B.getContext("2d");
      if (M) {
        M.setTransform(xe, 0, 0, xe, 0, 0), M.clearRect(0, 0, P.width, P.height), M.fillStyle = "#2a2a2a", M.fillRect(P.width - 58, 0, 58, P.height - 20), M.strokeStyle = "#3a3a3a", M.beginPath(), M.moveTo(P.width - 58, 0), M.lineTo(P.width - 58, P.height - 20), M.stroke(), M.fillStyle = "#262626", M.fillRect(0, P.height - 20, P.width, 20), M.strokeStyle = "#3a3a3a", M.beginPath(), M.moveTo(0, P.height - 20), M.lineTo(P.width, P.height - 20), M.stroke();
        const V = ae[1] - ae[0] || 1e3;
        M.fillStyle = "#e8e8e8", M.font = "10px monospace", M.textAlign = "right";
        for (let D = 0; D <= 4; D++) {
          const j = D / 4 * (P.height - 20), z = ae[1] - D / 4 * V;
          M.fillText(z.toFixed(2), P.width - 4, j + 10), M.strokeStyle = "#3a3a3a", M.beginPath(), M.moveTo(0, j), M.lineTo(P.width - 58, j), M.stroke();
        }
        const X = Z[1] - Z[0];
        M.textAlign = "center", M.fillStyle = "#b9b9b9";
        for (let D = 0; D <= 4; D++) {
          const j = D / 4 * (P.width - 58), z = new Date(Z[0] + D / 4 * X);
          M.fillText(z.toLocaleTimeString(), j, P.height - 5);
        }
        if (U && (M.strokeStyle = "#d0d0d0", M.setLineDash([2, 2]), M.beginPath(), M.moveTo(U.x, 0), M.lineTo(U.x, P.height - 20), M.stroke(), M.beginPath(), M.moveTo(0, U.y), M.lineTo(P.width - 58, U.y), M.stroke(), M.setLineDash([]), M.fillStyle = "#e8e8e8", M.fillRect(U.x + 4, U.y - 20, 120, 18), M.fillStyle = "#1c1c1c", M.fillText(`${U.price.toFixed(2)} @ ${new Date(U.time).toLocaleTimeString()}`, U.x + 8, U.y - 8)), R && Pe.length)
          for (const D of Pe.slice(-100)) {
            const j = (D.ts * 1e3 - Z[0]) / Math.max(X, 1) * (P.width - 58), z = (ae[1] - D.price) / Math.max(V, 1) * (P.height - 20);
            if (j < 0 || j > P.width - 58 || z < 0 || z > P.height - 20) continue;
            const Y = D.side === "BUY" || D.side === "B";
            M.fillStyle = Y ? "#21b3a4" : "#f0426c";
            const ie = Math.min(8, Math.max(2, Math.log10(D.size + 1) * 2));
            M.beginPath(), M.arc(j, z, ie, 0, Math.PI * 2), M.fill();
          }
        if (F.bid !== null) {
          const D = (ae[1] - F.bid) / Math.max(V, 1) * (P.height - 20);
          M.strokeStyle = "#21b3a4", M.setLineDash([4, 2]), M.beginPath(), M.moveTo(0, D), M.lineTo(P.width - 58, D), M.stroke(), M.setLineDash([]);
        }
        if (F.ask !== null) {
          const D = (ae[1] - F.ask) / Math.max(V, 1) * (P.height - 20);
          M.strokeStyle = "#f0426c", M.setLineDash([4, 2]), M.beginPath(), M.moveTo(0, D), M.lineTo(P.width - 58, D), M.stroke(), M.setLineDash([]);
        }
      }
      w.current = requestAnimationFrame(se);
    };
    return w.current = requestAnimationFrame(se), () => cancelAnimationFrame(w.current);
  }, [Z, oe, U, Pe, R, F]);
  const ft = y.useCallback((m) => {
    m.preventDefault();
    const B = m.currentTarget.getBoundingClientRect(), K = B.width - 58;
    if (B.height - 20, m.shiftKey) {
      const te = oe[1] - oe[0] || 1e3, se = m.deltaY > 0 ? 1.1 : 0.9, P = (oe[0] + oe[1]) / 2, xe = te * se / 2;
      ue([P - xe, P + xe]);
    } else {
      const te = Z[1] - Z[0], se = m.deltaY > 0 ? 1.1 : 0.9, xe = (m.clientX - B.left) / Math.max(K, 1), ae = Z[0] + xe * te, me = te * se;
      S([ae - xe * me, ae + (1 - xe) * me]);
    }
  }, [Z, oe]), mt = y.useCallback((m) => {
    u.current = { x: m.clientX, y: m.clientY, t0: [...Z], p0: [...oe] };
  }, [Z, oe]), pt = y.useCallback((m) => {
    const B = m.currentTarget.getBoundingClientRect(), K = m.clientX - B.left, te = m.clientY - B.top, se = B.width - 58, P = B.height - 20, xe = Z[1] - Z[0], ae = oe[1] - oe[0] || 1e3, me = (oe[0] + oe[1]) / 2 + (P / 2 - te) / (P / ae), we = Z[0] + K / Math.max(se, 1) * xe;
    if (ee({ x: K, y: te, price: me, time: we }), u.current && m.buttons & 1) {
      const M = m.clientX - u.current.x, V = m.clientY - u.current.y, X = M / Math.max(se, 1) * xe, D = V / Math.max(P, 1) * ae;
      S([u.current.t0[0] - X, u.current.t0[1] - X]);
      const j = u.current.p0[0] === 0 && u.current.p0[1] === 0 ? F.bid && F.ask ? [(F.bid + F.ask) / 2 - 500, (F.bid + F.ask) / 2 + 500] : [6e4, 7e4] : u.current.p0;
      ue([j[0] + D, j[1] + D]);
    }
  }, [Z, oe, F]), bt = y.useCallback(() => {
    u.current = null;
  }, []), gt = y.useCallback(() => {
    u.current = null, ee(null);
  }, []), xt = y.useCallback(() => {
    if (Ce(!0), S([Date.now() - 36e5, Date.now()]), F.bid !== null && F.ask !== null) {
      const m = (F.bid + F.ask) / 2, B = Math.max((F.ask - F.bid) * 10, m * 0.01);
      ue([m - B, m + B]);
    }
  }, [F]);
  if (ge)
    return /* @__PURE__ */ n.jsx(y.Suspense, { fallback: /* @__PURE__ */ n.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-[var(--panel)] text-[var(--dim)] text-[11px]", children: "Loading fallback depth..." }), children: /* @__PURE__ */ n.jsx(ps, { symbol: t, sourceProvider: G, onToggleKind: s }) });
  const Xe = qe.filter((m) => p.has(m.label)), yt = qe.filter((m) => !p.has(m.label));
  return /* @__PURE__ */ n.jsxs("div", { className: "absolute inset-0 flex flex-col bg-[#1c1c1c] text-[#e8e8e8] select-none", children: [
    /* @__PURE__ */ n.jsxs("div", { className: "flex items-center gap-1 px-2 py-1 border-b border-[#3a3a3a] text-[11px] flex-wrap shrink-0 bg-[#2a2a2a]", children: [
      /* @__PURE__ */ n.jsx("span", { className: "font-bold opacity-80 tracking-wider", children: "EDGEDEPTH HEATMAP" }),
      /* @__PURE__ */ n.jsx("span", { className: "font-mono font-semibold ml-1", children: t }),
      /* @__PURE__ */ n.jsx("span", { className: "text-[9px] px-1.5 py-0.5 rounded bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] truncate max-w-[240px]", children: H }),
      /* @__PURE__ */ n.jsx("div", { className: "flex items-center gap-0.5 ml-2 border border-[#3a3a3a] rounded overflow-hidden", children: ["binance", "coinbase", "hyperliquid"].map((m) => /* @__PURE__ */ n.jsxs(
        "button",
        {
          onClick: () => Ie(m),
          className: `px-2 py-0.5 text-[10px] font-medium transition-colors ${G === m ? "bg-[#d0d0d0] text-[#1c1c1c]" : "bg-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
          title: `${m} ${m === "hyperliquid" ? "15ms ⚡ ultra-fast" : m === "binance" ? "20ms" : "50ms"}`,
          children: [
            m.toUpperCase(),
            " ",
            m === "hyperliquid" ? "⚡15ms" : m === "binance" ? "20ms" : "50ms"
          ]
        },
        m
      )) }),
      /* @__PURE__ */ n.jsxs("div", { className: "flex items-center gap-0.5 ml-2 border border-[#3a3a3a] rounded overflow-hidden", children: [
        Xe.map((m) => /* @__PURE__ */ n.jsxs(
          "button",
          {
            onClick: () => _(m),
            onContextMenu: (B) => {
              B.preventDefault(), Ye(m.label, B);
            },
            className: `px-1.5 py-0.5 text-[10px] ${x.label === m.label ? "bg-[#414141] text-[#e8e8e8]" : "bg-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"} `,
            title: m.pro ? "SECONDS PRO — locked" : `Right-click to unpin (fav ${Xe.length}/6)`,
            children: [
              m.label,
              m.pro ? " PRO" : ""
            ]
          },
          m.label
        )),
        /* @__PURE__ */ n.jsxs("span", { className: "text-[8px] px-1 text-[#b9b9b9] border-l border-[#3a3a3a]", children: [
          "FAV ",
          Xe.length,
          "/6"
        ] })
      ] }),
      /* @__PURE__ */ n.jsx("div", { className: "flex items-center gap-0.5 ml-1 border border-[#3a3a3a] rounded overflow-hidden", children: yt.slice(0, 8).map((m) => /* @__PURE__ */ n.jsx(
        "button",
        {
          onClick: () => _(m),
          onContextMenu: (B) => {
            B.preventDefault(), Ye(m.label, B);
          },
          className: "px-1.5 py-0.5 text-[10px] opacity-60 hover:opacity-100 hover:bg-[#343434] ",
          title: m.pro ? "PRO — right-click to pin" : "Click sets, right-click pins max 6",
          children: m.label
        },
        m.label
      )) }),
      /* @__PURE__ */ n.jsx("select", { value: d, onChange: (m) => k(m.target.value), className: "ml-1 bg-[#262626] border border-[#3a3a3a] rounded px-1 py-0.5 text-[10px] text-[#e8e8e8]", children: bs.map((m) => /* @__PURE__ */ n.jsx("option", { value: m.id, children: m.label }, m.id)) }),
      /* @__PURE__ */ n.jsxs("div", { className: "ml-auto flex items-center gap-1", children: [
        /* @__PURE__ */ n.jsx("button", { onClick: () => Ce((m) => !m), className: `px-1.5 py-0.5 rounded border text-[10px] ${Re ? "bg-[#d0d0d0] text-[#1c1c1c] border-[#d0d0d0]" : "border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434]"}`, children: Re ? "FOLLOW" : "FREE" }),
        /* @__PURE__ */ n.jsx("button", { onClick: () => A((m) => !m), className: `px-1.5 py-0.5 rounded border text-[10px] ${R ? "bg-[#343434] border-[#d0d0d0]/50 text-[#e8e8e8]" : "border-[#3a3a3a] text-[#b9b9b9]"}`, children: "Bubbles" }),
        /* @__PURE__ */ n.jsx("button", { onClick: () => ve(!0), className: "px-1.5 py-0.5 rounded border border-[#3a3a3a] text-[10px] text-[#b9b9b9] hover:bg-[#343434]", title: "Switch to legacy Canvas2D renderer", children: "Legacy" }),
        /* @__PURE__ */ n.jsx("button", { onClick: () => Me((m) => !m), className: "px-2 py-0.5 rounded border border-[#3a3a3a] text-[10px] hover:bg-[#343434] text-[#e8e8e8]", children: "⚙" }),
        s && /* @__PURE__ */ n.jsx("button", { onClick: s, className: "px-2 py-0.5 rounded border border-[#3a3a3a] text-[10px] hover:bg-[#343434] text-[#b9b9b9]", children: "chart ⇄" })
      ] })
    ] }),
    /* @__PURE__ */ n.jsxs("div", { ref: f, className: "relative flex-1 min-h-0 w-full h-full bg-[#2a2a2a]", onWheel: ft, onMouseDown: mt, onMouseMove: pt, onMouseUp: bt, onMouseLeave: gt, onDoubleClick: xt, children: [
      /* @__PURE__ */ n.jsx("canvas", { ref: T, className: "absolute inset-0 w-full h-full block", style: { width: "100%", height: "100%" } }),
      /* @__PURE__ */ n.jsx("canvas", { ref: v, className: "absolute inset-0 w-full h-full block pointer-events-none", style: { width: "100%", height: "100%" } }),
      oe[0] === 0 && oe[1] === 0 && !F.bid && /* @__PURE__ */ n.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none", children: [
        /* @__PURE__ */ n.jsxs("div", { className: "text-[12px] font-mono text-[#e8e8e8] opacity-70", children: [
          "Waiting for ",
          t,
          " depth — ",
          H
        ] }),
        /* @__PURE__ */ n.jsxs("div", { className: "text-[10px] text-[#b9b9b9] opacity-50 mt-1", children: [
          "Provider: ",
          G,
          " • TF: ",
          x.label,
          " • Flush: ",
          je,
          "ms"
        ] }),
        /* @__PURE__ */ n.jsx("div", { className: "text-[10px] text-[#b9b9b9] opacity-40 mt-2", children: "If live_only, WS will fill after 1-2s. Click Legacy if WebGL2 fails." })
      ] })
    ] }),
    fe && /* @__PURE__ */ n.jsxs("div", { className: "absolute top-10 right-2 z-20 w-[340px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl p-3 text-[11px] space-y-3 max-h-[80vh] overflow-auto", children: [
      /* @__PURE__ */ n.jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ n.jsx("span", { className: "font-bold tracking-wider text-[10px] text-[#b9b9b9]", children: "HEATMAP TWEAKS — ADVANCED" }),
        /* @__PURE__ */ n.jsx("button", { onClick: () => Me(!1), className: "text-[14px] text-[#b9b9b9] hover:text-[#e8e8e8]", children: "×" })
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ n.jsx("div", { className: "text-[10px] text-[#b9b9b9] uppercase", children: "Colormap — data colors exact EdgeDepth, chrome zinc" }),
        d === "liquidation" ? /* @__PURE__ */ n.jsx("div", { className: "flex gap-1", children: ["inferno", "ember", "viridis", "magma"].map((m) => /* @__PURE__ */ n.jsx("button", { onClick: () => O(m), className: `flex-1 py-1 rounded border text-[10px] capitalize ${C === m ? "bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]" : "border-[#3a3a3a] bg-[#2a2a2a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`, children: m }, m)) }) : /* @__PURE__ */ n.jsx("div", { className: "flex gap-1", children: ["orderbook", "deepdom", "bookmap", "realtime", "realtime_warm"].map((m) => /* @__PURE__ */ n.jsx("button", { onClick: () => q(m), className: `flex-1 py-1 rounded border text-[10px] capitalize ${L === m ? "bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]" : "border-[#3a3a3a] bg-[#2a2a2a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`, children: m }, m)) })
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ n.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ n.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Sensitivity ",
            N.toFixed(2)
          ] }),
          /* @__PURE__ */ n.jsx("input", { type: "range", min: 0.1, max: 3, step: 0.1, value: N, onChange: (m) => I(parseFloat(m.target.value)), className: "accent-[#d0d0d0]" })
        ] }),
        /* @__PURE__ */ n.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ n.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Opacity ",
            Math.round($ * 100),
            "%"
          ] }),
          /* @__PURE__ */ n.jsx("input", { type: "range", min: 0.1, max: 1, step: 0.05, value: $, onChange: (m) => W(parseFloat(m.target.value)), className: "accent-[#d0d0d0]" })
        ] })
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ n.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ n.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Bucket ×",
            J
          ] }),
          /* @__PURE__ */ n.jsx("input", { type: "range", min: 1, max: 8, step: 1, value: J, onChange: (m) => ye(parseInt(m.target.value)), className: "accent-[#d0d0d0]" })
        ] }),
        /* @__PURE__ */ n.jsxs("label", { className: "flex items-center gap-2 mt-4", children: [
          /* @__PURE__ */ n.jsx("input", { type: "checkbox", checked: ce, onChange: (m) => de(m.target.checked) }),
          /* @__PURE__ */ n.jsx("span", { className: "text-[10px] text-[#e8e8e8]", children: "Linear filter (smooth cloud)" })
        ] })
      ] }),
      d === "liquidation" && /* @__PURE__ */ n.jsxs("label", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ n.jsx("input", { type: "checkbox", checked: pe, onChange: (m) => be(m.target.checked) }),
        /* @__PURE__ */ n.jsx("span", { className: "text-[10px] text-[#e8e8e8]", children: "Reach modulation (cone around mark)" })
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "pt-2 border-t border-[#3a3a3a] space-y-1 text-[10px] text-[#b9b9b9]", children: [
        /* @__PURE__ */ n.jsx("div", { children: "• GPU ring buffer 8192×1024 R32F + meta + reach — exact EdgeDepth" }),
        /* @__PURE__ */ n.jsx("div", { children: "• Ultra-fast: Hyperliquid 15ms ⚡, Binance 20ms, Coinbase 50ms — Binance faster than Coinbase" }),
        /* @__PURE__ */ n.jsx("div", { children: "• Rolling 4h buffer (14400 cols @1s) — never blank, live_only served from grid viewport" }),
        /* @__PURE__ */ n.jsx("div", { children: "• Chrome: #1c1c1c/#2a2a2a/#3a3a3a #e8e8e8/#b9b9b9 #21b3a4/#f0426c zinc, data: Ember/Viridis/Magma/Inferno exact" }),
        /* @__PURE__ */ n.jsx("div", { children: "• Shift+wheel = price zoom, wheel = time zoom, drag = pan, dblclick = recenter" })
      ] })
    ] })
  ] });
}
const xs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EdgeDepthHeatmapPane: nt,
  default: nt
}, Symbol.toStringTag, { value: "Module" }));
export {
  ns as D,
  xs as E,
  os as a
};
