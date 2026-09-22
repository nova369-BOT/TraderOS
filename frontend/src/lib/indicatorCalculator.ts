// indicatorCalculator.ts - Pure indicator computation, worker-safe
// Extracted from ProChart.tsx useMemo to enable Web Worker offloading.
// No React, no DOM, no refs — pure function of price arrays + config.

import {
  calculateEMA, calculateSMA, calculateSMMA, calculateBollingerBands,
  calculateRSI, calculateMACD, calculateATR, calculateStochastic,
  calculateWilliamsR, calculateCCI, calculateADX, calculateROC,
  calculateVWAP, calculateIchimoku, calculateParabolicSAR,
  calculateKeltnerChannels, calculateDailyPivots,
  calculateSupertrend, calculateDonchian, calculateAroon, calculateEnvelopes,
  calculateDEMA, calculateTEMA, calculateHMA, calculateMomentum,
  calculateAwesomeOscillator, calculateMFI, calculateTSI, calculateTRIX,
  calculateUltimateOscillator, calculateDPO, calculateKST, calculateStochRSI,
  calculateBBPercent, calculateBBWidth, calculateHistoricalVolatility,
  calculateChaikinVolatility, calculateStdDev, calculateOBV, calculateCMF,
  calculateADL, calculateForceIndex, calculateEOM, calculateVolumeSMA,
  calculateFibRetracement, calculateDailyCamarilla, calculateDailyWoodie,
  calculateCorrelation, calculateLinearRegression, calculateCoppock,
  calculateALMA, calculateKAMA, calculateZLEMA, calculateT3, calculateLSMA,
  calculateMcGinley, calculateVortex, calculateChoppiness, calculateElderRay,
  calculateMassIndex, calculateChandeKrollStop, calculateLinRegSlope,
  calculateWMA, calculatePriceChannel, calculateAlligator,
  calculatePPO, calculatePVO, calculateCMO, calculateFisherTransform,
  calculateSTC, calculateRVI, calculateKlingerOscillator, calculateConnorsRSI,
  calculateAPO, calculateQStick, calculateBOP, calculatePsychologicalLine,
  calculatePFE, calculateUlcerIndex, calculateNATR, calculateTrueRange,
  calculateSqueeze, calculateChandelierExit, calculateRelativeVolIndex,
  calculateVHF, calculateAccBands, calculateVWMA, calculateVolumeOsc,
  calculateNVI, calculatePVI, calculatePVT, calculateVROC, calculateNetVolume,
  calculateTwiggsMF, calculateLinRegRSquared, calculateMedianPrice,
  calculateTypicalPrice, calculateWeightedClose, calculateDeMarkPivots,
  calculateZigZag, calculateFractals, calculateGator, calculateSMI,
} from '@/lib/indicators';
import { evaluateFormula } from '@/lib/formulaEngine';

type MAType = 'SMA' | 'EMA' | 'SMMA' | 'WMA' | 'HMA' | 'DEMA' | 'TEMA';

export interface PriceArrays {
  closes: number[];
  highs: number[];
  lows: number[];
  opens: number[];
  volumes: number[];
  timestamps: number[];
}

