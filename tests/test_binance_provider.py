"""Binance USD-M direct provider (D12) — protocol-pinned runtime behaviour.

Every assertion pins a documented Binance USD-M public-market-data
behaviour, mirroring the Coinbase suite's discipline: the combined-stream
envelope with URL-listed subscriptions (lowercase symbols — the venue
silently rejects uppercase), aggTrade side/maker semantics with agg-id
identity for dedupe, top-20 PARTIAL book frames (each complete — no patch
chain, so no sequencer), 1500-row klines paging with ms windows, venue
errors surfaced verbatim (429 stays 429), and the curated in-memory
catalog that defines this book (the D12 rule: nothing is downloaded to
answer /api/instruments). Sockets are fakes at the `_connect` seam (the
module's only socket touchpoint); REST is a real in-process HTTP server
so status codes are real. No external network anywhere.
"""

import asyncio
import json
import threading
import time
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs

import pytest

from lse_terminal.contracts import (
    DEPTH_SNAPSHOT,
    TRADE_BUY,
    TRADE_SELL,
    NotSupported,
)
from lse_terminal.providers import binance
from lse_terminal.providers.binance import (
    BinanceProvider,
    SYMBOLS,
    _iso_s,
)


# ── fake socket ------------------------------------------------------------

class FakeWS:
    """A Binance-shaped combined-stream wire: serves a scripted frame
    list, dies when told to (reconnect tests). Captures nothing upstream —
    Binance combined streams take no client frames at all."""

    def __init__(self, messages=(), die_after=False):
        self._messages = list(messages)
        self._die_after = die_after
        self.closed = False

    async def close(self):
        self.closed = True

    def __aiter__(self):
        return self

    async def __anext__(self):
        if self._messages:
            return self._messages.pop(0)
        if self._die_after:
            raise ConnectionError("venue dropped the socket")
        await asyncio.sleep(3600)         # an idle-but-alive socket


def _provider(ws, **kw):
    kw.setdefault("backoff_base", 0.001)
    p = BinanceProvider(**kw)
    sockets = [s for s in ws] if isinstance(ws, list) else [ws]
    sockets.reverse()
    p._dialed = []

    async def _connect(url):
        p._dialed.append(url)
        return sockets.pop()

    p._connect = _connect
    return p, sockets


def _agg(symbol="BTCUSDT", a=1001, p="42000.5", q="0.25", T=1686349175396,
         m=False):
    return json.dumps({"stream": f"{symbol.lower()}@aggTrade", "data": {
        "e": "aggTrade", "s": symbol, "a": a, "p": p, "q": q, "T": T,
        "m": m}})


def _depth(symbol="BTCUSDT", E=1686349175400, T=1686349175399,
           bids=(("42000.0", "1.5"), ("41999.5", "0.4")),
           asks=(("42001.0", "2.0"), ("42002.0", "0.9"))):
    # USD-M partial book frame: complete top-N per message, no "e" field.
    return json.dumps({"stream": f"{symbol.lower()}@depth20@100ms",
                       "data": {"lastUpdateId": 10, "E": E, "T": T,
                                "b": [list(x) for x in bids],
                                "a": [list(x) for x in asks]}})


def _take(ait, n, timeout=5.0):
    async def _go():
        out = []
        async for x in ait:
            out.append(x)
            if len(out) == n:
                return out
        return out
    return asyncio.run(asyncio.wait_for(_go(), timeout))


# ── catalog & contract ------------------------------------------------------

def test_catalog_is_the_curated_book_and_needs_no_network():
    p = BinanceProvider()
    rows = p.search("", 50)
    assert [r.symbol for r in rows] == list(SYMBOLS)      # 8 curated rows
    assert all(r.category == "Binance USD-M Futures" for r in rows)
    assert all(r.meta["live"] is True for r in rows)
    # The D12 law: this call touched no REST, no exchangeInfo, no prewarm.


def test_search_bare_base_and_case():
    p = BinanceProvider()
    assert [r.symbol for r in p.search("btc")] == ["BTCUSDT"]
    assert [r.symbol for r in p.search("tether", 3)]
    assert p.search("nope-nothing") == []


