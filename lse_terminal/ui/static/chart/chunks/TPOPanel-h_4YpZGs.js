import { r, j as e } from "./react-vendor-C0yw3i6b.js";
function d({ symbol: i, provider: o = "binance" }) {
  const [c, l] = r.useState([]);
  return r.useEffect(() => {
    let s = !0;
    const a = async () => {
      try {
        const n = await fetch(`/api/orderflow/tpo?symbol=${encodeURIComponent(i)}&provider=${encodeURIComponent(o)}`);
        if (!n.ok) return;
        const p = await n.json();
        s && l(p.sessions || []);
      } catch {
      }
    };
    a();
    const t = setInterval(a, 5e3);
    return () => {
      s = !1, clearInterval(t);
    };
  }, [i, o]), c.length ? /* @__PURE__ */ e.jsx("div", { className: "h-full overflow-auto bg-[#0b0e11] font-mono text-[10px] p-1 space-y-2", children: c.slice(-2).map((s, a) => /* @__PURE__ */ e.jsxs("div", { className: "border border-white/10", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "bg-white/5 px-2 py-1 flex justify-between text-[9px]", children: [
      /* @__PURE__ */ e.jsx("span", { children: new Date(s.start_ms || s.start * 1e3).toLocaleDateString() }),
      /* @__PURE__ */ e.jsxs("span", { children: [
        "POC ",
        s.poc?.toFixed(2),
        " VAH ",
        s.vah?.toFixed(2),
        " VAL ",
        s.val?.toFixed(2)
      ] })
    ] }),
    (s.rows || []).slice(0, 25).map((t, n) => /* @__PURE__ */ e.jsxs("div", { className: "flex gap-1 px-1", children: [
      /* @__PURE__ */ e.jsx("span", { className: "w-14 text-right", children: Number(t.price).toFixed(2) }),
      /* @__PURE__ */ e.jsx("span", { className: "opacity-70", children: (t.blocks || t.tpos || "").toString().slice(0, 20) }),
      t.is_poc && /* @__PURE__ */ e.jsx("span", { className: "text-amber-400", children: "*" })
    ] }, n))
  ] }, a)) }) : /* @__PURE__ */ e.jsx("div", { className: "p-2 text-xs opacity-60", children: "TPO waiting for 30m candles..." });
}
export {
  d as default
};
