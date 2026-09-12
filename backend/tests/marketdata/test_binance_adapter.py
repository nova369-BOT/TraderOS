"""Binance adapter protocol tests against a local fake Binance server.

The fake server speaks the exact Binance USDⓈ-M futures protocol (combined
stream envelope, depth diffs with U/u/pu, bookTicker, aggTrade, kline,
forceOrder, markPrice, REST exchangeInfo/depth/aggTrades/klines/openInterest)
so the adapter's real wire logic — sequence alignment, gap resync, invalid
frame handling, live SUBSCRIBE/UNSUBSCRIBE, reconnect — is exercised without
network access.
"""

from __future__ import annotations

import asyncio
import json
from typing import Any

import pytest
from aiohttp import WSMsgType, web

from backend.marketdata.adapters.binance import BinanceFuturesAdapter
from backend.marketdata.types import Envelope


class FakeBinance:
    """Minimal protocol-faithful Binance futures server."""

    def __init__(self) -> None:
        self.app = web.Application()
        self.app.router.add_get("/fapi/v1/exchangeInfo", self.exchange_info)
        self.app.router.add_get("/fapi/v1/depth", self.depth)
        self.app.router.add_get("/fapi/v1/aggTrades", self.agg_trades)
        self.app.router.add_get("/fapi/v1/klines", self.klines)
        self.app.router.add_get("/fapi/v1/openInterest", self.open_interest)
        self.app.router.add_route("GET", "/stream", self.ws_handler)
        self.runner: web.AppRunner | None = None
        self.ws_connections: list[web.WebSocketResponse] = []
        self.subscribed_streams: set[str] = set()
        self.sub_frames: list[dict[str, Any]] = []
        self.snapshot_requests: list[str] = []
        self.port: int = 0
        self.last_update_id = 100

    async def start(self) -> None:
        self.runner = web.AppRunner(self.app)
        await self.runner.setup()
        site = web.TCPSite(self.runner, "127.0.0.1", 0)
        await site.start()
        self.port = self.runner.addresses[0][1]

    async def stop(self) -> None:
        for ws in list(self.ws_connections):
            await ws.close()
        if self.runner is not None:
            await self.runner.cleanup()

    @property
    def rest_base(self) -> str:
        return f"http://127.0.0.1:{self.port}"

    @property
    def ws_base(self) -> str:
        return f"ws://127.0.0.1:{self.port}"

    # ---------------- REST handlers ----------------
    async def exchange_info(self, request: web.Request) -> web.Response:
        return web.json_response(
            {
                "symbols": [
                    {
                        "symbol": "BTCUSDT",
                        "contractType": "PERPETUAL",
                        "status": "TRADING",
                        "baseAsset": "BTC",
                        "quoteAsset": "USDT",
                        "pricePrecision": 1,
                        "quantityPrecision": 3,
                        "filters": [
                            {"filterType": "PRICE_FILTER", "tickSize": "0.1"},
                            {"filterType": "LOT_SIZE", "stepSize": "0.001"},
                        ],
                    }
                ]
            }
        )

    async def depth(self, request: web.Request) -> web.Response:
        symbol = request.query.get("symbol", "")
        self.snapshot_requests.append(symbol)
        return web.json_response(
            {
                "lastUpdateId": self.last_update_id,
                "E": 1700000000000,
                "T": 1700000000000,
                "bids": [["100.0", "2.0"], ["99.9", "3.0"]],
                "asks": [["100.1", "1.5"], ["100.2", "4.0"]],
            }
        )

    async def agg_trades(self, request: web.Request) -> web.Response:
        return web.json_response(
            [
                {"a": 1, "p": "100.0", "q": "1.0", "T": 1700000000001, "m": False},
                {"a": 2, "p": "100.5", "q": "2.0", "T": 1700000000002, "m": True},
            ]
        )

    async def klines(self, request: web.Request) -> web.Response:
        return web.json_response(
            [
                [1700000000000, "100.0", "101.0", "99.0", "100.5", "12.0", 1700000059999, "0", 12, "0", "0", "0"],
                [1700000060000, "100.5", "102.0", "100.0", "101.5", "8.0", 1700000119999, "0", 8, "0", "0", "0"],
            ]
        )

    async def open_interest(self, request: web.Request) -> web.Response:
        return web.json_response({"openInterest": "12345.5", "symbol": request.query.get("symbol", "")})

    # ---------------- WS handler ----------------
    async def ws_handler(self, request: web.Request) -> web.WebSocketResponse:
        ws = web.WebSocketResponse()
        await ws.prepare(request)
        self.ws_connections.append(ws)
        for stream in request.query.get("streams", "").split("/"):
            if stream:
                self.subscribed_streams.add(stream)
        try:
            async for msg in ws:
                if msg.type == WSMsgType.TEXT:
                    frame = json.loads(msg.data)
                    self.sub_frames.append(frame)
                    if frame.get("method") == "SUBSCRIBE":
                        self.subscribed_streams.update(frame.get("params", []))
                    elif frame.get("method") == "UNSUBSCRIBE":
                        for stream in frame.get("params", []):
                            self.subscribed_streams.discard(stream)
        except Exception:
            pass
        finally:
            self.ws_connections.remove(ws) if ws in self.ws_connections else None
        return ws

    # ---------------- test helpers ----------------
    async def send(self, stream: str, data: dict[str, Any]) -> None:
        payload = json.dumps({"stream": stream, "data": data})
        for ws in list(self.ws_connections):
            await ws.send_str(payload)

    async def send_raw(self, text: str) -> None:
        for ws in list(self.ws_connections):
            await ws.send_str(text)

    async def drop_connections(self) -> None:
        for ws in list(self.ws_connections):
            await ws.close()


