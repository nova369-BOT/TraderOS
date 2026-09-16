// Quantum Core - Professional Market Liquidity Heatmap
// Main application logic

const CONFIG = {
  priceLevels: 240,
  timeColumns: 800,
  priceStep: 0.5,
  basePrice: 105420.5,
  liquidity: 72,
  precision: 4,
  contrast: 65,
  opacity: 80,
  tradesMode: 'both',
  autoMode: false,
  domMode: 'L2',
  analyticsTab: 'volume',
};

let STATE = {
  ...CONFIG,
  currentPrice: CONFIG.basePrice,
  isLive: true,
  isPlaying: true,
  replaySpeed: 1,
  replayProgress: 0.92,
  showDOM: true,
  showTrades: true,
  showHeatmap: true,
  tool: 'cursor',
  layer: { heatmap: true, trades: true, volume: false, delta: false, indicators: false },
  connection: 'LIVE',
  zoom: 1,
  timeOffset: 0,
  measure: null,
  drawings: [],
  hover: null,
};

let DATA = {
  liquidityHistory: [], // array of Float32Array(priceLevels)
  tradeHistory: [], // {t, price, size, side}
  volumeHistory: [], // per time
  deltaHistory: [],
  cvdHistory: [],
  priceHistory: [],
  domBids: [],
  domAsks: [],
  l3Orders: [],
};

// Canvas refs
let heatmapCanvas, overlayCanvas, priceScaleCanvas, timeScaleCanvas, analyticsCanvas;
let hCtx, oCtx, pCtx, tCtx, aCtx;

let animationId = null;
let lastFrameTime = 0;
let fps = 60;
let frameCount = 0;
let lastFpsUpdate = 0;

// Utility
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const lerp = (a,b,t) => a + (b-a)*t;

// DOM helpers
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function init() {
  heatmapCanvas = $('#heatmapCanvas');
  overlayCanvas = $('#overlayCanvas');
  priceScaleCanvas = $('#priceScaleCanvas');
  timeScaleCanvas = $('#timeScaleCanvas');
  analyticsCanvas = $('#analyticsCanvas');

  hCtx = heatmapCanvas.getContext('2d', { alpha: false });
  oCtx = overlayCanvas.getContext('2d');
  pCtx = priceScaleCanvas.getContext('2d');
  tCtx = timeScaleCanvas.getContext('2d');
  aCtx = analyticsCanvas.getContext('2d');

  setupCanvasSizes();
  generateInitialData();
  setupEventListeners();
  setupDropdowns();
  startLoop();
  updateControlUI();
  renderDOM();
  renderAnalytics();
  simulateConnection();
  simulatePerfMetrics();

  window.addEventListener('resize', () => {
    setupCanvasSizes();
  });
}

function setupCanvasSizes() {
  const dpr = window.devicePixelRatio || 1;
  const resize = (canvas, ctx) => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
  };
  // Need to ensure parent has size
  setTimeout(() => {
    [heatmapCanvas, overlayCanvas].forEach(c => {
      const parent = $('#heatmap-container');
      const rect = parent.getBoundingClientRect();
      const priceW = 64;
      const timeH = 20;
      const w = rect.width - priceW;
      const h = rect.height - timeH;
      c.style.width = w + 'px';
      c.style.height = h + 'px';
      const dpr = window.devicePixelRatio||1;
      c.width = w*dpr;
      c.height = h*dpr;
      const ctx = c === heatmapCanvas ? hCtx : oCtx;
      ctx.setTransform(dpr,0,0,dpr,0,0);
    });
    const ps = $('#priceScale');
    const ts = $('#timeScale');
    if (ps && priceScaleCanvas) {
      const rect = ps.getBoundingClientRect();
      priceScaleCanvas.style.width = rect.width+'px';
      priceScaleCanvas.style.height = rect.height+'px';
      priceScaleCanvas.width = rect.width*dpr;
      priceScaleCanvas.height = rect.height*dpr;
      pCtx.setTransform(dpr,0,0,dpr,0,0);
    }
    if (ts && timeScaleCanvas) {
      const rect = ts.getBoundingClientRect();
      timeScaleCanvas.style.width = rect.width+'px';
      timeScaleCanvas.style.height = rect.height+'px';
      timeScaleCanvas.width = rect.width*dpr;
      timeScaleCanvas.height = rect.height*dpr;
      tCtx.setTransform(dpr,0,0,dpr,0,0);
    }
    const acParent = $('.analytics-content');
    if (acParent && analyticsCanvas) {
      const rect = acParent.getBoundingClientRect();
      analyticsCanvas.style.width = rect.width+'px';
      analyticsCanvas.style.height = rect.height+'px';
      analyticsCanvas.width = rect.width*dpr;
      analyticsCanvas.height = rect.height*dpr;
      aCtx.setTransform(dpr,0,0,dpr,0,0);
    }
  }, 50);
}

function generateInitialData() {
  const levels = CONFIG.priceLevels;
  const cols = CONFIG.timeColumns;
  // Persistent liquidity walls
  const walls = [];
  for (let i=0;i<12;i++) {
    walls.push({
      priceOffset: (Math.random()-0.5)*levels*0.8,
      strength: 200 + Math.random()*800,
      persistence: 0.92 + Math.random()*0.07,
      drift: (Math.random()-0.5)*0.05,
      currentStrength: 0,
    });
  }

  let price = CONFIG.basePrice;
  for (let t=0; t<cols; t++) {
    price += (Math.random()-0.5)*2.5;
    // mean reversion slight
    price += (CONFIG.basePrice - price)*0.002;
    STATE.currentPrice = price;
    const col = new Float32Array(levels);
    const centerIdx = levels/2;
    // base noise
    for (let p=0;p<levels;p++) {
      const dist = Math.abs(p - centerIdx);
      const base = Math.max(0, 80 - dist*1.2 + (Math.random()*20));
      col[p] = base * (0.5 + Math.random()*0.5);
    }
    // apply walls
    walls.forEach(w => {
      w.priceOffset += w.drift;
      w.currentStrength = lerp(w.currentStrength, w.strength, 0.08);
      const idx = Math.floor(centerIdx + w.priceOffset);
      if (idx>=0 && idx<levels) {
        // spread wall across 2-3 levels
        for (let k=-1;k<=1;k++) {
          const ii = idx+k;
          if (ii>=0 && ii<levels) {
            col[ii] += w.currentStrength * (k===0?1:0.6) * (0.8+Math.random()*0.4);
          }
        }
      }
      // occasionally disappear/reappear
      if (Math.random()<0.005) {
        w.strength = Math.random()<0.3?0:200+Math.random()*800;
      }
    });
    DATA.liquidityHistory.push(col);
    DATA.priceHistory.push(price);
    // volume
    const vol = 5 + Math.random()*40 + (Math.random()<0.05? Math.random()*150:0);
    DATA.volumeHistory.push(vol);
    const delta = (Math.random()-0.48)*vol;
    DATA.deltaHistory.push(delta);
    // cvd cumulative
    const lastCvd = DATA.cvdHistory.length? DATA.cvdHistory[DATA.cvdHistory.length-1]:0;
    DATA.cvdHistory.push(lastCvd + delta);
    // trades
    if (Math.random()<0.35) {
      const tradePrice = price + (Math.random()-0.5)*4;
      const size = Math.random()<0.08 ? 5+Math.random()*40 : 0.1+Math.random()*3;
      const side = Math.random()>0.5?'buy':'sell';
      DATA.tradeHistory.push({ t, price: tradePrice, size, side, idx: DATA.tradeHistory.length });
    }
  }

  // Generate L3 mock
  generateL3();
}

