# LSE Terminal — Planning Home

> **London Strategic Edge** · "The IDE for systematic trading"
> **Status: 📋 M0 — Planning (v0.0.13 baseline).** No implementation until the plan is signed off.

This repository currently holds the **M0 planning documents** for the LSE Terminal
product. The product's codebase lives in
[`londonstrategicedge/lse-terminal`](https://github.com/londonstrategicedge/lse-terminal),
which was studied in full (architecture, contracts, API surface, test suite, packaging)
before this plan was written. **Repo wiring for the implementation phase is open
decision D3 in the plan.**

## Read in this order

| Doc | What it answers |
|---|---|
| [PLAN.md](PLAN.md) | Current state (measured), gap register, product strategy (the strategic fork A/B/C), the 6 pillars, engineering program E1–E10, roadmap M1–M5 with exit criteria, risks, **open decisions D1–D4** |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | **Part 1 — As built:** runtime topology, module map, extension contracts, 12-domain API surface, 8 WS channels, state, security model, release pipeline. **Part 2 — Target:** invariants, per-milestone architectural changes, debt trajectory |

## The product in one paragraph

A local-first desktop terminal (Windows/macOS, MIT): a Python engine on your machine
runs your plain-Python strategies against full market history, fits ML models, executes
live through your own broker adapters (with arm/approval/killswitch), and hosts an AI
co-pilot with in-chat approvals. Data: the LSE vault (one free key), your own files,
ten bundled samples, and connected brokers. Desktop installers are signed/notarized with
auto-update and public + demo channels.

## Baseline health (measured 2026-09-15)

Clean venv · Python 3.11 · pandas 3.0.5 · PyPI deps: **pytest → 109 passed, 2 failed,
1 skipped (~110 s)**. Both failures are the brue-connect execution surface (gap G2).
Full reading: PLAN.md §2.3 and the gap register §2.5.

---
*Trading involves risk. LSE Terminal is research and self-directed trading through the
user's own broker; it does not custody funds. Nothing here is financial advice.*
