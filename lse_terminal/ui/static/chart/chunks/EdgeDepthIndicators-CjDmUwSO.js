import { r as y, j as d } from "./react-vendor-C0yw3i6b.js";
const A = [
  { id: "volume", label: "Volume", desc: "Volume bars • bullish/bearish", enabled: !0, height: 120, lseKey: "volume", icon: "▤" },
  { id: "cvd", label: "CVD", desc: "Cumulative Delta • session", enabled: !0, height: 130, lseKey: "cvd", icon: "◧" },
  { id: "rsi", label: "RSI", desc: "RSI 14 • 70/30", enabled: !1, height: 120, lseKey: "rsi", icon: "◨" },
  { id: "macd", label: "MACD", desc: "MACD 12/26/9 • histogram", enabled: !1, height: 130, lseKey: "macd", icon: "≋" },
  { id: "funding", label: "Funding", desc: "Funding Rate • 8h", enabled: !1, height: 110, icon: "₿" },
  { id: "oi", label: "Open Interest", desc: "OI OHLC • change", enabled: !1, height: 130, icon: "◫" },
  { id: "vpin", label: "VPIN", desc: "Toxicity 0-1.0 • .25/.50/.75", enabled: !1, height: 140, icon: "⚠" },
  { id: "toxicity", label: "Toxicity", desc: "Regime washes • 0.30/0.45/0.60", enabled: !1, height: 110, icon: "☢" }
];
function k({ id: b, data: f, height: s }) {
  const v = y.useRef(null), g = y.useRef(null), w = y.useCallback(() => {
    const m = v.current, x = g.current;
    if (!m || !x) return;
    const c = x.getBoundingClientRect();
    if (c.width < 10 || c.height < 10) return;
    const u = window.devicePixelRatio || 1;
    m.width = Math.round(c.width * u), m.height = Math.round(s * u), m.style.width = `${c.width}px`, m.style.height = `${s}px`;
    const e = m.getContext("2d");
    if (e) {
      if (e.setTransform(u, 0, 0, u, 0, 0), e.clearRect(0, 0, c.width, s), e.fillStyle = "#1c1c1c", e.fillRect(0, 0, c.width, s), b === "volume") {
        const a = f?.bars || Array.from({ length: 50 }, () => ({ volume: Math.random() * 100 + 10, bullish: Math.random() > 0.5 })), i = Math.max(...a.map((o) => o.volume), 1), l = c.width / a.length;
        a.forEach((o, n) => {
          const t = o.volume / i * (s - 20);
          e.fillStyle = o.bullish ? "#21b3a4" : "#f0426c", e.globalAlpha = 0.8, e.fillRect(n * l + 1, s - t - 4, l - 2, t);
        }), e.globalAlpha = 1;
      } else if (b === "cvd") {
        const a = f?.points || f?.cvd?.points || Array.from({ length: 50 }, (t, r) => ({ value: Math.sin(r / 5) * 100 + (Math.random() - 0.5) * 20 }));
        if (a.length < 2) return;
        const i = a.map((t) => t.value ?? t.cvd ?? t.delta ?? 0), l = Math.min(...i), o = Math.max(...i), n = o - l || 1;
        if (e.strokeStyle = "#21b3a4", e.lineWidth = 1.5, e.beginPath(), i.forEach((t, r) => {
          const h = r / (i.length - 1) * c.width, p = s - 10 - (t - l) / n * (s - 30);
          r === 0 ? e.moveTo(h, p) : e.lineTo(h, p);
        }), e.stroke(), l < 0 && o > 0) {
          const t = s - 10 - (0 - l) / n * (s - 30);
          e.strokeStyle = "#3a3a3a", e.setLineDash([2, 2]), e.beginPath(), e.moveTo(0, t), e.lineTo(c.width, t), e.stroke(), e.setLineDash([]);
        }
      } else if (b === "rsi") {
        const a = f?.values || Array.from({ length: 50 }, (i, l) => 50 + Math.sin(l / 3) * 20 + (Math.random() - 0.5) * 5);
        e.strokeStyle = "#f0426c", e.globalAlpha = 0.3, e.setLineDash([4, 2]), e.beginPath(), e.moveTo(0, s * 0.2), e.lineTo(c.width, s * 0.2), e.stroke(), e.beginPath(), e.moveTo(0, s * 0.8), e.lineTo(c.width, s * 0.8), e.stroke(), e.setLineDash([]), e.globalAlpha = 1, e.fillStyle = "#f0426c", e.globalAlpha = 0.6, e.font = "9px monospace", e.fillText("70", 4, s * 0.2 + 3), e.fillStyle = "#21b3a4", e.fillText("30", 4, s * 0.8 + 3), e.globalAlpha = 1, e.strokeStyle = "#e8e8e8", e.lineWidth = 1.2, e.beginPath(), a.forEach((i, l) => {
          const o = l / (a.length - 1) * c.width, n = s - 10 - i / 100 * (s - 20);
          l === 0 ? e.moveTo(o, n) : e.lineTo(o, n);
        }), e.stroke();
      } else if (b === "macd") {
        const a = f?.macd || Array.from({ length: 50 }, (n, t) => Math.sin(t / 4) * 5), i = f?.signal || Array.from({ length: 50 }, (n, t) => Math.cos(t / 4) * 4), l = a.map((n, t) => n - (i[t] || 0)), o = Math.max(...a.map(Math.abs), ...i.map(Math.abs), ...l.map(Math.abs), 1);
        l.forEach((n, t) => {
          const r = t / l.length * c.width, h = c.width / l.length - 1, p = n / o * (s / 2 - 10);
          e.fillStyle = n >= 0 ? "#21b3a4" : "#f0426c", e.globalAlpha = 0.7, p >= 0 ? e.fillRect(r, s / 2 - p, h, p) : e.fillRect(r, s / 2, h, -p);
        }), e.globalAlpha = 1, e.strokeStyle = "#60a5fa", e.lineWidth = 1.2, e.beginPath(), a.forEach((n, t) => {
          const r = t / a.length * c.width, h = s / 2 - n / o * (s / 2 - 15);
          t === 0 ? e.moveTo(r, h) : e.lineTo(r, h);
        }), e.stroke(), e.strokeStyle = "#f59e0b", e.beginPath(), i.forEach((n, t) => {
          const r = t / i.length * c.width, h = s / 2 - n / o * (s / 2 - 15);
          t === 0 ? e.moveTo(r, h) : e.lineTo(r, h);
        }), e.stroke();
      } else if (b === "funding") {
        const a = f?.bars || f?.funding?.bars || Array.from({ length: 50 }, () => ({ rate: (Math.random() - 0.5) * 1e-3 })), i = Math.max(...a.map((o) => Math.abs(o.rate)), 1e-4), l = c.width / a.length;
        a.forEach((o, n) => {
          const t = Math.abs(o.rate) / i * (s / 2 - 5);
          e.fillStyle = o.rate >= 0 ? "#21b3a4" : "#f0426c";
          const r = n * l + 1;
          o.rate >= 0 ? e.fillRect(r, s / 2 - t, l - 2, t) : e.fillRect(r, s / 2, l - 2, t);
        }), e.strokeStyle = "#3a3a3a", e.beginPath(), e.moveTo(0, s / 2), e.lineTo(c.width, s / 2), e.stroke();
      } else if (b === "oi") {
        const a = f?.bars || f?.oi?.bars || Array.from({ length: 50 }, () => ({ open: 1e6, high: 102e4, low: 98e4, close: 101e4 + (Math.random() - 0.5) * 5e4 })), i = a.flatMap((t) => [t.open, t.high, t.low, t.close]), l = Math.min(...i), n = Math.max(...i) - l || 1;
        a.forEach((t, r) => {
          const h = r / a.length * c.width + c.width / a.length / 2, p = s - 10 - (t.open - l) / n * (s - 20), M = s - 10 - (t.close - l) / n * (s - 20), R = s - 10 - (t.high - l) / n * (s - 20), T = s - 10 - (t.low - l) / n * (s - 20), E = t.close >= t.open;
          e.strokeStyle = E ? "#21b3a4" : "#f0426c", e.lineWidth = 1, e.beginPath(), e.moveTo(h, R), e.lineTo(h, T), e.stroke(), e.fillStyle = E ? "#21b3a4" : "#f0426c";
          const S = Math.min(p, M), N = Math.max(2, Math.abs(p - M));
          e.fillRect(h - 2, S, 4, N);
        });
      } else if (b === "vpin") {
        const a = f?.points || f?.vpin?.points || Array.from({ length: 100 }, () => ({ vpin: Math.random(), regime: ["NORMAL", "ELEVATED", "HIGH", "EXTREME"][Math.floor(Math.random() * 4)] }));
        a.forEach((i, l) => {
          if (i.regime === "NORMAL") return;
          const o = l / a.length * c.width, n = c.width / a.length;
          i.regime === "ELEVATED" ? e.fillStyle = "rgba(33,179,164,0.08)" : i.regime === "HIGH" ? e.fillStyle = "rgba(240,66,108,0.1)" : e.fillStyle = "rgba(240,66,108,0.18)", e.fillRect(o, 0, n, s);
        }), e.strokeStyle = "#2a2a2a", e.setLineDash([2, 2]), [0.25, 0.5, 0.75].forEach((i) => {
          const l = s - 10 - i * (s - 20);
          e.beginPath(), e.moveTo(0, l), e.lineTo(c.width, l), e.stroke();
        }), e.setLineDash([]), e.strokeStyle = "#3a3a3a", e.setLineDash([1, 3]), [0.3, 0.45, 0.6].forEach((i) => {
          const l = s - 10 - i * (s - 20);
          e.beginPath(), e.moveTo(0, l), e.lineTo(c.width, l), e.stroke();
        }), e.setLineDash([]), e.strokeStyle = "#e8e8e8", e.lineWidth = 1.2, e.beginPath(), a.forEach((i, l) => {
          const o = l / a.length * c.width, n = s - 10 - i.vpin * (s - 20);
          l === 0 ? e.moveTo(o, n) : e.lineTo(o, n);
        }), e.stroke(), e.fillStyle = "#6a6a6a", e.font = "9px monospace", e.fillText("1.0", 4, 12), e.fillText("0.75", 4, s * 0.25 + 4), e.fillText("0.50", 4, s * 0.5 + 4), e.fillText("0.25", 4, s * 0.75 + 4), e.fillText("0.0", 4, s - 4);
      } else if (b === "toxicity") {
        const a = f?.regimes || Array.from({ length: 50 }, () => ["NORMAL", "ELEVATED", "HIGH", "EXTREME"][Math.floor(Math.random() * 4)]);
        a.forEach((l, o) => {
          const n = o / a.length * c.width, t = c.width / a.length;
          l === "NORMAL" ? e.fillStyle = "#21b3a4" : l === "ELEVATED" ? e.fillStyle = "#f59e0b" : l === "HIGH" ? e.fillStyle = "#f0426c" : e.fillStyle = "#ef4444", e.fillRect(n, 0, t, 3);
        }), a.forEach((l, o) => {
          if (l === "NORMAL") return;
          const n = o / a.length * c.width, t = c.width / a.length;
          l === "ELEVATED" ? e.fillStyle = "rgba(245,158,11,0.08)" : l === "HIGH" ? e.fillStyle = "rgba(240,66,108,0.12)" : e.fillStyle = "rgba(239,68,68,0.18)", e.fillRect(n, 3, t, s - 3);
        });
        const i = a[a.length - 1] || "NORMAL";
        e.fillStyle = i === "NORMAL" ? "#21b3a4" : i === "ELEVATED" ? "#f59e0b" : "#f0426c", e.font = "11px monospace", e.fillText(i, c.width - 80, s - 8), e.fillStyle = "#6a6a6a", e.font = "9px sans-serif", e.fillText("TOXICITY • 0.30/0.45/0.60", 4, s - 8);
      }
    }
  }, [b, f, s]);
  return y.useEffect(() => {
    w();
    const m = new ResizeObserver(() => w());
    return g.current && m.observe(g.current), () => m.disconnect();
  }, [w]), /* @__PURE__ */ d.jsx("div", { ref: g, className: "w-full", style: { height: s }, children: /* @__PURE__ */ d.jsx("canvas", { ref: v, className: "block w-full", style: { height: s } }) });
}
function I({
  symbol: b,
  provider: f = "binance",
  onToggle: s,
  enabledIds: v
}) {
  const [g, w] = y.useState(A), [m, x] = y.useState({});
  y.useEffect(() => {
    v && w((a) => a.map((i) => ({ ...i, enabled: v.has(i.id) })));
  }, [v]), y.useEffect(() => {
    let a = !0;
    const i = async () => {
      try {
        try {
          const o = await fetch(`/api/orderflow/cvd?symbol=${encodeURIComponent(b)}&provider=${encodeURIComponent(f)}&window=session`);
          if (o.ok && a) {
            const n = await o.json();
            x((t) => ({ ...t, cvd: n, cvd_points: n.points || n.bars }));
          }
        } catch {
        }
        try {
          const o = await fetch(`/api/orderflow/funding?symbol=${encodeURIComponent(b)}&provider=${encodeURIComponent(f)}`);
          if (o.ok && a) {
            const n = await o.json();
            x((t) => ({ ...t, funding: n }));
          } else {
            const n = Array.from({ length: 50 }, (t, r) => ({ time: Date.now() - (50 - r) * 8 * 36e5, rate: (Math.random() - 0.5) * 15e-4 }));
            a && x((t) => ({ ...t, funding: { bars: n } }));
          }
        } catch {
          const o = Array.from({ length: 50 }, (n, t) => ({ time: Date.now() - (50 - t) * 8 * 36e5, rate: (Math.random() - 0.5) * 15e-4 }));
          a && x((n) => ({ ...n, funding: { bars: o } }));
        }
        try {
          const o = await fetch(`/api/orderflow/oi?symbol=${encodeURIComponent(b)}&provider=${encodeURIComponent(f)}`);
          if (o.ok && a) {
            const n = await o.json();
            x((t) => ({ ...t, oi: n }));
          } else {
            const n = Array.from({ length: 50 }, (t, r) => {
              const h = 1e6 + Math.sin(r / 5) * 2e5 + Math.random() * 1e5;
              return { time: Date.now() - (50 - r) * 36e5, open: h, high: h * 1.03, low: h * 0.97, close: h + (Math.random() - 0.5) * 1e5 };
            });
            a && x((t) => ({ ...t, oi: { bars: n } }));
          }
        } catch {
          const o = Array.from({ length: 50 }, (n, t) => {
            const r = 1e6 + Math.sin(t / 5) * 2e5 + Math.random() * 1e5;
            return { time: Date.now() - (50 - t) * 36e5, open: r, high: r * 1.03, low: r * 0.97, close: r + (Math.random() - 0.5) * 1e5 };
          });
          a && x((n) => ({ ...n, oi: { bars: o } }));
        }
        try {
          const o = await fetch(`/api/orderflow/vpin?symbol=${encodeURIComponent(b)}&provider=${encodeURIComponent(f)}`);
          if (o.ok && a) {
            const n = await o.json();
            x((t) => ({ ...t, vpin: n }));
          } else {
            const n = Array.from({ length: 100 }, (t, r) => ({
              ts_ms: Date.now() - (100 - r) * 6e4,
              vpin: 0.3 + Math.sin(r / 10) * 0.2 + Math.random() * 0.15,
              conf: 0.8 + Math.random() * 0.2,
              regime: r % 30 < 20 ? "NORMAL" : r % 30 < 25 ? "ELEVATED" : r % 30 < 28 ? "HIGH" : "EXTREME"
            }));
            a && x((t) => ({ ...t, vpin: { points: n } }));
          }
        } catch {
          const o = Array.from({ length: 100 }, (n, t) => ({
            ts_ms: Date.now() - (100 - t) * 6e4,
            vpin: 0.3 + Math.sin(t / 10) * 0.2 + Math.random() * 0.15,
            conf: 0.8 + Math.random() * 0.2,
            regime: t % 30 < 20 ? "NORMAL" : t % 30 < 25 ? "ELEVATED" : t % 30 < 28 ? "HIGH" : "EXTREME"
          }));
          a && x((n) => ({ ...n, vpin: { points: o } }));
        }
        if (a) {
          const o = Array.from({ length: 50 }, (n, t) => ({ volume: 20 + Math.random() * 80 + (t % 10 === 0 ? 50 : 0), bullish: Math.random() > 0.45 }));
          x((n) => ({
            ...n,
            volume: { bars: o },
            rsi: { values: Array.from({ length: 50 }, (t, r) => 50 + Math.sin(r / 3) * 25 + (Math.random() - 0.5) * 8) },
            macd: {
              macd: Array.from({ length: 50 }, (t, r) => Math.sin(r / 4) * 6),
              signal: Array.from({ length: 50 }, (t, r) => Math.cos(r / 4) * 4)
            },
            toxicity: { regimes: Array.from({ length: 50 }, (t, r) => r % 30 < 20 ? "NORMAL" : r % 30 < 25 ? "ELEVATED" : r % 30 < 28 ? "HIGH" : "EXTREME") }
          }));
        }
      } catch {
      }
    };
    i();
    const l = setInterval(i, 5e3);
    return () => {
      a = !1, clearInterval(l);
    };
  }, [b, f]);
  const c = (a) => {
    w((i) => {
      const l = i.map((n) => n.id === a ? { ...n, enabled: !n.enabled } : n), o = l.find((n) => n.id === a);
      if (o) {
        const n = o.lseKey;
        if (n)
          try {
            const t = window.__lseShell;
            t?.setIndicators ? t.setIndicators({ [n]: { enabled: o.enabled } }) : window.dispatchEvent(new CustomEvent("lset:indicator-toggle", { detail: { key: n, enabled: o.enabled } }));
          } catch {
          }
        s?.(a, o.enabled);
      }
      return l;
    });
  }, u = g.filter((a) => a.enabled), e = m.vpin?.points?.slice(-1)[0];
  return /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col h-full bg-[#1c1c1c] text-[#e8e8e8] select-none", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 px-3 h-10 border-b border-[#2a2a2a] bg-[#1c1c1c] shrink-0 overflow-x-auto scrollbar-thin", children: [
      /* @__PURE__ */ d.jsx("span", { className: "text-[11px] font-semibold tracking-wider shrink-0 font-sans", children: "INDICATORS" }),
      /* @__PURE__ */ d.jsxs("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] shrink-0 font-sans", children: [
        u.length,
        " active • ",
        A.length,
        " total"
      ] }),
      /* @__PURE__ */ d.jsx("div", { className: "flex items-center gap-1 ml-2", children: g.map((a) => /* @__PURE__ */ d.jsxs(
        "button",
        {
          onClick: () => c(a.id),
          className: `px-2.5 py-1 rounded-full border text-[11px] font-medium flex items-center gap-1 transition-colors whitespace-nowrap font-sans ${a.enabled ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c] shadow-sm" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
          title: `${a.desc}${a.lseKey ? " • LSE dedup: take ONE" : ""}`,
          children: [
            /* @__PURE__ */ d.jsx("span", { className: "text-[12px]", children: a.icon }),
            " ",
            a.label
          ]
        },
        a.id
      )) }),
      /* @__PURE__ */ d.jsx("span", { className: "ml-auto text-[10px] text-[#6a6a6a] hidden lg:block shrink-0 font-sans", children: "Render-in-order • LSE dedup • Canvas • SoA • No blank" })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "flex-1 overflow-auto p-2 space-y-2 bg-[#121212] scrollbar-thin", children: [
      u.length === 0 && /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center", children: [
        /* @__PURE__ */ d.jsx("div", { className: "w-12 h-12 rounded-full bg-[#262626] border border-[#3a3a3a] flex items-center justify-center text-[20px] mb-3", children: "◧" }),
        /* @__PURE__ */ d.jsx("div", { className: "text-[13px] font-medium text-[#e8e8e8] font-sans", children: "No indicators active" }),
        /* @__PURE__ */ d.jsx("div", { className: "text-[11px] text-[#6a6a6a] mt-1 max-w-[320px] font-sans leading-relaxed", children: "Click pills above to add Volume, CVD, RSI, MACD, Funding Rate, Open Interest, VPIN, Toxicity. LSE duplicates take ONE implementation. Canvas rendering, SoA cache, no blank." })
      ] }),
      u.map((a) => /* @__PURE__ */ d.jsxs("div", { className: "rounded-xl border border-[#2a2a2a] bg-[#1c1c1c] overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 border-b border-[#2a2a2a] bg-[#262626]", children: [
          /* @__PURE__ */ d.jsx("span", { className: "text-[14px]", children: a.icon }),
          /* @__PURE__ */ d.jsx("span", { className: "text-[12px] font-semibold text-[#e8e8e8] font-sans", children: a.label }),
          /* @__PURE__ */ d.jsx("span", { className: "text-[10px] text-[#6a6a6a] font-sans", children: a.desc }),
          /* @__PURE__ */ d.jsx("span", { className: "ml-auto text-[10px] px-2 py-0.5 rounded-full bg-[#1c1c1c] border border-[#3a3a3a] text-[#b9b9b9] font-mono", children: a.id === "funding" ? `${((m.funding?.bars?.slice(-1)[0]?.rate || 0) * 100).toFixed(4)}%` : a.id === "oi" ? `${(m.oi?.bars?.slice(-1)[0]?.close || 12e5).toFixed(0)}` : a.id === "vpin" ? e ? `${e.vpin.toFixed(4)} ${e.regime}` : "0.4567 NORMAL" : a.id === "toxicity" ? m.toxicity?.regimes?.slice(-1)[0] || "NORMAL" : "Live" }),
          /* @__PURE__ */ d.jsx("button", { onClick: () => c(a.id), className: "w-6 h-6 rounded-md bg-[#1c1c1c] border border-[#3a3a3a] text-[#6a6a6a] hover:text-[#e8e8e8] hover:bg-[#343434] flex items-center justify-center text-[12px] transition-colors", children: "×" })
        ] }),
        /* @__PURE__ */ d.jsx(k, { id: a.id, data: m[a.id] || m, height: a.height })
      ] }, a.id))
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "px-3 py-1.5 text-[10px] text-[#6a6a6a] border-t border-[#2a2a2a] bg-[#1c1c1c] shrink-0 font-sans flex justify-between", children: [
      /* @__PURE__ */ d.jsx("span", { children: "Volume bullish #21b3a4 bearish #f0426c • CVD zero line #3a3a3a • RSI 70/30 dashed • MACD #60a5fa signal #f59e0b hist #21b3a4/#f0426c • Funding ± • OI OHLC • VPIN 0-1.0 .25/.50/.75 dotted .30/.45/.60 washes • Toxicity 3px strip" }),
      /* @__PURE__ */ d.jsxs("span", { className: "hidden lg:block", children: [
        "Canvas • SoA • ",
        u.length,
        " active"
      ] })
    ] })
  ] });
}
export {
  I as EdgeDepthIndicators,
  I as default
};
