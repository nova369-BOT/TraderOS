# EdgeDepth Integration — Decisions Log

Each entry: context, decision, why, and how to reverse.

## D1 — Vendoring layout (2026-09-18)

The actual EdgeDepth Go gateway is vendored **pristine** at
`services/edgedepth-gateway/` (see its VENDORED.md). The pre-existing
contract pin at `third_party/edgedepth-gateway/` (LICENSE + proto) is kept;
a test guards byte-parity between the two proto copies. `services/` was
chosen over extending `third_party/` because the gateway is a runnable
service the engine manages, not a library we link.

Reverse: move the tree; update VENDORED.md paths + the parity test.

## D2 — two Binance engines (2026-09-18)

**Context.** `providers/binance_perp.py` (Python port, merged 2026-09-18 per
owner direction, Render zero-config spine) duplicates gateway functionality.
The master prompt mandates the actual Go implementation and no duplicate
engines; it also forbids breaking working deploys.

**Decision.** The **Go gateway is the integration-authoritative Binance
implementation**. New work (gateway lifecycle, health surface, fake-Binance
E2E) targets the gateway path only. `binance_perp.py` is NOT deleted in this
milestone: Render runs a single Python container today and deleting the port
would silently remove the crypto book there. The port remains registered,
labelled as the merged zero-config path, and gets no new features. The
end-state — gateway binary shipped in the served image (or a second Render
service), port retired — is a deploy-milestone decision with the owner
(question was put to the owner 2026-09-18; no ruling yet, so the
non-destructive path was chosen).

Reverse: delete `binance_perp.py`, its tests, and its Render env var when
the gateway ships in the image.

## D3 — managed gateway binary sourcing (2026-09-18)

Upstream publishes a GHCR Docker image but **no downloadable binaries**. The
lifecycle manager resolves the executable in this order:

1. `EDGEDEPTH_GATEWAY_BIN` (explicit dev/admin override — validated, no PATH
   tricks beyond PATH itself),
2. `edgedepth-gateway` on PATH (admin-installed),
3. build from the vendored source when a Go toolchain ≥ 1.24 is available
   (`go build`, output under the user config dir, never touching the vendored
   tree),
4. otherwise the manager reports UNAVAILABLE with an actionable reason and
   the provider fails open exactly like any other unconfigured source.

No arbitrary command execution: the executable must end in
`edgedepth-gateway` (or `.exe`) and is spawned with a fixed argument vector.
Desktop installers bundling per-platform binaries is a later milestone.

## D4 — no Python re-implementation (2026-09-18)

Nothing in the gateway is re-implemented in Python for this integration.
The engine speaks the gateway's own wire (already implemented and tested in
`providers/edgedepth/wire.py`), spawns/monitors the actual binary, and the
fake-Binance test rig drives the REAL binary through its documented
`-binance-rest`/`-binance-ws` mirror flags. The only new Python is glue:
lifecycle, health, config, API surface, tests.

## D5 — sandbox egress reality (2026-09-18)

Binance/Coinbase are unreachable from this sandbox. Everything is built so
the same code path works against real venues with zero changes; the
real-network checklist (`99-real-network-checklist.md`) lists the exact
re-runs. We do not claim real-data verification where it was impossible.

## D6 — symbol casing at the protocol boundary (2026-09-18)

Running the actual binary showed the hub whitelists *lowercase* symbols
(built from exchangeInfo) and silently ignores any other casing — no error
frame, no close. Echo casing on frames is the wire casing.

**Decision.** The terminal keeps its canonical ids (`BTCUSDT`) everywhere;
`providers/edgedepth/client._norm()` lowercases on subscribe/request and
events are re-keyed to the canonical id as they leave the pump. Casing
therefore can never leak into the chart, the book, or recordings, and the
silent-gateway behavior is pinned by
`tests/test_gateway_e2e.py` invalid-symbol assertions.
Reverse: if upstream starts normalizing (or erroring visibly), remove
`_norm` and its doc comment; the e2e will tell immediately.

## D7 — provider switch UI: extend the existing books, not a new control (2026-09-18)

