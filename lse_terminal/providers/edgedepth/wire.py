"""Pure-Python proto3 codec for the EdgeDepth gateway wire contract (E1).

Field numbers are the wire format: they come verbatim from the vendored
``third_party/edgedepth-gateway/edgedepth.proto`` (MIT). The gateway's own
comments mark several of them do-not-renumber; treat this file as a frozen
contract — if the upstream proto ever changes, re-vendor and let the golden
byte tests in tests/test_edgedepth_wire.py fail loudly first.

Why hand-rolled instead of the protobuf package: TraderOS keeps zero runtime
dependencies beyond uvicorn, the six messages we consume are small, and the
golden-fixture tests pin the exact byte layout.

Wire facts (gateway/internal/wire/wire.go):
- One binary WebSocket frame = one ``WSPayload`` (protobuf), no length prefix.
- The gateway emits UNCOMPRESSED protobuf; only the nested
  ``TickVolumeUpdate.levels_data`` blob is zstd (we do not consume it yet).
- Control plane is JSON TEXT frames keyed on "method".
"""

from __future__ import annotations

import json
import struct
from dataclasses import dataclass, field
from typing import Dict, List, Tuple

# --- Stream ids (gateway/proto/edgedepth.proto) -----------------------------
STREAM_TRADES = 1
STREAM_CANDLES = 2
STREAM_ORDERBOOK = 3
STREAM_STATS = 4
STREAM_LIQUIDATIONS = 5
STREAM_HISTORICAL_CANDLES = 8
STREAM_TICK_VOLUME = 17
STREAM_VOLUME_PROFILE = 26
STREAM_TICKER24H = 29

# --- proto3 wire types -------------------------------------------------------
_VARINT = 0
_FIXED64 = 1
_LEN = 2
_FIXED32 = 5


# ============================================================================
# low-level codec
# ============================================================================


def _read_varint(buf: bytes, pos: int) -> Tuple[int, int]:
    result = 0
    shift = 0
    while True:
        if pos >= len(buf):
            raise ValueError("truncated varint")
        b = buf[pos]
        pos += 1
        result |= (b & 0x7F) << shift
        if not (b & 0x80):
            return result, pos
        shift += 7
        if shift > 70:
            raise ValueError("varint too long")


def _write_varint(value: int) -> bytes:
    if value < 0:
        # proto3 negative int64: 10-byte two's-complement varint.
        value &= (1 << 64) - 1
    out = bytearray()
    while True:
        b = value & 0x7F
        value >>= 7
        if value:
            out.append(b | 0x80)
        else:
            out.append(b)
            return bytes(out)


def _tag(field_no: int, wire_type: int) -> bytes:
    return _write_varint((field_no << 3) | wire_type)


def _zigzag_free_i64(value: int) -> int:
    """proto3 int64 fields are two's-complement varints, not zigzag."""
    if value >= 1 << 63:
        value -= 1 << 64
    return value


def _skip_field(buf: bytes, pos: int, wire_type: int) -> int:
    if wire_type == _VARINT:
        _, pos = _read_varint(buf, pos)
    elif wire_type == _FIXED64:
        pos += 8
    elif wire_type == _LEN:
        n, pos = _read_varint(buf, pos)
        pos += n
    elif wire_type == _FIXED32:
        pos += 4
    else:
        raise ValueError(f"unsupported wire type {wire_type}")
    return pos


def parse_fields(buf: bytes) -> Dict[int, List]:
    """One message -> {field_number: [values...]}, unknown fields skipped.

    varints come back as Python ints, fixed64 as raw bytes(8), fixed32 as
    bytes(4), length-delimited as bytes; callers coerce per field type.
    """
    fields: Dict[int, List] = {}
    pos = 0
    n = len(buf)
    while pos < n:
        tag, pos = _read_varint(buf, pos)
        field_no, wire_type = tag >> 3, tag & 7
        if field_no == 0:
            raise ValueError("field number 0 is reserved")
        start = pos
        pos = _skip_field(buf, pos, wire_type)
        if wire_type == _VARINT:
            value, _ = _read_varint(buf, start)
        elif wire_type == _LEN:
            # strip the length prefix; keep only the payload bytes
            length, p2 = _read_varint(buf, start)
            value = buf[p2:p2 + length]
        else:
            value = buf[start:pos]
        fields.setdefault(field_no, []).append(value)
    return fields


