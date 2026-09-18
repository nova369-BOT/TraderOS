"""Guard: the two pinned copies of the EdgeDepth wire contract never drift.

- ``third_party/edgedepth-gateway/edgedepth.proto`` is the contract the
  Python codec (``lse_terminal/providers/edgedepth/wire.py``) implements.
- ``services/edgedepth-gateway/proto/edgedepth.proto`` is the contract the
  actual Go gateway compiles against.

They must be byte-identical: the wire is the field numbers, and a proto3
mismatch fails silently (unknown fields decode as absent), the worst failure
mode for a market-data path. The gateway's upstream proto carries the same
do-not-renumber warning; re-vendoring either copy without the other makes
this test fail loudly instead of rendering plausible wrong numbers.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SERVICE_PROTO = (
    ROOT / "services" / "edgedepth-gateway" / "proto" / "edgedepth.proto"
)
PIN_PROTO = (
    ROOT / "third_party" / "edgedepth-gateway" / "edgedepth.proto"
)


def test_gateway_proto_copies_are_identical():
    assert SERVICE_PROTO.exists(), "vendored gateway proto missing"
    assert PIN_PROTO.exists(), "third_party contract pin missing"
    a = SERVICE_PROTO.read_bytes()
    b = PIN_PROTO.read_bytes()
    assert a == b, (
        "EdgeDepth proto drift: services/edgedepth-gateway/proto and "
        "third_party/edgedepth-gateway pins differ. Re-vendor both together; "
        "the Python wire codec and the Go gateway must compile the same "
        "field numbers."
    )


def test_gateway_license_copies_are_identical():
    service_license = ROOT / "services" / "edgedepth-gateway" / "LICENSE"
    pin_license = ROOT / "third_party" / "edgedepth-gateway" / "LICENSE"
    assert service_license.read_bytes() == pin_license.read_bytes()
    assert b"MIT License" in service_license.read_bytes()
