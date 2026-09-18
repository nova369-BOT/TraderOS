"""EdgeDepth gateway lifecycle — the engine owns the actual Go process.

The gateway is the user's EdgeDepth infrastructure running as a child of the
terminal engine (docs/edgedepth-integration/). This supervisor gives LSE the
full lifecycle the integration requires:

    provider requested -> ensure_running() -> spawn -> /healthz poll -> serve
    engine shutdown    -> stop()            -> SIGTERM -> SIGKILL -> reap

Design rules, each mapped to a requirement:

- **External URL wins.** ``EDGEDEPTH_GATEWAY_URL`` (full ws:// URL) switches
  the supervisor to EXTERNAL mode: nothing is spawned and nothing is
  managed, matching the pre-existing behaviour of the provider.
- **No zombies, no orphans.** Every child is reaped with wait(); POSIX
  children are started in their own process group so SIGTERM reaches the
  whole tree. A pid file lets a restarted engine adopt a still-alive
  gateway it previously spawned (identified by pid + cmdline match);
  foreign processes are NEVER killed.
- **No endless restart loop.** ``ensure_running`` runs on a token budget
  (3 starts within 120 s, reset by 30 s of stable runtime). Exhausting the
  budget parks the supervisor in FAILED with the reason, from which only a
  successful stable run or an explicit ``start`` returns it.
- **Clear startup errors.** A failed spawn or a health-check timeout raises
  GatewayUnavailable carrying the log tail; the UI surfaces it verbatim.
- **Configurable.** Port, WS path, executable path (dev), autostart toggle.
- **Secure invocation.** The argv list is fixed; the executable must be
  named exactly ``edgedepth-gateway[{,.exe}]``. No shell, no string
  interpolation into commands, no user-controlled arguments.

Env knobs (all optional):
    EDGEDEPTH_GATEWAY_URL     full external ws(s) url -> EXTERNAL mode
    EDGEDEPTH_GATEWAY_BIN     explicit executable path (dev/admin)
    EDGEDEPTH_GATEWAY_ADDR    managed listen addr  (default 127.0.0.1:18081)
    EDGEDEPTH_GATEWAY_PATH    WS path              (default /ws)
    EDGEDEPTH_GATEWAY_AUTO    "0" -> never autostart (status says so)
    EDGEDEPTH_LOG             gateway log level (default info)
    BINANCE_REST/BINANCE_WS   passthrough mirror overrides (gateway flags)
"""

from __future__ import annotations

import collections
import errno
import json
import logging
import os
import shutil
import signal
import subprocess
import sys
import threading
import time
import urllib.request
from pathlib import Path

from lse_terminal.engine.config import config_dir

log = logging.getLogger("lse_terminal")

# ── states ──────────────────────────────────────────────────────────────────
STOPPED = "STOPPED"
STARTING = "STARTING"
RUNNING = "RUNNING"
STOPPING = "STOPPING"
FAILED = "FAILED"
EXTERNAL = "EXTERNAL"

# ── restart budget: no endless restart loop ─────────────────────────────────
_RESTART_WINDOW_S = 120.0
_RESTART_BUDGET = 3
_STABLE_RESET_S = 30.0

_STARTUP_TIMEOUT_S = 20.0
_HEALTH_TIMEOUT_S = 1.5
_STOP_TERM_TIMEOUT_S = 8.0

_EXE_STEMS = ("edgedepth-gateway",)
_LOG_TAIL_LINES = 400
_LOG_FILE_CAP_BYTES = 4 * 1024 * 1024


class GatewayUnavailable(Exception):
    """The gateway cannot be started / is not healthy; carries a reason the
    UI can show verbatim (error-state rule: name the actual cause)."""


def _is_windows() -> bool:
    return os.name == "nt"


def _exe_names() -> tuple:
    if _is_windows():
        return tuple(stem + ".exe" for stem in _EXE_STEMS) + _EXE_STEMS
    return _EXE_STEMS


