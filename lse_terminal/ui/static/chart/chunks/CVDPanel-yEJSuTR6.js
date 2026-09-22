import { r as i, j as e } from "./react-vendor-C0yw3i6b.js";
function h({ symbol: l, provider: r = "binance" }) {
  const [o, d] = i.useState(null);
  i.useEffect(() => {
    let t = !0;
    const a = async () => {
      try {
        const c = await fetch(`/api/orderflow/cvd?symbol=${encodeURIComponent(l)}&provider=${encodeURIComponent(r)}`);
        if (!c.ok) return;
        const p = await c.json();
        t && d(p);
      } catch {
      }
    };
    a();
    const x = setInterval(a, 1e3);
    return () => {
      t = !1, clearInterval(x);
    };
  }, [l, r]);
  const s = o?.bars || [], n = s[s.length - 1];
  return s.length ? /* @__PURE__ */ e.jsxs("div", { className: "h-full bg-[#0b0e11] font-mono text-[11px] p-2", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mb-2 p-2 bg-white/5 rounded", children: [
      /* @__PURE__ */ e.jsxs("span", { children: [
        "CVD ",
        /* @__PURE__ */ e.jsx("span", { className: (n?.cvd || 0) >= 0 ? "text-emerald-400" : "text-rose-400", children: n?.cvd?.toFixed(2) })
      ] }),
      /* @__PURE__ */ e.jsxs("span", { children: [
        "Delta ",
        n?.delta?.toFixed(2)
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "space-y-0.5 max-h-[400px] overflow-auto", children: s.slice(-40).map((t, a) => /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between border-b border-white/5 py-0.5", children: [
      /* @__PURE__ */ e.jsx("span", { className: "opacity-50 text-[10px]", children: new Date(t.timestamp_ms || t.ts * 1e3).toLocaleTimeString() }),
      /* @__PURE__ */ e.jsx("span", { className: t.delta >= 0 ? "text-emerald-400" : "text-rose-400", children: t.delta?.toFixed(2) }),
      /* @__PURE__ */ e.jsx("span", { children: t.cvd?.toFixed(2) })
    ] }, a)) })
  ] }) : /* @__PURE__ */ e.jsx("div", { className: "p-2 text-xs opacity-60", children: "CVD waiting..." });
}
export {
  h as default
};
