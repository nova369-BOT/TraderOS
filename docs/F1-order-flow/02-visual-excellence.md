# F1 · Depth Heat — Visual Excellence Architecture (v2)

**Product of London Strategic Edge** · 2026-09-16 · companion to `01-depth-heat.md`
**Trigger:** founder directive — research DeepCharts/DeepDom (and the wider
order-flow reference class) and design the architecture that takes our pane
to the maximum.

> Scope of this document: the **visual/interaction architecture**. Data
> contracts, sources and honesty rules are unchanged and live in
> `01-depth-heat.md` (§1.3 invariants still bind: real depth only where it
> exists, demo labelled, no invented numbers).

---

## 1. Research findings (what the reference class actually looks like)

Reference images archived in `research/`:

| File | Source | What it teaches |
|---|---|---|
| `deepdom-heatmap-es.jpg` | DeepCharts **DeepDom** (ES, dxFeed MBO) | The target look: **side-aware heat** — violet liquidity above price, green below; near-black base; **right axis fused with a live ladder** (per-level size numbers + side-coloured size column, BBO price chips boxed on the axis); price path as step lines with **translucent sphere bubbles** sized by print; top-left **Imb / Cvd gauges**; bottom **buy/sell-split volume histogram** sharing the time axis; bottom overlay toggle bar (CANDLES · BUBBLES · VOLUME · VWAP · CVD · …) |
| `bookmap-cob-tns-walls.jpg` | Bookmap (NVDA) | **Walls pop**: hot red/orange/yellow bands with a soft glow over a calm teal-blue field; candles over heat; **big-trade tags** (`+45k`, `−8k`) on the chart; **COB column** = price + size number + red/green size bar in the axis gutter; **T&S panel** with min-size filter and ALL/BUY/SELL radio; replay toolbar |
| `bookmap-bubbles-blues.png` | Bookmap (ESH9) | Cool blue ramp family (light = heavy) with **yellow hot band**; **bid/ask step lines** (green/red) hugging price; bubbles drawn as **pie-split spheres** (aggressor mix); fine 0.25 tick axis; dotted vertical time grid |
| `volumetrica-footprint-es.png` | Volumetrica/DeepCharts web (ES) | Footprint at pro standard: per-level **sell×buy numbers inside candles**, **yellow imbalance boxes**, POC emphasis, right-side session volume profile, dashed swing curves, bottom indicator strip |
| `deepcharts-marketing-footprint.webp` | DeepCharts marketing | The story they sell: price level + volume profile + imbalance + cumulative delta in one candle — i.e. **numbers inside the candle** is the retail-pro expectation |
| `volumetrica-platform.png` | Volumetrica platform chrome | Chrome standard: left tool rail, right trade panel with big coloured actions, right price axis always on, calm navy surfaces |

Written sources: DeepDom help-centre *Heatmap* article (colour semantics:
red/orange heaviest → yellow → white → blue → black; **sell limits purple,
buy limits green**; 1 h default liquidity history; right-click → Source
Settings; MBO filters *Min. Volume* / *Exclude Market Maker*), Optimus
Futures' DeepCharts page (Deep Prints modes: Classic Footprint / Orderflow
Profile / Delta Profile / Big Trades; Deep Trades auto-calibrated
thresholds; Deep Replay tick replay).

### 1.1 The five qualities that make reference heatmaps read as "pro"

1. **Depth has a glow, not edges.** Walls bloom; the field is calm and dark;
   hot levels are *events*. Our current field is a flat spectrogram — every
   band shouts equally, hard 1 px edges, no atmosphere.
2. **The price axis is part of the picture.** Right-edge ticks, BBO chips,
   boxed last price, and (Bookmap/DeepDom) the ladder numbers living *in the
   axis gutter*. We currently have **no permanent price axis at all** — only
   a hover tag. This single omission is the largest "unfinished" signal.
