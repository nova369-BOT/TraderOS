// ============================================================================
// depth/DepthHeatSettingsWindow.tsx — the Depth Heat settings window (H6).
//
// Studies-style panel (right-click or ⚙ opens it, per plan §5.2/§5.3).
// Every control APPLIES LIVE — the running pane is the preview — and
// persists per instrument; the colour scheme can additionally be applied
// terminal-wide ("apply globally", S2).
// ============================================================================

import React, { useEffect, useMemo, useRef } from 'react';
import {
  saveGlobalScheme,
  GLOBAL_SCHEME_EVENT,
  DEFAULT_DEPTH_SETTINGS,
  type DepthHeatSettings,
} from './depthHeatTypes';
import { buildLuts, rampLabel, RAMP_IDS } from './heatVisuals';
import './depthHeatSettings.css';

type Patch = Partial<DepthHeatSettings>;

// ── tiny control primitives ──────────────────────────────────────────────

function Row({ label, children, hint }: {
  label: string; children: React.ReactNode; hint?: string;
}) {
  return (
    <div className="dh-row" title={hint}>
      <span className="dh-label">{label}</span>
      {children}
    </div>
  );
}

function SliderRow({ label, value, min, max, step, onChange, fmt, hint, disabled }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; fmt?: (v: number) => string;
  hint?: string; disabled?: boolean;
}) {
  return (
    <div className="dh-row" style={disabled ? { opacity: 0.45 } : undefined} title={hint}>
      <span className="dh-label">{label}</span>
      <input
        className="dh-slider" type="range"
        min={min} max={max} step={step} value={value} disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span className="dh-value">{(fmt ?? ((v) => v.toFixed(2)))(value)}</span>
    </div>
  );
}

function Segmented<T extends string>({ options, value, onChange }: {
  options: { id: T; label: React.ReactNode; title?: string }[];
  value: T; onChange: (v: T) => void;
}) {
  return (
    <div className="dh-seg" role="tablist">
      {options.map((o) => (
        <button
          key={o.id}
          role="tab"
          aria-selected={o.id === value}
          className={o.id === value ? 'on' : ''}
          title={o.title}
          onClick={() => onChange(o.id)}
        >{o.label}</button>
      ))}
    </div>
  );
}

function Toggle({ on, onChange, label }: {
  on: boolean; onChange: (v: boolean) => void; label?: string;
}) {
  return (
    <button
      className={`dh-toggle${on ? ' on' : ''}`}
      role="switch" aria-checked={on}
      onClick={() => onChange(!on)}
      title={label}
    />
  );
}

