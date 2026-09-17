"""E1 gate: golden-byte tests for the EdgeDepth gateway wire codec.

The golden frames are constructed HERE with struct/varints written out by
hand, independently of lse_terminal.providers.edgedepth.wire, so the codec
is pinned against the contract instead of against itself. Field numbers come
from third_party/edgedepth-gateway/edgedepth.proto.
"""

import struct

from lse_terminal.providers.edgedepth import wire
from lse_terminal.providers.edgedepth.wire import (
    STREAM_HISTORICAL_CANDLES,
    STREAM_ORDERBOOK,
    STREAM_TRADES,
    BookLevel,
    BookUpdate,
    Candle,
    Trade,
    WSPayload,
    parse_book_update,
    parse_candles,
    parse_trade,
    parse_ticker24h,
    parse_ws_payload,
)


# --- independent primitive builders (not the codec under test) --------------

def _varint(value: int) -> bytes:
    if value < 0:
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


def _tag(fno: int, wt: int) -> bytes:
    return _varint((fno << 3) | wt)


def _d(fno: int, v: float) -> bytes:
    return _tag(fno, 1) + struct.pack("<d", v)


def _i(fno: int, v: int) -> bytes:
    if v == 0:
        return b""  # proto3 canonical encoding elides zero defaults (Go does)
    return _tag(fno, 0) + _varint(v)


def _b(fno: int, v: bytes) -> bytes:
    return _tag(fno, 2) + _varint(len(v)) + v


# --- varints ----------------------------------------------------------------


def test_varint_round_trip():
    for v in (0, 1, 127, 128, 300, 2**31, 2**63 - 1, 1750000000123456789):
        enc, pos = wire._write_varint(v), None
        dec, pos = wire._read_varint(enc, 0)
        assert dec == v and pos == len(enc)


def test_negative_int64_two_s_complement():
    enc = wire._write_varint(-1)
    assert len(enc) == 10  # proto3 negative int64 is a 10-byte varint
    dec, _ = wire._read_varint(enc, 0)
    assert wire._zigzag_free_i64(dec) == -1


# --- BookUpdate golden -------------------------------------------------------

def _golden_book_update() -> bytes:
    # BookUpdate{timestamp_ms=1750000000123, asks=[(100250.5, 0.75)],
    #            bids=[(100249.0, 1.5)], snapshot=True, last_price=100250.0,
    #            first_update_id=11, last_update_id=17, previous_update_id=10}
    ask = _d(1, 100250.5) + _d(2, 0.75)
    bid = _d(1, 100249.0) + _d(2, 1.5)
    return (_i(1, 1750000000123) + _b(2, ask) + _b(3, bid)
            + _i(4, 1) + _d(5, 100250.0)
            + _i(6, 11) + _i(7, 17) + _i(8, 10))


def test_parse_book_update_golden():
    u = parse_book_update(_golden_book_update())
    assert u.timestamp_ms == 1750000000123
    assert u.snapshot is True
    assert [(l.price, l.size) for l in u.asks] == [(100250.5, 0.75)]
    assert [(l.price, l.size) for l in u.bids] == [(100249.0, 1.5)]
    assert u.last_price == 100250.0
    assert (u.first_update_id, u.last_update_id) == (11, 17)
    assert u.previous_update_id == 10


def test_encode_book_update_matches_golden():
    u = BookUpdate(
        timestamp_ms=1750000000123,
        asks=(BookLevel(100250.5, 0.75),),
        bids=(BookLevel(100249.0, 1.5),),
        snapshot=True, last_price=100250.0,
        first_update_id=11, last_update_id=17, previous_update_id=10)
    assert wire.encode_book_update(u) == _golden_book_update()


def test_book_update_elides_defaults():
    # proto3: zero/False fields absent on the wire.
    u = BookUpdate(timestamp_ms=0, asks=(), bids=(), snapshot=False,
                   last_price=0.0, first_update_id=0, last_update_id=0,
                   previous_update_id=0)
    assert wire.encode_book_update(u) == b""


# --- WSPayload envelope golden -----------------------------------------------

