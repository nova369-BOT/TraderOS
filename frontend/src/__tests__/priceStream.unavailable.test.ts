import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { subscribe } from "../realtime/priceStream";

type BatchPayload = {
  market?: string;
  status?: string;
  quotes?: Array<{ symbol: string; last: number; change: number; changePct: number; ts: string }>;
};

let nextPayload: BatchPayload = {};

vi.mock("../api/client", () => ({
  fetchQuotesBatch: vi.fn(async () => nextPayload),
}));

const { fetchQuotesBatch } = await import("../api/client");

describe("priceStream connection state (B3)", () => {
  beforeEach(() => {
    vi.mocked(fetchQuotesBatch).mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("reports DISCONNECTED when the batch is explicitly unavailable", async () => {
    vi.useFakeTimers();
    const states: string[] = [];
    const unsubscribe = subscribe({
      market: "NSE",
      symbols: ["RELIANCE"],
      onUpdate: () => {},
      onStateChange: (state) => states.push(state),
    });
    try {
      nextPayload = { market: "NSE", status: "unavailable", quotes: [] };
      await vi.advanceTimersByTimeAsync(10);
      expect(states).toContain("DISCONNECTED");
      // ...and never flips to LIVE with zero data
      await vi.advanceTimersByTimeAsync(3000);
      expect(states).not.toContain("LIVE (polling)");
    } finally {
      unsubscribe();
    }
  });

  it("reports LIVE (polling) when real quotes arrive", async () => {
    vi.useFakeTimers();
    const states: string[] = [];
    nextPayload = {
      market: "NSE",
      status: "ok",
      quotes: [
        {
          symbol: "RELIANCE",
          last: 2950.5,
          change: 10,
          changePct: 0.3,
          ts: "2026-09-12T10:00:00Z",
        },
      ],
    };
    const unsubscribe = subscribe({
      market: "NSE",
      symbols: ["RELIANCE"],
      onUpdate: () => {},
      onStateChange: (state) => states.push(state),
    });
    try {
      await vi.advanceTimersByTimeAsync(10);
      expect(states).toContain("LIVE (polling)");
    } finally {
      unsubscribe();
    }
  });
});
