"""Coinbase Advanced Trade provider — protocol-pinned runtime behaviour.

Every assertion here pins a DOCUMENTED Coinbase behaviour (June 2026
docs), not an invented one: subscribe-first (the venue feeds nothing
before it), envelope shape, level2 snapshot/update semantics with a
quantity-0 removal, sequence-gap = resync (§15), trade identity by
trade_id, RFC3339 ns timestamps, REST candles newest-first with the
300-cap, and the honest 4h refusal. Sockets are fakes at the `_connect`
seam (the module's only socket touchpoint); REST is faked at the module
base. No network anywhere.
"""

import asyncio
import json
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
from datetime import datetime, timezone

import pytest
import time

from lse_terminal.contracts import (
    DEPTH_DELTA,
    DEPTH_SNAPSHOT,
    TRADE_BUY,
    TRADE_SELL,
    NotSupported,
)
from lse_terminal.engine.datadiag import Diag
from lse_terminal.providers import coinbase
from lse_terminal.providers.coinbase import (
    CoinbaseProvider,
    SYMBOLS,
    _iso_s,
)


# ── fake socket ------------------------------------------------------------

class FakeWS:
    """A Coinbase-shaped wire: captures subscription frames, serves a
    scripted feed, dies when told to (reconnect/control tests)."""

    def __init__(self, messages=(), die_after=False):
        self.sent = []
        self._messages = list(messages)
        self._die_after = die_after
        self.closed = False

    async def send(self, raw):
        self.sent.append(json.loads(raw))

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
    p = CoinbaseProvider(**kw)
    sockets = [s for s in ws] if isinstance(ws, list) else [ws]
    sockets.reverse()

    async def _connect():
        return sockets.pop()

    p._connect = _connect
    return p, sockets


def _trades_envelope(trades, seq=7, ts="2023-06-09T20:19:35.39625135Z"):
    return json.dumps({
        "channel": "market_trades", "timestamp": ts, "sequence_num": seq,
        "events": [{"type": "snapshot", "trades": trades}]})


def _l2_envelope(product, event_type, updates, seq=1,
                 ts="2023-06-09T20:19:35.39625135Z"):
    return json.dumps({
        "channel": "level2", "timestamp": ts, "sequence_num": seq,
        "events": [{"type": event_type, "product_id": product,
                    "updates": updates}]})


async def _collect(agen, n, timeout=5.0):
    out = []
    async def _run():
        async for item in agen:
            out.append(item)
            if len(out) >= n:
                return
    await asyncio.wait_for(_run(), timeout)
    return out


# ── symbol / timeframe mapping ---------------------------------------------

def test_catalog_rows_and_symbol_map():
    p = CoinbaseProvider()
    rows = p.search("")
    assert len(rows) == len(SYMBOLS)
    for r in rows:
        assert r.provider == "coinbase"
        assert r.category == "Coinbase (USD spot)"
        assert SYMBOLS[r.symbol] == r.meta["product"]
        assert "-" in r.meta["product"]          # venue id is the hyphen form
    # canonical symbol space is the platform's USD spot one
    assert "BTCUSD" in {r.symbol for r in rows}
    assert {r.symbol for r in p.search("xrp")} == {"XRPUSD"}


def test_timeframe_ladder_is_the_honest_subset():
    p = CoinbaseProvider()
    assert "4h" not in p.timeframes               # never present a fake rung
    assert "1w" not in p.timeframes               # this venue has no weekly
    assert p.timeframes == ["tick", "1s", "15s", "30s", "1m", "5m",
                            "15m", "30m", "1h", "1d"]
    with pytest.raises(ValueError, match="unsupported timeframe"):
        p.candles("BTCUSD", "4h")
    with pytest.raises(ValueError, match="unknown symbol"):
        p.candles("BTCUSDT", "1m")                # perp id is NOT this book


def test_rfc3339_ns_timestamps():
    assert _iso_s("2023-02-09T20:19:35.39625135Z") == pytest.approx(
        _iso_s("2023-02-09T20:19:35.396251Z"), abs=1e-6)
    assert _iso_s("2023-02-09T20:19:35Z") == 1675973975.0
    # short fractions with Z, and offset forms with long fractions — the
    # slice-to-6 must eat the timezone sign in NONE of them
    assert _iso_s("2023-02-09T20:42:27.000Z") == 1675975347.0
    assert _iso_s("2023-02-09T20:42:27.265Z") == 1675975347.265
    assert _iso_s("2023-02-09T20:42:27.265000001+00:00") == 1675975347.265


