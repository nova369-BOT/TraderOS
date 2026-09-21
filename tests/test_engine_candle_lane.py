"""Engine candle lane (engine/candle_lane.py) — the D20 speed+weight law.

Pins, with a scripted stub provider (no venue anywhere):
- cold request = the exact REST backfill the route always made;
- venue kline-stream events replace/extend rows WITHOUT any REST call
  (the 429 killer: warm serves cost zero request weight);
- deeper-than-cache windows fall back to REST and merge on ts identity
  (no duplicates, history never fabricated);
- a silent stream for >2 intervals triggers ONE small tail refetch,
  then cools down — never a poll;
- a provider refusal (429) re-raises verbatim (D14, never swallowed);
- providers without a candle stream fall through to candles() verbatim.
"""

import asyncio
import threading
import time

import pandas as pd
import pytest

from lse_terminal.contracts import CANDLE_COLUMNS, NotSupported
from lse_terminal.engine.candle_lane import (CandleLane,
                                             CandleLaneManager,
                                             _STALE_FLOOR_S,
                                             _TAIL_REFETCH_MAX)


class _Wall:
    def __init__(self):
        self.now = 0.0
    def __call__(self):
        return self.now
    def tick(self, s):
        self.now += s


class _StubProvider:
    name = "stub"

    def __init__(self, rows, tf_s=60, venue="stub-venue", streamable=True):
        self.rows = rows            # [[ts,o,h,l,c,v], ...] ascending
        self.tf_s = tf_s
        self.venue = venue
        self.calls = []             # (limit, start, end) per REST call
        self.raise_on = None
        self.streamable = streamable
        self.stream_script = []     # dict events the ws will emit
        self.streams_started = 0

    def supports_candle_stream(self, symbol, timeframe):
        return self.streamable and timeframe == "1m"

    def candle_tf_seconds(self, timeframe):
        return self.tf_s

    def candles(self, symbol, timeframe, limit=500, start=None, end=None):
        self.calls.append((limit, start, end))
        if self.raise_on is not None:
            raise self.raise_on
        rows = list(self.rows)
        if start is not None:
            rows = [r for r in rows if r[0] >= int(float(start))]
        if end is not None:
            rows = [r for r in rows if r[0] <= int(float(end))]
        # Venue semantics: a window-less request serves the NEWEST
        # `limit` bars; a windowed one serves ascending from startTime.
        df = pd.DataFrame(rows[-limit:] if start is None and end is None
                          else rows[:limit], columns=CANDLE_COLUMNS)
        df.attrs["venue"] = self.venue
        return df

    def candle_stream(self, symbols, timeframe):
        self.streams_started += 1
        script = list(self.stream_script)

        async def _gen():
            for ev in script:
                yield ev
            await asyncio.sleep(3600)      # idle-but-alive socket law

        return _gen()


def _rows(n, t0=1_000_000, tf=60, price=100.0):
    return [[t0 + i * tf, price + i, price + i + 1, price + i - 1,
             price + i + 0.5, 3.0] for i in range(n)]


NOW = 1_000_000 + 10_000 * 60


def _lane(prov, tf=60, capacity=5600):
    wall = _Wall()
    return CandleLane(prov, "BTCUSDT", "1m", tf, capacity=capacity,
                      wall=wall), wall


def test_cold_request_is_the_exact_rest_backfill_then_serves_cache_zero_weight():
    prov = _StubProvider(_rows(6000, t0=NOW - 6000 * 60))
    lane, wall = _lane(prov)
    df = lane.frame(5000, clock=lambda: NOW)          # cold
    assert prov.calls == [(5000, None, None)]         # verbatim backfill
    assert len(df) == 5000
    # Warm, same window: ZERO additional REST calls (the 429 killer).
    df2 = lane.frame(5000, clock=lambda: NOW)
    df3 = lane.frame(800, clock=lambda: NOW)
    assert len(prov.calls) == 1
    assert len(df2) == 5000 and len(df3) == 800
    assert list(df2["ts"].tail(3)) == list(df["ts"].tail(3))
    assert df2.attrs["venue"] == "stub-venue"


