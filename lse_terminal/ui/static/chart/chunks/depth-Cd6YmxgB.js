import { r as T, j as n, g as _t } from "./react-vendor-C0yw3i6b.js";
const ot = ["deepdom", "bookmap", "heat", "greyscale"], yt = [
  [0, [6, 2, 5]],
  [0.3, [58, 10, 16]],
  [0.55, [126, 26, 16]],
  [0.75, [206, 64, 12]],
  [0.9, [255, 140, 0]],
  [1, [255, 214, 96]]
], Mt = [
  [0, [2, 5, 11]],
  [0.3, [6, 24, 50]],
  [0.55, [10, 48, 94]],
  [0.75, [13, 92, 112]],
  [0.9, [26, 190, 92]],
  [1, [126, 255, 152]]
], wt = [
  [0, [0, 0, 0]],
  [0.35, [8, 34, 61]],
  [0.6, [14, 107, 168]],
  [0.8, [110, 185, 228]],
  [0.9, [226, 244, 255]],
  [0.95, [255, 202, 62]],
  [1, [255, 92, 40]]
], Ye = [
  [0, [0, 0, 0]],
  [0.25, [0, 0, 255]],
  [0.55, [255, 255, 0]],
  [0.78, [255, 140, 0]],
  [1, [255, 0, 0]]
];
function Je(t, e) {
  switch (t) {
    case "deepdom":
      return e === "ask" ? yt : Mt;
    case "bookmap":
      return wt;
    case "heat":
      return Ye;
    case "greyscale":
      return Ye;
  }
}
function St(t, e) {
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
    const p = c / 255;
    let v, y, d;
    t === null ? v = y = d = p * 255 : [v, y, d] = St(t, p);
    const x = (v + y + d) / 3;
    return v = x + (v - x) * e.intensity, y = x + (y - x) * e.intensity, d = x + (d - x) * e.intensity, v *= a, y *= a, d *= a, v = (v / 255 - 0.5) * r * 255 + 127.5 + l, y = (y / 255 - 0.5) * r * 255 + 127.5 + l, d = (d / 255 - 0.5) * r * 255 + 127.5 + l, [
      Math.min(255, Math.max(0, v)),
      Math.min(255, Math.max(0, y)),
      Math.min(255, Math.max(0, d))
    ];
  };
  for (let c = 0; c < 256; c++) {
    const p = i > 1 ? Math.min(Math.floor(c / i) * i + Math.floor(i / 2), 255) : c, [v, y, d] = h(p);
    o[c * 4] = v, o[c * 4 + 1] = y, o[c * 4 + 2] = d, o[c * 4 + 3] = 255;
  }
  return o;
}
function $e(t, e) {
  const s = e !== void 0 ? e : t.smoothing, o = ot.includes(t.scheme) ? t.scheme : "heat";
  if (o === "greyscale") {
    const l = He(null, t, s);
    return { ask: l, bid: l };
  }
  const a = He(Je(o, "ask"), t, s), r = o === "deepdom" ? He(Je(o, "bid"), t, s) : a;
  return { ask: a, bid: r };
}
function kt(t) {
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
}, rt = "lset-depth-global-scheme", lt = "lset-depth-global-apply", Ie = "lse-depth-global-scheme";
function Et() {
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
function Rt(t, e, s, o) {
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
function Ct(t, e, s, o = 1) {
  s <= e && (s = e + Math.max(Math.abs(e) * 1e-6, 1e-9));
  const a = Math.min(1, Math.max(0, (t - e) / (s - e)));
  return Math.round(Math.pow(a, o) * 255);
}
const Le = "9px ui-monospace, Menlo, Consolas, monospace";
function jt(t, e = 7) {
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
  const { fieldW: s, cssW: o, cssH: a, centre: r, ppu: l, pLo: i, pHi: h } = e, c = (d) => a / 2 - (d - r) * l;
  t.fillStyle = "#0c0f14", t.fillRect(s, 0, o - s, a), t.strokeStyle = "#232a35", t.beginPath(), t.moveTo(s + 0.5, 0), t.lineTo(s + 0.5, a), t.stroke();
  const p = jt(h - i), v = Math.ceil(i / p) * p;
  t.font = Le, t.textAlign = "right", t.save(), t.setLineDash([1, 3]);
  for (let d = v; d <= h; d += p) {
    const x = Math.round(c(d)) + 0.5;
    x < 8 || x > a - 4 || (t.strokeStyle = "rgba(255, 255, 255, 0.05)", t.beginPath(), t.moveTo(0, x), t.lineTo(s, x), t.stroke(), t.strokeStyle = "#3a4453", t.beginPath(), t.moveTo(s, x), t.lineTo(s + 4, x), t.stroke(), e.fused || (t.fillStyle = "#8b96a5", t.fillText(We(d, p), o - 5, x + 3)));
  }
  t.restore();
  const y = (d, x, S) => {
    const f = c(d);
    f < 8 || f > a - 8 || (t.fillStyle = x, t.fillRect(s + 2, f - 8, o - s - 4, 16), t.fillStyle = S, t.font = `600 ${Le}`, t.fillText(We(d, p), o - 5, f + 3), t.font = Le);
  };
  if (e.bookAsk !== null && y(e.bookAsk, "rgba(239, 83, 80, 0.92)", "#2b0b0a"), e.bookBid !== null && y(e.bookBid, "rgba(38, 166, 154, 0.92)", "#06201c"), e.lastPrice !== null) {
    const d = c(e.lastPrice);
    d >= 0 && d <= a && (t.save(), t.strokeStyle = e.lastBuy ? "rgba(38, 166, 154, 0.65)" : "rgba(239, 83, 80, 0.65)", t.setLineDash([5, 4]), t.beginPath(), t.moveTo(0, Math.round(d) + 0.5), t.lineTo(s, Math.round(d) + 0.5), t.stroke(), t.restore(), d >= 8 && d <= a - 8 && (t.fillStyle = e.lastBuy ? "#26a69a" : "#ef5350", t.fillRect(s + 2, d - 8, o - s - 4, 16), t.fillStyle = "#08131a", t.font = `700 ${Le}`, t.fillText(We(e.lastPrice, p), o - 5, d + 3), t.font = Le));
  }
  t.textAlign = "left";
}
const Nt = "9px ui-monospace, Menlo, Consolas, monospace", ct = "#26a69a", ht = "#ef5350";
function Be(t) {
  return t >= 1e4 ? `${(t / 1e3).toFixed(0)}k` : t >= 1e3 ? `${(t / 1e3).toFixed(1)}k` : t >= 100 || t >= 10 ? t.toFixed(0) : t.toFixed(1);
}
function Dt(t, e, s, o, a, r, l, i) {
  const h = (c, p) => {
    t.strokeStyle = p, t.lineWidth = 1, t.beginPath();
    let v = null, y = 0;
    for (let d = s; d < o; d++) {
      const x = c(e[d]), S = a(e[d].tsMs), f = d + 1 < o ? a(e[d + 1].tsMs) : S + 1;
      if (x === null || x < l || x > i) {
        v = null;
        continue;
      }
      const g = Math.round(r(x)) + 0.5;
      v !== null ? (t.moveTo(y, v), t.lineTo(S, v), t.lineTo(S, g)) : t.moveTo(S, g), t.lineTo(f, g), v = g, y = f;
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
    const p = Math.max(4, h.cssH / 80), v = Math.max(5, 1400 / Math.max(0.5, (o - s) / Math.max(1, h.fieldW))), y = /* @__PURE__ */ new Map();
    for (const d of e) {
      if (d.tsMs < s || d.tsMs > o || d.price < a || d.price > r) continue;
      const x = l(d.tsMs), S = i(d.price), f = `${Math.round(x / v)}:${Math.round(S / p)}`;
      let g = y.get(f);
      g || (g = { x: 0, y: 0, n: 0, size: 0, buy: 0, sell: 0 }, y.set(f, g)), g.x += x, g.y += S, g.n += 1, g.size += d.size, d.buy ? g.buy += d.size : g.sell += d.size;
    }
    for (const d of y.values()) c.push({ ...d, x: d.x / d.n, y: d.y / d.n });
  } else
    for (const p of e)
      p.tsMs < s || p.tsMs > o || p.price < a || p.price > r || c.push({
        x: l(p.tsMs),
        y: i(p.price),
        n: 1,
        size: p.size,
        buy: p.buy ? p.size : 0,
        sell: p.buy ? 0 : p.size
      });
  for (const p of c) {
    const v = Math.min(16, Math.max(2.5, Math.sqrt(p.size) * 0.9 * h.scale)), y = p.buy + p.sell, d = y > 0 ? p.buy / y : 0.5, x = -Math.PI / 2;
    if (t.beginPath(), t.moveTo(p.x, p.y), t.arc(p.x, p.y, v, x, x + d * Math.PI * 2), t.closePath(), t.fillStyle = ct, t.fill(), d < 1 && (t.beginPath(), t.moveTo(p.x, p.y), t.arc(p.x, p.y, v, x + d * Math.PI * 2, x + Math.PI * 2), t.closePath(), t.fillStyle = ht, t.fill()), h.mode !== "solid") {
      const S = t.createRadialGradient(
        p.x - v * 0.35,
        p.y - v * 0.42,
        v * 0.1,
        p.x,
        p.y,
        v
      );
      S.addColorStop(0, "rgba(255, 255, 255, 0.5)"), S.addColorStop(0.45, "rgba(255, 255, 255, 0.08)"), S.addColorStop(0.85, "rgba(0, 0, 0, 0.18)"), S.addColorStop(1, "rgba(0, 0, 0, 0.5)"), t.beginPath(), t.arc(p.x, p.y, v, 0, Math.PI * 2), t.fillStyle = S, t.fill();
    }
    if (t.lineWidth = 1, t.strokeStyle = "rgba(0, 0, 0, 0.55)", t.beginPath(), t.arc(p.x, p.y, v, 0, Math.PI * 2), t.stroke(), h.bigK > 0 && h.bigMedian > 0 && p.size >= h.bigK * h.bigMedian) {
      const S = p.buy >= p.sell;
      t.beginPath(), t.arc(p.x, p.y, v + 3, 0, Math.PI * 2), t.lineWidth = 1.5, t.strokeStyle = S ? "rgba(38, 166, 154, 0.95)" : "rgba(239, 83, 80, 0.95)", t.stroke();
      const f = `${S ? "+" : "−"}${Be(p.size)}`;
      t.font = `700 ${Nt}`;
      const g = t.measureText(f).width + 8;
      let M = p.x + v + 6;
      M + g > h.fieldW - 2 && (M = p.x - v - 6 - g);
      const b = Math.min(h.cssH - 16, Math.max(2, p.y - 8));
      t.fillStyle = S ? "rgba(38, 166, 154, 0.92)" : "rgba(239, 83, 80, 0.92)", t.fillRect(M, b, g, 14), t.fillStyle = "#08131a", t.fillText(f, M + 4, b + 10);
    }
  }
  t.restore();
}
function Lt(t, e, s, o, a, r, l, i, h, c) {
  const v = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 36e5].find((x) => x / h >= 18) ?? 36e5, y = /* @__PURE__ */ new Map();
  for (const x of e) {
    if (x.tsMs < s || x.tsMs > o || x.price < a || x.price > r) continue;
    const S = Math.floor(x.tsMs / v);
    let f = y.get(S);
    f || (f = { o: x.price, h: x.price, l: x.price, c: x.price }, y.set(S, f)), f.h = Math.max(f.h, x.price), f.l = Math.min(f.l, x.price), f.c = x.price;
  }
  const d = Math.min(9, Math.max(2, v / h * 0.6));
  t.save(), t.globalAlpha = 0.92;
  for (const [x, S] of y) {
    const f = l(x * v + v / 2);
    if (f < -d || f > c + d) continue;
    const M = S.c >= S.o ? ct : ht;
    t.strokeStyle = M, t.fillStyle = M, t.lineWidth = 1, t.beginPath(), t.moveTo(Math.round(f) + 0.5, i(S.h)), t.lineTo(Math.round(f) + 0.5, i(S.l)), t.stroke();
    const b = i(S.o), E = i(S.c), u = Math.min(b, E);
    t.fillRect(f - d / 2, u, d, Math.max(1, Math.abs(b - E)));
  }
  t.restore();
}
const Ut = 78, Ft = 16, dt = "9px ui-monospace, Menlo, Consolas, monospace";
function It(t, e, s, o, a, r, l, i, h) {
  t.fillStyle = "#0a0d12", t.fillRect(0, l, h, i - l), t.strokeStyle = "#232a35", t.beginPath(), t.moveTo(0, Math.round(l) + 0.5), t.lineTo(h, Math.round(l) + 0.5), t.stroke();
  const c = i - Ft - 2, p = c - l - 14;
  if (p < 8) return;
  const y = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 36e5].find((u) => u / r >= 5) ?? 36e5, d = /* @__PURE__ */ new Map();
  let x = 0;
  for (const u of e) {
    if (u.tsMs < s || u.tsMs > o) continue;
    const k = Math.floor(u.tsMs / y);
    let N = d.get(k);
    N || (N = { b: 0, s: 0 }, d.set(k, N)), u.buy ? N.b += u.size : N.s += u.size, x = Math.max(x, N.b, N.s);
  }
  const S = [...d.keys()].sort((u, k) => u - k);
  let f = 0, g = 0, M = 0;
  const b = [];
  for (const u of S) {
    const k = d.get(u);
    f += k.b - k.s, b.push([u, f]), g = Math.min(g, f), M = Math.max(M, f);
  }
  t.font = "600 8px ui-monospace, Menlo, monospace";
  const E = Math.floor(s / y) * y;
  for (let u = E; u <= o; u += y) {
    const k = a(u), N = a(u + y);
    if (N < -4 || k > h + 4) continue;
    const I = N - k, F = d.get(Math.floor(u / y));
    if (!F) continue;
    const q = Math.max(1, I * 0.36), L = k + I / 2, U = x > 0 ? F.s / x * p : 0, H = x > 0 ? F.b / x * p : 0;
    t.fillStyle = "rgba(239, 83, 80, 0.85)", t.fillRect(L - q - 0.5, c - U, q, U), t.fillStyle = "rgba(100, 165, 240, 0.85)", t.fillRect(L + 0.5, c - H, q, H), I >= 26 && (t.textAlign = "center", t.fillStyle = "rgba(255, 150, 147, 0.9)", t.fillText(Be(F.s), L - q / 2, c - U - 3), t.fillStyle = "rgba(147, 197, 253, 0.9)", t.fillText(Be(F.b), L + q / 2 + 1, c - H - 3));
  }
  if (b.length > 1 && M > g && (t.strokeStyle = "rgba(226, 238, 255, 0.6)", t.lineWidth = 1, t.beginPath(), b.forEach(([u, k], N) => {
    const I = a(u * y + y / 2), F = c - 2 - (k - g) / (M - g) * (p - 4);
    N === 0 ? t.moveTo(I, F) : t.lineTo(I, F);
  }), t.stroke()), f !== 0) {
    const u = `CVD ${f > 0 ? "+" : "−"}${Be(Math.abs(f))}`;
    t.font = `700 ${dt}`;
    const k = t.measureText(u).width + 8;
    t.fillStyle = "rgba(10, 13, 18, 0.85)", t.fillRect(h - k - 4, l + 3, k, 13), t.fillStyle = f > 0 ? "#26a69a" : "#ef5350", t.fillText(u, h - k, l + 13);
  }
  t.textAlign = "left";
}
function zt(t, e, s, o) {
  let a = 0, r = 0;
  for (const x of e)
    x.tsMs < s || x.tsMs > o || (x.buy ? a += x.size : r += x.size);
  const l = a + r, i = l > 0 ? (a - r) / l : 0, h = l > 0 ? (a - r) / l : 0, c = 178, p = 44, v = 8, y = 8;
  t.save(), t.fillStyle = "rgba(10, 13, 18, 0.78)", t.fillRect(v, y, c, p), t.strokeStyle = "#232a35", t.strokeRect(v + 0.5, y + 0.5, c - 1, p - 1);
  const d = (x, S, f, g) => {
    t.font = `700 ${dt}`, t.fillStyle = "#8b96a5", t.fillText(x, v + 8, g + 7);
    const M = v + 40, b = 92, E = 6;
    t.fillStyle = "rgba(239, 83, 80, 0.55)", t.fillRect(M, g, b / 2, E), t.fillStyle = "rgba(38, 166, 154, 0.55)", t.fillRect(M + b / 2, g, b / 2, E);
    const u = M + b / 2 + (f ? S * (b / 2 - 2) : 0);
    t.fillStyle = f ? "#eef1f6" : "#5c6672", t.fillRect(u - 1, g - 2, 2, E + 4), t.textAlign = "right", t.fillStyle = f ? S >= 0 ? "#26a69a" : "#ef5350" : "#5c6672", t.fillText(f ? `${S >= 0 ? "+" : "−"}${Math.abs(Math.round(S * 100))}%` : "—", v + c - 8, g + 7), t.textAlign = "left";
  };
  d("IMB", i, l > 0, y + 8), d("CVD", h, l > 0, y + 26), t.restore();
}
function Ot(t) {
  return t >= 1e3 ? `${(t / 1e3).toFixed(1)}k` : t >= 100 ? t.toFixed(0) : t >= 1 ? t.toFixed(1) : t.toPrecision(2);
}
function $t(t) {
  return t >= 1e3 ? t.toFixed(1) : t >= 1 ? t.toFixed(2) : Bt(t);
}
function Bt(t) {
  return t.toPrecision(4);
}
function Xt(t, e, s, o) {
  const { bids: a, asks: r } = s.sorted();
  if (!a.length && !r.length) return;
  const l = (M) => e.fH / 2 - (M - e.centre) * e.ppu, i = o.activeRange > 0, h = [...a, ...r].filter(([M]) => M >= e.lo && M <= e.hi).map(([M]) => M).sort((M, b) => M - b);
  let c = 8;
  if (h.length >= 2) {
    const M = [];
    for (let b = 1; b < h.length; b++)
      M.push(h[b] - h[b - 1]);
    M.sort((b, E) => b - E), c = Math.min(20, Math.max(2.5, e.ppu * M[M.length >> 1]));
  }
  let p = 0;
  for (const [M, b] of [...a, ...r])
    M >= e.lo && M <= e.hi && (p = Math.max(p, b));
  const v = e.fieldW + 5, y = e.fieldW + 46, d = 22, x = e.cssW - 4, S = (M, b, E, u, k) => {
    const N = l(M);
    if (N < -c || N > e.fH + c) return;
    const I = N - c / 2, F = p > 0 ? Math.max(1.5, b / p * d) : 1.5;
    t.fillStyle = E === "bid" ? u ? "rgba(38,166,154,0.18)" : "rgba(38, 166, 154, 0.68)" : u ? "rgba(239,83,80,0.18)" : "rgba(239, 83, 80, 0.68)", t.fillRect(y, I, F, Math.max(1, c - 1)), t.font = k ? "700 9px ui-monospace, Menlo, monospace" : "9px ui-monospace, Menlo, monospace", t.textAlign = "left", t.fillStyle = u ? "#4a5260" : k ? E === "bid" ? "#26a69a" : "#ef5350" : "#8b96a5", t.fillText($t(M), v, N + 3), t.textAlign = "right", t.fillStyle = u ? "#4a5260" : E === "bid" ? "#9fd6cd" : "#f4b3ae", t.fillText(Ot(b), x, N + 3);
  }, f = a.length ? a[0][0] : null, g = r.length ? r[0][0] : null;
  if (a.forEach(([M, b], E) => {
    S(M, b, "bid", i && E >= o.activeRange, M === f);
  }), r.forEach(([M, b], E) => {
    S(M, b, "ask", i && E >= o.activeRange, M === g);
  }), i) {
    t.strokeStyle = "rgba(255, 179, 0, 0.75)", t.setLineDash([3, 3]);
    const M = [];
    a.length && o.activeRange <= a.length && M.push(l(a[o.activeRange - 1][0]) + c / 2 + 1), r.length && o.activeRange <= r.length && M.push(l(r[o.activeRange - 1][0]) - c / 2 - 1);
    for (const b of M)
      b < 0 || b > e.fH || (t.beginPath(), t.moveTo(e.fieldW, b), t.lineTo(e.cssW, b), t.stroke());
    t.setLineDash([]);
  }
  t.textAlign = "left";
}
const Ze = 14400, Ht = 220, Wt = 58, Gt = 96, qt = 228;
class Vt {
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
    this.settings = e, this.luts = $e(e), this.off = document.createElement("canvas"), this.offCtx = this.off.getContext("2d"), this.glow = document.createElement("canvas"), this.glowCtx = this.glow.getContext("2d");
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
    const e = this.settings.ladderMode === "fused" ? Gt : Wt;
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
    return this.settings.subpanes ? Ut : 0;
  }
  /** The field's drawable height (full canvas minus the context stack). */
  fieldH() {
    return Math.max(40, this.cssH - this.subH());
  }
  setSettings(e) {
    this.settings = e, this.luts = $e(e, this.effSmoothing()), this.dirty = !0;
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
      this.pxPerUnit = (this.pxPerUnit ?? this.autoPxPerUnit()) * a, this.settings.smoothingMode === "auto" && (this.luts = $e(this.settings, this.effSmoothing()));
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
    [this.lo, this.hi] = Rt(
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
      const b = this.recenterTarget - this.priceCenter, E = Math.max(
        1e-9,
        this.fieldH() / 2 / (this.pxPerUnit ?? 1) / 240
      );
      Math.abs(b) <= E ? (this.priceCenter = this.recenterTarget, this.recenterTarget = null) : (this.priceCenter += b * 0.14, this.dirty = !0);
    }
    const [s, o] = this.visiblePriceRange(), a = this.fieldH(), r = this.pxPerUnit ?? a / Math.max(o - s, 1e-9);
    this.basePpu === null && (this.basePpu = r);
    const l = this.priceCenter ?? (s + o) / 2, i = (b) => a / 2 - (b - l) * r;
    this.viewLo = s, this.viewHi = o, this.viewCentre = l, this.viewPpu = r, this.viewH = a, this.viewVersion += 1;
    const h = this.fieldW(), c = this.settings.subpanes, p = this.xToTs(0), v = this.xToTs(h);
    let y = this.lowerBound(p), d = this.lowerBound(v);
    d = Math.min(d, this.cols.length), this.follow && this.rightOffsetPx <= 0 && (this.rightOffsetPx = 0);
    const x = c ? this.cssH - 14 : a;
    this.settings.view === "footprint" ? (this.paintFootprint(e, p, v, s, o, i, a), Qe(
      e,
      h,
      x,
      (b) => this.tsToX(b),
      p,
      v,
      this.niceTimeStep(h * this.msPerPx)
    )) : this.paintHeatField(e, y, d, p, v, s, o, i, h, a, x), c && (It(
      e,
      this.dots,
      p,
      v,
      (b) => this.tsToX(b),
      this.msPerPx,
      a,
      this.cssH,
      h
    ), this.settings.view === "heat" && zt(e, this.dots, p, v));
    const S = (b, E) => {
      if (b === null || b < s || b > o) return;
      const u = i(b);
      e.strokeStyle = E, e.setLineDash([4, 3]), e.beginPath(), e.moveTo(0, u), e.lineTo(h, u), e.stroke(), e.setLineDash([]);
    };
    if (S(this.bookBid, "rgba(38, 166, 154, 0.55)"), S(this.bookAsk, "rgba(239, 83, 80, 0.55)"), this.syncedCrosshair !== null) {
      const b = this.tsToX(this.syncedCrosshair);
      b >= 0 && b <= h && (e.strokeStyle = "rgba(150, 160, 175, 0.55)", e.setLineDash([3, 3]), e.beginPath(), e.moveTo(b, 0), e.lineTo(b, a), e.stroke(), e.setLineDash([]));
    }
    if (this.hover) {
      const { x: b, y: E } = this.hover;
      b <= h && E <= a && (e.strokeStyle = "rgba(150, 160, 175, 0.45)", e.setLineDash([3, 3]), e.beginPath(), e.moveTo(b, 0), e.lineTo(b, a), e.moveTo(0, E), e.lineTo(h, E), e.stroke(), e.setLineDash([]));
      const u = l + (a / 2 - E) / r;
      e.fillStyle = "rgba(30, 34, 41, 0.95)", e.fillRect(h - 74, E - 9, 72, 18), e.fillStyle = "#d1d4dc", e.font = "10px monospace", e.textAlign = "right", e.fillText(u.toPrecision(6), h - 6, E + 3);
      const N = new Date(this.xToTs(b)).toISOString().slice(11, 19);
      e.fillRect(Math.min(b, h - 30) - 28, this.cssH - 16, 56, 15), e.textAlign = "center", e.fillText(N, Math.min(b, h - 30), this.cssH - 5);
    }
    e.fillStyle = "rgba(150,160,175,0.7)", e.font = "9px monospace", e.textAlign = "left";
    const f = this.niceTimeStep(h * this.msPerPx), g = Math.ceil(p / f) * f;
    for (let b = g; b <= v; b += f) {
      const E = this.tsToX(b);
      if (E > h - 52) continue;
      const u = new Date(b);
      e.fillText(u.toISOString().slice(11, 19), E + 2, this.cssH - 4), e.fillRect(E, this.cssH - 14, 1, 4);
    }
    const M = this.settings.ladderMode === "fused";
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
      fused: M
    }), M && this.bookSource && Xt(e, {
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
  paintHeatField(e, s, o, a, r, l, i, h, c, p, v) {
    const y = this.settings, d = Math.max(1, o - s), x = Ht, S = (i - l) / x;
    (this.off.width !== d || this.off.height !== x) && (this.off.width = d, this.off.height = x, this.glow.width = d, this.glow.height = x);
    const f = Math.min(1, Math.max(0.25, y.gamma || 1)), g = new Uint8ClampedArray(d * x), M = new Uint8Array(d * x).fill(255);
    for (let L = 0; L < d; L++) {
      const U = this.cols[s + L], { keys: H, sizes: z, sides: J } = U;
      for (let ce = 0; ce < H.length; ce++) {
        const ge = H[ce];
        if (ge < l || ge > i) continue;
        const ae = z[ce];
        if (ae <= 0) continue;
        const ne = Math.min(x - 1, Math.max(0, Math.floor((i - ge) / S))) * d + L, C = Ct(ae, this.lo, this.hi, f);
        C > g[ne] && (g[ne] = C, M[ne] = J[ce]);
      }
    }
    const b = this.offCtx.createImageData(d, x), E = this.glowCtx.createImageData(d, x), u = b.data, k = E.data;
    for (let L = 0; L < g.length; L++) {
      const U = M[L];
      if (U === 255) continue;
      const H = U === 1 ? this.luts.ask : this.luts.bid, z = g[L] * 4, J = L * 4;
      u[J] = H[z], u[J + 1] = H[z + 1], u[J + 2] = H[z + 2], u[J + 3] = 255, g[L] >= qt && (k[J] = H[z], k[J + 1] = H[z + 1], k[J + 2] = H[z + 2], k[J + 3] = 255);
    }
    this.offCtx.putImageData(b, 0, 0), this.glowCtx.putImageData(E, 0, 0);
    const N = this.tsToX(this.cols[s].tsMs), I = this.tsToX(this.cols[s].tsMs + d * this.columnMs()), F = h(i), q = h(l);
    if (e.imageSmoothingEnabled = y.smoothColumns, e.drawImage(this.off, N, F, Math.max(1, I - N), Math.max(1, q - F)), e.imageSmoothingEnabled = !1, y.glow && (e.save(), e.globalCompositeOperation = "lighter", e.globalAlpha = 0.38, "filter" in e && (e.filter = "blur(6px)"), e.imageSmoothingEnabled = !0, e.drawImage(this.glow, N, F, Math.max(1, I - N), Math.max(1, q - F)), e.restore()), Qe(
      e,
      c,
      v,
      (L) => this.tsToX(L),
      a,
      r,
      this.niceTimeStep(c * this.msPerPx)
    ), y.showPath && Dt(e, this.cols, s, o, (L) => this.tsToX(L), h, l, i), y.showCandles && Lt(
      e,
      this.dots,
      a,
      r,
      l,
      i,
      (L) => this.tsToX(L),
      h,
      this.msPerPx,
      c
    ), y.dots) {
      const L = y.dotType === "pie" ? "pie" : y.dotType === "solid" ? "solid" : "sphere";
      At(
        e,
        this.dots,
        a,
        r,
        l,
        i,
        (U) => this.tsToX(U),
        h,
        {
          alpha: Math.min(1, Math.max(0, y.dotAlpha)),
          scale: y.dotScale,
          mode: L,
          bigK: y.bigTradeK,
          bigMedian: this.bigMedian,
          fieldW: c,
          cssH: p
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
    const c = [5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 36e5].find((u) => u / this.msPerPx >= 72) ?? 36e5, p = r - a, y = [
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
    ].find((u) => p / u <= 20) ?? p / 20, d = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Map();
    let S = 0, f = 0;
    for (const u of this.dots) {
      if (u.tsMs < s || u.tsMs > o || u.price < a || u.price > r) continue;
      f += 1;
      const k = Math.floor(u.tsMs / c), N = Math.floor(u.price / y), I = k + ":" + N;
      let F = d.get(I);
      F || (F = { b: 0, s: 0 }, d.set(I, F)), u.buy ? F.b += u.size : F.s += u.size, S = Math.max(S, F.b, F.s);
      let q = x.get(k);
      q || (q = { b: 0, s: 0 }, x.set(k, q)), u.buy ? q.b += u.size : q.s += u.size;
    }
    if (!f) {
      e.fillStyle = "#5c6672", e.font = "11px ui-monospace, Menlo, monospace", e.textAlign = "center", e.fillText("no side-stamped prints in view", this.cssW / 2, i / 2 - 8), e.font = "10px ui-monospace, Menlo, monospace", e.fillText("the footprint builds from executed trades (demo and", this.cssW / 2, i / 2 + 10), e.fillText("crypto feeds carry sides; sources without prints stay blank)", this.cssW / 2, i / 2 + 24);
      return;
    }
    const g = (u) => u >= 1e3 ? `${(u / 1e3).toFixed(1)}k` : u >= 100 || u >= 10 ? u.toFixed(0) : u.toFixed(1), M = this.fieldW(), b = Math.min(22, Math.max(9, y * this.viewPpu * 0.85)), E = Math.floor(s / c) * c;
    for (let u = E; u <= o; u += c) {
      const k = this.tsToX(u), N = this.tsToX(u + c);
      if (N < -4 || k > M + 4) continue;
      const I = N - k, F = Math.floor(u / c), q = I >= 92, L = I / 2 - 4;
      e.strokeStyle = "rgba(30, 36, 47, 0.95)", e.beginPath(), e.moveTo(Math.round(N) + 0.5, 0), e.lineTo(Math.round(N) + 0.5, i), e.stroke();
      for (const [H, z] of d) {
        const [J, ce] = H.split(":");
        if (Number(J) !== F) continue;
        const ge = Number(ce), ae = l((ge + 0.5) * y);
        if (ae < -b || ae > i + b) continue;
        const fe = ae - (b - 2) / 2, ne = z.b >= z.s * 3 && z.b > 0 ? 1 : z.s >= z.b * 3 && z.s > 0 ? -1 : 0;
        ne !== 0 && (e.fillStyle = ne > 0 ? "rgba(38, 166, 154, 0.13)" : "rgba(239, 83, 80, 0.13)", e.fillRect(k + 2, fe, I - 4, b - 2));
        const C = k + I / 2, j = S > 0 ? z.s / S * L : 0, W = S > 0 ? z.b / S * L : 0;
        e.fillStyle = "rgba(239, 83, 80, 0.75)", e.fillRect(C - 1 - j, fe, j, b - 2), e.fillStyle = "rgba(38, 166, 154, 0.75)", e.fillRect(C + 1, fe, W, b - 2), q && (e.font = "9px ui-monospace, Menlo, monospace", e.textAlign = "right", e.fillStyle = ne < 0 ? "#ffc9c5" : "#b2807d", e.fillText(g(z.s), C - 4, ae + 3), e.textAlign = "left", e.fillStyle = ne > 0 ? "#b8f2e9" : "#7fa8a1", e.fillText(g(z.b), C + 4, ae + 3));
      }
      const U = x.get(F);
      if (U) {
        const H = U.b - U.s;
        e.font = "9px ui-monospace, Menlo, monospace", e.textAlign = "center", e.fillStyle = H > 0 ? "#26a69a" : H < 0 ? "#ef5350" : "#8b96a5", e.fillText(
          `Δ${H >= 0 ? "+" : "−"}${g(Math.abs(H))} · ${g(U.b + U.s)}`,
          k + I / 2,
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
function oe({ label: t, children: e, hint: s }) {
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
function Ne({ options: t, value: e, onChange: s }) {
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
function Se({ on: t, onChange: e, label: s }) {
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
  const [l, i] = _t.useState(String(t));
  T.useEffect(() => {
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
function Kt({ settings: t }) {
  const e = T.useRef(null);
  return T.useEffect(() => {
    const s = e.current;
    if (!s) return;
    s.width = 256, s.height = 14;
    const o = s.getContext("2d"), { ask: a, bid: r } = $e({ ...t }), l = o.createImageData(256, 14);
    for (let i = 0; i < 256; i++)
      for (let h = 0; h < 14; h++) {
        const c = h < 7 ? a : r, p = (h * 256 + i) * 4;
        l.data[p] = c[i * 4], l.data[p + 1] = c[i * 4 + 1], l.data[p + 2] = c[i * 4 + 2], l.data[p + 3] = 255;
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
  T.useEffect(() => {
    const i = (h) => {
      h.key === "Escape" && a();
    };
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [a]);
  const r = e, l = T.useMemo(() => {
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
            title: kt(i),
            onClick: () => {
              o({ scheme: i }), r.applySchemeGlobally && (Ve(i, !0), window.dispatchEvent(new CustomEvent(
                Ie,
                { detail: { scheme: i, source: t } }
              )));
            },
            children: [
              /* @__PURE__ */ n.jsx("div", { className: "dh-scheme-name", children: i === "deepdom" ? "DEEPDOM" : i === "bookmap" ? "BOOKMAP" : i === "heat" ? "HEAT" : "GREYSCALE" }),
              /* @__PURE__ */ n.jsx(Kt, { settings: { ...r, scheme: i } })
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
          oe,
          {
            label: "Apply scheme globally",
            hint: "Persists the colour scheme terminal-wide; every Depth Heat pane follows it.",
            children: [
              /* @__PURE__ */ n.jsx(Se, { on: r.applySchemeGlobally, onChange: (i) => {
                Ve(r.scheme, i), o({ applySchemeGlobally: i }), window.dispatchEvent(new CustomEvent(
                  Ie,
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
          oe,
          {
            label: "Wall glow",
            hint: "Bloom pass over the hottest levels — walls burn against a calm field.",
            children: /* @__PURE__ */ n.jsx(Se, { on: r.glow, onChange: (i) => o({ glow: i }) })
          }
        ),
        /* @__PURE__ */ n.jsx(
          oe,
          {
            label: "Smooth columns",
            hint: "Bilinear blend between columns (watercolour feel). Off = crisp terminal columns.",
            children: /* @__PURE__ */ n.jsx(
              Se,
              {
                on: r.smoothColumns,
                onChange: (i) => o({ smoothColumns: i })
              }
            )
          }
        ),
        /* @__PURE__ */ n.jsx(
          oe,
          {
            label: "Price path",
            hint: "Stepped bid/ask lines from the carried book — the Bookmap/DeepDom signature overlay.",
            children: /* @__PURE__ */ n.jsx(Se, { on: r.showPath, onChange: (i) => o({ showPath: i }) })
          }
        ),
        /* @__PURE__ */ n.jsxs(
          oe,
          {
            label: "Candles over heat",
            hint: "OHLC candles derived from the executed print stream (trade-derived — no invented feed).",
            children: [
              /* @__PURE__ */ n.jsx(
                Se,
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
          oe,
          {
            label: "Context strips",
            hint: "V3 bottom stack sharing the time axis: buy/sell-split volume histogram + CVD line, and the Imb/Cvd gauges top-left.",
            children: /* @__PURE__ */ n.jsx(
              Se,
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
        /* @__PURE__ */ n.jsxs(oe, { label: "Mode", hint: "Percentile: relative to this session's sizes. Exact: fixed size thresholds.", children: [
          /* @__PURE__ */ n.jsx(
            Ne,
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
          /* @__PURE__ */ n.jsx(oe, { label: "Lower size", children: /* @__PURE__ */ n.jsx(
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
          /* @__PURE__ */ n.jsx(oe, { label: "Upper size", children: /* @__PURE__ */ n.jsx(
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
        /* @__PURE__ */ n.jsx(oe, { label: "Mode", hint: "Auto adapts the shade count to your price zoom.", children: /* @__PURE__ */ n.jsx(
          Ne,
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
        /* @__PURE__ */ n.jsx(oe, { label: "Show executed trades", children: /* @__PURE__ */ n.jsx(Se, { on: r.dots, onChange: (i) => o({ dots: i }) }) }),
        /* @__PURE__ */ n.jsx(
          oe,
          {
            label: "Drawing type",
            hint: "Pie aggregates prints per price-time cell and splits the disc by aggressor-side volume.",
            children: /* @__PURE__ */ n.jsx(
              Ne,
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
        /* @__PURE__ */ n.jsx(oe, { label: "Min accountable size", hint: "Prints below this size draw no dot.", children: /* @__PURE__ */ n.jsx(
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
          oe,
          {
            label: "Ladder",
            hint: "V4: fused puts the size figures + bars inside the price-axis gutter (Bookmap layout); panel keeps the separate COB column.",
            children: /* @__PURE__ */ n.jsx(
              Ne,
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
          oe,
          {
            label: "Time & sales",
            hint: "V4 drawer: every executed print with min-size and ALL/BUY/SELL filters.",
            children: /* @__PURE__ */ n.jsx(
              Se,
              {
                on: r.showTsPanel,
                onChange: (i) => o({ showTsPanel: i })
              }
            )
          }
        ),
        /* @__PURE__ */ n.jsxs(
          oe,
          {
            label: "COB column",
            hint: "S8: the numeric DOM ladder beside the heatmap — per-level size + cumulative, spread and BBO rows.",
            children: [
              /* @__PURE__ */ n.jsx(Se, { on: r.cob, onChange: (i) => o({ cob: i }) }),
              /* @__PURE__ */ n.jsx("span", { className: "dh-hint", style: { marginLeft: r.cob ? 0 : 8 }, children: "cumulative column" }),
              /* @__PURE__ */ n.jsx(
                Se,
                {
                  on: r.cobCumulative,
                  onChange: (i) => o({ cobCumulative: i })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ n.jsxs(
          oe,
          {
            label: "Active range",
            hint: "S6 override: expose only N levels around mid instead of the full transmitted book. Amber boundary lines mark the window on the COB column.",
            children: [
              /* @__PURE__ */ n.jsx(
                Se,
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
          oe,
          {
            label: "Auto-recenter",
            hint: "S9: glides the price axis back when the anchor drifts beyond tolerance. Double-click recenters instantly.",
            children: /* @__PURE__ */ n.jsx(
              Ne,
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
          oe,
          {
            label: "Depth reset",
            hint: "S11: how stale last-seen liquidity is dropped — per session, or on a fixed interval.",
            children: [
              /* @__PURE__ */ n.jsx(
                Ne,
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
class De {
  bids = /* @__PURE__ */ new Map();
  asks = /* @__PURE__ */ new Map();
  version = 0;
  static key(e) {
    return Math.round(e / et) * et;
  }
  apply(e) {
    for (const [s, o] of e.bids) {
      const a = De.key(s);
      o <= 0 ? this.bids.delete(a) : this.bids.set(a, o);
    }
    for (const [s, o] of e.asks) {
      const a = De.key(s);
      o <= 0 ? this.asks.delete(a) : this.asks.set(a, o);
    }
    this.version += 1;
  }
  /** Seed from the /api/orderflow/book snapshot shape. */
  seed(e, s) {
    this.bids.clear(), this.asks.clear();
    for (const [o, a] of e) a > 0 && this.bids.set(De.key(o), a);
    for (const [o, a] of s) a > 0 && this.asks.set(De.key(o), a);
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
function Jt(t) {
  return t >= 1e3 ? `${(t / 1e3).toFixed(1)}k` : t >= 100 ? t.toFixed(0) : t >= 1 ? t.toFixed(1) : t.toPrecision(2);
}
function Qt(t) {
  return t >= 1e3 ? t.toFixed(1) : t >= 1 ? t.toFixed(2) : t.toPrecision(4);
}
function Zt({
  rendererRef: t,
  book: e,
  settings: s,
  width: o = 148
}) {
  const a = T.useRef(null), r = T.useRef(s);
  return r.current = s, T.useEffect(() => {
    const l = a.current;
    if (!l) return;
    const i = l.getContext("2d");
    let h = 0, c = -1, p = -1, v = !1;
    const y = () => {
      const f = l.getBoundingClientRect(), g = window.devicePixelRatio || 1;
      l.width = Math.max(1, Math.round(f.width * g)), l.height = Math.max(1, Math.round(f.height * g)), c = -1;
    }, d = new ResizeObserver(y);
    d.observe(l), y();
    const x = () => {
      const f = t.current;
      if (!f) return;
      const g = f.getViewMetrics();
      if (g.version === c && e.version === p) return;
      c = g.version, p = e.version;
      const M = window.devicePixelRatio || 1, b = l.width / M, E = l.height / M;
      i.setTransform(M, 0, 0, M, 0, 0), i.fillStyle = "#0d1117", i.fillRect(0, 0, b, E);
      const { bids: u, asks: k } = e.sorted();
      if (!u.length && !k.length) {
        i.fillStyle = "#5c6672", i.font = "10px monospace", i.textAlign = "center", i.fillText("no book", b / 2, E / 2);
        return;
      }
      const N = r.current, I = e.bestBid(), F = e.bestAsk(), q = N.activeRange > 0, L = [...u, ...k].filter(([C]) => C >= g.lo && C <= g.hi).map(([C]) => C).sort((C, j) => C - j);
      let U = 8;
      if (L.length >= 2) {
        const C = [];
        for (let j = 1; j < L.length; j++) C.push(L[j] - L[j - 1]);
        C.sort((j, W) => j - W), U = Math.min(20, Math.max(2.5, g.ppu * C[C.length >> 1]));
      }
      let H = 0, z = 0;
      {
        let C = 0;
        for (const [j, W] of u)
          j >= g.lo && j <= g.hi && (H = Math.max(H, W)), C += W, z = Math.max(z, C);
        C = 0;
        for (const [j, W] of k)
          j >= g.lo && j <= g.hi && (H = Math.max(H, W)), C += W, z = Math.max(z, C);
      }
      const J = b - 52, ce = N.cobCumulative ? 26 : 0, ge = b - 8 - ce - 40, ae = (C, j, W, Ce, ye) => {
        const Y = g.yOf(C);
        if (Y < -U || Y > E + U) return;
        const xe = Y - U / 2, _ = q && !ye;
        if (N.cobCumulative && z > 0) {
          const G = Math.max(1, Ce / z * 18);
          i.fillStyle = W === "bid" ? "rgba(38, 166, 154, 0.14)" : "rgba(239, 83, 80, 0.14)", i.fillRect(b - 20, xe, 18, U - 1), i.fillStyle = W === "bid" ? "rgba(38, 166, 154, 0.45)" : "rgba(239, 83, 80, 0.45)", i.fillRect(b - 20, xe, G, U - 1);
        }
        const $ = H > 0 ? Math.max(1.5, j / H * J) : 1.5;
        i.fillStyle = W === "bid" ? _ ? "rgba(38,166,154,0.16)" : "rgba(38, 166, 154, 0.62)" : _ ? "rgba(239,83,80,0.16)" : "rgba(239, 83, 80, 0.62)", i.fillRect(ge + 40 - $, xe, $, U - 1), i.font = "9px monospace", i.textAlign = "right", i.fillStyle = _ ? "#4a5260" : W === "bid" ? "#9fd6cd" : "#f4b3ae", i.fillText(Jt(j), ge + 38, Y + 3);
      };
      let fe = 0;
      for (let C = 0; C < u.length; C++) {
        const [j, W] = u[C];
        fe += W, !(j < g.lo - U || j > g.hi + U) && ae(j, W, "bid", fe, !q || C < N.activeRange);
      }
      fe = 0;
      for (let C = 0; C < k.length; C++) {
        const [j, W] = k[C];
        fe += W, !(j < g.lo - U || j > g.hi + U) && ae(j, W, "ask", fe, !q || C < N.activeRange);
      }
      const ne = (C, j) => {
        const W = g.yOf(C);
        W < 0 || W > E || (i.strokeStyle = j, i.lineWidth = 1, i.beginPath(), i.moveTo(0, Math.round(W) + 0.5), i.lineTo(b, Math.round(W) + 0.5), i.stroke());
      };
      if (I !== null && ne(I, "rgba(38, 166, 154, 0.95)"), F !== null && ne(F, "rgba(239, 83, 80, 0.95)"), I !== null && F !== null && F > I) {
        const C = (g.yOf(I) + g.yOf(F)) / 2;
        if (C > 10 && C < E - 10) {
          const j = `Δ ${Qt(F - I)}`;
          i.font = "9px monospace";
          const W = i.measureText(j).width + 10;
          i.fillStyle = "rgba(20, 24, 31, 0.95)", i.fillRect(2, C - 8, W, 16), i.strokeStyle = "#2a3140", i.strokeRect(2.5, C - 7.5, W - 1, 15), i.fillStyle = "#c8cfda", i.textAlign = "left", i.fillText(j, 7, C + 3);
        }
      }
      if (q) {
        const C = [];
        u.length && N.activeRange <= u.length && C.push(g.yOf(u[N.activeRange - 1][0]) + U / 2 + 1), k.length && N.activeRange <= k.length && C.push(g.yOf(k[N.activeRange - 1][0]) - U / 2 - 1), i.strokeStyle = "rgba(255, 179, 0, 0.75)", i.setLineDash([3, 3]);
        for (const j of C)
          j < 0 || j > E || (i.beginPath(), i.moveTo(0, j), i.lineTo(b, j), i.stroke());
        i.setLineDash([]);
      }
    }, S = () => {
      v || (x(), h = requestAnimationFrame(S));
    };
    return h = requestAnimationFrame(S), () => {
      v = !0, cancelAnimationFrame(h), d.disconnect();
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
function es(t) {
  return t >= 1e6 ? `${(t / 1e6).toFixed(1)} MB` : t >= 1e3 ? `${(t / 1e3).toFixed(0)} KB` : `${t} B`;
}
function ts(t) {
  const e = new Date(t * 1e3);
  return e.toLocaleDateString(void 0, { month: "short", day: "numeric" }) + " " + e.toLocaleTimeString(void 0, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !1
  });
}
function ss(t, e) {
  const s = Math.max(0, Math.round((e ?? Date.now() / 1e3) - t)), o = Math.floor(s / 3600), a = Math.floor(s % 3600 / 60);
  return o ? `${o}h ${a}m` : a ? `${a}m ${s % 60}s` : `${s}s`;
}
function is({
  symbol: t,
  onLoad: e,
  onClose: s
}) {
  const [o, a] = T.useState(null), [r, l] = T.useState(null), [i, h] = T.useState(null), [c, p] = T.useState(null), [v, y] = T.useState(null), d = T.useCallback(() => {
    fetch("/api/orderflow/sessions").then((f) => f.ok ? f.json() : Promise.reject(new Error(`HTTP ${f.status}`))).then((f) => {
      a(f.filter((g) => g.symbol === t)), l(null);
    }).catch((f) => l(String(f)));
  }, [t]);
  T.useEffect(() => {
    d();
    const f = setInterval(d, 4e3);
    return () => clearInterval(f);
  }, [d]), T.useEffect(() => {
    const f = (g) => {
      g.key === "Escape" && s();
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [s]);
  const x = async (f) => {
    h(f.id), y(null);
    try {
      const g = await fetch(
        `/api/orderflow/sessions/${encodeURIComponent(f.id)}/events`
      );
      if (!g.ok) {
        const b = await g.json().catch(() => ({ detail: `HTTP ${g.status}` }));
        throw new Error(String(b.detail || g.status));
      }
      const M = await g.json();
      await e(M.events || [], { ...f, rows: (M.events || []).length }), M.truncated && y("Large session: loaded up to the event cap — the tail stays in the file."), s();
    } catch (g) {
      l(String(g));
    } finally {
      h(null);
    }
  }, S = async (f) => {
    if (c !== f.id) {
      p(f.id);
      return;
    }
    p(null);
    try {
      const g = await fetch(
        `/api/orderflow/sessions/${encodeURIComponent(f.id)}`,
        { method: "DELETE" }
      );
      if (!g.ok) {
        const M = await g.json().catch(() => ({ detail: `HTTP ${g.status}` }));
        throw new Error(String(M.detail || g.status));
      }
      d();
    } catch (g) {
      l(String(g));
    }
  };
  return /* @__PURE__ */ n.jsx("div", { className: "dh-backdrop", onMouseDown: s, children: /* @__PURE__ */ n.jsxs("div", { className: "dh-window", onMouseDown: (f) => f.stopPropagation(), children: [
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
      o?.map((f) => /* @__PURE__ */ n.jsxs("div", { className: "dh-sess", children: [
        /* @__PURE__ */ n.jsxs("div", { style: { minWidth: 0, flex: 1 }, children: [
          /* @__PURE__ */ n.jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexWrap: "wrap"
          }, children: [
            f.recording && /* @__PURE__ */ n.jsx("span", { className: "dh-rec-dot", title: "Recording now" }),
            /* @__PURE__ */ n.jsx("span", { style: { fontFamily: "ui-monospace, Menlo, monospace" }, children: f.id }),
            f.demo && /* @__PURE__ */ n.jsx("span", { className: "dh-chip demo", children: "DEMO" }),
            /* @__PURE__ */ n.jsx("span", { className: "dh-chip", children: f.source || "live" })
          ] }),
          /* @__PURE__ */ n.jsxs("div", { className: "dh-hint", style: { marginTop: 2 }, children: [
            ts(f.started),
            " · ",
            ss(f.started, f.stopped),
            " · ",
            es(f.bytes),
            " · ",
            f.rows.toLocaleString(),
            " rows",
            f.stopped === null ? " · recording…" : ""
          ] })
        ] }),
        /* @__PURE__ */ n.jsx(
          "button",
          {
            className: "dh-btn primary",
            disabled: i !== null,
            onClick: () => x(f),
            title: "Load this recording into the pane",
            children: i === f.id ? "loading…" : "Load"
          }
        ),
        /* @__PURE__ */ n.jsx(
          "button",
          {
            className: "dh-btn",
            style: c === f.id ? { borderColor: "#ef5350", color: "#ef9a9a" } : void 0,
            onClick: () => S(f),
            title: "Delete this recording",
            children: c === f.id ? "sure?" : "Delete"
          }
        )
      ] }, f.id)),
      v && /* @__PURE__ */ n.jsx("div", { className: "dh-empty", children: v })
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "dh-foot", children: [
      /* @__PURE__ */ n.jsx("span", { className: "dh-hint", children: "recordings are parquet files in workspace/MY DATA" }),
      /* @__PURE__ */ n.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ n.jsx("button", { className: "dh-btn primary", onClick: s, children: "Done" })
    ] })
  ] }) });
}
const ns = 4 * 3600;
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
  const o = Et();
  return o.apply && (e = { ...e, scheme: o.scheme, applySchemeGlobally: !0 }), e;
}
function tt(t, e) {
  try {
    localStorage.setItem(ut(t), JSON.stringify(e));
  } catch {
  }
}
function os({
  symbol: t,
  sourceProvider: e,
  colors: s,
  syncedCrosshairTime: o,
  onCrosshairMove: a,
  onToggleKind: r
}) {
  const l = T.useRef(null), i = T.useRef(null), h = T.useRef(null);
  h.current || (h.current = new De());
  const [c, p] = T.useState({ kind: "loading" }), [v, y] = T.useState(() => Ge(t)), [d, x] = T.useState(50), [S, f] = T.useState(!1), [g, M] = T.useState(null), [b, E] = T.useState(!1), [u, k] = T.useState(null), [N, I] = T.useState(null), [F, q] = T.useState(0), [L, U] = T.useState(null), [H, z] = T.useState(0), J = T.useCallback(
    (_) => {
      y(($) => {
        const G = { ...$, ..._ };
        return G.applySchemeGlobally && _.scheme && _.scheme !== $.scheme && (Ve(_.scheme, !0), window.dispatchEvent(new CustomEvent(Ie, { detail: { scheme: _.scheme, source: t } }))), tt(t, G), i.current?.setSettings(G), i.current?.refreshCutoffs(), G;
      });
    },
    [t]
  );
  T.useEffect(() => {
    const _ = ($) => {
      const G = $.detail;
      G.source !== t && y((he) => {
        if (!he.applySchemeGlobally || he.scheme === G.scheme) return he;
        const Me = { ...he, scheme: G.scheme };
        return tt(t, Me), i.current?.setSettings(Me), Me;
      });
    };
    return window.addEventListener(Ie, _), () => window.removeEventListener(Ie, _);
  }, [t]);
  const ce = T.useCallback(async () => {
    I(null);
    try {
      const _ = await fetch("/api/orderflow/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol: t })
      }), $ = await _.json().catch(() => ({}));
      if (!_.ok) throw new Error(String($.detail || `HTTP ${_.status}`));
      k({ rid: $.id ?? $.sid ?? "", since: Date.now() });
    } catch (_) {
      I(String(_));
    }
  }, [t]), ge = T.useCallback(async () => {
    try {
      await fetch("/api/orderflow/record/stop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: u?.rid ?? "" })
      });
    } catch {
    }
    k(null), q(0);
  }, [u]);
  T.useEffect(() => {
    if (!u) return;
    const _ = setInterval(() => q(Math.floor((Date.now() - u.since) / 1e3)), 1e3);
    return () => clearInterval(_);
  }, [u]);
  const ae = T.useCallback((_, $) => {
    const G = i.current;
    if (!G || !_.length) return;
    const he = _.filter((me) => me.type === "SNAPSHOT" || me.type === "DELTA"), Me = _.filter((me) => typeof me.side == "string");
    G.ingestHistory(he), h.current?.seed([], []);
    for (const me of he) h.current?.apply(me);
    for (const me of Me) G.addTrade(me);
    U($.id);
  }, []), fe = T.useCallback(() => {
    U(null), z((_) => _ + 1);
  }, []);
  T.useEffect(() => {
    const _ = l.current;
    if (!_) return;
    const $ = new Vt(Ge(t));
    return i.current = $, $.attach(_), $.setBookSource(h.current), a && ($.onHoverTime = (G) => a(G)), () => {
      $.dispose(), i.current = null;
    };
  }, [t]), T.useEffect(() => {
    i.current?.setSettings(v);
  }, [v]), T.useEffect(() => {
    i.current?.setSyncedCrosshair(o ?? null);
  }, [o]), T.useEffect(() => {
    let _ = !1, $ = null;
    return p({ kind: "loading" }), h.current?.seed([], []), (async () => {
      const he = i.current;
      if (!he) return;
      const Me = Date.now() / 1e3, me = e ? `&provider=${encodeURIComponent(e)}` : "";
      let se = !1, ze = "";
      try {
        const re = await fetch(
          `/api/orderflow/depth?symbol=${encodeURIComponent(t)}` + me + `&from=${Me - ns}&to=${Me}&column_ms=1000&max_levels=60`
        );
        if (!re.ok) {
          const pe = await re.json().catch(() => ({ detail: `HTTP ${re.status}` }));
          _ || p({ kind: "nodata", reason: String(pe.detail || re.status) });
          return;
        }
        const D = await re.json();
        if (_) return;
        se = !!D.demo, ze = D.provider, he.ingestHistory(D.events || []);
        for (const pe of D.trades || []) he.addTrade(pe);
      } catch (re) {
        _ || p({ kind: "nodata", reason: `engine unreachable: ${re}` });
        return;
      }
      try {
        const re = Ge(t), D = new URLSearchParams({ symbol: t });
        e && D.set("provider", e), re.activeRange > 0 && D.set("active_levels", String(re.activeRange)), D.set("reset", re.resetPolicy), re.resetPolicy === "interval" && D.set("reset_interval_min", String(re.resetIntervalMin));
        const pe = await fetch(`/api/orderflow/book?${D.toString()}`);
        if (pe.ok) {
          const Te = await pe.json();
          he.setBook(Te.best_bid ?? null, Te.best_ask ?? null), h.current?.seed(Te.bids ?? [], Te.asks ?? []);
        }
      } catch {
      }
      _ || p({ kind: "live", demo: se, provider: ze });
      const Ae = location.protocol === "https:" ? "wss" : "ws";
      $ = new WebSocket(`${Ae}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(t)}${me}`), $.onmessage = (re) => {
        if (_) return;
        let D;
        try {
          D = JSON.parse(re.data);
        } catch {
          return;
        }
        const pe = i.current;
        if (pe)
          if (D.type === "depth") {
            if (pe.applyDepth(D.event), h.current?.apply(D.event), D.event.type === "SNAPSHOT") {
              let Te = null, Re = null;
              for (const [ke] of D.event.bids) (Te === null || ke > Te) && (Te = ke);
              for (const [ke] of D.event.asks) (Re === null || ke < Re) && (Re = ke);
              pe.setBook(Te, Re);
            }
          } else D.type === "trade" ? pe.addTrade(D.event) : D.type === "error" && p({ kind: "nodata", reason: D.message });
      };
    })(), () => {
      _ = !0;
      try {
        $?.close();
      } catch {
      }
    };
  }, [t, H, e]), T.useEffect(() => {
    if (!(v.cutoffMode === "percentile")) return;
    const $ = 90 - d * 0.8, G = Math.max(0, 50 - $ / 2), he = Math.min(100, 50 + $ / 2);
    J({ cutoffLower: G, cutoffUpper: he });
  }, [d]);
  const ne = T.useMemo(() => c.kind === "live" && c.demo ? "DEMO" : c.kind === "live" ? c.provider.toUpperCase() : "", [c]), C = T.useCallback((_) => {
    i.current?.wheel(_.deltaX, _.deltaY, _.shiftKey);
  }, []), j = T.useRef(null), W = T.useCallback((_) => {
    j.current = { x: _.clientX, y: _.clientY };
  }, []), Ce = T.useCallback((_) => {
    const $ = _.currentTarget.getBoundingClientRect();
    j.current && _.buttons & 1 && (i.current?.drag(_.clientX - j.current.x, _.clientY - j.current.y), j.current = { x: _.clientX, y: _.clientY }), i.current?.setHover(_.clientX - $.left, _.clientY - $.top);
  }, []), ye = T.useCallback(() => {
    j.current = null;
  }, []), Y = T.useCallback(() => {
    j.current = null, i.current?.setHover(null, null);
  }, []), xe = T.useCallback(() => {
    i.current?.recenter();
  }, []);
  return /* @__PURE__ */ n.jsxs("div", { className: "absolute inset-0 flex flex-col bg-[#1c1c1c] text-[#e8e8e8] select-none", children: [
    /* @__PURE__ */ n.jsxs("div", { className: "flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] text-[12px] shrink-0", children: [
      /* @__PURE__ */ n.jsx("span", { className: "font-bold tracking-wider text-[11px] text-[#e8e8e8]", children: "DEPTH HEAT" }),
      /* @__PURE__ */ n.jsx("span", { className: "font-mono font-semibold text-[13px] text-[#e8e8e8]", children: t }),
      /* @__PURE__ */ n.jsx("div", { className: "flex items-center gap-0.5 ml-2 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]", children: ["heat", "footprint"].map((_) => /* @__PURE__ */ n.jsx(
        "button",
        {
          onClick: () => J({ view: _ }),
          title: _ === "heat" ? "Resting liquidity heat field" : "Footprint: bid×ask executed volume",
          className: `px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${v.view === _ ? "bg-[#e8e8e8] text-[#1c1c1c] shadow-sm" : "bg-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
          children: _ === "heat" ? "HEAT" : "FOOTPRINT"
        },
        _
      )) }),
      ne && /* @__PURE__ */ n.jsx(
        "span",
        {
          className: `px-2 py-0.5 rounded-full text-[10px] font-medium border ${c.kind === "live" && c.demo ? "bg-[#f59e0b]/10 border-[#f59e0b]/20 text-[#f59e0b]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9]"}`,
          children: ne
        }
      ),
      /* @__PURE__ */ n.jsxs("div", { className: "flex items-center gap-2 ml-auto", children: [
        /* @__PURE__ */ n.jsx("span", { className: "text-[10px] tracking-wider text-[#6a6a6a] hidden lg:block", children: "CUT-OFF" }),
        /* @__PURE__ */ n.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 100,
            value: d,
            onChange: (_) => x(Number(_.target.value)),
            title: "Cut-off window — narrows/widens where gradient saturates",
            className: "w-[90px] accent-[#e8e8e8]"
          }
        ),
        u ? /* @__PURE__ */ n.jsxs(
          "button",
          {
            onClick: ge,
            title: "Stop recording",
            className: "px-3 py-1 rounded-full border text-[11px] font-medium flex items-center gap-1.5 bg-[#f0426c]/10 border-[#f0426c]/30 text-[#f0426c] hover:bg-[#f0426c]/20 transition-colors",
            children: [
              /* @__PURE__ */ n.jsx("span", { className: "w-2 h-2 rounded-full bg-[#f0426c] animate-pulse" }),
              " REC ",
              Math.floor(F / 60),
              ":",
              String(F % 60).padStart(2, "0")
            ]
          }
        ) : /* @__PURE__ */ n.jsx(
          "button",
          {
            onClick: ce,
            title: "Record live depth to MY DATA",
            className: "px-2.5 py-1 rounded-md border border-[#3a3a3a] bg-[#262626] text-[11px] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8] transition-colors",
            children: "● REC"
          }
        ),
        /* @__PURE__ */ n.jsx(
          "button",
          {
            onClick: () => E(!0),
            title: "Recorded sessions",
            className: "px-2.5 py-1 rounded-md border border-[#3a3a3a] bg-[#262626] text-[11px] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8] transition-colors",
            children: "Sessions"
          }
        ),
        /* @__PURE__ */ n.jsx(
          "button",
          {
            onClick: () => J({ showTsPanel: !v.showTsPanel }),
            title: "Time & sales drawer",
            className: `px-2.5 py-1 rounded-md border text-[11px] transition-colors ${v.showTsPanel ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
            children: "T&S"
          }
        ),
        L && /* @__PURE__ */ n.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9]", children: [
          "SESSION",
          /* @__PURE__ */ n.jsx("button", { onClick: fe, className: "ml-1 w-4 h-4 rounded-full bg-[#1c1c1c] border border-[#3a3a3a] flex items-center justify-center hover:text-[#e8e8e8]", children: "×" })
        ] }),
        /* @__PURE__ */ n.jsx(
          "button",
          {
            onClick: () => {
              M(i.current?.getCutoffs() ?? null), f(!0);
            },
            title: "Depth Heat settings",
            className: `w-8 h-8 rounded-md border flex items-center justify-center transition-colors ${S ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
            children: "⚙"
          }
        ),
        r && /* @__PURE__ */ n.jsx(
          "button",
          {
            onClick: r,
            className: "px-3 py-1.5 rounded-md border border-[#3a3a3a] bg-[#262626] text-[11px] font-medium text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8] transition-colors",
            children: "Chart ⇄"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ n.jsxs(
      "div",
      {
        className: "relative flex-1 min-h-0 flex flex-row bg-[#1c1c1c]",
        onContextMenu: (_) => {
          _.preventDefault(), M(i.current?.getCutoffs() ?? null), f(!0);
        },
        children: [
          /* @__PURE__ */ n.jsxs("div", { className: "relative flex-1 min-w-0", children: [
            /* @__PURE__ */ n.jsx(
              "canvas",
              {
                ref: l,
                className: "absolute inset-0 w-full h-full block",
                onWheel: C,
                onMouseDown: W,
                onMouseMove: Ce,
                onMouseUp: ye,
                onMouseLeave: Y,
                onDoubleClick: xe
              }
            ),
            c.kind === "loading" && /* @__PURE__ */ n.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-[#1c1c1c]/80 backdrop-blur-sm", children: [
              /* @__PURE__ */ n.jsx("div", { className: "text-[12px] font-mono text-[#e8e8e8]", children: "Loading depth history…" }),
              /* @__PURE__ */ n.jsxs("div", { className: "text-[10px] text-[#6a6a6a] mt-1", children: [
                t,
                " • 4h buffer"
              ] })
            ] }),
            c.kind === "nodata" && /* @__PURE__ */ n.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-[#1c1c1c] text-center p-6", children: [
              /* @__PURE__ */ n.jsx("div", { className: "w-12 h-12 rounded-full bg-[#262626] border border-[#3a3a3a] flex items-center justify-center text-[20px] mb-3", children: "◧" }),
              /* @__PURE__ */ n.jsxs("div", { className: "text-[13px] font-semibold text-[#e8e8e8]", children: [
                "No depth data for ",
                t
              ] }),
              /* @__PURE__ */ n.jsx("div", { className: "text-[11px] text-[#6a6a6a] mt-2 max-w-[360px]", children: c.reason }),
              /* @__PURE__ */ n.jsx("button", { onClick: () => z((_) => _ + 1), className: "mt-4 px-4 py-1.5 rounded-md bg-[#262626] border border-[#3a3a3a] text-[12px] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]", children: "Retry" })
            ] })
          ] }),
          v.cob && v.ladderMode === "panel" && c.kind === "live" && /* @__PURE__ */ n.jsx(Zt, { rendererRef: i, book: h.current, settings: v }),
          S && /* @__PURE__ */ n.jsx(
            Yt,
            {
              symbol: t,
              settings: v,
              cutoffRange: g,
              onChange: (_) => {
                J(_), M(i.current?.getCutoffs() ?? null);
              },
              onClose: () => f(!1)
            }
          ),
          b && /* @__PURE__ */ n.jsx(is, { symbol: t, onLoad: ae, onClose: () => E(!1) })
        ]
      }
    ),
    N && /* @__PURE__ */ n.jsxs("div", { className: "px-3 py-1.5 text-[10px] text-[#f0426c] bg-[#f0426c]/5 border-t border-[#f0426c]/10 truncate", children: [
      "rec: ",
      N
    ] })
  ] });
}
const as = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: os
}, Symbol.toStringTag, { value: "Module" })), le = 8192, de = 1024, rs = [
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
], ls = [
  { t: 0, r: 68, g: 1, b: 84 },
  { t: 0.2, r: 65, g: 68, b: 135 },
  { t: 0.4, r: 42, g: 120, b: 142 },
  { t: 0.6, r: 34, g: 168, b: 132 },
  { t: 0.8, r: 122, g: 209, b: 81 },
  { t: 1, r: 253, g: 231, b: 37 }
], cs = [
  { t: 0, r: 0, g: 0, b: 4 },
  { t: 0.25, r: 81, g: 18, b: 124 },
  { t: 0.5, r: 183, g: 55, b: 121 },
  { t: 0.75, r: 252, g: 137, b: 97 },
  { t: 1, r: 252, g: 253, b: 191 }
];
function Fe(t, e) {
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
function hs(t) {
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
function ds(t) {
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
function us(t) {
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
function st(t, e = 1) {
  const s = new Uint8Array(1024);
  for (let o = 0; o < 256; o++) {
    const a = o / 255;
    let r, l, i, h;
    if (t === "ember" ? [r, l, i] = Fe(rs, a) : t === "viridis" ? [r, l, i] = Fe(ls, a) : t === "magma" ? [r, l, i] = Fe(cs, a) : t === "inferno" ? [r, l, i] = hs(a) : t === "deepdom" || t === "bookmap" ? [r, l, i] = us(a) : t === "realtime" ? [r, l, i] = Fe([{ t: 0, r: 8, g: 13, b: 18 }, { t: 0.08, r: 12, g: 27, b: 36 }, { t: 0.25, r: 22, g: 83, b: 108 }, { t: 0.5, r: 48, g: 182, b: 201 }, { t: 0.75, r: 218, g: 217, b: 95 }, { t: 1, r: 255, g: 250, b: 220 }], a) : t === "realtime_warm" ? [r, l, i] = Fe([{ t: 0, r: 8, g: 13, b: 18 }, { t: 0.15, r: 15, g: 30, b: 64 }, { t: 0.4, r: 28, g: 92, b: 153 }, { t: 0.65, r: 75, g: 181, b: 190 }, { t: 0.8, r: 240, g: 205, b: 75 }, { t: 0.94, r: 248, g: 108, b: 40 }, { t: 1, r: 255, g: 55, b: 35 }], a) : [r, l, i] = ds(a), t === "inferno" || t === "ember" || t === "viridis" || t === "magma") {
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
const fs = `#version 300 es
void main() {
  vec2 pos = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(pos * 2.0 - 1.0, 0.0, 1.0);
}
`, ms = `#version 300 es
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
class ps {
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
    if (e.shaderSource(s, fs), e.compileShader(s), !e.getShaderParameter(s, e.COMPILE_STATUS)) {
      console.error("VS compile", e.getShaderInfoLog(s));
      return;
    }
    const o = e.createShader(e.FRAGMENT_SHADER);
    if (e.shaderSource(o, ms), e.compileShader(o), !e.getShaderParameter(o, e.COMPILE_STATUS)) {
      console.error("FS compile", e.getShaderInfoLog(o));
      return;
    }
    const a = e.createProgram();
    if (e.attachShader(a, s), e.attachShader(a, o), e.linkProgram(a), !e.getProgramParameter(a, e.LINK_STATUS)) {
      console.error("Program link", e.getProgramInfoLog(a));
      return;
    }
    this.program = a, e.useProgram(a), this.vao = e.createVertexArray(), e.bindVertexArray(this.vao), this.dataTex = e.createTexture(), e.bindTexture(e.TEXTURE_2D, this.dataTex), e.texImage2D(e.TEXTURE_2D, 0, e.R32F, le, de, 0, e.RED, e.FLOAT, new Float32Array(le * de)), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), this.reachTex = e.createTexture(), e.bindTexture(e.TEXTURE_2D, this.reachTex), e.texImage2D(e.TEXTURE_2D, 0, e.R32F, le, de, 0, e.RED, e.FLOAT, new Float32Array(le * de)), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), this.metaTex = e.createTexture(), e.bindTexture(e.TEXTURE_2D, this.metaTex), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA32F, le, 1, 0, e.RGBA, e.FLOAT, new Float32Array(le * 4)), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), this.colormapTex = e.createTexture(), this.colormapWarmTex = e.createTexture(), this.updateColormap();
    const r = ["u_data", "u_meta", "u_colormap", "u_colormap_warm", "u_reach_data", "u_plot_origin", "u_plot_size", "u_viewport_time_min", "u_viewport_time_max", "u_viewport_price_min", "u_viewport_price_max", "u_data_time_start", "u_observation_hold_until", "u_time_step", "u_ring_start", "u_ring_count", "u_ring_size", "u_max_rows", "u_bucket_size", "u_bucket_multiplier", "u_sensitivity", "u_max_qty", "u_color_low", "u_color_peak", "u_mode", "u_opacity", "u_use_reach", "u_use_warm"];
    for (const l of r) this.uniforms[l] = e.getUniformLocation(a, l);
    e.bindVertexArray(null);
  }
  updateColormap() {
    const e = this.gl;
    if (!e || !this.colormapTex || !this.colormapWarmTex) return;
    let s = "orderbook";
    this.mode === "liquidation" ? s = this.liqColormap : s = this.obColormap;
    const o = st(s, this.opacity);
    e.activeTexture(e.TEXTURE2), e.bindTexture(e.TEXTURE_2D, this.colormapTex), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 256, 1, 0, e.RGBA, e.UNSIGNED_BYTE, o), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
    const a = st("ember", this.opacity);
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
    const s = Array.from(this.timeline.entries()).sort((y, d) => y[0] - d[0]), o = s[0][0];
    this.gpuOriginMs = Math.floor(o / this.timeStepMs) * this.timeStepMs, this.gpuBucketSize = this.nativeBucket * (this.mode === "orderbook" ? this.bucketMultiplier : 1), this.globalMaxQty = 0.01;
    let a = 1 / 0, r = -1 / 0;
    for (const [, y] of s)
      for (const d of y.keys())
        d < a && (a = d), d > r && (r = d);
    const i = (a + r) / 2 - de / 2 * this.gpuBucketSize, h = new Float32Array(le * de), c = new Float32Array(le * 4), p = new Float32Array(le * de);
    let v = 0;
    for (const [y, d] of s) {
      const x = Math.floor((y - this.gpuOriginMs) / this.timeStepMs);
      if (x < 0 || x >= le) continue;
      x >= v && (v = x + 1);
      const S = new Float32Array(de);
      let f = 0, g = 0;
      for (const [b, E] of d) {
        const u = Math.floor((b - i) / this.nativeBucket);
        if (u >= 0 && u < de) {
          S[u] += E, u > f && (f = u);
          const k = Math.abs(S[u]);
          k > g && (g = k), k > this.globalMaxQty && (this.globalMaxQty = k);
        }
      }
      if (this.mode === "liquidation" && f > 0) {
        const b = new Float32Array(de), E = [0.61, 0.14];
        for (let u = 0; u <= f; u++) {
          const k = S[u];
          if (Math.abs(k) < 0.05) continue;
          const N = k < 0 ? -1 : 1;
          for (let I = 1; I <= 2; I++) {
            const F = Math.abs(k) * E[I - 1];
            for (const q of [-1, 1]) {
              const L = u + q * I;
              if (L >= 0 && L < de) {
                const U = N * F;
                Math.abs(U) > Math.abs(b[L]) && (b[L] = U);
              }
            }
          }
        }
        for (let u = 0; u < de; u++)
          Math.abs(b[u]) > Math.abs(S[u]) && (S[u] = b[u]);
      }
      for (let b = 0; b < de; b++) h[b * le + x] = S[b];
      c[x * 4] = i, c[x * 4 + 1] = f + 1, c[x * 4 + 2] = g, c[x * 4 + 3] = 1;
      const M = this.reachTimeline.get(y);
      if (M)
        for (const [b, E] of M) {
          const u = Math.floor((b - i) / this.nativeBucket);
          u >= 0 && u < de && (p[u * le + x] = Math.max(0, Math.min(1, E)));
        }
      this.columnMeta[x] = { timestamp_ms: y, price_min: i, price_step: this.nativeBucket, num_rows: f + 1, max_value: g, finalized: !0, values: S };
    }
    this.ringCount = v, e.bindTexture(e.TEXTURE_2D, this.dataTex), e.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, le, de, e.RED, e.FLOAT, h), e.bindTexture(e.TEXTURE_2D, this.metaTex), e.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, le, 1, e.RGBA, e.FLOAT, c), e.bindTexture(e.TEXTURE_2D, this.reachTex), e.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, le, de, e.RED, e.FLOAT, p), this.gpuDirty = !1;
  }
  render(e, s, o, a, r, l) {
    const i = this.gl, h = this.canvas;
    if (!i || !h || !this.program || (this.gpuDirty && this.syncGpuFromTimeline(), this.ringCount === 0)) return;
    this.viewTimeMin = e, this.viewTimeMax = s, this.viewPriceMin = o, this.viewPriceMax = a;
    const c = window.devicePixelRatio || 1, p = h.clientWidth, v = h.clientHeight;
    p < 10 || v < 10 || (h.width = Math.round(p * c), h.height = Math.round(v * c), i.viewport(0, 0, h.width, h.height), i.clearColor(0.1647, 0.1647, 0.1647, 1), i.clear(i.COLOR_BUFFER_BIT), i.useProgram(this.program), i.bindVertexArray(this.vao), i.activeTexture(i.TEXTURE0), i.bindTexture(i.TEXTURE_2D, this.dataTex), i.uniform1i(this.uniforms.u_data, 0), i.activeTexture(i.TEXTURE1), i.bindTexture(i.TEXTURE_2D, this.metaTex), i.uniform1i(this.uniforms.u_meta, 1), i.activeTexture(i.TEXTURE2), i.bindTexture(i.TEXTURE_2D, this.colormapTex), i.uniform1i(this.uniforms.u_colormap, 2), i.activeTexture(i.TEXTURE3), i.bindTexture(i.TEXTURE_2D, this.colormapWarmTex), i.uniform1i(this.uniforms.u_colormap_warm, 3), i.activeTexture(i.TEXTURE4), i.bindTexture(i.TEXTURE_2D, this.reachTex), i.uniform1i(this.uniforms.u_reach_data, 4), i.uniform2f(this.uniforms.u_plot_origin, r[0] * c, r[1] * c), i.uniform2f(this.uniforms.u_plot_size, l[0] * c, l[1] * c), i.uniform1f(this.uniforms.u_viewport_time_min, e / 1e3), i.uniform1f(this.uniforms.u_viewport_time_max, s / 1e3), i.uniform1f(this.uniforms.u_viewport_price_min, o), i.uniform1f(this.uniforms.u_viewport_price_max, a), i.uniform1f(this.uniforms.u_data_time_start, this.gpuOriginMs / 1e3), i.uniform1f(this.uniforms.u_observation_hold_until, this.observationHoldUntilMs / 1e3), i.uniform1f(this.uniforms.u_time_step, this.timeStepMs / 1e3), i.uniform1i(this.uniforms.u_ring_start, 0), i.uniform1i(this.uniforms.u_ring_count, this.ringCount), i.uniform1i(this.uniforms.u_ring_size, le), i.uniform1i(this.uniforms.u_max_rows, de), i.uniform1f(this.uniforms.u_bucket_size, this.nativeBucket || 0.01), i.uniform1i(this.uniforms.u_bucket_multiplier, this.bucketMultiplier), i.uniform1f(this.uniforms.u_sensitivity, this.sensitivity), i.uniform1f(this.uniforms.u_max_qty, this.globalMaxQty), i.uniform1f(this.uniforms.u_color_low, this.colorLow), i.uniform1f(this.uniforms.u_color_peak, this.colorPeak), i.uniform1i(this.uniforms.u_mode, this.mode === "liquidation" ? 1 : this.mode === "flow" ? 2 : 0), i.uniform1f(this.uniforms.u_opacity, this.opacity), i.uniform1i(this.uniforms.u_use_reach, this.useReach ? 1 : 0), i.uniform1i(this.uniforms.u_use_warm, 0), i.drawArrays(i.TRIANGLES, 0, 3), i.bindVertexArray(null));
  }
  dispose() {
    const e = this.gl;
    e && (this.dataTex && e.deleteTexture(this.dataTex), this.metaTex && e.deleteTexture(this.metaTex), this.reachTex && e.deleteTexture(this.reachTex), this.colormapTex && e.deleteTexture(this.colormapTex), this.colormapWarmTex && e.deleteTexture(this.colormapWarmTex), this.program && e.deleteProgram(this.program), this.vao && e.deleteVertexArray(this.vao), this.gl = null);
  }
}
const bs = T.lazy(() => Promise.resolve().then(() => as).then((t) => ({ default: t.DepthHeatPane }))), qe = [
  { label: "1s", ms: 1e3, sec: 1 },
  { label: "5s", ms: 5e3, sec: 5 },
  { label: "15s", ms: 15e3, sec: 15 },
  { label: "30s", ms: 3e4, sec: 30 },
  { label: "1m", ms: 6e4, sec: 60 },
  { label: "3m", ms: 18e4, sec: 180 },
  { label: "5m", ms: 3e5, sec: 300 },
  { label: "15m", ms: 9e5, sec: 900 },
  { label: "30m", ms: 18e5, sec: 1800 },
  { label: "1h", ms: 36e5, sec: 3600 },
  { label: "2h", ms: 72e5, sec: 7200 },
  { label: "4h", ms: 144e5, sec: 14400 },
  { label: "6h", ms: 216e5, sec: 21600 },
  { label: "12h", ms: 432e5, sec: 43200 },
  { label: "1D", ms: 864e5, sec: 86400 },
  { label: "1W", ms: 6048e5, sec: 604800 }
], it = [
  { id: "orderbook", label: "Orderbook" },
  { id: "liquidation", label: "Liquidations" },
  { id: "volume_delta", label: "Volume Delta" },
  { id: "trade_intensity", label: "Trade Intensity" },
  { id: "flow", label: "Flow & Positioning" }
];
function nt({ symbol: t, provider: e, onToggleKind: s, liqColormap: o, obColormap: a, opacity: r, intensity: l, gamma: i, noiseFloor: h, tickPerRow: c, halfLife: p, embedded: v }) {
  const y = T.useRef(null), d = T.useRef(null), x = T.useRef(null), S = T.useRef(null), f = T.useRef(0), g = T.useRef(null), [M, b] = T.useState(qe[4]), [E, u] = T.useState(() => {
    try {
      const m = localStorage.getItem("ed_fav_tf");
      return new Set(m ? JSON.parse(m) : ["1m", "5m", "15m", "1h", "4h", "1D"]);
    } catch {
      return /* @__PURE__ */ new Set(["1m", "5m", "15m", "1h", "4h", "1D"]);
    }
  }), [k, N] = T.useState("orderbook"), [I, F] = T.useState("ember"), [q, L] = T.useState("orderbook"), [U, H] = T.useState(l ?? 1), [z, J] = T.useState(r ?? 0.95), [ce, ge] = T.useState(c ?? 1);
  T.useEffect(() => {
    o && F(o);
  }, [o]), T.useEffect(() => {
    a && L(a);
  }, [a]), T.useEffect(() => {
    r !== void 0 && J(r);
  }, [r]), T.useEffect(() => {
    l !== void 0 && H(l);
  }, [l]), T.useEffect(() => {
    c !== void 0 && ge(c);
  }, [c]);
  const [ae, fe] = T.useState(!1), [ne, C] = T.useState(!1), [j, W] = T.useState(!0), [Ce, ye] = T.useState("loading"), [Y, xe] = T.useState([0, 0]), [_, $] = T.useState([Date.now() - 36e5, Date.now()]), [G, he] = T.useState(null), [Me, me] = T.useState(!1), [se, ze] = T.useState(e || "binance"), [Ae, re] = T.useState([]), [D, pe] = T.useState({ bid: null, ask: null }), [Te, Re] = T.useState(!1), [ke, Ke] = T.useState(!0), [Oe, Xe] = T.useState(!1);
  T.useEffect(() => {
    if (!Oe) return;
    const m = (B) => {
      B.target.closest("[data-mode-picker]") || Xe(!1);
    };
    return document.addEventListener("mousedown", m), () => document.removeEventListener("mousedown", m);
  }, [Oe]);
  const je = T.useMemo(() => se === "hyperliquid" ? 15 : se === "binance" ? 20 : se === "coinbase" ? 50 : 33, [se]);
  T.useEffect(() => {
    try {
      localStorage.setItem("ed_fav_tf", JSON.stringify([...E]));
    } catch {
    }
  }, [E]);
  const ft = T.useCallback((m, B) => {
    B?.preventDefault(), u((V) => {
      const Q = new Set(V);
      if (Q.has(m)) Q.delete(m);
      else {
        if (Q.size >= 6) {
          const te = Q.values().next().value;
          te && Q.delete(te);
        }
        Q.add(m);
      }
      return Q;
    });
  }, []);
  T.useEffect(() => {
    const m = y.current, B = x.current;
    if (!m || !B) return;
    const V = new ps();
    if (!V.attach(m)) {
      Re(!0);
      return;
    }
    V.setColumnInterval(M.ms), V.setMode(k), V.setLiqColormap(I), V.setObColormap(q), V.setSensitivity(U), V.setOpacity(z), V.setBucketMultiplier(ce), V.setReachModulation(ae), V.setLinearFiltering(ne), S.current = V;
    const te = new ResizeObserver(() => {
    });
    return te.observe(B), () => {
      te.disconnect(), V.dispose(), S.current = null;
    };
  }, []), T.useEffect(() => {
    const m = S.current;
    m && (m.setMode(k), m.setLiqColormap(I), m.setObColormap(q), m.setSensitivity(U), m.setOpacity(z), m.setBucketMultiplier(ce), m.setReachModulation(ae), m.setLinearFiltering(ne), m.setColumnInterval(M.ms));
  }, [k, I, q, U, z, ce, ae, ne, M.ms]), T.useEffect(() => {
    if (!ke) return;
    const m = setInterval(() => $([Date.now() - 36e5, Date.now()]), 1e3);
    return () => clearInterval(m);
  }, [ke]), T.useEffect(() => {
    let m = !1, B = null;
    const V = S.current;
    if (!V && !Te) return;
    const Q = async () => {
      ye("loading history...");
      let te = 0.5, P = !1;
      try {
        const be = Date.now(), we = be - 4 * 3600 * 1e3;
        let w = !1;
        try {
          const K = await fetch(`/api/orderflow/heatmap?symbol=${encodeURIComponent(t)}&provider=${encodeURIComponent(se)}&from=${we / 1e3}&to=${be / 1e3}&column_ms=${M.ms}&max_levels=80`);
          if (K.ok) {
            const X = await K.json(), A = X.columns || [];
            if (A.length) {
              X.bucket_size && (te = X.bucket_size);
              for (const R of A) {
                const O = /* @__PURE__ */ new Map(), Z = R.qtys || [], ee = R.price_min || 0, Ee = R.bucket_size || te || 0.5;
                for (let ve = 0; ve < Z.length; ve++) {
                  const Pe = Z[ve];
                  Math.abs(Pe) < 1e-4 || O.set(ee + ve * Ee, Pe);
                }
                O.size && (V?.processSnapshot(R.timestamp_ms, O, Ee), P = !0);
              }
              if (X.price_min && X.price_max) {
                const R = (X.price_max - X.price_min) * 0.15;
                xe([X.price_min - R, X.price_max + R]);
              }
              w = P, ye(`${se.toUpperCase()} ${je}ms ${k} — heatmap ${A.length} cols`);
            }
          }
        } catch {
        }
        if (!w) {
          const K = await fetch(`/api/orderflow/depth?symbol=${encodeURIComponent(t)}&provider=${encodeURIComponent(se)}&from=${we / 1e3}&to=${be / 1e3}&column_ms=${M.ms}&max_levels=80`);
          if (K.ok) {
            const X = await K.json(), A = X.events || [];
            for (const R of A)
              if (R.bids?.length || R.asks?.length) {
                const O = [...R.bids || [], ...R.asks || []];
                if (O.length) {
                  const ee = O.map(([ve]) => ve).sort((ve, Pe) => ve - Pe), Ee = ee.slice(1).map((ve, Pe) => ve - ee[Pe]).filter((ve) => ve > 0 && ve < 1e3);
                  Ee.length && (te = Math.min(...Ee));
                }
                const Z = /* @__PURE__ */ new Map();
                for (const [ee, Ee] of R.bids) Z.set(ee, (Z.get(ee) || 0) + Ee);
                for (const [ee, Ee] of R.asks) Z.set(ee, (Z.get(ee) || 0) + Ee);
                V?.processSnapshot(R.ts * 1e3, Z, te), P = !0;
              }
            if (re((X.trades || []).slice(-500)), A.length) {
              let R = 1 / 0, O = -1 / 0;
              for (const Z of A.slice(-30)) {
                for (const [ee] of Z.bids)
                  ee < R && (R = ee), ee > O && (O = ee);
                for (const [ee] of Z.asks)
                  ee < R && (R = ee), ee > O && (O = ee);
              }
              if (isFinite(R) && isFinite(O) && O > R) {
                const Z = (O - R) * 0.15;
                xe([R - Z, O + Z]), P = !0;
              }
            }
          }
        }
        try {
          const K = await fetch(`/api/orderflow/book?symbol=${encodeURIComponent(t)}&provider=${encodeURIComponent(se)}`);
          if (K.ok) {
            const X = await K.json(), A = X.best_bid ?? null, R = X.best_ask ?? null;
            if (pe({ bid: A, ask: R }), A !== null && R !== null) {
              const O = (A + R) / 2, Z = Math.max((R - A) * 10, O * 0.01);
              xe([O - Z, O + Z]), P = !0;
            }
          }
        } catch {
        }
        m || ye(P ? `${se.toUpperCase()} ${je}ms ${k} — live` : `${se.toUpperCase()} ${je}ms — waiting live book...`);
      } catch (be) {
        m || ye(`engine unreachable: ${be}`);
      }
      const ie = `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(t)}&provider=${encodeURIComponent(se)}`;
      try {
        B = new WebSocket(ie), B.onopen = () => {
          m || ye(`${se.toUpperCase()} ${je}ms ${k} — WS live`);
        }, B.onmessage = (be) => {
          if (!m)
            try {
              const we = JSON.parse(be.data);
              if (we.type === "depth") {
                const w = we.event, K = /* @__PURE__ */ new Map();
                for (const [R, O] of w.bids) K.set(R, (K.get(R) || 0) + O);
                for (const [R, O] of w.asks) K.set(R, (K.get(R) || 0) + O);
                V?.updateLiveColumn(w.ts * 1e3, K);
                let X = null, A = null;
                for (const [R] of w.bids) (X === null || R > X) && (X = R);
                for (const [R] of w.asks) (A === null || R < A) && (A = R);
                (X !== null || A !== null) && (pe({ bid: X, ask: A }), xe((R) => {
                  if (R[0] !== 0 || R[1] !== 0) return R;
                  if (X !== null && A !== null) {
                    const O = (X + A) / 2, Z = Math.max((A - X) * 10, O * 0.01);
                    return [O - Z, O + Z];
                  }
                  return R;
                }));
              } else we.type === "trade" && re((w) => [...w.slice(-499), we.event]);
            } catch {
            }
        }, B.onerror = () => {
          m || ye(`${se.toUpperCase()} WS error — retrying...`);
        }, B.onclose = () => {
          m || setTimeout(() => {
            m || Q();
          }, 2e3);
        };
      } catch {
      }
    };
    return Q(), () => {
      m = !0;
      try {
        B?.close();
      } catch {
      }
    };
  }, [t, se, M.ms, je, k, Te]), T.useEffect(() => {
    const m = y.current, B = d.current, V = x.current, Q = S.current;
    if (!m || !B || !V || !Q) return;
    const te = () => {
      const P = V.getBoundingClientRect();
      if (P.width < 10 || P.height < 10) {
        f.current = requestAnimationFrame(te);
        return;
      }
      const ue = window.devicePixelRatio || 1;
      B.width = Math.round(P.width * ue), B.height = Math.round(P.height * ue), B.style.width = `${P.width}px`, B.style.height = `${P.height}px`;
      let ie = Y;
      if (ie[0] === 0 && ie[1] === 0)
        if (D.bid !== null && D.ask !== null) {
          const K = (D.bid + D.ask) / 2, X = Math.max((D.ask - D.bid) * 10, K * 0.01);
          ie = [K - X, K + X];
        } else ie = [6e4, 7e4];
      const be = [0, 0], we = [P.width - 58, P.height - 20];
      Q.render(_[0], _[1], ie[0], ie[1], be, we);
      const w = B.getContext("2d");
      if (w) {
        w.setTransform(ue, 0, 0, ue, 0, 0), w.clearRect(0, 0, P.width, P.height), w.fillStyle = "#2a2a2a", w.fillRect(P.width - 58, 0, 58, P.height - 20), w.strokeStyle = "#3a3a3a", w.beginPath(), w.moveTo(P.width - 58, 0), w.lineTo(P.width - 58, P.height - 20), w.stroke(), w.fillStyle = "#262626", w.fillRect(0, P.height - 20, P.width, 20), w.beginPath(), w.moveTo(0, P.height - 20), w.lineTo(P.width, P.height - 20), w.stroke();
        const K = ie[1] - ie[0] || 1e3;
        w.fillStyle = "#e8e8e8", w.font = "10px monospace", w.textAlign = "right";
        for (let A = 0; A <= 4; A++) {
          const R = A / 4 * (P.height - 20), O = ie[1] - A / 4 * K;
          w.fillText(O.toFixed(2), P.width - 4, R + 10), w.strokeStyle = "#3a3a3a", w.beginPath(), w.moveTo(0, R), w.lineTo(P.width - 58, R), w.stroke();
        }
        const X = _[1] - _[0];
        w.textAlign = "center", w.fillStyle = "#b9b9b9";
        for (let A = 0; A <= 4; A++) {
          const R = A / 4 * (P.width - 58), O = new Date(_[0] + A / 4 * X);
          w.fillText(O.toLocaleTimeString(), R, P.height - 5);
        }
        if (G && (w.strokeStyle = "#d0d0d0", w.setLineDash([2, 2]), w.beginPath(), w.moveTo(G.x, 0), w.lineTo(G.x, P.height - 20), w.stroke(), w.beginPath(), w.moveTo(0, G.y), w.lineTo(P.width - 58, G.y), w.stroke(), w.setLineDash([]), w.fillStyle = "#e8e8e8", w.fillRect(G.x + 4, G.y - 20, 120, 18), w.fillStyle = "#1c1c1c", w.fillText(`${G.price.toFixed(2)} @ ${new Date(G.time).toLocaleTimeString()}`, G.x + 8, G.y - 8)), j && Ae.length)
          for (const A of Ae.slice(-100)) {
            const R = (A.ts * 1e3 - _[0]) / Math.max(X, 1) * (P.width - 58), O = (ie[1] - A.price) / Math.max(K, 1) * (P.height - 20);
            if (R < 0 || R > P.width - 58 || O < 0 || O > P.height - 20) continue;
            const Z = A.side === "BUY" || A.side === "B";
            w.fillStyle = Z ? "#21b3a4" : "#f0426c";
            const ee = Math.min(8, Math.max(2, Math.log10(A.size + 1) * 2));
            w.beginPath(), w.arc(R, O, ee, 0, Math.PI * 2), w.fill();
          }
        if (D.bid !== null) {
          const A = (ie[1] - D.bid) / Math.max(K, 1) * (P.height - 20);
          w.strokeStyle = "#21b3a4", w.setLineDash([4, 2]), w.beginPath(), w.moveTo(0, A), w.lineTo(P.width - 58, A), w.stroke(), w.setLineDash([]);
        }
        if (D.ask !== null) {
          const A = (ie[1] - D.ask) / Math.max(K, 1) * (P.height - 20);
          w.strokeStyle = "#f0426c", w.setLineDash([4, 2]), w.beginPath(), w.moveTo(0, A), w.lineTo(P.width - 58, A), w.stroke(), w.setLineDash([]);
        }
      }
      f.current = requestAnimationFrame(te);
    };
    return f.current = requestAnimationFrame(te), () => cancelAnimationFrame(f.current);
  }, [_, Y, G, Ae, j, D]);
  const mt = T.useCallback((m) => {
    m.preventDefault();
    const B = m.currentTarget.getBoundingClientRect(), V = B.width - 58;
    if (m.shiftKey) {
      const Q = Y[1] - Y[0] || 1e3, te = m.deltaY > 0 ? 1.1 : 0.9, P = (Y[0] + Y[1]) / 2, ue = Q * te / 2;
      xe([P - ue, P + ue]);
    } else {
      const Q = _[1] - _[0], te = m.deltaY > 0 ? 1.1 : 0.9, ue = (m.clientX - B.left) / Math.max(V, 1), ie = _[0] + ue * Q, be = Q * te;
      $([ie - ue * be, ie + (1 - ue) * be]);
    }
  }, [_, Y]), pt = T.useCallback((m) => {
    g.current = { x: m.clientX, y: m.clientY, t0: [..._], p0: [...Y] };
  }, [_, Y]), bt = T.useCallback((m) => {
    const B = m.currentTarget.getBoundingClientRect(), V = m.clientX - B.left, Q = m.clientY - B.top, te = B.width - 58, P = B.height - 20, ue = _[1] - _[0], ie = Y[1] - Y[0] || 1e3, be = (Y[0] + Y[1]) / 2 + (P / 2 - Q) / (P / ie), we = _[0] + V / Math.max(te, 1) * ue;
    if (he({ x: V, y: Q, price: be, time: we }), g.current && m.buttons & 1) {
      const w = m.clientX - g.current.x, K = m.clientY - g.current.y, X = w / Math.max(te, 1) * ue, A = K / Math.max(P, 1) * ie;
      $([g.current.t0[0] - X, g.current.t0[1] - X]);
      const R = g.current.p0[0] === 0 && g.current.p0[1] === 0 ? D.bid && D.ask ? [(D.bid + D.ask) / 2 - 500, (D.bid + D.ask) / 2 + 500] : [6e4, 7e4] : g.current.p0;
      xe([R[0] + A, R[1] + A]);
    }
  }, [_, Y, D]), gt = T.useCallback(() => {
    g.current = null;
  }, []), xt = T.useCallback(() => {
    g.current = null, he(null);
  }, []), Tt = T.useCallback(() => {
    if (Ke(!0), $([Date.now() - 36e5, Date.now()]), D.bid !== null && D.ask !== null) {
      const m = (D.bid + D.ask) / 2, B = Math.max((D.ask - D.bid) * 10, m * 0.01);
      xe([m - B, m + B]);
    }
  }, [D]);
  if (Te)
    return /* @__PURE__ */ n.jsx(T.Suspense, { fallback: /* @__PURE__ */ n.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-[var(--panel)] text-[var(--dim)] text-[11px]", children: "Loading fallback depth..." }), children: /* @__PURE__ */ n.jsx(bs, { symbol: t, sourceProvider: se, onToggleKind: s }) });
  const vt = qe.filter((m) => E.has(m.label));
  return qe.filter((m) => !E.has(m.label)), /* @__PURE__ */ n.jsxs("div", { className: "absolute inset-0 flex flex-col bg-[#1c1c1c] text-[#e8e8e8] select-none", children: [
    /* @__PURE__ */ n.jsxs("div", { className: "flex items-center gap-2 px-3 h-9 border-b border-[#2a2a2a] bg-[#1c1c1c] text-[12px] shrink-0", children: [
      /* @__PURE__ */ n.jsx("span", { className: "font-bold tracking-wider text-[11px] text-[#e8e8e8]", children: v ? "HEATMAP" : "EDGEDEPTH" }),
      /* @__PURE__ */ n.jsx("span", { className: "font-mono font-semibold text-[13px] text-[#e8e8e8]", children: t }),
      /* @__PURE__ */ n.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] truncate max-w-[260px]", children: Ce }),
      !v && /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
        /* @__PURE__ */ n.jsx("div", { className: "flex items-center gap-0.5 ml-2 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]", children: ["binance", "coinbase", "hyperliquid"].map((m) => /* @__PURE__ */ n.jsxs("button", { onClick: () => ze(m), className: `px-2.5 py-1 rounded-md text-[11px] font-medium ${se === m ? "bg-[#e8e8e8] text-[#1c1c1c]" : "bg-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`, title: `${m} ${m === "hyperliquid" ? "15ms" : m === "binance" ? "20ms" : "50ms"}`, children: [
          m.toUpperCase(),
          " ",
          m === "hyperliquid" ? "⚡" : ""
        ] }, m)) }),
        /* @__PURE__ */ n.jsx("div", { className: "flex items-center gap-1 ml-2", children: vt.slice(0, 6).map((m) => /* @__PURE__ */ n.jsx("button", { onClick: () => b(m), onContextMenu: (B) => {
          B.preventDefault(), ft(m.label, B);
        }, className: `px-2 py-1 rounded-md text-[11px] font-medium ${M.label === m.label ? "bg-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`, children: m.label }, m.label)) })
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "relative ml-2", "data-mode-picker": !0, children: [
        /* @__PURE__ */ n.jsxs(
          "button",
          {
            onClick: () => Xe((m) => !m),
            className: "flex items-center gap-2 pl-3 pr-7 py-1 rounded-md border border-[#3a3a3a] bg-[#262626] text-[11px] font-medium text-[#e8e8e8] hover:bg-[#343434] hover:border-[#4a4a4a] transition-colors",
            children: [
              it.find((m) => m.id === k)?.label || k,
              /* @__PURE__ */ n.jsx("span", { className: "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[#6a6a6a]", children: Oe ? "▲" : "▼" })
            ]
          }
        ),
        Oe && /* @__PURE__ */ n.jsxs("div", { className: "absolute top-full left-0 mt-2 z-30 w-[220px] rounded-xl border border-[#3a3a3a] bg-[#1c1c1c] shadow-2xl overflow-hidden", children: [
          /* @__PURE__ */ n.jsx("div", { className: "px-3 py-2 border-b border-[#2a2a2a] bg-[#222222] text-[10px] font-semibold tracking-wider text-[#b9b9b9]", children: "HEATMAP MODE" }),
          /* @__PURE__ */ n.jsx("div", { className: "p-1.5 grid gap-1", children: it.map((m) => /* @__PURE__ */ n.jsx(
            "button",
            {
              onClick: () => {
                N(m.id), Xe(!1);
              },
              className: `px-3 py-2 rounded-md text-left text-[12px] font-medium transition-colors ${k === m.id ? "bg-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
              children: m.label
            },
            m.id
          )) })
        ] })
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "ml-auto flex items-center gap-1.5", children: [
        /* @__PURE__ */ n.jsx("button", { onClick: () => Ke((m) => !m), className: `px-3 py-1 rounded-full border text-[11px] font-medium ${ke ? "bg-[#21b3a4]/10 border-[#21b3a4]/30 text-[#21b3a4]" : "bg-[#262626] border-[#3a3a3a] text-[#6a6a6a] hover:text-[#b9b9b9]"}`, children: ke ? "● FOLLOW" : "○ FREE" }),
        /* @__PURE__ */ n.jsx("button", { onClick: () => W((m) => !m), className: `px-2.5 py-1 rounded-md border text-[11px] ${j ? "bg-[#262626] border-[#4a4a4a] text-[#e8e8e8]" : "bg-transparent border-[#3a3a3a] text-[#6a6a6a] hover:text-[#b9b9b9]"}`, children: "Bubbles" }),
        /* @__PURE__ */ n.jsx("button", { onClick: () => Re(!0), className: "px-2.5 py-1 rounded-md border border-[#3a3a3a] bg-transparent text-[11px] text-[#6a6a6a] hover:bg-[#262626] hover:text-[#b9b9b9]", children: "Legacy" }),
        /* @__PURE__ */ n.jsx("button", { onClick: () => me((m) => !m), className: `w-7 h-7 rounded-md border flex items-center justify-center ${Me ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`, children: "⚙" }),
        s && /* @__PURE__ */ n.jsx("button", { onClick: s, className: "px-2.5 py-1 rounded-md border border-[#3a3a3a] bg-[#262626] text-[11px] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]", children: "Chart ⇄" })
      ] })
    ] }),
    /* @__PURE__ */ n.jsxs("div", { ref: x, className: "relative flex-1 min-h-0 w-full h-full bg-[#2a2a2a]", onWheel: mt, onMouseDown: pt, onMouseMove: bt, onMouseUp: gt, onMouseLeave: xt, onDoubleClick: Tt, children: [
      /* @__PURE__ */ n.jsx("canvas", { ref: y, className: "absolute inset-0 w-full h-full block", style: { width: "100%", height: "100%" } }),
      /* @__PURE__ */ n.jsx("canvas", { ref: d, className: "absolute inset-0 w-full h-full block pointer-events-none", style: { width: "100%", height: "100%" } }),
      Y[0] === 0 && Y[1] === 0 && !D.bid && /* @__PURE__ */ n.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none", children: [
        /* @__PURE__ */ n.jsxs("div", { className: "text-[12px] font-mono text-[#e8e8e8] opacity-70", children: [
          "Waiting for ",
          t,
          " depth — ",
          Ce
        ] }),
        /* @__PURE__ */ n.jsxs("div", { className: "text-[10px] text-[#b9b9b9] opacity-50 mt-1", children: [
          "Provider: ",
          se,
          " • TF: ",
          M.label,
          " • Flush: ",
          je,
          "ms"
        ] }),
        /* @__PURE__ */ n.jsx("div", { className: "text-[10px] text-[#b9b9b9] opacity-40 mt-2", children: "WS will fill after 1-2s. Click Legacy if WebGL2 fails." })
      ] })
    ] }),
    Me && /* @__PURE__ */ n.jsxs("div", { className: "absolute top-10 right-2 z-20 w-[340px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl p-3 text-[11px] space-y-3 max-h-[80vh] overflow-auto", children: [
      /* @__PURE__ */ n.jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ n.jsx("span", { className: "font-bold tracking-wider text-[10px] text-[#b9b9b9]", children: "HEATMAP TWEAKS — ADVANCED" }),
        /* @__PURE__ */ n.jsx("button", { onClick: () => me(!1), className: "text-[14px] text-[#b9b9b9] hover:text-[#e8e8e8]", children: "×" })
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ n.jsx("div", { className: "text-[10px] text-[#b9b9b9] uppercase", children: "Colormap — data colors exact EdgeDepth, chrome zinc" }),
        k === "liquidation" ? /* @__PURE__ */ n.jsx("div", { className: "flex gap-1", children: ["inferno", "ember", "viridis", "magma"].map((m) => /* @__PURE__ */ n.jsx("button", { onClick: () => F(m), className: `flex-1 py-1 rounded border text-[10px] capitalize ${I === m ? "bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]" : "border-[#3a3a3a] bg-[#2a2a2a] text-[#b9b9b9] hover:bg-[#343434]"}`, children: m }, m)) }) : /* @__PURE__ */ n.jsx("div", { className: "flex gap-1", children: ["orderbook", "deepdom", "bookmap", "realtime", "realtime_warm"].map((m) => /* @__PURE__ */ n.jsx("button", { onClick: () => L(m), className: `flex-1 py-1 rounded border text-[10px] capitalize ${q === m ? "bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]" : "border-[#3a3a3a] bg-[#2a2a2a] text-[#b9b9b9] hover:bg-[#343434]"}`, children: m }, m)) })
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ n.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ n.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Sensitivity ",
            U.toFixed(2)
          ] }),
          /* @__PURE__ */ n.jsx("input", { type: "range", min: 0.1, max: 3, step: 0.1, value: U, onChange: (m) => H(parseFloat(m.target.value)), className: "accent-[#d0d0d0]" })
        ] }),
        /* @__PURE__ */ n.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ n.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Opacity ",
            Math.round(z * 100),
            "%"
          ] }),
          /* @__PURE__ */ n.jsx("input", { type: "range", min: 0.1, max: 1, step: 0.05, value: z, onChange: (m) => J(parseFloat(m.target.value)), className: "accent-[#d0d0d0]" })
        ] })
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ n.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ n.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Bucket ×",
            ce
          ] }),
          /* @__PURE__ */ n.jsx("input", { type: "range", min: 1, max: 8, step: 1, value: ce, onChange: (m) => ge(parseInt(m.target.value)), className: "accent-[#d0d0d0]" })
        ] }),
        /* @__PURE__ */ n.jsxs("label", { className: "flex items-center gap-2 mt-4", children: [
          /* @__PURE__ */ n.jsx("input", { type: "checkbox", checked: ne, onChange: (m) => C(m.target.checked) }),
          /* @__PURE__ */ n.jsx("span", { className: "text-[10px] text-[#e8e8e8]", children: "Linear filter" })
        ] })
      ] }),
      k === "liquidation" && /* @__PURE__ */ n.jsxs("label", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ n.jsx("input", { type: "checkbox", checked: ae, onChange: (m) => fe(m.target.checked) }),
        /* @__PURE__ */ n.jsx("span", { className: "text-[10px] text-[#e8e8e8]", children: "Reach modulation" })
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "pt-2 border-t border-[#3a3a3a] space-y-1 text-[10px] text-[#b9b9b9]", children: [
        /* @__PURE__ */ n.jsx("div", { children: "• GPU ring buffer 8192×1024 R32F + meta + reach — exact EdgeDepth" }),
        /* @__PURE__ */ n.jsx("div", { children: "• Ultra-fast: Hyperliquid 15ms ⚡, Binance 20ms, Coinbase 50ms" }),
        /* @__PURE__ */ n.jsx("div", { children: "• Rolling 4h buffer — never blank, live_only from grid viewport" }),
        /* @__PURE__ */ n.jsx("div", { children: "• Chrome zinc, data Ember/Viridis/Magma/Inferno exact" }),
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
  os as D,
  xs as E,
  as as a
};