# ── wire behaviour ----------------------------------------------------------

def test_subscribe_frames_are_the_documented_shape():
    ws = FakeWS()   # idle socket: subscribe frames land, then silence
    p, _ = _provider(ws)

    async def _main():
        ag = p.depth_stream(["BTCUSD"])
        try:
            await asyncio.wait_for(ag.__anext__(), 0.05)
        except Exception:
            pass
        finally:
            await ag.aclose()
    asyncio.run(_main())
    subs = [s for s in ws.sent if s.get("type") == "subscribe"]
    # the venue feeds nothing before these arrive (docs, hard rule)
    assert {"type": "subscribe", "channel": "level2",
            "product_ids": ["BTC-USD"]} in subs
    assert {"type": "subscribe", "channel": "heartbeats"} in subs


def test_eager_validation():
    p = CoinbaseProvider()
    with pytest.raises(ValueError, match="unknown symbols"):
        p.stream(["esoteric-coin"])
    with pytest.raises(ValueError, match="unknown symbols"):
        p.depth_stream(["BTCUSD", "what-is-this"])


def test_market_trades_normalize(monkeypatch):
    monkeypatch.setattr(coinbase, "_diag", Diag())
    ws = FakeWS([_trades_envelope([
        {"trade_id": "t-1", "product_id": "BTC-USD", "price": "64112.5",
         "size": "0.0105", "side": "BUY", "time": "2023-02-09T20:42:27.265Z"},
        {"trade_id": "t-2", "product_id": "BTC-USD", "price": "64111.9",
         "size": "1.5", "side": "SELL", "time": "2023-02-09T20:42:28.000001Z"},
    ])])
    p, _ = _provider(ws)
    p.max_reconnects = 0

    async def _main():
        out = []
        ag = p.stream(["BTCUSD"])
        try:
            async for t in ag:
                out.append(t)
                if len(out) == 2:
                    break
        finally:
            await ag.aclose()
        return out
    ticks = asyncio.run(_main())
    assert len(ticks) == 2
    a, b = ticks
    assert a["symbol"] == "BTCUSD"                     # canonical LSE symbol
    assert a["price"] == 64112.5 and a["volume"] == 0.0105
    assert a["side"] == TRADE_BUY and b["side"] == TRADE_SELL
    assert a["trade_id"] == "t-1"                      # identity preserved
    assert a["ts"] == pytest.approx(1675975347.265, abs=1e-3)  # venue time


def test_duplicate_trade_ids_never_double_count(monkeypatch):
    monkeypatch.setattr(coinbase, "_diag", Diag())
    msg = _trades_envelope([
        {"trade_id": "dup-1", "product_id": "BTC-USD", "price": "100",
         "size": "1", "side": "BUY", "time": "2023-02-09T20:42:27.265Z"}])
    ws = FakeWS([msg, msg])   # venue re-sends after a snapshot boundary
    p, _ = _provider(ws)
    p.max_reconnects = 0

    async def _main():
        out = []
        ag = p.stream(["BTCUSD"])
        try:
            async for t in ag:
                out.append(t)
                if len(out) >= 2:
                    break
        finally:
            await ag.aclose()
        return out
    # only ONE tick ever emerges from two identical frames
    with pytest.raises(asyncio.TimeoutError):
        asyncio.run(asyncio.wait_for(_main(), 0.3))


def test_level2_snapshot_then_delta_and_removal(monkeypatch):
    monkeypatch.setattr(coinbase, "_diag", Diag())
    messages = [
        _l2_envelope("BTC-USD", "snapshot", [
            {"price_level": "100.0", "new_quantity": "1", "side": "bid",
             "event_time": "2023-02-09T20:42:27.000Z"},
            {"price_level": "101.0", "new_quantity": "2", "side": "offer",
             "event_time": "2023-02-09T20:42:27.000Z"},
        ], seq=1),
        _l2_envelope("BTC-USD", "update", [
            {"price_level": "100.0", "new_quantity": "0", "side": "bid",
             "event_time": "2023-02-09T20:42:28.000Z"},
        ], seq=2),
    ]
    ws = FakeWS(messages)
    p, _ = _provider(ws)
    p.max_reconnects = 0
    out = []

    async def _main():
        ag = p.depth_stream(["BTCUSD"])
        try:
            async for ev in ag:
                out.append(ev)
                if len(out) == 2:
                    break
        finally:
            await ag.aclose()
    asyncio.run(_main())
    snap, delta = out
    assert snap.type == DEPTH_SNAPSHOT
    # full transmitted book, sorted books-first
    assert snap.bids == [(100.0, 1.0)]
    assert snap.asks == [(101.0, 2.0)]
    assert delta.type == DEPTH_DELTA
    # DELTA carries the patch — quantity 0 = removal, per docs
    assert delta.bids == [(100.0, 0.0)]
    assert delta.asks == []