3. **Price and prints ride the heat.** Step bid/ask lines + sphere bubbles
   (side-coloured, pie-split, size-scaled) + big-trade tags. Our dots are
   flat 2-D circles without the price path — they read as confetti.
4. **Context strips share the time axis.** Volume (side-split), CVD,
   imbalance gauges. Ours: none.
5. **Time reads like a terminal.** Dotted vertical time gridlines + quiet
   labels; ours has labels but no gridlines, and the header chrome is
   utilitarian rather than composed.

---

## 2. Gap analysis (current build vs reference)

| Element | Reference standard | Ours today | Verdict |
|---|---|---|---|
| Heat field | calm dark base, glowing walls, side-aware or blue family ramps | single rainbow LUT, hard bands | **rebuild** |
| Price axis | ticks + BBO chips + boxed last price, ladder-in-gutter | absent | **build** |
| COB | fused with axis gutter (Bookmap) or aligned ladder (ours) | separate aligned ladder | upgrade to fused mode |
| Price path | step bid/ask/mid lines | absent | **build** |
| Trades | sphere bubbles, pie-split, big-trade tags + auto threshold | flat dots (3 draw types) | **upgrade** |
| Candles over heat | standard toggle | absent | **build** |
| Sub-panels | volume split + CVD + imbalance gauges | absent | **build** |
| Time grid | dotted verticals | labels only | small build |
| Footprint | in-candle numbers, yellow imbalance boxes, POC | zone bars + tints + Δ footer | **upgrade** |
| T&S | min-size filter, ALL/BUY/SELL | dotMinSize only | build mini-panel |
| Replay | tick replay (Deep Replay) | Phase 2 per plan | deferred (plan) |
| Settings | right-click source settings | ⚙ + right-click window ✓ | keep |
| Honesty | n/a | real-only, labelled demo | **keep — differentiator** |

---

## 3. Target architecture — "Depth Heat v2"

Everything below lands in the existing renderer/pane modules; **no engine
change** is required (the data we already stream — per-level sizes, side-
stamped prints, BBO — is sufficient). Each phase is an independent gate:
type-clean + bundle + goldens re-baselined + full suite green.

### V1 — The field and the axis (the look)

New module `frontend/src/components/chart/depth/` **`heatVisuals.ts`**:

- **Ramp library** (all three, selectable, persisted):
  - `deepdom` — side-aware: asks ramp black→#150826→#5b21b6→#a855f7→#e9d5ff;
    bids ramp black→#04150b→#15803d→#4ade80→#d9fbe2. Levels coloured by the
    side of the book they belong to (the grid already knows bid vs ask keys
    from BBO at fold time — store a side bit per level).
  - `bookmap` — cool family black→#082233→#0e6ba8→#9cc9e8→#e8f7ff with a
    **hot overlay** for the top decile (red→orange→yellow) so walls burn
    against calm water.
  - `classic` — the current heat ramp (kept as an option).
- **Perceptual intensity**: index = (size/hi)^γ with γ≈0.55 default (sqrt
  feel) instead of linear — small liquidity stays visible, walls saturate.
  (Replaces the linear `sizeToIndex` mapping in the pane LUT path; engine
  `normalize.py` gains the same γ param to stay in lockstep.)
- **Glow pass**: after the offscreen blit, composite a blurred copy
  (downscale→box-blur→upscale, 2 taps) masked to levels above the 90th
  percentile, `globalCompositeOperation = 'lighter'`, alpha ≈ 0.35. Cheap
  (one small offscreen), huge atmosphere win.
- **Column interpolation toggle** ("smooth"): bilinear blend between
  adjacent finalized columns when painting the offscreen image (off by
  default = crisp; on = the DeepDom watercolour feel).
- **`priceAxis.ts`** — right gutter (64 px, inside the canvas): nice-step
  ticks + labels; **BBO chips** (teal/red boxed prices); **last-price box**
  with side colour; dotted horizontal tick gridlines across the field.
- **Time grid**: dotted verticals at the existing nice-time steps.

