/**
 * ARQOS DESIGN SYSTEM — public barrel (R1).
 *
 * THE import site for the rebuild: primitives, tokens, and the terminal kit
 * from one place:
 *
 *   import { TerminalPanel, DataState, MetricValue, useDensity } from "../design";
 *
 * Guardrails (design-system.test.ts):
 *  - this barrel is the complete public surface; new primitives must be
 *    added here
 *  - src/terminal panels must use DataState (not hand-rolled states)
 */

// Tokens & runtime
export * from "./tokens";
export { DensityRuntime } from "./DensityRuntime";
export { useDensity } from "./useDensity";

// State & data primitives
export { DataState } from "./components/DataState";
export type { DataStateStatus } from "./tokens";
export { TerminalSkeleton } from "./components/TerminalSkeleton";
export { MetricValue } from "./components/MetricValue";

// Terminal kit (evolved, stable) — re-exported so consumers have one import site
export {
  TerminalBadge,
  TerminalButton,
  TerminalCombobox,
  TerminalDropdown,
  DenseTable,
  TerminalInput,
  TerminalSelect,
  TerminalModal,
  TerminalPanel,
  TerminalTabs,
  TerminalToast,
  TerminalToastViewport,
  TerminalTooltip,
} from "../components/terminal";
