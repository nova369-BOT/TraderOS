# static_handler.py - Ultra-fast static asset serving with pre-compression
# Extracted from server.py monolith for cleanliness and testability.

import gzip
from pathlib import Path
from typing import Dict, Tuple

from fastapi import HTTPException, Request
from fastapi.responses import Response

# MIME map for chart bundle and assets
_MIME: Dict[str, str] = {
    ".js": "text/javascript",
    ".css": "text/css",
    ".woff2": "font/woff2",
    ".woff": "font/woff",
    ".ttf": "font/ttf",
    ".svg": "image/svg+xml",
    ".json": "application/json",
    ".map": "application/json",
    ".html": "text/html",
}

def mime_for(name: str) -> str:
    ext = Path(name).suffix.lower()
    return _MIME.get(ext, "application/octet-stream")

class PreGzCache:
    """LRU cache for pre-compressed static files.
    Keeps last 32 entries, not just one generation — chart now has ~15 chunks.
    Clearing per file would thrash.
    """
    def __init__(self, static_dir: Path, max_entries: int = 32):
        self.static_dir = static_dir
        self.max_entries = max_entries
        self._cache: Dict[Tuple[str, int, int], Tuple[bytes, bytes]] = {}

    def get(self, name: str):
        f = self.static_dir / name
        if not f.is_file():
            return None
        st = f.stat()
        key = (name, st.st_mtime_ns, st.st_size)
        hit = self._cache.get(key)
        if hit is None:
            raw = f.read_bytes()
            gz = gzip.compress(raw, compresslevel=6, mtime=0)
            if len(self._cache) >= self.max_entries:
                # evict oldest (dict preserves order py3.7+)
                self._cache.pop(next(iter(self._cache)))
            self._cache[key] = (raw, gz)
            return raw, gz
        return hit

def make_chart_handler(cache: PreGzCache):
    """Generic handler for /chart/{subpath} — serves any file under /chart with gzip + immutable cache for hashed chunks."""
    def handler(subpath: str, request: Request):
        full = "chart/" + subpath
        if ".." in subpath or subpath.startswith("."):
            raise HTTPException(404)
        pair = cache.get(full)
        if pair is None:
            raise HTTPException(404)
        raw, gz = pair
        mime = mime_for(full)
        headers = {"Vary": "Accept-Encoding"}
        if "/chunks/" in full or "/assets/" in full:
            headers["Cache-Control"] = "public, max-age=31536000, immutable"
        else:
            headers["Cache-Control"] = "no-store"
        if "gzip" in request.headers.get("accept-encoding", ""):
            headers["Content-Encoding"] = "gzip"
            return Response(content=gz, media_type=mime, headers=headers)
        return Response(content=raw, media_type=mime, headers=headers)
    return handler

def make_entry_handler(cache: PreGzCache, name: str, mime: str):
    """Handler for entry files (chart.js, chart.css, app.js, style.css)"""
    def handler(request: Request):
        pair = cache.get(name)
        if pair is None:
            raise HTTPException(404)
        raw, gz = pair
        headers = {"Vary": "Accept-Encoding"}
        if "/chunks/" in name or "/assets/" in name:
            headers["Cache-Control"] = "public, max-age=31536000, immutable"
        if "gzip" in request.headers.get("accept-encoding", ""):
            headers["Content-Encoding"] = "gzip"
            return Response(content=gz, media_type=mime, headers=headers)
        return Response(content=raw, media_type=mime, headers=headers)
    return handler
