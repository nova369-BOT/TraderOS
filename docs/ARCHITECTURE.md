# LSE Terminal — Architecture (As-Built + Target)

**Product of London Strategic Edge** · v0.0.13 baseline · **Date:** 2026-09-15
**Part 1** documents what **exists** (from a full study of the checkout).
**Part 2** documents what **changes** under the plan. Invariants are flagged.

---

# PART 1 — AS BUILT

## 1. Runtime topology

```
 ELECTRON SHELL (desktop/main.js)
 │  single window, dark frame, disable-http-cache, window state,
 │  public | demo channel (separate title + config dir), dev override file
 │  ~/.lse-terminal-dev.json (run engine from source)
 │
 ▼  spawn sidecar on a free localhost port; wait /api/health; kill on quit
 SIDE CAR (PyInstaller frozen lset; source: `lset`)
 │  re-entries: -m pip (frozen ML installs), -c (CUDA probe),
 │  --run-script (strategy/model/ML scripts), --repl, --approve-bridge (MCP stdio)
 ▼
 FASTAPI + UVICORN  (loopback-only by default: 127.0.0.1, 7787 source / 7799 desktop)
 │
 ├─ static React SPA (bundled; Vite build; Tailwind + Radix + TanStack Query)
 │    vendored: lightweight-charts 4.2.0, xterm.js · compiled chart bundle
 │
 ├─ REST: 130+ endpoints, 12 domains (§5)
 ├─ WS:   8 channels (§6)
 │
 └─ SUBPROCESSES (local-only, `deny_hosted()`):
     • broker adapters          (brue-connect; spawned on connect; SPEC-7 reconcile)
     • algo live runner         (brue-connect/runner/live_driver.py; journal; killswitch)
     • ML job scripts           (--run-script; stream stdout over WS)
     • workspace PTY terminal   (pywinpty on Windows / stdlib pty on POSIX)
     • claude CLI (MCP)         (approve bridge = its permission-prompt-tool)

 EXTERNAL (network, all optional / fail-open):
   • api.londonstrategicedge.com — key gate, connection DIRECTORY (brokers & data
     sources, server-driven, 6 h refresh, cached, demo channel include_dev=1),
     sim account, update feed
   • LSE data vault (via lse-data client) — history + live stream, key-gated
   • user's broker — through the adapter only; credentials never leave the machine
```

## 2. Module map (Python, `lse_terminal/`)

| Module | LOC (approx) | Role |
|---|---|---|
| `engine/server.py` | 7,555 | The FastAPI app: all 12 API domains, 8 WS handlers, app state, static serving. **Monolith (G4).** |
| `engine/broker_hub.py` | 1,318 | Broker connections: brue-connect adapter protocol, directory fetch, arm/probe/connect/reconcile, `BrokerProvider` (broker as data source). "Nothing special-cases a broker." |
| `engine/quant_fit.py` | 1,520 | Interactive quant model fitting (research tab). |
| `engine/approve_bridge.py` | 420 | MCP stdio bridge: Claude CLI's headless approval UI → in-chat Allow/Deny cards. Pure stdlib; re-entered via sidecar in frozen builds. |
| `engine/workspace.py` | — | Strategy workspace files, first-run seeding (7 starter strategies). |
| `engine/registry.py` | — | Provider/engine registry + entry-point plugin discovery (broken plugins are reported, never fatal). |
| `engine/config.py` | — | `~/.config/lse-terminal/config.json` (chmod 600; can hold the API key), env-over-file. |
| `engine/webtools.py`, `notebooks.py`, `user_indicators.py`, `brue_indicators.py` | — | AI tools, notebooks canvas, user indicator CRUD + live preview, Brue indicator bridge. |
| `backtest/runner.py` | 907 | `PythonRunner`: executes plain-Python strategies with `df`/`params`/`data` in scope; reads `trades`/`plots`; sizing, commission, slippage, equity curve, stats. Honest fills: decision on bar i-1 → fill at bar i open. |
| `backtest/contract.py` | — | `BacktestEngine` ABC + `BacktestResult`/`Trade` types + **run pins** (`# run: SYM tf`, header-only scan, code hash invariant to the pin). |
| `backtest/research.py`, `starters.py` | — | Walk-forward/Monte Carlo/stats; 7 seeded starter strategies. |
| `providers/` | — | `demo.py` deterministic synthetic (6 symbols, ≥6000 bars, live tick stream; the compliance/test source) · `lse.py` hosted vault via lse-data (lazy client, key verification before persistence, sync→async stream bridge) · `userdata.py` user imports + folders · `spread.py` quote synthesizer · `decoders.py`. |
| `contracts/` | — | The extension surface: `Provider` (search+candles mandatory; quote/stream/configured/capabilities optional; `NotSupported` degrades gracefully) · `@indicator` (registry, auto-generated param forms, strict validation, overlay/pane + style hints) · `CANDLE_COLUMNS` · `Instrument`/`Quote`. |
| `indicators/` | 116 files | ~115 shipped indicators (pure functions over the candle DataFrame) + `brue/` subpack. |
| `ml/` | 27 files | Catalog (715), runner + job manager (streaming WS), blueprint, env probe (CUDA), `scripts/` = one-click-installable model scripts (GARCH, Kalman/HMM, LSTM, ARIMA, Transformer, XGBoost, RF, CNN, GAN, autoencoder, sentiment, PCA, Monte-Carlo). |
| `samples/` | — | 10 bundled parquet datasets (work with no key, no network). |
| `cli.py` | 266 | `lset` entry: argparse, frozen-build re-entries (pip `--target` user-packages dir, `--only-binary`, distlib fix), UTF-8 stream fix, browser open. |

