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
    TradeEvent,
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
    # ...and after the TTL the stale board is served INSTANTLY (the 1s
    # poll must never stall on the exchange) while a background refresh
    # catches up.
    import time as _time
    monkeypatch.setattr(p, "_ticker", (p._ticker[0] - 3.0,
                                       p._ticker[1], p._ticker[2]))
    t0 = _time.time()
    rows = p.prices(["BTCUSDT"])
    # the poll returned instantly with the last real board — the refresh
    # may already be running in the background, so the fetch count is
    # asserted AFTER giving it time to finish (exactly one, single-flight)
    assert _time.time() - t0 < 0.05
    assert rows and rows[0]["price"] == 65000.1   # the last real board
    _time.sleep(0.5)                              # let the bg refresh run
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
    p.catalog()                      # inside the 10s negative TTL
    p.catalog()
    assert len(calls) == 1           # one probe, not one per render


# ── stale-while-revalidate: requests never re-block on the exchange ─────

def test_candles_swr_never_reblocks(monkeypatch):
    """True miss blocks once; fresh serves from memory; STALE serves
    instantly with a single background refresh (single-flight) — not a
    second 3.5s stall per request."""
    import time as _time
    import lse_terminal.providers.binance_perp as bp

    p = BinancePerpProvider()
    p._catalog = (0.0, "spot", ["BTCUSDT"])
    fetches = []
    # keep the catalog's background refresh out of the fake _first_json
    monkeypatch.setattr(bp, "rest_exchange_symbols",
                        lambda: (["BTCUSDT"], "spot"))

    def slow_klines(calls, params):
        fetches.append(1)
        _time.sleep(0.2)
        return [[1750000000000, "1", "2", "0.5", "1.5", "7"]], "spot"

    monkeypatch.setattr(bp, "_first_json", slow_klines)
    key = ("BTCUSDT", "5m", 50, None, None)

    t0 = _time.time()
    p.candles("BTCUSDT", "5m", limit=50)              # true miss: one block
    miss = _time.time() - t0
    assert miss >= 0.15 and fetches == [1]

    t0 = _time.time()
    p.candles("BTCUSDT", "5m", limit=50)              # fresh: from memory
    assert _time.time() - t0 < 0.05 and fetches == [1]

    # force stale: two back-to-back stale hits must cost ONE background
    # fetch, and neither hit may block
    p._candle_cache[key] = (_time.time() - 10, p._candle_cache[key][1], "spot")
    t0 = _time.time()
    p.candles("BTCUSDT", "5m", limit=50)
    p.candles("BTCUSDT", "5m", limit=50)
    assert _time.time() - t0 < 0.05 and fetches == [1]
    _time.sleep(0.5)                                  # let the bg refresh run
    assert len(fetches) == 2                          # single-flight


def test_prices_swr_serves_stale_board_instantly(monkeypatch):
    import time as _time
    import lse_terminal.providers.binance_perp as bp
    p = BinancePerpProvider()
    board = [{"symbol": "BTCUSDT", "lastPrice": "100",
              "bidPrice": "99.9", "askPrice": "100.1"}]
    calls = []

    def slow_ticker():
        calls.append(1)
        _time.sleep(0.2)
        return board, "spot"

    monkeypatch.setattr(bp, "rest_ticker24h", slow_ticker)
    out = p.prices(["BTCUSDT"])                       # cold: one block
    assert out and out[0]["price"] == 100.0 and calls == [1]

    p._ticker = (_time.time() - 5, board, "spot")     # force stale
    t0 = _time.time()
    out = p.prices(["BTCUSDT"])                       # stale: instant serve
    assert _time.time() - t0 < 0.05 and calls == [1]
    assert out and out[0]["price"] == 100.0
    _time.sleep(0.5)
    assert len(calls) == 2                            # bg refresh caught up


def test_catalog_swr_serves_held_book_instantly(monkeypatch):
    """A real book already held is served instantly past its TTL; the
    refresh (and only the refresh) touches the exchange, in the
    background."""
    import time as _time
    import lse_terminal.providers.binance_perp as bp
    p = BinancePerpProvider()
    p._catalog = (0.0, "spot", ["BTCUSDT", "ETHUSDT"])  # held, stamp expired
    calls = []

    def slow_exchange():
        calls.append(1)
        _time.sleep(0.2)
        return ["BTCUSDT", "ETHUSDT", "SOLUSDT"], "spot"

    monkeypatch.setattr(bp, "rest_exchange_symbols", slow_exchange)
    t0 = _time.time()
    venue, syms = p.catalog()
    assert _time.time() - t0 < 0.05
    assert (venue, syms) == ("spot", ["BTCUSDT", "ETHUSDT"])
    _time.sleep(0.5)
    assert calls == [1]
    venue, syms = p.catalog()
    assert syms == ["BTCUSDT", "ETHUSDT", "SOLUSDT"]  # bg refresh landed


