"""The data provider contract.

A provider is the terminal's window onto one data source: the LSE vault, a
folder of CSVs, an exchange, a broker. Implement this class in any pip
package, expose it under the ``lse_terminal.providers`` entry-point group,
and the terminal discovers it automatically.

Only ``search`` and ``candles`` are mandatory. Everything else degrades
gracefully in the UI when it raises :class:`NotSupported`.
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from typing import AsyncIterator

import pandas as pd

from lse_terminal.contracts.types import Instrument, Quote


class NotSupported(Exception):
    """Raised by optional provider methods the source cannot serve."""


class Provider(ABC):
    # Machine identifier, unique across installed providers (used in URLs).
    name: str = ""
    # Human label shown in the UI.
    title: str = ""
    # Timeframes this source can serve, in UI display order.
    timeframes: list[str] = ["1m", "5m", "15m", "1h", "4h", "1d"]
    # Providers that return identical data for identical calls (used by the
    # compliance harness to enable determinism checks).
    deterministic: bool = False

    @abstractmethod
    def search(self, query: str = "", limit: int = 50) -> list[Instrument]:
        """Instruments matching ``query`` (empty query = a sensible default list).

        Presentation contract (the translator layer): the UI renders whatever
        arrives here with NO source-specific rules of its own, so a provider
        adapting a new broker/vendor must normalize to this shape:
        - ``category`` is a display-ready group label ("Forex", "US Stocks").
        - ``name`` is the instrument's human display name ("Euro / US Dollar",
          "Apple Inc."); empty only when the source truly has none.
        - For an empty query, results arrive grouped contiguously by category,
          groups and rows already in the order the source wants them shown.
          The sidebar renders that order verbatim, one collapsible folder per
          category.
        """

    @abstractmethod
    def candles(
        self,
        symbol: str,
        timeframe: str,
        limit: int = 500,
        start: str | None = None,
        end: str | None = None,
    ) -> pd.DataFrame:
        """OHLCV history as a DataFrame with exactly ``CANDLE_COLUMNS``, ts ascending."""

    def quote(self, symbol: str) -> Quote:
        raise NotSupported(f"{self.name} does not serve quotes")

    def stream(self, symbols: list[str]) -> AsyncIterator[dict]:
        """Async iterator of tick dicts: {symbol, price, ts, bid?, ask?, volume?}.

        Ticks may additionally carry ``side`` (BUY / SELL / INFERRED-BUY /
        INFERRED-SELL / UNKNOWN) — the aggressor side of the print, used for
        the Depth Heat volume dots. Optional and backward compatible: sources
        without a side simply omit the key and the UI degrades (plan §2.1).
        """
        raise NotSupported(f"{self.name} does not stream")

    def depth_history(
        self,
        symbol: str,
        start: float,
        end: float,
        column_ms: int = 1000,
        max_levels: int = 50,
    ) -> list:
        """Order-book depth history as a list of :class:`DepthEvent`.

        First event is a SNAPSHOT, the rest are DELTAs. Sources that keep no
        depth history raise :class:`NotSupported`; the pane then shows its
        honest range (data honesty rule, plan §1.3).
        """
        raise NotSupported(f"{self.name} does not serve depth history")

    def depth_stream(self, symbols: list[str]) -> AsyncIterator:
        """Async iterator of :class:`DepthEvent`: SNAPSHOT per subscribed
        symbol first, then DELTAs, in arrival order. Sources may interleave
        :class:`TradeEvent` prints (consumers dispatch on type).

        Implementation rule: validate eagerly. This call must RAISE for
        unknown/unserveable symbols instead of returning an iterator whose
        first ``__anext__`` raises — source resolution decides availability
        from the call itself (an async-generator body would defer that)."""
        raise NotSupported(f"{self.name} does not stream depth")

    def trade_history(
        self,
        symbol: str,
        start: float,
        end: float,
        column_ms: int = 1000,
    ) -> list:
        """Executed-print history as list of TradeEvent (footprint, VPVR, CVD)."""
        raise NotSupported(f"{self.name} does not serve trade history")

    def liquidation_stream(self, symbols: list[str]) -> AsyncIterator:
        """Async iterator of liquidation events (real liquidations)."""
        raise NotSupported(f"{self.name} does not stream liquidations")

    def configured(self) -> bool:
        """False when the source needs setup (an API key, a path) it doesn't have."""
        return True

    def capabilities(self) -> set[str]:
        """Which optional surfaces this provider actually implements."""
        caps = {"search", "candles"}
        if type(self).quote is not Provider.quote:
            caps.add("quote")
        if type(self).stream is not Provider.stream:
            caps.add("stream")
        if type(self).depth_history is not Provider.depth_history:
            caps.add("depth_history")
        if type(self).depth_stream is not Provider.depth_stream:
            caps.add("depth_stream")
        if type(self).trade_history is not Provider.trade_history:
            caps.add("trade_history")
        if type(self).liquidation_stream is not Provider.liquidation_stream:
            caps.add("liquidation_stream")
        # orderflow composite: footprint, VPVR, TPO, CVD, liquidation, DOM, tape
        # Any provider with depth_stream+stream can serve orderflow
        if "depth_stream" in caps and "stream" in caps:
            caps.add("orderflow")
        return caps
