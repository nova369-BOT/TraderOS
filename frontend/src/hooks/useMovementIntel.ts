import { useEffect, useMemo, useState } from "react";

import {
  fetchChart,
  fetchStock,
  fetchTopBarTickers,
} from "../api/client";
import { fetchNewsByTicker } from "../api/news";
import { fetchPeers } from "../api/equity";
import { fetchFnoSignal } from "../api/intelligence";
import { postRegimes } from "../api/statlab";
import { useSettingsStore } from "../store/settingsStore";
import { normalizeTicker } from "../utils/ticker";

/**
 * Movement Intelligence data assembly ("Why did this move?").
 *
 * Integrity contract — every entry is one of:
 *   observed    raw data returned by an endpoint
 *   derived     transparent client heuristic computed from observed data
 *   ai          model-produced interpretation (NOT used here — see note)
 *   unavailable explicit no-data state
 *
 * No values are ever invented; failed sources become `unavailable` items.
 * The AI block is intentionally honest: this surface has no inference
 * endpoint, so it reports unavailability instead of fabricating text.
 */

export type EvidenceKind = "observed" | "derived" | "ai" | "unavailable";

export type EvidenceItem = {
  id: string;
  kind: EvidenceKind;
  /** short label, e.g. "Price move" */
  label: string;
  /** the fact, e.g. "+4.8%" */
  value: string;
  /** optional explanation of what this is */
  detail?: string;
  /** data source */
  source?: string;
  /** epoch ms when known */
  at?: number;
  direction?: "up" | "down" | "flat";
};

export type MovementIntel = {
  ticker: string;
  market: string;
  companyName?: string;
  sector?: string;
  changePct: number | null;
  loading: boolean;
  /** errors recorded per source (never silently zeroed) */
  notes: string[];
  primary: EvidenceItem[];
  context: EvidenceItem[];
  derivedAssessment: string | null;
  ai: { available: boolean; reason?: string };
  confidence: number;
  freshnessAt: number;
};

