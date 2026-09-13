import type { ReactNode } from "react";

import { TABULAR_CLASS } from "../tokens";

/**
 * METRIC VALUE — the standard financial-number presentation (directive §39).
 * Label + value + optional delta with semantic coloring, tabular numerals,
 * clear positive/negative distinction. Never fabricates values: null renders
 * an honest "--" unless a loading skeleton is requested.
 */

type Props = {
  label: ReactNode;
  value: string | number | null | undefined;
  /** Semantic delta (e.g. change, P&L). Sign and color derived automatically. */
  delta?: number | null;
  /** Suffix appended to the delta (e.g. "%"). */
  deltaSuffix?: string;
  align?: "left" | "right";
  size?: "sm" | "md" | "lg";
  /** Show a skeleton instead of the value while loading. */
  loading?: boolean;
  /** Semantic coloring of the value itself (P&L, deltas). */
  valueTone?: "pos" | "neg" | "neutral";
  className?: string;
  /** Optional tooltip/hint for the label. */
  hint?: string;
};

const SIZES = {
  sm: { value: "text-[12px]", label: "text-[9px]", delta: "text-[10px]" },
  md: { value: "text-[14px]", label: "text-[10px]", delta: "text-[10px]" },
  lg: { value: "text-[18px]", label: "text-[10px]", delta: "text-[11px]" },
} as const;

function deltaClass(value: number): string {
  if (!Number.isFinite(value) || value === 0) return "text-terminal-muted";
  return value > 0 ? "text-terminal-pos" : "text-terminal-neg";
}

function formatDelta(value: number, suffix: string): string {
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}${suffix}`;
}

const VALUE_TONE_CLASS = {
  pos: "text-terminal-pos",
  neg: "text-terminal-neg",
  neutral: "text-terminal-text",
} as const;

export function MetricValue({
  label,
  value,
  delta,
  deltaSuffix = "",
  align = "left",
  size = "md",
  loading = false,
  valueTone = "neutral",
  className = "",
  hint,
}: Props) {
  const scale = SIZES[size];
  const rendered =
    value === null || value === undefined || (typeof value === "number" && !Number.isFinite(value))
      ? "--"
      : typeof value === "number"
        ? value.toLocaleString("en-US", { maximumFractionDigits: 2 })
        : value;

  return (
    <div
      className={[align === "right" ? "text-right" : "text-left", className].join(" ").trim()}
      data-testid="metric-value"
    >
      <div className={`${scale.label} uppercase tracking-wider text-terminal-muted`} title={hint}>
        {label}
      </div>
      {loading ? (
        <div className="ot-skeleton-line mt-1 inline-block h-[14px] w-16" aria-label="Loading value" />
      ) : (
        <div className={`flex items-baseline gap-1.5 ${align === "right" ? "justify-end" : ""}`}>
          <span className={`${scale.value} font-medium ${TABULAR_CLASS} ${VALUE_TONE_CLASS[valueTone]}`}>{rendered}</span>
          {typeof delta === "number" && Number.isFinite(delta) ? (
            <span className={`${scale.delta} ${deltaClass(delta)} ${TABULAR_CLASS}`}>
              {formatDelta(delta, deltaSuffix)}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}
