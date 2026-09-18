# EdgeDepth Integration — Phase 1/2 Proof: Actual Gateway, Built and Verified

Date: 2026-09-18 · Branch: `arena/01a0b513-traderos` · Sibling docs:
[`00-baseline.md`](00-baseline.md) (pre-change baseline),
[`02-decisions.md`](02-decisions.md) (decision log),
[`99-real-network-checklist.md`](99-real-network-checklist.md) (deferred
real-network re-runs).

This is the evidence pack for the master prompt's Phase 1 + Phase 2: the
**actual** EdgeDepth Gateway (`github.com/edgedepthhq/edgedepth-gateway`,
MIT) — upstream code, its own license, its own tests — built and exercised
inside this repo, with a real end-to-end data path that passes through the
**unmodified Go binary**.

---

## 1. What is the authority (and how pristine is pristine)

- Pin: upstream `master @ b8222849b6baeaae8ed54f336fced0125ebb0df5`
  (2026-09-08, "Serve bounded volume history and repair Binance stream
  routing").
- Vendored at [`services/edgedepth-gateway/`](../../services/edgedepth-gateway)
  **byte-identical to upstream** (verified with `git diff --no-index` against
  the pristine clone at vendor time). The only repo-local file *added* inside
  that tree is `VENDORED.md` — a containment document, not a code change.
  Upstream `LICENSE` (MIT), `go.mod`, `proto/edgedepth.proto`, all generated
  pb code and all `*_test.go` files (including their live-venue tests,
  whose live parts skip without network) are preserved.
- The pre-existing contract pin at `third_party/edgedepth-gateway/` (LICENSE
  + proto file) is kept; `tests/test_edgedepth_proto_parity.py` asserts the
  two proto copies stay identical.
- **No part of the gateway was re-implemented in Python** (D4): connectivity
  layer = protobuf wire (already in `lse_terminal/providers/edgedepth/wire.py`),
  lifecycle = Go process management, tests drive the real binary.
  This is a connectivity-layer integration, not a fork.

### Reproducible vendoring

`VENDORED.md` exacts the recipe: clone upstream, checkout the pin,
copy the tree minus `.git` and `.github`, then byte-verify with
`diff -r`. Why pinned rather than floating: production stability (D3).
Upgraded by explicit `git checkout <sha>` + re-verify + notes in VENDORED.md.

## 2. Building the real thing in this sandbox

The sandbox has **no Go toolchain** and cannot reach go.dev/dl.google.com/
proxy.golang.org; GitHub is reachable. The build therefore bootstraps Go
from source, then builds the gateway with its two dependencies fetched as
codeload tarballs:

1. **Go bootstrap chain** (each stage builds the next): go1.4-bootstrap-20171003
   → go1.17.13 → go1.20.14 → go1.22.12 → **go1.24.13** (the version
   `go.mod` requires: `go 1.24`). Toolchain lands at `/tmp/gotc`
   (out-of-tree, throwaway; nothing pollutes the repo).
2. **Gateway build:** `go build ./cmd/edgedepth-gateway`, with the module
   proxy replaced by offline copies of the only two modules it imports:
   `github.com/gorilla/websocket v1.5.3` and
   `google.golang.org/protobuf v1.36.11` (both from codeload.github.com,
   exactly the versions `go.mod` pins). No other dependencies exist —
   `go.mod` is one of the reasons this gateway passes the Phase-1
   maintainability gates clean.
3. Build results in `/tmp/gw-binary/edgedepth-gateway` (also the default
   binary used by the tests via `EDGEDEPTH_TEST_GATEWAY_BIN`).

### Upstream's own test suite

`go test ./...` passes against the vendored tree (all offline tests; the
live-venue tests skip themselves without Binance egress, exactly as upstream
designed them). Covering hub subscription/priming, depth/trade contract
decoders, candle aggregation, volume history, ticker fallback — the same
suites that guard upstream. `-race` could not run (bootstrapped toolchain
built without cgo/race support) — noted in the checklist as part of the
real-network repro slog.

## 3. The full integration chain, with evidence

Everything below ran in-sandbox on 2026-09-18. The fake venue is
`tests/fake_binance.py` — a protocol-faithful Binance USDⓈ-M double
(REST: exchangeInfo/depth/klines/premiumIndex/openInterest/ticker-24hr;
WS: combined-stream depth/aggTrade/markPrice/forceOrder endpoints) that the
**real gateway** connects to through its own documented mirror flags
(`-binance-rest`, `-binance-ws` — the same flags upstream ships for
testnet). Nothing about the chain is mocked: the Go process, its hub, its
book-sync state machine, its protobuf encoder and every byte on the wire
are the actual implementation.

```
tests/fake_binance.py                       <-  protocol-faithful venue double
        ▲ upstream REST + WS (real sockets, real JSON)
edgedepth-gateway (unmodified Go binary)    <-  internal/{binance,hub,candle,volume}
        ▲ ws://127.0.0.1:<port>/ws          <-  JSON control + binary protobuf frames
lse_terminal/providers/edgedepth/client.py  <-  wire decode, BookSync, pumps
        ▲
lse_terminal/contracts  (DepthEvent/TradeEvent/CandleEvent/…)  <-  normalized LSE events
        ▲
DepthBook (engine/orderflow/book.py) — rebuilt from the gateway's event
stream as the authoritative cross-check
```

### 3.1 Lifecycle proof (`tests/test_gateway_lifecycle.py`, 12 tests)

- Spawn through the supervisor (validated executable, fixed argv, process
  group), `/healthz` gating readiness before the engine will route data.
- Crash detection, bounded auto-restart (budget: 3 spawns / 120s, reset
  after 30s stable), FAILED only when the budget is exhausted; pre-spawn
  failures stay retryable (`last_error` carries the actionable reason).
- Busy-port detection: another process holding the port is *adopted* via
  pid-file handshake when it is our binary, or reported (no stacking onto
  foreign processes).
- Orphan safety: engine shutdown reaps the child (SIGTERM → grace → SIGKILL
  → waitpid); nothing lingers.
- Management surface (`tests/test_gateway_api.py`, 5 tests):
  `GET /api/edgedepth/gateway/status` (always 200 — state is data, never an
  HTTP error), `POST …/start` (409 + actionable detail on failure),
  `POST …/stop` (idempotent), and the engine `shutdown` hook that stops a
  managed child automatically.

### 3.2 Real end-to-end through the actual binary (`tests/test_gateway_e2e.py`, 4 tests)

Driven with `EDGEDEPTH_TEST_GATEWAY_BIN=/tmp/gw-binary/edgedepth-gateway`:

| Test | What it proves |
|---|---|
| `test_full_chain_book_trades_candles_stats_liquidations_ticker` | Startup + healthz, upstream connects; REST snapshot → straddling-diff → DELTA streaming; aggregate trade id dedupe; BUY/SELL sides correctly mapped from `m`; liquidation pass-through; stats (mark/funding via stream + REST fallback, OI via REST poll); live candle built trade-by-trade by the Go candle aggregator; `get_historical_candles` history; all-market 24h ticker via the gateway's REST fallback; invalid symbols silently ignored without poisoning the session; live flow resumes cleanly after malformed frames are deliberately injected on both upstream routes |
| `test_sequence_gap_forces_rest_resync_and_fresh_snapshot` | A diff that skips the depth chain (`pu` ≠ previous `u`) makes the *gateway* detect the gap, refetch rest (`depth_rest_hits` ≥ 2), resync, and re-prime clients with a fresh full SNAPSHOT. The corrupting diff never reaches the client (asserted: its level is absent from the re-primed snapshot) |
| `test_upstream_outage_reconnects_and_resyncs` | Killing every upstream socket makes the gateway reconnect and resync *on its own*; client sees a re-primed session without resubscribing |
| `test_shutdown_stops_process_and_leaves_no_orphans` | `sup.stop()` terminates the Go process (pid gone), status → STOPPED, and the client surfaces the outage (bounded reconnects, then a clean error) — no daemon leftovers |

Result on 2026-09-18: **4 tests, 4 passed**.

Honest rework count: the sequence-gap test failed once on its first run —
the corrupt diff arrived inside the gateway's documented 1-second
resync-collapse window (`triggerResync`/`nextResync`), so no second REST
fetch happened within the test timeout. That was a harness timing
assumption, not a gateway or client defect; the test now waits out the
cooldown before injecting the gap. Everything else passed on its first or
second run (the only other failures along the way were on the LSE client
side: the venue id «binancef», the lowercase symbol casing, and the
`get_historical_candles` method name — all fixed in code and pinned, §4).

Cross-reference: the authoritative-book assertions inside the full-chain
test rebuild the book with the *existing LSE engine* `DepthBook` from
`lse_terminal/engine/orderflow/book.py` (pinned here on purpose: the
gateway's own event stream, applied through the engine's existing rules,
must reproduce gateway-authoritative state — the S6/S7 contract the
orderflow engine was built around).

## 4. What the real binary taught us (protocol findings now pinned by tests)

These were unknown from static reading and only surfaced by running the
actual implementation. Each is locked under test:

### 4.1 The venue id is `binancef`, not `binance`

`internal/binance/adapter.go: ID() "binancef"`. Subscribing with
`exchange:"binance"` is silently rejected by the hub whitelist (no error
frame — the request just never materializes a feed). Client now sends
`binancef` (`client.py: EXCHANGE`, and
`test_venue_id_matches_the_gateway_adapter`).

### 4.2 Symbol casing is canonical-lowercase on the wire

The hub builds its whitelist from `exchangeInfo` lowercased and rejects
any other casing with no feedback. And it echoes symbols in its own casing
on every frame. The client now normalizes to lowercase *at the protocol
boundary only* (`client._norm()`) and restores the caller's canonical id
on every event, so `BTCUSDT` stays `BTCUSDT` inside the terminal while the
gateway sees `btcusdt` (same mechanism by which invalid symbols still
register an upstream feed only when whitelisted).

### 4.3 Historical candles are a request, not a subscription

`hub/client.go` routes on the control frame's `method` name alone. Sending
`subscribe` with stream 8 starts an upstream feed and answers *nothing*;
history must be requested with `get_historical_candles`
(single control message, no unsubscribe). The old client code did the
former — a pure protocol bug that only the real binary could disprove
(the old unit test actually pinned the bug; it was rewritten to pin the
real behavior: exactly one `get_historical_candles` frame on the wire).

### 4.4 Sequence-gap recovery has upstream semantics beyond "drop + resubscribe"

The E2E straddle/gap assertions initially followed the *client-side*
BookSync contract. The gateway has its own state machine
(awaitFirst/straddle, pu-chain, resync collapse) — the test now asserts
both layers independently (gateway REST refetch & re-prime; client
posting a DELTA only after the fresh SNAPSHOT).

### 4.5 STATS live under the candle timeframe key

Stats frames are keyed by the same seconds-timeframe the candle
subscription used; `feed_stream(..., candle_tf_s=60)` therefore subscribes
stats with `timeframe=60` too, and yields `StatEvent`s carrying
mark/funding/OI (trade-built, blended with the 30 s REST poll).

## 5. Phase-1 gates (§39) — verdicts

| Gate | Result |
|---|---|
| official repository (edgedepthhq/edgedepth-gateway) | ✅ verified against GitHub origin |
| license (MIT, intact, attribution preserved) | ✅ vendored with LICENSE; pin at `third_party/` |
| buildability | ✅ documented bootstrap → `go build` clean |
| runtime | ✅ process spawns, `/healthz` 200, managed lifecycle |
| data freshness | ✅ upstream streams & REST fallbacks; verified in E2E |
| auth handling | ✅ model is keyless-read-only (Binance public data); no creds |
| reconnect logic | ✅ upstream stream supervisor + resync; engine-side reconnect on top |
| rate limits | ✅ hub refcounts feeds (≤16 symbols), shared ticker, weight-aware REST polling (documented in hub/ticker code) |
| data normalization complexity | ✅ single protobuf frame type + JSON control plane; LSE wire decoder already existed and now round-trips the real frames |
| long-term maintainability | ✅ two-module dependency surface; pristine pin + upgrade recipe |
| integration complexity | ✅ one process, one WS URL, env-driven config |

## 6. Artifacts quick reference

| Artifact | Where |
|---|---|
| vendored gateway | `services/edgedepth-gateway/` (+ `VENDORED.md`) |
| lifecycle supervisor | `lse_terminal/engine/gateway.py` |
| protocol client/wire | `lse_terminal/providers/edgedepth/{client,wire}.py` |
| lifecycle tests | `tests/test_gateway_lifecycle.py` (12) |
| management API tests | `tests/test_gateway_api.py` (5) |
| false-Binance double | `tests/fake_binance.py` |
| real-binary E2E | `tests/test_gateway_e2e.py` (4) |
| protocol conformance | `tests/test_edgedepth_{client,wire,proto_parity}.py` |
| real-network deferrals | [`99-real-network-checklist.md`](99-real-network-checklist.md) |