function NumInput({ value, onCommit, min, max, disabled, suffix }: {
  value: number; onCommit: (v: number) => void;
  min?: number; max?: number; disabled?: boolean; suffix?: string;
}) {
  const [text, setText] = React.useState(String(value));
  useEffect(() => { setText(String(value)); }, [value]);
  const commit = () => {
    let v = Number(text);
    if (!isFinite(v)) { setText(String(value)); return; }
    if (min !== undefined) v = Math.max(min, v);
    if (max !== undefined) v = Math.min(max, v);
    setText(String(v));
    onCommit(v);
  };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <input
        className="dh-num" value={text} disabled={disabled}
        onChange={(e) => setText(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
      />
      {suffix && <span className="dh-hint">{suffix}</span>}
    </span>
  );
}

/** Live gradient strip rendered from the REAL LUT maths — the preview is
 * not an illustration, it is the exact colour pipeline. Side-aware ramps
 * show the ask ramp on top and the bid ramp below. */
function GradientStrip({ settings }: { settings: DepthHeatSettings }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    c.width = 256; c.height = 14;
    const ctx = c.getContext('2d')!;
    const { ask, bid } = buildLuts({ ...settings, smoothingMode: 'none' });
    const img = ctx.createImageData(256, 14);
    for (let x = 0; x < 256; x++) {
      for (let y = 0; y < 14; y++) {
        const lut = y < 7 ? ask : bid;
        const o = (y * 256 + x) * 4;
        img.data[o] = lut[x * 4];
        img.data[o + 1] = lut[x * 4 + 1];
        img.data[o + 2] = lut[x * 4 + 2];
        img.data[o + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }, [settings.scheme, settings.intensity, settings.dimming,
    settings.contrast, settings.brightness, settings.gamma]); // eslint-disable-line react-hooks/exhaustive-deps
  return <canvas ref={ref} />;
}

// ── the window ────────────────────────────────────────────────────────────

export default function DepthHeatSettingsWindow({
  symbol, settings, cutoffRange, onChange, onClose,
}: {
  symbol: string;
  settings: DepthHeatSettings;
  cutoffRange: [number, number] | null;   // resolved [lo, hi] sizes, if known
  onChange: (patch: Patch) => void;
  onClose: () => void;
}) {
  // Esc closes; backdrop click closes; the window itself swallows events.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const s = settings;
  const cutFmt = useMemo(() => {
    if (!cutoffRange) return null;
    const f = (v: number) => (v >= 100 ? v.toFixed(0)
      : v >= 1 ? v.toFixed(2) : v.toPrecision(3));
    return `${f(cutoffRange[0])} → ${f(cutoffRange[1])}`;
  }, [cutoffRange]);

  return (
    <div className="dh-backdrop" onMouseDown={onClose}>
      <div className="dh-window" onMouseDown={(e) => e.stopPropagation()}>
        <div className="dh-head">
          <span className="dh-head-title">DEPTH HEAT · SETTINGS</span>
          <span className="dh-head-sym">{symbol}</span>
          <button className="dh-close" onClick={onClose} title="Close (Esc)">✕</button>
        </div>

        <div className="dh-body">
          {/* ── COLOUR (S2) ─────────────────────────────────────────── */}
          <div className="dh-section">
            <div className="dh-section-title">COLOUR</div>
            <div className="dh-schemes">
              {RAMP_IDS.map((id) => (
                <button
                  key={id}
                  className={`dh-scheme${s.scheme === id ? ' on' : ''}`}
                  title={rampLabel(id)}
                  onClick={() => {
                    onChange({ scheme: id });
                    if (s.applySchemeGlobally) {
                      saveGlobalScheme(id, true);
                      window.dispatchEvent(new CustomEvent(GLOBAL_SCHEME_EVENT,
                        { detail: { scheme: id, source: symbol } }));
                    }
                  }}
                >
                  <div className="dh-scheme-name">
                    {id === 'deepdom' ? 'DEEPDOM' : id === 'bookmap' ? 'BOOKMAP'
                      : id === 'heat' ? 'HEAT' : 'GREYSCALE'}
                  </div>
                  <GradientStrip settings={{ ...s, scheme: id }} />
                </button>
              ))}
            </div>
            <SliderRow label="Intensity" value={s.intensity} min={0} max={2}
              step={0.05} onChange={(v) => onChange({ intensity: v })}
              hint="Chroma strength. 1 = true scheme colours, 0 = luminance only." />
            <SliderRow label="Dimming" value={s.dimming} min={0} max={0.9}
              step={0.02} onChange={(v) => onChange({ dimming: v })}
              hint="Dims the whole field toward black for dark rooms." />
            <Row label="Apply scheme globally"
              hint="Persists the colour scheme terminal-wide; every Depth Heat pane follows it.">
              <Toggle on={s.applySchemeGlobally} onChange={(v) => {
                saveGlobalScheme(s.scheme, v);
                onChange({ applySchemeGlobally: v });
                window.dispatchEvent(new CustomEvent(GLOBAL_SCHEME_EVENT,
                  { detail: { scheme: s.scheme, source: symbol } }));
              }} />
              <span className="dh-hint">all symbols use this scheme</span>
            </Row>
          </div>

          {/* ── FIELD & OVERLAYS (V1 · V2) ──────────────────────────── */}
          <div className="dh-section">
            <div className="dh-section-title">FIELD &amp; OVERLAYS</div>
            <SliderRow label="Intensity γ" value={s.gamma} min={0.25} max={1}
              step={0.05} onChange={(v) => onChange({ gamma: v })}
              hint="Perceptual exponent: <1 lifts small liquidity out of the dark and lets walls saturate (the reference feel). 1 = linear." />
            <Row label="Wall glow"
              hint="Bloom pass over the hottest levels — walls burn against a calm field.">
              <Toggle on={s.glow} onChange={(v) => onChange({ glow: v })} />
            </Row>
            <Row label="Smooth columns"
              hint="Bilinear blend between columns (watercolour feel). Off = crisp terminal columns.">
              <Toggle on={s.smoothColumns}
                onChange={(v) => onChange({ smoothColumns: v })} />
            </Row>
            <Row label="Price path"
              hint="Stepped bid/ask lines from the carried book — the Bookmap/DeepDom signature overlay.">
              <Toggle on={s.showPath} onChange={(v) => onChange({ showPath: v })} />
            </Row>
            <Row label="Candles over heat"
              hint="OHLC candles derived from the executed print stream (trade-derived — no invented feed).">
              <Toggle on={s.showCandles}
                onChange={(v) => onChange({ showCandles: v })} />
              <span className="dh-hint">trade-derived</span>
            </Row>
            <Row label="Context strips"
              hint="V3 bottom stack sharing the time axis: buy/sell-split volume histogram + CVD line, and the Imb/Cvd gauges top-left.">
              <Toggle on={s.subpanes}
                onChange={(v) => onChange({ subpanes: v })} />
            </Row>
            <SliderRow label="Big-trade ×" value={s.bigTradeK} min={2} max={12}
              step={1} onChange={(v) => onChange({ bigTradeK: v })}
              fmt={(v) => `${v.toFixed(0)}×med`}
              hint="Prints at or above this multiple of the rolling median size get a ring + size tag." />
          </div>

          {/* ── CUT-OFF (S3) ────────────────────────────────────────── */}
          <div className="dh-section">
            <div className="dh-section-title">CUT-OFF</div>
            <Row label="Mode" hint="Percentile: relative to this session's sizes. Exact: fixed size thresholds.">
              <Segmented
                value={s.cutoffMode}
                onChange={(v) => onChange({ cutoffMode: v })}
                options={[
                  { id: 'percentile', label: 'Percentile' },
                  { id: 'exact', label: 'Exact size' },
                ]}
              />
              {cutFmt && (
                <span className="dh-hint" title="Resolved cut-off sizes currently in effect">
                  {cutFmt}
                </span>
              )}
            </Row>
            {s.cutoffMode === 'percentile' ? (
              <>
                <SliderRow label="Lower" value={s.cutoffLower} min={0} max={99}
                  step={1} onChange={(v) => onChange({
                    cutoffLower: v,
                    cutoffUpper: Math.max(v + 1, s.cutoffUpper),
                  })}
                  fmt={(v) => `${v.toFixed(0)}%`}
                  hint="Sizes at/below this percentile render solid bottom colour." />
                <SliderRow label="Upper" value={s.cutoffUpper} min={1} max={100}
                  step={1} onChange={(v) => onChange({
                    cutoffUpper: v,
                    cutoffLower: Math.min(v - 1, s.cutoffLower),
                  })}
                  fmt={(v) => `${v.toFixed(0)}%`}
                  hint="Sizes at/above this percentile saturate to the top colour." />
              </>
            ) : (
              <>
                <Row label="Lower size">
                  <NumInput value={s.cutoffLower} min={0}
                    onCommit={(v) => onChange({
                      cutoffLower: v,
                      cutoffUpper: Math.max(v + 1e-9, s.cutoffUpper),
                    })} />
                </Row>
                <Row label="Upper size">
                  <NumInput value={s.cutoffUpper} min={0}
                    onCommit={(v) => onChange({
                      cutoffUpper: v,
                      cutoffLower: Math.min(v - 1e-9, s.cutoffLower),
                    })} />
                </Row>
              </>
            )}
            <div className="dh-row">
              <span className="dh-hint" style={{ marginLeft: 128 }}>
                The contrast slider above the pane narrows/widens this same window.
              </span>
            </div>
          </div>

          {/* ── VERTICAL SMOOTHING (S4) ─────────────────────────────── */}
          <div className="dh-section">
            <div className="dh-section-title">VERTICAL SMOOTHING</div>
            <Row label="Mode" hint="Auto adapts the shade count to your price zoom.">
              <Segmented
                value={s.smoothingMode}
                onChange={(v) => onChange({ smoothingMode: v })}
                options={[
                  { id: 'auto', label: 'Auto' },
                  { id: 'manual', label: 'Manual' },
                  { id: 'none', label: 'None' },
                ]}
              />
            </Row>
            <SliderRow label="Shades" value={s.smoothing} min={0} max={20}
              step={1} disabled={s.smoothingMode !== 'manual'}
              onChange={(v) => onChange({ smoothing: v })}
              fmt={(v) => (v < 2 ? 'off' : v.toFixed(0))}
              hint="Number of flat gradient bands. 0–1 = no quantization." />
          </div>

          {/* ── ADVANCED COLOUR (S5) ────────────────────────────────── */}
          <div className="dh-section">
            <div className="dh-section-title">ADVANCED COLOUR</div>
            <SliderRow label="Contrast" value={s.contrast} min={-0.6} max={1}
              step={0.02} onChange={(v) => onChange({ contrast: v })}
              hint="Final-output contrast around mid grey." />
            <SliderRow label="Brightness" value={s.brightness} min={-0.5} max={0.5}
              step={0.02} onChange={(v) => onChange({ brightness: v })}
              hint="Final-output brightness offset." />
          </div>

          {/* ── VOLUME DOTS (S7) ────────────────────────────────────── */}
          <div className="dh-section">
            <div className="dh-section-title">VOLUME DOTS</div>
            <Row label="Show executed trades">
              <Toggle on={s.dots} onChange={(v) => onChange({ dots: v })} />
            </Row>
            <Row label="Drawing type"
              hint="Pie aggregates prints per price-time cell and splits the disc by aggressor-side volume.">
              <Segmented
                value={s.dotType}
                onChange={(v) => onChange({ dotType: v })}
                options={[
                  { id: 'gradient', label: <><span className="dh-dotglyph gradient" />Gradient</> },
                  { id: 'solid', label: <><span className="dh-dotglyph solid" />Solid</> },
                  { id: 'pie', label: <><span className="dh-dotglyph pie" />Pie</> },
                ]}
              />
            </Row>
            <Row label="Min accountable size" hint="Prints below this size draw no dot.">
              <NumInput value={s.dotMinSize} min={0}
                disabled={!s.dots}
                onCommit={(v) => onChange({ dotMinSize: v })} />
            </Row>
            <SliderRow label="Dot size" value={s.dotScale} min={0.2} max={3}
              step={0.05} disabled={!s.dots}
              onChange={(v) => onChange({ dotScale: v })} />
            <SliderRow label="Transparency" value={1 - s.dotAlpha} min={0} max={0.95}
              step={0.02} disabled={!s.dots}
              onChange={(v) => onChange({ dotAlpha: 1 - v })}
              fmt={(v) => `${Math.round(v * 100)}%`} />
          </div>

          {/* ── BOOK & MOTION (S6 · S9 · S11) ───────────────────────── */}
          <div className="dh-section">
            <div className="dh-section-title">BOOK &amp; MOTION</div>
            <Row label="COB column"
              hint="S8: the numeric DOM ladder beside the heatmap — per-level size + cumulative, spread and BBO rows.">
              <Toggle on={s.cob} onChange={(v) => onChange({ cob: v })} />
              <span className="dh-hint" style={{ marginLeft: s.cob ? 0 : 8 }}>
                cumulative column
              </span>
              <Toggle on={s.cobCumulative}
                onChange={(v) => onChange({ cobCumulative: v })} />
            </Row>
            <Row label="Active range"
              hint="S6 override: expose only N levels around mid instead of the full transmitted book. Amber boundary lines mark the window on the COB column.">
              <Toggle on={s.activeRange > 0}
                onChange={(v) => onChange({ activeRange: v ? 10 : 0 })} />
              <NumInput value={s.activeRange || 10} min={1} max={200}
                disabled={s.activeRange === 0}
                suffix="levels"
                onCommit={(v) => onChange({ activeRange: Math.round(v) })} />
            </Row>
            <Row label="Auto-recenter"
              hint="S9: glides the price axis back when the anchor drifts beyond tolerance. Double-click recenters instantly.">
              <Segmented
                value={s.recenterMode}
                onChange={(v) => onChange({ recenterMode: v })}
                options={[
                  { id: 'bbo', label: 'On BBO', title: 'Follow the bid/ask mid' },
                  { id: 'trades', label: 'On trades', title: 'Follow the last print' },
                  { id: 'off', label: 'Off' },
                ]}
              />
            </Row>
            <SliderRow label="Tolerance" value={s.recenterTolerance} min={1} max={90}
              step={1} disabled={s.recenterMode === 'off'}
              onChange={(v) => onChange({ recenterTolerance: v })}
              fmt={(v) => `${v.toFixed(0)}%`}
              hint="Recenter only when the anchor drifts beyond this share of the visible range (prevents jitter)." />
            <Row label="Depth reset"
              hint="S11: how stale last-seen liquidity is dropped — per session, or on a fixed interval.">
              <Segmented
                value={s.resetPolicy}
                onChange={(v) => onChange({ resetPolicy: v })}
                options={[
                  { id: 'session', label: 'Session' },
                  { id: 'interval', label: 'Interval' },
                ]}
              />
              <NumInput value={s.resetIntervalMin} min={1} max={1440}
                disabled={s.resetPolicy !== 'interval'}
                suffix="min"
                onCommit={(v) => onChange({ resetIntervalMin: Math.round(v) })} />
            </Row>
          </div>
        </div>

        <div className="dh-foot">
          <button className="dh-btn"
            onClick={() => onChange({ ...DEFAULT_DEPTH_SETTINGS })}>
            Reset to defaults
          </button>
          <span className="spacer" />
          <span className="dh-hint">changes apply live &amp; save automatically</span>
          <button className="dh-btn primary" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