function generateL3() {
  DATA.l3Orders = [];
  const center = CONFIG.priceLevels/2;
  for (let i=0;i<30;i++) {
    const offset = (Math.random()-0.5)*20;
    const price = STATE.currentPrice + offset*CONFIG.priceStep;
    DATA.l3Orders.push({
      age: (Math.random()*12).toFixed(1)+'s',
      size: (0.2+Math.random()*25).toFixed(1),
      price: price.toFixed(2),
      id: String.fromCharCode(65+Math.floor(Math.random()*26)) + Math.floor(10000+Math.random()*90000),
      status: Math.random()>0.5?'OPEN':'PARTIAL'
    });
  }
}

function generateNewColumn() {
  if (!STATE.isPlaying || !STATE.isLive) return;
  const levels = CONFIG.priceLevels;
  const lastPrice = DATA.priceHistory[DATA.priceHistory.length-1] || CONFIG.basePrice;
  let price = lastPrice + (Math.random()-0.5)*2.2;
  price += (CONFIG.basePrice - price)*0.0015;
  STATE.currentPrice = price;
  DATA.priceHistory.push(price);
  if (DATA.priceHistory.length > CONFIG.timeColumns) DATA.priceHistory.shift();

  const col = new Float32Array(levels);
  const centerIdx = levels/2;
  const prevCol = DATA.liquidityHistory[DATA.liquidityHistory.length-1];
  for (let p=0;p<levels;p++) {
    const prev = prevCol ? prevCol[p] : 0;
    // persistence 0.85-0.95
    const persist = 0.88 + Math.random()*0.08;
    const noise = (Math.random()-0.5)*15;
    col[p] = Math.max(0, prev*persist + noise + Math.random()*10);
    // add distance decay
    const dist = Math.abs(p-centerIdx);
    if (dist>80) col[p] *= 0.7;
  }
  // inject new wall occasionally
  if (Math.random()<0.04) {
    const idx = Math.floor(centerIdx + (Math.random()-0.5)*60);
    if (idx>=0 && idx<levels) {
      col[idx] += 300 + Math.random()*700;
      if (idx>0) col[idx-1] += 150+Math.random()*300;
      if (idx<levels-1) col[idx+1] += 150+Math.random()*300;
    }
  }
  // remove liquidity near current price when trades happen
  if (Math.random()<0.2) {
    const idx = Math.floor(centerIdx + (Math.random()-0.5)*6);
    if (idx>=0 && idx<levels) col[idx] *= 0.3;
  }

  DATA.liquidityHistory.push(col);
  if (DATA.liquidityHistory.length > CONFIG.timeColumns) DATA.liquidityHistory.shift();

  const vol = 5 + Math.random()*35 + (Math.random()<0.06? Math.random()*120:0);
  DATA.volumeHistory.push(vol);
  if (DATA.volumeHistory.length > CONFIG.timeColumns) DATA.volumeHistory.shift();
  const delta = (Math.random()-0.48)*vol;
  DATA.deltaHistory.push(delta);
  if (DATA.deltaHistory.length > CONFIG.timeColumns) DATA.deltaHistory.shift();
  const lastCvd = DATA.cvdHistory[DATA.cvdHistory.length-1]||0;
  DATA.cvdHistory.push(lastCvd+delta);
  if (DATA.cvdHistory.length > CONFIG.timeColumns) DATA.cvdHistory.shift();

  if (Math.random()<0.4) {
    const tradePrice = price + (Math.random()-0.5)*3;
    const size = Math.random()<0.1 ? 5+Math.random()*35 : 0.1+Math.random()*2.5;
    const side = Math.random()>0.5?'buy':'sell';
    DATA.tradeHistory.push({ t: DATA.liquidityHistory.length-1, price: tradePrice, size, side });
    if (DATA.tradeHistory.length > 500) DATA.tradeHistory.shift();
  }

  // Update DOM occasionally
  if (Math.random()<0.3) generateL3();
}

function startLoop() {
  let lastGen = performance.now();
  const loop = (now) => {
    animationId = requestAnimationFrame(loop);
    // FPS calc
    frameCount++;
    if (now - lastFpsUpdate > 1000) {
      fps = Math.round(frameCount * 1000 / (now - lastFpsUpdate));
      frameCount = 0;
      lastFpsUpdate = now;
      $('#fpsMetric').textContent = `FPS ${fps}`;
    }

    if (now - lastGen > 80 / STATE.replaySpeed) {
      generateNewColumn();
      lastGen = now;
      if (STATE.autoMode) autoAdjust();
    }

    renderHeatmap();
    renderPriceScale();
    renderTimeScale();
    renderOverlay();
    if (now % 3 === 0) { /* occasional */ }
  };
  loop(performance.now());

  // Separate interval for DOM and analytics to reduce load
  setInterval(() => {
    if (STATE.showDOM) renderDOM();
    renderAnalytics();
    updateCurrentPriceLabel();
  }, 150);
}

function autoAdjust() {
  // Dynamically adjust thresholds based on market conditions
  const avgLiq = DATA.liquidityHistory.length ? 
    DATA.liquidityHistory[DATA.liquidityHistory.length-1].reduce((a,b)=>a+b,0)/CONFIG.priceLevels : 50;
  const targetLiq = clamp(30 + (avgLiq/10), 20, 85);
  STATE.liquidity = lerp(STATE.liquidity, targetLiq, 0.05);
  $('#liquidityValue').textContent = Math.round(STATE.liquidity);
  updateControlButtons();
}

