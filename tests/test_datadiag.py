"""datadiag — the T1..T8 pipeline telemetry (recovery §7/§20/§26/§27).

Pins: recency-based health (a silent 'live' provider is STALE by rule,
socket state never speaks), per-kind last-event ages, latency segment
percentiles, browser-sample ingestion (good rows kept, malformed dropped),
and the rule that growling clock skew can never fake the report (absurd
segments are clamped out, not shown).
"""

import time

from lse_terminal.engine.datadiag import Diag, STALE_AFTER_S


def test_health_marks_silence_stale():
    d = Diag()
    d.watch_open("binance")          # a waiting consumer is what STALE means
    d.observe("binance", "BTCUSDT", time.time(), kind="trade")
    assert d.health()["providers"]["binance"]["data_state"] == "LIVE"
    # rewind the producer's last stamp: 20 silent seconds == dead pipe
    d._last_norm["binance"] -= (STALE_AFTER_S + 5)
    h = d.health()["providers"]["binance"]
    assert h["stale"] and h["data_state"] == "STALE"
    assert h["last_event_age_s"] > STALE_AFTER_S
    # provider with nothing subscribed is IDLE, never falsely alarmed
    d.watch_close("binance")
    assert d.health()["providers"]["binance"]["data_state"] == "IDLE"


def test_health_tracks_kinds_independently():
    d = Diag()
    d.observe("coinbase", "BTCUSD", time.time(), kind="book")
    kinds = d.health()["providers"]["coinbase"]["by_kind"]
    assert "book" in kinds and "trade" not in kinds
    # only the provider's OWN activity ever lands under its name
    assert "edgedepth" not in d.health()["providers"]


def test_health_reports_recency_not_sockets():
    d = Diag()
    d.observe("binance", "BTCUSDT", time.time() - 0.2, kind="trade")
    h = d.health()["providers"]["binance"]
    assert "events_per_s_60s" in h and "events_lifetime" in h
    assert "socket" not in "".join(h.keys())


def test_latency_segments_percentiles_and_units():
    d = Diag()
    base = time.time()
    for lag_ms in (5, 10, 20, 40):
        d._norm[("binance", "BTCUSDT")].append if False else None
        d.observe("binance", "BTCUSDT", base - lag_ms / 1000, kind="trade")
    d.observe("binance", "BTCUSDT", base - 0.05, kind="trade")
    lat = d.latency("binance")
    s1 = lat["stats"]["s1_venue_to_norm"]
    assert s1["n"] == 5
    assert s1["median"] >= 5
    assert lat["unit"] == "ms"
    assert "s4_browser_render" in lat["segments"]


def test_browser_samples_feed_render_segments():
    d = Diag()
    now = time.time()
    d.ingest_browser([{
        "provider": "coinbase", "symbol": "BTCUSD", "recv": now - 0.02,
        "render": now, "emit": now - 0.05, "venue_ts": now - 0.2}])
    lat = d.latency("coinbase")
    assert lat["stats"]["s4_browser_render"]["n"] == 1
    assert lat["stats"]["s5_e2e"]["n"] == 1
    # garbage rows are dropped, never crash the report
    d.ingest_browser([{"provider": "coinbase"}, {"no": "shape"}, None, 7])
    assert d.latency("coinbase")["stats"]["s4_browser_render"]["n"] == 1


def test_absurd_clock_skew_never_reaches_the_report():
    d = Diag()
    now = time.time()
    # a 10-hour "latency" is a clock argument, not a measurement
    d.ingest_browser([{
        "provider": "binance", "symbol": "X", "recv": now - 36000,
        "render": now, "emit": now - 36001, "venue_ts": now - 36002}])
    lat = d.latency("binance")
    assert lat["stats"]["s5_e2e"]["n"] == 0
