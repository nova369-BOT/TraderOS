import { r as x, j as e } from "./react-vendor-C0yw3i6b.js";
function b({ symbol: i, provider: l = "binance" }) {
  const [m, u] = x.useState(null);
  x.useEffect(() => {
    let t = !0;
    const n = async () => {
      try {
        const r = await fetch(`/api/orderflow/footprint?symbol=${encodeURIComponent(i)}&provider=${encodeURIComponent(l)}`);
        if (!r.ok) return;
        const a = await r.json();
        t && u(a);
      } catch {
      }
    };
    n();
    const s = setInterval(n, 1500);
    return () => {
      t = !1, clearInterval(s);
    };
  }, [i, l]);
  const c = m?.columns || [];
  return c.length ? /* @__PURE__ */ e.jsx("div", { className: "h-full overflow-auto bg-[#0b0e11] text-[10px] font-mono flex gap-1 p-1", children: c.slice(-10).map((t, n) => /* @__PURE__ */ e.jsxs("div", { className: "border border-white/10 min-w-[70px]", children: [
    /* @__PURE__ */ e.jsx("div", { className: "text-[8px] bg-white/5 px-1", children: new Date(t.timestamp_ms || t.ts * 1e3).toLocaleTimeString() }),
    (t.levels || []).slice(0, 25).map((s, r) => {
      const a = s.buy || 0, o = s.sell || 0, d = a - o, p = a > o * 1.8 ? "buy" : o > a * 1.8 ? "sell" : "";
      return /* @__PURE__ */ e.jsxs("div", { className: `flex justify-between px-1 ${p === "buy" ? "bg-emerald-500/20" : p === "sell" ? "bg-rose-500/20" : ""} ${s.is_poc ? "ring-1 ring-amber-400/40" : ""}`, children: [
        /* @__PURE__ */ e.jsx("span", { children: Number(s.price).toFixed(1) }),
        /* @__PURE__ */ e.jsx("span", { className: d > 0 ? "text-emerald-400" : "text-rose-400", children: d.toFixed(1) })
      ] }, r);
    })
  ] }, n)) }) : /* @__PURE__ */ e.jsx("div", { className: "p-2 text-xs opacity-60", children: "Footprint waiting for trades..." });
}
export {
  b as default
};
