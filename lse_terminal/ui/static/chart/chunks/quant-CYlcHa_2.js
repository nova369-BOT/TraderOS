import { j as e, r as a } from "./react-vendor-C0yw3i6b.js";
import { C as It, O as zt, u as Pa, V as wn, a as yt, B as At, b as Mt, D as Xt, T as ke, F as ns, c as Sn, L as Gs, S as Ea, d as Bs, e as ra, M as Ta, E as La, f as oa, g as ia, h as $a, i as Ia, I as za } from "./three-CbOKIa6a.js";
import { i as Va } from "./echarts-CX0oZ33U.js";
import { c as vs, L as q, S as Jt, a as es, b as ts, d as ss, e as Qe, T as it, f as lt, h as ct, i as xt, B as le, I as Pn, j as xe, k as Me, P as Ys, l as Xs, m as qs } from "./backtest-CeqYlV1v.js";
import { at as Ge, bu as la, bv as ca, bw as xa, aN as os, aO as Bt, bx as jt, by as da, bz as ma, av as vt, F as Le, o as Ae, aU as En, aA as Tn, bA as Da, au as Pt, aB as gn, aE as Ln, bB as ha, bC as Oa, bD as Js, bt as Wa, bE as is, bF as ls, aP as ua, az as Ha, X as Mn, bG as as, bH as fa, a0 as Ga } from "./ui-DZwdMnFY.js";
const Ds = (t, s) => typeof document < "u" && getComputedStyle(document.documentElement).getPropertyValue(t).trim() || s, js = () => document.documentElement.classList.contains("dark"), Ut = ["#0b3b39", "#0f766e", "#14b8a6", "#5eead4", "#c7fff4"];
function Ba(t, s) {
  const n = Math.max(0, Math.min(1, t)) * (Ut.length - 1), o = Math.min(Ut.length - 2, Math.floor(n));
  return s.set(Ut[o]).lerp(new yt(Ut[o + 1]), n - o);
}
const qe = 10, xs = 6;
function _a({ data: t }) {
  const s = a.useMemo(() => {
    const n = t.z || [], o = n.length, r = o ? n[0].length : 0;
    let i = 1 / 0, l = -1 / 0;
    for (const j of n)
      for (const u of j)
        u != null && isFinite(u) && (u < i && (i = u), u > l && (l = u));
    isFinite(i) || (i = 0, l = 1), l - i < 1e-12 && (l = i + 1e-12);
    const c = new Float32Array(o * r * 3), d = new Float32Array(o * r * 3), x = new yt();
    for (let j = 0; j < o; j++)
      for (let u = 0; u < r; u++) {
        const N = (j * r + u) * 3, b = n[j][u], P = b == null || !isFinite(b) ? 0 : (b - i) / (l - i);
        c[N] = r > 1 ? u / (r - 1) * 2 * qe - qe : 0, c[N + 1] = P * xs, c[N + 2] = o > 1 ? j / (o - 1) * 2 * qe - qe : 0, Ba(P, x), d[N] = x.r, d[N + 1] = x.g, d[N + 2] = x.b;
      }
    const p = [], C = (j, u) => {
      const N = n[j][u];
      return N != null && isFinite(N);
    };
    for (let j = 0; j < o - 1; j++)
      for (let u = 0; u < r - 1; u++) {
        if (!(C(j, u) && C(j + 1, u) && C(j, u + 1) && C(j + 1, u + 1))) continue;
        const N = j * r + u, b = N + 1, P = N + r, f = P + 1;
        p.push(N, P, b, b, P, f);
      }
    const m = new At();
    return m.setAttribute("position", new Mt(c, 3)), m.setAttribute("color", new Mt(d, 3)), m.setIndex(p), m.computeVertexNormals(), { geo: m, lo: i, hi: l };
  }, [t]);
  return a.useEffect(() => () => s.geo.dispose(), [s]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx("mesh", { geometry: s.geo, children: /* @__PURE__ */ e.jsx("meshStandardMaterial", { vertexColors: !0, side: Xt, roughness: 0.55, metalness: 0.05 }) }),
    /* @__PURE__ */ e.jsx("mesh", { geometry: s.geo, children: /* @__PURE__ */ e.jsx("meshBasicMaterial", { color: js() ? "#ffffff" : "#334155", wireframe: !0, transparent: !0, opacity: 0.06 }) })
  ] });
}
function Ya({ data: t }) {
  const s = js() ? "#9ca3af" : "#475569", n = js() ? "#6b7280" : "#94a3b8", o = (x) => {
    if (x == null || !isFinite(x)) return "";
    const p = Math.abs(x);
    return p >= 1e3 ? x.toFixed(0) : p >= 10 ? x.toFixed(1) : p >= 0.01 ? x.toFixed(2) : x.toExponential(1);
  }, r = t.x || [], i = t.y || [];
  let l = 1 / 0, c = -1 / 0;
  for (const x of t.z || [])
    for (const p of x)
      p != null && isFinite(p) && (p < l && (l = p), p > c && (c = p));
  const d = (x) => {
    const p = new At();
    return p.setAttribute("position", new ns(x, 3)), p;
  };
  return /* @__PURE__ */ e.jsxs("group", { children: [
    /* @__PURE__ */ e.jsx("lineSegments", { geometry: d([-qe, 0, qe, qe, 0, qe, -qe, 0, qe, -qe, 0, -qe, -qe, 0, qe, -qe, xs, qe]), children: /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: n }) }),
    /* @__PURE__ */ e.jsx(ke, { position: [0, -0.9, qe + 2.1], fontSize: 0.62, color: s, children: t.x_label || "x" }),
    /* @__PURE__ */ e.jsx(ke, { position: [-qe + 0.6, -0.9, qe + 1.1], fontSize: 0.5, color: s, children: o(r[0]) }),
    /* @__PURE__ */ e.jsx(ke, { position: [qe, -0.9, qe + 1.1], fontSize: 0.5, color: s, children: o(r[r.length - 1]) }),
    /* @__PURE__ */ e.jsx(ke, { position: [-qe - 2.4, -0.9, 0], fontSize: 0.62, color: s, rotation: [0, Math.PI / 2, 0], children: t.y_label || "y" }),
    /* @__PURE__ */ e.jsx(ke, { position: [-qe - 1.3, -0.9, qe - 0.8], fontSize: 0.5, color: s, rotation: [0, Math.PI / 2, 0], children: o(i[0]) }),
    /* @__PURE__ */ e.jsx(ke, { position: [-qe - 1.3, -0.9, -qe], fontSize: 0.5, color: s, rotation: [0, Math.PI / 2, 0], children: o(i[i.length - 1]) }),
    /* @__PURE__ */ e.jsx(ke, { position: [-qe - 1.2, xs + 0.7, qe], fontSize: 0.62, color: s, children: t.z_label || "z" }),
    /* @__PURE__ */ e.jsx(ke, { position: [-qe - 1.2, xs, qe + 0.6], fontSize: 0.5, color: s, children: o(c) }),
    /* @__PURE__ */ e.jsx(ke, { position: [-qe - 1.2, 0.15, qe + 0.6], fontSize: 0.5, color: s, children: o(l) })
  ] });
}
const $n = new wn(0, xs * 0.35, 0), Xa = new wn(0.62, 0.44, 0.66).normalize();
function qa() {
  const { camera: t, size: s } = Pa();
  return a.useEffect(() => {
    const n = t, o = s.width / Math.max(1, s.height), r = n.fov * Math.PI / 180, i = 2 * Math.atan(Math.tan(r / 2) * o), l = qe * Math.SQRT2 + 2.4, c = (xs + qe * 0.5) / 2 + 1.6, d = Math.max(
      l / Math.tan(i / 2),
      c / Math.tan(r / 2)
    ) * 1.06;
    n.position.copy(Xa).multiplyScalar(d).add($n), n.lookAt($n), n.updateProjectionMatrix();
  }, [t, s.width, s.height]), null;
}
function Za({ data: t }) {
  return /* @__PURE__ */ e.jsxs(
    It,
    {
      camera: { position: [26, 19, 29], fov: 38 },
      style: {
        background: js() ? "radial-gradient(120% 120% at 50% 30%, #232323 0%, #1a1a1a 60%, #141414 100%)" : "radial-gradient(120% 120% at 50% 30%, #ffffff 0%, #f2f4f7 60%, #e6e9ee 100%)"
      },
      children: [
        /* @__PURE__ */ e.jsx(qa, {}),
        /* @__PURE__ */ e.jsx("ambientLight", { intensity: js() ? 0.55 : 0.9 }),
        /* @__PURE__ */ e.jsx("directionalLight", { position: [12, 18, 8], intensity: js() ? 0.7 : 0.5 }),
        /* @__PURE__ */ e.jsx(_a, { data: t }),
        /* @__PURE__ */ e.jsx(Ya, { data: t }),
        /* @__PURE__ */ e.jsx(zt, { enablePan: !0, enableZoom: !0, enableRotate: !0, target: [0, xs * 0.35, 0] })
      ]
    }
  );
}
function Ua({ data: t }) {
  const s = a.useRef(null), n = a.useRef(null);
  return a.useEffect(() => {
    if (!s.current) return;
    n.current || (n.current = Va(s.current, void 0, { renderer: "canvas" }));
    const o = Ds("--text", "#e8e8e8"), r = Ds("--dim", "#b0b0b0"), i = Ds("--edge", "#3a3a3a"), l = Ds("--panel", "#2a2a2a"), c = n.current, d = (t.series || []).length > 6, x = {
      axisLine: { lineStyle: { color: i } },
      axisLabel: { color: r, fontSize: 10 },
      splitLine: { lineStyle: { color: i, opacity: 0.45 } },
      nameTextStyle: { color: r, fontSize: 11 }
    }, p = {
      backgroundColor: l,
      borderColor: i,
      borderWidth: 1,
      padding: [7, 10],
      textStyle: { color: o, fontSize: 11 },
      extraCssText: "border-radius:3px; box-shadow:0 6px 18px rgba(0,0,0,.35);",
      axisPointer: {
        lineStyle: { color: r, width: 1 },
        crossStyle: { color: r, width: 1 },
        label: {
          backgroundColor: l,
          borderColor: i,
          borderWidth: 1,
          color: o,
          fontSize: 10
        }
      }
    }, C = [
      {
        type: "inside",
        xAxisIndex: 0,
        filterMode: "none",
        zoomOnMouseWheel: !0,
        moveOnMouseMove: !0,
        moveOnMouseWheel: !1
      },
      {
        type: "inside",
        yAxisIndex: 0,
        filterMode: "none",
        zoomOnMouseWheel: "shift",
        moveOnMouseMove: !0,
        moveOnMouseWheel: !1
      }
    ], m = c.getZr();
    if (m.off("dblclick"), m.on("dblclick", () => {
      for (const u of [0, 1]) c.dispatchAction({ type: "dataZoom", dataZoomIndex: u, start: 0, end: 100 });
    }), t.kind === "heatmap") {
      const u = [];
      let N = 1 / 0, b = -1 / 0;
      (t.z || []).forEach((P, f) => P.forEach((k, v) => {
        k == null || !isFinite(k) || (u.push([v, f, k]), k < N && (N = k), k > b && (b = k));
      })), c.setOption({
        animation: !1,
        grid: { left: 60, right: 70, top: 24, bottom: 46 },
        tooltip: { ...p },
        dataZoom: C,
        xAxis: { type: "category", name: t.x_label, data: (t.x || []).map(String), ...x },
        yAxis: { type: "category", name: t.y_label, data: (t.y || []).map(String), ...x },
        visualMap: {
          min: N,
          max: b,
          calculable: !0,
          orient: "vertical",
          right: 6,
          top: "middle",
          inRange: { color: Ut },
          textStyle: { color: r }
        },
        series: [{ type: "heatmap", data: u, progressive: 4e3 }]
      }, !0);
    } else if (t.kind === "bars") {
      const u = (t.series || [])[0] || { name: "", y: [] }, N = u.x || t.x || u.y.map((b, P) => P);
      c.setOption({
        animation: !1,
        grid: { left: 64, right: 26, top: 26, bottom: 48 },
        tooltip: { trigger: "axis", ...p },
        dataZoom: C,
        xAxis: {
          type: "category",
          name: t.x_label,
          nameLocation: "middle",
          nameGap: 26,
          data: N.map((b) => typeof b == "number" ? b.toFixed(2) : String(b)),
          ...x
        },
        yAxis: {
          type: "value",
          name: t.y_label,
          nameLocation: "middle",
          nameGap: 46,
          ...x
        },
        textStyle: { color: o },
        series: [{
          type: "bar",
          name: u.name,
          data: u.y,
          itemStyle: { color: Ut[2] },
          barCategoryGap: "12%",
          large: !0
        }]
      }, !0);
    } else {
      const u = t.kind === "scatter", N = (t.series || []).map((b, P) => {
        const f = b.x || t.x || b.y.map(($, A) => A), k = b.y.map(($, A) => [f[A], $]), v = d ? Ut[2] : Ut[Math.min(Ut.length - 1, 1 + P % 4)];
        return {
          name: b.name || `series ${P + 1}`,
          type: u ? "scatter" : "line",
          data: k,
          showSymbol: u,
          symbolSize: u ? P === 0 ? 4 : 11 : 0,
          lineStyle: { width: d ? 1 : 1.8, opacity: d ? 0.5 : 1, color: v },
          itemStyle: { color: v, opacity: d ? 0.5 : 0.9 },
          large: !0,
          largeThreshold: 2e3,
          emphasis: { focus: "series" }
        };
      });
      c.setOption({
        animation: !1,
        grid: { left: 64, right: 26, top: 26, bottom: 48 },
        tooltip: { trigger: u ? "item" : "axis", ...p },
        dataZoom: C,
        legend: d ? { show: !1 } : { textStyle: { color: r, fontSize: 10 }, top: 0, icon: "roundRect" },
        xAxis: { type: "value", name: t.x_label, nameLocation: "middle", nameGap: 26, scale: !0, ...x },
        yAxis: { type: "value", name: t.y_label, nameLocation: "middle", nameGap: 46, scale: !0, ...x },
        textStyle: { color: o },
        series: N
      }, !0);
    }
    const j = new ResizeObserver(() => c.resize());
    return j.observe(s.current), () => {
      j.disconnect(), m.off("dblclick");
    };
  }, [t]), a.useEffect(() => () => {
    n.current?.dispose(), n.current = null;
  }, []), /* @__PURE__ */ e.jsx("div", { ref: s, style: { width: "100%", height: "100%" } });
}
function Ka({ data: t }) {
  const s = t.kind === "surface";
  return /* @__PURE__ */ e.jsxs("div", { style: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "var(--bg)",
    color: "var(--text)"
  }, children: [
    /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0 }, children: s ? /* @__PURE__ */ e.jsx(Za, { data: t }) : /* @__PURE__ */ e.jsx(Ua, { data: t }) }),
    !!(t.notes || []).length && /* @__PURE__ */ e.jsx("div", { style: {
      flex: "0 0 auto",
      display: "flex",
      gap: "18px",
      flexWrap: "wrap",
      padding: "7px 14px",
      borderTop: "1px solid var(--edge)",
      fontFamily: "var(--mono)",
      fontSize: "11px",
      color: "var(--dim)"
    }, children: (t.notes || []).map((n, o) => /* @__PURE__ */ e.jsx("span", { children: n }, o)) })
  ] });
}
const Fe = a.forwardRef(({ className: t, ...s }, n) => /* @__PURE__ */ e.jsx("div", { ref: n, className: vs("rounded-lg border border-border/50 dark:border-zinc-800 bg-card text-card-foreground shadow-sm", t), ...s }));
Fe.displayName = "Card";
const Qa = a.forwardRef(
  ({ className: t, ...s }, n) => /* @__PURE__ */ e.jsx("div", { ref: n, className: vs("flex flex-col space-y-1.5 p-6", t), ...s })
);
Qa.displayName = "CardHeader";
const Ja = a.forwardRef(
  ({ className: t, ...s }, n) => /* @__PURE__ */ e.jsx("h3", { ref: n, className: vs("text-2xl font-semibold leading-none tracking-tight", t), ...s })
);
Ja.displayName = "CardTitle";
const er = a.forwardRef(
  ({ className: t, ...s }, n) => /* @__PURE__ */ e.jsx("p", { ref: n, className: vs("text-sm text-muted-foreground", t), ...s })
);
er.displayName = "CardDescription";
const tr = a.forwardRef(
  ({ className: t, ...s }, n) => /* @__PURE__ */ e.jsx("div", { ref: n, className: vs("p-6 pt-0", t), ...s })
);
tr.displayName = "CardContent";
const sr = a.forwardRef(
  ({ className: t, ...s }, n) => /* @__PURE__ */ e.jsx("div", { ref: n, className: vs("flex items-center p-6 pt-0", t), ...s })
);
sr.displayName = "CardFooter";
function ms(t) {
  return (s, n, o) => {
    const i = Math.max(0, Math.min(1, (s - n) / (o - n))) * (t.length - 1), l = Math.floor(i), c = i - l;
    return l >= t.length - 1 ? t[t.length - 1] : nr(t[l], t[l + 1], c);
  };
}
const Et = {
  emerald: ["#25322c", "#31473d", "#41604f", "#5c8370", "#87ab97"],
  slate: ["#26282b", "#35383c", "#484c51", "#64696f", "#8f9499"],
  teal: ["#1d3330", "#1f4c46", "#20776d", "#21b3a4", "#7ccec3"],
  blue: ["#262b33", "#343d49", "#475366", "#65748c", "#93a0b4"],
  zinc: ["#27272a", "#3f3f46", "#52525b", "#71717a", "#a1a1aa"],
  pnl: ["#8f2c44", "#f0426c", "#71717a", "#21b3a4", "#177d72"]
}, $t = [
  { id: "emerald", name: "Emerald", colors: Et.emerald, getColor: ms(Et.emerald) },
  { id: "slate", name: "Slate", colors: Et.slate, getColor: ms(Et.slate) },
  { id: "teal", name: "Teal", colors: Et.teal, getColor: ms(Et.teal) },
  { id: "blue", name: "Steel", colors: Et.blue, getColor: ms(Et.blue) },
  { id: "zinc", name: "Zinc", colors: Et.zinc, getColor: ms(Et.zinc) },
  { id: "pnl", name: "P&L", colors: Et.pnl, getColor: ms(Et.pnl) }
];
function nr(t, s, n) {
  const o = parseInt(t.slice(1, 3), 16), r = parseInt(t.slice(3, 5), 16), i = parseInt(t.slice(5, 7), 16), l = parseInt(s.slice(1, 3), 16), c = parseInt(s.slice(3, 5), 16), d = parseInt(s.slice(5, 7), 16), x = Math.round(o + (l - o) * n), p = Math.round(r + (c - r) * n), C = Math.round(i + (d - i) * n);
  return `#${x.toString(16).padStart(2, "0")}${p.toString(16).padStart(2, "0")}${C.toString(16).padStart(2, "0")}`;
}
function qt({ value: t, onChange: s }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ e.jsx(q, { className: "text-xs text-muted-foreground", children: "Color Scheme" }),
    /* @__PURE__ */ e.jsxs(
      Jt,
      {
        value: t,
        onValueChange: (n) => {
          const o = $t.find((r) => r.id === n);
          o && s(o);
        },
        children: [
          /* @__PURE__ */ e.jsx(es, { className: "w-full h-9", children: /* @__PURE__ */ e.jsx(ts, {}) }),
          /* @__PURE__ */ e.jsx(ss, { children: $t.map((n) => /* @__PURE__ */ e.jsx(Qe, { value: n.id, children: /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx("div", { className: "flex h-4 w-16 rounded overflow-hidden", children: n.colors.slice(0, 5).map((o, r) => /* @__PURE__ */ e.jsx(
              "div",
              {
                className: "flex-1",
                style: { backgroundColor: o }
              },
              r
            )) }),
            /* @__PURE__ */ e.jsx("span", { children: n.name })
          ] }) }, n.id)) })
        ]
      }
    )
  ] });
}
const Cn = a.createContext({ open: !1, toggle: () => {
} }), $e = ({ open: t, defaultOpen: s, onOpenChange: n, children: o, ...r }) => {
  const [i, l] = a.useState(!!s), c = t !== void 0 ? t : i, d = () => {
    const x = !c;
    t === void 0 && l(x), n?.(x);
  };
  return /* @__PURE__ */ e.jsx(Cn.Provider, { value: { open: c, toggle: d }, children: /* @__PURE__ */ e.jsx("div", { ...r, children: o }) });
}, Ie = ({ asChild: t, children: s, onClick: n, ...o }) => {
  const { toggle: r } = a.useContext(Cn);
  return t && a.isValidElement(s) ? a.cloneElement(s, {
    onClick: (i) => {
      s.props?.onClick?.(i), r();
    }
  }) : /* @__PURE__ */ e.jsx(
    "button",
    {
      type: "button",
      onClick: (i) => {
        n?.(i), r();
      },
      ...o,
      children: s
    }
  );
}, ze = ({ children: t, ...s }) => {
  const { open: n } = a.useContext(Cn);
  return n ? /* @__PURE__ */ e.jsx("div", { ...s, children: t }) : null;
};
function ar() {
  let t = 0, s = 0;
  for (; t === 0; ) t = Math.random();
  for (; s === 0; ) s = Math.random();
  return Math.sqrt(-2 * Math.log(t)) * Math.cos(2 * Math.PI * s);
}
function rr() {
  const [t, s] = a.useState({
    initialPrice: 100,
    drift: 0.08,
    volatility: 0.2,
    timeHorizon: 252,
    numSimulations: 100
  }), [n, o] = a.useState({
    initialPrice: 100,
    drift: 0.08,
    volatility: 0.2,
    timeHorizon: 252,
    numSimulations: 100
  }), [r, i] = a.useState(1e4), [l, c] = a.useState(20), [d, x] = a.useState("pnl"), [p, C] = a.useState(!1), [m, j] = a.useState(1), [u, N] = a.useState(!0), [b, P] = a.useState(!0), [f, k] = a.useState(0.15), [v, $] = a.useState($t[4]), [A, z] = a.useState(!1), [R, T] = a.useState(!1), [I, F] = a.useState(!1), [S, h] = a.useState(!0), [y, w] = a.useState(!0), [M, Y] = a.useState(!0), [_, se] = a.useState(!0), [V, W] = a.useState(!1), [te, O] = a.useState(0), [L, D] = a.useState(1), [X, B] = a.useState(0), [g, oe] = a.useState(0), [re, U] = a.useState(!1), [ee, E] = a.useState(!0), [G, J] = a.useState(null), [K, ue] = a.useState(null), [ce, Q] = a.useState(!1), [ne, H] = a.useState([]), [me, be] = a.useState(5), [Re, Se] = a.useState(!1), We = a.useRef(null), Be = a.useRef(null), Z = a.useRef(null), pe = a.useRef(null), Ze = a.useRef(m), de = a.useRef({ x: 0, y: 0 }), ve = a.useMemo(() => r / n.initialPrice, [r, n.initialPrice]), Xe = a.useCallback(() => {
    !document.fullscreenElement && Be.current ? Be.current.requestFullscreen().catch(() => {
      Q((ae) => !ae);
    }) : document.fullscreenElement ? document.exitFullscreen() : Q((ae) => !ae);
  }, []);
  a.useEffect(() => {
    const ae = () => {
      Q(!!document.fullscreenElement);
    };
    return document.addEventListener("fullscreenchange", ae), () => document.removeEventListener("fullscreenchange", ae);
  }, []);
  const He = a.useCallback(() => {
    Ze.current < 1 ? (Ze.current = Math.min(Ze.current + 8e-3, 1), j(Ze.current), pe.current = requestAnimationFrame(He)) : C(!1);
  }, []), De = a.useCallback(() => {
    o({ ...t }), O((ae) => ae + 1), Ze.current = 0, j(0), C(!0), pe.current = requestAnimationFrame(He);
  }, [t, He]), { paths: Ee, percentiles: Pe } = a.useMemo(() => {
    const ae = [], je = 0.003968253968253968, ye = n.timeHorizon;
    let Ve = [];
    const _e = ye > 504 ? Math.ceil(ye / 500) : 1;
    for (let rt = 0; rt < n.numSimulations; rt++) {
      const et = [];
      let ut = n.initialPrice;
      for (let Ot = 0; Ot <= ye; Ot++) {
        let Nt = d === "price" ? ut : d === "pnl" ? (ut - n.initialPrice) * ve : (ut - n.initialPrice) / n.initialPrice * 100;
        if (et.push(Nt), Ot < ye) {
          const an = (n.drift - 0.5 * n.volatility ** 2) * je;
          ut = ut * Math.exp(an + n.volatility * Math.sqrt(je) * ar());
        }
      }
      Ve.push(et);
      const _t = et.filter((Ot, Nt) => Nt % _e === 0 || Nt === et.length - 1);
      ae.push({ values: _t, finalValue: et[et.length - 1], color: "" });
    }
    const Ke = { p5: [], p10: [], p25: [], p50: [], p75: [], p90: [], p95: [] };
    for (let rt = 0; rt <= ye; rt += _e) {
      rt > ye && (rt = ye);
      const et = Ve.map((ut) => ut[rt]).sort((ut, _t) => ut - _t);
      if (Ke.p5.push(et[Math.floor(et.length * 0.05)]), Ke.p10.push(et[Math.floor(et.length * 0.1)]), Ke.p25.push(et[Math.floor(et.length * 0.25)]), Ke.p50.push(et[Math.floor(et.length * 0.5)]), Ke.p75.push(et[Math.floor(et.length * 0.75)]), Ke.p90.push(et[Math.floor(et.length * 0.9)]), Ke.p95.push(et[Math.floor(et.length * 0.95)]), rt === ye && rt % _e !== 0) break;
    }
    const mt = ae.map((rt) => rt.finalValue), Dt = Math.min(...mt), Zt = Math.max(...mt);
    return ae.forEach((rt) => {
      rt.color = v.getColor(rt.finalValue, Dt, Zt);
    }), { paths: ae, percentiles: Ke };
  }, [n, v, d, ve, te]), we = a.useMemo(() => {
    const ae = Ee.map((gt) => gt.finalValue), je = ae.reduce((gt, Wt) => gt + Wt, 0) / ae.length, ye = [...ae].sort((gt, Wt) => gt - Wt), Ve = ye[Math.floor(ye.length * 0.05)], _e = ye[Math.floor(ye.length * 0.5)], Ke = ye[Math.floor(ye.length * 0.95)], mt = ae.filter((gt) => d === "price" ? gt > n.initialPrice : gt > 0).length / ae.length, Dt = d === "price" ? n.initialPrice * (1 + l / 100) : d === "pnl" ? r * (l / 100) : l, Zt = ae.filter((gt) => gt >= Dt).length / ae.length, rt = d === "pnl" ? r + je : d === "return" ? r * (1 + je / 100) : je * ve, et = n.drift > 0 ? (n.drift - 0.02) / n.volatility : 0, ut = Ee.map((gt, Wt) => ({ index: Wt, finalValue: gt.finalValue, color: gt.color })).sort((gt, Wt) => Wt.finalValue - gt.finalValue), _t = ut[0], Ot = ut[ut.length - 1], Nt = ut.slice(0, 5), an = ut.slice(-5).reverse(), Aa = ut[Math.floor(ut.length / 2)], Ra = Math.sqrt(ae.reduce((gt, Wt) => gt + Math.pow(Wt - je, 2), 0) / ae.length), rn = 40, on = Math.min(...ae), Rn = Math.max(...ae), Fa = (Rn - on) / rn, Fn = new Array(rn).fill(0);
    return ae.forEach((gt) => {
      const Wt = Math.min(Math.floor((gt - on) / Fa), rn - 1);
      Fn[Wt]++;
    }), {
      mean: je,
      p5: Ve,
      p50: _e,
      p95: Ke,
      winRate: mt,
      probTarget: Zt,
      expectedPortfolio: rt,
      sharpeRatio: et,
      histogram: Fn,
      minFinal: on,
      maxFinal: Rn,
      bestPath: _t,
      worstPath: Ot,
      top5Paths: Nt,
      bottom5Paths: an,
      medianPath: Aa,
      stdDev: Ra,
      rankedPaths: ut
    };
  }, [Ee, n, d, r, l, ve]), { width: ft, height: dt, marginTop: tt, marginBottom: ie, marginLeft: he, marginRight: Te, chartWidth: Ce, chartHeight: Ne } = a.useMemo(() => {
    const Ke = _ ? 120 : 60;
    return {
      width: 1e3,
      height: 500,
      marginTop: 30,
      marginBottom: 50,
      marginLeft: 70,
      marginRight: Ke,
      chartWidth: 930 - Ke,
      chartHeight: 420
    };
  }, [_]), { xScale: Oe, yScale: Ye, yMin: st, yMax: ht, inverseXScale: nt, inverseYScale: at } = a.useMemo(() => {
    const ae = Ee.flatMap((Nt) => Nt.values), je = Math.min(...ae, 0), ye = Math.max(...ae), Ve = (ye - je) * 0.1, _e = n.timeHorizon, Ke = ye + Ve - (je - Ve), mt = _e / L, Dt = Ke / L, Zt = _e / 2 + X * _e, rt = (je - Ve + ye + Ve) / 2 + g * Ke, et = Zt - mt / 2, ut = Zt + mt / 2, _t = rt - Dt / 2, Ot = rt + Dt / 2;
    return {
      xScale: (Nt) => he + (Nt - et) / (ut - et) * Ce,
      yScale: (Nt) => tt + Ne - (Nt - _t) / (Ot - _t) * Ne,
      inverseXScale: (Nt) => et + (Nt - he) / Ce * (ut - et),
      inverseYScale: (Nt) => Ot - (Nt - tt) / Ne * (Ot - _t),
      yMin: _t,
      yMax: Ot
    };
  }, [Ee, n.timeHorizon, Ce, Ne, he, tt, L, X, g]);
  a.useEffect(() => {
    const ae = Z.current;
    if (!ae) return;
    const je = (ye) => {
      ye.preventDefault(), ye.stopPropagation();
      const Ve = ye.deltaY > 0 ? 0.9 : 1.1;
      D((_e) => Math.max(0.5, Math.min(5, _e * Ve)));
    };
    return ae.addEventListener("wheel", je, { passive: !1 }), () => {
      ae.removeEventListener("wheel", je);
    };
  }, []);
  const Je = a.useCallback(() => {
    const ae = [], je = n.numSimulations;
    for (; ae.length < Math.min(me, je); ) {
      const ye = Math.floor(Math.random() * je);
      ae.includes(ye) || ae.push(ye);
    }
    H(ae);
  }, [n.numSimulations, me]);
  a.useEffect(() => {
    const ae = [], je = n.numSimulations;
    for (; ae.length < Math.min(me, je); ) {
      const ye = Math.floor(Math.random() * je);
      ae.includes(ye) || ae.push(ye);
    }
    H(ae);
  }, [me, n.numSimulations]);
  const Ct = a.useCallback((ae) => {
    U(!0), de.current = { x: ae.clientX, y: ae.clientY }, ae.preventDefault();
  }, []), Rt = a.useCallback((ae) => {
    if (re) {
      const je = (ae.clientX - de.current.x) / (Ce * L) * 2, ye = (ae.clientY - de.current.y) / (Ne * L) * 2;
      B((Ve) => Ve - je), oe((Ve) => Ve + ye), de.current = { x: ae.clientX, y: ae.clientY };
      return;
    }
    if (We.current && ee) {
      const je = We.current.getBoundingClientRect(), ye = ft / je.width, Ve = dt / je.height, _e = (ae.clientX - je.left) * ye, Ke = (ae.clientY - je.top) * Ve;
      if (_e >= he && _e <= he + Ce && Ke >= tt && Ke <= tt + Ne) {
        J({ x: _e, y: Ke });
        const mt = Math.max(0, Math.min(n.timeHorizon, Math.round(nt(_e)))), Dt = at(Ke);
        ue({
          time: mt,
          p5: Pe.p5[mt] || 0,
          p50: Pe.p50[mt] || 0,
          p95: Pe.p95[mt] || 0,
          yValue: Dt
        });
      } else
        J(null), ue(null);
    }
  }, [re, Ce, Ne, L, ft, dt, he, tt, ee, nt, at, n.timeHorizon, Pe]), ys = a.useCallback(() => {
    U(!1);
  }, []), en = a.useCallback(() => {
    U(!1), J(null), ue(null);
  }, []), zs = () => {
    O((ae) => ae + 1), Ze.current = 0, j(0), C(!0), pe.current = requestAnimationFrame(He);
  }, Ns = () => {
    C(!1), pe.current && cancelAnimationFrame(pe.current);
  }, Vs = () => {
    Ze.current = 0, j(0), zs();
  }, Ca = () => {
    D(1), B(0), oe(0);
  }, Vt = (ae) => d === "price" ? `$${ae.toFixed(0)}` : d === "pnl" ? ae >= 0 ? `+$${ae.toFixed(0)}` : `-$${Math.abs(ae).toFixed(0)}` : `${ae.toFixed(0)}%`, tn = d === "price" ? n.initialPrice : 0, sn = d === "price" ? n.initialPrice * (1 + l / 100) : d === "pnl" ? r * (l / 100) : l, ds = Math.floor(n.timeHorizon * m), nn = (ae, je) => {
    const ye = Math.min(ds, ae.length - 1);
    let Ve = `M ${Oe(0)} ${Ye(ae[0])}`;
    for (let _e = 1; _e <= ye; _e++) Ve += ` L ${Oe(_e)} ${Ye(ae[_e])}`;
    for (let _e = ye; _e >= 0; _e--) Ve += ` L ${Oe(_e)} ${Ye(je[_e])}`;
    return Ve += " Z", Ve;
  }, ka = a.useMemo(() => {
    const ae = [], je = n.timeHorizon / 21, ye = je <= 6 ? 1 : je <= 12 ? 2 : je <= 24 ? 3 : 6;
    for (let Ve = 0; Ve <= je; Ve += ye)
      ae.push({ value: Ve * 21, label: Ve === 0 ? "Now" : `${Ve}M` });
    return ae;
  }, [n.timeHorizon]);
  return /* @__PURE__ */ e.jsxs(
    "div",
    {
      ref: Be,
      className: `relative w-full bg-background rounded-lg overflow-hidden border border-border ${ce ? "h-screen" : "h-[calc(100vh-180px)] min-h-[600px]"}`,
      style: { touchAction: "none", overscrollBehavior: "none" },
      children: [
        /* @__PURE__ */ e.jsx(
          "div",
          {
            ref: Z,
            className: "absolute inset-0 flex items-center justify-center bg-background",
            style: {
              touchAction: "none",
              overscrollBehavior: "none"
            },
            onMouseDown: Ct,
            onMouseMove: Rt,
            onMouseUp: ys,
            onMouseLeave: en,
            children: /* @__PURE__ */ e.jsxs(
              "svg",
              {
                ref: We,
                viewBox: `0 0 ${ft} ${dt}`,
                className: "w-full h-full max-w-[1400px]",
                preserveAspectRatio: "xMidYMid meet",
                style: { cursor: re ? "grabbing" : "crosshair" },
                children: [
                  /* @__PURE__ */ e.jsxs("defs", { children: [
                    /* @__PURE__ */ e.jsxs("linearGradient", { id: "fanGrad95", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                      /* @__PURE__ */ e.jsx("stop", { offset: "0%", stopColor: "#e8e8e8", stopOpacity: "0.15" }),
                      /* @__PURE__ */ e.jsx("stop", { offset: "100%", stopColor: "#e8e8e8", stopOpacity: "0.05" })
                    ] }),
                    /* @__PURE__ */ e.jsxs("linearGradient", { id: "fanGrad75", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                      /* @__PURE__ */ e.jsx("stop", { offset: "0%", stopColor: "#e8e8e8", stopOpacity: "0.25" }),
                      /* @__PURE__ */ e.jsx("stop", { offset: "100%", stopColor: "#e8e8e8", stopOpacity: "0.1" })
                    ] }),
                    /* @__PURE__ */ e.jsxs("linearGradient", { id: "fanGrad50", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                      /* @__PURE__ */ e.jsx("stop", { offset: "0%", stopColor: "#e8e8e8", stopOpacity: "0.4" }),
                      /* @__PURE__ */ e.jsx("stop", { offset: "100%", stopColor: "#e8e8e8", stopOpacity: "0.2" })
                    ] })
                  ] }),
                  Array.from({ length: 5 }).map((ae, je) => {
                    const ye = tt + Ne / 4 * je, Ve = ht - (ht - st) / 4 * je;
                    return /* @__PURE__ */ e.jsxs("g", { children: [
                      /* @__PURE__ */ e.jsx("line", { x1: he, y1: ye, x2: he + Ce, y2: ye, stroke: "#2e2e2e", strokeWidth: 1 }),
                      /* @__PURE__ */ e.jsx("text", { x: he - 12, y: ye + 4, textAnchor: "end", className: "fill-muted-foreground", fontSize: 12, fontFamily: "monospace", fontWeight: "500", children: Vt(Ve) })
                    ] }, je);
                  }),
                  ka.map(({ value: ae, label: je }) => /* @__PURE__ */ e.jsxs("g", { children: [
                    /* @__PURE__ */ e.jsx("line", { x1: Oe(ae), y1: tt, x2: Oe(ae), y2: tt + Ne, stroke: "#2e2e2e", strokeWidth: 1 }),
                    /* @__PURE__ */ e.jsx("text", { x: Oe(ae), y: dt - 18, textAnchor: "middle", className: "fill-muted-foreground", fontSize: 12, fontFamily: "monospace", fontWeight: "500", children: je })
                  ] }, ae)),
                  /* @__PURE__ */ e.jsx("clipPath", { id: "chartClip", children: /* @__PURE__ */ e.jsx("rect", { x: he, y: tt, width: Ce, height: Ne }) }),
                  /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#chartClip)", children: [
                    u && ds > 0 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                      /* @__PURE__ */ e.jsx("path", { d: nn(Pe.p95, Pe.p5), fill: "url(#fanGrad95)" }),
                      /* @__PURE__ */ e.jsx("path", { d: nn(Pe.p90, Pe.p10), fill: "url(#fanGrad75)" }),
                      /* @__PURE__ */ e.jsx("path", { d: nn(Pe.p75, Pe.p25), fill: "url(#fanGrad50)" })
                    ] }),
                    M && /* @__PURE__ */ e.jsx("line", { x1: he, y1: Ye(tn), x2: he + Ce, y2: Ye(tn), stroke: "#b0b0b0", strokeWidth: 1.5, strokeDasharray: "6,4" }),
                    d !== "price" && S && /* @__PURE__ */ e.jsx("line", { x1: he, y1: Ye(sn), x2: he + Ce, y2: Ye(sn), stroke: "#21b3a4", strokeWidth: 1.5, strokeDasharray: "4,3" }),
                    b && !Re && (() => {
                      const je = Ee.length > 50 ? Math.ceil(Ee.length / 50) : 1;
                      return Ee.filter((ye, Ve) => Ve % je === 0 || ne.includes(Ve)).map((ye, Ve, _e) => {
                        const Ke = Ee.indexOf(ye), mt = Math.min(ds, ye.values.length - 1);
                        if (mt < 1) return null;
                        const Dt = ne.includes(Ke);
                        let Zt = `M ${Oe(0)} ${Ye(ye.values[0])}`;
                        for (let rt = 1; rt <= mt; rt++) Zt += ` L ${Oe(rt)} ${Ye(ye.values[rt])}`;
                        return /* @__PURE__ */ e.jsx("path", { d: Zt, fill: "none", stroke: ye.color, strokeWidth: Dt ? 2 : 1, opacity: Dt ? 0.9 : f }, Ke);
                      });
                    })(),
                    ne.length > 0 && Ee.filter((ae, je) => ne.includes(je)).map((ae, je) => {
                      const ye = ne[je], Ve = Math.min(ds, ae.values.length - 1);
                      if (Ve < 1) return null;
                      let _e = `M ${Oe(0)} ${Ye(ae.values[0])}`;
                      for (let mt = 1; mt <= Ve; mt++) _e += ` L ${Oe(mt)} ${Ye(ae.values[mt])}`;
                      const Ke = ["#f0426c", "#21b3a4", "#c58435", "#e8e8e8", "#8f86ad", "#7da0a8", "#b0748f", "#96a86e"];
                      return /* @__PURE__ */ e.jsx("path", { d: _e, fill: "none", stroke: Ke[je % Ke.length], strokeWidth: 2.5, opacity: 0.95 }, `hl-${ye}`);
                    }),
                    y && ds > 0 && /* @__PURE__ */ e.jsx(
                      "path",
                      {
                        d: `M ${Oe(0)} ${Ye(Pe.p50[0])} ${Pe.p50.slice(1, ds + 1).map((ae, je) => `L ${Oe(je + 1)} ${Ye(ae)}`).join(" ")}`,
                        fill: "none",
                        stroke: "#e8e8e8",
                        strokeWidth: 2.5
                      }
                    )
                  ] }),
                  ee && G && K && /* @__PURE__ */ e.jsxs("g", { children: [
                    /* @__PURE__ */ e.jsx("line", { x1: G.x, y1: tt, x2: G.x, y2: tt + Ne, stroke: "rgba(176,176,176,0.5)", strokeWidth: 1, strokeDasharray: "4,4" }),
                    /* @__PURE__ */ e.jsx("circle", { cx: G.x, cy: Ye(K.p50), r: 4, fill: "#e8e8e8" }),
                    /* @__PURE__ */ e.jsxs("g", { transform: `translate(${G.x}, ${tt + Ne + 5})`, children: [
                      /* @__PURE__ */ e.jsx("rect", { x: -22, y: 0, width: 44, height: 20, rx: 4, fill: "#2a2a2a", stroke: "#3a3a3a", strokeWidth: 1.5 }),
                      /* @__PURE__ */ e.jsxs("text", { x: 0, y: 14, textAnchor: "middle", className: "fill-foreground", fontSize: 11, fontFamily: "monospace", fontWeight: "700", children: [
                        Math.round(K.time / 21),
                        "M"
                      ] })
                    ] })
                  ] }),
                  _ && m >= 1 && /* @__PURE__ */ e.jsx("g", { transform: `translate(${he + Ce + 15}, ${tt})`, children: we.histogram.map((ae, je) => {
                    const ye = ae / n.numSimulations * 100, Ve = ae / Math.max(...we.histogram) * 60, _e = we.minFinal + (je + 0.5) * ((we.maxFinal - we.minFinal) / we.histogram.length), Ke = (we.maxFinal - _e) / (we.maxFinal - we.minFinal) * Ne, mt = v.getColor(_e, we.minFinal, we.maxFinal);
                    return /* @__PURE__ */ e.jsxs("g", { children: [
                      /* @__PURE__ */ e.jsx("rect", { x: 0, y: Ke - 4, width: Ve, height: 8, fill: mt, opacity: 0.85, rx: 2 }),
                      ye >= 5 && /* @__PURE__ */ e.jsxs("text", { x: Ve + 4, y: Ke + 2, fontSize: 9, fontFamily: "monospace", className: "fill-muted-foreground", fontWeight: "500", children: [
                        ye.toFixed(0),
                        "%"
                      ] })
                    ] }, je);
                  }) }),
                  /* @__PURE__ */ e.jsx("text", { x: he + Ce + 8, y: Ye(tn) + 4, className: "fill-muted-foreground", fontSize: 11, fontFamily: "monospace", fontWeight: "500", children: d === "price" ? "Entry" : "B/E" }),
                  d !== "price" && /* @__PURE__ */ e.jsxs("text", { x: he + Ce + 8, y: Ye(sn) + 4, fill: "#21b3a4", fontSize: 11, fontFamily: "monospace", fontWeight: "500", children: [
                    "+",
                    l,
                    "%"
                  ] }),
                  /* @__PURE__ */ e.jsx("text", { x: he + Ce / 2, y: dt - 3, textAnchor: "middle", className: "fill-muted-foreground", fontSize: 12, fontFamily: "monospace", fontWeight: "500", children: "Time" }),
                  /* @__PURE__ */ e.jsx("text", { x: 18, y: tt + Ne / 2, textAnchor: "middle", className: "fill-muted-foreground", fontSize: 12, fontFamily: "monospace", fontWeight: "500", transform: `rotate(-90, 18, ${tt + Ne / 2})`, children: d === "price" ? "Price ($)" : d === "pnl" ? "P&L ($)" : "Return (%)" })
                ]
              }
            )
          }
        ),
        ee && K && G && /* @__PURE__ */ e.jsx("div", { className: "absolute top-16 left-1/2 -translate-x-1/2 pointer-events-none z-10", children: /* @__PURE__ */ e.jsx("div", { className: "bg-card rounded-lg px-5 py-2.5 border border-border", children: /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-8 text-sm font-mono", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "text-muted-foreground font-medium", children: [
            "T: ",
            /* @__PURE__ */ e.jsxs("span", { className: "text-foreground font-bold", children: [
              Math.round(K.time / 21),
              "M"
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-[#f0426c] font-semibold", children: [
            "5%: ",
            Vt(K.p5)
          ] }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-[#e8e8e8] font-semibold", children: [
            "50%: ",
            Vt(K.p50)
          ] }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-[#21b3a4] font-semibold", children: [
            "95%: ",
            Vt(K.p95)
          ] })
        ] }) }) }),
        /* @__PURE__ */ e.jsxs("div", { className: "absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3 pointer-events-auto", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "bg-card rounded-lg px-4 py-2 border border-border flex items-center gap-2 text-foreground", children: [
              /* @__PURE__ */ e.jsx("span", { className: "font-semibold font-mono", children: "MONTE CARLO" }),
              /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
                /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4 text-muted-foreground cursor-help" }) }),
                /* @__PURE__ */ e.jsx(xt, { className: "max-w-sm font-mono", children: /* @__PURE__ */ e.jsx("p", { className: "text-sm", children: "dS = μS dt + σS dW" }) })
              ] }) })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: `px-3 py-1 rounded text-xs font-mono bg-[#262626] border border-border ${we.sharpeRatio > 1 ? "text-[#21b3a4]" : we.sharpeRatio > 0.5 ? "text-[#c58435]" : "text-[#f0426c]"}`, children: [
              "SR: ",
              we.sharpeRatio.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 pointer-events-auto", children: [
            /* @__PURE__ */ e.jsx(le, { variant: "outline", size: "sm", onClick: () => D((ae) => Math.min(5, ae * 1.2)), className: "bg-card h-8 w-8 p-0 text-foreground hover:text-foreground", children: /* @__PURE__ */ e.jsx(la, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ e.jsx(le, { variant: "outline", size: "sm", onClick: () => D((ae) => Math.max(0.5, ae * 0.8)), className: "bg-card h-8 w-8 p-0 text-foreground hover:text-foreground", children: /* @__PURE__ */ e.jsx(ca, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ e.jsx(le, { variant: "outline", size: "sm", onClick: Ca, className: "bg-card h-8 w-8 p-0 text-foreground hover:text-foreground", children: /* @__PURE__ */ e.jsx(xa, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ e.jsx("div", { className: "w-px h-6 bg-border" }),
            /* @__PURE__ */ e.jsxs(le, { variant: "outline", size: "sm", onClick: p ? Ns : zs, className: "bg-card gap-1 text-foreground hover:text-foreground", children: [
              p ? /* @__PURE__ */ e.jsx(os, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Bt, { className: "h-4 w-4" }),
              /* @__PURE__ */ e.jsx("span", { className: "hidden md:inline", children: p ? "Pause" : "Run" })
            ] }),
            /* @__PURE__ */ e.jsx(le, { variant: "outline", size: "sm", onClick: Vs, className: "bg-card h-8 w-8 p-0 text-foreground hover:text-foreground", children: /* @__PURE__ */ e.jsx(jt, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ e.jsx("div", { className: "w-px h-6 bg-border" }),
            /* @__PURE__ */ e.jsx(le, { variant: "outline", size: "sm", onClick: Xe, className: "bg-card h-8 w-8 p-0 text-foreground hover:text-foreground", children: ce ? /* @__PURE__ */ e.jsx(da, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(ma, { className: "h-4 w-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "absolute left-4 top-20 w-56 space-y-2 pointer-events-auto max-h-[calc(100%-120px)] overflow-y-auto", children: [
          /* @__PURE__ */ e.jsxs($e, { open: A, onOpenChange: z, children: [
            /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card font-mono text-xs text-foreground hover:text-foreground", children: [
              /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ e.jsx(vt, { className: "h-4 w-4" }),
                " PARAMETERS"
              ] }),
              A ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
            ] }) }),
            /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-4 text-foreground", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
                  /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-muted-foreground flex items-center gap-1 font-mono cursor-help", children: [
                    /* @__PURE__ */ e.jsx(En, { className: "h-3 w-3" }),
                    " INVESTMENT",
                    /* @__PURE__ */ e.jsx(Ge, { className: "h-3 w-3 ml-1 opacity-50" })
                  ] }) }),
                  /* @__PURE__ */ e.jsx(xt, { side: "right", className: "max-w-xs", children: /* @__PURE__ */ e.jsx("p", { className: "text-xs", children: "Your starting capital. This is the amount you're investing at the beginning." }) })
                ] }) }),
                /* @__PURE__ */ e.jsx(Pn, { type: "number", value: r, onChange: (ae) => i(Math.max(100, parseInt(ae.target.value) || 0)), className: "h-8 font-mono" })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
                  /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-muted-foreground flex items-center gap-1 font-mono cursor-help", children: [
                    /* @__PURE__ */ e.jsx(Tn, { className: "h-3 w-3" }),
                    " TARGET RETURN",
                    /* @__PURE__ */ e.jsx(Ge, { className: "h-3 w-3 ml-1 opacity-50" })
                  ] }) }),
                  /* @__PURE__ */ e.jsx(xt, { side: "right", className: "max-w-xs", children: /* @__PURE__ */ e.jsx("p", { className: "text-xs", children: "Your goal return %. The simulation will show probability of hitting this target." }) })
                ] }) }),
                /* @__PURE__ */ e.jsx(Pn, { type: "number", value: l, onChange: (ae) => c(parseFloat(ae.target.value) || 0), className: "h-8 font-mono" })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ e.jsx(q, { className: "text-xs text-muted-foreground font-mono", children: "VIEW MODE" }),
                /* @__PURE__ */ e.jsxs(Jt, { value: d, onValueChange: (ae) => x(ae), children: [
                  /* @__PURE__ */ e.jsx(es, { className: "h-8 font-mono", children: /* @__PURE__ */ e.jsx(ts, {}) }),
                  /* @__PURE__ */ e.jsxs(ss, { children: [
                    /* @__PURE__ */ e.jsx(Qe, { value: "pnl", className: "font-mono", children: "P&L ($)" }),
                    /* @__PURE__ */ e.jsx(Qe, { value: "return", className: "font-mono", children: "Return (%)" }),
                    /* @__PURE__ */ e.jsx(Qe, { value: "price", className: "font-mono", children: "Price" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ e.jsx(q, { className: "text-xs text-muted-foreground font-mono", children: "TIME HORIZON" }),
                /* @__PURE__ */ e.jsxs(Jt, { value: t.timeHorizon.toString(), onValueChange: (ae) => s((je) => ({ ...je, timeHorizon: parseInt(ae) })), children: [
                  /* @__PURE__ */ e.jsx(es, { className: "h-8 font-mono", children: /* @__PURE__ */ e.jsx(ts, {}) }),
                  /* @__PURE__ */ e.jsxs(ss, { children: [
                    /* @__PURE__ */ e.jsx(Qe, { value: "63", className: "font-mono", children: "3 Months" }),
                    /* @__PURE__ */ e.jsx(Qe, { value: "126", className: "font-mono", children: "6 Months" }),
                    /* @__PURE__ */ e.jsx(Qe, { value: "252", className: "font-mono", children: "1 Year" }),
                    /* @__PURE__ */ e.jsx(Qe, { value: "504", className: "font-mono", children: "2 Years" }),
                    /* @__PURE__ */ e.jsx(Qe, { value: "1260", className: "font-mono", children: "5 Years" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "pt-2 border-t border-border space-y-4", children: [
                /* @__PURE__ */ e.jsx("div", { className: "text-2xs text-muted-foreground font-mono uppercase tracking-wide", children: "Model Assumptions" }),
                /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
                    /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono cursor-help", children: [
                      /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                        "ENTRY PRICE",
                        /* @__PURE__ */ e.jsx(Ge, { className: "h-3 w-3 opacity-50" })
                      ] }),
                      /* @__PURE__ */ e.jsxs("span", { className: "text-xs text-foreground", children: [
                        "$",
                        t.initialPrice
                      ] })
                    ] }) }),
                    /* @__PURE__ */ e.jsx(xt, { side: "right", className: "max-w-xs", children: /* @__PURE__ */ e.jsx("p", { className: "text-xs", children: "Starting asset price. Could be a stock, ETF, crypto, commodity, or any tradeable asset." }) })
                  ] }) }),
                  /* @__PURE__ */ e.jsx(xe, { value: [t.initialPrice], onValueChange: ([ae]) => s((je) => ({ ...je, initialPrice: ae })), min: 10, max: 500, step: 10 })
                ] }),
                /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
                    /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono cursor-help", children: [
                      /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                        "EXPECTED RETURN",
                        /* @__PURE__ */ e.jsx(Ge, { className: "h-3 w-3 opacity-50" })
                      ] }),
                      /* @__PURE__ */ e.jsxs("span", { className: "text-xs text-foreground", children: [
                        (t.drift * 100).toFixed(0),
                        "%/yr"
                      ] })
                    ] }) }),
                    /* @__PURE__ */ e.jsx(xt, { side: "right", className: "max-w-xs", children: /* @__PURE__ */ e.jsx("p", { className: "text-xs", children: "Annual expected return (μ). Historical S&P500 ~8-10%, Bitcoin ~50-100%, Bonds ~3-5%." }) })
                  ] }) }),
                  /* @__PURE__ */ e.jsx(xe, { value: [t.drift * 100], onValueChange: ([ae]) => s((je) => ({ ...je, drift: ae / 100 })), min: -20, max: 50, step: 1 })
                ] }),
                /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
                    /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono cursor-help", children: [
                      /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                        "VOLATILITY",
                        /* @__PURE__ */ e.jsx(Ge, { className: "h-3 w-3 opacity-50" })
                      ] }),
                      /* @__PURE__ */ e.jsxs("span", { className: "text-xs text-foreground", children: [
                        (t.volatility * 100).toFixed(0),
                        "%"
                      ] })
                    ] }) }),
                    /* @__PURE__ */ e.jsx(xt, { side: "right", className: "max-w-xs", children: /* @__PURE__ */ e.jsx("p", { className: "text-xs", children: "Annual volatility (σ). Higher = more risk. S&P500 ~15-20%, crypto ~50-80%, bonds ~5-10%." }) })
                  ] }) }),
                  /* @__PURE__ */ e.jsx(xe, { value: [t.volatility * 100], onValueChange: ([ae]) => s((je) => ({ ...je, volatility: ae / 100 })), min: 5, max: 80, step: 5 })
                ] }),
                /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
                    /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono cursor-help", children: [
                      /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                        "SIMULATIONS",
                        /* @__PURE__ */ e.jsx(Ge, { className: "h-3 w-3 opacity-50" })
                      ] }),
                      /* @__PURE__ */ e.jsx("span", { className: "text-xs text-foreground", children: t.numSimulations })
                    ] }) }),
                    /* @__PURE__ */ e.jsx(xt, { side: "right", className: "max-w-xs", children: /* @__PURE__ */ e.jsx("p", { className: "text-xs", children: "Number of random scenarios to simulate. More = better statistics but slower rendering." }) })
                  ] }) }),
                  /* @__PURE__ */ e.jsx(xe, { value: [t.numSimulations], onValueChange: ([ae]) => s((je) => ({ ...je, numSimulations: ae })), min: 25, max: 200, step: 25 })
                ] }),
                /* @__PURE__ */ e.jsx(
                  le,
                  {
                    onClick: De,
                    disabled: V,
                    className: "w-full bg-[#343434] hover:bg-[#3a3a3a] text-foreground font-mono",
                    children: V ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                      /* @__PURE__ */ e.jsx(Da, { className: "mr-2 h-4 w-4 animate-spin" }),
                      "COMPUTING..."
                    ] }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                      /* @__PURE__ */ e.jsx(Bt, { className: "mr-2 h-4 w-4" }),
                      "RUN SIMULATION"
                    ] })
                  }
                )
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ e.jsxs($e, { open: R, onOpenChange: T, children: [
            /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card font-mono text-xs text-foreground hover:text-foreground", children: [
              /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ e.jsx(Pt, { className: "h-4 w-4" }),
                " DISPLAY"
              ] }),
              R ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
            ] }) }),
            /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-4 text-foreground", children: [
              /* @__PURE__ */ e.jsx(qt, { value: v.id, onChange: $ }),
              /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ e.jsx("div", { className: "text-2xs text-muted-foreground font-mono uppercase tracking-wide", children: "Chart Elements" }),
                /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between p-1.5 rounded-md hover:bg-muted/50 transition-colors", children: [
                  /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-muted-foreground font-mono flex items-center gap-2", children: [
                    /* @__PURE__ */ e.jsx(gn, { className: "h-3.5 w-3.5" }),
                    "Fan Chart"
                  ] }),
                  /* @__PURE__ */ e.jsx(Me, { checked: u, onCheckedChange: N })
                ] }),
                /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between p-1.5 rounded-md hover:bg-muted/50 transition-colors", children: [
                  /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-muted-foreground font-mono flex items-center gap-2", children: [
                    /* @__PURE__ */ e.jsx(Ln, { className: "h-3.5 w-3.5" }),
                    "Individual Paths"
                  ] }),
                  /* @__PURE__ */ e.jsx(Me, { checked: b, onCheckedChange: P })
                ] }),
                /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between p-1.5 rounded-md hover:bg-muted/50 transition-colors", children: [
                  /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-muted-foreground font-mono flex items-center gap-2", children: [
                    /* @__PURE__ */ e.jsx(gn, { className: "h-3.5 w-3.5" }),
                    "Histogram"
                  ] }),
                  /* @__PURE__ */ e.jsx(Me, { checked: _, onCheckedChange: se })
                ] }),
                /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between p-1.5 rounded-md hover:bg-muted/50 transition-colors", children: [
                  /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-muted-foreground font-mono flex items-center gap-2", children: [
                    /* @__PURE__ */ e.jsx(ha, { className: "h-3.5 w-3.5" }),
                    "Crosshair"
                  ] }),
                  /* @__PURE__ */ e.jsx(Me, { checked: ee, onCheckedChange: E })
                ] }),
                /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between p-1.5 rounded-md hover:bg-muted/50 transition-colors", children: [
                  /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-muted-foreground font-mono flex items-center gap-2", children: [
                    /* @__PURE__ */ e.jsx(Tn, { className: "h-3.5 w-3.5" }),
                    "Target Line"
                  ] }),
                  /* @__PURE__ */ e.jsx(Me, { checked: S, onCheckedChange: h })
                ] }),
                /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between p-1.5 rounded-md hover:bg-muted/50 transition-colors", children: [
                  /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-muted-foreground font-mono flex items-center gap-2", children: [
                    /* @__PURE__ */ e.jsx(Ln, { className: "h-3.5 w-3.5" }),
                    "Median Line"
                  ] }),
                  /* @__PURE__ */ e.jsx(Me, { checked: y, onCheckedChange: w })
                ] }),
                /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between p-1.5 rounded-md hover:bg-muted/50 transition-colors", children: [
                  /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-muted-foreground font-mono flex items-center gap-2", children: [
                    /* @__PURE__ */ e.jsx(En, { className: "h-3.5 w-3.5" }),
                    "Break-Even Line"
                  ] }),
                  /* @__PURE__ */ e.jsx(Me, { checked: M, onCheckedChange: Y })
                ] })
              ] }),
              b && /* @__PURE__ */ e.jsxs("div", { className: "space-y-2 pt-2 border-t border-border", children: [
                /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
                  /* @__PURE__ */ e.jsx(q, { className: "text-xs text-muted-foreground", children: "Path Opacity" }),
                  /* @__PURE__ */ e.jsxs("span", { className: "text-xs", children: [
                    (f * 100).toFixed(0),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ e.jsx(xe, { value: [f * 100], onValueChange: ([ae]) => k(ae / 100), min: 5, max: 50, step: 5 })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "pt-3 border-t border-border space-y-3", children: [
                /* @__PURE__ */ e.jsx("div", { className: "text-2xs text-muted-foreground font-mono uppercase tracking-wide", children: "Path Tracking" }),
                /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors", children: [
                  /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
                    /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-muted-foreground font-mono flex items-center gap-2 cursor-help", children: [
                      /* @__PURE__ */ e.jsx(Oa, { className: "h-3.5 w-3.5" }),
                      "Highlight Only",
                      /* @__PURE__ */ e.jsx(Ge, { className: "h-3 w-3 opacity-40" })
                    ] }) }),
                    /* @__PURE__ */ e.jsx(xt, { side: "right", className: "max-w-xs", children: /* @__PURE__ */ e.jsx("p", { className: "text-xs", children: "When enabled, only selected paths are visible. Others are hidden." }) })
                  ] }) }),
                  /* @__PURE__ */ e.jsx(Me, { checked: Re, onCheckedChange: Se })
                ] }),
                /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
                    /* @__PURE__ */ e.jsx(q, { className: "text-xs text-muted-foreground", children: "# of Paths to Track" }),
                    /* @__PURE__ */ e.jsx("span", { className: "text-xs", children: me })
                  ] }),
                  /* @__PURE__ */ e.jsx(
                    xe,
                    {
                      value: [me],
                      onValueChange: ([ae]) => be(ae),
                      min: 1,
                      max: 20,
                      step: 1
                    }
                  )
                ] }),
                /* @__PURE__ */ e.jsxs(
                  le,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: Je,
                    className: "w-full gap-2 text-xs font-mono",
                    children: [
                      /* @__PURE__ */ e.jsx(Js, { className: "h-3 w-3" }),
                      " Pick Random Paths"
                    ]
                  }
                ),
                ne.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "flex flex-wrap gap-1", children: ne.map((ae, je) => {
                  const ye = ["#f0426c", "#21b3a4", "#c58435", "#e8e8e8", "#8f86ad", "#7da0a8", "#b0748f", "#96a86e"];
                  return /* @__PURE__ */ e.jsxs(
                    "button",
                    {
                      onClick: () => H((Ve) => Ve.filter((_e) => _e !== ae)),
                      className: "text-2xs px-1.5 py-0.5 rounded font-mono hover:opacity-70 transition-opacity cursor-pointer flex items-center gap-1",
                      style: { backgroundColor: `${ye[je % ye.length]}33`, color: ye[je % ye.length] },
                      title: "Click to remove",
                      children: [
                        "#",
                        ae + 1,
                        " ×"
                      ]
                    },
                    ae
                  );
                }) })
              ] })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "absolute right-4 top-20 w-52 pointer-events-auto max-h-[calc(100%-120px)] overflow-y-auto", children: /* @__PURE__ */ e.jsxs($e, { open: I, onOpenChange: F, children: [
          /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card font-mono text-xs text-foreground hover:text-foreground", children: [
            /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4" }),
              " OUTCOMES"
            ] }),
            I ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
          ] }) }),
          /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-3 bg-card border-border space-y-3 max-h-[400px] overflow-y-auto text-foreground", children: [
            /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mb-1 font-mono", children: [
                /* @__PURE__ */ e.jsx("span", { className: "text-xs text-muted-foreground", children: "P(PROFIT)" }),
                /* @__PURE__ */ e.jsxs("span", { className: `text-sm font-bold ${we.winRate >= 0.5 ? "text-[#21b3a4]" : "text-[#f0426c]"}`, children: [
                  (we.winRate * 100).toFixed(0),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ e.jsx("div", { className: "w-full bg-muted h-1.5 rounded", children: /* @__PURE__ */ e.jsx("div", { className: `h-full rounded ${we.winRate >= 0.5 ? "bg-[#21b3a4]" : "bg-[#f0426c]"}`, style: { width: `${we.winRate * 100}%` } }) })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mb-1 font-mono", children: [
                /* @__PURE__ */ e.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "P(+",
                  l,
                  "%)"
                ] }),
                /* @__PURE__ */ e.jsxs("span", { className: `text-sm font-bold ${we.probTarget >= 0.5 ? "text-[#21b3a4]" : "text-[#c58435]"}`, children: [
                  (we.probTarget * 100).toFixed(0),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ e.jsx("div", { className: "w-full bg-muted h-1.5 rounded", children: /* @__PURE__ */ e.jsx("div", { className: "h-full rounded bg-[#b0b0b0]", style: { width: `${we.probTarget * 100}%` } }) })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx("span", { className: "text-xs text-muted-foreground", children: "E[PORTFOLIO]" }),
              /* @__PURE__ */ e.jsxs("span", { className: `text-sm ${we.expectedPortfolio > r ? "text-[#21b3a4]" : "text-[#f0426c]"}`, children: [
                "$",
                we.expectedPortfolio.toLocaleString(void 0, { maximumFractionDigits: 0 })
              ] })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "pt-2 border-t border-border space-y-2 font-mono", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ e.jsx("span", { className: "text-xs text-muted-foreground", children: "VaR 5%" }),
                /* @__PURE__ */ e.jsx("span", { className: "text-sm text-[#f0426c]", children: Vt(we.p5) })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ e.jsx("span", { className: "text-xs text-muted-foreground", children: "MEDIAN" }),
                /* @__PURE__ */ e.jsx("span", { className: "text-sm text-[#e8e8e8]", children: Vt(we.p50) })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ e.jsx("span", { className: "text-xs text-muted-foreground", children: "95th" }),
                /* @__PURE__ */ e.jsx("span", { className: "text-sm text-[#21b3a4]", children: Vt(we.p95) })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ e.jsx("span", { className: "text-xs text-muted-foreground", children: "STD DEV" }),
                /* @__PURE__ */ e.jsx("span", { className: "text-sm text-muted-foreground", children: Vt(we.stdDev) })
              ] })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "pt-2 border-t border-border space-y-2", children: [
              /* @__PURE__ */ e.jsx("div", { className: "text-xs text-muted-foreground font-mono mb-2", children: "TOP PERFORMERS" }),
              we.top5Paths.slice(0, 3).map((ae, je) => /* @__PURE__ */ e.jsxs(
                "button",
                {
                  onClick: () => H(
                    (ye) => ye.includes(ae.index) ? ye.filter((Ve) => Ve !== ae.index) : [...ye, ae.index]
                  ),
                  className: `w-full flex items-center justify-between p-1.5 rounded text-xs font-mono transition-all ${ne.includes(ae.index) ? "bg-[#262626] border border-border" : "hover:bg-muted/50"}`,
                  children: [
                    /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e.jsx("span", { className: "w-3 h-3 rounded-full", style: { backgroundColor: ae.color } }),
                      /* @__PURE__ */ e.jsxs("span", { className: "text-muted-foreground", children: [
                        "#",
                        ae.index + 1
                      ] }),
                      je === 0 && /* @__PURE__ */ e.jsx("span", { className: "text-[9px] px-1 py-0.5 rounded bg-[#262626] border border-border text-[#21b3a4]", children: "BEST" })
                    ] }),
                    /* @__PURE__ */ e.jsx("span", { className: "text-[#21b3a4] font-semibold", children: Vt(ae.finalValue) })
                  ]
                },
                ae.index
              )),
              /* @__PURE__ */ e.jsx("div", { className: "text-xs text-muted-foreground font-mono mt-3 mb-2", children: "WORST PERFORMERS" }),
              we.bottom5Paths.slice(0, 3).map((ae, je) => /* @__PURE__ */ e.jsxs(
                "button",
                {
                  onClick: () => H(
                    (ye) => ye.includes(ae.index) ? ye.filter((Ve) => Ve !== ae.index) : [...ye, ae.index]
                  ),
                  className: `w-full flex items-center justify-between p-1.5 rounded text-xs font-mono transition-all ${ne.includes(ae.index) ? "bg-[#262626] border border-border" : "hover:bg-muted/50"}`,
                  children: [
                    /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e.jsx("span", { className: "w-3 h-3 rounded-full", style: { backgroundColor: ae.color } }),
                      /* @__PURE__ */ e.jsxs("span", { className: "text-muted-foreground", children: [
                        "#",
                        ae.index + 1
                      ] }),
                      je === 0 && /* @__PURE__ */ e.jsx("span", { className: "text-[9px] px-1 py-0.5 rounded bg-[#262626] border border-border text-[#f0426c]", children: "WORST" })
                    ] }),
                    /* @__PURE__ */ e.jsx("span", { className: "text-[#f0426c] font-semibold", children: Vt(ae.finalValue) })
                  ]
                },
                ae.index
              )),
              /* @__PURE__ */ e.jsxs(
                "button",
                {
                  onClick: () => H(
                    (ae) => ae.includes(we.medianPath.index) ? ae.filter((je) => je !== we.medianPath.index) : [...ae, we.medianPath.index]
                  ),
                  className: `w-full flex items-center justify-between p-1.5 rounded text-xs font-mono transition-all mt-2 ${ne.includes(we.medianPath.index) ? "bg-[#262626] border border-border" : "hover:bg-muted/50"}`,
                  children: [
                    /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e.jsx("span", { className: "w-3 h-3 rounded-full", style: { backgroundColor: we.medianPath.color } }),
                      /* @__PURE__ */ e.jsxs("span", { className: "text-muted-foreground", children: [
                        "#",
                        we.medianPath.index + 1
                      ] }),
                      /* @__PURE__ */ e.jsx("span", { className: "text-[9px] px-1 py-0.5 rounded bg-[#262626] border border-border text-[#b0b0b0]", children: "MEDIAN" })
                    ] }),
                    /* @__PURE__ */ e.jsx("span", { className: "text-[#e8e8e8] font-semibold", children: Vt(we.medianPath.finalValue) })
                  ]
                }
              )
            ] }),
            ne.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "pt-2 border-t border-border", children: /* @__PURE__ */ e.jsxs(
              le,
              {
                variant: "outline",
                size: "sm",
                onClick: () => H([]),
                className: "w-full text-xs font-mono",
                children: [
                  "Clear ",
                  ne.length,
                  " Selected"
                ]
              }
            ) }),
            /* @__PURE__ */ e.jsxs("div", { className: "pt-2 border-t border-border", children: [
              /* @__PURE__ */ e.jsx("div", { className: "flex h-3 rounded overflow-hidden", children: v.colors.slice(0, 5).map((ae, je) => /* @__PURE__ */ e.jsx("div", { className: "flex-1", style: { backgroundColor: ae } }, je)) }),
              /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mt-1 font-mono", children: [
                /* @__PURE__ */ e.jsx("span", { children: "LOSS" }),
                /* @__PURE__ */ e.jsx("span", { children: "GAIN" })
              ] })
            ] })
          ] }) })
        ] }) }),
        /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-card rounded-lg px-4 py-2 border border-border flex items-center gap-4 text-xs text-muted-foreground font-mono text-foreground", children: [
          /* @__PURE__ */ e.jsx("span", { children: "Scroll: Zoom" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
          /* @__PURE__ */ e.jsx("span", { children: "Drag: Pan" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-xs px-1.5 py-0.5 rounded bg-[#343434] text-foreground", children: [
            (L * 100).toFixed(0),
            "%"
          ] })
        ] }) })
      ]
    }
  );
}
function or(t) {
  let s = 0, n = 0;
  for (; s === 0; ) s = Math.random();
  for (; n === 0; ) n = Math.random();
  const o = Math.sqrt(-2 * Math.log(s)) * Math.cos(2 * Math.PI * n), r = Math.sqrt(-2 * Math.log(s)) * Math.sin(2 * Math.PI * n);
  return [o, t * o + Math.sqrt(1 - t * t) * r];
}
function ir() {
  const [t, s] = a.useState({
    spotPrice: 100,
    v0: 0.04,
    kappa: 2,
    theta: 0.04,
    sigma: 0.3,
    rho: -0.7,
    T: 1,
    numPaths: 100
  }), [n, o] = a.useState(!1), [r, i] = a.useState(1), [l, c] = a.useState(!0), [d, x] = a.useState(!0), [p, C] = a.useState(!0), [m, j] = a.useState($t[4]), [u, N] = a.useState(0.2), [b, P] = a.useState(!0), [f, k] = a.useState(!1), [v, $] = a.useState(!0), [A, z] = a.useState(1), [R, T] = a.useState(0), [I, F] = a.useState(0), [S, h] = a.useState(!1), [y, w] = a.useState(!0), [M, Y] = a.useState(null), [_, se] = a.useState(null), [V, W] = a.useState(!1), te = a.useRef(null), O = a.useRef(null), L = a.useRef(null), D = a.useRef(null), X = a.useRef(r), B = a.useRef({ x: 0, y: 0 }), g = 252, oe = a.useCallback(() => {
    !document.fullscreenElement && O.current ? O.current.requestFullscreen().catch(() => {
      W((ie) => !ie);
    }) : document.fullscreenElement ? document.exitFullscreen() : W((ie) => !ie);
  }, []);
  a.useEffect(() => {
    const ie = () => {
      W(!!document.fullscreenElement);
    };
    return document.addEventListener("fullscreenchange", ie), () => document.removeEventListener("fullscreenchange", ie);
  }, []);
  const { paths: re, pricePercentiles: U, volPercentiles: ee } = a.useMemo(() => {
    const ie = [], he = t.T / g, Te = [], Ce = [];
    for (let nt = 0; nt < t.numPaths; nt++) {
      const at = [], Je = [];
      let Ct = t.spotPrice, Rt = t.v0;
      for (let ys = 0; ys <= g; ys++)
        if (at.push(Ct), Je.push(Math.sqrt(Math.max(Rt, 0)) * 100), ys < g) {
          const [en, zs] = or(t.rho), Ns = Math.max(Rt, 0), Vs = Math.sqrt(Ns);
          Ct = Ct * Math.exp(-0.5 * Ns * he + Vs * Math.sqrt(he) * en), Rt = Rt + t.kappa * (t.theta - Ns) * he + t.sigma * Vs * Math.sqrt(he) * zs, Rt = Math.max(Rt, 1e-4);
        }
      Te.push(at), Ce.push(Je), ie.push({ prices: at, vols: Je, finalPrice: Ct, finalVol: Math.sqrt(Rt) * 100, color: "" });
    }
    const Ne = { p5: [], p25: [], p50: [], p75: [], p95: [] }, Oe = { p5: [], p25: [], p50: [], p75: [], p95: [] };
    for (let nt = 0; nt <= g; nt++) {
      const at = Te.map((Ct) => Ct[nt]).sort((Ct, Rt) => Ct - Rt), Je = Ce.map((Ct) => Ct[nt]).sort((Ct, Rt) => Ct - Rt);
      Ne.p5.push(at[Math.floor(at.length * 0.05)]), Ne.p25.push(at[Math.floor(at.length * 0.25)]), Ne.p50.push(at[Math.floor(at.length * 0.5)]), Ne.p75.push(at[Math.floor(at.length * 0.75)]), Ne.p95.push(at[Math.floor(at.length * 0.95)]), Oe.p5.push(Je[Math.floor(Je.length * 0.05)]), Oe.p25.push(Je[Math.floor(Je.length * 0.25)]), Oe.p50.push(Je[Math.floor(Je.length * 0.5)]), Oe.p75.push(Je[Math.floor(Je.length * 0.75)]), Oe.p95.push(Je[Math.floor(Je.length * 0.95)]);
    }
    const Ye = ie.map((nt) => nt.finalPrice), st = Math.min(...Ye), ht = Math.max(...Ye);
    return ie.forEach((nt) => {
      nt.color = m.getColor(nt.finalPrice, st, ht);
    }), { paths: ie, pricePercentiles: Ne, volPercentiles: Oe };
  }, [t, m, g]), E = a.useMemo(() => {
    const ie = re.map((st) => st.finalPrice), he = re.map((st) => st.finalVol), Te = ie.reduce((st, ht) => st + ht, 0) / ie.length, Ce = he.reduce((st, ht) => st + ht, 0) / he.length, Ne = [...ie].sort((st, ht) => st - ht), Oe = 2 * t.kappa * t.theta / (t.sigma * t.sigma), Ye = ie.filter((st) => st > t.spotPrice).length / ie.length;
    return {
      meanPrice: Te,
      meanVol: Ce,
      var5: Ne[Math.floor(Ne.length * 0.05)],
      var95: Ne[Math.floor(Ne.length * 0.95)],
      fellerRatio: Oe,
      fellerSatisfied: Oe >= 1,
      winRate: Ye
    };
  }, [re, t]), G = 1e3, J = 550, K = { top: 30, right: 60, bottom: 30, left: 70 }, ue = { top: 10, right: 60, bottom: 50, left: 70 }, ce = 320, Q = 140, ne = G - K.left - K.right, { priceYScale: H, volYScale: me, xScale: be, priceYMin: Re, priceYMax: Se, volYMin: We, volYMax: Be, inverseXScale: Z } = a.useMemo(() => {
    const ie = re.flatMap((Je) => Je.prices), he = re.flatMap((Je) => Je.vols), Te = Math.min(...ie) * 0.95, Ce = Math.max(...ie) * 1.05, Ne = Math.min(...he) * 0.9, Oe = Math.max(...he) * 1.1, Ye = g, st = Ye / A, ht = Ye / 2 + R * Ye, nt = ht - st / 2, at = ht + st / 2;
    return {
      xScale: (Je) => K.left + (Je - nt) / (at - nt) * ne,
      inverseXScale: (Je) => nt + (Je - K.left) / ne * (at - nt),
      priceYScale: (Je) => K.top + ce - (Je - Te) / (Ce - Te) * ce,
      volYScale: (Je) => K.top + ce + ue.top + Q - (Je - Ne) / (Oe - Ne) * Q,
      priceYMin: Te,
      priceYMax: Ce,
      volYMin: Ne,
      volYMax: Oe
    };
  }, [re, g, ne, A, R, K, ce, ue, Q]), pe = a.useRef(!1);
  a.useEffect(() => {
    const ie = O.current;
    if (!ie) return;
    const he = (Ne) => {
      if (!pe.current) return;
      Ne.preventDefault(), Ne.stopPropagation();
      const Oe = Ne.deltaY > 0 ? 0.9 : 1.1;
      z((Ye) => Math.max(0.5, Math.min(5, Ye * Oe)));
    }, Te = () => {
      pe.current = !0;
    }, Ce = () => {
      pe.current = !1;
    };
    return document.addEventListener("wheel", he, { passive: !1 }), ie.addEventListener("mouseenter", Te), ie.addEventListener("mouseleave", Ce), () => {
      document.removeEventListener("wheel", he), ie.removeEventListener("mouseenter", Te), ie.removeEventListener("mouseleave", Ce);
    };
  }, []);
  const Ze = a.useCallback((ie) => {
    h(!0), B.current = { x: ie.clientX, y: ie.clientY }, ie.preventDefault();
  }, []), de = a.useCallback((ie) => {
    if (S) {
      const he = (ie.clientX - B.current.x) / (ne * A) * 2;
      T((Te) => Te - he), B.current = { x: ie.clientX, y: ie.clientY };
      return;
    }
    if (te.current && y) {
      const he = te.current.getBoundingClientRect(), Te = G / he.width, Ce = J / he.height, Ne = (ie.clientX - he.left) * Te, Oe = (ie.clientY - he.top) * Ce;
      if (Ne >= K.left && Ne <= K.left + ne) {
        Y({ x: Ne, y: Oe });
        const Ye = Math.max(0, Math.min(g, Math.round(Z(Ne))));
        se({
          time: Ye,
          priceP50: U.p50[Ye] || 0,
          volP50: ee.p50[Ye] || 0
        });
      } else
        Y(null), se(null);
    }
  }, [S, ne, A, G, J, K, y, Z, g, U, ee]), ve = a.useCallback(() => h(!1), []), Xe = a.useCallback(() => {
    h(!1), Y(null), se(null);
  }, []), He = a.useCallback(() => {
    X.current < 1 ? (X.current = Math.min(X.current + 0.015, 1), i(X.current), D.current = requestAnimationFrame(He)) : o(!1);
  }, []), De = () => {
    r >= 1 && (X.current = 0, i(0)), o(!0), D.current = requestAnimationFrame(He);
  }, Ee = () => {
    o(!1), D.current && cancelAnimationFrame(D.current);
  }, Pe = () => {
    X.current = 0, i(0), De();
  }, we = () => {
    z(1), T(0), F(0);
  }, ft = Math.floor(g * r), dt = (ie, he, Te) => {
    const Ce = Math.min(ft, ie.length - 1);
    let Ne = `M ${be(0)} ${Te(ie[0])}`;
    for (let Oe = 1; Oe <= Ce; Oe++) Ne += ` L ${be(Oe)} ${Te(ie[Oe])}`;
    for (let Oe = Ce; Oe >= 0; Oe--) Ne += ` L ${be(Oe)} ${Te(he[Oe])}`;
    return Ne += " Z", Ne;
  }, tt = [0, 0.25, 0.5, 0.75, 1].map((ie) => ({ value: Math.floor(g * ie), label: `${(ie * t.T * 12).toFixed(0)}M` }));
  return /* @__PURE__ */ e.jsxs(
    "div",
    {
      ref: O,
      className: `relative w-full bg-background rounded-lg overflow-hidden border border-border ${V ? "h-screen" : "h-[calc(100vh-180px)] min-h-[600px]"}`,
      style: { touchAction: "none", overscrollBehavior: "none" },
      children: [
        /* @__PURE__ */ e.jsx(
          "div",
          {
            ref: L,
            className: "absolute inset-0 flex items-center justify-center",
            style: {
              background: "var(--bg, #1c1c1c)",
              touchAction: "none",
              overscrollBehavior: "none"
            },
            onMouseDown: Ze,
            onMouseMove: de,
            onMouseUp: ve,
            onMouseLeave: Xe,
            children: /* @__PURE__ */ e.jsxs("svg", { ref: te, viewBox: `0 0 ${G} ${J}`, className: "w-full h-full max-w-[1400px]", preserveAspectRatio: "xMidYMid meet", style: { cursor: S ? "grabbing" : "crosshair" }, children: [
              /* @__PURE__ */ e.jsxs("defs", { children: [
                /* @__PURE__ */ e.jsxs("linearGradient", { id: "priceFan95", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                  /* @__PURE__ */ e.jsx("stop", { offset: "0%", stopColor: "#e8e8e8", stopOpacity: "0.15" }),
                  /* @__PURE__ */ e.jsx("stop", { offset: "100%", stopColor: "#e8e8e8", stopOpacity: "0.05" })
                ] }),
                /* @__PURE__ */ e.jsxs("linearGradient", { id: "priceFan50", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                  /* @__PURE__ */ e.jsx("stop", { offset: "0%", stopColor: "#e8e8e8", stopOpacity: "0.3" }),
                  /* @__PURE__ */ e.jsx("stop", { offset: "100%", stopColor: "#e8e8e8", stopOpacity: "0.1" })
                ] }),
                /* @__PURE__ */ e.jsxs("linearGradient", { id: "volFan95", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                  /* @__PURE__ */ e.jsx("stop", { offset: "0%", stopColor: "#c58435", stopOpacity: "0.15" }),
                  /* @__PURE__ */ e.jsx("stop", { offset: "100%", stopColor: "#c58435", stopOpacity: "0.05" })
                ] }),
                /* @__PURE__ */ e.jsxs("linearGradient", { id: "volFan50", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                  /* @__PURE__ */ e.jsx("stop", { offset: "0%", stopColor: "#c58435", stopOpacity: "0.3" }),
                  /* @__PURE__ */ e.jsx("stop", { offset: "100%", stopColor: "#c58435", stopOpacity: "0.1" })
                ] })
              ] }),
              /* @__PURE__ */ e.jsx("clipPath", { id: "priceClip", children: /* @__PURE__ */ e.jsx("rect", { x: K.left, y: K.top, width: ne, height: ce }) }),
              /* @__PURE__ */ e.jsx("clipPath", { id: "volClip", children: /* @__PURE__ */ e.jsx("rect", { x: K.left, y: K.top + ce + ue.top, width: ne, height: Q }) }),
              /* @__PURE__ */ e.jsxs("g", { children: [
                Array.from({ length: 4 }).map((ie, he) => {
                  const Te = K.top + ce / 3 * he, Ce = Se - (Se - Re) / 3 * he;
                  return /* @__PURE__ */ e.jsxs("g", { children: [
                    /* @__PURE__ */ e.jsx("line", { x1: K.left, y1: Te, x2: K.left + ne, y2: Te, stroke: "#2e2e2e", strokeWidth: 1 }),
                    /* @__PURE__ */ e.jsxs("text", { x: K.left - 12, y: Te + 4, textAnchor: "end", fill: "var(--dim, #b0b0b0)", fontSize: 12, fontFamily: "monospace", fontWeight: "500", children: [
                      "$",
                      Ce.toFixed(0)
                    ] })
                  ] }, `price-grid-${he}`);
                }),
                /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#priceClip)", children: [
                  p && ft > 0 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                    /* @__PURE__ */ e.jsx("path", { d: dt(U.p95, U.p5, H), fill: "url(#priceFan95)" }),
                    /* @__PURE__ */ e.jsx("path", { d: dt(U.p75, U.p25, H), fill: "url(#priceFan50)" })
                  ] }),
                  /* @__PURE__ */ e.jsx("line", { x1: K.left, y1: H(t.spotPrice), x2: K.left + ne, y2: H(t.spotPrice), stroke: "var(--dim, #b0b0b0)", strokeWidth: 1.5, strokeDasharray: "6,4" }),
                  d && re.map((ie, he) => {
                    const Te = Math.min(ft, ie.prices.length - 1);
                    if (Te < 1) return null;
                    let Ce = `M ${be(0)} ${H(ie.prices[0])}`;
                    for (let Ne = 1; Ne <= Te; Ne++) Ce += ` L ${be(Ne)} ${H(ie.prices[Ne])}`;
                    return /* @__PURE__ */ e.jsx("path", { d: Ce, fill: "none", stroke: ie.color, strokeWidth: 1, opacity: u }, he);
                  }),
                  ft > 0 && /* @__PURE__ */ e.jsx("path", { d: `M ${be(0)} ${H(U.p50[0])} ${U.p50.slice(1, ft + 1).map((ie, he) => `L ${be(he + 1)} ${H(ie)}`).join(" ")}`, fill: "none", stroke: "#e8e8e8", strokeWidth: 2.5 })
                ] }),
                /* @__PURE__ */ e.jsx("text", { x: K.left + ne + 10, y: H(t.spotPrice) + 4, fill: "var(--dim, #b0b0b0)", fontSize: 11, fontFamily: "monospace", fontWeight: "500", children: "S₀" }),
                /* @__PURE__ */ e.jsx("text", { x: 18, y: K.top + ce / 2, textAnchor: "middle", fill: "var(--dim, #b0b0b0)", fontSize: 12, fontFamily: "monospace", fontWeight: "500", transform: `rotate(-90, 18, ${K.top + ce / 2})`, children: "PRICE ($)" })
              ] }),
              /* @__PURE__ */ e.jsxs("g", { children: [
                /* @__PURE__ */ e.jsx("line", { x1: K.left, y1: K.top + ce + 5, x2: K.left + ne, y2: K.top + ce + 5, stroke: "#2e2e2e", strokeWidth: 1 }),
                Array.from({ length: 3 }).map((ie, he) => {
                  const Te = K.top + ce + ue.top + Q / 2 * he, Ce = Be - (Be - We) / 2 * he;
                  return /* @__PURE__ */ e.jsxs("g", { children: [
                    /* @__PURE__ */ e.jsx("line", { x1: K.left, y1: Te, x2: K.left + ne, y2: Te, stroke: "#2e2e2e", strokeWidth: 1 }),
                    /* @__PURE__ */ e.jsxs("text", { x: K.left - 12, y: Te + 4, textAnchor: "end", fill: "var(--dim, #b0b0b0)", fontSize: 12, fontFamily: "monospace", fontWeight: "500", children: [
                      Ce.toFixed(0),
                      "%"
                    ] })
                  ] }, `vol-grid-${he}`);
                }),
                /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#volClip)", children: [
                  p && l && ft > 0 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                    /* @__PURE__ */ e.jsx("path", { d: dt(ee.p95, ee.p5, me), fill: "url(#volFan95)" }),
                    /* @__PURE__ */ e.jsx("path", { d: dt(ee.p75, ee.p25, me), fill: "url(#volFan50)" })
                  ] }),
                  /* @__PURE__ */ e.jsx("line", { x1: K.left, y1: me(Math.sqrt(t.theta) * 100), x2: K.left + ne, y2: me(Math.sqrt(t.theta) * 100), stroke: "#c58435", strokeWidth: 1.5, strokeDasharray: "6,4" }),
                  l && re.map((ie, he) => {
                    const Te = Math.min(ft, ie.vols.length - 1);
                    if (Te < 1) return null;
                    let Ce = `M ${be(0)} ${me(ie.vols[0])}`;
                    for (let Ne = 1; Ne <= Te; Ne++) Ce += ` L ${be(Ne)} ${me(ie.vols[Ne])}`;
                    return /* @__PURE__ */ e.jsx("path", { d: Ce, fill: "none", stroke: ie.color, strokeWidth: 1, opacity: u * 0.7 }, `vol-${he}`);
                  }),
                  l && ft > 0 && /* @__PURE__ */ e.jsx("path", { d: `M ${be(0)} ${me(ee.p50[0])} ${ee.p50.slice(1, ft + 1).map((ie, he) => `L ${be(he + 1)} ${me(ie)}`).join(" ")}`, fill: "none", stroke: "#c58435", strokeWidth: 2.5 })
                ] }),
                /* @__PURE__ */ e.jsx("text", { x: K.left + ne + 10, y: me(Math.sqrt(t.theta) * 100) + 4, fill: "#c58435", fontSize: 11, fontFamily: "monospace", fontWeight: "500", children: "√θ" }),
                /* @__PURE__ */ e.jsx("text", { x: 18, y: K.top + ce + ue.top + Q / 2, textAnchor: "middle", fill: "var(--dim, #b0b0b0)", fontSize: 12, fontFamily: "monospace", fontWeight: "500", transform: `rotate(-90, 18, ${K.top + ce + ue.top + Q / 2})`, children: "VOL (%)" })
              ] }),
              y && M && _ && /* @__PURE__ */ e.jsxs("g", { children: [
                /* @__PURE__ */ e.jsx("line", { x1: M.x, y1: K.top, x2: M.x, y2: K.top + ce + ue.top + Q, stroke: "rgba(176,176,176,0.5)", strokeWidth: 1, strokeDasharray: "4,4" }),
                M.y >= K.top && M.y <= K.top + ce && /* @__PURE__ */ e.jsx("line", { x1: K.left, y1: M.y, x2: K.left + ne, y2: M.y, stroke: "rgba(176,176,176,0.5)", strokeWidth: 1, strokeDasharray: "4,4" }),
                M.y >= K.top + ce + ue.top && M.y <= K.top + ce + ue.top + Q && /* @__PURE__ */ e.jsx("line", { x1: K.left, y1: M.y, x2: K.left + ne, y2: M.y, stroke: "rgba(176,176,176,0.5)", strokeWidth: 1, strokeDasharray: "4,4" }),
                /* @__PURE__ */ e.jsx("circle", { cx: M.x, cy: M.y, r: 4, fill: "#e8e8e8" }),
                /* @__PURE__ */ e.jsx("circle", { cx: M.x, cy: H(_.priceP50), r: 4, fill: "#e8e8e8" }),
                /* @__PURE__ */ e.jsx("circle", { cx: M.x, cy: me(_.volP50), r: 4, fill: "#c58435" }),
                /* @__PURE__ */ e.jsxs("g", { transform: `translate(${M.x}, ${K.top + ce + ue.top + Q + 8})`, children: [
                  /* @__PURE__ */ e.jsx("rect", { x: -22, y: 0, width: 44, height: 20, rx: 4, fill: "var(--panel, #2a2a2a)", stroke: "var(--edge, #3a3a3a)", strokeWidth: 1.5 }),
                  /* @__PURE__ */ e.jsxs("text", { x: 0, y: 14, textAnchor: "middle", fill: "var(--text, #e8e8e8)", fontSize: 11, fontFamily: "monospace", fontWeight: "700", children: [
                    Math.round(_.time / 21),
                    "M"
                  ] })
                ] })
              ] }),
              tt.map(({ value: ie, label: he }) => /* @__PURE__ */ e.jsxs("g", { children: [
                /* @__PURE__ */ e.jsx("line", { x1: be(ie), y1: K.top, x2: be(ie), y2: K.top + ce + ue.top + Q, stroke: "#2e2e2e", strokeWidth: 1 }),
                /* @__PURE__ */ e.jsx("text", { x: be(ie), y: J - 8, textAnchor: "middle", fill: "var(--dim, #b0b0b0)", fontSize: 12, fontFamily: "monospace", fontWeight: "500", children: he })
              ] }, ie)),
              /* @__PURE__ */ e.jsx("text", { x: K.left + ne / 2, y: J, textAnchor: "middle", fill: "#808080", fontSize: 12, fontFamily: "monospace", fontWeight: "500", children: "TIME" })
            ] })
          }
        ),
        y && _ && M && /* @__PURE__ */ e.jsx("div", { className: "absolute top-16 left-1/2 -translate-x-1/2 pointer-events-none z-10", children: /* @__PURE__ */ e.jsx("div", { className: "bg-card rounded-lg px-5 py-2.5 border border-border", children: /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-8 text-sm font-mono", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "text-muted-foreground font-medium", children: [
            "T: ",
            /* @__PURE__ */ e.jsxs("span", { className: "text-white font-bold", children: [
              Math.round(_.time / 21),
              "M"
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-[var(--text)] font-semibold", children: [
            "PRICE: $",
            _.priceP50.toFixed(2)
          ] }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-[#c58435] font-semibold", children: [
            "VOL: ",
            _.volP50.toFixed(1),
            "%"
          ] })
        ] }) }) }),
        /* @__PURE__ */ e.jsxs("div", { className: "absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3 pointer-events-auto", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "bg-card rounded-lg px-4 py-2 border border-border flex items-center gap-2 text-white", children: [
              /* @__PURE__ */ e.jsx("span", { className: "font-semibold font-mono", children: "HESTON SV" }),
              /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
                /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4 text-muted-foreground cursor-help" }) }),
                /* @__PURE__ */ e.jsx(xt, { className: "max-w-sm font-mono", children: /* @__PURE__ */ e.jsx("p", { className: "text-sm", children: "dS = √v·S·dW₁, dv = κ(θ-v)dt + σ√v·dW₂" }) })
              ] }) })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: `px-3 py-1 rounded text-xs font-mono bg-[var(--bg2)] border border-[var(--edge)] ${E.fellerSatisfied ? "text-[var(--up)]" : "text-[var(--down)]"}`, children: [
              "FELLER: ",
              E.fellerRatio.toFixed(2),
              " ",
              E.fellerSatisfied ? "✓" : "✗"
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 pointer-events-auto", children: [
            /* @__PURE__ */ e.jsx(le, { variant: "outline", size: "sm", onClick: () => z((ie) => Math.min(5, ie * 1.2)), className: "bg-card h-8 w-8 p-0 text-white hover:text-white", children: /* @__PURE__ */ e.jsx(la, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ e.jsx(le, { variant: "outline", size: "sm", onClick: () => z((ie) => Math.max(0.5, ie * 0.8)), className: "bg-card h-8 w-8 p-0 text-white hover:text-white", children: /* @__PURE__ */ e.jsx(ca, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ e.jsx(le, { variant: "outline", size: "sm", onClick: we, className: "bg-card h-8 w-8 p-0 text-white hover:text-white", children: /* @__PURE__ */ e.jsx(xa, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ e.jsx("div", { className: "w-px h-6 bg-border" }),
            /* @__PURE__ */ e.jsxs(le, { variant: "outline", size: "sm", onClick: n ? Ee : De, className: "bg-card gap-1 text-white hover:text-white", children: [
              n ? /* @__PURE__ */ e.jsx(os, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Bt, { className: "h-4 w-4" }),
              /* @__PURE__ */ e.jsx("span", { className: "hidden md:inline", children: n ? "Pause" : "Run" })
            ] }),
            /* @__PURE__ */ e.jsx(le, { variant: "outline", size: "sm", onClick: Pe, className: "bg-card h-8 w-8 p-0 text-white hover:text-white", children: /* @__PURE__ */ e.jsx(jt, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ e.jsx("div", { className: "w-px h-6 bg-border" }),
            /* @__PURE__ */ e.jsx(le, { variant: "outline", size: "sm", onClick: oe, className: "bg-card h-8 w-8 p-0 text-white hover:text-white", children: V ? /* @__PURE__ */ e.jsx(da, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(ma, { className: "h-4 w-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "absolute left-4 top-20 w-72 space-y-2 pointer-events-auto max-h-[calc(100%-120px)] overflow-y-auto", children: [
          /* @__PURE__ */ e.jsxs($e, { open: b, onOpenChange: P, children: [
            /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card font-mono text-xs text-white hover:text-white", children: [
              /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ e.jsx(vt, { className: "h-4 w-4" }),
                " PARAMETERS"
              ] }),
              b ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
            ] }) }),
            /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-3 text-white", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
                  /* @__PURE__ */ e.jsx(q, { className: "text-xs text-muted-foreground", children: "SPOT (S₀)" }),
                  /* @__PURE__ */ e.jsxs("span", { className: "text-xs", children: [
                    "$",
                    t.spotPrice
                  ] })
                ] }),
                /* @__PURE__ */ e.jsx(xe, { value: [t.spotPrice], onValueChange: ([ie]) => s((he) => ({ ...he, spotPrice: ie })), min: 50, max: 200, step: 10 })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
                  /* @__PURE__ */ e.jsx(q, { className: "text-xs text-muted-foreground", children: "INIT VOL (√v₀)" }),
                  /* @__PURE__ */ e.jsxs("span", { className: "text-xs", children: [
                    (Math.sqrt(t.v0) * 100).toFixed(0),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ e.jsx(xe, { value: [t.v0 * 100], onValueChange: ([ie]) => s((he) => ({ ...he, v0: ie / 100 })), min: 1, max: 25, step: 0.5 })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
                  /* @__PURE__ */ e.jsx(q, { className: "text-xs text-muted-foreground", children: "KAPPA (κ)" }),
                  /* @__PURE__ */ e.jsx("span", { className: "text-xs", children: t.kappa.toFixed(1) })
                ] }),
                /* @__PURE__ */ e.jsx(xe, { value: [t.kappa * 10], onValueChange: ([ie]) => s((he) => ({ ...he, kappa: ie / 10 })), min: 5, max: 60, step: 1 })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
                  /* @__PURE__ */ e.jsx(q, { className: "text-xs text-muted-foreground", children: "THETA (√θ)" }),
                  /* @__PURE__ */ e.jsxs("span", { className: "text-xs", children: [
                    (Math.sqrt(t.theta) * 100).toFixed(0),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ e.jsx(xe, { value: [t.theta * 100], onValueChange: ([ie]) => s((he) => ({ ...he, theta: ie / 100 })), min: 1, max: 25, step: 0.5 })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
                  /* @__PURE__ */ e.jsx(q, { className: "text-xs text-muted-foreground", children: "SIGMA (σ)" }),
                  /* @__PURE__ */ e.jsxs("span", { className: "text-xs", children: [
                    (t.sigma * 100).toFixed(0),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ e.jsx(xe, { value: [t.sigma * 100], onValueChange: ([ie]) => s((he) => ({ ...he, sigma: ie / 100 })), min: 10, max: 120, step: 5 })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
                  /* @__PURE__ */ e.jsx(q, { className: "text-xs text-muted-foreground", children: "RHO (ρ)" }),
                  /* @__PURE__ */ e.jsx("span", { className: "text-xs", children: t.rho.toFixed(2) })
                ] }),
                /* @__PURE__ */ e.jsx(xe, { value: [(t.rho + 1) * 50], onValueChange: ([ie]) => s((he) => ({ ...he, rho: ie / 50 - 1 })), min: 0, max: 100, step: 5 })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
                  /* @__PURE__ */ e.jsx(q, { className: "text-xs text-muted-foreground", children: "PATHS" }),
                  /* @__PURE__ */ e.jsx("span", { className: "text-xs", children: t.numPaths })
                ] }),
                /* @__PURE__ */ e.jsx(xe, { value: [t.numPaths], onValueChange: ([ie]) => s((he) => ({ ...he, numPaths: ie })), min: 20, max: 200, step: 10 })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ e.jsxs($e, { open: f, onOpenChange: k, children: [
            /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card font-mono text-xs text-white hover:text-white", children: [
              /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ e.jsx(Pt, { className: "h-4 w-4" }),
                " DISPLAY"
              ] }),
              f ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
            ] }) }),
            /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-4 text-white", children: [
              /* @__PURE__ */ e.jsx(qt, { value: m.id, onChange: j }),
              /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-muted-foreground font-mono", children: [
                  /* @__PURE__ */ e.jsx(Wa, { className: "h-3 w-3 inline mr-1" }),
                  "FAN CHART"
                ] }),
                /* @__PURE__ */ e.jsx(Me, { checked: p, onCheckedChange: C })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ e.jsx(q, { className: "text-xs text-muted-foreground font-mono", children: "PRICE PATHS" }),
                /* @__PURE__ */ e.jsx(Me, { checked: d, onCheckedChange: x })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ e.jsx(q, { className: "text-xs text-muted-foreground font-mono", children: "VOL PATHS" }),
                /* @__PURE__ */ e.jsx(Me, { checked: l, onCheckedChange: c })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-muted-foreground font-mono", children: [
                  /* @__PURE__ */ e.jsx(ha, { className: "h-3 w-3 inline mr-1" }),
                  "CROSSHAIR"
                ] }),
                /* @__PURE__ */ e.jsx(Me, { checked: y, onCheckedChange: w })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
                  /* @__PURE__ */ e.jsx(q, { className: "text-xs text-muted-foreground", children: "OPACITY" }),
                  /* @__PURE__ */ e.jsxs("span", { className: "text-xs", children: [
                    (u * 100).toFixed(0),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ e.jsx(xe, { value: [u * 100], onValueChange: ([ie]) => N(ie / 100), min: 5, max: 50, step: 5 })
              ] })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "absolute right-4 top-20 w-56 pointer-events-auto", children: /* @__PURE__ */ e.jsxs($e, { open: v, onOpenChange: $, children: [
          /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card font-mono text-xs text-white hover:text-white", children: [
            /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4" }),
              " STATISTICS"
            ] }),
            v ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
          ] }) }),
          /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-3 bg-card border-border space-y-3 text-white", children: [
            /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mb-1 font-mono", children: [
                /* @__PURE__ */ e.jsx("span", { className: "text-xs text-muted-foreground", children: "WIN RATE" }),
                /* @__PURE__ */ e.jsxs("span", { className: `text-sm font-bold ${E.winRate >= 0.5 ? "text-[var(--up)]" : "text-[var(--down)]"}`, children: [
                  (E.winRate * 100).toFixed(0),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ e.jsx("div", { className: "w-full bg-muted h-1.5 rounded", children: /* @__PURE__ */ e.jsx("div", { className: `h-full rounded ${E.winRate >= 0.5 ? "bg-[var(--up)]" : "bg-[var(--down)]"}`, style: { width: `${E.winRate * 100}%` } }) })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx("span", { className: "text-xs text-muted-foreground", children: "E[PRICE]" }),
              /* @__PURE__ */ e.jsxs("span", { className: `text-sm ${E.meanPrice > t.spotPrice ? "text-[var(--up)]" : "text-[var(--down)]"}`, children: [
                "$",
                E.meanPrice.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx("span", { className: "text-xs text-muted-foreground", children: "VaR 5%" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-sm text-[var(--down)]", children: [
                "$",
                E.var5.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx("span", { className: "text-xs text-muted-foreground", children: "95th" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-sm text-[var(--up)]", children: [
                "$",
                E.var95.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "pt-2 border-t border-border space-y-2 font-mono", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ e.jsx("span", { className: "text-xs text-muted-foreground", children: "E[VOL]" }),
                /* @__PURE__ */ e.jsxs("span", { className: "text-sm", children: [
                  E.meanVol.toFixed(1),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ e.jsx("span", { className: "text-xs text-muted-foreground", children: "LEVERAGE" }),
                /* @__PURE__ */ e.jsx("span", { className: "text-sm", children: t.rho < -0.5 ? "STRONG" : t.rho < 0 ? "MOD" : "INV" })
              ] })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "pt-2 border-t border-border", children: [
              /* @__PURE__ */ e.jsx("div", { className: "flex h-3 rounded overflow-hidden", children: m.colors.slice(0, 5).map((ie, he) => /* @__PURE__ */ e.jsx("div", { className: "flex-1", style: { backgroundColor: ie } }, he)) }),
              /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mt-1 font-mono", children: [
                /* @__PURE__ */ e.jsx("span", { children: "LOW" }),
                /* @__PURE__ */ e.jsx("span", { children: "HIGH" })
              ] })
            ] })
          ] }) })
        ] }) }),
        /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-card rounded-lg px-4 py-2 border border-border flex items-center gap-4 text-xs text-muted-foreground font-mono text-white", children: [
          /* @__PURE__ */ e.jsx("span", { children: "Scroll: Zoom" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
          /* @__PURE__ */ e.jsx("span", { children: "Drag: Pan" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-xs px-1.5 py-0.5 rounded bg-[var(--hover)] text-[var(--text)]", children: [
            (A * 100).toFixed(0),
            "%"
          ] })
        ] }) })
      ]
    }
  );
}
function lr({ data: t, colorScheme: s, opacity: n }) {
  const o = a.useMemo(() => {
    const r = t.geometry.clone(), i = r.attributes.position.array, l = new Float32Array(i.length);
    for (let c = 0; c < i.length; c += 3) {
      const d = i[c + 2], x = new yt(s.getColor(d, t.minZ, t.maxZ));
      l[c] = x.r, l[c + 1] = x.g, l[c + 2] = x.b;
    }
    return r.setAttribute("color", new Mt(l, 3)), r;
  }, [t, s]);
  return /* @__PURE__ */ e.jsx("mesh", { geometry: o, rotation: [-Math.PI / 2, 0, 0], children: /* @__PURE__ */ e.jsx(
    "meshStandardMaterial",
    {
      vertexColors: !0,
      side: Xt,
      roughness: 0.4,
      metalness: 0.1,
      transparent: !0,
      opacity: n
    }
  ) });
}
function cr({ data: t, opacity: s }) {
  return /* @__PURE__ */ e.jsx("mesh", { geometry: t.geometry, rotation: [-Math.PI / 2, 0, 0], children: /* @__PURE__ */ e.jsx(
    "meshBasicMaterial",
    {
      color: "#e8e8e8",
      wireframe: !0,
      transparent: !0,
      opacity: s
    }
  ) });
}
function xr({ show: t, size: s = 20 }) {
  return t ? /* @__PURE__ */ e.jsxs("group", { children: [
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, "#3a3a3a", "#2e2e2e"], position: [0, 0, 0] }),
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, "#3a3a3a", "#2e2e2e"], position: [0, s / 2, -s / 2], rotation: [Math.PI / 2, 0, 0] }),
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, "#3a3a3a", "#2e2e2e"], position: [-s / 2, s / 2, 0], rotation: [0, 0, Math.PI / 2] })
  ] }) : null;
}
function dr({ show: t, range: s }) {
  return t ? /* @__PURE__ */ e.jsxs("group", { children: [
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx(
        "bufferAttribute",
        {
          attach: "attributes-position",
          count: 2,
          array: new Float32Array([-s, 0, 0, s, 0, 0]),
          itemSize: 3
        }
      ) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: "#808080" })
    ] }),
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx(
        "bufferAttribute",
        {
          attach: "attributes-position",
          count: 2,
          array: new Float32Array([0, 0, 0, 0, s, 0]),
          itemSize: 3
        }
      ) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: "#808080" })
    ] }),
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx(
        "bufferAttribute",
        {
          attach: "attributes-position",
          count: 2,
          array: new Float32Array([0, 0, -s, 0, 0, s]),
          itemSize: 3
        }
      ) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: "#808080" })
    ] }),
    /* @__PURE__ */ e.jsx(ke, { position: [s + 0.5, 0, 0], fontSize: 0.4, color: "#b0b0b0", children: "Strike" }),
    /* @__PURE__ */ e.jsx(ke, { position: [0, s + 0.5, 0], fontSize: 0.4, color: "#b0b0b0", children: "IV" }),
    /* @__PURE__ */ e.jsx(ke, { position: [0, 0, s + 0.5], fontSize: 0.4, color: "#b0b0b0", children: "Expiry" })
  ] }) : null;
}
function mr() {
  const [t, s] = a.useState({
    spotPrice: 100,
    riskFreeRate: 0.05,
    atmVol: 0.2,
    skew: -0.15,
    kurtosis: 0.05,
    termStructure: 0.03
  }), [n, o] = a.useState($t[4]), [r, i] = a.useState(!0), [l, c] = a.useState(0.15), [d, x] = a.useState(0.95), [p, C] = a.useState(!0), [m, j] = a.useState(!0), [u, N] = a.useState(!1), [b, P] = a.useState(1), [f, k] = a.useState(40), [v, $] = a.useState(!0), [A, z] = a.useState(!1), [R, T] = a.useState(!0), I = a.useMemo(() => {
    const h = f, y = f, w = Array.from({ length: h }, (X, B) => 0.7 + B / (h - 1) * 0.6), M = Array.from({ length: y }, (X, B) => 0.1 + B / (y - 1) * 1.9), Y = [];
    let _ = 1 / 0, se = -1 / 0;
    for (let X = 0; X < y; X++) {
      Y[X] = [];
      for (let B = 0; B < h; B++) {
        const g = M[X], oe = w[B] * t.spotPrice, re = Math.log(oe / t.spotPrice), U = t.atmVol + t.skew * re + t.kurtosis * re * re, ee = t.termStructure * Math.sqrt(g), E = Math.max(0.01, U + ee);
        Y[X][B] = E, _ = Math.min(_, E), se = Math.max(se, E);
      }
    }
    const V = [], W = [], te = 0.5, O = 8, L = se - _ || 1;
    for (let X = 0; X < y; X++)
      for (let B = 0; B < h; B++) {
        const g = Y[X][B], oe = (w[B] - 0.7) / 0.6 * 10 - 5, re = (g - _) / L, U = te + re * (O - te), ee = M[X] * 5;
        if (V.push(oe, U, ee), X < y - 1 && B < h - 1) {
          const E = X * h + B, G = E + 1, J = E + h, K = J + 1;
          W.push(E, G, J), W.push(G, K, J);
        }
      }
    const D = new At();
    return D.setAttribute("position", new ns(V, 3)), D.setIndex(W), D.computeVertexNormals(), { geometry: D, minZ: te, maxZ: O, rawMinIV: _, rawMaxIV: se };
  }, [t, f]), F = a.useRef(null), S = () => {
    F.current && F.current.reset();
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "relative w-full h-[calc(100vh-180px)] min-h-[600px] bg-[var(--bg)] rounded-lg overflow-hidden border border-border", children: [
    /* @__PURE__ */ e.jsxs(
      It,
      {
        camera: { position: [15, 10, 15], fov: 45 },
        style: { background: "var(--bg, #1c1c1c)" },
        children: [
          /* @__PURE__ */ e.jsx("ambientLight", { intensity: 0.4 }),
          /* @__PURE__ */ e.jsx("pointLight", { position: [10, 20, 10], intensity: 1.2 }),
          /* @__PURE__ */ e.jsx("directionalLight", { position: [-10, 15, 10], intensity: 0.8 }),
          /* @__PURE__ */ e.jsx("directionalLight", { position: [10, -10, -10], intensity: 0.3 }),
          /* @__PURE__ */ e.jsx(xr, { show: p, size: 20 }),
          /* @__PURE__ */ e.jsx(dr, { show: m, range: 8 }),
          /* @__PURE__ */ e.jsx(lr, { data: I, colorScheme: n, opacity: d }),
          r && /* @__PURE__ */ e.jsx(cr, { data: I, opacity: l }),
          /* @__PURE__ */ e.jsx(
            zt,
            {
              ref: F,
              enablePan: !0,
              enableZoom: !0,
              enableRotate: !0,
              minDistance: 5,
              maxDistance: 60,
              autoRotate: u,
              autoRotateSpeed: b
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none", children: [
      /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-3 pointer-events-auto", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-card rounded-lg px-4 py-2 border border-border flex items-center gap-2 text-[var(--text)]", children: [
        /* @__PURE__ */ e.jsx("span", { className: "font-semibold text-[var(--text)]", children: "Implied Volatility Surface" }),
        /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
          /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4 text-[var(--dim)] cursor-help" }) }),
          /* @__PURE__ */ e.jsx(xt, { className: "max-w-sm", children: /* @__PURE__ */ e.jsx("p", { className: "text-sm", children: "3D visualization of implied volatility across different strike prices and expiration dates. Adjust all parameters in real-time." }) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-2 pointer-events-auto", children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", size: "sm", onClick: S, className: "bg-card text-[var(--text)] hover:text-[var(--text)]", children: [
        /* @__PURE__ */ e.jsx(jt, { className: "h-4 w-4 mr-1" }),
        "Reset View"
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "absolute left-4 top-20 w-72 space-y-2 pointer-events-auto", children: [
      /* @__PURE__ */ e.jsxs($e, { open: v, onOpenChange: $, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[var(--text)] hover:text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(vt, { className: "h-4 w-4" }),
            "Surface Parameters"
          ] }),
          v ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-4 text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "ATM Volatility" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                (t.atmVol * 100).toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(
              xe,
              {
                value: [t.atmVol * 100],
                onValueChange: ([h]) => s((y) => ({ ...y, atmVol: h / 100 })),
                min: 5,
                max: 80,
                step: 1
              }
            )
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Skew" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                (t.skew * 100).toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(
              xe,
              {
                value: [t.skew * 100],
                onValueChange: ([h]) => s((y) => ({ ...y, skew: h / 100 })),
                min: -50,
                max: 20,
                step: 1
              }
            )
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Kurtosis (Smile)" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                (t.kurtosis * 100).toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(
              xe,
              {
                value: [t.kurtosis * 100],
                onValueChange: ([h]) => s((y) => ({ ...y, kurtosis: h / 100 })),
                min: 0,
                max: 30,
                step: 1
              }
            )
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Term Structure" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                (t.termStructure * 100).toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(
              xe,
              {
                value: [t.termStructure * 100],
                onValueChange: ([h]) => s((y) => ({ ...y, termStructure: h / 100 })),
                min: -15,
                max: 20,
                step: 1
              }
            )
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Risk-Free Rate" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                (t.riskFreeRate * 100).toFixed(1),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(
              xe,
              {
                value: [t.riskFreeRate * 100],
                onValueChange: ([h]) => s((y) => ({ ...y, riskFreeRate: h / 100 })),
                min: 0,
                max: 15,
                step: 0.5
              }
            )
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Spot Price" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                "$",
                t.spotPrice
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(
              xe,
              {
                value: [t.spotPrice],
                onValueChange: ([h]) => s((y) => ({ ...y, spotPrice: h })),
                min: 10,
                max: 500,
                step: 10
              }
            )
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ e.jsxs($e, { open: A, onOpenChange: z, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[var(--text)] hover:text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(Pt, { className: "h-4 w-4" }),
            "Visual Settings"
          ] }),
          A ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-4 text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsx(qt, { value: n.id, onChange: o }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Surface Opacity" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                (d * 100).toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(
              xe,
              {
                value: [d * 100],
                onValueChange: ([h]) => x(h / 100),
                min: 20,
                max: 100,
                step: 5
              }
            )
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Wireframe" }),
            /* @__PURE__ */ e.jsx(Me, { checked: r, onCheckedChange: i })
          ] }),
          r && /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Wireframe Opacity" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                (l * 100).toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(
              xe,
              {
                value: [l * 100],
                onValueChange: ([h]) => c(h / 100),
                min: 5,
                max: 50,
                step: 5
              }
            )
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Resolution" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                f,
                "×",
                f
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(
              xe,
              {
                value: [f],
                onValueChange: ([h]) => k(h),
                min: 20,
                max: 80,
                step: 10
              }
            )
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-[var(--dim)] flex items-center gap-1", children: [
              /* @__PURE__ */ e.jsx(is, { className: "h-3 w-3" }),
              " Grid"
            ] }),
            /* @__PURE__ */ e.jsx(Me, { checked: p, onCheckedChange: C })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-[var(--dim)] flex items-center gap-1", children: [
              /* @__PURE__ */ e.jsx(ls, { className: "h-3 w-3" }),
              " Axes"
            ] }),
            /* @__PURE__ */ e.jsx(Me, { checked: m, onCheckedChange: j })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Auto Rotate" }),
            /* @__PURE__ */ e.jsx(Me, { checked: u, onCheckedChange: N })
          ] }),
          u && /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Rotation Speed" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                b,
                "×"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(
              xe,
              {
                value: [b],
                onValueChange: ([h]) => P(h),
                min: 0.5,
                max: 5,
                step: 0.5
              }
            )
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute right-4 top-20 w-56 pointer-events-auto", children: /* @__PURE__ */ e.jsxs($e, { open: R, onOpenChange: T, children: [
      /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[var(--text)] hover:text-[var(--text)]", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4" }),
          "Statistics"
        ] }),
        R ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
      ] }) }),
      /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-3 bg-card border-border space-y-3 text-[var(--text)]", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "ATM IV (1Y)" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm font-medium text-[var(--text)]", children: [
            (t.atmVol * 100 + t.termStructure * 100).toFixed(1),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "25Δ Put Skew" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm font-medium text-[var(--text)]", children: [
            (t.skew * -15).toFixed(1),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "Butterfly" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm font-medium text-[var(--text)]", children: [
            (t.kurtosis * 100).toFixed(1),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "Term Structure" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm font-medium text-[var(--text)]", children: t.termStructure > 0 ? "Contango" : t.termStructure < 0 ? "Backwardation" : "Flat" })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "Risk-Free Rate" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm font-medium text-[var(--text)]", children: [
            (t.riskFreeRate * 100).toFixed(1),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "Spot Price" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm font-medium text-[var(--text)]", children: [
            "$",
            t.spotPrice
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "pt-2 border-t border-border", children: [
          /* @__PURE__ */ e.jsx("div", { className: "text-xs text-[var(--dim)] mb-2", children: "IV Scale" }),
          /* @__PURE__ */ e.jsx("div", { className: "flex h-3 rounded overflow-hidden", children: n.colors.map((h, y) => /* @__PURE__ */ e.jsx("div", { className: "flex-1", style: { backgroundColor: h } }, y)) }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between text-xs text-[var(--dim)] mt-1", children: [
            /* @__PURE__ */ e.jsx("span", { children: "Low" }),
            /* @__PURE__ */ e.jsx("span", { children: "High" })
          ] })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-card rounded-lg px-4 py-2 border border-border flex items-center gap-4 text-xs text-[var(--dim)] text-[var(--text)]", children: [
      /* @__PURE__ */ e.jsx("span", { children: "Drag to rotate" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
      /* @__PURE__ */ e.jsx("span", { children: "Scroll to zoom" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
      /* @__PURE__ */ e.jsx("span", { children: "Right-click to pan" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
      /* @__PURE__ */ e.jsxs("span", { children: [
        "Resolution: ",
        f,
        "²"
      ] })
    ] }) })
  ] });
}
function hr({ data: t, colorScheme: s, opacity: n }) {
  const o = a.useMemo(() => {
    const r = t.geometry.clone(), i = r.attributes.position.array, l = new Float32Array(i.length);
    for (let c = 0; c < i.length; c += 3) {
      const d = i[c + 2], x = new yt(s.getColor(d, t.minZ, t.maxZ));
      l[c] = x.r, l[c + 1] = x.g, l[c + 2] = x.b;
    }
    return r.setAttribute("color", new Mt(l, 3)), r;
  }, [t, s]);
  return /* @__PURE__ */ e.jsx("mesh", { geometry: o, rotation: [-Math.PI / 2, 0, 0], children: /* @__PURE__ */ e.jsx(
    "meshStandardMaterial",
    {
      vertexColors: !0,
      side: Xt,
      roughness: 0.3,
      metalness: 0.2,
      transparent: !0,
      opacity: n
    }
  ) });
}
function ur({ data: t, opacity: s }) {
  return /* @__PURE__ */ e.jsx("mesh", { geometry: t.geometry, rotation: [-Math.PI / 2, 0, 0], children: /* @__PURE__ */ e.jsx(
    "meshBasicMaterial",
    {
      color: "#e8e8e8",
      wireframe: !0,
      transparent: !0,
      opacity: s
    }
  ) });
}
function fr({ show: t, size: s = 20 }) {
  return t ? /* @__PURE__ */ e.jsxs("group", { children: [
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, "#3a3a3a", "#2e2e2e"], position: [0, 0, 0] }),
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, "#3a3a3a", "#2e2e2e"], position: [0, s / 2, -s / 2], rotation: [Math.PI / 2, 0, 0] }),
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, "#3a3a3a", "#2e2e2e"], position: [-s / 2, s / 2, 0], rotation: [0, 0, Math.PI / 2] })
  ] }) : null;
}
function pr({ show: t, range: s }) {
  return t ? /* @__PURE__ */ e.jsxs("group", { children: [
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx("bufferAttribute", { attach: "attributes-position", count: 2, array: new Float32Array([-s, 0, 0, s, 0, 0]), itemSize: 3 }) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: "#808080" })
    ] }),
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx("bufferAttribute", { attach: "attributes-position", count: 2, array: new Float32Array([0, 0, 0, 0, s, 0]), itemSize: 3 }) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: "#808080" })
    ] }),
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx("bufferAttribute", { attach: "attributes-position", count: 2, array: new Float32Array([0, 0, -s, 0, 0, s]), itemSize: 3 }) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: "#808080" })
    ] }),
    /* @__PURE__ */ e.jsx(ke, { position: [s + 0.5, 0, 0], fontSize: 0.4, color: "#b0b0b0", children: "Lookback" }),
    /* @__PURE__ */ e.jsx(ke, { position: [0, s + 0.5, 0], fontSize: 0.4, color: "#b0b0b0", children: "Intensity" }),
    /* @__PURE__ */ e.jsx(ke, { position: [0, 0, s + 0.5], fontSize: 0.4, color: "#b0b0b0", children: "Confidence" })
  ] }) : null;
}
function jr() {
  const [t, s] = a.useState({
    lookbackPeriods: 50,
    confidenceLevels: 20,
    tailExponent: 2.5,
    clusterIntensity: 0.6
  }), [n, o] = a.useState($t[4]), [r, i] = a.useState(!0), [l, c] = a.useState(0.12), [d, x] = a.useState(0.92), [p, C] = a.useState(!0), [m, j] = a.useState(!0), [u, N] = a.useState(!1), [b, P] = a.useState(1), [f, k] = a.useState(40), [v, $] = a.useState(!0), [A, z] = a.useState(!1), [R, T] = a.useState(!0), I = a.useMemo(() => {
    const y = f, w = f, M = Array.from({ length: y }, (O, L) => 20 + L / (y - 1) * 230), Y = Array.from({ length: w }, (O, L) => 0.9 + L / (w - 1) * 0.099), _ = [], se = [];
    let V = 1 / 0, W = -1 / 0;
    for (let O = 0; O < y; O++)
      for (let L = 0; L < w; L++) {
        const D = M[O], X = Y[L], B = Math.pow(1 - X, -t.tailExponent) / 100, g = Math.pow(t.lookbackPeriods / D, 1.5), oe = t.clusterIntensity * Math.sin(D / 30) * Math.cos(X * 20), re = B * g * (1 + Math.abs(oe)), U = (D - 20) / 230 * 10 - 5, ee = Math.log1p(re * 10) * 3, E = (X - 0.9) / 0.099 * 10;
        if (_.push(U, ee, E), V = Math.min(V, ee), W = Math.max(W, ee), O < y - 1 && L < w - 1) {
          const G = O * w + L;
          se.push(G, G + 1, G + w), se.push(G + 1, G + w + 1, G + w);
        }
      }
    const te = new At();
    return te.setAttribute("position", new ns(_, 3)), te.setIndex(se), te.computeVertexNormals(), { geometry: te, minZ: V, maxZ: W };
  }, [t, f]), F = a.useMemo(() => {
    const y = 5.79 + (t.tailExponent - 2) * 1.5 + (1 - t.clusterIntensity) * 0.8, w = y * (1 + 0.3 * t.clusterIntensity + 0.2 * (t.tailExponent - 2));
    return {
      var99: y.toFixed(2),
      es: w.toFixed(2),
      esVarRatio: (w / y).toFixed(2),
      exceedance: (1.5 + t.clusterIntensity * 0.8).toFixed(1),
      tailAlpha: t.tailExponent.toFixed(2),
      cluster: (t.clusterIntensity * 100).toFixed(0)
    };
  }, [t]), S = a.useRef(null), h = () => S.current?.reset();
  return /* @__PURE__ */ e.jsxs("div", { className: "relative w-full h-[calc(100vh-180px)] min-h-[600px] bg-[var(--bg)] rounded-lg overflow-hidden border border-border", children: [
    /* @__PURE__ */ e.jsxs(
      It,
      {
        camera: { position: [18, 12, 15], fov: 45 },
        style: { background: "#1c1c1c" },
        children: [
          /* @__PURE__ */ e.jsx("ambientLight", { intensity: 0.4 }),
          /* @__PURE__ */ e.jsx("pointLight", { position: [10, 20, 10], intensity: 1.2 }),
          /* @__PURE__ */ e.jsx("directionalLight", { position: [-10, 15, 10], intensity: 0.8 }),
          /* @__PURE__ */ e.jsx(fr, { show: p, size: 20 }),
          /* @__PURE__ */ e.jsx(pr, { show: m, range: 8 }),
          /* @__PURE__ */ e.jsx(hr, { data: I, colorScheme: n, opacity: d }),
          r && /* @__PURE__ */ e.jsx(ur, { data: I, opacity: l }),
          /* @__PURE__ */ e.jsx(ke, { position: [4, I.maxZ + 1, 8], fontSize: 0.5, color: "#f0426c", children: "TAIL DANGER" }),
          /* @__PURE__ */ e.jsx(
            zt,
            {
              ref: S,
              enablePan: !0,
              enableZoom: !0,
              enableRotate: !0,
              minDistance: 5,
              maxDistance: 60,
              autoRotate: u,
              autoRotateSpeed: b
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none", children: [
      /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-3 pointer-events-auto", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-card rounded-lg px-4 py-2 border border-border flex items-center gap-2 text-[var(--text)]", children: [
        /* @__PURE__ */ e.jsx("span", { className: "font-semibold text-[var(--text)]", children: "VaR Failure Intensity Surface" }),
        /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
          /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4 text-[var(--dim)] cursor-help" }) }),
          /* @__PURE__ */ e.jsx(xt, { className: "max-w-sm", children: /* @__PURE__ */ e.jsx("p", { className: "text-sm", children: "Risk surface showing VaR model failure intensity across lookback horizons and confidence levels." }) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(le, { variant: "outline", size: "sm", onClick: h, className: "bg-card pointer-events-auto text-[var(--text)] hover:text-[var(--text)]", children: [
        /* @__PURE__ */ e.jsx(jt, { className: "h-4 w-4 mr-1" }),
        " Reset"
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "absolute left-4 top-20 w-72 space-y-2 pointer-events-auto", children: [
      /* @__PURE__ */ e.jsxs($e, { open: v, onOpenChange: $, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(vt, { className: "h-4 w-4" }),
            " Risk Parameters"
          ] }),
          v ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-4 text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Lookback Period" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                t.lookbackPeriods,
                " days"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [t.lookbackPeriods], onValueChange: ([y]) => s((w) => ({ ...w, lookbackPeriods: y })), min: 20, max: 250, step: 10 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Tail Exponent (α)" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[var(--text)]", children: t.tailExponent.toFixed(1) })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [t.tailExponent * 10], onValueChange: ([y]) => s((w) => ({ ...w, tailExponent: y / 10 })), min: 15, max: 45, step: 1 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Cluster Intensity" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                (t.clusterIntensity * 100).toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [t.clusterIntensity * 100], onValueChange: ([y]) => s((w) => ({ ...w, clusterIntensity: y / 100 })), min: 0, max: 100, step: 5 })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ e.jsxs($e, { open: A, onOpenChange: z, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(Pt, { className: "h-4 w-4" }),
            " Visuals"
          ] }),
          A ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-4 text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsx(qt, { value: n.id, onChange: o }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Surface Opacity" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                (d * 100).toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [d * 100], onValueChange: ([y]) => x(y / 100), min: 20, max: 100, step: 5 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Wireframe" }),
            /* @__PURE__ */ e.jsx(Me, { checked: r, onCheckedChange: i })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Resolution" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                f,
                "²"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [f], onValueChange: ([y]) => k(y), min: 20, max: 80, step: 10 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-[var(--dim)]", children: [
              /* @__PURE__ */ e.jsx(is, { className: "h-3 w-3 inline mr-1" }),
              "Grid"
            ] }),
            /* @__PURE__ */ e.jsx(Me, { checked: p, onCheckedChange: C })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-[var(--dim)]", children: [
              /* @__PURE__ */ e.jsx(ls, { className: "h-3 w-3 inline mr-1" }),
              "Axes"
            ] }),
            /* @__PURE__ */ e.jsx(Me, { checked: m, onCheckedChange: j })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Auto Rotate" }),
            /* @__PURE__ */ e.jsx(Me, { checked: u, onCheckedChange: N })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute right-4 top-20 w-56 pointer-events-auto", children: /* @__PURE__ */ e.jsxs($e, { open: R, onOpenChange: T, children: [
      /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[var(--text)]", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4" }),
          " Risk Metrics"
        ] }),
        R ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
      ] }) }),
      /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-3 bg-card border-border space-y-3 text-[var(--text)]", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "VaR(99%)" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm font-medium text-[var(--down)]", children: [
            F.var99,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "Expected Shortfall" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm font-medium text-[#c58435]", children: [
            F.es,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "ES/VaR Ratio" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm font-medium text-[var(--text)]", children: [
            F.esVarRatio,
            "×"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "Exceedance" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm font-medium text-[var(--text)]", children: [
            F.exceedance,
            "×"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "Tail α" }),
          /* @__PURE__ */ e.jsxs("span", { className: `text-sm font-medium ${parseFloat(F.tailAlpha) < 2 ? "text-[var(--down)]" : parseFloat(F.tailAlpha) < 2.5 ? "text-[#c58435]" : "text-[var(--text)]"}`, children: [
            F.tailAlpha,
            " (",
            parseFloat(F.tailAlpha) < 2 ? "INFINITE" : parseFloat(F.tailAlpha) < 2.5 ? "VERY FAT" : "FAT",
            ")"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "pt-2 border-t border-border", children: [
          /* @__PURE__ */ e.jsx("div", { className: "text-xs text-[var(--dim)] mb-2", children: "Risk Scale" }),
          /* @__PURE__ */ e.jsx("div", { className: "flex h-3 rounded overflow-hidden", children: n.colors.map((y, w) => /* @__PURE__ */ e.jsx("div", { className: "flex-1", style: { backgroundColor: y } }, w)) }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between text-xs text-[var(--dim)] mt-1", children: [
            /* @__PURE__ */ e.jsx("span", { children: "Safe" }),
            /* @__PURE__ */ e.jsx("span", { children: "Danger" })
          ] })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-card rounded-lg px-4 py-2 border border-border flex items-center gap-4 text-xs text-[var(--dim)] text-[var(--text)]", children: [
      /* @__PURE__ */ e.jsx("span", { children: "Drag to rotate" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
      /* @__PURE__ */ e.jsx("span", { children: "Scroll to zoom" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
      /* @__PURE__ */ e.jsx("span", { children: "Right-click to pan" })
    ] }) })
  ] });
}
function pa(t, s, n, o, r) {
  return (Math.log(t / s) + (o + 0.5 * r * r) * n) / (r * Math.sqrt(n));
}
function gr(t) {
  const s = 0.254829592, n = -0.284496736, o = 1.421413741, r = -1.453152027, i = 1.061405429, l = 0.3275911, c = t < 0 ? -1 : 1;
  t = Math.abs(t) / Math.sqrt(2);
  const d = 1 / (1 + l * t), x = 1 - ((((i * d + r) * d + o) * d + n) * d + s) * d * Math.exp(-t * t);
  return 0.5 * (1 + c * x);
}
function br(t) {
  return Math.exp(-0.5 * t * t) / Math.sqrt(2 * Math.PI);
}
function Os(t, s, n, o, r) {
  if (n <= 1e-3) return t >= s ? 1 : 0;
  const i = pa(t, s, n, o, r);
  return gr(i);
}
function In(t, s, n, o, r) {
  if (n <= 1e-3) return 0;
  const i = pa(t, s, n, o, r);
  return br(i) / (t * r * Math.sqrt(n));
}
function vr({ data: t, colorScheme: s, opacity: n }) {
  const o = a.useMemo(() => {
    const r = t.geometry.clone(), i = r.attributes.position.array, l = new Float32Array(i.length);
    for (let c = 0; c < i.length; c += 3) {
      const d = i[c + 2], x = new yt(s.getColor(d, t.minZ, t.maxZ));
      l[c] = x.r, l[c + 1] = x.g, l[c + 2] = x.b;
    }
    return r.setAttribute("color", new Mt(l, 3)), r;
  }, [t, s]);
  return /* @__PURE__ */ e.jsx("mesh", { geometry: o, rotation: [-Math.PI / 2, 0, 0], children: /* @__PURE__ */ e.jsx(
    "meshStandardMaterial",
    {
      vertexColors: !0,
      side: Xt,
      roughness: 0.4,
      metalness: 0.1,
      transparent: !0,
      opacity: n
    }
  ) });
}
function yr({ data: t, opacity: s }) {
  return /* @__PURE__ */ e.jsx("mesh", { geometry: t.geometry, rotation: [-Math.PI / 2, 0, 0], children: /* @__PURE__ */ e.jsx(
    "meshBasicMaterial",
    {
      color: "#e8e8e8",
      wireframe: !0,
      transparent: !0,
      opacity: s
    }
  ) });
}
function Nr({ show: t, size: s = 20 }) {
  return t ? /* @__PURE__ */ e.jsxs("group", { children: [
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, "#3a3a3a", "#2e2e2e"], position: [0, 0, 0] }),
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, "#3a3a3a", "#2e2e2e"], position: [0, s / 2, -s / 2], rotation: [Math.PI / 2, 0, 0] }),
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, "#3a3a3a", "#2e2e2e"], position: [-s / 2, s / 2, 0], rotation: [0, 0, Math.PI / 2] })
  ] }) : null;
}
function wr({ show: t, range: s, greekType: n }) {
  return t ? /* @__PURE__ */ e.jsxs("group", { children: [
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx("bufferAttribute", { attach: "attributes-position", count: 2, array: new Float32Array([-s, 0, 0, s, 0, 0]), itemSize: 3 }) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: "#808080" })
    ] }),
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx("bufferAttribute", { attach: "attributes-position", count: 2, array: new Float32Array([0, 0, 0, 0, s, 0]), itemSize: 3 }) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: "#808080" })
    ] }),
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx("bufferAttribute", { attach: "attributes-position", count: 2, array: new Float32Array([0, 0, -s, 0, 0, s]), itemSize: 3 }) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: "#808080" })
    ] }),
    /* @__PURE__ */ e.jsx(ke, { position: [s + 0.5, 0, 0], fontSize: 0.4, color: "#b0b0b0", children: "Strike" }),
    /* @__PURE__ */ e.jsx(ke, { position: [0, s + 0.5, 0], fontSize: 0.4, color: "#b0b0b0", children: n === "delta" ? "Delta" : "Gamma" }),
    /* @__PURE__ */ e.jsx(ke, { position: [0, 0, s + 0.5], fontSize: 0.4, color: "#b0b0b0", children: "Expiry" })
  ] }) : null;
}
function Sr() {
  const [t, s] = a.useState({
    spotPrice: 100,
    volatility: 0.25,
    riskFreeRate: 0.05,
    greekType: "delta"
  }), [n, o] = a.useState($t[4]), [r, i] = a.useState(!0), [l, c] = a.useState(0.15), [d, x] = a.useState(0.95), [p, C] = a.useState(!0), [m, j] = a.useState(!0), [u, N] = a.useState(!1), [b, P] = a.useState(1), [f, k] = a.useState(40), [v, $] = a.useState(!0), [A, z] = a.useState(!1), [R, T] = a.useState(!0), I = a.useMemo(() => {
    const y = f, w = f, M = Array.from(
      { length: y },
      (O, L) => t.spotPrice * (0.7 + L / (y - 1) * 0.6)
    ), Y = Array.from(
      { length: w },
      (O, L) => 0.05 + L / (w - 1) * 1.95
    ), _ = [], se = [];
    let V = 1 / 0, W = -1 / 0;
    for (let O = 0; O < y; O++)
      for (let L = 0; L < w; L++) {
        const D = M[O], X = Y[L];
        let B;
        t.greekType === "delta" ? B = Os(t.spotPrice, D, X, t.riskFreeRate, t.volatility) : B = In(t.spotPrice, D, X, t.riskFreeRate, t.volatility);
        const g = (D / t.spotPrice - 0.7) / 0.6 * 10 - 5, oe = t.greekType === "delta" ? B * 8 : Math.min(B * 200, 10), re = (X - 0.05) / 1.95 * 10;
        if (_.push(g, oe, re), V = Math.min(V, oe), W = Math.max(W, oe), O < y - 1 && L < w - 1) {
          const U = O * w + L;
          se.push(U, U + 1, U + w), se.push(U + 1, U + w + 1, U + w);
        }
      }
    const te = new At();
    return te.setAttribute("position", new ns(_, 3)), te.setIndex(se), te.computeVertexNormals(), { geometry: te, minZ: V, maxZ: W };
  }, [t, f]), F = a.useMemo(() => {
    const y = Os(t.spotPrice, t.spotPrice, 0.25, t.riskFreeRate, t.volatility), w = In(t.spotPrice, t.spotPrice, 0.25, t.riskFreeRate, t.volatility), M = Os(t.spotPrice, t.spotPrice * 0.85, 0.25, t.riskFreeRate, t.volatility), Y = Os(t.spotPrice, t.spotPrice * 1.15, 0.25, t.riskFreeRate, t.volatility);
    return {
      atmDelta: y.toFixed(3),
      atmGamma: (w * 100).toFixed(3),
      deltaSkew: (M - Y).toFixed(3),
      peakGamma: (w * 100).toFixed(3),
      spotPrice: t.spotPrice,
      impliedVol: (t.volatility * 100).toFixed(0)
    };
  }, [t]), S = a.useRef(null), h = () => S.current?.reset();
  return /* @__PURE__ */ e.jsxs("div", { className: "relative w-full h-[calc(100vh-180px)] min-h-[600px] bg-[var(--bg)] rounded-lg overflow-hidden border border-border", children: [
    /* @__PURE__ */ e.jsxs(
      It,
      {
        camera: { position: [15, 10, 15], fov: 45 },
        style: { background: "var(--bg, #1c1c1c)" },
        children: [
          /* @__PURE__ */ e.jsx("ambientLight", { intensity: 0.4 }),
          /* @__PURE__ */ e.jsx("pointLight", { position: [10, 20, 10], intensity: 1.2 }),
          /* @__PURE__ */ e.jsx("directionalLight", { position: [-10, 15, 10], intensity: 0.8 }),
          /* @__PURE__ */ e.jsx("directionalLight", { position: [10, -10, -10], intensity: 0.3 }),
          /* @__PURE__ */ e.jsx(Nr, { show: p, size: 20 }),
          /* @__PURE__ */ e.jsx(wr, { show: m, range: 8, greekType: t.greekType }),
          /* @__PURE__ */ e.jsx(vr, { data: I, colorScheme: n, opacity: d }),
          r && /* @__PURE__ */ e.jsx(yr, { data: I, opacity: l }),
          /* @__PURE__ */ e.jsx(
            zt,
            {
              ref: S,
              enablePan: !0,
              enableZoom: !0,
              enableRotate: !0,
              minDistance: 5,
              maxDistance: 60,
              autoRotate: u,
              autoRotateSpeed: b
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none", children: [
      /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-3 pointer-events-auto", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-card rounded-lg px-4 py-2 border border-border flex items-center gap-2 text-[var(--text)]", children: [
        /* @__PURE__ */ e.jsx("span", { className: "font-semibold text-[var(--text)]", children: "Option Greeks Surface" }),
        /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
          /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4 text-[var(--dim)] cursor-help" }) }),
          /* @__PURE__ */ e.jsx(xt, { className: "max-w-sm", children: /* @__PURE__ */ e.jsxs("p", { className: "text-sm", children: [
            "3D visualization of option ",
            t.greekType,
            " across strike prices and expiration dates using Black-Scholes model."
          ] }) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-2 pointer-events-auto", children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", size: "sm", onClick: h, className: "bg-card text-[var(--text)]", children: [
        /* @__PURE__ */ e.jsx(jt, { className: "h-4 w-4 mr-1" }),
        "Reset View"
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "absolute left-4 top-20 w-72 space-y-2 pointer-events-auto", children: [
      /* @__PURE__ */ e.jsxs($e, { open: v, onOpenChange: $, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(vt, { className: "h-4 w-4" }),
            "Greeks Parameters"
          ] }),
          v ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-4 text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Greek Type" }),
            /* @__PURE__ */ e.jsxs(Jt, { value: t.greekType, onValueChange: (y) => s((w) => ({ ...w, greekType: y })), children: [
              /* @__PURE__ */ e.jsx(es, { className: "h-8 text-[var(--text)]", children: /* @__PURE__ */ e.jsx(ts, {}) }),
              /* @__PURE__ */ e.jsxs(ss, { children: [
                /* @__PURE__ */ e.jsx(Qe, { value: "delta", children: "Delta (Δ)" }),
                /* @__PURE__ */ e.jsx(Qe, { value: "gamma", children: "Gamma (Γ)" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Spot Price" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                "$",
                t.spotPrice
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [t.spotPrice], onValueChange: ([y]) => s((w) => ({ ...w, spotPrice: y })), min: 50, max: 200, step: 5 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Volatility" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                (t.volatility * 100).toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [t.volatility * 100], onValueChange: ([y]) => s((w) => ({ ...w, volatility: y / 100 })), min: 10, max: 80, step: 5 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Risk-Free Rate" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                (t.riskFreeRate * 100).toFixed(1),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [t.riskFreeRate * 100], onValueChange: ([y]) => s((w) => ({ ...w, riskFreeRate: y / 100 })), min: 0, max: 10, step: 0.5 })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ e.jsxs($e, { open: A, onOpenChange: z, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(Pt, { className: "h-4 w-4" }),
            "Visual Settings"
          ] }),
          A ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-4 text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsx(qt, { value: n.id, onChange: o }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Surface Opacity" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                (d * 100).toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [d * 100], onValueChange: ([y]) => x(y / 100), min: 20, max: 100, step: 5 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Wireframe" }),
            /* @__PURE__ */ e.jsx(Me, { checked: r, onCheckedChange: i })
          ] }),
          r && /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Wireframe Opacity" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                (l * 100).toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [l * 100], onValueChange: ([y]) => c(y / 100), min: 5, max: 50, step: 5 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Resolution" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                f,
                "×",
                f
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [f], onValueChange: ([y]) => k(y), min: 20, max: 80, step: 10 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-[var(--dim)] flex items-center gap-1", children: [
              /* @__PURE__ */ e.jsx(is, { className: "h-3 w-3" }),
              " Grid"
            ] }),
            /* @__PURE__ */ e.jsx(Me, { checked: p, onCheckedChange: C })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-[var(--dim)] flex items-center gap-1", children: [
              /* @__PURE__ */ e.jsx(ls, { className: "h-3 w-3" }),
              " Axes"
            ] }),
            /* @__PURE__ */ e.jsx(Me, { checked: m, onCheckedChange: j })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Auto Rotate" }),
            /* @__PURE__ */ e.jsx(Me, { checked: u, onCheckedChange: N })
          ] }),
          u && /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Rotation Speed" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                b,
                "×"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [b], onValueChange: ([y]) => P(y), min: 0.5, max: 5, step: 0.5 })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute right-4 top-20 w-56 pointer-events-auto", children: /* @__PURE__ */ e.jsxs($e, { open: R, onOpenChange: T, children: [
      /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[var(--text)]", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4" }),
          "Greeks Metrics"
        ] }),
        R ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
      ] }) }),
      /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-3 bg-card border-border space-y-3 text-[var(--text)]", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "ATM Delta (3M)" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm font-medium text-[var(--text)]", children: F.atmDelta })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "ATM Gamma (3M)" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm font-medium text-[var(--text)]", children: [
            F.atmGamma,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "Delta Skew" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm font-medium text-[var(--text)]", children: F.deltaSkew })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "Spot Price" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm font-medium text-[var(--text)]", children: [
            "$",
            F.spotPrice
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "Implied Vol" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm font-medium text-[var(--text)]", children: [
            F.impliedVol,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "pt-2 border-t border-border", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "text-xs text-[var(--dim)] mb-2", children: [
            t.greekType === "delta" ? "Delta" : "Gamma",
            " Scale"
          ] }),
          /* @__PURE__ */ e.jsx("div", { className: "flex h-3 rounded overflow-hidden", children: n.colors.map((y, w) => /* @__PURE__ */ e.jsx("div", { className: "flex-1", style: { backgroundColor: y } }, w)) }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between text-xs text-[var(--dim)] mt-1", children: [
            /* @__PURE__ */ e.jsx("span", { children: "Low" }),
            /* @__PURE__ */ e.jsx("span", { children: "High" })
          ] })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-card rounded-lg px-4 py-2 border border-border flex items-center gap-4 text-xs text-[var(--dim)] text-[var(--text)]", children: [
      /* @__PURE__ */ e.jsx("span", { children: "Drag to rotate" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
      /* @__PURE__ */ e.jsx("span", { children: "Scroll to zoom" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
      /* @__PURE__ */ e.jsx("span", { children: "Right-click to pan" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
      /* @__PURE__ */ e.jsxs("span", { children: [
        "Resolution: ",
        f,
        "²"
      ] })
    ] }) })
  ] });
}
function Mr(t) {
  const s = t.assetCount, n = [], o = Array.from({ length: s }, (r, i) => Math.floor(i / (s / 3)));
  for (let r = 0; r < s; r++) {
    n[r] = [];
    for (let i = 0; i < s; i++)
      if (r === i)
        n[r][i] = 1;
      else {
        let l = t.baseCorrelation + (Math.random() - 0.5) * 0.3;
        o[r] === o[i] && (l += t.clusterStrength * 0.3), t.regime === "stressed" ? l = l + (1 - l) * t.stressMultiplier * 0.3 : t.regime === "crisis" && (l = l + (1 - l) * t.stressMultiplier * 0.6), n[r][i] = Math.max(-0.5, Math.min(0.99, l));
      }
  }
  return n;
}
function Cr({ data: t, colorScheme: s, opacity: n }) {
  const o = a.useMemo(() => {
    const r = t.geometry.clone(), i = r.attributes.position.array, l = new Float32Array(i.length);
    for (let c = 0; c < i.length; c += 3) {
      const d = i[c + 2], x = new yt(s.getColor(d, t.minZ, t.maxZ));
      l[c] = x.r, l[c + 1] = x.g, l[c + 2] = x.b;
    }
    return r.setAttribute("color", new Mt(l, 3)), r;
  }, [t, s]);
  return /* @__PURE__ */ e.jsx("mesh", { geometry: o, rotation: [-Math.PI / 2, 0, 0], children: /* @__PURE__ */ e.jsx(
    "meshStandardMaterial",
    {
      vertexColors: !0,
      side: Xt,
      roughness: 0.3,
      metalness: 0.15,
      transparent: !0,
      opacity: n
    }
  ) });
}
function kr({ data: t, opacity: s }) {
  return /* @__PURE__ */ e.jsx("mesh", { geometry: t.geometry, rotation: [-Math.PI / 2, 0, 0], children: /* @__PURE__ */ e.jsx(
    "meshBasicMaterial",
    {
      color: "#e8e8e8",
      wireframe: !0,
      transparent: !0,
      opacity: s
    }
  ) });
}
function Ar({ show: t, size: s = 20 }) {
  return t ? /* @__PURE__ */ e.jsxs("group", { children: [
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, "#3a3a3a", "#2e2e2e"], position: [0, 0, 0] }),
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, "#3a3a3a", "#2e2e2e"], position: [0, s / 2, -s / 2], rotation: [Math.PI / 2, 0, 0] }),
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, "#3a3a3a", "#2e2e2e"], position: [-s / 2, s / 2, 0], rotation: [0, 0, Math.PI / 2] })
  ] }) : null;
}
function Rr({ show: t, range: s }) {
  return t ? /* @__PURE__ */ e.jsxs("group", { children: [
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx("bufferAttribute", { attach: "attributes-position", count: 2, array: new Float32Array([-s, 0, 0, s, 0, 0]), itemSize: 3 }) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: "#808080" })
    ] }),
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx("bufferAttribute", { attach: "attributes-position", count: 2, array: new Float32Array([0, 0, 0, 0, s, 0]), itemSize: 3 }) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: "#808080" })
    ] }),
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx("bufferAttribute", { attach: "attributes-position", count: 2, array: new Float32Array([0, 0, -s, 0, 0, s]), itemSize: 3 }) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: "#808080" })
    ] }),
    /* @__PURE__ */ e.jsx(ke, { position: [s + 0.8, 0, 0], fontSize: 0.4, color: "#b0b0b0", children: "Asset i" }),
    /* @__PURE__ */ e.jsx(ke, { position: [0, s + 0.5, 0], fontSize: 0.4, color: "#b0b0b0", children: "ρ" }),
    /* @__PURE__ */ e.jsx(ke, { position: [0, 0, s + 0.8], fontSize: 0.4, color: "#b0b0b0", children: "Asset j" })
  ] }) : null;
}
function Fr() {
  const [t, s] = a.useState({
    assetCount: 20,
    baseCorrelation: 0.35,
    stressMultiplier: 0.5,
    regime: "normal",
    clusterStrength: 0.6
  }), [n, o] = a.useState($t[5]), [r, i] = a.useState(!0), [l, c] = a.useState(0.12), [d, x] = a.useState(0.92), [p, C] = a.useState(!0), [m, j] = a.useState(!0), [u, N] = a.useState(!1), [b, P] = a.useState(1), [f, k] = a.useState(!0), [v, $] = a.useState(!1), [A, z] = a.useState(!0), R = a.useMemo(() => Mr(t), [t]), T = a.useMemo(() => {
    const h = t.assetCount, y = [], w = [];
    let M = 1 / 0, Y = -1 / 0;
    for (let se = 0; se < h; se++)
      for (let V = 0; V < h; V++) {
        const W = R[se][V], te = se / (h - 1) * 10 - 5, O = W * 6, L = V / (h - 1) * 10 - 5;
        if (y.push(te, O, L), M = Math.min(M, O), Y = Math.max(Y, O), se < h - 1 && V < h - 1) {
          const D = se * h + V;
          w.push(D, D + 1, D + h), w.push(D + 1, D + h + 1, D + h);
        }
      }
    const _ = new At();
    return _.setAttribute("position", new ns(y, 3)), _.setIndex(w), _.computeVertexNormals(), { geometry: _, minZ: M, maxZ: Y };
  }, [R, t.assetCount]), I = a.useMemo(() => {
    const h = t.assetCount;
    let y = 0, w = 0, M = -1, Y = 1;
    for (let V = 0; V < h; V++)
      for (let W = V + 1; W < h; W++) {
        const te = R[V][W];
        y += te, w++, M = Math.max(M, te), Y = Math.min(Y, te);
      }
    const _ = y / w, se = 1 / (1 / h + (1 - 1 / h) * _);
    return {
      avgCorrelation: _.toFixed(3),
      maxCorrelation: M.toFixed(3),
      minCorrelation: Y.toFixed(3),
      effectiveAssets: se.toFixed(1),
      diversificationRatio: (h / se).toFixed(2),
      regime: t.regime.charAt(0).toUpperCase() + t.regime.slice(1)
    };
  }, [R, t]), F = a.useRef(null), S = () => F.current?.reset();
  return /* @__PURE__ */ e.jsxs("div", { className: "relative w-full h-[calc(100vh-180px)] min-h-[600px] bg-[#1c1c1c] rounded-lg overflow-hidden border border-border", children: [
    /* @__PURE__ */ e.jsxs(
      It,
      {
        camera: { position: [15, 12, 15], fov: 45 },
        style: { background: "#1c1c1c" },
        children: [
          /* @__PURE__ */ e.jsx("ambientLight", { intensity: 0.4 }),
          /* @__PURE__ */ e.jsx("pointLight", { position: [10, 20, 10], intensity: 1.2 }),
          /* @__PURE__ */ e.jsx("directionalLight", { position: [-10, 15, 10], intensity: 0.8 }),
          /* @__PURE__ */ e.jsx("directionalLight", { position: [10, -10, -10], intensity: 0.3 }),
          /* @__PURE__ */ e.jsx(Ar, { show: p, size: 20 }),
          /* @__PURE__ */ e.jsx(Rr, { show: m, range: 8 }),
          /* @__PURE__ */ e.jsx(Cr, { data: T, colorScheme: n, opacity: d }),
          r && /* @__PURE__ */ e.jsx(kr, { data: T, opacity: l }),
          /* @__PURE__ */ e.jsx(ke, { position: [-4, T.maxZ + 1, -4], fontSize: 0.35, color: "#e8e8e8", children: "Sector 1" }),
          /* @__PURE__ */ e.jsx(ke, { position: [0, T.maxZ + 1, 0], fontSize: 0.35, color: "#e8e8e8", children: "Sector 2" }),
          /* @__PURE__ */ e.jsx(ke, { position: [4, T.maxZ + 1, 4], fontSize: 0.35, color: "#e8e8e8", children: "Sector 3" }),
          /* @__PURE__ */ e.jsx(
            zt,
            {
              ref: F,
              enablePan: !0,
              enableZoom: !0,
              enableRotate: !0,
              minDistance: 5,
              maxDistance: 60,
              autoRotate: u,
              autoRotateSpeed: b
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none", children: [
      /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-3 pointer-events-auto", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-card rounded-lg px-4 py-2 border border-border flex items-center gap-2 text-[#e8e8e8]", children: [
        /* @__PURE__ */ e.jsx("span", { className: "font-semibold text-[#e8e8e8]", children: "Correlation Matrix Surface" }),
        /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
          /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4 text-[#b0b0b0] cursor-help" }) }),
          /* @__PURE__ */ e.jsx(xt, { className: "max-w-sm", children: /* @__PURE__ */ e.jsx("p", { className: "text-sm", children: "3D visualization of pairwise asset correlations. Height represents correlation strength with sector clustering effects." }) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(le, { variant: "outline", size: "sm", onClick: S, className: "bg-card pointer-events-auto text-[#e8e8e8] hover:text-[#e8e8e8]", children: [
        /* @__PURE__ */ e.jsx(jt, { className: "h-4 w-4 mr-1" }),
        "Reset View"
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "absolute left-4 top-20 w-72 space-y-2 pointer-events-auto", children: [
      /* @__PURE__ */ e.jsxs($e, { open: f, onOpenChange: k, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[#e8e8e8]", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(vt, { className: "h-4 w-4" }),
            "Correlation Parameters"
          ] }),
          f ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-4 text-[#e8e8e8]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Market Regime" }),
            /* @__PURE__ */ e.jsxs(Jt, { value: t.regime, onValueChange: (h) => s((y) => ({ ...y, regime: h })), children: [
              /* @__PURE__ */ e.jsx(es, { className: "h-8 text-[#e8e8e8]", children: /* @__PURE__ */ e.jsx(ts, {}) }),
              /* @__PURE__ */ e.jsxs(ss, { children: [
                /* @__PURE__ */ e.jsx(Qe, { value: "normal", children: "Normal" }),
                /* @__PURE__ */ e.jsx(Qe, { value: "stressed", children: "Stressed" }),
                /* @__PURE__ */ e.jsx(Qe, { value: "crisis", children: "Crisis" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Asset Count" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[#e8e8e8]", children: t.assetCount })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [t.assetCount], onValueChange: ([h]) => s((y) => ({ ...y, assetCount: h })), min: 10, max: 40, step: 5 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Base Correlation" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[#e8e8e8]", children: [
                (t.baseCorrelation * 100).toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [t.baseCorrelation * 100], onValueChange: ([h]) => s((y) => ({ ...y, baseCorrelation: h / 100 })), min: 0, max: 80, step: 5 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Cluster Strength" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[#e8e8e8]", children: [
                (t.clusterStrength * 100).toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [t.clusterStrength * 100], onValueChange: ([h]) => s((y) => ({ ...y, clusterStrength: h / 100 })), min: 0, max: 100, step: 10 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Stress Multiplier" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[#e8e8e8]", children: [
                t.stressMultiplier.toFixed(1),
                "×"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [t.stressMultiplier * 10], onValueChange: ([h]) => s((y) => ({ ...y, stressMultiplier: h / 10 })), min: 0, max: 10, step: 1 })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ e.jsxs($e, { open: v, onOpenChange: $, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[#e8e8e8]", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(Pt, { className: "h-4 w-4" }),
            "Visual Settings"
          ] }),
          v ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-4 text-[#e8e8e8]", children: [
          /* @__PURE__ */ e.jsx(qt, { value: n.id, onChange: o }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Surface Opacity" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[#e8e8e8]", children: [
                (d * 100).toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [d * 100], onValueChange: ([h]) => x(h / 100), min: 20, max: 100, step: 5 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Wireframe" }),
            /* @__PURE__ */ e.jsx(Me, { checked: r, onCheckedChange: i })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-[#b0b0b0] flex items-center gap-1", children: [
              /* @__PURE__ */ e.jsx(is, { className: "h-3 w-3" }),
              " Grid"
            ] }),
            /* @__PURE__ */ e.jsx(Me, { checked: p, onCheckedChange: C })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-[#b0b0b0] flex items-center gap-1", children: [
              /* @__PURE__ */ e.jsx(ls, { className: "h-3 w-3" }),
              " Axes"
            ] }),
            /* @__PURE__ */ e.jsx(Me, { checked: m, onCheckedChange: j })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Auto Rotate" }),
            /* @__PURE__ */ e.jsx(Me, { checked: u, onCheckedChange: N })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute right-4 top-20 w-56 pointer-events-auto", children: /* @__PURE__ */ e.jsxs($e, { open: A, onOpenChange: z, children: [
      /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[#e8e8e8]", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4" }),
          "Portfolio Metrics"
        ] }),
        A ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
      ] }) }),
      /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-3 bg-card border-border space-y-3 text-[#e8e8e8]", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[#b0b0b0]", children: "Regime" }),
          /* @__PURE__ */ e.jsx("span", { className: `text-sm font-medium ${t.regime === "crisis" ? "text-[#f0426c]" : t.regime === "stressed" ? "text-[#c58435]" : "text-[#e8e8e8]"}`, children: I.regime })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[#b0b0b0]", children: "Avg Correlation" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm font-medium text-[#e8e8e8]", children: I.avgCorrelation })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[#b0b0b0]", children: "Max Correlation" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm font-medium text-[#e8e8e8]", children: I.maxCorrelation })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[#b0b0b0]", children: "Min Correlation" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm font-medium text-[#e8e8e8]", children: I.minCorrelation })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[#b0b0b0]", children: "Effective Assets" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm font-medium text-[#e8e8e8]", children: I.effectiveAssets })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[#b0b0b0]", children: "Diversification" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm font-medium text-[#e8e8e8]", children: [
            I.diversificationRatio,
            "×"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "pt-2 border-t border-border", children: [
          /* @__PURE__ */ e.jsx("div", { className: "text-xs text-[#b0b0b0] mb-2", children: "Correlation Scale" }),
          /* @__PURE__ */ e.jsx("div", { className: "flex h-3 rounded overflow-hidden", children: n.colors.map((h, y) => /* @__PURE__ */ e.jsx("div", { className: "flex-1", style: { backgroundColor: h } }, y)) }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between text-xs text-[#b0b0b0] mt-1", children: [
            /* @__PURE__ */ e.jsx("span", { children: "-ρ" }),
            /* @__PURE__ */ e.jsx("span", { children: "+ρ" })
          ] })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-card rounded-lg px-4 py-2 border border-border flex items-center gap-4 text-xs text-[#b0b0b0]", children: [
      /* @__PURE__ */ e.jsx("span", { children: "Drag to rotate" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
      /* @__PURE__ */ e.jsx("span", { children: "Scroll to zoom" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
      /* @__PURE__ */ e.jsx("span", { children: "Right-click to pan" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
      /* @__PURE__ */ e.jsxs("span", { children: [
        "Assets: ",
        t.assetCount,
        "×",
        t.assetCount
      ] })
    ] }) })
  ] });
}
function ws(t, s, n) {
  const { curveShape: o, baseRate: r, steepness: i, volatility: l } = n;
  let c = r, d = 0, x = 0;
  switch (o) {
    case "normal":
      d = i * 0.02, x = -i * 5e-3;
      break;
    case "inverted":
      d = -i * 0.025, x = i * 3e-3;
      break;
    case "flat":
      d = 0, x = 0;
      break;
    case "humped":
      d = i * 0.01, x = -i * 0.02;
      break;
  }
  const p = 2, C = 1 - Math.exp(-t / p), m = C - t * Math.exp(-t / p) / p;
  let j = c + d * (C / (t / p)) + x * m;
  const u = (s - 0.5) * n.timeEvolution * 0.01;
  j += u;
  const N = Math.sin(t * 3 + s * 5) * l * 2e-3;
  return j += N, Math.max(0, j);
}
function Pr({ data: t, colorScheme: s, opacity: n }) {
  const o = a.useMemo(() => {
    const r = t.geometry.clone(), i = r.attributes.position.array, l = new Float32Array(i.length);
    for (let c = 0; c < i.length; c += 3) {
      const d = i[c + 2], x = new yt(s.getColor(d, t.minZ, t.maxZ));
      l[c] = x.r, l[c + 1] = x.g, l[c + 2] = x.b;
    }
    return r.setAttribute("color", new Mt(l, 3)), r;
  }, [t, s]);
  return /* @__PURE__ */ e.jsx("mesh", { geometry: o, rotation: [-Math.PI / 2, 0, 0], children: /* @__PURE__ */ e.jsx(
    "meshStandardMaterial",
    {
      vertexColors: !0,
      side: Xt,
      roughness: 0.35,
      metalness: 0.1,
      transparent: !0,
      opacity: n
    }
  ) });
}
function Er({ data: t, opacity: s }) {
  return /* @__PURE__ */ e.jsx("mesh", { geometry: t.geometry, rotation: [-Math.PI / 2, 0, 0], children: /* @__PURE__ */ e.jsx(
    "meshBasicMaterial",
    {
      color: "#e8e8e8",
      wireframe: !0,
      transparent: !0,
      opacity: s
    }
  ) });
}
function Tr({ show: t, size: s = 20 }) {
  return t ? /* @__PURE__ */ e.jsxs("group", { children: [
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, "#3a3a3a", "#2e2e2e"], position: [0, 0, 0] }),
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, "#3a3a3a", "#2e2e2e"], position: [0, s / 2, -s / 2], rotation: [Math.PI / 2, 0, 0] }),
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, "#3a3a3a", "#2e2e2e"], position: [-s / 2, s / 2, 0], rotation: [0, 0, Math.PI / 2] })
  ] }) : null;
}
function Lr({ show: t, range: s }) {
  return t ? /* @__PURE__ */ e.jsxs("group", { children: [
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx("bufferAttribute", { attach: "attributes-position", count: 2, array: new Float32Array([-s, 0, 0, s, 0, 0]), itemSize: 3 }) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: "#808080" })
    ] }),
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx("bufferAttribute", { attach: "attributes-position", count: 2, array: new Float32Array([0, 0, 0, 0, s, 0]), itemSize: 3 }) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: "#808080" })
    ] }),
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx("bufferAttribute", { attach: "attributes-position", count: 2, array: new Float32Array([0, 0, -s, 0, 0, s]), itemSize: 3 }) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: "#808080" })
    ] }),
    /* @__PURE__ */ e.jsx(ke, { position: [s + 0.8, 0, 0], fontSize: 0.4, color: "#b0b0b0", children: "Maturity" }),
    /* @__PURE__ */ e.jsx(ke, { position: [0, s + 0.5, 0], fontSize: 0.4, color: "#b0b0b0", children: "Yield" }),
    /* @__PURE__ */ e.jsx(ke, { position: [0, 0, s + 0.6], fontSize: 0.4, color: "#b0b0b0", children: "Time" })
  ] }) : null;
}
function $r() {
  const [t, s] = a.useState({
    curveShape: "normal",
    baseRate: 0.04,
    steepness: 1,
    volatility: 0.5,
    timeEvolution: 0.5
  }), [n, o] = a.useState($t[4]), [r, i] = a.useState(!0), [l, c] = a.useState(0.15), [d, x] = a.useState(0.95), [p, C] = a.useState(!0), [m, j] = a.useState(!0), [u, N] = a.useState(!1), [b, P] = a.useState(1), [f, k] = a.useState(40), [v, $] = a.useState(!0), [A, z] = a.useState(!1), [R, T] = a.useState(!0), I = a.useMemo(() => {
    const y = f, w = f, M = Array.from(
      { length: y },
      (O, L) => 0.25 + L / (y - 1) * 29.75
    ), Y = Array.from(
      { length: w },
      (O, L) => L / (w - 1)
    ), _ = [], se = [];
    let V = 1 / 0, W = -1 / 0;
    for (let O = 0; O < y; O++)
      for (let L = 0; L < w; L++) {
        const D = M[O], X = Y[L], B = ws(D, X, t), g = (Math.log(D) - Math.log(0.25)) / (Math.log(30) - Math.log(0.25)) * 10 - 5, oe = B * 100, re = X * 10 - 5;
        if (_.push(g, oe, re), V = Math.min(V, oe), W = Math.max(W, oe), O < y - 1 && L < w - 1) {
          const U = O * w + L;
          se.push(U, U + 1, U + w), se.push(U + 1, U + w + 1, U + w);
        }
      }
    const te = new At();
    return te.setAttribute("position", new ns(_, 3)), te.setIndex(se), te.computeVertexNormals(), { geometry: te, minZ: V, maxZ: W };
  }, [t, f]), F = a.useMemo(() => {
    const y = ws(0.25, 0.5, t), w = ws(2, 0.5, t), M = ws(10, 0.5, t), Y = ws(30, 0.5, t), _ = (M - w) * 100, se = (M - y) * 100;
    return {
      shortRate: (y * 100).toFixed(2),
      y2y: (w * 100).toFixed(2),
      y10y: (M * 100).toFixed(2),
      y30y: (Y * 100).toFixed(2),
      spread2s10s: _.toFixed(0),
      curveSlope: se > 50 ? "Steep" : se > 0 ? "Normal" : se > -50 ? "Flat" : "Inverted"
    };
  }, [t]), S = a.useRef(null), h = () => S.current?.reset();
  return /* @__PURE__ */ e.jsxs("div", { className: "relative w-full h-[calc(100vh-180px)] min-h-[600px] bg-[var(--bg)] rounded-lg overflow-hidden border border-border", children: [
    /* @__PURE__ */ e.jsxs(
      It,
      {
        camera: { position: [15, 10, 15], fov: 45 },
        style: { background: "var(--bg, #1c1c1c)" },
        children: [
          /* @__PURE__ */ e.jsx("ambientLight", { intensity: 0.4 }),
          /* @__PURE__ */ e.jsx("pointLight", { position: [10, 20, 10], intensity: 1.2 }),
          /* @__PURE__ */ e.jsx("directionalLight", { position: [-10, 15, 10], intensity: 0.8 }),
          /* @__PURE__ */ e.jsx("directionalLight", { position: [10, -10, -10], intensity: 0.3 }),
          /* @__PURE__ */ e.jsx(Tr, { show: p, size: 20 }),
          /* @__PURE__ */ e.jsx(Lr, { show: m, range: 8 }),
          /* @__PURE__ */ e.jsx(Pr, { data: I, colorScheme: n, opacity: d }),
          r && /* @__PURE__ */ e.jsx(Er, { data: I, opacity: l }),
          /* @__PURE__ */ e.jsx(ke, { position: [-5, 0.3, -6], fontSize: 0.3, color: "#e8e8e8", children: "3M" }),
          /* @__PURE__ */ e.jsx(ke, { position: [-1, 0.3, -6], fontSize: 0.3, color: "#e8e8e8", children: "2Y" }),
          /* @__PURE__ */ e.jsx(ke, { position: [2.5, 0.3, -6], fontSize: 0.3, color: "#e8e8e8", children: "10Y" }),
          /* @__PURE__ */ e.jsx(ke, { position: [5, 0.3, -6], fontSize: 0.3, color: "#e8e8e8", children: "30Y" }),
          /* @__PURE__ */ e.jsx(
            zt,
            {
              ref: S,
              enablePan: !0,
              enableZoom: !0,
              enableRotate: !0,
              minDistance: 5,
              maxDistance: 60,
              autoRotate: u,
              autoRotateSpeed: b
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none", children: [
      /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-3 pointer-events-auto", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-card rounded-lg px-4 py-2 border border-border flex items-center gap-2 text-[var(--text)]", children: [
        /* @__PURE__ */ e.jsx("span", { className: "font-semibold text-[var(--text)]", children: "Term Structure Surface" }),
        /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
          /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4 text-[var(--dim)] cursor-help" }) }),
          /* @__PURE__ */ e.jsx(xt, { className: "max-w-sm", children: /* @__PURE__ */ e.jsx("p", { className: "text-sm", children: "3D visualization of yield curve evolution over time using Nelson-Siegel model dynamics." }) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(le, { variant: "outline", size: "sm", onClick: h, className: "bg-card pointer-events-auto text-[var(--text)] hover:text-[var(--text)]", children: [
        /* @__PURE__ */ e.jsx(jt, { className: "h-4 w-4 mr-1" }),
        "Reset View"
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "absolute left-4 top-20 w-72 space-y-2 pointer-events-auto", children: [
      /* @__PURE__ */ e.jsxs($e, { open: v, onOpenChange: $, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(vt, { className: "h-4 w-4" }),
            "Curve Parameters"
          ] }),
          v ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-4 text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Curve Shape" }),
            /* @__PURE__ */ e.jsxs(Jt, { value: t.curveShape, onValueChange: (y) => s((w) => ({ ...w, curveShape: y })), children: [
              /* @__PURE__ */ e.jsx(es, { className: "h-8 text-[var(--text)]", children: /* @__PURE__ */ e.jsx(ts, {}) }),
              /* @__PURE__ */ e.jsxs(ss, { children: [
                /* @__PURE__ */ e.jsx(Qe, { value: "normal", children: "Normal (Upward)" }),
                /* @__PURE__ */ e.jsx(Qe, { value: "inverted", children: "Inverted" }),
                /* @__PURE__ */ e.jsx(Qe, { value: "flat", children: "Flat" }),
                /* @__PURE__ */ e.jsx(Qe, { value: "humped", children: "Humped" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Base Rate" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                (t.baseRate * 100).toFixed(1),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [t.baseRate * 100], onValueChange: ([y]) => s((w) => ({ ...w, baseRate: y / 100 })), min: 0, max: 10, step: 0.25 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Steepness" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[var(--text)]", children: t.steepness.toFixed(1) })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [t.steepness * 10], onValueChange: ([y]) => s((w) => ({ ...w, steepness: y / 10 })), min: 0, max: 20, step: 1 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Rate Volatility" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[var(--text)]", children: t.volatility.toFixed(1) })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [t.volatility * 10], onValueChange: ([y]) => s((w) => ({ ...w, volatility: y / 10 })), min: 0, max: 20, step: 1 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Time Evolution" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[var(--text)]", children: t.timeEvolution.toFixed(1) })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [t.timeEvolution * 10], onValueChange: ([y]) => s((w) => ({ ...w, timeEvolution: y / 10 })), min: 0, max: 30, step: 1 })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ e.jsxs($e, { open: A, onOpenChange: z, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(Pt, { className: "h-4 w-4" }),
            "Visual Settings"
          ] }),
          A ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-4 text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsx(qt, { value: n.id, onChange: o }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Surface Opacity" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                (d * 100).toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [d * 100], onValueChange: ([y]) => x(y / 100), min: 20, max: 100, step: 5 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Wireframe" }),
            /* @__PURE__ */ e.jsx(Me, { checked: r, onCheckedChange: i })
          ] }),
          r && /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Wireframe Opacity" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                (l * 100).toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [l * 100], onValueChange: ([y]) => c(y / 100), min: 5, max: 50, step: 5 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Resolution" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                f,
                "×",
                f
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [f], onValueChange: ([y]) => k(y), min: 20, max: 80, step: 10 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-[var(--dim)] flex items-center gap-1", children: [
              /* @__PURE__ */ e.jsx(is, { className: "h-3 w-3" }),
              " Grid"
            ] }),
            /* @__PURE__ */ e.jsx(Me, { checked: p, onCheckedChange: C })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-[var(--dim)] flex items-center gap-1", children: [
              /* @__PURE__ */ e.jsx(ls, { className: "h-3 w-3" }),
              " Axes"
            ] }),
            /* @__PURE__ */ e.jsx(Me, { checked: m, onCheckedChange: j })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Auto Rotate" }),
            /* @__PURE__ */ e.jsx(Me, { checked: u, onCheckedChange: N })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute right-4 top-20 w-56 pointer-events-auto", children: /* @__PURE__ */ e.jsxs($e, { open: R, onOpenChange: T, children: [
      /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[var(--text)]", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4" }),
          "Curve Metrics"
        ] }),
        R ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
      ] }) }),
      /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-3 bg-card border-border space-y-3 text-[var(--text)]", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "3M Rate" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm font-medium text-[var(--text)]", children: [
            F.shortRate,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "2Y Yield" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm font-medium text-[var(--text)]", children: [
            F.y2y,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "10Y Yield" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm font-medium text-[var(--text)]", children: [
            F.y10y,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "30Y Yield" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm font-medium text-[var(--text)]", children: [
            F.y30y,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "2s10s Spread" }),
          /* @__PURE__ */ e.jsxs("span", { className: `text-sm font-medium ${parseInt(F.spread2s10s) < 0 ? "text-[var(--down)]" : "text-[var(--text)]"}`, children: [
            F.spread2s10s,
            "bps"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "Curve Shape" }),
          /* @__PURE__ */ e.jsx("span", { className: `text-sm font-medium ${F.curveSlope === "Inverted" ? "text-[var(--down)]" : F.curveSlope === "Flat" ? "text-[#c58435]" : "text-[var(--text)]"}`, children: F.curveSlope })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "pt-2 border-t border-border", children: [
          /* @__PURE__ */ e.jsx("div", { className: "text-xs text-[var(--dim)] mb-2", children: "Yield Scale" }),
          /* @__PURE__ */ e.jsx("div", { className: "flex h-3 rounded overflow-hidden", children: n.colors.map((y, w) => /* @__PURE__ */ e.jsx("div", { className: "flex-1", style: { backgroundColor: y } }, w)) }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between text-xs text-[var(--dim)] mt-1", children: [
            /* @__PURE__ */ e.jsx("span", { children: "Low" }),
            /* @__PURE__ */ e.jsx("span", { children: "High" })
          ] })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-card rounded-lg px-4 py-2 border border-border flex items-center gap-4 text-xs text-[var(--dim)] text-[var(--text)]", children: [
      /* @__PURE__ */ e.jsx("span", { children: "Drag to rotate" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
      /* @__PURE__ */ e.jsx("span", { children: "Scroll to zoom" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
      /* @__PURE__ */ e.jsx("span", { children: "Right-click to pan" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
      /* @__PURE__ */ e.jsxs("span", { children: [
        "Resolution: ",
        f,
        "²"
      ] })
    ] }) })
  ] });
}
function fs(t) {
  const s = 0.254829592, n = -0.284496736, o = 1.421413741, r = -1.453152027, i = 1.061405429, l = 0.3275911, c = t < 0 ? -1 : 1;
  t = Math.abs(t) / Math.sqrt(2);
  const d = 1 / (1 + l * t), x = 1 - ((((i * d + r) * d + o) * d + n) * d + s) * d * Math.exp(-t * t);
  return 0.5 * (1 + c * x);
}
function zn(t, s, n, o, r, i) {
  if (n <= 0) return Math.max(i ? t - s : s - t, 0);
  const l = (Math.log(t / s) + (o + 0.5 * r * r) * n) / (r * Math.sqrt(n)), c = l - r * Math.sqrt(n);
  return i ? t * fs(l) - s * Math.exp(-o * n) * fs(c) : s * Math.exp(-o * n) * fs(-c) - t * fs(-l);
}
function Vn(t, s, n, o, r, i) {
  if (n <= 0) return i ? t > s ? 1 : 0 : t < s ? -1 : 0;
  const l = (Math.log(t / s) + (o + 0.5 * r * r) * n) / (r * Math.sqrt(n));
  return i ? fs(l) : fs(l) - 1;
}
function Ir({ data: t, colorScheme: s, opacity: n }) {
  const o = a.useMemo(() => {
    const r = t.geometry.clone(), i = r.attributes.position.array, l = new Float32Array(i.length);
    for (let c = 0; c < i.length; c += 3) {
      const d = i[c + 2], x = new yt(s.getColor(d, t.minZ, t.maxZ));
      l[c] = x.r, l[c + 1] = x.g, l[c + 2] = x.b;
    }
    return r.setAttribute("color", new Mt(l, 3)), r;
  }, [t, s]);
  return /* @__PURE__ */ e.jsx("mesh", { geometry: o, rotation: [-Math.PI / 2, 0, 0], children: /* @__PURE__ */ e.jsx("meshStandardMaterial", { vertexColors: !0, side: Xt, roughness: 0.4, metalness: 0.1, transparent: !0, opacity: n }) });
}
function zr({ data: t, opacity: s }) {
  return /* @__PURE__ */ e.jsx("mesh", { geometry: t.geometry, rotation: [-Math.PI / 2, 0, 0], children: /* @__PURE__ */ e.jsx("meshBasicMaterial", { color: "#e8e8e8", wireframe: !0, transparent: !0, opacity: s }) });
}
function Vr({ show: t, size: s = 20 }) {
  return t ? /* @__PURE__ */ e.jsxs("group", { children: [
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, "#3a3a3a", "#2e2e2e"], position: [0, 0, 0] }),
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, "#3a3a3a", "#2e2e2e"], position: [0, s / 2, -s / 2], rotation: [Math.PI / 2, 0, 0] }),
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, "#3a3a3a", "#2e2e2e"], position: [-s / 2, s / 2, 0], rotation: [0, 0, Math.PI / 2] })
  ] }) : null;
}
function Dr({ show: t, range: s }) {
  return t ? /* @__PURE__ */ e.jsxs("group", { children: [
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx("bufferAttribute", { attach: "attributes-position", count: 2, array: new Float32Array([-s, 0, 0, s, 0, 0]), itemSize: 3 }) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: "#808080" })
    ] }),
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx("bufferAttribute", { attach: "attributes-position", count: 2, array: new Float32Array([0, 0, 0, 0, s, 0]), itemSize: 3 }) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: "#808080" })
    ] }),
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx("bufferAttribute", { attach: "attributes-position", count: 2, array: new Float32Array([0, 0, -s, 0, 0, s]), itemSize: 3 }) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: "#808080" })
    ] }),
    /* @__PURE__ */ e.jsx(ke, { position: [s + 0.5, 0, 0], fontSize: 0.4, color: "#b0b0b0", children: "Spot" }),
    /* @__PURE__ */ e.jsx(ke, { position: [0, s + 0.5, 0], fontSize: 0.4, color: "#b0b0b0", children: "Value" }),
    /* @__PURE__ */ e.jsx(ke, { position: [0, 0, s + 0.5], fontSize: 0.4, color: "#b0b0b0", children: "Time" })
  ] }) : null;
}
function Or() {
  const [t, s] = a.useState(100), [n, o] = a.useState(25), [r, i] = a.useState(5), [l, c] = a.useState(!0), [d, x] = a.useState("price"), [p, C] = a.useState($t[4]), [m, j] = a.useState(!0), [u, N] = a.useState(0.15), [b, P] = a.useState(0.95), [f, k] = a.useState(!0), [v, $] = a.useState(!0), [A, z] = a.useState(!1), [R, T] = a.useState(1), [I, F] = a.useState(40), [S, h] = a.useState(!0), [y, w] = a.useState(!1), [M, Y] = a.useState(!0), _ = a.useRef(null), se = a.useMemo(() => {
    const te = I, O = I, L = Array.from({ length: te }, (E, G) => 0.5 + G / (te - 1) * 1), D = Array.from({ length: O }, (E, G) => 0.02 + G / (O - 1) * 1.98), X = [], B = [];
    let g = 1 / 0, oe = -1 / 0;
    const re = n / 100, U = r / 100;
    for (let E = 0; E < O; E++)
      for (let G = 0; G < te; G++) {
        const J = D[E], K = L[G] * t;
        let ue;
        d === "price" ? ue = zn(K, t, J, U, re, l) : (ue = Vn(K, t, J, U, re, l), ue = ue * 20);
        const ce = (L[G] - 0.5) / 1 * 10 - 5, Q = d === "price" ? ue / 5 : ue, ne = J * 5;
        if (X.push(ce, Q, ne), g = Math.min(g, Q), oe = Math.max(oe, Q), E < O - 1 && G < te - 1) {
          const H = E * te + G, me = H + 1, be = H + te, Re = be + 1;
          B.push(H, me, be), B.push(me, Re, be);
        }
      }
    const ee = new At();
    return ee.setAttribute("position", new ns(X, 3)), ee.setIndex(B), ee.computeVertexNormals(), { geometry: ee, minZ: g, maxZ: oe };
  }, [t, n, r, l, d, I]), V = a.useMemo(() => {
    const te = n / 100, O = r / 100, L = zn(t, t, 1, O, te, l), D = Vn(t, t, 1, O, te, l);
    return { atmPrice: L, atmDelta: D };
  }, [t, n, r, l]), W = () => {
    _.current && _.current.reset();
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "relative w-full h-[calc(100vh-180px)] min-h-[600px] bg-[var(--bg)] rounded-lg overflow-hidden border border-border", children: [
    /* @__PURE__ */ e.jsxs(It, { camera: { position: [15, 10, 15], fov: 45 }, style: { background: "#1c1c1c" }, children: [
      /* @__PURE__ */ e.jsx("ambientLight", { intensity: 0.4 }),
      /* @__PURE__ */ e.jsx("pointLight", { position: [10, 20, 10], intensity: 1.2 }),
      /* @__PURE__ */ e.jsx("directionalLight", { position: [-10, 15, 10], intensity: 0.8 }),
      /* @__PURE__ */ e.jsx("directionalLight", { position: [10, -10, -10], intensity: 0.3 }),
      /* @__PURE__ */ e.jsx(Vr, { show: f, size: 20 }),
      /* @__PURE__ */ e.jsx(Dr, { show: v, range: 8 }),
      /* @__PURE__ */ e.jsx(Ir, { data: se, colorScheme: p, opacity: b }),
      m && /* @__PURE__ */ e.jsx(zr, { data: se, opacity: u }),
      /* @__PURE__ */ e.jsx(zt, { ref: _, enablePan: !0, enableZoom: !0, enableRotate: !0, minDistance: 5, maxDistance: 60, autoRotate: A, autoRotateSpeed: R })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3 pointer-events-auto", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "bg-card rounded-lg px-4 py-2 border border-border flex items-center gap-2", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "font-semibold font-mono", children: [
            "3D BLACK-SCHOLES ",
            d === "price" ? "PRICE" : "DELTA",
            " SURFACE"
          ] }),
          /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
            /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4 text-[var(--dim)] cursor-help" }) }),
            /* @__PURE__ */ e.jsx(xt, { className: "max-w-sm font-mono", children: /* @__PURE__ */ e.jsx("p", { className: "text-sm", children: "C = S·N(d₁) - K·e^(-rT)·N(d₂)" }) })
          ] }) })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: `px-3 py-1 rounded text-xs font-mono font-semibold bg-[var(--bg2)] border border-[var(--edge)] ${l ? "text-[var(--up)]" : "text-[var(--down)]"}`, children: l ? "CALL" : "PUT" })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-2 pointer-events-auto", children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", size: "sm", onClick: W, className: "bg-card", children: [
        /* @__PURE__ */ e.jsx(jt, { className: "h-4 w-4 mr-1" }),
        "Reset View"
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "absolute left-4 top-20 w-72 space-y-2 pointer-events-auto max-h-[calc(100%-140px)] overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs($e, { open: S, onOpenChange: h, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card font-mono text-xs", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(vt, { className: "h-4 w-4" }),
            " PARAMETERS"
          ] }),
          S ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-4", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ e.jsx(le, { variant: l ? "default" : "outline", size: "sm", onClick: () => c(!0), className: "flex-1 font-mono text-xs", children: "CALL" }),
            /* @__PURE__ */ e.jsx(le, { variant: l ? "outline" : "default", size: "sm", onClick: () => c(!1), className: "flex-1 font-mono text-xs", children: "PUT" })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ e.jsx(le, { variant: d === "price" ? "default" : "outline", size: "sm", onClick: () => x("price"), className: "flex-1 font-mono text-xs", children: "PRICE" }),
            /* @__PURE__ */ e.jsx(le, { variant: d === "delta" ? "default" : "outline", size: "sm", onClick: () => x("delta"), className: "flex-1 font-mono text-xs", children: "DELTA" })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "STRIKE (K)" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs", children: [
                "$",
                t
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [t], onValueChange: ([te]) => s(te), min: 50, max: 200, step: 5 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "VOL (σ)" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs", children: [
                n,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [n], onValueChange: ([te]) => o(te), min: 5, max: 100, step: 1 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "RATE (r)" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs", children: [
                r,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [r], onValueChange: ([te]) => i(te), min: 0, max: 15, step: 0.5 })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ e.jsxs($e, { open: y, onOpenChange: w, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card font-mono text-xs", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(Pt, { className: "h-4 w-4" }),
            " DISPLAY"
          ] }),
          y ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-4", children: [
          /* @__PURE__ */ e.jsx(qt, { value: p.id, onChange: C }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "OPACITY" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs", children: [
                (b * 100).toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [b * 100], onValueChange: ([te]) => P(te / 100), min: 20, max: 100, step: 5 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)] font-mono", children: "WIREFRAME" }),
            /* @__PURE__ */ e.jsx(Me, { checked: m, onCheckedChange: j })
          ] }),
          m && /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "WIRE OPACITY" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs", children: [
                (u * 100).toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [u * 100], onValueChange: ([te]) => N(te / 100), min: 5, max: 50, step: 5 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "RESOLUTION" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs", children: [
                I,
                "²"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [I], onValueChange: ([te]) => F(te), min: 20, max: 80, step: 10 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-[var(--dim)] font-mono flex items-center gap-1", children: [
              /* @__PURE__ */ e.jsx(is, { className: "h-3 w-3" }),
              " GRID"
            ] }),
            /* @__PURE__ */ e.jsx(Me, { checked: f, onCheckedChange: k })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-[var(--dim)] font-mono flex items-center gap-1", children: [
              /* @__PURE__ */ e.jsx(ls, { className: "h-3 w-3" }),
              " AXES"
            ] }),
            /* @__PURE__ */ e.jsx(Me, { checked: v, onCheckedChange: $ })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)] font-mono", children: "AUTO ROTATE" }),
            /* @__PURE__ */ e.jsx(Me, { checked: A, onCheckedChange: z })
          ] }),
          A && /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "SPEED" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs", children: [
                R,
                "×"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [R], onValueChange: ([te]) => T(te), min: 0.5, max: 5, step: 0.5 })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute right-4 top-20 w-56 pointer-events-auto", children: /* @__PURE__ */ e.jsxs($e, { open: M, onOpenChange: Y, children: [
      /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card font-mono text-xs", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4" }),
          " STATISTICS"
        ] }),
        M ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
      ] }) }),
      /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-3 bg-card border-border space-y-3", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "ATM PRICE (1Y)" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm font-bold text-[var(--up)]", children: [
            "$",
            V.atmPrice.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "ATM DELTA (1Y)" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm", children: V.atmDelta.toFixed(4) })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "STRIKE" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm", children: [
            "$",
            t
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "VOLATILITY" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm", children: [
            n,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "RISK-FREE" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm", children: [
            r,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "pt-2 border-t border-border", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "text-xs text-[var(--dim)] mb-2 font-mono", children: [
            d === "price" ? "PRICE" : "DELTA",
            " SCALE"
          ] }),
          /* @__PURE__ */ e.jsx("div", { className: "flex h-3 rounded overflow-hidden", children: p.colors.map((te, O) => /* @__PURE__ */ e.jsx("div", { className: "flex-1", style: { backgroundColor: te } }, O)) }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between text-xs text-[var(--dim)] mt-1 font-mono", children: [
            /* @__PURE__ */ e.jsx("span", { children: "LOW" }),
            /* @__PURE__ */ e.jsx("span", { children: "HIGH" })
          ] })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-card rounded-lg px-4 py-2 border border-border flex items-center gap-4 text-xs text-[var(--dim)] font-mono", children: [
      /* @__PURE__ */ e.jsx("span", { children: "Drag to rotate" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
      /* @__PURE__ */ e.jsx("span", { children: "Scroll to zoom" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
      /* @__PURE__ */ e.jsx("span", { children: "Right-click to pan" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
      /* @__PURE__ */ e.jsxs("span", { children: [
        "Resolution: ",
        I,
        "²"
      ] })
    ] }) })
  ] });
}
const Wr = [
  // Terminal palette hexes (not CSS vars) so the dots stay valid if ever fed to three.js
  { name: "S&P 500", symbol: "SPY", expectedReturn: 10, volatility: 18, color: "#e8e8e8" },
  { name: "Bonds", symbol: "BND", expectedReturn: 4, volatility: 6, color: "#21b3a4" },
  { name: "Gold", symbol: "GLD", expectedReturn: 6, volatility: 15, color: "#c58435" },
  { name: "Real Estate", symbol: "VNQ", expectedReturn: 8, volatility: 20, color: "#b0b0b0" },
  { name: "Emerging", symbol: "EEM", expectedReturn: 12, volatility: 25, color: "#f0426c" }
], Hr = [
  [1, 0.1, 0.05, 0.65, 0.7],
  [0.1, 1, 0.2, 0.15, 0.1],
  [0.05, 0.2, 1, 0.1, 0.15],
  [0.65, 0.15, 0.1, 1, 0.55],
  [0.7, 0.1, 0.15, 0.55, 1]
];
function Gr(t, s) {
  const n = t.length, o = Array(n).fill(0).map(() => Array(n).fill(0));
  for (let r = 0; r < n; r++)
    for (let i = 0; i < n; i++)
      o[r][i] = s[r][i] * (t[r].volatility / 100) * (t[i].volatility / 100);
  return o;
}
function ln(t, s, n) {
  const o = s.length;
  let r = 0;
  for (let d = 0; d < o; d++) r += t[d] * s[d].expectedReturn;
  let i = 0;
  for (let d = 0; d < o; d++)
    for (let x = 0; x < o; x++) i += t[d] * t[x] * n[d][x];
  const l = Math.sqrt(i) * 100, c = l > 0 ? (r - 3) / l : 0;
  return { expectedReturn: r, volatility: l, sharpe: c };
}
function Br({ data: t, colorScheme: s, opacity: n }) {
  const o = a.useMemo(() => {
    const r = t.geometry.clone(), i = r.attributes.position.array, l = new Float32Array(i.length);
    for (let c = 0; c < i.length; c += 3) {
      const d = i[c + 2], x = new yt(s.getColor(d, t.minZ, t.maxZ));
      l[c] = x.r, l[c + 1] = x.g, l[c + 2] = x.b;
    }
    return r.setAttribute("color", new Mt(l, 3)), r;
  }, [t, s]);
  return /* @__PURE__ */ e.jsx("mesh", { geometry: o, rotation: [-Math.PI / 2, 0, 0], children: /* @__PURE__ */ e.jsx("meshStandardMaterial", { vertexColors: !0, side: Xt, roughness: 0.4, metalness: 0.1, transparent: !0, opacity: n }) });
}
function _r({ data: t, opacity: s }) {
  return /* @__PURE__ */ e.jsx("mesh", { geometry: t.geometry, rotation: [-Math.PI / 2, 0, 0], children: /* @__PURE__ */ e.jsx("meshBasicMaterial", { color: "#e8e8e8", wireframe: !0, transparent: !0, opacity: s }) });
}
function Yr({ show: t, size: s = 20 }) {
  return t ? /* @__PURE__ */ e.jsxs("group", { children: [
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, "#3a3a3a", "#2e2e2e"], position: [0, 0, 0] }),
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, "#3a3a3a", "#2e2e2e"], position: [0, s / 2, -s / 2], rotation: [Math.PI / 2, 0, 0] }),
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, "#3a3a3a", "#2e2e2e"], position: [-s / 2, s / 2, 0], rotation: [0, 0, Math.PI / 2] })
  ] }) : null;
}
function Xr({ show: t, range: s }) {
  return t ? /* @__PURE__ */ e.jsxs("group", { children: [
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx("bufferAttribute", { attach: "attributes-position", count: 2, array: new Float32Array([-s, 0, 0, s, 0, 0]), itemSize: 3 }) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: "#808080" })
    ] }),
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx("bufferAttribute", { attach: "attributes-position", count: 2, array: new Float32Array([0, 0, 0, 0, s, 0]), itemSize: 3 }) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: "#808080" })
    ] }),
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx("bufferAttribute", { attach: "attributes-position", count: 2, array: new Float32Array([0, 0, -s, 0, 0, s]), itemSize: 3 }) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: "#808080" })
    ] }),
    /* @__PURE__ */ e.jsx(ke, { position: [s + 0.5, 0, 0], fontSize: 0.4, color: "#b0b0b0", children: "SPY%" }),
    /* @__PURE__ */ e.jsx(ke, { position: [0, s + 0.5, 0], fontSize: 0.4, color: "#b0b0b0", children: "Sharpe" }),
    /* @__PURE__ */ e.jsx(ke, { position: [0, 0, s + 0.5], fontSize: 0.4, color: "#b0b0b0", children: "BND%" })
  ] }) : null;
}
function qr({ portfolios: t, maxSharpe: s }) {
  const n = a.useMemo(() => {
    const o = new Float32Array(t.length * 3), r = new Float32Array(t.length * 3);
    t.forEach((l, c) => {
      o[c * 3] = (l.vol - 5) / 25 * 10 - 5, o[c * 3 + 1] = l.sharpe * 5, o[c * 3 + 2] = (l.ret - 3) / 11 * 10 - 5;
      const d = Math.max(0, Math.min(1, l.sharpe / s)), x = new yt("#f0426c").lerp(new yt("#21b3a4"), d);
      r[c * 3] = x.r, r[c * 3 + 1] = x.g, r[c * 3 + 2] = x.b;
    });
    const i = new At();
    return i.setAttribute("position", new Mt(o, 3)), i.setAttribute("color", new Mt(r, 3)), i;
  }, [t, s]);
  return /* @__PURE__ */ e.jsx("points", { geometry: n, children: /* @__PURE__ */ e.jsx("pointsMaterial", { size: 0.08, vertexColors: !0, transparent: !0, opacity: 0.6 }) });
}
function Zr() {
  const [t] = a.useState(Wr), [s, n] = a.useState(3), [o, r] = a.useState("sharpe"), [i, l] = a.useState($t[4]), [c, d] = a.useState(0), [x, p] = a.useState(!0), [C, m] = a.useState(0.15), [j, u] = a.useState(0.9), [N, b] = a.useState(!0), [P, f] = a.useState(!0), [k, v] = a.useState(!0), [$, A] = a.useState(!1), [z, R] = a.useState(1), [T, I] = a.useState(30), [F, S] = a.useState(!0), [h, y] = a.useState(!1), [w, M] = a.useState(!0), Y = a.useRef(null), _ = a.useMemo(() => Gr(t, Hr), [t]), se = a.useMemo(() => {
    const L = [];
    for (let D = 0; D < 2e3; D++) {
      const X = Array(t.length).fill(0).map(() => Math.random()), B = X.reduce((re, U) => re + U, 0), g = X.map((re) => re / B), oe = ln(g, t, _);
      L.push({ vol: oe.volatility, ret: oe.expectedReturn, sharpe: oe.sharpe });
    }
    return L;
  }, [t, _, c]), V = a.useMemo(() => Math.max(...se.map((L) => L.sharpe)), [se]), W = a.useMemo(() => {
    const L = T, D = [], X = [];
    let B = 1 / 0, g = -1 / 0;
    for (let re = 0; re < L; re++)
      for (let U = 0; U < L; U++) {
        const ee = re / (L - 1), E = U / (L - 1), G = 1 - ee - E;
        if (G < -0.01) {
          const J = ee / (ee + E), K = E / (ee + E), ce = ln([J, K, 0, 0, 0], t, _);
          let Q = o === "sharpe" ? ce.sharpe * 8 : o === "return" ? ce.expectedReturn / 2 : -ce.volatility / 5;
          const ne = ee * 10 - 5, H = Q, me = E * 10 - 5;
          D.push(ne, H, me), B = Math.min(B, H), g = Math.max(g, H);
        } else {
          const J = [
            ee,
            E,
            Math.max(0, G) * 0.4,
            // GLD
            Math.max(0, G) * 0.35,
            // VNQ
            Math.max(0, G) * 0.25
            // EEM
          ], K = J.reduce((be, Re) => be + Re, 0), ue = J.map((be) => be / K), ce = ln(ue, t, _);
          let Q;
          o === "sharpe" ? Q = ce.sharpe * 8 : o === "return" ? Q = ce.expectedReturn / 2 : Q = -ce.volatility / 5;
          const ne = ee * 10 - 5, H = Q, me = E * 10 - 5;
          D.push(ne, H, me), G >= -0.01 && (B = Math.min(B, H), g = Math.max(g, H));
        }
        if (re < L - 1 && U < L - 1) {
          const J = re * L + U, K = J + 1, ue = J + L, ce = ue + 1;
          X.push(J, K, ue), X.push(K, ce, ue);
        }
      }
    const oe = new At();
    return oe.setAttribute("position", new ns(D, 3)), oe.setIndex(X), oe.computeVertexNormals(), { geometry: oe, minZ: B, maxZ: g };
  }, [t, _, o, T, s]), te = a.useMemo(() => {
    let L = se[0];
    for (const D of se)
      D.sharpe > L.sharpe && (L = D);
    return L;
  }, [se]), O = () => {
    Y.current && Y.current.reset();
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "relative w-full h-[calc(100vh-180px)] min-h-[600px] bg-[var(--bg)] rounded-lg overflow-hidden border border-border", children: [
    /* @__PURE__ */ e.jsxs(It, { camera: { position: [15, 12, 15], fov: 45 }, style: { background: "#1c1c1c" }, children: [
      /* @__PURE__ */ e.jsx("ambientLight", { intensity: 0.4 }),
      /* @__PURE__ */ e.jsx("pointLight", { position: [10, 20, 10], intensity: 1.2 }),
      /* @__PURE__ */ e.jsx("directionalLight", { position: [-10, 15, 10], intensity: 0.8 }),
      /* @__PURE__ */ e.jsx("directionalLight", { position: [10, -10, -10], intensity: 0.3 }),
      /* @__PURE__ */ e.jsx(Yr, { show: N, size: 20 }),
      /* @__PURE__ */ e.jsx(Xr, { show: P, range: 8 }),
      /* @__PURE__ */ e.jsx(Br, { data: W, colorScheme: i, opacity: j }),
      x && /* @__PURE__ */ e.jsx(_r, { data: W, opacity: C }),
      k && /* @__PURE__ */ e.jsx(qr, { portfolios: se, maxSharpe: V }),
      /* @__PURE__ */ e.jsx(zt, { ref: Y, enablePan: !0, enableZoom: !0, enableRotate: !0, minDistance: 5, maxDistance: 60, autoRotate: $, autoRotateSpeed: z })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3 pointer-events-auto", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "bg-card rounded-lg px-4 py-2 border border-border flex items-center gap-2", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "font-semibold font-mono", children: [
            "3D PORTFOLIO ",
            o.toUpperCase(),
            " SURFACE"
          ] }),
          /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
            /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4 text-[var(--dim)] cursor-help" }) }),
            /* @__PURE__ */ e.jsx(xt, { className: "max-w-sm font-mono", children: /* @__PURE__ */ e.jsx("p", { className: "text-sm", children: "min σ²_p = w'Σw s.t. w'μ = μ_target" }) })
          ] }) })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "px-3 py-1 rounded text-xs font-mono font-semibold border border-[var(--edge)] bg-[var(--bg2)]", style: { color: te.sharpe > 0.4 ? "var(--up)" : "#c58435" }, children: [
          "MAX SR: ",
          te.sharpe.toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 pointer-events-auto", children: [
        /* @__PURE__ */ e.jsxs(le, { variant: "outline", size: "sm", onClick: () => d((L) => L + 1), className: "bg-card", children: [
          /* @__PURE__ */ e.jsx(Js, { className: "h-4 w-4 mr-1" }),
          "Resample"
        ] }),
        /* @__PURE__ */ e.jsxs(le, { variant: "outline", size: "sm", onClick: O, className: "bg-card", children: [
          /* @__PURE__ */ e.jsx(jt, { className: "h-4 w-4 mr-1" }),
          "Reset View"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "absolute left-4 top-20 w-72 space-y-2 pointer-events-auto max-h-[calc(100%-140px)] overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs($e, { open: F, onOpenChange: S, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card font-mono text-xs", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(vt, { className: "h-4 w-4" }),
            " PARAMETERS"
          ] }),
          F ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-4", children: [
          /* @__PURE__ */ e.jsx("div", { className: "text-xs text-[var(--dim)] font-mono mb-2", children: "SURFACE MODE" }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ e.jsx(le, { variant: o === "sharpe" ? "default" : "outline", size: "sm", onClick: () => r("sharpe"), className: "flex-1 font-mono text-xs", children: "SHARPE" }),
            /* @__PURE__ */ e.jsx(le, { variant: o === "return" ? "default" : "outline", size: "sm", onClick: () => r("return"), className: "flex-1 font-mono text-xs", children: "RETURN" }),
            /* @__PURE__ */ e.jsx(le, { variant: o === "volatility" ? "default" : "outline", size: "sm", onClick: () => r("volatility"), className: "flex-1 font-mono text-xs", children: "VOL" })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "RISK-FREE (Rf)" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs", children: [
                s,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [s], onValueChange: ([L]) => n(L), min: 0, max: 10, step: 0.5 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "pt-2 border-t border-border", children: [
            /* @__PURE__ */ e.jsx("div", { className: "text-xs text-[var(--dim)] font-mono mb-2", children: "ASSETS (Fixed)" }),
            t.map((L) => /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between text-xs font-mono mb-1", children: [
              /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ e.jsx("div", { className: "w-2 h-2 rounded-full", style: { backgroundColor: L.color } }),
                L.symbol
              ] }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-[var(--dim)]", children: [
                "μ=",
                L.expectedReturn,
                "% σ=",
                L.volatility,
                "%"
              ] })
            ] }, L.symbol))
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ e.jsxs($e, { open: h, onOpenChange: y, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card font-mono text-xs", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(Pt, { className: "h-4 w-4" }),
            " DISPLAY"
          ] }),
          h ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-4", children: [
          /* @__PURE__ */ e.jsx(qt, { value: i.id, onChange: l }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "OPACITY" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs", children: [
                (j * 100).toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [j * 100], onValueChange: ([L]) => u(L / 100), min: 20, max: 100, step: 5 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)] font-mono", children: "WIREFRAME" }),
            /* @__PURE__ */ e.jsx(Me, { checked: x, onCheckedChange: p })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)] font-mono", children: "MONTE CARLO POINTS" }),
            /* @__PURE__ */ e.jsx(Me, { checked: k, onCheckedChange: v })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "RESOLUTION" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs", children: [
                T,
                "²"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [T], onValueChange: ([L]) => I(L), min: 15, max: 50, step: 5 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-[var(--dim)] font-mono flex items-center gap-1", children: [
              /* @__PURE__ */ e.jsx(is, { className: "h-3 w-3" }),
              " GRID"
            ] }),
            /* @__PURE__ */ e.jsx(Me, { checked: N, onCheckedChange: b })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-[var(--dim)] font-mono flex items-center gap-1", children: [
              /* @__PURE__ */ e.jsx(ls, { className: "h-3 w-3" }),
              " AXES"
            ] }),
            /* @__PURE__ */ e.jsx(Me, { checked: P, onCheckedChange: f })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)] font-mono", children: "AUTO ROTATE" }),
            /* @__PURE__ */ e.jsx(Me, { checked: $, onCheckedChange: A })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute right-4 top-20 w-56 pointer-events-auto", children: /* @__PURE__ */ e.jsxs($e, { open: w, onOpenChange: M, children: [
      /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card font-mono text-xs", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4" }),
          " STATISTICS"
        ] }),
        w ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
      ] }) }),
      /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-3 bg-card border-border space-y-3", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "text-2xs text-[var(--dim)] font-mono uppercase tracking-wide flex items-center gap-1", children: [
          /* @__PURE__ */ e.jsx("div", { className: "w-2 h-2 rounded-full bg-[var(--up)]" }),
          "OPTIMAL PORTFOLIO"
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "RETURN" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm text-[var(--up)]", children: [
            te.ret.toFixed(2),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "VOLATILITY" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm text-[var(--up)]", children: [
            te.vol.toFixed(2),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "SHARPE" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm text-[var(--up)] font-bold", children: te.sharpe.toFixed(3) })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "pt-2 border-t border-border", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
            /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "PORTFOLIOS" }),
            /* @__PURE__ */ e.jsx("span", { className: "text-sm", children: se.length.toLocaleString() })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
            /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "RISK-FREE" }),
            /* @__PURE__ */ e.jsxs("span", { className: "text-sm", children: [
              s,
              "%"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "pt-2 border-t border-border", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "text-xs text-[var(--dim)] mb-2 font-mono", children: [
            o.toUpperCase(),
            " SCALE"
          ] }),
          /* @__PURE__ */ e.jsx("div", { className: "flex h-3 rounded overflow-hidden", children: i.colors.map((L, D) => /* @__PURE__ */ e.jsx("div", { className: "flex-1", style: { backgroundColor: L } }, D)) }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between text-xs text-[var(--dim)] mt-1 font-mono", children: [
            /* @__PURE__ */ e.jsx("span", { children: "LOW" }),
            /* @__PURE__ */ e.jsx("span", { children: "HIGH" })
          ] })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-card rounded-lg px-4 py-2 border border-border flex items-center gap-4 text-xs text-[var(--dim)] font-mono", children: [
      /* @__PURE__ */ e.jsx("span", { children: "Drag to rotate" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
      /* @__PURE__ */ e.jsx("span", { children: "Scroll to zoom" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
      /* @__PURE__ */ e.jsx("span", { children: "Right-click to pan" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
      /* @__PURE__ */ e.jsxs("span", { children: [
        "X: SPY% | Z: BND% | Y: ",
        o
      ] })
    ] }) })
  ] });
}
const cn = {
  "deep-trading": {
    inputNeurons: 12,
    hiddenLayers: [24, 20, 16, 12, 8],
    outputNeurons: 4,
    preset: "deep-trading"
  },
  "price-predictor": {
    inputNeurons: 8,
    hiddenLayers: [16, 12, 8],
    outputNeurons: 3,
    preset: "price-predictor"
  },
  "volatility-model": {
    inputNeurons: 6,
    hiddenLayers: [12, 8],
    outputNeurons: 2,
    preset: "volatility-model"
  },
  "sentiment-classifier": {
    inputNeurons: 10,
    hiddenLayers: [20, 16, 12, 8],
    outputNeurons: 4,
    preset: "sentiment-classifier"
  },
  "simple-mlp": {
    inputNeurons: 4,
    hiddenLayers: [6, 4],
    outputNeurons: 2,
    preset: "simple-mlp"
  }
}, Ur = ["Price", "Volume", "RSI", "MACD", "ATR", "OBV", "SMA", "EMA", "Momentum", "Volatility"], Kr = ["Buy", "Sell", "Hold", "Confidence"];
function Qr({
  position: t,
  isInput: s,
  isOutput: n,
  label: o,
  showLabels: r,
  pulsePhase: i
}) {
  const l = s ? "#21b3a4" : n ? "#c58435" : "#e8e8e8", c = s ? "#21b3a4" : n ? "#c58435" : "#b0b0b0";
  return /* @__PURE__ */ e.jsxs("group", { position: t, children: [
    /* @__PURE__ */ e.jsx(Ea, { args: [0.18, 16, 16], children: /* @__PURE__ */ e.jsx(
      "meshStandardMaterial",
      {
        color: l,
        emissive: c,
        emissiveIntensity: 0.7,
        roughness: 0.3,
        metalness: 0.2
      }
    ) }),
    r && o && /* @__PURE__ */ e.jsx(
      ke,
      {
        position: s ? [-0.8, 0, 0] : n ? [0.8, 0, 0] : [0, 0.3, 0],
        fontSize: 0.18,
        color: "#b0b0b0",
        anchorX: s ? "right" : n ? "left" : "center",
        anchorY: "middle",
        children: o
      }
    )
  ] });
}
function Jr({
  start: t,
  end: s,
  animating: n,
  connectionIndex: o,
  globalTime: r
}) {
  const i = n ? Math.sin(r * 3 + o * 0.015) * 0.5 + 0.5 : 0.5, l = n ? 0.3 + i * 0.5 : 0.55;
  return /* @__PURE__ */ e.jsx(
    Gs,
    {
      points: [t, s],
      color: n ? "#e8e8e8" : "#b0b0b0",
      lineWidth: n ? 1 : 0.7,
      transparent: !0,
      opacity: l
    }
  );
}
function eo({
  position: t,
  layerIndex: s,
  neuronCount: n,
  isInput: o,
  isOutput: r
}) {
  const i = o ? "Inputs" : r ? "Outputs" : `HL ${s}`, l = o ? "Raw Data" : r ? "Softmax" : "ReLU";
  return /* @__PURE__ */ e.jsxs("group", { position: t, children: [
    /* @__PURE__ */ e.jsx(ke, { position: [0, 0, 0], fontSize: 0.2, color: "#e8e8e8", anchorX: "center", children: i }),
    /* @__PURE__ */ e.jsxs(ke, { position: [0, -0.3, 0], fontSize: 0.12, color: "#b0b0b0", anchorX: "center", children: [
      "Neurons: ",
      n
    ] }),
    /* @__PURE__ */ e.jsxs(ke, { position: [0, -0.5, 0], fontSize: 0.1, color: "#808080", anchorX: "center", children: [
      "Activation: ",
      l
    ] })
  ] });
}
function to({ show: t }) {
  return t ? /* @__PURE__ */ e.jsx("group", { children: /* @__PURE__ */ e.jsx("gridHelper", { args: [20, 20, "#3a3a3a", "#2e2e2e"], position: [0, -5, 0] }) }) : null;
}
function so({
  config: t,
  showConnections: s,
  showLabels: n,
  showLayerInfo: o,
  showGrid: r,
  animateFlow: i
}) {
  const [l, c] = a.useState(0);
  Sn(({ clock: C }) => {
    i && Math.floor(C.elapsedTime * 30) % 2 === 0 && c(C.elapsedTime);
  });
  const { neurons: d, connections: x, layerPositions: p } = a.useMemo(() => {
    const C = [t.inputNeurons, ...t.hiddenLayers, t.outputNeurons], m = 2.5, u = -((C.length - 1) * m) / 2, N = [], b = [], P = [];
    let f = 0;
    C.forEach((k, v) => {
      const $ = u + v * m, z = (k - 1) * 0.5 / 2;
      P.push({
        x: $,
        neuronCount: k,
        isInput: v === 0,
        isOutput: v === C.length - 1
      });
      for (let R = 0; R < k; R++)
        N.push({
          x: $,
          y: z - R * 0.5,
          z: 0,
          layer: v,
          index: f++
        });
    });
    for (let k = 0; k < C.length - 1; k++) {
      const v = N.filter((A) => A.layer === k), $ = N.filter((A) => A.layer === k + 1);
      v.forEach((A) => {
        $.forEach((z) => {
          b.push({
            start: A,
            end: z,
            weight: Math.random() * 2 - 1
            // Random weight for visualization
          });
        });
      });
    }
    return { neurons: N, connections: b, layerPositions: P };
  }, [t]);
  return /* @__PURE__ */ e.jsxs("group", { children: [
    /* @__PURE__ */ e.jsx(to, { show: r }),
    o && p.map((C, m) => /* @__PURE__ */ e.jsx(
      eo,
      {
        position: [C.x, (C.neuronCount - 1) * 0.25 + 1.2, 0],
        layerIndex: m,
        neuronCount: C.neuronCount,
        isInput: C.isInput,
        isOutput: C.isOutput
      },
      m
    )),
    s && x.map((C, m) => /* @__PURE__ */ e.jsx(
      Jr,
      {
        start: [C.start.x, C.start.y, C.start.z],
        end: [C.end.x, C.end.y, C.end.z],
        animating: i,
        connectionIndex: m,
        globalTime: l
      },
      m
    )),
    d.map((C, m) => {
      const j = C.layer === 0, u = C.layer === p.length - 1, N = d.filter((P) => P.layer === C.layer).indexOf(C), b = j ? Ur[N] || `In ${N + 1}` : u ? Kr[N] || `Out ${N + 1}` : void 0;
      return /* @__PURE__ */ e.jsx(
        Qr,
        {
          position: [C.x, C.y, C.z],
          isInput: j,
          isOutput: u,
          label: b,
          showLabels: n,
          pulsePhase: m * 0.3
        },
        m
      );
    })
  ] });
}
function no() {
  const [t, s] = a.useState(cn["price-predictor"]), [n, o] = a.useState(!0), [r, i] = a.useState(!0), [l, c] = a.useState(!0), [d, x] = a.useState(!0), [p, C] = a.useState(!1), [m, j] = a.useState(!1), [u, N] = a.useState(1), [b, P] = a.useState(!0), [f, k] = a.useState(!1), [v, $] = a.useState(!0), A = a.useRef(null), z = () => A.current?.reset(), R = (I) => {
    s(cn[I] || cn["price-predictor"]);
  }, T = a.useMemo(() => {
    const I = [t.inputNeurons, ...t.hiddenLayers, t.outputNeurons], F = I.reduce((y, w) => y + w, 0);
    let S = 0;
    for (let y = 0; y < I.length - 1; y++)
      S += I[y] * I[y + 1];
    const h = S + F;
    return {
      layers: I.length,
      neurons: F,
      connections: S,
      parameters: h,
      architecture: I.join(" → ")
    };
  }, [t]);
  return /* @__PURE__ */ e.jsxs("div", { className: "relative w-full h-[calc(100vh-180px)] min-h-[600px] bg-[var(--bg)] rounded-lg overflow-hidden border border-border", children: [
    /* @__PURE__ */ e.jsxs(
      It,
      {
        camera: { position: [8, 4, 8], fov: 50 },
        style: { background: "var(--bg, #1c1c1c)" },
        children: [
          /* @__PURE__ */ e.jsx("ambientLight", { intensity: 0.3 }),
          /* @__PURE__ */ e.jsx("pointLight", { position: [10, 10, 10], intensity: 0.8 }),
          /* @__PURE__ */ e.jsx("pointLight", { position: [-10, -10, -10], intensity: 0.3 }),
          /* @__PURE__ */ e.jsx("directionalLight", { position: [5, 15, 5], intensity: 0.6 }),
          /* @__PURE__ */ e.jsx(
            so,
            {
              config: t,
              showConnections: n,
              showLabels: r,
              showLayerInfo: l,
              showGrid: d,
              animateFlow: p
            }
          ),
          /* @__PURE__ */ e.jsx(
            zt,
            {
              ref: A,
              enablePan: !0,
              enableZoom: !0,
              enableRotate: !0,
              minDistance: 5,
              maxDistance: 30,
              autoRotate: m,
              autoRotateSpeed: -u
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none", children: [
      /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-3 pointer-events-auto", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-card text-[var(--text)] rounded-lg px-4 py-2 border border-border flex items-center gap-2", children: [
        /* @__PURE__ */ e.jsx("span", { className: "font-semibold text-[var(--text)]", children: "Neural Network Architecture" }),
        /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
          /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4 text-[var(--dim)] cursor-help" }) }),
          /* @__PURE__ */ e.jsx(xt, { className: "max-w-sm", children: /* @__PURE__ */ e.jsx("p", { className: "text-sm", children: "Interactive 3D visualization of feedforward neural network architecture. Teal nodes are inputs (market features), amber nodes are outputs (trading signals)." }) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 pointer-events-auto", children: [
        /* @__PURE__ */ e.jsxs(
          le,
          {
            variant: p ? "default" : "outline",
            size: "sm",
            onClick: () => C(!p),
            className: p ? "" : "bg-card text-[var(--text)]",
            children: [
              /* @__PURE__ */ e.jsx(Bt, { className: "h-4 w-4 mr-1" }),
              p ? "Stop Simulation" : "Run Simulation"
            ]
          }
        ),
        /* @__PURE__ */ e.jsxs(le, { variant: "outline", size: "sm", onClick: z, className: "bg-card text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsx(jt, { className: "h-4 w-4 mr-1" }),
          "Reset View"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "absolute left-4 top-20 w-72 space-y-2 pointer-events-auto", children: [
      /* @__PURE__ */ e.jsxs($e, { open: b, onOpenChange: P, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(vt, { className: "h-4 w-4" }),
            "Network Configuration"
          ] }),
          b ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card text-[var(--text)] border-border space-y-4", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Network Preset" }),
            /* @__PURE__ */ e.jsxs(Jt, { value: t.preset, onValueChange: R, children: [
              /* @__PURE__ */ e.jsx(es, { className: "h-8 bg-[var(--bg2)] border-[var(--edge)] text-[var(--text)]", children: /* @__PURE__ */ e.jsx(ts, {}) }),
              /* @__PURE__ */ e.jsxs(ss, { className: "bg-card border-border text-[var(--text)]", children: [
                /* @__PURE__ */ e.jsx(Qe, { value: "deep-trading", className: "text-[var(--text)] focus:bg-[var(--hover)] focus:text-[var(--text)]", children: "Deep Trading Network" }),
                /* @__PURE__ */ e.jsx(Qe, { value: "price-predictor", className: "text-[var(--text)] focus:bg-[var(--hover)] focus:text-[var(--text)]", children: "Price Predictor" }),
                /* @__PURE__ */ e.jsx(Qe, { value: "volatility-model", className: "text-[var(--text)] focus:bg-[var(--hover)] focus:text-[var(--text)]", children: "Volatility Model" }),
                /* @__PURE__ */ e.jsx(Qe, { value: "sentiment-classifier", className: "text-[var(--text)] focus:bg-[var(--hover)] focus:text-[var(--text)]", children: "Sentiment Classifier" }),
                /* @__PURE__ */ e.jsx(Qe, { value: "simple-mlp", className: "text-[var(--text)] focus:bg-[var(--hover)] focus:text-[var(--text)]", children: "Simple MLP" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Input Neurons" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[var(--text)]", children: t.inputNeurons })
            ] }),
            /* @__PURE__ */ e.jsx(
              xe,
              {
                value: [t.inputNeurons],
                onValueChange: ([I]) => s((F) => ({ ...F, inputNeurons: I })),
                min: 2,
                max: 12,
                step: 1
              }
            )
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Output Neurons" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[var(--text)]", children: t.outputNeurons })
            ] }),
            /* @__PURE__ */ e.jsx(
              xe,
              {
                value: [t.outputNeurons],
                onValueChange: ([I]) => s((F) => ({ ...F, outputNeurons: I })),
                min: 1,
                max: 6,
                step: 1
              }
            )
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ e.jsxs($e, { open: f, onOpenChange: k, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(Pt, { className: "h-4 w-4" }),
            "Visual Settings"
          ] }),
          f ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card text-[var(--text)] border-border space-y-4", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Show Connections" }),
            /* @__PURE__ */ e.jsx(Me, { checked: n, onCheckedChange: o })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Show Labels" }),
            /* @__PURE__ */ e.jsx(Me, { checked: r, onCheckedChange: i })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Layer Info" }),
            /* @__PURE__ */ e.jsx(Me, { checked: l, onCheckedChange: c })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Grid Floor" }),
            /* @__PURE__ */ e.jsx(Me, { checked: d, onCheckedChange: x })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Auto Rotate" }),
            /* @__PURE__ */ e.jsx(Me, { checked: m, onCheckedChange: j })
          ] }),
          m && /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Rotation Speed" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[var(--text)]", children: [
                u,
                "×"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [u], onValueChange: ([I]) => N(I), min: 0.5, max: 5, step: 0.5 })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute right-4 top-20 w-56 pointer-events-auto", children: /* @__PURE__ */ e.jsxs($e, { open: v, onOpenChange: $, children: [
      /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[var(--text)]", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4" }),
          "Network Stats"
        ] }),
        v ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
      ] }) }),
      /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-3 bg-card text-[var(--text)] border-border space-y-3", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "Total Layers" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm font-medium text-[var(--text)]", children: T.layers })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "Total Neurons" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm font-medium text-[var(--text)]", children: T.neurons })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "Connections" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm font-medium text-[var(--text)]", children: T.connections.toLocaleString() })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "Parameters" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm font-medium text-[var(--text)]", children: T.parameters.toLocaleString() })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "pt-2 border-t border-border", children: [
          /* @__PURE__ */ e.jsx("div", { className: "text-xs text-[var(--dim)] mb-1", children: "Architecture" }),
          /* @__PURE__ */ e.jsx("div", { className: "text-xs font-mono text-[var(--text)]", children: T.architecture })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-card text-[var(--text)] rounded-lg px-4 py-2 border border-border flex items-center gap-4 text-xs text-[var(--dim)]", children: [
      /* @__PURE__ */ e.jsx("span", { children: "Drag to rotate" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
      /* @__PURE__ */ e.jsx("span", { children: "Scroll to zoom" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "•" }),
      /* @__PURE__ */ e.jsx("span", { children: "Right-click to pan" })
    ] }) })
  ] });
}
function Is(t) {
  return function() {
    let s = t += 1831565813;
    return s = Math.imul(s ^ s >>> 15, s | 1), s ^= s + Math.imul(s ^ s >>> 7, s | 61), ((s ^ s >>> 14) >>> 0) / 4294967296;
  };
}
const bs = [
  // Price action and volatility
  "ATR(14)",
  "Implied Vol",
  "Realised Vol(5d)",
  "Historical Vol(20d)",
  "Intraday Range",
  "Close-Open %",
  "High-Low %",
  "Gap %",
  "IV Percentile",
  "IV Rank",
  // Momentum and trend strength
  "ROC(12)",
  "Rate of Change(5)",
  "Momentum(10)",
  "ADX",
  "DI+ / DI- Spread",
  "Aroon Oscillator",
  "TRIX(15)",
  "Coppock Curve",
  "MACD Histogram",
  "MACD Divergence",
  // Moving averages and crossovers
  "SMA(50) Distance",
  "EMA(21) Distance",
  "SMA 50/200 Cross",
  "EMA 9/21 Cross",
  "DEMA(14)",
  "TEMA(14)",
  "Hull MA(9)",
  "KAMA(10)",
  "ZLEMA(14)",
  "MA Ribbon Width",
  // Oscillators and mean-reversion
  "RSI(14)",
  "Stochastic %K",
  "Stochastic %D",
  "CCI(20)",
  "Williams %R",
  "MFI(14)",
  "Bollinger %B",
  "Bollinger Width",
  "Keltner %K",
  "Z-Score(20)",
  // Volume and flow
  "VWAP Deviation",
  "Volume Ratio",
  "OBV Slope",
  "CMF(21)",
  "Volume Z-Score",
  "Relative Volume",
  "Acc/Dist Slope",
  "Volume Weighted RSI",
  "VROC(14)",
  "Net Volume",
  // Correlation and cross-asset
  "SPX Correlation",
  "Sector Correlation",
  "FX Correlation",
  "Gold Correlation",
  "Oil Correlation",
  "VIX Correlation",
  "Bond Correlation",
  "BTC Correlation",
  "Pair Spread Z",
  "Cross-Asset Mom",
  // Market regime
  "VIX Level",
  "VIX 1m-3m Ratio",
  "Put/Call Ratio",
  "Gamma Exposure",
  "Bid-Ask Spread",
  "Tick Imbalance",
  "Dark Pool %",
  "Hurst Exponent",
  "Drawdown Depth",
  "Time Since High",
  // Technical structure
  "Pivot Distance",
  "Fib Retracement %",
  "Ichimoku Cloud %",
  "Elder Ray Bull",
  "Donchian %",
  "Parabolic SAR Dist",
  "SuperTrend Dir",
  "Chandelier Exit",
  "Price Channel %",
  "Linear Reg Slope",
  // Candlestick and pattern features
  "Candle Body %",
  "Upper Wick %",
  "Lower Wick %",
  "Doji Score",
  "Engulfing Score",
  "Inside Bar",
  "Pin Bar Score",
  "Three Line Strike",
  "Hammer Score",
  "Shooting Star"
], fe = {
  // Terminal palette hexes (SVG attrs cannot rely on CSS vars in all paths,
  // so the var(--x) fallback hexes are used directly here)
  emerald: "#e8e8e8",
  // primary data series: terminal near-white
  emeraldLight: "#ffffff",
  red: "#f0426c",
  amber: "#c58435",
  blue: "#b0b0b0",
  purple: "#b0b0b0",
  slateLight: "rgba(176,176,176,0.5)",
  // crosshair line per terminal spec
  slateDark: "#3a3a3a",
  gridLine: "#2e2e2e",
  // terminal grid line
  text: "#e8e8e8",
  // var(--text)
  textDim: "#b0b0b0",
  // var(--dim)
  textMuted: "#808080"
  // faint
}, ao = [
  { id: "importance", label: "Feature Importance", desc: "Which features drive predictions" },
  { id: "tree", label: "Decision Tree", desc: "Single tree from ensemble" },
  { id: "learning", label: "Learning Curves", desc: "Train vs validation loss" },
  { id: "shap", label: "SHAP Values", desc: "Feature impact distribution" },
  { id: "scatter", label: "Predictions", desc: "Actual vs predicted analysis" }
];
function ro(t, s, n, o, r, i) {
  const l = Is(i), c = 1 + (1 - r) * 0.5, d = (1.5 + n * 0.3 - s * 0.08) * c, x = bs.slice(0, t).map((m, j) => {
    const u = Math.exp(-j * d * 0.15) * (0.7 + l() * 0.6), N = o > 0 ? Math.max(0, u - o * 0.02 * l()) : u, b = Math.max(1e-3, N), P = Math.floor(b * 100 * (0.5 + l() * 1) * r), f = Math.round(b * 500 * (0.3 + l() * 1.4));
    return { name: m, gain: b, weight: P, cover: f, cumGain: 0 };
  }), p = x.reduce((m, j) => m + j.gain, 0);
  x.forEach((m) => {
    m.gain /= p;
  }), x.sort((m, j) => j.gain - m.gain);
  let C = 0;
  return x.forEach((m) => {
    C += m.gain, m.cumGain = C;
  }), x;
}
function oo(t, s, n, o, r) {
  const i = Is(r + 42);
  let l = 0;
  const c = Math.max(2, Math.floor(s * o));
  function d(x, p) {
    const C = l++, m = Math.max(Math.floor(n), Math.floor(p * (0.3 + i() * 0.4)));
    if (x >= t || m < n * 2 || i() < 0.1)
      return { id: C, leafValue: (i() - 0.5) * 2, samples: m, depth: x };
    const j = Math.floor(i() * Math.min(c, bs.length));
    return {
      id: C,
      feature: bs[j],
      threshold: Math.round((i() * 100 - 50) * 100) / 100,
      left: d(x + 1, m),
      right: d(x + 1, p - m),
      samples: m,
      depth: x,
      gain: i() * 100
    };
  }
  return d(0, 1e3);
}
function io(t, s, n, o, r, i) {
  const l = Is(i + 100), c = [];
  let d = 1;
  for (let x = 0; x <= t; x++) {
    const p = x / t, C = s * (1 + n * 0.15), m = 1 / (0.5 + r * 0.5), j = l() * 0.01 * m, u = 0.7 * Math.exp(-C * p * 5 * r) + 0.02 + j, N = Math.max(0, p - 0.3 - o * 0.05 - (1 - r) * 0.15) * n * 0.04, b = u + N + 0.03 + l() * 0.015, P = Math.max(0.01, u), f = Math.max(0.02, b), k = d - f;
    d = f, c.push({ round: x, trainLoss: P, valLoss: f, improvement: k });
  }
  return c;
}
function lo(t, s, n) {
  const o = Is(n + 200);
  return bs.slice(0, t).map((r, i) => {
    const l = Math.exp(-i * 0.25);
    return Array.from({ length: s }, () => {
      const c = o(), d = (c - 0.5) * l * (0.5 + o() * 1) + (o() - 0.5) * 0.05;
      return { feature: bs[i], shapValue: d, featureValue: c };
    });
  });
}
function co(t, s, n, o, r, i, l, c) {
  const d = Is(c + 300), x = 1 + o * 0.3 + (1 - r) * 0.5 + (1 - i) * 0.3, p = Math.min(0.95, 0.3 + Math.log(t + 1) * 0.12 * s), C = n * 0.02 / x;
  return Array.from({ length: l }, () => {
    const m = d() * 2 - 1, j = m * p + (d() - 0.5) * (1 - p) * 2 + (d() - 0.5) * C;
    return { actual: m, predicted: j, residual: m - j };
  });
}
function xo({
  features: t,
  importanceType: s,
  width: n,
  height: o
}) {
  const [r, i] = a.useState(null), l = { top: 50, right: 80, bottom: 50, left: 140 }, c = n - l.left - l.right, d = o - l.top - l.bottom, x = Math.min(26, d / t.length - 4), p = Math.max(...t.map((m) => m[s])), C = t.findIndex((m) => m.cumGain >= 0.8);
  return /* @__PURE__ */ e.jsxs("svg", { width: n, height: o, className: "select-none", children: [
    /* @__PURE__ */ e.jsx("text", { x: l.left + c / 2, y: 20, textAnchor: "middle", fill: fe.text, fontSize: 14, fontWeight: 600, children: "Feature Importance Analysis" }),
    /* @__PURE__ */ e.jsxs("text", { x: l.left + c / 2, y: 36, textAnchor: "middle", fill: fe.textDim, fontSize: 10, children: [
      "Sorted by ",
      s === "gain" ? "information gain" : s === "weight" ? "split frequency" : "sample coverage",
      " | ",
      t.length,
      " features"
    ] }),
    /* @__PURE__ */ e.jsxs("g", { transform: `translate(${l.left},${l.top})`, children: [
      [0, 0.25, 0.5, 0.75, 1].map((m) => /* @__PURE__ */ e.jsxs("g", { children: [
        /* @__PURE__ */ e.jsx("line", { x1: m * c, y1: 0, x2: m * c, y2: d, stroke: fe.gridLine, strokeDasharray: "3,3" }),
        /* @__PURE__ */ e.jsx("text", { x: m * c, y: d + 16, textAnchor: "middle", fill: fe.textDim, fontSize: 9, children: (m * p).toFixed(s === "gain" ? 3 : 0) })
      ] }, m)),
      t.map((m, j) => {
        const u = j * (d / t.length) + (d / t.length - x) / 2, N = m[s] / p * c, b = r === j, P = 0.35 + (1 - j / t.length) * 0.65, f = j === 0 ? "#c58435" : j === 1 ? "#b0b0b0" : j === 2 ? "#808080" : null;
        return /* @__PURE__ */ e.jsxs("g", { onMouseEnter: () => i(j), onMouseLeave: () => i(null), style: { cursor: "pointer" }, children: [
          f && /* @__PURE__ */ e.jsxs("g", { transform: `translate(-130, ${u + x / 2})`, children: [
            /* @__PURE__ */ e.jsx("circle", { r: 8, fill: f, opacity: 0.2 }),
            /* @__PURE__ */ e.jsx("text", { textAnchor: "middle", dy: 3.5, fill: f, fontSize: 9, fontWeight: 700, children: j + 1 })
          ] }),
          /* @__PURE__ */ e.jsx(
            "text",
            {
              x: -8,
              y: u + x / 2 + 4,
              textAnchor: "end",
              fill: b ? fe.emeraldLight : fe.text,
              fontSize: 11,
              fontWeight: b ? 600 : 400,
              children: m.name
            }
          ),
          /* @__PURE__ */ e.jsx(
            "rect",
            {
              x: 0,
              y: u - 2,
              width: c,
              height: x + 4,
              fill: b ? "rgba(255,255,255,0.03)" : "transparent",
              rx: 3
            }
          ),
          /* @__PURE__ */ e.jsx(
            "rect",
            {
              x: 0,
              y: u,
              width: Math.max(2, N),
              height: x,
              fill: fe.emerald,
              opacity: b ? 1 : P,
              rx: 3
            }
          ),
          /* @__PURE__ */ e.jsx(
            "text",
            {
              x: Math.max(N, 2) + 6,
              y: u + x / 2 + 4,
              fill: fe.textDim,
              fontSize: 9,
              children: s === "gain" ? `${(m.gain * 100).toFixed(1)}%` : s === "weight" ? m.weight : m.cover
            }
          ),
          N > 50 && /* @__PURE__ */ e.jsx("text", { x: N - 6, y: u + x / 2 + 4, textAnchor: "end", fill: "#1c1c1c", fontSize: 9, fontWeight: 500, children: s === "gain" ? m.gain.toFixed(4) : s === "weight" ? m.weight : m.cover }),
          b && /* @__PURE__ */ e.jsxs("g", { transform: `translate(${Math.min(N + 30, c - 140)}, ${u - 10})`, children: [
            /* @__PURE__ */ e.jsx("rect", { x: 0, y: 0, width: 135, height: 65, rx: 4, fill: "#2a2a2a", stroke: "#3a3a3a", strokeWidth: 0.5 }),
            /* @__PURE__ */ e.jsxs("text", { x: 8, y: 14, fill: fe.text, fontSize: 9, fontWeight: 600, children: [
              "#",
              j + 1,
              " ",
              m.name
            ] }),
            /* @__PURE__ */ e.jsxs("text", { x: 8, y: 28, fill: fe.emerald, fontSize: 9, children: [
              "Gain: ",
              m.gain.toFixed(4),
              " (",
              (m.gain * 100).toFixed(1),
              "%)"
            ] }),
            /* @__PURE__ */ e.jsxs("text", { x: 8, y: 41, fill: fe.blue, fontSize: 9, children: [
              "Frequency: ",
              m.weight,
              " splits"
            ] }),
            /* @__PURE__ */ e.jsxs("text", { x: 8, y: 54, fill: fe.amber, fontSize: 9, children: [
              "Coverage: ",
              m.cover,
              " samples"
            ] })
          ] })
        ] }, m.name);
      }),
      s === "gain" && /* @__PURE__ */ e.jsxs("g", { children: [
        t.map((m, j) => {
          const u = j * (d / t.length) + d / t.length / 2, N = m.cumGain * c, b = j > 0 ? (j - 1) * (d / t.length) + d / t.length / 2 : u, P = j > 0 ? t[j - 1].cumGain * c : 0;
          return /* @__PURE__ */ e.jsxs("g", { children: [
            j > 0 && /* @__PURE__ */ e.jsx(
              "line",
              {
                x1: P,
                y1: b,
                x2: N,
                y2: u,
                stroke: fe.amber,
                strokeWidth: 1.5,
                strokeDasharray: "4,2",
                opacity: 0.7
              }
            ),
            /* @__PURE__ */ e.jsx("circle", { cx: N, cy: u, r: 3, fill: fe.amber, opacity: 0.9 }),
            (j === t.length - 1 || j === C) && /* @__PURE__ */ e.jsxs("text", { x: N + 8, y: u + 3, fill: fe.amber, fontSize: 8, children: [
              (m.cumGain * 100).toFixed(0),
              "%"
            ] })
          ] }, `cum-${j}`);
        }),
        C >= 0 && /* @__PURE__ */ e.jsxs("g", { children: [
          /* @__PURE__ */ e.jsx(
            "line",
            {
              x1: 0,
              y1: C * (d / t.length) + d / t.length / 2,
              x2: c,
              y2: C * (d / t.length) + d / t.length / 2,
              stroke: fe.amber,
              strokeDasharray: "6,3",
              strokeWidth: 0.5,
              opacity: 0.4
            }
          ),
          /* @__PURE__ */ e.jsxs(
            "text",
            {
              x: c,
              y: C * (d / t.length) + d / t.length / 2 - 5,
              textAnchor: "end",
              fill: fe.amber,
              fontSize: 8,
              opacity: 0.8,
              children: [
                "Top ",
                C + 1,
                " features = 80% importance"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("text", { x: c / 2, y: d + 35, textAnchor: "middle", fill: fe.textDim, fontSize: 10, children: s === "gain" ? "Information Gain" : s === "weight" ? "Number of Splits" : "Average Sample Coverage" })
    ] }),
    s === "gain" && /* @__PURE__ */ e.jsx(
      "text",
      {
        x: n - 10,
        y: l.top + d / 2,
        textAnchor: "middle",
        fill: fe.amber,
        fontSize: 9,
        transform: `rotate(90, ${n - 10}, ${l.top + d / 2})`,
        children: "Cumulative %"
      }
    )
  ] });
}
function mo({ tree: t, width: s, height: n }) {
  const [o, r] = a.useState(null), i = a.useRef(null), [l, c] = a.useState(1), [d, x] = a.useState({ x: 0, y: 0 }), [p, C] = a.useState(!1), m = a.useRef({ x: 0, y: 0, panX: 0, panY: 0 }), { positions: j, maxGain: u, maxSamples: N, maxDepthVal: b, treeWidth: P, treeHeight: f } = a.useMemo(() => {
    const T = /* @__PURE__ */ new Map();
    let I = 0, F = 0;
    function S(V) {
      return V.gain && V.gain > I && (I = V.gain), V.samples > F && (F = V.samples), !V.left && !V.right ? V.depth : Math.max(V.left ? S(V.left) : 0, V.right ? S(V.right) : 0);
    }
    const h = S(t), y = 130, M = 260 * Math.pow(2, h - 1), Y = M * 2 + 200, _ = h * y + 100;
    function se(V, W, te, O) {
      T.set(V.id, { x: W, y: te, node: V }), V.left && se(V.left, W - O, te + y, O * 0.5), V.right && se(V.right, W + O, te + y, O * 0.5);
    }
    return se(t, Y / 2, 50, M / 2), { positions: T, maxGain: I, maxSamples: F, maxDepthVal: h, treeWidth: Y, treeHeight: _ };
  }, [t]);
  a.useEffect(() => {
    if (P <= 0 || f <= 0) return;
    const T = (s - 40) / P, I = (n - 40) / f, F = Math.min(T, I, 1.2);
    c(F), x({
      x: (s - P * F) / 2,
      y: (n - f * F) / 2
    });
  }, [P, f, s, n]);
  const k = a.useMemo(() => {
    const T = [];
    return j.forEach(({ x: I, y: F, node: S }) => {
      if (S.left) {
        const h = j.get(S.left.id);
        h && T.push({ x1: I, y1: F, x2: h.x, y2: h.y, isYes: !0, samples: S.left.samples });
      }
      if (S.right) {
        const h = j.get(S.right.id);
        h && T.push({ x1: I, y1: F, x2: h.x, y2: h.y, isYes: !1, samples: S.right.samples });
      }
    }), T;
  }, [j]), v = a.useMemo(() => {
    let T = 0, I = 0;
    return j.forEach(({ node: F }) => {
      F.feature ? T++ : I++;
    }), { splits: T, leaves: I, total: T + I };
  }, [j]), $ = a.useRef(l);
  $.current = l, a.useEffect(() => {
    const T = i.current;
    if (!T) return;
    function I(F) {
      F.preventDefault(), F.stopPropagation();
      const S = T.getBoundingClientRect(), h = F.clientX - S.left, y = F.clientY - S.top, w = F.deltaY > 0 ? 0.9 : 1.1, M = $.current, Y = Math.max(0.1, Math.min(5, M * w)), _ = Y / M;
      x((se) => ({
        x: h - (h - se.x) * _,
        y: y - (y - se.y) * _
      })), c(Y);
    }
    return T.addEventListener("wheel", I, { passive: !1 }), () => T.removeEventListener("wheel", I);
  }, []);
  const A = a.useCallback((T) => {
    T.button === 0 && (T.preventDefault(), C(!0), m.current = { x: T.clientX, y: T.clientY, panX: d.x, panY: d.y });
  }, [d]);
  a.useEffect(() => {
    if (!p) return;
    function T(F) {
      x({
        x: m.current.panX + (F.clientX - m.current.x),
        y: m.current.panY + (F.clientY - m.current.y)
      });
    }
    function I() {
      C(!1);
    }
    return window.addEventListener("mousemove", T), window.addEventListener("mouseup", I), () => {
      window.removeEventListener("mousemove", T), window.removeEventListener("mouseup", I);
    };
  }, [p]);
  const z = a.useCallback(() => {
    const T = (s - 40) / P, I = (n - 40) / f, F = Math.min(T, I, 1.2);
    c(F), x({ x: (s - P * F) / 2, y: (n - f * F) / 2 });
  }, [s, n, P, f]), R = {
    nodeBg: "#2a2a2a",
    leafBg: "#262626",
    edgeYes: "#b0b0b0",
    edgeNo: "#b0b0b0"
  };
  return /* @__PURE__ */ e.jsxs(
    "svg",
    {
      ref: i,
      width: s,
      height: n,
      className: "select-none",
      style: { cursor: p ? "grabbing" : "default", background: "var(--bg, #1c1c1c)" },
      onMouseDown: A,
      onDoubleClick: z,
      children: [
        /* @__PURE__ */ e.jsxs("g", { transform: `translate(${d.x},${d.y}) scale(${l})`, children: [
          Array.from({ length: b + 1 }, (T, I) => {
            const F = Array.from(j.values()).filter((h) => h.node.depth === I);
            if (F.length === 0) return null;
            const S = F[0].y;
            return /* @__PURE__ */ e.jsxs("g", { children: [
              /* @__PURE__ */ e.jsx("line", { x1: 0, y1: S, x2: P, y2: S, stroke: "#2e2e2e", strokeWidth: 0.5, strokeDasharray: "4,8" }),
              /* @__PURE__ */ e.jsxs("text", { x: 12, y: S - 6, fill: "#808080", fontSize: 9, fontFamily: "monospace", children: [
                "depth[",
                I,
                "]"
              ] })
            ] }, `depth-${I}`);
          }),
          k.map((T, I) => {
            const S = 0.6 + (N > 0 ? T.samples / N : 0.5) * 0.4;
            return /* @__PURE__ */ e.jsxs("g", { children: [
              /* @__PURE__ */ e.jsx(
                "line",
                {
                  x1: T.x1,
                  y1: T.y1 + 32,
                  x2: T.x2,
                  y2: T.y2 - 30,
                  stroke: T.isYes ? R.edgeYes : R.edgeNo,
                  strokeWidth: 1,
                  opacity: S
                }
              ),
              /* @__PURE__ */ e.jsx(
                "text",
                {
                  x: (T.x1 + T.x2) / 2 + (T.isYes ? -12 : 12),
                  y: (T.y1 + T.y2) / 2,
                  textAnchor: "middle",
                  fill: "#e8e8e8",
                  fontSize: 14,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  children: T.isYes ? "T" : "F"
                }
              ),
              /* @__PURE__ */ e.jsx(
                "text",
                {
                  x: (T.x1 + T.x2) / 2 + (T.isYes ? -12 : 12),
                  y: (T.y1 + T.y2) / 2 + 14,
                  textAnchor: "middle",
                  fill: "#e8e8e8",
                  fontSize: 12,
                  fontFamily: "monospace",
                  children: T.samples
                }
              )
            ] }, I);
          }),
          Array.from(j.entries()).map(([T, { x: I, y: F, node: S }]) => {
            const h = S.leafValue !== void 0 && !S.feature, y = o === T, w = t.samples > 0 ? S.samples / t.samples * 100 : 0;
            if (h)
              return /* @__PURE__ */ e.jsxs(
                "g",
                {
                  onMouseEnter: () => r(T),
                  onMouseLeave: () => r(null),
                  children: [
                    /* @__PURE__ */ e.jsx(
                      "rect",
                      {
                        x: I - 80,
                        y: F - 24,
                        width: 160,
                        height: 50,
                        rx: 3,
                        fill: R.leafBg,
                        stroke: y ? "#505050" : "#3a3a3a",
                        strokeWidth: y ? 2 : 1
                      }
                    ),
                    /* @__PURE__ */ e.jsx("text", { x: I - 68, y: F - 4, fill: "#e8e8e8", fontSize: 12, fontFamily: "monospace", children: "leaf" }),
                    /* @__PURE__ */ e.jsxs(
                      "text",
                      {
                        x: I + 68,
                        y: F - 4,
                        textAnchor: "end",
                        fill: "#e8e8e8",
                        fontSize: 18,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        children: [
                          S.leafValue > 0 ? "+" : "",
                          S.leafValue.toFixed(4)
                        ]
                      }
                    ),
                    /* @__PURE__ */ e.jsxs("text", { x: I - 68, y: F + 16, fill: "#e8e8e8", fontSize: 11, fontFamily: "monospace", children: [
                      "n=",
                      S.samples
                    ] }),
                    /* @__PURE__ */ e.jsxs("text", { x: I + 68, y: F + 16, textAnchor: "end", fill: "#e8e8e8", fontSize: 11, fontFamily: "monospace", children: [
                      w.toFixed(1),
                      "%"
                    ] })
                  ]
                },
                T
              );
            const M = u > 0 ? (S.gain || 0) / u : 0;
            return /* @__PURE__ */ e.jsxs(
              "g",
              {
                onMouseEnter: () => r(T),
                onMouseLeave: () => r(null),
                children: [
                  /* @__PURE__ */ e.jsx(
                    "rect",
                    {
                      x: I - 120,
                      y: F - 30,
                      width: 240,
                      height: 62,
                      rx: 3,
                      fill: R.nodeBg,
                      stroke: y ? "#505050" : "#3a3a3a",
                      strokeWidth: y ? 2 : 1
                    }
                  ),
                  /* @__PURE__ */ e.jsx(
                    "rect",
                    {
                      x: I - 116,
                      y: F + 27,
                      width: Math.max(2, M * 230),
                      height: 3,
                      rx: 1,
                      fill: "#555555"
                    }
                  ),
                  /* @__PURE__ */ e.jsx(
                    "text",
                    {
                      x: I - 108,
                      y: F - 12,
                      fill: "#e8e8e8",
                      fontSize: 14,
                      fontFamily: "monospace",
                      fontWeight: 600,
                      children: S.feature
                    }
                  ),
                  /* @__PURE__ */ e.jsxs(
                    "text",
                    {
                      x: I + 108,
                      y: F - 12,
                      textAnchor: "end",
                      fill: "#e8e8e8",
                      fontSize: 14,
                      fontFamily: "monospace",
                      children: [
                        "<",
                        " ",
                        S.threshold?.toFixed(2)
                      ]
                    }
                  ),
                  /* @__PURE__ */ e.jsxs(
                    "text",
                    {
                      x: I - 108,
                      y: F + 6,
                      fill: "#e8e8e8",
                      fontSize: 11,
                      fontFamily: "monospace",
                      children: [
                        "gain=",
                        S.gain?.toFixed(1)
                      ]
                    }
                  ),
                  /* @__PURE__ */ e.jsxs(
                    "text",
                    {
                      x: I + 108,
                      y: F + 6,
                      textAnchor: "end",
                      fill: "#e8e8e8",
                      fontSize: 11,
                      fontFamily: "monospace",
                      children: [
                        "n=",
                        S.samples,
                        " (",
                        w.toFixed(1),
                        "%)"
                      ]
                    }
                  )
                ]
              },
              T
            );
          }),
          o !== null && (() => {
            const T = j.get(o);
            if (!T) return null;
            const { x: I, y: F, node: S } = T, h = S.leafValue !== void 0 && !S.feature, y = t.samples > 0 ? S.samples / t.samples * 100 : 0, w = u > 0 ? (S.gain || 0) / u : 0;
            return h ? /* @__PURE__ */ e.jsxs("g", { transform: `translate(${I + 85}, ${F - 50})`, children: [
              /* @__PURE__ */ e.jsx(
                "rect",
                {
                  x: 0,
                  y: 0,
                  width: 300,
                  height: 120,
                  rx: 3,
                  fill: "#2a2a2a",
                  stroke: "#3a3a3a",
                  strokeWidth: 1
                }
              ),
              /* @__PURE__ */ e.jsx("text", { x: 14, y: 24, fill: "#e8e8e8", fontSize: 16, fontFamily: "monospace", fontWeight: 700, children: "LEAF NODE" }),
              /* @__PURE__ */ e.jsxs("text", { x: 14, y: 48, fill: "#e8e8e8", fontSize: 14, fontFamily: "monospace", children: [
                "value:   ",
                S.leafValue.toFixed(6)
              ] }),
              /* @__PURE__ */ e.jsxs("text", { x: 14, y: 72, fill: "#e8e8e8", fontSize: 14, fontFamily: "monospace", children: [
                "samples: ",
                S.samples,
                " (",
                y.toFixed(1),
                "%)"
              ] }),
              /* @__PURE__ */ e.jsxs("text", { x: 14, y: 96, fill: "#e8e8e8", fontSize: 14, fontFamily: "monospace", children: [
                "depth:   ",
                S.depth
              ] })
            ] }) : /* @__PURE__ */ e.jsxs("g", { transform: `translate(${I + 125}, ${F - 50})`, children: [
              /* @__PURE__ */ e.jsx(
                "rect",
                {
                  x: 0,
                  y: 0,
                  width: 320,
                  height: 130,
                  rx: 3,
                  fill: "#2a2a2a",
                  stroke: "#3a3a3a",
                  strokeWidth: 1
                }
              ),
              /* @__PURE__ */ e.jsx("text", { x: 14, y: 24, fill: "#e8e8e8", fontSize: 16, fontFamily: "monospace", fontWeight: 700, children: "SPLIT NODE" }),
              /* @__PURE__ */ e.jsxs("text", { x: 14, y: 48, fill: "#e8e8e8", fontSize: 14, fontFamily: "monospace", children: [
                "feature: ",
                S.feature
              ] }),
              /* @__PURE__ */ e.jsxs("text", { x: 14, y: 72, fill: "#e8e8e8", fontSize: 14, fontFamily: "monospace", children: [
                "thresh:  ",
                S.threshold?.toFixed(4)
              ] }),
              /* @__PURE__ */ e.jsxs("text", { x: 14, y: 96, fill: "#e8e8e8", fontSize: 14, fontFamily: "monospace", children: [
                "gain:    ",
                S.gain?.toFixed(4),
                " (",
                (w * 100).toFixed(0),
                "%)"
              ] }),
              /* @__PURE__ */ e.jsxs("text", { x: 14, y: 118, fill: "#e8e8e8", fontSize: 14, fontFamily: "monospace", children: [
                "samples: ",
                S.samples,
                " (",
                y.toFixed(1),
                "%)"
              ] })
            ] });
          })()
        ] }),
        /* @__PURE__ */ e.jsxs("g", { transform: "translate(12, 12)", children: [
          /* @__PURE__ */ e.jsx("rect", { x: 0, y: 0, width: 260, height: 42, rx: 3, fill: "#2a2a2a", stroke: "#3a3a3a", strokeWidth: 0.5 }),
          /* @__PURE__ */ e.jsxs("text", { x: 10, y: 16, fill: "#e8e8e8", fontSize: 10, fontFamily: "monospace", children: [
            "tree[0]  depth=",
            b,
            "  nodes=",
            v.total
          ] }),
          /* @__PURE__ */ e.jsxs("text", { x: 10, y: 32, fill: "#e8e8e8", fontSize: 9, fontFamily: "monospace", children: [
            "splits=",
            v.splits,
            "  leaves=",
            v.leaves,
            "  root_n=",
            t.samples
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("g", { transform: `translate(${s - 120}, 12)`, children: [
          /* @__PURE__ */ e.jsx("rect", { x: 0, y: 0, width: 108, height: 26, rx: 3, fill: "#2a2a2a", stroke: "#3a3a3a", strokeWidth: 0.5 }),
          /* @__PURE__ */ e.jsxs("text", { x: 10, y: 17, fill: "#e8e8e8", fontSize: 9, fontFamily: "monospace", children: [
            "zoom: ",
            (l * 100).toFixed(0),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("g", { transform: `translate(12, ${n - 32})`, children: [
          /* @__PURE__ */ e.jsx("rect", { x: 0, y: 0, width: 400, height: 22, rx: 3, fill: "#2a2a2a", stroke: "#3a3a3a", strokeWidth: 0.5 }),
          /* @__PURE__ */ e.jsx("text", { x: 10, y: 14, fill: "#e8e8e8", fontSize: 9, fontFamily: "monospace", children: "drag: pan  |  scroll: zoom  |  dbl-click: reset  |  hover: inspect node" })
        ] })
      ]
    }
  );
}
function ho({
  data: t,
  width: s,
  height: n,
  showEarlyStopping: o
}) {
  const [r, i] = a.useState(null), l = a.useRef(null), c = { top: 50, right: 30, bottom: 55, left: 60 }, d = s - c.left - c.right, x = n - c.top - c.bottom, p = t[t.length - 1]?.round ?? 1, C = t.flatMap((z) => [z.trainLoss, z.valLoss]), m = Math.min(...C) * 0.9, j = Math.max(...C) * 1.05, u = t.reduce((z, R, T) => R.valLoss < t[z].valLoss ? T : z, 0), N = t[t.length - 1] ? t[t.length - 1].valLoss - t[t.length - 1].trainLoss : 0, b = (z) => z / p * d, P = (z) => x - (z - m) / (j - m) * x, f = t.map((z, R) => `${R === 0 ? "M" : "L"} ${b(z.round)} ${P(z.trainLoss)}`).join(" "), k = t.map((z, R) => `${R === 0 ? "M" : "L"} ${b(z.round)} ${P(z.valLoss)}`).join(" "), v = t.map((z) => `${b(z.round)},${P(z.valLoss)}`).join(" ") + " " + [...t].reverse().map((z) => `${b(z.round)},${P(z.trainLoss)}`).join(" "), $ = a.useMemo(() => {
    if (r === null) return null;
    const z = Math.round(r / d * p);
    return t.find((R) => R.round === z) ?? null;
  }, [r, t, d, p]), A = a.useCallback((z) => {
    if (!l.current) return;
    const R = l.current.getBoundingClientRect(), T = z.clientX - R.left - c.left;
    T >= 0 && T <= d ? i(T) : i(null);
  }, [c.left, d]);
  return /* @__PURE__ */ e.jsxs(
    "svg",
    {
      ref: l,
      width: s,
      height: n,
      className: "select-none",
      onMouseMove: A,
      onMouseLeave: () => i(null),
      children: [
        /* @__PURE__ */ e.jsx("text", { x: s / 2, y: 18, textAnchor: "middle", fill: fe.text, fontSize: 14, fontWeight: 600, children: "Training and Validation Loss Curves" }),
        /* @__PURE__ */ e.jsxs("text", { x: s / 2, y: 34, textAnchor: "middle", fill: fe.textDim, fontSize: 10, children: [
          t.length,
          " boosting rounds | Best val loss at round ",
          t[u]?.round,
          " | ",
          "Overfit gap: ",
          (N * 100).toFixed(1),
          "%"
        ] }),
        /* @__PURE__ */ e.jsxs("g", { transform: `translate(${c.left},${c.top})`, children: [
          Array.from({ length: 6 }, (z, R) => {
            const T = m + (j - m) * (R / 5), I = P(T);
            return /* @__PURE__ */ e.jsxs("g", { children: [
              /* @__PURE__ */ e.jsx("line", { x1: 0, y1: I, x2: d, y2: I, stroke: fe.gridLine, strokeDasharray: "3,3" }),
              /* @__PURE__ */ e.jsx("text", { x: -8, y: I + 4, textAnchor: "end", fill: fe.textDim, fontSize: 9, children: T.toFixed(3) })
            ] }, R);
          }),
          Array.from({ length: 6 }, (z, R) => {
            const T = Math.round(R / 5 * p);
            return /* @__PURE__ */ e.jsx("text", { x: b(T), y: x + 18, textAnchor: "middle", fill: fe.textDim, fontSize: 9, children: T }, R);
          }),
          /* @__PURE__ */ e.jsx("polygon", { points: v, fill: "rgba(255,255,255,0.02)" }),
          /* @__PURE__ */ e.jsx("path", { d: f, fill: "none", stroke: fe.emerald, strokeWidth: 2 }),
          /* @__PURE__ */ e.jsx("path", { d: k, fill: "none", stroke: fe.amber, strokeWidth: 2 }),
          t.filter((z, R) => R % Math.max(1, Math.floor(t.length / 80)) === 0 && R > 0).map((z, R) => {
            const T = Math.min(15, Math.abs(z.improvement) * 500), I = z.improvement > 0;
            return /* @__PURE__ */ e.jsx(
              "rect",
              {
                x: b(z.round) - 1,
                y: x - T - 1,
                width: 2,
                height: T,
                fill: I ? "#21b3a4" : fe.red,
                opacity: 0.3
              },
              R
            );
          }),
          o && /* @__PURE__ */ e.jsxs("g", { children: [
            /* @__PURE__ */ e.jsx(
              "line",
              {
                x1: b(t[u].round),
                y1: 0,
                x2: b(t[u].round),
                y2: x,
                stroke: fe.red,
                strokeDasharray: "5,3",
                strokeWidth: 1.5
              }
            ),
            /* @__PURE__ */ e.jsx(
              "rect",
              {
                x: b(t[u].round) - 55,
                y: -2,
                width: 110,
                height: 18,
                rx: 4,
                fill: "#2a2a2a",
                stroke: "#3a3a3a",
                strokeWidth: 0.5
              }
            ),
            /* @__PURE__ */ e.jsxs(
              "text",
              {
                x: b(t[u].round),
                y: 11,
                textAnchor: "middle",
                fill: fe.red,
                fontSize: 9,
                fontWeight: 500,
                children: [
                  "Early Stop: ",
                  t[u].round
                ]
              }
            ),
            /* @__PURE__ */ e.jsx(
              "circle",
              {
                cx: b(t[u].round),
                cy: P(t[u].valLoss),
                r: 5,
                fill: "none",
                stroke: fe.red,
                strokeWidth: 1.5
              }
            ),
            /* @__PURE__ */ e.jsx(
              "text",
              {
                x: b(t[u].round) + 8,
                y: P(t[u].valLoss) + 3,
                fill: fe.red,
                fontSize: 8,
                children: t[u].valLoss.toFixed(4)
              }
            )
          ] }),
          $ && r !== null && /* @__PURE__ */ e.jsxs("g", { children: [
            /* @__PURE__ */ e.jsx("line", { x1: r, y1: 0, x2: r, y2: x, stroke: fe.slateLight, strokeWidth: 0.5, strokeDasharray: "3,3" }),
            /* @__PURE__ */ e.jsx("circle", { cx: r, cy: P($.trainLoss), r: 4, fill: fe.emerald }),
            /* @__PURE__ */ e.jsx("circle", { cx: r, cy: P($.valLoss), r: 4, fill: fe.amber }),
            /* @__PURE__ */ e.jsx(
              "line",
              {
                x1: r,
                y1: P($.trainLoss),
                x2: r,
                y2: P($.valLoss),
                stroke: fe.red,
                strokeWidth: 1,
                strokeDasharray: "2,2",
                opacity: 0.5
              }
            ),
            /* @__PURE__ */ e.jsxs("g", { transform: `translate(${r > d / 2 ? r - 155 : r + 10}, 10)`, children: [
              /* @__PURE__ */ e.jsx("rect", { x: 0, y: 0, width: 145, height: 68, rx: 4, fill: "#2a2a2a", stroke: fe.slateDark, strokeWidth: 0.5 }),
              /* @__PURE__ */ e.jsxs("text", { x: 8, y: 15, fill: fe.textDim, fontSize: 9, fontWeight: 500, children: [
                "Round ",
                $.round
              ] }),
              /* @__PURE__ */ e.jsxs("text", { x: 8, y: 30, fill: fe.emerald, fontSize: 9, children: [
                "Train: ",
                $.trainLoss.toFixed(5)
              ] }),
              /* @__PURE__ */ e.jsxs("text", { x: 8, y: 44, fill: fe.amber, fontSize: 9, children: [
                "Val: ",
                $.valLoss.toFixed(5)
              ] }),
              /* @__PURE__ */ e.jsxs("text", { x: 8, y: 58, fill: fe.red, fontSize: 9, children: [
                "Gap: ",
                (($.valLoss - $.trainLoss) * 100).toFixed(2),
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ e.jsx("text", { x: d / 2, y: x + 40, textAnchor: "middle", fill: fe.textDim, fontSize: 10, children: "Boosting Round (n_estimators)" }),
          /* @__PURE__ */ e.jsx(
            "text",
            {
              x: -42,
              y: x / 2,
              textAnchor: "middle",
              fill: fe.textDim,
              fontSize: 10,
              transform: `rotate(-90, -42, ${x / 2})`,
              children: "Loss"
            }
          ),
          /* @__PURE__ */ e.jsxs("g", { transform: `translate(${d - 180}, 8)`, children: [
            /* @__PURE__ */ e.jsx("rect", { x: 0, y: 0, width: 175, height: 55, rx: 4, fill: "#2a2a2a", stroke: "#3a3a3a" }),
            /* @__PURE__ */ e.jsx("line", { x1: 10, y1: 14, x2: 30, y2: 14, stroke: fe.emerald, strokeWidth: 2 }),
            /* @__PURE__ */ e.jsx("text", { x: 36, y: 18, fill: fe.text, fontSize: 9, children: "Training Loss" }),
            /* @__PURE__ */ e.jsx("line", { x1: 10, y1: 30, x2: 30, y2: 30, stroke: fe.amber, strokeWidth: 2 }),
            /* @__PURE__ */ e.jsx("text", { x: 36, y: 34, fill: fe.text, fontSize: 9, children: "Validation Loss" }),
            /* @__PURE__ */ e.jsx("rect", { x: 10, y: 40, width: 20, height: 6, fill: "rgba(255,255,255,0.04)" }),
            /* @__PURE__ */ e.jsx("text", { x: 36, y: 48, fill: fe.textDim, fontSize: 9, children: "Overfitting Zone" })
          ] })
        ] })
      ]
    }
  );
}
function uo({
  data: t,
  width: s,
  height: n
}) {
  const o = { top: 50, right: 90, bottom: 50, left: 140 }, r = s - o.left - o.right, i = n - o.top - o.bottom, l = t.length, c = i / l, d = t.flat().map((u) => u.shapValue), x = Math.max(Math.abs(Math.min(...d)), Math.abs(Math.max(...d))) * 1.1, p = (u) => u / x * (r / 2) + r / 2, C = t.map((u) => u.reduce((b, P) => b + Math.abs(P.shapValue), 0) / u.length), m = Math.max(...C);
  function j(u) {
    const N = Math.round(80 + u * 150);
    return `rgb(${N},${N},${N})`;
  }
  return /* @__PURE__ */ e.jsxs("svg", { width: s, height: n, className: "select-none", children: [
    /* @__PURE__ */ e.jsx("text", { x: s / 2, y: 18, textAnchor: "middle", fill: fe.text, fontSize: 14, fontWeight: 600, children: "SHAP Feature Impact Analysis (Beeswarm Plot)" }),
    /* @__PURE__ */ e.jsx("text", { x: s / 2, y: 34, textAnchor: "middle", fill: fe.textDim, fontSize: 10, children: "Each dot = one prediction | Position = SHAP value | Color = feature value (dark=low, bright=high)" }),
    /* @__PURE__ */ e.jsxs("g", { transform: `translate(${o.left},${o.top})`, children: [
      /* @__PURE__ */ e.jsx("line", { x1: r / 2, y1: -5, x2: r / 2, y2: i + 5, stroke: fe.slateDark, strokeWidth: 1 }),
      /* @__PURE__ */ e.jsx("text", { x: r / 2, y: -10, textAnchor: "middle", fill: fe.textMuted, fontSize: 8, children: "SHAP = 0" }),
      /* @__PURE__ */ e.jsx("text", { x: r * 0.75, y: -10, textAnchor: "middle", fill: "rgba(255,255,255,0.2)", fontSize: 8, children: "Pushes prediction UP" }),
      /* @__PURE__ */ e.jsx("text", { x: r * 0.25, y: -10, textAnchor: "middle", fill: "rgba(255,255,255,0.15)", fontSize: 8, children: "Pushes prediction DOWN" }),
      [-1, -0.5, 0, 0.5, 1].map((u) => {
        const N = u * x;
        return /* @__PURE__ */ e.jsxs("g", { children: [
          /* @__PURE__ */ e.jsx("line", { x1: p(N), y1: i, x2: p(N), y2: i + 5, stroke: fe.textDim }),
          /* @__PURE__ */ e.jsx("text", { x: p(N), y: i + 16, textAnchor: "middle", fill: fe.textDim, fontSize: 8, children: N.toFixed(2) })
        ] }, u);
      }),
      /* @__PURE__ */ e.jsx("text", { x: r / 2, y: i + 36, textAnchor: "middle", fill: fe.textDim, fontSize: 10, children: "SHAP Value (impact on model output)" }),
      t.map((u, N) => {
        const b = N * c + c / 2;
        return /* @__PURE__ */ e.jsxs("g", { children: [
          /* @__PURE__ */ e.jsx("text", { x: -8, y: b + 4, textAnchor: "end", fill: fe.text, fontSize: 10, children: u[0]?.feature ?? bs[N] }),
          /* @__PURE__ */ e.jsxs("text", { x: -8, y: b - 6, textAnchor: "end", fill: fe.textMuted, fontSize: 7, children: [
            "#",
            N + 1
          ] }),
          /* @__PURE__ */ e.jsx(
            "line",
            {
              x1: 0,
              y1: b + c / 2,
              x2: r,
              y2: b + c / 2,
              stroke: fe.gridLine,
              strokeWidth: 0.5
            }
          ),
          u.map((P, f) => {
            const k = (Math.sin(f * 7.3) * 0.5 + Math.cos(f * 3.7) * 0.5) * (c * 0.35);
            return /* @__PURE__ */ e.jsx(
              "circle",
              {
                cx: p(P.shapValue),
                cy: b + k,
                r: 2.5,
                fill: j(P.featureValue),
                opacity: 0.7
              },
              f
            );
          }),
          /* @__PURE__ */ e.jsx(
            "rect",
            {
              x: r + 10,
              y: b - 4,
              width: Math.max(1, C[N] / m * 50),
              height: 8,
              rx: 2,
              fill: fe.purple,
              opacity: 0.6
            }
          ),
          /* @__PURE__ */ e.jsx("text", { x: r + 65, y: b + 4, fill: fe.textDim, fontSize: 7, children: C[N].toFixed(3) })
        ] }, N);
      }),
      /* @__PURE__ */ e.jsx("text", { x: r + 35, y: -10, textAnchor: "middle", fill: fe.purple, fontSize: 8, children: "mean |SHAP|" }),
      /* @__PURE__ */ e.jsxs("g", { transform: `translate(${r + 10}, ${i / 2 - 60})`, children: [
        /* @__PURE__ */ e.jsx("text", { x: 0, y: -12, fill: fe.textDim, fontSize: 8, children: "Feature" }),
        /* @__PURE__ */ e.jsx("text", { x: 0, y: -2, fill: fe.textDim, fontSize: 8, children: "Value" }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsxs("linearGradient", { id: "shap-grad", x1: "0", y1: "1", x2: "0", y2: "0", children: [
          /* @__PURE__ */ e.jsx("stop", { offset: "0%", stopColor: "#505050" }),
          /* @__PURE__ */ e.jsx("stop", { offset: "50%", stopColor: "#909090" }),
          /* @__PURE__ */ e.jsx("stop", { offset: "100%", stopColor: "#d0d0d0" })
        ] }) }),
        /* @__PURE__ */ e.jsx("rect", { x: 5, y: 8, width: 12, height: 80, rx: 2, fill: "url(#shap-grad)" }),
        /* @__PURE__ */ e.jsx("text", { x: 22, y: 18, fill: fe.textDim, fontSize: 8, children: "High" }),
        /* @__PURE__ */ e.jsx("text", { x: 22, y: 90, fill: fe.textDim, fontSize: 8, children: "Low" })
      ] })
    ] })
  ] });
}
function fo({
  data: t,
  width: s,
  height: n
}) {
  const [o, r] = a.useState(null), i = n * 0.62, l = n * 0.32, c = n * 0.06, d = { top: 45, right: 30, bottom: 15, left: 60 }, x = s - d.left - d.right, p = Math.min(x, i - d.top - d.bottom), C = t.flatMap((h) => [h.actual, h.predicted]), m = Math.min(...C), j = Math.max(...C), u = j - m, N = (h) => (h - m) / u * p, b = t.reduce((h, y) => h + y.actual, 0) / t.length, P = t.reduce((h, y) => h + (y.actual - y.predicted) ** 2, 0), f = t.reduce((h, y) => h + (y.actual - b) ** 2, 0), k = Math.max(0, 1 - P / f), v = Math.sqrt(P / t.length), $ = t.reduce((h, y) => h + Math.abs(y.residual), 0) / t.length, A = t.map((h) => h.residual), z = Math.min(...A), R = Math.max(...A), T = 30, I = (R - z) / T, F = Array.from({ length: T }, (h, y) => {
    const w = z + y * I, M = w + I, Y = A.filter((_) => _ >= w && _ < M).length;
    return { lo: w, hi: M, mid: (w + M) / 2, count: Y };
  }), S = Math.max(...F.map((h) => h.count));
  return /* @__PURE__ */ e.jsxs("svg", { width: s, height: n, className: "select-none", children: [
    /* @__PURE__ */ e.jsx("text", { x: s / 2, y: 18, textAnchor: "middle", fill: fe.text, fontSize: 14, fontWeight: 600, children: "Prediction Analysis: Actual vs Predicted" }),
    /* @__PURE__ */ e.jsxs("text", { x: s / 2, y: 34, textAnchor: "middle", fill: fe.textDim, fontSize: 10, children: [
      t.length,
      " samples | R² = ",
      k.toFixed(4),
      " | RMSE = ",
      v.toFixed(4),
      " | MAE = ",
      $.toFixed(4)
    ] }),
    /* @__PURE__ */ e.jsxs("g", { transform: `translate(${d.left},${d.top})`, children: [
      Array.from({ length: 6 }, (h, y) => {
        const w = y / 5 * p, M = m + y / 5 * u;
        return /* @__PURE__ */ e.jsxs("g", { children: [
          /* @__PURE__ */ e.jsx("line", { x1: 0, y1: w, x2: p, y2: w, stroke: fe.gridLine, strokeDasharray: "3,3" }),
          /* @__PURE__ */ e.jsx("line", { x1: w, y1: 0, x2: w, y2: p, stroke: fe.gridLine, strokeDasharray: "3,3" }),
          /* @__PURE__ */ e.jsx("text", { x: -8, y: p - w + 4, textAnchor: "end", fill: fe.textDim, fontSize: 8, children: M.toFixed(2) }),
          /* @__PURE__ */ e.jsx("text", { x: w, y: p + 14, textAnchor: "middle", fill: fe.textDim, fontSize: 8, children: M.toFixed(2) })
        ] }, y);
      }),
      /* @__PURE__ */ e.jsx(
        "polygon",
        {
          points: `0,${p} ${p},0 ${p},${N(j - v) > 0 ? p - N(j) + N(j - v) : 0} 0,${p - (N(m + v) - N(m))}`,
          fill: "rgba(255,255,255,0.02)"
        }
      ),
      /* @__PURE__ */ e.jsx(
        "line",
        {
          x1: 0,
          y1: p,
          x2: p,
          y2: 0,
          stroke: "#b0b0b0",
          strokeWidth: 1.5,
          strokeDasharray: "6,3",
          opacity: 0.6
        }
      ),
      /* @__PURE__ */ e.jsx("text", { x: p - 5, y: 12, textAnchor: "end", fill: "#b0b0b0", fontSize: 8, opacity: 0.6, children: "Perfect fit (y=x)" }),
      t.map((h, y) => {
        const w = N(h.predicted), M = p - N(h.actual), Y = Math.abs(h.residual), _ = u * 0.3, se = Math.min(1, Y / _), V = Math.round(33 + se * 207), W = Math.round(179 - se * 113), te = Math.round(164 - se * 56);
        return /* @__PURE__ */ e.jsx(
          "circle",
          {
            cx: w,
            cy: M,
            r: o === y ? 5 : 3,
            fill: `rgb(${V},${W},${te})`,
            opacity: o === y ? 1 : 0.55,
            onMouseEnter: () => r(y),
            onMouseLeave: () => r(null),
            style: { cursor: "pointer" }
          },
          y
        );
      }),
      /* @__PURE__ */ e.jsx("text", { x: p / 2, y: p + 30, textAnchor: "middle", fill: fe.textDim, fontSize: 10, children: "Predicted" }),
      /* @__PURE__ */ e.jsx(
        "text",
        {
          x: -42,
          y: p / 2,
          textAnchor: "middle",
          fill: fe.textDim,
          fontSize: 10,
          transform: `rotate(-90, -42, ${p / 2})`,
          children: "Actual"
        }
      ),
      o !== null && /* @__PURE__ */ e.jsxs("g", { transform: `translate(${N(t[o].predicted) + 10}, ${p - N(t[o].actual) - 40})`, children: [
        /* @__PURE__ */ e.jsx("rect", { x: 0, y: 0, width: 140, height: 52, rx: 4, fill: "#2a2a2a", stroke: "#3a3a3a", strokeWidth: 0.5 }),
        /* @__PURE__ */ e.jsxs("text", { x: 8, y: 14, fill: fe.text, fontSize: 9, children: [
          "Actual: ",
          t[o].actual.toFixed(4)
        ] }),
        /* @__PURE__ */ e.jsxs("text", { x: 8, y: 28, fill: fe.text, fontSize: 9, children: [
          "Predicted: ",
          t[o].predicted.toFixed(4)
        ] }),
        /* @__PURE__ */ e.jsxs("text", { x: 8, y: 42, fill: t[o].residual > 0 ? "#21b3a4" : fe.red, fontSize: 9, children: [
          "Residual: ",
          t[o].residual > 0 ? "+" : "",
          t[o].residual.toFixed(4)
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("g", { transform: `translate(${d.left},${i + c})`, children: [
      /* @__PURE__ */ e.jsx("text", { x: x / 2, y: -5, textAnchor: "middle", fill: fe.textDim, fontSize: 10, fontWeight: 500, children: "Residual Distribution (Actual - Predicted)" }),
      (() => {
        const h = (0 - z) / (R - z) * x;
        return /* @__PURE__ */ e.jsx("line", { x1: h, y1: 0, x2: h, y2: l - 20, stroke: fe.slateDark, strokeWidth: 1, strokeDasharray: "3,2" });
      })(),
      F.map((h, y) => {
        const w = y / T * x, M = x / T - 1, Y = h.count / S * (l - 25), _ = Math.abs(h.mid) / Math.max(Math.abs(z), Math.abs(R)), se = Math.round(33 + _ * 207), V = Math.round(179 - _ * 113), W = Math.round(164 - _ * 56);
        return /* @__PURE__ */ e.jsx(
          "rect",
          {
            x: w,
            y: l - 20 - Y,
            width: M,
            height: Y,
            fill: `rgb(${se},${V},${W})`,
            opacity: 0.7,
            rx: 1
          },
          y
        );
      }),
      /* @__PURE__ */ e.jsx("text", { x: 0, y: l - 5, fill: fe.textDim, fontSize: 8, children: z.toFixed(2) }),
      /* @__PURE__ */ e.jsx("text", { x: x / 2, y: l - 5, textAnchor: "middle", fill: fe.textDim, fontSize: 8, children: "0" }),
      /* @__PURE__ */ e.jsx("text", { x, y: l - 5, textAnchor: "end", fill: fe.textDim, fontSize: 8, children: R.toFixed(2) })
    ] })
  ] });
}
function po({
  features: t,
  learningCurves: s,
  predictions: n,
  shapData: o,
  nEstimators: r,
  maxDepth: i,
  learningRate: l,
  regLambda: c,
  regAlpha: d,
  subsample: x,
  colsampleBytree: p,
  numFeatures: C,
  objective: m,
  viewMode: j
}) {
  const u = n.reduce((w, M) => w + M.actual, 0) / n.length, N = n.reduce((w, M) => w + (M.actual - M.predicted) ** 2, 0), b = n.reduce((w, M) => w + (M.actual - u) ** 2, 0), P = Math.max(0, 1 - N / b), f = Math.sqrt(N / n.length), k = n.reduce((w, M) => w + Math.abs(M.residual), 0) / n.length, v = n.reduce((w, M) => w + (M.actual !== 0 ? Math.abs(M.residual / M.actual) : 0), 0) / n.length * 100, $ = s.reduce((w, M, Y) => M.valLoss < s[w].valLoss ? Y : w, 0), A = s[$]?.valLoss ?? 0, z = s[s.length - 1]?.trainLoss ?? 0, R = s[s.length - 1]?.valLoss ?? 0, T = R - z, I = t.slice(0, 3).reduce((w, M) => w + M.gain, 0), F = t.findIndex((w) => w.cumGain >= 0.8) + 1, S = r * (Math.pow(2, i + 1) - 1), h = (i > 8 ? 2 : i > 5 ? 1 : 0) + (c < 0.5 ? 1 : 0) + (r > 500 ? 1 : 0) + (l > 0.3 ? 1 : 0), y = h >= 3 ? "High" : h >= 2 ? "Medium" : "Low";
  return /* @__PURE__ */ e.jsx("div", { className: "w-[220px] min-w-[220px] bg-card border-l border-border overflow-y-auto flex-shrink-0", children: /* @__PURE__ */ e.jsxs("div", { className: "p-3 space-y-3", children: [
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("span", { className: "text-2xs font-medium text-[#808080] uppercase tracking-widest", children: "Performance" }),
      /* @__PURE__ */ e.jsxs("div", { className: "space-y-1.5 mt-2", children: [
        /* @__PURE__ */ e.jsx(wt, { label: "R² Score", value: P.toFixed(4), color: "#e8e8e8", bar: P }),
        /* @__PURE__ */ e.jsx(wt, { label: "RMSE", value: f.toFixed(4), color: "#e8e8e8" }),
        /* @__PURE__ */ e.jsx(wt, { label: "MAE", value: k.toFixed(4), color: "#e8e8e8" }),
        /* @__PURE__ */ e.jsx(wt, { label: "MAPE", value: `${v.toFixed(1)}%`, color: "#e8e8e8" })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "border-t border-border" }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("span", { className: "text-2xs font-medium text-[#808080] uppercase tracking-widest", children: "Training" }),
      /* @__PURE__ */ e.jsxs("div", { className: "space-y-1.5 mt-2", children: [
        /* @__PURE__ */ e.jsx(wt, { label: "Best Val Loss", value: A.toFixed(5), color: "#e8e8e8" }),
        /* @__PURE__ */ e.jsx(wt, { label: "Best Round", value: `${s[$]?.round ?? 0}`, color: "#e8e8e8" }),
        /* @__PURE__ */ e.jsx(wt, { label: "Final Train", value: z.toFixed(5), color: "#e8e8e8" }),
        /* @__PURE__ */ e.jsx(wt, { label: "Final Val", value: R.toFixed(5), color: "#e8e8e8" }),
        /* @__PURE__ */ e.jsx(wt, { label: "Overfit Gap", value: `${(T * 100).toFixed(2)}%`, color: "#e8e8e8" })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "border-t border-border" }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("span", { className: "text-2xs font-medium text-[#808080] uppercase tracking-widest", children: "Features" }),
      /* @__PURE__ */ e.jsxs("div", { className: "space-y-1.5 mt-2", children: [
        /* @__PURE__ */ e.jsx(wt, { label: "Top Feature", value: t[0]?.name ?? "-", color: "#e8e8e8", small: !0 }),
        /* @__PURE__ */ e.jsx(wt, { label: "Top 3 Share", value: `${(I * 100).toFixed(1)}%`, color: "#e8e8e8", bar: I }),
        /* @__PURE__ */ e.jsx(wt, { label: "80% Coverage", value: `${F} features`, color: "#e8e8e8" }),
        /* @__PURE__ */ e.jsx(wt, { label: "Total Features", value: `${C}`, color: "#808080" })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "border-t border-border" }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("span", { className: "text-2xs font-medium text-[#808080] uppercase tracking-widest", children: "Complexity" }),
      /* @__PURE__ */ e.jsxs("div", { className: "space-y-1.5 mt-2", children: [
        /* @__PURE__ */ e.jsx(wt, { label: "Est. Nodes", value: S.toLocaleString(), color: "#e8e8e8" }),
        /* @__PURE__ */ e.jsx(wt, { label: "Objective", value: m.split(":")[1], color: "#e8e8e8", small: !0 }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-2xs text-[#808080]", children: "Overfit Risk" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-2xs font-mono text-[#808080]", children: y })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "border-t border-border" }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("span", { className: "text-2xs font-medium text-[#808080] uppercase tracking-widest", children: "Config" }),
      /* @__PURE__ */ e.jsxs("div", { className: "grid grid-cols-2 gap-x-2 gap-y-1 text-[9px]", children: [
        /* @__PURE__ */ e.jsx("span", { className: "text-[#808080]", children: "Trees" }),
        /* @__PURE__ */ e.jsx("span", { className: "text-[#e8e8e8] text-right font-mono", children: r }),
        /* @__PURE__ */ e.jsx("span", { className: "text-[#808080]", children: "Depth" }),
        /* @__PURE__ */ e.jsx("span", { className: "text-[#e8e8e8] text-right font-mono", children: i }),
        /* @__PURE__ */ e.jsx("span", { className: "text-[#808080]", children: "LR" }),
        /* @__PURE__ */ e.jsx("span", { className: "text-[#e8e8e8] text-right font-mono", children: l.toFixed(2) }),
        /* @__PURE__ */ e.jsx("span", { className: "text-[#808080]", children: "L2 (lambda)" }),
        /* @__PURE__ */ e.jsx("span", { className: "text-[#e8e8e8] text-right font-mono", children: c.toFixed(1) }),
        /* @__PURE__ */ e.jsx("span", { className: "text-[#808080]", children: "L1 (alpha)" }),
        /* @__PURE__ */ e.jsx("span", { className: "text-[#e8e8e8] text-right font-mono", children: d.toFixed(1) }),
        /* @__PURE__ */ e.jsx("span", { className: "text-[#808080]", children: "Subsample" }),
        /* @__PURE__ */ e.jsx("span", { className: "text-[#e8e8e8] text-right font-mono", children: x.toFixed(2) }),
        /* @__PURE__ */ e.jsx("span", { className: "text-[#808080]", children: "Col Sample" }),
        /* @__PURE__ */ e.jsx("span", { className: "text-[#e8e8e8] text-right font-mono", children: p.toFixed(2) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "border-t border-border pt-2", children: /* @__PURE__ */ e.jsx("div", { className: "bg-[#262626] rounded p-2 border border-border", children: /* @__PURE__ */ e.jsx("span", { className: "text-[9px] text-[#808080]", children: j === "importance" ? "Gain = information per split. Weight = split frequency. Coverage = samples through splits. Cumulative line shows importance concentration." : j === "tree" ? "Nodes split on feature thresholds. Line thickness = sample flow. Brighter nodes = higher gain. Leaf values = tree contribution to ensemble." : j === "learning" ? "Gap between curves = overfitting. Shaded zone visualizes divergence. Early stopping halts at best validation round." : j === "shap" ? "SHAP decomposes predictions into per-feature contributions. Bright dots on right = high feature values pushing predictions up." : "Diagonal = perfect fit. Band = RMSE confidence. Histogram shows residual distribution symmetry." }) }) })
  ] }) });
}
function wt({ label: t, value: s, color: n, bar: o, small: r }) {
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ e.jsx("span", { className: "text-2xs text-[#808080]", children: t }),
      /* @__PURE__ */ e.jsx("span", { className: `${r ? "text-[9px]" : "text-2xs"} font-mono`, style: { color: n }, children: s })
    ] }),
    o !== void 0 && /* @__PURE__ */ e.jsx("div", { className: "mt-0.5 h-1 bg-[#3a3a3a] rounded-full overflow-hidden", children: /* @__PURE__ */ e.jsx(
      "div",
      {
        className: "h-full rounded-full transition-all duration-300",
        style: { width: `${Math.min(100, o * 100)}%`, backgroundColor: n }
      }
    ) })
  ] });
}
function jo() {
  const [t, s] = a.useState("tree"), [n, o] = a.useState(200), [r, i] = a.useState(6), [l, c] = a.useState(0.1), [d, x] = a.useState(5), [p, C] = a.useState(1), [m, j] = a.useState(0), [u, N] = a.useState(0.8), [b, P] = a.useState(0.8), [f, k] = a.useState(12), [v, $] = a.useState("reg:squarederror"), [A, z] = a.useState(42), [R, T] = a.useState("gain"), [I, F] = a.useState(!0), [S, h] = a.useState(80), [y, w] = a.useState(!0), [M, Y] = a.useState(!0), _ = a.useRef(null), [se, V] = a.useState({ width: 900, height: 600 });
  a.useEffect(() => {
    const B = _.current;
    if (!B) return;
    const g = new ResizeObserver((oe) => {
      const { width: re, height: U } = oe[0].contentRect;
      V({ width: Math.max(400, re), height: Math.max(400, U) });
    });
    return g.observe(B), () => g.disconnect();
  }, []);
  const W = a.useMemo(
    () => ro(f, r, p, m, b, A),
    [f, r, p, m, b, A]
  ), te = a.useMemo(
    // Cap at 6 for SVG performance; deeper trees have 2^N nodes but pan/zoom
    // makes them explorable. Above 6 the layout gets too wide for usability.
    () => oo(Math.min(r, 6), f, d, b, A),
    [r, f, d, b, A]
  ), O = a.useMemo(
    () => io(n, l, r, p, u, A),
    [n, l, r, p, u, A]
  ), L = a.useMemo(
    () => lo(f, S, A),
    [f, S, A]
  ), D = a.useMemo(
    () => co(n, l, r, p, u, b, 250, A),
    [n, l, r, p, u, b, A]
  ), X = a.useCallback(() => {
    o(200), i(6), c(0.1), x(5), C(1), j(0), N(0.8), P(0.8), k(12), $("reg:squarederror"), z(42);
  }, []);
  return /* @__PURE__ */ e.jsx("div", { className: "relative w-full", style: { height: "calc(100vh - 160px)", minHeight: 500 }, children: /* @__PURE__ */ e.jsxs("div", { className: "flex h-full gap-0", children: [
    /* @__PURE__ */ e.jsx("div", { className: "w-[220px] min-w-[220px] bg-card border-r border-border overflow-y-auto flex-shrink-0", children: /* @__PURE__ */ e.jsxs("div", { className: "p-3 space-y-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[#b0b0b0] uppercase tracking-wide", children: "XGBoost" }) }),
        /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
          /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsx(le, { variant: "ghost", size: "icon", className: "h-6 w-6", onClick: X, children: /* @__PURE__ */ e.jsx(jt, { className: "w-3.5 h-3.5 text-[#808080]" }) }) }),
          /* @__PURE__ */ e.jsx(xt, { side: "right", children: /* @__PURE__ */ e.jsx("p", { className: "text-xs", children: "Reset all parameters" }) })
        ] }) })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ e.jsx(q, { className: "text-2xs text-[#808080]", children: "Objective Function" }),
        /* @__PURE__ */ e.jsxs(Jt, { value: v, onValueChange: (B) => $(B), children: [
          /* @__PURE__ */ e.jsx(es, { className: "h-7 text-xs bg-[#262626] border-[#3a3a3a]", children: /* @__PURE__ */ e.jsx(ts, {}) }),
          /* @__PURE__ */ e.jsxs(ss, { children: [
            /* @__PURE__ */ e.jsx(Qe, { value: "reg:squarederror", children: "reg:squarederror" }),
            /* @__PURE__ */ e.jsx(Qe, { value: "reg:logistic", children: "reg:logistic" }),
            /* @__PURE__ */ e.jsx(Qe, { value: "binary:logistic", children: "binary:logistic" }),
            /* @__PURE__ */ e.jsx(Qe, { value: "multi:softmax", children: "multi:softmax" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs($e, { open: y, onOpenChange: w, children: [
        /* @__PURE__ */ e.jsxs(Ie, { className: "flex items-center justify-between w-full py-1.5 px-2 rounded bg-[#262626] hover:bg-[#343434] transition-colors", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ e.jsx(vt, { className: "w-3.5 h-3.5 text-[#808080]" }),
            /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[#e8e8e8]", children: "Hyperparameters" })
          ] }),
          y ? /* @__PURE__ */ e.jsx(Le, { className: "w-3.5 h-3.5 text-[#808080]" }) : /* @__PURE__ */ e.jsx(Ae, { className: "w-3.5 h-3.5 text-[#808080]" })
        ] }),
        /* @__PURE__ */ e.jsxs(ze, { className: "pt-2 space-y-2.5", children: [
          /* @__PURE__ */ e.jsx(Ht, { label: "n_estimators", value: n, onChange: o, min: 10, max: 1e3, step: 10, format: (B) => `${B}` }),
          /* @__PURE__ */ e.jsx(Ht, { label: "max_depth", value: r, onChange: i, min: 1, max: 15, step: 1, format: (B) => `${B}` }),
          /* @__PURE__ */ e.jsx(Ht, { label: "learning_rate", value: l, onChange: (B) => c(B / 100), rawValue: l * 100, min: 1, max: 100, step: 1, format: () => l.toFixed(2) }),
          /* @__PURE__ */ e.jsx(Ht, { label: "min_child_weight", value: d, onChange: x, min: 1, max: 50, step: 1, format: (B) => `${B}` }),
          /* @__PURE__ */ e.jsx(Ht, { label: "reg_lambda (L2)", value: p, onChange: (B) => C(B / 10), rawValue: p * 10, min: 0, max: 100, step: 1, format: () => p.toFixed(1) }),
          /* @__PURE__ */ e.jsx(Ht, { label: "reg_alpha (L1)", value: m, onChange: (B) => j(B / 10), rawValue: m * 10, min: 0, max: 100, step: 1, format: () => m.toFixed(1) }),
          /* @__PURE__ */ e.jsx(Ht, { label: "subsample", value: u, onChange: (B) => N(B / 100), rawValue: u * 100, min: 10, max: 100, step: 5, format: () => u.toFixed(2) }),
          /* @__PURE__ */ e.jsx(Ht, { label: "colsample_bytree", value: b, onChange: (B) => P(B / 100), rawValue: b * 100, min: 10, max: 100, step: 5, format: () => b.toFixed(2) }),
          /* @__PURE__ */ e.jsx(Ht, { label: "Features", value: f, onChange: k, min: 4, max: 100, step: 1, format: (B) => `${B}` }),
          /* @__PURE__ */ e.jsx(Ht, { label: "Seed", value: A, onChange: z, min: 0, max: 999, step: 1, format: (B) => `${B}` })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs($e, { open: M, onOpenChange: Y, children: [
        /* @__PURE__ */ e.jsxs(Ie, { className: "flex items-center justify-between w-full py-1.5 px-2 rounded bg-[#262626] hover:bg-[#343434] transition-colors", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ e.jsx(vt, { className: "w-3.5 h-3.5 text-[#808080]" }),
            /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[#e8e8e8]", children: "View Options" })
          ] }),
          M ? /* @__PURE__ */ e.jsx(Le, { className: "w-3.5 h-3.5 text-[#808080]" }) : /* @__PURE__ */ e.jsx(Ae, { className: "w-3.5 h-3.5 text-[#808080]" })
        ] }),
        /* @__PURE__ */ e.jsxs(ze, { className: "pt-2 space-y-2.5", children: [
          t === "importance" && /* @__PURE__ */ e.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-2xs text-[#808080]", children: "Importance Metric" }),
            /* @__PURE__ */ e.jsxs(Jt, { value: R, onValueChange: (B) => T(B), children: [
              /* @__PURE__ */ e.jsx(es, { className: "h-7 text-xs bg-[#262626] border-[#3a3a3a]", children: /* @__PURE__ */ e.jsx(ts, {}) }),
              /* @__PURE__ */ e.jsxs(ss, { children: [
                /* @__PURE__ */ e.jsx(Qe, { value: "gain", children: "Gain (Information)" }),
                /* @__PURE__ */ e.jsx(Qe, { value: "weight", children: "Weight (Frequency)" }),
                /* @__PURE__ */ e.jsx(Qe, { value: "cover", children: "Cover (Samples)" })
              ] })
            ] })
          ] }),
          t === "learning" && /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-2xs text-[#808080]", children: "Early Stopping Line" }),
            /* @__PURE__ */ e.jsx(Me, { checked: I, onCheckedChange: F })
          ] }),
          t === "shap" && /* @__PURE__ */ e.jsx(Ht, { label: "SHAP Samples", value: S, onChange: h, min: 20, max: 200, step: 10, format: (B) => `${B}` })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-1 px-3 py-2 bg-card border-b border-border overflow-x-auto", children: ao.map((B) => {
        const g = t === B.id;
        return /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
          /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsx(
            le,
            {
              variant: g ? "default" : "ghost",
              size: "sm",
              className: `h-7 text-xs gap-1.5 whitespace-nowrap rounded-sm ${g ? "bg-[#343434] hover:bg-[#343434] text-[#e8e8e8] border border-[#3a3a3a]" : "text-[#808080] hover:text-[#b0b0b0] hover:bg-[#262626] border border-transparent"}`,
              onClick: () => s(B.id),
              children: B.label
            }
          ) }),
          /* @__PURE__ */ e.jsx(xt, { side: "bottom", children: /* @__PURE__ */ e.jsx("p", { className: "text-xs", children: B.desc }) })
        ] }) }, B.id);
      }) }),
      /* @__PURE__ */ e.jsxs("div", { ref: _, className: "flex-1 overflow-hidden bg-[var(--bg)]", children: [
        t === "importance" && /* @__PURE__ */ e.jsx(
          xo,
          {
            features: W,
            importanceType: R,
            width: se.width,
            height: se.height
          }
        ),
        t === "tree" && /* @__PURE__ */ e.jsx(mo, { tree: te, width: se.width, height: se.height }),
        t === "learning" && /* @__PURE__ */ e.jsx(
          ho,
          {
            data: O,
            width: se.width,
            height: se.height,
            showEarlyStopping: I
          }
        ),
        t === "shap" && /* @__PURE__ */ e.jsx(uo, { data: L, width: se.width, height: se.height }),
        t === "scatter" && /* @__PURE__ */ e.jsx(fo, { data: D, width: se.width, height: se.height })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between px-4 py-1.5 bg-card border-t border-border text-2xs text-[#b0b0b0] font-mono", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e.jsx("span", { children: "XGBoost Gradient Boosted Trees" }),
          /* @__PURE__ */ e.jsx("span", { children: "|" }),
          /* @__PURE__ */ e.jsxs("span", { children: [
            n,
            " trees"
          ] }),
          /* @__PURE__ */ e.jsxs("span", { children: [
            "depth ",
            r
          ] }),
          /* @__PURE__ */ e.jsxs("span", { children: [
            "lr ",
            l.toFixed(2)
          ] }),
          /* @__PURE__ */ e.jsxs("span", { children: [
            "lambda ",
            p.toFixed(1)
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e.jsxs("span", { children: [
            f,
            " features"
          ] }),
          /* @__PURE__ */ e.jsx("span", { children: "|" }),
          /* @__PURE__ */ e.jsx("span", { children: v }),
          /* @__PURE__ */ e.jsx("span", { children: "|" }),
          /* @__PURE__ */ e.jsxs("span", { children: [
            "Seed: ",
            A
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      po,
      {
        features: W,
        learningCurves: O,
        predictions: D,
        shapData: L,
        nEstimators: n,
        maxDepth: r,
        learningRate: l,
        regLambda: p,
        regAlpha: m,
        subsample: u,
        colsampleBytree: b,
        numFeatures: f,
        objective: v,
        viewMode: t
      }
    )
  ] }) });
}
function Ht({ label: t, value: s, onChange: n, min: o, max: r, step: i, format: l, rawValue: c }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "space-y-0.5", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ e.jsx(q, { className: "text-2xs text-[#808080]", children: t }),
      /* @__PURE__ */ e.jsx("span", { className: "text-2xs text-[#e8e8e8] font-mono", children: l(s) })
    ] }),
    /* @__PURE__ */ e.jsx(
      xe,
      {
        value: [c ?? s],
        onValueChange: ([d]) => n(d),
        min: o,
        max: r,
        step: i,
        className: "w-full"
      }
    )
  ] });
}
function ja(t) {
  return function() {
    let s = t += 1831565813;
    return s = Math.imul(s ^ s >>> 15, s | 1), s ^= s + Math.imul(s ^ s >>> 7, s | 61), ((s ^ s >>> 14) >>> 0) / 4294967296;
  };
}
const Ue = {
  amber: "#c58435",
  text: "#e8e8e8",
  textDim: "#b0b0b0",
  // Gate colours mapped to terminal roles so the five series stay
  // distinguishable without introducing off-palette hues
  forgetGate: "#f0426c",
  // down rose (what to discard)
  inputGate: "#21b3a4",
  // up teal (what to store)
  outputGate: "#b0b0b0",
  // neutral dim (what to output)
  cellState: "#c58435",
  // amber second data dimension (memory)
  hiddenState: "#e8e8e8"
  // primary series (output)
};
function xn(t) {
  return 1 / (1 + Math.exp(-t));
}
function Dn(t) {
  return Math.tanh(t);
}
function go(t, s, n) {
  const o = ja(s), r = [];
  let i = 100 + o() * 50;
  for (let l = 0; l < t; l++) {
    const c = i, d = (o() - 0.48) * n * i * 0.01, x = c + d, p = Math.abs(d) + o() * n * i * 5e-3, C = Math.max(c, x) + o() * p, m = Math.min(c, x) - o() * p, j = 1e3 + o() * 9e3;
    r.push({
      open: Math.round(c * 100) / 100,
      high: Math.round(C * 100) / 100,
      low: Math.round(m * 100) / 100,
      close: Math.round(x * 100) / 100,
      volume: Math.round(j)
    }), i = x;
  }
  return r;
}
function bo(t, s, n, o, r, i) {
  const l = ja(o + 42), c = t.length, d = 2 / Math.sqrt(s + 5), x = [];
  for (let k = 0; k < s; k++)
    x.push({
      // Input-to-gate weights (5 features each)
      wf: Array.from({ length: 5 }, () => (l() - 0.5) * d * 2),
      wi: Array.from({ length: 5 }, () => (l() - 0.5) * d * 2),
      wo: Array.from({ length: 5 }, () => (l() - 0.5) * d * 2),
      wc: Array.from({ length: 5 }, () => (l() - 0.5) * d * 2),
      // Recurrent weights (hidden-to-gate, simplified to scalar per unit)
      rf: (l() - 0.5) * d * 1.5,
      ri: (l() - 0.5) * d * 1.5,
      ro: (l() - 0.5) * d * 1.5,
      rc: (l() - 0.5) * d * 1.5,
      // Biases: forget gate starts biased positive (common LSTM init trick so it
      // remembers by default early in training), others start near zero
      bf: 1 + l() * 0.5,
      bi: -0.5 + l() * 1,
      bo: 0 + l() * 0.5,
      bc: 0
    });
  const p = [], C = [], m = [], j = [], u = [], N = [];
  let b = new Array(s).fill(0), P = new Array(s).fill(0);
  const f = n * 0.3;
  for (let k = 0; k < c; k++) {
    const v = t[k], $ = [
      (v.close - v.open) / (v.open * 5e-3 + 1e-3),
      // price change %, amplified
      (v.high - v.low) / (v.open * 5e-3 + 1e-3),
      // range %, amplified
      (v.close - v.low) / (v.high - v.low + 1e-3) * 2 - 1,
      // close position [-1,1]
      (v.volume - 5e3) / 3e3,
      // normalised volume, wider range
      Math.sin(k * 0.2) + Math.cos(k * 0.07) * 0.5
      // richer positional encoding
    ], A = [], z = [], R = [], T = [], I = [], F = [];
    for (let S = 0; S < s; S++) {
      const h = x[S];
      let y = h.bf, w = h.bi, M = h.bo, Y = h.bc;
      for (let X = 0; X < 5; X++)
        y += h.wf[X] * $[X], w += h.wi[X] * $[X], M += h.wo[X] * $[X], Y += h.wc[X] * $[X];
      const _ = P[S];
      y += h.rf * _ * (1 + f), w += h.ri * _ * (1 + f), M += h.ro * _ * (1 + f), Y += h.rc * _ * (1 + f);
      const se = xn(y), V = xn(w), W = xn(M), te = Dn(Y), O = l() > i ? 1 : 0, L = se * b[S] + V * te, D = W * Dn(L) * O;
      A.push(se), z.push(V), R.push(W), T.push(te), I.push(L), F.push(D);
    }
    p.push(A), C.push(z), m.push(R), j.push(T), u.push(I), N.push(F), b = I, P = F;
  }
  return {
    forgetGates: p,
    inputGates: C,
    outputGates: m,
    candidateValues: j,
    cellStates: u,
    hiddenStates: N
  };
}
function vo({
  width: t,
  height: s,
  animStep: n,
  isPlaying: o,
  lstmData: r,
  currentStep: i,
  hiddenSize: l
}) {
  const c = t / 2, d = s / 2, x = Math.min(t / 900, s / 600), p = r.forgetGates[i], C = r.inputGates[i], m = r.outputGates[i], j = r.candidateValues[i], u = p ? p.reduce((S, h) => S + h, 0) / p.length : 0.5, N = C ? C.reduce((S, h) => S + h, 0) / C.length : 0.5, b = m ? m.reduce((S, h) => S + h, 0) / m.length : 0.5, P = j ? j.reduce((S, h) => S + h, 0) / j.length : 0, f = o ? Math.sin(n * 0.1) * 0.3 + 0.7 : 1, k = 100 * x, v = 50 * x, $ = c - 220 * x, A = c - 60 * x, z = c + 240 * x, R = d + 40 * x, T = d - 60 * x, I = (S, h, y, w, M, Y) => /* @__PURE__ */ e.jsxs("g", { children: [
    /* @__PURE__ */ e.jsx(
      "rect",
      {
        x: S - k / 2,
        y: h - v / 2,
        width: k,
        height: v,
        rx: 6 * x,
        ry: 6 * x,
        fill: M,
        fillOpacity: 0.15 + w * 0.35,
        stroke: M,
        strokeWidth: 1.5,
        strokeOpacity: 0.6 + w * 0.4
      }
    ),
    /* @__PURE__ */ e.jsx(
      "text",
      {
        x: S,
        y: h - 6 * x,
        textAnchor: "middle",
        fill: Ue.text,
        fontSize: 12 * x,
        fontFamily: "monospace",
        fontWeight: "600",
        children: y
      }
    ),
    /* @__PURE__ */ e.jsx(
      "text",
      {
        x: S,
        y: h + 10 * x,
        textAnchor: "middle",
        fill: Ue.textDim,
        fontSize: 9 * x,
        fontFamily: "monospace",
        children: Y
      }
    ),
    /* @__PURE__ */ e.jsx(
      "text",
      {
        x: S,
        y: h + v / 2 + 14 * x,
        textAnchor: "middle",
        fill: M,
        fontSize: 11 * x,
        fontFamily: "monospace",
        fontWeight: "bold",
        children: w.toFixed(3)
      }
    )
  ] }, y), F = (S, h, y, w, M, Y) => {
    const _ = y - S, se = w - h, V = Math.sqrt(_ * _ + se * se), W = _ / V, te = se / V, O = 8 * x, L = y - W * O, D = w - te * O;
    return /* @__PURE__ */ e.jsxs("g", { opacity: f, children: [
      /* @__PURE__ */ e.jsx(
        "line",
        {
          x1: S,
          y1: h,
          x2: L,
          y2: D,
          stroke: M,
          strokeWidth: 1.5 * x,
          strokeDasharray: Y ? `${4 * x} ${3 * x}` : void 0,
          opacity: 0.6
        }
      ),
      /* @__PURE__ */ e.jsx(
        "polygon",
        {
          points: `${y},${w} ${L - te * 4 * x},${D + W * 4 * x} ${L + te * 4 * x},${D - W * 4 * x}`,
          fill: M,
          opacity: 0.6
        }
      )
    ] });
  };
  return /* @__PURE__ */ e.jsxs("g", { children: [
    /* @__PURE__ */ e.jsxs("text", { x: c, y: 30 * x, textAnchor: "middle", fill: Ue.text, fontSize: 14 * x, fontFamily: "monospace", fontWeight: "bold", children: [
      "LSTM Cell (Timestep ",
      i + 1,
      ")"
    ] }),
    /* @__PURE__ */ e.jsx(
      "line",
      {
        x1: c - 300 * x,
        y1: T,
        x2: c + 300 * x,
        y2: T,
        stroke: Ue.cellState,
        strokeWidth: 3 * x,
        opacity: 0.4
      }
    ),
    /* @__PURE__ */ e.jsx("text", { x: c - 300 * x, y: T - 12 * x, fill: Ue.cellState, fontSize: 10 * x, fontFamily: "monospace", children: "Cell State (c_t)" }),
    /* @__PURE__ */ e.jsx(
      "line",
      {
        x1: c - 300 * x,
        y1: R + 80 * x,
        x2: c + 300 * x,
        y2: R + 80 * x,
        stroke: Ue.hiddenState,
        strokeWidth: 2.5 * x,
        opacity: 0.35
      }
    ),
    /* @__PURE__ */ e.jsx("text", { x: c - 300 * x, y: R + 72 * x, fill: Ue.hiddenState, fontSize: 10 * x, fontFamily: "monospace", children: "Hidden State (h_t)" }),
    I($, R, "Forget", u, Ue.forgetGate, "sigma()"),
    F($, R - v / 2, $, T + 6 * x, Ue.forgetGate),
    /* @__PURE__ */ e.jsx("circle", { cx: $, cy: T, r: 10 * x, fill: "none", stroke: Ue.forgetGate, strokeWidth: 1.5, opacity: 0.6 }),
    /* @__PURE__ */ e.jsx("text", { x: $, y: T + 4 * x, textAnchor: "middle", fill: Ue.forgetGate, fontSize: 14 * x, fontFamily: "monospace", children: "x" }),
    I(A, R, "Input", N, Ue.inputGate, "sigma()"),
    I(A + k * 1.1, R, "Candidate", Math.abs(P), Ue.amber, "tanh()"),
    F(A + k * 0.55, R - v / 2, A + k * 0.55, T + 6 * x, Ue.inputGate),
    /* @__PURE__ */ e.jsx("circle", { cx: A + k * 0.55, cy: T, r: 10 * x, fill: "none", stroke: Ue.inputGate, strokeWidth: 1.5, opacity: 0.6 }),
    /* @__PURE__ */ e.jsx("text", { x: A + k * 0.55, y: T + 4 * x, textAnchor: "middle", fill: Ue.inputGate, fontSize: 14 * x, fontFamily: "monospace", children: "+" }),
    I(z, R, "Output", b, Ue.outputGate, "sigma()"),
    F(z, T + 6 * x, z, R - v / 2, Ue.outputGate, !0),
    F(z, R + v / 2, z, R + 74 * x, Ue.hiddenState),
    /* @__PURE__ */ e.jsx("text", { x: c - 340 * x, y: R + 4 * x, fill: Ue.text, fontSize: 11 * x, fontFamily: "monospace", textAnchor: "end", children: "x_t (candle)" }),
    F(c - 330 * x, R, c - 280 * x, R, Ue.textDim),
    /* @__PURE__ */ e.jsx("text", { x: c - 340 * x, y: R + 84 * x, fill: Ue.hiddenState, fontSize: 10 * x, fontFamily: "monospace", textAnchor: "end", children: "h_{t-1}" }),
    /* @__PURE__ */ e.jsx("text", { x: c + 340 * x, y: T + 4 * x, fill: Ue.cellState, fontSize: 10 * x, fontFamily: "monospace", children: "c_t (memory)" }),
    /* @__PURE__ */ e.jsx("text", { x: c + 340 * x, y: R + 84 * x, fill: Ue.hiddenState, fontSize: 10 * x, fontFamily: "monospace", children: "h_t (output)" }),
    /* @__PURE__ */ e.jsxs("g", { transform: `translate(${c - 280 * x}, ${d + 160 * x})`, children: [
      /* @__PURE__ */ e.jsx("text", { fill: Ue.textDim, fontSize: 9 * x, fontFamily: "monospace", y: 0, children: 'Forget Gate: "Should I keep or discard old memory?"' }),
      /* @__PURE__ */ e.jsx("text", { fill: Ue.textDim, fontSize: 9 * x, fontFamily: "monospace", y: 16 * x, children: 'Input Gate: "Is this new candle worth remembering?"' }),
      /* @__PURE__ */ e.jsx("text", { fill: Ue.textDim, fontSize: 9 * x, fontFamily: "monospace", y: 32 * x, children: 'Output Gate: "What should I output from my memory right now?"' }),
      /* @__PURE__ */ e.jsx("text", { fill: Ue.textDim, fontSize: 9 * x, fontFamily: "monospace", y: 48 * x, children: "Cell State: Long-term memory flowing through (the conveyor belt)" })
    ] })
  ] });
}
function yo() {
  const [t, s] = a.useState(32), [n, o] = a.useState(2), [r, i] = a.useState(100), [l, c] = a.useState(1e-3), [d, x] = a.useState(0.2), [p, C] = a.useState(2), [m, j] = a.useState(42), [u, N] = a.useState(100), [b, P] = a.useState("architecture"), [f, k] = a.useState(!1), [v, $] = a.useState(r - 1), [A, z] = a.useState(0), [R, T] = a.useState(!1), [I, F] = a.useState(!1), [S, h] = a.useState(1), [y, w] = a.useState({ x: 0, y: 0 }), [M, Y] = a.useState(!1), _ = a.useRef({ x: 0, y: 0, panX: 0, panY: 0 }), se = a.useRef(null), V = a.useRef(null), [W, te] = a.useState({ width: 800, height: 500 });
  a.useEffect(() => {
    const U = () => {
      if (V.current) {
        const ee = V.current.getBoundingClientRect();
        te({ width: ee.width, height: ee.height });
      }
    };
    return U(), window.addEventListener("resize", U), () => window.removeEventListener("resize", U);
  }, []), a.useEffect(() => {
    h(1), w({ x: 0, y: 0 });
  }, [b]);
  const O = a.useRef(S);
  O.current = S, a.useEffect(() => {
    const U = se.current;
    if (!U) return;
    function ee(E) {
      E.preventDefault(), E.stopPropagation();
      const G = U.getBoundingClientRect(), J = E.clientX - G.left, K = E.clientY - G.top, ue = E.deltaY > 0 ? 0.9 : 1.1, ce = O.current, Q = Math.max(0.1, Math.min(5, ce * ue)), ne = Q / ce;
      w((H) => ({
        x: J - (J - H.x) * ne,
        y: K - (K - H.y) * ne
      })), h(Q);
    }
    return U.addEventListener("wheel", ee, { passive: !1 }), () => U.removeEventListener("wheel", ee);
  }, []);
  const L = a.useCallback((U) => {
    U.button === 0 && (U.preventDefault(), Y(!0), _.current = { x: U.clientX, y: U.clientY, panX: y.x, panY: y.y });
  }, [y]);
  a.useEffect(() => {
    if (!M) return;
    function U(E) {
      w({
        x: _.current.panX + (E.clientX - _.current.x),
        y: _.current.panY + (E.clientY - _.current.y)
      });
    }
    function ee() {
      Y(!1);
    }
    return window.addEventListener("mousemove", U), window.addEventListener("mouseup", ee), () => {
      window.removeEventListener("mousemove", U), window.removeEventListener("mouseup", ee);
    };
  }, [M]);
  const D = a.useCallback(() => {
    h(1), w({ x: 0, y: 0 });
  }, []), X = a.useMemo(
    () => go(r, m, p),
    [r, m, p]
  ), B = a.useMemo(
    () => bo(X, t, n, m, l, d),
    [X, t, n, m, l, d]
  );
  a.useEffect(() => {
    if (!f) return;
    const U = setInterval(() => {
      z((ee) => ee + 1), $((ee) => ee >= r - 1 ? (k(!1), ee) : ee + 1);
    }, u);
    return () => clearInterval(U);
  }, [f, r, u]);
  const g = a.useCallback(() => {
    $(r - 1), z(0), k(!1), h(1), w({ x: 0, y: 0 });
  }, [r]), oe = a.useCallback(() => {
    $((U) => Math.min(U + 1, r - 1)), z((U) => U + 1);
  }, [r]), re = a.useMemo(() => {
    const ee = (ne) => 4 * ((ne === 0 ? 5 : t) * t + t * t + t), E = Array.from({ length: n }).reduce(
      (ne, H, me) => ne + ee(me),
      0
    ), G = B.hiddenStates[v] || [], J = B.cellStates[v] || [], K = B.forgetGates[v] || [], ue = B.inputGates[v] || [], ce = (ne) => ne.length ? ne.reduce((H, me) => H + me, 0) / ne.length : 0, Q = (ne) => {
      if (!ne.length) return 0;
      const H = ce(ne);
      return Math.sqrt(ne.reduce((me, be) => me + (be - H) ** 2, 0) / ne.length);
    };
    return {
      totalParams: E,
      hiddenMean: ce(G),
      hiddenStd: Q(G),
      cellMean: ce(J),
      cellStd: Q(J),
      forgetMean: ce(K),
      inputMean: ce(ue),
      architecture: `5 > ${Array(n).fill(t).join(" > ")} > 3`
    };
  }, [t, n, B, v]);
  return /* @__PURE__ */ e.jsxs("div", { className: "relative w-full h-[calc(100vh-180px)] min-h-[600px] bg-[#1c1c1c] rounded-lg overflow-hidden border border-border", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10", children: [
      /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-3 pointer-events-auto", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-card text-[#e8e8e8] rounded-lg px-4 py-2 border border-border flex items-center gap-2", children: [
        /* @__PURE__ */ e.jsx("span", { className: "font-semibold text-[#e8e8e8]", children: "LSTM Network" }),
        /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
          /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4 text-[#b0b0b0] cursor-help" }) }),
          /* @__PURE__ */ e.jsx(xt, { className: "max-w-sm", children: /* @__PURE__ */ e.jsx("p", { className: "text-sm", children: "Interactive Long Short-Term Memory visualisation. LSTM cells process sequential candle data, maintaining memory of past patterns through gated read/write operations." }) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 pointer-events-auto", children: [
        /* @__PURE__ */ e.jsxs(
          le,
          {
            variant: f ? "default" : "outline",
            size: "sm",
            onClick: () => {
              f ? k(!1) : (v >= r - 1 && $(0), k(!0));
            },
            className: f ? "" : "bg-card text-[#e8e8e8]",
            children: [
              f ? /* @__PURE__ */ e.jsx(os, { className: "h-4 w-4 mr-1" }) : /* @__PURE__ */ e.jsx(Bt, { className: "h-4 w-4 mr-1" }),
              f ? "Pause" : "Play"
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(
          le,
          {
            variant: "outline",
            size: "sm",
            onClick: oe,
            className: "bg-card text-[#e8e8e8]",
            disabled: v >= r - 1,
            children: /* @__PURE__ */ e.jsx(ua, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          le,
          {
            variant: "outline",
            size: "sm",
            onClick: g,
            className: "bg-card text-[#e8e8e8]",
            children: /* @__PURE__ */ e.jsx(jt, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute left-4 top-20 w-64 space-y-2 pointer-events-auto z-10", children: /* @__PURE__ */ e.jsxs($e, { open: R, onOpenChange: T, children: [
      /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[#e8e8e8]", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e.jsx(vt, { className: "h-4 w-4" }),
          "Network Config"
        ] }),
        R ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
      ] }) }),
      /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card text-[#e8e8e8] border-border space-y-4", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Hidden Size" }),
            /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[#e8e8e8]", children: t })
          ] }),
          /* @__PURE__ */ e.jsx(xe, { value: [t], onValueChange: ([U]) => {
            s(U), g();
          }, min: 4, max: 128, step: 4 })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Layers" }),
            /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[#e8e8e8]", children: n })
          ] }),
          /* @__PURE__ */ e.jsx(xe, { value: [n], onValueChange: ([U]) => {
            o(U), g();
          }, min: 1, max: 4, step: 1 })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Sequence Length" }),
            /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[#e8e8e8]", children: r })
          ] }),
          /* @__PURE__ */ e.jsx(xe, { value: [r], onValueChange: ([U]) => {
            i(U), g();
          }, min: 10, max: 1e3, step: 10 })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Dropout" }),
            /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[#e8e8e8]", children: d.toFixed(2) })
          ] }),
          /* @__PURE__ */ e.jsx(xe, { value: [d], onValueChange: ([U]) => {
            x(U), g();
          }, min: 0, max: 0.5, step: 0.05 })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Volatility" }),
            /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[#e8e8e8]", children: p.toFixed(1) })
          ] }),
          /* @__PURE__ */ e.jsx(xe, { value: [p], onValueChange: ([U]) => {
            C(U), g();
          }, min: 0.5, max: 5, step: 0.5 })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Seed" }),
            /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[#e8e8e8]", children: m })
          ] }),
          /* @__PURE__ */ e.jsx(xe, { value: [m], onValueChange: ([U]) => {
            j(U), g();
          }, min: 0, max: 999, step: 1 })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Speed" }),
            /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[#e8e8e8]", children: u <= 30 ? "Max" : u <= 80 ? "Fast" : u <= 150 ? "Normal" : "Slow" })
          ] }),
          /* @__PURE__ */ e.jsx(xe, { value: [u], onValueChange: ([U]) => N(U), min: 10, max: 500, step: 10 })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "space-y-2 pt-2 border-t border-border", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Timestep" }),
            /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[#e8e8e8]", children: [
              v + 1,
              " / ",
              r
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(
            xe,
            {
              value: [v],
              onValueChange: ([U]) => $(U),
              min: 0,
              max: r - 1,
              step: 1
            }
          )
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute right-4 top-20 w-56 pointer-events-auto z-10", children: /* @__PURE__ */ e.jsxs($e, { open: I, onOpenChange: F, children: [
      /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[#e8e8e8]", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4" }),
          "Network Stats"
        ] }),
        I ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
      ] }) }),
      /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-3 bg-card text-[#e8e8e8] border-border space-y-3", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[#b0b0b0]", children: "Parameters" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm font-medium text-[#e8e8e8]", children: re.totalParams.toLocaleString() })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "pt-2 border-t border-border", children: [
          /* @__PURE__ */ e.jsx("div", { className: "text-xs text-[#b0b0b0] mb-1", children: "Architecture" }),
          /* @__PURE__ */ e.jsx("div", { className: "text-xs font-mono text-[#e8e8e8]", children: re.architecture })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[#808080]", children: "Forget gate" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-xs font-mono", style: { color: Ue.forgetGate }, children: re.forgetMean.toFixed(3) })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[#808080]", children: "Input gate" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-xs font-mono", style: { color: Ue.inputGate }, children: re.inputMean.toFixed(3) })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx("div", { ref: V, className: "absolute inset-0 top-16 bottom-0 left-0 right-0", children: /* @__PURE__ */ e.jsxs(
      "svg",
      {
        ref: se,
        width: W.width,
        height: W.height,
        viewBox: `0 0 ${W.width} ${W.height}`,
        className: "w-full h-full",
        style: {
          background: "var(--bg, #1c1c1c)",
          cursor: M ? "grabbing" : "grab"
        },
        onMouseDown: L,
        onDoubleClick: D,
        children: [
          /* @__PURE__ */ e.jsx("g", { transform: `translate(${y.x},${y.y}) scale(${S})`, children: /* @__PURE__ */ e.jsx(
            vo,
            {
              width: W.width,
              height: W.height,
              animStep: A,
              isPlaying: f,
              lstmData: B,
              currentStep: v,
              hiddenSize: t
            }
          ) }),
          S !== 1 && /* @__PURE__ */ e.jsxs("g", { transform: `translate(${W.width - 120}, 12)`, children: [
            /* @__PURE__ */ e.jsx("rect", { width: 100, height: 22, rx: 4, fill: "#2a2a2a", stroke: "#3a3a3a" }),
            /* @__PURE__ */ e.jsxs("text", { x: 50, y: 15, textAnchor: "middle", fill: Ue.textDim, fontSize: 10, fontFamily: "monospace", children: [
              "zoom: ",
              (S * 100).toFixed(0),
              "%"
            ] })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto z-10", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-card text-[#e8e8e8] rounded-lg px-4 py-2 border border-border flex items-center gap-4 text-xs text-[#b0b0b0]", children: [
      /* @__PURE__ */ e.jsx("span", { children: "drag: pan" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "|" }),
      /* @__PURE__ */ e.jsx("span", { children: "scroll: zoom" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "|" }),
      /* @__PURE__ */ e.jsx("span", { children: "dbl-click: reset" }),
      /* @__PURE__ */ e.jsx("span", { className: "text-border", children: "|" }),
      /* @__PURE__ */ e.jsx("span", { children: "Play to animate sequence" })
    ] }) })
  ] });
}
function ga(t) {
  return function() {
    let s = t += 1831565813;
    return s = Math.imul(s ^ s >>> 15, s | 1), s ^= s + Math.imul(s ^ s >>> 7, s | 61), ((s ^ s >>> 14) >>> 0) / 4294967296;
  };
}
function No(t) {
  const s = t(), n = t();
  return Math.sqrt(-2 * Math.log(s + 1e-10)) * Math.cos(2 * Math.PI * n);
}
const ge = {
  bg: "#1c1c1c",
  gridLine: "#2e2e2e",
  text: "#e8e8e8",
  textDim: "#b0b0b0",
  textMuted: "#808080",
  // Regime colours: muted but distinguishable. Each regime gets a unique hue
  // so the user can instantly see state transitions on the price chart.
  // Institutional regime terminology matching how quant desks label market states.
  regimes: [
    // Terminal palette roles: teal = up/risk-on, rose = down/risk-off, amber = stress
    // warning. Momentum/Recovery get desaturated olive/mauve because six states need
    // six distinguishable hues and the terminal bans blue/neon accents.
    { name: "Risk On", color: "#21b3a4", colorLight: "#3bc9ba", bg: "rgba(33,179,164,0.12)" },
    { name: "Risk Off", color: "#f0426c", colorLight: "#f4688a", bg: "rgba(240,66,108,0.12)" },
    { name: "Low Vol", color: "#808080", colorLight: "#b0b0b0", bg: "rgba(128,128,128,0.12)" },
    { name: "Stress", color: "#c58435", colorLight: "#d69c55", bg: "rgba(197,132,53,0.12)" },
    { name: "Momentum", color: "#8f9a62", colorLight: "#a8b378", bg: "rgba(143,154,98,0.12)" },
    { name: "Recovery", color: "#9d7a9d", colorLight: "#b393b3", bg: "rgba(157,122,157,0.12)" }
  ]
}, On = [
  { meanReturn: 0.15, volatility: 0.6 },
  // Bull: steady grind up, low vol
  { meanReturn: -0.25, volatility: 2 },
  // Bear: sells off hard, high vol
  { meanReturn: 0, volatility: 0.3 },
  // Sideways: flat, very quiet
  { meanReturn: -0.5, volatility: 3.5 },
  // Crisis: crash, extreme vol
  { meanReturn: 0.35, volatility: 1.5 },
  // Euphoria: rips higher, elevated vol
  { meanReturn: 0.45, volatility: 2.5 }
  // Recovery: strong bounce after crash
];
function wo(t, s, n, o, r) {
  const i = ga(r), l = [];
  for (let m = 0; m < s; m++) {
    const j = [], u = 1 - n, N = [];
    let b = 0;
    for (let P = 0; P < s; P++)
      if (m === P)
        N.push(0);
      else {
        const k = 1 / Math.abs(m - P) * (0.5 + i() * 1);
        N.push(k), b += k;
      }
    for (let P = 0; P < s; P++)
      m === P ? j.push(n) : j.push(N[P] / b * u);
    l.push(j);
  }
  let c = 0;
  const d = [], x = [], p = [100];
  let C = 0;
  for (let m = 0; m < t; m++) {
    const j = i();
    let u = 0, N = c;
    for (let k = 0; k < s; k++)
      if (u += l[c][k], j < u) {
        N = k;
        break;
      }
    c = N, d.push(c);
    const b = o[c];
    let P = b.meanReturn + b.volatility * No(i);
    c === 0 || c === 4 ? P += C * 0.2 : c === 1 || c === 3 ? P += C * 0.3 : P -= C * 0.3, x.push(P), C = P;
    const f = p[p.length - 1];
    p.push(f * (1 + P / 100));
  }
  return { trueStates: d, returns: x, prices: p, transMatrix: l };
}
function So(t, s, n, o) {
  const r = t.length, i = [], l = (x, p, C) => {
    const m = (x - p) / C;
    return Math.exp(-0.5 * m * m) / (C * Math.sqrt(2 * Math.PI));
  }, c = [];
  for (let x = 0; x < s; x++)
    c.push(1 / s * l(t[0], o[x].meanReturn, o[x].volatility));
  const d = c.reduce((x, p) => x + p, 0) || 1;
  i.push(c.map((x) => x / d));
  for (let x = 1; x < r; x++) {
    const p = [];
    for (let m = 0; m < s; m++) {
      let j = 0;
      for (let u = 0; u < s; u++)
        j += i[x - 1][u] * n[u][m];
      p.push(j * l(t[x], o[m].meanReturn, o[m].volatility));
    }
    const C = p.reduce((m, j) => m + j, 0) || 1;
    i.push(p.map((m) => m / C));
  }
  return i;
}
function Mo(t, s, n, o) {
  const r = t.length, i = (m, j, u) => {
    const N = (m - j) / u;
    return -0.5 * N * N - Math.log(u) - 0.5 * Math.log(2 * Math.PI);
  }, l = [], c = [], d = [];
  for (let m = 0; m < s; m++)
    d.push(Math.log(1 / s) + i(t[0], o[m].meanReturn, o[m].volatility));
  l.push(d), c.push(new Array(s).fill(0));
  for (let m = 1; m < r; m++) {
    const j = [], u = [];
    for (let N = 0; N < s; N++) {
      let b = -1 / 0, P = 0;
      for (let f = 0; f < s; f++) {
        const k = l[m - 1][f] + Math.log(n[f][N] + 1e-10);
        k > b && (b = k, P = f);
      }
      j.push(b + i(t[m], o[N].meanReturn, o[N].volatility)), u.push(P);
    }
    l.push(j), c.push(u);
  }
  const x = new Array(r);
  let p = 0;
  for (let m = 1; m < s; m++)
    l[r - 1][m] > l[r - 1][p] && (p = m);
  x[r - 1] = p;
  for (let m = r - 2; m >= 0; m--)
    x[m] = c[m + 1][x[m + 1]];
  const C = l.map((m) => {
    const j = [...m].sort((u, N) => N - u);
    return Math.min(1, Math.max(0, (j[0] - j[1]) * 0.3));
  });
  return { path: x, confidence: C };
}
function Co({
  width: t,
  height: s,
  viterbiPath: n,
  numStates: o,
  currentStep: r,
  transMatrix: i,
  regimes: l,
  alpha: c,
  returns: d,
  trueStates: x,
  seed: p,
  customNames: C,
  onStateClick: m,
  selectedRegime: j
}) {
  const u = (V) => C[V] && C[V].trim() || ge.regimes[V].name, N = n[r] ?? 0, b = c[r] || [], P = t / 2, f = Math.min(75, Math.max(45, (t - 300) / (o * 3))), k = Math.min(260, (t - 200) / o), v = s * 0.32, $ = Array.from({ length: o }, (V, W) => ({
    x: P + (W - (o - 1) / 2) * k,
    y: v
  })), A = ko($, f, N);
  let z = 0, R = 0;
  for (let V = 0; V <= r; V++)
    V > 0 && n[V] !== n[V - 1] && z++, n[V] === x[V] && R++;
  const T = r > 0 ? R / (r + 1) * 100 : 0, I = d[r] ?? 0, F = Math.min(60, r + 1), S = Math.max(0, r + 1 - F), h = s * 0.72, y = 30, w = Math.min(t - 100, F * 12), M = P - w / 2, Y = w / F, _ = Math.max(
    ...l.slice(0, o).map((V) => 1 / (V.volatility * Math.sqrt(2 * Math.PI)))
  ), se = (V, W, te, O, L, D) => {
    const X = [], oe = Math.max(...l.slice(0, o).map((re) => re.volatility)) * 6;
    for (let re = 0; re <= 30; re++) {
      const U = re / 30, ee = te - L / 2 + U * L, G = (V + (U - 0.5) * oe - V) / W, J = Math.exp(-0.5 * G * G) / (W * Math.sqrt(2 * Math.PI)), K = O + D / 2 - J / _ * D;
      X.push(`${ee},${K}`);
    }
    return X.join(" ");
  };
  return /* @__PURE__ */ e.jsxs("g", { children: [
    /* @__PURE__ */ e.jsx("defs", { children: Array.from({ length: o }).map((V, W) => /* @__PURE__ */ e.jsx(
      "marker",
      {
        id: `arrow-${W}`,
        markerWidth: "8",
        markerHeight: "8",
        refX: "4",
        refY: "4",
        orient: "auto",
        children: /* @__PURE__ */ e.jsx("path", { d: "M 0 0 L 8 4 L 0 8 Z", fill: ge.regimes[W].color })
      },
      W
    )) }),
    /* @__PURE__ */ e.jsx(
      "text",
      {
        x: P,
        y: 28,
        textAnchor: "middle",
        fill: ge.text,
        fontSize: 20,
        fontFamily: "monospace",
        fontWeight: "bold",
        letterSpacing: "3",
        children: "HIDDEN MARKOV MODEL"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "line",
      {
        x1: P - 130,
        y1: 36,
        x2: P + 130,
        y2: 36,
        stroke: ge.gridLine,
        strokeWidth: 1
      }
    ),
    /* @__PURE__ */ e.jsx(
      "text",
      {
        x: P,
        y: v - f - 30,
        textAnchor: "middle",
        fill: ge.textMuted,
        fontSize: 11,
        fontFamily: "monospace",
        letterSpacing: "2",
        children: "HIDDEN STATES"
      }
    ),
    Array.from({ length: o }).flatMap(
      (V, W) => Array.from({ length: o }).map(
        (te, O) => A(W, O, i[W][O])
      )
    ),
    $.map((V, W) => {
      const te = ge.regimes[W], O = W === N, L = W === j, D = b[W] || 0;
      return /* @__PURE__ */ e.jsxs(
        "g",
        {
          style: { cursor: "pointer" },
          onClick: (X) => {
            X.stopPropagation(), m(W);
          },
          children: [
            O && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(
                "circle",
                {
                  cx: V.x,
                  cy: V.y,
                  r: f + 12,
                  fill: "none",
                  stroke: te.color,
                  strokeWidth: 1,
                  opacity: 0.2
                }
              ),
              /* @__PURE__ */ e.jsx(
                "circle",
                {
                  cx: V.x,
                  cy: V.y,
                  r: f + 7,
                  fill: "none",
                  stroke: te.color,
                  strokeWidth: 2,
                  opacity: 0.4
                }
              )
            ] }),
            L && /* @__PURE__ */ e.jsx(
              "circle",
              {
                cx: V.x,
                cy: V.y,
                r: f + 4,
                fill: "none",
                stroke: "#e8e8e8",
                strokeWidth: 1.5,
                strokeDasharray: "4,3",
                opacity: 0.7
              }
            ),
            /* @__PURE__ */ e.jsx(
              "circle",
              {
                cx: V.x,
                cy: V.y,
                r: f,
                fill: te.color,
                fillOpacity: O ? 0.15 : 0.04,
                stroke: te.color,
                strokeWidth: O ? 2 : 1,
                strokeOpacity: O ? 1 : 0.4
              }
            ),
            /* @__PURE__ */ e.jsxs(
              "text",
              {
                x: V.x,
                y: V.y - f * 0.45,
                textAnchor: "middle",
                fill: te.color,
                fontSize: Math.min(14, f * 0.3),
                fontFamily: "monospace",
                fontWeight: "bold",
                children: [
                  "S",
                  W + 1,
                  ": ",
                  u(W)
                ]
              }
            ),
            /* @__PURE__ */ e.jsx(
              "polyline",
              {
                points: se(
                  l[W].meanReturn,
                  l[W].volatility,
                  V.x,
                  V.y + f * 0.05,
                  f * 1.2,
                  f * 0.5
                ),
                fill: "none",
                stroke: te.color,
                strokeWidth: 1.5,
                opacity: O ? 0.8 : 0.3
              }
            ),
            /* @__PURE__ */ e.jsx(
              "line",
              {
                x1: V.x - f * 0.6,
                y1: V.y + f * 0.3,
                x2: V.x + f * 0.6,
                y2: V.y + f * 0.3,
                stroke: te.color,
                strokeWidth: 0.5,
                opacity: 0.3
              }
            ),
            /* @__PURE__ */ e.jsxs(
              "text",
              {
                x: V.x,
                y: V.y + f * 0.5,
                textAnchor: "middle",
                fill: ge.textDim,
                fontSize: Math.min(11, f * 0.22),
                fontFamily: "monospace",
                children: [
                  "mean ",
                  l[W].meanReturn >= 0 ? "+" : "",
                  l[W].meanReturn.toFixed(2),
                  "%  vol ",
                  l[W].volatility.toFixed(1),
                  "%"
                ]
              }
            ),
            /* @__PURE__ */ e.jsxs("g", { transform: `translate(${V.x - f * 0.7}, ${V.y + f + 8})`, children: [
              /* @__PURE__ */ e.jsx(
                "rect",
                {
                  width: f * 1.4,
                  height: 6,
                  rx: 3,
                  fill: ge.gridLine
                }
              ),
              /* @__PURE__ */ e.jsx(
                "rect",
                {
                  width: D * f * 1.4,
                  height: 6,
                  rx: 3,
                  fill: te.color,
                  fillOpacity: 0.6
                }
              ),
              /* @__PURE__ */ e.jsxs(
                "text",
                {
                  x: f * 0.7,
                  y: 20,
                  textAnchor: "middle",
                  fill: te.color,
                  fontSize: 12,
                  fontFamily: "monospace",
                  fontWeight: O ? "bold" : "normal",
                  opacity: O ? 1 : 0.5,
                  children: [
                    "P(S",
                    W + 1,
                    "|O) = ",
                    (D * 100).toFixed(1),
                    "%"
                  ]
                }
              )
            ] })
          ]
        },
        W
      );
    }),
    (() => {
      const V = $[0].y + f + 55, W = h - 55, te = W - V;
      if (te < 60) return null;
      const O = 16, L = Math.floor(te / O), D = ga(p + r * 7);
      let X = 2340 + D() * 50;
      const B = [], g = 9 + Math.floor(r * 3 / 60) % 15, oe = r * 3 % 60;
      for (let G = 0; G < L; G++) {
        const J = oe + G, K = g + Math.floor(J / 60), ue = J % 60, ce = X, Q = (D() - 0.48) * 2.5, ne = ce + Q, H = Math.max(ce, ne) + D() * 1.2, me = Math.min(ce, ne) - D() * 1.2, be = Math.floor(50 + D() * 400), Re = (ne - ce) / ce * 100;
        B.push({
          time: `${String(K % 24).padStart(2, "0")}:${String(ue).padStart(2, "0")}`,
          o: Math.round(ce * 100) / 100,
          h: Math.round(H * 100) / 100,
          l: Math.round(me * 100) / 100,
          c: Math.round(ne * 100) / 100,
          vol: be,
          ret: Math.round(Re * 1e3) / 1e3
        }), X = ne;
      }
      const re = ["TIME", "OPEN", "HIGH", "LOW", "CLOSE", "VOL", "RET%"], U = [55, 70, 70, 70, 70, 45, 55], ee = U.reduce((G, J) => G + J, 0), E = P - ee / 2;
      return /* @__PURE__ */ e.jsxs("g", { children: [
        /* @__PURE__ */ e.jsx(
          "text",
          {
            x: E,
            y: V - 6,
            fill: ge.textMuted,
            fontSize: 9,
            fontFamily: "monospace",
            children: "XAUUSD 1M"
          }
        ),
        /* @__PURE__ */ e.jsx(
          "text",
          {
            x: E + ee,
            y: V - 6,
            textAnchor: "end",
            fill: ge.textMuted,
            fontSize: 9,
            fontFamily: "monospace",
            children: "Processing..."
          }
        ),
        re.map((G, J) => {
          let K = E;
          for (let ue = 0; ue < J; ue++) K += U[ue];
          return /* @__PURE__ */ e.jsx(
            "text",
            {
              x: K + U[J] / 2,
              y: V + 10,
              textAnchor: "middle",
              fill: ge.textMuted,
              fontSize: 9,
              fontFamily: "monospace",
              children: G
            },
            J
          );
        }),
        /* @__PURE__ */ e.jsx(
          "line",
          {
            x1: E,
            y1: V + 14,
            x2: E + ee,
            y2: V + 14,
            stroke: ge.gridLine,
            strokeWidth: 1
          }
        ),
        B.map((G, J) => {
          const K = V + 18 + J * O, ue = 0.15 + J / L * 0.6, Q = G.ret >= 0 ? "#21b3a4" : "#f0426c", ne = [
            G.time,
            G.o.toFixed(2),
            G.h.toFixed(2),
            G.l.toFixed(2),
            G.c.toFixed(2),
            String(G.vol),
            `${G.ret >= 0 ? "+" : ""}${G.ret.toFixed(3)}`
          ];
          return /* @__PURE__ */ e.jsxs("g", { opacity: ue, children: [
            J % 2 === 0 && /* @__PURE__ */ e.jsx(
              "rect",
              {
                x: E - 4,
                y: K - 9,
                width: ee + 8,
                height: O,
                fill: "#e8e8e8",
                fillOpacity: 0.01,
                rx: 2
              }
            ),
            ne.map((H, me) => {
              let be = E;
              for (let Se = 0; Se < me; Se++) be += U[Se];
              const Re = me === 6 ? Q : ge.textDim;
              return /* @__PURE__ */ e.jsx(
                "text",
                {
                  x: be + U[me] / 2,
                  y: K,
                  textAnchor: "middle",
                  fill: Re,
                  fontSize: 10,
                  fontFamily: "monospace",
                  children: H
                },
                me
              );
            })
          ] }, J);
        }),
        /* @__PURE__ */ e.jsx(
          "rect",
          {
            x: E - 10,
            y: W - 20,
            width: ee + 20,
            height: 20,
            fill: "url(#feedFade)"
          }
        ),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsxs("linearGradient", { id: "feedFade", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ e.jsx("stop", { offset: "0%", stopColor: "#1c1c1c", stopOpacity: "0" }),
          /* @__PURE__ */ e.jsx("stop", { offset: "100%", stopColor: "#1c1c1c", stopOpacity: "1" })
        ] }) })
      ] });
    })(),
    /* @__PURE__ */ e.jsx(
      "text",
      {
        x: P,
        y: h - 45,
        textAnchor: "middle",
        fill: ge.textMuted,
        fontSize: 11,
        fontFamily: "monospace",
        letterSpacing: "2",
        children: "OBSERVED EMISSIONS"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "line",
      {
        x1: P - 70,
        y1: h - 38,
        x2: P + 70,
        y2: h - 38,
        stroke: ge.gridLine,
        strokeWidth: 1
      }
    ),
    $.map((V, W) => {
      const te = W === N;
      return /* @__PURE__ */ e.jsxs("g", { children: [
        /* @__PURE__ */ e.jsx(
          "line",
          {
            x1: V.x,
            y1: V.y + f + 35,
            x2: V.x,
            y2: h - 50,
            stroke: ge.regimes[W].color,
            strokeWidth: te ? 1.5 : 0.5,
            strokeDasharray: "5 4",
            opacity: te ? 0.6 : 0.1
          }
        ),
        te && /* @__PURE__ */ e.jsxs(
          "text",
          {
            x: V.x + 12,
            y: (V.y + f + 35 + h - 50) / 2,
            fill: ge.regimes[W].color,
            fontSize: 10,
            fontFamily: "monospace",
            opacity: 0.6,
            children: [
              "b_",
              W + 1,
              "(o_t)"
            ]
          }
        )
      ] }, `emit-${W}`);
    }),
    /* @__PURE__ */ e.jsxs(
      "text",
      {
        x: M,
        y: h - 6,
        fill: ge.textDim,
        fontSize: 10,
        fontFamily: "monospace",
        children: [
          "Recent observations (t=",
          S + 1,
          " to ",
          r + 1,
          ")"
        ]
      }
    ),
    Array.from({ length: F }).map((V, W) => {
      const te = S + W, O = n[te], L = d[te] ?? 0, D = ge.regimes[O % ge.regimes.length], X = te === r, B = Math.min(y, Math.abs(L) * y * 0.5 + 2), g = L >= 0;
      return /* @__PURE__ */ e.jsxs("g", { children: [
        /* @__PURE__ */ e.jsx(
          "rect",
          {
            x: M + W * Y,
            y: h,
            width: Y - 0.5,
            height: y,
            fill: D.color,
            fillOpacity: X ? 0.3 : 0.1,
            stroke: X ? D.color : "none",
            strokeWidth: X ? 1.5 : 0,
            rx: 1
          }
        ),
        /* @__PURE__ */ e.jsx(
          "rect",
          {
            x: M + W * Y + 1,
            y: g ? h + y / 2 - B : h + y / 2,
            width: Math.max(1, Y - 2.5),
            height: B,
            fill: g ? "#21b3a4" : "#f0426c",
            fillOpacity: 0.5,
            rx: 0.5
          }
        )
      ] }, W);
    }),
    /* @__PURE__ */ e.jsx(
      "line",
      {
        x1: M,
        y1: h + y / 2,
        x2: M + w,
        y2: h + y / 2,
        stroke: ge.textMuted,
        strokeWidth: 0.5
      }
    ),
    (() => {
      const V = h + y + 25, W = Math.min(t - 80, 700), te = P - W / 2, O = [
        { label: "Step", value: `${r + 1}` },
        { label: "Current State", value: `S${N + 1} (${ge.regimes[N].name})`, color: ge.regimes[N].color },
        { label: "Return", value: `${I >= 0 ? "+" : ""}${I.toFixed(3)}%` },
        { label: "Transitions", value: `${z}` },
        { label: "Accuracy", value: `${T.toFixed(1)}%` }
      ], L = W / O.length;
      return /* @__PURE__ */ e.jsxs("g", { children: [
        /* @__PURE__ */ e.jsx(
          "rect",
          {
            x: te,
            y: V,
            width: W,
            height: 40,
            rx: 6,
            fill: "#2a2a2a",
            stroke: ge.gridLine,
            strokeWidth: 1
          }
        ),
        O.map((D, X) => /* @__PURE__ */ e.jsxs("g", { transform: `translate(${te + X * L + L / 2}, ${V})`, children: [
          /* @__PURE__ */ e.jsx(
            "text",
            {
              y: 14,
              textAnchor: "middle",
              fill: ge.textMuted,
              fontSize: 9,
              fontFamily: "monospace",
              children: D.label
            }
          ),
          /* @__PURE__ */ e.jsx(
            "text",
            {
              y: 30,
              textAnchor: "middle",
              fill: D.color || ge.text,
              fontSize: 12,
              fontFamily: "monospace",
              fontWeight: "bold",
              children: D.value
            }
          ),
          X < O.length - 1 && /* @__PURE__ */ e.jsx(
            "line",
            {
              x1: L / 2,
              y1: 6,
              x2: L / 2,
              y2: 34,
              stroke: ge.gridLine,
              strokeWidth: 1
            }
          )
        ] }, X))
      ] });
    })()
  ] });
}
function ko(t, s, n) {
  return (o, r, i) => {
    if (i < 5e-3) return null;
    const l = t[o], c = t[r], d = o === n;
    if (o === r) {
      const F = s * 0.7, S = l.y - s - F * 0.8, h = ge.regimes[o];
      return /* @__PURE__ */ e.jsxs("g", { children: [
        /* @__PURE__ */ e.jsx(
          "path",
          {
            d: `M ${l.x - s * 0.5} ${l.y - s * 0.85}
                A ${F} ${F} 0 1 1 ${l.x + s * 0.5} ${l.y - s * 0.85}`,
            fill: "none",
            stroke: h.color,
            strokeWidth: Math.max(1, i * 3),
            opacity: d ? 0.9 : 0.4,
            markerEnd: `url(#arrow-${o})`
          }
        ),
        /* @__PURE__ */ e.jsxs(
          "text",
          {
            x: l.x,
            y: S - 4,
            textAnchor: "middle",
            fill: h.color,
            fontSize: 13,
            fontFamily: "monospace",
            fontWeight: "bold",
            opacity: d ? 1 : 0.5,
            children: [
              (i * 100).toFixed(1),
              "%"
            ]
          }
        )
      ] }, `${o}-${r}`);
    }
    const x = c.x - l.x, p = c.y - l.y, C = Math.sqrt(x * x + p * p), m = x / C, j = p / C, u = l.x + m * s, N = l.y + j * s, b = c.x - m * (s + 6), P = c.y - j * (s + 6), k = 25 + Math.abs(o - r) * 15, v = o < r ? 1 : -1, $ = -j * k * v, A = m * k * v, z = (u + b) / 2 + $, R = (N + P) / 2 + A, T = ge.regimes[o].color, I = i >= 5e-3;
    return /* @__PURE__ */ e.jsxs("g", { children: [
      /* @__PURE__ */ e.jsx(
        "path",
        {
          d: `M ${u} ${N} Q ${z} ${R} ${b} ${P}`,
          fill: "none",
          stroke: T,
          strokeWidth: Math.max(0.5, i * 5),
          opacity: d ? 0.8 : 0.2
        }
      ),
      /* @__PURE__ */ e.jsx(
        "polygon",
        {
          points: `${c.x - m * s},${c.y - j * s}
                   ${c.x - m * (s + 10) - j * 4},${c.y - j * (s + 10) + m * 4}
                   ${c.x - m * (s + 10) + j * 4},${c.y - j * (s + 10) - m * 4}`,
          fill: T,
          opacity: d ? 0.8 : 0.2
        }
      ),
      I && /* @__PURE__ */ e.jsxs(
        "text",
        {
          x: z,
          y: R - 5,
          textAnchor: "middle",
          fill: T,
          fontSize: 11,
          fontFamily: "monospace",
          opacity: d ? 1 : 0.35,
          children: [
            (i * 100).toFixed(1),
            "%"
          ]
        }
      )
    ] }, `${o}-${r}`);
  };
}
function Ao({
  width: t,
  height: s,
  prices: n,
  viterbiPath: o,
  numStates: r,
  currentStep: i
}) {
  const l = o[i] ?? 0, c = { top: 50, right: 30, bottom: 50, left: 70 }, d = t - c.left - c.right, x = s - c.top - c.bottom, p = i + 2, C = n.slice(0, p), m = Math.min(...C), j = Math.max(...C), u = (j - m) * 0.08 || 1, N = m - u, b = j + u, P = (A) => c.left + A / Math.max(1, p - 1) * d, f = (A) => c.top + (1 - (A - N) / (b - N)) * x, k = [];
  if (o.length > 0) {
    let A = 0, z = o[0];
    for (let R = 1; R <= i; R++)
      (o[R] !== z || R === i) && (k.push({ state: z, start: A, end: R }), A = R, z = o[R]);
    A <= i && k.push({ state: o[i], start: A, end: i + 1 });
  }
  const v = 6, $ = Array.from({ length: v + 1 }, (A, z) => N + z / v * (b - N));
  return /* @__PURE__ */ e.jsxs("g", { children: [
    /* @__PURE__ */ e.jsx("text", { x: t / 2, y: 20, textAnchor: "middle", fill: ge.text, fontSize: 14, fontFamily: "monospace", fontWeight: "bold", children: "Regime Detection" }),
    /* @__PURE__ */ e.jsx("g", { transform: `translate(${c.left + 10}, ${c.top - 12})`, children: Array.from({ length: r }).map((A, z) => /* @__PURE__ */ e.jsxs("g", { transform: `translate(${z * 100}, 0)`, children: [
      /* @__PURE__ */ e.jsx("rect", { width: 12, height: 12, fill: ge.regimes[z].color, fillOpacity: 0.6, rx: 2 }),
      /* @__PURE__ */ e.jsx("text", { x: 16, y: 10, fill: ge.regimes[z].color, fontSize: 11, fontFamily: "monospace", children: ge.regimes[z].name })
    ] }, z)) }),
    $.map((A, z) => /* @__PURE__ */ e.jsxs("g", { children: [
      /* @__PURE__ */ e.jsx(
        "line",
        {
          x1: c.left,
          y1: f(A),
          x2: c.left + d,
          y2: f(A),
          stroke: ge.gridLine,
          strokeWidth: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        "text",
        {
          x: c.left - 8,
          y: f(A) + 4,
          textAnchor: "end",
          fill: ge.textDim,
          fontSize: 11,
          fontFamily: "monospace",
          children: A.toFixed(1)
        }
      )
    ] }, z)),
    k.map((A, z) => {
      const R = ge.regimes[A.state % ge.regimes.length], T = P(A.start), I = P(Math.min(A.end, p - 1));
      return /* @__PURE__ */ e.jsxs("g", { children: [
        /* @__PURE__ */ e.jsx(
          "rect",
          {
            x: T,
            y: c.top,
            width: Math.max(1, I - T),
            height: x,
            fill: R.color,
            fillOpacity: 0.1
          }
        ),
        I - T > 50 && /* @__PURE__ */ e.jsx(
          "text",
          {
            x: (T + I) / 2,
            y: c.top + 16,
            textAnchor: "middle",
            fill: R.color,
            fontSize: 11,
            fontFamily: "monospace",
            fontWeight: "600",
            children: R.name
          }
        )
      ] }, z);
    }),
    p > 1 && /* @__PURE__ */ e.jsx(
      "polyline",
      {
        points: C.map((A, z) => `${P(z)},${f(A)}`).join(" "),
        fill: "none",
        stroke: ge.text,
        strokeWidth: 1.5,
        opacity: 0.85
      }
    ),
    p > 0 && /* @__PURE__ */ e.jsx(
      "circle",
      {
        cx: P(p - 1),
        cy: f(C[p - 1]),
        r: 4,
        fill: ge.regimes[l].color,
        stroke: ge.bg,
        strokeWidth: 1.5
      }
    ),
    /* @__PURE__ */ e.jsx(
      "text",
      {
        x: c.left - 50,
        y: c.top + x / 2,
        textAnchor: "middle",
        fill: ge.textDim,
        fontSize: 12,
        fontFamily: "monospace",
        transform: `rotate(-90, ${c.left - 50}, ${c.top + x / 2})`,
        children: "Price ($)"
      }
    ),
    /* @__PURE__ */ e.jsx("text", { x: t / 2, y: s - 8, textAnchor: "middle", fill: ge.textDim, fontSize: 12, fontFamily: "monospace", children: "Time (steps)" })
  ] });
}
function Ro({
  width: t,
  height: s,
  transMatrix: n,
  numStates: o,
  viterbiPath: r,
  currentStep: i
}) {
  const l = t / 2, c = s / 2, x = Math.min(120, (Math.min(t, s) - 200) / o), p = x * o, C = x * o, m = l - p / 2, j = c - C / 2 + 10, u = Array.from(
    { length: o },
    () => new Array(o).fill(0)
  );
  let N = 0;
  for (let k = 1; k <= i; k++)
    r[k - 1] !== void 0 && r[k] !== void 0 && (u[r[k - 1]][r[k]]++, r[k] !== r[k - 1] && N++);
  const b = u.map((k) => {
    const v = k.reduce(($, A) => $ + A, 0) || 1;
    return k.map(($) => $ / v);
  }), P = r[i] ?? 0, f = i > 0 ? r[i - 1] ?? 0 : P;
  return /* @__PURE__ */ e.jsxs("g", { children: [
    /* @__PURE__ */ e.jsx("text", { x: l, y: 24, textAnchor: "middle", fill: ge.text, fontSize: 15, fontFamily: "monospace", fontWeight: "bold", children: "Transition Matrix" }),
    /* @__PURE__ */ e.jsx("text", { x: l, y: 44, textAnchor: "middle", fill: ge.textDim, fontSize: 11, fontFamily: "monospace", children: "Observed frequencies update live. Model probability shown below." }),
    /* @__PURE__ */ e.jsx("text", { x: l, y: j - 30, textAnchor: "middle", fill: ge.textMuted, fontSize: 10, fontFamily: "monospace", letterSpacing: "2", children: "TO STATE" }),
    Array.from({ length: o }).map((k, v) => /* @__PURE__ */ e.jsx(
      "text",
      {
        x: m + v * x + x / 2,
        y: j - 12,
        textAnchor: "middle",
        fill: ge.regimes[v].color,
        fontSize: 11,
        fontFamily: "monospace",
        fontWeight: "600",
        children: ge.regimes[v].name
      },
      v
    )),
    /* @__PURE__ */ e.jsx(
      "text",
      {
        x: m - 55,
        y: c + 10,
        textAnchor: "middle",
        fill: ge.textMuted,
        fontSize: 10,
        fontFamily: "monospace",
        letterSpacing: "2",
        transform: `rotate(-90, ${m - 55}, ${c + 10})`,
        children: "FROM STATE"
      }
    ),
    Array.from({ length: o }).map((k, v) => {
      const $ = ge.regimes[v], A = v === P;
      return /* @__PURE__ */ e.jsxs("g", { children: [
        /* @__PURE__ */ e.jsx(
          "text",
          {
            x: m - 12,
            y: j + v * x + x / 2 + 4,
            textAnchor: "end",
            fill: $.color,
            fontSize: 11,
            fontFamily: "monospace",
            fontWeight: A ? "bold" : "normal",
            children: $.name
          }
        ),
        A && /* @__PURE__ */ e.jsx(
          "rect",
          {
            x: m - 3,
            y: j + v * x - 3,
            width: p + 6,
            height: x + 6,
            fill: "none",
            stroke: $.color,
            strokeWidth: 2,
            strokeOpacity: 0.4,
            rx: 6
          }
        ),
        Array.from({ length: o }).map((z, R) => {
          const T = n[v][R], I = b[v][R], F = u[v][R], S = v === R ? $.color : ge.regimes[R].color, h = v === f && R === P, y = I * 0.5 + 0.03;
          return /* @__PURE__ */ e.jsxs("g", { children: [
            /* @__PURE__ */ e.jsx(
              "rect",
              {
                x: m + R * x + 2,
                y: j + v * x + 2,
                width: x - 4,
                height: x - 4,
                fill: S,
                fillOpacity: y,
                stroke: h ? ge.text : ge.gridLine,
                strokeWidth: h ? 2 : 1,
                rx: 4
              }
            ),
            h && /* @__PURE__ */ e.jsx(
              "rect",
              {
                x: m + R * x + 2,
                y: j + v * x + 2,
                width: x - 4,
                height: x - 4,
                fill: "#e8e8e8",
                fillOpacity: 0.08,
                rx: 4
              }
            ),
            /* @__PURE__ */ e.jsxs(
              "text",
              {
                x: m + R * x + x / 2,
                y: j + v * x + x / 2 - 10,
                textAnchor: "middle",
                fill: ge.text,
                fontSize: 16,
                fontFamily: "monospace",
                fontWeight: "bold",
                children: [
                  (I * 100).toFixed(1),
                  "%"
                ]
              }
            ),
            /* @__PURE__ */ e.jsxs(
              "text",
              {
                x: m + R * x + x / 2,
                y: j + v * x + x / 2 + 6,
                textAnchor: "middle",
                fill: ge.textDim,
                fontSize: 10,
                fontFamily: "monospace",
                children: [
                  "n=",
                  F
                ]
              }
            ),
            /* @__PURE__ */ e.jsxs(
              "text",
              {
                x: m + R * x + x / 2,
                y: j + v * x + x / 2 + 20,
                textAnchor: "middle",
                fill: ge.textMuted,
                fontSize: 9,
                fontFamily: "monospace",
                children: [
                  "model: ",
                  (T * 100).toFixed(1),
                  "%"
                ]
              }
            )
          ] }, R);
        })
      ] }, v);
    }),
    /* @__PURE__ */ e.jsxs(
      "text",
      {
        x: l,
        y: j + C + 25,
        textAnchor: "middle",
        fill: ge.regimes[P].color,
        fontSize: 12,
        fontFamily: "monospace",
        fontWeight: "bold",
        children: [
          "Current: ",
          ge.regimes[P].name,
          " (step ",
          i + 1,
          ")"
        ]
      }
    ),
    /* @__PURE__ */ e.jsxs(
      "text",
      {
        x: l,
        y: j + C + 42,
        textAnchor: "middle",
        fill: ge.textDim,
        fontSize: 11,
        fontFamily: "monospace",
        children: [
          N,
          " regime changes observed across ",
          i + 1,
          " steps"
        ]
      }
    )
  ] });
}
function Fo() {
  const [t, s] = a.useState(3), [n, o] = a.useState(0.95), [r, i] = a.useState(1e4), [l, c] = a.useState(42), [d, x] = a.useState(30), [p, C] = a.useState(On.map((E) => ({ ...E }))), [m, j] = a.useState({}), [u, N] = a.useState(null), [b, P] = a.useState("diagram"), [f, k] = a.useState("regimes"), [v, $] = a.useState(!1), [A, z] = a.useState(r - 1), [R, T] = a.useState(!1), [I, F] = a.useState(!1), [S, h] = a.useState(1), [y, w] = a.useState({ x: 0, y: 0 }), [M, Y] = a.useState(!1), _ = a.useRef({ x: 0, y: 0, panX: 0, panY: 0 }), se = a.useRef(null), V = a.useRef(null), [W, te] = a.useState({ width: 800, height: 500 });
  a.useEffect(() => {
    const E = () => {
      if (V.current) {
        const G = V.current.getBoundingClientRect();
        te({ width: G.width, height: G.height });
      }
    };
    return E(), window.addEventListener("resize", E), () => window.removeEventListener("resize", E);
  }, []), a.useEffect(() => {
    h(1), w({ x: 0, y: 0 });
  }, [f]);
  const O = a.useRef(S);
  O.current = S, a.useEffect(() => {
    const E = se.current;
    if (!E) return;
    function G(J) {
      J.preventDefault(), J.stopPropagation();
      const K = E.getBoundingClientRect(), ue = J.clientX - K.left, ce = J.clientY - K.top, Q = J.deltaY > 0 ? 0.9 : 1.1, ne = O.current, H = Math.max(0.1, Math.min(5, ne * Q)), me = H / ne;
      w((be) => ({
        x: ue - (ue - be.x) * me,
        y: ce - (ce - be.y) * me
      })), h(H);
    }
    return E.addEventListener("wheel", G, { passive: !1 }), () => E.removeEventListener("wheel", G);
  }, []);
  const L = a.useCallback((E) => {
    E.button === 0 && (E.preventDefault(), Y(!0), _.current = { x: E.clientX, y: E.clientY, panX: y.x, panY: y.y });
  }, [y]);
  a.useEffect(() => {
    if (!M) return;
    function E(J) {
      w({
        x: _.current.panX + (J.clientX - _.current.x),
        y: _.current.panY + (J.clientY - _.current.y)
      });
    }
    function G() {
      Y(!1);
    }
    return window.addEventListener("mousemove", E), window.addEventListener("mouseup", G), () => {
      window.removeEventListener("mousemove", E), window.removeEventListener("mouseup", G);
    };
  }, [M]);
  const D = a.useCallback(() => {
    h(1), w({ x: 0, y: 0 });
  }, []), X = a.useMemo(
    () => wo(r, t, n, p, l),
    [r, t, n, p, l]
  ), B = a.useMemo(
    () => So(X.returns, t, X.transMatrix, p),
    [X, t, p]
  ), g = a.useMemo(
    () => Mo(X.returns, t, X.transMatrix, p),
    [X, t, p]
  );
  a.useEffect(() => {
    if (!v) return;
    const E = setInterval(() => {
      z((G) => G >= r - 1 ? ($(!1), G) : G + 1);
    }, d);
    return () => clearInterval(E);
  }, [v, r, d]);
  const oe = a.useCallback(() => {
    z(r - 1), $(!1), h(1), w({ x: 0, y: 0 });
  }, [r]), re = a.useCallback(() => {
    z((E) => Math.min(E + 1, r - 1));
  }, [r]), U = a.useCallback((E, G, J) => {
    C((K) => {
      const ue = K.map((ce) => ({ ...ce }));
      return ue[E][G] = J, ue;
    });
  }, []), ee = a.useMemo(() => {
    const E = g.path[A] ?? 0, G = B[A] || [], J = new Array(t).fill(0), K = { total: 0 };
    for (let Q = 0; Q <= A; Q++)
      J[g.path[Q]]++, Q > 0 && g.path[Q] !== g.path[Q - 1] && K.total++;
    const ue = A > 0 ? (A + 1) / (K.total + 1) : 0;
    let ce = 0;
    for (let Q = 0; Q <= A; Q++)
      g.path[Q] === X.trueStates[Q] && ce++;
    return {
      currentState: E,
      currentRegime: ge.regimes[E],
      currentProbs: G,
      regimeCounts: J,
      transitions: K.total,
      avgDuration: ue.toFixed(1),
      accuracy: A > 0 ? (ce / (A + 1) * 100).toFixed(1) : "0.0",
      currentReturn: X.returns[A]?.toFixed(3) ?? "0",
      currentPrice: X.prices[A + 1]?.toFixed(2) ?? "0",
      confidence: ((g.confidence[A] ?? 0) * 100).toFixed(0)
    };
  }, [g, B, A, t, X]);
  return /* @__PURE__ */ e.jsxs("div", { className: "relative w-full h-[calc(100vh-180px)] min-h-[600px] bg-[#1c1c1c] rounded-lg overflow-hidden border border-border", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10", children: [
      /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-3 pointer-events-auto", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-card text-[#e8e8e8] rounded-lg px-4 py-2 border border-border flex items-center gap-2", children: [
        /* @__PURE__ */ e.jsx("span", { className: "font-semibold text-[#e8e8e8]", children: "HMM" }),
        /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
          /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4 text-[#b0b0b0] cursor-help" }) }),
          /* @__PURE__ */ e.jsx(xt, { className: "max-w-sm", children: /* @__PURE__ */ e.jsx("p", { className: "text-sm", children: "Interactive HMM regime detection. The model infers hidden market states (bull/bear/sideways) from observed returns using the Forward and Viterbi algorithms." }) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-1 pointer-events-auto", children: [
        /* @__PURE__ */ e.jsx(
          le,
          {
            variant: b === "diagram" ? "default" : "outline",
            size: "sm",
            onClick: () => P("diagram"),
            className: b === "diagram" ? "" : "bg-card text-[#e8e8e8]",
            children: "State Diagram"
          }
        ),
        /* @__PURE__ */ e.jsx(
          le,
          {
            variant: b === "regimes" ? "default" : "outline",
            size: "sm",
            onClick: () => P("regimes"),
            className: b === "regimes" ? "" : "bg-card text-[#e8e8e8]",
            children: "Regime Chart"
          }
        ),
        /* @__PURE__ */ e.jsx(
          le,
          {
            variant: b === "matrix" ? "default" : "outline",
            size: "sm",
            onClick: () => P("matrix"),
            className: b === "matrix" ? "" : "bg-card text-[#e8e8e8]",
            children: "Transition Matrix"
          }
        )
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 pointer-events-auto", children: [
        /* @__PURE__ */ e.jsxs(
          le,
          {
            variant: v ? "default" : "outline",
            size: "sm",
            onClick: () => {
              v ? $(!1) : (A >= r - 1 && z(0), $(!0));
            },
            className: v ? "" : "bg-card text-[#e8e8e8]",
            children: [
              v ? /* @__PURE__ */ e.jsx(os, { className: "h-4 w-4 mr-1" }) : /* @__PURE__ */ e.jsx(Bt, { className: "h-4 w-4 mr-1" }),
              v ? "Pause" : "Play"
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(
          le,
          {
            variant: "outline",
            size: "sm",
            onClick: re,
            className: "bg-card text-[#e8e8e8]",
            disabled: A >= r - 1,
            children: /* @__PURE__ */ e.jsx(ua, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          le,
          {
            variant: "outline",
            size: "sm",
            onClick: oe,
            className: "bg-card text-[#e8e8e8]",
            children: /* @__PURE__ */ e.jsx(jt, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ e.jsxs(
          le,
          {
            variant: "outline",
            size: "sm",
            onClick: () => {
              c((E) => (E + 1) % 1e3), oe();
            },
            className: "bg-card text-[#e8e8e8] gap-1",
            children: [
              /* @__PURE__ */ e.jsx(Ha, { className: "h-4 w-4" }),
              /* @__PURE__ */ e.jsx("span", { className: "hidden md:inline", children: "Shock" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute left-4 top-20 w-64 space-y-2 pointer-events-auto z-10 max-h-[calc(100%-120px)] overflow-y-auto", children: /* @__PURE__ */ e.jsxs($e, { open: R, onOpenChange: T, children: [
      /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[#e8e8e8]", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e.jsx(vt, { className: "h-4 w-4" }),
          "Model Config"
        ] }),
        R ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
      ] }) }),
      /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card text-[#e8e8e8] border-border space-y-4", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "States" }),
            /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[#e8e8e8]", children: t })
          ] }),
          /* @__PURE__ */ e.jsx(
            xe,
            {
              value: [t],
              onValueChange: ([E]) => {
                s(E), oe();
              },
              min: 2,
              max: 6,
              step: 1
            }
          )
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Stickiness" }),
            /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[#e8e8e8]", children: n.toFixed(2) })
          ] }),
          /* @__PURE__ */ e.jsx(
            xe,
            {
              value: [n],
              onValueChange: ([E]) => {
                o(E), oe();
              },
              min: 0.5,
              max: 0.99,
              step: 0.01
            }
          )
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Sequence Length" }),
            /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[#e8e8e8]", children: r })
          ] }),
          /* @__PURE__ */ e.jsx(
            xe,
            {
              value: [r],
              onValueChange: ([E]) => {
                i(E), oe();
              },
              min: 50,
              max: 1e4,
              step: 50
            }
          )
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Speed" }),
            /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[#e8e8e8]", children: d <= 10 ? "Max" : d <= 30 ? "Fast" : d <= 80 ? "Normal" : "Slow" })
          ] }),
          /* @__PURE__ */ e.jsx(
            xe,
            {
              value: [d],
              onValueChange: ([E]) => x(E),
              min: 5,
              max: 200,
              step: 5
            }
          )
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Seed" }),
            /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[#e8e8e8]", children: l })
          ] }),
          /* @__PURE__ */ e.jsx(
            xe,
            {
              value: [l],
              onValueChange: ([E]) => {
                c(E), oe();
              },
              min: 0,
              max: 999,
              step: 1
            }
          )
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "space-y-2 pt-2 border-t border-border", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Timestep" }),
            /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-medium text-[#e8e8e8]", children: [
              A + 1,
              " / ",
              r
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(
            xe,
            {
              value: [A],
              onValueChange: ([E]) => z(E),
              min: 0,
              max: r - 1,
              step: 1
            }
          )
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "pt-2 border-t border-border space-y-3", children: [
          /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Regime Parameters" }),
          Array.from({ length: t }).map((E, G) => {
            const J = ge.regimes[G];
            return /* @__PURE__ */ e.jsxs("div", { className: "space-y-2 pl-2 border-l-2", style: { borderColor: J.color }, children: [
              /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium", style: { color: J.color }, children: J.name }),
              /* @__PURE__ */ e.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ e.jsx(q, { className: "text-2xs text-[#808080]", children: "Mean Return" }),
                  /* @__PURE__ */ e.jsxs("span", { className: "text-2xs font-mono text-[#b0b0b0]", children: [
                    p[G].meanReturn.toFixed(2),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ e.jsx(
                  xe,
                  {
                    value: [p[G].meanReturn],
                    onValueChange: ([K]) => U(G, "meanReturn", K),
                    min: -0.5,
                    max: 0.5,
                    step: 0.02
                  }
                )
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ e.jsx(q, { className: "text-2xs text-[#808080]", children: "Volatility" }),
                  /* @__PURE__ */ e.jsxs("span", { className: "text-2xs font-mono text-[#b0b0b0]", children: [
                    p[G].volatility.toFixed(1),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ e.jsx(
                  xe,
                  {
                    value: [p[G].volatility],
                    onValueChange: ([K]) => U(G, "volatility", K),
                    min: 0.1,
                    max: 5,
                    step: 0.1
                  }
                )
              ] })
            ] }, G);
          })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute right-4 top-20 w-56 pointer-events-auto z-10", children: /* @__PURE__ */ e.jsxs($e, { open: I, onOpenChange: F, children: [
      /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[#e8e8e8]", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4" }),
          "Model Stats"
        ] }),
        I ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
      ] }) }),
      /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-3 bg-card text-[#e8e8e8] border-border space-y-3", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[#b0b0b0]", children: "Regime" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm font-bold", style: { color: ee.currentRegime.color }, children: ee.currentRegime.name })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[#b0b0b0]", children: "Accuracy" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-mono text-[#e8e8e8]", children: [
            ee.accuracy,
            "%"
          ] })
        ] }),
        ee.currentProbs.map((E, G) => /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs", style: { color: ge.regimes[G].color }, children: ge.regimes[G].name }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx("div", { className: "w-16 h-2 rounded-full", style: { background: ge.gridLine }, children: /* @__PURE__ */ e.jsx("div", { className: "h-2 rounded-full", style: {
              width: `${E * 100}%`,
              background: ge.regimes[G].color,
              opacity: 0.6
            } }) }),
            /* @__PURE__ */ e.jsxs("span", { className: "text-2xs font-mono", style: { color: ge.regimes[G].color }, children: [
              (E * 100).toFixed(0),
              "%"
            ] })
          ] })
        ] }, G))
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx("div", { ref: V, className: "absolute inset-0 top-16 bottom-0 left-0 right-0", children: /* @__PURE__ */ e.jsxs(
      "svg",
      {
        ref: se,
        width: W.width,
        height: W.height,
        viewBox: `0 0 ${W.width} ${W.height}`,
        className: "w-full h-full",
        style: {
          background: "var(--bg, #1c1c1c)",
          cursor: M ? "grabbing" : "grab"
        },
        onMouseDown: L,
        onDoubleClick: D,
        children: [
          /* @__PURE__ */ e.jsxs("g", { transform: `translate(${y.x},${y.y}) scale(${S})`, children: [
            b === "diagram" && /* @__PURE__ */ e.jsx(
              Co,
              {
                width: W.width,
                height: W.height,
                viterbiPath: g.path,
                numStates: t,
                currentStep: A,
                transMatrix: X.transMatrix,
                regimes: p,
                alpha: B,
                returns: X.returns,
                trueStates: X.trueStates,
                seed: l,
                customNames: m,
                selectedRegime: u,
                onStateClick: (E) => N((G) => G === E ? null : E)
              }
            ),
            b === "regimes" && /* @__PURE__ */ e.jsx(
              Ao,
              {
                width: W.width,
                height: W.height,
                prices: X.prices,
                viterbiPath: g.path,
                numStates: t,
                currentStep: A
              }
            ),
            b === "matrix" && /* @__PURE__ */ e.jsx(
              Ro,
              {
                width: W.width,
                height: W.height,
                transMatrix: X.transMatrix,
                numStates: t,
                viterbiPath: g.path,
                currentStep: A
              }
            )
          ] }),
          S !== 1 && /* @__PURE__ */ e.jsxs("g", { transform: `translate(${W.width - 120}, 12)`, children: [
            /* @__PURE__ */ e.jsx("rect", { width: 100, height: 22, rx: 4, fill: "#2a2a2a", stroke: ge.gridLine }),
            /* @__PURE__ */ e.jsxs("text", { x: 50, y: 15, textAnchor: "middle", fill: ge.textDim, fontSize: 10, fontFamily: "monospace", children: [
              "zoom: ",
              (S * 100).toFixed(0),
              "%"
            ] })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto z-10 w-[min(900px,calc(100%-48px))]", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-card text-[#e8e8e8] rounded-lg px-4 py-3 border border-border space-y-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between text-xs font-mono", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-[#b0b0b0]", children: "t" }),
          /* @__PURE__ */ e.jsx("span", { className: "font-bold text-[#e8e8e8]", children: A + 1 }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-[#808080]", children: [
            "/ ",
            r
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-[#b0b0b0]", children: "REGIME" }),
          /* @__PURE__ */ e.jsxs("span", { className: "font-bold", style: { color: ee.currentRegime.color }, children: [
            "S",
            ee.currentState + 1,
            ": ",
            m[ee.currentState] && m[ee.currentState].trim() || ee.currentRegime.name
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-[#b0b0b0]", children: "RET" }),
          /* @__PURE__ */ e.jsxs("span", { className: `font-mono ${parseFloat(ee.currentReturn) >= 0 ? "text-[#21b3a4]" : "text-[#f0426c]"}`, children: [
            parseFloat(ee.currentReturn) >= 0 ? "+" : "",
            ee.currentReturn,
            "%"
          ] }),
          /* @__PURE__ */ e.jsx("span", { className: "text-[#808080]", children: "|" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-[#b0b0b0]", children: "CONF" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-[#b0b0b0]", children: [
            ee.confidence,
            "%"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e.jsx(
        xe,
        {
          value: [A],
          onValueChange: ([E]) => {
            v && $(!1), z(E);
          },
          min: 0,
          max: Math.max(0, r - 1),
          step: 1
        }
      ),
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between text-2xs font-mono text-[#808080]", children: [
        /* @__PURE__ */ e.jsx("span", { children: "drag slider to scrub · drag canvas to pan · scroll to zoom · dbl-click canvas to reset view" }),
        /* @__PURE__ */ e.jsx("span", { children: "click a state to edit it" })
      ] })
    ] }) }),
    u !== null && u < t && /* @__PURE__ */ e.jsx("div", { className: "absolute top-20 left-1/2 -translate-x-1/2 w-80 pointer-events-auto z-20", children: /* @__PURE__ */ e.jsxs(
      Fe,
      {
        className: "p-4 bg-card text-[#e8e8e8] border-border space-y-3",
        style: { borderColor: ge.regimes[u].color, borderWidth: 2 },
        children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ e.jsx("div", { className: "w-3 h-3 rounded-full", style: { backgroundColor: ge.regimes[u].color } }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-mono text-[#b0b0b0]", children: [
                "EDIT STATE S",
                u + 1
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(
              le,
              {
                variant: "ghost",
                size: "sm",
                className: "h-6 w-6 p-0 text-[#b0b0b0] hover:text-[#e8e8e8]",
                onClick: () => N(null),
                children: /* @__PURE__ */ e.jsx(Mn, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Name" }),
            /* @__PURE__ */ e.jsx(
              "input",
              {
                type: "text",
                className: "w-full bg-[#262626] border border-border rounded px-2 py-1 text-sm font-mono text-[#e8e8e8] focus:outline-none focus:ring-1",
                style: { borderColor: ge.regimes[u].color },
                value: m[u] ?? ge.regimes[u].name,
                onChange: (E) => j((G) => ({ ...G, [u]: E.target.value })),
                placeholder: ge.regimes[u].name,
                maxLength: 20
              }
            )
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Mean return" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-mono", style: { color: ge.regimes[u].color }, children: [
                p[u].meanReturn >= 0 ? "+" : "",
                p[u].meanReturn.toFixed(2),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(
              xe,
              {
                value: [p[u].meanReturn],
                onValueChange: ([E]) => U(u, "meanReturn", E),
                min: -0.5,
                max: 0.5,
                step: 0.02
              }
            )
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[#b0b0b0]", children: "Volatility" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-mono", style: { color: ge.regimes[u].color }, children: [
                p[u].volatility.toFixed(1),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(
              xe,
              {
                value: [p[u].volatility],
                onValueChange: ([E]) => U(u, "volatility", E),
                min: 0.1,
                max: 5,
                step: 0.1
              }
            )
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 pt-2 border-t border-border", children: [
            /* @__PURE__ */ e.jsx(
              le,
              {
                variant: "outline",
                size: "sm",
                className: "flex-1 text-xs text-[#e8e8e8]",
                onClick: () => {
                  j((G) => {
                    const J = { ...G };
                    return delete J[u], J;
                  });
                  const E = On[u];
                  E && (U(u, "meanReturn", E.meanReturn), U(u, "volatility", E.volatility));
                },
                children: "Reset"
              }
            ),
            /* @__PURE__ */ e.jsx(
              le,
              {
                variant: "outline",
                size: "sm",
                className: "flex-1 text-xs text-[#e8e8e8]",
                onClick: () => N(null),
                children: "Close"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const Qt = 8, Yt = 6, rs = 8, dn = 0;
function Po() {
  const [t, s] = a.useState(() => typeof document > "u" ? !0 : document.documentElement.classList.contains("dark"));
  return a.useEffect(() => {
    if (typeof document > "u") return;
    const n = () => s(document.documentElement.classList.contains("dark")), o = new MutationObserver(n);
    return o.observe(document.documentElement, { attributes: !0, attributeFilter: ["class"] }), window.addEventListener("theme-change", n), window.addEventListener("storage", n), () => {
      o.disconnect(), window.removeEventListener("theme-change", n), window.removeEventListener("storage", n);
    };
  }, []), t;
}
function Eo(t) {
  return function() {
    t |= 0, t = t + 1831565813 | 0;
    let s = t;
    return s = Math.imul(s ^ s >>> 15, s | 1), s ^= s + Math.imul(s ^ s >>> 7, s | 61), ((s ^ s >>> 14) >>> 0) / 4294967296;
  };
}
function To(t) {
  let s = 0, n = 0;
  for (; s === 0; ) s = t();
  for (; n === 0; ) n = t();
  return Math.sqrt(-2 * Math.log(s)) * Math.cos(2 * Math.PI * n);
}
function Lo(t) {
  const { omega: s, alpha: n, shockSize: o, steps: r, betaRes: i, seed: l } = t, c = Math.max(0.01, Math.min(0.98, 0.99 - n)), d = dn + r, x = Eo(l), p = new Array(d);
  for (let b = 0; b < d; b++) p[b] = To(x);
  const C = new Array(i);
  for (let b = 0; b < i; b++) C[b] = b / (i - 1) * c;
  const m = new Array(i), j = new Array(i), u = new Array(i);
  let N = 0;
  for (let b = 0; b < i; b++) {
    const P = C[b], f = s / (1 - n - P), k = Math.sqrt(f);
    u[b] = k * 100;
    const v = new Array(r), $ = new Array(r);
    let A = f, z = o * k;
    for (let R = 0; R < d; R++) {
      const T = s + n * z * z + P * A, I = Math.sqrt(T);
      if (R >= dn) {
        const S = R - dn;
        v[S] = I * 100, $[S] = I / k - 1, $[S] > N && (N = $[S]);
      }
      const F = I * p[R];
      A = T, z = F;
    }
    m[b] = v, j[b] = $;
  }
  return { sigmaGrid: m, relGrid: j, uncondSigmaPct: u, betas: C, yScale: Math.max(N, 0.05) };
}
function Wn(t, s, n) {
  const { relGrid: o, betas: r, yScale: i } = t, l = r.length, c = [], d = [], x = Math.max(0, Math.min(s, n));
  for (let C = 0; C < l; C++)
    for (let m = 0; m < s; m++) {
      const j = -Qt + m / (s - 1) * (2 * Qt), u = -Yt + C / (l - 1) * (2 * Yt), N = Math.max(0, o[C][m]), b = m < x ? N / i * rs : 0;
      c.push(j, b, u);
    }
  for (let C = 0; C < l - 1; C++)
    for (let m = 0; m < s - 1; m++) {
      const j = C * s + m;
      d.push(j, j + 1, j + s), d.push(j + 1, j + s + 1, j + s);
    }
  const p = new At();
  return p.setAttribute("position", new ns(c, 3)), p.setIndex(d), p.computeVertexNormals(), p;
}
const $o = new yt("#ffffff");
function Hn(t, s, n = 0) {
  const o = t.attributes.position.array, r = new Float32Array(o.length);
  let i = 1 / 0, l = -1 / 0;
  for (let c = 0; c < o.length; c += 3) {
    const d = o[c + 1];
    d < i && (i = d), d > l && (l = d);
  }
  l - i < 1e-3 && (l = i + 1e-3);
  for (let c = 0; c < o.length; c += 3) {
    const d = o[c + 1], x = new yt(s.getColor(d, i, l));
    n > 0 && x.lerp($o, n), r[c] = x.r, r[c + 1] = x.g, r[c + 2] = x.b;
  }
  t.setAttribute("color", new Mt(r, 3));
}
function Io({ data: t, steps: s, isPlaying: n, speed: o, colorScheme: r, surfaceOpacity: i, showWireframe: l, wireframeOpacity: c, highlightBeta: d, showHighlight: x, onProgress: p, resetSignal: C, isDark: m }) {
  const j = a.useRef(null), u = a.useRef(null), N = a.useRef(null), b = a.useRef(s), P = a.useRef(C);
  a.useEffect(() => {
    P.current !== C && (P.current = C, b.current = 0, p(0));
  }, [C, p]), a.useEffect(() => {
    if (!j.current) return;
    const v = Wn(t, s, b.current);
    Hn(v, r, m ? 0 : 0.22), j.current.geometry.dispose(), j.current.geometry = v, u.current && (u.current.geometry.dispose(), u.current.geometry = v.clone());
  }, [t, s, r, m]), Sn((v, $) => {
    if (!j.current) return;
    n && (b.current = Math.min(s, b.current + $ * o), b.current >= s ? p(s) : p(b.current));
    const A = j.current.geometry.attributes.position.array, z = Math.floor(b.current), R = b.current - z, { relGrid: T, betas: I, yScale: F } = t, S = I.length;
    for (let h = 0; h < S; h++)
      for (let y = 0; y < s; y++) {
        const w = (h * s + y) * 3 + 1, M = Math.max(0, T[h][y]);
        let Y = 0;
        y < z ? Y = M / F * rs : y === z && z < s && (Y = M / F * rs * R), A[w] = Y;
      }
    if (j.current.geometry.attributes.position.needsUpdate = !0, j.current.geometry.computeVertexNormals(), u.current && (u.current.geometry.attributes.position.array.set(A), u.current.geometry.attributes.position.needsUpdate = !0), N.current && x) {
      let h = 0, y = 1 / 0;
      for (let Y = 0; Y < I.length; Y++) {
        const _ = Math.abs(I[Y] - d);
        _ < y && (y = _, h = Y);
      }
      const w = -Yt + h / (S - 1) * (2 * Yt), M = N.current.geometry.attributes.position.array;
      for (let Y = 0; Y < s; Y++) {
        M[Y * 3] = -Qt + Y / (s - 1) * (2 * Qt);
        let _ = 0;
        const se = Math.max(0, T[h][Y]);
        Y < z ? _ = se / F * rs : Y === z && z < s && (_ = se / F * rs * R), M[Y * 3 + 1] = _ + 0.04, M[Y * 3 + 2] = w;
      }
      N.current.geometry.attributes.position.needsUpdate = !0;
    }
  });
  const f = a.useMemo(() => {
    const v = Wn(t, s, s);
    return Hn(v, r, m ? 0 : 0.22), v;
  }, [t, s, r, m]), k = a.useMemo(() => {
    const v = new Float32Array(s * 3), $ = new At();
    return $.setAttribute("position", new Mt(v, 3)), $;
  }, [s]);
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx("mesh", { ref: j, geometry: f, children: /* @__PURE__ */ e.jsx(
      "meshStandardMaterial",
      {
        vertexColors: !0,
        side: Xt,
        roughness: 0.35,
        metalness: 0.25,
        transparent: !0,
        opacity: i
      }
    ) }),
    l && /* @__PURE__ */ e.jsx("mesh", { ref: u, geometry: f.clone(), children: /* @__PURE__ */ e.jsx("meshBasicMaterial", { color: m ? "#e8e8e8" : "#3a3a3a", wireframe: !0, transparent: !0, opacity: c }) }),
    x && // react-three-fiber primitive vs SVG line type ambiguity, intentional cast.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    /* @__PURE__ */ e.jsx("line", { ref: N, geometry: k, children: /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: m ? "#e8e8e8" : "#1c1c1c" }) })
  ] });
}
function zo({ show: t, size: s = 20, isDark: n }) {
  if (!t) return null;
  const o = n ? "#3a3a3a" : "#a3a3a3", r = n ? "#2e2e2e" : "#d4d4d4";
  return /* @__PURE__ */ e.jsxs("group", { children: [
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, o, r], position: [0, 0, 0] }),
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, o, r], position: [0, s / 2, -s / 2], rotation: [Math.PI / 2, 0, 0] }),
    /* @__PURE__ */ e.jsx("gridHelper", { args: [s, s, o, r], position: [-s / 2, s / 2, 0], rotation: [0, 0, Math.PI / 2] })
  ] });
}
function Vo({ show: t, isDark: s }) {
  if (!t) return null;
  const n = s ? "#b0b0b0" : "#555555", o = s ? "#b0b0b0" : "#555555", r = s ? "#b0b0b0" : "#555555";
  return /* @__PURE__ */ e.jsxs("group", { children: [
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx("bufferAttribute", { attach: "attributes-position", count: 2, array: new Float32Array([-Qt, 0, 0, Qt, 0, 0]), itemSize: 3 }) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: n })
    ] }),
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx("bufferAttribute", { attach: "attributes-position", count: 2, array: new Float32Array([0, 0, 0, 0, rs, 0]), itemSize: 3 }) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: o })
    ] }),
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx("bufferAttribute", { attach: "attributes-position", count: 2, array: new Float32Array([0, 0, -Yt, 0, 0, Yt]), itemSize: 3 }) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: r })
    ] }),
    /* @__PURE__ */ e.jsx(Bs, { position: [Qt + 0.6, 0, 0], children: /* @__PURE__ */ e.jsx(ke, { fontSize: 0.45, color: n, children: "Time" }) }),
    /* @__PURE__ */ e.jsx(Bs, { position: [0, rs + 0.6, 0], children: /* @__PURE__ */ e.jsx(ke, { fontSize: 0.45, color: o, children: "σₜ" }) }),
    /* @__PURE__ */ e.jsx(Bs, { position: [0, 0, Yt + 0.6], children: /* @__PURE__ */ e.jsx(ke, { fontSize: 0.45, color: r, children: "β" }) })
  ] });
}
const Ss = [
  {
    id: "gfc",
    label: "GFC 2008",
    blurb: "Global Financial Crisis — Lehman collapse. High α, sticky β. Vol stays elevated for months.",
    params: { omega: 3e-5, alpha: 0.15, shockSize: 6, seed: 11 },
    highlightBeta: 0.82
  },
  {
    id: "covid",
    label: "COVID 2020",
    blurb: "Fastest bear market ever. Extreme shock reactivity, rapid spike then sharp normalization.",
    params: { omega: 4e-5, alpha: 0.22, shockSize: 8, seed: 77 },
    highlightBeta: 0.75
  },
  {
    id: "flash",
    label: "Flash Crash",
    blurb: "May 2010 intraday crash. Huge 10σ̄ shock, α spikes but β=low so normalises within weeks.",
    params: { omega: 2e-5, alpha: 0.3, shockSize: 10, seed: 33 },
    highlightBeta: 0.55
  },
  {
    id: "dotcom",
    label: "Dot-com 2000",
    blurb: "Tech bubble unwind. Moderate α, very high β. Multi-year drawdown, persistent elevated vol.",
    params: { omega: 3e-5, alpha: 0.1, shockSize: 4, seed: 55 },
    highlightBeta: 0.87
  },
  {
    id: "crypto",
    label: "Crypto Winter",
    blurb: "2022 Terra + FTX collapse. Very high shock, long recovery. Extreme β persistence.",
    params: { omega: 5e-5, alpha: 0.18, shockSize: 7, seed: 99 },
    highlightBeta: 0.8
  },
  {
    id: "calm",
    label: "Calm 2017",
    blurb: "Historically low-vol year. α≈0, tiny shocks, σₜ barely deviates from σ̄.",
    params: { omega: 1e-5, alpha: 0.03, shockSize: 0.5, seed: 42 },
    highlightBeta: 0.85
  }
];
function Do({ revealSteps: t, steps: s, show: n }) {
  if (!n || t <= 0 || t >= s) return null;
  const o = -Qt + t / (s - 1) * (2 * Qt);
  return /* @__PURE__ */ e.jsxs("group", { position: [o, 0, 0], children: [
    /* @__PURE__ */ e.jsxs("mesh", { children: [
      /* @__PURE__ */ e.jsx("planeGeometry", { args: [2 * Yt, rs] }),
      /* @__PURE__ */ e.jsx("meshBasicMaterial", { color: "#c58435", transparent: !0, opacity: 0.08, side: Xt })
    ] }),
    /* @__PURE__ */ e.jsxs("line", { children: [
      /* @__PURE__ */ e.jsx("bufferGeometry", { children: /* @__PURE__ */ e.jsx("bufferAttribute", { attach: "attributes-position", count: 2, array: new Float32Array([0, 0, -Yt, 0, 0, Yt]), itemSize: 3 }) }),
      /* @__PURE__ */ e.jsx("lineBasicMaterial", { color: "#c58435" })
    ] })
  ] });
}
function Oo() {
  const [t, s] = a.useState({
    omega: 2e-5,
    alpha: 0.1,
    shockSize: 3,
    steps: 150,
    betaRes: 60,
    seed: 42
  }), [n, o] = a.useState(0.85), [r, i] = a.useState($t[4]), [l, c] = a.useState(!0), [d, x] = a.useState(0.12), [p, C] = a.useState(0.92), [m, j] = a.useState(!0), [u, N] = a.useState(!0), [b, P] = a.useState(!0), [f, k] = a.useState(!0), [v, $] = a.useState(!1), [A, z] = a.useState(1), [R, T] = a.useState(!0), [I, F] = a.useState(!1), [S, h] = a.useState(!0), [y, w] = a.useState(!1), [M, Y] = a.useState(40), [_, se] = a.useState(t.steps), [V, W] = a.useState(0), [te, O] = a.useState(null), [L, D] = a.useState(!1), [X, B] = a.useState(!1), [g, oe] = a.useState(0), re = Po(), U = a.useMemo(() => Lo(t), [t]);
  a.useEffect(() => {
    se(t.steps);
  }, [t]);
  const ee = a.useMemo(() => {
    let Q = 0, ne = 1 / 0;
    for (let de = 0; de < U.betas.length; de++) {
      const ve = Math.abs(U.betas[de] - n);
      ve < ne && (ne = ve, Q = de);
    }
    const H = U.betas[Q], me = t.alpha + H, be = me > 0 && me < 1 ? Math.log(0.5) / Math.log(me) : 1 / 0, Re = U.sigmaGrid[Q], Se = Math.max(0, Math.min(Re.length - 1, Math.floor(_) - 1)), We = Re[Se], Be = Re.slice(0, Se + 1).reduce((de, ve) => de + ve, 0) / Math.max(1, Se + 1), Z = Math.max(...Re.slice(0, Se + 1)), pe = U.uncondSigmaPct[Q], Ze = We / pe - 1;
    return {
      actualBeta: H,
      persistence: me,
      halfLife: be,
      currentSigma: We,
      meanSigma: Be,
      peakSigma: Z,
      uncondSigma: pe,
      currentLift: Ze
    };
  }, [U, n, _, t.alpha]), E = a.useRef(null), G = () => E.current?.reset(), J = () => {
    _ >= t.steps && (W((Q) => Q + 1), se(0)), w((Q) => !Q);
  }, K = () => {
    W((Q) => Q + 1), se(0), w(!0);
  }, ue = () => {
    s((Q) => ({ ...Q, seed: Q.seed + 1 | 0 })), W((Q) => Q + 1), se(0), w(!0);
  }, ce = a.useCallback((Q) => {
    s((ne) => ({ ...ne, ...Q.params })), o(Q.highlightBeta), O(Q), W((ne) => ne + 1), se(0), w(!0);
  }, []);
  return a.useEffect(() => {
    if (!X) return;
    ce(Ss[g % Ss.length]);
    const Q = setTimeout(() => oe((ne) => ne + 1), 12e3);
    return () => clearTimeout(Q);
  }, [X, g, ce]), a.useEffect(() => {
    _ >= t.steps && y && w(!1);
  }, [_, t.steps, y]), /* @__PURE__ */ e.jsxs("div", { className: "relative w-full h-[calc(100vh-180px)] min-h-[600px] bg-neutral-100 dark:bg-[#1c1c1c] rounded-lg overflow-hidden border border-border", children: [
    /* @__PURE__ */ e.jsxs(
      It,
      {
        camera: { position: [14, 10, 14], fov: 45 },
        style: {
          // Flat terminal background, no gradient: the scene sits on the same
          // neutral canvas as every other chart surface.
          background: re ? "var(--bg, #1c1c1c)" : "#ebebeb"
        },
        children: [
          /* @__PURE__ */ e.jsx("ambientLight", { intensity: re ? 0.45 : 0.85 }),
          /* @__PURE__ */ e.jsx("pointLight", { position: [10, 20, 10], intensity: re ? 1.2 : 0.9 }),
          /* @__PURE__ */ e.jsx("directionalLight", { position: [-10, 15, 10], intensity: re ? 0.8 : 0.6 }),
          /* @__PURE__ */ e.jsx("pointLight", { position: [-10, 8, -10], intensity: re ? 0.4 : 0.2, color: "#ffffff" }),
          /* @__PURE__ */ e.jsx(zo, { show: m, size: 20, isDark: re }),
          /* @__PURE__ */ e.jsx(Vo, { show: u, isDark: re }),
          /* @__PURE__ */ e.jsx(
            Io,
            {
              data: U,
              steps: t.steps,
              isPlaying: y,
              speed: M,
              colorScheme: r,
              surfaceOpacity: p,
              showWireframe: l,
              wireframeOpacity: d,
              highlightBeta: n,
              showHighlight: b,
              onProgress: se,
              resetSignal: V,
              isDark: re
            }
          ),
          /* @__PURE__ */ e.jsx(Do, { revealSteps: Math.floor(_), steps: t.steps, show: f && y }),
          /* @__PURE__ */ e.jsx(
            zt,
            {
              ref: E,
              enablePan: !0,
              enableZoom: !0,
              enableRotate: !0,
              minDistance: 5,
              maxDistance: 60,
              autoRotate: v || L || X,
              autoRotateSpeed: L || X ? 1.2 : A
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: `absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none transition-opacity ${L ? "opacity-0" : "opacity-100"}`, children: [
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3 pointer-events-auto", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "bg-card rounded-lg px-4 py-2 border border-border flex items-center gap-2 text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsx("span", { className: "font-semibold font-mono", children: "GARCH(1,1) Simulation" }),
          /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
            /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4 text-[var(--dim)] cursor-help" }) }),
            /* @__PURE__ */ e.jsxs(xt, { className: "max-w-sm font-mono", children: [
              /* @__PURE__ */ e.jsx("p", { className: "text-sm", children: "σ²ₜ = ω + α·r²ₜ₋₁ + β·σ²ₜ₋₁" }),
              /* @__PURE__ */ e.jsx("p", { className: "text-xs mt-1 text-[var(--dim)]", children: "Every β slice runs on the same seeded shock stream. Press Play to watch clusters form." })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "px-3 py-1 rounded text-xs font-mono bg-[var(--bg2)] border border-[var(--edge)] text-[var(--up)]", children: [
          "α+β: ",
          ee.persistence.toFixed(3),
          " ✓"
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "px-3 py-1 rounded text-xs font-mono bg-card border border-border text-[var(--dim)]", children: [
          "t=",
          Math.floor(_),
          "/",
          t.steps
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 pointer-events-auto", children: [
        /* @__PURE__ */ e.jsxs(le, { variant: "outline", size: "sm", onClick: J, className: "bg-card gap-1 text-[var(--text)] hover:text-[var(--text)]", children: [
          y ? /* @__PURE__ */ e.jsx(os, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Bt, { className: "h-4 w-4" }),
          /* @__PURE__ */ e.jsx("span", { className: "hidden md:inline", children: y ? "Pause" : "Play" })
        ] }),
        /* @__PURE__ */ e.jsxs(Ys, { children: [
          /* @__PURE__ */ e.jsx(Xs, { asChild: !0, children: /* @__PURE__ */ e.jsxs(
            le,
            {
              variant: te ? "default" : "outline",
              size: "sm",
              className: `gap-1 font-mono ${te ? "bg-[var(--hover)] text-[var(--text)] hover:bg-[var(--hover)]" : "bg-card text-[var(--text)] hover:text-[var(--text)]"}`,
              children: [
                /* @__PURE__ */ e.jsx(as, { className: "h-4 w-4" }),
                /* @__PURE__ */ e.jsx("span", { className: "hidden md:inline", children: te ? te.label : "Scenarios" }),
                /* @__PURE__ */ e.jsx(Ae, { className: "h-3 w-3 opacity-60" })
              ]
            }
          ) }),
          /* @__PURE__ */ e.jsx(qs, { align: "end", className: "w-48 p-1 bg-card font-mono", children: Ss.map((Q) => {
            const ne = te?.id === Q.id;
            return /* @__PURE__ */ e.jsxs(
              "button",
              {
                onClick: () => {
                  X && B(!1), ce(Q);
                },
                className: `w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-[var(--hover)] ${ne ? "text-[#c58435]" : "text-[var(--text)]"}`,
                children: [
                  /* @__PURE__ */ e.jsx(as, { className: "h-3.5 w-3.5" }),
                  " ",
                  Q.label
                ]
              },
              Q.id
            );
          }) })
        ] }),
        /* @__PURE__ */ e.jsxs(Ys, { children: [
          /* @__PURE__ */ e.jsx(Xs, { asChild: !0, children: /* @__PURE__ */ e.jsxs(
            le,
            {
              variant: X || L ? "default" : "outline",
              size: "sm",
              className: `gap-1 font-mono ${X || L ? "bg-[var(--hover)] text-[var(--text)] hover:bg-[var(--hover)]" : "bg-card text-[var(--text)] hover:text-[var(--text)]"}`,
              children: [
                /* @__PURE__ */ e.jsx(as, { className: "h-4 w-4" }),
                /* @__PURE__ */ e.jsx("span", { className: "hidden md:inline", children: X ? `Tour ${g % Ss.length + 1}/${Ss.length}` : L ? "Cinema" : "Modes" }),
                /* @__PURE__ */ e.jsx(Ae, { className: "h-3 w-3 opacity-60" })
              ]
            }
          ) }),
          /* @__PURE__ */ e.jsxs(qs, { align: "end", className: "w-44 p-1 bg-card font-mono", children: [
            /* @__PURE__ */ e.jsxs("button", { onClick: K, className: "w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-[var(--hover)] text-[var(--text)]", children: [
              /* @__PURE__ */ e.jsx(jt, { className: "h-3.5 w-3.5" }),
              " Replay"
            ] }),
            /* @__PURE__ */ e.jsxs("button", { onClick: ue, className: "w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-[var(--hover)] text-[var(--text)]", children: [
              /* @__PURE__ */ e.jsx(Js, { className: "h-3.5 w-3.5" }),
              " New seed"
            ] }),
            /* @__PURE__ */ e.jsxs("button", { onClick: G, className: "w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-[var(--hover)] text-[var(--text)]", children: [
              /* @__PURE__ */ e.jsx(jt, { className: "h-3.5 w-3.5" }),
              " Reset view"
            ] }),
            /* @__PURE__ */ e.jsx("div", { className: "my-1 h-px bg-border" }),
            /* @__PURE__ */ e.jsxs(
              "button",
              {
                onClick: () => {
                  X ? B(!1) : (oe(0), B(!0));
                },
                className: `w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-[var(--hover)] ${X ? "text-[#c58435]" : "text-[var(--text)]"}`,
                children: [
                  /* @__PURE__ */ e.jsx(as, { className: "h-3.5 w-3.5" }),
                  " ",
                  X ? "Stop tour" : "Guided tour"
                ]
              }
            ),
            /* @__PURE__ */ e.jsxs(
              "button",
              {
                onClick: () => D((Q) => !Q),
                className: `w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-[var(--hover)] ${L ? "text-[#c58435]" : "text-[var(--text)]"}`,
                children: [
                  /* @__PURE__ */ e.jsx(fa, { className: "h-3.5 w-3.5" }),
                  " ",
                  L ? "Exit cinema" : "Cinema mode"
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }),
    L && /* @__PURE__ */ e.jsx("div", { className: "absolute top-4 right-4 pointer-events-auto z-30", children: /* @__PURE__ */ e.jsxs(
      le,
      {
        variant: "outline",
        size: "sm",
        onClick: () => D(!1),
        className: "bg-card text-[var(--text)] hover:text-[var(--text)] border-border gap-1",
        children: [
          /* @__PURE__ */ e.jsx(Mn, { className: "h-4 w-4" }),
          "Exit Cinema"
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsxs("div", { className: `absolute left-4 top-20 w-72 space-y-2 pointer-events-auto max-h-[calc(100%-120px)] overflow-y-auto transition-opacity ${L ? "opacity-0 pointer-events-none" : "opacity-100"}`, children: [
      /* @__PURE__ */ e.jsxs($e, { open: R, onOpenChange: T, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card font-mono text-xs text-[var(--text)] hover:text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(vt, { className: "h-4 w-4" }),
            " PARAMETERS"
          ] }),
          R ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-3 text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "ALPHA (α)" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-xs", children: t.alpha.toFixed(3) })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [t.alpha * 1e3], onValueChange: ([Q]) => s((ne) => ({ ...ne, alpha: Q / 1e3 })), min: 0, max: 400, step: 5 }),
            /* @__PURE__ */ e.jsx("div", { className: "text-2xs text-[#808080] font-mono", children: "shock reactivity" })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "OMEGA (ω) ×10⁵" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-xs", children: (t.omega * 1e5).toFixed(1) })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [t.omega * 1e7], onValueChange: ([Q]) => s((ne) => ({ ...ne, omega: Q / 1e7 })), min: 1, max: 500, step: 1 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "SEED SHOCK" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs", children: [
                t.shockSize.toFixed(1),
                "σ̄"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [t.shockSize * 10], onValueChange: ([Q]) => s((ne) => ({ ...ne, shockSize: Q / 10 })), min: 0, max: 60, step: 1 }),
            /* @__PURE__ */ e.jsx("div", { className: "text-2xs text-[#808080] font-mono", children: "opening kick at t=0" })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "HIGHLIGHT β" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-xs", children: ee.actualBeta.toFixed(2) })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [n * 100], onValueChange: ([Q]) => o(Q / 100), min: 0, max: Math.max(1, Math.round((0.99 - t.alpha) * 100)), step: 1 }),
            /* @__PURE__ */ e.jsx("div", { className: "text-2xs text-[#808080] font-mono", children: "bright ridge + stats anchor" })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2 pt-2 border-t border-border", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "PLAYBACK SPEED" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs", children: [
                M,
                " st/s"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [M], onValueChange: ([Q]) => Y(Q), min: 5, max: 200, step: 5 })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ e.jsxs($e, { open: I, onOpenChange: F, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card font-mono text-xs text-[var(--text)] hover:text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(Pt, { className: "h-4 w-4" }),
            " VISUALS"
          ] }),
          I ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-4 text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsx(qt, { value: r.id, onChange: i }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "SURFACE OPACITY" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs", children: [
                (p * 100).toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [p * 100], onValueChange: ([Q]) => C(Q / 100), min: 20, max: 100, step: 5 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)] font-mono", children: "WIREFRAME" }),
            /* @__PURE__ */ e.jsx(Me, { checked: l, onCheckedChange: c })
          ] }),
          l && /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "WIRE OPACITY" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-xs", children: [
                (d * 100).toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [d * 100], onValueChange: ([Q]) => x(Q / 100), min: 5, max: 60, step: 5 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "TIME RES" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-xs", children: t.steps })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [t.steps], onValueChange: ([Q]) => s((ne) => ({ ...ne, steps: Q })), min: 60, max: 300, step: 10 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "β RES" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-xs", children: t.betaRes })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [t.betaRes], onValueChange: ([Q]) => s((ne) => ({ ...ne, betaRes: Q })), min: 20, max: 80, step: 5 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)] font-mono", children: "HIGHLIGHT RIDGE" }),
            /* @__PURE__ */ e.jsx(Me, { checked: b, onCheckedChange: P })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)] font-mono", children: "TIME CURSOR" }),
            /* @__PURE__ */ e.jsx(Me, { checked: f, onCheckedChange: k })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-[var(--dim)] font-mono", children: [
              /* @__PURE__ */ e.jsx(is, { className: "h-3 w-3 inline mr-1" }),
              "GRID"
            ] }),
            /* @__PURE__ */ e.jsx(Me, { checked: m, onCheckedChange: j })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsxs(q, { className: "text-xs text-[var(--dim)] font-mono", children: [
              /* @__PURE__ */ e.jsx(ls, { className: "h-3 w-3 inline mr-1" }),
              "AXES"
            ] }),
            /* @__PURE__ */ e.jsx(Me, { checked: u, onCheckedChange: N })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)] font-mono", children: "AUTO ROTATE" }),
            /* @__PURE__ */ e.jsx(Me, { checked: v, onCheckedChange: $ })
          ] }),
          v && /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "SPEED" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-xs", children: A.toFixed(1) })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [A * 10], onValueChange: ([Q]) => z(Q / 10), min: 1, max: 40, step: 1 })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: `absolute right-4 top-20 w-56 pointer-events-auto transition-opacity ${L ? "opacity-0 pointer-events-none" : "opacity-100"}`, children: /* @__PURE__ */ e.jsxs($e, { open: S, onOpenChange: h, children: [
      /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card font-mono text-xs text-[var(--text)] hover:text-[var(--text)]", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4" }),
          " β=",
          ee.actualBeta.toFixed(2),
          " LIVE"
        ] }),
        S ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
      ] }) }),
      /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-3 bg-card border-border space-y-3 text-[var(--text)]", children: [
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mb-1 font-mono", children: [
            /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "PERSISTENCE" }),
            /* @__PURE__ */ e.jsx("span", { className: `text-sm font-bold ${ee.persistence >= 0.95 ? "text-[#c58435]" : ee.persistence >= 0.8 ? "text-[var(--up)]" : "text-[var(--text)]"}`, children: ee.persistence.toFixed(3) })
          ] }),
          /* @__PURE__ */ e.jsx("div", { className: "w-full bg-muted h-1.5 rounded", children: /* @__PURE__ */ e.jsx("div", { className: `h-full rounded ${ee.persistence >= 0.95 ? "bg-[#c58435]" : ee.persistence >= 0.8 ? "bg-[var(--up)]" : "bg-[var(--dim)]"}`, style: { width: `${Math.min(ee.persistence * 100, 100)}%` } }) })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "HALF-LIFE" }),
          /* @__PURE__ */ e.jsx("span", { className: "text-sm text-[var(--text)]", children: isFinite(ee.halfLife) ? `${ee.halfLife.toFixed(1)} steps` : "∞" })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "UNCOND σ̄" }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-sm text-[var(--text)]", children: [
            ee.uncondSigma.toFixed(2),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "pt-2 border-t border-border space-y-2 font-mono", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "σ NOW" }),
            /* @__PURE__ */ e.jsxs("span", { className: `text-sm font-bold ${ee.currentLift > 0.3 ? "text-[var(--down)]" : ee.currentLift > 0 ? "text-[#c58435]" : "text-[var(--up)]"}`, children: [
              ee.currentSigma.toFixed(2),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "LIFT vs σ̄" }),
            /* @__PURE__ */ e.jsxs("span", { className: `text-sm ${ee.currentLift > 0 ? "text-[#c58435]" : "text-[var(--up)]"}`, children: [
              ee.currentLift >= 0 ? "+" : "",
              (ee.currentLift * 100).toFixed(1),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "PEAK so far" }),
            /* @__PURE__ */ e.jsxs("span", { className: "text-sm text-[var(--down)]", children: [
              ee.peakSigma.toFixed(2),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[var(--dim)]", children: "MEAN so far" }),
            /* @__PURE__ */ e.jsxs("span", { className: "text-sm", children: [
              ee.meanSigma.toFixed(2),
              "%"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "pt-2 border-t border-border", children: [
          /* @__PURE__ */ e.jsx("div", { className: "text-xs text-[var(--dim)] mb-2 font-mono", children: "σ HEIGHT SCALE" }),
          /* @__PURE__ */ e.jsx("div", { className: "flex h-3 rounded overflow-hidden", children: r.colors.map((Q, ne) => /* @__PURE__ */ e.jsx("div", { className: "flex-1", style: { backgroundColor: Q } }, ne)) }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between text-xs text-[var(--dim)] mt-1 font-mono", children: [
            /* @__PURE__ */ e.jsx("span", { children: "LOW" }),
            /* @__PURE__ */ e.jsx("span", { children: "HIGH" })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "pt-2 border-t border-border text-2xs text-[var(--dim)] font-mono leading-relaxed", children: [
          "Play: watch clusters form as shocks arrive.",
          /* @__PURE__ */ e.jsx("br", {}),
          "New: re-seed for a different history.",
          /* @__PURE__ */ e.jsx("br", {}),
          "Back ridge (β near 1): long persistent tails."
        ] })
      ] }) })
    ] }) })
  ] });
}
const Lt = 0, Kt = 10, Ms = -3, Cs = 3, cs = 200, Gn = -3, Bn = 13, Wo = -20, Ho = 30, Go = 300;
function Bo() {
  const [t, s] = a.useState(() => typeof document > "u" ? !0 : document.documentElement.classList.contains("dark"));
  return a.useEffect(() => {
    if (typeof document > "u") return;
    const n = () => s(document.documentElement.classList.contains("dark")), o = new MutationObserver(n);
    return o.observe(document.documentElement, { attributes: !0, attributeFilter: ["class"] }), window.addEventListener("theme-change", n), window.addEventListener("storage", n), () => {
      o.disconnect(), window.removeEventListener("theme-change", n), window.removeEventListener("storage", n);
    };
  }, []), t;
}
function kn(t) {
  return function() {
    t |= 0, t = t + 1831565813 | 0;
    let s = t;
    return s = Math.imul(s ^ s >>> 15, s | 1), s ^= s + Math.imul(s ^ s >>> 7, s | 61), ((s ^ s >>> 14) >>> 0) / 4294967296;
  };
}
function bn(t) {
  let s = 0, n = 0;
  for (; s === 0; ) s = t();
  for (; n === 0; ) n = t();
  return Math.sqrt(-2 * Math.log(s)) * Math.cos(2 * Math.PI * n);
}
function $s(t, s, n, o) {
  const r = t - s;
  return o * o * Math.exp(-0.5 * r * r / (n * n));
}
function An(t) {
  const s = t.length, n = Array.from({ length: s }, () => new Array(s).fill(0));
  for (let o = 0; o < s; o++)
    for (let r = 0; r <= o; r++) {
      let i = t[o][r];
      for (let l = 0; l < r; l++) i -= n[o][l] * n[r][l];
      o === r ? n[o][r] = Math.sqrt(Math.max(1e-10, i)) : n[o][r] = i / n[r][r];
    }
  return n;
}
function Zs(t, s) {
  const n = t.length, o = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let l = s[i];
    for (let c = 0; c < i; c++) l -= t[i][c] * o[c];
    o[i] = l / t[i][i];
  }
  const r = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let l = o[i];
    for (let c = i + 1; c < n; c++) l -= t[c][i] * r[c];
    r[i] = l / t[i][i];
  }
  return r;
}
function _o(t) {
  const s = kn(t), n = 0.6 + s() * 0.9, o = 0.4 + s() * 0.7, r = s() * Math.PI * 2, i = 0.25 + s() * 0.5, l = 1.1 + s() * 1.5, c = s() * Math.PI * 2, d = (s() - 0.5) * 0.12;
  return (x) => n * Math.sin(o * x + r) + i * Math.sin(l * x + c) + d * (x - 5);
}
function Yo(t, s) {
  const { numObs: n, seed: o, noiseSigma: r, obsLayout: i } = t, l = kn(o + 9999), c = [], d = Kt - Lt;
  if (i === "uniform")
    for (let p = 0; p < n; p++) {
      const C = n === 1 ? 0.5 : (p + 0.5) / n, m = (l() - 0.5) * (d / n) * 0.3;
      c.push(Lt + C * d + m);
    }
  else if (i === "clustered")
    for (let p = 0; p < n; p++) {
      const C = (Lt + Kt) / 2;
      c.push(C + bn(l) * 1.2);
    }
  else
    for (let p = 0; p < n; p++) c.push(Lt + l() * d);
  c.sort((p, C) => p - C);
  const x = c.map((p) => s(p) + bn(l) * r);
  return { X: c, y: x };
}
function Xo(t, s, n) {
  const { lengthScale: o, signalSigma: r, noiseSigma: i } = t, l = new Array(cs);
  for (let u = 0; u < cs; u++) l[u] = Lt + u / (cs - 1) * (Kt - Lt);
  const c = s.length;
  if (c === 0)
    return { testX: l, mean: l.map(() => 0), std: l.map(() => r), logLik: 0 };
  const d = Array.from(
    { length: c },
    (u, N) => Array.from({ length: c }, (b, P) => $s(s[N], s[P], o, r) + (N === P ? i * i + 1e-6 : 0))
  ), x = An(d), p = Zs(x, n), C = new Array(cs), m = new Array(cs);
  for (let u = 0; u < cs; u++) {
    const N = new Array(c);
    for (let k = 0; k < c; k++) N[k] = $s(l[u], s[k], o, r);
    let b = 0;
    for (let k = 0; k < c; k++) b += N[k] * p[k];
    C[u] = b;
    const P = Zs(x, N);
    let f = r * r;
    for (let k = 0; k < c; k++) f -= N[k] * P[k];
    m[u] = Math.sqrt(Math.max(1e-8, f));
  }
  let j = 0;
  for (let u = 0; u < c; u++) j -= 0.5 * n[u] * p[u];
  for (let u = 0; u < c; u++) j -= Math.log(x[u][u]);
  return j -= c / 2 * Math.log(2 * Math.PI), { testX: l, mean: C, std: m, logLik: j };
}
function _n(t, s, n = Lt, o = Kt, r = cs) {
  const { lengthScale: i, signalSigma: l, seed: c } = t, d = new Array(r);
  for (let m = 0; m < r; m++) d[m] = n + m / (r - 1) * (o - n);
  const x = Array.from(
    { length: r },
    (m, j) => Array.from({ length: r }, (u, N) => $s(d[j], d[N], i, l) + (j === N ? 1e-5 : 0))
  ), p = An(x), C = [];
  for (let m = 0; m < s; m++) {
    const j = kn(c + 1337 + m * 101), u = new Array(r);
    for (let b = 0; b < r; b++) u[b] = bn(j);
    const N = new Array(r).fill(0);
    for (let b = 0; b < r; b++) {
      let P = 0;
      for (let f = 0; f <= b; f++) P += p[b][f] * u[f];
      N[b] = P;
    }
    C.push(N);
  }
  return { testX: d, samples: C };
}
function mn(t, s, n, o, r, i, l, c) {
  const d = new Array(c);
  for (let N = 0; N < c; N++) d[N] = i + N / (c - 1) * (l - i);
  const x = o.length;
  if (x === 0)
    return { testX: d, mean: d.map(() => 0), std: d.map(() => s) };
  const p = Array.from(
    { length: x },
    (N, b) => Array.from({ length: x }, (P, f) => $s(o[b], o[f], t, s) + (b === f ? n * n + 1e-6 : 0))
  ), C = An(p), m = Zs(C, r), j = new Array(c), u = new Array(c);
  for (let N = 0; N < c; N++) {
    const b = new Array(x);
    for (let v = 0; v < x; v++) b[v] = $s(d[N], o[v], t, s);
    let P = 0;
    for (let v = 0; v < x; v++) P += b[v] * m[v];
    j[N] = P;
    const f = Zs(C, b);
    let k = s * s;
    for (let v = 0; v < x; v++) k -= b[v] * f[v];
    u[N] = Math.sqrt(Math.max(1e-8, k));
  }
  return { testX: d, mean: j, std: u };
}
function hn({ title: t, posterior: s, data: n, priorMean: o, isDark: r, caption: i }) {
  const f = (w, M) => [
    54 + (w - 0) / 32 * 348,
    16 + (1 - (M - 3) / 2) * 240
  ], k = s.testX.length;
  let v = "";
  for (let w = 0; w < k; w++) {
    const M = s.mean[w] + o + 2 * s.std[w], [Y, _] = f(s.testX[w], M);
    v += (w === 0 ? "M" : "L") + `${Y.toFixed(2)},${_.toFixed(2)} `;
  }
  for (let w = k - 1; w >= 0; w--) {
    const M = s.mean[w] + o - 2 * s.std[w], [Y, _] = f(s.testX[w], M);
    v += `L${Y.toFixed(2)},${_.toFixed(2)} `;
  }
  v += "Z";
  let $ = "";
  for (let w = 0; w < k; w++) {
    const [M, Y] = f(s.testX[w], s.mean[w] + o);
    $ += (w === 0 ? "M" : "L") + `${M.toFixed(2)},${Y.toFixed(2)} `;
  }
  const A = r ? "rgba(232,232,232,0.16)" : "rgba(28,28,28,0.14)", z = r ? "#e8e8e8" : "#3c3c3c", R = r ? "#b0b0b0" : "#505050", T = r ? "#2e2e2e" : "#d8d8d8", I = r ? "#1c1c1c" : "#f7f7f7", F = r ? "#e8e8e8" : "#1c1c1c", S = r ? "#1c1c1c" : "#ffffff", h = [1, 5, 10, 20, 30], y = [3.5, 4, 4.5];
  return /* @__PURE__ */ e.jsxs("div", { className: "rounded-lg border border-border bg-card p-3", children: [
    /* @__PURE__ */ e.jsx("div", { className: "mb-2 px-1 font-mono text-xs text-[color:var(--text)] font-semibold", children: t }),
    /* @__PURE__ */ e.jsxs("svg", { viewBox: "0 0 420 300", className: "w-full h-auto", role: "img", "aria-label": t, children: [
      /* @__PURE__ */ e.jsx("rect", { x: 54, y: 16, width: 348, height: 240, fill: I, stroke: T }),
      h.map((w) => {
        const [M] = f(w, 3);
        return /* @__PURE__ */ e.jsx("line", { x1: M, x2: M, y1: 16, y2: 256, stroke: T, strokeWidth: 1 }, `gx${w}`);
      }),
      y.map((w) => {
        const [, M] = f(0, w);
        return /* @__PURE__ */ e.jsx("line", { x1: 54, x2: 402, y1: M, y2: M, stroke: T, strokeWidth: 1 }, `gy${w}`);
      }),
      /* @__PURE__ */ e.jsx("path", { d: v, fill: A }),
      /* @__PURE__ */ e.jsx("path", { d: $, fill: "none", stroke: z, strokeWidth: 2.2 }),
      n.map(([w, M], Y) => {
        const [_, se] = f(w, M);
        return /* @__PURE__ */ e.jsxs("g", { children: [
          /* @__PURE__ */ e.jsx("circle", { cx: _, cy: se, r: 6, fill: F }),
          /* @__PURE__ */ e.jsx("circle", { cx: _, cy: se, r: 3.4, fill: S })
        ] }, Y);
      }),
      h.map((w) => {
        const [M] = f(w, 3);
        return /* @__PURE__ */ e.jsxs("g", { children: [
          /* @__PURE__ */ e.jsx("line", { x1: M, x2: M, y1: 256, y2: 260, stroke: R, strokeWidth: 1 }),
          /* @__PURE__ */ e.jsxs("text", { x: M, y: 272, textAnchor: "middle", fontSize: 11, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fill: R, children: [
            w,
            "Y"
          ] })
        ] }, `tx${w}`);
      }),
      y.map((w) => {
        const [, M] = f(0, w);
        return /* @__PURE__ */ e.jsxs("g", { children: [
          /* @__PURE__ */ e.jsx("line", { x1: 50, x2: 54, y1: M, y2: M, stroke: R, strokeWidth: 1 }),
          /* @__PURE__ */ e.jsxs("text", { x: 47, y: M + 4, textAnchor: "end", fontSize: 11, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fill: R, children: [
            w.toFixed(1),
            "%"
          ] })
        ] }, `ty${w}`);
      }),
      /* @__PURE__ */ e.jsx("text", { x: 54 + 348 / 2, y: 294, textAnchor: "middle", fontSize: 11, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fill: R, children: "maturity (years)" }),
      /* @__PURE__ */ e.jsx("text", { x: 14, y: 16 + 240 / 2, textAnchor: "middle", fontSize: 11, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fill: R, transform: `rotate(-90, 14, ${16 + 240 / 2})`, children: "yield" })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "mt-2 px-1 text-xs text-[color:var(--dim)] font-mono leading-snug", children: i })
  ] });
}
const ks = [
  {
    id: "smooth",
    label: "Smooth signal",
    blurb: "Long length scale, low noise. The posterior glides through sparse observations with confidence.",
    params: { lengthScale: 2, signalSigma: 1, noiseSigma: 0.05, numObs: 8, obsLayout: "uniform" },
    seed: 11
  },
  {
    id: "wiggly",
    label: "Wiggly signal",
    blurb: "Short length scale. The model bends tight around every point at the cost of looser extrapolation.",
    params: { lengthScale: 0.45, signalSigma: 1, noiseSigma: 0.05, numObs: 16, obsLayout: "uniform" },
    seed: 22
  },
  {
    id: "noisy",
    label: "Noisy data",
    blurb: "High observation noise. The posterior stays humble even with plenty of observations.",
    params: { lengthScale: 1.2, signalSigma: 1, noiseSigma: 0.4, numObs: 16, obsLayout: "uniform" },
    seed: 33
  },
  {
    id: "sparse",
    label: "Sparse evidence",
    blurb: "Only five observations. Watch the confidence band balloon between them.",
    params: { lengthScale: 1, signalSigma: 1, noiseSigma: 0.05, numObs: 5, obsLayout: "uniform" },
    seed: 44
  },
  {
    id: "clustered",
    label: "Extrapolation",
    blurb: "All observations near the centre. The band swells at the edges — classic GP humility beyond the data.",
    params: { lengthScale: 1, signalSigma: 1, noiseSigma: 0.05, numObs: 10, obsLayout: "clustered" },
    seed: 55
  },
  {
    id: "oversmooth",
    label: "Over-smoothed",
    blurb: "Length scale far longer than the true signal. The posterior misses the wiggles entirely.",
    params: { lengthScale: 3, signalSigma: 1, noiseSigma: 0.05, numObs: 14, obsLayout: "uniform" },
    seed: 66
  }
];
function St(t, s, n, o) {
  return o + (t - s.xMin) / (s.xMax - s.xMin) * (n.width - 2 * o);
}
function pt(t, s, n, o) {
  return o + (1 - (t - s.yMin) / (s.yMax - s.yMin)) * (n.height - 2 * o);
}
function qo(t, s, n, o) {
  return s.xMin + (t - o) / (n.width - 2 * o) * (s.xMax - s.xMin);
}
function Zo(t, s, n, o) {
  return s.yMin + (1 - (t - o) / (n.height - 2 * o)) * (s.yMax - s.yMin);
}
function Us(t) {
  const s = t / 10, n = Math.floor(Math.log10(s)), o = s / Math.pow(10, n);
  let r;
  return o < 1.5 ? r = 1 : o < 3.5 ? r = 2 : o < 7.5 ? r = 5 : r = 10, r * Math.pow(10, n);
}
function Uo(t) {
  const { ctx: s, dims: n, view: o, isDark: r, posterior: i, obs: l, revealSteps: c, trueFn: d, showTrue: x, showPriorSamples: p, priorSamples: C, bandOpacity: m } = t, j = 32;
  s.clearRect(0, 0, n.width, n.height), s.fillStyle = r ? "#1c1c1c" : "#f0f0f0", s.fillRect(0, 0, n.width, n.height), s.save(), s.beginPath(), s.rect(j, j, n.width - 2 * j, n.height - 2 * j), s.clip(), s.strokeStyle = r ? "#2e2e2e" : "#d8d8d8", s.lineWidth = 1;
  const u = Us(o.xMax - o.xMin), N = Us(o.yMax - o.yMin);
  for (let f = Math.ceil(o.xMin / u) * u; f <= o.xMax; f += u) {
    const k = St(f, o, n, j);
    s.beginPath(), s.moveTo(k, j), s.lineTo(k, n.height - j), s.stroke();
  }
  for (let f = Math.ceil(o.yMin / N) * N; f <= o.yMax; f += N) {
    const k = pt(f, o, n, j);
    s.beginPath(), s.moveTo(j, k), s.lineTo(n.width - j, k), s.stroke();
  }
  if (o.yMin <= 0 && o.yMax >= 0) {
    s.strokeStyle = r ? "#3a3a3a" : "#c0c0c0", s.beginPath();
    const f = pt(0, o, n, j);
    s.moveTo(j, f), s.lineTo(n.width - j, f), s.stroke();
  }
  if (p && C.length > 0) {
    s.strokeStyle = r ? "rgba(176,176,176,0.35)" : "rgba(96,96,96,0.35)", s.lineWidth = 1;
    for (const f of C) {
      s.beginPath();
      for (let k = 0; k < f.length; k++) {
        const v = St(i.testX[k], o, n, j), $ = pt(f[k], o, n, j);
        k === 0 ? s.moveTo(v, $) : s.lineTo(v, $);
      }
      s.stroke();
    }
  }
  s.fillStyle = r ? `rgba(232, 232, 232, ${m})` : `rgba(28, 28, 28, ${m})`, s.beginPath();
  for (let f = 0; f < i.testX.length; f++) {
    const k = i.mean[f] + 2 * i.std[f], v = St(i.testX[f], o, n, j), $ = pt(k, o, n, j);
    f === 0 ? s.moveTo(v, $) : s.lineTo(v, $);
  }
  for (let f = i.testX.length - 1; f >= 0; f--) {
    const k = i.mean[f] - 2 * i.std[f], v = St(i.testX[f], o, n, j), $ = pt(k, o, n, j);
    s.lineTo(v, $);
  }
  if (s.closePath(), s.fill(), x) {
    s.save(), s.setLineDash([6, 5]), s.strokeStyle = r ? "rgba(33,179,164,0.75)" : "rgba(19,128,117,0.75)", s.lineWidth = 1.5, s.beginPath();
    for (let f = 0; f < i.testX.length; f++) {
      const k = St(i.testX[f], o, n, j), v = pt(d(i.testX[f]), o, n, j);
      f === 0 ? s.moveTo(k, v) : s.lineTo(k, v);
    }
    s.stroke(), s.restore();
  }
  s.strokeStyle = r ? "#e8e8e8" : "#3c3c3c", s.lineWidth = 2.5, s.beginPath();
  for (let f = 0; f < i.testX.length; f++) {
    const k = St(i.testX[f], o, n, j), v = pt(i.mean[f], o, n, j);
    f === 0 ? s.moveTo(k, v) : s.lineTo(k, v);
  }
  s.stroke();
  const b = Math.floor(c), P = c - b;
  for (let f = 0; f < l.X.length; f++) {
    let k = 0;
    if (f < b ? k = 1 : f === b && (k = Math.min(1, P * 2)), k <= 0) continue;
    const v = St(l.X[f], o, n, j), $ = pt(l.y[f], o, n, j);
    s.fillStyle = r ? "#e8e8e8" : "#1c1c1c", s.beginPath(), s.arc(v, $, 5.5 * k, 0, Math.PI * 2), s.fill(), s.fillStyle = r ? "#1c1c1c" : "#ffffff", s.beginPath(), s.arc(v, $, 3.2 * k, 0, Math.PI * 2), s.fill();
  }
  if (s.restore(), s.fillStyle = r ? "#b0b0b0" : "#606060", s.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace", s.textBaseline = "alphabetic", o.yMin <= 0 && o.yMax >= 0) {
    const f = pt(0, o, n, j);
    s.fillText("x", n.width - j + 4, f + 4);
  }
  s.fillText("f(x)", j - 24, j - 4);
}
function ba(t, s, n, o, r) {
  t.clearRect(0, 0, s.width, s.height), t.fillStyle = o ? "#1c1c1c" : "#f0f0f0", t.fillRect(0, 0, s.width, s.height), t.save(), t.beginPath(), t.rect(r, r, s.width - 2 * r, s.height - 2 * r), t.clip(), t.strokeStyle = o ? "#2e2e2e" : "#d8d8d8", t.lineWidth = 1;
  const i = Us(n.xMax - n.xMin), l = Us(n.yMax - n.yMin);
  for (let c = Math.ceil(n.xMin / i) * i; c <= n.xMax; c += i) {
    const d = St(c, n, s, r);
    t.beginPath(), t.moveTo(d, r), t.lineTo(d, s.height - r), t.stroke();
  }
  for (let c = Math.ceil(n.yMin / l) * l; c <= n.yMax; c += l) {
    const d = pt(c, n, s, r);
    t.beginPath(), t.moveTo(r, d), t.lineTo(s.width - r, d), t.stroke();
  }
  if (n.yMin <= 0 && n.yMax >= 0) {
    t.strokeStyle = o ? "#3a3a3a" : "#c0c0c0", t.beginPath();
    const c = pt(0, n, s, r);
    t.moveTo(r, c), t.lineTo(s.width - r, c), t.stroke();
  }
}
function Ko(t) {
  const { ctx: s, dims: n, view: o, isDark: r, testX: i, samples: l, signalSigma: c } = t, d = 32;
  ba(s, n, o, r, d), s.fillStyle = r ? "rgba(232, 232, 232, 0.12)" : "rgba(28, 28, 28, 0.10)";
  const x = pt(2 * c, o, n, d), p = pt(-2 * c, o, n, d);
  s.fillRect(d, x, n.width - 2 * d, p - x);
  const C = r ? [
    { c: "#e8e8e8", a: 0.95, w: 2.4 },
    { c: "#c8c8c8", a: 0.72, w: 1.6 },
    { c: "#a0a0a0", a: 0.72, w: 1.6 },
    { c: "#e8e8e8", a: 0.48, w: 1.4 },
    { c: "#c8c8c8", a: 0.35, w: 1.4 }
  ] : [
    { c: "#3c3c3c", a: 0.95, w: 2.4 },
    { c: "#585858", a: 0.72, w: 1.6 },
    { c: "#707070", a: 0.72, w: 1.6 },
    { c: "#3c3c3c", a: 0.48, w: 1.4 },
    { c: "#585858", a: 0.35, w: 1.4 }
  ];
  for (let m = 0; m < l.length; m++) {
    const j = C[m % C.length];
    s.strokeStyle = j.c, s.globalAlpha = j.a, s.lineWidth = j.w, s.beginPath();
    for (let u = 0; u < l[m].length; u++) {
      const N = St(i[u], o, n, d), b = pt(l[m][u], o, n, d);
      u === 0 ? s.moveTo(N, b) : s.lineTo(N, b);
    }
    s.stroke();
  }
  if (s.globalAlpha = 1, s.restore(), s.fillStyle = r ? "#b0b0b0" : "#606060", s.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace", o.yMin <= 0 && o.yMax >= 0) {
    const m = pt(0, o, n, d);
    s.fillText("x", n.width - d + 4, m + 4);
  }
  s.fillText("f(x)", d - 24, d - 4), s.fillStyle = r ? "rgba(176,176,176,0.6)" : "rgba(96,96,96,0.6)", s.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace", s.fillText(`${l.length} functions drawn from the GP prior · band = ±2σ_f`, d + 6, d + 16);
}
function Qo(t) {
  const { ctx: s, dims: n, view: o, isDark: r, lengthScale: i, signalSigma: l } = t, c = 40;
  ba(s, n, o, r, c);
  const d = l * l, x = Math.min(o.xMax, 3 * i);
  if (x > 0) {
    s.fillStyle = r ? "rgba(197,132,53,0.12)" : "rgba(150,95,30,0.10)";
    const j = St(0, o, n, c), u = St(x, o, n, c), N = pt(o.yMin, o, n, c), b = pt(o.yMax, o, n, c);
    s.fillRect(j, b, u - j, N - b);
  }
  s.strokeStyle = r ? "#e8e8e8" : "#3c3c3c", s.lineWidth = 2.5, s.beginPath();
  const p = 240;
  for (let j = 0; j < p; j++) {
    const u = o.xMin + j / (p - 1) * (o.xMax - o.xMin), N = d * Math.exp(-0.5 * u * u / (i * i)), b = St(u, o, n, c), P = pt(N, o, n, c);
    j === 0 ? s.moveTo(b, P) : s.lineTo(b, P);
  }
  if (s.stroke(), i >= o.xMin && i <= o.xMax) {
    s.strokeStyle = r ? "rgba(33,179,164,0.8)" : "rgba(19,128,117,0.8)", s.lineWidth = 1.5, s.setLineDash([4, 4]), s.beginPath();
    const j = St(i, o, n, c);
    s.moveTo(j, c), s.lineTo(j, n.height - c), s.stroke(), s.setLineDash([]);
    const u = d * Math.exp(-0.5), N = pt(u, o, n, c);
    s.fillStyle = r ? "#21b3a4" : "#138075", s.beginPath(), s.arc(j, N, 4.5, 0, Math.PI * 2), s.fill();
  }
  s.restore(), s.fillStyle = r ? "#b0b0b0" : "#505050", s.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace", s.fillText("Δx (distance)", n.width - c - 80, n.height - c + 18), s.save(), s.translate(c - 28, c + 90), s.rotate(-Math.PI / 2), s.fillText("k(Δx) covariance", 0, 0), s.restore(), s.fillStyle = r ? "#e8e8e8" : "#3c3c3c";
  const C = St(0, o, n, c), m = pt(d, o, n, c);
  if (s.fillText(`k(0) = σ_f² = ${d.toFixed(2)}`, C + 10, m + 4), i >= o.xMin && i <= o.xMax) {
    s.fillStyle = r ? "#21b3a4" : "#138075";
    const j = St(i, o, n, c);
    s.fillText(`ℓ = ${i.toFixed(2)}`, j + 6, c + 14);
  }
}
function Jo() {
  const [t, s] = a.useState({
    lengthScale: 1,
    signalSigma: 1,
    noiseSigma: 0.1,
    numObs: 10,
    seed: 7,
    obsLayout: "uniform"
  }), [n, o] = a.useState(!0), [r, i] = a.useState(!1), [l, c] = a.useState(0.22), [d, x] = a.useState(!0), [p, C] = a.useState(!1), [m, j] = a.useState(!0), [u, N] = a.useState(!1), [b, P] = a.useState(2.5), [f, k] = a.useState(t.numObs), [v, $] = a.useState(null), [A, z] = a.useState(!1), [R, T] = a.useState(!1), [I, F] = a.useState(0), [S, h] = a.useState("posterior"), [y, w] = a.useState(1), [M, Y] = a.useState({ x: 0, y: 0 }), [_, se] = a.useState(!1);
  a.useEffect(() => {
    w(1), Y({ x: 0, y: 0 });
  }, [S]);
  const V = Bo(), W = a.useMemo(() => _o(t.seed), [t.seed]), te = a.useMemo(() => Yo(t, W), [t, W]), O = a.useMemo(() => {
    const de = Math.max(0, Math.min(te.X.length, Math.floor(f)));
    return Xo(t, te.X.slice(0, de), te.y.slice(0, de));
  }, [t, te, f]), L = a.useMemo(
    () => r ? _n(t, 3).samples : [],
    [t, r]
  ), [D, X] = a.useState(0), B = a.useMemo(() => {
    if (S !== "prior") return { testX: [], samples: [] };
    const de = t.seed + Math.floor(D) * 1009;
    return _n({ ...t, seed: de }, 5, Wo, Ho, Go);
  }, [t, S, D]), g = a.useRef(null), oe = a.useRef(null), [re, U] = a.useState({ width: 800, height: 600 });
  a.useEffect(() => {
    if (!g.current) return;
    const de = new ResizeObserver((ve) => {
      for (const Xe of ve) {
        const He = Math.floor(Xe.contentRect.width), De = Math.floor(Xe.contentRect.height);
        He > 0 && De > 0 && U({ width: He, height: De });
      }
    });
    return de.observe(g.current), () => de.disconnect();
  }, []);
  const ee = a.useMemo(() => {
    if (S === "kernel") {
      const De = t.signalSigma * t.signalSigma, Ee = Math.max(4, t.lengthScale * 4);
      return {
        xMin: -Ee * 0.03,
        xMax: Ee,
        yMin: -De * 0.08,
        yMax: De * 1.18
      };
    }
    if (S === "prior") {
      const De = (Gn + Bn) / 2 + M.x, Ee = 0 + M.y, Pe = (Bn - Gn) / y, we = Math.max(2.4, t.signalSigma * 3) / y;
      return {
        xMin: De - Pe / 2,
        xMax: De + Pe / 2,
        yMin: Ee - we,
        yMax: Ee + we
      };
    }
    const de = (Lt + Kt) / 2 + M.x, ve = (Ms + Cs) / 2 + M.y, Xe = (Kt - Lt) / y, He = (Cs - Ms) / y;
    return {
      xMin: de - Xe / 2,
      xMax: de + Xe / 2,
      yMin: ve - He / 2,
      yMax: ve + He / 2
    };
  }, [y, M, S, t.signalSigma, t.lengthScale]);
  a.useEffect(() => {
    const de = oe.current;
    if (!de) return;
    const ve = de.getContext("2d");
    if (!ve) return;
    const Xe = Math.min(window.devicePixelRatio || 1, 2);
    de.width = re.width * Xe, de.height = re.height * Xe, de.style.width = re.width + "px", de.style.height = re.height + "px", ve.setTransform(Xe, 0, 0, Xe, 0, 0), S === "prior" ? Ko({ ctx: ve, dims: re, view: ee, isDark: V, testX: B.testX, samples: B.samples, signalSigma: t.signalSigma }) : S === "kernel" ? Qo({ ctx: ve, dims: re, view: ee, isDark: V, lengthScale: t.lengthScale, signalSigma: t.signalSigma }) : Uo({
      ctx: ve,
      dims: re,
      view: ee,
      isDark: V,
      posterior: O,
      obs: te,
      revealSteps: f,
      trueFn: W,
      showTrue: n,
      showPriorSamples: r,
      priorSamples: L,
      bandOpacity: l
    });
  }, [re, ee, V, O, te, f, W, n, r, L, l, S, B, t.lengthScale, t.signalSigma]);
  const E = a.useRef(y), G = a.useRef(M), J = a.useRef(re), K = a.useRef(ee), ue = a.useRef(!1);
  a.useEffect(() => {
    E.current = y;
  }, [y]), a.useEffect(() => {
    G.current = M;
  }, [M]), a.useEffect(() => {
    J.current = re;
  }, [re]), a.useEffect(() => {
    K.current = ee;
  }, [ee]), a.useEffect(() => {
    ue.current = _;
  }, [_]), a.useEffect(() => {
    const de = g.current;
    if (!de) return;
    const ve = 32, Xe = (He) => {
      He.preventDefault();
      const De = de.getBoundingClientRect(), Ee = He.clientX - De.left, Pe = He.clientY - De.top, we = Math.exp(-He.deltaY * 15e-4), ft = E.current, dt = J.current, tt = K.current, ie = Math.max(0.5, Math.min(40, ft * we));
      if (ie === ft) return;
      const he = qo(Ee, tt, dt, ve), Te = Zo(Pe, tt, dt, ve), Ce = (Kt - Lt) / ie, Ne = (Cs - Ms) / ie, Oe = (Ee - ve) / (dt.width - 2 * ve), Ye = 1 - (Pe - ve) / (dt.height - 2 * ve), st = he - Oe * Ce, ht = Te - Ye * Ne;
      w(ie), Y({
        x: st + Ce / 2 - (Lt + Kt) / 2,
        y: ht + Ne / 2 - (Ms + Cs) / 2
      });
    };
    return de.addEventListener("wheel", Xe, { passive: !1 }), () => de.removeEventListener("wheel", Xe);
  }, []), a.useEffect(() => {
    const de = g.current;
    if (!de) return;
    let ve = { x: 0, y: 0 }, Xe = { x: 0, y: 0 };
    const He = (Pe) => {
      Pe.button === 0 && (ve = { x: Pe.clientX, y: Pe.clientY }, Xe = { ...G.current }, se(!0));
    }, De = (Pe) => {
      if (!ue.current) return;
      const we = Pe.clientX - ve.x, ft = Pe.clientY - ve.y, dt = E.current, tt = J.current, ie = (Kt - Lt) / dt, he = (Cs - Ms) / dt, Te = -we / (tt.width - 64) * ie, Ce = ft / (tt.height - 64) * he;
      Y({ x: Xe.x + Te, y: Xe.y + Ce });
    }, Ee = () => se(!1);
    return de.addEventListener("mousedown", He), window.addEventListener("mousemove", De), window.addEventListener("mouseup", Ee), () => {
      de.removeEventListener("mousedown", He), window.removeEventListener("mousemove", De), window.removeEventListener("mouseup", Ee);
    };
  }, []), a.useEffect(() => {
    if (!u) return;
    let de = performance.now(), ve = 0;
    const Xe = (He) => {
      const De = (He - de) / 1e3;
      if (de = He, S === "posterior")
        k((Ee) => {
          const Pe = Ee + De * b;
          return Pe >= t.numObs ? (N(!1), t.numObs) : Pe;
        });
      else if (S === "prior")
        X((Ee) => Ee + De * b * 0.12);
      else {
        const Ee = He / 1e3 * 0.35 * b, Pe = 1.65 + 1.35 * Math.sin(Ee);
        s((we) => we.lengthScale === Pe ? we : { ...we, lengthScale: Pe });
      }
      ve = requestAnimationFrame(Xe);
    };
    return ve = requestAnimationFrame(Xe), () => cancelAnimationFrame(ve);
  }, [u, b, t.numObs, S]), a.useEffect(() => {
    k(t.numObs);
  }, [t.numObs, t.seed, t.obsLayout]);
  const ce = a.useMemo(() => {
    const de = Math.max(0, Math.min(te.X.length, Math.floor(f))), Xe = 4 * (O.std.reduce((De, Ee) => De + Ee, 0) / O.std.length);
    let He = 0;
    for (let De = 0; De < O.testX.length; De++) {
      const Ee = O.mean[De] - W(O.testX[De]);
      He += Ee * Ee;
    }
    return He = Math.sqrt(He / O.testX.length), {
      observed: de,
      total: te.X.length,
      logLik: O.logLik,
      avgCIWidth: Xe,
      rmse: He
    };
  }, [O, te, f, W]), Q = () => {
    S === "posterior" && f >= t.numObs && k(0), N((de) => !de);
  }, ne = () => {
    k(0), N(!0);
  }, H = () => {
    s((de) => ({ ...de, seed: de.seed + 1 | 0 })), k(0), N(!0);
  }, me = () => {
    w(1), Y({ x: 0, y: 0 });
  }, be = a.useCallback((de) => {
    s((ve) => ({ ...ve, ...de.params, seed: de.seed })), $(de), k(0), N(!0);
  }, []);
  a.useEffect(() => {
    if (!R) return;
    be(ks[I % ks.length]);
    const de = setTimeout(() => F((ve) => ve + 1), 1e4);
    return () => clearTimeout(de);
  }, [R, I, be]);
  const Re = 4, Se = [1, 2, 5, 10, 30], We = [4.5, 4, 3.7, 4.1, 4.4], Be = We.map((de) => de - Re), Z = a.useMemo(
    () => mn(5, 0.5, 0.02, [], [], 0, 32, 120),
    []
  ), pe = a.useMemo(
    () => mn(5, 0.5, 0.02, [Se[1], Se[3]], [Be[1], Be[3]], 0, 32, 120),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  ), Ze = a.useMemo(
    () => mn(5, 0.5, 0.02, Se, Be, 0, 32, 120),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsxs("div", { className: "relative w-full h-[calc(100vh-180px)] min-h-[600px] bg-[color:var(--bg)] rounded-lg overflow-hidden border border-border", children: [
      /* @__PURE__ */ e.jsx(
        "div",
        {
          ref: g,
          className: `absolute inset-0 select-none ${_ ? "cursor-grabbing" : "cursor-grab"}`,
          children: /* @__PURE__ */ e.jsx("canvas", { ref: oe, className: "block" })
        }
      ),
      /* @__PURE__ */ e.jsxs("div", { className: `absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none transition-opacity ${A ? "opacity-0" : "opacity-100"}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3 pointer-events-auto", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "bg-card rounded-lg px-4 py-2 border border-border flex items-center gap-2 text-[color:var(--text)]", children: [
            /* @__PURE__ */ e.jsx("span", { className: "font-semibold font-mono", children: "Gaussian Process" }),
            /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
              /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4 text-[color:var(--dim)] cursor-help" }) }),
              /* @__PURE__ */ e.jsxs(xt, { className: "max-w-sm font-mono", children: [
                /* @__PURE__ */ e.jsx("p", { className: "text-sm", children: "k(x,x') = σ²_f · exp(-½(x-x')²/ℓ²)" }),
                /* @__PURE__ */ e.jsx("p", { className: "text-xs mt-1 text-[color:var(--dim)]", children: "RBF kernel. Press Play to watch the posterior band collapse as each observation feeds in." })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "px-3 py-1 rounded text-xs font-mono bg-card border border-border text-[color:var(--text)]", children: [
            "obs ",
            ce.observed,
            "/",
            ce.total
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "px-3 py-1 rounded text-xs font-mono bg-[color:var(--bg2)] border border-[color:var(--edge)] text-[color:var(--up)]", children: [
            "logL: ",
            ce.logLik.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 pointer-events-auto", children: [
          /* @__PURE__ */ e.jsxs(le, { variant: "outline", size: "sm", onClick: Q, className: "bg-card gap-1 text-[color:var(--text)] hover:text-[color:var(--text)]", children: [
            u ? /* @__PURE__ */ e.jsx(os, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Bt, { className: "h-4 w-4" }),
            /* @__PURE__ */ e.jsx("span", { className: "hidden md:inline", children: u ? "Pause" : "Play" })
          ] }),
          /* @__PURE__ */ e.jsxs(Ys, { children: [
            /* @__PURE__ */ e.jsx(Xs, { asChild: !0, children: /* @__PURE__ */ e.jsxs(
              le,
              {
                variant: v ? "default" : "outline",
                size: "sm",
                className: `gap-1 font-mono ${v ? "bg-[color:var(--hover)] text-[color:var(--text)] hover:bg-[color:var(--edge)]" : "bg-card text-[color:var(--text)] hover:text-[color:var(--text)]"}`,
                children: [
                  /* @__PURE__ */ e.jsx(as, { className: "h-4 w-4" }),
                  /* @__PURE__ */ e.jsx("span", { className: "hidden md:inline", children: v ? v.label : "Scenarios" }),
                  /* @__PURE__ */ e.jsx(Ae, { className: "h-3 w-3 opacity-60" })
                ]
              }
            ) }),
            /* @__PURE__ */ e.jsx(qs, { align: "end", className: "w-52 p-1 bg-card font-mono", children: ks.map((de) => {
              const ve = v?.id === de.id;
              return /* @__PURE__ */ e.jsxs(
                "button",
                {
                  onClick: () => {
                    R && T(!1), be(de);
                  },
                  className: `w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-[color:var(--hover)] ${ve ? "text-[#c58435]" : "text-[color:var(--text)]"}`,
                  children: [
                    /* @__PURE__ */ e.jsx(as, { className: "h-3.5 w-3.5" }),
                    " ",
                    de.label
                  ]
                },
                de.id
              );
            }) })
          ] }),
          /* @__PURE__ */ e.jsxs(Ys, { children: [
            /* @__PURE__ */ e.jsx(Xs, { asChild: !0, children: /* @__PURE__ */ e.jsxs(
              le,
              {
                variant: R || A ? "default" : "outline",
                size: "sm",
                className: `gap-1 font-mono ${R || A ? "bg-[color:var(--hover)] text-[color:var(--text)] hover:bg-[color:var(--edge)]" : "bg-card text-[color:var(--text)] hover:text-[color:var(--text)]"}`,
                children: [
                  /* @__PURE__ */ e.jsx(as, { className: "h-4 w-4" }),
                  /* @__PURE__ */ e.jsx("span", { className: "hidden md:inline", children: R ? `Tour ${I % ks.length + 1}/${ks.length}` : A ? "Cinema" : "Modes" }),
                  /* @__PURE__ */ e.jsx(Ae, { className: "h-3 w-3 opacity-60" })
                ]
              }
            ) }),
            /* @__PURE__ */ e.jsxs(qs, { align: "end", className: "w-44 p-1 bg-card font-mono", children: [
              /* @__PURE__ */ e.jsxs("button", { onClick: ne, className: "w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-[color:var(--hover)] text-[color:var(--text)]", children: [
                /* @__PURE__ */ e.jsx(jt, { className: "h-3.5 w-3.5" }),
                " Replay"
              ] }),
              /* @__PURE__ */ e.jsxs("button", { onClick: H, className: "w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-[color:var(--hover)] text-[color:var(--text)]", children: [
                /* @__PURE__ */ e.jsx(Js, { className: "h-3.5 w-3.5" }),
                " New seed"
              ] }),
              /* @__PURE__ */ e.jsxs("button", { onClick: me, className: "w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-[color:var(--hover)] text-[color:var(--text)]", children: [
                /* @__PURE__ */ e.jsx(jt, { className: "h-3.5 w-3.5" }),
                " Reset view"
              ] }),
              /* @__PURE__ */ e.jsx("div", { className: "my-1 h-px bg-border" }),
              /* @__PURE__ */ e.jsxs(
                "button",
                {
                  onClick: () => {
                    R ? T(!1) : (F(0), T(!0));
                  },
                  className: `w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-[color:var(--hover)] ${R ? "text-[#c58435]" : "text-[color:var(--text)]"}`,
                  children: [
                    /* @__PURE__ */ e.jsx(as, { className: "h-3.5 w-3.5" }),
                    " ",
                    R ? "Stop tour" : "Guided tour"
                  ]
                }
              ),
              /* @__PURE__ */ e.jsxs(
                "button",
                {
                  onClick: () => z((de) => !de),
                  className: `w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-[color:var(--hover)] ${A ? "text-[#c58435]" : "text-[color:var(--text)]"}`,
                  children: [
                    /* @__PURE__ */ e.jsx(fa, { className: "h-3.5 w-3.5" }),
                    " ",
                    A ? "Exit cinema" : "Cinema mode"
                  ]
                }
              )
            ] })
          ] })
        ] })
      ] }),
      A && /* @__PURE__ */ e.jsx("div", { className: "absolute top-4 right-4 pointer-events-auto z-30", children: /* @__PURE__ */ e.jsxs(
        le,
        {
          variant: "outline",
          size: "sm",
          onClick: () => z(!1),
          className: "bg-card text-[color:var(--text)] hover:text-[color:var(--text)] border-[color:var(--edge)] gap-1",
          children: [
            /* @__PURE__ */ e.jsx(Mn, { className: "h-4 w-4" }),
            "Exit Cinema"
          ]
        }
      ) }),
      /* @__PURE__ */ e.jsx("div", { className: `absolute top-16 md:top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto transition-opacity ${A ? "opacity-0 pointer-events-none" : "opacity-100"}`, children: /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-1 bg-card rounded-lg p-1 border border-border", children: [
        /* @__PURE__ */ e.jsx(
          le,
          {
            variant: S === "posterior" ? "default" : "outline",
            size: "sm",
            onClick: () => h("posterior"),
            className: S === "posterior" ? "font-mono" : "font-mono bg-transparent border-0 text-[color:var(--text)] hover:bg-[color:var(--hover)] hover:text-[color:var(--text)]",
            children: "Posterior"
          }
        ),
        /* @__PURE__ */ e.jsx(
          le,
          {
            variant: S === "prior" ? "default" : "outline",
            size: "sm",
            onClick: () => h("prior"),
            className: S === "prior" ? "font-mono" : "font-mono bg-transparent border-0 text-[color:var(--text)] hover:bg-[color:var(--hover)] hover:text-[color:var(--text)]",
            children: "Prior Samples"
          }
        ),
        /* @__PURE__ */ e.jsx(
          le,
          {
            variant: S === "kernel" ? "default" : "outline",
            size: "sm",
            onClick: () => h("kernel"),
            className: S === "kernel" ? "font-mono" : "font-mono bg-transparent border-0 text-[color:var(--text)] hover:bg-[color:var(--hover)] hover:text-[color:var(--text)]",
            children: "Kernel"
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsxs("div", { className: `absolute left-4 top-20 w-72 space-y-2 pointer-events-auto max-h-[calc(100%-120px)] overflow-y-auto transition-opacity ${A ? "opacity-0 pointer-events-none" : "opacity-100"}`, children: [
        /* @__PURE__ */ e.jsxs($e, { open: d, onOpenChange: x, children: [
          /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card font-mono text-xs text-[color:var(--text)] hover:text-[color:var(--text)]", children: [
            /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ e.jsx(vt, { className: "h-4 w-4" }),
              " PARAMETERS"
            ] }),
            d ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
          ] }) }),
          /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-3 text-[color:var(--text)]", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
                /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[color:var(--dim)]", children: "LENGTH SCALE (ℓ)" }),
                /* @__PURE__ */ e.jsx("span", { className: "text-xs", children: t.lengthScale.toFixed(2) })
              ] }),
              /* @__PURE__ */ e.jsx(xe, { value: [t.lengthScale * 100], onValueChange: ([de]) => s((ve) => ({ ...ve, lengthScale: de / 100 })), min: 20, max: 400, step: 5 }),
              /* @__PURE__ */ e.jsx("div", { className: "text-2xs text-[#808080] font-mono", children: "smoothness — bigger = straighter" })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
                /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[color:var(--dim)]", children: "SIGNAL σ_f" }),
                /* @__PURE__ */ e.jsx("span", { className: "text-xs", children: t.signalSigma.toFixed(2) })
              ] }),
              /* @__PURE__ */ e.jsx(xe, { value: [t.signalSigma * 100], onValueChange: ([de]) => s((ve) => ({ ...ve, signalSigma: de / 100 })), min: 20, max: 250, step: 5 }),
              /* @__PURE__ */ e.jsx("div", { className: "text-2xs text-[#808080] font-mono", children: "vertical amplitude of the prior" })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
                /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[color:var(--dim)]", children: "NOISE σ_n" }),
                /* @__PURE__ */ e.jsx("span", { className: "text-xs", children: t.noiseSigma.toFixed(2) })
              ] }),
              /* @__PURE__ */ e.jsx(xe, { value: [t.noiseSigma * 100], onValueChange: ([de]) => s((ve) => ({ ...ve, noiseSigma: de / 100 })), min: 1, max: 80, step: 1 }),
              /* @__PURE__ */ e.jsx("div", { className: "text-2xs text-[#808080] font-mono", children: "observation noise" })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
                /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[color:var(--dim)]", children: "OBSERVATIONS" }),
                /* @__PURE__ */ e.jsx("span", { className: "text-xs", children: t.numObs })
              ] }),
              /* @__PURE__ */ e.jsx(xe, { value: [t.numObs], onValueChange: ([de]) => s((ve) => ({ ...ve, numObs: de })), min: 2, max: 25, step: 1 })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "space-y-2 pt-2 border-t border-border", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
                /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[color:var(--dim)]", children: "PLAYBACK SPEED" }),
                /* @__PURE__ */ e.jsxs("span", { className: "text-xs", children: [
                  b.toFixed(1),
                  " obs/s"
                ] })
              ] }),
              /* @__PURE__ */ e.jsx(xe, { value: [b * 10], onValueChange: ([de]) => P(de / 10), min: 5, max: 100, step: 5 })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ e.jsxs($e, { open: p, onOpenChange: C, children: [
          /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card font-mono text-xs text-[color:var(--text)] hover:text-[color:var(--text)]", children: [
            /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ e.jsx(Pt, { className: "h-4 w-4" }),
              " VISUALS"
            ] }),
            p ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
          ] }) }),
          /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-4 text-[color:var(--text)]", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[color:var(--dim)] font-mono", children: "TRUE FUNCTION" }),
              /* @__PURE__ */ e.jsx(Me, { checked: n, onCheckedChange: o })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[color:var(--dim)] font-mono", children: "PRIOR SAMPLES" }),
              /* @__PURE__ */ e.jsx(Me, { checked: r, onCheckedChange: i })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
                /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[color:var(--dim)]", children: "BAND OPACITY" }),
                /* @__PURE__ */ e.jsxs("span", { className: "text-xs", children: [
                  (l * 100).toFixed(0),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ e.jsx(xe, { value: [l * 100], onValueChange: ([de]) => c(de / 100), min: 5, max: 60, step: 1 })
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: `absolute right-4 top-20 w-56 pointer-events-auto transition-opacity ${A ? "opacity-0 pointer-events-none" : "opacity-100"}`, children: /* @__PURE__ */ e.jsxs($e, { open: m, onOpenChange: j, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card font-mono text-xs text-[color:var(--text)] hover:text-[color:var(--text)]", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4" }),
            " ",
            S === "prior" ? "PRIOR" : S === "kernel" ? "KERNEL" : "POSTERIOR"
          ] }),
          m ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-3 bg-card border-border space-y-3 text-[color:var(--text)]", children: [
          S === "posterior" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[color:var(--dim)]", children: "OBSERVED" }),
              /* @__PURE__ */ e.jsxs("span", { className: "text-sm", children: [
                ce.observed,
                "/",
                ce.total
              ] })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[color:var(--dim)]", children: "log p(y|X)" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-sm text-[color:var(--up)]", children: ce.logLik.toFixed(2) })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[color:var(--dim)]", children: "AVG 95% CI" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-sm", children: ce.avgCIWidth.toFixed(2) })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[color:var(--dim)]", children: "RMSE vs TRUE" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-sm", children: ce.rmse.toFixed(3) })
            ] }),
            /* @__PURE__ */ e.jsx("div", { className: "pt-2 border-t border-border text-2xs text-[color:var(--dim)] font-mono leading-relaxed", children: "The shaded band is ±2σ. It collapses tight where data arrives and balloons where the kernel can't see the data. Log-likelihood scores the kernel's marginal fit to the observed points." })
          ] }),
          S === "prior" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[color:var(--dim)]", children: "SAMPLES" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-sm", children: "8" })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[color:var(--dim)]", children: "LENGTH SCALE ℓ" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-sm", children: t.lengthScale.toFixed(2) })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[color:var(--dim)]", children: "SIGNAL σ_f" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-sm", children: t.signalSigma.toFixed(2) })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[color:var(--dim)]", children: "PRIOR VAR" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-sm", children: (t.signalSigma * t.signalSigma).toFixed(2) })
            ] }),
            /* @__PURE__ */ e.jsx("div", { className: "pt-2 border-t border-border text-2xs text-[color:var(--dim)] font-mono leading-relaxed", children: "These are functions drawn from the GP prior before any data. Short ℓ → jagged samples; long ℓ → smooth glides. The spread is set by σ_f. This is what the kernel considers plausible before conditioning on observations." })
          ] }),
          S === "kernel" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[color:var(--dim)]", children: "k(0) = σ_f²" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-sm", children: (t.signalSigma * t.signalSigma).toFixed(2) })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[color:var(--dim)]", children: "k(ℓ)" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-sm text-[color:var(--up)]", children: (t.signalSigma * t.signalSigma * Math.exp(-0.5)).toFixed(2) })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[color:var(--dim)]", children: "LENGTH SCALE ℓ" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-sm", children: t.lengthScale.toFixed(2) })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between font-mono", children: [
              /* @__PURE__ */ e.jsx("span", { className: "text-xs text-[color:var(--dim)]", children: "EFFECTIVE RANGE" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-sm", children: (3 * t.lengthScale).toFixed(2) })
            ] }),
            /* @__PURE__ */ e.jsx("div", { className: "pt-2 border-t border-border text-2xs text-[color:var(--dim)] font-mono leading-relaxed", children: "The RBF kernel decides how much two points covary based on their distance. At Δ=ℓ correlation is e^(-½) ≈ 0.61 of peak. Beyond 3ℓ points are essentially uncorrelated — that's the shaded amber band." })
          ] })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "mt-8 p-6 rounded-lg border border-border bg-card", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "text-lg font-semibold font-mono text-[color:var(--text)]", children: "What a Gaussian Process actually does" }),
      /* @__PURE__ */ e.jsxs("p", { className: "mt-2 text-sm text-[color:var(--dim)] leading-relaxed max-w-3xl", children: [
        "Here's the same idea as the canvas above, told with a concrete example: building a yield curve from a handful of bond yields. In each panel the ",
        /* @__PURE__ */ e.jsx("span", { className: "text-[color:var(--text)] font-semibold", children: "solid line" }),
        " is the GP's best guess of the yield at every maturity, the ",
        /* @__PURE__ */ e.jsx("span", { className: "text-[color:var(--text)] font-semibold", children: "shaded band" }),
        " is its ±2σ uncertainty, and the ",
        /* @__PURE__ */ e.jsx("span", { className: "font-semibold", children: "dots" }),
        " are the yields we actually observed."
      ] }),
      /* @__PURE__ */ e.jsx("p", { className: "mt-2 text-sm text-[color:var(--dim)] leading-relaxed max-w-3xl", children: `Watch the band. It pinches tight at every dot and swells in the gaps and past the edges — that's the GP saying "I know here, I'm guessing there". More dots ⇒ tighter curve.` }),
      /* @__PURE__ */ e.jsxs("div", { className: "mt-5 grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ e.jsx(
          hn,
          {
            title: "0 observations — pure prior",
            posterior: Z,
            data: [],
            priorMean: Re,
            isDark: V,
            caption: "No data. The band is a uniform fat strip — every yield between 3% and 5% is equally plausible."
          }
        ),
        /* @__PURE__ */ e.jsx(
          hn,
          {
            title: "2 observations",
            posterior: pe,
            data: [[Se[1], We[1]], [Se[3], We[3]]],
            priorMean: Re,
            isDark: V,
            caption: "Add the 2Y and 10Y yields. Band collapses at those maturities, still fat everywhere else."
          }
        ),
        /* @__PURE__ */ e.jsx(
          hn,
          {
            title: "5 observations",
            posterior: Ze,
            data: Se.map((de, ve) => [de, We[ve]]),
            priorMean: Re,
            isDark: V,
            caption: "Five yields is enough. The whole curve is pinned down with tight uncertainty across every maturity."
          }
        )
      ] }),
      /* @__PURE__ */ e.jsxs("p", { className: "mt-5 text-xs text-[color:var(--dim)] leading-relaxed max-w-3xl", children: [
        "That's it. That's what a Gaussian Process is for — fit a curve through sparse points ",
        /* @__PURE__ */ e.jsx("em", { children: "and tell you how sure it is at every x" }),
        ". The interactive canvas above does the same thing with a synthetic function; these three panels just strip the noise away so you can see the shape of the idea."
      ] })
    ] })
  ] });
}
const Gt = [
  "RSI",
  "MACD",
  "Volume",
  "ATR",
  "BB%B",
  "Lag-1",
  "Lag-2",
  "Ret1d"
], ot = Gt.length, kt = 4, Ls = 70, gs = [
  [5, 6],
  // H1 - price lags   (Lag-1, Lag-2)
  [0, 1],
  // H2 - momentum     (RSI, MACD)
  [2, 3, 4],
  // H3 - volatility   (Volume, ATR, BB%B)
  [7]
  // H4 - returns      (Ret1d)
], Ws = ["H1", "H2", "H3", "H4", "Avg"], va = ["Lags", "Momentum", "Volatility", "Returns"], bt = [
  "#21b3a4",
  // H1 muted teal (var(--up) fallback)
  "#b0b0b0",
  // H2 neutral grey (was blue; terminal has no blue accent)
  "#c58435",
  // H3 muted amber
  "#f0426c",
  // H4 muted rose (var(--down) fallback)
  "#e8e8e8"
  // Avg primary series
], _s = [
  [5, 6],
  // Lag-1 -> Lag-2  (H1)
  [0, 1],
  // RSI   -> MACD   (H2)
  [2, 3],
  // Vol   -> ATR    (H3)
  [7, 0]
  // Ret1d -> RSI    (cross-cluster)
], ei = ["Lag-1→Lag-2", "RSI→MACD", "Vol→ATR", "Ret→RSI"], Yn = [
  bt[0],
  bt[1],
  bt[2],
  bt[3]
];
function Xn(t) {
  let s = t >>> 0;
  return () => (s = Math.imul(s, 1664525) + 1013904223 >>> 0, s / 4294967295);
}
function ti(t) {
  const s = Math.max(...t), n = t.map((r) => Math.exp(r - s)), o = n.reduce((r, i) => r + i, 0);
  return n.map((r) => r / o);
}
function Ts(t, s) {
  const n = Xn(s * 997 + 42), o = Xn(t * 7919 + s * 131 + 1), r = new Set(gs[s] ?? []);
  return Array.from(
    { length: ot },
    (l, c) => Array.from({ length: ot }, (d, x) => {
      const p = (n() * 2 - 1) * 3, C = (o() * 2 - 1) * 1.2, m = r.has(c) && r.has(x) ? 4.5 : 0;
      return p + C + m;
    })
  ).map((l) => ti(l));
}
function ya(t) {
  return Array.from(
    { length: ot },
    (s, n) => Array.from(
      { length: ot },
      (o, r) => t.reduce((i, l) => i + l[n][r], 0) / t.length
    )
  );
}
function un(t, s, n) {
  return t.map((o, r) => o.map((i, l) => i + (s[r][l] - i) * n));
}
function vn(t, s, n) {
  const o = n > s ? (t - s) / (n - s) : 0, r = Math.pow(Math.max(0, Math.min(1, o)), 0.65), i = Math.round(28 + 204 * r);
  return `rgb(${i},${i},${i})`;
}
function si(t, s, n, o) {
  const r = n > s ? (t - s) / (n - s) : 0, i = Math.pow(Math.max(0, Math.min(1, r)), 0.65), l = bt[o], c = parseInt(l.slice(1, 3), 16), d = parseInt(l.slice(3, 5), 16), x = parseInt(l.slice(5, 7), 16), p = Math.round(28 + (c - 28) * i), C = Math.round(28 + (d - 28) * i), m = Math.round(28 + (x - 28) * i);
  return `rgb(${p},${C},${m})`;
}
function yn(t) {
  return -t.flat().reduce((n, o) => n + (o > 1e-12 ? o * Math.log2(o) : 0), 0);
}
function Na(t) {
  return ya(Array.from({ length: kt }, (s, n) => Ts(t, n)));
}
function qn() {
  return Array.from(
    { length: _s.length },
    (t, s) => Array.from({ length: Ls }, (n, o) => Na(o)[_s[s][0]][_s[s][1]])
  );
}
function Zn() {
  return Array.from({ length: Ls }, (t, s) => yn(Na(s)));
}
function ni() {
  const [t, s] = a.useState(
    () => typeof document < "u" && document.documentElement.classList.contains("dark")
  );
  return a.useEffect(() => {
    const n = () => s(document.documentElement.classList.contains("dark")), o = new MutationObserver(n);
    return o.observe(document.documentElement, { attributes: !0, attributeFilter: ["class"] }), window.addEventListener("theme-change", n), () => {
      o.disconnect(), window.removeEventListener("theme-change", n);
    };
  }, []), t;
}
function Un(t, s, n, o, r, i) {
  const { headIdx: l, hov: c, clusterBoxes: d, isDark: x = !0 } = i, p = i.labelL ?? 70, C = i.labelT ?? 62, m = i.fontSize ?? 10, j = r.x1 - r.x0 - p - 4, u = r.y1 - r.y0 - C - 4, N = j / ot, b = u / ot, P = r.x0 + p, f = r.y0 + C;
  for (let v = 0; v < ot; v++)
    for (let $ = 0; $ < ot; $++) {
      const A = s[v][$], z = o > n ? (A - n) / (o - n) : 0, R = P + $ * N, T = f + v * b, I = l >= 0 ? si(A, n, o, l) : vn(A, n, o);
      if (t.fillStyle = I, t.fillRect(R + 0.5, T + 0.5, N - 1, b - 1), N >= 22 && b >= 12) {
        const F = Math.round((0.45 + z * 0.55) * 100) / 100, [S, h, y] = I.match(/\d+/g).map(Number), w = (S * 299 + h * 587 + y * 114) / 1e3 > 140;
        t.fillStyle = w ? `rgba(28,28,28,${F})` : `rgba(232,232,232,${F})`, t.font = `bold ${Math.min(z > 0.55 ? 11 : 10, Math.floor(b * 0.54))}px monospace`, t.textAlign = "center", t.textBaseline = "middle", t.fillText(A.toFixed(2), R + N / 2, T + b / 2);
      }
    }
  if (d && gs.forEach((v, $) => {
    const A = [...v].sort((M, Y) => M - Y), z = A[0], R = A[A.length - 1], T = P + z * N, I = f + z * b, F = (R - z + 1) * N, S = (R - z + 1) * b;
    t.save(), t.strokeStyle = bt[$] + "cc", t.lineWidth = 2, t.strokeRect(T - 0.5, I - 0.5, F + 1, S + 1);
    const h = va[$].split(" ")[0], y = Math.min(F - 4, 52), w = 10;
    t.fillStyle = "rgba(38,38,38,0.9)", t.fillRect(T + 1, I + 1, y, w), t.fillStyle = bt[$], t.font = "bold 7px system-ui, sans-serif", t.textAlign = "left", t.textBaseline = "middle", t.fillText(h, T + 3, I + 6), t.restore();
  }), c) {
    const v = P + c.col * N, $ = f + c.row * b;
    t.save(), t.strokeStyle = "rgba(232,232,232,0.9)", t.lineWidth = 1.5, t.strokeRect(v + 1, $ + 1, N - 2, b - 2), t.fillStyle = "rgba(232,232,232,0.05)", t.fillRect(P, $ + 0.5, j, b - 1), t.fillRect(v + 0.5, f, N - 1, u), t.restore();
  }
  t.font = `bold ${m}px system-ui, sans-serif`, t.textAlign = "right", t.textBaseline = "middle";
  for (let v = 0; v < ot; v++) {
    const $ = f + v * b + b / 2, A = l >= 0 && gs[l]?.includes(v);
    t.fillStyle = A ? bt[l] : x ? "#e8e8e8" : "#171717", t.fillText(Gt[v], P - 5, $);
  }
  const k = Math.max(m - 1, Math.min(m, Math.floor(N * 0.72)));
  t.font = `bold ${k}px system-ui, sans-serif`, t.textAlign = "left", t.textBaseline = "middle";
  for (let v = 0; v < ot; v++) {
    const $ = P + v * N + N / 2, A = l >= 0 && gs[l]?.includes(v);
    t.fillStyle = A ? bt[l] : x ? "#e8e8e8" : "#171717", t.save(), t.translate($, f - 7), t.rotate(-Math.PI / 4), t.fillText(Gt[v], 0, 0), t.restore();
  }
  return { cW: N, cH: b, gX: P, gY: f };
}
function ai() {
  const t = a.useRef(null), s = a.useRef(null), n = a.useRef(), o = a.useRef(), r = a.useRef(0), i = a.useRef(0), l = a.useRef(!0), c = a.useRef(0.8), d = a.useRef(4), x = a.useRef("heatmap"), p = a.useRef(null), C = a.useRef(Zn()), m = a.useRef(qn()), j = a.useRef({ maxW: 0, minW: 0, entropyVal: 0, topPair: "" }), [u, N] = a.useState(!0), [b, P] = a.useState(0.8), [f, k] = a.useState(4), [v, $] = a.useState("heatmap"), [A, z] = a.useState(0), [R, T] = a.useState({ maxW: 0, minW: 0, entropyVal: 0, topPair: "" }), [I, F] = a.useState(null), S = ni();
  a.useEffect(() => {
    l.current = u;
  }, [u]), a.useEffect(() => {
    c.current = b;
  }, [b]), a.useEffect(() => {
    d.current = f;
  }, [f]), a.useEffect(() => {
    x.current = v;
  }, [v]);
  const h = a.useCallback((g, oe) => oe < kt ? Ts(g, oe) : ya(Array.from({ length: kt }, (re, U) => Ts(g, U))), []), y = a.useCallback((g, oe, re, U, ee, E) => {
    const G = Math.round(re * 0.36), J = Math.round(re * 0.6), K = 8, ue = { x0: 0, y0: 0, x1: oe - 18, y1: G };
    Un(g, U, ee, E, ue, {
      headIdx: d.current < kt ? d.current : -1,
      hov: p.current,
      clusterBoxes: !0,
      labelL: 60,
      labelT: 56,
      fontSize: 11,
      isDark: S
    }), g.fillStyle = S ? "#808080" : "#a3a3a3", g.font = "8px system-ui, sans-serif", g.textAlign = "center", g.textBaseline = "middle", g.fillText("Key  (attended to)", oe / 2, 6), g.save(), g.translate(7, G / 2), g.rotate(-Math.PI / 2), g.fillText("Query", 0, 0), g.restore();
    const ce = oe - 16, Q = 54, ne = G - 66, H = g.createLinearGradient(0, Q + ne, 0, Q);
    H.addColorStop(0, vn(ee, ee, E)), H.addColorStop(1, vn(E, ee, E)), g.fillStyle = H, g.fillRect(ce, Q, 5, ne), g.fillStyle = S ? "#808080" : "#a3a3a3", g.font = "6px monospace", g.textAlign = "left", g.textBaseline = "middle", g.fillText(E.toFixed(2), ce + 7, Q + 4), g.fillText(ee.toFixed(2), ce + 7, Q + ne - 4), g.strokeStyle = S ? "#2e2e2e" : "#e5e5e5", g.lineWidth = 1, g.beginPath(), g.moveTo(0, G), g.lineTo(oe, G), g.stroke();
    const me = G + K, be = J - G - K * 2, Re = d.current < kt ? d.current : 4;
    g.fillStyle = S ? "#e8e8e8" : "#171717", g.font = "bold 11px system-ui, sans-serif", g.textAlign = "left", g.textBaseline = "middle", g.fillText("TOP ATTENTION PAIRS", K, me + 9);
    const Se = [];
    for (let ie = 0; ie < ot; ie++)
      for (let he = 0; he < ot; he++)
        Se.push({ row: ie, col: he, w: U[ie][he] });
    Se.sort((ie, he) => he.w - ie.w);
    const We = Math.min(6, Se.length), Be = 100, Z = K + Be + 6, pe = oe - Z - 52, Ze = (be - 22) / We;
    for (let ie = 0; ie < We; ie++) {
      const { row: he, col: Te, w: Ce } = Se[ie], Ne = me + 22 + ie * Ze + Ze / 2, Oe = `${Gt[he]}→${Gt[Te]}`;
      g.fillStyle = S ? "#b0b0b0" : "#171717", g.font = `bold ${Math.min(11, Math.floor(Ze * 0.58))}px system-ui, sans-serif`, g.textAlign = "right", g.textBaseline = "middle", g.fillText(Oe, K + Be, Ne), g.fillStyle = S ? "#2e2e2e" : "#e5e5e5", g.fillRect(Z, Ne - Ze * 0.28, pe, Ze * 0.55), g.fillStyle = bt[Re] + (ie === 0 ? "ff" : "cc"), g.fillRect(Z, Ne - Ze * 0.28, pe * (Ce / (E || 1)), Ze * 0.55), g.fillStyle = S ? "#b0b0b0" : "#171717", g.font = "bold 10px monospace", g.textAlign = "left", g.textBaseline = "middle", g.fillText(Ce.toFixed(3), Z + pe + 4, Ne);
    }
    g.strokeStyle = S ? "#2e2e2e" : "#e5e5e5", g.lineWidth = 1, g.beginPath(), g.moveTo(0, J), g.lineTo(oe, J), g.stroke();
    const de = J + K, ve = re - de - 10, Xe = 40, He = oe - Xe - 88;
    g.fillStyle = S ? "#e8e8e8" : "#171717", g.font = "bold 11px system-ui, sans-serif", g.textAlign = "left", g.textBaseline = "middle", g.fillText("ATTENTION DYNAMICS", Xe, de + 9);
    const De = de + 18, Ee = ve - 22, Pe = Xe, we = He, ft = m.current.flat(), dt = Math.max(...ft, 0.01);
    [0, 0.25, 0.5, 0.75, 1].forEach((ie) => {
      const he = De + Ee * (1 - ie);
      g.strokeStyle = S ? "#2e2e2e" : "#f5f5f5", g.lineWidth = 0.5, g.beginPath(), g.moveTo(Pe, he), g.lineTo(Pe + we, he), g.stroke(), ie > 0 && (g.fillStyle = S ? "#b0b0b0" : "#171717", g.font = "bold 9px monospace", g.textAlign = "right", g.textBaseline = "middle", g.fillText((dt * ie).toFixed(3), Pe - 3, he));
    }), g.strokeStyle = S ? "#3a3a3a" : "#e5e5e5", g.lineWidth = 0.5, g.setLineDash([2, 3]), g.beginPath(), g.moveTo(Pe + we, De), g.lineTo(Pe + we, De + Ee), g.stroke(), g.setLineDash([]), m.current.forEach((ie, he) => {
      if (ie.every((st) => st === 0)) return;
      const Te = Yn[he];
      g.beginPath(), ie.forEach((st, ht) => {
        const nt = Pe + ht / (Ls - 1) * we, at = De + Ee * (1 - st / dt);
        ht === 0 ? g.moveTo(nt, at) : g.lineTo(nt, at);
      }), g.lineTo(Pe + we, De + Ee), g.lineTo(Pe, De + Ee), g.closePath();
      const Ce = g.createLinearGradient(0, De, 0, De + Ee);
      Ce.addColorStop(0, Te + "22"), Ce.addColorStop(1, Te + "00"), g.fillStyle = Ce, g.fill(), g.beginPath(), ie.forEach((st, ht) => {
        const nt = Pe + ht / (Ls - 1) * we, at = De + Ee * (1 - st / dt);
        ht === 0 ? g.moveTo(nt, at) : g.lineTo(nt, at);
      }), g.strokeStyle = Te, g.lineWidth = 1.5, g.stroke();
      const Ne = ie[ie.length - 1], Oe = Pe + we, Ye = De + Ee * (1 - Ne / dt);
      g.beginPath(), g.arc(Oe, Ye, 3, 0, Math.PI * 2), g.fillStyle = Te, g.fill();
    });
    const tt = Pe + we + 8;
    ei.forEach((ie, he) => {
      const Te = De + 12 + he * 20;
      g.fillStyle = Yn[he], g.fillRect(tt, Te - 1, 14, 3), g.fillStyle = S ? "#e8e8e8" : "#171717", g.font = "bold 10px system-ui, sans-serif", g.textAlign = "left", g.textBaseline = "middle", g.fillText(ie, tt + 17, Te);
    }), g.fillStyle = S ? "#808080" : "#a3a3a3", g.font = "7px system-ui, sans-serif", g.textAlign = "center", g.fillText(`← last ${Ls} bars`, Pe + we / 2, De + Ee + 10);
  }, [S]), w = a.useCallback((g, oe, re, U, ee) => {
    const J = oe / 2, K = re / 2;
    for (let ue = 0; ue < kt; ue++) {
      const ce = ue % 2, Q = Math.floor(ue / 2), ne = ce * J, H = Q * K;
      g.fillStyle = "#212121", g.fillRect(ne + 1, H + 1, J - 2, K - 2), g.fillStyle = bt[ue], g.font = "bold 11px system-ui, sans-serif", g.textAlign = "left", g.textBaseline = "top", g.fillText(`${Ws[ue]}: ${va[ue]}`, ne + 8, H + 8);
      const me = Ts(U, ue), be = Ts(U + 1, ue), Re = un(me, be, ee), Se = Re.flat(), We = Math.min(...Se), Be = Math.max(...Se), Z = {
        x0: ne,
        y0: H + 6,
        x1: ne + J - 2,
        y1: H + K - 2
      };
      Un(g, Re, We, Be, Z, {
        headIdx: ue,
        clusterBoxes: !1,
        labelL: 60,
        labelT: 56,
        fontSize: 10,
        isDark: S
      }), g.strokeStyle = "#3a3a3a", g.lineWidth = 1, g.strokeRect(ne + 0.5, H + 0.5, J - 1, K - 1);
    }
  }, [S]), M = a.useCallback((g, oe, re, U) => {
    const ee = oe / 2, E = 12, G = 68, J = Math.floor((re - 54) / ot), K = ee - G - E * 2, ue = d.current < kt ? d.current : 4, ce = bt[ue], Q = Array.from(
      { length: ot },
      (Se, We) => U.reduce((Be, Z) => Be + Z[We], 0) / ot
    ), ne = Array.from(
      { length: ot },
      (Se, We) => U[We].reduce((Be, Z) => Be + Z, 0) / ot
    ), H = Math.max(...Q), me = Math.max(...ne), be = Array.from({ length: ot }, (Se, We) => We).sort((Se, We) => Q[We] - Q[Se]), Re = Array.from({ length: ot }, (Se, We) => We).sort((Se, We) => ne[We] - ne[Se]);
    g.fillStyle = S ? "#808080" : "#a3a3a3", g.font = "bold 9px system-ui, sans-serif", g.textAlign = "left", g.textBaseline = "middle", g.fillText("ATTENTION RECEIVED  (total inbound per feature)", E, 16), g.fillText("ATTENTION GIVEN  (total outbound per feature)", ee + E, 16), be.forEach((Se, We) => {
      const Be = 32 + We * J + J / 2, Z = E + G, pe = K * (Q[Se] / (H || 1));
      g.fillStyle = S ? "#b0b0b0" : "#525252", g.font = `${Math.min(9, J * 0.55)}px system-ui, sans-serif`, g.textAlign = "right", g.textBaseline = "middle", g.fillText(Gt[Se], E + G - 4, Be), g.fillStyle = S ? "#2e2e2e" : "#f5f5f5", g.fillRect(Z, Be - J * 0.3, K, J * 0.6), g.fillStyle = ce + "cc", g.fillRect(Z, Be - J * 0.3, pe, J * 0.6), d.current < kt && gs[d.current]?.includes(Se) && (g.strokeStyle = ce, g.lineWidth = 1, g.strokeRect(Z, Be - J * 0.3, K, J * 0.6)), g.fillStyle = S ? "#808080" : "#a3a3a3", g.font = "7px monospace", g.textAlign = "left", g.textBaseline = "middle", g.fillText(Q[Se].toFixed(3), Z + pe + 3, Be);
    }), g.strokeStyle = S ? "#2e2e2e" : "#e5e5e5", g.lineWidth = 1, g.beginPath(), g.moveTo(ee, 8), g.lineTo(ee, re - 8), g.stroke(), Re.forEach((Se, We) => {
      const Be = 32 + We * J + J / 2, Z = ee + E + G, pe = K * (ne[Se] / (me || 1));
      g.fillStyle = S ? "#b0b0b0" : "#525252", g.font = `${Math.min(9, J * 0.55)}px system-ui, sans-serif`, g.textAlign = "right", g.textBaseline = "middle", g.fillText(Gt[Se], ee + E + G - 4, Be), g.fillStyle = S ? "#2e2e2e" : "#f5f5f5", g.fillRect(Z, Be - J * 0.3, K, J * 0.6), g.fillStyle = ce + "99", g.fillRect(Z, Be - J * 0.3, pe, J * 0.6), d.current < kt && gs[d.current]?.includes(Se) && (g.strokeStyle = ce, g.lineWidth = 1, g.strokeRect(Z, Be - J * 0.3, K, J * 0.6)), g.fillStyle = S ? "#808080" : "#a3a3a3", g.font = "7px monospace", g.textAlign = "left", g.textBaseline = "middle", g.fillText(ne[Se].toFixed(3), Z + pe + 3, Be);
    });
  }, [S]), Y = a.useCallback((g, oe) => {
    const re = t.current;
    if (!re) return;
    const U = re.getContext("2d");
    if (!U) return;
    const ee = window.devicePixelRatio || 1, E = re.width / ee, G = re.height / ee, J = un(h(oe, d.current), h(oe + 1, d.current), g), K = J.flat(), ue = Math.min(...K), ce = Math.max(...K), Q = yn(J);
    let ne = 0, H = 0;
    K.forEach((Re, Se) => {
      Re > J[ne][H] && (ne = Math.floor(Se / ot), H = Se % ot);
    });
    const me = `${Gt[ne]} → ${Gt[H]}`;
    j.current = { maxW: ce, minW: ue, entropyVal: Q, topPair: me }, U.fillStyle = S ? "#1c1c1c" : "#fafafa", U.fillRect(0, 0, E, G);
    const be = x.current;
    be === "heatmap" ? y(U, E, G, J, ue, ce) : be === "heads" ? w(U, E, G, oe, g) : M(U, E, G, J), U.fillStyle = S ? "#2e2e2e" : "#e5e5e5", U.fillRect(0, G - 3, E, 3), U.fillStyle = bt[d.current < kt ? d.current : 4], U.fillRect(0, G - 3, E * g, 3);
  }, [S, h, y, w, M]), _ = a.useCallback((g) => {
    o.current || (o.current = g);
    const oe = g - o.current;
    if (o.current = g, l.current && (i.current += oe / (1e3 / c.current), i.current >= 1)) {
      i.current -= 1, r.current += 1, z((E) => E + 1);
      const U = h(r.current, d.current), ee = yn(U);
      C.current = [...C.current.slice(-69), ee], _s.forEach(([E, G], J) => {
        const K = U[E][G];
        m.current[J] = [...m.current[J].slice(-69), K];
      });
    }
    Y(i.current, r.current);
    const re = j.current;
    T({ maxW: re.maxW, minW: re.minW, entropyVal: re.entropyVal, topPair: re.topPair }), n.current = requestAnimationFrame(_);
  }, [Y, h]);
  a.useEffect(() => (n.current = requestAnimationFrame(_), () => {
    n.current && cancelAnimationFrame(n.current);
  }), [_]), a.useEffect(() => {
    const g = t.current, oe = s.current;
    if (!g || !oe) return;
    const re = () => {
      const ee = window.devicePixelRatio || 1, E = oe.getBoundingClientRect(), G = Math.min(Math.max(E.width * 1.6, 680), window.innerHeight * 0.88, 1080);
      g.width = E.width * ee, g.height = G * ee, g.style.width = `${E.width}px`, g.style.height = `${G}px`;
      const J = g.getContext("2d");
      J && (J.setTransform(1, 0, 0, 1, 0, 0), J.scale(ee, ee));
    };
    re();
    const U = new ResizeObserver(re);
    return U.observe(oe), () => U.disconnect();
  }, []);
  const se = a.useCallback((g) => {
    if (x.current !== "heatmap") {
      p.current = null, F(null);
      return;
    }
    const oe = t.current;
    if (!oe) return;
    const re = oe.getBoundingClientRect(), U = g.clientX - re.left, ee = g.clientY - re.top, E = re.width, J = re.height * 0.36, K = 56, ue = 52, ce = E - 18 - K - 4, Q = J - ue - 4, ne = K, H = ue, me = ce / ot, be = Q / ot;
    if (U < ne || U > ne + ce || ee < H || ee > J) {
      p.current = null, F(null);
      return;
    }
    const Re = Math.floor((U - ne) / me), Se = Math.floor((ee - H) / be);
    if (Re < 0 || Re >= ot || Se < 0 || Se >= ot) {
      p.current = null, F(null);
      return;
    }
    const We = un(
      h(r.current, d.current),
      h(r.current + 1, d.current),
      i.current
    );
    p.current = { row: Se, col: Re }, F({ row: Se, col: Re, w: We[Se][Re] });
  }, [h]), V = a.useCallback(() => {
    p.current = null, F(null);
  }, []), W = () => N((g) => !g), te = () => {
    l.current || (i.current = 0, r.current += 1, z((g) => g + 1));
  }, O = () => {
    r.current = 0, i.current = 0, C.current = Zn(), m.current = qn(), z(0), N(!1), o.current = void 0;
  }, L = (g) => {
    P(g[0]), c.current = g[0];
  }, D = (g) => {
    k(g), d.current = g;
  }, X = (g) => {
    $(g), x.current = g;
  }, B = [
    { id: "heatmap", label: "Heatmap" },
    { id: "heads", label: "Head Compare" },
    { id: "profile", label: "Feature Profile" }
  ];
  return /* @__PURE__ */ e.jsxs(Fe, { className: "bg-background border-border overflow-hidden", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex flex-wrap items-center gap-2 px-4 py-2.5 border-b border-border", children: [
      /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-1 mr-2", children: B.map((g) => /* @__PURE__ */ e.jsx(
        "button",
        {
          onClick: () => X(g.id),
          className: `px-3 py-1 rounded text-xs font-medium transition-colors ${v === g.id ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"}`,
          children: g.label
        },
        g.id
      )) }),
      /* @__PURE__ */ e.jsx("div", { className: "w-px h-4 bg-border" }),
      v !== "heads" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs text-muted-foreground mr-0.5", children: "Head" }),
          Ws.map((g, oe) => /* @__PURE__ */ e.jsx(
            "button",
            {
              onClick: () => D(oe),
              className: "px-2 py-0.5 rounded text-xs font-mono transition-colors",
              style: {
                // Selected chip: neutral hover bg + head-coloured text, no solid colour fill
                background: f === oe ? "var(--hover)" : "",
                color: f === oe ? bt[oe] : "",
                opacity: f === oe ? 1 : 0.6
              },
              children: g
            },
            g
          ))
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "w-px h-4 bg-border" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e.jsx("span", { className: "text-xs text-muted-foreground", children: "Speed" }),
        /* @__PURE__ */ e.jsx("div", { className: "w-20", children: /* @__PURE__ */ e.jsx(xe, { min: 0.2, max: 3, step: 0.1, value: [b], onValueChange: L }) }),
        /* @__PURE__ */ e.jsxs("span", { className: "text-xs font-mono text-muted-foreground w-7", children: [
          b.toFixed(1),
          "x"
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "w-px h-4 bg-border" }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ e.jsx(le, { size: "sm", variant: "ghost", className: "h-7 w-7 p-0", onClick: W, children: u ? /* @__PURE__ */ e.jsx(os, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ e.jsx(Bt, { className: "h-3.5 w-3.5" }) }),
        /* @__PURE__ */ e.jsx(le, { size: "sm", variant: "ghost", className: "h-7 w-7 p-0", onClick: te, disabled: u, children: /* @__PURE__ */ e.jsx(Ga, { className: "h-3.5 w-3.5" }) }),
        /* @__PURE__ */ e.jsx(le, { size: "sm", variant: "ghost", className: "h-7 w-7 p-0", onClick: O, children: /* @__PURE__ */ e.jsx(jt, { className: "h-3.5 w-3.5" }) })
      ] }),
      /* @__PURE__ */ e.jsx("span", { className: "ml-3 text-xs font-medium text-muted-foreground/70 tracking-wide hidden sm:inline", children: "Transformer Attention" }),
      /* @__PURE__ */ e.jsxs("div", { className: "ml-auto flex items-center gap-1.5", children: [
        u && /* @__PURE__ */ e.jsxs("span", { className: "relative flex h-2 w-2", children: [
          /* @__PURE__ */ e.jsx(
            "span",
            {
              className: "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              style: { background: bt[f < kt ? f : 4] }
            }
          ),
          /* @__PURE__ */ e.jsx(
            "span",
            {
              className: "relative inline-flex rounded-full h-2 w-2",
              style: { background: bt[f < kt ? f : 4] }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("span", { className: "text-xs font-mono text-muted-foreground", children: u ? "LIVE" : `bar ${A}` })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { ref: s, className: "relative w-full px-2 pt-1 pb-0", children: [
      /* @__PURE__ */ e.jsx(
        "canvas",
        {
          ref: t,
          className: "w-full block",
          onMouseMove: se,
          onMouseLeave: V
        }
      ),
      v === "heatmap" && I && /* @__PURE__ */ e.jsxs("div", { className: "pointer-events-none absolute top-2 right-3 bg-popover border border-border rounded px-3 py-2 text-xs font-mono shadow-lg", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "text-muted-foreground mb-0.5", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-foreground font-semibold", children: Gt[I.row] }),
          " attends to ",
          /* @__PURE__ */ e.jsx("span", { className: "text-foreground font-semibold", children: Gt[I.col] })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "text-xl font-bold", style: { color: bt[f < kt ? f : 4] }, children: I.w.toFixed(4) }),
        /* @__PURE__ */ e.jsxs("div", { className: "text-muted-foreground text-2xs mt-0.5", children: [
          Ws[f],
          " softmax weight"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2 border-t border-border bg-muted/20 font-mono text-xs", children: [
      /* @__PURE__ */ e.jsxs("span", { className: "text-muted-foreground", children: [
        "t ",
        /* @__PURE__ */ e.jsx("span", { className: "text-foreground font-semibold", children: A })
      ] }),
      /* @__PURE__ */ e.jsxs("span", { className: "text-muted-foreground", children: [
        "Head ",
        /* @__PURE__ */ e.jsx("span", { className: "font-semibold", style: { color: bt[f < kt ? f : 4] }, children: Ws[f] })
      ] }),
      /* @__PURE__ */ e.jsxs("span", { className: "text-muted-foreground", children: [
        "Max ",
        /* @__PURE__ */ e.jsx("span", { className: "text-foreground", children: R.maxW.toFixed(4) })
      ] }),
      /* @__PURE__ */ e.jsxs("span", { className: "text-muted-foreground", children: [
        "Min ",
        /* @__PURE__ */ e.jsx("span", { className: "text-foreground", children: R.minW.toFixed(4) })
      ] }),
      /* @__PURE__ */ e.jsxs("span", { className: "text-muted-foreground", children: [
        "Entropy ",
        /* @__PURE__ */ e.jsx("span", { className: "text-foreground", children: R.entropyVal.toFixed(2) }),
        /* @__PURE__ */ e.jsx("span", { className: "text-muted-foreground/50", children: " bits" })
      ] }),
      v === "heatmap" && R.topPair && /* @__PURE__ */ e.jsxs("span", { className: "text-muted-foreground", children: [
        "Top ",
        /* @__PURE__ */ e.jsx("span", { className: "text-foreground", children: R.topPair })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "ml-auto text-muted-foreground/50 text-2xs", children: "A = softmax(QKᵀ / √dₖ)  H=4  dₖ=3" })
    ] })
  ] });
}
const Tt = 60, us = 16, ri = 30;
function oi() {
  const [t, s] = a.useState(() => typeof document > "u" ? !1 : document.documentElement.classList.contains("dark"));
  return a.useEffect(() => {
    if (typeof document > "u") return;
    const n = () => s(document.documentElement.classList.contains("dark")), o = new MutationObserver(n);
    return o.observe(document.documentElement, { attributes: !0, attributeFilter: ["class"] }), window.addEventListener("theme-change", n), () => {
      o.disconnect(), window.removeEventListener("theme-change", n);
    };
  }, []), t;
}
function ii(t) {
  return function() {
    t |= 0, t = t + 1831565813 | 0;
    let s = Math.imul(t ^ t >>> 15, 1 | t);
    return s = s + Math.imul(s ^ s >>> 7, 61 | s) ^ s, ((s ^ s >>> 14) >>> 0) / 4294967296;
  };
}
function li(t) {
  const s = 0.1111111111111111, n = Math.sin((t + 1) * s / 2) * Math.sin(t * s / 2) / Math.sin(s / 2);
  return 100 + 0.12 * (t + 1) + 0.288 * n;
}
function ci(t, s) {
  const n = ii((t ^ Math.imul(s, 2654435761)) >>> 0);
  let o = 0, r = 0;
  for (; o === 0; ) o = n();
  for (; r === 0; ) r = n();
  return Math.sqrt(-2 * Math.log(o)) * Math.cos(2 * Math.PI * r);
}
function xi(t, s, n) {
  const o = [];
  for (let r = s; r <= n; r++) {
    const i = li(r);
    o.push({ t: r, truth: i, obs: i + ci(t, r) * 1.4 });
  }
  return o;
}
function di(t, s, n) {
  let o = t[0], r = 0, i = 1, l = 0, c = 0, d = 1;
  const x = [];
  for (let P = 0; P < t.length; P++) {
    const f = o + r, k = r, v = i + l + c + d, $ = l + d, A = c + d, z = d, R = v + s, T = $, I = A, F = z + s, S = t[P] - f, h = R + n, y = R / h, w = I / h;
    o = f + y * S, r = k + w * S, i = (1 - y) * R, l = (1 - y) * T, c = I - w * R, d = F - w * T, x.push({
      t: P,
      obs: t[P],
      level: o,
      trend: r,
      std: Math.sqrt(Math.max(i, 1e-9)),
      predStd: Math.sqrt(Math.max(R, 1e-9)),
      innov: S,
      innovStd: Math.sqrt(Math.max(h, 1e-9)),
      gain: y
    });
  }
  const p = [];
  let C = o, m = r, j = i, u = l, N = c, b = d;
  for (let P = 1; P <= us; P++) {
    C = C + m;
    const f = j + u + N + b, k = u + b, v = N + b, $ = b;
    j = f + s, u = k, N = v, b = $ + s, p.push({ t: t.length - 1 + P, level: C, std: Math.sqrt(Math.max(j, 1e-9)) });
  }
  return { steps: x, forecast: p };
}
function mi() {
  const [t, s] = a.useState(0.02), [n, o] = a.useState(1.5), [r, i] = a.useState(!0), [l, c] = a.useState(!0), [d, x] = a.useState(0), [p, C] = a.useState(20260531), [m, j] = a.useState(Tt - 1), u = a.useRef(null), N = oi(), b = (Z) => {
    c(!1), s(Z);
  }, P = (Z) => {
    c(!1), o(Z);
  }, f = a.useMemo(() => N ? {
    grid: "#2e2e2e",
    axis: "#b0b0b0",
    // Faint grey dashed reference line for the hidden true level.
    truth: "rgba(176,176,176,0.60)",
    // Faint grey dots for observations: background noise, not a signal.
    obs: "#808080",
    band: "rgba(232,232,232,0.10)",
    // Neutral near-white band; alpha lowered vs the old steel blue because
    // white reads brighter than blue at equal alpha on the dark ground.
    spread: "rgba(232,232,232,0.14)",
    // Off-white estimate line: the primary signal in the chart.
    estimate: "#e8e8e8",
    marker: "#e8e8e8",
    // Muted amber forecast: the second data dimension, kept distinguishable.
    forecast: "#c58435",
    forecastBand: "rgba(197,132,53,0.13)",
    accent: "#c58435",
    nowLine: "rgba(176,176,176,0.5)"
  } : {
    grid: "rgba(28,28,28,0.10)",
    axis: "#606060",
    // Grey dashed reference line for the hidden true level.
    truth: "rgba(96,96,96,0.60)",
    // Grey dots for observations in light mode.
    obs: "#707070",
    band: "rgba(28,28,28,0.08)",
    // Neutral dark band for the ±2σ band in light mode.
    spread: "rgba(28,28,28,0.12)",
    // Near-black estimate line for light mode.
    estimate: "#1c1c1c",
    marker: "#1c1c1c",
    // Same muted amber forecast in light mode.
    forecast: "#c58435",
    forecastBand: "rgba(197,132,53,0.15)",
    accent: "#c58435",
    nowLine: "rgba(96,96,96,0.5)"
  }, [N]), k = Math.floor(m), v = m - (Tt - 1), $ = Math.max(0, Math.ceil(v)), A = Math.max(0, $ - ri), z = a.useMemo(() => xi(p, A, k), [p, A, k]), R = a.useMemo(() => z.map((Z) => Z.obs), [z]), T = a.useMemo(
    () => di(R, t, n),
    [R, t, n]
  ), I = a.useMemo(() => T.steps.map((Z) => ({ ...Z, t: Z.t + A })), [T, A]), F = a.useMemo(
    () => z.filter((Z) => Z.t >= $).map((Z) => ({ t: Z.t, v: Z.truth })),
    [z, $]
  );
  a.useEffect(() => {
    if (!l || !r) return;
    const Z = setInterval(() => x((pe) => pe + 0.05), 50);
    return u.current = Z, () => clearInterval(Z);
  }, [l, r]), a.useEffect(() => {
    if (!l) return;
    const Z = 1.5 + 1.45 * Math.sin(d), pe = 0.06 + 0.055 * Math.sin(d * 1.7 + 1.2);
    o(Math.max(0.05, Z)), s(Math.max(1e-3, pe));
  }, [d, l]), a.useEffect(() => {
    if (!r) return;
    let Z = 0, pe = null;
    const Ze = 14, de = (ve) => {
      pe === null && (pe = ve);
      const Xe = (ve - pe) / 1e3;
      pe = ve, j((He) => He + Ze * Xe), Z = requestAnimationFrame(de);
    };
    return Z = requestAnimationFrame(de), () => cancelAnimationFrame(Z);
  }, [r]);
  const S = a.useMemo(() => I.filter((Z) => Z.t >= $), [I, $]), h = S.length ? S[S.length - 1] : null, y = a.useMemo(() => {
    if (!h) return [];
    const Z = [];
    for (let pe = 1; pe <= us; pe++)
      Z.push({
        t: h.t + pe,
        level: h.level + pe * h.trend,
        std: Math.sqrt(h.std * h.std * (1 + pe * 0.4) + t * pe)
      });
    return Z;
  }, [h, t]), w = 960, M = 400, Y = 56, _ = 30, se = Tt - 1 + us, V = (Z) => Y + Z / se * (w - 2 * Y), W = (Z) => V(Z - v), { yMin: te, yMax: O } = a.useMemo(() => {
    let Z = 1 / 0, pe = -1 / 0;
    S.forEach((de) => {
      Z = Math.min(Z, de.obs, de.level - 2 * de.std), pe = Math.max(pe, de.obs, de.level + 2 * de.std);
    }), y.forEach((de) => {
      Z = Math.min(Z, de.level - 2 * de.std), pe = Math.max(pe, de.level + 2 * de.std);
    }), (!isFinite(Z) || !isFinite(pe)) && (Z = 98, pe = 102);
    const Ze = (pe - Z) * 0.08 || 1;
    return { yMin: Z - Ze, yMax: pe + Ze };
  }, [S, y]), L = (Z) => _ + (1 - (Z - te) / (O - te)) * (M - 2 * _), D = a.useMemo(() => {
    const Z = [];
    for (let pe = 0; pe <= 4; pe++) Z.push(te + pe / 4 * (O - te));
    return Z;
  }, [te, O]), X = a.useMemo(() => [0, 15, 30, 45, Tt - 1, Tt - 1 + us], []), B = S.map((Z, pe) => `${pe === 0 ? "M" : "L"} ${W(Z.t)} ${L(Z.level)}`).join(" "), g = [
    ...S.map((Z) => `${W(Z.t)} ${L(Z.level + 2 * Z.std)}`),
    ...S.slice().reverse().map((Z) => `${W(Z.t)} ${L(Z.level - 2 * Z.std)}`)
  ], oe = h ? `M ${W(h.t)} ${L(h.level)} ` + y.map((Z) => `L ${W(Z.t)} ${L(Z.level)}`).join(" ") : "", re = h ? [
    `${W(h.t)} ${L(h.level)}`,
    ...y.map((Z) => `${W(Z.t)} ${L(Z.level + 2 * Z.std)}`),
    ...y.slice().reverse().map((Z) => `${W(Z.t)} ${L(Z.level - 2 * Z.std)}`),
    `${W(h.t)} ${L(h.level)}`
  ] : [], U = h ? h.gain : 0, ee = h ? h.innov : 0, E = 380, G = 180, J = 36, K = 24, ue = Tt - 1, ce = (Z) => J + (Z - v) / ue * (E - 2 * J), Q = a.useMemo(() => {
    let Z = 0;
    return S.forEach((pe) => {
      Z = Math.max(Z, 2 * pe.innovStd, Math.abs(pe.innov));
    }), Math.max(Z * 1.15, 0.5);
  }, [S]), ne = (Z) => K + (1 - (Z + Q) / (2 * Q)) * (G - 2 * K), H = [
    ...S.map((Z) => `${ce(Z.t)} ${ne(2 * Z.innovStd)}`),
    ...S.slice().reverse().map((Z) => `${ce(Z.t)} ${ne(-2 * Z.innovStd)}`)
  ], me = N ? "232,232,232" : "28,28,28", be = 9, Re = a.useMemo(() => {
    const Z = [], pe = (E - 2 * J) / ue * 1.08, Ze = (G - 2 * K) / be, de = O - te || 1;
    return S.forEach((ve) => {
      const Xe = ce(ve.t);
      for (let He = 0; He < be; He++) {
        const De = O - (He + 0.5) / be * de, Ee = ve.std > 1e-9 ? (De - ve.level) / ve.std : (De - ve.level) * 1e9, Pe = Math.exp(-0.5 * Ee * Ee);
        Pe < 0.05 || Z.push({ x: Xe - pe / 2, y: K + He * Ze, w: pe, h: Ze, a: Pe });
      }
    }), Z;
  }, [S, te, O]), Se = a.useMemo(() => {
    let Z = 0;
    return S.forEach((pe) => {
      Z = Math.max(Z, pe.predStd * pe.predStd);
    }), Math.max(Z * 1.1, 1e-6);
  }, [S]), We = (Z) => K + (1 - Z / Se) * (G - 2 * K), Be = S.length ? "M " + S.map(
    (Z) => `${ce(Z.t)} ${We(Z.predStd * Z.predStd)} L ${ce(Z.t)} ${We(Z.std * Z.std)}`
  ).join(" L ") : "";
  return /* @__PURE__ */ e.jsxs(Fe, { className: "p-4 sm:p-5 bg-card border-border", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between mb-4 flex-wrap gap-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx("h3", { className: "text-base font-semibold text-foreground", children: "Kalman Filter" }),
          /* @__PURE__ */ e.jsx("p", { className: "text-xs text-muted-foreground", children: "Recursive denoiser. Recovers the unknown true price from noisy ticks without lagging like a moving average." })
        ] }),
        /* @__PURE__ */ e.jsxs("span", { className: "hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-border text-xs font-mono text-foreground", children: [
          /* @__PURE__ */ e.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" }),
          n > 2.2 ? "SMOOTHING" : n < 0.9 ? "TRACKING" : "BALANCED"
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e.jsx(le, { size: "sm", variant: "secondary", onClick: () => C((Z) => Z + 1), children: "New series" }),
        /* @__PURE__ */ e.jsx(le, { size: "sm", variant: l ? "default" : "secondary", onClick: () => c((Z) => !Z), children: l ? "Auto-tune: on" : "Auto-tune: off" }),
        /* @__PURE__ */ e.jsx(le, { size: "sm", variant: r ? "secondary" : "default", onClick: () => i((Z) => !Z), children: r ? "Pause" : "Play" })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "mb-4 rounded-md border border-border bg-muted/30 p-4 sm:p-5 text-base text-muted-foreground leading-relaxed", children: [
      /* @__PURE__ */ e.jsx("span", { className: "block mb-1 text-lg sm:text-xl text-foreground font-semibold", children: "How it works" }),
      "Each tick the filter does two things: a ",
      /* @__PURE__ */ e.jsx("span", { className: "text-foreground font-medium", children: "predict" }),
      " step projects the previous estimate forward (state = level + trend), then an ",
      /* @__PURE__ */ e.jsx("span", { className: "text-foreground font-medium", children: "update" }),
      " step folds in the new observation, weighted by the Kalman gain K. K is the optimal trade-off between the model's variance and the measurement's variance — if the model is more certain, K is small and the price barely nudges the estimate; if the measurement is more certain, K is large and the estimate snaps onto the tick. Q (process noise) and R (measurement noise) set that balance."
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "w-full rounded-md border border-border bg-background p-1", children: /* @__PURE__ */ e.jsxs("svg", { viewBox: `0 0 ${w} ${M}`, className: "w-full h-auto", preserveAspectRatio: "xMidYMid meet", children: [
      D.map((Z, pe) => /* @__PURE__ */ e.jsxs("g", { children: [
        /* @__PURE__ */ e.jsx("line", { x1: Y, x2: w - Y, y1: L(Z), y2: L(Z), stroke: f.grid, strokeWidth: 1 }),
        /* @__PURE__ */ e.jsx("text", { x: Y - 8, y: L(Z) + 3, textAnchor: "end", fill: f.axis, fontSize: "10", fontFamily: "monospace", children: Z.toFixed(1) })
      ] }, pe)),
      /* @__PURE__ */ e.jsx("text", { x: 14, y: M / 2, fill: f.axis, fontSize: "10", fontFamily: "monospace", textAnchor: "middle", transform: `rotate(-90 14 ${M / 2})`, children: "Price" }),
      /* @__PURE__ */ e.jsx("line", { x1: Y, x2: w - Y, y1: M - _, y2: M - _, stroke: f.axis, strokeWidth: 1 }),
      X.map((Z, pe) => {
        const Ze = Z === Tt - 1, de = Z === Tt - 1 + us, ve = Ze ? "now" : de ? `+${us}` : `${Z}`;
        return /* @__PURE__ */ e.jsxs("g", { children: [
          /* @__PURE__ */ e.jsx("line", { x1: V(Z), x2: V(Z), y1: M - _, y2: M - _ + 4, stroke: f.axis, strokeWidth: 1 }),
          /* @__PURE__ */ e.jsx("text", { x: V(Z), y: M - _ + 15, textAnchor: "middle", fill: f.axis, fontSize: "10", fontFamily: "monospace", children: ve })
        ] }, pe);
      }),
      /* @__PURE__ */ e.jsx("text", { x: w - Y, y: M - 4, textAnchor: "end", fill: f.axis, fontSize: "10", fontFamily: "monospace", children: "tick →" }),
      h && /* @__PURE__ */ e.jsx("line", { x1: W(h.t), x2: W(h.t), y1: _, y2: M - _, stroke: f.nowLine, strokeWidth: 1, strokeDasharray: "3 3" }),
      re.length > 0 && /* @__PURE__ */ e.jsx("polygon", { points: re.join(" "), fill: f.forecastBand, stroke: "none" }),
      /* @__PURE__ */ e.jsx("polygon", { points: g.join(" "), fill: f.spread, stroke: "none" }),
      /* @__PURE__ */ e.jsx(
        "path",
        {
          d: F.map((Z, pe) => `${pe === 0 ? "M" : "L"} ${W(Z.t)} ${L(Z.v)}`).join(" "),
          fill: "none",
          stroke: f.truth,
          strokeWidth: 1,
          strokeDasharray: "2 3"
        }
      ),
      S.map((Z, pe) => /* @__PURE__ */ e.jsx("circle", { cx: W(Z.t), cy: L(Z.obs), r: 2.4, fill: f.obs }, pe)),
      oe && /* @__PURE__ */ e.jsx("path", { d: oe, fill: "none", stroke: f.forecast, strokeWidth: 1.75, strokeDasharray: "5 4" }),
      /* @__PURE__ */ e.jsx("path", { d: B, fill: "none", stroke: f.estimate, strokeWidth: 2.25 }),
      h && /* @__PURE__ */ e.jsx("circle", { cx: W(h.t), cy: L(h.level), r: 4, fill: f.marker, stroke: f.estimate, strokeWidth: 1 })
    ] }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(Rs, { color: f.obs, shape: "dot", label: "Observed price" }),
      /* @__PURE__ */ e.jsx(Rs, { color: f.estimate, shape: "line", label: "Filtered estimate" }),
      /* @__PURE__ */ e.jsx(Rs, { color: N ? "rgba(232,232,232,0.55)" : "rgba(28,28,28,0.50)", shape: "band", label: "±2σ uncertainty" }),
      /* @__PURE__ */ e.jsx(Rs, { color: f.forecast, shape: "dash", label: "Forecast" }),
      /* @__PURE__ */ e.jsx(Rs, { color: f.truth, shape: "dash", label: "Hidden true level" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "mt-4 grid grid-cols-1 lg:grid-cols-3 gap-3", children: [
      /* @__PURE__ */ e.jsx(fn, { title: "Innovation residuals", hint: "obs − predicted. Should sit inside the ±2σ band with no drift. Drift outside = Q or R is mis-tuned.", children: /* @__PURE__ */ e.jsxs("svg", { viewBox: `0 0 ${E} ${G}`, className: "w-full h-auto", children: [
        H.length > 0 && /* @__PURE__ */ e.jsx("polygon", { points: H.join(" "), fill: f.band, stroke: "none" }),
        /* @__PURE__ */ e.jsx("line", { x1: J, x2: E - J, y1: ne(0), y2: ne(0), stroke: f.axis, strokeWidth: 1, strokeDasharray: "2 3" }),
        S.map((Z, pe) => /* @__PURE__ */ e.jsx("line", { x1: ce(Z.t), x2: ce(Z.t), y1: ne(0), y2: ne(Z.innov), stroke: f.estimate, strokeWidth: 1, opacity: 0.6 }, pe)),
        h && /* @__PURE__ */ e.jsx("circle", { cx: ce(h.t), cy: ne(h.innov), r: 2.8, fill: f.marker, stroke: f.estimate, strokeWidth: 0.75 }),
        /* @__PURE__ */ e.jsx(
          pn,
          {
            c: f,
            SW: E,
            SHs: G,
            sPadX: J,
            sPadY: K,
            yTop: Q,
            yBot: -Q,
            yLabel: "innov"
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(fn, { title: "Predictive distribution", hint: "Each column is the filter's probability over price at that step, N(level, σ²). The bright band is the most likely price; it widens as uncertainty grows.", children: /* @__PURE__ */ e.jsxs("svg", { viewBox: `0 0 ${E} ${G}`, className: "w-full h-auto", children: [
        Re.map((Z, pe) => /* @__PURE__ */ e.jsx(
          "rect",
          {
            x: Z.x,
            y: Z.y,
            width: Z.w,
            height: Z.h,
            fill: `rgba(${me},${Math.min(0.85, Z.a * 0.9).toFixed(3)})`
          },
          pe
        )),
        h && /* @__PURE__ */ e.jsx(
          "circle",
          {
            cx: ce(h.t),
            cy: K + (1 - (h.level - te) / (O - te || 1)) * (G - 2 * K),
            r: 2.6,
            fill: f.marker,
            stroke: f.estimate,
            strokeWidth: 0.75
          }
        ),
        /* @__PURE__ */ e.jsx(
          pn,
          {
            c: f,
            SW: E,
            SHs: G,
            sPadX: J,
            sPadY: K,
            yTop: O,
            yBot: te,
            yLabel: "price"
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(fn, { title: "Variance (predict ↔ update)", hint: "Each predict step adds Q (variance rises); each update folds in a tick (variance drops). The sawtooth is the filter breathing.", children: /* @__PURE__ */ e.jsxs("svg", { viewBox: `0 0 ${E} ${G}`, className: "w-full h-auto", children: [
        /* @__PURE__ */ e.jsx("line", { x1: J, x2: E - J, y1: G - K, y2: G - K, stroke: f.axis, strokeWidth: 1 }),
        Be && /* @__PURE__ */ e.jsx("path", { d: Be, fill: "none", stroke: f.accent, strokeWidth: 1.5 }),
        S.map((Z, pe) => /* @__PURE__ */ e.jsx("circle", { cx: ce(Z.t), cy: We(Z.std * Z.std), r: 1.5, fill: f.obs }, pe)),
        /* @__PURE__ */ e.jsx(
          pn,
          {
            c: f,
            SW: E,
            SHs: G,
            sPadX: J,
            sPadY: K,
            yTop: Se,
            yBot: 0,
            yLabel: "σ²"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs", children: [
      /* @__PURE__ */ e.jsx(As, { label: "Kalman gain K", value: U.toFixed(3) }),
      /* @__PURE__ */ e.jsx(As, { label: "Innovation", value: ee.toFixed(2) }),
      /* @__PURE__ */ e.jsx(As, { label: "Estimate ±2σ", value: h ? (2 * h.std).toFixed(2) : "0.00" }),
      /* @__PURE__ */ e.jsx(As, { label: "Process noise Q", value: t.toFixed(3) }),
      /* @__PURE__ */ e.jsx(As, { label: "Measurement noise R", value: n.toFixed(2) })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "mt-5 space-y-4", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mb-1.5", children: [
          /* @__PURE__ */ e.jsx("span", { children: "Process Noise Q (model trust)" }),
          /* @__PURE__ */ e.jsx("span", { className: "font-mono text-foreground", children: t.toFixed(3) })
        ] }),
        /* @__PURE__ */ e.jsx(
          xe,
          {
            min: 1e-3,
            max: 0.4,
            step: 1e-3,
            value: [t],
            onValueChange: (Z) => b(Z[0])
          }
        )
      ] }),
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mb-1.5", children: [
          /* @__PURE__ */ e.jsx("span", { children: "Measurement Noise R (price trust)" }),
          /* @__PURE__ */ e.jsx("span", { className: "font-mono text-foreground", children: n.toFixed(2) })
        ] }),
        /* @__PURE__ */ e.jsx(
          xe,
          {
            min: 0.05,
            max: 6,
            step: 0.05,
            value: [n],
            onValueChange: (Z) => P(Z[0])
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Low Q with high R gives a smooth, lagging estimate. High Q with low R snaps the estimate onto every tick. Watch the residual band: when Q or R is mistuned, the innovations drift outside ±2σ." })
    ] })
  ] });
}
function As({ label: t, value: s }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "rounded-md bg-muted/40 border border-border px-3 py-2", children: [
    /* @__PURE__ */ e.jsx("div", { className: "text-muted-foreground text-xs", children: t }),
    /* @__PURE__ */ e.jsx("div", { className: "text-foreground font-mono text-base", children: s })
  ] });
}
function fn({ title: t, hint: s, children: n }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "rounded-md bg-muted/30 border border-border p-3", children: [
    /* @__PURE__ */ e.jsx("div", { className: "text-xs uppercase tracking-wider text-foreground font-mono", children: t }),
    /* @__PURE__ */ e.jsx("div", { className: "text-2xs text-muted-foreground mb-2 leading-snug", children: s }),
    n
  ] });
}
function pn({
  c: t,
  SW: s,
  SHs: n,
  sPadX: o,
  sPadY: r,
  yTop: i,
  yBot: l,
  yLabel: c
}) {
  const d = (C) => Math.abs(C) >= 100 ? C.toFixed(0) : Math.abs(C) >= 10 ? C.toFixed(1) : C.toFixed(2), x = [
    { rel: 0, label: "0" },
    { rel: Math.floor((Tt - 1) / 2), label: `${Math.floor((Tt - 1) / 2)}` },
    { rel: Tt - 1, label: "now" }
  ], p = (C) => o + C / (Tt - 1) * (s - 2 * o);
  return /* @__PURE__ */ e.jsxs("g", { pointerEvents: "none", children: [
    /* @__PURE__ */ e.jsx("text", { x: o - 4, y: r + 3, textAnchor: "end", fill: t.axis, fontSize: "9", fontFamily: "monospace", children: d(i) }),
    /* @__PURE__ */ e.jsx("text", { x: o - 4, y: n - r + 3, textAnchor: "end", fill: t.axis, fontSize: "9", fontFamily: "monospace", children: d(l) }),
    /* @__PURE__ */ e.jsx("text", { x: 6, y: n / 2, textAnchor: "middle", fill: t.axis, fontSize: "9", fontFamily: "monospace", transform: `rotate(-90 6 ${n / 2})`, children: c }),
    x.map((C) => /* @__PURE__ */ e.jsx("text", { x: p(C.rel), y: n - 4, textAnchor: "middle", fill: t.axis, fontSize: "9", fontFamily: "monospace", children: C.label }, C.rel)),
    /* @__PURE__ */ e.jsx("text", { x: s - o, y: n - 4, textAnchor: "end", fill: t.axis, fontSize: "9", fontFamily: "monospace", children: "tick" })
  ] });
}
function Rs({ color: t, shape: s, label: n }) {
  return /* @__PURE__ */ e.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
    /* @__PURE__ */ e.jsxs("svg", { width: "20", height: "10", className: "shrink-0", children: [
      s === "dot" && /* @__PURE__ */ e.jsx("circle", { cx: "10", cy: "5", r: "3", fill: t }),
      s === "line" && /* @__PURE__ */ e.jsx("line", { x1: "2", x2: "18", y1: "5", y2: "5", stroke: t, strokeWidth: "2.25" }),
      s === "dash" && /* @__PURE__ */ e.jsx("line", { x1: "2", x2: "18", y1: "5", y2: "5", stroke: t, strokeWidth: "2", strokeDasharray: "4 3" }),
      s === "band" && /* @__PURE__ */ e.jsx("rect", { x: "2", y: "2", width: "16", height: "6", fill: t, rx: "1" })
    ] }),
    n
  ] });
}
const ps = 2, hi = 0.42, ui = 2, fi = 0.12;
function pi() {
  const [t, s] = a.useState(() => typeof document > "u" ? !0 : document.documentElement.classList.contains("dark"));
  return a.useEffect(() => {
    if (typeof document > "u") return;
    const n = () => s(document.documentElement.classList.contains("dark")), o = new MutationObserver(n);
    return o.observe(document.documentElement, { attributes: !0, attributeFilter: ["class"] }), window.addEventListener("theme-change", n), () => {
      o.disconnect(), window.removeEventListener("theme-change", n);
    };
  }, []), t;
}
function wa(t, s, n = ps) {
  let o = 0;
  for (let r = 0; r < s; r++) o += Math.pow(n, r);
  return 1 + (t - 1) * o;
}
function ji(t) {
  return t ? {
    dorm: "#5a5a5a",
    dormEmissive: "#2e2e2e",
    dormEI: 0.18,
    active: "#e8e8e8",
    activeEmissive: "#808080",
    activeEI: 0.7,
    // the other (non-traced) channels of an active node: present but quiet
    activeDim: "#6a6a6a",
    activeDimEmissive: "#3a3a3a",
    activeDimEI: 0.32,
    spot: "#c58435",
    spotEmissive: "#7a5220",
    spotEI: 0.95,
    spotDim: "#8a6230",
    spotDimEmissive: "#4d3a18",
    spotDimEI: 0.35,
    edge: "#3a3a3a",
    edgeOpacity: 0.25,
    edgeActive: "#e8e8e8",
    pulse: "#e8e8e8",
    labelDim: "#b0b0b0",
    labelSpot: "#c58435",
    labelTime: "#808080",
    bg: "#1c1c1c",
    ambient: 0.45
  } : {
    // mid grey so the dormant volume stays visible against the light ground
    dorm: "#8a8a8a",
    dormEmissive: "#6a6a6a",
    dormEI: 0.05,
    active: "#333333",
    activeEmissive: "#333333",
    activeEI: 0.22,
    activeDim: "#9a9a9a",
    activeDimEmissive: "#9a9a9a",
    activeDimEI: 0.05,
    spot: "#9a6a18",
    spotEmissive: "#9a6a18",
    spotEI: 0.28,
    spotDim: "#bda06a",
    spotDimEmissive: "#bda06a",
    spotDimEI: 0.05,
    edge: "#6a6a6a",
    edgeOpacity: 0.3,
    edgeActive: "#333333",
    pulse: "#333333",
    labelDim: "#4a4a4a",
    labelSpot: "#9a6a18",
    labelTime: "#6a6a6a",
    bg: "#f0f0f0",
    ambient: 0.95
  };
}
function gi({ a: t, b: s, offset: n, speed: o, color: r }) {
  const i = a.useRef(null);
  return Sn(({ clock: l }) => {
    if (!i.current) return;
    const c = ((l.elapsedTime * o + n) % 1 + 1) % 1;
    i.current.position.set(t[0] + (s[0] - t[0]) * c, t[1] + (s[1] - t[1]) * c, t[2] + (s[2] - t[2]) * c);
  }), /* @__PURE__ */ e.jsxs("mesh", { ref: i, children: [
    /* @__PURE__ */ e.jsx("sphereGeometry", { args: [0.07, 8, 8] }),
    /* @__PURE__ */ e.jsx("meshBasicMaterial", { color: r })
  ] });
}
function Fs({
  cells: t,
  layout: s,
  radius: n,
  color: o,
  emissive: r,
  emissiveIntensity: i,
  channelMode: l = "all",
  chIndex: c = 0
}) {
  const d = a.useRef(null), { dx: x, dy: p, dz: C, T: m, L: j, channels: u } = s, N = l === "one" ? 1 : l === "except" ? Math.max(0, u - 1) : u, b = Math.max(1, t.length * N);
  return a.useEffect(() => {
    const P = d.current;
    if (!P) return;
    const f = new ra();
    let k = 0;
    for (const v of t) {
      const $ = (v.t - (m - 1) / 2) * x, A = (v.l - j / 2) * p;
      for (let z = 0; z < u; z++)
        l === "one" && z !== c || l === "except" && z === c || (f.position.set($, A, (z - (u - 1) / 2) * C), f.scale.setScalar(n), f.updateMatrix(), P.setMatrixAt(k++, f.matrix));
    }
    P.count = k, P.instanceMatrix.needsUpdate = !0;
  }, [t, x, p, C, m, j, u, n, l, c]), // key on count forces a fresh instance buffer when the population changes.
  /* @__PURE__ */ e.jsxs("instancedMesh", { ref: d, args: [void 0, void 0, b], children: [
    /* @__PURE__ */ e.jsx("sphereGeometry", { args: [1, 6, 6] }),
    /* @__PURE__ */ e.jsx("meshStandardMaterial", { color: o, emissive: r, emissiveIntensity: i, roughness: 0.4, metalness: 0.1 })
  ] }, b);
}
function bi({
  k: t,
  L: s,
  channels: n,
  activeT: o,
  showConnections: r,
  showLabels: i,
  animateFlow: l,
  p: c
}) {
  const d = wa(t, s), x = Math.min(d, 18), p = 0.78, C = Math.min(ui, 11 / s), m = hi, j = { dx: p, dy: C, dz: m, T: x, L: s, channels: n }, u = (F) => (F - (x - 1) / 2) * p, N = (F) => (F - s / 2) * C, b = (n - 1) / 2 * m, P = Math.floor((n - 1) / 2), f = (P - (n - 1) / 2) * m, k = fi, v = a.useMemo(() => {
    const F = [];
    for (let S = 0; S <= s; S++) for (let h = 0; h < x; h++) F.push({ l: S, t: h });
    return F;
  }, [s, x]), $ = a.useMemo(() => {
    const F = [];
    for (let S = 1; S <= s; S++) {
      const h = Math.pow(ps, S - 1);
      for (let y = 0; y < x; y++)
        for (let w = 0; w < t; w++) {
          const M = y - w * h;
          M < 0 || F.push({ l: S, t: y, pt: M });
        }
    }
    return F;
  }, [t, s, x]), A = a.useMemo(() => {
    const F = /* @__PURE__ */ new Set(), S = [{ l: s, t: o }];
    for (F.add(`${s}:${o}`); S.length; ) {
      const { l: h, t: y } = S.pop();
      if (h === 0) continue;
      const w = Math.pow(ps, h - 1);
      for (let M = 0; M < t; M++) {
        const Y = y - M * w;
        if (Y < 0) continue;
        const _ = `${h - 1}:${Y}`;
        F.has(_) || (F.add(_), S.push({ l: h - 1, t: Y }));
      }
    }
    return F;
  }, [t, s, o, x]), z = (F, S) => A.has(`${F}:${S}`), R = a.useMemo(
    () => v.filter((F) => z(F.l, F.t) && !(F.l === s && F.t === o)),
    [v, A, s, o]
  ), T = a.useMemo(() => [{ l: s, t: o }], [s, o]), I = (F) => F === 0 ? "Input" : F === s ? `Dilation ${Math.pow(ps, F - 1)} (output)` : `Dilation ${Math.pow(ps, F - 1)}`;
  return /* @__PURE__ */ e.jsxs("group", { children: [
    /* @__PURE__ */ e.jsx(Fs, { cells: v, layout: j, radius: k, color: c.dorm, emissive: c.dormEmissive, emissiveIntensity: c.dormEI }),
    /* @__PURE__ */ e.jsx(
      Fs,
      {
        cells: R,
        layout: j,
        radius: k,
        channelMode: "except",
        chIndex: P,
        color: c.activeDim,
        emissive: c.activeDimEmissive,
        emissiveIntensity: c.activeDimEI
      }
    ),
    /* @__PURE__ */ e.jsx(
      Fs,
      {
        cells: R,
        layout: j,
        radius: k * 1.5,
        channelMode: "one",
        chIndex: P,
        color: c.active,
        emissive: c.activeEmissive,
        emissiveIntensity: c.activeEI
      }
    ),
    /* @__PURE__ */ e.jsx(
      Fs,
      {
        cells: T,
        layout: j,
        radius: k * 1.15,
        channelMode: "except",
        chIndex: P,
        color: c.spotDim,
        emissive: c.spotDimEmissive,
        emissiveIntensity: c.spotDimEI
      }
    ),
    /* @__PURE__ */ e.jsx(
      Fs,
      {
        cells: T,
        layout: j,
        radius: k * 2,
        channelMode: "one",
        chIndex: P,
        color: c.spot,
        emissive: c.spotEmissive,
        emissiveIntensity: c.spotEI
      }
    ),
    Array.from({ length: s + 1 }, (F, S) => [b, -b].map((h, y) => /* @__PURE__ */ e.jsx(
      Gs,
      {
        points: [[u(0), N(S), h], [u(x - 1), N(S), h]],
        color: c.edge,
        lineWidth: 0.8,
        transparent: !0,
        opacity: c.edgeOpacity * 0.8
      },
      `base-${S}-${y}`
    ))),
    r && $.map((F, S) => z(F.l, F.t) && z(F.l - 1, F.pt) ? null : /* @__PURE__ */ e.jsx(
      Gs,
      {
        points: [[u(F.pt), N(F.l - 1), b], [u(F.t), N(F.l), b]],
        color: c.edge,
        lineWidth: 0.6,
        transparent: !0,
        opacity: c.edgeOpacity
      },
      `e-${S}`
    )),
    $.map((F, S) => {
      if (!(z(F.l, F.t) && z(F.l - 1, F.pt))) return null;
      const h = [u(F.pt), N(F.l - 1), f], y = [u(F.t), N(F.l), f];
      return /* @__PURE__ */ e.jsxs("group", { children: [
        /* @__PURE__ */ e.jsx(Gs, { points: [h, y], color: c.edgeActive, lineWidth: 1.9 }),
        l && /* @__PURE__ */ e.jsx(gi, { a: h, b: y, offset: S % 7 / 7, speed: 0.7, color: c.pulse })
      ] }, `ae-${S}`);
    }),
    i && Array.from({ length: s + 1 }, (F, S) => /* @__PURE__ */ e.jsx(ke, { position: [u(0) - 0.9, N(S), b], fontSize: 0.22, color: c.labelDim, anchorX: "right", anchorY: "middle", children: I(S) }, `lab-${S}`)),
    i && /* @__PURE__ */ e.jsx(ke, { position: [u(o), N(s) + 0.55, b], fontSize: 0.26, color: c.labelSpot, anchorX: "center", anchorY: "middle", children: `output t = ${o}` }),
    i && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx(ke, { position: [u(0), N(0) - 0.7, b], fontSize: 0.2, color: c.labelTime, anchorX: "left", anchorY: "middle", children: "past" }),
      /* @__PURE__ */ e.jsxs(ke, { position: [u(x - 1), N(0) - 0.7, b], fontSize: 0.2, color: c.labelTime, anchorX: "right", anchorY: "middle", children: [
        "time ",
        "→"
      ] })
    ] })
  ] });
}
function vi() {
  const t = pi(), s = a.useMemo(() => ji(t), [t]), [n, o] = a.useState(2), [r, i] = a.useState(4), [l, c] = a.useState(16), [d, x] = a.useState(!0), [p, C] = a.useState(!0), [m, j] = a.useState(!0), [u, N] = a.useState(!0), [b, P] = a.useState(0), [f, k] = a.useState(!0), [v, $] = a.useState(!0), [A, z] = a.useState(!1), [R, T] = a.useState(!0), I = a.useRef(null), F = () => I.current?.reset(), S = n, h = r, y = wa(S, h), w = Math.min(y, 18), M = Math.pow(ps, h - 1), Y = Math.ceil((y - 1) / (S - 1));
  a.useEffect(() => {
    P((W) => Math.min(W, w - 1));
  }, [w]), a.useEffect(() => {
    const W = setInterval(() => P((te) => (te + 1) % w), 1100);
    return () => clearInterval(W);
  }, [w]);
  const _ = t ? "bg-card text-[var(--text)] border-border" : "bg-card text-zinc-900 border-border", se = t ? "bg-card text-[var(--text)]" : "bg-card text-zinc-900", V = t ? "text-[var(--dim)]" : "text-zinc-500";
  return /* @__PURE__ */ e.jsxs("div", { className: `relative w-full h-[calc(100vh-180px)] min-h-[600px] rounded-lg overflow-hidden border border-border ${t ? "bg-[var(--bg)]" : "bg-zinc-100"}`, children: [
    /* @__PURE__ */ e.jsxs(It, { camera: { position: [4.5, 3.2, 11], fov: 50 }, style: { background: s.bg }, children: [
      /* @__PURE__ */ e.jsx("ambientLight", { intensity: s.ambient }),
      /* @__PURE__ */ e.jsx("pointLight", { position: [10, 10, 14], intensity: 0.8 }),
      /* @__PURE__ */ e.jsx("pointLight", { position: [-10, -6, -10], intensity: 0.3 }),
      /* @__PURE__ */ e.jsx("directionalLight", { position: [5, 15, 8], intensity: 0.55 }),
      /* @__PURE__ */ e.jsx(
        bi,
        {
          k: S,
          L: h,
          channels: l,
          activeT: b,
          showConnections: d,
          showLabels: p,
          animateFlow: m,
          p: s
        }
      ),
      /* @__PURE__ */ e.jsx(
        zt,
        {
          ref: I,
          enablePan: !0,
          enableZoom: !0,
          enableRotate: !0,
          minDistance: 4,
          maxDistance: 160,
          autoRotate: u,
          autoRotateSpeed: 0.6
        }
      )
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none", children: [
      /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-3 pointer-events-auto", children: /* @__PURE__ */ e.jsxs("div", { className: `rounded-lg px-4 py-2 border flex items-center gap-2 ${_}`, children: [
        /* @__PURE__ */ e.jsx("span", { className: "font-semibold", children: "Temporal Convolutional Network" }),
        /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsxs(lt, { children: [
          /* @__PURE__ */ e.jsx(ct, { asChild: !0, children: /* @__PURE__ */ e.jsx(Ge, { className: `h-4 w-4 cursor-help ${V}` }) }),
          /* @__PURE__ */ e.jsx(xt, { className: "max-w-sm", children: /* @__PURE__ */ e.jsx("p", { className: "text-sm", children: "Dilated causal convolutions in 3D. Time runs along x, layers stack up y, and channels (feature maps) give depth in z. The bright cone is the receptive field of the highlighted output; it only reaches into the past." }) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 pointer-events-auto", children: [
        /* @__PURE__ */ e.jsxs(le, { variant: m ? "default" : "outline", size: "sm", onClick: () => j((W) => !W), className: m ? "" : se, children: [
          /* @__PURE__ */ e.jsx(Bt, { className: "h-4 w-4 mr-1" }),
          m ? "Stop flow" : "Run flow"
        ] }),
        /* @__PURE__ */ e.jsxs(le, { variant: "outline", size: "sm", onClick: F, className: se, children: [
          /* @__PURE__ */ e.jsx(jt, { className: "h-4 w-4 mr-1" }),
          "Reset view"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "absolute left-4 top-20 w-72 space-y-2 pointer-events-auto max-h-[calc(100%-7rem)] overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs($e, { open: f, onOpenChange: k, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: `w-full justify-between ${se}`, children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4" }),
            "How it works"
          ] }),
          f ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: `mt-2 p-4 text-xs leading-relaxed ${_}`, children: [
          "The bottom plane is the input sequence, one column per time step. Each layer above convolves over only ",
          S,
          " taps, but the spacing between them doubles every layer. The highlighted output reaches back over ",
          y,
          " steps through just ",
          h,
          " layers, and every connection points down and to the left, so it reads only its past. The ",
          l,
          " ",
          "sheets running into the screen are the channels (feature maps) each layer carries. The bright path follows one channel so the cone stays a clean 1, 2, 4, 8 fan; the dimmer nodes beside it are the other channels, which all mix into every output. Drag to orbit the cone."
        ] }) })
      ] }),
      /* @__PURE__ */ e.jsxs($e, { open: v, onOpenChange: $, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: `w-full justify-between ${se}`, children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(vt, { className: "h-4 w-4" }),
            "Architecture"
          ] }),
          v ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: `mt-2 p-4 space-y-4 ${_}`, children: [
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: `text-xs ${V}`, children: "Layers" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium", children: h })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [h], onValueChange: ([W]) => i(W), min: 2, max: 10, step: 1 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: `text-xs ${V}`, children: "Kernel size k" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium", children: S })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [S], onValueChange: ([W]) => o(W), min: 2, max: 3, step: 1 })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e.jsx(q, { className: `text-xs ${V}`, children: "Channels (feature maps)" }),
              /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium", children: l })
            ] }),
            /* @__PURE__ */ e.jsx(xe, { value: [l], onValueChange: ([W]) => c(W), min: 1, max: 64, step: 1 })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ e.jsxs($e, { open: A, onOpenChange: z, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: `w-full justify-between ${se}`, children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(Pt, { className: "h-4 w-4" }),
            "Visual"
          ] }),
          A ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: `mt-2 p-4 space-y-4 ${_}`, children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: `text-xs ${V}`, children: "Show connections" }),
            /* @__PURE__ */ e.jsx(Me, { checked: d, onCheckedChange: x })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: `text-xs ${V}`, children: "Show labels" }),
            /* @__PURE__ */ e.jsx(Me, { checked: p, onCheckedChange: C })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: `text-xs ${V}`, children: "Auto rotate" }),
            /* @__PURE__ */ e.jsx(Me, { checked: u, onCheckedChange: N })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute right-4 top-20 w-60 pointer-events-auto", children: /* @__PURE__ */ e.jsxs($e, { open: R, onOpenChange: T, children: [
      /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: `w-full justify-between ${se}`, children: [
        /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e.jsx(Ge, { className: "h-4 w-4" }),
          "Receptive field"
        ] }),
        R ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
      ] }) }),
      /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: `mt-2 p-3 space-y-3 ${_}`, children: [
        /* @__PURE__ */ e.jsx(Ps, { label: "Receptive field", value: `${y} steps`, sub: V, highlight: !0 }),
        /* @__PURE__ */ e.jsx(Ps, { label: "Layers", value: `${h}`, sub: V }),
        /* @__PURE__ */ e.jsx(Ps, { label: "Kernel size k", value: `${S}`, sub: V }),
        /* @__PURE__ */ e.jsx(Ps, { label: "Top dilation", value: `${M}`, sub: V }),
        /* @__PURE__ */ e.jsx(Ps, { label: "Channels", value: `${l}`, sub: V }),
        /* @__PURE__ */ e.jsxs("div", { className: "pt-2 border-t border-border", children: [
          /* @__PURE__ */ e.jsx("div", { className: `text-xs mb-1 ${V}`, children: "Plain conv for same reach" }),
          /* @__PURE__ */ e.jsxs("div", { className: "text-sm font-mono text-[var(--text)]", children: [
            Y,
            " layers"
          ] })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto", children: /* @__PURE__ */ e.jsxs("div", { className: `rounded-lg px-4 py-2 border flex items-center gap-4 text-xs ${_} ${V}`, children: [
      /* @__PURE__ */ e.jsx("span", { children: "Drag to rotate" }),
      /* @__PURE__ */ e.jsx("span", { className: "opacity-50", children: "•" }),
      /* @__PURE__ */ e.jsx("span", { children: "Scroll to zoom" }),
      /* @__PURE__ */ e.jsx("span", { className: "opacity-50", children: "•" }),
      /* @__PURE__ */ e.jsx("span", { children: "Right-click to pan" })
    ] }) })
  ] });
}
function Ps({ label: t, value: s, sub: n, highlight: o }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
    /* @__PURE__ */ e.jsx("span", { className: `text-xs ${n}`, children: t }),
    /* @__PURE__ */ e.jsx("span", { className: `text-sm font-medium ${o ? "text-[var(--text)]" : ""}`, children: s })
  ] });
}
function Nn(t) {
  let s = t >>> 0;
  return () => {
    s |= 0, s = s + 1831565813 | 0;
    let n = Math.imul(s ^ s >>> 15, 1 | s);
    return n = n + Math.imul(n ^ n >>> 7, 61 | n) ^ n, ((n ^ n >>> 14) >>> 0) / 4294967296;
  };
}
function Ks(t) {
  if (t.spare !== null) {
    const r = t.spare;
    return t.spare = null, r;
  }
  let s = 0, n = 0;
  for (; s === 0; ) s = t.rng();
  n = t.rng();
  const o = Math.sqrt(-2 * Math.log(s));
  return t.spare = o * Math.sin(2 * Math.PI * n), o * Math.cos(2 * Math.PI * n);
}
function Qs(t) {
  const s = t.length;
  if (s < 3) return 0;
  let n = 0;
  for (let i = 0; i < s; i++) n += t[i];
  n /= s;
  let o = 0, r = 0;
  for (let i = 0; i < s; i++) {
    const l = t[i] - n;
    r += l * l, i > 0 && (o += l * (t[i - 1] - n));
  }
  return r > 0 ? o / r : 0;
}
function Sa(t, s) {
  const n = t.length;
  let o = 0;
  for (let p = 0; p < n; p++) o += t[p];
  o /= n;
  let r = 0, i = 0, l = 0;
  const c = new Float32Array(n);
  for (let p = 0; p < n; p++) {
    const C = t[p] - o;
    r += C * C, i += C * C * C, l += C * C * C * C, c[p] = Math.abs(t[p]);
  }
  r /= n, i /= n, l /= n;
  const d = Math.sqrt(r) || 1e-12, x = Array.from(t).sort((p, C) => p - C);
  return {
    kurtosis: l / (r * r) - 3,
    skew: i / (d * d * d),
    acf_return: Qs(t),
    acf_abs: [Qs(c)],
    vol_annual: d * Math.sqrt(s),
    var99: x[Math.max(0, Math.floor(0.01 * n))],
    sigma_bar: d
  };
}
function yi(t, s) {
  const { nS: n, h: o, coord: r, sigma: i } = s, l = o - 1, c = new Float32Array(n * l);
  let d = 0, x = 0;
  const p = new Float32Array(l), C = new Float32Array(l);
  for (let j = 0; j < n; j++) {
    const u = j * o;
    for (let N = 1; N < o; N++) {
      const b = (t[u + N] * r[N] - t[u + N - 1] * r[N - 1]) * i;
      p[N - 1] = b, C[N - 1] = Math.abs(b), c[j * l + N - 1] = b;
    }
    d += Qs(p), x += Qs(C);
  }
  const m = Sa(c, s.barsPerYear);
  return m.acf_return = d / n, m.acf_abs = [x / n], m;
}
const Ft = ["#0b3b39", "#0f766e", "#14b8a6", "#5eead4", "#c7fff4"];
function Ni(t, s, n) {
  const o = [1, 3, 5].map((l) => parseInt(t.slice(l, l + 2), 16)), r = [1, 3, 5].map((l) => parseInt(s.slice(l, l + 2), 16)), i = o.map((l, c) => Math.round(l + (r[c] - l) * n));
  return `rgb(${i[0]},${i[1]},${i[2]})`;
}
function wi(t) {
  const s = Math.max(0, Math.min(1, t)) * (Ft.length - 1), n = Math.min(Ft.length - 2, Math.floor(s));
  return Ni(Ft[n], Ft[n + 1], s - n);
}
const Hs = (t, s) => typeof document < "u" && getComputedStyle(document.documentElement).getPropertyValue(t).trim() || s, Kn = (t) => Math.abs(t) >= 1e3 ? t.toLocaleString(void 0, { maximumFractionDigits: 0 }) : Math.abs(t) >= 10 ? t.toFixed(2) : t.toFixed(4);
function Si(t, s) {
  const n = { rng: Nn(t * 2654435761 + 1), spare: null }, o = 0.12, r = 0.85, i = 144e-6, l = i * (1 - o - r), c = new Float32Array(s);
  let d = i;
  for (let x = 0; x < s; x++) {
    let p = Ks(n);
    n.rng() < 0.04 && (p *= 2.6), c[x] = Math.sqrt(d) * p, d = l + o * c[x] * c[x] + r * d;
  }
  return c;
}
const Qn = 900;
function Mi(t, s) {
  const n = new Float64Array(t + 1);
  if (s === "cosine") {
    const r = (l) => Math.cos((l / t + 8e-3) / 1.008 * Math.PI / 2) ** 2, i = r(0);
    for (let l = 0; l <= t; l++) n[l] = Math.max(1e-6, r(l) / i);
  } else
    for (let o = 0; o <= t; o++) n[o] = Math.max(1e-6, 1 - o / t);
  return n[0] = 1, n;
}
function Ci(t, s) {
  let n, o, r, i, l, c, d, x, p, C, m;
  if (s)
    n = s.windows, m = s.horizon, o = s.sigma_bar, r = s.last_price, i = s.tail || [s.last_price], l = s.log_returns, c = s.bars_per_year, d = s.symbol, x = s.n_windows, p = s.stride, C = s.stats;
  else {
    m = t.horizon;
    const M = Si(t.seed, 2400);
    let Y = 0;
    for (let W = 0; W < M.length; W++) Y += M[W];
    Y /= M.length;
    for (let W = 0; W < M.length; W++) M[W] -= Y;
    C = Sa(M, 8766), o = C.sigma_bar, c = 8766, d = "DEMO", l = !0;
    const _ = M.length - m + 1;
    p = Math.max(1, Math.ceil(_ / 600)), n = [];
    for (let W = 0; W < _; W += p) {
      const te = new Array(m);
      let O = 0;
      for (let L = 0; L < m; L++)
        O += M[W + L], te[L] = O / o;
      n.push(te);
    }
    x = n.length, r = 100, i = [];
    let se = 0;
    for (let W = M.length - 140; W < M.length; W++) se += M[W];
    let V = -se;
    for (let W = M.length - 140; W < M.length; W++)
      V += M[W], i.push(100 * Math.exp(V));
    r = i[i.length - 1];
  }
  const j = n.length;
  if (!j || m < 4) throw new Error("no training windows");
  const u = new Float32Array(m);
  for (let M = 0; M < m; M++) {
    let Y = 0;
    for (let _ = 0; _ < j; _++) Y += n[_][M] * n[_][M];
    u[M] = Math.max(1e-4, Math.sqrt(Y / j));
  }
  const N = new Float32Array(j * m);
  for (let M = 0; M < j; M++)
    for (let Y = 0; Y < m; Y++) N[M * m + Y] = n[M][Y] / u[Y];
  const b = j > Qn ? Math.ceil(j / Qn) : 1, P = Math.floor((j + b - 1) / b), f = new Float32Array(P * m), k = new Float32Array(P);
  for (let M = 0; M < P; M++) {
    const Y = M * b * m;
    let _ = 0;
    for (let se = 0; se < m; se++) {
      const V = N[Y + se];
      f[M * m + se] = V, _ += V * V;
    }
    k[M] = _;
  }
  const v = t.samples, $ = Mi(t.steps, t.schedule);
  if (t.bw > 0)
    for (let M = 0; M <= t.steps; M++) $[M] = $[M] / (1 + $[M] * t.bw * t.bw);
  const A = {
    T: t.steps,
    h: m,
    nS: v,
    W: N,
    nW: j,
    dW: f,
    dnW: P,
    dwn2: k,
    coord: u,
    ab: $,
    traj: [],
    x0traj: [],
    scratch: new Float64Array(P),
    blend: new Float32Array(v * m),
    rng: Nn(t.seed * 1000003 + 17),
    spare: null,
    sigma: o,
    lastPrice: r,
    tail: i,
    logRet: l,
    barsPerYear: c,
    symbol: d,
    nWindowsTotal: x,
    stride: p,
    dataStats: C,
    wTermPrice: new Float32Array(j),
    yMin: 0,
    yMax: 1,
    stepStats: new Array(t.steps + 1).fill(null),
    memDist: new Float32Array(v),
    memProgress: 0,
    memBaseline: 1,
    isDemo: !s
  }, z = (M) => l ? r * Math.exp(o * M) : r + o * M;
  for (let M = 0; M < j; M++) A.wTermPrice[M] = z(n[M][m - 1]);
  let R = 0, T = 0;
  const I = Nn(t.seed + 99);
  for (let M = 0; M < 300; M++) {
    const Y = Math.floor(I() * j) * m, _ = Math.floor(I() * j) * m;
    if (Y === _) continue;
    let se = 0;
    for (let V = 0; V < m; V++) {
      const W = N[Y + V] - N[_ + V];
      se += W * W;
    }
    R += Math.sqrt(se / m), T++;
  }
  A.memBaseline = T ? R / T : 1;
  const F = new Float32Array(v * m);
  for (let M = 0; M < F.length; M++) F[M] = t.temp * Ks(A);
  A.traj.push(F);
  const S = [];
  for (let M = 0; M < v; M++) S.push(z(F[M * m + m - 1] * u[m - 1]));
  S.sort((M, Y) => M - Y);
  let h = S[Math.floor(0.05 * S.length)], y = S[Math.floor(0.95 * S.length)];
  for (const M of i)
    h = Math.min(h, M), y = Math.max(y, M);
  const w = (y - h) * 0.08 || 1;
  return A.yMin = h - w, A.yMax = y + w, A;
}
function ki(t, s, n, o) {
  const r = t.traj.length - 1;
  if (r >= t.T) return;
  const i = t.T - r, l = i - 1, { h: c, nS: d, dW: x, dnW: p, dwn2: C, ab: m, scratch: j } = t, u = m[i], N = m[l], b = Math.sqrt(u), P = Math.sqrt(Math.max(1e-12, 1 - u)), f = n / (2 * Math.max(1e-9, 1 - u)), k = s * Math.sqrt((1 - N) / Math.max(1e-9, 1 - u)) * Math.sqrt(Math.max(0, 1 - u / Math.max(N, 1e-9))), v = Math.sqrt(Math.max(0, 1 - N - k * k)), $ = Math.sqrt(N), A = t.traj[r], z = new Float32Array(d * c), R = new Float32Array(d * c);
  for (let T = 0; T < d; T++) {
    const I = T * c;
    let F = 0;
    for (let w = 0; w < c; w++) {
      const M = A[I + w];
      F += M * M;
    }
    let S = -1 / 0;
    for (let w = 0; w < p; w++) {
      const M = w * c;
      let Y = 0;
      for (let se = 0; se < c; se++) Y += A[I + se] * x[M + se];
      const _ = -(F - 2 * b * Y + u * C[w]) * f;
      j[w] = _, _ > S && (S = _);
    }
    let h = 0;
    for (let w = 0; w < p; w++) {
      const M = Math.exp(j[w] - S);
      j[w] = M, h += M;
    }
    const y = h * 1e-4;
    for (let w = 0; w < p; w++) {
      const M = j[w];
      if (M < y) continue;
      const Y = M / h, _ = w * c;
      for (let se = 0; se < c; se++) R[I + se] += Y * x[_ + se];
    }
    if (l === 0 && o > 0) {
      let w = 0;
      for (let M = 0; M < c; M++)
        w += Ks(t), z[I + M] = R[I + M] + o * w / t.coord[M];
    } else
      for (let w = 0; w < c; w++) {
        const M = R[I + w], Y = (A[I + w] - b * M) / P;
        z[I + w] = $ * M + v * Y + (k > 0 ? k * Ks(t) : 0);
      }
  }
  t.x0traj.push(R), t.traj.push(z);
}
const Ai = {
  steps: 40,
  samples: 256,
  schedule: "cosine",
  eta: 0.15,
  sharp: 1,
  temp: 1,
  bw: 0.2,
  horizon: 64,
  seed: 7
};
function Jn({ fitted: t }) {
  const [s, n] = a.useState(Ai), [o, r] = a.useState(!0), [i, l] = a.useState(!1), [c, d] = a.useState(0), [x, p] = a.useState(null), [C, m] = a.useState(""), [j, u] = a.useState(!0), [N, b] = a.useState(!0), P = a.useRef(null), f = a.useRef(null), k = a.useRef(null), v = a.useRef(null), $ = a.useRef(null), A = a.useRef(null), z = a.useRef(null), R = a.useRef({ playing: !0, head: 0, speed: 7 }), T = a.useRef(null), I = a.useRef(0), F = a.useRef(0), S = a.useRef(0), h = a.useRef(s), y = a.useRef(i);
  h.current = s, y.current = i, a.useEffect(() => {
    try {
      m(""), z.current = Ci(s, t || null), R.current.head = 0, R.current.playing = !0, r(!0), I.current = 0, d(0), p(null);
    } catch (D) {
      z.current = null, m(String(D?.message || D));
    }
  }, [s, t]), a.useEffect(() => {
    const D = f.current, X = P.current;
    if (!D || !X) return;
    const B = () => {
      const oe = X.getBoundingClientRect(), re = window.devicePixelRatio || 1;
      D.width = Math.max(1, Math.round(oe.width * re)), D.height = Math.max(1, Math.round(oe.height * re));
    };
    B();
    const g = new ResizeObserver(B);
    return g.observe(X), () => g.disconnect();
  }, []), a.useEffect(() => {
    const D = (X) => {
      F.current = requestAnimationFrame(D);
      const B = z.current, g = f.current;
      if (!B || !g) {
        S.current = X;
        return;
      }
      const oe = Math.min(0.1, (X - S.current) / 1e3 || 0);
      S.current = X, B.traj.length - 1 < B.T && ki(
        B,
        h.current.eta,
        h.current.sharp,
        h.current.bw
      ), R.current.playing && (R.current.head += oe * R.current.speed, R.current.head >= B.T && (R.current.head = B.T, R.current.playing = !1, r(!1)));
      const U = B.traj.length - 1;
      if (R.current.head > U && (R.current.head = U), B.traj.length - 1 >= B.T && B.memProgress < B.nS) {
        const E = B.traj[B.T], G = Math.min(B.nS, B.memProgress + 24);
        for (let J = B.memProgress; J < G; J++) {
          let K = 1 / 0;
          const ue = J * B.h;
          for (let ce = 0; ce < B.nW; ce++) {
            const Q = ce * B.h;
            let ne = 0;
            for (let H = 0; H < B.h; H++) {
              const me = E[ue + H] - B.W[Q + H];
              ne += me * me;
            }
            ne < K && (K = ne);
          }
          B.memDist[J] = Math.sqrt(K / B.h) / B.memBaseline;
        }
        if (B.memProgress = G, G >= B.nS) {
          const J = Array.from(B.memDist).sort((K, ue) => K - ue);
          p({
            median: J[Math.floor(J.length / 2)],
            min: J[0],
            close: J.filter((K) => K < 0.05).length
          });
        }
      }
      const ee = Math.floor(R.current.head);
      if (ee !== I.current && (I.current = ee, d(ee)), B.stepStats[ee] || (B.stepStats[ee] = yi(B.traj[ee], B)), Ri(g, B, R.current.head, y.current, T.current), v.current && (v.current.style.width = `${R.current.head / B.T * 100}%`), $.current && ($.current.style.width = `${(B.traj.length - 1) / B.T * 100}%`), A.current) {
        const E = Math.sqrt(B.ab[Math.max(0, B.T - ee)]);
        A.current.textContent = `step ${ee}/${B.T} · signal ${(E * 100).toFixed(0)}%`;
      }
    };
    return F.current = requestAnimationFrame(D), () => cancelAnimationFrame(F.current);
  }, []);
  const w = (D) => {
    const X = k.current, B = z.current;
    if (!X || !B) return;
    const g = X.getBoundingClientRect(), oe = Math.max(0, Math.min(1, (D.clientX - g.left) / g.width));
    R.current.head = Math.min(oe * B.T, B.traj.length - 1), R.current.playing = !1, r(!1);
  }, M = (D) => n((X) => ({ ...X, ...D })), Y = z.current, _ = Y?.stepStats[Math.min(c, Y.T)] || null, se = Y?.dataStats || null, V = (D, X, B, g, oe) => {
    const re = Math.abs(X - B) <= g;
    return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 11 }, children: [
      /* @__PURE__ */ e.jsx("span", { style: { color: "var(--dim)", flex: 1 }, children: D }),
      /* @__PURE__ */ e.jsx("span", { style: { fontFamily: "var(--mono)", width: 52, textAlign: "right" }, children: oe(X) }),
      /* @__PURE__ */ e.jsx("span", { style: {
        fontFamily: "var(--mono)",
        width: 52,
        textAlign: "right",
        color: re ? Ft[3] : "var(--dim)"
      }, children: oe(B) }),
      /* @__PURE__ */ e.jsx("span", { style: {
        width: 8,
        textAlign: "center",
        color: re ? Ft[2] : "var(--err, #f0426c)"
      }, children: re ? "●" : "○" })
    ] }, D);
  }, W = {
    background: "color-mix(in srgb, var(--bg) 82%, transparent)",
    border: "1px solid var(--edge)",
    borderRadius: 3,
    padding: "10px 12px",
    backdropFilter: "blur(3px)"
  }, te = {
    fontSize: 10,
    letterSpacing: ".1em",
    color: "var(--dim)",
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    userSelect: "none"
  }, O = {
    background: "var(--raise, var(--hover))",
    border: "1px solid var(--edge)",
    color: "var(--text)",
    borderRadius: 2,
    padding: "3px 10px",
    fontSize: 10.5,
    letterSpacing: ".06em",
    cursor: "pointer"
  }, L = (D, X, B, g, oe, re, U) => /* @__PURE__ */ e.jsxs("div", { style: { marginTop: 8 }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 10.5 }, children: [
      /* @__PURE__ */ e.jsx("span", { style: { color: "var(--dim)" }, children: D }),
      /* @__PURE__ */ e.jsx("span", { style: { fontFamily: "var(--mono)" }, children: re })
    ] }),
    /* @__PURE__ */ e.jsx(
      "input",
      {
        type: "range",
        min: B,
        max: g,
        step: oe,
        value: X,
        onChange: (ee) => U(Number(ee.target.value)),
        style: { width: "100%", accentColor: Ft[2], height: 14 }
      }
    )
  ] }, D);
  return /* @__PURE__ */ e.jsxs(
    "div",
    {
      ref: P,
      className: "relative w-full h-[calc(100vh-180px)] min-h-[560px] overflow-hidden rounded-sm",
      style: { background: "var(--bg)", border: "1px solid var(--edge)" },
      onPointerMove: (D) => {
        const X = P.current?.getBoundingClientRect();
        X && (T.current = { x: D.clientX - X.left, y: D.clientY - X.top });
      },
      onPointerLeave: () => {
        T.current = null;
      },
      children: [
        /* @__PURE__ */ e.jsx("canvas", { ref: f, className: "absolute inset-0 w-full h-full" }),
        C && /* @__PURE__ */ e.jsx("div", { className: "absolute left-4 top-4 text-xs", style: { color: "var(--err, #f0426c)" }, children: C }),
        /* @__PURE__ */ e.jsxs("div", { className: "absolute left-3 top-3 w-56", style: W, children: [
          /* @__PURE__ */ e.jsxs("div", { style: te, onClick: () => u(!j), children: [
            /* @__PURE__ */ e.jsx("span", { children: "SAMPLER" }),
            /* @__PURE__ */ e.jsx("span", { children: j ? "▾" : "▸" })
          ] }),
          j && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", gap: 6, marginTop: 8 }, children: [
              /* @__PURE__ */ e.jsx("button", { style: O, onClick: () => {
                const D = R.current;
                !D.playing && z.current && D.head >= z.current.T && (D.head = 0), D.playing = !D.playing, r(D.playing);
              }, children: o ? "PAUSE" : "PLAY" }),
              /* @__PURE__ */ e.jsx("button", { style: O, onClick: () => {
                R.current.head = 0, R.current.playing = !0, r(!0);
              }, children: "RESTART" }),
              /* @__PURE__ */ e.jsx(
                "button",
                {
                  style: O,
                  title: "new noise draw, same data",
                  onClick: () => M({ seed: s.seed + 1 }),
                  children: "RESEED"
                }
              )
            ] }),
            L(
              "speed",
              R.current.speed,
              1,
              20,
              1,
              `${R.current.speed} st/s`,
              (D) => {
                R.current.speed = D, M({});
              }
            ),
            L(
              "denoise steps",
              s.steps,
              20,
              80,
              5,
              `${s.steps}`,
              (D) => M({ steps: D })
            ),
            L(
              "sample paths",
              s.samples,
              100,
              600,
              50,
              `${s.samples}`,
              (D) => M({ samples: D })
            ),
            !t && L(
              "horizon",
              s.horizon,
              16,
              96,
              8,
              `${s.horizon} bars`,
              (D) => M({ horizon: D })
            ),
            L(
              "eta (DDIM to DDPM)",
              s.eta,
              0,
              1,
              0.05,
              s.eta.toFixed(2),
              (D) => M({ eta: D })
            ),
            L(
              "sharpness",
              s.sharp,
              0.5,
              2,
              0.05,
              `${s.sharp.toFixed(2)}x`,
              (D) => M({ sharp: D })
            ),
            L(
              "diversity (bandwidth)",
              s.bw,
              0,
              0.5,
              0.05,
              s.bw.toFixed(2),
              (D) => M({ bw: D })
            ),
            L(
              "noise temperature",
              s.temp,
              0.7,
              1.5,
              0.05,
              `${s.temp.toFixed(2)}x`,
              (D) => M({ temp: D })
            ),
            /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", gap: 10, marginTop: 8, fontSize: 10.5 }, children: [
              /* @__PURE__ */ e.jsxs("label", { style: { display: "flex", alignItems: "center", gap: 5, color: "var(--dim)" }, children: [
                /* @__PURE__ */ e.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: s.schedule === "linear",
                    onChange: (D) => M({ schedule: D.target.checked ? "linear" : "cosine" })
                  }
                ),
                "linear schedule"
              ] }),
              /* @__PURE__ */ e.jsxs("label", { style: { display: "flex", alignItems: "center", gap: 5, color: "var(--dim)" }, children: [
                /* @__PURE__ */ e.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: i,
                    onChange: (D) => l(D.target.checked)
                  }
                ),
                "show guess"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "absolute right-3 top-3 w-64", style: W, children: [
          /* @__PURE__ */ e.jsxs("div", { style: te, onClick: () => b(!N), children: [
            /* @__PURE__ */ e.jsxs("span", { children: [
              "SAMPLES VS ",
              Y?.isDemo ? "DEMO DATA" : (Y?.symbol || "DATA").toUpperCase()
            ] }),
            /* @__PURE__ */ e.jsx("span", { children: N ? "▾" : "▸" })
          ] }),
          N && Y && _ && se && /* @__PURE__ */ e.jsxs("div", { style: { marginTop: 8, display: "flex", flexDirection: "column", gap: 5 }, children: [
            /* @__PURE__ */ e.jsxs("div", { style: {
              display: "flex",
              gap: 6,
              fontSize: 9.5,
              color: "var(--dim)",
              letterSpacing: ".06em"
            }, children: [
              /* @__PURE__ */ e.jsx("span", { style: { flex: 1 } }),
              /* @__PURE__ */ e.jsx("span", { style: { width: 52, textAlign: "right" }, children: "DATA" }),
              /* @__PURE__ */ e.jsx("span", { style: { width: 52, textAlign: "right" }, children: "SAMPLES" }),
              /* @__PURE__ */ e.jsx("span", { style: { width: 8 } })
            ] }),
            V(
              "excess kurtosis",
              se.kurtosis,
              _.kurtosis,
              Math.max(0.8, Math.abs(se.kurtosis) * 0.5),
              (D) => D.toFixed(1)
            ),
            V("skew", se.skew, _.skew, 0.35, (D) => D.toFixed(2)),
            V("ACF(1) returns", se.acf_return, _.acf_return, 0.08, (D) => D.toFixed(2)),
            V("ACF(1) |returns|", se.acf_abs[0], _.acf_abs[0], 0.08, (D) => D.toFixed(2)),
            V(
              "vol (annual)",
              se.vol_annual,
              _.vol_annual,
              se.vol_annual * 0.2,
              (D) => `${(D * 100).toFixed(0)}%`
            ),
            V(
              "VaR 99 / bar",
              se.var99,
              _.var99,
              Math.abs(se.var99) * 0.3,
              (D) => `${(D * 100).toFixed(2)}%`
            ),
            /* @__PURE__ */ e.jsx("div", { style: {
              borderTop: "1px solid var(--edge)",
              marginTop: 4,
              paddingTop: 6,
              fontSize: 10.5,
              color: "var(--dim)"
            }, children: x ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between" }, children: [
                /* @__PURE__ */ e.jsx("span", { children: "nearest training window" }),
                /* @__PURE__ */ e.jsxs("span", { style: { fontFamily: "var(--mono)", color: "var(--text)" }, children: [
                  x.median.toFixed(2),
                  "x median"
                ] })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between" }, children: [
                /* @__PURE__ */ e.jsx("span", { children: "closest sample" }),
                /* @__PURE__ */ e.jsxs("span", { style: {
                  fontFamily: "var(--mono)",
                  color: x.min < 0.05 ? "var(--err, #f0426c)" : "var(--text)"
                }, children: [
                  x.min.toFixed(2),
                  "x"
                ] })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { children: [
                x.close ? `${x.close} of ${Y.nS} samples are near-copies of a training window` : "no sample is a copy of a training window",
                " ",
                "(1.0x = typical spacing between two windows)"
              ] })
            ] }) : /* @__PURE__ */ e.jsx("span", { children: "memorisation meter: measuring after the last step" }) }),
            /* @__PURE__ */ e.jsxs("div", { style: { fontSize: 10, color: "var(--dim)" }, children: [
              Y.nWindowsTotal.toLocaleString(),
              " windows × ",
              Y.h,
              " bars",
              Y.stride > 1 ? `, every ${Y.stride} bars` : "",
              Y.dnW < Y.nW ? `; denoiser sums ${Y.dnW}` : ""
            ] }),
            Y.isDemo && /* @__PURE__ */ e.jsx("div", { style: { fontSize: 10, color: "var(--dim)" }, children: "demo distribution: synthetic vol-clustered series. FIT TO MY DATA above runs this on your own dataset." })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            className: "absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3",
            style: { ...W, padding: "8px 14px", width: "min(560px, 70%)" },
            children: [
              /* @__PURE__ */ e.jsx(
                "button",
                {
                  style: { ...O, width: 30, textAlign: "center", flexShrink: 0 },
                  onClick: () => {
                    const D = R.current;
                    !D.playing && z.current && D.head >= z.current.T && (D.head = 0), D.playing = !D.playing, r(D.playing);
                  },
                  children: o ? "❚❚" : "▶"
                }
              ),
              /* @__PURE__ */ e.jsxs(
                "div",
                {
                  ref: k,
                  style: {
                    position: "relative",
                    flex: 1,
                    height: 14,
                    background: "var(--hover)",
                    borderRadius: 2,
                    cursor: "pointer",
                    touchAction: "none"
                  },
                  onPointerDown: (D) => {
                    D.currentTarget.setPointerCapture(D.pointerId), w(D);
                  },
                  onPointerMove: (D) => {
                    D.buttons & 1 && w(D);
                  },
                  children: [
                    /* @__PURE__ */ e.jsx("div", { ref: $, style: {
                      position: "absolute",
                      inset: 0,
                      width: 0,
                      background: "color-mix(in srgb, var(--text) 12%, transparent)",
                      borderRadius: 2
                    } }),
                    /* @__PURE__ */ e.jsx("div", { ref: v, style: {
                      position: "absolute",
                      inset: 0,
                      width: 0,
                      background: `linear-gradient(90deg, ${Ft[1]}, ${Ft[3]})`,
                      borderRadius: 2,
                      opacity: 0.85
                    } })
                  ]
                }
              ),
              /* @__PURE__ */ e.jsx(
                "span",
                {
                  ref: A,
                  style: {
                    fontSize: 10.5,
                    fontFamily: "var(--mono)",
                    color: "var(--dim)",
                    whiteSpace: "nowrap",
                    flexShrink: 0
                  },
                  children: "step 0"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function Ri(t, s, n, o, r) {
  const i = t.getContext("2d");
  if (!i) return;
  const l = window.devicePixelRatio || 1, c = t.width / l, d = t.height / l;
  i.setTransform(l, 0, 0, l, 0, 0), i.clearRect(0, 0, c, d);
  const { h: x, nS: p, coord: C, sigma: m, lastPrice: j, logRet: u, tail: N } = s, b = Hs("--text", "#e4e4e7"), P = Hs("--dim", "#a1a1aa"), f = Hs("--edge", "#3f3f46"), k = Math.max(0, Math.min(Math.floor(n), s.traj.length - 1)), v = Math.min(k + 1, s.traj.length - 1), $ = Math.min(1, Math.max(0, n - k)), A = s.traj[k], z = s.traj[v], R = s.blend;
  for (let H = 0; H < R.length; H++) R[H] = A[H] + (z[H] - A[H]) * $;
  const T = 8, I = 46, F = Math.min(90, c * 0.1), S = d - T - I, h = 10, y = c * 0.32, w = y, M = c - F - 8, Y = (H) => u ? j * Math.exp(m * H) : j + m * H, _ = (H) => T + (1 - (H - s.yMin) / (s.yMax - s.yMin)) * S, se = (H) => h + H / Math.max(1, N.length - 1) * (y - h), V = (H) => w + (H + 1) / x * (M - w);
  i.font = `10px ${Hs("--mono", "ui-monospace, monospace")}`;
  for (let H = 0; H <= 4; H++) {
    const me = s.yMin + (s.yMax - s.yMin) * H / 4, be = _(me);
    i.strokeStyle = f, i.globalAlpha = 0.35, i.beginPath(), i.moveTo(h, be), i.lineTo(M, be), i.stroke(), i.globalAlpha = 0.8, i.fillStyle = P, i.fillText(Kn(me), M + 4, be + 3);
  }
  i.globalAlpha = 1;
  const W = s.T - n, te = Math.max(0, Math.min(s.T, Math.floor(W))), O = s.ab[te] + (s.ab[Math.min(s.T, te + 1)] - s.ab[te]) * (W - te), L = Math.sqrt(Math.max(0, Math.min(1, O))), D = "#52525b";
  let X = 1 / 0, B = -1 / 0;
  for (let H = 0; H < p; H++) {
    const me = R[H * x + x - 1] * C[x - 1];
    me < X && (X = me), me > B && (B = me);
  }
  const g = Math.max(1e-9, B - X);
  i.lineWidth = 1, i.globalAlpha = 0.12 + 0.2 * L;
  const oe = _(j);
  for (let H = 0; H < p; H++) {
    const me = H * x, be = R[me + x - 1] * C[x - 1];
    i.strokeStyle = Fi(D, wi((be - X) / g), L), i.beginPath(), i.moveTo(w, oe);
    for (let Re = 0; Re < x; Re++) i.lineTo(V(Re), _(Y(R[me + Re] * C[Re])));
    i.stroke();
  }
  if (i.globalAlpha = 1, o && s.x0traj.length > 0) {
    const H = s.x0traj[Math.min(k, s.x0traj.length - 1)];
    i.globalAlpha = 0.05, i.strokeStyle = Ft[4];
    for (let me = 0; me < p; me++) {
      const be = me * x;
      i.beginPath(), i.moveTo(w, oe);
      for (let Re = 0; Re < x; Re++) i.lineTo(V(Re), _(Y(H[be + Re] * C[Re])));
      i.stroke();
    }
    i.globalAlpha = 1;
  }
  const re = new Float32Array(p), U = new Float32Array(x), ee = new Float32Array(x), E = new Float32Array(x);
  for (let H = 0; H < x; H++) {
    for (let me = 0; me < p; me++) re[me] = R[me * x + H] * C[H];
    re.sort(), U[H] = Y(re[Math.floor(0.05 * p)]), ee[H] = Y(re[Math.floor(0.5 * p)]), E[H] = Y(re[Math.floor(0.95 * p)]);
  }
  i.beginPath(), i.moveTo(w, oe);
  for (let H = 0; H < x; H++) i.lineTo(V(H), _(E[H]));
  for (let H = x - 1; H >= 0; H--) i.lineTo(V(H), _(U[H]));
  i.closePath(), i.fillStyle = Ft[2], i.globalAlpha = 0.05 + 0.05 * L, i.fill(), i.globalAlpha = 0.5 + 0.4 * L, i.strokeStyle = Ft[3], i.lineWidth = 1.4, i.beginPath(), i.moveTo(w, oe);
  for (let H = 0; H < x; H++) i.lineTo(V(H), _(ee[H]));
  if (i.stroke(), i.globalAlpha = 1, N.length > 1) {
    i.strokeStyle = b, i.lineWidth = 1.4, i.beginPath();
    for (let H = 0; H < N.length; H++) {
      const me = se(H), be = _(N[H]);
      H === 0 ? i.moveTo(me, be) : i.lineTo(me, be);
    }
    i.stroke(), i.fillStyle = P, i.fillText(s.isDemo ? "demo history" : `${s.symbol} history`, h + 2, T + 12), i.fillText("generated", w + 6, T + 12), i.strokeStyle = f, i.globalAlpha = 0.6, i.setLineDash([3, 4]), i.beginPath(), i.moveTo(w, T), i.lineTo(w, T + S), i.stroke(), i.setLineDash([]), i.globalAlpha = 1;
  }
  const G = 44, J = new Float32Array(G), K = new Float32Array(G), ue = (H) => Math.max(0, Math.min(
    G - 1,
    Math.floor((H - s.yMin) / (s.yMax - s.yMin) * G)
  ));
  for (let H = 0; H < p; H++) J[ue(Y(R[H * x + x - 1] * C[x - 1]))]++;
  for (let H = 0; H < s.nW; H++) K[ue(s.wTermPrice[H])]++;
  let ce = 1, Q = 1;
  for (let H = 0; H < G; H++)
    ce = Math.max(ce, J[H]), Q = Math.max(Q, K[H]);
  const ne = c - 4;
  i.fillStyle = Ft[2], i.globalAlpha = 0.5;
  for (let H = 0; H < G; H++) {
    const me = T + (1 - (H + 1) / G) * S, be = J[H] / ce * (F - 8);
    be > 0 && i.fillRect(ne - be, me, be, S / G - 1);
  }
  i.globalAlpha = 0.9, i.strokeStyle = P, i.lineWidth = 1, i.beginPath();
  for (let H = G - 1; H >= 0; H--) {
    const me = T + (1 - (H + 0.5) / G) * S, be = ne - K[H] / Q * (F - 8);
    H === G - 1 ? i.moveTo(be, me) : i.lineTo(be, me);
  }
  if (i.stroke(), i.globalAlpha = 1, r && r.y > T && r.y < T + S) {
    const H = s.yMin + (1 - (r.y - T) / S) * (s.yMax - s.yMin);
    i.strokeStyle = P, i.globalAlpha = 0.4, i.setLineDash([2, 4]), i.beginPath(), i.moveTo(h, r.y), i.lineTo(M, r.y), i.stroke(), i.setLineDash([]), i.globalAlpha = 1, i.fillStyle = b, i.fillText(Kn(H), Math.min(r.x + 8, M - 48), r.y - 4);
  }
}
function Fi(t, s, n) {
  const o = s.match(/rgb\((\d+),(\d+),(\d+)\)/);
  if (!o) return s;
  const r = parseInt(t.slice(1, 3), 16), i = parseInt(t.slice(3, 5), 16), l = parseInt(t.slice(5, 7), 16), c = Math.round(r + (Number(o[1]) - r) * n), d = Math.round(i + (Number(o[2]) - i) * n), x = Math.round(l + (Number(o[3]) - l) * n);
  return `rgb(${c},${d},${x})`;
}
function hs(t, s) {
  return typeof window > "u" ? s : getComputedStyle(document.documentElement).getPropertyValue(t).trim() || s;
}
function ea(t, s, n, o) {
  const r = o.clone();
  return t < 0 ? r.lerp(n, Math.min(1, -t)) : r.lerp(s, Math.min(1, t)), r;
}
function Pi(t) {
  const s = t.map((r) => [...r]);
  let n = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  for (let r = 0; r < 24; r++) {
    let i = 0;
    for (let l = 0; l < 2; l++)
      for (let c = l + 1; c < 3; c++) i += s[l][c] * s[l][c];
    if (i < 1e-14) break;
    for (let l = 0; l < 2; l++)
      for (let c = l + 1; c < 3; c++) {
        if (Math.abs(s[l][c]) < 1e-15) continue;
        const d = (s[c][c] - s[l][l]) / (2 * s[l][c]), x = Math.sign(d || 1) / (Math.abs(d) + Math.sqrt(d * d + 1)), p = 1 / Math.sqrt(x * x + 1), C = x * p;
        for (let m = 0; m < 3; m++) {
          const j = s[m][l], u = s[m][c];
          s[m][l] = p * j - C * u, s[m][c] = C * j + p * u;
        }
        for (let m = 0; m < 3; m++) {
          const j = s[l][m], u = s[c][m];
          s[l][m] = p * j - C * u, s[c][m] = C * j + p * u;
          const N = n[m][l], b = n[m][c];
          n[m][l] = p * N - C * b, n[m][c] = C * N + p * b;
        }
      }
  }
  const o = [0, 1, 2].map((r) => ({ val: s[r][r], vec: [n[0][r], n[1][r], n[2][r]] }));
  return o.sort((r, i) => i.val - r.val), { values: o.map((r) => Math.max(0, r.val)), vectors: o.map((r) => r.vec) };
}
function Ei(t) {
  let s = t >>> 0;
  return () => {
    s = s + 1831565813 >>> 0;
    let n = s;
    return n = Math.imul(n ^ n >>> 15, n | 1), n ^= n + Math.imul(n ^ n >>> 7, n | 61), ((n ^ n >>> 14) >>> 0) / 4294967296;
  };
}
function Ti({ size: t = 20 }) {
  return /* @__PURE__ */ e.jsxs("group", { children: [
    /* @__PURE__ */ e.jsx("gridHelper", { args: [t, t, "#3a3a3a", "#2e2e2e"], position: [0, -t / 4, 0] }),
    /* @__PURE__ */ e.jsx("gridHelper", { args: [t, t, "#3a3a3a", "#2e2e2e"], position: [0, t / 4, -t / 2], rotation: [Math.PI / 2, 0, 0] })
  ] });
}
function ta({ positions: t, colors: s, size: n, onMesh: o, onHover: r }) {
  const i = a.useMemo(() => {
    const l = t.length / 3, c = new $a(n, 12, 8), d = new Ia({ roughness: 0.38, metalness: 0.12 }), x = new za(c, d, l), p = new ra(), C = new yt();
    for (let m = 0; m < l; m++)
      p.position.set(t[m * 3], t[m * 3 + 1], t[m * 3 + 2]), p.updateMatrix(), x.setMatrixAt(m, p.matrix), C.setRGB(s[m * 3], s[m * 3 + 1], s[m * 3 + 2]), x.setColorAt(m, C);
    return x.instanceMatrix.needsUpdate = !0, x.instanceColor && (x.instanceColor.needsUpdate = !0), x;
  }, [t, s, n]);
  return a.useEffect(() => {
    o?.(i);
  }, [i, o]), /* @__PURE__ */ e.jsx(
    "primitive",
    {
      object: i,
      onPointerMove: r ? (l) => {
        l.stopPropagation(), r(l.instanceId ?? null, l.clientX, l.clientY);
      } : void 0,
      onPointerOut: r ? () => r(null, 0, 0) : void 0
    }
  );
}
function sa({ pts: t, color: s, opacity: n = 1 }) {
  const o = a.useMemo(() => {
    const r = new At();
    return r.setAttribute("position", new Mt(t, 3)), new oa(r, new ia({ color: s, transparent: !0, opacity: n }));
  }, [t, s, n]);
  return /* @__PURE__ */ e.jsx("primitive", { object: o });
}
const Es = 6;
function na({ fitted: t }) {
  const [s, n] = a.useState(!0), [o, r] = a.useState(!0), [i, l] = a.useState(!1), [c, d] = a.useState(!1), x = a.useRef(null), [p, C] = a.useState(2.2), [m, j] = a.useState(1.1), [u, N] = a.useState(0.45), [b, P] = a.useState(0.25), [f, k] = a.useState(900), v = a.useMemo(() => ({
    up: new yt(hs("--up", "#21b3a4")),
    down: new yt(hs("--down", "#f0426c")),
    mid: new yt(hs("--dim", "#b0b0b0")),
    text: hs("--text", "#e8e8e8"),
    dim: hs("--dim", "#b0b0b0"),
    edge: hs("--edge", "#3a3a3a")
  }), []), $ = a.useMemo(() => {
    if (t) return null;
    const O = Ei(1337), L = () => {
      const Q = Math.max(O(), 1e-9), ne = O();
      return Math.sqrt(-2 * Math.log(Q)) * Math.cos(2 * Math.PI * ne);
    }, D = new La(0.55, 0.65, 0.25), X = new Ta().makeRotationFromEuler(D), B = new Float32Array(f * 3), g = new Float32Array(f * 3), oe = [], re = new wn();
    for (let Q = 0; Q < f; Q++) {
      const ne = L() * p, H = L() * m, me = L() * u;
      re.set(ne + L() * b, H + L() * b, me + L() * b), re.applyMatrix4(X), oe.push([re.x, re.y, re.z]);
    }
    const U = [0, 1, 2].map((Q) => oe.reduce((ne, H) => ne + H[Q], 0) / f), ee = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    for (const Q of oe)
      for (let ne = 0; ne < 3; ne++)
        for (let H = 0; H < 3; H++)
          ee[ne][H] += (Q[ne] - U[ne]) * (Q[H] - U[H]) / (f - 1);
    const { values: E, vectors: G } = Pi(ee), J = Math.sqrt(E[0]) * 2.6 || 1, K = Es / J;
    for (let Q = 0; Q < f; Q++) {
      B[Q * 3] = (oe[Q][0] - U[0]) * K, B[Q * 3 + 1] = (oe[Q][1] - U[1]) * K, B[Q * 3 + 2] = (oe[Q][2] - U[2]) * K;
      const ne = (oe[Q][0] - U[0]) * G[0][0] + (oe[Q][1] - U[1]) * G[0][1] + (oe[Q][2] - U[2]) * G[0][2], H = Math.max(-1, Math.min(1, ne / (Math.sqrt(E[0]) * 2 || 1))), me = ea(H, v.up, v.down, v.mid);
      g[Q * 3] = me.r, g[Q * 3 + 1] = me.g, g[Q * 3 + 2] = me.b;
    }
    const ue = E[0] + E[1] + E[2] || 1, ce = G.map((Q, ne) => {
      const H = Math.sqrt(E[ne]) * 2.2 * K;
      return {
        tip: [Q[0] * H, Q[1] * H, Q[2] * H],
        neg: [-Q[0] * H, -Q[1] * H, -Q[2] * H],
        pct: E[ne] / ue * 100
      };
    });
    return { pos: B, col: g, axes: ce, varPct: E.map((Q) => Q / ue * 100) };
  }, [t, p, m, u, b, f, v]), A = a.useMemo(() => {
    if (!t) return null;
    const O = t.scores.length, L = [0, 1, 2].map((E) => {
      let G = 0, J = 0;
      for (const ue of t.scores)
        G += ue[E], J += ue[E] * ue[E];
      const K = G / O;
      return Math.sqrt(Math.max(J / O - K * K, 1e-12));
    }), D = c ? [L[0] * 3, L[0] * 3, L[0] * 3] : [L[0] * 3, L[1] * 3, L[2] * 3], X = new Float32Array(O * 3), B = new Float32Array(O * 3), g = t.color_lim || 1;
    for (let E = 0; E < O; E++) {
      const G = t.scores[E];
      X[E * 3] = G[0] / D[0] * Es, X[E * 3 + 1] = G[1] / D[1] * Es, X[E * 3 + 2] = G[2] / D[2] * Es;
      const J = t.color[E], K = Number.isFinite(J) ? Math.max(-1, Math.min(1, J / g)) : 0, ue = ea(K, v.up, v.down, v.mid);
      B[E * 3] = ue.r, B[E * 3 + 1] = ue.g, B[E * 3 + 2] = ue.b;
    }
    let oe = 0, re = -1;
    for (let E = 0; E < O; E++) {
      const G = X[E * 3] ** 2 + X[E * 3 + 1] ** 2 + X[E * 3 + 2] ** 2;
      G > re && (re = G, oe = E);
    }
    const U = t.ts?.[oe], ee = {
      idx: oe,
      pos: [X[oe * 3], X[oe * 3 + 1], X[oe * 3 + 2]],
      label: U ? new Date(U * 1e3).toLocaleDateString(void 0, { day: "numeric", month: "short", year: "numeric" }) : ""
    };
    return { pos: X, col: B, n: O, extreme: ee, std: L };
  }, [t, c, v]), z = a.useMemo(() => {
    if (!A) return null;
    const O = new At();
    return O.setAttribute("position", new Mt(A.pos, 3)), O.setDrawRange(Math.max(0, A.n - 100), Math.min(100, A.n)), new oa(O, new ia({
      color: v.text,
      transparent: !0,
      opacity: 0.35
    }));
  }, [A, v]), [R, T] = a.useState(!1), I = a.useRef({ i: -1 }), F = a.useRef(null), S = a.useRef(null), h = (O) => {
    if (!A) return;
    I.current.i = O, F.current && (F.current.count = O), z && z.geometry.setDrawRange(Math.max(0, O - 100), Math.min(100, O));
    const L = S.current;
    if (L) {
      L.style.display = "block";
      const D = t?.ts?.[O - 1], X = t?.color?.[O - 1], B = D ? new Date(D * 1e3).toLocaleDateString(void 0, { year: "numeric", month: "short", day: "numeric" }) : `bar ${O} of ${A.n}`;
      L.textContent = Number.isFinite(X) ? `${B}   ${X.toFixed(2)}` : B;
    }
  }, y = (O) => {
    F.current = O, A && I.current.i >= 0 && (O.count = I.current.i);
  };
  a.useEffect(() => {
    if (!R || !A) return;
    const O = Math.max(1, Math.round(A.n / 1440));
    let L = 0;
    const D = () => {
      let X = I.current.i + O;
      if (X >= A.n) {
        X = A.n, h(X), T(!1);
        return;
      }
      h(X), L = requestAnimationFrame(D);
    };
    return L = requestAnimationFrame(D), () => cancelAnimationFrame(L);
  }, [R, A]);
  const w = a.useRef(null), M = (O, L, D) => {
    const X = w.current;
    if (!X) return;
    if (O == null || !A || !t) {
      X.style.display = "none";
      return;
    }
    const B = X.parentElement;
    if (!B) return;
    const g = B.getBoundingClientRect(), oe = t.ts?.[O], re = oe ? new Date(oe * 1e3).toLocaleDateString(void 0, { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : `bar ${O + 1} of ${A.n}`, U = t.color[O], ee = t.scores[O], E = (G) => {
      const J = ee[G] / (A.std[G] || 1);
      return `${J > 0 ? "+" : ""}${J.toFixed(1)}σ`;
    };
    X.innerHTML = `<div style="color:var(--text)">${re}</div>` + (Number.isFinite(U) ? `<div>${U > 0 ? "+" : ""}${U.toFixed(2)} ${t.color_label}</div>` : "") + `<div>PC1 ${E(0)} &nbsp; PC2 ${E(1)} &nbsp; PC3 ${E(2)}</div>`, X.style.left = Math.min(L - g.left + 14, g.width - 190) + "px", X.style.top = Math.max(D - g.top - 12, 6) + "px", X.style.display = "block";
  }, Y = () => {
    if (A) {
      if (R) {
        T(!1);
        return;
      }
      (I.current.i < 0 || I.current.i >= A.n) && h(0), T(!0);
    }
  }, _ = t ? t.var_pct : $ ? $.varPct : [], se = (O) => `PC${O + 1}${_[O] != null ? " " + _[O].toFixed(1) + "%" : ""}`, V = Es * 1.15, W = [
    [V, 0, 0],
    [0, V, 0],
    [0, 0, V]
  ], te = a.useMemo(() => t ? ["pc1", "pc2", "pc3"].map((O) => (t.loadings[O] || []).map((D, X) => ({ name: t.names[X], v: D })).sort((D, X) => Math.abs(X.v) - Math.abs(D.v)).slice(0, 4)) : null, [t]);
  return /* @__PURE__ */ e.jsxs("div", { className: "relative w-full h-[calc(100vh-180px)] min-h-[600px] bg-[var(--bg)] rounded-lg overflow-hidden border border-border", children: [
    /* @__PURE__ */ e.jsxs(It, { camera: { position: [13, 9, 13], fov: 45 }, style: { background: "var(--bg, #1c1c1c)" }, children: [
      /* @__PURE__ */ e.jsx("ambientLight", { intensity: 0.45 }),
      /* @__PURE__ */ e.jsx("pointLight", { position: [10, 20, 10], intensity: 1.1 }),
      /* @__PURE__ */ e.jsx("directionalLight", { position: [-10, 15, 10], intensity: 0.7 }),
      /* @__PURE__ */ e.jsx("directionalLight", { position: [10, -10, -10], intensity: 0.25 }),
      /* @__PURE__ */ e.jsx(Ti, { size: 20 }),
      $ && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(ta, { positions: $.pos, colors: $.col, size: 0.11 }),
        $.axes.map((O, L) => /* @__PURE__ */ e.jsxs("group", { children: [
          /* @__PURE__ */ e.jsx(sa, { pts: new Float32Array([...O.neg, ...O.tip]), color: v.text, opacity: L === 0 ? 0.9 : 0.55 }),
          /* @__PURE__ */ e.jsx(ke, { position: O.tip, fontSize: 0.42, color: v.dim, anchorX: "left", children: "  PC" + (L + 1) + " " + O.pct.toFixed(0) + "%" })
        ] }, L))
      ] }),
      A && t && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(ta, { positions: A.pos, colors: A.col, size: 0.13, onMesh: y, onHover: M }),
        W.map((O, L) => /* @__PURE__ */ e.jsxs("group", { children: [
          /* @__PURE__ */ e.jsx(
            sa,
            {
              pts: new Float32Array([-O[0], -O[1], -O[2], O[0], O[1], O[2]]),
              color: v.edge,
              opacity: 0.9
            }
          ),
          /* @__PURE__ */ e.jsx(ke, { position: O, fontSize: 0.42, color: v.dim, anchorX: "left", children: "  " + se(L) })
        ] }, L)),
        i && z && /* @__PURE__ */ e.jsx("primitive", { object: z }),
        A.extreme.label && !R && /* @__PURE__ */ e.jsx(Bs, { position: [A.extreme.pos[0], A.extreme.pos[1] + 0.7, A.extreme.pos[2]], children: /* @__PURE__ */ e.jsx(ke, { fontSize: 0.55, color: v.text, anchorX: "center", children: A.extreme.label }) })
      ] }),
      /* @__PURE__ */ e.jsx(zt, { ref: x, enablePan: !0, enableZoom: !0, enableRotate: !0, minDistance: 4, maxDistance: 50 })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none", children: [
      /* @__PURE__ */ e.jsx(
        "div",
        {
          className: "rounded px-2.5 py-1 border border-border text-xs",
          style: { background: "var(--panel)", color: "var(--dim)" },
          children: "Principal Component Analysis"
        }
      ),
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 pointer-events-auto", children: [
        t && /* @__PURE__ */ e.jsxs(le, { variant: "outline", size: "sm", onClick: Y, className: "bg-card text-[var(--text)] hover:text-[var(--text)]", children: [
          R ? /* @__PURE__ */ e.jsx(os, { className: "h-4 w-4 mr-1" }) : /* @__PURE__ */ e.jsx(Bt, { className: "h-4 w-4 mr-1" }),
          R ? "Pause" : "Play"
        ] }),
        /* @__PURE__ */ e.jsxs(le, { variant: "outline", size: "sm", onClick: () => x.current?.reset(), className: "bg-card text-[var(--text)] hover:text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsx(jt, { className: "h-4 w-4 mr-1" }),
          "Reset View"
        ] })
      ] })
    ] }),
    !t && /* @__PURE__ */ e.jsx("div", { className: "absolute left-4 top-20 w-72 space-y-2 pointer-events-auto", children: /* @__PURE__ */ e.jsxs($e, { open: s, onOpenChange: n, children: [
      /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[var(--text)] hover:text-[var(--text)]", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e.jsx(vt, { className: "h-4 w-4" }),
          "Factor Parameters"
        ] }),
        s ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
      ] }) }),
      /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsx(Fe, { className: "mt-2 p-4 bg-card border-border space-y-4 text-[var(--text)]", children: !t && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        [
          ["Factor 1 Variance", p, C, 0.2, 3],
          ["Factor 2 Variance", m, j, 0.1, 3],
          ["Factor 3 Variance", u, N, 0.05, 3],
          ["Noise", b, P, 0, 1.5]
        ].map(([O, L, D, X, B]) => /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: O }),
            /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[var(--text)]", children: L.toFixed(2) })
          ] }),
          /* @__PURE__ */ e.jsx(xe, { value: [L], onValueChange: ([g]) => D(g), min: X, max: B, step: 0.05 })
        ] }, O)),
        /* @__PURE__ */ e.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ e.jsx(q, { className: "text-xs text-[var(--dim)]", children: "Points" }),
            /* @__PURE__ */ e.jsx("span", { className: "text-xs font-medium text-[var(--text)]", children: f })
          ] }),
          /* @__PURE__ */ e.jsx(xe, { value: [f], onValueChange: ([O]) => k(O), min: 200, max: 3e3, step: 100 })
        ] })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "absolute right-4 top-20 w-64 space-y-2 pointer-events-auto", children: [
      /* @__PURE__ */ e.jsxs($e, { open: o, onOpenChange: r, children: [
        /* @__PURE__ */ e.jsx(Ie, { asChild: !0, children: /* @__PURE__ */ e.jsxs(le, { variant: "outline", className: "w-full justify-between bg-card text-[var(--text)] hover:text-[var(--text)]", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(gn, { className: "h-4 w-4" }),
            "Statistics"
          ] }),
          o ? /* @__PURE__ */ e.jsx(Le, { className: "h-4 w-4" }) : /* @__PURE__ */ e.jsx(Ae, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ e.jsx(ze, { children: /* @__PURE__ */ e.jsxs(Fe, { className: "mt-2 p-4 bg-card border-border space-y-1.5 text-[var(--text)]", children: [
          _.slice(0, 3).map((O, L) => /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between text-xs", children: [
            /* @__PURE__ */ e.jsxs("span", { style: { color: "var(--dim)" }, children: [
              "PC",
              L + 1,
              " variance"
            ] }),
            /* @__PURE__ */ e.jsxs("span", { className: "font-medium", children: [
              O.toFixed(1),
              "%"
            ] })
          ] }, L)),
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between text-xs", children: [
            /* @__PURE__ */ e.jsx("span", { style: { color: "var(--dim)" }, children: "Top 3 together" }),
            /* @__PURE__ */ e.jsxs("span", { className: "font-medium", children: [
              _.slice(0, 3).reduce((O, L) => O + L, 0).toFixed(1),
              "%"
            ] })
          ] }),
          t && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between text-xs", children: [
              /* @__PURE__ */ e.jsx("span", { style: { color: "var(--dim)" }, children: "Effective factors" }),
              /* @__PURE__ */ e.jsx("span", { className: "font-medium", children: t.eff_dim })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between text-xs", children: [
              /* @__PURE__ */ e.jsx("span", { style: { color: "var(--dim)" }, children: "Bars" }),
              /* @__PURE__ */ e.jsxs("span", { className: "font-medium", children: [
                t.n_bars.toLocaleString(),
                " (",
                t.tf,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "pt-2", style: { borderTop: "1px solid var(--edge)" }, children: [
              /* @__PURE__ */ e.jsxs("div", { className: "text-2xs tracking-widest pb-1", style: { color: "var(--dim)" }, children: [
                "COLOR: ",
                t.color_label.toUpperCase()
              ] }),
              /* @__PURE__ */ e.jsx("div", { style: {
                height: 8,
                borderRadius: 2,
                border: "1px solid var(--edge)",
                background: "linear-gradient(90deg, var(--down), var(--dim), var(--up))"
              } }),
              /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between text-2xs", style: { color: "var(--dim)" }, children: [
                /* @__PURE__ */ e.jsxs("span", { children: [
                  "-",
                  t.color_lim
                ] }),
                /* @__PURE__ */ e.jsx("span", { children: "0" }),
                /* @__PURE__ */ e.jsxs("span", { children: [
                  "+",
                  t.color_lim
                ] })
              ] })
            ] })
          ] })
        ] }) })
      ] }),
      t && te && /* @__PURE__ */ e.jsx(Fe, { className: "p-4 bg-card border-border text-[var(--text)]", children: te.map((O, L) => /* @__PURE__ */ e.jsxs("div", { className: L ? "pt-2" : "", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "text-2xs tracking-widest pb-1", style: { color: "var(--dim)" }, children: [
          "PC",
          L + 1,
          " DRIVERS"
        ] }),
        O.map((D) => /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 py-0.5", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-xs truncate", style: { width: 92 }, children: D.name }),
          /* @__PURE__ */ e.jsx("span", { style: { flex: 1, position: "relative", height: 4, background: "var(--bg)", borderRadius: 2 }, children: /* @__PURE__ */ e.jsx("i", { style: {
            position: "absolute",
            top: 0,
            height: "100%",
            left: "50%",
            borderRadius: 2,
            width: Math.round(Math.abs(D.v) * 50) + "%",
            background: D.v < 0 ? "var(--down)" : "var(--up)",
            transform: D.v < 0 ? "translateX(-100%)" : void 0
          } }) }),
          /* @__PURE__ */ e.jsx("span", { className: "text-2xs tabular-nums", style: { color: "var(--dim)", width: 34, textAlign: "right" }, children: (D.v > 0 ? "+" : "") + D.v.toFixed(2) })
        ] }, D.name))
      ] }, L)) })
    ] }),
    /* @__PURE__ */ e.jsx(
      "div",
      {
        ref: w,
        className: "absolute pointer-events-none bg-card rounded-lg px-3 py-2 border border-border",
        style: {
          display: "none",
          fontSize: 11.5,
          lineHeight: 1.6,
          color: "var(--dim)",
          fontVariantNumeric: "tabular-nums",
          zIndex: 5,
          minWidth: 150
        }
      }
    ),
    /* @__PURE__ */ e.jsx(
      "div",
      {
        ref: S,
        className: "absolute bottom-4 left-4 pointer-events-none bg-card rounded-lg px-4 py-2 border border-border",
        style: {
          display: "none",
          color: "var(--text)",
          fontSize: 15,
          fontVariantNumeric: "tabular-nums",
          fontFamily: "var(--mono)"
        }
      }
    ),
    /* @__PURE__ */ e.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none", children: /* @__PURE__ */ e.jsxs("div", { className: "bg-card rounded-lg px-4 py-2 border border-border flex items-center gap-6 text-xs", style: { color: "var(--dim)" }, children: [
      /* @__PURE__ */ e.jsx("span", { children: "Drag to rotate" }),
      /* @__PURE__ */ e.jsx("span", { children: "Scroll to zoom" }),
      /* @__PURE__ */ e.jsx("span", { children: "Right-click to pan" }),
      /* @__PURE__ */ e.jsx("span", { children: t ? `Points: ${t.scores.length.toLocaleString()}` : `Points: ${f.toLocaleString()}` })
    ] }) })
  ] });
}
const Ma = [
  {
    name: "OPTIONS & VOLATILITY",
    models: [
      { id: "volatility-surface", label: "Implied Vol Surface", formula: "σ(K,T) = σ_ATM + skew·ln(K/S) + kurt·ln²(K/S) + term·√T", component: () => /* @__PURE__ */ e.jsx(mr, {}) },
      { id: "black-scholes", label: "Black-Scholes", formula: "C = S·N(d₁) - K·e^(-rT)·N(d₂)", component: () => /* @__PURE__ */ e.jsx(Or, {}) },
      { id: "greeks-surface", label: "Option Greeks", formula: "Δ = N(d₁), Γ = N′(d₁)/(Sσ√T)", component: () => /* @__PURE__ */ e.jsx(Sr, {}) },
      { id: "heston", label: "Heston Stochastic Vol", formula: "dv = κ(θ - v)dt + σ√v dW_v", component: () => /* @__PURE__ */ e.jsx(ir, {}) },
      { id: "garch", label: "GARCH(1,1)", formula: "σ²ₜ = ω + α·r²ₜ₋₁ + β·σ²ₜ₋₁", component: () => /* @__PURE__ */ e.jsx(Oo, {}) }
    ]
  },
  {
    name: "SIMULATION & RISK",
    models: [
      { id: "monte-carlo", label: "Monte Carlo (GBM)", formula: "dS = μS dt + σS dW", component: () => /* @__PURE__ */ e.jsx(rr, {}) },
      {
        id: "diffusion",
        label: "Diffusion Simulator",
        formula: "xₜ = √ᾱₜ·x₀ + √(1-ᾱₜ)·ε",
        component: () => /* @__PURE__ */ e.jsx(Jn, {}),
        fittedComponent: (t) => /* @__PURE__ */ e.jsx(Jn, { fitted: t })
      },
      { id: "var-surface", label: "Value at Risk", formula: "I(λ,c) ∝ (1-c)^{-α} · (λ₀/λ)^{1.5}", component: () => /* @__PURE__ */ e.jsx(jr, {}) },
      { id: "efficient-frontier", label: "Efficient Frontier", formula: "min w′Σw s.t. w′μ = μ_target", component: () => /* @__PURE__ */ e.jsx(Zr, {}) },
      { id: "correlation-surface", label: "Correlation Matrix", formula: "ρᵢⱼ = Cov(rᵢ,rⱼ)/(σᵢσⱼ)", component: () => /* @__PURE__ */ e.jsx(Fr, {}) },
      {
        id: "pca",
        label: "Principal Component Analysis Factor Structure",
        formula: "Σ = QΛQᵀ,  fₜ = Q₁..₃ᵀ zₜ",
        component: () => /* @__PURE__ */ e.jsx(na, {}),
        fittedComponent: (t) => /* @__PURE__ */ e.jsx(na, { fitted: t })
      },
      { id: "term-structure", label: "Term Structure", formula: "Nelson-Siegel y(τ) = β₀ + β₁·f(τ/λ) + β₂·g(τ/λ)", component: () => /* @__PURE__ */ e.jsx($r, {}) }
    ]
  },
  {
    name: "FILTERS & STATE",
    models: [
      { id: "kalman", label: "Kalman Filter", formula: "x̂ₜ = x̄ₜ + Kₜ(zₜ - Hx̄ₜ)", component: () => /* @__PURE__ */ e.jsx(mi, {}) },
      { id: "hmm", label: "Hidden Markov Model", formula: "P(Sₜ|O) ∝ P(Oₜ|Sₜ)·Σ P(Sₜ|Sₜ₋₁)", component: () => /* @__PURE__ */ e.jsx(Fo, {}) },
      { id: "gaussian-process", label: "Gaussian Process", formula: "k(x,x′) = σ²_f·exp(-½(x-x′)²/ℓ²)", component: () => /* @__PURE__ */ e.jsx(Jo, {}) }
    ]
  },
  {
    name: "MACHINE LEARNING",
    models: [
      { id: "neural-network", label: "Neural Network", formula: "y = f(Σ wᵢxᵢ + b)", component: () => /* @__PURE__ */ e.jsx(no, {}) },
      { id: "xgboost", label: "XGBoost", formula: "ŷ = Σₖ fₖ(x), fₖ ∈ F", component: () => /* @__PURE__ */ e.jsx(jo, {}) },
      { id: "lstm", label: "LSTM", formula: "cₜ = fₜ·cₜ₋₁ + iₜ·tanh(W_c xₜ + b_c)", component: () => /* @__PURE__ */ e.jsx(yo, {}) },
      { id: "tcn", label: "Temporal ConvNet", formula: "r = 1 + (k-1)·Σ 2ⁱ", component: () => /* @__PURE__ */ e.jsx(vi, {}) },
      { id: "attention", label: "Transformer Attention", formula: "A = softmax(QKᵀ/√dₖ)", component: () => /* @__PURE__ */ e.jsx(ai, {}) }
    ]
  }
], jn = Ma.flatMap((t) => t.models), Li = ({ kind: t }) => /* @__PURE__ */ e.jsxs(
  "svg",
  {
    viewBox: "0 0 16 16",
    width: "14",
    height: "14",
    fill: "none",
    stroke: t === "series" ? "#a074c4" : "#8bc34a",
    strokeWidth: "1.2",
    style: { flex: "none" },
    children: [
      /* @__PURE__ */ e.jsx("rect", { x: "2", y: "3", width: "12", height: "10", rx: "1" }),
      /* @__PURE__ */ e.jsx("path", { d: "M2 6.4h12M6.5 6.4V13M10.7 6.4V13" })
    ]
  }
);
class aa extends a.Component {
  state = { error: null };
  static getDerivedStateFromError(s) {
    return { error: s?.message || "render failed" };
  }
  componentDidUpdate(s) {
    s.resetKey !== this.props.resetKey && this.state.error && this.setState({ error: null });
  }
  render() {
    return this.state.error ? /* @__PURE__ */ e.jsxs("div", { className: "p-4 text-xs", style: { color: "var(--dim)" }, children: [
      "Visualisation failed to start: ",
      this.state.error
    ] }) : this.props.children;
  }
}
const $i = {
  none: "nothing to estimate: this one is an architecture diagram"
}, Ii = (t) => t.rows >= 30;
function zi({ modelId: t, info: s, onFit: n, onClear: o, busy: r, fitted: i, mode: l, setMode: c, prefer: d, refreshInfo: x }) {
  const p = s?.models?.[t], C = p?.needs || "price", m = (s?.datasets || []).filter(Ii), [j, u] = a.useState([]), [N, b] = a.useState(""), [P, f] = a.useState(!1), [k, v] = a.useState("SPY"), [$, A] = a.useState(!1), z = async (h) => {
    if (h) {
      A(!0);
      try {
        (await fetch("/api/quant/add-sample", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ symbol: h })
        })).ok && (await x(), u((w) => C === "universe" ? [...w, h] : [h]));
      } finally {
        A(!1);
      }
    }
  };
  a.useEffect(() => {
    if (j.length || !m.length) return;
    if (d && m.some((y) => y.symbol === d)) {
      u([d]);
      return;
    }
    const h = [...m].sort((y, w) => w.rows - y.rows);
    if (t === "pca") {
      const y = [...m].filter((w) => w.kind === "series" && (w.columns || []).length >= 3).sort((w, M) => (M.columns || []).length - (w.columns || []).length)[0];
      u([(y || h[0]).symbol]);
      return;
    }
    u(C === "universe" ? h.slice(0, 2).map((y) => y.symbol) : [h[0].symbol]);
  }, [m.length, C, d, t]);
  const R = m.filter((h) => j.includes(h.symbol)), T = R.length === 1 ? R[0].columns : [], I = `
    select.qm-sel option { background: var(--bg); color: var(--text); }
    select.qm-sel option:checked {
      background: var(--active) linear-gradient(0deg, var(--active), var(--active));
      color: var(--text);
    }
    select.qm-sel:focus option:checked {
      background: var(--active) linear-gradient(0deg, var(--active), var(--active));
      color: var(--text);
    }
  `, F = {
    background: "var(--bg)",
    color: "var(--text)",
    border: "1px solid var(--edge)",
    borderRadius: 2,
    padding: "3px 6px",
    fontSize: 11,
    maxWidth: 230
  }, S = (h) => /* @__PURE__ */ e.jsx("span", { style: { fontSize: 10, letterSpacing: ".08em", color: "var(--dim)" }, children: h });
  return C === "none" ? /* @__PURE__ */ e.jsxs(
    "div",
    {
      className: "flex items-center gap-3 px-4 py-2 border-b",
      style: { borderColor: "var(--edge)", fontSize: 11, color: "var(--dim)" },
      children: [
        $i.none,
        ". To train one on your data use BACKTEST > MACHINE LEARNING."
      ]
    }
  ) : s && !p ? /* @__PURE__ */ e.jsx(
    "div",
    {
      className: "flex items-center gap-3 px-4 py-2 border-b",
      style: { borderColor: "var(--edge)", fontSize: 11, color: "var(--dim)" },
      children: "The running engine predates this model, so FIT TO MY DATA is not available yet. Restart LSE Terminal after updating the app."
    }
  ) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx("style", { children: I }),
    /* @__PURE__ */ e.jsxs(
      "div",
      {
        className: "flex items-center gap-3 px-4 py-2 border-b flex-wrap",
        style: { borderColor: "var(--edge)" },
        children: [
          S("FIT TO"),
          C === "options" && s?.lse_options && /* @__PURE__ */ e.jsxs("label", { style: { fontSize: 11, display: "flex", alignItems: "center", gap: 5 }, children: [
            /* @__PURE__ */ e.jsx(
              "input",
              {
                type: "checkbox",
                checked: P,
                onChange: (h) => f(h.target.checked)
              }
            ),
            "live LSE chain"
          ] }),
          P && C === "options" ? /* @__PURE__ */ e.jsx(
            "input",
            {
              value: k,
              onChange: (h) => v(h.target.value),
              placeholder: "underlying, e.g. SPY",
              style: { ...F, width: 150 }
            }
          ) : C === "universe" ? (
            // Height follows the library size (up to 6 rows visible): a fixed
            // 58px window over a 10-dataset library showed 2.5 clipped rows and
            // read as broken.
            /* @__PURE__ */ e.jsx(
              "select",
              {
                multiple: !0,
                className: "qm-sel",
                value: j,
                size: Math.min(6, Math.max(3, m.length)),
                style: { ...F, height: "auto", minWidth: 210 },
                onChange: (h) => u([...h.target.selectedOptions].map((y) => y.value)),
                children: m.map((h) => /* @__PURE__ */ e.jsxs("option", { value: h.symbol, children: [
                  h.name,
                  " (",
                  h.timeframe || h.kind,
                  ", ",
                  h.rows.toLocaleString(),
                  ")"
                ] }, h.symbol))
              }
            )
          ) : /* @__PURE__ */ e.jsxs(
            "select",
            {
              className: "qm-sel",
              value: j[0] || "",
              style: F,
              onChange: (h) => {
                u([h.target.value]), b("");
              },
              children: [
                !m.length && /* @__PURE__ */ e.jsx("option", { value: "", children: "no datasets imported yet" }),
                m.map((h) => /* @__PURE__ */ e.jsxs("option", { value: h.symbol, children: [
                  h.name,
                  " (",
                  h.timeframe || h.kind,
                  ", ",
                  h.rows.toLocaleString(),
                  " rows)"
                ] }, h.symbol))
              ]
            }
          ),
          !P && (s?.samples || []).length > 0 && /* @__PURE__ */ e.jsxs(
            "select",
            {
              className: "qm-sel",
              value: "",
              style: F,
              disabled: $,
              onChange: (h) => z(h.target.value),
              children: [
                /* @__PURE__ */ e.jsx("option", { value: "", children: $ ? "adding…" : "+ add sample data" }),
                (s?.samples || []).map((h) => /* @__PURE__ */ e.jsx("option", { value: h.symbol, children: h.name }, h.symbol))
              ]
            }
          ),
          T.length > 1 && !P && C !== "universe" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            S("COLUMN"),
            /* @__PURE__ */ e.jsxs("select", { className: "qm-sel", value: N, style: F, onChange: (h) => b(h.target.value), children: [
              /* @__PURE__ */ e.jsx("option", { value: "", children: "auto" }),
              T.map((h) => /* @__PURE__ */ e.jsx("option", { value: h, children: h }, h))
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(
            "button",
            {
              disabled: r || !P && !j.length,
              onClick: () => n(P && C === "options" ? { model: t, source: "lse-options", underlying: k } : {
                model: t,
                datasets: j,
                opts: N ? { column: N } : {}
              }),
              style: {
                background: "var(--raise)",
                border: "1px solid var(--raise-h)",
                color: "var(--text)",
                borderRadius: 3,
                padding: "4px 12px",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: ".08em",
                cursor: r ? "default" : "pointer",
                opacity: r ? 0.75 : 1
              },
              children: r ? "FITTING" : "FIT TO MY DATA"
            }
          ),
          i?.ok && /* @__PURE__ */ e.jsxs("div", { className: "flex gap-1", children: [
            ["demo", "fitted"].map((h) => /* @__PURE__ */ e.jsx(
              "button",
              {
                onClick: () => c(h),
                style: {
                  fontSize: 10,
                  letterSpacing: ".08em",
                  padding: "3px 8px",
                  borderRadius: 2,
                  textTransform: "uppercase",
                  border: "1px solid " + (l === h ? "var(--edge)" : "transparent"),
                  background: l === h ? "var(--hover)" : "transparent",
                  color: l === h ? "var(--text)" : "var(--dim)"
                },
                children: h === "demo" ? "parametric" : "your data"
              },
              h
            )),
            /* @__PURE__ */ e.jsx(
              "button",
              {
                onClick: o,
                title: "discard this fit and return to the parametric default",
                style: {
                  fontSize: 10,
                  letterSpacing: ".08em",
                  padding: "3px 8px",
                  borderRadius: 2,
                  textTransform: "uppercase",
                  border: "1px solid transparent",
                  background: "transparent",
                  color: "var(--dim)"
                },
                children: "clear fit"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function Gi() {
  const [t, s] = a.useState("volatility-surface"), n = jn.find((k) => k.id === t) || jn[0], [o, r] = a.useState(null), [i, l] = a.useState({}), [c, d] = a.useState(!1), [x, p] = a.useState("demo"), [C, m] = a.useState(null), [j, u] = a.useState(0), N = () => fetch("/api/quant/fit-info").then((k) => k.ok ? k.json() : null).then((k) => {
    k && r(k);
  }).catch(() => r(null));
  a.useEffect(() => {
    N();
  }, []), a.useEffect(() => {
    const k = window;
    return (k.__lseAiIslands ||= {}).quant_models = {
      active_model: n.label,
      formula: n.formula,
      mode: x,
      models_available: jn.length
    }, () => {
      k.__lseAiIslands && delete k.__lseAiIslands.quant_models;
    };
  }, [n, x]);
  const b = i[t] || null;
  a.useEffect(() => {
    p(i[t]?.ok ? "fitted" : "demo");
  }, [t]);
  const P = (k) => {
    const v = String(k.model || t);
    d(!0), fetch("/api/quant/fit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(k)
    }).then(async ($) => $.ok ? $.json() : { ok: !1, error: (await $.json().catch(() => ({}))).detail || `HTTP ${$.status}` }).then(($) => {
      l((A) => ({ ...A, [v]: $ })), p($.ok ? "fitted" : "demo");
    }).catch(($) => l((A) => ({
      ...A,
      [v]: { ok: !1, error: String($.message || $) }
    }))).finally(() => d(!1));
  }, f = () => {
    l((k) => {
      const v = { ...k };
      return delete v[t], v;
    }), p("demo");
  };
  return a.useEffect(() => {
    const k = () => {
      const v = window, $ = v.__lseQmPending;
      if (!$ || !$.symbol) return;
      v.__lseQmPending = null;
      const A = $.model || "diffusion";
      s(A), m($.symbol), P({ model: A, datasets: [$.symbol] });
    };
    return k(), window.addEventListener("lse-qm-open", k), () => window.removeEventListener("lse-qm-open", k);
  }, []), /* @__PURE__ */ e.jsxs("div", { className: "w-full h-full flex", style: { background: "var(--bg)", color: "var(--text)" }, children: [
    /* @__PURE__ */ e.jsxs(
      "aside",
      {
        className: "shrink-0 w-56 overflow-y-auto border-r py-2",
        style: { borderColor: "var(--edge)" },
        children: [
          Ma.map((k) => /* @__PURE__ */ e.jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ e.jsx(
              "div",
              {
                className: "px-3 pb-1 text-2xs tracking-widest",
                style: { color: "var(--dim)" },
                children: k.name
              }
            ),
            k.models.map((v) => /* @__PURE__ */ e.jsx(
              "button",
              {
                onClick: () => s(v.id),
                className: "block w-full text-left px-3 py-1.5 text-xs",
                style: v.id === t ? { background: "var(--hover)", color: "var(--text)", borderLeft: "2px solid var(--text)" } : { color: "var(--dim)", borderLeft: "2px solid transparent" },
                children: v.label
              },
              v.id
            ))
          ] }, k.name)),
          (o?.datasets || []).length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ e.jsx("div", { className: "px-3 pb-1 text-2xs tracking-widest", style: { color: "var(--dim)" }, children: "MY DATA" }),
            [...new Set((o?.datasets || []).map((k) => k.folder || ""))].sort().map((k) => /* @__PURE__ */ e.jsxs("div", { children: [
              k && /* @__PURE__ */ e.jsx(
                "div",
                {
                  className: "px-3 pt-1 pb-0.5 text-[9px] tracking-widest",
                  style: { color: "var(--dim)", opacity: 0.7 },
                  children: k.toUpperCase()
                }
              ),
              (o?.datasets || []).filter((v) => (v.folder || "") === k).map((v) => /* @__PURE__ */ e.jsxs(
                "button",
                {
                  onClick: () => {
                    m(v.symbol), u(($) => $ + 1);
                  },
                  className: "w-full text-left px-3 py-1 text-xs flex items-center gap-2",
                  style: C === v.symbol ? { color: "var(--text)", borderLeft: "2px solid var(--text)" } : { color: "var(--dim)", borderLeft: "2px solid transparent" },
                  children: [
                    /* @__PURE__ */ e.jsx(Li, { kind: v.kind }),
                    /* @__PURE__ */ e.jsx("span", { className: "truncate", children: v.name }),
                    /* @__PURE__ */ e.jsx("span", { style: { opacity: 0.6, marginLeft: "auto", fontVariantNumeric: "tabular-nums" }, children: v.rows.toLocaleString() })
                  ]
                },
                v.symbol
              ))
            ] }, k || "(root)")),
            /* @__PURE__ */ e.jsxs(
              "button",
              {
                onClick: () => {
                  window.openLsbModal?.();
                  const v = window.setInterval(() => {
                    const $ = document.getElementById("lsb-modal");
                    (!$ || $.classList.contains("hidden")) && (window.clearInterval(v), N());
                  }, 1500);
                },
                className: "w-full text-left px-3 py-1 text-xs flex items-center gap-2",
                style: { color: "var(--dim)", borderLeft: "2px solid transparent" },
                children: [
                  /* @__PURE__ */ e.jsx("span", { style: { width: 14, textAlign: "center" }, children: "+" }),
                  "Import via LSE Data"
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "flex-1 min-w-0 overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "sticky top-0 z-10", style: { background: "var(--bg)" }, children: [
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            className: "flex items-baseline gap-4 px-4 py-2 border-b",
            style: { borderColor: "var(--edge)" },
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "text-sm font-medium whitespace-nowrap", children: n.label }),
              /* @__PURE__ */ e.jsx("code", { className: "text-xs font-mono truncate", style: { color: "var(--dim)" }, children: n.formula })
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(
          zi,
          {
            modelId: n.id,
            info: o,
            onFit: P,
            onClear: f,
            busy: c,
            fitted: b,
            mode: x,
            setMode: p,
            prefer: C,
            refreshInfo: N
          },
          n.id + ":" + (C || "") + ":" + j
        ),
        b && !b.ok && /* @__PURE__ */ e.jsx(
          "div",
          {
            className: "px-4 py-2 text-xs",
            style: { color: "var(--err, #f0426c)", borderBottom: "1px solid var(--edge)", background: "var(--bg)" },
            children: b.error
          }
        )
      ] }),
      x === "fitted" && b?.ok && (b.model || n.fittedComponent) ? /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col", children: [
        n.fittedComponent ? /* @__PURE__ */ e.jsx("div", { className: "p-3", children: /* @__PURE__ */ e.jsx(aa, { resetKey: n.id + "-fit", children: n.fittedComponent(b.params) }) }) : /* @__PURE__ */ e.jsx("div", { style: { height: "calc(100vh - 230px)", minHeight: 360 }, children: /* @__PURE__ */ e.jsx(Ka, { data: b.model }) }),
        /* @__PURE__ */ e.jsx("div", { className: "px-4 py-2 border-t", style: { borderColor: "var(--edge)" }, children: (b.provenance || []).map((k, v) => /* @__PURE__ */ e.jsxs("div", { style: {
          fontSize: 10.5,
          color: "var(--dim)",
          fontFamily: "var(--mono)"
        }, children: [
          "· ",
          k
        ] }, v)) })
      ] }, n.id + "-fit") : /* @__PURE__ */ e.jsx("div", { className: "p-3", children: /* @__PURE__ */ e.jsx(aa, { resetKey: n.id, children: n.component() }) }, n.id)
    ] })
  ] });
}
export {
  Gi as default
};
