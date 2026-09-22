import { r as y, j as e } from "./react-vendor-C0yw3i6b.js";
function te({ symbol: E, provider: k = "binance" }) {
  const [v, J] = y.useState(null), [P, Q] = y.useState("cluster"), B = y.useRef(5e4), q = y.useRef(null), F = y.useMemo(() => k === "hyperliquid" ? 15 : k === "binance" ? 20 : 50, [k]), A = y.useCallback((t) => {
    const g = Date.now();
    return Array.from({ length: 50 }, (x, a) => {
      const i = t * 8e-3 + Math.random() * t * 2e-3, r = t - i * 0.5 + (Math.random() - 0.5) * i * 0.1 + Math.sin(a / 5) * i * 0.2, l = r + i - r, d = 0.5;
      let b = l / 18;
      const M = Math.max(3, Math.floor(280 / 12)), N = l / M;
      b < N && (b = N), b = Math.max(d, Math.ceil(b / d) * d);
      const S = Math.max(3, Math.min(24, Math.floor(l / b) || 18)), V = Math.random() > 0.45, z = r + l * (V ? 0.6 + Math.random() * 0.3 : 0.1 + Math.random() * 0.3), s = 80 + Math.random() * 120 + Math.sin(a / 3) * 20, $ = [];
      let h = 0, p = 0, C = 0;
      for (let n = 0; n < S; n++) {
        const c = r + n / S * l, R = c + l / S, m = (c + R) / 2, f = Math.abs(m - z) / (l || 1), Z = Math.exp(-Math.pow(f * 3, 2)) + 0.15, H = s * Z / S * (0.8 + Math.random() * 0.4);
        let I = V ? 0.55 + Math.random() * 0.15 : 0.35 + Math.random() * 0.15;
        Math.random() > 0.72 && (Math.random() > 0.5 ? I = Math.min(0.88, I + 0.28) : I = Math.max(0.12, I - 0.28));
        const K = H * I, W = H * (1 - I);
        h += K, p += W, C += H, $.push({ price_mid: m, price_lo: c, price_hi: R, buy: K, sell: W, total: H, delta: K - W, bucket_idx: n });
      }
      let T = 0, G = 0;
      $.forEach((n, c) => {
        n.total > G && (G = n.total, T = c);
      });
      const X = $.map((n, c) => {
        let R = !1, m = !1;
        return n.buy > 0 && n.sell > 0 && (n.buy / n.sell >= 3 && (R = !0), n.sell / n.buy >= 3 && (m = !0)), { ...n, is_poc: c === T, buy_imbalance: R, sell_imbalance: m, buy_stack: !1, sell_stack: !1 };
      }), Y = 2, u = X.map((n) => ({ ...n }));
      for (const n of [!1, !0]) {
        let c = 0;
        for (; c < u.length; ) {
          const R = (f) => n ? f.buy_imbalance : f.sell_imbalance;
          if (!R(u[c])) {
            c++;
            continue;
          }
          let m = c + 1;
          for (; m < u.length && R(u[m]) && u[m - 1].bucket_idx + 1 === u[m].bucket_idx; ) m++;
          if (m - c >= Y)
            for (let f = c; f < m; f++)
              u[f].buy_stack = n ? !0 : u[f].buy_stack, u[f].sell_stack = n ? u[f].sell_stack : !0;
          c = m;
        }
      }
      return {
        timestamp_ms: g - (50 - a) * 6e4,
        levels: u,
        totalBuy: h,
        totalSell: p,
        totalVol: C,
        delta: h - p,
        pocPrice: u[T]?.price_mid || t,
        maxVol: G,
        maxAbsDelta: Math.max(...u.map((n) => Math.abs(n.delta)), 1),
        tickPerRow: b,
        range: l
      };
    });
  }, []);
  y.useEffect(() => {
    let t = !0;
    const _ = async () => {
      try {
        const x = await fetch(`/api/orderflow/footprint?symbol=${encodeURIComponent(E)}&provider=${encodeURIComponent(k)}`);
        if (x.ok) {
          const a = await x.json();
          if (t && a.columns?.length) {
            const i = a.columns.map((o) => {
              const l = o.levels || [];
              let d = 0, b = 0, D = 0, M = 0, N = 0;
              const S = l.map((s, $) => {
                const h = s.buy || s.bid || 0, p = s.sell || s.ask || 0, C = h + p;
                return C > N && (N = C, M = $), d += h, b += p, D += C, {
                  price_mid: s.price_mid || s.price || 0,
                  price_lo: s.price_lo || s.price || 0,
                  price_hi: s.price_hi || s.price || 0,
                  buy: h,
                  sell: p,
                  total: C,
                  delta: h - p,
                  bucket_idx: $
                };
              });
              let V = 1;
              S.forEach((s) => {
                Math.abs(s.delta) > V && (V = Math.abs(s.delta));
              });
              const z = S.map((s, $) => {
                let h = !1, p = !1;
                return s.buy > 0 && s.sell > 0 && (s.buy / s.sell >= 3 && (h = !0), s.sell / s.buy >= 3 && (p = !0)), { ...s, is_poc: $ === M, buy_imbalance: h, sell_imbalance: p };
              });
              return {
                timestamp_ms: o.timestamp_ms || o.time || Date.now(),
                levels: z,
                totalBuy: d,
                totalSell: b,
                totalVol: D,
                delta: d - b,
                pocPrice: z[M]?.price_mid || B.current,
                maxVol: N,
                maxAbsDelta: V,
                tickPerRow: o.tickPerRow || 0,
                range: o.range || 0
              };
            });
            J({ columns: i });
            const r = i[i.length - 1];
            r && (B.current = r.pocPrice || B.current);
            return;
          }
        }
      } catch {
      }
      if (t) {
        try {
          const x = await fetch(`/api/orderflow/quote?symbol=${encodeURIComponent(E)}&provider=${encodeURIComponent(k)}`);
          if (x.ok) {
            const a = await x.json();
            B.current = a.mid || a.last || B.current;
          }
        } catch {
        }
        J({ columns: A(B.current) });
      }
    };
    _();
    const g = setInterval(_, F * 12);
    return () => {
      t = !1, clearInterval(g);
    };
  }, [E, k, F, A]), y.useEffect(() => {
    q.current && (q.current.scrollLeft = q.current.scrollWidth);
  }, [v]);
  const L = v?.columns || [], U = y.useMemo(() => L.length ? L : A(B.current), [L, A]), w = y.useMemo(() => {
    let t = 0, _ = 0, g = 0, x = 0, a = 0, i = 0;
    return U.forEach((r) => {
      r.levels.forEach((o) => {
        t += o.buy, _ += o.sell, g += o.total, o.buy_imbalance && x++, o.sell_imbalance && a++, o.is_poc && i++;
      });
    }), { totalBuy: t, totalSell: _, totalVol: g, imbBuy: x, imbSell: a, delta: t - _, pocCount: i };
  }, [U]), j = (t) => Math.abs(t) >= 1e6 ? (t / 1e6).toFixed(1) + "M" : Math.abs(t) >= 1e3 ? (t / 1e3).toFixed(1) + "K" : Math.abs(t) >= 100 ? t.toFixed(0) : t.toFixed(1), O = U.slice(-40);
  return /* @__PURE__ */ e.jsxs("div", { className: "h-full flex flex-col bg-[#121214] text-[#e8e8e8] overflow-hidden", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 px-3 h-11 border-b border-[#232326] bg-[#1a1a1e] shrink-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e.jsx("span", { className: "text-[11px] font-bold tracking-[0.12em] text-[#a1a1aa] font-sans", children: "FOOTPRINT" }),
        /* @__PURE__ */ e.jsx("span", { className: "w-px h-3 bg-[#2a2a2e]" }),
        /* @__PURE__ */ e.jsx("span", { className: "font-mono text-[12px] font-semibold tracking-wide text-[#e4e4e7]", children: E }),
        /* @__PURE__ */ e.jsxs("span", { className: "px-2 py-0.5 rounded-full bg-[#232326] border border-[#2e2e32] text-[10px] text-[#a1a1aa] font-mono flex items-center gap-1", children: [
          /* @__PURE__ */ e.jsx("span", { className: "w-1 h-1 rounded-full bg-emerald-400 animate-pulse" }),
          k.toUpperCase(),
          " ",
          F,
          "ms"
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "hidden lg:flex items-center gap-1.5 ml-4 text-[10px] font-mono", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "px-2 py-0.5 rounded-md bg-[#1e2a28] border border-[#21b3a4]/20 text-[#5ee9d5]", children: [
          "B ",
          j(w.totalBuy)
        ] }),
        /* @__PURE__ */ e.jsxs("span", { className: "px-2 py-0.5 rounded-md bg-[#2a1e22] border border-[#f0426c]/20 text-[#ff7a96]", children: [
          "S ",
          j(w.totalSell)
        ] }),
        /* @__PURE__ */ e.jsxs("span", { className: `px-2 py-0.5 rounded-md border ${w.delta >= 0 ? "bg-[#1e2a28] border-[#21b3a4]/20 text-[#5ee9d5]" : "bg-[#2a1e22] border-[#f0426c]/20 text-[#ff7a96]"}`, children: [
          "Δ ",
          w.delta >= 0 ? "+" : "",
          j(w.delta)
        ] }),
        /* @__PURE__ */ e.jsxs("span", { className: "px-2 py-0.5 rounded-md bg-[#232326] border border-[#2e2e32] text-[#a1a1aa]", children: [
          "IMB B",
          w.imbBuy,
          " S",
          w.imbSell,
          " • POC ",
          w.pocCount
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
        /* @__PURE__ */ e.jsx("div", { className: "flex gap-1 p-0.5 rounded-lg bg-[#232326] border border-[#2e2e32]", children: ["cluster", "delta", "volume"].map((t) => /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: () => Q(t),
            className: `px-2.5 py-1 rounded-md text-[11px] font-medium capitalize font-sans transition-all ${P === t ? "bg-[#e4e4e7] text-[#121214] shadow-sm" : "text-[#a1a1aa] hover:bg-[#2a2a2e] hover:text-[#e4e4e7]"}`,
            children: t === "cluster" ? "Sells × Buys" : t === "delta" ? "Delta" : "Volume"
          },
          t
        )) }),
        /* @__PURE__ */ e.jsxs("div", { className: "text-[10px] text-[#71717a] font-mono hidden md:block", children: [
          O.length,
          " cols • range/18 • ratio 3.0"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { ref: q, className: "flex-1 overflow-auto flex gap-px p-1 bg-[#0e0e10] scrollbar-thin", children: O.map((t, _) => {
      const g = t.maxVol || 1, x = t.maxAbsDelta || 1;
      return /* @__PURE__ */ e.jsxs("div", { className: "min-w-[68px] w-[68px] rounded-[8px] border border-[#232326] bg-[#1a1a1e] overflow-hidden flex flex-col shrink-0", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "px-2 py-1 bg-[#1e1e22] border-b border-[#232326] flex items-center justify-between", children: [
          /* @__PURE__ */ e.jsx("span", { className: "text-[9px] text-[#71717a] font-mono", children: new Date(t.timestamp_ms).toLocaleTimeString([], { hour12: !1, minute: "2-digit", second: "2-digit" }) }),
          /* @__PURE__ */ e.jsx("span", { className: `w-1 h-1 rounded-full ${t.delta >= 0 ? "bg-[#21b3a4]" : "bg-[#f0426c]"}` })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "flex-1 flex flex-col", children: t.levels.map((a, i) => {
          let r = a.sell / g;
          r = Math.sqrt(Math.max(0, r));
          let o = a.buy / g;
          o = Math.sqrt(Math.max(0, o));
          let l = Math.abs(a.delta) / x;
          l = Math.sqrt(l);
          let d = a.total / g;
          d = Math.sqrt(d);
          const b = `rgba(${Math.round(25 + 130 * r)},${Math.round(14 + 20 * r)},${Math.round(30 + 60 * r)},${0.92 + 0.08 * r})`, D = `rgba(${Math.round(14 + 20 * o)},${Math.round(20 + 55 * o)},${Math.round(35 + 120 * o)},${0.92 + 0.08 * o})`;
          let M = "";
          P === "delta" ? a.delta >= 0 ? M = `rgba(${Math.round(14 + 20 * l)},${Math.round(20 + 60 * l)},${Math.round(35 + 110 * l)},${0.92 + 0.08 * l})` : M = `rgba(${Math.round(25 + 125 * l)},${Math.round(14 + 20 * l)},${Math.round(30 + 55 * l)},${0.92 + 0.08 * l})` : P === "volume" && (M = `rgba(${Math.round(14 + 20 * d)},${Math.round(20 + 50 * d)},${Math.round(40 + 115 * d)},${0.92 + 0.08 * d})`);
          const N = 18;
          return P === "cluster" ? /* @__PURE__ */ e.jsxs("div", { className: "relative flex h-[18px] border-b border-[#1e1e22]/60", style: { height: N }, children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex-1 flex items-center justify-center text-[9px] font-mono relative overflow-hidden", style: { background: b }, children: [
              a.sell_imbalance && /* @__PURE__ */ e.jsx("span", { className: "absolute inset-0 border border-[#ff5a5a]/70 pointer-events-none" }),
              a.is_poc && /* @__PURE__ */ e.jsx("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-[#f59e0b]/80 pointer-events-none" }),
              /* @__PURE__ */ e.jsx("span", { className: "relative text-[#e8d5d5] tracking-tight", children: j(a.sell) })
            ] }),
            /* @__PURE__ */ e.jsx("div", { className: "w-px bg-[#2a2a2e]/80 shrink-0" }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex-1 flex items-center justify-center text-[9px] font-mono relative overflow-hidden", style: { background: D }, children: [
              a.buy_imbalance && /* @__PURE__ */ e.jsx("span", { className: "absolute inset-0 border border-[#5ee9d5]/70 pointer-events-none" }),
              a.is_poc && /* @__PURE__ */ e.jsx("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-[#f59e0b]/80 pointer-events-none" }),
              /* @__PURE__ */ e.jsx("span", { className: "relative text-[#d5e8e8] tracking-tight", children: j(a.buy) })
            ] })
          ] }, i) : /* @__PURE__ */ e.jsxs("div", { className: "relative flex items-center justify-center h-[18px] border-b border-[#1e1e22]/60 text-[9px] font-mono", style: { background: M, height: N }, children: [
            a.is_poc && /* @__PURE__ */ e.jsx("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-[#f59e0b]/80 pointer-events-none" }),
            (a.buy_imbalance || a.sell_imbalance) && /* @__PURE__ */ e.jsx("span", { className: `absolute inset-0 border pointer-events-none ${a.buy_imbalance ? "border-[#5ee9d5]/70" : "border-[#ff5a5a]/70"}` }),
            /* @__PURE__ */ e.jsx("span", { className: "relative text-[#e4e4e7]", children: P === "delta" ? (a.delta > 0 ? "+" : "") + j(a.delta) : j(a.total) })
          ] }, i);
        }) }),
        /* @__PURE__ */ e.jsxs("div", { className: "px-1.5 py-1 bg-[#1a1a1e] border-t border-[#232326] text-[8px] text-[#71717a] font-mono flex justify-between", children: [
          /* @__PURE__ */ e.jsxs("span", { children: [
            "V:",
            j(t.totalVol)
          ] }),
          /* @__PURE__ */ e.jsxs("span", { className: t.delta >= 0 ? "text-[#5ee9d5]" : "text-[#ff7a96]", children: [
            "D:",
            t.delta >= 0 ? "+" : "",
            j(t.delta)
          ] })
        ] })
      ] }, _);
    }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "px-3 py-1.5 text-[10px] text-[#52525b] border-t border-[#232326] bg-[#1a1a1e] shrink-0 font-mono flex justify-between", children: [
      /* @__PURE__ */ e.jsxs("span", { children: [
        "Cluster = Sells×Buys • Delta = single col blue/pink • Volume • Imbalance 3.0 SamePrice • POC • V/D • ",
        U.length,
        " total • ",
        O.length,
        " visible zoomed-in"
      ] }),
      /* @__PURE__ */ e.jsxs("span", { children: [
        k.toUpperCase(),
        " ",
        F,
        "ms • SoA • range/18 • 12px min"
      ] })
    ] })
  ] });
}
export {
  te as EdgeDepthFootprintPanel,
  te as default
};
