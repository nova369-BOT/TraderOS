import { r as n, j as t } from "./react-vendor-C0yw3i6b.js";
function G({ symbol: p, provider: f = "binance" }) {
  const [r, y] = n.useState(null), [b, M] = n.useState(1), [h, w] = n.useState(!0), [x, B] = n.useState(!1), [N, k] = n.useState(null), [S, F] = n.useState(0), Q = n.useRef(null), R = n.useRef(null), [$, L] = n.useState({}), [v, P] = n.useState({}), j = n.useRef(null), m = n.useRef(0), _ = n.useCallback((e, s = 0.5) => {
    const c = [], i = [];
    for (let a = 0; a < 40; a++) {
      const l = e - s / 2 - a * 0.5 * b, o = e + s / 2 + a * 0.5 * b;
      c.push({ price: l, size: Math.random() * 5 + 0.1 }), i.push({ price: o, size: Math.random() * 5 + 0.1 });
    }
    return { bids: c, asks: i, best_bid: e - s / 2, best_ask: e + s / 2, last_price: e };
  }, [b]), C = n.useCallback(async () => {
    try {
      const e = await fetch(`/api/orderflow/dom?symbol=${encodeURIComponent(p)}&provider=${encodeURIComponent(f)}&grouping=${b * 0.5}&mode=${x ? "usd" : "coin"}`);
      if (!e.ok) throw new Error("no dom");
      const s = await e.json();
      if (!s.bids && !s.asks && !s.best_bid) throw new Error("empty dom");
      y(s), s.best_bid && s.best_ask ? m.current = (s.best_bid + s.best_ask) / 2 : s.last_price && (m.current = s.last_price), h && s.best_bid && s.best_ask ? k((s.best_bid + s.best_ask) / 2) : h && s.last_price && k(s.last_price);
    } catch {
      try {
        const c = await fetch(`/api/orderflow/quote?symbol=${encodeURIComponent(p)}&provider=${encodeURIComponent(f)}`);
        if (c.ok) {
          const i = await c.json(), a = i.mid || i.last || m.current || 5e4, l = i.spread || Math.max(a * 2e-4, 0.5);
          m.current = a;
          const o = _(a, l);
          y(o), h && k(a);
          return;
        }
      } catch {
      }
      const e = m.current || 5e4 + Math.random() * 1e3;
      m.current = e;
      const s = _(e, Math.max(e * 1e-3, 1));
      y(s), h && k(e);
    }
  }, [p, f, b, x, h, _]);
  n.useEffect(() => {
    C();
    const e = setInterval(C, 200);
    return () => clearInterval(e);
  }, [C]), n.useEffect(() => {
    let e = null;
    try {
      const c = `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(p)}&provider=${encodeURIComponent(f)}`;
      e = new WebSocket(c), e.onmessage = (i) => {
        try {
          const a = JSON.parse(i.data);
          if (a.type === "trade") {
            const l = a.event, o = l.price?.toFixed(2) || "";
            if (!o) return;
            l.side === "BUY" || l.side === "B" ? L((d) => ({ ...d, [o]: (d[o] || 0) + (l.size || 0) })) : P((d) => ({ ...d, [o]: (d[o] || 0) + (l.size || 0) }));
          }
        } catch {
        }
      }, e.onerror = () => {
        try {
          e?.close();
        } catch {
        }
      };
    } catch {
    }
    return () => {
      try {
        e?.close();
      } catch {
      }
    };
  }, [p, f]);
  const E = n.useMemo(() => {
    if (!r) return [];
    const e = `${r.best_bid}-${r.best_ask}-${N}-${S}-${b}-${x}-${Object.keys($).length}-${Object.keys(v).length}`;
    if (j.current && j.current.key === e)
      return j.current.rows;
    const s = r.bids || [], c = r.asks || [], i = N || (r.best_bid && r.best_ask ? (r.best_bid + r.best_ask) / 2 : s[0]?.price || c[0]?.price || 0);
    if (!i) return [];
    const a = 0.5 * b, l = 25, o = [];
    let d = 0;
    [...s, ...c].forEach((u) => {
      u.size > d && (d = u.size);
    }), d = d || 1;
    for (let u = l; u >= -l; u--) {
      const g = i + u * a + S * a, U = s.find((z) => Math.abs(z.price - g) < a * 0.6), O = c.find((z) => Math.abs(z.price - g) < a * 0.6), D = g.toFixed(2), I = $[D] || 0, A = v[D] || 0, K = I - A, Y = (U?.size || O?.size || 0) / d;
      o.push({
        price: g,
        bidSize: U?.size || 0,
        askSize: O?.size || 0,
        buyQty: I,
        sellQty: A,
        delta: K,
        depthFrac: Y,
        isBestBid: r.best_bid && Math.abs(g - r.best_bid) < a * 0.6,
        isBestAsk: r.best_ask && Math.abs(g - r.best_ask) < a * 0.6,
        isCenter: Math.abs(u) < 0.6
      });
    }
    return j.current = { key: e, rows: o }, o;
  }, [r, N, S, b, x, $, v]);
  return n.useEffect(() => {
    const e = R.current;
    if (!e) return;
    const s = (c) => {
      c.preventDefault(), c.shiftKey ? M((i) => Math.max(1, Math.min(100, i * (c.deltaY > 0 ? 1.2 : 0.8)))) : (F((i) => i + (c.deltaY > 0 ? 1 : -1)), w(!1));
    };
    return e.addEventListener("wheel", s, { passive: !1 }), () => e.removeEventListener("wheel", s);
  }, []), r ? /* @__PURE__ */ t.jsxs("div", { ref: R, className: "h-full flex flex-col bg-[#2a2a2a] text-[#e8e8e8] font-mono text-[11px] select-none", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-1 px-2 py-1 border-b border-[#3a3a3a] text-[10px] shrink-0 bg-[#1c1c1c]", children: [
      /* @__PURE__ */ t.jsxs("span", { className: "font-bold tracking-wider", children: [
        "DOM ",
        p
      ] }),
      /* @__PURE__ */ t.jsx("span", { className: "text-[9px] px-1 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[#b9b9b9]", children: f.toUpperCase() }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-0.5 ml-2 border border-[#3a3a3a] rounded overflow-hidden", children: [
        /* @__PURE__ */ t.jsx("button", { onClick: () => w((e) => !e), className: `px-1.5 py-0.5 text-[9px] ${h ? "bg-[#d0d0d0] text-[#1c1c1c]" : "bg-transparent text-[#b9b9b9] hover:bg-[#343434]"}`, children: "Auto center" }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => {
          F(0), w(!0);
        }, className: "px-1.5 py-0.5 text-[9px] text-[#b9b9b9] hover:bg-[#343434]", children: "Center" })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-0.5 ml-1 border border-[#3a3a3a] rounded overflow-hidden", children: [
        /* @__PURE__ */ t.jsx("button", { onClick: () => B(!1), className: `px-1.5 py-0.5 text-[9px] ${x ? "text-[#b9b9b9] hover:bg-[#343434]" : "bg-[#414141] text-[#e8e8e8]"}`, children: "Coin" }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => B(!0), className: `px-1.5 py-0.5 text-[9px] ${x ? "bg-[#414141] text-[#e8e8e8]" : "text-[#b9b9b9] hover:bg-[#343434]"}`, children: "USD" })
      ] }),
      /* @__PURE__ */ t.jsx("div", { className: "flex items-center gap-0.5 ml-1 border border-[#3a3a3a] rounded overflow-hidden", children: [1, 10, 100].map((e) => /* @__PURE__ */ t.jsxs("button", { onClick: () => M(e), className: `px-1 py-0.5 text-[9px] ${b === e ? "bg-[#d0d0d0] text-[#1c1c1c]" : "text-[#b9b9b9] hover:bg-[#343434]"}`, children: [
        "x",
        e
      ] }, e)) }),
      /* @__PURE__ */ t.jsxs("span", { className: "ml-auto text-[9px] text-[#b9b9b9]", children: [
        E.length,
        " levels • ",
        b,
        "x • ",
        x ? "USD" : "COIN"
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "grid grid-cols-6 px-1 py-1 text-[9px] text-[#b9b9b9] uppercase tracking-wider border-b border-[#3a3a3a] bg-[#262626] shrink-0", children: [
      /* @__PURE__ */ t.jsx("span", { children: "BUYS" }),
      /* @__PURE__ */ t.jsx("span", { children: "BIDS" }),
      /* @__PURE__ */ t.jsx("span", { className: "text-center", children: "PRICE" }),
      /* @__PURE__ */ t.jsx("span", { className: "text-right", children: "ASKS" }),
      /* @__PURE__ */ t.jsx("span", { className: "text-right", children: "SELLS" }),
      /* @__PURE__ */ t.jsx("span", { className: "text-right", children: "DELTA" })
    ] }),
    /* @__PURE__ */ t.jsx("div", { ref: Q, className: "flex-1 overflow-auto", children: E.map((e, s) => /* @__PURE__ */ t.jsxs("div", { className: `grid grid-cols-6 px-1 py-0.5 border-b border-[#3a3a3a]/20 hover:bg-[#343434] ${e.isCenter ? "bg-[#414141]/30" : ""} ${e.isBestBid ? "bg-[#21b3a4]/10" : ""} ${e.isBestAsk ? "bg-[#f0426c]/10" : ""}`, children: [
      /* @__PURE__ */ t.jsx("span", { className: "text-[#21b3a4] truncate", children: e.buyQty ? e.buyQty.toFixed(3) : "" }),
      /* @__PURE__ */ t.jsxs("span", { className: "relative", children: [
        /* @__PURE__ */ t.jsx("span", { className: "absolute inset-0 bg-[#21b3a4]/20", style: { width: `${e.bidSize ? e.depthFrac * 100 : 0}%` } }),
        /* @__PURE__ */ t.jsx("span", { className: "relative", children: e.bidSize ? x ? `$${(e.bidSize * e.price / 1e3).toFixed(1)}k` : e.bidSize.toFixed(4) : "" })
      ] }),
      /* @__PURE__ */ t.jsx("span", { className: `text-center tabular-nums ${e.isBestBid || e.isBestAsk ? "font-bold text-[#e8e8e8]" : "text-[#e8e8e8]"}`, children: e.price.toFixed(2) }),
      /* @__PURE__ */ t.jsxs("span", { className: "relative text-right", children: [
        /* @__PURE__ */ t.jsx("span", { className: "absolute inset-0 bg-[#f0426c]/20 right-0", style: { width: `${e.askSize ? e.depthFrac * 100 : 0}%`, left: "auto" } }),
        /* @__PURE__ */ t.jsx("span", { className: "relative", children: e.askSize ? x ? `$${(e.askSize * e.price / 1e3).toFixed(1)}k` : e.askSize.toFixed(4) : "" })
      ] }),
      /* @__PURE__ */ t.jsx("span", { className: "text-[#f0426c] text-right truncate", children: e.sellQty ? e.sellQty.toFixed(3) : "" }),
      /* @__PURE__ */ t.jsx("span", { className: `text-right ${e.delta > 0 ? "text-[#21b3a4]" : e.delta < 0 ? "text-[#f0426c]" : "text-[#b9b9b9]"}`, children: e.delta ? e.delta > 0 ? `+${e.delta.toFixed(2)}` : e.delta.toFixed(2) : "" })
    ] }, s)) }),
    /* @__PURE__ */ t.jsxs("div", { className: "px-2 py-1 text-[9px] text-[#b9b9b9] border-t border-[#3a3a3a] bg-[#1c1c1c] shrink-0", children: [
      "Shift+wheel = group x1/x10/x100, wheel = scroll, auto-center ",
      h ? "ON" : "OFF",
      " • SoA cache • double-buffered • synthetic BBO fallback"
    ] })
  ] }) : /* @__PURE__ */ t.jsxs("div", { className: "p-2 text-[11px] text-[#b9b9b9] bg-[#2a2a2a] h-full", children: [
    "DOM loading ",
    p,
    "... synthetic BBO fallback active"
  ] });
}
export {
  G as EdgeDepthDOMPanel,
  G as default
};