function renderHeatmap() {
  const canvas = heatmapCanvas;
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  if (w===0||h===0) return;

  hCtx.fillStyle = '#070a0f';
  hCtx.fillRect(0,0,w,h);

  if (!STATE.showHeatmap) return;

  const cols = DATA.liquidityHistory.length;
  const levels = CONFIG.priceLevels;
  const precision = STATE.precision;
  const displayLevels = Math.floor(levels / precision);
  const colWidth = w / cols;
  const rowHeight = h / displayLevels;

  // Find max liquidity for normalization
  let maxLiq = 1;
  for (let t=Math.max(0, cols- Math.floor(w/1)); t<cols; t++) {
    const col = DATA.liquidityHistory[t];
    if (!col) continue;
    for (let p=0;p<levels;p++) {
      if (col[p] > maxLiq) maxLiq = col[p];
    }
  }
  maxLiq = Math.max(maxLiq, 50);

  const threshold = (STATE.liquidity / 100) * maxLiq * 0.6; // higher threshold = fewer visible
  const contrastExp = 0.6 + (STATE.contrast/100)*2.2; // 0.6 - 2.8
  const opacity = STATE.opacity/100;

  // Render using ImageData for speed? We'll use fillRect with color mapping for clarity and allow per-cell
  // For performance, we can batch but fillRect 800*60=48k rects is okay
  for (let t=0; t<cols; t++) {
    const col = DATA.liquidityHistory[t];
    if (!col) continue;
    const x = t * colWidth;
    // aggregate by precision
    for (let dl=0; dl<displayLevels; dl++) {
      let agg = 0;
      for (let k=0;k<precision;k++) {
        const origIdx = dl*precision + k;
        if (origIdx < levels) agg += col[origIdx];
      }
      agg /= precision;
      if (agg < threshold) continue;
      const norm = clamp((agg - threshold) / (maxLiq - threshold), 0, 1);
      const intensity = Math.pow(norm, contrastExp);
      if (intensity < 0.02) continue;

      const y = h - (dl+1)*rowHeight; // price ↑ so invert
      // color gradient: dark blue -> cyan -> yellow -> white
      let r,g,b;
      if (intensity < 0.25) {
        // #0a2a4a -> #0e4a7a
        const tt = intensity/0.25;
        r = lerp(10, 14, tt);
        g = lerp(42, 74, tt);
        b = lerp(74, 122, tt);
      } else if (intensity < 0.5) {
        const tt = (intensity-0.25)/0.25;
        r = lerp(14, 26, tt);
        g = lerp(74, 138, tt);
        b = lerp(122, 154, tt);
      } else if (intensity < 0.75) {
        const tt = (intensity-0.5)/0.25;
        r = lerp(26, 208, tt);
        g = lerp(138, 224, tt);
        b = lerp(154, 90, tt);
      } else {
        const tt = (intensity-0.75)/0.25;
        r = lerp(208, 255, tt);
        g = lerp(224, 255, tt);
        b = lerp(90, 255, tt);
      }
      const alpha = intensity * opacity * 0.95 + 0.05;
      hCtx.fillStyle = `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${alpha})`;
      // add slight glow for strong levels
      if (intensity > 0.7) {
        hCtx.shadowColor = `rgba(${r},${g},${b},${alpha*0.6})`;
        hCtx.shadowBlur = 4;
      } else {
        hCtx.shadowBlur = 0;
      }
      hCtx.fillRect(x, y, Math.ceil(colWidth+0.5), Math.ceil(rowHeight+0.5));
    }
  }
  hCtx.shadowBlur = 0;

  // Draw VWAP if enabled
  if (STATE.layer.indicators) {
    hCtx.strokeStyle = 'rgba(230,194,41,0.7)';
    hCtx.lineWidth = 1;
    hCtx.setLineDash([4,4]);
    hCtx.beginPath();
    let first = true;
    for (let t=0; t<cols; t++) {
      const price = DATA.priceHistory[t];
      if (price===undefined) continue;
      const y = priceToY(price, h);
      const x = t*colWidth;
      if (first) { hCtx.moveTo(x,y); first=false; }
      else hCtx.lineTo(x,y);
    }
    hCtx.stroke();
    hCtx.setLineDash([]);
  }

  // Current price line
  const cpY = priceToY(STATE.currentPrice, h);
  hCtx.strokeStyle = 'rgba(230,232,236,0.9)';
  hCtx.lineWidth = 1;
  hCtx.setLineDash([6,3]);
  hCtx.beginPath();
  hCtx.moveTo(0, cpY);
  hCtx.lineTo(w, cpY);
  hCtx.stroke();
  hCtx.setLineDash([]);

  // Draw drawings
  STATE.drawings.forEach(d => {
    if (d.type==='hlevel') {
      const y = priceToY(d.price, h);
      hCtx.strokeStyle = d.color || '#00e5cc';
      hCtx.lineWidth = 1;
      hCtx.setLineDash([3,3]);
      hCtx.beginPath();
      hCtx.moveTo(0,y);
      hCtx.lineTo(w,y);
      hCtx.stroke();
      hCtx.setLineDash([]);
    } else if (d.type==='trend') {
      const x1 = (d.t1/cols)*w;
      const y1 = priceToY(d.p1, h);
      const x2 = (d.t2/cols)*w;
      const y2 = priceToY(d.p2, h);
      hCtx.strokeStyle = d.color || '#e6c229';
      hCtx.lineWidth = 1;
      hCtx.beginPath();
      hCtx.moveTo(x1,y1);
      hCtx.lineTo(x2,y2);
      hCtx.stroke();
    } else if (d.type==='rect') {
      const x = Math.min(d.t1,d.t2)/cols*w;
      const y = priceToY(Math.max(d.p1,d.p2), h);
      const ww = Math.abs(d.t2-d.t1)/cols*w;
      const hh = Math.abs(priceToY(d.p1,h)-priceToY(d.p2,h));
      hCtx.strokeStyle = d.color || '#00e5cc';
      hCtx.lineWidth = 1;
      hCtx.strokeRect(x,y,ww,hh);
      hCtx.fillStyle = 'rgba(0,229,204,0.08)';
      hCtx.fillRect(x,y,ww,hh);
    }
  });
}

function priceToY(price, canvasHeight) {
  const levels = CONFIG.priceLevels;
  const range = levels * CONFIG.priceStep; // total price range
  const centerPrice = STATE.currentPrice;
  const minPrice = centerPrice - range/2;
  const maxPrice = centerPrice + range/2;
  const norm = (price - minPrice) / (maxPrice - minPrice);
  // invert because Y top = high price
  return canvasHeight * (1 - norm);
}

function yToPrice(y, canvasHeight) {
  const levels = CONFIG.priceLevels;
  const range = levels * CONFIG.priceStep;
  const centerPrice = STATE.currentPrice;
  const minPrice = centerPrice - range/2;
  const maxPrice = centerPrice + range/2;
  const norm = 1 - (y / canvasHeight);
  return minPrice + norm * (maxPrice - minPrice);
}

function renderPriceScale() {
  if (!priceScaleCanvas) return;
  const rect = priceScaleCanvas.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  if (w===0||h===0) return;
  pCtx.clearRect(0,0,w,h);
  pCtx.fillStyle = '#0e1218';
  pCtx.fillRect(0,0,w,h);
  pCtx.strokeStyle = '#1c242f';
  pCtx.beginPath();
  pCtx.moveTo(0,0);
  pCtx.lineTo(0,h);
  pCtx.stroke();

  const levels = CONFIG.priceLevels;
  const range = levels * CONFIG.priceStep;
  const minPrice = STATE.currentPrice - range/2;
  const maxPrice = STATE.currentPrice + range/2;

  // draw ticks
  const tickCount = Math.floor(h / 28);
  for (let i=0;i<=tickCount;i++) {
    const y = (i/tickCount)*h;
    const price = maxPrice - (i/tickCount)*range;
    // grid line
    if (i%2===0) {
      pCtx.strokeStyle = 'rgba(28,36,47,0.6)';
      pCtx.beginPath();
      pCtx.moveTo(0,y);
      pCtx.lineTo(w,y);
      pCtx.stroke();
    }
    pCtx.fillStyle = '#8a93a3';
    pCtx.font = '10px JetBrains Mono';
    pCtx.textAlign = 'right';
    pCtx.fillText(price.toFixed(1), w-6, y+3);
  }

  // current price highlight
  const cpY = priceToY(STATE.currentPrice, h);
  pCtx.fillStyle = '#e6e8ec';
  pCtx.fillRect(0, cpY-10, w, 20);
  pCtx.fillStyle = '#080a0e';
  pCtx.font = 'bold 10px JetBrains Mono';
  pCtx.textAlign = 'center';
  pCtx.fillText(STATE.currentPrice.toFixed(1), w/2, cpY+3);
}

function renderTimeScale() {
  if (!timeScaleCanvas) return;
  const rect = timeScaleCanvas.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  if (w===0||h===0) return;
  tCtx.clearRect(0,0,w,h);
  tCtx.fillStyle = '#0e1218';
  tCtx.fillRect(0,0,w,h);

  const cols = DATA.liquidityHistory.length;
  const now = new Date();
  const tickCount = Math.floor(w/90);
  for (let i=0;i<=tickCount;i++) {
    const x = (i/tickCount)*w;
    const date = new Date(now - (1 - i/tickCount)* 4*60*60*1000);
    const label = date.toTimeString().slice(0,8);
    tCtx.fillStyle = '#8a93a3';
    tCtx.font = '9px JetBrains Mono';
    tCtx.textAlign = 'center';
    tCtx.fillText(label, x, 13);
    tCtx.strokeStyle = 'rgba(28,36,47,0.8)';
    tCtx.beginPath();
    tCtx.moveTo(x,0);
    tCtx.lineTo(x,4);
    tCtx.stroke();
  }
}

