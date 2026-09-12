"""REST + WebSocket surface for the unified market-data foundation.

REST (JWT-protected like the rest of the API):
- ``GET /api/marketdata/status``       — feed statuses + bus/topic metrics
- ``GET /api/marketdata/symbols``      — catalog (binance perps + simulator)
- ``GET /api/marketdata/quote/{symbol}``
- ``GET /api/marketdata/book/{symbol}``
- ``GET /api/marketdata/trades/{symbol}``
- ``GET /api/marketdata/candles/{symbol}``
- ``GET /api/marketdata/derivatives/{symbol}`` — funding / OI / liquidations
- ``GET /api/marketdata/resolve/{symbol}``      — canonical-symbol resolution

WebSocket ``/api/ws/market`` (same auth policy as other WS endpoints):

    → {"op": "subscribe",   "topics": ["trade:BINANCE:BTCUSDT", ...]}
    → {"op": "unsubscribe", "topics": [...]}
    → {"op": "status"}
    ← {"type": "subscribed", "topics": [...]}
    ← {"type": "event", ...envelope...}   (provenance always explicit)
    ← {"type": "error", "message": "..."}

Every WS client subscription is ref-counted service-side; two clients
subscribing to the same topic produce ONE upstream adapter subscription.
"""

from __future__ import annotations

import asyncio
import logging
from typing import Any

from fastapi import APIRouter, HTTPException, Query, WebSocket, WebSocketDisconnect

from backend.auth.ws import authenticate_ws
from backend.marketdata.service import get_marketdata_service
from backend.marketdata.symbols import resolve as resolve_symbol
from backend.marketdata.symbols import split_canonical
from backend.marketdata.types import parse_topic

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api")

_MAX_TOPICS_PER_CLIENT = 64


def _service():
    return get_marketdata_service()


def _resolve_or_404(raw: str) -> str:
    service = _service()
    try:
        binance = service._binance  # noqa: SLF001 - catalog access
        known = set()
        if binance is not None and binance._catalog:  # noqa: SLF001
            known = set(binance._catalog.keys())  # noqa: SLF001
        return resolve_symbol(raw, binance_instruments=frozenset(known))
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


# ----------------------------------------------------------------------
# REST
# ----------------------------------------------------------------------
@router.get("/marketdata/status")
async def marketdata_status() -> dict[str, Any]:
    service = _service()
    return {
        "mode": service._mode,  # noqa: SLF001
        "feeds": [feed.model_dump() for feed in service.feed_statuses()],
        "topics": service.topic_snapshot(),
    }


@router.get("/marketdata/symbols")
async def marketdata_symbols(
    query: str | None = Query(default=None, max_length=48),
    exchange: str | None = Query(default=None, max_length=12),
) -> dict[str, Any]:
    service = _service()
    items = await service.list_symbols(query)
    if exchange:
        needle = exchange.strip().upper()
        items = [item for item in items if item.get("exchange") == needle]
    return {"items": items, "count": len(items)}


@router.get("/marketdata/resolve/{symbol}")
async def marketdata_resolve(symbol: str) -> dict[str, Any]:
    service = _service()
    binance = service._binance  # noqa: SLF001
    known = frozenset(binance._catalog.keys()) if binance is not None and binance._catalog else frozenset()  # noqa: SLF001
    try:
        canonical = resolve_symbol(symbol, binance_instruments=known)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return {"input": symbol, "symbol": canonical}


@router.get("/marketdata/quote/{symbol}")
async def marketdata_quote(symbol: str) -> dict[str, Any]:
    service = _service()
    canonical = _resolve_or_404(symbol)
    quote = service.get_quote(canonical)
    if quote is None:
        return {"symbol": canonical, "provenance": "unavailable", "data": None}
    provenance, source = service.get_symbol_source(canonical)
    return {
        "symbol": canonical,
        "provenance": provenance or "unavailable",
        "source": source,
        "data": quote.model_dump(),
    }


@router.get("/marketdata/book/{symbol}")
async def marketdata_book(
    symbol: str,
    levels: int = Query(default=25, ge=1, le=400),
) -> dict[str, Any]:
    service = _service()
    canonical = _resolve_or_404(symbol)
    book = service.get_book(canonical, levels)
    if book is None:
        return {"symbol": canonical, "provenance": "unavailable", "data": None}
    trimmed = book.model_copy(
        update={
            "bids": book.bids[:levels],
            "asks": book.asks[:levels],
        }
    )
    provenance, source = service.get_symbol_source(canonical)
    return {
        "symbol": canonical,
        "provenance": provenance or "unavailable",
        "source": source,
        "data": trimmed.model_dump(),
    }


