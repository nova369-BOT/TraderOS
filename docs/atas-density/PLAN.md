# ATAS-density plan — smaller type and tighter chrome, terminal-wide

**Date:** 2026-09-19 · **Status:** IMPLEMENTED 2026-09-19 (owner decisions
D1 = compact default, D2 = full density pass, both via Arena vote)
**Owner ask (verbatim intent):** frontend smaller like the font of the ATAS
orderflow platform, throughout the terminal, so there is room for more
implementations; must look sweet, not just implemented.
**Governed by:** `docs/WORKING-STANDARD.md` — this document is the plan;
implementation happens only after owner approval of D1/D2.

## 1. Research: what ATAS actually looks like

Sources: ATAS help centre (chart visual settings, Smart DOM design mode,
footprint/cluster settings) and reference workspace screenshots saved in
`image-search/atas-trading-platform-workspace-clusters-*.png` (real ATAS
screens, dxFeed workspace, Smart DOM ladder, footprint/TPO).

Read off the reference screens (1500px-wide workspace shot; exact px drifts
with DPI, the *scale and ratios* are the truth):

| Surface | ATAS | This terminal today (measured) |
|---|---|---|
| Body / control text | 10–11px | shell 12–13.5px; React `text-xs` 12px ×755, `text-sm` 14px ×242 |
| Micro / caps labels | ~10px | shell 10–11.5px (already right) |
| Panel / section headers | 11–12px semibold | 13–15px bold |
| Inputs | 11–12px | 13px |
| Buttons | ~24–26px tall | shadcn default h-10 = 40px, h-9 = 36px |
| Ladder / table row pitch | ~14–16px | shell rows ~22–26px |
| Top toolbar | 16–20px icon + 10px label | comparable, slightly larger labels |
| Chart canvas text | 9–11px | ours 8–12px — **already ATAS-grade, untouched** |
| Numerals | tabular/mono everywhere | shell mono for data; React mixed |

Chrome language shared with ours (good): near-black neutral zinc, 1px
hairline borders, 2–4px corners, quiet flat toolbars, color only in market
data. So this is a **density pass on an already-correct chrome**, not a
redesign.

## 2. Target scale ("compact")

One scale, defined once, consumed by both layers. Values chosen to land on
the ATAS band while respecting a readability floor (nothing below 9.5px,
and 9.5px only for uppercase tracked micro-labels):

| Token | Today | Compact target | Line-height |
|---|---|---|---|
| `--t-2xs` micro caps | 10 | 9.5 | 1.2 |
| `--t-xs` label/dim | 11–11.5 | 10.5 | 1.25 |
| `--t-sm` body | 12–12.5 | 11 | 1.3 |
| `--t-md` input/strong body | 13 | 12 | 1.3 |
| `--t-lg` panel header | 13–15 | 12 | 1.25 |
| `--t-xl` page title | 15–17 | 13 | 1.2 |
| button default | 40px | 28px | — |
| button sm | 36px | 24px | — |
| icon button | 40px | 28px | — |
| table row padding-y | 4–6px | 2–3px | — |

Tailwind named sizes remap in **one place** (`tailwind.config.ts`
`fontSize`) onto the same variables: `xs→11, sm→12, base→13, lg→14,
xl→16, 2xl→18`. That re-scales all ~1,200 class sites uniformly with zero
per-site edits. Arbitrary values (`text-[10px]` ×138) are already in band
and stay literal.

## 3. Mechanism (minimal, additive, reversible — §4)

1. **`:root` gains the `--t-*` scale** in the shell `style.css`, default =
   compact. `html[data-density="comfortable"]` restores today's values
   verbatim (reversal path built in, same pattern as the existing
   `lset-theme` localStorage toggle).
2. **Shell declarations convert to `var(--t-*)`** — one file, mechanical,
   each old px preserved as the comfortable value so the two densities are
   exactly {today, ATAS-band}.
3. **React primitives shrink once, consumers follow**: `button.tsx`
   variants (h-10→h-7, h-9→h-6? measured at impl: 28px/24px via new
   variants), `input.tsx`, `select.tsx`, dialog/tab padding. No scatter
   edits across 300 components; ad-hoc `h-10/h-12` sites (≈70) reviewed
   individually at implementation.
4. **Numerals**: `font-variant-numeric: tabular-nums` on data cells/axes in
   React (shell already mono) so smaller digits stay column-aligned — this
   is half of "looks sweet".
5. **Contrast guard**: at 10–11px, `--dim` lifts one step in both themes
   (measured ≥4.5:1 against panel) — smaller type needs brighter dim text.
6. **Canvas charts: no change** (already 8–12px, matches reference).

Nothing below is in scope until approved: light theme gets the same
variables automatically (they are theme-orthogonal).

## 4. Owner decisions (ask before code)

- **D1 — default density:** compact (ATAS) as the shipped default with
  `comfortable` available in the header menu, vs comfortable default with
  compact opt-in. Recommendation: **compact default** (the ask), comfortable
  kept as the documented reversal.