function pct(value: number | null | undefined, digits = 2): string | null {
  if (value === null || value === undefined || !Number.isFinite(value)) return null;
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(digits)}%`;
}

function num(value: number | null | undefined, digits = 2): string | null {
  if (value === null || value === undefined || !Number.isFinite(value)) return null;
  return value.toLocaleString(undefined, { maximumFractionDigits: digits });
}

function timeago(at: number): string {
  const s = Math.max(0, Math.floor((Date.now() - at) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 48) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function useMovementIntel(rawTicker: string | null | undefined): MovementIntel {
  const market = useSettingsStore((s) => s.selectedMarket);
  const ticker = normalizeTicker(rawTicker ?? "");
  const [state, setState] = useState<Omit<MovementIntel, "ticker" | "market"> | null>(null);

  useEffect(() => {
    if (!ticker) {
      setState(null);
      return;
    }
    let cancelled = false;

    async function assemble() {
      const notes: string[] = [];
      const SOURCES = 6;
      let ok = 0;

      const [stockR, chartR, peersR, newsR, regimeR, breadthR] = await Promise.allSettled([
        fetchStock(ticker, market),
        fetchChart(ticker, "1d", "1y", market),
        fetchPeers(ticker),
        fetchNewsByTicker(ticker, 6, market),
        postRegimes({ ticker }),
        fetchTopBarTickers(),
      ]);
      if (cancelled) return;

      const primary: EvidenceItem[] = [];
      const context: EvidenceItem[] = [];

      // --- observed: stock snapshot -------------------------------------
      let changePct: number | null = null;
      let companyName: string | undefined;
      let sector: string | undefined;
      if (stockR.status === "fulfilled") {
        ok += 1;
        const s = stockR.value;
        changePct = s.change_pct ?? null;
        companyName = s.company_name;
        sector = s.sector;
        primary.push({
          id: "price",
          kind: "observed",
          label: "Price move (session)",
          value: pct(changePct) ?? "N/A",
          detail: `${s.current_price != null ? `Last ${num(s.current_price)}` : "Last price unavailable"}${s.exchange ? ` · ${s.exchange}` : ""}`,
          source: "stock snapshot",
          direction: changePct == null ? "flat" : changePct > 0 ? "up" : changePct < 0 ? "down" : "flat",
        });
      } else {
        notes.push("Stock snapshot unavailable");
        primary.push({ id: "price", kind: "unavailable", label: "Price move (session)", value: "DATA UNAVAILABLE" });
      }

      // --- chart-derived: volume, sigma move, period returns -------------
      if (chartR.status === "fulfilled") {
        ok += 1;
        const pts = chartR.value?.data ?? [];
        const closes = pts.map((p) => p.c).filter((v) => Number.isFinite(v) && v > 0);
        const vols = pts.map((p) => p.v).filter((v) => Number.isFinite(v) && v > 0);

        if (closes.length >= 30) {
          const rets: number[] = [];
          for (let i = 1; i < closes.length; i += 1) rets.push((closes[i] / closes[i - 1] - 1) * 100);
          const last = rets[rets.length - 1];
          const sample = rets.slice(-252, -1);
          const mean = sample.reduce((a, b) => a + b, 0) / sample.length;
          const variance = sample.reduce((a, b) => a + (b - mean) ** 2, 0) / Math.max(1, sample.length - 1);
          const sigma = Math.sqrt(variance);
          if (sigma > 0 && Number.isFinite(last)) {
            const z = last / sigma;
            primary.push({
              id: "sigma",
              kind: "derived",
              label: "Move vs 1y daily volatility",
              value: `${z >= 0 ? "+" : ""}${z.toFixed(1)}σ`,
              detail: `heuristic: today's return ÷ st.dev of prior ${sample.length} daily returns`,
              source: "chart series (1y)",
              direction: z > 0 ? "up" : z < 0 ? "down" : "flat",
            });
          }
        }
        if (vols.length >= 21) {
          const avg20 = vols.slice(-21, -1).reduce((a, b) => a + b, 0) / 20;
          const lastV = vols[vols.length - 1];
          if (avg20 > 0) {
            primary.push({
              id: "volume",
              kind: "derived",
              label: "Volume vs 20-day average",
              value: `${(lastV / avg20).toFixed(1)}×`,
              detail: `heuristic: last session volume ÷ mean of prior 20 sessions`,
              source: "chart series (1y)",
              direction: lastV / avg20 >= 1.5 ? "up" : "flat",
            });
          }
        }
        if (closes.length >= 22) {
          const r1m = (closes[closes.length - 1] / closes[closes.length - 22] - 1) * 100;
          context.push({
            id: "ret1m",
            kind: "derived",
            label: "1M return",
            value: pct(r1m) ?? "N/A",
            source: "chart series (1y)",
            direction: r1m > 0 ? "up" : r1m < 0 ? "down" : "flat",
          });
        }
      } else {
        notes.push("Chart history unavailable — volatility/volume context limited");
        primary.push({ id: "chart", kind: "unavailable", label: "Series context", value: "INSUFFICIENT HISTORY" });
      }

      // --- observed: peers group -----------------------------------------
      if (peersR.status === "fulfilled") {
        ok += 1;
        context.push({
          id: "peers",
          kind: "observed",
          label: "Comparison universe",
          value: peersR.value?.universe || "available",
          detail: "peer percentile metrics available in Security Hub → PEER",
          source: "peers endpoint",
        });
      } else {
        notes.push("Peers unavailable");
      }

      // --- observed: market breadth indices ------------------------------
      if (breadthR.status === "fulfilled") {
        ok += 1;
        const rows = (breadthR.value as { tickers?: Array<{ symbol?: string; name?: string; change_pct?: number }> })?.tickers ?? [];
        const idx = rows
          .filter((r) => typeof r.change_pct === "number")
          .slice(0, 4)
          .map((r) => `${r.name ?? r.symbol ?? "?"} ${pct(r.change_pct ?? null)}`)
          .filter((s) => !s.endsWith("null"));
        if (idx.length) {
          context.push({
            id: "indices",
            kind: "observed",
            label: "Major indices (session)",
            value: idx.join(" · "),
            source: "topbar ticker service",
          });
        }
      } else {
        notes.push("Index breadth unavailable");
      }

      // --- observed/derived: news ----------------------------------------
      if (newsR.status === "fulfilled") {
        ok += 1;
        const items = newsR.value ?? [];
        if (items.length) {
          const first = items[0];
          const when = first.published_at ? Date.parse(first.published_at) : NaN;
          context.push({
            id: "news",
            kind: "observed",
            label: `Recent stories (${items.length})`,
            value: first.title,
            detail: `${first.source}${Number.isFinite(when) ? ` · ${timeago(when)}` : ""}`,
            source: "news service",
            at: Number.isFinite(when) ? when : undefined,
          });
          const sentiments = items
            .map((n) => n.sentiment_label ?? n.sentiment?.label)
            .filter((x): x is string => Boolean(x));
          if (sentiments.length) {
            const pos = sentiments.filter((s) => /pos|bull/i.test(s)).length;
            const neg = sentiments.filter((s) => /neg|bear/i.test(s)).length;
            context.push({
              id: "news-sent",
              kind: "derived",
              label: "Headline sentiment mix",
              value: `${pos} positive · ${neg} negative · ${sentiments.length - pos - neg} neutral`,
              detail: "backend sentiment pipeline labels (model-derived)",
              source: "news service",
              direction: pos > neg ? "up" : neg > pos ? "down" : "flat",
            });
          }
        } else {
          context.push({ id: "news", kind: "unavailable", label: "Recent stories", value: "NO RECENT STORIES" });
        }
      } else {
        notes.push("News unavailable");
      }

      // --- derived (model): volatility regime -----------------------------
      if (regimeR.status === "fulfilled") {
        ok += 1;
        const r = regimeR.value;
        context.push({
          id: "regime",
          kind: "derived",
          label: "Volatility regime",
          value: String(r.current_regime ?? "unknown").replace(/_/g, " ").toUpperCase(),
          detail: `HMM model output · high-vol probability ${(100 * (r.current_high_vol_prob ?? 0)).toFixed(0)}%`,
          source: "statlab/regimes",
          direction: (r.current_high_vol_prob ?? 0) > 0.5 ? "down" : "flat",
        });
      } else {
        notes.push("Regime model unavailable");
      }

      // --- derived assessment (transparent heuristic) --------------------
      let derivedAssessment: string | null = null;
      {
        const sig = primary.find((e) => e.id === "sigma");
        const vol = primary.find((e) => e.id === "volume");
        const fresh = context.find((e) => e.id === "news" && e.at && Date.now() - e.at < 1000 * 60 * 60 * 30);
        const bits: string[] = [];
        if (sig?.value && Math.abs(parseFloat(sig.value)) >= 2) bits.push(`a statistically large move (${sig.value})`);
        if (vol && vol.kind !== "unavailable" && parseFloat(vol.value) >= 1.5) bits.push(`elevated volume (${vol.value} avg)`);
        if (fresh) bits.push("a fresh news catalyst (<30h)");
        if (bits.length) {
          derivedAssessment = `Pattern consistent with ${bits.join(" + ")}. This is a transparent heuristic over observed data — not a causal claim.`;
        }
      }

      const confidence = Math.round((ok / SOURCES) * 100);
      setState({
        companyName,
        sector,
        changePct,
        loading: false,
        notes,
        primary,
        context,
        derivedAssessment,
        ai: {
          available: false,
          reason:
            "No inference endpoint is configured for this surface. Observed data and transparent heuristics are shown instead — no narrative is fabricated.",
        },
        confidence,
        freshnessAt: Date.now(),
      });
    }

    setState((prev) => (prev ? { ...prev, loading: true } : null));
    void assemble();
    return () => {
      cancelled = true;
    };
  }, [ticker, market]);

  return useMemo<MovementIntel>(
    () => ({
      ticker,
      market,
      companyName: state?.companyName,
      sector: state?.sector,
      changePct: state?.changePct ?? null,
      loading: state?.loading ?? true,
      notes: state?.notes ?? [],
      primary: state?.primary ?? [],
      context: state?.context ?? [],
      derivedAssessment: state?.derivedAssessment ?? null,
      ai: state?.ai ?? { available: false },
      confidence: state?.confidence ?? 0,
      freshnessAt: state?.freshnessAt ?? Date.now(),
    }),
    [ticker, market, state],
  );
}

