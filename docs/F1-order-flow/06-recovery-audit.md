# Recovery audit — 2026-09-18

User directive: stop wasting time; audit everything; use the open-sourced
EdgeDepth properly; be the professional this project needs.

## 1 · Honest state of what was shipped

| Item | State | Verdict |
|---|---|---|
| E1 wire codec + byte-golden tests | 12 tests green | solid |
| E2 client (BookSync, reconnect, resync) | 8 fake-socket tests green | solid, but **never proven against a live gateway** |
| E3 provider + rail registration | listed, honest NotSupporteds | fine |
| render.yaml gateway wiring | documented | fine |
| F2 Phase 1 grid (snap canvas, themes, workspaces) | works; **user hit the NaN-layout blank screen** | bug shipped, fixed `45f6a84`, user re-verify pending |
| F2 Phase 2 candle·footprint pane | stale-closure + per-candle-row bugs found in self-audit, fixed | user has **never seen it work** due to #5's blank screen |
| Suite | 191 passed / 1 skipped locally | green ≠ proven in a browser |

## 2 · Root causes of the wasted time

1. **Did not run the user's own production-ready artifact first.** The
   EdgeDepth repos ship prebuilt GHCR images (`ghcr.io/edgedepthhq/
   edgedepth-terminal` + `...-gateway`) and a compose file. Deploying those
   two services gives the exact orderflow UI the user loves, live, keyless,
   in ~10 minutes. I spent days re-inventing an inferior subset instead.
2. **Shipped phases without end-to-end verification.** No browser exists in
   this sandbox; the compensation (stricter gates, smaller steps, explicit
   user-verify checklists) was applied too late.
3. **Sandbox `.git` rollbacks poisoned pushes twice.** New rule: always
   `fetch` + ancestry-check before commit/push; transplant, never force.
4. **Implemented ahead of the user's pace** more than once. New rule: plan
   approval precedes code, every time.

## 3 · Recovery plan

- **R1 — real UI on the user's URL, today.** Two Render services from the
  prebuilt GHCR images (fallback: build from the repos — Render can build Go
  natively and Docker-with-emsdk for the terminal):
  1. `edgedepth-gateway`: image `ghcr.io/edgedepthhq/edgedepth-gateway:latest`,
     port 8080, no env.
  2. `edgedepth-terminal`: image `ghcr.io/edgedepthhq/edgedepth-terminal:latest`,
     port 8080, env `EDGEDEPTH_WS_URL=wss://<gateway-svc>.onrender.com/ws`
     (browser-resolved URL — the compose file's own warning).
  3. Open the terminal service URL → the real orderflow terminal on live
     Binance data. This is the product the user asked for, running as-is.
- **R2 — QA freeze on `/w/`.** No new features. Every future change ships
  with: build + scoped tsc + suite + curl checks, then a written summary
  BEFORE the user is asked to look. Known-issue list stays in this doc until
  each row is verified fixed by the user.
- **R3 — benchmark, then continue.** With R1 live, the deployed EdgeDepth
  terminal becomes the standing A/B reference for the F2 rebuild. Phases 3+
  resume only on explicit user go-ahead, one gate at a time.

## 4 · Known issues (user-verified rows close only by user confirmation)

- [ ] `/w/` blank-screen fix (`45f6a84`) — awaiting user redeploy + confirm.
- [x] `/w/` black-body on Render (top bar only) — USER-CONFIRMED FIXED
      2026-09-18 (screenshot: panes + chart render). `.ws-root` had no height rule,
      so in a real browser the snap canvas computed to zero height (jsdom
      probes cannot catch layout bugs — no layout engine). Fixed: explicit
      `height: 100%` on `.ws-root`; plus `sanitizeState` now normalises the
      theme id and `repairPane` clamps x/y to `1−MIN`. Awaiting user confirm
      on the auto-redeployed traderos-w service.
- [ ] real Binance data: main domains are WAF-418 from datacenters AND
      ISP-blocked in Nigeria (user). Added the .vision public mirror
      (data-api/data-stream.binance.vision, same wire format) as fallback on
      BOTH server REST/WS and browser hops; venue honestly badged (futures vs
      spot); demo badge now names the failed hops (srv✗ brw✗ mir✗ gw✗).
      Awaiting user confirm of a LIVE badge.
- [x] sandbox preview 403s: host guard trusts loopback only; the e2b proxy
      Host was rejected. Preview now starts with
      `LSE_TRUSTED_HOST_SUFFIXES=e2b.app`; Render blueprint already sets
      `onrender.com`. Hardening shipped same commit: `/w/` shell + bundle
      served `Cache-Control: no-store` so redeploys never show stale bytes;
      Binance REST timeout 15s→6s and parallel initial snapshots so blocked
      egress fails fast; ChartPane poll has an in-flight guard.
- [ ] Phase 2 chart pane never visually confirmed by user.
- [ ] Gateway live proof (E3 against real Binance) still pending.

## 5 · Binance full-path audit — 2026-09-18 (user: "go through the depth, solve everything")

Traced provider → `/api/candles` → `/api/ws` → both shells. Root causes,
each reproduced in isolation before the fix, each pinned by a test:

| # | Symptom | Root cause (evidence) | Fix | Commit |
|---|---|---|---|---|
| 1 | "Only a few timeframes work" | Shell opens every chart at `limit=5000`; provider forwarded it verbatim; Binance caps klines at 1500/1000 → HTTP 400 `-1130` on both legs → 502 for **every** kline tf. tick/1s/30s survived only because aggTrades was clamped. Error text said "unreachable". Mock exchange with real caps: `5000 → FAIL` on all kline tfs | Paged parallel windows (≤5 legs, one RTT), stitched + deduped; `BinanceRESTError` surfaces code/msg; `end` s→ms (was seconds; a test pinned it); ISO windows accepted | `be7c6c3` |
| 2 | "Candles don't update fast" | `/api/ws → stream()` reused the depth pump: awaited a 1000-level REST snapshot before the first yield and re-awaited inline on every gap. Reproduced with an 8s snapshot line: **first tick at 8.0s**. Also a bookTicker frame KeyError'd the market route | Dedicated tick pump (aggTrade + bookTicker, no REST); first tick <1s regardless of REST latency (test); bid/ask on every tick; depth pump resyncs off the reader via per-symbol workers | `8359d97` |
| 3 | Ladder thin / inconsistent | Provider lacked 30m/2h/1w (native); `app.js TF_SECONDS` lacked 2h (bucketing fell to 3600); `/w/` pane merged `kline_<new>` frames into the old tf's bars mid-switch; 1s/30s built from last 1000 prints (~seconds) though the spot mirror serves real 1s klines | Full ladder both UIs; 1s/30s from real 1s klines (paged, vectorised fold, 50ms budget test), tape as fallback; switch clears+reloads before merging | `ef03c5e` |

Verified through the real FastAPI app against a cap-enforcing mock
exchange: all 9 kline tfs load 5000 contiguous bars in 31–94ms; re-switch
30ms (SWR); tail fetch 3 bars ~6ms; **0** over-cap requests reach the
exchange. Full suite 231 passed / 2 skipped (+8 tests). Sandbox egress to
Binance is walled, so:

- [ ] USER: open Binance BTCUSDT, click every tf 1m…1w — each must paint
      5000 bars (scroll back), no "candles failed" toast.
- [ ] USER: on 1m, watch the forming candle move on every print (not every
      5s) and bid/ask lines appear on the chart.
- [ ] USER: `/w/` — switch 1m→5m→1h; the chart must clear and reload, badge
      `BINANCE · LIVE · RT`.
