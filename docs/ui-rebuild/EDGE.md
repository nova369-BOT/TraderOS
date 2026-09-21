> **SUPERSEDED 2026-09-21 (same day):** owner provided a reference screenshot of a modern institutional banking terminal ("some like this but more advanced"). The live identity is now QUANTUM-GRADE INSTITUTIONAL — see QUANTUM-PASS.md. EDGE's copper-on-navy accent/ground/motifs are retired; its discipline (AA, data-only green/red, calm motion, no CDN fonts) carries over.

# EDGE identity — the unique direction

**Date:** 2026-09-21 · **Status:** PROPOSAL (owner: "more unique, this looks vibe-coded;
research big platforms and latest UI") · Renders: `edge/01-markets-edge.png`,
`edge/02-backtest-edge.png` (directional; AI text artifacts = noise, spec below is truth)
**Supersedes:** amber-on-carbon (v2) as the *accent/ground* choice. The shipped live
pass (tokens, tick flash, feed LEDs, mono field, status bar) stays as the foundation;
EDGE re-skins and extends it.

## 1. Research gates applied (why these, why not others)

From the 2026 survey ([agiletech](https://agiletech.vn/blog/ui-design-trends/),
[stan.vision](https://www.stan.vision/journal/ux-ui-trends-shaping-digital-products),
[midrocket](https://midrocket.com/en/guides/ui-design-trends-2026/),
[Hyperliquid design dive](https://hyperliq-trade-us.pages.dev/)) we adopt only
trends with mechanical substance:

- **Dark-first from tokens** (we already ship tokens).
- **Depth as hierarchy, not ornament** — fintech 2026's three tiers:
  background-data layer / active workspace / contextual actions.
- **Micro-interactions as infrastructure** (tick flash, LEDs already shipped).
- **Type as a system** (display + mono + prose, not one face everywhere).
- **Calm motion** (140-160ms, data-caused only).
- **Hyperliquid discipline**: restrained palette, ONE vivid accent, green/red
  only for P&L, subtle glass only where it buys depth, WCAG AA.

Rejected: bento-for-marketing, neumorphism, heavy glass, gradients on chrome,
neon-on-black crypto rave, and Bloomberg amber cosplay (v2's flaw).

## 2. The identity: derived from THIS product

- **Navy carbon ground** `#0B1017` — the brand mark's navy candle, expanded into
  a surface ladder (`#101722` pane, `#141C29` raised, `#223041` edge). Not black:
  hue is identity; black is every terminal.
- **Signal copper** `#E8703A` — the single chrome voice (active underline, HUD
  brackets, command caret, focus, selected-row bar). Cockpit-instrument heritage;
  no major platform owns copper-on-navy (Bloomberg=amber/black, TV=blue,
  HL=green).
- **Teal/rose** stay data-only.
- **HUD viewfinder brackets**: 1px copper corner ticks frame the ACTIVE pane —
  the signature motif; focus = targeting, instrument language.
- **Graticule**: faint measurement grid + axis tick marks in chart/plot panes —
  oscilloscope texture; the background-data tier.
- **Live chrome**: rail tabs carry 40px inline micro-sparklines of their section's
  primary instrument (real ticks; dim when no feed) — chrome that carries data is
  the uniqueness no static dashboard has, and it is honest (dim = no feed).
- **Type system**: Space Grotesk (wordmark, pane titles — technical geometric
  caps) + IBM Plex Mono (all data/labels) + Inter (prose only). Fonts BUNDLED as
  woff2 in `ui/static/fonts` (OFL) — local-first product, no CDN at runtime.
- **6px radii**, 1px gradient-edge on raised panes, soft elevation shadows;
  glass (blur+noise) ONLY on overlays: dropdowns, dialogs, command palette.

## 3. Token delta vs shipped live pass

| Token | shipped | EDGE |
|---|---|---|
| --bg / --panel / --edge | #0b0c0e/#121316/#2a2d31 | #0B1017/#101722/#223041 |
| accent | amber #ffb000 | copper #E8703A |
| raised/hover | #1a1b1e/#202226 | #141C29/#182231 |
| radius | 0-3px | 6px (2px chips) |
| overlays | flat | blur+noise+shadow |
| title face | mono | Space Grotesk caps |

## 4. Build order (owner "go")

- **E1 tokens+type**: navy ladder, copper accent, radii, bundled fonts, title
  face; preview A/B vs current.
- **E2 motifs**: HUD brackets on active pane, graticule ticks in canvas, live
  tab sparklines (real ticks; dim without feed), glass overlays.
- **E3 sections**: S1-S5 layouts from SECTIONS.md restyled on EDGE.

Each phase: tsc 0 · build · pytest · loopback runtime · preview eyes · record.
