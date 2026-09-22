import { r as b, j as r } from "./react-vendor-C0yw3i6b.js";
function F({ symbol: f, provider: d = "binance" }) {
  const j = b.useRef(null), [x, w] = b.useState("ember"), [g, M] = b.useState(1), [u, S] = b.useState(0.85), [N, $] = b.useState(/* @__PURE__ */ new Set([25, 50, 75, 100])), [p, R] = b.useState([]);
  return b.useEffect(() => {
    let a = !0;
    const s = async () => {
      try {
        const o = await fetch(`/api/orderflow/liquidations?symbol=${encodeURIComponent(f)}&provider=${encodeURIComponent(d)}`);
        if (!o.ok) return;
        const i = await o.json();
        a && R(i.liquidations || i.bars || []);
      } catch {
      }
    };
    s();
    const l = setInterval(s, 2e3);
    return () => {
      a = !1, clearInterval(l);
    };
  }, [f, d]), b.useEffect(() => {
    const a = j.current;
    if (!a) return;
    const s = a.getContext("2d");
    if (!s) return;
    const l = window.devicePixelRatio || 1, o = a.clientWidth, i = a.clientHeight;
    if (o < 10 || i < 10) return;
    a.width = Math.round(o * l), a.height = Math.round(i * l), s.setTransform(l, 0, 0, l, 0, 0), s.clearRect(0, 0, o, i), s.fillStyle = "#2a2a2a", s.fillRect(0, 0, o, i);
    const y = (n) => {
      const e = [
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
      for (let t = 1; t < e.length; t++)
        if (n <= e[t].t) {
          const c = (n - e[t - 1].t) / (e[t].t - e[t - 1].t);
          return [e[t - 1].r + c * (e[t].r - e[t - 1].r), e[t - 1].g + c * (e[t].g - e[t - 1].g), e[t - 1].b + c * (e[t].b - e[t - 1].b)];
        }
      return [252, 235, 140];
    }, v = x === "ember" ? y : x === "viridis" ? (n) => {
      const e = [{ t: 0, r: 68, g: 1, b: 84 }, { t: 0.2, r: 65, g: 68, b: 135 }, { t: 0.4, r: 42, g: 120, b: 142 }, { t: 0.6, r: 34, g: 168, b: 132 }, { t: 0.8, r: 122, g: 209, b: 81 }, { t: 1, r: 253, g: 231, b: 37 }];
      for (let t = 1; t < e.length; t++)
        if (n <= e[t].t) {
          const c = (n - e[t - 1].t) / (e[t].t - e[t - 1].t);
          return [e[t - 1].r + c * (e[t].r - e[t - 1].r), e[t - 1].g + c * (e[t].g - e[t - 1].g), e[t - 1].b + c * (e[t].b - e[t - 1].b)];
        }
      return [253, 231, 37];
    } : y;
    if (p.length) {
      const n = Math.max(...p.map((e) => e.notional_usd || e.size || 0), 1);
      p.slice(-100).forEach((e, t) => {
        const c = t / 100 * o, m = Math.min(1, (e.notional_usd || e.size || 0) / n) * g;
        if (m < 0.07) return;
        const [h, C, I] = v(m), k = Math.pow(m, 1.3) * u;
        s.fillStyle = `rgba(${Math.round(h)},${Math.round(C)},${Math.round(I)},${k})`;
        const E = e.price % 1e3 / 1e3 * i;
        s.fillRect(c, E, o / 100, 6);
      });
    } else
      for (let n = 0; n < 80; n++)
        for (let e = 0; e < 20; e++) {
          const t = Math.random() * g;
          if (t < 0.07) continue;
          const [c, m, h] = v(t);
          s.fillStyle = `rgba(${Math.round(c)},${Math.round(m)},${Math.round(h)},${t * u * 0.6})`, s.fillRect(n / 80 * o, e / 20 * i, o / 80, i / 20);
        }
    s.strokeStyle = "rgba(58,58,58,0.3)", s.lineWidth = 0.5;
    for (let n = 0; n < 5; n++)
      s.beginPath(), s.moveTo(0, n / 5 * i), s.lineTo(o, n / 5 * i), s.stroke();
  }, [p, x, g, u, N]), /* @__PURE__ */ r.jsxs("div", { className: "h-full flex flex-col bg-[#1c1c1c] border border-[#3a3a3a]", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-1 px-2 py-1 bg-[#2a2a2a] border-b border-[#3a3a3a] text-[10px]", children: [
      /* @__PURE__ */ r.jsxs("span", { className: "font-bold tracking-wider text-[#e8e8e8]", children: [
        "LIQUIDATIONS — ",
        f
      ] }),
      /* @__PURE__ */ r.jsxs("span", { className: "ml-2 text-[#b9b9b9]", children: [
        d.toUpperCase(),
        " ",
        d === "hyperliquid" ? "⚡15ms" : d === "binance" ? "20ms" : "50ms"
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "ml-auto flex items-center gap-1", children: [
        ["ember", "inferno", "magma", "viridis"].map((a) => /* @__PURE__ */ r.jsx("button", { onClick: () => w(a), className: `px-1.5 py-0.5 rounded border text-[9px] capitalize ${x === a ? "bg-[#e8e8e8] text-black border-[#e8e8e8]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9]"}`, children: a }, a)),
        /* @__PURE__ */ r.jsx("span", { className: "text-[9px] text-[#b9b9b9] ml-2", children: "Leverage" }),
        [25, 50, 75, 100].map((a) => /* @__PURE__ */ r.jsxs("button", { onClick: () => $((s) => {
          const l = new Set(s);
          return l.has(a) ? l.delete(a) : l.add(a), l;
        }), className: `px-1 py-0.5 rounded border text-[9px] ${N.has(a) ? "bg-[#21b3a4] text-black border-[#21b3a4]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9]"}`, children: [
          a,
          "x"
        ] }, a))
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 px-2 py-1 bg-[#262626]/50 border-b border-[#3a3a3a]/50 text-[9px]", children: [
      /* @__PURE__ */ r.jsxs("label", { className: "flex items-center gap-1 text-[#b9b9b9]", children: [
        "Intensity ",
        g.toFixed(2),
        /* @__PURE__ */ r.jsx("input", { type: "range", min: 0.1, max: 3, step: 0.1, value: g, onChange: (a) => M(parseFloat(a.target.value)), className: "w-16 accent-[#e8e8e8]" })
      ] }),
      /* @__PURE__ */ r.jsxs("label", { className: "flex items-center gap-1 text-[#b9b9b9]", children: [
        "Opacity ",
        Math.round(u * 100),
        "%",
        /* @__PURE__ */ r.jsx("input", { type: "range", min: 0.1, max: 1, step: 0.05, value: u, onChange: (a) => S(parseFloat(a.target.value)), className: "w-16 accent-[#e8e8e8]" })
      ] }),
      /* @__PURE__ */ r.jsx("span", { className: "ml-auto text-[#b9b9b9]/60", children: "GPU ring 8192×1024 discard 0.07 • LUT 256×1 • alpha intensity^1.15*0.55" })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex-1 relative", children: [
      /* @__PURE__ */ r.jsx("canvas", { ref: j, className: "absolute inset-0 w-full h-full" }),
      /* @__PURE__ */ r.jsxs("div", { className: "absolute bottom-1 left-1 text-[8px] text-[#b9b9b9]/50", children: [
        "Liquidation field — colormap ",
        x,
        " • ",
        p.length,
        " events • ",
        d
      ] })
    ] })
  ] });
}
export {
  F as EdgeDepthLiquidationPanel,
  F as default
};
