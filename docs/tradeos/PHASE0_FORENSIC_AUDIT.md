# TraderOS — Phase 0: Forensic Audit (Complete)

Date: 2026-09-12 · Branch: `arena/01a096f2-traderos` · Base commit: `b5fc7bd` ("ARQOS rebrand")
Auditor: engineering agent, per the FULL-SYSTEM RECONSTRUCTION & ENGINEERING EXECUTION PROTOCOL.
Method: full-source inspection (no product code modified), runtime verification (backend + frontend live), all test/build gates executed.

---

## 0. Executive Summary

The repository is **not an empty shell and not a fake UI** — it is a large, genuinely
engineered, full-stack financial terminal (721 Python files, 614 TS/TSX files, 730 backend
tests + 283 frontend tests all passing, typecheck clean, build green, servers boot, auth
works, SQLite persistence works). A prior agent shipped a real product here, plus three
layers of prior audit documentation (`ARCHITECTURE_AUDIT.md`, `TRANSFORMATION_PLAN.md`,
`ARQOS_DIRECTIVE.md`) whose claims were **independently re-verified** during this audit
(mostly accurate; several claims refuted — see §8).

**However, measured against the TraderOS product contract (§6), the system is a
research/discovery-heavy market terminal — NOT yet the order-flow trading operating system
the contract describes.** The order-flow core — the heart of TraderOS — is the weakest part
of the codebase:

| TraderOS contract item | Reality found |
|---|---|
| DOM / Order Book | Rendered from **100% deterministic synthetic data** (sha256-seeded), mislabeled with real provider names (`kite`, `finnhub`) |
| Tape / Time & Sales | **Fabricated trades** synthesized from OHLCV bars (10 trades/bar) or a random-walk fallback |
| Footprint | **Fabricated** — bid/ask split invented from OHLCV via a 20/25/25/30 allocation heuristic |
| Heatmap (order-flow book heatmap) | **MISSING** entirely (existing heatmaps are: options OI/IV grid, market-performance treemap) |
| CVD (cumulative volume delta) | **MISSING** entirely |
| TPO / Market Profile | **MISSING** entirely |
| Liquidations | **Fabricated** for crypto (formula from 24h change/volume; no real feed) |
| Funding / Open Interest | **Fabricated** for crypto derivatives (same) |
| Replay | Chart-level bar-replay only (real, good UX) — not a terminal-wide event-timeline replay; DOM/tape/footprint do not participate |
| Volume Profile / VPVR | **REAL** (backend computes POC/VA bins from bars; chart overlay exists) |

Meanwhile the layers the contract also requires that ARE substantially real: charting
(candle/Heikin-Ashi/Renko/Kagi/PnF/LineBreak, 71-indicator registry, drawing tools with
server persistence, multi-panel workstation with link groups), paper trading engine
(tick-driven, SQLite), watchlists/scanner/screener, alerts, backtesting + strategy
framework + Monte Carlo/robustness, workspaces/launchpad persistence, command palette,
AI agent with tool use. These must be **preserved and built upon**, not replaced.

The single most important architectural gap: **there is no unified normalized
market-data foundation.** Five separate data pipelines exist in the frontend alone
(§5.1). Phase 1 (Market Data Foundation) is therefore correctly positioned as the
first implementation phase.

---

## 1. Identity & Lineage

The project carries three stacked identities (all in this one commit history, squashed
to a single commit `b5fc7bd`):

| Layer | Name | Where |
|---|---|---|
| Repository / protocol | **TraderOS** | repo slug `nova369-BOT/TraderOS`, this directive |
| Codebase / internal identifiers | **TradeOS** (formerly "Trade_Screens") | package names, env vars (`TRADEOS_*`), npm name `tradeos-frontend`, DB `data/tradeos.db`, `run.txt` still references `C:\Users\hithe\...\Trade_Screens` |
| User-facing brand (current) | **ARQOS — "Beyond the Chart."** | UI title, shell, auth pages, manifest, PWA, docs; Quantum Core theme (charcoal + purple `#8B7FD4`) |

