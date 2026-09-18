"""Real end-to-end: fake Binance -> actual EdgeDepth Go gateway binary ->
protobuf wire -> LSE Python client -> normalized events.

The gateway is the REAL vendored binary (services/edgedepth-gateway), built
by the Phase-2 proof and pointed at a protocol-faithful fake Binance through
its own documented mirror flags (-binance-rest / -binance-ws — the same
flags upstream ships for testnet). Nothing here is mocked inside the
chain: the Go process, its hub, its book-sync state machine, its protobuf
encoder and every byte on the wire are the actual implementation.

What this proves per master-prompt §42: startup, health, connection,
trade flow (side + id dedupe), order-book snapshot, deltas, sequence-gap
detection -> REST resync -> fresh SNAPSHOT, upstream reconnect, candle
flow (historical + live trade-built), statistics (mark/funding/OI),
liquidations, ticker24h, invalid-symbol rejection, malformed-frame
resilience, protobuf decode at the client boundary, and clean shutdown.

Gating: requires a gateway binary via EDGEDEPTH_TEST_GATEWAY_BIN or a
`edgedepth-gateway` on PATH (built by docs/edgedepth-integration
/01-gateway-proof.md). Skips cleanly otherwise; POSIX-only.
"""

from __future__ import annotations

import asyncio
import os
import shutil
import threading
import time
from pathlib import Path

import pytest

from lse_terminal.contracts import DepthEvent, TradeEvent
from lse_terminal.engine.gateway import GatewaySupervisor, RUNNING
from lse_terminal.providers.edgedepth.client import (
    CandleEvent,
    EdgeDepthClient,
    LiquidationEvent,
    StatEvent,
    Ticker24hBatch,
)

from tests.fake_binance import FakeBinance, wait_for


def _free_port() -> int:
    import socket
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    port = s.getsockname()[1]
    s.close()
    return port


def _gateway_binary():
    explicit = os.environ.get("EDGEDEPTH_TEST_GATEWAY_BIN", "")
    if explicit and Path(explicit).is_file():
        return explicit
    found = shutil.which("edgedepth-gateway")
    return found

GW_BIN = _gateway_binary()
pytestmark = [
    pytest.mark.skipif(GW_BIN is None,
                       reason="no edgedepth-gateway binary "
                              "(see docs/edgedepth-integration/01-gateway-proof.md)"),
    pytest.mark.skipif(os.name == "nt", reason="POSIX-only e2e"),
]


# ── async pump collector (gateway client -> thread-safe event list) ───────


class Collector:
    def __init__(self, factory):
        self.events: list = []
        self.errors: list = []
        self._factory = factory
        self._lock = threading.Lock()
        self._stop = threading.Event()
        self._thread = None

    def start(self):
        self._thread = threading.Thread(target=self._run, daemon=True,
                                        name="e2e-collector")
        self._thread.start()
        return self

    def _run(self):
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            loop.run_until_complete(self._consume())
        finally:
            try:
                loop.close()
            except Exception:
                pass

    async def _consume(self):
        try:
            async for ev in self._factory():
                with self._lock:
                    self.events.append(ev)
                if self._stop.is_set():
                    return
        except Exception as e:  # noqa: BLE001 — recorded for assertions
            self.errors.append(e)

    def stop(self):
        self._stop.set()
        if self._thread is not None:
            self._thread.join(timeout=5)

    def snapshot(self):
        with self._lock:
            return list(self.events)

    def of(self, kind):
        with self._lock:
            return [e for e in self.events if isinstance(e, kind)]

    def wait_for(self, pred, timeout=15.0, what="events"):
        deadline = time.monotonic() + timeout
        while time.monotonic() < deadline:
            got = pred(self.snapshot())
            if got:
                return got
            time.sleep(0.02)
        raise AssertionError(
            f"timed out waiting for {what}; "
            f"events={[(type(e).__name__,) for e in self.snapshot()]} "
            f"errors={self.errors}")


# ── gateway fixture (real binary + fake binance, per test function) ────────


