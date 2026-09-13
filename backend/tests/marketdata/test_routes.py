"""REST + WS route surface for the unified market-data foundation.

Covers the /api/marketdata/* endpoints and the /api/ws/market protocol:
status shape, symbol catalog, resolution rules, honest "unavailable"
answers, subscribe/unsubscribe flow with explicit provenance, invalid
payloads, and per-client ref-counting (two clients → ONE upstream
subscription).

The service runs in ``MARKETDATA_MODE=simulated`` so no external egress
is attempted; every event is labeled ``provenance="simulated"``.
"""

from __future__ import annotations

from contextlib import asynccontextmanager
from typing import Any

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from backend.marketdata import routes as md_routes
from backend.marketdata.service import get_marketdata_service, reset_marketdata_service


@pytest.fixture()
def client(monkeypatch) -> TestClient:
    """App with the marketdata router and a simulated-mode service."""
    monkeypatch.setenv("MARKETDATA_MODE", "simulated")
    reset_marketdata_service()

    @asynccontextmanager
    async def lifespan(_app: FastAPI):
        service = get_marketdata_service()
        await service.start()
        try:
            yield
        finally:
            await service.stop()
            reset_marketdata_service()

    app = FastAPI(lifespan=lifespan)
    app.include_router(md_routes.router)  # router already prefixes /api
    with TestClient(app) as test_client:
        yield test_client


def _ws(client: TestClient) -> TestClient.websocket:
    # Non-browser client → no Origin header → allowed by the shared WS auth.
    return client.websocket_connect("/api/ws/market")


def deadline_wait(fn, expected, timeout_s: float = 2.0) -> None:
    """Poll fn() until it equals expected (adapter unsubscribes are async)."""
    import time

    deadline = time.monotonic() + timeout_s
    while time.monotonic() < deadline:
        if fn() == expected:
            return
        time.sleep(0.02)
    raise AssertionError(f"expected {expected}, got {fn()}")


def _recv_until(ws: Any, predicate, timeout_s: float = 5.0) -> dict[str, Any] | None:
    """Pull messages until one matches; None on timeout."""
    import time

    deadline = time.monotonic() + timeout_s
    while time.monotonic() < deadline:
        msg = ws.receive_json()
        if predicate(msg):
            return msg
    return None


# ----------------------------------------------------------------------
# REST
# ----------------------------------------------------------------------
def test_status_reports_mode_feeds_and_topics(client: TestClient) -> None:
    resp = client.get("/api/marketdata/status")
    assert resp.status_code == 200
    payload = resp.json()
    assert payload["mode"] == "simulated"
    assert isinstance(payload["feeds"], list) and payload["feeds"]
    for feed in payload["feeds"]:
        assert {"feed", "exchange", "state", "provenance"} <= set(feed)
    assert isinstance(payload["topics"], dict)


def test_symbols_catalog_lists_simulator_instruments(client: TestClient) -> None:
    resp = client.get("/api/marketdata/symbols")
    assert resp.status_code == 200
    payload = resp.json()
    assert payload["count"] == len(payload["items"]) > 0
    symbols = {item["symbol"] for item in payload["items"]}
    assert "SIM:BTCUSDT" in symbols
    for item in payload["items"]:
        assert item["exchange"] == "SIM"

    # query filter
    filtered = client.get("/api/marketdata/symbols", params={"query": "BTCUSDT"}).json()
    assert all("BTCUSDT" in item["symbol"] for item in filtered["items"])

    # exchange filter
    only_sim = client.get("/api/marketdata/symbols", params={"exchange": "sim"}).json()
    assert only_sim["count"] == payload["count"]  # case-insensitive
    none = client.get("/api/marketdata/symbols", params={"exchange": "BINANCE"}).json()
    assert none["count"] == 0  # no live adapter in simulated mode


def test_resolve_normalizes_inputs_and_rejects_malformed(client: TestClient) -> None:
    # canonical passthrough + upper-casing
    assert client.get("/api/marketdata/resolve/nse:reliance").json()["symbol"] == "NSE:RELIANCE"
    # canonical Binance form kept even without a live catalog
    assert (
        client.get("/api/marketdata/resolve/BINANCE:BTCUSDT").json()["symbol"] == "BINANCE:BTCUSDT"
    )
    # single-segment unknown input → upper-cased passthrough (no invention)
    assert client.get("/api/marketdata/resolve/btcusdt").json()["symbol"] == "BTCUSDT"
    # malformed → 400, not 500
    bad = client.get("/api/marketdata/resolve/%21%21%21")  # "!!!"
    assert bad.status_code == 400
    assert bad.json()["detail"]  # explicit reason


def test_rest_quote_unavailable_without_data(client: TestClient) -> None:
    resp = client.get("/api/marketdata/quote/BINANCE:BTCUSDT")
    assert resp.status_code == 200
    payload = resp.json()
    assert payload["symbol"] == "BINANCE:BTCUSDT"
    assert payload["provenance"] == "unavailable"  # honest, never fabricated
    assert payload["data"] is None


