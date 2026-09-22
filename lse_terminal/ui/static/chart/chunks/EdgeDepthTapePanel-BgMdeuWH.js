import { r as i, j as s } from "./react-vendor-C0yw3i6b.js";
function $({ symbol: p, provider: l = "binance" }) {
  const [x, m] = i.useState([]), [f, N] = i.useState("all"), h = i.useRef(null), [d, g] = i.useState(!0), u = i.useRef(5e4), j = i.useCallback((e, r = 500) => {
    const n = [];
    let a = e;
    const o = Date.now() / 1e3;
    for (let c = 0; c < r; c++) {
      a += (Math.random() - 0.5) * e * 5e-4;
      const t = Math.random() * 2 + 0.01;
      n.push({ price: a, size: t, side: Math.random() > 0.5 ? "BUY" : "SELL", ts: o - (r - c) * 0.5, usd: a * t });
    }
    return n;
  }, []);
  i.useEffect(() => {
    let e = !0;
    (async () => {
      try {
        const a = await fetch(`/api/orderflow/tape?symbol=${encodeURIComponent(p)}&provider=${encodeURIComponent(l)}&limit=500`);
        if (!a.ok) throw new Error("no tape");
        const o = await a.json();
        if (!o.trades || o.trades.length === 0) throw new Error("empty");
        if (e) {
          const c = o.trades.slice(-500).reverse().map((t) => ({ price: t.price, size: t.size || t.qty || 0, side: t.side, ts: t.ts || Date.now() / 1e3, usd: t.price * (t.size || t.qty || 0) }));
          m(c), c.length && (u.current = c[c.length - 1].price);
        }
      } catch {
        try {
          const a = await fetch(`/api/orderflow/quote?symbol=${encodeURIComponent(p)}&provider=${encodeURIComponent(l)}`);
          if (a.ok) {
            const o = await a.json(), c = o.mid || o.last || u.current;
            u.current = c, e && m(j(c, 500));
            return;
          }
        } catch {
        }
        e && m(j(u.current || 5e4, 500));
      }
    })();
    let n = null;
    try {
      const a = location.protocol === "https:" ? "wss" : "ws";
      n = new WebSocket(`${a}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(p)}&provider=${encodeURIComponent(l)}`), n.onmessage = (o) => {
        try {
          const c = JSON.parse(o.data);
          if (c.type === "trade") {
            const t = c.event, y = { price: t.price, size: t.size || t.qty || 0, side: t.side, ts: t.ts || Date.now() / 1e3, usd: t.price * (t.size || t.qty || 0) };
            u.current = y.price, m((S) => [...S, y].slice(-500));
          }
        } catch {
        }
      };
    } catch {
    }
    return () => {
      e = !1;
      try {
        n?.close();
      } catch {
      }
    };
  }, [p, l, j]), i.useEffect(() => {
    d && h.current && (h.current.scrollTop = h.current.scrollHeight);
  }, [x, d]);
  const w = x.filter((e) => f === "buy" ? e.side === "BUY" || e.side === "B" : f === "sell" ? e.side === "SELL" || e.side === "S" : !0), b = x.length ? x.reduce((e, r) => e + (r.usd || r.price * r.size), 0) / x.length : 1e3, v = (e) => {
    const r = e.usd || e.price * e.size;
    return r > b * 10 ? 3 : r > b * 3 ? 2 : r > b * 1.5 ? 1 : 0;
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "h-full flex flex-col bg-[#1c1c1c] text-[#e8e8e8] font-mono text-[12px] select-none", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0", children: [
      /* @__PURE__ */ s.jsx("span", { className: "text-[11px] font-semibold tracking-wider", children: "TAPE" }),
      /* @__PURE__ */ s.jsx("span", { className: "font-mono font-medium text-[13px]", children: p }),
      /* @__PURE__ */ s.jsxs("span", { className: "px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9]", children: [
        w.length,
        " prints"
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "flex items-center gap-0.5 ml-3 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]", children: ["all", "buy", "sell"].map((e) => /* @__PURE__ */ s.jsx("button", { onClick: () => N(e), className: `px-2.5 py-1 rounded-md text-[11px] font-medium uppercase ${f === e ? "bg-[#e8e8e8] text-[#1c1c1c]" : "text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`, children: e }, e)) }),
      /* @__PURE__ */ s.jsx("button", { onClick: () => g((e) => !e), className: `ml-auto px-3 py-1 rounded-full border text-[11px] font-medium ${d ? "bg-[#21b3a4]/10 border-[#21b3a4]/30 text-[#21b3a4]" : "bg-[#262626] border-[#3a3a3a] text-[#6a6a6a]"}`, children: d ? "● AUTO" : "○ FREE" })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "grid grid-cols-3 px-3 py-2 text-[10px] font-semibold tracking-wider text-[#6a6a6a] uppercase border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0", children: [
      /* @__PURE__ */ s.jsx("span", { children: "Price" }),
      /* @__PURE__ */ s.jsx("span", { className: "text-right", children: "Qty • USD" }),
      /* @__PURE__ */ s.jsx("span", { className: "text-right", children: "Time" })
    ] }),
    /* @__PURE__ */ s.jsx("div", { ref: h, className: "flex-1 overflow-auto scrollbar-thin", onScroll: (e) => {
      const r = e.currentTarget, n = r.scrollHeight - r.scrollTop - r.clientHeight < 20;
      d && !n && g(!1), !d && n && g(!0);
    }, children: w.slice().reverse().map((e, r) => {
      const n = e.side === "BUY" || e.side === "B", a = v(e);
      return /* @__PURE__ */ s.jsxs("div", { className: `grid grid-cols-3 px-3 py-1.5 border-b border-[#2a2a2a]/30 hover:bg-[#262626] text-[12px] ${a === 3 ? "bg-[#f0426c]/10 font-semibold" : a === 2 ? "bg-[#f0426c]/5" : ""}`, children: [
        /* @__PURE__ */ s.jsxs("span", { className: `tabular-nums font-medium ${n ? "text-[#21b3a4]" : "text-[#f0426c]"}`, children: [
          e.price.toFixed(2),
          " ",
          a >= 2 ? "⚡" : ""
        ] }),
        /* @__PURE__ */ s.jsxs("span", { className: "text-right tabular-nums text-[#b9b9b9]", children: [
          e.size.toFixed(3),
          " ",
          /* @__PURE__ */ s.jsxs("span", { className: "text-[10px] text-[#6a6a6a]", children: [
            "$",
            (e.usd || e.price * e.size).toFixed(0)
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "text-right text-[#6a6a6a] text-[11px]", children: new Date(e.ts * 1e3).toLocaleTimeString() })
      ] }, r);
    }) }),
    /* @__PURE__ */ s.jsxs("div", { className: "px-3 py-2 text-[10px] text-[#6a6a6a] border-t border-[#2a2a2a] bg-[#1c1c1c] shrink-0", children: [
      "Whale >1.5×/>3×/>10× avg • ",
      l.toUpperCase(),
      " ",
      l === "hyperliquid" ? "15ms ⚡" : "20ms/50ms",
      " • ",
      b.toFixed(0),
      " avg"
    ] })
  ] });
}
export {
  $ as EdgeDepthTapePanel,
  $ as default
};
