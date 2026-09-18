# Vendored: edgedepth-gateway

This directory is a **byte-identical vendor snapshot** of the upstream
repository `github.com/edgedepthhq/edgedepth-gateway` (MIT, (c) 2026
EdgeDepth). It is the actual EdgeDepth Go implementation — not a port, not a
subset. TraderOS does NOT maintain a fork here: fix upstream, re-vendor.

- **Pinned commit**: `b8222849b6baeaae8ed54f336fced0125ebb0df5`
  ("Serve bounded volume history and repair Binance stream routing", 2026-09-08)
- **Vendored on**: 2026-09-18, from `https://github.com/edgedepthhq/edgedepth-gateway.git`
  branch `master`.
- **Excluded**: `.github/` (upstream CI automation, not source) and `.git/`.
  Everything else — source, protobuf, generated code, tests, docs, Dockerfile,
  go.mod/go.sum, LICENSE — is preserved exactly.
- **Verification**: `diff -r <upstream-clone> services/edgedepth-gateway
  -x '.git' -x '.github'` must print nothing.
- **License**: MIT, `LICENSE` in this directory (also pinned at
  `third_party/edgedepth-gateway/LICENSE`). The EdgeDepth *terminal* is a
  separate AGPL-3.0 project and is NOT vendored anywhere in this repo.
- **Proto parity**: `proto/edgedepth.proto` here is the contract the Python
  codec in `lse_terminal/providers/edgedepth/wire.py` implements. It is kept
  byte-identical to the pin at `third_party/edgedepth-gateway/edgedepth.proto`;
  `tests/test_edgedepth_proto_parity.py` fails if the two ever diverge.

## How to update

```bash
git clone https://github.com/edgedepthhq/edgedepth-gateway.git /tmp/upstream
tar -C /tmp/upstream --exclude='./.git' --exclude='./.github' -cf - . \
  | tar -C services/edgedepth-gateway -xf -
# update the pinned commit above, then run:
go build ./... && go vet ./... && go test ./...        # inside the module
pytest tests/test_edgedepth_proto_parity.py -q         # repo root
```

## How to build/test (normal network)

```bash
cd services/edgedepth-gateway
go build ./...
go test ./...
EDGEDEPTH_LIVE=1 go test ./internal/hub -run TestLive -v   # real Binance probe
```

The sandbox used for the initial integration vendored the Go dependencies
from their GitHub tags (`gorilla/websocket v1.5.3`,
`google.golang.org/protobuf v1.36.11` — the exact versions `go.sum` pins)
because the Go module proxy was unreachable there; `docs/edgedepth-integration/
01-gateway-proof.md` records that build/test transcript.
