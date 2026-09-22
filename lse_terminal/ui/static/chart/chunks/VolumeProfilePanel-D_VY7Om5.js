import { r as n, j as t } from "./react-vendor-C0yw3i6b.js";
function f({ symbol: c, provider: r = "binance" }) {
  const [o, p] = n.useState([]), [u, x] = n.useState(null);
  if (n.useEffect(() => {
    let e = !0;
    const s = async () => {
      try {
        const i = await fetch(`/api/orderflow/volume_profile?symbol=${encodeURIComponent(c)}&provider=${encodeURIComponent(r)}`);
        if (!i.ok) return;
        const l = await i.json();
        e && (p(l.levels || []), x(l.poc || l.poc_price || null));
      } catch {
      }
    };
    s();
    const a = setInterval(s, 2e3);
    return () => {
      e = !1, clearInterval(a);
    };
  }, [c, r]), !o.length) return /* @__PURE__ */ t.jsx("div", { className: "p-2 text-xs opacity-60", children: "VPVR waiting..." });
  const m = Math.max(...o.map((e) => e.total || e.volume || 0), 1);
  return /* @__PURE__ */ t.jsx("div", { className: "h-full overflow-auto bg-[#0b0e11] font-mono text-[10px] p-1", children: o.map((e, s) => {
    const a = e.total || e.volume || 0;
    return /* @__PURE__ */ t.jsxs("div", { className: `flex items-center gap-1 ${e.is_poc ? "bg-amber-500/20" : ""}`, children: [
      /* @__PURE__ */ t.jsx("span", { className: "w-16 text-right", children: Number(e.price).toFixed(2) }),
      /* @__PURE__ */ t.jsx("div", { className: "flex-1 h-2 bg-white/5 relative", children: /* @__PURE__ */ t.jsx("div", { className: "absolute h-full bg-sky-500/50", style: { width: `${a / m * 100}%` } }) }),
      /* @__PURE__ */ t.jsx("span", { className: "w-10 text-right opacity-60", children: a.toFixed(1) }),
      e.is_poc && /* @__PURE__ */ t.jsx("span", { className: "text-[7px] bg-amber-400 text-black px-1 rounded", children: "POC" })
    ] }, s);
  }) });
}
export {
  f as default
};
