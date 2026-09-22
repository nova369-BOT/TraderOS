import { r as x, j as e } from "./react-vendor-C0yw3i6b.js";
const y = [
  { id: "volume", label: "Volume", desc: "Volume bars", enabled: !0, height: 100, lseKey: "volume", icon: "▤" },
  { id: "cvd", label: "CVD", desc: "Cumulative Delta", enabled: !0, height: 110, lseKey: "cvd", icon: "◧" },
  { id: "rsi", label: "RSI", desc: "RSI 14", enabled: !1, height: 100, lseKey: "rsi", icon: "◨" },
  { id: "macd", label: "MACD", desc: "MACD 12/26/9", enabled: !1, height: 110, lseKey: "macd", icon: "≋" },
  { id: "funding", label: "Funding", desc: "Funding Rate", enabled: !1, height: 90, icon: "₿" },
  { id: "oi", label: "Open Interest", desc: "OI OHLC", enabled: !1, height: 110, icon: "◫" },
  { id: "vpin", label: "VPIN", desc: "Toxicity 0-1.0", enabled: !1, height: 120, icon: "⚠" },
  { id: "toxicity", label: "Toxicity", desc: "Regime washes", enabled: !1, height: 100, icon: "☢" }
];
function w({
  symbol: h,
  provider: p = "binance",
  onToggle: j,
  enabledIds: m
}) {
  const [f, u] = x.useState(y), [c, d] = x.useState({});
  x.useEffect(() => {
    m && u((t) => t.map((a) => ({ ...a, enabled: m.has(a.id) })));
  }, [m]), x.useEffect(() => {
    let t = !0;
    const a = async () => {
      try {
        try {
          const l = await fetch(`/api/orderflow/cvd?symbol=${encodeURIComponent(h)}&provider=${encodeURIComponent(p)}&window=session`);
          if (l.ok && t) {
            const r = await l.json();
            d((n) => ({ ...n, cvd: r }));
          }
        } catch {
        }
        try {
          const l = await fetch(`/api/orderflow/funding?symbol=${encodeURIComponent(h)}&provider=${encodeURIComponent(p)}`);
          if (l.ok && t) {
            const r = await l.json();
            d((n) => ({ ...n, funding: r }));
          } else {
            const r = Array.from({ length: 50 }, (n, v) => ({ time: Date.now() - (50 - v) * 8 * 36e5, rate: (Math.random() - 0.5) * 1e-3 }));
            t && d((n) => ({ ...n, funding: { bars: r } }));
          }
        } catch {
          const l = Array.from({ length: 50 }, (r, n) => ({ time: Date.now() - (50 - n) * 8 * 36e5, rate: (Math.random() - 0.5) * 1e-3 }));
          t && d((r) => ({ ...r, funding: { bars: l } }));
        }
        const i = Array.from({ length: 50 }, (l, r) => {
          const n = 1e6 + Math.random() * 5e5;
          return { time: Date.now() - (50 - r) * 36e5, open: n, high: n * 1.02, low: n * 0.98, close: n + (Math.random() - 0.5) * 1e5 };
        });
        t && d((l) => ({ ...l, oi: { bars: i } }));
        const o = Array.from({ length: 100 }, (l, r) => ({ ts_ms: Date.now() - (100 - r) * 6e4, vpin: Math.random(), conf: Math.random(), regime: ["NORMAL", "ELEVATED", "HIGH", "EXTREME"][Math.floor(Math.random() * 4)] }));
        t && d((l) => ({ ...l, vpin: { points: o } }));
      } catch {
      }
    };
    a();
    const s = setInterval(a, 5e3);
    return () => {
      t = !1, clearInterval(s);
    };
  }, [h, p]);
  const g = (t) => {
    u((a) => {
      const s = a.map((o) => o.id === t ? { ...o, enabled: !o.enabled } : o), i = s.find((o) => o.id === t);
      if (i) {
        const o = i.lseKey;
        if (o)
          try {
            const l = window.__lseShell;
            l?.setIndicators ? l.setIndicators({ [o]: { enabled: i.enabled } }) : window.dispatchEvent(new CustomEvent("lset:indicator-toggle", { detail: { key: o, enabled: i.enabled } }));
          } catch {
          }
        j?.(t, i.enabled);
      }
      return s;
    });
  }, b = f.filter((t) => t.enabled);
  return /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col h-full bg-[#1c1c1c] text-[#e8e8e8] select-none", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0 overflow-x-auto", children: [
      /* @__PURE__ */ e.jsx("span", { className: "text-[11px] font-semibold tracking-wider shrink-0", children: "INDICATORS" }),
      /* @__PURE__ */ e.jsxs("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] shrink-0", children: [
        b.length,
        " active"
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-1 ml-2", children: f.map((t) => /* @__PURE__ */ e.jsxs(
        "button",
        {
          onClick: () => g(t.id),
          className: `px-2.5 py-1 rounded-full border text-[11px] font-medium flex items-center gap-1 transition-colors whitespace-nowrap ${t.enabled ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
          title: `${t.desc}${t.lseKey ? " • LSE dedup: take ONE" : ""}`,
          children: [
            /* @__PURE__ */ e.jsx("span", { className: "text-[12px]", children: t.icon }),
            " ",
            t.label
          ]
        },
        t.id
      )) }),
      /* @__PURE__ */ e.jsx("span", { className: "ml-auto text-[10px] text-[#6a6a6a] hidden lg:block shrink-0", children: "Render-in-order • LSE dedup" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "flex-1 overflow-auto p-2 space-y-2 bg-[#1c1c1c]", children: [
      b.length === 0 && /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center", children: [
        /* @__PURE__ */ e.jsx("div", { className: "w-12 h-12 rounded-full bg-[#262626] border border-[#3a3a3a] flex items-center justify-center text-[20px] mb-3", children: "◧" }),
        /* @__PURE__ */ e.jsx("div", { className: "text-[13px] font-medium text-[#e8e8e8]", children: "No indicators active" }),
        /* @__PURE__ */ e.jsx("div", { className: "text-[11px] text-[#6a6a6a] mt-1 max-w-[280px]", children: "Click pills above to add Volume, CVD, RSI, MACD, Funding Rate, Open Interest, VPIN, Toxicity. LSE duplicates take ONE implementation." })
      ] }),
      b.map((t) => /* @__PURE__ */ e.jsxs("div", { className: "rounded-xl border border-[#2a2a2a] bg-[#222222] overflow-hidden", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 border-b border-[#2a2a2a] bg-[#262626]", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-[14px]", children: t.icon }),
          /* @__PURE__ */ e.jsx("span", { className: "text-[12px] font-semibold text-[#e8e8e8]", children: t.label }),
          /* @__PURE__ */ e.jsx("span", { className: "text-[10px] text-[#6a6a6a]", children: t.desc }),
          /* @__PURE__ */ e.jsx("span", { className: "ml-auto text-[10px] px-2 py-0.5 rounded-full bg-[#1c1c1c] border border-[#3a3a3a] text-[#b9b9b9]", children: t.id === "funding" ? "0.0000%" : t.id === "oi" ? "1.2M" : t.id === "vpin" ? "0.4567" : "Live" }),
          /* @__PURE__ */ e.jsx("button", { onClick: () => g(t.id), className: "w-6 h-6 rounded-md bg-[#1c1c1c] border border-[#3a3a3a] text-[#6a6a6a] hover:text-[#e8e8e8] flex items-center justify-center text-[12px]", children: "×" })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "relative w-full bg-[#1c1c1c]", style: { height: t.height }, children: [
          t.id === "volume" && /* @__PURE__ */ e.jsx("div", { className: "absolute inset-0 flex items-end gap-px p-2", children: Array.from({ length: 50 }).map((a, s) => /* @__PURE__ */ e.jsx("div", { className: "flex-1 rounded-sm bg-[#21b3a4]/70 hover:bg-[#21b3a4]", style: { height: `${20 + Math.random() * 80}%` } }, s)) }),
          t.id === "cvd" && /* @__PURE__ */ e.jsx("svg", { className: "absolute inset-0 w-full h-full p-2", viewBox: "0 0 200 80", children: /* @__PURE__ */ e.jsx("polyline", { fill: "none", stroke: "#21b3a4", strokeWidth: 1.5, strokeLinecap: "round", points: Array.from({ length: 50 }, (a, s) => `${s * 4},${40 + Math.sin(s / 5) * 20 + (Math.random() - 0.5) * 10}`).join(" ") }) }),
          t.id === "rsi" && /* @__PURE__ */ e.jsxs("div", { className: "absolute inset-0 p-2", children: [
            /* @__PURE__ */ e.jsx("div", { className: "absolute left-2 right-2 top-[20%] h-px bg-[#f0426c]/20 border-t border-dashed border-[#f0426c]/30" }),
            /* @__PURE__ */ e.jsx("div", { className: "absolute left-2 right-2 top-[80%] h-px bg-[#21b3a4]/20 border-t border-dashed border-[#21b3a4]/30" }),
            /* @__PURE__ */ e.jsx("div", { className: "absolute left-2 top-2 text-[9px] text-[#f0426c]/60", children: "70" }),
            /* @__PURE__ */ e.jsx("div", { className: "absolute left-2 bottom-2 text-[9px] text-[#21b3a4]/60", children: "30" }),
            /* @__PURE__ */ e.jsx("svg", { className: "w-full h-full", viewBox: "0 0 200 60", children: /* @__PURE__ */ e.jsx("polyline", { fill: "none", stroke: "#e8e8e8", strokeWidth: 1.2, points: Array.from({ length: 50 }, (a, s) => `${s * 4},${30 + Math.sin(s / 3) * 15}`).join(" ") }) })
          ] }),
          t.id === "macd" && /* @__PURE__ */ e.jsxs("svg", { className: "absolute inset-0 w-full h-full p-2", viewBox: "0 0 200 80", children: [
            /* @__PURE__ */ e.jsx("polyline", { fill: "none", stroke: "#60a5fa", strokeWidth: 1.2, points: Array.from({ length: 50 }, (a, s) => `${s * 4},${40 + Math.sin(s / 4) * 10}`).join(" ") }),
            /* @__PURE__ */ e.jsx("polyline", { fill: "none", stroke: "#f59e0b", strokeWidth: 1.2, points: Array.from({ length: 50 }, (a, s) => `${s * 4},${40 + Math.cos(s / 4) * 10}`).join(" ") }),
            Array.from({ length: 50 }).map((a, s) => /* @__PURE__ */ e.jsx("rect", { x: s * 4, y: 40, width: 2.5, height: Math.sin(s / 2) * 12, fill: Math.sin(s / 2) > 0 ? "#21b3a4" : "#f0426c", opacity: 0.7, rx: 1 }, s))
          ] }),
          t.id === "funding" && /* @__PURE__ */ e.jsxs("div", { className: "absolute inset-0 flex items-end gap-px p-2", children: [
            (c.funding?.bars || []).slice(-50).map((a, s) => /* @__PURE__ */ e.jsx("div", { className: `flex-1 rounded-sm ${a.rate >= 0 ? "bg-[#21b3a4]" : "bg-[#f0426c]"}`, style: { height: `${Math.min(90, Math.abs(a.rate) * 5e4 + 8)}%`, minHeight: 3 } }, s)),
            /* @__PURE__ */ e.jsx("div", { className: "absolute left-0 right-0 top-1/2 h-px bg-[#3a3a3a]" })
          ] }),
          t.id === "oi" && /* @__PURE__ */ e.jsx("svg", { className: "absolute inset-0 w-full h-full p-2", viewBox: "0 0 200 80", children: (c.oi?.bars || []).slice(-50).map((a, s) => {
            const i = a.close >= a.open;
            return /* @__PURE__ */ e.jsxs("g", { children: [
              /* @__PURE__ */ e.jsx("line", { x1: s * 4 + 2, y1: 10 + (1 - a.high / 15e5) * 60, x2: s * 4 + 2, y2: 10 + (1 - a.low / 15e5) * 60, stroke: i ? "#21b3a4" : "#f0426c", strokeWidth: 1 }),
              /* @__PURE__ */ e.jsx("rect", { x: s * 4, y: 10 + (1 - Math.max(a.open, a.close) / 15e5) * 60, width: 3, height: Math.max(2, Math.abs(a.open - a.close) / 15e5 * 60), fill: i ? "#21b3a4" : "#f0426c", rx: 1 })
            ] }, s);
          }) }),
          t.id === "vpin" && /* @__PURE__ */ e.jsxs("div", { className: "absolute inset-0 p-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "absolute left-2 top-0 bottom-0 w-8 flex flex-col justify-between text-[9px] text-[#6a6a6a] py-1", children: [
              /* @__PURE__ */ e.jsx("span", { children: "1.0" }),
              /* @__PURE__ */ e.jsx("span", { children: "0.75" }),
              /* @__PURE__ */ e.jsx("span", { children: "0.50" }),
              /* @__PURE__ */ e.jsx("span", { children: "0.25" }),
              /* @__PURE__ */ e.jsx("span", { children: "0.0" })
            ] }),
            /* @__PURE__ */ e.jsxs("svg", { className: "absolute left-10 right-2 top-0 bottom-0 w-[calc(100%-40px)] h-full", viewBox: "0 0 200 90", children: [
              /* @__PURE__ */ e.jsx("polyline", { fill: "none", stroke: "#e8e8e8", strokeWidth: 1.2, points: (c.vpin?.points || []).slice(-50).map((a, s) => `${s * 4},${90 - a.vpin * 80}`).join(" ") }),
              (c.vpin?.points || []).slice(-50).map((a, s) => {
                if (a.regime === "NORMAL") return null;
                const i = a.regime === "ELEVATED" ? "rgba(33,179,164,0.08)" : a.regime === "HIGH" ? "rgba(240,66,108,0.1)" : "rgba(240,66,108,0.15)";
                return /* @__PURE__ */ e.jsx("rect", { x: s * 4, y: 0, width: 4, height: 90, fill: i }, s);
              })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "absolute bottom-2 left-12 text-[10px] px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[#e8e8e8]", children: [
              "TOXICITY • ",
              c.vpin?.points?.slice(-1)[0]?.regime || "NORMAL",
              " • ",
              c.vpin?.points?.slice(-1)[0]?.vpin?.toFixed(4) || "0.0000"
            ] })
          ] }),
          t.id === "toxicity" && /* @__PURE__ */ e.jsx("div", { className: "absolute inset-0 flex items-center justify-center p-4", children: /* @__PURE__ */ e.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ e.jsx("div", { className: "text-[12px] text-[#e8e8e8] font-medium", children: "Toxicity Regime" }),
            /* @__PURE__ */ e.jsx("div", { className: "text-[11px] text-[#6a6a6a] mt-1", children: "Washes + 3px strip + corner readout • VPIN companion • 0.30/0.45/0.60 thresholds" }),
            /* @__PURE__ */ e.jsxs("div", { className: "mt-3 flex gap-1 justify-center", children: [
              /* @__PURE__ */ e.jsx("span", { className: "px-2 py-1 rounded-full bg-[#21b3a4]/10 border border-[#21b3a4]/20 text-[10px] text-[#21b3a4]", children: "NORMAL" }),
              /* @__PURE__ */ e.jsx("span", { className: "px-2 py-1 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[10px] text-[#f59e0b]", children: "ELEVATED" }),
              /* @__PURE__ */ e.jsx("span", { className: "px-2 py-1 rounded-full bg-[#f0426c]/10 border border-[#f0426c]/20 text-[10px] text-[#f0426c]", children: "HIGH" })
            ] })
          ] }) })
        ] })
      ] }, t.id))
    ] })
  ] });
}
export {
  w as EdgeDepthIndicators,
  w as default
};
