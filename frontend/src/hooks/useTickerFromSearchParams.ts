import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useStockStore } from "../store/stockStore";

/**
 * Keep the global instrument selection in sync with ?ticker= / ?symbol=
 * search params. Extracted from the pre-R3 equity layout so every workspace
 * whose pages are symbol-driven (Markets, Terminal, Portfolio) shares the
 * exact same behavior.
 */
export function useTickerFromSearchParams() {
  const setTicker = useStockStore((s) => s.setTicker);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ticker = (params.get("ticker") || params.get("symbol") || "").trim().toUpperCase();
    if (ticker) {
      setTicker(ticker);
    }
  }, [location.search, setTicker]);
}
