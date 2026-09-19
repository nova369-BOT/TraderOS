"""Protocol-faithful fake Coinbase Advanced Trade endpoint (test double).

Purpose: the Coinbase provider's runtime proof must not depend on network
access (which this sandbox does not have to the real venue). The double
implements exactly what the DOCUMENTED Coinbase shape looks like on the
wire — taken from the current docs, not reinvented:

- WS endpoint (docs: ``wss://advanced-trade-ws.coinbase.com``): text JSON
  frames; the venue sends NOTHING before a ``{"type":"subscribe",...}``
  frame, and only thereafter on the subscribed channel.
- Envelope: ``{channel, timestamp, sequence_num, events: [...]}`` with the
  timestamp as RFC3339-with-nanoseconds (as the docs print it).
- market_trades messages carry events[].trades[] =
  {trade_id, product_id, price, size, side, time}; level2 messages carry
  events[] with per-event product_id plus updates[]
  {price_level, new_quantity, event_time, side}, and the first level2
  event after a subscribe is a "snapshot".
- REST (public market data): ``GET /api/v3/brokerage/market/products/
  {id}/candles?start&end&granularity`` answering the documented payload:
  {"candles": [{start, high, low, open, close, volume}]}, NEWEST FIRST,
  capped at 300 rows per reply.

The double is a *scriptable mirror*, not an exchange: the harness decides
what trades/book levels exist and can arm a sequence gap or a socket drop
at will (e.g. ``arm_seq_gap(7)``). Threading mirrors fake_binance.py:
stdlib REST server in one thread, websockets.sync server in another.
"""

from __future__ import annotations

import itertools
import json
import threading
import time
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs

from websockets.sync.server import serve


def _ns_ts(t: float | None = None) -> str:
    """RFC3339 with nanosecond fraction, exactly the docs' print shape."""
    now = time.time() if t is None else t
    base = datetime.fromtimestamp(now, tz=timezone.utc)
    return base.strftime("%Y-%m-%dT%H:%M:%S.") + f"{int((now % 1) * 1e9):09d}Z"


# every documented granularity enum (June 2026 docs) — 4h/weekly absent
# because the venue itself has no such product
_GRAN_S = {"ONE_MINUTE": 60, "FIVE_MINUTE": 300, "FIFTEEN_MINUTE": 900,
           "THIRTY_MINUTE": 1800, "ONE_HOUR": 3600, "TWO_HOUR": 7200,
           "SIX_HOUR": 21600, "ONE_DAY": 86400}


