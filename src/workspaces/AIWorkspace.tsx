import React, { useEffect, useRef, useState } from 'react';
import { Bot, Send, Sparkles, User } from 'lucide-react';
import { marketEngine } from '../services/marketEngine';
import { getSymbol } from '../services/symbols';
import { lastValues } from '../services/backtestService';
import { marketBrief } from '../services/newsService';
import { useWorkspaceStore } from '../store/useWorkspaceStore';
import { useMarketStore } from '../store/useMarketStore';
import { useTradingStore } from '../store/useTradingStore';
import { useResearchStore } from '../store/useResearchStore';
import { fmtMoney, fmtNum, fmtPct, fmtPrice, fmtSignedMoney } from '../lib/format';
import { Panel } from '../components/primitives/Panel';
import { SplitPane } from '../components/primitives/SplitPane';
import { cx } from '../lib/utils';

interface Msg {
  id: number;
  role: 'user' | 'ai';
  text: string;
  time: number;
  ctx?: string[];
}

let msgSeq = 1;

const SUGGESTIONS = [
  'Analyze BTCUSDT',
  'Why did volatility spike?',
  'Find unusual volume',
  'Explain this setup',
  'Compare my strategies',
  "Summarize today's market",
  'Review my open positions',
  'Is NVDA overbought?',
];

function bold(md: string): React.ReactNode[] {
  // minimal **bold** + `code` + line renderer
  return md.split('\n').map((line, li) => {
    const parts: React.ReactNode[] = [];
    const re = /(\*\*.+?\*\*|`.+?`)/g;
    let last = 0;
    let m: RegExpExecArray | null;
    let k = 0;
    while ((m = re.exec(line))) {
      if (m.index > last) parts.push(line.slice(last, m.index));
      const tok = m[0];
      if (tok.startsWith('**')) parts.push(<strong key={k++} className="text-text1 font-bold">{tok.slice(2, -2)}</strong>);
      else parts.push(<code key={k++} className="num text-[10.5px] px-1 rounded bg-panel3 text-accent">{tok.slice(1, -1)}</code>);
      last = m.index + tok.length;
    }
    if (last < line.length) parts.push(line.slice(last));
    const bullet = line.trimStart().startsWith('- ') || line.trimStart().startsWith('• ');
    const content = bullet ? line.replace(/^(\s*)[-•] /, '$1• ') : line;
    void content;
    return (
      <div key={li} className={cx('leading-relaxed', bullet && 'pl-3', line.trim() === '' && 'h-2')}>
        {parts.length ? parts : '\u00A0'}
      </div>
    );
  });
}

function analyzeSymbol(symInput: string | null): string {
  const ws = useWorkspaceStore.getState();
  const sym = (symInput ?? ws.symbol).toUpperCase();
  const def = getSymbol(sym);
  const q = marketEngine.getQuote(sym);
  const v = lastValues(sym, ws.timeframe);
  const rsi = v.rsi14 ?? 50;
  const vsVwap = ((q.price - q.vwap) / q.vwap) * 100;
  const trendUp = (v.ema9 ?? 0) > (v.ema21 ?? 0);
  const macdUp = (v.macdHist ?? 0) >= 0;
  const score = (rsi > 55 ? 1 : rsi < 45 ? -1 : 0) + (vsVwap > 0 ? 1 : -1) + (trendUp ? 1 : -1) + (macdUp ? 1 : -1);
  const bias = score >= 2 ? 'BULLISH' : score <= -2 ? 'BEARISH' : 'NEUTRAL';
  const lines = [
    `**${sym} — ${def.name}** · ${ws.timeframe} · ${def.exchange}`,
    `Bias: **${bias}** (composite ${score >= 0 ? '+' : ''}${score}/4)`,
    '',
    `**Price action**`,
    `- Last \`${fmtPrice(q.price, def.decimals)}\` (${fmtPct(q.changePct)}) · day range \`${fmtPrice(q.low, def.decimals)}–${fmtPrice(q.high, def.decimals)}\``,
    `- ${vsVwap >= 0 ? 'Holding above' : 'Trading below'} VWAP by \`${fmtPct(Math.abs(vsVwap), 2)}\` — intraday ${vsVwap >= 0 ? 'buyers' : 'sellers'} in control`,
    `- Relative volume \`${q.relVol.toFixed(2)}x\` ${q.relVol > 1.5 ? '— participation is elevated, moves are meaningful' : q.relVol < 0.7 ? '— thin tape, expect chop' : '— near normal'}`,
    '',
    `**Momentum & trend**`,
    `- RSI(14) \`${rsi.toFixed(1)}\` ${rsi > 70 ? '— overbought, fade rallies or wait for reset' : rsi < 30 ? '— oversold, bounces likely but catching knives is risky' : rsi > 55 ? '— bullish momentum zone' : rsi < 45 ? '— bearish momentum zone' : '— neutral'}`,
    `- EMA stack ${trendUp ? 'bullish (9 > 21)' : 'bearish (9 < 21)'} · MACD hist ${(v.macdHist ?? 0) >= 0 ? 'positive' : 'negative'}`,
    `- ATR(14) \`${v.atr14 ? fmtPrice(v.atr14, def.decimals) : '—'}\` — size stops around 1–1.5× ATR`,
    `- Bollinger %B \`${v.pctB !== null && v.pctB !== undefined ? (v.pctB * 100).toFixed(0) + '%' : '—'}\` ${v.bbWidth !== null && v.bbWidth !== undefined && v.bbWidth < 4 ? '— squeeze forming, expansion likely' : ''}`,
    '',
    `**Levels to watch**`,
    `- Session high \`${fmtPrice(q.high, def.decimals)}\` / low \`${fmtPrice(q.low, def.decimals)}\` — a 15m close through either confirms continuation`,
    `- VWAP \`${fmtPrice(q.vwap, def.decimals)}\` — first magnet on any pullback`,
    '',
    `_Sources: live quote · ${ws.timeframe} indicators · session stats. Not financial advice._`,
  ];
  return lines.join('\n');
}

