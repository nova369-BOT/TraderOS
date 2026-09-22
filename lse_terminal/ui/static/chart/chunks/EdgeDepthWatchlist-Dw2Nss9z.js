import { r as o, j as t } from "./react-vendor-C0yw3i6b.js";
const G = [
  { id: "", label: "All venues" },
  { id: "binancef", label: "Binance" },
  { id: "hl", label: "Hyperliquid" },
  { id: "coinbase", label: "Coinbase" }
], K = ["All", "AI", "DeFi", "L1", "L2", "Meme", "Perps", "Spot"], f = 36, I = 10;
function J({
  onSelectSymbol: O,
  activeSymbol: R
}) {
  const [b, $] = o.useState(""), [g, D] = o.useState("All"), [v, H] = o.useState(""), [i, _] = o.useState("volume"), [u, m] = o.useState(!0), [A, B] = o.useState(() => {
    try {
      const e = localStorage.getItem("ed_watchlist_favs");
      return new Set(e ? JSON.parse(e) : []);
    } catch {
      return /* @__PURE__ */ new Set();
    }
  }), [y, k] = o.useState([]), T = o.useRef([]), [F, P] = o.useState({}), S = o.useRef(null), [E, V] = o.useState(0), [q, M] = o.useState(600);
  o.useEffect(() => {
    T.current = y;
  }, [y]), o.useEffect(() => {
    try {
      localStorage.setItem("ed_watchlist_favs", JSON.stringify([...A]));
    } catch {
    }
  }, [A]), o.useEffect(() => {
    const e = S.current;
    if (!e) return;
    const l = new ResizeObserver((h) => {
      for (const n of h) M(n.contentRect.height);
    });
    return l.observe(e), M(e.clientHeight || 600), () => l.disconnect();
  }, []);
  const U = o.useCallback(() => {
    S.current && V(S.current.scrollTop);
  }, []);
  o.useEffect(() => {
    let e = !0;
    (async () => {
      try {
        const n = ["BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "DOGE", "AVAX", "DOT", "LINK", "LTC", "BCH", "UNI", "XLM", "ETC", "FIL", "TRX", "APT", "ARB", "OP", "MATIC", "ATOM", "NEAR", "FTM", "ALGO", "VET", "ICP", "AAVE", "MKR", "SAND", "MANA", "AXS", "THETA", "XTZ", "EOS", "FLOW", "KLAY", "HBAR", "EGLD", "KAVA", "ZEC", "DASH", "NEO", "WAVES", "CHZ", "ENJ", "BAT", "ZIL", "IOTA", "QTUM"], s = ["binancef", "hl", "coinbase"], d = ["L1", "DeFi", "AI", "Meme", "Perps", "Spot", "L2"], x = [];
        for (let r = 0; r < 1503; r++) {
          const c = n[r % n.length], p = s[r % s.length], a = `${c}${p === "binancef" ? "USDT" : "-USD"}`, C = d[r % d.length];
          x.push({ symbol: a, exchange: p, last_price: 100 + Math.random() * 5e4, change_pct_24h: (Math.random() - 0.5) * 20, volume_quote: Math.random() * 1e9, base_asset: c, categories: [C], score: Math.random() * 100, type: r % 3 === 0 ? "perps" : "spot" });
        }
        try {
          const r = await fetch("/api/orderflow/tickers?limit=1503");
          if (r.ok) {
            const c = await r.json();
            if (c.tickers?.length) {
              const p = c.tickers.slice(0, 1503).map((a) => ({
                symbol: a.symbol,
                exchange: a.exchange || "binancef",
                last_price: a.last_price || a.price || 0,
                change_pct_24h: a.change_pct_24h || a.change || 0,
                volume_quote: a.volume_quote || a.volume || 0,
                base_asset: a.base_asset || a.symbol?.split("USDT")[0] || a.symbol,
                categories: a.categories || ["Spot"],
                score: a.score || Math.random() * 100,
                type: a.type || "perps"
              }));
              if (e) {
                k(p);
                return;
              }
            }
          }
        } catch {
        }
        e && k(x);
      } catch {
      }
    })();
    const h = setInterval(() => {
      P((n) => {
        const s = { ...n };
        return T.current.slice(0, 400).forEach((x) => {
          const r = s[x.symbol] || [], p = (r[r.length - 1] || x.last_price) * (1 + (Math.random() - 0.5) * 2e-3);
          s[x.symbol] = [...r.slice(-29), p];
        }), s;
      });
    }, 2e3);
    return () => {
      e = !1, clearInterval(h);
    };
  }, []);
  const w = o.useMemo(() => {
    let e = y.filter((l) => !(v && l.exchange !== v || g !== "All" && !l.categories.includes(g) || b && !l.symbol.toLowerCase().includes(b.toLowerCase()) && !l.base_asset.toLowerCase().includes(b.toLowerCase())));
    return e.sort((l, h) => {
      if (i === "symbol") return u ? h.symbol.localeCompare(l.symbol) : l.symbol.localeCompare(h.symbol);
      let n = 0, s = 0;
      return i === "change" ? (n = l.change_pct_24h, s = h.change_pct_24h) : i === "volume" ? (n = l.volume_quote, s = h.volume_quote) : i === "price" && (n = l.last_price, s = h.last_price), u ? s - n : n - s;
    }), e;
  }, [y, v, g, b, i, u]), N = w.length, j = Math.max(0, Math.floor(E / f) - I), L = Math.min(N, Math.ceil((E + q) / f) + I), W = w.slice(j, L);
  return /* @__PURE__ */ t.jsxs("div", { className: "flex flex-col h-full bg-[#1c1c1c] text-[#e8e8e8] select-none", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0", children: [
      /* @__PURE__ */ t.jsx("span", { className: "text-[11px] font-semibold tracking-wider", children: "WATCHLIST" }),
      /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9]", children: [
        w.length,
        " / 1503"
      ] }),
      /* @__PURE__ */ t.jsx("span", { className: "ml-auto w-2 h-2 rounded-full bg-[#21b3a4] animate-pulse" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "p-2 border-b border-[#2a2a2a] space-y-2 bg-[#1c1c1c] shrink-0", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ t.jsx("span", { className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6a6a6a] text-[12px]", children: "⌕" }),
        /* @__PURE__ */ t.jsx("input", { placeholder: "Search pairs", value: b, onChange: (e) => $(e.target.value), className: "w-full pl-8 pr-2 py-2 rounded-lg bg-[#262626] border border-[#3a3a3a] text-[12px] text-[#e8e8e8] placeholder:text-[#6a6a6a] focus:outline-none focus:border-[#4a4a4a]" })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex gap-1.5", children: [
        /* @__PURE__ */ t.jsx("select", { value: g, onChange: (e) => D(e.target.value), className: "flex-1 px-2 py-1.5 rounded-md bg-[#262626] border border-[#3a3a3a] text-[11px] text-[#b9b9b9] focus:outline-none", children: K.map((e) => /* @__PURE__ */ t.jsx("option", { value: e, children: e }, e)) }),
        /* @__PURE__ */ t.jsx("select", { value: v, onChange: (e) => H(e.target.value), className: "flex-1 px-2 py-1.5 rounded-md bg-[#262626] border border-[#3a3a3a] text-[11px] text-[#b9b9b9] focus:outline-none", children: G.map((e) => /* @__PURE__ */ t.jsx("option", { value: e.id, children: e.label }, e.id)) })
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 text-[10px] font-semibold tracking-wider text-[#6a6a6a] uppercase border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0", children: [
      /* @__PURE__ */ t.jsx("span", { className: "w-6" }),
      /* @__PURE__ */ t.jsxs("button", { onClick: () => {
        i === "symbol" ? m(!u) : (_("symbol"), m(!1));
      }, className: `flex-1 text-left hover:text-[#e8e8e8] ${i === "symbol" ? "text-[#e8e8e8]" : ""}`, children: [
        "Symbol ",
        i === "symbol" ? u ? "▼" : "▲" : ""
      ] }),
      /* @__PURE__ */ t.jsx("button", { onClick: () => {
        i === "price" ? m(!u) : (_("price"), m(!0));
      }, className: `w-16 text-right hover:text-[#e8e8e8] ${i === "price" ? "text-[#e8e8e8]" : ""}`, children: "Last" }),
      /* @__PURE__ */ t.jsx("button", { onClick: () => {
        i === "change" ? m(!u) : (_("change"), m(!0));
      }, className: `w-14 text-right hover:text-[#e8e8e8] ${i === "change" ? "text-[#e8e8e8]" : ""}`, children: "24h%" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { ref: S, className: "flex-1 overflow-auto relative", onScroll: U, children: [
      /* @__PURE__ */ t.jsx("div", { style: { height: N * f, position: "relative" }, children: /* @__PURE__ */ t.jsx("div", { style: { transform: `translateY(${j * f}px)`, position: "absolute", top: 0, left: 0, right: 0 }, children: W.map((e, l) => {
        const h = A.has(e.symbol), n = R === e.symbol, s = F[e.symbol] || [], d = e.change_pct_24h >= 0;
        return /* @__PURE__ */ t.jsxs(
          "button",
          {
            onClick: () => O?.(e.symbol),
            className: `w-full flex items-center gap-2 px-3 border-b border-[#2a2a2a]/50 hover:bg-[#262626] text-left transition-colors ${n ? "bg-[#262626]" : ""}`,
            style: { height: f },
            children: [
              /* @__PURE__ */ t.jsx("span", { onClick: (x) => {
                x.stopPropagation(), B((r) => {
                  const c = new Set(r);
                  return c.has(e.symbol) ? c.delete(e.symbol) : c.add(e.symbol), c;
                });
              }, className: `w-5 h-5 flex items-center justify-center rounded ${h ? "text-[#e8e8e8]" : "text-[#3a3a3a] hover:text-[#b9b9b9]"} text-[12px]`, children: h ? "★" : "☆" }),
              /* @__PURE__ */ t.jsx("div", { className: "w-12 h-6 shrink-0", children: /* @__PURE__ */ t.jsx("svg", { width: 48, height: 24, viewBox: "0 0 48 24", className: "overflow-visible", children: s.length > 1 && /* @__PURE__ */ t.jsx("polyline", { fill: "none", stroke: d ? "#21b3a4" : "#f0426c", strokeWidth: 1.2, points: s.map((x, r) => {
                const c = Math.min(...s), a = Math.max(...s) - c || 1, C = r / (s.length - 1) * 48, X = 24 - (x - c) / a * 20 - 2;
                return `${C},${X}`;
              }).join(" ") }) }) }),
              /* @__PURE__ */ t.jsx("span", { className: "flex-1 truncate font-mono text-[12px] font-medium", children: e.base_asset }),
              /* @__PURE__ */ t.jsx("span", { className: "w-16 text-right font-mono tabular-nums text-[12px] text-[#b9b9b9]", children: e.last_price.toFixed(2) }),
              /* @__PURE__ */ t.jsxs("span", { className: `w-14 text-right font-mono tabular-nums text-[11px] font-medium ${d ? "text-[#21b3a4]" : "text-[#f0426c]"}`, children: [
                d ? "+" : "",
                e.change_pct_24h.toFixed(2),
                "%"
              ] })
            ]
          },
          `${e.exchange}:${e.symbol}:${j + l}`
        );
      }) }) }),
      N === 0 && /* @__PURE__ */ t.jsx("div", { className: "p-4 text-[12px] text-[#6a6a6a] text-center", children: "No matches" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "px-3 py-2 text-[10px] text-[#6a6a6a] border-t border-[#2a2a2a] bg-[#1c1c1c] shrink-0", children: [
      "Virtualized • ",
      N,
      " rows • Spark 30 samples • ",
      j,
      "-",
      L,
      " visible"
    ] })
  ] });
}
export {
  J as EdgeDepthWatchlist,
  J as default
};
