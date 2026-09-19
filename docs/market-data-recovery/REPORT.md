# Market-Data Recovery — Diagnostic Report (2026-09-19, branch arena/01a0b513-traderos, commit d1cd631+)

Scope: §1–§31 of the recovery task. Feature development was frozen; only
data-path inspection, instrumentation, repair, and proof happened.

## Environment constraint (stated exactly, not hidden)

This sandbox blocks Binance AND Coinbase egress (TCP connect fails to
`fapi.binance.com`, `fstream.binance.com`, `api.exchange.coinbase.com`,
`advanced-trade-ws.coinbase.com`; DNS resolves, connections are dropped).
Real-venue verification therefore happens (a) on the Render deployment,
which has unrestricted egress, and (b) here via protocol-faithful doubles
(`tests/fake_binance.py`, new `tests/fake_coinbase.py`) — the same D5
pattern the earlier gateway phases used. Nothing below claims a real-Binance
/Coinbase tick passed through this sandbox.

## Binance — boundary-by-boundary diagnostic (§6–§9)

Data path as inspected: Binance → EdgeDepth gateway (Go, vendored pin) →
protobuf → `edgedepth/client.py` pump → `depth_stream` events →
`/api/ws` → browser `onTick` → `pushToChart` (`LSEChart.update`).

Measured result (in-sandbox numbers, engine side):

| Segment | Median | p95 | n |
|---|---|---|---|
| T1 venue → LSE normalized (S1) | 0.58 ms | 1.7 ms | hundreds |
| T6 normalized → engine WS emit (S2) | 0.08 ms | 0.09 ms | hundreds |

Engine-side latency is sub-millisecond — the slowness was NOT the gateway,
NOT protobuf, NOT normalization, NOT a sleep or queue on the server. The
root cause of "too slow" was the frontend render path:

**Binance was slow because every trade tick re-rendered the entire chart.**
`onTick` copied the full candle array (`slice()`) and called
`pushToChart()` per tick; `LSEChart.update` ran its prop-transform
(the full-array ×1000 ms-conversion map) and re-rendered the React root
per tick. At BTC burst rates (hundreds of aggTrades/s) that is hundreds of
O(n) chart rebuilds per second — the chart falls behind, scrollback and
taps queue behind renders, and the whole book "feels frozen". This matches
the symptom set exactly ("too slow", "not reaching the chart well enough").

**Binance did not correctly reach the chart because there was no render
coalescing anywhere** and the wire added a second amplifier: `/api/ws`
serialized one JSON frame per trade (no batching), so the browser ran the
O(n) path once per received frame.

Fix (both amplifiers removed, no pipeline change):
- `/api/ws` coalesces outbound ticks latest-state-wins at ~30 Hz per
  symbol (the same law orderflow's ~15 Hz topic already used; it is a
  display law, not a data law — the ingest stream itself is untouched,
  §21/§22). Provenance (provider, venue, emit_ts) rides every tick (§25).
- The chart mutates the forming bar per tick and paints once per
  animation frame (rAF flush). Raw event flow never reaches React per
  event anymore; the chart's whole-array contract is unchanged (it
  receives the same array — just at frame cadence).

Additional correctness work in the same pass: an ASGI handler-return
silently closes nothing — `/api/ws` now closes its socket explicitly on
the completion/error paths (previously a finished stream could leave a
client waiting forever); the pre-existing demo test is updated to pin the
new batch shape.

## Coinbase — what existed, and where it stopped (§5, §14–§17)

