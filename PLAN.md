# LSE Terminal — Master Plan

**London Strategic Edge** · "The IDE for systematic trading"
**Status:** M0 — planning, for founder sign-off · **Date:** 2026-09-15
**Codebase:** imported into **this repository** (founder decision D3, 2026-09-15) — baseline
`londonstrategicedge/lse-terminal` commit `62c48a5` (v0.0.13), full history preserved in the
merge commit; this repo is now the working home
**Supersedes:** the initial greenfield draft written on 2026-09-15 (that draft assumed an
empty repo; the real foundation is `londonstrategicedge/lse-terminal`, studied in full)
**Companion:** [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — as-built architecture + target direction

---

## 1. Purpose of this document

We are not starting from scratch. We have a shipped, multi-release product (v0.0.13,
desktop installers for macOS/Windows, release pipeline, 112-test suite). This plan:

1. Fixes the **current state** in writing — what exists, how it works, measured health.
2. Defines the **strategy** to get from "excellent local terminal" to "the next big
   trading platform."
3. Converts strategy into an **engineering program** with named work items, each mapped
   to a known gap.
4. Sequences it into **milestones with exit criteria** — nothing ships on vibes.
5. Lists the **decisions only the founder can make**.

## 2. Current state (as of v0.0.13)

### 2.1 What the product is today

A **local-first desktop terminal** (MIT): a Python engine process (FastAPI/uvicorn,
loopback-only by default) that serves a bundled React SPA and a ~130-endpoint JSON API.
The user writes strategies in **plain Python** (no framework, no imports of ours); the
engine backtests on the full history, fits ML models, runs the strategy live against a
broker adapter with a killswitch, and hosts an AI assistant (hosted model through the
user's key, or local CLI agents — Claude/Codex/Gemini/Kimi/Qwen/Copilot/OpenCode — wired
over MCP with an in-chat approval bridge). Data comes from the LSE vault (one free key),
user-imported files, ten bundled samples, a deterministic synthetic demo source, and
connected brokers. Distribution: Electron + PyInstaller sidecar, Developer ID +
notarization (mac), Azure Artifact Signing (win), auto-update, **public and demo channels**.

Full module map, contracts, flows and API surface: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

### 2.2 By the numbers (measured in this checkout, 2026-09-15)

| Measure | Value |
|---|---|
| Python (engine + tests) | ~28,000 LOC |
| Frontend (TS/React) | ~88,000 LOC |
| REST endpoints | 130+ across 12 domains (markets, candles, screener, options, MBO, econ, backtest, ML, AI, broker, sim, algo, data, workspace, notebooks, quant, research, config) |
| WebSocket channels | 8 (`/api/ws` market ticks; AI chat/pty/install/login; ML jobs/install; workspace terminal) |
| Shipped indicators | ~115 (`@indicator` registry, Python) |
| Backtest engines | 1 (`PythonRunner`: plain-Python strategies, walk-forward, Monte Carlo, commission/slippage) |
| ML catalog | GARCH, Kalman, HMM, LSTM, ARIMA, Transformer, XGBoost, RF, CNN, GAN, autoencoder, sentiment, PCA, Monte-Carlo + rich 3D/echarts visualizations |
| Broker layer | brue-connect adapter protocol, dynamic connection directory (server-driven, fail-open), arm/probe/reconcile, paper broker (NovaFX), algo live runner with journal + killswitch |
| Sample data | 10 parquet datasets (BTC/EURUSD/GOLD/SPX500 1h; SILVER/BRENT/USDJPY/NAS100/AAPL 1d; USYIELDS) |
| Test suite | 112 tests, 9 files |
| Pages | MARKETS, BACKTEST, ECONOMIC, WORKSPACE, RESEARCH + MY DATA + in-app walkthrough |

### 2.3 Health baseline (measured, not assumed)

Clean venv, Python 3.11, deps from PyPI (`lse-data 0.14.0`, `brue-language 0.0.1`),
**pandas 3.0.5 / numpy 2.4.6**, no ML extras, no brue-connect checkout:

```
pytest tests/  →  109 passed, 2 failed, 1 skipped   (≈110 s)
```

**Readings:**
- **Green under pandas 3.0** with no code changes — better compatibility posture than expected (the suite even runs `TestClient` against the full app).
- **Both failures are the broker/execution surface**: they require the `brue-connect`
  source checkout (gap G2). The execution path — the most safety-critical part of the
  product — is currently untestable in a clean install.
- **No CI runs tests** — the only workflow is the release build (gap G1). Nothing
  prevents a red suite from shipping; today the suite happens to be ~98% green.
- Frontend has **typecheck + build** scripts but no UI/e2e automation (gap G6).
- `on_event` deprecation warnings (FastAPI lifespan migration) — cosmetic for now.

### 2.4 The ecosystem around the repo

| Component | Where | Role |
|---|---|---|
| `brue` | github (public), `brue-language` on PyPI | execution language for indicators/entry rules |
| `brue-connect` | github (public), **source-only dep** | broker adapters + live runner; "the trading door" |
| `lse-data` | PyPI 0.14.0 | client for the LSE data vault |
| `api.londonstrategicedge.com` | hosted | API key gate, dynamic broker/directory, sim, updates |
| `londonstrategicedge.com` | hosted | site, free keys, installers, docs |

### 2.5 Gap register

| # | Gap | Severity | Evidence |
|---|-----|----------|----------|
| G1 | **No CI for tests/typecheck/build** — release workflow only | **High** | `.github/workflows/` contains only `release.yml` |
| G2 | **`brue-connect` not declared in `pyproject.toml`** yet `broker_hub`/`algo` import it and 2 tests need it — execution surface untestable in clean installs | **High** | pyproject deps vs `connect_base()`; the 2 failing tests |
| G3 | **Version drift**: repo says 0.0.1 (`__init__.py`, pyproject), releases are tagged 0.0.13; update flow reads versions from tags/releases | Medium | tag `0.0.13` vs source |
| G4 | **`server.py` monolith**: 7,555 lines, 130+ routes, 8 WS handlers, 12 domains | Medium | file size; churn risk for every feature |
| G5 | **Frontend monolith files**: `ProChart.tsx` 9,774 LOC, `BTChart.tsx` 8,562 LOC, `ChartDrawingOverlay.tsx` 5,131 | Medium | file sizes |
| G6 | **No e2e/UI automation** (only `tools/chart_smoke.mjs`) | Medium | tests/ contains backend only |
| G7 | **AI + execution security surface has no written threat model** (PTY, `tool-run`, `run-script` re-entry, approve bridge, algo subprocess, broker arm) | **High** (growing) | design is sound (loopback, arm, approve, killswitch) but unaudited in writing |
| G8 | Stale references (code comments cite an `archive/` dir not in the repo); no contributor docs for the four extension points | Low | `registry.py` comment; docs gap |
| G9 | **No dependency policy**: open-ended lower bounds; pandas 3 works today but nothing guards the matrix (py 3.10/3.12 × pandas 2/3 × numpy 1/2) | Medium | pyproject |
| G10 | **Observability is thin**: local logs only, shallow `/api/health`, no opt-in crash reporting for a distributed installed base | Low-Med | code review |

## 3. Product strategy

### 3.1 Vision

> **The next big trading platform is built by making the best local systematic-trading
> IDE into an open platform:** the deepest strategy workflow a trader can have on their
> own machine (data → strategy → backtest → ML → live, all local, all reproducible), an
> **ecosystem** in which data sources, brokers, indicators, strategies and models are
> first-class installable units, a **trusted AI co-pilot** with auditable autonomy, and
> a **cloud layer** only for the things that genuinely need a network (the vault, keys,
> the connection directory, updates, accounts, sharing).

The invariants that make the product credible — and that **must not be compromised**:
local-first (your data never leaves), loopback-only engine, fail-open offline behavior,
broker credentials never leave the machine, reproducible numbers (run pins), paper/live
parity, and "nothing in the broker path special-cases a broker."

### 3.2 The strategic fork — **Decision D1**

| Path | Shape | Pros | Cons |
|---|---|---|---|
| **A — Deep local-first** | Stay a desktop product; deepen every pillar; cloud stays at data/keys/updates/directory | Fastest to "best of class"; matches current security posture; no new server architecture | "Platform" stays in the ecosystem sense; limited distribution surface |
| **B — Hosted SaaS terminal** | Multi-user cloud terminal in the browser | Maximal distribution; subscription at scale | Largest build; re-architecture of the local-first core; new security/tenant model; delays every other pillar |
| **C — Hybrid (recommended)** | Keep the local core; grow the **cloud around it**: accounts (key → email account), strategy sharing/directory on the existing API, hosted research/web-light reader, team/subscriptions later | Reuses what already exists (the LSE API, key system, directory pattern); distribution grows without re-architecting the terminal; local stays the premium experience | Two surfaces to keep in sync (mitigated: same API, thinner web client) |

**Recommendation: C, phased.** M1–M4 strengthen the local product (the moat); M5 adds the
cloud layer on top of the existing `api.londonstrategicedge.com` surface.

### 3.3 Pillars — where each is today and where it goes — **Decision D2**

| Pillar | Today (v0.0.13) | Next (this plan) |
|---|---|---|
| **1. Data moat** | LSE vault (key-gated), 10 asset-class datasets charting, options board + flow, econ calendar, MBO level-3 (plan-gated), databank downloads, user imports, broker-as-source, server-driven connection directory | Stability/SLA + offline depth; options & economics **into candle charts** (code already says "joins in v0.2+"); data quality/compliance harness as a first-class feature; catalog scale-up with visible inventory; provider SDK hardening |
| **2. Strategy platform (the heart)** | Plain-Python strategies, run pins, walk-forward, Monte Carlo, commission/slippage, honest next-bar-open fills, 7 starters, replay/manual backtest | **Strategy bundles**: versioned package = code + pin + params + dataset refs + tested-run artifact; share/import (file + directory URL on the LSE API); a **strategy library** UI with side-by-side results; reproducibility guarantee (compliance harness makes this testable) |
| **3. ML** | Catalog + one-click env installs + streaming jobs + 20+ visualizations + datasets/blueprints | Model **registry**; the **train → backtest → live pipeline** (a fitted model becomes a strategy bundle in one action); benchmark suite so model claims are honest |
| **4. Execution** | Sim (NovaFX paper) + brue-connect adapters + arm/probe/reconcile + algo live runner with deterministic order ids, journal, killswitch; broker UI (ticket, account dock, pending orders) | **Risk engine in the terminal's order path** (hard caps: notional, exposure, drawdown stop, order rate — enforced *before* the broker sees it); **paper/live parity test suite** (same scenario, both paths, identical accounting); risk panel + order audit UI; live-readiness checklist per broker |
| **5. AI co-pilot** | Veron (hosted, your key) or local CLI agents via MCP; engine tools (backtest, ML, files, Python); approval bridge (Allow/Deny cards); PTY terminal; usage metering | **Autonomy levels** (read-only / backtest-only / with-approval / supervised-live) with a persistent audit trail; **eval suite** for assistant tools in CI; memory via notebooks; cost controls surfaced in UI |
| **6. Distribution & business** | Free key + plan-gated data (MBO), public/demo channels, signed installers, auto-update | Accounts (key → email identity on the LSE API); team/subscription foundations; web-light research reader (path C); onboarding polish; store presence |

### 3.4 Non-goals for this phase (contractual)

- No custody of funds, no market-making, no proprietary order flow.
- No mobile app in this phase (desktop + web-light only).
- No multi-tenant **hosted terminal** before a M5 go/no-go (path C keeps the terminal local).
- No re-architecture of the local-first core, loopback model, or extension contracts.
- No new strategy *language* (plain Python stays; Brue stays an execution language).

## 4. Engineering program

Each item maps to a gap; each has a done-criterion. Order matters: E1–E3 before feature
work, E4–E5 interleaved (behavior-preserving, test-gated), E7 in parallel as the AI/
execution surface grows.

| # | Item | Closes | Done when |
|---|------|--------|-----------|
| E1 | **CI**: on every PR — backend `pytest` (py 3.10 + 3.12 matrix), frontend `tsc --noEmit` + `vite build`, indicator parity check; branch protection requires green | G1 | A red PR cannot merge; release workflow reuses the same job artifacts |
| E2 | **brue-connect dependency boundary**: publish a proper wheel (PyPI or private index) OR declare a git dependency; `broker_hub` comment says it's "a real dependency" — make it true; the 2 failing tests must run in a clean venv | G2 | Clean `pip install` → **112/112 green**; docs updated |
| E3 | **Version integrity**: single source of truth; release automation stamps `__version__` + pyproject from the tag; `/api/update/status` verified against it | G3 | Any installed build reports the exact release it is; no drift possible |
| E4 | **Server modularization** (incremental): extract per-domain route modules (markets, backtest, ml, ai, broker, sim/algo, data, workspace) around a shared app-state object; **every step gated by the full suite + smoke** | G4 | `server.py` under ~1,500 lines of wiring; zero behavior change (suite + e2e green) |
| E5 | **Frontend decomposition** (incremental): `ProChart`/`BTChart` into composable chart core + feature modules; typecheck + build + manual checklist gate per step | G5 | No single file > 2,000 LOC; checklist green per step |
| E6 | **E2E smoke**: Playwright against a real engine instance — boot → chart renders → indicator adds → backtest runs → sim order placed & filled → positions shown | G6 | Runs in CI (on a PR artifact) and locally with one command |
| E7 | **Threat model + security review** of the AI/execution surface: PTY, `tool-run`, `run-script` re-entry, approve bridge, algo spawn, broker arm/credentials, WS tokens, update channel | G7 | Signed-off threat-model doc; findings tracked; killswitch/arm flows re-verified by tests |
| E8 | **Observability**: structured local logs; deep `/api/health` (per-subsystem: providers, brokers, ml env, update); opt-in crash report to the LSE API | G10 | A stuck install can be diagnosed from a log export alone |
| E9 | **Dependency policy**: pinned compatibility matrix (py × pandas × numpy × torch-optional), CI matrix covers it; upgrade cadence written down | G9 | Matrix documented + green in CI |
| E10 | **Contributor docs**: how to add a provider / indicator / broker adapter / ML model (the four extension points), with a worked example each | G8 | A new contributor adds an indicator in <1h from docs alone |

## 5. Roadmap

Durations are relative (S ≈ one focused build session, M ≈ 1–2 weeks-equivalent, L ≈ 3+).
The founder's cadence decision (D4) converts these into calendar dates.

| Milestone | Goal | Scope | Exit criteria | Size |
|---|------|-------|---------------|------|
| **M1 — Foundation & gates** | Make the codebase *safe to change fast* | E1, E2, E3, E9, E10, G8 cleanup | PR protection live; clean venv → **112/112 green**; version stamped; contributor docs merged | S–M |
| **M2 — Execution hardening** | The trading door becomes *trustworthy live* | Risk engine in the order path (terminal-side, pre-broker); paper/live parity suite; risk panel + order audit UI; live-readiness checklist per broker; E7 first pass | A live paper strategy **cannot** exceed configured risk (attested by test); parity suite green for sim + ≥1 adapter; killswitch verified by e2e | M |
| **M3 — Strategy platform** | Strategies become *shareable products* | Strategy bundles (code+pin+params+dataset refs+tested-run artifact); share/import via file + LSE directory URL; strategy library UI with side-by-side results; reproducibility report | A shared strategy runs **bit-identical** on a second machine (compliance harness); library demos in-app | M |
| **M4 — AI depth** | The assistant becomes an *auditable co-trader* | Autonomy levels + audit trail; assistant tool eval suite in CI; ML model registry; model→strategy-bundle pipeline (train → backtest → bundle in one action) | Eval suite green in CI; a dataset can be taken to a backtested strategy bundle within an autonomy level without hand edits; audit log readable in UI | M–L |
| **M5 — Cloud & distribution** (per D1) | The platform *reaches users* | Accounts (key → email identity) on the LSE API; web-light research reader (read-only: data, research, econ); team/subscription foundations; onboarding pass | A new user signs up, gets a key, uses the hosted research view without installing; local desktop remains the full product; go/no-go recorded for any hosted-terminal ambition | L |
| **M6+ (candidates)** | Ecosystem program | Broker adapter partners via the directory (already server-driven); indicator/strategy marketplace on the LSE API; hosted data catalog scale; mobile later | — | — |

## 6. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Scope explosion (the "next big" trap) | High | High | §3.4 non-goals are contractual; milestone gates require founder sign-off; change the plan before changing scope |
| Solo/small-team bus factor | High | Medium | E1–E3 make the suite the source of truth; E10 docs; every refactor test-gated and incremental |
| Security surface grows with AI autonomy + live orders | Medium | **High** | E7 threat model; autonomy levels default low; loopback-only invariant; arm/approve/killswitch already exist and are tested (M2) |
| Data moat depends on the hosted LSE service | Low-Med | High | Fail-open by design (keep it); offline samples/demos; E8 diagnostics; service SLA owned separately |
| Ecosystem drift (pandas/numpy/torch) | Medium | Medium | E9 matrix + CI |
| Refactor churn breaks a working product | Medium | High | E4/E5 are incremental, behavior-preserving, gated by the full suite + e2e at every step; no big-bang rewrites |
| Regulatory/marketing overreach | Medium | High | Terminal positions as research + trading through the user's own broker; no custody; legal review gate before any "platform/broker" public claims (UK FCA, US, NG jurisdictions) |
| Desktop update friction / channel confusion | Low | Medium | Public/demo channels already separated (config dirs, titles); M5 onboarding pass covers it |

## 7. Decisions needed from the founder

| # | Decision | Options | Recommendation |
|---|----------|---------|----------------|
| **D1** | Strategic direction | A deep local-first · B hosted SaaS · C hybrid | **C, phased** (M5 is the cloud milestone) |
| **D2** | First priority after M1 | Execution hardening · Strategy platform · AI depth · Data moat | **M2 (execution hardening)** — live trust is the product's credibility; M3 immediately after |
| **D3** | **Repo & workflow wiring** | Add agent to lse-terminal · make this repo the new home · other | **RESOLVED (2026-09-15):** codebase imported into this repo (founder directive); workflow = feature branch → PR → green CI → main; releases stay tag-driven |
| **D4** | Cadence & team | Agent builds milestone-by-milestone with founder gate reviews · agent autonomous with weekly review · task-by-task pairing | **Milestone gates** |

## 8. Working agreements

1. **No feature code before D1–D4 are signed** (M1's hygiene items are the only exception
   once D3/D4 allow starting).
2. Every milestone ends with: full suite green, e2e smoke green, docs updated, founder
   review at the gate.
3. Refactors are incremental and behavior-preserving; the test suite is the arbiter.
4. The invariants in §3.1 are not negotiable by feature work — changing them requires a
   plan change first.
5. The gap register (§2.5) is the single source of truth for known debt; new debt is
   recorded there with a gap ID.

---
*Sign-off (founder): ____________  Date: ____________*