Prior internal docs: `docs/tradeos/ARCHITECTURE_AUDIT.md` (2026-09-10),
`TRANSFORMATION_PLAN.md` (Market Intelligence OS phases 0–4, shipped),
`ARQOS_DIRECTIVE.md` (2026-09-11, A–H subsystem classification + 17-phase map — a
*different* 17-phase plan from this protocol's 16 phases).

**Decision needed (D1):** the protocol calls the product "TraderOS" while the deployed,
approved UI says "ARQOS." Per protocol §2 (approved design must not change) I have
touched nothing. Product naming must be settled by the user before any phase that
touches user-facing strings.

**Design reference:** the user attached a screenshot ("how it gonna look like") during
this audit. The file was not materialized into the sandbox filesystem, and this
environment could not view it. The **currently-running ARQOS/Quantum Core UI** is treated
as the approved visual baseline. If the screenshot depicts a materially different design,
the user should re-attach or describe the deltas; it will then be honored as the visual
contract for affected surfaces.

---

## 2. Stack & Scale Inventory (verified)

### Frontend (`frontend/`)
- React 18.3 + TypeScript 5.8 + Vite 6 + Tailwind 3; TanStack Query 5; Zustand 5 (11 stores)
- Charts: **lightweight-charts 5.1** + `lightweight-charts-indicators` (**71-indicator registry** — verified count) + `oakscriptjs` (Pine-like scripting), recharts, nivo (bar/heatmap), three.js
- Layout engines: react-grid-layout, react-mosaic-component; reactflow (relationship graph)
- Command system: cmdk + fuse.js; `commanding.ts` (33.8 KB, Bloomberg-style function codes, tested)
- Routing: 115 routes / 74 lazy page components (`App.tsx`)
- `api/` 51 typed modules **plus** a parallel central `api/client.ts` (both consumed — split API layer)
- 87 frontend test files (283 tests), 29 Playwright E2E specs (cannot run in this sandbox — §7)

### Backend (`backend/`)
- FastAPI + SQLAlchemy + Alembic (11 migrations) + SQLite default (`data/tradeos.db`; Postgres via env)
- 46+ domain packages: equity, fno, screener, scanner_engine, portfolio/portfolio_lab, risk_engine, statlab, model_lab, agent (+debate, strategy_loop), mcp, paper_trading, oms, tca, data_quality, saved_views, alerts, nlp, research_autopilot, alpha_zoo, experiments, shadow_account, reports/tearsheets, execution_sim, breakout_engine, cockpit, plugins, instruments…
- Provider adapters with failover registry (`adapters.yaml`): alpaca, alpha_vantage, kite, yahoo, us_options, crypto (CoinGecko+Yahoo), mock
- 4 WebSocket endpoints: `/ws/quotes` (MarketDataHub, 2s poll→broadcast, ticks+candles), `/ws/us-quotes` (USTickStreamService: Finnhub/Alpaca real WS), `/ws/depth` (one-shot synthetic snapshot per subscribe), `/ws/alerts` (push)
- Auth: JWT + refresh + CSRF middleware + role model (viewer/…) + API keys; register/login verified live
- Redis optional (in-memory fallback — verified working offline)

### Root-level legacy (compat shims, kept)
`core/`, `nlp/`, `cli/`, `db/`, `models/`, `plugins/`, `ui/`, `trade_screens/`,
`nse_stock_*.py`, `demo_runner.py`, `run.txt` — Python shim modules re-exporting
`backend.*` for old entrypoints. Dead weight but harmless; flagged for eventual
consolidation, **not** deletion (protocol §43).

---

## 3. Architecture Map

```
Application shell
  TerminalShell → TopBar (GO bar + CommandBar), StatusBar (LIVE/MOCK badge),
  IconRail, Sidebar, TickerTape, MarketStatusBar, MobileBottomNav, PanelChrome
        ↓
Workspace system
  ChartWorkstationPage (≤9 slots, grid layouts, link groups A/B/C, compare,
  snapshots/share-links, replay) · Launchpad (template gallery, react-grid-layout,
  backend-persisted user layouts) · SavedViews · workspaceTemplateStore
        ↓
Panel system
  PanelChrome/PanelFrame primitives · terminal design system (17 primitives) ·
  CrosshairSyncContext · SymbolLinkContext (BroadcastChannel multi-window)
        ↓
Domain modules
  chart/ + chart-workstation/ + shared/chart/ (2 competing chart cores — §5.4)
  market/ (DOMLadder, OrderBookPanel, TimeAndSales, DepthChart)
  equity/ fno/ crypto/ forex/ commodities/ screener/ portfolio/ risk/ backtesting/
  modellab/ agent/ alerts/ journal/ ops/ …
        ↓
State layer
  Zustand: stock, chart, chartWorkstation, marketContext, settings, screener,
  alerts, navigation, notification, shortcut, workspaceTemplate
  + react-query cache + QuotesStore/USQuotesStore (inside realtime modules)
        ↓
Data layer
  api/client.ts (central axios) + api/* typed modules + services/chartDataService
  + realtime/{priceStream, useQuotesStream, useUsQuotesStream} (§5.1)
        ↓
Integration layer
  REST /api/* (FastAPI, JWT) · WS /ws/{quotes,us-quotes,depth,alerts} ·
  adapter registry w/ failover · LLM factory (LM Studio local default,
  OpenAI/OpenRouter/Gemini optional)
```

### Data-flow maps & duplicate pipelines

**Market data flow (current, fragmented):**
```
Frontend pipelines (5, independent):
 1. priceStream.ts      — HTTP poll /quotes every 1.5s (watchlists, tapes, status bars)
 2. useQuotesStream     — WS /ws/quotes  (ticks + candles; India/quotes hub)
 3. useUsQuotesStream   — WS /ws/us-quotes (US trades + 1m bars; Finnhub/Alpaca)
 4. OrderBookPanel      — own WS /ws/depth + REST /depth (synthetic)
 5. DOMLadder           — REST /depth polling (synthetic)

Backend sources (3, independent):
 A. MarketDataHub       — 2s poll loop → Yahoo/Kite/NSE fallback quotes → broadcast
                          (aggregates 1m candles from ticks; market-status loop)
 B. USTickStreamService — real provider websockets (Finnhub/Alpaca) → trades/bars
 C. OrderBookService    — deterministic synthetic generator (all markets)
```
No shared normalized model exists for Symbol/Quote/Trade/Candle/OrderBook/Delta/
Stats/Liquidation/OI/Funding/Session — each pipeline re-defines its own shapes.

**Trading flow:** `PaperTrading.tsx`/`HotKeyPanel` → `/api/paper/orders` →
`VirtualOrder` (SQLite) → `PaperTradingEngine` (hub tick listener → fills PENDING
limit/SL orders; market fills on next tick or immediate quote fetch) →
`VirtualPosition`/`VirtualTrade` → performance endpoint (realized PnL curve, Sharpe,
DD, win-rate). No cancel/modify endpoints. No live execution anywhere (correctly absent).

**Research flow:** Backtesting.tsx / ModelLab / AlgorithmFrameworkLab →
`/api/backtest/run` (momentum rotation engine) · `/api/framework/backtest`
(alpha/portfolio-construction/risk model composition) · `core/single_asset_backtest.py`
(Broker w/ fee+slippage bps) · robustness (multi-window, permutation) · Monte Carlo ·
`execution_sim` (costs/slippage profiles). Real, tested engines.

**Replay flow:** `shared/chart/replay.ts` — index-based candle stepping (0.5x–4x,
step, session jump, go-to-date) inside the chart component only. Not event-timeline;
not connected to DOM/tape/footprint.

**AI context flow:** `AgentConsole` → SSE `/api/agent/*` → orchestrator → tool
registry (screener, scanner detectors, backtest runner, market data) → LLM factory.
Context = active symbol + market + route only (`agent/screenContext.ts`). No chart/
order-flow/portfolio context yet. Multi-agent debate service exists. Honest
unavailable-state behavior verified in code (degrades without keys).

**Persistence flow:** SQLite via Alembic (users, watchlists, alerts+history,
paper portfolios/orders/trades, saved views, chart drawings **and** chart templates,
user layouts, journal, notifications, model-lab runs, experiments). Frontend:
zustand persist (settings, shortcuts, workspace templates, alt-chart params) +
localStorage (workstation tabs/snapshots). Drawings persistence via
`/api/chart-drawings/*` verified in routes (POST/GET/PUT/DELETE) — real.

### Conflicting sources of truth (protocol §10 requirement)
| Entity | Competing owners | Verdict |
|---|---|---|
| Current symbol | `stockStore.ticker` vs `chartStore.activeSymbol` vs `marketContextStore` vs workstation slot symbols | `marketContextStore` was built to wrap `stockStore`, but chart workstation slots hold their own symbols — partially reconciled |
| Quote/last price | priceStream poll cache vs QuotesStore ticks vs USQuotesStore trades vs component-level react-query (`useStockData`) | duplicated, unsynchronized |
| Order book | OrderBookPanel WS snapshot vs DOMLadder REST snapshot (separate fetches, separate caches) | duplicated |
| Chart data | `api/client.fetchChart` vs `services/chartDataService.fetchChartData` vs `hooks/useBatchChartData` | three fetch paths |
| Candles | react-query history + QuotesStore `candlesByKey` + USQuotesStore bars | three live-update paths |

---

## 4. Feature Ledger (TraderOS product contract)

Statuses: COMPLETE / PARTIAL / MOCKED / UI-ONLY / BROKEN / MISSING / REGRESSED / UNKNOWN.
"COMPLETE" = UI+state+logic+data+integration+tests verified (protocol §33).

### MARKET TERMINAL
| Feature | Location | Status | Evidence / notes |
|---|---|---|---|
| Charting (candles/OHLC) | `components/chart/TradingChart.tsx` (3,083 ln) + `shared/chart/ChartEngine.tsx` (731 ln) | **PARTIAL** | Two competing chart cores both real (LWC-based); workstation uses TradingChart; StockDetail/Futures use ChartEngine; backtesting has a third. Consolidation required |
| Heikin Ashi / Renko / Kagi / PnF / LineBreak | `shared/chart/alternativeChartTransforms.ts` | **COMPLETE** (transforms) | Real algorithms + persisted params; verified code |
| Multi-timeframe | `MultiTimeframePage`, workstation slots | **COMPLETE** | 1m→1M, hotkeys 1–7, per-slot timeframes |
| Indicators | `shared/chart/IndicatorManager.ts` + catalog | **COMPLETE** | 71-registry + 10 custom (KAMA, LRC, UO, KDJ, σ, HV, session/anchored VWAP…) + param editor + templates |
| Drawing tools | `shared/chart/drawingEngine.ts` (1,230 ln) + persistence API | **COMPLETE** | Server-persisted per symbol (4 REST endpoints verified) |
| Volume / VWAP | chart volume pane + session/anchored VWAP | **COMPLETE** | Real |
| Volume Profile / VPVR | backend `/charts/volume-profile/{symbol}` + `chart/VolumeProfile.tsx` | **PARTIAL** | Real POC/VA computation; returns zero-volume bins offline without explicit UNAVAILABLE; API path style inconsistent with footprint route |
| **DOM / Order Book** | `OrderBookPanel.tsx` (698 ln), `DOMLadder.tsx`, `backend/services/orderbook_service.py` | **MOCKED** | 100% deterministic synthetic (sha256 seed); mislabeled provider_key `kite`/`finnhub`/`binance`; `/ws/depth` = one snapshot per subscribe, no stream |
| **Tape** | `TimeAndSales.tsx` + `backend/api/routes/tape.py` | **MOCKED** | Fabricates 10 trades/bar from OHLCV or random-walk fallback; 5s REST polling |
| **Footprint** | backend `/charts/{symbol}/footprint` + `shared/chart/footprintRenderer.ts` | **MOCKED** | Bid/ask split invented (20/25/25/30 heuristic); renderer itself is real and reusable |
| **Heatmap (order-flow)** | — | **MISSING** | No book-heatmap anywhere (nivo/recharts heatmaps present are options-OI and market-performance) |
| **CVD** | — | **MISSING** | Zero occurrences in codebase |
| **TPO / Market Profile** | — | **MISSING** | Zero occurrences (grep hits were false positives) |
| **Liquidations** | `crypto/CryptoDerivativesPanel`, `realtime/binance_ws.py` | **MOCKED** | Fabricated from 24h change/volume formulas; no real feed despite file name |
| **Open Interest / Funding** | same | **MOCKED** (crypto) / **PARTIAL** (F&O) | Crypto fabricated; NSE F&O OI/PCR real (bhavcopy ingest service) when network available |
| Session information | hub `_market_status_loop`, `/ws/quotes` market_status | **PARTIAL** | Real NSE status; provider-dependent |
| Replay | `shared/chart/replay.ts` + workstation integration | **PARTIAL** | Chart-only bar replay, real controls; not terminal-wide, no order-flow participation |

### TRADING
| Feature | Location | Status | Evidence |
|---|---|---|---|
| Order Entry | `PaperTrading.tsx`, `HotKeyPanel.tsx` | **PARTIAL** | Market/limit/SL only; no bracket/TP-SL/TIF/reduce-only/leverage; no professional ticket |
| Execution paths classification | code + `ARQOS_DIRECTIVE` | **PARTIAL** | PAPER (real engine) + MOCK (synthetic book/tape); LIVE correctly absent; UI does not label paper as live (good); DOM/Tape do not label synthetic (bad — protocol §31 violation) |
| Orders lifecycle | `VirtualOrder` + engine | **PARTIAL** | PENDING→FILLED/REJECTED only; no submitted/accepted/partial/cancelled/modified; **no cancel/modify API** |
| Positions / Fills / PnL | paper engine + pages | **PARTIAL** | Long-only; realized PnL real; unrealized needs mark prices (offline: stale); portfolio perf metrics real |
| Risk | `risk_engine/`, RiskDashboard, OMS, TCA | **PARTIAL** | Real scenario/stress engines for held portfolios; no per-order risk checks on paper engine |
| Portfolio | `Portfolio.tsx` (67 KB), portfolio_lab, optimizer | **PARTIAL** | Real backend analytics; holdings ingestion manual |
| Live broker integration | — | **MISSING** (correctly) | No order routing anywhere; data-only adapters |

### MARKET DISCOVERY
| Feature | Status | Evidence |
|---|---|---|
| Watchlists | **COMPLETE** | Multi-list CRUD (SQLite), auto-default list verified live; reorder/favorite not found → PARTIAL nuance |
| Scanner | **COMPLETE** | scanner_engine detectors (breakout/BB-squeeze/NR7/inside-bar/trend-retest/supertrend) + scheduler + BreakoutScanner page |
| Screener | **COMPLETE** | 1,899-ln engine + guru presets + custom formula + viz; presets verified live |
| Market overview | **COMPLETE** | HomePage mission control, TickerTape, MarketStatusBar, hotlists, market heatmap (treemap) |
| News | **PARTIAL** | Real fetchers+NLP sentiment; provider-dependent (offline → empty) |
| Calendar | **PARTIAL** | EarningsCalendar + economic terminal (FRED-dependent) |
| Sentiment | **PARTIAL** | News-based per-ticker/market sentiment; no social/fear-greed |
| Alerts | **COMPLETE** | v2 CRUD + evaluator service + delivery channels + history + WS push; scheduler verified in lifespan |

### RESEARCH
| Feature | Status | Evidence |
|---|---|---|
| Strategies / builder | **PARTIAL** | AlgorithmFrameworkLab (alpha/PC/risk composition — real, Lean-inspired), oakscript script editor+library; **no visual node builder** (reactflow unused for this) |
| Backtesting | **PARTIAL** | Real engines (rotation, single-asset, framework) w/ fees+slippage; results derived from actual runs (verified metrics code); live-data-dependent (offline: no runs possible) |
| Trade analysis | **PARTIAL** | tearsheets, MFE/MAE in analytics, journal; honest |
| Optimization / sweeps | **PARTIAL** | SweepPanel, parameter sensitivity heatmap, walk-forward/robustness (multi-window, permutation), Monte Carlo — real, surfacing partial |
| Simulation | **PARTIAL** | paper trading + shadow account; no replay-coupled simulation |

### PLATFORM
| Feature | Status | Evidence |
|---|---|---|
| Workspaces / layouts | **COMPLETE** | Launchpad templates + grid workspaces + backend `user_layouts` + workstation snapshots/share links; isolation via storage keys |
| Layout persistence | **COMPLETE** | verified: chart drawings, chart templates, workstation tabs/defaults, user layouts, saved views (Alembic 0011) |
| Data sources / integrations | **PARTIAL** | Real adapter registry + failover + `adapters.yaml`; **no management UI** (env-only config) |
| Accounts | **COMPLETE** | JWT auth, roles, API keys, register/login/forgot verified live |
| Settings | **PARTIAL** | Theme/density/market; no data-source/provider management |
| Command palette | **COMPLETE** | cmdk palette + GO bar + function codes (33.8 KB `commanding.ts`, tested) |
| Keyboard shortcuts | **REGRESSED** | `shortcutStore` defaults define chords (`g h`, `g s`, `g p`, `g w`) but `useKeyboardShortcuts.ts` implements only single-key & `ctrl+key` — **most default shortcuts never fire**. A separate `KeyboardNavigationContext` handles ctrl+g/w/n/p/b + ctrl+Tab. Settings UI lists dead shortcuts |

### INTELLIGENCE
| Feature | Status | Evidence |
|---|---|---|
| AI assistant | **PARTIAL** | Real orchestrator + tool registry + SSE console + debate; LLM-optional w/ honest fallback |
| Market analysis | **PARTIAL** | WhyDidThisMove (OBSERVED/DERIVED/AI labeling — honest), regime/statlab |
| Chart context | **MISSING** | agent context = symbol+market+route only |
| Portfolio context | **MISSING** | not wired |
| Strategy/research context | **PARTIAL** | agent can invoke backtest tools, but no backtest-result context feeding |

---

## 5. Duplication & Conflict Register

1. **Five frontend data pipelines** (§3) — must be unified in Phase 1 behind one
   normalized market-state layer (protocol §13), wrapping — not deleting — the working
   backend hubs.
2. **Two chart cores** (`TradingChart` vs `ChartEngine`) + backtesting chart —
   consolidate in Phase 2 without dropping features.
3. **Two DOM/order-book clients** (`OrderBookPanel` WS vs `DOMLadder` REST polling).
4. **Three chart-data fetch paths** (`api/client.fetchChart` vs `chartDataService` vs `useBatchChartData`).
5. **Two heatmap implementations** (nivo vs recharts) — tracked in prior audit, both consumed.
6. **API layer split** — `api/client.ts` monolith vs 51 typed modules.
7. Root-level compat-shim packages (`core/`, `nlp/`, `cli/`, `db/`, `models/`) duplicating `backend/*` paths.

---

## 6. Regression Baseline (recorded before any changes)

Executed 2026-09-12 on `arena/01a096f2-traderos` @ `b5fc7bd` + node_modules install:

| Gate | Result |
|---|---|
| `tsc -b` (frontend) | ✅ CLEAN — 0 errors |
| `vitest run` (frontend) | ✅ 283/283 passed (90 files) |
| `vite build` (frontend) | ✅ green (main 665 KB / 179 KB gzip — heavy but builds) |
| `python -m compileall backend` | ✅ CLEAN |
| `pytest backend/tests` | ✅ 730/730 passed (5m04s, 20 warnings — statsmodels FutureWarnings) |
| Backend runtime launch | ✅ boots; lifespan OK; hub + paper engine + alert evaluator + schedulers start; Redis falls back to in-memory |
| Frontend dev server | ✅ serves (after sandbox-only `allowedHosts` infra fix, §9) |
| Auth E2E (live curl) | ✅ register → login → JWT → authenticated API calls |
| Playwright E2E (29 specs) | ⚠️ **CANNOT RUN in this sandbox** — browser download blocked (no outbound internet). Must be executed in a networked environment during relevant phases |

**Environment constraint (applies to every phase run here):** this sandbox has **no
outbound internet** — Yahoo/NSE/Finnhub/FMP/CoinGecko all unreachable. Live-provider
paths therefore return empty/failure here regardless of code health. Verification of
live paths must use the mock adapter / synthetic fixtures, or run where network exists.

### Pre-existing runtime defects (verified live, NOT introduced by this audit)
| # | Defect | Severity |
|---|---|---|
| B1 | `GET /api/chart/{ticker}` → **500 Internal Server Error** when provider unreachable (yfinance exception escapes unhandled) | High |
| B2 | `GET /api/charts/{symbol}/footprint` → **500** (same class) | High |
| B3 | `GET /api/quotes` offline returns `{"quotes":[]}` with **no `status:"unavailable"`** — and `priceStream.ts` then sets the badge to **"LIVE (polling)" with zero data** (its `status==="unavailable"` check never matches this shape) — misleading connection state | High |
| B4 | Volume-profile returns zero-volume bins instead of explicit UNAVAILABLE (silent emptiness) | Medium |
| B5 | Paper market orders sit `pending` forever offline with no surfaced reason | Medium |
| B6 | Synthetic order book labeled with real provider names (`provider_key:"kite"` on fabricated data) — protocol §31 violation | High (integrity) |
| B7 | Default keyboard shortcut chords (`g h` etc.) never fire (no chord handler) | Medium |
| B8 | `funding`/`OI`/`liquidations` fabricated from 24h stats and presented as derivatives data | High (integrity) |

---

## 7. What The Previous Agent Actually Built (verdict)

Re-verifying the prior `ARQOS_DIRECTIVE.md` A–H classification:
- Confirmed accurate: shell (A), command palette (A), symbol link groups (A), design
  system (A), watchlists (A), launchpad/saved views (A), bonds/commodities (A),
  alerts (A), screener/scanner engines (B), F&O chain (B, provider-gated), news (B).
- **Refuted / understated:** DOM & tape & footprint & crypto-derivatives are presented
  as provider-gated ("real when provider available") when they are in fact **unconditional
  synthetic fabrications** (classes D, not B/H). The directive's claim "renders only
  inside explicit SIMULATED/UNAVAILABLE badges; no fake LIVE" holds for quotes/status
  badges but **not** for DOM, tape, footprint, funding/OI/liquidations panels.
- No EdgeDepth code or references exist anywhere in the repo — nothing to preserve or
  un-do there; integration from scratch is a future-phase decision.

---

## 8. Product-Fidelity Assessment (protocol §45)

Does the current implementation move toward the TraderOS contract?

- Professional charting terminal — **YES** (real, deep; needs consolidation)
- Professional order-flow terminal — **NO** (mocked core: book, tape, footprint; missing CVD/TPO/heatmap/liquidations)
- Professional execution workstation — **PARTIAL** (honest paper engine; thin order entry; no risk-gated ticket)
- Research/backtesting environment — **YES** (beyond typical, honest engines)
- Portfolio/risk system — **YES-PARTIAL** (real analytics, manual holdings)
- Market-intelligence system — **YES-PARTIAL** (news/sentiment/alerts real, provider-gated)
- Unified workspace OS — **YES** (workspaces, palette, shortcuts[regressed], persistence)

**Strategic conclusion:** TraderOS = this codebase's research/workspace strength +
a rebuilt order-flow core + a unified market-data foundation. Nothing needs to be
thrown away; the order-flow domain must be made real, and the data layer unified.

---

## 9. Phase 0 Change Log (this audit only)

| File | Change | Nature |
|---|---|---|
| `frontend/vite.config.ts` | added `server.allowedHosts` (`.e2b.app`) | **Sandbox-infra only** — required for the preview proxy host; zero product impact |
| `frontend/package-lock.json` | regenerated by `npm install` | dependency install, no version changes |
| `docs/tradeos/PHASE0_FORENSIC_AUDIT.md` | this report | documentation |

No product code, no UI, no behavior modified. Both servers were left running for your
review (backend :8010, frontend preview :5173).

---

## 10. Decisions Needed From User (before/during Phase 1)

- **D1 — Product naming:** keep user-facing "ARQOS", or re-brand to "TraderOS" per this protocol? (Visual identity otherwise untouched.)
- **D2 — Phase-1 data scope:** the protocol's market-data foundation (Symbol/Quote/Trade/Candle/Book/Delta/Stats/Liquidation/OI/Funding/Session + unified event bus) is clear; confirm the **order-book/trade-tape real-source priority**: crypto (Binance public WS — real book+tape+liquidations, no API key) vs US equities (Finnhub/Alpaca — key-gated) vs India (Kite — key-gated). Recommendation: crypto as the first *real* order-flow source + clearly-labeled simulator for the rest.
- **D3 — Synthetic data policy:** current unlabeled synthetic DOM/tape/footprint/derivatives violate the protocol's labeling law. Phase 1 will introduce explicit `SIMULATED` provenance on every synthetic feed (smallest necessary visual change, per protocol §2 exception).

## 11. Recommended Phase 1 Scope (awaiting approval — not started)

Per protocol §13: normalized market-data foundation — typed market model, one
subscription/event-bus layer wrapping the existing hubs (MarketDataHub, USTickStream,
OrderBookService), provenance labeling (LIVE/SIMULATED/UNAVAILABLE) end-to-end,
reconnection + invalid-message + cleanup hardening, duplicate-subscription elimination,
regression tests — with B1/B3 fixed as part of error-path correctness. No UI redesign.

---

**PHASE 0 STATUS: COMPLETE — STOPPED. WAITING FOR USER APPROVAL BEFORE PHASE 1.**