The terminal already had ONE data-provider switch surface (toolbar
"Source" dropdown + the connection menu's keyless rows) hardcoded to the
two books `lse`/`binance`, and a question from the owner surfaced that the
gateway book was unreachable from the UI.

**Decision.** The gateway book joins the existing surfaces rather than
getting its own door: book rows are now data (`SOURCE_BOOKS`), the
Edgedepth provider rides the same zero-config
BTCUSDT-first switch branch as Binance (comment explains why that branch
matters MORE here: its first call can be spawning the Go child), and a new
toolbar chip ("ED" + state dot) makes the managed service's lifecycle
always observable: green RUNNING, amber STARTING/STOPPING, red FAILED,
grey stopped. Click → panel with the supervisor's status payload
(verbatim, incl. mirrors and log tail) and start/stop over the management
API. Hidden exactly when the engine does not list the provider — the same
listing rule the rest of the terminal uses, so hosted/fleet policy controls
visibility with zero code. Nothing about the switch guesses: every state
comes from `/api/providers` and `/api/edgedepth/gateway/*`.
Reverse: remove `setupGatewayChip`, the SOURCE_BOOKS row, and the
`edgedepth` literals in `isLiveSource`/`runSwitchProvider`.

## D8 — hosted deploy: build the gateway from the vendored pin inside the image (2026-09-18)

Question: "preview on Render" — the previous single-stage Dockerfile shipped
no gateway binary, so a hosted terminal would have shown the edgedepth book
while its supervisor could only report "no executable".

**Decision.** The binary is never committed to git; provenance stays
auditable because the image builds it from the exact vendored pin
(`services/edgedepth-gateway`) in a `golang:1.24-alpine` stage and the
runtime stage pins it via image ENV (`EDGEDEPTH_GATEWAY_BIN=/usr/local/bin/
edgedepth-gateway`, the name the supervisor's self-defence check demands).
One container, managed mode — no second service, no wiring, and the
`.dockerignore` keeps the runtime layer free of the repo's dev surface
(tests/docs/.git) while explicitly keeping the vendored source the
Dockerfile builds. The blueprint lists the gateway book for THAT service
only (`LSE_EXTRA_PROVIDERS=binance,edgedepth` in render.yaml) — the engine
default and the fleet-directory policy from D2 are untouched, so the
listing stays an owner-level per-service choice. External mode remains one
env var away (`EDGEDEPTH_GATEWAY_URL`) for anyone who wants the gateway as
its own service instead of a child.
Reverse: restore Dockerfile/render.yaml to commit `ce111d6` and deploy the
single-stage image.

## D9 — speed is engine bookkeeping, not user wait (2026-09-18)

Owner feedback: tapping a pair on the EdgeDepth book "is not displaying /
very slow; want it ultra fast". Instrument work first, then fix. What the
measurement found: a warm tap costs one fresh WS dial (localhost, ~10-30ms)
plus ONE Binance REST klines page (the gateway clamps count at 1500 — no
pagination chain), so warm latency is ~0.3-1s and correct. The real costs:
(a) ZERO caching — re-tapping a pair re-paid the venue hop in full; (b) the
Go child spawned ON the first tap rather than at boot; (c) Render free-plan
container sleep (30-60s wake per idle period) — platform, not code, handled
by ops choice (keep-alive ping or paid instance), recorded in §3 of the
real-network checklist.

**Decision.** Speed moves from the user's click to engine bookkeeping:
- Latest-frame memo in `EdgeDepthProvider.candles()` keyed
  (symbol, tf, limit), TTL bounded by the bar itself (max 60s). Windowed
  calls (start/end set — tail reload, scrollback, backtest) NEVER touch it,
  so freshness-critical paths always hit the venue. Copies both ways: the
  caller can never alias or corrupt the memo.
- Boot hook `_edgedepth_boot_warm` (engine startup): managed-mode
  `ensure_running` in a threadpool (child up before the browser arrives) +
  whole-book prewarm in a daemon thread (8 symbols x 6 timeframes, pool of
  8 — one burst far under Binance klines weight). Fail-silent by design:
  autostart=0, missing executable, or a down gateway just leaves the memo
  empty and the blocking path reports as before.
- Honesty rails kept: forming bar via the live stream; NotSupported for
  empty answers; `edgedepth` book only — other providers untouched.
Reverse: remove `prewarm`, the memo block in `candles()`, and
`_edgedepth_boot_warm`; the book returns to hop-per-tap pricing.

## D10 — the bottleneck was the render law, not the data law (2026-09-19)

The market-data recovery diagnostic (docs/market-data-recovery/REPORT.md)
measured every boundary before changing anything: venue→normalized ≈
0.6 ms median, normalized→WS-emit ≈ 0.1 ms. The slowness lived in the
frontend: every trade tick rebuilt the chart's whole candle model
(O(n)·ticks/s), and the wire shipped one JSON frame per trade.

**Decision.** Raw event flow stays untouched and streaming; display-side
coalescing follows the same law the orderflow topic already used:
- /api/ws emits latest-state-wins batches at ~30 Hz/symbol with
  provenance (provider, venue, emit_ts) on every tick, and closes its
  socket explicitly (an ASGI handler-return closes nothing).
- The chart mutates the forming bar per tick and paints once per
  animation frame; the chart component's whole-array contract is honored
  unchanged.
- Telemetry (datadiag) is permanent, lock-free, ring-bounded: health is
  data recency (connected-silent is STALE; no waiting consumer is IDLE),
  latency is per-segment percentiles with the cross-clock skew caveat.

**Coinbase** joins as a second independent pipeline written only from
current Coinbase docs: Advanced Trade public WS (subscribe-before-feed,
envelope+sequence_num, market_trades, level2 with snapshot/update and
quantity-removal, gap→resync) + public REST candles (documented
granularities; 4h honestly absent, 300-cap paginated). Normalization
happens only after Coinbase-specific rules are applied; never invented
fields, never synthesized rungs.
Reverse: revert /api/ws + app.js render flush + datadiag + coinbase.py +
its registrations; the pipeline returns to per-print charts.

## D11 — ONE Binance surface: the EdgeDepth gateway book; the direct book is deleted (2026-09-19)

Owner report after the recovery shipped: Binance "still slow" — and two
Binance entries made the cause unreadable. Owner instruction: find the
root cause, delete the other Binance, keep only the EdgeDepth gateway;
rebuild Binance the Coinbase way if that is the better process.

Root cause found (consistent with the D10 measurements, now attributed
per surface before touching anything):

1. The deleted direct book (`binance`, binance_perp.py) carried the whole
   exchange catalog on a cold switch — the engine's own comment named it
   "the multi-megabyte book in the chart's critical path… the one fetch
   that can take seconds", and it spent startup bytes just hiding it
   (`_prewarm_binance`). That pain lived above its wire: 24h-ticker +
   exchangeInfo downloads, not its stream.
2. The per-tick full-chart rebuild (render law) — fixed in 9c13b80.
3. The gateway chain itself measured clean: median ~0.6 ms venue→norm,
   ~0.1 ms norm→WS (fake-venue segment numbers; the same instrumentation
   reports the real ones on Render).

Answer to "is Coinbase-style direct native the better process for
Binance": the direct native approach ALREADY existed — it was the book
being deleted (a 1:1 Python port of the gateway's own adapter; the only
native protocol client in the tree). Its structural cost was not its
protocol handling but the whole-exchange surface it shipped with. The
gateway approach, meanwhile, matches the product mandate (the ACTUAL
EdgeDepth gateway), measured fast, and is not the incapability threshold
the master brief set for replacement. Direct-native for Binance from
scratch would re-introduce a second protocol implementation to maintain
for a measured ~0 gain. The better process verdict: keep the gateway,
delete the whole-exchange-surface book, and the perceived slowness dies
with it (plus every remaining book becomes catalog-instant by design).

Changes: BinancePerpProvider and its suite deleted (the whole-exchange
catalog prewarm with it); the Source dropdown, connection menu, switcher,
partner-book pairing, and the sidebar loading narration now know exactly
one Binance book — "Binance · EdgeDepth". LSE_EXTRA_PROVIDERS default
becomes "edgedepth,coinbase"; render.yaml lists the pair. Nothing else
touched — crypto L2 depth (Coinbase primary/Kraken fallback, Depth Heat)
is unchanged.
Reverse: restore binance_perp.py, tests/test_binance_perp.py, the
prewarm block, and the six app.js anchors from commit 9c13b80 — the
single-surface rule is the owner's, though, so treat this reversal as
thrown only on account of the owner asking.
