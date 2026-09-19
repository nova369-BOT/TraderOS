"""Market-data pipeline diagnostics — T-stamps and live health (recovery
task §7/§20/§26/§27).

Every boundary of the data path carries a timestamp:

    T1  venue event time   (carried by the venue's own payload: aggTrade T,
                          trade time, ... — i.e. exchange truth, not an estimate)
    T4  LSE receive        (client pump, right after the frame is decoded)
    T6  LSE normalized     (the moment the event enters the LSE stream)
    T7a engine WS emit     (right before the frame leaves for the browser)
    T7b browser receive    (posted back by the UI)
    T8  chart rendered     (posted back by the UI, nested-rAF approximation)

Segments (S1=T4-T1, S2=T7a-T6, S3=T7b-T7a, S4=T8-T7b, E2E=T8-T1) are
aggregated into avg/median/p95/max per provider. Samples across process
boundaries compare WALL CLOCKS: NTP skew applies to S3/S5 — always reported
with that caveat, never hidden.

Design duty: this module measures hot paths and therefore must never become
one — deque appends only, no locks, no allocation beyond the ring.
Also answers §20/§27: per-provider connection-agnostic health based on
event RECENCY, not socket state — a connected socket with no market data
reports STALE, by rule.
"""

from __future__ import annotations

import statistics
import time
from collections import deque
from typing import Dict, Optional

_RING = 600            # samples per (provider[, symbol]); BTC bursts fill it in seconds

# A "live" provider silent for this long is stale. MT5-style: silence is
# data too, but 15s of NOTHING on a streaming book means the pipe is dead.
STALE_AFTER_S = 15.0