def _i64(fields: Dict[int, List], no: int, default: int = 0) -> int:
    vals = fields.get(no)
    if not vals:
        return default
    return _zigzag_free_i64(int(vals[0]))


def _bool(fields: Dict[int, List], no: int) -> bool:
    vals = fields.get(no)
    return bool(vals and vals[0])


def _f64(fields: Dict[int, List], no: int, default: float = 0.0) -> float:
    vals = fields.get(no)
    if not vals:
        return default
    raw = vals[0]
    if isinstance(raw, int):
        raise ValueError(f"field {no}: expected fixed64, got varint")
    return struct.unpack("<d", raw)[0]


def _bytes(fields: Dict[int, List], no: int, default: bytes = b"") -> bytes:
    vals = fields.get(no)
    if not vals:
        return default
    raw = vals[0]
    return bytes(raw) if not isinstance(raw, int) else default


def _str(fields: Dict[int, List], no: int, default: str = "") -> str:
    return _bytes(fields, no, default.encode("utf-8")).decode("utf-8")


def _repeated_msg(fields: Dict[int, List], no: int) -> List[bytes]:
    return [bytes(v) for v in fields.get(no, []) if not isinstance(v, int)]


# --- encoders (used by the fake-gateway test harness and future tooling) ----


def _enc_double(field_no: int, value: float) -> bytes:
    if value == 0.0:
        return b""  # proto3 default elision
    return _tag(field_no, _FIXED64) + struct.pack("<d", value)


def _enc_i64(field_no: int, value: int) -> bytes:
    if value == 0:
        return b""
    return _tag(field_no, _VARINT) + _write_varint(value)


def _enc_bool(field_no: int, value: bool) -> bytes:
    if not value:
        return b""
    return _tag(field_no, _VARINT) + _write_varint(1)


def _enc_bytes(field_no: int, value: bytes) -> bytes:
    if not value:
        return b""
    return _tag(field_no, _LEN) + _write_varint(len(value)) + value


def _enc_str(field_no: int, value: str) -> bytes:
    return _enc_bytes(field_no, value.encode("utf-8")) if value else b""


# ============================================================================
# messages
# ============================================================================


@dataclass(frozen=True)
class WSPayload:
    exchange: str
    symbol: str
    stream: int
    timeframe: int
    data: bytes
    event_time_ms: int


@dataclass(frozen=True)
class BookLevel:
    price: float
    size: float


@dataclass(frozen=True)
class BookUpdate:
    timestamp_ms: int
    asks: Tuple[BookLevel, ...]
    bids: Tuple[BookLevel, ...]
    snapshot: bool
    last_price: float
    first_update_id: int
    last_update_id: int
    previous_update_id: int


@dataclass(frozen=True)
class Trade:
    price: float
    qty: float
    is_buy: bool
    timestamp_ms: int


@dataclass(frozen=True)
class Candle:
    open: float
    high: float
    low: float
    close: float
    volume: float
    timestamp_ms: int
    timeframe: int
    final: bool


@dataclass(frozen=True)
class Ticker24hEntry:
    symbol: str
    last_price: float
    change_pct: float
    volume_quote: float
    event_time_ms: int


@dataclass
class Ticker24hUpdate:
    entries: List[Ticker24hEntry] = field(default_factory=list)
    timestamp_ms: int = 0


def parse_ws_payload(buf: bytes) -> WSPayload:
    f = parse_fields(buf)
    pair = parse_fields(_bytes(f, 1))
    return WSPayload(
        exchange=_str(pair, 1),
        symbol=_str(pair, 2),
        stream=int(_i64(f, 2)),
        timeframe=_i64(f, 3),
        data=_bytes(f, 4),
        event_time_ms=_i64(f, 5),
    )


