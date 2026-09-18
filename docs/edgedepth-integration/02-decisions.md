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
