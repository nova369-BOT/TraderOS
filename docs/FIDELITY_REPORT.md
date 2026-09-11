# TraderOS Fidelity Report — post-build audit + remediation

Date: 2026-09-11 · Branch: `arena/01a0911a-traderos` · Auditor: Arena Agent Mode
Scope: full repository (9.2k LOC src, 41 files), traced imports → state → services → UI.
Design: approved and frozen — all fixes are implementation-only.

> Verdict: TraderOS is a **real terminal application running on an explicitly
> simulated market-data feed and paper broker** — not a visual shell. Every
> primary workflow (chart → analyze → scan → ticket → position → portfolio →
> strategy → backtest → compare) executes against genuine state machines.
> Simulation boundaries are now labeled in-product (`PAPER · SIM FEED`,
> `TERMINAL · PAPER`, `SIM` connection state, `simulated` news/calendar tags,
> Settings disclosures). Gaps below are honest missing modules, not fakery.

## A. Fully implemented ✅ (31)

Real component + state + data + interaction, verified by code trace and/or
headless suite (`npm run smoke`, 187 assertions):

- Charting: 6 chart types (candles/bars/line/area/hollow/heikin), 9 chart
  indicators, volume + RSI/MACD subpanes, position & alert price lines, OHLC
  legend, crosshair, drawings (trend-ray/hline/rect/fib, eraser, colors,
  per-symbol persistence), live bar update with rollover append for every
  series (fixed this audit).
- Market data pipeline: single `MarketEngine` tick clock → `useMarketStore`
  mirror → all consumers; quotes/book/tape/footprint/heatmap all derived
  per-tick; one symbol source of truth (`useWorkspaceStore.symbol`).
- Order flow: DOM ladder with click-to-join-bid/offer (real orders), imbalance,
  spread, recenter; tape with pause/filters/virtualization; canvas heatmap and
  footprint with imbalance/POC/delta; flow metrics (delta, cumΔ, buy%, walls).
- Trading: paper broker state machine — MKT/LMT/STP/STP-LMT, GTC/DAY/IOC/FOK
  (DAY expiry fixed this audit), brackets + OCO, reduce-only, modify/cancel,
  fees, margin/leverage, avg-entry/mark/uPnL/realized; ticket with ATR brackets,
  risk panel (max loss, risk%, R-multiple), review modal with paper disclaimer;
  terminal (positions/orders/history/fills/log), portfolio KPIs/allocation/risk
  monitor; broker persistence + account reset (added this audit).
- Scanner: 8 computed fields, AND filters, 6 presets, live/pausable re-scan
  (pause fixed this audit), chart/trade/watchlist actions.
- Research: rule builder (17 sources, 6 ops, AND groups, risk editor, compiled
  summary), strategy CRUD/duplicate (persisted this audit), backtest engine
  (next-bar-open entries, conservative intrabar stops, ATR/%/time exits, 3
  sizing modes, commission+slippage, full metrics incl. Sharpe/Sortino/Calmar/
  MAE/MFE/monthly/exposure), trade list, 4-run comparison.
- Platform: presets (save/apply/delete, persisted), single Panel system
  (collapse/maximize/tabs), SplitPane + zero-layout edge handles, command
  palette, shortcuts, watchlists (CRUD/reorder/columns, persisted), alerts
  (create/trigger/banner, persisted this audit), density setting (implemented
  this audit), root error boundary (added this audit).
- Honesty: no `as any`/`@ts-ignore`/TODO; `tsc` clean incl.
  `noUnusedLocals/Parameters`; no secrets/env/unsafe HTML.

## B. Partially implemented 🟡 (12)

| Feature | State | Evidence / note |
|---|---|---|
| Quotes/candles | Real pipeline, simulated source | `marketEngine` (seeded); disclosed as SIM |
| Timeframes (11) | All work; independently simulated, not aggregated | per-TF random walk; 1m ≠ 1s aggregation |
| Chart indicator params | Fixed (9/21/50/200/14/20) | no param editor; ATR/Stoch/ADX/OBV in lib but not chartable |
| Drawings | 4 tools + persist | no vline/channels/text/measure/drag-edit |
| DOM | Real sim book + click-trade | no price grouping, cum column, working-order markers |
| Heatmap/footprint | Real canvas, live | no zoom/scroll/time axis |
| Sentiment | Honest derivation of mock bias tags | template-driven, labeled via wire |
| Backtest config | Bars-window only | no calendar date range |
| Presets | view/symbol/tf/panels | no rename/duplicate, no per-preset indicators |
| Failure states | empty/error/loading covered | offline N/A (no network); boundary added |
| Desk AI | Rule-based, real context, disclosed | not an LLM; no API; deterministic modules |