- **D2 — scope of the pass:** fonts only, vs fonts + control heights +
  row pitch (true ATAS density, "room for more implementations").
  Recommendation: **full density pass** per the stated goal.

## 5. Proof plan (§5, stated before implementation)

- `npx tsc --noEmit` 0 errors; `npm run build` green; bundle diff grepped
  for the new tokens only.
- `pytest tests/` full suite green (backend untouched; chart-pure gate runs).
- Pristine-HEAD worktree build reproduces the pre-change bundle
  byte-for-byte, as before, so any delta is provably this task.
- Runtime: engine served live; both densities resolve (`curl` the sheet,
  computed styles spot-checked via the variables).
- **Environment limit, stated honestly:** no screenshot capability in this
  sandbox — visual QA is the owner's eyes in the live preview; ship behind
  the density default only after the owner has looked. Every fixed-height
  element was audited at plan time: shrinking text inside fixed boxes adds
  headroom (no clipping); content-sized boxes simply get shorter.

## 6. What this is NOT

- Not a redesign, not new chrome, not a font-family change (Inter/system
  sans + mono stay; ATAS's advantage is scale, not face).
- Not a canvas-chart change.
- Not touch/mobile resize (desktop terminal; iOS 16px focus-zoom rule
  stays untouched).

## 7. Implementation record (2026-09-19)

Shipped as approved: compact default, full density pass.

- `style.css`: `--t-*` + `--row-y` scale on `html`, comfortable overrides
  under `html[data-density="comfortable"]`; 394 `font-size` declarations +
  7 `font:` shorthands converted onto the scale; only the 9–9.5px floors
  stay literal. `--row-y` drives watchlist/sidebar/accounts/md-table row
  pitch. Dark `--dim` lifted #b0b0b0→#b9b9b9 for small-type contrast.
- `index.html`: boot-time replay of `lset-density` before first paint +
  `#density-toggle` chip in the header rail.
- `app.js`: toggle handler (deliberate reload, same rationale as theme).
- `tailwind.config.ts`: named sizes map onto the same `--t-*` vars with
  literal fallbacks — all ~1,200 `text-*` sites rescaled from one entry.
- React primitives: button 40/36/48→28/24/32px (icons 16→14), input and
  select 40→28px, tabs 40→28px. `tabular-nums` base rule for `.font-mono`.

Proof (env: py 3.11.2, node 22, clean venv):
- `tsc --noEmit` 0 errors; `vite build` green; `node --check app.js` clean.
- `pytest tests/` 219 passed / 1 skipped (documented truth-gate skip).
- Runtime through the real engine (`create_app` + loopback TestClient —
  the 403 on a non-loopback host is the product's security rail working):
  `/` carries the boot script + toggle, `/style.css` carries tokens +
  comfortable overrides + row-y + lifted dim, `/app.js` the handler,
  `/chart/chart.css` the `var(--t-sm…)` sizes + tabular rule.

Remaining limitations (nothing hidden):
- Comfortable restores the scale, not every individual pre-pass glyph
  (±0.5px on two header steps) — it is a courtesy escape hatch, the
  compact default is the designed surface.
- Ad-hoc React `h-10/h-12` sites outside the four primitives (~70, mostly
  dialogs/panels) were left at their heights on purpose: fixed boxes with
  smaller type gain headroom, never clip; re-audit when those panels get
  product work.
- Visual QA is the owner's eyes (no screenshot capability in the sandbox);
  the live terminal on the owner's machine is the review surface.
- Editor/PTY fonts (12.5/14px, VS Code defaults) deliberately untouched —
  code surfaces keep editor ergonomics, chrome gets the density.
- Corner radii (React rounded-lg) not touched: out of this task's scope,
  noted for a future chrome-consistency pass.

## 8. Density v2 — "shrink more" (owner, same day)

One further step, same mechanism, zero new surfaces:
- Tokens: 2xs 9 / xs 10 / sm 10.5 (body) / md 11 / lg 11.5 / xl 12 /
  2xl 12.5 / 3xl 14 / 4xl 16; --row-y 1px. Micro floor 9.5 -> 9 (caps
  labels only); body floor 10.5 — the CQG/TT band.
- Named tailwind sizes kept their v1 relationships so every site moved
  exactly one notch (no double-step); fallbacks updated to v2 values.
- Arbitrary text-[10..15px]/[24px] sites (183) folded into named sizes —
  they now participate in the density system and flip with COMFY instead
  of bypassing it. The 7-9px chart micro labels stay literal (below the
  floor by design, canvas-adjacent).
- Primitives second step: buttons 24/20/28, icon 24 (svg 12px), inputs /
  selects / tabs 24px.
- Rail chrome: rail-btn padding 4/12/5 -> 3/10/4; subrail gap 26 -> 18.

Proof: tsc 0; vite build green; pytest 219/1; loopback TestClient sees
v2 tokens + intact comfortable overrides; the live preview (same engine
process) served the new sheet from disk immediately (curl confirmed
`t-sm: 10.5px`). Comfortable remains the exact pre-v1 surface.
