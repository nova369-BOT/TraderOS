#!/usr/bin/env python
"""Depth Heat end-to-end smoke (F1, H10): boots the real engine on a
loopback port and walks the whole order-flow surface over real sockets —
REST history fill, book, live WS frames (depth + trades), and the full
record → sessions → load → delete lifecycle.

Usage:  .venv/bin/python tools/depth_e2e.py [port]
Exits 0 when every step passes; prints one line per step.
"""

import asyncio
import json
import os
import subprocess
import sys
import tempfile
import time
import urllib.request

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
BASE = f"http://127.0.0.1:{PORT}"
WS = f"ws://127.0.0.1:{PORT}"
SYMBOL = "DEMO:BTC"


def get(path):
    with urllib.request.urlopen(BASE + path, timeout=15) as r:
        return r.status, json.loads(r.read())


def post(path, body):
    req = urllib.request.Request(
        BASE + path, data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=15) as r:
        return r.status, json.loads(r.read())


def delete(path):
    req = urllib.request.Request(BASE + path, method="DELETE")
    with urllib.request.urlopen(req, timeout=15) as r:
        return r.status, json.loads(r.read())


def check(label, cond):
    print(("  ok  " if cond else " FAIL ") + label)
    if not cond:
        sys.exit(1)


async def live_ws():
    import websockets
    frames = {"depth": 0, "trade": 0, "subscribed": 0}
    async with websockets.connect(
            f"{WS}/api/orderflow/ws?symbol={SYMBOL}",
            max_size=8 * 1024 * 1024) as ws:
        deadline = time.time() + 15
        while time.time() < deadline and (
                not frames["subscribed"] or not frames["depth"]
                or not frames["trade"]):
            try:
                msg = json.loads(await asyncio.wait_for(
                    ws.recv(), timeout=10))
            except asyncio.TimeoutError:
                break
            frames[msg.get("type", "?")] = frames.get(msg.get("type", "?"), 0) + 1
    return frames


def main():
    cfg = tempfile.mkdtemp(prefix="depth-e2e-")
    env = {**os.environ, "LSE_TERMINAL_CONFIG_DIR": cfg}
    proc = subprocess.Popen(
        [sys.executable, "-m", "uvicorn",
         "lse_terminal.engine.server:create_app", "--factory",
         "--host", "127.0.0.1", "--port", str(PORT)],
        env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        # readiness
        ready = False
        for _ in range(60):
            try:
                st, _ = get("/api/providers")
                if st == 200:
                    ready = True
                    break
            except Exception:
                time.sleep(0.5)
        check("engine up on %d" % PORT, ready)

        st, provs = get("/api/providers")
        names = {p["name"] for p in provs}
        check("providers registered (demo+lse+cryptol2+mbo)",
              {"demo", "lse", "cryptol2", "mbo"} <= names)

        now = time.time()
        st, body = get(f"/api/orderflow/depth?symbol={SYMBOL}"
                       f"&from={now - 600}&to={now}&column_ms=1000")
        check("history fill: 200 + SNAPSHOT-first events",
              st == 200 and body["events"]
              and body["events"][0]["type"] == "SNAPSHOT"
              and body["demo"] is True)

        st, book = get(f"/api/orderflow/book?symbol={SYMBOL}")
        check("book: crossed never, ladder non-empty",
              st == 200 and book["best_bid"] < book["best_ask"]
              and book["bids"] and book["asks"])

        frames = asyncio.run(live_ws())
        check(f"live WS: subscribed + depth + trade frames {frames}",
              frames["subscribed"] >= 1 and frames["depth"] >= 1
              and frames["trade"] >= 1)

        st, rec = post("/api/orderflow/record", {"symbol": SYMBOL})
        check("record starts", st == 200 and rec.get("id"))
        sid = rec["id"]
        time.sleep(3)
        st, stop = post("/api/orderflow/record/stop", {"id": sid})
        check("record stops", st == 200 and sid in stop["stopped"])

        st, sessions = get("/api/orderflow/sessions")
        mine = next((s for s in sessions if s["id"] == sid), None)
        check("session listed with rows", bool(mine and mine["rows"] > 0))

        st, ev = get(f"/api/orderflow/sessions/{sid}/events")
        check("session loads (write-ordered, SNAPSHOT first)",
              st == 200 and ev["events"]
              and ev["events"][0]["type"] == "SNAPSHOT"
              and not ev["truncated"])

        st, _ = delete(f"/api/orderflow/sessions/{sid}")
        check("session deletes", st == 200)

        # crypto symbol: live-only degradation over real sockets
        st, live = get(f"/api/orderflow/depth?symbol=BTC/USD&from=0&to=10")
        check("crypto symbol: 200 live_only + empty fill",
              st == 200 and live["live_only"] is True
              and live["events"] == [])
        print("  PASS  depth heat e2e green")
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=10)
        except subprocess.TimeoutExpired:
            proc.kill()


if __name__ == "__main__":
    main()
