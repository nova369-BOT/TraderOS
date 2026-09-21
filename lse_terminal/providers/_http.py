"""
Keep-alive REST for the venues (owner's speed law, 2026-09-21).

urllib (what the providers used before) opens a fresh TCP+TLS handshake
for EVERY klines/aggTrades page — on real internet that's 100-300ms of
TLS per page, multiplied by 4-17 pages per deep load. http.client
connections are keep-alive by protocol; one pool per venue base host,
one connection per concurrent thread, and a venue's own error words
still travel intact (a 451 body is read before the connection is
returned to service; a 5xx or a dead socket retires it honestly).
"""

import http.client
import re
import ssl
import threading
from urllib.parse import urlsplit

_UA = "TraderOS/1.0 (+https://github.com/nova369-BOT/TraderOS)"


class HttpPool:
    """Idle-connection pool keyed by (scheme, host, port). Connections
    are handed out exclusively, so concurrent threads never share one —
    http.client is not thread-safe and no law pretends it is."""

    def __init__(self, max_idle_per_host: int = 4, timeout: float = 15.0):
        self._idle: dict = {}
        self._lock = threading.Lock()
        self._max_idles = max_idle_per_host
        self._timeout = timeout
        self._ctx = ssl.create_default_context()

    def acquire(self, base: str):
        u = urlsplit(base)
        port = u.port or (443 if u.scheme == "https" else 80)
        key = (u.scheme, u.hostname, port)
        with self._lock:
            stack = self._idle.setdefault(key, [])
            conn = stack.pop() if stack else None
        if conn is not None:
            return key, conn
        if u.scheme == "https":
            conn = http.client.HTTPSConnection(
                u.hostname, port, timeout=self._timeout, context=self._ctx)
        else:
            conn = http.client.HTTPConnection(u.hostname, port,
                                              timeout=self._timeout)
        return key, conn

    def release(self, key, conn, healthy: bool = True):
        if healthy:
            with self._lock:
                stack = self._idle.setdefault(key, [])
                if len(stack) < self._max_idles:
                    stack.append(conn)
                    return
        try:
            conn.close()
        except Exception:  # noqa: BLE001 - a dying socket has no words
            pass

    def get(self, base: str, path: str):
        """GET path on base; returns (status, body-bytes). A non-2xx
        body is read BEFORE the connection is reused (protocol-clean);
        a dead connection raises after being retired."""
        key, conn = self.acquire(base)
        try:
            conn.request("GET", path,
                         headers={"Accept": "application/json",
                                  "User-Agent": _UA})
            resp = conn.getresponse()
            body = resp.read()
        except Exception:
            self.release(key, conn, healthy=False)
            raise
        self.release(key, conn, healthy=resp.status < 500)
        return resp.status, body


def base_of(url: str) -> tuple:
    """"https://host.tld/fapi/v1/klines?x" -> ("https://host.tld",
    "/fapi/v1/klines?x")."""
    m = re.match(r"^(https?://[^/]+)(/.*)?$", url)
    return m.group(1), (m.group(2) or "/")