def test_timeframe_ladder_is_the_owner_locked_lse_shape():
    # Owner-locked (2026-09-19): the LSE-terminal ladder — tick and the
    # second rungs from the venue's own tape, then the natives; 4h STAYS
    # because it is native here (Coinbase, which lacks it, refuses it).
    p = BinanceProvider()
    assert p.timeframes == ["tick", "1s", "15s", "30s", "1m", "5m",
                            "15m", "30m", "1h", "4h", "1d", "1w"]


def test_rfc3339_ns_timestamp_helper():
    assert _iso_s("2023-06-09T20:19:35.39625135Z") == pytest.approx(
        _iso_s("2023-06-09T20:19:35.396251+00:00"), abs=0.001)


def test_eager_validation_unknown_symbol():
    p = BinanceProvider()
    with pytest.raises(ValueError):
        p.stream(["DOGEUSD"])          # the Coinbase spelling must NOT pass
    with pytest.raises(ValueError):
        p.candles("DOGEUSD", "1m")
    with pytest.raises(ValueError):
        p.candles("BTCUSDT", "90m")    # no such bar exists anywhere


def test_honest_no_depth_history_and_capabilities():
    p = BinanceProvider()
    with pytest.raises(NotSupported):
        p.depth_history("BTCUSDT", 0, 1)
    assert "depth_history" not in p.capabilities()
    assert p.configured() is True      # keyless public market data


# ── live ticks (aggTrade) ---------------------------------------------------

def test_aggtrade_normalizes_side_ts_id():
    ws = FakeWS([_agg(a=1, m=False, T=1686349175396),
                 _agg(a=2, m=True, T=1686349175400)])
    p, _ = _provider(ws)
    ticks = _take(p.stream(["BTCUSDT"]), 2)
    b, s = ticks
    assert b["symbol"] == "BTCUSDT" and b["side"] == TRADE_BUY
    assert s["side"] == TRADE_SELL          # buyer-maker => taker SOLD
    assert s["price"] == 0 or s["price"] > 0
    assert b["ts"] == pytest.approx(1686349175.396, abs=1e-3)
    assert b["trade_id"] == 1 and b["volume"] == 0.25


def test_aggregate_id_identity_dedupes_repeats():
    ws = FakeWS([_agg(a=42), _agg(a=42), _agg(a=43)])
    p, _ = _provider(ws)
    ticks = _take(p.stream(["BTCUSDT"]), 2)
    assert [t["trade_id"] for t in ticks] == [42, 43]


def test_ws_url_lists_streams_lowercase_and_combined():
    ws = FakeWS([])
    p, _ = _provider(ws)
    # give it a moment to dial, then close
    async def _go():
        it = p._pump(["BTCUSDT", "ETHUSDT"], want=("trade", "depth"))
        try:
            await asyncio.wait_for(it.__anext__(), 0.2)
        except (asyncio.TimeoutError, StopAsyncIteration):
            pass
        await it.aclose()
    asyncio.run(_go())
    url = p._dialed[0]
    assert url.count("btcusdt@aggTrade") == 1
    assert "ethusdt@aggTrade" in url
    assert "btcusdt@depth20@100ms" in url
    assert "BTCUSDT@" not in url            # venue rejects uppercase quietly


# ── live book (partial top-20: every frame complete) ------------------------

def test_partial_book_frames_are_full_snapshots_no_patch_chain():
    ws = FakeWS([_depth(E=1686349175400),
                 _depth(E=1686349175500, bids=(("1", "1"),),
                        asks=(("2", "2"),))])
    p, _ = _provider(ws)
    events = _take(p.depth_stream(["BTCUSDT"]), 2)
    a, b = events
    assert a.type == DEPTH_SNAPSHOT and b.type == DEPTH_SNAPSHOT
    # A later frame replaces wholesale — nothing from frame 1 survives
    # (there is no patch chain that could poison a book).
    assert b.bids == [(1.0, 1.0)] and b.asks == [(2.0, 2.0)]
    assert a.bids[0] == (42000.0, 1.5)      # sorted best-first
    assert a.ts == pytest.approx(1686349175.4, abs=1e-3)


