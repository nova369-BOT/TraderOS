import { r as n, j as t } from "./react-vendor-C0yw3i6b.js";
function S({ symbol: i, provider: r = "binance" }) {
  const [f, m] = n.useState([]), [b, j] = n.useState("all"), d = n.useRef(null), [s, u] = n.useState(!0);
  n.useEffect(() => {
    let e = !0;
    (async () => {
      try {
        const p = await fetch(`/api/orderflow/tape?symbol=${encodeURIComponent(i)}&provider=${encodeURIComponent(r)}&limit=500`);
        if (!p.ok) return;
        const o = await p.json();
        e && o.trades && m(o.trades.slice(-500).reverse());
      } catch {
      }
    })();
    const x = `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/api/orderflow/ws?symbol=${encodeURIComponent(i)}&provider=${encodeURIComponent(r)}`;
    let h = null;
    try {
      h = new WebSocket(x), h.onmessage = (p) => {
        try {
          const o = JSON.parse(p.data);
          if (o.type === "trade") {
            const l = o.event;
            m((y) => [...y, { price: l.price, size: l.size || l.qty || 0, side: l.side, ts: l.ts || Date.now() / 1e3 }].slice(-500));
          }
        } catch {
        }
      };
    } catch {
    }
    return () => {
      e = !1;
      try {
        h?.close();
      } catch {
      }
    };
  }, [i, r]), n.useEffect(() => {
    s && d.current && (d.current.scrollTop = d.current.scrollHeight);
  }, [f, s]);
  const g = f.filter((e) => b === "buy" ? e.side === "BUY" || e.side === "B" : b === "sell" ? e.side === "SELL" || e.side === "S" : !0), w = (e) => e > 10 ? 3 : e > 1 ? 2 : e > 0.1 ? 1 : 0;
  return /* @__PURE__ */ t.jsxs("div", { className: "h-full flex flex-col bg-[#2a2a2a] text-[#e8e8e8] font-mono text-[11px] select-none", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-1 px-2 py-1 border-b border-[#3a3a3a] text-[10px] shrink-0 bg-[#1c1c1c]", children: [
      /* @__PURE__ */ t.jsxs("span", { className: "font-bold tracking-wider", children: [
        "T ",
        i
      ] }),
      /* @__PURE__ */ t.jsxs("span", { className: "text-[9px] px-1 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[#b9b9b9]", children: [
        r.toUpperCase(),
        " • ",
        g.length,
        " prints"
      ] }),
      /* @__PURE__ */ t.jsx("div", { className: "flex items-center gap-0.5 ml-2 border border-[#3a3a3a] rounded overflow-hidden", children: ["all", "buy", "sell"].map((e) => /* @__PURE__ */ t.jsx("button", { onClick: () => j(e), className: `px-1.5 py-0.5 text-[9px] uppercase ${b === e ? "bg-[#d0d0d0] text-[#1c1c1c]" : "text-[#b9b9b9] hover:bg-[#343434]"}`, children: e }, e)) }),
      /* @__PURE__ */ t.jsx("button", { onClick: () => u((e) => !e), className: `ml-auto px-1.5 py-0.5 rounded border text-[9px] ${s ? "bg-[#21b3a4]/20 border-[#21b3a4]/50 text-[#21b3a4]" : "border-[#3a3a3a] text-[#b9b9b9]"}`, children: s ? "AUTO" : "FREE" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "grid grid-cols-3 px-2 py-1 text-[9px] text-[#b9b9b9] uppercase tracking-wider border-b border-[#3a3a3a] bg-[#262626] shrink-0", children: [
      /* @__PURE__ */ t.jsx("span", { children: "PRICE" }),
      /* @__PURE__ */ t.jsx("span", { className: "text-right", children: "QTY" }),
      /* @__PURE__ */ t.jsx("span", { className: "text-right", children: "TIME" })
    ] }),
    /* @__PURE__ */ t.jsx("div", { ref: d, className: "flex-1 overflow-auto", onScroll: (e) => {
      const a = e.currentTarget, c = a.scrollHeight - a.scrollTop - a.clientHeight < 20;
      s && !c && u(!1), !s && c && u(!0);
    }, children: g.slice().reverse().map((e, a) => {
      const c = e.side === "BUY" || e.side === "B", x = w(e.size);
      return /* @__PURE__ */ t.jsxs("div", { className: `grid grid-cols-3 px-2 py-0.5 border-b border-[#3a3a3a]/20 hover:bg-[#343434] ${x === 3 ? "bg-[#f0426c]/10 font-bold" : x === 2 ? "bg-[#f0426c]/5" : ""}`, children: [
        /* @__PURE__ */ t.jsx("span", { className: c ? "text-[#21b3a4]" : "text-[#f0426c]", children: e.price.toFixed(2) }),
        /* @__PURE__ */ t.jsx("span", { className: "text-right tabular-nums", children: e.size.toFixed(4) }),
        /* @__PURE__ */ t.jsx("span", { className: "text-right text-[#b9b9b9] text-[10px]", children: new Date(e.ts * 1e3).toLocaleTimeString() })
      ] }, a);
    }) }),
    /* @__PURE__ */ t.jsxs("div", { className: "px-2 py-1 text-[9px] text-[#b9b9b9] border-t border-[#3a3a3a] bg-[#1c1c1c] shrink-0", children: [
      "Whale detection 1-3 • large prints bubble on candles • ",
      r,
      " ",
      r === "hyperliquid" ? "15ms ⚡" : "20ms/50ms"
    ] })
  ] });
}
export {
  S as EdgeDepthTapePanel
};