## 3. Frontend (React 18 / Vite 5 / TS 5.5 strict / Tailwind 3 / Radix / TanStack Query)

~88k LOC. Page roots in `mount.tsx` (the SPA shell is a shell-in-React: the outer
terminal frame lives in the static app; chart/feature islands render into it via
`window.__lseShell` hooks).

| Area | Files | Notes |
|---|---|---|
| Chart | `ProChart.tsx` (9,774), `BTChart.tsx` (8,562), `ChartDrawingOverlay.tsx` (5,131), renderers (crosshair, subplot), `RightToolbar`, `IndicatorSelector/Settings`, `BTCandlestickChart` | 33 drawing tools, up-to-8-pane layouts with sync, templates, chart layout panel, live bid/ask + position lines, level-3 ladder (plan-gated). **Monolith files (G5).** |
| Pages | `Backtesting`, `DataViz`, `EconomicCalendar`, `ModelLab`, `Notebooks`, `QuantModels` | + MY DATA library + in-app walkthrough (guide.md). |
| Visualizations | 23 components (HMM, LSTM, GARCH, XGBoost, attention heatmap, Monte-Carlo 2D, diffusion, Gaussian process, three.js globe news wall, echarts suites, KaTeX) | ML lab + econ + research rendering. |
| lib/hooks/contexts | ~50 files | API client, indicator parity (`lib/indicators.ts` mirrors engine maths, verified against `tests/gen_ts_truth.mjs` truth), chart utils. |

## 4. Extension contracts (the platform's real architecture)

Four first-class extension points, all entry-point or file-based, all fail-safe:

1. **`Provider`** — pip package, entry point group `lse_terminal.providers`.
   `search` + `candles` mandatory; everything else optional behind `NotSupported`.
   Presentation contract: `category`/`name` arrive display-ready; the UI renders
   whatever arrives with **no source-specific rules** (the "translator layer").
   `deterministic` flag enables compliance determinism checks.
2. **`@indicator`** — decorator; `params` become the settings form; returns
   Series (one line) or DataFrame (per-column lines, style hints, overlay vs pane).
   Group `lse_terminal.indicators`; user indicators are workspace files with live preview.
3. **`BacktestEngine`** — script + candles → typed result; one engine (`PythonRunner`);
   plain Python is the language (no framework; `brue` removed as a strategy language —
   it is an execution language now).
4. **Broker adapters** — brue-connect adapter commands over a connector protocol;
   which brokers exist is **decided by the LSE directory API at runtime**, cached,
   fail-open; SPEC-section-7 reconciliation after connect; the bundled fake broker
   (NovaFX) exists so the generic path is never special-cased.

## 5. REST API surface (12 domains)

| Domain | Endpoints (abridged) |
|---|---|
| Core | `health`, `providers`, `directory`, `instruments`, `indicators`, `prices`, `candles` (with indicator computation), `logos`, `config` |
| Markets | `screener`, `options/underlyings\|chain\|flow`, `mbo/status\|events` |
| Econ | `economic-calendar`, `macro/catalog\|series`, `news/feed`, `research/feed\|pdf` |
| Backtest | `backtest`, `backtest/engines`, `backtest/template`, `backtest/montecarlo`, `backtest/walkforward` |
| ML | `ml/models\|env\|train\|blueprint\|run-code\|datasets\|build-dataset\|jobs(+cancel/stream)` |
| AI | `ai/workspace\|strategy\|instructions\|settings\|key\|status\|logout\|revert\|paste-image\|tool-run\|tools\|approve-request\|chats(CRUD)\|install(login WS)` |
| MCP | `/mcp` (server + client discovery) |
| Data | `data (preview/import/upload/formats/location/open-location/folders/symbol CRUD/rows)`, `lse/databank(+import jobs)`, `dataviz/parse` |
| Workspace | `workspace`, `notebooks(CRUD+assets)`, `quant/fit-info\|add-sample\|fit`, `user-indicators(CRUD+preview+template)`, `ws-files(CRUD)`, `term/pty (WS)` |
| Broker | `broker/list\|arm\|probe\|connect\|disconnect\|credentials\|account(auth-open) \|catalog\|positions\|subscribe\|quotes\|order(+pending/cancel/modify)\|orders\|close\|fills` |
| Sim | `sim/accounts\|positions\|orders(+cancel/modify)\|fills\|close` (the LSE demo/paper account) |
| Algo | `algo/runs\|start\|stop\|killswitch\|journal` (live strategy subprocess) |