def test_diag_stamps_land():
    ws = FakeWS([_agg(a=1)])
    p, _ = _provider(ws)
    _take(p.stream(["BTCUSDT"]), 1)
    ws2 = FakeWS([_depth()])
    p2, _ = _provider(ws2)
    _take(p2.depth_stream(["BTCUSDT"]), 1)
    health = binance._diag.health()["providers"].get("binance", {})
    by_kind = health.get("by_kind", {})
    assert by_kind.get("trade", {}).get("events_lifetime", 0) >= 1
    assert by_kind.get("book", {}).get("events_lifetime", 0) >= 1


def test_reconnect_redials_and_resubscribes_by_url():
    ws1 = FakeWS([_agg(a=1)], die_after=True)
    ws2 = FakeWS([_agg(a=2)])
    p, _ = _provider([ws1, ws2])
    ticks = _take(p.stream(["BTCUSDT"]), 2)
    assert [t["trade_id"] for t in ticks] == [1, 2]
    assert len(p._dialed) == 2              # reconnect = redial = resubscribe
    assert p._dialed[0] == p._dialed[1]


def test_unreachable_after_cap_is_an_honest_error():
    p = BinanceProvider(backoff_base=0.001)
    p.max_reconnects = 2

    async def _boom(url):
        raise OSError("no route")

    p._connect = _boom
    with pytest.raises(ConnectionError):
        _take(p.stream(["BTCUSDT"]), 1)


# ── candles (REST klines) -----------------------------------------------------

class _Klines:
    """In-process fapi stand-in: real HTTP (real status codes), records
    the query params, serves ascending klines from a seed."""

    def __init__(self, rows=None, status=200, body=None):
        self.rows = rows if rows is not None else []
        self.status = status
        self.body = body
        self.queries = []
        self.port = None
        self._httpd = None

    def __enter__(self):
        outer = self

        class H(BaseHTTPRequestHandler):
            def log_message(self, *a):
                pass

            def do_GET(self):
                u = urlparse(self.path)
                q = parse_qs(u.query)
                outer.queries.append(q)
                if outer.status != 200:
                    data = (outer.body or b'{"code":-1003,"msg":"Way too many requests"}')
                    self.send_response(outer.status)
                    data_out = data
                else:
                    # The REAL venue honors the ms window and limit: rows
                    # ascending from startTime, capped at `limit`.
                    lo = int(q["startTime"][0]); hi = int(q["endTime"][0])
                    lim = int(q["limit"][0])
                    page = [r for r in outer.rows if lo <= r[0] <= hi]
                    data_out = json.dumps(page[:lim]).encode()
                    self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Content-Length", str(len(data_out)))
                self.end_headers()
                self.wfile.write(data_out)

        self._httpd = HTTPServer(("127.0.0.1", 0), H)
        self.port = self._httpd.server_address[1]
        threading.Thread(target=self._httpd.serve_forever, daemon=True).start()
        return self

    def __exit__(self, *a):
        self._httpd.shutdown()


def _kline(i, tf_s=60, base=42000):
    t0 = 1686300000
    o = base + i
    return [int((t0 + i * tf_s) * 1000), str(o), str(o + 1),
            str(o - 1), str(o + 0.5), str(1.5), 0, "0", 0, "0", "0"]


def test_candles_klines_shape_windows_and_sort(monkeypatch):
    rows = [_kline(i) for i in range(10)]
    with _Klines(rows=rows) as k:
        monkeypatch.setattr(binance, "REST_BASE",
                            f"http://127.0.0.1:{k.port}")
        p = BinanceProvider()
        df = p.candles("BTCUSDT", "1m", 10, end=1686300000 + 10 * 60)
    assert list(df.columns) == ["ts", "open", "high", "low", "close",
                                "volume"]
    assert len(df) == 10
    assert df["ts"].is_monotonic_increasing
    assert df.attrs["venue"] == "binance"
    q = k.queries[0]
    assert q["symbol"] == ["BTCUSDT"] and q["interval"] == ["1m"]
    assert int(q["limit"][0]) == 10
    # windows are milliseconds on the wire
    assert len(q["startTime"][0]) == 13 and len(q["endTime"][0]) == 13


