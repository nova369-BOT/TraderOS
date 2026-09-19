"""Built-in providers. These double as the reference implementations for the
Provider contract: `demo` shows the minimum viable shape (no network, no auth),
`lse` shows a real remote source with auth, catalog, and streaming.
"""

from lse_terminal.providers.binance_perp import BinancePerpProvider
from lse_terminal.providers.coinbase import CoinbaseProvider
from lse_terminal.providers.demo import DemoProvider
from lse_terminal.providers.lse import LseProvider
from lse_terminal.providers.userdata import UserDataProvider
from lse_terminal.providers.crypto_l2 import CryptoL2Provider
from lse_terminal.providers.edgedepth.provider import EdgeDepthProvider
from lse_terminal.providers.mbo import MboProvider

__all__ = ["BinancePerpProvider", "CoinbaseProvider", "CryptoL2Provider", "DemoProvider",
           "EdgeDepthProvider", "LseProvider", "MboProvider",
           "UserDataProvider"]
