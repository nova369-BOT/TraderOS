"""B1 regression: chart endpoints must degrade to explicit 503 (not 500) when
the underlying data provider is unavailable — normalized branch and footprint.
"""

from __future__ import annotations

from typing import Any

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from backend.api.routes import chart as chart_routes


class _DeadProvider:
    """Provider whose every fetch raises — simulates a provider outage."""

    def get_ohlcv(self, *args: Any, **kwargs: Any):
        raise ConnectionError("simulated provider outage")


@pytest.fixture()
def client(monkeypatch):
    app = FastAPI()
    app.include_router(chart_routes.router, prefix="/api")

    async def _dead_provider():
        return _DeadProvider()

    monkeypatch.setattr(chart_routes, "get_chart_provider", _dead_provider)
    with TestClient(app) as test_client:
        yield test_client


def test_get_chart_returns_503_on_provider_outage(client: TestClient) -> None:
    resp = client.get("/api/chart/BTCUSDT", params={"normalized": "true", "market": "crypto"})
    assert resp.status_code == 503
    assert "unavailable" in resp.json()["detail"].lower()


def test_footprint_returns_503_on_provider_outage(client: TestClient) -> None:
    resp = client.get("/api/charts/BTCUSDT/footprint")
    assert resp.status_code == 503
    assert "footprint" in resp.json()["detail"].lower()
