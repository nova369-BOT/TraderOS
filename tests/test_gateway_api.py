"""Gateway management API (/api/edgedepth/gateway/*) — Phase 3.

Deterministic on every machine: PATH is scrubbed so executable resolution
cannot find a real toolchain, and the happy path runs a Python stand-in
named exactly `edgedepth-gateway` (the name check is part of the contract).
The fake gateway is spawned by the engine itself through the management
routes, so spawn/adopt/stop/reap are covered through real HTTP.
"""

from __future__ import annotations

import os
import signal
import stat
import sys
import time
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from lse_terminal.engine.gateway import reset_supervisor_for_tests
from lse_terminal.engine.server import create_app

PORT = "127.0.0.1:18442"

FAKE_SERVE = f"""#!{sys.executable}
import http.server, sys
port = int(sys.argv[sys.argv.index('-addr') + 1].split(':')[-1])
class H(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        ok = 200 if self.path == '/healthz' else 404
        self.send_response(ok); self.end_headers(); self.wfile.write(b'ok\\n')
    def log_message(self, *a): pass
http.server.ThreadingHTTPServer(('127.0.0.1', port), H).serve_forever()
"""


@pytest.fixture()
def client(tmp_path, monkeypatch):
    monkeypatch.setenv("LSE_TERMINAL_CONFIG_DIR", str(tmp_path / "cfg"))
    monkeypatch.delenv("LSE_API_KEY", raising=False)
    monkeypatch.delenv("EDGEDEPTH_GATEWAY_URL", raising=False)
    monkeypatch.delenv("EDGEDEPTH_GATEWAY_BIN", raising=False)
    monkeypatch.setenv("EDGEDEPTH_GATEWAY_ADDR", PORT)
    monkeypatch.setenv("PATH", str(tmp_path / "empty-bin"))  # resolution scrub
    reset_supervisor_for_tests()
    c = TestClient(create_app(), base_url="http://127.0.0.1")
    yield c
    reset_supervisor_for_tests()


def _fake_exe(tmp_path: Path) -> Path:
    p = tmp_path / "edgedepth-gateway"
    p.write_text(FAKE_SERVE)
    p.chmod(p.stat().st_mode | stat.S_IEXEC)
    return p


def test_status_without_gateway_is_200_and_honest(client):
    r = client.get("/api/edgedepth/gateway/status")
    assert r.status_code == 200
    st = r.json()
    assert st["mode"] == "managed"
    assert st["state"] in ("STOPPED", "FAILED", "EXTERNAL")
    assert st["pid"] is None and st["healthz"] is False
    assert st["addr"] == PORT and st["url"].endswith("/ws")


def test_start_without_binary_is_409_with_actionable_reason(client):
    r = client.post("/api/edgedepth/gateway/start")
    assert r.status_code == 409
    msg = r.json()["detail"]
    assert "EDGEDEPTH_GATEWAY" in msg or "binary" in msg or "Go" in msg
    # and the state stays visible afterwards
    st = client.get("/api/edgedepth/gateway/status").json()
    assert st["state"] in ("STOPPED", "FAILED") and st["last_error"]


def test_stop_is_idempotent(client):
    r = client.post("/api/edgedepth/gateway/stop")
    assert r.status_code == 200 and r.json()["state"] in (
        "STOPPED", "EXTERNAL")


@pytest.mark.skipif(os.name == "nt", reason="POSIX process semantics")
def test_engine_spawns_stops_and_reaps_via_api(client, tmp_path, monkeypatch):
    exe = _fake_exe(tmp_path)
    monkeypatch.setenv("EDGEDEPTH_GATEWAY_BIN", str(exe))
    r = client.post("/api/edgedepth/gateway/start")
    assert r.status_code == 200, r.text
    st = r.json()
    assert st["state"] == "RUNNING" and st["healthz"] is True
    pid = st["pid"]
    assert pid and pid > 0
    # lifecycle artifacts live under the engine config dir
    cfg = Path(os.environ["LSE_TERMINAL_CONFIG_DIR"])
    assert (cfg / "edgedepth" / "gateway.pid.json").exists()
    assert (cfg / "edgedepth" / "gateway.log").exists()

    r = client.post("/api/edgedepth/gateway/stop")
    assert r.status_code == 200 and r.json()["state"] == "STOPPED"
    deadline = time.monotonic() + 5
    while time.monotonic() < deadline:
        try:
            os.kill(pid, 0)
            time.sleep(0.05)
        except OSError:
            break
    else:
        raise AssertionError("gateway pid still alive after stop")
    assert not (cfg / "edgedepth" / "gateway.pid.json").exists()


def test_external_mode_never_manages(client, monkeypatch):
    monkeypatch.setenv("EDGEDEPTH_GATEWAY_URL", "wss://gw.example/ws")
    st = client.get("/api/edgedepth/gateway/status").json()
    assert st["mode"] == "external" and st["url"] == "wss://gw.example/ws"
    r = client.post("/api/edgedepth/gateway/stop")
    assert r.status_code == 200
    assert r.json()["mode"] == "external"
