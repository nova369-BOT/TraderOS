# EdgeDepth Integration — Phase 0: Repository Audit & Baseline

Date: 2026-09-18 · Branch: `arena/01a0b513-traderos` · Baseline commit:
`2e6482e` ("Binance cold switch: watchlist = one ticker download, chart
never queues behind it"). Working tree clean at start.

This document is the master prompt's required first-step deliverable: a real
architecture map of BOTH repositories, built from reading the actual source
(not READMEs), plus the recorded pre-integration baseline.

---

## 1. Environment capabilities (measured, not assumed)

| Capability | Status |
|---|---|
| git/github.com (clone, ls-remote, codeload tarballs) | ✅ reachable |
| pypi.org / registry.npmjs.org | ✅ reachable |
| go.dev, dl.google.com, golang.org, proxy.golang.org, deb.debian.org, conda | ❌ egress-blocked |
| **Binance** (fapi.binance.com, fstream) | ❌ egress-blocked |
| **Coinbase** (api.coinbase.com) | ❌ egress-blocked |
| Go toolchain | none preinstalled → **bootstrapped from GitHub source** (go1.4→1.17→1.20→1.22→1.24.13) |
| protoc | not installed (gateway ships generated `pkg/pb/edgedepth.pb.go`, so not needed) |
| docker/podman | absent |

**Consequence for the master prompt's §43 real-data E2E:** real Binance/
Coinbase cannot be reached from this sandbox. The integration chain is
therefore proven against a local protocol-faithful fake Binance through the
gateway's own `-binance-rest` / `-binance-ws` overrides (the flags upstream
ships for mirrors/testnet). Exactly what remains for a real-network re-run is
listed in `99-real-network-checklist.md`.

## 2. TraderOS / LSE Terminal — architecture map (as built)

Top level: Python FastAPI engine (`lse_terminal/`), React/Vite frontend
(`frontend/src` = main terminal, `frontend/workspace` = new /w/ orderflow
workspace), Electron desktop shell, docs, tests.

- **Entry points**: `lset` CLI (`cli.py`, browser mode :7787) · desktop
  sidecar (:7799) · `uvicorn --factory lse_terminal.engine.server:create_app`
  (Docker/Render, render.yaml single-service web).
- **Backend**: `engine/server.py` (~7.9k lines; REST 130+ endpoints, 8 WS
  channels), `engine/broker_hub.py`, `engine/registry.py` (provider/engine
  registry + entry-point discovery), `engine/orderflow/` (F1 order-flow core:
  `book.py` persistent L2 DepthBook · `grid.py` time×price DepthGrid ·
  `normalize.py` colour LUTs · `service.py` capability-based source
  resolution + 15 Hz coalescing · `session.py` parquet SessionRecorder).
- **Market-data abstractions**: `contracts/provider.py` (`Provider` ABC:
  `search`+`candles` mandatory; `quote`, `stream`, `depth_history`,
  `depth_stream`, `configured`, `capabilities` optional via NotSupported) ·
  `contracts/types.py` (`Instrument`, `Quote`, `DepthEvent`(SNAPSHOT/DELTA),
  `TradeEvent`(BUY/SELL/INFERRED), `CANDLE_COLUMNS`).
- **Providers registered** (`engine/registry.py:load_builtins`): `userdata`,
  `demo` (deterministic synthetic, the compliance source), `lse` (hosted
  vault), `mbo` (vault L3, plan-gated), `cryptol2` (**Coinbase primary +
  Kraken fallback via ccxt.pro**, keyless public L2, depth-only),
  `edgedepth` (gateway client/provider, this integration), `binance`
  (**`binance_perp.py` — a Python port of the gateway's Binance adapter**,
  merged 2026-09-18 as the zero-config spine per docs/F1-order-flow/05).
- **Orderflow API surface** (server.py): `/api/orderflow/depth`,
  `/api/orderflow/book`, `/api/orderflow/ws` (coalesced live), record
  start/stop, sessions list/events/delete; `/api/mbo/*`. e2e:
  `tools/depth_e2e.py` boots the real engine and walks the whole surface.
- **Frontend**: main app pages + chart stack (`ProChart.tsx`, `BTChart.tsx`),
  existing Depth Heat at `src/components/chart/depth/*`; the /w/ workspace app
  (`workspace/main.tsx`, `grid/` snap-canvas grid, `panes/chart/*` candle +
  footprint pane) — grid + candle/footprint panes shipped (F2 phases 1–2),
  RT heat/DOM/tape panes planned (phases 3+), not built yet.
- **Persistence**: file-based under `~/.config/lse-terminal/` (no DB).
- **Tests**: `tests/` — orderflow, edgedepth wire/client, cryptol2, mbo,
  binance_perp (state-machine pinning), depth heat, API, runner; pure-TS
  chart gates via esbuild.

## 3. EdgeDepth Gateway — architecture map (upstream @ `b822284`, from source)

MIT-licensed Go module (`go 1.24`; deps: `gorilla/websocket v1.5.3`,
`google.golang.org/protobuf v1.36.11`).

