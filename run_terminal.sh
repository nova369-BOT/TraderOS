#!/usr/bin/env bash
# ── TraderOS terminal, one-click boot (Linux/macOS/sandbox) ───────────────
# Serves the terminal on http://localhost:8000 — Ctrl+C stops it.
set -e
cd "$(dirname "$0")"
# If this is a git clone, fast-forward to the latest pushed build first.
[ -d .git ] && git pull --ff-only 2>/dev/null || true
if [ ! -x .venv/bin/python ]; then
  echo "[boot] creating .venv and installing dependencies (first run only)..."
  python3 -m venv .venv
  .venv/bin/pip install -e ".[dev]"
fi
echo "[boot] TraderOS terminal on http://localhost:8000  (Ctrl+C stops)"
exec .venv/bin/python -m uvicorn --factory lse_terminal.engine.server:create_app --host 0.0.0.0 --port 8000
