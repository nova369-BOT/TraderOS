import { r as d, j as e } from "./react-vendor-C0yw3i6b.js";
const y = [
  { id: "volume", label: "Volume", desc: "Trading volume bars", enabled: !0, height: 80 },
  { id: "cvd", label: "CVD", desc: "Cumulative Volume Delta", enabled: !0, height: 100 },
  { id: "rsi", label: "RSI", desc: "Relative Strength Index (14)", enabled: !1, height: 90 },
  { id: "macd", label: "MACD", desc: "Moving Average Convergence Divergence", enabled: !1, height: 100 },
  { id: "funding", label: "Funding Rate", desc: "Blue above 0 longs pay shorts, red below", enabled: !1, height: 80, pro: !1 },
  { id: "oi", label: "Open Interest", desc: "Green increased, red decreased OHLC", enabled: !1, height: 100, pro: !1 },
  { id: "vpin", label: "VPIN", desc: "Toxicity pane 0-1.0 fixed axis, step-hold line", enabled: !1, height: 110, pro: !0 },
  { id: "toxicity", label: "Toxicity", desc: "Regime washes + corner readout", enabled: !1, height: 110, pro: !0 }
];
function N({
  symbol: h,
  provider: x = "binance",
  onToggle: m,
  enabledIds: p
}) {
  const [b, f] = d.useState(y), [r, c] = d.useState({});
  d.useEffect(() => {
    f((s) => s.map((a) => ({ ...a, enabled: p ? p.has(a.id) : a.enabled })));
  }, [p]), d.useEffect(() => {
    let s = !0;
    const a = async () => {
      try {
        const l = await fetch(`/api/orderflow/cvd?symbol=${encodeURIComponent(h)}&provider=${encodeURIComponent(x)}&window=session`);
        if (l.ok && s) {
          const n = await l.json();
          c((i) => ({ ...i, cvd: n }));
        }
        try {
          const n = await fetch(`/api/orderflow/funding?symbol=${encodeURIComponent(h)}&provider=${encodeURIComponent(x)}`);
          if (n.ok && s) {
            const i = await n.json();
            c((o) => ({ ...o, funding: i }));
          } else {
            const i = Array.from({ length: 50 }, (o, j) => ({ time: Date.now() - (50 - j) * 8 * 36e5, rate: (Math.random() - 0.5) * 1e-3 }));
            s && c((o) => ({ ...o, funding: { bars: i } }));
          }
        } catch {
          const n = Array.from({ length: 50 }, (i, o) => ({ time: Date.now() - (50 - o) * 8 * 36e5, rate: (Math.random() - 0.5) * 1e-3 }));
          s && c((i) => ({ ...i, funding: { bars: n } }));
        }
        const u = Array.from({ length: 50 }, (n, i) => {
          const o = 1e6 + Math.random() * 5e5;
          return { time: Date.now() - (50 - i) * 36e5, open: o, high: o * 1.02, low: o * 0.98, close: o + (Math.random() - 0.5) * 1e5 };
        });
        s && c((n) => ({ ...n, oi: { bars: u } }));
        const v = Array.from({ length: 100 }, (n, i) => ({ ts_ms: Date.now() - (100 - i) * 6e4, vpin: Math.random(), conf: Math.random(), regime: ["NORMAL", "ELEVATED", "HIGH", "EXTREME"][Math.floor(Math.random() * 4)] }));
        s && c((n) => ({ ...n, vpin: { points: v } }));
      } catch {
      }
    };
    a();
    const t = setInterval(a, 5e3);
    return () => {
      s = !1, clearInterval(t);
    };
  }, [h, x]);
  const g = (s) => {
    f((t) => t.map((l) => l.id === s ? { ...l, enabled: !l.enabled } : l));
    const a = b.find((t) => t.id === s);
    a && m?.(s, !a.enabled);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col bg-[#1c1c1c] border-t border-[#3a3a3a]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-1 px-2 py-1 bg-[#2a2a2a] border-b border-[#3a3a3a] text-[10px] overflow-x-auto", children: [
      /* @__PURE__ */ e.jsx("span", { className: "font-bold tracking-wider text-[#b9b9b9] mr-2", children: "INDICATORS" }),
      b.map((s) => /* @__PURE__ */ e.jsxs(
        "button",
        {
          onClick: () => g(s.id),
          className: `px-2 py-0.5 rounded border text-[10px] whitespace-nowrap ${s.enabled ? "bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
          title: s.desc,
          children: [
            s.label,
            s.pro ? " PRO" : "",
            " ",
            s.enabled ? "●" : "○"
          ]
        },
        s.id
      )),
      /* @__PURE__ */ e.jsx("span", { className: "ml-auto text-[9px] text-[#b9b9b9]", children: "Render-in-order • Deduplicate LSE RSI/MACD/Volume/CVD take ONE" })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "flex flex-col", children: b.filter((s) => s.enabled).map((s) => /* @__PURE__ */ e.jsxs("div", { className: "border-b border-[#3a3a3a]/50 bg-[#2a2a2a]", style: { height: s.height }, children: [
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 px-2 py-0.5 bg-[#262626] border-b border-[#3a3a3a]/30 text-[9px] text-[#b9b9b9]", children: [
        /* @__PURE__ */ e.jsx("span", { className: "font-medium text-[#e8e8e8]", children: s.label }),
        /* @__PURE__ */ e.jsx("span", { className: "opacity-60", children: s.desc }),
        /* @__PURE__ */ e.jsx("span", { className: "ml-auto", children: s.id === "funding" ? "0.0000%" : s.id === "oi" ? "109.2K" : s.id === "vpin" ? "0.4567" : "" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "relative w-full h-[calc(100%-18px)]", children: [
        s.id === "volume" && /* @__PURE__ */ e.jsx("div", { className: "absolute inset-0 flex items-end gap-px px-2", children: Array.from({ length: 50 }).map((a, t) => /* @__PURE__ */ e.jsx("div", { className: "flex-1 bg-[#21b3a4]/60", style: { height: `${20 + Math.random() * 80}%` } }, t)) }),
        s.id === "cvd" && /* @__PURE__ */ e.jsx("svg", { className: "absolute inset-0 w-full h-full", viewBox: "0 0 200 80", children: /* @__PURE__ */ e.jsx("polyline", { fill: "none", stroke: "#21b3a4", strokeWidth: 1, points: Array.from({ length: 50 }, (a, t) => `${t * 4},${40 + Math.sin(t / 5) * 20 + (Math.random() - 0.5) * 10}`).join(" ") }) }),
        s.id === "rsi" && /* @__PURE__ */ e.jsxs("div", { className: "absolute inset-0 flex flex-col justify-center px-2", children: [
          /* @__PURE__ */ e.jsx("div", { className: "h-px bg-[#f0426c]/30 w-full absolute top-[20%]" }),
          /* @__PURE__ */ e.jsx("div", { className: "h-px bg-[#21b3a4]/30 w-full absolute top-[80%]" }),
          /* @__PURE__ */ e.jsx("svg", { className: "w-full h-full", viewBox: "0 0 200 60", children: /* @__PURE__ */ e.jsx("polyline", { fill: "none", stroke: "#d0d0d0", strokeWidth: 1, points: Array.from({ length: 50 }, (a, t) => `${t * 4},${30 + Math.sin(t / 3) * 15}`).join(" ") }) })
        ] }),
        s.id === "macd" && /* @__PURE__ */ e.jsxs("svg", { className: "absolute inset-0 w-full h-full", viewBox: "0 0 200 80", children: [
          /* @__PURE__ */ e.jsx("polyline", { fill: "none", stroke: "#3498DB", strokeWidth: 1, points: Array.from({ length: 50 }, (a, t) => `${t * 4},${40 + Math.sin(t / 4) * 10}`).join(" ") }),
          /* @__PURE__ */ e.jsx("polyline", { fill: "none", stroke: "#E67E22", strokeWidth: 1, points: Array.from({ length: 50 }, (a, t) => `${t * 4},${40 + Math.cos(t / 4) * 10}`).join(" ") }),
          Array.from({ length: 50 }).map((a, t) => /* @__PURE__ */ e.jsx("rect", { x: t * 4, y: 40, width: 2, height: Math.sin(t / 2) * 10, fill: Math.sin(t / 2) > 0 ? "#26a69a" : "#ef5350", opacity: 0.6 }, t))
        ] }),
        s.id === "funding" && /* @__PURE__ */ e.jsx("div", { className: "absolute inset-0 flex items-end gap-px px-2", children: (r.funding?.bars || []).slice(-50).map((a, t) => /* @__PURE__ */ e.jsx("div", { className: `flex-1 ${a.rate >= 0 ? "bg-[#21b3a4]" : "bg-[#f0426c]"}`, style: { height: `${Math.abs(a.rate) * 5e4 + 5}%`, minHeight: 2 } }, t)) }),
        s.id === "oi" && /* @__PURE__ */ e.jsx("svg", { className: "absolute inset-0 w-full h-full", viewBox: "0 0 200 80", children: (r.oi?.bars || []).slice(-50).map((a, t) => {
          const l = a.close >= a.open;
          return /* @__PURE__ */ e.jsxs("g", { children: [
            /* @__PURE__ */ e.jsx("line", { x1: t * 4 + 2, y1: 10 + (1 - a.high / 15e5) * 60, x2: t * 4 + 2, y2: 10 + (1 - a.low / 15e5) * 60, stroke: l ? "#21b3a4" : "#f0426c", strokeWidth: 1 }),
            /* @__PURE__ */ e.jsx("rect", { x: t * 4, y: 10 + (1 - Math.max(a.open, a.close) / 15e5) * 60, width: 4, height: Math.abs(a.open - a.close) / 15e5 * 60 + 1, fill: l ? "#21b3a4" : "#f0426c" })
          ] }, t);
        }) }),
        s.id === "vpin" && /* @__PURE__ */ e.jsxs("div", { className: "absolute inset-0", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "absolute inset-0 flex flex-col justify-between text-[8px] text-[#b9b9b9]/50 px-1", children: [
            /* @__PURE__ */ e.jsx("span", { children: "1.0" }),
            /* @__PURE__ */ e.jsx("span", { children: "0.75" }),
            /* @__PURE__ */ e.jsx("span", { children: "0.50" }),
            /* @__PURE__ */ e.jsx("span", { children: "0.25" }),
            /* @__PURE__ */ e.jsx("span", { children: "0.0" })
          ] }),
          /* @__PURE__ */ e.jsxs("svg", { className: "absolute inset-0 w-full h-full", viewBox: "0 0 200 90", children: [
            /* @__PURE__ */ e.jsx("polyline", { fill: "none", stroke: "#e8e8e8", strokeWidth: 1, points: (r.vpin?.points || []).slice(-50).map((a, t) => `${t * 4},${90 - a.vpin * 80}`).join(" ") }),
            (r.vpin?.points || []).slice(-50).map((a, t) => {
              if (a.regime === "NORMAL") return null;
              const l = a.regime === "ELEVATED" ? "rgba(33,179,164,0.05)" : a.regime === "HIGH" ? "rgba(240,66,108,0.07)" : "rgba(240,66,108,0.09)";
              return /* @__PURE__ */ e.jsx("rect", { x: t * 4, y: 0, width: 4, height: 90, fill: l }, t);
            })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "absolute bottom-1 left-2 text-[9px] text-[#e8e8e8] bg-[#1c1c1c]/80 px-1 rounded", children: [
            "TOXICITY • ",
            r.vpin?.points?.slice(-1)[0]?.regime || "NORMAL",
            " • ",
            r.vpin?.points?.slice(-1)[0]?.vpin?.toFixed(4) || "0.0000"
          ] })
        ] }),
        s.id === "toxicity" && /* @__PURE__ */ e.jsx("div", { className: "absolute inset-0 flex items-center justify-center text-[10px] text-[#b9b9b9]", children: "Toxicity regime washes + 3px on-axis strip + corner readout • VPIN companion" })
      ] })
    ] }, s.id)) })
  ] });
}
export {
  N as EdgeDepthIndicators
};
