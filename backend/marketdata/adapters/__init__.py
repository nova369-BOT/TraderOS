"""Market-data adapter contract.

An adapter owns one exchange namespace (e.g. ``BINANCE``) and serves the
canonical topics for that namespace. The service ref-counts topics and asks
adapters to (un)subscribe; adapters publish normalized envelopes onto the bus
with explicit provenance.
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Callable

from backend.marketdata.types import Envelope, FeedStatus, SymbolInfo

Publisher = Callable[[Envelope], None]


class MarketDataAdapter(ABC):
    """Interface implemented by real exchange adapters and the simulator."""

    #: canonical exchange namespace, e.g. "BINANCE" / "SIM"
    exchange: str
    #: feed identifier used in status surfaces, e.g. "binance", "simulator"
    feed_name: str

    @abstractmethod
    async def start(self) -> None:
        """Initialize the adapter (idempotent)."""

    @abstractmethod
    async def stop(self) -> None:
        """Tear down all tasks/connections. Must not leak."""

    @abstractmethod
    async def subscribe(self, stream: str, instrument: str, param: str | None) -> None:
        """Serve ``{stream}:{EXCHANGE}:{instrument}[:param]`` events on the bus."""

    @abstractmethod
    async def unsubscribe(self, stream: str, instrument: str, param: str | None) -> None:
        """Stop serving a topic. Close idle connections after a grace period."""

    @abstractmethod
    def status(self) -> FeedStatus:
        """Current feed status with counters (events, invalid, reconnects…)."""

    @abstractmethod
    async def list_symbols(self, query: str | None = None) -> list[SymbolInfo]:
        """Symbol catalog for this exchange (static info)."""

    def handles(self, exchange: str) -> bool:
        return exchange.strip().upper() == self.exchange
