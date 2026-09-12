"""Market event bus — ordering, drop policy, cleanup guarantees."""

from __future__ import annotations

import asyncio

import pytest

from backend.marketdata.bus import MarketEventBus, UNSUBSCRIBED
from backend.marketdata.types import Envelope, build_topic


def _envelope(seq: int, topic: str = "trade:SIM:BTCUSDT") -> Envelope:
    return Envelope(
        topic=topic,
        type="trade",
        symbol="SIM:BTCUSDT",
        data={"seq": seq},
        provenance="simulated",
        source="test",
        ts=seq,
    )


@pytest.mark.asyncio
async def test_subscribe_receive_in_order() -> None:
    bus = MarketEventBus()
    sub = bus.subscribe("trade:SIM:BTCUSDT")
    for i in range(5):
        bus.publish(_envelope(i))
    received = []
    for _ in range(5):
        item = await asyncio.wait_for(sub.get(), timeout=1.0)
        assert item is not UNSUBSCRIBED
        received.append(item.data["seq"])
    assert received == [0, 1, 2, 3, 4]


@pytest.mark.asyncio
async def test_unsubscribe_wakes_blocked_consumer() -> None:
    bus = MarketEventBus()
    sub = bus.subscribe("trade:SIM:BTCUSDT")

    async def consume() -> object:
        return await sub.get()

    task = asyncio.create_task(consume())
    await asyncio.sleep(0.01)
    bus.unsubscribe(sub)
    item = await asyncio.wait_for(task, timeout=1.0)
    assert item is UNSUBSCRIBED
    assert bus.subscriber_count() == 0


@pytest.mark.asyncio
async def test_unsubscribe_delivers_queued_items_first() -> None:
    bus = MarketEventBus()
    sub = bus.subscribe("trade:SIM:BTCUSDT")
    bus.publish(_envelope(1))
    bus.unsubscribe(sub)
    first = await asyncio.wait_for(sub.get(), timeout=1.0)
    assert first.data["seq"] == 1  # queued item delivered…
    second = await asyncio.wait_for(sub.get(), timeout=1.0)
    assert second is UNSUBSCRIBED  # …then the sentinel


@pytest.mark.asyncio
async def test_publish_without_subscribers_is_noop() -> None:
    bus = MarketEventBus()
    bus.publish(_envelope(1))
    assert bus.metrics.published == 0
    assert bus.topics() == []


@pytest.mark.asyncio
async def test_slow_subscriber_drops_oldest_and_counts() -> None:
    bus = MarketEventBus(max_queue=4)
    sub = bus.subscribe("trade:SIM:BTCUSDT")
    for i in range(10):
        bus.publish(_envelope(i))
    # only the newest 4 survive; drops are accounted
    assert bus.metrics.dropped >= 6
    items = []
    while not sub.queue.empty():
        items.append(sub.queue.get_nowait().data["seq"])
    assert items == [6, 7, 8, 9]
    assert sub.dropped >= 6


@pytest.mark.asyncio
async def test_topics_isolated_per_topic() -> None:
    bus = MarketEventBus()
    sub_a = bus.subscribe("trade:SIM:BTCUSDT")
    sub_b = bus.subscribe("quote:SIM:ETHUSDT")
    bus.publish(_envelope(1, topic="trade:SIM:BTCUSDT"))
    bus.publish(_envelope(2, topic="quote:SIM:ETHUSDT"))
    a = await asyncio.wait_for(sub_a.get(), timeout=1.0)
    b = await asyncio.wait_for(sub_b.get(), timeout=1.0)
    assert a.topic == "trade:SIM:BTCUSDT"
    assert b.topic == "quote:SIM:ETHUSDT"
    assert bus.subscriber_count("trade:SIM:BTCUSDT") == 1
    assert bus.subscriber_count("quote:SIM:ETHUSDT") == 1


@pytest.mark.asyncio
async def test_stop_unsubscribes_everyone() -> None:
    bus = MarketEventBus()
    sub = bus.subscribe("trade:SIM:BTCUSDT")
    await bus.stop()
    assert bus.subscriber_count() == 0
    assert bus.topics() == []


def test_topic_build_parse_roundtrip() -> None:
    from backend.marketdata.types import parse_topic

    assert build_topic("trade", "SIM:BTCUSDT") == "trade:SIM:BTCUSDT"
    assert build_topic("candle", "BINANCE:ETHUSDT", "5m") == "candle:BINANCE:ETHUSDT:5m"
    assert parse_topic("candle:BINANCE:ETHUSDT:5m") == ("candle", "BINANCE:ETHUSDT", "5m")
    assert parse_topic("book:SIM:BTCUSDT") == ("book", "SIM:BTCUSDT", None)
    with pytest.raises(ValueError):
        build_topic("nope", "SIM:BTCUSDT")
