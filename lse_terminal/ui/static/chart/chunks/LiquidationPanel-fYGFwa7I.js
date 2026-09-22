import { r as c, j as e } from "./react-vendor-C0yw3i6b.js";
function f({ symbol: n, provider: l = "binance" }) {
  const [a, x] = c.useState(null);
  c.useEffect(() => {
    let s = !0;
    const t = async () => {
      try {
        const o = await fetch(`/api/orderflow/liquidations?symbol=${encodeURIComponent(n)}&provider=${encodeURIComponent(l)}`);
        if (!o.ok) return;
        const h = await o.json();
        s && x(h);
      } catch {
      }
    };
    t();
    const p = setInterval(t, 2e3);
    return () => {
      s = !1, clearInterval(p);
    };
  }, [n, l]);
  const i = a?.field || a || {}, r = i.bands || [], d = a?.levels || i.levels || [];
  return !r.length && !d.length ? /* @__PURE__ */ e.jsx("div", { className: "p-2 text-xs opacity-60", children: "Liquidation field building from candles..." }) : /* @__PURE__ */ e.jsxs("div", { className: "h-full overflow-auto bg-[#0b0e11] font-mono text-[10px] p-1", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "text-[9px] opacity-60 mb-2", children: [
      "Long Risk $",
      (i.total_long_risk || 0).toFixed(0),
      " Short $",
      (i.total_short_risk || 0).toFixed(0),
      " Bias ",
      (i.net_bias || 0).toFixed(2)
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("div", { className: "text-[9px] opacity-60 mb-1", children: "Modelled 800 bands 0.05%" }),
        r.slice(0, 30).map((s, t) => /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between border-b border-white/5 py-0.5", children: [
          /* @__PURE__ */ e.jsx("span", { children: Number(s.price).toFixed(2) }),
          /* @__PURE__ */ e.jsx("span", { className: s.side === "long" ? "text-emerald-400" : "text-rose-400", children: s.side }),
          /* @__PURE__ */ e.jsxs("span", { children: [
            (s.reach_prob * 100).toFixed(0),
            "%"
          ] })
        ] }, t))
      ] }),
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("div", { className: "text-[9px] opacity-60 mb-1", children: "Real forceOrder" }),
        d.slice(0, 30).map((s, t) => /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between border-b border-white/5 py-0.5", children: [
          /* @__PURE__ */ e.jsx("span", { children: Number(s.price).toFixed(2) }),
          /* @__PURE__ */ e.jsx("span", { children: s.side }),
          /* @__PURE__ */ e.jsxs("span", { children: [
            "$",
            (s.notional_usd || 0).toFixed(0)
          ] })
        ] }, t))
      ] })
    ] })
  ] });
}
export {
  f as default
};
