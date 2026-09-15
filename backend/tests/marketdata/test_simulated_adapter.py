"""Simulated adapter — labeling law, lifecycle, warm start."""

from __future__ import annotations

import asyncio

import pytest

from backend.marketdata.adapters.simulated import SimulatedAdapter
from backend.marketdata.types import Envelope


def _collector() -> tuple[list[Envelope], callable]:
    out: list[Envelope] = []
    return out, out.append


@pytest.mark.asyncio
async def test_every_event_is_labeled_simulated() -> None:
    out, publish = _collector()
    adapter = SimulatedAdapter(publish, emit_interval_s=0.02)
    await adapter.start()
    try:
        await adapter.subscribe("trade", "BTCUSDT", None)
        await adapter.subscribe("book", "BTCUSDT", None)
        await adapter.subscribe("funding", "BTCUSDT", None)
        await adapter.subscribe("liquidation", "BTCUSDT", None)
        await adapter.subscribe("candle", "BTCUSDT", "1m")
        deadline = asyncio.get_running_loop().time() + 1.5
        while len(out) < 20 and asyncio.get_running_loop().time() < deadline:
            await asyncio.sleep(0.02)
        assert len(out) >= 20
        for envelope in out:
            assert envelope.provenance == "simulated"
            assert envelope.source == "simulator"
            assert envelope.symbol == "SIM:BTCUSDT"
        types = {envelope.type for envelope in out}
        assert "trade" in types
        assert "book_delta" in types or "book_snapshot" in types
    finally:
        await adapter.stop()


@pytest.mark.asyncio
async def test_warm_start_publishes_snapshot_immediately() -> None:
    out, publish = _collector()
    adapter = SimulatedAdapter(publish)
    await adapter.start()
    try:
        await adapter.subscribe("book", "ETHUSDT", None)
        # snapshot must arrive without waiting for the emit loop tick
        await asyncio.sleep(0.05)
        snapshots = [e for e in out if e.type == "book_snapshot"]
        assert snapshots, "expected an immediate book snapshot on subscribe"
        data = snapshots[0].data
        assert data["bids"] and data["asks"]
        prices_bids = [level["price"] for level in data["bids"]]
        prices_asks = [level["price"] for level in data["asks"]]
        assert prices_bids == sorted(prices_bids, reverse=True)
        assert prices_asks == sorted(prices_asks)
    finally:
        await adapter.stop()


@pytest.mark.asyncio
async def test_unsubscribe_stops_events_and_task_cleanup() -> None:
    out, publish = _collector()
    adapter = SimulatedAdapter(publish, emit_interval_s=0.02)
    await adapter.start()
    await adapter.subscribe("trade", "BTCUSDT", None)
    await asyncio.sleep(0.1)
    await adapter.unsubscribe("trade", "BTCUSDT", None)
    count_after_unsub = len(out)
    await asyncio.sleep(0.2)
    assert len(out) == count_after_unsub, "no events should flow after unsubscribe"

    tasks_before = {t for t in asyncio.all_tasks() if t is not asyncio.current_task()}
    await adapter.stop()
    await asyncio.sleep(0.05)
    still_running = [
        t for t in tasks_before if not t.done() and "simulator" in t.get_name()
    ]
    assert not still_running, f"leaked tasks: {still_running}"


@pytest.mark.asyncio
async def test_unknown_instrument_rejected() -> None:
    out, publish = _collector()
    adapter = SimulatedAdapter(publish)
    await adapter.start()
    try:
        with pytest.raises(ValueError):
            await adapter.subscribe("trade", "NOPEUSDT", None)
    finally:
        await adapter.stop()


@pytest.mark.asyncio
async def test_status_is_simulated() -> None:
    out, publish = _collector()
    adapter = SimulatedAdapter(publish)
    await adapter.start()
    try:
        assert adapter.status().provenance == "simulated"
        assert adapter.status().feed == "simulator"
    finally:
        await adapter.stop()
