"""Order-flow engine (F1 Depth Heat, Phase 1).

The compute core behind the liquidity heatmap: a persistent L2 book, the
time×price depth grid, pure colour normalization, session recording and the
source-resolution service. All compute is local; no new process (plan §3).
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
]
