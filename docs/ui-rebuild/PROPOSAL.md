# UI rebuild proposal — v2 "Carbon Institutional"

**Date:** 2026-09-21 · **Status:** PROPOSAL v2 — owner review; build starts on "go"
**Companion mockups:** `docs/ui-rebuild/mockup-institutional.png` (THE direction)
and `mockup-carbon.png` (v1, SUPERSEDED — read as too startup-SaaS; owner:
"I want something more professional")
**Owner ask:** complete rebuild into something more modern, unique, professional —
while keeping the whole thing fully functional. Serious.

## 0. Why v2 is the professional line (research)

- **Density is a trust signal** — "a screen showing little information reads as
  hiding something; a screen showing everything reads as nothing filtered"
  (Bloomberg CRT design study, [2](https://designbycurio.com/learn/bloomberg-terminal-green)).
- **Mono must dominate the visual field** — "if a viewer's eye lands on
  proportional type first, the Bloomberg illusion breaks" (same source).
- **Speed grammar over menu hierarchies** — command line + function keys shave
  seconds; that is what decades of terminal design optimized for
  ([1](https://www.quora.com/Why-do-Bloomberg-terminals-have-such-non-standard-interfaces)).
- **Amber, not green, for long sessions** — softer on the eye when charts fill
  the screen (phosphor history, [3](https://news.ycombinator.com/item?id=19153875)).
- v1's teal-on-carbon with chips and cards is exactly the "modern SaaS" layer
  this research says reads as costume on a professional instrument. v2 removes it.

## 1. The design system v2 (tokens → code)

| Token | Value | Role |
|---|---|---|
| ground `--bg` | `#0B0C0E` | page floor |
| pane | `#121316` | every panel |
| pane-head | `#17181B` | 22px pane title bars |
| border | `#2A2D31` | 1px grid lines, exact |
| text / dim | `#D6D9DC / #8B9096` | mono field |
| **amber** | `#FFB000` | selection, command, active, focus — the ONLY chrome color |
| up / down | `#21B3A4 / #F0426C` | market direction only (unchanged) |
| radius | 0 (2px on chips max) | rigid |
| shadow/gradient/glass | none (overlays: 1px border + flat drop) | austere |
| type | mono (Cascadia/IBM-Plex class, existing `--mono`) dominates chrome+data; sans ONLY for prose (assistant replies, guide, docs) | mono-dominance rule |
| density | the shipped `--t-*` v4 scale stays | owner-approved |

Signature grammar (all present in the mockup, all additive or restyle-only):
1. **Command line** top: `BTCUSDT 1H <GO>` with amber block cursor — symbol+TF
   jump + action verbs; Bloomberg grammar, keyboard-first.
2. **Function-key strip** bottom: F1 MARKETS … F9 LAYOUT, keys amber, names dim;
   wired to the existing rail handlers.
3. **Pane title bars**: 22px, mono caps 10px ("WATCHLIST — BINANCE",
   "BTCUSDT · 1H · BINANCE", "VERON — ASSISTANT") — panes read as instruments.
4. **Selection language**: amber left bar + #1A1B1E fill (watchlist), amber
   underline on the active rail tab, amber dashed last-price line (chart keeps
   its own tag color logic; the DASH is the new chrome voice).
5. **Feed-health** right of the F-strip: `BNB 12ms · CB 31ms · VAULT OK` from
   `/api/diag` — smart+honest, carried over from v1.

## 2. What does NOT change (function rails)

Every element id, hook, endpoint, shortcut, workspace persistence, the chart
canvas engine, the density system + COMFY toggle, the loopback host guard, the
honesty rails. Rebuild = token block + chrome class layer + three additive
mounts (command line, F-strip, pane title bars). React islands pick the palette
through the existing var() bridges; mono-dominance there is a scoped class pass
on chrome text (labels/buttons/tabs), never on prose.

## 3. Phases (each ships green, each reversible, record appended here)

- **P1 Tokens & palette**: ground/pane/border/amber swap; radius to 0-2; light
  theme becomes "Paper Institutional" (white panes, #1B1E24 text, amber #B26A00).
- **P2 Chrome grammar**: command line bar + F-strip + pane title bars + rail
  underline language; hover-scale removed.
- **P3 Panes**: watchlist/assistant/ticket/dialogs to the rigid pane language;
  mono-dominance class pass on chrome text.
- **P4 Behavior**: `<GO>` parsing (symbol/TF/action verbs against existing
  routes), F-key wiring, command history (↑/↓), hosted-safe.
- **P5 Sweep**: 120-160ms micro-motion where it aids scan (underline glide,
  row hover), AA contrast pass at 10px, empty states in mono voice.

## 4. Decision requested

"Go" starts P1. Any token (amber hue, ground depth, pane-head height) is a
one-line change while the system is token-driven — adjust now or after seeing
P1 live in the preview.

## 5. SHIPPED 2026-09-21 — "the live professional pass" (owner: "I want
something INTERACTIVE and professional… this is serious")

Owner rejected static mockups as the deliverable; interactivity shipped LIVE
instead of being pictured. Implemented now, on real data:

- **P1 palette**: Carbon Institutional tokens in style.css (`#0b0c0e /
  #121316 / #2a2d31`, amber `#ffb000` as the only chrome voice via
  `--accent-bar`, dim lifted for AA at 10px); light theme = Paper
  Institutional with `#a86400` amber. Body font switched to the mono stack —
  mono-dominant field per the research rule. Tailwind radii 10/12 → 3/4.
- **Live tick flash**: `flashTick()` re-triggers a 340ms phosphor pulse
  (teal up / rose down) on every REAL price change in both paint paths
  (websocket `onTick` + board poll `paintBoardPrice`); unchanged ticks never
  flash — a flash without a change would be fake data (§3 rails).
- **Feed-health status bar**: `<footer id="statusbar">` — per-source LEDs
  (live <5s / slow <15s / dead) from observed tick/poll recency, WS state,
  UTC clock; 1s heartbeat. STALE is visible, per the working standard.
- **Micro-interactions**: 140ms chrome hover transitions; React buttons lose
  hover-scale bounces and glow shadows (hover = brightness step).

Proof: `node --check` clean; `tsc` 0; vite build green; pytest 219/1 twice
(one load-flake in test_orderflow under full-run CPU pressure passed both in
isolation and on the confirming rerun — static shell/frontend cannot reach
backend orderflow logic); running preview serves the new sheet, markup and
app.js from disk (curl-verified). P2-P5 (command line, F-strip, pane title
bars, `<GO>` behavior) remain the next phases on owner "go".

---

# ↓ v1 "Refined Carbon" — SUPERSEDED by v2 above (kept as record)

## 1. Research grounding

- **ATAS / pro orderflow** (shipped as density v1–v4): 10–11px type, 24px controls,
  tabular mono numerals — the density discipline stays.
- **Bloomberg-lineage terminals** (OpenTerminalUI, Fortress/Signal dashboards,
  [3](https://colorlib.com/wp/dark-admin-dashboard-templates/),
  [4](https://github.com/Hitheshkaranth/OpenTerminalUI)): dark-first is a usability
  requirement for long sessions, not an aesthetic; GO/command bar (Ctrl+K) is the
  modern pro standard; function-key workspaces; ticker/health strips.
- **Modern SaaS dark** (Cryptoys-class kits, [1](https://www.figma.com/community/file/1359230717010633204/trading-stock-market-dashboard-platform-ui-kit),
  [2](https://www.figma.com/community/file/1443235511542147144/tradestackui-design-system-with-light-and-dark-mode-variables)):
  what to TAKE — layered elevation, calm spacing rhythm, one accent, crafted empty
  states — and what to REFUSE — glassmorphism, gradient chrome, 12px radii, glow
  everywhere (reads as generic AI-dashboard chrome; our own style.css bans it and
  the owner's "unique/professional" agrees).
- **Trading-app design principles** ([5](https://lollypop.design/blog/2026/june/trading-app-design/)):
  token-based system, WCAG 2.1 AA (≥4.5:1 on data text), dark-mode-first,
  component reuse over one-off styling.

Synthesis: **the discipline of a pro terminal with the refinement of a 2026 design
system.** Neutral carbon chrome; exactly ONE accent (teal, derived from the live
data color) reserved for *live/active/focus*; market color only in data.

## 2. The design system (tokens → code)

| Token | Value | Replaces |
|---|---|---|
| floor `--bg` | `#0F1013` | `#1c1c1c` |
| panel | `#16181C` | `#2a2a2a` |
| raised | `#1C1F24` | `#343434` hovers |
| edge | `#262A31` | `#3a3a3a` |
| hairline | `rgba(255,255,255,.05)` | kept |
| text / dim / title | `#E7EAEE / #9AA1AB / #8B939E` | current zinc trio (dim lifted for AA at 10px) |
| accent (live/active/focus) | `#21B3A4` | neutral-only accent-bar |
| warn / down | `#C58435 / #F0426C` | kept |
| radius | 4px uniform (6px overlays) | mixed 2/10/12 |
| shadow | overlays only `0 8px 24px #0006` | scattered |
| motion | 120–160ms `cubic-bezier(.2,.7,.3,1)` | ad-hoc |
| light theme "Porcelain" | `#F7F8FA / #FFF / #E4E7EC / #1B1E24`, accent `#0D8A7D` | current light zinc |

Type: the shipped `--t-*` density scale stays (10.5px body floor). Numerals stay
mono tabular. Caps micro-labels keep tracking.

## 3. Signature surfaces (the "unique")

1. **Command bar (Ctrl+K / ⌘K)** top-center: symbol lookup + route navigation +
   actions, Bloomberg-GO style. Additive feature; keyboard-first; the single most
   "modern professional" signal in the research set.
2. **Feed-health status bar** (bottom, 24px): per-source LEDs with live latency
   (`/api/diag` already serves venue ms) — BINANCE 12ms · COINBASE 31ms · LSE VAULT.
   Smart = honest: health is visible, STALE is a state, per the working standard.
3. **Refined rail**: active tab = raised surface + 2px teal underline that animates
   between tabs (160ms); hover = text lift only.
4. **Watchlist rows**: hover/selected left 2px teal bar (exists) + group headers
   with right-aligned mono counts (exists) on `--bg2` bands; sparklines kept.
5. **Assistant rail**: suggestion cards as 1px-bordered 4px chips (mockup), tool
   chips mono; header carries a live model LED.
6. **Focus/hover language**: teal focus rings, 120ms hover lifts on controls,
   pressed states; no scale-105 bounces (current buttons scale on hover — consumer
   chrome, removed).

## 4. What does NOT change (function rails)

- Every element id, hook, endpoint, keyboard shortcut, workspace persistence.
- The chart canvas engine (BTChart/ProChart internals) and its device configs.
- Density system (`--t-*`, COMFY toggle), loopback host guard, honesty rails.
- Rebuild is **CSS-token + class-layer first**; markup edits only where a signature
  surface needs them (command bar mount, status bar mount). React islands pick the
  palette up through the existing var() bridges in index.css.

## 5. Phases (each ships green, each reversible)

- **P1 Palette & tokens**: style.css token block swap + radius unification +
  light "Porcelain"; React bridges follow automatically. Proof: suite + preview.
- **P2 Chrome restyle**: header/rail/subrail/toolbar/status bar + animated
  underline + hover language; drop hover-scale.
- **P3 Panels**: watchlist/assistant/ticket/dialogs restyle to chip language.
- **P4 Command bar**: additive Ctrl+K overlay (fuzzy: symbols from /api/instruments,
  sections, actions); esc/enter semantics; hosted-safe.
- **P5 Motion & polish**: 120–160ms pass, empty states, AA contrast sweep.

Every phase: `tsc` 0 · build green · pytest green · loopback runtime check ·
preview for owner's eyes · record appended here.

## 6. Decision requested

Approve "Refined Carbon" as the direction (phases P1→P5), or adjust the accent /
scope first. The mockup is the target feel; the token table is the contract.