export interface IndicatorConfig {
  movingAverages?: { enabled: boolean; lines: { type: MAType; period: number; color: string }[] };
  rsi?: { enabled: boolean; period: number };
  macd?: { enabled: boolean; fast: number; slow: number; signal: number };
  ema?: { enabled: boolean; periods: number[] };
  bollinger?: { enabled: boolean; period: number; stdDev: number };
  volume?: { enabled: boolean };
  atr?: { enabled: boolean; period: number };
  stochastic?: { enabled: boolean; kPeriod: number; dPeriod: number; smooth: number };
  williamsR?: { enabled: boolean; period: number };
  cci?: { enabled: boolean; period: number };
  adx?: { enabled: boolean; period: number };
  roc?: { enabled: boolean; period: number };
  vwap?: { enabled: boolean };
  ichimoku?: { enabled: boolean; tenkanPeriod: number; kijunPeriod: number; senkouBPeriod: number; displacement: number };
  parabolicSAR?: { enabled: boolean; afStart: number; afStep: number; afMax: number };
  keltner?: { enabled: boolean; emaPeriod: number; atrPeriod: number; multiplier: number };
  pivotPoints?: { enabled: boolean };
  supertrend?: { enabled: boolean; period: number; multiplier: number };
  donchian?: { enabled: boolean; period: number };
  aroon?: { enabled: boolean; period: number };
  envelopes?: { enabled: boolean; period: number; percent: number };
  dema?: { enabled: boolean; period: number };
  tema?: { enabled: boolean; period: number };
  hma?: { enabled: boolean; period: number };
  momentum?: { enabled: boolean; period: number };
  awesomeOsc?: { enabled: boolean };
  mfi?: { enabled: boolean; period: number };
  tsi?: { enabled: boolean; longPeriod: number; shortPeriod: number; signalPeriod: number };
  trix?: { enabled: boolean; period: number; signalPeriod: number };
  ultimateOsc?: { enabled: boolean; fast: number; med: number; slow: number };
  dpo?: { enabled: boolean; period: number };
  kst?: { enabled: boolean; roc1: number; roc2: number; roc3: number; roc4: number; sma1: number; sma2: number; sma3: number; sma4: number; signalPeriod: number };
  stochRsi?: { enabled: boolean; rsiPeriod: number; kPeriod: number; dPeriod: number };
  bbPercent?: { enabled: boolean; period: number; stdDev: number };
  bbWidth?: { enabled: boolean; period: number; stdDev: number };
  histVol?: { enabled: boolean; period: number };
  chaikinVol?: { enabled: boolean; emaPeriod: number; rocPeriod: number };
  stdDev?: { enabled: boolean; period: number };
  obv?: { enabled: boolean };
  cmf?: { enabled: boolean; period: number };
  adl?: { enabled: boolean };
  forceIndex?: { enabled: boolean; period: number };
  eom?: { enabled: boolean; period: number };
  volumeSma?: { enabled: boolean; period: number };
  fibRetracement?: { enabled: boolean; lookback: number };
  camarillaPivots?: { enabled: boolean };
  woodiePivots?: { enabled: boolean };
  correlation?: { enabled: boolean; period: number };
  linearReg?: { enabled: boolean; period: number; deviations: number };
  coppock?: { enabled: boolean; longROC: number; shortROC: number; wmaPeriod: number };
  alma?: { enabled: boolean; period: number; offset: number; sigma: number };
  kama?: { enabled: boolean; period: number; fastPeriod: number; slowPeriod: number };
  zlema?: { enabled: boolean; period: number };
  t3?: { enabled: boolean; period: number; vFactor: number };
  lsma?: { enabled: boolean; period: number };
  mcginley?: { enabled: boolean; period: number };
  vortex?: { enabled: boolean; period: number };
  choppiness?: { enabled: boolean; period: number };
  elderRay?: { enabled: boolean; period: number };
  massIndex?: { enabled: boolean; period: number };
  chandeKroll?: { enabled: boolean; p: number; q: number; x: number };
  linRegSlope?: { enabled: boolean; period: number };
  priceChannel?: { enabled: boolean; period: number };
  alligator?: { enabled: boolean };
  ppo?: { enabled: boolean; fast: number; slow: number; signal: number };
  pvo?: { enabled: boolean; fast: number; slow: number; signal: number };
  cmo?: { enabled: boolean; period: number };
  fisher?: { enabled: boolean; period: number };
  stc?: { enabled: boolean; fast: number; slow: number; cycle: number };
  rviOsc?: { enabled: boolean; period: number };
  klinger?: { enabled: boolean; fast: number; slow: number; signal: number };
  connorsRsi?: { enabled: boolean; rsiPeriod: number; streakPeriod: number; rankPeriod: number };
  apo?: { enabled: boolean; fast: number; slow: number };
  qstick?: { enabled: boolean; period: number };
  bop?: { enabled: boolean; period: number };
  psychLine?: { enabled: boolean; period: number };
  pfe?: { enabled: boolean; period: number; smoothing: number };
  smi?: { enabled: boolean; period: number; smoothK: number; smoothD: number };
  ulcerIndex?: { enabled: boolean; period: number };
  natr?: { enabled: boolean; period: number };
  trueRange?: { enabled: boolean };
  squeeze?: { enabled: boolean; bbPeriod: number; bbMult: number; kcPeriod: number; kcMult: number };
  relVolIndex?: { enabled: boolean; period: number; smoothing: number };
  vhf?: { enabled: boolean; period: number };
  accBands?: { enabled: boolean; period: number };
  vwma?: { enabled: boolean; period: number };
  volumeOsc?: { enabled: boolean; fast: number; slow: number };
  nvi?: { enabled: boolean };
  pvi?: { enabled: boolean };
  pvt?: { enabled: boolean };
  vroc?: { enabled: boolean; period: number };
  netVolume?: { enabled: boolean; period: number };
  twiggsMF?: { enabled: boolean; period: number };
  linRegRSquared?: { enabled: boolean; period: number };
  medianPrice?: { enabled: boolean };
  typicalPrice?: { enabled: boolean };
  weightedClose?: { enabled: boolean };
  demarkPivots?: { enabled: boolean };
  zigzag?: { enabled: boolean; deviation: number };
  fractals?: { enabled: boolean };
  gator?: { enabled: boolean };
  smmaOverlay?: { enabled: boolean; period: number };
  wma?: { enabled: boolean; period: number };
  customIndicators?: { id: string; enabled: boolean; expression: string; data?: number[] }[];
  [key: string]: any;
}