# ----------------------------------------------------------------------
# helpers
# ----------------------------------------------------------------------
async def _collect_until(out: list[Envelope], predicate, timeout: float = 3.0) -> Envelope:
    loop = asyncio.get_running_loop()
    deadline = loop.time() + timeout
    while loop.time() < deadline:
        for envelope in out:
            if predicate(envelope):
                return envelope
        await asyncio.sleep(0.02)
    raise AssertionError("expected envelope not received within timeout")


async def _wait_for_ws(server: FakeBinance, timeout: float = 5.0) -> None:
    """Wait until the adapter's WS connection is established server-side."""
    loop = asyncio.get_running_loop()
    deadline = loop.time() + timeout
    while loop.time() < deadline:
        if server.ws_connections:
            return
        await asyncio.sleep(0.02)
    raise AssertionError("adapter did not connect to the fake server in time")


def _make_adapter(out: list[Envelope], server: FakeBinance, **kwargs) -> BinanceFuturesAdapter:
    return BinanceFuturesAdapter(
        out.append,
        rest_base=server.rest_base,
        ws_base=server.ws_base,
        request_timeout=kwargs.get("request_timeout", 5.0),
    )


# ----------------------------------------------------------------------
# tests
# ----------------------------------------------------------------------
@pytest.mark.asyncio
async def test_quote_stream_book_ticker() -> None:
    server = FakeBinance()
    await server.start()
    out: list[Envelope] = []
    adapter = _make_adapter(out, server)
    await adapter.start()
    try:
        await adapter.subscribe("quote", "BTCUSDT", None)
        await asyncio.sleep(0.2)
        await server.send(
            "btcusdt@bookTicker",
            {"e": "bookTicker", "u": 400, "s": "BTCUSDT", "b": "100.0", "B": "5.0", "a": "100.2", "A": "3.0", "T": 1700000000123},
        )
        envelope = await _collect_until(out, lambda e: e.type == "quote")
        assert envelope.provenance == "live"
        assert envelope.source == "binance"
        assert envelope.symbol == "BINANCE:BTCUSDT"
        assert envelope.data["bid"] == 100.0
        assert envelope.data["ask"] == 100.2
        assert envelope.data["ts"] == 1700000000123
    finally:
        await adapter.stop()
        await server.stop()


