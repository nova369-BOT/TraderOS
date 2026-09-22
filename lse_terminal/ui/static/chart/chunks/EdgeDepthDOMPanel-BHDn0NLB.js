import { r as c, j as t } from "./react-vendor-C0yw3i6b.js";
function W({ symbol: p, provider: u = "binance" }) {
  const [a, O] = c.useState(null), [d, v] = c.useState(1), [f, j] = c.useState(!0), [i, C] = c.useState(!1), [k, R] = c.useState(null), [N, z] = c.useState(0), E = c.useRef(null), [S, I] = c.useState({}), [y, A] = c.useState({}), m = c.useRef(null), $ = c.useCallback(async () => {
    try {
      const e = await fetch(`/api/orderflow/dom?symbol=${encodeURIComponent(p)}&provider=${encodeURIComponent(u)}&grouping=${d * 0.5}&mode=${i ? "usd" : "coin"}`);
      if (!e.ok) return;
      const s = await e.json();
      O(s), f && s.best_bid && s.best_ask && R((s.best_bid + s.best_ask) / 2);
    } catch {
    }
  }, [p, u, d, i, f]);
  c.useEffect(() => {
    $();
    const e = setInterval($, 200);
    return () => clearInterval(e);
  }, [$]), c.useEffect(() => {
    const s = `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(p)}&provider=${encodeURIComponent(u)}`;
    let b = null;
    try {
      b = new WebSocket(s), b.onmessage = (g) => {
        try {
          const r = JSON.parse(g.data);
          if (r.type === "trade") {
            const o = r.event, l = o.price?.toFixed(2) || "";
            if (!l) return;
            o.side === "BUY" || o.side === "B" ? I((n) => ({ ...n, [l]: (n[l] || 0) + (o.size || 0) })) : A((n) => ({ ...n, [l]: (n[l] || 0) + (o.size || 0) }));
          }
        } catch {
        }
      };
    } catch {
    }
    return () => {
      try {
        b?.close();
      } catch {
      }
    };
  }, [p, u]);
  const F = c.useMemo(() => {
    if (!a) return [];
    const e = `${a.best_bid}-${a.best_ask}-${k}-${N}-${d}-${i}-${Object.keys(S).length}-${Object.keys(y).length}`;
    if (m.current && m.current.key === e)
      return m.current.rows;
    const s = a.bids || [], b = a.asks || [], g = k || (a.best_bid && a.best_ask ? (a.best_bid + a.best_ask) / 2 : s[0]?.price || b[0]?.price || 0);
    if (!g) return [];
    const r = 0.5 * d, o = 25, l = [];
    let n = 0;
    [...s, ...b].forEach((x) => {
      x.size > n && (n = x.size);
    }), n = n || 1;
    for (let x = o; x >= -o; x--) {
      const h = g + x * r + N * r, B = s.find((w) => Math.abs(w.price - h) < r * 0.6), M = b.find((w) => Math.abs(w.price - h) < r * 0.6), _ = h.toFixed(2), U = S[_] || 0, D = y[_] || 0, P = U - D, K = (B?.size || M?.size || 0) / n;
      l.push({
        price: h,
        bidSize: B?.size || 0,
        askSize: M?.size || 0,
        buyQty: U,
        sellQty: D,
        delta: P,
        depthFrac: K,
        isBestBid: a.best_bid && Math.abs(h - a.best_bid) < r * 0.6,
        isBestAsk: a.best_ask && Math.abs(h - a.best_ask) < r * 0.6,
        isCenter: Math.abs(x) < 0.6
      });
    }
    return m.current = { key: e, rows: l }, l;
  }, [a, k, N, d, i, S, y]), Q = c.useCallback((e) => {
    e.preventDefault(), e.shiftKey ? v((s) => Math.max(1, Math.min(100, s * (e.deltaY > 0 ? 1.2 : 0.8)))) : (z((s) => s + (e.deltaY > 0 ? 1 : -1)), j(!1));
  }, []);
  return a ? /* @__PURE__ */ t.jsxs("div", { className: "h-full flex flex-col bg-[#2a2a2a] text-[#e8e8e8] font-mono text-[11px] select-none", onWheel: Q, children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-1 px-2 py-1 border-b border-[#3a3a3a] text-[10px] shrink-0 bg-[#1c1c1c]", children: [
      /* @__PURE__ */ t.jsxs("span", { className: "font-bold tracking-wider", children: [
        "DOM ",
        p
      ] }),
      /* @__PURE__ */ t.jsx("span", { className: "text-[9px] px-1 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[#b9b9b9]", children: u.toUpperCase() }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-0.5 ml-2 border border-[#3a3a3a] rounded overflow-hidden", children: [
        /* @__PURE__ */ t.jsx("button", { onClick: () => j((e) => !e), className: `px-1.5 py-0.5 text-[9px] ${f ? "bg-[#d0d0d0] text-[#1c1c1c]" : "bg-transparent text-[#b9b9b9] hover:bg-[#343434]"}`, children: "Auto center" }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => {
          z(0), j(!0);
        }, className: "px-1.5 py-0.5 text-[9px] text-[#b9b9b9] hover:bg-[#343434]", children: "Center" })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-0.5 ml-1 border border-[#3a3a3a] rounded overflow-hidden", children: [
        /* @__PURE__ */ t.jsx("button", { onClick: () => C(!1), className: `px-1.5 py-0.5 text-[9px] ${i ? "text-[#b9b9b9] hover:bg-[#343434]" : "bg-[#414141] text-[#e8e8e8]"}`, children: "Coin" }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => C(!0), className: `px-1.5 py-0.5 text-[9px] ${i ? "bg-[#414141] text-[#e8e8e8]" : "text-[#b9b9b9] hover:bg-[#343434]"}`, children: "USD" })
      ] }),
      /* @__PURE__ */ t.jsx("div", { className: "flex items-center gap-0.5 ml-1 border border-[#3a3a3a] rounded overflow-hidden", children: [1, 10, 100].map((e) => /* @__PURE__ */ t.jsxs("button", { onClick: () => v(e), className: `px-1 py-0.5 text-[9px] ${d === e ? "bg-[#d0d0d0] text-[#1c1c1c]" : "text-[#b9b9b9] hover:bg-[#343434]"}`, children: [
        "x",
        e
      ] }, e)) }),
      /* @__PURE__ */ t.jsxs("span", { className: "ml-auto text-[9px] text-[#b9b9b9]", children: [
        F.length,
        " levels • ",
        d,
        "x • ",
        i ? "USD" : "COIN"
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
    /* @__PURE__ */ t.jsx("div", { ref: E, className: "flex-1 overflow-auto", children: F.map((e, s) => /* @__PURE__ */ t.jsxs("div", { className: `grid grid-cols-6 px-1 py-0.5 border-b border-[#3a3a3a]/20 hover:bg-[#343434] ${e.isCenter ? "bg-[#414141]/30" : ""} ${e.isBestBid ? "bg-[#21b3a4]/10" : ""} ${e.isBestAsk ? "bg-[#f0426c]/10" : ""}`, children: [
      /* @__PURE__ */ t.jsx("span", { className: "text-[#21b3a4] truncate", children: e.buyQty ? e.buyQty.toFixed(3) : "" }),
      /* @__PURE__ */ t.jsxs("span", { className: "relative", children: [
        /* @__PURE__ */ t.jsx("span", { className: "absolute inset-0 bg-[#21b3a4]/20", style: { width: `${e.bidSize ? e.depthFrac * 100 : 0}%` } }),
        /* @__PURE__ */ t.jsx("span", { className: "relative", children: e.bidSize ? i ? `$${(e.bidSize * e.price / 1e3).toFixed(1)}k` : e.bidSize.toFixed(4) : "" })
      ] }),
      /* @__PURE__ */ t.jsx("span", { className: `text-center tabular-nums ${e.isBestBid || e.isBestAsk ? "font-bold text-[#e8e8e8]" : "text-[#e8e8e8]"}`, children: e.price.toFixed(2) }),
      /* @__PURE__ */ t.jsxs("span", { className: "relative text-right", children: [
        /* @__PURE__ */ t.jsx("span", { className: "absolute inset-0 bg-[#f0426c]/20 right-0", style: { width: `${e.askSize ? e.depthFrac * 100 : 0}%`, left: "auto" } }),
        /* @__PURE__ */ t.jsx("span", { className: "relative", children: e.askSize ? i ? `$${(e.askSize * e.price / 1e3).toFixed(1)}k` : e.askSize.toFixed(4) : "" })
      ] }),
      /* @__PURE__ */ t.jsx("span", { className: "text-[#f0426c] text-right truncate", children: e.sellQty ? e.sellQty.toFixed(3) : "" }),
      /* @__PURE__ */ t.jsx("span", { className: `text-right ${e.delta > 0 ? "text-[#21b3a4]" : e.delta < 0 ? "text-[#f0426c]" : "text-[#b9b9b9]"}`, children: e.delta ? e.delta > 0 ? `+${e.delta.toFixed(2)}` : e.delta.toFixed(2) : "" })
    ] }, s)) }),
    /* @__PURE__ */ t.jsxs("div", { className: "px-2 py-1 text-[9px] text-[#b9b9b9] border-t border-[#3a3a3a] bg-[#1c1c1c] shrink-0", children: [
      "Shift+wheel = group x1/x10/x100, wheel = scroll, auto-center ",
      f ? "ON" : "OFF",
      " • SoA cache • double-buffered write/read swap once per frame"
    ] })
  ] }) : /* @__PURE__ */ t.jsxs("div", { className: "p-2 text-[11px] text-[#b9b9b9] bg-[#2a2a2a] h-full", children: [
    "DOM loading ",
    p,
    "..."
  ] });
}
export {
  W as EdgeDepthDOMPanel,
  W as default
};