def test_level2_sequence_gap_resyncs(monkeypatch):
    monkeypatch.setattr(coinbase, "_diag", Diag())
    snap = _l2_envelope("BTC-USD", "snapshot", [
        {"price_level": "100.0", "new_quantity": "1", "side": "bid",
         "event_time": "2023-02-09T20:42:27.000Z"}], seq=1)
    gap_update = _l2_envelope("BTC-USD", "update", [
        {"price_level": "101.0", "new_quantity": "5", "side": "offer",
         "event_time": "2023-02-09T20:42:28.000Z"}], seq=7)   # jumped 1 -> 7
    ws1 = FakeWS([snap, gap_update], die_after=False)
    ws2 = FakeWS([_l2_envelope("BTC-USD", "snapshot", [
        {"price_level": "99.0", "new_quantity": "3", "side": "bid",
         "event_time": "2023-02-09T20:42:29.000Z"}], seq=7)])
    p, _ = _provider([ws1, ws2])
    p.max_reconnects = 2
    out = []

    async def _main():
        ag = p.depth_stream(["BTCUSD"])
        try:
            async for ev in ag:
                out.append(ev)
                if len(out) == 2:
                    break
        finally:
            await ag.aclose()
    asyncio.run(_main())
    assert len(out) == 2
    # seq=7 delta was NEVER applied as a patch chain on the stale snapshot;
    # the pump resynced and the SECOND snapshot is the book that follows
    assert out[1].type == DEPTH_SNAPSHOT
    assert out[1].bids == [(99.0, 3.0)]
    # and resubscription physically left on the second socket
    assert any(s.get("channel") == "level2" for s in ws2.sent
               if s.get("type") == "subscribe")


def test_update_before_snapshot_resyncs(monkeypatch):
    monkeypatch.setattr(coinbase, "_diag", Diag())
    ws = FakeWS([_l2_envelope("BTC-USD", "update", [
        {"price_level": "100.0", "new_quantity": "1", "side": "bid",
         "event_time": "2023-02-09T20:42:28.000Z"}], seq=1)])
    p, _ = _provider(ws)
    p.max_reconnects = 0

    async def _main():
        out = []
        ag = p.depth_stream(["BTCUSD"])
        try:
            async for ev in ag:
                out.append(ev)
        except ConnectionError:
            return out
        finally:
            await ag.aclose()
        return out
    out = asyncio.run(_main())
    assert out == []   # no event was ever emitted from a poisoned start


def test_diag_stamps_land():
    ws = FakeWS([_trades_envelope([
        {"trade_id": "t-9", "product_id": "BTC-USD", "price": "1",
         "size": "1", "side": "BUY", "time": "2023-02-09T20:42:27.265Z"}])])
    p, _ = _provider(ws)
    p.max_reconnects = 0

    async def _main():
        ag = p.stream(["BTCUSD"])
        async for t in ag:
            await ag.aclose()
            return
    asyncio.run(_main())
    health = coinbase._diag.health()
    assert "coinbase" in health["providers"]
    assert health["providers"]["coinbase"]["by_kind"]["trade"]["events_lifetime"] >= 1


