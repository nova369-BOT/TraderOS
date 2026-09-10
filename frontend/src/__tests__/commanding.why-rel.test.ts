import { describe, expect, it, vi, beforeEach } from "vitest";

import {
  executeParsedCommand,
  parseCommand,
} from "../components/layout/commanding";
import { useStockStore } from "../store/stockStore";

vi.mock("../api/client", () => ({
  fetchStock: vi.fn().mockResolvedValue({}),
  fetchChart: vi.fn().mockResolvedValue({}),
  searchSymbols: vi.fn().mockResolvedValue([]),
  fetchCryptoSearch: vi.fn().mockResolvedValue([]),
  addWatchlistItem: vi.fn(),
}));

describe("WHY / REL command codes (Market Intelligence navigation)", () => {
  const navigate = vi.fn();

  beforeEach(() => {
    navigate.mockReset();
  });

  it("parses 'AAPL WHY' as a ticker-function command", () => {
    const parsed = parseCommand("AAPL WHY");
    expect(parsed.kind).toBe("ticker-function");
    if (parsed.kind === "ticker-function") {
      expect(parsed.ticker).toBe("AAPL");
      expect(parsed.func).toBe("WHY");
    }
  });

  it("'AAPL WHY' navigates to the movement intelligence surface and applies context", () => {
    const result = executeParsedCommand(parseCommand("AAPL WHY"), navigate);
    expect(result.ok).toBe(true);
    expect(navigate).toHaveBeenCalledWith("/equity/why/AAPL");
    expect(useStockStore.getState().ticker).toBe("AAPL");
  });

  it("'WHY' without a symbol opens the surface using global context", () => {
    const result = executeParsedCommand(parseCommand("WHY"), navigate);
    expect(result.ok).toBe(true);
    expect(navigate).toHaveBeenCalledWith("/equity/why");
  });

  it("'REL TCS' (and alias GRAPH) open the relationship graph", () => {
    const r1 = executeParsedCommand(parseCommand("REL TCS"), navigate);
    expect(r1.ok).toBe(true);
    expect(navigate).toHaveBeenCalledWith("/equity/relationships/TCS");
    const parsed = parseCommand("GRAPH NVDA");
    expect(parsed.kind).toBe("function");
    if (parsed.kind === "function") {
      expect(parsed.func).toBe("REL");
      expect(parsed.modifiers[0]).toBe("NVDA");
    }
  });

  it("'REL' alone opens the graph using global context", () => {
    const result = executeParsedCommand(parseCommand("REL"), navigate);
    expect(result.ok).toBe(true);
    expect(navigate).toHaveBeenCalledWith("/equity/relationships");
  });
});
