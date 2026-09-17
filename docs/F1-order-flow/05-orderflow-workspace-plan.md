# F2 · Orderflow Workspace — implementation plan

Status: **PLAN, awaiting user go-ahead** · 2026-09-17
Supersedes nothing; the old terminal keeps living at its route until this overtakes it.

## 0 · The product in one paragraph

A brand-new frontend app in this repo (old terminal untouched) that renders
**EdgeDepth's orderflow UI — the RT depth heatmap, the linked six-column DOM,
the footprint — cleaner, faster, smoother and more addictive**, laid out on a
**unique free-form grid** whose UX mechanics we take from XF Charts
(shift-drag panes, hot buttons, workspaces/templates, replay transport,
right-edge profile rail as furniture), on **real Binance USD-M futures data**
via the self-hosted edgedepth-gateway. Both EdgeDepth repos are owned by the
user's company (2026-09-17), so exact-code integration is sanctioned; the
terminal's published rendering semantics are ported faithfully. Candles are the default price
view; zooming into a candle reveals its footprint + volume. The liquidity
heatmap is a **separate pane**, not an overlay. Two design languages ship as
first-class themes: **Charcoal** (EdgeDepth cool→warm on near-black, the
default) and **Sonar** (XF black + magenta/white). Honesty labels
(REAL / L2 / SIM / REPLAY) live in every pane's chrome.

## 1 · Architecture

```
Binance ─► edgedepth-gateway (Render svc #2, Go)
        ─► TraderOS engine (Python): per-symbol Book/Trades/Candles/Liqs state,
           sequence-checked, ring-buffered
        ─► one WebSocket, multiplexed streams ─► new frontend app
        ─► canvas panes on a snap-canvas grid (React shell, zero React in hot path)
```

- Frontend home: `workspace/` (new app, own vite entry, own route `/w/`).
  The existing `frontend/` app is untouched.
- Rendering doctrine (the "faster/smooth" contract): one rAF per pane; all
  market data flows through refs + ring buffers, never through React state;
  heat field painted to an offscreen bitmap and composited (texture scroll on
  pan/zoom); book math in the engine, browser only renders; 60fps budget
  asserted in tests with synthetic 10k msg/s bursts.
- Grid doctrine (the "unique" contract): snap-canvas with magnetic edges;
  shift-drag freeform; per-pane resize; **link groups** (symbol + crosshair +
  exact pixel-to-price lock across panes in a group — the EdgeDepth trick);
  hotkeys for 1/2/4/9/morph presets; session-aware auto-layouts; workspaces
  (whole UI) and templates (per pane) saved locally, shareable via JSON later.
- Theme doctrine: `design tokens.json`-style token file (ours, derived
  values, no copied files): Charcoal default; Sonar; DeepDom ember/ocean and
  Bookmap ramps as heat-ramp options. JetBrains Mono numerics.
- Data honesty doctrine: L2 ceiling stated; DEMO fallback labelled; prints
  never moved onto quotes; CVD reset semantics printed; REPLAY badge in chrome.

## 2 · Panes (v1 inventory)

| Id | Pane | Content | Zoom/interaction signature |
|---|---|---|---|
| P1 | Candle·Footprint | candles + candle volume; **zoom-in morphs to footprint** (bid×ask, delta, imbalance outline 3:1, POC per candle) | zoom = morph, not a mode switch; zoom-out returns to candles |
| P2 | RT Depth Heat | **separate pane**: cool→warm field, 100ms samples, 512 lv/side, fixed intensity scale + explicit recalibrate, auto-fit visible history, trade bubbles (sqrt 3–12px, auto threshold 75th pct, grouped when dense, never repositioned) | Follow-live / detach on pan; zoom recalibrates row grouping (1/2/5/10/20 ticks) |
| P3 | Linked DOM | six columns Buys·Bids·Price·Asks·Sells·Delta; CVD header (5-min market-time reset, printed); consumes P2's exact pixel mapping when linked; same row groups as the heat field; Qty/Quote toggle | link toggle; independent mode explicitly labelled |
| P4 | T&S | prints with side/min-size filters; big-trade aggregation markers (aggregated-only, labelled) | filter chips |
| P5 | Profile rail | right-edge volume/delta profile: POC, VAH/VAL, value-area shading — **permanent furniture, closable** | composite/visible/session modes later |
| P6 | Stats strip | mark/funding/OI/24h ticker from gateway | collapsible |

