import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Building2,
  Gauge,
  Network,
  Newspaper,
  ShieldCheck,
} from "lucide-react";

import { useFnoObservation, useMovementIntel, type EvidenceItem } from "../../hooks/useMovementIntel";
import { useMarketContextStore } from "../../store/marketContextStore";
import { useSettingsStore } from "../../store/settingsStore";

const KIND_STYLE: Record<EvidenceItem["kind"], { fg: string; bg: string; tag: string }> = {
  observed: { fg: "var(--ot-color-intel-observed)", bg: "var(--ot-color-feedback-info-soft)", tag: "OBSERVED" },
  derived: { fg: "var(--ot-color-intel-derived)", bg: "var(--ot-color-feedback-warning-soft)", tag: "DERIVED" },
  ai: { fg: "var(--ot-color-intel-ai)", bg: "var(--ot-color-intel-ai-soft)", tag: "AI" },
  unavailable: { fg: "var(--ot-color-intel-unavailable)", bg: "transparent", tag: "UNAVAILABLE" },
};

const DIR_STYLE = {
  up: { color: "var(--ot-color-market-up)", symbol: "▲" },
  down: { color: "var(--ot-color-market-down)", symbol: "▼" },
  flat: { color: "var(--ot-color-text-muted)", symbol: "●" },
} as const;

function EvidenceChip({ kind }: { kind: EvidenceItem["kind"] }) {
  const s = KIND_STYLE[kind];
  return (
    <span
      style={{
        fontFamily: "var(--ot-font-data)",
        fontSize: "9px",
        letterSpacing: "0.1em",
        padding: "1px 5px",
        borderRadius: "2px",
        color: s.fg,
        background: s.bg,
        border: `1px solid color-mix(in srgb, ${s.fg} 40%, transparent)`,
        whiteSpace: "nowrap",
      }}
    >
      {s.tag}
    </span>
  );
}

function EvidenceRow({ item }: { item: EvidenceItem }) {
  const d = DIR_STYLE[item.direction ?? "flat"];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "86px 1fr",
        gap: "8px",
        padding: "7px 10px",
        borderBottom: "1px solid var(--ot-color-border-subtle)",
        alignItems: "start",
      }}
    >
      <div style={{ paddingTop: "2px" }}>
        <EvidenceChip kind={item.kind} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "var(--ot-type-size-xs)", color: "var(--ot-color-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {item.label}
          </span>
          <span
            style={{
              fontFamily: "var(--ot-font-data)",
              fontSize: "var(--ot-type-size-sm)",
              fontVariantNumeric: "tabular-nums",
              color: d.color,
              fontWeight: 600,
            }}
          >
            <span aria-hidden style={{ marginRight: 4, fontSize: 9 }}>{d.symbol}</span>
            {item.value}
          </span>
        </div>
        {item.detail && (
          <div style={{ fontSize: "var(--ot-type-size-xs)", color: "var(--ot-color-text-secondary)", marginTop: "2px", lineHeight: "var(--ot-line-height-ui)" }}>
            {item.detail}
          </div>
        )}
        {(item.source || item.at) && (
          <div style={{ fontFamily: "var(--ot-font-data)", fontSize: "10px", color: "var(--ot-color-text-muted)", marginTop: "2px" }}>
            {item.source}{item.at ? ` · ${new Date(item.at).toLocaleTimeString()}` : ""}
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section
      style={{
        background: "var(--ot-color-surface-1)",
        border: "1px solid var(--ot-color-border-subtle)",
        borderRadius: "var(--ot-radius-md)",
        overflow: "hidden",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 10px",
          borderBottom: "1px solid var(--ot-color-border-subtle)",
          background: "var(--ot-color-surface-2)",
        }}
      >
        <span style={{ color: "var(--ot-color-accent-primary)", display: "inline-flex" }}>{icon}</span>
        <h2 style={{ margin: 0, fontSize: "var(--ot-type-size-xs)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ot-color-text-secondary)" }}>
          {title}
        </h2>
      </header>
      <div>{children}</div>
    </section>
  );
}

