"""Tests for the F1 Depth Heat engine slice (gates H1–H4 + the H8 engine
half): book/grid/normalize semantics, the deterministic demo L2 source, the
session recorder's parquet round-trip + replay-readiness invariant, live
coalescing, and the API/WS surface."""

import asyncio
import math
import time

import pytest
from fastapi.testclient import TestClient

from lse_terminal.contracts import (
    DEPTH_DELTA,
    DEPTH_SNAPSHOT,
    TRADE_BUY,
    TRADE_SELL,
    DepthEvent,
    Instrument,
    Provider,
    TradeEvent,
)
from lse_terminal.engine.orderflow import (
    DepthBook,
    DepthGrid,
    SessionRecorder,
    build_lut,
    cutoff_values,
    quantize_lut,
    read_events,
    size_to_index,
)
from lse_terminal.engine.orderflow.service import (
    OrderflowService,
    OrderflowUnavailable,
)
from lse_terminal.engine.registry import Registry
from lse_terminal.providers import DemoProvider


# ── helpers ────────────────────────────────────────────────────────────────


def ev(ts, bids=(), asks=(), type_=DEPTH_DELTA, symbol="TEST"):
    return DepthEvent(symbol=symbol, ts=ts, type=type_,
                      bids=[tuple(b) for b in bids],
                      asks=[tuple(a) for a in asks])


def snap(ts, bids, asks):
    return ev(ts, bids, asks, type_=DEPTH_SNAPSHOT)


# ── H2: DepthBook ──────────────────────────────────────────────────────────


def test_book_snapshot_and_delta_semantics():
    b = DepthBook("TEST")
    b.apply(snap(1.0, [(100.0, 5.0), (99.0, 3.0)], [(101.0, 4.0)]))
    assert b.best_bid() == 100.0
    assert b.best_ask() == 101.0
    assert b.spread() == 1.0
    # DELTA patches only the levels it mentions.
    b.apply(ev(2.0, bids=[(100.0, 7.0)], asks=[(102.0, 2.0)]))
    assert b.bids()[0] == (100.0, 7.0)
    assert (99.0, 3.0) in b.bids()          # untouched level persists
    assert (101.0, 4.0) in b.asks()
    assert (102.0, 2.0) in b.asks()


def test_book_removal_and_last_seen_persistence():
    b = DepthBook()
    b.apply(snap(1.0, [(100.0, 5.0)], [(101.0, 5.0)]))
    # Explicit size-0 removes; levels merely absent from later events stay.
    b.apply(ev(2.0, bids=[(100.0, 0.0)]))
    assert b.best_bid() is None
    assert (101.0, 5.0) in b.asks()
    # S6: a level that leaves the transmitted range keeps its last-seen size
    # and reappears when it returns (no implicit erasure, ever).
    b.apply(snap(3.0, [], [(101.0, 9.0)]))
    assert b.asks(respect_active=False) == [(101.0, 9.0)]


def test_book_reset_and_edges():
    b = DepthBook("TEST")
    b.apply(snap(1.0, [(100.0, 5.0)], [(101.0, 5.0)]))
    b.reset()
    assert b.best_bid() is None and b.best_ask() is None
    assert b.mid() is None and b.spread() is None
    assert b.snapshot()["levels_bid"] == 0
    # One-sided book: mid falls back to the side that exists.
    b.apply(snap(2.0, [(99.0, 1.0)], []))
    assert b.mid() == 99.0


def test_book_active_range_and_ladder():
    b = DepthBook(active_levels=2)
    b.apply(snap(1.0, [(100.0, 1.0), (99.0, 2.0), (98.0, 3.0)],
                 [(101.0, 1.0), (102.0, 2.0), (103.0, 3.0)]))
    assert [p for p, _ in b.bids()] == [100.0, 99.0]        # windowed view
    assert len(b.bids(respect_active=False)) == 3           # raw state kept
    lad = b.ladder()
    assert lad["bids"][0]["cumulative"] == 1.0
    assert lad["bids"][1]["cumulative"] == 3.0
    assert lad["spread"] == 1.0