def test_stream_event_replaces_the_forming_bar_without_any_rest_call():
    prov = _StubProvider(_rows(300, t0=NOW - 300 * 60))
    lane, wall = _lane(prov)
    lane.frame(300, clock=lambda: NOW)                # backfill: 1 call
    truck = len(prov.calls)
    last_ts = NOW - 60
    lane.apply_ws({"symbol": "BTCUSDT", "timeframe": "1m", "ts": last_ts,
                   "open": 400, "high": 405, "low": 399, "close": 404,
                   "volume": 9.0, "closed": False})
    lane.apply_ws({"symbol": "BTCUSDT", "timeframe": "1m", "ts": last_ts,
                   "open": 400, "high": 406, "low": 399, "close": 403,
                   "volume": 11.0, "closed": False})
    df = lane.frame(300, clock=lambda: NOW)
    assert len(prov.calls) == truck                   # stream-only update
    last = df.iloc[-1]
    assert last["close"] == 403 and last["high"] == 406     # LAST frame wins
    assert df["ts"].duplicated().sum() == 0


def test_closed_event_then_next_open_rolls_bars_no_duplicates():
    prov = _StubProvider(_rows(300, t0=NOW - 300 * 60))
    lane, _ = _lane(prov)
    lane.frame(300, clock=lambda: NOW)
    last_ts = NOW - 60
    lane.apply_ws({"symbol": "BTCUSDT", "timeframe": "1m", "ts": last_ts,
                   "open": 400, "high": 405, "low": 399, "close": 404,
                   "volume": 9.0, "closed": True})
    lane.apply_ws({"symbol": "BTCUSDT", "timeframe": "1m", "ts": NOW,
                   "open": 404, "high": 405, "low": 403, "close": 404.5,
                   "volume": 2.0, "closed": False})
    df = lane.frame(300, clock=lambda: NOW + 60)
    assert df["ts"].iloc[-2] == last_ts
    assert df["close"].iloc[-2] == 404                  # the closed bar froze
    assert df["ts"].iloc[-1] == NOW
    assert df["ts"].duplicated().sum() == 0
    assert len(prov.calls) == 1


def test_window_deeper_than_the_cache_head_rests_and_merges_by_identity():
    prov = _StubProvider(_rows(6000, t0=NOW - 6000 * 60))
    lane, _ = _lane(prov, capacity=7000)   # deep serve fits the lane ring
    lane.frame(500, clock=lambda: NOW)                # cache holds 500
    deep_start = NOW - 6000 * 60
    df = lane.frame(6000, start=deep_start, end=NOW, clock=lambda: NOW)
    assert len(prov.calls) == 2                       # the deep head fetched
    assert prov.calls[1] == (6000, deep_start, NOW)   # verbatim window
    assert len(df) == 6000
    assert df["ts"].duplicated().sum() == 0
    # And now the whole merged depth is cache-fast:
    df2 = lane.frame(6000, start=deep_start, end=NOW, clock=lambda: NOW)
    assert len(prov.calls) == 2
    assert len(df2) == 6000


def test_stream_silence_heals_with_one_small_tail_refetch_then_cools():
    prov = _StubProvider(_rows(300, t0=NOW - 300 * 60))
    lane, wall = _lane(prov)
    lane.frame(300, clock=lambda: NOW)
    lane.apply_ws({"symbol": "BTCUSDT", "timeframe": "1m",
                   "ts": NOW - 60, "open": 1, "high": 2, "low": 0.5,
                   "close": 1.5, "volume": 1, "closed": False})
    # The stream goes silent, but the venue keeps building bars (REST
    # truth moves): the bars DO exist, only the ws stopped saying them.
    prov.rows += _rows(7, t0=NOW, price=500.0)[:6]
    # One full staleness horizon of silence...
    wall.tick(max(_STALE_FLOOR_S, 2 * 60) + 5)
    lane.frame(300, clock=lambda: NOW + 300)
    assert len(prov.calls) == 2
    assert prov.calls[1] == (8, None, None)   # one gap-sized tail only
    df = lane.frame(300, clock=lambda: NOW + 300)
    assert len(prov.calls) == 2               # cooldown: no re-refetch
    assert df["ts"].iloc[-1] == NOW + 300     # bridged to the live tail