*Gate V1:* the pane, at a glance, reads as `research/deepdom-heatmap-es.jpg`'s
calm+glow family; goldens re-baselined per scheme (3 PNGs).

### V2 — Price path + bubbles v2 (`pathBubbles.ts`)

- **Step lines**: bid (teal) / ask (red) stepped lines from the carried book
  per finalized column + a quiet mid line — exactly the Bookmap/DeepDom
  signature overlay.
- **Sphere bubbles**: radial-gradient spheres with a specular highlight;
  pie-split by cell aggressor mix (we already aggregate for pie dots);
  radius ∝ √size; soft shadow.
- **Big-trade engine**: per-symbol rolling median of print size; prints
  ≥ k×median (k=6 default, configurable) get a ring + a **size tag chip**
  (`+45k` style, side-coloured) exactly like Bookmap's tags — this is the
  single most "pro" retail signal and we have the data for it.
- **Candles overlay toggle**: OHLC per N-second bucket derived from prints
  (honest: built from trades we carry; labelled "trade-derived" when the
  source has no candle feed of its own).

*Gate V2:* bubbles+path render on demo & crypto; big-trade tags appear on
scripted demo walls (deterministic → golden-able).

### V3 — Context strips (`subpanes.ts`)

Bottom stack inside the pane (collapsible, persisted):
- **Volume histogram** per bucket, buy/sell stacked (teal/purple), shared
  time axis (reuse footprint aggregation).
- **CVD line** over it.
Top-left **gauge strip**: `Imb` and `Cvd` mini-bars with marker (DeepDom's
exact motif).

*Gate V3:* strips align with the heat's time zoom/pan (same tsToX), verified
by a golden with strips enabled.

### V4 — Fused ladder + T&S (`ladderFusion`)

- COB gains **fused mode**: size numbers + bars move *into the price-axis
  gutter* (Bookmap layout); the separate ladder remains as an option.
- **T&S mini-panel** (right of COB or as a drawer): time/price/size rows,
  min-size filter, ALL/BUY/SELL — fed by the same trade stream.

*Gate V4:* both modes persist per instrument; boundary lines (S6) render in
fused mode too.

### V5 — Composed chrome

- Bottom **overlay toggle bar** (CANDLES · BUBBLES · VOLUME · CVD · VWAP ·
  GRID) mirroring DeepDom's; header slimmed to symbol + source chip + view
  switch; **colour-scale legend** (a 90 px ramp strip with lo/hi size labels)
  in the settings window and as an optional pane footer.
- VWAP line (trade-derived) joins V2's overlay set.

*Gate V5:* screenshot-parity review against `research/` (founder signs off).

### 3.1 Performance budget

All V1–V3 passes operate on the existing offscreen pipeline; the glow pass
adds one small blur per dirty frame. Budget (H10 harness extended): frame
work while idle = 0 (dirty flag unchanged); on-data frame ≤ 4 ms at 1080p
pane (asserted in a Node-free perf test using `performance.now()` around
`paint()` in a headless smoke when a browser exists; until then the engine
budgets stand and the renderer stays allocation-free per frame). WebGL is
**not** needed at this scope; kept as a named escape hatch only.

### 3.2 Settings model additions (persisted per instrument)

`scheme: 'deepdom' | 'bookmap' | 'classic' | 'greyscale'`, `gamma`,
`glow: boolean`, `smoothColumns: boolean`, `showPath`, `showCandles`,
`bigTradeK`, `subpanes: boolean`, `ladderMode: 'fused' | 'panel'`,
`showTsPanel` — all with defaults chosen so **first open already looks like
the reference** (deepdom scheme + glow + path + bubbles on).

### 3.3 Lockstep rules

- `normalize.py` mirrors any new mapping (γ, ramps) with unit tests;
  goldens re-baselined per scheme via `UPDATE_GOLDEN=1`.
