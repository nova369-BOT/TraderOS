import { marketEngine } from './marketEngine';
import { SYMBOLS } from './symbols';
import { mulberry32, hashStr } from '../lib/utils';

export interface NewsItem {
  id: string;
  time: number;
  source: string;
  headline: string;
  summary: string;
  symbols: string[];
  sentiment: 'bullish' | 'bearish' | 'neutral';
  impact: 'high' | 'medium' | 'low';
  url?: string;
}

export interface CalEvent {
  id: string;
  time: number;
  country: string;
  title: string;
  impact: 'high' | 'medium' | 'low';
  actual: string | null;
  forecast: string | null;
  previous: string | null;
}

const SOURCES = ['Terminal Wire', 'MarketWatch Desk', 'AlphaFeed', 'Global Macro Daily', 'Flow Analytics', 'Earnings Call'];

const HEADLINES: Array<{ h: string; s: string; bias: 'bullish' | 'bearish' | 'neutral'; w: string[] }> = [
  { h: 'Large block buyer sweeps {S} futures — delta flips positive', s: 'Aggressive lifting across multiple venues with volume running well above the 20-day average.', bias: 'bullish', w: ['ES', 'NQ', 'BTCUSDT', 'NVDA', 'AAPL'] },
  { h: '{S} holds above VWAP into the close as dips keep getting bought', s: 'Intraday structure remains constructive with higher lows on every 15-minute pullback.', bias: 'bullish', w: ['SPY', 'QQQ', 'AAPL', 'MSFT', 'ETHUSDT'] },
  { h: 'Unusual call sweep detected in {S} — implied vol bid', s: 'Repeat sweeps in near-dated upside calls suggest positioning for a near-term expansion move.', bias: 'bullish', w: ['NVDA', 'TSLA', 'META', 'COIN', 'PLTR'] },
  { h: '{S} breaks down through overnight lows on heavy volume', s: 'Sellers in control with stacked sell imbalances printing on every lower-timeframe bounce attempt.', bias: 'bearish', w: ['ES', 'NQ', 'TSLA', 'AMD', 'SOLUSDT'] },
  { h: 'Offer wall absorbs {S} rally — absorption at prior highs', s: 'Passive supply continues to refresh into strength; buyers failing to trade through the level.', bias: 'bearish', w: ['BTCUSDT', 'ETHUSDT', 'NVDA', 'AMZN', 'GC'] },
  { h: 'Put protection bid in {S} as skew steepens', s: 'Downside hedges being accumulated into the event; dealers likely short gamma below spot.', bias: 'bearish', w: ['SPY', 'QQQ', 'AAPL', 'NFLX', 'META'] },
  { h: '{S} consolidates in tight range — volatility compression at extremes', s: 'Bollinger bandwidth at multi-week lows; conditions favor an imminent directional expansion.', bias: 'neutral', w: ['BTCUSDT', 'ES', 'EURUSD', 'AAPL', 'CL'] },
  { h: 'Options expiry pins {S} near max-pain strike', s: 'Gamma gravity keeping spot contained; expect a freer two-way market after the expiry roll.', bias: 'neutral', w: ['SPY', 'QQQ', 'NVDA', 'TSLA', 'AAPL'] },
  { h: 'Fed speakers reiterate data-dependent stance — {S} steady', s: 'Rate-path repricing remains the dominant macro driver; terminal closely watching CPI and payrolls.', bias: 'neutral', w: ['ES', 'NQ', 'YM', 'GC', 'EURUSD'] },
  { h: 'ETF flows into {S} accelerate for third straight session', s: 'Sustained creations point to institutional accumulation underneath the surface.', bias: 'bullish', w: ['SPY', 'QQQ', 'BTCUSDT', 'ETHUSDT', 'IWM'] },
  { h: '{S} funding rates spike — crowded long warns of shakeout', s: 'Perpetual funding at elevated levels; long positioning looks extended versus recent history.', bias: 'bearish', w: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'DOGEUSDT', 'LINKUSDT'] },
  { h: 'Insider cluster buying reported in {S}', s: 'Multiple open-market purchases by directors over the past two weeks at current levels.', bias: 'bullish', w: ['PLTR', 'COIN', 'CRM', 'AMD', 'JPM'] },
];

