import { r as c, j as t } from "./react-vendor-C0yw3i6b.js";
import { k as Vn } from "./katex-CRg9SmwJ.js";
const Ie = 1e-3, _t = 12, bt = 6, ft = 6, ae = () => Math.random().toString(36).slice(2, 10), Yn = [
  "",
  "#e05d5d",
  "#e0954a",
  "#cdb648",
  "#57a869",
  "#3fb0a5",
  "#4f8fd9",
  "#9a6fd9",
  "#d96fa8",
  "#8a9099",
  "#a33b3b",
  "#b06a24",
  "#8d7c1f",
  "#2f7346",
  "#1f6f68",
  "#2b5fa0",
  "#6a45a0",
  "#a04478"
], Un = [
  "",
  "rgba(205,182,72,.16)",
  "rgba(87,168,105,.14)",
  "rgba(63,176,165,.14)",
  "rgba(79,143,217,.14)",
  "rgba(154,111,217,.14)",
  "rgba(217,111,168,.13)",
  "rgba(224,93,93,.13)",
  "rgba(138,144,153,.15)"
], bn = ["rect", "ellipse", "triangle", "diamond", "star"], Re = [11, 12, 13, 15, 17, 20, 24, 28, 34, 40, 48, 60, 72], Gn = [1, 2, 4, 7, 12, 20], Zn = "rgba(205,182,72,.16)", Qn = "rgba(138,144,153,.15)", er = [
  ["", "Theme"],
  ["#ffffff", "White"],
  ["#f7f3e8", "Cream"],
  ["#eef1f4", "Light grey"],
  ["#e9f2e8", "Pale green"],
  ["#e8eff8", "Pale blue"],
  ["#f6ebee", "Pale pink"],
  ["#1d2b24", "Blackboard"],
  ["#0f1116", "Near black"]
], tr = [
  ["dots", "Dots"],
  ["grid", "Grid"],
  ["lines", "Ruled"],
  ["plain", "Plain"]
];
function nr(o) {
  let p = (o || "").trim().replace("#", "");
  if (p.length === 3 && (p = p[0] + p[0] + p[1] + p[1] + p[2] + p[2]), !/^[0-9a-f]{6}$/i.test(p)) return !0;
  const i = parseInt(p.slice(0, 2), 16), h = parseInt(p.slice(2, 4), 16), l = parseInt(p.slice(4, 6), 16);
  return (0.2126 * i + 0.7152 * h + 0.0722 * l) / 255 > 0.5;
}
function Ht(o, p) {
  try {
    return { html: Vn.renderToString(o, {
      displayMode: p,
      throwOnError: !0,
      strict: !1,
      trust: !1
    }), ok: !0 };
  } catch {
    return { html: "", ok: !1 };
  }
}
const kn = (o) => o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");
function rr(o) {
  const p = kn;
  let i = "", h = 0;
  for (; h < o.length; ) {
    const l = o.indexOf("$", h);
    if (l < 0) {
      i += p(o.slice(h));
      break;
    }
    const y = o.startsWith("$$", l), f = y ? "$$" : "$", v = o.indexOf(f, l + f.length);
    if (v < 0) {
      i += p(o.slice(h));
      break;
    }
    i += p(o.slice(h, l));
    const z = o.slice(l + f.length, v), j = Ht(z, y);
    i += j.ok ? j.html : `<span class="nb-tex-bad">${p(f + z + f)}</span>`, h = v + f.length;
  }
  return i;
}
const or = [
  { group: "Greek", items: [
    { lab: "α", ins: "\\alpha " },
    { lab: "β", ins: "\\beta " },
    { lab: "γ", ins: "\\gamma " },
    { lab: "δ", ins: "\\delta " },
    { lab: "ε", ins: "\\epsilon " },
    { lab: "θ", ins: "\\theta " },
    { lab: "κ", ins: "\\kappa " },
    { lab: "λ", ins: "\\lambda " },
    { lab: "μ", ins: "\\mu " },
    { lab: "ν", ins: "\\nu " },
    { lab: "ξ", ins: "\\xi " },
    { lab: "π", ins: "\\pi " },
    { lab: "ρ", ins: "\\rho " },
    { lab: "σ", ins: "\\sigma " },
    { lab: "τ", ins: "\\tau " },
    { lab: "φ", ins: "\\phi " },
    { lab: "χ", ins: "\\chi " },
    { lab: "ψ", ins: "\\psi " },
    { lab: "ω", ins: "\\omega " },
    { lab: "Γ", ins: "\\Gamma " },
    { lab: "Δ", ins: "\\Delta " },
    { lab: "Θ", ins: "\\Theta " },
    { lab: "Λ", ins: "\\Lambda " },
    { lab: "Σ", ins: "\\Sigma " },
    { lab: "Φ", ins: "\\Phi " },
    { lab: "Ω", ins: "\\Omega " }
  ] },
  { group: "Structure", items: [
    { lab: "x²", ins: "^{@}", tip: "superscript" },
    { lab: "xₜ", ins: "_{@}", tip: "subscript" },
    { lab: "a⁄b", ins: "\\frac{@}{}", tip: "fraction" },
    { lab: "√", ins: "\\sqrt{@}" },
    { lab: "ⁿ√", ins: "\\sqrt[@]{}", tip: "nth root" },
    { lab: "( )", ins: "\\left(@\\right)", tip: "sized brackets" },
    { lab: "[ ]", ins: "\\left[@\\right]" },
    { lab: "{ }", ins: "\\left\\{@\\right\\}" },
    { lab: "| |", ins: "\\left|@\\right|", tip: "absolute value" },
    { lab: "‖ ‖", ins: "\\left\\|@\\right\\|", tip: "norm" },
    { lab: "x̂", ins: "\\hat{@}" },
    { lab: "x̄", ins: "\\bar{@}" },
    { lab: "x̃", ins: "\\tilde{@}" },
    { lab: "ẋ", ins: "\\dot{@}" },
    { lab: "x⃗", ins: "\\vec{@}" },
    { lab: "[ᵃᵇ]", ins: "\\begin{bmatrix} @ & \\\\ & \\end{bmatrix}", tip: "matrix" },
    { lab: "cases", ins: "\\begin{cases} @ & \\text{if } \\\\ & \\text{else} \\end{cases}" }
  ] },
  { group: "Calculus", items: [
    { lab: "∑", ins: "\\sum_{@}^{}" },
    { lab: "∏", ins: "\\prod_{@}^{}" },
    { lab: "∫", ins: "\\int_{@}^{}" },
    { lab: "∬", ins: "\\iint_{@}" },
    { lab: "∮", ins: "\\oint_{@}" },
    { lab: "∂", ins: "\\partial " },
    { lab: "∂/∂x", ins: "\\frac{\\partial @}{\\partial }" },
    { lab: "d/dx", ins: "\\frac{d@}{d}" },
    { lab: "∇", ins: "\\nabla " },
    { lab: "lim", ins: "\\lim_{@ \\to }" },
    { lab: "∞", ins: "\\infty " },
    { lab: "dx", ins: "\\,d@" }
  ] },
  { group: "Relations", items: [
    { lab: "=", ins: "= " },
    { lab: "≠", ins: "\\neq " },
    { lab: "≈", ins: "\\approx " },
    { lab: "≡", ins: "\\equiv " },
    { lab: "∝", ins: "\\propto " },
    { lab: "≤", ins: "\\leq " },
    { lab: "≥", ins: "\\geq " },
    { lab: "≪", ins: "\\ll " },
    { lab: "≫", ins: "\\gg " },
    { lab: "∼", ins: "\\sim " },
    { lab: "±", ins: "\\pm " },
    { lab: "×", ins: "\\times " },
    { lab: "·", ins: "\\cdot " },
    { lab: "÷", ins: "\\div " }
  ] },
  { group: "Sets & logic", items: [
    { lab: "∈", ins: "\\in " },
    { lab: "∉", ins: "\\notin " },
    { lab: "⊂", ins: "\\subset " },
    { lab: "⊆", ins: "\\subseteq " },
    { lab: "∪", ins: "\\cup " },
    { lab: "∩", ins: "\\cap " },
    { lab: "∅", ins: "\\emptyset " },
    { lab: "∀", ins: "\\forall " },
    { lab: "∃", ins: "\\exists " },
    { lab: "¬", ins: "\\neg " },
    { lab: "∧", ins: "\\land " },
    { lab: "∨", ins: "\\lor " },
    { lab: "ℝ", ins: "\\mathbb{R}" },
    { lab: "ℕ", ins: "\\mathbb{N}" },
    { lab: "ℤ", ins: "\\mathbb{Z}" },
    { lab: "ℙ", ins: "\\mathbb{P}" }
  ] },
  { group: "Arrows", items: [
    { lab: "→", ins: "\\to " },
    { lab: "←", ins: "\\leftarrow " },
    { lab: "⇒", ins: "\\Rightarrow " },
    { lab: "⇔", ins: "\\iff " },
    { lab: "↦", ins: "\\mapsto " },
    { lab: "↑", ins: "\\uparrow " },
    { lab: "↓", ins: "\\downarrow " },
    { lab: "⟶", ins: "\\longrightarrow " }
  ] },
  // The reason this page exists: the notation a quant actually writes down.
  { group: "Finance", items: [
    { lab: "𝔼[·]", ins: "\\mathbb{E}\\left[@\\right]", tip: "expectation" },
    { lab: "Var", ins: "\\mathrm{Var}\\left(@\\right)" },
    { lab: "Cov", ins: "\\mathrm{Cov}\\left(@, \\right)" },
    { lab: "ℚ", ins: "\\mathbb{Q}", tip: "risk-neutral measure" },
    { lab: "dS", ins: "dS_t = \\mu S_t\\,dt + \\sigma S_t\\,dW_t", tip: "GBM" },
    { lab: "dW", ins: "dW_t" },
    { lab: "σ²", ins: "\\sigma^2" },
    { lab: "N(d₁)", ins: "N(d_1)" },
    { lab: "~N", ins: "\\sim N(@, )" },
    { lab: "Σ̂", ins: "\\hat{\\Sigma}" },
    { lab: "argmax", ins: "\\operatorname*{argmax}_{@}" },
    { lab: "argmin", ins: "\\operatorname*{argmin}_{@}" },
    { lab: "e^x", ins: "e^{@}" },
    { lab: "ln", ins: "\\ln @" },
    { lab: "log", ins: "\\log @" },
    { lab: "text", ins: "\\text{@}", tip: "words inside maths" }
  ] }
], ne = (o, p, i) => Math.max(p, Math.min(i, o)), fn = (o, p, i) => ({
  x: (p - o.x) / o.zoom,
  y: (i - o.y) / o.zoom
});
function ar(o) {
  let p = 1 / 0, i = 1 / 0, h = -1 / 0, l = -1 / 0;
  for (const [y, f] of o)
    y < p && (p = y), y > h && (h = y), f < i && (i = f), f > l && (l = f);
  return { x0: p, y0: i, x1: h, y1: l };
}
function Ft(o) {
  if (o.length < 2) {
    const [h, l] = o[0] || [0, 0];
    return `M ${h} ${l} l 0.1 0`;
  }
  let p = `M ${o[0][0]} ${o[0][1]}`;
  for (let h = 1; h < o.length - 1; h++) {
    const [l, y] = o[h], [f, v] = o[h + 1];
    p += ` Q ${l} ${y} ${(l + f) / 2} ${(y + v) / 2}`;
  }
  const i = o[o.length - 1];
  return p += ` L ${i[0]} ${i[1]}`, p;
}
function ir(o, p, i, h, l) {
  const y = Math.atan2(h - p, i - o), f = y - Math.PI * 0.82, v = y + Math.PI * 0.82;
  return `M ${i + Math.cos(f) * l} ${h + Math.sin(f) * l} L ${i} ${h} L ${i + Math.cos(v) * l} ${h + Math.sin(v) * l}`;
}
const gn = (o) => {
  if (!o) return "";
  const p = Math.max(0, Date.now() / 1e3 - o);
  return p < 60 ? "just now" : p < 3600 ? `${Math.floor(p / 60)}m ago` : p < 86400 ? `${Math.floor(p / 3600)}h ago` : `${Math.floor(p / 86400)}d ago`;
}, m = (o, p, i, h, l = 14) => Array.from({ length: l }, (y, f) => [o + (i - o) * f / (l - 1), p + (h - p) * f / (l - 1)]), E = (o, p, i, h, l, y, f = 18) => Array.from({ length: f }, (v, z) => {
  const j = l + (y - l) * z / (f - 1);
  return [o + i * Math.cos(j), p + h * Math.sin(j)];
}), w = Math.PI, sr = [
  // digits
  { name: "0", latex: "0", strokes: [E(50, 50, 22, 40, -w / 2, 1.5 * w, 22)] },
  { name: "1", latex: "1", strokes: [m(50, 10, 50, 90)] },
  { name: "2", latex: "2", strokes: [[...E(48, 32, 21, 19, -w, 0.35, 14), ...m(65, 44, 28, 84, 10), ...m(28, 84, 72, 84, 8)]] },
  { name: "3", latex: "3", strokes: [[...E(46, 31, 19, 16, -0.85 * w, 0.5 * w, 12), ...E(46, 66, 21, 19, -0.5 * w, 0.85 * w, 12)]] },
  { name: "4", latex: "4", strokes: [[...m(55, 12, 25, 60, 10), ...m(25, 60, 78, 60, 8)], m(62, 25, 62, 90, 10)] },
  { name: "5", latex: "5", strokes: [[...m(70, 12, 32, 12, 7), ...m(32, 12, 30, 46, 7), ...E(46, 63, 22, 21, -0.55 * w, 0.8 * w, 14)]] },
  { name: "6", latex: "6", strokes: [[...E(58, 40, 26, 30, -0.35 * w, -1.1 * w, 12), ...E(48, 68, 19, 19, -w, w, 18)]] },
  { name: "7", latex: "7", strokes: [[...m(28, 14, 74, 14, 8), ...m(74, 14, 42, 88, 12)]] },
  { name: "8", latex: "8", strokes: [[...E(50, 31, 17, 17, -w / 2, 1.5 * w, 14), ...E(50, 69, 21, 21, -w / 2, 1.5 * w, 16)]] },
  { name: "9", latex: "9", strokes: [[...E(47, 34, 19, 20, -w / 2, 1.5 * w, 16), ...m(66, 38, 60, 88, 8)]] },
  // operators
  { name: "plus", latex: "+", strokes: [m(50, 25, 50, 75), m(25, 50, 75, 50)] },
  { name: "minus", latex: "-", strokes: [m(25, 50, 75, 50)] },
  { name: "equals", latex: "=", strokes: [m(25, 40, 75, 40), m(25, 62, 75, 62)] },
  { name: "pm", latex: "\\pm", strokes: [m(50, 18, 50, 62), m(28, 40, 72, 40), m(25, 80, 75, 80)] },
  { name: "arrow", latex: "\\to", strokes: [m(18, 50, 82, 50), [...m(60, 30, 82, 50, 8), ...m(82, 50, 60, 70, 8)]] },
  { name: "lt", latex: "<", strokes: [[...m(70, 24, 30, 50, 9), ...m(30, 50, 70, 76, 9)]] },
  { name: "gt", latex: ">", strokes: [[...m(30, 24, 70, 50, 9), ...m(70, 50, 30, 76, 9)]] },
  { name: "sqrt", latex: "\\sqrt{}", strokes: [[...m(18, 56, 32, 84, 7), ...m(32, 84, 50, 14, 10), ...m(50, 14, 86, 14, 10)]] },
  { name: "int", latex: "\\int", strokes: [[...E(62, 20, 12, 11, -0.5 * w, -1 * w, 8), ...m(50, 20, 50, 80, 12), ...E(38, 80, 12, 11, 0, 0.5 * w, 8)]] },
  { name: "partial", latex: "\\partial", strokes: [[...E(46, 26, 18, 14, -1.2 * w, 0.05 * w, 12), ...m(63, 30, 66, 46, 4), ...E(48, 66, 19, 20, -0.25 * w, 1.62 * w, 16)]] },
  { name: "infty", latex: "\\infty", strokes: [[...E(35, 50, 14, 16, 0, 2 * w, 14), ...E(65, 50, 14, 16, w, 3 * w, 14)]] },
  // Greek, lower
  { name: "alpha", latex: "\\alpha", strokes: [[...m(78, 30, 62, 42, 6), ...E(44, 54, 20, 22, -0.3 * w, 1.35 * w, 16), ...m(60, 64, 80, 76, 6)]] },
  { name: "beta", latex: "\\beta", strokes: [[...m(30, 92, 32, 20, 12), ...E(45, 32, 15, 13, -0.9 * w, 0.5 * w, 10), ...E(49, 62, 19, 17, -0.6 * w, 0.75 * w, 12)]] },
  { name: "delta", latex: "\\delta", strokes: [[...m(63, 12, 47, 20, 5), ...E(50, 62, 19, 22, -0.55 * w, 1.45 * w, 16)]] },
  { name: "epsilon", latex: "\\epsilon", strokes: [[...E(54, 31, 19, 16, 1.85 * w, 0.5 * w, 12), ...E(54, 66, 21, 19, 1.5 * w, 0.85 * w + 0.3, 12)]] },
  { name: "theta", latex: "\\theta", strokes: [E(50, 50, 21, 35, -w / 2, 1.5 * w, 20), m(32, 50, 68, 50, 8)] },
  { name: "lambda", latex: "\\lambda", strokes: [m(26, 14, 68, 88, 14), m(46, 50, 26, 88, 9)] },
  { name: "mu", latex: "\\mu", strokes: [m(27, 28, 27, 92, 12), [...E(45, 48, 18, 22, w, 0, 12), ...m(63, 48, 64, 70, 6), ...m(64, 70, 80, 58, 7)]] },
  { name: "pi", latex: "\\pi", strokes: [m(20, 32, 80, 32, 10), m(36, 32, 32, 80, 8), m(64, 32, 67, 80, 8)] },
  { name: "rho", latex: "\\rho", strokes: [[...m(33, 92, 34, 42, 9), ...E(48, 42, 15, 17, -w, w, 14)]] },
  { name: "sigma", latex: "\\sigma", strokes: [[...m(82, 26, 56, 32, 10), ...E(44, 58, 21, 24, -0.42 * w, 1.58 * w, 18)]] },
  { name: "tau", latex: "\\tau", strokes: [m(28, 32, 72, 32, 8), [...m(50, 32, 48, 76, 8), ...m(48, 76, 58, 83, 4)]] },
  { name: "phi", latex: "\\phi", strokes: [E(50, 52, 19, 25, -w / 2, 1.5 * w, 18), m(50, 14, 50, 92, 12)] },
  { name: "omega", latex: "\\omega", strokes: [[...E(36, 52, 13, 23, w, 0, 12), ...E(64, 52, 13, 23, w, 0, 12)]] },
  { name: "gamma", latex: "\\gamma", strokes: [[...m(26, 22, 50, 62, 9), ...m(50, 62, 52, 88, 5)], m(74, 22, 44, 74, 10)] },
  // Greek caps + the letters an equation cannot do without
  { name: "Sigma", latex: "\\sum", strokes: [[...m(76, 16, 26, 16, 8), ...m(26, 16, 56, 50, 7), ...m(56, 50, 26, 84, 7), ...m(26, 84, 76, 84, 8)]] },
  { name: "Delta", latex: "\\Delta", strokes: [[...m(50, 14, 22, 84, 10), ...m(22, 84, 78, 84, 9), ...m(78, 84, 50, 14, 10)]] },
  { name: "Omega", latex: "\\Omega", strokes: [[...m(18, 86, 38, 86, 7), ...E(50, 44, 24, 32, 0.68 * w, 2.32 * w, 18), ...m(62, 86, 82, 86, 7)]] },
  { name: "x", latex: "x", strokes: [m(30, 30, 70, 74, 10), m(70, 30, 30, 74, 10)] },
  { name: "t", latex: "t", strokes: [[...m(50, 15, 50, 80, 10), ...m(50, 80, 61, 84, 4)], m(33, 36, 68, 36, 7)] },
  { name: "n", latex: "n", strokes: [[...m(32, 86, 32, 40, 10), ...E(46, 58, 14, 16, w, 2 * w, 10), ...m(60, 58, 60, 86, 8)]] },
  { name: "e", latex: "e", strokes: [[...m(32, 52, 64, 52, 7), ...E(48, 52, 17, 19, 0, -1.55 * w, 14)]] },
  { name: "r", latex: "r", strokes: [[...m(34, 84, 34, 40, 8), ...E(47, 53, 13, 15, w, 1.85 * w, 8)]] }
], lr = 32, cr = 1.8;
function dr(o) {
  let p = 0;
  for (let i = 1; i < o.length; i++)
    o[i].id === o[i - 1].id && (p += Math.hypot(o[i].x - o[i - 1].x, o[i].y - o[i - 1].y));
  return p;
}
function hr(o, p) {
  const i = o.map((f) => ({ ...f })), h = dr(i) / (p - 1);
  if (!isFinite(h) || h <= 0) return i.slice(0, p);
  let l = 0;
  const y = [i[0]];
  for (let f = 1; f < i.length; f++)
    if (i[f].id === i[f - 1].id) {
      const v = Math.hypot(i[f].x - i[f - 1].x, i[f].y - i[f - 1].y);
      if (l + v >= h) {
        const z = (h - l) / v, j = {
          x: i[f - 1].x + z * (i[f].x - i[f - 1].x),
          y: i[f - 1].y + z * (i[f].y - i[f - 1].y),
          id: i[f].id
        };
        y.push(j), i.splice(f, 0, j), l = 0;
      } else l += v;
    }
  for (; y.length < p; ) y.push({ ...i[i.length - 1] });
  return y.slice(0, p);
}
function vn(o) {
  const p = [];
  if (o.forEach((T, C) => T.forEach(([L, I]) => p.push({ x: L, y: I, id: C }))), p.length < 2) return null;
  const i = hr(p, lr);
  let h = 1 / 0, l = -1 / 0, y = 1 / 0, f = -1 / 0;
  for (const T of i)
    h = Math.min(h, T.x), l = Math.max(l, T.x), y = Math.min(y, T.y), f = Math.max(f, T.y);
  const v = Math.max(l - h, f - y) || 1;
  let z = 0, j = 0;
  const P = i.map((T) => {
    const C = { x: (T.x - h) / v, y: (T.y - y) / v, id: T.id };
    return z += C.x, j += C.y, C;
  });
  return z /= P.length, j /= P.length, P.map((T) => ({ x: T.x - z, y: T.y - j, id: T.id }));
}
function mn(o, p, i) {
  const h = o.length, l = new Array(h).fill(!1);
  let y = 0, f = i;
  do {
    let v = 1 / 0, z = 0;
    for (let P = 0; P < h; P++) {
      if (l[P]) continue;
      const T = Math.hypot(o[f].x - p[P].x, o[f].y - p[P].y);
      T < v && (v = T, z = P);
    }
    l[z] = !0;
    const j = 1 - (f - i + h) % h / h;
    y += j * v, f = (f + 1) % h;
  } while (f !== i);
  return y;
}
function pr(o, p) {
  const i = o.length, h = Math.max(1, Math.floor(Math.sqrt(i)));
  let l = 1 / 0;
  for (let y = 0; y < i; y += h)
    l = Math.min(l, mn(o, p, y), mn(p, o, y));
  return l;
}
const ur = sr.map((o) => ({ ...o, cloud: vn(o.strokes) }));
function xr(o) {
  const p = vn(o);
  return p ? ur.map((i) => ({ name: i.name, latex: i.latex, d: pr(p, i.cloud) })).sort((i, h) => i.d - h.d) : [];
}
const br = (o) => {
  let p = 1 / 0, i = 1 / 0, h = -1 / 0, l = -1 / 0;
  for (const [y, f] of o)
    p = Math.min(p, y), h = Math.max(h, y), i = Math.min(i, f), l = Math.max(l, f);
  return { x0: p, y0: i, x1: h, y1: l };
};
function fr(o) {
  const p = o.map((h) => ({ strokes: [h], b: br(h) })).sort((h, l) => h.b.x0 - l.b.x0), i = [];
  for (const h of p) {
    const l = i[i.length - 1];
    if (l) {
      const y = Math.min(l.b.x1, h.b.x1) - Math.max(l.b.x0, h.b.x0), f = Math.max(4, Math.min(l.b.x1 - l.b.x0, h.b.x1 - h.b.x0));
      if (y > 0.34 * f) {
        l.strokes.push(...h.strokes), l.b = {
          x0: Math.min(l.b.x0, h.b.x0),
          y0: Math.min(l.b.y0, h.b.y0),
          x1: Math.max(l.b.x1, h.b.x1),
          y1: Math.max(l.b.y1, h.b.y1)
        };
        continue;
      }
    }
    i.push(h);
  }
  return i;
}
function gr(o) {
  const p = fr(o);
  if (!p.length) return null;
  const i = [];
  let h = 0;
  for (const y of p) {
    const f = xr(y.strokes);
    if (!f.length) return null;
    h = Math.max(h, f[0].d), i.push({ latex: f[0].latex, b: y.b });
  }
  let l = i[0].latex;
  for (let y = 1; y < i.length; y++) {
    const f = i[y - 1], v = i[y], z = f.b.y1 - f.b.y0, j = v.b.y1 - v.b.y0, P = (f.b.y0 + f.b.y1) / 2, T = (v.b.y0 + v.b.y1) / 2;
    j < 0.72 * z && T < P - 0.18 * z ? l += `^{${v.latex}}` : j < 0.72 * z && T > P + 0.18 * z ? l += `_{${v.latex}}` : l += " " + v.latex;
  }
  return { latex: l, worst: h };
}
let ge = null;
const yn = "[lse-notebook-block]";
function Mr() {
  const [o, p] = c.useState([]), [i, h] = c.useState(null), [l, y] = c.useState("select"), f = c.useRef("select");
  f.current = l;
  const [v, z] = c.useState([]), j = v.length ? v[v.length - 1] : null, P = c.useCallback((e) => z(e ? [e] : []), []), T = v.join(","), C = c.useRef([]);
  C.current = v;
  const [L, I] = c.useState(null), [S, R] = c.useState({ x: 0, y: 0, zoom: 1 }), [V, A] = c.useState(!1), [Y, Z] = c.useState(!1), ye = c.useRef(!1);
  ye.current = Y;
  const [je, Be] = c.useState(null), [gt, Ue] = c.useState(!1), Jt = c.useRef(!1);
  Jt.current = gt;
  const [ee, jn] = c.useState(() => {
    try {
      const e = JSON.parse(localStorage.getItem("lse.nbFavTools") || "[]");
      return Array.isArray(e) ? e.slice(0, 8) : [];
    } catch {
      return [];
    }
  }), Me = c.useCallback((e) => {
    jn(e);
    try {
      localStorage.setItem("lse.nbFavTools", JSON.stringify(e));
    } catch {
    }
  }, []), mt = c.useRef(null), [Ge, Mn] = c.useState(() => {
    try {
      const e = JSON.parse(localStorage.getItem("lse.nbFavBar") || "null");
      if (e && isFinite(e.x) && isFinite(e.y)) return e;
    } catch {
    }
    return { x: 340, y: 64 };
  }), yt = c.useRef(null);
  yt.current = je;
  const [kt, U] = c.useState(""), [Cn, We] = c.useState(null), [ke, Ae] = c.useState(null), [ue, _e] = c.useState(null), [xe, Sn] = c.useState(null), Kt = c.useRef(null), vt = c.useCallback((e) => {
    Kt.current = e, Sn(e);
  }, []), wt = c.useRef(!1), be = c.useRef(null), jt = c.useRef(null), Mt = c.useRef(null), $e = c.useRef(!1), [J, Nn] = c.useState(() => {
    try {
      const e = JSON.parse(localStorage.getItem("lse.nbPenOpts") || "null");
      if (e && isFinite(e.width)) return {
        color: e.color || "",
        width: e.width,
        highlighter: !!e.highlighter
      };
    } catch {
    }
    return { color: "", width: 2, highlighter: !1 };
  }), Ze = c.useCallback((e) => {
    Nn((n) => {
      const a = typeof e == "function" ? e(n) : e;
      try {
        localStorage.setItem("lse.nbPenOpts", JSON.stringify(a));
      } catch {
      }
      return a;
    });
  }, []), [_, zn] = c.useState(() => {
    try {
      const e = JSON.parse(localStorage.getItem("lse.nbShapeOpts") || "null");
      if (e && isFinite(e.width)) return {
        color: e.color || "",
        width: e.width,
        dash: !!e.dash,
        fill: e.fill || ""
      };
    } catch {
    }
    return { color: "", width: 2, dash: !1, fill: "" };
  }), Fe = c.useCallback((e) => {
    zn((n) => {
      const a = typeof e == "function" ? e(n) : e;
      try {
        localStorage.setItem("lse.nbShapeOpts", JSON.stringify(a));
      } catch {
      }
      return a;
    });
  }, []), [Ct, Pn] = c.useState(() => {
    try {
      return localStorage.getItem("lse.nbPenOnly") === "1";
    } catch {
      return !1;
    }
  }), [Xt, Tn] = c.useState(() => {
    try {
      const e = JSON.parse(localStorage.getItem("lse.nbToolPanel") || "null");
      if (e && isFinite(e.x) && isFinite(e.y)) return e;
    } catch {
    }
    return { x: 14, y: 14 };
  }), [St, Vt] = c.useState(null), [ze, Ln] = c.useState({ w: 360, h: 150 }), [K, qe] = c.useState(null), Qe = c.useRef(null);
  Qe.current = K;
  const Nt = c.useRef(null), [, He] = c.useState(0), [ve, Dn] = c.useState(!1), ie = c.useRef(null), et = c.useRef(null), Pe = c.useRef(null), Q = c.useRef(!1), F = c.useRef(null), he = c.useRef(S);
  F.current = i, he.current = S;
  const se = c.useRef({ past: [], future: [] }), D = c.useCallback(() => {
    const e = F.current;
    if (!e) return;
    const n = se.current;
    n.past.push(JSON.parse(JSON.stringify(e.blocks))), n.past.length > 100 && n.past.shift(), n.future = [], He((a) => a + 1);
  }, []), zt = c.useCallback(() => {
    const e = F.current, n = se.current;
    if (!e || !n.past.length) return;
    n.future.push(JSON.parse(JSON.stringify(e.blocks)));
    const a = n.past.pop();
    Q.current = !0, h((r) => r && { ...r, blocks: a }), P(null), I(null), He((r) => r + 1);
  }, []), tt = c.useCallback(() => {
    const e = F.current, n = se.current;
    if (!e || !n.future.length) return;
    n.past.push(JSON.parse(JSON.stringify(e.blocks)));
    const a = n.future.pop();
    Q.current = !0, h((r) => r && { ...r, blocks: a }), P(null), I(null), He((r) => r + 1);
  }, []), [Yt, Pt] = c.useState([]), Je = c.useRef(null), Ut = c.useCallback(async (e) => {
    if (!e) {
      Je.current = null, Pt([]);
      return;
    }
    try {
      const n = await fetch("/api/notebooks/" + e);
      if (!n.ok) return;
      const a = await n.json();
      Je.current = a, Pt((a.blocks || []).filter((r) => r.type === "math").map((r) => ({
        id: r.id,
        latex: r.latex,
        size: r.size || 30
      })));
    } catch {
    }
  }, []), fe = c.useCallback(async () => {
    try {
      const e = await fetch("/api/notebooks");
      if (e.ok) {
        const n = await e.json(), a = n.find((s) => (s.folder || "") === ".library"), r = n.filter((s) => (s.folder || "") !== ".library");
        p(r), window.dispatchEvent(new CustomEvent("lse-nb-list", { detail: r })), Ut(a ? a.id : null);
      }
    } catch {
    }
  }, [Ut]), nt = c.useCallback(async (e) => {
    try {
      const n = await fetch("/api/notebooks/" + e);
      if (!n.ok) throw new Error(String(n.status));
      const a = await n.json();
      h(a), R(a.view && isFinite(a.view.zoom) ? a.view : { x: 0, y: 0, zoom: 1 }), P(null), I(null), Q.current = !1, se.current = { past: [], future: [] }, He((r) => r + 1);
    } catch {
      U("could not open that notebook");
    }
  }, []), Te = c.useCallback(async () => {
    if (ve) {
      U("Notebooks are saved on your own machine, so they need the downloaded app. This page is the hosted preview.");
      return;
    }
    try {
      const e = await fetch("/api/notebooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Untitled" })
      });
      if (e.status === 404) throw new Error(
        "this app's engine does not have notebooks yet; update the app (or restart it if an update is already installed)"
      );
      if (!e.ok) throw new Error((await e.json().catch(() => ({}))).detail || String(e.status));
      const n = await e.json();
      await fe(), h(n), R({ x: 0, y: 0, zoom: 1 }), P(null), We(n.id), se.current = { past: [], future: [] };
    } catch (e) {
      U(String(e.message || e));
    }
  }, [fe, ve]), On = c.useCallback(async (e) => {
    window.confirm("Delete this notebook and everything on its canvas?") && (await fetch("/api/notebooks/" + e, { method: "DELETE" }), F.current?.id === e && h(null), fe());
  }, [fe]), rt = c.useCallback(async (e) => {
    const n = await fetch("/api/notebooks/" + e.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e)
    });
    if (!n.ok) throw new Error((await n.json().catch(() => ({}))).detail || String(n.status));
    Je.current = e, Pt(e.blocks.filter((a) => a.type === "math").map((a) => ({
      id: a.id,
      latex: a.latex,
      size: a.size || 30
    })));
  }, []), Gt = c.useCallback(async (e, n) => {
    const a = (e || "").trim();
    if (!a) {
      U("nothing in the equation yet");
      return;
    }
    try {
      let r = Je.current;
      if (!r) {
        const s = await fetch("/api/notebooks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "Saved equations", folder: ".library" })
        });
        if (!s.ok) throw new Error((await s.json().catch(() => ({}))).detail || String(s.status));
        r = await s.json();
      }
      if (A(!0), r.blocks.some((s) => s.type === "math" && s.latex.trim() === a)) {
        U("already in your saved equations");
        return;
      }
      await rt({ ...r, blocks: [
        ...r.blocks,
        {
          id: ae(),
          type: "math",
          x: 0,
          y: 0,
          w: 380,
          h: 130,
          latex: a,
          size: n || 30
        }
      ] }), U("equation saved");
    } catch (r) {
      U("could not save the equation: " + String(r.message || r));
    }
  }, [rt]), En = c.useCallback(async (e) => {
    const n = Je.current;
    if (n)
      try {
        await rt({ ...n, blocks: n.blocks.filter((a) => a.id !== e) });
      } catch (a) {
        U("could not remove it: " + String(a.message || a));
      }
  }, [rt]);
  c.useEffect(() => {
    fe(), fetch("/api/config").then((e) => e.json()).then((e) => Dn(!!e.hosted)).catch(() => {
    });
  }, [fe]), c.useEffect(() => {
    window.dispatchEvent(new Event("lse-nb-rail"));
  }, []), c.useEffect(() => {
    const e = () => {
      const n = window.__lseNbPending;
      n && (window.__lseNbPending = null, n === "__new__" ? Te() : nt(String(n)));
    };
    return e(), window.addEventListener("lse-nb-open", e), () => window.removeEventListener("lse-nb-open", e);
  }, [nt, Te]), c.useEffect(() => {
    if (!i || !Q.current) return;
    const e = setTimeout(async () => {
      const n = F.current;
      if (n)
        try {
          const a = await fetch("/api/notebooks/" + n.id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...n, view: he.current })
          });
          if (!a.ok) throw new Error((await a.json().catch(() => ({}))).detail || String(a.status));
          Q.current = !1, U(""), fe();
        } catch (a) {
          U("not saved: " + String(a.message || a));
        }
    }, 700);
    return () => clearTimeout(e);
  }, [i, S, fe]);
  const H = c.useCallback((e) => {
    Q.current = !0, h((n) => n && { ...n, blocks: e(n.blocks) });
  }, []), Tt = c.useCallback((e) => {
    Q.current = !0, h((n) => n && { ...n, ...e });
  }, []), we = c.useCallback((e, n) => {
    H((a) => a.map((r) => r.id === e ? { ...r, ...n } : r));
  }, [H]), q = c.useCallback((e, n) => {
    D(), we(e, n);
  }, [D, we]), G = c.useCallback((e) => (D(), Q.current = !0, h((n) => n && { ...n, blocks: [...n.blocks, e] }), e.id), [D]), Ce = c.useCallback((e, n, a) => {
    const r = ae();
    return e === "math" ? (G({ id: r, type: "math", x: n, y: a, w: 380, h: 130, latex: "", size: 30 }), A(!0)) : G(e === "sticky" ? {
      id: r,
      type: "text",
      x: n,
      y: a,
      w: 240,
      h: 200,
      text: "",
      size: 17,
      bg: Zn
    } : e === "code" ? {
      id: r,
      type: "text",
      x: n,
      y: a,
      w: 420,
      h: 150,
      text: "",
      size: 13,
      bg: Qn,
      mono: !0
    } : { id: r, type: "text", x: n, y: a, w: 320, h: 90, text: "", size: 15 }), I(r), r;
  }, [G]), Zt = c.useCallback((e) => {
    D(), H((n) => n.filter((a) => a.id !== e)), P(null);
  }, [D, H, P]), ot = c.useCallback(() => {
    const e = new Set(C.current);
    e.size && (D(), H((n) => n.filter((a) => !e.has(a.id))), z([]), I(null));
  }, [D, H]), Ke = c.useCallback(() => {
    const e = F.current, n = C.current;
    if (!e || !n.length) return;
    const a = e.blocks.filter((r) => n.includes(r.id)).map((r) => ({
      ...JSON.parse(JSON.stringify(r)),
      id: ae(),
      x: r.x + 24,
      y: r.y + 24
    }));
    a.length && (D(), Q.current = !0, h((r) => r && { ...r, blocks: [...r.blocks, ...a] }), z(a.map((r) => r.id)));
  }, [D]), Qt = c.useCallback((e, n) => {
    const a = new Set(C.current);
    a.size && (D(), H((r) => r.map((s) => a.has(s.id) && (!n || n(s)) ? { ...s, ...e } : s)));
  }, [D, H]), Rn = c.useCallback((e) => {
    const n = F.current, a = new Set(C.current), r = n?.blocks.filter((x) => a.has(x.id)) || [];
    if (r.length < 2) return;
    const s = Math.min(...r.map((x) => x.x)), b = Math.max(...r.map((x) => x.x + x.w)), d = Math.min(...r.map((x) => x.y)), u = Math.max(...r.map((x) => x.y + x.h));
    D(), H((x) => x.map((M) => {
      if (!a.has(M.id)) return M;
      switch (e) {
        case "left":
          return { ...M, x: s };
        case "right":
          return { ...M, x: b - M.w };
        case "centerX":
          return { ...M, x: (s + b) / 2 - M.w / 2 };
        case "top":
          return { ...M, y: d };
        case "bottom":
          return { ...M, y: u - M.h };
        default:
          return { ...M, y: (d + u) / 2 - M.h / 2 };
      }
    }));
  }, [D, H]), en = c.useCallback(() => {
    const e = F.current;
    !e || !e.blocks.length || window.confirm(`Delete all ${e.blocks.length} ${e.blocks.length === 1 ? "item" : "items"} on this canvas? Ctrl+Z brings them back.`) && (D(), H(() => []), z([]), I(null));
  }, [D, H]), at = c.useCallback((e, n) => {
    D(), H((a) => {
      const r = a.find((b) => b.id === e);
      if (!r) return a;
      const s = a.filter((b) => b.id !== e);
      return n ? [...s, r] : [r, ...s];
    });
  }, [D, H]), le = c.useCallback((e, n) => {
    const a = ie.current, r = a?.offsetLeft || 0, s = a?.offsetTop || 0, b = a?.clientWidth || 800, d = a?.clientHeight || 600;
    return {
      x: ne(e, r + 6, Math.max(r + 6, r + b - ze.w - 6)),
      y: ne(n, s + 6, Math.max(s + 6, s + d - ze.h - 6))
    };
  }, [ze]), it = c.useCallback((e, n) => {
    Ln((a) => Math.abs(a.w - e) < 2 && Math.abs(a.h - n) < 2 ? a : { w: e, h: n });
  }, []), tn = c.useCallback((e, n) => {
    const a = le(e, n);
    Tn(a);
    try {
      localStorage.setItem("lse.nbToolPanel", JSON.stringify(a));
    } catch {
    }
  }, [le]), nn = c.useCallback((e, n) => {
    Vt(le(e, n));
  }, [le]), In = c.useCallback((e, n) => {
    const a = le(e, n);
    Mn(a);
    try {
      localStorage.setItem("lse.nbFavBar", JSON.stringify(a));
    } catch {
    }
  }, [le]);
  c.useEffect(() => {
    Vt(null);
  }, [T]);
  const Lt = c.useCallback(() => {
    const e = (F.current?.blocks || []).filter((k) => k.type === "ink" && C.current.includes(k.id));
    if (!e.length) return;
    const n = e.map((k) => k.points.map(([N, O]) => [k.x + N, k.y + O])), a = gr(n);
    if (!a || a.worst > cr) {
      U("could not read that as maths; larger and cleaner helps");
      return;
    }
    const r = Math.min(...e.map((k) => k.x)), s = Math.min(...e.map((k) => k.y)), b = Math.max(...e.map((k) => k.x + k.w)), d = Math.max(...e.map((k) => k.y + k.h)), u = ne(Math.round((d - s) * 0.75), 14, 200), x = ae(), M = new Set(e.map((k) => k.id));
    D(), Q.current = !0, h((k) => k && { ...k, blocks: [
      ...k.blocks.filter((N) => !M.has(N.id)),
      {
        id: x,
        type: "math",
        x: r,
        y: s,
        w: Math.max(120, (b - r) * 1.25),
        h: Math.max(60, (d - s) * 1.25),
        latex: a.latex,
        size: u
      }
    ] }), z([x]), U("");
  }, [D]), rn = c.useCallback((e) => {
    const n = F.current?.blocks.find((s) => s.id === j);
    if (!n) return;
    const a = Math.max(bt, n.w * e), r = Math.max(ft, n.h * e);
    q(n.id, {
      w: a,
      h: r,
      x: n.x + (n.w - a) / 2,
      y: n.y + (n.h - r) / 2
    });
  }, [j, q]), Xe = c.useCallback(async (e, n) => {
    const a = e.type || "image/png";
    if (!/^image\//.test(a)) {
      U("only images can go on the canvas");
      return;
    }
    U("uploading image…");
    const r = await new Promise((s, b) => {
      const d = new FileReader();
      d.onload = () => s(String(d.result).split(",")[1] || ""), d.onerror = b, d.readAsDataURL(e);
    });
    try {
      const s = await fetch("/api/notebooks/asset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: r, mime: a })
      });
      if (!s.ok) throw new Error((await s.json().catch(() => ({}))).detail || String(s.status));
      const { src: b } = await s.json(), d = await new Promise((M) => {
        const k = new Image();
        k.onload = () => M({ w: k.naturalWidth || 480, h: k.naturalHeight || 320 }), k.onerror = () => M({ w: 480, h: 320 }), k.src = b;
      }), u = Math.min(1, 520 / Math.max(d.w, 1)), x = n || Le();
      G({
        id: ae(),
        type: "image",
        src: b,
        name: e.name,
        x: x.x - d.w * u / 2,
        y: x.y - d.h * u / 2,
        w: Math.round(d.w * u),
        h: Math.round(d.h * u)
      }), U("");
    } catch (s) {
      U("image not saved: " + String(s.message || s));
    }
  }, [G]), st = c.useCallback((e, n) => {
    if (!n.length) return;
    const a = Math.min(...n.map((N) => N.x)), r = Math.min(...n.map((N) => N.y)), s = Math.max(...n.map((N) => N.x + N.w)), b = Math.max(...n.map((N) => N.y + N.h)), d = (a + s) / 2, u = (r + b) / 2, x = Math.max(...n.map((N) => Math.max(bt / Math.max(N.w, 1e-3), ft / Math.max(N.h, 1e-3)))), M = ne(e, x, 60), k = new Map(n.map((N) => [N.id, N]));
    H((N) => N.map((O) => {
      const X = k.get(O.id);
      if (!X) return O;
      const de = {
        x: d + (X.x - d) * M,
        y: u + (X.y - u) * M,
        w: X.w * M,
        h: X.h * M
      };
      return X.size && (de.size = ne(Math.round(X.size * M), 6, 400)), { ...O, ...de };
    }));
  }, [H]), Dt = c.useCallback(() => {
    const e = new Set(C.current);
    return (F.current?.blocks || []).filter((n) => e.has(n.id)).map((n) => ({
      id: n.id,
      x: n.x,
      y: n.y,
      w: n.w,
      h: n.h,
      size: n.size
    }));
  }, []), on = c.useRef(0), lt = c.useRef(1), an = c.useRef([]), Le = c.useCallback(() => {
    const e = ie.current?.getBoundingClientRect(), n = he.current;
    return e ? fn(n, e.width / 2, e.height / 2) : { x: 0, y: 0 };
  }, []), Bn = c.useCallback((e) => {
    const n = ie.current?.getBoundingClientRect();
    if (!n) return;
    Qe.current && qe(null);
    const a = e.clientX - n.left, r = e.clientY - n.top, s = e.deltaY * (e.deltaMode === 1 ? 33 : 1);
    if (e.ctrlKey && C.current.length) {
      const b = Date.now();
      b - on.current > 700 && (D(), an.current = Dt()), on.current = b, lt.current = ne(lt.current * Math.exp(-s / 700), 0.01, 60), st(lt.current, an.current);
      return;
    }
    lt.current = 1, R((b) => {
      const d = ne(b.zoom * Math.exp(-s / 700), Ie, _t);
      return { zoom: d, x: a - (a - b.x) / b.zoom * d, y: r - (r - b.y) / b.zoom * d };
    });
  }, [D, Dt, st]), sn = c.useCallback((e) => {
    const n = ie.current?.getBoundingClientRect(), a = (n?.width || 0) / 2, r = (n?.height || 0) / 2;
    R((s) => {
      const b = ne(s.zoom * e, Ie, _t);
      return { zoom: b, x: a - (a - s.x) / s.zoom * b, y: r - (r - s.y) / s.zoom * b };
    });
  }, []), ct = c.useCallback(() => {
    const e = F.current, n = ie.current?.getBoundingClientRect();
    if (!e || !n || !e.blocks.length) {
      R({ x: 0, y: 0, zoom: 1 });
      return;
    }
    let a = 1 / 0, r = 1 / 0, s = -1 / 0, b = -1 / 0;
    for (const x of e.blocks)
      a = Math.min(a, x.x), r = Math.min(r, x.y), s = Math.max(s, x.x + x.w), b = Math.max(b, x.y + x.h);
    const d = 60, u = ne(Math.min(
      (n.width - d * 2) / Math.max(s - a, 1),
      (n.height - d * 2) / Math.max(b - r, 1)
    ), Ie, 1.6);
    R({ zoom: u, x: n.width / 2 - (a + s) / 2 * u, y: n.height / 2 - (r + b) / 2 * u });
  }, []), B = c.useRef(null), ln = c.useRef({ block: null, ui: !1 }), te = c.useRef(/* @__PURE__ */ new Map()), ce = c.useRef(null), dt = c.useRef(!1), Ot = c.useRef(0), pe = c.useCallback((e) => {
    const n = ie.current?.getBoundingClientRect();
    return n ? fn(he.current, e.clientX - n.left, e.clientY - n.top) : { x: 0, y: 0 };
  }, []), re = c.useRef(!1), ht = c.useCallback((e, n) => {
    const a = he.current.zoom;
    h((r) => {
      if (!r) return r;
      const s = r.blocks.filter((b) => {
        if (b.type !== "ink") return !0;
        const d = 10 / a + (b.width || 2) / 2;
        for (const [u, x] of b.points) {
          const M = b.x + u - e, k = b.y + x - n;
          if (M * M + k * k < d * d) return !1;
        }
        return !0;
      });
      return s.length === r.blocks.length ? r : (re.current || (re.current = !0, se.current.past.push(JSON.parse(JSON.stringify(r.blocks))), se.current.past.length > 100 && se.current.past.shift(), se.current.future = []), Q.current = !0, { ...r, blocks: s });
    }), He((r) => r + 1);
  }, []), Et = c.useCallback((e) => ee.some((n) => n.tool === e), [ee]), Rt = c.useCallback((e) => {
    if (ee.some((a) => a.tool === e)) {
      Me(ee.filter((a) => a.tool !== e));
      return;
    }
    const n = e === "pen" || e === "highlighter" ? { tool: e, color: J.color, width: J.width } : ["line", "arrow", "rect", "ellipse", "triangle", "diamond", "star"].includes(e) ? {
      tool: e,
      color: _.color,
      width: _.width,
      dash: _.dash || void 0,
      fill: _.fill || void 0
    } : { tool: e, color: "", width: 0 };
    Me([...ee, n].slice(-8));
  }, [ee, J, _, Me]), Se = c.useCallback((e) => {
    e === f.current ? Ue((n) => !n) : (y(e), Ue(!1));
  }, []), It = [
    "line",
    "arrow",
    "rect",
    "ellipse",
    "triangle",
    "diamond",
    "star"
  ], Wn = ["pen", "highlighter", "eraser", ...It], pt = c.useCallback((e) => {
    const n = pe({ clientX: e.cx, clientY: e.cy }), a = ie.current, r = a?.getBoundingClientRect();
    e.blockId && !C.current.includes(e.blockId) && P(e.blockId), qe({
      x: e.cx - (r?.left || 0) + (a?.offsetLeft || 0),
      y: e.cy - (r?.top || 0) + (a?.offsetTop || 0),
      wx: n.x,
      wy: n.y,
      blockId: e.blockId
    });
  }, [pe, P]), An = c.useCallback((e) => {
    if (!i) return;
    e.preventDefault();
    const n = e.target.closest("[data-block]"), a = {
      cx: e.clientX,
      cy: e.clientY,
      blockId: n ? n.dataset.block : null
    };
    if (be.current) {
      Mt.current = a;
      return;
    }
    const r = jt.current;
    jt.current = null, !r?.moved && pt(a);
  }, [i, pt]), _n = c.useCallback((e) => {
    if (!i) return;
    if (Qe.current && qe(null), ye.current && Z(!1), yt.current && Be(null), e.button === 2) {
      B.current || (be.current = { sx: e.clientX, sy: e.clientY, moved: !1 }, B.current = { kind: "pan", sx: e.clientX, sy: e.clientY, vx: S.x, vy: S.y }, ce.current = e.pointerId);
      return;
    }
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
    }
    if (e.pointerType === "pen" && (Ot.current = Date.now(), B.current && !dt.current && (B.current = null, ce.current = null, Ae(null), _e(null))), e.pointerType === "touch") {
      if (te.current.set(e.pointerId, { x: e.clientX, y: e.clientY }), dt.current || Date.now() - Ot.current < 800 || B.current?.kind === "pinch" || B.current?.kind === "pinchsize") return;
      if (te.current.size === 2) {
        Ae(null), _e(null);
        const [d, u] = [...te.current.values()], x = Math.hypot(d.x - u.x, d.y - u.y) || 1;
        $e.current = !1;
        const M = Dt();
        if (M.length) {
          re.current = !1, B.current = { kind: "pinchsize", d0: x, start: M }, ce.current = null;
          return;
        }
        const k = ie.current?.getBoundingClientRect(), N = (d.x + u.x) / 2 - (k?.left || 0), O = (d.y + u.y) / 2 - (k?.top || 0), X = he.current;
        B.current = {
          kind: "pinch",
          d0: x,
          z0: X.zoom,
          wx: (N - X.x) / X.zoom,
          wy: (O - X.y) / X.zoom
        }, ce.current = null;
        return;
      }
    }
    const n = e.target, a = n.closest("[data-block]"), r = n.closest("[data-handle]");
    if (ln.current = {
      block: a && a.dataset.block || null,
      ui: !!(a || r)
    }, ce.current = e.pointerId, dt.current = e.pointerType === "pen", e.button === 1 || l === "hand" || wt.current) {
      B.current = { kind: "pan", sx: e.clientX, sy: e.clientY, vx: S.x, vy: S.y };
      return;
    }
    if (e.button !== 0) return;
    const s = pe(e);
    if (Ct && e.pointerType === "touch" && Wn.includes(l)) {
      B.current = { kind: "pan", sx: e.clientX, sy: e.clientY, vx: S.x, vy: S.y };
      return;
    }
    if (l === "pen" || l === "highlighter") {
      Ae([[s.x, s.y]]), B.current = { kind: "ink" };
      return;
    }
    if (l === "eraser") {
      re.current = !1, B.current = { kind: "erase" }, ht(s.x, s.y);
      return;
    }
    if (It.includes(l)) {
      _e({ shape: l, x1: s.x, y1: s.y, x2: s.x, y2: s.y }), B.current = { kind: "shape" };
      return;
    }
    if (l === "text" || l === "sticky" || l === "code" || l === "math") {
      e.preventDefault(), P(Ce(l, s.x, s.y)), y("select");
      return;
    }
    if (r && j) {
      const d = i.blocks.find((u) => u.id === j);
      if (d) {
        re.current = !1;
        const u = r.dataset.handle || "br";
        B.current = {
          kind: "resize",
          id: d.id,
          ax: u.includes("l") ? d.x + d.w : d.x,
          ay: u.includes("t") ? d.y + d.h : d.y,
          bw: d.w,
          bh: d.h
        };
        return;
      }
    }
    if (a) {
      $e.current = !1;
      const d = a.dataset.block, u = i.blocks.find((k) => k.id === d);
      let x = C.current;
      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        x = x.includes(d) ? x.filter((k) => k !== d) : [...x, d], z(x), I(null);
        return;
      }
      if (u && (u.type === "text" || u.type === "math") && x.length === 1 && x[0] === d && L !== d) {
        e.preventDefault(), I(d), u.type === "math" && A(!0);
        return;
      }
      if (x.includes(d) || (x = [d], z(x)), L && L !== d && I(null), u && L !== d) {
        re.current = !1;
        const k = i.blocks.filter((N) => x.includes(N.id)).map((N) => ({ id: N.id, bx: N.x, by: N.y }));
        B.current = { kind: "move", id: d, ox: s.x, oy: s.y, at: k };
      }
      return;
    }
    if (!(e.shiftKey || e.ctrlKey || e.metaKey)) {
      e.pointerType === "touch" ? $e.current = !0 : (z([]), I(null)), B.current = { kind: "pan", sx: e.clientX, sy: e.clientY, vx: S.x, vy: S.y };
      return;
    }
    if (e.pointerType === "touch") {
      B.current = { kind: "pan", sx: e.clientX, sy: e.clientY, vx: S.x, vy: S.y };
      return;
    }
    vt({ x1: s.x, y1: s.y, x2: s.x, y2: s.y }), B.current = { kind: "marquee", ax: s.x, ay: s.y, add: [] };
  }, [
    i,
    l,
    S.x,
    S.y,
    j,
    L,
    Ce,
    pe,
    D,
    ht,
    Ct,
    P
  ]), $n = c.useCallback((e) => {
    e.pointerType === "pen" && (Ot.current = Date.now()), e.pointerType === "touch" && te.current.has(e.pointerId) && te.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const n = B.current;
    if (!n) return;
    if (n.kind === "pinchsize") {
      if (te.current.size < 2) return;
      const [r, s] = [...te.current.values()];
      re.current || (D(), re.current = !0), st((Math.hypot(r.x - s.x, r.y - s.y) || 1) / n.d0, n.start);
      return;
    }
    if (n.kind === "pinch") {
      if (te.current.size < 2) return;
      const [r, s] = [...te.current.values()], b = ie.current?.getBoundingClientRect(), d = (r.x + s.x) / 2 - (b?.left || 0), u = (r.y + s.y) / 2 - (b?.top || 0), x = ne(n.z0 * (Math.hypot(r.x - s.x, r.y - s.y) || 1) / n.d0, Ie, _t);
      R({ zoom: x, x: d - n.wx * x, y: u - n.wy * x });
      return;
    }
    if (ce.current !== null && e.pointerId !== ce.current) return;
    if (n.kind === "pan") {
      be.current && Math.abs(e.clientX - be.current.sx) + Math.abs(e.clientY - be.current.sy) > 6 && (be.current.moved = !0), R((r) => ({ ...r, x: n.vx + (e.clientX - n.sx), y: n.vy + (e.clientY - n.sy) }));
      return;
    }
    const a = pe(e);
    if (n.kind === "ink") {
      const r = e.nativeEvent, s = typeof r.getCoalescedEvents == "function" ? r.getCoalescedEvents() : [], b = (s.length ? s : [r]).map((d) => {
        const u = pe(d);
        return [u.x, u.y];
      });
      Ae((d) => d ? [...d, ...b] : b);
    } else if (n.kind === "erase")
      ht(a.x, a.y);
    else if (n.kind === "shape")
      _e((r) => r && { ...r, x2: a.x, y2: a.y });
    else if (n.kind === "marquee")
      vt({ x1: n.ax, y1: n.ay, x2: a.x, y2: a.y });
    else if (n.kind === "move") {
      re.current || (D(), re.current = !0);
      const r = a.x - n.ox, s = a.y - n.oy, b = new Map(n.at.map((d) => [d.id, d]));
      H((d) => d.map((u) => {
        const x = b.get(u.id);
        return x ? { ...u, x: x.bx + r, y: x.by + s } : u;
      }));
    } else if (n.kind === "resize") {
      re.current || (D(), re.current = !0);
      const r = F.current?.blocks.find((d) => d.id === n.id);
      let s = Math.max(bt, Math.abs(a.x - n.ax)), b = Math.max(ft, Math.abs(a.y - n.ay));
      if (r?.type === "image" && !e.shiftKey && n.bw > 0 && n.bh > 0) {
        const d = Math.max(s / n.bw, b / n.bh);
        s = Math.max(bt, n.bw * d), b = Math.max(ft, n.bh * d);
      }
      we(n.id, {
        w: s,
        h: b,
        x: a.x < n.ax ? n.ax - s : n.ax,
        y: a.y < n.ay ? n.ay - b : n.ay
      });
    }
  }, [we, H, pe, ht, D, st]), cn = c.useCallback((e) => {
    e.pointerType === "touch" && te.current.delete(e.pointerId);
    const n = B.current;
    if (n?.kind === "pinchsize") {
      te.current.size < 2 && (B.current = null);
      return;
    }
    if (n?.kind === "pinch") {
      if (te.current.size === 1) {
        const [[r, s]] = [...te.current.entries()];
        B.current = {
          kind: "pan",
          sx: s.x,
          sy: s.y,
          vx: he.current.x,
          vy: he.current.y
        }, ce.current = r;
      } else te.current.size === 0 && (B.current = null);
      return;
    }
    if (ce.current !== null && e.pointerId !== ce.current) return;
    if (be.current) {
      const r = be.current;
      be.current = null, jt.current = { moved: r.moved };
      const s = Mt.current;
      Mt.current = null, s && !r.moved && pt(s);
    }
    if ($e.current) {
      $e.current = !1;
      const r = B.current;
      (r?.kind === "pan" ? Math.abs(e.clientX - r.sx) + Math.abs(e.clientY - r.sy) : 99) < 8 && (z([]), I(null));
    }
    ce.current = null, dt.current = !1;
    const a = B.current;
    if (B.current = null, a?.kind === "marquee") {
      const r = Kt.current;
      vt(null);
      const s = F.current;
      if (r && s) {
        const b = Math.min(r.x1, r.x2), d = Math.max(r.x1, r.x2), u = Math.min(r.y1, r.y2), x = Math.max(r.y1, r.y2);
        if ((d - b) * he.current.zoom > 4 || (x - u) * he.current.zoom > 4) {
          const M = s.blocks.filter((N) => N.x < d && N.x + N.w > b && N.y < x && N.y + N.h > u).map((N) => N.id), k = a.add.filter((N) => !M.includes(N));
          z([...k, ...M]);
        }
      }
      return;
    }
    if (a?.kind === "ink" && ke && ke.length) {
      const { x0: r, y0: s, x1: b, y1: d } = ar(ke), u = J.highlighter;
      G({
        id: ae(),
        type: "ink",
        x: r,
        y: s,
        w: Math.max(1, b - r),
        h: Math.max(1, d - s),
        points: ke.map(([x, M]) => [x - r, M - s]),
        color: J.color || "currentColor",
        // The highlighter is the same stroke, wide and translucent; width
        // scales off the pen setting so every nib has a marker.
        width: u ? J.width * 5 : J.width,
        mode: u ? "highlighter" : "pen"
      }), Ae(null);
    }
    if (a?.kind === "shape" && ue) {
      const r = ue, s = Math.min(r.x1, r.x2), b = Math.min(r.y1, r.y2), d = Math.abs(r.x2 - r.x1), u = Math.abs(r.y2 - r.y1);
      if (_e(null), d < 3 && u < 3) return;
      const x = r.shape === "line" || r.shape === "arrow" ? 6 : 0;
      G({
        id: ae(),
        type: "shape",
        shape: r.shape,
        x: s - x,
        y: b - x,
        w: Math.max(d, 1) + x * 2,
        h: Math.max(u, 1) + x * 2,
        x1: r.x1 - s + x,
        y1: r.y1 - b + x,
        x2: r.x2 - s + x,
        y2: r.y2 - b + x,
        ow: Math.max(d, 1) + x * 2,
        oh: Math.max(u, 1) + x * 2,
        color: _.color || "currentColor",
        width: _.width,
        dash: _.dash || void 0,
        fill: _.fill || void 0
      });
    }
  }, [ke, G, J, ue, _, pt]);
  c.useEffect(() => {
    (l === "pen" || l === "highlighter") && Ze((e) => e.highlighter === (l === "highlighter") ? e : { ...e, highlighter: l === "highlighter" });
  }, [l]);
  const dn = c.useRef(0);
  c.useEffect(() => {
    const e = (r) => {
      const s = r.target, b = s && (s.tagName === "TEXTAREA" || s.tagName === "INPUT");
      if (r.key === "Escape") {
        if (Jt.current) {
          Ue(!1);
          return;
        }
        if (yt.current) {
          Be(null);
          return;
        }
        if (ye.current) {
          Z(!1);
          return;
        }
        if (Qe.current) {
          qe(null);
          return;
        }
        if (L) {
          I(null);
          return;
        }
        z([]), y("select");
        return;
      }
      r.code === "Space" && !b && (wt.current = !0, r.repeat || r.preventDefault());
      const d = r.key.toLowerCase();
      if ((r.ctrlKey || r.metaKey) && d === "z") {
        r.preventDefault(), r.shiftKey ? tt() : zt();
        return;
      }
      if ((r.ctrlKey || r.metaKey) && d === "y") {
        r.preventDefault(), tt();
        return;
      }
      if ((r.ctrlKey || r.metaKey) && d === "a" && !b) {
        r.preventDefault(), z((F.current?.blocks || []).map((x) => x.id));
        return;
      }
      if (b) return;
      if ((r.key === "Delete" || r.key === "Backspace") && C.current.length) {
        r.preventDefault(), ot();
        return;
      }
      if (C.current.length && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(r.key)) {
        r.preventDefault();
        const x = Date.now();
        x - dn.current > 1e3 && D(), dn.current = x;
        const M = r.shiftKey ? 10 : 1, k = r.key === "ArrowLeft" ? -M : r.key === "ArrowRight" ? M : 0, N = r.key === "ArrowUp" ? -M : r.key === "ArrowDown" ? M : 0, O = new Set(C.current);
        H((X) => X.map((de) => O.has(de.id) ? { ...de, x: de.x + k, y: de.y + N } : de));
        return;
      }
      const u = {
        v: "select",
        h: "hand",
        t: "text",
        n: "sticky",
        c: "code",
        m: "math",
        p: "pen",
        g: "highlighter",
        e: "eraser",
        l: "line",
        a: "arrow",
        r: "rect",
        o: "ellipse",
        y: "triangle",
        d: "diamond",
        s: "star",
        i: "image"
      };
      if (u[d] && !r.ctrlKey && !r.metaKey && !r.altKey && (d === "i" ? et.current?.click() : Se(u[d])), (r.ctrlKey || r.metaKey) && d === "d" && C.current.length && (r.preventDefault(), Ke()), (r.ctrlKey || r.metaKey) && d === "c" && C.current.length) {
        const x = C.current, M = (F.current?.blocks || []).filter((k) => x.includes(k.id));
        M.length && (ge = JSON.parse(JSON.stringify(M)), navigator.clipboard?.writeText?.(yn).catch(() => {
        }));
      }
      (r.ctrlKey || r.metaKey) && d === "0" && (r.preventDefault(), ct());
    }, n = (r) => {
      r.code === "Space" && (wt.current = !1);
    }, a = (r) => {
      if (!F.current) return;
      const s = r.target;
      if (s && (s.tagName === "TEXTAREA" || s.tagName === "INPUT")) return;
      for (const d of Array.from(r.clipboardData?.items || []))
        if (d.type.startsWith("image/")) {
          const u = d.getAsFile();
          if (u) {
            r.preventDefault(), Xe(u);
            return;
          }
        }
      const b = r.clipboardData?.getData("text/plain");
      if (b === yn && ge?.length) {
        r.preventDefault();
        const d = Le(), u = Math.min(...ge.map((O) => O.x)), x = Math.min(...ge.map((O) => O.y)), M = Math.max(...ge.map((O) => O.x + O.w)) - u, k = Math.max(...ge.map((O) => O.y + O.h)) - x, N = ge.map((O) => ({
          ...JSON.parse(JSON.stringify(O)),
          id: ae(),
          x: O.x - u + d.x - M / 2,
          y: O.y - x + d.y - k / 2
        }));
        D(), Q.current = !0, h((O) => O && { ...O, blocks: [...O.blocks, ...N] }), z(N.map((O) => O.id));
        return;
      }
      if (b) {
        const d = Le(), u = ae();
        G({
          id: u,
          type: "text",
          x: d.x - 160,
          y: d.y - 40,
          w: 320,
          h: Math.max(90, 24 + b.split(`
`).length * 20),
          text: b,
          size: 15
        }), P(u);
      }
    };
    return window.addEventListener("keydown", e), window.addEventListener("keyup", n), window.addEventListener("paste", a), () => {
      window.removeEventListener("keydown", e), window.removeEventListener("keyup", n), window.removeEventListener("paste", a);
    };
  }, [
    L,
    H,
    G,
    Xe,
    Le,
    ct,
    zt,
    tt,
    ot,
    Ke,
    D,
    P,
    Se
  ]);
  const Fn = c.useCallback((e) => {
    if (e.preventDefault(), !i) return;
    const n = pe(e), a = e.dataTransfer.getData("application/x-lse-eq");
    if (a) {
      try {
        const { latex: r, size: s } = JSON.parse(a), b = ae();
        G({
          id: b,
          type: "math",
          x: n.x - 190,
          y: n.y - 65,
          w: 380,
          h: 130,
          latex: String(r || ""),
          size: isFinite(s) ? s : 30
        }), P(b);
      } catch {
      }
      return;
    }
    for (const r of Array.from(e.dataTransfer.files || []))
      r.type.startsWith("image/") && Xe(r, n);
  }, [i, Xe, pe, G, P]);
  c.useLayoutEffect(() => {
    if (L && Pe.current) {
      const e = Pe.current;
      e.focus();
      const n = e.value.length;
      e.setSelectionRange(n, n), requestAnimationFrame(() => {
        Pe.current === e && document.activeElement !== e && e.focus();
      });
    }
  }, [L]);
  const hn = c.useRef(null);
  c.useEffect(() => {
    L && L !== hn.current && D(), hn.current = L;
  }, [L, D]);
  const pn = c.useCallback((e) => {
    const n = Pe.current, a = L;
    if (!n || !a) {
      const k = Le(), N = ae(), O = e.replace("@", "");
      G({
        id: N,
        type: "math",
        x: k.x - 190,
        y: k.y - 65,
        w: 380,
        h: 130,
        latex: O,
        size: 30
      }), P(N), I(N);
      const X = e.indexOf("@"), de = X >= 0 ? X : O.length;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const At = Pe.current;
        At && (At.focus(), At.setSelectionRange(de, de));
      }));
      return;
    }
    const r = e.indexOf("@"), s = e.replace("@", ""), b = n.selectionStart, d = n.selectionEnd, u = n.value.slice(0, b) + s + n.value.slice(d), x = F.current?.blocks.find((k) => k.id === a);
    if (!x) return;
    we(a, x.type === "math" ? { latex: u } : { text: u });
    const M = b + (r >= 0 ? r : s.length);
    requestAnimationFrame(() => {
      n.focus(), n.setSelectionRange(M, M);
    });
  }, [L, we, G, Le, P]), g = v.length === 1 && i?.blocks.find((e) => e.id === v[0]) || null, oe = c.useMemo(
    () => i?.blocks.filter((e) => v.includes(e.id)) || [],
    [i, T]
  ), un = i?.blocks.find((e) => e.id === L) || null;
  c.useEffect(() => {
    const e = window, n = i;
    let a = null;
    if (n) {
      const r = {};
      for (const u of n.blocks) r[u.type] = (r[u.type] || 0) + 1;
      const s = n.blocks.filter((u) => u.type === "text" || u.type === "math").sort((u, x) => Math.round(u.y / 60) - Math.round(x.y / 60) || u.x - x.x);
      let b = 4e3;
      const d = [];
      for (const u of s) {
        if (b <= 0) {
          d.push({ note: "more blocks truncated" });
          break;
        }
        const x = (u.type === "text" ? u.text : u.latex).slice(0, 400);
        b -= x.length, d.push(u.type === "text" ? { text: x, size: u.size, ...u.color ? { color: u.color } : {} } : { latex: x, size: u.size });
      }
      a = {
        id: n.id,
        name: n.name,
        blocks: r,
        content: d,
        images: n.blocks.filter((u) => u.type === "image").map((u) => u.name || "pasted image").slice(0, 20),
        zoom: Math.round(S.zoom * 100) / 100,
        paper: n.paper || "theme",
        ruling: n.pattern || "dots",
        selected: g ? g.type : null,
        editing: !!L
      };
    }
    return (e.__lseAiIslands ||= {}).notebooks = {
      notebooks: o.length,
      open: a,
      tool: l,
      hosted: ve
    }, () => {
      e.__lseAiIslands && delete e.__lseAiIslands.notebooks;
    };
  }, [i, o, l, S.zoom, g, L, ve]);
  const xn = v.length > 0, qn = gt && !xn && (l === "pen" || l === "highlighter" || l === "eraser"), Hn = gt && !xn && It.includes(l), De = g || (oe.length ? {
    x: Math.min(...oe.map((e) => e.x)),
    y: Math.min(...oe.map((e) => e.y))
  } : null), Oe = c.useMemo(() => {
    if (!De) return null;
    if (St) return St;
    const e = ie.current, n = e?.offsetLeft || 0, a = e?.offsetTop || 0, r = e?.clientHeight || 600, s = n + S.x + De.x * S.zoom, b = a + S.y + De.y * S.zoom, d = g ? g.h : Math.max(...oe.map((k) => k.y + k.h)) - De.y, u = a + S.y + (De.y + d) * S.zoom, x = 14;
    let M = b - ze.h - x;
    if (M < a + 6) {
      const k = u + x;
      M = k + ze.h <= a + r - 6 ? k : a + 6;
    }
    return le(s - 8, M);
  }, [De, g, oe, St, S, le, ze]), ut = le(Xt.x, Xt.y), Ee = i?.paper || "", Bt = i?.pattern || "dots", Wt = Ee ? nr(Ee) : !1, Jn = Ee ? Wt ? "#14171c" : "#e9ecf1" : void 0, xt = Ee ? Wt ? "rgba(0,0,0,.16)" : "rgba(255,255,255,.13)" : "var(--edge)", Kn = Ee ? Wt ? "rgba(0,0,0,.45)" : "rgba(255,255,255,.42)" : void 0, Xn = Bt === "plain" ? "none" : Bt === "dots" ? `radial-gradient(circle, ${xt} 1px, transparent 1px)` : Bt === "lines" ? `linear-gradient(${xt} 1px, transparent 1px)` : `linear-gradient(${xt} 1px, transparent 1px), linear-gradient(90deg, ${xt} 1px, transparent 1px)`;
  return /* @__PURE__ */ t.jsxs("div", { className: "nb-wrap", children: [
    /* @__PURE__ */ t.jsx("style", { children: vr }),
    /* @__PURE__ */ t.jsxs("div", { className: "nb-rail", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "nb-rail-head", children: [
        /* @__PURE__ */ t.jsx("span", { children: "NOTEBOOKS" }),
        /* @__PURE__ */ t.jsx("span", { className: "nb-count", children: o.length }),
        /* @__PURE__ */ t.jsx("button", { className: "nb-plus", title: "New notebook", onClick: Te, children: $.plus })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "nb-rail-scroll", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "nb-rail-list", children: [
          !o.length && /* @__PURE__ */ t.jsxs("div", { className: "nb-rail-empty", children: [
            "No notebooks yet.",
            /* @__PURE__ */ t.jsx("button", { onClick: Te, children: "New notebook" })
          ] }),
          o.map((e) => /* @__PURE__ */ t.jsxs("div", { className: "nb-row" + (i?.id === e.id ? " active" : ""), children: [
            Cn === e.id ? /* @__PURE__ */ t.jsx(
              "input",
              {
                className: "nb-rename",
                defaultValue: e.name,
                autoFocus: !0,
                onFocus: (n) => n.currentTarget.select(),
                onBlur: (n) => {
                  const a = n.currentTarget.value.trim() || e.name;
                  We(null), a !== e.name && (F.current?.id === e.id ? (Q.current = !0, h((r) => r && { ...r, name: a })) : fetch("/api/notebooks/" + e.id).then((r) => r.json()).then((r) => fetch("/api/notebooks/" + e.id, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...r, name: a })
                  })).then(fe));
                },
                onKeyDown: (n) => {
                  n.key === "Enter" && n.currentTarget.blur(), n.key === "Escape" && We(null);
                }
              }
            ) : /* @__PURE__ */ t.jsxs(
              "button",
              {
                className: "nb-row-main",
                onClick: () => nt(e.id),
                onDoubleClick: () => We(e.id),
                children: [
                  /* @__PURE__ */ t.jsx("span", { className: "nb-row-name", children: e.name }),
                  /* @__PURE__ */ t.jsxs("span", { className: "nb-row-meta", children: [
                    e.blocks,
                    " ",
                    e.blocks === 1 ? "item" : "items",
                    e.updated_at ? " · " + gn(e.updated_at) : ""
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ t.jsxs("span", { className: "nb-row-acts", children: [
              /* @__PURE__ */ t.jsx("button", { title: "Rename", onClick: () => We(e.id), children: "✎" }),
              /* @__PURE__ */ t.jsx("button", { title: "Delete notebook", onClick: () => On(e.id), children: "✕" })
            ] })
          ] }, e.id))
        ] }),
        /* @__PURE__ */ t.jsx("div", { id: "nb-lib", className: "nb-lib" })
      ] })
    ] }),
    /* @__PURE__ */ t.jsx("div", { className: "nb-main", children: i ? /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
      /* @__PURE__ */ t.jsxs("div", { className: "nb-bar", children: [
        /* @__PURE__ */ t.jsx(
          "input",
          {
            className: "nb-title",
            value: i.name,
            onChange: (e) => {
              Q.current = !0, h((n) => n && { ...n, name: e.target.value });
            },
            spellCheck: !1
          }
        ),
        /* @__PURE__ */ t.jsxs("span", { className: "nb-tools", children: [
          [
            ["select", "V", "Select and move · drag to pan · shift-drag to box-select"],
            ["hand", "H", "Pan the canvas"]
          ].map(([e, n, a]) => /* @__PURE__ */ t.jsx(
            "button",
            {
              className: "nb-tool" + (l === e ? " active" : ""),
              "data-tip": `${a}  (${n})`,
              onClick: () => y(e),
              children: Ne[e]
            },
            e
          )),
          /* @__PURE__ */ t.jsx("span", { className: "nb-sep" }),
          /* @__PURE__ */ t.jsx(
            $t,
            {
              tool: l,
              setTool: Se,
              open: je === "write",
              setOpen: (e) => Be(e ? "write" : null),
              fav: Et,
              onFav: Rt,
              members: [
                ["text", "T", "Write"],
                ["sticky", "N", "Sticky note"],
                ["code", "C", "Code block"]
              ]
            }
          ),
          /* @__PURE__ */ t.jsx(
            "button",
            {
              className: "nb-tool" + (l === "math" ? " active" : ""),
              "data-tip": "Maths  (M)",
              onClick: () => Se("math"),
              children: Ne.math
            }
          ),
          /* @__PURE__ */ t.jsx(
            $t,
            {
              tool: l,
              setTool: Se,
              open: je === "draw",
              setOpen: (e) => Be(e ? "draw" : null),
              fav: Et,
              onFav: Rt,
              members: [
                ["pen", "P", "Pen"],
                ["highlighter", "G", "Highlighter"]
              ]
            }
          ),
          /* @__PURE__ */ t.jsx(
            "button",
            {
              className: "nb-tool" + (l === "eraser" ? " active" : ""),
              "data-tip": "Rubber: drag over a drawing to erase it  (E)",
              onClick: () => Se("eraser"),
              children: Ne.eraser
            }
          ),
          /* @__PURE__ */ t.jsx(
            $t,
            {
              tool: l,
              setTool: Se,
              open: je === "shape",
              setOpen: (e) => Be(e ? "shape" : null),
              fav: Et,
              onFav: Rt,
              members: [
                ["line", "L", "Line"],
                ["arrow", "A", "Arrow"],
                ["rect", "R", "Rectangle"],
                ["ellipse", "O", "Ellipse"],
                ["triangle", "Y", "Triangle"],
                ["diamond", "D", "Diamond"],
                ["star", "S", "Star"]
              ]
            }
          ),
          /* @__PURE__ */ t.jsx("span", { className: "nb-sep" }),
          /* @__PURE__ */ t.jsx(
            "button",
            {
              className: "nb-tool",
              "data-tip": "Place a photo  (I)",
              onClick: () => et.current?.click(),
              children: Ne.image
            }
          ),
          /* @__PURE__ */ t.jsx(
            "button",
            {
              className: "nb-tool" + (V ? " active" : ""),
              "data-tip": "Maths symbols",
              onClick: () => A((e) => !e),
              children: "∑"
            }
          ),
          /* @__PURE__ */ t.jsx(
            "button",
            {
              className: "nb-tool" + (Y ? " active" : ""),
              "data-tip": "Paper: background colour and ruling",
              onClick: () => Z((e) => !e),
              children: $.paper
            }
          ),
          /* @__PURE__ */ t.jsx("span", { className: "nb-sep" }),
          /* @__PURE__ */ t.jsx(
            "button",
            {
              className: "nb-tool",
              "data-tip": "Undo  (Ctrl+Z)",
              disabled: !se.current.past.length,
              onClick: zt,
              children: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M6.5 3.5L3 7l3.5 3.5M3 7h6a4 4 0 010 8", transform: "translate(0,-1.5)" }) })
            }
          ),
          /* @__PURE__ */ t.jsx(
            "button",
            {
              className: "nb-tool",
              "data-tip": "Redo  (Ctrl+Shift+Z)",
              disabled: !se.current.future.length,
              onClick: tt,
              children: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M9.5 3.5L13 7l-3.5 3.5M13 7H7a4 4 0 000 8", transform: "translate(0,-1.5)" }) })
            }
          ),
          /* @__PURE__ */ t.jsx(
            "button",
            {
              className: "nb-tool nb-tool-danger",
              "data-tip": "Delete everything on this canvas",
              disabled: !i.blocks.length,
              onClick: en,
              children: $.trash
            }
          )
        ] }),
        /* @__PURE__ */ t.jsx("span", { className: "nb-status", children: kt }),
        /* @__PURE__ */ t.jsxs("span", { className: "nb-zoom", children: [
          /* @__PURE__ */ t.jsx("button", { onClick: () => sn(1 / 1.25), "data-tip": "Zoom out", children: $.minus }),
          /* @__PURE__ */ t.jsxs("button", { onClick: ct, "data-tip": "Fit everything  (Ctrl+0)", children: [
            S.zoom < 0.01 ? (S.zoom * 100).toFixed(1) : Math.round(S.zoom * 100),
            "%"
          ] }),
          /* @__PURE__ */ t.jsx("button", { onClick: () => sn(1.25), "data-tip": "Zoom in", children: $.plus })
        ] })
      ] }),
      g && Oe && /* @__PURE__ */ t.jsxs(
        Ye,
        {
          x: Oe.x,
          y: Oe.y,
          onMove: nn,
          onSize: it,
          title: g.type === "image" ? "PHOTO" : g.type === "math" ? "MATHS" : g.type === "ink" ? "DRAWING" : g.type === "shape" ? "SHAPE" : g.mono ? "CODE" : g.bg ? "NOTE" : "TEXT",
          children: [
            (g.type === "text" || g.type === "math") && /* @__PURE__ */ t.jsxs(W, { label: "Size", children: [
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  className: "nb-sb-btn",
                  "data-tip": "Smaller",
                  onClick: () => {
                    const e = g.size, n = Re.findIndex((a) => a >= e);
                    q(g.id, { size: Re[Math.max(0, (n < 0 ? Re.length - 1 : n) - 1)] });
                  },
                  children: "A−"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "input",
                {
                  className: "nb-num",
                  type: "number",
                  min: 6,
                  max: 400,
                  step: 1,
                  "data-tip": "Any size, 6 to 400",
                  value: g.size,
                  onChange: (e) => {
                    const n = parseFloat(e.target.value);
                    isFinite(n) && we(g.id, { size: ne(n, 6, 400) });
                  }
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  className: "nb-sb-btn",
                  "data-tip": "Larger",
                  onClick: () => {
                    const e = g.size;
                    let n = Re.findIndex((a) => a > e);
                    n < 0 && (n = Re.length - 1), q(g.id, { size: Re[n] });
                  },
                  children: "A+"
                }
              ),
              g.type === "text" && /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                /* @__PURE__ */ t.jsx("span", { className: "nb-prow-gap" }),
                /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    className: "nb-sb-btn" + (g.bold ? " on" : ""),
                    "data-tip": "Bold",
                    style: { fontWeight: 700 },
                    onClick: () => q(g.id, { bold: !g.bold || void 0 }),
                    children: "B"
                  }
                ),
                /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    className: "nb-sb-btn" + (g.italic ? " on" : ""),
                    "data-tip": "Italic",
                    style: { fontStyle: "italic" },
                    onClick: () => q(g.id, { italic: !g.italic || void 0 }),
                    children: "I"
                  }
                ),
                /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    className: "nb-sb-btn" + (g.mono ? " on" : ""),
                    "data-tip": "Code: monospaced, no maths pass",
                    onClick: () => q(g.id, { mono: !g.mono || void 0 }),
                    children: $.code
                  }
                )
              ] })
            ] }),
            g.type === "text" && /* @__PURE__ */ t.jsx(W, { label: "Align", children: ["left", "center", "right"].map((e) => /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "nb-sb-btn" + ((g.align || "left") === e ? " on" : ""),
                "data-tip": e[0].toUpperCase() + e.slice(1),
                onClick: () => q(g.id, { align: e === "left" ? void 0 : e }),
                children: $["align" + e[0].toUpperCase() + e.slice(1)]
              },
              e
            )) }),
            (g.type === "text" || g.type === "math") && /* @__PURE__ */ t.jsx(W, { label: "Colour", children: /* @__PURE__ */ t.jsx(
              me,
              {
                value: g.color || "",
                onPick: (e) => q(g.id, { color: e || void 0 })
              }
            ) }),
            (g.type === "text" || g.type === "math") && /* @__PURE__ */ t.jsx(W, { label: "Card", children: /* @__PURE__ */ t.jsx(
              me,
              {
                bg: !0,
                value: g.bg || "",
                onPick: (e) => q(g.id, { bg: e || void 0 })
              }
            ) }),
            g.type === "ink" && /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
              /* @__PURE__ */ t.jsx(W, { label: "Colour", children: /* @__PURE__ */ t.jsx(
                me,
                {
                  value: g.color === "currentColor" ? "" : g.color,
                  onPick: (e) => q(g.id, { color: e || "currentColor" })
                }
              ) }),
              /* @__PURE__ */ t.jsxs(W, { label: "Width", children: [
                /* @__PURE__ */ t.jsx(
                  Ve,
                  {
                    value: g.mode === "highlighter" ? g.width / 5 : g.width,
                    onPick: (e) => q(g.id, {
                      width: g.mode === "highlighter" ? e * 5 : e
                    })
                  }
                ),
                /* @__PURE__ */ t.jsx("span", { className: "nb-prow-gap" }),
                /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    className: "nb-sb-btn" + (g.mode === "highlighter" ? " on" : ""),
                    "data-tip": "Highlighter: wide and translucent",
                    onClick: () => {
                      const e = g.mode === "highlighter", n = e ? g.width / 5 : g.width;
                      q(g.id, {
                        mode: e ? "pen" : "highlighter",
                        width: e ? n : n * 5
                      });
                    },
                    children: $.marker
                  }
                )
              ] }),
              /* @__PURE__ */ t.jsx(W, { label: "Maths", children: /* @__PURE__ */ t.jsx(
                "button",
                {
                  className: "nb-sb-btn",
                  "data-tip": "Read the drawing as a maths symbol and replace it (Ctrl+Z brings the ink back)",
                  onClick: Lt,
                  children: "To maths"
                }
              ) })
            ] }),
            g.type === "shape" && /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
              /* @__PURE__ */ t.jsx(W, { label: "Colour", children: /* @__PURE__ */ t.jsx(
                me,
                {
                  value: g.color === "currentColor" ? "" : g.color || "",
                  onPick: (e) => q(g.id, { color: e || "currentColor" })
                }
              ) }),
              /* @__PURE__ */ t.jsxs(W, { label: "Width", children: [
                /* @__PURE__ */ t.jsx(
                  Ve,
                  {
                    value: g.width || 2,
                    onPick: (e) => q(g.id, { width: e })
                  }
                ),
                /* @__PURE__ */ t.jsx("span", { className: "nb-prow-gap" }),
                /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    className: "nb-sb-btn" + (g.dash ? " on" : ""),
                    "data-tip": "Dashed",
                    onClick: () => q(g.id, { dash: !g.dash || void 0 }),
                    children: $.dash
                  }
                )
              ] }),
              bn.includes(g.shape) && /* @__PURE__ */ t.jsx(W, { label: "Fill", children: /* @__PURE__ */ t.jsx(
                me,
                {
                  bg: !0,
                  value: g.fill || "",
                  onPick: (e) => q(g.id, { fill: e || void 0 })
                }
              ) })
            ] }),
            g.type === "image" && /* @__PURE__ */ t.jsxs(W, { label: "Photo", children: [
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  className: "nb-sb-btn",
                  "data-tip": "Flip horizontally",
                  onClick: () => q(g.id, { flipH: !g.flipH || void 0 }),
                  children: $.flipH
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  className: "nb-sb-btn",
                  "data-tip": "Flip vertically",
                  onClick: () => q(g.id, { flipV: !g.flipV || void 0 }),
                  children: $.flipV
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  className: "nb-sb-btn",
                  "data-tip": "Smaller (or drag a corner)",
                  onClick: () => rn(1 / 1.25),
                  children: $.minus
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  className: "nb-sb-btn",
                  "data-tip": "Bigger (or drag a corner)",
                  onClick: () => rn(1.25),
                  children: $.plus
                }
              )
            ] }),
            /* @__PURE__ */ t.jsxs(W, { children: [
              g.type === "math" && /* @__PURE__ */ t.jsx(
                "button",
                {
                  className: "nb-sb-btn",
                  "data-tip": "Save to your equation library",
                  onClick: () => Gt(g.latex, g.size),
                  children: $.book
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  className: "nb-sb-btn",
                  "data-tip": "Bring to front",
                  onClick: () => at(g.id, !0),
                  children: $.front
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  className: "nb-sb-btn",
                  "data-tip": "Send to back",
                  onClick: () => at(g.id, !1),
                  children: $.back
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  className: "nb-sb-btn",
                  "data-tip": "Duplicate  (Ctrl+D)",
                  onClick: Ke,
                  children: $.dup
                }
              ),
              /* @__PURE__ */ t.jsx("span", { className: "nb-prow-gap" }),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  className: "nb-sb-btn nb-sb-danger",
                  "data-tip": "Delete  (Del)",
                  onClick: () => Zt(g.id),
                  children: $.trash
                }
              )
            ] })
          ]
        }
      ),
      oe.length > 1 && Oe && /* @__PURE__ */ t.jsxs(
        Ye,
        {
          x: Oe.x,
          y: Oe.y,
          onMove: nn,
          onSize: it,
          title: `${oe.length} SELECTED`,
          children: [
            /* @__PURE__ */ t.jsx(W, { label: "Align", children: [
              ["left", "Left edges"],
              ["centerX", "Centres, vertical"],
              ["right", "Right edges"],
              ["top", "Top edges"],
              ["centerY", "Centres, horizontal"],
              ["bottom", "Bottom edges"]
            ].map(([e, n]) => /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "nb-sb-btn",
                "data-tip": n,
                onClick: () => Rn(e),
                children: $["al_" + e]
              },
              e
            )) }),
            oe.every((e) => e.type === "text" || e.type === "math" || e.type === "ink" || e.type === "shape") && /* @__PURE__ */ t.jsx(W, { label: "Colour", children: /* @__PURE__ */ t.jsx(
              me,
              {
                value: "",
                onPick: (e) => Qt(
                  { color: e || void 0 },
                  (n) => n.type !== "image"
                )
              }
            ) }),
            oe.every((e) => e.type === "ink" || e.type === "shape") && /* @__PURE__ */ t.jsx(W, { label: "Width", children: /* @__PURE__ */ t.jsx(
              Ve,
              {
                value: 0,
                onPick: (e) => Qt({ width: e })
              }
            ) }),
            oe.every((e) => e.type === "ink") && /* @__PURE__ */ t.jsx(W, { label: "Maths", children: /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "nb-sb-btn",
                "data-tip": "Read these strokes as one piece of maths and replace them (Ctrl+Z brings the ink back)",
                onClick: Lt,
                children: "To maths"
              }
            ) }),
            /* @__PURE__ */ t.jsxs(W, { children: [
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  className: "nb-sb-btn",
                  "data-tip": "Duplicate  (Ctrl+D)",
                  onClick: Ke,
                  children: $.dup
                }
              ),
              /* @__PURE__ */ t.jsx("span", { className: "nb-prow-gap" }),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  className: "nb-sb-btn nb-sb-danger",
                  "data-tip": `Delete all ${oe.length}  (Del)`,
                  onClick: ot,
                  children: $.trash
                }
              )
            ] })
          ]
        }
      ),
      ee.length > 0 && /* @__PURE__ */ t.jsx(
        Ye,
        {
          compact: !0,
          x: le(Ge.x, Ge.y).x,
          y: le(Ge.x, Ge.y).y,
          onMove: In,
          title: "FAVOURITES",
          children: ee.map((e, n) => /* @__PURE__ */ t.jsxs(
            "button",
            {
              className: "nb-tool nb-fav",
              draggable: !0,
              "data-tip": `${e.tool}${e.width ? ` · ${e.width}px` : ""}  (drag to reorder · right-click to remove)`,
              style: { color: e.color || void 0 },
              onClick: () => {
                y(e.tool), Ue(!1), e.tool === "pen" || e.tool === "highlighter" ? Ze({
                  color: e.color,
                  width: e.width,
                  highlighter: e.tool === "highlighter"
                }) : e.width > 0 && Fe({
                  color: e.color,
                  width: e.width,
                  dash: !!e.dash,
                  fill: e.fill || ""
                });
              },
              onContextMenu: (a) => {
                a.preventDefault(), Me(ee.filter((r, s) => s !== n));
              },
              onDragStart: (a) => {
                mt.current = n, a.dataTransfer.effectAllowed = "move";
              },
              onDragOver: (a) => a.preventDefault(),
              onDrop: (a) => {
                a.preventDefault();
                const r = mt.current;
                if (mt.current = null, r === null || r === n) return;
                const s = [...ee], [b] = s.splice(r, 1);
                s.splice(n, 0, b), Me(s);
              },
              children: [
                Ne[e.tool],
                e.width > 0 && /* @__PURE__ */ t.jsx(
                  "span",
                  {
                    className: "nb-fav-bar",
                    style: { height: ne(1 + e.width / 3, 2, 5) }
                  }
                )
              ]
            },
            n
          ))
        }
      ),
      qn && /* @__PURE__ */ t.jsxs(
        Ye,
        {
          x: ut.x,
          y: ut.y,
          onMove: tn,
          onSize: it,
          title: l === "eraser" ? "ERASER" : l === "highlighter" ? "HIGHLIGHTER" : "PEN",
          children: [
            l === "eraser" ? /* @__PURE__ */ t.jsx(W, { label: "Eraser", children: /* @__PURE__ */ t.jsx("span", { className: "nb-hint", children: "Drag over ink to remove it" }) }) : /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
              /* @__PURE__ */ t.jsx(W, { label: "Colour", children: /* @__PURE__ */ t.jsx(
                me,
                {
                  value: J.color,
                  onPick: (e) => Ze((n) => ({ ...n, color: e }))
                }
              ) }),
              /* @__PURE__ */ t.jsxs(W, { label: "Width", children: [
                /* @__PURE__ */ t.jsx(
                  Ve,
                  {
                    value: J.width,
                    onPick: (e) => Ze((n) => ({ ...n, width: e }))
                  }
                ),
                /* @__PURE__ */ t.jsx("span", { className: "nb-prow-gap" }),
                /* @__PURE__ */ t.jsx("span", { className: "nb-hint", children: l === "highlighter" ? `${J.width * 5}px nib` : `${J.width}px nib` })
              ] })
            ] }),
            l !== "eraser" && /* @__PURE__ */ t.jsx(W, { label: "Pin", children: /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "nb-sb-btn nb-sb-wide",
                "data-tip": "Add this pen, with its colour and width, to the floating favourites bar",
                onClick: () => {
                  const e = {
                    tool: l,
                    color: J.color,
                    width: J.width
                  }, n = JSON.stringify(e);
                  ee.some((a) => JSON.stringify(a) === n) || Me([...ee, e].slice(-8));
                },
                children: "☆ FAVOURITE"
              }
            ) }),
            /* @__PURE__ */ t.jsx(W, { label: "Input", children: /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "nb-sb-btn nb-sb-wide" + (Ct ? " on" : ""),
                "data-tip": "Stylus mode: only a pen draws; fingers pan, two fingers zoom",
                onClick: () => Pn((e) => {
                  const n = !e;
                  try {
                    localStorage.setItem("lse.nbPenOnly", n ? "1" : "0");
                  } catch {
                  }
                  return n;
                }),
                children: "STYLUS"
              }
            ) })
          ]
        }
      ),
      Hn && /* @__PURE__ */ t.jsxs(
        Ye,
        {
          x: ut.x,
          y: ut.y,
          onMove: tn,
          onSize: it,
          title: String(l).toUpperCase(),
          children: [
            /* @__PURE__ */ t.jsx(W, { label: "Colour", children: /* @__PURE__ */ t.jsx(
              me,
              {
                value: _.color,
                onPick: (e) => Fe((n) => ({ ...n, color: e }))
              }
            ) }),
            /* @__PURE__ */ t.jsxs(W, { label: "Width", children: [
              /* @__PURE__ */ t.jsx(
                Ve,
                {
                  value: _.width,
                  onPick: (e) => Fe((n) => ({ ...n, width: e }))
                }
              ),
              /* @__PURE__ */ t.jsx("span", { className: "nb-prow-gap" }),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  className: "nb-sb-btn" + (_.dash ? " on" : ""),
                  "data-tip": "Dashed",
                  onClick: () => Fe((e) => ({ ...e, dash: !e.dash })),
                  children: $.dash
                }
              )
            ] }),
            bn.includes(l) && /* @__PURE__ */ t.jsx(W, { label: "Fill", children: /* @__PURE__ */ t.jsx(
              me,
              {
                bg: !0,
                value: _.fill,
                onPick: (e) => Fe((n) => ({ ...n, fill: e }))
              }
            ) }),
            /* @__PURE__ */ t.jsx(W, { label: "Pin", children: /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "nb-sb-btn nb-sb-wide",
                "data-tip": "Add this shape, with its colour and width, to the floating favourites bar",
                onClick: () => {
                  const e = {
                    tool: l,
                    color: _.color,
                    width: _.width,
                    dash: _.dash || void 0,
                    fill: _.fill || void 0
                  }, n = JSON.stringify(e);
                  ee.some((a) => JSON.stringify(a) === n) || Me([...ee, e].slice(-8));
                },
                children: "☆ FAVOURITE"
              }
            ) })
          ]
        }
      ),
      Y && /* @__PURE__ */ t.jsxs(
        "div",
        {
          className: "nb-menu nb-paper-menu",
          style: { top: 40, right: V ? 258 : 10 },
          onPointerDown: (e) => e.stopPropagation(),
          onContextMenu: (e) => e.preventDefault(),
          children: [
            /* @__PURE__ */ t.jsxs("div", { className: "nb-paper-row", children: [
              /* @__PURE__ */ t.jsx("span", { className: "nb-sb-lab", children: "Paper" }),
              er.map(([e, n]) => /* @__PURE__ */ t.jsx(
                "button",
                {
                  className: "nb-swatch nb-swatch-paper" + ((i.paper || "") === e ? " on" : ""),
                  style: { background: e || "var(--bg)" },
                  "data-tip": n,
                  onClick: () => Tt({ paper: e || void 0 })
                },
                e || "theme"
              )),
              /* @__PURE__ */ t.jsx("label", { className: "nb-swatch nb-swatch-any", "data-tip": "Any colour", children: /* @__PURE__ */ t.jsx(
                "input",
                {
                  type: "color",
                  value: i.paper || "#ffffff",
                  onChange: (e) => Tt({ paper: e.target.value })
                }
              ) })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { className: "nb-paper-row", children: [
              /* @__PURE__ */ t.jsx("span", { className: "nb-sb-lab", children: "Ruling" }),
              tr.map(([e, n]) => /* @__PURE__ */ t.jsx(
                "button",
                {
                  className: "nb-sb-btn" + ((i.pattern || "dots") === e ? " on" : ""),
                  onClick: () => Tt({ pattern: e }),
                  children: n
                },
                e
              ))
            ] })
          ]
        }
      ),
      K && (() => {
        const e = K.blockId ? i.blocks.find((a) => a.id === K.blockId) : null, n = (a, r, s) => /* @__PURE__ */ t.jsx(
          "button",
          {
            className: "nb-menu-item" + (s ? " danger" : ""),
            onClick: () => {
              qe(null), r();
            },
            children: a
          },
          a
        );
        return /* @__PURE__ */ t.jsx(
          "div",
          {
            className: "nb-menu",
            style: { left: K.x, top: K.y },
            onPointerDown: (a) => a.stopPropagation(),
            onDoubleClick: (a) => a.stopPropagation(),
            onContextMenu: (a) => a.preventDefault(),
            children: e ? [
              ...e.type === "text" || e.type === "math" ? [n("Edit", () => {
                P(e.id), I(e.id), e.type === "math" && A(!0);
              })] : [],
              ...e.type === "image" ? [
                n("Flip horizontally", () => q(e.id, { flipH: !e.flipH || void 0 })),
                n("Flip vertically", () => q(e.id, { flipV: !e.flipV || void 0 }))
              ] : [],
              ...e.type === "math" ? [n("Save to equation library", () => Gt(e.latex, e.size))] : [],
              ...e.type === "ink" && oe.every((a) => a.type === "ink") ? [n(v.length > 1 ? "Convert strokes to maths" : "Convert to maths", Lt)] : [],
              n("Duplicate", Ke),
              n("Bring to front", () => at(e.id, !0)),
              n("Send to back", () => at(e.id, !1)),
              ...v.length > 1 ? [n(`Delete ${v.length} selected`, ot, !0)] : [n("Delete", () => Zt(e.id), !0)]
            ] : [
              n("Write text here", () => P(Ce("text", K.wx, K.wy))),
              n("Sticky note here", () => P(Ce("sticky", K.wx, K.wy))),
              n("Code block here", () => P(Ce("code", K.wx, K.wy))),
              n("Maths here", () => P(Ce("math", K.wx, K.wy))),
              n("Photo here…", () => {
                Nt.current = { x: K.wx, y: K.wy }, et.current?.click();
              }),
              ...ge?.length ? [n("Paste here", () => {
                const a = ge, r = Math.min(...a.map((d) => d.x)), s = Math.min(...a.map((d) => d.y)), b = a.map((d) => ({
                  ...JSON.parse(JSON.stringify(d)),
                  id: ae(),
                  x: d.x - r + K.wx,
                  y: d.y - s + K.wy
                }));
                D(), Q.current = !0, h((d) => d && { ...d, blocks: [...d.blocks, ...b] }), z(b.map((d) => d.id));
              })] : [],
              n("Select everything", () => z(i.blocks.map((a) => a.id))),
              n("Fit everything", ct),
              ...i.blocks.length ? [n("Delete everything here", en, !0)] : []
            ]
          }
        );
      })(),
      /* @__PURE__ */ t.jsxs("div", { className: "nb-body", children: [
        /* @__PURE__ */ t.jsxs(
          "div",
          {
            ref: ie,
            className: "nb-canvas nb-tool-" + l,
            style: {
              background: Ee || void 0,
              color: Jn,
              "--nb-sel-edge": Kn
            },
            onWheel: Bn,
            onPointerDown: _n,
            onPointerMove: $n,
            onPointerUp: cn,
            onPointerCancel: cn,
            onContextMenu: An,
            onDragOver: (e) => e.preventDefault(),
            onDrop: Fn,
            onDragStartCapture: (e) => e.preventDefault(),
            onDoubleClick: (e) => {
              const n = ln.current;
              if (n.ui) {
                const r = n.block ? F.current?.blocks.find((s) => s.id === n.block) : null;
                r && (r.type === "text" || r.type === "math") && (P(r.id), I(r.id), r.type === "math" && A(!0));
                return;
              }
              if (e.target.closest("[data-block]")) return;
              const a = pe(e);
              P(Ce("text", a.x, a.y));
            },
            children: [
              /* @__PURE__ */ t.jsx("div", { className: "nb-grid", style: {
                backgroundImage: Xn,
                backgroundSize: `${24 * S.zoom}px ${24 * S.zoom}px`,
                backgroundPosition: `${S.x}px ${S.y}px`,
                opacity: S.zoom < 0.35 ? 0 : 1
              } }),
              /* @__PURE__ */ t.jsxs("div", { className: "nb-scene", style: {
                transform: `translate(${S.x}px, ${S.y}px) scale(${S.zoom})`
              }, children: [
                i.blocks.map((e) => /* @__PURE__ */ t.jsx(
                  mr,
                  {
                    b: e,
                    selected: v.includes(e.id),
                    handles: v.length === 1 && v[0] === e.id,
                    editing: L === e.id,
                    zoom: S.zoom,
                    editRef: Pe,
                    onEdit: () => {
                      P(e.id), I(e.id), e.type === "math" && A(!0);
                    },
                    onChange: (n) => we(e.id, n)
                  },
                  e.id
                )),
                xe && /* @__PURE__ */ t.jsx("div", { className: "nb-marquee", style: {
                  left: Math.min(xe.x1, xe.x2),
                  top: Math.min(xe.y1, xe.y2),
                  width: Math.abs(xe.x2 - xe.x1),
                  height: Math.abs(xe.y2 - xe.y1),
                  // Counter-scaled by the real zoom, not a 0.15 floor: the
                  // floor made the band's border sub-pixel below 15%.
                  borderWidth: 1 / Math.max(S.zoom, Ie)
                } }),
                ke && ke.length > 1 && /* @__PURE__ */ t.jsx("svg", { className: "nb-live-ink", overflow: "visible", children: /* @__PURE__ */ t.jsx(
                  "path",
                  {
                    d: Ft(ke),
                    fill: "none",
                    stroke: J.color || "currentColor",
                    strokeWidth: J.highlighter ? J.width * 5 : J.width,
                    opacity: J.highlighter ? 0.45 : 1,
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                ) }),
                ue && /* @__PURE__ */ t.jsx("svg", { className: "nb-live-ink", overflow: "visible", children: /* @__PURE__ */ t.jsx(
                  qt,
                  {
                    shape: ue.shape,
                    x1: ue.x1,
                    y1: ue.y1,
                    x2: ue.x2,
                    y2: ue.y2,
                    color: _.color || "currentColor",
                    width: _.width,
                    dash: _.dash,
                    fill: _.fill || void 0
                  }
                ) })
              ] })
            ]
          }
        ),
        V && /* @__PURE__ */ t.jsxs("div", { className: "nb-palette", children: [
          /* @__PURE__ */ t.jsxs("div", { className: "nb-pal-head", children: [
            /* @__PURE__ */ t.jsx("span", { children: "MATHS" }),
            /* @__PURE__ */ t.jsx("button", { onClick: () => A(!1), title: "Close", children: "✕" })
          ] }),
          /* @__PURE__ */ t.jsx("div", { className: "nb-pal-hint", children: un ? un.type === "math" ? "Click a symbol to type it into the block." : "Inside a text block, maths goes between $ signs." : "Click any symbol to start a new equation here." }),
          /* @__PURE__ */ t.jsxs("div", { className: "nb-pal-body", children: [
            Yt.length > 0 && /* @__PURE__ */ t.jsxs("div", { className: "nb-pal-group", children: [
              /* @__PURE__ */ t.jsx("div", { className: "nb-pal-title", children: "SAVED — click or drag onto the canvas" }),
              /* @__PURE__ */ t.jsx("div", { className: "nb-pal-saved", children: Yt.map((e) => /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "nb-pal-eq",
                  draggable: !0,
                  onDragStart: (n) => {
                    n.dataTransfer.setData(
                      "application/x-lse-eq",
                      JSON.stringify({ latex: e.latex, size: e.size })
                    ), n.dataTransfer.setData("text/plain", e.latex), n.dataTransfer.effectAllowed = "copy";
                  },
                  children: [
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        className: "nb-pal-eq-body",
                        title: e.latex,
                        onMouseDown: (n) => n.preventDefault(),
                        onClick: () => pn(e.latex),
                        children: /* @__PURE__ */ t.jsx(kr, { latex: e.latex })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        className: "nb-pal-eq-x",
                        title: "Remove from saved",
                        onClick: () => En(e.id),
                        children: "✕"
                      }
                    )
                  ]
                },
                e.id
              )) })
            ] }),
            or.map((e) => /* @__PURE__ */ t.jsxs("div", { className: "nb-pal-group", children: [
              /* @__PURE__ */ t.jsx("div", { className: "nb-pal-title", children: e.group }),
              /* @__PURE__ */ t.jsx("div", { className: "nb-pal-grid", children: e.items.map((n) => /* @__PURE__ */ t.jsx(
                "button",
                {
                  title: n.tip ? `${n.tip}  ${n.ins.replace("@", "")}` : n.ins.replace("@", ""),
                  onMouseDown: (a) => {
                    a.preventDefault(), pn(n.ins);
                  },
                  children: n.lab
                },
                n.lab + n.ins
              )) })
            ] }, e.group))
          ] })
        ] })
      ] })
    ] }) : /* @__PURE__ */ t.jsxs("div", { className: "nb-blank", children: [
      /* @__PURE__ */ t.jsx("div", { className: "nb-blank-title", children: "An infinite page for your research." }),
      (ve || !o.length) && /* @__PURE__ */ t.jsx("div", { className: "nb-blank-sub", children: ve ? "Notebooks are saved on your own machine, so they need the downloaded app. This page is the hosted preview." : "Write, drop photos in, draw on it, and set maths in real notation. Everything is stored on this machine." }),
      !ve && o.length > 0 ? /* @__PURE__ */ t.jsxs("div", { className: "nb-recent", children: [
        /* @__PURE__ */ t.jsxs("button", { className: "nb-recent-card nb-recent-new", onClick: Te, children: [
          /* @__PURE__ */ t.jsx("span", { className: "nb-recent-plus", children: "+" }),
          /* @__PURE__ */ t.jsx("span", { children: "New notebook" })
        ] }),
        o.slice(0, 11).map((e) => /* @__PURE__ */ t.jsxs("button", { className: "nb-recent-card", onClick: () => nt(e.id), children: [
          /* @__PURE__ */ t.jsx("span", { className: "nb-recent-name", children: e.name }),
          /* @__PURE__ */ t.jsxs("span", { className: "nb-recent-meta", children: [
            e.blocks,
            " ",
            e.blocks === 1 ? "item" : "items",
            e.updated_at ? " · " + gn(e.updated_at) : ""
          ] })
        ] }, e.id))
      ] }) : !ve && /* @__PURE__ */ t.jsx("button", { onClick: Te, children: "New notebook" }),
      !!kt && /* @__PURE__ */ t.jsx("div", { className: "nb-blank-err", children: kt })
    ] }) }),
    /* @__PURE__ */ t.jsx(
      "input",
      {
        ref: et,
        type: "file",
        accept: "image/*",
        multiple: !0,
        style: { display: "none" },
        onChange: (e) => {
          const n = Array.from(e.target.files || []);
          e.target.value = "";
          const a = Nt.current;
          Nt.current = null, n.forEach((r, s) => Xe(r, a ? { x: a.x + s * 28, y: a.y + s * 28 } : void 0));
        }
      }
    )
  ] });
}
const wn = 14;
function qt({
  shape: o,
  x1: p,
  y1: i,
  x2: h,
  y2: l,
  color: y,
  width: f = 2,
  dash: v,
  fill: z,
  hit: j,
  hitWidth: P
}) {
  const T = {
    stroke: j ? "transparent" : y || "currentColor",
    strokeWidth: j ? Math.max(f, P ?? wn) : f,
    fill: "none",
    // A dashed outline is grabbed along its whole length, gaps included.
    strokeDasharray: j || !v ? void 0 : `${f * 3} ${f * 2.2}`,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    // The PAINTED stroke is screen-constant. The grab band cannot be: hit
    // testing ignores vector-effect, so a non-scaling band shrinks with the
    // zoom (measured: 6px of tolerance at 100%, 1px at 25%, 0px at
    // 10%, which is why a drawing could not be picked up on a zoomed-out
    // canvas and the miss panned the page instead). The caller sizes the band
    // in USER units from the live zoom so it stays a real target everywhere.
    ...j ? {} : { vectorEffect: "non-scaling-stroke" },
    // Only the grab band is hit-tested, and a filled shape is grabbable
    // through its fill as well as its outline ('all' would also catch the
    // interior of an UNfilled one, which is the bug this replaces).
    pointerEvents: j ? z ? "all" : "stroke" : "none"
  };
  if (o === "line" || o === "arrow")
    return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
      /* @__PURE__ */ t.jsx("line", { x1: p, y1: i, x2: h, y2: l, ...T }),
      o === "arrow" && /* @__PURE__ */ t.jsx(
        "path",
        {
          d: ir(p, i, h, l, Math.max(9, f * 4)),
          ...T,
          strokeDasharray: void 0
        }
      )
    ] });
  const C = Math.min(p, h), L = Math.min(i, l), I = Math.max(Math.abs(h - p), 1), S = Math.max(Math.abs(l - i), 1), R = j ? z ? "transparent" : "none" : z || "none";
  if (o === "rect")
    return /* @__PURE__ */ t.jsx("rect", { x: C, y: L, width: I, height: S, rx: 2, ...T, fill: R });
  if (o === "ellipse")
    return /* @__PURE__ */ t.jsx(
      "ellipse",
      {
        cx: C + I / 2,
        cy: L + S / 2,
        rx: I / 2,
        ry: S / 2,
        ...T,
        fill: R
      }
    );
  const V = C + I / 2, A = L + S / 2;
  let Y;
  if (o === "triangle")
    Y = [[V, L], [C + I, L + S], [C, L + S]];
  else if (o === "diamond")
    Y = [[V, L], [C + I, A], [V, L + S], [C, A]];
  else {
    Y = [];
    for (let Z = 0; Z < 10; Z++) {
      const ye = -Math.PI / 2 + Z * Math.PI / 5, je = Z % 2 ? 0.38 : 1;
      Y.push([V + Math.cos(ye) * (I / 2) * je, A + Math.sin(ye) * (S / 2) * je]);
    }
  }
  return /* @__PURE__ */ t.jsx(
    "polygon",
    {
      points: Y.map(([Z, ye]) => `${Z},${ye}`).join(" "),
      ...T,
      fill: R
    }
  );
}
function $t({ tool: o, setTool: p, members: i, open: h, setOpen: l, fav: y, onFav: f }) {
  const [v, z] = c.useState(i[0][0]), j = i.some(([C]) => C === o), P = j ? o : v, T = i.find(([C]) => C === P) || i[0];
  return c.useEffect(() => {
    j && z(o);
  }, [o, j]), /* @__PURE__ */ t.jsxs("span", { className: "nb-grp", children: [
    /* @__PURE__ */ t.jsx(
      "button",
      {
        className: "nb-tool nb-grp-face" + (j ? " active" : ""),
        "data-tip": `${T[2]}  (${T[1]})`,
        onClick: () => {
          p(P), l(!1);
        },
        children: Ne[P]
      }
    ),
    /* @__PURE__ */ t.jsx(
      "button",
      {
        className: "nb-grp-caret" + (h ? " on" : ""),
        "aria-label": "More tools",
        onClick: (C) => {
          C.stopPropagation(), l(!h);
        },
        children: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 8 8", width: "7", height: "7", "aria-hidden": "true", children: /* @__PURE__ */ t.jsx(
          "path",
          {
            d: "M1 2.6 L4 5.6 L7 2.6",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.3",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) })
      }
    ),
    h && /* @__PURE__ */ t.jsx("div", { className: "nb-grp-menu", onPointerDown: (C) => C.stopPropagation(), children: i.map(([C, L, I]) => /* @__PURE__ */ t.jsxs(
      "button",
      {
        className: "nb-grp-item" + (o === C ? " on" : ""),
        onClick: () => {
          p(C), z(C), l(!1);
        },
        children: [
          /* @__PURE__ */ t.jsx("span", { className: "nb-grp-ico", children: Ne[C] }),
          /* @__PURE__ */ t.jsx("span", { className: "nb-grp-name", children: I }),
          /* @__PURE__ */ t.jsx("span", { className: "nb-grp-key", children: L }),
          y && f && /* @__PURE__ */ t.jsx(
            "span",
            {
              className: "nb-grp-star" + (y(C) ? " on" : ""),
              "data-tip": y(C) ? "Remove from favourites" : "Add to favourites",
              onClick: (S) => {
                S.stopPropagation(), f(C);
              },
              children: /* @__PURE__ */ t.jsx(
                "svg",
                {
                  viewBox: "0 0 16 16",
                  width: "13",
                  height: "13",
                  fill: y(C) ? "currentColor" : "none",
                  stroke: "currentColor",
                  strokeWidth: "1.2",
                  strokeLinejoin: "round",
                  children: /* @__PURE__ */ t.jsx("path", { d: "M8 2.4l1.7 3.7 4 .5-3 2.8.8 4L8 11.5l-3.5 1.9.8-4-3-2.8 4-.5z" })
                }
              )
            }
          )
        ]
      },
      C
    )) })
  ] });
}
function W({ label: o, children: p }) {
  return /* @__PURE__ */ t.jsxs("div", { className: "nb-prow", children: [
    o !== void 0 && /* @__PURE__ */ t.jsx("span", { className: "nb-prow-lab", children: o }),
    /* @__PURE__ */ t.jsx("span", { className: "nb-prow-body", children: p })
  ] });
}
function me({ value: o, onPick: p, bg: i }) {
  const h = i ? Un : Yn;
  return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
    h.map((l) => /* @__PURE__ */ t.jsx(
      "button",
      {
        className: "nb-swatch" + (i ? " nb-swatch-bg" : "") + (o === l ? " on" : ""),
        style: i ? l ? { background: l } : {} : { background: l || "var(--text)" },
        "data-tip": l || (i ? "No background" : "Theme colour"),
        onClick: () => p(l),
        children: i && !l ? "∅" : ""
      },
      l || "default"
    )),
    !i && /* @__PURE__ */ t.jsx("label", { className: "nb-swatch nb-swatch-any", "data-tip": "Any colour", children: /* @__PURE__ */ t.jsx(
      "input",
      {
        type: "color",
        value: /^#[0-9a-f]{6}$/i.test(o) ? o : "#4f8fd9",
        onChange: (l) => p(l.target.value)
      }
    ) })
  ] });
}
function Ve({ value: o, onPick: p }) {
  return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
    Gn.map((i) => /* @__PURE__ */ t.jsx(
      "button",
      {
        className: "nb-wbtn" + (o === i ? " on" : ""),
        "data-tip": `${i}px`,
        onClick: () => p(i),
        children: /* @__PURE__ */ t.jsx("span", { className: "nb-wbar", style: { height: Math.min(1 + i, 18) } })
      },
      i
    )),
    /* @__PURE__ */ t.jsx(
      "input",
      {
        className: "nb-num",
        type: "number",
        min: 1,
        max: 200,
        step: 1,
        "data-tip": "Any width, 1 to 200",
        value: o ? Math.round(o * 10) / 10 : "",
        onChange: (i) => {
          const h = parseFloat(i.target.value);
          isFinite(h) && p(ne(h, 1, 200));
        }
      }
    )
  ] });
}
function Ye({ x: o, y: p, title: i, onMove: h, onSize: l, children: y, compact: f }) {
  const v = c.useRef(null), z = c.useRef(null);
  return c.useLayoutEffect(() => {
    const j = z.current;
    j && l && l(j.offsetWidth, j.offsetHeight);
  }), /* @__PURE__ */ t.jsxs(
    "div",
    {
      className: "nb-float" + (f ? " nb-float-compact" : ""),
      ref: z,
      style: { left: o, top: p },
      onPointerDown: (j) => j.stopPropagation(),
      children: [
        /* @__PURE__ */ t.jsxs(
          "div",
          {
            className: "nb-float-grip",
            onPointerDown: (j) => {
              j.stopPropagation();
              try {
                j.currentTarget.setPointerCapture(j.pointerId);
              } catch {
              }
              v.current = { dx: j.clientX - o, dy: j.clientY - p };
            },
            onPointerMove: (j) => {
              v.current && h(j.clientX - v.current.dx, j.clientY - v.current.dy);
            },
            onPointerUp: () => {
              v.current = null;
            },
            onPointerCancel: () => {
              v.current = null;
            },
            children: [
              /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 8 14", width: "8", height: "14", "aria-hidden": "true", children: /* @__PURE__ */ t.jsxs("g", { fill: "currentColor", children: [
                /* @__PURE__ */ t.jsx("circle", { cx: "2", cy: "2", r: "1.1" }),
                /* @__PURE__ */ t.jsx("circle", { cx: "6", cy: "2", r: "1.1" }),
                /* @__PURE__ */ t.jsx("circle", { cx: "2", cy: "7", r: "1.1" }),
                /* @__PURE__ */ t.jsx("circle", { cx: "6", cy: "7", r: "1.1" }),
                /* @__PURE__ */ t.jsx("circle", { cx: "2", cy: "12", r: "1.1" }),
                /* @__PURE__ */ t.jsx("circle", { cx: "6", cy: "12", r: "1.1" })
              ] }) }),
              !f && /* @__PURE__ */ t.jsx("span", { className: "nb-float-title", children: i })
            ]
          }
        ),
        /* @__PURE__ */ t.jsx("div", { className: "nb-float-body", children: y })
      ]
    }
  );
}
function mr({ b: o, selected: p, handles: i, editing: h, zoom: l, editRef: y, onEdit: f, onChange: v }) {
  const z = {
    left: o.x,
    top: o.y,
    width: o.w,
    height: o.h
  }, j = o.type === "ink" || o.type === "shape", P = "nb-block nb-" + o.type + (j ? " nb-thin" : "") + (p ? " sel" : "") + (h ? " editing" : ""), T = c.useMemo(() => {
    if (o.type !== "ink") return null;
    let R = 1, V = 1;
    for (const [A, Y] of o.points)
      A > R && (R = A), Y > V && (V = Y);
    return { w: R, h: V };
  }, [o]), C = (R, V, A, Y) => {
    const Z = Math.min(
      R / Math.max(A, 1e-3),
      V / Math.max(Y, 1e-3)
    ) * Math.max(l, 1e-3);
    return wn / Math.max(Z, 1e-4);
  }, L = c.useRef(null), I = o.type === "math" ? o.latex : "", S = o.type === "math" ? o.size : 0;
  return c.useLayoutEffect(() => {
    const R = L.current;
    if (o.type !== "math" || !R) return;
    const V = R.querySelector(".katex-display") || R.querySelector(".katex");
    if (!V) return;
    const A = V.getBoundingClientRect();
    if (!A.width || !A.height) return;
    const Y = Math.ceil(A.width / Math.max(l, 0.01)) + 34, Z = Math.ceil(A.height / Math.max(l, 0.01)) + 26;
    (Y > o.w + 1 || Z > o.h + 1) && v({ w: Math.max(o.w, Y), h: Math.max(o.h, Z) });
  }, [I, S, o.type, o.w, o.h, l, v]), /* @__PURE__ */ t.jsxs("div", { className: P, "data-block": o.id, style: z, onDoubleClick: (R) => {
    (o.type === "text" || o.type === "math") && (R.stopPropagation(), f());
  }, children: [
    o.type === "text" && (h ? /* @__PURE__ */ t.jsx(
      "textarea",
      {
        ref: y,
        className: "nb-edit" + (o.mono ? " nb-mono" : ""),
        style: {
          fontSize: o.size,
          color: o.color || void 0,
          background: o.bg || void 0,
          fontWeight: o.bold ? 600 : void 0,
          fontStyle: o.italic ? "italic" : void 0,
          textAlign: o.align || void 0
        },
        value: o.text,
        placeholder: o.mono ? "Paste or write code. It is kept verbatim, no maths pass." : "Write here. Maths goes between $ signs, like $\\sigma^2$.",
        onChange: (R) => v({ text: R.target.value })
      }
    ) : /* @__PURE__ */ t.jsx(
      "div",
      {
        className: "nb-prose" + (o.bg ? " nb-card" : "") + (o.mono ? " nb-mono" : ""),
        style: {
          fontSize: o.size,
          color: o.color || void 0,
          background: o.bg || void 0,
          fontWeight: o.bold ? 600 : void 0,
          fontStyle: o.italic ? "italic" : void 0,
          textAlign: o.align || void 0
        },
        dangerouslySetInnerHTML: { __html: o.text.trim() ? o.mono ? kn(o.text) : rr(o.text) : `<span class="nb-ph">${o.mono ? "Double-click to paste code" : "Double-click to write"}</span>` }
      }
    )),
    o.type === "math" && /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
      /* @__PURE__ */ t.jsx(
        "div",
        {
          ref: L,
          className: "nb-math-out" + (o.bg ? " nb-card" : ""),
          style: {
            fontSize: o.size,
            color: o.color || void 0,
            background: o.bg || void 0
          },
          children: /* @__PURE__ */ t.jsx(yr, { latex: o.latex })
        }
      ),
      h && /* @__PURE__ */ t.jsx(
        "textarea",
        {
          ref: y,
          className: "nb-tex-in",
          spellCheck: !1,
          value: o.latex,
          placeholder: "\\sigma^2_t = \\omega + \\alpha r_{t-1}^2 + \\beta \\sigma^2_{t-1}",
          onChange: (R) => v({ latex: R.target.value })
        }
      )
    ] }),
    o.type === "image" && // draggable=false: the browser's native image drag would start an HTML5
    // drag and steal every pointer move meant for the canvas gesture.
    /* @__PURE__ */ t.jsx(
      "img",
      {
        className: "nb-img",
        src: o.src,
        alt: o.name || "",
        draggable: !1,
        style: o.flipH || o.flipV ? { transform: `scale(${o.flipH ? -1 : 1}, ${o.flipV ? -1 : 1})` } : void 0
      }
    ),
    o.type === "ink" && /* @__PURE__ */ t.jsxs(
      "svg",
      {
        className: "nb-ink",
        viewBox: `0 0 ${T?.w || 1} ${T?.h || 1}`,
        preserveAspectRatio: "none",
        children: [
          /* @__PURE__ */ t.jsx(
            "path",
            {
              className: "nb-hit",
              d: Ft(o.points),
              fill: "none",
              stroke: "transparent",
              strokeWidth: Math.max(
                o.width,
                C(o.w, o.h, T?.w || 1, T?.h || 1)
              ),
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ t.jsx(
            "path",
            {
              d: Ft(o.points),
              fill: "none",
              stroke: o.color,
              strokeWidth: o.width,
              opacity: o.mode === "highlighter" ? 0.45 : 1,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              vectorEffect: "non-scaling-stroke"
            }
          )
        ]
      }
    ),
    o.type === "shape" && /* @__PURE__ */ t.jsxs(
      "svg",
      {
        className: "nb-ink",
        viewBox: `0 0 ${Math.max(o.ow || o.w, 1)} ${Math.max(o.oh || o.h, 1)}`,
        preserveAspectRatio: "none",
        children: [
          /* @__PURE__ */ t.jsx(
            qt,
            {
              shape: o.shape,
              x1: o.x1,
              y1: o.y1,
              x2: o.x2,
              y2: o.y2,
              width: o.width,
              fill: o.fill,
              hit: !0,
              hitWidth: C(
                o.w,
                o.h,
                Math.max(o.ow || o.w, 1),
                Math.max(o.oh || o.h, 1)
              )
            }
          ),
          /* @__PURE__ */ t.jsx(
            qt,
            {
              shape: o.shape,
              x1: o.x1,
              y1: o.y1,
              x2: o.x2,
              y2: o.y2,
              color: o.color,
              width: o.width,
              dash: o.dash,
              fill: o.fill
            }
          )
        ]
      }
    ),
    i && !h && // Four corner handles (resize grabs any of them; the opposite corner
    // anchors), counter-scaled so they stay a comfortable grab target at
    // any zoom instead of becoming a speck or a slab. Only ONE block at a
    // time gets them: with six selected the handles would be six sets of
    // conflicting grips over the same drag.
    // 1/zoom exactly, no floor: the counter-scale is what holds a handle
    // at a fixed SCREEN size, so clamping it (the old Math.max(zoom, 0.15))
    // made handles shrink to nothing below 15% and a small block became
    // unresizable on a zoomed-out canvas.
    ["tl", "tr", "bl", "br"].map((R) => /* @__PURE__ */ t.jsx(
      "span",
      {
        className: "nb-handle nb-handle-" + R,
        "data-handle": R,
        style: { transform: `scale(${1 / Math.max(l, Ie)})` }
      },
      R
    ))
  ] });
}
function yr({ latex: o }) {
  const p = c.useMemo(() => Ht(o.trim(), !0), [o]);
  return o.trim() ? p.ok ? /* @__PURE__ */ t.jsx("span", { dangerouslySetInnerHTML: { __html: p.html } }) : /* @__PURE__ */ t.jsx("span", { className: "nb-tex-bad", children: o }) : /* @__PURE__ */ t.jsx("span", { className: "nb-ph", children: "Maths block. Double-click to type LaTeX." });
}
function kr({ latex: o }) {
  const p = c.useMemo(() => Ht(o.trim(), !1), [o]);
  return p.ok ? /* @__PURE__ */ t.jsx("span", { dangerouslySetInnerHTML: { __html: p.html } }) : /* @__PURE__ */ t.jsx("span", { className: "nb-pal-eq-raw", children: o });
}
const $ = {
  flipH: /* @__PURE__ */ t.jsxs("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.2", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t.jsx("path", { d: "M8 1.6v12.8", strokeDasharray: "2 2" }),
    /* @__PURE__ */ t.jsx("path", { d: "M5.6 4.6 2.4 8l3.2 3.4z" }),
    /* @__PURE__ */ t.jsx("path", { d: "M10.4 4.6 13.6 8l-3.2 3.4z", fill: "currentColor" })
  ] }),
  flipV: /* @__PURE__ */ t.jsxs("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.2", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t.jsx("path", { d: "M1.6 8h12.8", strokeDasharray: "2 2" }),
    /* @__PURE__ */ t.jsx("path", { d: "M4.6 5.6 8 2.4l3.4 3.2z" }),
    /* @__PURE__ */ t.jsx("path", { d: "M4.6 10.4 8 13.6l3.4-3.2z", fill: "currentColor" })
  ] }),
  minus: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M3.5 8h9" }) }),
  plus: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M8 3.5v9M3.5 8h9" }) }),
  front: /* @__PURE__ */ t.jsxs("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.2", children: [
    /* @__PURE__ */ t.jsx("path", { d: "M10.5 5.5v-3h-8v8h3" }),
    /* @__PURE__ */ t.jsx("rect", { x: "5.5", y: "5.5", width: "8", height: "8", fill: "currentColor", stroke: "none" })
  ] }),
  back: /* @__PURE__ */ t.jsxs("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.2", children: [
    /* @__PURE__ */ t.jsx("rect", { x: "2.5", y: "2.5", width: "8", height: "8", fill: "currentColor", stroke: "none", opacity: ".45" }),
    /* @__PURE__ */ t.jsx("path", { d: "M5.5 8.5v5h8v-8h-5" })
  ] }),
  dup: /* @__PURE__ */ t.jsxs("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", children: [
    /* @__PURE__ */ t.jsx("rect", { x: "5.5", y: "5.5", width: "8", height: "8", rx: "1" }),
    /* @__PURE__ */ t.jsx("path", { d: "M2.8 10.4V3.8a1 1 0 0 1 1-1h6.6" })
  ] }),
  trash: /* @__PURE__ */ t.jsxs("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t.jsx("path", { d: "M2.8 4.3h10.4" }),
    /* @__PURE__ */ t.jsx("path", { d: "M6.2 4.3V2.8h3.6v1.5" }),
    /* @__PURE__ */ t.jsx("path", { d: "M4.3 4.3l.6 9.2h6.2l.6-9.2" }),
    /* @__PURE__ */ t.jsx("path", { d: "M6.7 7v4M9.3 7v4" })
  ] }),
  dash: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M2.4 8h2.4M6.8 8h2.4M11.2 8h2.4" }) }),
  // A sheet with a ruling on it: the canvas surface, not a paint bucket
  // (a bucket reads as "fill the selected thing", which this is not).
  paper: /* @__PURE__ */ t.jsxs("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.2", children: [
    /* @__PURE__ */ t.jsx("rect", { x: "2.6", y: "2.6", width: "10.8", height: "10.8", rx: "1.4" }),
    /* @__PURE__ */ t.jsx("path", { d: "M2.6 6.6h10.8M2.6 9.9h10.8", opacity: ".6" })
  ] }),
  code: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M5.6 4.8 2.4 8l3.2 3.2M10.4 4.8 13.6 8l-3.2 3.2" }) }),
  marker: /* @__PURE__ */ t.jsxs("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.2", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t.jsx("path", { d: "M3 13.4h10", strokeWidth: "2.2", opacity: ".5" }),
    /* @__PURE__ */ t.jsx("path", { d: "M4.4 11 9.8 5.6a1.4 1.4 0 0 1 2 0l.6.6a1.4 1.4 0 0 1 0 2L7 13.6H4.4z" })
  ] }),
  // Bookmark: save this equation to the library.
  book: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.3", strokeLinejoin: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M4.2 2.6h7.6v10.8L8 10.2l-3.8 3.2z" }) }),
  alignLeft: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.3", strokeLinecap: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M2.8 4.4h10.4M2.8 8h6.4M2.8 11.6h8.4" }) }),
  alignCenter: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.3", strokeLinecap: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M2.8 4.4h10.4M4.8 8h6.4M3.8 11.6h8.4" }) }),
  alignRight: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.3", strokeLinecap: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M2.8 4.4h10.4M6.8 8h6.4M4.8 11.6h8.4" }) }),
  // Group alignment: a rule with two boxes lining up on it.
  al_left: /* @__PURE__ */ t.jsxs("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.2", children: [
    /* @__PURE__ */ t.jsx("path", { d: "M2.6 2.4v11.2" }),
    /* @__PURE__ */ t.jsx("rect", { x: "4.6", y: "3.8", width: "8.4", height: "3", fill: "currentColor", stroke: "none", opacity: ".75" }),
    /* @__PURE__ */ t.jsx("rect", { x: "4.6", y: "9.2", width: "5.2", height: "3", fill: "currentColor", stroke: "none", opacity: ".75" })
  ] }),
  al_right: /* @__PURE__ */ t.jsxs("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.2", children: [
    /* @__PURE__ */ t.jsx("path", { d: "M13.4 2.4v11.2" }),
    /* @__PURE__ */ t.jsx("rect", { x: "3", y: "3.8", width: "8.4", height: "3", fill: "currentColor", stroke: "none", opacity: ".75" }),
    /* @__PURE__ */ t.jsx("rect", { x: "6.2", y: "9.2", width: "5.2", height: "3", fill: "currentColor", stroke: "none", opacity: ".75" })
  ] }),
  al_centerX: /* @__PURE__ */ t.jsxs("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.2", children: [
    /* @__PURE__ */ t.jsx("path", { d: "M8 2.4v11.2", strokeDasharray: "2 2" }),
    /* @__PURE__ */ t.jsx("rect", { x: "3.8", y: "3.8", width: "8.4", height: "3", fill: "currentColor", stroke: "none", opacity: ".75" }),
    /* @__PURE__ */ t.jsx("rect", { x: "5.4", y: "9.2", width: "5.2", height: "3", fill: "currentColor", stroke: "none", opacity: ".75" })
  ] }),
  al_top: /* @__PURE__ */ t.jsxs("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.2", children: [
    /* @__PURE__ */ t.jsx("path", { d: "M2.4 2.6h11.2" }),
    /* @__PURE__ */ t.jsx("rect", { x: "3.8", y: "4.6", width: "3", height: "8.4", fill: "currentColor", stroke: "none", opacity: ".75" }),
    /* @__PURE__ */ t.jsx("rect", { x: "9.2", y: "4.6", width: "3", height: "5.2", fill: "currentColor", stroke: "none", opacity: ".75" })
  ] }),
  al_bottom: /* @__PURE__ */ t.jsxs("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.2", children: [
    /* @__PURE__ */ t.jsx("path", { d: "M2.4 13.4h11.2" }),
    /* @__PURE__ */ t.jsx("rect", { x: "3.8", y: "3", width: "3", height: "8.4", fill: "currentColor", stroke: "none", opacity: ".75" }),
    /* @__PURE__ */ t.jsx("rect", { x: "9.2", y: "6.2", width: "3", height: "5.2", fill: "currentColor", stroke: "none", opacity: ".75" })
  ] }),
  al_centerY: /* @__PURE__ */ t.jsxs("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.2", children: [
    /* @__PURE__ */ t.jsx("path", { d: "M2.4 8h11.2", strokeDasharray: "2 2" }),
    /* @__PURE__ */ t.jsx("rect", { x: "3.8", y: "3.8", width: "3", height: "8.4", fill: "currentColor", stroke: "none", opacity: ".75" }),
    /* @__PURE__ */ t.jsx("rect", { x: "9.2", y: "5.4", width: "3", height: "5.2", fill: "currentColor", stroke: "none", opacity: ".75" })
  ] })
}, Ne = {
  select: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "currentColor", children: /* @__PURE__ */ t.jsx("path", { d: "M3 2l9 5.2-3.9.9L6.7 13z" }) }),
  hand: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M5 8V4.2a1 1 0 112 0V8m0-.6V3.2a1 1 0 112 0V8m0-.4V4.4a1 1 0 112 0V9m0-1.4a1 1 0 112 0v3.1c0 2-1.6 3.6-3.6 3.6h-.8c-1 0-2-.5-2.6-1.3L4 11.4c-.5-.7-.3-1.4.3-1.8.5-.3 1.1-.2 1.5.3L7 11" }) }),
  text: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.3", strokeLinecap: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M3 4h10M8 4v9M6 13h4" }) }),
  math: /* @__PURE__ */ t.jsx("span", { style: { fontSize: 13, fontStyle: "italic", fontFamily: "KaTeX_Math, serif" }, children: "x" }),
  pen: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.2", strokeLinejoin: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M2.6 13.4l.7-2.6 7-7 1.9 1.9-7 7-2.6.7zM10.3 3.8l1.2-1.2 1.9 1.9-1.2 1.2" }) }),
  eraser: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.2", strokeLinejoin: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M5.5 13h8M2.8 10.2l6-6a1 1 0 011.4 0l2.6 2.6a1 1 0 010 1.4l-4.8 4.8H5.6l-2.8-2.8zM6.8 5.6l4.6 4.6" }) }),
  image: /* @__PURE__ */ t.jsxs("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.2", children: [
    /* @__PURE__ */ t.jsx("rect", { x: "2.2", y: "3.2", width: "11.6", height: "9.6", rx: "1" }),
    /* @__PURE__ */ t.jsx("circle", { cx: "6", cy: "6.5", r: "1.1" }),
    /* @__PURE__ */ t.jsx("path", { d: "M3 11.4l3.2-3 2.3 2.2 2-1.8 2.5 2.6" })
  ] }),
  // Endpoint dots, not a bare diagonal: a lone slash read as a separator,
  // not as the straight-line tool.
  line: /* @__PURE__ */ t.jsxs("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.3", strokeLinecap: "round", children: [
    /* @__PURE__ */ t.jsx("path", { d: "M4.8 11.2 11.2 4.8" }),
    /* @__PURE__ */ t.jsx("circle", { cx: "3.4", cy: "12.6", r: "1.5", fill: "currentColor", stroke: "none" }),
    /* @__PURE__ */ t.jsx("circle", { cx: "12.6", cy: "3.4", r: "1.5", fill: "currentColor", stroke: "none" })
  ] }),
  arrow: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M3 13L13 3M13 3H7.5M13 3v5.5" }) }),
  rect: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.3", children: /* @__PURE__ */ t.jsx("rect", { x: "2.8", y: "3.8", width: "10.4", height: "8.4", rx: "1" }) }),
  ellipse: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.3", children: /* @__PURE__ */ t.jsx("ellipse", { cx: "8", cy: "8", rx: "5.5", ry: "4.2" }) }),
  triangle: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.3", strokeLinejoin: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M8 3 13.4 12.6H2.6z" }) }),
  diamond: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.3", strokeLinejoin: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M8 2.6 13.4 8 8 13.4 2.6 8z" }) }),
  star: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.2", strokeLinejoin: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M8 2.4l1.7 3.7 4 .5-3 2.8.8 4L8 11.5l-3.5 1.9.8-4-3-2.8 4-.5z" }) }),
  // A note that is obviously a NOTE: a square with a folded corner.
  sticky: /* @__PURE__ */ t.jsxs("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.25", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t.jsx("path", { d: "M2.8 3.4a.6.6 0 0 1 .6-.6h9.2a.6.6 0 0 1 .6.6v6.2l-3.6 3.6H3.4a.6.6 0 0 1-.6-.6z" }),
    /* @__PURE__ */ t.jsx("path", { d: "M13.2 9.6H9.6v3.6" })
  ] }),
  code: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M5.6 4.8 2.4 8l3.2 3.2M10.4 4.8 13.6 8l-3.2 3.2" }) }),
  highlighter: /* @__PURE__ */ t.jsxs("svg", { viewBox: "0 0 16 16", width: "17", height: "17", fill: "none", stroke: "currentColor", strokeWidth: "1.2", strokeLinejoin: "round", children: [
    /* @__PURE__ */ t.jsx("path", { d: "M3 13.4h10", strokeWidth: "2.2", opacity: ".5" }),
    /* @__PURE__ */ t.jsx("path", { d: "M4.4 11 9.8 5.6a1.4 1.4 0 0 1 2 0l.6.6a1.4 1.4 0 0 1 0 2L7 13.6H4.4z" })
  ] })
}, vr = `
.nb-wrap { position: absolute; inset: 0; display: flex; background: var(--bg);
  color: var(--text); font-size: 12px; overflow: hidden; }

.nb-rail { width: 232px; flex: none; display: flex; flex-direction: column;
  background: var(--panel); border-right: 1px solid var(--edge); min-height: 0; }
.nb-rail-head { display: flex; align-items: center; gap: 7px; padding: 9px 8px 8px 12px;
  font-size: 10px; letter-spacing: .09em; color: var(--title); border-bottom: 1px solid var(--edge); }
.nb-count { color: var(--dim); letter-spacing: 0; }
.nb-plus { margin-left: auto; width: 20px; height: 20px; line-height: 1; font-size: 15px;
  background: none; border: 0; color: var(--dim); cursor: pointer; border-radius: 3px; }
.nb-plus:hover { background: var(--hover); color: var(--text); }
.nb-rail-scroll { flex: 1; overflow-y: auto; min-height: 0; }
.nb-rail-list { flex: none; }
/* Shell-rendered library tree (WORKSPACE + DATA) under the notebook list;
   its rows carry the shell's own .tree-* styles from style.css. */
.nb-lib { padding-bottom: 14px; }
.nb-rail-empty { padding: 14px 12px; color: var(--dim); line-height: 1.5; }
.nb-rail-empty button, .nb-blank button { display: block; margin-top: 10px; padding: 5px 10px;
  background: var(--raise); color: var(--text); border: 1px solid var(--edge);
  border-radius: 3px; font: inherit; cursor: pointer; }
.nb-rail-empty button:hover, .nb-blank button:hover { background: var(--raise-h); }
.nb-row { display: flex; align-items: stretch; border-bottom: 1px solid var(--edge);
  border-left: 2px solid transparent; }
.nb-row:hover { background: var(--hover); }
.nb-row.active { border-left-color: var(--accent-bar); background: var(--active); }
.nb-row-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px;
  padding: 8px 6px 8px 10px; background: none; border: 0; color: inherit; font: inherit;
  text-align: left; cursor: pointer; }
.nb-row-name { font-size: 11.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.nb-row-meta { font-size: 10px; color: var(--dim); }
.nb-row-acts { display: flex; align-items: center; gap: 2px; padding-right: 6px; opacity: 0; }
.nb-row:hover .nb-row-acts { opacity: 1; }
.nb-row-acts button { width: 20px; height: 20px; background: none; border: 0; color: var(--dim);
  font: inherit; font-size: 11px; cursor: pointer; border-radius: 3px; }
.nb-row-acts button:hover { background: var(--edge); color: var(--text); }
.nb-rename { flex: 1; margin: 5px 8px; padding: 3px 6px; background: var(--bg);
  border: 1px solid var(--line-strong); border-radius: 3px; color: var(--text); font: inherit; }
.nb-rename:focus { outline: none; }

.nb-main { flex: 1; min-width: 0; display: flex; flex-direction: column; position: relative; }
.nb-bar { flex: none; display: flex; align-items: center; gap: 10px; padding: 6px 10px;
  border-bottom: 1px solid var(--edge); background: var(--panel); }
.nb-title { width: 210px; padding: 3px 6px; background: transparent; border: 1px solid transparent;
  border-radius: 3px; color: var(--text); font: inherit; font-size: 12.5px; }
.nb-title:hover { border-color: var(--edge); }
.nb-title:focus { outline: none; border-color: var(--line-strong); background: var(--bg); }
.nb-tools { display: flex; align-items: center; gap: 3px; }
.nb-sep { width: 1px; height: 20px; background: var(--edge); margin: 0 6px; }
/* 32x30 with a 17px glyph. The old 26x24 button with a 13px glyph read as
   decoration and the tools were hard to tell apart. */
.nb-tool { display: flex; align-items: center; justify-content: center; width: 32px; height: 30px;
  background: none; border: 1px solid transparent; border-radius: 6px; color: var(--dim);
  font: inherit; cursor: pointer; }
.nb-tool:hover:not(:disabled) { background: var(--hover); color: var(--text); }
.nb-tool.active { background: var(--active); border-color: var(--edge); color: var(--text); }
.nb-tool:disabled { opacity: .35; cursor: default; }
.nb-tool-danger:hover:not(:disabled) { color: var(--err); }
/* Favourite tools: the icon carries the saved colour, the bar under it the
   saved width, so the button IS its own legend. */
.nb-fav { position: relative; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 1px; }
.nb-fav-bar { display: block; width: 14px; border-radius: 3px;
  background: currentColor; opacity: .9; }

/* Tool group: face + caret sharing one rounded slot, with the member list
   hanging under it. */
.nb-grp { position: relative; display: flex; align-items: stretch; }
.nb-grp .nb-grp-face { width: 30px; border-radius: 6px 0 0 6px; }
.nb-grp-caret { display: flex; align-items: flex-end; justify-content: center;
  width: 14px; padding: 0 0 5px; background: none; border: 1px solid transparent;
  border-left: 0; border-radius: 0 6px 6px 0; color: var(--dim); cursor: pointer; }
.nb-grp-caret:hover, .nb-grp-caret.on { background: var(--hover); color: var(--text); }
.nb-grp .nb-grp-face.active + .nb-grp-caret { background: var(--active);
  border-color: var(--edge); border-left: 0; color: var(--text); }
.nb-grp-menu { position: absolute; z-index: 60; top: calc(100% + 5px); left: 0;
  min-width: 168px; padding: 5px; display: flex; flex-direction: column; gap: 1px;
  background: var(--panel); border: 1px solid var(--line-strong); border-radius: 8px;
  box-shadow: 0 10px 28px rgba(0,0,0,.45); }
.nb-grp-item { display: flex; align-items: center; gap: 10px; padding: 6px 8px;
  background: none; border: 0; border-radius: 5px; color: var(--text); font: inherit;
  font-size: 12px; cursor: pointer; text-align: left; }
.nb-grp-item:hover { background: var(--hover); }
.nb-grp-item.on { background: var(--active); }
.nb-grp-ico { display: flex; width: 18px; justify-content: center; color: var(--dim); }
.nb-grp-item.on .nb-grp-ico { color: var(--text); }
.nb-grp-name { flex: 1; }
.nb-grp-key { color: var(--dim); font-size: 10px; letter-spacing: .06em; }
/* The row's favourite star: dim outline until hovered, gold once pinned.
   Same contract as the chart's drawing favourites. */
/* Faint but ALWAYS there, not hover-revealed like the chart's: on a touch
   monitor a hover-only control does not exist. */
.nb-grp-star { display: flex; align-items: center; padding: 2px;
  border-radius: 3px; color: var(--dim); opacity: .5; }
.nb-grp-item:hover .nb-grp-star { opacity: 1; }
.nb-grp-star:hover { color: #eab308; }
.nb-grp-star.on { opacity: 1; color: #eab308; }
.nb-status { flex: 1; min-width: 0; color: var(--dim); font-size: 10.5px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.nb-zoom { display: flex; align-items: center; gap: 2px; }
.nb-zoom button { min-width: 26px; height: 22px; padding: 0 6px; background: none;
  border: 1px solid var(--edge); border-radius: 3px; color: var(--dim); font: inherit;
  font-size: 10.5px; cursor: pointer; }
.nb-zoom button:hover { background: var(--hover); color: var(--text); }

/* Floating control cards over the canvas (selection editor + tool palette).
   The body is a COLUMN of labelled rows, not one wrapping flex box: the old
   layout put Colour, Width and the highlighter toggle in one stream and let
   them wrap wherever they landed, which stranded a single nib on its own
   line. Each control group now owns a row and cannot be broken up. */
/* width: max-content, NOT the absolute-position default: shrink-to-fit
   resolves against the space right of the card's anchor, so a card anchored
   mid-canvas got squeezed and wrapped rows it had room for. */
.nb-float { position: absolute; z-index: 40; width: max-content; max-width: 360px;
  background: var(--panel); border: 1px solid var(--line-strong); border-radius: 10px;
  box-shadow: 0 14px 40px rgba(0,0,0,.42), 0 2px 6px rgba(0,0,0,.25); }
.nb-float-grip { display: flex; align-items: center; gap: 8px; padding: 7px 12px 6px 9px;
  color: var(--dim); cursor: grab; border-bottom: 1px solid var(--edge);
  touch-action: none; user-select: none; }
.nb-float-grip:active { cursor: grabbing; }
/* Compact pill: dots and buttons share ONE row; no header, no divider. */
.nb-float-compact { display: flex; align-items: center; }
.nb-float-compact .nb-float-grip { border-bottom: 0; padding: 6px 4px 6px 9px; }
.nb-float-compact .nb-float-body { flex-direction: row; align-items: center;
  gap: 3px; padding: 4px 8px 4px 2px; }
.nb-float-title { font-size: 10px; letter-spacing: .1em; color: var(--title); }
.nb-float-body { display: flex; flex-direction: column; padding: 4px 0 5px; }
/* (.nb-float-break / .nb-float-sep lived here to break and divide a single
   wrapping control stream. The cards are rows now, one control group per
   line, so nothing renders them; removed rather than left to rot.) */

/* One control group, one line. The label column is fixed so every row's
   controls start on the same vertical, which is most of what makes the card
   look built rather than assembled. */
.nb-prow { display: flex; align-items: flex-start; gap: 10px; padding: 5px 12px; }
.nb-prow + .nb-prow { border-top: 1px solid color-mix(in srgb, var(--edge) 55%, transparent); }
.nb-prow-lab { flex: none; width: 46px; padding-top: 7px; color: var(--dim);
  font-size: 9.5px; letter-spacing: .07em; text-transform: uppercase; }
.nb-prow-body { flex: 1; display: flex; align-items: center; flex-wrap: wrap; gap: 5px; }
.nb-prow-gap { flex: none; width: 1px; height: 18px; background: var(--edge); margin: 0 3px; }
.nb-hint { color: var(--dim); font-size: 10.5px; }

/* Instant tooltips: a borderless pill from data-tip, with no hover delay
   (the native title waits a second and drags the OS chrome along with it).
   Cards and everything else show it above; the top toolbar shows it BELOW,
   because above the toolbar is outside the page and the pill would clip. */
.nb-wrap [data-tip] { position: relative; }
.nb-wrap [data-tip]:hover::after { content: attr(data-tip); position: absolute;
  bottom: calc(100% + 7px); left: 50%; transform: translateX(-50%);
  background: var(--bg2); color: var(--text); font-size: 10.5px; line-height: 1;
  padding: 5px 8px; border-radius: 4px; white-space: nowrap; pointer-events: none;
  box-shadow: 0 3px 12px rgba(0,0,0,.45); z-index: 60; }
.nb-bar [data-tip]:hover::after { bottom: auto; top: calc(100% + 7px); }

/* Right-click menu: same card chrome as the panels. */
.nb-menu { position: absolute; z-index: 50; min-width: 168px; padding: 4px;
  background: var(--panel); border: 1px solid var(--line-strong); border-radius: 6px;
  box-shadow: 0 6px 22px rgba(0,0,0,.35); display: flex; flex-direction: column; }
.nb-menu-item { display: block; width: 100%; text-align: left; padding: 6px 10px;
  background: none; border: 0; border-radius: 4px; color: var(--text); font: inherit;
  font-size: 11.5px; cursor: pointer; }
.nb-menu-item:hover { background: var(--hover); }
.nb-menu-item.danger:hover { color: var(--err); }
/* Paper picker: two labelled rows under its toolbar button. */
.nb-paper-menu { min-width: 0; padding: 8px 10px 9px; gap: 6px; }
.nb-paper-row { display: flex; align-items: center; flex-wrap: wrap; gap: 5px; }
.nb-swatch-paper { width: 19px; height: 19px; border-radius: 4px; }
/* The free-colour chip IS the native colour input, sized down to a swatch:
   a separate trigger button would need a popover of its own to host it. */
.nb-swatch-any { position: relative; width: 22px; height: 22px; border-radius: 50%;
  overflow: hidden; background: conic-gradient(#e05d5d, #cdb648, #57a869,
  #4f8fd9, #9a6fd9, #e05d5d); cursor: pointer; }
.nb-paper-menu .nb-swatch-any { border-radius: 6px; }
.nb-swatch-any input { position: absolute; inset: -6px; width: 200%; height: 200%;
  padding: 0; border: 0; background: none; cursor: pointer; opacity: 0; }
.nb-sb-lab { color: var(--dim); font-size: 10px; letter-spacing: .05em;
  text-transform: uppercase; margin: 0 4px 0 8px; }
.nb-sb-lab:first-child { margin-left: 0; }
.nb-sb-val { min-width: 22px; text-align: center; color: var(--text); font-size: 12px; }
/* Card buttons: roomy click targets, no borders anywhere (the bordered
   selected state read as a stray white box; selection is background only). */
.nb-sb-btn { display: flex; align-items: center; justify-content: center; min-width: 30px;
  height: 30px; padding: 0 6px; background: none; border: 0;
  border-radius: 6px; color: var(--dim); font: inherit; font-size: 12.5px; cursor: pointer; }
.nb-sb-btn:hover { background: var(--hover); color: var(--text); }
.nb-sb-btn.on { background: var(--active); color: var(--text); }
.nb-sb-btn.nb-sb-wide { padding: 0 12px; font-size: 10.5px; letter-spacing: .08em; }
.nb-sb-btn.nb-sb-danger:hover { color: var(--err); background: var(--err-bg); }
.nb-sb-flex { flex: 1; }
.nb-dot { display: inline-block; border-radius: 50%; background: currentColor; }
/* Nib picker: a bar drawn at the true stroke weight, so the row is a
   thickness scale you read rather than six identical squares. */
.nb-wbtn { display: flex; align-items: center; justify-content: center; width: 32px;
  height: 30px; padding: 0; background: none; border: 0; border-radius: 6px;
  color: var(--dim); cursor: pointer; }
.nb-wbtn:hover { background: var(--hover); color: var(--text); }
.nb-wbtn.on { background: var(--active); color: var(--text); }
.nb-wbar { display: block; width: 21px; border-radius: 10px; background: currentColor; }
/* Type an exact number where the presets do not have it. */
.nb-num { width: 52px; height: 30px; padding: 0 4px 0 7px; background: var(--bg2);
  border: 1px solid var(--edge); border-radius: 6px; color: var(--text);
  font: inherit; font-size: 12.5px; }
.nb-num:focus { outline: none; border-color: var(--line-strong); }
.nb-num::-webkit-inner-spin-button { opacity: .45; }
/* 22px, up from 17: nine of them are a palette you aim at, and the old ones
   were smaller than the cursor. */
.nb-swatch { width: 22px; height: 22px; border-radius: 50%; border: 1px solid var(--edge);
  cursor: pointer; padding: 0; flex: none; transition: transform .08s ease; }
.nb-swatch:hover { transform: scale(1.14); }
.nb-swatch.on { outline: 2px solid var(--text); outline-offset: 2px; }
.nb-swatch-bg { border-radius: 6px; background: transparent; color: var(--dim);
  font-size: 11px; line-height: 1; display: flex; align-items: center; justify-content: center; }

.nb-canvas { flex: 1; min-height: 0; position: relative; overflow: hidden;
  touch-action: none; cursor: default; }
.nb-canvas.nb-tool-hand { cursor: grab; }
.nb-canvas.nb-tool-pen, .nb-canvas.nb-tool-highlighter, .nb-canvas.nb-tool-line,
.nb-canvas.nb-tool-arrow, .nb-canvas.nb-tool-rect, .nb-canvas.nb-tool-ellipse,
.nb-canvas.nb-tool-triangle, .nb-canvas.nb-tool-diamond,
.nb-canvas.nb-tool-star { cursor: crosshair; }
.nb-canvas.nb-tool-eraser { cursor: cell; }
.nb-canvas.nb-tool-text, .nb-canvas.nb-tool-math, .nb-canvas.nb-tool-sticky,
.nb-canvas.nb-tool-code { cursor: cell; }
/* Rubber band. Drawn inside the scene, so its border is counter-scaled by the
   inline width to stay one screen pixel at any zoom. */
.nb-marquee { position: absolute; pointer-events: none; border-style: solid;
  border-color: var(--nb-sel-edge, var(--line-strong));
  background: color-mix(in srgb, var(--accent-bar, #4f8fd9) 12%, transparent); }
.nb-grid { position: absolute; inset: 0; pointer-events: none;
  background-image: radial-gradient(circle, var(--edge) 1px, transparent 1px); }
.nb-scene { position: absolute; left: 0; top: 0; width: 0; height: 0;
  transform-origin: 0 0; }
/* 1px, NOT 0: an SVG whose viewport has zero width or height is not
   rendered at all per the SVG spec, so the in-flight stroke existed in the
   DOM but painted nothing until pointerup committed it into a real block
   (confirmed by the mid-drag pixel test). With a 1x1 viewport and
   overflow visible the path paints wherever it goes. */
.nb-live-ink { position: absolute; left: 0; top: 0; width: 1px; height: 1px;
  overflow: visible; color: inherit; pointer-events: none; }

/* Blocks are canvas objects, not a document you sweep a caret through: a
   rubber band dragged across them used to leave the browser's blue text
   selection all over the maths and prose it passed. Editing happens in
   the textarea, which keeps its own selection, so nothing is lost. */
.nb-block { position: absolute; box-sizing: border-box; user-select: none; }
.nb-edit, .nb-tex-in { user-select: text; }
/* A drawing's bounding box is not the drawing. Only the ink (.nb-hit, a fat
   transparent band along the same path) and the resize handles are pointed
   at; everything else under the box, a photo inside a circled area most of
   all, keeps receiving its own clicks. */
.nb-block.nb-thin { pointer-events: none; }
.nb-block.nb-thin .nb-hit { pointer-events: stroke; }
.nb-block.nb-thin .nb-handle { pointer-events: auto; }
.nb-block.sel { outline: 1px solid var(--nb-sel-edge, var(--line-strong)); outline-offset: 2px; }
.nb-text, .nb-math { background: transparent; }
.nb-prose { width: 100%; height: 100%; overflow: hidden; line-height: 1.45;
  white-space: pre-wrap; word-break: break-word; padding: 2px; }
.nb-prose.nb-card { border-radius: 6px; padding: 10px 12px; }
.nb-prose.nb-mono, .nb-edit.nb-mono { font-family: var(--code-font);
  white-space: pre; overflow: auto; line-height: 1.5; }
.nb-edit, .nb-tex-in { width: 100%; box-sizing: border-box; background: var(--bg2);
  border: 1px solid var(--line-strong); border-radius: 3px; color: var(--text);
  font: inherit; line-height: 1.45; padding: 4px 6px; resize: none; }
.nb-edit { height: 100%; }
.nb-edit:focus, .nb-tex-in:focus { outline: none; }
/* The LaTeX line is where a formula gets typed and mistyped; at 62px and
   11.5px mono it showed about one line of a derivation. */
.nb-tex-in { position: absolute; left: 0; top: 100%; margin-top: 8px; height: 96px;
  font-family: var(--code-font); font-size: 13.5px; line-height: 1.5; }
/* The rendered formula gets the room it needs: the block grows to the KaTeX
   box (see BlockView), and what still does not fit scrolls instead of being
   silently cut off at the edge of a box nobody set. */
.nb-math-out { width: 100%; height: 100%; display: flex; align-items: center;
  justify-content: center; overflow: auto; padding: 4px 8px; box-sizing: border-box; }
.nb-math-out.nb-card { border-radius: 6px; }
.nb-math-out .katex-display { margin: 0; }
.nb-math-out .katex { font-size: 1em; }
.nb-ph { color: var(--dim); opacity: .75; font-size: 12px; font-style: italic; }
.nb-tex-bad { color: var(--err); font-family: var(--code-font); font-size: 12.5px; }
.nb-img { width: 100%; height: 100%; object-fit: contain; user-select: none; -webkit-user-drag: none; }
/* color: inherit, not var(--text): ink drawn in the theme colour has to
   follow the CANVAS, which may be on a chosen paper the theme knows nothing
   about (white paper in dark mode would otherwise be white ink on white). */
.nb-ink { width: 100%; height: 100%; color: inherit; overflow: visible; }
.nb-handle { position: absolute; width: 10px; height: 10px;
  background: var(--panel); border: 1px solid var(--line-strong);
  border-radius: 2px; }
.nb-handle-br { right: -5px; bottom: -5px; transform-origin: 100% 100%; cursor: nwse-resize; }
.nb-handle-tl { left: -5px; top: -5px; transform-origin: 0 0; cursor: nwse-resize; }
.nb-handle-tr { right: -5px; top: -5px; transform-origin: 100% 0; cursor: nesw-resize; }
.nb-handle-bl { left: -5px; bottom: -5px; transform-origin: 0 100%; cursor: nesw-resize; }

/* Recents on the landing state: your notebooks as cards, newest first, with
   a new-notebook card leading. Overrides the generic .nb-blank button rule
   (block + margin) that the lone first-run button still uses. */
.nb-recent { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;
  max-width: 660px; margin-top: 18px; }
.nb-blank .nb-recent-card { display: flex; flex-direction: column; gap: 4px;
  align-items: flex-start; width: 190px; margin: 0; padding: 12px 14px;
  background: var(--raise); border: 1px solid var(--edge); border-radius: 6px;
  color: var(--text); font: inherit; text-align: left; cursor: pointer; }
.nb-blank .nb-recent-card:hover { background: var(--raise-h); border-color: var(--line-strong); }
.nb-blank .nb-recent-new { flex-direction: row; align-items: center;
  justify-content: center; gap: 8px; color: var(--dim); }
.nb-blank .nb-recent-new:hover { color: var(--text); }
.nb-recent-plus { font-size: 16px; line-height: 1; }
.nb-recent-name { font-size: 12.5px; max-width: 100%; overflow: hidden;
  text-overflow: ellipsis; white-space: nowrap; }
.nb-recent-meta { font-size: 10.5px; color: var(--dim); }

.nb-blank { flex: 1; display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 4px; color: var(--dim); text-align: center; padding: 24px; }
.nb-blank-title { color: var(--text); font-size: 14px; }
.nb-blank-sub { max-width: 420px; line-height: 1.6; }
.nb-blank-err { max-width: 460px; margin-top: 12px; padding: 7px 11px; text-align: left;
  background: var(--err-bg); border: 1px solid var(--err-edge); border-radius: 3px;
  color: var(--err); line-height: 1.5; }

/* Canvas + palette row. The canvas keeps flex:1 and the palette takes its
   own 260px, so opening the palette narrows the canvas instead of covering
   it: a click in the right third used to land on the palette and do nothing. */
.nb-body { flex: 1; min-height: 0; display: flex; }
.nb-palette { flex: none; width: 260px; min-height: 0;
  display: flex; flex-direction: column; background: var(--panel);
  border-left: 1px solid var(--edge); }
.nb-pal-head { display: flex; align-items: center; padding: 8px 8px 7px 12px;
  font-size: 10px; letter-spacing: .09em; color: var(--title); border-bottom: 1px solid var(--edge); }
.nb-pal-head button { margin-left: auto; background: none; border: 0; color: var(--dim);
  font: inherit; cursor: pointer; }
.nb-pal-head button:hover { color: var(--text); }
.nb-pal-hint { padding: 7px 12px; color: var(--dim); font-size: 10.5px; line-height: 1.45;
  border-bottom: 1px solid var(--edge); }
.nb-pal-body { flex: 1; overflow-y: auto; padding: 4px 8px 16px; }
.nb-pal-group { margin-top: 10px; }
.nb-pal-title { color: var(--dim); font-size: 9.5px; letter-spacing: .08em;
  text-transform: uppercase; margin: 0 0 5px 2px; }
.nb-pal-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px; }
/* Saved equations: one row each, rendered as they will look. The row is the
   drag handle; the small x removes it from the library (not from any canvas). */
.nb-pal-saved { display: flex; flex-direction: column; gap: 4px; }
.nb-pal-eq { display: flex; align-items: center; gap: 2px; }
.nb-pal-eq-body { flex: 1; min-width: 0; overflow: hidden; text-align: left;
  padding: 7px 9px; background: var(--raise); border: 1px solid var(--edge);
  border-radius: 4px; color: var(--text); font: inherit; cursor: grab; }
.nb-pal-eq-body:active { cursor: grabbing; }
.nb-pal-eq-body:hover { background: var(--raise-h); border-color: var(--line-strong); }
.nb-pal-eq-body .katex { font-size: 14px; }
.nb-pal-eq-raw { font-family: var(--code-font); font-size: 11px; color: var(--dim); }
.nb-pal-eq-x { width: 22px; height: 22px; flex: none; background: none; border: 0;
  color: var(--dim); cursor: pointer; border-radius: 3px; font-size: 10px; }
.nb-pal-eq-x:hover { background: var(--hover); color: var(--err); }

.nb-pal-grid button { height: 32px; display: flex; align-items: center; justify-content: center;
  background: var(--item); border: 1px solid transparent; border-radius: 5px; color: var(--text);
  font-family: KaTeX_Main, var(--mono); font-size: 14px; cursor: pointer; padding: 0 2px; }
.nb-pal-grid button:hover { background: var(--hover); border-color: var(--edge); }
`;
export {
  Mr as default
};
