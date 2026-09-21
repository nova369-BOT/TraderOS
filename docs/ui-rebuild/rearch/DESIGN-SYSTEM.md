# PHASE C — VISUAL SYSTEM ("LSE NAVY QUANT", owner-approved "THIS")

One terminal, five environments, one language. Institutional, dense,
precise. No SaaS chrome, no giant cards, no glass, no decorative icons.

## Color (dark is primary; light = paper mirror)
Ground scale: bg0 #04060C (app) · bg1 #0A0E1A (panels) · bg2 #070B14
(bands/wells) · raise #141C30 (hover/selected) · edge #1B2436 ·
edge-strong #2A3550.
Ink: text #E6EBF5 · dim #8B94A7 · faint #5A6478 · title #8B94A7.
Chrome voice: violet #7C5CFF (active tab underline, selection bar,
primary buttons, focus) · secondary blue #5EA2FF (links, 2nd series).
Data only: up #2FD08A · down #FF5C7A · warn #F5A524 (slow feed).
AA ≥ 4.5:1 for text; violet on #0A0E1A passes for labels ≥ 10px bold.

## Typography
Chrome: Inter/Segoe UI/system sans. Data: ui-monospace stack, tabular.
Scale = shipped density tokens (--t-2xs 9 → --t-4xl 16 compact;
comfortable via [data-density]). Numbers ALWAYS mono. Titles: 10px caps
letter-spacing .08em dim. Body 10.5–11px. Nothing below 9px.

## Geometry & spacing
4px base grid. Gutters 8 (in-panel) / 12 (between panels). Panel radius
8; controls 6; chips 4; pills full. 1px borders everywhere; elevation =
border + shadow only on floating menus (0 6px 20px rgba0,0,0,.5).
Panel header 28px: caps title left, controls right, 1px edge below.

## Components
Tabs (env + sub + panel): text, 2px violet underline active, dim→text
hover. Segmented control: raise bg; active = light pill (#E8E8EE on
dark). Buttons: quiet flat (dim) default; primary = solid violet;
danger rose outline. Inputs: bg0, 1px edge, radius 6, focus 1px
accent-edge. Tables: 24–28px rows; 9px caps dim headers; mono right-
aligned numerics; hover raise; selected accent-soft + 2px left violet;
status pills (FILLED green / WORKING blue / CXL grey). LEDs 6px
live(pulse)/slow/dead. Icons 16px, 1.3 stroke, dim.

## States & motion
Hover 140ms ease raise; focus accent-edge; disabled 40%; data flash
340ms tick up/down only. No decorative animation.

## Density & docking
Compact default (ATAS band), comfortable toggle. Resizable: left rail,
right rail, docks (sash handles). Folding strips for both rails.
Layouts persist via /api/workspace/* (real).

## Per-environment character (shared system, different posture)
MARKET: quote-first — prices biggest, ladder/tape visible.
RESEARCH: reading-first — wide measure, filter side, calm.
WORKSPACE: editor-first — code dominates, terminal docked.
ECONOMIC: calendar/series-first — date spine, country nav.
BACKTEST: diagnostics-first — metrics grid + synced curves + tables.
