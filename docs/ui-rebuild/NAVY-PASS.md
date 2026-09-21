# LSE NAVY QUANT PASS — the owner's "THIS" (2026-09-21)

Owner pasted a full mock of the terminal (deep-navy quant-research IDE,
violet chrome, horizontal section tabs, research-navigator tree, run
configuration panel, assistant analysis card) and said **"THIS"**.
This pass wears that identity on the LIVE terminal. Supersedes
QUANTUM-PASS (slate/electric-blue, left icon rail) and, with it, EDGE.

## Identity (style.css, both themes)
ground #04060c · panel #0a0e1a · band #070b14 · edge #1b2436 ·
text #e6ebf5 · dim #8b94a7 · accent violet #7c5cff · secondary blue
#5ea2ff · accent-soft rgba(124,92,255,.16) · up #2fd08a · down #ff5c7a ·
warn #f5a524 · sans chrome + mono numerals · cards 10px, controls 6-8px.
Logo recolor: violet down-candle + green up-candle (the brand mark's
own shape, in the mock's hues).

## Chrome (matches the mock)
- Top bar: brand wordmark left ("LSE / London Strategic Edge Terminal"),
  horizontal section tabs with violet active underline, right cluster =
  connection chip, status chip, WALKTHROUGH / MY DATA / UPDATE / GITHUB /
  theme / density.
- Second header row: the active section's sub-views as quiet uppercase
  tabs, violet underline on active.
- Symbol search widened in the chart toolbar ("Search symbols, files,
  strategies…"), like the mock's command search.
- Primary actions (Run Backtest, RUN, ML RUN, Connect) wear solid violet.
- Panels stay bordered cards on the navy ground (kept from the quantum
  pass); statusbar LEDs/clock kept.

## Reversal / non-regression
- DOM restored to top tabs: #navrail/#navfold/#crumbs removed; #rail,
  #subrail, #symbol back in the header/toolbar. The quantum shell
  observer in app.js no-ops safely (crumbs node absent).
- Every id/handler/endpoint/shortcut/density/light-theme path untouched;
  tokens + appended cascade + node moves only.
- guide.md updated to describe the top-tab chrome.
- Proof: pytest baseline green (219 passed / 1 skipped), node --check
  clean, CSS brace-balanced, served HTML verified.

## Still to converge with the mock (next passes, real data only)
- BACKTEST composition: run-configuration card (existing bt options
  restyled right column), run-summary card, bottom analysis band tabs.
- Research-navigator tree styling for the library sidebars.
No synthetic controls: anything the engine cannot serve stays absent.
