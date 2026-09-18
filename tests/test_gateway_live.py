"""Opt-in live-network end-to-end against the REAL Binance USDⓈ-M venue.

This module never touches the network unless EDGEDEPTH_LIVE=1 is exported;
offline (and on this scaffold/CI) it skips. It exists because the in-sandbox
egress policy blocks Binance, so proof-on-real-networks is a deliberate,
documented operation — see docs/edgedepth-integration/99-real-network-checklist.md.

Unlike tests/test_gateway_e2e.py (which points the gateway at a protocol-
faithful fake), NOTHING here is stubbed: the actual Go gateway process
dials fapi.binance.com itself, and the assertions pass only when the real
venue behaves like a venue.

Manual run:
    EDGEDEPTH_LIVE=1 \\
    EDGEDEPTH_TEST_GATEWAY_BIN=/path/to/edgedepth-gateway \\
        .venv/bin/python -m pytest tests/test_gateway_live.py -v -s
Timeouts are generous by design (real network latency + 30s REST polls);
the whole test is wrapped in a hard cap so it hangs never on dead networks.
"""

from __future__ import annotations

import asyncio
import os
import shutil
import time
from pathlib import Path

import pytest

from lse_terminal.engine.gateway import GatewaySupervisor, RUNNING
from lse_terminal.providers.edgedepth.client import (
    CandleEvent,
    EdgeDepthClient,
    StatEvent,
    Ticker24hBatch,
)
from lse_terminal.contracts import DepthEvent as _DepthEvent
from lse_terminal.contracts import TradeEvent

LIVE = os.environ.get("EDGEDEPTH_LIVE", "") in ("1", "true", "yes")


def _gateway_binary():
    explicit = os.environ.get("EDGEDEPTH_TEST_GATEWAY_BIN", "")
    if explicit and Path(explicit).is_file():
        return explicit
    return shutil.which("edgedepth-gateway")


GW_BIN = _gateway_binary()
pytestmark = [
    pytest.mark.skipif(not LIVE,
                       reason="opt-in live network test (set EDGEDEPTH_LIVE=1; "
                              "see docs/edgedepth-integration/"
                              "99-real-network-checklist.md)"),
    pytest.mark.skipif(GW_BIN is None,
                       reason="no edgedepth-gateway binary "
                              "(see docs/edgedepth-integration/01-gateway-proof.md)"),
    pytest.mark.skipif(os.name == "nt", reason="POSIX-only e2e"),
]

_HARD_CAP_S = 240.0


def test_live_binance_full_chain(tmp_path):
    """The real venue, through the real gateway, decoded by the real client:
    book SNAPSHOT + DELTAs, real trades with real sides, stats (mark/OI),
    trade-built live candles, historical candles, and the 24h ticker."""
    started = time.monotonic()
    addr = "127.0.0.1:18091"   # alternate port: never the engine default
    sup = GatewaySupervisor(root=tmp_path / "cfg", env={
        "EDGEDEPTH_GATEWAY_URL": "",
        "EDGEDEPTH_GATEWAY_BIN": GW_BIN,
        "EDGEDEPTH_GATEWAY_ADDR": addr,
        "EDGEDEPTH_GATEWAY_PATH": "/ws",
        "EDGEDEPTH_GATEWAY_AUTO": "1",
        # NOTE: no BINANCE_REST/BINANCE_WS overrides — the child dials the
        # REAL fapi.binance.com / fstream.binance.com. That is the point.
        "EDGEDEPTH_LOG": "info",
    })
    sup.start()
    client = EdgeDepthClient(f"ws://{addr}/ws", backoff_base=0.5,
                             backoff_cap=3.0)
    try:
        assert sup.status()["state"] == RUNNING
        result = asyncio.run(asyncio.wait_for(
            _collect(client), timeout=_HARD_CAP_S - 20))
    finally:
        sup.stop()
        st = sup.status()
        assert st["state"] == "STOPPED" and st["pid"] is None
    got = result
    assert got["snap"], "no book SNAPSHOT from the real venue"
    assert got["deltas"], "no book DELTAs"
    assert got["trades"] >= 3, "fewer than three real trades in the window"
    assert got["sides"] == {"BUY", "SELL"}, (
        "both aggressor sides expected in a live window, got "
        f"{sorted(got['sides'])} (side mapping survives the venue)")
    assert got["stat"], "no stats frame (mark price / open interest)"
    assert got["stat"].mark_price > 0
    assert got["stat"].open_interest_usd > 0
    oc = got["candle"]
    assert oc and oc.timeframe_s == 60 and oc.high >= oc.low > 0
    assert got["ticker"], "no 24h ticker batch"
    entry = next(e for e in got["ticker"].entries if e.symbol == "BTCUSDT")
    assert entry.last_price > 0
    assert len(got["hist"]) == 5
    hc = got["hist"]
    assert all(hc[i].timestamp_ms < hc[i + 1].timestamp_ms for i in range(4))
    assert time.monotonic() - started < _HARD_CAP_S


async def _collect(client: EdgeDepthClient):
    got: dict = {"snap": None, "deltas": [], "trades": 0, "sides": set(),
                 "stat": None, "candle": None, "ticker": None, "hist": None}

    async def feed():
        async for ev in client.feed_stream("BTCUSDT", candle_tf_s=60):
            if isinstance(ev, _DepthEvent):
                if ev.type == "SNAPSHOT" and got["snap"] is None:
                    got["snap"] = ev
                elif ev.type == "DELTA" and got["snap"] is not None:
                    got["deltas"].append(ev)
            elif isinstance(ev, TradeEvent):
                got["trades"] += 1
                got["sides"].add(ev.side)
            elif isinstance(ev, StatEvent):
                if ev.mark_price > 0 and got["stat"] is None:
                    got["stat"] = ev
            elif isinstance(ev, CandleEvent):
                if ev.timeframe_s == 60 and got["candle"] is None:
                    got["candle"] = ev
            if _full_enough(got):
                return

    async def tickers():
        async for batch in client.ticker24h_stream():
            if isinstance(batch, Ticker24hBatch) and batch.entries:
                if any(e.symbol == "BTCUSDT" for e in batch.entries):
                    got["ticker"] = batch
                    return

    async def history():
        got["hist"] = await client.fetch_candles("BTCUSDT", 60, limit=5)

    await asyncio.gather(feed(), tickers(), history())
    return got


def _full_enough(got: dict) -> bool:
    return (got["snap"] is not None and len(got["deltas"]) >= 2
            and got["trades"] >= 3 and len(got["sides"]) == 2
            and got["stat"] is not None and got["candle"] is not None)
