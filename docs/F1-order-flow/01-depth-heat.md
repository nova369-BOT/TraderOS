# F1 Phase 1 — Depth Heat (liquidity heatmap): Implementation Plan

**Product of London Strategic Edge** · v1.0 of this document · **Date:** 2026-09-16
**Parent:** `PLAN.md` §3.5 (Feature request F1 — Order Flow Suite)
**Scope:** the heatmap phase — build and ship first, per founder directive (2026-09-16).
Footprints come in Phase 2; nothing in this document depends on them.

> **Status: building — engine + pane live (H1–H8b, 2026-09-16).** This document is the
> contract for the build: every work item has an owner surface (engine / API /
> frontend / demo / data), a done-criterion, and a gate. Per-gate status lives in
> the §6 table and the progress log at the bottom of this file.

### Progress log

- **2026-09-16 — H1, H2, H3, H4 landed (+ H8 engine half); full suite green.**
  - **H1 contracts**: `DepthEvent` / `TradeEvent` + side constants in
    `contracts/types.py`; `depth_history()` / `depth_stream()` optional methods on
    `Provider` (NotSupported pattern); tick dicts may carry `side` + `volume`
    (backward compatible); `capabilities()` auto-reports `depth_history` /
    `depth_stream` (verified via `/api/providers`). Contract rule added:
    `depth_stream` must validate eagerly (async-generator bodies would defer it).
  - **H2 engine core** (`engine/orderflow/`): `book.py` (persistent L2 book —
    last-seen persistence, size-0 removals, active-range override, depth reset,
    COB ladder), `grid.py` (DepthGrid: last-value columns, carry-forward over
    quiet gaps, ring-bounded, viewport queries, sha256 fingerprint for replay
    checks), `normalize.py` (pure LUTs: heat/greyscale, intensity/dimming/
    contrast/brightness, percentile+exact cut-offs, shade quantization).
    All §3 unit-test gates covered in `tests/test_orderflow.py`.
  - **H3 demo L2**: `providers/demo_depth.py` — deterministic per (symbol,
    start); scripted walls / iceberg refills / pulls-on-approach /
    sweep-throughs; crossed levels fill (book never crosses); anchors to the
    candle walk for history and to the live tick price for `depth_stream`;
    demo ticks now carry `side` + `volume`.
  - **H4 API + WS** (`/api/orderflow/*`): `depth` (history fill, 404-with-reason
    degradation), `book` (persistent-book snapshot), `record` / `record/stop`,
    `sessions` list + delete, and the `depth:{symbol}` WS topic (SNAPSHOT on
    subscribe, ≤15 Hz coalesced deltas with latest-state-wins, trade frames
    interleaved for the dots).
  - **H8 engine half**: `session.py` recorder — incremental parquet parts under
    MY DATA (`data/depth-sessions/`), JSON sidecar metadata, size rotation,
    lossless `read_events` round-trip; the replay-readiness invariant is tested
    (recorded session rebuilds a fingerprint-identical grid).