def test_candles_big_request_pages_at_1500_never_rejected(monkeypatch):
    rows = [_kline(i) for i in range(2000)]
    with _Klines(rows=rows) as k:
        monkeypatch.setattr(binance, "REST_BASE",
                            f"http://127.0.0.1:{k.port}")
        p = BinanceProvider()
        df = p.candles("BTCUSDT", "1m", 1600, end=1686300000 + 2000 * 60 - 60)
    assert len(df) == 1600                  # paged, merged, never an error
    assert len(k.queries) == 2              # 1500 + the 100-row remainder
    assert k.queries[0]["limit"] == ["1500"]
    assert k.queries[1]["limit"] == ["100"]
    # The second page asks strictly EARLIER than the first (backwards
    # pagination back to the seed).
    assert int(k.queries[1]["endTime"][0]) < int(k.queries[0]["startTime"][0])


def test_candles_iso_window_and_row_filter(monkeypatch):
    rows = [_kline(i) for i in range(5)]   # t0 = 2023-06-09T08:40:00Z
    with _Klines(rows=rows) as k:
        monkeypatch.setattr(binance, "REST_BASE",
                            f"http://127.0.0.1:{k.port}")
        p = BinanceProvider()
        df = p.candles("BTCUSDT", "1m", 500,
                       start="2023-06-09T08:41:00Z",
                       end=1686300000 + 5 * 60)
    assert 0 < len(df) <= 4
    assert all(df["ts"] >= 1686300060 - 60)


def test_candles_empty_answer_is_honest(monkeypatch):
    with _Klines(rows=[]) as k:
        monkeypatch.setattr(binance, "REST_BASE",
                            f"http://127.0.0.1:{k.port}")
        with pytest.raises(NotSupported):
            BinanceProvider().candles("BTCUSDT", "1m", 10)


def test_candles_429_surfaces_the_venue_status(monkeypatch):
    with _Klines(status=429) as k:
        monkeypatch.setattr(binance, "REST_BASE",
                            f"http://127.0.0.1:{k.port}")
        with pytest.raises(NotSupported) as ei:
            BinanceProvider().candles("BTCUSDT", "1m", 10)
    assert "429" in str(ei.value)
    assert "Way too many requests" in str(ei.value)   # the venue's words


# ── D14: the venue ladder (geo-blocked egress -> public data mirror) ---------

def test_geo_451_flips_rest_to_mirror_and_sticks(monkeypatch):
    rows = [_kline(i) for i in range(6)]
    with _Klines(status=451,
                 body=b'{"code":0,"msg":"Service unavailable from a restricted location"}') as geo, \
            _Klines(rows=rows) as mirror:
        monkeypatch.setattr(binance, "REST_BASE",
                            f"http://127.0.0.1:{geo.port}")
        monkeypatch.setattr(binance, "SPOT_REST_BASE",
                            f"http://127.0.0.1:{mirror.port}")
        p = BinanceProvider()
        df = p.candles("BTCUSDT", "1m", 6, end=1686300000 + 10 * 60)
        assert df.attrs["venue"] == "binance-spot"   # labelled for what it IS
        assert p.venue == "binance-spot"             # tick badge flips too
        assert len(df) == 6
        hits_after_first = len(geo.queries)
        # The winner is PINNED: a second frame never re-pays the dead hop.
        df2 = p.candles("BTCUSDT", "1m", 6, end=1686300000 + 10 * 60)
        assert len(geo.queries) == hits_after_first
        assert df2.attrs["venue"] == "binance-spot"


def test_tls_drop_flips_rest_to_mirror(monkeypatch):
    # A port nothing listens on = the sandbox/ISP TLS-drop shape.
    rows = [_kline(i) for i in range(12)]   # seed spans the request window
    with _Klines(rows=rows) as mirror:
        monkeypatch.setattr(binance, "REST_BASE", "http://127.0.0.1:9")
        monkeypatch.setattr(binance, "SPOT_REST_BASE",
                            f"http://127.0.0.1:{mirror.port}")
        p = BinanceProvider()
        df = p.candles("BTCUSDT", "1m", 4, end=1686300000 + 10 * 60)
    assert df.attrs["venue"] == "binance-spot"
    assert 0 < len(df) <= 4


