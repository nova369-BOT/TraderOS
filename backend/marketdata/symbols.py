"""Canonical symbol handling.

Canonical form is ``EXCHANGE:INSTRUMENT`` (upper-case), e.g.:

- ``BINANCE:BTCUSDT``  (USDⓈ-M perpetual)
- ``SIM:BTCUSDT``      (labeled simulator namespace)
- ``NSE:RELIANCE``     (bridged legacy hub)

The resolver is deliberately conservative: it only rewrites an input when it
can prove the mapping (e.g. a known Binance instrument, or an explicit
``BINANCE:``/``SIM:`` prefix). Everything else passes through untouched so
existing identifiers (``NSE:RELIANCE``, ``US:AAPL``) keep working.
"""

from __future__ import annotations

import re

_EXCHANGE_RE = re.compile(r"^[A-Z0-9]{2,12}$")
_INSTRUMENT_RE = re.compile(r"^[A-Z0-9._\-/]{1,32}$")


def normalize_exchange(raw: str) -> str:
    value = str(raw or "").strip().upper()
    if not _EXCHANGE_RE.match(value):
        raise ValueError(f"invalid exchange: {raw!r}")
    return value


def normalize_instrument(raw: str) -> str:
    value = str(raw or "").strip().upper()
    if not _INSTRUMENT_RE.match(value):
        raise ValueError(f"invalid instrument: {raw!r}")
    return value


def canonical(exchange: str, instrument: str) -> str:
    return f"{normalize_exchange(exchange)}:{normalize_instrument(instrument)}"


def split_canonical(symbol: str) -> tuple[str, str] | None:
    """``BINANCE:BTCUSDT`` → ``("BINANCE", "BTCUSDT")``; ``None`` if malformed."""
    raw = str(symbol or "").strip().upper()
    if ":" not in raw:
        return None
    exchange, _, instrument = raw.partition(":")
    if not exchange or not instrument or ":" in instrument:
        return None
    try:
        return normalize_exchange(exchange), normalize_instrument(instrument)
    except ValueError:
        return None


def resolve(raw: str, *, binance_instruments: frozenset[str] | set[str] = frozenset()) -> str:
    """Resolve user/legacy input to a canonical symbol.

    Resolution rules (conservative, alias-preserving):
      1. Already-canonical (``EXCHANGE:INSTRUMENT``) → normalized as-is.
      2. Known Binance instrument (``BTCUSDT``) → ``BINANCE:<instrument>``.
      3. Anything else → upper-cased passthrough (single-segment).
    """
    raw_value = str(raw or "").strip().upper()
    if not raw_value:
        raise ValueError("symbol is required")
    if ":" in raw_value:
        parsed = split_canonical(raw_value)
        if parsed is None:
            raise ValueError(f"malformed symbol: {raw!r}")
        exchange, instrument = parsed
        if exchange == "BINANCE" and binance_instruments and instrument not in binance_instruments:
            # Unknown Binance instrument — keep the canonical form but let the
            # adapter reject the subscription with a clear error.
            return canonical(exchange, instrument)
        return canonical(exchange, instrument)
    instrument = normalize_instrument(raw_value)
    if instrument in binance_instruments:
        return canonical("BINANCE", instrument)
    return instrument
