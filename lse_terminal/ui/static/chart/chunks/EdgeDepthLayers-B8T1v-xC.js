import { r as c, j as e } from "./react-vendor-C0yw3i6b.js";
const x = [
  { id: "liquidations", label: "Liquidations", enabled: !0, desc: "Liquidation heatmap 800 bands" },
  { id: "exposure_v2", label: "Exposure V2", enabled: !0, desc: "Exposure field V2" },
  { id: "hyperliquid_levels", label: "Hyperliquid Levels", enabled: !0, desc: "HL levels" },
  { id: "market_structure", label: "Market Structure", enabled: !0, desc: "BOS/CHoCH" },
  { id: "vpvr", label: "VPVR", enabled: !1, desc: "Volume Profile POC/VAH/VAL" },
  { id: "leverage_tiers", label: "Leverage Tiers", enabled: !1, desc: "2x/5x/10x/25x/50x" },
  { id: "session_vwap", label: "Session VWAP", enabled: !1, desc: "HLC3 weighted" },
  { id: "prev_day", label: "Prev Day HL/C", enabled: !1, desc: "Previous day levels" },
  { id: "prev_week", label: "Prev Week HL/C", enabled: !1, desc: "Previous week levels" }
];
function u({ layers: r, onChange: d }) {
  const [i, n] = c.useState(x), t = r ?? i, o = (a) => {
    const l = t.map((s) => s.id === a ? { ...s, enabled: !s.enabled } : s);
    r || n(l), d?.(l);
  }, b = t.filter((a) => a.enabled).length;
  return /* @__PURE__ */ e.jsxs("div", { className: "w-[300px] rounded-xl border border-[#3a3a3a] bg-[#1c1c1c] shadow-2xl overflow-hidden", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "px-4 py-3 border-b border-[#2a2a2a] bg-[#222222] flex justify-between items-center", children: [
      /* @__PURE__ */ e.jsx("span", { className: "font-semibold tracking-wider text-[11px] text-[#e8e8e8]", children: "LAYERS" }),
      /* @__PURE__ */ e.jsxs("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9]", children: [
        b,
        " active"
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "p-2 space-y-1 max-h-[380px] overflow-auto", children: t.map((a) => /* @__PURE__ */ e.jsxs("button", { onClick: () => o(a.id), className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-colors ${a.enabled ? "bg-[#262626] border-[#3a3a3a] text-[#e8e8e8]" : "bg-transparent border-transparent text-[#6a6a6a] hover:bg-[#262626] hover:border-[#2a2a2a] hover:text-[#b9b9b9]"}`, children: [
      /* @__PURE__ */ e.jsx("span", { className: `w-9 h-5 rounded-full flex items-center px-0.5 transition-colors ${a.enabled ? "bg-[#21b3a4] justify-end" : "bg-[#3a3a3a] justify-start"}`, children: /* @__PURE__ */ e.jsx("span", { className: "w-4 h-4 rounded-full bg-white shadow-sm" }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ e.jsx("div", { className: "text-[12px] font-medium leading-tight", children: a.label }),
        /* @__PURE__ */ e.jsx("div", { className: "text-[10px] text-[#6a6a6a] leading-tight mt-0.5 truncate", children: a.desc })
      ] })
    ] }, a.id)) }),
    /* @__PURE__ */ e.jsx("div", { className: "px-4 py-2 border-t border-[#2a2a2a] bg-[#222222] text-[10px] text-[#6a6a6a]", children: "Toggle layers to overlay on chart • VPVR, VWAP, pivots wired to indicators" })
  ] });
}
export {
  x as DEFAULT_LAYERS,
  u as EdgeDepthLayers,
  u as default
};
