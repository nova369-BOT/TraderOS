"""MarketDataService — ref counting, dedupe, fallback, caches, cleanup."""

from __future__ import annotations

import asyncio

import pytest

from backend.marketdata.adapters.simulated import SimulatedAdapter
from backend.marketdata.service import MarketDataService
from backend.marketdata.types import Envelope


async def _start_sim_service(monkeypatch, **env) -> MarketDataService:
    monkeypatch.setenv("MARKETDATA_MODE", "simulated")
    for key, value in env.items():
        monkeypatch.setenv(key, value)
    service = MarketDataService()
    await service.start()
    return service


@pytest.mark.asyncio
async def test_ref_counting_no_duplicate_adapter_subscription(monkeypatch) -> None:
    service = await _start_sim_service(monkeypatch)
    try:
        await service.subscribe_topic("trade:SIM:BTCUSDT")
        await service.subscribe_topic("trade:SIM:BTCUSDT")
        await service.subscribe_topic("trade:SIM:BTCUSDT")
        sim = service._sim  # noqa: SLF001
        active_book_topics = [k for k in sim._active if k[0] == "trade" and k[1] == "BTCUSDT"]  # noqa: SLF001
        assert len(active_book_topics) == 1, "duplicate adapter subscription detected"
        assert service._topic_refs["trade:SIM:BTCUSDT"] == 3  # noqa: SLF001

        await service.unsubscribe_topic("trade:SIM:BTCUSDT")
        await service.unsubscribe_topic("trade:SIM:BTCUSDT")
        assert "trade:SIM:BTCUSDT" in service._topic_refs  # noqa: SLF001
        await service.unsubscribe_topic("trade:SIM:BTCUSDT")
        assert "trade:SIM:BTCUSDT" not in service._topic_refs  # noqa: SLF001
        await asyncio.sleep(0.05)
        assert not any(k[0] == "trade" for k in sim._active)  # noqa: SLF001
    finally:
        await service.stop()


@pytest.mark.asyncio
async def test_caches_update_and_are_bounded(monkeypatch) -> None:
    service = await _start_sim_service(monkeypatch)
    try:
        await service.subscribe_topic("trade:SIM:ETHUSDT")
        deadline = asyncio.get_running_loop().time() + 3.0
        while asyncio.get_running_loop().time() < deadline:
            trades = service.get_trades("SIM:ETHUSDT", 1000)
            if len(trades) >= 50:
                break
            await asyncio.sleep(0.05)
        trades = service.get_trades("SIM:ETHUSDT", 1000)
        assert len(trades) >= 10, "trades should flow and be cached"
        # ring bound (service-level cap is 600)
        assert len(trades) <= 600
        # all cached trades validated to the normalized model
        assert all(t.symbol == "SIM:ETHUSDT" for t in trades)
        assert all(t.side in {"buy", "sell"} for t in trades)
    finally:
        await service.stop()


@pytest.mark.asyncio
async def test_bus_delivery_with_provenance(monkeypatch) -> None:
    service = await _start_sim_service(monkeypatch)
    try:
        sub = service.open_subscription("trade:SIM:BTCUSDT")
        await service.subscribe_topic("trade:SIM:BTCUSDT")
        got: list[Envelope] = []
        try:
            deadline = asyncio.get_running_loop().time() + 3.0
            while asyncio.get_running_loop().time() < deadline and len(got) < 3:
                item = await asyncio.wait_for(sub.get(), timeout=1.0)
                got.append(item)
        except asyncio.TimeoutError:
            pass
        assert len(got) >= 1
        for envelope in got:
            assert envelope.provenance == "simulated"
            assert envelope.source == "simulator"
    finally:
        await service.stop()


@pytest.mark.asyncio
async def test_binance_topic_falls_back_to_simulator_when_unreachable(monkeypatch) -> None:
    """Mode auto + unreachable binance → labeled simulator after grace."""
    monkeypatch.setenv("MARKETDATA_MODE", "auto")
    monkeypatch.setenv("MARKETDATA_FALLBACK_GRACE", "0.3")
    monkeypatch.setenv("MARKETDATA_WATCHDOG_INTERVAL", "0.2")
    # Point binance at a dead port — connection fails, fallback engages.
    service = MarketDataService()
    await service.start()
    try:
        binance = service._binance  # noqa: SLF001
        assert binance is not None
        binance._rest_base = "http://127.0.0.1:1"  # noqa: SLF001
        binance._ws_base = "ws://127.0.0.1:1"  # noqa: SLF001

        await service.subscribe_topic("quote:BINANCE:BTCUSDT")
        assert service._topic_source["quote:BINANCE:BTCUSDT"] == "binance"  # noqa: SLF001

        deadline = asyncio.get_running_loop().time() + 5.0
        while asyncio.get_running_loop().time() < deadline:
            if service._topic_source.get("quote:BINANCE:BTCUSDT") == "simulator":  # noqa: SLF001
                break
            await asyncio.sleep(0.05)
        assert service._topic_source.get("quote:BINANCE:BTCUSDT") == "simulator"  # noqa: SLF001

        # fallback serves labeled simulated quotes
        deadline = asyncio.get_running_loop().time() + 3.0
        quote = None
        while asyncio.get_running_loop().time() < deadline:
            quote = service.get_quote("BINANCE:BTCUSDT")
            if quote is not None:
                break
            await asyncio.sleep(0.05)
        assert quote is not None, "simulator fallback should serve quotes"

        statuses = {feed.feed: feed for feed in service.feed_statuses()}
        assert statuses["binance"].state.value == "fallback"
        assert statuses["simulator"].provenance == "simulated"
    finally:
        await service.stop()


