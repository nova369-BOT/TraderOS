"""Public crypto L2 depth — the ccxt adapter (F1 Depth Heat, H8b).

Venue scope (locked 2026-09-16, plan §2.3): ONE venue per symbol —
**Coinbase primary** (real USD books matching the platform's USD-quoted
symbols; public keyless channels; US-regulated reference venue), **Kraken
fallback** when the primary feed errors. No multi-venue aggregation (a paid
add-on even in the reference product; out of scope).

Data reality this module encodes:

- Public crypto depth tops out at **L2 + side-stamped trades** — there is no
  public L3 on any exchange. That ceiling is exactly what the heatmap paints.
- **Live only**: exchanges expose no L2 history, so ``depth_history`` is an
  honest NotSupported; history for these symbols is what the terminal's own
  session recorder captures (S10), and the pane shows its honest range.
- Both venues' public book/trade channels need **no API key** ($0).

ccxt (MIT) is the transport: its websocket streaming ships in the free
package. The import is lazy and ``configured()`` reflects it, so an install
without ccxt degrades to "source not configured" instead of crashing.

Testing seam: the raw watch loops (``_watch_book`` / ``_watch_trades``) are
overridable async generators; the suite drives the pump/failover/snapshot
logic against recorded fixtures, no network.
"""

from __future__ import annotations

import asyncio
import logging
import re
import time

from lse_terminal.contracts import (
    DEPTH_DELTA,
    DEPTH_SNAPSHOT,
    TRADE_BUY,
    TRADE_SELL,
    TRADE_UNKNOWN,
    DepthEvent,
    Instrument,
    NotSupported,
    Provider,
    TradeEvent,
)

log = logging.getLogger("lse_terminal")

# Venue order = preference order: the primary does the work, the fallback
# only takes over when the primary feed errors (per-symbol failover).
VENUES = ("coinbase", "kraken")

# Platform symbol (normalized) -> market id on each venue. Both venues list
# real USD books under the same unified ccxt market ids, so one id serves
# both. The map IS the product's day-one crypto list; adding a row is the
# whole change to support another pair.
CRYPTO_SYMBOLS = {
    "BTCUSD":  "BTC/USD",
    "ETHUSD":  "ETH/USD",
    "SOLUSD":  "SOL/USD",
    "XRPUSD":  "XRP/USD",
    "ADAUSD":  "ADA/USD",
    "LINKUSD": "LINK/USD",
    "LTCUSD":  "LTC/USD",
    "DOGEUSD": "DOGE/USD",
}

_NAMES = {
    "BTCUSD": "Bitcoin / US Dollar",
    "ETHUSD": "Ethereum / US Dollar",
    "SOLUSD": "Solana / US Dollar",
    "XRPUSD": "XRP / US Dollar",
    "ADAUSD": "Cardano / US Dollar",
    "LINKUSD": "Chainlink / US Dollar",
    "LTCUSD": "Litecoin / US Dollar",
    "DOGEUSD": "Dogecoin / US Dollar",
}

_NORM_RE = re.compile(r"[^A-Z0-9]")


def normalize_symbol(symbol: str) -> str:
    """'BTC/USD', 'btc-usd' and 'BTCUSD' all resolve to 'BTCUSD'."""
    return _NORM_RE.sub("", symbol.upper())


def _ccxt_pro():
    """The ccxt websocket package, imported lazily. Raises ImportError when
    the dependency is missing (a clean 'not configured', never a crash)."""
    import ccxt.pro as ccxtpro  # noqa: PLC0415
    return ccxtpro