def test_rest_reads_serve_cached_events_with_provenance(client: TestClient) -> None:
    """Subscribe via WS, let the simulator warm-start, then REST reads must
    return the served state with the same explicit provenance label."""
    with _ws(client) as ws:
        ws.send_json({"op": "subscribe", "topics": ["quote:SIM:BTCUSDT"]})
        ack = ws.receive_json()
        assert ack["type"] == "subscribed"
        assert ack["topics"] == ["quote:SIM:BTCUSDT"]

        import time

        deadline = time.monotonic() + 5.0
        payload = None
        while time.monotonic() < deadline:
            payload = client.get("/api/marketdata/quote/SIM:BTCUSDT").json()
            if payload["data"] is not None:
                break
            time.sleep(0.05)
        assert payload is not None and payload["data"] is not None
        assert payload["provenance"] == "simulated"
        assert payload["source"] == "simulator"
        assert payload["data"]["symbol"] == "SIM:BTCUSDT"
        assert float(payload["data"]["bid"] or 0) > 0
        assert float(payload["data"]["ask"] or 0) > 0


# ----------------------------------------------------------------------
# WebSocket
# ----------------------------------------------------------------------
def test_ws_subscribe_events_and_unsubscribe(client: TestClient) -> None:
    with _ws(client) as ws:
        ws.send_json({"op": "subscribe", "topics": ["quote:SIM:BTCUSDT"]})
        ack = ws.receive_json()
        assert ack == {"type": "subscribed", "topics": ["quote:SIM:BTCUSDT"], "errors": []}

        event = _recv_until(ws, lambda m: m.get("type") == "event")
        assert event is not None, "no simulator event within timeout"
        assert event["event"] == "quote"
        assert event["topic"] == "quote:SIM:BTCUSDT"
        assert event["symbol"] == "SIM:BTCUSDT"
        assert event["provenance"] == "simulated"  # never presented as live
        assert event["source"] == "simulator"
        assert "ts" in event and "data" in event

        ws.send_json({"op": "unsubscribe", "topics": ["quote:SIM:BTCUSDT"]})
        # Drop any in-flight events until the unsubscribed ack arrives.
        unsub = _recv_until(ws, lambda m: m.get("type") == "unsubscribed")
        assert unsub is not None
        assert unsub["topics"] == ["quote:SIM:BTCUSDT"]


def test_ws_invalid_payloads_are_rejected(client: TestClient) -> None:
    with _ws(client) as ws:
        # unsupported op
        ws.send_json({"op": "bogus"})
        assert ws.receive_json() == {"type": "error", "message": "Unsupported op: bogus"}

        # no topics
        ws.send_json({"op": "subscribe", "topics": []})
        assert ws.receive_json()["type"] == "error"

        # malformed topic (unknown stream)
        ws.send_json({"op": "subscribe", "topics": ["nonsense:SIM:BTCUSDT"]})
        msg = ws.receive_json()
        assert msg["type"] == "subscribed"
        assert msg["topics"] == []
        assert len(msg["errors"]) == 1 and "nonsense" in msg["errors"][0]["error"]

        # malformed symbol
        ws.send_json({"op": "subscribe", "topics": ["quote:::"]})
        msg = ws.receive_json()
        assert msg["type"] == "subscribed" and msg["topics"] == []
        assert msg["errors"]

        # unknown simulator instrument → per-topic error, connection stays up
        ws.send_json({"op": "subscribe", "topics": ["quote:SIM:NOPE"]})
        msg = ws.receive_json()
        assert msg["type"] == "subscribed" and msg["topics"] == []
        assert "unknown simulator instrument" in msg["errors"][0]["error"]

        # ping keeps the connection observable
        ws.send_json({"op": "ping"})
        assert ws.receive_json() == {"type": "pong"}


def test_ws_status_op_reports_service_state(client: TestClient) -> None:
    with _ws(client) as ws:
        ws.send_json({"op": "status"})
        msg = ws.receive_json()
        assert msg["type"] == "status"
        assert msg["feeds"] and isinstance(msg["topics"], dict)


def test_two_clients_share_one_upstream_subscription(client: TestClient) -> None:
    service = get_marketdata_service()

    def upstream_subs() -> int:
        sim = service._sim  # noqa: SLF001
        return len([k for k in sim._active if k[0] == "trade" and k[1] == "ETHUSDT"])  # noqa: SLF001

    with _ws(client) as first, _ws(client) as second:
        for ws in (first, second):
            ws.send_json({"op": "subscribe", "topics": ["trade:SIM:ETHUSDT"]})
        # both acks arrive on their own sockets
        assert first.receive_json()["type"] == "subscribed"
        assert second.receive_json()["type"] == "subscribed"

        # two client subscriptions, ONE upstream adapter subscription
        assert service._topic_refs["trade:SIM:ETHUSDT"] == 2  # noqa: SLF001
        assert upstream_subs() == 1

        # one client unsubscribes → upstream subscription must survive
        second.send_json({"op": "unsubscribe", "topics": ["trade:SIM:ETHUSDT"]})
        _recv_until(second, lambda m: m.get("type") == "unsubscribed")
        assert service._topic_refs["trade:SIM:ETHUSDT"] == 1  # noqa: SLF001
        assert upstream_subs() == 1

        event = _recv_until(first, lambda m: m.get("type") == "event")
        assert event is not None, "remaining client must keep receiving events"

        # last client unsubscribes → upstream released
        first.send_json({"op": "unsubscribe", "topics": ["trade:SIM:ETHUSDT"]})
        _recv_until(first, lambda m: m.get("type") == "unsubscribed")
        assert "trade:SIM:ETHUSDT" not in service._topic_refs  # noqa: SLF001
        deadline_wait(upstream_subs, 0)
