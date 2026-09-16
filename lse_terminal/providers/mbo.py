"""Vault MBO provider — real order-by-order futures depth (F1 Depth Heat, H9).

The vault's ``/vault/mbo/*`` door is the one real depth source behind the
terminal today (plan §2.3): true L3 events — ``seq`` (exchange sequence
no.), ``ts``, ``price``, ``size``, ``type ∈ {NEW, CHANGE, DELETE}``,
``side ∈ {BUY, SELL}`` — from which the resting book is reconstructable.
Entitlement is server-side per key plan; keys without it get an honest
NotSupported, never synthesis.

This module MOVES the Level-3 rail's proven client logic engine-side
(plan §2.3 wiring order #1) so the pane, the rail and recording share one
MBO feed per symbol:

- **seq-gated dedupe**: polls overlap; only ``seq`` above the watermark is
  applied. A max seq far below the watermark means the capture restarted
  and renumbered — the watermark resets instead of dropping everything.
- **level netting** (the rail's precedent): ``NEW`` adds size to the
  price level, ``DELETE`` pulls it; ``CHANGE`` carries no order id on this
  door, so it is counted but does not move level size — exactly as the
  in-product rail does.
- **honest reach**: the door serves sliding windows to 60 s with a 1–5 s
  visibility lag (batch flush). History is clamped to a bounded number of
  windows and the live stream ends ~5 s behind the exchange; the pane
  paints heat only where real heat exists.

Testing seam: ``_fetch(path, params)`` is overridable; the suite drives
the whole provider against fixture payloads with no network.
"""

from __future__ import annotations

import json
import logging
import time
import urllib.parse
import urllib.request

from lse_terminal.contracts import (
    DEPTH_DELTA,
    DEPTH_SNAPSHOT,
    DepthEvent,
    Instrument,
    NotSupported,
    Provider,
)

log = logging.getLogger("lse_terminal")

VAULT_URL = "https://api.londonstrategicedge.com/vault"

MAX_WINDOW_S = 60.0          # the door's sliding-window ceiling
LIVE_LAG_S = 5.0             # recorder flush lag: a now()-ending window is
                             # randomly empty; serve windows shifted back
POLL_S = 2.0                 # rail cadence
STREAM_WINDOW_S = 4.0        # overlapping polls (4 s window / 2 s cadence)
MAX_HISTORY_WINDOWS = 10     # bounded history reach: 10 × 60 s
MAX_EVENTS_PER_WINDOW = 20000


class MboUnavailable(NotSupported):
    """The MBO door exists but cannot serve right now (no key, no plan
    entitlement, door down) — carries the user-visible reason."""


