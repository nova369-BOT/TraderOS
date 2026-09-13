import { useUiStore } from "../store/uiStore";
import { DENSITY, type DensityMode } from "./tokens";

/**
 * Density-aware geometry for components. Row heights/paddings come from the
 * global mode — components never invent their own.
 */
export function useDensity(): {
  density: DensityMode;
  rowHeight: number;
  padY: number;
  rowClass: string;
} {
  const density = useUiStore((s) => s.density);
  return {
    density,
    rowHeight: DENSITY[density].rowHeight,
    padY: DENSITY[density].padY,
    rowClass: `ot-row-${density}`,
  };
}
