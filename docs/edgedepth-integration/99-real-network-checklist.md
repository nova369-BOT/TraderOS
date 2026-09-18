# EdgeDepth Integration — Deferred Real-Network Checklist

The framework sandbox blocks Binance (`fapi.binance.com`, `fstream.binance.com`)
and Coinbase egress. Per D5, nothing was made to "work" by changing code
paths: the exact same binaries and modules were exercised against a
protocol-faithful in-process venue. This document is the running list of
what must be re-verified, end-to-end, on an unrestricted network before the
integration is called proven against the real venue. Nothing below requires
a code change — only reruns; if any item fails on a real network, that
failure is a defect in the *integration* (not an excuse to alter gateway
upstream code), and it gets fixed in the LSE glue or surfaced as an upstream
issue with a repro.

Legend: `[ ] to-do` / `[x] done (date, evidence)`.

## 1. Live venue smoke (the §43 hard gate)

* [ ] **Live E2E against real Binance.** On any network with Binance access:
      ```bash
      # reuse the binary the in-sandbox build produced, or rebuild per §3 of
      # 01-gateway-proof.md, then:
      EDGEDEPTH_LIVE=1 \
      EDGEDEPTH_TEST_GATEWAY_BIN=/path/to/edgedepth-gateway \
          .venv/bin/python -m pytest tests/test_gateway_live.py -v -s
      ```
      This single test asserts: book SNAPSHOT + DELTAs from the real venue,
      ≥3 real trades with *both* aggressor sides present (proves the `m`
      feld-to-side mapping against the venue, not against a hypothesis),
      stats with non-zero mark price and open interest, a trade-built live
      60s candle, historical candles via `get_historical_candles`, and the
      24h ticker batch. It also asserts clean STOPPED shutdown.
* [ ] **Multi-hour soak.** Run the terminal with the `edgedepth` provider
      active for ≥2h on symbols BTCUSDT + ETHUSDT + SOLUSDT. Watch:
      supervisor `status()` stays RUNNING (budget counter not ratcheting),
      `restarts` small, gateway log tail shows no repeated
      `orderbook resync` bursts beyond normal maintenance, and no
      `no aggTrade frames` warnings persisting (that warning is the
      upstream's own "trade stream silently blocked" probe).
* [ ] **!ticker@arr reachability.** Some networks block the all-market
      socket. Confirm whether the live watchlist is fed by the 1s stream
      (gateway log silent on the topic) or by the 30s REST fallback
      (log carries `no !ticker@arr frames after 30s, serving the 24h ticker
      from REST instead`). Both are acceptable states — the product must
      show which one it is in (status bar / gateway status payload), not
      silently degrade.
* [ ] **aggTrade vs trade.** Upstream defaults to `aggTrade` and ships
      `-trade-stream trade` for networks where aggregate frames vanish.
      On the live venue, verify whether aggTrade flows; if integration is
      deployed behind restrictive CDNs, consider passing the flag (it is a
      wire-level flag, not a code change).
* [ ] **Orderbook-idle reconnect.** On a quiet symbol keep the stream open
      > 1h and confirm the upstream watchdog reconnects and re-primes
      (assert a session survives an idle period without manual restart).

## 2. Gateway operations to re-verify on a real network

* [ ] **`go test ./...` inside `services/edgedepth-gateway/`** re-run;
      upstream live-venue tests will run their live sections (they skip in
      the sandbox) — record their results in `01-gateway-proof.md §2`.
* [ ] **`go test -race ./...`**: the sandbox bootstrap lacks cgo, so race
      builds were unavailable. Run on a standard Go install and record.
* [ ] **Symbol whitelist breadth.** The hub whitelist comes from live
      `exchangeInfo`; the LSE catalog (`search()`) currently ships a curated
      static list (perps, USDⓈ-M). On a real deployment confirm every
      catalog symbol is TRADING on Binance USDⓈ-M — otherwise subscribers
      silently get nothing (hub behavior, §4.2 of the proof). Add a startup
      assertion or shrink the catalog.
* [ ] **`!ticker@arr` bandwidth**: ~150 kB/s. Confirm acceptable for the
      terminal deployment target; otherwise gate the ticker subscription
      behind a user setting (the data arrives only when subscribed — there
      is nothing to disable on the client side beyond not calling
      `ticker24h_stream`).

## 3. Real deployment shape (was out of sandbox scope)

* [ ] **Binary distribution.** `engine/gateway.py` resolution order:
      `EDGEDEPTH_GATEWAY_BIN` → PATH → build-from-vendored-source when Go ≥
      1.24 is present. Desktop installers that bundle per-platform binaries
      (win/darwin/linux) are a separate milestone: 3 binaries, notarized
      where needed, checksums in-repo.
* [ ] **External mode in production.** For a hosted deployment, run the
      gateway as its own service and set `EDGEDEPTH_GATEWAY_URL=ws(s)://...`
      on the engine. Confirm the engine never spawns a child in that mode
      (status shows mode=external, start → 409), and wss:// + auth proxy
      policy is covered at the platform level, not by adding auth to the
      gateway (upstream is keyless by design).
* [ ] **Fleet directory / hosted listing.** `/api/providers` gates built-in
      books behind the fleet directory; dev fails open, production doesn't.
      For the gateway book to appear in the toolbar Source dropdown /
      connection menu on hosted terminals, either list `edgedepth` in the
      directory or export `LSE_EXTRA_PROVIDERS=binance,edgedepth` on the
      host. Without it the book is invisible there BY DESIGN (the UI never
      advertises what the engine doesn't list) — this is a listing
      decision, not a bug.
* [ ] **Restart-budget tuning.** Defaults (3 spawns / 120s, 30s stable
      reset) are desktop-reasonable; on a server make sure an orchestrator
      (systemd/docker) owns restarts instead: set
      `EDGEDEPTH_GATEWAY_AUTO=0` and let the platform own the process.
* [ ] **Clock discipline.** Snapshot/delta continuity and trade dedupe do
      not depend on the local clock, but candle bucketing does. Ensure NTP
      sync on the host (engine and gateway in the same process host ⇒ same
      clock; only relevant when running the gateway externally).

## 4. Test-harness notes for reruns

* `tests/test_gateway_e2e.py` and `tests/test_gateway_live.py` are the same
  assertions in two worlds (fake venue / real venue). A real-network failure
  in `live` that passes in `e2e` means *net/venue* difference: capture the
  gateway's `-log debug` output and the failing frame before touching code.
* `EDGEDEPTH_TEST_GATEWAY_BIN` must always point at a binary built from the
  vendored pin, not a random upstream checkout (VENDORED.md records the
  SHA). If the pin is bumped, rerun everything in this file.
* The fake venue (`tests/fake_binance.py`) mirrors only what the gateway
  adapter reads (verified field by field against
  `internal/binance/{rest,feed,ticker}.go` — see §4 of the proof). If
  upstream changes its JSON fields, update the fake *and* record the
  upstream SHA where the change came from.

## 5. Not deferred (already real, do not re-list)

* Protobuf wire shape, control-plane method names, venue id casing —
  proven against the compiled binary (§4 of the proof) and pinned by unit
  + e2e tests.
* Lifecycle semantics (spawn/health/restart/stop/orphan-safety) — proven
  with the real binary on Linux. Windows/macOS process-group handling is
  POSIX-gated in tests; rerun lifecycle tests on those OSes when they ship.
