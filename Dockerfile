# TraderOS terminal — single-container web deploy.
#
# Stage 1: build the REAL EdgeDepth Gateway from the vendored pristine pin
# (services/edgedepth-gateway, MIT, upstream b822284 — pin & proof in
# docs/edgedepth-integration/). The module proxy resolves its two pinned
# deps (gorilla/websocket, protobuf) inside the builder image itself.
FROM golang:1.24-alpine AS gateway
WORKDIR /src
COPY services/edgedepth-gateway/ .
RUN CGO_ENABLED=0 go build -trimpath -ldflags='-s -w' \
    -o /out/edgedepth-gateway ./cmd/edgedepth-gateway

# Stage 2: the terminal. The chart bundle is committed
# (lse_terminal/ui/static), so no node build.
FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir .
# The engine manages the gateway as a child process in-container (managed
# mode). The supervisor resolves it via EDGEDEPTH_GATEWAY_BIN; the filename
# must end in edgedepth-gateway (engine self-defence check).
COPY --from=gateway /out/edgedepth-gateway /usr/local/bin/edgedepth-gateway
ENV EDGEDEPTH_GATEWAY_BIN=/usr/local/bin/edgedepth-gateway
EXPOSE 8000
# Shell form so Render's injected $PORT is honoured (local runs default 8000).
CMD python -m uvicorn --factory lse_terminal.engine.server:create_app --host 0.0.0.0 --port "${PORT:-8000}"
