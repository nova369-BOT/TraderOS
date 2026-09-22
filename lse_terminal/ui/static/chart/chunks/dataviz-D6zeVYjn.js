import { r as g, j as h } from "./react-vendor-C0yw3i6b.js";
import { i as ye } from "./echarts-CX0oZ33U.js";
function $e(a) {
  const e = a.slice(0, 2e3).split(/\r?\n/)[0] || "";
  return [",", "	", ";", "|"].reduce((t, s) => e.split(s).length > e.split(t).length ? s : t, ",");
}
function De(a, e) {
  const t = [];
  let s = [], n = "", c = !1;
  for (let r = 0; r < a.length; r++) {
    const d = a[r];
    c ? d === '"' ? a[r + 1] === '"' ? (n += '"', r++) : c = !1 : n += d : d === '"' ? c = !0 : d === e ? (s.push(n), n = "") : d === `
` || d === "\r" ? (d === "\r" && a[r + 1] === `
` && r++, s.push(n), n = "", s.some((i) => i.trim() !== "") && t.push(s), s = []) : n += d;
  }
  return s.push(n), s.some((r) => r.trim() !== "") && t.push(s), t;
}
const je = /^-?\$?[\d,]*\.?\d+%?$/, C = (a) => a == null || a === "" ? NaN : typeof a == "number" ? a : parseFloat(String(a).replace(/[$,%]/g, ""));
function Fe(a) {
  let e = 0, t = 0, s = 0, n = 0;
  for (const c of a) {
    if (c == null || String(c).trim() === "") continue;
    n++;
    const r = String(c).trim();
    /^(true|false|yes|no)$/i.test(r) ? s++ : je.test(r) ? e++ : !isNaN(Date.parse(r)) && /[-/:]/.test(r) && t++;
  }
  return n ? s / n > 0.9 ? "bool" : e / n > 0.9 ? "number" : t / n > 0.9 ? "date" : "category" : "category";
}
function Oe(a) {
  const e = De(a.trim(), $e(a));
  if (e.length < 2) throw new Error("need a header row plus at least one data row");
  const t = e[0].every((d) => je.test(d.trim())), s = t ? e[0].map((d, i) => `col_${i + 1}`) : e[0].map((d, i) => d.trim() || `col_${i + 1}`), n = t ? e : e.slice(1), c = s.map((d, i) => ({
    name: d,
    type: Fe(n.map((m) => m[i]))
  })), r = n.map((d) => {
    const i = {};
    return c.forEach((m, p) => {
      const u = (d[p] ?? "").trim();
      i[m.name] = m.type === "number" ? u === "" ? null : C(u) : u;
    }), i;
  });
  return { fields: c, rows: r, nrows: r.length, truncated: !1, source: "pasted" };
}
const G = {
  bar: "Bar",
  hbar: "Bar (horiz)",
  groupbar: "Grouped bar",
  line: "Line",
  area: "Area",
  candlestick: "Candlestick",
  scatter: "Scatter",
  bubble: "Bubble",
  pie: "Pie",
  donut: "Donut",
  histogram: "Histogram",
  box: "Box plot",
  heatmap: "Heatmap",
  radar: "Radar",
  treemap: "Treemap",
  funnel: "Funnel",
  gauge: "Gauge",
  bar3d: "3D bars",
  scatter3d: "3D scatter",
  surface: "3D surface"
}, _e = [
  ["Compare", ["bar", "hbar", "groupbar", "radar"]],
  ["Trend", ["line", "area"]],
  ["Financial", ["candlestick"]],
  ["Distribution", ["histogram", "box", "heatmap"]],
  ["Relationship", ["scatter", "bubble"]],
  ["Part of whole", ["pie", "donut", "treemap", "funnel"]],
  ["Single value", ["gauge"]],
  ["3D", ["bar3d", "scatter3d", "surface"]]
], J = (a) => a === "bar3d" || a === "scatter3d" || a === "surface", qe = {
  bar: '<rect x="4" y="11" width="3" height="8"/><rect x="10" y="7" width="3" height="12"/><rect x="16" y="4" width="3" height="15"/>',
  hbar: '<rect x="4" y="4" width="12" height="3"/><rect x="4" y="10" width="8" height="3"/><rect x="4" y="16" width="15" height="3"/>',
  groupbar: '<rect x="4" y="9" width="2.4" height="10"/><rect x="7" y="6" width="2.4" height="13"/><rect x="13" y="11" width="2.4" height="8"/><rect x="16" y="7" width="2.4" height="12"/>',
  line: '<polyline points="3,17 8,10 13,13 20,4"/>',
  area: '<polyline points="3,17 8,10 13,13 20,5"/><path d="M3 17 8 10 13 13 20 5 20 19 3 19Z" fill="currentColor" opacity=".15" stroke="none"/>',
  scatter: '<circle cx="6" cy="15" r="1.6"/><circle cx="11" cy="9" r="1.6"/><circle cx="15" cy="13" r="1.6"/><circle cx="19" cy="6" r="1.6"/>',
  bubble: '<circle cx="7" cy="14" r="2.4"/><circle cx="13" cy="8" r="3.4"/><circle cx="18" cy="15" r="1.6"/>',
  pie: '<circle cx="12" cy="12" r="8"/><path d="M12 12 12 4 A8 8 0 0 1 19 15Z" fill="currentColor" stroke="none" opacity=".3"/>',
  donut: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.6"/>',
  histogram: '<rect x="3" y="12" width="3" height="7"/><rect x="7" y="8" width="3" height="11"/><rect x="11" y="5" width="3" height="14"/><rect x="15" y="9" width="3" height="10"/><rect x="19" y="14" width="2.5" height="5"/>',
  box: '<line x1="7" y1="4" x2="7" y2="19"/><rect x="4" y="8" width="6" height="7"/><line x1="17" y1="6" x2="17" y2="19"/><rect x="14" y="10" width="6" height="6"/>',
  heatmap: '<rect x="4" y="4" width="15" height="15"/><line x1="9" y1="4" x2="9" y2="19"/><line x1="14" y1="4" x2="14" y2="19"/><line x1="4" y1="9" x2="19" y2="9"/><line x1="4" y1="14" x2="19" y2="14"/>',
  radar: '<polygon points="12,3 20,9 17,19 7,19 4,9"/><polygon points="12,8 16,10.5 14.5,16 9.5,16 8,10.5"/>',
  treemap: '<rect x="3" y="3" width="10" height="11"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="11" width="7" height="10"/><rect x="3" y="15" width="10" height="6"/>',
  funnel: '<polygon points="3,4 21,4 16,11 8,11"/><polygon points="8,13 16,13 13,20 11,20"/>',
  gauge: '<path d="M4 16 A8 8 0 0 1 20 16"/><line x1="12" y1="16" x2="16" y2="10"/>',
  bar3d: '<path d="M6 18 L6 11 L10 8 L10 15Z"/><path d="M11 18 L11 7 L15 4 L15 15Z"/><path d="M6 18 L11 18 L15 15 L10 15Z"/>',
  scatter3d: '<path d="M4 16 L12 20 L20 16"/><path d="M12 20 L12 5"/><circle cx="9" cy="11" r="1.4"/><circle cx="15" cy="9" r="1.4"/><circle cx="12" cy="14" r="1.4"/>',
  surface: '<path d="M3 15 L9 9 L15 13 L21 6"/><path d="M3 19 L9 13 L15 17 L21 10"/><path d="M3 15 L3 19 M9 9 L9 13 M15 13 L15 17 M21 6 L21 10"/>',
  candlestick: '<line x1="7" y1="3" x2="7" y2="20"/><rect x="5" y="7" width="4" height="8" fill="currentColor" opacity=".18"/><line x1="16" y1="4" x2="16" y2="21"/><rect x="14" y="9" width="4" height="7"/>'
}, q = (a, e) => a.fields.filter((t) => t.type === e).map((t) => t.name), Ne = (a, e) => new Set(a.rows.map((t) => t[e])).size;
function he(a) {
  const e = (t) => a.fields.find((s) => t.test(s.name.trim().toLowerCase()))?.name;
  return {
    t: e(/^(time|date|ts|timestamp|datetime)$/) || q(a, "date")[0],
    o: e(/^open$/),
    h: e(/^high$/),
    l: e(/^low$/),
    c: e(/^close$/),
    v: e(/^vol(ume)?$/)
  };
}
const He = (a) => {
  const e = he(a);
  return !!(e.o && e.h && e.l && e.c);
};
function we(a) {
  const e = q(a, "number"), t = q(a, "category"), s = q(a, "date"), n = e.length, c = t.length, r = s.length, d = {}, i = (m, p) => {
    d[m] = Math.max(d[m] || 0, p);
  };
  if (He(a) && (i("candlestick", 12), i("line", 7.5)), n === 1 && c === 0 && (i("histogram", 10), i("box", 7)), c === 1 && n === 1) {
    const m = Ne(a, t[0]);
    i("bar", 9), i("hbar", m > 7 ? 9.5 : 6), m <= 8 && (i("pie", 8), i("donut", 7.5)), i("treemap", 6), i("funnel", 5);
  }
  return r >= 1 && n >= 1 && (i("line", 10), i("area", 8.5)), c === 1 && n >= 2 && (i("bar", 9), i("groupbar", 9.5), i("radar", 7), i("line", 6)), c >= 2 && n >= 1 && (i("heatmap", 9), i("bar3d", 8), i("groupbar", 7)), n === 2 && c <= 1 && i("scatter", 9), n >= 3 && (i("bubble", 8.5), i("scatter3d", 8), i("surface", 6.5)), Object.keys(d).length || (n >= 1 ? (i("bar", 7), i("line", 6)) : i("bar", 5)), Object.entries(d).sort((m, p) => p[1] - m[1]);
}
function ue(a) {
  switch (a) {
    case "candlestick":
      return [{ role: "x", label: "Time", types: ["date", "category"] }];
    case "histogram":
    case "box":
      return [{ role: "ys", label: "Values", types: ["number"], multi: a === "box" }];
    case "gauge":
      return [{ role: "ys", label: "Value", types: ["number"] }];
    case "pie":
    case "donut":
    case "treemap":
    case "funnel":
      return [
        { role: "x", label: "Slices", types: ["category", "date", "bool"] },
        { role: "ys", label: "Size", types: ["number"] }
      ];
    case "scatter":
      return [
        { role: "x", label: "X", types: ["number", "date"] },
        { role: "ys", label: "Y", types: ["number"] },
        { role: "group", label: "Color by", types: ["category", "bool"], optional: !0 }
      ];
    case "bubble":
      return [
        { role: "x", label: "X", types: ["number", "date"] },
        { role: "ys", label: "Y", types: ["number"] },
        { role: "size", label: "Size", types: ["number"] },
        { role: "group", label: "Color by", types: ["category", "bool"], optional: !0 }
      ];
    case "heatmap":
      return [
        { role: "x", label: "X", types: ["category", "date", "bool", "number"] },
        { role: "group", label: "Y", types: ["category", "bool", "number"] },
        { role: "ys", label: "Value", types: ["number"] }
      ];
    case "bar3d":
    case "surface":
      return [
        { role: "x", label: "X", types: ["category", "date", "number"] },
        { role: "group", label: "Y", types: ["category", "bool", "number"] },
        { role: "ys", label: "Height", types: ["number"] }
      ];
    case "scatter3d":
      return [
        { role: "x", label: "X", types: ["number"] },
        { role: "group", label: "Y", types: ["number"] },
        { role: "ys", label: "Z", types: ["number"] },
        { role: "size", label: "Size", types: ["number"], optional: !0 }
      ];
    default:
      return [
        { role: "x", label: "X", types: ["category", "date", "bool"] },
        { role: "ys", label: "Series", types: ["number"], multi: !0 }
      ];
  }
}
function ze(a) {
  for (const e of q(a, "category")) {
    const t = Ne(a, e);
    if (t >= 2 && t <= 12) return e;
  }
}
function ee(a, e) {
  const t = q(a, "number"), s = q(a, "category"), n = q(a, "date"), c = (i, m = []) => a.fields.find((p) => i.types.includes(p.type) && !m.includes(p.name))?.name, r = { ys: [] };
  if (e === "candlestick")
    return r.x = he(a).t, r;
  const d = ue(e);
  for (const i of d)
    if (i.role === "ys") {
      const m = i.multi ? Math.min(t.length, 4) : 1;
      r.ys = t.filter((p) => p !== r.x && p !== r.group && p !== r.size).slice(0, m);
    } else i.role === "x" ? r.x = e === "line" || e === "area" ? n[0] || s[0] || c(i) : e === "scatter" || e === "bubble" || e === "scatter3d" ? t[0] : s[0] || n[0] || c(i) : i.role === "group" ? e === "heatmap" || e === "bar3d" || e === "surface" ? r.group = s.find((m) => m !== r.x) || c(i, [r.x || ""]) : e === "scatter3d" ? r.group = t[1] : (!i.optional || ze(a)) && (r.group = ze(a)) : i.role === "size" && (r.size = t.find((m) => m !== r.x && m !== r.group && !r.ys.includes(m)));
  return (e === "scatter" || e === "bubble") && (r.ys = [t.find((i) => i !== r.x) || t[0]].filter(Boolean)), e === "scatter3d" && (r.ys = [t.find((i) => i !== r.x && i !== r.group) || t[0]].filter(Boolean)), r;
}
const se = (a, e) => a.rows.map((t) => C(t[e])).filter((t) => !isNaN(t));
function te(a, e, t = 48) {
  const s = a.fields.find((p) => p.name === e), n = [...new Set(a.rows.map((p) => String(p[e] ?? "")))];
  if (s?.type !== "number" || n.length <= t) {
    const p = new Map(n.map((u, b) => [u, b]));
    return { labels: n, index: (u) => p.get(String(u ?? "")) ?? -1 };
  }
  const c = a.rows.map((p) => C(p[e])).filter((p) => !isNaN(p)), r = Math.min(...c), i = (Math.max(...c) - r) / t || 1;
  return { labels: Array.from({ length: t }, (p, u) => (r + (u + 0.5) * i).toPrecision(3)), index: (p) => {
    const u = C(p);
    return isNaN(u) ? -1 : Math.min(t - 1, Math.floor((u - r) / i));
  } };
}
function Me(a, e) {
  return ue(a).filter((t) => !t.optional).filter((t) => t.role === "ys" ? e.ys.length === 0 : !e[t.role]).map((t) => t.label);
}
function Ie(a, e) {
  return Me(e, ee(a, e)).length === 0;
}
function Be(a) {
  if (!a.length) return { bins: [], counts: [] };
  const e = Math.min(...a), t = Math.max(...a), s = Math.max(5, Math.min(40, Math.ceil(Math.sqrt(a.length)))), n = (t - e) / s || 1, c = new Array(s).fill(0);
  for (const i of a) c[Math.min(s - 1, Math.floor((i - e) / n))]++;
  const r = n >= 10 ? 0 : n >= 1 ? 1 : 2;
  return { bins: c.map((i, m) => `${(e + m * n).toFixed(r)}`), counts: c };
}
function We(a) {
  const e = [...a].sort((s, n) => s - n), t = (s) => {
    const n = (e.length - 1) * s, c = Math.floor(n);
    return e[c] + (e[Math.min(c + 1, e.length - 1)] - e[c]) * (n - c);
  };
  return [e[0], t(0.25), t(0.5), t(0.75), e[e.length - 1]];
}
const ae = [
  {
    name: "Terminal",
    light: ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300", "#4a3aa7", "#e34948"],
    dark: ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181", "#008300", "#9085e9", "#e66767"]
  },
  {
    name: "Muted",
    // The economic calendar's validated trio, extended with steps from the
    // same families.
    light: ["#3d6fce", "#b06e1d", "#7d5cc6", "#0d8a7d", "#c04a72", "#5c7a1e", "#8a5a44", "#456579"],
    dark: ["#5b8def", "#c58435", "#9575dd", "#21b3a4", "#e0608a", "#7fa032", "#b07a5e", "#6f93ab"]
  }
], Xe = ["#86b6ef", "#5598e7", "#3987e5", "#2a78d6", "#256abf", "#1c5cab", "#104281"], Ye = ["#184f95", "#1c5cab", "#256abf", "#3987e5", "#5598e7", "#86b6ef", "#b7d3f6"], ce = 8, Ve = (a) => ({
  color: a.ink,
  fontFamily: "-apple-system, SF Pro Display, Inter, system-ui, sans-serif"
});
function E(a, e) {
  const t = {
    backgroundColor: "transparent",
    textStyle: Ve(a),
    color: a.palette,
    tooltip: {
      confine: !0,
      backgroundColor: a.panel,
      borderColor: a.edge,
      textStyle: { color: a.ink, fontSize: 12 }
    },
    animationDuration: 200
  };
  return e && (t.grid = { left: 56, right: 20, top: 40, bottom: 44, containLabel: !1 }, t.xAxis = {
    type: "category",
    axisLine: { lineStyle: { color: a.edge } },
    axisTick: { show: !1 },
    axisLabel: { color: a.dim, fontFamily: "SF Mono, monospace", hideOverlap: !0 },
    splitLine: { show: !1 }
  }, t.yAxis = {
    type: "value",
    axisLine: { show: !1 },
    axisTick: { show: !1 },
    axisLabel: { color: a.dim, fontFamily: "SF Mono, monospace" },
    splitLine: { lineStyle: { color: a.edge, opacity: 0.5, type: "dashed" } }
  }), t;
}
function Y(a, e, t) {
  t >= 2 && (a.legend = { top: 6, textStyle: { color: e.dim, fontSize: 11 }, icon: "roundRect", itemWidth: 10, itemHeight: 10 });
}
function Ge(a, e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of a.rows) {
    const d = String(r[e] ?? "");
    t.has(d) || t.set(d, []), t.get(d).push(r);
  }
  const s = [...t.entries()];
  if (s.length <= ce) return s;
  const n = s.slice(0, ce - 1), c = s.slice(ce - 1).flatMap(([, r]) => r);
  return [...n, ["Other", c]];
}
function Z(a, e, t) {
  const s = /* @__PURE__ */ new Map();
  for (const n of a.rows) {
    const c = String(n[e] ?? "");
    s.set(c, (s.get(c) || 0) + (C(n[t]) || 0));
  }
  return [[...s.keys()], [...s.values()]];
}
const Ue = (a, e) => a.fields.find((t) => t.name === e)?.type !== "date";
function ke(a, e, t, s) {
  switch (a) {
    case "bar":
    case "hbar":
    case "groupbar":
      return Ze(a, e, t, s);
    case "line":
    case "area":
      return Qe(a, e, t, s);
    case "candlestick":
      return Ke(e, s);
    case "scatter":
    case "bubble":
      return Je(a, e, t, s);
    case "pie":
    case "donut":
      return et(a, e, t, s);
    case "histogram":
      return tt(e, t, s);
    case "box":
      return at(e, t, s);
    case "heatmap":
      return st(e, t, s);
    case "radar":
      return nt(e, t, s);
    case "treemap":
      return rt(e, t, s);
    case "funnel":
      return ot(e, t, s);
    case "gauge":
      return it(e, t, s);
    default:
      return E(s, !1);
  }
}
function Ze(a, e, t, s) {
  const n = E(s, !0), c = t.x, r = t.ys.length ? t.ys : [e.fields.find((u) => u.type === "number")?.name || ""], d = Ue(e, c);
  let i;
  const m = {};
  if (d) {
    i = Z(e, c, r[0])[0];
    for (const u of r) {
      const b = new Map(lt(...Z(e, c, u)));
      m[u] = i.map((v) => b.get(v) || 0);
    }
  } else {
    i = e.rows.map((u) => String(u[c] ?? ""));
    for (const u of r) m[u] = e.rows.map((b) => C(b[u]) || 0);
  }
  const p = a === "hbar";
  if (p) {
    const u = n.xAxis, b = n.yAxis;
    n.xAxis = { ...b, type: "value" }, n.yAxis = { ...u, type: "category", data: i }, n.grid.left = 110;
  } else
    n.xAxis.data = i;
  return n.series = r.map((u) => ({
    name: u,
    type: "bar",
    data: m[u],
    barMaxWidth: 28,
    barGap: "25%",
    // Rounded data-end anchored at the baseline; the base corners stay square.
    itemStyle: { borderRadius: p ? [0, 4, 4, 0] : [4, 4, 0, 0] }
  })), Y(n, s, r.length), n.tooltip.trigger = "axis", n;
}
function Qe(a, e, t, s) {
  const n = E(s, !0), c = t.x, r = t.ys;
  return n.xAxis.data = e.rows.map((d) => String(d[c] ?? "")), n.series = r.map((d) => ({
    name: d,
    type: "line",
    data: e.rows.map((i) => C(i[d])),
    showSymbol: !1,
    lineStyle: { width: 2 },
    ...a === "area" ? { areaStyle: { opacity: 0.14 } } : {}
  })), Y(n, s, r.length), n.tooltip.trigger = "axis", n.tooltip.axisPointer = { type: "cross", lineStyle: { color: s.dim, opacity: 0.5 } }, n;
}
function Ke(a, e) {
  const t = E(e, !0), s = he(a);
  return t.xAxis.data = a.rows.map((n) => String(n[s.t] ?? "")), t.series = [{
    name: "OHLC",
    type: "candlestick",
    // echarts candle order is [open, close, low, high].
    data: a.rows.map((n) => [C(n[s.o]), C(n[s.c]), C(n[s.l]), C(n[s.h])]),
    itemStyle: { color: e.up, color0: e.down, borderColor: e.up, borderColor0: e.down }
  }], t.yAxis.scale = !0, t.tooltip.trigger = "axis", t.dataZoom = [{ type: "inside" }], t;
}
function Je(a, e, t, s) {
  const n = E(s, !0), c = t.x, r = t.ys[0], d = t.size;
  n.xAxis.type = "value", n.xAxis.scale = !0, n.yAxis.scale = !0;
  const i = d ? se(e, d) : [], m = Math.min(...i), p = Math.max(...i), u = (l) => 8 + 24 * ((l - m) / (p - m || 1)), b = (l) => l.map((x) => d ? [C(x[c]), C(x[r]), C(x[d])] : [C(x[c]), C(x[r])]).filter((x) => !isNaN(x[0]) && !isNaN(x[1])), v = t.group ? Ge(e, t.group) : null, S = (l, x) => ({
    name: l,
    type: "scatter",
    data: b(x),
    symbolSize: d ? (z) => u(z[2]) : 9,
    // 2px surface ring so overlapping marks stay separable.
    itemStyle: { opacity: 0.85, borderColor: s.panel, borderWidth: 2 }
  });
  return n.series = v ? v.map(([l, x]) => S(l, x)) : [S(r, e.rows)], Y(n, s, v?.length || 1), n.tooltip.formatter = (l) => `${l.seriesName}<br/>${c}: ${l.value[0]}&nbsp;&nbsp;${r}: ${l.value[1]}` + (d ? `&nbsp;&nbsp;${d}: ${l.value[2]}` : ""), n;
}
function me(a, e) {
  const [t, s] = Z(a, e.x, e.ys[0]), n = t.map((r, d) => ({ name: r, value: s[d] })).sort((r, d) => d.value - r.value);
  return n.length <= 12 ? n : [...n.slice(0, 11), { name: "Other", value: n.slice(11).reduce((r, d) => r + d.value, 0) }];
}
function et(a, e, t, s) {
  const n = E(s, !1), c = me(e, t);
  return n.series = [{
    type: "pie",
    radius: a === "donut" ? ["42%", "68%"] : "68%",
    data: c,
    // The surface gap between fills, done the pie way.
    itemStyle: { borderColor: s.panel, borderWidth: 2 },
    label: { color: s.ink, fontSize: 11 },
    labelLine: { lineStyle: { color: s.edge } }
  }], Y(n, s, Math.min(c.length, 8)), n;
}
function tt(a, e, t) {
  const s = E(t, !0), { bins: n, counts: c } = Be(se(a, e.ys[0]));
  return s.xAxis.data = n, s.series = [{
    name: e.ys[0],
    type: "bar",
    data: c,
    barCategoryGap: "8%",
    // near-touching bars read as a distribution
    itemStyle: { borderRadius: [4, 4, 0, 0] }
  }], s.tooltip.trigger = "axis", s;
}
function at(a, e, t) {
  const s = E(t, !0), n = e.ys.length ? e.ys : [];
  return s.xAxis.data = n, s.series = [{
    type: "boxplot",
    data: n.map((c) => We(se(a, c))),
    itemStyle: { color: "transparent", borderColor: t.palette[0], borderWidth: 2 }
  }], s.tooltip.formatter = (c) => {
    const [r, d, i, m, p] = c.value.slice(1);
    return `${c.name}<br/>max ${p}<br/>q3 ${m}<br/>median ${i}<br/>q1 ${d}<br/>min ${r}`;
  }, s;
}
function st(a, e, t) {
  const s = E(t, !0), n = te(a, e.x), c = te(a, e.group), r = n.labels, d = c.labels, i = /* @__PURE__ */ new Map();
  for (const u of a.rows) {
    const b = n.index(u[e.x]), v = c.index(u[e.group]), S = C(u[e.ys[0]]);
    if (b < 0 || v < 0 || isNaN(S)) continue;
    const l = b + ":" + v, x = i.get(l) || { s: 0, n: 0 };
    x.s += S, x.n++, i.set(l, x);
  }
  const m = [];
  r.forEach((u, b) => d.forEach((v, S) => {
    const l = i.get(b + ":" + S);
    l && m.push([b, S, l.s / l.n]);
  }));
  const p = m.map((u) => u[2]);
  return s.xAxis.data = r, s.yAxis = { ...s.yAxis, type: "category", data: d, splitLine: { show: !1 } }, s.visualMap = {
    min: Math.min(...p),
    max: Math.max(...p),
    calculable: !0,
    orient: "horizontal",
    left: "center",
    bottom: 0,
    inRange: { color: t.seq },
    textStyle: { color: t.dim }
  }, s.series = [{
    type: "heatmap",
    data: m,
    // The 2px surface gap between fills, cell edition.
    itemStyle: { borderColor: t.panel, borderWidth: 2 },
    label: { show: m.length <= 80, color: t.ink, fontSize: 10, formatter: (u) => pe(u.value[2]) }
  }], s.grid.bottom = 70, s.tooltip.formatter = (u) => `${r[u.value[0]]} / ${d[u.value[1]]}<br/>${e.ys[0]}: ${pe(u.value[2])}`, s;
}
function nt(a, e, t) {
  const s = E(t, !1), [n] = Z(a, e.x, e.ys[0]), c = n.map((r) => ({ name: r }));
  return s.radar = {
    indicator: c.length >= 3 ? c : [...c, ...Array(3 - c.length).fill({ name: "" })],
    axisName: { color: t.dim, fontSize: 11 },
    splitLine: { lineStyle: { color: t.edge, opacity: 0.6 } },
    splitArea: { show: !1 },
    axisLine: { lineStyle: { color: t.edge } }
  }, s.series = [{
    type: "radar",
    data: e.ys.map((r) => ({ name: r, value: Z(a, e.x, r)[1] })),
    lineStyle: { width: 2 },
    symbolSize: 5,
    areaStyle: { opacity: 0.1 }
  }], Y(s, t, e.ys.length), s;
}
function rt(a, e, t) {
  const s = E(t, !1);
  return s.series = [{
    type: "treemap",
    data: me(a, e),
    roam: !1,
    nodeClick: !1,
    breadcrumb: { show: !1 },
    itemStyle: { borderColor: t.panel, borderWidth: 2, gapWidth: 2 },
    label: { color: "#fff", fontSize: 11 }
  }], s;
}
function ot(a, e, t) {
  const s = E(t, !1), n = me(a, e);
  return s.series = [{
    type: "funnel",
    data: n,
    gap: 2,
    top: 30,
    itemStyle: { borderColor: t.panel, borderWidth: 2 },
    label: { color: t.ink, fontSize: 11 }
  }], Y(s, t, Math.min(n.length, 8)), s;
}
function it(a, e, t) {
  const s = E(t, !1), n = se(a, e.ys[0]), c = n[n.length - 1] ?? 0, r = Math.max(...n, 0);
  return s.series = [{
    type: "gauge",
    min: Math.min(...n, 0),
    max: r || 1,
    progress: { show: !0, width: 12 },
    axisLine: { lineStyle: { width: 12, color: [[1, t.edge]] } },
    pointer: { show: !1 },
    axisTick: { show: !1 },
    splitLine: { show: !1 },
    axisLabel: { color: t.dim, fontSize: 10, distance: 18 },
    // The number IS the chart here; ink token, not series color.
    detail: { color: t.ink, fontSize: 26, fontFamily: "SF Mono, monospace", formatter: (d) => pe(d) },
    title: { color: t.dim, fontSize: 12 },
    data: [{ value: c, name: e.ys[0] }]
  }], s;
}
function lt(a, e) {
  return a.map((t, s) => [t, e[s]]);
}
function pe(a) {
  if (a == null || isNaN(a)) return "";
  const e = Math.abs(a);
  return e >= 1e9 ? (a / 1e9).toFixed(1) + "B" : e >= 1e6 ? (a / 1e6).toFixed(1) + "M" : e >= 1e4 ? (a / 1e3).toFixed(1) + "K" : e >= 100 || Number.isInteger(a) ? String(Math.round(a)) : a.toFixed(2);
}
const de = { yaw: -0.62, pitch: 0.46, zoom: 1 };
class ct {
  canvas;
  ctx;
  chrome;
  spec = null;
  cam = { ...de };
  raf = 0;
  dragging = !1;
  lastPt = { x: 0, y: 0 };
  detach = [];
  onHover = () => {
  };
  constructor(e, t) {
    this.canvas = e, this.chrome = t, this.ctx = e.getContext("2d");
    const s = e, n = (p) => {
      this.dragging = !0, this.lastPt = { x: p.clientX, y: p.clientY }, s.setPointerCapture(p.pointerId);
    }, c = (p) => {
      this.dragging ? (this.cam.yaw += (p.clientX - this.lastPt.x) * 8e-3, this.cam.pitch = Math.min(1.35, Math.max(0.08, this.cam.pitch + (p.clientY - this.lastPt.y) * 8e-3)), this.lastPt = { x: p.clientX, y: p.clientY }, this.onHover(null), this.requestRender()) : this.pick(p);
    }, r = () => {
      this.dragging = !1;
    }, d = (p) => {
      p.preventDefault(), this.cam.zoom = Math.min(3, Math.max(0.4, this.cam.zoom * (p.deltaY > 0 ? 0.92 : 1.08))), this.requestRender();
    }, i = () => {
      this.cam = { ...de }, this.requestRender();
    }, m = () => this.onHover(null);
    s.addEventListener("pointerdown", n), s.addEventListener("pointermove", c), s.addEventListener("pointerup", r), s.addEventListener("wheel", d, { passive: !1 }), s.addEventListener("dblclick", i), s.addEventListener("pointerleave", m), this.detach = [
      () => s.removeEventListener("pointerdown", n),
      () => s.removeEventListener("pointermove", c),
      () => s.removeEventListener("pointerup", r),
      () => s.removeEventListener("wheel", d),
      () => s.removeEventListener("dblclick", i),
      () => s.removeEventListener("pointerleave", m)
    ];
  }
  setChrome(e) {
    this.chrome = e, this.requestRender();
  }
  setData(e) {
    this.spec = e, this.cam = { ...de }, this.requestRender();
  }
  destroy() {
    cancelAnimationFrame(this.raf), this.detach.forEach((e) => e());
  }
  resize() {
    const e = window.devicePixelRatio || 1, t = this.canvas.getBoundingClientRect();
    !t.width || !t.height || (this.canvas.width = Math.round(t.width * e), this.canvas.height = Math.round(t.height * e), this.requestRender());
  }
  requestRender() {
    cancelAnimationFrame(this.raf), this.raf = requestAnimationFrame(() => this.render());
  }
  // ── projection ────────────────────────────────────────────────────────────
  project(e) {
    const { yaw: t, pitch: s, zoom: n } = this.cam, c = Math.cos(t), r = Math.sin(t), d = Math.cos(s), i = Math.sin(s), m = e[0] * c - e[1] * r, p = e[0] * r + e[1] * c, u = p * d - e[2] * i, b = p * i + e[2] * d, v = this.canvas.width, S = this.canvas.height, l = Math.min(v, S) * 0.3 * n;
    return [v / 2 + m * l, S / 2 + S * 0.04 - b * l, u];
  }
  // ── rendering ─────────────────────────────────────────────────────────────
  render() {
    const { ctx: e, canvas: t, spec: s } = this;
    e.clearRect(0, 0, t.width, t.height), s && (this.drawFrame(), s.kind === "scatter" ? this.drawScatter(s) : this.drawCells(s), this.drawAxisNames());
  }
  // The bounding box + tick labels. Only the three back faces' edges draw, so
  // the frame never overplots the data; which faces are "back" follows the
  // camera each frame.
  drawFrame() {
    const { ctx: e } = this, t = window.devicePixelRatio || 1, s = 1.04, n = [];
    for (const d of [-s, s]) for (const i of [-s, s]) for (const m of [-s, s]) n.push([d, i, m]);
    const c = [
      [0, 1],
      [0, 2],
      [0, 4],
      [3, 1],
      [3, 2],
      [3, 7],
      [5, 1],
      [5, 4],
      [5, 7],
      [6, 2],
      [6, 4],
      [6, 7]
    ], r = n.map((d) => this.project(d));
    e.strokeStyle = this.chrome.edge, e.lineWidth = 1 * t, e.setLineDash([]);
    for (const [d, i] of c)
      r[d][2] + r[i][2] > 0 && (e.beginPath(), e.moveTo(r[d][0], r[d][1]), e.lineTo(r[i][0], r[i][1]), e.stroke());
  }
  drawAxisNames() {
    const { ctx: e, spec: t } = this;
    if (!t) return;
    const s = window.devicePixelRatio || 1;
    e.fillStyle = this.chrome.dim, e.font = `${11 * s}px SF Mono, monospace`, e.textAlign = "center";
    const n = (c, r) => {
      const [d, i] = this.project(c);
      e.fillText(r, d, i);
    };
    n([0, -1.35, -1.1], t.xName), n([-1.35, 0, -1.1], t.yName), n([-1.2, -1.2, 1.15], t.zName);
  }
  drawScatter(e) {
    const { ctx: t } = this, s = window.devicePixelRatio || 1, n = e.points.map((r) => ({ p: r, pr: this.project([r.x, r.y, r.z]) })).sort((r, d) => d.pr[2] - r.pr[2]), c = this.chrome.seq;
    for (const { p: r, pr: d } of n) {
      const i = Math.min(c.length - 1, Math.max(0, Math.floor((r.z + 1) / 2 * c.length))), m = (r.size ?? 4.5) * s;
      t.beginPath(), t.arc(d[0], d[1], m, 0, Math.PI * 2), t.fillStyle = c[i], t.globalAlpha = 0.9, t.fill(), t.globalAlpha = 1, t.lineWidth = 2 * s, t.strokeStyle = this.chrome.panel, t.stroke();
    }
  }
  // Bars and surface share cell geometry: a [yLabels x xLabels] grid of
  // heights. Bars extrude cuboids; surface stitches neighbouring cells into
  // quads.
  drawCells(e) {
    const t = e.xLabels.length, s = e.yLabels.length, n = e.z.flat().filter((l) => l !== null && !isNaN(l));
    if (!n.length) return;
    const c = Math.min(...n, 0), r = Math.max(...n), d = (l) => -1 + 2 * ((l - c) / (r - c || 1)), i = (l) => -1 + 2 * (t === 1 ? 0.5 : l / (t - 1)), m = (l) => -1 + 2 * (s === 1 ? 0.5 : l / (s - 1)), p = this.chrome.seq, u = (l) => p[Math.min(p.length - 1, Math.max(0, Math.floor((l - c) / (r - c || 1) * p.length)))], b = [];
    if (e.kind === "bars") {
      const l = Math.min(0.8 / t, 0.8 / s);
      for (let x = 0; x < s; x++) for (let z = 0; z < t; z++) {
        const A = e.z[x][z];
        if (A === null || isNaN(A)) continue;
        const y = i(z), k = m(x), j = d(A), L = d(Math.max(c, 0)), P = u(A), M = (N, _) => {
          const H = N.map((D) => this.project(D));
          b.push({ pts: N, fill: _, depth: H.reduce((D, Q) => D + Q[2], 0) / H.length });
        };
        M([[y - l, k - l, j], [y + l, k - l, j], [y + l, k + l, j], [y - l, k + l, j]], P);
        const T = Se(P, 0.78), R = Se(P, 0.62);
        M([[y - l, k - l, L], [y + l, k - l, L], [y + l, k - l, j], [y - l, k - l, j]], T), M([[y - l, k + l, L], [y + l, k + l, L], [y + l, k + l, j], [y - l, k + l, j]], T), M([[y - l, k - l, L], [y - l, k + l, L], [y - l, k + l, j], [y - l, k - l, j]], R), M([[y + l, k - l, L], [y + l, k + l, L], [y + l, k + l, j], [y + l, k - l, j]], R);
      }
    } else
      for (let l = 0; l < s - 1; l++) for (let x = 0; x < t - 1; x++) {
        const z = e.z[l][x], A = e.z[l][x + 1], y = e.z[l + 1][x], k = e.z[l + 1][x + 1];
        if ([z, A, y, k].some((M) => M === null || isNaN(M))) continue;
        const j = [
          [i(x), m(l), d(z)],
          [i(x + 1), m(l), d(A)],
          [i(x + 1), m(l + 1), d(k)],
          [i(x), m(l + 1), d(y)]
        ], L = (z + A + y + k) / 4, P = j.map((M) => this.project(M));
        b.push({
          pts: j,
          fill: u(L),
          stroke: this.chrome.panel,
          depth: P.reduce((M, T) => M + T[2], 0) / P.length
        });
      }
    b.sort((l, x) => x.depth - l.depth);
    const { ctx: v } = this, S = window.devicePixelRatio || 1;
    for (const l of b) {
      v.beginPath();
      const x = l.pts.map((z) => this.project(z));
      v.moveTo(x[0][0], x[0][1]);
      for (let z = 1; z < x.length; z++) v.lineTo(x[z][0], x[z][1]);
      v.closePath(), v.fillStyle = l.fill, v.fill(), l.stroke && (v.lineWidth = 1 * S, v.strokeStyle = l.stroke, v.stroke());
    }
  }
  // ── hover picking (scatter + bars: nearest projected mark within reach) ──
  pick(e) {
    const t = this.spec;
    if (!t || t.kind === "surface") {
      this.onHover(null);
      return;
    }
    const s = this.canvas.getBoundingClientRect(), n = window.devicePixelRatio || 1, c = (e.clientX - s.left) * n, r = (e.clientY - s.top) * n, d = 14 * n;
    let i = null;
    const m = (p, u) => {
      const [b, v] = this.project(p), S = Math.hypot(b - c, v - r);
      S < d && (!i || S < i.d) && (i = { d: S, sx: b / n, sy: v / n, text: u });
    };
    if (t.kind === "scatter")
      for (const p of t.points)
        m([p.x, p.y, p.z], p.row ? `${t.xName}: ${p.row.x}  ${t.yName}: ${p.row.y}  ${t.zName}: ${p.row.z}` : `${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)}`);
    else {
      const p = t.xLabels.length, u = t.yLabels.length, b = t.z.flat().filter((l) => l !== null && !isNaN(l));
      if (!b.length) return;
      const v = Math.min(...b, 0), S = Math.max(...b);
      for (let l = 0; l < u; l++) for (let x = 0; x < p; x++) {
        const z = t.z[l][x];
        z === null || isNaN(z) || m([
          -1 + 2 * (p === 1 ? 0.5 : x / (p - 1)),
          -1 + 2 * (u === 1 ? 0.5 : l / (u - 1)),
          -1 + 2 * ((z - v) / (S - v || 1))
        ], `${t.xLabels[x]} / ${t.yLabels[l]}: ${Number(z.toFixed(3))}`);
      }
    }
    this.onHover(i);
  }
}
function Se(a, e) {
  const t = parseInt(a.slice(1), 16), s = (n) => Math.round(n * e);
  return `rgb(${s(t >> 16 & 255)},${s(t >> 8 & 255)},${s(t & 255)})`;
}
function dt(a, e, t) {
  if (t === "scatter") {
    const [p, u, b] = [e.x, e.group, e.ys[0]];
    if (!p || !u || !b) return null;
    const v = (R) => a.rows.map((N) => C(N[R])), S = v(p), l = v(u), x = v(b), z = (R) => {
      const N = R.filter((D) => !isNaN(D)), _ = Math.min(...N), H = Math.max(...N);
      return (D) => -1 + 2 * ((D - _) / (H - _ || 1));
    }, A = z(S), y = z(l), k = z(x), j = e.size ? a.rows.map((R) => C(R[e.size])) : null, L = j?.filter((R) => !isNaN(R)) || [], P = Math.min(...L), M = Math.max(...L), T = a.rows.flatMap((R, N) => [S[N], l[N], x[N]].some(isNaN) ? [] : [{
      x: A(S[N]),
      y: y(l[N]),
      z: k(x[N]),
      size: j && !isNaN(j[N]) ? 3 + 6 * ((j[N] - P) / (M - P || 1)) : void 0,
      row: { x: S[N], y: l[N], z: x[N] }
    }]);
    return T.length ? { kind: "scatter", points: T, xName: p, yName: u, zName: b } : null;
  }
  const [s, n, c] = [e.x, e.group, e.ys[0]];
  if (!s || !n || !c) return null;
  const r = te(a, s), d = te(a, n), i = d.labels.map(() => r.labels.map(() => ({ s: 0, n: 0 })));
  for (const p of a.rows) {
    const u = r.index(p[s]), b = d.index(p[n]), v = C(p[c]);
    u < 0 || b < 0 || isNaN(v) || (i[b][u].s += v, i[b][u].n++);
  }
  const m = i.map((p) => p.map((u) => u.n ? u.s / u.n : null));
  return m.flat().some((p) => p !== null) ? { kind: t, xLabels: r.labels, yLabels: d.labels, z: m, xName: s, yName: n, zName: c } : null;
}
const X = (a, e) => typeof document < "u" && getComputedStyle(document.documentElement).getPropertyValue(a).trim() || e, pt = () => document.documentElement.classList.contains("dark");
function U(a) {
  const e = pt(), t = ae[a] || ae[0];
  return {
    ink: X("--text", e ? "#e8e8e8" : "#23262b"),
    dim: X("--dim", e ? "#b0b0b0" : "#43474e"),
    edge: X("--edge", e ? "#2e2e2e" : "#e3e5e9"),
    panel: X("--panel", e ? "#1a1a1a" : "#ffffff"),
    up: X("--up", "#21b3a4"),
    down: X("--down", "#f0426c"),
    palette: e ? t.dark : t.light,
    seq: e ? Ye : Xe
  };
}
const ht = `
#dataviz .dv-root { display:flex; height:100%; min-height:0; background:var(--bg); color:var(--text);
  -webkit-font-smoothing:antialiased; font-family:-apple-system,"SF Pro Display","SF Pro Text",Inter,system-ui,sans-serif; }
#dataviz .dv-side { width:288px; min-width:288px; display:flex; flex-direction:column; gap:10px;
  padding:12px 10px 12px 12px; overflow-y:auto; border-right:1px solid var(--edge); }
#dataviz .dv-card { background:var(--panel); border:1px solid var(--edge); border-radius:12px;
  box-shadow:0 1px 2px rgba(0,0,0,.14); }
#dataviz .dv-h { padding:10px 12px 6px; font-size:10.5px; letter-spacing:.09em; color:var(--dim);
  text-transform:uppercase; font-weight:600; }
#dataviz .dv-btn { display:inline-flex; align-items:center; justify-content:center; gap:6px;
  background:var(--bg2); color:var(--text); border:1px solid var(--edge); border-radius:9px;
  padding:6px 12px; font-size:12px; cursor:pointer; transition:background .12s ease,border-color .12s ease,opacity .12s ease;
  font-family:inherit; }
#dataviz .dv-btn:hover:not(:disabled) { background:var(--active); border-color:var(--dim); }
#dataviz .dv-btn:disabled { opacity:.35; cursor:default; }
#dataviz .dv-btn.dv-primary { background:var(--accent-bar); border-color:var(--accent-bar); color:var(--bg); font-weight:600; }
#dataviz .dv-btn.dv-primary:hover:not(:disabled) { opacity:.88; background:var(--accent-bar); }
#dataviz .dv-select { background:var(--bg2); color:var(--text); border:1px solid var(--edge);
  border-radius:8px; padding:5px 8px; font-size:12px; max-width:150px; font-family:inherit; }
#dataviz .dv-select:hover { border-color:var(--dim); }
#dataviz .dv-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:4px; padding:6px 8px 10px; }
#dataviz .dv-tile { display:flex; flex-direction:column; align-items:center; gap:3px; padding:8px 2px 6px;
  border-radius:10px; border:1px solid transparent; background:transparent; color:var(--dim); cursor:pointer;
  transition:background .12s ease,color .12s ease,border-color .12s ease; font-family:inherit; }
#dataviz .dv-tile:hover { background:var(--active); color:var(--text); }
#dataviz .dv-tile.dv-on { background:var(--active); border-color:var(--accent-bar); color:var(--text); }
#dataviz .dv-tile svg { width:21px; height:21px; }
#dataviz .dv-tile .dv-lbl { font-size:9px; line-height:1.1; text-align:center; letter-spacing:.01em; }
#dataviz .dv-tile.dv-dis { opacity:.32; pointer-events:none; }
#dataviz .dv-dot { display:inline-block; width:5px; height:5px; border-radius:50%; background:var(--up); margin-left:4px; vertical-align:1px; }
#dataviz .dv-row { padding:6px 9px; border-radius:9px; cursor:pointer; font-size:12px; display:flex;
  justify-content:space-between; gap:8px; align-items:baseline; transition:background .12s ease; }
#dataviz .dv-row:hover { background:var(--active); }
#dataviz .dv-row.dv-on { background:var(--active); }
#dataviz .dv-send { font-size:9px; letter-spacing:.06em; color:var(--dim); background:transparent;
  border:1px solid var(--edge); border-radius:6px; padding:1px 6px; cursor:pointer; flex-shrink:0;
  opacity:0; transition:opacity .12s ease, color .12s ease; }
#dataviz .dv-row:hover .dv-send, #dataviz .dv-row.dv-on .dv-send { opacity:1; }
#dataviz .dv-send:hover { color:var(--text); border-color:var(--dim); }
#dataviz .dv-meta { color:var(--dim); font-size:10px; flex-shrink:0; font-family:"SF Mono",ui-monospace,monospace; }
#dataviz .dv-bar { display:flex; align-items:center; gap:8px; padding:9px 14px; border-bottom:1px solid var(--edge);
  flex-wrap:wrap; min-height:46px; }
#dataviz .dv-role { display:inline-flex; gap:5px; align-items:center; }
#dataviz .dv-role label { font-size:10.5px; color:var(--dim); text-transform:uppercase; letter-spacing:.05em; }
#dataviz .dv-canvas-wrap { flex:1; position:relative; min-height:0; margin:12px; }
#dataviz .dv-canvas-card { position:absolute; inset:0; background:var(--panel); border:1px solid var(--edge);
  border-radius:14px; box-shadow:0 1px 3px rgba(0,0,0,.16); overflow:hidden; }
#dataviz .dv-hero { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; }
#dataviz .dv-hero-card { text-align:center; max-width:430px; padding:36px 44px; border:1.5px dashed var(--edge);
  border-radius:16px; transition:border-color .15s ease,background .15s ease; }
#dataviz .dv-hero-card.dv-drag { border-color:var(--accent-bar); background:var(--active); }
#dataviz .dv-hero-t { font-size:15px; font-weight:600; margin-bottom:6px; }
#dataviz .dv-hero-s { font-size:12px; color:var(--dim); line-height:1.55; margin-bottom:18px; }
#dataviz .dv-err { margin:8px 14px 0; padding:7px 12px; border-radius:9px; background:color-mix(in srgb,var(--down) 12%,transparent);
  color:var(--down); font-size:12px; }
#dataviz .dv-cols { padding:0 12px 10px; font-size:11.5px; }
#dataviz .dv-col { display:flex; justify-content:space-between; gap:8px; padding:2.5px 0; }
#dataviz .dv-type { color:var(--dim); font-size:9.5px; font-family:"SF Mono",ui-monospace,monospace;
  border:1px solid var(--edge); border-radius:5px; padding:0 5px; align-self:center; }
#dataviz .dv-fade { animation:dvfade .18s ease; }
@keyframes dvfade { from { opacity:0; transform:translateY(3px);} to { opacity:1; transform:none;} }
#dataviz textarea.dv-paste { width:100%; background:var(--bg2); color:var(--text); border:1px solid var(--edge);
  border-radius:9px; font-size:11px; font-family:"SF Mono",ui-monospace,monospace; padding:8px; resize:vertical; }
#dataviz .dv-dropveil { position:absolute; inset:0; z-index:30; display:flex; align-items:center; justify-content:center;
  background:color-mix(in srgb,var(--bg) 55%,transparent); backdrop-filter:blur(2px); border-radius:14px;
  border:2px dashed var(--accent-bar); font-size:14px; font-weight:600; pointer-events:none; }
`, ut = ({ d: a, size: e = 21 }) => /* @__PURE__ */ h.jsx(
  "svg",
  {
    viewBox: "0 0 24 24",
    width: e,
    height: e,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    dangerouslySetInnerHTML: { __html: a }
  }
);
function ft() {
  const [a, e] = g.useState(null), [t, s] = g.useState("bar"), [n, c] = g.useState(null), [r, d] = g.useState({ ys: [] }), [i, m] = g.useState(0), [p, u] = g.useState([]), [b, v] = g.useState(""), [S, l] = g.useState(!1), [x, z] = g.useState(!1), [A, y] = g.useState(!1), [k, j] = g.useState(""), [L, P] = g.useState(null), M = g.useRef(null), T = g.useRef(null), R = g.useRef(null), N = g.useRef(null), _ = g.useRef(null), H = g.useRef(null), D = g.useRef(0), Q = g.useMemo(() => a ? we(a) : [], [a]), ne = g.useMemo(() => Q.slice(0, 3).map(([o]) => o), [Q]);
  g.useEffect(() => {
    const o = window;
    return (o.__lseAiIslands ||= {}).dataviz = {
      table: a ? a.source : null,
      rows: a ? a.nrows : null,
      chart_type: t,
      y_columns: r.ys.length,
      library_tables: p.length
    }, () => {
      o.__lseAiIslands && delete o.__lseAiIslands.dataviz;
    };
  }, [a, t, r.ys.length, p.length]);
  const B = g.useCallback((o) => {
    j(""), e(o), z(!1);
    const f = we(o)[0]?.[0] || "bar";
    s(f), d(ee(o, f));
  }, []), xe = g.useCallback(() => {
    fetch("/api/data").then((o) => o.json()).then(u).catch(() => {
    });
  }, []);
  g.useEffect(xe, [xe]);
  const Ce = g.useCallback((o) => {
    v(o), fetch("/api/data/" + encodeURIComponent(o) + "/rows").then(async (f) => {
      if (!f.ok) throw new Error((await f.json()).detail || f.statusText);
      return f.json();
    }).then((f) => B({ ...f, source: o })).catch((f) => j("Could not load " + o + ": " + f.message));
  }, [B]), re = g.useCallback((o) => {
    const f = new FormData();
    f.append("file", o), j("Reading " + o.name + "…"), fetch("/api/dataviz/parse", { method: "POST", body: f }).then(async (w) => {
      if (!w.ok) throw new Error((await w.json()).detail || w.statusText);
      return w.json();
    }).then((w) => {
      v(""), B({ ...w, source: o.name });
    }).catch((w) => j("Could not parse " + o.name + ": " + w.message));
  }, [B]), Le = g.useCallback(() => {
    try {
      const o = Oe(H.current?.value || "");
      v(""), B(o), l(!1);
    } catch (o) {
      j(o.message);
    }
  }, [B]), Re = g.useCallback((o) => {
    o.preventDefault(), o.stopPropagation(), y(!1);
    const f = o.dataTransfer.files?.[0];
    f && re(f);
  }, [re]);
  g.useEffect(() => {
    fetch("/api/workspace/dataviz").then((o) => o.json()).then((o) => {
      typeof o?.value?.palette == "number" && ae[o.value.palette] && m(o.value.palette);
    }).catch(() => {
    });
  }, []);
  const Ae = g.useCallback((o) => {
    fetch("/api/workspace/dataviz", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ palette: o })
    }).catch(() => {
    });
  }, []);
  g.useEffect(() => {
    if (!M.current || !T.current) return;
    const o = ye(M.current);
    R.current = o;
    const f = new ct(T.current, { ...U(0) });
    N.current = f, f.onHover = P;
    const w = new ResizeObserver(() => {
      o.resize(), f.resize();
    });
    return w.observe(M.current.parentElement), f.resize(), () => {
      w.disconnect(), o.dispose(), f.destroy(), R.current = null, N.current = null;
    };
  }, []);
  const O = n ?? t, V = g.useMemo(
    () => n && a ? ee(a, n) : r,
    [n, a, r]
  ), I = g.useMemo(
    () => a ? Me(O, V) : [],
    [a, O, V]
  );
  g.useEffect(() => {
    const o = U(i);
    if (a) {
      if (I.length) {
        R.current?.clear();
        return;
      }
      if (J(O)) {
        const w = dt(a, V, O === "bar3d" ? "bars" : O === "surface" ? "surface" : "scatter");
        N.current?.setChrome(o), w && N.current?.setData(w), R.current?.clear();
      } else {
        try {
          R.current?.setOption(ke(O, a, V, o), { notMerge: !0 });
        } catch (f) {
          j("Chart failed: " + f.message);
        }
        P(null);
      }
    }
  }, [a, O, V, i, I]);
  const fe = g.useCallback((o) => {
    c(null), s(o), a && d(ee(a, o));
  }, [a]), ge = g.useCallback((o) => {
    !a || !Ie(a, o) || (window.clearTimeout(D.current), D.current = window.setTimeout(() => c(o), 110));
  }, [a]), be = g.useCallback(() => {
    window.clearTimeout(D.current), c(null);
  }, []), oe = (o, f) => {
    const w = document.createElement("a");
    w.href = o, w.download = f, w.click();
  }, ie = g.useCallback(() => {
    if (!a) return;
    if (J(t)) {
      oe(T.current.toDataURL("image/png"), "chart.png");
      return;
    }
    const o = U(i);
    oe(R.current.getDataURL({ pixelRatio: 2, backgroundColor: o.panel }), "chart.png");
  }, [a, t, i]), Ee = g.useCallback(() => {
    if (!a) return;
    if (J(t)) {
      ie();
      return;
    }
    const o = document.createElement("div"), f = M.current.getBoundingClientRect();
    o.style.cssText = "position:fixed;left:-10000px;width:" + Math.max(f.width, 640) + "px;height:" + Math.max(f.height, 420) + "px", document.body.appendChild(o);
    const w = ye(o, void 0, { renderer: "svg" });
    w.setOption(ke(t, a, r, U(i)), { notMerge: !0 }), oe(w.getDataURL({ backgroundColor: U(i).panel }), "chart.svg"), w.dispose(), o.remove();
  }, [a, t, r, i, ie]), Pe = a ? ue(t).map((o) => {
    const f = a.fields.filter(($) => o.types.includes($.type));
    if (o.role === "ys" && o.multi)
      return /* @__PURE__ */ h.jsxs("span", { className: "dv-role", children: [
        /* @__PURE__ */ h.jsx("label", { children: o.label }),
        r.ys.map(($, F) => /* @__PURE__ */ h.jsxs("select", { className: "dv-select", value: $, onChange: (W) => {
          const le = [...r.ys];
          W.target.value === "" ? le.splice(F, 1) : le[F] = W.target.value, d({ ...r, ys: le });
        }, children: [
          /* @__PURE__ */ h.jsx("option", { value: "", children: "(remove)" }),
          f.map((W) => /* @__PURE__ */ h.jsx("option", { value: W.name, children: W.name }, W.name))
        ] }, F)),
        r.ys.length < Math.min(f.length, 8) && /* @__PURE__ */ h.jsx("button", { className: "dv-btn", style: { padding: "4px 9px" }, title: "Add a series", onClick: () => {
          const $ = f.map((F) => F.name).find((F) => !r.ys.includes(F));
          $ && d({ ...r, ys: [...r.ys, $] });
        }, children: "+" })
      ] }, "ys");
    const w = o.role === "ys" ? r.ys[0] || "" : r[o.role] || "";
    return /* @__PURE__ */ h.jsxs("span", { className: "dv-role", children: [
      /* @__PURE__ */ h.jsx("label", { children: o.label }),
      /* @__PURE__ */ h.jsxs("select", { className: "dv-select", value: w, onChange: ($) => {
        const F = $.target.value || void 0;
        d(o.role === "ys" ? { ...r, ys: F ? [F] : [] } : { ...r, [o.role]: F });
      }, children: [
        o.optional && /* @__PURE__ */ h.jsx("option", { value: "", children: "(none)" }),
        f.map(($) => /* @__PURE__ */ h.jsx("option", { value: $.name, children: $.name }, $.name))
      ] })
    ] }, o.role);
  }) : null, K = a && !I.length && J(O), ve = new Set(ne), Te = (o) => /* @__PURE__ */ h.jsxs(
    "button",
    {
      className: "dv-tile" + (o === t ? " dv-on" : "") + (a ? "" : " dv-dis"),
      title: G[o] + (ve.has(o) ? " · suggested for this data" : ""),
      onClick: () => fe(o),
      onMouseEnter: () => ge(o),
      onMouseLeave: be,
      children: [
        /* @__PURE__ */ h.jsx(ut, { d: qe[o] }),
        /* @__PURE__ */ h.jsxs("span", { className: "dv-lbl", children: [
          G[o],
          ve.has(o) && a ? /* @__PURE__ */ h.jsx("span", { className: "dv-dot" }) : null
        ] })
      ]
    },
    o
  );
  return /* @__PURE__ */ h.jsxs(
    "div",
    {
      className: "dv-root",
      onDragOver: (o) => {
        o.preventDefault(), o.stopPropagation(), y(!0);
      },
      onDragLeave: (o) => {
        o.currentTarget === o.target && y(!1);
      },
      onDrop: Re,
      children: [
        /* @__PURE__ */ h.jsx("style", { children: ht }),
        /* @__PURE__ */ h.jsxs("div", { className: "dv-side", children: [
          /* @__PURE__ */ h.jsxs("div", { className: "dv-card", children: [
            /* @__PURE__ */ h.jsx("div", { className: "dv-h", children: "Data" }),
            /* @__PURE__ */ h.jsxs("div", { style: { display: "flex", gap: 6, padding: "0 12px 12px" }, children: [
              /* @__PURE__ */ h.jsx("button", { className: "dv-btn", style: { flex: 1 }, onClick: () => _.current?.click(), children: "Open file" }),
              /* @__PURE__ */ h.jsx("button", { className: "dv-btn", style: { flex: 1 }, onClick: () => l(!S), children: "Paste" }),
              /* @__PURE__ */ h.jsx(
                "input",
                {
                  ref: _,
                  type: "file",
                  style: { display: "none" },
                  accept: ".csv,.tsv,.txt,.parquet,.pq,.feather,.xlsx,.xls,.json,.ndjson",
                  onChange: (o) => {
                    const f = o.target.files?.[0];
                    f && re(f), o.target.value = "";
                  }
                }
              )
            ] }),
            S && /* @__PURE__ */ h.jsxs("div", { className: "dv-fade", style: { padding: "0 12px 12px" }, children: [
              /* @__PURE__ */ h.jsx(
                "textarea",
                {
                  ref: H,
                  className: "dv-paste",
                  rows: 7,
                  placeholder: `symbol,return
AAPL,12.4
MSFT,9.1`
                }
              ),
              /* @__PURE__ */ h.jsx("button", { className: "dv-btn dv-primary", style: { width: "100%", marginTop: 8 }, onClick: Le, children: "Chart it" })
            ] }),
            p.length > 0 && /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
              /* @__PURE__ */ h.jsx("div", { className: "dv-h", style: { paddingTop: 0 }, children: "My Data library" }),
              /* @__PURE__ */ h.jsx("div", { style: { padding: "0 6px 8px" }, children: p.map((o) => /* @__PURE__ */ h.jsxs(
                "div",
                {
                  className: "dv-row" + (o.symbol === b ? " dv-on" : ""),
                  onClick: () => Ce(o.symbol),
                  children: [
                    /* @__PURE__ */ h.jsx("span", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: o.name || o.symbol }),
                    o.rows > 40 && /* @__PURE__ */ h.jsx(
                      "button",
                      {
                        className: "dv-send",
                        title: "Fit the diffusion simulator to this dataset (RESEARCH > QUANT MODELS)",
                        onClick: (f) => {
                          f.stopPropagation();
                          const w = window;
                          w.__lseQmPending = { model: "diffusion", symbol: o.symbol }, w.openResearch?.("models"), window.dispatchEvent(new Event("lse-qm-open"));
                        },
                        children: "→ MODEL"
                      }
                    ),
                    /* @__PURE__ */ h.jsx("span", { className: "dv-meta", children: o.rows.toLocaleString() })
                  ]
                },
                o.symbol
              )) })
            ] })
          ] }),
          /* @__PURE__ */ h.jsxs("div", { className: "dv-card", children: [
            /* @__PURE__ */ h.jsxs("div", { className: "dv-h", children: [
              "Chart",
              a ? "" : " · load data first"
            ] }),
            a && ne.length > 0 && /* @__PURE__ */ h.jsx("div", { style: { display: "flex", gap: 4, padding: "0 8px 2px", flexWrap: "wrap" }, children: ne.map((o) => /* @__PURE__ */ h.jsx(
              "button",
              {
                className: "dv-btn" + (o === t ? " dv-primary" : ""),
                style: { padding: "4px 10px", fontSize: 11 },
                onMouseEnter: () => ge(o),
                onMouseLeave: be,
                onClick: () => fe(o),
                children: G[o]
              },
              o
            )) }),
            _e.map(([o, f]) => /* @__PURE__ */ h.jsxs("div", { children: [
              /* @__PURE__ */ h.jsx("div", { className: "dv-h", style: { padding: "8px 12px 2px", fontSize: 9.5 }, children: o }),
              /* @__PURE__ */ h.jsx("div", { className: "dv-grid", style: { padding: "0 8px 4px" }, children: f.map(Te) })
            ] }, o)),
            /* @__PURE__ */ h.jsx("div", { style: { height: 6 } })
          ] }),
          a && /* @__PURE__ */ h.jsxs("div", { className: "dv-card", children: [
            /* @__PURE__ */ h.jsx("div", { className: "dv-h", children: "Columns" }),
            /* @__PURE__ */ h.jsxs("div", { className: "dv-cols", children: [
              /* @__PURE__ */ h.jsxs("div", { style: { color: "var(--dim)", marginBottom: 6, fontSize: 11 }, children: [
                a.source,
                " · ",
                a.nrows.toLocaleString(),
                " rows",
                a.truncated ? " (showing " + a.rows.length.toLocaleString() + ")" : ""
              ] }),
              a.fields.map((o) => /* @__PURE__ */ h.jsxs("div", { className: "dv-col", children: [
                /* @__PURE__ */ h.jsx("span", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: o.name }),
                /* @__PURE__ */ h.jsx("span", { className: "dv-type", children: o.type })
              ] }, o.name)),
              /* @__PURE__ */ h.jsx("button", { className: "dv-btn", style: { width: "100%", marginTop: 8 }, onClick: () => z(!x), children: x ? "Hide table" : "View as table" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ h.jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }, children: [
          /* @__PURE__ */ h.jsxs("div", { className: "dv-bar", children: [
            Pe,
            /* @__PURE__ */ h.jsx("span", { style: { flex: 1 } }),
            /* @__PURE__ */ h.jsx(
              "select",
              {
                className: "dv-select",
                title: "Colour palette",
                value: i,
                onChange: (o) => {
                  const f = Number(o.target.value);
                  m(f), Ae(f);
                },
                children: ae.map((o, f) => /* @__PURE__ */ h.jsx("option", { value: f, children: o.name }, o.name))
              }
            ),
            /* @__PURE__ */ h.jsx("button", { className: "dv-btn", onClick: Ee, disabled: !a, title: "Download as vector SVG", children: "SVG" }),
            /* @__PURE__ */ h.jsx("button", { className: "dv-btn", onClick: ie, disabled: !a, title: "Download as high-res PNG", children: "PNG" })
          ] }),
          k && /* @__PURE__ */ h.jsx("div", { className: "dv-err dv-fade", children: k }),
          /* @__PURE__ */ h.jsx("div", { className: "dv-canvas-wrap", children: /* @__PURE__ */ h.jsxs("div", { className: "dv-canvas-card", children: [
            !a && /* @__PURE__ */ h.jsx("div", { className: "dv-hero", children: /* @__PURE__ */ h.jsxs("div", { className: "dv-hero-card" + (A ? " dv-drag" : ""), children: [
              /* @__PURE__ */ h.jsx("div", { className: "dv-hero-t", children: "Drop a file to chart it" }),
              /* @__PURE__ */ h.jsx("div", { className: "dv-hero-s", children: "csv · parquet · xlsx · feather · json" }),
              /* @__PURE__ */ h.jsxs("div", { style: { display: "flex", gap: 8, justifyContent: "center" }, children: [
                /* @__PURE__ */ h.jsx("button", { className: "dv-btn", onClick: () => _.current?.click(), children: "Open a file" }),
                /* @__PURE__ */ h.jsx("button", { className: "dv-btn", onClick: () => l(!0), children: "Paste rows" })
              ] })
            ] }) }),
            /* @__PURE__ */ h.jsx("div", { ref: M, style: { position: "absolute", inset: 8, visibility: K || !a || I.length ? "hidden" : "visible" } }),
            /* @__PURE__ */ h.jsx(
              "canvas",
              {
                ref: T,
                style: { position: "absolute", inset: 0, width: "100%", height: "100%", visibility: K ? "visible" : "hidden", cursor: "grab", touchAction: "none" }
              }
            ),
            a && I.length > 0 && /* @__PURE__ */ h.jsx("div", { className: "dv-hero", children: /* @__PURE__ */ h.jsxs("div", { className: "dv-hero-card", style: { borderStyle: "solid" }, children: [
              /* @__PURE__ */ h.jsxs("div", { className: "dv-hero-t", children: [
                G[O],
                " needs: ",
                I.join(", ")
              ] }),
              /* @__PURE__ */ h.jsx("div", { className: "dv-hero-s", children: "Assign columns in the bar above, or pick another chart type." })
            ] }) }),
            n && n !== t && !I.length && /* @__PURE__ */ h.jsxs("div", { style: { position: "absolute", top: 10, left: 12, fontSize: 11, color: "var(--dim)", pointerEvents: "none" }, children: [
              "Previewing ",
              G[n],
              " — click to keep"
            ] }),
            K && L && /* @__PURE__ */ h.jsx("div", { style: {
              position: "absolute",
              left: L.sx + 12,
              top: L.sy + 12,
              pointerEvents: "none",
              background: "var(--panel)",
              border: "1px solid var(--edge)",
              borderRadius: 8,
              padding: "5px 9px",
              fontSize: 11,
              fontFamily: "SF Mono, ui-monospace, monospace",
              whiteSpace: "nowrap",
              boxShadow: "0 2px 8px rgba(0,0,0,.25)"
            }, children: L.text }),
            K && /* @__PURE__ */ h.jsx("div", { style: { position: "absolute", right: 12, bottom: 10, fontSize: 10, color: "var(--dim)", pointerEvents: "none" }, children: "drag rotate · wheel zoom · double-click reset" }),
            A && a && /* @__PURE__ */ h.jsx("div", { className: "dv-dropveil", children: "Drop to chart this file" }),
            x && a && /* @__PURE__ */ h.jsxs("div", { style: { position: "absolute", inset: 0, overflow: "auto", background: "var(--panel)", padding: 12 }, children: [
              /* @__PURE__ */ h.jsxs("table", { style: { borderCollapse: "collapse", fontSize: 11, fontFamily: "SF Mono, ui-monospace, monospace" }, children: [
                /* @__PURE__ */ h.jsx("thead", { children: /* @__PURE__ */ h.jsx("tr", { children: a.fields.map((o) => /* @__PURE__ */ h.jsx("th", { style: { textAlign: "left", padding: "4px 10px", borderBottom: "1px solid var(--edge)", color: "var(--dim)", position: "sticky", top: 0, background: "var(--panel)" }, children: o.name }, o.name)) }) }),
                /* @__PURE__ */ h.jsx("tbody", { children: a.rows.slice(0, 500).map((o, f) => /* @__PURE__ */ h.jsx("tr", { children: a.fields.map((w) => /* @__PURE__ */ h.jsx("td", { style: { padding: "2px 10px", borderBottom: "1px solid var(--edge)", whiteSpace: "nowrap" }, children: String(o[w.name] ?? "") }, w.name)) }, f)) })
              ] }),
              a.rows.length > 500 && /* @__PURE__ */ h.jsx("div", { style: { color: "var(--dim)", fontSize: 11, padding: 8 }, children: "first 500 rows shown" })
            ] })
          ] }) })
        ] })
      ]
    }
  );
}
export {
  ft as default
};
