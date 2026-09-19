# Frontend typecheck recovery — task record

**Date:** 2026-09-19 · **Branch:** `arena/01a0baf4-traderos`
**Charter items served:** #2 cause no bugs — only fix bugs · #3 smart =
honest more (truthful surfaces)

## Root cause (measured, not assumed)

Baseline `npx tsc --noEmit` on commit `fd0ecac`: **50 errors, typecheck
red.** The frontend's own `typecheck` script existed but nothing enforced
it (PLAN.md gap G1: "Frontend checks ... remain in E1"), so the errors
accumulated. Diagnosis grouped them into seven distinct causes:

1. **`NodeJS.Timeout` without `@types/node`** (16 errors, 7 files). The
   codebase's own idiom is `ReturnType<typeof setTimeout>` (5 existing
   uses); the `NodeJS` spellings were the outliers.
2. **`BTChart.tsx:231` referenced a `CandleData` type that does not exist
   in scope** — the ref holds the `candles` prop, which is `Candle[]` from
   `core/types.ts`.
3. **Runtime bug: Options PDF panel crash.** `api.getOptionsPredictedPrice`
   returned `[]` for a *single-row* contract (`{...} | null`, per the
   file's own header). An empty array is truthy, so the panel took its
   "data present" branch and called `formatPrice(undefined)` →
   `TypeError: Cannot read properties of undefined (reading 'toFixed')`
   every time the panel rendered with the local shim.
4. **Type/contract drift on `getCandlesRange`**: ported upstream callers
   pass `select` / `offset`, which the local shim never declared.
5. **`savedChartSettings.chart || {}` narrowing** in BTCandlestickChart —
   the fallback `{}` widened the union so every themed field read failed
   typecheck.
6. **`AuthValue` lacked `signInWithGoogle`** — LoginModal called it, so the
   Google button threw `TypeError: signInWithGoogle is not a function` at
   runtime (caught, but surfaced as a meaningless "Sign in failed").
7. **Missing module declarations**: no `vite-env.d.ts` (both `.png` asset
   imports unresolved), and `SmartSearchResult` imported from `@/lib/api`
   but never exported.

## Files changed (each with its reason)

| File | Change |
|---|---|
| `frontend/src/lib/api.ts` | (a) `getOptionsPredictedPrice` now returns `null` (honest no-data for the single-row contract; panel shows "No PDF data available" instead of crashing); (b) exported `SmartSearchResult` matching `smartSearch`'s return shape and annotated the method with it; (c) `getCandlesRange` accepts `select`/`offset` for upstream parity, documented that they are not applied locally (windowing is limit/order/start/end; time-paging is the exclusive-bound `getCandlesLt/Gt` variants). |
| `frontend/src/components/chart/BTChart.tsx` | `prevReplayCandlesRef` typed `Candle[]` (the type actually in scope); 6× `NodeJS.Timeout` → `ReturnType<typeof setTimeout>`. |
| `frontend/src/components/chart/ProChart.tsx` | 6× `NodeJS.Timeout` → codebase idiom. |
| `frontend/src/components/chart/BTCandlestickChart.tsx` | `NodeJS.Timeout` → idiom; theme fallbacks cast to `ChartSettings['candles'/'chart']` (context merges with defaults, so the fallback branch is dead but now type-sound); type-only import of `ChartSettings`. |
| `frontend/src/components/chart/CandlestickChart.tsx`, `ChartDrawingOverlay.tsx`, `interaction/useChartNavigation.ts`, `hooks/useLiveCandleFromTicks.ts` | `NodeJS.Timeout` → codebase idiom (1 each). |
| `frontend/src/contexts/AuthContext.tsx` | `signInWithGoogle` added to `AuthValue`: rejects with an explicit, truthful reason ("there are no accounts here; your work is saved locally") so LoginModal's existing catch shows a real message instead of a TypeError. |
| `frontend/src/components/auth/LoginModal.tsx` | Default body copy no longer promises cross-device sync the terminal cannot do — states the local-storage truth. |
| `frontend/src/vite-env.d.ts` (new) | Standard Vite client types: resolves the `.png` asset imports (and any future asset import). |
| `.github/workflows/tests.yml` | Added `frontend` job (`npm ci`, `tsc --noEmit`, `vite build`) so this cannot regress; corrected the stale baseline comment to the measured one. |
| `lse_terminal/ui/static/chart/chart.js` | Rebuilt committed bundle (repo convention: the shipped bundle is committed; `.map` files stay ignored). |

All `NodeJS.Timeout`/`CandleData`/fallback edits are **type-level only** —
erased at compile time, zero runtime delta. The runtime deltas are exactly
three: the Options PDF shim (`[]` → `null`), the `signInWithGoogle`
rejection, and the LoginModal default sentence.

## Proof (environment limits explicit)

Environment: Python 3.11.2, Node 22.22.3, npm 10.9.8, Linux, clean venv,
deps from PyPI as pinned; frontend `npm ci` from the committed lockfile.

1. `npx tsc --noEmit` — **0 errors** (was 50 at baseline).
2. `npm run build` — green, 23.3 s, bundle emitted to the engine's static dir.
3. **Bundle determinism:** a pristine worktree build of `fd0ecac` reproduces
   the committed `chart.js`/`chart.css` **byte-for-byte** (`cmp` clean), so
   the committed bundle was in sync with source before this change and the
   new bundle delta is exactly the three runtime fixes above (verified by
   grepping the diff for the new strings).
4. `pytest tests/ -q` — **219 passed, 1 skipped** (skip is the documented
   indicator-parity truth gate, `ts_truth.json` by design). At session start
   the same suite measured 218 passed / 2 skipped — the extra pass is
   `test_chart_pure_invariants`, which moved from skipped to executed once
   the JS toolchain existed; it passes. No backend source was touched.
5. Tests listed: full suite, both runs above (baseline before any edit,
   final after all edits).

## Remaining limitations (nothing hidden)

- The three call sites that pass their own LoginModal messages
  (DrawingShortcutsDialog, IndicatorSelector, DrawingToolsPanel) still say
  "sync across devices"; their copy is outside this task's minimal diff and
  needs a product decision on wording.
- The legacy `CandlestickChart.tsx` component is **unmounted** (no importer;
  the `<CandlestickChart>` hits in the tree are the lucide icon). Its
  `offset`-paging loop would duplicate pages if it were ever remounted,
  because the local engine windows by time, not row offset. Left untouched
  (dead code, behavior unchanged); documented in `api.ts` at the parameter.
- `getOptionsPredictedPrice` has no local data source (the predicted-price
  table is hosted); `null` is the honest report until a local path exists.
- CI `frontend` job uses Node 20 (repo README floor); baseline was measured
  locally on Node 22 — both satisfy `>=20`, no version-specific syntax used.
- `strict: false` in tsconfig stays as-is; tightening is a separate,
  deliberate task, not a drive-by.

## Reversal path

Every change is isolated per file; `git revert` of the single commit undoes
the whole task. The CI job is one self-contained YAML job; removing it
restores the previous pipeline.
