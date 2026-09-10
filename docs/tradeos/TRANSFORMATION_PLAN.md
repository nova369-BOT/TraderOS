# TradeOS — "Market Intelligence OS" Transformation Plan

North star: one continuous market environment organized around **context**,
not pages. Loop: DISCOVER → UNDERSTAND → INVESTIGATE → COMPARE → SIMULATE →
DECIDE → EXECUTE → MONITOR → LEARN.

Brand: TradeOS identity (charcoal/gold). The brief's "amber/orange primary"
is satisfied by the TradeOS gold `#C9A227` (amber family) per the rebrand
spec — do not reintroduce orange.

Data integrity law: **never fabricate.** Every insight is labeled
OBSERVED (raw data) / DERIVED (transparent heuristic) / AI (model output) /
UNAVAILABLE (explicit empty state). No invented endpoints, prices, or AI text.

---

## Phase 1 — Design foundation *(this iteration)*
- [x] Token extension: intelligence roles (AI=purple, live=cyan, regime,
      confidence), density + motion scales in `terminal-theme.css`
- [~] Shared insight primitives (evidence chips/sections introduced in the intelligence surface; generalize next iteration) (reuse `components/terminal/*`; no new parallel kit)

## Phase 2 — Context Engine + Shell *(this iteration)*
- [x] `store/marketContextStore.ts` — unified MarketContext (instrument,
      market, interval, range, compare set, link group, regime snapshot,
      updatedAt) wrapping `stockStore` + `SymbolLinkContext`
- [x] Command OS: `WHY`, `REL` function codes; palette actions for
      Relationships / Regime
- [x] `SymbolContextMenu`: "Why did this move?" + "Show relationships"

## Phase 3 — Movement Intelligence (signature)
- [x] `/equity/why/:ticker?` — WhyDidThisMove surface:
      OBSERVED (day move, volume vs avg, 1m/3m/1y returns, sector rotation,
      top news, regime, F&O signal) → DERIVED (σ-move vs 1y daily returns,
      breadth participation) → AI block with honest unavailable state →
      confidence + data-freshness stamps

## Phase 4 — Relationship Graph (signature)
- [x] `/equity/relationships/:ticker?` — reactflow radial graph:
      instrument → peers (API) · sector · market · portfolio exposure ·
      F&O node · news volume; click-through re-centers graph + context

## Phase 5 — Regime layer
- [~] Regime (per-instrument volatility regime shown in WHY surface + fed into context store; global breadth chip next iteration) (derived index breadth; per-ticker HMM regimes from
      `/statlab/regimes` where applicable) — confidence + evidence inline

## Phase 6+ — Backlog (subsequent iterations)
- Market narrative strip (intelligence timeline → grouped events)
- Screener 2.0 NL→explicit-filter translation UI (filter logic always visible)
- Scenario panel on Portfolio (uses `/risk/scenarios`)
- Temporal compare ("compare regimes") view on chart workstation
- Research canvas (assemble charts/news/notes via react-grid-layout)
- Multi-monitor detach via BroadcastChannel foundation
- Onboarding personas → recommended workspaces
- Visual/perf/a11y QA pass (keyboard, reduced motion, contrast)

## Working agreements
- Additive changes only in tested zones (`commanding.ts`, context menu, App routes).
- `npm run build` + `npm test` (267 tests) must stay green every iteration.
- Each phase commits separately on `arena/01a08a7a-traderos`.