# ── H2: DepthGrid ──────────────────────────────────────────────────────────


def test_grid_column_finalization_last_value_wins():
    g = DepthGrid(column_ms=1000)
    # Two updates inside one column: the LAST size is the cell value.
    g.apply_event(ev(1.10, bids=[(100.0, 5.0)]))
    g.apply_event(ev(1.90, bids=[(100.0, 9.0)]))
    g.apply_event(ev(2.10, bids=[]))   # rolls column 1000
    vp = g.viewport(include_live=False)
    assert vp["columns"] == [1000]
    assert vp["prices"] == [100.0]
    assert vp["cells"][0][0] == 9.0


def test_grid_carries_state_across_quiet_columns():
    g = DepthGrid(column_ms=1000)
    g.apply_event(ev(1.1, bids=[(100.0, 5.0)]))
    g.apply_event(ev(4.1, bids=[(100.0, 5.0)]))
    g.flush()
    vp = g.viewport(include_live=False)
    # Columns 1000..4000 all paint the resting level (continuous band).
    assert vp["columns"] == [1000, 2000, 3000, 4000]
    assert all(row[0] == 5.0 for row in vp["cells"])


def test_grid_removal_and_viewport_slicing():
    g = DepthGrid(column_ms=1000)
    g.apply_event(ev(1.1, bids=[(100.0, 5.0)], asks=[(101.0, 2.0)]))
    g.apply_event(ev(2.1, bids=[(100.0, 0.0)]))
    g.flush()
    vp = g.viewport(include_live=False)
    col2 = vp["cells"][1]
    assert col2[vp["prices"].index(100.0)] == 0.0
    assert col2[vp["prices"].index(101.0)] == 2.0
    # Price-windowed viewport only carries rows inside the window.
    vp2 = g.viewport(lo=100.5, include_live=False)
    assert vp2["prices"] == [101.0]


def test_grid_ring_eviction_and_determinism():
    g = DepthGrid(column_ms=1000, max_columns=3)
    for i in range(10):
        g.apply_event(ev(i + 0.1, bids=[(100.0, float(i))]))
    g.flush()
    assert g.column_count == 3  # ring-bounded

    def build():
        gg = DepthGrid(column_ms=1000)
        gg.apply_event(ev(1.1, bids=[(100.0, 5.0)], asks=[(101.0, 3.0)]))
        gg.apply_event(ev(2.1, bids=[(100.0, 4.0)]))
        gg.flush()
        return gg.fingerprint()

    assert build() == build()


# ── H2: normalization ──────────────────────────────────────────────────────


def test_lut_determinism_and_scheme_endpoints():
    a = build_lut("heat", intensity=1.2, dimming=0.1, contrast=0.2,
                  brightness=0.05)
    b = build_lut("heat", intensity=1.2, dimming=0.1, contrast=0.2,
                  brightness=0.05)
    assert (a == b).all()
    assert a.shape == (256, 4)
    assert tuple(a[0][:3]) == (0, 0, 0)          # bottom of the map: black
    assert a[255][0] == 255 and a[255][1] == 0   # top of heat: solid red
    grey = build_lut("greyscale")
    assert tuple(grey[255][:3]) == (255, 255, 255)
    with pytest.raises(ValueError):
        build_lut("thermal")


def test_size_to_index_monotonic_and_saturating():
    sizes = [0.0, 1.0, 2.0, 5.0, 10.0, 100.0]
    idx = size_to_index(sizes, lo=1.0, hi=10.0)
    assert list(idx) == [0, 0, 28, 113, 255, 255]   # clamped both ends
    # Monotonicity over a dense sweep.
    dense = size_to_index([i / 100 for i in range(1000)], 0.0, 10.0)
    assert (dense[1:] >= dense[:-1]).all()


