"""Engine candle lane — the venue-speed lane for live candles (owner's
directive 2026-09-21: "GET THE DATA DIRECTLY FROM BINANCE WEBSOCKET
API", and the venue's own 429 message: "Please use WebSocket Streams
for live updates to avoid polling the API").

One lane per (provider, symbol, native-kline timeframe):

- The FIRST request does exactly the REST backfill this endpoint always
  did — same call, same bytes, same refusals (a 429 during backfill
  surfaces verbatim; the lane never swallows provider errors, and D14's
  ladder law is untouched).
- The venue's kline stream then extends/replaces those rows live. The
  stream's `closed` bit is the venue's own x flag, carried end-to-end:
  a forming bar is the venue's real forming bar, never an inference.
- A warm request inside the cached depth answers from the cache: ZERO
  klines REST weight — that is the 429 killer, and the trader-path
  speedup in one stroke.
- A window deeper than the cache head falls back to the same REST
  window fetch as before (history is never fabricated) and the result
  merges by timestamp identity (the venue's open time IS the identity;
  a later frame for the same open time wins).
- Staleness honesty: if no kline event has landed for a whole interval,
  one small tail refetch heals it — a silently dead stream never serves
  frozen bars forever.
- Dead-stream truth (owner 2026-09-21: "coinbase is showing up and down
  fast movement of candle but binance is just stiff"): when the network
  kills the venue's OWN kline socket (his egress refuses the Binance WS
  dial; Coinbase's connects), heal-on-request alone freezes the forming
  bar between the 30s tail floors while a streamed venue animates. So a
  lane whose stream is NOT healthy keeps the forming bar alive with one
  tiny repair fetch (limit=2 bars, weight ~1) every few seconds — and
  stops the moment a real kline event lands. The stream remains the
  law; the repair poll is only ever its temporary substitute, and the
  route stamps the mode on a header so nothing is silent.

Tick and <n>s lanes are untouched (those bars come from the venue trade
tape, which is the law: there are no sub-minute klines to subscribe).
"""

from __future__ import annotations

import asyncio
import threading
import time
from typing import Optional

import pandas as pd

from lse_terminal.contracts import CANDLE_COLUMNS

_DEPTH_CAP = 5600
# ── Speed tiers: Hyperliquid > Binance > Coinbase > LSE ───────────────
# User wants Hyperliquid added ultra-fast, in one go, no lags
# Hyperliquid: 15ms repair, 15ms grace, 80ms floor, 150ms dial - FASTEST
# Binance: 20ms repair, 20ms grace, 100ms floor, 200ms dial - faster than Coinbase
# Coinbase: 50ms repair, 50ms grace, 250ms floor, 500ms dial
_STALE_AFTER_MULT = 1
_TAIL_REFETCH_MAX = 250

# Base (Coinbase speed) - 50ms
_STALE_FLOOR_S = 0.25
_REPAIR_POLL_S = 0.05
_REPAIR_GRACE_S = 0.05
_REPAIR_ERR_BACKOFF_S = 0.5
_DIAL_BACKOFF_S = 0.5

# Binance ultra - faster than Coinbase
_STALE_FLOOR_S_BINANCE = 0.10       # 100ms
_REPAIR_POLL_S_BINANCE = 0.02       # 20ms
_REPAIR_GRACE_S_BINANCE = 0.02      # 20ms
_REPAIR_ERR_BACKOFF_S_BINANCE = 0.2 # 200ms
_DIAL_BACKOFF_S_BINANCE = 0.2       # 200ms

# Hyperliquid ultra - FASTEST, faster than Binance, ultra-fast, no lag
_STALE_FLOOR_S_HYPERLIQUID = 0.08       # 80ms - fastest
_REPAIR_POLL_S_HYPERLIQUID = 0.015      # 15ms - FASTEST, faster than Binance 20ms
_REPAIR_GRACE_S_HYPERLIQUID = 0.015     # 15ms - instant
_REPAIR_ERR_BACKOFF_S_HYPERLIQUID = 0.15 # 150ms
_DIAL_BACKOFF_S_HYPERLIQUID = 0.15      # 150ms


