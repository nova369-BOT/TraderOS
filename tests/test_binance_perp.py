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

def test_parse_klines_shape():
    rows = [[1750000060000, "101", "102", "100", "101.5", "9",
             1750000119999, "900", 5, "4", "400", "0"],
            [1750000000000, "100", "101", "99", "101", "8",
             1750000059999, "800", 4, "3", "300", "0"]]
    out = parse_klines(rows)
    assert [c[0] for c in out] == [1750000000.0, 1750000060.0]  # sorted
    assert out[0] == (1750000000.0, 100.0, 101.0, 99.0, 101.0, 8.0)


# ── provider contract ────────────────────────────────────────────────────

def test_provider_validates_and_honest_history():
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
    with pytest.raises(ValueError):
        provider.candles("NOTREAL", "1m")
    with pytest.raises(ValueError):
        provider.candles("BTCUSDT", "7m")

    with pytest.raises(NotSupported):
        provider.depth_history("BTCUSDT", 0, 1)
    assert "depth_history" not in provider.capabilities()

    # every symbol in the whitelist is streamable without any keys;
    # the async generator starts no I/O until iterated, so building it
    # offline must simply succeed
    assert hasattr(provider.depth_stream(list(SYMBOLS)), "__anext__")
