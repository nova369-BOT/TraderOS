"""Phase 1 gate: the F2 workspace shell is served, and the edgedepth
provider is discoverable in the rail."""

import pytest
from fastapi.testclient import TestClient

from lse_terminal.engine.server import create_app


@pytest.fixture()
def client(tmp_path, monkeypatch):
    monkeypatch.setenv("LSE_TERMINAL_CONFIG_DIR", str(tmp_path))
    monkeypatch.delenv("LSE_API_KEY", raising=False)
    return TestClient(create_app(), base_url="http://127.0.0.1")


def test_workspace_shell_served(client):
    r = client.get("/w/")
    assert r.status_code == 200
    assert "ws-root" in r.text


def test_workspace_bundle_assets(client):
    assert client.get("/w/workspace.js").status_code == 200
    assert client.get("/w/workspace.css").status_code == 200


def test_edgedepth_provider_listed(client):
    provs = {p["name"]: p for p in client.get("/api/providers").json()}
    assert "edgedepth" in provs
    caps = provs["edgedepth"]["capabilities"]
    assert "depth_stream" in caps
    assert "depth_history" not in caps  # honest live-only source


def test_chart_pane_timeframes_served(client):
    # Phase 2's chart pane polls exactly these; the demo source must serve them.
    for tf in ("1m", "5m", "15m", "1h"):
        r = client.get("/api/candles", params={
            "provider": "demo", "symbol": "DEMO:BTC", "timeframe": tf,
            "limit": 50}).json()
        assert len(r["candles"]) == 50
        assert all(len(c) == 6 for c in r["candles"])
