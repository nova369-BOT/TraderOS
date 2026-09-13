/**
 * ARQOS DESIGN SYSTEM — TOKENS (R1)
 *
 * The single source of truth for spacing, typography, density and layering
 * scales. Every rebuild phase (R2+) must consume these tokens instead of
 * inventing per-page values.
 *
 * Rules:
 *  - Spacing follows a 2px base grid (terminal density).
 *  - The type scale mirrors the CSS custom properties declared in index.css
 *    (ot-type-*). Keep both sides in sync — tokens.test.ts guards this.
 *  - Density is a global mode (normal | compact) driven by uiStore and
 *    applied via [data-density] on <html>; it adjusts CSS variables, not
 *    per-component hard-coded values.
 */

/** 2px base grid. Values in px. */
export const SPACING = {
  xxs: 2,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 24,
  "3xl": 32,
} as const;
export type SpacingKey = keyof typeof SPACING;

/**
 * Type scale in px. Mirrors the CSS vars in index.css:
 *   micro  → --ot-type-status-size   (9/10px, badges and status chips)
 *   caption→ --ot-type-badge-size    (10px, labels, table headers)
 *   body   → --ot-type-table-cell-size (11px, default data/UI text)
 *   label  → --ot-type-size-sm       (12px, emphasized UI text)
 *   title  → --ot-type-size-md       (13px, panel titles)
 *   heading→ --ot-type-heading-lg-size (16px, page-level headings)
 *   display→ --ot-type-heading-xl-size (18–22px, hero numbers only)
 */
export const TYPE_SCALE = {
  micro: 10,
  caption: 10,
  body: 11,
  label: 12,
  title: 13,
  heading: 16,
  display: 20,
} as const;
export type TypeScaleKey = keyof typeof TYPE_SCALE;

/** Tabular-numeral utility (financial numbers must align). */
export const TABULAR_CLASS = "ot-tabular";

export type DensityMode = "normal" | "compact";

/** Density-driven geometry (px). CSS-var equivalents live in index.css. */
export const DENSITY = {
  normal: { rowHeight: 26, padY: 4 },
  compact: { rowHeight: 22, padY: 2 },
} as const satisfies Record<DensityMode, { rowHeight: number; padY: number }>;

/** Stacking layers — never hand-pick z-index values in components. */
export const Z_INDEX = {
  base: 0,
  sticky: 10,
  dropdown: 100,
  overlay: 150,
  modal: 200,
  toast: 300,
  tooltip: 400,
} as const;
export type ZIndexKey = keyof typeof Z_INDEX;

/** Semantic data states every panel must account for (§46 of the directive). */
export const DATA_STATES = ["loading", "empty", "error", "offline", "ready"] as const;
export type DataStateStatus = (typeof DATA_STATES)[number];
