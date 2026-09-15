import type { ReactNode } from "react";

import { TerminalSkeleton } from "./TerminalSkeleton";

/**
 * UNIFIED DATA STATE (directive §46 — every panel accounts for
 * loading / empty / error / offline / ready).
 *
 * This is the ONLY sanctioned way to render non-ready panel states in the
 * rebuild (guardrail test enforces no hand-rolled equivalents in
 * src/terminal). Usage:
 *
 *   <DataState status={query.isLoading ? "loading" : query.isError ? "error" : "ready"} ...>
 *     <RealContent />
 *   </DataState>
 */

export type { DataStateStatus } from "../tokens";

type Props = {
  status: "loading" | "empty" | "error" | "offline" | "ready";
  /** Rendered when status === "ready". */
  children?: ReactNode;
  /** loading */
  loadingLabel?: string;
  skeletonLines?: number;
  /** empty */
  emptyTitle?: string;
  emptyHint?: string;
  emptyAction?: ReactNode;
  /** error / offline */
  error?: Error | string | null;
  onRetry?: () => void;
  retryLabel?: string;
  /** offline */
  offlineHint?: string;
  /** Layout: fill the panel body (default) or inline within a row. */
  compact?: boolean;
  className?: string;
};

function Centered({
  compact,
  className = "",
  children,
}: {
  compact?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={[
        "flex min-h-0 w-full items-center justify-center text-center",
        compact ? "px-2 py-1.5" : "min-h-[2.5rem] flex-1 px-3 py-3",
        className,
      ]
        .join(" ")
        .trim()}
    >
      {children}
    </div>
  );
}

function RetryButton({ onRetry, label }: { onRetry?: () => void; label: string }) {
  if (!onRetry) return null;
  return (
    <button
      type="button"
      onClick={onRetry}
      className="mt-1.5 rounded-sm border border-terminal-border px-2 py-0.5 text-[10px] text-terminal-accent hover:border-terminal-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal-accent"
    >
      {label}
    </button>
  );
}

export function DataState({
  status,
  children,
  loadingLabel = "Loading",
  skeletonLines = 3,
  emptyTitle = "Nothing here yet",
  emptyHint,
  emptyAction,
  error,
  onRetry,
  retryLabel = "Retry",
  offlineHint = "Data source unreachable — check connection.",
  compact,
  className,
}: Props) {
  if (status === "ready") {
    return <>{children}</>;
  }

  if (status === "loading") {
    return (
      <div className={compact ? "" : "flex min-h-0 flex-1 flex-col justify-center px-3 py-3"}>
        <TerminalSkeleton lines={skeletonLines} label={loadingLabel} className={className} />
      </div>
    );
  }

  if (status === "empty") {
    return (
      <Centered compact={compact} className={className}>
        <div className="flex flex-col items-center gap-1">
          <div className="text-[11px] text-terminal-muted" data-testid="data-state-empty">
            {emptyTitle}
          </div>
          {emptyHint ? <div className="max-w-[36ch] text-[10px] text-terminal-muted/70">{emptyHint}</div> : null}
          {emptyAction}
        </div>
      </Centered>
    );
  }

  if (status === "offline") {
    return (
      <Centered compact={compact} className={className}>
        <div className="flex flex-col items-center gap-1" data-testid="data-state-offline">
          <div className="text-[11px] text-terminal-warn">Offline</div>
          <div className="max-w-[36ch] text-[10px] text-terminal-muted/70">{offlineHint}</div>
          <RetryButton onRetry={onRetry} label={retryLabel} />
        </div>
      </Centered>
    );
  }

  // error
  const message =
    error instanceof Error ? error.message : typeof error === "string" && error.trim() ? error : null;
  return (
    <Centered compact={compact} className={className}>
      <div className="flex flex-col items-center gap-1" data-testid="data-state-error">
        <div className="text-[11px] text-terminal-warn">Unavailable</div>
        {message ? (
          <div className="max-w-[40ch] break-words text-[10px] text-terminal-muted/80">{message}</div>
        ) : null}
        <RetryButton onRetry={onRetry} label={retryLabel} />
      </div>
    </Centered>
  );
}
