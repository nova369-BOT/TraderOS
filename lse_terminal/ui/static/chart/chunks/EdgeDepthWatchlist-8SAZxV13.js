import { r, j as t } from "./react-vendor-C0yw3i6b.js";
const X = [
  { id: "", label: "All venues" },
  { id: "binancef", label: "Binance" },
  { id: "hl", label: "Hyperliquid" },
  { id: "coinbase", label: "Coinbase" }
], G = ["All", "AI", "DeFi", "L1", "L2", "Meme", "Perps", "Spot"], f = 36, I = 10;
function Z({
  onSelectSymbol: O,
  activeSymbol: R
}) {
  const [b, $] = r.useState(""), [g, D] = r.useState("All"), [v, H] = r.useState(""), [c, j] = r.useState("volume"), [u, m] = r.useState(!0), [_, B] = r.useState(() => {
    try {
      const e = localStorage.getItem("ed_watchlist_favs");
      return new Set(e ? JSON.parse(e) : []);
    } catch {
      return /* @__PURE__ */ new Set();
    }
  }), [y, k] = r.useState([]), T = r.useRef([]), [F, P] = r.useState({}), S = r.useRef(null), [E, V] = r.useState(0), [q, M] = r.useState(600);
  r.useEffect(() => {
    T.current = y;
  }, [y]), r.useEffect(() => {
    try {
      localStorage.setItem("ed_watchlist_favs", JSON.stringify([..._]));
    } catch {
    }
  }, [_]), r.useEffect(() => {
    const e = S.current;
    if (!e) return;
    const l = new ResizeObserver((i) => {
      for (const a of i) M(a.contentRect.height);
    });
    return l.observe(e), M(e.clientHeight || 600), () => l.disconnect();
  }, []);
  const U = r.useCallback(() => {
    S.current && V(S.current.scrollTop);
  }, []);
  r.useEffect(() => {
    let e = !0;
    (async () => {
      try {
        const a = ["BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "DOGE", "AVAX", "DOT", "LINK", "LTC", "BCH", "UNI", "XLM", "ETC", "FIL", "TRX", "APT", "ARB", "OP", "MATIC", "ATOM", "NEAR", "FTM", "ALGO", "VET", "ICP", "AAVE", "MKR", "SAND", "MANA", "AXS", "THETA", "XTZ", "EOS", "FLOW", "KLAY", "HBAR", "EGLD", "KAVA", "ZEC", "DASH", "NEO", "WAVES", "CHZ", "ENJ", "BAT", "ZIL", "IOTA", "QTUM"], n = ["binancef", "hl", "coinbase"], d = ["L1", "DeFi", "AI", "Meme", "Perps", "Spot", "L2"], h = [];
        for (let s = 0; s < 1503; s++) {
          const p = a[s % a.length], x = n[s % n.length], o = `${p}${x === "binancef" ? "USDT" : "-USD"}`, C = d[s % d.length];
          h.push({ symbol: `${o}-${s}`, exchange: x, last_price: 100 + Math.random() * 5e4, change_pct_24h: (Math.random() - 0.5) * 20, volume_quote: Math.random() * 1e9, base_asset: p, categories: [C], score: Math.random() * 100, type: s % 3 === 0 ? "perps" : "spot" });
        }
        try {
          const s = await fetch("/api/orderflow/tickers?limit=1503");
          if (s.ok) {
            const p = await s.json();
            if (p.tickers?.length) {
              const x = p.tickers.slice(0, 1503).map((o) => ({
                symbol: o.symbol,
                exchange: o.exchange || "binancef",
                last_price: o.last_price || o.price || 0,
                change_pct_24h: o.change_pct_24h || o.change || 0,
                volume_quote: o.volume_quote || o.volume || 0,
                base_asset: o.base_asset || o.symbol?.split("USDT")[0] || o.symbol,
                categories: o.categories || ["Spot"],
                score: o.score || Math.random() * 100,
                type: o.type || "perps"
              }));
              if (e) {
                k(x);
                return;
              }
            }
          }
        } catch {
        }
        e && k(h);
      } catch {
      }
    })();
    const i = setInterval(() => {
      P((a) => {
        const n = { ...a };
        return T.current.slice(0, 400).forEach((h) => {
          const s = n[h.symbol] || [], x = (s[s.length - 1] || h.last_price) * (1 + (Math.random() - 0.5) * 2e-3);
          n[h.symbol] = [...s.slice(-29), x];
        }), n;
      });
    }, 2e3);
    return () => {
      e = !1, clearInterval(i);
    };
  }, []);
  const A = r.useMemo(() => {
    let e = y.filter((l) => !(v && l.exchange !== v || g !== "All" && !l.categories.includes(g) || b && !l.symbol.toLowerCase().includes(b.toLowerCase()) && !l.base_asset.toLowerCase().includes(b.toLowerCase())));
    return e.sort((l, i) => {
      if (c === "symbol") return u ? i.symbol.localeCompare(l.symbol) : l.symbol.localeCompare(i.symbol);
      let a = 0, n = 0;
      return c === "change" ? (a = l.change_pct_24h, n = i.change_pct_24h) : c === "volume" ? (a = l.volume_quote, n = i.volume_quote) : c === "price" && (a = l.last_price, n = i.last_price), u ? n - a : a - n;
    }), e;
  }, [y, v, g, b, c, u]), N = A.length, w = Math.max(0, Math.floor(E / f) - I), L = Math.min(N, Math.ceil((E + q) / f) + I), W = A.slice(w, L);
  return /* @__PURE__ */ t.jsxs("div", { className: "flex flex-col h-full bg-[#1c1c1c] text-[#e8e8e8] select-none", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0", children: [
      /* @__PURE__ */ t.jsx("span", { className: "text-[11px] font-semibold tracking-wider", children: "WATCHLIST" }),
      /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9]", children: [
        A.length,
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
        /* @__PURE__ */ t.jsx("select", { value: g, onChange: (e) => D(e.target.value), className: "flex-1 px-2 py-1.5 rounded-md bg-[#262626] border border-[#3a3a3a] text-[11px] text-[#b9b9b9] focus:outline-none", children: G.map((e) => /* @__PURE__ */ t.jsx("option", { value: e, children: e }, e)) }),
        /* @__PURE__ */ t.jsx("select", { value: v, onChange: (e) => H(e.target.value), className: "flex-1 px-2 py-1.5 rounded-md bg-[#262626] border border-[#3a3a3a] text-[11px] text-[#b9b9b9] focus:outline-none", children: X.map((e) => /* @__PURE__ */ t.jsx("option", { value: e.id, children: e.label }, e.id)) })
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 text-[10px] font-semibold tracking-wider text-[#6a6a6a] uppercase border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0", children: [
      /* @__PURE__ */ t.jsx("span", { className: "w-6" }),
      /* @__PURE__ */ t.jsxs("button", { onClick: () => {
        c === "symbol" ? m(!u) : (j("symbol"), m(!1));
      }, className: `flex-1 text-left hover:text-[#e8e8e8] ${c === "symbol" ? "text-[#e8e8e8]" : ""}`, children: [
        "Symbol ",
        c === "symbol" ? u ? "▼" : "▲" : ""
      ] }),
      /* @__PURE__ */ t.jsx("button", { onClick: () => {
        c === "price" ? m(!u) : (j("price"), m(!0));
      }, className: `w-16 text-right hover:text-[#e8e8e8] ${c === "price" ? "text-[#e8e8e8]" : ""}`, children: "Last" }),
      /* @__PURE__ */ t.jsx("button", { onClick: () => {
        c === "change" ? m(!u) : (j("change"), m(!0));
      }, className: `w-14 text-right hover:text-[#e8e8e8] ${c === "change" ? "text-[#e8e8e8]" : ""}`, children: "24h%" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { ref: S, className: "flex-1 overflow-auto relative", onScroll: U, children: [
      /* @__PURE__ */ t.jsx("div", { style: { height: N * f, position: "relative" }, children: /* @__PURE__ */ t.jsx("div", { style: { transform: `translateY(${w * f}px)`, position: "absolute", top: 0, left: 0, right: 0 }, children: W.map((e) => {
        const l = _.has(e.symbol), i = R === e.symbol, a = F[e.symbol] || [], n = e.change_pct_24h >= 0;
        return /* @__PURE__ */ t.jsxs(
          "button",
          {
            onClick: () => O?.(e.symbol),
            className: `w-full flex items-center gap-2 px-3 border-b border-[#2a2a2a]/50 hover:bg-[#262626] text-left transition-colors ${i ? "bg-[#262626]" : ""}`,
            style: { height: f },
            children: [
              /* @__PURE__ */ t.jsx("span", { onClick: (d) => {
                d.stopPropagation(), B((h) => {
                  const s = new Set(h);
                  return s.has(e.symbol) ? s.delete(e.symbol) : s.add(e.symbol), s;
                });
              }, className: `w-5 h-5 flex items-center justify-center rounded ${l ? "text-[#e8e8e8]" : "text-[#3a3a3a] hover:text-[#b9b9b9]"} text-[12px]`, children: l ? "★" : "☆" }),
              /* @__PURE__ */ t.jsx("div", { className: "w-12 h-6 shrink-0", children: /* @__PURE__ */ t.jsx("svg", { width: 48, height: 24, viewBox: "0 0 48 24", className: "overflow-visible", children: a.length > 1 && /* @__PURE__ */ t.jsx("polyline", { fill: "none", stroke: n ? "#21b3a4" : "#f0426c", strokeWidth: 1.2, points: a.map((d, h) => {
                const s = Math.min(...a), x = Math.max(...a) - s || 1, o = h / (a.length - 1) * 48, C = 24 - (d - s) / x * 20 - 2;
                return `${o},${C}`;
              }).join(" ") }) }) }),
              /* @__PURE__ */ t.jsx("span", { className: "flex-1 truncate font-mono text-[12px] font-medium", children: e.base_asset }),
              /* @__PURE__ */ t.jsx("span", { className: "w-16 text-right font-mono tabular-nums text-[12px] text-[#b9b9b9]", children: e.last_price.toFixed(2) }),
              /* @__PURE__ */ t.jsxs("span", { className: `w-14 text-right font-mono tabular-nums text-[11px] font-medium ${n ? "text-[#21b3a4]" : "text-[#f0426c]"}`, children: [
                n ? "+" : "",
                e.change_pct_24h.toFixed(2),
                "%"
              ] })
            ]
          },
          `${e.exchange}:${e.symbol}`
        );
      }) }) }),
      N === 0 && /* @__PURE__ */ t.jsx("div", { className: "p-4 text-[12px] text-[#6a6a6a] text-center", children: "No matches" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "px-3 py-2 text-[10px] text-[#6a6a6a] border-t border-[#2a2a2a] bg-[#1c1c1c] shrink-0", children: [
      "Virtualized • ",
      N,
      " rows • Spark 30 samples • ",
      w,
      "-",
      L,
      " visible"
    ] })
  ] });
}
export {
  Z as EdgeDepthWatchlist,
  Z as default
};