def _parse_book_level(buf: bytes) -> BookLevel:
    f = parse_fields(buf)
    return BookLevel(price=_f64(f, 1), size=_f64(f, 2))


def parse_book_update(buf: bytes) -> BookUpdate:
    f = parse_fields(buf)
    return BookUpdate(
        timestamp_ms=_i64(f, 1),
        asks=tuple(_parse_book_level(b) for b in _repeated_msg(f, 2)),
        bids=tuple(_parse_book_level(b) for b in _repeated_msg(f, 3)),
        snapshot=_bool(f, 4),
        last_price=_f64(f, 5),
        first_update_id=_i64(f, 6),
        last_update_id=_i64(f, 7),
        previous_update_id=_i64(f, 8),
    )


def parse_trade(buf: bytes) -> Trade:
    f = parse_fields(buf)
    return Trade(
        price=_f64(f, 1),
        qty=_f64(f, 2),
        is_buy=_bool(f, 3),
        timestamp_ms=_i64(f, 4),
    )


def parse_candle(buf: bytes) -> Candle:
    f = parse_fields(buf)
    return Candle(
        open=_f64(f, 1), high=_f64(f, 2), low=_f64(f, 3), close=_f64(f, 4),
        volume=_f64(f, 5), timestamp_ms=_i64(f, 10), timeframe=_i64(f, 11),
        final=_bool(f, 12),
    )


def parse_candles(buf: bytes) -> Tuple[int, List[Candle]]:
    f = parse_fields(buf)
    return _i64(f, 1), [parse_candle(b) for b in _repeated_msg(f, 2)]


def parse_ticker24h(buf: bytes) -> Ticker24hUpdate:
    f = parse_fields(buf)
    out = Ticker24hUpdate(timestamp_ms=_i64(f, 2))
    for raw in _repeated_msg(f, 1):
        e = parse_fields(raw)
        out.entries.append(Ticker24hEntry(
            symbol=_str(e, 1), last_price=_f64(e, 2), change_pct=_f64(e, 3),
            volume_quote=_f64(e, 4), event_time_ms=_i64(e, 5),
        ))
    return out


# ============================================================================
# encoders (mirror the parsers; defaults elided exactly like proto3)
# ============================================================================


def encode_book_level(level: BookLevel) -> bytes:
    return _enc_double(1, level.price) + _enc_double(2, level.size)


def encode_book_update(u: BookUpdate) -> bytes:
    out = _enc_i64(1, u.timestamp_ms)
    for lvl in u.asks:
        out += _enc_bytes(2, encode_book_level(lvl))
    for lvl in u.bids:
        out += _enc_bytes(3, encode_book_level(lvl))
    out += _enc_bool(4, u.snapshot)
    out += _enc_double(5, u.last_price)
    out += _enc_i64(6, u.first_update_id)
    out += _enc_i64(7, u.last_update_id)
    out += _enc_i64(8, u.previous_update_id)
    return out


def encode_trade(t: Trade) -> bytes:
    return (_enc_double(1, t.price) + _enc_double(2, t.qty)
            + _enc_bool(3, t.is_buy) + _enc_i64(4, t.timestamp_ms))


def encode_candle(c: Candle) -> bytes:
    return (_enc_double(1, c.open) + _enc_double(2, c.high)
            + _enc_double(3, c.low) + _enc_double(4, c.close)
            + _enc_double(5, c.volume) + _enc_i64(10, c.timestamp_ms)
            + _enc_i64(11, c.timeframe) + _enc_bool(12, c.final))


def encode_candles(timeframe: int, values: List[Candle]) -> bytes:
    out = _enc_i64(1, timeframe)
    for c in values:
        out += _enc_bytes(2, encode_candle(c))
    return out


def encode_ws_payload(p: WSPayload) -> bytes:
    pair = _enc_str(1, p.exchange) + _enc_str(2, p.symbol)
    return (_enc_bytes(1, pair) + _enc_i64(2, p.stream)
            + _enc_i64(3, p.timeframe) + _enc_bytes(4, p.data)
            + _enc_i64(5, p.event_time_ms))


