"""Phase 0 gate: the EdgeDepth pump against fake sockets (no network).

Covers the three behaviours that protect the pane: snapshot/delta
translation, sequence-gap healing via re-subscribe, and reconnect with
re-subscription. Frames are built with the E1 wire encoders.
"""

import asyncio
import json

import pytest

from lse_terminal.contracts import DEPTH_SNAPSHOT, TRADE_BUY, DepthEvent, \
    TradeEvent
from lse_terminal.providers.edgedepth import wire
from lse_terminal.providers.edgedepth.client import (
    BookSync,
    EdgeDepthClient,
)
from lse_terminal.providers.edgedepth.provider import EdgeDepthProvider
from lse_terminal.providers.edgedepth.wire import (
    STREAM_HISTORICAL_CANDLES,
    STREAM_ORDERBOOK,
    STREAM_TRADES,
    BookLevel,
    BookUpdate,
    Candle,
    Trade,
    WSPayload,
)

SYM = "BTCUSDT"


def frame(stream, inner, symbol=SYM.lower(), timeframe=0, event_ms=0):
    # Wire realism: the gateway echoes the subscribed (lowercase) symbol; the
    # client re-keys events to the caller's canonical casing.
    return wire.encode_ws_payload(WSPayload(
        exchange="binance", symbol=symbol, stream=stream,
        timeframe=timeframe, data=inner, event_time_ms=event_ms))


def snap(last=10, ts=1_750_000_000_000):
    return wire.encode_book_update(BookUpdate(
        timestamp_ms=ts, asks=(BookLevel(100.0, 1.0),),
        bids=(BookLevel(99.0, 2.0),), snapshot=True, last_price=99.5,
        first_update_id=1, last_update_id=last, previous_update_id=0))


def delta(prev, first, last, asks=(), bids=(), ts=1_750_000_001_000):
    return wire.encode_book_update(BookUpdate(
        timestamp_ms=ts, asks=asks, bids=bids, snapshot=False,
        last_price=99.5, first_update_id=first, last_update_id=last,
        previous_update_id=prev))


class FakeWS:
    def __init__(self, frames):
        self.frames = list(frames)
        self.sent = []

    async def send(self, msg):
        self.sent.append(msg)

    async def close(self):
        pass

    def __aiter__(self):
        return self

    async def __anext__(self):
        if not self.frames:
            raise StopAsyncIteration
        return self.frames.pop(0)


class FakeClient(EdgeDepthClient):
    def __init__(self, sockets):
        super().__init__(backoff_base=0.01, backoff_cap=0.02)
        self.sockets = list(sockets)
        self.max_reconnects = 3

    async def _connect(self):
        if not self.sockets:
            raise ConnectionError("no fake sockets left")
        return self.sockets.pop(0)


def take(gen, n, timeout=2.0):
    async def _run():
        out = []
        async for ev in gen:
            out.append(ev)
            if len(out) >= n:
                break
        return out
    return asyncio.run(asyncio.wait_for(_run(), timeout))


def subscribes(ws, stream):
    return [json.loads(m) for m in ws.sent
            if json.loads(m)["data"]["stream"] == stream]


# ── BookSync semantics ────────────────────────────────────────────────────


def test_book_sync_accepts_contiguous_and_flags_gap():
    b = BookSync(SYM)
    assert b.ingest(_bu(snapshot=True, last=10)) == DEPTH_SNAPSHOT
    assert b.ingest(_bu(prev=10, first=11, last=12)) == "DELTA"
    # previous skips over our last: gap
    assert b.ingest(_bu(prev=40, first=41, last=44)) == "resync"
    # deltas are stale until the next snapshot lands
    assert b.ingest(_bu(prev=44, first=45, last=46)) == "stale"


def _bu(snapshot=False, last=0, prev=0, first=0):
    return BookUpdate(timestamp_ms=0, asks=(), bids=(), snapshot=snapshot,
                      last_price=0.0, first_update_id=first,
                      last_update_id=last, previous_update_id=prev)


# ── pump: snapshot, delta, trade ──────────────────────────────────────────


