"""Order-flow orchestration: source resolution + live coalescing (plan §3).

Every source — vault MBO, broker adapters, demo — arrives through the same
two Provider methods; nothing here special-cases a vendor. Resolution is
capability-based and fail-open: the first provider that can actually serve
the symbol wins, and when none can, the caller gets a reason string the UI
shows verbatim (data honesty rule — never silent synthesis).
"""

from __future__ import annotations

import asyncio
import contextlib
import logging

from lse_terminal.contracts import NotSupported

log = logging.getLogger("lse_terminal")


class OrderflowUnavailable(Exception):
    """No source can serve depth for the requested symbol; carries the
    user-visible reason."""


class OrderflowService:
    def __init__(self, registry):
        self.reg = registry

    # ── source resolution ────────────────────────────────────────────────

    def _candidates(self, provider: str | None, cap: str):
        """Providers worth trying, explicit name first, then registry order.
        User-owned sources (custom/userdata/broker) and demo are never gated
        (existing rule); gating for plan sources is enforced inside the
        provider itself."""
        try:
            explicit = [self.reg.get(provider)] if provider else []
        except ValueError:
            raise OrderflowUnavailable(f"unknown provider: {provider}")
        rest = [p for p in self.reg.all() if p not in explicit]
        return [p for p in (*explicit, *rest) if cap in p.capabilities()]

    def resolve_history(self, symbol: str, start: float, end: float,
                        column_ms: int = 1000, max_levels: int = 50,
                        provider: str | None = None):
        """First provider that serves depth history for the symbol.

        Returns ``(provider, events)``; raises OrderflowUnavailable with the
        collected reasons when nobody can (the pane shows that reason)."""
        reasons: list[str] = []
        cands = self._candidates(provider, "depth_history")
        if not cands:
            raise OrderflowUnavailable(
                f"no depth source installed for {symbol} — order-book depth "
                "needs a source that carries it (demo symbols work out of "
                "the box)")
        for p in cands:
            try:
                events = p.depth_history(symbol, start, end,
                                         column_ms=column_ms,
                                         max_levels=max_levels)
                return p, list(events)
            except NotSupported as e:
                reasons.append(f"{p.name}: {e}")
            except ValueError as e:
                reasons.append(f"{p.name}: {e}")
            except Exception as e:  # a broken source must not kill the pane
                log.warning("depth_history failed on %s: %s", p.name, e)
                reasons.append(f"{p.name}: failed ({e})")
        raise OrderflowUnavailable(
            f"no depth source for {symbol}: " + "; ".join(reasons))

    def resolve_stream(self, symbol: str, provider: str | None = None):
        """First provider whose live depth stream opens for the symbol.

        Returns ``(provider, async_iterator)``; raises OrderflowUnavailable
        otherwise."""
        reasons: list[str] = []
        cands = self._candidates(provider, "depth_stream")
        if not cands:
            raise OrderflowUnavailable(
                f"no live depth source installed for {symbol}")
        for p in cands:
            try:
                agen = p.depth_stream([symbol])
                return p, agen
            except NotSupported as e:
                reasons.append(f"{p.name}: {e}")
            except ValueError as e:
                reasons.append(f"{p.name}: {e}")
            except Exception as e:
                log.warning("depth_stream failed on %s: %s", p.name, e)
                reasons.append(f"{p.name}: failed ({e})")
        raise OrderflowUnavailable(
            f"no live depth for {symbol}: " + "; ".join(reasons))

    # ── live coalescing ──────────────────────────────────────────────────

    async def coalesced(self, symbol: str, hz: float = 15.0,
                        provider: str | None = None):
        """Async generator: the provider's depth stream coalesced to at most
        ``hz`` updates per second. A burst of deltas between flushes collapses
        to the LATEST state per symbol — intermediate states are dropped, the
        newest one never is (plan §3 service contract). TradeEvents pass
        through immediately: prints are events, not state — every one matters,
        none coalesce."""
        from lse_terminal.contracts import DepthEvent

        # Resolution may block on a provider's first-connect work (e.g. the
        # a provider's first network touch), so it runs in
        # a worker thread, never on the engine's event loop.
        _, agen = await asyncio.to_thread(self.resolve_stream, symbol,
                                          provider)
        latest: dict = {}
        trades: list = []
        pump_error: list = []
        done = asyncio.Event()

        async def pump():
            try:
                async for ev in agen:
                    if isinstance(ev, DepthEvent):
                        latest[ev.symbol or symbol] = ev
                    else:
                        trades.append(ev)
            except Exception as e:  # lazy validation in third-party sources
                pump_error.append(e)
            finally:
                done.set()

        task = asyncio.create_task(pump())
        period = 1.0 / max(hz, 0.5)
        try:
            while True:
                await asyncio.sleep(period)
                while trades:
                    yield trades.pop(0)
                while latest:
                    yield latest.pop(next(iter(latest)))
                if done.is_set():
                    if pump_error and not trades and not latest:
                        raise pump_error[0]
                    break
        finally:
            if not task.done():
                task.cancel()
            with contextlib.suppress(asyncio.CancelledError, Exception):
                await task
            with contextlib.suppress(Exception):
                await agen.aclose()
