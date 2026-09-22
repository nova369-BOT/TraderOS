"""Order-flow engine — full EdgeDepth port (F1 Depth Heat + F2 Orderflow).

The compute core behind the liquidity heatmap AND full orderflow suite:
- Depth Heat: persistent L2 book, time×price depth grid, colour normalization
- Footprint: per-minute per-price buy/sell volume, delta, imbalance, stacks
- Volume Profile: VPVR with POC/VAH/VAL
- TPO: market profile from 30m candles
- CVD: cumulative volume delta
- Liquidation: modelled Field + real levels (Binance forceOrder)
- DOM: ladder with grouping, USD/coin, trade columns
- Tape: time & sales with size highlighting

All compute local, no child process, uses Binance/Coinbase/Hyperliquid L2/L3.
Ultra-fast, no lags, one go integration.
"""

from lse_terminal.engine.orderflow.book import DepthBook
from lse_terminal.engine.orderflow.grid import DepthGrid
from lse_terminal.engine.orderflow.normalize import (
    SCHEMES,
    build_lut,
    cutoff_values,
    quantize_lut,
    size_to_index,
)
from lse_terminal.engine.orderflow.session import SessionRecorder, read_events
from lse_terminal.engine.orderflow.service import OrderflowService
from lse_terminal.engine.orderflow.footprint import FootprintManager
from lse_terminal.engine.orderflow.volume_profile import VolumeProfileManager
from lse_terminal.engine.orderflow.tpo import TPOManager
from lse_terminal.engine.orderflow.cvd import CVDManager
from lse_terminal.engine.orderflow.liquidation import LiquidationManager
from lse_terminal.engine.orderflow.dom import DOMManager
from lse_terminal.engine.orderflow.tape import TapeManager
from lse_terminal.engine.orderflow.orderflow_manager import OrderflowManager, orderflow_manager

__all__ = [
    "DepthBook",
    "DepthGrid",
    "SCHEMES",
    "build_lut",
    "cutoff_values",
    "quantize_lut",
    "size_to_index",
    "SessionRecorder",
    "read_events",
    "OrderflowService",
    "FootprintManager",
    "VolumeProfileManager",
    "TPOManager",
    "CVDManager",
    "LiquidationManager",
    "DOMManager",
    "TapeManager",
    "OrderflowManager",
    "orderflow_manager",
]
