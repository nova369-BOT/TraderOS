import { r as c, j as s } from "./react-vendor-C0yw3i6b.js";
function x({ symbol: i, provider: o = "binance" }) {
  const [l, d] = c.useState([]);
  return c.useEffect(() => {
    let e = !0;
    const a = async () => {
      try {
        const t = await fetch(`/api/orderflow/tape?symbol=${encodeURIComponent(i)}&provider=${encodeURIComponent(o)}&limit=100`);
        if (!t.ok) return;
        const n = await t.json();
        e && d(n.trades || n.tape || []);
      } catch {
      }
    };
    a();
    const r = setInterval(a, 400);
    return () => {
      e = !1, clearInterval(r);
    };
  }, [i, o]), /* @__PURE__ */ s.jsxs("div", { className: "h-full overflow-auto font-mono text-[11px] bg-[#0b0e11]", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "grid grid-cols-4 px-1 py-0.5 text-[9px] opacity-60 sticky top-0 bg-[#0b0e11]", children: [
      /* @__PURE__ */ s.jsx("span", { children: "TIME" }),
      /* @__PURE__ */ s.jsx("span", { children: "PRICE" }),
      /* @__PURE__ */ s.jsx("span", { children: "SIZE" }),
      /* @__PURE__ */ s.jsx("span", { children: "SIDE" })
    ] }),
    l.map((e, a) => {
      const r = e.is_buy ?? e.side === "BUY", t = e.highlight || 0, n = t === 3 ? "bg-amber-500/30 font-bold" : t === 2 ? "bg-amber-500/15" : t === 1 ? "bg-white/10" : "";
      return /* @__PURE__ */ s.jsxs("div", { className: `grid grid-cols-4 px-1 py-0.5 border-b border-white/5 ${n}`, children: [
        /* @__PURE__ */ s.jsx("span", { className: "opacity-50", children: new Date(e.timestamp_ms || e.ts * 1e3).toLocaleTimeString() }),
        /* @__PURE__ */ s.jsx("span", { className: r ? "text-emerald-400" : "text-rose-400", children: Number(e.price).toFixed(2) }),
        /* @__PURE__ */ s.jsx("span", { children: Number(e.qty || e.size).toFixed(4) }),
        /* @__PURE__ */ s.jsx("span", { children: r ? "BUY" : "SELL" })
      ] }, a);
    })
  ] });
}
export {
  x as default
};
