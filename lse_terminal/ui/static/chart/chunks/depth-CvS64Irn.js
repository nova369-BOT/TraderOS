import { r as g, j as o, g as bt } from "./react-vendor-C0yw3i6b.js";
const tt = ["deepdom", "bookmap", "heat", "greyscale"], gt = [
  [0, [6, 2, 5]],
  [0.3, [58, 10, 16]],
  [0.55, [126, 26, 16]],
  [0.75, [206, 64, 12]],
  [0.9, [255, 140, 0]],
  [1, [255, 214, 96]]
], xt = [
  [0, [2, 5, 11]],
  [0.3, [6, 24, 50]],
  [0.55, [10, 48, 94]],
  [0.75, [13, 92, 112]],
  [0.9, [26, 190, 92]],
  [1, [126, 255, 152]]
], vt = [
  [0, [0, 0, 0]],
  [0.35, [8, 34, 61]],
  [0.6, [14, 107, 168]],
  [0.8, [110, 185, 228]],
  [0.9, [226, 244, 255]],
  [0.95, [255, 202, 62]],
  [1, [255, 92, 40]]
], Ge = [
  [0, [0, 0, 0]],
  [0.25, [0, 0, 255]],
  [0.55, [255, 255, 0]],
  [0.78, [255, 140, 0]],
  [1, [255, 0, 0]]
];
function qe(s, e) {
  switch (s) {
    case "deepdom":
      return e === "ask" ? gt : xt;
    case "bookmap":
      return vt;
    case "heat":
      return Ge;
    case "greyscale":
      return Ge;
  }
}
function Mt(s, e) {
  for (let t = 1; t < s.length; t++) {
    const [n, a] = s[t], [r, c] = s[t - 1];
    if (e <= n) {
      const i = (e - r) / (n - r);
      return [
        c[0] + (a[0] - c[0]) * i,
        c[1] + (a[1] - c[1]) * i,
        c[2] + (a[2] - c[2]) * i
      ];
    }
  }
  return s[s.length - 1][1];
}
function ze(s, e, t) {
  const n = new Uint8ClampedArray(1024), a = 1 - Math.min(1, Math.max(0, e.dimming)), r = 1 + e.contrast, c = e.brightness * 255, i = t >= 2 ? Math.ceil(256 / Math.min(t, 256)) : 1, l = (h) => {
    const u = h / 255;
    let v, y, d;
    s === null ? v = y = d = u * 255 : [v, y, d] = Mt(s, u);
    const b = (v + y + d) / 3;
    return v = b + (v - b) * e.intensity, y = b + (y - b) * e.intensity, d = b + (d - b) * e.intensity, v *= a, y *= a, d *= a, v = (v / 255 - 0.5) * r * 255 + 127.5 + c, y = (y / 255 - 0.5) * r * 255 + 127.5 + c, d = (d / 255 - 0.5) * r * 255 + 127.5 + c, [
      Math.min(255, Math.max(0, v)),
      Math.min(255, Math.max(0, y)),
      Math.min(255, Math.max(0, d))
    ];
  };
  for (let h = 0; h < 256; h++) {
    const u = i > 1 ? Math.min(Math.floor(h / i) * i + Math.floor(i / 2), 255) : h, [v, y, d] = l(u);
    n[h * 4] = v, n[h * 4 + 1] = y, n[h * 4 + 2] = d, n[h * 4 + 3] = 255;
  }
  return n;
}
function Ae(s, e) {
  const t = e !== void 0 ? e : s.smoothing, n = tt.includes(s.scheme) ? s.scheme : "heat";
  if (n === "greyscale") {
    const c = ze(null, s, t);
    return { ask: c, bid: c };
  }
  const a = ze(qe(n, "ask"), s, t), r = n === "deepdom" ? ze(qe(n, "bid"), s, t) : a;
  return { ask: a, bid: r };
}
function yt(s) {
  switch (s) {
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
const st = {
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
}, it = "lset-depth-global-scheme", nt = "lset-depth-global-apply", je = "lse-depth-global-scheme";
function Tt() {
  let s = "heat", e = !1;
  try {
    const t = localStorage.getItem(it);
    (t === "heat" || t === "greyscale" || t === "deepdom" || t === "bookmap") && (s = t), e = localStorage.getItem(nt) === "1";
  } catch {
  }
  return { scheme: s, apply: e };
}
function $e(s, e) {
  try {
    localStorage.setItem(it, s), localStorage.setItem(nt, e ? "1" : "0");
  } catch {
  }
}
function _t(s, e, t, n) {
  if (e === "exact") {
    let l = t, h = n;
    return h <= l && (h = l + Math.max(Math.abs(l) * 1e-6, 1e-9)), [l, h];
  }
  const a = s.filter((l) => l > 0).sort((l, h) => l - h);
  if (!a.length) return [0, 1];
  const r = (l) => {
    const h = Math.min(
      a.length - 1,
      Math.max(0, Math.round(l / 100 * (a.length - 1)))
    );
    return a[h];
  };
  let c = r(t), i = r(n);
  return i <= c && (i = c + Math.max(Math.abs(c) * 1e-6, 1e-9)), [c, i];
}
function wt(s, e, t, n = 1) {
  t <= e && (t = e + Math.max(Math.abs(e) * 1e-6, 1e-9));
  const a = Math.min(1, Math.max(0, (s - e) / (t - e)));
  return Math.round(Math.pow(a, n) * 255);
}
const Ee = "9px ui-monospace, Menlo, Consolas, monospace";
function St(s, e = 7) {
  const t = s / Math.max(1, e), n = Math.pow(10, Math.floor(Math.log10(Math.max(t, 1e-12))));
  for (const a of [1, 2, 2.5, 5, 10])
    if (t <= a * n) return a * n;
  return 10 * n;
}
function Oe(s, e) {
  const t = e >= 1 ? e >= 10 ? 0 : 1 : Math.min(6, Math.ceil(-Math.log10(e)));
  return s.toFixed(t);
}
function Ve(s, e, t, n, a, r, c) {
  s.save(), s.strokeStyle = "rgba(255, 255, 255, 0.06)", s.lineWidth = 1, s.setLineDash([2, 4]);
  const i = Math.ceil(a / c) * c;
  s.beginPath();
  for (let l = i; l <= r; l += c) {
    const h = Math.round(n(l)) + 0.5;
    h < 0 || h > e || (s.moveTo(h, 0), s.lineTo(h, t));
  }
  s.stroke(), s.restore();
}
function kt(s, e) {
  const { fieldW: t, cssW: n, cssH: a, centre: r, ppu: c, pLo: i, pHi: l } = e, h = (d) => a / 2 - (d - r) * c;
  s.fillStyle = "#0c0f14", s.fillRect(t, 0, n - t, a), s.strokeStyle = "#232a35", s.beginPath(), s.moveTo(t + 0.5, 0), s.lineTo(t + 0.5, a), s.stroke();
  const u = St(l - i), v = Math.ceil(i / u) * u;
  s.font = Ee, s.textAlign = "right", s.save(), s.setLineDash([1, 3]);
  for (let d = v; d <= l; d += u) {
    const b = Math.round(h(d)) + 0.5;
    b < 8 || b > a - 4 || (s.strokeStyle = "rgba(255, 255, 255, 0.05)", s.beginPath(), s.moveTo(0, b), s.lineTo(t, b), s.stroke(), s.strokeStyle = "#3a4453", s.beginPath(), s.moveTo(t, b), s.lineTo(t + 4, b), s.stroke(), e.fused || (s.fillStyle = "#8b96a5", s.fillText(Oe(d, u), n - 5, b + 3)));
  }
  s.restore();
  const y = (d, b, w) => {
    const f = h(d);
    f < 8 || f > a - 8 || (s.fillStyle = b, s.fillRect(t + 2, f - 8, n - t - 4, 16), s.fillStyle = w, s.font = `600 ${Ee}`, s.fillText(Oe(d, u), n - 5, f + 3), s.font = Ee);
  };
  if (e.bookAsk !== null && y(e.bookAsk, "rgba(239, 83, 80, 0.92)", "#2b0b0a"), e.bookBid !== null && y(e.bookBid, "rgba(38, 166, 154, 0.92)", "#06201c"), e.lastPrice !== null) {
    const d = h(e.lastPrice);
    d >= 0 && d <= a && (s.save(), s.strokeStyle = e.lastBuy ? "rgba(38, 166, 154, 0.65)" : "rgba(239, 83, 80, 0.65)", s.setLineDash([5, 4]), s.beginPath(), s.moveTo(0, Math.round(d) + 0.5), s.lineTo(t, Math.round(d) + 0.5), s.stroke(), s.restore(), d >= 8 && d <= a - 8 && (s.fillStyle = e.lastBuy ? "#26a69a" : "#ef5350", s.fillRect(t + 2, d - 8, n - t - 4, 16), s.fillStyle = "#08131a", s.font = `700 ${Ee}`, s.fillText(Oe(e.lastPrice, u), n - 5, d + 3), s.font = Ee));
  }
  s.textAlign = "left";
}
const Et = "9px ui-monospace, Menlo, Consolas, monospace", ot = "#26a69a", at = "#ef5350";
function Le(s) {
  return s >= 1e4 ? `${(s / 1e3).toFixed(0)}k` : s >= 1e3 ? `${(s / 1e3).toFixed(1)}k` : s >= 100 || s >= 10 ? s.toFixed(0) : s.toFixed(1);
}
function Rt(s, e, t, n, a, r, c, i) {
  const l = (h, u) => {
    s.strokeStyle = u, s.lineWidth = 1, s.beginPath();
    let v = null, y = 0;
    for (let d = t; d < n; d++) {
      const b = h(e[d]), w = a(e[d].tsMs), f = d + 1 < n ? a(e[d + 1].tsMs) : w + 1;
      if (b === null || b < c || b > i) {
        v = null;
        continue;
      }
      const x = Math.round(r(b)) + 0.5;
      v !== null ? (s.moveTo(y, v), s.lineTo(w, v), s.lineTo(w, x)) : s.moveTo(w, x), s.lineTo(f, x), v = x, y = f;
    }
    s.stroke();
  };
  l((h) => h.bb, "rgba(38, 166, 154, 0.85)"), l((h) => h.ba, "rgba(239, 83, 80, 0.85)");
}
function Ct(s, e, t, n, a, r, c, i, l) {
  if (l.alpha <= 0) return;
  s.save(), s.globalAlpha = l.alpha;
  const h = [];
  if (l.mode === "pie") {
    const u = Math.max(4, l.cssH / 80), v = Math.max(5, 1400 / Math.max(0.5, (n - t) / Math.max(1, l.fieldW))), y = /* @__PURE__ */ new Map();
    for (const d of e) {
      if (d.tsMs < t || d.tsMs > n || d.price < a || d.price > r) continue;
      const b = c(d.tsMs), w = i(d.price), f = `${Math.round(b / v)}:${Math.round(w / u)}`;
      let x = y.get(f);
      x || (x = { x: 0, y: 0, n: 0, size: 0, buy: 0, sell: 0 }, y.set(f, x)), x.x += b, x.y += w, x.n += 1, x.size += d.size, d.buy ? x.buy += d.size : x.sell += d.size;
    }
    for (const d of y.values()) h.push({ ...d, x: d.x / d.n, y: d.y / d.n });
  } else
    for (const u of e)
      u.tsMs < t || u.tsMs > n || u.price < a || u.price > r || h.push({
        x: c(u.tsMs),
        y: i(u.price),
        n: 1,
        size: u.size,
        buy: u.buy ? u.size : 0,
        sell: u.buy ? 0 : u.size
      });
  for (const u of h) {
    const v = Math.min(16, Math.max(2.5, Math.sqrt(u.size) * 0.9 * l.scale)), y = u.buy + u.sell, d = y > 0 ? u.buy / y : 0.5, b = -Math.PI / 2;
    if (s.beginPath(), s.moveTo(u.x, u.y), s.arc(u.x, u.y, v, b, b + d * Math.PI * 2), s.closePath(), s.fillStyle = ot, s.fill(), d < 1 && (s.beginPath(), s.moveTo(u.x, u.y), s.arc(u.x, u.y, v, b + d * Math.PI * 2, b + Math.PI * 2), s.closePath(), s.fillStyle = at, s.fill()), l.mode !== "solid") {
      const w = s.createRadialGradient(
        u.x - v * 0.35,
        u.y - v * 0.42,
        v * 0.1,
        u.x,
        u.y,
        v
      );
      w.addColorStop(0, "rgba(255, 255, 255, 0.5)"), w.addColorStop(0.45, "rgba(255, 255, 255, 0.08)"), w.addColorStop(0.85, "rgba(0, 0, 0, 0.18)"), w.addColorStop(1, "rgba(0, 0, 0, 0.5)"), s.beginPath(), s.arc(u.x, u.y, v, 0, Math.PI * 2), s.fillStyle = w, s.fill();
    }
    if (s.lineWidth = 1, s.strokeStyle = "rgba(0, 0, 0, 0.55)", s.beginPath(), s.arc(u.x, u.y, v, 0, Math.PI * 2), s.stroke(), l.bigK > 0 && l.bigMedian > 0 && u.size >= l.bigK * l.bigMedian) {
      const w = u.buy >= u.sell;
      s.beginPath(), s.arc(u.x, u.y, v + 3, 0, Math.PI * 2), s.lineWidth = 1.5, s.strokeStyle = w ? "rgba(38, 166, 154, 0.95)" : "rgba(239, 83, 80, 0.95)", s.stroke();
      const f = `${w ? "+" : "−"}${Le(u.size)}`;
      s.font = `700 ${Et}`;
      const x = s.measureText(f).width + 8;
      let T = u.x + v + 6;
      T + x > l.fieldW - 2 && (T = u.x - v - 6 - x);
      const p = Math.min(l.cssH - 16, Math.max(2, u.y - 8));
      s.fillStyle = w ? "rgba(38, 166, 154, 0.92)" : "rgba(239, 83, 80, 0.92)", s.fillRect(T, p, x, 14), s.fillStyle = "#08131a", s.fillText(f, T + 4, p + 10);
    }
  }
  s.restore();
}
function jt(s, e, t, n, a, r, c, i, l, h) {
  const v = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 36e5].find((b) => b / l >= 18) ?? 36e5, y = /* @__PURE__ */ new Map();
  for (const b of e) {
    if (b.tsMs < t || b.tsMs > n || b.price < a || b.price > r) continue;
    const w = Math.floor(b.tsMs / v);
    let f = y.get(w);
    f || (f = { o: b.price, h: b.price, l: b.price, c: b.price }, y.set(w, f)), f.h = Math.max(f.h, b.price), f.l = Math.min(f.l, b.price), f.c = b.price;
  }
  const d = Math.min(9, Math.max(2, v / l * 0.6));
  s.save(), s.globalAlpha = 0.92;
  for (const [b, w] of y) {
    const f = c(b * v + v / 2);
    if (f < -d || f > h + d) continue;
    const T = w.c >= w.o ? ot : at;
    s.strokeStyle = T, s.fillStyle = T, s.lineWidth = 1, s.beginPath(), s.moveTo(Math.round(f) + 0.5, i(w.h)), s.lineTo(Math.round(f) + 0.5, i(w.l)), s.stroke();
    const p = i(w.o), S = i(w.c), m = Math.min(p, S);
    s.fillRect(f - d / 2, m, d, Math.max(1, Math.abs(p - S)));
  }
  s.restore();
}
const Pt = 78, Nt = 16, rt = "9px ui-monospace, Menlo, Consolas, monospace";
function Dt(s, e, t, n, a, r, c, i, l) {
  s.fillStyle = "#0a0d12", s.fillRect(0, c, l, i - c), s.strokeStyle = "#232a35", s.beginPath(), s.moveTo(0, Math.round(c) + 0.5), s.lineTo(l, Math.round(c) + 0.5), s.stroke();
  const h = i - Nt - 2, u = h - c - 14;
  if (u < 8) return;
  const y = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 36e5].find((m) => m / r >= 5) ?? 36e5, d = /* @__PURE__ */ new Map();
  let b = 0;
  for (const m of e) {
    if (m.tsMs < t || m.tsMs > n) continue;
    const k = Math.floor(m.tsMs / y);
    let R = d.get(k);
    R || (R = { b: 0, s: 0 }, d.set(k, R)), m.buy ? R.b += m.size : R.s += m.size, b = Math.max(b, R.b, R.s);
  }
  const w = [...d.keys()].sort((m, k) => m - k);
  let f = 0, x = 0, T = 0;
  const p = [];
  for (const m of w) {
    const k = d.get(m);
    f += k.b - k.s, p.push([m, f]), x = Math.min(x, f), T = Math.max(T, f);
  }
  s.font = "600 8px ui-monospace, Menlo, monospace";
  const S = Math.floor(t / y) * y;
  for (let m = S; m <= n; m += y) {
    const k = a(m), R = a(m + y);
    if (R < -4 || k > l + 4) continue;
    const D = R - k, j = d.get(Math.floor(m / y));
    if (!j) continue;
    const z = Math.max(1, D * 0.36), N = k + D / 2, P = b > 0 ? j.s / b * u : 0, U = b > 0 ? j.b / b * u : 0;
    s.fillStyle = "rgba(239, 83, 80, 0.85)", s.fillRect(N - z - 0.5, h - P, z, P), s.fillStyle = "rgba(100, 165, 240, 0.85)", s.fillRect(N + 0.5, h - U, z, U), D >= 26 && (s.textAlign = "center", s.fillStyle = "rgba(255, 150, 147, 0.9)", s.fillText(Le(j.s), N - z / 2, h - P - 3), s.fillStyle = "rgba(147, 197, 253, 0.9)", s.fillText(Le(j.b), N + z / 2 + 1, h - U - 3));
  }
  if (p.length > 1 && T > x && (s.strokeStyle = "rgba(226, 238, 255, 0.6)", s.lineWidth = 1, s.beginPath(), p.forEach(([m, k], R) => {
    const D = a(m * y + y / 2), j = h - 2 - (k - x) / (T - x) * (u - 4);
    R === 0 ? s.moveTo(D, j) : s.lineTo(D, j);
  }), s.stroke()), f !== 0) {
    const m = `CVD ${f > 0 ? "+" : "−"}${Le(Math.abs(f))}`;
    s.font = `700 ${rt}`;
    const k = s.measureText(m).width + 8;
    s.fillStyle = "rgba(10, 13, 18, 0.85)", s.fillRect(l - k - 4, c + 3, k, 13), s.fillStyle = f > 0 ? "#26a69a" : "#ef5350", s.fillText(m, l - k, c + 13);
  }
  s.textAlign = "left";
}
function At(s, e, t, n) {
  let a = 0, r = 0;
  for (const b of e)
    b.tsMs < t || b.tsMs > n || (b.buy ? a += b.size : r += b.size);
  const c = a + r, i = c > 0 ? (a - r) / c : 0, l = c > 0 ? (a - r) / c : 0, h = 178, u = 44, v = 8, y = 8;
  s.save(), s.fillStyle = "rgba(10, 13, 18, 0.78)", s.fillRect(v, y, h, u), s.strokeStyle = "#232a35", s.strokeRect(v + 0.5, y + 0.5, h - 1, u - 1);
  const d = (b, w, f, x) => {
    s.font = `700 ${rt}`, s.fillStyle = "#8b96a5", s.fillText(b, v + 8, x + 7);
    const T = v + 40, p = 92, S = 6;
    s.fillStyle = "rgba(239, 83, 80, 0.55)", s.fillRect(T, x, p / 2, S), s.fillStyle = "rgba(38, 166, 154, 0.55)", s.fillRect(T + p / 2, x, p / 2, S);
    const m = T + p / 2 + (f ? w * (p / 2 - 2) : 0);
    s.fillStyle = f ? "#eef1f6" : "#5c6672", s.fillRect(m - 1, x - 2, 2, S + 4), s.textAlign = "right", s.fillStyle = f ? w >= 0 ? "#26a69a" : "#ef5350" : "#5c6672", s.fillText(f ? `${w >= 0 ? "+" : "−"}${Math.abs(Math.round(w * 100))}%` : "—", v + h - 8, x + 7), s.textAlign = "left";
  };
  d("IMB", i, c > 0, y + 8), d("CVD", l, c > 0, y + 26), s.restore();
}
function Lt(s) {
  return s >= 1e3 ? `${(s / 1e3).toFixed(1)}k` : s >= 100 ? s.toFixed(0) : s >= 1 ? s.toFixed(1) : s.toPrecision(2);
}
function Ut(s) {
  return s >= 1e3 ? s.toFixed(1) : s >= 1 ? s.toFixed(2) : Ft(s);
}
function Ft(s) {
  return s.toPrecision(4);
}
function zt(s, e, t, n) {
  const { bids: a, asks: r } = t.sorted();
  if (!a.length && !r.length) return;
  const c = (T) => e.fH / 2 - (T - e.centre) * e.ppu, i = n.activeRange > 0, l = [...a, ...r].filter(([T]) => T >= e.lo && T <= e.hi).map(([T]) => T).sort((T, p) => T - p);
  let h = 8;
  if (l.length >= 2) {
    const T = [];
    for (let p = 1; p < l.length; p++)
      T.push(l[p] - l[p - 1]);
    T.sort((p, S) => p - S), h = Math.min(20, Math.max(2.5, e.ppu * T[T.length >> 1]));
  }
  let u = 0;
  for (const [T, p] of [...a, ...r])
    T >= e.lo && T <= e.hi && (u = Math.max(u, p));
  const v = e.fieldW + 5, y = e.fieldW + 46, d = 22, b = e.cssW - 4, w = (T, p, S, m, k) => {
    const R = c(T);
    if (R < -h || R > e.fH + h) return;
    const D = R - h / 2, j = u > 0 ? Math.max(1.5, p / u * d) : 1.5;
    s.fillStyle = S === "bid" ? m ? "rgba(38,166,154,0.18)" : "rgba(38, 166, 154, 0.68)" : m ? "rgba(239,83,80,0.18)" : "rgba(239, 83, 80, 0.68)", s.fillRect(y, D, j, Math.max(1, h - 1)), s.font = k ? "700 9px ui-monospace, Menlo, monospace" : "9px ui-monospace, Menlo, monospace", s.textAlign = "left", s.fillStyle = m ? "#4a5260" : k ? S === "bid" ? "#26a69a" : "#ef5350" : "#8b96a5", s.fillText(Ut(T), v, R + 3), s.textAlign = "right", s.fillStyle = m ? "#4a5260" : S === "bid" ? "#9fd6cd" : "#f4b3ae", s.fillText(Lt(p), b, R + 3);
  }, f = a.length ? a[0][0] : null, x = r.length ? r[0][0] : null;
  if (a.forEach(([T, p], S) => {
    w(T, p, "bid", i && S >= n.activeRange, T === f);
  }), r.forEach(([T, p], S) => {
    w(T, p, "ask", i && S >= n.activeRange, T === x);
  }), i) {
    s.strokeStyle = "rgba(255, 179, 0, 0.75)", s.setLineDash([3, 3]);
    const T = [];
    a.length && n.activeRange <= a.length && T.push(c(a[n.activeRange - 1][0]) + h / 2 + 1), r.length && n.activeRange <= r.length && T.push(c(r[n.activeRange - 1][0]) - h / 2 - 1);
    for (const p of T)
      p < 0 || p > e.fH || (s.beginPath(), s.moveTo(e.fieldW, p), s.lineTo(e.cssW, p), s.stroke());
    s.setLineDash([]);
  }
  s.textAlign = "left";
}
const Ke = 14400, Ot = 220, It = 58, Bt = 96, $t = 228;
class Ht {
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
    this.settings = e, this.luts = Ae(e), this.off = document.createElement("canvas"), this.offCtx = this.off.getContext("2d"), this.glow = document.createElement("canvas"), this.glowCtx = this.glow.getContext("2d");
  }
  // ── public API ─────────────────────────────────────────────────────────
  attach(e) {
    this.canvas = e, this.ctx = e.getContext("2d"), new ResizeObserver(() => this.resize()).observe(e), this.resize();
    const n = () => {
      this.disposed || (this.dirty && this.paint(), this.raf = requestAnimationFrame(n));
    };
    this.raf = requestAnimationFrame(n);
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
    const e = this.settings.ladderMode === "fused" ? Bt : It;
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
    return this.settings.subpanes ? Pt : 0;
  }
  /** The field's drawable height (full canvas minus the context stack). */
  fieldH() {
    return Math.max(40, this.cssH - this.subH());
  }
  setSettings(e) {
    this.settings = e, this.luts = Ae(e, this.effSmoothing()), this.dirty = !0;
  }
  /** S4: resolved vertical-smoothing shade count (0 = no quantization).
   * Auto = zoom-adaptive: the tighter the price zoom, the finer the bands. */
  effSmoothing() {
    const e = this.settings;
    if (e.smoothingMode === "none") return 0;
    if (e.smoothingMode === "manual")
      return Math.min(20, Math.max(0, Math.round(e.smoothing)));
    const t = this.pxPerUnit ?? this.basePpu ?? 0;
    if (!t || !this.basePpu) return 24;
    const n = Math.max(0.02, t / this.basePpu);
    return Math.min(64, Math.max(4, Math.round(24 / Math.sqrt(n))));
  }
  setSyncedCrosshair(e) {
    this.syncedCrosshair !== e && (this.syncedCrosshair = e, this.dirty = !0);
  }
  /** Bulk history ingest (pane open, or a loaded recording). Deterministic
   * fold over the events; the dot trail belongs to the new timeline. */
  ingestHistory(e) {
    this.cols = [], this.state.clear(), this.stateSide.clear(), this.stateTs.clear(), this.cur.clear(), this.curSide.clear(), this.curTsMs = null, this.sizeSample = [], this.dots = [], this.tsLog = [], this.tsVersion = 0, this.recentSizes = [], this.bigMedian = 0, this.lastTradePrice = null;
    for (const t of e) this.foldEvent(t, !0);
    this.flushColumn(), this.recalcCutoffs(), this.follow = !0, this.priceCenter = null, this.pxPerUnit = null, this.dirty = !0;
  }
  /** One live depth frame (already coalesced engine-side). */
  applyDepth(e) {
    this.foldEvent(e, !1), this.sizeSample.length > 6e4 && (this.sizeSample = this.sizeSample.slice(-3e4), this.recalcCutoffs()), this.dirty = !0;
  }
  addTrade(e) {
    const t = e.side === "BUY" || e.side === "INFERRED-BUY";
    if (this.tsLog.push({ ts: e.ts, price: e.price, size: e.size, buy: t }), this.tsLog.length > 2e3 && this.tsLog.splice(0, this.tsLog.length - 1500), this.tsVersion += 1, !(e.size <= (this.settings.dotMinSize || 0))) {
      if (this.dots.push({ tsMs: e.ts * 1e3, price: e.price, size: e.size, buy: t }), this.dots.length > 5e3 && this.dots.splice(0, this.dots.length - 4e3), this.recentSizes.push(e.size), this.recentSizes.length > 1024 && this.recentSizes.splice(0, this.recentSizes.length - 512), this.recentSizes.length % 64 === 0 || this.bigMedian === 0) {
        const n = [...this.recentSizes].sort((a, r) => a - r);
        this.bigMedian = n[Math.floor(n.length / 2)] ?? 0;
      }
      this.lastTradePrice = e.price, this.lastTradeBuy = t, this.settings.recenterMode === "trades" && this.requestRecenter(e.price), this.dirty = !0;
    }
  }
  setBook(e, t) {
    if (this.bookBid = e, this.bookAsk = t, this.settings.recenterMode === "bbo") {
      const n = e !== null && t !== null ? (e + t) / 2 : e ?? t;
      n !== null && this.requestRecenter(n);
    }
    this.dirty = !0;
  }
  /** S9 auto-recentering: engage only when the anchor drifts beyond the
   * tolerance fraction of the visible half-range (prevents jitter). The
   * actual motion is eased in the paint loop; manual interaction cancels. */
  requestRecenter(e) {
    if (this.priceCenter === null || this.pxPerUnit === null) return;
    const n = this.fieldH() / 2 / this.pxPerUnit * Math.min(90, Math.max(1, this.settings.recenterTolerance)) / 100;
    Math.abs(e - this.priceCenter) > n && (this.recenterTarget = e, this.dirty = !0);
  }
  // ── interaction ───────────────────────────────────────────────────────
  wheel(e, t, n) {
    if (this.recenterTarget = null, n) {
      const a = Math.exp(-t * 1e-3);
      this.pxPerUnit = (this.pxPerUnit ?? this.autoPxPerUnit()) * a, this.settings.smoothingMode === "auto" && (this.luts = Ae(this.settings, this.effSmoothing()));
    } else {
      const a = Math.exp(t * 1e-3);
      this.msPerPx = Math.min(120, Math.max(0.5, this.msPerPx * a)), this.follow = !1;
    }
    this.dirty = !0;
  }
  drag(e, t) {
    this.recenterTarget = null, this.follow = !1, this.priceCenter = (this.priceCenter ?? this.autoPriceCenter()) + t / (this.pxPerUnit ?? this.autoPxPerUnit()), this.rightOffsetPx += e, this.rightOffsetPx = Math.max(-this.cssW, this.rightOffsetPx), this.dirty = !0;
  }
  recenter() {
    this.follow = !0, this.priceCenter = null, this.pxPerUnit = null, this.recenterTarget = null, this.dirty = !0;
  }
  setHover(e, t) {
    this.hover = e === null || t === null ? null : { x: e, y: t }, this.onHoverTime && this.onHoverTime(this.hover ? this.xToTs(this.hover.x) : null), this.dirty = !0;
  }
  // ── data folding (mirror of engine/orderflow/grid.py) ──────────────────
  columnMs() {
    return 1e3;
  }
  foldEvent(e, t) {
    const n = Math.floor(e.ts * 1e3), a = Math.floor(n / this.columnMs()) * this.columnMs();
    for (this.curTsMs === null && (this.curTsMs = a); a > this.curTsMs; ) this.advanceColumn();
    for (const [r, c] of e.bids) this.patchLevel(r, c, 0, t);
    for (const [r, c] of e.asks) this.patchLevel(r, c, 1, t);
    this.lastEventTs = Math.max(this.lastEventTs, n);
  }
  patchLevel(e, t, n, a) {
    const r = Math.round(e * 1e6) / 1e6;
    this.cur.set(r, t), t > 0 && this.curSide.set(r, n), t > 0 && a && this.sizeSample.length < 6e4 && this.sizeSample.push(t);
  }
  advanceColumn() {
    this.flushColumn(), this.curTsMs = (this.curTsMs ?? 0) + this.columnMs();
  }
  flushColumn() {
    if (this.curTsMs === null) return;
    for (const [c, i] of this.cur)
      i <= 0 ? (this.state.delete(c), this.stateSide.delete(c), this.stateTs.delete(c)) : (this.state.set(c, i), this.stateSide.set(c, this.curSide.get(c) ?? 0), this.stateTs.set(c, this.curTsMs));
    if (this.cur.clear(), this.curSide.clear(), this.state.size > 4096) {
      const c = [...this.stateTs.entries()].sort((l, h) => h[1] - l[1]).slice(0, 4096).map(([l]) => l), i = new Set(c);
      for (const l of [...this.state.keys()])
        i.has(l) || (this.state.delete(l), this.stateSide.delete(l), this.stateTs.delete(l));
    }
    const e = [...this.state.keys()].sort((c, i) => c - i), t = e.map((c) => this.state.get(c)), n = e.map((c) => this.stateSide.get(c) ?? 0);
    let a = null, r = null;
    for (let c = 0; c < e.length; c++)
      n[c] === 0 ? a = e[c] : r = r === null ? e[c] : r;
    this.cols.push({
      tsMs: this.curTsMs,
      keys: Float64Array.from(e),
      sizes: Float64Array.from(t),
      sides: Uint8Array.from(n),
      bb: a,
      ba: r
    }), this.cols.length > Ke && this.cols.splice(0, this.cols.length - Ke);
  }
  recalcCutoffs() {
    [this.lo, this.hi] = _t(
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
    const e = this.viewCentre, t = this.viewPpu, n = this.viewH;
    return {
      lo: this.viewLo,
      hi: this.viewHi,
      centre: e,
      ppu: t,
      cssH: n,
      version: this.viewVersion,
      yOf: (a) => n / 2 - (a - e) * t
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
    let e = 1 / 0, t = -1 / 0;
    const n = this.liveEdgeMs() - Math.min(this.fieldW(), 600) * this.msPerPx;
    for (let r = this.cols.length - 1; r >= 0; r--) {
      const c = this.cols[r];
      if (c.tsMs < n) break;
      c.keys.length && (e = Math.min(e, c.keys[0]), t = Math.max(t, c.keys[c.keys.length - 1]));
    }
    this.bookBid !== null && (e = Math.min(e, this.bookBid)), this.bookAsk !== null && (t = Math.max(t, this.bookAsk)), (!isFinite(e) || !isFinite(t)) && (e = 0, t = 1), t <= e && (t = e + 1);
    const a = (t - e) * 0.08;
    return [e - a, t + a];
  }
  autoPriceCenter() {
    const [e, t] = this.visiblePriceRange();
    return (e + t) / 2;
  }
  autoPxPerUnit() {
    const [e, t] = this.visiblePriceRange();
    return this.fieldH() / Math.max(t - e, 1e-9);
  }
  // ── painting ───────────────────────────────────────────────────────────
  paint() {
    this.dirty = !1;
    const e = this.ctx;
    if (!e || !this.cssW || !this.cssH || (e.setTransform(this.dpr, 0, 0, this.dpr, 0, 0), e.fillStyle = "#0b0e11", e.fillRect(0, 0, this.cssW, this.cssH), !this.cols.length)) return;
    if (this.recenterTarget !== null && this.priceCenter !== null) {
      const p = this.recenterTarget - this.priceCenter, S = Math.max(
        1e-9,
        this.fieldH() / 2 / (this.pxPerUnit ?? 1) / 240
      );
      Math.abs(p) <= S ? (this.priceCenter = this.recenterTarget, this.recenterTarget = null) : (this.priceCenter += p * 0.14, this.dirty = !0);
    }
    const [t, n] = this.visiblePriceRange(), a = this.fieldH(), r = this.pxPerUnit ?? a / Math.max(n - t, 1e-9);
    this.basePpu === null && (this.basePpu = r);
    const c = this.priceCenter ?? (t + n) / 2, i = (p) => a / 2 - (p - c) * r;
    this.viewLo = t, this.viewHi = n, this.viewCentre = c, this.viewPpu = r, this.viewH = a, this.viewVersion += 1;
    const l = this.fieldW(), h = this.settings.subpanes, u = this.xToTs(0), v = this.xToTs(l);
    let y = this.lowerBound(u), d = this.lowerBound(v);
    d = Math.min(d, this.cols.length), this.follow && this.rightOffsetPx <= 0 && (this.rightOffsetPx = 0);
    const b = h ? this.cssH - 14 : a;
    this.settings.view === "footprint" ? (this.paintFootprint(e, u, v, t, n, i, a), Ve(
      e,
      l,
      b,
      (p) => this.tsToX(p),
      u,
      v,
      this.niceTimeStep(l * this.msPerPx)
    )) : this.paintHeatField(e, y, d, u, v, t, n, i, l, a, b), h && (Dt(
      e,
      this.dots,
      u,
      v,
      (p) => this.tsToX(p),
      this.msPerPx,
      a,
      this.cssH,
      l
    ), this.settings.view === "heat" && At(e, this.dots, u, v));
    const w = (p, S) => {
      if (p === null || p < t || p > n) return;
      const m = i(p);
      e.strokeStyle = S, e.setLineDash([4, 3]), e.beginPath(), e.moveTo(0, m), e.lineTo(l, m), e.stroke(), e.setLineDash([]);
    };
    if (w(this.bookBid, "rgba(38, 166, 154, 0.55)"), w(this.bookAsk, "rgba(239, 83, 80, 0.55)"), this.syncedCrosshair !== null) {
      const p = this.tsToX(this.syncedCrosshair);
      p >= 0 && p <= l && (e.strokeStyle = "rgba(150, 160, 175, 0.55)", e.setLineDash([3, 3]), e.beginPath(), e.moveTo(p, 0), e.lineTo(p, a), e.stroke(), e.setLineDash([]));
    }
    if (this.hover) {
      const { x: p, y: S } = this.hover;
      p <= l && S <= a && (e.strokeStyle = "rgba(150, 160, 175, 0.45)", e.setLineDash([3, 3]), e.beginPath(), e.moveTo(p, 0), e.lineTo(p, a), e.moveTo(0, S), e.lineTo(l, S), e.stroke(), e.setLineDash([]));
      const m = c + (a / 2 - S) / r;
      e.fillStyle = "rgba(30, 34, 41, 0.95)", e.fillRect(l - 74, S - 9, 72, 18), e.fillStyle = "#d1d4dc", e.font = "10px monospace", e.textAlign = "right", e.fillText(m.toPrecision(6), l - 6, S + 3);
      const R = new Date(this.xToTs(p)).toISOString().slice(11, 19);
      e.fillRect(Math.min(p, l - 30) - 28, this.cssH - 16, 56, 15), e.textAlign = "center", e.fillText(R, Math.min(p, l - 30), this.cssH - 5);
    }
    e.fillStyle = "rgba(150,160,175,0.7)", e.font = "9px monospace", e.textAlign = "left";
    const f = this.niceTimeStep(l * this.msPerPx), x = Math.ceil(u / f) * f;
    for (let p = x; p <= v; p += f) {
      const S = this.tsToX(p);
      if (S > l - 52) continue;
      const m = new Date(p);
      e.fillText(m.toISOString().slice(11, 19), S + 2, this.cssH - 4), e.fillRect(S, this.cssH - 14, 1, 4);
    }
    const T = this.settings.ladderMode === "fused";
    kt(e, {
      fieldW: l,
      cssW: this.cssW,
      cssH: this.cssH,
      centre: c,
      ppu: r,
      pLo: t,
      pHi: n,
      bookBid: this.bookBid,
      bookAsk: this.bookAsk,
      lastPrice: this.lastTradePrice,
      lastBuy: this.lastTradeBuy,
      fused: T
    }), T && this.bookSource && zt(e, {
      fieldW: l,
      cssW: this.cssW,
      fH: a,
      centre: c,
      ppu: r,
      lo: t,
      hi: n
    }, this.bookSource, { activeRange: this.settings.activeRange });
  }
  /** V1+V2 heat field: intensity+side offscreen fold → per-side LUT
   * colourise → blit → glow → time grid → path → candles → bubbles →
   * volume strip. */
  paintHeatField(e, t, n, a, r, c, i, l, h, u, v) {
    const y = this.settings, d = Math.max(1, n - t), b = Ot, w = (i - c) / b;
    (this.off.width !== d || this.off.height !== b) && (this.off.width = d, this.off.height = b, this.glow.width = d, this.glow.height = b);
    const f = Math.min(1, Math.max(0.25, y.gamma || 1)), x = new Uint8ClampedArray(d * b), T = new Uint8Array(d * b).fill(255);
    for (let N = 0; N < d; N++) {
      const P = this.cols[t + N], { keys: U, sizes: L, sides: W } = P;
      for (let oe = 0; oe < U.length; oe++) {
        const me = U[oe];
        if (me < c || me > i) continue;
        const Y = L[oe];
        if (Y <= 0) continue;
        const te = Math.min(b - 1, Math.max(0, Math.floor((i - me) / w))) * d + N, E = wt(Y, this.lo, this.hi, f);
        E > x[te] && (x[te] = E, T[te] = W[oe]);
      }
    }
    const p = this.offCtx.createImageData(d, b), S = this.glowCtx.createImageData(d, b), m = p.data, k = S.data;
    for (let N = 0; N < x.length; N++) {
      const P = T[N];
      if (P === 255) continue;
      const U = P === 1 ? this.luts.ask : this.luts.bid, L = x[N] * 4, W = N * 4;
      m[W] = U[L], m[W + 1] = U[L + 1], m[W + 2] = U[L + 2], m[W + 3] = 255, x[N] >= $t && (k[W] = U[L], k[W + 1] = U[L + 1], k[W + 2] = U[L + 2], k[W + 3] = 255);
    }
    this.offCtx.putImageData(p, 0, 0), this.glowCtx.putImageData(S, 0, 0);
    const R = this.tsToX(this.cols[t].tsMs), D = this.tsToX(this.cols[t].tsMs + d * this.columnMs()), j = l(i), z = l(c);
    if (e.imageSmoothingEnabled = y.smoothColumns, e.drawImage(this.off, R, j, Math.max(1, D - R), Math.max(1, z - j)), e.imageSmoothingEnabled = !1, y.glow && (e.save(), e.globalCompositeOperation = "lighter", e.globalAlpha = 0.38, "filter" in e && (e.filter = "blur(6px)"), e.imageSmoothingEnabled = !0, e.drawImage(this.glow, R, j, Math.max(1, D - R), Math.max(1, z - j)), e.restore()), Ve(
      e,
      h,
      v,
      (N) => this.tsToX(N),
      a,
      r,
      this.niceTimeStep(h * this.msPerPx)
    ), y.showPath && Rt(e, this.cols, t, n, (N) => this.tsToX(N), l, c, i), y.showCandles && jt(
      e,
      this.dots,
      a,
      r,
      c,
      i,
      (N) => this.tsToX(N),
      l,
      this.msPerPx,
      h
    ), y.dots) {
      const N = y.dotType === "pie" ? "pie" : y.dotType === "solid" ? "solid" : "sphere";
      Ct(
        e,
        this.dots,
        a,
        r,
        c,
        i,
        (P) => this.tsToX(P),
        l,
        {
          alpha: Math.min(1, Math.max(0, y.dotAlpha)),
          scale: y.dotScale,
          mode: N,
          bigK: y.bigTradeK,
          bigMedian: this.bigMedian,
          fieldW: h,
          cssH: u
        }
      );
    }
  }
  /** Classic order-flow footprint: executed volume split by aggressor side
   * per price zone (rows) and time bucket (columns). Bucket width adapts to
   * the time zoom; zones snap to nice price steps. Imbalanced zones (≥3:1)
   * get a tinted backdrop; wide buckets print sell×buy figures. Prints
   * without a side never enter — the view stays honest about its data. */
  paintFootprint(e, t, n, a, r, c, i) {
    const h = [5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 36e5].find((m) => m / this.msPerPx >= 72) ?? 36e5, u = r - a, y = [
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
    ].find((m) => u / m <= 20) ?? u / 20, d = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map();
    let w = 0, f = 0;
    for (const m of this.dots) {
      if (m.tsMs < t || m.tsMs > n || m.price < a || m.price > r) continue;
      f += 1;
      const k = Math.floor(m.tsMs / h), R = Math.floor(m.price / y), D = k + ":" + R;
      let j = d.get(D);
      j || (j = { b: 0, s: 0 }, d.set(D, j)), m.buy ? j.b += m.size : j.s += m.size, w = Math.max(w, j.b, j.s);
      let z = b.get(k);
      z || (z = { b: 0, s: 0 }, b.set(k, z)), m.buy ? z.b += m.size : z.s += m.size;
    }
    if (!f) {
      e.fillStyle = "#5c6672", e.font = "11px ui-monospace, Menlo, monospace", e.textAlign = "center", e.fillText("no side-stamped prints in view", this.cssW / 2, i / 2 - 8), e.font = "10px ui-monospace, Menlo, monospace", e.fillText("the footprint builds from executed trades (demo and", this.cssW / 2, i / 2 + 10), e.fillText("crypto feeds carry sides; sources without prints stay blank)", this.cssW / 2, i / 2 + 24);
      return;
    }
    const x = (m) => m >= 1e3 ? `${(m / 1e3).toFixed(1)}k` : m >= 100 || m >= 10 ? m.toFixed(0) : m.toFixed(1), T = this.fieldW(), p = Math.min(22, Math.max(9, y * this.viewPpu * 0.85)), S = Math.floor(t / h) * h;
    for (let m = S; m <= n; m += h) {
      const k = this.tsToX(m), R = this.tsToX(m + h);
      if (R < -4 || k > T + 4) continue;
      const D = R - k, j = Math.floor(m / h), z = D >= 92, N = D / 2 - 4;
      e.strokeStyle = "rgba(30, 36, 47, 0.95)", e.beginPath(), e.moveTo(Math.round(R) + 0.5, 0), e.lineTo(Math.round(R) + 0.5, i), e.stroke();
      for (const [U, L] of d) {
        const [W, oe] = U.split(":");
        if (Number(W) !== j) continue;
        const me = Number(oe), Y = c((me + 0.5) * y);
        if (Y < -p || Y > i + p) continue;
        const le = Y - (p - 2) / 2, te = L.b >= L.s * 3 && L.b > 0 ? 1 : L.s >= L.b * 3 && L.s > 0 ? -1 : 0;
        te !== 0 && (e.fillStyle = te > 0 ? "rgba(38, 166, 154, 0.13)" : "rgba(239, 83, 80, 0.13)", e.fillRect(k + 2, le, D - 4, p - 2));
        const E = k + D / 2, C = w > 0 ? L.s / w * N : 0, A = w > 0 ? L.b / w * N : 0;
        e.fillStyle = "rgba(239, 83, 80, 0.75)", e.fillRect(E - 1 - C, le, C, p - 2), e.fillStyle = "rgba(38, 166, 154, 0.75)", e.fillRect(E + 1, le, A, p - 2), z && (e.font = "9px ui-monospace, Menlo, monospace", e.textAlign = "right", e.fillStyle = te < 0 ? "#ffc9c5" : "#b2807d", e.fillText(x(L.s), E - 4, Y + 3), e.textAlign = "left", e.fillStyle = te > 0 ? "#b8f2e9" : "#7fa8a1", e.fillText(x(L.b), E + 4, Y + 3));
      }
      const P = b.get(j);
      if (P) {
        const U = P.b - P.s;
        e.font = "9px ui-monospace, Menlo, monospace", e.textAlign = "center", e.fillStyle = U > 0 ? "#26a69a" : U < 0 ? "#ef5350" : "#8b96a5", e.fillText(
          `Δ${U >= 0 ? "+" : "−"}${x(Math.abs(U))} · ${x(P.b + P.s)}`,
          k + D / 2,
          i - 6
        );
      }
    }
  }
  lowerBound(e) {
    let t = 0, n = this.cols.length;
    for (; t < n; ) {
      const a = t + n >> 1;
      this.cols[a].tsMs < e ? t = a + 1 : n = a;
    }
    return Math.max(0, t - 1);
  }
  niceTimeStep(e) {
    const t = [
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
    for (const n of t) if (e / n <= 12) return n;
    return 864e5;
  }
}
function q({ label: s, children: e, hint: t }) {
  return /* @__PURE__ */ o.jsxs("div", { className: "dh-row", title: t, children: [
    /* @__PURE__ */ o.jsx("span", { className: "dh-label", children: s }),
    e
  ] });
}
function fe({ label: s, value: e, min: t, max: n, step: a, onChange: r, fmt: c, hint: i, disabled: l }) {
  return /* @__PURE__ */ o.jsxs("div", { className: "dh-row", style: l ? { opacity: 0.45 } : void 0, title: i, children: [
    /* @__PURE__ */ o.jsx("span", { className: "dh-label", children: s }),
    /* @__PURE__ */ o.jsx(
      "input",
      {
        className: "dh-slider",
        type: "range",
        min: t,
        max: n,
        step: a,
        value: e,
        disabled: l,
        onChange: (h) => r(Number(h.target.value))
      }
    ),
    /* @__PURE__ */ o.jsx("span", { className: "dh-value", children: (c ?? ((h) => h.toFixed(2)))(e) })
  ] });
}
function Se({ options: s, value: e, onChange: t }) {
  return /* @__PURE__ */ o.jsx("div", { className: "dh-seg", role: "tablist", children: s.map((n) => /* @__PURE__ */ o.jsx(
    "button",
    {
      role: "tab",
      "aria-selected": n.id === e,
      className: n.id === e ? "on" : "",
      title: n.title,
      onClick: () => t(n.id),
      children: n.label
    },
    n.id
  )) });
}
function be({ on: s, onChange: e, label: t }) {
  return /* @__PURE__ */ o.jsx(
    "button",
    {
      className: `dh-toggle${s ? " on" : ""}`,
      role: "switch",
      "aria-checked": s,
      onClick: () => e(!s),
      title: t
    }
  );
}
function Re({ value: s, onCommit: e, min: t, max: n, disabled: a, suffix: r }) {
  const [c, i] = bt.useState(String(s));
  g.useEffect(() => {
    i(String(s));
  }, [s]);
  const l = () => {
    let h = Number(c);
    if (!isFinite(h)) {
      i(String(s));
      return;
    }
    t !== void 0 && (h = Math.max(t, h)), n !== void 0 && (h = Math.min(n, h)), i(String(h)), e(h);
  };
  return /* @__PURE__ */ o.jsxs("span", { style: { display: "inline-flex", alignItems: "center", gap: 4 }, children: [
    /* @__PURE__ */ o.jsx(
      "input",
      {
        className: "dh-num",
        value: c,
        disabled: a,
        onChange: (h) => i(h.target.value),
        onBlur: l,
        onKeyDown: (h) => {
          h.key === "Enter" && h.target.blur();
        }
      }
    ),
    r && /* @__PURE__ */ o.jsx("span", { className: "dh-hint", children: r })
  ] });
}
function Xt({ settings: s }) {
  const e = g.useRef(null);
  return g.useEffect(() => {
    const t = e.current;
    if (!t) return;
    t.width = 256, t.height = 14;
    const n = t.getContext("2d"), { ask: a, bid: r } = Ae({ ...s }), c = n.createImageData(256, 14);
    for (let i = 0; i < 256; i++)
      for (let l = 0; l < 14; l++) {
        const h = l < 7 ? a : r, u = (l * 256 + i) * 4;
        c.data[u] = h[i * 4], c.data[u + 1] = h[i * 4 + 1], c.data[u + 2] = h[i * 4 + 2], c.data[u + 3] = 255;
      }
    n.putImageData(c, 0, 0);
  }, [
    s.scheme,
    s.intensity,
    s.dimming,
    s.contrast,
    s.brightness,
    s.gamma
  ]), /* @__PURE__ */ o.jsx("canvas", { ref: e });
}
function Wt({
  symbol: s,
  settings: e,
  cutoffRange: t,
  onChange: n,
  onClose: a
}) {
  g.useEffect(() => {
    const i = (l) => {
      l.key === "Escape" && a();
    };
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [a]);
  const r = e, c = g.useMemo(() => {
    if (!t) return null;
    const i = (l) => l >= 100 ? l.toFixed(0) : l >= 1 ? l.toFixed(2) : l.toPrecision(3);
    return `${i(t[0])} → ${i(t[1])}`;
  }, [t]);
  return /* @__PURE__ */ o.jsx("div", { className: "dh-backdrop", onMouseDown: a, children: /* @__PURE__ */ o.jsxs("div", { className: "dh-window", onMouseDown: (i) => i.stopPropagation(), children: [
    /* @__PURE__ */ o.jsxs("div", { className: "dh-head", children: [
      /* @__PURE__ */ o.jsx("span", { className: "dh-head-title", children: "DEPTH HEAT · SETTINGS" }),
      /* @__PURE__ */ o.jsx("span", { className: "dh-head-sym", children: s }),
      /* @__PURE__ */ o.jsx("button", { className: "dh-close", onClick: a, title: "Close (Esc)", children: "✕" })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "dh-body", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "dh-section", children: [
        /* @__PURE__ */ o.jsx("div", { className: "dh-section-title", children: "COLOUR" }),
        /* @__PURE__ */ o.jsx("div", { className: "dh-schemes", children: tt.map((i) => /* @__PURE__ */ o.jsxs(
          "button",
          {
            className: `dh-scheme${r.scheme === i ? " on" : ""}`,
            title: yt(i),
            onClick: () => {
              n({ scheme: i }), r.applySchemeGlobally && ($e(i, !0), window.dispatchEvent(new CustomEvent(
                je,
                { detail: { scheme: i, source: s } }
              )));
            },
            children: [
              /* @__PURE__ */ o.jsx("div", { className: "dh-scheme-name", children: i === "deepdom" ? "DEEPDOM" : i === "bookmap" ? "BOOKMAP" : i === "heat" ? "HEAT" : "GREYSCALE" }),
              /* @__PURE__ */ o.jsx(Xt, { settings: { ...r, scheme: i } })
            ]
          },
          i
        )) }),
        /* @__PURE__ */ o.jsx(
          fe,
          {
            label: "Intensity",
            value: r.intensity,
            min: 0,
            max: 2,
            step: 0.05,
            onChange: (i) => n({ intensity: i }),
            hint: "Chroma strength. 1 = true scheme colours, 0 = luminance only."
          }
        ),
        /* @__PURE__ */ o.jsx(
          fe,
          {
            label: "Dimming",
            value: r.dimming,
            min: 0,
            max: 0.9,
            step: 0.02,
            onChange: (i) => n({ dimming: i }),
            hint: "Dims the whole field toward black for dark rooms."
          }
        ),
        /* @__PURE__ */ o.jsxs(
          q,
          {
            label: "Apply scheme globally",
            hint: "Persists the colour scheme terminal-wide; every Depth Heat pane follows it.",
            children: [
              /* @__PURE__ */ o.jsx(be, { on: r.applySchemeGlobally, onChange: (i) => {
                $e(r.scheme, i), n({ applySchemeGlobally: i }), window.dispatchEvent(new CustomEvent(
                  je,
                  { detail: { scheme: r.scheme, source: s } }
                ));
              } }),
              /* @__PURE__ */ o.jsx("span", { className: "dh-hint", children: "all symbols use this scheme" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "dh-section", children: [
        /* @__PURE__ */ o.jsx("div", { className: "dh-section-title", children: "FIELD & OVERLAYS" }),
        /* @__PURE__ */ o.jsx(
          fe,
          {
            label: "Intensity γ",
            value: r.gamma,
            min: 0.25,
            max: 1,
            step: 0.05,
            onChange: (i) => n({ gamma: i }),
            hint: "Perceptual exponent: <1 lifts small liquidity out of the dark and lets walls saturate (the reference feel). 1 = linear."
          }
        ),
        /* @__PURE__ */ o.jsx(
          q,
          {
            label: "Wall glow",
            hint: "Bloom pass over the hottest levels — walls burn against a calm field.",
            children: /* @__PURE__ */ o.jsx(be, { on: r.glow, onChange: (i) => n({ glow: i }) })
          }
        ),
        /* @__PURE__ */ o.jsx(
          q,
          {
            label: "Smooth columns",
            hint: "Bilinear blend between columns (watercolour feel). Off = crisp terminal columns.",
            children: /* @__PURE__ */ o.jsx(
              be,
              {
                on: r.smoothColumns,
                onChange: (i) => n({ smoothColumns: i })
              }
            )
          }
        ),
        /* @__PURE__ */ o.jsx(
          q,
          {
            label: "Price path",
            hint: "Stepped bid/ask lines from the carried book — the Bookmap/DeepDom signature overlay.",
            children: /* @__PURE__ */ o.jsx(be, { on: r.showPath, onChange: (i) => n({ showPath: i }) })
          }
        ),
        /* @__PURE__ */ o.jsxs(
          q,
          {
            label: "Candles over heat",
            hint: "OHLC candles derived from the executed print stream (trade-derived — no invented feed).",
            children: [
              /* @__PURE__ */ o.jsx(
                be,
                {
                  on: r.showCandles,
                  onChange: (i) => n({ showCandles: i })
                }
              ),
              /* @__PURE__ */ o.jsx("span", { className: "dh-hint", children: "trade-derived" })
            ]
          }
        ),
        /* @__PURE__ */ o.jsx(
          q,
          {
            label: "Context strips",
            hint: "V3 bottom stack sharing the time axis: buy/sell-split volume histogram + CVD line, and the Imb/Cvd gauges top-left.",
            children: /* @__PURE__ */ o.jsx(
              be,
              {
                on: r.subpanes,
                onChange: (i) => n({ subpanes: i })
              }
            )
          }
        ),
        /* @__PURE__ */ o.jsx(
          fe,
          {
            label: "Big-trade ×",
            value: r.bigTradeK,
            min: 2,
            max: 12,
            step: 1,
            onChange: (i) => n({ bigTradeK: i }),
            fmt: (i) => `${i.toFixed(0)}×med`,
            hint: "Prints at or above this multiple of the rolling median size get a ring + size tag."
          }
        )
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "dh-section", children: [
        /* @__PURE__ */ o.jsx("div", { className: "dh-section-title", children: "CUT-OFF" }),
        /* @__PURE__ */ o.jsxs(q, { label: "Mode", hint: "Percentile: relative to this session's sizes. Exact: fixed size thresholds.", children: [
          /* @__PURE__ */ o.jsx(
            Se,
            {
              value: r.cutoffMode,
              onChange: (i) => n({ cutoffMode: i }),
              options: [
                { id: "percentile", label: "Percentile" },
                { id: "exact", label: "Exact size" }
              ]
            }
          ),
          c && /* @__PURE__ */ o.jsx("span", { className: "dh-hint", title: "Resolved cut-off sizes currently in effect", children: c })
        ] }),
        r.cutoffMode === "percentile" ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
          /* @__PURE__ */ o.jsx(
            fe,
            {
              label: "Lower",
              value: r.cutoffLower,
              min: 0,
              max: 99,
              step: 1,
              onChange: (i) => n({
                cutoffLower: i,
                cutoffUpper: Math.max(i + 1, r.cutoffUpper)
              }),
              fmt: (i) => `${i.toFixed(0)}%`,
              hint: "Sizes at/below this percentile render solid bottom colour."
            }
          ),
          /* @__PURE__ */ o.jsx(
            fe,
            {
              label: "Upper",
              value: r.cutoffUpper,
              min: 1,
              max: 100,
              step: 1,
              onChange: (i) => n({
                cutoffUpper: i,
                cutoffLower: Math.min(i - 1, r.cutoffLower)
              }),
              fmt: (i) => `${i.toFixed(0)}%`,
              hint: "Sizes at/above this percentile saturate to the top colour."
            }
          )
        ] }) : /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
          /* @__PURE__ */ o.jsx(q, { label: "Lower size", children: /* @__PURE__ */ o.jsx(
            Re,
            {
              value: r.cutoffLower,
              min: 0,
              onCommit: (i) => n({
                cutoffLower: i,
                cutoffUpper: Math.max(i + 1e-9, r.cutoffUpper)
              })
            }
          ) }),
          /* @__PURE__ */ o.jsx(q, { label: "Upper size", children: /* @__PURE__ */ o.jsx(
            Re,
            {
              value: r.cutoffUpper,
              min: 0,
              onCommit: (i) => n({
                cutoffUpper: i,
                cutoffLower: Math.min(i - 1e-9, r.cutoffLower)
              })
            }
          ) })
        ] }),
        /* @__PURE__ */ o.jsx("div", { className: "dh-row", children: /* @__PURE__ */ o.jsx("span", { className: "dh-hint", style: { marginLeft: 128 }, children: "The contrast slider above the pane narrows/widens this same window." }) })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "dh-section", children: [
        /* @__PURE__ */ o.jsx("div", { className: "dh-section-title", children: "VERTICAL SMOOTHING" }),
        /* @__PURE__ */ o.jsx(q, { label: "Mode", hint: "Auto adapts the shade count to your price zoom.", children: /* @__PURE__ */ o.jsx(
          Se,
          {
            value: r.smoothingMode,
            onChange: (i) => n({ smoothingMode: i }),
            options: [
              { id: "auto", label: "Auto" },
              { id: "manual", label: "Manual" },
              { id: "none", label: "None" }
            ]
          }
        ) }),
        /* @__PURE__ */ o.jsx(
          fe,
          {
            label: "Shades",
            value: r.smoothing,
            min: 0,
            max: 20,
            step: 1,
            disabled: r.smoothingMode !== "manual",
            onChange: (i) => n({ smoothing: i }),
            fmt: (i) => i < 2 ? "off" : i.toFixed(0),
            hint: "Number of flat gradient bands. 0–1 = no quantization."
          }
        )
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "dh-section", children: [
        /* @__PURE__ */ o.jsx("div", { className: "dh-section-title", children: "ADVANCED COLOUR" }),
        /* @__PURE__ */ o.jsx(
          fe,
          {
            label: "Contrast",
            value: r.contrast,
            min: -0.6,
            max: 1,
            step: 0.02,
            onChange: (i) => n({ contrast: i }),
            hint: "Final-output contrast around mid grey."
          }
        ),
        /* @__PURE__ */ o.jsx(
          fe,
          {
            label: "Brightness",
            value: r.brightness,
            min: -0.5,
            max: 0.5,
            step: 0.02,
            onChange: (i) => n({ brightness: i }),
            hint: "Final-output brightness offset."
          }
        )
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "dh-section", children: [
        /* @__PURE__ */ o.jsx("div", { className: "dh-section-title", children: "VOLUME DOTS" }),
        /* @__PURE__ */ o.jsx(q, { label: "Show executed trades", children: /* @__PURE__ */ o.jsx(be, { on: r.dots, onChange: (i) => n({ dots: i }) }) }),
        /* @__PURE__ */ o.jsx(
          q,
          {
            label: "Drawing type",
            hint: "Pie aggregates prints per price-time cell and splits the disc by aggressor-side volume.",
            children: /* @__PURE__ */ o.jsx(
              Se,
              {
                value: r.dotType,
                onChange: (i) => n({ dotType: i }),
                options: [
                  { id: "gradient", label: /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
                    /* @__PURE__ */ o.jsx("span", { className: "dh-dotglyph gradient" }),
                    "Gradient"
                  ] }) },
                  { id: "solid", label: /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
                    /* @__PURE__ */ o.jsx("span", { className: "dh-dotglyph solid" }),
                    "Solid"
                  ] }) },
                  { id: "pie", label: /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
                    /* @__PURE__ */ o.jsx("span", { className: "dh-dotglyph pie" }),
                    "Pie"
                  ] }) }
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ o.jsx(q, { label: "Min accountable size", hint: "Prints below this size draw no dot.", children: /* @__PURE__ */ o.jsx(
          Re,
          {
            value: r.dotMinSize,
            min: 0,
            disabled: !r.dots,
            onCommit: (i) => n({ dotMinSize: i })
          }
        ) }),
        /* @__PURE__ */ o.jsx(
          fe,
          {
            label: "Dot size",
            value: r.dotScale,
            min: 0.2,
            max: 3,
            step: 0.05,
            disabled: !r.dots,
            onChange: (i) => n({ dotScale: i })
          }
        ),
        /* @__PURE__ */ o.jsx(
          fe,
          {
            label: "Transparency",
            value: 1 - r.dotAlpha,
            min: 0,
            max: 0.95,
            step: 0.02,
            disabled: !r.dots,
            onChange: (i) => n({ dotAlpha: 1 - i }),
            fmt: (i) => `${Math.round(i * 100)}%`
          }
        )
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "dh-section", children: [
        /* @__PURE__ */ o.jsx("div", { className: "dh-section-title", children: "BOOK & MOTION" }),
        /* @__PURE__ */ o.jsx(
          q,
          {
            label: "Ladder",
            hint: "V4: fused puts the size figures + bars inside the price-axis gutter (Bookmap layout); panel keeps the separate COB column.",
            children: /* @__PURE__ */ o.jsx(
              Se,
              {
                value: r.ladderMode,
                onChange: (i) => n({ ladderMode: i }),
                options: [
                  { id: "fused", label: "Fused", title: "Ladder in the axis gutter" },
                  { id: "panel", label: "Panel", title: "Separate COB column" }
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ o.jsx(
          q,
          {
            label: "Time & sales",
            hint: "V4 drawer: every executed print with min-size and ALL/BUY/SELL filters.",
            children: /* @__PURE__ */ o.jsx(
              be,
              {
                on: r.showTsPanel,
                onChange: (i) => n({ showTsPanel: i })
              }
            )
          }
        ),
        /* @__PURE__ */ o.jsxs(
          q,
          {
            label: "COB column",
            hint: "S8: the numeric DOM ladder beside the heatmap — per-level size + cumulative, spread and BBO rows.",
            children: [
              /* @__PURE__ */ o.jsx(be, { on: r.cob, onChange: (i) => n({ cob: i }) }),
              /* @__PURE__ */ o.jsx("span", { className: "dh-hint", style: { marginLeft: r.cob ? 0 : 8 }, children: "cumulative column" }),
              /* @__PURE__ */ o.jsx(
                be,
                {
                  on: r.cobCumulative,
                  onChange: (i) => n({ cobCumulative: i })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ o.jsxs(
          q,
          {
            label: "Active range",
            hint: "S6 override: expose only N levels around mid instead of the full transmitted book. Amber boundary lines mark the window on the COB column.",
            children: [
              /* @__PURE__ */ o.jsx(
                be,
                {
                  on: r.activeRange > 0,
                  onChange: (i) => n({ activeRange: i ? 10 : 0 })
                }
              ),
              /* @__PURE__ */ o.jsx(
                Re,
                {
                  value: r.activeRange || 10,
                  min: 1,
                  max: 200,
                  disabled: r.activeRange === 0,
                  suffix: "levels",
                  onCommit: (i) => n({ activeRange: Math.round(i) })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ o.jsx(
          q,
          {
            label: "Auto-recenter",
            hint: "S9: glides the price axis back when the anchor drifts beyond tolerance. Double-click recenters instantly.",
            children: /* @__PURE__ */ o.jsx(
              Se,
              {
                value: r.recenterMode,
                onChange: (i) => n({ recenterMode: i }),
                options: [
                  { id: "bbo", label: "On BBO", title: "Follow the bid/ask mid" },
                  { id: "trades", label: "On trades", title: "Follow the last print" },
                  { id: "off", label: "Off" }
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ o.jsx(
          fe,
          {
            label: "Tolerance",
            value: r.recenterTolerance,
            min: 1,
            max: 90,
            step: 1,
            disabled: r.recenterMode === "off",
            onChange: (i) => n({ recenterTolerance: i }),
            fmt: (i) => `${i.toFixed(0)}%`,
            hint: "Recenter only when the anchor drifts beyond this share of the visible range (prevents jitter)."
          }
        ),
        /* @__PURE__ */ o.jsxs(
          q,
          {
            label: "Depth reset",
            hint: "S11: how stale last-seen liquidity is dropped — per session, or on a fixed interval.",
            children: [
              /* @__PURE__ */ o.jsx(
                Se,
                {
                  value: r.resetPolicy,
                  onChange: (i) => n({ resetPolicy: i }),
                  options: [
                    { id: "session", label: "Session" },
                    { id: "interval", label: "Interval" }
                  ]
                }
              ),
              /* @__PURE__ */ o.jsx(
                Re,
                {
                  value: r.resetIntervalMin,
                  min: 1,
                  max: 1440,
                  disabled: r.resetPolicy !== "interval",
                  suffix: "min",
                  onCommit: (i) => n({ resetIntervalMin: Math.round(i) })
                }
              )
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "dh-foot", children: [
      /* @__PURE__ */ o.jsx(
        "button",
        {
          className: "dh-btn",
          onClick: () => n({ ...st }),
          children: "Reset to defaults"
        }
      ),
      /* @__PURE__ */ o.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ o.jsx("span", { className: "dh-hint", children: "changes apply live & save automatically" }),
      /* @__PURE__ */ o.jsx("button", { className: "dh-btn primary", onClick: a, children: "Done" })
    ] })
  ] }) });
}
const Ye = 1e-9;
class ke {
  bids = /* @__PURE__ */ new Map();
  asks = /* @__PURE__ */ new Map();
  version = 0;
  static key(e) {
    return Math.round(e / Ye) * Ye;
  }
  apply(e) {
    for (const [t, n] of e.bids) {
      const a = ke.key(t);
      n <= 0 ? this.bids.delete(a) : this.bids.set(a, n);
    }
    for (const [t, n] of e.asks) {
      const a = ke.key(t);
      n <= 0 ? this.asks.delete(a) : this.asks.set(a, n);
    }
    this.version += 1;
  }
  /** Seed from the /api/orderflow/book snapshot shape. */
  seed(e, t) {
    this.bids.clear(), this.asks.clear();
    for (const [n, a] of e) a > 0 && this.bids.set(ke.key(n), a);
    for (const [n, a] of t) a > 0 && this.asks.set(ke.key(n), a);
    this.version += 1;
  }
  bestBid() {
    let e = null;
    for (const t of this.bids.keys()) (e === null || t > e) && (e = t);
    return e;
  }
  bestAsk() {
    let e = null;
    for (const t of this.asks.keys()) (e === null || t < e) && (e = t);
    return e;
  }
  /** Bids best-first, asks best-first (mirrors book.py's ranked views). */
  sorted() {
    return {
      bids: [...this.bids.entries()].sort((e, t) => t[0] - e[0]),
      asks: [...this.asks.entries()].sort((e, t) => e[0] - t[0])
    };
  }
}
function Gt(s) {
  return s >= 1e3 ? `${(s / 1e3).toFixed(1)}k` : s >= 100 ? s.toFixed(0) : s >= 1 ? s.toFixed(1) : s.toPrecision(2);
}
function qt(s) {
  return s >= 1e3 ? s.toFixed(1) : s >= 1 ? s.toFixed(2) : s.toPrecision(4);
}
function Vt({
  rendererRef: s,
  book: e,
  settings: t,
  width: n = 148
}) {
  const a = g.useRef(null), r = g.useRef(t);
  return r.current = t, g.useEffect(() => {
    const c = a.current;
    if (!c) return;
    const i = c.getContext("2d");
    let l = 0, h = -1, u = -1, v = !1;
    const y = () => {
      const f = c.getBoundingClientRect(), x = window.devicePixelRatio || 1;
      c.width = Math.max(1, Math.round(f.width * x)), c.height = Math.max(1, Math.round(f.height * x)), h = -1;
    }, d = new ResizeObserver(y);
    d.observe(c), y();
    const b = () => {
      const f = s.current;
      if (!f) return;
      const x = f.getViewMetrics();
      if (x.version === h && e.version === u) return;
      h = x.version, u = e.version;
      const T = window.devicePixelRatio || 1, p = c.width / T, S = c.height / T;
      i.setTransform(T, 0, 0, T, 0, 0), i.fillStyle = "#0d1117", i.fillRect(0, 0, p, S);
      const { bids: m, asks: k } = e.sorted();
      if (!m.length && !k.length) {
        i.fillStyle = "#5c6672", i.font = "10px monospace", i.textAlign = "center", i.fillText("no book", p / 2, S / 2);
        return;
      }
      const R = r.current, D = e.bestBid(), j = e.bestAsk(), z = R.activeRange > 0, N = [...m, ...k].filter(([E]) => E >= x.lo && E <= x.hi).map(([E]) => E).sort((E, C) => E - C);
      let P = 8;
      if (N.length >= 2) {
        const E = [];
        for (let C = 1; C < N.length; C++) E.push(N[C] - N[C - 1]);
        E.sort((C, A) => C - A), P = Math.min(20, Math.max(2.5, x.ppu * E[E.length >> 1]));
      }
      let U = 0, L = 0;
      {
        let E = 0;
        for (const [C, A] of m)
          C >= x.lo && C <= x.hi && (U = Math.max(U, A)), E += A, L = Math.max(L, E);
        E = 0;
        for (const [C, A] of k)
          C >= x.lo && C <= x.hi && (U = Math.max(U, A)), E += A, L = Math.max(L, E);
      }
      const W = p - 52, oe = R.cobCumulative ? 26 : 0, me = p - 8 - oe - 40, Y = (E, C, A, de, ge) => {
        const ce = x.yOf(E);
        if (ce < -P || ce > S + P) return;
        const _e = ce - P / 2, _ = z && !ge;
        if (R.cobCumulative && L > 0) {
          const $ = Math.max(1, de / L * 18);
          i.fillStyle = A === "bid" ? "rgba(38, 166, 154, 0.14)" : "rgba(239, 83, 80, 0.14)", i.fillRect(p - 20, _e, 18, P - 1), i.fillStyle = A === "bid" ? "rgba(38, 166, 154, 0.45)" : "rgba(239, 83, 80, 0.45)", i.fillRect(p - 20, _e, $, P - 1);
        }
        const F = U > 0 ? Math.max(1.5, C / U * W) : 1.5;
        i.fillStyle = A === "bid" ? _ ? "rgba(38,166,154,0.16)" : "rgba(38, 166, 154, 0.62)" : _ ? "rgba(239,83,80,0.16)" : "rgba(239, 83, 80, 0.62)", i.fillRect(me + 40 - F, _e, F, P - 1), i.font = "9px monospace", i.textAlign = "right", i.fillStyle = _ ? "#4a5260" : A === "bid" ? "#9fd6cd" : "#f4b3ae", i.fillText(Gt(C), me + 38, ce + 3);
      };
      let le = 0;
      for (let E = 0; E < m.length; E++) {
        const [C, A] = m[E];
        le += A, !(C < x.lo - P || C > x.hi + P) && Y(C, A, "bid", le, !z || E < R.activeRange);
      }
      le = 0;
      for (let E = 0; E < k.length; E++) {
        const [C, A] = k[E];
        le += A, !(C < x.lo - P || C > x.hi + P) && Y(C, A, "ask", le, !z || E < R.activeRange);
      }
      const te = (E, C) => {
        const A = x.yOf(E);
        A < 0 || A > S || (i.strokeStyle = C, i.lineWidth = 1, i.beginPath(), i.moveTo(0, Math.round(A) + 0.5), i.lineTo(p, Math.round(A) + 0.5), i.stroke());
      };
      if (D !== null && te(D, "rgba(38, 166, 154, 0.95)"), j !== null && te(j, "rgba(239, 83, 80, 0.95)"), D !== null && j !== null && j > D) {
        const E = (x.yOf(D) + x.yOf(j)) / 2;
        if (E > 10 && E < S - 10) {
          const C = `Δ ${qt(j - D)}`;
          i.font = "9px monospace";
          const A = i.measureText(C).width + 10;
          i.fillStyle = "rgba(20, 24, 31, 0.95)", i.fillRect(2, E - 8, A, 16), i.strokeStyle = "#2a3140", i.strokeRect(2.5, E - 7.5, A - 1, 15), i.fillStyle = "#c8cfda", i.textAlign = "left", i.fillText(C, 7, E + 3);
        }
      }
      if (z) {
        const E = [];
        m.length && R.activeRange <= m.length && E.push(x.yOf(m[R.activeRange - 1][0]) + P / 2 + 1), k.length && R.activeRange <= k.length && E.push(x.yOf(k[R.activeRange - 1][0]) - P / 2 - 1), i.strokeStyle = "rgba(255, 179, 0, 0.75)", i.setLineDash([3, 3]);
        for (const C of E)
          C < 0 || C > S || (i.beginPath(), i.moveTo(0, C), i.lineTo(p, C), i.stroke());
        i.setLineDash([]);
      }
    }, w = () => {
      v || (b(), l = requestAnimationFrame(w));
    };
    return l = requestAnimationFrame(w), () => {
      v = !0, cancelAnimationFrame(l), d.disconnect();
    };
  }, [s, e]), /* @__PURE__ */ o.jsxs("div", { style: {
    flex: `0 0 ${n}px`,
    width: n,
    borderLeft: "1px solid #232936",
    position: "relative",
    background: "#0d1117"
  }, children: [
    /* @__PURE__ */ o.jsx("div", { style: {
      position: "absolute",
      top: 4,
      right: 6,
      fontSize: 8,
      letterSpacing: 1,
      color: "#5c6672",
      pointerEvents: "none",
      zIndex: 1
    }, children: "COB" }),
    /* @__PURE__ */ o.jsx(
      "canvas",
      {
        ref: a,
        style: { position: "absolute", inset: 0, width: "100%", height: "100%" }
      }
    )
  ] });
}
function Kt(s) {
  return s >= 1e6 ? `${(s / 1e6).toFixed(1)} MB` : s >= 1e3 ? `${(s / 1e3).toFixed(0)} KB` : `${s} B`;
}
function Yt(s) {
  const e = new Date(s * 1e3);
  return e.toLocaleDateString(void 0, { month: "short", day: "numeric" }) + " " + e.toLocaleTimeString(void 0, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !1
  });
}
function Jt(s, e) {
  const t = Math.max(0, Math.round((e ?? Date.now() / 1e3) - s)), n = Math.floor(t / 3600), a = Math.floor(t % 3600 / 60);
  return n ? `${n}h ${a}m` : a ? `${a}m ${t % 60}s` : `${t}s`;
}
function Qt({
  symbol: s,
  onLoad: e,
  onClose: t
}) {
  const [n, a] = g.useState(null), [r, c] = g.useState(null), [i, l] = g.useState(null), [h, u] = g.useState(null), [v, y] = g.useState(null), d = g.useCallback(() => {
    fetch("/api/orderflow/sessions").then((f) => f.ok ? f.json() : Promise.reject(new Error(`HTTP ${f.status}`))).then((f) => {
      a(f.filter((x) => x.symbol === s)), c(null);
    }).catch((f) => c(String(f)));
  }, [s]);
  g.useEffect(() => {
    d();
    const f = setInterval(d, 4e3);
    return () => clearInterval(f);
  }, [d]), g.useEffect(() => {
    const f = (x) => {
      x.key === "Escape" && t();
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [t]);
  const b = async (f) => {
    l(f.id), y(null);
    try {
      const x = await fetch(
        `/api/orderflow/sessions/${encodeURIComponent(f.id)}/events`
      );
      if (!x.ok) {
        const p = await x.json().catch(() => ({ detail: `HTTP ${x.status}` }));
        throw new Error(String(p.detail || x.status));
      }
      const T = await x.json();
      await e(T.events || [], { ...f, rows: (T.events || []).length }), T.truncated && y("Large session: loaded up to the event cap — the tail stays in the file."), t();
    } catch (x) {
      c(String(x));
    } finally {
      l(null);
    }
  }, w = async (f) => {
    if (h !== f.id) {
      u(f.id);
      return;
    }
    u(null);
    try {
      const x = await fetch(
        `/api/orderflow/sessions/${encodeURIComponent(f.id)}`,
        { method: "DELETE" }
      );
      if (!x.ok) {
        const T = await x.json().catch(() => ({ detail: `HTTP ${x.status}` }));
        throw new Error(String(T.detail || x.status));
      }
      d();
    } catch (x) {
      c(String(x));
    }
  };
  return /* @__PURE__ */ o.jsx("div", { className: "dh-backdrop", onMouseDown: t, children: /* @__PURE__ */ o.jsxs("div", { className: "dh-window", onMouseDown: (f) => f.stopPropagation(), children: [
    /* @__PURE__ */ o.jsxs("div", { className: "dh-head", children: [
      /* @__PURE__ */ o.jsx("span", { className: "dh-head-title", children: "RECORDED SESSIONS" }),
      /* @__PURE__ */ o.jsx("span", { className: "dh-head-sym", children: s }),
      /* @__PURE__ */ o.jsx("button", { className: "dh-close", onClick: t, title: "Close (Esc)", children: "✕" })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "dh-body", style: { minHeight: 120 }, children: [
      n === null && !r && /* @__PURE__ */ o.jsx("div", { className: "dh-empty", children: "Reading MY DATA…" }),
      r && /* @__PURE__ */ o.jsx("div", { className: "dh-empty", style: { color: "#ef9a9a" }, children: r }),
      n && n.length === 0 && /* @__PURE__ */ o.jsxs("div", { className: "dh-empty", children: [
        "No recordings for ",
        s,
        " yet.",
        /* @__PURE__ */ o.jsx("br", {}),
        "Press ",
        /* @__PURE__ */ o.jsx("b", { children: "● REC" }),
        " above the heatmap to capture live depth — it lands here, in workspace/MY DATA."
      ] }),
      n?.map((f) => /* @__PURE__ */ o.jsxs("div", { className: "dh-sess", children: [
        /* @__PURE__ */ o.jsxs("div", { style: { minWidth: 0, flex: 1 }, children: [
          /* @__PURE__ */ o.jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexWrap: "wrap"
          }, children: [
            f.recording && /* @__PURE__ */ o.jsx("span", { className: "dh-rec-dot", title: "Recording now" }),
            /* @__PURE__ */ o.jsx("span", { style: { fontFamily: "ui-monospace, Menlo, monospace" }, children: f.id }),
            f.demo && /* @__PURE__ */ o.jsx("span", { className: "dh-chip demo", children: "DEMO" }),
            /* @__PURE__ */ o.jsx("span", { className: "dh-chip", children: f.source || "live" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "dh-hint", style: { marginTop: 2 }, children: [
            Yt(f.started),
            " · ",
            Jt(f.started, f.stopped),
            " · ",
            Kt(f.bytes),
            " · ",
            f.rows.toLocaleString(),
            " rows",
            f.stopped === null ? " · recording…" : ""
          ] })
        ] }),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            className: "dh-btn primary",
            disabled: i !== null,
            onClick: () => b(f),
            title: "Load this recording into the pane",
            children: i === f.id ? "loading…" : "Load"
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            className: "dh-btn",
            style: h === f.id ? { borderColor: "#ef5350", color: "#ef9a9a" } : void 0,
            onClick: () => w(f),
            title: "Delete this recording",
            children: h === f.id ? "sure?" : "Delete"
          }
        )
      ] }, f.id)),
      v && /* @__PURE__ */ o.jsx("div", { className: "dh-empty", children: v })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "dh-foot", children: [
      /* @__PURE__ */ o.jsx("span", { className: "dh-hint", children: "recordings are parquet files in workspace/MY DATA" }),
      /* @__PURE__ */ o.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ o.jsx("button", { className: "dh-btn primary", onClick: t, children: "Done" })
    ] })
  ] }) });
}
const Zt = 4 * 3600;
function lt(s) {
  return `lset-depth-settings:${s}`;
}
function Ie(s) {
  let e = { ...st }, t = null;
  try {
    const a = localStorage.getItem(lt(s));
    a && (t = JSON.parse(a), e = { ...e, ...t });
  } catch {
  }
  t && t.subpanes === void 0 && t.showVolumeStrip === !1 && (e.subpanes = !1);
  const n = Tt();
  return n.apply && (e = { ...e, scheme: n.scheme, applySchemeGlobally: !0 }), e;
}
function Je(s, e) {
  try {
    localStorage.setItem(lt(s), JSON.stringify(e));
  } catch {
  }
}
function es({
  symbol: s,
  sourceProvider: e,
  colors: t,
  syncedCrosshairTime: n,
  onCrosshairMove: a,
  onToggleKind: r
}) {
  const c = g.useRef(null), i = g.useRef(null), l = g.useRef(null);
  l.current || (l.current = new ke());
  const [h, u] = g.useState({ kind: "loading" }), [v, y] = g.useState(() => Ie(s)), [d, b] = g.useState(50), [w, f] = g.useState(!1), [x, T] = g.useState(null), [p, S] = g.useState(!1), [m, k] = g.useState(null), [R, D] = g.useState(null), [j, z] = g.useState(0), [N, P] = g.useState(null), [U, L] = g.useState(0), W = g.useCallback(
    (_) => {
      y((F) => {
        const $ = { ...F, ..._ };
        return $.applySchemeGlobally && _.scheme && _.scheme !== F.scheme && ($e(_.scheme, !0), window.dispatchEvent(new CustomEvent(je, { detail: { scheme: _.scheme, source: s } }))), Je(s, $), i.current?.setSettings($), i.current?.refreshCutoffs(), $;
      });
    },
    [s]
  );
  g.useEffect(() => {
    const _ = (F) => {
      const $ = F.detail;
      $.source !== s && y((J) => {
        if (!J.applySchemeGlobally || J.scheme === $.scheme) return J;
        const H = { ...J, scheme: $.scheme };
        return Je(s, H), i.current?.setSettings(H), H;
      });
    };
    return window.addEventListener(je, _), () => window.removeEventListener(je, _);
  }, [s]);
  const oe = g.useCallback(async () => {
    D(null);
    try {
      const _ = await fetch("/api/orderflow/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol: s })
      }), F = await _.json().catch(() => ({}));
      if (!_.ok) throw new Error(String(F.detail || `HTTP ${_.status}`));
      k({ rid: F.id ?? F.sid ?? "", since: Date.now() });
    } catch (_) {
      D(String(_));
    }
  }, [s]), me = g.useCallback(async () => {
    try {
      await fetch("/api/orderflow/record/stop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: m?.rid ?? "" })
      });
    } catch {
    }
    k(null), z(0);
  }, [m]);
  g.useEffect(() => {
    if (!m) return;
    const _ = setInterval(() => z(Math.floor((Date.now() - m.since) / 1e3)), 1e3);
    return () => clearInterval(_);
  }, [m]);
  const Y = g.useCallback((_, F) => {
    const $ = i.current;
    if (!$ || !_.length) return;
    const J = _.filter((he) => he.type === "SNAPSHOT" || he.type === "DELTA"), H = _.filter((he) => typeof he.side == "string");
    $.ingestHistory(J), l.current?.seed([], []);
    for (const he of J) l.current?.apply(he);
    for (const he of H) $.addTrade(he);
    P(F.id);
  }, []), le = g.useCallback(() => {
    P(null), L((_) => _ + 1);
  }, []);
  g.useEffect(() => {
    const _ = c.current;
    if (!_) return;
    const F = new Ht(Ie(s));
    return i.current = F, F.attach(_), F.setBookSource(l.current), a && (F.onHoverTime = ($) => a($)), () => {
      F.dispose(), i.current = null;
    };
  }, [s]), g.useEffect(() => {
    i.current?.setSettings(v);
  }, [v]), g.useEffect(() => {
    i.current?.setSyncedCrosshair(n ?? null);
  }, [n]), g.useEffect(() => {
    let _ = !1, F = null;
    return u({ kind: "loading" }), l.current?.seed([], []), (async () => {
      const J = i.current;
      if (!J) return;
      const H = Date.now() / 1e3, he = e ? `&provider=${encodeURIComponent(e)}` : "";
      let Ue = !1, Pe = "";
      try {
        const Q = await fetch(
          `/api/orderflow/depth?symbol=${encodeURIComponent(s)}` + he + `&from=${H - Zt}&to=${H}&column_ms=1000&max_levels=60`
        );
        if (!Q.ok) {
          const ae = await Q.json().catch(() => ({ detail: `HTTP ${Q.status}` }));
          _ || u({ kind: "nodata", reason: String(ae.detail || Q.status) });
          return;
        }
        const B = await Q.json();
        if (_) return;
        Ue = !!B.demo, Pe = B.provider, J.ingestHistory(B.events || []);
        for (const ae of B.trades || []) J.addTrade(ae);
      } catch (Q) {
        _ || u({ kind: "nodata", reason: `engine unreachable: ${Q}` });
        return;
      }
      try {
        const Q = Ie(s), B = new URLSearchParams({ symbol: s });
        e && B.set("provider", e), Q.activeRange > 0 && B.set("active_levels", String(Q.activeRange)), B.set("reset", Q.resetPolicy), Q.resetPolicy === "interval" && B.set("reset_interval_min", String(Q.resetIntervalMin));
        const ae = await fetch(`/api/orderflow/book?${B.toString()}`);
        if (ae.ok) {
          const se = await ae.json();
          J.setBook(se.best_bid ?? null, se.best_ask ?? null), l.current?.seed(se.bids ?? [], se.asks ?? []);
        }
      } catch {
      }
      _ || u({ kind: "live", demo: Ue, provider: Pe });
      const He = location.protocol === "https:" ? "wss" : "ws";
      F = new WebSocket(`${He}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(s)}${he}`), F.onmessage = (Q) => {
        if (_) return;
        let B;
        try {
          B = JSON.parse(Q.data);
        } catch {
          return;
        }
        const ae = i.current;
        if (ae)
          if (B.type === "depth") {
            if (ae.applyDepth(B.event), l.current?.apply(B.event), B.event.type === "SNAPSHOT") {
              let se = null, we = null;
              for (const [xe] of B.event.bids) (se === null || xe > se) && (se = xe);
              for (const [xe] of B.event.asks) (we === null || xe < we) && (we = xe);
              ae.setBook(se, we);
            }
          } else B.type === "trade" ? ae.addTrade(B.event) : B.type === "error" && u({ kind: "nodata", reason: B.message });
      };
    })(), () => {
      _ = !0;
      try {
        F?.close();
      } catch {
      }
    };
  }, [s, U, e]), g.useEffect(() => {
    if (!(v.cutoffMode === "percentile")) return;
    const F = 90 - d * 0.8, $ = Math.max(0, 50 - F / 2), J = Math.min(100, 50 + F / 2);
    W({ cutoffLower: $, cutoffUpper: J });
  }, [d]);
  const te = g.useMemo(() => h.kind === "live" && h.demo ? "DEMO" : h.kind === "live" ? h.provider.toUpperCase() : "", [h]), E = g.useCallback((_) => {
    i.current?.wheel(_.deltaX, _.deltaY, _.shiftKey);
  }, []), C = g.useRef(null), A = g.useCallback((_) => {
    C.current = { x: _.clientX, y: _.clientY };
  }, []), de = g.useCallback((_) => {
    const F = _.currentTarget.getBoundingClientRect();
    C.current && _.buttons & 1 && (i.current?.drag(_.clientX - C.current.x, _.clientY - C.current.y), C.current = { x: _.clientX, y: _.clientY }), i.current?.setHover(_.clientX - F.left, _.clientY - F.top);
  }, []), ge = g.useCallback(() => {
    C.current = null;
  }, []), ce = g.useCallback(() => {
    C.current = null, i.current?.setHover(null, null);
  }, []), _e = g.useCallback(() => {
    i.current?.recenter();
  }, []);
  return /* @__PURE__ */ o.jsxs("div", { className: "absolute inset-0 flex flex-col bg-[#1c1c1c] text-[#e8e8e8] select-none", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] text-[12px] shrink-0", children: [
      /* @__PURE__ */ o.jsx("span", { className: "font-bold tracking-wider text-[11px] text-[#e8e8e8]", children: "DEPTH HEAT" }),
      /* @__PURE__ */ o.jsx("span", { className: "font-mono font-semibold text-[13px] text-[#e8e8e8]", children: s }),
      /* @__PURE__ */ o.jsx("div", { className: "flex items-center gap-0.5 ml-2 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]", children: ["heat", "footprint"].map((_) => /* @__PURE__ */ o.jsx(
        "button",
        {
          onClick: () => W({ view: _ }),
          title: _ === "heat" ? "Resting liquidity heat field" : "Footprint: bid×ask executed volume",
          className: `px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${v.view === _ ? "bg-[#e8e8e8] text-[#1c1c1c] shadow-sm" : "bg-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
          children: _ === "heat" ? "HEAT" : "FOOTPRINT"
        },
        _
      )) }),
      te && /* @__PURE__ */ o.jsx(
        "span",
        {
          className: `px-2 py-0.5 rounded-full text-[10px] font-medium border ${h.kind === "live" && h.demo ? "bg-[#f59e0b]/10 border-[#f59e0b]/20 text-[#f59e0b]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9]"}`,
          children: te
        }
      ),
      /* @__PURE__ */ o.jsxs("div", { className: "flex items-center gap-2 ml-auto", children: [
        /* @__PURE__ */ o.jsx("span", { className: "text-[10px] tracking-wider text-[#6a6a6a] hidden lg:block", children: "CUT-OFF" }),
        /* @__PURE__ */ o.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 100,
            value: d,
            onChange: (_) => b(Number(_.target.value)),
            title: "Cut-off window — narrows/widens where gradient saturates",
            className: "w-[90px] accent-[#e8e8e8]"
          }
        ),
        m ? /* @__PURE__ */ o.jsxs(
          "button",
          {
            onClick: me,
            title: "Stop recording",
            className: "px-3 py-1 rounded-full border text-[11px] font-medium flex items-center gap-1.5 bg-[#f0426c]/10 border-[#f0426c]/30 text-[#f0426c] hover:bg-[#f0426c]/20 transition-colors",
            children: [
              /* @__PURE__ */ o.jsx("span", { className: "w-2 h-2 rounded-full bg-[#f0426c] animate-pulse" }),
              " REC ",
              Math.floor(j / 60),
              ":",
              String(j % 60).padStart(2, "0")
            ]
          }
        ) : /* @__PURE__ */ o.jsx(
          "button",
          {
            onClick: oe,
            title: "Record live depth to MY DATA",
            className: "px-2.5 py-1 rounded-md border border-[#3a3a3a] bg-[#262626] text-[11px] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8] transition-colors",
            children: "● REC"
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            onClick: () => S(!0),
            title: "Recorded sessions",
            className: "px-2.5 py-1 rounded-md border border-[#3a3a3a] bg-[#262626] text-[11px] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8] transition-colors",
            children: "Sessions"
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            onClick: () => W({ showTsPanel: !v.showTsPanel }),
            title: "Time & sales drawer",
            className: `px-2.5 py-1 rounded-md border text-[11px] transition-colors ${v.showTsPanel ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
            children: "T&S"
          }
        ),
        N && /* @__PURE__ */ o.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9]", children: [
          "SESSION",
          /* @__PURE__ */ o.jsx("button", { onClick: le, className: "ml-1 w-4 h-4 rounded-full bg-[#1c1c1c] border border-[#3a3a3a] flex items-center justify-center hover:text-[#e8e8e8]", children: "×" })
        ] }),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            onClick: () => {
              T(i.current?.getCutoffs() ?? null), f(!0);
            },
            title: "Depth Heat settings",
            className: `w-8 h-8 rounded-md border flex items-center justify-center transition-colors ${w ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
            children: "⚙"
          }
        ),
        r && /* @__PURE__ */ o.jsx(
          "button",
          {
            onClick: r,
            className: "px-3 py-1.5 rounded-md border border-[#3a3a3a] bg-[#262626] text-[11px] font-medium text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8] transition-colors",
            children: "Chart ⇄"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs(
      "div",
      {
        className: "relative flex-1 min-h-0 flex flex-row bg-[#1c1c1c]",
        onContextMenu: (_) => {
          _.preventDefault(), T(i.current?.getCutoffs() ?? null), f(!0);
        },
        children: [
          /* @__PURE__ */ o.jsxs("div", { className: "relative flex-1 min-w-0", children: [
            /* @__PURE__ */ o.jsx(
              "canvas",
              {
                ref: c,
                className: "absolute inset-0 w-full h-full block",
                onWheel: E,
                onMouseDown: A,
                onMouseMove: de,
                onMouseUp: ge,
                onMouseLeave: ce,
                onDoubleClick: _e
              }
            ),
            h.kind === "loading" && /* @__PURE__ */ o.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-[#1c1c1c]/80 backdrop-blur-sm", children: [
              /* @__PURE__ */ o.jsx("div", { className: "text-[12px] font-mono text-[#e8e8e8]", children: "Loading depth history…" }),
              /* @__PURE__ */ o.jsxs("div", { className: "text-[10px] text-[#6a6a6a] mt-1", children: [
                s,
                " • 4h buffer"
              ] })
            ] }),
            h.kind === "nodata" && /* @__PURE__ */ o.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-[#1c1c1c] text-center p-6", children: [
              /* @__PURE__ */ o.jsx("div", { className: "w-12 h-12 rounded-full bg-[#262626] border border-[#3a3a3a] flex items-center justify-center text-[20px] mb-3", children: "◧" }),
              /* @__PURE__ */ o.jsxs("div", { className: "text-[13px] font-semibold text-[#e8e8e8]", children: [
                "No depth data for ",
                s
              ] }),
              /* @__PURE__ */ o.jsx("div", { className: "text-[11px] text-[#6a6a6a] mt-2 max-w-[360px]", children: h.reason }),
              /* @__PURE__ */ o.jsx("button", { onClick: () => L((_) => _ + 1), className: "mt-4 px-4 py-1.5 rounded-md bg-[#262626] border border-[#3a3a3a] text-[12px] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]", children: "Retry" })
            ] })
          ] }),
          v.cob && v.ladderMode === "panel" && h.kind === "live" && /* @__PURE__ */ o.jsx(Vt, { rendererRef: i, book: l.current, settings: v }),
          w && /* @__PURE__ */ o.jsx(
            Wt,
            {
              symbol: s,
              settings: v,
              cutoffRange: x,
              onChange: (_) => {
                W(_), T(i.current?.getCutoffs() ?? null);
              },
              onClose: () => f(!1)
            }
          ),
          p && /* @__PURE__ */ o.jsx(Qt, { symbol: s, onLoad: Y, onClose: () => S(!1) })
        ]
      }
    ),
    R && /* @__PURE__ */ o.jsxs("div", { className: "px-3 py-1.5 text-[10px] text-[#f0426c] bg-[#f0426c]/5 border-t border-[#f0426c]/10 truncate", children: [
      "rec: ",
      R
    ] })
  ] });
}
const ts = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: es
}, Symbol.toStringTag, { value: "Module" })), Te = 2048, ve = 512, ss = [
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
], is = [
  { t: 0, r: 68, g: 1, b: 84 },
  { t: 0.2, r: 65, g: 68, b: 135 },
  { t: 0.4, r: 42, g: 120, b: 142 },
  { t: 0.6, r: 34, g: 168, b: 132 },
  { t: 0.8, r: 122, g: 209, b: 81 },
  { t: 1, r: 253, g: 231, b: 37 }
], ns = [
  { t: 0, r: 0, g: 0, b: 4 },
  { t: 0.25, r: 81, g: 18, b: 124 },
  { t: 0.5, r: 183, g: 55, b: 121 },
  { t: 0.75, r: 252, g: 137, b: 97 },
  { t: 1, r: 252, g: 253, b: 191 }
];
function Ce(s, e) {
  if (e <= s[0].t) return [s[0].r, s[0].g, s[0].b];
  for (let n = 1; n < s.length; n++)
    if (e <= s[n].t) {
      const a = (e - s[n - 1].t) / (s[n].t - s[n - 1].t);
      return [s[n - 1].r + a * (s[n].r - s[n - 1].r), s[n - 1].g + a * (s[n].g - s[n - 1].g), s[n - 1].b + a * (s[n].b - s[n - 1].b)];
    }
  const t = s[s.length - 1];
  return [t.r, t.g, t.b];
}
function os(s) {
  if (s < 0.05) {
    const t = s / 0.05;
    return [t * 3, 0, t * 4];
  }
  if (s < 0.15) {
    const t = (s - 0.05) / 0.1;
    return [3 + t * 27, t * 9, 4 + t * 64];
  }
  if (s < 0.25) {
    const t = (s - 0.15) / 0.1;
    return [30 + t * 43, 9 + t * 7, 68 + t * 35];
  }
  if (s < 0.35) {
    const t = (s - 0.25) / 0.1;
    return [73 + t * 47, 16 + t * 12, 103 + t * 6];
  }
  if (s < 0.45) {
    const t = (s - 0.35) / 0.1;
    return [120 + t * 37, 28 + t * 14, 109 - t * 20];
  }
  if (s < 0.55) {
    const t = (s - 0.45) / 0.1;
    return [157 + t * 30, 42 + t * 13, 89 - t * 26];
  }
  if (s < 0.65) {
    const t = (s - 0.55) / 0.1;
    return [187 + t * 25, 55 + t * 25, 63 - t * 28];
  }
  if (s < 0.75) {
    const t = (s - 0.65) / 0.1;
    return [212 + t * 22, 80 + t * 37, 35 - t * 24];
  }
  if (s < 0.85) {
    const t = (s - 0.75) / 0.1;
    return [234 + t * 13, 117 + t * 44, 11 - t * 7];
  }
  if (s < 0.95) {
    const t = (s - 0.85) / 0.1;
    return [247 + t * 3, 161 + t * 49, 4 + t * 48];
  }
  const e = (s - 0.95) / 0.05;
  return [250 + e * 2, 210 + e * 45, 52 + e * 112];
}
function as(s) {
  if (s < 0.01) return [6, 16, 29];
  if (s < 0.15) {
    const t = (s - 0.01) / 0.14;
    return [6 + t * 10, 16 + t * 80, 29 + t * 80];
  }
  if (s < 0.35) {
    const t = (s - 0.15) / 0.2;
    return [16 + t * 20, 96 + t * 60, 109 + t * 80];
  }
  if (s < 0.55) {
    const t = (s - 0.35) / 0.2;
    return [36 + t * 100, 156 + t * 20, 189 + t * 40];
  }
  if (s < 0.75) {
    const t = (s - 0.55) / 0.2;
    return [136 + t * 80, 176 + t * 40, 229 - t * 60];
  }
  const e = (s - 0.75) / 0.25;
  return [216 + e * 18, 216 + e * 24, 169 + e * 57];
}
function rs(s) {
  if (s < 0.08) {
    const t = s / 0.08;
    return [8 + t * 4, 13 + t * 14, 18 + t * 18];
  }
  if (s < 0.25) {
    const t = (s - 0.08) / 0.17;
    return [12 + t * 10, 27 + t * 56, 36 + t * 72];
  }
  if (s < 0.5) {
    const t = (s - 0.25) / 0.25;
    return [22 + t * 26, 83 + t * 99, 108 + t * 93];
  }
  if (s < 0.75) {
    const t = (s - 0.5) / 0.25;
    return [48 + t * 170, 182 + t * 35, 201 - t * 106];
  }
  const e = (s - 0.75) / 0.25;
  return [218 + e * 37, 217 + e * 33, 95 + e * 125];
}
function Be(s, e = 1) {
  const t = new Uint8Array(1024);
  for (let n = 0; n < 256; n++) {
    const a = n / 255;
    let r, c, i, l;
    if (s === "ember" ? [r, c, i] = Ce(ss, a) : s === "viridis" ? [r, c, i] = Ce(is, a) : s === "magma" ? [r, c, i] = Ce(ns, a) : s === "inferno" ? [r, c, i] = os(a) : s === "deepdom" || s === "bookmap" ? [r, c, i] = rs(a) : s === "realtime" ? [r, c, i] = Ce([{ t: 0, r: 8, g: 13, b: 18 }, { t: 0.08, r: 12, g: 27, b: 36 }, { t: 0.25, r: 22, g: 83, b: 108 }, { t: 0.5, r: 48, g: 182, b: 201 }, { t: 0.75, r: 218, g: 217, b: 95 }, { t: 1, r: 255, g: 250, b: 220 }], a) : s === "realtime_warm" ? [r, c, i] = Ce([{ t: 0, r: 8, g: 13, b: 18 }, { t: 0.15, r: 15, g: 30, b: 64 }, { t: 0.4, r: 28, g: 92, b: 153 }, { t: 0.65, r: 75, g: 181, b: 190 }, { t: 0.8, r: 240, g: 205, b: 75 }, { t: 0.94, r: 248, g: 108, b: 40 }, { t: 1, r: 255, g: 55, b: 35 }], a) : [r, c, i] = as(a), s === "inferno" || s === "ember" || s === "viridis" || s === "magma") {
      if (a < 0.05) l = 0;
      else if (a < 0.15) {
        const h = (a - 0.05) / 0.1;
        l = h * h * 40;
      } else if (a < 0.35)
        l = 40 + (a - 0.15) / 0.2 * 80;
      else if (a < 0.6)
        l = 120 + (a - 0.35) / 0.25 * 70;
      else {
        const h = (a - 0.6) / 0.4;
        l = Math.min(245, 190 + h * 55);
      }
      l *= e;
    } else
      l = 220 * e;
    t[n * 4] = Math.round(r), t[n * 4 + 1] = Math.round(c), t[n * 4 + 2] = Math.round(i), t[n * 4 + 3] = Math.round(l);
  }
  return t;
}
const ls = `#version 300 es
void main() {
  vec2 pos = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(pos * 2.0 - 1.0, 0.0, 1.0);
}
`, cs = `#version 300 es
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
  for (int d = 0; d < 8; d++) {
    if (d >= u_bucket_multiplier) break;
    int r = agg_base + d;
    if (r < 0 || r >= col_num_rows) continue;
    value += texelFetch(u_data, ivec2(tex_col, r), 0).r;
  }
  value /= float(u_bucket_multiplier);
  if (value < 0.004) discard;
  float norm = value / max(u_max_qty, 0.01);
  norm = pow(norm, 1.0 / max(u_sensitivity, 0.1));
  if (u_use_reach == 1) {
    float reach = texelFetch(u_reach_data, ivec2(tex_col, agg_base), 0).r;
    norm *= mix(0.5, 1.5, reach);
  }
  norm = clamp(norm, 0.0, 1.0);
  vec4 col = texture(u_colormap, vec2(norm, 0.5));
  if (u_use_warm == 1) {
    vec4 warm = texture(u_colormap_warm, vec2(norm, 0.5));
    col = mix(col, warm, 0.5);
  }
  col.a *= u_opacity;
  if (col.a < 0.07) discard;
  fragColor = col;
}
`;
class hs {
  canvas = null;
  gl = null;
  program = null;
  vao = null;
  dataTex = null;
  metaTex = null;
  reachTex = null;
  colormapTex = null;
  colormapWarmTex = null;
  uniforms = {};
  timeStepMs = 1e3;
  mode = "orderbook";
  liqMap = "ember";
  obMap = "orderbook";
  sensitivity = 1;
  opacity = 0.95;
  bucketMultiplier = 1;
  useReach = !1;
  linearFilter = !1;
  nativeBucket = 0.5;
  colorLow = 0.05;
  colorPeak = 0.95;
  timeline = /* @__PURE__ */ new Map();
  reachTimeline = /* @__PURE__ */ new Map();
  columnMeta = [];
  ringStart = 0;
  ringCount = 0;
  gpuOriginMs = 0;
  gpuBucketSize = 0.5;
  globalMaxQty = 0.01;
  observationHoldUntilMs = 0;
  viewTimeMin = 0;
  viewTimeMax = 0;
  viewPriceMin = 0;
  viewPriceMax = 0;
  gpuDirty = !1;
  pendingCols = /* @__PURE__ */ new Set();
  // incremental dirty set
  attach(e) {
    this.canvas = e;
    const t = e.getContext("webgl2", { alpha: !1, antialias: !1, premultipliedAlpha: !1 });
    if (!t) return !1;
    t.getExtension("EXT_color_buffer_float"), this.gl = t;
    const n = t.createShader(t.VERTEX_SHADER);
    if (t.shaderSource(n, ls), t.compileShader(n), !t.getShaderParameter(n, t.COMPILE_STATUS))
      return console.error("vert compile", t.getShaderInfoLog(n)), !1;
    const a = t.createShader(t.FRAGMENT_SHADER);
    if (t.shaderSource(a, cs), t.compileShader(a), !t.getShaderParameter(a, t.COMPILE_STATUS))
      return console.error("frag compile", t.getShaderInfoLog(a)), !1;
    const r = t.createProgram();
    if (t.attachShader(r, n), t.attachShader(r, a), t.linkProgram(r), !t.getProgramParameter(r, t.LINK_STATUS))
      return console.error("link", t.getProgramInfoLog(r)), !1;
    this.program = r;
    const c = t.createVertexArray();
    this.vao = c;
    const i = (h, u, v, y, d) => {
      const b = t.createTexture();
      return t.bindTexture(t.TEXTURE_2D, b), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texImage2D(t.TEXTURE_2D, 0, v, h, u, 0, y, d, null), b;
    };
    this.dataTex = i(Te, ve, t.R32F, t.RED, t.FLOAT), this.metaTex = i(Te, 1, t.RGBA32F, t.RGBA, t.FLOAT), this.reachTex = i(Te, ve, t.R32F, t.RED, t.FLOAT), this.colormapTex = t.createTexture(), t.bindTexture(t.TEXTURE_2D, this.colormapTex), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 256, 1, 0, t.RGBA, t.UNSIGNED_BYTE, Be(this.obMap === "orderbook" ? "orderbook" : this.liqMap, this.opacity)), this.colormapWarmTex = t.createTexture(), t.bindTexture(t.TEXTURE_2D, this.colormapWarmTex), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 256, 1, 0, t.RGBA, t.UNSIGNED_BYTE, Be("realtime_warm", this.opacity));
    const l = ["u_data", "u_meta", "u_colormap", "u_colormap_warm", "u_reach_data", "u_plot_origin", "u_plot_size", "u_viewport_time_min", "u_viewport_time_max", "u_viewport_price_min", "u_viewport_price_max", "u_data_time_start", "u_observation_hold_until", "u_time_step", "u_ring_start", "u_ring_count", "u_ring_size", "u_max_rows", "u_bucket_size", "u_bucket_multiplier", "u_sensitivity", "u_max_qty", "u_color_low", "u_color_peak", "u_mode", "u_opacity", "u_use_reach", "u_use_warm"];
    for (const h of l) {
      const u = t.getUniformLocation(r, h);
      u && (this.uniforms[h] = u);
    }
    return this.columnMeta = Array.from({ length: Te }, () => ({ timestamp_ms: 0, price_min: 0, price_step: 0.5, num_rows: 0, max_value: 0, finalized: !1, values: new Float32Array(0) })), this.ringCount = 0, this.ringStart = 0, this.gpuOriginMs = Date.now() - 36e5, this.seedSynthetic(), !0;
  }
  seedSynthetic() {
    const e = Date.now(), t = 85712.9;
    for (let n = 0; n < 120; n++) {
      const a = e - (120 - n) * 1e3, r = /* @__PURE__ */ new Map();
      for (let c = -30; c < 30; c++) {
        const i = t + c * 0.5 + (Math.random() - 0.5) * 2, l = Math.exp(-Math.abs(c) / 8) * (5 + Math.random() * 10) + Math.random() * 0.5;
        c < 0 ? r.set(i, l * 0.8) : r.set(i, l);
      }
      this.timeline.set(a, r);
    }
    this.gpuDirty = !0, this.pendingCols = new Set(Array.from({ length: 120 }, (n, a) => a)), this.syncGpuIncremental();
  }
  setColumnInterval(e) {
    this.timeStepMs = Math.max(100, e);
  }
  setMode(e) {
    this.mode = e, this.updateColormapTexture();
  }
  setLiqColormap(e) {
    this.liqMap = e, this.updateColormapTexture();
  }
  setObColormap(e) {
    this.obMap = e, this.updateColormapTexture();
  }
  setSensitivity(e) {
    this.sensitivity = e;
  }
  setOpacity(e) {
    this.opacity = e, this.updateColormapTexture();
  }
  setBucketMultiplier(e) {
    this.bucketMultiplier = Math.max(1, Math.min(8, Math.floor(e)));
  }
  setReachModulation(e) {
    this.useReach = e;
  }
  setLinearFiltering(e) {
    this.linearFilter = e;
    const t = this.gl;
    !t || !this.dataTex || (t.bindTexture(t.TEXTURE_2D, this.dataTex), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, e ? t.LINEAR : t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, e ? t.LINEAR : t.NEAREST));
  }
  updateColormapTexture() {
    const e = this.gl;
    if (!e || !this.colormapTex) return;
    const t = this.mode === "orderbook" ? this.obMap === "orderbook" ? "orderbook" : this.obMap : this.liqMap;
    e.bindTexture(e.TEXTURE_2D, this.colormapTex), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 256, 1, 0, e.RGBA, e.UNSIGNED_BYTE, Be(t, this.opacity));
  }
  processSnapshot(e, t, n) {
    if (n <= 0 || (this.nativeBucket = n, t.size === 0)) return;
    const a = /* @__PURE__ */ new Map();
    for (const [i, l] of t) {
      if (Math.abs(l) < 1e-3) continue;
      const h = Math.floor(i / n) * n;
      a.set(h, (a.get(h) || 0) + l);
    }
    if (this.timeline.set(e, a), this.timeline.size > Te) {
      const i = this.timeline.keys().next().value;
      this.timeline.delete(i);
    }
    const r = Array.from(this.timeline.keys()).sort((i, l) => i - l), c = r.indexOf(e);
    c >= 0 ? this.pendingCols.add(c) : this.pendingCols.add(r.length - 1), this.gpuDirty = !0;
  }
  updateLiveColumn(e, t, n = 0) {
    this.processSnapshot(e, t, this.nativeBucket || 0.5), n && (this.observationHoldUntilMs = e + 6e4);
  }
  finalizeColumn(e, t, n = !1, a = 0) {
    this.processSnapshot(e, t, this.nativeBucket || 0.5);
  }
  uploadReachData(e, t) {
    if (this.reachTimeline.set(e, t), this.reachTimeline.size > Te) {
      const r = this.reachTimeline.keys().next().value;
      this.reachTimeline.delete(r);
    }
    const a = Array.from(this.timeline.keys()).sort((r, c) => r - c).indexOf(e);
    a >= 0 && this.pendingCols.add(a), this.gpuDirty = !0;
  }
  clear() {
    this.timeline.clear(), this.reachTimeline.clear(), this.columnMeta.forEach((e) => {
      e.timestamp_ms = 0, e.num_rows = 0, e.values = new Float32Array(0);
    }), this.ringCount = 0, this.pendingCols.clear(), this.gpuDirty = !0, this.seedSynthetic();
  }
  syncGpuIncremental() {
    const e = this.gl;
    if (!e || !this.timeline.size) {
      this.gpuDirty = !1, this.pendingCols.clear();
      return;
    }
    const t = Array.from(this.timeline.entries()).sort((l, h) => l[0] - h[0]), n = t[0][0];
    this.gpuOriginMs = Math.floor(n / this.timeStepMs) * this.timeStepMs, this.gpuBucketSize = this.nativeBucket * (this.mode === "orderbook" ? this.bucketMultiplier : 1), this.pendingCols.size === 0 && this.ringCount === 0 && (this.pendingCols = new Set(t.map((l, h) => h)));
    let a = 1 / 0, r = -1 / 0;
    for (const [, l] of t)
      for (const h of l.keys())
        h < a && (a = h), h > r && (r = h);
    isFinite(a) || (a = 85700), isFinite(r) || (r = 85800);
    const i = (a + r) / 2 - ve / 2 * this.gpuBucketSize;
    for (const l of this.pendingCols) {
      if (l < 0 || l >= t.length) continue;
      const [h, u] = t[l], v = l;
      if (v >= Te) continue;
      const y = new Float32Array(ve);
      let d = 0, b = 0, w = 0;
      for (const [T, p] of u) {
        const S = Math.floor((T - i) / this.nativeBucket);
        if (S >= 0 && S < ve) {
          y[S] += p, S > d && (d = S);
          const m = Math.abs(y[S]);
          m > b && (b = m), m > w && (w = m);
        }
      }
      w > this.globalMaxQty && (this.globalMaxQty = w * 0.9 + this.globalMaxQty * 0.1), e.bindTexture(e.TEXTURE_2D, this.dataTex), e.texSubImage2D(e.TEXTURE_2D, 0, v, 0, 1, ve, e.RED, e.FLOAT, y);
      const f = new Float32Array([i, d + 1, b, 1]);
      e.bindTexture(e.TEXTURE_2D, this.metaTex), e.texSubImage2D(e.TEXTURE_2D, 0, v, 0, 1, 1, e.RGBA, e.FLOAT, f);
      const x = this.reachTimeline.get(h);
      if (x) {
        const T = new Float32Array(ve);
        for (const [p, S] of x) {
          const m = Math.floor((p - i) / this.nativeBucket);
          m >= 0 && m < ve && (T[m] = Math.max(0, Math.min(1, S)));
        }
        e.bindTexture(e.TEXTURE_2D, this.reachTex), e.texSubImage2D(e.TEXTURE_2D, 0, v, 0, 1, ve, e.RED, e.FLOAT, T);
      }
      this.columnMeta[v] = { timestamp_ms: h, price_min: i, price_step: this.nativeBucket, num_rows: d + 1, max_value: b, finalized: !0, values: y };
    }
    this.ringCount = Math.min(t.length, Te), this.pendingCols.clear(), this.gpuDirty = !1;
  }
  render(e, t, n, a, r, c) {
    const i = this.gl, l = this.canvas;
    if (!i || !l || !this.program || (this.gpuDirty && this.syncGpuIncremental(), this.ringCount === 0)) return;
    this.viewTimeMin = e, this.viewTimeMax = t, this.viewPriceMin = n, this.viewPriceMax = a;
    const h = window.devicePixelRatio || 1, u = l.clientWidth, v = l.clientHeight;
    u < 10 || v < 10 || ((l.width !== Math.round(u * h) || l.height !== Math.round(v * h)) && (l.width = Math.round(u * h), l.height = Math.round(v * h)), i.viewport(0, 0, l.width, l.height), i.clearColor(0.039, 0.063, 0.114, 1), i.clear(i.COLOR_BUFFER_BIT), i.useProgram(this.program), i.bindVertexArray(this.vao), i.activeTexture(i.TEXTURE0), i.bindTexture(i.TEXTURE_2D, this.dataTex), i.uniform1i(this.uniforms.u_data, 0), i.activeTexture(i.TEXTURE1), i.bindTexture(i.TEXTURE_2D, this.metaTex), i.uniform1i(this.uniforms.u_meta, 1), i.activeTexture(i.TEXTURE2), i.bindTexture(i.TEXTURE_2D, this.colormapTex), i.uniform1i(this.uniforms.u_colormap, 2), i.activeTexture(i.TEXTURE3), i.bindTexture(i.TEXTURE_2D, this.colormapWarmTex), i.uniform1i(this.uniforms.u_colormap_warm, 3), i.activeTexture(i.TEXTURE4), i.bindTexture(i.TEXTURE_2D, this.reachTex), i.uniform1i(this.uniforms.u_reach_data, 4), i.uniform2f(this.uniforms.u_plot_origin, r[0] * h, r[1] * h), i.uniform2f(this.uniforms.u_plot_size, c[0] * h, c[1] * h), i.uniform1f(this.uniforms.u_viewport_time_min, e / 1e3), i.uniform1f(this.uniforms.u_viewport_time_max, t / 1e3), i.uniform1f(this.uniforms.u_viewport_price_min, n), i.uniform1f(this.uniforms.u_viewport_price_max, a), i.uniform1f(this.uniforms.u_data_time_start, this.gpuOriginMs / 1e3), i.uniform1f(this.uniforms.u_observation_hold_until, this.observationHoldUntilMs / 1e3), i.uniform1f(this.uniforms.u_time_step, this.timeStepMs / 1e3), i.uniform1i(this.uniforms.u_ring_start, 0), i.uniform1i(this.uniforms.u_ring_count, this.ringCount), i.uniform1i(this.uniforms.u_ring_size, Te), i.uniform1i(this.uniforms.u_max_rows, ve), i.uniform1f(this.uniforms.u_bucket_size, this.nativeBucket || 0.5), i.uniform1i(this.uniforms.u_bucket_multiplier, this.bucketMultiplier), i.uniform1f(this.uniforms.u_sensitivity, this.sensitivity), i.uniform1f(this.uniforms.u_max_qty, this.globalMaxQty), i.uniform1f(this.uniforms.u_color_low, this.colorLow), i.uniform1f(this.uniforms.u_color_peak, this.colorPeak), i.uniform1i(this.uniforms.u_mode, this.mode === "liquidation" ? 1 : this.mode === "flow" ? 2 : 0), i.uniform1f(this.uniforms.u_opacity, this.opacity), i.uniform1i(this.uniforms.u_use_reach, this.useReach ? 1 : 0), i.uniform1i(this.uniforms.u_use_warm, 0), i.drawArrays(i.TRIANGLES, 0, 3), i.bindVertexArray(null));
  }
  dispose() {
    const e = this.gl;
    e && (this.dataTex && e.deleteTexture(this.dataTex), this.metaTex && e.deleteTexture(this.metaTex), this.reachTex && e.deleteTexture(this.reachTex), this.colormapTex && e.deleteTexture(this.colormapTex), this.colormapWarmTex && e.deleteTexture(this.colormapWarmTex), this.program && e.deleteProgram(this.program), this.vao && e.deleteVertexArray(this.vao), this.gl = null);
  }
}
const ds = g.lazy(() => Promise.resolve().then(() => ts).then((s) => ({ default: s.DepthHeatPane }))), Qe = [
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
  { label: "4h", ms: 144e5, sec: 14400 }
], Ze = [
  { id: "orderbook", label: "Orderbook" },
  { id: "liquidation", label: "Liquidations" },
  { id: "volume_delta", label: "Volume Delta" },
  { id: "trade_intensity", label: "Trade Intensity" },
  { id: "flow", label: "Flow & Positioning" }
];
function et({ symbol: s, provider: e, onToggleKind: t, liqColormap: n, obColormap: a, opacity: r, intensity: c, gamma: i, noiseFloor: l, tickPerRow: h, halfLife: u, embedded: v }) {
  const y = g.useRef(null), d = g.useRef(null), b = g.useRef(null), w = g.useRef(null), [f, x] = g.useState(Qe[4]), [T, p] = g.useState(() => {
    try {
      const M = localStorage.getItem("ed_fav_tf");
      return new Set(M ? JSON.parse(M) : ["1m", "5m", "15m", "1h", "4h", "1D"]);
    } catch {
      return /* @__PURE__ */ new Set(["1m", "5m", "15m", "1h", "4h", "1D"]);
    }
  }), [S, m] = g.useState("orderbook"), [k, R] = g.useState("ember"), [D, j] = g.useState("orderbook"), [z, N] = g.useState(c ?? 1), [P, U] = g.useState(r ?? 0.95), [L, W] = g.useState(h ?? 1);
  g.useEffect(() => {
    n && R(n);
  }, [n]), g.useEffect(() => {
    a && j(a);
  }, [a]), g.useEffect(() => {
    r !== void 0 && U(r);
  }, [r]), g.useEffect(() => {
    c !== void 0 && N(c);
  }, [c]), g.useEffect(() => {
    h !== void 0 && W(h);
  }, [h]);
  const [oe, me] = g.useState(!1), [Y, le] = g.useState(!1), [te, E] = g.useState(!0), [C, A] = g.useState("instant demo — loading live…"), [de, ge] = g.useState([85600, 85850]), [ce, _e] = g.useState([Date.now() - 36e5, Date.now()]), [_, F] = g.useState(null), [$, J] = g.useState(!1), [H, he] = g.useState(e || "binance"), [Ue, Pe] = g.useState([]), [He, Q] = g.useState({ bid: null, ask: null }), [B, ae] = g.useState(!1), [se, we] = g.useState(!0), [xe, Fe] = g.useState(!1);
  g.useEffect(() => {
    if (!xe) return;
    const M = (I) => {
      I.target.closest("[data-mode-picker]") || Fe(!1);
    };
    return document.addEventListener("mousedown", M), () => document.removeEventListener("mousedown", M);
  }, [xe]);
  const Ne = g.useMemo(() => H === "hyperliquid" ? 15 : H === "binance" ? 20 : H === "coinbase" ? 50 : 33, [H]);
  g.useEffect(() => {
    try {
      localStorage.setItem("ed_fav_tf", JSON.stringify([...T]));
    } catch {
    }
  }, [T]);
  const ct = g.useCallback((M, I) => {
    I?.preventDefault(), p((O) => {
      const V = new Set(O);
      if (V.has(M)) V.delete(M);
      else {
        if (V.size >= 6) {
          const G = V.values().next().value;
          G && V.delete(G);
        }
        V.add(M);
      }
      return V;
    });
  }, []);
  g.useEffect(() => {
    const M = y.current, I = b.current;
    if (!M || !I) return;
    const O = new hs();
    if (!O.attach(M)) {
      ae(!0);
      return;
    }
    O.setColumnInterval(f.ms), O.setMode(S), O.setLiqColormap(k), O.setObColormap(D), O.setSensitivity(z), O.setOpacity(P), O.setBucketMultiplier(L), O.setReachModulation(oe), O.setLinearFiltering(Y), w.current = O;
    let G = 0;
    const ue = () => {
      const ie = Date.now(), Me = se ? ie - 36e5 : ce[0], Z = se ? ie : ce[1], ee = de[0] || 85600, ne = de[1] || 85850;
      O.render(Me, Z, ee, ne, [0, 0], [I.clientWidth, I.clientHeight]), G = requestAnimationFrame(ue);
    };
    G = requestAnimationFrame(ue);
    const pe = new ResizeObserver(() => {
    });
    return pe.observe(I), () => {
      pe.disconnect(), cancelAnimationFrame(G), O.dispose(), w.current = null;
    };
  }, []), g.useEffect(() => {
    const M = w.current;
    M && (M.setMode(S), M.setLiqColormap(k), M.setObColormap(D), M.setSensitivity(z), M.setOpacity(P), M.setBucketMultiplier(L), M.setReachModulation(oe), M.setLinearFiltering(Y), M.setColumnInterval(f.ms));
  }, [S, k, D, z, P, L, oe, Y, f.ms]), g.useEffect(() => {
    if (!se) return;
    const M = setInterval(() => _e([Date.now() - 36e5, Date.now()]), 1e3);
    return () => clearInterval(M);
  }, [se]), g.useEffect(() => {
    let M = !1, I = null;
    const O = w.current;
    return (async () => {
      A("instant demo — loading live…");
      let G = 0.5, ue = !1;
      try {
        const pe = Date.now(), ie = pe - 1 * 3600 * 1e3;
        let Me = !1;
        try {
          const Z = await fetch(`/api/orderflow/heatmap?symbol=${encodeURIComponent(s)}&provider=${encodeURIComponent(H)}&from=${ie / 1e3}&to=${pe / 1e3}&column_ms=${f.ms}&max_levels=80`);
          if (Z.ok) {
            const ee = await Z.json(), ne = ee.columns || [];
            if (ne.length) {
              ee.bucket_size && (G = ee.bucket_size);
              for (const X of ne) {
                const K = /* @__PURE__ */ new Map(), re = X.qtys || [], ye = X.price_min || 0, Xe = X.bucket_size || G || 0.5;
                for (let De = 0; De < re.length; De++) {
                  const We = re[De];
                  Math.abs(We) < 1e-4 || K.set(ye + De * Xe, We);
                }
                K.size && (O?.processSnapshot(X.timestamp_ms, K, Xe), ue = !0);
              }
              if (ee.price_min && ee.price_max) {
                const X = (ee.price_max - ee.price_min) * 0.15;
                ge([ee.price_min - X, ee.price_max + X]);
              }
              Me = ue, A(`${H.toUpperCase()} ${Ne}ms ${S} — ${ne.length} cols instant`);
            }
          }
        } catch {
        }
        if (!Me) {
          const Z = await fetch(`/api/orderflow/depth?symbol=${encodeURIComponent(s)}&provider=${encodeURIComponent(H)}&from=${ie / 1e3}&to=${pe / 1e3}&column_ms=${f.ms}&max_levels=80`);
          if (Z.ok) {
            const ne = (await Z.json()).events || [];
            for (const X of ne) {
              const K = /* @__PURE__ */ new Map();
              for (const [re, ye] of [...X.bids || [], ...X.asks || []]) K.set(re, ye);
              K.size && (O?.processSnapshot(X.ts * 1e3, K, G), ue = !0);
            }
            if (ne.length) {
              const X = ne.flatMap((K) => [...K.bids || [], ...K.asks || []].map(([re]) => re));
              if (X.length) {
                const K = Math.min(...X), re = Math.max(...X), ye = (re - K) * 0.15;
                ge([K - ye, re + ye]);
              }
              A(`${H.toUpperCase()} ${Ne}ms ${S} — ${ne.length} cols instant`);
            }
          }
        }
      } catch {
      }
      try {
        const pe = location.protocol === "https:" ? "wss" : "ws";
        I = new WebSocket(`${pe}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(s)}&provider=${encodeURIComponent(H)}`), I.onopen = () => A((ie) => ie.includes("instant") ? `${H.toUpperCase()} ${Ne}ms ${S} — live ⚡` : ie), I.onmessage = (ie) => {
          if (!M)
            try {
              const Me = JSON.parse(ie.data);
              if (Me.type === "depth") {
                const Z = Me.event, ee = /* @__PURE__ */ new Map();
                for (const [ne, X] of [...Z.bids || [], ...Z.asks || []]) ee.set(ne, X);
                if (ee.size) {
                  O?.processSnapshot(Z.ts * 1e3, ee, G);
                  const ne = [...ee.keys()];
                  if (ne.length) {
                    const X = Math.min(...ne), K = Math.max(...ne);
                    ge((re) => {
                      const ye = (K - X) * 0.15;
                      return [X - ye, K + ye];
                    });
                  }
                  if (Z.bids?.length && Z.asks?.length) {
                    const X = Math.max(...Z.bids.map((re) => re[0])), K = Math.min(...Z.asks.map((re) => re[0]));
                    Q({ bid: X, ask: K });
                  }
                }
              } else Me.type === "trade" && Pe((Z) => [...Z.slice(-100), Me.event]);
            } catch {
            }
        };
      } catch {
      }
    })(), () => {
      M = !0;
      try {
        I?.close();
      } catch {
      }
    };
  }, [s, H, f.ms, S, Ne]);
  const ht = g.useCallback((M) => {
    M.preventDefault();
    const I = M.deltaY;
    ge(([O, V]) => {
      const G = (O + V) / 2, ue = V - O, pe = I > 0 ? 1.1 : 0.9, ie = Math.max(1, ue * pe);
      return [G - ie / 2, G + ie / 2];
    });
  }, []), dt = g.useCallback((M) => {
    const I = M.clientY, O = [...de], V = (ue) => {
      const ie = -(ue.clientY - I) * 0.5;
      ge([O[0] + ie, O[1] + ie]);
    }, G = () => {
      document.removeEventListener("mousemove", V), document.removeEventListener("mouseup", G);
    };
    document.addEventListener("mousemove", V), document.addEventListener("mouseup", G);
  }, [de]), ut = g.useCallback((M) => {
    const I = M.currentTarget.getBoundingClientRect(), O = M.clientX - I.left, V = M.clientY - I.top, G = ce[0] + O / I.width * (ce[1] - ce[0]), ue = de[1] - V / I.height * (de[1] - de[0]);
    F({ x: O, y: V, price: ue, time: G });
  }, [ce, de]), ft = g.useCallback(() => F(null), []), mt = g.useCallback(() => ge([85600, 85850]), []);
  if (B)
    return /* @__PURE__ */ o.jsx(g.Suspense, { fallback: /* @__PURE__ */ o.jsx("div", { className: "h-full flex items-center justify-center bg-[#0a0e12] text-[#5f6f7c] text-[11px]", children: "Loading fallback depth..." }), children: /* @__PURE__ */ o.jsx(ds, { symbol: s, sourceProvider: H, onToggleKind: t }) });
  const pt = Qe.filter((M) => T.has(M.label));
  return /* @__PURE__ */ o.jsxs("div", { className: "absolute inset-0 flex flex-col bg-[#0a0e12] text-[#e9eff5] select-none", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "flex items-center gap-2 px-3 h-9 border-b border-[#1a1d25] bg-[#0a0e12] text-[12px] shrink-0", children: [
      /* @__PURE__ */ o.jsx("span", { className: "font-bold tracking-wider text-[11px] text-[#e9eff5]", children: v ? "HEATMAP" : "EDGEDEPTH" }),
      /* @__PURE__ */ o.jsx("span", { className: "font-mono font-semibold text-[13px] text-[#e9eff5]", children: s }),
      /* @__PURE__ */ o.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-[#0d1217] border border-[#1a1d25] text-[#5f6f7c] truncate max-w-[260px]", children: C }),
      !v && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
        /* @__PURE__ */ o.jsx("div", { className: "flex items-center gap-0.5 ml-2 p-0.5 rounded-lg bg-[#05070a] border border-[#1a1d25]", children: ["binance", "coinbase", "hyperliquid"].map((M) => /* @__PURE__ */ o.jsxs("button", { onClick: () => he(M), className: `px-2.5 py-1 rounded-md text-[11px] font-medium ${H === M ? "bg-[#1a1d25] text-[#e9eff5]" : "bg-transparent text-[#5f6f7c] hover:bg-[#0d1217] hover:text-[#e9eff5]"}`, title: `${M} ${M === "hyperliquid" ? "15ms" : M === "binance" ? "20ms" : "50ms"}`, children: [
          M.toUpperCase(),
          " ",
          M === "hyperliquid" ? "⚡" : ""
        ] }, M)) }),
        /* @__PURE__ */ o.jsx("div", { className: "flex items-center gap-1 ml-2", children: pt.slice(0, 6).map((M) => /* @__PURE__ */ o.jsx("button", { onClick: () => x(M), onContextMenu: (I) => {
          I.preventDefault(), ct(M.label, I);
        }, className: `px-2 py-1 rounded-md text-[11px] font-medium ${f.label === M.label ? "bg-[#e9eff5] text-[#05070a]" : "bg-[#05070a] border border-[#1a1d25] text-[#5f6f7c] hover:bg-[#0d1217] hover:text-[#e9eff5]"}`, children: M.label }, M.label)) })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "relative ml-2", "data-mode-picker": !0, children: [
        /* @__PURE__ */ o.jsxs("button", { onClick: () => Fe((M) => !M), className: "flex items-center gap-2 pl-3 pr-7 py-1 rounded-md border border-[#1a1d25] bg-[#05070a] text-[11px] font-medium text-[#e9eff5] hover:bg-[#0d1217] transition-colors", children: [
          Ze.find((M) => M.id === S)?.label || S,
          /* @__PURE__ */ o.jsx("span", { className: "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[#5f6f7c]", children: xe ? "▲" : "▼" })
        ] }),
        xe && /* @__PURE__ */ o.jsxs("div", { className: "absolute top-full left-0 mt-2 z-30 w-[220px] rounded-xl border border-[#1a1d25] bg-[#0a0e12] shadow-2xl overflow-hidden", children: [
          /* @__PURE__ */ o.jsx("div", { className: "px-3 py-2 border-b border-[#1a1d25] bg-[#0d1217] text-[10px] font-semibold tracking-wider text-[#5f6f7c]", children: "HEATMAP MODE" }),
          /* @__PURE__ */ o.jsx("div", { className: "p-1.5 grid gap-1", children: Ze.map((M) => /* @__PURE__ */ o.jsx("button", { onClick: () => {
            m(M.id), Fe(!1);
          }, className: `px-3 py-2 rounded-md text-left text-[12px] font-medium transition-colors ${S === M.id ? "bg-[#e9eff5] text-[#05070a]" : "bg-[#05070a] text-[#5f6f7c] hover:bg-[#0d1217] hover:text-[#e9eff5]"}`, children: M.label }, M.id)) })
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "ml-auto flex items-center gap-1.5", children: [
        /* @__PURE__ */ o.jsx("button", { onClick: () => we((M) => !M), className: `px-3 py-1 rounded-full border text-[11px] font-medium ${se ? "bg-[#21b3a4]/10 border-[#21b3a4]/30 text-[#21b3a4]" : "bg-[#05070a] border-[#1a1d25] text-[#5f6f7c] hover:text-[#98aab8]"}`, children: se ? "● FOLLOW" : "○ FREE" }),
        /* @__PURE__ */ o.jsx("button", { onClick: () => E((M) => !M), className: `px-2.5 py-1 rounded-md border text-[11px] ${te ? "bg-[#0d1217] border-[#1a1d25] text-[#e9eff5]" : "bg-transparent border-[#1a1d25] text-[#5f6f7c] hover:text-[#98aab8]"}`, children: "Bubbles" }),
        /* @__PURE__ */ o.jsx("button", { onClick: () => ae(!0), className: "px-2.5 py-1 rounded-md border border-[#1a1d25] bg-transparent text-[11px] text-[#5f6f7c] hover:bg-[#0d1217] hover:text-[#98aab8]", children: "Legacy" }),
        /* @__PURE__ */ o.jsx("button", { onClick: () => J((M) => !M), className: `w-7 h-7 rounded-md border flex items-center justify-center ${$ ? "bg-[#e9eff5] border-[#e9eff5] text-[#05070a]" : "bg-[#05070a] border-[#1a1d25] text-[#5f6f7c] hover:bg-[#0d1217] hover:text-[#e9eff5]"}`, children: "⚙" }),
        t && /* @__PURE__ */ o.jsx("button", { onClick: t, className: "px-2.5 py-1 rounded-md border border-[#1a1d25] bg-[#05070a] text-[11px] text-[#5f6f7c] hover:bg-[#0d1217] hover:text-[#e9eff5]", children: "Chart ⇄" })
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { ref: b, className: "relative flex-1 min-h-0 w-full h-full bg-[#0a0e12]", onWheel: ht, onMouseDown: dt, onMouseMove: ut, onMouseLeave: ft, onDoubleClick: mt, children: [
      /* @__PURE__ */ o.jsx("canvas", { ref: y, className: "absolute inset-0 w-full h-full block", style: { width: "100%", height: "100%" } }),
      /* @__PURE__ */ o.jsx("canvas", { ref: d, className: "absolute inset-0 w-full h-full block pointer-events-none", style: { width: "100%", height: "100%" } }),
      _ && /* @__PURE__ */ o.jsxs("div", { className: "absolute pointer-events-none px-2 py-1 rounded bg-[#0a0e12] border border-[#1a1d25] text-[10px] font-mono text-[#e9eff5] shadow-xl", style: { left: _.x + 10, top: _.y - 30 }, children: [
        /* @__PURE__ */ o.jsx("div", { children: _.price.toFixed(1) }),
        /* @__PURE__ */ o.jsx("div", { className: "text-[#5f6f7c]", children: new Date(_.time).toLocaleTimeString() })
      ] })
    ] }),
    $ && /* @__PURE__ */ o.jsxs("div", { className: "absolute top-10 right-2 z-20 w-[340px] bg-[#0a0e12] border border-[#1a1d25] rounded shadow-xl p-3 text-[11px] space-y-3 max-h-[80vh] overflow-auto", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ o.jsx("span", { className: "font-bold tracking-wider text-[10px] text-[#5f6f7c]", children: "HEATMAP TWEAKS — FAST" }),
        /* @__PURE__ */ o.jsx("button", { onClick: () => J(!1), className: "text-[14px] text-[#5f6f7c] hover:text-[#e9eff5]", children: "×" })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ o.jsx("div", { className: "text-[10px] text-[#5f6f7c] uppercase", children: "Colormap — blue/cyan #06101d→#eaf06a exact screenshot" }),
        S === "liquidation" ? /* @__PURE__ */ o.jsx("div", { className: "flex gap-1", children: ["inferno", "ember", "viridis", "magma"].map((M) => /* @__PURE__ */ o.jsx("button", { onClick: () => R(M), className: `flex-1 py-1 rounded border text-[10px] capitalize ${k === M ? "bg-[#e9eff5] border-[#e9eff5] text-[#05070a]" : "border-[#1a1d25] bg-[#05070a] text-[#5f6f7c] hover:bg-[#0d1217]"}`, children: M }, M)) }) : /* @__PURE__ */ o.jsx("div", { className: "flex gap-1", children: ["orderbook", "deepdom", "bookmap", "realtime", "realtime_warm"].map((M) => /* @__PURE__ */ o.jsx("button", { onClick: () => j(M), className: `flex-1 py-1 rounded border text-[10px] capitalize ${D === M ? "bg-[#e9eff5] border-[#e9eff5] text-[#05070a]" : "border-[#1a1d25] bg-[#05070a] text-[#5f6f7c] hover:bg-[#0d1217]"}`, children: M }, M)) })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ o.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ o.jsxs("span", { className: "text-[10px] text-[#5f6f7c]", children: [
            "Sensitivity ",
            z.toFixed(2)
          ] }),
          /* @__PURE__ */ o.jsx("input", { type: "range", min: 0.1, max: 3, step: 0.1, value: z, onChange: (M) => N(parseFloat(M.target.value)), className: "accent-[#e9eff5]" })
        ] }),
        /* @__PURE__ */ o.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ o.jsxs("span", { className: "text-[10px] text-[#5f6f7c]", children: [
            "Opacity ",
            Math.round(P * 100),
            "%"
          ] }),
          /* @__PURE__ */ o.jsx("input", { type: "range", min: 0.1, max: 1, step: 0.05, value: P, onChange: (M) => U(parseFloat(M.target.value)), className: "accent-[#e9eff5]" })
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "pt-2 border-t border-[#1a1d25] space-y-1 text-[10px] text-[#5f6f7c]", children: [
        /* @__PURE__ */ o.jsx("div", { children: "• GPU ring 2048×512 R32F incremental upload — fast, not 8192 full rebuild" }),
        /* @__PURE__ */ o.jsx("div", { children: "• Instant demo #0a0e12 blue/cyan #06101d→#eaf06a — never blank" }),
        /* @__PURE__ */ o.jsx("div", { children: "• Ultra-fast: Hyperliquid 15ms ⚡, Binance 20ms, Coinbase 50ms" }),
        /* @__PURE__ */ o.jsx("div", { children: "• 1h initial load, then WS live — Binance faster than Coinbase" })
      ] })
    ] })
  ] });
}
const fs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EdgeDepthHeatmapPane: et,
  default: et
}, Symbol.toStringTag, { value: "Module" }));
export {
  es as D,
  fs as E,
  ts as a
};
