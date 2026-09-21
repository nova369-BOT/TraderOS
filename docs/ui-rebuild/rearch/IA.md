# PHASE B — INFORMATION ARCHITECTURE (from code, not names)

Five environments as top tabs (charter naming): MARKET · RESEARCH ·
WORKSPACE · ECONOMIC · BACKTEST. Every leaf below exists today
(verified in app.js SUBRAIL/openers + sections); items marked [PROPOSED]
do not.

SHELL (persistent)
├── Top: brand · env tabs · global search [PROPOSED command palette;
│   today: symbol search + datalist] · connection chip · account chip ·
│   theme · density · walkthrough · update · github
├── Left: context rail (MARKET: watchlist · BACKTEST/WORKSPACE: library
│   tree · ECONOMIC: country/category nav [today inside pages] ·
│   RESEARCH: filter side)
├── Right: assistant rail (ticket + widgets on MARKET; brief on BACKTEST)
└── Bottom: statusbar (feed LEDs live/slow/dead, ws state, UTC clock)

MARKET
├── Price & Charts — chart engine, indicators, panes/grids, depth heat/
│   footprint, L2 COB, T&S, L3 (plan-gated), templates, layouts
├── Options — chain · flow · greeks · IV smile · term structure ·
│   volume-by-strike · payoff
├── News — globe wire · newsroom · reader (macro variant under ECONOMIC)
├── Screener — class chips · 6 view presets · virtualized table · card
└── Trading — paper ticket · account dock · broker hub

RESEARCH
├── Articles — feed · filters · search · PDF reader · Ask AI
└── Quant Models — interactive model visualisations

WORKSPACE
├── IDE — tree · tabs · editor · RUN · PTY terminal · plots
├── Data Visualisation — chart builder island
├── Notebook — infinite canvas documents
└── Indicators — registry · Python/Brue editor · live preview

ECONOMIC
├── Calendar — events · actual vs consensus · history charts
├── Indicators — macro series by country/category
├── Bond Yields — curve today/1m/1y · tenor across countries
├── Central Banks — policy rates · balance sheets · decision schedule
└── News — macro-filtered wire

BACKTEST
├── Algo Development — strategy IDE · run · Monte Carlo · walk-forward ·
│   risk stats · plots · live-paper (Brue) · terminals
├── Machine Learning — 21-model catalog · blueprints · dataset builder ·
│   logs · results · recent runs
└── Manual — bar replay · SL/TP · session report

GLOBAL TOOLS (doors, not environments): MY DATA import · LSE databank
import · connections hub · saved layouts · guide.