def test_provider_refusal_raises_verbatim_never_swallowed():
    prov = _StubProvider(_rows(10, t0=NOW - 600))
    prov.raise_on = NotSupported(
        'binance-spot: klines REST HTTP 429: {"code":-1003}')
    lane, _ = _lane(prov)
    with pytest.raises(NotSupported, match="429"):
        lane.frame(10, clock=lambda: NOW)


def test_manager_falls_through_for_providers_without_a_candle_stream():
    prov = _StubProvider(_rows(10, t0=NOW - 600), streamable=False)
    mgr = CandleLaneManager()
    assert mgr.lane_for(prov, "BTCUSDT", "1m") is None
    df = mgr.frame(prov, "BTCUSDT", "1m", 10)         # plain candles()
    assert prov.calls == [(10, None, None)]
    assert len(df) == 10
    # unmanaged CANDLE_LANES default also falls through queue-cleanly.
    assert mgr.lane_for(object(), "BTCUSDT", "1m") is None


def test_manager_stream_lifecycle_events_land_in_cache_without_rest():
    # Real-clock test: the manager's frame() uses the true wall clock,
    # so seed the venue truth at REAL now (the engine does the same).
    t_end = int(time.time()) - 60
    prov = _StubProvider(_rows(50, t0=t_end - 49 * 60))
    prov.stream_script = [
        {"symbol": "BTCUSDT", "timeframe": "1m", "ts": t_end + 60,
         "open": 1, "high": 2, "low": 0.5, "close": 1.9, "volume": 4,
         "closed": False}]

    async def main():
        mgr = CandleLaneManager()
        mgr.attach_loop(asyncio.get_running_loop())
        df = await asyncio.to_thread(mgr.frame, prov, "BTCUSDT", "1m", 50)
        assert prov.calls == [(50, None, None)]
        for _ in range(100):                          # stream task kicks
            await asyncio.sleep(0.01)
            if prov.streams_started:
                break
        assert prov.streams_started == 1
        for _ in range(100):                          # let the script land
            await asyncio.sleep(0.01)
            lane = mgr._lanes[("stub", "BTCUSDT", "1m")]
            with lane._lock:
                if t_end + 60 in lane._rows:
                    break
        warm = await asyncio.to_thread(mgr.frame, prov, "BTCUSDT", "1m",
                                       50)
        assert len(prov.calls) == 1                   # still zero REST
        assert warm["ts"].iloc[-1] == t_end + 60
        assert warm["close"].iloc[-1] == 1.9
        return df

    asyncio.run(asyncio.wait_for(main(), 10))


def test_lane_without_attached_loop_still_serves_and_never_crashes():
    # No engine loop attached: the stream cannot start, so the lane is a
    # cache-only backstop. With venue-fresh rows the warm serve still
    # beats the REST floor; nothing errors, nothing spins.
    t_end = int(time.time()) - 60
    prov = _StubProvider(_rows(40, t0=t_end - 39 * 60))
    mgr = CandleLaneManager()                          # no attach_loop
    df = mgr.frame(prov, "BTCUSDT", "1m", 40)
    assert len(df) == 40
    df2 = mgr.frame(prov, "BTCUSDT", "1m", 40)         # cache without ws
    assert len(prov.calls) == 1                        # warm = zero REST
    assert len(df2) == 40
    assert prov.streams_started == 0                   # no loop, no leak


def test_capacity_caps_rows_by_dropping_the_oldest():
    prov = _StubProvider(_rows(30, t0=NOW - 30 * 60))
    lane, _ = _lane(prov, capacity=40)
    lane.frame(30, clock=lambda: NOW)
    for i in range(20):
        lane.apply_ws({"symbol": "BTCUSDT", "timeframe": "1m",
                       "ts": NOW + 60 * (i + 1), "open": 1, "high": 2,
                       "low": 0, "close": 1.5, "volume": 1,
                       "closed": False})
    with lane._lock:
        assert len(lane._rows) == 40                   # ring capped
        assert min(lane._rows) == NOW - 30 * 60 + 60 * 10   # oldest shed