class GatewaySupervisor:
    """Owns at most one gateway child per engine process.

    Injection seams for tests: every external effect (executable resolution,
    process spawn, health probe, clock) goes through a small method so the
    state machine is testable without real processes or sockets.
    """

    def __init__(self, root: Path | None = None, env: dict | None = None,
                 allow_build: bool = True):
        self._root = Path(root) if root else config_dir() / "edgedepth"
        self._env = env if env is not None else os.environ
        # Tests set this False so a machine that happens to have Go on PATH
        # never triggers a real build inside a unit test.
        self._allow_build = allow_build
        self._lock = threading.RLock()
        self._state = STOPPED
        self._proc: subprocess.Popen | None = None
        self._pid: int | None = None
        self._adopted = False
        self._exe: Path | None = None
        self._exe_origin = ""
        self._last_error = ""
        self._started_at = 0.0
        self._start_log: collections.deque = collections.deque(
            maxlen=_RESTART_BUDGET + 2)  # monotonic timestamps of spawns
        self._log_tail: collections.deque = collections.deque(
            maxlen=_LOG_TAIL_LINES)
        self._healthz = False
        self._healthz_ok_at = 0.0
        self._resolved_once = False
        self._env_overrides: dict = {}
        self._atexit_registered = False

    # ── configuration surface ────────────────────────────────────────────

    def external_url(self) -> str:
        return (self._env.get("EDGEDEPTH_GATEWAY_URL") or "").strip()

    def mode(self) -> str:
        return "external" if self.external_url() else "managed"

    def autostart(self) -> bool:
        return self._env.get("EDGEDEPTH_GATEWAY_AUTO", "1") not in ("0", "false", "no")

    def addr(self) -> str:
        return self._env.get("EDGEDEPTH_GATEWAY_ADDR", "127.0.0.1:18081").strip()

    def ws_path(self) -> str:
        p = self._env.get("EDGEDEPTH_GATEWAY_PATH", "/ws").strip()
        return p if p.startswith("/") else "/" + p

    def ws_url(self) -> str:
        ext = self.external_url()
        if ext:
            return ext
        return f"ws://{self.addr()}{self.ws_path()}"

    def http_base(self) -> str:
        """http(s) base of the gateway for health probes, derived from the
        effective ws(s) URL in either mode."""
        url = self.ws_url()
        if url.startswith("wss://"):
            return "https://" + url[len("wss://"):].split("/", 1)[0]
        if url.startswith("ws://"):
            return "http://" + url[len("ws://"):].split("/", 1)[0]
        return "http://" + self.addr()

    # ── dependency seams (overridable in tests) ──────────────────────────

    def _probe_healthz(self) -> bool:
        try:
            with urllib.request.urlopen(
                    self.http_base() + "/healthz",
                    timeout=_HEALTH_TIMEOUT_S) as resp:
                return resp.status == 200
        except Exception:
            return False

    _HEALTHZ_TTL_S = 10.0

    def _cached_healthz(self) -> bool | None:
        """True/False cached, None = cache cold (caller should probe)."""
        if not self._healthz:
            return None
        if time.monotonic() - self._healthz_ok_at < self._HEALTHZ_TTL_S:
            return True
        return None

    def _port_occupied(self) -> bool:
        """True when something answers on the managed addr. A plain probe:
        ownership is established via the pid file, never by taking over or
        killing a port's occupant."""
        import socket
        host, _, port = self.addr().rpartition(":")
        try:
            with socket.create_connection(
                    (host.lstrip("[") or "127.0.0.1", int(port)),
                    timeout=0.5):
                return True
        except OSError:
            return False

    def _spawn(self, argv: list, env: dict, out, err):
        kwargs = {}
        if _is_windows():
            kwargs["creationflags"] = getattr(
                subprocess, "CREATE_NO_WINDOW", 0)
        else:
            # Own process group: SIGTERM then reaches the whole tree and
            # stop() can never leak grandchildren.
            kwargs["start_new_session"] = True
        return subprocess.Popen(argv, stdout=out, stderr=err, env=env,
                                **kwargs)

    # ── executable resolution ────────────────────────────────────────────

    def _module_dir(self) -> Path:
        return (Path(__file__).resolve().parent.parent.parent
                / "services" / "edgedepth-gateway")

    def _validated_exe(self, path: Path, origin: str) -> Path | None:
        try:
            p = Path(path).expanduser().resolve()
        except OSError:
            return None
        if not p.is_file():
            return None
        if p.name.lower() not in tuple(n.lower() for n in _exe_names()):
            log.warning("edgedepth gateway binary name %r refused (want %s)",
                        p.name, _exe_names())
            return None
        return p

    def _resolve_executable(self) -> tuple[Path | None, str, str]:
        """EDGEDEPTH_GATEWAY_BIN -> PATH -> build from vendored source.
        Returns (path|None, origin, reason_if_none)."""
        explicit = (self._env.get("EDGEDEPTH_GATEWAY_BIN") or "").strip()
        if explicit:
            p = self._validated_exe(Path(explicit), "env")
            if p is not None:
                return p, "EDGEDEPTH_GATEWAY_BIN", ""
            return None, "", (f"EDGEDEPTH_GATEWAY_BIN={explicit!r} is not a "
                              f"valid edgedepth-gateway executable")
        on_path = shutil.which("edgedepth-gateway")
        if on_path:
            p = self._validated_exe(Path(on_path), "path")
            if p is not None:
                return p, "PATH", ""
        return self._build_from_source()

    def _go_toolchain(self) -> Path | None:
        go = shutil.which("go")
        if not go:
            return None
        try:
            out = subprocess.run(
                [go, "version"], capture_output=True, text=True, timeout=15)
        except (OSError, subprocess.SubprocessError):
            return None
        # "go version go1.24.13 linux/amd64" — gateway declares `go 1.24`.
        parts = out.stdout.split()
        ver = next((t for t in parts if t.startswith("go1.")), "")
        try:
            major_minor = tuple(
                int(x) for x in ver[2:].split(".")[:2])
        except ValueError:
            return None
        if major_minor < (1, 24):
            return None
        return Path(go)

    def _source_newer_than_binary(self, module: Path, binary: Path) -> bool:
        if not binary.exists():
            return True
        try:
            bin_mtime = binary.stat().st_mtime
        except OSError:
            return True
        newest = 0.0
        for p in module.rglob("*"):
            if p.is_file() and p.suffix in (".go", ".proto", ".mod", ".sum"):
                try:
                    newest = max(newest, p.stat().st_mtime)
                except OSError:
                    continue
        return newest > bin_mtime

    def _build_from_source(self) -> tuple[Path | None, str, str]:
        module = self._module_dir()
        if not self._allow_build:
            return None, "", ("gateway build disabled (allow_build=False); "
                              "no binary on PATH either")
        go = self._go_toolchain()
        if go is None:
            return None, "", (
                "no edgedepth-gateway binary on PATH and no Go >= 1.24 "
                "toolchain to build the vendored source at "
                f"{module} (set EDGEDEPTH_GATEWAY_BIN, install the gateway, "
                "install Go, or set EDGEDEPTH_GATEWAY_URL to an externally "
                "hosted gateway)")
        if not (module / "go.mod").is_file():
            return None, "", (f"vendored gateway source missing at {module}")
        suffix = ".exe" if _is_windows() else ""
        binary = self._root / "bin" / ("edgedepth-gateway" + suffix)
        if not self._source_newer_than_binary(module, binary):
            p = self._validated_exe(binary, "built")
            if p is not None:
                return p, "built from vendored source (cached)", ""
        binary.parent.mkdir(parents=True, exist_ok=True)
        cmd = [str(go), "build", "-trimpath", "-o", str(binary),
               "./cmd/edgedepth-gateway"]
        try:
            proc = subprocess.run(
                cmd, cwd=str(module), capture_output=True, text=True,
                timeout=600)
        except (OSError, subprocess.SubprocessError) as e:
            return None, "", f"gateway build failed to run: {e}"
        if proc.returncode != 0:
            tail = (proc.stderr or proc.stdout or "").strip()[-1200:]
            return None, "", f"gateway build failed (go build): {tail}"
        p = self._validated_exe(binary, "built")
        if p is None:
            return None, "", "gateway build produced no usable binary"
        return p, "built from vendored source", ""

    # ── pid-file adoption (survive engine restarts without orphans) ──────

    def _pid_file(self) -> Path:
        return self._root / "gateway.pid.json"

    def _write_pid_file(self) -> None:
        try:
            self._root.mkdir(parents=True, exist_ok=True)
            self._pid_file().write_text(json.dumps({
                "pid": self._pid, "exe": str(self._exe or ""),
                "addr": self.addr(), "started_at": self._started_at}))
        except OSError:
            pass

    def _clear_pid_file(self) -> None:
        try:
            self._pid_file().unlink(missing_ok=True)
        except OSError:
            pass

    def _pid_alive(self, pid: int) -> bool:
        try:
            if _is_windows():
                # os.kill(pid, 0) on Windows raises for dead pids only when
                # the handle cannot be opened; acceptable existence probe.
                os.kill(pid, 0)
                return True
            os.kill(pid, 0)
        except OSError as e:
            return e.errno == errno.EPERM
        return True

    def _pid_cmdline_matches(self, pid: int) -> bool:
        """The adopted child must BE our binary. cmdline check where the
        platform exposes it; otherwise healthz + exe-name is the bar (and
        stop() still never touches foreign pids: it only signals the pid
        recorded in our own pid file)."""
        want = (self._exe.name if self._exe else "").lower()
        if not want:
            return False
        try:
            if sys.platform.startswith("linux"):
                raw = Path(f"/proc/{pid}/cmdline").read_bytes()
                argv = raw.replace(b"\x00", b" ").decode("utf-8", "replace")
                return want in argv.lower()
            if sys.platform == "darwin":
                out = subprocess.run(
                    ["ps", "-p", str(pid), "-o", "command="],
                    capture_output=True, text=True, timeout=5)
                return want in (out.stdout or "").lower()
        except (OSError, subprocess.SubprocessError):
            return False
        # Windows and unknown platforms: pid file + /healthz must agree.
        return True

    def _try_adopt(self) -> bool:
        try:
            doc = json.loads(self._pid_file().read_text())
            pid = int(doc.get("pid") or 0)
        except (OSError, json.JSONDecodeError, ValueError):
            return False
        if pid <= 0 or not self._pid_alive(pid):
            self._clear_pid_file()
            return False
        if doc.get("addr") != self.addr():
            self._clear_pid_file()
            return False
        exe = self._validated_exe(Path(doc.get("exe") or ""), "pidfile")
        self._exe = exe
        if not self._pid_cmdline_matches(pid):
            self._clear_pid_file()
            return False
        if not self._probe_healthz():
            # Process matches our id but is not serving: stale is safer to
            # leave alone than to kill — clear and let a fresh spawn take
            # the port only if it is actually free.
            self._clear_pid_file()
            return False
        with self._lock:
            self._pid = pid
            self._adopted = True
            self._exe_origin = "adopted (previous engine run)"
            self._started_at = float(doc.get("started_at") or 0.0)
            self._started_monotonic = time.monotonic()
            self._state = RUNNING
            self._healthz = True
            self._healthz_ok_at = time.monotonic()
        log.info("edgedepth gateway adopted pid %d at %s", pid, self.addr())
        return True

    # ── log capture ──────────────────────────────────────────────────────

    def _log_path(self) -> Path:
        return self._root / "gateway.log"

    def _open_log_streams(self):
        try:
            self._root.mkdir(parents=True, exist_ok=True)
            path = self._log_path()
            if (path.exists()
                    and path.stat().st_size > _LOG_FILE_CAP_BYTES):
                path.unlink()
            fh = open(path, "ab", buffering=0)
            return subprocess.PIPE, subprocess.PIPE, fh
        except OSError:
            return subprocess.DEVNULL, subprocess.DEVNULL, None

    def _drain_pipe(self, stream, fh) -> None:
        try:
            for line in iter(stream.readline, b""):
                text = line.decode("utf-8", "replace").rstrip()
                self._log_tail.append(text)
                if fh is not None:
                    try:
                        fh.write(line if line.endswith(b"\n")
                                 else line + b"\n")
                    except OSError:
                        pass
        except (ValueError, OSError):
            pass
        finally:
            try:
                stream.close()
            except Exception:
                pass

    # ── restart budget ───────────────────────────────────────────────────

    def _budget_available(self) -> bool:
        now = time.monotonic()
        while (self._start_log
               and now - self._start_log[0] > _RESTART_WINDOW_S):
            self._start_log.popleft()
        return len(self._start_log) < _RESTART_BUDGET

    def _note_spawn(self) -> None:
        self._start_log.append(time.monotonic())

    def _spawned_once(self) -> bool:
        return len(self._start_log) > 0

    def _note_stable(self) -> None:
        with self._lock:
            self._start_log.clear()

    # ── lifecycle ────────────────────────────────────────────────────────

    def ensure_running(self) -> dict:
        """Idempotent: returns status when the gateway is up; raises
        GatewayUnavailable with a concrete reason when it cannot be brought
        up within the restart budget."""
        if self.mode() == "external":
            return self.status()
        with self._lock:
            if self._state == RUNNING and self._pid is not None:
                if self._proc is not None and self._proc.poll() is not None:
                    # child died between calls: adopt a clean slate below
                    self._reap_locked()
                elif self._cached_healthz() is True:
                    return self.status()
                elif self._probe_healthz():
                    self._healthz = True
                    self._healthz_ok_at = time.monotonic()
                    # a run stable past its window earns its budget back
                    if time.monotonic() - self._started_mono() > _STABLE_RESET_S:
                        self._start_log.clear()
                    return self.status()
                else:
                    self._healthz = False
                    # unhealthy but alive: do not kill mid-startup; report
                    return self.status()
            if self._state == FAILED and not self._budget_available():
                raise GatewayUnavailable(
                    self._last_error
                    or "edgedepth gateway is FAILED after repeated starts; "
                       "call start() to retry")
            # FAILED but a fresh window opened: bounded retries are allowed
            # again (at most _RESTART_BUDGET spawns per window, forever
            # throttled — never an unthrottled loop).
            if not self.autostart():
                raise GatewayUnavailable(
                    "edgedepth gateway autostart disabled "
                    "(EDGEDEPTH_GATEWAY_AUTO=0); start it via "
                    "/api/edgedepth/gateway/start or set EDGEDEPTH_GATEWAY_URL")
            if not self._budget_available():
                self._state = FAILED
                self._last_error = (
                    f"edgedepth gateway restarted more than {_RESTART_BUDGET} "
                    f"times within {int(_RESTART_WINDOW_S)}s; refusing to "
                    "loop (check the log tail, then call start() to retry)")
                raise GatewayUnavailable(self._last_error)
        return self.start()

    def _started_mono(self) -> float:
        return getattr(self, "_started_monotonic", 0.0)

    def start(self) -> dict:
        """Explicit start (also called by ensure_running). Raises
        GatewayUnavailable with the log tail / resolution reason."""
        if self.mode() == "external":
            return self.status()
        with self._lock:
            if self._state == RUNNING and self._pid is not None \
                    and (self._adopted or (self._proc is not None
                                           and self._proc.poll() is None)):
                return self.status()
            self._clear_transient_locked()
            self._state = STARTING
        try:
            if self._try_adopt():
                return self.status()
            exe, origin, reason = self._resolve_executable()
            if exe is None:
                raise GatewayUnavailable(reason or "no gateway executable")
            if self._port_occupied():
                raise GatewayUnavailable(
                    f"port {self.addr()} is occupied by another process and "
                    "nothing managed by this engine; refusing to take it over "
                    "(set EDGEDEPTH_GATEWAY_ADDR to a free address, or "
                    "EDGEDEPTH_GATEWAY_URL to the external gateway)")
            argv = [str(exe), "-addr", self.addr(), "-path", self.ws_path(),
                    "-log", self._env.get("EDGEDEPTH_LOG", "info")]
            out, err, fh = self._open_log_streams()
            env = dict(os.environ)
            env_overrides = self._env_overrides or {}
            env.update({k: v for k, v in env_overrides.items()
                        if v is not None})
            try:
                proc = self._spawn(argv, env, out, err)
            except OSError as e:
                self._close_fh(fh)
                raise GatewayUnavailable(f"gateway failed to spawn: {e}")
            with self._lock:
                self._proc = proc
                self._pid = proc.pid
                self._exe = exe
                self._exe_origin = origin
                self._adopted = False
                self._started_at = time.time()
                self._started_monotonic = time.monotonic()
                self._note_spawn()
            self._write_pid_file()
            if proc.stdout is not None:
                threading.Thread(target=self._drain_pipe,
                                 args=(proc.stdout, fh), daemon=True,
                                 name="edgedepth-gw-out").start()
            if proc.stderr is not None:
                threading.Thread(target=self._drain_pipe,
                                 args=(proc.stderr, fh), daemon=True,
                                 name="edgedepth-gw-err").start()
            if fh is not None:
                threading.Thread(target=self._close_fh_later,
                                 args=(fh, proc), daemon=True).start()
            deadline = time.monotonic() + _STARTUP_TIMEOUT_S
            while time.monotonic() < deadline:
                if proc.poll() is not None:
                    tail = self._log_tail_text(10)
                    self._reap()
                    raise GatewayUnavailable(
                        f"gateway exited during startup "
                        f"(code {proc.returncode}): {tail}")
                if self._probe_healthz():
                    with self._lock:
                        self._state = RUNNING
                        self._healthz = True
                        self._healthz_ok_at = time.monotonic()
                    log.info("edgedepth gateway up at %s (pid %d, %s)",
                             self.ws_url(), proc.pid, origin)
                    return self.status()
                time.sleep(0.15)
            # startup timeout: leave the process (it may still be loading
            # symbols), mark the failure clearly, and let the watchdog path
            # report; do not loop.
            raise GatewayUnavailable(
                f"gateway did not answer /healthz within "
                f"{int(_STARTUP_TIMEOUT_S)}s at {self.http_base()}")
        except GatewayUnavailable as e:
            with self._lock:
                self._last_error = str(e)
                if self._spawned_once():
                    # A real child died during/after startup: that class of
                    # failure is what the budget protects against. Park in
                    # FAILED only once the budget is gone; otherwise leave a
                    # retryable error and let the next ensure() retry.
                    self._state = (FAILED if not self._budget_available()
                                   else STOPPED)
                    if self._state == FAILED:
                        self._last_error = (
                            f"edgedepth gateway restarted more than "
                            f"{_RESTART_BUDGET} times within "
                            f"{int(_RESTART_WINDOW_S)}s; refusing to loop. "
                            f"Last failure: {e}")
                else:
                    # Pre-spawn failures (no binary, busy port, OS refuse)
                    # are terminal-looking but not loops: remain retryable.
                    self._state = STOPPED
            log.warning("edgedepth gateway start failed: %s", e)
            raise

    # ── stop ─────────────────────────────────────────────────────────────

    def stop(self) -> dict:
        """Graceful stop: SIGTERM (process group on POSIX) -> SIGKILL ->
        reap. Only ever signals our own pid (spawned or adopted via our pid
        file). Idempotent."""
        with self._lock:
            if self._state == EXTERNAL:
                return self.status()
            proc = self._proc
            pid = self._pid
            self._state = STOPPING if pid else STOPPED
        if proc is None and pid is None:
            self._clear_pid_file()
            with self._lock:
                self._state = STOPPED
                self._healthz = False
            return self.status()
        target_pid = proc.pid if proc is not None else pid
        try:
            if _is_windows():
                if proc is not None:
                    proc.terminate()
                else:
                    os.kill(target_pid, signal.SIGTERM)
            else:
                try:
                    os.killpg(os.getpgid(target_pid), signal.SIGTERM)
                except (ProcessLookupError, PermissionError):
                    pass
        except (ProcessLookupError, PermissionError, OSError):
            pass
        exited = self._wait_exit(proc, target_pid, _STOP_TERM_TIMEOUT_S)
        if not exited:
            try:
                if _is_windows():
                    if proc is not None:
                        proc.kill()
                    else:
                        os.kill(target_pid, getattr(signal, "SIGKILL",
                                                    signal.SIGTERM))
                else:
                    os.killpg(os.getpgid(target_pid), signal.SIGKILL)
            except (ProcessLookupError, PermissionError, OSError):
                pass
            self._wait_exit(proc, target_pid, 5.0)
        if proc is not None:
            try:
                proc.wait(timeout=5)
            except (subprocess.TimeoutExpired, OSError):
                pass
        self._clear_pid_file()
        with self._lock:
            self._proc = None
            self._pid = None
            self._adopted = False
            self._state = STOPPED
            self._healthz = False
        log.info("edgedepth gateway stopped%s",
                 " (forced)" if not exited else "")
        return self.status()

    def _wait_exit(self, proc, pid: int, timeout: float) -> bool:
        if proc is not None:
            try:
                proc.wait(timeout=timeout)
                return True
            except subprocess.TimeoutExpired:
                return False
            except OSError:
                return True
        deadline = time.monotonic() + timeout
        while time.monotonic() < deadline:
            if not self._pid_alive(pid):
                return True
            time.sleep(0.1)
        return not self._pid_alive(pid)

    # ── status ───────────────────────────────────────────────────────────

    def status(self) -> dict:
        with self._lock:
            state = EXTERNAL if self.mode() == "external" else self._state
            pid = self._pid
            exe = str(self._exe) if self._exe else None
            origin = self._exe_origin
            started = self._started_at
            adopted = self._adopted
            last_error = self._last_error
            healthz = self._healthz
        uptime = (time.time() - started) if (started and state == RUNNING) else 0
        if state == RUNNING and healthz:
            pass
        elif state == RUNNING:
            healthz = False
        if self.mode() == "external":
            healthz = self._probe_healthz()
        mirror = {
            "binance_rest": bool(os.environ.get("BINANCE_REST")),
            "binance_ws": bool(os.environ.get("BINANCE_WS")),
            "trade_stream": os.environ.get("BINANCE_TRADE_STREAM", "aggTrade"),
        }
        return {
            "state": state,
            "mode": self.mode(),
            "autostart": self.autostart() if self.mode() == "managed" else None,
            "url": self.ws_url(),
            "addr": self.addr(),
            "path": self.ws_path(),
            "pid": pid,
            "exe": exe,
            "exe_origin": origin,
            "adopted": adopted,
            "started_at": started or None,
            "uptime_s": round(uptime, 1),
            "restarts": len(self._start_log),
            "healthz": bool(healthz),
            "last_error": last_error,
            "log_tail": list(self._log_tail)[-20:],
            "mirrors": mirror,
        }

    # ── internals ────────────────────────────────────────────────────────

    def _clear_transient_locked(self) -> None:
        self._proc = None
        self._pid = None
        self._adopted = False
        self._healthz = False
        self._last_error = ""

    def _reap(self) -> None:
        with self._lock:
            self._reap_locked()

    def _reap_locked(self) -> None:
        proc, self._proc = self._proc, None
        self._pid = None
        if proc is not None:
            try:
                proc.wait(timeout=2)
            except (subprocess.TimeoutExpired, OSError):
                try:
                    proc.kill()
                except OSError:
                    pass
                try:
                    proc.wait(timeout=2)
                except (subprocess.TimeoutExpired, OSError):
                    pass

    def _log_tail_text(self, n: int) -> str:
        lines = list(self._log_tail)[-n:]
        return " | ".join(lines) if lines else "(no output)"

    @staticmethod
    def _close_fh(fh) -> None:
        try:
            if fh is not None:
                fh.close()
        except OSError:
            pass

    def _close_fh_later(self, fh, proc) -> None:
        try:
            proc.wait()
            self._close_fh(fh)
        except Exception:
            self._close_fh(fh)

    # test seam: environment-variable overrides handed to the child without
    # mutating os.environ (used by the fake-Binance e2e to point the gateway
    # at the local mirror).
    def set_child_env(self, overrides: dict) -> None:
        self._env_overrides = dict(overrides)


# ── module-level singleton (one gateway per engine process) ───────────────

_SUPERVISOR: GatewaySupervisor | None = None
_SUPERVISOR_LOCK = threading.Lock()


def supervisor() -> GatewaySupervisor:
    global _SUPERVISOR
    with _SUPERVISOR_LOCK:
        if _SUPERVISOR is None:
            _SUPERVISOR = GatewaySupervisor()
            import atexit
            atexit.register(_stop_quietly)
        return _SUPERVISOR


def _stop_quietly() -> None:
    try:
        if _SUPERVISOR is not None and _SUPERVISOR.mode() == "managed":
            _SUPERVISOR.stop()
    except Exception:
        pass


def reset_supervisor_for_tests() -> None:
    global _SUPERVISOR
    with _SUPERVISOR_LOCK:
        _SUPERVISOR = None
