# Market-data decisions — the record that survives

This file carries the decisions that govern the CURRENT market-data tree,
distilled from docs/edgedepth-integration/02-decisions.md before that
directory was removed with the gateway (D13, 2026-09-19). Each entry says
what was decided, the measurement behind it, and how to reverse it. Full
narrative history lives in git, not in the tree.

## D10 — The bottleneck was the render law, not the venues (2026-09-19)

Binance "slowness": the gateway chain measured ~0.6 ms median venue→norm
and ~0.1 ms norm→WS. The pain was the engine/UI emitting one frame per
trade and rebuilding the whole chart per tick. Fix: ~30 Hz
latest-state-wins batches with provenance stamps (T1 venue / T6 engine /
T7a emit), rAF single-flush paints in app.js, explicit close on /api/ws.
Second pipeline added the same day: Coinbase Advanced Trade, keyless by
docs (market_trades with trade-id identity, level2 with sequence-gap
resync, REST candles with the 300-cap, honest 4h refusal — the venue
serves no FOUR_HOUR granularity), 29 protocol-pinned tests.
Reverse: do not. The batching+provenance law is load-bearing.

## D11 — (SUPERSEDED same day by D12) one Binance surface: the gateway book

Kept for the record: D11 deleted the whole-exchange direct Binance book
(its multi-megabyte catalog cold download was a real, measured pain) and
kept the EdgeDepth gateway as the only Binance surface. Its root-cause
analysis of the deleted book stands; its surface ruling did not survive
measurement in the owner's environment (see D12).

## D12 — Binance is direct native, the Coinbase way (2026-09-19)

The gateway surface (a) hard-fails wherever no Go toolchain exists —
measured: one request → "no edgedepth-gateway binary on PATH" — and
(b) pays engine → child → venue with child cold-boot on every deploy
where it does run. Native pays engine → venue, keyless, nothing to boot,
in every environment. providers/binance.py: curated 8-row catalog in
memory (/api/instruments ≈ 19 ms), combined WS (aggTrade with agg-id
dedupe, buyer-maker = taker-sold; partial top-20 books — each frame
complete, no patch chain), klines REST paginated at the documented 1500
cap with NATIVE 4h, venue 429 text verbatim, reconnect = redial =
resubscribe, diag stamps into /api/diag/*. 18 protocol-pinned tests.

## D13 — The EdgeDepth gateway is gone from the tree entirely (2026-09-19)

Owner instruction, verbatim: "delete everything related to edgedepth
gateway i meant every single thing". Removed: the vendored Go service
(services/edgedepth-gateway/), its proto (third_party/edgedepth-gateway/),
the provider package (lse_terminal/providers/edgedepth/), the lifecycle
supervisor (lse_terminal/engine/gateway.py) and every /api/edgedepth/*
route plus the startup spawn, the toolbar ED chip/panel and its styles,
the workspace data chain's gateway hop (frontend + bundle), the gateway
build stages (Dockerfile/render.yaml), vendored attribution, the
docs/edgedepth-integration/ directory (its live decisions are distilled
here), the F1 E0 gateway-feed plan (04-edgedepth-data.md), and all six
gateway test suites. NOT removed: the "EdgeDepth" design-system name in
frontend/workspace/tokens.ts comments (a palette's provenance, not
infrastructure), and dated historical narrative in
docs/market-data-recovery/REPORT.md (rewriting the record would violate
the working standard this repo runs on).
Reverse: `git checkout` the pre-D13 tree — at the owner's word only.