- **2026-09-16 — H5 core landed (frontend pane + renderer).**
  - `frontend/src/components/chart/depth/`: `DepthHeatRenderer` (canvas 2D,
    own rAF loop, offscreen-ImageData + LUT bulk blit, ring-bounded columns
    mirroring the engine grid, dots pass, BBO lines, wheel/drag/dbl-click
    recentering, synced-crosshair line — zero React state in the frame path)
    and `DepthHeatPane` (history fill from `/api/orderflow/depth`, live
    `depth:{symbol}` WS with trade dots, contrast slider above the pane per
    S3, scheme/dots controls, per-instrument settings persistence, honest
    "No depth data for {symbol}" state with the engine's reason, DEMO label).
  - Layout wiring: `layoutStore.panelKinds` (persisted) + a quiet 🔥 depth
    toggle on every multi-grid panel; `TerminalMultiGrid` renders the pane
    for `depth` panels; crosshair time sync flows through the existing
    `syncedCrosshairTime` channel.
  - Bundle rebuilt into `lse_terminal/ui/static/chart/`; new files type-clean
    (repo-wide tsc has pre-existing errors unrelated to this slice).
  - Gates still open: **H6** (full settings window + apply-globally),
    **H7** (COB column component + dot drawing types), **H8 UI half**
    (record/list wiring in the pane), **H8b** (ccxt crypto L2), **H9**
    (vault MBO wiring + broker L2), **H10** (perf + golden images + e2e +
    guide section).
- **2026-09-16 — H8b landed (crypto public L2 via ccxt).**
  - `lse_terminal/providers/crypto_l2.py`: `cryptol2` provider per the locked
    §2.3 design — Coinbase **primary**, Kraken **fallback** (per-symbol
    wrap-around failover, capped backoff), 8 USD pairs on a normalized symbol
    map (`BTC/USD`, `btc-usd`, `BTCUSD` all resolve), keyless public feeds.
  - Data honesty end to end: `depth_history` is an honest `NotSupported`
    (exchanges expose no public L2 history), `capabilities()` excludes it,
    `/api/orderflow/depth` answers `200 {live_only: true, events: []}` for
    live-only symbols so the pane opens on the WS topic with its honest range
    instead of "no depth data", and the pane derives BBO lines from the
    subscribe-time SNAPSHOT (live sources have no `/book`).
  - Trade sides are exchange-stamped (buy/sell → BUY/SELL, anything else
    stays UNKNOWN); SNAPSHOT first per symbol, then DELTAs carrying the
    transmitted book (persistent-book semantics absorb full-book pushes).
  - ccxt pinned `==4.5.78` in `pyproject.toml`; MIT entry under a new
    "Engine (Python dependencies)" section of THIRD-PARTY-NOTICES.md.
  - Tests (9, offline): map/normalization, snapshot-first, side mapping,
    coinbase→kraken failover via the `_watch_book`/`_watch_trades` seam,
    live-only API contract, pinned-dependency guard. Fixture payloads in
    `tests/data/crypto_l2_fixture.json` (schema-representative; live capture
    wasn't possible in the sandbox). Full suite 146 passed / 1 skipped.
  - One engine hardening found en route: pump starvation guard — bounded
    merge queue (1024) + cooperative yield per event, so a watcher without
    internal awaits can't starve the consumer or balloon memory.
  - Gates still open: **H6** (settings window), **H7** (COB column + dot
    types), **H8 UI half** (record/list wiring in the pane), **H9** (vault
    MBO + broker L2), **H10** (perf + golden + e2e + guide). On-screen paint
    check of the pane still owed (no browser in sandbox).
- **2026-09-16 — H6 landed (full settings window + apply-globally).**
  - `DepthHeatSettingsWindow.tsx` + `depthHeatSettings.css`: studies-style
    dark panel opened by ⚙ or **right-click on the heatmap** (§5.2). Every
    control applies LIVE (the running pane is the preview), persists per
    instrument, Esc/backdrop closes.
  - Full §5.3 surface: colour scheme cards with gradient strips rendered
    from the REAL LUT (not illustrations) · intensity · dimming ·
    **apply-scheme-globally** (terminal-wide store + live broadcast to open
    panes) · cut-off percentile/exact with resolved-size readout · vertical
    smoothing Auto/Manual 0–20/None · contrast & brightness · dots
    enable/min-size/size/transparency/**drawing type gradient–solid–pie** ·
    active-range override (N levels) · auto-recenter BBO/trades/off with
    tolerance % · depth reset session/interval.
  - Renderer upgrades: zoom-adaptive Auto smoothing (S4), radial-gradient +
    solid dots, **pie dots aggregated per price-time cell and split by
    aggressor-side volume** (S7), eased auto-recentering inside the
    tolerance band with manual-navigation override (S9).
  - Engine: `/api/orderflow/book` honours `active_levels` (S6) and the S11
    reset policy (`reset=interval` rebuilds from the last epoch-aligned
    boundary). Tested.
  - Full suite 147 passed / 1 skipped. Frontend type-clean + bundle rebuilt.
  - Gates still open: **H7** (COB column + boundary lines), **H8 UI half**
    (record/list wiring in the pane), **H9** (vault MBO + broker L2),
    **H10** (perf + golden + e2e + guide). On-screen paint check still owed.
- **2026-09-16 — H7 landed (COB column + boundary lines).**
  - `DepthHeatCob.tsx`: numeric DOM ladder **pixel-aligned with the heat's
    price axis** — it reads the renderer's published viewport
    (`getViewMetrics()` + frame-version bump), zero React state in either
    frame path. Per-level size bars + optional cumulative strip, spread chip
    between the BBO rows, bright BBO lines; fresh per symbol.
  - Live-updating: the ladder keeps its own persistent book (`ClientBook`,
    exact engine patch semantics — SNAPSHOT/DELTA patch identically, size 0
    removes), seeded from `/api/orderflow/book` then fed by the WS depth
    frames.
  - S6 boundary lines: with an active-range override, out-of-window levels
    dim and two amber dashes mark the window edge on the ladder.
  - Settings: COB column + cumulative toggles in the window (BOOK & MOTION).
  - Frontend type-clean + bundle rebuilt. Renderer exposes `getViewMetrics`
    for the alignment. No engine change needed (book endpoint already
    serves the ladder shape).
  - Gates still open: **H8 UI half** (record/list wiring in the pane),
    **H9** (vault MBO + broker L2), **H10** (perf + golden + e2e + guide).
    On-screen paint check of the pane still owed (no browser in sandbox).
- **2026-09-16 — H8 UI half landed (record/list wiring in the pane).**
  - Pane header: `● REC` start/stop with pulsing elapsed-time badge (S10);
    honest surface when recording is denied (hosted deploy → visible reason).
  - `DepthHeatSessions.tsx`: MY DATA list for the pane's symbol — start
    time/duration/size/rows, live-recording pulse, DEMO chip, two-click
    delete, 4s auto-refresh; LOAD replays a recording into the pane
    (columns + COB book + trade dots rebuilt from the file).
  - New endpoint `GET /api/orderflow/sessions/{sid}/events`: write-ordered
    events with an honest cap (`truncated`), closed-parts-only reads for
    still-recording sessions. `SessionRecorder.events_paths()` added.
  - Loaded-session chip with one-click return to the live feed; ingest of a
    recording resets the dot trail (new timeline). Tested end to end
    (record → stop → events → truncation → 404s).
  - Full suite green; frontend type-clean; bundle rebuilt.
  - Gates still open: **H9** (vault MBO + broker L2), **H10** (perf +
    golden images + e2e + guide section). On-screen paint check still owed.

---

## 1. Product specification (what we are replicating)

Derived from primary research of Bookmap's product and knowledge base
(bookmap.com features page, official knowledge base "Heatmap settings" / "Heatmap. Main
Chart" articles, published settings guides — 2026-09-16). We replicate **behaviour**,
not brand: the feature ships as **Depth Heat** (never the competitor's name — trademark).

### 1.1 Core behaviour (in scope)

| # | Behaviour | Spec (per research) |
|---|-----------|---------------------|
| S1 | **Historical liquidity field** | Time (x) × price (y) grid; cell = resting limit-order size at that price in that time slice. Scrolls right in real time; history loads from depth history on pane open |
| S2 | **Colour** | Brighter = more resting size. Default map black→blue→yellow→orange→red; **greyscale** option; **intensity** control; **dimming** (toward all-black); "apply scheme globally" (persisted per terminal) |
| S3 | **Upper/lower cut-off** | Controls where the gradient saturates to solid colour. Two modes: **percentage** (e.g. ≥95th percentile → solid top colour; ≤5th → solid bottom) and **exact size** (e.g. ≥500 contracts → solid). Exposed as a **contrast slider above the pane** *and* in the settings window |
| S4 | **Vertical smoothing** | Quantizes the number of visible gradient shades. Modes: **Auto** (zoom-adaptive), **Manual 0–20**, **None** |
| S5 | **Contrast & brightness** | Sliders over the final colour output (advanced settings) |
| S6 | **Persistent book semantics** | Price levels keep their **last-seen size** when they leave the transmitted range and display that size until the level returns (exchange may transmit only N levels). **Active-range override** (fixed N levels) with two boundary lines on the numeric column |
| S7 | **Volume dots overlay** | Executed trades as dots at (price, time): **minimum accountable size** (below → no dot), **dot size** scaling, **transparency**, drawing type: **gradient / solid / pie** by aggressor-side split; 2D (3D deferred to Phase 2) |
| S8 | **COB column** | Numeric DOM ladder beside the pane: per-level size + cumulative, spread row, BBO row; configurable column set |
| S9 | **BBO lines + recentering** | Bid/ask lines on the pane; **auto-recentering** on BBO or on trades with a percentage-tolerance control (prevents jitter); manual recentering always available |
| S10 | **Session recording** | Record live depth + trade events to a session file (parquet, workspace/MY DATA visible); start/stop; size limits; session listing + delete. *Replay playback* is Phase 2 (the grid engine consumes the same event stream) |
| S11 | **Depth reset** | Book state resets per trading session or at a configurable interval (advanced setting) — prevents cross-day contamination of last-seen sizes |

### 1.2 Phase-2+ (explicitly out of scope for this document)

Footprints/clusters · Delta/CVD pane · Volume profile · Replay playback UI · 3D dots ·
Tradermap-style MM filtering · iceberg/stops tracker · absorption indicator · multibook
aggregation · nanosecond-scale ultra-fine zoom · one-click trading from the pane ·
liquidation indicators.

### 1.3 Data honesty rule (product invariant)

The pane renders **real depth only where real depth exists** (vault / MBO / broker feed).
Where an instrument has no depth source, the pane shows an explicit
*"No depth data for {symbol}"* state with the reason — never silent synthesis.
The **demo** source (deterministic, labelled DEMO in the UI) is the only synthetic path,
matching the terminal's existing provider model.

## 2. Data model & contracts (spec, not code)

### 2.1 Events (source-agnostic)

- **DepthEvent**: `symbol, ts, type (SNAPSHOT | DELTA), bids [(price, size)…], asks [(price, size)…]`
  — size 0 in a delta = level removed. Prices are the instrument's tick grid.
- **TradeEvent**: `symbol, ts, price, size, side (BUY | SELL | INFERRED-BUY | INFERRED-SELL | UNKNOWN)`
  — extends the existing `stream()` tick dict with an optional `side` (backward compatible:
  existing providers unaffected). **Side availability is confirmed per source (§2.3):**
  (a) MBO events carry exchange-stamped side on covered futures;
  (b) the crypto feed via ccxt carries exchange-stamped side on most exchanges;
  (c) for the rest, the public live feed has no aggressor side, so it is inferred at
  the top of book from the tick's own bid/ask (print ≥ ask → buy, ≤ bid → sell — exact
  for trades at the touch, and labelled *inferred* in the UI, never presented as
  exchange-stamped).

### 2.2 Provider contract extension (follows the existing `NotSupported` pattern)

Optional methods on `Provider` — a source implements what it can; the UI degrades by
capability, exactly like `quote()`/`stream()` today:

- `depth_history(symbol, from, to, column_ms, max_levels) → [DepthEvent]` — depth history
  for initial pane fill and replay.
- `depth_stream(symbols) → AsyncIterator[DepthEvent]` — live depth (snapshots + deltas).
- Existing `stream()` tick dicts gain the optional `side` field.

**This is the whole multi-asset discipline:** vault, brokers, demo, and any future source
all arrive through the same two methods. Nothing special-cases a source (product invariant).

### 2.3 Sources and data reality (researched and confirmed 2026-09-16)

Research performed against primary sources, all checked 2026-09-16: the installed
`lse-data` client (0.14.0), the terminal's own MBO integration code, the company's
public API/WebSocket documentation (api.londonstrategicedge.com), the public
GitHub repos (lse-data, brue-connect, brue, lse-terminal), and **direct probes of
the production API** (`GET /vault/mbo/contracts` and `/vault/meta` both answer
`{"detail":"missing x-api-key"}` — the MBO door is live at that exact path and
key-gated). Additional checks: public `lse-data` GitHub `main` is byte-identical
to the installed client and contains **no** depth/MBO methods (the vault MBO door
is consumed engine-side, exactly as the terminal already proxies it);
`brue-connect`'s public `SPEC.md` (1,005 lines) is the broker-connector protocol
only — the MBO capture itself is server-side, not part of the public spec surface.
Findings:

- **The public data surface carries no order-book depth for any symbol.** The live
  WebSocket tick is exactly `{symbol, price, bid, ask, volume, ts}` (top of book only);
  history is candles (down to 1s) and a raw tick tape with no side and no depth. The
  public docs state `/catalog` + `/meta` are the source of truth for what exists.
- **There is exactly one depth source today: the vault's MBO (order-by-order) futures
  capture, plan-gated.** Endpoints `/vault/mbo/contracts` and `/vault/mbo/events`
  (the terminal already proxies them at `/api/mbo/*`). Event shape:
  `seq` (exchange sequence no.), `ts`, `price`, `size`, `type ∈ {NEW, CHANGE, DELETE}`,
  `side ∈ {BUY, SELL}` — true L3, from which the exact book (L2) is reconstructable.
  Entitlement is server-side per key plan; most keys report `available:false`.
  Access is REST-only, sliding windows to 60s, 1–5s visibility lag (batch flush),
  20,000 events per window. The terminal's code comment: *"the vault door is REST-only
  for now; a push stream is the planned upgrade."*
- **The terminal already renders a heatmap prototype on this data.** The Level-3 (MBO)
  rail (app.js) builds a "stacking heatmap": net resting size per price (NEW adds,
  DELETE subtracts) over a 60s rolling buffer, seq-gated dedupe, per-level buy/sell
  counts — polling `/api/mbo/events` every 2s. That rail is the in-product precedent:
  the Depth Heat pane generalises exactly this engine into a full chart pane with
  history, colour control and recording.

- **Crypto L2 evaluated 2026-09-16:** the proposed **CryptoFeed is rejected on
  license** — it is AGPL-3.0 (+ 7(b) attribution); bundling it into the distributed
  terminal would copyleft the whole product. The same class of legal boundary as the
  no-license reference repo: reference only, zero code. **ccxt (MIT) is the adopted
  source** for crypto depth: its websocket streaming (formerly paid "CCXT Pro") has
  been part of the free MIT package since v1.95, covers 100+ exchanges, and public
  book/trade channels on the major exchanges need no API key ($0).

**Sources, in wiring order (real data first, per founder directive 2026-09-16):**

1. **Vault MBO (futures, plan-gated) — the real-data launch surface.** Wires through
   `depth_stream` (poll `/vault/mbo/events` at the rail's cadence, seq-gated, engine-side)
   and `depth_history` (same door, wider windows — subject to the §8 server-side
   confirmations on retention/window). Reuses the L3 rail's proven client logic, moved
   engine-side so the pane, the rail, and recording share one MBO feed per symbol.
2. **Crypto public L2 via ccxt (MIT, declared pinned dependency).** A thin adapter
   maps `watch_order_book` (snapshot + deltas) → `DepthEvent` and `watch_trades` →
   `TradeEvent` with exchange-stamped side. **Venue scope (locked 2026-09-16):** one
   venue per symbol — **Coinbase primary** (real USD books matching the platform's
   USD-quoted symbols; public keyless channels; US-regulated reference venue),
   **Kraken fallback**. No multi-venue aggregation (a paid add-on even at Bookmap;
   out of scope). **L3 does not exist publicly in crypto** (any exchange) — the public
   ceiling is L2 + side-stamped trades, which is exactly what the heatmap paints
   (Bookmap's own crypto heat is L2-based too). **Live only** — exchanges expose no L2
   history — so history = what the terminal's own session recorder captures (S10,
   ships in Phase 1); the pane shows its honest range.
3. **Broker adapters** — where a connected broker's feed carries L2, the adapter offers
   it through the same contract (generic path, reconciliation as today).
4. **Demo provider extension** — deterministic synthetic L2: seeded per (symbol, date);
   50–100 levels/side on the tick grid around the mid; log-normal sizes decaying with
   distance; scripted, reproducible dynamics — standing walls, **iceberg refills** (size
   restored after hits), **pulls on approach** (spoof behaviour), sweep-throughs. Emits
   SNAPSHOT at start, DELTAs on the existing ~1s tick cycle; demo ticks carry `side`.
   Role is explicitly fallback + development: deterministic compliance/test source
   (`deterministic=True` pattern) and golden-image fixture source. Clearly labelled
   DEMO; it is never the first choice for any real symbol.

## 3. Engine design (`lse_terminal/engine/orderflow/`, new module)

All compute local; no new process; single event loop (existing model).

| Unit | Responsibility | Done criterion |
|---|---|---|
| `book.py` | Persistent L2 book: dict price→last-seen size; SNAPSHOT/DELTA application; level removal; active-range tracking (last-N override + boundaries); BBO; depth-reset policy (S11) | Unit tests: snapshot/delta semantics, removals, last-seen persistence across out-of-range excursions, BBO edges |
| `grid.py` | **DepthGrid**: time columns (configurable 100ms/500ms/1s/5s, default 1s) × price rows (tick grid); per-cell value = size at (column, price) — **last** value observed in the column window; ring-buffer bounded; viewport query returns a dense column×row matrix for the renderer; history ingest from `depth_history` | Unit tests: column finalization, viewport slicing at zoom levels, ring-buffer eviction, ingest determinism (same events → same grid) |
| `normalize.py` | Pure colour-normalization: cut-off modes (percentile over a rolling session window / exact size), vertical smoothing (shade quantization, auto = f(zoom)), contrast/brightness/dimming → 256-entry LUT per scheme | Unit tests: monotonicity, cut-off saturation behaviour (exact + percentile), smoothing level counts, LUT determinism |
| `session.py` | Recording: append DepthEvents + TradeEvents to timestamped parquet in the workspace (MY DATA visible); start/stop; max-size rotation; session list/delete; depth-reset event markers | Unit tests: parquet round-trip, rotation, list/delete; deterministic replay-ability of a recorded session (bit-identical grid rebuild) |
| `service.py` | Orchestration: source resolution per symbol (capability-based, fail-open), WS coalescing (depth coalesced to ≤ ~15 Hz/symbol; never drops the latest state), API handlers | Integration tests: capability degradation, coalescing bound, latest-state-wins |

**Normalization defaults (per research on why heatmaps "don't show anything"):**
percentile cut-off **auto-tuned per instrument** (session p95/p5 of observed sizes) as the
default, exact-size mode available, per-instrument settings persistence. Documented in the
in-app walkthrough (guide.md gains a Depth Heat section — the product's docs model).

## 4. API surface (engine)

| Endpoint | Purpose |
|---|---|
| `GET /api/orderflow/depth?symbol&from&to&column_ms&max_levels` | History grid fill for pane open (sourced per §2.3; 404-with-reason when no source) |
| `GET /api/orderflow/book?symbol` | Current L2 snapshot (also feeds the COB column; reuses broker_hub book state where a broker is connected) |
| `POST /api/orderflow/record` · `POST /api/orderflow/record/stop` | Session recording control |
| `GET /api/orderflow/sessions` · `DELETE /api/orderflow/sessions/{id}` | Recording management (workspace/MY DATA) |
| WS topic `depth:{symbol}` | Live coalesced depth events (SNAPSHOT on subscribe, then DELTAs) |

Gating: **plan-gated per key plan** (server-driven via the directory, like MBO L3 today);
user-owned sources (demo, broker, imported) are never gated (existing rule). No auth/
isolation changes (per-user workspace files, same as notebooks).

## 5. Frontend (pane, renderer, controls)

### 5.1 Pane & sync

- New pane type **`DepthHeat`** in the existing multi-pane layout (grid presets, up to
  8 panes). **Time axis: hard-synced** with the main chart (zoom/pan/crosshair).
  **Price axis: independent** with auto/manual recentering (S9) — the heatmap recenters
  on its own BBO/trades, exactly like the reference product.
- Pane settings persist per instrument (same pattern as drawings/indicator setups).

### 5.2 Renderer (the performance-critical piece)

A dedicated **`HeatmapRenderer`** — canvas 2D, **decoupled from React state**, driven by
its own `requestAnimationFrame` loop:

- Typed-array back-buffer (Float32Array, columns × rows); each finalized column →
  LUT-mapped **ImageData** → `putImageData` (bulk path); only the **visible viewport**
  renders; live column updated in-place per coalesced depth event.
- Precomputed 256-entry LUT per (scheme, cut-offs, smoothing, contrast, brightness);
  LUT rebuild on settings change (cheap), not per frame.
- Dots pass: aggregated per-column trade dots (min-size filter applied), arc fills with
  the three drawing types; transparency control.
- **Performance budget (measured at gate H10):** ≥ 40 FPS live on the demo feed (1s
  columns, ~300 visible rows) on mid-range hardware; first paint ≤ 100 ms for a 4-hour
  history load; p95 frame < 25 ms; adaptive column coarsening when frame budget is
  missed (degrade resolution, never drop the loop); grid memory bounded by the ring
  buffer.
- Interaction: wheel = time zoom; shift+wheel = price zoom; drag = pan; right-click =
  pane settings (matches existing chart conventions).

### 5.3 Controls (placement per research: contrast slider above the pane + full window)

Settings window (studies-style, right-click or toolbar):
- Colour: scheme (heat / greyscale) · intensity · dimming · **apply globally**
- Cut-off: upper & lower, **percent slider or exact size** (both modes)
- Vertical smoothing: Auto / Manual 0–20 / None
- Contrast & brightness sliders
- Dots: enable · min accountable size · dot size · transparency · drawing type (gradient/solid/pie)
- Active range override (N levels) + boundary lines on the COB column
- Recentering: Auto (BBO / trades) / Off · tolerance %
- Depth reset: session / interval

COB column: numeric ladder component (size, cumulative, spread, BBO row), column set
configurable; reuses the existing book-rendering primitives from the broker UI.

## 6. Sequencing & gates (each item lands green or not at all)

| # | Item | Surface | Gate (exit criterion) | Status |
|---|---|---|---|---|
| H1 | DepthEvent/TradeEvent models + Provider contract extension (`depth_history`, `depth_stream`, tick `side`) | engine/contracts | No behavior change; **full suite green**; capability listing in `/api/providers` shows new caps | ✅ 2026-09-16 |
| H2 | `book.py` + `grid.py` + `normalize.py` + unit tests | engine | All §3 unit tests green; determinism tests (same events → same grid/LUT) | ✅ 2026-09-16 |
| H3 | Demo provider L2 extension + deterministic fixtures | engine | Heatmap works end-to-end **in-process** on DEMO symbols, no key; fixtures committed for golden images | ✅ 2026-09-16 (golden PNGs land with H10) |
| H4 | API + WS (depth/book/record/sessions + `depth:{symbol}` topic) | engine/API | Integration tests: history fill, snapshot-on-subscribe, coalescing bound, degradation reasons | ✅ 2026-09-16 |
| H5 | Pane layout integration + `HeatmapRenderer` (viewport, LUT, rAF loop) on demo feed + time/crosshair sync | frontend | Pane renders live demo depth; sync verified; no React-state frame dependency | ✅ core 2026-09-16 — pane + renderer + grid wiring shipped & built; **on-screen paint check pending** (built headless; confirm in the app next session), perf budget at H10 |
| H6 | Controls: settings window + contrast slider + persistence + apply-globally | frontend | All §5.3 controls work and persist per instrument; scheme global apply verified | ✅ 2026-09-16 (window + global scheme broadcast; pie dots, auto smoothing, eased recenter shipped in the renderer) |
| H7 | COB column + BBO lines + dots overlay (gradient/solid/pie) | frontend | Dots render from side-carrying streams (demo); COB live-updates; boundary lines with active-range override | ✅ 2026-09-16 (pixel-aligned ladder w/ ClientBook live feed; dots shipped with the H6 renderer pass) |
| H8 | Session recording (parquet, MY DATA listing, limits) | engine + frontend | 60 s recording → valid parquet, listed, deletable; bit-identical grid rebuild from the file (replay-readiness proof); pane records/lists/loads recordings | ✅ 2026-09-16 (engine slice 3f067fb; pane record/list/load wiring this slice) |
| H8b | Crypto L2 adapter (ccxt, MIT — declared pinned dependency, THIRD-PARTY-NOTICES entry) | engine | Live `depth_stream` for platform crypto symbols via major-exchange public feeds (keyless); exchange-stamped trade side; unit tests against recorded fixtures; symbol map; dependency pinned | ✅ 2026-09-16 (Coinbase primary / Kraken fallback; live-only degradation + SNAPSHOT BBO shipped) |
| H9 | MBO depth wiring (futures, plan-gated) + broker L2 | engine | Confirmed door: the L3 rail's MBO client logic moves engine-side and feeds `depth_stream` / `depth_history` for covered contracts — **real heat on MBO-entitled keys from day one**; broker L2 where adapters offer it. The §8 answers only widen this item's *history reach* — live heat does not depend on them | open |
| H10 | Perf pass + golden-image visual regression + e2e + guide.md section + docs | all | §5.2 budget measured & green in CI; golden PNGs (deterministic demo fixture) in CI with tolerance; Playwright e2e: boot → demo → pane paints ≤ N s from first depth event; walkthrough section merged | open |

**Dependency order:** H1→H2→H3→{H4∥H5}→{H6∥H7}→H8→{H8b∥H9}→H10. H5 may start after H3
(demo feed available); H8b and H9 are independent of each other and of the pane work;
H9's open items (§8) never block live heat (contract-first).

## 7. Testing & quality bar (professional standard)

- **Unit** — book semantics, grid finalization/viewport/eviction, normalization
  monotonicity + both cut-off modes + smoothing, session round-trip, coalescing.
  These run in the M1 CI matrix (py 3.10 + 3.12).
- **Integration** — API + WS round-trips; capability degradation (no source → clean
  reason); per-user workspace isolation.
- **Visual regression** — golden PNGs from the deterministic demo fixture; CI-fail on
  unapproved renderer drift (the "wrong implementation" guard the founder asked for —
  the renderer is diff-checked, not eyeballed).
- **E2E** — extends the M1 Playwright skeleton (one command, CI-runnable).
- **Performance** — measured budgets in H10, not aspirational; adaptive degradation
  path tested under a synthetic 10× event-rate load.
- **Replay-readiness invariant** — every recorded session must rebuild a **bit-identical**
  grid (H8 gate); this is what makes Phase-2 replay and depth-based backtests honest.

## 8. External dependencies & open items

Data research is **done** (§2.3, confirmed 2026-09-16). The only open items are three
precise server-side questions — the MBO capture lives in *your* vault, so these are
answerable from the vault's own code/configuration, no third party involved:

| # | Question (precise) | Why it matters | Blocks |
|---|---|---|---|
| Q1 | **MBO coverage & entitlement** — which futures contracts are in the capture (the `/mbo/contracts` rows on an entitled key), and which key plan grants the entitlement (so the UI can show the gate reason, not a dead button)? | Defines the day-one real-data symbol list and the pane's "plan-gated" messaging | H9 symbol list only |
| Q2 | **MBO history window & retention** — can `/vault/mbo/events` serve windows beyond the 60s the terminal currently clamps to (e.g. a full trading session), and how long is the capture retained? | History depth of the pane. If no: history = what the terminal itself records (S10 ships in Phase 1) and the pane shows its honest range | H9 history reach only — **live heat is unaffected** |
| Q3 | **MBO trade prints** — do the MBO events include executed prints, or resting-order events (NEW/CHANGE/DELETE) only? | Volume dots + CVD on MBO symbols (S7). If no: dots there fall back to the top-of-book inference labelled as such | H7 dot source for MBO symbols only |

Nothing else is external: brokers ride the existing adapter contract, the demo source is
self-contained, and the frontend work (H5–H8) depends on none of Q1–Q3.

| Other | Owner | Blocks |
|---|---|---|
| M0 sign-off (D1/D2/D4) + this phase's placement (§9) | Founder | All |

## 9. Placement (proposal for sign-off)

**M-OF (Phase 1: Depth Heat) runs immediately after M1** — M1 is the CI/dependency safety
net (≈1–2 weeks-equivalent) required before a feature of this size touches the codebase;
building the renderer on a suite that can ship red violates the plan's working
agreements. M2 (execution hardening) follows. If the founder wants Depth Heat even
earlier, the defensible compression is: **M1-lite** (CI + brue-connect boundary only,
no version stamping) then M-OF — the founder's call, flagged as a risk acceptance.

## 10. Non-goals restated (contractual, Phase 1)

No footprints/delta/profile (Phase 2+) · no replay playback UI (Phase 2) · no "Bookmap"
naming anywhere · no synthetic data presented as real (§1.3) · no new processes · no
database (file-based state, per product model) · no mobile treatment (desktop-first,
per plan) · no trading actions from the pane (Phase-2+ decision).
