"""EdgeDepth data integration (F1/E0).

Speaks the edgedepth-gateway wire format (protobuf-over-WebSocket, MIT
contract vendored at third_party/edgedepth-gateway/) so Depth Heat renders
REAL Binance USD-M futures orderflow with no API key.
"""
from .wire import (
    STREAM_CANDLES,
    STREAM_HISTORICAL_CANDLES,
    STREAM_LIQUIDATIONS,
    STREAM_ORDERBOOK,
    STREAM_STATS,
    STREAM_TICKER24H,
    STREAM_TRADES,
    BookUpdate,
    Candle,
    Liquidation,
    Stat,
    Trade,
    WSPayload,
    control_message,
    parse_book_update,
    parse_candle_singular,
    parse_candles,
    parse_liquidation,
    parse_stats,
    parse_ticker24h,
    parse_trade,
    parse_ws_payload,
)

__all__ = [
    "STREAM_CANDLES", "STREAM_HISTORICAL_CANDLES", "STREAM_LIQUIDATIONS",
    "STREAM_ORDERBOOK", "STREAM_STATS", "STREAM_TICKER24H", "STREAM_TRADES",
    "BookUpdate", "Candle", "Liquidation", "Stat", "Trade", "WSPayload",
    "control_message",
    "parse_book_update", "parse_candle_singular", "parse_candles",
    "parse_liquidation", "parse_stats", "parse_ticker24h", "parse_trade",
    "parse_ws_payload",
]