export function WhyDidThisMove({ ticker }: { ticker?: string | null }) {
  const context = useMarketContextStore((s) => s.instrument);
  const market = useSettingsStore((s) => s.selectedMarket);
  const active = (ticker ?? context ?? "").toUpperCase();
  const intel = useMovementIntel(active);
  const fno = useFnoObservation(active, market === "NSE" || market === "BSE");
  const setRegime = useMarketContextStore((s) => s.setRegime);

  // Feed the global context engine with the model-derived volatility regime.
  useEffect(() => {
    const r = intel.context.find((e) => e.id === "regime" && e.kind === "derived");
    if (r && active) {
      const highVol = /high/i.test(r.value);
      setRegime({
        label: highVol ? "HIGH VOLATILITY" : "LOW VOLATILITY",
        confidence: intel.confidence,
        evidence: [`${active}: ${r.value}`],
        basis: "derived",
        computedAt: Date.now(),
      });
    }
  }, [intel.context, intel.confidence, active, setRegime]);

  if (!active) {
    return (
      <div style={{ padding: 24, color: "var(--ot-color-text-muted)", fontSize: "var(--ot-type-size-sm)" }}>
        Type a symbol or run <code style={{ color: "var(--ot-color-accent-primary)" }}>AAPL WHY</code> in the command bar.
      </div>
    );
  }

  const up = (intel.changePct ?? 0) > 0;
  const down = (intel.changePct ?? 0) < 0;
  const changeStr = intel.changePct == null ? "—" : `${up ? "+" : ""}${intel.changePct.toFixed(2)}%`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "12px", maxWidth: 980 }}>
      {/* Instrument header */}
      <header style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--ot-font-data)", fontSize: "var(--ot-type-size-xl)", fontWeight: 700, color: "var(--ot-color-accent-primary)", letterSpacing: "0.02em" }}>
          {intel.ticker}
        </span>
        {intel.companyName && <span style={{ fontSize: "var(--ot-type-size-md)", color: "var(--ot-color-text-primary)" }}>{intel.companyName}</span>}
        {intel.sector && <span style={{ fontSize: "var(--ot-type-size-xs)", color: "var(--ot-color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{intel.sector}</span>}
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "var(--ot-font-data)",
            fontVariantNumeric: "tabular-nums",
            fontSize: "var(--ot-type-size-lg)",
            fontWeight: 700,
            color: up ? "var(--ot-color-market-up)" : down ? "var(--ot-color-market-down)" : "var(--ot-color-text-primary)",
          }}
        >
          {up ? "▲ " : down ? "▼ " : ""}{changeStr}
        </span>
      </header>

      {/* Trust strip: confidence + freshness, never color alone */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          padding: "6px 10px",
          border: "1px solid var(--ot-color-border-subtle)",
          borderRadius: "var(--ot-radius-md)",
          background: "var(--ot-color-surface-1)",
          flexWrap: "wrap",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "var(--ot-type-size-xs)", color: "var(--ot-color-text-muted)" }}>
          <ShieldCheck className="h-3.5 w-3.5" style={{ color: "var(--ot-color-intel-live)" }} />
          DATA CONFIDENCE
          <span style={{ fontFamily: "var(--ot-font-data)", color: "var(--ot-color-text-primary)", fontWeight: 600 }}>
            {intel.loading ? "…" : `${intel.confidence}%`}
          </span>
          <span style={{ width: 60, height: 3, background: "var(--ot-color-border-subtle)", borderRadius: 2, overflow: "hidden" }} aria-hidden>
            <span style={{ display: "block", height: "100%", width: `${intel.confidence}%`, background: "var(--ot-color-accent-primary)", opacity: 0.4 + (intel.confidence / 100) * 0.6 }} />
          </span>
        </span>
        <span style={{ fontFamily: "var(--ot-font-data)", fontSize: "10px", color: "var(--ot-color-intel-live)" }}>
          {intel.loading ? "UPDATING…" : `LAST UPDATED ${new Date(intel.freshnessAt).toLocaleTimeString()}`}
        </span>
        {intel.notes.map((n) => (
          <span key={n} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "10px", color: "var(--ot-color-system-warning)" }}>
            <AlertTriangle className="h-3 w-3" /> {n}
          </span>
        ))}
      </div>

      {/* Action row */}
      <nav style={{ display: "flex", gap: 8, flexWrap: "wrap", fontSize: "var(--ot-type-size-xs)" }}>
        {[
          { to: "/terminal/chart-workstation", label: "Chart", icon: <BarChart3 className="h-3 w-3" /> },
          { to: `/markets/security/${encodeURIComponent(active)}`, label: "Security Hub", icon: <Building2 className="h-3 w-3" /> },
          { to: `/markets/relationships/${encodeURIComponent(active)}`, label: "Relationships", icon: <Network className="h-3 w-3" /> },
          { to: `/markets/news?ticker=${encodeURIComponent(active)}`, label: "News", icon: <Newspaper className="h-3 w-3" /> },
        ].map((a) => (
          <Link
            key={a.label}
            to={a.to}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "3px 10px",
              border: "1px solid var(--ot-color-border-default)",
              borderRadius: "var(--ot-radius-sm)",
              color: "var(--ot-color-text-secondary)",
              textDecoration: "none",
              background: "var(--ot-color-surface-1)",
            }}
          >
            <span style={{ color: "var(--ot-color-accent-primary)", display: "inline-flex" }}>{a.icon}</span>
            {a.label}
          </Link>
        ))}
      </nav>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "10px" }}>
        <Section title="Primary drivers — price & volume" icon={<Activity className="h-3.5 w-3.5" />}>
          {intel.loading && intel.primary.length === 0 ? (
            <div style={{ padding: "14px 10px", color: "var(--ot-color-text-muted)", fontSize: "var(--ot-type-size-xs)" }}>Loading observed data…</div>
          ) : (
            intel.primary.map((e) => <EvidenceRow key={e.id} item={e} />)
          )}
          {fno && <EvidenceRow item={fno} />}
        </Section>

        <Section title="Context — market, peers, news, regime" icon={<Gauge className="h-3.5 w-3.5" />}>
          {intel.loading && intel.context.length === 0 ? (
            <div style={{ padding: "14px 10px", color: "var(--ot-color-text-muted)", fontSize: "var(--ot-type-size-xs)" }}>Loading context…</div>
          ) : (
            intel.context.map((e) => <EvidenceRow key={e.id} item={e} />)
          )}
        </Section>
      </div>

      {/* Derived assessment + AI honesty block */}
      <Section title="Assessment" icon={<ShieldCheck className="h-3.5 w-3.5" />}>
        <div style={{ padding: "10px" }}>
          {intel.derivedAssessment ? (
            <p style={{ margin: 0, fontSize: "var(--ot-type-size-sm)", color: "var(--ot-color-text-primary)", lineHeight: "var(--ot-line-height-copy)" }}>
              <EvidenceChip kind="derived" />{" "}
              {intel.derivedAssessment}
            </p>
          ) : (
            <p style={{ margin: 0, fontSize: "var(--ot-type-size-xs)", color: "var(--ot-color-text-muted)" }}>
              No strong heuristic pattern detected from the observed inputs.
            </p>
          )}
          {!intel.ai.available && (
            <p style={{ margin: "10px 0 0", fontSize: "var(--ot-type-size-xs)", color: "var(--ot-color-intel-ai)", lineHeight: "var(--ot-line-height-ui)" }}>
              <EvidenceChip kind="ai" /> AI interpretation unavailable — {intel.ai.reason}
            </p>
          )}
        </div>
      </Section>
    </div>
  );
}