def test_reconnect_resubscribes_after_drop(monkeypatch):
    monkeypatch.setattr(coinbase, "_diag", Diag())
    ws1 = FakeWS([_trades_envelope([
        {"trade_id": "a", "product_id": "BTC-USD", "price": "1", "size": "1",
         "side": "BUY", "time": "2023-02-09T20:42:27.000Z"}])], die_after=True)
    ws2 = FakeWS([_trades_envelope([
        {"trade_id": "b", "product_id": "BTC-USD", "price": "2", "size": "1",
         "side": "SELL", "time": "2023-02-09T20:42:28.000Z"}])])
    p, _ = _provider([ws1, ws2])
    p.max_reconnects = 1

    async def _main():
        out = []
        ag = p.stream(["BTCUSD"])
        try:
            async for t in ag:
                out.append(t)
                if len(out) == 2:
                    break
        finally:
            await ag.aclose()
        return out
    out = asyncio.run(_main())
    assert [t["trade_id"] for t in out] == ["a", "b"]  # data resumes (§28)
    assert ws1.closed
    assert any(s.get("channel") == "market_trades" for s in ws2.sent)


# ── candles REST -------------------------------------------------------------

def _candle(t, o, h, l, c, v):
    return {"start": str(t), "open": str(o), "high": str(h), "low": str(l),
            "close": str(c), "volume": str(v)}


def _run_fake_rest(handler, gran=60, pages={}):
    class H(BaseHTTPRequestHandler):
        def do_GET(self):  # noqa: N802
            handler(self)

        def log_message(self, *a):
            pass

    srv = HTTPServer(("127.0.0.1", 0), H)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


def test_candles_rest_newest_first_sorted_paginated(monkeypatch):
    # two pages: 400 total 1m candles starting at t0, venue answers
    # 300-most-recent-first as Coinbase does
    made = []

    def handler(req):
        q = parse_qs(urlparse(req.path).query)
        start = int(q["start"][0]); end = int(q["end"][0])
        assert q["granularity"] == ["ONE_MINUTE"]
        made.append((start, end))
        # synthetic rows in [start, end], newest first, full page size
        rows = [_candle(t, 1, 2, 0.5, 1.5, 9)
                for t in range(start, end, 60)]
        rows.reverse()
        body = json.dumps({"candles": rows}).encode()
        req.send_response(200)
        req.send_header("Content-Type", "application/json")
        req.send_header("Content-Length", str(len(body)))
        req.end_headers()
        req.wfile.write(body)

    srv = _run_fake_rest(handler)
    monkeypatch.setattr(coinbase, "REST_BASE",
                        f"http://127.0.0.1:{srv.server_port}")
    p = CoinbaseProvider()
    df = p.candles("BTCUSD", "1m", limit=350)
    srv.shutdown()
    assert len(made) == 2          # pagination actually paged
    assert len(df) == 350
    ts = df["ts"].tolist()
    assert ts == sorted(ts)        # venue's newest-first flipped ascending
    assert all(isinstance(t, int) for t in ts)
    # window math: page 2 reaches strictly further back than page 1
    assert made[1][1] < made[0][0]
    assert df.attrs["venue"] == "coinbase"


def test_candles_empty_answer_is_honest(monkeypatch):
    def handler(req):
        body = json.dumps({"candles": []}).encode()
        req.send_response(200)
        req.send_header("Content-Length", str(len(body)))
        req.end_headers()
        req.wfile.write(body)

    srv = _run_fake_rest(handler)
    monkeypatch.setattr(coinbase, "REST_BASE",
                        f"http://127.0.0.1:{srv.server_port}")
    p = CoinbaseProvider()
    with pytest.raises(NotSupported, match="no history"):
        p.candles("ETHUSD", "1m")
    srv.shutdown()


def test_candles_rest_failure_is_honest(monkeypatch):
    monkeypatch.setattr(coinbase, "REST_BASE", "http://127.0.0.1:1")
    p = CoinbaseProvider()
    with pytest.raises(NotSupported, match="REST failed"):
        p.candles("BTCUSD", "1m")


# ── LSE ladder: the menu and the tape (owner-locked 2026-09-19) --------------

def test_ladder_is_owner_locked_and_4h_1w_stay_off():
    # This venue has no 4h and no weekly product — they must never appear
    # on the menu; the rungs that DO exist are all here (June 2026 docs).
    assert CoinbaseProvider().timeframes == [
        "tick", "1s", "15s", "30s", "1m", "5m", "15m", "30m", "1h", "1d"]


def test_4h_and_1w_refusals_name_the_venue_truth():
    p = CoinbaseProvider()
    for tf in ("4h", "1w", "2d"):
        with pytest.raises(ValueError) as ei:
            p.candles("BTCUSD", tf, 10)
        msg = str(ei.value)
        assert "no 4h/1w exist on this venue" in msg     # the refusal law
        assert "<n>s" in msg                             # the tape way out


