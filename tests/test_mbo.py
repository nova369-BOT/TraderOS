"""Tests for the vault MBO provider (F1 Depth Heat, gate H9): the rail's
proven client logic, moved engine-side. Contract mapping, L3→L2
reconstruction (NEW adds / DELETE pulls / CHANGE doesn't move size),
seq-gated dedupe across overlapping windows, honest NotSupported when the
key has no entitlement — all offline through the `_fetch` seam."""

import asyncio
import json
import time
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from lse_terminal.contracts import DEPTH_DELTA, DEPTH_SNAPSHOT, NotSupported
from lse_terminal.providers import mbo as mbo_mod
from lse_terminal.providers.mbo import MboProvider, MboUnavailable

FIXTURE = json.loads(
    (Path(__file__).parent / "data" / "mbo_fixture.json").read_text())


def make_provider(events_by_call, symbols=None):
    """Provider against a fake vault: `_fetch` serves the scripted payloads;
    the contracts status is injected unless the test wants to build it."""
    p = MboProvider()
    calls = []
    state = {"n": 0}

    def fetch(path, params):
        calls.append((path, dict(params)))
        if path == "/mbo/contracts":
            return FIXTURE["contracts"]
        if path == "/mbo/events":
            batch = events_by_call(state["n"])
            state["n"] += 1
            return batch
        raise AssertionError(f"unexpected vault path: {path}")

    p._fetch = fetch
    if symbols is not None:
        p._status_cache = (time.time(), {"available": True, "symbols": symbols})
    return p, calls


# ── catalog / entitlement ─────────────────────────────────────────────────


def test_contract_map_builds_canonical_and_futures_forms():
    p, calls = make_provider(lambda n: {"events": []}, symbols=None)
    # No injected status: the map is built from the contracts door.
    st = p._status()
    assert st["available"] is True
    assert st["symbols"]["ES"] == "ESH26"
    assert st["symbols"]["ES.F"] == "ESH26"
    assert st["symbols"]["XAU/USD"] == "GCZ26"
    assert st["symbols"]["GC.F"] == "GCZ26"
    rows = p.search("es")
    assert any(i.symbol == "ES.F" for i in rows)


def test_unentitled_key_is_honestly_unsupported():
    def fetch(path, params):
        raise MboUnavailable("this key's plan does not include MBO depth")
    p = MboProvider()
    p._fetch = fetch
    assert p.search() == []
    with pytest.raises(NotSupported, match="MBO"):
        p.depth_history("ES.F", 0, 10)
    with pytest.raises(NotSupported):
        p.depth_stream(["ES.F"])     # eager, per the contract rule


def test_unmapped_symbol_names_the_coverage():
    p, _ = make_provider(lambda n: {"events": []},
                         symbols={"ES.F": "ESH26"})
    with pytest.raises(NotSupported, match="no MBO capture for NQ.F"):
        p.depth_history("NQ.F", 0, 10)


# ── L3 → L2 reconstruction ────────────────────────────────────────────────


def test_history_reconstruction_and_seq_dedupe():
    batches = [FIXTURE["window1"], FIXTURE["window2"], {"events": []}]
    p, _ = make_provider(lambda n: batches[min(n, len(batches) - 1)],
                         symbols={"ES.F": "ESH26"})
    # Span > 60 s so the door is walked as two windows (the fake vault
    # serves the scripted batch per call; columns come from event ts).
    events = p.depth_history("ES.F", 999.0, 1064.0, column_ms=1000)
    assert [e.type for e in events] == [DEPTH_SNAPSHOT, DEPTH_DELTA]

    snap = events[0]
    # NEW +10, NEW +5, CHANGE ignored (no order id on this door),
    # DELETE -4 → 11 resting on the bid; the ask stays at 7.
    assert snap.bids == [(5000.0, 11.0)]
    assert snap.asks == [(5001.0, 7.0)]

    delta = events[1]
    # seq 4/5 rode BOTH windows and were applied once: the delta carries
    # only seq 6-8 — new ask level, the 5001.0 ask pulled (explicit 0),
    # and a fresh bid below.
    assert delta.bids == [(4999.5, 12.0)]
    assert (5001.0, 0.0) in delta.asks and (5001.5, 3.0) in delta.asks


def test_recorder_restart_resets_the_seq_gate():
    # Window 2's max seq collapses below half the watermark → the gate
    # resets and the new sequence is applied instead of dropped.
    restart = {"events": [
        {"seq": 1, "ts": 1005.0, "price": 5002.0, "size": 2,
         "type": "NEW", "side": "SELL"}]}
    batches = [FIXTURE["window1"], restart, {"events": []}]
    p, _ = make_provider(lambda n: batches[min(n, len(batches) - 1)],
                         symbols={"ES.F": "ESH26"})
    events = p.depth_history("ES.F", 999.0, 1064.0, column_ms=1000)
    last = events[-1]
    assert (5002.0, 2.0) in last.asks


def test_live_stream_snapshot_then_deltas(monkeypatch):
    monkeypatch.setattr(mbo_mod, "POLL_S", 0.01)
    batches = [FIXTURE["window1"], FIXTURE["window2"], {"events": []}]
    p, _ = make_provider(lambda n: batches[min(n, len(batches) - 1)],
                         symbols={"ES.F": "ESH26"})

    async def run():
        agen = p.depth_stream(["ES.F"])
        out = []
        try:
            async for ev in agen:
                out.append(ev)
                if len(out) >= 2:
                    break
        finally:
            await agen.aclose()
        return out

    events = asyncio.run(run())
    assert events[0].type == DEPTH_SNAPSHOT
    assert events[0].bids == [(5000.0, 11.0)]
    assert events[1].type == DEPTH_DELTA
    assert (4999.5, 12.0) in events[1].bids


def test_candles_are_honestly_not_this_source():
    p = MboProvider()
    with pytest.raises(ValueError, match="depth only"):
        p.candles("ES.F", "1m")


# ── API integration: fail-through + capability listing ────────────────────


@pytest.fixture()
def client(tmp_path, monkeypatch):
    from lse_terminal.engine.server import create_app
    monkeypatch.setenv("LSE_TERMINAL_CONFIG_DIR", str(tmp_path))
    monkeypatch.delenv("LSE_API_KEY", raising=False)
    with TestClient(create_app(), base_url="http://127.0.0.1") as c:
        yield c


def test_mbo_listed_and_keyless_symbol_degrades_with_reason(client):
    provs = {p["name"]: p for p in client.get("/api/providers").json()}
    assert "mbo" in provs
    caps = provs["mbo"]["capabilities"]
    assert "depth_history" in caps and "depth_stream" in caps
    assert provs["mbo"]["configured"] is False   # no key in this env
    # Futures symbol with no entitled key: a clean 404 whose reason names
    # the MBO door — never silence, never synthesis.
    r = client.get("/api/orderflow/depth",
                   params={"symbol": "ES.F", "from": 0, "to": 10})
    assert r.status_code == 404
    assert "mbo" in r.json()["detail"]