Replay transport (v2): our own ● REC sessions replayable through every pane
with XF-style transport bar + named session hot buttons.

## 3 · Phases — what happens, what you should expect

Each phase = one or a few commits, suite green, and a **you-see-this** gate.
Nothing advances without your approval of the gate.

**Phase 0 — Data spine (gateway + engine provider).**
Finish E2/E3: WS client, sequence-checked book, candles (history + live),
trades, liquidations; fake-gateway test harness; rail offers BINANCE source.
*Expect:* curl-level proof of live BTCUSDT book/candles through our engine;
Render blueprint ready with the gateway as service #2.

**Phase 1 — Shell + unique grid.**
`/w/` app skeleton; token themes (Charcoal default, Sonar); snap-canvas
grid: magnetic edges, shift-drag, resize, link groups, 1/2/4/9 presets,
workspace save/load (local). *Expect:* an empty terminal you can tear apart
and rebuild with the mouse; layouts survive refresh.

**Phase 2 — Candle·Footprint pane (P1).** SHIPPED 2026-09-18.
Modules: `workspace/panes/chart/{types,data,footprint,render,ChartPane}` —
types/math pure, data path isolated (source switch + honest fallback),
footprint cell model deterministic and badged MODELLED, renderer pure canvas,
React shell owns only lifecycle/input. Candles + volume + nice-stepped axes +
crosshair + last-price tag; wheel = anchored zoom, **zoom-in unfolds the
footprint** (bid×ask halves, DIAGONAL 3:1 imbalance outlines on a shared
row grid across the visible window, POC marker, per-candle delta + numerics
at ≥48px), delta bars + cumulative-delta curve in the volume pane, drag =
pan, dbl-click reset; 5s poll; DEMO now, BINANCE via the gateway with
"GATEWAY OFFLINE → DEMO" fallback badge. Perf/correctness: refs + rAF only,
no React state in the paint path; paint inputs flow through refs (no stale
closures from intervals/observers). Professional hardening pass 2026-09-18:
shared-grid footprints, diagonal imbalances, delta strip, stale-closure fix,
pure-layer unit gate `tests/test_chart_pure.py` (esbuild+node, ≥20 checks).

**Phase 3 — RT Depth Heat pane (P2), the centrepiece.**
The EdgeDepth semantics implemented in our engine+canvas: field, bubbles,
recalibration, auto-fit, ramps incl. Sonar. Perf: offscreen bitmap, no React
in the path. *Expect:* the heatmap you love in their screenshot, side-by-side
with EdgeDepth's own terminal on the same feed, ours smoother (their RT is
100ms-sampled ImGui; ours renders the same data with GPU-friendly
compositing). **This gate includes the A/B you asked for.**

**Phase 4 — Linked DOM + T&S + profile rail (P3–P5).**
One-axis pixel lock; six columns; CVD semantics; T&S filters; right-edge
profile as furniture. *Expect:* the full "one instrument" feeling — drag the
heatmap and the ladder and profile move with it, rows aligned.

**Phase 5 — Addictive layer.**
Wall-pulse alerts (liquidity ≥ n×median glows once), absorption flashes,
spread tick sound optional, keyboard-first commands, empty-state onboarding,
micro-animations on pane dock/morph. Perf budget re-asserted.
*Expect:* the terminal starts feeling alive without becoming a casino.

**Phase 6 — Replay + sessions (v2 core).**
● REC recordings replay through P1–P5 with transport bar, speeds, session hot
buttons; workspace+template sharing (JSON export). *Expect:* replay a London
open with heat+DOM+tape+footprint in sync.

**Phase 7 — Deploy + harden.**
Render two-service blueprint live (terminal + gateway), wss end-to-end,
honesty labels audited, docs, golden screenshots archived. *Expect:* your
public URL running the new workspace on real Binance data, free tier.

## 4 · Out of scope (stated, not forgotten)

MBO/icebergs/GEX/COT (needs paid feeds); broker execution beyond paper;
journal/Monte-Carlo; mobile. All revisit-able once the spine is live.

## 5 · Testing & budgets (the "serious" part)

- Fake-gateway harness: deterministic fixture frames (E1 codec tests exist).
- Perf gates: 60fps pan/zoom on 4k-cell field; book ingest 10k msg/s without
  drop; bundle < 1.5 MB gz per app; cold-open < 2s on Render free.
- Golden screenshot per phase gate; your sign-off stored beside them.
