"""In-process async event bus for normalized market events.

Design goals (protocol §13):
- one bus, many subscribers — no competing data pipelines;
- per-topic ordering preserved (each subscriber has its own FIFO queue, and
  ``publish`` enqueues synchronously in publication order);
- bounded queues with explicit drop-oldest accounting (no unbounded memory);
- hard cleanup guarantees (unsubscribe removes the subscriber immediately).

Consumers own their pump: they ``await sub.queue.get()`` in their own task
(WS handler, bridge, recorder). The bus never spawns per-subscriber tasks.
"""

from __future__ import annotations

import asyncio
import logging
from collections import defaultdict
from dataclasses import dataclass, field
from typing import Iterator

from backend.marketdata.types import Envelope

logger = logging.getLogger(__name__)

#: Sentinel pushed to a subscriber's queue by ``unsubscribe`` so a blocked
#: consumer wakes up and can finish its loop deterministically.
UNSUBSCRIBED = object()


@dataclass
class Subscription:
    id: int
    topic: str
    queue: asyncio.Queue
    dropped: int = 0
    received: int = 0

    async def get(self):
        """Await the next item; returns :data:`UNSUBSCRIBED` after unsubscribe."""
        item = await self.queue.get()
        if item is UNSUBSCRIBED:
            return UNSUBSCRIBED
        self.received += 1
        return item


@dataclass
class BusMetrics:
    published: int = 0
    dropped: int = 0


@dataclass
class MarketEventBus:
    """Fan-out bus with per-subscriber bounded FIFO queues."""

    max_queue: int = 4096
    metrics: BusMetrics = field(default_factory=BusMetrics)
    _subscriptions: dict[str, dict[int, Subscription]] = field(
        default_factory=lambda: defaultdict(dict)
    )
    _next_id: int = 1

    def subscribe(self, topic: str) -> Subscription:
        sub = Subscription(
            id=self._next_id,
            topic=topic,
            queue=asyncio.Queue(maxsize=self.max_queue),
        )
        self._next_id += 1
        self._subscriptions[topic][sub.id] = sub
        return sub

    def unsubscribe(self, sub: Subscription) -> None:
        bucket = self._subscriptions.get(sub.topic)
        if bucket is not None and bucket.pop(sub.id, None) is not None:
            if not bucket:
                self._subscriptions.pop(sub.topic, None)
            # Wake any blocked consumer so its loop can end deterministically.
            try:
                sub.queue.put_nowait(UNSUBSCRIBED)
            except asyncio.QueueFull:  # pragma: no cover - drop-oldest policy
                try:
                    sub.queue.get_nowait()
                except asyncio.QueueEmpty:
                    pass
                sub.queue.put_nowait(UNSUBSCRIBED)

    def publish(self, envelope: Envelope) -> None:
        """Enqueue an envelope for every subscriber of its topic.

        Slow subscribers drop their oldest event (counted); producers never
        block. Ordering per subscriber matches publication order.
        """
        bucket = self._subscriptions.get(envelope.topic)
        if not bucket:
            return
        self.metrics.published += 1
        for sub in list(bucket.values()):
            try:
                sub.queue.put_nowait(envelope)
            except asyncio.QueueFull:
                try:
                    sub.queue.get_nowait()
                    sub.dropped += 1
                    self.metrics.dropped += 1
                    sub.queue.put_nowait(envelope)
                except (asyncio.QueueEmpty, asyncio.QueueFull):  # pragma: no cover
                    self.metrics.dropped += 1

    def publish_many(self, envelopes: Iterator[Envelope] | list[Envelope]) -> None:
        for envelope in envelopes:
            self.publish(envelope)

    def subscriber_count(self, topic: str | None = None) -> int:
        if topic is None:
            return sum(len(bucket) for bucket in self._subscriptions.values())
        return len(self._subscriptions.get(topic, {}))

    def topics(self) -> list[str]:
        return sorted(self._subscriptions.keys())

    async def stop(self) -> None:
        """Unsubscribe everyone (used on service shutdown)."""
        for bucket in list(self._subscriptions.values()):
            for sub in list(bucket.values()):
                self.unsubscribe(sub)
        self._subscriptions.clear()