Discovered state (before this recovery):
- COINBASE PROVIDER FILES: `lse_terminal/providers/crypto_l2.py` only —
  Coinbase appears there as the **primary venue of a depth-only ccxt
  adapter** feeding the Depth Heat pane ("Coinbase primary / Kraken
  fallback"). There was no market-data provider serving candles+ticks for
  the chart. Nothing named "coinbase" is registered in
  `lse_terminal/engine/registry.py`.
- Coinbase data therefore reached: (1) network connection: yes, inside
  ccxt for Depth Heat only; (2) provider decoder: yes, ccxt's own;
  (3) normalized LSE state: DepthEvent for the Depth Heat pane only;
  (4) chart data path: **NO — never**. A Coinbase-sourced candle or tick
  had no code path to the LSE chart, and no UI selector exposed one.

So the "missing Coinbase" report was structurally correct: Coinbase
existed only as a depth backend, not as a chartable pipeline.

**Coinbase pipeline added** (`lse_terminal/providers/coinbase.py`), from
the CURRENT documentation, never assumed:
- Endpoint `wss://advanced-trade-ws.coinbase.com`; public channels require
  no auth (`market_trades`, `level2`, `candles`(5m-only), `heartbeats`,
  `ticker`, `ticker_batch`, `status`); the venue feeds NOTHING before a
  `{"type":"subscribe",...}` frame (pinned by test).
- Envelope `{channel, timestamp, sequence_num, events[]}`; trades decode
  `{trade_id, product_id, price, size, side, time}` with taker-side sides
  (BUY/SELL), trade_id-based dedupe, canonical symbol `BTC-USD` ↔ `BTCUSD`.
- level2: snapshot seeds the transmitted book, updates patch it,
  quantity 0 removes the level; sequence gaps (envelope sequence_num)
  and updates-before-snapshot force resync — never papered over (§15);
  events without `product_id` on a multi-product socket force resync
  rather than a guessed attribution.
- Candle history: public REST
  `GET /api/v3/brokerage/market/products/{id}/candles` — documented
  granularities (no FOUR_HOUR exists; "4h" is honestly refused rather
  than synthesized), 300-candle request cap paginated by the provider,
  venue's newest-first normalized to ascending ints.
- 5m-bucket-only candles channel ⇒ live sub-5m bars aggregate from
  trades — which is exactly what the existing chart's tick path already
  does (the chart forms bars from ticks for every book).
- Registered in the registry; listed by Source dropdown and connection
  menu only when the engine lists the provider (the gate rule every
  other source obeys; on the Render service via `LSE_EXTRA_PROVIDERS`).

## Controlled measurement (§7, §26)

New module `lse_terminal/engine/datadiag.py` — a process-wide, lock-free
T-stamp ring measuring T1..T8 across both pipelines:
- T1 = venue event time (allowing honest "venue-origin lag" readings),
- T4/T6 = client decode/normalize entry,
- T7a = engine WS emit, T7b/T8 = browser receive/render (posted back by
  the UI in 5 s batches, sampled 1/20).
- Endpoints: `/api/diag/health` (data recency per provider, IDLE/STALE/
  LIVE — a connected silent socket is STALE by rule, §27; consumer-aware:
  no-waiting-consumer ≠ stale), `/api/diag/latency` (avg/median/p95/max
  per segment, cross-clock segments carry the skew caveat, absurd clocks
  clamped out), `/api/diag/ingest` (browser batches).

Sandbox-measured engine segments are in the table above (sub-ms). On
Render, with real venues and a real browser, the same endpoints report
the full chain including network and paint — the measurement instrument
is the product, so "fast" is always demonstrable.

## Reconnect (§28) — both proven independently

- Coinbase: unit-pinned (drop → reconnect → resubscribe → resume;
  trade dedupe survives the reconnect; book resyncs from the next
  snapshot). Runtime: fake venue killed → STALE; revived → resume frames.
- Binance (direct): runtime venue kill → STALE in ~15 s; revive →
  pump's candidate-race reconnects (≈ capped-backoff pace, one full
  window) → resume frames.
- Binance (EdgeDepth gateway): protocol-pinned in earlier phases
  (resync-on-gap, reconnect resubscribe, 24h-drop routine) against the
  real pinned binary; runtime re-verification pending in this sandbox's
  network (gateway not rebuilt here — see Limitations).

## Files changed / added / removed (§31)

Changed:
- `lse_terminal/engine/server.py` — /api/ws coalesced batch fan-out +
  provenance + explicit close; diag endpoints (health/latency/ingest);
  book-aware startup hook retained (edgedepth pre-gate).
- `lse_terminal/ui/static/app.js` — batch tick consumption; rAF render
  flush; browser T-stamp sampling/posting; Coinbase book rows
  (Source dropdown, connection menu, live-source set, default BTCUSD).
- `lse_terminal/providers/binance_perp.py` — diag stamps (trade/book),
  venue provenance.
- `lse_terminal/providers/edgedepth/client.py` — diag stamps at the
  translation points (trade/book yield sites).
- `lse_terminal/providers/edgedepth/provider.py` — venue provenance
  ("binance" — the gateway is a wire, not a venue).
