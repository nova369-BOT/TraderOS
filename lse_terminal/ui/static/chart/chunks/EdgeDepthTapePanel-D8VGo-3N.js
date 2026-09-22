import { r as o, j as s } from "./react-vendor-C0yw3i6b.js";
const m = 500;
function L({ symbol: p, provider: i = "binance" }) {
  const [n, h] = o.useState([]), [g, R] = o.useState("all"), j = o.useRef(null), [f, y] = o.useState(!0), x = o.useRef(5e4), u = o.useRef(0.5), U = o.useRef([]);
  o.useEffect(() => {
    U.current = n;
  }, [n]);
  const k = o.useMemo(() => i === "hyperliquid" ? 15 : i === "binance" ? 20 : 50, [i]), b = o.useCallback((e) => {
    const t = e.usd || e.price * e.size, a = u.current;
    let r = 0;
    return t > a * 10 * x.current ? r = 3 : t > a * 3 * x.current ? r = 2 : t > a * 1.5 * x.current && (r = 1), u.current = a * 0.97 + e.size * 0.03, {
      ...e,
      usd: t,
      qtyEma: a,
      whale: r,
      formatted: {
        price: e.price.toFixed(2),
        qty: e.size < 1 ? e.size.toFixed(4) : e.size.toFixed(3),
        usd: t >= 1e6 ? `$${(t / 1e6).toFixed(2)}M` : t >= 1e3 ? `$${(t / 1e3).toFixed(1)}k` : `$${t.toFixed(0)}`,
        time: new Date(e.ts * 1e3).toLocaleTimeString([], { hour12: !1 })
      }
    };
  }, []), N = o.useCallback(
    (e, t = 500) => {
      const a = [];
      let r = e;
      const d = Date.now() / 1e3;
      u.current = 0.5;
      for (let c = 0; c < t; c++) {
        r += (Math.random() - 0.5) * e * 5e-4;
        const l = Math.random() * 2 + 0.01, w = { price: r, size: l, side: Math.random() > 0.5 ? "BUY" : "SELL", ts: d - (t - c) * 0.5 };
        a.push(b(w));
      }
      return a;
    },
    [b]
  );
  o.useEffect(() => {
    let e = !0;
    (async () => {
      try {
        const r = await fetch(`/api/orderflow/tape?symbol=${encodeURIComponent(p)}&provider=${encodeURIComponent(i)}&limit=${m}`);
        if (!r.ok) throw new Error("no tape");
        const d = await r.json();
        if (!d.trades || d.trades.length === 0) throw new Error("empty");
        if (e) {
          u.current = 0.5;
          const c = d.trades.slice(-m).map((l) => b({ price: l.price, size: l.size || l.qty || 0, side: l.side, ts: l.ts || Date.now() / 1e3 }));
          h(c), c.length && (x.current = c[c.length - 1].price);
        }
      } catch {
        try {
          const r = await fetch(`/api/orderflow/quote?symbol=${encodeURIComponent(p)}&provider=${encodeURIComponent(i)}`);
          if (r.ok) {
            const d = await r.json(), c = d.mid || d.last || x.current;
            x.current = c, e && h(N(c, m));
            return;
          }
        } catch {
        }
        e && h(N(x.current || 5e4, m));
      }
    })();
    let a = null;
    try {
      const r = location.protocol === "https:" ? "wss" : "ws";
      a = new WebSocket(`${r}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(p)}&provider=${encodeURIComponent(i)}`), a.onmessage = (d) => {
        try {
          const c = JSON.parse(d.data);
          if (c.type === "trade") {
            const l = c.event, w = { price: l.price, size: l.size || l.qty || 0, side: l.side, ts: l.ts || Date.now() / 1e3 };
            x.current = w.price;
            const F = b(w);
            h((q) => [...q, F].slice(-m));
          }
        } catch {
        }
      };
    } catch {
    }
    return () => {
      e = !1;
      try {
        a?.close();
      } catch {
      }
    };
  }, [p, i, N, b]), o.useEffect(() => {
    f && j.current && (j.current.scrollTop = j.current.scrollHeight);
  }, [n, f]);
  const $ = o.useMemo(() => n.filter((t) => g === "buy" ? t.side === "BUY" || t.side === "B" : g === "sell" ? t.side === "SELL" || t.side === "S" : !0).slice(-200).reverse(), [n, g]), z = o.useMemo(() => n.length ? n.reduce((e, t) => e + (t.usd || t.price * t.size), 0) / n.length : 1e3, [n]), E = n.filter((e) => e.side === "BUY" || e.side === "B").length, C = n.length - E, v = n.filter((e) => e.side === "BUY" || e.side === "B").reduce((e, t) => e + t.size, 0), B = n.filter((e) => e.side === "SELL" || e.side === "S").reduce((e, t) => e + t.size, 0), S = v - B;
  return /* @__PURE__ */ s.jsxs("div", { className: "h-full flex flex-col bg-[#1c1c1c] text-[#e8e8e8] font-mono text-[12px] select-none", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0", children: [
      /* @__PURE__ */ s.jsx("span", { className: "text-[11px] font-semibold tracking-wider font-sans", children: "TAPE" }),
      /* @__PURE__ */ s.jsx("span", { className: "font-mono font-medium text-[13px]", children: p }),
      /* @__PURE__ */ s.jsxs("span", { className: "px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9] font-sans", children: [
        $.length,
        " / ",
        n.length,
        " prints"
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "flex items-center gap-0.5 ml-3 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]", children: ["all", "buy", "sell"].map((e) => /* @__PURE__ */ s.jsx(
        "button",
        {
          onClick: () => R(e),
          className: `px-2.5 py-1 rounded-md text-[11px] font-medium uppercase font-sans transition-colors ${g === e ? "bg-[#e8e8e8] text-[#1c1c1c] shadow-sm" : "text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
          children: e
        },
        e
      )) }),
      /* @__PURE__ */ s.jsxs("div", { className: "hidden lg:flex items-center gap-2 ml-3 text-[10px] font-sans", children: [
        /* @__PURE__ */ s.jsxs("span", { className: "px-2 py-0.5 rounded-full bg-[#21b3a4]/10 border border-[#21b3a4]/20 text-[#21b3a4]", children: [
          "B ",
          E
        ] }),
        /* @__PURE__ */ s.jsxs("span", { className: "px-2 py-0.5 rounded-full bg-[#f0426c]/10 border border-[#f0426c]/20 text-[#f0426c]", children: [
          "S ",
          C
        ] }),
        /* @__PURE__ */ s.jsxs("span", { className: `px-2 py-0.5 rounded-full border ${S >= 0 ? "bg-[#21b3a4]/10 border-[#21b3a4]/20 text-[#21b3a4]" : "bg-[#f0426c]/10 border-[#f0426c]/20 text-[#f0426c]"}`, children: [
          "Δ ",
          S >= 0 ? "+" : "",
          S.toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs(
        "button",
        {
          onClick: () => y((e) => !e),
          className: `ml-auto px-3 py-1 rounded-full border text-[11px] font-medium font-sans flex items-center gap-1.5 transition-colors ${f ? "bg-[#21b3a4]/10 border-[#21b3a4]/30 text-[#21b3a4]" : "bg-[#262626] border-[#3a3a3a] text-[#6a6a6a] hover:text-[#b9b9b9]"}`,
          children: [
            /* @__PURE__ */ s.jsx("span", { className: `w-1.5 h-1.5 rounded-full ${f ? "bg-[#21b3a4] animate-pulse" : "bg-[#6a6a6a]"}` }),
            " ",
            f ? "AUTO" : "FREE"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "grid grid-cols-[1.2fr_1fr_0.8fr] px-3 py-2 text-[10px] font-semibold tracking-wider text-[#6a6a6a] uppercase border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0 font-sans", children: [
      /* @__PURE__ */ s.jsx("span", { children: "Price • Side" }),
      /* @__PURE__ */ s.jsx("span", { className: "text-right", children: "Qty • USD" }),
      /* @__PURE__ */ s.jsx("span", { className: "text-right", children: "Time • Whale" })
    ] }),
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        ref: j,
        className: "flex-1 overflow-auto scrollbar-thin",
        onScroll: (e) => {
          const t = e.currentTarget, a = t.scrollHeight - t.scrollTop - t.clientHeight < 20;
          f && !a && y(!1), !f && a && y(!0);
        },
        children: [
          $.map((e, t) => {
            const a = e.side === "BUY" || e.side === "B", r = e.whale || 0;
            return /* @__PURE__ */ s.jsxs(
              "div",
              {
                className: `grid grid-cols-[1.2fr_1fr_0.8fr] px-3 py-1.5 border-b border-[#2a2a2a]/30 hover:bg-[#262626] text-[12px] transition-colors ${r === 3 ? "bg-[#f0426c]/10 font-semibold" : r === 2 ? "bg-[#f0426c]/5" : ""}`,
                children: [
                  /* @__PURE__ */ s.jsxs("span", { className: `tabular-nums font-medium flex items-center gap-1.5 ${a ? "text-[#21b3a4]" : "text-[#f0426c]"}`, children: [
                    /* @__PURE__ */ s.jsx("span", { className: `w-1 h-3 rounded-full ${a ? "bg-[#21b3a4]" : "bg-[#f0426c]"}` }),
                    e.formatted?.price || e.price.toFixed(2),
                    r >= 2 && /* @__PURE__ */ s.jsx("span", { className: "text-[10px]", children: "⚡" })
                  ] }),
                  /* @__PURE__ */ s.jsxs("span", { className: "text-right tabular-nums text-[#b9b9b9]", children: [
                    e.formatted?.qty || e.size.toFixed(3),
                    " ",
                    /* @__PURE__ */ s.jsx("span", { className: `text-[10px] ${r >= 1 ? "text-[#e8e8e8] font-medium" : "text-[#6a6a6a]"}`, children: e.formatted?.usd })
                  ] }),
                  /* @__PURE__ */ s.jsxs("span", { className: "text-right text-[#6a6a6a] text-[11px] flex items-center justify-end gap-1.5", children: [
                    e.formatted?.time,
                    r >= 1 && /* @__PURE__ */ s.jsx("span", { className: `px-1 py-0.5 rounded text-[9px] font-bold ${r === 3 ? "bg-[#f0426c] text-white" : r === 2 ? "bg-[#f0426c]/70 text-white" : "bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9]"}`, children: r === 3 ? "WHALE" : r === 2 ? "LARGE" : "BIG" })
                  ] })
                ]
              },
              `${e.ts}-${t}`
            );
          }),
          $.length === 0 && /* @__PURE__ */ s.jsxs("div", { className: "p-8 text-center text-[12px] text-[#6a6a6a] font-sans", children: [
            "No trades — waiting for ",
            i.toUpperCase(),
            " WS..."
          ] })
        ]
      }
    ),
    /* @__PURE__ */ s.jsxs("div", { className: "px-3 py-2 text-[10px] text-[#6a6a6a] border-t border-[#2a2a2a] bg-[#1c1c1c] shrink-0 flex items-center justify-between font-sans", children: [
      /* @__PURE__ */ s.jsxs("span", { children: [
        "Whale >1.5×/>3×/>10× ema • qty_ema ",
        u.current.toFixed(3),
        " • avg $",
        z.toFixed(0)
      ] }),
      /* @__PURE__ */ s.jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ s.jsxs("span", { className: "px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9]", children: [
          i.toUpperCase(),
          " ",
          k,
          "ms ",
          i === "hyperliquid" ? "⚡" : ""
        ] }),
        /* @__PURE__ */ s.jsxs("span", { children: [
          n.length,
          " total"
        ] })
      ] })
    ] })
  ] });
}
export {
  L as EdgeDepthTapePanel,
  L as default
};
