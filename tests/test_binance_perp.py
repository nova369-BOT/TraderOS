"""Merged Phase-0 gate: the direct Binance spine, offline.

The BookFeed state machine is a 1:1 port of the user's edgedepth-gateway
internal/binance/feed.go, so these tests pin down the exact Binance
futures book-sync procedure with canned snapshots/diffs — no network:

- diffs buffer until the REST snapshot lands, then replay;
- first applied diff must STRADDLE the snapshot id (U <= lastUpdateId <= u);
- afterwards every diff's pu must equal the previous u, else resync;
- a failed snapshot fetch is retried on the next diff;
- aggTrade maker flag maps aggressor side; duplicate ids never double-count.

House style: sync test bodies driving asyncio.run (see test_edgedepth_client).
"""

import asyncio

import pytest

from lse_terminal.contracts import (
    DEPTH_DELTA,
    DEPTH_SNAPSHOT,
    NotSupported,
    TRADE_BUY,
    TRADE_SELL,
)
from lse_terminal.providers.binance_perp import (
    SYMBOLS,
    BinancePerpProvider,
    BookFeed,
    parse_klines,
)


def run(coro, timeout=10.0):
    async def _wrap():
        return await asyncio.wait_for(coro, timeout)
    return asyncio.run(_wrap())


def snap(last_u):
    return {
        "lastUpdateId": last_u,
        "bids": [["99.0", "5.0"], ["98.5", "2.5"]],
        "asks": [["100.0", "4.0"], ["100.5", "1.5"]],
    }


class ScriptedDepth:
    """Scripted stand-in for rest_depth(symbol, limit): pops one result
    per call; an Exception entry is raised instead of returned."""

    def __init__(self, script, slow_indexes=()):
        self.script = list(script)
        self.slow = set(slow_indexes)
        self.calls = 0

    def __call__(self, symbol, limit):
        i = self.calls
        self.calls += 1
        item = self.script[i] if i < len(self.script) else snap(120)
        if i in self.slow:
            import time
            time.sleep(0.05)       # runs in a worker thread via to_thread
        if isinstance(item, Exception):
            raise item
        return item


def diff(e_ms, u_first, u_last, pu, bids=(), asks=()):
    return {"e": "depthUpdate", "E": e_ms, "U": u_first, "u": u_last,
            "pu": pu, "b": [[str(p), str(s)] for p, s in bids],
            "a": [[str(p), str(s)] for p, s in asks]}


# ── book sync state machine ──────────────────────────────────────────────

def test_buffers_then_straddle_then_continuity():
    fetch = ScriptedDepth([snap(120)])

    async def scenario():
        feed = BookFeed("BTCUSDT", fetch, cooldown=0.0)
        # arrives before the snapshot: buffered, triggers sync
        await feed.on_depth(diff(1000, 50, 100, 49, bids=[(95, 1)],
                                 asks=[(101, 2)]))
        # snapshot id 120 falls inside [101,150] -> straddles, applied
        await feed.on_depth(diff(2000, 101, 150, 100, bids=[(96, 3)]))
        # pu chain intact -> applied
        await feed.on_depth(diff(3000, 151, 200, 150, asks=[(102, 1)]))
        return feed

    feed = run(scenario())
    assert feed.synced and not feed.await_first
    assert feed.last_u == 200
    assert fetch.calls == 1
    # pre-snapshot diff was dropped (stale vs snapshot), not applied
    assert 95.0 not in feed.bids
    assert feed.bids[96.0] == 3.0
    assert feed.asks[102.0] == 1.0
    kinds = [ev.type for ev in feed.events]
    assert kinds == [DEPTH_SNAPSHOT, DEPTH_DELTA, DEPTH_DELTA]
    snap_ev = feed.events[0]
    assert len(snap_ev.bids) == 2 and len(snap_ev.asks) == 2
    assert snap_ev.bids[0][0] == 99.0 and snap_ev.asks[0][0] == 100.0


