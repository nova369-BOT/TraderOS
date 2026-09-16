"""The extension contracts. Everything pluggable in the terminal implements one of these."""

from lse_terminal.contracts.types import (
    CANDLE_COLUMNS,
    DEPTH_DELTA,
    DEPTH_SNAPSHOT,
    TRADE_BUY,
    TRADE_INFERRED_BUY,
    TRADE_INFERRED_SELL,
    TRADE_SELL,
    TRADE_UNKNOWN,
    DepthEvent,
    Instrument,
    Quote,
    TradeEvent,
)
from lse_terminal.contracts.provider import NotSupported, Provider
from lse_terminal.contracts.indicator import IndicatorSpec, all_specs, compute, indicator

__all__ = [
    "CANDLE_COLUMNS",
    "DEPTH_DELTA",
    "DEPTH_SNAPSHOT",
    "DepthEvent",
    "Instrument",
    "Quote",
    "TRADE_BUY",
    "TRADE_INFERRED_BUY",
    "TRADE_INFERRED_SELL",
    "TRADE_SELL",
    "TRADE_UNKNOWN",
    "TradeEvent",
    "NotSupported",
    "Provider",
    "IndicatorSpec",
    "indicator",
    "compute",
    "all_specs",
]