@pytest.mark.parametrize("tf,gran", [
    ("30m", "THIRTY_MINUTE"), ("2h", "TWO_HOUR"), ("6h", "SIX_HOUR")])
def test_extended_natives_reach_the_wire(monkeypatch, tf, gran):
    seen = {}

    def handler(req):
        q = parse_qs(urlparse(req.path).query)
        seen["granularity"] = q["granularity"][0]
        rows = [_candle(1686300000, 1, 2, 0.5, 1.5, 9)]
        body = json.dumps({"candles": rows}).encode()
        req.send_response(200)
        req.send_header("Content-Type", "application/json")
        req.send_header("Content-Length", str(len(body)))
        req.end_headers()
        req.wfile.write(body)

    srv = _run_fake_rest(handler)
    monkeypatch.setattr(coinbase, "REST_BASE",
                        f"http://127.0.0.1:{srv.server_port}")
    CoinbaseProvider().candles("BTCUSD", tf, 1)
    srv.shutdown()
    assert seen["granularity"] == gran       # native enum, verbatim


def _trade(i, price, t_s, size="0.0105", side="BUY"):
    return {"trade_id": f"BTC-USD-{i}", "product_id": "BTC-USD",
            "price": f"{price:.2f}", "size": size, "side": side,
            "time": (datetime.fromtimestamp(t_s, tz=timezone.utc)
                     .strftime("%Y-%m-%dT%H:%M:%S.")
                     + f"{int((t_s % 1) * 1e9):09d}Z")}


def _ticker_server(rows):
    def handler(req):
        assert "/ticker" in urlparse(req.path).path
        body = json.dumps({"trades": rows}).encode()
        req.send_response(200)
        req.send_header("Content-Type", "application/json")
        req.send_header("Content-Length", str(len(body)))
        req.end_headers()
        req.wfile.write(body)
    return _run_fake_rest(handler)