function marketSummary(): string {
  const b = marketBrief();
  const vix = marketEngine.getQuote('VIX');
  const spy = marketEngine.getQuote('SPY');
  const btc = marketEngine.getQuote('BTCUSDT');
  return [
    `**Session summary**`,
    '',
    `- ${b.headline}`,
    `- Breadth \`${b.breadth.toFixed(0)}% advancing\` · leaders ${b.leaders.join(', ')} · laggards ${b.laggards.join(', ')}`,
    `- SPY \`${fmtPct(spy.changePct)}\` · BTC \`${fmtPct(btc.changePct)}\` · VIX \`${vix.price.toFixed(2)}\` (${b.volRegime} vol regime)`,
    '',
    b.volRegime === 'elevated'
      ? `Volatility is elevated — reduce size, widen stops in ATR terms, and avoid fading the first move.`
      : b.volRegime === 'compressed'
        ? `Volatility is compressed — conditions favor range tactics and breakout preparation over chasing.`
        : `Volatility is normal — standard playbook: trade the range extremes, join confirmed breaks.`,
    '',
    `_Sources: breadth engine · index quotes · VIX._`,
  ].join('\n');
}

function reviewPositions(): string {
  const st = useTradingStore.getState();
  if (st.positions.length === 0) {
    return `You have **no open positions**. Day P&L is \`${fmtSignedMoney(st.dayPnl)}\` on \`${fmtMoney(st.equity, 0)}\` equity.\n\nIf you're flat by design — good discipline. If you're looking for ideas, try the **Scanner → Momentum** preset or ask me to \`find unusual volume\`.`;
  }
  const lines = [
    `**Position review** — ${st.positions.length} open · unreal \`${fmtSignedMoney(st.unrealized)}\` · day \`${fmtSignedMoney(st.dayPnl)}\``,
    '',
  ];
  for (const p of st.positions) {
    const def = getSymbol(p.symbol);
    const q = marketEngine.getQuote(p.symbol);
    const vsVwap = ((q.price - q.vwap) / q.vwap) * 100;
    const withTrend = p.side === 'LONG' ? vsVwap > -0.2 : vsVwap < 0.2;
    lines.push(`**${p.symbol} ${p.side}** ${fmtNum(p.qty, 4)} @ \`${fmtPrice(p.avgEntry, def.decimals)}\` → \`${fmtPrice(p.mark, def.decimals)}\` · **${fmtSignedMoney(p.unrealized)}** (${fmtPct(p.unrealizedPct)})`);
    lines.push(`- ${withTrend ? '✓ aligned with intraday flow' : '⚠ fighting intraday flow'} (vs VWAP ${fmtPct(vsVwap)})${p.stop ? ` · stop \`${fmtPrice(p.stop, def.decimals)}\`` : ' · **no stop set**'}${p.target ? ` · target \`${fmtPrice(p.target, def.decimals)}\`` : ''}`);
    lines.push('');
  }
  const heat = Math.abs(st.unrealized) / Math.max(1, st.equity);
  lines.push(heat > 0.03 ? `⚠ Portfolio heat is high (${fmtPct(heat * 100, 1)} of equity swinging) — consider trimming into strength.` : `Risk looks contained. Total exposure \`${fmtMoney(st.exposure, 0)}\` on \`${fmtMoney(st.equity, 0)}\` equity.`);
  return lines.join('\n');
}