def test_straddle_reject_triggers_resync():
    # snapshot far ahead of the buffered diff -> first post-sync diff
    # cannot straddle -> the feed must tear down and resync
    fetch = ScriptedDepth([snap(5000), snap(7000)])

    async def scenario():
        feed = BookFeed("BTCUSDT", fetch, cooldown=0.0)
        await feed.on_depth(diff(1000, 50, 100, 49, bids=[(95, 1)]))
        assert feed.synced            # snapshot 5000 applied, awaiting first
        assert feed.await_first
        # U=6000 > snapshot id 5000: rejected, resync scheduled inline
        await feed.on_depth(diff(2000, 6000, 6500, 5999))
        assert fetch.calls == 2
        # fresh snapshot 7000, no buffered diffs -> awaiting first again
        assert feed.synced and feed.await_first and feed.last_u == 7000
        # a diff that straddles 7000 finally lands the book
        await feed.on_depth(diff(3000, 6900, 7050, 6899, bids=[(97, 9)]))
        return feed

    feed = run(scenario())
    assert feed.synced and not feed.await_first
    assert feed.last_u == 7050
    assert feed.bids[97.0] == 9.0


def test_gap_in_pu_resyncs():
    fetch = ScriptedDepth([snap(120), snap(200)])

    async def scenario():
        feed = BookFeed("BTCUSDT", fetch, cooldown=0.0)
        await feed.on_depth(diff(1000, 50, 100, 49))
        await feed.on_depth(diff(2000, 101, 150, 100))   # straddles 120
        assert feed.last_u == 150
        # pu 999 != previous u 150 -> sequence gap -> resync
        await feed.on_depth(diff(3000, 151, 200, 999))
        return feed

    feed = run(scenario())
    assert fetch.calls == 2
    assert feed.synced and feed.await_first
    assert feed.last_u == 200


def test_resync_replays_buffered_pending():
    # after a clean book, a reconnect-style resync must fold diffs that
    # arrived while the snapshot was in flight back into the new book
    fetch = ScriptedDepth([snap(120), snap(170)], slow_indexes=(1,))

    async def scenario():
        feed = BookFeed("BTCUSDT", fetch, cooldown=0.0)
        await feed.on_depth(diff(1000, 50, 100, 49))
        await feed.on_depth(diff(2000, 101, 150, 100))
        await feed.on_depth(diff(3000, 151, 200, 150))
        assert feed.last_u == 200
        task = asyncio.create_task(
            feed._trigger_resync("reconnect", 0, 0))
        await asyncio.sleep(0.02)     # inside the slow snapshot fetch
        # arrives mid-resync: buffered, not double-triggered
        await feed.on_depth(diff(4000, 160, 210, 150, bids=[(96.5, 7)]))
        await task
        return feed

    feed = run(scenario())
    assert fetch.calls == 2
    assert feed.synced and not feed.await_first
    assert feed.last_u == 210
    assert feed.bids[96.5] == 7.0


def test_snapshot_fetch_failure_retries_on_next_diff():
    fetch = ScriptedDepth([RuntimeError("rest down"), snap(250)])

    async def scenario():
        feed = BookFeed("BTCUSDT", fetch, cooldown=0.0)
        await feed.on_depth(diff(1000, 50, 300, 49, bids=[(95, 1)]))
        assert not feed.synced        # snapshot failed, still buffering
        assert feed.resyncing is False
        await feed.on_depth(diff(2000, 301, 400, 300, asks=[(101, 2)]))
        return feed

    feed = run(scenario())
    assert fetch.calls == 2
    assert feed.synced and not feed.await_first
    assert feed.last_u == 400
    # both buffered diffs replayed across the successful snapshot
    assert feed.bids[95.0] == 1.0
    assert feed.asks[101.0] == 2.0


def test_size_zero_deletes_level():
    fetch = ScriptedDepth([snap(120)])

    async def scenario():
        feed = BookFeed("BTCUSDT", fetch, cooldown=0.0)
        await feed.on_depth(diff(1000, 50, 100, 49))
        await feed.on_depth(diff(2000, 101, 150, 100,
                                 bids=[(99.0, 0)], asks=[(103, 4)]))
        return feed

    feed = run(scenario())
    assert 99.0 not in feed.bids      # size 0 removed the snapshot level
    assert feed.asks[103.0] == 4.0


# ── aggTrade semantics (maker flag, dedup, CM exclusion) ─────────────────

