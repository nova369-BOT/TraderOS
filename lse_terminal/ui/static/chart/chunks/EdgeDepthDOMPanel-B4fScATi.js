import { r as c, j as s } from "./react-vendor-C0yw3i6b.js";
function T({ symbol: x, provider: l = "binance" }) {
  const [i, S] = c.useState(null), [d, F] = c.useState(1), [f, v] = c.useState(!0), [h, R] = c.useState(!1), [_, N] = c.useState(null), [C, E] = c.useState(0), U = c.useRef(null), [y, I] = c.useState({}), [j, O] = c.useState({}), $ = c.useRef(null), m = c.useRef(0), Y = c.useRef({}), G = c.useRef({});
  c.useEffect(() => {
    Y.current = y;
  }, [y]), c.useEffect(() => {
    G.current = j;
  }, [j]);
  const w = c.useMemo(() => l === "hyperliquid" ? 15 : l === "binance" ? 20 : 50, [l]), z = c.useCallback(
    (e, t = 0.5) => {
      const a = [], r = [];
      for (let n = 0; n < 40; n++)
        a.push({ price: e - t / 2 - n * 0.5 * d, size: Math.random() * 5 + 0.1 }), r.push({ price: e + t / 2 + n * 0.5 * d, size: Math.random() * 5 + 0.1 });
      return { bids: a, asks: r, best_bid: e - t / 2, best_ask: e + t / 2, last_price: e };
    },
    [d]
  ), M = c.useCallback(async () => {
    try {
      const e = await fetch(
        `/api/orderflow/dom?symbol=${encodeURIComponent(x)}&provider=${encodeURIComponent(l)}&grouping=${d * 0.5}&mode=${h ? "usd" : "coin"}`
      );
      if (!e.ok) throw new Error("no dom");
      const t = await e.json();
      if (!t.bids && !t.asks) throw new Error("empty");
      S(t), t.best_bid && t.best_ask ? m.current = (t.best_bid + t.best_ask) / 2 : t.last_price && (m.current = t.last_price), f && (t.best_bid && t.best_ask ? N((t.best_bid + t.best_ask) / 2) : t.last_price && N(t.last_price));
    } catch {
      try {
        const a = await fetch(`/api/orderflow/quote?symbol=${encodeURIComponent(x)}&provider=${encodeURIComponent(l)}`);
        if (a.ok) {
          const r = await a.json(), n = r.mid || r.last || m.current || 5e4, o = r.spread || Math.max(n * 2e-4, 0.5);
          m.current = n;
          const b = z(n, o);
          S(b), f && N(n);
          return;
        }
      } catch {
      }
      const e = m.current || 5e4 + Math.random() * 1e3;
      m.current = e;
      const t = z(e, Math.max(e * 1e-3, 1));
      S(t), f && N(e);
    }
  }, [x, l, d, h, f, z]);
  c.useEffect(() => {
    M();
    const e = setInterval(M, w);
    return () => clearInterval(e);
  }, [M, w]), c.useEffect(() => {
    let e = null;
    try {
      const a = location.protocol === "https:" ? "wss" : "ws";
      e = new WebSocket(`${a}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(x)}&provider=${encodeURIComponent(l)}`), e.onmessage = (r) => {
        try {
          const n = JSON.parse(r.data);
          if (n.type === "trade") {
            const o = n.event, b = o.price?.toFixed(2) || "";
            if (!b) return;
            o.side === "BUY" || o.side === "B" ? I((u) => ({ ...u, [b]: (u[b] || 0) + (o.size || 0) })) : O((u) => ({ ...u, [b]: (u[b] || 0) + (o.size || 0) }));
          }
        } catch {
        }
      };
    } catch {
    }
    const t = setInterval(() => {
      I((a) => {
        const r = {};
        for (const n in a) {
          const o = a[n] * 0.85;
          o > 1e-3 && (r[n] = o);
        }
        return r;
      }), O((a) => {
        const r = {};
        for (const n in a) {
          const o = a[n] * 0.85;
          o > 1e-3 && (r[n] = o);
        }
        return r;
      });
    }, 5e3);
    return () => {
      try {
        e?.close();
      } catch {
      }
      clearInterval(t);
    };
  }, [x, l]);
  const g = c.useMemo(() => {
    if (!i) return [];
    const e = `${i.best_bid}-${i.best_ask}-${_}-${C}-${d}-${Object.keys(y).length}-${Object.keys(j).length}`;
    if ($.current && $.current.key === e) return $.current.rows;
    const t = i.bids || [], a = i.asks || [], r = _ || (i.best_bid && i.best_ask ? (i.best_bid + i.best_ask) / 2 : t[0]?.price || a[0]?.price || 0);
    if (!r) return [];
    const n = 0.5 * d, o = 25, b = [];
    let u = 0;
    [...t, ...a].forEach((p) => {
      p.size > u && (u = p.size);
    }), u = u || 1;
    for (let p = o; p >= -o; p--) {
      const k = r + p * n + C * n, Q = t.find((B) => Math.abs(B.price - k) < n * 0.6), q = a.find((B) => Math.abs(B.price - k) < n * 0.6), P = k.toFixed(2), L = y[P] || 0, W = j[P] || 0;
      b.push({
        price: k,
        bidSize: Q?.size || 0,
        askSize: q?.size || 0,
        buyQty: L,
        sellQty: W,
        delta: L - W,
        depth: (Q?.size || q?.size || 0) / u,
        isBestBid: !!i.best_bid && Math.abs(k - i.best_bid) < n * 0.6,
        isBestAsk: !!i.best_ask && Math.abs(k - i.best_ask) < n * 0.6,
        isCenter: Math.abs(p) < 0.6
      });
    }
    return $.current = { key: e, rows: b }, b;
  }, [i, _, C, d, y, j]);
  c.useEffect(() => {
    const e = U.current;
    if (!e) return;
    const t = (a) => {
      a.preventDefault(), a.shiftKey ? F((r) => Math.max(1, Math.min(100, r * (a.deltaY > 0 ? 1.2 : 0.8)))) : (E((r) => r + (a.deltaY > 0 ? 1 : -1)), v(!1));
    };
    return e.addEventListener("wheel", t, { passive: !1 }), () => e.removeEventListener("wheel", t);
  }, []);
  const J = g.reduce((e, t) => e + t.bidSize, 0), K = g.reduce((e, t) => e + t.askSize, 0), A = g.reduce((e, t) => e + t.buyQty, 0), D = g.reduce((e, t) => e + t.sellQty, 0);
  return i ? /* @__PURE__ */ s.jsxs("div", { ref: U, className: "h-full flex flex-col bg-[#1c1c1c] text-[#e8e8e8] font-mono text-[12px] select-none", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0", children: [
      /* @__PURE__ */ s.jsx("span", { className: "font-semibold tracking-wider text-[11px] font-sans", children: "DOM" }),
      /* @__PURE__ */ s.jsx("span", { className: "font-mono font-medium text-[13px]", children: x }),
      /* @__PURE__ */ s.jsxs("span", { className: "px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9] font-sans", children: [
        l.toUpperCase(),
        " ",
        w,
        "ms ",
        l === "hyperliquid" ? "⚡" : ""
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-1 ml-3 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            onClick: () => v((e) => !e),
            className: `px-2.5 py-1 rounded-md text-[11px] font-medium font-sans transition-colors ${f ? "bg-[#e8e8e8] text-[#1c1c1c] shadow-sm" : "bg-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
            children: "Auto"
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            onClick: () => {
              E(0), v(!0);
            },
            className: "px-2.5 py-1 rounded-md text-[11px] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8] font-sans",
            children: "Center"
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-0.5 ml-1 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]", children: [
        /* @__PURE__ */ s.jsx("button", { onClick: () => R(!1), className: `px-2 py-1 rounded-md text-[11px] font-sans ${h ? "text-[#b9b9b9] hover:bg-[#343434]" : "bg-[#e8e8e8] text-[#1c1c1c]"}`, children: "Coin" }),
        /* @__PURE__ */ s.jsx("button", { onClick: () => R(!0), className: `px-2 py-1 rounded-md text-[11px] font-sans ${h ? "bg-[#e8e8e8] text-[#1c1c1c]" : "text-[#b9b9b9] hover:bg-[#343434]"}`, children: "USD" })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "flex items-center gap-0.5 ml-1 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]", children: [1, 10, 100].map((e) => /* @__PURE__ */ s.jsxs("button", { onClick: () => F(e), className: `px-2 py-1 rounded-md text-[11px] font-sans ${d === e ? "bg-[#e8e8e8] text-[#1c1c1c]" : "text-[#b9b9b9] hover:bg-[#343434]"}`, children: [
        "×",
        e
      ] }, e)) }),
      /* @__PURE__ */ s.jsxs("span", { className: "ml-auto text-[10px] text-[#6a6a6a] font-sans hidden lg:block", children: [
        g.length,
        " levels • ",
        d,
        "× • Bids ",
        J.toFixed(1),
        " / Asks ",
        K.toFixed(1)
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "grid grid-cols-6 px-3 py-2 text-[10px] font-semibold tracking-wider text-[#6a6a6a] uppercase border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0 font-sans", children: [
      /* @__PURE__ */ s.jsx("span", { children: "Buys" }),
      /* @__PURE__ */ s.jsx("span", { children: "Bids" }),
      /* @__PURE__ */ s.jsx("span", { className: "text-center", children: "Price" }),
      /* @__PURE__ */ s.jsx("span", { className: "text-right", children: "Asks" }),
      /* @__PURE__ */ s.jsx("span", { className: "text-right", children: "Sells" }),
      /* @__PURE__ */ s.jsx("span", { className: "text-right", children: "Delta" })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "flex-1 overflow-auto scrollbar-thin", children: g.map((e, t) => /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: `grid grid-cols-6 px-3 py-1.5 border-b border-[#2a2a2a]/30 hover:bg-[#262626] text-[12px] transition-colors ${e.isCenter ? "bg-[#262626]/50" : ""} ${e.isBestBid ? "bg-[#21b3a4]/5" : ""} ${e.isBestAsk ? "bg-[#f0426c]/5" : ""}`,
        children: [
          /* @__PURE__ */ s.jsx("span", { className: "text-[#21b3a4] tabular-nums font-medium", children: e.buyQty ? e.buyQty.toFixed(2) : "" }),
          /* @__PURE__ */ s.jsxs("span", { className: "relative tabular-nums", children: [
            /* @__PURE__ */ s.jsx("span", { className: "absolute inset-0 bg-[#21b3a4]/15 rounded", style: { width: `${e.bidSize ? e.depth * 100 : 0}%` } }),
            /* @__PURE__ */ s.jsx("span", { className: "relative", children: e.bidSize ? h ? `$${(e.bidSize * e.price / 1e3).toFixed(1)}k` : e.bidSize.toFixed(3) : "" })
          ] }),
          /* @__PURE__ */ s.jsx("span", { className: `text-center tabular-nums font-medium ${e.isBestBid || e.isBestAsk ? "text-[#e8e8e8]" : ""} ${e.isCenter ? "ring-1 ring-[#e8e8e8]/20 rounded" : ""}`, children: e.price.toFixed(2) }),
          /* @__PURE__ */ s.jsxs("span", { className: "relative text-right tabular-nums", children: [
            /* @__PURE__ */ s.jsx("span", { className: "absolute inset-0 bg-[#f0426c]/15 rounded right-0", style: { width: `${e.askSize ? e.depth * 100 : 0}%`, left: "auto" } }),
            /* @__PURE__ */ s.jsx("span", { className: "relative", children: e.askSize ? h ? `$${(e.askSize * e.price / 1e3).toFixed(1)}k` : e.askSize.toFixed(3) : "" })
          ] }),
          /* @__PURE__ */ s.jsx("span", { className: "text-[#f0426c] text-right tabular-nums font-medium", children: e.sellQty ? e.sellQty.toFixed(2) : "" }),
          /* @__PURE__ */ s.jsx("span", { className: `text-right tabular-nums font-medium ${e.delta > 0 ? "text-[#21b3a4]" : e.delta < 0 ? "text-[#f0426c]" : "text-[#6a6a6a]"}`, children: e.delta ? e.delta > 0 ? `+${e.delta.toFixed(1)}` : e.delta.toFixed(1) : "" })
        ]
      },
      t
    )) }),
    /* @__PURE__ */ s.jsxs("div", { className: "px-3 py-2 text-[10px] text-[#6a6a6a] border-t border-[#2a2a2a] bg-[#1c1c1c] shrink-0 flex items-center justify-between font-sans", children: [
      /* @__PURE__ */ s.jsxs("span", { children: [
        "Shift+wheel grouping • Wheel scroll • Auto-center ",
        f ? "ON" : "OFF",
        " • Buys ",
        A.toFixed(1),
        " Sells ",
        D.toFixed(1),
        " Δ ",
        (A - D).toFixed(1)
      ] }),
      /* @__PURE__ */ s.jsxs("span", { className: "px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9]", children: [
        l.toUpperCase(),
        " ",
        w,
        "ms ",
        l === "hyperliquid" ? "⚡" : "",
        " • ",
        d,
        "×"
      ] })
    ] })
  ] }) : /* @__PURE__ */ s.jsxs("div", { className: "p-4 text-[12px] text-[#b9b9b9] bg-[#1c1c1c] h-full flex items-center justify-center font-sans", children: [
    "Loading DOM ",
    x,
    "..."
  ] });
}
export {
  T as EdgeDepthDOMPanel,
  T as default
};
