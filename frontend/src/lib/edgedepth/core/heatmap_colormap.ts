// heatmap_colormap.h/.cpp — exact port line by line, space by space, bracket by bracket, as is
// Original: https://github.com/edgedepthhq/edgedepth-terminal.git src/core/heatmap_colormap.h/.cpp
// Ember 15 stops, Viridis 6, Magma 5, Inferno V7 hand-tuned black→indigo→purple→red→orange→yellow→white thresholds 0.05/0.15/0.25/0.35/0.45/0.55/0.65/0.75/0.85/0.95, alpha curve 0.05 invisible, 0.05-0.15 quad 40, 0.15-0.35 40→120, 0.35-0.60 120→190, 0.60-1.0 190→245*opacity, discard 0.07 liq /0.004 orderbook, LUT 256x1, generation

export type ColormapType = 'Orderbook' | 'Liquidation' | 'LiquidationWarm' | 'RealtimeOrderbook' | 'RealtimeWarm';
export type LiqMap = 'Ember' | 'Viridis' | 'Magma' | 'Inferno';

let g_liq_map: LiqMap = 'Ember';
let g_generation = 0;

export function liq_map(): LiqMap { return g_liq_map; }
export function set_liq_map(m:LiqMap){ if (m===g_liq_map) return; g_liq_map=m; g_generation++; }
export function generation(){ return g_generation; }

type Stop = { t:number; r:number; g:number; b:number; };

const EMBER_STOPS: Stop[] = [
  {t:0.000, r:0, g:0, b:0}, {t:0.060, r:6, g:4, b:15}, {t:0.140, r:14, g:9, b:34},
  {t:0.240, r:27, g:13, b:59}, {t:0.350, r:45, g:17, b:84}, {t:0.460, r:68, g:22, b:103},
  {t:0.570, r:95, g:28, b:110}, {t:0.670, r:126, g:36, b:106}, {t:0.760, r:160, g:47, b:92},
  {t:0.840, r:196, g:62, b:70}, {t:0.900, r:227, g:84, b:44}, {t:0.945, r:246, g:114, b:20},
  {t:0.975, r:252, g:158, b:28}, {t:0.992, r:253, g:201, b:62}, {t:1.000, r:252, g:235, b:140}
];

const VIRIDIS_STOPS: Stop[] = [
  {t:0.00, r:68, g:1, b:84}, {t:0.20, r:65, g:68, b:135}, {t:0.40, r:42, g:120, b:142},
  {t:0.60, r:34, g:168, b:132}, {t:0.80, r:122, g:209, b:81}, {t:1.00, r:253, g:231, b:37}
];

const MAGMA_STOPS: Stop[] = [
  {t:0.00, r:0, g:0, b:4}, {t:0.25, r:81, g:18, b:124}, {t:0.50, r:183, g:55, b:121},
  {t:0.75, r:252, g:137, b:97}, {t:1.00, r:252, g:253, b:191}
];

function eval_stops(stops:Stop[], t:number){
  if (t<=stops[0].t) return {r:stops[0].r, g:stops[0].g, b:stops[0].b};
  for (let i=1;i<stops.length;i++){
    if (t<=stops[i].t){
      const s=(t-stops[i-1].t)/(stops[i].t-stops[i-1].t);
      return {r: stops[i-1].r + s*(stops[i].r-stops[i-1].r), g: stops[i-1].g + s*(stops[i].g-stops[i-1].g), b: stops[i-1].b + s*(stops[i].b-stops[i-1].b)};
    }
  }
  const last=stops[stops.length-1];
  return {r:last.r, g:last.g, b:last.b};
}

