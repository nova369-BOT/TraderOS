> **SUPERSEDED 2026-09-21 (same day):** owner chose their own mock — see NAVY-PASS.md. Navy ground + violet chrome + top section tabs replace slate/electric-blue + left icon rail.

# QUANTUM-GRADE INSTITUTIONAL PASS — live shell re-skin (2026-09-21)

Owner directive (with reference screenshot of a modern institutional
banking terminal): **"some like this but more advanced"**. This pass
ships that language LIVE in the terminal. It supersedes EDGE.md's
copper-on-navy direction for accent/ground/motifs; EDGE's discipline
survives where it agrees with the reference (AA contrast, data-only
green/red, calm 140ms motion, no CDN fonts).

## Reference read (screenshot, not saved — described here)
- Layered near-black neutrals; panels are **bordered cards** (1px edge,
  ~10px radius) floating on a darker app ground.
- **Left icon nav rail**: brand block, search, grouped sections, active
  item = violet-tinted pill + left accent bar; children nested under the
  active parent.
- **Topbar**: hamburger + breadcrumb (Home / section / view), right icon
  cluster; violet is the ONLY chrome voice.
- Sans chrome type; tabular/mono numerals; active timeframe chip is an
  inverted LIGHT pill; BUY green-tint, SELL neutral; green/red reserved
  for direction and P&L.

## Tokens (style.css :root, both themes)
ground #0a0a0c · panel #131317 · band #0e0e11 · edge #26262d ·
text #e6e6ea · dim #8f909a · accent #8b5cf6 / #a78bfa ·
accent-soft rgba(139,92,246,.16) · up #22c55e · down #f6465d ·
warn(--amber) #f5a524 (slow LED only) · focus #6d5bd0 · radius 6 (cards 10,
chips 4) · sans stack (no CDN) + existing mono data field.
Light theme mirrors with #6d28d9 accent on paper.

## What shipped (live, this pass)
1. `#navrail` left rail: brand mark (the logo's two candles), symbol
   search (the same #symbol input, moved), vertical #rail with inline
   stroke icons, #subrail nested under the active section.
2. Header: hamburger (#navfold folds the rail), live breadcrumb
   (#crumbs) mirrored from the existing .active classes.
3. Body becomes a CSS grid (rail/head/main/foot); main children are
   bordered card panels; statusbar keeps its LEDs/clock on the band.
4. Shell observer appended to app.js: additive MutationObserver only —
   nests #subrail, feeds #crumbs, wires #navfold. No handler touched.
5. guide.md line updated so the walkthrough stays truthful.

## Non-regression proof
- All ids/classes app.js addresses unchanged (rail buttons, subrail,
  symbol, status, toggles); floating panels remain position:fixed so the
  body grid has exactly four in-flow areas.
- pytest 219 passed / 1 skipped (baseline). app.js `node --check` clean.
- CSS brace-balanced; re-skin is a token swap + appended cascade block,
  so `data-density=comfortable` and the light theme remain the reversal
  paths. No TS/React change this pass (tsc/vite untouched).

## More advanced than the reference (already live here)
per-tick price flash, feed-health LEDs, paper-account dock, L2/L3
orderflow, options analytics, screener, AI rail, backtest IDE — the
reference is a static showcase; this is a working terminal wearing the
same discipline.

## Next (S-passes, per SECTIONS.md layouts on this shell)
S1 MARKETS (watchlist sparklines from real ticks, symbol meta strip) →
S2 BACKTEST → S3 ECONOMIC → S4 WORKSPACE → S5 RESEARCH, each gated
(pytest + preview eyes) and recorded here.