class FakeCoinbase:
    def __init__(self, rest_port: int, ws_port: int):
        self.rest_url = f"http://127.0.0.1:{rest_port}"
        self.ws_url = f"ws://127.0.0.1:{ws_port}"
        self._rest_port = rest_port
        self._ws_port = ws_port
        self._lock = threading.Lock()
        # ── scriptable venue state ───────────────────────────────────────
        self.products = {"BTC-USD": {"price": 64112.50},
                         "ETH-USD": {"price": 1721.3}}
        self.book = {99.9: 1.5, 99.8: 2.0}          # bid price -> size
        self.book_asks = {100.1: 1.2, 100.2: 2.2}
        self.trade_ids = itertools.count(1)
        # Market-trades tape behind the REST /ticker route: docs' row
        # shape, oldest-first, capped — the venue serves <=220 newest.
        self.trades: list = []
        self._rest_srv = None
        self._ws_srv = None
        self._conns = set()
        self._subscribers: list = []                # (conn, channel, products)
        self._running = False
        self.seq_gap_at: int | None = None          # arm: jump seq to this

    # ── lifecycle ─────────────────────────────────────────────────────────

    def start(self) -> None:
        self._rest_srv = ThreadingHTTPServer(
            ("127.0.0.1", self._rest_port), self._rest_handler())
        threading.Thread(target=self._rest_srv.serve_forever,
                         daemon=True).start()
        self._ws_srv = serve(self._handle_ws, "127.0.0.1", self._ws_port)
        threading.Thread(target=self._ws_srv.serve_forever,
                         daemon=True).start()
        self._running = True
        threading.Thread(target=self._emitter_loop, daemon=True).start()

    def stop(self) -> None:
        self._running = False
        if self._rest_srv:
            self._rest_srv.shutdown()
        if self._ws_srv:
            self._ws_srv.shutdown()

    def record_trade(self, pid: str, price: float, size: str,
                     side: str, when: float | None = None) -> dict:
        """One print into the tape (docs' row shape). Emitter and scripts
        share this so REST /ticker and WS market_trades never disagree."""
        t = time.time() if when is None else when
        with self._lock:
            row = {"trade_id": f"{pid}-{next(self.trade_ids)}",
                   "product_id": pid, "price": f"{price:.2f}",
                   "size": size, "side": side, "time": _ns_ts(t)}
            self.trades.append(row)
            if len(self.trades) > 2_000:
                self.trades = self.trades[-2_000:]
        return row

    # ── REST (public market data) ─────────────────────────────────────────

    def _rest_handler(self):
        fake = self

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
                u = urlparse(self.path)
                if "/ticker" in u.path:
                    # Get Market Trades: {"trades": [...]} NEWEST first,
                    # documented cap 220 (limit param, default 10).
                    q = parse_qs(u.query)
                    lim = min(220, int(q.get("limit", ["10"])[0]))
                    pid = u.path.rsplit("/ticker", 1)[0].rsplit("/", 1)[-1]
                    with fake._lock:
                        rows = [t for t in reversed(fake.trades)
                                if t["product_id"] == pid][:lim]
                        st = fake.products.get(pid, {"price": 1.0})
                    self._json({"trades": rows,
                                "best_bid": f"{st['price'] * 0.9999:.2f}",
                                "best_ask": f"{st['price'] * 1.0001:.2f}"})
                    return
                if "/candles" in u.path:
                    q = parse_qs(u.query)
                    gran = q.get("granularity", ["ONE_MINUTE"])[0]
                    start = int(q.get("start", ["0"])[0])
                    end = int(q.get("end", ["0"])[0])
                    tf = _GRAN_S[gran]
                    product = u.path.rsplit("/candles", 1)[0].rsplit("/", 1)[-1]
                    price = fake.products.get(product, {"price": 1.0})["price"]
                    rows = []
                    t = end
                    # at most the documented 300 per reply
                    while t > start and len(rows) < 300:
                        rows.append({
                            "start": str(t // tf * tf), "open": f"{price:.2f}",
                            "high": f"{price * 1.001:.2f}",
                            "low": f"{price * 0.999:.2f}",
                            "close": f"{price:.2f}", "volume": "7.25"})
                        t -= tf
                    self._json({"candles": rows})   # newest first (docs)
                    return
                self._json({"error": "unknown"}, 404)

        return Handler

    # ── WS (public market data) ───────────────────────────────────────────

    def _handle_ws(self, conn) -> None:
        """One subscriber connection. Channels subscribe independently; the
        venue feeds each channel only after its own subscribe frame (docs)."""
        with self._lock:
            self._conns.add(conn)
        seq = {"level2": 100, "market_trades": 500}
        try:
            while True:
                raw = conn.recv()
                msg = json.loads(raw)
                if msg.get("type") != "subscribe":
                    continue
                channel = msg.get("channel")
                if channel == "heartbeats":
                    continue
                products = msg.get("product_ids") or []
                with self._lock:
                    self._subscribers.append((conn, channel, products))
                # level2's first answer is a snapshot (docs: guarantees the
                # sync start); a full transmitted book for each product.
                if channel == "level2":
                    with self._lock:
                        seq["level2"] += 1
                        s = seq["level2"]
                    for pid in products:
                        self._send_book_event(
                            conn, pid, "snapshot", s, first=True)
        except Exception:
            pass
        finally:
            with self._lock:
                self._conns.discard(conn)
                self._subscribers = [
                    s for s in self._subscribers if s[0] is not conn]

    def _send(self, conn, obj) -> None:
        try:
            conn.send(json.dumps(obj))
        except Exception:
            pass

    def _send_book_event(self, conn, pid, event_type, seq, first=False):
        with self._lock:
            bids = list(self.book.items())
            asks = list(self.book_asks.items())
        updates = ([{"price_level": f"{p}", "new_quantity": f"{s}",
                     "side": side, "event_time": _ns_ts()}
                    for p, s in bids
                    for side in ("bid",)]
                   + [{"price_level": f"{p}", "new_quantity": f"{s}",
                       "side": "offer", "event_time": _ns_ts()}
                      for p, s in asks])
        self._send(conn, {
            "channel": "level2", "timestamp": _ns_ts(), "sequence_num": seq,
            "events": [{"type": event_type, "product_id": pid,
                        "updates": updates}]})

    def _emitter_loop(self) -> None:
        """~4 Hz trade beats and ~1 Hz book deltas per subscribed product —
        enough to prove streaming, recency, and reconnect resume without
        flooding the test run."""
        delta_flip = False
        while self._running:
            time.sleep(0.25)
            with self._lock:
                subs = list(self._subscribers)
            for conn, channel, products in subs:
                for pid in products:
                    if channel == "market_trades":
                        with self._lock:
                            st = self.products.get(pid, {"price": 1.0})
                            price = st["price"]
                        row = self.record_trade(
                            pid, price, "0.0105",
                            "BUY" if int(time.time() * 2) % 2 else "SELL")
                        self._send(conn, {
                            "channel": "market_trades", "timestamp": _ns_ts(),
                            "sequence_num": int(time.time() * 4) % 1_000_000,
                            "events": [{"type": "update",
                                        "trades": [dict(row)]}]})
                    elif channel == "level2" and not delta_flip:
                        continue
                    elif channel == "level2":
                        with self._lock:
                            self._book_seq += 1
                            seq = self._book_seq
                            if self.seq_gap_at is not None:
                                seq = self.seq_gap_at
                                self._book_seq = seq
                                self.seq_gap_at = None
                        self._send(conn, {
                            "channel": "level2", "timestamp": _ns_ts(),
                            "sequence_num": seq,
                            "events": [{
                                "type": "update", "product_id": pid,
                                "updates": [{
                                    "price_level": "99.9",
                                    "new_quantity":
                                        "3.3" if delta_flip else "1.5",
                                    "side": "bid",
                                    "event_time": _ns_ts()}]}]})
            delta_flip = not delta_flip
        # end emitter

    _book_seq = 100

    def arm_seq_gap(self, jump_to: int = 900) -> None:
        with self._lock:
            self.seq_gap_at = jump_to

    def drop_connections(self) -> None:
        with self._lock:
            conns = list(self._conns)
        for c in conns:
            try:
                c.close()
            except Exception:
                pass
