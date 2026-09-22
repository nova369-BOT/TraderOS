import { r as c, j as o } from "./react-vendor-C0yw3i6b.js";
function oe({
  symbol: C,
  provider: m = "binance",
  colormap: M,
  intensity: j,
  opacity: N,
  gamma: y,
  noiseFloor: R,
  tickPerRow: Z,
  halfLife: ee,
  lowPeak: P
}) {
  const L = c.useRef(null), z = c.useRef(null), [u, T] = c.useState(M || "ember"), [p, U] = c.useState(j ?? 1), [w, D] = c.useState(N ?? 0.85), [v, _] = c.useState(y ?? 1.3), [S, O] = c.useState(R ?? 4e-3), [$, Q] = c.useState(/* @__PURE__ */ new Set([25, 50, 75, 100])), [h, q] = c.useState([]), E = c.useRef({ w: 0, h: 0, dpr: 1 });
  c.useEffect(() => {
    M && T(M);
  }, [M]), c.useEffect(() => {
    j !== void 0 && U(j);
  }, [j]), c.useEffect(() => {
    N !== void 0 && D(N);
  }, [N]), c.useEffect(() => {
    y !== void 0 && _(y);
  }, [y]), c.useEffect(() => {
    R !== void 0 && O(R);
  }, [R]), c.useEffect(() => {
    let a = !0;
    const d = async () => {
      try {
        const n = await fetch(`/api/orderflow/liquidations?symbol=${encodeURIComponent(C)}&provider=${encodeURIComponent(m)}`);
        if (!n.ok) throw new Error("no liq");
        const s = await n.json();
        a && q(s.liquidations || s.bars || []);
      } catch {
        if (a) {
          const n = 5e4 + Math.random() * 1e3, s = Array.from({ length: 100 }, (f, l) => ({
            price: n + (Math.random() - 0.5) * n * 0.02,
            notional_usd: Math.random() * 1e5,
            size: Math.random() * 2,
            ts: Date.now() - l * 6e4,
            leverage: [25, 50, 75, 100][Math.floor(Math.random() * 4)]
          }));
          q(s);
        }
      }
    };
    d();
    const g = setInterval(d, 2e3);
    return () => {
      a = !1, clearInterval(g);
    };
  }, [C, m]);
  const k = c.useCallback(() => {
    const a = L.current, d = z.current;
    if (!a || !d) return;
    const g = d.getBoundingClientRect();
    let n = g.width, s = g.height;
    if (n < 10 || s < 10) return;
    const f = window.devicePixelRatio || 1;
    E.current.w === n && E.current.h === s && E.current.dpr === f || (E.current = { w: n, h: s, dpr: f }, a.width = Math.round(n * f), a.height = Math.round(s * f), a.style.width = `${n}px`, a.style.height = `${s}px`);
    const l = a.getContext("2d");
    if (!l) return;
    l.setTransform(f, 0, 0, f, 0, 0), l.clearRect(0, 0, n, s), l.fillStyle = "#2a2a2a", l.fillRect(0, 0, n, s);
    const A = (r) => {
      const t = [
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
      ];
      for (let e = 1; e < t.length; e++)
        if (r <= t[e].t) {
          const i = (r - t[e - 1].t) / (t[e].t - t[e - 1].t);
          return [t[e - 1].r + i * (t[e].r - t[e - 1].r), t[e - 1].g + i * (t[e].g - t[e - 1].g), t[e - 1].b + i * (t[e].b - t[e - 1].b)];
        }
      return [252, 235, 140];
    }, B = u === "ember" ? A : u === "viridis" ? (r) => {
      const t = [{ t: 0, r: 68, g: 1, b: 84 }, { t: 0.2, r: 65, g: 68, b: 135 }, { t: 0.4, r: 42, g: 120, b: 142 }, { t: 0.6, r: 34, g: 168, b: 132 }, { t: 0.8, r: 122, g: 209, b: 81 }, { t: 1, r: 253, g: 231, b: 37 }];
      for (let e = 1; e < t.length; e++)
        if (r <= t[e].t) {
          const i = (r - t[e - 1].t) / (t[e].t - t[e - 1].t);
          return [t[e - 1].r + i * (t[e].r - t[e - 1].r), t[e - 1].g + i * (t[e].g - t[e - 1].g), t[e - 1].b + i * (t[e].b - t[e - 1].b)];
        }
      return [253, 231, 37];
    } : u === "inferno" ? (r) => {
      const t = [{ t: 0, r: 0, g: 0, b: 4 }, { t: 0.2, r: 58, g: 10, b: 86 }, { t: 0.4, r: 136, g: 22, b: 72 }, { t: 0.6, r: 210, g: 62, b: 44 }, { t: 0.8, r: 249, g: 133, b: 28 }, { t: 1, r: 252, g: 255, b: 164 }];
      for (let e = 1; e < t.length; e++)
        if (r <= t[e].t) {
          const i = (r - t[e - 1].t) / (t[e].t - t[e - 1].t);
          return [t[e - 1].r + i * (t[e].r - t[e - 1].r), t[e - 1].g + i * (t[e].g - t[e - 1].g), t[e - 1].b + i * (t[e].b - t[e - 1].b)];
        }
      return [252, 255, 164];
    } : u === "magma" ? (r) => {
      const t = [{ t: 0, r: 0, g: 0, b: 4 }, { t: 0.2, r: 56, g: 13, b: 88 }, { t: 0.4, r: 139, g: 26, b: 91 }, { t: 0.6, r: 209, g: 65, b: 68 }, { t: 0.8, r: 248, g: 134, b: 65 }, { t: 1, r: 252, g: 254, b: 179 }];
      for (let e = 1; e < t.length; e++)
        if (r <= t[e].t) {
          const i = (r - t[e - 1].t) / (t[e].t - t[e - 1].t);
          return [t[e - 1].r + i * (t[e].r - t[e - 1].r), t[e - 1].g + i * (t[e].g - t[e - 1].g), t[e - 1].b + i * (t[e].b - t[e - 1].b)];
        }
      return [252, 254, 179];
    } : A;
    if (h.length) {
      const r = h.map((b) => b.price || 0).filter((b) => b > 0), t = r.length ? Math.min(...r) : 0, i = (r.length ? Math.max(...r) : 1) - t || 1, F = Math.max(...h.map((b) => b.notional_usd || b.size || 0), 1), I = P?.peak || F, H = P?.low || 0;
      h.slice(-100).forEach((b, W) => {
        if ($.size && b.leverage && !$.has(b.leverage)) return;
        let x = ((b.notional_usd || b.size || 0) - H) / (I - H || 1);
        if (x = Math.max(0, Math.min(1, x)) * p, x < S || x < 0.07) return;
        const [G, J, K] = B(Math.pow(x, v)), V = Math.pow(x, 1.15) * 0.55 * w;
        l.fillStyle = `rgba(${Math.round(G)},${Math.round(J)},${Math.round(K)},${Math.min(1, V)})`;
        const X = (1 - ((b.price || t) - t) / i) * s, Y = W / 100 * n;
        l.fillRect(Y, X, Math.max(2, n / 100), 6);
      });
    } else
      for (let r = 0; r < 80; r++)
        for (let t = 0; t < 20; t++) {
          const e = Math.random() * p;
          if (e < S || e < 0.07) continue;
          const [i, F, I] = B(Math.pow(e, v));
          l.fillStyle = `rgba(${Math.round(i)},${Math.round(F)},${Math.round(I)},${e * w * 0.6})`, l.fillRect(r / 80 * n, t / 20 * s, n / 80, s / 20);
        }
    l.strokeStyle = "rgba(58,58,58,0.3)", l.lineWidth = 0.5;
    for (let r = 0; r < 5; r++)
      l.beginPath(), l.moveTo(0, r / 5 * s), l.lineTo(n, r / 5 * s), l.stroke();
  }, [h, u, p, w, v, S, $, P]);
  return c.useEffect(() => {
    k();
  }, [k]), c.useEffect(() => {
    const a = z.current;
    if (!a) return;
    const d = new ResizeObserver((g) => {
      for (const n of g) {
        const { width: s, height: f } = n.contentRect;
        if (s < 10 || f < 10) return;
        k();
      }
    });
    return d.observe(a), () => d.disconnect();
  }, [k]), /* @__PURE__ */ o.jsxs("div", { className: "h-full flex flex-col bg-[#1c1c1c] border border-[#3a3a3a]", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "flex items-center gap-1 px-2 py-1 bg-[#2a2a2a] border-b border-[#3a3a3a] text-[10px]", children: [
      /* @__PURE__ */ o.jsxs("span", { className: "font-bold tracking-wider text-[#e8e8e8]", children: [
        "LIQUIDATIONS — ",
        C
      ] }),
      /* @__PURE__ */ o.jsxs("span", { className: "ml-2 text-[#b9b9b9]", children: [
        m.toUpperCase(),
        " ",
        m === "hyperliquid" ? "⚡15ms" : m === "binance" ? "20ms" : "50ms"
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "ml-auto flex items-center gap-1", children: [
        ["ember", "inferno", "magma", "viridis"].map((a) => /* @__PURE__ */ o.jsx("button", { onClick: () => T(a), className: `px-1.5 py-0.5 rounded border text-[9px] capitalize ${u === a ? "bg-[#e8e8e8] text-black border-[#e8e8e8]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9]"}`, children: a }, a)),
        /* @__PURE__ */ o.jsx("span", { className: "text-[9px] text-[#b9b9b9] ml-2", children: "Leverage" }),
        [25, 50, 75, 100].map((a) => /* @__PURE__ */ o.jsxs("button", { onClick: () => Q((d) => {
          const g = new Set(d);
          return g.has(a) ? g.delete(a) : g.add(a), g;
        }), className: `px-1 py-0.5 rounded border text-[9px] ${$.has(a) ? "bg-[#21b3a4] text-black border-[#21b3a4]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9]"}`, children: [
          a,
          "x"
        ] }, a))
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "flex items-center gap-2 px-2 py-1 bg-[#262626]/50 border-b border-[#3a3a3a]/50 text-[9px]", children: [
      /* @__PURE__ */ o.jsxs("label", { className: "flex items-center gap-1 text-[#b9b9b9]", children: [
        "Intensity ",
        p.toFixed(2),
        /* @__PURE__ */ o.jsx("input", { type: "range", min: 0.1, max: 3, step: 0.1, value: p, onChange: (a) => U(parseFloat(a.target.value)), className: "w-16 accent-[#e8e8e8]" })
      ] }),
      /* @__PURE__ */ o.jsxs("label", { className: "flex items-center gap-1 text-[#b9b9b9]", children: [
        "Opacity ",
        Math.round(w * 100),
        "%",
        /* @__PURE__ */ o.jsx("input", { type: "range", min: 0.1, max: 1, step: 0.05, value: w, onChange: (a) => D(parseFloat(a.target.value)), className: "w-16 accent-[#e8e8e8]" })
      ] }),
      /* @__PURE__ */ o.jsxs("label", { className: "flex items-center gap-1 text-[#b9b9b9]", children: [
        "Gamma ",
        v.toFixed(2),
        /* @__PURE__ */ o.jsx("input", { type: "range", min: 0.5, max: 2.5, step: 0.1, value: v, onChange: (a) => _(parseFloat(a.target.value)), className: "w-12 accent-[#e8e8e8]" })
      ] }),
      /* @__PURE__ */ o.jsxs("span", { className: "ml-auto text-[#b9b9b9]/60", children: [
        "GPU ring 8192×1024 discard 0.07/",
        S.toFixed(3),
        " • LUT 256×1 • alpha intensity^1.15*0.55"
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { ref: z, className: "flex-1 relative", children: [
      /* @__PURE__ */ o.jsx("canvas", { ref: L, className: "absolute inset-0 w-full h-full" }),
      /* @__PURE__ */ o.jsxs("div", { className: "absolute bottom-1 left-1 text-[8px] text-[#b9b9b9]/50", children: [
        "Liquidation field — colormap ",
        u,
        " • ",
        h.length,
        " events • ",
        m,
        " • min/max priceNorm"
      ] })
    ] })
  ] });
}
export {
  oe as EdgeDepthLiquidationPanel,
  oe as default
};