@pytest.fixture()
def gw(tmp_path):
    rest_port, ws_port, gw_port = _free_port(), _free_port(), _free_port()
    fake = FakeBinance(rest_port, ws_port)
    fake.start()
    addr = f"127.0.0.1:{gw_port}"
    sup = GatewaySupervisor(
        root=tmp_path / "cfg",
        env={
            "EDGEDEPTH_GATEWAY_URL": "",
            "EDGEDEPTH_GATEWAY_BIN": GW_BIN,
            "EDGEDEPTH_GATEWAY_ADDR": addr,
            "EDGEDEPTH_GATEWAY_PATH": "/ws",
            "EDGEDEPTH_GATEWAY_AUTO": "1",
            "PATH": "/nonexistent",
            "EDGEDEPTH_LOG": "warn",
        })
    sup.set_child_env({"BINANCE_REST": fake.rest_url,
                       "BINANCE_WS": fake.ws_url})
    sup.start()
    client = EdgeDepthClient(f"ws://{addr}/ws", backoff_base=0.05,
                             backoff_cap=0.2)
    try:
        yield {"fake": fake, "sup": sup, "client": client,
               "url": f"ws://{addr}/ws"}
    finally:
        try:
            sup.stop()
        finally:
            fake.stop()


def _wait_feed_up(fake: FakeBinance):
    wait_for(lambda: fake.depth_connected() and fake.market_connected(),
             timeout=15, what="gateway upstream connects")


# ── core flow ─────────────────────────────────────────────────────────────


