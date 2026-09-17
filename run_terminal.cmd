@echo off
rem ── TraderOS terminal, one-click boot (Windows) ─────────────────────────
rem First run needs Python 3.10+ on PATH; afterwards this is all you click.
rem Serves the terminal on http://localhost:8000 — Ctrl+C stops it.
cd /d "%~dp0"
rem If this is a git clone, fast-forward to the latest pushed build first.
if exist .git ( git pull --ff-only 2>nul )
if not exist .venv\Scripts\python.exe (
  echo [boot] creating .venv and installing dependencies (first run only)...
  python -m venv .venv || exit /b 1
  .venv\Scripts\python -m pip install -e .[dev] || exit /b 1
)
echo [boot] TraderOS terminal on http://localhost:8000  (Ctrl+C stops)
.venv\Scripts\python -m uvicorn --factory lse_terminal.engine.server:create_app --host 127.0.0.1 --port 8000