def _golden_envelope(inner: bytes, stream: int, timeframe: int = 0,
                     event_ms: int = 0) -> bytes:
    pair = _b(1, b"binance") + _b(2, b"BTCUSDT")
    return (_b(1, pair) + _i(2, stream) + _i(3, timeframe)
            + _b(4, inner) + _i(5, event_ms))


def test_parse_ws_payload_golden():
    frame = _golden_envelope(_golden_book_update(), STREAM_ORDERBOOK,
                             event_ms=1750000000123)
    p = parse_ws_payload(frame)
    assert (p.exchange, p.symbol, p.stream) == ("binance", "BTCUSDT",
                                                 STREAM_ORDERBOOK)
    assert p.timeframe == 0
    assert p.event_time_ms == 1750000000123
    assert parse_book_update(p.data).snapshot is True


def test_encode_ws_payload_matches_golden():
    p = WSPayload(exchange="binance", symbol="BTCUSDT",
                  stream=STREAM_ORDERBOOK, timeframe=0,
                  data=_golden_book_update(), event_time_ms=1750000000123)
    assert wire.encode_ws_payload(p) == _golden_envelope(
        _golden_book_update(), STREAM_ORDERBOOK, event_ms=1750000000123)


# --- Trade golden -------------------------------------------------------------

def test_trade_golden():
    frame = _d(1, 64012.25) + _d(2, 0.003) + _i(3, 1) + _i(4, 1750000000999)
    t = parse_trade(frame)
    assert (t.price, t.qty, t.is_buy, t.timestamp_ms) == (
        64012.25, 0.003, True, 1750000000999)
    enc = wire.encode_trade(Trade(64012.25, 0.003, True, 1750000000999))
    assert enc == frame


# --- Candles golden (historical backfill shape) -------------------------------

def test_candles_golden():
    c1 = (_d(1, 100.0) + _d(2, 101.0) + _d(3, 99.5) + _d(4, 100.75)
          + _d(5, 12.5) + _i(10, 1750000000000) + _i(11, 60) + _i(12, 1))
    inner = _i(1, 60) + _b(2, c1)
    tf, values = parse_candles(inner)
    assert tf == 60 and len(values) == 1
    c = values[0]
    assert (c.open, c.high, c.low, c.close, c.volume) == (
        100.0, 101.0, 99.5, 100.75, 12.5)
    assert (c.timestamp_ms, c.timeframe, c.final) == (1750000000000, 60, True)
    assert wire.encode_candles(60, [Candle(100.0, 101.0, 99.5, 100.75, 12.5,
                                           1750000000000, 60, True)]) == inner


# --- forward compatibility + control plane ------------------------------------

def test_unknown_fields_are_skipped():
    # BookUpdate with a stray field 99 (varint) and 98 (length-delim).
    blob = _golden_book_update() + _i(99, 424242) + _b(98, b"future")
    u = parse_book_update(blob)
    assert u.last_update_id == 17 and u.snapshot is True


def test_control_frames():
    import json
    sub = json.loads(wire.subscribe_message(
        "binance", "BTCUSDT", STREAM_TRADES))
    assert sub["method"] == "subscribe"
    assert sub["data"]["pair"] == {"exchange": "binance", "symbol": "BTCUSDT"}
    assert sub["data"]["stream"] == STREAM_TRADES
    assert sub["data"]["timeframe"] == 0
    hist = json.loads(wire.subscribe_message(
        "binance", "BTCUSDT", STREAM_HISTORICAL_CANDLES, 60,
        start_time=1, end_time=2, count=500))
    assert hist["data"]["timeframe"] == 60
    assert hist["data"]["count"] == 500


def test_ticker24h():
    entry = (_b(1, b"BTCUSDT") + _d(2, 64000.0) + _d(3, 2.5)
             + _d(4, 1.2e9) + _i(5, 1750000000000))
    upd = parse_ticker24h(_b(1, entry) + _i(2, 1750000000001))
    assert upd.timestamp_ms == 1750000000001
    assert len(upd.entries) == 1
    e = upd.entries[0]
    assert (e.symbol, e.last_price, e.change_pct) == ("BTCUSDT", 64000.0, 2.5)