def test_pump_translates_snapshot_delta_trade():
    trade = wire.encode_trade(Trade(99.5, 0.5, True, 1_750_000_002_000))
    ws = FakeWS([
        frame(STREAM_ORDERBOOK, snap()),
        frame(STREAM_ORDERBOOK, delta(10, 11, 12,
                                      asks=(BookLevel(100.0, 0.0),
                                            BookLevel(101.0, 3.0),))),
        frame(STREAM_TRADES, trade),
    ])
    client = FakeClient([ws])
    events = take(client.depth_stream([SYM]), 3)
    assert isinstance(events[0], DepthEvent) and events[0].type == "SNAPSHOT"
    assert events[0].asks == [(100.0, 1.0)] and events[0].bids == [(99.0, 2.0)]
    assert events[1].type == "DELTA"
    assert events[1].asks == [(100.0, 0.0), (101.0, 3.0)]  # 0 = removal
    assert isinstance(events[2], TradeEvent)
    assert events[2].side == TRADE_BUY and events[2].size == 0.5
    # both streams subscribed up front
    assert len(subscribes(ws, STREAM_ORDERBOOK)) == 1
    assert len(subscribes(ws, STREAM_TRADES)) == 1


# ── pump: sequence gap heals by re-subscribe ──────────────────────────────


def test_pump_resubscribes_on_sequence_gap():
    ws = FakeWS([
        frame(STREAM_ORDERBOOK, snap(last=10)),
        frame(STREAM_ORDERBOOK, delta(77, 78, 80)),   # gap
        frame(STREAM_ORDERBOOK, snap(last=80)),       # fresh seed
    ])
    client = FakeClient([ws])
    events = take(client.depth_stream([SYM]), 2)
    assert [e.type for e in events] == ["SNAPSHOT", "SNAPSHOT"]
    books = subscribes(ws, STREAM_ORDERBOOK)
    assert len(books) == 2  # initial + resync


# ── pump: reconnect re-subscribes ─────────────────────────────────────────


def test_pump_reconnects_and_resubscribes():
    ws1 = FakeWS([frame(STREAM_ORDERBOOK, snap(last=5))])
    ws2 = FakeWS([frame(STREAM_ORDERBOOK, snap(last=9))])
    client = FakeClient([ws1, ws2])
    events = take(client.depth_stream([SYM]), 2)
    assert len(events) == 2
    assert len(subscribes(ws2, STREAM_ORDERBOOK)) == 1
    assert len(subscribes(ws2, STREAM_TRADES)) == 1


# ── historical candles ─────────────────────────────────────────────────────


def test_fetch_candles_uses_get_historical_candles_method():
    """Historical candles are a REQUEST, not a subscription (hub/client.go:
    only `get_historical_candles` is routed to the venue's REST history; a
    `subscribe` on stream 8 starts the upstream feed and answers nothing).
    This test previously pinned that protocol bug as if it were correct."""
    candle = Candle(100.0, 101.0, 99.0, 100.5, 12.0, 1_750_000_000_000,
                    60, True)
    inner = wire.encode_candles(60, [candle])
    ws = FakeWS([frame(STREAM_HISTORICAL_CANDLES, inner, timeframe=60)])
    client = FakeClient([ws])
    values = asyncio.run(client.fetch_candles(SYM, 60, limit=10))
    assert len(values) == 1 and values[0].close == 100.5
    reqs = [json.loads(m) for m in ws.sent]
    assert len(reqs) == 1
    req = reqs[0]
    assert reqs == [json.loads(m) for m in ws.sent] and req["method"] == "get_historical_candles"
    assert req["data"]["stream"] == STREAM_HISTORICAL_CANDLES
    assert req["data"]["pair"] == {"exchange": "binancef",
                                   "symbol": SYM.lower()}  # wire casing
    assert req["data"]["timeframe"] == 60 and req["data"]["count"] == 10
    # request/response: the socket is closed, nothing is unsubscribed
    assert not [r for r in reqs if r.get("method") == "unsubscribe"]


def test_venue_id_matches_the_gateway_adapter():
    """The hub keys subscriptions on (exchange, symbol) and ignores unknown
    venues; the gateway's Binance adapter reports 'binancef'
    (internal/binance/adapter.go). Any other id = silently no data."""
    from lse_terminal.providers.edgedepth.client import EXCHANGE
    assert EXCHANGE == "binancef"


# ── provider contract ──────────────────────────────────────────────────────


def test_provider_validates_eagerly():
    p = EdgeDepthProvider()
    with pytest.raises(ValueError):
        p.depth_stream(["NOPE"])
    with pytest.raises(ValueError):
        p.stream(["NOPE"])


def test_provider_depth_history_is_honest_not_supported():
    from lse_terminal.contracts import NotSupported
    p = EdgeDepthProvider()
    with pytest.raises(NotSupported):
        p.depth_history(SYM, 0.0, 1.0)
    assert "depth_history" not in p.capabilities()


def test_provider_search_and_catalog():
    p = EdgeDepthProvider()
    rows = p.search("")
    assert rows and rows[0].symbol == "BTCUSDT"
    assert all(r.provider == "edgedepth" for r in rows)
    assert p.search("eth")[0].symbol == "ETHUSDT"