class CandleLane:
    def __init__(self, provider, symbol: str, timeframe: str, tf_s: int,
                 capacity: int = _DEPTH_CAP, wall=time.monotonic):
        self.provider = provider
        self.symbol = symbol
        self.timeframe = timeframe
        self.tf_s = tf_s
        self.capacity = capacity
        self._wall = wall                # monotonic clock (tests pin it)
        self._rows: dict = {}            # ts -> [ts,o,h,l,c,v]
        self._lock = threading.RLock()
        self._asked_low = None           # deepest ts the VENUE was asked
        self._born = wall()              # first frame = lane's birth
        self._last_ws_event = None       # wall clock of last stream frame
        self._last_repair = 0.0          # wall clock of last repair merge
        self._next_dial_wall = 0.0       # WS redial gate (failed dials)
        self._repair_note = ""           # last repair refusal, surfaced
        self._last_tail_refetch = 0.0

    # -- stream side ---------------------------------------------------

    def apply_ws(self, ev: dict) -> None:
        """One venue kline event onto the cache. Timestamp-identity merge;
        capacity-trim drops the OLDEST bars. `closed` never leaks into a
        row — it only gates which bar the merge treats as the live one."""
        if ev.get("symbol") != self.symbol or \
                ev.get("timeframe") != self.timeframe:
            return
        try:
            ts = int(ev["ts"])
            row = [ts, float(ev["open"]), float(ev["high"]),
                   float(ev["low"]), float(ev["close"]),
                   float(ev["volume"])]
        except (KeyError, TypeError, ValueError):
            return
        with self._lock:
            self._rows[ts] = row
            self._last_ws_event = self._wall()
            if len(self._rows) > self.capacity:
                excess = len(self._rows) - self.capacity
                for old_ts in sorted(self._rows)[:excess]:
                    del self._rows[old_ts]

    def _is_binance(self) -> bool:
        return getattr(self.provider, 'name', '') == 'binance'

    def _is_hyperliquid(self) -> bool:
        return getattr(self.provider, 'name', '') == 'hyperliquid'

    def _floor(self) -> float:
        name = getattr(self.provider, 'name', '')
        if name == 'hyperliquid':
            return _STALE_FLOOR_S_HYPERLIQUID
        if name == 'binance':
            return _STALE_FLOOR_S_BINANCE
        return _STALE_FLOOR_S

    def _repair_poll(self) -> float:
        name = getattr(self.provider, 'name', '')
        if name == 'hyperliquid':
            return _REPAIR_POLL_S_HYPERLIQUID
        if name == 'binance':
            return _REPAIR_POLL_S_BINANCE
        return _REPAIR_POLL_S

    def _grace(self) -> float:
        name = getattr(self.provider, 'name', '')
        if name == 'hyperliquid':
            return _REPAIR_GRACE_S_HYPERLIQUID
        if name == 'binance':
            return _REPAIR_GRACE_S_BINANCE
        return _REPAIR_GRACE_S

    def _err_backoff(self) -> float:
        name = getattr(self.provider, 'name', '')
        if name == 'hyperliquid':
            return _REPAIR_ERR_BACKOFF_S_HYPERLIQUID
        if name == 'binance':
            return _REPAIR_ERR_BACKOFF_S_BINANCE
        return _REPAIR_ERR_BACKOFF_S

    def _dial_backoff(self) -> float:
        name = getattr(self.provider, 'name', '')
        if name == 'hyperliquid':
            return _DIAL_BACKOFF_S_HYPERLIQUID
        if name == 'binance':
            return _DIAL_BACKOFF_S_BINANCE
        return _DIAL_BACKOFF_S

    def _horizon(self) -> float:
        return max(self._floor(), _STALE_AFTER_MULT * self.tf_s)

    def stream_healthy(self) -> bool:
        """The venue's own kline socket is delivering (event within one
        staleness horizon). Never-born streams are NOT healthy — health
        is earned by the first event, not assumed from a dial."""
        if self._last_ws_event is None:
            return False
        return (self._wall() - self._last_ws_event) <= self._horizon()

    def needs_repair(self) -> bool:
        """Repair-poll activation law: a stream that never delivered
        gets one short dial grace (a slow connect is not a corpse), then
        the forming bar is kept alive by tiny REST tails; a stream that
        died mid-flight re-earns repair after the full horizon. The
        instant any event lands, health returns and repair rests."""
        wall = self._wall()
        if self._last_ws_event is None:
            return (wall - self._born) > self._grace()
        return (wall - self._last_ws_event) > self._horizon()

    def repair_tick(self) -> bool:
        """ONE venue-cheap tail fetch (limit=2: last closed + forming)
        merged onto the cache. Returns False with a logged note on
        refusal — the cache keeps serving (the same survival law as the
        request-side tail refetch); the mode flip rides the response
        header, so the substitute is never silent."""
        try:
            df = self.provider.candles(self.symbol, self.timeframe,
                                       limit=2)
        except Exception as e:  # noqa: BLE001 - survival law, noted
            self._repair_note = f"{type(e).__name__}: {e}"[:200]
            return False
        self._merge_df(df)
        self._last_repair = self._wall()
        self._repair_note = ""
        return True

    def current_mode(self) -> str:
        """What the pane badge/header reports: 'stream' when the venue
        socket is feeding, 'rest-repair' while the repair poll is the
        only thing keeping the bar alive, 'degraded' when neither is."""
        if self.stream_healthy():
            return "stream"
        if self._last_repair and \
                (self._wall() - self._last_repair) <= 4 * self._repair_poll():
            return "rest-repair"
        return "degraded"

    def _stale(self) -> bool:
        horizon = self._horizon()
        if self._last_ws_event is None:
            # A stream that NEVER arrived (geo-blocked WS dial, a slow
            # death the reconnect law is still fighting): after the same
            # grace horizon since birth, the lane is stale-capable too.
            # Without this, a dead-from-birth lane degenerated into a
            # full re-backfill per warm request — strictly worse than
            # the plain passthrough it replaced (owner's 2026-09-21
            # regression report; pin in tests: tail-sized, floor-gated).
            return (self._wall() - self._born) > horizon
        return (self._wall() - self._last_ws_event) > horizon

    # -- request side ----------------------------------------------------

    def frame(self, limit: int, start=None, end=None,
              clock=time.time):
        """Answer one /api/candles-shaped request. Cold = the exact REST
        backfill of the pre-lane world; warm-in-window = cache, zero
        REST weight; deep/stale = a small honest REST spread back in."""
        limit = max(1, int(limit))
        end_s = None if end is None else int(float(end))
        start_s = None if start is None else int(float(start))
        now_s = int(clock())
        nowish = end_s is None or end_s >= now_s - 2 * self.tf_s

        # Coverage by what the VENUE WAS ASKED, not by bar count: the
        # venue (like every klines book) omits empty intervals, so a
        # short page is the venue's truth, not a cache failure. Any
        # request whose plan window lies inside [_asked_low, now] gets
        # exactly what REST would serve — the backfill PLUS the live
        # stream — at zero request weight.
        plan_end = end_s if end_s is not None else now_s
        req_low = plan_end - limit * self.tf_s + self.tf_s
        if start_s is not None:
            req_low = max(req_low, start_s)
        with self._lock:
            ordered = sorted(self._rows.values())
            asked_low = self._asked_low
        fresh = (not nowish) or (ordered and
                                 ordered[-1][0] >= now_s - 2 * self.tf_s)
        covered = fresh and asked_low is not None and asked_low <= req_low
        head_ok = covered

        def note_ask(low: int) -> None:
            with self._lock:
                if self._asked_low is None or low < self._asked_low:
                    self._asked_low = low

        def tail_refetch() -> bool:
            """Stream silence heals with ONE small tail fetch, sized by
            the visible gap (never a poll, never a full reload): if the
            tail bridges the freshness gap the full backfill below never
            runs. Cache serve survives a refusal here — the error rides
            the next cold-or-deep request, where refusals always
            surface verbatim."""
            if self._wall() - self._last_tail_refetch <= self._floor():
                return False
            self._last_tail_refetch = self._wall()
            if not ordered:
                return False
            gap_tf = (now_s - ordered[-1][0]) // self.tf_s
            want = min(_TAIL_REFETCH_MAX, max(8, gap_tf + 2))
            if want >= limit + gap_tf:      # gap outruns a tail window
                return False
            try:
                df = self.provider.candles(self.symbol, self.timeframe,
                                           limit=want)
            except Exception:  # noqa: BLE001 - see docstring
                return False
            self._merge_df(df)
            note_ask(now_s - want * self.tf_s + self.tf_s)
            with self._lock:
                self._bridged = self._rows.get(now_s - self.tf_s) \
                    is not None or (self._rows and self._rows[max(
                        self._rows)][0] >= now_s - 2 * self.tf_s)
            return self._bridged

        if not covered:
            if nowish and asked_low is not None and asked_low <= req_low \
                    and self._stale() and tail_refetch():
                pass                        # served from the bridged tail
            else:
                # Cold or deep-window serve: the EXACT call the route
                # always made (same limit/start/end), merged in.
                df = self.provider.candles(self.symbol, self.timeframe,
                                           limit=limit, start=start,
                                           end=end)
                self._merge_df(df)
                note_ask(req_low)
        with self._lock:
            ordered = sorted(self._rows.values())
        if start_s is not None:
            ordered = [r for r in ordered if r[0] >= start_s]
        if end_s is not None:
            ordered = [r for r in ordered if r[0] <= end_s]
        if not ordered:
            # Empty cache + empty venue answer: the provider's own
            # refusal above would have raised; cache survival here means
            # the caller asked for an uncovered tail — rebuild honestly.
            df = self.provider.candles(self.symbol, self.timeframe,
                                       limit=limit, start=start,
                                       end=end)
            self._merge_df(df)
            note_ask(req_low)
            with self._lock:
                ordered = sorted(self._rows.values())
            if start_s is not None:
                ordered = [r for r in ordered if r[0] >= start_s]
            if end_s is not None:
                ordered = [r for r in ordered if r[0] <= end_s]
        df = pd.DataFrame(ordered[-limit:], columns=CANDLE_COLUMNS)
        df.attrs["venue"] = getattr(self.provider, "venue",
                                    getattr(self.provider, "name", ""))
        return df

    def _merge_df(self, df) -> None:
        with self._lock:
            for r in df.itertuples(index=False):
                self._rows[int(r.ts)] = [int(r.ts), float(r.open),
                                         float(r.high), float(r.low),
                                         float(r.close), float(r.volume)]
            if len(self._rows) > self.capacity:
                excess = len(self._rows) - self.capacity
                for old_ts in sorted(self._rows)[:excess]:
                    del self._rows[old_ts]