export function computeIndicatorData(
  price: PriceArrays,
  indicators: IndicatorConfig
): any {
  const { closes, highs, lows, opens, volumes, timestamps } = price;

  let maLines: { data: number[]; color: string; name: string }[] | null = null;
  if (indicators.movingAverages?.enabled && indicators.movingAverages.lines?.length > 0) {
    maLines = indicators.movingAverages.lines.map((line) => {
      let data: number[];
      switch (line.type) {
        case 'SMA': data = calculateSMA(closes, line.period); break;
        case 'SMMA': data = calculateSMMA(closes, line.period); break;
        case 'EMA':
        default: data = calculateEMA(closes, line.period); break;
      }
      return { data, color: line.color, name: `${line.type} ${line.period}` };
    });
  }

  const result = {
    rsi: indicators.rsi?.enabled ? calculateRSI(closes, indicators.rsi.period) : null,
    macd: indicators.macd?.enabled ? calculateMACD(closes, indicators.macd.fast, indicators.macd.slow, indicators.macd.signal) : null,
    ema: indicators.ema?.enabled ? indicators.ema.periods.map((p: number) => calculateEMA(closes, p)) : null,
    bollinger: indicators.bollinger?.enabled ? calculateBollingerBands(closes, indicators.bollinger.period, indicators.bollinger.stdDev) : null,
    movingAverages: maLines,
    atr: indicators.atr?.enabled ? calculateATR(highs, lows, closes, indicators.atr.period) : null,
    stochastic: indicators.stochastic?.enabled ? calculateStochastic(highs, lows, closes, indicators.stochastic.kPeriod, indicators.stochastic.dPeriod, indicators.stochastic.smooth) : null,
    williamsR: indicators.williamsR?.enabled ? calculateWilliamsR(highs, lows, closes, indicators.williamsR.period) : null,
    cci: indicators.cci?.enabled ? calculateCCI(highs, lows, closes, indicators.cci.period) : null,
    adx: indicators.adx?.enabled ? calculateADX(highs, lows, closes, indicators.adx.period) : null,
    roc: indicators.roc?.enabled ? calculateROC(closes, indicators.roc.period) : null,
    vwap: indicators.vwap?.enabled ? calculateVWAP(highs, lows, closes, volumes, timestamps) : null,
    ichimoku: indicators.ichimoku?.enabled ? calculateIchimoku(highs, lows, closes, indicators.ichimoku.tenkanPeriod, indicators.ichimoku.kijunPeriod, indicators.ichimoku.senkouBPeriod, indicators.ichimoku.displacement) : null,
    parabolicSAR: indicators.parabolicSAR?.enabled ? calculateParabolicSAR(highs, lows, indicators.parabolicSAR.afStart, indicators.parabolicSAR.afStep, indicators.parabolicSAR.afMax) : null,
    keltner: indicators.keltner?.enabled ? calculateKeltnerChannels(highs, lows, closes, indicators.keltner.emaPeriod, indicators.keltner.atrPeriod, indicators.keltner.multiplier) : null,
    pivotPoints: indicators.pivotPoints?.enabled ? calculateDailyPivots(timestamps, highs, lows, closes) : null,
    supertrend: indicators.supertrend?.enabled ? calculateSupertrend(highs, lows, closes, indicators.supertrend.period, indicators.supertrend.multiplier) : null,
    donchian: indicators.donchian?.enabled ? calculateDonchian(highs, lows, indicators.donchian.period) : null,
    aroon: indicators.aroon?.enabled ? calculateAroon(highs, lows, indicators.aroon.period) : null,
    envelopes: indicators.envelopes?.enabled ? calculateEnvelopes(closes, indicators.envelopes.period, indicators.envelopes.percent) : null,
    dema: indicators.dema?.enabled ? calculateDEMA(closes, indicators.dema.period) : null,
    tema: indicators.tema?.enabled ? calculateTEMA(closes, indicators.tema.period) : null,
    hma: indicators.hma?.enabled ? calculateHMA(closes, indicators.hma.period) : null,
    momentum: indicators.momentum?.enabled ? calculateMomentum(closes, indicators.momentum.period) : null,
    awesomeOsc: indicators.awesomeOsc?.enabled ? calculateAwesomeOscillator(highs, lows) : null,
    mfi: indicators.mfi?.enabled ? calculateMFI(highs, lows, closes, volumes, indicators.mfi.period) : null,
    tsi: indicators.tsi?.enabled ? calculateTSI(closes, indicators.tsi.longPeriod, indicators.tsi.shortPeriod, indicators.tsi.signalPeriod) : null,
    trix: indicators.trix?.enabled ? calculateTRIX(closes, indicators.trix.period, indicators.trix.signalPeriod) : null,
    ultimateOsc: indicators.ultimateOsc?.enabled ? calculateUltimateOscillator(highs, lows, closes, indicators.ultimateOsc.fast, indicators.ultimateOsc.med, indicators.ultimateOsc.slow) : null,
    dpo: indicators.dpo?.enabled ? calculateDPO(closes, indicators.dpo.period) : null,
    kst: indicators.kst?.enabled ? calculateKST(closes, indicators.kst.roc1, indicators.kst.roc2, indicators.kst.roc3, indicators.kst.roc4, indicators.kst.sma1, indicators.kst.sma2, indicators.kst.sma3, indicators.kst.sma4, indicators.kst.signalPeriod) : null,
    stochRsi: indicators.stochRsi?.enabled ? calculateStochRSI(closes, indicators.stochRsi.rsiPeriod, indicators.stochRsi.kPeriod, indicators.stochRsi.dPeriod) : null,
    bbPercent: indicators.bbPercent?.enabled ? calculateBBPercent(closes, indicators.bbPercent.period, indicators.bbPercent.stdDev) : null,
    bbWidth: indicators.bbWidth?.enabled ? calculateBBWidth(closes, indicators.bbWidth.period, indicators.bbWidth.stdDev) : null,
    histVol: indicators.histVol?.enabled ? calculateHistoricalVolatility(closes, indicators.histVol.period) : null,
    chaikinVol: indicators.chaikinVol?.enabled ? calculateChaikinVolatility(highs, lows, indicators.chaikinVol.emaPeriod, indicators.chaikinVol.rocPeriod) : null,
    stdDev: indicators.stdDev?.enabled ? calculateStdDev(closes, indicators.stdDev.period) : null,
    obv: indicators.obv?.enabled ? calculateOBV(closes, volumes) : null,
    cmf: indicators.cmf?.enabled ? calculateCMF(highs, lows, closes, volumes, indicators.cmf.period) : null,
    adl: indicators.adl?.enabled ? calculateADL(highs, lows, closes, volumes) : null,
    forceIndex: indicators.forceIndex?.enabled ? calculateForceIndex(closes, volumes, indicators.forceIndex.period) : null,
    eom: indicators.eom?.enabled ? calculateEOM(highs, lows, volumes, indicators.eom.period) : null,
    volumeSma: indicators.volumeSma?.enabled ? calculateVolumeSMA(volumes, indicators.volumeSma.period) : null,
    fibRetracement: indicators.fibRetracement?.enabled ? calculateFibRetracement(highs, lows, indicators.fibRetracement.lookback) : null,
    camarillaPivots: indicators.camarillaPivots?.enabled ? calculateDailyCamarilla(timestamps, highs, lows, closes) : null,
    woodiePivots: indicators.woodiePivots?.enabled ? calculateDailyWoodie(timestamps, highs, lows, closes) : null,
    correlation: indicators.correlation?.enabled ? calculateCorrelation(closes, volumes, indicators.correlation.period) : null,
    linearReg: indicators.linearReg?.enabled ? calculateLinearRegression(closes, indicators.linearReg.period, indicators.linearReg.deviations) : null,
    coppock: indicators.coppock?.enabled ? calculateCoppock(closes, indicators.coppock.longROC, indicators.coppock.shortROC, indicators.coppock.wmaPeriod) : null,
    alma: indicators.alma?.enabled ? calculateALMA(closes, indicators.alma.period, indicators.alma.offset, indicators.alma.sigma) : null,
    kama: indicators.kama?.enabled ? calculateKAMA(closes, indicators.kama.period, indicators.kama.fastPeriod, indicators.kama.slowPeriod) : null,
    zlema: indicators.zlema?.enabled ? calculateZLEMA(closes, indicators.zlema.period) : null,
    t3: indicators.t3?.enabled ? calculateT3(closes, indicators.t3.period, indicators.t3.vFactor) : null,
    lsma: indicators.lsma?.enabled ? calculateLSMA(closes, indicators.lsma.period) : null,
    mcginley: indicators.mcginley?.enabled ? calculateMcGinley(closes, indicators.mcginley.period) : null,
    vortex: indicators.vortex?.enabled ? calculateVortex(highs, lows, closes, indicators.vortex.period) : null,
    choppiness: indicators.choppiness?.enabled ? calculateChoppiness(highs, lows, closes, indicators.choppiness.period) : null,
    elderRay: indicators.elderRay?.enabled ? calculateElderRay(highs, lows, closes, indicators.elderRay.period) : null,
    massIndex: indicators.massIndex?.enabled ? calculateMassIndex(highs, lows, indicators.massIndex.period) : null,
    chandeKroll: indicators.chandeKroll?.enabled ? calculateChandeKrollStop(highs, lows, closes, indicators.chandeKroll.p, indicators.chandeKroll.q, indicators.chandeKroll.x) : null,
    chandelierExit: indicators.chandelierExit?.enabled ? calculateChandelierExit(highs, lows, closes, indicators.chandelierExit.period, indicators.chandelierExit.multiplier) : null,
    linRegSlope: indicators.linRegSlope?.enabled ? calculateLinRegSlope(closes, indicators.linRegSlope.period) : null,
    priceChannel: indicators.priceChannel?.enabled ? calculatePriceChannel(highs, lows, indicators.priceChannel.period) : null,
    alligator: indicators.alligator?.enabled ? calculateAlligator(closes) : null,
    accBands: indicators.accBands?.enabled ? calculateAccBands(highs, lows, closes, indicators.accBands.period) : null,
    ppo: indicators.ppo?.enabled ? calculatePPO(closes, indicators.ppo.fast, indicators.ppo.slow, indicators.ppo.signal) : null,
    pvo: indicators.pvo?.enabled ? calculatePVO(volumes, indicators.pvo.fast, indicators.pvo.slow, indicators.pvo.signal) : null,
    cmo: indicators.cmo?.enabled ? calculateCMO(closes, indicators.cmo.period) : null,
    fisher: indicators.fisher?.enabled ? calculateFisherTransform(highs, lows, indicators.fisher.period) : null,
    stc: indicators.stc?.enabled ? calculateSTC(closes, indicators.stc.fast, indicators.stc.slow, indicators.stc.cycle) : null,
    rviOsc: indicators.rviOsc?.enabled ? calculateRVI(opens, highs, lows, closes, indicators.rviOsc.period) : null,
    klinger: indicators.klinger?.enabled ? calculateKlingerOscillator(highs, lows, closes, volumes, indicators.klinger.fast, indicators.klinger.slow, indicators.klinger.signal) : null,
    connorsRsi: indicators.connorsRsi?.enabled ? calculateConnorsRSI(closes, indicators.connorsRsi.rsiPeriod, indicators.connorsRsi.streakPeriod, indicators.connorsRsi.rankPeriod) : null,
    apo: indicators.apo?.enabled ? calculateAPO(closes, indicators.apo.fast, indicators.apo.slow) : null,
    qstick: indicators.qstick?.enabled ? calculateQStick(opens, closes, indicators.qstick.period) : null,
    bop: indicators.bop?.enabled ? calculateBOP(opens, highs, lows, closes, indicators.bop.period) : null,
    psychLine: indicators.psychLine?.enabled ? calculatePsychologicalLine(closes, indicators.psychLine.period) : null,
    pfe: indicators.pfe?.enabled ? calculatePFE(closes, indicators.pfe.period, indicators.pfe.smoothing) : null,
    smi: indicators.smi?.enabled ? calculateSMI(highs, lows, closes, indicators.smi.period, indicators.smi.smoothK, indicators.smi.smoothD) : null,
    ulcerIndex: indicators.ulcerIndex?.enabled ? calculateUlcerIndex(closes, indicators.ulcerIndex.period) : null,
    natr: indicators.natr?.enabled ? calculateNATR(highs, lows, closes, indicators.natr.period) : null,
    trueRange: indicators.trueRange?.enabled ? calculateTrueRange(highs, lows, closes) : null,
    squeeze: indicators.squeeze?.enabled ? calculateSqueeze(highs, lows, closes, indicators.squeeze.bbPeriod, indicators.squeeze.bbMult, indicators.squeeze.kcPeriod, indicators.squeeze.kcMult) : null,
    relVolIndex: indicators.relVolIndex?.enabled ? calculateRelativeVolIndex(closes, indicators.relVolIndex.period, indicators.relVolIndex.smoothing) : null,
    vhf: indicators.vhf?.enabled ? calculateVHF(closes, indicators.vhf.period) : null,
    vwma: indicators.vwma?.enabled ? calculateVWMA(closes, volumes, indicators.vwma.period) : null,
    volumeOsc: indicators.volumeOsc?.enabled ? calculateVolumeOsc(volumes, indicators.volumeOsc.fast, indicators.volumeOsc.slow) : null,
    nvi: indicators.nvi?.enabled ? calculateNVI(closes, volumes) : null,
    pvi: indicators.pvi?.enabled ? calculatePVI(closes, volumes) : null,
    pvt: indicators.pvt?.enabled ? calculatePVT(closes, volumes) : null,
    vroc: indicators.vroc?.enabled ? calculateVROC(volumes, indicators.vroc.period) : null,
    netVolume: indicators.netVolume?.enabled ? calculateNetVolume(closes, volumes, indicators.netVolume.period) : null,
    twiggsMF: indicators.twiggsMF?.enabled ? calculateTwiggsMF(highs, lows, closes, volumes, indicators.twiggsMF.period) : null,
    linRegRSquared: indicators.linRegRSquared?.enabled ? calculateLinRegRSquared(closes, indicators.linRegRSquared.period) : null,
    medianPrice: indicators.medianPrice?.enabled ? calculateMedianPrice(highs, lows) : null,
    typicalPrice: indicators.typicalPrice?.enabled ? calculateTypicalPrice(highs, lows, closes) : null,
    weightedClose: indicators.weightedClose?.enabled ? calculateWeightedClose(highs, lows, closes) : null,
    demarkPivots: indicators.demarkPivots?.enabled ? calculateDeMarkPivots(timestamps, highs, lows, opens, closes) : null,
    zigzag: indicators.zigzag?.enabled ? calculateZigZag(highs, lows, closes, indicators.zigzag.deviation) : null,
    fractals: indicators.fractals?.enabled ? calculateFractals(highs, lows) : null,
    gator: indicators.gator?.enabled ? calculateGator(closes) : null,
    smmaOverlay: indicators.smmaOverlay?.enabled ? calculateSMMA(closes, indicators.smmaOverlay.period) : null,
    wma: indicators.wma?.enabled ? calculateWMA(closes, indicators.wma.period) : null,
    customIndicators: (indicators.customIndicators || []).filter((ci: any) => ci.enabled).map((ci: any) => {
      if (typeof ci.expression === 'string' && (ci.expression.startsWith('brue:') || ci.expression.startsWith('local:')) && Array.isArray(ci.data) && ci.data.length > 0) {
        return ci;
      }
      const ctx = { closes, highs, lows, opens, volumes, timestamps };
      const result = evaluateFormula(ci.expression, ctx);
      return { ...ci, data: result.errors.length === 0 ? result.data : new Array(closes.length).fill(NaN) };
    }),
  };
  return result;
}