function renderOverlay() {
  if (!overlayCanvas) return;
  const rect = overlayCanvas.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  if (w===0||h===0) return;
  oCtx.clearRect(0,0,w,h);

  if (!STATE.showTrades) return;
  const cols = DATA.liquidityHistory.length;
  const mode = STATE.tradesMode;
  if (mode==='off') return;

  const colWidth = w/cols;
  // filter trades
  let trades = DATA.tradeHistory;
  if (mode==='buy') trades = trades.filter(t=>t.side==='buy');
  else if (mode==='sell') trades = trades.filter(t=>t.side==='sell');
  else if (mode==='large') trades = trades.filter(t=>t.size>3);

  trades.forEach(tr => {
    // t is time index in history (might be out of range due to shift)
    const tIdx = tr.t;
    // map tIdx to x: if history shifted, approximate
    // For simplicity, use last N trades positions based on order
    const age = DATA.tradeHistory.length - trades.indexOf(tr);
    // x position: recent on right
    const x = w - (age * colWidth * 2.5) % w;
    const y = priceToY(tr.price, h);
    if (y<0||y>h) return;
    const size = Math.max(2, Math.min(12, Math.sqrt(tr.size)*2.5));
    if (mode==='delta') {
      // color by delta
      oCtx.fillStyle = tr.side==='buy' ? 'rgba(0,230,118,0.9)' : 'rgba(255,61,87,0.9)';
    } else if (mode==='total') {
      oCtx.fillStyle = 'rgba(230,194,41,0.9)';
    } else {
      oCtx.fillStyle = tr.side==='buy' ? 'rgba(0,230,118,0.85)' : 'rgba(255,61,87,0.85)';
    }
    oCtx.beginPath();
    if (mode==='delta' || mode==='total') {
      // square
      oCtx.fillRect(x-size/2, y-size/2, size, size);
    } else {
      oCtx.arc(x, y, size/2, 0, Math.PI*2);
      oCtx.fill();
    }
    // outline for large
    if (tr.size>5) {
      oCtx.strokeStyle = 'rgba(255,255,255,0.9)';
      oCtx.lineWidth = 1;
      oCtx.stroke();
    }
  });
}

function renderDOM() {
  const table = $('#domTable');
  if (!table) return;
  const levels = 20;
  const price = STATE.currentPrice;
  const step = CONFIG.priceStep;
  const spread = step * (0.5 + Math.random()*1.5);
  $('#domSpread').textContent = spread.toFixed(1);
  const imb = (Math.random()-0.5)*40;
  const imbEl = $('#domImb');
  imbEl.textContent = (imb>0?'+':'')+imb.toFixed(0)+'%';
  imbEl.style.color = imb>0 ? 'var(--bid)' : 'var(--ask)';

  let html = '';
  for (let i=levels/2; i>=-levels/2; i--) {
    const p = price + i*step;
    const isCurrent = Math.abs(i) < 0.6;
    if (isCurrent) {
      html += `<div class="dom-row current"><span class="ask"></span><span class="price">${p.toFixed(1)}</span><span class="bid"></span></div>`;
      html += `<div class="dom-row" style="height:1px;background:var(--text-white);opacity:0.5;padding:0"></div>`;
      continue;
    }
    const isAsk = i>0;
    const size = isAsk ? (Math.random()*30+ (Math.abs(i)<3?Math.random()*50:0)).toFixed(1) : (Math.random()*30 + (Math.abs(i)<3?Math.random()*50:0)).toFixed(1);
    const barWidth = Math.min(100, parseFloat(size)*2);
    if (isAsk) {
      html += `<div class="dom-row"><span class="ask">${size}<div class="ask-bar" style="width:${barWidth}%;background:var(--ask);opacity:0.6"></div></span><span class="price">${p.toFixed(1)}</span><span class="bid"></span></div>`;
    } else {
      html += `<div class="dom-row"><span class="ask"></span><span class="price">${p.toFixed(1)}</span><span class="bid">${size}<div class="bid-bar" style="width:${barWidth}%;background:var(--bid);opacity:0.6;margin-left:auto"></div></span></div>`;
    }
  }
  table.innerHTML = html;

  // L3 table
  const l3Table = $('#domL3Table');
  if (l3Table) {
    let l3Html = '';
    DATA.l3Orders.slice(0,18).forEach(o => {
      l3Html += `<div class="dom-l3-row"><span>${o.age}</span><span>${o.size}</span><span>${o.price}</span><span style="color:var(--text-bright)">${o.id}</span></div>`;
    });
    l3Table.innerHTML = l3Html;
  }
}

function renderAnalytics() {
  if (!analyticsCanvas) return;
  const rect = analyticsCanvas.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  if (w===0||h===0) return;
  aCtx.clearRect(0,0,w,h);
  aCtx.fillStyle = '#0f141c';
  aCtx.fillRect(0,0,w,h);

  const tab = STATE.analyticsTab;
  const cols = DATA.volumeHistory.length;
  if (cols===0) return;
  const colW = w/cols;

  if (tab==='volume') {
    const maxVol = Math.max(...DATA.volumeHistory, 10);
    DATA.volumeHistory.forEach((vol, i) => {
      const x = i*colW;
      const hh = (vol/maxVol)* (h*0.8);
      aCtx.fillStyle = vol>50 ? 'rgba(230,194,41,0.8)' : 'rgba(0,229,204,0.5)';
      aCtx.fillRect(x, h-hh-10, Math.max(1,colW-1), hh);
    });
  } else if (tab==='delta') {
    const maxD = Math.max(...DATA.deltaHistory.map(Math.abs), 10);
    const mid = h/2;
    DATA.deltaHistory.forEach((d,i) => {
      const x = i*colW;
      const hh = (d/maxD)*(h*0.4);
      aCtx.fillStyle = d>0 ? 'rgba(0,230,118,0.7)' : 'rgba(255,61,87,0.7)';
      if (d>0) aCtx.fillRect(x, mid-hh, Math.max(1,colW-1), hh);
      else aCtx.fillRect(x, mid, Math.max(1,colW-1), -hh);
    });
    aCtx.strokeStyle = 'rgba(138,147,163,0.3)';
    aCtx.beginPath();
    aCtx.moveTo(0,mid);
    aCtx.lineTo(w,mid);
    aCtx.stroke();
  } else if (tab==='cvd') {
    const min = Math.min(...DATA.cvdHistory);
    const max = Math.max(...DATA.cvdHistory);
    const range = max-min || 1;
    aCtx.strokeStyle = '#00e5cc';
    aCtx.lineWidth = 1.2;
    aCtx.beginPath();
    DATA.cvdHistory.forEach((v,i) => {
      const x = i*colW;
      const y = h - ((v-min)/range)*h*0.8 -10;
      if (i===0) aCtx.moveTo(x,y);
      else aCtx.lineTo(x,y);
    });
    aCtx.stroke();
  } else if (tab==='vwap') {
    // simple price + vwap
    const prices = DATA.priceHistory;
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max-min || 1;
    aCtx.strokeStyle = 'rgba(138,147,163,0.5)';
    aCtx.lineWidth = 1;
    aCtx.beginPath();
    prices.forEach((p,i)=>{
      const x=i*colW;
      const y=h - ((p-min)/range)*h*0.8 -10;
      if (i===0) aCtx.moveTo(x,y);
      else aCtx.lineTo(x,y);
    });
    aCtx.stroke();
    // vwap as moving avg
    aCtx.strokeStyle = '#e6c229';
    aCtx.setLineDash([3,3]);
    aCtx.beginPath();
    let sum=0;
    prices.forEach((p,i)=>{
      sum+=p;
      const avg=sum/(i+1);
      const x=i*colW;
      const y=h - ((avg-min)/range)*h*0.8 -10;
      if (i===0) aCtx.moveTo(x,y);
      else aCtx.lineTo(x,y);
    });
    aCtx.stroke();
    aCtx.setLineDash([]);
  } else if (tab==='profile') {
    // volume profile horizontal
    const bins = 40;
    const profile = new Array(bins).fill(0);
    DATA.tradeHistory.forEach(t=>{
      const idx = Math.floor(((t.price - (STATE.currentPrice-30))/60)*bins);
      if (idx>=0&&idx<bins) profile[idx]+=t.size;
    });
    const max = Math.max(...profile,1);
    profile.forEach((v,i)=>{
      const y = (i/bins)*h;
      const ww = (v/max)*w*0.6;
      aCtx.fillStyle = 'rgba(0,229,204,0.6)';
      aCtx.fillRect(0, y, ww, h/bins-1);
    });
  } else if (tab==='imbalance') {
    const max = Math.max(...DATA.volumeHistory,10);
    DATA.volumeHistory.forEach((vol,i)=>{
      const delta = DATA.deltaHistory[i]||0;
      const imb = delta/vol;
      const x=i*colW;
      const hh = Math.abs(imb)*h*0.8;
      aCtx.fillStyle = imb>0 ? 'rgba(0,230,118,0.6)' : 'rgba(255,61,87,0.6)';
      aCtx.fillRect(x, h-hh-10, Math.max(1,colW-1), hh);
    });
  } else if (tab==='oi') {
    // fake OI
    let oi = 1000;
    aCtx.strokeStyle = '#8a93a3';
    aCtx.beginPath();
    for (let i=0;i<cols;i++) {
      oi += (Math.random()-0.5)*10;
      const x=i*colW;
      const y=h - (oi%200)/200*h*0.8 -10;
      if (i===0) aCtx.moveTo(x,y);
      else aCtx.lineTo(x,y);
    }
    aCtx.stroke();
  } else if (tab==='trades') {
    DATA.tradeHistory.forEach((tr,i)=>{
      const x = (i/DATA.tradeHistory.length)*w;
      const y = h - (tr.size/40)*h*0.8 -10;
      aCtx.fillStyle = tr.side==='buy'?'rgba(0,230,118,0.8)':'rgba(255,61,87,0.8)';
      aCtx.beginPath();
      aCtx.arc(x,y, Math.max(1, Math.sqrt(tr.size)),0,Math.PI*2);
      aCtx.fill();
    });
  }

  // grid
  aCtx.strokeStyle = 'rgba(28,36,47,0.4)';
  aCtx.lineWidth = 1;
  for (let i=1;i<4;i++) {
    const y=(i/4)*h;
    aCtx.beginPath();
    aCtx.moveTo(0,y);
    aCtx.lineTo(w,y);
    aCtx.stroke();
  }
}

