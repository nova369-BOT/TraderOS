"""Gateway lifecycle (Phase 3) — supervisor state machine over REAL child
processes, no Go toolchain and no network required: the children are small
Python stand-ins named exactly like the real binary (the name check is part
of the security contract, so the fakes respect it rather than bypass it).

Covers: resolution order and validation, spawn -> healthz poll -> RUNNING,
idempotent ensure, crash respawn bounded by the restart budget (no endless
restart loop), FAILED state semantics, busy-port refusal (foreign processes
are never killed), autostart=0, pid-file adoption across engine restarts,
graceful stop with reaping (no zombie / no orphan), external-URL mode, and
status JSON shape.
"""

from __future__ import annotations

import json
import os
import signal
import stat
import sys
import time
from pathlib import Path

import pytest

from lse_terminal.engine.gateway import (
    FAILED,
    GatewaySupervisor,
    GatewayUnavailable,
    RUNNING,
    STOPPED,
)

POSIX = os.name != "nt"
pytestmark = pytest.mark.skipif(
    not POSIX, reason="process-group semantics are POSIX-specific")

PORT = "127.0.0.1:18441"


def _env(**kw):
    env = {
        "EDGEDEPTH_GATEWAY_URL": "",
        "EDGEDEPTH_GATEWAY_BIN": kw.pop("BIN", ""),
        "EDGEDEPTH_GATEWAY_ADDR": kw.pop("ADDR", PORT),
        "EDGEDEPTH_GATEWAY_PATH": "/ws",
        "EDGEDEPTH_GATEWAY_AUTO": kw.pop("AUTO", "1"),
        "PATH": kw.pop("PATH", "/nonexistent-empty-path"),
    }
    env.update(kw)
    return env


# ── fake gateway children ──────────────────────────────────────────────────

FAKE_SERVE = """#!/usr/bin/env python3
import http.server, sys, time
port = int(sys.argv[sys.argv.index('-addr') + 1].split(':')[-1])
class H(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        ok = 200 if self.path == '/healthz' else 404
        self.send_response(ok); self.end_headers(); self.wfile.write(b'ok\\n')
    def log_message(self, *a): print('fakegw:', a[0] % a[1:], flush=True)
srv = http.server.ThreadingHTTPServer(('127.0.0.1', port), H)
print('fakegw: serving on', port, flush=True)
srv.serve_forever()
"""

FAKE_DIE_NOW = """#!/usr/bin/env python3
import sys
print('fakegw: crashing on purpose', file=sys.stderr)
sys.exit(3)
"""


def _make_exe(tmp_path: Path, body: str) -> Path:
    p = tmp_path / "edgedepth-gateway"          # the required name
    p.write_text(body)
    p.chmod(p.stat().st_mode | stat.S_IEXEC)
    return p


def _count_marker(tmp_path: Path) -> Path:
    return tmp_path / "spawns.txt"


def _wrap_with_marker(tmp_path: Path, body: str) -> str:
    marker = _count_marker(tmp_path)
    return ("#!/usr/bin/env python3\n"
            f"import pathlib; pathlib.Path({str(marker)!r}).open('a')"
            ".write('x')\n" + body.split("\n", 1)[1])


def sup(tmp_path, env=None):
    return GatewaySupervisor(root=tmp_path / "cfg",
                             env=env if env is not None else _env(),
                             allow_build=False)


def spawns(tmp_path: Path) -> int:
    m = _count_marker(tmp_path)
    return len(m.read_text()) if m.exists() else 0


def wait_state(s: GatewaySupervisor, want: str, timeout: float = 10.0):
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        if s.status()["state"] == want:
            return s.status()
        time.sleep(0.05)
    raise AssertionError(f"state never became {want}: {s.status()}")


# ── resolution & validation ────────────────────────────────────────────────

def test_external_url_disables_management(tmp_path):
    s = sup(tmp_path, _env(**{"EDGEDEPTH_GATEWAY_URL": "wss://gw.example/ws"}))
    assert s.mode() == "external"
    assert s.ws_url() == "wss://gw.example/ws"
    st = s.ensure_running()
    assert st["state"] == "EXTERNAL" and st["pid"] is None


def test_explicit_bad_bin_is_clear_and_retryable(tmp_path):
    s = sup(tmp_path, _env(BIN="/nope/not-a-gateway"))
    with pytest.raises(GatewayUnavailable) as ei:
        s.ensure_running()
    assert "EDGEDEPTH_GATEWAY_BIN" in str(ei.value)
    st = s.status()
    # pre-spawn failures must NOT park the supervisor in FAILED
    assert st["state"] == STOPPED and st["last_error"]


def test_wrong_named_executable_refused(tmp_path):
    bogus = tmp_path / "not-the-gateway"      # name check is the contract
    bogus.write_text(FAKE_SERVE)
    bogus.chmod(0o755)
    s = sup(tmp_path, _env(BIN=str(bogus)))
    with pytest.raises(GatewayUnavailable):
        s.ensure_running()


def test_missing_binary_reports_actionable_reason(tmp_path):
    s = sup(tmp_path)  # no binary via env/PATH; builds disabled for the test
    with pytest.raises(GatewayUnavailable) as ei:
        s.ensure_running()
    msg = str(ei.value)
    assert ("binary" in msg or "EDGEDEPTH_GATEWAY_BIN" in msg
            or "Go" in msg or "EDGEDEPTH_GATEWAY_URL" in msg)


# ── full lifecycle over a real child ───────────────────────────────────────

