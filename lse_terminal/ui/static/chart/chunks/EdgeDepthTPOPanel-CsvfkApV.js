import { r as i, j as e } from "./react-vendor-C0yw3i6b.js";
function u({ symbol: o, provider: c = "binance" }) {
  const [p, x] = i.useState([]);
  return i.useEffect(() => {
    let t = !0;
    const n = async () => {
      try {
        const l = await fetch(`/api/orderflow/tpo?symbol=${encodeURIComponent(o)}&provider=${encodeURIComponent(c)}`);
        if (l.ok) {
          const s = await l.json();
          if (t && s.blocks) {
            x(s.blocks);
            return;
          }
        }
      } catch {
      }
      if (!t) return;
      const r = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", b = 5e4, f = Array.from({ length: 12 }, (l, s) => ({
        time: `${String(8 + s).padStart(2, "0")}:00`,
        letter: r[s % r.length],
        levels: Array.from({ length: 20 }, (m, d) => ({
          price: b + (10 - d) * 5 + Math.random() * 2,
          letter: r[s % r.length],
          count: Math.floor(Math.random() * 3) + (Math.abs(d - 10) < 3 ? 2 : 0),
          is_poc: d === 10 && s === 6
        }))
      }));
      x(f);
    };
    n();
    const a = setInterval(n, 3e3);
    return () => {
      t = !1, clearInterval(a);
    };
  }, [o, c]), /* @__PURE__ */ e.jsxs("div", { className: "h-full flex flex-col bg-[#1c1c1c] text-[#e8e8e8]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0", children: [
      /* @__PURE__ */ e.jsx("span", { className: "text-[11px] font-semibold tracking-wider", children: "TPO" }),
      /* @__PURE__ */ e.jsx("span", { className: "font-mono text-[13px] font-medium", children: o }),
      /* @__PURE__ */ e.jsx("span", { className: "px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9]", children: c?.toUpperCase() }),
      /* @__PURE__ */ e.jsx("span", { className: "ml-auto text-[10px] text-[#6a6a6a]", children: "30m blocks • TPO count" })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "flex-1 overflow-auto flex gap-1.5 p-2 bg-[#121212]", children: p.map((t, n) => /* @__PURE__ */ e.jsxs("div", { className: "min-w-[80px] rounded-lg border border-[#2a2a2a] bg-[#1c1c1c] overflow-hidden flex flex-col", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "px-2 py-1 bg-[#262626] border-b border-[#2a2a2a] flex items-center gap-1.5", children: [
        /* @__PURE__ */ e.jsx("span", { className: "w-5 h-5 rounded bg-[#e8e8e8] text-[#1c1c1c] text-[10px] font-bold flex items-center justify-center", children: t.letter }),
        /* @__PURE__ */ e.jsx("span", { className: "text-[10px] text-[#b9b9b9]", children: t.time })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "flex-1 p-1 space-y-0.5", children: (t.levels || []).map((a, r) => /* @__PURE__ */ e.jsxs("div", { className: `px-1.5 py-0.5 rounded text-[10px] font-mono flex justify-between ${a.is_poc ? "bg-[#f59e0b]/20 border border-[#f59e0b]/30 text-[#f59e0b]" : "bg-[#262626]/50 text-[#b9b9b9]"}`, children: [
        /* @__PURE__ */ e.jsx("span", { children: a.price.toFixed(1) }),
        /* @__PURE__ */ e.jsx("span", { className: "font-bold", children: a.letter.repeat(a.count) })
      ] }, r)) })
    ] }, n)) })
  ] });
}
export {
  u as EdgeDepthTPOPanel,
  u as default
};