def test_rate_limit_never_flips_the_ladder(monkeypatch):
    with _Klines(status=429) as geo, _Klines(rows=[_kline(0)]) as mirror:
        monkeypatch.setattr(binance, "REST_BASE",
                            f"http://127.0.0.1:{geo.port}")
        monkeypatch.setattr(binance, "SPOT_REST_BASE",
                            f"http://127.0.0.1:{mirror.port}")
        p = BinanceProvider()
        with pytest.raises(NotSupported) as ei:
            p.candles("BTCUSDT", "1m", 10, end=1686300000 + 10 * 60)
    assert "429" in str(ei.value)          # the venue's own words, unmasked
    assert p.venue == "binance"            # NO flip on a rate answer
    assert mirror.queries == []            # mirror never touched


def test_ws_dial_failure_flips_to_mirror_and_sticks():
    ws = FakeWS([_agg(a=7, T=1686349175396)])
    p = BinanceProvider(backoff_base=0.001)
    p._dialed = []

    async def _connect(url):
        p._dialed.append(url)
        if url.startswith("wss://dead"):
            raise OSError("TLS handshake dropped")
        return ws

    import lse_terminal.providers.binance as b
    old = b.WS_BASE, b.SPOT_WS_BASE
    b.WS_BASE, b.SPOT_WS_BASE = "wss://dead", "wss://mirror"
    try:
        p._connect = _connect
        ticks = _take(p.stream(["BTCUSDT"]), 1)
    finally:
        b.WS_BASE, b.SPOT_WS_BASE = old
    assert ticks[0]["trade_id"] == 7
    assert p._dialed[0].startswith("wss://dead")          # venue tried first
    assert p._dialed[1].startswith("wss://mirror")        # ladder moved on
    assert p._ws_rung == 1 and p.venue == "binance-spot"  # pinned + labelled


def test_spot_partial_book_frame_shape_reads_clean():
    # The mirror serves SPOT frames: no "s", no E/T — routing+ts degrade
    # to the stream name and receipt time, never to invented fields.
    frame = json.dumps({"stream": "btcusdt@depth20@100ms", "data": {
        "lastUpdateId": 99,
        "bids": [["42000.0", "1.0"]], "asks": [["42001.0", "2.0"]]}})
    ws = FakeWS([frame])
    p, _ = _provider(ws)
    events = _take(p.depth_stream(["BTCUSDT"]), 1)
    ev = events[0]
    assert ev.symbol == "BTCUSDT"               # from the stream name
    assert ev.type == DEPTH_SNAPSHOT
    assert ev.bids == [(42000.0, 1.0)] and ev.asks == [(42001.0, 2.0)]
    assert abs(ev.ts - time.time()) < 5         # receipt time, honestly


# ── LSE ladder: the menu and the tape (owner-locked 2026-09-19) --------------

def test_ladder_menu_matches_the_constant():
    assert BinanceProvider().timeframes == list(binance.LADDER)


def _tape_row(i, price, t_ms, qty="0.5"):
    return {"a": i, "p": str(price), "q": qty, "f": i, "l": i,
            "T": int(t_ms), "m": False}


class _Tape:
    """aggTrades stub at the HTTP seam, paging per the docs: startTime
    pages FORWARD, otherwise the newest rows with T <= endTime;
    <=1000 per page, ascending by agg id."""

    def __init__(self, rows=(), status=200, body=b"{}"):
        self.rows = list(rows)
        self.status = status
        self.body = body
        self.queries = []

    def __enter__(self):
        outer = self

        class H(BaseHTTPRequestHandler):
            def do_GET(self):  # noqa: N802
                q = parse_qs(urlparse(self.path).query)
                outer.queries.append(q)
                if outer.status != 200:
                    body = outer.body
                    self.send_response(outer.status)
                    self.send_header("Content-Length", str(len(body)))
                    self.end_headers()
                    self.wfile.write(body)
                    return
                lim = min(1000, int(q.get("limit", ["500"])[0]))
                st = q.get("startTime", [None])[0]
                et = q.get("endTime", [None])[0]
                rows = outer.rows
                if et is not None:
                    rows = [r for r in rows if r["T"] <= int(et)]
                if st is not None:
                    rows = [r for r in rows if r["T"] >= int(st)][:lim]
                else:
                    rows = rows[-lim:]
                body = json.dumps(rows).encode()
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)

            def log_message(self, *a):
                pass

        self._httpd = HTTPServer(("127.0.0.1", 0), H, )
        self.port = self._httpd.server_address[1]
        threading.Thread(target=self._httpd.serve_forever,
                         daemon=True).start()
        return self

    def __exit__(self, *a):
        self._httpd.shutdown()