function updateCurrentPriceLabel() {
  const el = $('#currentPriceValue');
  if (el) el.textContent = STATE.currentPrice.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
  const label = $('#currentPriceLabel');
  if (label && heatmapCanvas) {
    const rect = heatmapCanvas.getBoundingClientRect();
    const y = priceToY(STATE.currentPrice, rect.height);
    label.style.top = y + 'px';
  }
}

function setupEventListeners() {
  // Control buttons
  $$('.ctrl-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = btn.dataset.action;
      handleControl(action);
    });
  });

  $('#resetBtn').addEventListener('click', () => {
    STATE.liquidity = CONFIG.liquidity;
    STATE.precision = CONFIG.precision;
    STATE.contrast = CONFIG.contrast;
    STATE.opacity = CONFIG.opacity;
    STATE.tradesMode = 'both';
    STATE.zoom = 1;
    updateControlUI();
  });

  // Auto/manual
  $$('.am-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.am-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      STATE.autoMode = btn.dataset.am === 'auto';
    });
  });

  // Mode toggle
  $$('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.mode-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.dataset.mode;
      if (mode==='liquidity') {
        STATE.showHeatmap = true;
      } else if (mode==='flow') {
        STATE.showHeatmap = true;
        STATE.layer.volume = true;
        STATE.layer.delta = true;
      }
    });
  });

  // Left toolbar tools
  $$('.lt-btn[data-tool]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.lt-btn[data-tool]').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      STATE.tool = btn.dataset.tool;
      updateCursor();
    });
  });

  // Layer toggles
  $$('.lt-btn[data-layer]').forEach(btn => {
    btn.addEventListener('click', () => {
      const layer = btn.dataset.layer;
      STATE.layer[layer] = !STATE.layer[layer];
      btn.classList.toggle('active', STATE.layer[layer]);
      btn.classList.toggle('active-layer', STATE.layer[layer]);
      if (layer==='trades') STATE.showTrades = STATE.layer[layer];
      if (layer==='heatmap') STATE.showHeatmap = STATE.layer[layer];
    });
  });

  // DOM toggle
  $('#domToggleBtn').addEventListener('click', () => {
    STATE.showDOM = !STATE.showDOM;
    $('#dom-panel').classList.toggle('collapsed', !STATE.showDOM);
    $('#domToggleBtn').classList.toggle('active', STATE.showDOM);
    setTimeout(setupCanvasSizes, 100);
  });
  $('#domCollapseBtn').addEventListener('click', () => {
    STATE.showDOM = false;
    $('#dom-panel').classList.add('collapsed');
    setTimeout(setupCanvasSizes, 100);
  });
  $('#domCloseBtn').addEventListener('click', () => {
    STATE.showDOM = false;
    $('#dom-panel').classList.add('collapsed');
    setTimeout(setupCanvasSizes, 100);
  });

  // Analytics tabs
  $$('.a-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.a-tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      STATE.analyticsTab = btn.dataset.tab;
      renderAnalytics();
    });
  });
  $('#analyticsCollapseBtn').addEventListener('click', () => {
    $('#analytics-panel').classList.toggle('collapsed');
    setTimeout(setupCanvasSizes, 100);
  });

  // Replay controls
  $('#replayLiveBtn').addEventListener('click', () => {
    STATE.isLive = true;
    STATE.isPlaying = true;
    $('#replayLiveBtn').classList.add('active');
    $('#replayPlayBtn').classList.remove('active');
  });
  $('#replayPlayBtn').addEventListener('click', () => {
    STATE.isPlaying = true;
    STATE.isLive = false;
    $('#replayLiveBtn').classList.remove('active');
    $('#replayPlayBtn').classList.add('active');
  });
  $('#replayPauseBtn').addEventListener('click', () => {
    STATE.isPlaying = false;
    $('#replayPlayBtn').classList.remove('active');
  });
  $('#replayBackBtn').addEventListener('click', () => {
    // step back: remove last column and prepend old?
    // simplified: just move timeline
    STATE.replayProgress = clamp(STATE.replayProgress - 0.05, 0, 1);
    updateTimeline();
  });
  $('#replayFwdBtn').addEventListener('click', () => {
    STATE.replayProgress = clamp(STATE.replayProgress + 0.05, 0, 1);
    updateTimeline();
    generateNewColumn();
  });

  // Timeline scrub
  const track = $('#timelineTrack');
  let isDraggingTimeline = false;
  track.addEventListener('mousedown', (e) => {
    isDraggingTimeline = true;
    updateTimelineFromEvent(e);
  });
  window.addEventListener('mousemove', (e) => {
    if (isDraggingTimeline) updateTimelineFromEvent(e);
  });
  window.addEventListener('mouseup', () => { isDraggingTimeline = false; });

  // Heatmap mouse interactions
  const container = $('#heatmap-container');
  let isMeasuring = false;
  let measureStart = null;

  container.addEventListener('mousemove', (e) => {
    const rect = heatmapCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const price = yToPrice(y, rect.height);
    const timeIdx = Math.floor((x / rect.width) * DATA.liquidityHistory.length);

    STATE.hover = { x, y, price, timeIdx, clientX: e.clientX, clientY: e.clientY };

    // crosshair
    if (STATE.tool==='crosshair' || STATE.tool==='cursor') {
      $('#crosshair-h').style.display = 'block';
      $('#crosshair-v').style.display = 'block';
      $('#crosshair-h').style.top = (y) + 'px';
      $('#crosshair-v').style.left = (x) + 'px';
      // tooltip
      const tt = $('#tooltip');
      tt.classList.remove('hidden');
      tt.style.left = (e.clientX + 12) + 'px';
      tt.style.top = (e.clientY + 12) + 'px';
      $('#ttPrice').textContent = price.toLocaleString('en-US', {minimumFractionDigits:2});
      // liquidity at hover
      const col = DATA.liquidityHistory[timeIdx];
      if (col) {
        const levelIdx = Math.floor((1 - y/rect.height) * CONFIG.priceLevels);
        const liq = col[clamp(levelIdx,0,CONFIG.priceLevels-1)] || 0;
        $('#ttLiq').textContent = liq.toFixed(1) + ' BTC';
        $('#ttSide').textContent = levelIdx > CONFIG.priceLevels/2 ? 'ASK' : 'BID';
        $('#ttChange').textContent = (Math.random()*400-200).toFixed(1)+' BTC';
        $('#ttPersist').textContent = (Math.random()*30).toFixed(1)+' sec';
      }
    }

    if (isMeasuring && measureStart) {
      const p2 = price;
      const t2 = timeIdx;
      const dPrice = p2 - measureStart.price;
      const dTime = (t2 - measureStart.tIdx)*0.08; // seconds approx
      $('#mPrice').textContent = (dPrice>0?'+':'')+dPrice.toFixed(2);
      $('#mTime').textContent = new Date(dTime*1000).toISOString().substr(11,8);
      const change = (dPrice / measureStart.price * 100);
      $('#mChange').textContent = (change>0?'+':'')+change.toFixed(2)+'%';
      // draw measure line on overlay
      renderMeasureLine(measureStart, {x,y,price});
    }
  });

  container.addEventListener('mouseleave', () => {
    $('#crosshair-h').style.display = 'none';
    $('#crosshair-v').style.display = 'none';
    $('#tooltip').classList.add('hidden');
    STATE.hover = null;
  });

  container.addEventListener('mousedown', (e) => {
    if (STATE.tool==='measure') {
      isMeasuring = true;
      const rect = heatmapCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const price = yToPrice(y, rect.height);
      const timeIdx = Math.floor((x / rect.width) * DATA.liquidityHistory.length);
      measureStart = { x, y, price, tIdx: timeIdx };
      $('#measureOverlay').classList.remove('hidden');
      $('#measureOverlay').style.left = x+'px';
      $('#measureOverlay').style.top = y+'px';
    } else if (STATE.tool==='hlevel') {
      const rect = heatmapCanvas.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const price = yToPrice(y, rect.height);
      STATE.drawings.push({ type:'hlevel', price, color:'#00e5cc' });
    } else if (STATE.tool==='trend') {
      const rect = heatmapCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const price = yToPrice(y, rect.height);
      const tIdx = Math.floor((x / rect.width) * DATA.liquidityHistory.length);
      if (!STATE._trendStart) {
        STATE._trendStart = { t1: tIdx, p1: price };
      } else {
        STATE.drawings.push({ type:'trend', t1: STATE._trendStart.t1, p1: STATE._trendStart.p1, t2: tIdx, p2: price, color:'#e6c229' });
        STATE._trendStart = null;
      }
    } else if (STATE.tool==='rect') {
      const rect = heatmapCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const price = yToPrice(y, rect.height);
      const tIdx = Math.floor((x / rect.width) * DATA.liquidityHistory.length);
      if (!STATE._rectStart) {
        STATE._rectStart = { t1: tIdx, p1: price };
      } else {
        STATE.drawings.push({ type:'rect', t1: STATE._rectStart.t1, p1: STATE._rectStart.p1, t2: tIdx, p2: price, color:'#00e5cc' });
        STATE._rectStart = null;
      }
    }
  });

  window.addEventListener('mouseup', () => {
    if (isMeasuring) {
      isMeasuring = false;
      // keep overlay for a moment then hide? keep visible
    }
  });

  // Wheel zoom
  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.ctrlKey) {
      // modify liquidity
      if (e.deltaY < 0) handleControl('liquidity-plus');
      else handleControl('liquidity-minus');
    } else {
      // zoom price scale
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      STATE.zoom = clamp(STATE.zoom * delta, 0.5, 5);
      // adjust priceStep? For simplicity adjust levels visible via CSS? We'll just change CONFIG.priceStep slightly
      CONFIG.priceStep = clamp(CONFIG.priceStep / delta, 0.1, 5);
    }
  }, { passive: false });

  // Context menu
  container.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const menu = $('#contextMenu');
    menu.classList.remove('hidden');
    menu.style.left = e.clientX+'px';
    menu.style.top = e.clientY+'px';

    const hover = STATE.hover;
    let html = '';
    if (!hover) {
      html = `
        <div class="ctx-title">HEATMAP</div>
        <div class="ctx-item" data-action="cursor">Cursor</div>
        <div class="ctx-item" data-action="measure">Measure</div>
        <div class="ctx-item" data-action="hlevel">Add Horizontal Level</div>
        <div class="ctx-item" data-action="trend">Add Trend Line</div>
        <div class="ctx-item" data-action="alert">Add Alert</div>
        <div class="ctx-sep"></div>
        <div class="ctx-item" data-action="heatmapSettings">Heatmap Settings</div>
        <div class="ctx-item" data-action="tradeSettings">Trade Settings</div>
        <div class="ctx-item" data-action="showDOM">Show DOM</div>
        <div class="ctx-item" data-action="reset">Reset View</div>
      `;
    } else {
      // check if near trade or liquidity
      const isTrade = Math.random()>0.5; // simplified detection
      if (isTrade) {
        html = `
          <div class="ctx-title">TRADE</div>
          <div class="ctx-item" data-action="inspectTrade">Inspect Trade</div>
          <div class="ctx-item" data-action="showFlow">Show Related Flow</div>
          <div class="ctx-item" data-action="trackPrice">Track Price</div>
          <div class="ctx-item" data-action="setAlert">Set Alert</div>
        `;
      } else {
        html = `
          <div class="ctx-title">LIQUIDITY ${hover.price.toFixed(1)}</div>
          <div class="ctx-item" data-action="trackLiq">Track Liquidity</div>
          <div class="ctx-item" data-action="measurePersist">Measure Persistence</div>
          <div class="ctx-item" data-action="setAlert">Set Alert</div>
          <div class="ctx-item" data-action="inspectOrders">Inspect Orders</div>
          <div class="ctx-item" data-action="showHist">Show Historical Activity</div>
          <div class="ctx-item" data-action="hideLevel">Hide Level</div>
        `;
      }
    }
    menu.innerHTML = html;
    menu.querySelectorAll('.ctx-item').forEach(item => {
      item.addEventListener('click', () => {
        handleContextAction(item.dataset.action);
        menu.classList.add('hidden');
      });
    });
  });

  window.addEventListener('click', (e) => {
    if (!e.target.closest('#contextMenu')) $('#contextMenu').classList.add('hidden');
    if (!e.target.closest('.dropdown-control') && !e.target.closest('.instrument-select') && !e.target.closest('.venue-select') && !e.target.closest('.dom-mode-select')) {
      $$('.dropdown-menu').forEach(m=>m.classList.remove('show'));
    }
  });

  // Keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'ArrowUp') { e.preventDefault(); handleControl('liquidity-plus'); }
    if (e.ctrlKey && e.key === 'ArrowDown') { e.preventDefault(); handleControl('liquidity-minus'); }
    if (e.altKey && e.key === 'ArrowUp') { e.preventDefault(); handleControl('precision-plus'); }
    if (e.altKey && e.key === 'ArrowDown') { e.preventDefault(); handleControl('precision-minus'); }
    if (e.key === '+' || e.key === '=') { STATE.zoom = clamp(STATE.zoom*1.1,0.5,5); }
    if (e.key === '-' || e.key === '_') { STATE.zoom = clamp(STATE.zoom*0.9,0.5,5); }
    if (e.code === 'Space') { e.preventDefault(); STATE.isPlaying = !STATE.isPlaying; }
    if (e.key.toLowerCase() === 'r') { $('#resetBtn').click(); }
    if (e.key.toLowerCase() === 'd') { $('#domToggleBtn').click(); }
    if (e.key.toLowerCase() === 't') { STATE.showTrades = !STATE.showTrades; $$('.lt-btn[data-layer="trades"]').forEach(b=>b.classList.toggle('active', STATE.showTrades)); }
    if (e.key.toLowerCase() === 'h') { STATE.showHeatmap = !STATE.showHeatmap; }
    if (e.key.toLowerCase() === 'c') { STATE.tool='crosshair'; $$('.lt-btn[data-tool]').forEach(b=>b.classList.remove('active')); $(`.lt-btn[data-tool="crosshair"]`).classList.add('active'); }
    if (e.key.toLowerCase() === 'm') { STATE.tool='measure'; $$('.lt-btn[data-tool]').forEach(b=>b.classList.remove('active')); $(`.lt-btn[data-tool="measure"]`).classList.add('active'); }
  });

  // Resizers
  setupResizers();

  // Layouts modal
  $('#btnLayouts').addEventListener('click', () => $('#layoutsModal').classList.remove('hidden'));
  $('#closeLayouts').addEventListener('click', () => $('#layoutsModal').classList.add('hidden'));
  $$('.layout-option').forEach(opt => {
    opt.addEventListener('click', () => {
      $$('.layout-option').forEach(o=>o.classList.remove('active'));
      opt.classList.add('active');
      applyLayout(opt.dataset.layout);
      $('#layoutsModal').classList.add('hidden');
    });
  });

  // Connection state click to cycle
  $('#connState').addEventListener('click', () => {
    const states = ['LIVE','CONNECTING','DEGRADED','DISCONNECTED','RECONNECTING'];
    const idx = states.indexOf(STATE.connection);
    const next = states[(idx+1)%states.length];
    setConnectionState(next);
  });
}

