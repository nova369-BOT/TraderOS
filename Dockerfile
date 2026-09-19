# TraderOS terminal — single-container web deploy.
#
# Single stage: the terminal is pure Python. The chart bundle is committed
# (lse_terminal/ui/static), so no node build. There is no child process to
# ship: market data is native direct (Binance USD-M, Coinbase spot), one
# hop, keyless (D12/D13 — the old Go gateway child was excised from this
# tree; py-only is the speed now, not a compromise).
FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir .
EXPOSE 8000
# Shell form so Render's injected $PORT is honoured (local runs default 8000).
CMD python -m uvicorn --factory lse_terminal.engine.server:create_app --host 0.0.0.0 --port "${PORT:-8000}"
