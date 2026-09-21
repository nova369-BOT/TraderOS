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

## D14 — Geo-blocked egress? Ladder to Binance's public data mirror, never a transport swap (2026-09-19)

Owner hit the real thing in the wild: "klines REST HTTP 451 — Service
unavailable from a restricted location" — and asked for "the binance from
ccxt". Measured first: ccxt speaks to the SAME WAF-gated trade domains
(api/fapi.binance.com), so a 451 (legal eligibility answer) or a TLS/ISP
drop hits ccxt identically; this sandbox drops every Binance domain at
TLS, the owner's environment gets 451 — two shapes, one law: the TRADE
domains are not reliably visible from realistic egresses. The cure is
Binance's own public market-data mirror — data-api.binance.vision (REST)
and data-stream.binance.vision (WS), spot shape, no eligibility gate.

Shipped: every network face of providers/binance.py is now a two-rung
ladder — venue first, mirror on the trigger set (HTTP 451/418/403 or any
connectivity failure); the first success PINS the winner (chart paths
never re-race a dead hop); the venue label follows the rung everywhere it
matters (candles df.attrs venue, provider venue → tick badge) so a
mirror-served frame says "binance-spot" honestly. 429 NEVER flips the
ladder (a rate answer is about load, not geography — masking it would be
the old sin). The mirror's spot depth shape (bids/asks, no event stamps)
parses with receipt-time honesty. 5 new protocol-pinned tests; the geo
flip, the stick, the never-flip-on-429, the WS dial flip, and the spot
frame shape are all pinned.
Reverse: delist the mirror rungs in providers/binance.py — only on the
owner's word, and only if every target egress can see the trade venue.

## D15 — The MT5 glide: the forming candle eases toward real prices, never jumps (2026-09-19)

Owner asked for MT5-grade candle movement on the Binance/Coinbase books:
"the moving candle makes the terminal lively." Measured first: the pipe
was already immediate end-to-end (venue frame → engine emit ≈ 0.06 ms
median S2; browser flush per rAF). The damping was perceptual, not
structural: ECharts' global `animation: false` in UniversalChart and
ProChart's direct final-state canvas drawing made every tick paint as a
hard jump. (UniversalChart was touched first and REVERTED — the terminal
does not mount it; ProChart is the mounted engine. Only ProChart's diff
shipped.)

Shipped inside ProChart (custom canvas): a display-state morph for the
FORMING candle only. Each tick flush sets the REAL target bar; a tiny
ease-out driver (factor 0.35, ≈96% converged in ~4 frames at 60fps)
glides the painted close/high/low toward it, redrawing via the same
fastMode frame path live scrolling already uses, and stops with zero
redraw cost once converged. Same-bucket guard: morph state can never
leak into a new bar; scrolled-back history never glides (autoFollow
gate, same as the existing pulse). Honesty invariant, stated in code:
high only climbs toward the real high, low only falls toward the real
low, close approaches the last real print — the screen never shows a
price the venue has not traded; this is interpolation BETWEEN real
prices, never extrapolation past them.
Verify: typecheck delta 0 vs HEAD (51 pre-existing errors unchanged,
none in the diff); vines build clean; bundle +1.1 kB. Visual verdict is
the owner's — the numbers only prove the pipe.

## D16 — LSE-shaped timeframe ladders on the crypto books (2026-09-19)

Owner's words: "the timeframe also have custom and the default should be
just like that of lse data terminal from tick, 1s, 15s, 30s, 1m, etc".

- **Binance** menu: `tick 1s 15s 30s 1m 5m 15m 30m 1h 4h 1d 1w` plus a
  **Custom…** entry. Native klines cover every documented interval
  (1m/3m/5m/15m/30m/1h/2h/4h/6h/8h/12h/1d/3d/1w); via Custom… you can
  reach 3m/2h/6h/8h/12h/3d too.
- **Coinbase** menu: `tick 1s 15s 30s 1m 5m 15m 30m 1h 1d` + Custom…
  (reaches 2h/6h). **4h and 1w stay refused** — the venue has no such
  product; the error says so in its own words and points at `<n>s`.
- **Sub-minute law (any venue):** tick and every `<n>s` bar is built ONLY
  from the exchange's own real trade tape — Binance `aggTrades` (paged
  backward by `endTime`, ≤12k prints, ascending-by-id), Coinbase Get
  Market Trades (≤220 newest prints; re-chronologised before bucketing or
  open/close would swap). `tick` = one bar per print (o=h=l=c). Buckets
  sit on the aligned clock grid; silent gaps are never filled; the tape's
  depth (seconds-to-minutes) is the honest short history, and windows
  outside it are refused with the tape's real bounds named. The live
  stream extends the chart edge from then on.
- aggTrades pages ride the **same D14 ladder** as klines: venue first,
  geo/WAF 451/418/403 or an unreachable rung flips to the public spot
  mirror and pins; a 429 never flips and keeps the venue's words.
