import { r as b, j as e } from "./react-vendor-C0yw3i6b.js";
function N({ symbol: x, provider: o = "binance" }) {
  const [u, f] = b.useState(null), [i, h] = b.useState("cluster");
  b.useEffect(() => {
    let a = !0;
    const n = async () => {
      try {
        const t = await fetch(`/api/orderflow/footprint?symbol=${encodeURIComponent(x)}&provider=${encodeURIComponent(o)}`);
        if (!t.ok) return;
        const r = await t.json();
        a && f(r);
      } catch {
      }
    };
    n();
    const s = setInterval(n, 1500);
    return () => {
      a = !1, clearInterval(s);
    };
  }, [x, o]);
  const d = u?.columns || [], g = d.length ? d : Array.from({ length: 12 }, (a, n) => ({
    timestamp_ms: Date.now() - (12 - n) * 6e4,
    levels: Array.from({ length: 20 }, (s, t) => {
      const r = 5e4 + (10 - t) * 2 + n * 0.5, l = Math.random() * 50 + (t === 10 ? 100 : 0), c = Math.random() * 50;
      return { price: r, buy: l, sell: c, is_poc: t === 10, delta: l - c };
    })
  }));
  return /* @__PURE__ */ e.jsxs("div", { className: "h-full flex flex-col bg-[#1c1c1c] border border-[#3a3a3a]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-1 px-2 py-1 bg-[#2a2a2a] border-b border-[#3a3a3a] text-[10px]", children: [
      /* @__PURE__ */ e.jsxs("span", { className: "font-bold tracking-wider text-[#e8e8e8]", children: [
        "FOOTPRINT — ",
        x
      ] }),
      /* @__PURE__ */ e.jsxs("span", { className: "text-[#b9b9b9]", children: [
        o.toUpperCase(),
        " ",
        o === "hyperliquid" ? "⚡15ms" : o === "binance" ? "20ms" : "50ms"
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "ml-auto flex gap-1", children: ["cluster", "profile"].map((a) => /* @__PURE__ */ e.jsx("button", { onClick: () => h(a), className: `px-2 py-0.5 rounded border text-[9px] capitalize ${i === a ? "bg-[#e8e8e8] text-black border-[#e8e8e8]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9]"}`, children: a }, a)) })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "flex-1 overflow-auto flex gap-1 p-1 bg-[#0b0e11]", children: g.slice(-12).map((a, n) => /* @__PURE__ */ e.jsxs("div", { className: "min-w-[90px] border border-[#3a3a3a]/30 bg-[#1c1c1c] flex flex-col", children: [
      /* @__PURE__ */ e.jsx("div", { className: "text-[8px] bg-[#2a2a2a] px-1 py-0.5 text-[#b9b9b9] border-b border-[#3a3a3a]/30", children: new Date(a.timestamp_ms).toLocaleTimeString() }),
      /* @__PURE__ */ e.jsx("div", { className: "flex-1", children: (a.levels || []).slice(0, 24).map((s, t) => {
        const r = s.buy || 0, l = s.sell || 0, c = r - l, p = r > l * 1.8 ? "buy" : l > r * 1.8 ? "sell" : "", m = r + l > 100;
        return /* @__PURE__ */ e.jsxs("div", { className: `flex justify-between px-1 py-0.5 text-[9px] font-mono border-b border-[#3a3a3a]/10 ${p === "buy" ? "bg-[#21b3a4]/20" : p === "sell" ? "bg-[#f0426c]/20" : ""} ${s.is_poc ? "ring-1 ring-[#f0b350]/50 bg-[#f0b350]/10" : ""} ${m ? "ring-1 ring-[#e8e8e8]/20" : ""}`, children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-[#e8e8e8]", children: Number(s.price).toFixed(1) }),
          i === "cluster" ? /* @__PURE__ */ e.jsxs("span", { className: "flex gap-1", children: [
            /* @__PURE__ */ e.jsx("span", { className: "text-[#21b3a4]", children: r.toFixed(1) }),
            /* @__PURE__ */ e.jsx("span", { className: "text-[#f0426c]", children: l.toFixed(1) })
          ] }) : /* @__PURE__ */ e.jsxs("span", { className: `${c > 0 ? "text-[#21b3a4]" : "text-[#f0426c]"}`, children: [
            c > 0 ? "+" : "",
            c.toFixed(1)
          ] }),
          m && /* @__PURE__ */ e.jsx("span", { className: "text-[7px] bg-[#e8e8e8] text-black px-0.5 rounded ml-1", children: "●" })
        ] }, t);
      }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "text-[7px] px-1 py-0.5 bg-[#2a2a2a]/50 text-[#b9b9b9]/60 border-t border-[#3a3a3a]/20", children: [
        "Δ ",
        (a.levels || []).reduce((s, t) => s + ((t.buy || 0) - (t.sell || 0)), 0).toFixed(1)
      ] })
    ] }, n)) }),
    /* @__PURE__ */ e.jsxs("div", { className: "px-2 py-1 text-[8px] text-[#b9b9b9]/50 border-t border-[#3a3a3a] bg-[#262626]", children: [
      "Footprint ",
      i,
      " — bid/ask volume per price, delta, imbalance 1.8x, POC amber, whale bubble ● large prints, exact footprint_manager.cpp"
    ] })
  ] });
}
export {
  N as EdgeDepthFootprintPanel,
  N as default
};