@router.get("/marketdata/trades/{symbol}")
async def marketdata_trades(
    symbol: str,
    limit: int = Query(default=100, ge=1, le=500),
) -> dict[str, Any]:
    service = _service()
    canonical = _resolve_or_404(symbol)
    trades = service.get_trades(canonical, limit)
    provenance, source = service.get_symbol_source(canonical)
    return {
        "symbol": canonical,
        "provenance": (provenance or "unavailable") if trades else "unavailable",
        "source": source if trades else None,
        "count": len(trades),
        "items": [t.model_dump() for t in trades],
    }


@router.get("/marketdata/candles/{symbol}")
async def marketdata_candles(
    symbol: str,
    interval: str = Query(default="1m", max_length=4),
    limit: int = Query(default=300, ge=1, le=600),
) -> dict[str, Any]:
    service = _service()
    canonical = _resolve_or_404(symbol)
    candles = service.get_candles(canonical, interval, limit)
    provenance, source = service.get_symbol_source(canonical)
    return {
        "symbol": canonical,
        "interval": interval,
        "provenance": (provenance or "unavailable") if candles else "unavailable",
        "source": source if candles else None,
        "count": len(candles),
        "items": [c.model_dump() for c in candles],
    }


@router.get("/marketdata/derivatives/{symbol}")
async def marketdata_derivatives(
    symbol: str,
    limit_liquidations: int = Query(default=50, ge=1, le=200, alias="liquidations"),
) -> dict[str, Any]:
    service = _service()
    canonical = _resolve_or_404(symbol)
    funding = service.get_funding(canonical)
    open_interest = service.get_open_interest(canonical)
    provenance, source = service.get_symbol_source(canonical)
    any_data = funding is not None or open_interest is not None
    return {
        "symbol": canonical,
        "provenance": (provenance or "unavailable") if any_data else "unavailable",
        "source": source if any_data else None,
        "funding": funding,
        "open_interest": open_interest,
        "liquidations": service.get_liquidations(canonical, limit_liquidations),
    }


@router.get("/marketdata/stats/{symbol}")
async def marketdata_stats(symbol: str) -> dict[str, Any]:
    service = _service()
    canonical = _resolve_or_404(symbol)
    stats = service.get_stats(canonical)
    if stats is None:
        return {"symbol": canonical, "provenance": "unavailable", "data": None}
    provenance, source = service.get_symbol_source(canonical)
    return {
        "symbol": canonical,
        "provenance": provenance or "unavailable",
        "source": source,
        "data": stats,
    }


# ----------------------------------------------------------------------
# WebSocket
# ----------------------------------------------------------------------
def _topics_from_payload(payload: dict[str, Any]) -> list[str]:
    raw = payload.get("topics")
    if not isinstance(raw, list):
        return []
    out: list[str] = []
    for item in raw:
        if isinstance(item, str) and item.strip():
            out.append(item.strip())
    return out