## C. Mock / simulated 🟠 (2)

- **Terminal wire news**: template-generated headlines about real symbols,
  seeded hourly. Now tagged `simulated` (Intel, Markets, right panel).
- **Economic calendar**: static hardcoded events/values on relative dates.
  Now tagged `simulated` (Intel, Markets).

## D. UI-only (0)

None found. Every visible control traces to state or a service. (Pre-audit
dead control — density setting — was implemented; see §F.)

## E. Missing 🔴 (12)

Genuinely absent, **not claimed** anywhere in the UI (verified by grep):

Replay · multi-chart grid + independent chart config · Renko · volume
profile/VPVR · TPO/market profile · CVD series · liquidations · open
interest · funding rates · trailing stops · multi-account/account switching ·
optimization sweeps / walk-forward / Monte Carlo · exchange/broker
abstraction (single sim engine; replacement boundary documented in Settings
and service headers).

## F. Broken — found and fixed ⚠️→✅ (13)

| # | Problem | Fix |
|---|---|---|
| 1 | Candle cache never rolled; forming bar absorbed whole session | `rollCache()`: completes bars, backfills gaps, accumulates volume |
| 2 | Chart never rendered rolled bars; overlays lagged forever | tick effect appends main+vol+all overlays via `update()` |
| 3 | Hollow forming bar ignored hollow mapping | mapping applied in live update |
| 4 | Position marks/uPnL froze up to 20s | broker emits (re-marked) every tick |
| 5 | Scanner pause didn't pause | frozen-rows gate |
| 6 | DAY orders behaved as GTC | UTC-day-rollover expiry |
| 7 | `TRAIL` in type union, zero logic/UI | removed from `OrderType` |
| 8 | Density setting did nothing | `[data-density]` CSS + root attr |
| 9 | "Volume vs avg20" stat was meaningless | replaced with honest avg-bar-volume |
| 10 | Fabricated BTC dominance + hardcoded "US · Open" | real VIX quote + UTC session clock (`currentSession`) |
| 11 | Desk AI promised entry/stop sizing it can't do | copy points at ticket risk panel |
| 12 | TopBar claimed "LIVE feed connected" | `SIM` + "Simulated feed · streaming" |
| 13 | Broker/strategies/alerts/favorites lost on reload | throttled broker persistence, research persist, market persist, `resetAccount()` |

Also removed: dead `debounce`/`clamp`, unrendered `FlowLegend`, backtest dead
fee lines. Settings reset now clears persisted broker state.

## G. Regressions

None possible: git history is `Initial commit (README only)` → `Rebuild` →
`stabilization` → this audit. No prior implementation existed to regress from.

## H. Architectural risks (remaining)

1. Single global symbol/timeframe: correct for sync, but multi-chart and
   per-panel symbol scoping need a chart-instance model (§E).
2. Quote fan-out: whole `quotes` object rebuilt each 800ms tick; every
   subscriber re-renders. Fine at 41 symbols; revisit past ~500.
3. Backtests run on simulated candles: engine is real, edge statistics are
   illustrative only. Documented here; UI makes no live-data claim.

## I. Performance risks

None material. Verified: no per-tick series rebuilds, memoized scan/brief/
footprint paths, virtualized tape, bounded broker arrays (600/400), canvas
heatmaps redrawn per tick at trivial cost, throttled persistence (5s).

## J. Security / data risks

None found. No env vars, secrets, auth tokens, cookies, unsafe HTML, or
external calls except Google Fonts (graceful fallback offline). All
persistence is local-only `traderos-*` keys with corrupt-state fallbacks.

## Acceptance statement

The UI, architecture, data flow, interaction model, and underlying systems
collectively represent the intended TraderOS terminal — a professional
charting, order-flow, paper-trading, scanning, strategy-research, backtesting
and desk-AI terminal — with simulation boundaries explicitly labeled and all
audited workflows genuinely functional. Missing modules (§E) are declared,
not disguised.
