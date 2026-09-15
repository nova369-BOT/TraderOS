import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { useContextStore } from "../store/contextStore";

/**
 * Root path policy: the public marketing landing (served statically from
 * `public/landing/`, outside the SPA) is the default page for guests, while
 * authenticated users return to their last workspace (R4 persisted context)
 * or the Quantum Core trading terminal at `/terminal`.
 */
export function RootRedirect() {
  const { isAuthenticated, isInitializing } = useAuth();

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      // Full-page navigation out of the SPA to the static landing site.
      window.location.replace("/landing/");
    }
  }, [isInitializing, isAuthenticated]);

  if (isInitializing) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4">
        <div className="rounded-sm border border-terminal-border bg-terminal-panel px-4 py-3 text-xs text-terminal-muted">
          Restoring workspace...
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    // R4: return the user to their last workspace (persisted context),
    // defaulting to the trading terminal. Auth pages and external paths are
    // never restored.
    const lastPath = useContextStore.getState().lastPath;
    const restoreable = Boolean(
      lastPath &&
      lastPath.startsWith("/") &&
      !["/login", "/register", "/forgot-access", "/"].includes(lastPath),
    );
    return <Navigate to={restoreable ? lastPath! : "/terminal"} replace />;
  }

  // Guests: the effect kicks off the redirect to the static landing; render
  // nothing in the brief interim.
  return null;
}