def test_cold_fetch_is_coalesced_across_callers(monkeypatch):
    """The first (and only) blocking fetch for a key is SHARED by
    concurrent callers — the boot prewarm and a user's first click on
    the same chart hit the exchange once, not twice, and both get the
    same data."""
    import concurrent.futures
    import time as _time
    import lse_terminal.providers.binance_perp as bp
    p = BinancePerpProvider()
    p._catalog = (0.0, "spot", ["BTCUSDT"])
    monkeypatch.setattr(bp, "rest_exchange_symbols",
                        lambda: (["BTCUSDT"], "spot"))
    hits = []

    def slow(calls_, params):
        hits.append(1)
        _time.sleep(0.5)
        return [[1750000000000, "1", "2", "0.5", "1.5", "7"]], "spot"

    monkeypatch.setattr(bp, "_first_json", slow)
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as ex:
        f1 = ex.submit(p.candles, "BTCUSDT", "5m", limit=50)
        f2 = ex.submit(p.candles, "BTCUSDT", "5m", limit=50)
        d1, d2 = f1.result(5.0), f2.result(5.0)
    assert hits == [1]          # one exchange hit, not two
    assert d1 is d2             # both callers got the same frame


def test_live_tail_gate_rerates_the_edge(monkeypatch):
    """The auto-reload loop's start=… edge fetches share a floor: within
    TAIL_MIN_INTERVAL the last tail is re-served (dupes are a no-op for
    the shell's merge) instead of cold-fetching every cycle."""
    import time as _time
    import lse_terminal.providers.binance_perp as bp
    p = BinancePerpProvider()
    p._catalog = (0.0, "spot", ["BTCUSDT"])
    calls = []
    monkeypatch.setattr(bp, "rest_exchange_symbols",
                        lambda: (["BTCUSDT"], "spot"))
    monkeypatch.setattr(bp, "TAIL_MIN_INTERVAL", 0.1)  # fast-forward the floor

    def slow_klines(calls_, params):
        calls.append(1)
        return [[1750000000000, "1", "2", "0.5", "1.5", "7"]], "spot"

    monkeypatch.setattr(bp, "_first_json", slow_klines)
    df1 = p.candles("BTCUSDT", "5m", limit=200, start="1749999000")
    df2 = p.candles("BTCUSDT", "5m", limit=200, start="1749999990")
    assert df2 is df1 and calls == [1]     # within the floor: re-served
    _time.sleep(0.2)                       # past the floor: refetches
    df3 = p.candles("BTCUSDT", "5m", limit=200, start="1749999991")
    assert df3 is not df1 and len(calls) == 2   # past the floor: one refetch


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

    def fake_get(base, path, params, timeout=None):
        calls.append((base, path,
                      bp.REST_TIMEOUT if timeout is None else timeout))
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

    # ticker book dead -> the deep fallback runs. A multi-MB payload that
    # needs 8s must still land under the single patient ceiling.
    calls.clear()

    def slow_deep(base, path, params, timeout=None):
        eff = bp.REST_TIMEOUT if timeout is None else timeout
        calls.append((base, path, eff))
        if "/ticker/24hr" in path:
            raise RuntimeError("mirror down")
        if "fapi" in base:
            raise RuntimeError("WAF 418")
        if eff < 8.0:
            raise TimeoutError("multi-MB payload needs the full allowance")
        return info

    monkeypatch.setattr(bp, "_get_json", slow_deep)
    syms, venue = bp.rest_exchange_symbols()
    assert syms == ["BTCUSDT"] and venue == "spot"
    deep_ts = [t for _, p, t in calls if "exchangeInfo" in p]
    # the deep payload got the full patient ceiling (>= the 8s it needed)
    assert deep_ts and all(t >= 8.0 for t in deep_ts)