# ── engine gold pin: the real HTTP route + the real provider + fake venue ──

def test_engine_route_warm_serves_add_zero_klines_rest_weight(monkeypatch):
    """The 429 killer through the REAL wire: FastAPI route ->
    CandleLaneManager -> BinanceProvider -> FakeBinance(WS+REST). After
    ONE cold backfill, warm /api/candles requests never touch the venue
    REST again, and the moving bar is the venue's own kline-stream bar."""
    import json as _json
    from fastapi.testclient import TestClient

    from fake_binance import FakeBinance
    from lse_terminal.engine.server import create_app
    from lse_terminal.providers import binance as _b

    fake = FakeBinance(0, 0)
    import time as _time
    t0 = int(_time.time()) // 60 * 60
    with fake._lock:
        fake.klines = [[(t0 - i * 60) * 1000, "100", "101", "99", "100.5",
                        "12.3", (t0 - i * 60) * 1000 + 59_999, "1200", 44,
                        "0.5", "600", "0"] for i in range(300)]
    fake.start()
    try:
        monkeypatch.setattr(_b, "REST_BASE", fake.rest_url)
        monkeypatch.setattr(_b, "WS_BASE", fake.ws_url)
        app = create_app()
        prov = _b.BinanceProvider()
        app.state.registry.register(prov)      # pinned to the fake venue
        with TestClient(app, base_url="http://127.0.0.1") as client:
            r = client.get("/api/candles", params={
                "provider": "binance", "symbol": "BTCUSDT",
                "timeframe": "1m", "limit": 200})
            assert r.status_code == 200, r.text[:300]
            body = r.json()
            assert body["venue"] == "binance"
            # 199 or 200 bars: the window math is the venue's own (the
            # current-minute offset decides), verified in the provider
            # suite; the zero-weight law below is the point here.
            assert 199 <= len(body["candles"]) <= 200
            # ONE provider backfill (1-2 venue queries: a short page
            # still triggers the preserved gap-chase law) — then frozen.
            n_cold = len(fake.klines_queries)
            assert n_cold >= 1
            # The kline stream subscription dials in (its own socket).
            deadline = _time.monotonic() + 8
            while not any("kline_1m" in c for c in fake.connects):
                if _time.monotonic() > deadline:
                    raise AssertionError(
                        f"no kline stream subscribed: {fake.connects}")
                _time.sleep(0.05)
            # Venue moves the forming bar over the STREAM:
            open_ms = (t0 * 1000)
            fake.send_kline(open_ms, "100", "107.7", "99", "107.7", "30",
                            closed=False)
            for _ in range(3):                          # three warm reads
                r2 = client.get("/api/candles", params={
                    "provider": "binance", "symbol": "BTCUSDT",
                    "timeframe": "1m", "limit": 200})
                assert r2.status_code == 200
            assert len(fake.klines_queries) == n_cold   # ZERO weight added
            assert (r2.json()["candles"][-1][0] == int(_json.dumps(t0))
                    or r2.json()["candles"][-1][0] == t0)
            assert r2.json()["candles"][-1][4] == 107.7  # venue stream bar
            assert r2.json()["candles"][-1][1:5] == [100, 107.7, 99, 107.7]
    finally:
        fake.stop()


