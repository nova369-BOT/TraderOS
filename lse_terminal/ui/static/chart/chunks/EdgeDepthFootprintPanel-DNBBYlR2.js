import { r as p, j as e } from "./react-vendor-C0yw3i6b.js";
function v({ symbol: P, provider: j = "binance" }) {
  const [G, J] = p.useState(null), [S, Q] = p.useState("cluster"), _ = p.useRef(5e4), D = p.useRef(null), E = p.useMemo(() => j === "hyperliquid" ? 15 : j === "binance" ? 20 : 50, [j]), q = p.useCallback((t) => {
    const b = Date.now();
    return Array.from({ length: 50 }, (m, a) => {
      const i = t * 8e-3 + Math.random() * t * 2e-3, r = t - i * 0.5 + (Math.random() - 0.5) * i * 0.1 + Math.sin(a / 5) * i * 0.2, n = r + i - r, c = 0.5;
      let d = n / 18;
      const h = Math.max(3, Math.floor(280 / 12)), M = n / h;
      d < M && (d = M), d = Math.max(c, Math.ceil(d / c) * c);
      const w = Math.max(3, Math.min(24, Math.floor(n / d) || 18)), R = Math.random() > 0.45, A = r + n * (R ? 0.6 + Math.random() * 0.3 : 0.1 + Math.random() * 0.3), s = 80 + Math.random() * 120 + Math.sin(a / 3) * 20, N = [];
      let x = 0, u = 0, $ = 0;
      for (let l = 0; l < w; l++) {
        const k = r + l / w * n, V = k + n / w, I = (k + V) / 2, X = Math.abs(I - A) / (n || 1), Y = Math.exp(-Math.pow(X * 3, 2)) + 0.15, U = s * Y / w * (0.8 + Math.random() * 0.4);
        let B = R ? 0.55 + Math.random() * 0.15 : 0.35 + Math.random() * 0.15;
        Math.random() > 0.72 && (Math.random() > 0.5 ? B = Math.min(0.88, B + 0.28) : B = Math.max(0.12, B - 0.28));
        const K = U * B, W = U * (1 - B);
        x += K, u += W, $ += U, N.push({ price_mid: I, price_lo: k, price_hi: V, buy: K, sell: W, total: U, delta: K - W, bucket_idx: l });
      }
      let O = 0, T = 0;
      N.forEach((l, k) => {
        l.total > T && (T = l.total, O = k);
      });
      const L = N.map((l, k) => {
        let V = !1, I = !1;
        return l.buy >= 0 && l.sell > 0 && l.buy / l.sell >= 3 && (V = !0), l.sell >= 0 && l.buy > 0 && l.sell / l.buy >= 3 && (I = !0), { ...l, is_poc: k === O, buy_imbalance: V, sell_imbalance: I };
      });
      return {
        timestamp_ms: b - (50 - a) * 6e4,
        levels: L,
        totalBuy: x,
        totalSell: u,
        totalVol: $,
        delta: x - u,
        pocPrice: L[O]?.price_mid || t,
        maxVol: T,
        maxAbsDelta: Math.max(...L.map((l) => Math.abs(l.delta)), 1),
        tickPerRow: d,
        range: n
      };
    });
  }, []);
  p.useEffect(() => {
    let t = !0;
    const g = async () => {
      try {
        const m = await fetch(`/api/orderflow/footprint?symbol=${encodeURIComponent(P)}&provider=${encodeURIComponent(j)}`);
        if (m.ok) {
          const a = await m.json();
          if (t && a.columns?.length) {
            const i = a.columns.map((o) => {
              const n = o.levels || [];
              let c = 0, d = 0, C = 0, h = 0, M = 0;
              const w = n.map((s, N) => {
                const x = s.buy || s.bid || 0, u = s.sell || s.ask || 0, $ = x + u;
                return $ > M && (M = $, h = N), c += x, d += u, C += $, {
                  price_mid: s.price_mid || s.price || 0,
                  price_lo: s.price_lo || s.price || 0,
                  price_hi: s.price_hi || s.price || 0,
                  buy: x,
                  sell: u,
                  total: $,
                  delta: x - u,
                  bucket_idx: N
                };
              });
              let R = 1;
              w.forEach((s) => {
                Math.abs(s.delta) > R && (R = Math.abs(s.delta));
              });
              const A = w.map((s, N) => {
                let x = !1, u = !1;
                return s.buy > 0 && s.sell > 0 && (s.buy / s.sell >= 3 && (x = !0), s.sell / s.buy >= 3 && (u = !0)), { ...s, is_poc: N === h, buy_imbalance: x, sell_imbalance: u };
              });
              return {
                timestamp_ms: o.timestamp_ms || o.time || Date.now(),
                levels: A,
                totalBuy: c,
                totalSell: d,
                totalVol: C,
                delta: c - d,
                pocPrice: A[h]?.price_mid || _.current,
                maxVol: M,
                maxAbsDelta: R,
                tickPerRow: o.tickPerRow || 0,
                range: o.range || 0
              };
            });
            J({ columns: i });
            const r = i[i.length - 1];
            r && (_.current = r.pocPrice || _.current);
            return;
          }
        }
      } catch {
      }
      if (t) {
        try {
          const m = await fetch(`/api/orderflow/quote?symbol=${encodeURIComponent(P)}&provider=${encodeURIComponent(j)}`);
          if (m.ok) {
            const a = await m.json();
            _.current = a.mid || a.last || _.current;
          }
        } catch {
        }
        J({ columns: q(_.current) });
      }
    };
    g();
    const b = setInterval(g, E * 12);
    return () => {
      t = !1, clearInterval(b);
    };
  }, [P, j, E, q]), p.useEffect(() => {
    D.current && (D.current.scrollLeft = D.current.scrollWidth);
  }, [G]);
  const z = G?.columns || [], F = p.useMemo(() => z.length ? z : q(_.current), [z, q]), y = p.useMemo(() => {
    let t = 0, g = 0, b = 0, m = 0, a = 0, i = 0;
    return F.forEach((r) => {
      r.levels.forEach((o) => {
        t += o.buy, g += o.sell, b += o.total, o.buy_imbalance && m++, o.sell_imbalance && a++, o.is_poc && i++;
      });
    }), { totalBuy: t, totalSell: g, totalVol: b, imbBuy: m, imbSell: a, delta: t - g, pocCount: i };
  }, [F]), f = (t) => Math.abs(t) >= 1e6 ? (t / 1e6).toFixed(1) + "M" : Math.abs(t) >= 1e3 ? (t / 1e3).toFixed(1) + "K" : Math.abs(t) >= 100 ? t.toFixed(0) : t.toFixed(1), H = F.slice(-40);
  return /* @__PURE__ */ e.jsxs("div", { className: "h-full flex flex-col bg-[#121214] text-[#e8e8e8] overflow-hidden", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 px-3 h-11 border-b border-[#232326] bg-[#1a1a1e] shrink-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e.jsx("span", { className: "text-[11px] font-bold tracking-[0.12em] text-[#a1a1aa] font-sans", children: "FOOTPRINT" }),
        /* @__PURE__ */ e.jsx("span", { className: "w-px h-3 bg-[#2a2a2e]" }),
        /* @__PURE__ */ e.jsx("span", { className: "font-mono text-[12px] font-semibold tracking-wide text-[#e4e4e7]", children: P }),
        /* @__PURE__ */ e.jsxs("span", { className: "px-2 py-0.5 rounded-full bg-[#232326] border border-[#2e2e32] text-[10px] text-[#a1a1aa] font-mono flex items-center gap-1", children: [
          /* @__PURE__ */ e.jsx("span", { className: "w-1 h-1 rounded-full bg-emerald-400 animate-pulse" }),
          j.toUpperCase(),
          " ",
          E,
          "ms"
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "hidden lg:flex items-center gap-1.5 ml-4 text-[10px] font-mono", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "px-2 py-0.5 rounded-md bg-[#1e2a28] border border-[#21b3a4]/20 text-[#5ee9d5]", children: [
          "B ",
          f(y.totalBuy)
        ] }),
        /* @__PURE__ */ e.jsxs("span", { className: "px-2 py-0.5 rounded-md bg-[#2a1e22] border border-[#f0426c]/20 text-[#ff7a96]", children: [
          "S ",
          f(y.totalSell)
        ] }),
        /* @__PURE__ */ e.jsxs("span", { className: `px-2 py-0.5 rounded-md border ${y.delta >= 0 ? "bg-[#1e2a28] border-[#21b3a4]/20 text-[#5ee9d5]" : "bg-[#2a1e22] border-[#f0426c]/20 text-[#ff7a96]"}`, children: [
          "Δ ",
          y.delta >= 0 ? "+" : "",
          f(y.delta)
        ] }),
        /* @__PURE__ */ e.jsxs("span", { className: "px-2 py-0.5 rounded-md bg-[#232326] border border-[#2e2e32] text-[#a1a1aa]", children: [
          "IMB B",
          y.imbBuy,
          " S",
          y.imbSell,
          " • POC ",
          y.pocCount
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
        /* @__PURE__ */ e.jsx("div", { className: "flex gap-1 p-0.5 rounded-lg bg-[#232326] border border-[#2e2e32]", children: ["cluster", "delta", "volume"].map((t) => /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: () => Q(t),
            className: `px-2.5 py-1 rounded-md text-[11px] font-medium capitalize font-sans transition-all ${S === t ? "bg-[#e4e4e7] text-[#121214] shadow-sm" : "text-[#a1a1aa] hover:bg-[#2a2a2e] hover:text-[#e4e4e7]"}`,
            children: t === "cluster" ? "Sells × Buys" : t === "delta" ? "Delta" : "Volume"
          },
          t
        )) }),
        /* @__PURE__ */ e.jsxs("div", { className: "text-[10px] text-[#71717a] font-mono hidden md:block", children: [
          H.length,
          " cols • range/18 • ratio 3.0"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { ref: D, className: "flex-1 overflow-auto flex gap-px p-1 bg-[#0e0e10] scrollbar-thin", children: H.map((t, g) => {
      const b = t.maxVol || 1, m = t.maxAbsDelta || 1;
      return /* @__PURE__ */ e.jsxs("div", { className: "min-w-[68px] w-[68px] rounded-[8px] border border-[#232326] bg-[#1a1a1e] overflow-hidden flex flex-col shrink-0", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "px-2 py-1 bg-[#1e1e22] border-b border-[#232326] flex items-center justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-[9px] text-[#71717a] font-mono", children: new Date(t.timestamp_ms).toLocaleTimeString([], { hour12: !1, minute: "2-digit", second: "2-digit" }) }),
          /* @__PURE__ */ e.jsx("span", { className: `w-1 h-1 rounded-full ${t.delta >= 0 ? "bg-[#21b3a4]" : "bg-[#f0426c]"}` })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "flex-1 flex flex-col", children: t.levels.map((a, i) => {
          let r = a.sell / b;
          r = Math.sqrt(Math.max(0, r));
          let o = a.buy / b;
          o = Math.sqrt(Math.max(0, o));
          let n = Math.abs(a.delta) / m;
          n = Math.sqrt(n);
          let c = a.total / b;
          c = Math.sqrt(c);
          const d = `rgba(${Math.round(25 + 130 * r)},${Math.round(14 + 20 * r)},${Math.round(30 + 60 * r)},${0.92 + 0.08 * r})`, C = `rgba(${Math.round(14 + 20 * o)},${Math.round(20 + 55 * o)},${Math.round(35 + 120 * o)},${0.92 + 0.08 * o})`;
          let h = "";
          S === "delta" ? a.delta >= 0 ? h = `rgba(${Math.round(14 + 20 * n)},${Math.round(20 + 60 * n)},${Math.round(35 + 110 * n)},${0.92 + 0.08 * n})` : h = `rgba(${Math.round(25 + 125 * n)},${Math.round(14 + 20 * n)},${Math.round(30 + 55 * n)},${0.92 + 0.08 * n})` : S === "volume" && (h = `rgba(${Math.round(14 + 20 * c)},${Math.round(20 + 50 * c)},${Math.round(40 + 115 * c)},${0.92 + 0.08 * c})`);
          const M = 18;
          return S === "cluster" ? /* @__PURE__ */ e.jsxs("div", { className: "relative flex h-[18px] border-b border-[#1e1e22]/60", style: { height: M }, children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex-1 flex items-center justify-center text-[9px] font-mono relative overflow-hidden", style: { background: d }, children: [
              a.sell_imbalance && /* @__PURE__ */ e.jsx("span", { className: "absolute inset-0 border border-[#ff5a5a]/70 pointer-events-none" }),
              a.is_poc && /* @__PURE__ */ e.jsx("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-[#f59e0b]/80 pointer-events-none" }),
              /* @__PURE__ */ e.jsx("span", { className: "relative text-[#e8d5d5] tracking-tight", children: f(a.sell) })
            ] }),
            /* @__PURE__ */ e.jsx("div", { className: "w-px bg-[#2a2a2e]/80 shrink-0" }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex-1 flex items-center justify-center text-[9px] font-mono relative overflow-hidden", style: { background: C }, children: [
              a.buy_imbalance && /* @__PURE__ */ e.jsx("span", { className: "absolute inset-0 border border-[#5ee9d5]/70 pointer-events-none" }),
              a.is_poc && /* @__PURE__ */ e.jsx("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-[#f59e0b]/80 pointer-events-none" }),
              /* @__PURE__ */ e.jsx("span", { className: "relative text-[#d5e8e8] tracking-tight", children: f(a.buy) })
            ] })
          ] }, i) : /* @__PURE__ */ e.jsxs("div", { className: "relative flex items-center justify-center h-[18px] border-b border-[#1e1e22]/60 text-[9px] font-mono", style: { background: h, height: M }, children: [
            a.is_poc && /* @__PURE__ */ e.jsx("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-[#f59e0b]/80 pointer-events-none" }),
            (a.buy_imbalance || a.sell_imbalance) && /* @__PURE__ */ e.jsx("span", { className: `absolute inset-0 border pointer-events-none ${a.buy_imbalance ? "border-[#5ee9d5]/70" : "border-[#ff5a5a]/70"}` }),
            /* @__PURE__ */ e.jsx("span", { className: "relative text-[#e4e4e7]", children: S === "delta" ? (a.delta > 0 ? "+" : "") + f(a.delta) : f(a.total) })
          ] }, i);
        }) }),
        /* @__PURE__ */ e.jsxs("div", { className: "px-1.5 py-1 bg-[#1a1a1e] border-t border-[#232326] text-[8px] text-[#71717a] font-mono flex justify-between", children: [
          /* @__PURE__ */ e.jsxs("span", { children: [
            "V:",
            f(t.totalVol)
          ] }),
          /* @__PURE__ */ e.jsxs("span", { className: t.delta >= 0 ? "text-[#5ee9d5]" : "text-[#ff7a96]", children: [
            "D:",
            t.delta >= 0 ? "+" : "",
            f(t.delta)
          ] })
        ] })
      ] }, g);
    }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "px-3 py-1.5 text-[10px] text-[#52525b] border-t border-[#232326] bg-[#1a1a1e] shrink-0 font-mono flex justify-between", children: [
      /* @__PURE__ */ e.jsxs("span", { children: [
        "Cluster = Sells×Buys • Delta = single col blue/pink • Volume • Imbalance 3.0 SamePrice • POC • V/D • ",
        F.length,
        " total • ",
        H.length,
        " visible zoomed-in"
      ] }),
      /* @__PURE__ */ e.jsxs("span", { children: [
        j.toUpperCase(),
        " ",
        E,
        "ms • SoA • range/18 • 12px min"
      ] })
    ] })
  ] });
}
export {
  v as EdgeDepthFootprintPanel,
  v as default
};