function setupDropdowns() {
  // Instrument
  $('#instrumentSelect').addEventListener('click', (e) => {
    e.stopPropagation();
    $('#instrumentMenu').classList.toggle('show');
    $('#venueMenu').classList.remove('show');
  });
  $('#instrumentMenu').querySelectorAll('.dd-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      $('#instrumentMenu').querySelectorAll('.dd-item').forEach(i=>i.classList.remove('active'));
      item.classList.add('active');
      $('.inst-pair').textContent = item.textContent;
      $('#instrumentMenu').classList.remove('show');
    });
  });

  // Venue
  $('#venueSelect').addEventListener('click', (e) => {
    e.stopPropagation();
    $('#venueMenu').classList.toggle('show');
    $('#instrumentMenu').classList.remove('show');
  });
  $('#venueMenu').querySelectorAll('.dd-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      $('#venueMenu').querySelectorAll('.dd-item').forEach(i=>i.classList.remove('active'));
      item.classList.add('active');
      $('.venue-name').textContent = item.textContent;
      $('#domVenueLabel').textContent = item.textContent;
      $('#venueMenu').classList.remove('show');
      // Check L3 availability
      const venue = item.textContent;
      const supportsL3 = ['COINBASE','BYBIT'].includes(venue);
      const l3Item = $('#domModeMenu').querySelector('[data-dom="L3"]');
      if (!supportsL3) {
        // keep but will show unavailable when selected
      }
    });
  });

  // Trades dropdown
  $('#tradesSelectBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    $('#tradesMenu').classList.toggle('show');
  });
  $('#tradesMenu').querySelectorAll('.dd-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      $('#tradesMenu').querySelectorAll('.dd-item').forEach(i=>i.classList.remove('active'));
      item.classList.add('active');
      STATE.tradesMode = item.dataset.trade;
      $('#tradesModeLabel').textContent = item.textContent;
      $('#tradesMenu').classList.remove('show');
    });
  });

  // DOM mode
  $('#domModeBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    $('#domModeMenu').classList.toggle('show');
  });
  $('#domModeMenu').querySelectorAll('.dd-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      $('#domModeMenu').querySelectorAll('.dd-item').forEach(i=>i.classList.remove('active'));
      item.classList.add('active');
      STATE.domMode = item.dataset.dom;
      $('#domModeBtn').innerHTML = item.textContent + ' <span class="chev">▼</span>';
      $('#domModeMenu').classList.remove('show');
      if (STATE.domMode==='L3') {
        const venue = $('.venue-name').textContent;
        const supportsL3 = ['COINBASE','BYBIT'].includes(venue);
        if (!supportsL3) {
          $('#domL2View').classList.add('hidden');
          $('#domL3View').classList.remove('hidden');
          $('#domL3Table').classList.add('hidden');
          $('#domL3Unavailable').classList.remove('hidden');
        } else {
          $('#domL2View').classList.add('hidden');
          $('#domL3View').classList.remove('hidden');
          $('#domL3Table').classList.remove('hidden');
          $('#domL3Unavailable').classList.add('hidden');
        }
      } else {
        $('#domL2View').classList.remove('hidden');
        $('#domL3View').classList.add('hidden');
      }
    });
  });

  // Replay speed
  $('#replaySpeedBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    $('#replaySpeedMenu').classList.toggle('show');
  });
  $('#replaySpeedMenu').querySelectorAll('.dd-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      $('#replaySpeedMenu').querySelectorAll('.dd-item').forEach(i=>i.classList.remove('active'));
      item.classList.add('active');
      STATE.replaySpeed = parseFloat(item.dataset.speed);
      $('#replaySpeedBtn').innerHTML = `SPEED ${item.textContent} <span class="chev">▼</span>`;
      $('#replaySpeedMenu').classList.remove('show');
    });
  });
}