def test_trade_side_and_dedup():
    feed = BookFeed("BTCUSDT", ScriptedDepth([]), cooldown=0.0)
    last_ids = {}
    # buyer is maker => aggressor sold
    sell = feed.on_agg_trade({"e": "aggTrade", "T": 1750000001000,
                              "p": "100.5", "q": "0.2", "t": 11, "m": True},
                             last_ids)
    assert sell is not None and sell.side == TRADE_SELL
    # buyer is aggressor
    buy = feed.on_agg_trade({"e": "aggTrade", "T": 1750000002000,
                             "p": "100.6", "q": "0.1", "t": 12, "m": False},
                            last_ids)
    assert buy is not None and buy.side == TRADE_BUY
    assert buy.price == 100.6 and buy.size == 0.1
    # duplicate trade id never double-counts
    dup = feed.on_agg_trade({"e": "aggTrade", "T": 1750000002000,
                             "p": "100.6", "q": "0.1", "t": 12, "m": False},
                            last_ids)
    assert dup is None
    # calc/CM messages excluded
    assert feed.on_agg_trade({"e": "calc"}, last_ids) is None
    assert feed.on_agg_trade({"e": "aggTrade", "st": "2", "t": 13,
                              "p": "1", "q": "1"}, last_ids) is None


def test_reset_for_reconnect_clears_state():
    feed = BookFeed("BTCUSDT", ScriptedDepth([]), cooldown=0.0)
    feed.synced = True
    feed.pending = [{"x": 1}]
    feed.reset_for_reconnect()
    assert not feed.synced and not feed.await_first
    assert feed.pending == [] and not feed.resyncing


# ── REST helpers ─────────────────────────────────────────────────────────

def test_prices_boards_from_ticker(monkeypatch):
    """The watchlist poll: one 24h ticker call feeds every visible row,
    cached 2s so the 1s poll never double-hits the exchange; unknown
    symbols simply get no row (the board keeps its dash, never a guess)."""
    import lse_terminal.providers.binance_perp as bp

    calls = []

    def fake_ticker():
        calls.append(1)
        return ([
            {"symbol": "BTCUSDT", "lastPrice": "65000.1",
             "bidPrice": "65000.0", "askPrice": "65000.2"},
            {"symbol": "ETHUSDT", "lastPrice": "3400.5",
             "bidPrice": "3400.4", "askPrice": "3400.6"},
            {"symbol": "DOGEUSDT", "lastPrice": "0.12"},
            {"symbol": "SOLUSDT", "lastPrice": "not-a-number"},
        ], "futures")

    monkeypatch.setattr(bp, "rest_ticker24h", fake_ticker)
    p = BinancePerpProvider()
    rows = p.prices(["BTCUSDT", "ETHUSDT", "DOGEUSDT", "SOLUSDT", "AAABBB"])
    by_sym = {r["symbol"]: r for r in rows}
    assert by_sym["BTCUSDT"]["price"] == 65000.1
    assert by_sym["BTCUSDT"]["bid"] == 65000.0
    assert by_sym["BTCUSDT"]["ask"] == 65000.2
    assert by_sym["ETHUSDT"]["price"] == 3400.5
    # No bid/ask field -> price only, never fabricated levels.
    assert "bid" not in by_sym["DOGEUSDT"]
    # Unparseable lastPrice -> no row at all.
    assert "SOLUSDT" not in by_sym and "AAABBB" not in by_sym

    # TTL: a second poll within 2s reuses the cached ticker (one call).
    p.prices(["BTCUSDT"])
    assert len(calls) == 1
    # ...and after the TTL the board refreshes (second call).
    monkeypatch.setattr(p, "_ticker", (p._ticker[0] - 3.0,
                                       p._ticker[1], p._ticker[2]))
    p.prices(["BTCUSDT"])
    assert len(calls) == 2


def test_parse_klines_shape():
    rows = [[1750000060000, "101", "102", "100", "101.5", "9",
             1750000119999, "900", 5, "4", "400", "0"],
            [1750000000000, "100", "101", "99", "101", "8",
             1750000059999, "800", 4, "3", "300", "0"]]
    out = parse_klines(rows)
    assert [c[0] for c in out] == [1750000000.0, 1750000060.0]  # sorted
    assert out[0] == (1750000000.0, 100.0, 101.0, 99.0, 101.0, 8.0)


# ── catalog (the exchange's own exchangeInfo, not a hand-picked list) ────

