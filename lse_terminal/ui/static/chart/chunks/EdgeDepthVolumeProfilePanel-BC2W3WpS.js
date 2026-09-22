import { r as h, j as e } from "./react-vendor-C0yw3i6b.js";
function v({ symbol: d, provider: p = "binance" }) {
  const [o, f] = h.useState(null);
  h.useEffect(() => {
    let s = !0;
    const c = async () => {
      try {
        const l = await fetch(`/api/orderflow/volume_profile?symbol=${encodeURIComponent(d)}&provider=${encodeURIComponent(p)}`);
        if (!l.ok) return;
        const x = await l.json();
        s && f(x);
      } catch {
      }
    };
    c();
    const i = setInterval(c, 3e3);
    return () => {
      s = !1, clearInterval(i);
    };
  }, [d, p]);
  const b = o?.levels || [], a = o?.poc || null, t = o?.vah || null, r = o?.val || null, N = Math.max(...b.map((s) => s.volume || 0), 1), n = b.length ? b : Array.from({ length: 30 }, (s, c) => {
    const i = 5e4 + (c - 15) * 10, l = Math.exp(-Math.pow(c - 15, 2) / 50) * 1e3 + Math.random() * 100;
    return { price: i, volume: l, buy: l * 0.6, sell: l * 0.4 };
  });
  return /* @__PURE__ */ e.jsxs("div", { className: "h-full flex flex-col bg-[#1c1c1c] border border-[#3a3a3a]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 px-2 py-1 bg-[#2a2a2a] border-b border-[#3a3a3a] text-[10px]", children: [
      /* @__PURE__ */ e.jsxs("span", { className: "font-bold tracking-wider text-[#e8e8e8]", children: [
        "VPVR — ",
        d
      ] }),
      /* @__PURE__ */ e.jsxs("span", { className: "text-[#b9b9b9]", children: [
        p.toUpperCase(),
        " POC/VAH/VAL"
      ] }),
      a && /* @__PURE__ */ e.jsxs("span", { className: "ml-2 text-[#f0b350]", children: [
        "POC ",
        Number(a.price || a).toFixed(2)
      ] }),
      t && /* @__PURE__ */ e.jsxs("span", { className: "text-[#21b3a4]", children: [
        "VAH ",
        Number(t.price || t).toFixed(2)
      ] }),
      r && /* @__PURE__ */ e.jsxs("span", { className: "text-[#f0426c]", children: [
        "VAL ",
        Number(r.price || r).toFixed(2)
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "flex-1 flex", children: [
      /* @__PURE__ */ e.jsx("div", { className: "flex-1 overflow-auto p-1", children: n.map((s, c) => {
        const i = a && Math.abs(s.price - (a.price || a)) < 5, l = t && Math.abs(s.price - (t.price || t)) < 5, x = r && Math.abs(s.price - (r.price || r)) < 5, m = s.volume / N * 100, u = s.volume ? (s.buy || s.volume * 0.5) / s.volume : 0.5;
        return /* @__PURE__ */ e.jsxs("div", { className: `flex items-center gap-1 py-0.5 px-1 text-[10px] font-mono border-b border-[#3a3a3a]/20 ${i ? "bg-[#f0b350]/20 ring-1 ring-[#f0b350]/50" : l || x ? "bg-[#21b3a4]/10" : ""}`, children: [
          /* @__PURE__ */ e.jsx("span", { className: "w-16 tabular-nums text-[#e8e8e8]", children: Number(s.price).toFixed(1) }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex-1 h-3 bg-[#2a2a2a] relative overflow-hidden rounded-[1px]", children: [
            /* @__PURE__ */ e.jsx("div", { className: "absolute inset-y-0 left-0 bg-[#21b3a4]/60", style: { width: `${m * u}%` } }),
            /* @__PURE__ */ e.jsx("div", { className: "absolute inset-y-0 bg-[#f0426c]/60", style: { left: `${m * u}%`, width: `${m * (1 - u)}%` } })
          ] }),
          /* @__PURE__ */ e.jsx("span", { className: "w-12 text-right tabular-nums text-[#b9b9b9]", children: Number(s.volume).toFixed(0) }),
          i && /* @__PURE__ */ e.jsx("span", { className: "text-[8px] bg-[#f0b350] text-black px-1 rounded", children: "POC" }),
          l && /* @__PURE__ */ e.jsx("span", { className: "text-[8px] bg-[#21b3a4] text-black px-1 rounded", children: "VAH" }),
          x && /* @__PURE__ */ e.jsx("span", { className: "text-[8px] bg-[#f0426c] text-white px-1 rounded", children: "VAL" })
        ] }, c);
      }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "w-32 border-l border-[#3a3a3a] bg-[#262626] p-2 text-[9px] space-y-2", children: [
        /* @__PURE__ */ e.jsx("div", { className: "text-[#b9b9b9] uppercase tracking-wider", children: "Profile Stats" }),
        /* @__PURE__ */ e.jsxs("div", { className: "space-y-1 text-[#e8e8e8]", children: [
          /* @__PURE__ */ e.jsxs("div", { children: [
            "POC: ",
            a ? Number(a.price || a).toFixed(2) : "—"
          ] }),
          /* @__PURE__ */ e.jsxs("div", { children: [
            "VAH: ",
            t ? Number(t.price || t).toFixed(2) : "—"
          ] }),
          /* @__PURE__ */ e.jsxs("div", { children: [
            "VAL: ",
            r ? Number(r.price || r).toFixed(2) : "—"
          ] }),
          /* @__PURE__ */ e.jsxs("div", { children: [
            "Range: ",
            n.length ? `${Number(n[0].price).toFixed(0)} - ${Number(n[n.length - 1].price).toFixed(0)}` : "—"
          ] })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "text-[8px] text-[#b9b9b9]/60 pt-2 border-t border-[#3a3a3a]", children: "Volume Profile Visible Range — POC amber, VAH/VAL teal/rose, buy/sell split, exact EdgeDepth volume_profile_manager.cpp" })
      ] })
    ] })
  ] });
}
export {
  v as EdgeDepthVolumeProfilePanel,
  v as default
};