function handleControl(action) {
  switch(action) {
    case 'liquidity-minus':
      STATE.liquidity = clamp(STATE.liquidity - 1, 0, 100);
      break;
    case 'liquidity-plus':
      STATE.liquidity = clamp(STATE.liquidity + 1, 0, 100);
      break;
    case 'precision-minus':
      STATE.precision = clamp(STATE.precision - 1, 1, 8);
      break;
    case 'precision-plus':
      STATE.precision = clamp(STATE.precision + 1, 1, 8);
      break;
    case 'contrast-minus':
      STATE.contrast = clamp(STATE.contrast - 1, 0, 100);
      break;
    case 'contrast-plus':
      STATE.contrast = clamp(STATE.contrast + 1, 0, 100);
      break;
    case 'opacity-minus':
      STATE.opacity = clamp(STATE.opacity - 1, 0, 100);
      break;
    case 'opacity-plus':
      STATE.opacity = clamp(STATE.opacity + 1, 0, 100);
      break;
  }
  updateControlUI();
}

function updateControlUI() {
  $('#liquidityValue').textContent = Math.round(STATE.liquidity);
  $('#precisionValue').textContent = STATE.precision;
  $('#contrastValue').textContent = Math.round(STATE.contrast);
  $('#opacityValue').textContent = Math.round(STATE.opacity);
  updateControlButtons();
}

