# TraderOS — Quantum Core Liquidity Heatmap

Professional market microstructure workstation built as specified in **Quantum Core Visual + Functional Implementation Specification**.

This is not a candlestick chart with a heatmap indicator. The heatmap itself is the primary market visualization, showing price, time, resting liquidity, executed trades, order-book changes, volume, delta, imbalance, DOM, and historical liquidity persistence simultaneously.

## Live Preview
Run:
```
python3 -m http.server 3000
```
Then open `http://localhost:3000`

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│ APPLICATION / MARKET HEADER  LSE QUANTUM CORE BTC/USDT BINANCE LIVE│
├─────────────────────────────────────────────────────────────────┤
│ HEATMAP TOOLBAR  LIQUIDITY PRECISION CONTRAST OPACITY TRADES DOM │
├──────┬──────────────────────────────────────────────┬─────────────┤
│ LEFT │                                              │    DOM      │
│ TOOL │           PRIMARY HEATMAP CANVAS             │  / ORDER    │
│ BAR  │                                              │    BOOK     │
├──────┴──────────────────────────────────────────────┴─────────────┤
│ ANALYTICS / ORDER-FLOW PANEL  VOLUME DELTA CVD VWAP PROFILE...    │
├─────────────────────────────────────────────────────────────────┤
│ REPLAY / TIME CONTROL  LIVE ◀ ▶ ⏸ SPEED ──────●─────             │
└─────────────────────────────────────────────────────────────────┘
```

## Implemented Features (Spec Compliance)

### 1. Top Header
- Brand: `LSE` `QUANTUM CORE`
- Instrument selector: BTC/USDT ▼ (BTC/USDT, ETH/USDT, SOL/USDT, AVAX/USDT, BTC/USD)
- Venue selector: BINANCE ▼ (BINANCE, COINBASE, BYBIT, OKX, DERIBIT)
- Connection states: LIVE, CONNECTING, DEGRADED, DISCONNECTED, RECONNECTING — text changes, not only color
- Right: Replay, Layouts, Alerts (badge), Settings
- Perf metrics: CPU, GPU, FPS, DATA STATUS (unobtrusive, simulated)

### 2. Heatmap Toolbar (Second Row)
- `HEATMAP` mode toggle: LIQUIDITY / FULL FLOW
- **Liquidity Control**: `[ − ] LIQUIDITY [ 72 ] [ + ]`
  - Minus: weaker liquidity becomes visible, denser heatmap
  - Plus: suppress weak, emphasize strong, cleaner
  - Immediate update, no Settings dialog
  - Disabled states at 0 and 100
- **Precision Control**: `[ − ] PRECISION [ 4 ] [ + ]`
  - Controls price-level aggregation: 1=finer, 8=aggressive grouping
  - Distinct from liquidity: `LIQUIDITY ≠ PRECISION`
- **Contrast Control**: `[ − ] CONTRAST [ 65 ] [ + ]` — visualization only, no data alteration
- **Opacity Control**: `[ − ] OPACITY [ 80 ] [ + ]` — visual only
- **Reset**: `[ RESET ]` restores instrument visualization profile (liquidity, precision, contrast, opacity, trades, mode, zoom)
- **Auto/Manual**: `[ AUTO ] [ MANUAL ]` — AUTO dynamically adjusts thresholds, never raw data
- Trades dropdown, DOM toggle, Settings gear

### 3. Central Heatmap Canvas
- X = TIME →, Y = PRICE ↑
- Canvas uses dual-layer rendering (heatmap + overlay) with DPR support
- **Liquidity Visualization**:
  - Horizontal traces per price level
  - Stronger = more prominent (cyan → yellow → white gradient)
  - Persistent walls remain visible backward through time
  - Historical events preserved when liquidity disappears
  - Not just current order book — visualizes liquidity through time
- **Current Price**: highly visible horizontal line with label `105,420.50`, moves real-time, readable when dense
- **Trade Visualization**: markers vary by volume, large trades distinguishable
- **Overlays**: optional VWAP, volume profile, drawings
- Price scale right, time scale bottom

### 4. Trade Control
`[ TRADES ▼ ]` → OFF, BUY+SELL, BUY ONLY, SELL ONLY, DELTA, TOTAL VOLUME, LARGE TRADES
Compact menu, not permanent buttons

### 5. Left Toolbar (44px narrow, vertical)
- Cursor, Pan, Zoom, Crosshair, Measure, Horizontal Level, Trend Line, Rectangle, Extend, Liquidity Marker, Screenshot
- Separator
- Heatmap, Trades, Volume, Delta, Indicators (layer toggles)
- Vector SVG icons, no emoji as final set
- Keyboard: C crosshair, M measure, H heatmap, T trades

### 6. Tools
- **Cursor**: select, hover, inspect liquidity
- **Crosshair**: TIME + PRICE guides, tooltip follows pointer without layout shift
- **Measure**: click-drag shows `Δ PRICE`, `Δ TIME`, `CHANGE %`
- **Liquidity Marker**: context menu MARK LIQUIDITY, SET ALERT, TRACK LEVEL, MEASURE PERSISTENCE
- **Drawings**: horizontal level, trend line (two clicks), rectangle (two clicks), persistent storage

### 7. DOM Panel (Right, 220px, dockable, collapsible, resizable)
- Header: DOM, BINANCE, L2 selector
- Columns: ASK SIZE, PRICE, BID SIZE
- Current price row visually distinct (light background, border)
- Footer: SPREAD, IMB (imbalance)
- **DOM Modes**: L1, L2, L3/MBO via `[ L2 ▼ ]`
  - If venue doesn't provide L3: shows `L3 / MBO UNAVAILABLE` with explanation
  - Does NOT fabricate L3 from L2
- **L3 Display**: AGE, SIZE, PRICE, ORDER ID, STATUS (mocked for COINBASE/BYBIT, unavailable for BINANCE)

### 8. Bottom Analytics Panel (Collapsible, Resizable)
Tabs: VOLUME, DELTA, CVD, VWAP, PROFILE, IMBALANCE, OPEN INTEREST, TRADES
Active tab controls visualization (canvas charts)

### 9. Replay Bar
`[ LIVE ] [ ◀ ] [ ▶ ] [ ⏸ ] [ SPEED ▼ ]` + timeline scrubber `08:43:21 —●— 12:42:15`
Functions: Play, Pause, Step Forward/Back, Speed (0.25x-10x), Jump To Time (scrub), Live
Works with recorded depth data (simulated history buffer)

### 10. Context Menus
- Empty space: Cursor, Measure, Add Horizontal Level, Add Trend Line, Add Alert, Heatmap Settings, Trade Settings, Show DOM, Reset View
- Liquidity level: Track Liquidity, Measure Persistence, Set Alert, Inspect Orders, Show Historical Activity, Hide Level
- Trade: Inspect Trade, Show Related Flow, Track Price, Set Alert

### 11. Tooltip System (Hierarchical)
- Primary: PRICE, LIQUIDITY, SIDE
- Secondary: CHANGE, PERSISTENCE
- Advanced: ORDER COUNT, L3 DATA, SOURCE
Compact, follows pointer, doesn't cause layout movement

### 12. Visibility Modes (Overlays)
LIQUIDITY, LIQUIDITY+TRADES, LIQUIDITY+DOM, LIQUIDITY+DELTA, LIQUIDITY+VOLUME, LIQUIDITY+FULL FLOW
Heatmap never disappears when overlay selected

### 13. Docking System
Components movable/dockable: DOM, TAPE, BOTTOM ANALYTICS, ORDER BOOK, TRADE FLOW, ALERTS
- Dock left/right/bottom
- Float (via collapse), Resize (drag boundaries), Collapse, Restore
- Save workspace layouts: Heatmap+DOM, Heatmap Only, Heatmap+DOM+Tape, Full Order Flow
Implemented via resizers and Layouts modal

### 14. Keyboard Shortcuts
- `Ctrl+↑` Increase liquidity threshold
- `Ctrl+↓` Decrease liquidity threshold
- `Alt+↑` Increase precision
- `Alt+↓` Decrease precision
- `+` Zoom in, `-` Zoom out
- `Space` Pause/Resume replay
- `R` Reset view
- `D` Toggle DOM
- `T` Toggle Trades
- `H` Toggle Heatmap
- `C` Crosshair
- `M` Measure
Configurable architecture (STATE object)

### 15. Mouse Controls
- Wheel: price-scale zoom
- Ctrl+Wheel: heatmap intensity (liquidity threshold)
- Visible −/+ buttons remain mandatory (spec requirement)

### 16. Performance
- Dual canvas (heatmap + overlay) with DPR scaling
- Efficient column-based history buffer (800 columns × 240 levels)
- ImageData-ready architecture, batched fillRect with glow for strong levels
- RequestAnimationFrame loop, separate intervals for DOM/analytics
- FPS counter in header

## Visual Identity
- Professional dark-terminal: `#080a0e` bg, `#0e1218` header, `#11151c` toolbar
- No oversized cards, no decorative gradients, no giant buttons, no excessive whitespace
- Monospace JetBrains Mono for values, Inter for UI
- Information density prioritized
- Borders `#1c242f`, text `#8a93a3` / `#c7cfdb` / `#e6e8ec`
- Liquidity gradient: `#0a2a4a` → `#0e4a7a` → `#1a8a9a` → `#d0e05a` → `#ffffff`
- Trades: Buy `#00e676`, Sell `#ff3d57`

## Files
- `index.html` — Full workspace geometry
- `styles.css` — Terminal aesthetics, no SaaS dashboard styling
- `app.js` — Heatmap engine, DOM, analytics, replay, interactions
- `quantum-core-preview.jpg` — Generated concept image

## Data Simulation
Synthetic order-book:
- Persistent liquidity walls with drift and 0.88-0.95 persistence
- Random injection/removal of large orders
- Price random walk with mean reversion to base 105420.5
- Volume, delta, CVD histories
- Trade history with size-based filtering

## Future Extensions
- WebSocket integration to real venues (Binance, Coinbase)
- WebGL heatmap renderer for >10k depth events
- L3/MBO real data parser
- Alert engine
- Screenshot export (canvas.toDataURL)
- Configurable shortcuts storage

## License
TraderOS internal
