"""/api/ws — the coalesced fan-out (recovery §22, precondition of §26 pins).

A fast crypto book used to serialize one JSON frame per trade and the
browser rendered its whole candle model per frame — the measured frontend
bottleneck. These tests pin the new contract:

- wire shape is {"type": "ticks", "ticks": [...]} (batch), with the
  singular legacy shape reserved for the error path;
- coalescing: latest state per symbol wins inside each ~30 Hz window —
  a 100-print burst must ship a small number of frames, never 100;
- provenance rides every tick (provider + venue + emit_ts, §25);
- provider errors still surface as {"type": "error"} and close the dance.

The provider itself is a fake tick source injected into the registry AFTER
app creation (the closure keeps the same registry instance) — no network.
"""

import asyncio
import time

import pytest
from fastapi.testclient import TestClient

from lse_terminal.contracts import Provider, NotSupported
from lse_terminal.engine.server import create_app


class BurstProvider(Provider):
    name = "burstfake"
    title = "Burst fake (test)"
    venue = "fakevenue"
    deterministic = True

    def search(self, query="", limit=50):
        return []

    def candles(self, symbol, timeframe, limit=500, start=None, end=None):
        raise NotSupported("nope")

    def stream(self, symbols):
        async def _gen():
            async for t in self._script:
                yield t
        return _gen()


def _app_with_burst(script):
    app = create_app()
    # the route closures hold this same registry instance
    bp = BurstProvider()
    bp._script = _script(script)
    app.state.registry.register(bp)
    return app


async def _script(items):
    for x in items:
        if isinstance(x, BaseException):
            raise x
        yield x


def test_coalesced_batch_latest_state_wins():
    burst = [{"symbol": "BTCUSDT", "price": float(i), "ts": 1.0,
              "volume": 1.0, "side": "BUY"} for i in range(1, 101)]
    burst.append({"symbol": "BTCUSDT", "price": 999.0, "ts": 1.0,
                  "volume": 1.0, "side": "SELL"})
    app = _app_with_burst(burst)
    client = TestClient(app)
    with client.websocket_connect(
            "/api/ws?provider=burstfake&symbols=BTCUSDT",
            headers={"host": "localhost"}) as ws:
        frames = []
        seen_prices = []
        deadline = time.time() + 3.0
        while time.time() < deadline:
            try:
                m = ws.receive_json()
            except Exception:
                break
            frames.append(m)
            assert m["type"] == "ticks"            # batch, not per-print
            for t in m["ticks"]:
                seen_prices.append(t["price"])
        assert seen_prices, "no frames at all"
        # 101 raw prints coalesced into a small number of wire frames while
        # the emitter's flush ran
        n_ticks = sum(len(m["ticks"]) for m in frames)
        assert n_ticks < len(burst), "every print shipped its own frame"
        assert seen_prices[-1] == 999.0            # newest state arrived
        # provenance (§25) on every frame
        t0 = frames[0]["ticks"][0]
        assert t0["provider"] == "burstfake"
        assert t0["venue"] == "fakevenue"
        assert isinstance(t0["emit_ts"], float)


def test_error_item_still_surfaces_and_closes():
    app = _app_with_burst([RuntimeError("venue exploded")])
    client = TestClient(app)
    with client.websocket_connect(
            "/api/ws?provider=burstfake&symbols=BTCUSDT",
            headers={"host": "localhost"}) as ws:
        m = ws.receive_json()
        assert m["type"] == "error"
        assert "venue exploded" in m["message"]


def test_two_symbols_both_move_in_dependent_batches():
    burst = []
    for i in range(30):
        burst.append({"symbol": "AAA", "price": float(i), "ts": 1.0,
                      "volume": 1, "side": "BUY"})
        burst.append({"symbol": "BBB", "price": float(i * 2), "ts": 1.0,
                      "volume": 1, "side": "SELL"})
    app = _app_with_burst(burst)
    client = TestClient(app)
    with client.websocket_connect(
            "/api/ws?provider=burstfake&symbols=AAA,BBB",
            headers={"host": "localhost"}) as ws:
        seen = {"AAA": None, "BBB": None}
        frames = 0
        deadline = time.time() + 3.0
        while time.time() < deadline and (seen["AAA"] is None
                                          or seen["BBB"] is None):
            try:
                m = ws.receive_json()
            except Exception:
                break
            frames += 1
            for t in m["ticks"]:
                seen[t["symbol"]] = t["price"]
        assert seen["AAA"] == 29.0
        assert seen["BBB"] == 58.0
        assert frames < 5
