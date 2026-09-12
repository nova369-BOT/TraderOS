"""B3 regression: GET /api/quotes must label an empty batch explicitly.

Offline (all providers unusable) the response must carry
``status: "unavailable"`` so priceStream/StatusBar show DISCONNECTED/MOCK
instead of a healthy-looking zero-data "LIVE" state.
"""

from __future__ import annotations

from typing import Any

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from backend.api.routes import quotes as quotes_routes


class _DeadFetcher:
    """Unified fetcher whose every provider call raises (simulated outage)."""

    class _Yahoo:
        async def get_quotes(self, symbols: list[str]) -> list[dict[str, Any]]:
            raise ConnectionError("simulated yahoo outage")

    class _Finnhub:
        api_key = "test-key"

        async def get_quote(self, symbol: str) -> dict[str, Any] | None:
            raise ConnectionError("simulated finnhub outage")

    class _Kite:
        api_key = "test-key"

        def resolve_access_token(self) -> str | None:
            return None  # unconfigured → route skips the Kite branch

    yahoo = _Yahoo()
    finnhub = _Finnhub()
    kite = _Kite()


class _DeadRegistry:
    async def invoke(self, *args: Any, **kwargs: Any):
        raise ConnectionError("simulated adapter outage")


@pytest.fixture()
def client(monkeypatch):
    app = FastAPI()
    app.include_router(quotes_routes.router, prefix="/api")

    async def _dead_fetcher():
        return _DeadFetcher()

    monkeypatch.setattr(quotes_routes, "get_unified_fetcher", _dead_fetcher)
    monkeypatch.setattr(quotes_routes, "get_adapter_registry", lambda: _DeadRegistry())
    with TestClient(app) as test_client:
        yield test_client


def test_quotes_offline_reports_unavailable(client: TestClient) -> None:
    resp = client.get("/api/quotes", params={"market": "NSE", "symbols": "RELIANCE,TCS"})
    assert resp.status_code == 200
    payload = resp.json()
    assert payload["status"] == "unavailable"
    assert payload["quotes"] == []


def test_quotes_unsupported_market_400(client: TestClient) -> None:
    resp = client.get("/api/quotes", params={"market": "XX", "symbols": "ABC"})
    assert resp.status_code == 400
