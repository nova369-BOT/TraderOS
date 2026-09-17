// ============================================================================
// depth/DepthHeatTsPanel.tsx — V4 time & sales drawer.
//
// Bookmap-style T&S mini-panel: time / price / size rows fed by the SAME
// trade stream as the bubbles (the renderer's unfiltered print log), with a
// min-size filter and ALL/BUY/SELL. A drawer over the right edge — it never
// steals layout from the field.
// ============================================================================

import React, { useEffect, useRef, useState } from 'react';
import type { DepthHeatSettings } from './depthHeatTypes';
import type { DepthHeatRenderer } from './DepthHeatRenderer';

interface Row { ts: number; price: number; size: number; buy: boolean }

function fmtSize(v: number): string {
  if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
  if (v >= 100) return v.toFixed(0);
  if (v >= 1) return v.toFixed(1);
  return v.toPrecision(2);
}

function fmtPrice(p: number): string {
  if (p >= 1000) return p.toFixed(1);
  if (p >= 1) return p.toFixed(2);
  return p.toPrecision(4);
}

export default function DepthHeatTsPanel({
  rendererRef, settings, onChange, onClose,
}: {
  rendererRef: React.MutableRefObject<DepthHeatRenderer | null>;
  settings: DepthHeatSettings;
  onChange: (patch: Partial<DepthHeatSettings>) => void;
  onClose: () => void;
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const versionRef = useRef(-1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const iv = setInterval(() => {
      const r = rendererRef.current;
      if (!r) return;
      const log = r.getTsLog();
      if (log.version !== versionRef.current) {
        versionRef.current = log.version;
        setRows([...log.rows].reverse());   // newest first
      }
    }, 400);
    return () => { window.removeEventListener('keydown', onKey); clearInterval(iv); };
  }, [rendererRef, onClose]);

  const minSize = settings.tsMinSize || 0;
  const side = settings.tsSide;
  const shown = rows.filter((r) =>
    r.size >= minSize
    && (side === 'all' || (side === 'buy' ? r.buy : !r.buy)));

  return (
    <div style={{
      position: 'absolute', top: 0, right: 0, bottom: 0, width: 236,
      background: 'rgba(13, 17, 23, 0.97)', borderLeft: '1px solid #232936',
      display: 'flex', flexDirection: 'column', zIndex: 5,
      color: '#d1d4dc', fontSize: 10,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px',
        borderBottom: '1px solid #232936',
      }}>
        <span style={{ letterSpacing: 1, fontWeight: 700, fontSize: 9 }}>
          TIME &amp; SALES
        </span>
        <span style={{
          display: 'inline-flex', border: '1px solid #2a2e39', borderRadius: 4,
          overflow: 'hidden', marginLeft: 'auto',
        }}>
          {(['all', 'buy', 'sell'] as const).map((s) => (
            <button
              key={s}
              onClick={() => onChange({ tsSide: s })}
              style={{
                background: settings.tsSide === s ? '#2b3547' : 'transparent',
                color: settings.tsSide === s ? '#eef1f6' : '#93a0b1',
                border: 'none', fontSize: 8, letterSpacing: 0.5,
                padding: '2px 6px', cursor: 'pointer',
              }}
            >{s.toUpperCase()}</button>
          ))}
        </span>
        <button
          onClick={onClose}
          title="Close (Esc)"
          style={{
            background: 'transparent', border: 'none', color: '#9aa4b2',
            cursor: 'pointer', fontSize: 11, padding: 0,
          }}
        >✕</button>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px',
        borderBottom: '1px solid #1c222c',
      }}>
        <span style={{ opacity: 0.6, fontSize: 9 }}>min size</span>
        <input
          type="number" min={0} value={settings.tsMinSize}
          onChange={(e) => onChange({ tsMinSize: Math.max(0, Number(e.target.value) || 0) })}
          style={{
            width: 64, background: '#0b0e11', color: '#d1d4dc',
            border: '1px solid #2a2e39', borderRadius: 3, fontSize: 10,
            padding: '1px 4px',
          }}
        />
        <span style={{ marginLeft: 'auto', opacity: 0.5, fontSize: 9 }}>
          {shown.length}
        </span>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: '62px 1fr 52px',
        padding: '3px 8px', opacity: 0.55, fontSize: 8, letterSpacing: 1,
        borderBottom: '1px solid #1c222c',
      }}>
        <span>TIME</span><span style={{ textAlign: 'right' }}>PRICE</span>
        <span style={{ textAlign: 'right' }}>SIZE</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', fontVariantNumeric: 'tabular-nums' }}>
        {shown.length === 0 && (
          <div style={{ padding: 12, opacity: 0.55, textAlign: 'center' }}>
            no prints match — the drawer only shows executed trades the
            feed actually carries
          </div>
        )}
        {shown.slice(0, 400).map((r, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '62px 1fr 52px',
            padding: '1.5px 8px',
            background: i % 2 ? 'rgba(255,255,255,0.02)' : 'transparent',
          }}>
            <span style={{ opacity: 0.6 }}>
              {new Date(r.ts * 1000).toISOString().slice(11, 19)}
            </span>
            <span style={{
              textAlign: 'right',
              color: r.buy ? '#26a69a' : '#ef5350',
            }}>{fmtPrice(r.price)}</span>
            <span style={{
              textAlign: 'right',
              color: r.buy ? '#9fd6cd' : '#f4b3ae',
            }}>{fmtSize(r.size)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
