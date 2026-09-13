/**
 * DESIGN SYSTEM GUARDRAILS (R1)
 *
 * Architectural rules that keep the rebuild on the kit as phases progress.
 * These are deliberately simple, robust source-scan rules — not a linter.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import * as design from "../index";

const SRC = join(__dirname, "..", "..");
const TERMINAL_COMPONENTS = join(SRC, "terminal", "components");

function listFiles(dir: string, suffix = ".tsx"): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) continue;
    if (entry.endsWith(suffix)) out.push(full);
  }
  return out;
}

describe("design system guardrails", () => {
  it("exports the complete public surface from the barrel", () => {
    const expected = [
      "SPACING",
      "TYPE_SCALE",
      "TABULAR_CLASS",
      "DENSITY",
      "Z_INDEX",
      "DATA_STATES",
      "DensityRuntime",
      "useDensity",
      "DataState",
      "TerminalSkeleton",
      "MetricValue",
      // Terminal kit re-exports
      "TerminalBadge",
      "TerminalButton",
      "TerminalCombobox",
      "TerminalDropdown",
      "DenseTable",
      "TerminalInput",
      "TerminalSelect",
      "TerminalModal",
      "TerminalPanel",
      "TerminalTabs",
      "TerminalToast",
      "TerminalToastViewport",
      "TerminalTooltip",
    ];
    for (const name of expected) {
      expect(design, `design barrel must export ${name}`).toHaveProperty(name);
    }
  });

  it("terminal panels use DataState — no hand-rolled state blocks", () => {
    const files = listFiles(TERMINAL_COMPONENTS);
    expect(files.length).toBeGreaterThan(0);
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      // Retry buttons belong to DataState only.
      expect(
        source.includes(">Retry<"),
        `${file} must use <DataState> for retry actions, not a hand-rolled button`,
      ).toBe(false);
    }
  });

  it("terminal and design components never touch localStorage directly", () => {
    const dirs = [TERMINAL_COMPONENTS, join(SRC, "design", "components")];
    for (const dir of dirs) {
      for (const file of listFiles(dir)) {
        const source = readFileSync(file, "utf8");
        expect(
          source.includes("localStorage."),
          `${file} must use persisted stores (zustand persist), not direct localStorage`,
        ).toBe(false);
      }
    }
  });

  it("design components carry no arbitrary z-index escapes", () => {
    for (const file of listFiles(join(SRC, "design", "components"))) {
      const source = readFileSync(file, "utf8");
      expect(
        /z-\[\d{3,}\]/.test(source),
        `${file} must use Z_INDEX tokens, not arbitrary z-index values`,
      ).toBe(false);
    }
  });
});