class MboProvider(Provider):
    """Real depth from the vault's order-by-order futures capture.
    Depth-only: candles stay with the chart's own source."""

    name = "mbo"
    title = "Vault MBO (order-by-order futures)"
    deterministic = False

    def __init__(self, vault_url: str = VAULT_URL, timeout: float = 10.0):
        self.vault_url = vault_url.rstrip("/")
        self.timeout = float(timeout)
        self._status_cache: tuple[float, dict] | None = None

    # ── vault client (key engine-side only, UA parity with the proxy) ────

    def _key(self) -> str | None:
        from lse_terminal.engine.config import get_lse_api_key
        return get_lse_api_key()

    def _fetch(self, path: str, params: dict) -> dict:
        """One authenticated vault GET. Overridable in tests."""
        from lse_terminal import __version__
        key = self._key()
        if not key:
            raise MboUnavailable("no LSE API key configured — MBO depth "
                                 "needs an entitled key")
        req = urllib.request.Request(
            self.vault_url + path + "?" + urllib.parse.urlencode(params),
            headers={"x-api-key": key,
                     # default urllib UA is 403'd at the edge WAF (same
                     # parity rule as every other outbound call)
                     "User-Agent": f"lse-terminal/{__version__}"})
        try:
            with urllib.request.urlopen(req, timeout=self.timeout) as r:
                return json.loads(r.read())
        except urllib.error.HTTPError as e:
            if e.code in (401, 403):
                raise MboUnavailable(
                    "this key's plan does not include MBO depth")
            raise MboUnavailable(f"vault MBO door error ({e.code})")
        except Exception as e:
            raise MboUnavailable(f"vault MBO door unreachable: {e}")

    def _status(self, max_age: float = 600.0) -> dict:
        """``{available, symbols: chart symbol -> contract}``, cached:
        entitlement flips on plan changes, contracts on rolls."""
        now = time.time()
        if self._status_cache and now - self._status_cache[0] < max_age:
            return self._status_cache[1]
        try:
            rows = self._fetch("/mbo/contracts", {}).get("contracts", [])
            symbols: dict[str, str] = {}
            for c in rows:
                if c.get("canonical_symbol"):
                    symbols[str(c["canonical_symbol"]).upper()] = (
                        c["active_contract"])
                if c.get("root"):
                    symbols[str(c["root"]).upper() + ".F"] = (
                        c["active_contract"])
            out = {"available": True, "symbols": symbols}
        except MboUnavailable:
            out = {"available": False, "symbols": {}}
        self._status_cache = (now, out)
        return out

    def _contract(self, symbol: str) -> str:
        """Chart symbol → recorded contract, or an honest NotSupported."""
        st = self._status()
        if not st["available"]:
            raise MboUnavailable(
                "MBO depth needs an entitled LSE key (this key reports no "
                "MBO access)")
        contract = st["symbols"].get(symbol.strip().upper())
        if not contract:
            raise NotSupported(
                f"no MBO capture for {symbol} — covered contracts: "
                + (", ".join(sorted(st["symbols"])) or "none listed"))
        return contract

    # ── catalog ──────────────────────────────────────────────────────────

    def configured(self) -> bool:
        return bool(self._key())

    def search(self, query: str = "", limit: int = 50) -> list[Instrument]:
        try:
            st = self._status()
        except MboUnavailable:
            return []
        if not st["available"]:
            return []
        q = query.strip().upper()
        out = []
        for sym, contract in sorted(st["symbols"].items()):
            if not q or q in sym or q in contract.upper():
                out.append(Instrument(
                    symbol=sym,
                    name=f"{contract} — order-by-order depth",
                    category="Futures (vault MBO)",
                    provider=self.name,
                    meta={"contract": contract, "level": "L3"},
                ))
        return out[: max(1, limit)]

    def candles(self, symbol: str, timeframe: str, limit: int = 500,
                start: str | None = None, end: str | None = None):
        raise ValueError(f"{self.name} serves order-book depth only, not candles")

    # ── L3 → L2 reconstruction (rail semantics, engine-side) ────────────

    @staticmethod
    def _apply_event(book: dict, ev: dict, changed: dict) -> None:
        """Net one MBO event into the price-level book.
        BUY → bid side, SELL → ask side; NEW adds, DELETE pulls (a level
        that nets to zero is removed with an explicit size-0 delta);
        CHANGE has no order id on this door and does not move size — the
        rail's precedent."""
        side = str(ev.get("side", "")).upper()
        price = ev.get("price")
        size = float(ev.get("size") or 0.0)
        etype = str(ev.get("type", "")).upper()
        if price is None or side not in ("BUY", "SELL"):
            return
        price = float(price)
        levels = book.setdefault(side, {})
        if etype == "NEW":
            levels[price] = levels.get(price, 0.0) + size
            changed[(side, price)] = levels[price]
        elif etype == "DELETE":
            new = levels.get(price, 0.0) - size
            if new <= 0:
                levels.pop(price, None)
                changed[(side, price)] = 0.0
            else:
                levels[price] = new
                changed[(side, price)] = new
        # CHANGE: counted in the flow, no size move (see module docstring)

    @staticmethod
    def _delta_event(symbol: str, ts: float, etype: str,
                     changed: dict) -> DepthEvent:
        bids = sorted(((p, s) for (sd, p), s in changed.items()
                       if sd == "BUY"), key=lambda kv: -kv[0])
        asks = sorted(((p, s) for (sd, p), s in changed.items()
                       if sd == "SELL"), key=lambda kv: kv[0])
        return DepthEvent(symbol=symbol, ts=float(ts), type=etype,
                          bids=bids, asks=asks)

    def _windows(self, start: float, end: float):
        """Vault windows covering [start, end], each ≤ 60 s, honest about
        the door's live lag."""
        from datetime import datetime, timedelta, timezone
        end = min(end, time.time() - LIVE_LAG_S)
        start = max(start, end - MAX_HISTORY_WINDOWS * MAX_WINDOW_S)
        t = start
        while t < end:
            w_end = min(t + MAX_WINDOW_S, end)
            yield (datetime.fromtimestamp(t, tz=timezone.utc),
                   datetime.fromtimestamp(w_end, tz=timezone.utc))
            t = w_end

    def depth_history(self, symbol: str, start: float, end: float,
                      column_ms: int = 1000, max_levels: int = 50) -> list:
        contract = self._contract(symbol)   # raises honestly, eagerly
        column_ms = max(100, int(column_ms))
        book: dict = {}
        watermark = 0
        events: list = []
        emitted_first = False
        for w_start, w_end in self._windows(start, end):
            body = self._fetch("/mbo/events", {
                "symbol": contract,
                "start": w_start.isoformat(),
                "end": w_end.isoformat(),
                "limit": MAX_EVENTS_PER_WINDOW,
            })
            rows = sorted(body.get("events", []),
                          key=lambda e: int(e.get("seq", 0)))
            # Recorder restart: seqs collapse — reset the gate, keep going.
            if rows and rows[-1].get("seq", 0) and \
                    rows[-1]["seq"] < watermark / 2:
                watermark = 0
            changed: dict = {}
            col_ts = None
            for ev in rows:
                seq = int(ev.get("seq", 0))
                if seq <= watermark:
                    continue
                watermark = seq
                ts = float(ev.get("ts") or 0.0)
                cs = int(ts * 1000 // column_ms * column_ms) / 1000.0
                if col_ts is not None and cs > col_ts:
                    events.append(self._delta_event(
                        symbol, col_ts,
                        DEPTH_SNAPSHOT if not emitted_first else DEPTH_DELTA,
                        changed))
                    emitted_first = True
                    changed = {}
                col_ts = cs
                self._apply_event(book, ev, changed)
            if col_ts is not None and changed:
                events.append(self._delta_event(
                    symbol, col_ts,
                    DEPTH_SNAPSHOT if not emitted_first else DEPTH_DELTA,
                    changed))
                emitted_first = True
            if len(events) > 20000:
                break   # bounded answer; the pane paints what exists
        return events

    # ── live stream ──────────────────────────────────────────────────────

    def depth_stream(self, symbols: list[str]):
        """Eager validation per the contract rule: symbols without a capture
        raise at CALL time so resolution sees the real reason."""
        contracts = {}
        for s in symbols:
            contracts[s.strip().upper()] = self._contract(s)
        return self._stream(contracts)

    async def _stream(self, contracts: dict[str, str]):
        import asyncio
        from datetime import datetime, timedelta, timezone

        book: dict = {}
        watermark = 0
        first = True
        while True:
            changed: dict = {}
            now = datetime.now(timezone.utc) - timedelta(seconds=LIVE_LAG_S)
            newest_ts = time.time()
            for symbol, contract in contracts.items():
                try:
                    body = self._fetch("/mbo/events", {
                        "symbol": contract,
                        "start": (now - timedelta(
                            seconds=STREAM_WINDOW_S)).isoformat(),
                        "end": now.isoformat(),
                        "limit": MAX_EVENTS_PER_WINDOW,
                    })
                except MboUnavailable as e:
                    if first:
                        raise
                    log.warning("mbo poll failed (%s)", e)
                    continue
                rows = sorted(body.get("events", []),
                              key=lambda e: int(e.get("seq", 0)))
                if rows and rows[-1].get("seq", 0) and \
                        rows[-1]["seq"] < watermark / 2:
                    watermark = 0
                for ev in rows:
                    seq = int(ev.get("seq", 0))
                    if seq <= watermark:
                        continue
                    watermark = seq
                    newest_ts = max(newest_ts, float(ev.get("ts") or 0.0))
                    self._apply_event(book, ev, changed)
            if changed or first:
                yield self._delta_event(
                    next(iter(contracts)), newest_ts,
                    DEPTH_SNAPSHOT if first else DEPTH_DELTA, changed)
                first = False
            await asyncio.sleep(POLL_S)
