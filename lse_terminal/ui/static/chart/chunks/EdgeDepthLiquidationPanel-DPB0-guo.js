import { r as o, j as i } from "./react-vendor-C0yw3i6b.js";
function we({
  symbol: y,
  provider: b = "binance",
  colormap: N,
  intensity: R,
  opacity: S,
  gamma: $,
  noiseFloor: k,
  lowPeak: P
}) {
  const J = o.useRef(null), Q = o.useRef(null), U = o.useRef(null), [j, V] = o.useState(N || "ember"), [T, X] = o.useState(R ?? 1), [C, Y] = o.useState(S ?? 0.85), [E, K] = o.useState($ ?? 1.3), [_, ne] = o.useState(k ?? 4e-3), [F, se] = o.useState(/* @__PURE__ */ new Set([25, 50, 75, 100])), [f, L] = o.useState([]), D = o.useRef({ w: 0, h: 0, dpr: 1 }), q = o.useRef(0), [h, W] = o.useState(null);
  o.useEffect(() => {
    N && V(N);
  }, [N]), o.useEffect(() => {
    R !== void 0 && X(R);
  }, [R]), o.useEffect(() => {
    S !== void 0 && Y(S);
  }, [S]), o.useEffect(() => {
    $ !== void 0 && K($);
  }, [$]), o.useEffect(() => {
    k !== void 0 && ne(k);
  }, [k]);
  const z = o.useMemo(() => b === "hyperliquid" ? 15 : b === "binance" ? 20 : 50, [b]);
  o.useEffect(() => {
    let n = !0;
    const r = async () => {
      try {
        const g = await fetch(`/api/orderflow/liquidations?symbol=${encodeURIComponent(y)}&provider=${encodeURIComponent(b)}`);
        if (g.ok) {
          const a = await g.json();
          if (n) {
            L(a.liquidations || a.bars || a.events || []);
            return;
          }
        }
      } catch {
      }
      if (n) {
        const g = 5e4 + Math.random() * 1e3, a = Array.from({ length: 150 }, () => ({
          price: g + (Math.random() - 0.5) * g * 0.03,
          notional_usd: Math.random() * 15e4 + 5e3,
          size: Math.random() * 3 + 0.1,
          ts: Date.now() - Math.random() * 6e5,
          leverage: [10, 25, 50, 75, 100][Math.floor(Math.random() * 5)],
          side: Math.random() > 0.5 ? "long" : "short"
        }));
        L(a);
      }
    };
    r();
    const u = setInterval(r, z * 40);
    return () => {
      n = !1, clearInterval(u);
    };
  }, [y, b, z]), o.useEffect(() => {
    let n = null;
    try {
      const r = location.protocol === "https:" ? "wss" : "ws";
      n = new WebSocket(`${r}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(y)}&provider=${encodeURIComponent(b)}`), n.onmessage = (u) => {
        try {
          const g = JSON.parse(u.data);
          if (g.type === "liquidation") {
            const a = g.event;
            L((l) => [...l.slice(-149), { price: a.price, notional_usd: a.notional_usd || a.size * a.price, size: a.size, ts: a.ts || Date.now(), leverage: a.leverage || 50, side: a.side }]);
          }
        } catch {
        }
      };
    } catch {
    }
    return () => {
      try {
        n?.close();
      } catch {
      }
    };
  }, [y, b]);
  const I = o.useCallback(() => {
    const n = J.current, r = Q.current, u = U.current;
    if (!n || !u) return;
    const g = u.getBoundingClientRect();
    let a = g.width, l = g.height;
    if (a < 10 || l < 10) return;
    const m = window.devicePixelRatio || 1;
    (D.current.w !== a || D.current.h !== l || D.current.dpr !== m) && (D.current = { w: a, h: l, dpr: m }, n.width = Math.round(a * m), n.height = Math.round(l * m), n.style.width = `${a}px`, n.style.height = `${l}px`, r && (r.width = Math.round(a * m), r.height = Math.round(l * m), r.style.width = `${a}px`, r.style.height = `${l}px`));
    const p = n.getContext("2d");
    if (!p) return;
    p.setTransform(m, 0, 0, m, 0, 0), p.clearRect(0, 0, a, l), p.fillStyle = "#121212", p.fillRect(0, 0, a, l);
    const O = j === "ember" ? (c) => {
      const t = [
        { t: 0, r: 0, g: 0, b: 0 },
        { t: 0.12, r: 15, g: 5, b: 30 },
        { t: 0.24, r: 27, g: 13, b: 59 },
        { t: 0.35, r: 48, g: 18, b: 85 },
        { t: 0.46, r: 68, g: 22, b: 103 },
        { t: 0.56, r: 95, g: 28, b: 108 },
        { t: 0.67, r: 126, g: 36, b: 106 },
        { t: 0.76, r: 162, g: 48, b: 92 },
        { t: 0.84, r: 196, g: 62, b: 70 },
        { t: 0.9, r: 224, g: 95, b: 50 },
        { t: 0.95, r: 242, g: 132, b: 34 },
        { t: 0.975, r: 252, g: 158, b: 28 },
        { t: 0.99, r: 252, g: 200, b: 80 },
        { t: 1, r: 252, g: 235, b: 140 }
      ];
      for (let e = 1; e < t.length; e++)
        if (c <= t[e].t) {
          const d = (c - t[e - 1].t) / (t[e].t - t[e - 1].t);
          return [t[e - 1].r + d * (t[e].r - t[e - 1].r), t[e - 1].g + d * (t[e].g - t[e - 1].g), t[e - 1].b + d * (t[e].b - t[e - 1].b)];
        }
      return [252, 235, 140];
    } : j === "viridis" ? (c) => {
      const t = [
        { t: 0, r: 68, g: 1, b: 84 },
        { t: 0.2, r: 59, g: 82, b: 139 },
        { t: 0.4, r: 42, g: 120, b: 142 },
        { t: 0.6, r: 33, g: 165, b: 133 },
        { t: 0.8, r: 122, g: 209, b: 81 },
        { t: 1, r: 253, g: 231, b: 37 }
      ];
      for (let e = 1; e < t.length; e++)
        if (c <= t[e].t) {
          const d = (c - t[e - 1].t) / (t[e].t - t[e - 1].t);
          return [t[e - 1].r + d * (t[e].r - t[e - 1].r), t[e - 1].g + d * (t[e].g - t[e - 1].g), t[e - 1].b + d * (t[e].b - t[e - 1].b)];
        }
      return [253, 231, 37];
    } : j === "inferno" ? (c) => {
      const t = [
        { t: 0, r: 0, g: 0, b: 4 },
        { t: 0.2, r: 62, g: 12, b: 76 },
        { t: 0.4, r: 136, g: 22, b: 72 },
        { t: 0.6, r: 195, g: 58, b: 46 },
        { t: 0.8, r: 239, g: 126, b: 23 },
        { t: 1, r: 252, g: 255, b: 164 }
      ];
      for (let e = 1; e < t.length; e++)
        if (c <= t[e].t) {
          const d = (c - t[e - 1].t) / (t[e].t - t[e - 1].t);
          return [t[e - 1].r + d * (t[e].r - t[e - 1].r), t[e - 1].g + d * (t[e].g - t[e - 1].g), t[e - 1].b + d * (t[e].b - t[e - 1].b)];
        }
      return [252, 255, 164];
    } : (c) => {
      const t = [
        { t: 0, r: 0, g: 0, b: 4 },
        { t: 0.3, r: 101, g: 21, b: 110 },
        { t: 0.6, r: 209, g: 65, b: 68 },
        { t: 0.8, r: 252, g: 135, b: 97 },
        { t: 1, r: 252, g: 254, b: 179 }
      ];
      for (let e = 1; e < t.length; e++)
        if (c <= t[e].t) {
          const d = (c - t[e - 1].t) / (t[e].t - t[e - 1].t);
          return [t[e - 1].r + d * (t[e].r - t[e - 1].r), t[e - 1].g + d * (t[e].g - t[e - 1].g), t[e - 1].b + d * (t[e].b - t[e - 1].b)];
        }
      return [252, 254, 179];
    };
    if (f.length) {
      const c = f.map((s) => s.price || 0).filter((s) => s > 0), t = c.length ? Math.min(...c) : 0, e = c.length ? Math.max(...c) : 1, d = e - t || 1, ie = Math.max(...f.map((s) => s.notional_usd || s.size || 0), 1), ce = P?.peak || ie, G = P?.low || 0, A = [...f].sort((s, w) => s.ts - w.ts).slice(-150), ee = A[0]?.ts || Date.now() - 6e5, le = (A[A.length - 1]?.ts || Date.now()) - ee || 6e5;
      if (A.forEach((s) => {
        if (F.size && s.leverage && !F.has(s.leverage)) return;
        let x = ((s.notional_usd || s.size || 0) - G) / (ce - G || 1);
        if (x = Math.max(0, Math.min(1, x)) * T, x < _ || x < 0.07) return;
        const [H, de, ge] = O(Math.pow(x, E)), fe = Math.pow(x, 1.15) * 0.55 * C;
        p.fillStyle = `rgba(${Math.round(H)},${Math.round(de)},${Math.round(ge)},${Math.min(1, fe)})`;
        const ue = (1 - (s.price - t) / d) * l, he = (s.ts - ee) / le * a, me = Math.max(2, a / 150), te = Math.max(3, 6 * Math.pow(x, 0.5));
        p.fillRect(he, ue - te / 2, me, te);
      }), r) {
        const s = r.getContext("2d");
        if (s) {
          s.setTransform(m, 0, 0, m, 0, 0), s.clearRect(0, 0, a, l), s.fillStyle = "#e8e8e8", s.font = "10px monospace", s.textAlign = "right";
          for (let w = 0; w <= 4; w++) {
            const x = w / 4 * l, H = e - w / 4 * d;
            s.fillText(H.toFixed(1), a - 4, x + 10), s.strokeStyle = "#3a3a3a", s.beginPath(), s.moveTo(0, x), s.lineTo(a, x), s.stroke();
          }
          h && (s.strokeStyle = "#e8e8e8", s.setLineDash([2, 2]), s.beginPath(), s.moveTo(h.x, 0), s.lineTo(h.x, l), s.stroke(), s.beginPath(), s.moveTo(0, h.y), s.lineTo(a, h.y), s.stroke(), s.setLineDash([]), s.fillStyle = "#e8e8e8", s.fillRect(h.x + 4, h.y - 24, 160, 20), s.fillStyle = "#1c1c1c", s.font = "10px monospace", s.textAlign = "left", s.fillText(`${h.price.toFixed(1)} $${h.notional.toFixed(0)} ${h.leverage}x`, h.x + 8, h.y - 10));
        }
      }
    }
  }, [f, j, T, C, E, _, F, P, h]);
  o.useEffect(() => {
    const n = () => {
      I(), q.current = requestAnimationFrame(n);
    };
    return q.current = requestAnimationFrame(n), () => cancelAnimationFrame(q.current);
  }, [I]), o.useEffect(() => {
    const n = U.current;
    if (!n) return;
    const r = new ResizeObserver(() => I());
    return r.observe(n), () => r.disconnect();
  }, [I]);
  const ae = o.useCallback(
    (n) => {
      const r = n.currentTarget.getBoundingClientRect(), u = n.clientX - r.left, g = n.clientY - r.top;
      if (f.length) {
        const a = f.map((v) => v.price).filter((v) => v > 0), l = Math.min(...a, 0), m = Math.max(...a, 1), p = m - l || 1, Z = m - g / r.height * p;
        let M = null, B = 1 / 0;
        f.forEach((v) => {
          const O = (1 - (v.price - l) / p) * r.height, c = Math.abs(O - g);
          c < B && (B = c, M = v);
        }), W(M ? { x: u, y: g, price: M.price, notional: M.notional_usd, leverage: M.leverage } : { x: u, y: g, price: Z, notional: 0, leverage: 0 });
      }
    },
    [f]
  ), re = f.reduce((n, r) => n + (r.notional_usd || 0), 0), oe = f.length ? f.reduce((n, r) => n + r.leverage, 0) / f.length : 0;
  return /* @__PURE__ */ i.jsxs("div", { className: "h-full flex flex-col bg-[#1c1c1c] text-[#e8e8e8]", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0", children: [
      /* @__PURE__ */ i.jsx("span", { className: "text-[11px] font-semibold tracking-wider font-sans", children: "LIQUIDATIONS" }),
      /* @__PURE__ */ i.jsx("span", { className: "font-mono text-[13px] font-medium", children: y }),
      /* @__PURE__ */ i.jsxs("span", { className: "px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9] font-sans", children: [
        b.toUpperCase(),
        " ",
        z,
        "ms ",
        b === "hyperliquid" ? "⚡" : "",
        " • ",
        f.length,
        " events"
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "ml-auto flex items-center gap-1", children: [
        /* @__PURE__ */ i.jsx("div", { className: "flex gap-1 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]", children: ["ember", "inferno", "magma", "viridis"].map((n) => /* @__PURE__ */ i.jsx(
          "button",
          {
            onClick: () => V(n),
            className: `px-2.5 py-1 rounded-md text-[11px] font-medium capitalize font-sans transition-colors ${j === n ? "bg-[#e8e8e8] text-[#1c1c1c] shadow-sm" : "text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
            children: n
          },
          n
        )) }),
        /* @__PURE__ */ i.jsx("div", { className: "flex gap-0.5 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a] ml-1", children: [10, 25, 50, 75, 100].map((n) => /* @__PURE__ */ i.jsxs(
          "button",
          {
            onClick: () => se((r) => {
              const u = new Set(r);
              return u.has(n) ? u.delete(n) : u.add(n), u;
            }),
            className: `px-2 py-1 rounded-md text-[10px] font-sans transition-colors ${F.has(n) ? "bg-[#21b3a4] text-black font-medium" : "text-[#b9b9b9] hover:bg-[#343434]"}`,
            children: [
              n,
              "x"
            ]
          },
          n
        )) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3 px-3 py-2 bg-[#1c1c1c] border-b border-[#2a2a2a]/50 text-[10px] shrink-0 font-sans", children: [
      /* @__PURE__ */ i.jsxs("label", { className: "flex items-center gap-2 text-[#b9b9b9]", children: [
        "Intensity ",
        T.toFixed(2),
        /* @__PURE__ */ i.jsx("input", { type: "range", min: 0.1, max: 3, step: 0.1, value: T, onChange: (n) => X(parseFloat(n.target.value)), className: "w-20 accent-[#e8e8e8]" })
      ] }),
      /* @__PURE__ */ i.jsxs("label", { className: "flex items-center gap-2 text-[#b9b9b9]", children: [
        "Opacity ",
        Math.round(C * 100),
        "%",
        /* @__PURE__ */ i.jsx("input", { type: "range", min: 0.1, max: 1, step: 0.05, value: C, onChange: (n) => Y(parseFloat(n.target.value)), className: "w-20 accent-[#e8e8e8]" })
      ] }),
      /* @__PURE__ */ i.jsxs("label", { className: "flex items-center gap-2 text-[#b9b9b9]", children: [
        "Gamma ",
        E.toFixed(2),
        /* @__PURE__ */ i.jsx("input", { type: "range", min: 0.5, max: 2.5, step: 0.1, value: E, onChange: (n) => K(parseFloat(n.target.value)), className: "w-20 accent-[#e8e8e8]" })
      ] }),
      /* @__PURE__ */ i.jsx("span", { className: "ml-auto text-[#6a6a6a] hidden lg:flex items-center gap-2", children: /* @__PURE__ */ i.jsxs("span", { children: [
        "Total $",
        re.toFixed(0),
        " • Avg ",
        oe.toFixed(0),
        "x • Discard 0.07/",
        _.toFixed(3),
        " • 800 bands 0.05%"
      ] }) })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { ref: U, className: "flex-1 relative bg-[#121212] overflow-hidden", onMouseMove: ae, onMouseLeave: () => W(null), children: [
      /* @__PURE__ */ i.jsx("canvas", { ref: J, className: "absolute inset-0 w-full h-full block" }),
      /* @__PURE__ */ i.jsx("canvas", { ref: Q, className: "absolute inset-0 w-full h-full block pointer-events-none" }),
      f.length === 0 && /* @__PURE__ */ i.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "text-[12px] font-mono text-[#e8e8e8] opacity-70", children: [
          "Waiting for ",
          y,
          " liquidations — ",
          b.toUpperCase(),
          " ",
          z,
          "ms"
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "text-[10px] text-[#6a6a6a] mt-1", children: "WS live + heatmap • Ember/Viridis/Magma/Inferno • 800 bands" })
      ] })
    ] })
  ] });
}
export {
  we as EdgeDepthLiquidationPanel,
  we as default
};