- Honesty invariants unchanged: ramps/glow are *presentation*; cut-offs
  still decide saturation; sources still labelled; blank-where-no-data
  still enforced (footprint empty state, candle overlay labelled
  trade-derived).

---

## 4. Sequencing

V1 → V2 → V3 → V4 → V5, each landing green or not at all (working
agreement). Estimated order of visual impact per effort: **V1 ≫ V2 > V3 >
V4 > V5**. If the founder wants the maximum *now*, V1+V2 alone close ~80%
of the perceived gap.

---

## 6. Implementation log

**2026-09-16 — V1+V2 SHIPPED (founder GO, with the attached DeepDom frame
as the target: walls, bubbles, right ladder, bottom histogram).**

- `heatVisuals.ts` — ramp library (`deepdom` side-aware ember/water tuned
  against `research/deepdom-heatmap-es.jpg`, `bookmap` water+hot-top,
  `heat`, `greyscale`) + LUT builder; γ moved into `sizeToIndex`
  (lockstep mirror in `normalize.py`, unit-tested).
- Renderer — per-level side tracking through the fold (`sides` per column),
  intensity+side offscreen field, per-side LUT colourise, **glow pass**
  (idx ≥ 228 mask, blurred additive composite), smooth-columns toggle,
  dotted time grid, permanent **58 px price axis** (`priceAxis.ts`: nice
  ticks, dotted horizontal grid, BBO chips, side-coloured last-price box).
- `pathBubbles.ts` — stepped bid/ask path from carried per-column BBO;
  pie-split **sphere bubbles** (specular + rim shading; sphere shading also
  upgrades the old gradient dots); **big-trade engine** (rolling median,
  ring + `+Nk` tag at k×median, k default 6); **trade-derived candles**
  (default off, labelled); **volume strip** (buy/sell-split histogram +
  quiet CVD line) pulled into V2 scope per the founder's annotated frame.
- Defaults on first open: deepdom, γ 0.6, glow on, path on, bubbles pie,
  strip on, candles off — the reference look without touching settings.
- Gates: typecheck clean; bundle rebuilt; **new deterministic golden**
  `tests/data/depth_heat_golden_deepdom.png` (side-aware + γ pipeline;
  classic golden untouched); full suite **164 passed / 1 skipped**.
- V3–V5 were open at that point (see V3 entry below); V4–V5 remain
  (fused ladder, T&S drawer, overlay bar, VWAP).

**2026-09-16 — V3 SHIPPED (founder GO).**

- `subpanes.ts` — dedicated bottom context stack (reserved 78 px, collapsible
  via `subpanes`, persisted; V2's overlay strip retired, off-state migrated):
  buy/sell-split volume histogram + CVD line with terminal-value chip,
  sharing the heat's time axis (same tsToX; dotted time grid runs through
  the stack). DeepDom **Imb/Cvd gauge motif** top-left with honest "—"
  empty state when no side-stamped prints are in view.
- Field height now first-class (`fieldH`): price fit, recentering, COB
  alignment, footprint and hover all respect the reserved stack.
- Engine: `DemoProvider.trade_history` exposes the deterministic prints the
  replay was already generating; `/api/orderflow/depth` rides them along, so
  demo panes open with bubbles/path/strips/gauges already painted (live-only
  crypto stays honest: empty until the topic warms up).
- Gates: new deterministic golden `depth_heat_golden_subpanes.png`;
  trade-history determinism + endpoint tests; suite 166 passed / 1 skipped.
- V4–V5 remain open (fused ladder, T&S drawer, overlay bar, VWAP).

## 5. Open questions for the founder

1. Default scheme on first open: **deepdom** (side-aware purple/green) or
   **bookmap** (blue water + hot walls)? (Proposal: deepdom; classic kept.)
2. Candles-over-heat default on or off? (Proposal: off; the heat is the hero.)
3. T&S panel: drawer or permanent column? (Proposal: drawer, like DeepDom's
   T.Panel toggle.)