function unusualVolume(): string {
  const all = marketEngine.getAllQuotes().filter((q) => q.volume > 0).sort((a, b) => b.relVol - a.relVol).slice(0, 6);
  const lines = [`**Unusual volume** — top relative-volume names right now`, ''];
  for (const q of all) {
    lines.push(`- **${q.symbol}** \`${q.relVol.toFixed(2)}x\` avg · ${fmtPct(q.changePct)} @ \`${fmtPrice(q.price, getSymbol(q.symbol).decimals)}\``);
  }
  lines.push('', `High rel-vol + directional follow-through usually means institutional flow. Check the **Order Flow** workspace for absorption before chasing.`);
  return lines.join('\n');
}

function compareStrategies(): string {
  const rs = useResearchStore.getState();
  if (rs.backtests.length === 0) {
    return `No backtest runs yet — I have nothing to compare.\n\nGo to **Backtest Lab**, pick one of your **${rs.strategies.length} strategies** (${rs.strategies.slice(0, 3).map((s) => s.name).join(', ')}) and hit **Run**. Then ask me again and I'll rank them by Sharpe, drawdown and profit factor.`;
  }
  const ranked = [...rs.backtests].sort((a, b) => b.metrics.sharpe - a.metrics.sharpe).slice(0, 4);
  const lines = [`**Strategy ranking** — by Sharpe across ${rs.backtests.length} runs`, ''];
  ranked.forEach((b, i) => {
    lines.push(`${i + 1}. **${b.config.strategy.name}** (${b.config.symbol} ${b.config.timeframe}) — Sharpe \`${b.metrics.sharpe.toFixed(2)}\` · return \`${fmtPct(b.metrics.totalReturnPct, 1)}\` · maxDD \`−${fmtPct(b.metrics.maxDDPct, 1)}\` · PF \`${b.metrics.profitFactor.toFixed(2)}\` · ${b.metrics.trades} trades`);
  });
  lines.push('', `Caveat: in-sample Sharpe overstates edge. Re-run on a different symbol/timeframe to check robustness before sizing up.`);
  return lines.join('\n');
}

function volatilityNote(): string {
  const vix = marketEngine.getQuote('VIX');
  const all = marketEngine.getAllQuotes();
  const movers = [...all].sort((a, b) => Math.abs(b.changePct) - Math.abs(a.changePct)).slice(0, 4);
  return [
    `**Volatility check**`,
    '',
    `- VIX \`${vix.price.toFixed(2)}\` (${fmtPct(vix.changePct)}) — ${vix.price > 22 ? 'fear bid is up; expect wide ranges and false breaks' : vix.price > 17 ? 'normal chop; trade your levels' : 'complacent tape; long-gamma strategies suffer, breakouts can run'}`,
    `- Biggest absolute movers: ${movers.map((m) => `**${m.symbol}** ${fmtPct(m.changePct)}`).join(' · ')}`,
    `- Event risk: check **Intelligence → Economic Calendar** — NFP / CPI / FOMC days regularly reprice vol surface-wide`,
    '',
    `Rule of thumb: size positions in **ATR units**, not dollars. When ATR doubles, halve size to keep risk constant.`,
  ].join('\n');
}

function explainSetup(): string {
  const ws = useWorkspaceStore.getState();
  const sym = ws.symbol;
  const v = lastValues(sym, ws.timeframe);
  const rsi = v.rsi14 ?? 50;
  if (rsi < 35) {
    return [`**Mean-reversion setup forming on ${sym}** (${ws.timeframe})`, '',
      `- RSI(14) \`${rsi.toFixed(1)}\` is washed out — statistically, weak hands are puking`,
      `- Playbook: wait for a 5m bullish engulf or reclaim of VWAP, stop under the session low, target VWAP then the EMA-21`,
      `- Invalidation: another leg down on expanding volume = trend day, stand aside`,
      `- Size: risk ≤1% equity; this is a counter-trend scalp, not a position trade`].join('\n');
  }
  if (rsi > 60 && (v.macdHist ?? 0) > 0) {
    return [`**Momentum-continuation setup on ${sym}** (${ws.timeframe})`, '',
      `- RSI \`${rsi.toFixed(1)}\` + positive MACD hist = trend intact, dips are for buying`,
      `- Playbook: buy the first pullback to EMA-9/21 confluence or VWAP, stop 1× ATR under the pullback low`,
      `- Target: measured move to the session high, then trail with a 2-bar low stop`,
      `- Invalidation: 15m close back below VWAP kills the thesis`].join('\n');
  }
  return [`**Range setup on ${sym}** (${ws.timeframe})`, '',
    `- RSI \`${rsi.toFixed(1)}\` is mid-range with no momentum edge — this is a mean-reversion tape`,
    `- Playbook: fade the session extremes, take profit at mid/VWAP, keep stops tight beyond the range`,
    `- Breakout watch: a volume-backed 15m close outside the range flips the playbook to breakout continuation`].join('\n');
}

