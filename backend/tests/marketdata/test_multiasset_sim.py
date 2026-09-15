"""Multi-asset simulated universe (user directive: not stocks-only).

The simulator catalog must cover crypto perps, metals (XAUUSD/XAGUSD), energy
(USOIL) and FX majors (EURUSD/GBPUSD/USDJPY) so the terminal is exercisable
across asset classes offline — every envelope labeled provenance="simulated".
Also covers the paper-engine bridge: canonical SIM:/BINANCE: symbols resolve
fills and marks from the marketdata service.
"""

from __future__ import annotations

import asyncio

import pytest

from backend.marketdata.adapters.simulated import SIM_CATALOG
from backend.marketdata.service import MarketDataService, reset_marketdata_service
from backend.paper_trading.service import PaperTradingEngine


@pytest.mark.asyncio
async def test_catalog_covers_all_asset_classes(monkeypatch) -> None:
    monkeypatch.setenv("MARKETDATA_MODE", "simulated")
    by_kind: dict[str, list[str]] = {}
    for inst, spec in SIM_CATALOG.items():
        by_kind.setdefault(spec.kind, []).append(inst)
    assert {"perp", "metal", "energy", "forex"} <= set(by_kind)
    assert "XAUUSD" in by_kind["metal"]
    assert "XAGUSD" in by_kind["metal"]
    assert "USOIL" in by_kind["energy"]
    assert {"EURUSD", "GBPUSD", "USDJPY"} <= set(by_kind["forex"])


@pytest.mark.asyncio
async def test_symbol_catalog_metadata_is_asset_class_aware(monkeypatch) -> None:
    monkeypatch.setenv("MARKETDATA_MODE", "simulated")
    service = MarketDataService()
    await service.start()
    try:
        items = await service.list_symbols(None)
        by_symbol = {item["symbol"]: item for item in items}
        gold = by_symbol.get("SIM:XAUUSD")
        assert gold is not None, "XAUUSD missing from catalog"
        assert gold["kind"] == "metal"
        assert gold["quote"] == "USD"
        assert gold["base"] == "XAU"
        eurusd = by_symbol["SIM:EURUSD"]
        assert eurusd["kind"] == "forex"
        assert eurusd["base"] == "EUR"
        assert eurusd["quote"] == "USD"
        usdjpy = by_symbol["SIM:USDJPY"]
        assert usdjpy["base"] == "USD" and usdjpy["quote"] == "JPY"
        # search finds gold by partial name
        hits = await service.list_symbols("XAU")
        assert any(item["instrument"] == "XAUUSD" for item in hits)
    finally:
        await service.stop()
        reset_marketdata_service()


@pytest.mark.asyncio
async def test_gold_quote_and_candles_flow_labeled_simulated(monkeypatch) -> None:
    monkeypatch.setenv("MARKETDATA_MODE", "simulated")
    service = MarketDataService()
    await service.start()
    try:
        await service.subscribe_topic("quote:SIM:XAUUSD")
        await service.subscribe_topic("candle:SIM:XAUUSD:1m")

        deadline = asyncio.get_running_loop().time() + 5.0
        while asyncio.get_running_loop().time() < deadline:
            quote = service.get_quote("SIM:XAUUSD")
            candles = service.get_candles("SIM:XAUUSD", "1m", 10)
            if quote is not None and len(candles) >= 2:
                break
            await asyncio.sleep(0.05)

        quote = service.get_quote("SIM:XAUUSD")
        assert quote is not None, "no simulated gold quote"
        assert 2_000.0 < float(quote.last or quote.bid or 0) < 3_500.0  # plausible gold
        provenance, source = service.get_symbol_source("SIM:XAUUSD")
        assert provenance == "simulated" and source == "simulator"

        candles = service.get_candles("SIM:XAUUSD", "1m", 10)
        assert len(candles) >= 2, "no simulated gold candles"
        for candle in candles:
            assert candle.low <= candle.high
            assert candle.open > 0 and candle.close > 0
    finally:
        await service.stop()
        reset_marketdata_service()


@pytest.mark.asyncio
async def test_paper_engine_resolves_marketdata_prices(monkeypatch) -> None:
    """The paper bridge fills/prices canonical SIM: symbols via marketdata."""
    monkeypatch.setenv("MARKETDATA_MODE", "simulated")
    # the bridge uses the app-wide singleton — test it the same way
    from backend.marketdata.service import get_marketdata_service

    service = get_marketdata_service()
    await service.start()
    engine = PaperTradingEngine()
    try:
        price = await engine._marketdata_last("SIM:XAUUSD")  # noqa: SLF001
        assert price is not None and 2_000.0 < price < 3_500.0

        mark = await engine.refresh_mark("SIM:EURUSD")
        assert mark is not None and 0.5 < mark < 2.0

        # equity-shaped symbols do NOT use the marketdata path
        assert await engine._marketdata_last("RELIANCE") is None  # noqa: SLF001
        assert await engine._marketdata_last("NSE:RELIANCE") is None  # noqa: SLF001
    finally:
        await service.stop()
        reset_marketdata_service()