def test_full_chain_book_trades_candles_stats_liquidations_ticker(gw):
    fake, client = gw["fake"], gw["client"]
    assert gw["sup"].status()["state"] == RUNNING

    feed = Collector(lambda: client.feed_stream("BTCUSDT", candle_tf_s=60))
    feed.start()
    ticker = Collector(client.ticker24h_stream)
    ticker.start()
    try:
        _wait_feed_up(fake)

        # 1) hero path: REST snapshot 1000 -> straddling diff -> deltas
        fake.send_depth_diff(U=999, u=1001, pu=998,
                             bids=[["99860.0", "1.0"]],
                             asks=[["100140.0", "0.9"]])
        got = feed.wait_for(
            lambda evs: [e for e in evs
                         if isinstance(e, DepthEvent) and e.type == "SNAPSHOT"],
            timeout=15, what="primed SNAPSHOT")
        snap = got[0]
        assert (99850.0, 1.5) in snap.bids and (100150.0, 1.2) in snap.asks

        fake.send_depth_diff(U=1002, u=1002, pu=1001,
                             bids=[["99800.0", "0.0"]],
                             asks=[["100145.0", "0.75"]])
        fake.send_depth_diff(U=1003, u=1004, pu=1002,
                             bids=[["99870.0", "2.5"]])
        deltas = feed.wait_for(
            lambda evs: [e for e in evs
                         if isinstance(e, DepthEvent) and e.type == "DELTA"][
                :2],
            timeout=15, what="two DELTAs")
        assert len(deltas) == 2

        # authoritative book rebuilt from the gateway's own event stream
        from lse_terminal.engine.orderflow.book import DepthBook
        book = DepthBook("BTCUSDT")
        book.apply_all([e for e in feed.of(DepthEvent)])
        assert (99870.0, 2.5) in book.bids(False)
        assert (99860.0, 1.0) in book.bids(False)
        assert (99800.0, 2.0) not in [(p, s) for p, s in book.raw_bids().items()]
        assert (100145.0, 0.75) in book.asks(False)

        # 2) trades: agg ids dedupe; m=buyer-maker => SELL aggressor
        fake.send_trade("99850.0", "0.5", agg_id=500, maker=False)   # BUY
        fake.send_trade("99849.0", "1.25", agg_id=501, maker=True)   # SELL
        fake.send_trade("99849.0", "1.25", agg_id=501, maker=True)   # dup id
        trades = wait_for(lambda: len(feed.of(TradeEvent)) >= 2 and feed.of(TradeEvent),
                          timeout=15, what="trades")
        time.sleep(0.3)
        assert len(feed.of(TradeEvent)) == 2, "duplicate agg id must not trade twice"
        assert trades[0].side == "BUY" and trades[1].side == "SELL"

        # 3) liquidation (SELL force order => is_buy False)
        fake.send_liquidation("SELL", "99800.0", "99810.0", "0.2")
        liqs = feed.wait_for(lambda evs: [e for e in evs
                                          if isinstance(e, LiquidationEvent)],
                             timeout=15, what="liquidation")
        assert liqs[0].price == 99800.0 and liqs[0].is_buy is False

        # 4) stats: mark/funding (ws + REST fallback), OI (REST poll)
        fake.send_mark_price("100500.0", "0.00010")
        stats = feed.wait_for(
            lambda evs: [e for e in evs if isinstance(e, StatEvent)
                         and e.mark_price == 100500.0],
            timeout=15, what="stats with mark price")
        st = stats[0]
        assert st.funding == pytest.approx(0.0001)
        wait_for(lambda: any(e.open_interest_usd == 25000.0
                             for e in feed.of(StatEvent)),
                 timeout=20, what="open interest via REST poll")

        # 5) live candle built trade-by-trade (singular Candle on stream 2)
        candles = wait_for(lambda: [c for c in feed.of(CandleEvent)
                                    if c.timeframe_s == 60],
                           timeout=20, what="live candle")
        c = candles[0]
        assert c.open == 99850.0 and c.high >= c.low > 0

        # 6) historical candles via get_historical_candles (stream 8)
        base = int(time.time() * 1000) - 6 * 60_000
        fake.klines = [[base + i * 60_000, "99800.0", "99860.0", "99790.0",
                        "99850.0", "12.5", base + i * 60_000 + 59_999,
                        "125000.0", 42, "6.0", "60000.0"] for i in range(5)]
        hist = asyncio.run(client.fetch_candles("BTCUSDT", 60, limit=5))
        assert len(hist) == 5 and hist[-1].close == 99850.0
        assert all(hist[i].timestamp_ms < hist[i + 1].timestamp_ms
                   for i in range(4))

        # 7) all-market 24h ticker (REST fallback path: stream stays silent)
        ticks = ticker.wait_for(lambda evs: [e for e in evs
                                             if isinstance(e, Ticker24hBatch)],
                                timeout=20, what="ticker24h batch")
        entry = next(e for e in ticks[0].entries if e.symbol == "BTCUSDT")
        assert entry.last_price == 100000.0
        assert entry.change_pct == pytest.approx(1.5)

        # 8) invalid symbol: subscribed, ignored by hub, no frames, no crash
        bogus = Collector(lambda: client.depth_stream(["TESTQQQUSDT"]))
        bogus.start()
        time.sleep(1.5)
        assert bogus.of(DepthEvent) == [] and bogus.of(TradeEvent) == []
        bogus.stop()
        # gateway still serving the good symbol afterwards
        fake.send_depth_diff(U=1005, u=1005, pu=1004,
                             bids=[["99880.0", "3.0"]])
        feed.wait_for(
            lambda evs: [e for e in evs if isinstance(e, DepthEvent)
                         and e.type == "DELTA"
                         and e.bids and e.bids[-1][0] == 99880.0],
            timeout=15, what="normal flow after invalid symbol")

        # 9) malformed frames on both routes are skipped, never fatal
        fake.send_raw("public", {"stream": "btcusdt@depth@100ms",
                                 "data": "definitely-not-a-depthUpdate"})
        fake.send_raw("market", {"stream": "btcusdt@aggTrade",
                                 "data": {"p": "0", "q": "0", "T": -1}})
        fake.send_depth_diff(U=1006, u=1006, pu=1005,
                             asks=[["100120.0", "1.1"]])
        feed.wait_for(
            lambda evs: [e for e in evs if isinstance(e, DepthEvent)
                         and e.type == "DELTA"
                         and e.asks and e.asks[-1][0] == 100120.0],
            timeout=15, what="flow continues after malformed frames")
        assert feed.errors == []
    finally:
        feed.stop()
        ticker.stop()


# ── sequence integrity ─────────────────────────────────────────────────────