export function apply(type:ColormapType, t:number): {r:number,g:number,b:number}{
  if (type==='Liquidation' || type==='LiquidationWarm'){
    if (g_liq_map==='Ember') return eval_stops(EMBER_STOPS, t);
    if (g_liq_map==='Viridis') return eval_stops(VIRIDIS_STOPS, t);
    if (g_liq_map==='Magma') return eval_stops(MAGMA_STOPS, t);
    // Inferno V7
    if (t<0.05){ const s=t/0.05; return {r:s*3, g:0, b:s*4}; }
    else if (t<0.15){ const s=(t-0.05)/0.10; return {r:3+s*27, g:s*9, b:4+s*64}; }
    else if (t<0.25){ const s=(t-0.15)/0.10; return {r:30+s*43, g:9+s*7, b:68+s*35}; }
    else if (t<0.35){ const s=(t-0.25)/0.10; return {r:73+s*47, g:16+s*12, b:103+s*6}; }
    else if (t<0.45){ const s=(t-0.35)/0.10; return {r:120+s*37, g:28+s*14, b:109-s*20}; }
    else if (t<0.55){ const s=(t-0.45)/0.10; return {r:157+s*30, g:42+s*13, b:89-s*26}; }
    else if (t<0.65){ const s=(t-0.55)/0.10; return {r:187+s*25, g:55+s*25, b:63-s*28}; }
    else if (t<0.75){ const s=(t-0.65)/0.10; return {r:212+s*22, g:80+s*37, b:35-s*24}; }
    else if (t<0.85){ const s=(t-0.75)/0.10; return {r:234+s*13, g:117+s*44, b:11-s*7}; }
    else if (t<0.95){ const s=(t-0.85)/0.10; return {r:247+s*3, g:161+s*49, b:4+s*48}; }
    else { const s=(t-0.95)/0.05; return {r:250+s*2, g:210+s*45, b:52+s*112}; }
  }
  if (type==='RealtimeWarm'){
    const stops:Stop[]=[{t:0.00,r:8,g:13,b:18},{t:0.15,r:15,g:30,b:64},{t:0.40,r:28,g:92,b:153},{t:0.65,r:75,g:181,b:190},{t:0.80,r:240,g:205,b:75},{t:0.94,r:248,g:108,b:40},{t:1.00,r:255,g:55,b:35}];
    return eval_stops(stops, t);
  }
  if (type==='RealtimeOrderbook'){
    const stops:Stop[]=[{t:0.00,r:8,g:13,b:18},{t:0.08,r:12,g:27,b:36},{t:0.25,r:22,g:83,b:108},{t:0.50,r:48,g:182,b:201},{t:0.75,r:218,g:217,b:95},{t:1.00,r:255,g:250,b:220}];
    return eval_stops(stops, t);
  }
  // Orderbook
  if (t<0.01) return {r:15,g:25,b:45};
  else if (t<0.15){ const s=(t-0.01)/0.14; return {r:15+s*10, g:25+s*95, b:45+s*105}; }
  else if (t<0.35){ const s=(t-0.15)/0.20; return {r:25+s*35, g:120+s*40, b:150+s*55}; }
  else if (t<0.55){ const s=(t-0.35)/0.20; return {r:60+s*120, g:160-s*80, b:205+s*30}; }
  else if (t<0.75){ const s=(t-0.55)/0.20; return {r:180+s*65, g:80+s*100, b:235-s*155}; }
  else { const s=(t-0.75)/0.25; return {r:245+s*10, g:180+s*75, b:80+s*175}; }
}

export function build_packed_lut(type:ColormapType, opacity:number): Uint32Array {
  const out=new Uint32Array(256);
  for (let i=0;i<256;i++){
    const t=i/255;
    const {r,g,b}=apply(type, t);
    let a=220;
    if (type==='Liquidation' || type==='LiquidationWarm'){
      if (t<0.05) a=0;
      else if (t<0.15){ const s=(t-0.05)/0.10; a=s*s*40; }
      else if (t<0.35){ const s=(t-0.15)/0.20; a=40+s*80; }
      else if (t<0.60){ const s=(t-0.35)/0.25; a=120+s*70; }
      else { const s=(t-0.60)/0.40; a=Math.min(245,190+s*55); }
      a=a*opacity;
    }
    out[i]= (Math.round(r) & 0xFF) | ((Math.round(g) & 0xFF)<<8) | ((Math.round(b) & 0xFF)<<16) | ((Math.round(a) & 0xFF)<<24);
  }
  return out;
}

export function build_lut(type:ColormapType): Uint32Array {
  const out=new Uint32Array(256);
  for (let i=0;i<256;i++){
    const t=i/255;
    const {r,g,b}=apply(type, t);
    out[i]= (Math.round(r) | (Math.round(g)<<8) | (Math.round(b)<<16) | (220<<24));
  }
  return out;
}