@pytest.mark.asyncio
async def test_agg_trade_and_history_backfill() -> None:
    server = FakeBinance()
    await server.start()
    out: list[Envelope] = []
    adapter = _make_adapter(out, server)
    await adapter.start()
    try:
        await adapter.subscribe("trade", "BTCUSDT", None)
        # history backfill first (2 trades from REST)
        await _collect_until(out, lambda e: e.type == "trade" and e.data["id"] == "1")
        await _collect_until(out, lambda e: e.type == "trade" and e.data["id"] == "2")
        # live trade: m=true → buyer is maker → aggressor is seller
        await _wait_for_ws(server)
        await server.send(
            "btcusdt@aggTrade",
            {"e": "aggTrade", "a": 88, "s": "BTCUSDT", "p": "101.5", "q": "0.5", "T": 1700000000999, "m": True},
        )
        envelope = await _collect_until(out, lambda e: e.type == "trade" and e.data["id"] == "88")
        assert envelope.data["side"] == "sell"
        assert envelope.data["price"] == 101.5
        backfill = [e for e in out if e.type == "trade" and e.data["id"] == "1"][0]
        assert backfill.data["side"] == "buy"  # m=False
    finally:
        await adapter.stop()
        await server.stop()


@pytest.mark.asyncio
async def test_book_snapshot_then_diffs_apply_in_order() -> None:
    server = FakeBinance()
    await server.start()
    out: list[Envelope] = []
    adapter = _make_adapter(out, server)
    await adapter.start()
    try:
        await adapter.subscribe("book", "BTCUSDT", None)
        await _wait_for_ws(server)
        # diffs arrive (buffered until snapshot completes)
        await server.send(
            "btcusdt@depth@100ms",
            {"e": "depthUpdate", "E": 1700000000100, "T": 1700000000100, "s": "BTCUSDT", "U": 101, "u": 110, "pu": 100, "b": [["99.9", "5.0"]], "a": [["100.1", "0"]]},
        )
        snapshot = await _collect_until(out, lambda e: e.type == "book_snapshot")
        # snapshot levels from the fake REST payload
        assert [lvl["price"] for lvl in snapshot.data["bids"]] == [100.0, 99.9]
        assert [lvl["price"] for lvl in snapshot.data["asks"]] == [100.1, 100.2]
        # the buffered diff (u=110 > lastUpdateId=100) applied:
        # bid 99.9 qty 3.0 → 5.0, ask 100.1 removed
        applied = await _collect_until(out, lambda e: e.type == "book_delta")
        assert applied.data["final_update_id"] == 110
        # wait for a refreshed snapshot reflecting the applied diff
        refreshed = await _collect_until(
            out, lambda e: e.type == "book_snapshot" and any(l["price"] == 99.9 and l["qty"] == 5.0 for l in e.data["bids"])
        )
        assert all(l["price"] != 100.1 for l in refreshed.data["asks"])
    finally:
        await adapter.stop()
        await server.stop()


@pytest.mark.asyncio
async def test_sequence_gap_triggers_resync() -> None:
    server = FakeBinance()
    await server.start()
    out: list[Envelope] = []
    adapter = _make_adapter(out, server)
    await adapter.start()
    try:
        await adapter.subscribe("book", "BTCUSDT", None)
        await _collect_until(out, lambda e: e.type == "book_snapshot")
        # valid diff (pu=100 matches snapshot lastUpdateId)
        await _wait_for_ws(server)
        await server.send(
            "btcusdt@depth@100ms",
            {"e": "depthUpdate", "E": 1700000000200, "s": "BTCUSDT", "U": 101, "u": 110, "pu": 100, "b": [], "a": []},
        )
        await _collect_until(out, lambda e: e.type == "book_delta")
        # gap: pu jumps ahead of the maintained id
        await server.send(
            "btcusdt@depth@100ms",
            {"e": "depthUpdate", "E": 1700000000300, "s": "BTCUSDT", "U": 500, "u": 510, "pu": 400, "b": [], "a": []},
        )
        # adapter must resnapshot: second snapshot request observed + status counter
        deadline = asyncio.get_running_loop().time() + 3.0
        while asyncio.get_running_loop().time() < deadline:
            if len(server.snapshot_requests) >= 2 and adapter.status().resnapshots >= 1:
                break
            await asyncio.sleep(0.02)
        assert len(server.snapshot_requests) >= 2, "gap should trigger a fresh snapshot"
        assert adapter.status().resnapshots >= 1
    finally:
        await adapter.stop()
        await server.stop()