def test_first_json_single_ceiling_gives_slow_line_a_chance():
    """One generous ceiling per leg, raced concurrently: the race returns
    the moment ANY leg answers (healthy line: ~1s, the fast leg wins), a
    degraded mirror that needs 8s still delivers (8s < 10s ceiling), and
    a blackholed losing leg never holds the winner (shutdown wait=False).
    The old per-call 6s ceiling is what 502'd a slow-but-alive line."""
    import unittest.mock as mock
    import lse_terminal.providers.binance_perp as bp

    class FakeResp:
        def __enter__(self):
            return self
        def __exit__(self, *a):
            return False
        def read(self):
            return b'{"ok": true}'

    seen = []

    def fake_urlopen(url, timeout=6.0):
        seen.append((url, timeout))
        if "fapi" in url:
            raise RuntimeError("WAF 418")      # blocked base, always
        if timeout >= 8.0:
            return FakeResp()                  # degraded mirror: needs 8s
        raise TimeoutError("line answers too late for this ceiling")

    with mock.patch.object(bp.urllib.request, "urlopen", fake_urlopen):
        data, label = bp._first_json(
            [("futures", "http://fapi.x", "/p"),
             ("spot", "http://spot.x", "/p")], {})
    assert data == {"ok": True} and label == "spot"
    spot_caps = [t for u, t in seen if "spot" in u]
    # every leg gets the full patient ceiling — the timeout is a cap, not
    # a wait: healthy lines win the race long before it
    assert spot_caps and all(t == bp.REST_TIMEOUT for t in spot_caps)


def test_first_json_ceiling_value():
    import lse_terminal.providers.binance_perp as bp
    # patient enough for an 8s degraded line, bounded for a dead one
    assert bp.REST_TIMEOUT >= 8.0
    assert bp.REST_TIMEOUT <= 12.0


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
    assert seen["endTime"] == "1700003600000"    # s -> ms (both edges)


def test_candles_accepts_iso_window(monkeypatch):
    """The backtest paths pass ISO timestamps; they must reach the
    exchange as ms, not be silently dropped."""
    import lse_terminal.providers.binance_perp as bp
    p = BinancePerpProvider()
    p._catalog = (0.0, "spot", ["BTCUSDT"])
    seen = {}

    def fake_first(calls, params):
        seen.update(params)
        return [[1700000000000, "1", "2", "0.5", "1.5", "7"]], "spot"

    monkeypatch.setattr(bp, "_first_json", fake_first)
    p.candles("BTCUSDT", "1h", limit=10, start="2023-11-14T22:13:20Z",
              end="2023-11-14T23:13:20+00:00")
    assert seen["startTime"] == "1700000000000"
    assert seen["endTime"] == "1700003600000"


# ── B1: the exchange's per-request caps (root cause of "only a few
# timeframes work": the shell opens every chart at limit=5000, Binance caps
# klines at 1500/1000 and answers 400 -1130 — every kline timeframe 502'd
# while the aggTrades-backed tick/1s/30s, clamped to 1000, kept working) ──

class _CappedExchange:
    """Stand-in for _first_json that enforces Binance's real caps and
    serves a synthetic contiguous kline series anchored on endTime."""

    def __init__(self, cap=1000, venue="spot"):
        self.cap, self.venue, self.calls = cap, venue, []

    def __call__(self, calls, params):
        if "interval" not in params:          # catalog/ticker probes
            return [], self.venue
        self.calls.append(dict(params))
        lim = int(params.get("limit", "500"))
        if lim > self.cap:
            raise bp_mod().BinanceRESTError(
                400, -1130, "Data sent for parameter 'limit' is not valid.",
                "/api/v3/klines")
        step = 60_000
        end = int(params.get("endTime", "1800000000000"))
        end -= end % step
        start = int(params.get("startTime", "0"))
        rows, t = [], end
        while len(rows) < lim and t >= start:
            rows.append([t, "1", "2", "0.5", "1.5", "7"])
            t -= step
        rows.reverse()
        return rows, self.venue


def bp_mod():
    import lse_terminal.providers.binance_perp as bp
    return bp


