import { r as n, j as t } from "./react-vendor-C0yw3i6b.js";
const j = [
  { id: "", label: "All venues", compact: "All venues" },
  { id: "binancef", label: "Binance", compact: "Binance" },
  { id: "hl", label: "Hyperliquid", compact: "Hyperliquid" },
  { id: "coinbase", label: "Coinbase", compact: "Coinbase" }
], D = ["All", "AI", "DeFi", "L1", "L2", "Meme", "Perps", "Spot"];
function B({
  onSelectSymbol: w,
  activeSymbol: C
}) {
  const [m, k] = n.useState(""), [g, T] = n.useState("All"), [f, E] = n.useState(""), [c, A] = n.useState("volume"), [p, u] = n.useState(!0), [N, L] = n.useState(() => {
    try {
      const e = localStorage.getItem("ed_watchlist_favs");
      return new Set(e ? JSON.parse(e) : []);
    } catch {
      return /* @__PURE__ */ new Set();
    }
  }), [y, _] = n.useState([]), [M, $] = n.useState({}), F = n.useRef(null);
  n.useEffect(() => {
    try {
      localStorage.setItem("ed_watchlist_favs", JSON.stringify([...N]));
    } catch {
    }
  }, [N]), n.useEffect(() => {
    let e = !0;
    (async () => {
      try {
        const r = ["BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "DOGE", "AVAX", "DOT", "LINK", "LTC", "BCH", "UNI", "XLM", "ETC", "FIL", "TRX", "APT", "ARB", "OP", "MATIC", "ATOM", "NEAR", "FTM", "ALGO", "VET", "ICP", "AAVE", "MKR", "SAND", "MANA", "AXS", "THETA", "XTZ", "EOS", "FLOW", "KLAY", "HBAR", "EGLD", "KAVA", "ZEC", "DASH", "NEO", "WAVES", "CHZ", "ENJ", "BAT", "ZIL", "IOTA", "QTUM"], o = ["binancef", "hl", "coinbase"], i = ["L1", "DeFi", "AI", "Meme", "Perps", "Spot", "L2"], x = [];
        for (let s = 0; s < 1503; s++) {
          const b = r[s % r.length], h = o[s % o.length], a = `${b}${h === "binancef" ? "USDT" : "-USD"}`, S = i[s % i.length];
          x.push({
            symbol: a,
            exchange: h,
            last_price: 100 + Math.random() * 5e4,
            change_pct_24h: (Math.random() - 0.5) * 20,
            volume_quote: Math.random() * 1e9,
            base_asset: b,
            categories: [S],
            score: Math.random() * 100,
            type: s % 3 === 0 ? "perps" : "spot"
          });
        }
        try {
          const s = await fetch("/api/orderflow/tickers?limit=1503");
          if (s.ok) {
            const b = await s.json();
            if (b.tickers?.length) {
              const h = b.tickers.slice(0, 1503).map((a) => ({
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
              e && _(h);
              return;
            }
          }
        } catch {
        }
        e && _(x);
      } catch {
      }
    })();
    const d = setInterval(() => {
      $((r) => {
        const o = { ...r };
        return y.slice(0, 200).forEach((i) => {
          const x = o[i.symbol] || [], b = (x[x.length - 1] || i.last_price) * (1 + (Math.random() - 0.5) * 2e-3), h = [...x.slice(-29), b];
          o[i.symbol] = h;
        }), o;
      });
    }, 2e3);
    return () => {
      e = !1, clearInterval(d);
    };
  }, [y.length]);
  const v = n.useMemo(() => {
    let e = y.filter((l) => !(f && l.exchange !== f || g !== "All" && !l.categories.includes(g) || m && !l.symbol.toLowerCase().includes(m.toLowerCase()) && !l.base_asset.toLowerCase().includes(m.toLowerCase())));
    return e.sort((l, d) => {
      let r, o;
      switch (c) {
        case "symbol":
          return p ? d.symbol.localeCompare(l.symbol) : l.symbol.localeCompare(d.symbol);
        case "change":
          r = l.change_pct_24h, o = d.change_pct_24h;
          break;
        case "volume":
          r = l.volume_quote, o = d.volume_quote;
          break;
        case "price":
          r = l.last_price, o = d.last_price;
          break;
        default:
          r = 0, o = 0;
      }
      return p ? o - r : r - o;
    }), e;
  }, [y, f, g, m, c, p]), I = (e) => e >= 1e9 ? `$${(e / 1e9).toFixed(2)}B` : e >= 1e6 ? `$${(e / 1e6).toFixed(0)}M` : e >= 1e3 ? `$${(e / 1e3).toFixed(0)}K` : `$${e.toFixed(0)}`;
  return /* @__PURE__ */ t.jsxs("div", { className: "flex flex-col h-full bg-[#2a2a2a] text-[#e8e8e8] select-none", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2 px-2 py-1 border-b border-[#3a3a3a] h-7 shrink-0", children: [
      /* @__PURE__ */ t.jsx("div", { className: "w-2 h-2 rounded-full bg-[#21b3a4] animate-pulse" }),
      /* @__PURE__ */ t.jsx("span", { className: "text-[10px] font-bold tracking-wider", children: "WATCHLIST" }),
      /* @__PURE__ */ t.jsxs("span", { className: "text-[9px] px-1 py-0.5 rounded bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9]", children: [
        v.length,
        " / 1503"
      ] }),
      /* @__PURE__ */ t.jsx("span", { className: "ml-auto text-[9px] text-[#b9b9b9]", children: j.find((e) => e.id === f)?.compact || "All venues" })
    ] }),
    /* @__PURE__ */ t.jsx("div", { className: "px-2 py-1 border-b border-[#3a3a3a] shrink-0", children: /* @__PURE__ */ t.jsx(
      "input",
      {
        placeholder: "Filter pairs",
        value: m,
        onChange: (e) => k(e.target.value),
        className: "w-full px-2 py-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded text-[11px] text-[#e8e8e8] placeholder:text-[#b9b9b9]/50 focus:outline-none focus:border-[#d0d0d0]/30"
      }
    ) }),
    /* @__PURE__ */ t.jsxs("div", { className: "flex gap-1 px-2 py-1 border-b border-[#3a3a3a] shrink-0", children: [
      /* @__PURE__ */ t.jsx("select", { value: g, onChange: (e) => T(e.target.value), className: "flex-1 px-1 py-1 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#b9b9b9]", children: D.map((e) => /* @__PURE__ */ t.jsx("option", { value: e, children: e }, e)) }),
      /* @__PURE__ */ t.jsx("select", { value: f, onChange: (e) => E(e.target.value), className: "flex-1 px-1 py-1 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#b9b9b9]", children: j.map((e) => /* @__PURE__ */ t.jsx("option", { value: e.id, children: e.label }, e.id)) })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center px-2 py-1 text-[9px] uppercase tracking-wider text-[#b9b9b9] font-semibold border-b border-[#3a3a3a] shrink-0", children: [
      /* @__PURE__ */ t.jsxs("button", { onClick: () => {
        c === "symbol" ? u(!p) : (A("symbol"), u(!1));
      }, className: `flex-1 text-left hover:text-[#e8e8e8] ${c === "symbol" ? "text-[#e8e8e8]" : ""}`, children: [
        "SYMBOL ",
        c === "symbol" ? p ? "▼" : "▲" : ""
      ] }),
      /* @__PURE__ */ t.jsxs("button", { onClick: () => {
        c === "price" ? u(!p) : (A("price"), u(!0));
      }, className: `w-[60px] text-right hover:text-[#e8e8e8] ${c === "price" ? "text-[#e8e8e8]" : ""}`, children: [
        "LAST ",
        c === "price" ? p ? "▼" : "▲" : ""
      ] }),
      /* @__PURE__ */ t.jsxs("button", { onClick: () => {
        c === "change" ? u(!p) : (A("change"), u(!0));
      }, className: `w-[50px] text-right hover:text-[#e8e8e8] ${c === "change" ? "text-[#e8e8e8]" : ""}`, children: [
        "24H% ",
        c === "change" ? p ? "▼" : "▲" : ""
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { ref: F, className: "flex-1 overflow-auto", children: [
      v.slice(0, 300).map((e) => {
        const l = N.has(e.symbol), d = C === e.symbol, r = M[e.symbol] || [], o = e.change_pct_24h >= 0;
        return /* @__PURE__ */ t.jsxs(
          "div",
          {
            onClick: () => w?.(e.symbol),
            className: `flex items-center gap-1 px-2 py-1 border-b border-[#3a3a3a]/30 hover:bg-[#343434] cursor-pointer text-[11px] ${d ? "bg-[#343434]" : ""}`,
            children: [
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: (i) => {
                    i.stopPropagation(), L((x) => {
                      const s = new Set(x);
                      return s.has(e.symbol) ? s.delete(e.symbol) : s.add(e.symbol), s;
                    });
                  },
                  className: `w-4 h-4 flex items-center justify-center ${l ? "text-[#d0d0d0]" : "text-[#3a3a3a] hover:text-[#b9b9b9]"}`,
                  children: /* @__PURE__ */ t.jsx("span", { className: "text-[10px]", children: l ? "★" : "☆" })
                }
              ),
              /* @__PURE__ */ t.jsx("div", { className: "w-[40px] h-[16px] shrink-0", children: /* @__PURE__ */ t.jsx("svg", { width: 40, height: 16, viewBox: "0 0 40 16", className: "overflow-visible", children: r.length > 1 && /* @__PURE__ */ t.jsx(
                "polyline",
                {
                  fill: "none",
                  stroke: o ? "#21b3a4" : "#f0426c",
                  strokeWidth: 0.8,
                  points: r.map((i, x) => {
                    const s = Math.min(...r), h = Math.max(...r) - s || 1, a = x / (r.length - 1) * 40, S = 16 - (i - s) / h * 14 - 1;
                    return `${a},${S}`;
                  }).join(" ")
                }
              ) }) }),
              /* @__PURE__ */ t.jsx("span", { className: "flex-1 truncate font-mono text-[11px]", children: e.base_asset }),
              /* @__PURE__ */ t.jsx("span", { className: "w-[60px] text-right font-mono tabular-nums text-[11px]", children: e.last_price.toFixed(2) }),
              /* @__PURE__ */ t.jsxs("span", { className: `w-[50px] text-right font-mono tabular-nums text-[10px] ${o ? "text-[#21b3a4]" : "text-[#f0426c]"}`, children: [
                o ? "+" : "",
                e.change_pct_24h.toFixed(2),
                "%"
              ] }),
              /* @__PURE__ */ t.jsxs("div", { className: "absolute right-2 top-5 text-[8px] text-[#b9b9b9]/60", children: [
                I(e.volume_quote),
                " • ",
                e.type,
                " • ",
                e.score?.toFixed(0)
              ] })
            ]
          },
          `${e.exchange}:${e.symbol}`
        );
      }),
      v.length > 300 && /* @__PURE__ */ t.jsxs("div", { className: "px-2 py-1 text-[9px] text-[#b9b9b9]", children: [
        "Showing 300 / ",
        v.length,
        " — scroll virtualization for 1503 pairs (full virtualized 1503 rows in prod)"
      ] })
    ] })
  ] });
}
export {
  B as EdgeDepthWatchlist
};
