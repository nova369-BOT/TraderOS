# F1 Phase 1 — Depth Heat (liquidity heatmap): Implementation Plan

**Product of London Strategic Edge** · v1.0 of this document · **Date:** 2026-09-16
**Parent:** `PLAN.md` §3.5 (Feature request F1 — Order Flow Suite)
**Scope:** the heatmap phase — build and ship first, per founder directive (2026-09-16).
Footprints come in Phase 2; nothing in this document depends on them.

> **Status: planning — no implementation.** This document is the contract for the build:
> every work item has an owner surface (engine / API / frontend / demo / data), a done-
> criterion, and a gate.

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
- **TradeEvent**: `symbol, ts, price, size, side (BUY | SELL | UNKNOWN)` — extends the
  existing `stream()` tick dict with an optional `side` (backward compatible: existing
  providers unaffected; `UNKNOWN` where the source has no aggressor side).

### 2.2 Provider contract extension (follows the existing `NotSupported` pattern)

Optional methods on `Provider` — a source implements what it can; the UI degrades by
capability, exactly like `quote()`/`stream()` today:

- `depth_history(symbol, from, to, column_ms, max_levels) → [DepthEvent]` — depth history
  for initial pane fill and replay.
- `depth_stream(symbols) → AsyncIterator[DepthEvent]` — live depth (snapshots + deltas).
- Existing `stream()` tick dicts gain the optional `side` field.

**This is the whole multi-asset discipline:** vault, brokers, demo, and any future source
all arrive through the same two methods. Nothing special-cases a source (product invariant).

### 2.3 Sources, in wiring order

1. **Demo provider extension** (ships with Phase 1) — deterministic synthetic L2:
   seeded per (symbol, date); 50–100 levels/side on the tick grid around the mid;
   log-normal sizes decaying with distance; scripted, reproducible dynamics — standing
   walls, **iceberg refills** (size restored after hits), **pulls on approach** (spoof
   behaviour), sweep-throughs. Emits SNAPSHOT at start, DELTAs on the existing ~1s tick
   cycle; demo ticks carry `side`. Serves three roles at once: day-one functionality
   without a key, the deterministic compliance/test source (`deterministic=True` pattern),
   and the golden-image fixture source.
2. **LSE vault** — where it carries L2/MBO depth history (futures MBO is already served
   and plan-gated via the existing `/api/mbo/*` surface). Wires through `depth_history` /
   `depth_stream` once the recon confirms the schema (see §8).
3. **Broker adapters** — where a connected broker's feed carries L2, the adapter offers
   it through the same contract (generic path, reconciliation as today).

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

| # | Item | Surface | Gate (exit criterion) |
|---|---|---|---|
| H1 | DepthEvent/TradeEvent models + Provider contract extension (`depth_history`, `depth_stream`, tick `side`) | engine/contracts | No behavior change; **full suite green**; capability listing in `/api/providers` shows new caps |
| H2 | `book.py` + `grid.py` + `normalize.py` + unit tests | engine | All §3 unit tests green; determinism tests (same events → same grid/LUT) |
| H3 | Demo provider L2 extension + deterministic fixtures | engine | Heatmap works end-to-end **in-process** on DEMO symbols, no key; fixtures committed for golden images |
| H4 | API + WS (depth/book/record/sessions + `depth:{symbol}` topic) | engine/API | Integration tests: history fill, snapshot-on-subscribe, coalescing bound, degradation reasons |
| H5 | Pane layout integration + `HeatmapRenderer` (viewport, LUT, rAF loop) on demo feed + time/crosshair sync | frontend | Pane renders live demo depth; sync verified; no React-state frame dependency |
| H6 | Controls: settings window + contrast slider + persistence + apply-globally | frontend | All §5.3 controls work and persist per instrument; scheme global apply verified |
| H7 | COB column + BBO lines + dots overlay (gradient/solid/pie) | frontend | Dots render from side-carrying streams (demo); COB live-updates; boundary lines with active-range override |
| H8 | Session recording (parquet, MY DATA listing, limits) | engine | 60 s recording → valid parquet, listed, deletable; bit-identical grid rebuild from the file (replay-readiness proof) |
| H9 | Vault/MBO + broker depth wiring | engine | Recon-driven: vault `depth_history`/`depth_stream` live where data exists (plan-gated); broker L2 where adapters offer it. **If recon not ready at gate: phase ships on demo + broker paths; vault lands later with zero contract changes** |
| H10 | Perf pass + golden-image visual regression + e2e + guide.md section + docs | all | §5.2 budget measured & green in CI; golden PNGs (deterministic demo fixture) in CI with tolerance; Playwright e2e: boot → demo → pane paints ≤ N s from first depth event; walkthrough section merged |

**Dependency order:** H1→H2→H3→{H4∥H5}→{H6∥H7}→H8→H9→H10. H5 may start after H3
(demo feed available); H9 is the only externally-dependent item and never blocks the
others (contract-first).

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

| Item | Owner | Blocks |
|---|---|---|
| **Recon brief: vault depth coverage** — what L2/MBO history exists per asset class, tick-side availability, key-plan gating | Data team (founder) | H9 only — nothing else |
| Place plan-gating rows for depth in the directory API (server-side) | LSE API team | H9 (live vault path) |
| M0 sign-off (D1/D2/D4) + this phase's placement (§9) | Founder | All |

The recon brief is a one-page ask: for each asset class — depth history (yes/no, depth
levels, granularity, retention) · tick aggressor side (yes/no) · MBO plan gates ·
broker L2 availability per connected adapter. Answer decides *which real instruments show
real depth on day one*; it cannot change this plan's architecture.

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
