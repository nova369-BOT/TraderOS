# TraderOS — Professional Trading Terminal

TraderOS is a desktop-first, multi-workspace trading terminal: market overview, pro charting,
order-flow (DOM / heatmap / footprint / tape), execution ticket + paper broker, portfolio & risk,
live scanner, visual strategy builder, backtest lab with comparison mode, market intelligence,
and a terminal-aware AI desk assistant.

> **Paper trading.** All market data is simulated by an internal tick engine and all orders
> route to a simulated broker. No real capital is at risk. Not financial advice.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle
```

## Workspaces (Alt+1 … Alt+0)

| View | Contents |
|---|---|
| **Markets** | Index strip, session stats, watchlist, active chart, gainers/losers, breadth, sectors, calendar, news |
| **Chart** | Full charting terminal: 11 timeframes, 6 chart types, 9 indicators, RSI/MACD panes, drawing tools (trend, h-line, rect, fib), position & alert price lines |
| **Order Flow** | DOM ladder with click-to-join, liquidity heatmap, footprint (bid×ask, imbalance, POC), time & sales, delta/cum-delta/wall metrics |
| **Trade** | Execution cockpit: account strip, execution chart, DOM, tape, full order ticket with brackets and risk math |
| **Portfolio** | Equity curve, P&L attribution, allocation donut, asset-class exposure, holdings, risk monitor |
| **Scanner** | Live AND-filter builder over the full universe + 6 preset scans, ranked results grid |
| **Strategies** | Visual WHEN/AND/THEN/RISK rule builder, 5 starter templates, compiled-logic preview |
| **Backtest** | Real event-driven engine: costs, sizing, leverage, equity/DD/P&L/monthly analytics, trade list with MAE/MFE, 4-way comparison mode |
| **Intel** | Terminal wire with sentiment/impact filters, desk brief, news sentiment gauge, economic calendar, breadth/sectors/volume leaders |
| **AI** | Desk AI with live context (symbol, chart, portfolio, backtests): analysis, summaries, position reviews, strategy ranking |
| **Settings** | Saved workspace presets, density, engine status, paper-account reset, shortcuts |

## Shell

- **Top bar** — brand, workspace switcher, global search (⌘K), active-symbol strip, LIVE/latency, equity/day-P&L/BP, clock
- **Left nav** — workflow-grouped, collapsible, badge counts, `Alt+1…0` shortcuts
- **Ticker tape** — scrolling multi-asset strip (pauses on hover)
- **Right context panel** — order ticket, symbol deep-dive, price alerts, symbol news; resizable
- **Bottom terminal** — positions, open orders, history, fills, engine log; resizable, OCO bracket editing
- **Status bar** — feed state, tick counter, symbol context, panel toggles
- **Command palette** — `Ctrl/⌘+K`: symbols, views, and actions (market orders, flatten, cancel-all…)

## Architecture

```
src/
  services/     marketEngine (ticks, candles, book, tape, footprint, heatmap)
                tradingService (paper broker: orders, fills, positions, OCO brackets)
                backtestService (rule compiler + event engine + templates)
                newsService (wire, calendar, breadth brief)
                symbols (40-symbol universe, 5 asset classes)
  indicators/   SMA EMA WMA RSI MACD BB ATR VWAP Stoch OBV ADX Donchian HA
  store/        useWorkspaceStore (persisted layout) · useMarketStore (quotes,
                watchlists, alerts) · useTradingStore (broker mirror) · useResearchStore
  components/   shell/ primitives/ (Panel, DataGrid, SplitPane, Menu, Modal, Spark…)
                charts/ market/ orderflow/ trading/ research/
  workspaces/   one module per view, composed from shared primitives
```

**Swapping in a live backend:** UI code only consumes `marketEngine` (quotes/candles/book/tape)
and `broker` (orders/fills/positions). Implement those two interfaces against real
websocket/brokerage APIs and the entire terminal lights up with live data — no UI changes needed.

## Tech

React 18 · TypeScript · Vite 6 · Tailwind CSS v4 · Zustand 5 · lightweight-charts 4 · Lucide icons
