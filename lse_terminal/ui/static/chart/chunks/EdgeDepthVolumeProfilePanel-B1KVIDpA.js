import { r as p, j as s } from "./react-vendor-C0yw3i6b.js";
function w({ symbol: f, provider: i = "binance" }) {
  const [c, v] = p.useState([]), u = p.useRef(5e4), b = p.useMemo(() => i === "hyperliquid" ? 15 : i === "binance" ? 20 : 50, [i]), g = p.useCallback((e) => Array.from({ length: 40 }, (r, o) => {
    const n = e + (20 - o) * 10 + (Math.random() - 0.5) * 2, a = Math.exp(-Math.pow(o - 20, 2) / 80) * 100 + Math.random() * 10 + (Math.abs(o - 20) < 5 ? 20 : 0), d = 0.4 + Math.random() * 0.2 + (o < 20 ? 0.1 : -0.1);
    return {
      price: n,
      volume: a,
      buy: a * d,
      sell: a * (1 - d),
      is_poc: o === 20,
      is_vah: o === 12,
      is_val: o === 28
    };
  }), []);
  p.useEffect(() => {
    let e = !0;
    const r = async () => {
      try {
        const n = await fetch(`/api/orderflow/vpvr?symbol=${encodeURIComponent(f)}&provider=${encodeURIComponent(i)}`);
        if (n.ok) {
          const a = await n.json();
          if (e && a.levels) {
            v(a.levels);
            const d = a.levels.find((m) => m.is_poc);
            d && (u.current = d.price);
            return;
          }
        }
      } catch {
      }
      if (e) {
        try {
          const n = await fetch(`/api/orderflow/quote?symbol=${encodeURIComponent(f)}&provider=${encodeURIComponent(i)}`);
          if (n.ok) {
            const a = await n.json();
            u.current = a.mid || a.last || u.current;
          }
        } catch {
        }
        v(g(u.current));
      }
    };
    r();
    const o = setInterval(r, b * 20);
    return () => {
      e = !1, clearInterval(o);
    };
  }, [f, i, b, g]);
  const l = p.useMemo(() => {
    const e = Math.max(...c.map((t) => t.volume || 0), 1), r = c.reduce((t, h) => t + h.volume, 0), o = c.find((t) => t.is_poc), n = c.find((t) => t.is_vah), a = c.find((t) => t.is_val), d = [...c].sort((t, h) => h.volume - t.volume);
    let m = 0;
    const x = [];
    for (const t of d)
      if (m += t.volume, x.push(t), m >= r * 0.7) break;
    const j = x.length ? Math.max(...x.map((t) => t.price)) : n?.price || 0, N = x.length ? Math.min(...x.map((t) => t.price)) : a?.price || 0;
    return { maxVol: e, totalVol: r, poc: o, vah: n, val: a, vaHigh: j, vaLow: N, valueAreaCount: x.length };
  }, [c]);
  return /* @__PURE__ */ s.jsxs("div", { className: "h-full flex flex-col bg-[#1c1c1c] text-[#e8e8e8]", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0", children: [
      /* @__PURE__ */ s.jsx("span", { className: "text-[11px] font-semibold tracking-wider font-sans", children: "VPVR" }),
      /* @__PURE__ */ s.jsx("span", { className: "font-mono text-[13px] font-medium", children: f }),
      /* @__PURE__ */ s.jsxs("span", { className: "px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9] font-sans", children: [
        i?.toUpperCase(),
        " ",
        b,
        "ms ",
        i === "hyperliquid" ? "⚡" : ""
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "hidden lg:flex items-center gap-1.5 ml-3", children: [
        l.poc && /* @__PURE__ */ s.jsxs("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#f59e0b] font-sans", children: [
          "POC ",
          l.poc.price.toFixed(1)
        ] }),
        l.vah && /* @__PURE__ */ s.jsxs("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-[#21b3a4]/10 border border-[#21b3a4]/20 text-[#21b3a4] font-sans", children: [
          "VAH ",
          l.vah.price.toFixed(1)
        ] }),
        l.val && /* @__PURE__ */ s.jsxs("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-[#f0426c]/10 border border-[#f0426c]/20 text-[#f0426c] font-sans", children: [
          "VAL ",
          l.val.price.toFixed(1)
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("span", { className: "ml-auto text-[10px] text-[#6a6a6a] font-sans", children: [
        c.length,
        " levels • ",
        l.totalVol.toFixed(0),
        " vol • 70% VA ",
        l.valueAreaCount,
        " rows"
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "flex-1 overflow-auto p-2 space-y-0.5 scrollbar-thin bg-[#121212]", children: c.map((e, r) => {
      const o = e.volume / l.maxVol * 100, n = e.volume ? e.buy / e.volume * 100 : 50, a = e.price <= l.vaHigh && e.price >= l.vaLow;
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: `relative flex items-center gap-2 px-2 py-1 rounded-md border transition-colors ${e.is_poc ? "border-[#f59e0b]/40 bg-[#f59e0b]/10" : e.is_vah || e.is_val ? "border-[#6366f1]/20 bg-[#6366f1]/5" : a ? "border-[#2a2a2a] bg-[#1c1c1c]" : "border-transparent hover:bg-[#262626] bg-[#1c1c1c]/50"}`,
          children: [
            /* @__PURE__ */ s.jsx("span", { className: "w-16 font-mono text-[11px] tabular-nums", children: e.price.toFixed(1) }),
            /* @__PURE__ */ s.jsxs("div", { className: "flex-1 h-4 rounded bg-[#262626] overflow-hidden flex relative", children: [
              /* @__PURE__ */ s.jsx("div", { className: "h-full bg-[#21b3a4]/70", style: { width: `${n}%` } }),
              /* @__PURE__ */ s.jsx("div", { className: "h-full bg-[#f0426c]/60 flex-1" }),
              /* @__PURE__ */ s.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ s.jsx("div", { className: `h-1 rounded-full ${e.is_poc ? "bg-[#f59e0b] h-1.5" : "bg-[#e8e8e8]"}`, style: { width: `${o}%` } }) }),
              a && /* @__PURE__ */ s.jsx("div", { className: "absolute inset-0 border border-[#6366f1]/20 rounded pointer-events-none" })
            ] }),
            /* @__PURE__ */ s.jsx("span", { className: "w-12 text-right font-mono text-[10px] text-[#b9b9b9]", children: e.volume.toFixed(1) }),
            /* @__PURE__ */ s.jsxs("span", { className: "w-10 text-right font-mono text-[10px] text-[#6a6a6a]", children: [
              n.toFixed(0),
              "%"
            ] }),
            e.is_poc && /* @__PURE__ */ s.jsx("span", { className: "text-[9px] px-1.5 py-0.5 rounded bg-[#f59e0b] text-black font-bold font-sans", children: "POC" }),
            e.is_vah && /* @__PURE__ */ s.jsx("span", { className: "text-[9px] px-1.5 py-0.5 rounded bg-[#21b3a4]/20 border border-[#21b3a4]/30 text-[#21b3a4] font-sans", children: "VAH" }),
            e.is_val && /* @__PURE__ */ s.jsx("span", { className: "text-[9px] px-1.5 py-0.5 rounded bg-[#f0426c]/20 border border-[#f0426c]/30 text-[#f0426c] font-sans", children: "VAL" })
          ]
        },
        r
      );
    }) }),
    /* @__PURE__ */ s.jsxs("div", { className: "px-3 py-1.5 text-[10px] text-[#6a6a6a] border-t border-[#2a2a2a] bg-[#1c1c1c] shrink-0 font-sans flex justify-between", children: [
      /* @__PURE__ */ s.jsxs("span", { children: [
        "POC = max volume • VAH/VAL = 70% value area • Buy ",
        c.reduce((e, r) => e + r.buy, 0).toFixed(0),
        " Sell ",
        c.reduce((e, r) => e + r.sell, 0).toFixed(0),
        " • Width = volume / maxVol"
      ] }),
      /* @__PURE__ */ s.jsxs("span", { children: [
        i.toUpperCase(),
        " ",
        b,
        "ms • No blank • SoA"
      ] })
    ] })
  ] });
}
export {
  w as EdgeDepthVolumeProfilePanel,
  w as default
};
