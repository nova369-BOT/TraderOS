import { r as b, j as s } from "./react-vendor-C0yw3i6b.js";
function v({ symbol: r, provider: o = "binance" }) {
  const [n, i] = b.useState([]);
  b.useEffect(() => {
    let e = !0;
    const a = async () => {
      try {
        const d = await fetch(`/api/orderflow/vpvr?symbol=${encodeURIComponent(r)}&provider=${encodeURIComponent(o)}`);
        if (d.ok) {
          const t = await d.json();
          if (e && t.levels) {
            i(t.levels);
            return;
          }
        }
      } catch {
      }
      if (!e) return;
      const c = 5e4, f = Array.from({ length: 40 }, (d, t) => {
        const u = c + (20 - t) * 10, x = Math.exp(-Math.pow(t - 20, 2) / 80) * 100 + Math.random() * 10;
        return { price: u, volume: x, buy: x * (0.4 + Math.random() * 0.2), sell: x * (0.4 + Math.random() * 0.2), is_poc: t === 20, is_vah: t === 12, is_val: t === 28 };
      });
      i(f);
    };
    a();
    const l = setInterval(a, 2e3);
    return () => {
      e = !1, clearInterval(l);
    };
  }, [r, o]);
  const m = Math.max(...n.map((e) => e.volume || 0), 1), p = n.find((e) => e.is_poc);
  return /* @__PURE__ */ s.jsxs("div", { className: "h-full flex flex-col bg-[#1c1c1c] text-[#e8e8e8]", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0", children: [
      /* @__PURE__ */ s.jsx("span", { className: "text-[11px] font-semibold tracking-wider", children: "VPVR" }),
      /* @__PURE__ */ s.jsx("span", { className: "font-mono text-[13px] font-medium", children: r }),
      /* @__PURE__ */ s.jsx("span", { className: "px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9]", children: o?.toUpperCase() }),
      p && /* @__PURE__ */ s.jsxs("span", { className: "ml-auto text-[10px] px-2 py-0.5 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#f59e0b]", children: [
        "POC ",
        p.price.toFixed(2)
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "flex-1 overflow-auto p-2 space-y-0.5", children: n.map((e, a) => {
      const l = e.volume / m * 100, c = e.volume ? e.buy / e.volume * 100 : 50;
      return /* @__PURE__ */ s.jsxs("div", { className: `relative flex items-center gap-2 px-2 py-1 rounded-md border ${e.is_poc ? "border-[#f59e0b]/30 bg-[#f59e0b]/5" : e.is_vah || e.is_val ? "border-[#21b3a4]/20 bg-[#21b3a4]/5" : "border-transparent hover:bg-[#262626]"}`, children: [
        /* @__PURE__ */ s.jsx("span", { className: "w-16 font-mono text-[11px] tabular-nums", children: e.price.toFixed(1) }),
        /* @__PURE__ */ s.jsxs("div", { className: "flex-1 h-4 rounded bg-[#262626] overflow-hidden flex relative", children: [
          /* @__PURE__ */ s.jsx("div", { className: "h-full bg-[#21b3a4]/60", style: { width: `${c}%` } }),
          /* @__PURE__ */ s.jsx("div", { className: "h-full bg-[#f0426c]/60 flex-1" }),
          /* @__PURE__ */ s.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ s.jsx("div", { className: "h-1 bg-[#e8e8e8] rounded-full", style: { width: `${l}%` } }) })
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "w-12 text-right font-mono text-[10px] text-[#b9b9b9]", children: e.volume.toFixed(1) }),
        e.is_poc && /* @__PURE__ */ s.jsx("span", { className: "text-[9px] px-1 py-0.5 rounded bg-[#f59e0b] text-black font-bold", children: "POC" }),
        e.is_vah && /* @__PURE__ */ s.jsx("span", { className: "text-[9px] px-1 py-0.5 rounded bg-[#21b3a4]/20 border border-[#21b3a4]/30 text-[#21b3a4]", children: "VAH" }),
        e.is_val && /* @__PURE__ */ s.jsx("span", { className: "text-[9px] px-1 py-0.5 rounded bg-[#f0426c]/20 border border-[#f0426c]/30 text-[#f0426c]", children: "VAL" })
      ] }, a);
    }) })
  ] });
}
export {
  v as EdgeDepthVolumeProfilePanel,
  v as default
};
