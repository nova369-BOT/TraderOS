"""Shared data types passed between providers, the engine, and the UI."""

from __future__ import annotations

from dataclasses import dataclass, field

# The candle DataFrame contract. Every provider returns exactly these columns,
# in this order. `ts` is the bar-open time as integer epoch seconds (UTC);
# epoch integers rather than datetimes because they serialize losslessly and
# are what charting libraries consume directly.
CANDLE_COLUMNS = ["ts", "open", "high", "low", "close", "volume"]


@dataclass
class Instrument:
    """One tradeable/chartable instrument as a provider exposes it."""

    symbol: str
    name: str = ""
    category: str = ""
    provider: str = ""
    # Provider-private extras (dataset hints, exchange codes, ...). The engine
    # passes this back on candle/stream calls but never interprets it.
    meta: dict = field(default_factory=dict)


@dataclass
class Quote:
    """A point-in-time price for one instrument."""

    symbol: str
    price: float
    ts: float
    bid: float | None = None
    ask: float | None = None


# ── Order-flow events (F1 Depth Heat) ─────────────────────────────────────
# Source-agnostic shapes: vault MBO, crypto L2, broker feeds and the demo
# source all normalize into these two, so nothing above the provider layer
# ever special-cases a source (product invariant, plan §2.1).

# DepthEvent.type values.
DEPTH_SNAPSHOT = "SNAPSHOT"  # full state of the transmitted levels
DEPTH_DELTA = "DELTA"        # patch: only the levels that changed

# TradeEvent.side values. Exchange-stamped sides are BUY/SELL; sides derived
# from the tick's own bid/ask at the touch are labelled INFERRED-* and must
# never be presented to the user as exchange-stamped (plan §2.1).
TRADE_BUY = "BUY"
TRADE_SELL = "SELL"
TRADE_INFERRED_BUY = "INFERRED-BUY"
TRADE_INFERRED_SELL = "INFERRED-SELL"
TRADE_UNKNOWN = "UNKNOWN"


@dataclass
class DepthEvent:
    """One order-book update.

    ``bids``/``asks`` are lists of ``(price, size)`` pairs. A SNAPSHOT states
    the current size of every level the source transmits; a DELTA patches
    only the levels given, where a size of 0 removes the level. Events never
    imply anything about levels they do not mention: keeping last-seen state
    for out-of-range levels is the book's job (persistent-book semantics).
    """

    symbol: str
    ts: float
    type: str = DEPTH_DELTA
    bids: list = field(default_factory=list)
    asks: list = field(default_factory=list)

    def to_dict(self) -> dict:
        return {"symbol": self.symbol, "ts": self.ts, "type": self.type,
                "bids": [[p, s] for p, s in self.bids],
                "asks": [[p, s] for p, s in self.asks]}

    @classmethod
    def from_dict(cls, d: dict) -> "DepthEvent":
        return cls(symbol=d["symbol"], ts=d["ts"],
                   type=d.get("type", DEPTH_DELTA),
                   bids=[tuple(lv) for lv in d.get("bids", [])],
                   asks=[tuple(lv) for lv in d.get("asks", [])])


@dataclass
class TradeEvent:
    """One executed print (the volume dots of the Depth Heat pane)."""

    symbol: str
    ts: float
    price: float
    size: float
    side: str = TRADE_UNKNOWN

    def to_dict(self) -> dict:
        return {"symbol": self.symbol, "ts": self.ts, "price": self.price,
                "size": self.size, "side": self.side}

    @classmethod
    def from_dict(cls, d: dict) -> "TradeEvent":
        return cls(symbol=d["symbol"], ts=d["ts"], price=d["price"],
                   size=d["size"], side=d.get("side", TRADE_UNKNOWN))
