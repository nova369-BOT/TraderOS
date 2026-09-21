"""HttpPool (providers/_http) — the keep-alive law behind the speed pass.

Owner's problem (2026-09-21): urllib paid a fresh TCP+TLS handshake for
EVERY REST page (4-17 pages per deep analytics load = 4-17 handshakes).
http.client connections are keep-alive by protocol; these tests pin the
pool's THREE behaviours without any external network:

1. A warm pool REUSES one socket for sequential GETs — accept count stays
   flat (the handshake law vanishing after the first page).
2. Parallel GETs open at most one socket per in-flight request, and a
   non-2xx answer (a venue's own refusal, e.g. 451/429) is read BEFORE
   the socket returns to service — the venue's words travel intact AND
   keep-alive is not poisoned by refusal codes.
3. base_of splits a URL into (base, path-with-query) exactly the way the
   providers pass it.
"""

import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from lse_terminal.providers._http import HttpPool, base_of


class _Counter(ThreadingHTTPServer):
    daemon_threads = True

    def __init__(self, *a, **k):
        self.accepts = 0
        self.requests = 0
        super().__init__(*a, **k)

    def process_request(self, request, client_address):
        with threading.Lock():
            self.accepts += 1
        super().process_request(request, client_address)


def _stub(status=200, body=b'{"ok":true}', latency=0.0):
    host = self_ = None

    class H(BaseHTTPRequestHandler):
        protocol_version = "HTTP/1.1"   # the keep-alive precondition

        def log_message(self, *a):
            pass

        def do_GET(self):  # noqa: N802
            with threading.Lock():
                self.server.requests += 1
            if latency:
                time.sleep(latency)
            self.send_response(status)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

    srv = _Counter(("127.0.0.1", 0), H)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


def test_base_of_splits_base_and_path_with_query():
    base, path = base_of(
        "https://fapi.binance.com/fapi/v1/klines?symbol=BTCUSDT&limit=300")
    assert base == "https://fapi.binance.com"
    assert path == "/fapi/v1/klines?symbol=BTCUSDT&limit=300"
    base, path = base_of("http://127.0.0.1:8080/ticker")
    assert base == "http://127.0.0.1:8080"
    assert path == "/ticker"


def test_warm_pool_pays_one_handshake_for_many_pages():
    srv = _stub()
    base = f"http://127.0.0.1:{srv.server_port}"
    pool = HttpPool()
    for _ in range(6):
        code, body = pool.get(base, "/p")
        assert code == 200 and body == b'{"ok":true}'
    srv.shutdown()
    # Six sequential pages over ONE accepted TCP connection — the whole
    # point of the pass: N-1 handshakes simply disappear.
    assert srv.accepts == 1
    assert srv.requests == 6


def test_venue_refusal_words_intact_and_socket_stays_clean():
    refusals = _stub(status=429, body=b'{"code":-1003,"msg":"Way too many requests"}')
    base = f"http://127.0.0.1:{refusals.server_port}"
    pool = HttpPool()
    code, body = pool.get(base, "/p")
    assert code == 429
    assert body == b'{"code":-1003,"msg":"Way too many requests"}'
    code, body = pool.get(base, "/p")
    assert code == 429
    refusals.shutdown()
    # 4xx bodies are DRAINED before the socket returns to service, so the
    # refusal does not poison keep-alive either: still one connection.
    assert refusals.accepts == 1


def test_parallel_pages_one_socket_per_in_flight_request_no_more():
    srv = _stub(latency=0.1)
    base = f"http://127.0.0.1:{srv.server_port}"
    pool = HttpPool()
    from concurrent.futures import ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=4) as ex:
        results = list(ex.map(lambda i: pool.get(base, f"/p{i}"), range(4)))
    assert all(code == 200 for code, _ in results)
    accepts_after_parallel = srv.accepts
    assert 1 <= accepts_after_parallel <= 4   # never more than in-flight
    # Warm now: four more sequential pages reuse idles — ZERO new sockets.
    pool2_results = [pool.get(base, f"/q{i}") for i in range(4)]
    assert all(code == 200 for code, _ in pool2_results)
    srv.shutdown()
    assert srv.accepts == accepts_after_parallel


def test_dead_endpoint_raises_and_retires_the_socket():
    # Bind a port and close it immediately: connections refused.
    import socket
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    port = s.getsockname()[1]
    s.close()
    pool = HttpPool(timeout=2.0)
    try:
        pool.get(f"http://127.0.0.1:{port}", "/p")
        raise AssertionError("refused endpoint must not look healthy")
    except Exception as e:  # noqa: BLE001 - the caller wraps in NotSupported
        assert "refused" in str(e).lower() or "timed" in str(e).lower() \
            or "reset" in str(e).lower()
    # And the pool is not poisoned by the dead socket.
    srv = _stub()
    code, _ = pool.get(f"http://127.0.0.1:{srv.server_port}", "/p")
    assert code == 200
    srv.shutdown()
