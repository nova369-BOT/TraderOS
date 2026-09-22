import { r as c, j as e } from "./react-vendor-C0yw3i6b.js";
function u({ symbol: a, provider: d = "binance", grouping: o = 0.5 }) {
  const [t, n] = c.useState(null);
  if (c.useEffect(() => {
    let s = !0;
    const r = async () => {
      try {
        const i = await fetch(`/api/orderflow/dom?symbol=${encodeURIComponent(a)}&provider=${encodeURIComponent(d)}&grouping=${o}&mode=usd`);
        if (!i.ok) return;
        const m = await i.json();
        s && n(m);
      } catch {
      }
    };
    r();
    const p = setInterval(r, 500);
    return () => {
      s = !1, clearInterval(p);
    };
  }, [a, d, o]), !t) return /* @__PURE__ */ e.jsx("div", { className: "p-2 text-xs opacity-60", children: "DOM loading..." });
  const l = t.bids || [], x = t.asks || [];
  return /* @__PURE__ */ e.jsxs("div", { className: "h-full flex flex-col font-mono text-[11px] bg-[#0b0e11] text-[#d1d4dc]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "grid grid-cols-3 px-2 py-1 text-[9px] opacity-60 border-b border-border/20", children: [
      /* @__PURE__ */ e.jsx("span", { children: "PRICE" }),
      /* @__PURE__ */ e.jsx("span", { children: "SIZE" }),
      /* @__PURE__ */ e.jsx("span", { children: "TOTAL USD" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "flex-1 overflow-auto", children: [
      x.slice(0, 25).reverse().map((s, r) => /* @__PURE__ */ e.jsxs("div", { className: "grid grid-cols-3 px-2 py-0.5 text-rose-300/80 border-b border-border/10", children: [
        /* @__PURE__ */ e.jsx("span", { children: Number(s.price).toFixed(2) }),
        /* @__PURE__ */ e.jsx("span", { children: Number(s.qty || s.size).toFixed(4) }),
        /* @__PURE__ */ e.jsx("span", { className: "opacity-60", children: s.total_usd ? `$${(s.total_usd / 1e3).toFixed(1)}k` : "" })
      ] }, `a-${r}`)),
      /* @__PURE__ */ e.jsx("div", { className: "h-px bg-amber-400/50 my-1" }),
      l.slice(0, 25).map((s, r) => /* @__PURE__ */ e.jsxs("div", { className: "grid grid-cols-3 px-2 py-0.5 text-emerald-300/80 border-b border-border/10", children: [
        /* @__PURE__ */ e.jsx("span", { children: Number(s.price).toFixed(2) }),
        /* @__PURE__ */ e.jsx("span", { children: Number(s.qty || s.size).toFixed(4) }),
        /* @__PURE__ */ e.jsx("span", { className: "opacity-60", children: s.total_usd ? `$${(s.total_usd / 1e3).toFixed(1)}k` : "" })
      ] }, `b-${r}`))
    ] })
  ] });
}
export {
  u as default
};