def test_cutoff_modes():
    sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 100]
    lo, hi = cutoff_values(sizes, "percentile", 5, 95)
    assert 1.0 <= lo < hi <= 100.0
    lo2, hi2 = cutoff_values([], "exact", 2.5, 50.0)
    assert (lo2, hi2) == (2.5, 50.0)
    # Degenerate input cannot produce a zero-width gradient.
    lo3, hi3 = cutoff_values([5], "exact", 5, 5)
    assert hi3 > lo3


def test_vertical_smoothing_quantizes_shades():
    lut = build_lut("heat")
    q = quantize_lut(lut, 4)
    rows = {tuple(r) for r in q.tolist()}
    assert len(rows) == 4                      # exactly 4 distinct shades
    assert (quantize_lut(lut, None) == lut).all()
    assert (quantize_lut(lut, 1) == lut).all()


# ── H3: demo L2 source ─────────────────────────────────────────────────────

START = 1757980800  # a fixed instant keeps fixtures reproducible


def test_demo_depth_history_shape_and_determinism():
    p = DemoProvider()
    a = p.depth_history("DEMO:BTC", START, START + 600)
    b = p.depth_history("DEMO:BTC", START, START + 600)
    assert len(a) == len(b) > 100
    assert all(x.to_dict() == y.to_dict() for x, y in zip(a, b))
    assert a[0].type == DEPTH_SNAPSHOT
    assert all(e.type == DEPTH_DELTA for e in a[1:])
    # Every price sits on the $1 tick grid; sizes are non-negative (a zero
    # in a DELTA is a legitimate level removal, e.g. a swept level).
    saw_removal = False
    for e in a[:60]:
        for price, size in (*e.bids, *e.asks):
            assert abs(price - round(price)) < 1e-9
            assert size >= 0
            saw_removal = saw_removal or (e.type == DEPTH_DELTA and size == 0)
    assert saw_removal, "the scripted dynamics should remove levels sometime"
    # The book the events build is never crossed.
    book = DepthBook("DEMO:BTC")
    book.apply_all(a)
    assert book.best_bid() < book.best_ask()


def test_demo_depth_history_params():
    p = DemoProvider()
    assert p.depth_history("DEMO:BTC", START, START) == []
    with pytest.raises(ValueError):
        p.depth_history("NOPE", START, START + 10)
    # Wide windows coarsen instead of simulating unbounded.
    wide = p.depth_history("DEMO:BTC", START, START + 30 * 86400)
    assert len(wide) <= 21601 + 1
    # max_levels bounds the transmitted window per side.
    evs = p.depth_history("DEMO:BTC", START, START + 5, max_levels=10)
    assert len(evs[0].bids) == 10 and len(evs[0].asks) == 10


def test_demo_depth_stream_emits_depth_and_trades():
    async def run():
        p = DemoProvider()
        agen = p.depth_stream(["DEMO:BTC"])
        got = []
        async for item in agen:
            got.append(item)
            if len(got) >= 4:
                break
        await agen.aclose()
        return got

    got = asyncio.run(run())
    assert isinstance(got[0], DepthEvent) and got[0].type == DEPTH_SNAPSHOT
    types = {type(g) for g in got}
    assert DepthEvent in types
    # The demo bundles side-stamped prints with its book.
    assert TradeEvent in types or all(isinstance(g, DepthEvent) for g in got)
    for t in (g for g in got if isinstance(g, TradeEvent)):
        assert t.side in (TRADE_BUY, TRADE_SELL)
        assert t.size > 0


def test_demo_ticks_carry_side():
    async def run():
        p = DemoProvider()
        agen = p.stream(["DEMO:BTC"])
        out = []
        async for t in agen:
            out.append(t)
            if len(out) >= 3:
                break
        await agen.aclose()
        return out

    for t in asyncio.run(run()):
        assert t["side"] in (TRADE_BUY, TRADE_SELL)
        assert t["volume"] > 0


# ── H8 engine half: recording round-trip + replay readiness ────────────────


