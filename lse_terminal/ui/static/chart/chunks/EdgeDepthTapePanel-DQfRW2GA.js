import { r as l, j as t } from "./react-vendor-C0yw3i6b.js";
function U({ symbol: x, provider: d = "binance" }) {
  const [u, h] = l.useState([]), [g, N] = l.useState("all"), f = l.useRef(null), [p, w] = l.useState(!0), b = l.useRef(5e4), y = l.useCallback((e, s = 500) => {
    const a = [];
    let n = e;
    const o = Date.now() / 1e3;
    for (let c = 0; c < s; c++) {
      n += (Math.random() - 0.5) * e * 5e-4;
      const r = Math.random() * 2 + 0.01;
      a.push({
        price: n,
        size: r,
        side: Math.random() > 0.5 ? "BUY" : "SELL",
        ts: o - (s - c) * 0.5,
        usd: n * r
      });
    }
    return a;
  }, []);
  l.useEffect(() => {
    let e = !0;
    (async () => {
      try {
        const n = await fetch(`/api/orderflow/tape?symbol=${encodeURIComponent(x)}&provider=${encodeURIComponent(d)}&limit=500`);
        if (!n.ok) throw new Error("no tape");
        const o = await n.json();
        if (!o.trades || o.trades.length === 0) throw new Error("empty");
        if (e) {
          const c = o.trades.slice(-500).reverse().map((r) => ({
            price: r.price,
            size: r.size || r.qty || 0,
            side: r.side,
            ts: r.ts || Date.now() / 1e3,
            usd: r.price * (r.size || r.qty || 0)
          }));
          h(c), c.length && (b.current = c[c.length - 1].price);
        }
      } catch {
        try {
          const n = await fetch(`/api/orderflow/quote?symbol=${encodeURIComponent(x)}&provider=${encodeURIComponent(d)}`);
          if (n.ok) {
            const o = await n.json(), c = o.mid || o.last || b.current;
            b.current = c, e && h(y(c, 500));
            return;
          }
        } catch {
        }
        e && h(y(b.current || 5e4, 500));
      }
    })();
    let a = null;
    try {
      const o = `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(x)}&provider=${encodeURIComponent(d)}`;
      a = new WebSocket(o), a.onmessage = (c) => {
        try {
          const r = JSON.parse(c.data);
          if (r.type === "trade") {
            const i = r.event, v = { price: i.price, size: i.size || i.qty || 0, side: i.side, ts: i.ts || Date.now() / 1e3, usd: i.price * (i.size || i.qty || 0) };
            b.current = v.price, h((E) => [...E, v].slice(-500));
          }
        } catch {
        }
      }, a.onerror = () => {
        try {
          a?.close();
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
  }, [x, d, y]), l.useEffect(() => {
    p && f.current && (f.current.scrollTop = f.current.scrollHeight);
  }, [u, p]);
  const j = u.filter((e) => g === "buy" ? e.side === "BUY" || e.side === "B" : g === "sell" ? e.side === "SELL" || e.side === "S" : !0), m = u.length ? u.reduce((e, s) => e + (s.usd || s.price * s.size), 0) / u.length : 1e3, k = (e) => {
    const s = e.usd || e.price * e.size;
    return s > m * 10 ? 3 : s > m * 3 ? 2 : s > m * 1.5 ? 1 : 0;
  };
  return /* @__PURE__ */ t.jsxs("div", { className: "h-full flex flex-col bg-[#2a2a2a] text-[#e8e8e8] font-mono text-[11px] select-none", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-1 px-2 py-1 border-b border-[#3a3a3a] text-[10px] shrink-0 bg-[#1c1c1c]", children: [
      /* @__PURE__ */ t.jsxs("span", { className: "font-bold tracking-wider", children: [
        "T ",
        x
      ] }),
      /* @__PURE__ */ t.jsxs("span", { className: "text-[9px] px-1 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[#b9b9b9]", children: [
        d.toUpperCase(),
        " • ",
        j.length,
        " prints • avg $",
        m.toFixed(0)
      ] }),
      /* @__PURE__ */ t.jsx("div", { className: "flex items-center gap-0.5 ml-2 border border-[#3a3a3a] rounded overflow-hidden", children: ["all", "buy", "sell"].map((e) => /* @__PURE__ */ t.jsx("button", { onClick: () => N(e), className: `px-1.5 py-0.5 text-[9px] uppercase ${g === e ? "bg-[#d0d0d0] text-[#1c1c1c]" : "text-[#b9b9b9] hover:bg-[#343434]"}`, children: e }, e)) }),
      /* @__PURE__ */ t.jsx("button", { onClick: () => w((e) => !e), className: `ml-auto px-1.5 py-0.5 rounded border text-[9px] ${p ? "bg-[#21b3a4]/20 border-[#21b3a4]/50 text-[#21b3a4]" : "border-[#3a3a3a] text-[#b9b9b9]"}`, children: p ? "AUTO" : "FREE" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "grid grid-cols-3 px-2 py-1 text-[9px] text-[#b9b9b9] uppercase tracking-wider border-b border-[#3a3a3a] bg-[#262626] shrink-0", children: [
      /* @__PURE__ */ t.jsx("span", { children: "PRICE" }),
      /* @__PURE__ */ t.jsx("span", { className: "text-right", children: "QTY" }),
      /* @__PURE__ */ t.jsx("span", { className: "text-right", children: "TIME" })
    ] }),
    /* @__PURE__ */ t.jsx("div", { ref: f, className: "flex-1 overflow-auto", onScroll: (e) => {
      const s = e.currentTarget, a = s.scrollHeight - s.scrollTop - s.clientHeight < 20;
      p && !a && w(!1), !p && a && w(!0);
    }, children: j.slice().reverse().map((e, s) => {
      const a = e.side === "BUY" || e.side === "B", n = k(e);
      return /* @__PURE__ */ t.jsxs("div", { className: `grid grid-cols-3 px-2 py-0.5 border-b border-[#3a3a3a]/20 hover:bg-[#343434] ${n === 3 ? "bg-[#f0426c]/10 font-bold" : n === 2 ? "bg-[#f0426c]/5" : ""}`, children: [
        /* @__PURE__ */ t.jsx("span", { className: a ? "text-[#21b3a4]" : "text-[#f0426c]", children: e.price.toFixed(2) }),
        /* @__PURE__ */ t.jsxs("span", { className: "text-right tabular-nums", children: [
          e.size.toFixed(4),
          " ",
          /* @__PURE__ */ t.jsxs("span", { className: "text-[9px] text-[#b9b9b9]", children: [
            "$",
            (e.usd || e.price * e.size).toFixed(0)
          ] })
        ] }),
        /* @__PURE__ */ t.jsx("span", { className: "text-right text-[#b9b9b9] text-[10px]", children: new Date(e.ts * 1e3).toLocaleTimeString() })
      ] }, s);
    }) }),
    /* @__PURE__ */ t.jsxs("div", { className: "px-2 py-1 text-[9px] text-[#b9b9b9] border-t border-[#3a3a3a] bg-[#1c1c1c] shrink-0", children: [
      "Whale relative: >1.5x avg, >3x avg, >10x avg • synthetic fallback 500 prints • ",
      d,
      " ",
      d === "hyperliquid" ? "15ms ⚡" : "20ms/50ms"
    ] })
  ] });
}
export {
  U as EdgeDepthTapePanel,
  U as default
};
