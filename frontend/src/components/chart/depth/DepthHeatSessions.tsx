// ============================================================================
// depth/DepthHeatSessions.tsx — MY DATA session list for the Depth Heat pane
// (F1, H8 UI half). Lists recorded depth sessions for the pane's symbol;
// LOAD replays a recording into the pane, DELETE removes it. Live recording
// control sits in the pane header.
// ============================================================================

import React, { useCallback, useEffect, useState } from 'react';
import './depthHeatSettings.css';

export interface SessionMeta {
  id: string;
  symbol: string;
  source: string;
  demo: boolean;
  started: number;
  stopped: number | null;
  rows: number;
  bytes: number;
  recording: boolean;
}

function fmtBytes(n: number): string {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)} MB`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)} KB`;
  return `${n} B`;
}

function fmtWhen(ts: number): string {
  const d = new Date(ts * 1000);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    + ' ' + d.toLocaleTimeString(undefined, {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    });
}

function fmtDur(a: number, b: number | null): string {
  const s = Math.max(0, Math.round((b ?? Date.now() / 1000) - a));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
  if (h) return `${h}h ${m}m`;
  if (m) return `${m}m ${s % 60}s`;
  return `${s}s`;
}

export default function DepthHeatSessions({
  symbol, onLoad, onClose,
}: {
  symbol: string;
  onLoad: (events: any[], meta: SessionMeta) => Promise<void> | void;
  onClose: () => void;
}) {
  const [rows, setRows] = useState<SessionMeta[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);   // sid being loaded
  const [confirm, setConfirm] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const refresh = useCallback(() => {
    fetch('/api/orderflow/sessions')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((all: SessionMeta[]) => {
        setRows(all.filter((m) => m.symbol === symbol));
        setError(null);
      })
      .catch((e) => setError(String(e)));
  }, [symbol]);

  useEffect(() => {
    refresh();
    const iv = setInterval(refresh, 4000);   // keep ●REC state honest
    return () => clearInterval(iv);
  }, [refresh]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const doLoad = async (m: SessionMeta) => {
    setBusy(m.id);
    setNotice(null);
    try {
      const r = await fetch(
        `/api/orderflow/sessions/${encodeURIComponent(m.id)}/events`);
      if (!r.ok) {
        const b = await r.json().catch(() => ({ detail: `HTTP ${r.status}` }));
        throw new Error(String(b.detail || r.status));
      }
      const body = await r.json();
      await onLoad(body.events || [], { ...m, rows: (body.events || []).length });
      if (body.truncated) {
        setNotice('Large session: loaded up to the event cap — the tail '
          + 'stays in the file.');
      }
      onClose();
    } catch (e) {
      setError(String(e));
    } finally {
      setBusy(null);
    }
  };

  const doDelete = async (m: SessionMeta) => {
    if (confirm !== m.id) { setConfirm(m.id); return; }
    setConfirm(null);
    try {
      const r = await fetch(
        `/api/orderflow/sessions/${encodeURIComponent(m.id)}`,
        { method: 'DELETE' });
      if (!r.ok) {
        const b = await r.json().catch(() => ({ detail: `HTTP ${r.status}` }));
        throw new Error(String(b.detail || r.status));
      }
      refresh();
    } catch (e) {
      setError(String(e));
    }
  };

  return (
    <div className="dh-backdrop" onMouseDown={onClose}>
      <div className="dh-window" onMouseDown={(e) => e.stopPropagation()}>
        <div className="dh-head">
          <span className="dh-head-title">RECORDED SESSIONS</span>
          <span className="dh-head-sym">{symbol}</span>
          <button className="dh-close" onClick={onClose} title="Close (Esc)">✕</button>
        </div>
        <div className="dh-body" style={{ minHeight: 120 }}>
          {rows === null && !error && (
            <div className="dh-empty">Reading MY DATA…</div>
          )}
          {error && <div className="dh-empty" style={{ color: '#ef9a9a' }}>{error}</div>}
          {rows && rows.length === 0 && (
            <div className="dh-empty">
              No recordings for {symbol} yet.<br />
              Press <b>● REC</b> above the heatmap to capture live depth —
              it lands here, in workspace/MY DATA.
            </div>
          )}
          {rows?.map((m) => (
            <div key={m.id} className="dh-sess">
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap',
                }}>
                  {m.recording && <span className="dh-rec-dot" title="Recording now" />}
                  <span style={{ fontFamily: 'ui-monospace, Menlo, monospace' }}>
                    {m.id}
                  </span>
                  {m.demo && <span className="dh-chip demo">DEMO</span>}
                  <span className="dh-chip">{m.source || 'live'}</span>
                </div>
                <div className="dh-hint" style={{ marginTop: 2 }}>
                  {fmtWhen(m.started)} · {fmtDur(m.started, m.stopped)}
                  {' · '}{fmtBytes(m.bytes)} · {m.rows.toLocaleString()} rows
                  {m.stopped === null ? ' · recording…' : ''}
                </div>
              </div>
              <button className="dh-btn primary" disabled={busy !== null}
                onClick={() => doLoad(m)}
                title="Load this recording into the pane">
                {busy === m.id ? 'loading…' : 'Load'}
              </button>
              <button
                className="dh-btn"
                style={confirm === m.id
                  ? { borderColor: '#ef5350', color: '#ef9a9a' } : undefined}
                onClick={() => doDelete(m)}
                title="Delete this recording"
              >{confirm === m.id ? 'sure?' : 'Delete'}</button>
            </div>
          ))}
          {notice && <div className="dh-empty">{notice}</div>}
        </div>
        <div className="dh-foot">
          <span className="dh-hint">
            recordings are parquet files in workspace/MY DATA
          </span>
          <span className="spacer" />
          <button className="dh-btn primary" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