def _offline(monkeypatch):
    """No egress: exchangeInfo raises, the provider must keep serving the
    offline core without touching the network again inside the negative
    TTL. Returns a call counter for rest_exchange_symbols."""
    import lse_terminal.providers.binance_perp as bp
    calls = []

    def dead_exchange(*a, **kw):
        calls.append(1)
        raise RuntimeError("egress walled")

    monkeypatch.setattr(bp, "rest_exchange_symbols", dead_exchange)
    return calls


def test_catalog_prefers_futures_when_reachable(monkeypatch):
    import lse_terminal.providers.binance_perp as bp
    monkeypatch.setattr(bp, "rest_exchange_symbols",
                        lambda: (["BTCUSDT", "ETHUSDT"], "futures"))
    venue, syms = BinancePerpProvider().catalog()
    assert venue == "futures"
    assert syms == ["BTCUSDT", "ETHUSDT"]
    # the catalog is the validation source: a listed symbol resolves,
    # an unlisted one does not
    p = BinancePerpProvider()
    assert p._resolve_symbol("BTCUSDT") == "BTCUSDT"
    assert p._resolve_symbol("BETAUSDT") is None


def test_catalog_spot_fallback(monkeypatch):
    import lse_terminal.providers.binance_perp as bp
    monkeypatch.setattr(bp, "rest_exchange_symbols",
                        lambda: (["BETAUSDT", "BTCUSDT"], "spot"))
    p = BinancePerpProvider()
    venue, syms = p.catalog()
    assert venue == "spot"
    assert "BETAUSDT" in syms
    hits = p.search("BETA")
    assert [h.symbol for h in hits] == ["BETAUSDT"]
    assert hits[0].category == "Binance Spot"


def test_catalog_offline_keeps_core_and_retries(monkeypatch):
    calls = _offline(monkeypatch)
    p = BinancePerpProvider()
    venue, syms = p.catalog()
    assert venue == "core"
    assert list(SYMBOLS) == syms
    p.catalog()                      # inside the 60s negative TTL
    p.catalog()
    assert len(calls) == 1           # one probe, not one per render


def test_resolve_symbol_bare_base():
    import lse_terminal.providers.binance_perp as bp
    p = BinancePerpProvider()
    p._catalog = (0.0, "spot", ["BTCUSDT", "BETAUSDT"])
    assert p._resolve_symbol("BETA") == "BETAUSDT"
    assert p._resolve_symbol("beta") == "BETAUSDT"
    assert p._resolve_symbol("BETAUSDT") == "BETAUSDT"
    assert p._resolve_symbol("NOPE") is None
    assert p._resolve_symbol("") is None


def test_search_bare_base_and_case():
    import lse_terminal.providers.binance_perp as bp
    p = BinancePerpProvider()
    p._catalog = (0.0, "spot", ["BTCUSDT", "BETAUSDT"])
    assert [h.symbol for h in p.search("beta")] == ["BETAUSDT"]
    assert [h.symbol for h in p.search("BTC")] == ["BTCUSDT"]


# ── provider contract ────────────────────────────────────────────────────

def test_provider_validates_and_honest_history(monkeypatch):
    _offline(monkeypatch)            # deterministic: the offline core
    provider = BinancePerpProvider()
    assert provider.configured() is True
    assert provider.name == "binance"
    assert "1m" in provider.timeframes and "1d" in provider.timeframes

    hits = provider.search("BTC")
    assert hits and hits[0].symbol == "BTCUSDT"
    assert hits[0].meta.get("live") is True

    with pytest.raises(ValueError):
        provider.depth_stream(["NOTREAL"])
    with pytest.raises(ValueError):
        provider.stream(["NOTREAL"])
    with pytest.raises(ValueError) as ei:
        provider.candles("NOTREAL", "1m")
    # the error must say WHAT is wrong, not just that it is
    assert "no instrument named NOTREAL" in str(ei.value)
    with pytest.raises(ValueError) as et:
        provider.candles("BTCUSDT", "7m")
    assert "unsupported timeframe" in str(et.value)

    with pytest.raises(NotSupported):
        provider.depth_history("BTCUSDT", 0, 1)
    assert "depth_history" not in provider.capabilities()

    # every symbol in the core is streamable without any keys; the async
    # generator starts no I/O until iterated, so building it offline must
    # simply succeed
    assert hasattr(provider.depth_stream(list(SYMBOLS)), "__anext__")


