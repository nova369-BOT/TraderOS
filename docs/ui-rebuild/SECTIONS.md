# Section specs — Carbon Institutional per-page layouts

**Date:** 2026-09-21 · Companion renders in `docs/ui-rebuild/sections/` (directional;
AI text artifacts inside them are noise, the PANE INVENTORY below is the spec).
Render-level corrections baked into this spec: F-key strip = amber TEXT on carbon
(not amber-filled chips, as two renders mis-drew); status strip stays carbon with
amber key labels; code/typo artifacts ignored.

Honesty rule per pane: EXISTING = shipped today (restyle into the pane grid),
ADDITIVE = new surface built only from real engine data (flagged, owner-visible).

## 01 MARKETS (`01-markets.png`)

| Pane | Status | Source |
|---|---|---|
| WATCHLIST — rows, groups, tick flash, amber select | EXISTING | shell watchlist (shipped flash v-live) |
| chart pane (candles, SMA readout, last-price tag, vol profile) | EXISTING | ProChart/canvas engine |
| DOM — L2 ladder w/ depth bars + spread row | EXISTING | L2 depth pane / `/api/ws` books |
| TIME & SALES tape, big prints amber | ADDITIVE | built from real `/api/ws` ticks only; prints = size ≥ p95 of last 500 |
| VERON assistant + tool chips | EXISTING | right rail |
Command line + F-strip + feed LEDs | EXISTING/SHIPPED | live pass |

## 02 BACKTEST (`02-backtest.png`)

| Pane | Status | Source |
|---|---|---|
| STRATEGY editor well (`# run:` header amber) | EXISTING | workspace editor reused on BACKTEST |
| EQUITY CURVE — walk-forward fold lines F1..Fn + MC band | EXISTING | BacktestReport (WF folds, Monte Carlo shipped) |
| metric chips SHARPE/SORTINO/MAXDD/VAR95/TIME-IN-MKT | EXISTING | report stats |
| TRADES table w/ MAE/MDD, amber row select, cost footer | EXISTING | trade list + commission/slippage settings |
| PARAMETERS (lookback, ATR stop, range, WF/MC toggles, [RUN]/[KILL]) | EXISTING | setup dialog fields restyled as a pane |
| DRAWDOWN histogram | EXISTING | report drawdown series |

## 03 ECONOMIC (`03-economic.png`)

| Pane | Status | Source |
|---|---|---|
| REGIONS filter w/ counts + HIGH ONLY | EXISTING | calendar page filters |
| CALENDAR week grid: importance squares, ACT/FCST/PREV, teal/rose surprise, NOW line | EXISTING | LSE econ feed (real values) |
| countdown chip "FOMC in hh:mm:ss" | ADDITIVE | computed from the feed's real release timestamps |
| US 10Y yield w/ amber event flags | EXISTING+ADDITIVE | USYIELDS dataset + flags joined on release dates |
| SURPRISE INDEX bars | ADDITIVE | ACT−FCST from the same feed (real math, no synth) |
| RELEASES FEED wire | ADDITIVE | wire view over the same feed rows |

## 04 WORKSPACE (`04-workspace.png`)

| Pane | Status | Source |
|---|---|---|
| FILES tree w/ modified dots | EXISTING | workspace file API |
| EDITOR w/ line numbers, breakpoint dot, minimap | EXISTING (breakpoint ADDITIVE, cosmetic marker in editor state) |
| RUN — LIVE: LED, [KILL], log lines, position card, risk line | EXISTING | algo live runner + journal + killswitch |
| TERMINAL (xterm) | EXISTING | workspace terminal WS |
| F5 RUN / F6 KILL / F7 TEST | ADDITIVE wiring over existing actions |

## 05 RESEARCH (`05-research.png`)

| Pane | Status | Source |
|---|---|---|
| WIRE list w/ source chips (NBER/BIS/FED/ECB), stars | EXISTING | research feed |
| READER w/ highlight + margin annotation | EXISTING pdf text + ADDITIVE highlight store (workspace section) |
| VERON SUMMARY + confidence cells | EXISTING | assistant read_research_paper |
| CITES cited-by/refs | ADDITIVE when the feed carries citation fields; else pane reports "not in feed" (no synth) |
| NOTES w/ [@id] backlinks | ADDITIVE workspace section |

## Build order (owner "go")

S1 MARKETS restyle+T&S tape · S2 BACKTEST grid · S3 ECONOMIC grid ·
S4 WORKSPACE grid · S5 RESEARCH grid. Each: tsc 0 · build · pytest · loopback
runtime check · preview eyes · record appended. Palette/grammar already live
from the shipped live pass; these phases are layout + the flagged additives.
