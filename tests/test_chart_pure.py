"""F2 Phase 2 gate: pure-layer invariants of the chart pane.

Bundles tests/chart_pure_entry.ts with the frontend's esbuild and runs it
under node (same pattern as the indicator parity truth). Skips cleanly when
the JS toolchain is absent; never red because of a missing dev machine.
"""

import json
import shutil
import subprocess
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parent.parent


def test_chart_pure_invariants(tmp_path):
    node = shutil.which("node")
    esbuild = ROOT / "frontend" / "node_modules" / ".bin" / "esbuild"
    if not node or not esbuild.exists():
        pytest.skip("node/esbuild unavailable; pure-layer gate skipped")
    out_js = tmp_path / "chart_pure.cjs"
    subprocess.run(
        [str(esbuild), str(ROOT / "tests" / "chart_pure_entry.ts"),
         "--bundle", "--format=cjs", "--platform=node",
         f"--outfile={out_js}"],
        check=True, capture_output=True, cwd=ROOT)
    proc = subprocess.run([node, str(out_js)], check=True,
                          capture_output=True, text=True)
    res = json.loads(proc.stdout)
    assert res["ok"] is True
    assert res["checks"] >= 20