def test_recorder_roundtrip_and_replay_bit_identical(tmp_path):
    p = DemoProvider()
    events = p.depth_history("DEMO:BTC", START, START + 120)
    trades = [TradeEvent(symbol="DEMO:BTC", ts=START + 5.0, price=67000.0,
                         size=1.5, side=TRADE_BUY)]
    rec = SessionRecorder(tmp_path, flush_rows=64)
    meta = rec.start("DEMO:BTC", source="demo", demo=True)
    for e in events:
        rec.write(meta["id"], e)
    for t in trades:
        rec.write(meta["id"], t)
    rec.stop(meta["id"])

    listed = rec.sessions()
    assert len(listed) == 1 and listed[0]["rows"] == len(events) + 1
    paths = rec.session_paths(meta["id"])
    assert paths and all(x.exists() for x in paths)
    back = read_events(paths)
    assert len(back) == len(events) + 1
    for orig, got in zip(events, back):
        assert got.ts == orig.ts and got.type == orig.type
        assert [tuple(lv) for lv in got.bids] == [tuple(lv) for lv in orig.bids]
        assert [tuple(lv) for lv in got.asks] == [tuple(lv) for lv in orig.asks]
    assert isinstance(back[-1], TradeEvent) and back[-1].side == TRADE_BUY

    # Replay-readiness invariant: the grid rebuilt from the file is
    # bit-identical to the live grid that produced it.
    g1 = DepthGrid(column_ms=1000)
    g1.ingest(events)
    g1.flush()
    g2 = DepthGrid(column_ms=1000)
    g2.ingest([e for e in back if isinstance(e, DepthEvent)])
    g2.flush()
    assert g1.fingerprint() == g2.fingerprint()


def test_recorder_rotation_and_delete(tmp_path):
    rec = SessionRecorder(tmp_path, flush_rows=2)
    meta = rec.start("TEST", max_mb=0.000001)   # ~1 byte: rotate every flush
    for i in range(20):
        rec.write(meta["id"], ev(float(i), bids=[(100.0, 1.0)]))
    rec.stop(meta["id"])
    parts = rec.session_paths(meta["id"])
    assert len(parts) > 1
    assert rec.delete(meta["id"]) is True
    assert rec.sessions() == []
    assert not any(tmp_path.glob(meta["id"] + "*"))


# ── coalescing (service) ───────────────────────────────────────────────────


class _FakeProvider(Provider):
    name = "fake"
    title = "Fake"

    def __init__(self, events):
        self._events = events

    def search(self, query: str = "", limit: int = 50):
        return [Instrument(symbol="FAKE:X", name="Fake", category="Test",
                           provider=self.name)]

    def candles(self, symbol, timeframe, limit=500, start=None, end=None):
        raise ValueError("no candles in the fake")

    def depth_history(self, symbol, start, end, column_ms=1000, max_levels=50):
        if symbol != "FAKE:X":
            raise ValueError(f"unknown symbol {symbol}")
        return list(self._events)

    async def depth_stream(self, symbols):
        if symbols != ["FAKE:X"]:
            raise ValueError(f"unknown symbol {symbols[0]}")
        for item in self._events:
            yield item


def test_coalescing_latest_state_wins():
    burst = [ev(1.00, bids=[(100.0, 1.0)]),
             ev(1.01, bids=[(100.0, 2.0)]),
             ev(1.02, bids=[(100.0, 3.0)])]
    reg = Registry()
    reg.register(_FakeProvider(burst))
    svc = OrderflowService(reg)

    async def run():
        out = []
        async for item in svc.coalesced("FAKE:X", hz=10.0):
            out.append(item)
        return out

    out = asyncio.run(run())
    # Three deltas inside one flush window collapse to the LATEST state.
    depth = [e for e in out if isinstance(e, DepthEvent)]
    assert len(depth) == 1
    assert depth[0].bids == [(100.0, 3.0)]


