# PHASE A — REPOSITORY AUDIT (2026-09-21)

Method: read `index.html` (1,285 lines, every section), `app.js`
(17.6k lines: rail handlers, SUBRAIL, page openers, ticket, widgets),
`style.css`, `chart/` bundle, `w/` workspace bundle, `frontend/` React
islands, `lse_terminal/engine/server.py` + modules, and the endpoint
surface actually called by the UI. Nothing below is inferred from names.

## 1. Folder map
- `lse_terminal/engine/` — FastAPI server (server.py:602) + broker_hub,
  orderflow/, notebooks.py, workspace.py, quant_fit.py, user_indicators.py
- `lse_terminal/backtest|providers|indicators|ml|contracts|samples/`
- `lse_terminal/ui/static/` — shell: index.html, app.js, style.css,
  chart/ (ported chart engine + lightweight-charts 4.2), w/ (workspace
  bundle), vendor/ (xterm), assets/globe
- `frontend/src|workspace/` — React islands (econ calendar, dataviz,
  notebooks, quant models) built by vite/tailwind
- `desktop/` packaging, `tests/` (219 passed / 1 skipped baseline)

## 2. Current UI architecture
Single-page shell: header (topline tabs + subrail + chart toolbar),
main = left #side (watchlist/library) + center sections + right #ai-rail
(assistant + trade ticket + widget stack), footer statusbar. Sections
swap by hide-everything sweep; sub-views per SUBRAIL. Floating panels:
indicators, panes, source, templates, editors, modals (all fixed).

## 3. Feature map (real, code-verified)
MARKET: Price&Charts (candles/bars/line/area; TFs; indicators registry +
Python/Brue custom with live preview; multi-pane grids; Depth Heat +
footprint; fused L2 COB; T&S drawer; L3/MBO when plan allows; templates;
saved layouts; source switch LSE/Binance/Coinbase), Options (chain,
Greeks, expiry/strike windows, flow tape, IV smile/term structure/
volume-by-strike/payoff), News (globe wire + LSE newsroom + reader),
Screener (4.2k instruments, 6 column presets, virtualized, profile
card), Watchlist (groups, stars, live flash), paper sim ticket +
account dock (positions/orders/history), broker hub (real brokers).
BACKTEST: Algo Development (VS Code-style IDE, python engine, Monte
Carlo, walk-forward, risk stats, plots, PTY terminals, live-paper via
Brue), Machine Learning (21-model catalog, blueprint editor, dataset
builder, GPU/CPU logs, recent runs), Manual bar-replay with SL/TP.
WORKSPACE: IDE (library tree, tabs, highlight editor, RUN, terminal),
Data Visualisation island, Notebooks canvas, indicator editor.
ECONOMIC: Calendar (actual vs consensus + history charts), Indicators
(macro catalog by country/category), Bond Yields (curve + tenor views),
Central Banks (policy rates, balance sheets, schedules), macro News.
RESEARCH: Articles (arXiv q-fin + NBER/BIS/Fed/ECB, filters, search,
in-terminal PDF reader, Ask AI), Quant Models interactive island.
GLOBAL: MY DATA imports (csv/parquet/xlsx/json), LSE databank import,
connection hub, AI assistant rail (hosted Veron + local agent CLIs,
tools strip, autonomy levels), saved shell/workspace layouts, update
flow, theme + density persistence, TERMINAL WALKTHROUGH (guide.md).

## 4. Data dependencies
- Streaming: `/api/ws` ticks (LSE key plan; extras binance/coinbase),
  ws per orderflow/L3, `/api/ws-files`.
- Polling/cached: screener snapshot (ETag), economic calendar, research
  feed (server-refreshed), news feed, sim account, algo runs, ml jobs.
- Historical: `/api/candles`, databank parquet imports, user imports.
- Gated by plan/key: options, MBO/L3, screener depth columns; hosted
  mode hides MY DATA/walkthrough rules; brokers need user credentials.

## 5. Limitations (honest)
- No real-money in-terminal execution beyond connected brokers' own
  order routes + paper sim. News/sources need a connection; empty
  states say so. Some engine versions lack plots/MBO (UI degrades with
  reasons, never fake data). No global command palette yet (PROPOSED
  FUTURE CAPABILITY). No detachable OS-level windows (in-shell docking
  only).
