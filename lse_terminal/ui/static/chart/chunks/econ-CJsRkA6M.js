import { r as u, j as e } from "./react-vendor-C0yw3i6b.js";
import { i as he } from "./echarts-CX0oZ33U.js";
import { g as le } from "./backtest-BOI-AqD2.js";
const X = (o, r) => typeof document < "u" && getComputedStyle(document.documentElement).getPropertyValue(o).trim() || r, t = {
  bg: X("--bg", "#0d0e10"),
  panel: X("--panel", "#151619"),
  edge: X("--edge", "#26282c"),
  active: X("--active", "#1b1d20"),
  text: X("--text", "#e6e8ea"),
  dim: X("--dim", "#8b8e94"),
  up: X("--up", "#21b3a4"),
  down: X("--down", "#f0426c"),
  // Series colors validated (dataviz six checks) against the dark surface:
  // marks also differ (bar / dashed / dotted) so identity never rides on
  // color alone.
  actual: "#5b8def",
  consensus: "#c58435",
  previous: "#9575dd"
}, Te = {
  AR: "ar",
  AU: "au",
  BR: "br",
  CA: "ca",
  CN: "cn",
  DE: "de",
  EA: "eu",
  ES: "es",
  EU: "eu",
  FR: "fr",
  GB: "gb",
  ID: "id",
  IN: "in",
  IT: "it",
  JP: "jp",
  KR: "kr",
  MX: "mx",
  RU: "ru",
  SA: "sa",
  SG: "sg",
  TR: "tr",
  UK: "gb",
  US: "us",
  ZA: "za"
}, ze = /* @__PURE__ */ new Set(["IF", "WL", "XX"]);
function K({ code: o, size: r = 12 }) {
  const [n, a] = u.useState(!0), p = (o || "").toUpperCase(), l = Te[p] || (/^[A-Z]{2}$/.test(p) && !ze.has(p) ? p.toLowerCase() : "");
  return !l || !n ? null : /* @__PURE__ */ e.jsx(
    "img",
    {
      src: `https://flagcdn.com/w20/${l}.png`,
      srcSet: `https://flagcdn.com/w40/${l}.png 2x`,
      width: Math.round(r * 4 / 3),
      height: r,
      style: { display: "inline-block", verticalAlign: "-1px", borderRadius: 1 },
      onError: () => a(!1),
      alt: ""
    }
  );
}
const G = {
  AR: { name: "Argentina", flag: "🇦🇷" },
  AU: { name: "Australia", flag: "🇦🇺" },
  BR: { name: "Brazil", flag: "🇧🇷" },
  CA: { name: "Canada", flag: "🇨🇦" },
  CN: { name: "China", flag: "🇨🇳" },
  DE: { name: "Germany", flag: "🇩🇪" },
  EA: { name: "Euro Area", flag: "🇪🇺" },
  ES: { name: "Spain", flag: "🇪🇸" },
  EU: { name: "European Union", flag: "🇪🇺" },
  FR: { name: "France", flag: "🇫🇷" },
  GB: { name: "United Kingdom", flag: "🇬🇧" },
  ID: { name: "Indonesia", flag: "🇮🇩" },
  IF: { name: "International", flag: "🌐" },
  IN: { name: "India", flag: "🇮🇳" },
  IT: { name: "Italy", flag: "🇮🇹" },
  JP: { name: "Japan", flag: "🇯🇵" },
  KR: { name: "South Korea", flag: "🇰🇷" },
  MX: { name: "Mexico", flag: "🇲🇽" },
  RU: { name: "Russia", flag: "🇷🇺" },
  SA: { name: "Saudi Arabia", flag: "🇸🇦" },
  SG: { name: "Singapore", flag: "🇸🇬" },
  TR: { name: "Türkiye", flag: "🇹🇷" },
  UK: { name: "United Kingdom", flag: "🇬🇧" },
  US: { name: "United States", flag: "🇺🇸" },
  WL: { name: "World", flag: "🌐" },
  ZA: { name: "South Africa", flag: "🇿🇦" }
}, me = ["US", "EA", "GB", "JP", "DE", "CN", "CA", "AU"];
function V(o) {
  if (o == null || o === "") return null;
  const r = String(o).replace(/,/g, "").trim().match(/^(-?\d*\.?\d+)\s*([KMBT])?\s*%?$/i);
  if (!r) return null;
  const n = { K: 1e3, M: 1e6, B: 1e9, T: 1e12 }[(r[2] || "").toUpperCase()] ?? 1;
  return parseFloat(r[1]) * n;
}
function Me(o) {
  return o && String(o).includes("%") ? "%" : "";
}
function H(o, r) {
  if (o == null) return "—";
  if (r === "%") return `${+o.toFixed(3)}%`;
  const n = Math.abs(o);
  return n >= 1e12 ? `${+(o / 1e12).toFixed(2)}T` : n >= 1e9 ? `${+(o / 1e9).toFixed(2)}B` : n >= 1e6 ? `${+(o / 1e6).toFixed(2)}M` : n >= 1e3 ? `${+(o / 1e3).toFixed(1)}K` : `${+o.toFixed(3)}`;
}
const Se = /\s+((JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(\/\d{1,2})?|Q[1-4]|(19|20)\d{2})$/, Fe = /([a-z])((JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\/\d{1,2}|(19|20)\d{2})$/;
function xe(o) {
  let r = o.trim();
  for (let n = 0; n < 3 && Se.test(r); n++) r = r.replace(Se, "");
  return r = r.replace(Fe, "$1"), r;
}
function ce(o) {
  return xe(o).toLowerCase();
}
function z(o) {
  return o.toISOString().slice(0, 10);
}
function ke(o) {
  const r = new Date(o);
  return r.setDate(o.getDate() - (o.getDay() + 6) % 7), r;
}
function U(o, r) {
  const n = new Date(o);
  return n.setDate(o.getDate() + r), n;
}
function Ne(o, r) {
  const n = /* @__PURE__ */ new Date();
  switch (o) {
    case "today":
      return { start: z(n), end: z(n) };
    case "week": {
      const a = ke(n);
      return { start: z(a), end: z(U(a, 6)) };
    }
    case "nextweek": {
      const a = U(ke(n), 7);
      return { start: z(a), end: z(U(a, 6)) };
    }
    case "month":
      return { start: z(n), end: z(U(n, 31)) };
    case "past-month":
      return { start: z(U(n, -31)), end: z(n) };
    case "custom":
      return r;
  }
}
const Ce = {
  regions: me,
  impact: "all",
  range: "week",
  customStart: z(/* @__PURE__ */ new Date()),
  customEnd: z(U(/* @__PURE__ */ new Date(), 7)),
  chartType: "bar",
  chartRange: "3y",
  showConsensus: !0,
  showPrevious: !1,
  surpriseColors: !0,
  view: "calendar",
  country: "US",
  indCountry: "US",
  indCategory: "",
  bondCountry: "US",
  bankCountry: "US",
  macroRange: "10y"
}, de = [
  "US",
  "EU",
  "UK",
  "JP",
  "DE",
  "CN",
  "CA",
  "AU",
  "FR",
  "BR",
  "IN",
  "ES",
  "IT",
  "MX",
  "TR",
  "SG",
  "ZA",
  "KR",
  "RU",
  "ID",
  "SA",
  "AR"
];
async function se(o) {
  const r = new URL("/api/economic-calendar", window.location.origin);
  for (const [a, p] of Object.entries(o)) r.searchParams.set(a, p);
  const n = await fetch(r.toString());
  if (n.status === 409) throw new Error("no-key");
  if (!n.ok) throw new Error(`calendar fetch failed: ${n.status}`);
  return n.json();
}
let re = null;
function Be() {
  return re || (re = fetch("/api/macro/catalog").then((o) => {
    if (o.status === 409) throw new Error("no-key");
    if (!o.ok) throw new Error(`macro catalog failed: ${o.status}`);
    return o.json();
  }).catch((o) => {
    throw re = null, o;
  })), re;
}
async function Le(o, r, n) {
  const a = new URL("/api/macro/series", window.location.origin);
  a.searchParams.set("symbol", o), a.searchParams.set("dataset", r), n && a.searchParams.set("start", n), a.searchParams.set("limit", "5000");
  const p = await fetch(a.toString());
  if (p.status === 409) throw new Error("no-key");
  if (!p.ok) throw new Error(`series failed: ${p.status}`);
  return (await p.json()).map((k) => ({ date: String(k.date).slice(0, 10), value: Number(k.value) })).filter((k) => Number.isFinite(k.value));
}
function W(o, r) {
  if (o == null || !Number.isFinite(o)) return "—";
  const n = (r || "").toLowerCase();
  if (n === "percent" || n === "%")
    return `${Math.abs(o) >= 100 ? o.toFixed(1) : o.toFixed(2)}%`;
  const a = Math.abs(o);
  return a >= 1e9 ? `${(o / 1e9).toFixed(2)}B` : a >= 1e6 ? `${(o / 1e6).toFixed(2)}M` : a >= 1e4 ? o.toLocaleString(void 0, { maximumFractionDigits: 0 }) : a >= 100 ? o.toFixed(1) : o.toFixed(a >= 1 ? 2 : 3);
}
const $e = (o) => ["percent", "%"].includes((o || "").toLowerCase());
function De(o) {
  const r = (o.country || "").toUpperCase();
  return r && o.name.toUpperCase().startsWith(r + " ") ? o.name.slice(r.length + 1) : o.name;
}
function Re(o) {
  if (o == null) return { text: "", title: "" };
  const r = `${o > 0 ? "+" : ""}${o}% vs a year ago`;
  return Math.abs(o) >= 1e3 ? { text: `${o > 0 ? ">+" : "<-"}999%`, title: r } : { text: `${o > 0 ? "+" : ""}${o.toFixed(1)}%`, title: r };
}
const Oe = {
  "1M": 30,
  "2M": 60,
  "3M": 90,
  "6M": 180,
  "1Y": 365,
  "2Y": 730,
  "3Y": 1095,
  "4Y": 1460,
  "5Y": 1825,
  "6Y": 2190,
  "7Y": 2555,
  "8Y": 2920,
  "9Y": 3285,
  "10Y": 3650,
  "15Y": 5475,
  "20Y": 7300,
  "25Y": 9125,
  "30Y": 10950,
  "40Y": 14600,
  "50Y": 18250
};
function ie(o) {
  const r = o.symbol.match(/(\d+[YM])(TIPS|IL|IND)?$/i);
  return r ? r[1].toUpperCase() + (r[2] ? ` ${r[2].toUpperCase()}` : "") : o.symbol;
}
function ae(o) {
  const r = o.split(" ")[0];
  return Oe[r] ?? 99999;
}
const Ae = ["US", "EA", "GB", "JP", "CH", "CN", "CA", "AU", "NZ", "SE", "NO"], ue = [
  "Interest Rate",
  "Deposit Interest Rate",
  "Lending Rate",
  "Bank Lending Rate",
  "Interbank Rate",
  "Cash Reserve Ratio",
  "Reverse Repo Rate",
  "Central Bank Balance Sheet",
  "Money Supply M0",
  "Money Supply M1",
  "Money Supply M2",
  "Money Supply M3",
  "Foreign Exchange Reserves",
  "Gold Reserves",
  "Banks Balance Sheet",
  "Loan Growth",
  "Loans to Private Sector"
];
function ne({ options: o, value: r, onChange: n }) {
  return /* @__PURE__ */ e.jsx("div", { style: { display: "inline-flex", background: t.panel, border: `1px solid ${t.edge}`, borderRadius: 4 }, children: o.map((a) => /* @__PURE__ */ e.jsx(
    "button",
    {
      onClick: () => n(a.key),
      style: {
        padding: "4px 10px",
        fontSize: 11,
        letterSpacing: ".04em",
        border: "none",
        cursor: "pointer",
        borderRadius: 3,
        background: r === a.key ? t.edge : "transparent",
        color: r === a.key ? t.text : t.dim
      },
      children: a.label
    },
    a.key
  )) });
}
function pe({ label: o, color: r, checked: n, onChange: a }) {
  return /* @__PURE__ */ e.jsxs("label", { style: { display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: n ? t.text : t.dim, cursor: "pointer", userSelect: "none" }, children: [
    /* @__PURE__ */ e.jsx("input", { type: "checkbox", checked: n, onChange: (p) => a(p.target.checked), style: { accentColor: r || t.actual } }),
    r && /* @__PURE__ */ e.jsx("span", { style: { width: 8, height: 8, borderRadius: 2, background: r, opacity: n ? 1 : 0.35 } }),
    o
  ] });
}
function _e({ values: o, height: r = 20 }) {
  let p = Math.min(...o), l = Math.max(...o);
  p === l && (p -= 1, l += 1);
  const k = o.length > 1 ? 100 / (o.length - 1) : 100, L = (h) => 27 - (h - p) / (l - p) * 24, I = o.map((h, f) => `${(f * k).toFixed(2)},${L(h).toFixed(2)}`);
  return /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 100 30",
      preserveAspectRatio: "none",
      style: { width: "100%", height: r, display: "block" },
      children: [
        /* @__PURE__ */ e.jsx(
          "polyline",
          {
            points: I.join(" "),
            fill: "none",
            stroke: t.actual,
            strokeWidth: 1.1,
            vectorEffect: "non-scaling-stroke"
          }
        ),
        /* @__PURE__ */ e.jsx("circle", { cx: 100, cy: L(o[o.length - 1]), r: 1.8, fill: t.actual })
      ]
    }
  );
}
function Pe({ title: o, ind: r, sel: n, onOpen: a }) {
  const p = r.series;
  let l = Math.min(...p), k = Math.max(...p);
  l === k && (l -= 1, k += 1);
  const L = 100, I = 100, h = p.length > 1 ? L / (p.length - 1) : L, f = (b) => I - (b - l) / (k - l) * I, N = p.map((b, g) => `${(g * h).toFixed(2)},${f(b).toFixed(2)}`), S = { color: t.dim, fontSize: 9, fontVariantNumeric: "tabular-nums" };
  return /* @__PURE__ */ e.jsxs(
    "div",
    {
      onClick: a,
      style: {
        background: t.panel,
        border: `1px solid ${n ? t.actual : t.edge}`,
        padding: "8px 10px 6px",
        cursor: "pointer",
        minWidth: 0
      },
      children: [
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 8, marginBottom: 2 }, children: [
          /* @__PURE__ */ e.jsx("span", { style: {
            color: t.actual,
            fontSize: 13,
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }, title: r.name, children: o }),
          /* @__PURE__ */ e.jsx("span", { style: {
            marginLeft: "auto",
            fontSize: 12.5,
            fontFamily: "ui-monospace, Consolas, monospace",
            fontVariantNumeric: "tabular-nums",
            color: t.text
          }, children: H(p[p.length - 1], r.unit) })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { style: { position: "relative", height: 96, margin: "4px 0 2px" }, children: [
          /* @__PURE__ */ e.jsxs(
            "svg",
            {
              viewBox: `0 0 ${L} ${I}`,
              preserveAspectRatio: "none",
              style: { position: "absolute", inset: 0, width: "100%", height: "100%" },
              children: [
                [0.25, 0.5, 0.75].map((b) => /* @__PURE__ */ e.jsx(
                  "line",
                  {
                    x1: 0,
                    x2: L,
                    y1: I * b,
                    y2: I * b,
                    stroke: t.edge,
                    strokeWidth: 1,
                    vectorEffect: "non-scaling-stroke"
                  },
                  b
                )),
                /* @__PURE__ */ e.jsx(
                  "polyline",
                  {
                    points: N.join(" "),
                    fill: "none",
                    stroke: t.actual,
                    strokeWidth: 1.4,
                    vectorEffect: "non-scaling-stroke"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ e.jsx("span", { style: { ...S, position: "absolute", top: -3, right: 0 }, children: H(k, r.unit) }),
          /* @__PURE__ */ e.jsx("span", { style: { ...S, position: "absolute", bottom: -3, right: 0 }, children: H(l, r.unit) })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between" }, children: [
          /* @__PURE__ */ e.jsx("span", { style: S, children: (r.dates[0] || "").slice(0, 4) }),
          /* @__PURE__ */ e.jsx("span", { style: S, children: (r.dates[r.dates.length - 1] || "").slice(0, 4) })
        ] }),
        /* @__PURE__ */ e.jsx("div", { style: { ...S, textAlign: "right", marginTop: 3 }, children: "Source: London Strategic Edge" })
      ]
    }
  );
}
const Ue = [
  ["GDP Growth", /^GDP Growth Rate (YoY|QoQ)$/i],
  ["Inflation", /^Inflation Rate YoY$/i],
  ["Unemployment", /^Unemployment Rate$/i],
  ["Interest Rate", /Interest Rate Decision/i],
  ["Manufacturing PMI", /Manufacturing PMI/i],
  ["Consumer Sentiment", /Consumer (Sentiment|Confidence)/i],
  ["Retail Sales", /^Retail Sales (YoY|MoM)$/i],
  ["Balance of Trade", /Balance of Trade|Trade Balance/i]
], Ie = [
  ["Growth & National Accounts", /GDP|Gross Domestic|Recession/i],
  ["Prices & Inflation", /CPI|PPI|Inflation|PCE|Price|Deflator/i],
  ["Labour Market", /Jobless|Employment|Payroll|Unemploy|Wage|Labor|Labour|Participation|JOLT|Challenger|Quits/i],
  ["Housing & Construction", /Housing|Home|Building|Mortgage|Construction|Case.?Shiller/i],
  ["Consumer & Retail", /Consumer|Michigan|Retail|Personal Income|Personal Spending|Credit|Vehicle|Redbook/i],
  ["Business & Surveys", /PMI|ISM|Business|Manufactur|Industrial|Factory|Durable|Capacity|Optimism|Sentiment|Confidence|Expectations|Leading|Barometer|Inventories|Orders/i],
  ["Trade & External", /Trade|Export|Import|Current Account|Capital Flows/i],
  ["Rates & Government", /Interest Rate|Fed|FOMC|Budget|Debt|Treasury|Auction|Government/i],
  ["Energy", /Oil|Gas|Crude|Gasoline|Distillate|Rig|Petroleum/i]
];
function Ye(o) {
  for (const [r, n] of Ie) if (n.test(o)) return r;
  return "Other";
}
const We = { high: t.down, medium: t.consensus, low: "#565a61" };
function Qe({ onBack: o, initialView: r }) {
  const [n, a] = u.useState(Ce), [p, l] = u.useState(!1), [k, L] = u.useState([]), [I, h] = u.useState("loading"), [f, N] = u.useState(""), [S, b] = u.useState(!1), [g, R] = u.useState(null), [D, i] = u.useState(null), [m, M] = u.useState(!1), P = u.useRef();
  u.useEffect(() => {
    const w = {
      indicators: "Indicators",
      yields: "Bond Yields",
      banks: "Central Banks"
    }[n.view];
    if (w) {
      document.title = `${w} · Economic · LSE Terminal`;
      return;
    }
    const y = g?.region || (n.view === "countries" ? n.country : ""), T = y ? G[y]?.name || y : "";
    document.title = g ? `${T} ${g.event} · LSE Terminal` : T ? `${T} · Economic · LSE Terminal` : "Economic Calendar · LSE Terminal";
  }, [g, n.view, n.country]), u.useEffect(() => {
    const c = window;
    return (c.__lseAiIslands ||= {}).econ = {
      view: n.view,
      calendar_events_loaded: k.length,
      search: f || null,
      selected_event: g ? `${g.region}: ${g.event}` : null,
      status: I
    }, () => {
      c.__lseAiIslands && delete c.__lseAiIslands.econ;
    };
  }, [n.view, k.length, f, g, I]), u.useEffect(() => {
    (async () => {
      try {
        const c = await fetch("/api/workspace/econcal"), w = c.ok ? await c.json() : null;
        w?.value && a({ ...Ce, ...w.value });
      } catch {
      }
      r && a((c) => ({ ...c, view: r })), l(!0);
    })();
  }, [r]);
  const j = u.useCallback((c) => {
    a((w) => {
      const y = { ...w, ...c };
      return clearTimeout(P.current), P.current = setTimeout(() => {
        fetch("/api/workspace/econcal", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(y)
        }).catch(() => {
        });
      }, 600), y;
    });
  }, []);
  u.useEffect(() => {
    if (!p || n.view !== "calendar") return;
    const { start: c, end: w } = Ne(n.range, { start: n.customStart, end: n.customEnd });
    let y = !1;
    return h("loading"), se({ region: n.regions.join(","), start: c, end: w, order: "asc", limit: "5000" }).then((T) => {
      y || (L(T), h("ok"));
    }).catch((T) => {
      y || h(T.message === "no-key" ? "no-key" : "error");
    }), () => {
      y = !0;
    };
  }, [p, n.view, n.regions, n.range, n.customStart, n.customEnd]), u.useEffect(() => {
    if (!g) {
      i(null);
      return;
    }
    let c = !1;
    return M(!0), se({ region: g.region, event: g.event, start: "2015-01-01", order: "asc", limit: "5000" }).then((w) => {
      if (c) return;
      const y = w.filter((_) => ce(_.event) === g.event.toLowerCase() && _.region_code === g.region), T = /* @__PURE__ */ new Map();
      for (const _ of y) {
        const s = _.datetime || `${_.date} ${_.time}`, x = T.get(s);
        (!x || x.actual == null && _.actual != null) && T.set(s, _);
      }
      i([...T.values()]);
    }).catch(() => {
      c || i([]);
    }).finally(() => {
      c || M(!1);
    }), () => {
      c = !0;
    };
  }, [g]);
  const [E, Q] = u.useState(null), [d, C] = u.useState([]), [O, J] = u.useState("loading");
  u.useEffect(() => {
    if (!p || n.view !== "countries" || E) return;
    const c = /* @__PURE__ */ new Date();
    se({ start: z(U(c, -60)), end: z(U(c, 14)), order: "asc", limit: "5000" }).then((w) => {
      const y = [...new Set(w.map((_) => _.region_code))].filter((_) => G[_]), T = (_) => {
        const s = me.indexOf(_);
        return s === -1 ? 100 : s;
      };
      y.sort((_, s) => T(_) - T(s) || G[_].name.localeCompare(G[s].name)), Q(y.length ? y : de);
    }).catch(() => Q(de));
  }, [p, n.view, E]), u.useEffect(() => {
    if (!p || n.view !== "countries") return;
    let c = !1;
    J("loading");
    const w = /* @__PURE__ */ new Date();
    return se({
      region: n.country,
      start: z(U(w, -365 * 3)),
      end: z(U(w, 60)),
      order: "desc",
      limit: "5000"
    }).then((y) => {
      c || (C(y.reverse()), J("ok"));
    }).catch((y) => {
      c || J(y.message === "no-key" ? "no-key" : "error");
    }), () => {
      c = !0;
    };
  }, [p, n.view, n.country]);
  const q = u.useMemo(() => {
    if (n.view !== "countries") return [];
    const c = /* @__PURE__ */ new Map();
    for (const s of d) {
      const x = ce(s.event);
      c.has(x) || c.set(x, []), c.get(x).push(s);
    }
    const w = f.trim().toLowerCase(), y = z(/* @__PURE__ */ new Date()), T = [];
    for (const [s, x] of c) {
      if (w && !s.includes(w)) continue;
      const $ = /* @__PURE__ */ new Map();
      for (const Y of x) {
        const we = Y.datetime || `${Y.date} ${Y.time}`, je = $.get(we);
        (!je || je.actual == null && Y.actual != null) && $.set(we, Y);
      }
      const A = [...$.values()], v = A.filter((Y) => V(Y.actual) != null);
      if (v.length < 4) continue;
      const F = v[v.length - 1], B = v.length > 1 ? v[v.length - 2] : null, Z = xe(F.event);
      T.push({
        name: Z,
        series: v.map((Y) => V(Y.actual)),
        dates: v.map((Y) => Y.date),
        latest: F,
        prevVal: B ? V(B.actual) : null,
        next: A.find((Y) => V(Y.actual) == null && Y.date >= y) || null,
        unit: Me(F.actual),
        count: v.length,
        impact: le({ event: Z, country: n.country })
      });
    }
    const _ = { high: 0, medium: 1, low: 2 };
    return T.sort((s, x) => (_[s.impact] ?? 3) - (_[x.impact] ?? 3) || x.count - s.count), T;
  }, [n.view, n.country, d, f]), ee = u.useMemo(() => {
    const c = f.trim().toLowerCase();
    return k.filter((w) => !(c && !w.event.toLowerCase().includes(c) || n.impact !== "all" && le({ event: w.event, country: w.region_code }) !== n.impact));
  }, [k, f, n.impact]), oe = u.useMemo(() => {
    const c = /* @__PURE__ */ new Map();
    for (const w of ee)
      c.has(w.date) || c.set(w.date, []), c.get(w.date).push(w);
    return [...c.entries()];
  }, [ee]), te = Object.keys(G).sort();
  return /* @__PURE__ */ e.jsxs("div", { style: { height: "100%", display: "flex", flexDirection: "column", background: t.bg, color: t.text, fontSize: 12, minHeight: 0 }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: t.panel, borderBottom: `1px solid ${t.edge}`, flexWrap: "wrap" }, children: [
      o && /* @__PURE__ */ e.jsx("button", { onClick: o, style: { background: "transparent", border: `1px solid ${t.edge}`, color: t.dim, borderRadius: 3, padding: "4px 8px", cursor: "pointer" }, children: "← My Data" }),
      /* @__PURE__ */ e.jsx("span", { style: { fontWeight: 700, letterSpacing: ".12em", fontSize: 11, color: t.dim }, children: "ECONOMIC" }),
      /* @__PURE__ */ e.jsx(
        ne,
        {
          value: n.view,
          onChange: (c) => j({ view: c }),
          options: [
            { key: "calendar", label: "Calendar" },
            { key: "countries", label: "Countries" },
            { key: "indicators", label: "Indicators" },
            { key: "yields", label: "Bond Yields" },
            { key: "banks", label: "Central Banks" }
          ]
        }
      ),
      n.view === "calendar" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(
          ne,
          {
            value: n.range,
            onChange: (c) => j({ range: c }),
            options: [
              { key: "today", label: "Today" },
              { key: "week", label: "This Week" },
              { key: "nextweek", label: "Next Week" },
              { key: "month", label: "Next Month" },
              { key: "past-month", label: "Past Month" },
              { key: "custom", label: "Custom" }
            ]
          }
        ),
        n.range === "custom" && /* @__PURE__ */ e.jsxs("span", { style: { display: "inline-flex", gap: 4, alignItems: "center" }, children: [
          /* @__PURE__ */ e.jsx(
            "input",
            {
              type: "date",
              value: n.customStart,
              onChange: (c) => j({ customStart: c.target.value }),
              style: { background: t.bg, color: t.text, border: `1px solid ${t.edge}`, borderRadius: 3, padding: "3px 6px", colorScheme: "dark" }
            }
          ),
          /* @__PURE__ */ e.jsx("span", { style: { color: t.dim }, children: "→" }),
          /* @__PURE__ */ e.jsx(
            "input",
            {
              type: "date",
              value: n.customEnd,
              onChange: (c) => j({ customEnd: c.target.value }),
              style: { background: t.bg, color: t.text, border: `1px solid ${t.edge}`, borderRadius: 3, padding: "3px 6px", colorScheme: "dark" }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsxs("div", { style: { position: "relative" }, children: [
          /* @__PURE__ */ e.jsxs(
            "button",
            {
              onClick: () => b((c) => !c),
              style: { background: t.bg, border: `1px solid ${t.edge}`, color: t.text, borderRadius: 3, padding: "4px 8px", cursor: "pointer" },
              children: [
                n.regions.length === te.length ? "All regions" : n.regions.length <= 3 ? n.regions.join(", ") : `${n.regions.length} regions`,
                " ▾"
              ]
            }
          ),
          S && /* @__PURE__ */ e.jsxs("div", { style: { position: "absolute", top: "110%", left: 0, zIndex: 30, background: t.panel, border: `1px solid ${t.edge}`, borderRadius: 4, padding: 8, width: 230, maxHeight: 320, overflowY: "auto", boxShadow: "0 8px 24px rgba(0,0,0,.5)" }, children: [
            /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", gap: 6, marginBottom: 6 }, children: [
              /* @__PURE__ */ e.jsx("button", { onClick: () => j({ regions: me }), style: { flex: 1, background: t.edge, border: "none", color: t.text, borderRadius: 3, padding: "3px 0", cursor: "pointer", fontSize: 11 }, children: "Majors" }),
              /* @__PURE__ */ e.jsx("button", { onClick: () => j({ regions: te }), style: { flex: 1, background: t.edge, border: "none", color: t.text, borderRadius: 3, padding: "3px 0", cursor: "pointer", fontSize: 11 }, children: "All" }),
              /* @__PURE__ */ e.jsx("button", { onClick: () => j({ regions: [] }), style: { flex: 1, background: t.edge, border: "none", color: t.dim, borderRadius: 3, padding: "3px 0", cursor: "pointer", fontSize: 11 }, children: "None" })
            ] }),
            te.map((c) => /* @__PURE__ */ e.jsxs("label", { style: { display: "flex", alignItems: "center", gap: 6, padding: "2px 2px", cursor: "pointer", color: n.regions.includes(c) ? t.text : t.dim }, children: [
              /* @__PURE__ */ e.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: n.regions.includes(c),
                  onChange: (w) => j({ regions: w.target.checked ? [...n.regions, c] : n.regions.filter((y) => y !== c) }),
                  style: { accentColor: t.actual }
                }
              ),
              /* @__PURE__ */ e.jsx(K, { code: c }),
              /* @__PURE__ */ e.jsx("span", { style: { width: 24 }, children: c }),
              /* @__PURE__ */ e.jsx("span", { style: { fontSize: 11 }, children: G[c].name })
            ] }, c))
          ] })
        ] }),
        /* @__PURE__ */ e.jsx(
          ne,
          {
            value: n.impact,
            onChange: (c) => j({ impact: c }),
            options: [
              { key: "all", label: "All" },
              { key: "high", label: "High" },
              { key: "medium", label: "Med" },
              { key: "low", label: "Low" }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(
        "input",
        {
          value: f,
          onChange: (c) => N(c.target.value),
          placeholder: n.view === "calendar" ? "Filter events…" : n.view === "yields" ? "Filter countries…" : n.view === "banks" ? "Filter banks…" : "Filter indicators…",
          style: { background: t.bg, color: t.text, border: `1px solid ${t.edge}`, borderRadius: 3, padding: "4px 8px", width: 160, marginLeft: "auto" }
        }
      )
    ] }),
    n.view === "countries" && /* @__PURE__ */ e.jsx("div", { style: {
      display: "flex",
      gap: 2,
      padding: "5px 10px",
      background: t.panel,
      borderBottom: `1px solid ${t.edge}`,
      overflowX: "auto",
      flex: "none"
    }, children: (E || de).map((c) => /* @__PURE__ */ e.jsxs(
      "button",
      {
        onClick: () => j({ country: c }),
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "3px 9px",
          border: `1px solid ${n.country === c ? t.edge : "transparent"}`,
          borderRadius: 2,
          cursor: "pointer",
          whiteSpace: "nowrap",
          flex: "none",
          background: n.country === c ? t.active : "transparent",
          color: n.country === c ? t.text : t.dim,
          fontSize: 11
        },
        children: [
          /* @__PURE__ */ e.jsx(K, { code: c }),
          " ",
          G[c]?.name || c
        ]
      },
      c
    )) }),
    /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, display: "flex", minHeight: 0 }, onClick: () => S && b(!1), children: [
      n.view === "indicators" && /* @__PURE__ */ e.jsx(He, { prefs: n, update: j, search: f }),
      n.view === "yields" && /* @__PURE__ */ e.jsx(Ve, { prefs: n, update: j, search: f }),
      n.view === "banks" && /* @__PURE__ */ e.jsx(Je, { prefs: n, update: j, search: f }),
      n.view === "countries" && /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, overflowY: "auto", minWidth: 0 }, children: [
        O === "no-key" && /* @__PURE__ */ e.jsxs("div", { style: { padding: 40, color: t.dim, textAlign: "center", lineHeight: 1.8 }, children: [
          /* @__PURE__ */ e.jsx("div", { style: { fontSize: 14, color: t.text }, children: "Connect your LSE API key to load the country monitor." }),
          "Get a free key at londonstrategicedge.com/data, then connect it from the key manager in the top-left corner."
        ] }),
        O === "error" && /* @__PURE__ */ e.jsx("div", { style: { padding: 40, color: t.down }, children: "Feed unavailable. Retry shortly." }),
        O === "loading" && /* @__PURE__ */ e.jsxs("div", { style: { padding: 40, color: t.dim }, children: [
          "Loading ",
          G[n.country]?.name || n.country,
          "…"
        ] }),
        O === "ok" && (() => {
          const c = (A) => g?.region === n.country && g?.event.toLowerCase() === A.name.toLowerCase(), w = (A) => R({ region: n.country, event: A.name }), y = /* @__PURE__ */ new Set(), T = [];
          for (const [A, v] of Ue) {
            if (T.length >= 5) break;
            const F = q.find((B) => v.test(B.name) && !y.has(B.name));
            F && (y.add(F.name), T.push({ title: A, ind: F }));
          }
          const _ = /* @__PURE__ */ new Map();
          for (const A of q) {
            const v = Ye(A.name);
            _.has(v) || _.set(v, []), _.get(v).push(A);
          }
          const s = [...Ie.map(([A]) => A), "Other"].filter((A) => _.has(A)), x = "minmax(220px, 1fr) 110px 90px 90px 80px 130px 60px", $ = {
            fontVariantNumeric: "tabular-nums",
            textAlign: "right",
            fontFamily: "ui-monospace, Consolas, monospace",
            fontSize: 11.5
          };
          return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 8, padding: "8px 12px 2px" }, children: [
              /* @__PURE__ */ e.jsx(K, { code: n.country, size: 14 }),
              /* @__PURE__ */ e.jsx("b", { style: { fontSize: 13 }, children: G[n.country]?.name || n.country }),
              /* @__PURE__ */ e.jsxs("span", { style: { color: t.dim, fontSize: 11 }, children: [
                "Key economic indicators · ",
                q.length,
                " series from the release history · click a row for the full history"
              ] })
            ] }),
            T.length > 0 && /* @__PURE__ */ e.jsx("div", { style: {
              display: "grid",
              gap: 8,
              padding: "8px 12px",
              gridTemplateColumns: `repeat(${T.length}, minmax(0, 1fr))`
            }, children: T.map(({ title: A, ind: v }) => /* @__PURE__ */ e.jsx(
              Pe,
              {
                title: A,
                ind: v,
                sel: c(v),
                onOpen: () => w(v)
              },
              v.name
            )) }),
            /* @__PURE__ */ e.jsxs("div", { style: {
              display: "grid",
              gridTemplateColumns: x,
              gap: 8,
              alignItems: "center",
              padding: "5px 12px",
              position: "sticky",
              top: 0,
              zIndex: 10,
              background: t.bg,
              borderBottom: `1px solid ${t.edge}`,
              color: t.dim,
              fontSize: 9.5,
              letterSpacing: ".06em",
              textTransform: "uppercase"
            }, children: [
              /* @__PURE__ */ e.jsx("span", { children: "Indicator" }),
              /* @__PURE__ */ e.jsx("span", { children: "Trend" }),
              /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "Latest" }),
              /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "Chg" }),
              /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "Period" }),
              /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "Next release" }),
              /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "Rel." })
            ] }),
            s.map((A) => /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx("div", { style: {
                padding: "8px 12px 4px",
                background: t.panel,
                borderBottom: `1px solid ${t.edge}`,
                color: t.text,
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: ".07em",
                textTransform: "uppercase"
              }, children: A }),
              _.get(A).map((v) => {
                const F = c(v), B = V(v.latest.actual) != null && v.prevVal != null ? V(v.latest.actual) - v.prevVal : null;
                return /* @__PURE__ */ e.jsxs(
                  "div",
                  {
                    onClick: () => w(v),
                    style: {
                      display: "grid",
                      gridTemplateColumns: x,
                      gap: 8,
                      alignItems: "center",
                      padding: "3px 12px",
                      cursor: "pointer",
                      borderBottom: `1px solid ${t.edge}`,
                      background: F ? t.active : "transparent",
                      borderLeft: F ? `2px solid ${t.actual}` : "2px solid transparent"
                    },
                    onMouseEnter: (Z) => {
                      F || (Z.currentTarget.style.background = t.edge);
                    },
                    onMouseLeave: (Z) => {
                      F || (Z.currentTarget.style.background = "transparent");
                    },
                    children: [
                      /* @__PURE__ */ e.jsx("span", { style: {
                        fontSize: 11.5,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }, title: v.name, children: v.name }),
                      /* @__PURE__ */ e.jsx(_e, { values: v.series }),
                      /* @__PURE__ */ e.jsx("span", { style: { ...$, color: t.text, fontSize: 12 }, children: H(V(v.latest.actual), v.unit) }),
                      /* @__PURE__ */ e.jsx("span", { style: { ...$, color: B == null || B === 0 ? t.dim : B > 0 ? t.up : t.down }, children: B == null ? "" : `${B >= 0 ? "+" : ""}${H(B, v.unit)}` }),
                      /* @__PURE__ */ e.jsx("span", { style: { ...$, color: t.dim, fontFamily: "inherit" }, children: v.latest.period_hint || v.latest.date }),
                      /* @__PURE__ */ e.jsx("span", { style: { ...$, color: t.dim, fontFamily: "inherit" }, children: v.next ? `${v.next.date}${v.next.consensus ? ` (${v.next.consensus})` : ""}` : "" }),
                      /* @__PURE__ */ e.jsx("span", { style: { ...$, color: t.dim }, children: v.count })
                    ]
                  },
                  v.name
                );
              })
            ] }, A)),
            q.length === 0 && /* @__PURE__ */ e.jsx("div", { style: { padding: 30, color: t.dim }, children: "No chartable indicators match the filter." })
          ] });
        })()
      ] }),
      n.view === "calendar" && /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, overflowY: "auto", minWidth: 0 }, children: [
        I === "no-key" && /* @__PURE__ */ e.jsxs("div", { style: { padding: 40, color: t.dim, textAlign: "center", lineHeight: 1.8 }, children: [
          /* @__PURE__ */ e.jsx("div", { style: { fontSize: 14, color: t.text }, children: "Connect your LSE API key to load the economic calendar." }),
          "Get a free key at londonstrategicedge.com/data, then connect it from the key manager in the top-left corner."
        ] }),
        I === "error" && /* @__PURE__ */ e.jsx("div", { style: { padding: 40, color: t.down }, children: "Calendar feed unavailable. Retry shortly." }),
        I === "loading" && /* @__PURE__ */ e.jsx("div", { style: { padding: 40, color: t.dim }, children: "Loading events…" }),
        I === "ok" && oe.length === 0 && /* @__PURE__ */ e.jsx("div", { style: { padding: 40, color: t.dim }, children: "No events match the current filters." }),
        I === "ok" && oe.map(([c, w]) => /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx("div", { style: { padding: "5px 12px", background: t.panel, borderTop: `1px solid ${t.edge}`, borderBottom: `1px solid ${t.edge}`, color: t.dim, fontSize: 11, letterSpacing: ".05em", position: "sticky", top: 0, zIndex: 10 }, children: (/* @__PURE__ */ new Date(c + "T00:00:00Z")).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) }),
          w.map((y) => {
            const T = le({ event: y.event, country: y.region_code }), _ = g?.region === y.region_code && g?.event.toLowerCase() === ce(y.event);
            return /* @__PURE__ */ e.jsxs(
              "div",
              {
                onClick: () => R({ region: y.region_code, event: xe(y.event) }),
                style: {
                  display: "grid",
                  gridTemplateColumns: "64px 60px 1fr 90px 90px 90px",
                  gap: 8,
                  alignItems: "center",
                  padding: "4px 12px",
                  cursor: "pointer",
                  background: _ ? t.active : "transparent",
                  borderLeft: _ ? `2px solid ${t.actual}` : "2px solid transparent"
                },
                onMouseEnter: (s) => {
                  _ || (s.currentTarget.style.background = t.edge);
                },
                onMouseLeave: (s) => {
                  _ || (s.currentTarget.style.background = "transparent");
                },
                children: [
                  /* @__PURE__ */ e.jsx("span", { style: { color: t.dim, fontVariantNumeric: "tabular-nums" }, children: y.time || "—" }),
                  /* @__PURE__ */ e.jsxs("span", { title: G[y.region_code]?.name || y.region_code, children: [
                    /* @__PURE__ */ e.jsx(K, { code: y.region_code }),
                    " ",
                    /* @__PURE__ */ e.jsx("span", { style: { color: t.dim }, children: y.region_code })
                  ] }),
                  /* @__PURE__ */ e.jsxs("span", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: [
                    /* @__PURE__ */ e.jsx("span", { title: `${T} impact`, style: { display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: We[T], marginRight: 7, verticalAlign: "middle" } }),
                    y.event,
                    y.period_hint && /* @__PURE__ */ e.jsx("span", { style: { color: t.dim, marginLeft: 6, fontSize: 10 }, children: y.period_hint })
                  ] }),
                  /* @__PURE__ */ e.jsx(ge, { label: "A", v: y.actual, revised: !!y.actual_revised, strong: !0 }),
                  /* @__PURE__ */ e.jsx(ge, { label: "C", v: y.consensus, revised: !!y.consensus_revised }),
                  /* @__PURE__ */ e.jsx(ge, { label: "P", v: y.previous, revised: !!y.previous_revised })
                ]
              },
              y.id
            );
          })
        ] }, c))
      ] }),
      g && (n.view === "calendar" || n.view === "countries") && /* @__PURE__ */ e.jsx(
        Ge,
        {
          selected: g,
          history: D,
          loading: m,
          prefs: n,
          update: j,
          onClose: () => R(null)
        }
      )
    ] })
  ] });
}
function ge({ label: o, v: r, revised: n, strong: a }) {
  return /* @__PURE__ */ e.jsxs("span", { style: { textAlign: "right", fontVariantNumeric: "tabular-nums", color: r ? a ? t.text : t.dim : "#3a3d42" }, children: [
    /* @__PURE__ */ e.jsx("span", { style: { fontSize: 9, color: "#565a61", marginRight: 4 }, children: o }),
    r || "—",
    n && /* @__PURE__ */ e.jsx("sup", { title: "revised", style: { color: t.consensus, fontSize: 9 }, children: " R" })
  ] });
}
function Ge({ selected: o, history: r, loading: n, prefs: a, update: p, onClose: l }) {
  const k = z(/* @__PURE__ */ new Date()), L = u.useRef(null), I = u.useRef(null);
  u.useEffect(() => {
    if (!L.current) return;
    const i = he(L.current);
    I.current = i;
    const m = new ResizeObserver(() => i.resize());
    return m.observe(L.current), () => {
      m.disconnect(), i.dispose(), I.current = null;
    };
  }, []);
  const { rows: h, unit: f, nextRelease: N } = u.useMemo(() => {
    const i = (r || []).map((E) => ({
      ...E,
      a: V(E.actual),
      c: V(E.consensus ?? E.forecast),
      p: V(E.previous)
    })), m = i.filter((E) => E.a != null || E.c != null || E.p != null), M = m.find((E) => E.actual || E.consensus || E.previous), P = Me(M?.actual ?? M?.consensus ?? M?.previous), j = i.find((E) => E.date > k && E.a == null);
    return { rows: m, unit: P, nextRelease: j };
  }, [r, k]), S = u.useMemo(() => {
    if (a.chartRange === "all") return h;
    const i = { "1y": 1, "3y": 3, "5y": 5 }[a.chartRange], m = z(U(/* @__PURE__ */ new Date(), -365 * i));
    return h.filter((M) => M.date >= m);
  }, [h, a.chartRange]), b = [...h].reverse().find((i) => i.a != null), g = b && b.a != null && b.c != null ? b.a - b.c : null, R = u.useMemo(() => {
    const i = S.map((j) => j.date), m = (j) => H(j, f), M = [], P = S.map((j) => j.a);
    return a.chartType === "bar" ? M.push({
      name: "Actual",
      type: "bar",
      data: P.map((j, E) => ({
        value: j,
        itemStyle: a.surpriseColors && j != null && S[E].c != null ? { color: j >= S[E].c ? t.up : t.down, borderRadius: [2, 2, 0, 0] } : { color: t.actual, borderRadius: [2, 2, 0, 0] }
      })),
      barMaxWidth: 14,
      barCategoryGap: "30%"
    }) : M.push({
      name: "Actual",
      type: "line",
      data: P,
      smooth: !1,
      lineStyle: { color: t.actual, width: 2 },
      itemStyle: { color: t.actual },
      symbol: "circle",
      symbolSize: 5,
      showSymbol: S.length <= 40,
      connectNulls: !0,
      areaStyle: a.chartType === "area" ? { color: t.actual + "26" } : void 0
    }), a.showConsensus && M.push({
      name: "Consensus",
      type: "line",
      data: S.map((j) => j.c),
      connectNulls: !0,
      lineStyle: { color: t.consensus, width: 2, type: "dashed" },
      itemStyle: { color: t.consensus },
      symbol: "circle",
      symbolSize: 4,
      showSymbol: !1
    }), a.showPrevious && M.push({
      name: "Previous",
      type: "line",
      data: S.map((j) => j.p),
      connectNulls: !0,
      lineStyle: { color: t.previous, width: 2, type: "dotted" },
      itemStyle: { color: t.previous },
      symbol: "circle",
      symbolSize: 4,
      showSymbol: !1
    }), {
      backgroundColor: "transparent",
      animation: !1,
      legend: {
        show: M.length > 1,
        top: 0,
        right: 8,
        icon: "roundRect",
        itemWidth: 10,
        itemHeight: 4,
        textStyle: { color: t.dim, fontSize: 10 }
      },
      grid: { left: 8, right: 16, top: 26, bottom: 8, containLabel: !0 },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "cross", label: { backgroundColor: t.edge, color: t.text } },
        backgroundColor: "rgba(21,22,25,.96)",
        borderColor: t.edge,
        textStyle: { color: t.text, fontSize: 11 },
        valueFormatter: (j) => j == null ? "—" : m(j)
      },
      xAxis: {
        type: "category",
        data: i,
        axisLine: { lineStyle: { color: t.edge } },
        axisTick: { show: !1 },
        axisLabel: { color: t.dim, fontSize: 10 }
      },
      yAxis: {
        type: "value",
        scale: !0,
        axisLabel: { color: t.dim, fontSize: 10, formatter: (j) => H(j, f) },
        splitLine: { lineStyle: { color: "rgba(255,255,255,0.05)", type: "dashed" } }
      },
      // Inside zoom only (wheel / drag). The slider mini-map bar that used to
      // sit under the chart was cut as visual clutter; don't reintroduce it.
      dataZoom: [{ type: "inside" }],
      series: M
    };
  }, [S, f, a.chartType, a.showConsensus, a.showPrevious, a.surpriseColors]);
  u.useEffect(() => {
    I.current?.setOption(R, { notMerge: !0 });
  }, [R]);
  const D = h.some((i) => i.a != null || i.c != null);
  return /* @__PURE__ */ e.jsxs("div", { style: { width: "46%", minWidth: 420, borderLeft: `1px solid ${t.edge}`, display: "flex", flexDirection: "column", minHeight: 0, background: t.bg }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderBottom: `1px solid ${t.edge}` }, children: [
      /* @__PURE__ */ e.jsx(K, { code: o.region, size: 15 }),
      /* @__PURE__ */ e.jsxs("div", { style: { minWidth: 0 }, children: [
        /* @__PURE__ */ e.jsx("div", { style: { fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: o.event }),
        /* @__PURE__ */ e.jsxs("div", { style: { color: t.dim, fontSize: 10 }, children: [
          G[o.region]?.name || o.region,
          " · ",
          h.length,
          " releases since ",
          h[0]?.date?.slice(0, 4) || "—"
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("button", { onClick: l, style: { marginLeft: "auto", background: "transparent", border: "none", color: t.dim, cursor: "pointer", fontSize: 15 }, children: "✕" })
    ] }),
    /* @__PURE__ */ e.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: t.edge, borderBottom: `1px solid ${t.edge}` }, children: [
      ["Latest actual", b ? H(b.a, f) : "—", b?.period_hint || b?.date || ""],
      ["Consensus", b ? H(b.c, f) : "—", ""],
      [
        "Surprise",
        g == null ? "—" : `${g >= 0 ? "+" : ""}${H(g, f)}`,
        g == null ? "" : g >= 0 ? "beat" : "miss"
      ],
      ["Next release", N?.date || "—", N?.c != null ? `exp ${H(N.c, f)}` : ""]
    ].map(([i, m, M]) => /* @__PURE__ */ e.jsxs("div", { style: { background: t.panel, padding: "7px 10px" }, children: [
      /* @__PURE__ */ e.jsx("div", { style: { color: t.dim, fontSize: 9, letterSpacing: ".06em", textTransform: "uppercase" }, children: i }),
      /* @__PURE__ */ e.jsx("div", { style: { fontSize: 14, fontVariantNumeric: "tabular-nums", color: i === "Surprise" && g != null ? g >= 0 ? t.up : t.down : t.text }, children: m }),
      /* @__PURE__ */ e.jsx("div", { style: { color: t.dim, fontSize: 9 }, children: M })
    ] }, i)) }),
    /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "6px 12px", borderBottom: `1px solid ${t.edge}`, flexWrap: "wrap" }, children: [
      /* @__PURE__ */ e.jsx(
        ne,
        {
          value: a.chartType,
          onChange: (i) => p({ chartType: i }),
          options: [{ key: "bar", label: "Bars" }, { key: "line", label: "Line" }, { key: "area", label: "Area" }]
        }
      ),
      /* @__PURE__ */ e.jsx(
        ne,
        {
          value: a.chartRange,
          onChange: (i) => p({ chartRange: i }),
          options: [{ key: "1y", label: "1Y" }, { key: "3y", label: "3Y" }, { key: "5y", label: "5Y" }, { key: "all", label: "All" }]
        }
      ),
      /* @__PURE__ */ e.jsx(pe, { label: "Consensus", color: t.consensus, checked: a.showConsensus, onChange: (i) => p({ showConsensus: i }) }),
      /* @__PURE__ */ e.jsx(pe, { label: "Previous", color: t.previous, checked: a.showPrevious, onChange: (i) => p({ showPrevious: i }) }),
      a.chartType === "bar" && /* @__PURE__ */ e.jsx(pe, { label: "Beat / miss", checked: a.surpriseColors, onChange: (i) => p({ surpriseColors: i }) })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minHeight: 0, padding: "4px 4px 0 4px", position: "relative" }, children: [
      /* @__PURE__ */ e.jsx("div", { ref: L, style: { width: "100%", height: "100%" } }),
      (n || !D || S.length === 0) && /* @__PURE__ */ e.jsx("div", { style: { position: "absolute", inset: 0, padding: 30, color: t.dim, lineHeight: 1.7, background: t.bg }, children: n ? "Loading history…" : !D && r ? "This event has no numeric prints (speeches and auctions list results without a chartable series). Pick a data release to see its history." : "No releases inside this range. Widen it to All." })
    ] })
  ] });
}
function ye() {
  const [o, r] = u.useState(null), [n, a] = u.useState("loading");
  return u.useEffect(() => {
    let p = !1;
    return Be().then((l) => {
      p || (r(l), a("ok"));
    }).catch((l) => {
      p || a(l.message === "no-key" ? "no-key" : "error");
    }), () => {
      p = !0;
    };
  }, []), { rows: o, state: n };
}
function fe({ state: o, what: r }) {
  return o === "no-key" ? /* @__PURE__ */ e.jsxs("div", { style: { padding: 40, color: t.dim, textAlign: "center", lineHeight: 1.8 }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { fontSize: 14, color: t.text }, children: [
      "Connect your LSE API key to load ",
      r,
      "."
    ] }),
    "Get a free key at londonstrategicedge.com/data, then connect it from the key manager in the top-left corner."
  ] }) : o === "error" ? /* @__PURE__ */ e.jsx("div", { style: { padding: 40, color: t.down }, children: "Macro feed unavailable. Retry shortly." }) : /* @__PURE__ */ e.jsxs("div", { style: { padding: 40, color: t.dim }, children: [
    "Loading ",
    r,
    "…"
  ] });
}
function Ee({ countries: o, value: r, onChange: n }) {
  const [a, p] = u.useState(!1), [l, k] = u.useState(""), L = o.find((h) => h.code === r), I = u.useMemo(() => {
    const h = l.trim().toLowerCase();
    return h ? o.filter((f) => f.name.toLowerCase().includes(h) || f.code.toLowerCase().includes(h)) : o;
  }, [o, l]);
  return /* @__PURE__ */ e.jsxs("div", { style: { position: "relative" }, children: [
    /* @__PURE__ */ e.jsxs(
      "button",
      {
        onClick: () => p((h) => !h),
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: t.bg,
          border: `1px solid ${t.edge}`,
          color: t.text,
          borderRadius: 3,
          padding: "4px 8px",
          cursor: "pointer",
          minWidth: 150
        },
        children: [
          /* @__PURE__ */ e.jsx(K, { code: r }),
          " ",
          L?.name || r,
          " ▾"
        ]
      }
    ),
    a && /* @__PURE__ */ e.jsxs("div", { style: {
      position: "absolute",
      top: "110%",
      left: 0,
      zIndex: 40,
      background: t.panel,
      border: `1px solid ${t.edge}`,
      borderRadius: 4,
      padding: 6,
      width: 260,
      maxHeight: 360,
      overflowY: "auto",
      boxShadow: "0 8px 24px rgba(0,0,0,.5)"
    }, children: [
      /* @__PURE__ */ e.jsx(
        "input",
        {
          autoFocus: !0,
          value: l,
          onChange: (h) => k(h.target.value),
          placeholder: "Search country…",
          style: {
            width: "100%",
            background: t.bg,
            color: t.text,
            border: `1px solid ${t.edge}`,
            borderRadius: 3,
            padding: "4px 6px",
            marginBottom: 6
          }
        }
      ),
      I.map((h) => /* @__PURE__ */ e.jsxs(
        "div",
        {
          onClick: () => {
            n(h.code), p(!1), k("");
          },
          style: {
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "3px 4px",
            cursor: "pointer",
            color: h.code === r ? t.text : t.dim,
            background: h.code === r ? t.active : "transparent"
          },
          children: [
            /* @__PURE__ */ e.jsx(K, { code: h.code }),
            /* @__PURE__ */ e.jsx("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: h.name }),
            /* @__PURE__ */ e.jsx("span", { style: { fontSize: 10, color: t.dim, fontVariantNumeric: "tabular-nums" }, children: h.count })
          ]
        },
        h.code
      )),
      I.length === 0 && /* @__PURE__ */ e.jsx("div", { style: { padding: 8, color: t.dim }, children: "No match." })
    ] })
  ] });
}
function be({
  title: o,
  subtitle: r,
  unit: n,
  points: a,
  loading: p,
  error: l,
  range: k,
  onRange: L,
  onClose: I,
  extra: h
}) {
  const f = u.useRef(null), N = u.useRef(null);
  u.useEffect(() => {
    if (!f.current) return;
    const g = he(f.current);
    N.current = g;
    const R = new ResizeObserver(() => g.resize());
    return R.observe(f.current), () => {
      R.disconnect(), g.dispose(), N.current = null;
    };
  }, []);
  const S = u.useMemo(() => {
    const g = a || [];
    if (k === "all") return g;
    const R = { "1y": 1, "5y": 5, "10y": 10 }[k], D = z(U(/* @__PURE__ */ new Date(), -365 * R));
    return g.filter((i) => i.date >= D);
  }, [a, k]), b = u.useMemo(() => {
    if (!S.length) return null;
    const g = S.map((i) => i.value), R = S[S.length - 1], D = S[0];
    return {
      last: R,
      first: D,
      min: Math.min(...g),
      max: Math.max(...g),
      chg: R.value - D.value
    };
  }, [S]);
  return u.useEffect(() => {
    const g = {
      backgroundColor: "transparent",
      animation: !1,
      grid: { left: 8, right: 16, top: 18, bottom: 8, containLabel: !0 },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "cross", label: { backgroundColor: t.edge, color: t.text } },
        backgroundColor: "rgba(21,22,25,.96)",
        borderColor: t.edge,
        textStyle: { color: t.text, fontSize: 11 },
        valueFormatter: (R) => R == null ? "—" : W(R, n)
      },
      xAxis: {
        type: "category",
        data: S.map((R) => R.date),
        axisLine: { lineStyle: { color: t.edge } },
        axisTick: { show: !1 },
        axisLabel: { color: t.dim, fontSize: 10 }
      },
      yAxis: {
        type: "value",
        scale: !0,
        axisLabel: { color: t.dim, fontSize: 10, formatter: (R) => W(R, n) },
        splitLine: { lineStyle: { color: "rgba(255,255,255,0.05)", type: "dashed" } }
      },
      dataZoom: [{ type: "inside" }],
      series: [{
        name: o,
        type: "line",
        data: S.map((R) => R.value),
        smooth: !1,
        // Policy rates and reserve ratios hold flat between decisions; a
        // stepped line is what that actually is, and it stops a step change
        // reading as a gradual slope.
        step: $e(n) && S.length < 400 ? "end" : void 0,
        lineStyle: { color: t.actual, width: 1.8 },
        itemStyle: { color: t.actual },
        symbol: "circle",
        symbolSize: 4,
        showSymbol: S.length <= 60,
        areaStyle: { color: t.actual + "1f" }
      }]
    };
    N.current?.setOption(g, { notMerge: !0 });
  }, [S, n, o]), /* @__PURE__ */ e.jsxs("div", { style: {
    width: "44%",
    minWidth: 400,
    borderLeft: `1px solid ${t.edge}`,
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    background: t.bg
  }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderBottom: `1px solid ${t.edge}` }, children: [
      /* @__PURE__ */ e.jsxs("div", { style: { minWidth: 0 }, children: [
        /* @__PURE__ */ e.jsx("div", { style: { fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: o }),
        /* @__PURE__ */ e.jsx("div", { style: { color: t.dim, fontSize: 10 }, children: r })
      ] }),
      /* @__PURE__ */ e.jsx("button", { onClick: I, style: { marginLeft: "auto", background: "transparent", border: "none", color: t.dim, cursor: "pointer", fontSize: 15 }, children: "✕" })
    ] }),
    /* @__PURE__ */ e.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: t.edge, borderBottom: `1px solid ${t.edge}` }, children: [
      ["Latest", b ? W(b.last.value, n) : "—", b?.last.date || ""],
      // pp, not %: a policy rate going 0.50 -> 3.75 moved 3.25 percentage
      // POINTS (it rose 650% in percentage terms), and "+3.25%" for that
      // is the classic misread.
      [
        "Change",
        b ? $e(n) ? `${b.chg >= 0 ? "+" : ""}${b.chg.toFixed(2)}pp` : `${b.chg >= 0 ? "+" : ""}${W(b.chg, n)}` : "—",
        b ? `since ${b.first.date}` : ""
      ],
      ["Range low", b ? W(b.min, n) : "—", ""],
      ["Range high", b ? W(b.max, n) : "—", ""]
    ].map(([g, R, D]) => /* @__PURE__ */ e.jsxs("div", { style: { background: t.panel, padding: "7px 10px" }, children: [
      /* @__PURE__ */ e.jsx("div", { style: { color: t.dim, fontSize: 9, letterSpacing: ".06em", textTransform: "uppercase" }, children: g }),
      /* @__PURE__ */ e.jsx("div", { style: {
        fontSize: 14,
        fontVariantNumeric: "tabular-nums",
        color: g === "Change" && b ? b.chg >= 0 ? t.up : t.down : t.text
      }, children: R }),
      /* @__PURE__ */ e.jsx("div", { style: { color: t.dim, fontSize: 9 }, children: D })
    ] }, g)) }),
    /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "6px 12px", borderBottom: `1px solid ${t.edge}` }, children: [
      /* @__PURE__ */ e.jsx(
        ne,
        {
          value: k,
          onChange: (g) => L(g),
          options: [
            { key: "1y", label: "1Y" },
            { key: "5y", label: "5Y" },
            { key: "10y", label: "10Y" },
            { key: "all", label: "All" }
          ]
        }
      ),
      n && /* @__PURE__ */ e.jsx("span", { style: { color: t.dim, fontSize: 10 }, children: n })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minHeight: 0, padding: "4px 4px 0 4px", position: "relative" }, children: [
      /* @__PURE__ */ e.jsx("div", { ref: f, style: { width: "100%", height: "100%" } }),
      (p || l || S.length === 0) && /* @__PURE__ */ e.jsx("div", { style: { position: "absolute", inset: 0, padding: 30, color: l ? t.down : t.dim, lineHeight: 1.7, background: t.bg }, children: p ? "Loading history…" : l ? "This series could not be loaded." : "No observations inside this range. Widen it to All." })
    ] }),
    h
  ] });
}
function ve(o) {
  const [r, n] = u.useState(null), [a, p] = u.useState(!1), [l, k] = u.useState(!1);
  return u.useEffect(() => {
    if (!o) {
      n(null);
      return;
    }
    let L = !1;
    return p(!0), k(!1), Le(o.symbol, o.dataset).then((I) => {
      L || n(I);
    }).catch(() => {
      L || (n([]), k(!0));
    }).finally(() => {
      L || p(!1);
    }), () => {
      L = !0;
    };
  }, [o?.symbol, o?.dataset]), { points: r, loading: a, error: l };
}
function He({ prefs: o, update: r, search: n }) {
  const { rows: a, state: p } = ye(), [l, k] = u.useState(null), { points: L, loading: I, error: h } = ve(l ? { symbol: l.symbol, dataset: l.dataset } : null);
  u.useEffect(() => {
    const i = window;
    return (i.__lseAiIslands ||= {}).econ_detail = {
      view: "indicators",
      country: o.indCountry,
      category_filter: o.indCategory || null,
      series_in_catalog: (a || []).length,
      open_series: l ? `${l.country_name} ${l.name}` : null
    }, () => {
      i.__lseAiIslands && delete i.__lseAiIslands.econ_detail;
    };
  }, [o.indCountry, o.indCategory, a, l]);
  const f = u.useMemo(() => {
    const i = /* @__PURE__ */ new Map();
    for (const m of a || []) {
      if (m.dataset !== "economics" || !m.country) continue;
      const M = i.get(m.country);
      M ? M.count++ : i.set(m.country, { code: m.country, name: m.country_name || m.country, count: 1 });
    }
    return [...i.values()].sort((m, M) => M.count - m.count || m.name.localeCompare(M.name));
  }, [a]), N = u.useMemo(() => {
    const i = n.trim().toLowerCase();
    return (a || []).filter((m) => m.dataset === "economics" && m.country === o.indCountry).filter((m) => !o.indCategory || m.category === o.indCategory).filter((m) => !i || m.name.toLowerCase().includes(i) || m.category.toLowerCase().includes(i)).sort((m, M) => m.category.localeCompare(M.category) || m.name.localeCompare(M.name));
  }, [a, o.indCountry, o.indCategory, n]), S = u.useMemo(() => {
    const i = /* @__PURE__ */ new Map();
    for (const m of a || [])
      m.dataset !== "economics" || m.country !== o.indCountry || i.set(m.category, (i.get(m.category) || 0) + 1);
    return [...i.keys()].sort();
  }, [a, o.indCountry]);
  if (p !== "ok") return /* @__PURE__ */ e.jsx("div", { style: { flex: 1 }, children: /* @__PURE__ */ e.jsx(fe, { state: p, what: "the indicator catalog" }) });
  const b = "minmax(200px,1fr) minmax(120px,180px) 110px 90px 90px 80px 70px", g = 780, R = {
    fontVariantNumeric: "tabular-nums",
    textAlign: "right",
    fontFamily: "ui-monospace, Consolas, monospace",
    fontSize: 11.5
  }, D = f.find((i) => i.code === o.indCountry);
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, overflow: "auto", minWidth: 0 }, children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 12px 6px", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ e.jsx(
          Ee,
          {
            countries: f,
            value: o.indCountry,
            onChange: (i) => {
              r({ indCountry: i, indCategory: "" }), k(null);
            }
          }
        ),
        /* @__PURE__ */ e.jsxs(
          "select",
          {
            value: o.indCategory,
            onChange: (i) => r({ indCategory: i.target.value }),
            style: { background: t.bg, color: t.text, border: `1px solid ${t.edge}`, borderRadius: 3, padding: "4px 8px", maxWidth: 260 },
            children: [
              /* @__PURE__ */ e.jsxs("option", { value: "", children: [
                "All categories (",
                S.length,
                ")"
              ] }),
              S.map((i) => /* @__PURE__ */ e.jsx("option", { value: i, children: i }, i))
            ]
          }
        ),
        /* @__PURE__ */ e.jsxs("span", { style: { color: t.dim, fontSize: 11 }, children: [
          N.length,
          " series · ",
          D?.count || 0,
          " for ",
          D?.name || o.indCountry,
          " · click a row for the full history"
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { style: {
        display: "grid",
        gridTemplateColumns: b,
        gap: 8,
        alignItems: "center",
        minWidth: g,
        padding: "5px 12px",
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: t.bg,
        borderBottom: `1px solid ${t.edge}`,
        color: t.dim,
        fontSize: 9.5,
        letterSpacing: ".06em",
        textTransform: "uppercase"
      }, children: [
        /* @__PURE__ */ e.jsx("span", { children: "Series" }),
        /* @__PURE__ */ e.jsx("span", { children: "Source" }),
        /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "Latest" }),
        /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "1Y %" }),
        /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "Last" }),
        /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "Freq" }),
        /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "Obs" })
      ] }),
      N.map((i) => {
        const m = l?.symbol === i.symbol;
        return /* @__PURE__ */ e.jsxs(
          "div",
          {
            onClick: () => k(i),
            title: `${i.category} · ${i.symbol}`,
            style: {
              display: "grid",
              gridTemplateColumns: b,
              gap: 8,
              alignItems: "center",
              minWidth: g,
              padding: "3px 12px",
              cursor: "pointer",
              borderBottom: `1px solid ${t.edge}`,
              background: m ? t.active : "transparent",
              borderLeft: m ? `2px solid ${t.actual}` : "2px solid transparent"
            },
            onMouseEnter: (M) => {
              m || (M.currentTarget.style.background = t.edge);
            },
            onMouseLeave: (M) => {
              m || (M.currentTarget.style.background = "transparent");
            },
            children: [
              /* @__PURE__ */ e.jsx("span", { style: { fontSize: 11.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: De(i) }),
              /* @__PURE__ */ e.jsx(
                "span",
                {
                  style: { fontSize: 11, color: t.dim, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
                  title: i.source,
                  children: i.source
                }
              ),
              /* @__PURE__ */ e.jsx("span", { style: { ...R, color: t.text, fontSize: 12 }, children: W(i.last_value, i.unit) }),
              /* @__PURE__ */ e.jsx(
                "span",
                {
                  style: { ...R, color: i.change_1y ? i.change_1y > 0 ? t.up : t.down : t.dim },
                  title: Re(i.change_1y).title,
                  children: Re(i.change_1y).text
                }
              ),
              /* @__PURE__ */ e.jsx("span", { style: { ...R, color: t.dim, fontFamily: "inherit" }, children: i.last }),
              /* @__PURE__ */ e.jsx("span", { style: { ...R, color: t.dim, fontFamily: "inherit" }, children: i.frequency }),
              /* @__PURE__ */ e.jsx("span", { style: { ...R, color: t.dim }, children: i.obs ?? "" })
            ]
          },
          i.symbol
        );
      }),
      N.length === 0 && /* @__PURE__ */ e.jsx("div", { style: { padding: 30, color: t.dim }, children: "No series match the filter." })
    ] }),
    l && /* @__PURE__ */ e.jsx(
      be,
      {
        title: l.name,
        subtitle: `${l.country_name} · ${l.category} · ${l.frequency}${l.source ? ` · ${l.source}` : ""}`,
        unit: l.unit,
        points: L,
        loading: I,
        error: h,
        range: o.macroRange,
        onRange: (i) => r({ macroRange: i }),
        onClose: () => k(null)
      }
    )
  ] });
}
function Ve({ prefs: o, update: r, search: n }) {
  const { rows: a, state: p } = ye(), [l, k] = u.useState("curve"), [L, I] = u.useState("10Y"), [h, f] = u.useState(null), { points: N, loading: S, error: b } = ve(h ? { symbol: h.symbol, dataset: "bonds" } : null), [g, R] = u.useState({}), [D, i] = u.useState(!1), m = u.useMemo(() => (a || []).filter((s) => s.dataset === "bonds"), [a]);
  u.useEffect(() => {
    const s = window;
    return (s.__lseAiIslands ||= {}).econ_detail = {
      view: "bond yields",
      mode: l,
      country: o.bondCountry,
      board_tenor: l === "board" ? L : null,
      bond_series_in_catalog: m.length,
      open_series: h ? `${h.country_name} ${h.name}` : null
    }, () => {
      s.__lseAiIslands && delete s.__lseAiIslands.econ_detail;
    };
  }, [l, o.bondCountry, L, m.length, h]);
  const M = u.useMemo(() => {
    const s = /* @__PURE__ */ new Map();
    for (const x of m) {
      const $ = s.get(x.country);
      $ ? $.count++ : s.set(x.country, { code: x.country, name: x.country_name || x.country, count: 1 });
    }
    return [...s.values()].sort((x, $) => x.name.localeCompare($.name));
  }, [m]), P = u.useMemo(() => m.filter((s) => s.country === o.bondCountry).map((s) => ({ row: s, tenor: ie(s) })).sort((s, x) => ae(s.tenor) - ae(x.tenor)), [m, o.bondCountry]);
  if (u.useEffect(() => {
    if (l !== "curve" || !P.length) return;
    const s = P.map((A) => A.row.symbol).filter((A) => !(A in g));
    if (!s.length) return;
    let x = !1;
    i(!0);
    const $ = z(U(/* @__PURE__ */ new Date(), -400));
    return Promise.all(s.map((A) => Le(A, "bonds", $).then((v) => [A, v]).catch(() => [A, []]))).then((A) => {
      x || R((v) => {
        const F = { ...v };
        for (const [B, Z] of A) F[B] = Z;
        return F;
      });
    }).finally(() => {
      x || i(!1);
    }), () => {
      x = !0;
    };
  }, [l, P, g]), p !== "ok") return /* @__PURE__ */ e.jsx("div", { style: { flex: 1 }, children: /* @__PURE__ */ e.jsx(fe, { state: p, what: "government bond yields" }) });
  const j = (s, x) => {
    if (!s?.length) return null;
    let $ = null;
    for (const A of s)
      if (A.date <= x) $ = A.value;
      else break;
    return $;
  }, E = z(U(/* @__PURE__ */ new Date(), -30)), Q = z(U(/* @__PURE__ */ new Date(), -365)), d = P.map(({ row: s, tenor: x }) => {
    const $ = g[s.symbol], A = $?.length ? $[$.length - 1] : null, v = $ && $.length > 1 ? $[$.length - 2].value : null, F = A?.value ?? s.last_value;
    return {
      row: s,
      tenor: x,
      now: F,
      date: A?.date || s.last,
      d1: F != null && v != null ? F - v : null,
      m1: F != null ? (() => {
        const B = j($, E);
        return B == null ? null : F - B;
      })() : null,
      y1: F != null ? (() => {
        const B = j($, Q);
        return B == null ? null : F - B;
      })() : null,
      mAgo: j($, E),
      yAgo: j($, Q),
      spark: ($ || []).map((B) => B.value)
    };
  }), C = (s) => s.includes(" "), O = d.filter((s) => !C(s.tenor)), J = (s) => d.find((x) => C(x.tenor) && x.tenor.split(" ")[0] === s)?.now ?? null, q = d.some((s) => C(s.tenor)), ee = {
    backgroundColor: "transparent",
    animation: !1,
    legend: {
      top: 0,
      right: 8,
      icon: "roundRect",
      itemWidth: 10,
      itemHeight: 4,
      textStyle: { color: t.dim, fontSize: 10 }
    },
    grid: { left: 8, right: 16, top: 26, bottom: 6, containLabel: !0 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(21,22,25,.96)",
      borderColor: t.edge,
      textStyle: { color: t.text, fontSize: 11 },
      valueFormatter: (s) => s == null ? "—" : `${Number(s).toFixed(3)}%`
    },
    xAxis: {
      type: "category",
      data: O.map((s) => s.tenor),
      axisLine: { lineStyle: { color: t.edge } },
      axisTick: { show: !1 },
      axisLabel: { color: t.dim, fontSize: 10 }
    },
    yAxis: {
      type: "value",
      scale: !0,
      axisLabel: { color: t.dim, fontSize: 10, formatter: (s) => `${s.toFixed(2)}%` },
      splitLine: { lineStyle: { color: "rgba(255,255,255,0.05)", type: "dashed" } }
    },
    series: [
      {
        name: "Latest",
        type: "line",
        data: O.map((s) => s.now),
        connectNulls: !0,
        lineStyle: { color: t.actual, width: 2 },
        itemStyle: { color: t.actual },
        symbol: "circle",
        symbolSize: 5
      },
      {
        name: "1M ago",
        type: "line",
        data: O.map((s) => s.mAgo),
        connectNulls: !0,
        lineStyle: { color: t.consensus, width: 1.5, type: "dashed" },
        itemStyle: { color: t.consensus },
        symbol: "none"
      },
      {
        name: "1Y ago",
        type: "line",
        data: O.map((s) => s.yAgo),
        connectNulls: !0,
        lineStyle: { color: t.previous, width: 1.5, type: "dotted" },
        itemStyle: { color: t.previous },
        symbol: "none"
      },
      ...q ? [{
        name: "Real (linked)",
        type: "line",
        data: O.map((s) => J(s.tenor)),
        connectNulls: !0,
        lineStyle: { color: t.up, width: 1.5 },
        itemStyle: { color: t.up },
        symbol: "circle",
        symbolSize: 4
      }] : []
    ]
  }, oe = n.trim().toLowerCase(), te = m.filter((s) => ie(s) === L).filter((s) => !oe || (s.country_name || "").toLowerCase().includes(oe)).sort((s, x) => (x.last_value ?? -99) - (s.last_value ?? -99)), c = [...new Set(m.map(ie))].sort((s, x) => ae(s) - ae(x)), w = {
    fontVariantNumeric: "tabular-nums",
    textAlign: "right",
    fontFamily: "ui-monospace, Consolas, monospace",
    fontSize: 11.5
  }, y = (s) => {
    const x = s == null ? null : Math.round(s * 100);
    return /* @__PURE__ */ e.jsx("span", { style: { ...w, color: x == null || x === 0 ? t.dim : x > 0 ? t.up : t.down }, children: x == null ? "" : `${x > 0 ? "+" : ""}${x}bp` });
  }, T = "90px minmax(120px,1fr) 100px 80px 80px 80px 90px", _ = 640;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, overflow: "auto", minWidth: 0 }, children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 12px 6px", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ e.jsx(
          ne,
          {
            value: l,
            onChange: (s) => {
              k(s), f(null);
            },
            options: [{ key: "curve", label: "Curve" }, { key: "board", label: "Cross-country" }]
          }
        ),
        l === "curve" ? /* @__PURE__ */ e.jsx(
          Ee,
          {
            countries: M,
            value: o.bondCountry,
            onChange: (s) => {
              r({ bondCountry: s }), f(null);
            }
          }
        ) : /* @__PURE__ */ e.jsx(
          "select",
          {
            value: L,
            onChange: (s) => I(s.target.value),
            style: { background: t.bg, color: t.text, border: `1px solid ${t.edge}`, borderRadius: 3, padding: "4px 8px" },
            children: c.map((s) => /* @__PURE__ */ e.jsx("option", { value: s, children: s }, s))
          }
        ),
        /* @__PURE__ */ e.jsx("span", { style: { color: t.dim, fontSize: 11 }, children: l === "curve" ? `${P.length} tenors · daily closes back to ${P[0]?.row.first?.slice(0, 4) || "—"}${D ? " · loading curve…" : ""}` : `${te.length} countries · ${L} government yield` })
      ] }),
      l === "curve" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("div", { style: { padding: "0 12px 8px" }, children: /* @__PURE__ */ e.jsx("div", { style: { background: t.panel, border: `1px solid ${t.edge}` }, children: /* @__PURE__ */ e.jsx(Ke, { option: ee }) }) }),
        /* @__PURE__ */ e.jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: T,
          gap: 8,
          alignItems: "center",
          padding: "5px 12px",
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: t.bg,
          borderBottom: `1px solid ${t.edge}`,
          color: t.dim,
          fontSize: 9.5,
          letterSpacing: ".06em",
          textTransform: "uppercase"
        }, children: [
          /* @__PURE__ */ e.jsx("span", { children: "Tenor" }),
          /* @__PURE__ */ e.jsx("span", { children: "Trend (1Y)" }),
          /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "Yield" }),
          /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "1D" }),
          /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "1M" }),
          /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "1Y" }),
          /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "As of" })
        ] }),
        d.map((s) => {
          const x = h?.symbol === s.row.symbol;
          return /* @__PURE__ */ e.jsxs(
            "div",
            {
              onClick: () => f(s.row),
              style: {
                display: "grid",
                gridTemplateColumns: T,
                gap: 8,
                alignItems: "center",
                minWidth: _,
                padding: "3px 12px",
                cursor: "pointer",
                borderBottom: `1px solid ${t.edge}`,
                background: x ? t.active : "transparent",
                borderLeft: x ? `2px solid ${t.actual}` : "2px solid transparent"
              },
              onMouseEnter: ($) => {
                x || ($.currentTarget.style.background = t.edge);
              },
              onMouseLeave: ($) => {
                x || ($.currentTarget.style.background = "transparent");
              },
              children: [
                /* @__PURE__ */ e.jsx("span", { style: { fontSize: 11.5 }, children: s.tenor }),
                s.spark.length > 1 ? /* @__PURE__ */ e.jsx(_e, { values: s.spark }) : /* @__PURE__ */ e.jsx("span", {}),
                /* @__PURE__ */ e.jsx("span", { style: { ...w, color: t.text, fontSize: 12 }, children: s.now == null ? "—" : `${s.now.toFixed(3)}%` }),
                y(s.d1),
                y(s.m1),
                y(s.y1),
                /* @__PURE__ */ e.jsx("span", { style: { ...w, color: t.dim, fontFamily: "inherit" }, children: s.date })
              ]
            },
            s.row.symbol
          );
        }),
        P.length === 0 && /* @__PURE__ */ e.jsx("div", { style: { padding: 30, color: t.dim }, children: "No yield curve for this country." })
      ] }),
      l === "board" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "170px 110px 90px 90px 110px",
          gap: 8,
          alignItems: "center",
          minWidth: 600,
          padding: "5px 12px",
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: t.bg,
          borderBottom: `1px solid ${t.edge}`,
          color: t.dim,
          fontSize: 9.5,
          letterSpacing: ".06em",
          textTransform: "uppercase"
        }, children: [
          /* @__PURE__ */ e.jsx("span", { children: "Country" }),
          /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "Yield" }),
          /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "1D %" }),
          /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "1Y %" }),
          /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "As of" })
        ] }),
        te.map((s) => {
          const x = h?.symbol === s.symbol;
          return /* @__PURE__ */ e.jsxs(
            "div",
            {
              onClick: () => f(s),
              style: {
                display: "grid",
                gridTemplateColumns: "170px 110px 90px 90px 110px",
                gap: 8,
                alignItems: "center",
                minWidth: 600,
                padding: "3px 12px",
                cursor: "pointer",
                borderBottom: `1px solid ${t.edge}`,
                background: x ? t.active : "transparent",
                borderLeft: x ? `2px solid ${t.actual}` : "2px solid transparent"
              },
              onMouseEnter: ($) => {
                x || ($.currentTarget.style.background = t.edge);
              },
              onMouseLeave: ($) => {
                x || ($.currentTarget.style.background = "transparent");
              },
              children: [
                /* @__PURE__ */ e.jsxs("span", { style: { fontSize: 11.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: [
                  /* @__PURE__ */ e.jsx(K, { code: s.country }),
                  " ",
                  s.country_name
                ] }),
                /* @__PURE__ */ e.jsx("span", { style: { ...w, color: t.text, fontSize: 12 }, children: s.last_value == null ? "—" : `${s.last_value.toFixed(3)}%` }),
                /* @__PURE__ */ e.jsx("span", { style: { ...w, color: s.change_pct ? s.change_pct > 0 ? t.up : t.down : t.dim }, children: s.change_pct == null ? "" : `${s.change_pct > 0 ? "+" : ""}${s.change_pct.toFixed(2)}%` }),
                /* @__PURE__ */ e.jsx("span", { style: { ...w, color: s.change_1y ? s.change_1y > 0 ? t.up : t.down : t.dim }, children: s.change_1y == null ? "" : `${s.change_1y > 0 ? "+" : ""}${s.change_1y.toFixed(1)}%` }),
                /* @__PURE__ */ e.jsx("span", { style: { ...w, color: t.dim, fontFamily: "inherit" }, children: s.last })
              ]
            },
            s.symbol
          );
        }),
        te.length === 0 && /* @__PURE__ */ e.jsx("div", { style: { padding: 30, color: t.dim }, children: "No country carries this tenor." })
      ] })
    ] }),
    h && /* @__PURE__ */ e.jsx(
      be,
      {
        title: `${h.country_name} ${ie(h)}`,
        subtitle: `Government bond yield · daily close · ${h.first} to ${h.last}`,
        unit: "percent",
        points: N,
        loading: S,
        error: b,
        range: o.macroRange,
        onRange: (s) => r({ macroRange: s }),
        onClose: () => f(null)
      }
    )
  ] });
}
function Ke({ option: o }) {
  const r = u.useRef(null), n = u.useRef(null);
  return u.useEffect(() => {
    if (!r.current) return;
    const a = he(r.current);
    n.current = a;
    const p = new ResizeObserver(() => a.resize());
    return p.observe(r.current), () => {
      p.disconnect(), a.dispose(), n.current = null;
    };
  }, []), u.useEffect(() => {
    n.current?.setOption(o, { notMerge: !0 });
  }, [o]), /* @__PURE__ */ e.jsx("div", { ref: r, style: { width: "100%", height: 230 } });
}
function Je({ prefs: o, update: r, search: n }) {
  const { rows: a, state: p } = ye(), [l, k] = u.useState(null), { points: L, loading: I, error: h } = ve(l ? { symbol: l.symbol, dataset: "economics" } : null), [f, N] = u.useState(null);
  u.useEffect(() => {
    const d = window;
    return (d.__lseAiIslands ||= {}).econ_detail = {
      view: "central banks",
      open_series: l ? `${l.country_name} ${l.name}` : null,
      rate_decisions_loaded: f ? f.length : null
    }, () => {
      d.__lseAiIslands && delete d.__lseAiIslands.econ_detail;
    };
  }, [l, f]);
  const S = u.useMemo(() => (a || []).filter((d) => d.dataset === "economics"), [a]), b = u.useMemo(() => {
    const d = /* @__PURE__ */ new Map();
    for (const C of S)
      d.has(C.country) || d.set(C.country, []), d.get(C.country).push(C);
    return d;
  }, [S]), g = (d, C) => (b.get(d) || []).find((O) => O.category === C) || null, R = u.useMemo(() => {
    const d = n.trim().toLowerCase();
    return S.filter((C) => C.category === "Interest Rate").map((C) => ({
      rate: C,
      bank: C.source || `${C.country_name} central bank`,
      sheet: g(C.country, "Central Bank Balance Sheet"),
      m2: g(C.country, "Money Supply M2"),
      fx: g(C.country, "Foreign Exchange Reserves"),
      cpi: g(C.country, "Inflation Rate")
    })).filter((C) => !d || C.bank.toLowerCase().includes(d) || (C.rate.country_name || "").toLowerCase().includes(d)).sort((C, O) => {
      const J = (q) => {
        const ee = Ae.indexOf(q);
        return ee === -1 ? Ae.length : ee;
      };
      return J(C.rate.country) - J(O.rate.country) || (C.rate.country_name || "").localeCompare(O.rate.country_name || "");
    });
  }, [S, b, n]), D = l?.country || "";
  if (u.useEffect(() => {
    if (!D) {
      N(null);
      return;
    }
    let d = !1;
    return N(null), se({
      region: (D === "GB" ? ["GB", "UK"] : [D]).join(","),
      event: "Interest Rate Decision",
      start: z(U(/* @__PURE__ */ new Date(), -365 * 2)),
      end: z(U(/* @__PURE__ */ new Date(), 120)),
      order: "asc",
      limit: "200"
    }).then((O) => {
      d || N(O);
    }).catch(() => {
      d || N([]);
    }), () => {
      d = !0;
    };
  }, [D]), p !== "ok") return /* @__PURE__ */ e.jsx("div", { style: { flex: 1 }, children: /* @__PURE__ */ e.jsx(fe, { state: p, what: "the central bank board" }) });
  const i = {
    fontVariantNumeric: "tabular-nums",
    textAlign: "right",
    fontFamily: "ui-monospace, Consolas, monospace",
    fontSize: 11.5
  }, m = "minmax(200px,1fr) 150px 90px 90px 110px 110px 100px", M = 860, P = R.find((d) => d.rate.symbol === l?.symbol), j = z(/* @__PURE__ */ new Date()), E = (f || []).find((d) => d.date >= j && !d.actual), Q = (f || []).filter((d) => d.actual).slice(-6).reverse();
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, overflow: "auto", minWidth: 0 }, children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 8, padding: "8px 12px 6px" }, children: [
        /* @__PURE__ */ e.jsx("b", { style: { fontSize: 13 }, children: "Policy rates" }),
        /* @__PURE__ */ e.jsxs("span", { style: { color: t.dim, fontSize: 11 }, children: [
          R.length,
          " central banks · policy rate with the balance sheet, money supply and reserves each bank publishes · click a row for the rate history and its decision schedule"
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { style: {
        display: "grid",
        gridTemplateColumns: m,
        gap: 8,
        alignItems: "center",
        minWidth: M,
        padding: "5px 12px",
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: t.bg,
        borderBottom: `1px solid ${t.edge}`,
        color: t.dim,
        fontSize: 9.5,
        letterSpacing: ".06em",
        textTransform: "uppercase"
      }, children: [
        /* @__PURE__ */ e.jsx("span", { children: "Central bank" }),
        /* @__PURE__ */ e.jsx("span", { children: "Country" }),
        /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "Policy rate" }),
        /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "Inflation" }),
        /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "Balance sheet" }),
        /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "Money supply M2" }),
        /* @__PURE__ */ e.jsx("span", { style: { textAlign: "right" }, children: "As of" })
      ] }),
      R.map((d) => {
        const C = l?.symbol === d.rate.symbol;
        return /* @__PURE__ */ e.jsxs(
          "div",
          {
            onClick: () => k(d.rate),
            title: d.sheet?.unit ? `Balance sheet in ${d.sheet.unit}` : void 0,
            style: {
              display: "grid",
              gridTemplateColumns: m,
              gap: 8,
              alignItems: "center",
              minWidth: M,
              padding: "3px 12px",
              cursor: "pointer",
              borderBottom: `1px solid ${t.edge}`,
              background: C ? t.active : "transparent",
              borderLeft: C ? `2px solid ${t.actual}` : "2px solid transparent"
            },
            onMouseEnter: (O) => {
              C || (O.currentTarget.style.background = t.edge);
            },
            onMouseLeave: (O) => {
              C || (O.currentTarget.style.background = "transparent");
            },
            children: [
              /* @__PURE__ */ e.jsx("span", { style: { fontSize: 11.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: d.bank }),
              /* @__PURE__ */ e.jsxs("span", { style: { fontSize: 11, color: t.dim, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: [
                /* @__PURE__ */ e.jsx(K, { code: d.rate.country }),
                " ",
                d.rate.country_name
              ] }),
              /* @__PURE__ */ e.jsx("span", { style: { ...i, color: t.text, fontSize: 12 }, children: W(d.rate.last_value, d.rate.unit) }),
              /* @__PURE__ */ e.jsx("span", { style: { ...i, color: t.dim }, children: d.cpi ? W(d.cpi.last_value, d.cpi.unit) : "" }),
              /* @__PURE__ */ e.jsx("span", { style: { ...i, color: t.dim }, title: d.sheet?.unit || "", children: d.sheet ? W(d.sheet.last_value, d.sheet.unit) : "" }),
              /* @__PURE__ */ e.jsx("span", { style: { ...i, color: t.dim }, title: d.m2?.unit || "", children: d.m2 ? W(d.m2.last_value, d.m2.unit) : "" }),
              /* @__PURE__ */ e.jsx("span", { style: { ...i, color: t.dim, fontFamily: "inherit" }, children: d.rate.last })
            ]
          },
          d.rate.symbol
        );
      }),
      R.length === 0 && /* @__PURE__ */ e.jsx("div", { style: { padding: 30, color: t.dim }, children: "No central bank matches the filter." })
    ] }),
    l && /* @__PURE__ */ e.jsx(
      be,
      {
        title: P?.bank || l.name,
        subtitle: `${l.country_name} policy rate · ${l.first} to ${l.last}`,
        unit: l.unit,
        points: L,
        loading: I,
        error: h,
        range: o.macroRange,
        onRange: (d) => r({ macroRange: d }),
        onClose: () => k(null),
        extra: /* @__PURE__ */ e.jsxs("div", { style: { borderTop: `1px solid ${t.edge}`, maxHeight: "38%", overflowY: "auto", flex: "none" }, children: [
          /* @__PURE__ */ e.jsx("div", { style: {
            padding: "6px 12px 2px",
            color: t.dim,
            fontSize: 9.5,
            letterSpacing: ".06em",
            textTransform: "uppercase"
          }, children: "Rate decisions" }),
          f === null && /* @__PURE__ */ e.jsx("div", { style: { padding: "2px 12px 6px", color: t.dim, fontSize: 11 }, children: "Loading schedule…" }),
          f !== null && !f.length && /* @__PURE__ */ e.jsx("div", { style: { padding: "2px 12px 6px", color: t.dim, fontSize: 11 }, children: "The calendar feed carries no rate decisions for this country." }),
          E && /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", gap: 8, padding: "2px 12px", fontSize: 11 }, children: [
            /* @__PURE__ */ e.jsx("span", { style: { color: t.consensus }, children: "Next" }),
            /* @__PURE__ */ e.jsx("span", { style: { fontVariantNumeric: "tabular-nums" }, children: E.date }),
            /* @__PURE__ */ e.jsx("span", { style: { color: t.dim }, children: E.time || "" }),
            E.consensus && /* @__PURE__ */ e.jsxs("span", { style: { marginLeft: "auto", color: t.dim }, children: [
              "exp ",
              E.consensus
            ] })
          ] }),
          Q.map((d) => /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", gap: 8, padding: "2px 12px", fontSize: 11, color: t.dim }, children: [
            /* @__PURE__ */ e.jsx("span", { style: { fontVariantNumeric: "tabular-nums" }, children: d.date }),
            /* @__PURE__ */ e.jsx("span", { style: { color: t.text }, children: d.actual }),
            /* @__PURE__ */ e.jsxs("span", { children: [
              "was ",
              d.previous || "—"
            ] })
          ] }, d.id)),
          /* @__PURE__ */ e.jsx("div", { style: {
            padding: "8px 12px 2px",
            color: t.dim,
            fontSize: 9.5,
            letterSpacing: ".06em",
            textTransform: "uppercase"
          }, children: "Bank statistics" }),
          (b.get(l.country) || []).filter((d) => ue.includes(d.category) && d.symbol !== l.symbol).sort((d, C) => ue.indexOf(d.category) - ue.indexOf(C.category)).map((d) => /* @__PURE__ */ e.jsxs(
            "div",
            {
              onClick: () => k(d),
              style: { display: "flex", gap: 8, padding: "2px 12px", fontSize: 11, cursor: "pointer" },
              onMouseEnter: (C) => {
                C.currentTarget.style.background = t.edge;
              },
              onMouseLeave: (C) => {
                C.currentTarget.style.background = "transparent";
              },
              children: [
                /* @__PURE__ */ e.jsx("span", { style: { color: t.dim, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: d.category }),
                /* @__PURE__ */ e.jsx("span", { style: { fontVariantNumeric: "tabular-nums" }, children: W(d.last_value, d.unit) }),
                /* @__PURE__ */ e.jsx("span", { style: { color: t.dim, fontSize: 10 }, children: d.last })
              ]
            },
            d.symbol
          ))
        ] })
      }
    )
  ] });
}
export {
  Qe as default
};
