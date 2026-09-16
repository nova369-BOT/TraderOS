"""Tests for the crypto L2 adapter (F1 Depth Heat, gate H8b): symbol map,
snapshot/delta shaping, exchange-stamped trade sides, Coinbase→Kraken venue
failover — all driven through the provider's watch-loop seam against the
recorded fixture, no network. The live path additionally requires the ccxt
dependency to be pinned (asserted here so it cannot silently drift)."""

import asyncio
import json
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from lse_terminal.contracts import (
    DEPTH_DELTA,
    DEPTH_SNAPSHOT,
    NotSupported,
    TRADE_BUY,
    TRADE_SELL,
    TRADE_UNKNOWN,
    DepthEvent,
    TradeEvent,
)
from lse_terminal.providers.crypto_l2 import (
    CRYPTO_SYMBOLS,
    VENUES,
    CryptoL2Provider,
    normalize_symbol,
)

FIXTURE = json.loads(
    (Path(__file__).parent / "data" / "crypto_l2_fixture.json").read_text())


def make_provider(book=None, trades=None, fail_venues=frozenset()):
    """Provider whose raw watch loops replay the fixture (or raise for the
    venues listed in fail_venues)."""
    p = CryptoL2Provider()
    p._backoff_base = 0.01          # fast failover in tests
    calls = []

    async def watch_book(venue, market, limit):
        calls.append(("book", venue, market))
        if venue in fail_venues:
            raise RuntimeError(f"{venue} feed unavailable")
        for ob in (book if book is not None else FIXTURE["book"]):
            yield ob

    async def watch_trades(venue, market):
        calls.append(("trades", venue, market))
        if venue in fail_venues:
            raise RuntimeError(f"{venue} feed unavailable")
        for batch in (trades if trades is not None else FIXTURE["trades"]):
            yield batch

    p._watch_book = watch_book
    p._watch_trades = watch_trades
    return p, calls


def collect(symbol="BTC/USD", n=12, min_trades=0, **kwargs):
    """Collect until n events (or min_trades TradeEvents) seen, capped so a
    regression fails fast instead of hanging."""
    p, calls = make_provider(**kwargs)

    async def run():
        agen = p.depth_stream([symbol])
        out = []
        try:
            async for item in agen:
                out.append(item)
                n_trades = sum(isinstance(e, TradeEvent) for e in out)
                if len(out) >= n and n_trades >= min_trades:
                    break
                assert len(out) <= 64, "stream produced no usable events"
        finally:
            await agen.aclose()
        return out

    return asyncio.run(run()), p, calls


# ── symbol map ─────────────────────────────────────────────────────────────


def test_symbol_normalization_and_map():
    assert normalize_symbol("BTC/USD") == "BTCUSD"
    assert normalize_symbol("btc-usd") == "BTCUSD"
    assert normalize_symbol("BTCUSD") == "BTCUSD"
    # every mapped pair resolves to the same market id on both venues
    for sym, market in CRYPTO_SYMBOLS.items():
        assert "/" in market and market.endswith("/USD")
    assert VENUES[0] == "coinbase"      # primary: US-regulated USD venue
    assert VENUES[1] == "kraken"        # fallback


def test_search_lists_mapped_pairs_with_venue_meta():
    p = CryptoL2Provider()
    rows = p.search("btc")
    assert [i.symbol for i in rows] == ["BTCUSD"]
    assert rows[0].meta["venues"] == ["coinbase", "kraken"]
    assert rows[0].meta["live"] is True
    assert len(p.search("")) == len(CRYPTO_SYMBOLS)


def test_unknown_symbol_raises_eagerly():
    p = CryptoL2Provider()
    with pytest.raises(ValueError, match="no public L2 mapping"):
        p.depth_stream(["EURUSD"])     # at CALL time, per the contract rule


def test_depth_history_is_honestly_live_only():
    p = CryptoL2Provider()
    with pytest.raises(NotSupported, match="no public L2 history"):
        p.depth_history("BTCUSD", 0, 10)
    # ...and the capability listing reflects that (depth_stream only).
    caps = p.capabilities()
    assert "depth_stream" in caps and "depth_history" not in caps


# ── stream shaping ─────────────────────────────────────────────────────────


def test_snapshot_first_then_deltas_and_sides():
    items, p, calls = collect(min_trades=4)
    depth = [e for e in items if isinstance(e, DepthEvent)]
    trades = [e for e in items if isinstance(e, TradeEvent)]
    assert depth and depth[0].type == DEPTH_SNAPSHOT
    assert all(e.type == DEPTH_DELTA for e in depth[1:])
    assert depth[0].symbol == "BTCUSD"
    # Levels arrive as (price, size) floats, bids/asks intact.
    assert depth[0].bids[0] == (67000.5, 1.25)
    assert depth[0].asks[0] == (67001.0, 0.8)
    # Exchange-stamped trade sides map through verbatim.
    sides = [t.side for t in trades]
    assert TRADE_BUY in sides and TRADE_SELL in sides
    assert TRADE_UNKNOWN in sides        # the blank-side print stays labelled
    assert all(t.size > 0 for t in trades)
    # Both pumps hit the PRIMARY venue first.
    assert ("book", "coinbase", "BTC/USD") in calls
    assert ("trades", "coinbase", "BTC/USD") in calls


def test_venue_failover_to_kraken():
    items, p, calls = collect(n=3, fail_venues=frozenset({"coinbase"}))
    depth = [e for e in items if isinstance(e, DepthEvent)]
    assert depth and depth[0].type == DEPTH_SNAPSHOT
    # Coinbase was tried (and failed) first; the stream then flowed via Kraken.
    assert ("book", "coinbase", "BTC/USD") in calls
    assert ("book", "kraken", "BTC/USD") in calls
    book_venues = [v for kind, v, _ in calls if kind == "book"]
    assert book_venues.index("coinbase") < book_venues.index("kraken")


def test_dependency_is_pinned():
    # H8b gate: ccxt is a DECLARED PINNED dependency (event shapes are what
    # the failover logic is tested against).
    pyproject = (Path(__file__).parent.parent / "pyproject.toml").read_text()
    assert 'ccxt==' in pyproject


# ── API integration: live-only degradation ─────────────────────────────────


@pytest.fixture()
def client(tmp_path, monkeypatch):
    from lse_terminal.engine.server import create_app
    monkeypatch.setenv("LSE_TERMINAL_CONFIG_DIR", str(tmp_path))
    monkeypatch.delenv("LSE_API_KEY", raising=False)
    with TestClient(create_app(), base_url="http://127.0.0.1") as c:
        yield c


def test_live_only_symbol_gets_honest_empty_fill(client):
    # No source carries crypto L2 HISTORY, but a live feed exists, so the
    # pane must open live (200 + live_only), not show "no depth data".
    r = client.get("/api/orderflow/depth",
                   params={"symbol": "BTC/USD", "from": 0, "to": 10})
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["live_only"] is True
    assert body["events"] == []
    assert body["provider"] == "cryptol2"
    assert body["demo"] is False
    # The book endpoint degrades honestly too (no history to rebuild from).
    assert client.get("/api/orderflow/book",
                      params={"symbol": "BTC/USD"}).status_code == 404


def test_crypto_caps_listed(client):
    provs = {p["name"]: p for p in client.get("/api/providers").json()}
    assert "cryptol2" in provs
    caps = provs["cryptol2"]["capabilities"]
    assert "depth_stream" in caps and "depth_history" not in caps
    assert provs["cryptol2"]["configured"] is True
