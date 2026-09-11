# TraderOS Layout Contract

Engineering contract for the TraderOS shell. The design is fixed; this document
describes the structural rules that keep every panel, chart, table and overlay
correct at any viewport from 1280×720 to 3440×1440 and at 80–125% zoom.

## 1. Shell skeleton

```
<body> (margin 0, bg-base)
└─ div.h-screen.w-screen.flex.flex-col.overflow-hidden   ← App root, never scrolls
   ├─ TopBar            h-[44px]   shrink-0, overflow-x-auto
   ├─ TickerTape        h-[27px]   shrink-0, overflow-hidden
   ├─ div.flex-1.flex.min-h-0                       ← middle band
   │  ├─ LeftNav        w-[184px] / w-[52px] collapsed, shrink-0
   │  ├─ main.flex-1.min-w-0.flex                   ← active workspace mounts here
   │  └─ RightPanel     w-[300px] (persisted 260–420), shrink-0, absolute edge handle
   ├─ BottomTerminal    h-[190px] (persisted 120–420), shrink-0, absolute edge handle
   └─ StatusBar         h-[24px]   shrink-0, overflow-x-auto
```

- The root never scrolls. Exactly one scroll container owns each axis at any
  nesting level (`.panel-body`, terminal views, workspace gutters).
- Every flex child that hosts content carries `min-h-0` / `min-w-0`
  (`.panel` and `.panel-body` provide them by default).

## 2. Z-index layers

| Layer | Value | Owners |
|---|---|---|
| base | 0–1 | app, in-flow panels |
| sticky headers | 2 | `.dgrid thead th` |
| chart drawings | 5 | TerminalChart SVG overlay |
| grab handles, chips | 10 | SplitPane handle, chart legend |
| edge resize zones | 30 | right-panel / bottom-terminal handles |
| maximized panel | 40 | Panel `maximizeKey` takeover |
| dropdown menus | 70 | `Dropdown` (portaled to `document.body`) |
| dialogs | 90 | `Modal` (portaled) |
| command palette | 95 | `CommandPalette` (portaled) |
| toasts | 96 | toast stack |
| context menus | 100 | `ContextMenuHost` (portaled, topmost) |

Also defined in `src/index.css`. Never add ad-hoc z-index values — extend the
table instead. No `!important` outside the tick-flash utilities (documented in
`src/index.css`) and Tailwind's own `!` prefix overrides.

## 3. Panel rules

- `Panel` = `display:flex; flex-direction:column; min-h-0; min-w-0; overflow:hidden`.
- `Panel` fills its slot: pass `className="flex-1 min-h-0"` when the parent is a
  flex row/column; pass nothing when the parent is block/grid/flow (natural height).
- `.panel-hd` is `flex-shrink:0; overflow:hidden`; titles/subtitles/actions get
  `min-w-0` + ellipsis — headers never wrap or push the body out.
- Body scrolls internally (`overflow:auto`). Tables (`DataGrid`) keep sticky
  headers (`z-index:2`) and degrade to inner horizontal scroll, never app scroll.
- `Dropdown` menus and context menus render in portals with viewport clamping
  and flip; they close on outside pointer-down, `Escape`, scroll (capture) and
  window resize.

## 4. Split panes & resize handles

- `SplitPane` persists sizes to `localStorage`, clamps on mount so the flexible
  side always keeps ≥140px, and sets a global resize cursor + `user-select:none`
  while dragging.
- Edge handles (`EdgeHandle`) are 8px absolute-positioned grab zones that
  overlap the panel border — they consume zero layout space and never shift
  content (no negative-margin layout hacks).

## 5. Charts

- `TerminalChart` owns exactly one lightweight-charts instance per mount; all
  series are created once and updated incrementally (no per-tick series churn).
- Resize is driven by `ResizeObserver` + a container query; the chart always
  fills `.panel-body` (`min-h-[220px]` floor).
- Drawing overlay is an absolutely-positioned SVG (`z-[5]`) that tracks the
  chart via `timeToCoordinate` / `priceToCoordinate` on crosshair + scroll/zoom.

## 6. Data & lifecycle rules

- One engine tick: `marketEngine` is the single price clock; components
  subscribe and unsubscribe in effects (no leaked intervals/listeners).
- Bounded stores: fills capped at 600, orders trimmed to working + latest 400
  closed; watchlists/panels render from memoized selectors.
- Zustand `persist` always declares explicit storage
  (`createJSONStorage(() => localStorage)`); storage failures fall back to
  in-memory defaults and are logged, never thrown.
- No `as any`, no `@ts-ignore`, no TODO placeholders; `tsc --noUnusedLocals
  --noUnusedParameters` is clean.

## 7. Verification

```
npm run verify     # tsc --noEmit + headless smoke suite + vite build
npm run smoke      # 176-assertion engine/store harness (scripts/smoke.ts)
```

Visual regressions (overlap/clipping at 1280×720, 1920×1080, 3440×1440 and
80–125% zoom) are verified in the browser by the operator; static audits cover
keys, subscriptions, portals, and the layer table above.
