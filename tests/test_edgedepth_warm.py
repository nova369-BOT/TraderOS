"""Latest-frame memo + boot prewarm for the EdgeDepth provider.

Every pane tap on this book used to pay the full round trip again
(engine -> gateway WS dial, gateway -> Binance REST). The bars behind
the forming one are immutable, so those repeat fetches bought nothing:
latest frames (start/end unset) are memoized per (symbol, tf, limit)
for a TTL bounded by the bar itself, and the chart's tail-reload — which
always carries ``start`` — never touches the memo. Prewarm fills the
memo at boot so even the FIRST tap is a memo hit.
"""

import pytest

from lse_terminal.contracts import NotSupported
from lse_terminal.providers.edgedepth import provider as prov_mod
from lse_terminal.providers.edgedepth.provider import (
    EdgeDepthProvider,
    _frame_ttl_s,
)
from lse_terminal.providers.edgedepth.wire import Candle


class CountingClient:
    """Stands in for EdgeDepthClient: counts venue fetches per call."""

    def __init__(self, rows=5):
        self.calls = []
        self.rows = rows
        self.url = "ws://fake-gateway"  # interpolated into error messages

    async def fetch_candles(self, symbol, timeframe_s, limit=500,
                            end_ms=None):
        self.calls.append((symbol, timeframe_s, limit))
        return [
            Candle(open=100 + i, high=101 + i, low=99 + i, close=100.5 + i,
                   volume=7.0, timestamp_ms=(1_700_000_000 + i * 60) * 1000,
                   timeframe=timeframe_s, final=True)
            for i in range(self.rows)
        ]


@pytest.fixture
def provider(monkeypatch):
    # The supervisor is out of scope here: pretend the gateway is up.
    monkeypatch.setattr(prov_mod, "ensure_gateway", lambda url=None: {})
    p = EdgeDepthProvider()
    p.client = CountingClient()
    return p


def test_latest_frame_is_memoized(provider):
    first = provider.candles("BTCUSDT", "1h", limit=5000)
    second = provider.candles("BTCUSDT", "1h", limit=5000)
    assert len(first) == 5 and len(second) == 5
    # one venue fetch across two pane taps
    assert provider.client.calls == [("BTCUSDT", 3600, 5000)]


def test_windowed_calls_bypass_the_memo(provider):
    """Tail reloads and scrollback carry start: freshness-critical, unique-
    shaped, never served from memory."""
    provider.candles("ETHUSDT", "1m")                       # warms the memo
    provider.candles("ETHUSDT", "1m", start="2024-01-01")
    provider.candles("ETHUSDT", "1m", start="2024-01-01")
    calls = len(provider.client.calls)
    provider.candles("ETHUSDT", "1m")                       # memo hit
    assert len(provider.client.calls) == calls  # unchanged
    assert calls == 3  # 1 latest + 2 windowed, none of the windowed cached


def test_ttl_expiry_refetches(provider):
    provider._ttl_override = 0.0  # everything is instantly stale
    provider.candles("SOLUSDT", "5m")
    provider.candles("SOLUSDT", "5m")
    assert len(provider.client.calls) == 2


def test_memo_returns_copies(provider):
    """A mutate-happy consumer (indicator maths) must never corrupt the
    frame the next tap sees."""
    df = provider.candles("ADAUSDT", "1m")
    df.loc[0, "close"] = -1.0
    again = provider.candles("ADAUSDT", "1m")
    assert again.loc[0, "close"] != -1.0
    assert len(provider.client.calls) == 1


def test_ttl_bounded_by_bar():
    # 1m bars: short TTL (matching the chart's own 5s reload cadence);
    # 1h bars: capped at one minute — paid once per switch, all day.
    assert _frame_ttl_s(60) < 60 / 2
    assert _frame_ttl_s(3600) == 60.0
    assert _frame_ttl_s(86400) == 60.0


def test_gateway_empty_answer_still_raises(provider):
    provider.client.rows = 0
    with pytest.raises(NotSupported, match="no history"):
        provider.candles("BTCUSDT", "1h")


def test_prewarm_fills_the_whole_book(provider):
    provider.prewarm()
    prov_syms = prov_mod.SYMBOLS
    # 8 symbols x 6 timeframes = every first-tap shape covered
    assert len(provider._frame_cache) == len(prov_syms) * len(prov_mod._TIMEFRAMES)
    before = len(provider.client.calls)
    df = provider.candles("LINKUSDT", "4h", limit=5000)
    assert len(df) == 5
    assert len(provider.client.calls) == before  # served from memo


def test_prewarm_tolerates_a_missing_gateway(provider, monkeypatch):
    """A supervisor that cannot bring the gateway up surfaces as
    NotSupported inside prewarm, which must simply leave the memo empty —
    the blocking path reports the same reason to the user, unchanged."""
    from lse_terminal.engine.gateway import GatewayUnavailable

    def _gone(url=None):
        raise GatewayUnavailable("no executable")

    monkeypatch.setattr(prov_mod, "ensure_gateway", _gone)
    provider.prewarm()  # must not raise; memo stays empty
    assert provider._frame_cache == {}
