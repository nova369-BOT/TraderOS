import type { CSSProperties } from "react";

/**
 * Terminal skeleton loader — the standard "loading" treatment for panels.
 * Pulses subtly; never fakes data.
 */

type SkeletonLine = {
  /** Relative width 0–100 (default 100). */
  width?: number;
};

type Props = {
  /** Number of shimmer lines. */
  lines?: number;
  lineWidths?: Array<SkeletonLine["width"]>;
  /** Overall height of the skeleton block (px). Default: derived from lines. */
  height?: number;
  className?: string;
  /** Accessible label announced while loading. */
  label?: string;
  style?: CSSProperties;
};

export function TerminalSkeleton({
  lines = 3,
  lineWidths,
  height,
  className = "",
  label = "Loading",
  style,
}: Props) {
  const count = Math.max(1, lines);
  return (
    <div
      role="status"
      aria-label={label}
      aria-busy="true"
      className={`ot-skeleton-block ${className}`.trim()}
      style={height ? { height, ...style } : style}
    >
      {Array.from({ length: count }, (_, index) => {
        const width = lineWidths?.[index] ?? (index === count - 1 && count > 1 ? 62 : 100);
        return (
          <div
            key={index}
            className="ot-skeleton-line"
            style={{ width: `${Math.max(4, Math.min(100, width))}%` }}
          />
        );
      })}
    </div>
  );
}
