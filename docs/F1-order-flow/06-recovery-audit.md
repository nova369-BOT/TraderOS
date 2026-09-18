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
- [x] sandbox preview 403s: host guard trusts loopback only; the e2b proxy
      Host was rejected. Preview now starts with
      `LSE_TRUSTED_HOST_SUFFIXES=e2b.app`; Render blueprint already sets
      `onrender.com`. Hardening shipped same commit: `/w/` shell + bundle
      served `Cache-Control: no-store` so redeploys never show stale bytes;
      Binance REST timeout 15s→6s and parallel initial snapshots so blocked
      egress fails fast; ChartPane poll has an in-flight guard.
- [ ] Phase 2 chart pane never visually confirmed by user.
- [ ] Gateway live proof (E3 against real Binance) still pending.