def test_klines_5000_is_paged_never_rejected(monkeypatch):
    bp = bp_mod()
    ex = _CappedExchange()
    monkeypatch.setattr(bp, "_first_json", ex)
    p = BinancePerpProvider()
    p._catalog = (0.0, "spot", ["BTCUSDT"])
    df = p.candles("BTCUSDT", "1m", limit=5000)
    assert len(df) == 5000
    # every page respected the cap
    assert all(int(c["limit"]) <= 1000 for c in ex.calls)
    assert len(ex.calls) == 5
    # stitched contiguous, ascending, no duplicate open times
    d = df["ts"].diff().dropna()
    assert (d == 60).all()
    assert df["ts"].is_monotonic_increasing and df["ts"].is_unique


def test_klines_small_request_is_one_call(monkeypatch):
    bp = bp_mod()
    ex = _CappedExchange()
    monkeypatch.setattr(bp, "_first_json", ex)
    p = BinancePerpProvider()
    p._catalog = (0.0, "spot", ["BTCUSDT"])
    assert len(p.candles("BTCUSDT", "5m", limit=400)) == 400
    assert len(ex.calls) == 1 and ex.calls[0]["limit"] == "400"


def test_klines_paged_window_respects_start(monkeypatch):
    """start + big limit: pages never reach before start."""
    bp = bp_mod()
    ex = _CappedExchange()
    monkeypatch.setattr(bp, "_first_json", ex)
    p = BinancePerpProvider()
    p._catalog = (0.0, "spot", ["BTCUSDT"])
    df = p.candles("BTCUSDT", "1m", limit=3000, start="1799999000",
                   end="1800000000")
    assert df["ts"].min() >= 1799999000
    assert df["ts"].max() <= 1800000000
    assert all(int(c["startTime"]) >= 1799999000000 for c in ex.calls)


def test_rest_error_carries_binance_code_and_msg(monkeypatch):
    """A 400 from the exchange is a diagnosis, not 'unreachable'."""
    import io
    import urllib.error
    bp = bp_mod()

    def boom(url, timeout):
        raise urllib.error.HTTPError(
            url, 400, "Bad Request", {},
            io.BytesIO(b'{"code":-1130,"msg":"Data sent for parameter '
                       b'\'limit\' is not valid."}'))

    monkeypatch.setattr(bp.urllib.request, "urlopen", boom)
    with pytest.raises(bp.BinanceRESTError) as ei:
        bp._get_json("https://x", "/fapi/v1/klines", {"limit": "5000"})
    assert ei.value.code == -1130
    assert "limit" in str(ei.value) and "-1130" in str(ei.value)

    p = BinancePerpProvider()
    p._catalog = (0.0, "spot", ["BTCUSDT"])
    with pytest.raises(NotSupported) as e2:
        p.candles("BTCUSDT", "1h", limit=10)
    assert "-1130" in str(e2.value) and "unreachable" not in str(e2.value)


def test_full_ladder_is_native_or_tape():
    bp = bp_mod()
    native = set(bp.INTERVALS.values())
    for tf in bp.TIMEFRAMES:
        assert tf in native or tf in ("tick", "1s", "30s")
    for tf in ("30m", "2h", "1w"):
        assert tf in bp.TIMEFRAMES


# ── B2: the tick stream must never wait on the order book ────────────────
# Root cause of "candles don't update fast": /api/ws -> stream() reused the
# depth pump, which awaited a 1000-level REST snapshot before its first
# yield and re-awaited one inline on every sequence gap — on a degraded
# line (measured 8s) the FIRST TICK arrived 8s after connect and the tape
# stalled on every resync. Budget: first tick < 1s on a healthy socket
# regardless of REST latency; bid/ask ride each tick from bookTicker.

def _serve_ticks(n_trades=300, n_depth=300, seq=None):
    import json
    seq = seq if seq is not None else {"u": 100}

    async def handler(ws):
        req = getattr(ws, "request", None)
        path = getattr(req, "path", "") if req is not None else ""
        try:
            if "aggTrade" in path:
                await ws.send(json.dumps({"stream": "btcusdt@bookTicker",
                                          "data": {"b": "100.4",
                                                   "a": "100.6"}}))
                for i in range(n_trades):
                    await ws.send(json.dumps({
                        "stream": "btcusdt@aggTrade",
                        "data": {"e": "aggTrade", "T": 1750000001000 + i,
                                 "p": "100.5", "q": "0.2", "t": 11 + i,
                                 "m": True, "s": "BTCUSDT"}}))
                    await asyncio.sleep(0.01)
            else:
                for i in range(n_depth):
                    seq["u"] += 1
                    u = seq["u"]
                    await ws.send(json.dumps({
                        "stream": "btcusdt@depth@100ms",
                        "data": {"e": "depth", "E": 1000 + i, "U": u,
                                 "u": u, "pu": u - 1,
                                 "b": [["100.4", "1"]],
                                 "a": [["100.5", "1"]]}}))
                    await asyncio.sleep(0.01)
            await ws.wait_closed()
        except Exception:  # noqa: BLE001 — peer closed first
            pass
    return handler


