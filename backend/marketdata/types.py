"""Normalized market-data entities.

This module defines the canonical, exchange-agnostic model that every
market-data producer (adapter, bridge, simulator) must emit and every
consumer (REST, WebSocket, future chart/order-flow subsystems) can rely on.

Data-integrity law (ARQOS directive): every event carries an explicit
``provenance``. Nothing may be presented as ``live`` unless it originates
from a real exchange feed.
"""

from __future__ import annotations

from datetime import datetime, timezone
from enum import Enum
from typing import Any, Literal

from pydantic import BaseModel, Field


Provenance = Literal["live", "simulated", "unavailable"]

#: Stream names (topic grammar: ``{stream}:{EXCHANGE}:{SYMBOL}`` and, for
#: candles, a trailing ``:{interval}`` parameter).
#: ``book`` is the subscription-level stream; it produces both
#: ``book_delta`` and ``book_snapshot`` envelope events.
STREAMS: tuple[str, ...] = (
    "quote",
    "trade",
    "candle",
    "book",
    "book_snapshot",
    "book_delta",
    "stats",
    "liquidation",
    "funding",
    "open_interest",
    "session",
)


def utc_now_ms() -> int:
    return int(datetime.now(timezone.utc).timestamp() * 1000)


def iso_from_ms(ts_ms: int | float | None) -> str:
    if ts_ms is None:
        ts_ms = utc_now_ms()
    return datetime.fromtimestamp(float(ts_ms) / 1000.0, tz=timezone.utc).isoformat()


class SymbolInfo(BaseModel):
    """Static instrument descriptor (normalized across exchanges)."""

    symbol: str  # canonical, e.g. "BINANCE:BTCUSDT"
    exchange: str  # "BINANCE", "SIM", "NSE", ...
    instrument: str  # raw instrument on the exchange, e.g. "BTCUSDT"
    base: str | None = None
    quote: str | None = None
    kind: str = "spot"  # "perp" | "spot" | "equity" | ...
    status: str = "trading"
    tick_size: float | None = None
    step_size: float | None = None
    price_precision: int | None = None
    quantity_precision: int | None = None


class Quote(BaseModel):
    symbol: str
    bid: float | None = None
    bid_qty: float | None = None
    ask: float | None = None
    ask_qty: float | None = None
    last: float | None = None
    ts: int  # ms epoch (exchange event time when available)
    source_ts: int | None = None


class Trade(BaseModel):
    """A single (possibly aggregated) executed trade with aggressor side."""

    symbol: str
    id: str
    price: float
    qty: float
    side: Literal["buy", "sell", "unknown"]  # aggressor side ("unknown" if source lacks it)
    ts: int  # ms epoch


class Candle(BaseModel):
    symbol: str
    interval: str
    open_time: int  # ms epoch
    close_time: int
    open: float
    high: float
    low: float
    close: float
    volume: float
    closed: bool
    trade_count: int | None = None


class BookLevel(BaseModel):
    price: float
    qty: float  # 0 in a delta means "remove this level"


class BookSnapshot(BaseModel):
    symbol: str
    bids: list[BookLevel] = Field(default_factory=list)  # descending price
    asks: list[BookLevel] = Field(default_factory=list)  # ascending price
    last_update_id: int | None = None
    ts: int


class BookDelta(BaseModel):
    symbol: str
    first_update_id: int
    final_update_id: int
    prev_final_update_id: int | None = None
    bids: list[BookLevel] = Field(default_factory=list)
    asks: list[BookLevel] = Field(default_factory=list)
    ts: int


class MarketStats(BaseModel):
    """Rolling 24h statistics."""

    symbol: str
    last: float | None = None
    change_pct_24h: float | None = None
    high_24h: float | None = None
    low_24h: float | None = None
    volume_24h: float | None = None
    quote_volume_24h: float | None = None
    trade_count_24h: int | None = None
    ts: int


class Liquidation(BaseModel):
    symbol: str
    side: Literal["buy", "sell"]  # side of the liquidated position
    price: float
    qty: float
    ts: int
    order_id: str | None = None


class Funding(BaseModel):
    symbol: str
    funding_rate: float  # per interval, e.g. 0.0001 = 0.01%
    next_funding_ms: int | None = None
    mark_price: float | None = None
    index_price: float | None = None
    ts: int


class OpenInterest(BaseModel):
    symbol: str
    open_interest: float  # base units
    open_interest_usd: float | None = None
    ts: int


class SessionInfo(BaseModel):
    exchange: str
    phase: str  # "open" | "closed" | "pre" | "post" | "24h"
    session: str | None = None
    next_event_ms: int | None = None
    ts: int


class FeedState(str, Enum):
    STOPPED = "stopped"
    CONNECTING = "connecting"
    LIVE = "live"
    DEGRADED = "degraded"
    FALLBACK = "fallback"  # serving via labeled simulator


class FeedStatus(BaseModel):
    feed: str  # e.g. "binance", "simulator", "marketdata-hub", "us-tick-stream"
    exchange: str  # canonical exchange namespace it serves
    state: FeedState
    provenance: Provenance
    detail: str | None = None
    connected: bool = False
    last_event_ms: int | None = None
    events_published: int = 0
    invalid_messages: int = 0
    reconnects: int = 0
    resnapshots: int = 0


class Envelope(BaseModel):
    """The single wire format for market events (bus + WebSocket)."""

    topic: str
    type: str  # one of STREAMS
    symbol: str  # canonical symbol
    data: dict[str, Any]
    provenance: Provenance
    source: str
    ts: int  # ms epoch (emit time)


def build_topic(stream: str, symbol: str, param: str | None = None) -> str:
    if stream not in STREAMS:
        raise ValueError(f"unknown stream: {stream!r}")
    canonical = symbol.strip().upper()
    if not canonical:
        raise ValueError("symbol is required")
    if param is not None:
        return f"{stream}:{canonical}:{param}"
    return f"{stream}:{canonical}"


def parse_topic(topic: str) -> tuple[str, str, str | None]:
    """Split a topic into ``(stream, canonical_symbol, param|None)``.

    Candle topics carry an interval parameter; every other stream is
    ``stream:EXCHANGE:SYMBOL``.
    """
    parts = topic.strip().split(":")
    if len(parts) < 3:
        raise ValueError(f"malformed topic: {topic!r}")
    stream = parts[0]
    if stream not in STREAMS:
        raise ValueError(f"unknown stream in topic: {topic!r}")
    if stream == "candle":
        if len(parts) < 4:
            raise ValueError(f"candle topic missing interval: {topic!r}")
        param = parts[-1]
        symbol = ":".join(parts[1:-1])
    else:
        param = None
        symbol = ":".join(parts[1:])
    return stream, symbol.strip().upper(), param