- UI: the menu renders provider ladders verbatim, Custom… validates the
  shape (`tick` or `<n>[smhdw]`), and the forming-bar bucket uses
  `tfSecondsOf` so custom second-rungs morph/glide exactly like stock ones.

Proof: targeted tape/ladder tests both suites + full suite 243 passed /
1 skipped; live engine runtime — binance `tick` (per-print, 21 ms),
`1s/15s/45s` (tape, ≤10 ms), `3m/1w` (native, ≤5 ms); coinbase `tick/15s`
(tape, ≤5 ms), `30m/2h/6h` (native, ≤6 ms); `coinbase 4h` and
`binance 3w` refuse with 404s quoting the real ladders.

## D17 — infinite scrollback on the terminal chart + windowed tape (2026-09-19)

Owner's question: "why is it that i dont have the ability to scroll
backward on the 30s or 1s or ticks" — two gates were stacked, both now
fixed without changing a single data law.

1. **The terminal chart never asked for older data.** ProChart scrolls
   within held candles and clamps at the oldest loaded bar; upstream
   drives history through `onLoadMore`, and the terminal embedding
   (`frontend/src/mount.tsx`) never wired it (the app's
   `BTCandlestickChart` had). Now wired for every book: each left-edge
   touch pages `/api/candles?end=<oldest>` once and prepends; the
   existing `prependShift` useLayoutEffect keeps the viewport glued.
   ProChart remounts per `provider|symbol|timeframe` key (the prepend
   counter belongs to a base; remount resets it cleanly). Venue-exhausted
   windows are parsed by their own words ("no history/prints/data" /
   "served no") and mark the left edge honestly — no spinner-forever.
   Held bars cap at 50k (browser-truth ceiling).
2. **Coinbase tape was tail-only.** The June 2026 docs for *Get Public
   Market Trades* document `start`/`end` UNIX-seconds windows and a
   `limit` page size (no printed max — page size asked at 1000, venue
   truncates to its truth). `_candles_tape` now pages backward by `end`
   exactly like Binance aggTrades: ≤12 pages (~12k prints), seam-deduped
   by `trade_id` (venue window bounds are second-grained). Windows the
   venue cannot serve refuse with the tape law in words; D16's printed
   "220-print window" was my conservative cap, not a venue truth —
   corrected in code, fakes and docs.

Two wire laws this exposed and fixed:

- **Tick ts must survive the wire.** `/api/candles` emitted `int(ts)` —
   two prints in one second merged into one bogus timestamp. Integral
   seconds still emit as ints (klines shape), fractional tick times emit
   as floats; the client's `<1e12 ⇒ ×1000` law absorbs both.
- **Epoch window params must parse.** The shell's tail-reload sends
  `start=<epoch seconds>`; that went straight into the RFC3339 parser
  and 404'd — so the tail-reload safety net has been silently dead for
  every timeframe (masked whenever the WS was healthy: chart moved
  anyway). The endpoint now accepts epoch numbers (fraction included,
  for tick seams) AND ISO strings.

Fakes grew teeth accordingly: `fake_coinbase` `/ticker` honours
`start`/`end`/`limit`; `fake_binance` klines honour
`startTime`/`endTime`/`limit` ascending like the real venue (the
unfiltered book was masking merge bugs in exactly this scrollback
shape).

Verify: targeted suites (binance 38, coinbase 26, api incl. 2 new wire
pins) + full suite **247 passed / 1 skipped**; frontend build clean,
bundle +1.25 kB, typecheck delta 0. Live engine: initial loads coinbase
15s 68 bars (3 tape pages, 67 ms) / tick 1998 prints; older window
fetches — coinbase 15s 34 bars 26 ms, tick 998 prints 40 ms, binance 15m
300 bars 9 ms; exhaust edges refuse with the venue's words (~2 ms);
tick tail-reload with epoch start 200/121 bars 20 ms.

## D18 — the density + typecheck chain ported in from arena/01a0baf4 (2026-09-19)

Owner: "go to this repo and implement the changes he made into this
our new terminal" (the sibling session branch `arena/01a0baf4-traderos`,
five commits on top of D15 `fd0ecac`). Applied the chain's net diff
(`fd0ecac..b0b3ba4`) onto D17 `9c8200d` with three-way merge; the two
chart bundles were excluded from the patch and regenerated from source
so `chart.js` carries BOTH lines of work (D15 morph + D17 scrollback ∪
his typecheck fixes and density TS edits). ATAS reference screenshots
came over as blobs from his commit.

The chain, with his own commit summaries:
- `17294ea` typecheck recovery: 50 errors to zero, two runtime bugs
  fixed (`NodeJS.Timeout` family + latent bugs — the exact
  pre-existing debt D15 recorded as "51 baseline"), CI gate added
  (tsc + bundle build + pytest on every push).
- `9b19bb6` ATAS density: terminal type scale `--t-2xs..--t-4xl` in one
  place (10-11px body, 12px inputs, 28/24px controls, 9.5px floor),
  Tailwind remapped onto the same vars, COMPACT/COMFY chip with a
  deliberate-reload toggle (`html[data-density]`, localStorage
  `lset-density`, replayed before first paint), --dim lifted one step
  for contrast at compact sizes.