class Diag:
    """Process-wide market-data telemetry. One instance (module bottom)."""

    def __init__(self):
        # (provider, symbol) -> deque[(norm_ts, venue_ts, recv_ts)]
        self._norm: Dict[tuple, deque] = {}
        # (provider, symbol) -> deque[(emit_ts, norm_ts)]
        self._emit: Dict[tuple, deque] = {}
        # (provider, symbol) -> deque[(render_ts, recv_ts, emit_ts, venue_ts)]
        self._browser: Dict[tuple, deque] = {}
        # health: what happened last, per provider
        self._last_norm: Dict[str, float] = {}
        self._last_venue: Dict[str, float] = {}
        self._last_emit: Dict[str, float] = {}
        self._visits: Dict[str, int] = {}       # normalized events, lifetime
        self._recent: Dict[str, deque] = {}     # provider -> deque[norm_ts] (eps)
        self._last_kind: Dict[str, float] = {}  # "provider.kind" -> last norm ts
        self._kind_visits: Dict[str, int] = {}
        self._consumers: Dict[str, int] = {}    # open /api/ws streams

    # -- producer stamps --------------------------------------------------

    def watch_open(self, provider: str) -> None:
        self._consumers[provider] = self._consumers.get(provider, 0) + 1

    def watch_close(self, provider: str) -> None:
        self._consumers[provider] = max(
            0, self._consumers.get(provider, 0) - 1)

    def observe(self, provider: str, symbol: str, venue_ts: float,
                recv_ts: Optional[float] = None, kind: str = "trade"
                ) -> None:
        """A normalized event entered the LSE stream (T6). ``venue_ts`` is
        the venue's own event time (T1); ``recv_ts`` the client-side frame
        receipt (T4) when the client layer can stamp it."""
        now = time.time()
        key = (provider, symbol)
        ring = self._norm.get(key)
        if ring is None:
            ring = self._norm[key] = deque(maxlen=_RING)
        ring.append((now, venue_ts, recv_ts))
        self._last_norm[provider] = now
        pk = f"{provider}.{kind}"
        self._last_kind[pk] = now
        self._kind_visits[pk] = self._kind_visits.get(pk, 0) + 1
        if venue_ts:
            self._last_venue[provider] = venue_ts
        self._visits[provider] = self._visits.get(provider, 0) + 1
        recent = self._recent.get(provider)
        if recent is None:
            recent = self._recent[provider] = deque(maxlen=2048)
        recent.append(now)

    def emit(self, provider: str, symbol: str, emit_ts: Optional[float] = None
              ) -> None:
        """The engine sent one tick frame to a browser (T7a)."""
        now = emit_ts or time.time()
        key = (provider, symbol)
        ring = self._emit.get(key)
        if ring is None:
            ring = self._emit[key] = deque(maxlen=_RING)
        ring.append((now, self._last_norm.get(provider)))
        self._last_emit[provider] = now

    def ingest_browser(self, samples: list) -> None:
        """Browser-side T7b/T8, batched by the UI. Each sample:
        {provider, symbol, recv, render, emit, venue_ts} (all epoch s)."""
        for s in samples:
            try:
                key = (str(s["provider"]), str(s["symbol"]))
                ring = self._browser.get(key)
                if ring is None:
                    ring = self._browser[key] = deque(maxlen=_RING)
                ring.append((float(s["render"]), float(s["recv"]),
                             float(s.get("emit") or 0.0),
                             float(s.get("venue_ts") or 0.0)))
            except (KeyError, TypeError, ValueError):
                continue

    # -- health (§20/§27) --------------------------------------------------

    def health(self) -> dict:
        now = time.time()
        kinds: Dict[str, dict] = {}
        for pk, ts in self._last_kind.items():
            provider, kind = pk.split(".", 1)
            kinds.setdefault(provider, {})[kind] = {
                "last_event_age_s": round(now - ts, 3),
                "events_lifetime": self._kind_visits.get(pk, 0)}
        out = {}
        for provider, last in self._last_norm.items():
            recent = self._recent.get(provider)
            eps = 0.0
            if recent:
                while recent and now - recent[0] > 60:
                    recent.popleft()
                eps = len(recent) / 60.0 if recent else 0.0
            age = now - last
            venue_lag = (last - self._last_venue.get(provider, last))
            consumers = self._consumers.get(provider, 0)
            # IDLE vs STALE: with nobody subscribed the feed legitimately
            # sleeps. STALE means consumers are WAITING on a silent pipe —
            # the only state anyone must act on (§27).
            state = ("IDLE" if consumers == 0
                     else ("STALE" if age > STALE_AFTER_S else "LIVE"))
            out[provider] = {
                "provider": provider,
                "data_state": state,
                "stale": state == "STALE",
                "consumers": consumers,
                "last_event_age_s": round(age, 3),
                "last_event_wall": round(last, 3),
                "venue_origin_lag_s": round(venue_lag, 3),
                "events_per_s_60s": round(eps, 2),
                "events_lifetime": self._visits.get(provider, 0),
                # socket state never speaks here: recency is the truth
                "by_kind": kinds.get(provider, {}),
            }
        return {"stale_after_s": STALE_AFTER_S,
                "note": "data recency, not socket state: a connected silent "
                        "socket is STALE by rule",
                "providers": out}

    # -- latency report (§26) ---------------------------------------------

    def latency(self, provider: Optional[str] = None) -> dict:
        seg = {"s1_venue_to_norm": [], "s2_norm_to_ws": [],
               "s3_ws_to_browser": [], "s4_browser_render": [], "s5_e2e": []}
        for (p, _sym), ring in self._norm.items():
            if provider and p != provider:
                continue
            for norm_ts, venue_ts, recv_ts in ring:
                if venue_ts:
                    seg["s1_venue_to_norm"].append(norm_ts - venue_ts)
        for (p, _sym), ring in self._emit.items():
            if provider and p != provider:
                continue
            for emit_ts, norm_ts in ring:
                if norm_ts:
                    seg["s2_norm_to_ws"].append(emit_ts - norm_ts)
        skew_note = ("compares clocks across machines; NTP skew applies"
                     if not provider or provider else
                     "compares the engine's clock with the browser's; "
                     "NTP skew applies")
        for (p, _sym), ring in self._browser.items():
            if provider and p != provider:
                continue
            for render_ts, recv_ts, emit_ts, venue_ts in ring:
                if emit_ts:
                    seg["s3_ws_to_browser"].append(recv_ts - emit_ts)
                seg["s4_browser_render"].append(render_ts - recv_ts)
                if venue_ts:
                    seg["s5_e2e"].append(render_ts - venue_ts)
        out = {}
        for name, vals in seg.items():
            vals = [v * 1000.0 for v in vals
                    if 0 <= v < 300]  # clamp absurd clock-skew artifacts
            out[name] = _stats(vals)
        return {"unit": "ms",
                "segments": {
                    "s1_venue_to_norm": "T1 venue event -> LSE normalized",
                    "s2_norm_to_ws": "T6 normalized -> engine WS emit",
                    "s3_ws_to_browser": "T7a emit -> browser receive (*)",
                    "s4_browser_render": "browser receive -> chart rendered",
                    "s5_e2e": "T1 venue event -> chart rendered (*)",
                },
                "skew_note": skew_note,
                "stats": out}


def _stats(vals) -> dict:
    n = len(vals)
    if n == 0:
        return {"n": 0}
    vals = sorted(vals)
    return {
        "n": n,
        "avg": round(sum(vals) / n, 3),
        "median": round(statistics.median(vals), 3),
        "p95": round(vals[min(n - 1, int(n * 0.95))], 3),
        "max": round(vals[-1], 3),
    }


# The process-wide instance. The engine module and providers import THIS;
# nothing else constructs a second one (a second ring would fork the truth).
diag = Diag()