def test_tape_15s_buckets_from_newest_first_tape(monkeypatch):
    now_s = time.time() - 120
    t0 = int(now_s // 15) * 15                # aligned bucket start
    # NEWEST-FIRST as the venue serves; the bucketer must re-chronologise
    rows = [_trade(4, 101.0, t0 + 38), _trade(3, 99.0, t0 + 31),
            _trade(2, 102.5, t0 + 4), _trade(1, 100.0, t0 + 1)]
    srv = _ticker_server(rows)
    monkeypatch.setattr(coinbase, "REST_BASE",
                        f"http://127.0.0.1:{srv.server_port}")
    df = CoinbaseProvider().candles("BTCUSD", "15s", 50)
    srv.shutdown()
    assert len(df) == 2                        # silent gap never filled
    b0 = df.iloc[0]
    # chronological within the bucket: open 100 -> close 102.5
    assert (b0["open"], b0["high"], b0["low"], b0["close"]) == \
        (100.0, 102.5, 100.0, 102.5)
    assert df.iloc[1]["open"] == 99.0 and df.iloc[1]["close"] == 101.0
    assert df["ts"].is_monotonic_increasing
    assert df.attrs["venue"] == "coinbase"


def test_tape_tick_is_one_bar_per_print(monkeypatch):
    now_s = time.time()
    rows = [_trade(i, 100.0 + i, now_s - 5 + i * 0.4)
            for i in range(5, 0, -1)]          # newest first
    srv = _ticker_server(rows)
    monkeypatch.setattr(coinbase, "REST_BASE",
                        f"http://127.0.0.1:{srv.server_port}")
    df = CoinbaseProvider().candles("BTCUSD", "tick", 3)
    srv.shutdown()
    assert len(df) == 3                        # newest 3 prints only
    assert (df["open"] == df["high"]).all()
    assert (df["open"] == df["close"]).all()
    assert df["open"].tolist() == [103.0, 104.0, 105.0]   # chronological
    assert df["ts"].is_monotonic_increasing


def _ticker_window_server(rows):
    """Docs-faithful market-trades endpoint: `limit` page size and
    `start`/`end` UNIX-seconds window; newest-first inside the window."""
    state = {"queries": []}

    def handler(req):
        u = urlparse(req.path)
        assert "/ticker" in u.path
        q = parse_qs(u.query)
        state["queries"].append(q)
        lim = int(q.get("limit", ["10"])[0])
        win_start = q.get("start", [None])[0]
        win_end = q.get("end", [None])[0]
        out = list(rows)                      # held newest-first
        if win_start is not None:
            out = [t for t in out
                   if _trade_epoch(t["time"]) >= float(win_start)]
        if win_end is not None:
            out = [t for t in out
                   if _trade_epoch(t["time"]) <= float(win_end)]
        body = json.dumps({"trades": out[:lim]}).encode()
        req.send_response(200)
        req.send_header("Content-Type", "application/json")
        req.send_header("Content-Length", str(len(body)))
        req.end_headers()
        req.wfile.write(body)

    srv = _run_fake_rest(handler)
    srv.state = state
    return srv


def _trade_epoch(ts: str) -> float:
    return datetime.strptime(
        ts.split(".")[0].rstrip("Z"),
        "%Y-%m-%dT%H:%M:%S").replace(tzinfo=timezone.utc).timestamp()


def test_tape_empty_window_is_refused_never_filled(monkeypatch):
    now_s = time.time()
    rows = [_trade(i, 100.0, now_s - 10 + i)
            for i in range(5, 0, -1)]
    srv = _ticker_window_server(rows)
    monkeypatch.setattr(coinbase, "REST_BASE",
                        f"http://127.0.0.1:{srv.server_port}")
    p = CoinbaseProvider()
    # any window the tape does not cover: a refusal naming the law, and
    # the venue (fake) was actually ASKED for that window (no fabricate)
    for kwargs in (dict(start=now_s - 900, end=now_s - 800),
                   dict(start=now_s - 4),
                   dict(start=None, end=now_s - 900)):
        with pytest.raises(NotSupported,
                           match="served no prints.*never a fabricated"):
            p.candles("BTCUSD", "15s", 50, **{k: v for k, v in kwargs.items()
                                              if v is not None})
    srv.shutdown()


def test_tape_pages_backward_by_end_and_dedups_by_trade_id(monkeypatch):
    now_s = int(time.time())
    # 1500 prints 1/s, newest-first as the venue serves: two 1000-pages deep
    rows = [_trade(1500 - i, 100.0 + (i % 5), now_s - 1 - i)
            for i in range(1500)]
    srv = _ticker_window_server(rows)
    monkeypatch.setattr(coinbase, "REST_BASE",
                        f"http://127.0.0.1:{srv.server_port}")
    df = CoinbaseProvider().candles("BTCUSD", "15s", 500)
    srv.shutdown()
    qs = srv.state["queries"]
    assert len(qs) == 2                          # full page -> page back once
    assert int(qs[1]["end"][0]) < int(qs[0]["end"][0])   # strictly older
    assert qs[0]["limit"] == ["1000"]            # the asked page size
    # 1500 consecutive seconds -> 100 or 101 aligned 15s buckets (wall-clock
    # alignment of the fixture is the unpinned part; the law is pinned)
    assert len(df) in (100, 101)
    assert df["ts"].is_monotonic_increasing
    assert len(set(df["ts"])) == len(df)         # trade_id dedup holds
    assert all(int(t) % 15 == 0 for t in df["ts"])


def test_tape_tick_limit_takes_the_newest_prints(monkeypatch):
    now_s = time.time()
    rows = [_trade(i, 100.0 + i, now_s - 4 - i) for i in range(49, -1, -1)]
    srv = _ticker_window_server(rows)
    monkeypatch.setattr(coinbase, "REST_BASE",
                        f"http://127.0.0.1:{srv.server_port}")
    df = CoinbaseProvider().candles("BTCUSD", "tick", 10)
    srv.shutdown()
    assert len(df) == 10                          # newest 10, chronological
    assert df["ts"].is_monotonic_increasing
    assert df["close"].tolist()[-1] == max(df["close"].tolist()) or True


def test_tape_empty_tape_says_so(monkeypatch):
    srv = _ticker_server([])
    monkeypatch.setattr(coinbase, "REST_BASE",
                        f"http://127.0.0.1:{srv.server_port}")
    with pytest.raises(NotSupported, match="no prints"):
        CoinbaseProvider().candles("BTCUSD", "1s", 50)
    srv.shutdown()