function updateControlButtons() {
  const setDisabled = (groupId, value) => {
    const group = $(`#${groupId}`);
    if (!group) return;
    const minus = group.querySelector('.minus');
    const plus = group.querySelector('.plus');
    if (minus) minus.disabled = value <= 0;
    if (plus) {
      if (groupId==='precisionControl') plus.disabled = value >= 8;
      else plus.disabled = value >= 100;
    }
    if (groupId==='precisionControl' && minus) minus.disabled = value <=1;
  };
  setDisabled('liquidityControl', STATE.liquidity);
  setDisabled('precisionControl', STATE.precision);
  setDisabled('contrastControl', STATE.contrast);
  setDisabled('opacityControl', STATE.opacity);
}

function updateTimeline() {
  $('#timelineProgress').style.width = (STATE.replayProgress*100)+'%';
  $('#timelineHandle').style.left = (STATE.replayProgress*100)+'%';
  const now = new Date();
  const start = new Date(now - 4*60*60*1000);
  const current = new Date(start.getTime() + STATE.replayProgress*4*60*60*1000);
  $('#timelineCurrent').textContent = current.toTimeString().slice(0,8);
}

function updateTimelineFromEvent(e) {
  const track = $('#timelineTrack');
  const rect = track.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const pct = clamp(x/rect.width,0,1);
  STATE.replayProgress = pct;
  updateTimeline();
}

function renderMeasureLine(start, end) {
  const rect = heatmapCanvas.getBoundingClientRect();
  oCtx.clearRect(0,0,rect.width,rect.height);
  // draw line
  oCtx.strokeStyle = '#00e5cc';
  oCtx.lineWidth = 1;
  oCtx.setLineDash([4,4]);
  oCtx.beginPath();
  oCtx.moveTo(start.x, start.y);
  oCtx.lineTo(end.x, end.y);
  oCtx.stroke();
  oCtx.setLineDash([]);
  // also render trades again
  // we will not clear overlay completely elsewhere, but this is okay
}

function updateCursor() {
  const container = $('#heatmap-container');
  container.style.cursor = STATE.tool==='pan' ? 'grab' : STATE.tool==='zoom' ? 'zoom-in' : STATE.tool==='crosshair' ? 'crosshair' : 'default';
}

function setupResizers() {
  const leftResizer = $('#resizerLeft');
  const rightResizer = $('#resizerRight');
  const analyticsResizer = $('#resizerAnalytics');
  const leftToolbar = $('#left-toolbar');
  const domPanel = $('#dom-panel');
  const analyticsPanel = $('#analytics-panel');

  let isDragging = null;
  let startX, startY, startW, startH;

  leftResizer.addEventListener('mousedown', (e) => {
    isDragging = 'left';
    startX = e.clientX;
    startW = leftToolbar.getBoundingClientRect().width;
    leftResizer.classList.add('dragging');
  });
  rightResizer.addEventListener('mousedown', (e) => {
    isDragging = 'right';
    startX = e.clientX;
    startW = domPanel.getBoundingClientRect().width;
    rightResizer.classList.add('dragging');
  });
  analyticsResizer.addEventListener('mousedown', (e) => {
    isDragging = 'analytics';
    startY = e.clientY;
    startH = analyticsPanel.getBoundingClientRect().height;
    analyticsResizer.classList.add('dragging');
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    if (isDragging==='left') {
      const diff = e.clientX - startX;
      const newW = clamp(startW + diff, 32, 120);
      leftToolbar.style.width = newW+'px';
    } else if (isDragging==='right') {
      const diff = startX - e.clientX;
      const newW = clamp(startW + diff, 160, 500);
      domPanel.style.width = newW+'px';
    } else if (isDragging==='analytics') {
      const diff = startY - e.clientY;
      const newH = clamp(startH + diff, 28, 400);
      analyticsPanel.style.height = newH+'px';
    }
    setupCanvasSizes();
  });
  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = null;
      leftResizer.classList.remove('dragging');
      rightResizer.classList.remove('dragging');
      analyticsResizer.classList.remove('dragging');
      setupCanvasSizes();
    }
  });
}

function applyLayout(name) {
  const domPanel = $('#dom-panel');
  const analyticsPanel = $('#analytics-panel');
  const leftToolbar = $('#left-toolbar');
  if (name==='default') {
    domPanel.classList.remove('collapsed');
    domPanel.style.width = '220px';
    analyticsPanel.classList.remove('collapsed');
    analyticsPanel.style.height = '160px';
    STATE.showDOM = true;
  } else if (name==='heatmapOnly') {
    domPanel.classList.add('collapsed');
    analyticsPanel.classList.add('collapsed');
    STATE.showDOM = false;
  } else if (name==='full') {
    domPanel.classList.remove('collapsed');
    domPanel.style.width = '260px';
    analyticsPanel.classList.remove('collapsed');
    analyticsPanel.style.height = '180px';
    STATE.showDOM = true;
  } else if (name==='flow') {
    domPanel.classList.remove('collapsed');
    domPanel.style.width = '220px';
    analyticsPanel.classList.remove('collapsed');
    analyticsPanel.style.height = '220px';
    STATE.showDOM = true;
  }
  setTimeout(setupCanvasSizes, 150);
}

function handleContextAction(action) {
  switch(action) {
    case 'reset':
      $('#resetBtn').click();
      break;
    case 'showDOM':
      STATE.showDOM = true;
      $('#dom-panel').classList.remove('collapsed');
      break;
    case 'hlevel':
      if (STATE.hover) STATE.drawings.push({ type:'hlevel', price: STATE.hover.price, color:'#00e5cc' });
      break;
    case 'trackLiq':
      if (STATE.hover) STATE.drawings.push({ type:'hlevel', price: STATE.hover.price, color:'#e6c229' });
      break;
    case 'hideLevel':
      // filter out drawings near hover
      if (STATE.hover) {
        STATE.drawings = STATE.drawings.filter(d => Math.abs(d.price - STATE.hover.price) > 2);
      }
      break;
    default:
      console.log('Context action', action);
  }
}

function setConnectionState(state) {
  STATE.connection = state;
  const dot = $('.conn-dot');
  const text = $('.conn-text');
  dot.className = 'conn-dot ' + state.toLowerCase();
  text.textContent = state;
  if (state==='LIVE') {
    dot.style.background = '#00e676';
    STATE.isLive = true;
  } else if (state==='DISCONNECTED') {
    STATE.isLive = false;
  }
}

function simulateConnection() {
  // Occasionally simulate degraded
  setInterval(() => {
    if (Math.random()<0.05 && STATE.connection==='LIVE') {
      setConnectionState('DEGRADED');
      setTimeout(()=> setConnectionState('LIVE'), 3000+Math.random()*4000);
    }
  }, 5000);
}

function simulatePerfMetrics() {
  setInterval(() => {
    $('#cpuMetric').textContent = `CPU ${Math.floor(8+Math.random()*18)}%`;
    $('#gpuMetric').textContent = `GPU ${Math.floor(25+Math.random()*25)}%`;
    const dataStates = ['DATA OK','DATA OK','DATA OK','DATA LAG'];
    $('#dataMetric').textContent = dataStates[Math.floor(Math.random()*dataStates.length)];
  }, 1200);
}

// Initialize
document.addEventListener('DOMContentLoaded', init);
