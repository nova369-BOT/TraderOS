import { r as T, j as n, g as ut } from "./react-vendor-C0yw3i6b.js";
const it = ["deepdom", "bookmap", "heat", "greyscale"], ft = [
  [0, [6, 2, 5]],
  [0.3, [58, 10, 16]],
  [0.55, [126, 26, 16]],
  [0.75, [206, 64, 12]],
  [0.9, [255, 140, 0]],
  [1, [255, 214, 96]]
], mt = [
  [0, [2, 5, 11]],
  [0.3, [6, 24, 50]],
  [0.55, [10, 48, 94]],
  [0.75, [13, 92, 112]],
  [0.9, [26, 190, 92]],
  [1, [126, 255, 152]]
], pt = [
  [0, [0, 0, 0]],
  [0.35, [8, 34, 61]],
  [0.6, [14, 107, 168]],
  [0.8, [110, 185, 228]],
  [0.9, [226, 244, 255]],
  [0.95, [255, 202, 62]],
  [1, [255, 92, 40]]
], Ve = [
  [0, [0, 0, 0]],
  [0.25, [0, 0, 255]],
  [0.55, [255, 255, 0]],
  [0.78, [255, 140, 0]],
  [1, [255, 0, 0]]
];
function Ye(t, e) {
  switch (t) {
    case "deepdom":
      return e === "ask" ? ft : mt;
    case "bookmap":
      return pt;
    case "heat":
      return Ve;
    case "greyscale":
      return Ve;
  }
}
function bt(t, e) {
  for (let i = 1; i < t.length; i++) {
    const [o, a] = t[i], [r, l] = t[i - 1];
    if (e <= o) {
      const s = (e - r) / (o - r);
      return [
        l[0] + (a[0] - l[0]) * s,
        l[1] + (a[1] - l[1]) * s,
        l[2] + (a[2] - l[2]) * s
      ];
    }
  }
  return t[t.length - 1][1];
}
function Xe(t, e, i) {
  const o = new Uint8ClampedArray(1024), a = 1 - Math.min(1, Math.max(0, e.dimming)), r = 1 + e.contrast, l = e.brightness * 255, s = i >= 2 ? Math.ceil(256 / Math.min(i, 256)) : 1, c = (h) => {
    const b = h / 255;
    let y, v, d;
    t === null ? y = v = d = b * 255 : [y, v, d] = bt(t, b);
    const g = (y + v + d) / 3;
    return y = g + (y - g) * e.intensity, v = g + (v - g) * e.intensity, d = g + (d - g) * e.intensity, y *= a, v *= a, d *= a, y = (y / 255 - 0.5) * r * 255 + 127.5 + l, v = (v / 255 - 0.5) * r * 255 + 127.5 + l, d = (d / 255 - 0.5) * r * 255 + 127.5 + l, [
      Math.min(255, Math.max(0, y)),
      Math.min(255, Math.max(0, v)),
      Math.min(255, Math.max(0, d))
    ];
  };
  for (let h = 0; h < 256; h++) {
    const b = s > 1 ? Math.min(Math.floor(h / s) * s + Math.floor(s / 2), 255) : h, [y, v, d] = c(b);
    o[h * 4] = y, o[h * 4 + 1] = v, o[h * 4 + 2] = d, o[h * 4 + 3] = 255;
  }
  return o;
}
function Oe(t, e) {
  const i = e !== void 0 ? e : t.smoothing, o = it.includes(t.scheme) ? t.scheme : "heat";
  if (o === "greyscale") {
    const l = Xe(null, t, i);
    return { ask: l, bid: l };
  }
  const a = Xe(Ye(o, "ask"), t, i), r = o === "deepdom" ? Xe(Ye(o, "bid"), t, i) : a;
  return { ask: a, bid: r };
}
function gt(t) {
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
const nt = {
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
}, ot = "lset-depth-global-scheme", at = "lset-depth-global-apply", Fe = "lse-depth-global-scheme";
function xt() {
  let t = "heat", e = !1;
  try {
    const i = localStorage.getItem(ot);
    (i === "heat" || i === "greyscale" || i === "deepdom" || i === "bookmap") && (t = i), e = localStorage.getItem(at) === "1";
  } catch {
  }
  return { scheme: t, apply: e };
}
function qe(t, e) {
  try {
    localStorage.setItem(ot, t), localStorage.setItem(at, e ? "1" : "0");
  } catch {
  }
}
function Tt(t, e, i, o) {
  if (e === "exact") {
    let c = i, h = o;
    return h <= c && (h = c + Math.max(Math.abs(c) * 1e-6, 1e-9)), [c, h];
  }
  const a = t.filter((c) => c > 0).sort((c, h) => c - h);
  if (!a.length) return [0, 1];
  const r = (c) => {
    const h = Math.min(
      a.length - 1,
      Math.max(0, Math.round(c / 100 * (a.length - 1)))
    );
    return a[h];
  };
  let l = r(i), s = r(o);
  return s <= l && (s = l + Math.max(Math.abs(l) * 1e-6, 1e-9)), [l, s];
}
function yt(t, e, i, o = 1) {
  i <= e && (i = e + Math.max(Math.abs(e) * 1e-6, 1e-9));
  const a = Math.min(1, Math.max(0, (t - e) / (i - e)));
  return Math.round(Math.pow(a, o) * 255);
}
const Le = "9px ui-monospace, Menlo, Consolas, monospace";
function vt(t, e = 7) {
  const i = t / Math.max(1, e), o = Math.pow(10, Math.floor(Math.log10(Math.max(i, 1e-12))));
  for (const a of [1, 2, 2.5, 5, 10])
    if (i <= a * o) return a * o;
  return 10 * o;
}
function He(t, e) {
  const i = e >= 1 ? e >= 10 ? 0 : 1 : Math.min(6, Math.ceil(-Math.log10(e)));
  return t.toFixed(i);
}
function Ke(t, e, i, o, a, r, l) {
  t.save(), t.strokeStyle = "rgba(255, 255, 255, 0.06)", t.lineWidth = 1, t.setLineDash([2, 4]);
  const s = Math.ceil(a / l) * l;
  t.beginPath();
  for (let c = s; c <= r; c += l) {
    const h = Math.round(o(c)) + 0.5;
    h < 0 || h > e || (t.moveTo(h, 0), t.lineTo(h, i));
  }
  t.stroke(), t.restore();
}
function _t(t, e) {
  const { fieldW: i, cssW: o, cssH: a, centre: r, ppu: l, pLo: s, pHi: c } = e, h = (d) => a / 2 - (d - r) * l;
  t.fillStyle = "#0c0f14", t.fillRect(i, 0, o - i, a), t.strokeStyle = "#232a35", t.beginPath(), t.moveTo(i + 0.5, 0), t.lineTo(i + 0.5, a), t.stroke();
  const b = vt(c - s), y = Math.ceil(s / b) * b;
  t.font = Le, t.textAlign = "right", t.save(), t.setLineDash([1, 3]);
  for (let d = y; d <= c; d += b) {
    const g = Math.round(h(d)) + 0.5;
    g < 8 || g > a - 4 || (t.strokeStyle = "rgba(255, 255, 255, 0.05)", t.beginPath(), t.moveTo(0, g), t.lineTo(i, g), t.stroke(), t.strokeStyle = "#3a4453", t.beginPath(), t.moveTo(i, g), t.lineTo(i + 4, g), t.stroke(), e.fused || (t.fillStyle = "#8b96a5", t.fillText(He(d, b), o - 5, g + 3)));
  }
  t.restore();
  const v = (d, g, w) => {
    const m = h(d);
    m < 8 || m > a - 8 || (t.fillStyle = g, t.fillRect(i + 2, m - 8, o - i - 4, 16), t.fillStyle = w, t.font = `600 ${Le}`, t.fillText(He(d, b), o - 5, m + 3), t.font = Le);
  };
  if (e.bookAsk !== null && v(e.bookAsk, "rgba(239, 83, 80, 0.92)", "#2b0b0a"), e.bookBid !== null && v(e.bookBid, "rgba(38, 166, 154, 0.92)", "#06201c"), e.lastPrice !== null) {
    const d = h(e.lastPrice);
    d >= 0 && d <= a && (t.save(), t.strokeStyle = e.lastBuy ? "rgba(38, 166, 154, 0.65)" : "rgba(239, 83, 80, 0.65)", t.setLineDash([5, 4]), t.beginPath(), t.moveTo(0, Math.round(d) + 0.5), t.lineTo(i, Math.round(d) + 0.5), t.stroke(), t.restore(), d >= 8 && d <= a - 8 && (t.fillStyle = e.lastBuy ? "#26a69a" : "#ef5350", t.fillRect(i + 2, d - 8, o - i - 4, 16), t.fillStyle = "#08131a", t.font = `700 ${Le}`, t.fillText(He(e.lastPrice, b), o - 5, d + 3), t.font = Le));
  }
  t.textAlign = "left";
}
const Mt = "9px ui-monospace, Menlo, Consolas, monospace", rt = "#26a69a", lt = "#ef5350";
function Be(t) {
  return t >= 1e4 ? `${(t / 1e3).toFixed(0)}k` : t >= 1e3 ? `${(t / 1e3).toFixed(1)}k` : t >= 100 || t >= 10 ? t.toFixed(0) : t.toFixed(1);
}
function wt(t, e, i, o, a, r, l, s) {
  const c = (h, b) => {
    t.strokeStyle = b, t.lineWidth = 1, t.beginPath();
    let y = null, v = 0;
    for (let d = i; d < o; d++) {
      const g = h(e[d]), w = a(e[d].tsMs), m = d + 1 < o ? a(e[d + 1].tsMs) : w + 1;
      if (g === null || g < l || g > s) {
        y = null;
        continue;
      }
      const x = Math.round(r(g)) + 0.5;
      y !== null ? (t.moveTo(v, y), t.lineTo(w, y), t.lineTo(w, x)) : t.moveTo(w, x), t.lineTo(m, x), y = x, v = m;
    }
    t.stroke();
  };
  c((h) => h.bb, "rgba(38, 166, 154, 0.85)"), c((h) => h.ba, "rgba(239, 83, 80, 0.85)");
}
function St(t, e, i, o, a, r, l, s, c) {
  if (c.alpha <= 0) return;
  t.save(), t.globalAlpha = c.alpha;
  const h = [];
  if (c.mode === "pie") {
    const b = Math.max(4, c.cssH / 80), y = Math.max(5, 1400 / Math.max(0.5, (o - i) / Math.max(1, c.fieldW))), v = /* @__PURE__ */ new Map();
    for (const d of e) {
      if (d.tsMs < i || d.tsMs > o || d.price < a || d.price > r) continue;
      const g = l(d.tsMs), w = s(d.price), m = `${Math.round(g / y)}:${Math.round(w / b)}`;
      let x = v.get(m);
      x || (x = { x: 0, y: 0, n: 0, size: 0, buy: 0, sell: 0 }, v.set(m, x)), x.x += g, x.y += w, x.n += 1, x.size += d.size, d.buy ? x.buy += d.size : x.sell += d.size;
    }
    for (const d of v.values()) h.push({ ...d, x: d.x / d.n, y: d.y / d.n });
  } else
    for (const b of e)
      b.tsMs < i || b.tsMs > o || b.price < a || b.price > r || h.push({
        x: l(b.tsMs),
        y: s(b.price),
        n: 1,
        size: b.size,
        buy: b.buy ? b.size : 0,
        sell: b.buy ? 0 : b.size
      });
  for (const b of h) {
    const y = Math.min(16, Math.max(2.5, Math.sqrt(b.size) * 0.9 * c.scale)), v = b.buy + b.sell, d = v > 0 ? b.buy / v : 0.5, g = -Math.PI / 2;
    if (t.beginPath(), t.moveTo(b.x, b.y), t.arc(b.x, b.y, y, g, g + d * Math.PI * 2), t.closePath(), t.fillStyle = rt, t.fill(), d < 1 && (t.beginPath(), t.moveTo(b.x, b.y), t.arc(b.x, b.y, y, g + d * Math.PI * 2, g + Math.PI * 2), t.closePath(), t.fillStyle = lt, t.fill()), c.mode !== "solid") {
      const w = t.createRadialGradient(
        b.x - y * 0.35,
        b.y - y * 0.42,
        y * 0.1,
        b.x,
        b.y,
        y
      );
      w.addColorStop(0, "rgba(255, 255, 255, 0.5)"), w.addColorStop(0.45, "rgba(255, 255, 255, 0.08)"), w.addColorStop(0.85, "rgba(0, 0, 0, 0.18)"), w.addColorStop(1, "rgba(0, 0, 0, 0.5)"), t.beginPath(), t.arc(b.x, b.y, y, 0, Math.PI * 2), t.fillStyle = w, t.fill();
    }
    if (t.lineWidth = 1, t.strokeStyle = "rgba(0, 0, 0, 0.55)", t.beginPath(), t.arc(b.x, b.y, y, 0, Math.PI * 2), t.stroke(), c.bigK > 0 && c.bigMedian > 0 && b.size >= c.bigK * c.bigMedian) {
      const w = b.buy >= b.sell;
      t.beginPath(), t.arc(b.x, b.y, y + 3, 0, Math.PI * 2), t.lineWidth = 1.5, t.strokeStyle = w ? "rgba(38, 166, 154, 0.95)" : "rgba(239, 83, 80, 0.95)", t.stroke();
      const m = `${w ? "+" : "−"}${Be(b.size)}`;
      t.font = `700 ${Mt}`;
      const x = t.measureText(m).width + 8;
      let M = b.x + y + 6;
      M + x > c.fieldW - 2 && (M = b.x - y - 6 - x);
      const p = Math.min(c.cssH - 16, Math.max(2, b.y - 8));
      t.fillStyle = w ? "rgba(38, 166, 154, 0.92)" : "rgba(239, 83, 80, 0.92)", t.fillRect(M, p, x, 14), t.fillStyle = "#08131a", t.fillText(m, M + 4, p + 10);
    }
  }
  t.restore();
}
function kt(t, e, i, o, a, r, l, s, c, h) {
  const y = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 36e5].find((g) => g / c >= 18) ?? 36e5, v = /* @__PURE__ */ new Map();
  for (const g of e) {
    if (g.tsMs < i || g.tsMs > o || g.price < a || g.price > r) continue;
    const w = Math.floor(g.tsMs / y);
    let m = v.get(w);
    m || (m = { o: g.price, h: g.price, l: g.price, c: g.price }, v.set(w, m)), m.h = Math.max(m.h, g.price), m.l = Math.min(m.l, g.price), m.c = g.price;
  }
  const d = Math.min(9, Math.max(2, y / c * 0.6));
  t.save(), t.globalAlpha = 0.92;
  for (const [g, w] of v) {
    const m = l(g * y + y / 2);
    if (m < -d || m > h + d) continue;
    const M = w.c >= w.o ? rt : lt;
    t.strokeStyle = M, t.fillStyle = M, t.lineWidth = 1, t.beginPath(), t.moveTo(Math.round(m) + 0.5, s(w.h)), t.lineTo(Math.round(m) + 0.5, s(w.l)), t.stroke();
    const p = s(w.o), C = s(w.c), u = Math.min(p, C);
    t.fillRect(m - d / 2, u, d, Math.max(1, Math.abs(p - C)));
  }
  t.restore();
}
const Et = 78, Rt = 16, ct = "9px ui-monospace, Menlo, Consolas, monospace";
function Ct(t, e, i, o, a, r, l, s, c) {
  t.fillStyle = "#0a0d12", t.fillRect(0, l, c, s - l), t.strokeStyle = "#232a35", t.beginPath(), t.moveTo(0, Math.round(l) + 0.5), t.lineTo(c, Math.round(l) + 0.5), t.stroke();
  const h = s - Rt - 2, b = h - l - 14;
  if (b < 8) return;
  const v = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 36e5].find((u) => u / r >= 5) ?? 36e5, d = /* @__PURE__ */ new Map();
  let g = 0;
  for (const u of e) {
    if (u.tsMs < i || u.tsMs > o) continue;
    const E = Math.floor(u.tsMs / v);
    let P = d.get(E);
    P || (P = { b: 0, s: 0 }, d.set(E, P)), u.buy ? P.b += u.size : P.s += u.size, g = Math.max(g, P.b, P.s);
  }
  const w = [...d.keys()].sort((u, E) => u - E);
  let m = 0, x = 0, M = 0;
  const p = [];
  for (const u of w) {
    const E = d.get(u);
    m += E.b - E.s, p.push([u, m]), x = Math.min(x, m), M = Math.max(M, m);
  }
  t.font = "600 8px ui-monospace, Menlo, monospace";
  const C = Math.floor(i / v) * v;
  for (let u = C; u <= o; u += v) {
    const E = a(u), P = a(u + v);
    if (P < -4 || E > c + 4) continue;
    const I = P - E, U = d.get(Math.floor(u / v));
    if (!U) continue;
    const q = Math.max(1, I * 0.36), L = E + I / 2, F = g > 0 ? U.s / g * b : 0, $ = g > 0 ? U.b / g * b : 0;
    t.fillStyle = "rgba(239, 83, 80, 0.85)", t.fillRect(L - q - 0.5, h - F, q, F), t.fillStyle = "rgba(100, 165, 240, 0.85)", t.fillRect(L + 0.5, h - $, q, $), I >= 26 && (t.textAlign = "center", t.fillStyle = "rgba(255, 150, 147, 0.9)", t.fillText(Be(U.s), L - q / 2, h - F - 3), t.fillStyle = "rgba(147, 197, 253, 0.9)", t.fillText(Be(U.b), L + q / 2 + 1, h - $ - 3));
  }
  if (p.length > 1 && M > x && (t.strokeStyle = "rgba(226, 238, 255, 0.6)", t.lineWidth = 1, t.beginPath(), p.forEach(([u, E], P) => {
    const I = a(u * v + v / 2), U = h - 2 - (E - x) / (M - x) * (b - 4);
    P === 0 ? t.moveTo(I, U) : t.lineTo(I, U);
  }), t.stroke()), m !== 0) {
    const u = `CVD ${m > 0 ? "+" : "−"}${Be(Math.abs(m))}`;
    t.font = `700 ${ct}`;
    const E = t.measureText(u).width + 8;
    t.fillStyle = "rgba(10, 13, 18, 0.85)", t.fillRect(c - E - 4, l + 3, E, 13), t.fillStyle = m > 0 ? "#26a69a" : "#ef5350", t.fillText(u, c - E, l + 13);
  }
  t.textAlign = "left";
}
function Pt(t, e, i, o) {
  let a = 0, r = 0;
  for (const g of e)
    g.tsMs < i || g.tsMs > o || (g.buy ? a += g.size : r += g.size);
  const l = a + r, s = l > 0 ? (a - r) / l : 0, c = l > 0 ? (a - r) / l : 0, h = 178, b = 44, y = 8, v = 8;
  t.save(), t.fillStyle = "rgba(10, 13, 18, 0.78)", t.fillRect(y, v, h, b), t.strokeStyle = "#232a35", t.strokeRect(y + 0.5, v + 0.5, h - 1, b - 1);
  const d = (g, w, m, x) => {
    t.font = `700 ${ct}`, t.fillStyle = "#8b96a5", t.fillText(g, y + 8, x + 7);
    const M = y + 40, p = 92, C = 6;
    t.fillStyle = "rgba(239, 83, 80, 0.55)", t.fillRect(M, x, p / 2, C), t.fillStyle = "rgba(38, 166, 154, 0.55)", t.fillRect(M + p / 2, x, p / 2, C);
    const u = M + p / 2 + (m ? w * (p / 2 - 2) : 0);
    t.fillStyle = m ? "#eef1f6" : "#5c6672", t.fillRect(u - 1, x - 2, 2, C + 4), t.textAlign = "right", t.fillStyle = m ? w >= 0 ? "#26a69a" : "#ef5350" : "#5c6672", t.fillText(m ? `${w >= 0 ? "+" : "−"}${Math.abs(Math.round(w * 100))}%` : "—", y + h - 8, x + 7), t.textAlign = "left";
  };
  d("IMB", s, l > 0, v + 8), d("CVD", c, l > 0, v + 26), t.restore();
}
function jt(t) {
  return t >= 1e3 ? `${(t / 1e3).toFixed(1)}k` : t >= 100 ? t.toFixed(0) : t >= 1 ? t.toFixed(1) : t.toPrecision(2);
}
function Dt(t) {
  return t >= 1e3 ? t.toFixed(1) : t >= 1 ? t.toFixed(2) : At(t);
}
function At(t) {
  return t.toPrecision(4);
}
function Nt(t, e, i, o) {
  const { bids: a, asks: r } = i.sorted();
  if (!a.length && !r.length) return;
  const l = (M) => e.fH / 2 - (M - e.centre) * e.ppu, s = o.activeRange > 0, c = [...a, ...r].filter(([M]) => M >= e.lo && M <= e.hi).map(([M]) => M).sort((M, p) => M - p);
  let h = 8;
  if (c.length >= 2) {
    const M = [];
    for (let p = 1; p < c.length; p++)
      M.push(c[p] - c[p - 1]);
    M.sort((p, C) => p - C), h = Math.min(20, Math.max(2.5, e.ppu * M[M.length >> 1]));
  }
  let b = 0;
  for (const [M, p] of [...a, ...r])
    M >= e.lo && M <= e.hi && (b = Math.max(b, p));
  const y = e.fieldW + 5, v = e.fieldW + 46, d = 22, g = e.cssW - 4, w = (M, p, C, u, E) => {
    const P = l(M);
    if (P < -h || P > e.fH + h) return;
    const I = P - h / 2, U = b > 0 ? Math.max(1.5, p / b * d) : 1.5;
    t.fillStyle = C === "bid" ? u ? "rgba(38,166,154,0.18)" : "rgba(38, 166, 154, 0.68)" : u ? "rgba(239,83,80,0.18)" : "rgba(239, 83, 80, 0.68)", t.fillRect(v, I, U, Math.max(1, h - 1)), t.font = E ? "700 9px ui-monospace, Menlo, monospace" : "9px ui-monospace, Menlo, monospace", t.textAlign = "left", t.fillStyle = u ? "#4a5260" : E ? C === "bid" ? "#26a69a" : "#ef5350" : "#8b96a5", t.fillText(Dt(M), y, P + 3), t.textAlign = "right", t.fillStyle = u ? "#4a5260" : C === "bid" ? "#9fd6cd" : "#f4b3ae", t.fillText(jt(p), g, P + 3);
  }, m = a.length ? a[0][0] : null, x = r.length ? r[0][0] : null;
  if (a.forEach(([M, p], C) => {
    w(M, p, "bid", s && C >= o.activeRange, M === m);
  }), r.forEach(([M, p], C) => {
    w(M, p, "ask", s && C >= o.activeRange, M === x);
  }), s) {
    t.strokeStyle = "rgba(255, 179, 0, 0.75)", t.setLineDash([3, 3]);
    const M = [];
    a.length && o.activeRange <= a.length && M.push(l(a[o.activeRange - 1][0]) + h / 2 + 1), r.length && o.activeRange <= r.length && M.push(l(r[o.activeRange - 1][0]) - h / 2 - 1);
    for (const p of M)
      p < 0 || p > e.fH || (t.beginPath(), t.moveTo(e.fieldW, p), t.lineTo(e.cssW, p), t.stroke());
    t.setLineDash([]);
  }
  t.textAlign = "left";
}
const Je = 14400, Lt = 220, Ut = 58, zt = 96, Ft = 228;
class It {
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
    this.settings = e, this.luts = Oe(e), this.off = document.createElement("canvas"), this.offCtx = this.off.getContext("2d"), this.glow = document.createElement("canvas"), this.glowCtx = this.glow.getContext("2d");
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
    const e = this.settings.ladderMode === "fused" ? zt : Ut;
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
    return this.settings.subpanes ? Et : 0;
  }
  /** The field's drawable height (full canvas minus the context stack). */
  fieldH() {
    return Math.max(40, this.cssH - this.subH());
  }
  setSettings(e) {
    this.settings = e, this.luts = Oe(e, this.effSmoothing()), this.dirty = !0;
  }
  /** S4: resolved vertical-smoothing shade count (0 = no quantization).
   * Auto = zoom-adaptive: the tighter the price zoom, the finer the bands. */
  effSmoothing() {
    const e = this.settings;
    if (e.smoothingMode === "none") return 0;
    if (e.smoothingMode === "manual")
      return Math.min(20, Math.max(0, Math.round(e.smoothing)));
    const i = this.pxPerUnit ?? this.basePpu ?? 0;
    if (!i || !this.basePpu) return 24;
    const o = Math.max(0.02, i / this.basePpu);
    return Math.min(64, Math.max(4, Math.round(24 / Math.sqrt(o))));
  }
  setSyncedCrosshair(e) {
    this.syncedCrosshair !== e && (this.syncedCrosshair = e, this.dirty = !0);
  }
  /** Bulk history ingest (pane open, or a loaded recording). Deterministic
   * fold over the events; the dot trail belongs to the new timeline. */
  ingestHistory(e) {
    this.cols = [], this.state.clear(), this.stateSide.clear(), this.stateTs.clear(), this.cur.clear(), this.curSide.clear(), this.curTsMs = null, this.sizeSample = [], this.dots = [], this.tsLog = [], this.tsVersion = 0, this.recentSizes = [], this.bigMedian = 0, this.lastTradePrice = null;
    for (const i of e) this.foldEvent(i, !0);
    this.flushColumn(), this.recalcCutoffs(), this.follow = !0, this.priceCenter = null, this.pxPerUnit = null, this.dirty = !0;
  }
  /** One live depth frame (already coalesced engine-side). */
  applyDepth(e) {
    this.foldEvent(e, !1), this.sizeSample.length > 6e4 && (this.sizeSample = this.sizeSample.slice(-3e4), this.recalcCutoffs()), this.dirty = !0;
  }
  addTrade(e) {
    const i = e.side === "BUY" || e.side === "INFERRED-BUY";
    if (this.tsLog.push({ ts: e.ts, price: e.price, size: e.size, buy: i }), this.tsLog.length > 2e3 && this.tsLog.splice(0, this.tsLog.length - 1500), this.tsVersion += 1, !(e.size <= (this.settings.dotMinSize || 0))) {
      if (this.dots.push({ tsMs: e.ts * 1e3, price: e.price, size: e.size, buy: i }), this.dots.length > 5e3 && this.dots.splice(0, this.dots.length - 4e3), this.recentSizes.push(e.size), this.recentSizes.length > 1024 && this.recentSizes.splice(0, this.recentSizes.length - 512), this.recentSizes.length % 64 === 0 || this.bigMedian === 0) {
        const o = [...this.recentSizes].sort((a, r) => a - r);
        this.bigMedian = o[Math.floor(o.length / 2)] ?? 0;
      }
      this.lastTradePrice = e.price, this.lastTradeBuy = i, this.settings.recenterMode === "trades" && this.requestRecenter(e.price), this.dirty = !0;
    }
  }
  setBook(e, i) {
    if (this.bookBid = e, this.bookAsk = i, this.settings.recenterMode === "bbo") {
      const o = e !== null && i !== null ? (e + i) / 2 : e ?? i;
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
  wheel(e, i, o) {
    if (this.recenterTarget = null, o) {
      const a = Math.exp(-i * 1e-3);
      this.pxPerUnit = (this.pxPerUnit ?? this.autoPxPerUnit()) * a, this.settings.smoothingMode === "auto" && (this.luts = Oe(this.settings, this.effSmoothing()));
    } else {
      const a = Math.exp(i * 1e-3);
      this.msPerPx = Math.min(120, Math.max(0.5, this.msPerPx * a)), this.follow = !1;
    }
    this.dirty = !0;
  }
  drag(e, i) {
    this.recenterTarget = null, this.follow = !1, this.priceCenter = (this.priceCenter ?? this.autoPriceCenter()) + i / (this.pxPerUnit ?? this.autoPxPerUnit()), this.rightOffsetPx += e, this.rightOffsetPx = Math.max(-this.cssW, this.rightOffsetPx), this.dirty = !0;
  }
  recenter() {
    this.follow = !0, this.priceCenter = null, this.pxPerUnit = null, this.recenterTarget = null, this.dirty = !0;
  }
  setHover(e, i) {
    this.hover = e === null || i === null ? null : { x: e, y: i }, this.onHoverTime && this.onHoverTime(this.hover ? this.xToTs(this.hover.x) : null), this.dirty = !0;
  }
  // ── data folding (mirror of engine/orderflow/grid.py) ──────────────────
  columnMs() {
    return 1e3;
  }
  foldEvent(e, i) {
    const o = Math.floor(e.ts * 1e3), a = Math.floor(o / this.columnMs()) * this.columnMs();
    for (this.curTsMs === null && (this.curTsMs = a); a > this.curTsMs; ) this.advanceColumn();
    for (const [r, l] of e.bids) this.patchLevel(r, l, 0, i);
    for (const [r, l] of e.asks) this.patchLevel(r, l, 1, i);
    this.lastEventTs = Math.max(this.lastEventTs, o);
  }
  patchLevel(e, i, o, a) {
    const r = Math.round(e * 1e6) / 1e6;
    this.cur.set(r, i), i > 0 && this.curSide.set(r, o), i > 0 && a && this.sizeSample.length < 6e4 && this.sizeSample.push(i);
  }
  advanceColumn() {
    this.flushColumn(), this.curTsMs = (this.curTsMs ?? 0) + this.columnMs();
  }
  flushColumn() {
    if (this.curTsMs === null) return;
    for (const [l, s] of this.cur)
      s <= 0 ? (this.state.delete(l), this.stateSide.delete(l), this.stateTs.delete(l)) : (this.state.set(l, s), this.stateSide.set(l, this.curSide.get(l) ?? 0), this.stateTs.set(l, this.curTsMs));
    if (this.cur.clear(), this.curSide.clear(), this.state.size > 4096) {
      const l = [...this.stateTs.entries()].sort((c, h) => h[1] - c[1]).slice(0, 4096).map(([c]) => c), s = new Set(l);
      for (const c of [...this.state.keys()])
        s.has(c) || (this.state.delete(c), this.stateSide.delete(c), this.stateTs.delete(c));
    }
    const e = [...this.state.keys()].sort((l, s) => l - s), i = e.map((l) => this.state.get(l)), o = e.map((l) => this.stateSide.get(l) ?? 0);
    let a = null, r = null;
    for (let l = 0; l < e.length; l++)
      o[l] === 0 ? a = e[l] : r = r === null ? e[l] : r;
    this.cols.push({
      tsMs: this.curTsMs,
      keys: Float64Array.from(e),
      sizes: Float64Array.from(i),
      sides: Uint8Array.from(o),
      bb: a,
      ba: r
    }), this.cols.length > Je && this.cols.splice(0, this.cols.length - Je);
  }
  recalcCutoffs() {
    [this.lo, this.hi] = Tt(
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
    const e = this.viewCentre, i = this.viewPpu, o = this.viewH;
    return {
      lo: this.viewLo,
      hi: this.viewHi,
      centre: e,
      ppu: i,
      cssH: o,
      version: this.viewVersion,
      yOf: (a) => o / 2 - (a - e) * i
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
    let e = 1 / 0, i = -1 / 0;
    const o = this.liveEdgeMs() - Math.min(this.fieldW(), 600) * this.msPerPx;
    for (let r = this.cols.length - 1; r >= 0; r--) {
      const l = this.cols[r];
      if (l.tsMs < o) break;
      l.keys.length && (e = Math.min(e, l.keys[0]), i = Math.max(i, l.keys[l.keys.length - 1]));
    }
    this.bookBid !== null && (e = Math.min(e, this.bookBid)), this.bookAsk !== null && (i = Math.max(i, this.bookAsk)), (!isFinite(e) || !isFinite(i)) && (e = 0, i = 1), i <= e && (i = e + 1);
    const a = (i - e) * 0.08;
    return [e - a, i + a];
  }
  autoPriceCenter() {
    const [e, i] = this.visiblePriceRange();
    return (e + i) / 2;
  }
  autoPxPerUnit() {
    const [e, i] = this.visiblePriceRange();
    return this.fieldH() / Math.max(i - e, 1e-9);
  }
  // ── painting ───────────────────────────────────────────────────────────
  paint() {
    this.dirty = !1;
    const e = this.ctx;
    if (!e || !this.cssW || !this.cssH || (e.setTransform(this.dpr, 0, 0, this.dpr, 0, 0), e.fillStyle = "#0b0e11", e.fillRect(0, 0, this.cssW, this.cssH), !this.cols.length)) return;
    if (this.recenterTarget !== null && this.priceCenter !== null) {
      const p = this.recenterTarget - this.priceCenter, C = Math.max(
        1e-9,
        this.fieldH() / 2 / (this.pxPerUnit ?? 1) / 240
      );
      Math.abs(p) <= C ? (this.priceCenter = this.recenterTarget, this.recenterTarget = null) : (this.priceCenter += p * 0.14, this.dirty = !0);
    }
    const [i, o] = this.visiblePriceRange(), a = this.fieldH(), r = this.pxPerUnit ?? a / Math.max(o - i, 1e-9);
    this.basePpu === null && (this.basePpu = r);
    const l = this.priceCenter ?? (i + o) / 2, s = (p) => a / 2 - (p - l) * r;
    this.viewLo = i, this.viewHi = o, this.viewCentre = l, this.viewPpu = r, this.viewH = a, this.viewVersion += 1;
    const c = this.fieldW(), h = this.settings.subpanes, b = this.xToTs(0), y = this.xToTs(c);
    let v = this.lowerBound(b), d = this.lowerBound(y);
    d = Math.min(d, this.cols.length), this.follow && this.rightOffsetPx <= 0 && (this.rightOffsetPx = 0);
    const g = h ? this.cssH - 14 : a;
    this.settings.view === "footprint" ? (this.paintFootprint(e, b, y, i, o, s, a), Ke(
      e,
      c,
      g,
      (p) => this.tsToX(p),
      b,
      y,
      this.niceTimeStep(c * this.msPerPx)
    )) : this.paintHeatField(e, v, d, b, y, i, o, s, c, a, g), h && (Ct(
      e,
      this.dots,
      b,
      y,
      (p) => this.tsToX(p),
      this.msPerPx,
      a,
      this.cssH,
      c
    ), this.settings.view === "heat" && Pt(e, this.dots, b, y));
    const w = (p, C) => {
      if (p === null || p < i || p > o) return;
      const u = s(p);
      e.strokeStyle = C, e.setLineDash([4, 3]), e.beginPath(), e.moveTo(0, u), e.lineTo(c, u), e.stroke(), e.setLineDash([]);
    };
    if (w(this.bookBid, "rgba(38, 166, 154, 0.55)"), w(this.bookAsk, "rgba(239, 83, 80, 0.55)"), this.syncedCrosshair !== null) {
      const p = this.tsToX(this.syncedCrosshair);
      p >= 0 && p <= c && (e.strokeStyle = "rgba(150, 160, 175, 0.55)", e.setLineDash([3, 3]), e.beginPath(), e.moveTo(p, 0), e.lineTo(p, a), e.stroke(), e.setLineDash([]));
    }
    if (this.hover) {
      const { x: p, y: C } = this.hover;
      p <= c && C <= a && (e.strokeStyle = "rgba(150, 160, 175, 0.45)", e.setLineDash([3, 3]), e.beginPath(), e.moveTo(p, 0), e.lineTo(p, a), e.moveTo(0, C), e.lineTo(c, C), e.stroke(), e.setLineDash([]));
      const u = l + (a / 2 - C) / r;
      e.fillStyle = "rgba(30, 34, 41, 0.95)", e.fillRect(c - 74, C - 9, 72, 18), e.fillStyle = "#d1d4dc", e.font = "10px monospace", e.textAlign = "right", e.fillText(u.toPrecision(6), c - 6, C + 3);
      const P = new Date(this.xToTs(p)).toISOString().slice(11, 19);
      e.fillRect(Math.min(p, c - 30) - 28, this.cssH - 16, 56, 15), e.textAlign = "center", e.fillText(P, Math.min(p, c - 30), this.cssH - 5);
    }
    e.fillStyle = "rgba(150,160,175,0.7)", e.font = "9px monospace", e.textAlign = "left";
    const m = this.niceTimeStep(c * this.msPerPx), x = Math.ceil(b / m) * m;
    for (let p = x; p <= y; p += m) {
      const C = this.tsToX(p);
      if (C > c - 52) continue;
      const u = new Date(p);
      e.fillText(u.toISOString().slice(11, 19), C + 2, this.cssH - 4), e.fillRect(C, this.cssH - 14, 1, 4);
    }
    const M = this.settings.ladderMode === "fused";
    _t(e, {
      fieldW: c,
      cssW: this.cssW,
      cssH: this.cssH,
      centre: l,
      ppu: r,
      pLo: i,
      pHi: o,
      bookBid: this.bookBid,
      bookAsk: this.bookAsk,
      lastPrice: this.lastTradePrice,
      lastBuy: this.lastTradeBuy,
      fused: M
    }), M && this.bookSource && Nt(e, {
      fieldW: c,
      cssW: this.cssW,
      fH: a,
      centre: l,
      ppu: r,
      lo: i,
      hi: o
    }, this.bookSource, { activeRange: this.settings.activeRange });
  }
  /** V1+V2 heat field: intensity+side offscreen fold → per-side LUT
   * colourise → blit → glow → time grid → path → candles → bubbles →
   * volume strip. */
  paintHeatField(e, i, o, a, r, l, s, c, h, b, y) {
    const v = this.settings, d = Math.max(1, o - i), g = Lt, w = (s - l) / g;
    (this.off.width !== d || this.off.height !== g) && (this.off.width = d, this.off.height = g, this.glow.width = d, this.glow.height = g);
    const m = Math.min(1, Math.max(0.25, v.gamma || 1)), x = new Uint8ClampedArray(d * g), M = new Uint8Array(d * g).fill(255);
    for (let L = 0; L < d; L++) {
      const F = this.cols[i + L], { keys: $, sizes: H, sides: Z } = F;
      for (let ee = 0; ee < $.length; ee++) {
        const Y = $[ee];
        if (Y < l || Y > s) continue;
        const Q = H[ee];
        if (Q <= 0) continue;
        const le = Math.min(g - 1, Math.max(0, Math.floor((s - Y) / w))) * d + L, k = yt(Q, this.lo, this.hi, m);
        k > x[le] && (x[le] = k, M[le] = Z[ee]);
      }
    }
    const p = this.offCtx.createImageData(d, g), C = this.glowCtx.createImageData(d, g), u = p.data, E = C.data;
    for (let L = 0; L < x.length; L++) {
      const F = M[L];
      if (F === 255) continue;
      const $ = F === 1 ? this.luts.ask : this.luts.bid, H = x[L] * 4, Z = L * 4;
      u[Z] = $[H], u[Z + 1] = $[H + 1], u[Z + 2] = $[H + 2], u[Z + 3] = 255, x[L] >= Ft && (E[Z] = $[H], E[Z + 1] = $[H + 1], E[Z + 2] = $[H + 2], E[Z + 3] = 255);
    }
    this.offCtx.putImageData(p, 0, 0), this.glowCtx.putImageData(C, 0, 0);
    const P = this.tsToX(this.cols[i].tsMs), I = this.tsToX(this.cols[i].tsMs + d * this.columnMs()), U = c(s), q = c(l);
    if (e.imageSmoothingEnabled = v.smoothColumns, e.drawImage(this.off, P, U, Math.max(1, I - P), Math.max(1, q - U)), e.imageSmoothingEnabled = !1, v.glow && (e.save(), e.globalCompositeOperation = "lighter", e.globalAlpha = 0.38, "filter" in e && (e.filter = "blur(6px)"), e.imageSmoothingEnabled = !0, e.drawImage(this.glow, P, U, Math.max(1, I - P), Math.max(1, q - U)), e.restore()), Ke(
      e,
      h,
      y,
      (L) => this.tsToX(L),
      a,
      r,
      this.niceTimeStep(h * this.msPerPx)
    ), v.showPath && wt(e, this.cols, i, o, (L) => this.tsToX(L), c, l, s), v.showCandles && kt(
      e,
      this.dots,
      a,
      r,
      l,
      s,
      (L) => this.tsToX(L),
      c,
      this.msPerPx,
      h
    ), v.dots) {
      const L = v.dotType === "pie" ? "pie" : v.dotType === "solid" ? "solid" : "sphere";
      St(
        e,
        this.dots,
        a,
        r,
        l,
        s,
        (F) => this.tsToX(F),
        c,
        {
          alpha: Math.min(1, Math.max(0, v.dotAlpha)),
          scale: v.dotScale,
          mode: L,
          bigK: v.bigTradeK,
          bigMedian: this.bigMedian,
          fieldW: h,
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
  paintFootprint(e, i, o, a, r, l, s) {
    const h = [5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 36e5].find((u) => u / this.msPerPx >= 72) ?? 36e5, b = r - a, v = [
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
    ].find((u) => b / u <= 20) ?? b / 20, d = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map();
    let w = 0, m = 0;
    for (const u of this.dots) {
      if (u.tsMs < i || u.tsMs > o || u.price < a || u.price > r) continue;
      m += 1;
      const E = Math.floor(u.tsMs / h), P = Math.floor(u.price / v), I = E + ":" + P;
      let U = d.get(I);
      U || (U = { b: 0, s: 0 }, d.set(I, U)), u.buy ? U.b += u.size : U.s += u.size, w = Math.max(w, U.b, U.s);
      let q = g.get(E);
      q || (q = { b: 0, s: 0 }, g.set(E, q)), u.buy ? q.b += u.size : q.s += u.size;
    }
    if (!m) {
      e.fillStyle = "#5c6672", e.font = "11px ui-monospace, Menlo, monospace", e.textAlign = "center", e.fillText("no side-stamped prints in view", this.cssW / 2, s / 2 - 8), e.font = "10px ui-monospace, Menlo, monospace", e.fillText("the footprint builds from executed trades (demo and", this.cssW / 2, s / 2 + 10), e.fillText("crypto feeds carry sides; sources without prints stay blank)", this.cssW / 2, s / 2 + 24);
      return;
    }
    const x = (u) => u >= 1e3 ? `${(u / 1e3).toFixed(1)}k` : u >= 100 || u >= 10 ? u.toFixed(0) : u.toFixed(1), M = this.fieldW(), p = Math.min(22, Math.max(9, v * this.viewPpu * 0.85)), C = Math.floor(i / h) * h;
    for (let u = C; u <= o; u += h) {
      const E = this.tsToX(u), P = this.tsToX(u + h);
      if (P < -4 || E > M + 4) continue;
      const I = P - E, U = Math.floor(u / h), q = I >= 92, L = I / 2 - 4;
      e.strokeStyle = "rgba(30, 36, 47, 0.95)", e.beginPath(), e.moveTo(Math.round(P) + 0.5, 0), e.lineTo(Math.round(P) + 0.5, s), e.stroke();
      for (const [$, H] of d) {
        const [Z, ee] = $.split(":");
        if (Number(Z) !== U) continue;
        const Y = Number(ee), Q = l((Y + 0.5) * v);
        if (Q < -p || Q > s + p) continue;
        const W = Q - (p - 2) / 2, le = H.b >= H.s * 3 && H.b > 0 ? 1 : H.s >= H.b * 3 && H.s > 0 ? -1 : 0;
        le !== 0 && (e.fillStyle = le > 0 ? "rgba(38, 166, 154, 0.13)" : "rgba(239, 83, 80, 0.13)", e.fillRect(E + 2, W, I - 4, p - 2));
        const k = E + I / 2, A = w > 0 ? H.s / w * L : 0, X = w > 0 ? H.b / w * L : 0;
        e.fillStyle = "rgba(239, 83, 80, 0.75)", e.fillRect(k - 1 - A, W, A, p - 2), e.fillStyle = "rgba(38, 166, 154, 0.75)", e.fillRect(k + 1, W, X, p - 2), q && (e.font = "9px ui-monospace, Menlo, monospace", e.textAlign = "right", e.fillStyle = le < 0 ? "#ffc9c5" : "#b2807d", e.fillText(x(H.s), k - 4, Q + 3), e.textAlign = "left", e.fillStyle = le > 0 ? "#b8f2e9" : "#7fa8a1", e.fillText(x(H.b), k + 4, Q + 3));
      }
      const F = g.get(U);
      if (F) {
        const $ = F.b - F.s;
        e.font = "9px ui-monospace, Menlo, monospace", e.textAlign = "center", e.fillStyle = $ > 0 ? "#26a69a" : $ < 0 ? "#ef5350" : "#8b96a5", e.fillText(
          `Δ${$ >= 0 ? "+" : "−"}${x(Math.abs($))} · ${x(F.b + F.s)}`,
          E + I / 2,
          s - 6
        );
      }
    }
  }
  lowerBound(e) {
    let i = 0, o = this.cols.length;
    for (; i < o; ) {
      const a = i + o >> 1;
      this.cols[a].tsMs < e ? i = a + 1 : o = a;
    }
    return Math.max(0, i - 1);
  }
  niceTimeStep(e) {
    const i = [
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
    for (const o of i) if (e / o <= 12) return o;
    return 864e5;
  }
}
function ce({ label: t, children: e, hint: i }) {
  return /* @__PURE__ */ n.jsxs("div", { className: "dh-row", title: i, children: [
    /* @__PURE__ */ n.jsx("span", { className: "dh-label", children: t }),
    e
  ] });
}
function xe({ label: t, value: e, min: i, max: o, step: a, onChange: r, fmt: l, hint: s, disabled: c }) {
  return /* @__PURE__ */ n.jsxs("div", { className: "dh-row", style: c ? { opacity: 0.45 } : void 0, title: s, children: [
    /* @__PURE__ */ n.jsx("span", { className: "dh-label", children: t }),
    /* @__PURE__ */ n.jsx(
      "input",
      {
        className: "dh-slider",
        type: "range",
        min: i,
        max: o,
        step: a,
        value: e,
        disabled: c,
        onChange: (h) => r(Number(h.target.value))
      }
    ),
    /* @__PURE__ */ n.jsx("span", { className: "dh-value", children: (l ?? ((h) => h.toFixed(2)))(e) })
  ] });
}
function je({ options: t, value: e, onChange: i }) {
  return /* @__PURE__ */ n.jsx("div", { className: "dh-seg", role: "tablist", children: t.map((o) => /* @__PURE__ */ n.jsx(
    "button",
    {
      role: "tab",
      "aria-selected": o.id === e,
      className: o.id === e ? "on" : "",
      title: o.title,
      onClick: () => i(o.id),
      children: o.label
    },
    o.id
  )) });
}
function we({ on: t, onChange: e, label: i }) {
  return /* @__PURE__ */ n.jsx(
    "button",
    {
      className: `dh-toggle${t ? " on" : ""}`,
      role: "switch",
      "aria-checked": t,
      onClick: () => e(!t),
      title: i
    }
  );
}
function Ue({ value: t, onCommit: e, min: i, max: o, disabled: a, suffix: r }) {
  const [l, s] = ut.useState(String(t));
  T.useEffect(() => {
    s(String(t));
  }, [t]);
  const c = () => {
    let h = Number(l);
    if (!isFinite(h)) {
      s(String(t));
      return;
    }
    i !== void 0 && (h = Math.max(i, h)), o !== void 0 && (h = Math.min(o, h)), s(String(h)), e(h);
  };
  return /* @__PURE__ */ n.jsxs("span", { style: { display: "inline-flex", alignItems: "center", gap: 4 }, children: [
    /* @__PURE__ */ n.jsx(
      "input",
      {
        className: "dh-num",
        value: l,
        disabled: a,
        onChange: (h) => s(h.target.value),
        onBlur: c,
        onKeyDown: (h) => {
          h.key === "Enter" && h.target.blur();
        }
      }
    ),
    r && /* @__PURE__ */ n.jsx("span", { className: "dh-hint", children: r })
  ] });
}
function Ot({ settings: t }) {
  const e = T.useRef(null);
  return T.useEffect(() => {
    const i = e.current;
    if (!i) return;
    i.width = 256, i.height = 14;
    const o = i.getContext("2d"), { ask: a, bid: r } = Oe({ ...t }), l = o.createImageData(256, 14);
    for (let s = 0; s < 256; s++)
      for (let c = 0; c < 14; c++) {
        const h = c < 7 ? a : r, b = (c * 256 + s) * 4;
        l.data[b] = h[s * 4], l.data[b + 1] = h[s * 4 + 1], l.data[b + 2] = h[s * 4 + 2], l.data[b + 3] = 255;
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
function Bt({
  symbol: t,
  settings: e,
  cutoffRange: i,
  onChange: o,
  onClose: a
}) {
  T.useEffect(() => {
    const s = (c) => {
      c.key === "Escape" && a();
    };
    return window.addEventListener("keydown", s), () => window.removeEventListener("keydown", s);
  }, [a]);
  const r = e, l = T.useMemo(() => {
    if (!i) return null;
    const s = (c) => c >= 100 ? c.toFixed(0) : c >= 1 ? c.toFixed(2) : c.toPrecision(3);
    return `${s(i[0])} → ${s(i[1])}`;
  }, [i]);
  return /* @__PURE__ */ n.jsx("div", { className: "dh-backdrop", onMouseDown: a, children: /* @__PURE__ */ n.jsxs("div", { className: "dh-window", onMouseDown: (s) => s.stopPropagation(), children: [
    /* @__PURE__ */ n.jsxs("div", { className: "dh-head", children: [
      /* @__PURE__ */ n.jsx("span", { className: "dh-head-title", children: "DEPTH HEAT · SETTINGS" }),
      /* @__PURE__ */ n.jsx("span", { className: "dh-head-sym", children: t }),
      /* @__PURE__ */ n.jsx("button", { className: "dh-close", onClick: a, title: "Close (Esc)", children: "✕" })
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "dh-body", children: [
      /* @__PURE__ */ n.jsxs("div", { className: "dh-section", children: [
        /* @__PURE__ */ n.jsx("div", { className: "dh-section-title", children: "COLOUR" }),
        /* @__PURE__ */ n.jsx("div", { className: "dh-schemes", children: it.map((s) => /* @__PURE__ */ n.jsxs(
          "button",
          {
            className: `dh-scheme${r.scheme === s ? " on" : ""}`,
            title: gt(s),
            onClick: () => {
              o({ scheme: s }), r.applySchemeGlobally && (qe(s, !0), window.dispatchEvent(new CustomEvent(
                Fe,
                { detail: { scheme: s, source: t } }
              )));
            },
            children: [
              /* @__PURE__ */ n.jsx("div", { className: "dh-scheme-name", children: s === "deepdom" ? "DEEPDOM" : s === "bookmap" ? "BOOKMAP" : s === "heat" ? "HEAT" : "GREYSCALE" }),
              /* @__PURE__ */ n.jsx(Ot, { settings: { ...r, scheme: s } })
            ]
          },
          s
        )) }),
        /* @__PURE__ */ n.jsx(
          xe,
          {
            label: "Intensity",
            value: r.intensity,
            min: 0,
            max: 2,
            step: 0.05,
            onChange: (s) => o({ intensity: s }),
            hint: "Chroma strength. 1 = true scheme colours, 0 = luminance only."
          }
        ),
        /* @__PURE__ */ n.jsx(
          xe,
          {
            label: "Dimming",
            value: r.dimming,
            min: 0,
            max: 0.9,
            step: 0.02,
            onChange: (s) => o({ dimming: s }),
            hint: "Dims the whole field toward black for dark rooms."
          }
        ),
        /* @__PURE__ */ n.jsxs(
          ce,
          {
            label: "Apply scheme globally",
            hint: "Persists the colour scheme terminal-wide; every Depth Heat pane follows it.",
            children: [
              /* @__PURE__ */ n.jsx(we, { on: r.applySchemeGlobally, onChange: (s) => {
                qe(r.scheme, s), o({ applySchemeGlobally: s }), window.dispatchEvent(new CustomEvent(
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
          xe,
          {
            label: "Intensity γ",
            value: r.gamma,
            min: 0.25,
            max: 1,
            step: 0.05,
            onChange: (s) => o({ gamma: s }),
            hint: "Perceptual exponent: <1 lifts small liquidity out of the dark and lets walls saturate (the reference feel). 1 = linear."
          }
        ),
        /* @__PURE__ */ n.jsx(
          ce,
          {
            label: "Wall glow",
            hint: "Bloom pass over the hottest levels — walls burn against a calm field.",
            children: /* @__PURE__ */ n.jsx(we, { on: r.glow, onChange: (s) => o({ glow: s }) })
          }
        ),
        /* @__PURE__ */ n.jsx(
          ce,
          {
            label: "Smooth columns",
            hint: "Bilinear blend between columns (watercolour feel). Off = crisp terminal columns.",
            children: /* @__PURE__ */ n.jsx(
              we,
              {
                on: r.smoothColumns,
                onChange: (s) => o({ smoothColumns: s })
              }
            )
          }
        ),
        /* @__PURE__ */ n.jsx(
          ce,
          {
            label: "Price path",
            hint: "Stepped bid/ask lines from the carried book — the Bookmap/DeepDom signature overlay.",
            children: /* @__PURE__ */ n.jsx(we, { on: r.showPath, onChange: (s) => o({ showPath: s }) })
          }
        ),
        /* @__PURE__ */ n.jsxs(
          ce,
          {
            label: "Candles over heat",
            hint: "OHLC candles derived from the executed print stream (trade-derived — no invented feed).",
            children: [
              /* @__PURE__ */ n.jsx(
                we,
                {
                  on: r.showCandles,
                  onChange: (s) => o({ showCandles: s })
                }
              ),
              /* @__PURE__ */ n.jsx("span", { className: "dh-hint", children: "trade-derived" })
            ]
          }
        ),
        /* @__PURE__ */ n.jsx(
          ce,
          {
            label: "Context strips",
            hint: "V3 bottom stack sharing the time axis: buy/sell-split volume histogram + CVD line, and the Imb/Cvd gauges top-left.",
            children: /* @__PURE__ */ n.jsx(
              we,
              {
                on: r.subpanes,
                onChange: (s) => o({ subpanes: s })
              }
            )
          }
        ),
        /* @__PURE__ */ n.jsx(
          xe,
          {
            label: "Big-trade ×",
            value: r.bigTradeK,
            min: 2,
            max: 12,
            step: 1,
            onChange: (s) => o({ bigTradeK: s }),
            fmt: (s) => `${s.toFixed(0)}×med`,
            hint: "Prints at or above this multiple of the rolling median size get a ring + size tag."
          }
        )
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "dh-section", children: [
        /* @__PURE__ */ n.jsx("div", { className: "dh-section-title", children: "CUT-OFF" }),
        /* @__PURE__ */ n.jsxs(ce, { label: "Mode", hint: "Percentile: relative to this session's sizes. Exact: fixed size thresholds.", children: [
          /* @__PURE__ */ n.jsx(
            je,
            {
              value: r.cutoffMode,
              onChange: (s) => o({ cutoffMode: s }),
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
            xe,
            {
              label: "Lower",
              value: r.cutoffLower,
              min: 0,
              max: 99,
              step: 1,
              onChange: (s) => o({
                cutoffLower: s,
                cutoffUpper: Math.max(s + 1, r.cutoffUpper)
              }),
              fmt: (s) => `${s.toFixed(0)}%`,
              hint: "Sizes at/below this percentile render solid bottom colour."
            }
          ),
          /* @__PURE__ */ n.jsx(
            xe,
            {
              label: "Upper",
              value: r.cutoffUpper,
              min: 1,
              max: 100,
              step: 1,
              onChange: (s) => o({
                cutoffUpper: s,
                cutoffLower: Math.min(s - 1, r.cutoffLower)
              }),
              fmt: (s) => `${s.toFixed(0)}%`,
              hint: "Sizes at/above this percentile saturate to the top colour."
            }
          )
        ] }) : /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
          /* @__PURE__ */ n.jsx(ce, { label: "Lower size", children: /* @__PURE__ */ n.jsx(
            Ue,
            {
              value: r.cutoffLower,
              min: 0,
              onCommit: (s) => o({
                cutoffLower: s,
                cutoffUpper: Math.max(s + 1e-9, r.cutoffUpper)
              })
            }
          ) }),
          /* @__PURE__ */ n.jsx(ce, { label: "Upper size", children: /* @__PURE__ */ n.jsx(
            Ue,
            {
              value: r.cutoffUpper,
              min: 0,
              onCommit: (s) => o({
                cutoffUpper: s,
                cutoffLower: Math.min(s - 1e-9, r.cutoffLower)
              })
            }
          ) })
        ] }),
        /* @__PURE__ */ n.jsx("div", { className: "dh-row", children: /* @__PURE__ */ n.jsx("span", { className: "dh-hint", style: { marginLeft: 128 }, children: "The contrast slider above the pane narrows/widens this same window." }) })
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "dh-section", children: [
        /* @__PURE__ */ n.jsx("div", { className: "dh-section-title", children: "VERTICAL SMOOTHING" }),
        /* @__PURE__ */ n.jsx(ce, { label: "Mode", hint: "Auto adapts the shade count to your price zoom.", children: /* @__PURE__ */ n.jsx(
          je,
          {
            value: r.smoothingMode,
            onChange: (s) => o({ smoothingMode: s }),
            options: [
              { id: "auto", label: "Auto" },
              { id: "manual", label: "Manual" },
              { id: "none", label: "None" }
            ]
          }
        ) }),
        /* @__PURE__ */ n.jsx(
          xe,
          {
            label: "Shades",
            value: r.smoothing,
            min: 0,
            max: 20,
            step: 1,
            disabled: r.smoothingMode !== "manual",
            onChange: (s) => o({ smoothing: s }),
            fmt: (s) => s < 2 ? "off" : s.toFixed(0),
            hint: "Number of flat gradient bands. 0–1 = no quantization."
          }
        )
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "dh-section", children: [
        /* @__PURE__ */ n.jsx("div", { className: "dh-section-title", children: "ADVANCED COLOUR" }),
        /* @__PURE__ */ n.jsx(
          xe,
          {
            label: "Contrast",
            value: r.contrast,
            min: -0.6,
            max: 1,
            step: 0.02,
            onChange: (s) => o({ contrast: s }),
            hint: "Final-output contrast around mid grey."
          }
        ),
        /* @__PURE__ */ n.jsx(
          xe,
          {
            label: "Brightness",
            value: r.brightness,
            min: -0.5,
            max: 0.5,
            step: 0.02,
            onChange: (s) => o({ brightness: s }),
            hint: "Final-output brightness offset."
          }
        )
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "dh-section", children: [
        /* @__PURE__ */ n.jsx("div", { className: "dh-section-title", children: "VOLUME DOTS" }),
        /* @__PURE__ */ n.jsx(ce, { label: "Show executed trades", children: /* @__PURE__ */ n.jsx(we, { on: r.dots, onChange: (s) => o({ dots: s }) }) }),
        /* @__PURE__ */ n.jsx(
          ce,
          {
            label: "Drawing type",
            hint: "Pie aggregates prints per price-time cell and splits the disc by aggressor-side volume.",
            children: /* @__PURE__ */ n.jsx(
              je,
              {
                value: r.dotType,
                onChange: (s) => o({ dotType: s }),
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
        /* @__PURE__ */ n.jsx(ce, { label: "Min accountable size", hint: "Prints below this size draw no dot.", children: /* @__PURE__ */ n.jsx(
          Ue,
          {
            value: r.dotMinSize,
            min: 0,
            disabled: !r.dots,
            onCommit: (s) => o({ dotMinSize: s })
          }
        ) }),
        /* @__PURE__ */ n.jsx(
          xe,
          {
            label: "Dot size",
            value: r.dotScale,
            min: 0.2,
            max: 3,
            step: 0.05,
            disabled: !r.dots,
            onChange: (s) => o({ dotScale: s })
          }
        ),
        /* @__PURE__ */ n.jsx(
          xe,
          {
            label: "Transparency",
            value: 1 - r.dotAlpha,
            min: 0,
            max: 0.95,
            step: 0.02,
            disabled: !r.dots,
            onChange: (s) => o({ dotAlpha: 1 - s }),
            fmt: (s) => `${Math.round(s * 100)}%`
          }
        )
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "dh-section", children: [
        /* @__PURE__ */ n.jsx("div", { className: "dh-section-title", children: "BOOK & MOTION" }),
        /* @__PURE__ */ n.jsx(
          ce,
          {
            label: "Ladder",
            hint: "V4: fused puts the size figures + bars inside the price-axis gutter (Bookmap layout); panel keeps the separate COB column.",
            children: /* @__PURE__ */ n.jsx(
              je,
              {
                value: r.ladderMode,
                onChange: (s) => o({ ladderMode: s }),
                options: [
                  { id: "fused", label: "Fused", title: "Ladder in the axis gutter" },
                  { id: "panel", label: "Panel", title: "Separate COB column" }
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ n.jsx(
          ce,
          {
            label: "Time & sales",
            hint: "V4 drawer: every executed print with min-size and ALL/BUY/SELL filters.",
            children: /* @__PURE__ */ n.jsx(
              we,
              {
                on: r.showTsPanel,
                onChange: (s) => o({ showTsPanel: s })
              }
            )
          }
        ),
        /* @__PURE__ */ n.jsxs(
          ce,
          {
            label: "COB column",
            hint: "S8: the numeric DOM ladder beside the heatmap — per-level size + cumulative, spread and BBO rows.",
            children: [
              /* @__PURE__ */ n.jsx(we, { on: r.cob, onChange: (s) => o({ cob: s }) }),
              /* @__PURE__ */ n.jsx("span", { className: "dh-hint", style: { marginLeft: r.cob ? 0 : 8 }, children: "cumulative column" }),
              /* @__PURE__ */ n.jsx(
                we,
                {
                  on: r.cobCumulative,
                  onChange: (s) => o({ cobCumulative: s })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ n.jsxs(
          ce,
          {
            label: "Active range",
            hint: "S6 override: expose only N levels around mid instead of the full transmitted book. Amber boundary lines mark the window on the COB column.",
            children: [
              /* @__PURE__ */ n.jsx(
                we,
                {
                  on: r.activeRange > 0,
                  onChange: (s) => o({ activeRange: s ? 10 : 0 })
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
                  onCommit: (s) => o({ activeRange: Math.round(s) })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ n.jsx(
          ce,
          {
            label: "Auto-recenter",
            hint: "S9: glides the price axis back when the anchor drifts beyond tolerance. Double-click recenters instantly.",
            children: /* @__PURE__ */ n.jsx(
              je,
              {
                value: r.recenterMode,
                onChange: (s) => o({ recenterMode: s }),
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
          xe,
          {
            label: "Tolerance",
            value: r.recenterTolerance,
            min: 1,
            max: 90,
            step: 1,
            disabled: r.recenterMode === "off",
            onChange: (s) => o({ recenterTolerance: s }),
            fmt: (s) => `${s.toFixed(0)}%`,
            hint: "Recenter only when the anchor drifts beyond this share of the visible range (prevents jitter)."
          }
        ),
        /* @__PURE__ */ n.jsxs(
          ce,
          {
            label: "Depth reset",
            hint: "S11: how stale last-seen liquidity is dropped — per session, or on a fixed interval.",
            children: [
              /* @__PURE__ */ n.jsx(
                je,
                {
                  value: r.resetPolicy,
                  onChange: (s) => o({ resetPolicy: s }),
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
                  onCommit: (s) => o({ resetIntervalMin: Math.round(s) })
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
          onClick: () => o({ ...nt }),
          children: "Reset to defaults"
        }
      ),
      /* @__PURE__ */ n.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ n.jsx("span", { className: "dh-hint", children: "changes apply live & save automatically" }),
      /* @__PURE__ */ n.jsx("button", { className: "dh-btn primary", onClick: a, children: "Done" })
    ] })
  ] }) });
}
const Qe = 1e-9;
class De {
  bids = /* @__PURE__ */ new Map();
  asks = /* @__PURE__ */ new Map();
  version = 0;
  static key(e) {
    return Math.round(e / Qe) * Qe;
  }
  apply(e) {
    for (const [i, o] of e.bids) {
      const a = De.key(i);
      o <= 0 ? this.bids.delete(a) : this.bids.set(a, o);
    }
    for (const [i, o] of e.asks) {
      const a = De.key(i);
      o <= 0 ? this.asks.delete(a) : this.asks.set(a, o);
    }
    this.version += 1;
  }
  /** Seed from the /api/orderflow/book snapshot shape. */
  seed(e, i) {
    this.bids.clear(), this.asks.clear();
    for (const [o, a] of e) a > 0 && this.bids.set(De.key(o), a);
    for (const [o, a] of i) a > 0 && this.asks.set(De.key(o), a);
    this.version += 1;
  }
  bestBid() {
    let e = null;
    for (const i of this.bids.keys()) (e === null || i > e) && (e = i);
    return e;
  }
  bestAsk() {
    let e = null;
    for (const i of this.asks.keys()) (e === null || i < e) && (e = i);
    return e;
  }
  /** Bids best-first, asks best-first (mirrors book.py's ranked views). */
  sorted() {
    return {
      bids: [...this.bids.entries()].sort((e, i) => i[0] - e[0]),
      asks: [...this.asks.entries()].sort((e, i) => e[0] - i[0])
    };
  }
}
function $t(t) {
  return t >= 1e3 ? `${(t / 1e3).toFixed(1)}k` : t >= 100 ? t.toFixed(0) : t >= 1 ? t.toFixed(1) : t.toPrecision(2);
}
function Xt(t) {
  return t >= 1e3 ? t.toFixed(1) : t >= 1 ? t.toFixed(2) : t.toPrecision(4);
}
function Ht({
  rendererRef: t,
  book: e,
  settings: i,
  width: o = 148
}) {
  const a = T.useRef(null), r = T.useRef(i);
  return r.current = i, T.useEffect(() => {
    const l = a.current;
    if (!l) return;
    const s = l.getContext("2d");
    let c = 0, h = -1, b = -1, y = !1;
    const v = () => {
      const m = l.getBoundingClientRect(), x = window.devicePixelRatio || 1;
      l.width = Math.max(1, Math.round(m.width * x)), l.height = Math.max(1, Math.round(m.height * x)), h = -1;
    }, d = new ResizeObserver(v);
    d.observe(l), v();
    const g = () => {
      const m = t.current;
      if (!m) return;
      const x = m.getViewMetrics();
      if (x.version === h && e.version === b) return;
      h = x.version, b = e.version;
      const M = window.devicePixelRatio || 1, p = l.width / M, C = l.height / M;
      s.setTransform(M, 0, 0, M, 0, 0), s.fillStyle = "#0d1117", s.fillRect(0, 0, p, C);
      const { bids: u, asks: E } = e.sorted();
      if (!u.length && !E.length) {
        s.fillStyle = "#5c6672", s.font = "10px monospace", s.textAlign = "center", s.fillText("no book", p / 2, C / 2);
        return;
      }
      const P = r.current, I = e.bestBid(), U = e.bestAsk(), q = P.activeRange > 0, L = [...u, ...E].filter(([k]) => k >= x.lo && k <= x.hi).map(([k]) => k).sort((k, A) => k - A);
      let F = 8;
      if (L.length >= 2) {
        const k = [];
        for (let A = 1; A < L.length; A++) k.push(L[A] - L[A - 1]);
        k.sort((A, X) => A - X), F = Math.min(20, Math.max(2.5, x.ppu * k[k.length >> 1]));
      }
      let $ = 0, H = 0;
      {
        let k = 0;
        for (const [A, X] of u)
          A >= x.lo && A <= x.hi && ($ = Math.max($, X)), k += X, H = Math.max(H, k);
        k = 0;
        for (const [A, X] of E)
          A >= x.lo && A <= x.hi && ($ = Math.max($, X)), k += X, H = Math.max(H, k);
      }
      const Z = p - 52, ee = P.cobCumulative ? 26 : 0, Y = p - 8 - ee - 40, Q = (k, A, X, Ce, te) => {
        const Ee = x.yOf(k);
        if (Ee < -F || Ee > C + F) return;
        const Se = Ee - F / 2, S = q && !te;
        if (P.cobCumulative && H > 0) {
          const se = Math.max(1, Ce / H * 18);
          s.fillStyle = X === "bid" ? "rgba(38, 166, 154, 0.14)" : "rgba(239, 83, 80, 0.14)", s.fillRect(p - 20, Se, 18, F - 1), s.fillStyle = X === "bid" ? "rgba(38, 166, 154, 0.45)" : "rgba(239, 83, 80, 0.45)", s.fillRect(p - 20, Se, se, F - 1);
        }
        const R = $ > 0 ? Math.max(1.5, A / $ * Z) : 1.5;
        s.fillStyle = X === "bid" ? S ? "rgba(38,166,154,0.16)" : "rgba(38, 166, 154, 0.62)" : S ? "rgba(239,83,80,0.16)" : "rgba(239, 83, 80, 0.62)", s.fillRect(Y + 40 - R, Se, R, F - 1), s.font = "9px monospace", s.textAlign = "right", s.fillStyle = S ? "#4a5260" : X === "bid" ? "#9fd6cd" : "#f4b3ae", s.fillText($t(A), Y + 38, Ee + 3);
      };
      let W = 0;
      for (let k = 0; k < u.length; k++) {
        const [A, X] = u[k];
        W += X, !(A < x.lo - F || A > x.hi + F) && Q(A, X, "bid", W, !q || k < P.activeRange);
      }
      W = 0;
      for (let k = 0; k < E.length; k++) {
        const [A, X] = E[k];
        W += X, !(A < x.lo - F || A > x.hi + F) && Q(A, X, "ask", W, !q || k < P.activeRange);
      }
      const le = (k, A) => {
        const X = x.yOf(k);
        X < 0 || X > C || (s.strokeStyle = A, s.lineWidth = 1, s.beginPath(), s.moveTo(0, Math.round(X) + 0.5), s.lineTo(p, Math.round(X) + 0.5), s.stroke());
      };
      if (I !== null && le(I, "rgba(38, 166, 154, 0.95)"), U !== null && le(U, "rgba(239, 83, 80, 0.95)"), I !== null && U !== null && U > I) {
        const k = (x.yOf(I) + x.yOf(U)) / 2;
        if (k > 10 && k < C - 10) {
          const A = `Δ ${Xt(U - I)}`;
          s.font = "9px monospace";
          const X = s.measureText(A).width + 10;
          s.fillStyle = "rgba(20, 24, 31, 0.95)", s.fillRect(2, k - 8, X, 16), s.strokeStyle = "#2a3140", s.strokeRect(2.5, k - 7.5, X - 1, 15), s.fillStyle = "#c8cfda", s.textAlign = "left", s.fillText(A, 7, k + 3);
        }
      }
      if (q) {
        const k = [];
        u.length && P.activeRange <= u.length && k.push(x.yOf(u[P.activeRange - 1][0]) + F / 2 + 1), E.length && P.activeRange <= E.length && k.push(x.yOf(E[P.activeRange - 1][0]) - F / 2 - 1), s.strokeStyle = "rgba(255, 179, 0, 0.75)", s.setLineDash([3, 3]);
        for (const A of k)
          A < 0 || A > C || (s.beginPath(), s.moveTo(0, A), s.lineTo(p, A), s.stroke());
        s.setLineDash([]);
      }
    }, w = () => {
      y || (g(), c = requestAnimationFrame(w));
    };
    return c = requestAnimationFrame(w), () => {
      y = !0, cancelAnimationFrame(c), d.disconnect();
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
function Wt(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} MB` : t >= 1e3 ? `${(t / 1e3).toFixed(0)} KB` : `${t} B`;
}
function Gt(t) {
  const e = new Date(t * 1e3);
  return e.toLocaleDateString(void 0, { month: "short", day: "numeric" }) + " " + e.toLocaleTimeString(void 0, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !1
  });
}
function qt(t, e) {
  const i = Math.max(0, Math.round((e ?? Date.now() / 1e3) - t)), o = Math.floor(i / 3600), a = Math.floor(i % 3600 / 60);
  return o ? `${o}h ${a}m` : a ? `${a}m ${i % 60}s` : `${i}s`;
}
function Vt({
  symbol: t,
  onLoad: e,
  onClose: i
}) {
  const [o, a] = T.useState(null), [r, l] = T.useState(null), [s, c] = T.useState(null), [h, b] = T.useState(null), [y, v] = T.useState(null), d = T.useCallback(() => {
    fetch("/api/orderflow/sessions").then((m) => m.ok ? m.json() : Promise.reject(new Error(`HTTP ${m.status}`))).then((m) => {
      a(m.filter((x) => x.symbol === t)), l(null);
    }).catch((m) => l(String(m)));
  }, [t]);
  T.useEffect(() => {
    d();
    const m = setInterval(d, 4e3);
    return () => clearInterval(m);
  }, [d]), T.useEffect(() => {
    const m = (x) => {
      x.key === "Escape" && i();
    };
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, [i]);
  const g = async (m) => {
    c(m.id), v(null);
    try {
      const x = await fetch(
        `/api/orderflow/sessions/${encodeURIComponent(m.id)}/events`
      );
      if (!x.ok) {
        const p = await x.json().catch(() => ({ detail: `HTTP ${x.status}` }));
        throw new Error(String(p.detail || x.status));
      }
      const M = await x.json();
      await e(M.events || [], { ...m, rows: (M.events || []).length }), M.truncated && v("Large session: loaded up to the event cap — the tail stays in the file."), i();
    } catch (x) {
      l(String(x));
    } finally {
      c(null);
    }
  }, w = async (m) => {
    if (h !== m.id) {
      b(m.id);
      return;
    }
    b(null);
    try {
      const x = await fetch(
        `/api/orderflow/sessions/${encodeURIComponent(m.id)}`,
        { method: "DELETE" }
      );
      if (!x.ok) {
        const M = await x.json().catch(() => ({ detail: `HTTP ${x.status}` }));
        throw new Error(String(M.detail || x.status));
      }
      d();
    } catch (x) {
      l(String(x));
    }
  };
  return /* @__PURE__ */ n.jsx("div", { className: "dh-backdrop", onMouseDown: i, children: /* @__PURE__ */ n.jsxs("div", { className: "dh-window", onMouseDown: (m) => m.stopPropagation(), children: [
    /* @__PURE__ */ n.jsxs("div", { className: "dh-head", children: [
      /* @__PURE__ */ n.jsx("span", { className: "dh-head-title", children: "RECORDED SESSIONS" }),
      /* @__PURE__ */ n.jsx("span", { className: "dh-head-sym", children: t }),
      /* @__PURE__ */ n.jsx("button", { className: "dh-close", onClick: i, title: "Close (Esc)", children: "✕" })
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
      o?.map((m) => /* @__PURE__ */ n.jsxs("div", { className: "dh-sess", children: [
        /* @__PURE__ */ n.jsxs("div", { style: { minWidth: 0, flex: 1 }, children: [
          /* @__PURE__ */ n.jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexWrap: "wrap"
          }, children: [
            m.recording && /* @__PURE__ */ n.jsx("span", { className: "dh-rec-dot", title: "Recording now" }),
            /* @__PURE__ */ n.jsx("span", { style: { fontFamily: "ui-monospace, Menlo, monospace" }, children: m.id }),
            m.demo && /* @__PURE__ */ n.jsx("span", { className: "dh-chip demo", children: "DEMO" }),
            /* @__PURE__ */ n.jsx("span", { className: "dh-chip", children: m.source || "live" })
          ] }),
          /* @__PURE__ */ n.jsxs("div", { className: "dh-hint", style: { marginTop: 2 }, children: [
            Gt(m.started),
            " · ",
            qt(m.started, m.stopped),
            " · ",
            Wt(m.bytes),
            " · ",
            m.rows.toLocaleString(),
            " rows",
            m.stopped === null ? " · recording…" : ""
          ] })
        ] }),
        /* @__PURE__ */ n.jsx(
          "button",
          {
            className: "dh-btn primary",
            disabled: s !== null,
            onClick: () => g(m),
            title: "Load this recording into the pane",
            children: s === m.id ? "loading…" : "Load"
          }
        ),
        /* @__PURE__ */ n.jsx(
          "button",
          {
            className: "dh-btn",
            style: h === m.id ? { borderColor: "#ef5350", color: "#ef9a9a" } : void 0,
            onClick: () => w(m),
            title: "Delete this recording",
            children: h === m.id ? "sure?" : "Delete"
          }
        )
      ] }, m.id)),
      y && /* @__PURE__ */ n.jsx("div", { className: "dh-empty", children: y })
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "dh-foot", children: [
      /* @__PURE__ */ n.jsx("span", { className: "dh-hint", children: "recordings are parquet files in workspace/MY DATA" }),
      /* @__PURE__ */ n.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ n.jsx("button", { className: "dh-btn primary", onClick: i, children: "Done" })
    ] })
  ] }) });
}
const Yt = 4 * 3600;
function ht(t) {
  return `lset-depth-settings:${t}`;
}
function We(t) {
  let e = { ...nt }, i = null;
  try {
    const a = localStorage.getItem(ht(t));
    a && (i = JSON.parse(a), e = { ...e, ...i });
  } catch {
  }
  i && i.subpanes === void 0 && i.showVolumeStrip === !1 && (e.subpanes = !1);
  const o = xt();
  return o.apply && (e = { ...e, scheme: o.scheme, applySchemeGlobally: !0 }), e;
}
function Ze(t, e) {
  try {
    localStorage.setItem(ht(t), JSON.stringify(e));
  } catch {
  }
}
function Kt({
  symbol: t,
  sourceProvider: e,
  colors: i,
  syncedCrosshairTime: o,
  onCrosshairMove: a,
  onToggleKind: r
}) {
  const l = T.useRef(null), s = T.useRef(null), c = T.useRef(null);
  c.current || (c.current = new De());
  const [h, b] = T.useState({ kind: "loading" }), [y, v] = T.useState(
    () => We(t)
  ), [d, g] = T.useState(50), [w, m] = T.useState(!1), [x, M] = T.useState(null), [p, C] = T.useState(!1), [u, E] = T.useState(null), [P, I] = T.useState(null), [U, q] = T.useState(0), [L, F] = T.useState(null), [$, H] = T.useState(0), Z = T.useCallback((S) => {
    v((R) => {
      const se = { ...R, ...S };
      return se.applySchemeGlobally && S.scheme && S.scheme !== R.scheme && (qe(S.scheme, !0), window.dispatchEvent(new CustomEvent(
        Fe,
        { detail: { scheme: S.scheme, source: t } }
      ))), Ze(t, se), s.current?.setSettings(se), s.current?.refreshCutoffs(), se;
    });
  }, [t]);
  T.useEffect(() => {
    const S = (R) => {
      const se = R.detail;
      se.source !== t && v((he) => {
        if (!he.applySchemeGlobally || he.scheme === se.scheme) return he;
        const Te = { ...he, scheme: se.scheme };
        return Ze(t, Te), s.current?.setSettings(Te), Te;
      });
    };
    return window.addEventListener(Fe, S), () => window.removeEventListener(Fe, S);
  }, [t]);
  const ee = T.useCallback(async () => {
    I(null);
    try {
      const S = await fetch("/api/orderflow/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol: t })
      }), R = await S.json().catch(() => ({}));
      if (!S.ok) throw new Error(String(R.detail || `HTTP ${S.status}`));
      E({ rid: R.id ?? R.sid ?? "", since: Date.now() });
    } catch (S) {
      I(String(S));
    }
  }, [t]), Y = T.useCallback(async () => {
    try {
      await fetch("/api/orderflow/record/stop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: u?.rid ?? "" })
      });
    } catch {
    }
    E(null), q(0);
  }, [u]);
  T.useEffect(() => {
    if (!u) return;
    const S = setInterval(() => {
      q(Math.floor((Date.now() - u.since) / 1e3));
    }, 1e3);
    return () => clearInterval(S);
  }, [u]);
  const Q = T.useCallback((S, R) => {
    const se = s.current;
    if (!se || !S.length) return;
    const he = S.filter((me) => me.type === "SNAPSHOT" || me.type === "DELTA"), Te = S.filter((me) => typeof me.side == "string");
    se.ingestHistory(he), c.current?.seed([], []);
    for (const me of he) c.current?.apply(me);
    for (const me of Te) se.addTrade(me);
    F(R.id);
  }, []), W = T.useCallback(() => {
    F(null), H((S) => S + 1);
  }, []);
  T.useEffect(() => {
    const S = l.current;
    if (!S) return;
    const R = new It(We(t));
    return s.current = R, R.attach(S), R.setBookSource(c.current), a && (R.onHoverTime = (se) => a(se)), () => {
      R.dispose(), s.current = null;
    };
  }, [t]), T.useEffect(() => {
    s.current?.setSettings(y);
  }, [y]), T.useEffect(() => {
    s.current?.setSyncedCrosshair(
      o ?? null
    );
  }, [o]), T.useEffect(() => {
    let S = !1, R = null;
    return b({ kind: "loading" }), c.current?.seed([], []), (async () => {
      const he = s.current;
      if (!he) return;
      const Te = Date.now() / 1e3, me = e ? `&provider=${encodeURIComponent(e)}` : "";
      let Ae = !1, ke = "";
      try {
        const ue = await fetch(
          `/api/orderflow/depth?symbol=${encodeURIComponent(t)}` + me + `&from=${Te - Yt}&to=${Te}&column_ms=1000&max_levels=60`
        );
        if (!ue.ok) {
          const ge = await ue.json().catch(() => ({ detail: `HTTP ${ue.status}` }));
          S || b({ kind: "nodata", reason: String(ge.detail || ue.status) });
          return;
        }
        const J = await ue.json();
        if (S) return;
        Ae = !!J.demo, ke = J.provider, he.ingestHistory(J.events || []);
        for (const ge of J.trades || [])
          he.addTrade(ge);
      } catch (ue) {
        S || b({ kind: "nodata", reason: `engine unreachable: ${ue}` });
        return;
      }
      try {
        const ue = We(t), J = new URLSearchParams({ symbol: t });
        e && J.set("provider", e), ue.activeRange > 0 && J.set("active_levels", String(ue.activeRange)), J.set("reset", ue.resetPolicy), ue.resetPolicy === "interval" && J.set("reset_interval_min", String(ue.resetIntervalMin));
        const ge = await fetch(`/api/orderflow/book?${J.toString()}`);
        if (ge.ok) {
          const ye = await ge.json();
          he.setBook(ye.best_bid ?? null, ye.best_ask ?? null), c.current?.seed(ye.bids ?? [], ye.asks ?? []);
        }
      } catch {
      }
      S || b({ kind: "live", demo: Ae, provider: ke });
      const Ie = location.protocol === "https:" ? "wss" : "ws";
      R = new WebSocket(
        `${Ie}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(t)}${me}`
      ), R.onmessage = (ue) => {
        if (S) return;
        let J;
        try {
          J = JSON.parse(ue.data);
        } catch {
          return;
        }
        const ge = s.current;
        if (ge)
          if (J.type === "depth") {
            if (ge.applyDepth(J.event), c.current?.apply(J.event), J.event.type === "SNAPSHOT") {
              let ye = null, Pe = null;
              for (const [Re] of J.event.bids)
                (ye === null || Re > ye) && (ye = Re);
              for (const [Re] of J.event.asks)
                (Pe === null || Re < Pe) && (Pe = Re);
              ge.setBook(ye, Pe);
            }
          } else J.type === "trade" ? ge.addTrade(J.event) : J.type === "error" && b({ kind: "nodata", reason: J.message });
      }, R.onclose = () => {
      };
    })(), () => {
      S = !0;
      try {
        R?.close();
      } catch {
      }
    };
  }, [t, $]), T.useEffect(() => {
    if (!(y.cutoffMode === "percentile")) return;
    const R = 90 - d * 0.8, se = Math.max(0, 50 - R / 2), he = Math.min(100, 50 + R / 2);
    Z({ cutoffLower: se, cutoffUpper: he });
  }, [d]);
  const le = T.useMemo(() => h.kind === "live" && h.demo ? "DEMO" : h.kind === "live" ? h.provider.toUpperCase() : "", [h]), k = T.useCallback((S) => {
    s.current?.wheel(S.deltaX, S.deltaY, S.shiftKey);
  }, []), A = T.useRef(null), X = T.useCallback((S) => {
    A.current = { x: S.clientX, y: S.clientY };
  }, []), Ce = T.useCallback((S) => {
    const R = S.currentTarget.getBoundingClientRect();
    A.current && S.buttons & 1 && (s.current?.drag(
      S.clientX - A.current.x,
      S.clientY - A.current.y
    ), A.current = { x: S.clientX, y: S.clientY }), s.current?.setHover(S.clientX - R.left, S.clientY - R.top);
  }, []), te = T.useCallback(() => {
    A.current = null;
  }, []), Ee = T.useCallback(() => {
    A.current = null, s.current?.setHover(null, null);
  }, []), Se = T.useCallback(() => {
    s.current?.recenter();
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
          onClick: () => Z({ view: S }),
          title: S === "heat" ? "Resting liquidity heat field" : "Footprint: bid×ask executed volume per price and time bucket",
          style: {
            background: y.view === S ? "#2b3547" : "transparent",
            color: y.view === S ? "#eef1f6" : "#93a0b1",
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
      le && /* @__PURE__ */ n.jsx("span", { style: {
        padding: "0 6px",
        borderRadius: 3,
        fontSize: 9,
        letterSpacing: 0.5,
        background: h.kind === "live" && h.demo ? "rgba(255, 152, 0, 0.25)" : "rgba(120, 144, 156, 0.25)",
        color: h.kind === "live" && h.demo ? "#ffb74d" : "#b0bec5"
      }, children: le }),
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
          value: d,
          onChange: (S) => g(Number(S.target.value)),
          title: "Cut-off window — narrows/widens where the gradient saturates (S3)",
          style: { width: 90, accentColor: "#78909c" }
        }
      ),
      u ? /* @__PURE__ */ n.jsxs(
        "button",
        {
          onClick: Y,
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
            Math.floor(U / 60),
            ":",
            String(U % 60).padStart(2, "0"),
            " — stop"
          ]
        }
      ) : /* @__PURE__ */ n.jsx(
        "button",
        {
          onClick: ee,
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
          onClick: () => C(!0),
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
          onClick: () => Z({ showTsPanel: !y.showTsPanel }),
          title: "Time & sales drawer: every executed print with min-size and side filters (V4)",
          style: {
            background: y.showTsPanel ? "#1d232e" : "transparent",
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
      L && /* @__PURE__ */ n.jsxs("span", { style: {
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
            onClick: W,
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
      P && /* @__PURE__ */ n.jsxs("span", { title: P, style: {
        fontSize: 9,
        color: "#ef9a9a",
        maxWidth: 150,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }, children: [
        "rec: ",
        P
      ] }),
      /* @__PURE__ */ n.jsxs(
        "button",
        {
          onClick: () => {
            M(s.current?.getCutoffs() ?? null), m(!0);
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
          S.preventDefault(), M(s.current?.getCutoffs() ?? null), m(!0);
        },
        children: [
          /* @__PURE__ */ n.jsxs("div", { style: { position: "relative", flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ n.jsx(
              "canvas",
              {
                ref: l,
                style: { position: "absolute", inset: 0, width: "100%", height: "100%" },
                onWheel: k,
                onMouseDown: X,
                onMouseMove: Ce,
                onMouseUp: te,
                onMouseLeave: Ee,
                onDoubleClick: Se
              }
            ),
            h.kind === "loading" && /* @__PURE__ */ n.jsx("div", { style: et, children: "Loading depth history…" }),
            h.kind === "nodata" && /* @__PURE__ */ n.jsxs("div", { style: et, children: [
              /* @__PURE__ */ n.jsxs("div", { style: { fontWeight: 600, marginBottom: 6 }, children: [
                "No depth data for ",
                t
              ] }),
              /* @__PURE__ */ n.jsx("div", { style: { opacity: 0.7, maxWidth: 340, textAlign: "center" }, children: h.reason })
            ] })
          ] }),
          y.cob && y.ladderMode === "panel" && h.kind === "live" && /* @__PURE__ */ n.jsx(
            Ht,
            {
              rendererRef: s,
              book: c.current,
              settings: y
            }
          ),
          w && /* @__PURE__ */ n.jsx(
            Bt,
            {
              symbol: t,
              settings: y,
              cutoffRange: x,
              onChange: (S) => {
                Z(S), M(s.current?.getCutoffs() ?? null);
              },
              onClose: () => m(!1)
            }
          ),
          p && /* @__PURE__ */ n.jsx(
            Vt,
            {
              symbol: t,
              onLoad: Q,
              onClose: () => C(!1)
            }
          )
        ]
      }
    )
  ] });
}
const et = {
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
  color: "#9aa4b2",
  fontSize: 12
}, Jt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Kt
}, Symbol.toStringTag, { value: "Module" })), de = 8192, fe = 1024, Qt = [
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
], Zt = [
  { t: 0, r: 68, g: 1, b: 84 },
  { t: 0.2, r: 65, g: 68, b: 135 },
  { t: 0.4, r: 42, g: 120, b: 142 },
  { t: 0.6, r: 34, g: 168, b: 132 },
  { t: 0.8, r: 122, g: 209, b: 81 },
  { t: 1, r: 253, g: 231, b: 37 }
], es = [
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
  const i = t[t.length - 1];
  return [i.r, i.g, i.b];
}
function ts(t) {
  if (t < 0.05) {
    const i = t / 0.05;
    return [i * 3, 0, i * 4];
  }
  if (t < 0.15) {
    const i = (t - 0.05) / 0.1;
    return [3 + i * 27, i * 9, 4 + i * 64];
  }
  if (t < 0.25) {
    const i = (t - 0.15) / 0.1;
    return [30 + i * 43, 9 + i * 7, 68 + i * 35];
  }
  if (t < 0.35) {
    const i = (t - 0.25) / 0.1;
    return [73 + i * 47, 16 + i * 12, 103 + i * 6];
  }
  if (t < 0.45) {
    const i = (t - 0.35) / 0.1;
    return [120 + i * 37, 28 + i * 14, 109 - i * 20];
  }
  if (t < 0.55) {
    const i = (t - 0.45) / 0.1;
    return [157 + i * 30, 42 + i * 13, 89 - i * 26];
  }
  if (t < 0.65) {
    const i = (t - 0.55) / 0.1;
    return [187 + i * 25, 55 + i * 25, 63 - i * 28];
  }
  if (t < 0.75) {
    const i = (t - 0.65) / 0.1;
    return [212 + i * 22, 80 + i * 37, 35 - i * 24];
  }
  if (t < 0.85) {
    const i = (t - 0.75) / 0.1;
    return [234 + i * 13, 117 + i * 44, 11 - i * 7];
  }
  if (t < 0.95) {
    const i = (t - 0.85) / 0.1;
    return [247 + i * 3, 161 + i * 49, 4 + i * 48];
  }
  const e = (t - 0.95) / 0.05;
  return [250 + e * 2, 210 + e * 45, 52 + e * 112];
}
function ss(t) {
  if (t < 0.01) return [15, 25, 45];
  if (t < 0.15) {
    const i = (t - 0.01) / 0.14;
    return [15 + i * 10, 25 + i * 95, 45 + i * 105];
  }
  if (t < 0.35) {
    const i = (t - 0.15) / 0.2;
    return [25 + i * 35, 120 + i * 40, 150 + i * 55];
  }
  if (t < 0.55) {
    const i = (t - 0.35) / 0.2;
    return [60 + i * 120, 160 - i * 80, 205 + i * 30];
  }
  if (t < 0.75) {
    const i = (t - 0.55) / 0.2;
    return [180 + i * 65, 80 + i * 100, 235 - i * 155];
  }
  const e = (t - 0.75) / 0.25;
  return [245 + e * 10, 180 + e * 75, 80 + e * 175];
}
function is(t) {
  if (t < 0.08) {
    const i = t / 0.08;
    return [8 + i * 4, 13 + i * 14, 18 + i * 18];
  }
  if (t < 0.25) {
    const i = (t - 0.08) / 0.17;
    return [12 + i * 10, 27 + i * 56, 36 + i * 72];
  }
  if (t < 0.5) {
    const i = (t - 0.25) / 0.25;
    return [22 + i * 26, 83 + i * 99, 108 + i * 93];
  }
  if (t < 0.75) {
    const i = (t - 0.5) / 0.25;
    return [48 + i * 170, 182 + i * 35, 201 - i * 106];
  }
  const e = (t - 0.75) / 0.25;
  return [218 + e * 37, 217 + e * 33, 95 + e * 125];
}
function tt(t, e = 1) {
  const i = new Uint8Array(1024);
  for (let o = 0; o < 256; o++) {
    const a = o / 255;
    let r, l, s, c;
    if (t === "ember" ? [r, l, s] = ze(Qt, a) : t === "viridis" ? [r, l, s] = ze(Zt, a) : t === "magma" ? [r, l, s] = ze(es, a) : t === "inferno" ? [r, l, s] = ts(a) : t === "deepdom" || t === "bookmap" ? [r, l, s] = is(a) : t === "realtime" ? [r, l, s] = ze([{ t: 0, r: 8, g: 13, b: 18 }, { t: 0.08, r: 12, g: 27, b: 36 }, { t: 0.25, r: 22, g: 83, b: 108 }, { t: 0.5, r: 48, g: 182, b: 201 }, { t: 0.75, r: 218, g: 217, b: 95 }, { t: 1, r: 255, g: 250, b: 220 }], a) : t === "realtime_warm" ? [r, l, s] = ze([{ t: 0, r: 8, g: 13, b: 18 }, { t: 0.15, r: 15, g: 30, b: 64 }, { t: 0.4, r: 28, g: 92, b: 153 }, { t: 0.65, r: 75, g: 181, b: 190 }, { t: 0.8, r: 240, g: 205, b: 75 }, { t: 0.94, r: 248, g: 108, b: 40 }, { t: 1, r: 255, g: 55, b: 35 }], a) : [r, l, s] = ss(a), t === "inferno" || t === "ember" || t === "viridis" || t === "magma") {
      if (a < 0.05) c = 0;
      else if (a < 0.15) {
        const h = (a - 0.05) / 0.1;
        c = h * h * 40;
      } else if (a < 0.35)
        c = 40 + (a - 0.15) / 0.2 * 80;
      else if (a < 0.6)
        c = 120 + (a - 0.35) / 0.25 * 70;
      else {
        const h = (a - 0.6) / 0.4;
        c = Math.min(245, 190 + h * 55);
      }
      c *= e;
    } else
      c = 220 * e;
    i[o * 4] = Math.round(r), i[o * 4 + 1] = Math.round(l), i[o * 4 + 2] = Math.round(s), i[o * 4 + 3] = Math.round(c);
  }
  return i;
}
const ns = `#version 300 es
void main() {
  vec2 pos = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(pos * 2.0 - 1.0, 0.0, 1.0);
}
`, os = `#version 300 es
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
class as {
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
  columnMeta = Array.from({ length: de }, () => ({
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
    const i = e.getContext("webgl2", { alpha: !1, antialias: !1, premultipliedAlpha: !1 });
    return i ? (this.gl = i, this.initGL(), !0) : (console.warn("WebGL2 not available, fallback to Canvas2D"), !1);
  }
  initGL() {
    const e = this.gl, i = e.createShader(e.VERTEX_SHADER);
    if (e.shaderSource(i, ns), e.compileShader(i), !e.getShaderParameter(i, e.COMPILE_STATUS)) {
      console.error("VS compile", e.getShaderInfoLog(i));
      return;
    }
    const o = e.createShader(e.FRAGMENT_SHADER);
    if (e.shaderSource(o, os), e.compileShader(o), !e.getShaderParameter(o, e.COMPILE_STATUS)) {
      console.error("FS compile", e.getShaderInfoLog(o));
      return;
    }
    const a = e.createProgram();
    if (e.attachShader(a, i), e.attachShader(a, o), e.linkProgram(a), !e.getProgramParameter(a, e.LINK_STATUS)) {
      console.error("Program link", e.getProgramInfoLog(a));
      return;
    }
    this.program = a, e.useProgram(a), this.vao = e.createVertexArray(), e.bindVertexArray(this.vao), this.dataTex = e.createTexture(), e.bindTexture(e.TEXTURE_2D, this.dataTex), e.texImage2D(e.TEXTURE_2D, 0, e.R32F, de, fe, 0, e.RED, e.FLOAT, new Float32Array(de * fe)), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), this.reachTex = e.createTexture(), e.bindTexture(e.TEXTURE_2D, this.reachTex), e.texImage2D(e.TEXTURE_2D, 0, e.R32F, de, fe, 0, e.RED, e.FLOAT, new Float32Array(de * fe)), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), this.metaTex = e.createTexture(), e.bindTexture(e.TEXTURE_2D, this.metaTex), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA32F, de, 1, 0, e.RGBA, e.FLOAT, new Float32Array(de * 4)), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), this.colormapTex = e.createTexture(), this.colormapWarmTex = e.createTexture(), this.updateColormap();
    const r = ["u_data", "u_meta", "u_colormap", "u_colormap_warm", "u_reach_data", "u_plot_origin", "u_plot_size", "u_viewport_time_min", "u_viewport_time_max", "u_viewport_price_min", "u_viewport_price_max", "u_data_time_start", "u_observation_hold_until", "u_time_step", "u_ring_start", "u_ring_count", "u_ring_size", "u_max_rows", "u_bucket_size", "u_bucket_multiplier", "u_sensitivity", "u_max_qty", "u_color_low", "u_color_peak", "u_mode", "u_opacity", "u_use_reach", "u_use_warm"];
    for (const l of r) this.uniforms[l] = e.getUniformLocation(a, l);
    e.bindVertexArray(null);
  }
  updateColormap() {
    const e = this.gl;
    if (!e || !this.colormapTex || !this.colormapWarmTex) return;
    let i = "orderbook";
    this.mode === "liquidation" ? i = this.liqColormap : i = this.obColormap;
    const o = tt(i, this.opacity);
    e.activeTexture(e.TEXTURE2), e.bindTexture(e.TEXTURE_2D, this.colormapTex), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 256, 1, 0, e.RGBA, e.UNSIGNED_BYTE, o), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
    const a = tt("ember", this.opacity);
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
    const i = this.gl;
    !i || !this.dataTex || (i.bindTexture(i.TEXTURE_2D, this.dataTex), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, e ? i.LINEAR : i.NEAREST), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, e ? i.LINEAR : i.NEAREST));
  }
  processSnapshot(e, i, o) {
    if (o <= 0 || (this.nativeBucket = o, i.size === 0)) return;
    const a = /* @__PURE__ */ new Map();
    for (const [r, l] of i) {
      if (Math.abs(l) < 1e-3) continue;
      const s = Math.floor(r / o) * o;
      a.set(s, (a.get(s) || 0) + l);
    }
    if (this.timeline.set(e, a), this.timeline.size > 5e3) {
      const r = this.timeline.keys().next().value;
      this.timeline.delete(r);
    }
    this.gpuDirty = !0;
  }
  updateLiveColumn(e, i, o = 0) {
    this.processSnapshot(e, i, this.nativeBucket || 0.01), o && (this.observationHoldUntilMs = e + 6e4);
  }
  finalizeColumn(e, i, o = !1, a = 0) {
    this.processSnapshot(e, i, this.nativeBucket || 0.01);
    const r = this.findColumnForTime(e);
    r >= 0 && (this.columnMeta[r].finalized = !0);
  }
  uploadReachData(e, i) {
    if (this.reachTimeline.set(e, i), this.reachTimeline.size > 5e3) {
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
    return a < 0 || a >= de ? -1 : a;
  }
  syncGpuFromTimeline() {
    const e = this.gl;
    if (!e || !this.timeline.size) {
      this.ringCount = 0, this.gpuDirty = !1;
      return;
    }
    const i = Array.from(this.timeline.entries()).sort((v, d) => v[0] - d[0]), o = i[0][0];
    this.gpuOriginMs = Math.floor(o / this.timeStepMs) * this.timeStepMs, this.gpuBucketSize = this.nativeBucket * (this.mode === "orderbook" ? this.bucketMultiplier : 1), this.globalMaxQty = 0.01;
    let a = 1 / 0, r = -1 / 0;
    for (const [, v] of i)
      for (const d of v.keys())
        d < a && (a = d), d > r && (r = d);
    const s = (a + r) / 2 - fe / 2 * this.gpuBucketSize, c = new Float32Array(de * fe), h = new Float32Array(de * 4), b = new Float32Array(de * fe);
    let y = 0;
    for (const [v, d] of i) {
      const g = Math.floor((v - this.gpuOriginMs) / this.timeStepMs);
      if (g < 0 || g >= de) continue;
      g >= y && (y = g + 1);
      const w = new Float32Array(fe);
      let m = 0, x = 0;
      for (const [p, C] of d) {
        const u = Math.floor((p - s) / this.nativeBucket);
        if (u >= 0 && u < fe) {
          w[u] += C, u > m && (m = u);
          const E = Math.abs(w[u]);
          E > x && (x = E), E > this.globalMaxQty && (this.globalMaxQty = E);
        }
      }
      if (this.mode === "liquidation" && m > 0) {
        const p = new Float32Array(fe), C = [0.61, 0.14];
        for (let u = 0; u <= m; u++) {
          const E = w[u];
          if (Math.abs(E) < 0.05) continue;
          const P = E < 0 ? -1 : 1;
          for (let I = 1; I <= 2; I++) {
            const U = Math.abs(E) * C[I - 1];
            for (const q of [-1, 1]) {
              const L = u + q * I;
              if (L >= 0 && L < fe) {
                const F = P * U;
                Math.abs(F) > Math.abs(p[L]) && (p[L] = F);
              }
            }
          }
        }
        for (let u = 0; u < fe; u++)
          Math.abs(p[u]) > Math.abs(w[u]) && (w[u] = p[u]);
      }
      for (let p = 0; p < fe; p++) c[p * de + g] = w[p];
      h[g * 4] = s, h[g * 4 + 1] = m + 1, h[g * 4 + 2] = x, h[g * 4 + 3] = 1;
      const M = this.reachTimeline.get(v);
      if (M)
        for (const [p, C] of M) {
          const u = Math.floor((p - s) / this.nativeBucket);
          u >= 0 && u < fe && (b[u * de + g] = Math.max(0, Math.min(1, C)));
        }
      this.columnMeta[g] = { timestamp_ms: v, price_min: s, price_step: this.nativeBucket, num_rows: m + 1, max_value: x, finalized: !0, values: w };
    }
    this.ringCount = y, e.bindTexture(e.TEXTURE_2D, this.dataTex), e.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, de, fe, e.RED, e.FLOAT, c), e.bindTexture(e.TEXTURE_2D, this.metaTex), e.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, de, 1, e.RGBA, e.FLOAT, h), e.bindTexture(e.TEXTURE_2D, this.reachTex), e.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, de, fe, e.RED, e.FLOAT, b), this.gpuDirty = !1;
  }
  render(e, i, o, a, r, l) {
    const s = this.gl, c = this.canvas;
    if (!s || !c || !this.program || (this.gpuDirty && this.syncGpuFromTimeline(), this.ringCount === 0)) return;
    this.viewTimeMin = e, this.viewTimeMax = i, this.viewPriceMin = o, this.viewPriceMax = a;
    const h = window.devicePixelRatio || 1, b = c.clientWidth, y = c.clientHeight;
    b < 10 || y < 10 || (c.width = Math.round(b * h), c.height = Math.round(y * h), s.viewport(0, 0, c.width, c.height), s.clearColor(0.1647, 0.1647, 0.1647, 1), s.clear(s.COLOR_BUFFER_BIT), s.useProgram(this.program), s.bindVertexArray(this.vao), s.activeTexture(s.TEXTURE0), s.bindTexture(s.TEXTURE_2D, this.dataTex), s.uniform1i(this.uniforms.u_data, 0), s.activeTexture(s.TEXTURE1), s.bindTexture(s.TEXTURE_2D, this.metaTex), s.uniform1i(this.uniforms.u_meta, 1), s.activeTexture(s.TEXTURE2), s.bindTexture(s.TEXTURE_2D, this.colormapTex), s.uniform1i(this.uniforms.u_colormap, 2), s.activeTexture(s.TEXTURE3), s.bindTexture(s.TEXTURE_2D, this.colormapWarmTex), s.uniform1i(this.uniforms.u_colormap_warm, 3), s.activeTexture(s.TEXTURE4), s.bindTexture(s.TEXTURE_2D, this.reachTex), s.uniform1i(this.uniforms.u_reach_data, 4), s.uniform2f(this.uniforms.u_plot_origin, r[0] * h, r[1] * h), s.uniform2f(this.uniforms.u_plot_size, l[0] * h, l[1] * h), s.uniform1f(this.uniforms.u_viewport_time_min, e / 1e3), s.uniform1f(this.uniforms.u_viewport_time_max, i / 1e3), s.uniform1f(this.uniforms.u_viewport_price_min, o), s.uniform1f(this.uniforms.u_viewport_price_max, a), s.uniform1f(this.uniforms.u_data_time_start, this.gpuOriginMs / 1e3), s.uniform1f(this.uniforms.u_observation_hold_until, this.observationHoldUntilMs / 1e3), s.uniform1f(this.uniforms.u_time_step, this.timeStepMs / 1e3), s.uniform1i(this.uniforms.u_ring_start, 0), s.uniform1i(this.uniforms.u_ring_count, this.ringCount), s.uniform1i(this.uniforms.u_ring_size, de), s.uniform1i(this.uniforms.u_max_rows, fe), s.uniform1f(this.uniforms.u_bucket_size, this.nativeBucket || 0.01), s.uniform1i(this.uniforms.u_bucket_multiplier, this.bucketMultiplier), s.uniform1f(this.uniforms.u_sensitivity, this.sensitivity), s.uniform1f(this.uniforms.u_max_qty, this.globalMaxQty), s.uniform1f(this.uniforms.u_color_low, this.colorLow), s.uniform1f(this.uniforms.u_color_peak, this.colorPeak), s.uniform1i(this.uniforms.u_mode, this.mode === "liquidation" ? 1 : this.mode === "flow" ? 2 : 0), s.uniform1f(this.uniforms.u_opacity, this.opacity), s.uniform1i(this.uniforms.u_use_reach, this.useReach ? 1 : 0), s.uniform1i(this.uniforms.u_use_warm, 0), s.drawArrays(s.TRIANGLES, 0, 3), s.bindVertexArray(null));
  }
  dispose() {
    const e = this.gl;
    e && (this.dataTex && e.deleteTexture(this.dataTex), this.metaTex && e.deleteTexture(this.metaTex), this.reachTex && e.deleteTexture(this.reachTex), this.colormapTex && e.deleteTexture(this.colormapTex), this.colormapWarmTex && e.deleteTexture(this.colormapWarmTex), this.program && e.deleteProgram(this.program), this.vao && e.deleteVertexArray(this.vao), this.gl = null);
  }
}
const rs = T.lazy(() => Promise.resolve().then(() => Jt).then((t) => ({ default: t.DepthHeatPane }))), Ge = [
  // SECONDS PRO locked
  { label: "1s", ms: 1e3, sec: 1, pro: !0 },
  { label: "5s", ms: 5e3, sec: 5, pro: !0 },
  { label: "15s", ms: 15e3, sec: 15, pro: !0 },
  { label: "30s", ms: 3e4, sec: 30, pro: !0 },
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
], ls = [
  { id: "orderbook", label: "Orderbook" },
  { id: "liquidation", label: "Liquidations" },
  { id: "volume_delta", label: "Volume Delta" },
  { id: "trade_intensity", label: "Trade Intensity" },
  { id: "flow", label: "Flow & Positioning" }
];
function st({ symbol: t, provider: e, onToggleKind: i }) {
  const o = T.useRef(null), a = T.useRef(null), r = T.useRef(null), l = T.useRef(null), s = T.useRef(0), c = T.useRef(null), [h, b] = T.useState(Ge[4]), [y, v] = T.useState(() => {
    try {
      const f = localStorage.getItem("ed_fav_tf");
      return new Set(f ? JSON.parse(f) : ["1m", "5m", "15m", "1h", "4h", "1D"]);
    } catch {
      return /* @__PURE__ */ new Set(["1m", "5m", "15m", "1h", "4h", "1D"]);
    }
  }), [d, g] = T.useState("orderbook"), [w, m] = T.useState("ember"), [x, M] = T.useState("orderbook"), [p, C] = T.useState(1), [u, E] = T.useState(0.95), [P, I] = T.useState(1), [U, q] = T.useState(!1), [L, F] = T.useState(!1), [$, H] = T.useState(!0), [Z, ee] = T.useState("loading"), [Y, Q] = T.useState([0, 0]), [W, le] = T.useState([Date.now() - 36e5, Date.now()]), [k, A] = T.useState(null), [X, Ce] = T.useState(!1), [te, Ee] = T.useState(e || "binance"), [Se, S] = T.useState([]), [R, se] = T.useState({ bid: null, ask: null }), [he, Te] = T.useState(!1), [me, Ae] = T.useState(!0), ke = T.useMemo(() => te === "hyperliquid" ? 15 : te === "binance" ? 20 : te === "coinbase" ? 50 : 33, [te]);
  T.useEffect(() => {
    try {
      localStorage.setItem("ed_fav_tf", JSON.stringify([...y]));
    } catch {
    }
  }, [y]);
  const Ie = T.useCallback((f, O) => {
    O?.preventDefault(), v((K) => {
      const ie = new Set(K);
      if (ie.has(f)) ie.delete(f);
      else {
        if (ie.size >= 6) {
          const ne = ie.values().next().value;
          ne && ie.delete(ne);
        }
        ie.add(f);
      }
      return ie;
    });
  }, []);
  T.useEffect(() => {
    const f = o.current, O = r.current;
    if (!f || !O) return;
    const K = new as();
    if (!K.attach(f)) {
      console.warn("WebGL2 not available, fallback to Canvas2D DepthHeatPane"), Te(!0);
      return;
    }
    K.setColumnInterval(h.ms), K.setMode(d), K.setLiqColormap(w), K.setObColormap(x), K.setSensitivity(p), K.setOpacity(u), K.setBucketMultiplier(P), K.setReachModulation(U), K.setLinearFiltering(L), l.current = K;
    const ne = new ResizeObserver(() => {
    });
    return ne.observe(O), () => {
      ne.disconnect(), K.dispose(), l.current = null;
    };
  }, []), T.useEffect(() => {
    const f = l.current;
    f && (f.setMode(d), f.setLiqColormap(w), f.setObColormap(x), f.setSensitivity(p), f.setOpacity(u), f.setBucketMultiplier(P), f.setReachModulation(U), f.setLinearFiltering(L), f.setColumnInterval(h.ms));
  }, [d, w, x, p, u, P, U, L, h.ms]), T.useEffect(() => {
    if (!me) return;
    const f = setInterval(() => {
      le([Date.now() - 36e5, Date.now()]);
    }, 1e3);
    return () => clearInterval(f);
  }, [me]), T.useEffect(() => {
    let f = !1, O = null;
    const K = l.current;
    if (!K && !he) return;
    const ie = async () => {
      ee("loading history...");
      let ne = 0.5, j = !1;
      try {
        const pe = Date.now(), ve = pe - 4 * 3600 * 1e3;
        let _ = !1;
        try {
          const G = await fetch(`/api/orderflow/heatmap?symbol=${encodeURIComponent(t)}&provider=${encodeURIComponent(te)}&from=${ve / 1e3}&to=${pe / 1e3}&column_ms=${h.ms}&max_levels=80`);
          if (G.ok) {
            const B = await G.json(), N = B.columns || [];
            if (N.length) {
              B.bucket_size && (ne = B.bucket_size);
              for (const D of N) {
                const z = /* @__PURE__ */ new Map(), V = D.qtys || [], oe = D.price_min || 0, ae = D.bucket_size || ne || 0.5;
                for (let _e = 0; _e < V.length; _e++) {
                  const Me = V[_e];
                  if (Math.abs(Me) < 1e-4) continue;
                  const Ne = oe + _e * ae;
                  z.set(Ne, Me);
                }
                z.size && (K?.processSnapshot(D.timestamp_ms, z, ae), j = !0);
              }
              if (B.price_min && B.price_max) {
                const D = (B.price_max - B.price_min) * 0.15;
                Q([B.price_min - D, B.price_max + D]);
              }
              _ = j, ee(`${te.toUpperCase()} ${ke}ms ${d} — heatmap ${N.length} cols live_buffer`);
            }
          }
        } catch {
        }
        if (!_) {
          const G = await fetch(`/api/orderflow/depth?symbol=${encodeURIComponent(t)}&provider=${encodeURIComponent(te)}&from=${ve / 1e3}&to=${pe / 1e3}&column_ms=${h.ms}&max_levels=80`);
          if (G.ok) {
            const B = await G.json();
            if (f) return;
            const N = B.events || [];
            for (const z of N)
              if (z.bids?.length || z.asks?.length) {
                const V = [...z.bids || [], ...z.asks || []];
                if (V.length) {
                  const ae = V.map(([Me]) => Me).sort((Me, Ne) => Me - Ne), _e = ae.slice(1).map((Me, Ne) => Me - ae[Ne]).filter((Me) => Me > 0 && Me < 1e3);
                  _e.length && (ne = Math.min(..._e));
                }
                const oe = /* @__PURE__ */ new Map();
                for (const [ae, _e] of z.bids) oe.set(ae, (oe.get(ae) || 0) + _e);
                for (const [ae, _e] of z.asks) oe.set(ae, (oe.get(ae) || 0) + _e);
                K?.processSnapshot(z.ts * 1e3, oe, ne), j = !0;
              }
            const D = B.trades || [];
            if (S(D.slice(-500)), N.length) {
              let z = 1 / 0, V = -1 / 0;
              for (const oe of N.slice(-30)) {
                for (const [ae] of oe.bids)
                  ae < z && (z = ae), ae > V && (V = ae);
                for (const [ae] of oe.asks)
                  ae < z && (z = ae), ae > V && (V = ae);
              }
              if (isFinite(z) && isFinite(V) && V > z) {
                const oe = (V - z) * 0.15;
                Q([z - oe, V + oe]), j = !0;
              }
            }
          } else {
            const B = await G.json().catch(() => ({}));
            f || ee(`no depth: ${B.detail || G.status} — live only`);
          }
        }
        try {
          const G = await fetch(`/api/orderflow/book?symbol=${encodeURIComponent(t)}&provider=${encodeURIComponent(te)}`);
          if (G.ok) {
            const B = await G.json(), N = B.best_bid ?? null, D = B.best_ask ?? null;
            if (se({ bid: N, ask: D }), N !== null && D !== null) {
              const z = (N + D) / 2, V = D - N, oe = Math.max(V * 10, z * 0.01);
              Q([z - oe, z + oe]), j = !0;
            } else N !== null ? (Q([N * 0.99, N * 1.01]), j = !0) : D !== null && (Q([D * 0.99, D * 1.01]), j = !0);
          }
        } catch {
        }
        f || ee(j ? `${te.toUpperCase()} ${ke}ms ${d} — live` : `${te.toUpperCase()} ${ke}ms — waiting for live book...`);
      } catch (pe) {
        f || ee(`engine unreachable: ${pe}`);
      }
      const re = `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(t)}&provider=${encodeURIComponent(te)}`;
      try {
        O = new WebSocket(re), O.onopen = () => {
          f || ee(`${te.toUpperCase()} ${ke}ms ${d} — WS live`);
        }, O.onmessage = (pe) => {
          if (!f)
            try {
              const ve = JSON.parse(pe.data);
              if (ve.type === "depth") {
                const _ = ve.event, G = /* @__PURE__ */ new Map();
                for (const [D, z] of _.bids) G.set(D, (G.get(D) || 0) + z);
                for (const [D, z] of _.asks) G.set(D, (G.get(D) || 0) + z);
                if (G.size) {
                  const D = Array.from(G.keys()).sort((V, oe) => V - oe), z = D.slice(1).map((V, oe) => V - D[oe]).filter((V) => V > 0 && V < 1e3);
                  z.length && (ne = Math.min(...z));
                }
                K?.updateLiveColumn(_.ts * 1e3, G);
                let B = null, N = null;
                for (const [D] of _.bids) (B === null || D > B) && (B = D);
                for (const [D] of _.asks) (N === null || D < N) && (N = D);
                (B !== null || N !== null) && (se({ bid: B, ask: N }), Q((D) => {
                  if (D[0] !== 0 || D[1] !== 0) return D;
                  if (B !== null && N !== null) {
                    const z = (B + N) / 2, V = Math.max((N - B) * 10, z * 0.01);
                    return [z - V, z + V];
                  }
                  return D;
                }));
              } else ve.type === "trade" && S((_) => [..._.slice(-499), ve.event]);
            } catch {
            }
        }, O.onerror = () => {
          f || ee(`${te.toUpperCase()} WS error — retrying...`);
        }, O.onclose = () => {
          f || ee(`${te.toUpperCase()} WS closed — reconnecting...`), f || setTimeout(() => {
            f || ie();
          }, 2e3);
        };
      } catch (pe) {
        f || ee(`WS failed: ${pe}`);
      }
    };
    return ie(), () => {
      f = !0;
      try {
        O?.close();
      } catch {
      }
    };
  }, [t, te, h.ms, ke, d, he]), T.useEffect(() => {
    const f = o.current, O = a.current, K = r.current, ie = l.current;
    if (!f || !O || !K || !ie) return;
    const ne = () => {
      const j = K.getBoundingClientRect();
      if (j.width < 10 || j.height < 10) {
        s.current = requestAnimationFrame(ne);
        return;
      }
      const be = window.devicePixelRatio || 1;
      O.width = Math.round(j.width * be), O.height = Math.round(j.height * be), O.style.width = `${j.width}px`, O.style.height = `${j.height}px`;
      let re = Y;
      if (re[0] === 0 && re[1] === 0)
        if (R.bid !== null && R.ask !== null) {
          const G = (R.bid + R.ask) / 2, B = Math.max((R.ask - R.bid) * 10, G * 0.01);
          re = [G - B, G + B];
        } else
          re = [6e4, 7e4];
      const pe = [0, 0], ve = [j.width - 58, j.height - 20];
      ie.render(W[0], W[1], re[0], re[1], pe, ve);
      const _ = O.getContext("2d");
      if (_) {
        _.setTransform(be, 0, 0, be, 0, 0), _.clearRect(0, 0, j.width, j.height), _.fillStyle = "#2a2a2a", _.fillRect(j.width - 58, 0, 58, j.height - 20), _.strokeStyle = "#3a3a3a", _.beginPath(), _.moveTo(j.width - 58, 0), _.lineTo(j.width - 58, j.height - 20), _.stroke(), _.fillStyle = "#262626", _.fillRect(0, j.height - 20, j.width, 20), _.strokeStyle = "#3a3a3a", _.beginPath(), _.moveTo(0, j.height - 20), _.lineTo(j.width, j.height - 20), _.stroke();
        const G = re[1] - re[0] || 1e3;
        _.fillStyle = "#e8e8e8", _.font = "10px monospace", _.textAlign = "right";
        for (let N = 0; N <= 4; N++) {
          const D = N / 4 * (j.height - 20), z = re[1] - N / 4 * G;
          _.fillText(z.toFixed(2), j.width - 4, D + 10), _.strokeStyle = "#3a3a3a", _.beginPath(), _.moveTo(0, D), _.lineTo(j.width - 58, D), _.stroke();
        }
        const B = W[1] - W[0];
        _.textAlign = "center", _.fillStyle = "#b9b9b9";
        for (let N = 0; N <= 4; N++) {
          const D = N / 4 * (j.width - 58), z = new Date(W[0] + N / 4 * B);
          _.fillText(z.toLocaleTimeString(), D, j.height - 5);
        }
        if (k && (_.strokeStyle = "#d0d0d0", _.setLineDash([2, 2]), _.beginPath(), _.moveTo(k.x, 0), _.lineTo(k.x, j.height - 20), _.stroke(), _.beginPath(), _.moveTo(0, k.y), _.lineTo(j.width - 58, k.y), _.stroke(), _.setLineDash([]), _.fillStyle = "#e8e8e8", _.fillRect(k.x + 4, k.y - 20, 120, 18), _.fillStyle = "#1c1c1c", _.fillText(`${k.price.toFixed(2)} @ ${new Date(k.time).toLocaleTimeString()}`, k.x + 8, k.y - 8)), $ && Se.length)
          for (const N of Se.slice(-100)) {
            const D = (N.ts * 1e3 - W[0]) / Math.max(B, 1) * (j.width - 58), z = (re[1] - N.price) / Math.max(G, 1) * (j.height - 20);
            if (D < 0 || D > j.width - 58 || z < 0 || z > j.height - 20) continue;
            const V = N.side === "BUY" || N.side === "B";
            _.fillStyle = V ? "#21b3a4" : "#f0426c";
            const oe = Math.min(8, Math.max(2, Math.log10(N.size + 1) * 2));
            _.beginPath(), _.arc(D, z, oe, 0, Math.PI * 2), _.fill();
          }
        if (R.bid !== null) {
          const N = (re[1] - R.bid) / Math.max(G, 1) * (j.height - 20);
          _.strokeStyle = "#21b3a4", _.setLineDash([4, 2]), _.beginPath(), _.moveTo(0, N), _.lineTo(j.width - 58, N), _.stroke(), _.setLineDash([]);
        }
        if (R.ask !== null) {
          const N = (re[1] - R.ask) / Math.max(G, 1) * (j.height - 20);
          _.strokeStyle = "#f0426c", _.setLineDash([4, 2]), _.beginPath(), _.moveTo(0, N), _.lineTo(j.width - 58, N), _.stroke(), _.setLineDash([]);
        }
      }
      s.current = requestAnimationFrame(ne);
    };
    return s.current = requestAnimationFrame(ne), () => cancelAnimationFrame(s.current);
  }, [W, Y, k, Se, $, R]);
  const ue = T.useCallback((f) => {
    f.preventDefault();
    const O = f.currentTarget.getBoundingClientRect(), K = O.width - 58;
    if (O.height - 20, f.shiftKey) {
      const ie = Y[1] - Y[0] || 1e3, ne = f.deltaY > 0 ? 1.1 : 0.9, j = (Y[0] + Y[1]) / 2, be = ie * ne / 2;
      Q([j - be, j + be]);
    } else {
      const ie = W[1] - W[0], ne = f.deltaY > 0 ? 1.1 : 0.9, be = (f.clientX - O.left) / Math.max(K, 1), re = W[0] + be * ie, pe = ie * ne;
      le([re - be * pe, re + (1 - be) * pe]);
    }
  }, [W, Y]), J = T.useCallback((f) => {
    c.current = { x: f.clientX, y: f.clientY, t0: [...W], p0: [...Y] };
  }, [W, Y]), ge = T.useCallback((f) => {
    const O = f.currentTarget.getBoundingClientRect(), K = f.clientX - O.left, ie = f.clientY - O.top, ne = O.width - 58, j = O.height - 20, be = W[1] - W[0], re = Y[1] - Y[0] || 1e3, pe = (Y[0] + Y[1]) / 2 + (j / 2 - ie) / (j / re), ve = W[0] + K / Math.max(ne, 1) * be;
    if (A({ x: K, y: ie, price: pe, time: ve }), c.current && f.buttons & 1) {
      const _ = f.clientX - c.current.x, G = f.clientY - c.current.y, B = _ / Math.max(ne, 1) * be, N = G / Math.max(j, 1) * re;
      le([c.current.t0[0] - B, c.current.t0[1] - B]);
      const D = c.current.p0[0] === 0 && c.current.p0[1] === 0 ? R.bid && R.ask ? [(R.bid + R.ask) / 2 - 500, (R.bid + R.ask) / 2 + 500] : [6e4, 7e4] : c.current.p0;
      Q([D[0] + N, D[1] + N]);
    }
  }, [W, Y, R]), ye = T.useCallback(() => {
    c.current = null;
  }, []), Pe = T.useCallback(() => {
    c.current = null, A(null);
  }, []), Re = T.useCallback(() => {
    if (Ae(!0), le([Date.now() - 36e5, Date.now()]), R.bid !== null && R.ask !== null) {
      const f = (R.bid + R.ask) / 2, O = Math.max((R.ask - R.bid) * 10, f * 0.01);
      Q([f - O, f + O]);
    }
  }, [R]);
  if (he)
    return /* @__PURE__ */ n.jsx(T.Suspense, { fallback: /* @__PURE__ */ n.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-[var(--panel)] text-[var(--dim)] text-[11px]", children: "Loading fallback depth..." }), children: /* @__PURE__ */ n.jsx(rs, { symbol: t, sourceProvider: te, onToggleKind: i }) });
  const $e = Ge.filter((f) => y.has(f.label)), dt = Ge.filter((f) => !y.has(f.label));
  return /* @__PURE__ */ n.jsxs("div", { className: "absolute inset-0 flex flex-col bg-[#1c1c1c] text-[#e8e8e8] select-none", children: [
    /* @__PURE__ */ n.jsxs("div", { className: "flex items-center gap-1 px-2 py-1 border-b border-[#3a3a3a] text-[11px] flex-wrap shrink-0 bg-[#2a2a2a]", children: [
      /* @__PURE__ */ n.jsx("span", { className: "font-bold opacity-80 tracking-wider", children: "EDGEDEPTH HEATMAP" }),
      /* @__PURE__ */ n.jsx("span", { className: "font-mono font-semibold ml-1", children: t }),
      /* @__PURE__ */ n.jsx("span", { className: "text-[9px] px-1.5 py-0.5 rounded bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] truncate max-w-[240px]", children: Z }),
      /* @__PURE__ */ n.jsx("div", { className: "flex items-center gap-0.5 ml-2 border border-[#3a3a3a] rounded overflow-hidden", children: ["binance", "coinbase", "hyperliquid"].map((f) => /* @__PURE__ */ n.jsxs(
        "button",
        {
          onClick: () => Ee(f),
          className: `px-2 py-0.5 text-[10px] font-medium transition-colors ${te === f ? "bg-[#d0d0d0] text-[#1c1c1c]" : "bg-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
          title: `${f} ${f === "hyperliquid" ? "15ms ⚡ ultra-fast" : f === "binance" ? "20ms" : "50ms"}`,
          children: [
            f.toUpperCase(),
            " ",
            f === "hyperliquid" ? "⚡15ms" : f === "binance" ? "20ms" : "50ms"
          ]
        },
        f
      )) }),
      /* @__PURE__ */ n.jsxs("div", { className: "flex items-center gap-0.5 ml-2 border border-[#3a3a3a] rounded overflow-hidden", children: [
        $e.map((f) => /* @__PURE__ */ n.jsxs(
          "button",
          {
            onClick: () => b(f),
            onContextMenu: (O) => {
              O.preventDefault(), Ie(f.label, O);
            },
            className: `px-1.5 py-0.5 text-[10px] ${h.label === f.label ? "bg-[#414141] text-[#e8e8e8]" : "bg-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"} ${f.pro ? "border-l border-[#f0426c]/30" : ""}`,
            title: f.pro ? "SECONDS PRO — locked" : `Right-click to unpin (fav ${$e.length}/6)`,
            children: [
              f.label,
              f.pro ? " PRO" : ""
            ]
          },
          f.label
        )),
        /* @__PURE__ */ n.jsxs("span", { className: "text-[8px] px-1 text-[#b9b9b9] border-l border-[#3a3a3a]", children: [
          "FAV ",
          $e.length,
          "/6"
        ] })
      ] }),
      /* @__PURE__ */ n.jsx("div", { className: "flex items-center gap-0.5 ml-1 border border-[#3a3a3a] rounded overflow-hidden", children: dt.slice(0, 8).map((f) => /* @__PURE__ */ n.jsx(
        "button",
        {
          onClick: () => b(f),
          onContextMenu: (O) => {
            O.preventDefault(), Ie(f.label, O);
          },
          className: `px-1.5 py-0.5 text-[10px] opacity-60 hover:opacity-100 hover:bg-[#343434] ${f.pro ? "text-[#f0426c]" : "text-[#b9b9b9]"}`,
          title: f.pro ? "PRO — right-click to pin" : "Click sets, right-click pins max 6",
          children: f.label
        },
        f.label
      )) }),
      /* @__PURE__ */ n.jsx("select", { value: d, onChange: (f) => g(f.target.value), className: "ml-1 bg-[#262626] border border-[#3a3a3a] rounded px-1 py-0.5 text-[10px] text-[#e8e8e8]", children: ls.map((f) => /* @__PURE__ */ n.jsx("option", { value: f.id, children: f.label }, f.id)) }),
      /* @__PURE__ */ n.jsxs("div", { className: "ml-auto flex items-center gap-1", children: [
        /* @__PURE__ */ n.jsx("button", { onClick: () => Ae((f) => !f), className: `px-1.5 py-0.5 rounded border text-[10px] ${me ? "bg-[#d0d0d0] text-[#1c1c1c] border-[#d0d0d0]" : "border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434]"}`, children: me ? "FOLLOW" : "FREE" }),
        /* @__PURE__ */ n.jsx("button", { onClick: () => H((f) => !f), className: `px-1.5 py-0.5 rounded border text-[10px] ${$ ? "bg-[#343434] border-[#d0d0d0]/50 text-[#e8e8e8]" : "border-[#3a3a3a] text-[#b9b9b9]"}`, children: "Bubbles" }),
        /* @__PURE__ */ n.jsx("button", { onClick: () => Te(!0), className: "px-1.5 py-0.5 rounded border border-[#3a3a3a] text-[10px] text-[#b9b9b9] hover:bg-[#343434]", title: "Switch to legacy Canvas2D renderer", children: "Legacy" }),
        /* @__PURE__ */ n.jsx("button", { onClick: () => Ce((f) => !f), className: "px-2 py-0.5 rounded border border-[#3a3a3a] text-[10px] hover:bg-[#343434] text-[#e8e8e8]", children: "⚙" }),
        i && /* @__PURE__ */ n.jsx("button", { onClick: i, className: "px-2 py-0.5 rounded border border-[#3a3a3a] text-[10px] hover:bg-[#343434] text-[#b9b9b9]", children: "chart ⇄" })
      ] })
    ] }),
    /* @__PURE__ */ n.jsxs("div", { ref: r, className: "relative flex-1 min-h-0 w-full h-full bg-[#2a2a2a]", onWheel: ue, onMouseDown: J, onMouseMove: ge, onMouseUp: ye, onMouseLeave: Pe, onDoubleClick: Re, children: [
      /* @__PURE__ */ n.jsx("canvas", { ref: o, className: "absolute inset-0 w-full h-full block", style: { width: "100%", height: "100%" } }),
      /* @__PURE__ */ n.jsx("canvas", { ref: a, className: "absolute inset-0 w-full h-full block pointer-events-none", style: { width: "100%", height: "100%" } }),
      Y[0] === 0 && Y[1] === 0 && !R.bid && /* @__PURE__ */ n.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none", children: [
        /* @__PURE__ */ n.jsxs("div", { className: "text-[12px] font-mono text-[#e8e8e8] opacity-70", children: [
          "Waiting for ",
          t,
          " depth — ",
          Z
        ] }),
        /* @__PURE__ */ n.jsxs("div", { className: "text-[10px] text-[#b9b9b9] opacity-50 mt-1", children: [
          "Provider: ",
          te,
          " • TF: ",
          h.label,
          " • Flush: ",
          ke,
          "ms"
        ] }),
        /* @__PURE__ */ n.jsx("div", { className: "text-[10px] text-[#b9b9b9] opacity-40 mt-2", children: "If live_only, WS will fill after 1-2s. Click Legacy if WebGL2 fails." })
      ] })
    ] }),
    X && /* @__PURE__ */ n.jsxs("div", { className: "absolute top-10 right-2 z-20 w-[340px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl p-3 text-[11px] space-y-3 max-h-[80vh] overflow-auto", children: [
      /* @__PURE__ */ n.jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ n.jsx("span", { className: "font-bold tracking-wider text-[10px] text-[#b9b9b9]", children: "HEATMAP TWEAKS — ADVANCED" }),
        /* @__PURE__ */ n.jsx("button", { onClick: () => Ce(!1), className: "text-[14px] text-[#b9b9b9] hover:text-[#e8e8e8]", children: "×" })
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ n.jsx("div", { className: "text-[10px] text-[#b9b9b9] uppercase", children: "Colormap — data colors exact EdgeDepth, chrome zinc" }),
        d === "liquidation" ? /* @__PURE__ */ n.jsx("div", { className: "flex gap-1", children: ["inferno", "ember", "viridis", "magma"].map((f) => /* @__PURE__ */ n.jsx("button", { onClick: () => m(f), className: `flex-1 py-1 rounded border text-[10px] capitalize ${w === f ? "bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]" : "border-[#3a3a3a] bg-[#2a2a2a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`, children: f }, f)) }) : /* @__PURE__ */ n.jsx("div", { className: "flex gap-1", children: ["orderbook", "deepdom", "bookmap", "realtime", "realtime_warm"].map((f) => /* @__PURE__ */ n.jsx("button", { onClick: () => M(f), className: `flex-1 py-1 rounded border text-[10px] capitalize ${x === f ? "bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]" : "border-[#3a3a3a] bg-[#2a2a2a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`, children: f }, f)) })
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ n.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ n.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Sensitivity ",
            p.toFixed(2)
          ] }),
          /* @__PURE__ */ n.jsx("input", { type: "range", min: 0.1, max: 3, step: 0.1, value: p, onChange: (f) => C(parseFloat(f.target.value)), className: "accent-[#d0d0d0]" })
        ] }),
        /* @__PURE__ */ n.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ n.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Opacity ",
            Math.round(u * 100),
            "%"
          ] }),
          /* @__PURE__ */ n.jsx("input", { type: "range", min: 0.1, max: 1, step: 0.05, value: u, onChange: (f) => E(parseFloat(f.target.value)), className: "accent-[#d0d0d0]" })
        ] })
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ n.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ n.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Bucket ×",
            P
          ] }),
          /* @__PURE__ */ n.jsx("input", { type: "range", min: 1, max: 8, step: 1, value: P, onChange: (f) => I(parseInt(f.target.value)), className: "accent-[#d0d0d0]" })
        ] }),
        /* @__PURE__ */ n.jsxs("label", { className: "flex items-center gap-2 mt-4", children: [
          /* @__PURE__ */ n.jsx("input", { type: "checkbox", checked: L, onChange: (f) => F(f.target.checked) }),
          /* @__PURE__ */ n.jsx("span", { className: "text-[10px] text-[#e8e8e8]", children: "Linear filter (smooth cloud)" })
        ] })
      ] }),
      d === "liquidation" && /* @__PURE__ */ n.jsxs("label", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ n.jsx("input", { type: "checkbox", checked: U, onChange: (f) => q(f.target.checked) }),
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
const hs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EdgeDepthHeatmapPane: st,
  default: st
}, Symbol.toStringTag, { value: "Module" }));
export {
  Kt as D,
  hs as E,
  Jt as a
};