- `9a0fd9b` density v2: 10.5px body, 24px controls, 9px micro floor.
- `ff4d97b` density v3: tabs, head strips, columns shrink with the type.
- `b0b3ba4` density v4: the four top strips the owner circled, shaved.

Verify on the merged tree: tsc **0 errors**; vite build green
(chart.css 461.9 kB, chart.js 4,436 kB); node --check clean; full suite
**247 passed / 1 skipped**; runtime engine serves index (density chip +
boot script), style.css (58 --t-2xs sites), rebuilt bundles; data lane
untouched and healthy (coinbase 15s 68 bars 55 ms, binance 84 bars
11 ms). Research screen shots: image-search/atas-*.png; plans/records:
docs/atas-density/PLAN.md, docs/typecheck-recovery/REPORT.md.

## D19 — the speed pass: compression + keep-alive + parallel history pages (2026-09-21)

Owner: "GO THROUGH THE WHOLE DATA AND IMPROVE EVERY SINGLE THING TO
ULTRA FAST AND ULTRA FASTER LOADING". Three lanes, each gated by
targeted tests + full suite + live-engine proof.

**1. Transport compression (`engine/server.py`).** GZipMiddleware on the
app + the four hot statics (`/`, `chart/chart.js`, `chart/chart.css`,
`app.js`, `style.css`) served from a pre-gzipped in-memory cache built
at startup (level 6, mtime=0 — bytes provably identical to served).
Measured over live HTTP, before → after:**chart.js 4,441,116 → 1,284,503B
(−71.1%)**, app.js 795,908 → 248,653 (−68.8%), style.css 202,495 →
48,405 (−76.1%), chart.css 461,926 → 283,532 (−38.6%, embedded woff2
already compressed), coinbase 1m API JSON 78,105 → 4,278 (−94.5%).
Cold shell ≈ 5.67MB → ≈ 1.86MB (−67%). Clients without
Accept-Encoding get the raw bytes, unchanged. HEAD falls through to
StaticFiles (Starlette has no route-fall-through; a catch-all static
route was deliberately rejected as traversal-unsafe).

**2. Keep-alive REST (`providers/_http.py`, new).** urllib paid a fresh
TCP+TLS handshake for EVERY page (4 klines / 17 candles pages on a
5000-bar load; ≤12 aggTrades pages on a tape load). `HttpPool`:
http.client idle pool keyed per base host (each rung of the D14 ladder,
each mirror, the test fake), exclusive per-thread checkout
(http.client is not shared-thread-safe — no law pretends it is),
refusal bodies (429/451) drained BEFORE the socket returns to service,
5xx/dead sockets retired honestly. One pool per host lives for the
process, so warm engine requests skip the handshake entirely. Pinned by
`tests/test_http_pool.py`: six sequential pages = ONE accepted TCP
connection; 429 words arrive intact and the same socket serves again;
parallel fan-out opens ≤ #in-flight sockets; a refused endpoint raises
and does not poison the pool.

**3. Parallel history pages (`providers/binance.py`,
`providers/coinbase.py`).** The old loops derived window N+1 only from
window N's page size — but full pages make windows clock-computable up
front, so multi-window loads now slice the plan and fetch it with
ThreadPoolExecutor (≤4 workers) over the pool. Wire protocol, request
set, merged bytes and error paths are identical to serial (both suites
pin the paging queries exactly; flaky arrival-order assertions were
converted to order-free laws because parallel fetch arrival order is
not a protocol fact). Gap law kept verbatim: a page SHORT of its ask
still triggers the vintage adaptive chase downward until filled, the
venue blanks, or `start` is covered (the Binance 10-bars-in-9-served
case proves it byte-identically — same second query as before).
Binance venue→spot ladder moves inside one lock across windows; **429
still never flips**; eligibility errors still surface with the venue's
words. Tape paging STAYS serial — each next cursor is the previous
page's oldest print; that IS the venue's paging law — but rides
keep-alive, so 12 pages pay one handshake.

Measured (live engine, fake venues, loopback — fakes add ~zero RTT, so
these deltas are handshake-overhead only; on the real internet the
parallel law multiplies by RTT per page, the owner-measurable part):
- binance 1m×5000 (4 pages): 132→45 ms cold (−66%); body 22,364B identical.
- coinbase 1m×5000 (17 pages): 71→52.6 ms cold, 28–30→~23 ms warm; body 78,105B identical.
- binance 15s×500 tape (serial pages, keep-alive): 117→~65 ms; coinbase 15s: 53→~42 ms.

Verify: targeted suites + `tests/test_http_pool.py` (7 new tests incl.
two latency-injected parallel proofs at 4×250ms RTT → <750ms wall,
serial law would be ~1s+); full suite **254 passed / 1 skipped**;
live engine restart confirms all bodies byte-equal to baseline.