function generate(prompt: string): { text: string; ctx: string[] } {
  const ws = useWorkspaceStore.getState();
  const p = prompt.toLowerCase();
  const symHit = prompt.toUpperCase().match(/\b(BTCUSDT|ETHUSDT|SOLUSDT|[A-Z]{1,5}USD|ES|NQ|YM|RTY|CL|GC|AAPL|NVDA|MSFT|TSLA|AMZN|META|GOOGL|AMD|NFLX|CRM|COIN|PLTR|JPM|XOM|SPY|QQQ|DIA|IWM|VIX|BNBUSDT|XRPUSDT|DOGEUSDT|ADAUSDT|AVAXUSDT|LINKUSDT|TONUSDT)\b/);
  const ctx = [`symbol: ${ws.symbol}`, `timeframe: ${ws.timeframe}`];
  if (/summar|brief|today|market overview|desk/.test(p)) return { text: marketSummary(), ctx: [...ctx, 'breadth', 'vix'] };
  if (/position|portfolio|exposure|my book/.test(p)) return { text: reviewPositions(), ctx: [...ctx, 'portfolio'] };
  if (/unusual|volume|flow|sweep/.test(p)) return { text: unusualVolume(), ctx: [...ctx, 'tape'] };
  if (/volatil|vix|spike|fear/.test(p)) return { text: volatilityNote(), ctx: [...ctx, 'vix'] };
  if (/compar|rank|strateg/.test(p)) return { text: compareStrategies(), ctx: [...ctx, 'backtests'] };
  if (/setup|explain|playbook|trade idea|entry/.test(p)) return { text: explainSetup(), ctx };
  if (/overbought|oversold|rsi/.test(p)) return { text: analyzeSymbol(symHit?.[1] ?? null), ctx };
  if (/analy|look at|opinion|thoughts|check/.test(p) || symHit) return { text: analyzeSymbol(symHit?.[1] ?? null), ctx };
  if (/risk|size|stop/.test(p)) {
    const st = useTradingStore.getState();
    return {
      text: [`**Risk desk**`, '',
        `- Equity \`${fmtMoney(st.equity, 0)}\` · exposure \`${fmtMoney(st.exposure, 0)}\` (${fmtPct((st.exposure / Math.max(1, st.equity)) * 100, 0)} gross) · margin \`${fmtMoney(st.marginUsed, 0)}\``,
        `- House rules I enforce in this terminal: risk ≤2% per idea, ≤6% portfolio heat, stops entered **with** the order (bracket) — never after.`,
        `- Tell me an entry + stop and I'll compute exact size for 1% risk.`].join('\n'),
      ctx: [...ctx, 'risk'],
    };
  }
  return {
    text: [`I can work with live terminal context. Try:`, '',
      `- \`Analyze NVDA\` — full technical read with levels`,
      `- \`Summarize today's market\` — breadth, leaders, vol regime`,
      `- \`Review my open positions\` — flow alignment + risk flags`,
      `- \`Find unusual volume\` — where the money is moving`,
      `- \`Explain this setup\` — playbook for the active chart`,
      `- \`Compare my strategies\` — ranked backtest results`].join('\n'),
    ctx,
  };
}

