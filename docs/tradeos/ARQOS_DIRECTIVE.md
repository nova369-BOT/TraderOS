# ARQOS Directive — Subsystem Classification & Phase Map

Date: 2026-09-11 · Branch: `arena/01a08a7a-traderos` · Base: `53334dc`

This document is the working translation of the 75-section ARQOS master
directive ("Beyond the Chart." — the market workstation). It records the
A–H classification of every existing subsystem and maps the directive's
17 delivery phases onto the current repository state. It builds on
`ARCHITECTURE_AUDIT.md` (full inventory) and `TRANSFORMATION_PLAN.md`
(Market Intelligence OS phases 0–4, already shipped).

## Brand decision (Phase 3 of the directive, executed)

- Product identity: **ARQOS — "Beyond the Chart."** in all user-facing
  surfaces (shell, title, auth, About, landing pages, status bar, install
  prompt, PWA manifest, error boundary, settings copy, API `app_name`).
- Internal identifiers intentionally unchanged per directive: Python
  packages, frontend modules, DB schema/migrations, env vars, npm package
  names, repo slug, HTTP User-Agent strings.
- Default theme: **Quantum Core** — deep charcoal canvas `#0F1014`,
  graphite panels `#16181E`, soft-white text `#E6E8ED`, restrained purple
  accent `#8B7FD4`, restrained market green `#3FA46A` / red `#C25E63`,
  muted amber `#C29A5B`. No neon, no cyberpunk, no glassmorphism.
  Implemented in `frontend/src/styles/terminal-theme.css` (`:root` tokens +
  risk/system/action/feedback semantics); legacy variants
  (`classic-bloomberg`, `light-desk`) preserved verbatim as alternate themes.
- Brand marks: emblem + lockups re-rendered by `scripts/brand_assets.py`
  (purple candlestick replaces gold) to the same output paths — no consumer
  code changes required. SVG sources updated in lockstep.

## A–H subsystem classification

Legend: **A** complete · **B** partial · **C** UI-only · **D** mock/fake ·
**E** real backend, weak UI · **F** duplicated · **G** dead · **H** needs provider

| # | Subsystem | Class | Evidence / note |
|---|-----------|-------|-----------------|
| 1 | Terminal shell (TopBar/StatusBar/Sidebar/IconRail/SplitPane) | A | keyboard-driven, context-aware; re-branded |
| 2 | Command palette + function codes (`commanding.ts`) | A | Bloomberg-style codes, disambiguation, NL fallback |
| 3 | Symbol link groups + multi-window sync | A | `SymbolLinkContext` + BroadcastChannel |
| 4 | Design system (`components/terminal/*`, tokens) | A | 17 primitives + full token engine |
| 5 | Market/security pages (charts, depth, FA, DES) | A | real providers + UNAVAILABLE states |
| 6 | Why Did This Move? (movement intelligence) | B | real engine; evidence + confidence; provider-dependent fields labeled |
| 7 | Relationship graph (reactflow + real edges) | B | live edges when provider data present |
| 8 | Portfolio monitoring / analytics | B | real backend; some risk panels pending hardening |
| 9 | Screener + statlab + factors | B | real engines; factor breadth filters B |
| 10 | Backtesting engine + models registry | B | lifecycle exists; OOS/Monte-Carlo surfacing planned directive phase 12 |
| 11 | Alerts v2 + delivery policy | A | migration 0007, real delivery |
| 12 | Agent/AI surfaces (debate, assistant) | B | read-only, evidence-labeled; never fabricates certainty |
| 13 | F&O / option chain | B | real chain when provider available; H for live greeks feed |
| 14 | News/NLP pipeline | B | real fetchers; external feeds H behind env provider keys |
| 15 | Launchpad/workspace templates + saved views | A | persistence via migration 0011 |
| 16 | Landing + docs site | A | static, re-branded |
| 17 | Legacy `TradingDashboard` cards grid | C | superseded by workstation shell; retained route, flagged for consolidation (not deleted — consumers verified live) |
| 18 | Mock market simulator used when providers unreachable | D→ labeled | renders only inside explicit SIMULATED/UNAVAILABLE badges; no fake LIVE |
| 19 | bonds/commodities pages | A | real endpoints |
| 20 | Duplicate heatmap implementations | F | nivo vs recharts variants — consolidation tracked, both consumed; no deletion without import/consumer proof |

Subsystems not listed are covered by the tables in
`ARCHITECTURE_AUDIT.md` §1–2 and inherit class A/B per those entries.
Class G (dead): none confirmed — no component was removed during ARQOS
branding; deletions require import / route / test evidence first.

## Directive phase map (1–17) → repo state

| Phase | Directive item | Status here | Where |
|-------|----------------|-------------|-------|
| 1 | Audit | done | `ARCHITECTURE_AUDIT.md` |
| 2 | Architecture/ownership map | done | audit §1–4 + this doc |
| 3 | Branding → ARQOS, "Beyond the Chart." | **done (this iteration)** | strings, manifest, logos, docs |
| 4 | Shell work (single workstation frame) | done | `TerminalShell` family |
| 5 | Theme engine + semantic tokens, Quantum Core default | **done (this iteration)** | `terminal-theme.css` |
| 6 | Global context/state persistence | done | SymbolLink/zustand/saved views |
| 7 | Workspaces & layouts | done | Launchpad, react-grid-layout, mosaic |
| 8 | Market & security views | done | audit §1; WHY/REL routes |
| 9 | Trading surfaces | done (paper/orders) | trading pages; execution realism tracked in phase 12 backlog |
| 10 | Research & AI (evidence-based) | done (v1) | WHY engine, agent debate |
| 11 | Backtesting lifecycle UI | backlog | engine exists; OOS/Monte-Carlo UI surfacing next |
| 12 | Labs/risk realism | backlog | execution-cost + slippage panels |
| 13 | F&O depth | backlog | greeks provider (H) |
| 14 | AI governance (DRAFT→RETIRED) | backlog | model registry states |
| 15 | Ops / TCA / data quality | BACKLOG | provider DQ badges exist partially |
| 16 | Performance & accessibility | continuous | gates in CI; 194 components profiled in audit |
| 17 | Testing gates | done + enforced | 283 vitest, tsc, backend pytest suites |

Backlog items are tracked here rather than as fake UI: per directive, no
"UI-only cards" may ship ahead of real backend capability.
