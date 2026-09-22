import { r as s, j as a } from "./react-vendor-C0yw3i6b.js";
function ce({
  symbol: $,
  provider: x = "binance",
  colormap: p,
  intensity: v,
  opacity: w,
  gamma: j,
  noiseFloor: M,
  lowPeak: k
}) {
  const I = s.useRef(null), C = s.useRef(null), [b, F] = s.useState(p || "ember"), [N, D] = s.useState(v ?? 1), [y, P] = s.useState(w ?? 0.85), [U, T] = s.useState(j ?? 1.3), [z, B] = s.useState(M ?? 4e-3), [R, L] = s.useState(/* @__PURE__ */ new Set([25, 50, 75, 100])), [g, _] = s.useState([]), E = s.useRef({ w: 0, h: 0, dpr: 1 });
  s.useEffect(() => {
    p && F(p);
  }, [p]), s.useEffect(() => {
    v !== void 0 && D(v);
  }, [v]), s.useEffect(() => {
    w !== void 0 && P(w);
  }, [w]), s.useEffect(() => {
    j !== void 0 && T(j);
  }, [j]), s.useEffect(() => {
    M !== void 0 && B(M);
  }, [M]), s.useEffect(() => {
    let n = !0;
    const f = async () => {
      try {
        const r = await fetch(`/api/orderflow/liquidations?symbol=${encodeURIComponent($)}&provider=${encodeURIComponent(x)}`);
        if (r.ok) {
          const o = await r.json();
          if (n) {
            _(o.liquidations || o.bars || []);
            return;
          }
        }
      } catch {
      }
      if (n) {
        const r = 5e4 + Math.random() * 1e3, o = Array.from({ length: 100 }, () => ({ price: r + (Math.random() - 0.5) * r * 0.02, notional_usd: Math.random() * 1e5, size: Math.random() * 2, ts: Date.now() - Math.random() * 6e5, leverage: [25, 50, 75, 100][Math.floor(Math.random() * 4)] }));
        _(o);
      }
    };
    f();
    const d = setInterval(f, 2e3);
    return () => {
      n = !1, clearInterval(d);
    };
  }, [$, x]);
  const S = s.useCallback(() => {
    const n = I.current, f = C.current;
    if (!n || !f) return;
    const d = f.getBoundingClientRect();
    let r = d.width, o = d.height;
    if (r < 10 || o < 10) return;
    const h = window.devicePixelRatio || 1;
    (E.current.w !== r || E.current.h !== o || E.current.dpr !== h) && (E.current = { w: r, h: o, dpr: h }, n.width = Math.round(r * h), n.height = Math.round(o * h), n.style.width = `${r}px`, n.style.height = `${o}px`);
    const u = n.getContext("2d");
    if (!u) return;
    u.setTransform(h, 0, 0, h, 0, 0), u.clearRect(0, 0, r, o), u.fillStyle = "#121212", u.fillRect(0, 0, r, o);
    const O = b === "ember" ? (i) => {
      const t = [{ t: 0, r: 0, g: 0, b: 0 }, { t: 0.24, r: 27, g: 13, b: 59 }, { t: 0.46, r: 68, g: 22, b: 103 }, { t: 0.67, r: 126, g: 36, b: 106 }, { t: 0.84, r: 196, g: 62, b: 70 }, { t: 0.975, r: 252, g: 158, b: 28 }, { t: 1, r: 252, g: 235, b: 140 }];
      for (let e = 1; e < t.length; e++) if (i <= t[e].t) {
        const c = (i - t[e - 1].t) / (t[e].t - t[e - 1].t);
        return [t[e - 1].r + c * (t[e].r - t[e - 1].r), t[e - 1].g + c * (t[e].g - t[e - 1].g), t[e - 1].b + c * (t[e].b - t[e - 1].b)];
      }
      return [252, 235, 140];
    } : b === "viridis" ? (i) => {
      const t = [{ t: 0, r: 68, g: 1, b: 84 }, { t: 0.4, r: 42, g: 120, b: 142 }, { t: 1, r: 253, g: 231, b: 37 }];
      for (let e = 1; e < t.length; e++) if (i <= t[e].t) {
        const c = (i - t[e - 1].t) / (t[e].t - t[e - 1].t);
        return [t[e - 1].r + c * (t[e].r - t[e - 1].r), t[e - 1].g + c * (t[e].g - t[e - 1].g), t[e - 1].b + c * (t[e].b - t[e - 1].b)];
      }
      return [253, 231, 37];
    } : b === "inferno" ? (i) => {
      const t = [{ t: 0, r: 0, g: 0, b: 4 }, { t: 0.4, r: 136, g: 22, b: 72 }, { t: 1, r: 252, g: 255, b: 164 }];
      for (let e = 1; e < t.length; e++) if (i <= t[e].t) {
        const c = (i - t[e - 1].t) / (t[e].t - t[e - 1].t);
        return [t[e - 1].r + c * (t[e].r - t[e - 1].r), t[e - 1].g + c * (t[e].g - t[e - 1].g), t[e - 1].b + c * (t[e].b - t[e - 1].b)];
      }
      return [252, 255, 164];
    } : (i) => {
      const t = [{ t: 0, r: 0, g: 0, b: 4 }, { t: 0.6, r: 209, g: 65, b: 68 }, { t: 1, r: 252, g: 254, b: 179 }];
      for (let e = 1; e < t.length; e++) if (i <= t[e].t) {
        const c = (i - t[e - 1].t) / (t[e].t - t[e - 1].t);
        return [t[e - 1].r + c * (t[e].r - t[e - 1].r), t[e - 1].g + c * (t[e].g - t[e - 1].g), t[e - 1].b + c * (t[e].b - t[e - 1].b)];
      }
      return [252, 254, 179];
    };
    if (g.length) {
      const i = g.map((l) => l.price || 0).filter((l) => l > 0), t = i.length ? Math.min(...i) : 0, c = (i.length ? Math.max(...i) : 1) - t || 1, Q = Math.max(...g.map((l) => l.notional_usd || l.size || 0), 1), q = k?.peak || Q, A = k?.low || 0;
      g.slice(-100).forEach((l, H) => {
        if (R.size && l.leverage && !R.has(l.leverage)) return;
        let m = ((l.notional_usd || l.size || 0) - A) / (q - A || 1);
        if (m = Math.max(0, Math.min(1, m)) * N, m < z || m < 0.07) return;
        const [J, K, V] = O(Math.pow(m, U)), W = Math.pow(m, 1.15) * 0.55 * y;
        u.fillStyle = `rgba(${Math.round(J)},${Math.round(K)},${Math.round(V)},${Math.min(1, W)})`;
        const X = (1 - ((l.price || t) - t) / c) * o, Y = H / 100 * r;
        u.fillRect(Y, X, Math.max(2, r / 100), 6);
      });
    }
  }, [g, b, N, y, U, z, R, k]);
  return s.useEffect(() => {
    S();
  }, [S]), s.useEffect(() => {
    const n = C.current;
    if (!n) return;
    const f = new ResizeObserver((d) => {
      for (const r of d) {
        if (r.contentRect.width < 10) return;
        S();
      }
    });
    return f.observe(n), () => f.disconnect();
  }, [S]), /* @__PURE__ */ a.jsxs("div", { className: "h-full flex flex-col bg-[#1c1c1c] text-[#e8e8e8]", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0", children: [
      /* @__PURE__ */ a.jsx("span", { className: "text-[11px] font-semibold tracking-wider", children: "LIQUIDATIONS" }),
      /* @__PURE__ */ a.jsx("span", { className: "font-mono text-[13px] font-medium", children: $ }),
      /* @__PURE__ */ a.jsxs("span", { className: "px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9]", children: [
        x.toUpperCase(),
        " ",
        x === "hyperliquid" ? "⚡" : ""
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "ml-auto flex items-center gap-1", children: [
        /* @__PURE__ */ a.jsx("div", { className: "flex gap-1 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]", children: ["ember", "inferno", "magma", "viridis"].map((n) => /* @__PURE__ */ a.jsx("button", { onClick: () => F(n), className: `px-2.5 py-1 rounded-md text-[11px] font-medium capitalize ${b === n ? "bg-[#e8e8e8] text-[#1c1c1c]" : "text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`, children: n }, n)) }),
        /* @__PURE__ */ a.jsx("div", { className: "flex gap-0.5 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a] ml-1", children: [25, 50, 75, 100].map((n) => /* @__PURE__ */ a.jsxs("button", { onClick: () => L((f) => {
          const d = new Set(f);
          return d.has(n) ? d.delete(n) : d.add(n), d;
        }), className: `px-2 py-1 rounded-md text-[10px] ${R.has(n) ? "bg-[#21b3a4] text-black" : "text-[#b9b9b9] hover:bg-[#343434]"}`, children: [
          n,
          "x"
        ] }, n)) })
      ] })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "flex items-center gap-3 px-3 py-2 bg-[#1c1c1c] border-b border-[#2a2a2a]/50 text-[10px] shrink-0", children: [
      /* @__PURE__ */ a.jsxs("label", { className: "flex items-center gap-2 text-[#b9b9b9]", children: [
        "Intensity ",
        N.toFixed(2),
        /* @__PURE__ */ a.jsx("input", { type: "range", min: 0.1, max: 3, step: 0.1, value: N, onChange: (n) => D(parseFloat(n.target.value)), className: "w-20 accent-[#e8e8e8]" })
      ] }),
      /* @__PURE__ */ a.jsxs("label", { className: "flex items-center gap-2 text-[#b9b9b9]", children: [
        "Opacity ",
        Math.round(y * 100),
        "%",
        /* @__PURE__ */ a.jsx("input", { type: "range", min: 0.1, max: 1, step: 0.05, value: y, onChange: (n) => P(parseFloat(n.target.value)), className: "w-20 accent-[#e8e8e8]" })
      ] }),
      /* @__PURE__ */ a.jsxs("span", { className: "ml-auto text-[#6a6a6a]", children: [
        g.length,
        " events • ",
        b,
        " • discard 0.07/",
        z.toFixed(3)
      ] })
    ] }),
    /* @__PURE__ */ a.jsx("div", { ref: C, className: "flex-1 relative bg-[#121212]", children: /* @__PURE__ */ a.jsx("canvas", { ref: I, className: "absolute inset-0 w-full h-full" }) })
  ] });
}
export {
  ce as EdgeDepthLiquidationPanel,
  ce as default
};
