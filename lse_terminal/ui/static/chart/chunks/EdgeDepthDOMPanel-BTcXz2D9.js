import { r, j as a } from "./react-vendor-C0yw3i6b.js";
function K({ symbol: h, provider: b = "binance" }) {
  const [i, y] = r.useState(null), [u, L] = r.useState(5), [m, O] = r.useState(!0), [g, A] = r.useState(!1), [B, k] = r.useState(null), [w, q] = r.useState(0), v = r.useRef(null), [_, C] = r.useState({}), [S, z] = r.useState({}), j = r.useRef(null), p = r.useRef(85712.9), I = r.useMemo(() => b === "hyperliquid" ? 15 : b === "binance" ? 20 : 50, [b]), N = r.useCallback((e, t = 0.5) => {
    const n = [], c = [];
    for (let s = 0; s < 40; s++)
      n.push({ price: e - t / 2 - s * 0.5 * u, size: Math.random() * 5 + 0.1 }), c.push({ price: e + t / 2 + s * 0.5 * u, size: Math.random() * 5 + 0.1 });
    return { bids: n, asks: c, best_bid: e - t / 2, best_ask: e + t / 2, last_price: e };
  }, [u]), $ = r.useCallback(async () => {
    try {
      const e = await fetch(`/api/orderflow/dom?symbol=${encodeURIComponent(h)}&provider=${encodeURIComponent(b)}&grouping=${u * 0.1}&mode=${g ? "usd" : "coin"}`);
      if (!e.ok) throw new Error("no dom");
      const t = await e.json();
      if (!t.bids && !t.asks) throw new Error("empty");
      y(t), t.best_bid && t.best_ask ? p.current = (t.best_bid + t.best_ask) / 2 : t.last_price && (p.current = t.last_price), m && (t.best_bid && t.best_ask ? k((t.best_bid + t.best_ask) / 2) : t.last_price && k(t.last_price));
    } catch {
      try {
        const n = await fetch(`/api/orderflow/quote?symbol=${encodeURIComponent(h)}&provider=${encodeURIComponent(b)}`);
        if (n.ok) {
          const c = await n.json(), s = c.mid || c.last || p.current || 85712.9, o = c.spread || Math.max(s * 2e-4, 0.5);
          p.current = s;
          const l = N(s, o);
          y(l), m && k(s);
          return;
        }
      } catch {
      }
      const e = p.current || 85712.9 + (Math.random() - 0.5) * 100;
      p.current = e;
      const t = N(e, Math.max(e * 1e-3, 1));
      y(t), m && k(e);
    }
  }, [h, b, u, g, m, N]);
  r.useEffect(() => {
    $();
    const e = setInterval($, I);
    return () => clearInterval(e);
  }, [$, I]), r.useEffect(() => {
    let e = null;
    try {
      const n = location.protocol === "https:" ? "wss" : "ws";
      e = new WebSocket(`${n}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(h)}&provider=${encodeURIComponent(b)}`), e.onmessage = (c) => {
        try {
          const s = JSON.parse(c.data);
          if (s.type === "trade") {
            const o = s.event, l = o.price?.toFixed(1) || "";
            if (!l) return;
            o.side === "BUY" || o.side === "B" ? C((d) => ({ ...d, [l]: (d[l] || 0) + (o.size || 0) })) : z((d) => ({ ...d, [l]: (d[l] || 0) + (o.size || 0) }));
          }
        } catch {
        }
      };
    } catch {
    }
    const t = setInterval(() => {
      C((n) => {
        const c = {};
        for (const s in n) {
          const o = n[s] * 0.85;
          o > 1e-3 && (c[s] = o);
        }
        return c;
      }), z((n) => {
        const c = {};
        for (const s in n) {
          const o = n[s] * 0.85;
          o > 1e-3 && (c[s] = o);
        }
        return c;
      });
    }, 5e3);
    return () => {
      try {
        e?.close();
      } catch {
      }
      clearInterval(t);
    };
  }, [h, b]);
  const P = r.useMemo(() => {
    if (!i) return [];
    const e = `${i.best_bid}-${i.best_ask}-${B}-${w}-${u}-${Object.keys(_).length}-${Object.keys(S).length}`;
    if (j.current && j.current.key === e) return j.current.rows;
    const t = i.bids || [], n = i.asks || [], c = B || (i.best_bid && i.best_ask ? (i.best_bid + i.best_ask) / 2 : t[0]?.price || n[0]?.price || 85712.9);
    if (!c) return [];
    const s = 0.1 * u, o = 30, l = [];
    let d = 0;
    [...t, ...n].forEach((f) => {
      f.size > d && (d = f.size);
    }), d = d || 1;
    for (let f = o; f >= -o; f--) {
      const x = c + f * s + w * s, R = t.find((M) => Math.abs(M.price - x) < s * 0.6), U = n.find((M) => Math.abs(M.price - x) < s * 0.6), D = x.toFixed(1), F = _[D] || 0, Q = S[D] || 0, Y = !!i.best_bid && !!i.best_ask && Math.abs(x - i.best_bid) < s * 0.6 || Math.abs(x - i.best_ask) < s * 0.6 || Math.abs(x - c) < s * 0.3;
      l.push({
        price: x,
        bidSize: R?.size || 0,
        askSize: U?.size || 0,
        buyQty: F,
        sellQty: Q,
        delta: F - Q,
        depth: (R?.size || U?.size || 0) / d,
        isBestBid: !!i.best_bid && Math.abs(x - i.best_bid) < s * 0.6,
        isBestAsk: !!i.best_ask && Math.abs(x - i.best_ask) < s * 0.6,
        isCenter: Math.abs(f) < 0.6,
        isBBO: Y && (Math.abs(x - (i.best_bid || 0)) < s * 0.6 || Math.abs(x - (i.best_ask || 0)) < s * 0.6)
      });
    }
    const E = l.findIndex((f) => f.isCenter);
    return E >= 0 && (l[E].isBBO = !0), j.current = { key: e, rows: l }, l;
  }, [i, B, w, u, _, S]);
  return r.useEffect(() => {
    const e = v.current;
    if (!e) return;
    const t = (n) => {
      n.preventDefault(), n.shiftKey ? L((c) => Math.max(1, Math.min(100, c * (n.deltaY > 0 ? 1.2 : 0.8)))) : (q((c) => c + (n.deltaY > 0 ? 1 : -1)), O(!1));
    };
    return e.addEventListener("wheel", t, { passive: !1 }), () => e.removeEventListener("wheel", t);
  }, []), i ? /* @__PURE__ */ a.jsxs("div", { ref: v, className: "h-full flex flex-col bg-[#0a0e12] text-[#e9eff5] font-mono text-[11px] select-none", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "flex items-center gap-1 px-2 h-[32px] border-b border-[#1a1d25] bg-[#0a0e12] shrink-0", children: [
      /* @__PURE__ */ a.jsx("span", { className: "font-bold tracking-wider text-[11px]", children: "DOM" }),
      /* @__PURE__ */ a.jsx("span", { className: "font-medium text-[12px]", children: h.replace("USDT", "/USDT") }),
      /* @__PURE__ */ a.jsx("span", { className: "text-[#5f6f7c] text-[11px]", children: "✕" }),
      /* @__PURE__ */ a.jsx("button", { onClick: () => O((e) => !e), className: `ml-2 px-2 py-0.5 rounded text-[10px] border ${m ? "bg-[#1a1d25] text-[#e9eff5] border-[#2a2e39]" : "text-[#5f6f7c] border-transparent"}`, children: "Auto center" }),
      /* @__PURE__ */ a.jsxs("div", { className: "flex items-center gap-0.5 ml-1 px-1 py-0.5 rounded bg-[#05070a] border border-[#1a1d25]", children: [
        /* @__PURE__ */ a.jsx("button", { onClick: () => A(!1), className: `px-1.5 py-0.5 rounded text-[10px] ${g ? "text-[#5f6f7c]" : "bg-[#1a1d25] text-[#e9eff5]"}`, children: "Coin" }),
        /* @__PURE__ */ a.jsx("span", { className: "text-[#5f6f7c] text-[10px]", children: "/5m" })
      ] }),
      /* @__PURE__ */ a.jsx("button", { className: "ml-auto w-5 h-5 flex items-center justify-center rounded hover:bg-[#1a1d25] text-[#5f6f7c]", children: "⚙" })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "grid grid-cols-6 px-2 py-1.5 text-[10px] font-bold tracking-wider text-[#5f6f7c] uppercase border-b border-[#1a1d25] bg-[#0a0e12] shrink-0", children: [
      /* @__PURE__ */ a.jsx("span", { children: "BUYS" }),
      /* @__PURE__ */ a.jsx("span", { children: "BIDS" }),
      /* @__PURE__ */ a.jsx("span", { className: "text-center", children: "PRICE" }),
      /* @__PURE__ */ a.jsx("span", { className: "text-right", children: "ASKS" }),
      /* @__PURE__ */ a.jsx("span", { className: "text-right", children: "SELLS" }),
      /* @__PURE__ */ a.jsx("span", { className: "text-right", children: "DELTA" })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "flex-1 overflow-auto scrollbar-thin bg-[#0a0e12]", children: P.map((e, t) => /* @__PURE__ */ a.jsxs(
      "div",
      {
        className: `grid grid-cols-6 px-2 py-0.5 border-b border-[#0d1217] text-[11px] tabular-nums ${e.isBBO ? "bg-[#f6ff00] text-[#05070a] font-bold" : e.isCenter ? "bg-[#0d1217]" : "hover:bg-[#0d1217]"}`,
        children: [
          /* @__PURE__ */ a.jsx("span", { className: `${e.isBBO ? "text-[#05070a]" : e.buyQty ? "text-[#21b3a4]" : ""}`, children: e.buyQty ? e.buyQty.toFixed(3) : "" }),
          /* @__PURE__ */ a.jsxs("span", { className: "relative", children: [
            !e.isBBO && e.bidSize > 0 && /* @__PURE__ */ a.jsx("span", { className: "absolute inset-0 bg-[#21b3a4]/20 rounded", style: { width: `${e.depth * 100}%` } }),
            /* @__PURE__ */ a.jsx("span", { className: `relative ${e.isBBO ? "text-[#05070a]" : "text-[#98aab8]"}`, children: e.bidSize ? e.bidSize.toFixed(3) : "" })
          ] }),
          /* @__PURE__ */ a.jsx("span", { className: `text-center ${e.isBBO ? "text-[#05070a] font-bold" : "text-[#e9eff5]"}`, children: e.price.toFixed(1) }),
          /* @__PURE__ */ a.jsxs("span", { className: "relative text-right", children: [
            !e.isBBO && e.askSize > 0 && /* @__PURE__ */ a.jsx("span", { className: "absolute inset-0 bg-[#f0426c]/20 rounded right-0", style: { width: `${e.depth * 100}%`, left: "auto" } }),
            /* @__PURE__ */ a.jsx("span", { className: `relative ${e.isBBO ? "text-[#05070a]" : "text-[#98aab8]"}`, children: e.askSize ? e.askSize.toFixed(3) : e.isBBO ? "16.538" : "" })
          ] }),
          /* @__PURE__ */ a.jsx("span", { className: `text-right ${e.isBBO ? "text-[#05070a]" : e.sellQty ? "text-[#f0426c]" : ""}`, children: e.sellQty ? e.sellQty.toFixed(3) : "" }),
          /* @__PURE__ */ a.jsx("span", { className: `text-right ${e.isBBO ? "text-[#05070a]" : e.delta > 0 ? "text-[#21b3a4]" : e.delta < 0 ? "text-[#f0426c]" : "text-[#5f6f7c]"}`, children: e.delta ? e.delta > 0 ? `+${e.delta.toFixed(3)}` : e.delta.toFixed(3) : (e.isBBO, "") })
        ]
      },
      t
    )) })
  ] }) : /* @__PURE__ */ a.jsxs("div", { className: "p-4 text-[12px] text-[#5f6f7c] bg-[#0a0e12] h-full flex items-center justify-center font-mono", children: [
    "Loading DOM ",
    h,
    "..."
  ] });
}
export {
  K as EdgeDepthDOMPanel,
  K as default
};