@pytest.mark.asyncio
async def test_invalid_frames_counted_and_connection_survives() -> None:
    server = FakeBinance()
    await server.start()
    out: list[Envelope] = []
    adapter = _make_adapter(out, server)
    await adapter.start()
    try:
        await adapter.subscribe("quote", "BTCUSDT", None)
        await _wait_for_ws(server)
        await server.send_raw("this is not json")
        await server.send("btcusdt@bookTicker", {"e": "bookTicker"})  # missing fields
        await server.send("btcusdt@bookTicker", {"e": "bookTicker", "u": 1, "s": "BTCUSDT", "b": "NaN", "B": "1", "a": "2", "A": "1", "T": 1})
        await server.send("unknownstream@x", {"e": "whatever"})
        # connection still alive: a valid quote flows through
        await server.send(
            "btcusdt@bookTicker",
            {"e": "bookTicker", "u": 5, "s": "BTCUSDT", "b": "100.0", "B": "1", "a": "100.1", "A": "1", "T": 1700000000500},
        )
        envelope = await _collect_until(out, lambda e: e.type == "quote" and e.data.get("bid") == 100.0)
        assert envelope.provenance == "live"
        assert adapter.status().invalid_messages >= 3
    finally:
        await adapter.stop()
        await server.stop()


@pytest.mark.asyncio
async def test_reconnect_resubscribes_and_resnapshots() -> None:
    server = FakeBinance()
    await server.start()
    out: list[Envelope] = []
    adapter = _make_adapter(out, server)
    await adapter.start()
    try:
        await adapter.subscribe("book", "BTCUSDT", None)
        await _collect_until(out, lambda e: e.type == "book_snapshot")
        await server.drop_connections()
        # adapter reconnects (backoff base 0.5s) and re-requests a snapshot
        deadline = asyncio.get_running_loop().time() + 6.0
        reconnected = False
        resnapshotted = False
        while asyncio.get_running_loop().time() < deadline:
            if server.ws_connections and "btcusdt@depth@100ms" in server.subscribed_streams:
                reconnected = True
            if len(server.snapshot_requests) >= 2:
                resnapshotted = True
            if reconnected and resnapshotted:
                break
            await asyncio.sleep(0.05)
        assert reconnected, "adapter should reconnect and resubscribe depth stream"
        assert resnapshotted, "reconnect must invalidate the book and resnapshot"
        assert adapter.status().reconnects >= 1
    finally:
        await adapter.stop()
        await server.stop()


@pytest.mark.asyncio
async def test_live_subscribe_unsubscribe_frames() -> None:
    server = FakeBinance()
    await server.start()
    out: list[Envelope] = []
    adapter = _make_adapter(out, server)
    await adapter.start()
    try:
        await adapter.subscribe("quote", "BTCUSDT", None)
        await asyncio.sleep(0.3)
        assert "btcusdt@bookTicker" in server.subscribed_streams
        # add a stream live (no reconnect)
        await adapter.subscribe("trade", "BTCUSDT", None)
        await asyncio.sleep(0.3)
        assert "btcusdt@aggTrade" in server.subscribed_streams
        sub_frames = [f for f in server.sub_frames if f.get("method") == "SUBSCRIBE"]
        assert any("btcusdt@aggTrade" in f.get("params", []) for f in sub_frames)
        # remove one — other stays
        await adapter.unsubscribe("quote", "BTCUSDT", None)
        await asyncio.sleep(0.3)
        assert "btcusdt@bookTicker" not in server.subscribed_streams
        assert "btcusdt@aggTrade" in server.subscribed_streams
        unsub_frames = [f for f in server.sub_frames if f.get("method") == "UNSUBSCRIBE"]
        assert any("btcusdt@bookTicker" in f.get("params", []) for f in unsub_frames)
    finally:
        await adapter.stop()
        await server.stop()


