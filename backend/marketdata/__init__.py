"""Unified market-data foundation (Phase 1).

Normalized model → event bus → single source of truth. See
``backend/marketdata/service.py`` for the architecture notes.
"""

from backend.marketdata.service import (
    MarketDataService,
    get_marketdata_service,
    reset_marketdata_service,
)

__all__ = [
    "MarketDataService",
    "get_marketdata_service",
    "reset_marketdata_service",
]