def test_start_health_stop_no_zombie_no_orphan(tmp_path):
    exe = _make_exe(tmp_path, _wrap_with_marker(tmp_path, FAKE_SERVE))
    s = sup(tmp_path, _env(BIN=str(exe)))
    st = s.ensure_running()
    assert st["state"] == RUNNING and st["healthz"] is True
    pid = st["pid"]
    assert pid and pid > 0
    assert (tmp_path / "cfg" / "gateway.pid.json").exists()
    assert st["exe"] == str(exe) and "EDGEDEPTH_GATEWAY_BIN" in st["exe_origin"]

    # idempotent: a second ensure reuses the process, no second spawn
    st2 = s.ensure_running()
    assert st2["pid"] == pid and spawns(tmp_path) == 1

    s.stop()
    st3 = s.status()
    assert st3["state"] == STOPPED and st3["pid"] is None
    assert not (tmp_path / "cfg" / "gateway.pid.json").exists()
    # reaped: the pid is gone from the process table (no zombie, no orphan)
    with pytest.raises(OSError):
        os.kill(pid, 0)


def test_crash_respawn_is_bounded_by_budget(tmp_path):
    exe = _make_exe(tmp_path, _wrap_with_marker(tmp_path, FAKE_SERVE))
    s = sup(tmp_path, _env(BIN=str(exe)))
    first = s.ensure_running()["pid"]
    os.kill(first, signal.SIGKILL)
    deadline = time.monotonic() + 5
    while time.monotonic() < deadline:
        try:
            os.kill(first, 0)
            time.sleep(0.05)
        except OSError:
            break
    second = s.ensure_running()["pid"]
    assert second != first
    assert spawns(tmp_path) == 2          # one bounded respawn, not a loop
    assert s.status()["state"] == RUNNING
    s.stop()


def test_crashloop_parks_FAILED_and_stops_spawning(tmp_path):
    exe = _make_exe(tmp_path, _wrap_with_marker(tmp_path, FAKE_DIE_NOW))
    s = sup(tmp_path, _env(BIN=str(exe)))
    for _ in range(3):                   # budget: 3 spawns / 120s window
        with pytest.raises(GatewayUnavailable):
            s.ensure_running()
    assert s.status()["state"] == FAILED
    with pytest.raises(GatewayUnavailable) as ei:
        s.ensure_running()
    assert "refusing to loop" in str(ei.value) or "restarted more than" in str(ei.value)
    assert spawns(tmp_path) == 3          # the 4th attempt spawned NOTHING


def test_busy_port_is_refused_not_hijacked(tmp_path):
    import socket
    holder = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    holder.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    host, _, port = PORT.rpartition(":")
    holder.bind((host, int(port)))
    holder.listen(1)
    try:
        exe = _make_exe(tmp_path, _wrap_with_marker(tmp_path, FAKE_SERVE))
        s = sup(tmp_path, _env(BIN=str(exe)))
        with pytest.raises(GatewayUnavailable) as ei:
            s.ensure_running()
        assert "occupied" in str(ei.value)
        # never spawned, never killed, never hijacked — just refused
        assert spawns(tmp_path) == 0
        assert holder.fileno() != -1
    finally:
        holder.close()


def test_autostart_disabled_is_an_explicit_error(tmp_path):
    exe = _make_exe(tmp_path, FAKE_SERVE)
    s = sup(tmp_path, _env(BIN=str(exe), AUTO="0"))
    with pytest.raises(GatewayUnavailable) as ei:
        s.ensure_running()
    assert "autostart" in str(ei.value)
    assert s.status()["state"] in (STOPPED, FAILED)


def test_adoption_across_engine_restart(tmp_path):
    exe = _make_exe(tmp_path, FAKE_SERVE)
    env = _env(BIN=str(exe))
    cfg = tmp_path / "cfg"
    a = GatewaySupervisor(root=cfg, env=env)
    pid = a.start()["pid"]
    # engine restarts: fresh supervisor, same config root + env
    b = GatewaySupervisor(root=cfg, env=env)
    st = b.ensure_running()
    assert st["state"] == RUNNING and st["adopted"] is True and st["pid"] == pid
    assert "adopted" in st["exe_origin"]
    b.stop()
    with pytest.raises(OSError):
        os.kill(pid, 0)                   # adopted child still stoppable: no orphan


def test_stale_pidfile_is_cleared_and_respawned(tmp_path):
    exe = _make_exe(tmp_path, _wrap_with_marker(tmp_path, FAKE_SERVE))
    cfg = tmp_path / "cfg"
    cfg.mkdir(parents=True)
    (cfg / "gateway.pid.json").write_text(json.dumps({
        "pid": 999998, "exe": str(exe), "addr": PORT, "started_at": 0}))
    s = GatewaySupervisor(root=cfg, env=_env(BIN=str(exe)))
    st = s.ensure_running()
    assert st["state"] == RUNNING and st["pid"] != 999998
    assert spawns(tmp_path) == 1
    s.stop()


def test_status_json_is_complete_and_serialisable(tmp_path):
    exe = _make_exe(tmp_path, FAKE_SERVE)
    s = sup(tmp_path, _env(BIN=str(exe)))
    st = s.ensure_running()
    json.dumps(st)                        # must round-trip for the API
    for key in ("state", "mode", "url", "addr", "path", "pid", "exe",
                "exe_origin", "adopted", "uptime_s", "restarts", "healthz",
                "last_error", "log_tail", "mirrors"):
        assert key in st, key
    assert st["url"] == f"ws://{PORT}/ws"
    s.stop()