@dataclass(frozen=True)
class Stat:
    mark_price: float
    funding: float
    timestamp_ms: int
    final: bool
    timeframe: int
    open_interest_usd: float
    next_funding_time: int
    trade_buy: int
    trade_sell: int
    liq_total_usd: float


@dataclass(frozen=True)
class Liquidation:
    timestamp_ms: int
    price: float
    avg_price: float
    qty: float
    is_buy: bool


def parse_stat(buf: bytes) -> Stat:
    f = parse_fields(buf)
    return Stat(
        mark_price=_f64(f, 1), funding=_f64(f, 2),
        timestamp_ms=_i64(f, 3), final=_bool(f, 4), timeframe=_i64(f, 5),
        open_interest_usd=_f64(f, 14), next_funding_time=_i64(f, 15),
        trade_buy=_i64(f, 12), trade_sell=_i64(f, 13),
        liq_total_usd=_f64(f, 10),
    )


def parse_stats(buf: bytes) -> Tuple[int, List[Stat]]:
    f = parse_fields(buf)
    return _i64(f, 1), [parse_stat(b) for b in _repeated_msg(f, 2)]


def parse_liquidation(buf: bytes) -> Liquidation:
    f = parse_fields(buf)
    return Liquidation(
        timestamp_ms=_i64(f, 1), price=_f64(f, 2), avg_price=_f64(f, 3),
        qty=_f64(f, 4), is_buy=_bool(f, 5),
    )


def encode_stat(s: Stat) -> bytes:
    return (_enc_double(1, s.mark_price) + _enc_double(2, s.funding)
            + _enc_i64(3, s.timestamp_ms) + _enc_bool(4, s.final)
            + _enc_i64(5, s.timeframe) + _enc_i64(12, s.trade_buy)
            + _enc_i64(13, s.trade_sell) + _enc_double(10, s.liq_total_usd)
            + _enc_double(14, s.open_interest_usd)
            + _enc_i64(15, s.next_funding_time))


def encode_stats(timeframe: int, values: List[Stat]) -> bytes:
    out = _enc_i64(1, timeframe)
    for s in values:
        out += _enc_bytes(2, encode_stat(s))
    return out


def encode_liquidation(l: Liquidation) -> bytes:
    return (_enc_i64(1, l.timestamp_ms) + _enc_double(2, l.price)
            + _enc_double(3, l.avg_price) + _enc_double(4, l.qty)
            + _enc_bool(5, l.is_buy))


def parse_candle_singular(buf: bytes) -> Candle:
    """Live STREAM_CANDLES frames carry a SINGULAR pb.Candle (hub/emitCandle:
    the terminal parses this stream as a bare Candle with no plural fallback;
    proto3 accepts the wrong shape silently, which is precisely why upstream
    ships a wire-shape test). HISTORICAL stays plural via parse_candles."""
    return parse_candle(buf)


# ============================================================================
# control plane (JSON text frames, hub/client.go: key is "method")
# ============================================================================


def control_message(method: str, exchange: str, symbol: str, stream: int = 0,
                    timeframe: int = 0, **data) -> str:
    """One JSON TEXT control frame. ``subscribe``/``unsubscribe``/``get_*``
    all ride the same hub request shape (hub/client.go: request); the method
    name is the routing key — sending ``subscribe`` with stream 8 does NOT
    fetch history, only ``get_historical_candles`` does."""
    payload = {"pair": {"exchange": exchange, "symbol": symbol},
               "stream": stream, "timeframe": timeframe}
    payload.update(data)
    return json.dumps({"method": method, "data": payload})


def subscribe_message(exchange: str, symbol: str, stream: int,
                      timeframe: int = 0, **extra) -> str:
    return control_message("subscribe", exchange, symbol,
                           stream=stream, timeframe=timeframe, **extra)


def unsubscribe_message(exchange: str, symbol: str, stream: int,
                        timeframe: int = 0) -> str:
    return control_message("unsubscribe", exchange, symbol,
                           stream=stream, timeframe=timeframe)
