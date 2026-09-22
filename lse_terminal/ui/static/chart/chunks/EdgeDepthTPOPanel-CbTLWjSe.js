import { r as p, j as e } from "./react-vendor-C0yw3i6b.js";
function f({ symbol: n, provider: c = "binance" }) {
  const [o, x] = p.useState(null);
  p.useEffect(() => {
    let t = !0;
    const a = async () => {
      try {
        const s = await fetch(`/api/orderflow/tpo?symbol=${encodeURIComponent(n)}&provider=${encodeURIComponent(c)}`);
        if (!s.ok) return;
        const d = await s.json();
        t && x(d);
      } catch {
      }
    };
    a();
    const r = setInterval(a, 3e3);
    return () => {
      t = !1, clearInterval(r);
    };
  }, [n, c]);
  const l = o?.blocks || o?.levels || [], i = l.length ? l : Array.from({ length: 20 }, (t, a) => ({
    price: 5e4 + (10 - a) * 5,
    tpos: Array.from({ length: 8 }, (r, s) => String.fromCharCode(65 + s)),
    count: Math.floor(Math.random() * 8) + 1,
    is_poc: a === 10
  }));
  return /* @__PURE__ */ e.jsxs("div", { className: "h-full flex flex-col bg-[#1c1c1c] border border-[#3a3a3a]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 px-2 py-1 bg-[#2a2a2a] border-b border-[#3a3a3a] text-[10px]", children: [
      /* @__PURE__ */ e.jsxs("span", { className: "font-bold tracking-wider text-[#e8e8e8]", children: [
        "TPO — ",
        n
      ] }),
      /* @__PURE__ */ e.jsxs("span", { className: "text-[#b9b9b9]", children: [
        "30m blocks • ",
        c.toUpperCase()
      ] }),
      /* @__PURE__ */ e.jsx("span", { className: "ml-auto text-[9px] text-[#b9b9b9]/60", children: "Time Price Opportunity — exact tpo_manager.cpp" })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "flex-1 overflow-auto p-2", children: /* @__PURE__ */ e.jsx("div", { className: "space-y-0.5", children: i.map((t, a) => /* @__PURE__ */ e.jsxs("div", { className: `flex items-center gap-2 px-2 py-1 text-[10px] font-mono border border-[#3a3a3a]/20 rounded-[1px] ${t.is_poc ? "bg-[#f0b350]/20 ring-1 ring-[#f0b350]/40" : "bg-[#262626]/50"}`, children: [
      /* @__PURE__ */ e.jsx("span", { className: "w-16 tabular-nums text-[#e8e8e8]", children: Number(t.price).toFixed(1) }),
      /* @__PURE__ */ e.jsx("div", { className: "flex gap-0.5", children: (t.tpos || []).map((r, s) => /* @__PURE__ */ e.jsx("span", { className: "w-4 h-4 flex items-center justify-center bg-[#3a3a3a] text-[#e8e8e8] text-[8px] rounded-[1px]", children: r }, s)) }),
      /* @__PURE__ */ e.jsxs("span", { className: "ml-auto text-[#b9b9b9]", children: [
        t.count || (t.tpos || []).length,
        " TPOs"
      ] }),
      t.is_poc && /* @__PURE__ */ e.jsx("span", { className: "text-[8px] bg-[#f0b350] text-black px-1 rounded", children: "POC" })
    ] }, a)) }) })
  ] });
}
export {
  f as EdgeDepthTPOPanel,
  f as default
};
