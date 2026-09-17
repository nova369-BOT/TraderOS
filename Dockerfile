# TraderOS terminal — single-container web deploy.
# The chart bundle is committed (lse_terminal/ui/static), so no node build.
FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir .
EXPOSE 8000
# Shell form so Render's injected $PORT is honoured (local runs default 8000).
CMD python -m uvicorn --factory lse_terminal.engine.server:create_app --host 0.0.0.0 --port "${PORT:-8000}"
