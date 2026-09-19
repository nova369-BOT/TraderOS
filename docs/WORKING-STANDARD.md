# Working Standard — how work on this project is done (owner-locked 2026-09-19)

Locked by the owner after the market-data recovery: *"This is how accurate
I want you to work for this project from now on."* These rules govern every
change to this repository. A rule is only absent when the record of the task
explains why.

## 1. Inspect before modifying
Read the actual code, the actual protocol documentation, and the actual
runtime before touching anything. Never assume a subsystem works because a
file, class, config entry, env var, or UI label exists. For external
protocols (venues, gateways, APIs), the current documentation plus the
repository implementation are the only truths — behavior is never invented.

## 2. Diagnose before optimizing
No "fast", no "fixed", no "working" without measurements. Instrument the
path boundary-by-boundary (timestamps at every hand-off), report
avg/median/p95/max, then change exactly what the measurement named.
Clock-skew caveats travel with any cross-machine number.

## 3. Real data only — honesty rails
No fake data, simulated prices, hard-coded values, or placeholder providers
presented as real. No polling as a substitute for live streaming. Test
doubles are *protocol-faithful mirrors* and are always labeled as such;
they never morph into production behavior. A path that cannot serve real
data reports exactly why (NotSupported-with-reason), never synthesizes it.
Every live event carries provenance: venue, provider, instrument,
timestamp, data type.

## 4. Minimal, additive, reversible diffs
Extend existing surfaces rather than spawning new ones. No chrome the
backend cannot serve. Decisions are recorded in `docs/` (see
`docs/edgedepth-integration/02-decisions.md`) with a stated reversal path.
Every modified file gets a documented reason in the task record or commit
message. Unrelated systems are out of scope — full test-suite green at
every boundary, never just the touched corner.

## 5. Proof, then report, then hard stop
A task closes with: root cause (measured/diagnosed), files changed /
added / removed, the real final data path, performance numbers, tests
listed, proof stated with its environment limits made explicit, and every
remaining limitation itemized — nothing hidden. Then STOP. No automatic
next phase, no feature creep. Work resumes only on explicit owner approval.

## 6. Failure behavior
Provider failures are isolated (one venue's death never breaks another's).
"Healthy" means real data arriving recently — never a connected socket
that sits silent. STALE is a visible state, not an assumption.

Cross-reference: the recovery that defined this standard —
`docs/market-data-recovery/REPORT.md` — is the reference task for how
these rules read in practice.


## Owner's charter (owner-locked 2026-09-19, verbatim)

1. **Build professional code — creative and super smart.** Every change
   is a design, not a patch: chosen from the trade-off space on evidence,
   written in the codebase's own voice, explained in the comment it ships
   with.
2. **Cause no bugs — only fix bugs.** No change merges on faith: it ships
   with the proof it cannot regress (targeted test(s), full suite gate,
   runtime proof through the live engine). A change that cannot be proven
   safe does not ship.
3. **Only what makes the terminal smart and ultra fast.** Smart = the
   terminal knows more and honest more (real data, measured health,
   truthful surfaces). Fast = measured fewer milliseconds and bytes on
   the paths traders touch (catalog, candles, ticks, paint). Anything
   else is out of scope until the owner asks.

These sit above every other rule in this document; where a lower rule and
the charter could conflict, the charter decides.
