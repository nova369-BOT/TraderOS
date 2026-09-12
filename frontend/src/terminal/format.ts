/** Numeric presentation for the terminal (directive §39). */

export function formatNumber(
  value: number | null | undefined,
  opts?: { decimals?: number; compact?: boolean },
): string {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "--";
  const decimals = opts?.decimals ?? 2;
  if (opts?.compact && Math.abs(numeric) >= 1_000_000) {
    return `${(numeric / 1_000_000).toFixed(2)}M`;
  }
  return numeric.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatSigned(
  value: number | null | undefined,
  opts?: { decimals?: number; compact?: boolean },
): string {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "--";
  const prefix = numeric > 0 ? "+" : "";
  return `${prefix}${formatNumber(numeric, opts)}`;
}

export function formatPct(value: number | null | undefined, decimals = 2): string {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "--";
  const prefix = numeric > 0 ? "+" : "";
  return `${prefix}${numeric.toFixed(decimals)}%`;
}

export function formatQty(value: number | null | undefined): string {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "--";
  return numeric.toLocaleString("en-US", { maximumFractionDigits: 4 });
}

/** Tailwind class for semantic +/- styling. */
export function pnlClass(value: number | null | undefined): string {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric === 0) return "text-terminal-muted";
  return numeric > 0 ? "text-terminal-pos" : "text-terminal-neg";
}

export function formatTime(iso: string | null | undefined): string {
  if (!iso) return "--";
  const ts = Date.parse(iso);
  if (!Number.isFinite(ts)) return "--";
  return new Date(ts).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