// F&O observation hook kept separate (NSE-only defensive call) -------------
export function useFnoObservation(ticker: string, enabled: boolean): EvidenceItem | null {
  const [item, setItem] = useState<EvidenceItem | null>(null);
  useEffect(() => {
    if (!enabled || !ticker) {
      setItem(null);
      return;
    }
    let cancelled = false;
    fetchFnoSignal(ticker)
      .then((rec) => {
        if (cancelled) return;
        if (!rec || typeof rec !== "object") {
          setItem({ id: "fno", kind: "unavailable", label: "Options activity", value: "NO SIGNAL AVAILABLE", source: "fno signal" });
          return;
        }
        const r = rec as Record<string, unknown>;
        const signal = (r.signal ?? r.direction ?? r.bias ?? null) as string | null;
        setItem({
          id: "fno",
          kind: "observed",
          label: "Options / F&O signal",
          value: signal ? String(signal).toUpperCase() : "SIGNAL AVAILABLE",
          detail: "raw signal from F&O service — see F&O workspace for full chain",
          source: "fno signal endpoint",
        });
      })
      .catch(() => {
        if (!cancelled) setItem({ id: "fno", kind: "unavailable", label: "Options activity", value: "DATA UNAVAILABLE", source: "fno signal" });
      });
    return () => {
      cancelled = true;
    };
  }, [ticker, enabled]);
  return item;
}
