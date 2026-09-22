import { r as n, j as t } from "./react-vendor-C0yw3i6b.js";
function L({ symbol: b, provider: x = "binance" }) {
  const [i, y] = n.useState(null), [o, z] = n.useState(1), [p, N] = n.useState(!0), [h, M] = n.useState(!1), [$, k] = n.useState(null), [w, B] = n.useState(0), F = n.useRef(null), [v, Q] = n.useState({}), [R, P] = n.useState({}), j = n.useRef(null), m = n.useRef(0), S = n.useCallback((e, s = 0.5) => {
    const c = [], r = [];
    for (let a = 0; a < 40; a++)
      c.push({ price: e - s / 2 - a * 0.5 * o, size: Math.random() * 5 + 0.1 }), r.push({ price: e + s / 2 + a * 0.5 * o, size: Math.random() * 5 + 0.1 });
    return { bids: c, asks: r, best_bid: e - s / 2, best_ask: e + s / 2, last_price: e };
  }, [o]), _ = n.useCallback(async () => {
    try {
      const e = await fetch(`/api/orderflow/dom?symbol=${encodeURIComponent(b)}&provider=${encodeURIComponent(x)}&grouping=${o * 0.5}&mode=${h ? "usd" : "coin"}`);
      if (!e.ok) throw new Error("no dom");
      const s = await e.json();
      if (!s.bids && !s.asks) throw new Error("empty");
      y(s), s.best_bid && s.best_ask ? m.current = (s.best_bid + s.best_ask) / 2 : s.last_price && (m.current = s.last_price), p && (s.best_bid && s.best_ask ? k((s.best_bid + s.best_ask) / 2) : s.last_price && k(s.last_price));
    } catch {
      try {
        const c = await fetch(`/api/orderflow/quote?symbol=${encodeURIComponent(b)}&provider=${encodeURIComponent(x)}`);
        if (c.ok) {
          const r = await c.json(), a = r.mid || r.last || m.current || 5e4, d = r.spread || Math.max(a * 2e-4, 0.5);
          m.current = a;
          const l = S(a, d);
          y(l), p && k(a);
          return;
        }
      } catch {
      }
      const e = m.current || 5e4 + Math.random() * 1e3;
      m.current = e;
      const s = S(e, Math.max(e * 1e-3, 1));
      y(s), p && k(e);
    }
  }, [b, x, o, h, p, S]);
  n.useEffect(() => {
    _();
    const e = setInterval(_, 200);
    return () => clearInterval(e);
  }, [_]), n.useEffect(() => {
    let e = null;
    try {
      const s = location.protocol === "https:" ? "wss" : "ws";
      e = new WebSocket(`${s}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(b)}&provider=${encodeURIComponent(x)}`), e.onmessage = (c) => {
        try {
          const r = JSON.parse(c.data);
          if (r.type === "trade") {
            const a = r.event, d = a.price?.toFixed(2) || "";
            if (!d) return;
            a.side === "BUY" || a.side === "B" ? Q((l) => ({ ...l, [d]: (l[d] || 0) + (a.size || 0) })) : P((l) => ({ ...l, [d]: (l[d] || 0) + (a.size || 0) }));
          }
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
  }, [b, x]);
  const U = n.useMemo(() => {
    if (!i) return [];
    const e = `${i.best_bid}-${i.best_ask}-${$}-${w}-${o}-${Object.keys(v).length}`;
    if (j.current && j.current.key === e) return j.current.rows;
    const s = i.bids || [], c = i.asks || [], r = $ || (i.best_bid && i.best_ask ? (i.best_bid + i.best_ask) / 2 : s[0]?.price || c[0]?.price || 0);
    if (!r) return [];
    const a = 0.5 * o, d = 25, l = [];
    let g = 0;
    [...s, ...c].forEach((u) => {
      u.size > g && (g = u.size);
    }), g = g || 1;
    for (let u = d; u >= -d; u--) {
      const f = r + u * a + w * a, E = s.find((C) => Math.abs(C.price - f) < a * 0.6), D = c.find((C) => Math.abs(C.price - f) < a * 0.6), O = f.toFixed(2), I = v[O] || 0, A = R[O] || 0;
      l.push({ price: f, bidSize: E?.size || 0, askSize: D?.size || 0, buyQty: I, sellQty: A, delta: I - A, depth: (E?.size || D?.size || 0) / g, isBestBid: i.best_bid && Math.abs(f - i.best_bid) < a * 0.6, isBestAsk: i.best_ask && Math.abs(f - i.best_ask) < a * 0.6, isCenter: Math.abs(u) < 0.6 });
    }
    return j.current = { key: e, rows: l }, l;
  }, [i, $, w, o, v, R]);
  return n.useEffect(() => {
    const e = F.current;
    if (!e) return;
    const s = (c) => {
      c.preventDefault(), c.shiftKey ? z((r) => Math.max(1, Math.min(100, r * (c.deltaY > 0 ? 1.2 : 0.8)))) : (B((r) => r + (c.deltaY > 0 ? 1 : -1)), N(!1));
    };
    return e.addEventListener("wheel", s, { passive: !1 }), () => e.removeEventListener("wheel", s);
  }, []), i ? /* @__PURE__ */ t.jsxs("div", { ref: F, className: "h-full flex flex-col bg-[#1c1c1c] text-[#e8e8e8] font-mono text-[12px] select-none", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0", children: [
      /* @__PURE__ */ t.jsx("span", { className: "font-semibold tracking-wider text-[11px]", children: "DOM" }),
      /* @__PURE__ */ t.jsx("span", { className: "font-mono font-medium text-[13px]", children: b }),
      /* @__PURE__ */ t.jsx("span", { className: "px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9]", children: x.toUpperCase() }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-1 ml-3 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]", children: [
        /* @__PURE__ */ t.jsx("button", { onClick: () => N((e) => !e), className: `px-2.5 py-1 rounded-md text-[11px] font-medium ${p ? "bg-[#e8e8e8] text-[#1c1c1c]" : "bg-transparent text-[#b9b9b9] hover:bg-[#343434]"}`, children: "Auto" }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => {
          B(0), N(!0);
        }, className: "px-2.5 py-1 rounded-md text-[11px] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]", children: "Center" })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-0.5 ml-1 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]", children: [
        /* @__PURE__ */ t.jsx("button", { onClick: () => M(!1), className: `px-2 py-1 rounded-md text-[11px] ${h ? "text-[#b9b9b9] hover:bg-[#343434]" : "bg-[#e8e8e8] text-[#1c1c1c]"}`, children: "Coin" }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => M(!0), className: `px-2 py-1 rounded-md text-[11px] ${h ? "bg-[#e8e8e8] text-[#1c1c1c]" : "text-[#b9b9b9] hover:bg-[#343434]"}`, children: "USD" })
      ] }),
      /* @__PURE__ */ t.jsx("div", { className: "flex items-center gap-0.5 ml-1 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]", children: [1, 10, 100].map((e) => /* @__PURE__ */ t.jsxs("button", { onClick: () => z(e), className: `px-2 py-1 rounded-md text-[11px] ${o === e ? "bg-[#e8e8e8] text-[#1c1c1c]" : "text-[#b9b9b9] hover:bg-[#343434]"}`, children: [
        "×",
        e
      ] }, e)) }),
      /* @__PURE__ */ t.jsxs("span", { className: "ml-auto text-[10px] text-[#6a6a6a]", children: [
        U.length,
        " levels • ",
        o,
        "×"
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "grid grid-cols-6 px-3 py-2 text-[10px] font-semibold tracking-wider text-[#6a6a6a] uppercase border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0", children: [
      /* @__PURE__ */ t.jsx("span", { children: "Buys" }),
      /* @__PURE__ */ t.jsx("span", { children: "Bids" }),
      /* @__PURE__ */ t.jsx("span", { className: "text-center", children: "Price" }),
      /* @__PURE__ */ t.jsx("span", { className: "text-right", children: "Asks" }),
      /* @__PURE__ */ t.jsx("span", { className: "text-right", children: "Sells" }),
      /* @__PURE__ */ t.jsx("span", { className: "text-right", children: "Delta" })
    ] }),
    /* @__PURE__ */ t.jsx("div", { className: "flex-1 overflow-auto scrollbar-thin", children: U.map((e, s) => /* @__PURE__ */ t.jsxs("div", { className: `grid grid-cols-6 px-3 py-1.5 border-b border-[#2a2a2a]/30 hover:bg-[#262626] text-[12px] ${e.isCenter ? "bg-[#262626]/50" : ""} ${e.isBestBid ? "bg-[#21b3a4]/5" : ""} ${e.isBestAsk ? "bg-[#f0426c]/5" : ""}`, children: [
      /* @__PURE__ */ t.jsx("span", { className: "text-[#21b3a4] tabular-nums", children: e.buyQty ? e.buyQty.toFixed(2) : "" }),
      /* @__PURE__ */ t.jsxs("span", { className: "relative tabular-nums", children: [
        /* @__PURE__ */ t.jsx("span", { className: "absolute inset-0 bg-[#21b3a4]/15 rounded", style: { width: `${e.bidSize ? e.depth * 100 : 0}%` } }),
        /* @__PURE__ */ t.jsx("span", { className: "relative", children: e.bidSize ? h ? `$${(e.bidSize * e.price / 1e3).toFixed(1)}k` : e.bidSize.toFixed(3) : "" })
      ] }),
      /* @__PURE__ */ t.jsx("span", { className: `text-center tabular-nums font-medium ${e.isBestBid || e.isBestAsk ? "text-[#e8e8e8]" : ""}`, children: e.price.toFixed(2) }),
      /* @__PURE__ */ t.jsxs("span", { className: "relative text-right tabular-nums", children: [
        /* @__PURE__ */ t.jsx("span", { className: "absolute inset-0 bg-[#f0426c]/15 rounded right-0", style: { width: `${e.askSize ? e.depth * 100 : 0}%`, left: "auto" } }),
        /* @__PURE__ */ t.jsx("span", { className: "relative", children: e.askSize ? h ? `$${(e.askSize * e.price / 1e3).toFixed(1)}k` : e.askSize.toFixed(3) : "" })
      ] }),
      /* @__PURE__ */ t.jsx("span", { className: "text-[#f0426c] text-right tabular-nums", children: e.sellQty ? e.sellQty.toFixed(2) : "" }),
      /* @__PURE__ */ t.jsx("span", { className: `text-right tabular-nums font-medium ${e.delta > 0 ? "text-[#21b3a4]" : e.delta < 0 ? "text-[#f0426c]" : "text-[#6a6a6a]"}`, children: e.delta ? e.delta > 0 ? `+${e.delta.toFixed(1)}` : e.delta.toFixed(1) : "" })
    ] }, s)) }),
    /* @__PURE__ */ t.jsxs("div", { className: "px-3 py-2 text-[10px] text-[#6a6a6a] border-t border-[#2a2a2a] bg-[#1c1c1c] shrink-0", children: [
      "Shift+wheel grouping • Wheel scroll • Auto-center ",
      p ? "ON" : "OFF",
      " • ",
      x.toUpperCase(),
      " ",
      o,
      "×"
    ] })
  ] }) : /* @__PURE__ */ t.jsxs("div", { className: "p-4 text-[12px] text-[#b9b9b9] bg-[#1c1c1c] h-full flex items-center justify-center", children: [
    "Loading DOM ",
    b,
    "..."
  ] });
}
export {
  L as EdgeDepthDOMPanel,
  L as default
};
