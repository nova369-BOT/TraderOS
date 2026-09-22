import { r as n, j as a } from "./react-vendor-C0yw3i6b.js";
function x({ onChange: r }) {
  const [l, d] = n.useState([
    { id: "liquidations", label: "Liquidations", enabled: !0, desc: "Liquidation heatmap 800 bands 0.05%" },
    { id: "exposure_v2", label: "Exposure V2", enabled: !0, desc: "Exposure field V2" },
    { id: "hyperliquid_levels", label: "Hyperliquid Levels", enabled: !0, desc: "HL levels" },
    { id: "market_structure", label: "Market Structure", enabled: !0, desc: "MS with BOS/CHoCH" },
    { id: "vpvr", label: "VPVR", enabled: !1, desc: "Volume Profile Visible Range POC/VAH/VAL" },
    { id: "leverage_tiers", label: "Leverage Tiers", enabled: !1, desc: "Leverage tiers 2x/5x/10x/25x/50x" },
    { id: "session_vwap", label: "Session VWAP", enabled: !1, desc: "HLC3 weighted by base volume" },
    { id: "prev_day", label: "Prev Day High/Low/Close", enabled: !1, desc: "Previous day levels" },
    { id: "prev_week", label: "Prev Week High/Low/Close", enabled: !1, desc: "Previous week levels" }
  ]), i = (e) => {
    const t = l.map((s) => s.id === e ? { ...s, enabled: !s.enabled } : s);
    d(t), r?.(t);
  };
  return /* @__PURE__ */ a.jsxs("div", { className: "w-[260px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl text-[11px]", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "px-3 py-2 border-b border-[#3a3a3a] flex justify-between items-center", children: [
      /* @__PURE__ */ a.jsx("span", { className: "font-bold tracking-wider text-[10px] text-[#b9b9b9]", children: "LAYERS — 4 ON" }),
      /* @__PURE__ */ a.jsxs("span", { className: "text-[9px] text-[#b9b9b9]", children: [
        l.filter((e) => e.enabled).length,
        " ON"
      ] })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "p-2 space-y-1", children: l.map((e) => /* @__PURE__ */ a.jsxs("label", { className: "flex items-center gap-2 px-2 py-1 hover:bg-[#343434] rounded cursor-pointer", children: [
      /* @__PURE__ */ a.jsx("input", { type: "checkbox", checked: e.enabled, onChange: () => i(e.id), className: "accent-[#d0d0d0]" }),
      /* @__PURE__ */ a.jsx("span", { className: `text-[11px] ${e.enabled ? "text-[#e8e8e8]" : "text-[#b9b9b9]"}`, children: e.label }),
      /* @__PURE__ */ a.jsx("span", { className: "ml-auto text-[8px] text-[#b9b9b9]/60 truncate max-w-[100px]", children: e.desc })
    ] }, e.id)) }),
    /* @__PURE__ */ a.jsx("div", { className: "px-3 py-2 border-t border-[#3a3a3a] text-[9px] text-[#b9b9b9]/60", children: "Layers: liquidations/Exposure V2/Hyperliquid levels/Market structure/VPVR/leverage tiers — exact EdgeDepth" })
  ] });
}
export {
  x as EdgeDepthLayers,
  x as default
};