def test_tape_tick_is_one_bar_per_print(monkeypatch):
    now_ms = int(time.time() * 1000)
    rows = [_tape_row(i + 1, 100 + i, now_ms - 5000 + i * 400) for i in range(5)]
    with _Tape(rows=rows) as k:
        monkeypatch.setattr(binance, "REST_BASE",
                            f"http://127.0.0.1:{k.port}")
        p = BinanceProvider()
        df = p.candles("BTCUSDT", "tick", 3)
    assert len(df) == 3                       # limit = newest 3 prints
    assert df["ts"].is_monotonic_increasing
    # tick bar: the print IS the candle — o=h=l=c, no invented spread
    assert (df["open"] == df["close"]).all()
    assert (df["high"] == df["low"]).all()
    assert df["open"].tolist() == [102.0, 103.0, 104.0]
    assert df.attrs["venue"] == "binance"
    q = k.queries[0]
    assert q["symbol"] == ["BTCUSDT"] and q["limit"] == ["1000"]
    assert len(q["endTime"][0]) == 13         # ms window on the wire


def test_tape_seconds_buckets_math_and_never_filled(monkeypatch):
    now_ms = int(time.time() * 1000)
    # three 15s buckets, with a GAP in the middle: prints at bucket edges
    # (anchored 90s into the past so no print is ever in the future)
    t0 = (now_ms // 15000) * 15000 - 90_000   # aligned bucket start
    rows = [_tape_row(1, 100, t0 + 1000), _tape_row(2, 102, t0 + 4000, "1.0"),
            _tape_row(3, 99, t0 + 31000), _tape_row(4, 101, t0 + 38000, "2.0")]
    with _Tape(rows=rows) as k:
        monkeypatch.setattr(binance, "REST_BASE",
                            f"http://127.0.0.1:{k.port}")
        df = BinanceProvider().candles("BTCUSDT", "15s", 50)
    assert len(df) == 2                       # the silent gap is NOT filled
    b0 = df.iloc[0]
    assert (b0["open"], b0["high"], b0["low"], b0["close"]) == \
        (100.0, 102.0, 100.0, 102.0)
    assert b0["volume"] == 1.5
    b1 = df.iloc[1]
    assert (b1["open"], b1["close"], b1["volume"]) == (99.0, 101.0, 2.5)
    assert int(b1["ts"]) - int(b0["ts"]) == 30   # two real buckets apart


def test_tape_pages_backward_until_short_page(monkeypatch):
    now_s = int(time.time())
    # 1500 prints, 1/s: page 1 (1000) is full -> page 2 (500) stops it
    rows = [_tape_row(i + 1, 100 + (i % 7), (now_s - 1500 + i) * 1000)
            for i in range(1500)]
    with _Tape(rows=rows) as k:
        monkeypatch.setattr(binance, "REST_BASE",
                            f"http://127.0.0.1:{k.port}")
        df = BinanceProvider().candles("BTCUSDT", "15s", 500)
    assert len(k.queries) == 2                # full page -> page back once
    assert int(k.queries[1]["endTime"][0]) < \
        int(k.queries[0]["endTime"][0])
    # 1500 consecutive seconds touch 100 or 101 aligned 15s buckets
    # (wall-clock alignment of the fixture is not pinned; the LAW is).
    assert len(df) in (100, 101)
    assert df["ts"].is_monotonic_increasing
    assert len(set(df["ts"])) == len(df)      # no duplicated buckets
    assert all(int(t) % 15 == 0 for t in df["ts"])   # aligned, real grid


def test_tape_start_window_filters_and_unreach_is_honest(monkeypatch):
    now_s = int(time.time())
    rows = [_tape_row(i + 1, 100, (now_s - 100 + i) * 1000) for i in range(100)]
    with _Tape(rows=rows) as k:
        monkeypatch.setattr(binance, "REST_BASE",
                            f"http://127.0.0.1:{k.port}")
        p = BinanceProvider()
        aligned = (now_s // 15) * 15 - 30    # bucket-true start
        df = p.candles("BTCUSDT", "15s", 50, start=aligned)
        assert all(df["ts"] >= aligned)
        assert len(df) >= 2
        # a window older than the whole tape is not invented
        with pytest.raises(NotSupported):
            p.candles("BTCUSDT", "15s", 50, start=now_s - 4000,
                      end=now_s - 3900)


def test_tape_geo_flip_shares_the_klines_ladder(monkeypatch):
    now_ms = int(time.time() * 1000)
    rows = [_tape_row(i + 1, 100 + i, now_ms - 3000 + i * 500) for i in range(4)]
    with _Tape(status=451,
               body=b'{"code":0,"msg":"restricted location"}') as geo, \
            _Tape(rows=rows) as mirror:
        monkeypatch.setattr(binance, "REST_BASE",
                            f"http://127.0.0.1:{geo.port}")
        monkeypatch.setattr(binance, "SPOT_REST_BASE",
                            f"http://127.0.0.1:{mirror.port}")
        p = BinanceProvider()
        df = p.candles("BTCUSDT", "tick", 10)
    assert len(df) == 4                        # one bar per print
    assert df.attrs["venue"] == "binance-spot"     # honest badge
    assert p.venue == "binance-spot"
    assert len(geo.queries) == 1 and len(mirror.queries) == 1


def test_tape_429_never_flips_and_keeps_the_venue_words(monkeypatch):
    now_ms = int(time.time() * 1000)
    rows = [_tape_row(1, 100, now_ms - 1000)]
    with _Tape(status=429, body=b'{"code":-1003,'
               b'"msg":"Way too many requests"}') as hot, \
            _Tape(rows=rows) as mirror:
        monkeypatch.setattr(binance, "REST_BASE",
                            f"http://127.0.0.1:{hot.port}")
        monkeypatch.setattr(binance, "SPOT_REST_BASE",
                            f"http://127.0.0.1:{mirror.port}")
        with pytest.raises(NotSupported) as ei:
            BinanceProvider().candles("BTCUSDT", "5s", 10)
        assert len(mirror.queries) == 0       # the ladder held its ground
    assert "429" in str(ei.value)
    assert "Way too many requests" in str(ei.value)


def test_tape_unsupported_timeframe_explains_the_ladder():
    p = BinanceProvider()
    with pytest.raises(ValueError, match="natives"):
        p.candles("BTCUSDT", "3w", 10)
    with pytest.raises(ValueError, match="<n>s"):
        p.candles("BTCUSDT", "90m", 10)


@pytest.mark.parametrize("tf,interval", [
    ("3m", "3m"), ("2h", "2h"), ("6h", "6h"), ("8h", "8h"),
    ("12h", "12h"), ("3d", "3d"), ("1w", "1w")])
def test_native_intervals_all_reach_the_venue(monkeypatch, tf, interval):
    tf_s = {"3m": 180, "2h": 7200, "6h": 21600, "8h": 28800,
            "12h": 43200, "3d": 259200, "1w": 604800}[tf]
    rows = [_kline(i, tf_s=tf_s) for i in range(4)]
    with _Klines(rows=rows) as k:
        monkeypatch.setattr(binance, "REST_BASE",
                            f"http://127.0.0.1:{k.port}")
        df = BinanceProvider().candles("BTCUSDT", tf, 4,
                                       end=1686300000 + 4 * tf_s)
    assert len(df) == 4
    assert k.queries[0]["interval"] == [interval]   # native, verbatim