# ── catalog: the exchange's own book, ticker-first ───────────────────────

def test_usdt_rows_both_payload_shapes():
    from lse_terminal.providers.binance_perp import _usdt_rows
    info = {"symbols": [
        {"symbol": "BTCUSDT", "baseAsset": "BTC", "quoteAsset": "USDT",
         "status": "TRADING"},
        {"symbol": "ETHUSDT", "baseAsset": "ETH", "quoteAsset": "USDT",
         "status": "TRADING", "contractType": "PERPETUAL"},
        {"symbol": "BTCUSDT-250926", "baseAsset": "BTC", "quoteAsset": "USDT",
         "status": "TRADING", "contractType": "CURRENT_QUARTER"},  # delivery
        {"symbol": "ETHBTC", "baseAsset": "ETH", "quoteAsset": "BTC",
         "status": "TRADING"},                                      # no USDT
        {"symbol": "USDTUSDT", "baseAsset": "USDT", "quoteAsset": "USDT",
         "status": "TRADING"},                                      # self-pair
        {"symbol": "OLDUSDT", "baseAsset": "OLD", "quoteAsset": "USDT",
         "status": "DELISTING"},                                    # not trading
    ]}
    assert _usdt_rows(info, "futures") == ["BTCUSDT", "ETHUSDT"]
    # dashes (delivery contracts) are excluded in either shape
    assert _usdt_rows(info, "spot") == ["BTCUSDT", "ETHUSDT"]
    tape = [{"symbol": "SOLUSDT", "lastPrice": "1"},
            {"symbol": "BTCUSDT-250926", "lastPrice": "1"},   # delivery
            {"symbol": "DOGEGBP", "lastPrice": "1"},          # not USDT
            {"symbol": "USDTUSDT", "lastPrice": "1"},         # self-pair
            {"symbol": ""}, None]
    assert _usdt_rows(tape, "spot") == ["SOLUSDT"]
    assert _usdt_rows("garbage", "spot") == []
    assert _usdt_rows(None, "futures") == []


def test_catalog_ticker_first_exchangeinfo_fallback(monkeypatch):
    import lse_terminal.providers.binance_perp as bp
    calls = []
    ticker = [{"symbol": "BTCUSDT", "lastPrice": "1"},
              {"symbol": "ETHUSDT", "lastPrice": "1"}]
    info = {"symbols": [{"symbol": "BTCUSDT", "baseAsset": "BTC",
                         "quoteAsset": "USDT", "status": "TRADING"}]}

    def fake_get(base, path, params, timeout=6.0):
        calls.append((base, path, timeout))
        if "/ticker/24hr" in path:
            if "fapi" in base:
                raise RuntimeError("WAF 418")
            return ticker
        if "fapi" in base:
            raise RuntimeError("WAF 418")
        return info

    monkeypatch.setattr(bp, "_get_json", fake_get)
    syms, venue = bp.rest_exchange_symbols()
    assert (syms, venue) == (["BTCUSDT", "ETHUSDT"], "spot")
    # the ticker answered: exchangeInfo (the multi-MB payload) was never
    # even requested
    assert all("/ticker/24hr" in p for _, p, _ in calls)

    # ticker book dead -> the deep fallback runs, with its 20s allowance
    calls.clear()

    def dead_ticker(base, path, params, timeout=6.0):
        calls.append((base, path, timeout))
        if "/ticker/24hr" in path:
            raise RuntimeError("mirror down")
        if "fapi" in base:
            raise RuntimeError("WAF 418")
        return info

    monkeypatch.setattr(bp, "_get_json", dead_ticker)
    syms, venue = bp.rest_exchange_symbols()
    assert syms == ["BTCUSDT"] and venue == "spot"
    deep = [(p, t) for _, p, t in calls if "exchangeInfo" in p]
    assert deep and all(t == 20.0 for _, t in deep)  # long allowance only here


