"""Purpose: drive the TraderOS Binance surface against a DETERMINISTIC
venue double when the sandbox cannot reach (or must not depend on) the
real exchange. Speaks the USD-M public market-data wire:
/fapi/v1/klines + friends over HTTP, and combined-stream frames
{"stream", "data"} over WebSocket — routed into two client buckets
("market" for trade/ticker churn, "public" for depth-style traffic) so a
harness can schedule exact frames and swap contents over time.

No network, no credentials; used by the preview demo driver
(arena-workspace/serve_fakes.py) to exercise providers/binance.py
end-to-end. Anything this file serves that the REAL Binance would not
serve is a bug in this file."""

from __future__ import annotations

import json
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from websockets.sync.server import ServerConnection, serve


def _ms() -> int:
    return int(time.time() * 1000)


class FakeBinance:
    def __init__(self, rest_port: int, ws_port: int):
        self.rest_url = f"http://127.0.0.1:{rest_port}"
        self.ws_url = f"ws://127.0.0.1:{ws_port}"
        self._rest_port = rest_port
        self._ws_port = ws_port
        self._lock = threading.Lock()
        # ── scriptable upstream state ────────────────────────────────────
        self.depth_snapshot = {
            "lastUpdateId": 1000,
            "bids": [["99850.0", "1.5"], ["99800.0", "2.0"]],
            "asks": [["100150.0", "1.2"], ["100200.0", "2.2"]],
        }
        self.klines: list = []
        # aggTrades REST book: rows in the docs' shape, ascending by "a".
        self.agg_trades: list = []
        self.premium = {"markPrice": "100500.0", "lastFundingRate": "0.00010",
                        "nextFundingTime": _ms() + 28_800_000}
        self.open_interest = "25000.0"
        self.tickers_24h = [{
            "symbol": "BTCUSDT", "priceChangePercent": "1.50",
            "lastPrice": "100000.0", "quoteVolume": "100000000.0",
            "closeTime": _ms(),
        }]
        self.exchange_symbols = [{"symbol": "BTCUSDT", "status": "TRADING"}]
        # ── observability for assertions ─────────────────────────────────
        self.depth_rest_hits = 0
        self.klines_queries: list[dict] = []   # every klines REST query
        self.connects: list[str] = []     # "route?streams=..." per WS connect
        self._depth_clients: list[ServerConnection] = []
        self._market_clients: list[ServerConnection] = []
        self._stop = threading.Event()
        self._threads: list[threading.Thread] = []

    # ── lifecycle ────────────────────────────────────────────────────────

    def start(self) -> None:
        t_rest = threading.Thread(target=self._run_rest, daemon=True,
                                  name="fakebinance-rest")
        t_ws = threading.Thread(target=self._run_ws, daemon=True,
                                name="fakebinance-ws")
        self._threads = [t_rest, t_ws]
        t_rest.start()
        t_ws.start()
        deadline = time.monotonic() + 10
        while time.monotonic() < deadline:
            if (getattr(self, "_rest_up", False)
                    and getattr(self, "_ws_up", False)):
                return
            time.sleep(0.02)
        raise RuntimeError("fake binance failed to start")

    def stop(self) -> None:
        self._stop.set()
        try:
            self.drop_upstream_connections()
        except Exception:
            pass
        try:
            self._httpd.shutdown()
        except Exception:
            pass
        try:
            self._ws_server.shutdown()
        except Exception:
            pass

    # ── REST plane ───────────────────────────────────────────────────────

    def _run_rest(self) -> None:
        outer = self

        class Handler(BaseHTTPRequestHandler):
            def log_message(self, *args):
                pass

            def _json(self, obj, status=200):
                body = json.dumps(obj).encode()
                self.send_response(status)
                self.send_header("Content-Type", "application/json")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)

            def do_GET(self):
                from urllib.parse import parse_qs, urlparse
                u = urlparse(self.path)
                q = parse_qs(u.query)
                with outer._lock:
                    if u.path == "/fapi/v1/exchangeInfo":
                        return self._json({"symbols": outer.exchange_symbols})
                    if u.path == "/fapi/v1/depth":
                        outer.depth_rest_hits += 1
                        return self._json(outer.depth_snapshot)
                    if u.path == "/fapi/v1/klines":
                        # Docs law: rows ASCENDING by open time, first
                        # `limit` (<=1500) inside [startTime, endTime] ms.
                        outer.klines_queries.append(q)   # zero-weight law
                        lim = int(q.get("limit", ["500"])[0])
                        st = int(q.get("startTime", ["0"])[0])
                        et = int(q.get("endTime", ["99999999999999"])[0])
                        rows = [r for r in outer.klines
                                if st <= int(r[0]) <= et]
                        rows.sort(key=lambda r: int(r[0]))
                        return self._json(rows[:lim])
                    if u.path == "/fapi/v1/aggTrades":
                        # Docs: with startTime the page runs FORWARD from
                        # it; otherwise the latest <= endTime (default
                        # now); <=1000 rows per page, ascending by "a".
                        lim = min(1000, int(q.get("limit", ["500"])[0]))
                        st = q.get("startTime", [None])[0]
                        et = q.get("endTime", [None])[0]
                        rows = outer.agg_trades
                        if et is not None:
                            rows = [r for r in rows if r["T"] <= int(et)]
                        if st is not None:
                            rows = [r for r in rows if r["T"] >= int(st)]
                            rows = rows[:lim]          # forward from start
                        else:
                            rows = rows[-lim:]         # latest <= endTime
                        return self._json(rows)
                    if u.path == "/fapi/v1/premiumIndex":
                        return self._json(outer.premium)
                    if u.path == "/fapi/v1/openInterest":
                        return self._json({
                            "openInterest": outer.open_interest,
                            "time": _ms()})
                    if u.path == "/fapi/v1/ticker/24hr":
                        return self._json(outer.tickers_24h)
                return self._json({"code": -1, "msg": "not found"}, status=404)

        self._httpd = ThreadingHTTPServer(("127.0.0.1", self._rest_port),
                                          Handler)
        # Port 0 = OS assigns; report the truth so tests can point at it.
        self.rest_url = f"http://127.0.0.1:{self._httpd.server_address[1]}"
        self._rest_up = True
        self._httpd.serve_forever()

    # ── WS plane ─────────────────────────────────────────────────────────

    def _run_ws(self) -> None:
        self._ws_server = serve(self._handle_ws, "127.0.0.1", self._ws_port)
        self.ws_url = (f"ws://127.0.0.1:"
                       f"{self._ws_server.socket.getsockname()[1]}")
        self._ws_up = True
        self._ws_server.serve_forever()

    def _handle_ws(self, conn: ServerConnection) -> None:
        path = conn.request.path if conn.request else ""
        with self._lock:
            self.connects.append(path)
            if "/public/stream" in path:
                bucket = self._depth_clients
            else:
                bucket = self._market_clients
            bucket.append(conn)
        try:
            # Combined streams take no client messages upstream; just hold the
            # socket. Reading keeps control frames flowing (ping/pong).
            for _msg in conn:
                pass
        except Exception:
            pass
        finally:
            with self._lock:
                if conn in bucket:
                    bucket.remove(conn)

    def send_to_route(self, route: str, stream: str, data) -> None:
        """One combined-stream envelope to every live client on the route."""
        frame = json.dumps({"stream": stream, "data": data})
        with self._lock:
            clients = list(self._depth_clients if route == "public"
                           else self._market_clients)
        for c in clients:
            try:
                c.send(frame)
            except Exception:
                pass

    def send_depth_diff(self, U: int, u: int, pu: int,
                        bids=None, asks=None, ts: int | None = None) -> None:
        self.send_to_route("public", "btcusdt@depth@100ms", {
            "e": "depthUpdate", "E": ts or _ms(), "U": U, "u": u, "pu": pu,
            "b": bids or [], "a": asks or []})

    def send_kline(self, open_ms: int, o: str, h: str, l: str, c: str,
                   v: str, closed: bool, interval: str = "1m", n: int = 7,
                   E: int | None = None) -> None:
        """One venue-shaped kline frame (docs shape): x is the venue's
        own closed flag — callers pass it explicitly, it is never
        inferred here or downstream."""
        t = E or _ms()
        self.send_to_route("market", f"btcusdt@kline_{interval}", {
            "e": "kline", "E": t, "s": "BTCUSDT", "k": {
                "t": open_ms, "T": open_ms + 59_999, "s": "BTCUSDT",
                "i": interval, "f": 100, "L": 100 + n, "o": o, "c": c,
                "h": h, "l": l, "v": v, "n": n, "x": closed,
                "q": "7000.0", "V": "3.5", "Q": "3500.0", "B": "0"}})

    def send_trade(self, price: str, qty: str, agg_id: int, maker: bool,
                   ts: int | None = None) -> None:
        t = ts or _ms()
        with self._lock:
            self.agg_trades.append({"a": agg_id, "p": price, "q": qty,
                                    "f": agg_id, "l": agg_id, "T": t,
                                    "m": maker})
            if len(self.agg_trades) > 50_000:
                self.agg_trades = self.agg_trades[-50_000:]
        self.send_to_route("market", "btcusdt@aggTrade", {
            "e": "aggTrade", "E": t, "p": price, "q": qty,
            "T": t, "t": agg_id, "a": agg_id, "m": maker})

    def send_mark_price(self, mark: str, funding: str,
                        next_funding: int | None = None) -> None:
        self.send_to_route("market", "btcusdt@markPrice@1s", {
            "e": "markPriceUpdate", "E": _ms(), "p": mark, "r": funding,
            "T": next_funding or (_ms() + 28_800_000)})

    def send_liquidation(self, side: str, price: str, avg: str,
                         qty: str) -> None:
        self.send_to_route("market", "btcusdt@forceOrder", {
            "e": "forceOrder", "E": _ms(),
            "o": {"S": side, "p": price, "ap": avg, "q": qty}})

    def send_raw(self, route: str, obj) -> None:
        """Arbitrary (possibly malformed on purpose) combined envelope."""
        frame = obj if isinstance(obj, str) else json.dumps(obj)
        with self._lock:
            clients = list(self._depth_clients if route == "public"
                           else self._market_clients)
        for c in clients:
            try:
                c.send(frame)
            except Exception:
                pass

    def drop_upstream_connections(self) -> None:
        """Simulate a Binance outage: close every venue-facing socket."""
        with self._lock:
            clients = list(self._depth_clients) + list(self._market_clients)
        for c in clients:
            try:
                c.close()
            except Exception:
                pass

    def depth_connected(self, n=1) -> bool:
        with self._lock:
            return len(self._depth_clients) >= n

    def market_connected(self, n=1) -> bool:
        with self._lock:
            return len(self._market_clients) >= n


def wait_for(cond, timeout: float = 15.0, interval: float = 0.02,
             what: str = "condition"):
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        v = cond()
        if v:
            return v
        time.sleep(interval)
    raise AssertionError(f"timed out waiting for {what}")
