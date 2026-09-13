import { useEffect } from "react";

import { useUiStore } from "../store/uiStore";

/**
 * Applies the global density mode to the document root as a data attribute.
 * Mount once near the app root (alongside ThemeRuntime). CSS variables in
 * index.css respond to [data-density="compact"].
 */
export function DensityRuntime() {
  const density = useUiStore((s) => s.density);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.density = density;
  }, [density]);

  return null;
}