def test_first_json_per_call_timeout():
    import lse_terminal.providers.binance_perp as bp
    seen = []
    import urllib.request

    def fake_urlopen(url, timeout=6.0):
        seen.append(timeout)
        raise RuntimeError("stop here")

    import unittest.mock as mock
    with mock.patch.object(bp.urllib.request, "urlopen", fake_urlopen):
        try:
            bp._first_json([("a", "http://x", "/p", 3.5),
                            ("b", "http://x", "/p", 9.0)], {})
        except RuntimeError:
            pass
    assert 3.5 in seen and 9.0 in seen


def test_ws_cold_start_races_bases_in_parallel(monkeypatch):
    """Cold start (no known winner): the healthy mirror must win a PARALLEL
    race — a blackholed primary (accepts TCP, never answers the handshake)
    costs ~0, not its full open_timeout. A serial implementation of the
    same loop takes >8s here and fails the elapsed check."""
    import json
    import socket
    import threading
    import time as _time
    import websockets
    import lse_terminal.providers.binance_perp as bp

    async def handler(ws):
        req = getattr(ws, "request", None)
        path = getattr(req, "path", "") if req is not None else ""
        if "aggTrade" in path:
            await ws.send(json.dumps({"stream": "btcusdt@aggTrade",
                                      "data": {"e": "aggTrade",
                                               "T": 1750000001000,
                                               "p": "100.5", "q": "0.2",
                                               "t": 11, "m": True,
                                               "s": "BTCUSDT"}}))
        else:
            await ws.send(json.dumps({"stream": "btcusdt@depth@100ms",
                                      "data": {"e": "depth", "E": 1,
                                               "s": "BTCUSDT",
                                               "U": 100, "u": 200,
                                               "b": [["100.4", "1"]],
                                               "a": [["100.5", "1"]]}}))
        try:
            await ws.wait_closed()
        except Exception:  # noqa: BLE001 — peer went away first
            pass

    # A blackhole "primary": accepts the TCP connection, then says nothing
    # — exactly what a WAF'd edge looks like from the inside.
    dead = socket.socket()
    dead.bind(("127.0.0.1", 0))
    dead.listen(8)
    dead_port = dead.getsockname()[1]

    def soak():
        while True:
            try:
                conn, _ = dead.accept()
                conn.settimeout(None)      # hold it open forever
                while True:
                    conn.recv(65536)       # (and never reply)
            except OSError:
                return
            except Exception:  # noqa: BLE001 — keep soaking
                continue
    threading.Thread(target=soak, daemon=True).start()

    def offline(*a, **k):
        raise RuntimeError("offline test")

    monkeypatch.setattr(bp, "_get_json", offline)
    monkeypatch.setattr(bp, "WS_BASE", f"ws://127.0.0.1:{dead_port}")

    async def main():
        server = await websockets.serve(handler, "127.0.0.1", 0)
        port = server.sockets[0].getsockname()[1]
        monkeypatch.setattr(bp, "MIRROR_WS", f"ws://127.0.0.1:{port}")
        p = bp.BinancePerpProvider()
        p._catalog = (0.0, "spot", ["BTCUSDT"])
        got = []

        async def collect():
            async for ev in p.stream(["BTCUSDT"]):
                got.append(ev)
                return                      # one trade event is enough

        t0 = _time.monotonic()
        await asyncio.wait_for(collect(), timeout=5.0)
        elapsed = _time.monotonic() - t0
        server.close()
        await server.wait_closed()
        dead.close()
        return got, elapsed

    got, elapsed = run(main(), timeout=15.0)
    assert got, "no trade event arrived through the mirror stream"
    assert got[0]["symbol"] == "BTCUSDT" and got[0]["price"] == 100.5
    assert elapsed < 3.0, \
        f"cold start serialized on the blackholed base: {elapsed:.1f}s"


# ── sub-minute charts: the exchange's own trade tape ─────────────────────

def _tape_rows():
    """Canned aggTrades prints over a 35-second window (T in ms, a real
    epoch base — a multiple of 30s so 30s buckets align to it, exactly
    as they do on the wire)."""
    base_ms = 1_699_999_980_000        # % 30000 == 0
    rows = []
    a = 1000
    for sec, price, qty in (
        (0, 1000.0, 1.0),
        (0, 1001.0, 2.0),   # 0s bucket: o=1000 h=1001 l=1000 c=1001 v=3
        (1, 998.0, 1.0),    # 1s bucket
        (29, 1002.0, 4.0),  # 0-29s 30s bucket edge
        (34, 997.0, 1.0),   # 30s bucket
    ):
        a += 1
        rows.append({"a": a, "p": str(price), "q": str(qty),
                     "f": a, "l": a, "T": base_ms + sec * 1000, "m": False})
    return rows


