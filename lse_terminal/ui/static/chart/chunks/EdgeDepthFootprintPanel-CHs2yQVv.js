import { r as i, j as e } from "./react-vendor-C0yw3i6b.js";
function j({ symbol: d, provider: o = "binance" }) {
  const [b, f] = i.useState(null), [x, u] = i.useState("cluster");
  i.useEffect(() => {
    let t = !0;
    const r = async () => {
      try {
        const s = await fetch(`/api/orderflow/footprint?symbol=${encodeURIComponent(d)}&provider=${encodeURIComponent(o)}`);
        if (s.ok) {
          const a = await s.json();
          t && f(a);
          return;
        }
      } catch {
      }
    };
    r();
    const n = setInterval(r, 1500);
    return () => {
      t = !1, clearInterval(n);
    };
  }, [d, o]);
  const m = b?.columns || [], h = m.length ? m : Array.from({ length: 12 }, (t, r) => ({
    timestamp_ms: Date.now() - (12 - r) * 6e4,
    levels: Array.from({ length: 20 }, (n, s) => {
      const a = 5e4 + (10 - s) * 2 + r * 0.5, l = Math.random() * 50 + (s === 10 ? 100 : 0), c = Math.random() * 50;
      return { price: a, buy: l, sell: c, is_poc: s === 10, delta: l - c };
    })
  }));
  return /* @__PURE__ */ e.jsxs("div", { className: "h-full flex flex-col bg-[#1c1c1c] text-[#e8e8e8]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0", children: [
      /* @__PURE__ */ e.jsx("span", { className: "text-[11px] font-semibold tracking-wider", children: "FOOTPRINT" }),
      /* @__PURE__ */ e.jsx("span", { className: "font-mono text-[13px] font-medium", children: d }),
      /* @__PURE__ */ e.jsxs("span", { className: "px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9]", children: [
        o.toUpperCase(),
        " ",
        o === "hyperliquid" ? "⚡" : ""
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "ml-auto flex gap-1 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]", children: ["cluster", "profile"].map((t) => /* @__PURE__ */ e.jsx("button", { onClick: () => u(t), className: `px-3 py-1 rounded-md text-[11px] font-medium capitalize ${x === t ? "bg-[#e8e8e8] text-[#1c1c1c]" : "text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`, children: t }, t)) })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "flex-1 overflow-auto flex gap-2 p-2 bg-[#121212]", children: h.slice(-12).map((t, r) => /* @__PURE__ */ e.jsxs("div", { className: "min-w-[110px] rounded-lg border border-[#2a2a2a] bg-[#1c1c1c] overflow-hidden flex flex-col", children: [
      /* @__PURE__ */ e.jsx("div", { className: "px-2 py-1 bg-[#262626] border-b border-[#2a2a2a] text-[10px] text-[#b9b9b9]", children: new Date(t.timestamp_ms).toLocaleTimeString() }),
      /* @__PURE__ */ e.jsx("div", { className: "flex-1", children: (t.levels || []).slice(0, 24).map((n, s) => {
        const a = n.buy || 0, l = n.sell || 0, c = a - l, p = a > l * 1.8 ? "buy" : l > a * 1.8 ? "sell" : "";
        return /* @__PURE__ */ e.jsxs("div", { className: `flex justify-between items-center px-2 py-1 text-[11px] font-mono border-b border-[#2a2a2a]/30 ${p === "buy" ? "bg-[#21b3a4]/10" : p === "sell" ? "bg-[#f0426c]/10" : ""} ${n.is_poc ? "bg-[#f59e0b]/10 ring-1 ring-[#f59e0b]/20" : ""}`, children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-[#e8e8e8]", children: Number(n.price).toFixed(1) }),
          x === "cluster" ? /* @__PURE__ */ e.jsxs("span", { className: "flex gap-1.5", children: [
            /* @__PURE__ */ e.jsx("span", { className: "text-[#21b3a4]", children: a.toFixed(1) }),
            /* @__PURE__ */ e.jsx("span", { className: "text-[#f0426c]", children: l.toFixed(1) })
          ] }) : /* @__PURE__ */ e.jsxs("span", { className: `${c > 0 ? "text-[#21b3a4]" : "text-[#f0426c]"} font-medium`, children: [
            c > 0 ? "+" : "",
            c.toFixed(1)
          ] })
        ] }, s);
      }) })
    ] }, r)) })
  ] });
}
export {
  j as EdgeDepthFootprintPanel,
  j as default
};