def test_never_streamed_lane_heals_with_tails_not_full_reloads():
    """The geo-blocked failure mode (owner 2026-09-21): the venue WS
    dial never comes up, so NO kline event ever lands. Pre-fix the
    none-guard made _stale() permanently false and every warm request
    re-ran the FULL backfill — strictly worse than the plain passthrough
    the lane replaced. Law now: after the same grace horizon since
    birth, warm serves heal with a gap-sized tail refetch, floor-gated.
    """
    prov = _StubProvider(_rows(400, t0=NOW - 400 * 60))
    lane, wall = _lane(prov)
    lane.frame(400, clock=lambda: NOW)                    # cold: full ask
    assert prov.calls == [(400, None, None)]
    # Live stream never arrives; venue bars keep building (REST truth).
    prov.rows += _rows(6, t0=NOW, price=700.0)
    wall.tick(max(_STALE_FLOOR_S, 2 * 60) + 5)            # birth grace passes
    lane.frame(400, clock=lambda: NOW + 300)
    assert prov.calls[-1][0] <= 250                       # a TAIL, not 400
    assert prov.calls[-1][0] >= 8                         # but gap-sized
    assert len(prov.calls) == 2
    df = lane.frame(400, clock=lambda: NOW + 300)
    assert len(prov.calls) == 2                           # floor-gated
    assert df["ts"].iloc[-1] == NOW + 300                 # bridged tail


def test_never_streamed_lane_inside_grace_serves_cache_quietly():
    """Before the grace horizon: no tail noise — a dialing socket is
    not evidence of death (the venue may just be slow to answer)."""
    prov = _StubProvider(_rows(100, t0=NOW - 100 * 60))
    lane, wall = _lane(prov)
    lane.frame(100, clock=lambda: NOW)
    wall.tick(10)                                          # inside grace
    lane.frame(100, clock=lambda: NOW + 60)
    assert prov.calls == [(100, None, None)]               # zero extra


# ── D22: dead stream ≠ frozen pane (owner 2026-09-21: "coinbase is showing
# up and down fast movement of candle but binance is just stiff") ─────────

import lse_terminal.engine.candle_lane as _cl


class _DeadStreamProvider(_StubProvider):
    """A provider whose venue WS is unreachable from this egress (the
    owner's machine vs Binance): the dial refuses immediately, forever."""

    def candle_stream(self, symbols, timeframe):
        self.streams_started += 1
        raise ConnectionRefusedError("venue ws dial refused")


def test_dead_stream_repair_keeps_forming_bar_moving_until_stream_heals():
    # Venue grid: closed bars up to NOW-60 + a forming bar at NOW.
    t0 = NOW - 300 * 60
    stub = _StubProvider(_rows(300, t0=t0, price=50000.0) +
                         [[NOW, 50301.0, 50302.0, 50300.5, 50301.0, 9.0]],
                         tf_s=60)
    stub.__class__ = _DeadStreamProvider      # make the dial dead
    clock = _Wall(); clock.now = 0.0
    lane = CandleLane(stub, "BTCUSDT", "1m", 60, wall=clock)

    # Cold serve = the exact REST backfill; one call, never re-run.
    cold = lane.frame(5000, clock=lambda: NOW + 1)
    assert len(cold) == 301 and stub.calls == [(5000, None, None)]

    # Inside the dial grace the lane is a dialing socket, not a corpse.
    assert not lane.needs_repair()
    assert lane.current_mode() == "degraded"
    clock.tick(_cl._REPAIR_GRACE_S + 1)
    assert lane.needs_repair()               # dead from birth → repair

    # The venue moves; the repair poll must make the cache move with it
    # using 2-bar tail fetches only — never a reload.
    stub.rows[-1][4] = 50355.0               # venue forming close moved
    assert lane.repair_tick()
    assert stub.calls[-1] == (2, None, None)
    assert len(stub.calls) == 2
    warm = lane.frame(10, clock=lambda: NOW + 1)
    assert len(stub.calls) == 2              # warm serve: zero REST
    assert warm.iloc[-1]["close"] == 50355.0
    assert lane.current_mode() == "rest-repair"

    # Second tick also moves (up-and-down motion, not a one-off heal).
    stub.rows[-1][4] = 50290.0
    assert lane.repair_tick()
    assert lane.frame(10, clock=lambda: NOW + 1).iloc[-1]["close"] == 50290.0

    # The venue socket comes back to life → stream is the law again:
    # repair rests, mode reports stream, warm serves stay zero-weight.
    lane.apply_ws({"symbol": "BTCUSDT", "timeframe": "1m", "ts": NOW,
                   "open": 50301.0, "high": 50400.0, "low": 50280.0,
                   "close": 50399.0, "volume": 10.0})
    assert lane.stream_healthy()
    assert not lane.needs_repair()
    assert lane.current_mode() == "stream"
    n_calls = len(stub.calls)
    assert lane.frame(10, clock=lambda: NOW + 1).iloc[-1]["close"] == 50399.0
    assert len(stub.calls) == n_calls


