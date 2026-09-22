import { r as p, j as e } from "./react-vendor-C0yw3i6b.js";
const F = [
  { id: "dom", label: "DOM", desc: "Ladder grouping USD/coin + trade columns" },
  { id: "tape", label: "Tape", desc: "Time & Sales size highlighting" },
  { id: "footprint", label: "Footprint", desc: "Per-price per-minute buy/sell delta imbalance" },
  { id: "vpvr", label: "VPVR", desc: "Volume Profile POC/VAH/VAL" },
  { id: "tpo", label: "TPO", desc: "Market Profile 30m sessions" },
  { id: "cvd", label: "CVD", desc: "Cumulative Volume Delta" },
  { id: "liquidations", label: "Liq Field", desc: "Modelled + real liquidation levels" },
  { id: "full", label: "Full", desc: "All orderflow combined" }
];
function $(s, a, i, r = 2e3) {
  const [t, d] = p.useState(null), [o, c] = p.useState(!0), [b, u] = p.useState(null), h = p.useRef(null), m = p.useCallback(async () => {
    if (!s) return;
    const l = a ? `&provider=${encodeURIComponent(a)}` : "";
    let n = "";
    switch (i) {
      case "dom":
        n = `/api/orderflow/dom?symbol=${encodeURIComponent(s)}${l}&grouping=0.5&mode=usd`;
        break;
      case "tape":
        n = `/api/orderflow/tape?symbol=${encodeURIComponent(s)}${l}&limit=100`;
        break;
      case "footprint":
        n = `/api/orderflow/footprint?symbol=${encodeURIComponent(s)}${l}`;
        break;
      case "vpvr":
        n = `/api/orderflow/volume_profile?symbol=${encodeURIComponent(s)}${l}`;
        break;
      case "tpo":
        n = `/api/orderflow/tpo?symbol=${encodeURIComponent(s)}${l}`;
        break;
      case "cvd":
        n = `/api/orderflow/cvd?symbol=${encodeURIComponent(s)}${l}`;
        break;
      case "liquidations":
        n = `/api/orderflow/liquidations?symbol=${encodeURIComponent(s)}${l}`;
        break;
      case "full":
        n = `/api/orderflow/full?symbol=${encodeURIComponent(s)}${l}`;
        break;
    }
    try {
      const x = await fetch(n);
      if (!x.ok) throw new Error(`HTTP ${x.status}`);
      const f = await x.json();
      d(f), u(null);
    } catch (x) {
      u(String(x.message || x));
    } finally {
      c(!1);
    }
  }, [s, a, i]);
  return p.useEffect(() => (c(!0), m(), h.current = setInterval(m, r), () => clearInterval(h.current)), [m, r]), { data: t, loading: o, error: b, refresh: m };
}
function v({ data: s }) {
  if (!s) return /* @__PURE__ */ e.jsx("div", { className: "p-2 text-xs opacity-60", children: "No DOM data" });
  const a = s.bids || s.ladder?.bids || [], i = s.asks || s.ladder?.asks || [], r = s.best_bid || s.bestBid || 0, t = s.best_ask || s.bestAsk || 0, d = s.mid || (r && t ? (r + t) / 2 : 0);
  return /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col h-full text-[11px] font-mono", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between p-1 border-b border-border/40 text-[10px] opacity-70", children: [
      /* @__PURE__ */ e.jsxs("span", { children: [
        "BID ",
        r?.toFixed?.(2)
      ] }),
      /* @__PURE__ */ e.jsxs("span", { children: [
        "MID ",
        d?.toFixed?.(2)
      ] }),
      /* @__PURE__ */ e.jsxs("span", { children: [
        "ASK ",
        t?.toFixed?.(2)
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "flex-1 overflow-auto", children: /* @__PURE__ */ e.jsxs("div", { className: "grid grid-cols-2 gap-0", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("div", { className: "sticky top-0 bg-card/90 backdrop-blur px-1 py-0.5 text-[9px] opacity-60", children: "ASKS" }),
        i.slice(0, 30).reverse().map((o, c) => /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between px-1 py-0.5 hover:bg-muted/20 border-b border-border/10", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-rose-400", children: Number(o.price || o[0]).toFixed(2) }),
          /* @__PURE__ */ e.jsx("span", { children: Number(o.qty || o.size || o[1]).toFixed(4) }),
          /* @__PURE__ */ e.jsx("span", { className: "opacity-60", children: o.total_usd ? `$${(o.total_usd / 1e3).toFixed(1)}k` : "" })
        ] }, c))
      ] }),
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("div", { className: "sticky top-0 bg-card/90 backdrop-blur px-1 py-0.5 text-[9px] opacity-60", children: "BIDS" }),
        a.slice(0, 30).map((o, c) => /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between px-1 py-0.5 hover:bg-muted/20 border-b border-border/10", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-emerald-400", children: Number(o.price || o[0]).toFixed(2) }),
          /* @__PURE__ */ e.jsx("span", { children: Number(o.qty || o.size || o[1]).toFixed(4) }),
          /* @__PURE__ */ e.jsx("span", { className: "opacity-60", children: o.total_usd ? `$${(o.total_usd / 1e3).toFixed(1)}k` : "" })
        ] }, c))
      ] })
    ] }) })
  ] });
}
function N({ data: s }) {
  const a = s?.trades || s?.tape || [];
  return /* @__PURE__ */ e.jsxs("div", { className: "h-full overflow-auto text-[11px] font-mono", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "grid grid-cols-4 sticky top-0 bg-card px-1 py-0.5 text-[9px] opacity-60 border-b border-border/40", children: [
      /* @__PURE__ */ e.jsx("span", { children: "TIME" }),
      /* @__PURE__ */ e.jsx("span", { children: "PRICE" }),
      /* @__PURE__ */ e.jsx("span", { children: "SIZE" }),
      /* @__PURE__ */ e.jsx("span", { children: "SIDE" })
    ] }),
    a.map((i, r) => {
      const t = i.highlight || 0, d = t === 3 ? "bg-amber-500/20" : t === 2 ? "bg-amber-500/10" : t === 1 ? "bg-muted/30" : "", o = i.is_buy ?? i.side === "BUY" ?? i.side === "B";
      return /* @__PURE__ */ e.jsxs("div", { className: `grid grid-cols-4 px-1 py-0.5 border-b border-border/10 ${d}`, children: [
        /* @__PURE__ */ e.jsx("span", { className: "opacity-60", children: new Date(i.timestamp_ms || i.ts * 1e3).toLocaleTimeString() }),
        /* @__PURE__ */ e.jsx("span", { className: o ? "text-emerald-400" : "text-rose-400", children: Number(i.price).toFixed(2) }),
        /* @__PURE__ */ e.jsx("span", { className: t ? "font-bold" : "", children: Number(i.qty || i.size).toFixed(4) }),
        /* @__PURE__ */ e.jsx("span", { children: o ? "BUY" : "SELL" })
      ] }, r);
    })
  ] });
}
function g({ data: s }) {
  const a = s?.columns || s?.footprint?.columns || [];
  return a.length ? /* @__PURE__ */ e.jsx("div", { className: "h-full overflow-auto text-[10px] font-mono", children: /* @__PURE__ */ e.jsx("div", { className: "flex gap-1 p-1", children: a.slice(-12).map((i, r) => /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col border border-border/20 min-w-[60px]", children: [
    /* @__PURE__ */ e.jsx("div", { className: "text-[8px] px-1 py-0.5 bg-muted/20", children: new Date(i.timestamp_ms || i.ts * 1e3).toLocaleTimeString() }),
    (i.levels || []).slice(0, 20).map((t, d) => {
      const o = (t.buy || 0) - (t.sell || 0), c = t.imbalance || (t.buy > t.sell * 1.5 ? "buy" : t.sell > t.buy * 1.5 ? "sell" : "");
      return /* @__PURE__ */ e.jsxs("div", { className: `flex justify-between px-1 ${c === "buy" ? "bg-emerald-500/15" : c === "sell" ? "bg-rose-500/15" : ""} ${t.is_poc ? "ring-1 ring-amber-400/50" : ""}`, children: [
        /* @__PURE__ */ e.jsx("span", { className: o > 0 ? "text-emerald-400" : "text-rose-400", children: t.price?.toFixed?.(1) || t.price }),
        /* @__PURE__ */ e.jsx("span", { children: o > 0 ? `+${o.toFixed(2)}` : o.toFixed(2) })
      ] }, d);
    })
  ] }, r)) }) }) : /* @__PURE__ */ e.jsx("div", { className: "p-2 text-xs opacity-60", children: "No footprint yet — waiting for trades" });
}
function y({ data: s }) {
  const a = s?.levels || s?.volume_profile?.levels || [];
  if (!a.length) return /* @__PURE__ */ e.jsx("div", { className: "p-2 text-xs opacity-60", children: "No VPVR yet" });
  const i = Math.max(...a.map((r) => r.total || r.volume || 0), 1);
  return /* @__PURE__ */ e.jsx("div", { className: "h-full overflow-auto text-[10px] font-mono p-1", children: a.map((r, t) => {
    const d = r.total || r.volume || 0, o = d / i * 100;
    return /* @__PURE__ */ e.jsxs("div", { className: `flex items-center gap-1 py-0.5 ${r.is_poc ? "bg-amber-500/20 font-bold" : ""} ${r.in_value_area ? "bg-muted/20" : ""}`, children: [
      /* @__PURE__ */ e.jsx("span", { className: "w-16 text-right", children: Number(r.price).toFixed(2) }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex-1 h-2 bg-muted/20 relative overflow-hidden", children: [
        /* @__PURE__ */ e.jsx("div", { className: "absolute top-0 left-0 h-full bg-sky-500/40", style: { width: `${o}%` } }),
        /* @__PURE__ */ e.jsx("div", { className: "absolute top-0 left-0 h-full bg-emerald-500/30", style: { width: `${(r.buy || 0) / i * 100}%` } })
      ] }),
      /* @__PURE__ */ e.jsx("span", { className: "w-12 text-right opacity-70", children: d.toFixed(2) }),
      r.is_poc && /* @__PURE__ */ e.jsx("span", { className: "text-[8px] bg-amber-500 text-black px-1 rounded", children: "POC" }),
      r.is_vah && /* @__PURE__ */ e.jsx("span", { className: "text-[8px] bg-sky-500/30 px-1 rounded", children: "VAH" }),
      r.is_val && /* @__PURE__ */ e.jsx("span", { className: "text-[8px] bg-sky-500/30 px-1 rounded", children: "VAL" })
    ] }, t);
  }) });
}
function k({ data: s }) {
  const a = s?.sessions || s?.tpo?.sessions || [];
  return a.length ? /* @__PURE__ */ e.jsx("div", { className: "h-full overflow-auto text-[10px] font-mono p-1 space-y-3", children: a.slice(-3).map((i, r) => /* @__PURE__ */ e.jsxs("div", { className: "border border-border/20", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "px-2 py-1 bg-muted/20 flex justify-between text-[9px]", children: [
      /* @__PURE__ */ e.jsxs("span", { children: [
        "Session ",
        new Date(i.start_ms || i.start * 1e3).toLocaleDateString()
      ] }),
      /* @__PURE__ */ e.jsxs("span", { children: [
        "POC ",
        i.poc?.toFixed?.(2),
        " | VA ",
        i.vah?.toFixed?.(2),
        "-",
        i.val?.toFixed?.(2)
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "p-1", children: (i.rows || []).slice(0, 30).map((t, d) => /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ e.jsx("span", { className: "w-14 text-right", children: Number(t.price).toFixed(2) }),
      /* @__PURE__ */ e.jsx("span", { className: "flex gap-px", children: (t.blocks || t.tpos || "").toString().split("").map((o, c) => /* @__PURE__ */ e.jsx("span", { className: "w-2 h-2 bg-sky-500/60 inline-block text-[6px] text-center", children: o }, c)) }),
      t.is_poc && /* @__PURE__ */ e.jsx("span", { className: "text-amber-400", children: "*" })
    ] }, d)) })
  ] }, r)) }) : /* @__PURE__ */ e.jsx("div", { className: "p-2 text-xs opacity-60", children: "No TPO sessions — need 30m candles" });
}
function w({ data: s }) {
  const a = s?.bars || s?.cvd?.bars || [], i = s?.points || s?.cvd?.points || [];
  if (!a.length && !i.length) return /* @__PURE__ */ e.jsx("div", { className: "p-2 text-xs opacity-60", children: "No CVD yet" });
  const r = a[a.length - 1];
  return /* @__PURE__ */ e.jsxs("div", { className: "h-full overflow-auto text-[11px] font-mono p-2", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "mb-2 p-2 bg-muted/20 rounded flex justify-between", children: [
      /* @__PURE__ */ e.jsxs("span", { children: [
        "CVD: ",
        /* @__PURE__ */ e.jsx("span", { className: (r?.cvd || 0) >= 0 ? "text-emerald-400" : "text-rose-400", children: r?.cvd?.toFixed?.(2) || "0" })
      ] }),
      /* @__PURE__ */ e.jsxs("span", { children: [
        "Delta: ",
        (r?.delta || 0).toFixed(2)
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "space-y-0.5 max-h-[300px] overflow-auto", children: a.slice(-50).map((t, d) => /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between border-b border-border/10 py-0.5", children: [
      /* @__PURE__ */ e.jsx("span", { className: "opacity-60", children: new Date(t.timestamp_ms || t.ts * 1e3).toLocaleTimeString() }),
      /* @__PURE__ */ e.jsx("span", { className: t.delta >= 0 ? "text-emerald-400" : "text-rose-400", children: t.delta?.toFixed(2) }),
      /* @__PURE__ */ e.jsx("span", { children: t.cvd?.toFixed(2) })
    ] }, d)) })
  ] });
}
function V({ data: s }) {
  const a = s?.field || s?.liquidations?.field || s?.liquidations || {}, i = a?.bands || s?.bands || [], r = s?.levels || a?.levels || [];
  return /* @__PURE__ */ e.jsxs("div", { className: "h-full overflow-auto text-[11px] font-mono p-1", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "mb-2 text-[9px] opacity-60", children: [
      "Total Long Risk: $",
      (a?.total_long_risk || 0).toFixed(0),
      " | Short: $",
      (a?.total_short_risk || 0).toFixed(0),
      " | Net Bias: ",
      (a?.net_bias || 0).toFixed(2)
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("div", { className: "text-[9px] opacity-60 mb-1", children: "Modelled Bands (800 x 0.05%)" }),
        i.slice(0, 40).map((t, d) => /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between py-0.5 border-b border-border/10", children: [
          /* @__PURE__ */ e.jsx("span", { children: Number(t.price).toFixed(2) }),
          /* @__PURE__ */ e.jsx("span", { className: t.side === "long" ? "text-emerald-400" : "text-rose-400", children: t.side }),
          /* @__PURE__ */ e.jsxs("span", { className: "opacity-60", children: [
            (t.intensity * 100).toFixed(1),
            "%"
          ] }),
          /* @__PURE__ */ e.jsxs("span", { className: "text-[9px]", children: [
            (t.reach_prob * 100).toFixed(0),
            "% reach"
          ] })
        ] }, d))
      ] }),
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("div", { className: "text-[9px] opacity-60 mb-1", children: "Real Levels (forceOrder)" }),
        r.slice(0, 30).map((t, d) => /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between py-0.5 border-b border-border/10", children: [
          /* @__PURE__ */ e.jsx("span", { children: Number(t.price).toFixed(2) }),
          /* @__PURE__ */ e.jsx("span", { className: t.side === "long" ? "text-emerald-400" : "text-rose-400", children: t.side }),
          /* @__PURE__ */ e.jsxs("span", { children: [
            "$",
            (t.notional_usd || 0).toFixed(0)
          ] }),
          /* @__PURE__ */ e.jsx("span", { className: "text-[8px] opacity-60", children: t.type })
        ] }, d))
      ] })
    ] })
  ] });
}
function _({ symbol: s, provider: a, colors: i }) {
  const [r, t] = p.useState("full"), d = a || "binance", { data: o, loading: c, error: b } = $(s, d, r, r === "full" ? 1e3 : 2e3), [u, h] = p.useState(null), m = p.useRef(null);
  p.useEffect(() => {
    if (r !== "full") return;
    const n = location.protocol === "https:" ? "wss" : "ws", x = new WebSocket(`${n}://${location.host}/api/orderflow/full/ws?symbol=${encodeURIComponent(s)}&provider=${encodeURIComponent(d)}`);
    return m.current = x, x.onmessage = (f) => {
      try {
        const j = JSON.parse(f.data);
        j.type === "orderflow" && h(j);
      } catch {
      }
    }, () => {
      try {
        x.close();
      } catch {
      }
    };
  }, [s, d, r]);
  const l = u || o;
  return /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col h-full bg-[#0b0e11] text-[#d1d4dc] border border-border/40 rounded overflow-hidden", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-1 p-1 border-b border-border/30 bg-[#111418] overflow-x-auto", children: [
      /* @__PURE__ */ e.jsx("span", { className: "text-[10px] font-mono font-bold mr-2 px-1", children: "ORDERFLOW" }),
      /* @__PURE__ */ e.jsxs("span", { className: "text-[9px] opacity-60 mr-2", children: [
        s,
        " • ",
        d.toUpperCase(),
        " ",
        d === "hyperliquid" ? "⚡15ms" : d === "binance" ? "⚡20ms" : "50ms"
      ] }),
      F.map((n) => /* @__PURE__ */ e.jsx(
        "button",
        {
          onClick: () => t(n.id),
          title: n.desc,
          className: `px-2 py-0.5 text-[10px] rounded border transition-colors ${r === n.id ? "bg-[#2962ff] text-white border-[#2962ff]" : "bg-transparent border-border/30 hover:bg-muted/20 text-muted-foreground"}`,
          children: n.label
        },
        n.id
      ))
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "flex-1 min-h-0 relative", children: [
      c && !l && /* @__PURE__ */ e.jsxs("div", { className: "absolute inset-0 flex items-center justify-center text-xs opacity-60", children: [
        "Loading ",
        r,
        "..."
      ] }),
      b && /* @__PURE__ */ e.jsx("div", { className: "absolute top-0 left-0 right-0 bg-rose-500/10 text-rose-300 text-[10px] p-1", children: b }),
      r === "dom" && /* @__PURE__ */ e.jsx(v, { data: l }),
      r === "tape" && /* @__PURE__ */ e.jsx(N, { data: l }),
      r === "footprint" && /* @__PURE__ */ e.jsx(g, { data: l }),
      r === "vpvr" && /* @__PURE__ */ e.jsx(y, { data: l }),
      r === "tpo" && /* @__PURE__ */ e.jsx(k, { data: l }),
      r === "cvd" && /* @__PURE__ */ e.jsx(w, { data: l }),
      r === "liquidations" && /* @__PURE__ */ e.jsx(V, { data: l }),
      r === "full" && l && /* @__PURE__ */ e.jsxs("div", { className: "grid grid-cols-2 grid-rows-2 h-full gap-px bg-border/20", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "bg-[#0b0e11] overflow-auto", children: [
          /* @__PURE__ */ e.jsx("div", { className: "text-[9px] p-1 opacity-60 border-b border-border/20", children: "DOM LADDER" }),
          /* @__PURE__ */ e.jsx(v, { data: l.dom || l })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "bg-[#0b0e11] overflow-auto", children: [
          /* @__PURE__ */ e.jsx("div", { className: "text-[9px] p-1 opacity-60 border-b border-border/20", children: "TAPE" }),
          /* @__PURE__ */ e.jsx(N, { data: l.tape || l })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "bg-[#0b0e11] overflow-auto", children: [
          /* @__PURE__ */ e.jsx("div", { className: "text-[9px] p-1 opacity-60 border-b border-border/20", children: "FOOTPRINT" }),
          /* @__PURE__ */ e.jsx(g, { data: l.footprint || l })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "bg-[#0b0e11] overflow-auto", children: [
          /* @__PURE__ */ e.jsx("div", { className: "text-[9px] p-1 opacity-60 border-b border-border/20", children: "VPVR + CVD" }),
          /* @__PURE__ */ e.jsx(y, { data: l.volume_profile || l }),
          /* @__PURE__ */ e.jsx(w, { data: l.cvd || l })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "p-1 border-t border-border/20 text-[8px] opacity-50 flex justify-between", children: [
      /* @__PURE__ */ e.jsx("span", { children: "EdgeDepth Terminal Replica • DOM USD/coin grouping • Footprint delta imbalance • VPVR POC/VAH/VAL • TPO 30m • CVD • Liq Field 800 bands" }),
      /* @__PURE__ */ e.jsx("span", { children: "L2/L3: binance coinbase hyperliquid • GPU heatmap existing" })
    ] })
  ] });
}
export {
  _ as default
};
