"""Shared WebSocket authentication for market-data endpoints.

Extracted from ``backend/api/routes/stream.py`` so every WS endpoint uses the
same policy:

- Origin allowlist (CSRF-style defense against cross-site WebSocket
  hijacking). Browser clients always send ``Origin``; a missing header is
  allowed for non-browser clients (scripts, tests) which can spoof it anyway.
- Optional JWT validation (``?token=`` query param or ``Authorization``
  header). A token that is present but invalid is rejected; the decision to
  *require* a token is left to each endpoint (parity with existing routes).

The allowlist can be extended with ``TRADEOS_WS_ALLOWED_ORIGINS`` (comma
separated) — used for proxied preview/production hosts.
"""

from __future__ import annotations

import logging
import os
from urllib.parse import urlparse

from fastapi import WebSocket
from jose import JWTError, jwt

from backend.config.security import get_jwt_secret

logger = logging.getLogger(__name__)

# Allowed CORS origins for WebSocket connections (mirror of CORS allowlist)
_WS_ORIGIN_ALLOWLIST = frozenset(
    [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ]
)


def _extra_allowed_origins() -> frozenset[str]:
    raw = os.getenv("TRADEOS_WS_ALLOWED_ORIGINS", "")
    return frozenset(item.strip() for item in raw.split(",") if item.strip())


def _validate_ws_origin(header: str | None) -> bool:
    """Check that the WebSocket Origin header is in the allowlist.

    A missing Origin is allowed. This check defends against cross-site
    WebSocket hijacking, which only a browser can be tricked into, and
    browsers always send Origin on the handshake. Non-browser clients
    (scripts, CLIs, the test suite) send none, and a non-browser attacker
    can spoof the header anyway, so rejecting headerless clients breaks them
    without adding protection.
    """
    if header is None:
        return True
    if not header.strip():
        return False
    origin = header.strip()
    if origin in _WS_ORIGIN_ALLOWLIST or origin in _extra_allowed_origins():
        return True
    # Also allow localhost variants that might differ in port
    try:
        parsed = urlparse(origin)
        if parsed.hostname in {"localhost", "127.0.0.1"}:
            return True
    except Exception:
        pass
    return False


def _validate_ws_jwt(token: str) -> dict | None:
    """Validate a JWT from a query param or header, return payload or None."""
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=["HS256"])
        if str(payload.get("type", "")) == "access":
            return payload
    except (JWTError, Exception):
        pass
    return None


async def authenticate_ws(websocket: WebSocket) -> bool:
    """Validate Origin header and JWT token on a WebSocket connection.

    Returns True if authentication passes, False if we should close the
    connection.
    """
    origin = websocket.headers.get("origin") or websocket.headers.get("Origin")
    if not _validate_ws_origin(origin):
        try:
            await websocket.close(code=403, reason="Origin not allowed")
        except Exception:
            pass
        return False

    # Extract JWT from query parameter (e.g. ?token=eyJ...) or Authorization header
    token = None
    query_params = websocket.query_params
    candidate = query_params.get("token") or query_params.get("access_token")
    if candidate:
        token = candidate
    else:
        auth_header = websocket.headers.get("authorization") or websocket.headers.get("Authorization")
        if auth_header and auth_header.lower().startswith("bearer "):
            token = auth_header.split(" ", 1)[1].strip()

    if token and not _validate_ws_jwt(token):
        try:
            await websocket.close(code=401, reason="Invalid or expired token")
        except Exception:
            pass
        return False

    return True