```text
cmd/edgedepth-gateway/main.go
  flags: -addr(:8080) -path(/ws) -log -trade-stream(aggTrade)
         -binance-rest -binance-ws           <- mirror/testnet overrides
  serves: <path> WebSocket (hub.ServeWS) + /healthz ("ok")
  venues registered: binance.New  (hub keeps a per-venue registry)

internal/exchange/exchange.go   venue seam: Exchange, Feed(Snapshot,
  MarkState), Runner, Emit, TradeContinuity, ErrUnsupported, GlobalSymbol
internal/hub/                   WS clients (budget-capped queues), subscribe/
  unsubscribe JSON control plane, feed refcounting (<=16 symbols), candle
  series (1s..1d) built trade-by-trade, 100ms flush loop, volume history
  (bound: 60min/50k cells), stats aggregation
internal/wire/wire.go           one binary frame = one WSPayload; no prefix;
  JSON TEXT control frames keyed on "method"
internal/binance/               THE reference venue:
  stream.go   combined-stream WS (/market vs /public routing), jittered
              backoff, ping/pong, onReset hooks
  feed.go     orderbook sync state machine: buffer<=5000 diffs until REST
              snapshot; first diff must straddle lastUpdateId; afterwards
              pu==prev.u; collapsed resync <=1/s; size-0 deletes level;
              trades: id-dedupe, gap->volume reset, m-is-buyer-maker => SELL;
              mark/funding WS + 30s REST poll (premiumIndex, openInterest);
              liquidations via @forceOrder
  rest.go     /fapi/v1/depth, klines(1m..1w), premiumIndex, openInterest,
              ticker/24hr, exchangeInfo
  ticker.go   !ticker@arr with REST fallback after 30s silence
internal/candle/agg.go          trade->candle/stats buckets
internal/volume/history.go      minute trade-volume cells for footprint/profile
proto/edgedepth.proto + pkg/pb/edgedepth.pb.go   THE wire contract
  Streams: 1 trades, 2 candles, 3 orderbook, 4 stats, 5 liquidations,
           8 historical candles, 17 tick-volume, 26 volume profile, 29 ticker24h
  Messages: WSPayload(Pair,stream,tf,data,event_ms), Trade, Candle(s), Stat(s),
            Liquidation, BookUpdate(first/last/previous ids), TickVolume*,
            Ticker24h*, VolumeProfile*
tests:_live_test.go files are opt-in (EDGEDEPTH_LIVE=1) and need real Binance.
```

## 4. The duplication finding (STOP condition, handled openly)

Two Binance order-flow engines coexist in this repo TODAY:

1. `providers/binance_perp.py` — Python port of the gateway adapter (merged
   2026-09-18, `docs/F1-order-flow/05-orderflow-workspace-plan.md` Phase 0:
   "per your direction ... 1:1 Python port"), wired as the Render spine.
2. `providers/edgedepth/` — Python client for the ACTUAL Go gateway, with
   only LICENSE+proto previously vendored (no Go source).

Master prompt rule: the Go gateway is authoritative; no duplicate engines;
also: do not break working deploys. **Resolution applied:** the Go gateway is
the integration-authoritative Binance implementation going forward (this
repo now vendors it in full + manages its lifecycle); `binance_perp.py`
stays registered as the labelled zero-config path until the deploy milestone
puts the gateway binary into the served image, so nothing working is
deleted. Tracked in `02-decisions.md`.

## 5. Baseline results (pre-integration, recorded)

| Check | Command | Result |
|---|---|---|
| Backend suite | `pytest tests/ -q` (py3.11, fresh venv) | **235 passed, 1 skipped**, 308 s |
| Frontend typecheck | `cd frontend && npm run typecheck` | **5 PRE-EXISTING errors** (see below) |
| Frontend main build | `npm run build` (vite) | OK (chart.js 4.43 MB / gzip 1.29 MB) |
| Workspace build | `npm run build:workspace` | OK (workspace.js 165 kB / gzip 54.5 kB) |
| Gateway `go build` / `go test` / `go vet` | see `01-gateway-proof.md` | ✅ after toolchain bootstrap |

Pre-existing TypeScript errors (NOT caused by this integration; recorded so
they are never blamed on it):

1. `src/components/chart/RightToolbar.tsx(695,66)` TS2339 `prob_above` on `any[]`
2. `src/components/chart/RightToolbar.tsx(704,52)` TS2339 `fetch_timestamp` on `any[]`
3. `src/components/chart/hooks/useCandleFetch.ts(326,5)` TS2353 `select` not in query type
4. `src/components/chart/interaction/useChartNavigation.ts(103,44)` TS2503 `NodeJS` namespace
5. `src/hooks/useLiveCandleFromTicks.ts(153,37)` TS2503 `NodeJS` namespace

Gateway-independent pre-existing risks: vendored proto drift (guarded by the
parity test added in Phase 1), Render single-service assumption (see §4).
