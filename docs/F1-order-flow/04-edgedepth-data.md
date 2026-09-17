# E0 — EdgeDepth Data Feed (real depth for Depth Heat)

Status: **planned, E1 in progress** · Owner decision: user, 2026-09-17
Repos (studied from source, 2026-09-17):
- `github.com/edgedepthhq/edgedepth-gateway` — **MIT**. Go binary bridging
  Binance USD-M futures public streams into the EdgeDepth wire format
  (protobuf over WebSocket, one binary frame per `WSPayload`). No API key.
- `github.com/edgedepthhq/edgedepth-terminal` — **AGPL-3.0**. C++20→WASM UI.

## 1. Decision (locked)

- **Gateway = our data feed.** Real Binance L2 depth, trades and candles,
  free, keyless. Depth Heat finally renders *real* order-flow — the visual
  complaints about "fake-looking stripes" were 50% paint, 50% synthetic data;
  this removes the data half.
- **Terminal = reference only.** Zero AGPL code enters TraderOS. We keep our
  frontend and use their screenshots as the visual benchmark (03-rebuild gates).
- **TraderOS stays TraderOS.** The engine gains an `edgedepth` provider that
  speaks the gateway protocol; nothing else about the product changes.
- **Coexists with the ccxt crypto feed** (`crypto_l2.py`, Coinbase/Kraken
  spot L2, already in-tree). Binance USD-M futures via the gateway adds
  sequence-checked book, liquidations and futures-native symbols; the rail
  offers both, labelled by venue.

## 2. Architecture

```
Binance public streams ─► edgedepth-gateway (Go) ─► protobuf/WS ─►
  TraderOS engine (Python) ─► DepthBook/DepthGrid ─► /api/depth ─► Depth Heat
```

Wire contract (from `gateway/internal/wire` + `proto/edgedepth.proto`, vendored
at `third_party/edgedepth-gateway/`):
- Data: one binary WS frame = protobuf `WSPayload{pair, stream, timeframe,
  data, event_time_ms}`. No length prefix. Plain protobuf (zstd sniffed but
  the gateway emits uncompressed; only `TickVolumeUpdate.levels_data` is zstd).
- Control: JSON TEXT frames `{"method":"subscribe"|"unsubscribe","data":
  {"pair":{"exchange","symbol"},"stream":N,"timeframe":T,...}}`.
- Streams we use: ORDERBOOK=3 (snapshot+diff `BookUpdate`, sequence-checked
  via first/last/previous update ids), TRADES=1, HISTORICAL_CANDLES=8,
  CANDLES=2, TICKER24H=29.
- Gateway flags: `-addr`/`EDGEDEPTH_ADDR` (default :8080), `-path`/`EDGEDEPTH_PATH`
  (default /ws), Binance REST/WS overrides for mirrors.

## 3. Where the gateway runs

| Environment | How |
|---|---|
| Render (production) | **Second service** in the blueprint, native Go runtime (`go build ./cmd/edgedepth-gateway`, CMD honours `$PORT`). TraderOS talks to `wss://<name>.onrender.com/ws` via env `EDGEDEPTH_GATEWAY_URL`. |
| Sandbox (this agent) | Cannot run: Go toolchain + Google CDN + Go module proxy are all unreachable here. The Python client is therefore tested against a **deterministic fake gateway** (fixture frames, golden tests). |
| User's Windows box (optional) | `docker compose up` in the gateway repo, then set `EDGEDEPTH_GATEWAY_URL=ws://localhost:8080/ws`. |

## 4. Phases and gates

Each gate lands green or not at all; suite + golden tests stay green; one
commit per gate.

- **E1 · Wire codec (sandbox).** Pure-Python proto3 reader/writer for the
  vendored contract (zero new runtime deps), message parsers for WSPayload /
  BookUpdate / Trade / Candle(s) / Ticker24h. Hand-computed byte-fixture
  round-trip tests. *Gate: tests green, no dep changes.*
- **E2 · Client + provider.** `lse_terminal/providers/edgedepth.py`:
  async WS client, subscribe, sequence-checked book maintenance reusing
  `DepthBook`, reconnect-with-resubscribe, history ring buffer feeding the
  same `depth_history` shape as DemoProvider. Reconnect tested against a
  local fake gateway. *Gate: provider contract tests green.*
- **E3 · Engine + rail.** `BINANCE` live source in the rail (symbol list from
  gateway's STREAM_TICKER24H or a curated top set), `/api/candles` from
  HISTORICAL_CANDLES + live CANDLES, depth endpoint live. Provider chooser
  gets a gateway-URL field (default `ws://localhost:8080/ws`). Honesty:
  source labelled BINANCE (free public feed), never as institutional L3.
  *Gate: e2e against fake gateway; curl checks.*
- **E4 · Deploy.** render.yaml gains the gateway service + `EDGEDEPTH_GATEWAY_URL`
  env for the terminal service. Dockerfile unchanged. *Gate: both services
  Live on Render; BTCUSDT candles + depth in the browser.*
- **E5 · Heatmap rebuild on real data (03-rebuild).** The six-gate visual
  rebuild executes NOW on real Binance depth: target freeze → field quality →
  glow → chrome/legend → feel → V5 overlay bar. Reference screenshots from
  their terminal's own captures (assets/ in the AGPL repo — using the IMAGES
  as design reference is fine; no code). *Gate: side-by-side approval per gate.*

## 5. Risks and honesties

- Binance public depth is L2 top-of-book deltas, not MBO: the heatmap shows
  what actually rests at visible levels; UI never claims per-order data.
- Free public streams rate-limit on mass symbols; we cap subscribed symbols
  (≤4 concurrent) and degrade to DEMO with a visible notice rather than lie.
- Gateway loses volume history on restart (by design); our own `● REC`
  session recorder remains the persistent history mechanism.
- If the gateway repo churns field numbers: the vendored proto + our golden
  byte fixtures fail loudly in CI before shipping.

## 6. Licensing record

- Gateway (MIT): proto vendored with full LICENSE at
  `third_party/edgedepth-gateway/`; attribution in THIRD-PARTY-NOTICES.md.
- Terminal (AGPL-3.0): cloned outside this repo for study only; **no code or
  files copied into TraderOS**; screenshots referenced by URL.
