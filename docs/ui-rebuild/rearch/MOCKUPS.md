# PHASE D — VISUAL MOCKUPS, batch 1 (2026-09-21)

Identity: LSE NAVY QUANT (DESIGN-SYSTEM.md). Every screen below is
directional composition; ALL labels/numbers in the live build come from
the engine (render text noise like "$04060C" or "QUANTITAKE" is image-
generator artifact, not specification).

| # | File | Screen | Real features composed (AUDIT.md §3) |
|---|------|--------|--------------------------------------|
| 01 | mock/01-market-chart.png | Shell + MARKET Price & Charts | watchlist+flash, instrument header (bid/ask/spread/vol/session from provider), TF/type/indicators/panes/source/templates/layout (all real controls), candles+MA+volume+RSI panes, Depth ladder + T&S (L2/COB/T&S real), account dock (sim), statusbar LEDs/UTC |
| 02 | mock/02-market-options.png | MARKET Options | underlyings rail, chain w/ greeks+expiry+strike windows, Chain/Flow, IV smile / term structure / volume-by-strike / payoff, P/C tiles (all in optpage today) |
| 03 | mock/03-market-news.png | MARKET News | wire feed + newsroom + reader; LEFT filter column = PROPOSED composition of existing source wiring (feed column exists; filter rail proposed) |
| 04 | mock/04-market-screener.png | MARKET Screener | class chips, 6 view presets, virtualized table, pager, profile card w/ Open chart (all real) |
| 05 | mock/05-research.png | RESEARCH | articles feed + filter side + search + in-terminal PDF reader + Ask AI + QUANT MODELS sub-tab (all real) |
| 06 | mock/06-workspace-ide.png | WORKSPACE IDE | library tree, editor tabs, highlight editor, RUN, plots strip, PTY terminal tabs, assistant rail (all real) |
| 07 | mock/07-economic-calendar.png | ECONOMIC Calendar | date spine, importance/country filters, ACTUAL/CONSENSUS/PREVIOUS, event detail w/ history chart (real island; detail panel = composition of existing data) |
| 08 | mock/08-economic-series.png | ECONOMIC Yields/Indicators | curve today/1m/1y, tenor-across-countries, central-bank policy rates & schedules (real sub-views); right mini-panels compose existing series data |
| 09 | mock/09-backtest-run.png | BACKTEST config+run | strategy tree, datasets, editor, RUN/LIVE PAPER, mode segmented (Backtest/MC/WF), from/to, risk stats, MC runs/seed, WF folds/train (all real bt options), terminal log, run card, assistant analysis |
| 10 | mock/10-backtest-results.png | BACKTEST results | synced equity+benchmark / drawdown / price+trades, metrics grid (bt-stats), run summary, WF heatmap + MC histogram (real modes), trade list (report) |

Deferred to next turn (image cap 10/10 reached):
| 11 | shell-command.png | GLOBAL COMMAND PALETTE — **PROPOSED FUTURE CAPABILITY** (symbol search + datalist exist today; palette does not) |
| 12 | shell-light-settings.png | LIGHT THEME (exists) + SETTINGS DRAWER (theme/density/providers/layouts exist as controls/endpoints; unified drawer is proposed composition) |

## Evaluation gate
Batch 1 frozen pending owner review. Phase E (implementation) starts
only after approval; it re-skins/re-composes the LIVE app onto this
system with zero feature loss, per-environment posture as in
DESIGN-SYSTEM.md, gated by pytest 219/1 + preview eyes at every step.