export function AIWorkspace(): React.ReactElement {
  const symbol = useWorkspaceStore((s) => s.symbol);
  const timeframe = useWorkspaceStore((s) => s.timeframe);
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 0, role: 'ai', time: Date.now(), ctx: [`symbol: ${symbol}`, `timeframe: ${timeframe}`],
      text: `**Desk AI online.** I'm wired into your quotes, chart, portfolio and backtests.\n\nAsk for an analysis, a market summary, or a position review — or tap a suggestion below.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length, thinking]);

  const send = (text: string): void => {
    const clean = text.trim();
    if (!clean || thinking) return;
    setMessages((m) => [...m, { id: msgSeq++, role: 'user', text: clean, time: Date.now() }]);
    setInput('');
    setThinking(true);
    setTimeout(() => {
      const { text: reply, ctx } = generate(clean);
      setMessages((m) => [...m, { id: msgSeq++, role: 'ai', text: reply, time: Date.now(), ctx }]);
      setThinking(false);
    }, 650 + Math.random() * 500);
  };

  return (
    <div className="flex-1 min-h-0 flex p-2 gap-2 overflow-hidden">
      <SplitPane
        storageKey="ai-right"
        defaultSize={300} min={240} max={440}
        flip
        left={
          <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-auto pl-2">
            <Panel title="Live context" subtitle="what the AI can see" bodyClassName="p-2">
              <ContextRow k="Symbol" v={symbol} />
              <ContextRow k="Timeframe" v={timeframe} />
              <ContextRow k="Equity" v={fmtMoney(useTradingStore.getState().equity, 0)} />
              <ContextRow k="Open positions" v={String(useTradingStore.getState().positions.length)} />
              <ContextRow k="Backtest runs" v={String(useResearchStore.getState().backtests.length)} />
              <ContextRow k="Feed" v={`live · ${useMarketStore.getState().latency}ms`} />
            </Panel>
            <Panel title="Suggested prompts" bodyClassName="p-1.5 space-y-1">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="tbtn tbtn-sm w-full justify-start !font-normal" onClick={() => send(s)}>
                  <Sparkles size={11} className="text-violet shrink-0" /> <span className="truncate">{s}</span>
                </button>
              ))}
            </Panel>
            <Panel title="About Desk AI" bodyClassName="p-2">
              <p className="text-[10.5px] text-text3 leading-relaxed">
                Desk AI reads live terminal state — quotes, indicators, positions, backtests — and explains it in trader language.
                It runs locally on deterministic analysis modules. Educational use only; not financial advice.
              </p>
            </Panel>
          </div>
        }
        right={
          <div className="flex-1 min-h-0 flex">
            <Panel
              title="Desk AI"
              subtitle="terminal intelligence"
              actions={<span className="badge badge-up">online</span>}
              className="flex-1"
              bodyClassName="!overflow-hidden flex flex-col"
            >
              <div ref={scrollRef} className="flex-1 min-h-0 overflow-auto p-3 space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={cx('flex gap-2', msg.role === 'user' && 'flex-row-reverse')}>
                    <span className={cx('w-[26px] h-[26px] rounded-full flex items-center justify-center shrink-0 mt-0.5',
                      msg.role === 'ai' ? 'bg-violet/20 text-violet' : 'bg-accentdim text-accent')}>
                      {msg.role === 'ai' ? <Bot size={14} /> : <User size={14} />}
                    </span>
                    <div className={cx('max-w-[78%] min-w-0 break-words rounded-lg px-3 py-2 text-[11.5px] text-text2',
                      msg.role === 'ai' ? 'bg-panel2 border border-line' : 'bg-accentdim border border-accent/30 text-text1')}>
                      {msg.role === 'ai' ? bold(msg.text) : msg.text}
                      {msg.ctx && (
                        <div className="flex gap-1 mt-1.5 flex-wrap">
                          {msg.ctx.map((c) => <span key={c} className="num text-[9px] px-1 py-px rounded bg-panel3 text-text3">{c}</span>)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {thinking && (
                  <div className="flex gap-2">
                    <span className="w-[26px] h-[26px] rounded-full bg-violet/20 text-violet flex items-center justify-center shrink-0"><Bot size={14} /></span>
                    <div className="rounded-lg px-3 py-2.5 bg-panel2 border border-line flex gap-1">
                      {[0, 1, 2].map((i) => <span key={i} className="w-[6px] h-[6px] rounded-full bg-text3 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />)}
                    </div>
                  </div>
                )}
              </div>
              <div className="p-2 border-t border-line shrink-0">
                <div className="flex gap-1.5">
                  <input
                    className="tinput !h-[32px] !text-[12px]"
                    placeholder={`Ask about ${symbol}, the market, your book…`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') send(input); }}
                  />
                  <button className="tbtn tbtn-primary !h-[32px] !px-3" onClick={() => send(input)} disabled={!input.trim() || thinking}>
                    <Send size={13} />
                  </button>
                </div>
              </div>
            </Panel>
          </div>
        }
      />
    </div>
  );
}

function ContextRow({ k, v }: { k: string; v: string }): React.ReactElement {
  return (
    <div className="flex items-center justify-between h-[24px] border-b border-line/60 last:border-0">
      <span className="text-[10.5px] text-text3">{k}</span>
      <span className="num text-[11px] font-semibold">{v}</span>
    </div>
  );
}