export function getNews(filterSymbol?: string, limit = 60): NewsItem[] {
  const now = Date.now();
  const rnd = mulberry32(hashStr('news' + Math.floor(now / 3600000)));
  const items: NewsItem[] = [];
  let t = now - Math.floor(rnd() * 20 + 2) * 60000;
  for (let i = 0; i < limit; i++) {
    const tpl = HEADLINES[Math.floor(rnd() * HEADLINES.length)];
    const sym = tpl.w[Math.floor(rnd() * tpl.w.length)];
    const extra = rnd() < 0.3 ? tpl.w[Math.floor(rnd() * tpl.w.length)] : null;
    const symbols = extra && extra !== sym ? [sym, extra] : [sym];
    if (filterSymbol && !symbols.includes(filterSymbol)) {
      t -= Math.floor(rnd() * 30 + 6) * 60000;
      continue;
    }
    items.push({
      id: `n${i}`,
      time: t,
      source: SOURCES[Math.floor(rnd() * SOURCES.length)],
      headline: tpl.h.replace('{S}', sym),
      summary: tpl.s,
      symbols,
      sentiment: tpl.bias,
      impact: rnd() < 0.18 ? 'high' : rnd() < 0.55 ? 'medium' : 'low',
    });
    t -= Math.floor(rnd() * 45 + 5) * 60000;
  }
  return items;
}

export function getCalendar(): CalEvent[] {
  const now = new Date();
  const day = (offset: number, h: number, m: number): number => {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + offset, h, m));
    return d.getTime();
  };
  const passed = (t: number): boolean => t < Date.now();
  void passed;
  return [
    { id: 'c1', time: day(-1, 12, 30), country: 'US', title: 'CPI m/m', impact: 'high', actual: '0.3%', forecast: '0.3%', previous: '0.2%' },
    { id: 'c2', time: day(-1, 18, 0), country: 'US', title: 'FOMC Member Speech', impact: 'medium', actual: null, forecast: null, previous: null },
    { id: 'c3', time: day(0, 6, 0), country: 'EU', title: 'ECB Press Conference', impact: 'high', actual: null, forecast: null, previous: null },
    { id: 'c4', time: day(0, 12, 30), country: 'US', title: 'Initial Jobless Claims', impact: 'medium', actual: null, forecast: '221K', previous: '219K' },
    { id: 'c5', time: day(0, 13, 15), country: 'US', title: 'Industrial Production m/m', impact: 'low', actual: null, forecast: '0.1%', previous: '0.0%' },
    { id: 'c6', time: day(0, 23, 50), country: 'JP', title: 'BOJ Policy Rate Decision', impact: 'high', actual: null, forecast: '0.50%', previous: '0.50%' },
    { id: 'c7', time: day(1, 1, 30), country: 'AU', title: 'Employment Change', impact: 'medium', actual: null, forecast: '22K', previous: '15K' },
    { id: 'c8', time: day(1, 12, 30), country: 'US', title: 'Non-Farm Payrolls', impact: 'high', actual: null, forecast: '185K', previous: '171K' },
    { id: 'c9', time: day(1, 12, 30), country: 'US', title: 'Unemployment Rate', impact: 'high', actual: null, forecast: '4.1%', previous: '4.1%' },
    { id: 'c10', time: day(1, 14, 0), country: 'US', title: 'ISM Services PMI', impact: 'medium', actual: null, forecast: '52.4', previous: '51.9' },
    { id: 'c11', time: day(2, 9, 0), country: 'GB', title: 'GDP m/m', impact: 'medium', actual: null, forecast: '0.1%', previous: '-0.1%' },
    { id: 'c12', time: day(3, 12, 30), country: 'US', title: 'Retail Sales m/m', impact: 'medium', actual: null, forecast: '0.4%', previous: '0.6%' },
    { id: 'c13', time: day(4, 18, 0), country: 'US', title: 'FOMC Rate Decision', impact: 'high', actual: null, forecast: '4.25%', previous: '4.50%' },
    { id: 'c14', time: day(4, 18, 30), country: 'US', title: 'FOMC Press Conference', impact: 'high', actual: null, forecast: null, previous: null },
  ];
}

export function marketBrief(): { breadth: number; leaders: string[]; laggards: string[]; volRegime: string; headline: string } {
  const quotes = marketEngine.getAllQuotes().filter((q) => SYMBOLS.find((s) => s.symbol === q.symbol)?.asset === 'EQUITY');
  const up = quotes.filter((q) => q.changePct > 0).length;
  const breadth = quotes.length ? (up / quotes.length) * 100 : 50;
  const sorted = [...quotes].sort((a, b) => b.changePct - a.changePct);
  const leaders = sorted.slice(0, 3).map((q) => q.symbol);
  const laggards = sorted.slice(-3).map((q) => q.symbol);
  const vix = marketEngine.getQuote('VIX');
  const volRegime = vix.price > 22 ? 'elevated' : vix.price > 17 ? 'normal' : 'compressed';
  const headline = breadth > 60
    ? 'Broad participation underpins the advance — dip-buyers active across cyclicals and mega-cap tech.'
    : breadth < 40
      ? 'Narrow, defensive tape — strength concentrated while the average stock lags.'
      : 'Mixed, rotational tape — index-level drift with sharp dispersion underneath.';
  return { breadth, leaders, laggards, volRegime, headline };
}