@router.websocket("/ws/market")
async def ws_market(websocket: WebSocket) -> None:
    if not await authenticate_ws(websocket):
        return
    await websocket.accept()
    service = _service()

    from backend.marketdata.bus import UNSUBSCRIBED

    # topic -> bus Subscription (one per topic per client)
    subs: dict[str, Any] = {}
    # topic -> forwarder task
    pumps: dict[str, asyncio.Task] = {}
    # Single serialized outbound channel (reader responses + event envelopes).
    outbox: asyncio.Queue = asyncio.Queue(maxsize=2048)
    dropped_sends = 0

    def _send(payload: dict[str, Any]) -> None:
        """Enqueue an outbound message; drop-oldest if the client is slow."""
        nonlocal dropped_sends
        try:
            outbox.put_nowait(payload)
        except asyncio.QueueFull:
            try:
                outbox.get_nowait()
                dropped_sends += 1
            except asyncio.QueueEmpty:  # pragma: no cover
                pass
            try:
                outbox.put_nowait(payload)
            except asyncio.QueueFull:  # pragma: no cover
                dropped_sends += 1

    def _drop_topic(topic: str) -> None:
        sub = subs.pop(topic, None)
        if sub is not None:
            service.close_subscription(sub)  # wakes the pump via UNSUBSCRIBED

    async def _sender() -> None:
        while True:
            payload = await outbox.get()
            await websocket.send_json(payload)

    async def _pump(topic: str, sub) -> None:
        while True:
            item = await sub.get()
            if item is UNSUBSCRIBED:
                return
            _send(
                {
                    "type": "event",  # message kind (never clobbered by envelope.event)
                    "event": item.type,  # envelope event type (trade, quote, book_delta…)
                    "topic": item.topic,
                    "symbol": item.symbol,
                    "data": item.data,
                    "provenance": item.provenance,
                    "source": item.source,
                    "ts": item.ts,
                }
            )

    async def _reader() -> None:
        while True:
            payload = await websocket.receive_json()
            if not isinstance(payload, dict):
                _send({"type": "error", "message": "Invalid message payload"})
                continue
            op = str(payload.get("op") or "").strip().lower()
            if op == "ping":
                _send({"type": "pong"})
                continue
            if op == "status":
                _send(
                    {
                        "type": "status",
                        "feeds": [feed.model_dump() for feed in service.feed_statuses()],
                        "topics": service.topic_snapshot(),
                    }
                )
                continue
            if op in {"subscribe", "unsubscribe"}:
                topics = _topics_from_payload(payload)
                if not topics:
                    _send({"type": "error", "message": "No valid topics provided"})
                    continue
                if op == "subscribe":
                    accepted: list[str] = []
                    errors: list[dict[str, str]] = []
                    for topic in topics[:_MAX_TOPICS_PER_CLIENT]:
                        try:
                            _, symbol, _ = parse_topic(topic)
                            if split_canonical(symbol) is None:
                                raise ValueError(f"malformed symbol in topic: {topic!r}")
                        except ValueError as exc:
                            errors.append({"topic": topic, "error": str(exc)})
                            continue
                        if topic in subs:
                            accepted.append(topic)
                            continue
                        try:
                            await service.subscribe_topic(topic)
                        except ValueError as exc:
                            errors.append({"topic": topic, "error": str(exc)})
                            continue
                        subs[topic] = service.open_subscription(topic)
                        # Spawn the forwarder immediately — the main loop is
                        # parked in asyncio.wait() and must not be the only
                        # place pumps get created.
                        pumps[topic] = asyncio.create_task(
                            _pump(topic, subs[topic]), name=f"ws-market-pump-{topic}"
                        )
                        accepted.append(topic)
                    _send({"type": "subscribed", "topics": accepted, "errors": errors})
                else:
                    removed: list[str] = []
                    for topic in topics:
                        if topic not in subs:
                            continue
                        _drop_topic(topic)
                        try:
                            await service.unsubscribe_topic(topic)
                        except ValueError:
                            pass
                        removed.append(topic)
                    _send({"type": "unsubscribed", "topics": removed})
                continue
            _send({"type": "error", "message": f"Unsupported op: {op or 'unknown'}"})

    reader_task = asyncio.create_task(_reader(), name="ws-market-reader")
    sender_task = asyncio.create_task(_sender(), name="ws-market-sender")
    try:
        while True:
            done, _ = await asyncio.wait(
                {reader_task, sender_task, *pumps.values()}, return_when=asyncio.FIRST_COMPLETED
            )
            if reader_task in done or sender_task in done:
                break
            for task in done:
                dead = [topic for topic, t in pumps.items() if t is task]
                for topic in dead:
                    pumps.pop(topic, None)
                    _drop_topic(topic)  # pump ended: release the service ref
                    try:
                        await service.unsubscribe_topic(topic)
                    except ValueError:
                        pass
    except WebSocketDisconnect:
        logger.debug("ws market client disconnected")
    except Exception as exc:
        logger.exception("ws market error: %s", exc)
    finally:
        tasks = [reader_task, sender_task, *pumps.values()]
        for task in tasks:
            task.cancel()
        try:
            # Reap cancelled tasks so exceptions (e.g. WebSocketDisconnect in
            # the reader) are retrieved instead of surfacing as GC warnings.
            await asyncio.gather(*tasks, return_exceptions=True)
            for topic in list(subs.keys()):
                _drop_topic(topic)
                try:
                    await service.unsubscribe_topic(topic)
                except (ValueError, KeyError):
                    pass
        except asyncio.CancelledError:
            # Shutdown/cancel path: an already-cancelled endpoint cannot await
            # further. Release synchronously — bus subscriptions directly and
            # service topic refs via release_topic() (which schedules the
            # adapter unsubscribe in the background) — then end cleanly.
            for topic in list(subs.keys()):
                _drop_topic(topic)
                service.release_topic(topic)
            for task in tasks:
                task.cancel()
        if dropped_sends:
            logger.debug("ws market client dropped %d slow-consumer events", dropped_sends)
