# TradeOS — Architecture Audit (Phase 0)

Date: 2026-09-10 · Branch: `arena/01a08a7a-traderos` · Commit base: rebrand `8e33a7e`

This document maps the existing system before the "Market Intelligence OS"
transformation. Principle: **preserve the engine, transform the experience.**

---

## 1. Frontend architecture

| Area | Current state |
|---|---|
| Stack | React 18 + TypeScript + Vite 6, Tailwind, TanStack Query, Zustand |
| Routing | `App.tsx`, **115 routes** (74 page components), nested `/equity/*` under `EquityLayout` |
| Shell | `components/layout/TerminalShell.tsx` + TopBar, StatusBar, MarketStatusBar, TickerTape, IconRail, Sidebar, PanelChrome, SplitPane |
| Command OS | `CommandPalette.tsx` + `commanding.ts` (878 lines) — Bloomberg-style function codes (`AAPL GP`, `FA MARGINS`), asset disambiguation, natural-language fallback, chart-workstation action dispatch, fuzzy search (fuse.js/cmdk) |
| Linked context | `contexts/SymbolLinkContext.tsx` — link groups (red/blue/green/yellow) + BroadcastChannel multi-window sync; `CrosshairSyncContext`, `KeyboardNavigationContext` |
| Design system | `components/terminal/*` (17 primitives: TerminalPanel/Table/Tabs/Input/Modal…), `components/common/*` (DataGrid, MetricCard, SparkLine, SymbolContextMenu…), 194 components total |
| Tokens | `styles/terminal-theme.css` — full token system (color/type/space/radius/density/semantics), TradeOS brand palette applied, theme variants (`classic-bloomberg`, `light-desk`, …) |
| Stores | zustand: stock, chart, chartWorkstation, alerts, navigation, notification, screener, settings, shortcut, workspaceTemplate |
| Data layer | `api/` — **47 typed modules** (equity, news, analytics, statlab, risk, factors, fno, intelligence, portfolio*, quantClient, heatmap, insider…) over axios instance |
| Charts | lightweight-charts (+indicators), recharts, nivo (bar/heatmap), three.js |
| Layout engines | react-grid-layout, react-mosaic-component (docking workspaces) |
| Graph libs | **reactflow** + d3-hierarchy (unused for market relationships — opportunity) |
| Home | `home/HomePage.tsx` + `components/home/MissionControlGrid.tsx` (mission-control layout, market pulse elements) |
| Launchpad | `components/layout/Launchpad*` — template gallery + grid workspaces + persistence |

## 2. Backend architecture

FastAPI (`backend/main.py`) serving SPA + `/api/*`; 46 domain packages
(portfolio, risk_engine, statlab, agent, mcp, instruments, data_quality, tca…);
provider adapters with fallback + caching; websocket quote bus (Redis →
in-memory fallback); alembic migrations; plugin system; multi-agent debate
service; LLM factory (optional keys).

## 3. Existing vs. brief — gap analysis

| Brief capability | Status |
|---|---|
| Universal command system (Ctrl+K) | ✅ Exists (function codes + NL) — extendable |
| Global market ribbon | ✅ TickerTape + MarketStatusBar |
| Linked modules / link groups | ✅ SymbolLinkContext |
| Dockable workspaces / templates | ✅ Launchpad + mosaic/grid layouts |
| Chart workstation / multi-pane / sync | ✅ chart-workstation suite |
| Options terminal (chain/Greeks/OI/flow) | ✅ fno pages + API |
| Screener / factor / correlation / RS | ✅ pages + APIs |
| Portfolio lab / optimizer / risk / scenarios | ✅ APIs present (`/risk/scenarios`, statlab regimes) |
| Multi-agent debate / AI agent | ✅ backend + pages |
| **Unified Market Context Engine** | ⚠️ Partial — symbol linking only; no single context object |
| **"Why did this move?"** | ❌ Missing |
| **Relationship Graph** | ❌ Missing (reactflow available) |
| **Market regime surface (global)** | ⚠️ Backend `POST /statlab/regimes` exists; no global UI |
| **Market narrative / event intelligence** | ⚠️ Partial (intelligence timeline API exists) |
| Market time machine | ⚠️ Partial (chart history + rewind landing concept) |
| Screener 2.0 NL→filters | ⚠️ Partial |
| Multi-monitor detach | ⚠️ BroadcastChannel foundation exists |

## 4. Duplication / danger zones

- Legacy `components/terminal/*` and newer token-driven primitives coexist —
  **do not fork a third system**; extend tokens + reuse.
- `stockStore` is the de-facto "current instrument" store (ticker/market/
  interval/range). The Context Engine must **wrap, not parallel**, it.
- `commanding.ts` function-code parser is centrally tested
  (`commanding.test.ts`) — additions must stay additive.
- `SymbolContextMenu` actions are per-consumer; watchlist test asserts specific
  items (existence, not exclusivity) — additive changes safe.
- HomePage has revamp tests (`HomePage.revamp.test.tsx`,
  `Home.mission-control.test.tsx`) — insert new surfaces additively.

## 5. Transformation opportunities (highest value / lowest risk)

1. **Context Engine** store unifying instrument/market/timeframe/compare/link.
2. **Movement Intelligence ("Why did this move?")** — compose existing
   observed endpoints (performance, returns, news, sector, regime, F&O signal)
   with strict OBSERVED / DERIVED / AI labeling.
3. **Relationship Graph** — reactflow radial graph from real edges: peers,
   sector, market, portfolio holdings, F&O availability, news volume.
4. **Global regime indicator** — derived from index breadth + `/statlab/regimes`
   where a benchmark ticker applies.
5. Command OS: `WHY` + `REL` function codes, graph/regime palette actions.
