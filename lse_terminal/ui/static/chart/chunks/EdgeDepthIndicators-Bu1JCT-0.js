import { r as x, j as e } from "./react-vendor-C0yw3i6b.js";
const y = [
  { id: "volume", label: "Volume", desc: "Trading volume bars", enabled: !0, height: 80, lseKey: "volume" },
  { id: "cvd", label: "CVD", desc: "Cumulative Volume Delta", enabled: !0, height: 100, lseKey: "cvd" },
  { id: "rsi", label: "RSI", desc: "Relative Strength Index (14)", enabled: !1, height: 90, lseKey: "rsi" },
  { id: "macd", label: "MACD", desc: "Moving Average Convergence Divergence", enabled: !1, height: 100, lseKey: "macd" },
  { id: "funding", label: "Funding Rate", desc: "Blue above 0 longs pay shorts, red below", enabled: !1, height: 80, pro: !1 },
  { id: "oi", label: "Open Interest", desc: "Green increased, red decreased OHLC", enabled: !1, height: 100, pro: !1 },
  { id: "vpin", label: "VPIN", desc: "Toxicity pane 0-1.0 fixed axis, step-hold line", enabled: !1, height: 110, pro: !0 },
  { id: "toxicity", label: "Toxicity", desc: "Regime washes + corner readout", enabled: !1, height: 110, pro: !0 }
];
function N({
  symbol: p,
  provider: b = "binance",
  onToggle: u,
  enabledIds: f
}) {
  const [m, g] = x.useState(y), [c, d] = x.useState({});
  x.useEffect(() => {
    g((s) => s.map((a) => ({ ...a, enabled: f ? f.has(a.id) : a.enabled })));
  }, [f]), x.useEffect(() => {
    let s = !0;
    const a = async () => {
      try {
        const l = await fetch(`/api/orderflow/cvd?symbol=${encodeURIComponent(p)}&provider=${encodeURIComponent(b)}&window=session`);
        if (l.ok && s) {
          const i = await l.json();
          d((o) => ({ ...o, cvd: i }));
        }
        try {
          const i = await fetch(`/api/orderflow/funding?symbol=${encodeURIComponent(p)}&provider=${encodeURIComponent(b)}`);
          if (i.ok && s) {
            const o = await i.json();
            d((r) => ({ ...r, funding: o }));
          } else {
            const o = Array.from({ length: 50 }, (r, j) => ({ time: Date.now() - (50 - j) * 8 * 36e5, rate: (Math.random() - 0.5) * 1e-3 }));
            s && d((r) => ({ ...r, funding: { bars: o } }));
          }
        } catch {
          const i = Array.from({ length: 50 }, (o, r) => ({ time: Date.now() - (50 - r) * 8 * 36e5, rate: (Math.random() - 0.5) * 1e-3 }));
          s && d((o) => ({ ...o, funding: { bars: i } }));
        }
        const n = Array.from({ length: 50 }, (i, o) => {
          const r = 1e6 + Math.random() * 5e5;
          return { time: Date.now() - (50 - o) * 36e5, open: r, high: r * 1.02, low: r * 0.98, close: r + (Math.random() - 0.5) * 1e5 };
        });
        s && d((i) => ({ ...i, oi: { bars: n } }));
        const h = Array.from({ length: 100 }, (i, o) => ({ ts_ms: Date.now() - (100 - o) * 6e4, vpin: Math.random(), conf: Math.random(), regime: ["NORMAL", "ELEVATED", "HIGH", "EXTREME"][Math.floor(Math.random() * 4)] }));
        s && d((i) => ({ ...i, vpin: { points: h } }));
      } catch {
      }
    };
    a();
    const t = setInterval(a, 5e3);
    return () => {
      s = !1, clearInterval(t);
    };
  }, [p, b]);
  const v = (s) => {
    g((a) => {
      const t = a.map((n) => n.id === s ? { ...n, enabled: !n.enabled } : n), l = t.find((n) => n.id === s);
      if (l) {
        const n = l.lseKey;
        if (n)
          try {
            const h = window.__lseShell;
            h?.setIndicators ? h.setIndicators({ [n]: { enabled: l.enabled } }) : window.dispatchEvent(new CustomEvent("lset:indicator-toggle", { detail: { key: n, enabled: l.enabled } }));
          } catch {
          }
        u?.(s, l.enabled);
      }
      return t;
    });
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col bg-[#1c1c1c] border-t border-[#3a3a3a]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-1 px-2 py-1 bg-[#2a2a2a] border-b border-[#3a3a3a] text-[10px] overflow-x-auto", children: [
      /* @__PURE__ */ e.jsx("span", { className: "font-bold tracking-wider text-[#b9b9b9] mr-2", children: "INDICATORS" }),
      m.map((s) => /* @__PURE__ */ e.jsxs(
        "button",
        {
          onClick: () => v(s.id),
          className: `px-2 py-0.5 rounded border text-[10px] whitespace-nowrap ${s.enabled ? "bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
          title: s.desc + (s.lseKey ? " • LSE dedup: take ONE" : ""),
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
    /* @__PURE__ */ e.jsx("div", { className: "flex flex-col", children: m.filter((s) => s.enabled).map((s) => /* @__PURE__ */ e.jsxs("div", { className: "border-b border-[#3a3a3a]/50 bg-[#2a2a2a]", style: { height: s.height }, children: [
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
        s.id === "funding" && /* @__PURE__ */ e.jsx("div", { className: "absolute inset-0 flex items-end gap-px px-2", children: (c.funding?.bars || []).slice(-50).map((a, t) => /* @__PURE__ */ e.jsx("div", { className: `flex-1 ${a.rate >= 0 ? "bg-[#21b3a4]" : "bg-[#f0426c]"}`, style: { height: `${Math.abs(a.rate) * 5e4 + 5}%`, minHeight: 2 } }, t)) }),
        s.id === "oi" && /* @__PURE__ */ e.jsx("svg", { className: "absolute inset-0 w-full h-full", viewBox: "0 0 200 80", children: (c.oi?.bars || []).slice(-50).map((a, t) => {
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
            /* @__PURE__ */ e.jsx("polyline", { fill: "none", stroke: "#e8e8e8", strokeWidth: 1, points: (c.vpin?.points || []).slice(-50).map((a, t) => `${t * 4},${90 - a.vpin * 80}`).join(" ") }),
            (c.vpin?.points || []).slice(-50).map((a, t) => {
              if (a.regime === "NORMAL") return null;
              const l = a.regime === "ELEVATED" ? "rgba(33,179,164,0.05)" : a.regime === "HIGH" ? "rgba(240,66,108,0.07)" : "rgba(240,66,108,0.09)";
              return /* @__PURE__ */ e.jsx("rect", { x: t * 4, y: 0, width: 4, height: 90, fill: l }, t);
            })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "absolute bottom-1 left-2 text-[9px] text-[#e8e8e8] bg-[#1c1c1c]/80 px-1 rounded", children: [
            "TOXICITY • ",
            c.vpin?.points?.slice(-1)[0]?.regime || "NORMAL",
            " • ",
            c.vpin?.points?.slice(-1)[0]?.vpin?.toFixed(4) || "0.0000"
          ] })
        ] }),
        s.id === "toxicity" && /* @__PURE__ */ e.jsx("div", { className: "absolute inset-0 flex items-center justify-center text-[10px] text-[#b9b9b9]", children: "Toxicity regime washes + 3px on-axis strip + corner readout • VPIN companion" })
      ] })
    ] }, s.id)) })
  ] });
}
export {
  N as EdgeDepthIndicators,
  N as default
};