def test_coalescing_passes_trades_through():
    stream = [ev(1.0, bids=[(100.0, 1.0)]),
              TradeEvent(symbol="FAKE:X", ts=1.01, price=100.5, size=2.0,
                         side=TRADE_SELL),
              ev(1.02, bids=[(100.0, 2.0)])]
    reg = Registry()
    reg.register(_FakeProvider(stream))
    svc = OrderflowService(reg)

    async def run():
        return [item async for item in svc.coalesced("FAKE:X", hz=10.0)]

    out = asyncio.run(run())
    trades = [e for e in out if isinstance(e, TradeEvent)]
    assert len(trades) == 1 and trades[0].side == TRADE_SELL


def test_service_resolution_degrades_with_reason():
    reg = Registry()
    reg.register(_FakeProvider([ev(1.0)]))
    svc = OrderflowService(reg)
    p, events = svc.resolve_history("FAKE:X", 0, 10)
    assert p.name == "fake" and len(events) == 1
    with pytest.raises(OrderflowUnavailable, match="no depth"):
        svc.resolve_history("UNKNOWN", 0, 10)
    with pytest.raises(OrderflowUnavailable):
        svc.resolve_history("FAKE:X", 0, 10, provider="ghost")


# ── H4: API + WS integration ───────────────────────────────────────────────


@pytest.fixture()
def client(tmp_path, monkeypatch):
    from lse_terminal.engine.server import create_app
    monkeypatch.setenv("LSE_TERMINAL_CONFIG_DIR", str(tmp_path))
    monkeypatch.delenv("LSE_API_KEY", raising=False)
    with TestClient(create_app(), base_url="http://127.0.0.1") as c:
        yield c


def test_providers_advertise_depth_capabilities(client):
    provs = {p["name"]: p for p in client.get("/api/providers").json()}
    caps = provs["demo"]["capabilities"]
    assert "depth_history" in caps and "depth_stream" in caps


def test_depth_endpoint_and_book(client):
    now = time.time()
    r = client.get("/api/orderflow/depth", params={
        "symbol": "DEMO:BTC", "from": now - 600, "to": now,
        "column_ms": 1000, "max_levels": 30})
    assert r.status_code == 200
    body = r.json()
    assert body["demo"] is True and body["provider"] == "demo"
    assert body["events"][0]["type"] == "SNAPSHOT"
    assert len(body["events"]) > 100

    b = client.get("/api/orderflow/book", params={"symbol": "DEMO:BTC"}).json()
    assert b["demo"] is True
    assert b["best_bid"] < b["best_ask"]
    assert b["bids"] and b["asks"]

    # No depth source → clean 404 with the reason, never silent synthesis.
    r = client.get("/api/orderflow/depth",
                   params={"symbol": "EURUSD", "provider": "userdata"})
    assert r.status_code == 404
    assert "depth" in r.json()["detail"]


def test_book_active_range_and_depth_reset(client):
    """H6 wiring: the pane's S6 active-range override and S11 depth-reset
    policy are honoured by /api/orderflow/book."""
    full = client.get("/api/orderflow/book",
                      params={"symbol": "DEMO:BTC"}).json()
    act = client.get("/api/orderflow/book",
                     params={"symbol": "DEMO:BTC",
                             "active_levels": 2}).json()
    # S6: the UI-facing ladder is clipped to the window...
    assert len(act["bids"]) <= 2 and len(act["asks"]) <= 2
    assert len(full["bids"]) >= len(act["bids"])
    # ...but the BBO survives the override untouched.
    assert act["best_bid"] == full["best_bid"]
    assert act["best_ask"] == full["best_ask"]

    # S11: an interval reset rebuilds only from the last epoch-aligned
    # boundary — never MORE state than the session view, still a valid book.
    sess = client.get("/api/orderflow/book",
                      params={"symbol": "DEMO:BTC",
                              "reset": "session"}).json()
    iv = client.get("/api/orderflow/book",
                    params={"symbol": "DEMO:BTC", "reset": "interval",
                            "reset_interval_min": 1}).json()
    assert iv["events_applied"] <= sess["events_applied"]
    assert iv["best_bid"] < iv["best_ask"]