@pytest.mark.asyncio
async def test_kline_funding_liquidation_parsing() -> None:
    server = FakeBinance()
    await server.start()
    out: list[Envelope] = []
    adapter = _make_adapter(out, server)
    await adapter.start()
    try:
        await adapter.subscribe("candle", "BTCUSDT", "1m")
        await adapter.subscribe("funding", "BTCUSDT", None)
        await adapter.subscribe("liquidation", "BTCUSDT", None)
        # candle history backfill
        candle = await _collect_until(out, lambda e: e.type == "candle")
        assert candle.data["interval"] == "1m"
        assert candle.topic == "candle:BINANCE:BTCUSDT:1m"
        await _wait_for_ws(server)
        await server.send(
            "btcusdt@kline_1m",
            {
                "e": "kline", "E": 1700000001000, "s": "BTCUSDT",
                "k": {"t": 1700000000000, "T": 1700000059999, "s": "BTCUSDT", "i": "1m",
                      "o": "100.0", "h": "101.0", "l": "99.5", "c": "100.8", "v": "42.0",
                      "n": 42, "x": False},
            },
        )
        live_candle = await _collect_until(
            out, lambda e: e.type == "candle" and e.data["close"] == 100.8 and not e.data["closed"]
        )
        assert live_candle.data["trade_count"] == 42

        await _wait_for_ws(server)
        await server.send(
            "btcusdt@markPrice@1s",
            {"e": "markPriceUpdate", "E": 1700000002000, "s": "BTCUSDT", "p": "100.9", "i": "100.89", "P": "100.88", "r": "0.0001", "T": 1700057600000},
        )
        funding = await _collect_until(out, lambda e: e.type == "funding")
        assert funding.data["funding_rate"] == 0.0001
        assert funding.data["mark_price"] == 100.9
        assert funding.data["next_funding_ms"] == 1700057600000

        await _wait_for_ws(server)
        await server.send(
            "btcusdt@forceOrder",
            {"e": "forceOrder", "E": 1700000003000, "o": {"s": "BTCUSDT", "S": "SELL", "o": "LIMIT", "f": "IOC", "q": "0.5", "p": "99.0", "ap": "99.0", "X": "FILLED", "l": "0.5", "z": "0.5", "T": 1700000002999}},
        )
        liquidation = await _collect_until(out, lambda e: e.type == "liquidation")
        assert liquidation.data["side"] == "sell"
        assert liquidation.data["price"] == 99.0
    finally:
        await adapter.stop()
        await server.stop()


@pytest.mark.asyncio
async def test_stop_leaks_no_tasks() -> None:
    server = FakeBinance()
    await server.start()
    out: list[Envelope] = []
    adapter = _make_adapter(out, server)
    await adapter.start()
    await adapter.subscribe("book", "BTCUSDT", None)
    await adapter.subscribe("open_interest", "BTCUSDT", None)
    await asyncio.sleep(0.2)
    snapshot_tasks = {
        t for t in asyncio.all_tasks() if "binance" in t.get_name() and t is not asyncio.current_task()
    }
    assert snapshot_tasks, "expected adapter tasks to exist while running"
    await adapter.stop()
    await asyncio.sleep(0.1)
    leaked = [t for t in snapshot_tasks if not t.done()]
    assert not leaked, f"leaked tasks after stop: {leaked}"
    await server.stop()


@pytest.mark.asyncio
async def test_symbol_catalog_from_exchange_info() -> None:
    server = FakeBinance()
    await server.start()
    out: list[Envelope] = []
    adapter = _make_adapter(out, server)
    await adapter.start()
    try:
        items = await adapter.list_symbols("BTC")
        assert len(items) == 1
        item = items[0]
        assert item.symbol == "BINANCE:BTCUSDT"
        assert item.tick_size == 0.1
        assert item.step_size == 0.001
        assert item.kind == "perp"
    finally:
        await adapter.stop()
        await server.stop()
