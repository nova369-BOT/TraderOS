import { r as c, j as t } from "./react-vendor-C0yw3i6b.js";
const R = [
  { id: "", label: "All venues", compact: "All venues" },
  { id: "binancef", label: "Binance", compact: "Binance" },
  { id: "hl", label: "Hyperliquid", compact: "Hyperliquid" },
  { id: "coinbase", label: "Coinbase", compact: "Coinbase" }
], K = ["All", "AI", "DeFi", "L1", "L2", "Meme", "Perps", "Spot"], g = 22, I = 10;
function Z({
  onSelectSymbol: O,
  activeSymbol: $
}) {
  const [m, D] = c.useState(""), [v, H] = c.useState("All"), [f, B] = c.useState(""), [l, N] = c.useState("volume"), [x, u] = c.useState(!0), [_, P] = c.useState(() => {
    try {
      const e = localStorage.getItem("ed_watchlist_favs");
      return new Set(e ? JSON.parse(e) : []);
    } catch {
      return /* @__PURE__ */ new Set();
    }
  }), [y, C] = c.useState([]), T = c.useRef([]), [F, V] = c.useState({}), S = c.useRef(null), [E, q] = c.useState(0), [U, M] = c.useState(600);
  c.useEffect(() => {
    T.current = y;
  }, [y]), c.useEffect(() => {
    try {
      localStorage.setItem("ed_watchlist_favs", JSON.stringify([..._]));
    } catch {
    }
  }, [_]), c.useEffect(() => {
    const e = S.current;
    if (!e) return;
    const o = new ResizeObserver((i) => {
      for (const r of i)
        M(r.contentRect.height);
    });
    return o.observe(e), M(e.clientHeight || 600), () => o.disconnect();
  }, []);
  const W = c.useCallback(() => {
    S.current && q(S.current.scrollTop);
  }, []);
  c.useEffect(() => {
    let e = !0;
    (async () => {
      try {
        const r = ["BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "DOGE", "AVAX", "DOT", "LINK", "LTC", "BCH", "UNI", "XLM", "ETC", "FIL", "TRX", "APT", "ARB", "OP", "MATIC", "ATOM", "NEAR", "FTM", "ALGO", "VET", "ICP", "AAVE", "MKR", "SAND", "MANA", "AXS", "THETA", "XTZ", "EOS", "FLOW", "KLAY", "HBAR", "EGLD", "KAVA", "ZEC", "DASH", "NEO", "WAVES", "CHZ", "ENJ", "BAT", "ZIL", "IOTA", "QTUM"], n = ["binancef", "hl", "coinbase"], d = ["L1", "DeFi", "AI", "Meme", "Perps", "Spot", "L2"], h = [];
        for (let s = 0; s < 1503; s++) {
          const b = r[s % r.length], p = n[s % n.length], a = `${b}${p === "binancef" ? "USDT" : "-USD"}`, w = d[s % d.length];
          h.push({
            symbol: `${a}-${s}`,
            // ensure uniqueness for 1503 but display base
            exchange: p,
            last_price: 100 + Math.random() * 5e4,
            change_pct_24h: (Math.random() - 0.5) * 20,
            volume_quote: Math.random() * 1e9,
            base_asset: b,
            categories: [w],
            score: Math.random() * 100,
            type: s % 3 === 0 ? "perps" : "spot"
          });
        }
        try {
          const s = await fetch("/api/orderflow/tickers?limit=1503");
          if (s.ok) {
            const b = await s.json();
            if (b.tickers?.length) {
              const p = b.tickers.slice(0, 1503).map((a) => ({
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
              e && C(p);
              return;
            }
          }
        } catch {
        }
        e && C(h);
      } catch {
      }
    })();
    const i = setInterval(() => {
      V((r) => {
        const n = { ...r };
        return T.current.slice(0, 400).forEach((h) => {
          const s = n[h.symbol] || [], p = (s[s.length - 1] || h.last_price) * (1 + (Math.random() - 0.5) * 2e-3), a = [...s.slice(-29), p];
          n[h.symbol] = a;
        }), n;
      });
    }, 2e3);
    return () => {
      e = !1, clearInterval(i);
    };
  }, []);
  const j = c.useMemo(() => {
    let e = y.filter((o) => !(f && o.exchange !== f || v !== "All" && !o.categories.includes(v) || m && !o.symbol.toLowerCase().includes(m.toLowerCase()) && !o.base_asset.toLowerCase().includes(m.toLowerCase())));
    return e.sort((o, i) => {
      let r, n;
      switch (l) {
        case "symbol":
          return x ? i.symbol.localeCompare(o.symbol) : o.symbol.localeCompare(i.symbol);
        case "change":
          r = o.change_pct_24h, n = i.change_pct_24h;
          break;
        case "volume":
          r = o.volume_quote, n = i.volume_quote;
          break;
        case "price":
          r = o.last_price, n = i.last_price;
          break;
        default:
          r = 0, n = 0;
      }
      return x ? n - r : r - n;
    }), e;
  }, [y, f, v, m, l, x]), A = j.length, k = Math.max(0, Math.floor(E / g) - I), L = Math.min(A, Math.ceil((E + U) / g) + I), X = j.slice(k, L);
  return /* @__PURE__ */ t.jsxs("div", { className: "flex flex-col h-full bg-[#2a2a2a] text-[#e8e8e8] select-none", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2 px-2 py-1 border-b border-[#3a3a3a] h-7 shrink-0", children: [
      /* @__PURE__ */ t.jsx("div", { className: "w-2 h-2 rounded-full bg-[#21b3a4] animate-pulse" }),
      /* @__PURE__ */ t.jsx("span", { className: "text-[10px] font-bold tracking-wider", children: "WATCHLIST" }),
      /* @__PURE__ */ t.jsxs("span", { className: "text-[9px] px-1 py-0.5 rounded bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9]", children: [
        j.length,
        " / 1503"
      ] }),
      /* @__PURE__ */ t.jsx("span", { className: "ml-auto text-[9px] text-[#b9b9b9]", children: R.find((e) => e.id === f)?.compact || "All venues" })
    ] }),
    /* @__PURE__ */ t.jsx("div", { className: "px-2 py-1 border-b border-[#3a3a3a] shrink-0", children: /* @__PURE__ */ t.jsx(
      "input",
      {
        placeholder: "Filter pairs",
        value: m,
        onChange: (e) => D(e.target.value),
        className: "w-full px-2 py-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded text-[11px] text-[#e8e8e8] placeholder:text-[#b9b9b9]/50 focus:outline-none focus:border-[#d0d0d0]/30"
      }
    ) }),
    /* @__PURE__ */ t.jsxs("div", { className: "flex gap-1 px-2 py-1 border-b border-[#3a3a3a] shrink-0", children: [
      /* @__PURE__ */ t.jsx("select", { value: v, onChange: (e) => H(e.target.value), className: "flex-1 px-1 py-1 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#b9b9b9]", children: K.map((e) => /* @__PURE__ */ t.jsx("option", { value: e, children: e }, e)) }),
      /* @__PURE__ */ t.jsx("select", { value: f, onChange: (e) => B(e.target.value), className: "flex-1 px-1 py-1 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#b9b9b9]", children: R.map((e) => /* @__PURE__ */ t.jsx("option", { value: e.id, children: e.label }, e.id)) })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center px-2 py-1 text-[9px] uppercase tracking-wider text-[#b9b9b9] font-semibold border-b border-[#3a3a3a] shrink-0", children: [
      /* @__PURE__ */ t.jsxs("button", { onClick: () => {
        l === "symbol" ? u(!x) : (N("symbol"), u(!1));
      }, className: `flex-1 text-left hover:text-[#e8e8e8] ${l === "symbol" ? "text-[#e8e8e8]" : ""}`, children: [
        "SYMBOL ",
        l === "symbol" ? x ? "▼" : "▲" : ""
      ] }),
      /* @__PURE__ */ t.jsxs("button", { onClick: () => {
        l === "price" ? u(!x) : (N("price"), u(!0));
      }, className: `w-[60px] text-right hover:text-[#e8e8e8] ${l === "price" ? "text-[#e8e8e8]" : ""}`, children: [
        "LAST ",
        l === "price" ? x ? "▼" : "▲" : ""
      ] }),
      /* @__PURE__ */ t.jsxs("button", { onClick: () => {
        l === "change" ? u(!x) : (N("change"), u(!0));
      }, className: `w-[50px] text-right hover:text-[#e8e8e8] ${l === "change" ? "text-[#e8e8e8]" : ""}`, children: [
        "24H% ",
        l === "change" ? x ? "▼" : "▲" : ""
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { ref: S, className: "flex-1 overflow-auto relative", onScroll: W, children: [
      /* @__PURE__ */ t.jsx("div", { style: { height: A * g, position: "relative" }, children: /* @__PURE__ */ t.jsx("div", { style: { transform: `translateY(${k * g}px)`, position: "absolute", top: 0, left: 0, right: 0 }, children: X.map((e) => {
        const o = _.has(e.symbol), i = $ === e.symbol, r = F[e.symbol] || [], n = e.change_pct_24h >= 0;
        return /* @__PURE__ */ t.jsxs(
          "div",
          {
            onClick: () => O?.(e.symbol),
            className: `flex items-center gap-1 px-2 border-b border-[#3a3a3a]/30 hover:bg-[#343434] cursor-pointer text-[11px] ${i ? "bg-[#343434]" : ""}`,
            style: { height: g },
            children: [
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: (d) => {
                    d.stopPropagation(), P((h) => {
                      const s = new Set(h);
                      return s.has(e.symbol) ? s.delete(e.symbol) : s.add(e.symbol), s;
                    });
                  },
                  className: `w-4 h-4 flex items-center justify-center ${o ? "text-[#d0d0d0]" : "text-[#3a3a3a] hover:text-[#b9b9b9]"}`,
                  children: /* @__PURE__ */ t.jsx("span", { className: "text-[10px]", children: o ? "★" : "☆" })
                }
              ),
              /* @__PURE__ */ t.jsx("div", { className: "w-[40px] h-[16px] shrink-0", children: /* @__PURE__ */ t.jsx("svg", { width: 40, height: 16, viewBox: "0 0 40 16", className: "overflow-visible", children: r.length > 1 && /* @__PURE__ */ t.jsx(
                "polyline",
                {
                  fill: "none",
                  stroke: n ? "#21b3a4" : "#f0426c",
                  strokeWidth: 0.8,
                  points: r.map((d, h) => {
                    const s = Math.min(...r), p = Math.max(...r) - s || 1, a = h / (r.length - 1) * 40, w = 16 - (d - s) / p * 14 - 1;
                    return `${a},${w}`;
                  }).join(" ")
                }
              ) }) }),
              /* @__PURE__ */ t.jsx("span", { className: "flex-1 truncate font-mono text-[11px]", children: e.base_asset }),
              /* @__PURE__ */ t.jsx("span", { className: "w-[60px] text-right font-mono tabular-nums text-[11px]", children: e.last_price.toFixed(2) }),
              /* @__PURE__ */ t.jsxs("span", { className: `w-[50px] text-right font-mono tabular-nums text-[10px] ${n ? "text-[#21b3a4]" : "text-[#f0426c]"}`, children: [
                n ? "+" : "",
                e.change_pct_24h.toFixed(2),
                "%"
              ] })
            ]
          },
          `${e.exchange}:${e.symbol}`
        );
      }) }) }),
      A === 0 && /* @__PURE__ */ t.jsx("div", { className: "px-2 py-2 text-[10px] text-[#b9b9b9]", children: "No matches — synthetic 1503 loading..." })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "px-2 py-1 text-[9px] text-[#b9b9b9] border-t border-[#3a3a3a] bg-[#1c1c1c] shrink-0", children: [
      "Virtualized ",
      A,
      " rows • SPARK_N 30 SAMPLE_MS 2000 • RowModel cache • ",
      k,
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