def test_sequence_gap_forces_rest_resync_and_fresh_snapshot(gw):
    fake, client = gw["fake"], gw["client"]
    feed = Collector(lambda: client.feed_stream("BTCUSDT", candle_tf_s=0))
    feed.start()
    try:
        _wait_feed_up(fake)
        fake.send_depth_diff(U=999, u=1001, pu=998,
                             bids=[["99860.0", "1.0"]])
        feed.wait_for(lambda evs: [e for e in evs
                                   if isinstance(e, DepthEvent)
                                   and e.type == "SNAPSHOT"],
                      timeout=15, what="initial SNAPSHOT")
        wait_for(lambda: fake.depth_rest_hits >= 1,
                 timeout=10, what="initial REST snapshot fetch")
        fake.send_depth_diff(U=1002, u=1002, pu=1001,
                             bids=[["99855.0", "0.4"]])
        feed.wait_for(lambda evs: [e for e in evs
                                   if isinstance(e, DepthEvent)
                                   and e.type == "DELTA"],
                      timeout=15, what="post-snapshot DELTA")

        # New venue reality, then a diff that skips the chain:
        time.sleep(1.1)   # the gateway collapses resyncs with a 1s cooldown
                          # (feed.go: triggerResync) — don't arrive inside it
        fake.depth_snapshot = {"lastUpdateId": 1200,
                               "bids": [["99700.0", "1.1"]],
                               "asks": [["100300.0", "1.3"]]}
        fake.send_depth_diff(U=1010, u=1012, pu=1005,
                             bids=[["99800.0", "9.9"]])   # pu 1005 != 1002

        # Gateway must: drop the corrupt diff, refetch REST, resync, and
        # re-prime clients with a fresh full SNAPSHOT. Assert BOTH the
        # venue refetch and the re-primed state.
        wait_for(lambda: fake.depth_rest_hits >= 2,
                 timeout=15, what="REST refetch after sequence gap")
        resnaps = feed.wait_for(
            lambda evs: [e for e in evs if isinstance(e, DepthEvent)
                         and e.type == "SNAPSHOT"][1:],
            timeout=15, what="fresh SNAPSHOT after gap")
        snap2 = resnaps[0]
        assert (99700.0, 1.1) in snap2.bids and (100300.0, 1.3) in snap2.asks
        assert (99800.0, 9.9) not in [(p, s) for p, s in snap2.bids], (
            "the corrupting diff must never reach the client")
        assert feed.errors == []
    finally:
        feed.stop()


def test_upstream_outage_reconnects_and_resyncs(gw):
    fake, client = gw["fake"], gw["client"]
    feed = Collector(lambda: client.feed_stream("BTCUSDT", candle_tf_s=0))
    feed.start()
    try:
        _wait_feed_up(fake)
        fake.send_depth_diff(U=999, u=1001, pu=998,
                             bids=[["99860.0", "1.0"]])
        feed.wait_for(lambda evs: [e for e in evs
                                   if isinstance(e, DepthEvent)
                                   and e.type == "SNAPSHOT"],
                      timeout=15, what="initial SNAPSHOT")
        wait_for(lambda: fake.depth_rest_hits >= 1, timeout=10,
                 what="first REST snapshot")
        before = len(feed.of(DepthEvent))

        fake.drop_upstream_connections()          # simulate venue outage

        # gateway reconnects on its own, onReset resyncs the book, and the
        # client receives a fresh SNAPSHOT without resubscribing.
        wait_for(lambda: fake.depth_rest_hits >= 2,
                 timeout=25, what="REST re-snapshot after reconnect")
        feed.wait_for(lambda evs: len(
            [e for e in evs if isinstance(e, DepthEvent)
             and e.type == "SNAPSHOT"]) >= 2,
            timeout=25, what="SNAPSHOT re-primed after outage")
        assert len(feed.snapshot()) > before
        assert feed.errors == []
    finally:
        feed.stop()


def test_shutdown_stops_process_and_leaves_no_orphans(gw):
    sup, fake, client = gw["sup"], gw["fake"], gw["client"]
    client.max_reconnects = 1
    feed = Collector(lambda: client.depth_stream(["BTCUSDT"]))
    feed.start()
    try:
        _wait_feed_up(fake)
        pid = sup.status()["pid"]
        assert pid > 0
        sup.stop()
        st = sup.status()
        assert st["state"] == "STOPPED" and st["pid"] is None
        import os as _os
        deadline = time.monotonic() + 5
        while time.monotonic() < deadline:
            try:
                _os.kill(pid, 0)
                time.sleep(0.05)
            except OSError:
                break
        else:
            raise AssertionError("gateway pid survived stop()")
        # the client surfaces the outage (bounded reconnects, then raises)
        wait_for(lambda: len(feed.errors) >= 1,
                 timeout=20, what="client-side disconnect detection")
    finally:
        feed.stop()