export function prependNaNToIndicators(obj: any, n: number): any {
  if (n <= 0) return obj;
  const pad = new Array(n).fill(NaN);
  const out: any = {};
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (v === null || v === undefined) { out[k] = v; continue; }
    if (Array.isArray(v)) {
      // array of numbers or array of objects with data
      if (v.length > 0 && typeof v[0] === 'object' && v[0] !== null && 'data' in v[0]) {
        out[k] = v.map((line: any) => ({ ...line, data: pad.concat(line.data || []) }));
      } else {
        out[k] = pad.concat(v);
      }
      continue;
    }
    if (typeof v === 'object') {
      // nested object like bollinger { upper, middle, lower } or macd { macd, signal, histogram }
      const inner: any = {};
      for (const ik of Object.keys(v)) {
        const iv = v[ik];
        if (Array.isArray(iv)) inner[ik] = pad.concat(iv);
        else if (typeof iv === 'object' && iv !== null) {
          // deeper like ichimoku?
          const deeper: any = {};
          for (const dk of Object.keys(iv)) {
            const dv = iv[dk];
            deeper[dk] = Array.isArray(dv) ? pad.concat(dv) : dv;
          }
          inner[ik] = deeper;
        } else inner[ik] = iv;
      }
      out[k] = inner;
      continue;
    }
    out[k] = v;
  }
  return out;
}
