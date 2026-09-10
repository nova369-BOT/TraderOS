import { beforeEach, describe, expect, it, vi } from "vitest";

import { useMarketContextStore } from "../store/marketContextStore";
import { useStockStore } from "../store/stockStore";

vi.mock("../api/client", () => ({
  fetchStock: vi.fn().mockResolvedValue({}),
  fetchChart: vi.fn().mockResolvedValue({}),
  searchSymbols: vi.fn().mockResolvedValue([]),
  fetchCryptoSearch: vi.fn().mockResolvedValue([]),
  addWatchlistItem: vi.fn(),
}));

describe("marketContextStore (Context Engine)", () => {
  beforeEach(() => {
    useStockStore.setState({ ticker: "RELIANCE", interval: "1d", range: "1y" });
    useMarketContextStore.setState({
      instrument: "RELIANCE",
      interval: "1d",
      range: "1y",
      compare: [],
      regime: null,
    });
  });

  it("mirrors the authoritative stock store", () => {
    useStockStore.getState().setTicker("AAPL");
    expect(useMarketContextStore.getState().instrument).toBe("AAPL");
    useStockStore.getState().setInterval("1h");
    expect(useMarketContextStore.getState().interval).toBe("1h");
  });

  it("selectInstrument delegates to stockStore", async () => {
    await useMarketContextStore.getState().selectInstrument("msft", { reload: false });
    expect(useStockStore.getState().ticker).toBe("MSFT");
    expect(useMarketContextStore.getState().instrument).toBe("MSFT");
  });

  it("manages the comparison set without duplicates and capped", () => {
    const s = useMarketContextStore.getState();
    s.addCompare("aapl");
    s.addCompare("AAPL");
    expect(useMarketContextStore.getState().compare).toEqual(["AAPL"]);
    for (const t of ["MSFT", "NVDA", "GOOG", "AMZN", "META", "TSLA", "AMD", "INTC", "QCOM"]) {
      s.addCompare(t);
    }
    expect(useMarketContextStore.getState().compare.length).toBe(8);
    s.removeCompare("msft");
    expect(useMarketContextStore.getState().compare).not.toContain("MSFT");
    s.clearCompare();
    expect(useMarketContextStore.getState().compare).toEqual([]);
  });

  it("stores a regime snapshot with evidence and basis", () => {
    useMarketContextStore.getState().setRegime({
      label: "HIGH VOLATILITY",
      confidence: 72,
      evidence: ["VIX +12% (observed)"],
      basis: "observed",
      computedAt: Date.now(),
    });
    const r = useMarketContextStore.getState().regime;
    expect(r?.basis).toBe("observed");
    expect(r?.confidence).toBe(72);
  });
});