@pytest.mark.asyncio
async def test_unknown_exchange_rejected(monkeypatch) -> None:
    service = await _start_sim_service(monkeypatch)
    try:
        with pytest.raises(ValueError):
            await service.subscribe_topic("trade:NOPE:XYZ")
    finally:
        await service.stop()


@pytest.mark.asyncio
async def test_failed_subscribe_leaves_no_phantom_ref(monkeypatch) -> None:
    """Adapter-rejected topic must not leave a ref that blocks later retries."""
    service = await _start_sim_service(monkeypatch)
    try:
        # "nope" stream is not served by the simulated adapter
        with pytest.raises(ValueError):
            await service.subscribe_topic("nope:SIM:BTCUSDT")
        assert "nope:SIM:BTCUSDT" not in service._topic_refs  # noqa: SLF001
        assert "nope:SIM:BTCUSDT" not in service._topic_source  # noqa: SLF001
        # a retry fails cleanly again (no silent no-op success)
        with pytest.raises(ValueError):
            await service.subscribe_topic("nope:SIM:BTCUSDT")
        # and valid topics still work afterwards
        await service.subscribe_topic("trade:SIM:BTCUSDT")
        assert service._topic_refs["trade:SIM:BTCUSDT"] == 1  # noqa: SLF001
    finally:
        await service.stop()


@pytest.mark.asyncio
async def test_binance_topic_served_by_fallback_sim_unsubscribes_cleanly(monkeypatch) -> None:
    """mode=simulated: BINANCE topics come from the BINANCE-namespace fallback
    instance; unsubscribe must release that instance (not the SIM one)."""
    monkeypatch.setenv("MARKETDATA_MODE", "simulated")
    service = MarketDataService()
    await service.start()
    try:
        fallback = service._binance_sim  # noqa: SLF001
        sim = service._sim  # noqa: SLF001
        assert fallback is not None and sim is not None
        await service.subscribe_topic("trade:BINANCE:BTCUSDT")
        assert service._topic_source["trade:BINANCE:BTCUSDT"] == "simulator"  # noqa: SLF001
        assert any(k == ("trade", "BTCUSDT", None) for k in fallback._active)  # noqa: SLF001
        await service.unsubscribe_topic("trade:BINANCE:BTCUSDT")
        await asyncio.sleep(0.05)
        # fallback instance released — no leaked adapter subscription
        assert not any(k[0] == "trade" and k[1] == "BTCUSDT" for k in fallback._active)  # noqa: SLF001
        assert "trade:BINANCE:BTCUSDT" not in service._topic_refs  # noqa: SLF001
    finally:
        await service.stop()


@pytest.mark.asyncio
async def test_stop_stops_adapters_and_bus(monkeypatch) -> None:
    service = await _start_sim_service(monkeypatch)
    await service.subscribe_topic("book:SIM:BTCUSDT")
    await service.subscribe_topic("funding:SIM:ETHUSDT")
    sim = service._sim  # noqa: SLF001
    await service.stop()
    assert not sim._active  # noqa: SLF001
    assert service.bus.subscriber_count() == 0
    assert not service._topic_refs  # noqa: SLF001


@pytest.mark.asyncio
async def test_hub_bridge_normalizes_ticks(monkeypatch) -> None:
    service = await _start_sim_service(monkeypatch)
    try:
        service._on_hub_tick(
            {
                "symbol": "NSE:RELIANCE",
                "ltp": 2950.5,
                "change": 12.3,
                "change_pct": 0.42,
                "ts": "2026-09-12T10:00:00+00:00",
                "provider": "yahoo",
            }
        )
        quote = service.get_quote("NSE:RELIANCE")
        assert quote is not None
        assert quote.last == 2950.5
        assert quote.symbol == "NSE:RELIANCE"
    finally:
        await service.stop()


@pytest.mark.asyncio
async def test_us_bridge_normalizes_trades(monkeypatch) -> None:
    service = await _start_sim_service(monkeypatch)
    try:
        service._on_us_trade(
            {
                "type": "trade",
                "symbol": "AAPL",
                "p": 242.10,
                "v": 100.0,
                "t": 1700000000000,
                "provider": "finnhub",
            }
        )
        trades = service.get_trades("US:AAPL", 10)
        assert len(trades) == 1
        assert trades[0].price == 242.10
        assert trades[0].side == "unknown"
    finally:
        await service.stop()
