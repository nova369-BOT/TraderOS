"""SPA serving regression (R3).

The backend serves the built frontend: marketing landing at ``/`` (and under
``/landing/``), and the SPA entry (``app.html``) for EVERY other non-file
route. A pre-R3 hardcoded route allowlist served the landing page for
workspace routes (/terminal, /markets/...) — this test pins the fixed
behavior so IA changes can never silently break serving again.
"""

from __future__ import annotations

from pathlib import Path
from typing import Iterator

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from backend.main import spa_entry


@pytest.fixture()
def dist(tmp_path: Path) -> Path:
    """Minimal staged bundle: landing index + SPA app entry."""
    (tmp_path / "index.html").write_text("LANDING-INDEX")
    (tmp_path / "app.html").write_text('SPA-ENTRY <script src="/assets/main.js"></script>')
    (tmp_path / "support.js").write_text("// landing support")
    (tmp_path / "landing").mkdir()
    (tmp_path / "landing" / "index.html").write_text("LANDING-SUBDIR")
    return tmp_path


@pytest.fixture()
def client(monkeypatch, dist: Path) -> Iterator[TestClient]:
    app = FastAPI()
    monkeypatch.setattr("backend.main._frontend_dist", dist)
    app.get("/{full_path:path}", include_in_schema=False)(spa_entry)
    with TestClient(app) as test_client:
        yield test_client


def test_root_serves_marketing_landing(client: TestClient) -> None:
    resp = client.get("/")
    assert resp.status_code == 200
    assert resp.text == "LANDING-INDEX"


def test_landing_subtree_serves_its_own_index(client: TestClient) -> None:
    resp = client.get("/landing/")
    assert resp.status_code == 200
    assert resp.text == "LANDING-SUBDIR"


def test_every_workspace_route_serves_the_spa_entry(client: TestClient) -> None:
    for route in [
        "/terminal",
        "/markets",
        "/markets/stocks",
        "/markets/derivatives/greeks",
        "/portfolio",
        "/portfolio/risk",
        "/labs",
        "/labs/model-lab",
        "/ops",
        "/ops/data-quality",
        "/settings",
        "/launchpad",
        "/home",
        "/login",
        "/account",
        "/some/unknown/route",
    ]:
        resp = client.get(route)
        assert resp.status_code == 200, route
        assert resp.text.startswith("SPA-ENTRY"), f"{route} did not serve the SPA entry"


def test_static_landing_files_are_served_as_files(client: TestClient) -> None:
    resp = client.get("/support.js")
    assert resp.status_code == 200
    assert "landing support" in resp.text


def test_missing_assets_404_honestly(client: TestClient) -> None:
    assert client.get("/assets/does-not-exist.js").status_code == 404
    assert client.get("/missing.css").status_code == 404


def test_api_paths_are_not_served_as_spa(client: TestClient) -> None:
    resp = client.get("/api/nonexistent")
    assert resp.status_code == 404
    assert resp.json()["detail"] == "Not found"