- `lse_terminal/engine/registry.py`, `lse_terminal/providers/__init__.py`
  — register and export CoinbaseProvider.
- `render.yaml` — hosted listing adds `coinbase` (this service only;
  fleet policy unchanged).
- `tests/test_api.py` — demo-tick test re-pinned to the batch wire
  (semantic equivalent, contract upgrade).

Added:
- `lse_terminal/providers/coinbase.py` — the Coinbase Advanced Trade
  market-data provider.
- `lse_terminal/engine/datadiag.py` — the T1..T8 diagnostics module.
- `tests/test_coinbase_provider.py` — 15 tests (subscribe shape,
  normalization, identity, seq-gap resync, update-before-snapshot,
  pagination, honest refusals, reconnect resume, diag).
- `tests/test_datadiag.py` — 6 tests (staleness, kind ages, recency
  semantics, percentiles, skew clamp, ingestion hygiene).
- `tests/test_ws_tick_fanout.py` — 3 tests (coalescing, provenance,
  error surfacing, per-symbol independent batches).
- `tests/fake_coinbase.py` — protocol-faithful Coinbase WS+REST double.
- `docs/market-data-recovery/REPORT.md` (this file).

Removed: none.

## Real-data proof status (§23/§24, stated plainly)

- In sandbox: protocol-faithful doubles only. Chains verified runtime:
  fake-Binance → binance_perp → /api/candles (420 rows) + /api/ws ticks
  (batch, provenance); fake-Coinbase → coinbase provider → /api/candles
  (1000 rows through 4 REST pages, 20 ms local) + /api/ws ticks;
  STALE/resume transitions of BOTH providers under venue kill/revive.
- Real venues: **deferred to the Render deployment** (unrestricted
  egress) — the checklist below has exact steps; the same /api/candles,
  /api/ws, /api/diag/* endpoints report the real chain with no code
  change. Open the terminal against Render, set Source = EdgeDepth (or
  Binance direct) and Coinbase, and read /api/diag/latency live.

## Remaining limitations (honest list)

1. Sandbox gateway runtime: this edge-case sandbox recycled the Go
   toolchain/binary used in earlier phases; the EdgeDepth ENGINE-side
   diagnostics are wired and unit-pinned, but a fresh end-to-end gateway
   run was not re-executed here. The Render image rebuilds+runs it (D8).
2. Browser segments (S3/S4/S5) measure in real browsers only; sampling
   is live and batched — first numbers appear after a user-side load.
3. Coinbase REST is the documented public market-data endpoint, verified
   against doubles; if Coinbase ever tightens auth on it, `candles()`
   surfaces a concrete NotSupported rather than faking data.
4. Coinbase has no 4h timeframe — by honesty (venue lacks FOUR_HOUR).
5. Tick `venue` on CryptoL2 depth stays per-existing behavior (its own
   failover semantics) — untouched by this recovery.
6. Reconnect *pace* of the binance direct pump is capped-backoff by
   design (≤ one 30 s window after venue return); it is a pacing choice,
   measured, not a defect.


## Addendum (2026-09-19, post-report): single-Binance ruling

The owner locked exactly one Binance surface: the EdgeDepth gateway book.
The direct "Binance (futures & spot)" book is DELETED (module, tests,
boot prewarm, every UI entry, the hosted listing). Root-cause attribution
of the residual slowness stands as written above and in D11: the deleted
book's whole-exchange catalog design plus the (fixed) render law — the
gateway chain measured clean throughout. Coinbase-style direct-native was
evaluated and rejected for Binance (a second protocol implementation to
maintain for a measured ~0 gain; the gateway is the master-brief
authority and not incapable).


## Second addendum (2026-09-19): the Binance surface moves to direct native (D12)

Owner-driven, measurement-backed reversal of the D11 surface ruling: the
chart's Binance book is now providers/binance.py — Coinbase-shaped direct
native (curated 8-row catalog in memory, one hop, combined WS with
agg-id dedupe, partial top-20 books, paginated klines with native 4h,
venue-verbatim 429s). The EdgeDepth gateway stays in the tree for
engine-owned uses but leaves the chart Source menu: it hard-fails
wherever no Go toolchain exists (measured) and adds a hop where it does.
Suite 262 passed / 7 skipped; engine-preview proof: instruments 19 ms,
candles 22 ms, ws batched ticks LIVE at 1 ms venue-origin lag.