class CryptoL2Provider(Provider):
    """Live L2 depth from public exchange feeds (keyless). Depth-only: no
    candles, no history — the pane pairs it with the chart's own source."""

    name = "cryptol2"
    title = "Crypto L2 (public exchange feeds)"
    deterministic = False

    def __init__(self, max_levels: int = 50):
        self.max_levels = int(max_levels)
        self._exchanges: dict = {}   # venue -> ccxt.pro exchange instance
        self._backoff_base = 1.0     # seconds; tests dial this down

    # ── catalog ──────────────────────────────────────────────────────────

    def search(self, query: str = "", limit: int = 50) -> list[Instrument]:
        q = normalize_symbol(query)
        out = []
        for sym, market in CRYPTO_SYMBOLS.items():
            name = _NAMES.get(sym, market)
            if not q or q in sym or q in normalize_symbol(name):
                out.append(Instrument(
                    symbol=sym,
                    name=f"{name} — L2 depth",
                    category="Crypto (public L2)",
                    provider=self.name,
                    meta={"live": True, "market": market, "venues": list(VENUES)},
                ))
        return out[: max(1, limit)]

    def candles(self, symbol: str, timeframe: str, limit: int = 500,
                start: str | None = None, end: str | None = None):
        # Depth-only source: the chart keeps its own candle provider; this
        # one paints the liquidity field behind it.
        raise ValueError(
            f"{self.name} serves order-book depth only, not candles")

    def configured(self) -> bool:
        try:
            _ccxt_pro()
            return True
        except ImportError:
            return False

    def capabilities(self) -> set[str]:
        # depth_history is overridden only to deliver the honest live-only
        # error; the capability itself stays absent.
        caps = super().capabilities()
        caps.discard("depth_history")
        return caps

    # ── depth contract ───────────────────────────────────────────────────

    def depth_history(self, symbol: str, start: float, end: float,
                      column_ms: int = 1000, max_levels: int = 50) -> list:
        # Data honesty (plan §1.3): exchanges expose no L2 history. The
        # terminal's own session recorder is the only history path, and the
        # pane shows its honest range.
        raise NotSupported(
            "crypto exchanges expose no public L2 history; record a session "
            "(Depth Heat recording) to build history for "
            f"{symbol or 'this symbol'}")

    def depth_stream(self, symbols: list[str]):
        """Eager validation per the contract rule: unknown symbols raise at
        CALL time so source resolution sees the real reason."""
        unknown = [s for s in symbols
                   if normalize_symbol(s) not in CRYPTO_SYMBOLS]
        if unknown:
            raise ValueError(
                f"no public L2 mapping for {unknown[0]}; supported: "
                + ", ".join(sorted(CRYPTO_SYMBOLS)))
        try:
            _ccxt_pro()
        except ImportError:
            raise NotSupported(
                "crypto L2 needs the ccxt package (pip install ccxt)")
        return self._stream([normalize_symbol(s) for s in symbols])

    # ── the live stream ──────────────────────────────────────────────────

    async def _stream(self, wanted: list[str]):
        """Merge one book pump + one trade pump per symbol into a single
        ordered stream. Yields DepthEvent (SNAPSHOT first per symbol, then
        DELTAs carrying the transmitted book) and TradeEvent (exchange-
        stamped side)."""
        # Bounded: backpressure so a slow consumer can't balloon memory
        # (pumps await put() instead of queueing unboundedly).
        q: asyncio.Queue = asyncio.Queue(maxsize=1024)
        tasks: list[asyncio.Task] = []
        try:
            for sym in wanted:
                market = CRYPTO_SYMBOLS[sym]
                tasks.append(asyncio.create_task(
                    self._book_pump(sym, market, q)))
                tasks.append(asyncio.create_task(
                    self._trade_pump(sym, market, q)))
            while True:
                item = await q.get()
                yield item
        finally:
            for t in tasks:
                t.cancel()
            if tasks:
                await asyncio.gather(*tasks, return_exceptions=True)
            await self.close()

    async def _book_pump(self, sym: str, market: str, q: asyncio.Queue):
        idx = 0
        first = True
        backoff = self._backoff_base
        while True:
            venue = VENUES[idx % len(VENUES)]
            try:
                async for ob in self._watch_book(venue, market,
                                                 self.max_levels):
                    bids = [(float(p), float(s))
                            for p, s in (ob.get("bids") or [])][: self.max_levels]
                    asks = [(float(p), float(s))
                            for p, s in (ob.get("asks") or [])][: self.max_levels]
                    await q.put(DepthEvent(
                        symbol=sym, ts=time.time(),
                        type=DEPTH_SNAPSHOT if first else DEPTH_DELTA,
                        bids=bids, asks=asks))
                    first = False
                    backoff = self._backoff_base
                    # Cooperative yield: a watcher without internal awaits
                    # (and put() on a non-full queue) never suspends on its
                    # own; without this the pump would starve the consumer.
                    await asyncio.sleep(0)
                # Clean exhaustion (watcher closed): restart the loop.
            except asyncio.CancelledError:
                raise
            except Exception as e:
                # Venue failover: try the next venue, then retry with capped
                # backoff. The primary stays preferred (idx only advances
                # on failure and wraps around).
                idx += 1
                next_venue = VENUES[idx % len(VENUES)]
                log.warning("depth feed %s/%s failed (%s); %s next",
                            venue, market, e, next_venue)
                await asyncio.sleep(min(backoff, 30.0))
                backoff = min(backoff * 2, 30.0)

    async def _trade_pump(self, sym: str, market: str, q: asyncio.Queue):
        idx = 0
        backoff = self._backoff_base
        while True:
            venue = VENUES[idx % len(VENUES)]
            try:
                async for batch in self._watch_trades(venue, market):
                    for t in batch or []:
                        price = t.get("price")
                        size = t.get("amount")
                        if price is None or size is None:
                            continue
                        side = {"buy": TRADE_BUY,
                                "sell": TRADE_SELL}.get(
                                    str(t.get("side", "")).lower(),
                                    TRADE_UNKNOWN)
                        ts_ms = t.get("timestamp")
                        await q.put(TradeEvent(
                            symbol=sym,
                            ts=(ts_ms / 1000.0) if ts_ms else time.time(),
                            price=float(price), size=float(size), side=side))
                        await asyncio.sleep(0)   # same starvation guard
                    backoff = self._backoff_base
            except asyncio.CancelledError:
                raise
            except Exception as e:
                idx += 1
                log.warning("trade feed %s/%s failed (%s)", venue, market, e)
                await asyncio.sleep(min(backoff, 30.0))
                backoff = min(backoff * 2, 30.0)

    # ── raw watch loops (the overridable testing seam) ───────────────────

    def _venue_exchange(self, venue: str):
        if venue not in self._exchanges:
            ccxtpro = _ccxt_pro()
            self._exchanges[venue] = getattr(ccxtpro, venue)({
                # Public channels only: no key material ever configured.
                "enableRateLimit": True,
            })
        return self._exchanges[venue]

    async def _watch_book(self, venue: str, market: str, limit: int):
        ex = self._venue_exchange(venue)
        while True:
            ob = await ex.watch_order_book(market, limit=limit)
            yield ob

    async def _watch_trades(self, venue: str, market: str):
        ex = self._venue_exchange(venue)
        while True:
            trades = await ex.watch_trades(market)
            yield trades

    async def close(self) -> None:
        for ex in self._exchanges.values():
            try:
                await ex.close()
            except Exception:
                pass
        self._exchanges.clear()