def test_tape_to_candles_1s_buckets():
    from lse_terminal.providers.binance_perp import tape_to_candles
    base = 1_699_999_980.0
    bars, newest = tape_to_candles(_tape_rows(), "1s")
    assert len(bars) == 4                       # 0s,1s,29s,34s buckets
    first = bars[0]
    assert first[0] == base                     # bucket key = ts floored to s
    assert (first[1], first[2], first[3], first[4], first[5]) == \
        (1000.0, 1001.0, 1000.0, 1001.0, 3.0)   # real OHLCV of the prints
    assert newest == base + 34.0


def test_tape_to_candles_30s_and_tick_and_limit():
    from lse_terminal.providers.binance_perp import tape_to_candles
    base = 1_699_999_980.0
    rows = _tape_rows()
    bars30, _ = tape_to_candles(rows, "30s")
    assert [b[0] for b in bars30] == [base, base + 30.0]
    first30 = bars30[0]
    assert (first30[1], first30[2], first30[3], first30[4]) == \
        (1000.0, 1002.0, 998.0, 1002.0)         # o/h/l/c across the bucket
    tick, _ = tape_to_candles(rows, "tick")
    # one bar per DISTINCT print time (the two same-second prints merge,
    # exactly the way the live shell paints a tick bar)
    assert len(tick) == len(rows) - 1
    assert all(b[1] == b[2] == b[3] == b[4] for b in tick)
    assert tick[0] == (base, 1001.0, 1001.0, 1001.0, 1001.0, 3.0)
    capped, _ = tape_to_candles(rows, "1s", limit=2)
    assert [b[0] for b in capped] == [base + 29.0, base + 34.0]  # newest kept


def test_tape_to_candles_malformed_rows_skipped():
    from lse_terminal.providers.binance_perp import tape_to_candles
    rows = [{"p": "1.0"}, {"T": 0, "p": "1.0", "q": "1.0"},
            {"T": 1000, "p": "oops", "q": "1.0"}, "not-a-dict",
            {"t": 2_000_000_000, "p": "2.5", "q": "0.5"}]  # t fallback, no T
    bars, newest = tape_to_candles(rows, "1s")
    assert len(bars) == 1 and bars[0][1] == 2.5
    assert newest == 2_000_000.0               # 2_000_000_000 ms -> s


def test_candles_subminute_serves_tape_honestly(monkeypatch):
    import lse_terminal.providers.binance_perp as bp
    p = BinancePerpProvider()
    p._catalog = (0.0, "spot", ["BTCUSDT"])
    calls = []
    monkeypatch.setattr(bp, "rest_agg_trades",
                        lambda s, limit=1000: (calls.append(s) or
                                               (_tape_rows(), "spot")))
    for tf in ("tick", "1s", "30s"):
        df = p.candles("BTCUSDT", tf, limit=10)
        assert len(df) <= 10
        assert df.attrs["venue"] == "spot"      # the mirror's tape: labelled
        assert df["ts"].is_monotonic_increasing
    assert calls == ["BTCUSDT"] * 3
    with monkeypatch.context() as m:
        m.setattr(bp, "rest_agg_trades", lambda s, limit=1000: ([], "spot"))
        with pytest.raises(NotSupported) as ei:
            p.candles("BTCUSDT", "1s")
        assert "no trades" in str(ei.value)


def test_candles_klines_passes_start_end(monkeypatch):
    import lse_terminal.providers.binance_perp as bp
    p = BinancePerpProvider()
    p._catalog = (0.0, "spot", ["BTCUSDT"])
    seen = {}

    def fake_first(calls, params):
        seen.update(params)
        rows = [[1000000000000, "1", "2", "0.5", "1.5", "7"]]
        return rows, "spot"

    monkeypatch.setattr(bp, "_first_json", fake_first)
    df = p.candles("BTCUSDT", "5m", limit=50, start="1700000000",
                   end="1700003600")
    assert df.attrs["venue"] == "spot"
    assert seen["startTime"] == "1700000000000"  # s -> ms
    assert seen["endTime"] == "1700003600"
