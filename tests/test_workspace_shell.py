"""Phase 1 gate: the F2 workspace surface.

The workspace is now REPLACED by the LSE terminal itself (Binance is a
first-class source in the terminal chart, the panes live in the toolbar's
Panes dropdown, the watchlist shows both books). So /w/ no longer serves
the old shell — it redirects to the terminal. The bundle asset routes
stay, so a tab left open across the redeploy does not break."""

import pytest
from fastapi.testclient import TestClient

from lse_terminal.engine.server import create_app


@pytest.fixture()
def client(tmp_path, monkeypatch):
    monkeypatch.setenv("LSE_TERMINAL_CONFIG_DIR", str(tmp_path))
    monkeypatch.delenv("LSE_API_KEY", raising=False)
    return TestClient(create_app(), base_url="http://127.0.0.1")


def test_workspace_redirects_to_terminal(client):
    # /w/ and its explicit index both land on the LSE terminal now, via a
    # 302 (not 301, so the redirect can follow the workspace if it ever
    # returns in a different shape).
    for path in ("/w/", "/w/index.html"):
        r = client.get(path, follow_redirects=False)
        assert r.status_code == 302
        assert r.headers["location"] == "/"
    # Following the redirect reaches the terminal shell, which carries the
    # source switch the user asked for.
    r = client.get("/w/", follow_redirects=True)
    assert r.status_code == 200
    assert 'id="src-open"' in r.text


def test_workspace_bundle_assets(client):
    assert client.get("/w/workspace.js").status_code == 200
    assert client.get("/w/workspace.css").status_code == 200


def test_chart_pane_timeframes_served(client):
    # Phase 2's chart pane polls exactly these; the demo source must serve them.
    for tf in ("1m", "5m", "15m", "1h"):
        r = client.get("/api/candles", params={
            "provider": "demo", "symbol": "DEMO:BTC", "timeframe": tf,
            "limit": 50}).json()
        assert len(r["candles"]) == 50
        assert all(len(c) == 6 for c in r["candles"])
