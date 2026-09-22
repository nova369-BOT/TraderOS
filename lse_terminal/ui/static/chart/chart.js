import { r as o, i as Lr, j as t, g as ki, q as ys } from "./chunks/react-vendor-C0yw3i6b.js";
import { n as Er, o as Ar, p as wi, q as Si, r as Ci, s as Ti, t as Ii, u as Mi, v as Ri, w as Pi, x as ji, y as Ni, z as Li, A as Ei, C as Ai, D as Di, E as Bi, F as Wi, G as Fi, H as Oi, J as _i, K as $i, M as Hi, N as Vi, O as Xi, Q as Yi, R as zi, U as Ki, V as Ui, W as qi, X as Gi, Y as Zi, Z as Ji, _ as Qi, $ as ec, a0 as tc, a1 as nc, a2 as sc, a3 as oc, a4 as lc, a5 as rc, a6 as ac, a7 as ic, a8 as cc, a9 as uc, aa as dc, ab as hc, ac as fc, ad as pc, ae as mc, af as xc, ag as bc, ah as gc, ai as vc, aj as yc, ak as kc, al as wc, am as Sc, an as Cc, ao as Tc, ap as Ic, aq as Mc, ar as Rc, as as Pc, at as jc, au as Nc, av as Lc, aw as Ec, ax as Ac, ay as Dc, az as Bc, aA as Wc, aB as Fc, aC as Oc, aD as _c, aE as $c, aF as Hc, aG as Vc, aH as Xc, aI as Yc, aJ as zc, aK as Kc, aL as Uc, aM as qc, aN as Gc, aO as Zc, aP as Jc, aQ as Qc, aR as eu, aS as tu, aT as nu, aU as su, aV as ou, aW as lu, aX as ru, aY as au, aZ as iu, a_ as cu, a$ as uu, b0 as du, b1 as hu, b2 as fu, b3 as pu, b4 as mu, b5 as He, b6 as xu, b7 as bu, b8 as ol, b9 as ll, ba as gu, bb as vu, bc as yu, bd as ku, be as wu, bf as Su, bg as Cu, bh as Tu, bi as Fl, bj as Iu, bk as Mu, bl as Ru, bm as Pu, bn as ju, g as Nu, bo as Lu, bp as Eu, bq as Au, br as Dr, bs as zo, bt as Du, bu as Gr, bv as Bu, bw as Wu, bx as Fu, by as Ko, bz as Ou, bA as _u, bB as $u, bC as Hu, bD as Ys, bE as Vu, bF as Yl, bG as zl, bH as fo, bI as Xu, bJ as Yu, bK as zu, bL as Ku, bM as Uu } from "./chunks/backtest-CeqYlV1v.js";
import { au as Uo, av as qo, m as Go, aw as Zo } from "./chunks/ui-DZwdMnFY.js";
import { Q as qu, d as Gu, M as Kl, R as Zu, e as Br, c as Ju, a as Zr } from "./chunks/router-query-iQy8iLKR.js";
import { D as Qu } from "./chunks/depth-CYN6mXgi.js";
import { $ as ed } from "./chunks/ui-heavy-BL_8guwx.js";
function Wr(l, n) {
  const { closes: h, highs: M, lows: T, opens: ee, volumes: ne, timestamps: Ce } = l;
  let r = null;
  return n.movingAverages?.enabled && n.movingAverages.lines?.length > 0 && (r = n.movingAverages.lines.map((oe) => {
    let Oe;
    switch (oe.type) {
      case "SMA":
        Oe = wi(h, oe.period);
        break;
      case "SMMA":
        Oe = Ar(h, oe.period);
        break;
      case "EMA":
      default:
        Oe = Er(h, oe.period);
        break;
    }
    return { data: Oe, color: oe.color, name: `${oe.type} ${oe.period}` };
  })), {
    rsi: n.rsi?.enabled ? mu(h, n.rsi.period) : null,
    macd: n.macd?.enabled ? pu(h, n.macd.fast, n.macd.slow, n.macd.signal) : null,
    ema: n.ema?.enabled ? n.ema.periods.map((oe) => Er(h, oe)) : null,
    bollinger: n.bollinger?.enabled ? fu(h, n.bollinger.period, n.bollinger.stdDev) : null,
    movingAverages: r,
    atr: n.atr?.enabled ? hu(M, T, h, n.atr.period) : null,
    stochastic: n.stochastic?.enabled ? du(M, T, h, n.stochastic.kPeriod, n.stochastic.dPeriod, n.stochastic.smooth) : null,
    williamsR: n.williamsR?.enabled ? uu(M, T, h, n.williamsR.period) : null,
    cci: n.cci?.enabled ? cu(M, T, h, n.cci.period) : null,
    adx: n.adx?.enabled ? iu(M, T, h, n.adx.period) : null,
    roc: n.roc?.enabled ? au(h, n.roc.period) : null,
    vwap: n.vwap?.enabled ? ru(M, T, h, ne, Ce) : null,
    ichimoku: n.ichimoku?.enabled ? lu(M, T, h, n.ichimoku.tenkanPeriod, n.ichimoku.kijunPeriod, n.ichimoku.senkouBPeriod, n.ichimoku.displacement) : null,
    parabolicSAR: n.parabolicSAR?.enabled ? ou(M, T, n.parabolicSAR.afStart, n.parabolicSAR.afStep, n.parabolicSAR.afMax) : null,
    keltner: n.keltner?.enabled ? su(M, T, h, n.keltner.emaPeriod, n.keltner.atrPeriod, n.keltner.multiplier) : null,
    pivotPoints: n.pivotPoints?.enabled ? nu(Ce, M, T, h) : null,
    supertrend: n.supertrend?.enabled ? tu(M, T, h, n.supertrend.period, n.supertrend.multiplier) : null,
    donchian: n.donchian?.enabled ? eu(M, T, n.donchian.period) : null,
    aroon: n.aroon?.enabled ? Qc(M, T, n.aroon.period) : null,
    envelopes: n.envelopes?.enabled ? Jc(h, n.envelopes.period, n.envelopes.percent) : null,
    dema: n.dema?.enabled ? Zc(h, n.dema.period) : null,
    tema: n.tema?.enabled ? Gc(h, n.tema.period) : null,
    hma: n.hma?.enabled ? qc(h, n.hma.period) : null,
    momentum: n.momentum?.enabled ? Uc(h, n.momentum.period) : null,
    awesomeOsc: n.awesomeOsc?.enabled ? Kc(M, T) : null,
    mfi: n.mfi?.enabled ? zc(M, T, h, ne, n.mfi.period) : null,
    tsi: n.tsi?.enabled ? Yc(h, n.tsi.longPeriod, n.tsi.shortPeriod, n.tsi.signalPeriod) : null,
    trix: n.trix?.enabled ? Xc(h, n.trix.period, n.trix.signalPeriod) : null,
    ultimateOsc: n.ultimateOsc?.enabled ? Vc(M, T, h, n.ultimateOsc.fast, n.ultimateOsc.med, n.ultimateOsc.slow) : null,
    dpo: n.dpo?.enabled ? Hc(h, n.dpo.period) : null,
    kst: n.kst?.enabled ? $c(h, n.kst.roc1, n.kst.roc2, n.kst.roc3, n.kst.roc4, n.kst.sma1, n.kst.sma2, n.kst.sma3, n.kst.sma4, n.kst.signalPeriod) : null,
    stochRsi: n.stochRsi?.enabled ? _c(h, n.stochRsi.rsiPeriod, n.stochRsi.kPeriod, n.stochRsi.dPeriod) : null,
    bbPercent: n.bbPercent?.enabled ? Oc(h, n.bbPercent.period, n.bbPercent.stdDev) : null,
    bbWidth: n.bbWidth?.enabled ? Fc(h, n.bbWidth.period, n.bbWidth.stdDev) : null,
    histVol: n.histVol?.enabled ? Wc(h, n.histVol.period) : null,
    chaikinVol: n.chaikinVol?.enabled ? Bc(M, T, n.chaikinVol.emaPeriod, n.chaikinVol.rocPeriod) : null,
    stdDev: n.stdDev?.enabled ? Dc(h, n.stdDev.period) : null,
    obv: n.obv?.enabled ? Ac(h, ne) : null,
    cmf: n.cmf?.enabled ? Ec(M, T, h, ne, n.cmf.period) : null,
    adl: n.adl?.enabled ? Lc(M, T, h, ne) : null,
    forceIndex: n.forceIndex?.enabled ? Nc(h, ne, n.forceIndex.period) : null,
    eom: n.eom?.enabled ? jc(M, T, ne, n.eom.period) : null,
    volumeSma: n.volumeSma?.enabled ? Pc(ne, n.volumeSma.period) : null,
    fibRetracement: n.fibRetracement?.enabled ? Rc(M, T, n.fibRetracement.lookback) : null,
    camarillaPivots: n.camarillaPivots?.enabled ? Mc(Ce, M, T, h) : null,
    woodiePivots: n.woodiePivots?.enabled ? Ic(Ce, M, T, h) : null,
    correlation: n.correlation?.enabled ? Tc(h, ne, n.correlation.period) : null,
    linearReg: n.linearReg?.enabled ? Cc(h, n.linearReg.period, n.linearReg.deviations) : null,
    coppock: n.coppock?.enabled ? Sc(h, n.coppock.longROC, n.coppock.shortROC, n.coppock.wmaPeriod) : null,
    alma: n.alma?.enabled ? wc(h, n.alma.period, n.alma.offset, n.alma.sigma) : null,
    kama: n.kama?.enabled ? kc(h, n.kama.period, n.kama.fastPeriod, n.kama.slowPeriod) : null,
    zlema: n.zlema?.enabled ? yc(h, n.zlema.period) : null,
    t3: n.t3?.enabled ? vc(h, n.t3.period, n.t3.vFactor) : null,
    lsma: n.lsma?.enabled ? gc(h, n.lsma.period) : null,
    mcginley: n.mcginley?.enabled ? bc(h, n.mcginley.period) : null,
    vortex: n.vortex?.enabled ? xc(M, T, h, n.vortex.period) : null,
    choppiness: n.choppiness?.enabled ? mc(M, T, h, n.choppiness.period) : null,
    elderRay: n.elderRay?.enabled ? pc(M, T, h, n.elderRay.period) : null,
    massIndex: n.massIndex?.enabled ? fc(M, T, n.massIndex.period) : null,
    chandeKroll: n.chandeKroll?.enabled ? hc(M, T, h, n.chandeKroll.p, n.chandeKroll.q, n.chandeKroll.x) : null,
    chandelierExit: n.chandelierExit?.enabled ? dc(M, T, h, n.chandelierExit.period, n.chandelierExit.multiplier) : null,
    linRegSlope: n.linRegSlope?.enabled ? uc(h, n.linRegSlope.period) : null,
    priceChannel: n.priceChannel?.enabled ? cc(M, T, n.priceChannel.period) : null,
    alligator: n.alligator?.enabled ? ic(h) : null,
    accBands: n.accBands?.enabled ? ac(M, T, h, n.accBands.period) : null,
    ppo: n.ppo?.enabled ? rc(h, n.ppo.fast, n.ppo.slow, n.ppo.signal) : null,
    pvo: n.pvo?.enabled ? lc(ne, n.pvo.fast, n.pvo.slow, n.pvo.signal) : null,
    cmo: n.cmo?.enabled ? oc(h, n.cmo.period) : null,
    fisher: n.fisher?.enabled ? sc(M, T, n.fisher.period) : null,
    stc: n.stc?.enabled ? nc(h, n.stc.fast, n.stc.slow, n.stc.cycle) : null,
    rviOsc: n.rviOsc?.enabled ? tc(ee, M, T, h, n.rviOsc.period) : null,
    klinger: n.klinger?.enabled ? ec(M, T, h, ne, n.klinger.fast, n.klinger.slow, n.klinger.signal) : null,
    connorsRsi: n.connorsRsi?.enabled ? Qi(h, n.connorsRsi.rsiPeriod, n.connorsRsi.streakPeriod, n.connorsRsi.rankPeriod) : null,
    apo: n.apo?.enabled ? Ji(h, n.apo.fast, n.apo.slow) : null,
    qstick: n.qstick?.enabled ? Zi(ee, h, n.qstick.period) : null,
    bop: n.bop?.enabled ? Gi(ee, M, T, h, n.bop.period) : null,
    psychLine: n.psychLine?.enabled ? qi(h, n.psychLine.period) : null,
    pfe: n.pfe?.enabled ? Ui(h, n.pfe.period, n.pfe.smoothing) : null,
    smi: n.smi?.enabled ? Ki(M, T, h, n.smi.period, n.smi.smoothK, n.smi.smoothD) : null,
    ulcerIndex: n.ulcerIndex?.enabled ? zi(h, n.ulcerIndex.period) : null,
    natr: n.natr?.enabled ? Yi(M, T, h, n.natr.period) : null,
    trueRange: n.trueRange?.enabled ? Xi(M, T, h) : null,
    squeeze: n.squeeze?.enabled ? Vi(M, T, h, n.squeeze.bbPeriod, n.squeeze.bbMult, n.squeeze.kcPeriod, n.squeeze.kcMult) : null,
    relVolIndex: n.relVolIndex?.enabled ? Hi(h, n.relVolIndex.period, n.relVolIndex.smoothing) : null,
    vhf: n.vhf?.enabled ? $i(h, n.vhf.period) : null,
    vwma: n.vwma?.enabled ? _i(h, ne, n.vwma.period) : null,
    volumeOsc: n.volumeOsc?.enabled ? Oi(ne, n.volumeOsc.fast, n.volumeOsc.slow) : null,
    nvi: n.nvi?.enabled ? Fi(h, ne) : null,
    pvi: n.pvi?.enabled ? Wi(h, ne) : null,
    pvt: n.pvt?.enabled ? Bi(h, ne) : null,
    vroc: n.vroc?.enabled ? Di(ne, n.vroc.period) : null,
    netVolume: n.netVolume?.enabled ? Ai(h, ne, n.netVolume.period) : null,
    twiggsMF: n.twiggsMF?.enabled ? Ei(M, T, h, ne, n.twiggsMF.period) : null,
    linRegRSquared: n.linRegRSquared?.enabled ? Li(h, n.linRegRSquared.period) : null,
    medianPrice: n.medianPrice?.enabled ? Ni(M, T) : null,
    typicalPrice: n.typicalPrice?.enabled ? ji(M, T, h) : null,
    weightedClose: n.weightedClose?.enabled ? Pi(M, T, h) : null,
    demarkPivots: n.demarkPivots?.enabled ? Ri(Ce, M, T, ee, h) : null,
    zigzag: n.zigzag?.enabled ? Mi(M, T, h, n.zigzag.deviation) : null,
    fractals: n.fractals?.enabled ? Ii(M, T) : null,
    gator: n.gator?.enabled ? Ti(h) : null,
    smmaOverlay: n.smmaOverlay?.enabled ? Ar(h, n.smmaOverlay.period) : null,
    wma: n.wma?.enabled ? Ci(h, n.wma.period) : null,
    customIndicators: (n.customIndicators || []).filter((oe) => oe.enabled).map((oe) => {
      if (typeof oe.expression == "string" && (oe.expression.startsWith("brue:") || oe.expression.startsWith("local:")) && Array.isArray(oe.data) && oe.data.length > 0)
        return oe;
      const Oe = { closes: h, highs: M, lows: T, opens: ee, volumes: ne, timestamps: Ce }, Ge = Si(oe.expression, Oe);
      return { ...oe, data: Ge.errors.length === 0 ? Ge.data : new Array(h.length).fill(NaN) };
    })
  };
}
function td(l, n) {
  if (n <= 0) return l;
  const h = new Array(n).fill(NaN), M = {};
  for (const T of Object.keys(l)) {
    const ee = l[T];
    if (ee == null) {
      M[T] = ee;
      continue;
    }
    if (Array.isArray(ee)) {
      ee.length > 0 && typeof ee[0] == "object" && ee[0] !== null && "data" in ee[0] ? M[T] = ee.map((ne) => ({ ...ne, data: h.concat(ne.data || []) })) : M[T] = h.concat(ee);
      continue;
    }
    if (typeof ee == "object") {
      const ne = {};
      for (const Ce of Object.keys(ee)) {
        const r = ee[Ce];
        if (Array.isArray(r)) ne[Ce] = h.concat(r);
        else if (typeof r == "object" && r !== null) {
          const ye = {};
          for (const oe of Object.keys(r)) {
            const Oe = r[oe];
            ye[oe] = Array.isArray(Oe) ? h.concat(Oe) : Oe;
          }
          ne[Ce] = ye;
        } else ne[Ce] = r;
      }
      M[T] = ne;
      continue;
    }
    M[T] = ee;
  }
  return M;
}
let Jo = null, nd = 0;
function Fr() {
  return Jo || (Jo = new Worker(new URL(
    /* @vite-ignore */
    "/assets/indicatorWorker-DBDvDVhS.js",
    import.meta.url
  ), { type: "module" }), Jo);
}
function sd(l, n, h) {
  const [M, T] = o.useState(null), [ee, ne] = o.useState(!1), [Ce, r] = o.useState(null), ye = o.useRef(null), oe = o.useRef(null), Oe = o.useRef(0), Ge = o.useRef(null), Ne = o.useCallback((Fe) => {
    const { id: ge, result: Ye, error: fe, durationMs: Ee } = Fe.data;
    if (!(Ge.current !== null && ge !== Ge.current)) {
      if (Ge.current = null, ne(!1), fe) {
        console.warn("[indicatorWorker] error", fe);
        return;
      }
      Ee !== void 0 && r(Ee), l.length > 0 && (Oe.current = l[0].close), oe.current = Ye, T(Ye);
    }
  }, [l]);
  return o.useEffect(() => {
    const Fe = Fr();
    return Fe.addEventListener("message", Ne), () => Fe.removeEventListener("message", Ne);
  }, [Ne]), o.useEffect(() => {
    if (!n || l.length === 0) {
      T(null);
      return;
    }
    const Fe = l.length > 0 ? l[0].close : 0;
    if (h.current && oe.current && Oe.current === Fe)
      return;
    const ge = ye.current;
    let Ye, fe, Ee, _e, Je, Y, de = null;
    const ze = ge && ge.candles !== l && l.length >= ge.closes.length && l.length > 0 && ge.closes.length > 0 && l[0].time === ge.timestamps[0] && ge.closes.length > 10;
    let re = 0;
    const ct = !ze && ge && ge.candles !== l && l.length > ge.closes.length && ge.closes.length > 10 && l.length - ge.closes.length > 0 && l[l.length - ge.closes.length]?.time === ge.timestamps[0];
    if (ct && (re = l.length - ge.closes.length), ze) {
      const tt = ge.closes.length, xt = Math.max(0, tt - 1);
      Ye = ge.closes, fe = ge.highs, Ee = ge.lows, _e = ge.opens, Je = ge.volumes, Y = ge.timestamps, Ye.length = xt, fe.length = xt, Ee.length = xt, _e.length = xt, Je.length = xt, Y.length = xt;
      for (let It = xt; It < l.length; It++) {
        const Nt = l[It];
        Ye.push(Nt.close), fe.push(Nt.high), Ee.push(Nt.low), _e.push(Nt.open), Je.push(Nt.volume || 0), Y.push(Nt.time);
      }
      de = { closes: Ye, highs: fe, lows: Ee, opens: _e, volumes: Je, timestamps: Y }, ye.current = { candles: l, closes: Ye, highs: fe, lows: Ee, opens: _e, volumes: Je, timestamps: Y };
      const tn = Object.values(n).filter((It) => It?.enabled).length;
      if (!(l.length > 3e3 && tn > 3)) {
        const It = performance.now(), Nt = Wr(de, n), nn = performance.now() - It;
        r(nn), oe.current = Nt, Oe.current = Fe, T(Nt);
        return;
      }
    } else if (ct && oe.current) {
      const tt = new Array(re), xt = new Array(re), tn = new Array(re), kn = new Array(re), It = new Array(re), Nt = new Array(re);
      for (let zt = 0; zt < re; zt++) {
        const an = l[zt];
        tt[zt] = an.close, xt[zt] = an.high, tn[zt] = an.low, kn[zt] = an.open, It[zt] = an.volume || 0, Nt[zt] = an.time;
      }
      Ye = tt.concat(ge.closes), fe = xt.concat(ge.highs), Ee = tn.concat(ge.lows), _e = kn.concat(ge.opens), Je = It.concat(ge.volumes), Y = Nt.concat(ge.timestamps);
      const nn = td(oe.current, re);
      ye.current = { candles: l, closes: Ye, highs: fe, lows: Ee, opens: _e, volumes: Je, timestamps: Y }, oe.current = nn, Oe.current = Fe, T(nn);
      return;
    } else
      Ye = l.map((tt) => tt.close), fe = l.map((tt) => tt.high), Ee = l.map((tt) => tt.low), _e = l.map((tt) => tt.open), Je = l.map((tt) => tt.volume || 0), Y = l.map((tt) => tt.time), de = { closes: Ye, highs: fe, lows: Ee, opens: _e, volumes: Je, timestamps: Y }, ye.current = { candles: l, closes: Ye, highs: fe, lows: Ee, opens: _e, volumes: Je, timestamps: Y };
    de || (de = { closes: Ye, highs: fe, lows: Ee, opens: _e, volumes: Je, timestamps: Y });
    const Qe = Object.values(n).filter((tt) => tt?.enabled).length;
    if (!(l.length > 1e3 || Qe > 5 || (n.customIndicators?.filter((tt) => tt.enabled)?.length || 0) > 0)) {
      const tt = performance.now(), xt = Wr(de, n), tn = performance.now() - tt;
      r(tn), oe.current = xt, Oe.current = Fe, T(xt);
      return;
    }
    ne(!0);
    const Ht = Fr(), Vt = ++nd;
    Ge.current = Vt, Ht.postMessage({ id: Vt, price: de, indicators: n });
  }, [l, n, h]), { indicatorData: M, isComputing: ee, computeDurationMs: Ce };
}
function po(l) {
  const {
    ctx: n,
    candles: h,
    startIndex: M,
    indexToX: T,
    priceToY: ee,
    morphAt: ne,
    candleBodyWidth: Ce,
    wickWidth: r,
    colors: ye
  } = l, oe = new Path2D(), Oe = new Path2D(), Ge = Ce / 2, Ne = h.length, Fe = new Float64Array(Ne), ge = new Float64Array(Ne), Ye = new Float64Array(Ne), fe = new Float64Array(Ne), Ee = new Float64Array(Ne), _e = new Float64Array(Ne), Je = new Float64Array(Ne), Y = new Float64Array(Ne);
  let de = 0, ze = 0;
  for (let re = 0; re < h.length; re++) {
    const ct = ne(re, h[re]), Qe = T(M + re, M), Ae = ee(ct.open), Ht = ee(ct.close), Vt = ee(ct.high), tt = ee(ct.low), xt = Math.min(Ae, Ht), tn = Math.max(1, Math.abs(Ht - Ae));
    ct.close >= ct.open ? (oe.moveTo(Qe, Vt), oe.lineTo(Qe, tt), Fe[de] = Qe - Ge, ge[de] = xt, Ye[de] = Ce, fe[de] = tn, de++) : (Oe.moveTo(Qe, Vt), Oe.lineTo(Qe, tt), Ee[ze] = Qe - Ge, _e[ze] = xt, Je[ze] = Ce, Y[ze] = tn, ze++);
  }
  if (n.lineWidth = r, n.lineCap = "round", de) {
    n.strokeStyle = ye.bullishWick, n.stroke(oe), n.fillStyle = ye.bullish;
    for (let re = 0; re < de; re++)
      n.fillRect(Fe[re], ge[re], Ye[re], fe[re]);
  }
  if (ze) {
    n.strokeStyle = ye.bearishWick, n.stroke(Oe), n.fillStyle = ye.bearish;
    for (let re = 0; re < ze; re++)
      n.fillRect(Ee[re], _e[re], Je[re], Y[re]);
  }
  if (n.lineCap = "butt", n.lineWidth = 1, de) {
    n.strokeStyle = ye.bullishBorder;
    for (let re = 0; re < de; re++)
      n.strokeRect(Fe[re], ge[re], Ye[re], fe[re]);
  }
  if (ze) {
    n.strokeStyle = ye.bearishBorder;
    for (let re = 0; re < ze; re++)
      n.strokeRect(Ee[re], _e[re], Je[re], Y[re]);
  }
}
const od = (l) => {
  const n = (l || "").toUpperCase();
  if (n.includes("XAU") || n.includes("XAG")) return 0.8;
  if (n.includes("NAS100") || n.includes("SPX500") || n.includes("US30") || n.includes("US2000")) return 1.5;
  if (n.includes("BCO") || n.includes("WTICO")) return 0.05;
  if (n.includes("BTC")) return 4;
  if (n.includes("ETH")) return 2;
  if (n.includes("JPY")) return 1e-3;
  const h = n.replace("/", "");
  return h.length === 6 && /EUR|GBP|AUD|NZD|CAD|CHF|USD/.test(h) ? 1e-5 : 0.04;
}, ld = (l, n) => od(l), Ul = ({
  candles: l,
  livePrice: n,
  symbol: h = "",
  timezone: M = "UTC",
  countdown: T,
  onCrosshairMove: ee,
  syncedCrosshairTime: ne,
  colors: Ce,
  indicators: r,
  onIndicatorsChange: ye,
  onRemoveBruePlot: oe,
  onRemoveEngineIndicator: Oe,
  onEditEngineIndicator: Ge,
  onConverterReady: Ne,
  onVisibleRangeChange: Fe,
  onViewportTimeChange: ge,
  syncedViewportTime: Ye,
  disableAutoFollow: fe = !1,
  scrollToIndex: Ee,
  chartType: _e = "candlestick",
  onScrollingChange: Je,
  onScrollSync: Y,
  scrollOffsetRef: de,
  optionsPdfEnabled: ze = !1,
  heatmapEnabled: re = !1,
  externalDimensions: ct,
  economicEvents: Qe,
  positionLines: Ae,
  onPositionModify: Ht,
  onPositionClose: Vt,
  autoSelectPositionId: tt,
  l2DepthData: xt,
  onOpenSettings: tn,
  onOpenCustomEditor: kn,
  showBidAskSpread: It = !1,
  brokerBid: Nt = null,
  brokerAsk: nn = null,
  showSessions: zt = !1,
  timeframe: an = "5m",
  rightOffset: Xn,
  onLoadMore: As,
  isLoadingMore: wo = !1,
  prependShift: ks = 0,
  drawings: ss,
  selectedDrawingId: ws,
  drawingCursorRef: Ss,
  requestRedrawRef: zs,
  isDrawingDragging: So = !1
}) => {
  const ot = o.useRef(null), Co = o.useRef(null), Ke = o.useRef(null), Ds = o.useRef(null), Ks = o.useRef(!1), Us = o.useRef(null);
  o.useRef(null);
  const qs = o.useRef(l), To = o.useRef(ne ?? null), Bs = o.useRef(!1), Gs = o.useRef(null), wn = typeof window < "u" ? Math.min(window.devicePixelRatio || 1, 2) : 1, [pe, Zs] = o.useState({ width: 300, height: 300 }), [ae, Lt] = o.useState({
    startIndex: 0,
    candleWidth: 3,
    // Zoomed out default - shows more candles on first load
    // Backtest/replay mode has no future candles arriving, so zero right-side padding.
    // TERMINAL DIVERGENCE from the site port: the site keeps 35 future candles
    // for economic event flags, but the terminal draws no flags on the chart
    // (ECONOMIC is its own tab), so that margin was pure dead space on the
    // right and was dropped.
    futureSpace: 0,
    autoFollowLatest: !fe
    // Start disabled if in replay mode
  }), Re = o.useRef({
    startIndex: 0,
    candleWidth: 3
  }), Yn = o.useRef({
    startIndex: 0,
    candleWidth: 3
  }), Mt = o.useRef(!1), cn = o.useRef(!1), Pe = o.useRef(null), ut = o.useRef(null), at = o.useRef(null), it = o.useRef(null), Wn = o.useRef(null), zn = o.useRef(0), [, sn] = o.useState(0), os = o.useRef(null), Kn = (a) => {
    const p = Pe.current, x = os.current;
    if (p && x && x.posId === p) return x.offset;
    const y = on.current, f = y && y.range > 0 ? y.range * 0.18 : a * 5e-3;
    return os.current = p && f > 0 ? { posId: p, offset: f } : null, f;
  }, Js = o.useRef(null);
  o.useEffect(() => {
    if (tt && tt !== Js.current && Ae) {
      const a = Ae.find((p) => p.id === tt);
      a && (Js.current = tt, Pe.current = a.id, ut.current = a.stopLoss ?? null, at.current = a.takeProfit ?? null, sn((p) => p + 1));
    }
  }, [tt, Ae]);
  const ls = o.useRef(0), Wt = o.useCallback((a) => {
    Mt.current = a, cn.current !== a && (cn.current = a, Je?.(a), a || (ls.current = Re.current.startIndex, de && (de.current = 0)));
  }, [Je, de]), St = o.useCallback(() => {
    if (de) {
      const a = Re.current.startIndex, p = Re.current.candleWidth * (1 + He), x = a - ls.current;
      de.current = x * p;
    }
    Y?.();
  }, [Y, de]), Un = o.useRef(St);
  Un.current = St;
  const Sn = o.useRef(null), Fn = o.useRef(null), qn = o.useRef(null), Ws = o.useRef(!1), nt = o.useCallback((a = !1) => {
    if (qn.current !== null) {
      a || (Ws.current = !1);
      return;
    }
    Ws.current = a, qn.current = requestAnimationFrame(() => {
      qn.current = null;
      const p = Ws.current;
      Sn.current && Sn.current(p);
    });
  }, []);
  o.useCallback((a = !1) => {
    qn.current !== null && (cancelAnimationFrame(qn.current), qn.current = null), Sn.current && Sn.current(a);
  }, []);
  const Gn = o.useRef(null), rs = o.useRef(0), Io = o.useRef(0), Cn = o.useRef(!1), Qs = o.useRef(0), Tn = o.useRef(null), Cs = o.useRef(void 0), On = o.useRef(null), Zt = o.useRef("standard"), [In, as] = o.useState([]), ft = o.useRef(null), un = o.useRef(null), Ts = o.useRef([]), Is = o.useRef(null), fn = o.useRef(null), [Mn, is] = o.useState(!1), [pn, Mo] = o.useState({ x: 0, y: 0, startIndex: 0, priceOffset: 0 }), [Ro, Po] = o.useState(0), [rl, jo] = o.useState(1), pt = o.useRef(null), Ct = o.useRef(null), Rn = o.useRef(0), eo = o.useRef(null), lt = o.useRef(null), [Pn, cs] = o.useState(!1), us = o.useRef(null), Fs = o.useRef(0), Os = o.useRef(0), jn = o.useRef(!1);
  o.useRef(0), o.useRef(0);
  const mn = o.useRef(null), _n = o.useRef(null), xn = o.useRef(null), al = o.useRef(null), v = "ns-resize", Q = "ns-resize";
  o.useRef(12), o.useRef(0), o.useRef(0);
  const [q, be] = o.useState(0.15), [vt, je] = o.useState(!1), Et = o.useRef({ y: 0, ratio: 0 });
  o.useRef(null);
  const [Xt, Le] = o.useState(1), [bt, ds] = o.useState(0), [Kt, Rt] = o.useState(null), [At, Qr] = o.useState(null), [Zl, il] = o.useState(!1), [Jl, ea] = o.useState(!1), to = o.useRef({ y: 0, scale: 1, offset: 0 }), hs = Kt !== null, bn = o.useRef(1), Zn = o.useRef(0), Jn = o.useRef(null), on = o.useRef(null), ln = o.useRef(0), Ms = o.useRef(null), [Qn, ta] = xu("preferences.chartShowOHLC", !0), [Ql, na] = o.useState(0), [no, er] = o.useState(!1), [lh, sa] = o.useState(0), cl = o.useRef(null), ul = o.useRef(!1);
  o.useEffect(() => {
    if (!no) return;
    const a = setInterval(() => sa((p) => p + 1), 3e4);
    return () => clearInterval(a);
  }, [no]), o.useEffect(() => {
    Qe && Qe.length > 0 && bu(Qe.map((a) => a.region_code));
  }, [Qe]), o.useEffect(() => {
    if (!no) return;
    const a = (p) => {
      cl.current && !cl.current.contains(p.target) && er(!1);
    };
    return document.addEventListener("mousedown", a), () => document.removeEventListener("mousedown", a);
  }, [no]);
  const [dl, oa] = o.useState(0), [hl, la] = o.useState(0), [fl, ra] = o.useState(0), [pl, aa] = o.useState(0), [ml, ia] = o.useState(0), _s = o.useRef({}), [rt, ca] = o.useState({}), $n = o.useRef({}), [tr, ua] = o.useState({}), [nr, xl] = o.useState(null), [so, $s] = o.useState(null), Jt = o.useRef({});
  o.useRef(null);
  const sr = o.useRef(!1), Qt = o.useRef(!1), gt = o.useRef(null), [da, ve] = o.useState(null), [Tt, he] = o.useState(null), [Nn, yt] = o.useState(null), or = typeof navigator < "u" && /Mac|iPhone|iPad|iPod/.test(navigator.platform), [oo, ha] = o.useState(or ? 8 : 2), bl = o.useRef(or), lo = ol(), gl = o.useRef(lo);
  gl.current = lo, o.useEffect(() => {
    lo.chart?.scrollSensitivity !== void 0 && ha(lo.chart.scrollSensitivity);
  }, [lo.chart?.scrollSensitivity]);
  const te = { ...ll(), ...Ce }, lr = typeof document < "u" && document.documentElement.classList.contains("dark");
  o.useEffect(() => {
    Mt.current || (Re.current = {
      startIndex: ae.startIndex,
      candleWidth: ae.candleWidth
    });
  }, [ae.startIndex, ae.candleWidth]), o.useEffect(() => {
    bn.current = Xt, Zn.current = bt;
  }, [Xt, bt]), o.useEffect(() => {
    if (!ae.autoFollowLatest) return;
    const a = setInterval(() => {
      Po((p) => (p + 0.1) % (Math.PI * 2)), jo(0.85 + Math.sin(Date.now() / 1e3) * 0.15);
    }, 150);
    return () => clearInterval(a);
  }, [ae.autoFollowLatest]), o.useEffect(() => {
    qs.current = l;
    const a = l[l.length - 1];
    a && (Us.current = {
      time: a.time,
      open: a.open,
      high: a.high,
      low: a.low,
      close: a.close
    }, ae.autoFollowLatest && Sn.current && Sn.current(!0));
  }, [l, ae.autoFollowLatest]), o.useEffect(() => {
    const p = ((f) => {
      const e = f.toUpperCase().replace("_", "").replace("/", ""), F = [
        "SPY",
        "QQQ",
        "IWM",
        "DIA",
        "XLF",
        "XLE",
        "GLD",
        "EEM",
        "TLT",
        "ARKK",
        "AAPL",
        "MSFT",
        "GOOGL",
        "AMZN",
        "META",
        "NVDA",
        "TSLA",
        "NFLX",
        "CRM",
        "ORCL",
        "ADBE",
        "AVGO",
        "AMD",
        "INTC",
        "MU",
        "QCOM",
        "MRVL",
        "ARM",
        "JPM",
        "GS",
        "BAC",
        "C",
        "V",
        "MA",
        "COIN",
        "SOFI",
        "COST",
        "WMT",
        "NKE",
        "SBUX",
        "DIS",
        "BA",
        "CAT",
        "XOM",
        "CVX",
        "UNH",
        "JNJ",
        "PFE",
        "LLY",
        "ABBV",
        "PLTR",
        "SNAP",
        "UBER",
        "SQ",
        "SHOP",
        "RIOT",
        "MARA"
      ];
      for (const $ of F)
        if (e === $ || e.startsWith($)) return { ticker: $, etfDragPerYear: 0 };
      return e.includes("XAU") || e.includes("GOLD") ? { ticker: "GLD", etfDragPerYear: 4e-3 } : e.includes("SPX500") || e.includes("SPX") ? { ticker: "SPY", etfDragPerYear: 0 } : e.includes("NAS100") || e.includes("NDX") ? { ticker: "QQQ", etfDragPerYear: 0 } : e.includes("US30") || e.includes("DJI") ? { ticker: "DIA", etfDragPerYear: 0 } : null;
    })(h);
    if (!p || !ze) {
      xl(null);
      return;
    }
    const x = async () => {
      try {
        const f = [];
        if (!f || f.length === 0) {
          xl(null);
          return;
        }
        const e = f[0], F = l[l.length - 1]?.close || parseFloat(e.current_price), $ = parseFloat(e.current_price), K = $ > 0 ? F / $ : 1;
        let O = 0;
        if (e.expiration) {
          const V = new Date(e.expiration).getTime();
          Number.isNaN(V) || (O = Math.max(0, (V - Date.now()) / (365 * 24 * 3600 * 1e3)));
        }
        const b = Math.exp(p.etfDragPerYear * O), w = K * b;
        let A = [];
        e.density_curve && Array.isArray(e.density_curve) && (A = e.density_curve.map((V) => ({
          p: V.p * w,
          d: V.d
        }))), xl({
          currentPrice: parseFloat(e.current_price) * K,
          predictedPrice: parseFloat(e.predicted_price) * w,
          modePrice: e.mode_price ? parseFloat(e.mode_price) * w : parseFloat(e.predicted_price) * w,
          direction: e.direction,
          distancePct: parseFloat(e.distance_pct),
          probAbove: parseFloat(e.prob_above || "0.5"),
          probBelow: parseFloat(e.prob_below || "0.5"),
          confidence: parseFloat(e.confidence || "0.5"),
          densityCurve: A
        });
      } catch (f) {
        console.error("Failed to fetch predicted price:", f);
      }
    };
    x();
    const y = setInterval(x, 6e4);
    return () => clearInterval(y);
  }, [h, ze]), o.useEffect(() => {
    if (!re || !h) {
      as([]);
      return;
    }
    const a = async () => {
      try {
        const x = h.includes("/") ? h : h.length === 6 ? `${h.substring(0, 3)}/${h.substring(3)}` : h, y = await $u("l2_heatmap_snapshots", {
          params: { symbol: `eq.${x}`, order: "timestamp.desc", limit: "300" }
        });
        y && y.length > 0 && as(y.reverse());
      } catch (x) {
        console.error("Failed to fetch heatmap data:", x);
      }
    };
    a();
    const p = setInterval(a, 5e3);
    return () => clearInterval(p);
  }, [h, re]), o.useEffect(() => () => {
    pt.current !== null && cancelAnimationFrame(pt.current), un.current !== null && cancelAnimationFrame(un.current), mn.current !== null && cancelAnimationFrame(mn.current), _n.current !== null && cancelAnimationFrame(_n.current), xn.current !== null && cancelAnimationFrame(xn.current), Ct.current !== null && clearTimeout(Ct.current), Jn.current !== null && clearTimeout(Jn.current);
  }, []);
  const { isPhone: fa, isDesktop: No } = gu(pe.width), $e = o.useMemo(() => vu(pe.width), [pe.width]), rr = fa, ar = n || (l.length > 0 ? l[l.length - 1]?.close : 100), Ve = o.useMemo(() => yu(rr, h, ar || 100, Xn), [rr, No, h, ar, Xn]), kt = $e.timeAxisHeight, Lo = $e.priceLabelFont, ir = $e.timeLabelFont, Yt = $e.subplotLabelFont, Eo = 1, Ao = 50, fs = o.useMemo(() => {
    const a = [], x = Math.pow(Ao / Eo, 0.025);
    for (let y = 0; y <= 40; y++)
      a.push(Eo * Math.pow(x, y));
    return a;
  }, []), Ln = o.useCallback((a = !1) => {
    const p = pe.width - Ve, x = a && Mt.current ? Re.current : ae, y = x.candleWidth * (1 + He), f = Math.floor(p / y), e = Math.max(0, Math.floor(x.startIndex)), F = Math.min(l.length, e + f);
    return {
      candles: l.slice(e, F),
      startIndex: e,
      endIndex: F,
      visibleCount: f,
      totalWithFuture: f + ae.futureSpace,
      candleWidth: x.candleWidth
    };
  }, [l, pe.width, ae]);
  o.useEffect(() => {
    if (l.length > 0) {
      const a = pe.width - Ve, p = ae.candleWidth * (1 + He), x = Math.floor(a / p), y = Math.max(0, Math.floor(ae.startIndex)), f = Math.min(l.length, y + x);
      Fe && Fe({ startIndex: y, endIndex: f, totalCandles: l.length }), As && y < 2500 && !wo && !jn.current && !ae.autoFollowLatest && (Tn.current && clearTimeout(Tn.current), Tn.current = setTimeout(() => {
        jn.current || As();
      }, 100));
    }
  }, [Fe, As, wo, l.length, ae.startIndex, ae.candleWidth, pe.width, ae.autoFollowLatest]), o.useEffect(() => {
    if (!ge || l.length === 0) return;
    if (Bs.current) {
      Bs.current = !1;
      return;
    }
    const a = pe.width - Ve, p = ae.candleWidth * (1 + He), x = Math.floor(a / p), y = Math.max(0, Math.floor(ae.startIndex)), f = Math.min(l.length, y + x), e = l.slice(y, f);
    if (e.length === 0) return;
    const F = Math.floor(e.length / 2), $ = e[F];
    $ && $.time !== Gs.current && (Gs.current = $.time, ge($.time));
  }, [ge, l, ae.startIndex, ae.candleWidth, pe.width]), o.useEffect(() => {
    if (!Ye || l.length === 0 || Ye === Gs.current) return;
    let a = -1, p = 1 / 0;
    for (let A = 0; A < l.length; A++) {
      const V = Math.abs(l[A].time - Ye);
      V < p && (p = V, a = A);
    }
    if (a === -1) return;
    const x = pe.width - Ve, y = ae.candleWidth * (1 + He), f = Math.floor(x / y), e = Math.max(0, Math.floor(ae.startIndex)), F = Math.min(l.length, e + f), $ = Math.floor(f / 2), K = Math.max(0, a - $), O = a >= e && a < F, b = e + Math.floor(f / 2);
    (!O || Math.abs(a - b) > $ / 2) && (Bs.current = !0, Lt((A) => ({
      ...A,
      startIndex: K,
      autoFollowLatest: !1
    })), Re.current.startIndex = K);
  }, [Ye, l, pe.width, ae.candleWidth, ae.startIndex]);
  const Rs = o.useCallback((a, p = !0) => {
    if (Kt !== null && At !== null) {
      const K = bn.current, O = Zn.current, b = At / K, w = Kt + O;
      return {
        min: w - b / 2,
        max: w + b / 2,
        range: b
      };
    }
    if (a.length === 0)
      return { min: 0, max: 100, range: 100 };
    let x = 1 / 0, y = -1 / 0;
    for (const K of a)
      K.low < x && (x = K.low), K.high > y && (y = K.high);
    p && n && (n < x && (x = n), n > y && (y = n));
    const f = y - x, e = f * 0.05, F = (y + x) / 2, $ = f + e * 2;
    return {
      min: F - $ / 2,
      max: F + $ / 2,
      range: $
    };
  }, [n, Kt, At]), dt = o.useCallback((a, p) => {
    const y = [
      "rsi",
      "macd",
      "atr",
      "stochastic",
      "williamsR",
      "cci",
      "adx",
      "roc",
      "aroon",
      "momentum",
      "ao",
      "mfi",
      "tsi",
      "trix",
      "ultimateOsc",
      "dpo",
      "kst",
      "stochRsi",
      "bbPercent",
      "bbWidth",
      "histVol",
      "chaikinVol",
      "stdDev",
      "obv",
      "cmf",
      "adl",
      "forceIndex",
      "eom",
      "correlation",
      "coppock",
      // Phase 2 subplots
      "vortex",
      "choppiness",
      "elderRay",
      "massIndex",
      "linRegSlope",
      "ppo",
      "pvo",
      "cmo",
      "fisher",
      "stc",
      "rviOsc",
      "klinger",
      "connorsRsi",
      "apo",
      "qstick",
      "bop",
      "psychLine",
      "pfe",
      "smi",
      "ulcerIndex",
      "natr",
      "trueRange",
      "squeeze",
      "relVolIndex",
      "vhf",
      "volumeOsc",
      "nvi",
      "pvi",
      "pvt",
      "vroc",
      "netVolume",
      "twiggsMF",
      "linRegRSquared",
      "gator"
    ].filter(($) => r?.[$]?.enabled).length, f = pe.height - kt, e = y > 0 ? Math.max(60 * y, f * q) : 0, F = f - e;
    return F - (a - p.min) / p.range * F;
  }, [pe.height, r, l, q]), cr = o.useCallback((a, p) => {
    const y = [
      "rsi",
      "macd",
      "atr",
      "stochastic",
      "williamsR",
      "cci",
      "adx",
      "roc",
      "aroon",
      "momentum",
      "ao",
      "mfi",
      "tsi",
      "trix",
      "ultimateOsc",
      "dpo",
      "kst",
      "stochRsi",
      "bbPercent",
      "bbWidth",
      "histVol",
      "chaikinVol",
      "stdDev",
      "obv",
      "cmf",
      "adl",
      "forceIndex",
      "eom",
      "correlation",
      "coppock",
      "vortex",
      "choppiness",
      "elderRay",
      "massIndex",
      "linRegSlope",
      "ppo",
      "pvo",
      "cmo",
      "fisher",
      "stc",
      "rviOsc",
      "klinger",
      "connorsRsi",
      "apo",
      "qstick",
      "bop",
      "psychLine",
      "pfe",
      "smi",
      "ulcerIndex",
      "natr",
      "trueRange",
      "squeeze",
      "relVolIndex",
      "vhf",
      "volumeOsc",
      "nvi",
      "pvi",
      "pvt",
      "vroc",
      "netVolume",
      "twiggsMF",
      "linRegRSquared",
      "gator"
    ].filter(($) => r?.[$]?.enabled).length, f = pe.height - kt, e = y > 0 ? Math.max(60 * y, f * q) : 0, F = f - e;
    return p.max - a / F * p.range;
  }, [pe.height, r, l, q]), ur = o.useCallback((a, p) => {
    const x = ae.candleWidth * (1 + He);
    return (a - p) * x + x / 2;
  }, [ae.candleWidth]), ro = o.useCallback((a, p) => {
    const x = ae.candleWidth * (1 + He);
    return Math.floor(a / x) + p;
  }, [ae.candleWidth]), En = o.useCallback((a) => ku(a, h), [h]), Ps = o.useCallback((a) => {
    const p = new Date(a);
    if (M === "local") {
      const x = p.getHours().toString().padStart(2, "0"), y = p.getMinutes().toString().padStart(2, "0");
      return `${x}:${y}`;
    } else if (M === "UTC") {
      const x = p.getUTCHours().toString().padStart(2, "0"), y = p.getUTCMinutes().toString().padStart(2, "0");
      return `${x}:${y}`;
    } else
      try {
        return p.toLocaleTimeString("en-GB", {
          timeZone: M,
          hour: "2-digit",
          minute: "2-digit",
          hour12: !1
        });
      } catch {
        const x = p.getUTCHours().toString().padStart(2, "0"), y = p.getUTCMinutes().toString().padStart(2, "0");
        return `${x}:${y}`;
      }
  }, [M]), es = o.useCallback((a, p = !1) => {
    const x = new Date(a);
    if (M === "local") {
      const y = x.getDate(), f = x.toLocaleString("en", { month: "short" }), e = String(x.getFullYear()).slice(-2);
      return p ? `${y} ${f} '${e}` : `${y} ${f}`;
    } else if (M === "UTC") {
      const y = x.getUTCDate(), f = x.toLocaleString("en", { month: "short", timeZone: "UTC" }), e = String(x.getUTCFullYear()).slice(-2);
      return p ? `${y} ${f} '${e}` : `${y} ${f}`;
    } else
      try {
        const y = x.toLocaleDateString("en-GB", { timeZone: M, day: "numeric" }), f = x.toLocaleDateString("en-GB", { timeZone: M, month: "short" }), e = x.toLocaleDateString("en-GB", { timeZone: M, year: "2-digit" });
        return p ? `${y} ${f} '${e}` : `${y} ${f}`;
      } catch {
        const y = x.getUTCDate(), f = x.toLocaleString("en", { month: "short", timeZone: "UTC" }), e = String(x.getUTCFullYear()).slice(-2);
        return p ? `${y} ${f} '${e}` : `${y} ${f}`;
      }
  }, [M]), dr = o.useCallback((a) => {
    const p = new Date(a), x = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    if (M === "local") return x[p.getDay()];
    if (M === "UTC") return x[p.getUTCDay()];
    try {
      return p.toLocaleDateString("en-GB", { timeZone: M, weekday: "short" });
    } catch {
      return x[p.getUTCDay()];
    }
  }, [M]), pa = (a, p) => {
    const x = a / p, y = Math.pow(10, Math.floor(Math.log10(x))), f = x / y;
    let e;
    return f <= 1 ? e = 1 : f <= 2 ? e = 2 : f <= 5 ? e = 5 : e = 10, e * y;
  };
  o.useRef(null);
  const { indicatorData: s } = sd(l, r, Mt), ps = o.useCallback((a = !1) => {
    const p = Co.current;
    if (!p) return;
    const { width: x, height: y } = pe;
    Ds.current || (Ds.current = document.createElement("canvas"));
    const f = Ds.current;
    (f.width !== p.width || f.height !== p.height) && (f.width = p.width, f.height = p.height);
    const e = f.getContext("2d");
    if (!e) return;
    const F = !1;
    e.setTransform(wn, 0, 0, wn, 0, 0);
    const $ = !!s?.rsi, K = !!s?.macd, O = !!s?.atr, b = !!s?.stochastic, w = r?.volume?.enabled && l.some((D) => D.volume !== void 0 && D.volume > 0), A = !!s?.williamsR, V = !!s?.cci, u = !!s?.adx, N = !!s?.roc, m = !!s?.aroon, H = !!s?.momentum, d = !!s?.ao, R = !!s?.mfi, ie = !!s?.tsi, De = !!s?.trix, J = !!s?.ultimateOsc, Be = !!s?.dpo, G = !!s?.kst, Te = !!s?.stochRsi, Ue = !!s?.bbPercent, We = !!s?.bbWidth, ce = !!s?.histVol, Ie = !!s?.chaikinVol, et = !!s?.stdDev, Xe = !!s?.obv, Ot = !!s?.cmf, gn = !!s?.adl, Ut = !!s?.forceIndex, Oo = !!s?.eom, Pt = !!s?.correlation, bs = !!s?.coppock, io = !!s?.vortex, _o = !!s?.choppiness, Tl = !!s?.elderRay, Il = !!s?.massIndex, Ml = !!s?.linRegSlope, Aa = !!s?.ppo, Da = !!s?.pvo, Ba = !!s?.cmo, Wa = !!s?.fisher, Fa = !!s?.stc, Oa = !!s?.rviOsc, _a = !!s?.klinger, $a = !!s?.connorsRsi, Ha = !!s?.apo, Va = !!s?.qstick, Xa = !!s?.bop, Ya = !!s?.psychLine, za = !!s?.pfe, Ka = !!s?.smi, Ua = !!s?.ulcerIndex, qa = !!s?.natr, Ga = !!s?.trueRange, Za = !!s?.squeeze, Ja = !!s?.relVolIndex, Qa = !!s?.vhf, ei = !!s?.volumeOsc, ti = !!s?.nvi, ni = !!s?.pvi, si = !!s?.pvt, oi = !!s?.vroc, li = !!s?.netVolume, ri = !!s?.twiggsMF, ai = !!s?.linRegRSquared, ii = !!s?.gator, $o = [
      $,
      K,
      O,
      b,
      A,
      V,
      u,
      N,
      m,
      H,
      d,
      R,
      ie,
      De,
      J,
      Be,
      G,
      Te,
      Ue,
      We,
      ce,
      Ie,
      et,
      Xe,
      Ot,
      gn,
      Ut,
      Oo,
      Pt,
      bs,
      // Phase 2
      io,
      _o,
      Tl,
      Il,
      Ml,
      Aa,
      Da,
      Ba,
      Wa,
      Fa,
      Oa,
      _a,
      $a,
      Ha,
      Va,
      Xa,
      Ya,
      za,
      Ka,
      Ua,
      qa,
      Ga,
      Za,
      Ja,
      Qa,
      ei,
      ti,
      ni,
      si,
      oi,
      li,
      ri,
      ai,
      ii
    ].filter(Boolean).length + (s?.customIndicators?.filter((D) => D.display === "subplot").length || 0), yr = y - kt, kr = $o > 0 ? Math.max(60 * $o, yr * q) : 0, ts = $o > 0 ? kr / $o : 0, Me = yr - kr, U = x - Ve;
    e.fillStyle = te.background, e.fillRect(0, 0, x, y);
    const i = Ln(!0), dn = Mt.current ? Re.current.candleWidth : ae.candleWidth, Ze = Rs(i.candles, ae.autoFollowLatest);
    on.current = Ze, ln.current = Me;
    const wr = Mt.current ? Re.current.startIndex : ae.startIndex, ci = (wr - i.startIndex) * (dn * (1 + He)), xe = (D, c) => {
      const I = dn * (1 + He);
      return (D - c) * I + I / 2 - ci;
    }, st = (D) => {
      const c = (D - Ze.min) / Ze.range;
      return Me - c * Me;
    }, Ho = (te.gridOpacity ?? 100) / 100;
    e.globalAlpha = Ho, e.strokeStyle = te.grid, e.lineWidth = 0.5, e.setLineDash([]);
    const ui = gl.current?.chart?.gridHorizontalLines, di = gl.current?.chart?.gridVerticalLines, hi = No ? ui ?? $e.priceTargetLabels : $e.priceTargetLabels, Vo = pa(Ze.range, hi), Sr = Math.ceil(Ze.min / Vo) * Vo, fi = i.startIndex + i.candles.length - 1, pi = xe(l.length - 1, i.startIndex) <= U ? U : Math.max(0, Math.min(U, xe(fi, i.startIndex) + dn / 2)), Cr = 25;
    e.beginPath();
    let Tr = -1 / 0;
    for (let D = Sr; D <= Ze.max; D += Vo) {
      const c = st(D);
      Math.abs(c - Tr) < Cr || (Tr = c, e.moveTo(0, c), e.lineTo(pi, c));
    }
    e.stroke(), e.setLineDash([]), e.globalAlpha = 1;
    const Ir = dn * (1 + He), Rl = Math.ceil(U / Ir), Pl = i.startIndex + Rl, mi = No ? di ?? $e.targetLinesOnScreen : $e.targetLinesOnScreen, xi = Math.max(1, Math.round(Rl / mi)), Hs = Math.max(1, xi), Mr = Hs / 2, bi = Rl / Hs, Rr = Math.max(0, Math.min(
      1,
      (bi - 8) / 6
    )), Pr = Hs / 2, jr = $e.tertiaryGridVisible ? Math.max(0, Math.min(
      0.5,
      (3 - Ir) / 1.5
    )) : 0;
    e.globalAlpha = Ho, e.strokeStyle = te.grid, e.beginPath();
    const jl = i.startIndex;
    for (let D = jl; D <= Pl; D += Hs) {
      const c = xe(D, i.startIndex);
      if (c >= 0 && c <= U && (e.moveTo(c, 0), e.lineTo(c, Me)), c > U) break;
    }
    if (e.stroke(), Rr > 0.01 && Mr >= 1) {
      e.globalAlpha = Rr * Ho, e.strokeStyle = te.grid, e.beginPath();
      const D = i.startIndex;
      for (let c = D; c <= Pl; c += Mr) {
        if ((c - jl) % Hs === 0) continue;
        const I = xe(c, i.startIndex);
        if (I >= 0 && I <= U && (e.moveTo(I, 0), e.lineTo(I, Me)), I > U) break;
      }
      e.stroke(), e.globalAlpha = 1;
    }
    if (jr > 0.01 && Pr >= 1) {
      e.globalAlpha = jr * Ho, e.strokeStyle = te.grid, e.beginPath();
      const D = i.startIndex;
      for (let c = D; c <= Pl; c += Pr) {
        if ((c - jl) % Hs === 0) continue;
        const I = xe(c, i.startIndex);
        if (I >= 0 && I <= U && (e.moveTo(I, 0), e.lineTo(I, Me)), I > U) break;
      }
      e.stroke(), e.globalAlpha = 1;
    }
    e.globalAlpha = 1, e.strokeStyle = te.axisLine || te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(U, 0), e.lineTo(U, y), e.stroke(), e.save(), e.beginPath(), e.rect(0, 0, U, Me), e.clip();
    const Nl = {
      ctx: e,
      chartWidth: U,
      mainChartHeight: Me,
      candles: l,
      visible: i,
      indexToX: xe,
      mainPriceToY: st,
      currentCandleWidth: dn
    };
    if (ze && nr && wu(Nl, nr), re && In.length > 0 && Su(Nl, In), xt && (xt.bids.length > 0 || xt.asks.length > 0) && Cu(Nl, xt), zt) {
      const D = {
        ctx: e,
        chartWidth: U,
        mainChartHeight: Me,
        candles: l,
        visibleStartIndex: i.startIndex,
        visibleEndIndex: i.startIndex + i.candles.length,
        candleWidth: dn,
        indexToX: xe,
        isDark: lr,
        timeframe: an
      };
      Tu(D);
    }
    const An = Math.max(dn * 0.7, 3), co = Math.max(1, An * 0.15), Ll = Us.current, gi = l.length - 1, js = (D, c) => Ll && i.startIndex + D === gi && Ll.time === c.time ? Ll : c;
    if (_e === "candlestick")
      po({
        ctx: e,
        candles: i.candles,
        startIndex: i.startIndex,
        indexToX: xe,
        priceToY: st,
        morphAt: js,
        candleBodyWidth: An,
        wickWidth: co,
        colors: {
          bullish: te.bullish,
          bearish: te.bearish,
          bullishWick: te.bullishWick,
          bearishWick: te.bearishWick,
          bullishBorder: te.bullishBorder,
          bearishBorder: te.bearishBorder
        }
      });
    else if (_e === "line")
      e.strokeStyle = te.bullish, e.lineWidth = 2, e.beginPath(), i.candles.forEach((D, c) => {
        const I = xe(i.startIndex + c, i.startIndex), g = st(js(c, D).close);
        c === 0 ? e.moveTo(I, g) : e.lineTo(I, g);
      }), e.stroke();
    else if (_e === "area") {
      const D = e.createLinearGradient(0, 0, 0, Me);
      if (D.addColorStop(0, "rgba(34, 197, 94, 0.4)"), D.addColorStop(1, "rgba(34, 197, 94, 0.02)"), e.beginPath(), i.candles.forEach((c, I) => {
        const g = xe(i.startIndex + I, i.startIndex), C = st(js(I, c).close);
        I === 0 ? e.moveTo(g, C) : e.lineTo(g, C);
      }), i.candles.length > 0) {
        const c = xe(i.startIndex + i.candles.length - 1, i.startIndex), I = xe(i.startIndex, i.startIndex);
        e.lineTo(c, Me), e.lineTo(I, Me), e.closePath(), e.fillStyle = D, e.fill();
      }
      e.strokeStyle = te.bullish, e.lineWidth = 2, e.beginPath(), i.candles.forEach((c, I) => {
        const g = xe(i.startIndex + I, i.startIndex), C = st(js(I, c).close);
        I === 0 ? e.moveTo(g, C) : e.lineTo(g, C);
      }), e.stroke();
    } else if (_e === "heikin_ashi") {
      let D = i.candles[0]?.open || 0, c = i.candles[0]?.close || 0;
      const I = i.candles.map((g, C) => {
        const k = (g.open + g.high + g.low + g.close) / 4, L = C === 0 ? (g.open + g.close) / 2 : (D + c) / 2, B = Math.max(g.high, L, k), W = Math.min(g.low, L, k), E = { time: g.time, open: L, high: B, low: W, close: k, volume: g.volume };
        return D = L, c = k, E;
      });
      po({
        ctx: e,
        candles: I,
        startIndex: i.startIndex,
        indexToX: xe,
        priceToY: st,
        morphAt: (g, C) => I[g],
        candleBodyWidth: An,
        wickWidth: co,
        colors: {
          bullish: te.bullish,
          bearish: te.bearish,
          bullishWick: te.bullishWick,
          bearishWick: te.bearishWick,
          bullishBorder: te.bullishBorder,
          bearishBorder: te.bearishBorder
        }
      });
    } else if (_e === "tpo") {
      const c = /* @__PURE__ */ new Map();
      i.candles.forEach((g) => {
        const C = Math.floor(g.time / 18e5) * 18e5, k = c.get(C);
        k ? (k.high = Math.max(k.high, g.high), k.low = Math.min(k.low, g.low), k.count++) : c.set(C, { high: g.high, low: g.low, count: 1 });
      });
      let I = 0;
      c.forEach((g) => {
        const C = xe(i.startIndex + I, i.startIndex), k = st(g.high), L = st(g.low);
        e.fillStyle = "#21b3a4", e.globalAlpha = 0.25, e.fillRect(C - An / 2, k, An, Math.max(2, L - k)), e.globalAlpha = 1, I++;
      }), e.globalAlpha = 0.3, po({
        ctx: e,
        candles: i.candles,
        startIndex: i.startIndex,
        indexToX: xe,
        priceToY: st,
        morphAt: js,
        candleBodyWidth: An,
        wickWidth: co,
        colors: {
          bullish: te.bullish,
          bearish: te.bearish,
          bullishWick: te.bullishWick,
          bearishWick: te.bearishWick,
          bullishBorder: te.bullishBorder,
          bearishBorder: te.bearishBorder
        }
      }), e.globalAlpha = 1;
    } else if (_e === "footprint_cluster" || _e === "footprint_profile")
      po({
        ctx: e,
        candles: i.candles,
        startIndex: i.startIndex,
        indexToX: xe,
        priceToY: st,
        morphAt: js,
        candleBodyWidth: An,
        wickWidth: co,
        colors: {
          bullish: te.bullish,
          bearish: te.bearish,
          bullishWick: te.bullishWick,
          bearishWick: te.bearishWick,
          bullishBorder: te.bullishBorder,
          bearishBorder: te.bearishBorder
        }
      }), e.font = "8px monospace", e.fillStyle = "#e8e8e8", i.candles.forEach((D, c) => {
        const I = xe(i.startIndex + c, i.startIndex), g = st(D.close), C = D.volume || 0;
        if (C > 0) {
          const k = Math.round(C * 0.55), L = Math.round(C * 0.45);
          e.fillText(`${k}/${L}`, I - 12, g - 8);
        }
      });
    else if (_e === "flow_positioning")
      po({
        ctx: e,
        candles: i.candles,
        startIndex: i.startIndex,
        indexToX: xe,
        priceToY: st,
        morphAt: js,
        candleBodyWidth: An,
        wickWidth: co,
        colors: {
          bullish: te.bullish,
          bearish: te.bearish,
          bullishWick: te.bullishWick,
          bearishWick: te.bearishWick,
          bullishBorder: te.bullishBorder,
          bearishBorder: te.bearishBorder
        }
      }), e.strokeStyle = "#d0d0d0", e.lineWidth = 1, i.candles.forEach((D, c) => {
        if (c % 5 !== 0) return;
        const I = xe(i.startIndex + c, i.startIndex), g = D.close > D.open, C = st(D.close);
        e.beginPath(), e.moveTo(I, C), e.lineTo(I, C + (g ? -12 : 12)), e.stroke(), e.fillStyle = g ? "#21b3a4" : "#f0426c", e.beginPath(), e.arc(I, C + (g ? -14 : 14), 2, 0, Math.PI * 2), e.fill();
      });
    else if (_e === "renko") {
      const D = Ze.range * 0.02, c = [];
      let I = i.candles[0]?.close || 0, g = 0;
      i.candles.forEach((C) => {
        const k = C.close - I, L = Math.floor(Math.abs(k) / D);
        for (let B = 0; B < L; B++) {
          const W = k > 0, E = I, S = W ? I + D : I - D;
          c.push({
            x: g * An * 1.2,
            isBullish: W,
            top: st(Math.max(E, S)),
            bottom: st(Math.min(E, S))
          }), I = S, g++;
        }
      }), c.forEach((C) => {
        const k = Math.abs(C.bottom - C.top);
        e.fillStyle = C.isBullish ? te.bullish : te.bearish, e.fillRect(C.x, C.top, An, k), e.strokeStyle = C.isBullish ? te.bullishBorder : te.bearishBorder, e.lineWidth = 1, e.strokeRect(C.x, C.top, An, k);
      });
    }
    if (w) {
      const D = Me * 0.2, c = Me, I = c - D, g = i.candles.map((L) => L.volume ?? 0).filter((L) => L > 0), C = g.length > 0 ? Math.max(...g) : 1, k = Math.max(2, dn * 0.7);
      i.candles.forEach((L, B) => {
        const W = L.volume ?? 0;
        if (W > 0) {
          const E = i.startIndex + B, S = xe(E, i.startIndex), j = W / C * D * 0.95, _ = c - j, Z = L.close >= L.open, ue = r?.volume?.upColor || "#26a69a", z = r?.volume?.downColor || "#ef5350", X = Z ? ue : z, le = parseInt(X.slice(1, 3), 16), me = parseInt(X.slice(3, 5), 16), ke = parseInt(X.slice(5, 7), 16);
          e.fillStyle = `rgba(${le}, ${me}, ${ke}, 0.45)`, e.fillRect(S - k / 2, _, k, j), e.strokeStyle = `rgba(${le}, ${me}, ${ke}, 0.7)`, e.lineWidth = 1, e.beginPath(), e.moveTo(S - k / 2, _), e.lineTo(S + k / 2, _), e.stroke();
        }
      }), Tt === "volume" && (e.save(), i.candles.forEach((B, W) => {
        const E = B.volume ?? 0;
        if (E <= 0) return;
        const S = i.candles[W - 1]?.volume ?? 0, P = i.candles[W + 1]?.volume ?? 0;
        if (E < S || E < P) return;
        const j = i.startIndex + W, _ = xe(j, i.startIndex), ue = E / C * D * 0.95, z = c - ue;
        e.beginPath(), e.arc(_, z, 2.5 + 1, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc(_, z, 2.5, 0, Math.PI * 2);
        const X = B.close >= B.open;
        e.fillStyle = X ? r?.volume?.upColor || "#26a69a" : r?.volume?.downColor || "#ef5350", e.fill();
      }), e.restore()), Jt.current.volume = { top: I, bottom: c };
    }
    if (e.restore(), r) {
      if (r.ema?.enabled && s?.ema && r.ema.periods?.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Me), e.clip();
        const c = lr ? ["#D1D4DC", "#A0A4B0", "#B2B5BE", "#9598A1", "#787B86"] : ["#363A45", "#5D606B", "#434651", "#787B86", "#9598A1"];
        r.ema.periods.forEach((I, g) => {
          const C = s.ema[g];
          if (!C) return;
          e.strokeStyle = c[g % c.length], e.lineWidth = 1.5, e.beginPath();
          let k = !1;
          i.candles.forEach((L, B) => {
            const W = i.startIndex + B, E = C[W];
            if (!isNaN(E) && isFinite(E)) {
              const S = xe(W, i.startIndex), P = dt(E, Ze);
              k ? e.lineTo(S, P) : (e.moveTo(S, P), k = !0);
            }
          }), e.stroke();
        }), e.restore();
      }
      if (s?.movingAverages && s.movingAverages.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Me), e.clip();
        const c = r?.movingAverages?.lineWidth ?? 1.5;
        s.movingAverages.forEach((I) => {
          e.strokeStyle = I.color, e.lineWidth = c, e.beginPath();
          let g = !1;
          i.candles.forEach((C, k) => {
            const L = i.startIndex + k, B = I.data[L];
            if (!isNaN(B) && isFinite(B)) {
              const W = xe(L, i.startIndex), E = dt(B, Ze);
              g ? e.lineTo(W, E) : (e.moveTo(W, E), g = !0);
            }
          }), e.stroke();
        }), e.restore();
      }
      if (r.bollinger?.enabled && s?.bollinger) {
        const c = s.bollinger;
        e.save(), e.beginPath(), e.rect(0, 0, U, Me), e.clip();
        const I = r.bollinger.lineWidth || 1, g = r.bollinger.upperColor || "#9B59B6", C = r.bollinger.middleColor || "#9B59B6", k = r.bollinger.lowerColor || "#9B59B6";
        e.strokeStyle = g, e.lineWidth = I, e.setLineDash([3, 3]), e.beginPath();
        let L = !1;
        i.candles.forEach((B, W) => {
          const E = i.startIndex + W, S = c.upper[E];
          if (!isNaN(S) && isFinite(S)) {
            const P = xe(E, i.startIndex), j = dt(S, Ze);
            L ? e.lineTo(P, j) : (e.moveTo(P, j), L = !0);
          }
        }), e.stroke(), e.strokeStyle = C, e.lineWidth = I, e.setLineDash([]), e.beginPath(), L = !1, i.candles.forEach((B, W) => {
          const E = i.startIndex + W, S = c.middle[E];
          if (!isNaN(S) && isFinite(S)) {
            const P = xe(E, i.startIndex), j = dt(S, Ze);
            L ? e.lineTo(P, j) : (e.moveTo(P, j), L = !0);
          }
        }), e.stroke(), e.strokeStyle = k, e.lineWidth = I, e.setLineDash([3, 3]), e.beginPath(), L = !1, i.candles.forEach((B, W) => {
          const E = i.startIndex + W, S = c.lower[E];
          if (!isNaN(S) && isFinite(S)) {
            const P = xe(E, i.startIndex), j = dt(S, Ze);
            L ? e.lineTo(P, j) : (e.moveTo(P, j), L = !0);
          }
        }), e.stroke(), e.setLineDash([]), e.restore();
      }
      if (s?.vwap) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Me), e.clip(), e.strokeStyle = r?.vwap?.color || "#2196F3", e.lineWidth = 2, e.beginPath();
        let c = !1;
        i.candles.forEach((I, g) => {
          const C = i.startIndex + g, k = s.vwap[C];
          if (!isNaN(k) && isFinite(k)) {
            const L = xe(C, i.startIndex), B = dt(k, Ze);
            c ? e.lineTo(L, B) : (e.moveTo(L, B), c = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (s?.ichimoku) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Me), e.clip();
        const c = s.ichimoku, I = r?.ichimoku?.tenkanColor || "#0496ff", g = r?.ichimoku?.kijunColor || "#ff0000", C = r?.ichimoku?.cloudUpColor || "rgba(0, 255, 0, 0.2)", k = r?.ichimoku?.cloudDownColor || "rgba(255, 0, 0, 0.2)";
        for (let B = 0; B < i.candles.length; B++) {
          const W = i.startIndex + B, E = c.senkouA[W], S = c.senkouB[W];
          if (!isNaN(E) && !isNaN(S) && isFinite(E) && isFinite(S)) {
            const P = xe(W, i.startIndex), j = dt(E, Ze), _ = dt(S, Ze);
            e.fillStyle = E >= S ? C : k;
            const Z = dn * (1 + He);
            e.fillRect(P - Z / 2, Math.min(j, _), Z, Math.abs(j - _));
          }
        }
        e.strokeStyle = I, e.lineWidth = 1.5, e.beginPath();
        let L = !1;
        i.candles.forEach((B, W) => {
          const E = i.startIndex + W, S = c.tenkan[E];
          if (!isNaN(S) && isFinite(S)) {
            const P = xe(E, i.startIndex), j = dt(S, Ze);
            L ? e.lineTo(P, j) : (e.moveTo(P, j), L = !0);
          }
        }), e.stroke(), e.strokeStyle = g, e.lineWidth = 1.5, e.beginPath(), L = !1, i.candles.forEach((B, W) => {
          const E = i.startIndex + W, S = c.kijun[E];
          if (!isNaN(S) && isFinite(S)) {
            const P = xe(E, i.startIndex), j = dt(S, Ze);
            L ? e.lineTo(P, j) : (e.moveTo(P, j), L = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (s?.parabolicSAR) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Me), e.clip();
        const c = s.parabolicSAR, I = r?.parabolicSAR?.bullishColor || "#22c55e", g = r?.parabolicSAR?.bearishColor || "#ef4444";
        i.candles.forEach((C, k) => {
          const L = i.startIndex + k, B = c.sar[L], W = c.direction[L];
          if (!isNaN(B) && isFinite(B)) {
            const E = xe(L, i.startIndex), S = dt(B, Ze);
            e.fillStyle = W > 0 ? I : g, e.beginPath(), e.arc(E, S, 2.5, 0, Math.PI * 2), e.fill();
          }
        }), e.restore();
      }
      if (s?.keltner) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Me), e.clip();
        const c = s.keltner, I = r?.keltner?.upperColor || "#FF9800", g = r?.keltner?.middleColor || "#FF9800", C = r?.keltner?.lowerColor || "#FF9800";
        e.strokeStyle = I, e.lineWidth = 1, e.setLineDash([3, 3]), e.beginPath();
        let k = !1;
        i.candles.forEach((L, B) => {
          const W = i.startIndex + B, E = c.upper[W];
          if (!isNaN(E) && isFinite(E)) {
            const S = xe(W, i.startIndex), P = dt(E, Ze);
            k ? e.lineTo(S, P) : (e.moveTo(S, P), k = !0);
          }
        }), e.stroke(), e.strokeStyle = g, e.setLineDash([]), e.beginPath(), k = !1, i.candles.forEach((L, B) => {
          const W = i.startIndex + B, E = c.middle[W];
          if (!isNaN(E) && isFinite(E)) {
            const S = xe(W, i.startIndex), P = dt(E, Ze);
            k ? e.lineTo(S, P) : (e.moveTo(S, P), k = !0);
          }
        }), e.stroke(), e.strokeStyle = C, e.setLineDash([3, 3]), e.beginPath(), k = !1, i.candles.forEach((L, B) => {
          const W = i.startIndex + B, E = c.lower[W];
          if (!isNaN(E) && isFinite(E)) {
            const S = xe(W, i.startIndex), P = dt(E, Ze);
            k ? e.lineTo(S, P) : (e.moveTo(S, P), k = !0);
          }
        }), e.stroke(), e.setLineDash([]), e.restore();
      }
      if (s?.pivotPoints) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Me), e.clip();
        const c = s.pivotPoints, I = r?.pivotPoints?.pivotColor || "#FFEB3B", g = r?.pivotPoints?.resistanceColor || "#ef4444", C = r?.pivotPoints?.supportColor || "#22c55e", k = (L, B, W, E = []) => {
          const S = L.filter((P) => !isNaN(P) && isFinite(P)).pop();
          if (S !== void 0) {
            const P = dt(S, Ze);
            e.strokeStyle = B, e.lineWidth = 1, e.setLineDash(E), e.beginPath(), e.moveTo(0, P), e.lineTo(U, P), e.stroke(), e.fillStyle = B, e.font = Yt, e.textAlign = "left", e.fillText(W, 5, P - 3);
          }
        };
        e.setLineDash([]), k(c.pivot, I, "P"), k(c.r1, g, "R1", [2, 2]), k(c.r2, g, "R2", [4, 2]), k(c.r3, g, "R3", [6, 2]), k(c.s1, C, "S1", [2, 2]), k(c.s2, C, "S2", [4, 2]), k(c.s3, C, "S3", [6, 2]), e.setLineDash([]), e.restore();
      }
      if (s?.supertrend) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Me), e.clip();
        const c = s.supertrend, I = r?.supertrend?.bullishColor || "#22c55e", g = r?.supertrend?.bearishColor || "#ef4444";
        e.lineWidth = r?.supertrend?.lineWidth || 2, i.candles.forEach((C, k) => {
          const L = i.startIndex + k, B = c.supertrend[L];
          if (isNaN(B) || !isFinite(B)) return;
          const W = xe(L, i.startIndex), E = dt(B, Ze), S = L - 1;
          S >= 0 && !isNaN(c.supertrend[S]) && (e.strokeStyle = c.direction[L] === 1 ? I : g, e.beginPath(), e.moveTo(xe(S, i.startIndex), dt(c.supertrend[S], Ze)), e.lineTo(W, E), e.stroke());
        }), e.restore();
      }
      if (s?.donchian) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Me), e.clip();
        const c = s.donchian, I = (g, C, k = []) => {
          e.strokeStyle = C, e.lineWidth = r?.donchian?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let L = !1;
          i.candles.forEach((B, W) => {
            const E = i.startIndex + W, S = g[E];
            if (!isNaN(S) && isFinite(S)) {
              const P = xe(E, i.startIndex), j = dt(S, Ze);
              L ? e.lineTo(P, j) : (e.moveTo(P, j), L = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        I(c.upper, r?.donchian?.upperColor || "#2196F3"), I(c.middle, r?.donchian?.middleColor || "#FFC107", [4, 4]), I(c.lower, r?.donchian?.lowerColor || "#2196F3"), e.restore();
      }
      if (s?.envelopes) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Me), e.clip();
        const c = s.envelopes, I = (g, C, k = []) => {
          e.strokeStyle = C, e.lineWidth = r?.envelopes?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let L = !1;
          i.candles.forEach((B, W) => {
            const E = i.startIndex + W, S = g[E];
            if (!isNaN(S) && isFinite(S)) {
              const P = xe(E, i.startIndex);
              L ? e.lineTo(P, dt(S, Ze)) : (e.moveTo(P, dt(S, Ze)), L = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        I(c.upper, r?.envelopes?.upperColor || "#00BCD4"), I(c.middle, r?.envelopes?.middleColor || "#FFC107", [3, 3]), I(c.lower, r?.envelopes?.lowerColor || "#00BCD4"), e.restore();
      }
      if ([
        { key: "dema", defaultColor: "#FF9800", label: "DEMA" },
        { key: "tema", defaultColor: "#E91E63", label: "TEMA" },
        { key: "hma", defaultColor: "#00E676", label: "HMA" }
      ].forEach(({ key: c, defaultColor: I }) => {
        const g = s?.[c];
        if (!g) return;
        e.save(), e.beginPath(), e.rect(0, 0, U, Me), e.clip(), e.strokeStyle = r?.[c]?.color || I, e.lineWidth = r?.[c]?.lineWidth || 2, e.beginPath();
        let C = !1;
        i.candles.forEach((k, L) => {
          const B = i.startIndex + L, W = g[B];
          if (!isNaN(W) && isFinite(W)) {
            const E = xe(B, i.startIndex), S = dt(W, Ze);
            C ? e.lineTo(E, S) : (e.moveTo(E, S), C = !0);
          }
        }), e.stroke(), e.restore();
      }), s?.linearReg) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Me), e.clip();
        const c = s.linearReg, I = (g, C, k = []) => {
          e.strokeStyle = C, e.lineWidth = r?.linearReg?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let L = !1;
          i.candles.forEach((B, W) => {
            const E = i.startIndex + W, S = g[E];
            if (!isNaN(S) && isFinite(S)) {
              const P = xe(E, i.startIndex);
              L ? e.lineTo(P, dt(S, Ze)) : (e.moveTo(P, dt(S, Ze)), L = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        I(c.upper, r?.linearReg?.upperColor || "#81D4FA"), I(c.middle, r?.linearReg?.middleColor || "#29B6F6", [4, 4]), I(c.lower, r?.linearReg?.lowerColor || "#81D4FA"), e.restore();
      }
      if (s?.fibRetracement) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Me), e.clip();
        const c = s.fibRetracement, I = r?.fibRetracement?.color || "#FFD54F", g = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
        c.levels.forEach((C, k) => {
          const L = dt(C, Ze);
          e.strokeStyle = I, e.lineWidth = r?.fibRetracement?.lineWidth || 1, e.setLineDash(k === 0 || k === 6 ? [] : [4, 3]), e.beginPath(), e.moveTo(0, L), e.lineTo(U, L), e.stroke(), e.fillStyle = I, e.font = Yt, e.textAlign = "left", e.fillText(`${(g[k] * 100).toFixed(1)}% (${C.toFixed(2)})`, 5, L - 3);
        }), e.setLineDash([]), e.restore();
      }
      if (s?.camarillaPivots) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Me), e.clip();
        const c = s.camarillaPivots, I = r?.camarillaPivots?.resistanceColor || "#ef4444", g = r?.camarillaPivots?.supportColor || "#22c55e", C = (k, L, B) => {
          const W = k.filter((E) => !isNaN(E) && isFinite(E)).pop();
          if (W !== void 0) {
            const E = dt(W, Ze);
            e.strokeStyle = L, e.lineWidth = r?.camarillaPivots?.lineWidth || 1, e.setLineDash([3, 3]), e.beginPath(), e.moveTo(0, E), e.lineTo(U, E), e.stroke(), e.fillStyle = L, e.font = Yt, e.textAlign = "left", e.fillText(B, 5, E - 3);
          }
        };
        C(c.h4, I, "H4"), C(c.h3, I, "H3"), C(c.l3, g, "L3"), C(c.l4, g, "L4"), e.setLineDash([]), e.restore();
      }
      if (s?.woodiePivots) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Me), e.clip();
        const c = s.woodiePivots, I = r?.woodiePivots?.pivotColor || "#FFEB3B", g = r?.woodiePivots?.resistanceColor || "#ef4444", C = r?.woodiePivots?.supportColor || "#22c55e", k = (L, B, W) => {
          const E = L.filter((S) => !isNaN(S) && isFinite(S)).pop();
          if (E !== void 0) {
            const S = dt(E, Ze);
            e.strokeStyle = B, e.lineWidth = r?.woodiePivots?.lineWidth || 1, e.setLineDash([3, 3]), e.beginPath(), e.moveTo(0, S), e.lineTo(U, S), e.stroke(), e.fillStyle = B, e.font = Yt, e.textAlign = "left", e.fillText(W, 5, S - 3);
          }
        };
        k(c.pivot, I, "WP"), k(c.r1, g, "WR1"), k(c.r2, g, "WR2"), k(c.s1, C, "WS1"), k(c.s2, C, "WS2"), e.setLineDash([]), e.restore();
      }
      if (s?.volumeSma && w) {
        e.save();
        const c = s.volumeSma, I = Me * 0.2, g = Me, C = i.candles.map((B) => B.volume || 0), k = Math.max(...C, 1);
        e.strokeStyle = r?.volumeSma?.color || "#FF9800", e.lineWidth = 1.5, e.beginPath();
        let L = !1;
        i.candles.forEach((B, W) => {
          const E = i.startIndex + W, S = c[E];
          if (!isNaN(S) && isFinite(S)) {
            const P = xe(E, i.startIndex), j = g - S / k * I;
            L ? e.lineTo(P, j) : (e.moveTo(P, j), L = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (r?.volumeProfile?.enabled && i.candles.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Me), e.clip();
        const c = r.volumeProfile.numberOfRows ?? 48, I = U * ((r.volumeProfile.rowWidth ?? 15) / 100), g = (r.volumeProfile.opacity ?? 60) / 100, C = r.volumeProfile.upColor || "#D97706", k = r.volumeProfile.downColor || "#1E3A8A", L = r.volumeProfile.pocColor || "#10B981", B = r.volumeProfile.lookbackBars ?? 0, W = B > 0 ? i.candles.slice(-B) : i.candles;
        let E = 1 / 0, S = -1 / 0;
        W.forEach((z) => {
          E = Math.min(E, z.low), S = Math.max(S, z.high);
        });
        const j = (S - E || 1) / c, _ = [];
        for (let z = 0; z < c; z++)
          _.push({
            priceLevel: E + (z + 0.5) * j,
            upVolume: 0,
            downVolume: 0,
            totalVolume: 0
          });
        W.forEach((z) => {
          if (!z.volume || z.volume <= 0) return;
          const X = z.low, le = z.high, me = le - X, ke = z.close >= z.open;
          for (let se = 0; se < c; se++) {
            const we = E + se * j, Se = we + j;
            if (le >= we && X <= Se) {
              const qe = Math.max(X, we), ht = Math.min(le, Se), mt = me > 0 ? (ht - qe) / me : 1, Dt = z.volume * mt;
              ke ? _[se].upVolume += Dt : _[se].downVolume += Dt, _[se].totalVolume += Dt;
            }
          }
        });
        let Z = 0, ue = 0;
        if (_.forEach((z, X) => {
          z.totalVolume > Z && (Z = z.totalVolume, ue = X);
        }), Z > 0) {
          const z = Me / c * 0.85;
          _.forEach((X, le) => {
            if (X.totalVolume <= 0) return;
            const me = st(X.priceLevel) - z / 2, ke = X.totalVolume / Z * I, se = X.totalVolume > 0 ? X.upVolume / X.totalVolume * ke : 0, we = ke - se, Se = le === ue, qe = U - ke;
            se > 0 && (e.globalAlpha = Se ? Math.min(g + 0.2, 1) : g, e.fillStyle = C, e.fillRect(qe, me, se, z)), we > 0 && (e.globalAlpha = Se ? 0.95 : 0.85, e.fillStyle = k, e.fillRect(qe + se, me, we, z)), Se && (e.globalAlpha = 0.9, e.strokeStyle = L, e.lineWidth = 1.5, e.strokeRect(qe, me, ke, z));
          }), e.globalAlpha = 1, Tt === "volumeProfile" && _.forEach((le, me) => {
            if (le.totalVolume <= 0) return;
            const ke = st(le.priceLevel), se = le.totalVolume / Z * I, we = U - se;
            e.beginPath(), e.arc(we, ke, 2.5 + 1, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc(we, ke, 2.5, 0, Math.PI * 2), e.fillStyle = le.upVolume >= le.downVolume ? C : k, e.fill();
          });
        }
        e.restore(), e.restore();
      }
    }
    const Vs = [], Ns = [];
    let Xo = "", El = "", uo = 14, Al = 0, Dl = 0;
    const vi = Ss?.current && Ss.current.length > 0;
    if (ws && !vi && ss) {
      const D = ss.find((c) => c.id === ws);
      if (D && D.points && D.points.length > 0) {
        e.save();
        const c = $e.badgeFont, I = "#2962ff", g = "rgba(41, 98, 255, 0.2)", C = $e.badgePadding, k = $e.badgeRowHeight, L = Ve - 6, B = U + 3, W = pe.height - kt, E = W + (kt - k) / 2;
        if (Xo = c, El = I, uo = k, Al = E, Dl = B, D.points.forEach((S) => {
          let P = null, j = null;
          if (S.price !== void 0 && (j = st(S.price), j >= 0 && j <= Me)) {
            const _ = En(S.price), Z = e.measureText(_).width, ue = Math.min(Z + C * 2, L), z = j - k / 2;
            Ns.push({
              pos: j,
              text: _,
              bWidth: ue,
              topOrigin: z
            });
          }
          if (S.time !== void 0) {
            let _ = -1;
            if (l.length > 0) {
              const Z = l[0].time, ue = l[l.length - 1].time, z = l.length > 1 ? l[1].time - l[0].time : 6e4;
              if (S.time > ue) _ = l.length - 1 + (S.time - ue) / z;
              else if (S.time < Z) _ = (S.time - Z) / z;
              else {
                let X = 0, le = l.length - 1;
                for (; X <= le; ) {
                  const me = Math.floor((X + le) / 2);
                  if (l[me].time === S.time) {
                    _ = me;
                    break;
                  }
                  l[me].time < S.time ? X = me + 1 : le = me - 1;
                }
                if (_ === -1) {
                  const me = X, ke = me - 1;
                  if (ke >= 0 && me < l.length) {
                    const se = l[ke], we = l[me], Se = (S.time - se.time) / (we.time - se.time);
                    _ = ke + Se;
                  } else
                    _ = X;
                }
              }
            }
            if (_ !== -1) {
              const Z = Re.current.startIndex, z = Re.current.candleWidth * (1 + He), X = Math.floor(Z), le = (Z - X) * z;
              P = (_ - X) * z + z / 2 - le;
            }
            if (P !== null && P >= 0 && P <= U) {
              const Z = `${dr(S.time)} ${es(S.time, !0)}  ${Ps(S.time)}`, z = e.measureText(Z).width + C * 2;
              let X = P - z / 2;
              X < 0 && (X = 0), X + z > U && (X = U - z), Vs.push({
                pos: P,
                text: Z,
                bWidth: z,
                topOrigin: X
              });
            }
          }
        }), (D.type === "long" || D.type === "short") && D.stopLoss) {
          const S = D.stopLoss.price, P = st(S);
          if (P >= 0 && P <= Me) {
            e.font = Xo || c;
            const j = En(S), _ = e.measureText(j).width, Z = Math.min(_ + C * 2, L), ue = P - k / 2;
            Ns.push({
              pos: P,
              text: j,
              bWidth: Z,
              topOrigin: ue
            });
          }
        }
        if (Vs.length >= 2) {
          const S = Math.min(...Vs.map((j) => j.pos)), P = Math.max(...Vs.map((j) => j.pos));
          P > S && (e.fillStyle = g, e.fillRect(S, W, P - S, kt));
        }
        if (Ns.length >= 2) {
          const S = Math.min(...Ns.map((j) => j.pos)), P = Math.max(...Ns.map((j) => j.pos));
          P > S && (e.fillStyle = g, e.fillRect(B - 3, S, Ve, P - S));
        }
        e.restore();
      }
    }
    e.fillStyle = te.axisLabel || "#787b86", e.font = Lo, e.textBaseline = "middle", e.textAlign = $e.priceLabelAlign;
    const yi = $e.priceLabelAlign === "right" ? x - (Xn !== void 0 ? Xn : Fl) - 4 : U + 2;
    let Nr = -1 / 0;
    for (let D = Sr; D <= Ze.max; D += Vo) {
      const c = st(D);
      if (c >= 10 && c <= Me - 10) {
        if (Math.abs(c - Nr) < Cr) continue;
        Nr = c, e.fillText(En(D), yi, c);
      }
    }
    const qt = n != null && !Number.isNaN(n) ? n : i.candles.length ? i.candles[i.candles.length - 1].close : null;
    if (qt != null && !Number.isNaN(qt) && !It) {
      const D = st(qt);
      if (D >= 0 && D <= Me) {
        e.save();
        const c = i.candles.length >= 2 ? i.candles[i.candles.length - 2] : null, I = i.candles.length >= 1 ? i.candles[i.candles.length - 1] : null, g = c ? c.close : I ? I.open : qt, C = qt >= g, k = te.priceTickerBullish || te.bullish, L = te.priceTickerBearish || te.bearish, B = C ? k : L, W = (Hn) => {
          const en = Hn.replace("#", ""), $t = parseInt(en.substring(0, 2), 16), hn = parseInt(en.substring(2, 4), 16), Gt = parseInt(en.substring(4, 6), 16);
          return `${$t}, ${hn}, ${Gt}`;
        }, E = W(te.textDim || "#666666"), S = `rgba(${E}, 0.35)`, P = `rgba(${E}, 0.9)`, j = W(B).split(",").map(Number), _ = (0.299 * j[0] + 0.587 * j[1] + 0.114 * j[2]) / 255, Z = Number.isNaN(_) || _ <= 0.55 ? "#ffffff" : "#000000", ue = i.candles.length - 1, z = i.candles.length > 0 ? xe(i.startIndex + ue, i.startIndex) : 0;
        z > 0 && (e.strokeStyle = S, e.lineWidth = 1, e.setLineDash([4, 4]), e.beginPath(), e.moveTo(0, D), e.lineTo(z, D), e.stroke(), e.setLineDash([])), e.strokeStyle = P, e.lineWidth = 1, e.setLineDash([4, 3]), e.beginPath(), e.moveTo(z, D), e.lineTo(U, D), e.stroke(), e.setLineDash([]);
        const X = En(qt), le = Lo, me = $e.liveCountdownFont;
        e.font = le;
        const se = e.measureText(X).width, we = $e.livePriceLabelPadding, Se = $e.livePriceRowHeight, qe = T && T.length > 0, ht = qe ? $e.countdownRowHeight : 0, mt = Se + ht;
        let Dt = 0;
        qe && (e.font = me, Dt = e.measureText(T).width);
        const vn = Ve - 6, Dn = Math.max(se, Dt) + we * 2, jt = Math.min(Dn, vn), Bt = U + 3, wt = D - Se / 2;
        e.fillStyle = te.background, e.fillRect(Bt - 1, wt - 1, jt + 2, mt + 2), e.fillStyle = B, e.beginPath(), e.roundRect(Bt, wt, jt, mt, 3), e.fill(), e.fillStyle = Z, e.font = le, e.textAlign = "center", e.textBaseline = "middle", e.fillText(X, Bt + jt / 2, wt + Se / 2), qe && (e.strokeStyle = Z === "#ffffff" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)", e.lineWidth = 0.5, e.beginPath(), e.moveTo(Bt + 3, wt + Se), e.lineTo(Bt + jt - 3, wt + Se), e.stroke(), e.fillStyle = Z === "#ffffff" ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)", e.font = me, e.textAlign = "center", e.textBaseline = "middle", e.fillText(T, Bt + jt / 2, wt + Se + ht / 2)), e.restore();
      }
    }
    if (ss && ss.length > 0) {
      e.save();
      const D = Lo;
      e.font = D;
      const c = $e.badgePadding, I = $e.badgeRowHeight, g = [], C = [];
      ss.forEach((P) => {
        if ((P.type === "horizontalRay" || P.type === "horizontal") && P.points.length > 0) {
          const j = P.points[0].price;
          g.push({ price: j, color: P.color || "#2196f3", yPos: st(j) });
        } else if ((P.type === "long" || P.type === "short") && P.points.length >= 2) {
          if (P.id === ws) return;
          const j = P.points[0].price, _ = P.points[1].price;
          if (g.push({ price: j, color: "#4b5563", yPos: st(j) }), g.push({ price: _, color: "#22c55e", yPos: st(_) }), P.stopLoss) {
            const Z = P.stopLoss.price;
            g.push({ price: Z, color: "#ef4444", yPos: st(Z) });
          }
        }
      });
      let k = -9999, L = -9999;
      if (qt != null && !Number.isNaN(qt)) {
        const P = st(qt), j = $e.livePriceRowHeight + (T && T.length > 0 ? $e.countdownRowHeight : 0);
        k = P - $e.livePriceRowHeight / 2, L = k + j;
      }
      const B = 2, W = Ve - 6, E = U + 3;
      g.sort((P, j) => P.yPos - j.yPos);
      let S = -9999;
      g.forEach((P) => {
        let j = P.yPos - I / 2, _ = j + I;
        if (j < S + B && (j = S + B, _ = j + I), j < L + B && _ > k - B && (j = L + B, _ = j + I), S = _, j >= 0 && _ <= Me) {
          const Z = En(P.price), ue = e.measureText(Z).width, z = Math.min(ue + c * 2, W);
          e.fillStyle = P.color, e.beginPath(), e.roundRect(E, j, z, I, 3), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.fillText(Z, E + z / 2, j + I / 2);
        }
      }), e.font = $e.alertFlagFont, C.forEach((P) => {
        if (P.xPos >= 0 && P.xPos <= U) {
          const j = es(P.time, !0) + " " + Ps(P.time), Z = e.measureText(j).width + c * 2, z = pe.height - kt + (kt - I) / 2;
          let X = P.xPos - Z / 2;
          X < 0 && (X = 0), X + Z > U && (X = U - Z), e.fillStyle = P.color, e.beginPath(), e.roundRect(X, z, Z, I, 3), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.fillText(j, X + Z / 2, z + I / 2);
        }
      }), e.restore();
    }
    if (It && qt !== null && qt !== void 0 && !Number.isNaN(qt)) {
      const D = Nt != null && nn != null && Number.isFinite(Nt) && Number.isFinite(nn), c = D ? Nt : qt, I = D ? nn : qt + ld(h || ""), g = st(c), C = st(I);
      if (e.save(), g >= 0 && g <= Me) {
        e.strokeStyle = "#1976d2", e.lineWidth = 1, e.setLineDash([3, 4]), e.beginPath(), e.moveTo(0, g), e.lineTo(U, g), e.stroke(), e.setLineDash([]);
        const k = En(c);
        e.font = $e.alertCountFont;
        const B = e.measureText(k).width + 12, W = 16, E = U + 2;
        e.fillStyle = "#1976d2", e.beginPath(), e.roundRect(E, g - W / 2, Math.min(B, Ve - 4), W, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "left", e.textBaseline = "middle", e.fillText(k, E + 6, g);
      }
      if (C >= 0 && C <= Me) {
        e.strokeStyle = "#d32f2f", e.lineWidth = 1, e.setLineDash([3, 4]), e.beginPath(), e.moveTo(0, C), e.lineTo(U, C), e.stroke(), e.setLineDash([]);
        const k = En(I);
        e.font = $e.alertCountFont;
        const B = e.measureText(k).width + 12, W = 16, E = U + 2;
        e.fillStyle = "#d32f2f", e.beginPath(), e.roundRect(E, C - W / 2, Math.min(B, Ve - 4), W, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "left", e.textBaseline = "middle", e.fillText(k, E + 6, C);
      }
      g >= 0 && C >= 0 && g <= Me && C <= Me && (e.fillStyle = "rgba(148, 163, 184, 0.04)", e.fillRect(0, Math.min(C, g), U, Math.abs(g - C))), e.restore();
    }
    if (Ae && Ae.length > 0) {
      const D = {
        ctx: e,
        chartWidth: U,
        mainChartHeight: Me,
        mainPriceToY: st,
        formatPrice: En,
        colors: {
          slColor: te.slColor,
          slOpacity: te.slOpacity,
          tpColor: te.tpColor,
          tpOpacity: te.tpOpacity
        },
        selectedPositionId: Pe.current,
        slDraft: ut.current,
        tpDraft: at.current,
        hoveredSLTP: Wn.current,
        draggingHandle: it.current,
        defaultOffset: Kn(0) || void 0
      };
      Iu(D, Ae), Mu(D, Ae);
    }
    if (Tt && !Tt.startsWith("sp-") && s) {
      const D = Ze;
      if (D && Me > 0) {
        const g = (k, L) => {
          e.save(), e.beginPath(), e.rect(0, 0, U, Me), e.clip();
          for (let B = 0; B < i.candles.length; B += 8) {
            const W = i.startIndex + B;
            if (W >= k.length) continue;
            const E = k[W];
            if (isNaN(E) || !isFinite(E)) continue;
            const S = xe(W, i.startIndex), P = Me - (E - D.min) / D.range * Me;
            e.beginPath(), e.arc(S, P, 3.5, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc(S, P, 2.5, 0, Math.PI * 2), e.fillStyle = L, e.fill();
          }
          e.restore();
        }, C = Tt;
        if (C === "movingAverages" && s.movingAverages)
          for (const k of s.movingAverages) g(k.data, k.color);
        else if (C?.startsWith("movingAverages__") && s.movingAverages) {
          const k = parseInt(C.slice(16), 10), L = s.movingAverages[k];
          L && g(L.data, L.color);
        } else if (C === "bollinger" && s.bollinger) {
          const k = s.bollinger;
          g(k.upper, r?.bollinger?.upperColor || "#9B59B6"), g(k.middle, r?.bollinger?.middleColor || "#9B59B6"), g(k.lower, r?.bollinger?.lowerColor || "#9B59B6");
        } else if (C === "vwap" && s.vwap)
          g(s.vwap, "#ff9800");
        else if (C === "ichimoku" && s.ichimoku) {
          const k = s.ichimoku;
          g(k.tenkan, "#0094FF"), g(k.kijun, "#AD1457"), g(k.senkouA, "#4CAF50"), g(k.senkouB, "#FF5722");
        } else if (C === "keltner" && s.keltner)
          g(s.keltner.upper, "#3b82f6"), g(s.keltner.middle, "#3b82f6"), g(s.keltner.lower, "#3b82f6");
        else if (C === "donchian" && s.donchian)
          g(s.donchian.upper, "#3b82f6"), g(s.donchian.middle, "#3b82f6"), g(s.donchian.lower, "#3b82f6");
        else if (C === "envelopes" && s.envelopes)
          g(s.envelopes.upper, "#3b82f6"), g(s.envelopes.basis, "#3b82f6"), g(s.envelopes.lower, "#3b82f6");
        else if (C === "supertrend" && s.supertrend) {
          const k = s.supertrend.map((L) => L?.value ?? NaN);
          g(k, "#3b82f6");
        } else if (["dema", "tema", "hma"].includes(C)) {
          const k = s[C];
          Array.isArray(k) && g(k, "#3b82f6");
        } else if (C.startsWith("ci-") && r?.customIndicators) {
          const k = r.customIndicators.find((B) => `ci-${B.id}` === C), L = k?.data;
          k && L && Array.isArray(L) && g(L, k.color);
        } else if (C.startsWith("script-") && r?.customIndicators) {
          const k = C.slice(7);
          for (const L of r.customIndicators) {
            if (L.scriptId !== k) continue;
            const B = L.data;
            B && Array.isArray(B) && g(B, L.color);
          }
        }
      }
    }
    let _t = Me;
    if (s?.rsi) {
      const D = ts, c = _t, I = c + D, g = r?.rsi?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, c, U, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(U, c), e.stroke();
      const C = (X) => c + D - X / 100 * D, k = r?.rsi?.overbought ?? 70, L = r?.rsi?.oversold ?? 30;
      if (g.showZones) {
        const X = C(k), le = C(L), me = g.zoneOpacity ?? 0.1;
        e.fillStyle = g.overboughtZoneColor || "#ff4444", e.globalAlpha = me, e.fillRect(0, c, U, X - c), e.fillStyle = g.oversoldZoneColor || "#44ff44", e.fillRect(0, le, U, I - le), e.globalAlpha = 1;
      }
      if (g.showGrid !== !1) {
        const X = g.gridColor || "rgba(150, 150, 150, 0.3)";
        e.setLineDash([4, 4]), [L, 50, k].forEach((le) => {
          e.beginPath(), le === 50 ? (e.strokeStyle = X, e.lineWidth = 1) : (e.strokeStyle = "rgba(180, 130, 80, 0.8)", e.lineWidth = 1.5);
          const me = C(le);
          e.moveTo(0, me), e.lineTo(U, me), e.stroke();
        }), e.setLineDash([]), e.lineWidth = 1;
      }
      const B = r?.rsi?.color || "#E74C3C", W = g.lineWidth ?? 1.5;
      e.strokeStyle = B, e.lineWidth = W, e.beginPath();
      let E = !1;
      i.candles.forEach((X, le) => {
        const me = i.startIndex + le, ke = s.rsi[me];
        if (!isNaN(ke) && isFinite(ke)) {
          const se = xe(me, i.startIndex), we = C(ke);
          E ? e.lineTo(se, we) : (e.moveTo(se, we), E = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Yt, e.textAlign = "left", [0, L, 50, k, 100].forEach((X) => {
        const le = C(X);
        e.fillText(X.toString(), U + 5, le);
      }), Jt.current.rsi = { top: c, bottom: I };
      const S = ft.current !== null ? ft.current : i.startIndex + i.candles.length - 1, P = s.rsi[S], j = !isNaN(P) && isFinite(P) ? P.toFixed(2) : "--", _ = `RSI ${r?.rsi?.period || 14} close`, Z = r?.rsi?.style?.customLabel || _, ue = r?.rsi?.style?.labelColor || "#d1d5db";
      e.fillStyle = ue, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left", e.fillText(Z, 5, c + 15), e.fillStyle = B, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
      const z = e.measureText(Z).width;
      e.fillText(j, 13 + z, c + 15), $n.current.rsi = 13 + z + e.measureText(j).width + 8, _t = I;
    }
    if (s?.macd) {
      const D = ts, c = _t, I = c + D, g = r?.macd?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, c, U, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(U, c), e.stroke();
      const C = s.macd.macd.slice(i.startIndex, i.endIndex), k = s.macd.signal.slice(i.startIndex, i.endIndex), L = s.macd.histogram.slice(i.startIndex, i.endIndex), B = [...C, ...k, ...L].filter((wt) => !isNaN(wt) && isFinite(wt)), W = Math.min(...B, 0), S = Math.max(...B, 0) - W || 1, P = (wt) => c + D - (wt - W) / S * D;
      if (g.showGrid !== !1) {
        e.strokeStyle = g.gridColor || te.grid, e.setLineDash([2, 2]), e.beginPath();
        const wt = P(0);
        e.moveTo(0, wt), e.lineTo(U, wt), e.stroke(), e.setLineDash([]);
      }
      const j = Math.max(2, dn * 0.5), _ = r?.macd?.histogramUpColor || "#26a69a", Z = r?.macd?.histogramDownColor || "#ef5350", ue = P(0);
      i.candles.forEach((wt, Hn) => {
        const en = i.startIndex + Hn, $t = s.macd.histogram[en];
        if (!isNaN($t) && isFinite($t)) {
          const hn = xe(en, i.startIndex), Gt = P($t), Ls = Math.abs(ue - Gt);
          e.fillStyle = $t >= 0 ? _ : Z, $t >= 0 ? e.fillRect(hn - j / 2, Gt, j, Ls) : e.fillRect(hn - j / 2, ue, j, Ls);
        }
      });
      const z = r?.macd?.macdColor || "#3498DB";
      e.strokeStyle = z, e.lineWidth = 1.5, e.beginPath();
      let X = !1;
      i.candles.forEach((wt, Hn) => {
        const en = i.startIndex + Hn, $t = s.macd.macd[en];
        if (!isNaN($t) && isFinite($t)) {
          const hn = xe(en, i.startIndex), Gt = P($t);
          X ? e.lineTo(hn, Gt) : (e.moveTo(hn, Gt), X = !0);
        }
      }), e.stroke();
      const le = r?.macd?.signalColor || "#E67E22";
      e.strokeStyle = le, e.lineWidth = 1.5, e.beginPath(), X = !1, i.candles.forEach((wt, Hn) => {
        const en = i.startIndex + Hn, $t = s.macd.signal[en];
        if (!isNaN($t) && isFinite($t)) {
          const hn = xe(en, i.startIndex), Gt = P($t);
          X ? e.lineTo(hn, Gt) : (e.moveTo(hn, Gt), X = !0);
        }
      }), e.stroke(), Jt.current.macd = { top: c, bottom: I };
      const me = `MACD(${r?.macd?.fast || 12},${r?.macd?.slow || 26},${r?.macd?.signal || 9})`, ke = r?.macd?.style?.customLabel || me, se = r?.macd?.style?.labelColor || te.textDim;
      e.fillStyle = se, e.font = `bold ${Yt}`, e.textAlign = "left";
      const we = ft.current !== null ? ft.current : i.startIndex + i.candles.length - 1, Se = s.macd.macd[we], qe = s.macd.signal[we], ht = s.macd.histogram[we];
      e.fillText(ke, 5, c + 12), e.fillStyle = z, e.font = Yt;
      const mt = e.measureText(ke).width, Dt = !isNaN(Se) && isFinite(Se) ? Se.toFixed(4) : "--";
      e.fillText(Dt, 10 + mt, c + 12), e.fillStyle = le;
      const vn = !isNaN(qe) && isFinite(qe) ? qe.toFixed(4) : "--", Dn = e.measureText(Dt).width;
      e.fillText(vn, 16 + mt + Dn, c + 12);
      const jt = !isNaN(ht) && isFinite(ht) ? ht.toFixed(4) : "--";
      e.fillStyle = ht >= 0 ? "#00ff88" : "#ff0080";
      const Bt = e.measureText(vn).width;
      e.fillText(jt, 22 + mt + Dn + Bt, c + 12), $n.current.macd = 22 + mt + Dn + Bt + e.measureText(jt).width + 8, _t = I;
    }
    if (s?.atr) {
      const D = ts, c = _t, I = c + D, g = r?.atr?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, c, U, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(U, c), e.stroke();
      const C = s.atr.slice(i.startIndex, i.endIndex).filter((me) => !isNaN(me) && isFinite(me)), k = Math.min(...C, 0), B = Math.max(...C) - k || 1, W = (me) => c + D - (me - k) / B * D, E = r?.atr?.color || "#17a2b8", S = g.lineWidth ?? 1.5;
      e.strokeStyle = E, e.lineWidth = S, e.beginPath();
      let P = !1;
      i.candles.forEach((me, ke) => {
        const se = i.startIndex + ke, we = s.atr[se];
        if (!isNaN(we) && isFinite(we)) {
          const Se = xe(se, i.startIndex), qe = W(we);
          P ? e.lineTo(Se, qe) : (e.moveTo(Se, qe), P = !0);
        }
      }), e.stroke(), Jt.current.atr = { top: c, bottom: I };
      const j = `ATR(${r?.atr?.period || 14})`, _ = r?.atr?.style?.customLabel || j, Z = r?.atr?.style?.labelColor || te.textDim;
      e.fillStyle = Z, e.font = `bold ${Yt}`, e.textAlign = "left";
      const ue = ft.current !== null ? ft.current : i.startIndex + i.candles.length - 1, z = s.atr[ue], X = !isNaN(z) && isFinite(z) ? z.toFixed(5) : "--";
      e.fillText(_, 5, c + 12), e.fillStyle = E, e.font = Yt;
      const le = e.measureText(_).width;
      e.fillText(X, 10 + le, c + 12), $n.current.atr = 10 + le + e.measureText(X).width + 8, _t = I;
    }
    if (s?.stochastic) {
      const D = ts, c = _t, I = c + D, g = r?.stochastic?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, c, U, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(U, c), e.stroke();
      const C = (ke) => c + D - ke / 100 * D;
      e.strokeStyle = te.grid, e.setLineDash([2, 2]), e.beginPath();
      const k = r?.stochastic?.overbought ?? 80, L = r?.stochastic?.oversold ?? 20;
      [L, 50, k].forEach((ke) => {
        const se = C(ke);
        e.moveTo(0, se), e.lineTo(U, se);
      }), e.stroke(), e.setLineDash([]);
      const B = r?.stochastic?.kColor || "#3498DB";
      e.strokeStyle = B, e.lineWidth = 1.5, e.beginPath();
      let W = !1;
      i.candles.forEach((ke, se) => {
        const we = i.startIndex + se, Se = s.stochastic.k[we];
        if (!isNaN(Se) && isFinite(Se)) {
          const qe = xe(we, i.startIndex), ht = C(Se);
          W ? e.lineTo(qe, ht) : (e.moveTo(qe, ht), W = !0);
        }
      }), e.stroke();
      const E = r?.stochastic?.dColor || "#E67E22";
      e.strokeStyle = E, e.lineWidth = 1.5, e.beginPath(), W = !1, i.candles.forEach((ke, se) => {
        const we = i.startIndex + se, Se = s.stochastic.d[we];
        if (!isNaN(Se) && isFinite(Se)) {
          const qe = xe(we, i.startIndex), ht = C(Se);
          W ? e.lineTo(qe, ht) : (e.moveTo(qe, ht), W = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Yt, e.textAlign = "left", [0, L, 50, k, 100].forEach((ke) => {
        const se = C(ke);
        e.fillText(ke.toString(), U + 5, se);
      }), Jt.current.stochastic = { top: c, bottom: I };
      const S = `STOCH(${r?.stochastic?.kPeriod || 14},${r?.stochastic?.dPeriod || 3})`, P = r?.stochastic?.style?.customLabel || S, j = r?.stochastic?.style?.labelColor || te.textDim;
      e.fillStyle = j, e.font = `bold ${Yt}`, e.textAlign = "left";
      const _ = ft.current !== null ? ft.current : i.startIndex + i.candles.length - 1, Z = s.stochastic.k[_], ue = s.stochastic.d[_];
      e.fillText(P, 5, c + 12), e.fillStyle = B, e.font = Yt;
      const z = e.measureText(P).width, X = !isNaN(Z) && isFinite(Z) ? `%K ${Z.toFixed(2)}` : "%K --";
      e.fillText(X, 10 + z, c + 12), e.fillStyle = E;
      const le = e.measureText(X).width, me = !isNaN(ue) && isFinite(ue) ? `%D ${ue.toFixed(2)}` : "%D --";
      e.fillText(me, 16 + z + le, c + 12), $n.current.stochastic = 16 + z + le + e.measureText(me).width + 8, _t = I;
    }
    if (s?.williamsR) {
      const D = ts, c = _t, I = c + D, g = r?.williamsR?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, c, U, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(U, c), e.stroke();
      const C = (z) => c + D - (z + 100) / 100 * D, k = r?.williamsR?.overbought ?? -20, L = r?.williamsR?.oversold ?? -80;
      e.setLineDash([4, 4]), e.strokeStyle = g.gridColor || "rgba(180, 130, 80, 0.6)", [L, -50, k].forEach((z) => {
        e.beginPath();
        const X = C(z);
        e.moveTo(0, X), e.lineTo(U, X), e.stroke();
      }), e.setLineDash([]);
      const B = r?.williamsR?.color || "#E91E63";
      e.strokeStyle = B, e.lineWidth = g.lineWidth ?? 1.5, e.beginPath();
      let W = !1;
      i.candles.forEach((z, X) => {
        const le = i.startIndex + X, me = s.williamsR[le];
        if (!isNaN(me) && isFinite(me)) {
          const ke = xe(le, i.startIndex), se = C(me);
          W ? e.lineTo(ke, se) : (e.moveTo(ke, se), W = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Yt, e.textAlign = "left", [-100, L, -50, k, 0].forEach((z) => {
        const X = C(z);
        e.fillText(z.toString(), U + 5, X);
      }), Jt.current.williamsR = { top: c, bottom: I };
      const E = `Williams %R ${r?.williamsR?.period || 14}`, S = r?.williamsR?.style?.customLabel || E, P = r?.williamsR?.style?.labelColor || "#d1d5db";
      e.fillStyle = P, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left";
      const j = ft.current !== null ? ft.current : i.startIndex + i.candles.length - 1, _ = s.williamsR[j], Z = !isNaN(_) && isFinite(_) ? _.toFixed(2) : "--";
      e.fillText(S, 5, c + 15), e.fillStyle = B;
      const ue = e.measureText(S).width;
      e.fillText(Z, 13 + ue, c + 15), $n.current.williamsR = 13 + ue + e.measureText(Z).width + 8, _t = I;
    }
    if (s?.cci) {
      const D = ts, c = _t, I = c + D, g = r?.cci?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, c, U, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(U, c), e.stroke();
      const C = i.candles.map((le, me) => s.cci[i.startIndex + me]).filter((le) => !isNaN(le) && isFinite(le)), k = C.length > 0 ? Math.max(200, Math.max(...C.map(Math.abs))) : 200, L = (le) => c + D / 2 - le / k * (D / 2), B = r?.cci?.overbought ?? 100, W = r?.cci?.oversold ?? -100;
      e.setLineDash([4, 4]), e.strokeStyle = g.gridColor || "rgba(180, 130, 80, 0.6)", [W, 0, B].forEach((le) => {
        e.beginPath();
        const me = L(le);
        e.moveTo(0, me), e.lineTo(U, me), e.stroke();
      }), e.setLineDash([]);
      const E = r?.cci?.color || "#00BCD4";
      e.strokeStyle = E, e.lineWidth = g.lineWidth ?? 1.5, e.beginPath();
      let S = !1;
      i.candles.forEach((le, me) => {
        const ke = i.startIndex + me, se = s.cci[ke];
        if (!isNaN(se) && isFinite(se)) {
          const we = xe(ke, i.startIndex), Se = L(se);
          S ? e.lineTo(we, Se) : (e.moveTo(we, Se), S = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Yt, e.textAlign = "left", [Math.round(-k), W, 0, B, Math.round(k)].forEach((le) => {
        const me = L(le);
        e.fillText(le.toString(), U + 5, me);
      }), Jt.current.cci = { top: c, bottom: I };
      const P = `CCI ${r?.cci?.period || 20}`, j = r?.cci?.style?.customLabel || P, _ = r?.cci?.style?.labelColor || "#d1d5db";
      e.fillStyle = _, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left";
      const Z = ft.current !== null ? ft.current : i.startIndex + i.candles.length - 1, ue = s.cci[Z], z = !isNaN(ue) && isFinite(ue) ? ue.toFixed(2) : "--";
      e.fillText(j, 5, c + 15), e.fillStyle = E;
      const X = e.measureText(j).width;
      e.fillText(z, 13 + X, c + 15), $n.current.cci = 13 + X + e.measureText(z).width + 8, _t = I;
    }
    if (s?.adx) {
      const D = ts, c = _t, I = c + D;
      e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(U, c), e.stroke();
      const g = (S) => c + D - S / 100 * D;
      e.setLineDash([4, 4]), e.strokeStyle = "rgba(150, 150, 150, 0.3)", [25, 50, 75].forEach((S) => {
        e.beginPath(), e.moveTo(0, g(S)), e.lineTo(U, g(S)), e.stroke();
      }), e.setLineDash([]);
      const C = r?.adx?.adxColor || "#FFEB3B", k = r?.adx?.plusDIColor || "#22c55e", L = r?.adx?.minusDIColor || "#ef4444";
      e.strokeStyle = k, e.lineWidth = 1, e.beginPath();
      let B = !1;
      i.candles.forEach((S, P) => {
        const j = i.startIndex + P, _ = s.adx.plusDI[j];
        if (!isNaN(_) && isFinite(_)) {
          const Z = xe(j, i.startIndex), ue = g(_);
          B ? e.lineTo(Z, ue) : (e.moveTo(Z, ue), B = !0);
        }
      }), e.stroke(), e.strokeStyle = L, e.beginPath(), B = !1, i.candles.forEach((S, P) => {
        const j = i.startIndex + P, _ = s.adx.minusDI[j];
        if (!isNaN(_) && isFinite(_)) {
          const Z = xe(j, i.startIndex), ue = g(_);
          B ? e.lineTo(Z, ue) : (e.moveTo(Z, ue), B = !0);
        }
      }), e.stroke(), e.strokeStyle = C, e.lineWidth = 2, e.beginPath(), B = !1, i.candles.forEach((S, P) => {
        const j = i.startIndex + P, _ = s.adx.adx[j];
        if (!isNaN(_) && isFinite(_)) {
          const Z = xe(j, i.startIndex), ue = g(_);
          B ? e.lineTo(Z, ue) : (e.moveTo(Z, ue), B = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Yt, [0, 25, 50, 75, 100].forEach((S) => {
        e.fillText(S.toString(), U + 5, g(S));
      });
      const W = ft.current !== null ? ft.current : i.startIndex + i.candles.length - 1, E = s.adx.adx[W];
      e.fillStyle = "#d1d5db", e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.fillText(`ADX ${r?.adx?.period || 14}`, 5, c + 15), e.fillStyle = C, e.fillText(!isNaN(E) && isFinite(E) ? E.toFixed(2) : "--", 73, c + 15), e.fillStyle = k, e.fillText("+DI", 118, c + 15), e.fillStyle = L, e.fillText("-DI", 148, c + 15), $n.current.adx = 148 + e.measureText("-DI").width + 8, Jt.current.adx = { top: c, bottom: I }, _t = I;
    }
    if (s?.roc) {
      const D = ts, c = _t, I = c + D;
      e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(U, c), e.stroke();
      const g = i.candles.map((j, _) => s.roc[i.startIndex + _]).filter((j) => !isNaN(j) && isFinite(j)), C = g.length > 0 ? Math.max(5, Math.max(...g.map(Math.abs))) : 5, k = (j) => c + D / 2 - j / C * (D / 2);
      e.setLineDash([4, 4]), e.strokeStyle = "rgba(150, 150, 150, 0.5)", e.beginPath(), e.moveTo(0, k(0)), e.lineTo(U, k(0)), e.stroke(), e.setLineDash([]);
      const L = r?.roc?.color || "#9C27B0";
      e.strokeStyle = L, e.lineWidth = 1.5, e.beginPath();
      let B = !1;
      i.candles.forEach((j, _) => {
        const Z = i.startIndex + _, ue = s.roc[Z];
        if (!isNaN(ue) && isFinite(ue)) {
          const z = xe(Z, i.startIndex), X = k(ue);
          B ? e.lineTo(z, X) : (e.moveTo(z, X), B = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Yt, [-C, 0, C].forEach((j) => {
        e.fillText(j.toFixed(1) + "%", U + 5, k(j));
      }), e.fillStyle = "#d1d5db", e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
      const W = ft.current !== null ? ft.current : i.startIndex + i.candles.length - 1, E = s.roc[W], S = !isNaN(E) && isFinite(E) ? E.toFixed(2) + "%" : "--";
      e.fillText(`ROC ${r?.roc?.period || 12}`, 5, c + 15), e.fillStyle = L;
      const P = e.measureText(`ROC ${r?.roc?.period || 12}`).width;
      e.fillText(S, 13 + P, c + 15), $n.current.roc = 13 + P + e.measureText(S).width + 8, Jt.current.roc = { top: c, bottom: I }, _t = I;
    }
    const Bl = {
      ctx: e,
      chartWidth: U,
      subplotHeight: ts,
      visible: i,
      indexToX: xe,
      currentCandleWidth: dn,
      subplotLabelFont: Yt,
      hoveredCandleIndex: ft.current,
      colors: { textDim: te.textDim, grid: te.grid },
      indicators: r,
      indicatorData: s,
      indicatorBounds: Jt.current,
      subplotLabelEndX: $n.current,
      mainPriceToY: st,
      mainChartHeight: Me,
      skipIndicators: F,
      clickedIndicatorKey: Tt
    };
    if (Ru(Bl), _t = Pu(Bl, _t), ju(Bl), Qe && Qe.length > 0 && i.candles.length > 0) {
      const D = (j) => j ? j.toUpperCase().trim().slice(0, 2) : "??", c = (j) => {
        if (j.datetime) {
          const _ = new Date(j.datetime).getTime();
          if (!isNaN(_)) return _;
        }
        if (!j.date) return null;
        try {
          const [_, Z, ue] = j.date.split("-").map(Number);
          if (!j.time) return Date.UTC(_, Z - 1, ue, 12, 0);
          const z = j.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
          if (!z) return Date.UTC(_, Z - 1, ue, 12, 0);
          let X = parseInt(z[1]);
          const le = parseInt(z[2]), me = z[3]?.toUpperCase();
          return me === "PM" && X !== 12 ? X += 12 : me === "AM" && X === 12 && (X = 0), Date.UTC(_, Z - 1, ue, X, le);
        } catch {
          return null;
        }
      }, I = [];
      e.save();
      const g = { high: 0, medium: 1, low: 2 }, C = [], k = Date.now();
      for (const j of Qe) {
        const _ = c(j);
        if (!_ || _ < k) continue;
        const Z = l.length > 1 ? Math.abs(l[1].time - l[0].time) : 6e4, ue = l[l.length - 1], z = ue && _ > ue.time + Z;
        let X, le;
        if (z) {
          const se = (_ - ue.time) / Z, we = l.length - 1 + se;
          if (le = Math.round(we), X = xe(we, i.startIndex), X < 0 || X > U - 10) continue;
        } else {
          let ke = 0, se = l.length - 1;
          for (le = -1; ke <= se; ) {
            const Se = Math.floor((ke + se) / 2);
            if (l[Se].time === _) {
              le = Se;
              break;
            }
            l[Se].time < _ ? ke = Se + 1 : se = Se - 1;
          }
          if (le === -1) {
            const Se = ke >= 0 && ke < l.length, qe = se >= 0 && se < l.length;
            Se && qe ? le = Math.abs(l[ke].time - _) < Math.abs(l[se].time - _) ? ke : se : Se ? le = ke : qe ? le = se : le = l.length - 1;
          }
          const we = Math.abs(l[le].time - _);
          if (le < 0 || we > Z || le < i.startIndex || le >= i.endIndex || (X = xe(le, i.startIndex), X < 0 || X > U)) continue;
        }
        const me = Nu({ event: j.event || "", country: j.region_code || "" });
        C.push({ x: X, event: j, impact: me, ts: _, closestIdx: le });
      }
      C.sort((j, _) => {
        const Z = g[j.impact] ?? 3, ue = g[_.impact] ?? 3;
        return Z !== ue ? Z - ue : (j.event.event || "").localeCompare(_.event.event || "");
      });
      const L = /* @__PURE__ */ new Map();
      for (const j of C) {
        const _ = Math.round(j.x);
        L.has(_) || L.set(_, []), L.get(_).push(j);
      }
      const B = document.documentElement.classList.contains("dark"), W = y - kt, E = 22, S = 32, P = W - E / 2 - 5;
      for (const [j, _] of L) {
        const Z = _[0].x, ue = _[0].impact, z = ue === "high", X = ue === "low", le = D(_[0].event.region_code), me = Lu(_[0].event.region_code), ke = _.length;
        I.push({
          x: Z,
          y: P,
          event: _[0].event,
          impact: ue,
          ts: _[0].ts,
          groupEvents: _.map((mt) => ({ event: mt.event, impact: mt.impact, ts: mt.ts }))
        });
        const se = z ? "#dc2626" : X ? "#22c55e" : "#d97706";
        e.save(), e.shadowColor = B ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.15)", e.shadowBlur = 8, e.shadowOffsetY = 2;
        const we = Z - S / 2, Se = P - E / 2;
        e.fillStyle = B ? "rgba(30, 41, 59, 0.92)" : "rgba(255, 255, 255, 0.95)", e.beginPath(), e.roundRect(we, Se, S, E, 6), e.fill(), e.shadowColor = "transparent", e.shadowBlur = 0, e.strokeStyle = B ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)", e.lineWidth = 1, e.stroke(), e.fillStyle = se, e.beginPath(), e.roundRect(we, Se, 3, E, [6, 0, 0, 6]), e.fill(), e.restore();
        const qe = 18, ht = 13;
        if (me ? e.drawImage(me, Z - qe / 2, P - ht / 2, qe, ht) : (e.font = 'bold 9px -apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif', e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = B ? "#e2e8f0" : "#334155", e.fillText(le, Z + 1, P)), ke > 1) {
          const mt = we + S - 2, Dt = Se - 2, vn = 7;
          e.beginPath(), e.arc(mt, Dt, vn, 0, Math.PI * 2), e.fillStyle = se, e.fill(), e.strokeStyle = B ? "#0f172a" : "#ffffff", e.lineWidth = 1.5, e.stroke(), e.font = 'bold 8px -apple-system, BlinkMacSystemFont, "Inter", sans-serif', e.fillStyle = "#ffffff", e.fillText(String(ke), mt, Dt + 0.5);
        }
        e.beginPath(), e.moveTo(Z, P + E / 2), e.lineTo(Z, W), e.strokeStyle = z ? "rgba(220, 38, 38, 0.3)" : X ? "rgba(34, 197, 94, 0.25)" : "rgba(217, 119, 6, 0.3)", e.lineWidth = 1, e.setLineDash([2, 3]), e.stroke(), e.setLineDash([]);
      }
      e.restore(), Ts.current = I;
    } else
      Ts.current = [];
    if (e.strokeStyle = te.axisLine || te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, y - kt), e.lineTo(x, y - kt), e.stroke(), $e.versionLabelVisible) {
      const D = Xn === 0 ? 0 : $e.versionLabelXOffset, c = U + Ve / 2 + D, I = y - kt / 2 + 1;
      e.save(), e.font = 'bold 11px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = te.text, e.fillText("v.23", c, I), e.restore();
    }
    if (i.candles.length > 0) {
      const D = dn * (1 + He), c = Math.max(1, Math.floor(80 / D)), I = y - kt, g = I + 16;
      if (e.font = ir, e.textAlign = "center", e.textBaseline = "middle", e.save(), e.beginPath(), e.rect(0, I, U, kt), e.clip(), !i.candles || i.candles.length === 0) {
        e.restore();
        return;
      }
      const C = i.candles[0], k = i.candles[i.candles.length - 1];
      if (!C || !k) {
        e.restore();
        return;
      }
      const L = (/* @__PURE__ */ new Date()).getFullYear(), B = new Date(C.time).getFullYear(), W = new Date(k.time).getFullYear(), E = B !== W, S = B !== L || W !== L, P = i.candles[1], j = P ? P.time - C.time : 6e4, Z = j / 6e4 >= 60;
      let ue = "", z = -1, X = -1 / 0;
      const le = 12, me = (se, we) => {
        if (Z) {
          const ht = es(se, S || E || we !== z);
          return ht !== ue ? (ue = ht, z = we, ht) : Ps(se);
        }
        const Se = es(se, !1);
        return we !== z && z !== -1 ? (z = we, es(se, !0)) : Se !== ue ? (ue = Se, z = we, es(se, S)) : Ps(se);
      }, ke = pe.width < 400;
      if ($e.useFixedTimeAxisLabels) {
        const se = ke ? $e.fixedTimeAxisLabelCountSmall : $e.fixedTimeAxisLabelCount, we = 5, Se = U - we * 2;
        for (let qe = 0; qe < se; qe++) {
          const ht = we + Se * (qe + 0.5) / se, mt = ro(ht, i.startIndex), Dt = Math.round(mt) - i.startIndex, vn = Dt >= 0 && Dt < i.candles.length ? i.candles[Dt] : null, Dn = vn ? vn.time : C.time + (mt - i.startIndex) * j, jt = vn ? xe(i.startIndex + Dt, i.startIndex) : ht, Bt = new Date(Dn).getFullYear(), wt = me(Dn, Bt);
          e.fillStyle = te.axisLabel, e.fillText(wt, jt, g);
        }
      } else {
        const qe = [
          6e4,
          3e5,
          6e5,
          9e5,
          18e5,
          36e5,
          72e5,
          108e5,
          144e5,
          216e5,
          432e5,
          864e5,
          1728e5,
          2592e5,
          6048e5,
          12096e5,
          2592e6,
          7776e6,
          15552e6,
          31536e6
        ], ht = c * j;
        let mt = qe[qe.length - 1];
        for (const jt of qe)
          if (jt >= ht) {
            mt = jt;
            break;
          }
        const Dt = Math.ceil(C.time / mt) * mt, vn = k.time + mt * 25;
        let Dn = -1;
        for (let jt = Dt; jt <= vn; jt += mt) {
          let Bt, wt = jt;
          if (jt <= k.time) {
            let Gt = 0, Ls = i.candles.length - 1, ho = Ls;
            for (; Gt <= Ls; ) {
              const Yo = Gt + Ls >> 1;
              i.candles[Yo].time >= jt ? (ho = Yo, Ls = Yo - 1) : Gt = Yo + 1;
            }
            if (ho === Dn) continue;
            Dn = ho, wt = i.candles[ho].time, Bt = xe(i.startIndex + ho, i.startIndex);
          } else {
            const Gt = i.startIndex + (i.candles.length - 1) + (jt - k.time) / j;
            Bt = xe(Gt, i.startIndex);
          }
          if (Bt < 2 || Bt > U - 10) continue;
          const Hn = me(wt, new Date(wt).getFullYear()), en = e.measureText(Hn).width, $t = Bt - en / 2, hn = Bt + en / 2;
          $t < X + le || hn > U - 10 || $t < 2 || (e.fillStyle = te.axisLabel, e.fillText(Hn, Bt, g), X = hn);
        }
      }
      e.restore(), (Vs.length > 0 || Ns.length > 0) && (e.save(), Vs.forEach((se) => {
        e.fillStyle = El, e.beginPath(), e.roundRect(se.topOrigin, Al, se.bWidth, uo, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.font = Xo, e.fillText(se.text, se.topOrigin + se.bWidth / 2, Al + uo / 2);
      }), Ns.forEach((se) => {
        e.fillStyle = El, e.beginPath(), e.roundRect(Dl, se.topOrigin, se.bWidth, uo, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.font = Xo, e.fillText(se.text, Dl + se.bWidth / 2, se.topOrigin + uo / 2);
      }), e.restore());
    }
    const Wl = p.getContext("2d");
    Wl && (Wl.setTransform(1, 0, 0, 1, 0, 0), Wl.drawImage(f, 0, 0)), Yn.current = {
      startIndex: wr,
      candleWidth: dn
    }, Mt.current && Un.current?.();
  }, [pe, l, n, ae, te, s, q, Ln, Rs, En, Ps, es, dr, Ro, wn, T, r, _e, dt, Qe, xt, Tt, ss, ws]);
  Sn.current = ps, o.useEffect(() => {
    zs && (zs.current = () => {
      nt(!0);
    });
  }, [zs]);
  const Ft = o.useCallback(() => {
    const a = Ke.current, p = a?.getContext("2d");
    if (!a || !p) return;
    const x = {
      ctx: p,
      dimensions: pe,
      dpr: wn,
      candles: l,
      colors: te,
      viewState: ae,
      indicatorData: s,
      indicators: r,
      indicatorHeightRatio: q,
      showOHLC: Qn,
      isDesktop: No,
      PRICE_AXIS_WIDTH: Ve,
      TIME_AXIS_HEIGHT: kt,
      PRICE_LABEL_FONT: Lo,
      TIME_LABEL_FONT: ir,
      crosshair: On.current,
      isScrolling: Mt.current,
      scrollState: {
        startIndex: Re.current.startIndex,
        candleWidth: Re.current.candleWidth
      },
      isDraggingHandle: !!it.current,
      isHoveredSLTP: !!Wn.current,
      sessionControlHovered: ul.current,
      isSyncedUpdate: Ks.current,
      syncedCrosshairTime: To.current ?? void 0,
      hoveredEvent: fn.current || Is.current,
      currentOhlcTextWidth: Ql,
      currentBbTextEndX: dl,
      currentMaTextEndX: hl,
      currentVwapTextEndX: fl,
      currentVpTextEndX: pl,
      currentVolTextEndX: ml,
      overlayLabelEndXPrev: _s.current,
      subplotLabelEndXPrev: tr,
      getVisibleCandles: Ln,
      getPriceRange: Rs,
      yToPrice: cr,
      xToIndex: ro,
      indexToX: ur,
      formatPrice: En,
      formatTime: Ps,
      formatDate: es,
      callbacks: {
        setOhlcTextWidth: na,
        setBbTextEndX: oa,
        setMaTextEndX: la,
        setVwapTextEndX: ra,
        setVpTextEndX: aa,
        setVolTextEndX: ia,
        setOverlayLabelEndX: (y) => {
          _s.current = y, ca(y);
        },
        setSubplotLabelEndX: ua,
        onCrosshairMove: ee
      }
    };
    Eu(x);
  }, [pe, l, ae, te, s, r, q, Ln, Rs, cr, ro, ur, En, Ps, es, ee, wn, Qn, ne]);
  o.useEffect(() => {
    Fn.current = Ft;
  }, [Ft]), o.useEffect(() => {
    Zt.current = te?.crosshairStyle || "standard", Ke.current && (Ke.current.style.cursor = Zt.current !== "standard" ? "none" : "crosshair");
  }, [te?.crosshairStyle]);
  const {
    handleZoomIn: ma,
    handleZoomOut: xa,
    handleResetView: ba,
    handleResetYAxis: ga,
    handleMoveLeft: va,
    handleMoveRight: ya,
    handleYAxisMouseDown: ka,
    handleYAxisTouchStart: wa,
    handleYAxisWheel: vl
  } = Au({
    minCandleWidth: Eo,
    maxCandleWidth: Ao,
    priceAxisWidth: Ve,
    timeAxisHeight: kt,
    dimensions: pe,
    candlesLength: l.length,
    disableAutoFollow: fe,
    livePrice: n ?? null,
    scrollStateRef: Re,
    drawChartRef: Sn,
    notifyScrollSync: St,
    getVisibleCandles: Ln,
    getPriceRange: Rs,
    setViewState: Lt,
    setPriceScale: Le,
    setPriceOffset: ds,
    setFixedPriceCenter: Rt,
    setFixedPriceRange: Qr,
    setIsScalingYAxis: il,
    fixedPriceCenter: Kt,
    priceScale: Xt,
    priceOffset: bt,
    viewStateAutoFollowLatest: ae.autoFollowLatest,
    yAxisScaleStartRef: to,
    priceScaleRef: bn,
    priceOffsetRef: Zn,
    yAxisDebounceRef: Jn
  }), Sa = o.useCallback((a) => {
    const p = Ke.current;
    if (!p) return;
    const x = p.getBoundingClientRect(), y = a.clientX - x.left, f = a.clientY - x.top;
    if (("ontouchstart" in window || navigator.maxTouchPoints > 0) && !Pn && !Mn && !it.current)
      return;
    if (On.current = { x: y, y: f }, !Mn && !it.current && r && s) {
      const w = on.current, A = ln.current;
      if (w && A > 0 && f < A) {
        const V = Re.current, u = V.candleWidth * (1 + He), N = Math.max(0, Math.floor(V.startIndex)), m = N + Math.round(y / u), H = 8, d = (J) => isNaN(J) || !isFinite(J) ? !1 : Math.abs(f - (A - (J - w.min) / w.range * A)) < H;
        let R = null;
        if (!R && r.movingAverages?.enabled && s.movingAverages) {
          for (const J of s.movingAverages)
            if (m >= 0 && m < J.data.length && d(J.data[m])) {
              R = "movingAverages";
              break;
            }
        }
        if (!R && r.bollinger?.enabled && s.bollinger) {
          const J = s.bollinger;
          m >= 0 && m < J.upper.length && (d(J.upper[m]) || d(J.middle[m]) || d(J.lower[m])) && (R = "bollinger");
        }
        if (!R && r.vwap?.enabled && s.vwap && m >= 0 && m < s.vwap.length && d(s.vwap[m]) && (R = "vwap"), !R && r.supertrend?.enabled && s.supertrend && m >= 0 && m < s.supertrend.length && s.supertrend[m] && d(s.supertrend[m].value) && (R = "supertrend"), !R && r.ichimoku?.enabled && s.ichimoku) {
          const J = s.ichimoku;
          m >= 0 && m < J.tenkan.length && (d(J.tenkan[m]) || d(J.kijun[m]) || d(J.senkouA[m]) || d(J.senkouB[m])) && (R = "ichimoku");
        }
        if (!R && r.keltner?.enabled && s.keltner) {
          const J = s.keltner;
          m >= 0 && m < J.upper.length && (d(J.upper[m]) || d(J.middle[m]) || d(J.lower[m])) && (R = "keltner");
        }
        if (!R && r.donchian?.enabled && s.donchian) {
          const J = s.donchian;
          m >= 0 && m < J.upper.length && (d(J.upper[m]) || d(J.middle[m]) || d(J.lower[m])) && (R = "donchian");
        }
        if (!R && r.envelopes?.enabled && s.envelopes) {
          const J = s.envelopes;
          m >= 0 && m < J.upper.length && (d(J.upper[m]) || d(J.basis[m]) || d(J.lower[m])) && (R = "envelopes");
        }
        if (!R && r?.volume?.enabled && A > 0 && f >= A * 0.8 && f <= A) {
          const J = m - N, Be = Ln();
          if (J >= 0 && J < Be.candles.length) {
            const G = Be.candles[J].volume ?? 0;
            if (G > 0) {
              const Te = A * 0.2, Ue = A, We = Be.candles.map((Xe) => Xe.volume ?? 0).filter((Xe) => Xe > 0), ce = We.length > 0 ? Math.max(...We) : 1, Ie = G / ce * Te * 0.95, et = Ue - Ie;
              f >= et && (R = "volume");
            }
          }
        }
        const ie = pe.width - Ve;
        if (!R && r?.volumeProfile?.enabled && A > 0 && y >= ie * (1 - (r.volumeProfile.rowWidth ?? 15) / 100)) {
          const J = Ln();
          if (J.candles.length > 0) {
            const Be = r.volumeProfile.numberOfRows ?? 48, G = ie * ((r.volumeProfile.rowWidth ?? 15) / 100), Te = r.volumeProfile.lookbackBars ?? 0, Ue = Te > 0 ? J.candles.slice(-Te) : J.candles;
            let We = 1 / 0, ce = -1 / 0;
            Ue.forEach((Xe) => {
              We = Math.min(We, Xe.low), ce = Math.max(ce, Xe.high);
            });
            const Ie = (ce - We || 1) / Be, et = on.current;
            if (et && et.range > 0) {
              const Xe = et.max - f / A * et.range, Ot = Math.floor((Xe - We) / Ie);
              if (Ot >= 0 && Ot < Be) {
                const gn = new Float64Array(Be);
                Ue.forEach((Pt) => {
                  if (!(!Pt.volume || Pt.volume <= 0))
                    for (let bs = 0; bs < Be; bs++) {
                      const io = We + bs * Ie, _o = io + Ie;
                      if (Pt.high >= io && Pt.low <= _o) {
                        const Tl = Math.max(Pt.low, io), Il = Math.min(Pt.high, _o), Ml = Pt.high - Pt.low > 0 ? (Il - Tl) / (Pt.high - Pt.low) : 1;
                        gn[bs] += Pt.volume * Ml;
                      }
                    }
                });
                let Ut = 0;
                for (let Pt = 0; Pt < Be; Pt++)
                  gn[Pt] > Ut && (Ut = gn[Pt]);
                const Oo = gn[Ot];
                if (Oo > 0 && Ut > 0) {
                  const Pt = Oo / Ut * G, bs = ie - Pt;
                  y >= bs && (R = "volumeProfile");
                }
              }
            }
          }
        }
        if (!R && r.customIndicators) {
          const Be = (G) => isNaN(G) || !isFinite(G) ? !1 : Math.abs(f - (A - (G - w.min) / w.range * A)) < 14;
          for (const G of r.customIndicators) {
            const Te = G.data;
            if (!(!G.enabled || G.display !== "overlay" || !Te) && m >= 0 && m < Te.length && Be(Te[m])) {
              const Ue = G.scriptId;
              R = typeof G.expression == "string" && G.expression.startsWith("brue:") && Ue ? `script-${Ue}` : `ci-${G.id}`;
              break;
            }
          }
        }
        if (!R) {
          const J = Jt.current, Be = [];
          if (r.rsi?.enabled && s.rsi) {
            const G = J.rsi;
            Be.push({ key: "sp-rsi", check: () => {
              if (!G || f < G.top || f > G.bottom || m < 0 || m >= s.rsi.length) return !1;
              const Te = s.rsi[m];
              if (isNaN(Te) || !isFinite(Te)) return !1;
              const Ue = G.bottom - G.top;
              return Math.abs(f - (G.top + Ue - Te / 100 * Ue)) < H;
            } });
          }
          if (r.macd?.enabled && s.macd) {
            const G = J.macd;
            Be.push({ key: "sp-macd", check: () => !(!G || f < G.top || f > G.bottom) });
          }
          if (r.stochastic?.enabled && s.stochastic) {
            const G = J.stochastic;
            Be.push({ key: "sp-stochastic", check: () => {
              if (!G || f < G.top || f > G.bottom || m < 0 || m >= s.stochastic.k.length) return !1;
              const Te = G.bottom - G.top, Ue = G.top + Te - s.stochastic.k[m] / 100 * Te, We = G.top + Te - s.stochastic.d[m] / 100 * Te;
              return Math.abs(f - Ue) < H || Math.abs(f - We) < H;
            } });
          }
          if (r.atr?.enabled && s.atr) {
            const G = J.atr;
            Be.push({ key: "sp-atr", check: () => !(!G || f < G.top || f > G.bottom) });
          }
          for (const G of Be)
            if (G.check()) {
              R = G.key;
              break;
            }
        }
        const De = Ms.current;
        if (Ms.current = R, R !== De && Ke.current) {
          const J = Zt.current !== "standard" ? "none" : "crosshair";
          Ke.current.style.cursor = R ? "pointer" : J;
        }
      } else if (Ms.current && (Ms.current = null, Ke.current && !sr.current)) {
        const V = Zt.current !== "standard" ? "none" : "crosshair";
        Ke.current.style.cursor = V;
      }
    }
    const F = ln.current, $ = pe.height;
    if (F > 0 && Ke.current) {
      if (f > F && f < $ - 30)
        Ke.current.style.cursor = "pointer";
      else if (f <= F && !Ms.current && !sr.current) {
        const w = Zt.current !== "standard" ? "none" : "crosshair";
        Ke.current.style.cursor = w;
      }
    }
    let K = !1;
    for (const w of Ts.current) {
      const A = y - w.x, V = f - w.y;
      if (Math.sqrt(A * A + V * V) < 16) {
        Is.current = w, K = !0, Ke.current && (Ke.current.style.cursor = "pointer");
        break;
      }
    }
    if (K || (Is.current = null), it.current) {
      const w = on.current, A = ln.current;
      if (w && w.range > 0 && A > 0) {
        const V = w.max - f / A * w.range;
        it.current === "sl" ? ut.current = V : at.current = V, Ke.current && (Ke.current.style.cursor = Q), xn.current === null && (xn.current = requestAnimationFrame(() => {
          nt(!1), xn.current = null;
        }));
        return;
      }
    }
    if (Ae && Ae.length > 0) {
      const w = on.current, A = ln.current;
      if (w && w.range > 0 && A > 0) {
        let V = !1;
        for (const u of Ae) {
          const N = (w.max - u.price) / w.range * A;
          if (y <= 160 && Math.abs(f - N) < 12) {
            V = !0;
            break;
          }
          if (u.id === Pe.current) {
            const H = Math.min(N + 10, A - 22 - 4), d = pe.width - Ve, R = 144 + 5 * 2, ie = (d - R) / 2;
            if (y >= ie - 8 && y <= ie + R + 8 && f >= H - 8 && f <= H + 22 + 8) {
              V = !0;
              break;
            }
          }
        }
        V && Ke.current && (Ke.current.style.cursor = "pointer");
      }
    }
    if (Pe.current && Ae && Ae.length > 0) {
      const w = on.current, A = ln.current;
      if (w && w.range > 0 && A > 0) {
        const V = w.max - f / A * w.range, u = w.range * 0.012, N = Ae.find((m) => m.id === Pe.current);
        if (N) {
          const m = N.side === "buy", H = Kn(N.price), d = ut.current ?? N.stopLoss ?? (m ? N.price - H : N.price + H), R = at.current ?? N.takeProfit ?? (m ? N.price + H : N.price - H), ie = Math.abs(V - d) < u, De = Math.abs(V - R) < u;
          if (ie || De)
            Ke.current && (Ke.current.style.cursor = v), Wn.current = ie ? "sl" : "tp", nt(!1);
          else if (Wn.current && (Wn.current = null, nt(!1)), Ke.current) {
            const J = Zt.current !== "standard" ? "none" : "crosshair";
            Ke.current.style.cursor !== J && (Ke.current.style.cursor = J);
          }
        }
      }
    }
    if (Mn) {
      if (a.buttons === 0) {
        is(!1), Wt(!1);
        return;
      }
      Wt(!0);
      const w = y - pn.x, A = f - pn.y, V = ae.candleWidth * (1 + He), u = w / V, N = Math.max(
        0,
        Math.min(l.length - 10, pn.startIndex - u)
      );
      if (Re.current = {
        startIndex: N,
        candleWidth: ae.candleWidth
      }, hs && At !== null) {
        const m = At / bn.current / (pe.height - kt), H = A * m;
        Zn.current = pn.priceOffset + H;
      }
      _n.current === null && (_n.current = requestAnimationFrame(() => {
        nt(!0), Ft(), St(), _n.current = null;
      })), Ct.current && clearTimeout(Ct.current), Ct.current = setTimeout(() => {
        const m = Re.current;
        Lt((H) => ({
          ...H,
          startIndex: m.startIndex,
          // Keep float precision - no rounding
          autoFollowLatest: !1
        })), hs && ds(Zn.current), Wt(!1);
      }, 100);
      return;
    }
    const O = Ln(), b = ro(y, O.startIndex);
    b >= 0 && b < l.length ? ft.current = b : ft.current = null, Ft();
  }, [Mn, pn, ae.candleWidth, l.length, hs, At, Xt, pe.height, Ft, Pn, Ln, ro, l]), Ca = o.useCallback((a) => {
    const p = Ke.current;
    if (!p) return;
    const x = p.getBoundingClientRect(), y = a.clientX - x.left, f = a.clientY - x.top;
    let e = !1;
    for (const O of Ts.current) {
      const b = y - O.x, w = f - O.y;
      if (Math.sqrt(b * b + w * w) < 16) {
        e = !0, fn.current && fn.current.ts === O.ts && fn.current.x === O.x ? fn.current = null : fn.current = O, Fn.current && Fn.current();
        return;
      }
    }
    if (fn.current && !e && (fn.current = null, Fn.current && Fn.current()), Qn && r) {
      const O = [
        { key: "bollinger", title: "BB", enabledCheck: () => !!(r?.bollinger?.enabled && s?.bollinger), endXSource: () => dl },
        { key: "movingAverages", title: "MA", enabledCheck: () => !!(r?.movingAverages?.enabled && s?.movingAverages), endXSource: () => hl },
        { key: "vwap", title: "VWAP", enabledCheck: () => !!(r?.vwap?.enabled && s?.vwap), endXSource: () => fl },
        { key: "ichimoku", title: "Ichimoku", enabledCheck: () => !!(r?.ichimoku?.enabled && s?.ichimoku), endXSource: () => rt.ichimoku || 0 },
        { key: "keltner", title: "Keltner", enabledCheck: () => !!(r?.keltner?.enabled && s?.keltner), endXSource: () => rt.keltner || 0 },
        { key: "volumeProfile", title: "Vol Profile", enabledCheck: () => !!r?.volumeProfile?.enabled, endXSource: () => pl },
        { key: "volume", title: "Volume", enabledCheck: () => !!(r?.volume?.enabled && l.some((w) => w.volume)), endXSource: () => ml },
        { key: "supertrend", title: "Supertrend", enabledCheck: () => !!(r?.supertrend?.enabled && s?.supertrend), endXSource: () => rt.supertrend || 0 },
        { key: "donchian", title: "Donchian", enabledCheck: () => !!(r?.donchian?.enabled && s?.donchian), endXSource: () => rt.donchian || 0 },
        { key: "envelopes", title: "Envelopes", enabledCheck: () => !!(r?.envelopes?.enabled && s?.envelopes), endXSource: () => rt.envelopes || 0 },
        // Phase 2 overlays
        { key: "alma", title: "ALMA", enabledCheck: () => !!(r?.alma?.enabled && s?.alma), endXSource: () => rt.alma || 0 },
        { key: "kama", title: "KAMA", enabledCheck: () => !!(r?.kama?.enabled && s?.kama), endXSource: () => rt.kama || 0 },
        { key: "zlema", title: "ZLEMA", enabledCheck: () => !!(r?.zlema?.enabled && s?.zlema), endXSource: () => rt.zlema || 0 },
        { key: "t3", title: "T3", enabledCheck: () => !!(r?.t3?.enabled && s?.t3), endXSource: () => rt.t3 || 0 },
        { key: "lsma", title: "LSMA", enabledCheck: () => !!(r?.lsma?.enabled && s?.lsma), endXSource: () => rt.lsma || 0 },
        { key: "mcginley", title: "McGinley", enabledCheck: () => !!(r?.mcginley?.enabled && s?.mcginley), endXSource: () => rt.mcginley || 0 },
        { key: "wma", title: "WMA", enabledCheck: () => !!(r?.wma?.enabled && s?.wma), endXSource: () => rt.wma || 0 },
        { key: "smmaOverlay", title: "SMMA", enabledCheck: () => !!(r?.smmaOverlay?.enabled && s?.smmaOverlay), endXSource: () => rt.smmaOverlay || 0 },
        { key: "vwma", title: "VWMA", enabledCheck: () => !!(r?.vwma?.enabled && s?.vwma), endXSource: () => rt.vwma || 0 },
        { key: "medianPrice", title: "Median", enabledCheck: () => !!(r?.medianPrice?.enabled && s?.medianPrice), endXSource: () => rt.medianPrice || 0 },
        { key: "typicalPrice", title: "Typical", enabledCheck: () => !!(r?.typicalPrice?.enabled && s?.typicalPrice), endXSource: () => rt.typicalPrice || 0 },
        { key: "weightedClose", title: "WClose", enabledCheck: () => !!(r?.weightedClose?.enabled && s?.weightedClose), endXSource: () => rt.weightedClose || 0 },
        { key: "zigzag", title: "ZigZag", enabledCheck: () => !!(r?.zigzag?.enabled && s?.zigzag), endXSource: () => rt.zigzag || 0 },
        { key: "alligator", title: "Alligator", enabledCheck: () => !!(r?.alligator?.enabled && s?.alligator), endXSource: () => rt.alligator || 0 },
        { key: "priceChannel", title: "Price Ch", enabledCheck: () => !!(r?.priceChannel?.enabled && s?.priceChannel), endXSource: () => rt.priceChannel || 0 },
        { key: "chandeKroll", title: "Chande Kroll", enabledCheck: () => !!(r?.chandeKroll?.enabled && s?.chandeKroll), endXSource: () => rt.chandeKroll || 0 },
        { key: "chandelierExit", title: "Chandelier", enabledCheck: () => !!(r?.chandelierExit?.enabled && s?.chandelierExit), endXSource: () => rt.chandelierExit || 0 },
        { key: "accBands", title: "Acc Bands", enabledCheck: () => !!(r?.accBands?.enabled && s?.accBands), endXSource: () => rt.accBands || 0 },
        { key: "demarkPivots", title: "DeMark", enabledCheck: () => !!(r?.demarkPivots?.enabled && s?.demarkPivots), endXSource: () => rt.demarkPivots || 0 },
        { key: "fractals", title: "Fractals", enabledCheck: () => !!(r?.fractals?.enabled && s?.fractals), endXSource: () => rt.fractals || 0 }
      ];
      let b = 28;
      for (const w of O) {
        if (!w.enabledCheck()) continue;
        const A = pe.width < 500 ? 14 : 19, V = w.endXSource();
        if (w.key === "movingAverages" && s?.movingAverages?.length > 0) {
          const N = r.movingAverages?.lines ?? [], m = r?.customBrueScripts || {};
          let H = 0;
          for (let d = 0; d < s.movingAverages.length; d++) {
            const R = N[d]?.sourceScriptId;
            if (R && m[R]?.enabled) continue;
            const ie = b + H * A - 10, De = ie + A;
            if (V > 0 && y >= 0 && y <= V && f >= ie && f <= De) {
              const J = `movingAverages__${d}`;
              he((Be) => Be === J ? null : J), ve(J);
              return;
            }
            H++;
          }
          b += H * A;
          continue;
        }
        const u = A;
        if (V > 0 && y >= 0 && y <= V && f >= b - 10 && f <= b - 10 + u) {
          he((N) => N === w.key ? null : w.key), ve(w.key);
          return;
        }
        b += u;
      }
    }
    if (r && s) {
      const O = on.current, b = ln.current;
      if (O && b > 0) {
        const w = Re.current, A = w.candleWidth * (1 + He);
        pe.width - Ve;
        const u = Math.max(0, Math.floor(w.startIndex)) + Math.round(y / A), N = 8, m = (d) => {
          if (isNaN(d) || !isFinite(d)) return !1;
          const R = b - (d - O.min) / O.range * b;
          return Math.abs(f - R) < N;
        };
        if (r.movingAverages?.enabled && s.movingAverages)
          for (let d = 0; d < s.movingAverages.length; d++) {
            const R = s.movingAverages[d];
            if (u >= 0 && u < R.data.length && m(R.data[u])) {
              const ie = `movingAverages__${d}`;
              he((De) => De === ie ? null : ie), ve(ie);
              return;
            }
          }
        if (r.bollinger?.enabled && s.bollinger) {
          const d = s.bollinger;
          if (u >= 0 && u < d.upper.length && (m(d.upper[u]) || m(d.middle[u]) || m(d.lower[u]))) {
            he((R) => R === "bollinger" ? null : "bollinger"), ve("bollinger");
            return;
          }
        }
        if (r.vwap?.enabled && s.vwap && u >= 0 && u < s.vwap.length && m(s.vwap[u])) {
          he((d) => d === "vwap" ? null : "vwap"), ve("vwap");
          return;
        }
        if (r.supertrend?.enabled && s.supertrend && u >= 0 && u < s.supertrend.length) {
          const d = s.supertrend[u];
          if (d && m(d.value)) {
            he((R) => R === "supertrend" ? null : "supertrend"), ve("supertrend");
            return;
          }
        }
        if (r.ichimoku?.enabled && s.ichimoku) {
          const d = s.ichimoku;
          if (u >= 0 && u < d.tenkan.length && (m(d.tenkan[u]) || m(d.kijun[u]) || m(d.senkouA[u]) || m(d.senkouB[u]))) {
            he((R) => R === "ichimoku" ? null : "ichimoku"), ve("ichimoku");
            return;
          }
        }
        if (r.keltner?.enabled && s.keltner) {
          const d = s.keltner;
          if (u >= 0 && u < d.upper.length && (m(d.upper[u]) || m(d.middle[u]) || m(d.lower[u]))) {
            he((R) => R === "keltner" ? null : "keltner"), ve("keltner");
            return;
          }
        }
        if (r.donchian?.enabled && s.donchian) {
          const d = s.donchian;
          if (u >= 0 && u < d.upper.length && (m(d.upper[u]) || m(d.middle[u]) || m(d.lower[u]))) {
            he((R) => R === "donchian" ? null : "donchian"), ve("donchian");
            return;
          }
        }
        if (r.envelopes?.enabled && s.envelopes) {
          const d = s.envelopes;
          if (u >= 0 && u < d.upper.length && (m(d.upper[u]) || m(d.basis[u]) || m(d.lower[u]))) {
            he((R) => R === "envelopes" ? null : "envelopes"), ve("envelopes");
            return;
          }
        }
        const H = ["dema", "tema", "hma"];
        for (const d of H)
          if (r[d]?.enabled && s[d]) {
            const R = s[d];
            if (Array.isArray(R) && u >= 0 && u < R.length && m(R[u])) {
              he((ie) => ie === d ? null : d), ve(d);
              return;
            }
          }
      }
    }
    if (r?.volume?.enabled) {
      const O = ln.current;
      if (O > 0 && f >= O * 0.8 && f <= O) {
        he((b) => b === "volume" ? null : "volume"), ve("volume");
        return;
      }
    }
    if (Ms.current === "volumeProfile") {
      he((O) => O === "volumeProfile" ? null : "volumeProfile"), ve("volumeProfile");
      return;
    }
    const F = Ms.current;
    if (F && (F.startsWith("ci-") || F.startsWith("script-"))) {
      he((O) => O === F ? null : F), ve(F);
      return;
    }
    const $ = Jt.current, K = [
      "rsi",
      "macd",
      "atr",
      "stochastic",
      "volume",
      "williamsR",
      "cci",
      "adx",
      "roc",
      "aroon",
      "momentum",
      "ao",
      "mfi",
      "tsi",
      "trix",
      "ultimateOsc",
      "dpo",
      "kst",
      "stochRsi",
      "bbPercent",
      "bbWidth",
      "histVol",
      "chaikinVol",
      "stdDev",
      "obv",
      "cmf",
      "adl",
      "forceIndex",
      "eom",
      "correlation",
      "coppock",
      // Phase 2 subplot indicators
      "vortex",
      "choppiness",
      "elderRay",
      "massIndex",
      "linRegSlope",
      "ppo",
      "pvo",
      "cmo",
      "fisher",
      "stc",
      "rviOsc",
      "klinger",
      "connorsRsi",
      "apo",
      "qstick",
      "bop",
      "psychLine",
      "pfe",
      "smi",
      "ulcerIndex",
      "natr",
      "trueRange",
      "squeeze",
      "relVolIndex",
      "vhf",
      "volumeOsc",
      "nvi",
      "pvi",
      "pvt",
      "vroc",
      "netVolume",
      "twiggsMF",
      "linRegRSquared",
      "gator"
    ];
    for (const O of K) {
      const b = $[O];
      if (b && f >= b.top && f <= b.top + 25 && y <= 200) {
        const w = `sp-${O}`;
        he((A) => A === w ? null : w), ve(w);
        return;
      }
    }
    if (r && s) {
      const O = Re.current, b = O.candleWidth * (1 + He), w = Math.max(0, Math.floor(O.startIndex)), A = w + Math.round(y / b), V = 10, u = (m, H) => {
        if (!H) return !1;
        const d = $[m];
        if (!d || f < d.top || f > d.bottom || A < 0 || A >= H.length) return !1;
        const R = H[A];
        if (isNaN(R) || !isFinite(R)) return !1;
        const ie = d.bottom - d.top, De = d.top + ie - R / 100 * ie;
        return Math.abs(f - De) < V;
      }, N = (m, H) => {
        const d = $[m];
        if (!d || f < d.top || f > d.bottom) return !1;
        const R = d.bottom - d.top;
        let ie = 1 / 0, De = -1 / 0;
        const J = pe.width - Ve, Be = Math.floor(J / b), G = Math.max(0, w), Te = Math.min(G + Be, H[0]?.length ?? 0);
        for (const Ie of H)
          if (Ie)
            for (let et = G; et < Te; et++) {
              const Xe = Ie[et];
              !isNaN(Xe) && isFinite(Xe) && (Xe < ie && (ie = Xe), Xe > De && (De = Xe));
            }
        if (ie >= De) return !1;
        const We = (De - ie) * 0.1;
        ie -= We, De += We;
        const ce = De - ie;
        if (A < 0) return !1;
        for (const Ie of H) {
          if (!Ie || A >= Ie.length) continue;
          const et = Ie[A];
          if (isNaN(et) || !isFinite(et)) continue;
          const Xe = d.top + R - (et - ie) / ce * R;
          if (Math.abs(f - Xe) < V) return !0;
        }
        return !1;
      };
      if (r.rsi?.enabled && u("rsi", s.rsi)) {
        he((m) => m === "sp-rsi" ? null : "sp-rsi"), ve("sp-rsi");
        return;
      }
      if (r.stochastic?.enabled && s.stochastic && (u("stochastic", s.stochastic.k) || u("stochastic", s.stochastic.d))) {
        he((m) => m === "sp-stochastic" ? null : "sp-stochastic"), ve("sp-stochastic");
        return;
      }
      if (r.macd?.enabled && s.macd && N("macd", [s.macd.macd, s.macd.signal])) {
        he((m) => m === "sp-macd" ? null : "sp-macd"), ve("sp-macd");
        return;
      }
      if (r.atr?.enabled && s.atr && N("atr", [s.atr])) {
        he((m) => m === "sp-atr" ? null : "sp-atr"), ve("sp-atr");
        return;
      }
      if (r.williamsR?.enabled && s.williamsR) {
        const m = $.williamsR;
        if (m && f >= m.top && f <= m.bottom && A >= 0 && A < s.williamsR.length) {
          const H = s.williamsR[A];
          if (!isNaN(H) && isFinite(H)) {
            const d = m.bottom - m.top, R = m.top + d - (H + 100) / 100 * d;
            if (Math.abs(f - R) < V) {
              he((ie) => ie === "sp-williamsR" ? null : "sp-williamsR"), ve("sp-williamsR");
              return;
            }
          }
        }
      }
      if (r.cci?.enabled && s.cci && N("cci", [s.cci])) {
        he((m) => m === "sp-cci" ? null : "sp-cci"), ve("sp-cci");
        return;
      }
      if (r.adx?.enabled && s.adx && (u("adx", s.adx.adx) || u("adx", s.adx.plusDI) || u("adx", s.adx.minusDI))) {
        he((m) => m === "sp-adx" ? null : "sp-adx"), ve("sp-adx");
        return;
      }
      if (r.roc?.enabled && s.roc && N("roc", [s.roc])) {
        he((m) => m === "sp-roc" ? null : "sp-roc"), ve("sp-roc");
        return;
      }
      if (r.aroon?.enabled && s.aroon && (u("aroon", s.aroon.up) || u("aroon", s.aroon.down))) {
        he((m) => m === "sp-aroon" ? null : "sp-aroon"), ve("sp-aroon");
        return;
      }
      if (r.tsi?.enabled && s.tsi && N("tsi", [s.tsi.tsi, s.tsi.signal])) {
        he((m) => m === "sp-tsi" ? null : "sp-tsi"), ve("sp-tsi");
        return;
      }
      if (r.trix?.enabled && s.trix && N("trix", [s.trix.trix, s.trix.signal])) {
        he((m) => m === "sp-trix" ? null : "sp-trix"), ve("sp-trix");
        return;
      }
      if (r.kst?.enabled && s.kst && N("kst", [s.kst.kst, s.kst.signal])) {
        he((m) => m === "sp-kst" ? null : "sp-kst"), ve("sp-kst");
        return;
      }
      if (r.stochRsi?.enabled && s.stochRsi && (u("stochRsi", s.stochRsi.k) || u("stochRsi", s.stochRsi.d))) {
        he((m) => m === "sp-stochRsi" ? null : "sp-stochRsi"), ve("sp-stochRsi");
        return;
      }
      for (const m of K) {
        const H = $[m];
        if (H && f >= H.top && f <= H.bottom) {
          const d = s[m];
          if (d && Array.isArray(d) && N(m, [d])) {
            const R = `sp-${m}`;
            he((ie) => ie === R ? null : R), ve(R);
            return;
          }
        }
      }
    }
    if (so && $s(null), Tt && he(null), Nn && yt(null), Ae && Ae.length > 0 && Date.now() - zn.current > 500) {
      const O = on.current, b = ln.current;
      if (O && O.range > 0 && b > 0) {
        const w = O.max - f / b * O.range, A = O.range * 6e-3;
        if (Pe.current) {
          const u = Ae.find((N) => N.id === Pe.current);
          if (u) {
            const N = (O.max - u.price) / O.range * b, m = 22, H = Math.min(N + 10, b - m - 4), d = 5, R = 45, ie = 55, De = 44, J = pe.width - Ve, Be = R + ie + De + d * 2, Te = (J - Be) / 2, Ue = Te + R + d, We = Ue + ie + d, ce = 8;
            if (y >= Te - ce && y <= Te + R + ce && f >= H - ce && f <= H + m + ce) {
              if (Ht) {
                const Ie = u.side === "buy", et = Kn(u.price), Xe = ut.current ?? u.stopLoss ?? (Ie ? u.price - et : u.price + et), Ot = at.current ?? u.takeProfit ?? (Ie ? u.price + et : u.price - et);
                Ht(Pe.current, Xe, Ot);
              }
              Pe.current = null, ut.current = null, at.current = null, it.current = null, sn((Ie) => Ie + 1), nt(!1);
              return;
            }
            if (y >= Ue - ce && y <= Ue + ie + ce && f >= H - ce && f <= H + m + ce) {
              Pe.current = null, ut.current = null, at.current = null, it.current = null, sn((Ie) => Ie + 1), nt(!1);
              return;
            }
            if (y >= We - ce && y <= We + De + ce && f >= H - ce && f <= H + m + ce) {
              Vt && Vt(Pe.current), Pe.current = null, ut.current = null, at.current = null, it.current = null, sn((Ie) => Ie + 1), nt(!1);
              return;
            }
          }
        }
        if (Pe.current) {
          const u = Ae.find((N) => N.id === Pe.current);
          if (u) {
            const N = u.side === "buy", m = Kn(u.price), H = ut.current ?? u.stopLoss ?? (N ? u.price - m : u.price + m), d = at.current ?? u.takeProfit ?? (N ? u.price + m : u.price - m);
            if (Math.abs(w - H) < A) {
              it.current = "sl", ut.current = H;
              return;
            }
            if (Math.abs(w - d) < A) {
              it.current = "tp", at.current = d;
              return;
            }
          }
        }
        let V = null;
        for (const u of Ae)
          if (Math.abs(w - u.price) < A) {
            V = u.id;
            break;
          }
        if (V) {
          if (Pe.current === V)
            Pe.current = null, ut.current = null, at.current = null;
          else {
            Pe.current = V;
            const u = Ae.find((N) => N.id === V);
            ut.current = u?.stopLoss ?? null, at.current = u?.takeProfit ?? null;
          }
          it.current = null, sn((u) => u + 1), nt(!1);
          return;
        }
      }
    }
    is(!0), Mo({ x: y, y: f, startIndex: ae.startIndex, priceOffset: bt });
  }, [ae.startIndex, bt, so, Tt, Nn, Ae, Ht, Vt, tn]), yl = o.useCallback(() => {
    if (it.current && Pe.current) {
      it.current = null, Ke.current && (Ke.current.style.cursor = Zt.current !== "standard" ? "none" : "crosshair"), nt(!1);
      return;
    }
    if (Mt.current) {
      Wt(!1);
      const a = Re.current;
      if (nt(!1), fe) {
        const p = pe.width - Ve, x = ae.candleWidth * (1 + He), y = Math.floor(p / x), f = a.startIndex + y, e = l.length - 1 < f;
        Cn.current = !e;
      }
      Lt((p) => ({
        ...p,
        startIndex: a.startIndex,
        // Keep float precision - no rounding
        autoFollowLatest: !1
      }));
    }
    _n.current !== null && (cancelAnimationFrame(_n.current), _n.current = null), is(!1);
  }, [Ht, Vt]);
  o.useEffect(() => {
    if (!Mn) return;
    const a = () => {
      yl();
    };
    return window.addEventListener("mouseup", a), () => {
      window.removeEventListener("mouseup", a);
    };
  }, [Mn, yl]), o.useEffect(() => {
    const a = (p) => {
      Pe.current && (p.key === "Enter" ? (p.preventDefault(), Ht && Ht(Pe.current, ut.current ?? void 0, at.current ?? void 0), Pe.current = null, ut.current = null, at.current = null, it.current = null, sn((x) => x + 1), nt(!1)) : (p.key === "Escape" || p.key === "Backspace") && (p.preventDefault(), Pe.current = null, ut.current = null, at.current = null, it.current = null, sn((x) => x + 1), nt(!1)));
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [Ht, Vt]), o.useEffect(() => {
    const a = (p) => {
      if (!Tt || !r || !ye) return;
      const x = p.target?.tagName;
      if (!(x === "INPUT" || x === "TEXTAREA" || x === "SELECT"))
        if (p.key === "Backspace" || p.key === "Delete") {
          p.preventDefault();
          const y = Tt.startsWith("sp-") ? Tt.replace("sp-", "") : Tt.startsWith("movingAverages__") ? "movingAverages" : Tt, f = r[y];
          f && ye({ ...r, [y]: { ...f, enabled: !1 } }), he(null);
        } else p.key === "Escape" && he(null);
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [Tt, r, ye]);
  const Ta = o.useCallback(() => {
    gt.current && clearTimeout(gt.current), gt.current = setTimeout(() => {
      if (Qt.current) return;
      On.current = null, ft.current = null, Is.current = null;
      const a = Ke.current, p = a?.getContext("2d");
      p && a && p.clearRect(0, 0, a.width, a.height), Fn.current && Fn.current(), ps(), is(!1), il(!1), ee && ee(null, null);
    }, 50);
  }, [ee, ps]);
  o.useEffect(() => {
    if (!Zl && !Jl) return;
    const a = (y) => {
      const e = (to.current.y - y.clientY) / 150, F = Math.max(0.1, Math.min(10, to.current.scale + e));
      bn.current = F, nt(!0), St(), Jn.current && clearTimeout(Jn.current), Jn.current = setTimeout(() => {
        Le(bn.current);
      }, 100);
    }, p = () => {
      il(!1), ea(!1), Le(bn.current), St();
    }, x = (y) => {
      if (y.touches.length !== 1) return;
      y.preventDefault();
      const e = (to.current.y - y.touches[0].clientY) / 150, F = Math.max(0.1, Math.min(10, to.current.scale + e));
      bn.current = F, nt(!0), St(), Jn.current && clearTimeout(Jn.current), Jn.current = setTimeout(() => {
        Le(bn.current);
      }, 100);
    };
    return window.addEventListener("mousemove", a), window.addEventListener("mouseup", p), window.addEventListener("touchmove", x, { passive: !1 }), window.addEventListener("touchend", p), window.addEventListener("touchcancel", p), () => {
      window.removeEventListener("mousemove", a), window.removeEventListener("mouseup", p), window.removeEventListener("touchmove", x), window.removeEventListener("touchend", p), window.removeEventListener("touchcancel", p);
    };
  }, [Zl, Jl, St]);
  const Ia = o.useCallback((a) => {
    if (a.preventDefault(), a.touches.length === 1) {
      const p = a.touches[0], x = Ke.current;
      if (!x) return;
      const y = x.getBoundingClientRect(), f = p.clientX - y.left, e = p.clientY - y.top;
      if (us.current = { x: f, y: e }, lt.current && (clearTimeout(lt.current), lt.current = null), Pn) {
        cs(!1), On.current = null;
        const O = x.getContext("2d");
        O && O.clearRect(0, 0, x.width, x.height);
      }
      const F = Date.now();
      jn.current = !0, Os.current = F;
      const $ = F - Fs.current;
      if (Fs.current = F, !($ < 300)) {
        const O = F;
        lt.current = setTimeout(() => {
          Os.current === O && jn.current && (cs(!0), On.current = { x: f, y: e }, un.current !== null && cancelAnimationFrame(un.current), un.current = requestAnimationFrame(() => {
            Ft(), un.current = null;
          })), lt.current = null;
        }, 400);
      }
      if (Ae && Ae.length > 0) {
        zn.current = Date.now();
        const O = on.current, b = ln.current;
        if (O && O.range > 0 && b > 0) {
          const w = O.max - e / b * O.range, A = O.range * 0.015;
          if (Pe.current) {
            const u = Ae.find((N) => N.id === Pe.current);
            if (u) {
              const N = (O.max - u.price) / O.range * b, m = 22, H = Math.min(N + 10, b - m - 4), d = 5, R = pe.width - Ve, ie = 45, De = 55, J = 44, Be = ie + De + J + d * 2, Te = (R - Be) / 2, Ue = Te + ie + d, We = Ue + De + d, ce = 12;
              if (f >= Te - ce && f <= Te + ie + ce && e >= H - ce && e <= H + m + ce) {
                Ht && Ht(Pe.current, ut.current ?? void 0, at.current ?? void 0), Pe.current = null, ut.current = null, at.current = null, it.current = null, sn((Ie) => Ie + 1), nt(!1);
                return;
              }
              if (f >= Ue - ce && f <= Ue + De + ce && e >= H - ce && e <= H + m + ce) {
                Pe.current = null, ut.current = null, at.current = null, it.current = null, sn((Ie) => Ie + 1), nt(!1);
                return;
              }
              if (f >= We - ce && f <= We + J + ce && e >= H - ce && e <= H + m + ce) {
                Vt && Vt(Pe.current), Pe.current = null, ut.current = null, at.current = null, it.current = null, sn((Ie) => Ie + 1), nt(!1);
                return;
              }
            }
          }
          if (Pe.current) {
            const u = Ae.find((N) => N.id === Pe.current);
            if (u) {
              const N = u.side === "buy", m = Kn(u.price), H = ut.current ?? u.stopLoss ?? (N ? u.price - m : u.price + m), d = at.current ?? u.takeProfit ?? (N ? u.price + m : u.price - m);
              if (Math.abs(w - H) < A) {
                it.current = "sl", ut.current = H, lt.current && (clearTimeout(lt.current), lt.current = null);
                return;
              }
              if (Math.abs(w - d) < A) {
                it.current = "tp", at.current = d, lt.current && (clearTimeout(lt.current), lt.current = null);
                return;
              }
            }
          }
          let V = null;
          for (const u of Ae) {
            const N = (O.max - u.price) / O.range * b;
            if (f <= 160 && Math.abs(e - N) < 20) {
              V = u.id;
              break;
            }
          }
          if (V) {
            if (Pe.current === V)
              Pe.current = null, ut.current = null, at.current = null;
            else {
              Pe.current = V;
              const u = Ae.find((N) => N.id === V);
              ut.current = u?.stopLoss ?? null, at.current = u?.takeProfit ?? null;
            }
            it.current = null, lt.current && (clearTimeout(lt.current), lt.current = null), sn((u) => u + 1), nt(!1);
            return;
          }
        }
      }
      is(!0), Mo({ x: f, y: e, startIndex: ae.startIndex, priceOffset: bt });
    }
  }, [ae.startIndex, bt, Ft, Pn]), Do = o.useRef(null), hr = o.useCallback((a) => {
    if (a.touches.length === 2) {
      a.preventDefault();
      const p = a.touches[0], x = a.touches[1], y = Math.hypot(
        x.clientX - p.clientX,
        x.clientY - p.clientY
      );
      if (Do.current !== null) {
        const f = Re.current.candleWidth, e = Re.current.startIndex, $ = 1 + (y / Do.current - 1) * 1.3, K = Math.max(
          Eo,
          Math.min(Ao, f * $)
        ), O = Ke.current;
        if (O) {
          const b = O.getBoundingClientRect(), w = (p.clientX + x.clientX) / 2 - b.left, A = f * (1 + He), V = K * (1 + He), u = e + w / A, N = Math.max(0, u - w / V);
          Re.current = { startIndex: N, candleWidth: K }, nt(!0), St(), Mt.current || Wt(!0);
        }
      }
      Do.current = y;
    }
  }, [St]), Ma = o.useCallback((a) => {
    if (a.touches.length === 2) {
      hr(a), lt.current && (clearTimeout(lt.current), lt.current = null);
      return;
    }
    if (a.touches.length === 1) {
      const p = a.touches[0], x = Ke.current;
      if (!x) return;
      const y = x.getBoundingClientRect(), f = p.clientX - y.left, e = p.clientY - y.top;
      if (lt.current && us.current) {
        const F = Math.abs(f - us.current.x), $ = Math.abs(e - us.current.y);
        (F > 10 || $ > 10) && (clearTimeout(lt.current), lt.current = null);
      }
      if (Pn && (On.current = { x: f, y: e }, un.current !== null && cancelAnimationFrame(un.current), un.current = requestAnimationFrame(() => {
        Ft(), un.current = null;
      })), it.current) {
        a.preventDefault();
        const F = on.current, $ = ln.current;
        if (F && F.range > 0 && $ > 0) {
          const K = F.max - e / $ * F.range;
          it.current === "sl" ? ut.current = K : at.current = K, xn.current === null && (xn.current = requestAnimationFrame(() => {
            nt(!1), xn.current = null;
          }));
        }
        return;
      }
      if (Mn && !Pn) {
        a.preventDefault(), Wt(!0);
        const F = f - pn.x, $ = e - pn.y, K = ae.candleWidth * (1 + He), O = F / K, b = Math.max(
          0,
          Math.min(l.length - 10, pn.startIndex - O)
        );
        if (hs && At !== null) {
          const w = At / bn.current / (pe.height - kt), A = $ * w;
          Zn.current = pn.priceOffset + A;
        }
        Re.current = {
          startIndex: b,
          candleWidth: ae.candleWidth
        }, mn.current === null && (mn.current = requestAnimationFrame(() => {
          nt(!0), St(), mn.current = null;
        }));
      }
    }
  }, [Mn, pn, ae.candleWidth, l.length, hr, Ft, Pn, hs, At, pe.height, Ae]), Ra = o.useCallback(() => {
    if (jn.current = !1, Os.current = 0, lt.current && (clearTimeout(lt.current), lt.current = null), it.current && Pe.current) {
      it.current = null, nt(!1), jn.current = !1, Os.current = 0, lt.current && (clearTimeout(lt.current), lt.current = null);
      return;
    }
    if (Pn) {
      cs(!1), On.current = null;
      const a = Ke.current, p = a?.getContext("2d");
      p && a && p.clearRect(0, 0, a.width, a.height), ee && ee(null, null);
    }
    if (Mt.current) {
      Wt(!1);
      const a = Re.current;
      if (nt(!1), fe) {
        const p = pe.width - Ve, x = ae.candleWidth * (1 + He), y = Math.floor(p / x), f = a.startIndex + y, e = l.length - 1 < f;
        Cn.current = !e;
      }
      Lt((p) => ({
        ...p,
        startIndex: a.startIndex,
        // Keep float precision - no rounding
        candleWidth: a.candleWidth,
        // Pick up pinch-zoom final width
        autoFollowLatest: !1
      })), hs && ds(Zn.current);
    }
    is(!1), Do.current = null, us.current = null, al.current = null, mn.current !== null && (cancelAnimationFrame(mn.current), mn.current = null);
  }, [Pn, ee, hs]);
  o.useCallback((a) => {
    let p = fs[0], x = Math.abs(a - p);
    for (const y of fs) {
      const f = Math.abs(a - y);
      f < x && (x = f, p = y);
    }
    return p;
  }, [fs]);
  const kl = o.useCallback((a, p) => {
    const x = fs.findIndex((y) => y >= a - 1e-3);
    if (p) {
      const y = Math.min(fs.length - 1, x + 1);
      return fs[y];
    } else {
      const y = Math.max(0, x - 1);
      return fs[y];
    }
  }, [fs]), wl = o.useCallback((a) => {
    const p = a.ctrlKey || a.metaKey;
    if (!bl.current && !p) {
      const m = Math.abs(a.deltaX) > Math.abs(a.deltaY), H = a.shiftKey && a.deltaY !== 0;
      if (m || H) {
        a.preventDefault();
        const d = Re.current.startIndex, R = Re.current.candleWidth, ie = R * (1 + He);
        Wt(!0);
        const De = H ? a.deltaY : a.deltaX, J = 0.2 + (oo - 1) * 0.2, Be = De * J / ie, G = Math.max(
          0,
          Math.min(l.length - 10, d + Be)
        );
        Re.current = { startIndex: G, candleWidth: R }, Ct.current && clearTimeout(Ct.current), Ct.current = setTimeout(() => {
          if (fe) {
            const Ue = pe.width - Ve, We = Re.current.candleWidth * (1 + He), ce = Math.floor(Ue / We), Ie = Re.current.startIndex + ce;
            Cn.current = !(l.length - 1 < Ie);
          }
          const Te = Re.current;
          Lt((Ue) => ({
            ...Ue,
            startIndex: Te.startIndex,
            autoFollowLatest: !1
          })), Wt(!1);
        }, 150), pt.current === null && (pt.current = requestAnimationFrame(() => {
          nt(!0), Ft(), St(), pt.current = null;
        }));
        return;
      }
    }
    a.preventDefault(), Wt(!0);
    const x = Ke.current;
    if (!x) return;
    const y = x.getBoundingClientRect(), f = a.clientX - y.left, e = a.clientY - y.top;
    On.current = { x: f, y: e };
    const F = Re.current.startIndex, $ = Re.current.candleWidth, K = $ * (1 + He);
    if (Math.abs(a.deltaX) > Math.abs(a.deltaY) || a.shiftKey) {
      const m = a.shiftKey ? a.deltaY : a.deltaX, H = bl.current ? 0.02 + (oo - 1) * 0.02 : 0.2 + (oo - 1) * 0.2, d = m * H / K, R = Math.max(
        0,
        Math.min(l.length - 10, F + d)
      );
      Re.current = { startIndex: R, candleWidth: $ }, pt.current === null && (pt.current = requestAnimationFrame(() => {
        nt(!0), Ft(), St(), pt.current = null;
      })), Ct.current && clearTimeout(Ct.current), Ct.current = setTimeout(() => {
        if (fe) {
          const De = pe.width - Ve, J = Re.current.candleWidth * (1 + He), Be = Math.floor(De / J), G = Re.current.startIndex + Be;
          Cn.current = !(l.length - 1 < G);
        }
        const ie = Re.current;
        Lt((De) => ({
          ...De,
          startIndex: ie.startIndex,
          // Keep float precision - no rounding
          autoFollowLatest: !1
        })), Wt(!1);
      }, 150);
      return;
    }
    if (bl.current) {
      Rn.current += a.deltaY, eo.current && clearTimeout(eo.current), eo.current = setTimeout(() => {
        Rn.current = 0;
      }, 200);
      const m = 220 - oo * 20;
      if (Math.abs(Rn.current) < m)
        return;
      const H = Rn.current < 0;
      Rn.current = 0;
      const d = kl($, H);
      if (d === $) return;
      const R = pe.width - Ve, ie = $ * (1 + He), De = d * (1 + He), J = F + R / ie, Be = Math.max(0, J - R / De);
      Wt(!0), Re.current = { startIndex: Be, candleWidth: d }, pt.current === null && (pt.current = requestAnimationFrame(() => {
        nt(!0), Ft(), St(), pt.current = null;
      })), Ct.current && clearTimeout(Ct.current), Ct.current = setTimeout(() => {
        const G = Re.current;
        Lt((Te) => ({
          ...Te,
          candleWidth: G.candleWidth,
          startIndex: G.startIndex,
          // Keep float precision
          autoFollowLatest: !1
        })), Wt(!1);
      }, 100);
      return;
    }
    const O = a.deltaY < 0, b = kl($, O);
    if (b === $) return;
    const w = pe.width - Ve, A = $ * (1 + He), V = b * (1 + He), u = F + w / A, N = Math.max(0, u - w / V);
    Wt(!0), Re.current = { startIndex: N, candleWidth: b }, pt.current === null && (pt.current = requestAnimationFrame(() => {
      nt(!0), Ft(), St(), pt.current = null;
    })), Ct.current && clearTimeout(Ct.current), Ct.current = setTimeout(() => {
      const m = Re.current;
      Lt((H) => ({
        ...H,
        candleWidth: m.candleWidth,
        startIndex: m.startIndex,
        // Keep float precision
        autoFollowLatest: !1
      })), Wt(!1);
    }, 100);
  }, [l.length, Ft, kl, pe.width, pe.height, oo, Kt, Ln, n, Rs, ae.autoFollowLatest, St]), fr = o.useRef(wl), pr = o.useRef(vl);
  o.useEffect(() => {
    fr.current = wl;
  }, [wl]), o.useEffect(() => {
    pr.current = vl;
  }, [vl]);
  const Pa = o.useRef(null), ms = o.useRef(null), xs = o.useRef(null), ja = o.useCallback((a) => {
    if (ms.current && (ms.current.el.removeEventListener("wheel", ms.current.fn), ms.current = null), Ke.current = a, a) {
      const p = (x) => fr.current(x);
      a.addEventListener("wheel", p, { passive: !1 }), ms.current = { el: a, fn: p };
    }
  }, []), Na = o.useCallback((a) => {
    if (xs.current && (xs.current.el.removeEventListener("wheel", xs.current.fn), xs.current = null), Pa.current = a, a) {
      const p = (x) => pr.current(x);
      a.addEventListener("wheel", p, { passive: !1 }), xs.current = { el: a, fn: p };
    }
  }, []);
  o.useEffect(() => () => {
    ms.current && ms.current.el.removeEventListener("wheel", ms.current.fn), xs.current && xs.current.el.removeEventListener("wheel", xs.current.fn);
  }, []), o.useLayoutEffect(() => {
    const a = ot.current;
    if (!a) return;
    const p = a.getBoundingClientRect();
    p.width > 0 && p.height > 0 && Zs({ width: Math.round(p.width), height: Math.round(p.height) });
    const x = new ResizeObserver((y) => {
      for (const f of y) {
        const e = Math.round(f.contentRect.width), F = Math.round(f.contentRect.height);
        e > 0 && F > 0 && Lr.flushSync(() => {
          Zs(
            ($) => $.width === e && $.height === F ? $ : { width: e, height: F }
          );
        });
      }
    });
    return x.observe(a), () => x.disconnect();
  }, []), o.useEffect(() => {
    ct && ct.width > 0 && ct.height > 0 && Zs(ct);
  }, [ct]);
  const mr = o.useRef(`${h}|${an}`);
  o.useLayoutEffect(() => {
    const a = `${h}|${an}`;
    mr.current !== a && (mr.current = a, !fe && Lt((p) => p.autoFollowLatest ? p : { ...p, autoFollowLatest: !0 }));
  }, [h, an, fe]), o.useLayoutEffect(() => {
    if (l.length === 0) return;
    if (fe) {
      const e = rs.current, F = pe.width - Ve, $ = ae.candleWidth * (1 + He), K = Math.floor(F / $), O = Math.floor(K * 0.9), w = Io.current <= 300 && pe.width > 300;
      if (Io.current = pe.width, l.length !== e || e === 0 || w) {
        const A = e > 0 && l.length < e, V = Math.max(0, Math.floor(ae.startIndex)), u = Math.min(l.length, V + K), N = l.length - 1 < u;
        if (e === 0 || A || w || N && !Cn.current) {
          const m = Math.max(0, l.length - 1 - O);
          Lt((H) => ({ ...H, startIndex: m, autoFollowLatest: !1 })), A && (Cn.current = !1);
        }
      }
      rs.current = l.length;
      return;
    }
    if (!ae.autoFollowLatest) {
      if (ae.startIndex > l.length - 1) {
        const e = pe.width - Ve, F = ae.candleWidth * (1 + He), $ = Math.max(1, Math.floor(e / F));
        Lt((K) => ({ ...K, startIndex: Math.max(0, l.length - $) }));
      }
      return;
    }
    const a = pe.width - Ve, p = ae.candleWidth * (1 + He), x = Math.floor(a / p);
    if (l.length > 0 && l.length < x * 0.75) {
      const e = Math.min(
        Ao,
        a * 0.92 / (l.length * (1 + He))
      );
      if (e > ae.candleWidth * 1.05) {
        Re.current = { startIndex: 0, candleWidth: e }, Lt((F) => ({ ...F, startIndex: 0, candleWidth: e })), rs.current = l.length;
        return;
      }
    }
    const y = Math.min(ae.futureSpace, Math.floor(x * 0.3)), f = Math.max(0, l.length - x + y);
    Lt((e) => ({ ...e, startIndex: f })), rs.current = l.length;
  }, [l.length, pe.width, ae.autoFollowLatest, ae.candleWidth, ae.futureSpace, ae.startIndex, fe]), o.useLayoutEffect(() => {
    const a = ks - Qs.current;
    a !== 0 && (Lt((p) => ({
      ...p,
      startIndex: Math.max(0, p.startIndex + a)
    })), Re.current.startIndex = Math.max(0, Re.current.startIndex + a), Yn.current.startIndex = Math.max(0, Yn.current.startIndex + a)), Qs.current = ks;
  }, [ks]), o.useEffect(() => {
    if (Ee == null) {
      Cs.current = void 0;
      return;
    }
    if (l.length === 0 || Cs.current === Ee) return;
    Cs.current = Ee;
    const a = pe.width - Ve, p = ae.candleWidth * (1 + He), x = Math.floor(a / p), y = Math.min(Ee, l.length - 1), f = Math.floor(x * 0.9), e = Math.max(0, y - f);
    Lt((F) => ({ ...F, startIndex: e, autoFollowLatest: !1 }));
  }, [Ee, l.length, pe.width, ae.candleWidth]), o.useEffect(() => {
    !Mt.current && !So && ps();
  }, [ps, So]);
  const Sl = o.useRef(0), ao = o.useRef(null);
  o.useEffect(() => {
    if (n == null || Mt.current) return;
    const a = Date.now(), p = a - Sl.current;
    return p >= 50 ? (Sl.current = a, ps()) : (ao.current && clearTimeout(ao.current), ao.current = setTimeout(() => {
      Sl.current = Date.now(), ps();
    }, 50 - p)), () => {
      ao.current && clearTimeout(ao.current);
    };
  }, [n, ps]), o.useEffect(() => {
    Ft();
  }, [Ft]), o.useEffect(() => {
    To.current = ne, ne != null && (Ks.current = !0, requestAnimationFrame(() => {
      Ft(), Ks.current = !1;
    }));
  }, [ne, Ft]);
  const Bo = o.useRef(/* @__PURE__ */ new Map()), xr = o.useMemo(() => {
    if (Mt.current && Bo.current.size > 0 && l.length === Bo.current.size)
      return Bo.current;
    const a = /* @__PURE__ */ new Map();
    for (let p = 0; p < l.length; p++)
      a.set(l[p].time, p);
    return Bo.current = a, a;
  }, [l]), Wo = o.useCallback(() => {
    if (!Ne) return;
    const a = Ln();
    Rs(a.candles, ae.autoFollowLatest);
    const p = l.length > 0 ? l[l.length - 1] : null, x = l.length >= 2 ? l[l.length - 2] : null, y = p && x ? p.time - x.time : 6e4;
    Ne({
      priceAxisWidth: Ve,
      timeToX: (f) => {
        const e = Mt.current ? Yn.current.startIndex : ae.startIndex, $ = (Mt.current ? Yn.current.candleWidth : ae.candleWidth) * (1 + He), K = Math.floor(e), O = (e - K) * $;
        let b = xr.get(f) ?? -1;
        if (b === -1 && l.length > 0) {
          const w = l[0], A = l[l.length - 1];
          if (f > A.time) {
            const V = f - A.time;
            b = l.length - 1 + Math.round(V / y);
          } else if (f < w.time) {
            const V = w.time - f;
            b = -Math.round(V / y);
          } else {
            let V = 0, u = l.length - 1;
            for (; V < u; ) {
              const N = Math.floor((V + u) / 2);
              l[N].time < f ? V = N + 1 : u = N;
            }
            if (V > 0) {
              const N = l[V - 1], m = l[V], H = (f - N.time) / (m.time - N.time);
              return (V - 1 + H - K) * $ + $ / 2 - O;
            }
            b = V;
          }
        }
        return b === -1 ? null : (b - K) * $ + $ / 2 - O;
      },
      xToTime: (f) => {
        const e = Mt.current ? Yn.current.startIndex : ae.startIndex, $ = (Mt.current ? Yn.current.candleWidth : ae.candleWidth) * (1 + He), K = Math.floor(e), O = (e - K) * $, b = f + O, w = K + (b - $ / 2) / $;
        if (w < 0) return null;
        const A = Math.floor(w), V = w - A;
        if (A >= l.length) {
          if (p) {
            const N = w - (l.length - 1);
            return p.time + N * y;
          }
          return null;
        }
        const u = l[A];
        if (!u) return null;
        if (V > 0 && A + 1 < l.length) {
          const N = l[A + 1];
          return u.time + V * (N.time - u.time);
        }
        return u.time + V * y;
      },
      priceToY: (f) => {
        let e = on.current, F = ln.current;
        if (!e || F === 0) {
          const $ = pe.width - Ve, K = Re.current, O = K.candleWidth * (1 + He), b = Math.floor($ / O), w = Math.max(0, Math.floor(K.startIndex)), A = Math.min(l.length, w + b), V = l.slice(w, A);
          let u = 1 / 0, N = -1 / 0;
          if (V.length === 0)
            u = 0, N = 100;
          else {
            for (const We of V)
              We.low < u && (u = We.low), We.high > N && (N = We.high);
            n && (n < u && (u = n), n > N && (N = n));
          }
          const m = N - u, H = m * 0.05, d = (N + u) / 2, R = m + H * 2;
          e = {
            min: d - R / 2,
            max: d + R / 2,
            range: R
          };
          const ie = r?.rsi?.enabled, De = r?.macd?.enabled, J = r?.atr?.enabled, Be = r?.stochastic?.enabled;
          r?.volume?.enabled && l.some((We) => We.volume !== void 0 && We.volume > 0);
          const G = (ie ? 1 : 0) + (De ? 1 : 0) + (J ? 1 : 0) + (Be ? 1 : 0), Te = pe.height - kt, Ue = G > 0 ? Math.max(60 * G, Te * q) : 0;
          F = Te - Ue;
        }
        if (Kt !== null && At !== null) {
          const $ = bn.current, K = Zn.current, O = At / $, b = Kt + K;
          e = {
            min: b - O / 2,
            max: b + O / 2,
            range: O
          };
        }
        return F - (f - e.min) / e.range * F;
      },
      yToPrice: (f) => {
        let e = on.current, F = ln.current;
        if (!e || F === 0) {
          const $ = pe.width - Ve, K = Re.current, O = K.candleWidth * (1 + He), b = Math.floor($ / O), w = Math.max(0, Math.floor(K.startIndex)), A = Math.min(l.length, w + b), V = l.slice(w, A);
          let u = 1 / 0, N = -1 / 0;
          if (V.length === 0)
            u = 0, N = 100;
          else {
            for (const We of V)
              We.low < u && (u = We.low), We.high > N && (N = We.high);
            n && (n < u && (u = n), n > N && (N = n));
          }
          const m = N - u, H = m * 0.05, d = (N + u) / 2, R = m + H * 2;
          e = {
            min: d - R / 2,
            max: d + R / 2,
            range: R
          };
          const ie = r?.rsi?.enabled, De = r?.macd?.enabled, J = r?.atr?.enabled, Be = r?.stochastic?.enabled;
          r?.volume?.enabled && l.some((We) => We.volume !== void 0 && We.volume > 0);
          const G = (ie ? 1 : 0) + (De ? 1 : 0) + (J ? 1 : 0) + (Be ? 1 : 0), Te = pe.height - kt, Ue = G > 0 ? Math.max(60 * G, Te * q) : 0;
          F = Te - Ue;
        }
        if (Kt !== null && At !== null) {
          const $ = bn.current, K = Zn.current, O = At / $, b = Kt + K;
          e = {
            min: b - O / 2,
            max: b + O / 2,
            range: O
          };
        }
        return e.max - f / F * e.range;
      }
    });
  }, [l, ae, pe, Ne, r, q, n, Kt, At, xr]);
  o.useEffect(() => {
    Gn.current = Wo;
  }, [Wo]), o.useLayoutEffect(() => {
    Wo();
  }, [Wo]);
  const Cl = [
    s?.rsi,
    s?.macd,
    s?.atr,
    s?.stochastic,
    s?.williamsR,
    s?.cci,
    s?.adx,
    s?.roc,
    s?.aroon,
    s?.momentum,
    s?.ao,
    s?.mfi,
    s?.tsi,
    s?.trix,
    s?.ultimateOsc,
    s?.dpo,
    s?.kst,
    s?.stochRsi,
    s?.bbPercent,
    s?.bbWidth,
    s?.histVol,
    s?.chaikinVol,
    s?.stdDev,
    s?.obv,
    s?.cmf,
    s?.adl,
    s?.forceIndex,
    s?.eom,
    s?.correlation,
    s?.coppock,
    // Phase 2 subplots
    s?.vortex,
    s?.choppiness,
    s?.elderRay,
    s?.massIndex,
    s?.linRegSlope,
    s?.ppo,
    s?.pvo,
    s?.cmo,
    s?.fisher,
    s?.stc,
    s?.rviOsc,
    s?.klinger,
    s?.connorsRsi,
    s?.apo,
    s?.qstick,
    s?.bop,
    s?.psychLine,
    s?.pfe,
    s?.smi,
    s?.ulcerIndex,
    s?.natr,
    s?.trueRange,
    s?.squeeze,
    s?.relVolIndex,
    s?.vhf,
    s?.volumeOsc,
    s?.nvi,
    s?.pvi,
    s?.pvt,
    s?.vroc,
    s?.netVolume,
    s?.twiggsMF,
    s?.linRegRSquared,
    s?.gator
  ].filter(Boolean).length + (s?.customIndicators?.filter((a) => a.display === "subplot").length || 0), La = Cl > 0, br = pe.height - kt, Ea = Cl > 0 ? Math.max(60 * Cl, br * q) : 0, gr = br - Ea, vr = o.useCallback((a) => {
    a.preventDefault(), a.stopPropagation(), je(!0);
    const p = "touches" in a ? a.touches[0].clientY : a.clientY;
    Et.current = { y: p, ratio: q };
  }, [q]);
  o.useEffect(() => {
    if (!vt) return;
    const a = (x) => {
      const y = "touches" in x ? x.touches[0].clientY : x.clientY, e = (Et.current.y - y) / (pe.height - kt), F = Math.max(0.1, Math.min(0.6, Et.current.ratio + e));
      be(F);
    }, p = () => {
      je(!1);
    };
    return window.addEventListener("mousemove", a), window.addEventListener("mouseup", p), window.addEventListener("touchmove", a), window.addEventListener("touchend", p), () => {
      window.removeEventListener("mousemove", a), window.removeEventListener("mouseup", p), window.removeEventListener("touchmove", a), window.removeEventListener("touchend", p);
    };
  }, [vt, pe.height]);
  const Fo = (a) => {
    const { kind: p, label: x, menuKey: y, engineLabel: f, ciId: e, sid: F, remove: $ } = a, K = "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground transition-colors", O = () => {
      p !== "formula" || !e || !ye || (ye({
        ...r,
        customIndicators: (r.customIndicators || []).map((A) => A.id === e ? { ...A, enabled: !1 } : A)
      }), ve(null), he(null));
    }, b = (A) => {
      A.stopPropagation(), yt({
        visible: !0,
        x: A.clientX,
        y: A.clientY,
        key: y,
        title: x,
        custom: p === "engine" ? { kind: p, label: f || x } : p === "formula" ? { kind: p, ciId: e } : { kind: p, sid: F }
      });
    }, w = p === "engine" && !!Ge && !!f || p === "formula" && !!kn;
    return /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
      p === "formula" && /* @__PURE__ */ t.jsx("button", { onClick: (A) => {
        A.stopPropagation(), O();
      }, className: `${K} hover:text-foreground`, title: `Hide ${x}`, children: /* @__PURE__ */ t.jsx(Uo, { className: "w-[15px] h-[15px]" }) }),
      w && /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: (A) => {
            A.stopPropagation(), p === "engine" ? Ge?.(f) : kn?.();
          },
          className: `${K} hover:text-foreground`,
          title: `${x} Settings`,
          children: /* @__PURE__ */ t.jsx(qo, { className: "w-[15px] h-[15px]" })
        }
      ),
      /* @__PURE__ */ t.jsx("button", { onClick: (A) => {
        A.stopPropagation(), $();
      }, className: `${K} hover:text-destructive`, title: `Remove ${x}`, children: /* @__PURE__ */ t.jsx(Go, { className: "w-[15px] h-[15px]" }) }),
      /* @__PURE__ */ t.jsx("button", { onClick: b, className: `${K} hover:text-foreground`, title: "More options", children: /* @__PURE__ */ t.jsx(Zo, { className: "w-[15px] h-[15px]" }) })
    ] });
  };
  return /* @__PURE__ */ t.jsxs(
    "div",
    {
      ref: ot,
      className: "relative w-full h-full select-none",
      style: {
        backgroundColor: te.background,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none"
      },
      children: [
        /* @__PURE__ */ t.jsx(
          "canvas",
          {
            ref: Co,
            width: pe.width * wn,
            height: pe.height * wn,
            className: "absolute inset-0 w-full h-full select-none",
            draggable: !1,
            onDragStart: (a) => a.preventDefault(),
            style: {
              willChange: "contents"
            }
          }
        ),
        /* @__PURE__ */ t.jsx(
          "canvas",
          {
            ref: ja,
            width: pe.width * wn,
            height: pe.height * wn,
            className: "absolute inset-0 w-full h-full cursor-crosshair touch-none select-none",
            draggable: !1,
            onDragStart: (a) => a.preventDefault(),
            style: {
              WebkitTouchCallout: "none",
              WebkitUserSelect: "none",
              willChange: "contents"
            },
            onMouseMove: Sa,
            onMouseDown: Ca,
            onMouseUp: yl,
            onMouseLeave: Ta,
            onTouchStart: Ia,
            onTouchMove: Ma,
            onTouchEnd: Ra,
            onContextMenu: (a) => {
              if (!r || !s) return;
              const p = Ke.current;
              if (!p) return;
              const x = p.getBoundingClientRect(), y = a.clientX - x.left, f = a.clientY - x.top, e = Jt.current, F = (d) => !!d && f >= d.top && f <= d.bottom, $ = r?.customBrueScripts || {}, K = (d, R) => {
                he(`script-${d}`), yt({
                  visible: !0,
                  x: a.clientX,
                  y: a.clientY,
                  key: `script_${d}`,
                  title: $[d]?.name || R,
                  custom: { kind: "brue", sid: d }
                });
              };
              for (const d of Dr()) {
                const R = r[d];
                if (!R?.enabled || !s?.[d] || !F(e[d])) continue;
                a.preventDefault(), a.stopPropagation();
                const ie = R.sourceScriptId;
                if (ie && $[ie]?.enabled) {
                  K(ie, zo(d));
                  return;
                }
                he(`sp-${d}`), yt({
                  visible: !0,
                  x: a.clientX,
                  y: a.clientY,
                  key: d,
                  title: zo(d)
                });
                return;
              }
              for (const d of r.customIndicators || []) {
                if (!d.enabled || d.display !== "subplot" || !F(e[`custom_${d.id}`])) continue;
                a.preventDefault(), a.stopPropagation();
                const R = typeof d.expression == "string" ? d.expression : "";
                if (R.startsWith("brue:") && d.scriptId)
                  K(d.scriptId, d.name || "Brue script");
                else if (R.startsWith("local:")) {
                  const ie = d.group || R.split(":")[1] || d.name;
                  he(`ci-${d.id}`), yt({
                    visible: !0,
                    x: a.clientX,
                    y: a.clientY,
                    key: `custom_${d.id}`,
                    title: ie || "Indicator",
                    custom: { kind: "engine", label: ie }
                  });
                } else
                  he(`ci-${d.id}`), yt({
                    visible: !0,
                    x: a.clientX,
                    y: a.clientY,
                    key: `custom_${d.id}`,
                    title: d.name || "Custom indicator",
                    custom: { kind: "formula", ciId: d.id }
                  });
                return;
              }
              const O = on.current, b = ln.current;
              if (!O || b <= 0) return;
              const w = Re.current, A = w.candleWidth * (1 + He), u = Math.max(0, Math.floor(w.startIndex)) + Math.round(y / A), N = 8, m = (d) => {
                if (isNaN(d) || !isFinite(d)) return !1;
                const R = b - (d - O.min) / O.range * b;
                return Math.abs(f - R) < N;
              }, H = [];
              if (r.movingAverages?.enabled && s.movingAverages && H.push({ key: "movingAverages", title: "Moving Averages", check: () => s.movingAverages.some(
                (d) => u >= 0 && u < d.data.length && m(d.data[u])
              ) }), r.bollinger?.enabled && s.bollinger) {
                const d = s.bollinger;
                H.push({
                  key: "bollinger",
                  title: "Bollinger Bands",
                  check: () => u >= 0 && u < d.upper.length && (m(d.upper[u]) || m(d.middle[u]) || m(d.lower[u]))
                });
              }
              if (r.vwap?.enabled && s.vwap && H.push({
                key: "vwap",
                title: "VWAP",
                check: () => u >= 0 && u < s.vwap.length && m(s.vwap[u])
              }), r.supertrend?.enabled && s.supertrend && H.push({
                key: "supertrend",
                title: "Supertrend",
                check: () => u >= 0 && u < s.supertrend.length && s.supertrend[u] && m(s.supertrend[u].value)
              }), r.ichimoku?.enabled && s.ichimoku) {
                const d = s.ichimoku;
                H.push({
                  key: "ichimoku",
                  title: "Ichimoku Cloud",
                  check: () => u >= 0 && u < d.tenkan.length && (m(d.tenkan[u]) || m(d.kijun[u]) || m(d.senkouA[u]) || m(d.senkouB[u]))
                });
              }
              if (r.keltner?.enabled && s.keltner) {
                const d = s.keltner;
                H.push({
                  key: "keltner",
                  title: "Keltner Channel",
                  check: () => u >= 0 && u < d.upper.length && (m(d.upper[u]) || m(d.middle[u]) || m(d.lower[u]))
                });
              }
              if (r.donchian?.enabled && s.donchian) {
                const d = s.donchian;
                H.push({
                  key: "donchian",
                  title: "Donchian Channel",
                  check: () => u >= 0 && u < d.upper.length && (m(d.upper[u]) || m(d.middle[u]) || m(d.lower[u]))
                });
              }
              for (const d of H)
                if (d.check()) {
                  a.preventDefault(), a.stopPropagation(), he(d.key), yt({ visible: !0, x: a.clientX, y: a.clientY, key: d.key, title: d.title });
                  return;
                }
            }
          }
        ),
        /* @__PURE__ */ t.jsxs(
          "div",
          {
            className: "absolute z-40 flex items-center gap-1",
            style: {
              top: 3,
              left: Qn ? (Ql || 295) + 6 : 6,
              pointerEvents: "auto"
            },
            onMouseEnter: () => {
              ul.current = !0;
            },
            onMouseLeave: () => {
              ul.current = !1;
            },
            children: [
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: () => {
                    ta(!Qn);
                  },
                  className: "flex items-center justify-center w-4 h-4 rounded transition-all duration-200",
                  style: { background: "rgba(128, 128, 128, 0.3)" },
                  title: Qn ? "Hide OHLC" : "Show OHLC",
                  children: Qn ? /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", className: "w-2.5 h-2.5", fill: "none", stroke: "#9ca3af", strokeWidth: "3", strokeLinecap: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M10 4L5 8L10 12" }) }) : /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", className: "w-2.5 h-2.5", fill: "none", stroke: "#9ca3af", strokeWidth: "3", strokeLinecap: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M6 4L11 8L6 12" }) })
                }
              ),
              Qn && h && (() => {
                const a = /* @__PURE__ */ new Date(), p = Du(h), x = Gr(h);
                let y = "", f = "", e = 0, F = 0, $ = !1, K = x ? "#22c55e" : "#ef4444", O = x ? "Market open" : "Market closed", b = "Real time";
                const w = Bu(a), A = w.hours * 60 + w.minutes, V = w.day, u = w.isBST, N = u ? "BST (UTC+1)" : "GMT (UTC+0)", m = String(w.hours).padStart(2, "0"), H = String(w.minutes).padStart(2, "0"), d = Wu(h);
                if (p === "crypto")
                  $ = !0, y = "24/7", f = "Always open", K = "#22c55e", O = "Market open";
                else if (p === "forex")
                  $ = !0, y = u ? "Sun 10 PM – Fri 10 PM BST" : "Sun 10 PM – Fri 10 PM GMT", f = N, x || (O = "Weekend — market closed");
                else if (p === "stock" && d) {
                  const ce = Ko(d);
                  e = ce.openHour * 60 + ce.openMinute, F = ce.closeHour * 60 + ce.closeMinute;
                  const Ie = String(ce.openHour).padStart(2, "0"), et = ce.openMinute === 0 ? "00" : String(ce.openMinute).padStart(2, "0"), Xe = String(ce.closeHour).padStart(2, "0"), Ot = ce.closeMinute === 0 ? "00" : String(ce.closeMinute).padStart(2, "0");
                  if (y = `${Ie}:${et} – ${Xe}:${Ot} ${ce.tzLabel}`, f = `${ce.exchange} (${ce.tzLabel})`, ce.lunchBreak) {
                    const gn = `${String(ce.lunchBreak.startHour).padStart(2, "0")}:${String(ce.lunchBreak.startMinute).padStart(2, "0")}`, Ut = `${String(ce.lunchBreak.endHour).padStart(2, "0")}:${String(ce.lunchBreak.endMinute).padStart(2, "0")}`;
                    y += ` (break ${gn}–${Ut})`;
                  }
                } else if (p === "stock") {
                  e = 14 * 60 + 30, F = 21 * 60, Fu(a) && (F = 18 * 60, K = x ? "#f59e0b" : "#ef4444", O = x ? "Early close today" : "Market closed");
                  const ce = Math.floor(e / 60), Ie = Math.floor(F / 60), et = e % 60 === 0 ? ":00" : ":30", Xe = F % 60 === 0 ? ":00" : ":30";
                  y = `${ce}${et} – ${Ie}${Xe} ${u ? "BST" : "GMT"}`, f = `NYSE/NASDAQ (${N})`;
                } else if (p === "commodity" || p === "index") {
                  $ = !0, y = u ? "Sun 11 PM – Fri 10 PM BST" : "Sun 11 PM – Fri 10 PM GMT", f = N;
                  const ce = u ? 23 * 60 : 22 * 60, Ie = u ? 24 * 60 : 23 * 60;
                  x && A >= ce - 15 && A < ce ? (O = "Closing soon — daily break", K = "#f59e0b") : !x && A >= ce && A < Ie && (O = "Daily maintenance break");
                }
                let R = "";
                if (!$ && p === "stock") {
                  let ce = A;
                  if (d)
                    try {
                      const Ie = Ko(d), Xe = new Intl.DateTimeFormat("en-GB", { timeZone: Ie.timezone, hour: "numeric", minute: "numeric", hour12: !1 }).formatToParts(a), Ot = parseInt(Xe.find((Ut) => Ut.type === "hour")?.value || "0"), gn = parseInt(Xe.find((Ut) => Ut.type === "minute")?.value || "0");
                      ce = Ot * 60 + gn;
                    } catch {
                    }
                  if (x) {
                    const Ie = F - ce;
                    if (Ie > 0) {
                      const et = Math.floor(Ie / 60), Xe = Ie % 60;
                      R = et > 0 ? `Closes in ${et}h ${Xe}m` : `Closes in ${Xe} minutes`;
                    }
                  } else {
                    const Ie = d ? (() => {
                      try {
                        const Xe = new Intl.DateTimeFormat("en-GB", { timeZone: Ko(d).timezone, weekday: "short" }).formatToParts(a).find((Ot) => Ot.type === "weekday")?.value || "";
                        return { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5 }[Xe] || 0;
                      } catch {
                        return 0;
                      }
                    })() : V;
                    if (Ie >= 1 && Ie <= 5 && ce < e) {
                      const et = e - ce, Xe = Math.floor(et / 60), Ot = et % 60;
                      R = Xe > 0 ? `Opens in ${Xe}h ${Ot}m` : `Opens in ${Ot} minutes`;
                    }
                  }
                }
                let ie = 0;
                if (!$ && x && F > e) {
                  let ce = A;
                  if (d)
                    try {
                      const Ie = Ko(d), Xe = new Intl.DateTimeFormat("en-GB", { timeZone: Ie.timezone, hour: "numeric", minute: "numeric", hour12: !1 }).formatToParts(a), Ot = parseInt(Xe.find((Ut) => Ut.type === "hour")?.value || "0"), gn = parseInt(Xe.find((Ut) => Ut.type === "minute")?.value || "0");
                      ce = Ot * 60 + gn;
                    } catch {
                    }
                  ie = Math.max(0, Math.min(1, (ce - e) / (F - e)));
                }
                const De = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][V], J = typeof document < "u" && document.documentElement.classList.contains("dark"), Be = J ? "rgba(22, 25, 35, 0.98)" : "rgba(255, 255, 255, 0.98)", G = J ? "rgba(55, 60, 75, 0.6)" : "rgba(210, 215, 225, 0.8)", Te = J ? "#7b8094" : "#6b7280", Ue = J ? "#a0a6b8" : "#374151", We = J ? "#2a2e3a" : "#e5e7eb";
                return /* @__PURE__ */ t.jsxs(
                  "div",
                  {
                    ref: cl,
                    className: "relative",
                    children: [
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (ce) => {
                            ce.stopPropagation(), er((Ie) => !Ie);
                          },
                          className: "flex items-center justify-center w-5 h-5 rounded-full transition-all duration-200 hover:scale-125",
                          title: "Session info",
                          style: { background: "transparent" },
                          children: /* @__PURE__ */ t.jsx(
                            "span",
                            {
                              className: "block rounded-full",
                              style: {
                                width: 7,
                                height: 7,
                                background: K,
                                boxShadow: `0 0 6px ${K}60`
                              }
                            }
                          )
                        }
                      ),
                      no && /* @__PURE__ */ t.jsxs(
                        "div",
                        {
                          style: {
                            position: "absolute",
                            top: "calc(100% + 4px)",
                            left: -40,
                            width: 260,
                            background: Be,
                            border: `1px solid ${G}`,
                            borderRadius: 10,
                            boxShadow: J ? "0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)" : "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                            zIndex: 100,
                            backdropFilter: "blur(12px)",
                            overflow: "hidden"
                          },
                          children: [
                            /* @__PURE__ */ t.jsxs("div", { style: { padding: "14px 16px 10px" }, children: [
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                                /* @__PURE__ */ t.jsx(
                                  "span",
                                  {
                                    style: {
                                      width: 8,
                                      height: 8,
                                      borderRadius: "50%",
                                      background: K,
                                      boxShadow: `0 0 6px ${K}60`,
                                      flexShrink: 0
                                    }
                                  }
                                ),
                                /* @__PURE__ */ t.jsx("span", { style: { color: K, fontSize: 13, fontWeight: 600 }, children: O })
                              ] }),
                              R && /* @__PURE__ */ t.jsx("p", { style: { color: Te, fontSize: 12, margin: "4px 0 0 16px", lineHeight: 1.3 }, children: R })
                            ] }),
                            !$ && p === "stock" && /* @__PURE__ */ t.jsxs("div", { style: { padding: "6px 16px 10px" }, children: [
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Te, fontSize: 9, fontWeight: 700, letterSpacing: 1.2, fontFamily: '"SF Mono", Consolas, monospace' }, children: De }),
                                /* @__PURE__ */ t.jsx("div", { style: { flex: 1, height: 5, borderRadius: 3, background: We, overflow: "hidden", position: "relative" }, children: x && /* @__PURE__ */ t.jsx(
                                  "div",
                                  {
                                    style: {
                                      position: "absolute",
                                      left: 0,
                                      top: 0,
                                      height: "100%",
                                      width: `${ie * 100}%`,
                                      background: `linear-gradient(90deg, ${K}aa, ${K})`,
                                      borderRadius: 3,
                                      transition: "width 1s ease"
                                    }
                                  }
                                ) })
                              ] }),
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 10, color: Te, fontFamily: '"SF Mono", Consolas, monospace' }, children: [
                                /* @__PURE__ */ t.jsx("span", { children: y.split("–")[0]?.trim() }),
                                /* @__PURE__ */ t.jsx("span", { children: y.split("–")[1]?.trim() })
                              ] })
                            ] }),
                            /* @__PURE__ */ t.jsx("div", { style: { height: 1, background: G, margin: "0 12px" } }),
                            /* @__PURE__ */ t.jsxs("div", { style: { padding: "10px 16px 14px" }, children: [
                              f && /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Te }, children: "Exchange timezone" }),
                                /* @__PURE__ */ t.jsx("span", { style: { color: Ue, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: f })
                              ] }),
                              y && p !== "stock" && /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Te }, children: "Session" }),
                                /* @__PURE__ */ t.jsx("span", { style: { color: Ue, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: y })
                              ] }),
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Te }, children: "Local time" }),
                                /* @__PURE__ */ t.jsxs("span", { style: { color: Ue, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: [
                                  m,
                                  ":",
                                  H,
                                  " ",
                                  u ? "BST" : "GMT"
                                ] })
                              ] }),
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Te }, children: "Update frequency" }),
                                /* @__PURE__ */ t.jsx("span", { style: { color: "#22c55e", fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: b })
                              ] })
                            ] })
                          ]
                        }
                      )
                    ]
                  }
                );
              })()
            ]
          }
        ),
        Qn && r && ye && (() => {
          const a = {
            bollinger: () => dl,
            movingAverages: () => hl,
            vwap: () => fl,
            volumeProfile: () => pl,
            volume: () => ml
          }, p = Ou().map((b) => ({
            key: b,
            title: zo(b),
            enabledCheck: () => b === "volume" ? !!(r?.volume?.enabled && l.some((w) => w.volume)) : b === "volumeProfile" ? !!r?.volumeProfile?.enabled : !!(r?.[b]?.enabled && s?.[b]),
            endXSource: a[b] ?? (() => rt[b] || 0)
          })), x = $e.toolbarLineHeight;
          let y = $e.toolbarStartY;
          const f = [], e = r?.customBrueScripts || {};
          for (const b of p) {
            if (!b.enabledCheck()) continue;
            if (b.key !== "movingAverages") {
              const u = r?.[b.key]?.sourceScriptId;
              if (u && e[u]?.enabled) continue;
            }
            const w = _s.current[b.key] || b.endXSource() || 150;
            if (b.key === "movingAverages" && s?.movingAverages?.length > 0) {
              const u = r.movingAverages?.lines ?? [], N = r?.customBrueScripts || {};
              for (let m = 0; m < s.movingAverages.length; m++) {
                const H = u[m]?.sourceScriptId;
                if (H && N[H]?.enabled) continue;
                const d = `movingAverages__${m}`, R = y;
                y += x;
                const ie = Tt === d, De = u[m], J = De ? `${De.type} ${De.period}` : "MA", Be = () => {
                  const G = u.filter((Te, Ue) => Ue !== m);
                  ye({
                    ...r,
                    movingAverages: {
                      ...r.movingAverages,
                      enabled: G.length > 0,
                      lines: G
                    }
                  }), ve(null), he(null);
                };
                f.push(
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      className: "absolute z-20 flex items-center",
                      style: { left: 0, top: R - $e.toolbarRowYOffset, height: x },
                      onMouseEnter: () => {
                        ve(d), Qt.current = !0, gt.current && clearTimeout(gt.current);
                      },
                      onMouseLeave: () => {
                        gt.current = setTimeout(() => {
                          ve((G) => G === d ? null : G), Qt.current = !1;
                        }, 150);
                      },
                      children: [
                        ie && /* @__PURE__ */ t.jsx(
                          "div",
                          {
                            className: "absolute inset-0 pointer-events-none",
                            style: { width: w + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" }
                          }
                        ),
                        /* @__PURE__ */ t.jsx(
                          "div",
                          {
                            className: "cursor-pointer select-none",
                            style: { width: w, height: 16 },
                            onClick: (G) => {
                              G.stopPropagation(), he((Te) => Te === d ? null : d), ve(d);
                            },
                            onContextMenu: (G) => {
                              G.preventDefault(), G.stopPropagation(), he(d), yt({ visible: !0, x: G.clientX, y: G.clientY, key: d, title: J });
                            }
                          }
                        ),
                        ie && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (G) => {
                                G.stopPropagation(), Be();
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                              title: `Hide ${J}`,
                              children: /* @__PURE__ */ t.jsx(Uo, { className: "w-[15px] h-[15px]" })
                            }
                          ),
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (G) => {
                                G.stopPropagation(), $s({ type: "movingAverages", position: { x: w, y: R } });
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                              title: `${J} Settings`,
                              children: /* @__PURE__ */ t.jsx(qo, { className: "w-[15px] h-[15px]" })
                            }
                          ),
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (G) => {
                                G.stopPropagation(), Be();
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors",
                              title: `Remove ${J}`,
                              children: /* @__PURE__ */ t.jsx(Go, { className: "w-[15px] h-[15px]" })
                            }
                          ),
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (G) => {
                                G.stopPropagation(), he(d), yt({ visible: !0, x: G.clientX, y: G.clientY, key: d, title: J });
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                              title: "More options",
                              children: /* @__PURE__ */ t.jsx(Zo, { className: "w-[15px] h-[15px]" })
                            }
                          )
                        ] })
                      ]
                    },
                    `overlay-row-${d}`
                  )
                );
              }
              continue;
            }
            const A = y;
            y += x;
            const V = Tt === b.key;
            V || b.key, f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: {
                    left: 0,
                    top: A - $e.toolbarRowYOffset,
                    height: x
                  },
                  onMouseEnter: () => {
                    ve(b.key), Qt.current = !0, gt.current && clearTimeout(gt.current);
                  },
                  onMouseLeave: () => {
                    gt.current = setTimeout(() => {
                      ve((u) => u === b.key ? null : u), Qt.current = !1;
                    }, 150);
                  },
                  children: [
                    V && /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "absolute inset-0 pointer-events-none",
                        style: {
                          width: w + 105,
                          borderRadius: 3,
                          background: "rgba(59, 130, 246, 0.08)"
                        }
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: w, height: 16 },
                        onClick: (u) => {
                          u.stopPropagation(), he((N) => N === b.key ? null : b.key), ve(b.key);
                        },
                        onContextMenu: (u) => {
                          u.preventDefault(), u.stopPropagation(), he(b.key), yt({ visible: !0, x: u.clientX, y: u.clientY, key: b.key, title: b.title });
                        }
                      }
                    ),
                    V && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation();
                            const N = r[b.key];
                            N && ye({ ...r, [b.key]: { ...N, enabled: !1 } }), ve(null), he(null);
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                          title: `Hide ${b.title}`,
                          children: /* @__PURE__ */ t.jsx(Uo, { className: "w-[15px] h-[15px]" })
                        }
                      ),
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation(), $s({ type: b.key, position: { x: w, y: A } });
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                          title: `${b.title} Settings`,
                          children: /* @__PURE__ */ t.jsx(qo, { className: "w-[15px] h-[15px]" })
                        }
                      ),
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation();
                            const N = r[b.key];
                            N && ye({ ...r, [b.key]: { ...N, enabled: !1 } }), ve(null), he(null);
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors",
                          title: `Remove ${b.title}`,
                          children: /* @__PURE__ */ t.jsx(Go, { className: "w-[15px] h-[15px]" })
                        }
                      ),
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation(), he(b.key), yt({ visible: !0, x: u.clientX, y: u.clientY, key: b.key, title: b.title });
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                          title: "More options",
                          children: /* @__PURE__ */ t.jsx(Zo, { className: "w-[15px] h-[15px]" })
                        }
                      )
                    ] })
                  ]
                },
                `overlay-row-${b.key}`
              )
            );
          }
          const F = (r?.customIndicators || []).filter((b) => b.enabled && b.display === "overlay"), $ = /* @__PURE__ */ new Map(), K = [];
          for (const b of F)
            if (typeof b.expression == "string" && b.expression.startsWith("brue:") && b.scriptId) {
              const A = b.scriptId;
              $.has(A) || $.set(A, b);
            } else
              K.push(b);
          for (const b of K) {
            const w = `custom_overlay_${b.id}`, A = _s.current[w] || rt[w] || 150, V = y;
            y += x;
            const u = `ci-${b.id}`, N = Tt === u, m = typeof b.expression == "string" && b.expression.startsWith("local:"), H = m ? b.group || b.expression.split(":")[1] || b.name : null, d = () => {
              m ? Oe?.(H) : ye && ye({
                ...r,
                customIndicators: (r.customIndicators || []).filter((R) => R.id !== b.id)
              }), ve(null), he(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: V - $e.toolbarRowYOffset, height: x },
                  onMouseEnter: () => {
                    ve(u), Qt.current = !0, gt.current && clearTimeout(gt.current);
                  },
                  onMouseLeave: () => {
                    gt.current = setTimeout(() => {
                      ve((R) => R === u ? null : R), Qt.current = !1;
                    }, 150);
                  },
                  children: [
                    N && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: A + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: A, height: 16 },
                        onClick: (R) => {
                          R.stopPropagation(), he((ie) => ie === u ? null : u), ve(u);
                        },
                        onContextMenu: (R) => {
                          R.preventDefault(), R.stopPropagation(), he(u), yt({
                            visible: !0,
                            x: R.clientX,
                            y: R.clientY,
                            key: w,
                            title: m && H || b.name,
                            custom: m ? { kind: "engine", label: H } : { kind: "formula", ciId: b.id }
                          });
                        }
                      }
                    ),
                    N && Fo({
                      kind: m ? "engine" : "formula",
                      label: m && H || b.name,
                      menuKey: w,
                      engineLabel: H || void 0,
                      ciId: b.id,
                      remove: d
                    })
                  ]
                },
                `overlay-row-${u}`
              )
            );
          }
          for (const [b, w] of $.entries()) {
            const A = `script_${b}`, V = _s.current[A] || rt[A] || 150, u = y;
            y += x;
            const N = `script-${b}`, m = Tt === N, H = r?.customBrueScripts?.[b]?.name || w.name || "Brue script", d = () => {
              oe?.(b), ve(null), he(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: u - $e.toolbarRowYOffset, height: x },
                  onMouseEnter: () => {
                    ve(N), Qt.current = !0, gt.current && clearTimeout(gt.current);
                  },
                  onMouseLeave: () => {
                    gt.current = setTimeout(() => {
                      ve((R) => R === N ? null : R), Qt.current = !1;
                    }, 150);
                  },
                  children: [
                    m && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: V + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: V, height: 16 },
                        onClick: (R) => {
                          R.stopPropagation(), he((ie) => ie === N ? null : N), ve(N);
                        },
                        onContextMenu: (R) => {
                          R.preventDefault(), R.stopPropagation(), he(N), yt({
                            visible: !0,
                            x: R.clientX,
                            y: R.clientY,
                            key: A,
                            title: H,
                            custom: { kind: "brue", sid: b }
                          });
                        }
                      }
                    ),
                    m && Fo({
                      kind: "brue",
                      label: H,
                      menuKey: A,
                      sid: b,
                      remove: d
                    })
                  ]
                },
                `overlay-row-${N}`
              )
            );
          }
          const O = r?.customBrueScripts || {};
          for (const b of Object.keys(O)) {
            const w = O[b];
            if (!w?.enabled || $.has(b)) continue;
            const A = `script_${b}`, V = _s.current[A] || rt[A] || 150, u = y;
            y += x;
            const N = `script-${b}`, m = Tt === N, H = w.name || "Brue script", d = () => {
              oe?.(b), ve(null), he(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: u - $e.toolbarRowYOffset, height: x },
                  onMouseEnter: () => {
                    ve(N), Qt.current = !0, gt.current && clearTimeout(gt.current);
                  },
                  onMouseLeave: () => {
                    gt.current = setTimeout(() => {
                      ve((R) => R === N ? null : R), Qt.current = !1;
                    }, 150);
                  },
                  children: [
                    m && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: V + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: V, height: 16 },
                        onClick: (R) => {
                          R.stopPropagation(), he((ie) => ie === N ? null : N), ve(N);
                        },
                        onContextMenu: (R) => {
                          R.preventDefault(), R.stopPropagation(), he(N), yt({
                            visible: !0,
                            x: R.clientX,
                            y: R.clientY,
                            key: A,
                            title: H,
                            custom: { kind: "brue", sid: b }
                          });
                        }
                      }
                    ),
                    m && Fo({
                      kind: "brue",
                      label: H,
                      menuKey: A,
                      sid: b,
                      remove: d
                    })
                  ]
                },
                `overlay-row-${N}`
              )
            );
          }
          return f;
        })(),
        r && ye && (() => {
          const a = Dr().map((x) => ({ key: x, title: zo(x) })), p = r?.customBrueScripts || {};
          return a.map(({ key: x, title: y }) => {
            const f = Jt.current[x];
            if (!s?.[x] || !f) return null;
            const F = r?.[x]?.sourceScriptId;
            if (F && p[F]?.enabled) return null;
            const $ = $n.current[x] || tr[x] || 150, K = `sp-${x}`, O = Tt === K;
            return /* @__PURE__ */ t.jsxs(
              "div",
              {
                className: "absolute z-20 flex items-center",
                style: {
                  left: 0,
                  top: f.top + 2,
                  height: 16
                },
                onMouseEnter: () => {
                  ve(K), Qt.current = !0, gt.current && clearTimeout(gt.current);
                },
                onMouseLeave: () => {
                  gt.current = setTimeout(() => {
                    ve((b) => b === K ? null : b), Qt.current = !1;
                  }, 150);
                },
                children: [
                  O && /* @__PURE__ */ t.jsx(
                    "div",
                    {
                      className: "absolute inset-0 pointer-events-none",
                      style: {
                        width: $ + 105,
                        borderRadius: 3,
                        background: "rgba(59, 130, 246, 0.08)"
                      }
                    }
                  ),
                  /* @__PURE__ */ t.jsx(
                    "div",
                    {
                      className: "cursor-pointer select-none",
                      style: { width: $, height: 16 },
                      onClick: (b) => {
                        b.stopPropagation(), he((w) => w === K ? null : K), ve(K);
                      },
                      onContextMenu: (b) => {
                        b.preventDefault(), b.stopPropagation(), he(K), yt({ visible: !0, x: b.clientX, y: b.clientY, key: x, title: y });
                      }
                    }
                  ),
                  O && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (b) => {
                          b.stopPropagation();
                          const w = r[x];
                          w && ye({ ...r, [x]: { ...w, enabled: !1 } }), ve(null), he(null);
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: `Hide ${y}`,
                        children: /* @__PURE__ */ t.jsx(Uo, { className: "w-[15px] h-[15px]" })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (b) => {
                          b.stopPropagation(), $s({ type: x, position: { x: $, y: f.top } });
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: `${y} Settings`,
                        children: /* @__PURE__ */ t.jsx(qo, { className: "w-[15px] h-[15px]" })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (b) => {
                          b.stopPropagation();
                          const w = r[x];
                          w && ye({ ...r, [x]: { ...w, enabled: !1 } }), ve(null), he(null);
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors",
                        title: `Remove ${y}`,
                        children: /* @__PURE__ */ t.jsx(Go, { className: "w-[15px] h-[15px]" })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (b) => {
                          b.stopPropagation(), he(K), yt({ visible: !0, x: b.clientX, y: b.clientY, key: x, title: y });
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: "More options",
                        children: /* @__PURE__ */ t.jsx(Zo, { className: "w-[15px] h-[15px]" })
                      }
                    )
                  ] })
                ]
              },
              `sp-row-${x}`
            );
          });
        })(),
        r && ye && (() => {
          const a = (r?.customIndicators || []).filter((e) => e.enabled && e.display === "subplot"), p = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Map();
          for (const e of a)
            if (typeof e.expression == "string" && e.expression.startsWith("brue:") && e.scriptId) {
              const $ = e.scriptId;
              p.has($) || p.set($, e);
            } else if (typeof e.expression == "string" && e.expression.startsWith("local:") && e.group) {
              const $ = e.group;
              x.has($) || x.set($, e);
            }
          const y = [], f = [];
          for (const [e, F] of p.entries())
            f.push({
              rowKey: `script-${e}`,
              firstPlot: F,
              label: r?.customBrueScripts?.[e]?.name || F.name || "Brue script",
              kind: "brue",
              handle: e,
              remove: () => oe?.(e)
            });
          for (const [e, F] of x.entries())
            f.push({
              rowKey: `engine-sp-${e}`,
              firstPlot: F,
              label: e,
              kind: "engine",
              handle: e,
              remove: () => Oe?.(e)
            });
          for (const { rowKey: e, firstPlot: F, label: $, kind: K, handle: O, remove: b } of f) {
            const w = Jt.current[`custom_${F.id}`];
            if (!w) continue;
            const A = Tt === e, V = 200, u = () => {
              b(), ve(null), he(null);
            };
            y.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: w.top + 2, height: 16 },
                  onMouseEnter: () => {
                    ve(e), Qt.current = !0, gt.current && clearTimeout(gt.current);
                  },
                  onMouseLeave: () => {
                    gt.current = setTimeout(() => {
                      ve((N) => N === e ? null : N), Qt.current = !1;
                    }, 150);
                  },
                  children: [
                    A && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: V + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: V, height: 16 },
                        onClick: (N) => {
                          N.stopPropagation(), he((m) => m === e ? null : e), ve(e);
                        },
                        onContextMenu: (N) => {
                          N.preventDefault(), N.stopPropagation(), he(e), yt({
                            visible: !0,
                            x: N.clientX,
                            y: N.clientY,
                            key: `custom_${F.id}`,
                            title: $,
                            custom: K === "engine" ? { kind: "engine", label: O } : { kind: "brue", sid: O }
                          });
                        }
                      }
                    ),
                    A && Fo({
                      kind: K,
                      label: $,
                      menuKey: `custom_${F.id}`,
                      engineLabel: K === "engine" ? O : void 0,
                      sid: K === "brue" ? O : void 0,
                      remove: u
                    })
                  ]
                },
                `sp-row-${e}`
              )
            );
          }
          return y;
        })(),
        /* @__PURE__ */ t.jsx(
          "div",
          {
            ref: Na,
            className: "absolute top-0 cursor-ns-resize z-40",
            style: {
              right: 0,
              width: Ve,
              height: gr
            },
            onMouseDown: ka,
            onTouchStart: wa,
            title: "Drag to stretch/compress, Scroll to pan up/down"
          }
        ),
        /* @__PURE__ */ t.jsx(
          "div",
          {
            className: "absolute z-10 flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity duration-200",
            style: {
              bottom: kt + 8,
              left: `calc(50% - ${Ve / 2}px)`,
              transform: "translateX(-50%)"
            },
            children: /* @__PURE__ */ t.jsxs("div", { className: "flex items-center bg-card/90 backdrop-blur-sm rounded-lg border border-border/40 shadow-lg overflow-hidden", children: [
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: xa,
                  className: "w-8 h-7 lg:w-10 lg:h-9 flex items-center justify-center hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all text-lg lg:text-xl font-light border-r border-border/30",
                  title: "Zoom out (show more candles)",
                  children: "−"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: ma,
                  className: "w-8 h-7 lg:w-10 lg:h-9 flex items-center justify-center hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all text-lg lg:text-xl font-light border-r border-border/30",
                  title: "Zoom in (show fewer candles)",
                  children: "+"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: va,
                  className: "w-7 h-7 lg:w-9 lg:h-9 flex items-center justify-center hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all text-base lg:text-lg border-r border-border/30",
                  title: "Move left (older)",
                  children: "‹"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: ya,
                  className: "w-7 h-7 lg:w-9 lg:h-9 flex items-center justify-center hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all text-base lg:text-lg border-r border-border/30",
                  title: "Move right (newer)",
                  children: "›"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: ba,
                  className: "w-8 h-7 lg:w-10 lg:h-9 flex items-center justify-center hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all",
                  title: "Reset view",
                  children: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 14 14", className: "w-3.5 h-3.5 lg:w-4 lg:h-4", fill: "currentColor", children: /* @__PURE__ */ t.jsx("path", { d: "M7 1.5c-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5c2.41 0 4.46-1.55 5.2-3.71l-1.41-.49c-.53 1.51-1.96 2.6-3.79 2.6-2.13 0-3.9-1.77-3.9-3.9s1.77-3.9 3.9-3.9c1.08 0 2.05.44 2.75 1.15L8 6h4.5V1.5L10.96 3C9.93 1.97 8.54 1.5 7 1.5z" }) })
                }
              )
            ] })
          }
        ),
        hs && /* @__PURE__ */ t.jsx(
          "div",
          {
            className: "absolute z-50 flex items-center justify-center",
            style: {
              top: 4,
              // Desktop reserves the RIGHT_TOOLBAR_WIDTH gap because the price
              // axis carries the right toolbar overlay; phone/tablet have no
              // overlay, so the reset button uses the full axis width.
              right: Xn ?? ($e.yAxisResetUsesToolbarGap ? Fl : 0),
              width: Xn !== void 0 ? Ve - Xn : $e.yAxisResetUsesToolbarGap ? Ve - Fl : Ve
            },
            children: /* @__PURE__ */ t.jsxs(
              "button",
              {
                onClick: ga,
                className: "flex items-center gap-1 px-1.5 py-0.5 bg-primary/20 hover:bg-primary/30 text-primary text-2xs rounded border border-primary/30 transition-all",
                title: "Reset price scale to auto",
                children: [
                  /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 14 14", className: "w-2.5 h-2.5", fill: "currentColor", children: /* @__PURE__ */ t.jsx("path", { d: "M7 1.5c-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5c2.41 0 4.46-1.55 5.2-3.71l-1.41-.49c-.53 1.51-1.96 2.6-3.79 2.6-2.13 0-3.9-1.77-3.9-3.9s1.77-3.9 3.9-3.9c1.08 0 2.05.44 2.75 1.15L8 6h4.5V1.5L10.96 3C9.93 1.97 8.54 1.5 7 1.5z" }) }),
                  "Auto"
                ]
              }
            )
          }
        ),
        La && /* @__PURE__ */ t.jsxs(
          "div",
          {
            className: "absolute left-0 h-3 flex items-center justify-center cursor-ns-resize z-10 group hover:h-4 transition-all duration-150",
            style: {
              top: gr - 6,
              right: Ve,
              left: 0
            },
            onMouseDown: vr,
            onTouchStart: vr,
            children: [
              /* @__PURE__ */ t.jsx("div", { className: "w-full h-[1px] bg-border/20 group-hover:bg-primary/40 transition-all duration-150" }),
              /* @__PURE__ */ t.jsx("div", { className: `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
            opacity-0 group-hover:opacity-100
            transition-all duration-150`, children: /* @__PURE__ */ t.jsx("div", { className: "flex items-center justify-center w-10 h-2.5 rounded-sm bg-muted/80 border border-border/60 hover:bg-primary/30 hover:border-primary/50", children: /* @__PURE__ */ t.jsxs("div", { className: "flex flex-col gap-[2px]", children: [
                /* @__PURE__ */ t.jsx("div", { className: "w-5 h-[1px] bg-muted-foreground/60 group-hover:bg-primary/80" }),
                /* @__PURE__ */ t.jsx("div", { className: "w-5 h-[1px] bg-muted-foreground/60 group-hover:bg-primary/80" })
              ] }) }) })
            ]
          }
        ),
        so && r && ye && pe && /* @__PURE__ */ t.jsx(
          _u,
          {
            type: so.type,
            config: r,
            onConfigChange: ye,
            position: so.position,
            onClose: () => $s(null)
          }
        ),
        Nn && Nn.visible && r && ye && (() => {
          const a = Ke.current?.getBoundingClientRect();
          if (!a) return null;
          const p = Nn.x - a.left, x = Nn.y - a.top, y = Nn.key, f = Nn.custom, e = () => {
            f?.kind === "brue" ? oe?.(f.sid) : f?.kind === "engine" ? Oe?.(f.label) : f?.kind === "formula" && ye({
              ...r,
              customIndicators: (r.customIndicators || []).filter((F) => F.id !== f.ciId)
            });
          };
          return Lr.createPortal(
            (() => {
              const F = "var(--text)", $ = "var(--dim)", K = "var(--hover)", O = "var(--edge)", b = {
                display: "block",
                width: "100%",
                padding: "3px 10px",
                border: "none",
                cursor: "pointer",
                background: "transparent",
                textAlign: "left",
                fontSize: "12px",
                fontFamily: "inherit",
                color: F,
                lineHeight: "1.5"
              };
              return /* @__PURE__ */ t.jsxs(
                "div",
                {
                  style: {
                    position: "fixed",
                    zIndex: 9999,
                    minWidth: "150px",
                    padding: "2px 0 6px",
                    background: "var(--panel)",
                    border: "1px solid var(--edge)",
                    borderRadius: "2px",
                    boxShadow: "0 6px 20px var(--shadow)",
                    // Clamped into the viewport, same as the shell's chart menu.
                    // Subplot panels sit at the BOTTOM of the chart, so once the
                    // whole panel became a right-click target an unclamped menu
                    // put Remove below the window edge most of the time.
                    left: Math.min(Nn.x, window.innerWidth - 170),
                    top: Math.min(Nn.y, window.innerHeight - 140)
                  },
                  children: [
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        style: { position: "fixed", inset: 0, zIndex: -1 },
                        onClick: () => {
                          yt(null), he(null);
                        },
                        onContextMenu: (w) => {
                          w.preventDefault(), yt(null), he(null);
                        }
                      }
                    ),
                    /* @__PURE__ */ t.jsx("div", { style: {
                      padding: "5px 10px 3px",
                      fontSize: "11px",
                      color: $,
                      whiteSpace: "nowrap"
                    }, children: Nn.title }),
                    !f && /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        style: b,
                        onMouseEnter: (w) => {
                          w.currentTarget.style.background = K;
                        },
                        onMouseLeave: (w) => {
                          w.currentTarget.style.background = "transparent";
                        },
                        onClick: () => {
                          $s({ type: y, position: { x: p, y: x } }), yt(null);
                        },
                        children: "Settings..."
                      }
                    ),
                    f?.kind === "engine" && Ge && /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        style: b,
                        onMouseEnter: (w) => {
                          w.currentTarget.style.background = K;
                        },
                        onMouseLeave: (w) => {
                          w.currentTarget.style.background = "transparent";
                        },
                        onClick: () => {
                          Ge(f.label), yt(null);
                        },
                        children: "Settings..."
                      }
                    ),
                    !f && /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        style: b,
                        onMouseEnter: (w) => {
                          w.currentTarget.style.background = K;
                        },
                        onMouseLeave: (w) => {
                          w.currentTarget.style.background = "transparent";
                        },
                        onClick: () => {
                          const w = r[y];
                          w && ye({ ...r, [y]: { ...w, enabled: !1 } }), yt(null), he(null);
                        },
                        children: "Hide"
                      }
                    ),
                    /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: `1px solid ${O}` } }),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        style: { ...b, color: "var(--err)" },
                        onMouseEnter: (w) => {
                          w.currentTarget.style.background = K;
                        },
                        onMouseLeave: (w) => {
                          w.currentTarget.style.background = "transparent";
                        },
                        onClick: () => {
                          if (f)
                            e();
                          else {
                            const w = r[y];
                            w && ye({ ...r, [y]: { ...w, enabled: !1 } });
                          }
                          yt(null), he(null);
                        },
                        children: "Remove"
                      }
                    )
                  ]
                }
              );
            })(),
            document.body
          );
        })()
      ]
    }
  );
}, rd = [
  { title: "Select", tools: ["cursor"] },
  { title: "Lines", tools: ["trendline", "arrow", "ray", "extended", "hline", "hray", "vline", "cross"] },
  { title: "Shapes", tools: ["rectangle", "channel", "polyline", "brush"] },
  { title: "Levels", tools: ["fib", "long", "short"] },
  { title: "Notes", tools: ["text", "measure", "pricerange", "daterange"] }
], ad = {
  cursor: { label: "Cursor", icon: "↖" },
  trendline: { label: "Trendline", icon: "╱" },
  arrow: { label: "Arrow", icon: "↗" },
  ray: { label: "Ray", icon: "⤢" },
  extended: { label: "Extended", icon: "⟷" },
  hline: { label: "Horizontal", icon: "─" },
  hray: { label: "H Ray", icon: "⇥" },
  vline: { label: "Vertical", icon: "│" },
  cross: { label: "Cross", icon: "+" },
  rectangle: { label: "Rectangle", icon: "▭" },
  brush: { label: "Brush", icon: "〰" },
  measure: { label: "Measure", icon: "📏" },
  pricerange: { label: "Price Range", icon: "↕" },
  daterange: { label: "Date Range", icon: "↔" },
  fib: { label: "Fib", icon: "≋" },
  long: { label: "Long", icon: "▲" },
  short: { label: "Short", icon: "▼" },
  text: { label: "Text", icon: "T" },
  channel: { label: "Channel", icon: "═" },
  polyline: { label: "Polyline", icon: "◿" }
};
function id({ active: l, title: n, icon: h, onClick: M }) {
  return /* @__PURE__ */ t.jsxs(
    "button",
    {
      onClick: M,
      title: n,
      className: `relative w-9 h-9 flex items-center justify-center rounded-md text-[14px] font-medium transition-all
        ${l ? "bg-[#e8e8e8] text-[#1c1c1c] shadow-sm" : "bg-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}
      `,
      children: [
        l && /* @__PURE__ */ t.jsx("span", { className: "absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-[#21b3a4] rounded-r" }),
        /* @__PURE__ */ t.jsx("span", { className: "leading-none", children: h })
      ]
    }
  );
}
function Qo({ active: l, title: n, icon: h, onClick: M }) {
  return /* @__PURE__ */ t.jsx(
    "button",
    {
      onClick: M,
      title: n,
      className: `w-9 h-9 flex items-center justify-center rounded-md text-[13px] transition-colors
        ${l ? "bg-[#343434] text-[#e8e8e8] border border-[#4a4a4a]" : "text-[#6a6a6a] hover:bg-[#262626] hover:text-[#b9b9b9]"}
      `,
      children: h
    }
  );
}
function cd({
  activeTool: l = "cursor",
  onToolSelect: n,
  magnet: h = !1,
  onToggleMagnet: M,
  hiddenAll: T = !1,
  onToggleHidden: ee,
  onClearAll: ne,
  collapsed: Ce = !1,
  onToggleCollapsed: r
}) {
  const [ye, oe] = o.useState(!1), Oe = Ce ? 16 : 48;
  return Ce ? /* @__PURE__ */ t.jsx("div", { className: "flex flex-col items-center bg-[#1c1c1c] border-r border-[#2a2a2a] shrink-0 py-2", style: { width: Oe, minWidth: Oe }, children: /* @__PURE__ */ t.jsx("button", { onClick: () => r?.(), className: "w-6 h-6 flex items-center justify-center rounded bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] hover:text-[#e8e8e8] hover:bg-[#343434] text-[10px]", children: "›" }) }) : /* @__PURE__ */ t.jsxs("div", { className: "flex flex-col bg-[#1c1c1c] border-r border-[#2a2a2a] shrink-0 select-none", style: { width: Oe, minWidth: Oe }, children: [
    /* @__PURE__ */ t.jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden flex flex-col items-center gap-1 px-1 py-2 scrollbar-thin", children: rd.map((Ge, Ne) => /* @__PURE__ */ t.jsxs(ki.Fragment, { children: [
      Ne > 0 && /* @__PURE__ */ t.jsx("div", { className: "w-8 h-px bg-[#2a2a2a] my-2 shrink-0" }),
      /* @__PURE__ */ t.jsx("div", { className: "flex flex-col items-center gap-1", children: Ge.tools.map((Fe) => {
        const ge = ad[Fe];
        return /* @__PURE__ */ t.jsx(
          id,
          {
            active: l === Fe,
            title: ge.label,
            icon: ge.icon,
            onClick: () => {
              n?.(l === Fe ? "cursor" : Fe);
            }
          },
          Fe
        );
      }) })
    ] }, Ne)) }),
    /* @__PURE__ */ t.jsxs("div", { className: "shrink-0 flex flex-col items-center gap-1 px-1 py-2 border-t border-[#2a2a2a]", children: [
      /* @__PURE__ */ t.jsx(Qo, { active: h, title: h ? "Magnet ON — snap to OHLC" : "Magnet OFF", icon: "🧲", onClick: () => M?.() }),
      /* @__PURE__ */ t.jsx(Qo, { active: T, title: T ? "Show drawings" : "Hide all", icon: T ? "👁‍🗨" : "👁", onClick: () => ee?.() }),
      /* @__PURE__ */ t.jsx(Qo, { title: "Remove all drawings", icon: "🗑", onClick: () => oe(!0) }),
      /* @__PURE__ */ t.jsx("div", { className: "w-8 h-px bg-[#2a2a2a] my-1" }),
      /* @__PURE__ */ t.jsx(Qo, { title: "Collapse toolbar", icon: "‹", onClick: () => r?.() })
    ] }),
    ye && /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-[#1c1c1c] border border-[#3a3a3a] rounded-lg p-4 w-[260px] shadow-2xl", children: [
      /* @__PURE__ */ t.jsx("div", { className: "text-[13px] font-semibold text-[#e8e8e8] mb-1", children: "Remove all drawings?" }),
      /* @__PURE__ */ t.jsx("div", { className: "text-[11px] text-[#b9b9b9] mb-4", children: "This will clear all drawings on the chart. This action cannot be undone." }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex gap-2 justify-end", children: [
        /* @__PURE__ */ t.jsx("button", { onClick: () => oe(!1), className: "px-4 py-1.5 text-[12px] rounded-md bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]", children: "Cancel" }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => {
          ne?.(), oe(!1);
        }, className: "px-4 py-1.5 text-[12px] rounded-md bg-[#f0426c] text-white hover:bg-[#d93a5e] font-medium", children: "Remove" })
      ] })
    ] }) })
  ] });
}
const Ol = [
  { id: "candles", label: "Candles", desc: "OHLC candles", icon: "◧" },
  { id: "fp_cluster", label: "Cluster", desc: "Bid/ask volume per price", icon: "▦" },
  { id: "fp_profile", label: "Profile", desc: "Delta profile per candle", icon: "◫" },
  { id: "heikin_ashi", label: "Heikin Ashi", desc: "Smoothed trend", icon: "⬓" },
  { id: "line", label: "Line", desc: "Close price line", icon: "╱" },
  { id: "tpo", label: "TPO", desc: "Time Price Opportunity", icon: "☰" },
  { id: "renko", label: "Renko", desc: "Price-driven bricks", icon: "▭" },
  { id: "flow_positioning", label: "Flow", desc: "Flow & Positioning", icon: "⇄" }
];
function ud({
  value: l,
  onChange: n
}) {
  const [h, M] = o.useState(!1), T = o.useRef(null);
  o.useEffect(() => {
    const ne = (Ce) => {
      T.current && !T.current.contains(Ce.target) && M(!1);
    };
    return document.addEventListener("mousedown", ne), () => document.removeEventListener("mousedown", ne);
  }, []);
  const ee = Ol.find((ne) => ne.id === l) || Ol[0];
  return /* @__PURE__ */ t.jsxs("div", { ref: T, className: "relative", children: [
    /* @__PURE__ */ t.jsxs(
      "button",
      {
        onClick: () => M((ne) => !ne),
        className: "flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#3a3a3a] bg-[#262626] text-[12px] font-medium text-[#e8e8e8] hover:bg-[#343434] hover:border-[#4a4a4a] transition-colors",
        children: [
          /* @__PURE__ */ t.jsx("span", { className: "text-[12px] opacity-70", children: ee.icon }),
          /* @__PURE__ */ t.jsx("span", { children: ee.label }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[10px] opacity-50 ml-1", children: h ? "▲" : "▼" })
        ]
      }
    ),
    h && /* @__PURE__ */ t.jsxs("div", { className: "absolute top-full left-0 mt-2 z-40 w-[260px] rounded-lg border border-[#3a3a3a] bg-[#1c1c1c] shadow-2xl overflow-hidden", children: [
      /* @__PURE__ */ t.jsx("div", { className: "px-3 py-2 border-b border-[#2a2a2a] bg-[#222222]", children: /* @__PURE__ */ t.jsx("span", { className: "text-[10px] font-semibold tracking-wider text-[#b9b9b9]", children: "CHART TYPE" }) }),
      /* @__PURE__ */ t.jsx("div", { className: "p-2 grid grid-cols-1 gap-1 max-h-[320px] overflow-auto", children: Ol.map((ne) => /* @__PURE__ */ t.jsxs(
        "button",
        {
          onClick: () => {
            n(ne.id), M(!1);
          },
          className: `flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${l === ne.id ? "bg-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border border-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8] hover:border-[#3a3a3a]"}`,
          children: [
            /* @__PURE__ */ t.jsx("span", { className: "text-[14px] w-5 text-center", children: ne.icon }),
            /* @__PURE__ */ t.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[12px] font-medium leading-tight", children: ne.label }),
              /* @__PURE__ */ t.jsx("div", { className: `text-[10px] leading-tight mt-0.5 ${l === ne.id ? "text-[#1c1c1c]/70" : "text-[#6a6a6a]"}`, children: ne.desc })
            ] }),
            l === ne.id && /* @__PURE__ */ t.jsx("span", { className: "text-[10px]", children: "●" })
          ]
        },
        ne.id
      )) })
    ] })
  ] });
}
const Vn = [
  { label: "tick", ms: 0, sec: 0 },
  { label: "1s", ms: 1e3, sec: 1 },
  { label: "5s", ms: 5e3, sec: 5 },
  { label: "15s", ms: 15e3, sec: 15 },
  { label: "30s", ms: 3e4, sec: 30 },
  { label: "1m", ms: 6e4, sec: 60 },
  { label: "3m", ms: 18e4, sec: 180 },
  { label: "5m", ms: 3e5, sec: 300 },
  { label: "15m", ms: 9e5, sec: 900 },
  { label: "30m", ms: 18e5, sec: 1800 },
  { label: "1h", ms: 36e5, sec: 3600 },
  { label: "2h", ms: 72e5, sec: 7200 },
  { label: "4h", ms: 144e5, sec: 14400 },
  { label: "6h", ms: 216e5, sec: 21600 },
  { label: "8h", ms: 288e5, sec: 28800 },
  { label: "12h", ms: 432e5, sec: 43200 },
  { label: "1D", ms: 864e5, sec: 86400 },
  { label: "3D", ms: 2592e5, sec: 259200 },
  { label: "1W", ms: 6048e5, sec: 604800 },
  { label: "1M", ms: 2592e6, sec: 2592e3 }
];
function dd({
  value: l,
  onChange: n,
  favs: h,
  onToggleFav: M
}) {
  const [T, ee] = o.useState(!1), [ne, Ce] = o.useState(""), r = o.useRef(null);
  o.useEffect(() => {
    const Y = (de) => {
      r.current && !r.current.contains(de.target) && ee(!1);
    };
    return document.addEventListener("mousedown", Y), () => document.removeEventListener("mousedown", Y);
  }, []);
  const ye = (Y) => {
    const de = Y.trim();
    if (!de) return null;
    if (de.toLowerCase() === "tick") return Vn.find((Vt) => Vt.label === "tick");
    const ze = de.match(/^(\d+)(s|m|h|d|w|M)$/i);
    if (!ze) return null;
    const re = parseInt(ze[1], 10);
    if (!(re > 0)) return null;
    const ct = ze[2], Qe = ct.toLowerCase();
    let Ae = 0;
    if (ct === "M") Ae = re * 2592e6;
    else if (Qe === "s") Ae = re * 1e3;
    else if (Qe === "m") Ae = re * 6e4;
    else if (Qe === "h") Ae = re * 36e5;
    else if (Qe === "d") Ae = re * 864e5;
    else if (Qe === "w") Ae = re * 6048e5;
    else return null;
    return Ae > 31536e6 ? null : { label: ct === "M" ? `${re}M` : Qe === "d" ? `${re}D` : Qe === "w" ? `${re}W` : `${re}${Qe}`, ms: Ae, sec: Math.floor(Ae / 1e3) };
  }, oe = (Y) => h.has(Y) || h.has(Y.toLowerCase()) || h.has(Y.toUpperCase()), Oe = /* @__PURE__ */ new Set(), Ge = Vn.filter((Y) => h.has(Y.label) || h.has(Y.label.toLowerCase()) || h.has(Y.label.toUpperCase())).filter((Y) => {
    const de = Y.label.toLowerCase();
    return Oe.has(de) ? !1 : (Oe.add(de), !0);
  }), Ne = ["1m", "5m", "15m", "1h", "4h", "1D"], Fe = Ge.length ? Ge.map((Y) => Y.label).slice(0, 6) : Ne, ge = /* @__PURE__ */ new Set(), Ye = Fe.filter((Y) => {
    const de = Y.toLowerCase();
    return ge.has(de) ? !1 : (ge.add(de), !0);
  }), fe = (Y) => {
    n(Y), ee(!1);
  }, Ee = (Y) => Y === "1M" ? "1M" : Y.toLowerCase(), _e = Ee(l.label), Je = [
    { title: "Ticks", items: ["tick"] },
    { title: "Seconds", items: ["1s", "5s", "15s", "30s"] },
    { title: "Minutes", items: ["1m", "3m", "5m", "15m", "30m"] },
    { title: "Hours", items: ["1h", "2h", "4h", "6h", "8h", "12h"] },
    { title: "Days & Months", items: ["1D", "3D", "1W", "1M"] }
  ];
  return /* @__PURE__ */ t.jsxs("div", { ref: r, className: "relative", style: { overflow: "visible" }, children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-1 px-2 py-1 rounded-md border border-[#3a3a3a] bg-[#262626] text-[12px] select-none", children: [
      /* @__PURE__ */ t.jsx("div", { className: "flex items-center gap-1", children: Ye.map((Y) => {
        const de = Vn.find((re) => re.label.toLowerCase() === Y.toLowerCase()) || Vn.find((re) => re.label === Y), ze = de ? Ee(de.label) === _e : !1;
        return /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: (re) => {
              re.stopPropagation(), de && fe(de);
            },
            className: `px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${ze ? "bg-[#e8e8e8] text-[#1c1c1c]" : "bg-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
            children: Y
          },
          Y
        );
      }) }),
      /* @__PURE__ */ t.jsx("div", { className: "w-px h-4 bg-[#3a3a3a] mx-1" }),
      /* @__PURE__ */ t.jsxs(
        "button",
        {
          onClick: () => ee((Y) => !Y),
          className: "flex items-center gap-1 px-2 py-0.5 rounded bg-[#2a2a2a] border border-[#3a3a3a] text-[#e8e8e8] hover:bg-[#343434] text-[11px] font-medium",
          children: [
            /* @__PURE__ */ t.jsx("span", { children: l.label }),
            /* @__PURE__ */ t.jsx("span", { className: "text-[10px] opacity-60", children: T ? "▲" : "▼" })
          ]
        }
      ),
      /* @__PURE__ */ t.jsxs("span", { className: "ml-2 hidden md:flex items-center gap-1.5 text-[10px] text-[#b9b9b9]", children: [
        /* @__PURE__ */ t.jsx("span", { className: "w-2 h-2 rounded-full bg-[#21b3a4] animate-pulse" }),
        "Live"
      ] })
    ] }),
    T && /* @__PURE__ */ t.jsxs("div", { className: "absolute top-full left-0 mt-2 z-[100] w-[340px] rounded-lg border border-[#3a3a3a] bg-[#1c1c1c] shadow-2xl overflow-hidden", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 border-b border-[#2a2a2a] bg-[#222222]", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t.jsx("span", { className: "text-[11px] font-semibold tracking-wider text-[#e8e8e8]", children: "TIMEFRAME" }),
          /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] px-1.5 py-0.5 rounded bg-[#2a2a2a] border border-[#3a3a3a] text-[#b9b9b9]", children: [
            Ge.length,
            "/6 favs"
          ] })
        ] }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => ee(!1), className: "text-[#b9b9b9] hover:text-[#e8e8e8] text-[14px]", children: "×" })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "p-3 space-y-4 max-h-[60vh] overflow-auto scrollbar-thin", children: [
        Ge.length > 0 && /* @__PURE__ */ t.jsxs("div", { children: [
          /* @__PURE__ */ t.jsxs("div", { className: "text-[10px] font-semibold tracking-wider text-[#b9b9b9] mb-2 flex items-center gap-1", children: [
            /* @__PURE__ */ t.jsx("span", { className: "text-[#e8e8e8]", children: "★" }),
            " FAVOURITES"
          ] }),
          /* @__PURE__ */ t.jsx("div", { className: "flex flex-wrap gap-1.5", children: Ge.map((Y) => {
            const de = Ee(Y.label) === _e;
            return /* @__PURE__ */ t.jsxs(
              "button",
              {
                onClick: () => fe(Y),
                className: `group flex items-center gap-1 px-2.5 py-1 rounded-md border text-[11px] font-medium transition-colors ${de ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#e8e8e8] hover:bg-[#343434]"}`,
                children: [
                  Y.label,
                  /* @__PURE__ */ t.jsx(
                    "span",
                    {
                      onClick: (ze) => {
                        ze.stopPropagation(), M(Y.label);
                      },
                      className: "ml-1 text-[10px] opacity-60 hover:opacity-100",
                      title: "Remove from favourites",
                      children: "★"
                    }
                  )
                ]
              },
              Y.label
            );
          }) })
        ] }),
        Je.map((Y) => /* @__PURE__ */ t.jsxs("div", { children: [
          /* @__PURE__ */ t.jsx("div", { className: "text-[10px] font-semibold tracking-wider text-[#b9b9b9] mb-2", children: Y.title.toUpperCase() }),
          /* @__PURE__ */ t.jsx("div", { className: "grid grid-cols-5 gap-1.5", children: Y.items.map((de) => {
            const ze = Vn.find((Qe) => Qe.label === de);
            if (!ze) return null;
            const re = Ee(ze.label) === _e, ct = oe(de);
            return /* @__PURE__ */ t.jsxs(
              "button",
              {
                onClick: () => fe(ze),
                onContextMenu: (Qe) => {
                  Qe.preventDefault(), M(de);
                },
                className: `relative px-2 py-1.5 rounded-md border text-[11px] font-medium transition-colors ${re ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8] hover:border-[#4a4a4a]"}`,
                title: ct ? "Favourite — right-click to remove" : "Right-click to add to favourites",
                children: [
                  de,
                  ct && /* @__PURE__ */ t.jsx("span", { className: "absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#21b3a4] rounded-full" })
                ]
              },
              de
            );
          }) })
        ] }, Y.title)),
        /* @__PURE__ */ t.jsxs("div", { className: "pt-3 border-t border-[#2a2a2a]", children: [
          /* @__PURE__ */ t.jsx("div", { className: "text-[10px] font-semibold tracking-wider text-[#b9b9b9] mb-2", children: "CUSTOM" }),
          /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ t.jsx(
              "input",
              {
                value: ne,
                onChange: (Y) => Ce(Y.target.value),
                onKeyDown: (Y) => {
                  if (Y.key === "Enter") {
                    const de = ye(ne);
                    de && fe(de);
                  }
                },
                placeholder: "e.g. 7m, 90s, 3h, tick, 1M",
                className: "flex-1 px-3 py-2 rounded-md bg-[#262626] border border-[#3a3a3a] text-[12px] text-[#e8e8e8] placeholder:text-[#6a6a6a] focus:border-[#4a4a4a] focus:outline-none"
              }
            ),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: () => {
                  const Y = ye(ne);
                  Y && fe(Y);
                },
                className: "px-4 py-2 rounded-md bg-[#e8e8e8] text-[#1c1c1c] text-[11px] font-semibold hover:bg-white transition-colors",
                children: "Apply"
              }
            )
          ] }),
          /* @__PURE__ */ t.jsx("div", { className: "mt-2 text-[10px] text-[#6a6a6a] leading-relaxed", children: "Right-click any timeframe to pin to favourites (max 6). Supports tick, seconds (s), minutes (m), hours (h), days (D), weeks (W), months (M)." })
        ] })
      ] })
    ] })
  ] });
}
const hd = {
  marketColors: "teal_rose",
  accent: "neutral",
  liqColormap: "ember",
  obColormap: "orderbook",
  opacity: 0.95,
  intensity: 1,
  gamma: 1.3,
  lowPeak: { low: 0, peak: 1e5 },
  noiseFloor: 4e-3,
  tickPerRow: 1,
  halfLife: 60,
  linearFilter: !1,
  reachModulation: !1
};
function fd({
  settings: l,
  onChange: n,
  onClose: h
}) {
  const M = (T) => n({ ...l, ...T });
  return /* @__PURE__ */ t.jsxs("div", { className: "w-[360px] rounded-xl border border-[#3a3a3a] bg-[#1c1c1c] shadow-2xl overflow-hidden", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex justify-between items-center px-4 py-3 border-b border-[#2a2a2a] bg-[#222222]", children: [
      /* @__PURE__ */ t.jsx("span", { className: "font-semibold tracking-wider text-[11px] text-[#e8e8e8]", children: "APPEARANCE" }),
      h && /* @__PURE__ */ t.jsx("button", { onClick: h, className: "w-7 h-7 flex items-center justify-center rounded-md bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] hover:text-[#e8e8e8] hover:bg-[#343434]", children: "×" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "p-4 space-y-5 max-h-[70vh] overflow-auto scrollbar-thin", children: [
      /* @__PURE__ */ t.jsxs("div", { children: [
        /* @__PURE__ */ t.jsx("div", { className: "text-[10px] font-semibold tracking-wider text-[#b9b9b9] mb-2", children: "MARKET COLORS" }),
        /* @__PURE__ */ t.jsx("div", { className: "grid grid-cols-2 gap-2", children: ["teal_rose", "green_red"].map((T) => /* @__PURE__ */ t.jsxs(
          "button",
          {
            onClick: () => M({ marketColors: T }),
            className: `p-2.5 rounded-lg border text-left transition-colors ${l.marketColors === T ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
            children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[12px] font-medium", children: T === "teal_rose" ? "Teal / Rose" : "Green / Red" }),
              /* @__PURE__ */ t.jsx("div", { className: "text-[10px] opacity-60 mt-0.5", children: T === "teal_rose" ? "#21b3a4 / #f0426c" : "#26a69a / #ef5350" })
            ]
          },
          T
        )) })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { children: [
        /* @__PURE__ */ t.jsx("div", { className: "text-[10px] font-semibold tracking-wider text-[#b9b9b9] mb-2", children: "INTERFACE ACCENT" }),
        /* @__PURE__ */ t.jsx("div", { className: "grid grid-cols-4 gap-1.5", children: ["neutral", "mint", "indigo", "amber"].map((T) => /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: () => M({ accent: T }),
            className: `py-2 rounded-lg border text-[11px] font-medium capitalize transition-colors ${l.accent === T ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434]"}`,
            children: T
          },
          T
        )) })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { children: [
        /* @__PURE__ */ t.jsx("div", { className: "text-[10px] font-semibold tracking-wider text-[#b9b9b9] mb-2", children: "HEATMAP COLORMAP" }),
        /* @__PURE__ */ t.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#6a6a6a] mb-1.5", children: "Liquidation" }),
            /* @__PURE__ */ t.jsx("div", { className: "grid grid-cols-4 gap-1.5", children: ["ember", "inferno", "viridis", "magma"].map((T) => /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: () => M({ liqColormap: T }),
                className: `py-2 rounded-lg border text-[11px] font-medium capitalize transition-colors ${l.liqColormap === T ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434]"}`,
                children: T
              },
              T
            )) })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#6a6a6a] mb-1.5", children: "Orderbook" }),
            /* @__PURE__ */ t.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: ["orderbook", "deepdom", "bookmap"].map((T) => /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: () => M({ obColormap: T }),
                className: `py-2 rounded-lg border text-[10px] font-medium capitalize transition-colors ${l.obColormap === T ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434]"}`,
                children: T
              },
              T
            )) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[11px] text-[#b9b9b9]", children: [
            "Opacity ",
            /* @__PURE__ */ t.jsxs("span", { className: "text-[#e8e8e8] font-medium", children: [
              Math.round(l.opacity * 100),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 0.1, max: 1, step: 0.05, value: l.opacity, onChange: (T) => M({ opacity: parseFloat(T.target.value) }), className: "accent-[#e8e8e8]" })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[11px] text-[#b9b9b9]", children: [
            "Intensity ",
            /* @__PURE__ */ t.jsx("span", { className: "text-[#e8e8e8] font-medium", children: l.intensity.toFixed(2) })
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 0.1, max: 3, step: 0.1, value: l.intensity, onChange: (T) => M({ intensity: parseFloat(T.target.value) }), className: "accent-[#e8e8e8]" })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[11px] text-[#b9b9b9]", children: [
            "Gamma ",
            /* @__PURE__ */ t.jsx("span", { className: "text-[#e8e8e8] font-medium", children: l.gamma.toFixed(2) })
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 0.5, max: 2.5, step: 0.1, value: l.gamma, onChange: (T) => M({ gamma: parseFloat(T.target.value) }), className: "accent-[#e8e8e8]" })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[11px] text-[#b9b9b9]", children: [
            "Tick ×",
            /* @__PURE__ */ t.jsx("span", { className: "text-[#e8e8e8] font-medium", children: l.tickPerRow })
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 1, max: 8, step: 1, value: l.tickPerRow, onChange: (T) => M({ tickPerRow: parseInt(T.target.value) }), className: "accent-[#e8e8e8]" })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex gap-4 pt-2 border-t border-[#2a2a2a]", children: [
        /* @__PURE__ */ t.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
          /* @__PURE__ */ t.jsx("input", { type: "checkbox", checked: l.linearFilter, onChange: (T) => M({ linearFilter: T.target.checked }), className: "accent-[#e8e8e8]" }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[11px] text-[#b9b9b9]", children: "Smooth" })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
          /* @__PURE__ */ t.jsx("input", { type: "checkbox", checked: l.reachModulation, onChange: (T) => M({ reachModulation: T.target.checked }), className: "accent-[#e8e8e8]" }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[11px] text-[#b9b9b9]", children: "Reach cone" })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "pt-3 border-t border-[#2a2a2a] space-y-1 text-[10px] text-[#6a6a6a] leading-relaxed", children: [
        /* @__PURE__ */ t.jsx("div", { children: "• GPU 8192×1024 • Teal #21b3a4 Rose #f0426c • Zinc chrome #1c1c1c/#2a2a2a/#3a3a3a" }),
        /* @__PURE__ */ t.jsx("div", { children: "• Ember/Viridis/Magma/Inferno colormaps • Shift+wheel price zoom • Drag pan • Dblclick recenter" })
      ] })
    ] })
  ] });
}
const Or = hd;
function pd({ open: l, onClose: n, onSelect: h }) {
  const [M, T] = o.useState(""), [ee, ne] = o.useState(""), [Ce, r] = o.useState([]);
  o.useEffect(() => {
    let oe = !0;
    return l && (async () => {
      try {
        const ge = ["/api/orderflow/tickers?limit=770", "/api/symbols?limit=770", "/api/tickers"];
        for (const Ye of ge)
          try {
            const fe = await fetch(Ye);
            if (fe.ok) {
              const Ee = await fe.json(), _e = Ee.tickers || Ee.symbols || Ee.data || [];
              if (_e.length) {
                const Je = _e.slice(0, 770).map((Y) => ({
                  symbol: Y.symbol || Y.pair || Y.name,
                  base: Y.base_asset || Y.base || (Y.symbol || "").split("USDT")[0] || Y.symbol,
                  exchange: Y.exchange || Y.provider || "binancef",
                  price: Y.last_price || Y.price || 100 + Math.random() * 5e4,
                  change: Y.change_pct_24h || Y.change || (Math.random() - 0.5) * 10,
                  listed: !0
                }));
                if (oe && Je.length) {
                  r(Je);
                  return;
                }
              }
            }
          } catch {
          }
      } catch {
      }
      if (!oe) return;
      const Ge = ["BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "DOGE", "AVAX", "DOT", "LINK", "LTC", "BCH", "UNI", "XLM", "ETC", "FIL", "TRX", "APT", "ARB", "OP", "MATIC", "ATOM", "NEAR", "FTM", "ALGO"], Ne = ["binancef", "hl", "coinbase"], Fe = [];
      for (let ge = 0; ge < 770; ge++) {
        const Ye = Ge[ge % Ge.length], fe = Ne[ge % Ne.length];
        Fe.push({ symbol: `${Ye}${fe === "binancef" ? "USDT" : "-USD"}`, base: Ye, exchange: fe, price: 100 + Math.random() * 5e4, change: (Math.random() - 0.5) * 10, listed: !0 });
      }
      r(Fe);
    })(), () => {
      oe = !1;
    };
  }, [l]);
  const ye = o.useMemo(() => Ce.filter((oe) => !(ee && oe.exchange !== ee || M && !oe.symbol.toLowerCase().includes(M.toLowerCase()) && !oe.base.toLowerCase().includes(M.toLowerCase()))).slice(0, 200), [Ce, M, ee]);
  return l ? /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-[#1c1c1c] border border-[#3a3a3a] rounded-xl shadow-2xl w-[520px] max-h-[80vh] flex flex-col overflow-hidden", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "px-4 py-3 border-b border-[#2a2a2a] flex items-center gap-3 bg-[#222222]", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t.jsx("span", { className: "text-[12px] font-semibold tracking-wider text-[#e8e8e8]", children: "FIND SYMBOL" }),
        /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9]", children: [
          Ce.length,
          " pairs"
        ] })
      ] }),
      /* @__PURE__ */ t.jsx("button", { onClick: n, className: "ml-auto w-7 h-7 flex items-center justify-center rounded-md bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] hover:text-[#e8e8e8] hover:bg-[#343434]", children: "×" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "p-3 flex gap-2 border-b border-[#2a2a2a] bg-[#1c1c1c]", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ t.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-[#6a6a6a] text-[12px]", children: "⌕" }),
        /* @__PURE__ */ t.jsx("input", { value: M, onChange: (oe) => T(oe.target.value), placeholder: "Search BTC, ETH, SOL...", className: "w-full pl-8 pr-3 py-2 rounded-lg bg-[#262626] border border-[#3a3a3a] text-[13px] text-[#e8e8e8] placeholder:text-[#6a6a6a] focus:border-[#4a4a4a] focus:outline-none", autoFocus: !0 })
      ] }),
      /* @__PURE__ */ t.jsxs("select", { value: ee, onChange: (oe) => ne(oe.target.value), className: "px-3 py-2 rounded-lg bg-[#262626] border border-[#3a3a3a] text-[12px] font-medium text-[#b9b9b9] focus:outline-none focus:border-[#4a4a4a]", children: [
        /* @__PURE__ */ t.jsx("option", { value: "", children: "All venues" }),
        /* @__PURE__ */ t.jsx("option", { value: "binancef", children: "Binance" }),
        /* @__PURE__ */ t.jsx("option", { value: "hl", children: "Hyperliquid" }),
        /* @__PURE__ */ t.jsx("option", { value: "coinbase", children: "Coinbase" })
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "flex-1 overflow-auto", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "grid grid-cols-[1.5fr_1fr_0.8fr_0.8fr] px-4 py-2 text-[10px] font-semibold tracking-wider text-[#6a6a6a] uppercase border-b border-[#2a2a2a] bg-[#1c1c1c] sticky top-0", children: [
        /* @__PURE__ */ t.jsx("span", { children: "Symbol" }),
        /* @__PURE__ */ t.jsx("span", { children: "Price" }),
        /* @__PURE__ */ t.jsx("span", { children: "24h%" }),
        /* @__PURE__ */ t.jsx("span", { children: "Venue" })
      ] }),
      ye.map((oe) => /* @__PURE__ */ t.jsxs("button", { onClick: () => {
        h(oe.symbol), n();
      }, className: "grid grid-cols-[1.5fr_1fr_0.8fr_0.8fr] w-full px-4 py-2.5 text-[13px] border-b border-[#2a2a2a]/50 hover:bg-[#262626] text-left transition-colors", children: [
        /* @__PURE__ */ t.jsx("span", { className: "font-mono font-medium text-[#e8e8e8]", children: oe.symbol }),
        /* @__PURE__ */ t.jsx("span", { className: "font-mono tabular-nums text-[#b9b9b9]", children: oe.price.toFixed(2) }),
        /* @__PURE__ */ t.jsxs("span", { className: `tabular-nums font-medium ${oe.change >= 0 ? "text-[#21b3a4]" : "text-[#f0426c]"}`, children: [
          oe.change >= 0 ? "+" : "",
          oe.change.toFixed(2),
          "%"
        ] }),
        /* @__PURE__ */ t.jsx("span", { className: "text-[11px] px-1.5 py-0.5 rounded bg-[#262626] border border-[#3a3a3a] text-[#6a6a6a] w-fit", children: oe.exchange })
      ] }, `${oe.exchange}:${oe.symbol}`)),
      ye.length === 0 && /* @__PURE__ */ t.jsx("div", { className: "px-4 py-8 text-[13px] text-[#6a6a6a] text-center", children: "No matches found" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "px-4 py-2 text-[10px] text-[#6a6a6a] border-t border-[#2a2a2a] bg-[#222222]", children: [
      "Press Enter to select • ",
      Ce.length,
      " symbols • Click any row"
    ] })
  ] }) }) : null;
}
const _r = [
  { id: "chart", label: "Chart", desc: "Candles + indicators", icon: "◧" },
  { id: "dom", label: "DOM", desc: "Depth ladder with delta", icon: "☰" },
  { id: "tape", label: "Tape", desc: "Time & sales", icon: "≡" },
  { id: "depth", label: "Depth Heat", desc: "Orderbook heatmap", icon: "▤" },
  { id: "edgedepth", label: "EdgeDepth", desc: "GPU heatmap 8192×1024", icon: "◫" },
  { id: "footprint", label: "Footprint", desc: "Cluster & profile", icon: "▦" },
  { id: "vpvr", label: "VPVR", desc: "Volume profile POC/VAH/VAL", icon: "◨" },
  { id: "tpo", label: "TPO", desc: "Time price opportunity", icon: "◰" },
  { id: "liquidations", label: "Liquidations", desc: "Liquidation heatmap", icon: "⚡" },
  { id: "watchlist", label: "Watchlist", desc: "1503 pairs", icon: "☆" }
];
function md({ onSelect: l }) {
  const [n, h] = o.useState(!1), M = o.useRef(null);
  return o.useEffect(() => {
    const T = (ee) => {
      M.current && !M.current.contains(ee.target) && h(!1);
    };
    return document.addEventListener("mousedown", T), () => document.removeEventListener("mousedown", T);
  }, []), /* @__PURE__ */ t.jsxs("div", { ref: M, className: "relative", children: [
    /* @__PURE__ */ t.jsxs("button", { onClick: () => h((T) => !T), className: "flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#3a3a3a] bg-[#262626] text-[12px] font-medium text-[#e8e8e8] hover:bg-[#343434] hover:border-[#4a4a4a] transition-colors", children: [
      /* @__PURE__ */ t.jsx("span", { className: "text-[14px]", children: "+" }),
      " Widget ",
      /* @__PURE__ */ t.jsx("span", { className: "text-[10px] opacity-50 ml-1", children: n ? "▲" : "▼" })
    ] }),
    n && /* @__PURE__ */ t.jsxs("div", { className: "absolute top-full left-0 mt-2 z-40 w-[280px] rounded-lg border border-[#3a3a3a] bg-[#1c1c1c] shadow-2xl overflow-hidden", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "px-3 py-2 border-b border-[#2a2a2a] bg-[#222222] flex items-center justify-between", children: [
        /* @__PURE__ */ t.jsx("span", { className: "text-[10px] font-semibold tracking-wider text-[#b9b9b9]", children: "ADD WIDGET" }),
        /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] px-1.5 py-0.5 rounded bg-[#2a2a2a] border border-[#3a3a3a] text-[#6a6a6a]", children: [
          _r.length,
          " items"
        ] })
      ] }),
      /* @__PURE__ */ t.jsx("div", { className: "p-2 grid gap-1 max-h-[380px] overflow-auto", children: _r.map((T) => /* @__PURE__ */ t.jsxs("button", { onClick: () => {
        l(T.id), h(!1);
      }, className: "flex items-center gap-3 px-3 py-2.5 rounded-md bg-[#262626] border border-transparent text-left hover:bg-[#343434] hover:border-[#3a3a3a] hover:text-[#e8e8e8] text-[#b9b9b9] transition-colors", children: [
        /* @__PURE__ */ t.jsx("span", { className: "text-[16px] w-6 text-center opacity-80", children: T.icon }),
        /* @__PURE__ */ t.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ t.jsx("div", { className: "text-[12px] font-medium text-[#e8e8e8]", children: T.label }),
          /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#6a6a6a] mt-0.5 leading-tight", children: T.desc })
        ] })
      ] }, T.id)) })
    ] })
  ] });
}
const rn = (() => {
  try {
    return {
      layout: localStorage.getItem("lset-layout") || "1x1",
      sync: JSON.parse(localStorage.getItem("lset-layout-sync") || "null") || { syncSymbol: !1, syncInterval: !1, syncCrosshair: !1, syncTime: !1 },
      panelSymbols: JSON.parse(localStorage.getItem("lset-layout-symbols") || "[]") || [],
      panelKinds: JSON.parse(localStorage.getItem("lset-layout-kinds") || "[]") || [],
      activePanel: 0
    };
  } catch {
    return {
      layout: "1x1",
      sync: { syncSymbol: !1, syncInterval: !1, syncCrosshair: !1, syncTime: !1 },
      panelSymbols: [],
      panelKinds: [],
      activePanel: 0
    };
  }
})(), $l = /* @__PURE__ */ new Set(), mo = () => $l.forEach((l) => l()), el = (l, n) => {
  try {
    localStorage.setItem(l, n);
  } catch {
  }
}, Bn = {
  get: () => rn,
  setLayout(l) {
    rn.layout = l, el("lset-layout", l), mo();
  },
  setSync(l) {
    rn.sync = l, el("lset-layout-sync", JSON.stringify(l)), mo();
  },
  setPanelSymbol(l, n) {
    rn.panelSymbols = [...rn.panelSymbols], rn.panelSymbols[l] = n, el("lset-layout-symbols", JSON.stringify(rn.panelSymbols)), mo();
  },
  setPanelKind(l, n) {
    rn.panelKinds = [...rn.panelKinds], rn.panelKinds[l] = n, el("lset-layout-kinds", JSON.stringify(rn.panelKinds)), mo();
  },
  setActivePanel(l) {
    rn.activePanel !== l && (rn.activePanel = l, mo());
  },
  subscribe(l) {
    return $l.add(l), () => {
      $l.delete(l);
    };
  }
};
function ql() {
  const [, l] = o.useState(0);
  return o.useEffect(() => Bn.subscribe(() => l((n) => n + 1)), []), { ...rn };
}
const xd = o.lazy(() => import("./chunks/depth-CYN6mXgi.js").then((l) => l.E)), bd = o.lazy(() => import("./chunks/EdgeDepthDOMPanel-Dlwvumag.js")), gd = o.lazy(() => import("./chunks/EdgeDepthTapePanel-BgMdeuWH.js")), vd = o.lazy(() => import("./chunks/EdgeDepthFootprintPanel-CHs2yQVv.js")), yd = o.lazy(() => import("./chunks/EdgeDepthVolumeProfilePanel-BIyfoKDp.js")), kd = o.lazy(() => import("./chunks/EdgeDepthTPOPanel-CsvfkApV.js")), wd = o.lazy(() => import("./chunks/EdgeDepthLiquidationPanel-BjFTFztS.js")), Sd = o.lazy(() => import("./chunks/EdgeDepthWatchlist-8SAZxV13.js")), Cd = o.lazy(() => import("./chunks/EdgeDepthIndicators-DbEqbQjv.js")), $r = () => /* @__PURE__ */ t.jsx("div", { className: "h-full w-full flex items-center justify-center text-[11px] text-[var(--dim)]", children: "Loading…" }), Hr = {
  "1x1": { count: 1, cols: 1, rows: 1 },
  "2x1": { count: 2, cols: 2, rows: 1 },
  "1x2": { count: 2, cols: 1, rows: 2 },
  "2x2": { count: 4, cols: 2, rows: 2 },
  "3x1": { count: 3, cols: 3, rows: 1 },
  "1x3": { count: 3, cols: 1, rows: 3 },
  "4x1": { count: 4, cols: 4, rows: 1 },
  "3x2": { count: 6, cols: 3, rows: 2 },
  "2x3": { count: 6, cols: 2, rows: 3 },
  "4x2": { count: 8, cols: 4, rows: 2 }
}, Vr = ["1h", "4h", "1d", "15m", "5m", "1w", "30m", "1m"];
function Td({
  symbol: l,
  sourceProvider: n,
  timeframe: h,
  colors: M,
  active: T,
  onActivate: ee,
  kind: ne,
  onToggleKind: Ce,
  syncedCrosshairTime: r,
  onCrosshairMove: ye,
  syncedViewportTime: oe,
  onViewportTimeChange: Oe,
  quote: Ge
}) {
  const [Ne, Fe] = o.useState([]), ge = ol();
  o.useEffect(() => {
    if (ne !== "chart") return;
    let fe = !1;
    Fe([]);
    const Ee = async () => {
      try {
        const Je = await Hu("multi_panel", { symbol: l, timeframe: h, limit: 500 });
        !fe && Je?.length && Fe(Je.map((Y) => ({
          time: Date.parse(Y.timestamp),
          open: Y.open,
          high: Y.high,
          low: Y.low,
          close: Y.close,
          volume: Y.volume
        })));
      } catch {
      }
    };
    Ee();
    const _e = setInterval(Ee, 1e4);
    return () => {
      fe = !0, clearInterval(_e);
    };
  }, [l, h, ne]);
  const Ye = () => {
    const fe = ne;
    return fe === "depth" ? /* @__PURE__ */ t.jsx(Qu, { symbol: l, sourceProvider: n, colors: M, syncedCrosshairTime: r, onCrosshairMove: ye, onToggleKind: Ce }) : fe === "edgedepth" ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx($r, {}), children: /* @__PURE__ */ t.jsx(xd, { symbol: l, provider: n || "binance", onToggleKind: Ce }) }) : ["dom", "tape", "footprint", "vpvr", "tpo", "liquidations", "watchlist", "indicators", "ed_liquidations", "ed_vpvr", "ed_footprint", "ed_tpo"].includes(fe) ? /* @__PURE__ */ t.jsxs(o.Suspense, { fallback: /* @__PURE__ */ t.jsx($r, {}), children: [
      fe === "dom" && /* @__PURE__ */ t.jsx(bd, { symbol: l, provider: n || "binance" }),
      fe === "tape" && /* @__PURE__ */ t.jsx(gd, { symbol: l, provider: n || "binance" }),
      (fe === "footprint" || fe === "ed_footprint") && /* @__PURE__ */ t.jsx(vd, { symbol: l, provider: n || "binance" }),
      (fe === "vpvr" || fe === "ed_vpvr") && /* @__PURE__ */ t.jsx(yd, { symbol: l, provider: n || "binance" }),
      (fe === "tpo" || fe === "ed_tpo") && /* @__PURE__ */ t.jsx(kd, { symbol: l, provider: n || "binance" }),
      (fe === "liquidations" || fe === "ed_liquidations") && /* @__PURE__ */ t.jsx(wd, { symbol: l, provider: n || "binance" }),
      fe === "watchlist" && /* @__PURE__ */ t.jsx(Sd, { activeSymbol: l, onSelectSymbol: (Ee) => {
        try {
          window.__lseShell?.selectSymbol?.(Ee);
        } catch {
        }
      } }),
      fe === "indicators" && /* @__PURE__ */ t.jsx(Cd, { symbol: l, provider: n || "binance" })
    ] }) : Ne.length > 0 ? /* @__PURE__ */ t.jsx(
      Ul,
      {
        candles: Ne,
        symbol: l,
        timeframe: h,
        chartType: "candlestick",
        livePrice: Ne[Ne.length - 1]?.close ?? null,
        rightOffset: 6,
        colors: M,
        indicators: Ys,
        timezone: ge?.data?.timezone || "local",
        syncedCrosshairTime: r ?? void 0,
        onCrosshairMove: ye,
        syncedViewportTime: oe ?? void 0,
        onViewportTimeChange: Oe,
        showBidAskSpread: !!Ge,
        brokerBid: Ge?.bid ?? null,
        brokerAsk: Ge?.ask ?? null
      }
    ) : null;
  };
  return /* @__PURE__ */ t.jsx(
    "div",
    {
      onMouseDown: ee,
      style: {
        position: "relative",
        minWidth: 0,
        minHeight: 0,
        overflow: "hidden",
        border: T ? "1px solid var(--accent-bar, #888)" : "1px solid var(--edge, #2a2e39)"
      },
      children: Ye()
    }
  );
}
function Id({
  layout: l,
  syncSettings: n,
  pair: h,
  timeframe: M,
  colors: T,
  quote: ee,
  sourceProvider: ne
}) {
  const Ce = Hr[l] || Hr["2x2"], { activePanel: r, panelSymbols: ye, panelKinds: oe } = ql(), Oe = Math.min(r, Ce.count - 1), [Ge, Ne] = o.useState([]), [Fe, ge] = o.useState(null), [Ye, fe] = o.useState(null), Ee = o.useMemo(() => T || ll(), [T]);
  o.useEffect(() => {
    Ne((Y) => {
      const de = [...Y];
      for (let ze = de.length; ze < Ce.count; ze++)
        de.push(ze === 0 ? M : Vr[ze % Vr.length]);
      return de.slice(0, Ce.count);
    });
  }, [Ce.count, M]);
  const _e = o.useCallback((Y) => {
    n.syncCrosshair && ge(Y);
  }, [n.syncCrosshair]), Je = o.useCallback((Y) => {
    n.syncTime && fe(Y);
  }, [n.syncTime]);
  return /* @__PURE__ */ t.jsx("div", { style: {
    display: "grid",
    width: "100%",
    height: "100%",
    gap: 2,
    gridTemplateColumns: `repeat(${Ce.cols}, 1fr)`,
    gridTemplateRows: `repeat(${Ce.rows}, 1fr)`
  }, children: Array.from({ length: Ce.count }, (Y, de) => /* @__PURE__ */ t.jsx(
    Td,
    {
      symbol: n.syncSymbol ? h : ye[de] || h,
      sourceProvider: ne,
      timeframe: n.syncInterval ? M : Ge[de] || M,
      colors: Ee,
      active: de === Oe,
      onActivate: () => Bn.setActivePanel(de),
      kind: oe[de] || "chart",
      onToggleKind: () => {
        const ze = oe[de] || "chart", re = ["chart", "edgedepth", "depth", "dom", "tape", "footprint", "vpvr", "tpo", "liquidations", "watchlist", "indicators"], ct = re.indexOf(ze), Qe = re[(ct + 1) % re.length];
        Bn.setPanelKind(de, Qe);
      },
      syncedCrosshairTime: n.syncCrosshair ? Fe : null,
      onCrosshairMove: _e,
      syncedViewportTime: n.syncTime ? Ye : null,
      onViewportTimeChange: Je,
      quote: ee
    },
    de
  )) });
}
const nl = [
  "lse-drawing-favorites",
  // which drawing tools are favourited
  "lse-drawing-favorites-pos",
  // position of the floating favourites toolbar
  "chart-sidebar-width"
  // chart sidebar width
];
let Xr = !1, tl = null;
async function Md() {
  const l = {};
  for (const n of nl) {
    const h = localStorage.getItem(n);
    h !== null && (l[n] = h);
  }
  try {
    await fetch("/api/workspace/tools", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(l)
    });
  } catch {
  }
}
function Yr() {
  tl && clearTimeout(tl), tl = setTimeout(() => {
    tl = null, Md();
  }, 400);
}
async function Jr() {
  if (Xr) return;
  Xr = !0;
  try {
    const h = await fetch("/api/workspace/tools");
    if (h.ok) {
      const T = (await h.json())?.value ?? {};
      for (const ee of nl) {
        const ne = T[ee];
        typeof ne == "string" && localStorage.setItem(ee, ne);
      }
    }
  } catch {
  }
  const l = localStorage.setItem.bind(localStorage), n = localStorage.removeItem.bind(localStorage);
  localStorage.setItem = (h, M) => {
    l(h, M), nl.includes(h) && Yr();
  }, localStorage.removeItem = (h) => {
    n(h), nl.includes(h) && Yr();
  };
}
const zr = ["#38bdf8", "#fbbf24", "#c084fc", "#34d399", "#fb7185", "#a3e635"];
function Rd(l, n) {
  if (!l || !n.length) return [];
  const h = /* @__PURE__ */ new Map();
  for (let ee = 0; ee < n.length; ee++)
    h.set(Math.floor(n[ee].time / 1e3), ee);
  const M = [];
  let T = 0;
  for (const [ee, ne] of Object.entries(l))
    for (const [Ce, r] of Object.entries(ne.series || {})) {
      const ye = new Array(n.length).fill(NaN);
      let oe = 0;
      for (const [Ne, Fe] of r.points || []) {
        const ge = h.get(Ne);
        ge !== void 0 && (ye[ge] = Fe, oe++);
      }
      if (!oe) continue;
      const Ge = Object.keys(ne.series).length > 1 ? `${ee} ${Ce}` : ee;
      M.push({
        id: `local-${ee}-${Ce}`,
        name: Ge,
        // The prefix is what tells ProChart's formula evaluator to leave this
        // series alone and draw the precomputed values.
        expression: `local:${ee}:${Ce}`,
        enabled: !0,
        display: ne.overlay ? "overlay" : "subplot",
        color: zr[T++ % zr.length],
        lineWidth: 2,
        zeroLine: !1,
        data: ye,
        kind: r.kind,
        // One pane per ENGINE INDICATOR, not per column: MACD's three series
        // must share a pane and a scale or the histogram is meaningless.
        group: ee
      });
    }
  return M;
}
const Pd = o.lazy(() => import("./chunks/depth-CYN6mXgi.js").then((l) => l.a)), jd = o.lazy(() => import("./chunks/depth-CYN6mXgi.js").then((l) => l.E)), Kr = o.lazy(() => import("./chunks/EdgeDepthDOMPanel-Dlwvumag.js")), Nd = o.lazy(() => import("./chunks/EdgeDepthTapePanel-BgMdeuWH.js")), Ld = o.lazy(() => import("./chunks/EdgeDepthWatchlist-8SAZxV13.js")), Ed = o.lazy(() => import("./chunks/EdgeDepthIndicators-DbEqbQjv.js")), Ad = o.lazy(() => import("./chunks/EdgeDepthLayers-B8T1v-xC.js")), Dd = o.lazy(() => import("./chunks/EdgeDepthLiquidationPanel-BjFTFztS.js")), Bd = o.lazy(() => import("./chunks/EdgeDepthVolumeProfilePanel-BIyfoKDp.js")), Wd = o.lazy(() => import("./chunks/EdgeDepthFootprintPanel-CHs2yQVv.js")), Fd = o.lazy(() => import("./chunks/EdgeDepthTPOPanel-CsvfkApV.js")), Od = o.lazy(() => import("./chunks/backtest-CeqYlV1v.js").then((l) => l.bN)), _d = o.lazy(() => import("./chunks/backtest-CeqYlV1v.js").then((l) => l.bO)), $d = o.lazy(() => import("./chunks/econ-BeCAerYp.js")), Hd = o.lazy(() => import("./chunks/dataviz-D6zeVYjn.js")), Vd = o.lazy(() => import("./chunks/quant-CYlcHa_2.js")), Xd = o.lazy(() => import("./chunks/notebooks-fOzYQotZ.js")), ns = () => /* @__PURE__ */ t.jsx("div", { className: "h-full w-full flex items-center justify-center text-[11px] text-[var(--dim)]", children: "Loading…" }), Yd = {
  tick: 0,
  "1s": 1e3,
  "5s": 5e3,
  "10s": 1e4,
  "15s": 15e3,
  "30s": 3e4,
  "1m": 6e4,
  "3m": 18e4,
  "5m": 3e5,
  "15m": 9e5,
  "30m": 18e5,
  "1h": 36e5,
  "2h": 72e5,
  "4h": 144e5,
  "6h": 216e5,
  "8h": 288e5,
  "12h": 432e5,
  "1d": 864e5,
  "1D": 864e5,
  "3d": 2592e5,
  "3D": 2592e5,
  "1w": 6048e5,
  "1W": 6048e5,
  "1M": 2592e6
}, yn = {
  display: "block",
  width: "100%",
  padding: "3px 10px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  font: "inherit",
  color: "inherit",
  lineHeight: 1.5,
  textAlign: "left"
}, gs = (l) => {
  l.currentTarget.style.background = "var(--hover)";
}, vs = (l) => {
  l.currentTarget.style.background = "transparent";
};
function zd({ provider: l, symbol: n, timeframe: h, candles: M, chartType: T = "candlestick", trades: ee = [], engineIndicators: ne, indicatorPatch: Ce = null, quote: r = null, positions: ye = [], onPositionModify: oe, onPositionClose: Oe, autoSelectPositionId: Ge = null }) {
  o.useEffect(() => {
    const v = "lse-hide-shell-tf-style";
    if (!document.getElementById(v)) {
      const Q = document.createElement("style");
      Q.id = v, Q.textContent = `
        /* Hide LSE shell duplicate bars when EdgeDepth terminal active — professional single bar only */
        #timeframes { display: none !important; }
        #subrail { display: none !important; }
        #controls #chart-type, #controls #ind-open, #controls #panes-open, #controls #src-open,
        #controls #tpl-open, #controls #cs-open, #controls #sl-slot { display: none !important; }
        /* Also hide any Simple Moving Average pill that leaks from shell */
        #ind-active { display: none !important; }
      `, document.head.appendChild(Q);
    }
    try {
      const Q = document.getElementById("timeframes");
      Q && (Q.style.display = "none");
      const q = document.getElementById("subrail");
      q && (q.style.display = "none");
    } catch {
    }
  }, []);
  const Ne = `${l}|${n}|${h}`, [Fe, ge] = o.useState(() => {
    try {
      const v = `${l}|${n}|${h}`, Q = localStorage.getItem(`lse-candles-${v}`);
      if (Q) {
        const q = JSON.parse(Q);
        if (Array.isArray(q) && q.length > 0)
          return { key: v, older: q.slice(-200), shift: 0 };
      }
    } catch {
    }
    return { key: Ne, older: [], shift: 0 };
  });
  Fe.key !== Ne && ge({ key: Ne, older: [], shift: 0 });
  const Ye = o.useRef(null), fe = o.useRef(!1), [Ee, _e] = o.useState(!1), Je = o.useMemo(() => {
    if (!Fe.older.length || !M.length) {
      try {
        M.length > 0 && localStorage.setItem(`lse-candles-${Ne}`, JSON.stringify(M.slice(-200)));
      } catch {
      }
      return M;
    }
    const v = M[0].time, Q = [...Fe.older.filter((q) => q.time < v), ...M];
    try {
      localStorage.setItem(`lse-candles-${Ne}`, JSON.stringify(Q.slice(-200)));
    } catch {
    }
    return Q;
  }, [Fe.older, M, Ne]), Y = o.useCallback(async () => {
    if (fe.current || Ye.current === Ne) return;
    const Q = Je;
    if (!Q.length || Q.length >= 5e4) return;
    const q = Ne, be = Q[0].time;
    fe.current = !0, _e(!0);
    try {
      const vt = `/api/candles?provider=${encodeURIComponent(l)}&symbol=${encodeURIComponent(n)}&timeframe=${encodeURIComponent(h)}&limit=5000&end=${encodeURIComponent(new Date(be).toISOString())}`, je = await fetch(vt);
      if (!je.ok) {
        let Le = "";
        try {
          Le = String((await je.json()).detail || "");
        } catch {
        }
        /no (history|prints|data)|served no|no real candles/i.test(Le) && (Ye.current = q);
        return;
      }
      const Xt = ((await je.json()).candles || []).map(([Le, bt, ds, Kt, Rt, At]) => ({
        time: Le < 1e12 ? Le * 1e3 : Le,
        open: bt,
        high: ds,
        low: Kt,
        close: Rt,
        volume: At
      })).filter((Le) => Le.time < be);
      if (!Xt.length) {
        Ye.current = q;
        return;
      }
      ge((Le) => Le.key !== q ? Le : {
        key: q,
        older: [...Xt, ...Le.older],
        shift: Le.shift + Xt.length
      });
    } catch {
    } finally {
      fe.current = !1, _e(!1);
    }
  }, [Je, l, n, h, Ne]), [de, ze] = o.useState(null), [re, ct] = o.useState(null), [Qe, Ae] = o.useState("cursor"), [Ht, Vt] = o.useState(!1), [tt, xt] = o.useState(!1), [tn, kn] = o.useState(null), [It, Nt] = o.useState([]), [nn, zt] = o.useState(Ys), [an, Xn] = o.useState(!1), [As, wo] = o.useState(!1), [ks, ss] = o.useState("candles"), [ws, Ss] = o.useState(() => {
    try {
      const v = typeof h == "string" ? h : "1m", Q = Vn.find((q) => q.label.toLowerCase() === v.toLowerCase() || q.label === v);
      if (Q) return Q;
    } catch {
    }
    return Vn.find((v) => v.label === "1m") || Vn[5] || Vn[0];
  }), [zs, So] = o.useState(() => {
    try {
      const v = localStorage.getItem("ed_fav_tf");
      return new Set(v ? JSON.parse(v) : ["1m", "5m", "15m", "1h", "4h", "1D"]);
    } catch {
      return /* @__PURE__ */ new Set(["1m", "5m", "15m", "1h", "4h", "1D"]);
    }
  });
  o.useEffect(() => {
    try {
      const v = String(h || "1m"), Q = Vn.find((q) => q.label.toLowerCase() === v.toLowerCase() || q.label === v);
      if (Q && Q.label.toLowerCase() !== ws.label.toLowerCase())
        Ss(Q);
      else if (!Q) {
        const q = v.match(/^(\d+)([smhdwM])$/i);
        if (q) {
          const be = parseInt(q[1], 10), vt = q[2];
          let je = 0;
          const Et = vt.toLowerCase();
          vt === "M" ? je = be * 2592e6 : Et === "s" ? je = be * 1e3 : Et === "m" ? je = be * 6e4 : Et === "h" ? je = be * 36e5 : Et === "d" ? je = be * 864e5 : Et === "w" && (je = be * 6048e5), je > 0 && Ss({ label: v, ms: je, sec: Math.floor(je / 1e3) });
        } else v.toLowerCase() === "tick" && Ss({ label: "tick", ms: 0, sec: 0 });
      }
    } catch {
    }
  }, [h]);
  const [ot, Co] = o.useState(() => {
    try {
      const v = localStorage.getItem("ed_appearance");
      if (v) return { ...Or, ...JSON.parse(v) };
    } catch {
    }
    return Or;
  }), [Ke, Ds] = o.useState(!1);
  o.useEffect(() => {
    try {
      localStorage.setItem("ed_appearance", JSON.stringify(ot));
    } catch {
    }
  }, [ot]);
  const [Ks, Us] = o.useState(!1), [qs, To] = o.useState(!0), [Bs, Gs] = o.useState(!1), [wn, pe] = o.useState(() => {
    try {
      const v = localStorage.getItem("ed_layers");
      if (v) return JSON.parse(v);
    } catch {
    }
    return [
      { id: "liquidations", label: "Liquidations", enabled: !0, desc: "Liquidation heatmap 800 bands 0.05%" },
      { id: "exposure_v2", label: "Exposure V2", enabled: !0, desc: "Exposure field V2" },
      { id: "hyperliquid_levels", label: "Hyperliquid Levels", enabled: !0, desc: "HL levels" },
      { id: "market_structure", label: "Market Structure", enabled: !0, desc: "MS with BOS/CHoCH" },
      { id: "vpvr", label: "VPVR", enabled: !1, desc: "Volume Profile Visible Range POC/VAH/VAL" },
      { id: "leverage_tiers", label: "Leverage Tiers", enabled: !1, desc: "Leverage tiers 2x/5x/10x/25x/50x" },
      { id: "session_vwap", label: "Session VWAP", enabled: !1, desc: "HLC3 weighted by base volume" },
      { id: "prev_day", label: "Prev Day High/Low/Close", enabled: !1, desc: "Previous day levels" },
      { id: "prev_week", label: "Prev Week High/Low/Close", enabled: !1, desc: "Previous week levels" }
    ];
  }), Zs = o.useCallback((v) => {
    pe(v);
    try {
      localStorage.setItem("ed_layers", JSON.stringify(v));
    } catch {
    }
    const Q = (q) => v.find((be) => be.id === q)?.enabled;
    zt((q) => {
      let be = !1;
      const vt = { ...q };
      if (Q("vpvr") !== void 0) {
        const je = !!Q("vpvr");
        q.volumeProfile?.enabled !== je && (vt.volumeProfile = { ...q.volumeProfile, enabled: je, numberOfRows: 48, rowWidth: 15, opacity: 60 }, be = !0);
      }
      if (Q("session_vwap") !== void 0) {
        const je = !!Q("session_vwap");
        q.vwap?.enabled !== je && (vt.vwap = { ...q.vwap, enabled: je, color: "#2196F3" }, be = !0);
      }
      if (Q("prev_day") !== void 0 || Q("prev_week") !== void 0) {
        const je = !!Q("prev_day") || !!Q("prev_week");
        q.pivotPoints?.enabled !== je && (vt.pivotPoints = { ...q.pivotPoints, enabled: je }, be = !0);
      }
      return be ? vt : q;
    }), Q("liquidations");
  }, []), ae = o.useCallback(() => {
    window.dispatchEvent(new CustomEvent("lset:open-indicators"));
  }, []), Lt = o.useCallback((v) => ({
    cursor: null,
    trendline: "trend",
    // finite segment
    arrow: "straightArrow",
    // arrow head at end
    ray: "trendRay",
    // extends forward to edge
    extended: "line",
    // extended line — use line (TradingView extended = both sides, our trendRay forward only, line is closest)
    hline: "horizontal",
    hray: "horizontalRay",
    vline: "vertical",
    cross: "cross",
    // cross shape + lines
    rectangle: "rectangle",
    channel: "parallelChannel",
    // parallel channel
    polyline: "freeTriangle",
    // 3-click free triangle for polyline
    brush: "brush",
    fib: "fibonacci",
    long: "long",
    short: "short",
    text: "text",
    measure: "measure",
    pricerange: "measure",
    // price range uses measure tool with price readout
    daterange: "measure"
    // date range uses measure tool
  })[v] ?? null, []), Re = o.useCallback((v) => {
    Ae(v);
    const Q = Lt(v);
    ct(Q);
  }, [Lt]), Yn = o.useCallback((v) => {
    So((Q) => {
      const q = new Set(Q);
      if (q.has(v)) q.delete(v);
      else {
        if (q.size >= 6) {
          const be = q.values().next().value;
          be && q.delete(be);
        }
        q.add(v);
      }
      try {
        localStorage.setItem("ed_fav_tf", JSON.stringify([...q]));
      } catch {
      }
      return q;
    });
  }, []), Mt = o.useMemo(() => ({
    candles: "candlestick",
    fp_cluster: "footprint_cluster",
    fp_profile: "footprint_profile",
    heikin_ashi: "heikin_ashi",
    line: "line",
    tpo: "tpo",
    renko: "renko",
    flow_positioning: "flow_positioning"
  })[ks] || "candlestick", [ks]), [cn, Pe] = o.useState(null), [ut, at] = o.useState(!1), [it, Wn] = o.useState(!1), [zn, sn] = o.useState(""), [os, Kn] = o.useState(null), [Js, ls] = o.useState(""), [, Wt] = o.useState(0), [St, Un] = o.useState(null), [Sn, Fn] = o.useState(""), [qn, Ws] = o.useState(""), [nt, Gn] = o.useState(""), [rs, Io] = o.useState(!1), Cn = o.useRef(null), Qs = async () => {
    const v = zn.trim();
    if (!v) {
      ls("name the template first");
      return;
    }
    await window.__lseShell?.saveLayout?.(v) ? (Wn(!1), ls(""), Wt((q) => q + 1)) : ls("could not save this template");
  };
  o.useEffect(() => {
    if (!cn) return;
    const v = () => {
      Pe(null), at(!1), Wn(!1), Kn(null), ls(""), Un(null), Gn("");
    }, Q = (q) => {
      q.key === "Escape" && v();
    };
    return document.addEventListener("click", v), document.addEventListener("keydown", Q), () => {
      document.removeEventListener("click", v), document.removeEventListener("keydown", Q);
    };
  }, [cn]);
  const Tn = ql(), Cs = Tn.layout, On = Tn.sync, [Zt, In] = o.useState(!1), [as, ft] = o.useState("appearance"), un = o.useRef(Zt);
  un.current = Zt;
  const Ts = o.useRef(as);
  Ts.current = as, o.useEffect(() => (Hl = (v) => {
    if (!un.current) {
      ft(v || "appearance"), In(!0);
      return;
    }
    if (v && v !== Ts.current) {
      ft(v);
      return;
    }
    In(!1);
  }, () => {
    Hl = null;
  }), []), o.useEffect(() => {
    if (!Zt) return;
    const v = (Q) => {
      Q.key === "Escape" && In(!1);
    };
    return document.addEventListener("keydown", v), () => document.removeEventListener("keydown", v);
  }, [Zt]);
  const Is = o.useRef(null), [fn, Mn] = o.useState(null);
  o.useEffect(() => {
    Zt || Mn(null);
  }, [Zt]);
  const is = o.useCallback((v) => {
    if (v.target.closest("button")) return;
    const Q = Is.current, q = Q?.offsetParent;
    if (!q || !Q) return;
    const be = q.getBoundingClientRect(), vt = Q.getBoundingClientRect(), je = v.clientX - vt.left, Et = v.clientY - vt.top;
    v.preventDefault();
    const Xt = (bt) => {
      Mn({
        x: Math.max(0, Math.min(bt.clientX - be.left - je, be.width - vt.width)),
        y: Math.max(0, Math.min(bt.clientY - be.top - Et, be.height - 36))
      });
    }, Le = () => {
      window.removeEventListener("pointermove", Xt), window.removeEventListener("pointerup", Le);
    };
    window.addEventListener("pointermove", Xt), window.addEventListener("pointerup", Le);
  }, []), [pn, Mo] = o.useState({
    color: "#e6e8ea",
    strokeWidth: 2,
    lineStyle: "solid",
    opacity: 100
  });
  o.useEffect(() => {
    let v = !0;
    return (async () => {
      const Q = await fo.getTools();
      v && Q?.drawingDefaults && Mo((q) => ({ ...q, ...Q.drawingDefaults }));
    })(), () => {
      v = !1;
    };
  }, []);
  const Ro = o.useRef(null), Po = o.useRef(0), rl = o.useRef(() => {
  }), jo = o.useRef([]);
  o.useEffect(() => {
    Yl({ provider: l, symbol: n });
  }, [l, n]);
  const pt = `${l}:${n}`, Ct = o.useRef(null);
  o.useEffect(() => {
    let v = !0;
    return Ct.current = null, (async () => {
      const [Q, q] = await Promise.all([
        fo.getDrawings(pt),
        fo.getIndicators(pt)
      ]);
      v && (Nt(Q), zt(q ?? Ys), kn(null), Ct.current = pt);
    })(), () => {
      v = !1;
    };
  }, [pt]);
  const Rn = o.useCallback((v) => {
    Nt(v), Ct.current === pt && fo.setDrawings(pt, v);
  }, [pt]), eo = o.useCallback((v) => {
    zt(v), Ct.current === pt && fo.setIndicators(pt, v);
  }, [pt]);
  o.useEffect(() => {
    Ce && zt((v) => ({ ...v, ...Ce }));
  }, [Ce]);
  const lt = o.useCallback(() => {
    Rn([]), kn(null);
  }, [Rn]);
  o.useCallback((v) => {
    Rn(It.filter((Q) => Q.id !== v)), kn(null);
  }, [It, Rn]);
  const Pn = o.useMemo(() => {
    const v = Rd(ne, Je);
    return v.length ? { ...nn, customIndicators: v } : nn;
  }, [nn, ne, Je]), cs = ol(), us = Xu(), Fs = o.useMemo(() => {
    const v = ll(), Q = cs?.candles, q = cs?.chart;
    let be;
    return !us || !Q || !q ? be = { ...v } : be = {
      ...v,
      background: q.backgroundColor,
      backgroundOpacity: q.backgroundOpacity,
      grid: q.gridColor,
      gridOpacity: q.gridOpacity,
      axisLabel: q.axisLabelColor,
      axisLine: q.axisLineColor,
      crosshair: q.crosshairColor,
      priceTickerBullish: q.priceTickerBullish,
      priceTickerBearish: q.priceTickerBearish,
      bullish: Q.bodyBullish,
      bearish: Q.bodyBearish,
      bullishBorder: Q.bordersBullish,
      bearishBorder: Q.bordersBearish,
      bullishWick: Q.wickBullish,
      bearishWick: Q.wickBearish
    }, ot.marketColors === "teal_rose" ? (be.bullish = "#21b3a4", be.bearish = "#f0426c", be.bullishBorder = "#21b3a4", be.bearishBorder = "#f0426c", be.bullishWick = "#21b3a4", be.bearishWick = "#f0426c", be.priceTickerBullish = "#21b3a4", be.priceTickerBearish = "#f0426c") : ot.marketColors === "green_red" && (be.bullish = "#26a69a", be.bearish = "#ef5350", be.bullishBorder = "#26a69a", be.bearishBorder = "#ef5350", be.bullishWick = "#26a69a", be.bearishWick = "#ef5350", be.priceTickerBullish = "#26a69a", be.priceTickerBearish = "#ef5350"), ot.accent === "mint" ? be.grid = "#21b3a4" : ot.accent === "indigo" ? be.grid = "#6366f1" : ot.accent === "amber" && (be.grid = "#f59e0b"), ot.opacity !== void 0 && (be.backgroundOpacity = Math.round(ot.opacity * 100)), be;
  }, [cs, us, ot]), Os = cs?.data?.timezone || "local", jn = Yd[h] ?? 36e5, mn = M.length ? M[M.length - 1].close : null, [_n, xn] = o.useState("");
  o.useEffect(() => {
    const v = () => {
      if (h === "tick") {
        xn("");
        return;
      }
      if (!n || !Gr(n)) {
        xn("");
        return;
      }
      const q = Date.now(), be = Math.ceil(q / jn) * jn, vt = Math.max(0, be - q), je = Math.floor(vt / 1e3), Et = Math.floor(je / 60) % 60, Xt = Math.floor(je / 3600), Le = (bt) => String(bt).padStart(2, "0");
      xn(Xt > 0 ? `${Xt}:${Le(Et)}:${Le(je % 60)}` : `${Et}:${Le(je % 60)}`);
    };
    v();
    const Q = setInterval(v, 1e3);
    return () => clearInterval(Q);
  }, [n, jn, h]), o.useMemo(
    () => Object.values(nn || {}).filter((v) => v && v.enabled).length,
    [nn]
  );
  const al = o.useMemo(
    () => [
      ...ee.map((v, Q) => ({
        id: `trade-${Q}`,
        price: v.price,
        side: v.side,
        quantity: v.quantity ?? 0,
        symbol: n,
        pnl: v.pnl
      })),
      ...ye.map((v) => ({ ...v, symbol: n }))
    ],
    [ee, ye, n]
  );
  return n ? /* @__PURE__ */ t.jsxs("div", { className: "relative h-full w-full flex flex-col bg-[#1c1c1c]", style: { overflow: "visible" }, children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-3 px-3 h-[44px] border-b border-[#2a2a2a] bg-[#1c1c1c] text-[12px] shrink-0 overflow-visible relative z-[60]", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t.jsx("span", { className: "font-bold tracking-wider text-[#e8e8e8] text-[11px]", children: "LSE" }),
          /* @__PURE__ */ t.jsx("span", { className: "font-mono font-semibold text-[#e8e8e8] text-[13px]", children: n }),
          /* @__PURE__ */ t.jsxs("span", { className: "hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9]", children: [
            /* @__PURE__ */ t.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#21b3a4] animate-pulse" }),
            l.toUpperCase(),
            " • ",
            h
          ] })
        ] }),
        /* @__PURE__ */ t.jsx("div", { className: "flex items-center gap-0.5 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]", children: ["binance", "coinbase", "hyperliquid"].map((v) => {
          const Q = l === v, q = v === "hyperliquid" ? "HL" : v === "binance" ? "BIN" : "CB", be = v === "hyperliquid" ? "15ms" : v === "binance" ? "20ms" : "50ms";
          return /* @__PURE__ */ t.jsxs(
            "button",
            {
              onClick: () => {
                try {
                  window.__lseShell?.setProvider?.(v);
                } catch {
                }
              },
              className: `px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-colors ${Q ? "bg-[#e8e8e8] text-[#1c1c1c] shadow-sm" : "bg-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
              title: `${v} ${be} ultra-fast — auto load immediate`,
              children: [
                q,
                " ",
                /* @__PURE__ */ t.jsxs("span", { className: `text-[9px] ${Q ? "text-[#1c1c1c]/60" : "text-[#6a6a6a]"}`, children: [
                  be,
                  v === "hyperliquid" ? " ⚡" : ""
                ] })
              ]
            },
            v
          );
        }) })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2 shrink-0", style: { overflow: "visible" }, children: [
        /* @__PURE__ */ t.jsx("div", { style: { overflow: "visible", position: "relative", zIndex: 50 }, children: /* @__PURE__ */ t.jsx(dd, { value: ws, onChange: (v) => {
          Ss(v);
          try {
            window.__lseShell?.setTimeframe?.(v.label);
          } catch {
          }
        }, favs: zs, onToggleFav: Yn }) }),
        /* @__PURE__ */ t.jsx(ud, { value: ks, onChange: ss }),
        /* @__PURE__ */ t.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ t.jsxs(
            "select",
            {
              value: Tn.panelKinds[0] || "chart",
              onChange: (v) => Bn.setPanelKind(0, v.target.value),
              className: "appearance-none pl-3 pr-7 py-1.5 rounded-md border border-[#3a3a3a] bg-[#262626] text-[12px] font-medium text-[#e8e8e8] hover:bg-[#343434] hover:border-[#4a4a4a] focus:outline-none focus:border-[#4a4a4a] cursor-pointer",
              children: [
                /* @__PURE__ */ t.jsx("option", { value: "chart", children: "Chart" }),
                /* @__PURE__ */ t.jsx("option", { value: "edgedepth", children: "Heatmap Pro" }),
                /* @__PURE__ */ t.jsx("option", { value: "depth", children: "Depth Heat" }),
                /* @__PURE__ */ t.jsx("option", { value: "dom", children: "DOM Ladder" }),
                /* @__PURE__ */ t.jsx("option", { value: "tape", children: "Tape" }),
                /* @__PURE__ */ t.jsx("option", { value: "footprint", children: "Footprint" }),
                /* @__PURE__ */ t.jsx("option", { value: "vpvr", children: "VPVR" }),
                /* @__PURE__ */ t.jsx("option", { value: "tpo", children: "TPO" }),
                /* @__PURE__ */ t.jsx("option", { value: "liquidations", children: "Liquidations" }),
                /* @__PURE__ */ t.jsx("option", { value: "watchlist", children: "Watchlist" }),
                /* @__PURE__ */ t.jsx("option", { value: "indicators", children: "Indicators" })
              ]
            }
          ),
          /* @__PURE__ */ t.jsx("span", { className: "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[#6a6a6a]", children: "▼" })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "ml-auto flex items-center gap-1.5 shrink-0", children: [
        /* @__PURE__ */ t.jsx(md, { onSelect: (v) => Bn.setPanelKind(0, v) }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => Gs((v) => !v), className: `px-3 py-1.5 rounded-md border text-[12px] font-medium transition-colors ${Bs ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`, children: "Layers" }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => Us(!0), className: "px-3 py-1.5 rounded-md border border-[#3a3a3a] bg-[#262626] text-[12px] font-medium text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]", children: "Find" }),
        /* @__PURE__ */ t.jsx("div", { className: "w-px h-5 bg-[#2a2a2a] mx-1" }),
        /* @__PURE__ */ t.jsxs("button", { onClick: () => To((v) => !v), className: `px-2.5 py-1 rounded-full border text-[10px] font-medium flex items-center gap-1.5 transition-colors ${qs ? "bg-[#21b3a4]/10 border-[#21b3a4]/30 text-[#21b3a4]" : "bg-[#262626] border-[#3a3a3a] text-[#6a6a6a] hover:text-[#b9b9b9]"}`, title: "Real-time follow", children: [
          /* @__PURE__ */ t.jsx("span", { className: `w-1.5 h-1.5 rounded-full ${qs ? "bg-[#21b3a4] animate-pulse" : "bg-[#6a6a6a]"}` }),
          " ",
          qs ? "LIVE" : "PAUSED"
        ] }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => Ds((v) => !v), className: `w-8 h-8 rounded-md border flex items-center justify-center transition-colors ${Ke ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`, children: "⚙" }),
        /* @__PURE__ */ t.jsx("button", { onClick: ae, className: "px-3 py-1.5 rounded-md bg-[#e8e8e8] text-[#1c1c1c] text-[12px] font-semibold hover:bg-white transition-colors", children: "Indicators" })
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "relative flex-1 min-h-0 w-full flex", children: [
      /* @__PURE__ */ t.jsx(
        cd,
        {
          activeTool: Qe,
          onToolSelect: Re,
          magnet: tt,
          onToggleMagnet: () => xt((v) => !v),
          hiddenAll: As,
          onToggleHidden: () => wo((v) => !v),
          onClearAll: lt,
          collapsed: Ht,
          onToggleCollapsed: () => Vt((v) => !v)
        }
      ),
      /* @__PURE__ */ t.jsx(
        "div",
        {
          ref: Cn,
          className: "relative flex-1 min-w-0",
          style: rs ? { transform: "scaleY(-1)" } : void 0,
          onContextMenu: (v) => {
            v.preventDefault(), at(!1), Un(null), Gn("");
            let Q = null;
            if (Cs === "1x1" && de && Cn.current) {
              const be = Cn.current.getBoundingClientRect(), vt = rs ? be.height - (v.clientY - be.top) : v.clientY - be.top, je = de.yToPrice(vt);
              Number.isFinite(je) && je > 0 && (Q = je);
            }
            const q = window.__lseShell?.tradeInfo?.() || null;
            Pe({
              x: Math.min(v.clientX, window.innerWidth - 240),
              y: Math.min(v.clientY, window.innerHeight - (q?.available ? 360 : 230)),
              price: Q,
              ref: mn,
              trade: q
            });
          },
          children: Cs !== "1x1" ? /* @__PURE__ */ t.jsx(
            Id,
            {
              layout: Cs,
              syncSettings: On,
              pair: n,
              timeframe: h,
              colors: Fs,
              quote: r,
              sourceProvider: l
            }
          ) : Tn.panelKinds[0] === "depth" ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(ns, {}), children: /* @__PURE__ */ t.jsx(
            Pd,
            {
              symbol: n,
              sourceProvider: l,
              colors: Fs,
              onToggleKind: () => Bn.setPanelKind(0, "chart")
            }
          ) }) : Tn.panelKinds[0] === "edgedepth" ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(ns, {}), children: /* @__PURE__ */ t.jsx(
            jd,
            {
              symbol: n,
              provider: l,
              embedded: !0,
              onToggleKind: () => Bn.setPanelKind(0, "chart"),
              liqColormap: ot.liqColormap,
              obColormap: ot.obColormap,
              opacity: ot.opacity,
              intensity: ot.intensity,
              gamma: ot.gamma,
              noiseFloor: ot.noiseFloor,
              tickPerRow: ot.tickPerRow,
              halfLife: ot.halfLife
            }
          ) }) : ["orderflow", "dom", "tape", "footprint", "vpvr", "tpo", "cvd", "liquidations", "ed_liquidations", "ed_vpvr", "ed_footprint", "ed_tpo", "watchlist", "indicators"].includes(Tn.panelKinds[0]) ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(ns, {}), children: (() => {
            const v = Tn.panelKinds[0];
            return v === "dom" ? /* @__PURE__ */ t.jsx(Kr, { symbol: n, provider: l }) : v === "tape" ? /* @__PURE__ */ t.jsx(Nd, { symbol: n, provider: l }) : v === "footprint" ? /* @__PURE__ */ t.jsx(Wd, { symbol: n, provider: l }) : v === "vpvr" ? /* @__PURE__ */ t.jsx(Bd, { symbol: n, provider: l }) : v === "tpo" ? /* @__PURE__ */ t.jsx(Fd, { symbol: n, provider: l }) : v === "liquidations" ? /* @__PURE__ */ t.jsx(Dd, { symbol: n, provider: l, colormap: ot.liqColormap, intensity: ot.intensity, opacity: ot.opacity, gamma: ot.gamma, noiseFloor: ot.noiseFloor, tickPerRow: ot.tickPerRow, halfLife: ot.halfLife, lowPeak: ot.lowPeak }) : v === "watchlist" ? /* @__PURE__ */ t.jsx(Ld, { activeSymbol: n, onSelectSymbol: (Q) => {
              try {
                window.__lseShell?.selectSymbol?.(Q);
              } catch {
              }
            } }) : v === "indicators" ? /* @__PURE__ */ t.jsx(Ed, { symbol: n, provider: l }) : /* @__PURE__ */ t.jsx(Kr, { symbol: n, provider: l });
          })() }) : /* @__PURE__ */ t.jsx(t.Fragment, { children: /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
            /* @__PURE__ */ t.jsx(
              Ul,
              {
                candles: Je,
                symbol: n,
                timeframe: h,
                chartType: Mt,
                onLoadMore: Y,
                isLoadingMore: Ee,
                prependShift: Fe.shift,
                livePrice: mn,
                countdown: _n,
                timezone: Os,
                rightOffset: 6,
                colors: Fs,
                indicators: Pn,
                onIndicatorsChange: eo,
                onRemoveEngineIndicator: (v) => window.__lseShell?.removeIndicator?.(v),
                onEditEngineIndicator: (v) => {
                  window.__lseShell?.editIndicator?.(v) || ae();
                },
                drawings: It,
                selectedDrawingId: tn,
                drawingCursorRef: jo,
                requestRedrawRef: Ro,
                scrollOffsetRef: Po,
                onScrollSync: () => rl.current?.(),
                onConverterReady: ze,
                onOpenSettings: ae,
                positionLines: al,
                onPositionModify: oe,
                onPositionClose: Oe,
                autoSelectPositionId: Ge,
                showBidAskSpread: !!r,
                brokerBid: r?.bid ?? null,
                brokerAsk: r?.ask ?? null
              },
              Ne
            ),
            /* @__PURE__ */ t.jsx(
              Yu,
              {
                activeTool: re,
                onToolSelect: ct,
                drawings: It,
                onDrawingsChange: Rn,
                selectedDrawingId: tn,
                onSelectDrawing: kn,
                converter: de,
                scrollSyncRef: rl,
                scrollOffsetRef: Po,
                drawingCursorRef: jo,
                requestRedrawRef: Ro,
                toolSettings: pn,
                isLocked: an,
                isHidden: As,
                currentSymbol: n,
                timeframeMs: jn,
                currentPrice: mn ?? void 0,
                candles: M
              }
            )
          ] }) })
        }
      ),
      Zt && /* @__PURE__ */ t.jsxs(
        "div",
        {
          ref: Is,
          className: "absolute z-[95] w-80",
          style: {
            ...fn ? { left: fn.x, top: fn.y } : { top: 8, right: 8 },
            background: "var(--panel)",
            border: "1px solid var(--edge)",
            borderRadius: 3,
            boxShadow: "0 10px 32px var(--shadow)"
          },
          children: [
            /* @__PURE__ */ t.jsxs(
              "div",
              {
                onPointerDown: is,
                className: "flex items-center justify-between px-3 py-1.5 select-none",
                style: { borderBottom: "1px solid var(--edge)", cursor: "move" },
                children: [
                  /* @__PURE__ */ t.jsx("span", { style: { fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "var(--dim)" }, children: "CHART LAYOUT" }),
                  /* @__PURE__ */ t.jsx(
                    "button",
                    {
                      onClick: () => In(!1),
                      "aria-label": "Close settings",
                      className: "text-muted-foreground hover:text-foreground",
                      style: { fontSize: 14, lineHeight: 1, padding: "0 2px" },
                      children: "×"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ t.jsxs("div", { className: "flex items-center", style: { borderBottom: "1px solid var(--edge)" }, children: [
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: () => ft("appearance"),
                  className: "flex-1 px-3 py-1.5 text-xs font-medium transition-colors",
                  style: as === "appearance" ? { color: "var(--text)", background: "var(--active)" } : { color: "var(--dim)" },
                  children: "Appearance"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: () => ft("chart"),
                  className: "flex-1 px-3 py-1.5 text-xs font-medium transition-colors",
                  style: as === "chart" ? { color: "var(--text)", background: "var(--active)" } : { color: "var(--dim)" },
                  children: "Chart"
                }
              )
            ] }),
            /* @__PURE__ */ t.jsx("div", { className: "max-h-[70vh] overflow-y-auto", children: as === "appearance" ? /* @__PURE__ */ t.jsx(zu, { hideHeader: !0, onBack: () => In(!1) }) : /* @__PURE__ */ t.jsx(Ku, { hideHeader: !0, onBack: () => In(!1) }) }),
            /* @__PURE__ */ t.jsx(
              "div",
              {
                className: "flex justify-end px-3 py-2",
                style: { borderTop: "1px solid var(--edge)" },
                children: /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    onClick: () => In(!1),
                    className: "text-xs font-medium",
                    style: {
                      padding: "3px 16px",
                      color: "var(--text)",
                      background: "var(--active)",
                      border: "1px solid var(--edge)",
                      borderRadius: 2
                    },
                    children: "Done"
                  }
                )
              }
            )
          ]
        }
      ),
      Ke && /* @__PURE__ */ t.jsx("div", { className: "absolute top-10 right-2 z-[90]", children: /* @__PURE__ */ t.jsx(fd, { settings: ot, onChange: Co, onClose: () => Ds(!1) }) }),
      Bs && /* @__PURE__ */ t.jsx("div", { className: "absolute top-10 left-[320px] z-[90]", children: /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx("div", { className: "p-2 text-[10px] text-[#b9b9b9]", children: "Loading layers..." }), children: /* @__PURE__ */ t.jsx(Ad, { layers: wn, onChange: Zs }) }) }),
      /* @__PURE__ */ t.jsx(pd, { open: Ks, onClose: () => Us(!1), onSelect: (v) => {
        try {
          window.__lseShell?.selectSymbol?.(v);
        } catch {
        }
      } }),
      cn && /* @__PURE__ */ t.jsxs(
        "div",
        {
          className: "fixed z-[110]",
          style: {
            left: cn.x,
            top: cn.y,
            minWidth: 190,
            padding: "2px 0 6px",
            background: "var(--panel)",
            border: "1px solid var(--edge)",
            borderRadius: 2,
            boxShadow: "0 6px 20px var(--shadow)",
            fontSize: 12,
            color: "var(--text)"
          },
          onClick: (v) => v.stopPropagation(),
          children: [
            cn.trade?.available && (() => {
              const v = cn.trade, Q = (Le) => window.__lseShell?.fmtPrice?.(Le) ?? String(Le), q = (Le) => Le === "limit" ? "Limit" : "Stop";
              if (St) {
                const Le = {
                  flex: 1,
                  minWidth: 0,
                  padding: "3px 6px",
                  fontSize: 12,
                  color: "var(--text)",
                  background: "var(--bg2)",
                  border: "1px solid var(--edge)",
                  borderRadius: 2
                }, bt = {
                  width: 38,
                  fontSize: 11,
                  color: "var(--dim)",
                  flexShrink: 0
                }, ds = () => {
                  const Rt = parseFloat(Sn), At = parseFloat(qn);
                  if (!(Rt > 0)) {
                    Gn("enter a price");
                    return;
                  }
                  if (!(At > 0)) {
                    Gn("enter a size");
                    return;
                  }
                  window.__lseShell?.quickOrder?.(St.side, St.otype, Rt, At), Pe(null), Un(null);
                }, Kt = (Rt) => {
                  Rt.stopPropagation(), Rt.key === "Enter" && ds(), Rt.key === "Escape" && (Un(null), Gn(""));
                };
                return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                  /* @__PURE__ */ t.jsxs("div", { style: { ...yn, cursor: "default", fontWeight: 600 }, children: [
                    St.side === "buy" ? "Buy" : "Sell",
                    " ",
                    q(St.otype),
                    " · ",
                    v.symbol
                  ] }),
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      style: { display: "flex", gap: 6, alignItems: "center", margin: "2px 10px 4px" },
                      onClick: (Rt) => Rt.stopPropagation(),
                      children: [
                        /* @__PURE__ */ t.jsx("span", { style: bt, children: "Price" }),
                        /* @__PURE__ */ t.jsx(
                          "input",
                          {
                            autoFocus: !0,
                            value: Sn,
                            spellCheck: !1,
                            inputMode: "decimal",
                            style: Le,
                            onChange: (Rt) => Fn(Rt.target.value),
                            onKeyDown: Kt
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      style: { display: "flex", gap: 6, alignItems: "center", margin: "0 10px 4px" },
                      onClick: (Rt) => Rt.stopPropagation(),
                      children: [
                        /* @__PURE__ */ t.jsx("span", { style: bt, children: "Units" }),
                        /* @__PURE__ */ t.jsx(
                          "input",
                          {
                            value: qn,
                            spellCheck: !1,
                            inputMode: "decimal",
                            style: Le,
                            onChange: (Rt) => Ws(Rt.target.value),
                            onKeyDown: Kt
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      style: { display: "flex", gap: 4, margin: "0 10px 2px", justifyContent: "flex-end" },
                      onClick: (Rt) => Rt.stopPropagation(),
                      children: [
                        /* @__PURE__ */ t.jsx(
                          "button",
                          {
                            style: {
                              padding: "3px 10px",
                              fontSize: 12,
                              borderRadius: 2,
                              cursor: "pointer",
                              border: "1px solid var(--edge)",
                              background: "transparent",
                              color: "var(--dim)"
                            },
                            onClick: () => {
                              Un(null), Gn("");
                            },
                            children: "Back"
                          }
                        ),
                        /* @__PURE__ */ t.jsx(
                          "button",
                          {
                            style: {
                              padding: "3px 12px",
                              fontSize: 12,
                              borderRadius: 2,
                              cursor: "pointer",
                              border: "1px solid var(--edge)",
                              background: "var(--active)",
                              color: "var(--text)"
                            },
                            onClick: ds,
                            children: "Place"
                          }
                        )
                      ]
                    }
                  ),
                  nt && /* @__PURE__ */ t.jsx("div", { style: { ...yn, color: "#e05d5d", cursor: "default" }, children: nt }),
                  /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: "1px solid var(--edge)" } })
                ] });
              }
              const be = v.qty != null ? `${v.qty} ` : "", vt = [
                { label: `Buy ${be}${v.symbol} at market`, side: "buy", otype: "market" },
                { label: `Sell ${be}${v.symbol} at market`, side: "sell", otype: "market" }
              ], je = cn.price, Et = cn.ref, Xt = v.pendingTypes || [];
              if (je != null && Et != null && je !== Et && Xt.length) {
                const Le = je < Et ? [{ side: "buy", otype: "limit" }, { side: "sell", otype: "stop" }] : [{ side: "sell", otype: "limit" }, { side: "buy", otype: "stop" }];
                for (const bt of Le)
                  Xt.includes(bt.otype) && vt.push({ ...bt, label: `${bt.side === "buy" ? "Buy" : "Sell"} ${q(bt.otype)} @ ${Q(je)}…` });
              }
              return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                vt.map((Le) => /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    className: "w-full text-left",
                    style: yn,
                    onMouseEnter: gs,
                    onMouseLeave: vs,
                    onClick: (bt) => {
                      if (Le.otype === "market") {
                        window.__lseShell?.quickOrder?.(Le.side, Le.otype, cn.price), Pe(null);
                        return;
                      }
                      bt.stopPropagation(), Un({ side: Le.side, otype: Le.otype }), Fn(je != null ? String(+je.toFixed(je >= 1e3 ? 2 : je >= 100 ? 3 : je >= 1 ? 4 : 6)) : ""), Ws(v.qty != null ? String(v.qty) : ""), Gn("");
                    },
                    children: Le.label
                  },
                  `${Le.side}-${Le.otype}`
                )),
                /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: "1px solid var(--edge)" } })
              ] });
            })(),
            /* @__PURE__ */ t.jsxs(
              "button",
              {
                className: "w-full text-left",
                style: { ...yn, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 },
                onMouseEnter: gs,
                onMouseLeave: vs,
                onClick: () => at((v) => !v),
                children: [
                  /* @__PURE__ */ t.jsx("span", { children: "Chart template" }),
                  /* @__PURE__ */ t.jsx("span", { style: { color: "var(--dim)" }, children: ut ? "▾" : "▸" })
                ]
              }
            ),
            ut && /* @__PURE__ */ t.jsxs("div", { className: "max-h-48 overflow-y-auto", style: { borderTop: "1px solid var(--edge)", borderBottom: "1px solid var(--edge)", margin: "3px 0" }, children: [
              (window.__lseShell?.layouts?.() || []).length === 0 ? /* @__PURE__ */ t.jsx("div", { style: { ...yn, color: "var(--dim)" }, children: "No saved templates yet" }) : window.__lseShell.layouts().map((v) => /* @__PURE__ */ t.jsxs(
                "div",
                {
                  style: { ...yn, display: "flex", alignItems: "center", gap: 8, paddingLeft: 20, cursor: "pointer" },
                  onMouseEnter: gs,
                  onMouseLeave: vs,
                  onClick: () => {
                    window.__lseShell?.applyLayout?.(v.id), Pe(null);
                  },
                  children: [
                    /* @__PURE__ */ t.jsx("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: v.name }),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        title: os === v.id ? "Click again to delete" : "Delete template",
                        style: {
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          fontSize: os === v.id ? 11 : 13,
                          lineHeight: 1,
                          padding: "0 2px",
                          color: os === v.id ? "#e05d5d" : "var(--dim)"
                        },
                        onClick: async (Q) => {
                          if (Q.stopPropagation(), os !== v.id) {
                            Kn(v.id);
                            return;
                          }
                          await window.__lseShell?.deleteLayout?.(v.id), Kn(null), Wt((q) => q + 1);
                        },
                        children: os === v.id ? "sure?" : "×"
                      }
                    )
                  ]
                },
                v.id
              )),
              it ? /* @__PURE__ */ t.jsxs(
                "div",
                {
                  style: { display: "flex", gap: 4, margin: "3px 12px 5px", alignItems: "center" },
                  onClick: (v) => v.stopPropagation(),
                  children: [
                    /* @__PURE__ */ t.jsx(
                      "input",
                      {
                        autoFocus: !0,
                        value: zn,
                        placeholder: "Template name",
                        spellCheck: !1,
                        style: {
                          flex: 1,
                          minWidth: 0,
                          padding: "3px 6px",
                          fontSize: 12,
                          color: "var(--text)",
                          background: "var(--bg2)",
                          border: "1px solid var(--edge)",
                          borderRadius: 2
                        },
                        onChange: (v) => sn(v.target.value),
                        onKeyDown: async (v) => {
                          if (v.stopPropagation(), v.key === "Escape") {
                            Wn(!1);
                            return;
                          }
                          v.key === "Enter" && await Qs();
                        }
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        disabled: !zn.trim(),
                        title: zn.trim() ? "Save this chart as a template" : "Name the template first",
                        style: {
                          padding: "3px 10px",
                          fontSize: 12,
                          lineHeight: 1.5,
                          borderRadius: 2,
                          border: "1px solid var(--edge)",
                          background: "var(--active)",
                          color: "var(--text)",
                          cursor: zn.trim() ? "pointer" : "default",
                          opacity: zn.trim() ? 1 : 0.5
                        },
                        onClick: Qs,
                        children: "Save"
                      }
                    )
                  ]
                }
              ) : /* @__PURE__ */ t.jsx(
                "button",
                {
                  className: "w-full text-left",
                  style: { ...yn, paddingLeft: 20, color: "var(--dim)" },
                  onMouseEnter: gs,
                  onMouseLeave: vs,
                  onClick: (v) => {
                    v.stopPropagation(), sn(window.__lseShell?.layoutDefaultName?.() || ""), ls(""), Wn(!0);
                  },
                  children: "+ Save current as template…"
                }
              ),
              Js && /* @__PURE__ */ t.jsx("div", { style: { ...yn, paddingLeft: 20, color: "#e05d5d" }, children: Js })
            ] }),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "w-full text-left",
                style: yn,
                onMouseEnter: gs,
                onMouseLeave: vs,
                onClick: () => {
                  Cn.current?.querySelector('button[title="Reset view"]')?.click(), Pe(null);
                },
                children: "Reset chart view"
              }
            ),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "w-full text-left",
                style: yn,
                onMouseEnter: gs,
                onMouseLeave: vs,
                onClick: () => {
                  Io((v) => !v), Pe(null);
                },
                children: rs ? "Unflip chart" : "Flip chart"
              }
            ),
            It.length > 0 && /* @__PURE__ */ t.jsxs(
              "button",
              {
                className: "w-full text-left",
                style: yn,
                onMouseEnter: gs,
                onMouseLeave: vs,
                onClick: () => {
                  lt(), Pe(null);
                },
                children: [
                  "Remove drawings (",
                  It.length,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: "1px solid var(--edge)" } }),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "w-full text-left",
                style: yn,
                onMouseEnter: gs,
                onMouseLeave: vs,
                onClick: () => {
                  ft("appearance"), In(!0), Pe(null);
                },
                children: "Settings..."
              }
            )
          ]
        }
      )
    ] })
  ] }) : /* @__PURE__ */ t.jsx("div", { className: "h-full w-full" });
}
function Kd({ symbol: l, timeframe: n, candles: h, quote: M }) {
  const T = ol(), ee = o.useMemo(() => ll(), []);
  return !l || !h.length ? /* @__PURE__ */ t.jsx("div", { className: "h-full w-full" }) : /* @__PURE__ */ t.jsx(
    Ul,
    {
      candles: h,
      symbol: l,
      timeframe: n,
      chartType: "candlestick",
      livePrice: h[h.length - 1]?.close ?? null,
      rightOffset: 6,
      colors: ee,
      indicators: Ys,
      timezone: T?.data?.timezone || "local",
      showBidAskSpread: !!M,
      brokerBid: M?.bid ?? null,
      brokerAsk: M?.ask ?? null
    }
  );
}
const Es = /* @__PURE__ */ new Map();
function Ur(l) {
  const n = Es.get(l);
  n && n.root.render(
    /* @__PURE__ */ t.jsx(Kl, { children: /* @__PURE__ */ t.jsx(zl, { children: /* @__PURE__ */ t.jsx(Kd, { ...n.props }) }) })
  );
}
const Ud = {
  mount(l, n = {}) {
    Es.has(l) || Es.set(l, { root: ys(l), props: {} });
    const h = Es.get(l);
    h.props = { ...h.props, ...sl(n) }, Ur(l);
  },
  update(l, n) {
    const h = Es.get(l);
    h && (h.props = { ...h.props, ...sl(n) }, Ur(l));
  },
  unmount(l) {
    const n = Es.get(l);
    n && (n.root.unmount(), Es.delete(l));
  }
};
function qd() {
  const l = ql();
  return /* @__PURE__ */ t.jsx(
    Uu,
    {
      selectedLayout: l.layout,
      onLayoutChange: (n) => Bn.setLayout(n),
      syncSettings: l.sync,
      onSyncSettingsChange: (n) => Bn.setSync(n),
      isMultiPanelActive: l.layout !== "1x1",
      onExitMultiPanel: () => Bn.setLayout("1x1")
    }
  );
}
let Xs = null, Hl = null, Vl = null, ko = {
  provider: "demo",
  symbol: "",
  timeframe: "1h",
  candles: [],
  chartType: "candlestick",
  trades: [],
  engineIndicators: void 0
};
function _l() {
  Xs && Xs.render(
    /* @__PURE__ */ t.jsx(Kl, { children: /* @__PURE__ */ t.jsx(zl, { children: /* @__PURE__ */ t.jsx(zd, { ...ko, indicatorPatch: Vl }) }) })
  );
}
const Gd = {
  candles: "candlestick",
  bars: "candlestick",
  candlestick: "candlestick",
  line: "line",
  area: "area",
  renko: "renko",
  heikin_ashi: "heikin_ashi",
  heikin: "heikin_ashi",
  tpo: "tpo",
  footprint_cluster: "footprint_cluster",
  fp_cluster: "footprint_cluster",
  footprint_profile: "footprint_profile",
  fp_profile: "footprint_profile",
  flow_positioning: "flow_positioning",
  flow: "flow_positioning"
}, qr = 1e12;
function sl(l) {
  const n = { ...l };
  return l.chartType && (n.chartType = Gd[l.chartType] ?? "candlestick"), "symbol" in l && !l.symbol && (n.symbol = ""), l.candles?.length && l.candles[0].time < qr && (n.candles = l.candles.map((h) => ({ ...h, time: h.time * 1e3 }))), l.trades?.length && l.trades[0].time < qr && (n.trades = l.trades.map((h) => ({ ...h, time: h.time * 1e3 }))), n;
}
const Gl = {
  async mount(l, n = {}) {
    ko = { ...ko, ...sl(n) }, Xs || (Xs = ys(l)), await Jr(), _l();
  },
  update(l) {
    ko = { ...ko, ...sl(l) }, _l();
  },
  unmount() {
    Xs?.unmount(), Xs = null;
  },
  openAppearance(l) {
    Hl?.(l);
  },
  invalidateWorkspaceSection(l) {
    Vu(l);
  },
  setIndicators(l) {
    Vl = { ...Vl || {}, ...l }, _l();
  },
  indicatorKeys() {
    return Object.keys(Ys);
  },
  indicatorDefaults() {
    return JSON.parse(JSON.stringify(Ys));
  }
}, Zd = new qu(), Xl = { inReplay: !1 };
function Jd({ onExit: l }) {
  const [n, h] = o.useState(!0), M = Zr();
  o.useEffect(() => {
    h(!0);
  }, [M.key]);
  const T = (ee) => {
    h(ee), ee || setTimeout(() => {
      Xl.inReplay || l();
    }, 150);
  };
  return /* @__PURE__ */ t.jsx("div", { className: "h-full w-full bg-[#0b0d12]", children: /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(ns, {}), children: /* @__PURE__ */ t.jsx(_d, { open: n, onOpenChange: T }) }) });
}
function Qd({ provider: l }) {
  const [n] = Ju(), h = Zr(), M = n.get("sym"), T = h.pathname.split("/").pop() || "", ee = n.get("provider") || l;
  return Yl({ provider: ee, symbol: M || T }), o.useEffect(() => (Xl.inReplay = !0, () => {
    Xl.inReplay = !1;
  }), []), /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(ns, {}), children: /* @__PURE__ */ t.jsx(Od, {}) });
}
let xo = null;
const eh = {
  async mount(l, n = {}) {
    const h = n.provider || "demo", M = n.onExit || (() => {
    });
    xo || (xo = ys(l)), Yl({ provider: h, symbol: "" }), await Jr(), xo.render(
      /* @__PURE__ */ t.jsx(Gu, { client: Zd, children: /* @__PURE__ */ t.jsx(Kl, { initialEntries: ["/"], children: /* @__PURE__ */ t.jsxs(zl, { children: [
        /* @__PURE__ */ t.jsxs(Zu, { children: [
          /* @__PURE__ */ t.jsx(Br, { path: "/backtest/:pair", element: /* @__PURE__ */ t.jsx(Qd, { provider: h }) }),
          /* @__PURE__ */ t.jsx(Br, { path: "*", element: /* @__PURE__ */ t.jsx(Jd, { onExit: M }) })
        ] }),
        /* @__PURE__ */ t.jsx(ed, { theme: "dark", position: "bottom-right" })
      ] }) }) })
    );
  },
  unmount() {
    xo?.unmount(), xo = null;
  }
};
let bo = null;
const th = {
  mount(l, n = {}) {
    bo || (bo = ys(l)), bo.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(ns, {}), children: /* @__PURE__ */ t.jsx($d, { onBack: n.onBack, initialView: n.view }) })
    );
  },
  unmount() {
    bo?.unmount(), bo = null;
  }
};
let go = null;
const nh = {
  mount(l) {
    go || (go = ys(l)), go.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(ns, {}), children: /* @__PURE__ */ t.jsx(Hd, {}) })
    );
  },
  unmount() {
    go?.unmount(), go = null;
  }
};
let vo = null;
const sh = {
  mount(l) {
    vo || (vo = ys(l)), vo.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(ns, {}), children: /* @__PURE__ */ t.jsx(Vd, {}) })
    );
  },
  unmount() {
    vo?.unmount(), vo = null;
  }
};
let yo = null;
const oh = {
  mount(l) {
    yo || (yo = ys(l)), yo.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(ns, {}), children: /* @__PURE__ */ t.jsx(Xd, {}) })
    );
  },
  unmount() {
    yo?.unmount(), yo = null;
  }
};
Gl.mountLayoutButton = (l) => {
  ys(l).render(/* @__PURE__ */ t.jsx(qd, {}));
};
Gl.layoutStore = Bn;
window.LSEChart = Gl;
window.LSEChartPanes = Ud;
window.LSEManualBacktest = eh;
window.LSEEconCalendar = th;
window.LSEDataViz = nh;
window.LSEQuantModels = sh;
window.LSENotebooks = oh;
export {
  Gl as default
};
