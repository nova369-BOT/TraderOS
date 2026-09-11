export type AssetClass = 'CRYPTO' | 'EQUITY' | 'FUTURES' | 'FX' | 'INDEX';

export interface SymbolDef {
  symbol: string;
  name: string;
  exchange: string;
  asset: AssetClass;
  base: number;      // reference price
  tick: number;      // tick size
  decimals: number;
  tickVol: number;   // per-tick volatility fraction
  drift: number;     // intraday drift bias
  avgVol: number;    // average daily volume (native units)
  currency: string;
  sector?: string;
}

export const SYMBOLS: SymbolDef[] = [
  // ---- CRYPTO (Binance spot-USD) ----
  { symbol: 'BTCUSDT', name: 'Bitcoin', exchange: 'BINANCE', asset: 'CRYPTO', base: 107250, tick: 0.1, decimals: 1, tickVol: 0.00042, drift: 0.000012, avgVol: 38500, currency: 'USDT' },
  { symbol: 'ETHUSDT', name: 'Ethereum', exchange: 'BINANCE', asset: 'CRYPTO', base: 3842.5, tick: 0.01, decimals: 2, tickVol: 0.00055, drift: 0.000014, avgVol: 812000, currency: 'USDT' },
  { symbol: 'SOLUSDT', name: 'Solana', exchange: 'BINANCE', asset: 'CRYPTO', base: 214.36, tick: 0.01, decimals: 2, tickVol: 0.00078, drift: 0.00002, avgVol: 9_400_000, currency: 'USDT' },
  { symbol: 'BNBUSDT', name: 'BNB', exchange: 'BINANCE', asset: 'CRYPTO', base: 692.4, tick: 0.1, decimals: 1, tickVol: 0.0005, drift: 0.000008, avgVol: 1_850_000, currency: 'USDT' },
  { symbol: 'XRPUSDT', name: 'XRP', exchange: 'BINANCE', asset: 'CRYPTO', base: 2.412, tick: 0.0001, decimals: 4, tickVol: 0.00082, drift: 0.00001, avgVol: 68_000_000, currency: 'USDT' },
  { symbol: 'DOGEUSDT', name: 'Dogecoin', exchange: 'BINANCE', asset: 'CRYPTO', base: 0.3218, tick: 0.00001, decimals: 5, tickVol: 0.00095, drift: 0.000004, avgVol: 4_100_000_000, currency: 'USDT' },
  { symbol: 'ADAUSDT', name: 'Cardano', exchange: 'BINANCE', asset: 'CRYPTO', base: 0.9842, tick: 0.0001, decimals: 4, tickVol: 0.00072, drift: -0.000006, avgVol: 88_000_000, currency: 'USDT' },
  { symbol: 'AVAXUSDT', name: 'Avalanche', exchange: 'BINANCE', asset: 'CRYPTO', base: 41.86, tick: 0.01, decimals: 2, tickVol: 0.0008, drift: 0.00001, avgVol: 6_200_000, currency: 'USDT' },
  { symbol: 'LINKUSDT', name: 'Chainlink', exchange: 'BINANCE', asset: 'CRYPTO', base: 22.74, tick: 0.001, decimals: 3, tickVol: 0.00075, drift: 0.000016, avgVol: 11_500_000, currency: 'USDT' },
  { symbol: 'TONUSDT', name: 'Toncoin', exchange: 'BINANCE', asset: 'CRYPTO', base: 5.412, tick: 0.001, decimals: 3, tickVol: 0.0006, drift: -0.000004, avgVol: 7_800_000, currency: 'USDT' },
  // ---- US EQUITIES (NASDAQ/NYSE) ----
  { symbol: 'AAPL', name: 'Apple Inc', exchange: 'NASDAQ', asset: 'EQUITY', base: 232.4, tick: 0.01, decimals: 2, tickVol: 0.00032, drift: 0.000006, avgVol: 54_000_000, currency: 'USD', sector: 'Technology' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', exchange: 'NASDAQ', asset: 'EQUITY', base: 138.25, tick: 0.01, decimals: 2, tickVol: 0.00062, drift: 0.000018, avgVol: 242_000_000, currency: 'USD', sector: 'Semiconductors' },
  { symbol: 'MSFT', name: 'Microsoft Corp', exchange: 'NASDAQ', asset: 'EQUITY', base: 428.15, tick: 0.01, decimals: 2, tickVol: 0.0003, drift: 0.000007, avgVol: 21_000_000, currency: 'USD', sector: 'Technology' },
  { symbol: 'TSLA', name: 'Tesla Inc', exchange: 'NASDAQ', asset: 'EQUITY', base: 248.5, tick: 0.01, decimals: 2, tickVol: 0.00085, drift: 0.00001, avgVol: 98_000_000, currency: 'USD', sector: 'Auto' },
  { symbol: 'AMZN', name: 'Amazon.com Inc', exchange: 'NASDAQ', asset: 'EQUITY', base: 205.74, tick: 0.01, decimals: 2, tickVol: 0.00038, drift: 0.000009, avgVol: 38_000_000, currency: 'USD', sector: 'Technology' },
  { symbol: 'META', name: 'Meta Platforms', exchange: 'NASDAQ', asset: 'EQUITY', base: 585.2, tick: 0.01, decimals: 2, tickVol: 0.00042, drift: 0.000011, avgVol: 12_500_000, currency: 'USD', sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet Inc', exchange: 'NASDAQ', asset: 'EQUITY', base: 178.35, tick: 0.01, decimals: 2, tickVol: 0.00034, drift: 0.000006, avgVol: 26_000_000, currency: 'USD', sector: 'Technology' },
  { symbol: 'AMD', name: 'Adv Micro Devices', exchange: 'NASDAQ', asset: 'EQUITY', base: 122.18, tick: 0.01, decimals: 2, tickVol: 0.00058, drift: 0.000004, avgVol: 45_000_000, currency: 'USD', sector: 'Semiconductors' },
  { symbol: 'NFLX', name: 'Netflix Inc', exchange: 'NASDAQ', asset: 'EQUITY', base: 762.4, tick: 0.01, decimals: 2, tickVol: 0.0004, drift: 0.000008, avgVol: 3_400_000, currency: 'USD', sector: 'Media' },
  { symbol: 'CRM', name: 'Salesforce Inc', exchange: 'NYSE', asset: 'EQUITY', base: 332.6, tick: 0.01, decimals: 2, tickVol: 0.00036, drift: 0.000005, avgVol: 6_800_000, currency: 'USD', sector: 'Software' },
  { symbol: 'COIN', name: 'Coinbase Global', exchange: 'NASDAQ', asset: 'EQUITY', base: 228.9, tick: 0.01, decimals: 2, tickVol: 0.00072, drift: 0.000015, avgVol: 8_900_000, currency: 'USD', sector: 'Fintech' },
  { symbol: 'PLTR', name: 'Palantir Tech', exchange: 'NASDAQ', asset: 'EQUITY', base: 66.42, tick: 0.01, decimals: 2, tickVol: 0.0007, drift: 0.00002, avgVol: 52_000_000, currency: 'USD', sector: 'Software' },
  { symbol: 'JPM', name: 'JPMorgan Chase', exchange: 'NYSE', asset: 'EQUITY', base: 244.8, tick: 0.01, decimals: 2, tickVol: 0.00028, drift: 0.000004, avgVol: 9_500_000, currency: 'USD', sector: 'Banks' },
  { symbol: 'XOM', name: 'Exxon Mobil', exchange: 'NYSE', asset: 'EQUITY', base: 118.32, tick: 0.01, decimals: 2, tickVol: 0.0003, drift: -0.000003, avgVol: 16_000_000, currency: 'USD', sector: 'Energy' },
  // ---- INDEX ETFs ----
  { symbol: 'SPY', name: 'S&P 500 ETF', exchange: 'ARCA', asset: 'INDEX', base: 592.18, tick: 0.01, decimals: 2, tickVol: 0.00018, drift: 0.000005, avgVol: 58_000_000, currency: 'USD', sector: 'Index' },
  { symbol: 'QQQ', name: 'Nasdaq 100 ETF', exchange: 'NASDAQ', asset: 'INDEX', base: 518.44, tick: 0.01, decimals: 2, tickVol: 0.00024, drift: 0.000007, avgVol: 32_000_000, currency: 'USD', sector: 'Index' },
  { symbol: 'DIA', name: 'Dow Jones ETF', exchange: 'ARCA', asset: 'INDEX', base: 442.6, tick: 0.01, decimals: 2, tickVol: 0.00016, drift: 0.000004, avgVol: 3_200_000, currency: 'USD', sector: 'Index' },
  { symbol: 'IWM', name: 'Russell 2000 ETF', exchange: 'ARCA', asset: 'INDEX', base: 238.9, tick: 0.01, decimals: 2, tickVol: 0.00026, drift: 0.000003, avgVol: 24_000_000, currency: 'USD', sector: 'Index' },
  { symbol: 'VIX', name: 'Volatility Index', exchange: 'CBOE', asset: 'INDEX', base: 16.42, tick: 0.01, decimals: 2, tickVol: 0.0011, drift: -0.00001, avgVol: 0, currency: 'USD', sector: 'Volatility' },
  // ---- FUTURES (CME) ----
  { symbol: 'ES', name: 'E-mini S&P 500', exchange: 'CME', asset: 'FUTURES', base: 5912.5, tick: 0.25, decimals: 2, tickVol: 0.00016, drift: 0.000005, avgVol: 1_850_000, currency: 'USD', sector: 'Index' },
  { symbol: 'NQ', name: 'E-mini Nasdaq 100', exchange: 'CME', asset: 'FUTURES', base: 21480.0, tick: 0.25, decimals: 2, tickVol: 0.00022, drift: 0.000007, avgVol: 720_000, currency: 'USD', sector: 'Index' },
  { symbol: 'YM', name: 'E-mini Dow', exchange: 'CBOT', asset: 'FUTURES', base: 44820, tick: 1, decimals: 0, tickVol: 0.00015, drift: 0.000004, avgVol: 148_000, currency: 'USD', sector: 'Index' },
  { symbol: 'RTY', name: 'E-mini Russell 2000', exchange: 'CME', asset: 'FUTURES', base: 2385.4, tick: 0.1, decimals: 1, tickVol: 0.00024, drift: 0.000003, avgVol: 210_000, currency: 'USD', sector: 'Index' },
  { symbol: 'CL', name: 'WTI Crude Oil', exchange: 'NYMEX', asset: 'FUTURES', base: 71.42, tick: 0.01, decimals: 2, tickVol: 0.00045, drift: -0.000004, avgVol: 890_000, currency: 'USD', sector: 'Energy' },
  { symbol: 'GC', name: 'Gold', exchange: 'COMEX', asset: 'FUTURES', base: 2912.6, tick: 0.1, decimals: 1, tickVol: 0.00022, drift: 0.000006, avgVol: 310_000, currency: 'USD', sector: 'Metals' },
  // ---- FX (spot) ----
  { symbol: 'EURUSD', name: 'Euro / US Dollar', exchange: 'FX', asset: 'FX', base: 1.08621, tick: 0.00001, decimals: 5, tickVol: 0.00008, drift: 0.000001, avgVol: 0, currency: 'USD' },
  { symbol: 'GBPUSD', name: 'Pound / US Dollar', exchange: 'FX', asset: 'FX', base: 1.27214, tick: 0.00001, decimals: 5, tickVol: 0.00009, drift: 0.000001, avgVol: 0, currency: 'USD' },
  { symbol: 'USDJPY', name: 'US Dollar / Yen', exchange: 'FX', asset: 'FX', base: 154.823, tick: 0.001, decimals: 3, tickVol: 0.00009, drift: -0.000001, avgVol: 0, currency: 'JPY' },
  { symbol: 'AUDUSD', name: 'Aussie / US Dollar', exchange: 'FX', asset: 'FX', base: 0.65914, tick: 0.00001, decimals: 5, tickVol: 0.0001, drift: 0.000001, avgVol: 0, currency: 'USD' },
  { symbol: 'USDCAD', name: 'US Dollar / CAD', exchange: 'FX', asset: 'FX', base: 1.39821, tick: 0.00001, decimals: 5, tickVol: 0.00009, drift: 0.000001, avgVol: 0, currency: 'CAD' },
  { symbol: 'USDCHF', name: 'US Dollar / Franc', exchange: 'FX', asset: 'FX', base: 0.88712, tick: 0.00001, decimals: 5, tickVol: 0.00008, drift: -0.000001, avgVol: 0, currency: 'CHF' },
];

export const SYMBOL_MAP: Record<string, SymbolDef> = Object.fromEntries(SYMBOLS.map((s) => [s.symbol, s]));

export function getSymbol(sym: string): SymbolDef {
  return SYMBOL_MAP[sym] ?? SYMBOLS[0];
}

export const TIMEFRAMES = ['1s', '5s', '15s', '1m', '5m', '15m', '30m', '1h', '4h', '1D', '1W'] as const;
export type Timeframe = (typeof TIMEFRAMES)[number];

export const TF_SECONDS: Record<Timeframe, number> = {
  '1s': 1, '5s': 5, '15s': 15, '1m': 60, '5m': 300, '15m': 900,
  '30m': 1800, '1h': 3600, '4h': 14400, '1D': 86400, '1W': 604800,
};

export const ASSET_CLASSES: AssetClass[] = ['CRYPTO', 'EQUITY', 'FUTURES', 'FX', 'INDEX'];