## 6. WebSocket channels (8)

`/api/ws` (market ticks: provider + symbols, `tick`/`error` frames) · `ai/chat` ·
`ai/pty` (assistant terminal) · `ai/install`, `ai/login` (CLI setup flows) ·
`ml/jobs/{id}/stream` (training output) · `ml/install` (one-click env setup) ·
`term/pty` (workspace terminal).

## 7. State & data model

**File-based state, no database in v1** (as observed in this checkout):
`~/.config/lse-terminal/` → `config.json` (0600; API key), workspace (strategy files),
imports, user indicators, notebooks, assistant chats, algo journals, `python-packages/`
(runtime ML installs — outside the frozen bundle so updates don't wipe them), directory
cache. Demo channel: separate root (`lse-terminal-demo/`). Bundled: 10 sample parquets,
news files, guide.md.

## 8. Security model (as built)

- **Loopback-only engine** by default (the key travels only to `127.0.0.1`).
- API key stored 0600; verified against the live gate **before** persistence
  (offline ≠ rejected — a plane must not lose the key entry screen).
- **`deny_hosted()`** guards every process-spawning surface (PTY, algo, ML, file ops
  from the assistant): local mode only.
- **Arm → probe → connect → reconcile** before a broker can trade; credentials in the
  local config; broker logins never leave the machine.
- **Approval bridge**: AI actions outside the workspace allowlist surface as in-chat
  Allow/Deny cards; the bridge is pure-stdlib MCP over stdio, spawned by the agent CLI.
- **Killswitch + journal + deterministic order ids** on the algo runner (stop/start/crash
  cannot double-send).
- Desktop: signed + notarized (mac), Azure Artifact Signing (win); two channels
  (public/demo) with fully separate config roots.

## 9. Distribution & release

- Release workflow (`release.yml`, tag `v*`): builds mac + win on GitHub runners with
  the `brue` + `brue-connect` checkouts; signing secrets are repo-scoped; artifacts to
  GitHub Release. The app self-updates (hourly + on start, background download, install
  on next launch).
- Source: `lset` (browser mode, port 7787); desktop sidecar (port 7799).
- **Known drift (G3):** in-repo version strings (0.0.1) lag release tags (0.0.13).

---

# PART 2 — TARGET (what the plan changes)

## 10. Invariants (non-negotiable by feature work)

1. Local-first: user data, strategies, keys stay on the machine; engine loopback-only.
2. Fail-open: no network ⇒ cached directory, samples, imports, research all still work.
3. Extension contracts (§4) keep their shapes; new capabilities go through them.
4. Plain Python remains the strategy language; nothing in the broker path special-cases a broker.
5. Paper/live parity: sim and real adapters are the same code path end to end.
6. Reproducibility: run pins + deterministic demo = the compliance foundation.

## 11. Changes by milestone (see PLAN.md §5)

| Milestone | Architectural changes |
|---|---|
| M1 | **No runtime changes**: CI pipeline, brue-connect wheel/dep boundary, version stamping, dependency matrix, contributor docs. (E2 is the only dependency-graph change.) |
| M2 | New `risk/` layer inside the engine: pre-broker risk checks (caps, drawdown stop, rate limits) applied in the **terminal's order path** (sim + broker); risk panel + audit UI; parity test harness (same scenario → sim vs adapter → identical accounting). Killswitch semantics extended to the terminal-level stop. |
| M3 | Strategy bundles: a new artifact format (code + pin + params + dataset refs + tested-run signature) stored in the workspace and served by the LSE API (new `/strategies` surface on `api.londonstrategicedge.com`); library UI; import/share flow. Reuses the run-pin hash for identity. |
| M4 | Autonomy levels + audit trail on the AI surface (extend `approve-request` semantics into levels; persist decisions); eval runner for assistant tools in CI; ML model registry (workspace + `ml/` catalog extension); model→bundle pipeline endpoint. |
| M5 | Cloud layer on the **existing** LSE API: accounts (key → email identity), web-light read-only research reader (same API, thinner client — no re-architecture of the terminal), team/subscription foundations. Hosted-terminal ambition: explicit go/no-go at the M5 gate. |

## 12. Tech-debt trajectory (from the gap register)

- `server.py` → per-domain route modules around shared app state (E4, incremental, suite-gated).
- `ProChart`/`BTChart` → composable chart core + feature modules (E5, typecheck+checklist-gated).
- `on_event` → FastAPI lifespan (fold into first E4 touch of each module).
- `archive/` references → reconciled with reality (E10 pass).
- No new debt enters without a gap ID in PLAN.md §2.5.

## 13. What deliberately does NOT change

- The local-first runtime topology (shell ↔ sidecar ↔ loopback engine).
- The provider/indicator/engine/broker extension model.
- The plain-Python strategy contract and its honest fill semantics.
- The deterministic demo provider's dual role (offline life + compliance source).
- The public/demo channel split and the signed-release pipeline.
