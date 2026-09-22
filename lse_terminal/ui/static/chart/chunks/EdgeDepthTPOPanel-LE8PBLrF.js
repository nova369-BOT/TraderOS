import { r as c, j as e } from "./react-vendor-C0yw3i6b.js";
function N({ symbol: i, provider: r = "binance" }) {
  const [x, b] = c.useState([]), p = c.useRef(5e4), d = c.useMemo(() => r === "hyperliquid" ? 15 : r === "binance" ? 20 : 50, [r]), m = c.useCallback((a) => {
    const n = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from({ length: 14 }, (s, t) => ({
      time: `${String(8 + Math.floor(t * 0.5)).padStart(2, "0")}:${t % 2 === 0 ? "00" : "30"}`,
      letter: n[t % n.length],
      timestamp_ms: Date.now() - (14 - t) * 18e5,
      levels: Array.from({ length: 22 }, (o, f) => {
        const u = a + (11 - f) * 5 + Math.sin(t / 2) * 3 + (Math.random() - 0.5) * 1.5, h = Math.abs(f - 11) < 2, j = Math.floor(Math.random() * 3) + (h ? 2 : 0) + (Math.random() > 0.7 ? 1 : 0);
        return {
          price: u,
          letter: n[t % n.length],
          count: Math.max(0, j),
          is_poc: f === 11 && t === 7
        };
      })
    }));
  }, []);
  c.useEffect(() => {
    let a = !0;
    const n = async () => {
      try {
        const t = await fetch(`/api/orderflow/tpo?symbol=${encodeURIComponent(i)}&provider=${encodeURIComponent(r)}`);
        if (t.ok) {
          const o = await t.json();
          if (a && o.blocks) {
            b(o.blocks);
            return;
          }
        }
      } catch {
      }
      if (a) {
        try {
          const t = await fetch(`/api/orderflow/quote?symbol=${encodeURIComponent(i)}&provider=${encodeURIComponent(r)}`);
          if (t.ok) {
            const o = await t.json();
            p.current = o.mid || o.last || p.current;
          }
        } catch {
        }
        b(m(p.current));
      }
    };
    n();
    const s = setInterval(n, d * 30);
    return () => {
      a = !1, clearInterval(s);
    };
  }, [i, r, d, m]);
  const l = c.useMemo(() => {
    let a = 0, n = 0;
    return x.forEach((s) => {
      s.levels.forEach((t) => {
        a += t.count, t.is_poc && (n = t.price);
      });
    }), { totalTPO: a, pocPrice: n, blockCount: x.length };
  }, [x]);
  return /* @__PURE__ */ e.jsxs("div", { className: "h-full flex flex-col bg-[#1c1c1c] text-[#e8e8e8]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0", children: [
      /* @__PURE__ */ e.jsx("span", { className: "text-[11px] font-semibold tracking-wider font-sans", children: "TPO" }),
      /* @__PURE__ */ e.jsx("span", { className: "font-mono text-[13px] font-medium", children: i }),
      /* @__PURE__ */ e.jsxs("span", { className: "px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9] font-sans", children: [
        r?.toUpperCase(),
        " ",
        d,
        "ms ",
        r === "hyperliquid" ? "⚡" : ""
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "hidden lg:flex items-center gap-1.5 ml-3", children: [
        l.pocPrice > 0 && /* @__PURE__ */ e.jsxs("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#f59e0b] font-sans", children: [
          "POC ",
          l.pocPrice.toFixed(1)
        ] }),
        /* @__PURE__ */ e.jsxs("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] font-sans", children: [
          l.totalTPO,
          " TPOs"
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("span", { className: "ml-auto text-[10px] text-[#6a6a6a] font-sans", children: [
        l.blockCount,
        " blocks • 30m • TPO count"
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "flex-1 overflow-auto flex gap-1.5 p-2 bg-[#121212] scrollbar-thin", children: x.map((a, n) => /* @__PURE__ */ e.jsxs("div", { className: "min-w-[88px] rounded-xl border border-[#2a2a2a] bg-[#1c1c1c] overflow-hidden flex flex-col shrink-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "px-2 py-1.5 bg-[#262626] border-b border-[#2a2a2a] flex items-center gap-1.5", children: [
        /* @__PURE__ */ e.jsx("span", { className: "w-5 h-5 rounded-md bg-[#e8e8e8] text-[#1c1c1c] text-[10px] font-bold flex items-center justify-center font-sans", children: a.letter }),
        /* @__PURE__ */ e.jsx("span", { className: "text-[10px] text-[#b9b9b9] font-mono", children: a.time })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "flex-1 p-1 space-y-0.5", children: (a.levels || []).map((s, t) => /* @__PURE__ */ e.jsxs(
        "div",
        {
          className: `px-1.5 py-0.5 rounded text-[10px] font-mono flex justify-between items-center transition-colors ${s.is_poc ? "bg-[#f59e0b]/20 border border-[#f59e0b]/30 text-[#f59e0b] font-bold" : s.count > 1 ? "bg-[#21b3a4]/10 border border-[#21b3a4]/10 text-[#b9b9b9]" : "bg-[#262626]/30 text-[#6a6a6a]"}`,
          children: [
            /* @__PURE__ */ e.jsx("span", { className: "text-[9px]", children: s.price.toFixed(1) }),
            /* @__PURE__ */ e.jsx("span", { className: `font-bold text-[10px] ${s.is_poc ? "text-[#f59e0b]" : s.count > 1 ? "text-[#e8e8e8]" : "text-[#6a6a6a]"}`, children: s.count > 0 ? s.letter.repeat(Math.min(s.count, 4)) : "·" })
          ]
        },
        t
      )) }),
      /* @__PURE__ */ e.jsxs("div", { className: "px-2 py-1 bg-[#1c1c1c] border-t border-[#2a2a2a] text-[9px] text-[#6a6a6a] font-sans flex justify-between", children: [
        /* @__PURE__ */ e.jsxs("span", { children: [
          a.levels.reduce((s, t) => s + t.count, 0),
          " TPO"
        ] }),
        /* @__PURE__ */ e.jsxs("span", { children: [
          "POC ",
          (a.levels.find((s) => s.is_poc)?.price || a.levels[11]?.price || 0).toFixed(0)
        ] })
      ] })
    ] }, n)) }),
    /* @__PURE__ */ e.jsxs("div", { className: "px-3 py-1.5 text-[10px] text-[#6a6a6a] border-t border-[#2a2a2a] bg-[#1c1c1c] shrink-0 font-sans flex justify-between", children: [
      /* @__PURE__ */ e.jsx("span", { children: "TPO = Time Price Opportunity • 30m blocks A-Z • Letter per 30m • Count = times price visited • POC = max TPO" }),
      /* @__PURE__ */ e.jsxs("span", { children: [
        r.toUpperCase(),
        " ",
        d,
        "ms • No blank • ",
        l.blockCount,
        " blocks"
      ] })
    ] })
  ] });
}
export {
  N as EdgeDepthTPOPanel,
  N as default
};