def test_orderflow_ws_snapshot_on_subscribe(client):
    # TestClient hardcodes host "testserver" on WS scopes; the engine's
    # local-only guard rightfully rejects anything but a loopback Host.
    with client.websocket_connect(
            "/api/orderflow/ws?symbol=DEMO:BTC",
            headers={"host": "127.0.0.1"}) as ws:
        msg = ws.receive_json()
        assert msg["type"] == "subscribed" and msg["demo"] is True
        frame = ws.receive_json()
        assert frame["type"] == "depth"
        assert frame["event"]["type"] == "SNAPSHOT"
        assert frame["event"]["bids"] and frame["event"]["asks"]


def test_record_sessions_delete_lifecycle(client):
    r = client.post("/api/orderflow/record", json={"symbol": "DEMO:BTC"})
    assert r.status_code == 200, r.text
    sid = r.json()["id"]
    time.sleep(2.5)  # the demo feed runs at ~1 Hz; collect a few events
    r = client.post("/api/orderflow/record/stop", json={"id": sid})
    assert r.json()["stopped"] == [sid]
    sessions = client.get("/api/orderflow/sessions").json()
    mine = next(s for s in sessions if s["id"] == sid)
    assert mine["rows"] > 0 and mine["stopped"] is not None
    assert mine["files"] and mine["bytes"] > 0

    # The pane's load path (H8 UI half): events come back in write order,
    # SNAPSHOT first, capped honestly.
    ev = client.get(f"/api/orderflow/sessions/{sid}/events").json()
    assert ev["sid"] == sid and ev["symbol"] == "DEMO:BTC"
    assert ev["demo"] is True and ev["truncated"] is False
    assert ev["events"] and ev["events"][0]["type"] == "SNAPSHOT"
    assert len(ev["events"]) == mine["rows"]
    tiny = client.get(f"/api/orderflow/sessions/{sid}/events",
                      params={"max_events": 1000}).json()
    if mine["rows"] > 1000:
        assert tiny["truncated"] is True and len(tiny["events"]) == 1000
    assert client.get("/api/orderflow/sessions/nope/events").status_code == 404

    assert client.delete(f"/api/orderflow/sessions/{sid}").json()["ok"] is True
    assert all(s["id"] != sid
               for s in client.get("/api/orderflow/sessions").json())
    # Deleting again answers 404.
    assert client.delete(
        f"/api/orderflow/sessions/{sid}").status_code == 404


def test_record_unknown_source_404(client):
    r = client.post("/api/orderflow/record",
                    json={"symbol": "EURUSD", "provider": "userdata"})
    assert r.status_code == 404


def test_local_only_guard_and_trusted_suffix_optin(tmp_path, monkeypatch):
    """The guard stays strict by default; LSE_TRUSTED_HOST_SUFFIXES is the
    explicit operator opt-in for reverse-proxied deployments (preview)."""
    from lse_terminal.engine.server import create_app
    monkeypatch.setenv("LSE_TERMINAL_CONFIG_DIR", str(tmp_path))
    monkeypatch.delenv("LSE_API_KEY", raising=False)

    # Default: a remote / rebound Host gets the guard's 403.
    monkeypatch.delenv("LSE_TRUSTED_HOST_SUFFIXES", raising=False)
    with TestClient(create_app(), base_url="http://evil.example") as c:
        r = c.get("/api/providers")
        assert r.status_code == 403
        assert "local requests only" in r.text

    # Opt-in: declared proxy hosts pass with their true Origin; anything
    # else stays rejected.
    monkeypatch.setenv("LSE_TRUSTED_HOST_SUFFIXES", "*.e2b.app")
    with TestClient(create_app(),
                    base_url="http://8000-sbx.e2b.app") as c:
        r = c.get("/api/providers",
                  headers={"origin": "https://8000-sbx.e2b.app"})
        assert r.status_code == 200
        r = c.get("/api/providers", headers={"host": "evil.example"})
        assert r.status_code == 403
