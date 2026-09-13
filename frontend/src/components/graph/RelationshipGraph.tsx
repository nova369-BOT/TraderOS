import { useEffect, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  type Edge,
  type Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { useNavigate } from "react-router-dom";

import { fetchStock } from "../../api/client";
import { fetchPeers } from "../../api/equity";
import { fetchNewsByTicker } from "../../api/news";
import { fetchPortfolioHoldings, fetchPortfolios } from "../../api/portfolio";
import { useMarketContextStore } from "../../store/marketContextStore";
import { useSettingsStore } from "../../store/settingsStore";
import { normalizeTicker } from "../../utils/ticker";

/**
 * Relationship Graph — explores REAL relationships around an instrument.
 * Every edge is backed by observed data; nothing is inferred silently:
 *   sector / exchange / index membership      → stock snapshot
 *   peer comparison universe                  → peers endpoint
 *   co-mentioned tickers in recent news       → news endpoint
 *   co-held instruments / portfolio exposure  → portfolio endpoints
 *   F&O availability                          → stock classification
 */

type RelGraphData = {
  sector?: string;
  exchange?: string;
  indices: string[];
  peerUniverse?: string;
  hasOptions?: boolean;
  coMentioned: Array<{ ticker: string; count: number }>;
  heldIn: Array<{ id: string; name: string }>;
  coHeld: Array<{ ticker: string; count: number }>;
  newsCount: number;
  notes: string[];
};

const CENTER_R = 0;

function ringPosition(i: number, n: number, radius: number): { x: number; y: number } {
  const angle = (2 * Math.PI * i) / Math.max(1, n) - Math.PI / 2;
  return { x: CENTER_R + radius * Math.cos(angle), y: CENTER_R + radius * Math.sin(angle) };
}

const NODE_BASE: React.CSSProperties = {
  fontFamily: "var(--ot-font-data)",
  fontSize: 11,
  letterSpacing: "0.04em",
  borderRadius: 3,
  padding: "6px 10px",
  border: "1px solid var(--ot-color-border-default)",
  background: "var(--ot-color-surface-2)",
  color: "var(--ot-color-text-primary)",
  whiteSpace: "nowrap",
};

function nodeStyle(kind: string): React.CSSProperties {
  const accents: Record<string, string> = {
    center: "var(--ot-color-accent-primary)",
    sector: "var(--ot-color-edge-sector)",
    portfolio: "var(--ot-color-edge-portfolio)",
    peer: "var(--ot-color-edge-peer)",
    market: "var(--ot-color-border-strong)",
    options: "var(--ot-color-intel-derived)",
    news: "var(--ot-color-intel-live)",
    ticker: "var(--ot-color-text-secondary)",
  };
  return { ...NODE_BASE, border: `1px solid ${accents[kind] ?? accents.ticker}`, ...(kind === "center" ? { background: "var(--ot-color-surface-1)", fontWeight: 700, fontSize: 14, padding: "10px 16px" } : {}) };
}

function edgeStyle(kind: string): { stroke: string; strokeWidth: number } {
  const map: Record<string, string> = {
    sector: "var(--ot-color-edge-sector)",
    portfolio: "var(--ot-color-edge-portfolio)",
    peer: "var(--ot-color-edge-peer)",
    options: "var(--ot-color-intel-derived)",
    news: "var(--ot-color-intel-live)",
    ticker: "#586274",
    market: "#3a4658",
  };
  return { stroke: map[kind] ?? "#3a4658", strokeWidth: 1.4 };
}

export function RelationshipGraph({ ticker: tickerProp }: { ticker?: string | null }) {
  const navigate = useNavigate();
  const market = useSettingsStore((s) => s.selectedMarket);
  const contextTicker = useMarketContextStore((s) => s.instrument);
  const ticker = normalizeTicker(tickerProp ?? contextTicker ?? "");
  const [data, setData] = useState<RelGraphData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ticker) return;
    let cancelled = false;
    setLoading(true);

    async function assemble() {
      const notes: string[] = [];
      const [stockR, peersR, newsR, portsR] = await Promise.allSettled([
        fetchStock(ticker, market),
        fetchPeers(ticker),
        fetchNewsByTicker(ticker, 40, market),
        fetchPortfolios(),
      ]);
      if (cancelled) return;

      // co-mentioned tickers from observed news
      const mentionCounts = new Map<string, number>();
      let newsCount = 0;
      if (newsR.status === "fulfilled") {
        newsCount = newsR.value.length;
        for (const item of newsR.value) {
          for (const t of item.tickers ?? []) {
            const n = normalizeTicker(t);
            if (n && n !== ticker) mentionCounts.set(n, (mentionCounts.get(n) ?? 0) + 1);
          }
        }
      } else {
        notes.push("News relationships unavailable");
      }
      const coMentioned = [...mentionCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 7)
        .map(([t, count]) => ({ ticker: t, count }));

      // portfolio exposure + co-held instruments (bounded: first 3 portfolios)
      const heldIn: Array<{ id: string; name: string }> = [];
      const coHeldCounts = new Map<string, number>();
      if (portsR.status === "fulfilled") {
        const ports = (portsR.value ?? []).slice(0, 3);
        const holdings = await Promise.allSettled(
          ports.map(async (p) => ({ p, holdings: await fetchPortfolioHoldings(p.id) })),
        );
        if (cancelled) return;
        for (const h of holdings) {
          if (h.status !== "fulfilled") continue;
          const { p, holdings: rows } = h.value;
          const symbols = rows.map((x: { symbol: string }) => normalizeTicker(x.symbol)).filter(Boolean);
          if (symbols.includes(ticker)) {
            heldIn.push({ id: p.id, name: p.name });
            for (const s of symbols) {
              if (s !== ticker) coHeldCounts.set(s, (coHeldCounts.get(s) ?? 0) + 1);
            }
          }
        }
      } else {
        notes.push("Portfolio exposure unavailable");
      }
      const coHeld = [...coHeldCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([t, count]) => ({ ticker: t, count }));

      setData({
        sector: stockR.status === "fulfilled" ? stockR.value.sector : undefined,
        exchange: stockR.status === "fulfilled" ? stockR.value.exchange : undefined,
        indices: stockR.status === "fulfilled" ? stockR.value.indices ?? [] : [],
        peerUniverse: peersR.status === "fulfilled" ? peersR.value.universe : undefined,
        hasOptions:
          stockR.status === "fulfilled"
            ? stockR.value.classification?.has_options ?? (market === "NSE" || market === "BSE")
            : undefined,
        coMentioned,
        heldIn,
        coHeld,
        newsCount,
        notes: [
          ...(stockR.status === "rejected" ? ["Stock snapshot unavailable"] : []),
          ...(peersR.status === "rejected" ? ["Peer universe unavailable"] : []),
          ...notes,
        ],
      });
      setLoading(false);
    }

    void assemble();
    return () => {
      cancelled = true;
    };
  }, [ticker, market]);

  const { nodes, edges } = useMemo(() => {
    if (!ticker || !data) return { nodes: [] as Node[], edges: [] as Edge[] };
    const nodes: Node[] = [
      {
        id: "center",
        position: { x: 0, y: 0 },
        data: { label: ticker },
        style: nodeStyle("center"),
      },
    ];
    const edges: Edge[] = [];
    const mkEdge = (id: string, kind: string, label?: string, target = "center", source?: string): Edge => ({
      id,
      source: source ?? id,
      target,
      label,
      labelStyle: { fontSize: 9, fill: "var(--ot-color-text-muted)", fontFamily: "var(--ot-font-data)" },
      labelBgStyle: { fill: "var(--ot-color-canvas)", fillOpacity: 0.85 },
      style: edgeStyle(kind),
      markerEnd: { type: MarkerType.ArrowClosed, color: edgeStyle(kind).stroke, width: 14, height: 14 },
    });

    // structure ring (inner): sector / exchange / indices / peers / options / news
    const structural: Array<{ id: string; label: string; kind: string; edgeLabel: string; route: string }> = [];
    if (data.sector) structural.push({ id: "sector", label: `◆ ${data.sector}`, kind: "sector", edgeLabel: "sector", route: "/markets/sector-rotation" });
    if (data.exchange) structural.push({ id: "exchange", label: data.exchange, kind: "market", edgeLabel: "listed on", route: "/markets" });
    for (const ix of data.indices.slice(0, 3)) {
      structural.push({ id: `idx-${ix}`, label: ix, kind: "market", edgeLabel: "member of", route: "/markets" });
    }
    if (data.peerUniverse) structural.push({ id: "peers", label: `PEERS · ${data.peerUniverse}`, kind: "peer", edgeLabel: "peer group", route: `/markets/security/${encodeURIComponent(ticker)}?tab=peers` });
    if (data.hasOptions) structural.push({ id: "options", label: "F&O", kind: "options", edgeLabel: "derivatives", route: `/markets/derivatives?symbol=${encodeURIComponent(ticker)}` });
    if (data.newsCount > 0) structural.push({ id: "news", label: `NEWS ×${data.newsCount}`, kind: "news", edgeLabel: "coverage", route: `/markets/news?ticker=${encodeURIComponent(ticker)}` });

    structural.forEach((s, i) => {
      const pos = ringPosition(i, structural.length, 300);
      nodes.push({ id: s.id, position: pos, data: { label: s.label, route: s.route }, style: nodeStyle(s.kind) });
      edges.push(mkEdge(`e-${s.id}`, s.kind, s.edgeLabel));
    });

    // relationship ring (outer): co-mentioned tickers / portfolio / co-held
    const relational: Array<{ id: string; label: string; kind: string; edgeLabel: string; route?: string }> = [];
    for (const m of data.coMentioned) {
      relational.push({ id: `cm-${m.ticker}`, label: m.ticker, kind: "ticker", edgeLabel: `co-mentioned ×${m.count}`, route: `/markets/relationships/${encodeURIComponent(m.ticker)}` });
    }
    for (const h of data.heldIn) {
      relational.push({ id: `pf-${h.id}`, label: `◈ ${h.name}`, kind: "portfolio", edgeLabel: "held in", route: "/portfolio" });
    }
    for (const c of data.coHeld) {
      relational.push({ id: `ch-${c.ticker}`, label: c.ticker, kind: "ticker", edgeLabel: `co-held ×${c.count}`, route: `/markets/relationships/${encodeURIComponent(c.ticker)}` });
    }

    relational.forEach((s, i) => {
      const pos = ringPosition(i, Math.max(relational.length, 5), 520);
      nodes.push({ id: s.id, position: pos, data: { label: s.label, route: s.route }, style: nodeStyle(s.kind) });
      edges.push(mkEdge(`e-${s.id}`, s.kind, s.edgeLabel));
    });

    return { nodes, edges };
  }, [ticker, data]);

  if (!ticker) {
    return (
      <div style={{ padding: 24, color: "var(--ot-color-text-muted)", fontSize: "var(--ot-type-size-sm)" }}>
        Type a symbol or run <code style={{ color: "var(--ot-color-accent-primary)" }}>AAPL REL</code> in the command bar.
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 480 }}>
      <header style={{ display: "flex", alignItems: "baseline", gap: 10, padding: "10px 12px 4px", flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--ot-font-data)", fontSize: "var(--ot-type-size-lg)", fontWeight: 700, color: "var(--ot-color-accent-primary)" }}>{ticker}</span>
        <span style={{ fontSize: "var(--ot-type-size-xs)", color: "var(--ot-color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Relationship graph · observed edges only
        </span>
        <span style={{ marginLeft: "auto", display: "flex", gap: 10, fontFamily: "var(--ot-font-data)", fontSize: 10, color: "var(--ot-color-text-muted)" }}>
          <span style={{ color: "var(--ot-color-edge-sector)" }}>— sector</span>
          <span style={{ color: "var(--ot-color-edge-portfolio)" }}>— portfolio</span>
          <span style={{ color: "var(--ot-color-edge-peer)" }}>— peers</span>
          <span style={{ color: "var(--ot-color-intel-live)" }}>— news</span>
          <span style={{ color: "var(--ot-color-intel-derived)" }}>— derivatives</span>
        </span>
      </header>
      {loading && !data && (
        <div style={{ padding: "10px 12px", fontSize: "var(--ot-type-size-xs)", color: "var(--ot-color-text-muted)" }}>Mapping relationships…</div>
      )}
      {data?.notes.map((n) => (
        <div key={n} style={{ padding: "2px 12px", fontSize: 10, color: "var(--ot-color-system-warning)" }}>⚠ {n}</div>
      ))}
      <div style={{ flex: 1, minHeight: 420, borderTop: "1px solid var(--ot-color-border-subtle)" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          minZoom={0.2}
          maxZoom={1.8}
          nodesDraggable
          nodesConnectable={false}
          proOptions={{ hideAttribution: true }}
          onNodeClick={(_, node) => {
            const route = (node.data as { route?: string }).route;
            if (route) navigate(route);
          }}
        >
          <Background color="var(--ot-color-border-subtle)" gap={26} size={1} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
      {!loading && data && data.coMentioned.length === 0 && data.heldIn.length === 0 && (
        <div style={{ padding: "6px 12px 10px", fontSize: "var(--ot-type-size-xs)", color: "var(--ot-color-text-muted)" }}>
          No co-mentioned or co-held instruments in current data — coverage expands as news/portfolio data grows.
        </div>
      )}
    </div>
  );
}