class CandleLaneManager:
    """One lane per (provider name, symbol, timeframe); owns the stream
    tasks on the engine's asyncio loop. Providers without a candle
    stream capability fall through to their plain candles() — the
    pre-lane behaviour, byte for byte."""

    def __init__(self):
        self._lanes: dict = {}
        self._lock = threading.Lock()
        self._loop: Optional[asyncio.AbstractEventLoop] = None

    def attach_loop(self, loop) -> None:
        self._loop = loop

    def lane_for(self, provider, symbol: str, timeframe: str):
        sup = getattr(provider, "supports_candle_stream", None)
        if sup is None or not sup(symbol, timeframe):
            return None
        key = (getattr(provider, "name", ""), symbol, timeframe)
        with self._lock:
            lane = self._lanes.get(key)
            if lane is None:
                tf_s_fn = getattr(provider, "candle_tf_seconds", None)
                if tf_s_fn is None:
                    return None
                lane = CandleLane(provider, symbol, timeframe,
                                  tf_s_fn(timeframe))
                self._lanes[key] = lane
            return lane

    def frame(self, provider, symbol: str, timeframe: str, limit: int,
              start=None, end=None):
        """The /api/candles choke point: lane serve when the venue
        streams candles, provider.candles() verbatim otherwise."""
        lane = self.lane_for(provider, symbol, timeframe)
        if lane is None:
            return provider.candles(symbol, timeframe, limit=limit,
                                    start=start, end=end)
        self._ensure_stream(lane)
        self._ensure_repair(lane)
        return lane.frame(limit, start=start, end=end)

    def mode_of(self, provider, symbol: str, timeframe: str):
        """Response-header truth: the lane's live mode, or None when the
        provider has no candle stream at all (plain passthrough)."""
        lane = self.lane_for(provider, symbol, timeframe)
        return lane.current_mode() if lane is not None else None

    def _ensure_stream(self, lane: CandleLane) -> None:
        with self._lock:
            if getattr(lane, "_streaming", False) or self._loop is None:
                return
            if lane._wall() < lane._next_dial_wall:
                return               # a dead dial cools down, no spin
            lane._streaming = True
        loop = self._loop
        loop.call_soon_threadsafe(self._start_stream, lane)

    def _start_stream(self, lane: CandleLane) -> None:
        asyncio.ensure_future(self._run_stream(lane))

    async def _run_stream(self, lane: CandleLane) -> None:
        try:
            agen = lane.provider.candle_stream([lane.symbol],
                                               lane.timeframe)
            try:
                async for ev in agen:
                    lane.apply_ws(ev)
            finally:
                await agen.aclose()
        except asyncio.CancelledError:
            raise
        except Exception:  # noqa: BLE001 - the lane's staleness law heals
            pass
        finally:
            with self._lock:
                lane._streaming = False
            # A dial that died re-earns its attempt after a cool-down,
            # not on the next UI paint — no refused-socket spin.
            lane._next_dial_wall = lane._wall() + lane._dial_backoff()

    # -- dead-stream repair (owner's "binance is stiff but coinbase
    #    moves" report, 2026-09-21) --------------------------------------

    def _ensure_repair(self, lane: CandleLane) -> None:
        with self._lock:
            if getattr(lane, "_repair_running", False) or \
                    self._loop is None:
                return
            lane._repair_running = True
        self._loop.call_soon_threadsafe(self._start_repair, lane)

    def _start_repair(self, lane: CandleLane) -> None:
        asyncio.ensure_future(self._repair_loop(lane))

    async def _repair_loop(self, lane: CandleLane) -> None:
        """Keeps the forming bar moving while the venue's OWN kline
        socket is unusable: one 2-bar tail fetch every _REPAIR_POLL_S,
        off the event loop (a blocking REST poll must never stall WS
        clients). Self-terminates the moment a real kline event makes
        the lane healthy again — the stream is the law, this is only
        its honest substitute (stamped `rest-repair` on the header)."""
        try:
            while True:
                if not lane.needs_repair():
                    return        # stream alive — venue law resumes
                ok = await self._loop.run_in_executor(
                    None, lane.repair_tick)
                if ok:
                    await asyncio.sleep(lane._repair_poll())
                else:
                    await asyncio.sleep(lane._err_backoff())
        except asyncio.CancelledError:
            raise
        except Exception:  # noqa: BLE001 - repair dies quietly, re-armed
            pass                 # by the next request (not silent: the
        finally:                 # mode header reports what is live)
            with self._lock:
                lane._repair_running = False


CANDLE_LANES = CandleLaneManager()