def test_repair_refusal_is_noted_not_swallowed_and_recovers():
    stub = _StubProvider(_rows(300, t0=NOW - 300 * 60, price=1.0) +
                         [[NOW, 301.0, 302.0, 300.0, 301.0, 1.0]])
    clock = _Wall(); clock.now = _cl._REPAIR_GRACE_S + 1
    lane = CandleLane(stub, "BTCUSDT", "1m", 60, wall=clock)
    stub.raise_on = RuntimeError("429 slow down")
    assert not lane.repair_tick()
    assert "429" in lane._repair_note
    assert lane.current_mode() == "degraded"  # refused poll ≠ repair
    stub.raise_on = None
    stub.rows[-1][4] = 350.0
    assert lane.repair_tick()
    assert lane._repair_note == ""
    assert lane.current_mode() == "rest-repair"


def test_repair_loop_polls_while_dead_and_self_terminates_on_health(
        monkeypatch):
    monkeypatch.setattr(_cl, "_REPAIR_POLL_S", 0.02)
    monkeypatch.setattr(_cl, "_REPAIR_ERR_BACKOFF_S", 0.02)
    stub = _StubProvider(_rows(300, t0=NOW - 300 * 60, price=5.0) +
                         [[NOW, 306.0, 306.5, 305.5, 306.0, 1.0]])
    stub.__class__ = _DeadStreamProvider

    async def _run():
        mgr = CandleLaneManager()
        mgr.attach_loop(asyncio.get_running_loop())
        lane = CandleLane(stub, "BTCUSDT", "1m", 60)
        lane._born = lane._wall() - 999      # past the dial grace
        mgr._ensure_repair(lane)
        await asyncio.sleep(0.15)            # several polls should land
        polls = len([c for c in stub.calls if c[0] == 2])
        assert polls >= 2                    # motion is periodic, 2-bar
        assert lane.current_mode() == "rest-repair"
        # A real kline event arrives: the loop must stop on its own.
        lane.apply_ws({"symbol": "BTCUSDT", "timeframe": "1m", "ts": NOW,
                       "open": 306.0, "high": 307.0, "low": 305.0,
                       "close": 306.9, "volume": 2.0})
        await asyncio.sleep(0.1)
        assert getattr(lane, "_repair_running", False) is False
        calls_at_stop = len(stub.calls)
        await asyncio.sleep(0.1)
        assert len(stub.calls) == calls_at_stop   # truly stopped
    asyncio.run(_run())


def test_failed_ws_dial_backs_off_instead_of_spinning():
    stub = _StubProvider(_rows(300, t0=NOW - 300 * 60))
    stub.__class__ = _DeadStreamProvider

    async def _run():
        mgr = CandleLaneManager()
        mgr.attach_loop(asyncio.get_running_loop())
        p = stub
        mgr.frame(p, "BTCUSDT", "1m", limit=10)      # cold + arm stream
        await asyncio.sleep(0.05)                    # dial ran + died
        await asyncio.sleep(0.05)
        assert stub.streams_started == 1
        mgr._ensure_stream(mgr.lane_for(p, "BTCUSDT", "1m"))
        await asyncio.sleep(0.05)
        assert stub.streams_started == 1             # gate: no redial spin
        lane = mgr.lane_for(p, "BTCUSDT", "1m")
        lane._next_dial_wall = 0.0                    # cool-down elapsed
        mgr._ensure_stream(lane)
        await asyncio.sleep(0.05)
        assert stub.streams_started == 2             # retries DO resume
    asyncio.run(_run())