def test_tick_stream_first_tick_independent_of_depth_rest(monkeypatch):
    import time as _time
    import websockets
    import lse_terminal.providers.binance_perp as bp
    rest_calls = []

    def slow_rest(calls, params):
        rest_calls.append(params)
        _time.sleep(2.0)                    # a degraded depth line
        return {"lastUpdateId": 150, "bids": [], "asks": []}, "spot"
    monkeypatch.setattr(bp, "_first_json", slow_rest)

    async def main():
        server = await websockets.serve(_serve_ticks(), "127.0.0.1", 0)
        port = server.sockets[0].getsockname()[1]
        monkeypatch.setattr(bp, "WS_BASE", f"ws://127.0.0.1:{port}")
        monkeypatch.setattr(bp, "MIRROR_WS", f"ws://127.0.0.1:{port}")
        p = bp.BinancePerpProvider()
        p._catalog = (0.0, "spot", ["BTCUSDT"])
        t0 = _time.monotonic()
        got = []
        async for ev in p.stream(["BTCUSDT"]):
            got.append(ev)
            if len(got) == 1:
                first = _time.monotonic() - t0
            if len(got) >= 20:
                break
        server.close()
        await server.wait_closed()
        return got, first

    got, first = run(main(), timeout=15.0)
    assert first < 1.0, f"first tick waited on something: {first:.2f}s"
    assert not [c for c in rest_calls if "limit" in c], \
        "the tick stream must not fetch a depth snapshot"
    assert got[0]["bid"] == 100.4 and got[0]["ask"] == 100.6
    assert got[0]["side"] == TRADE_SELL and got[0]["price"] == 100.5
    assert len({g["ts"] for g in got}) == 20      # no dupes


def test_depth_stream_trades_flow_while_snapshot_in_flight(monkeypatch):
    """The depth pump: trades are delivered immediately; the snapshot
    (slow REST) lands later without ever having blocked them; the book
    then syncs on the straddling diff and deltas follow."""
    import time as _time
    import websockets
    import lse_terminal.providers.binance_perp as bp

    seq = {"u": 100}

    def slow_rest(calls, params):
        if "limit" not in params:
            return [], "spot"                  # catalog probe
        _time.sleep(1.0)
        # like the real exchange: the snapshot id is wherever the live
        # sequence is NOW, so the next diff straddles it
        return {"lastUpdateId": seq["u"] + 1, "bids": [["100", "1"]],
                "asks": [["101", "1"]]}, "spot"
    monkeypatch.setattr(bp, "_first_json", slow_rest)

    async def main():
        server = await websockets.serve(_serve_ticks(seq=seq),
                                        "127.0.0.1", 0)
        port = server.sockets[0].getsockname()[1]
        # one live base only: two winners of the cold race would both
        # consume the shared sequence counter and fake a gap
        monkeypatch.setattr(bp, "WS_BASE", "ws://127.0.0.1:1")
        monkeypatch.setattr(bp, "MIRROR_WS", f"ws://127.0.0.1:{port}")
        p = bp.BinancePerpProvider()
        p._catalog = (0.0, "spot", ["BTCUSDT"])
        t0 = _time.monotonic()
        first_trade = first_snap = None
        n_delta = 0
        async for ev in p.depth_stream(["BTCUSDT"]):
            now = _time.monotonic() - t0
            if isinstance(ev, TradeEvent) and first_trade is None:
                first_trade = now
            elif getattr(ev, "type", "") == DEPTH_SNAPSHOT:
                first_snap = first_snap or now
            elif getattr(ev, "type", "") == DEPTH_DELTA:
                n_delta += 1
            if first_snap is not None and n_delta >= 5:
                break
        server.close()
        await server.wait_closed()
        return first_trade, first_snap, n_delta

    first_trade, first_snap, n_delta = run(main(), timeout=15.0)
    assert first_trade is not None and first_trade < 0.5, first_trade
    assert first_snap is not None and first_snap >= 1.0
    assert n_delta >= 5
