import { r as o, i as Er, j as t, g as kc, q as ys } from "./chunks/react-vendor-C0yw3i6b.js";
import { n as Ar, o as Dr, p as wc, q as Sc, r as Cc, s as Ic, t as Tc, u as Mc, v as jc, w as Rc, x as Pc, y as Lc, z as Nc, A as Ec, C as Ac, D as Dc, E as Bc, F as Wc, G as Fc, H as Oc, J as _c, K as $c, M as Hc, N as Vc, O as Xc, Q as Yc, R as zc, U as Kc, V as Uc, W as qc, X as Gc, Y as Zc, Z as Jc, _ as Qc, $ as ei, a0 as ti, a1 as ni, a2 as si, a3 as li, a4 as oi, a5 as ri, a6 as ai, a7 as ci, a8 as ii, a9 as ui, aa as di, ab as hi, ac as fi, ad as pi, ae as xi, af as mi, ag as bi, ah as gi, ai as vi, aj as yi, ak as ki, al as wi, am as Si, an as Ci, ao as Ii, ap as Ti, aq as Mi, ar as ji, as as Ri, at as Pi, au as Li, av as Ni, aw as Ei, ax as Ai, ay as Di, az as Bi, aA as Wi, aB as Fi, aC as Oi, aD as _i, aE as $i, aF as Hi, aG as Vi, aH as Xi, aI as Yi, aJ as zi, aK as Ki, aL as Ui, aM as qi, aN as Gi, aO as Zi, aP as Ji, aQ as Qi, aR as eu, aS as tu, aT as nu, aU as su, aV as lu, aW as ou, aX as ru, aY as au, aZ as cu, a_ as iu, a$ as uu, b0 as du, b1 as hu, b2 as fu, b3 as pu, b4 as xu, b5 as Ve, b6 as mu, b7 as bu, b8 as lo, b9 as oo, ba as gu, bb as vu, bc as yu, bd as ku, be as wu, bf as Su, bg as Cu, bh as Iu, bi as Oo, bj as Tu, bk as Mu, bl as ju, bm as Ru, bn as Pu, g as Lu, bo as Nu, bp as Eu, bq as Au, br as Br, bs as Kl, bt as Du, bu as Gr, bv as Bu, bw as Wu, bx as Fu, by as Ul, bz as Ou, bA as _u, bB as $u, bC as Hu, bD as zs, bE as Vu, bF as zo, bG as Ko, bH as hl, bI as Xu, bJ as Yu, bK as zu, bL as Ku, bM as Uu } from "./chunks/backtest-CeqYlV1v.js";
import { au as ql, av as Gl, m as Zl, aw as Jl } from "./chunks/ui-DZwdMnFY.js";
import { Q as qu, d as Gu, M as Uo, R as Zu, e as Wr, c as Ju, a as Zr } from "./chunks/router-query-iQy8iLKR.js";
import { D as Qu } from "./chunks/depth-DlOTyhhP.js";
import { $ as ed } from "./chunks/ui-heavy-BL_8guwx.js";
function Fr(l, n) {
  const { closes: h, highs: T, lows: I, opens: se, volumes: re, timestamps: Me } = l;
  let r = null;
  return n.movingAverages?.enabled && n.movingAverages.lines?.length > 0 && (r = n.movingAverages.lines.map((ee) => {
    let $e;
    switch (ee.type) {
      case "SMA":
        $e = wc(h, ee.period);
        break;
      case "SMMA":
        $e = Dr(h, ee.period);
        break;
      case "EMA":
      default:
        $e = Ar(h, ee.period);
        break;
    }
    return { data: $e, color: ee.color, name: `${ee.type} ${ee.period}` };
  })), {
    rsi: n.rsi?.enabled ? xu(h, n.rsi.period) : null,
    macd: n.macd?.enabled ? pu(h, n.macd.fast, n.macd.slow, n.macd.signal) : null,
    ema: n.ema?.enabled ? n.ema.periods.map((ee) => Ar(h, ee)) : null,
    bollinger: n.bollinger?.enabled ? fu(h, n.bollinger.period, n.bollinger.stdDev) : null,
    movingAverages: r,
    atr: n.atr?.enabled ? hu(T, I, h, n.atr.period) : null,
    stochastic: n.stochastic?.enabled ? du(T, I, h, n.stochastic.kPeriod, n.stochastic.dPeriod, n.stochastic.smooth) : null,
    williamsR: n.williamsR?.enabled ? uu(T, I, h, n.williamsR.period) : null,
    cci: n.cci?.enabled ? iu(T, I, h, n.cci.period) : null,
    adx: n.adx?.enabled ? cu(T, I, h, n.adx.period) : null,
    roc: n.roc?.enabled ? au(h, n.roc.period) : null,
    vwap: n.vwap?.enabled ? ru(T, I, h, re, Me) : null,
    ichimoku: n.ichimoku?.enabled ? ou(T, I, h, n.ichimoku.tenkanPeriod, n.ichimoku.kijunPeriod, n.ichimoku.senkouBPeriod, n.ichimoku.displacement) : null,
    parabolicSAR: n.parabolicSAR?.enabled ? lu(T, I, n.parabolicSAR.afStart, n.parabolicSAR.afStep, n.parabolicSAR.afMax) : null,
    keltner: n.keltner?.enabled ? su(T, I, h, n.keltner.emaPeriod, n.keltner.atrPeriod, n.keltner.multiplier) : null,
    pivotPoints: n.pivotPoints?.enabled ? nu(Me, T, I, h) : null,
    supertrend: n.supertrend?.enabled ? tu(T, I, h, n.supertrend.period, n.supertrend.multiplier) : null,
    donchian: n.donchian?.enabled ? eu(T, I, n.donchian.period) : null,
    aroon: n.aroon?.enabled ? Qi(T, I, n.aroon.period) : null,
    envelopes: n.envelopes?.enabled ? Ji(h, n.envelopes.period, n.envelopes.percent) : null,
    dema: n.dema?.enabled ? Zi(h, n.dema.period) : null,
    tema: n.tema?.enabled ? Gi(h, n.tema.period) : null,
    hma: n.hma?.enabled ? qi(h, n.hma.period) : null,
    momentum: n.momentum?.enabled ? Ui(h, n.momentum.period) : null,
    awesomeOsc: n.awesomeOsc?.enabled ? Ki(T, I) : null,
    mfi: n.mfi?.enabled ? zi(T, I, h, re, n.mfi.period) : null,
    tsi: n.tsi?.enabled ? Yi(h, n.tsi.longPeriod, n.tsi.shortPeriod, n.tsi.signalPeriod) : null,
    trix: n.trix?.enabled ? Xi(h, n.trix.period, n.trix.signalPeriod) : null,
    ultimateOsc: n.ultimateOsc?.enabled ? Vi(T, I, h, n.ultimateOsc.fast, n.ultimateOsc.med, n.ultimateOsc.slow) : null,
    dpo: n.dpo?.enabled ? Hi(h, n.dpo.period) : null,
    kst: n.kst?.enabled ? $i(h, n.kst.roc1, n.kst.roc2, n.kst.roc3, n.kst.roc4, n.kst.sma1, n.kst.sma2, n.kst.sma3, n.kst.sma4, n.kst.signalPeriod) : null,
    stochRsi: n.stochRsi?.enabled ? _i(h, n.stochRsi.rsiPeriod, n.stochRsi.kPeriod, n.stochRsi.dPeriod) : null,
    bbPercent: n.bbPercent?.enabled ? Oi(h, n.bbPercent.period, n.bbPercent.stdDev) : null,
    bbWidth: n.bbWidth?.enabled ? Fi(h, n.bbWidth.period, n.bbWidth.stdDev) : null,
    histVol: n.histVol?.enabled ? Wi(h, n.histVol.period) : null,
    chaikinVol: n.chaikinVol?.enabled ? Bi(T, I, n.chaikinVol.emaPeriod, n.chaikinVol.rocPeriod) : null,
    stdDev: n.stdDev?.enabled ? Di(h, n.stdDev.period) : null,
    obv: n.obv?.enabled ? Ai(h, re) : null,
    cmf: n.cmf?.enabled ? Ei(T, I, h, re, n.cmf.period) : null,
    adl: n.adl?.enabled ? Ni(T, I, h, re) : null,
    forceIndex: n.forceIndex?.enabled ? Li(h, re, n.forceIndex.period) : null,
    eom: n.eom?.enabled ? Pi(T, I, re, n.eom.period) : null,
    volumeSma: n.volumeSma?.enabled ? Ri(re, n.volumeSma.period) : null,
    fibRetracement: n.fibRetracement?.enabled ? ji(T, I, n.fibRetracement.lookback) : null,
    camarillaPivots: n.camarillaPivots?.enabled ? Mi(Me, T, I, h) : null,
    woodiePivots: n.woodiePivots?.enabled ? Ti(Me, T, I, h) : null,
    correlation: n.correlation?.enabled ? Ii(h, re, n.correlation.period) : null,
    linearReg: n.linearReg?.enabled ? Ci(h, n.linearReg.period, n.linearReg.deviations) : null,
    coppock: n.coppock?.enabled ? Si(h, n.coppock.longROC, n.coppock.shortROC, n.coppock.wmaPeriod) : null,
    alma: n.alma?.enabled ? wi(h, n.alma.period, n.alma.offset, n.alma.sigma) : null,
    kama: n.kama?.enabled ? ki(h, n.kama.period, n.kama.fastPeriod, n.kama.slowPeriod) : null,
    zlema: n.zlema?.enabled ? yi(h, n.zlema.period) : null,
    t3: n.t3?.enabled ? vi(h, n.t3.period, n.t3.vFactor) : null,
    lsma: n.lsma?.enabled ? gi(h, n.lsma.period) : null,
    mcginley: n.mcginley?.enabled ? bi(h, n.mcginley.period) : null,
    vortex: n.vortex?.enabled ? mi(T, I, h, n.vortex.period) : null,
    choppiness: n.choppiness?.enabled ? xi(T, I, h, n.choppiness.period) : null,
    elderRay: n.elderRay?.enabled ? pi(T, I, h, n.elderRay.period) : null,
    massIndex: n.massIndex?.enabled ? fi(T, I, n.massIndex.period) : null,
    chandeKroll: n.chandeKroll?.enabled ? hi(T, I, h, n.chandeKroll.p, n.chandeKroll.q, n.chandeKroll.x) : null,
    chandelierExit: n.chandelierExit?.enabled ? di(T, I, h, n.chandelierExit.period, n.chandelierExit.multiplier) : null,
    linRegSlope: n.linRegSlope?.enabled ? ui(h, n.linRegSlope.period) : null,
    priceChannel: n.priceChannel?.enabled ? ii(T, I, n.priceChannel.period) : null,
    alligator: n.alligator?.enabled ? ci(h) : null,
    accBands: n.accBands?.enabled ? ai(T, I, h, n.accBands.period) : null,
    ppo: n.ppo?.enabled ? ri(h, n.ppo.fast, n.ppo.slow, n.ppo.signal) : null,
    pvo: n.pvo?.enabled ? oi(re, n.pvo.fast, n.pvo.slow, n.pvo.signal) : null,
    cmo: n.cmo?.enabled ? li(h, n.cmo.period) : null,
    fisher: n.fisher?.enabled ? si(T, I, n.fisher.period) : null,
    stc: n.stc?.enabled ? ni(h, n.stc.fast, n.stc.slow, n.stc.cycle) : null,
    rviOsc: n.rviOsc?.enabled ? ti(se, T, I, h, n.rviOsc.period) : null,
    klinger: n.klinger?.enabled ? ei(T, I, h, re, n.klinger.fast, n.klinger.slow, n.klinger.signal) : null,
    connorsRsi: n.connorsRsi?.enabled ? Qc(h, n.connorsRsi.rsiPeriod, n.connorsRsi.streakPeriod, n.connorsRsi.rankPeriod) : null,
    apo: n.apo?.enabled ? Jc(h, n.apo.fast, n.apo.slow) : null,
    qstick: n.qstick?.enabled ? Zc(se, h, n.qstick.period) : null,
    bop: n.bop?.enabled ? Gc(se, T, I, h, n.bop.period) : null,
    psychLine: n.psychLine?.enabled ? qc(h, n.psychLine.period) : null,
    pfe: n.pfe?.enabled ? Uc(h, n.pfe.period, n.pfe.smoothing) : null,
    smi: n.smi?.enabled ? Kc(T, I, h, n.smi.period, n.smi.smoothK, n.smi.smoothD) : null,
    ulcerIndex: n.ulcerIndex?.enabled ? zc(h, n.ulcerIndex.period) : null,
    natr: n.natr?.enabled ? Yc(T, I, h, n.natr.period) : null,
    trueRange: n.trueRange?.enabled ? Xc(T, I, h) : null,
    squeeze: n.squeeze?.enabled ? Vc(T, I, h, n.squeeze.bbPeriod, n.squeeze.bbMult, n.squeeze.kcPeriod, n.squeeze.kcMult) : null,
    relVolIndex: n.relVolIndex?.enabled ? Hc(h, n.relVolIndex.period, n.relVolIndex.smoothing) : null,
    vhf: n.vhf?.enabled ? $c(h, n.vhf.period) : null,
    vwma: n.vwma?.enabled ? _c(h, re, n.vwma.period) : null,
    volumeOsc: n.volumeOsc?.enabled ? Oc(re, n.volumeOsc.fast, n.volumeOsc.slow) : null,
    nvi: n.nvi?.enabled ? Fc(h, re) : null,
    pvi: n.pvi?.enabled ? Wc(h, re) : null,
    pvt: n.pvt?.enabled ? Bc(h, re) : null,
    vroc: n.vroc?.enabled ? Dc(re, n.vroc.period) : null,
    netVolume: n.netVolume?.enabled ? Ac(h, re, n.netVolume.period) : null,
    twiggsMF: n.twiggsMF?.enabled ? Ec(T, I, h, re, n.twiggsMF.period) : null,
    linRegRSquared: n.linRegRSquared?.enabled ? Nc(h, n.linRegRSquared.period) : null,
    medianPrice: n.medianPrice?.enabled ? Lc(T, I) : null,
    typicalPrice: n.typicalPrice?.enabled ? Pc(T, I, h) : null,
    weightedClose: n.weightedClose?.enabled ? Rc(T, I, h) : null,
    demarkPivots: n.demarkPivots?.enabled ? jc(Me, T, I, se, h) : null,
    zigzag: n.zigzag?.enabled ? Mc(T, I, h, n.zigzag.deviation) : null,
    fractals: n.fractals?.enabled ? Tc(T, I) : null,
    gator: n.gator?.enabled ? Ic(h) : null,
    smmaOverlay: n.smmaOverlay?.enabled ? Dr(h, n.smmaOverlay.period) : null,
    wma: n.wma?.enabled ? Cc(h, n.wma.period) : null,
    customIndicators: (n.customIndicators || []).filter((ee) => ee.enabled).map((ee) => {
      if (typeof ee.expression == "string" && (ee.expression.startsWith("brue:") || ee.expression.startsWith("local:")) && Array.isArray(ee.data) && ee.data.length > 0)
        return ee;
      const $e = { closes: h, highs: T, lows: I, opens: se, volumes: re, timestamps: Me }, et = Sc(ee.expression, $e);
      return { ...ee, data: et.errors.length === 0 ? et.data : new Array(h.length).fill(NaN) };
    })
  };
}
function td(l, n) {
  if (n <= 0) return l;
  const h = new Array(n).fill(NaN), T = {};
  for (const I of Object.keys(l)) {
    const se = l[I];
    if (se == null) {
      T[I] = se;
      continue;
    }
    if (Array.isArray(se)) {
      se.length > 0 && typeof se[0] == "object" && se[0] !== null && "data" in se[0] ? T[I] = se.map((re) => ({ ...re, data: h.concat(re.data || []) })) : T[I] = h.concat(se);
      continue;
    }
    if (typeof se == "object") {
      const re = {};
      for (const Me of Object.keys(se)) {
        const r = se[Me];
        if (Array.isArray(r)) re[Me] = h.concat(r);
        else if (typeof r == "object" && r !== null) {
          const we = {};
          for (const ee of Object.keys(r)) {
            const $e = r[ee];
            we[ee] = Array.isArray($e) ? h.concat($e) : $e;
          }
          re[Me] = we;
        } else re[Me] = r;
      }
      T[I] = re;
      continue;
    }
    T[I] = se;
  }
  return T;
}
let Ql = null, nd = 0;
function Or() {
  return Ql || (Ql = new Worker(new URL(
    /* @vite-ignore */
    "/assets/indicatorWorker-DBDvDVhS.js",
    import.meta.url
  ), { type: "module" }), Ql);
}
function sd(l, n, h) {
  const [T, I] = o.useState(null), [se, re] = o.useState(!1), [Me, r] = o.useState(null), we = o.useRef(null), ee = o.useRef(null), $e = o.useRef(0), et = o.useRef(null), Be = o.useCallback((Fe) => {
    const { id: be, result: Ae, error: fe, durationMs: W } = Fe.data;
    if (!(et.current !== null && be !== et.current)) {
      if (et.current = null, re(!1), fe) {
        console.warn("[indicatorWorker] error", fe);
        return;
      }
      W !== void 0 && r(W), l.length > 0 && ($e.current = l[0].close), ee.current = Ae, I(Ae);
    }
  }, [l]);
  return o.useEffect(() => {
    const Fe = Or();
    return Fe.addEventListener("message", Be), () => Fe.removeEventListener("message", Be);
  }, [Be]), o.useEffect(() => {
    if (!n || l.length === 0) {
      I(null);
      return;
    }
    const Fe = l.length > 0 ? l[0].close : 0;
    if (h.current && ee.current && $e.current === Fe)
      return;
    const be = we.current;
    let Ae, fe, W, q, Ce, te, ae = null;
    const qe = be && be.candles !== l && l.length >= be.closes.length && l.length > 0 && be.closes.length > 0 && l[0].time === be.timestamps[0] && be.closes.length > 10;
    let ge = 0;
    const kt = !qe && be && be.candles !== l && l.length > be.closes.length && be.closes.length > 10 && l.length - be.closes.length > 0 && l[l.length - be.closes.length]?.time === be.timestamps[0];
    if (kt && (ge = l.length - be.closes.length), qe) {
      const Qe = be.closes.length, pt = Math.max(0, Qe - 1);
      Ae = be.closes, fe = be.highs, W = be.lows, q = be.opens, Ce = be.volumes, te = be.timestamps, Ae.length = pt, fe.length = pt, W.length = pt, q.length = pt, Ce.length = pt, te.length = pt;
      for (let Tt = pt; Tt < l.length; Tt++) {
        const Lt = l[Tt];
        Ae.push(Lt.close), fe.push(Lt.high), W.push(Lt.low), q.push(Lt.open), Ce.push(Lt.volume || 0), te.push(Lt.time);
      }
      ae = { closes: Ae, highs: fe, lows: W, opens: q, volumes: Ce, timestamps: te }, we.current = { candles: l, closes: Ae, highs: fe, lows: W, opens: q, volumes: Ce, timestamps: te };
      const nn = Object.values(n).filter((Tt) => Tt?.enabled).length;
      if (!(l.length > 3e3 && nn > 3)) {
        const Tt = performance.now(), Lt = Fr(ae, n), sn = performance.now() - Tt;
        r(sn), ee.current = Lt, $e.current = Fe, I(Lt);
        return;
      }
    } else if (kt && ee.current) {
      const Qe = new Array(ge), pt = new Array(ge), nn = new Array(ge), wn = new Array(ge), Tt = new Array(ge), Lt = new Array(ge);
      for (let zt = 0; zt < ge; zt++) {
        const cn = l[zt];
        Qe[zt] = cn.close, pt[zt] = cn.high, nn[zt] = cn.low, wn[zt] = cn.open, Tt[zt] = cn.volume || 0, Lt[zt] = cn.time;
      }
      Ae = Qe.concat(be.closes), fe = pt.concat(be.highs), W = nn.concat(be.lows), q = wn.concat(be.opens), Ce = Tt.concat(be.volumes), te = Lt.concat(be.timestamps);
      const sn = td(ee.current, ge);
      we.current = { candles: l, closes: Ae, highs: fe, lows: W, opens: q, volumes: Ce, timestamps: te }, ee.current = sn, $e.current = Fe, I(sn);
      return;
    } else
      Ae = l.map((Qe) => Qe.close), fe = l.map((Qe) => Qe.high), W = l.map((Qe) => Qe.low), q = l.map((Qe) => Qe.open), Ce = l.map((Qe) => Qe.volume || 0), te = l.map((Qe) => Qe.time), ae = { closes: Ae, highs: fe, lows: W, opens: q, volumes: Ce, timestamps: te }, we.current = { candles: l, closes: Ae, highs: fe, lows: W, opens: q, volumes: Ce, timestamps: te };
    ae || (ae = { closes: Ae, highs: fe, lows: W, opens: q, volumes: Ce, timestamps: te });
    const wt = Object.values(n).filter((Qe) => Qe?.enabled).length;
    if (!(l.length > 1e3 || wt > 5 || (n.customIndicators?.filter((Qe) => Qe.enabled)?.length || 0) > 0)) {
      const Qe = performance.now(), pt = Fr(ae, n), nn = performance.now() - Qe;
      r(nn), ee.current = pt, $e.current = Fe, I(pt);
      return;
    }
    re(!0);
    const Yt = Or(), Zt = ++nd;
    et.current = Zt, Yt.postMessage({ id: Zt, price: ae, indicators: n });
  }, [l, n, h]), { indicatorData: T, isComputing: se, computeDurationMs: Me };
}
function fl(l) {
  const {
    ctx: n,
    candles: h,
    startIndex: T,
    indexToX: I,
    priceToY: se,
    morphAt: re,
    candleBodyWidth: Me,
    wickWidth: r,
    colors: we
  } = l, ee = new Path2D(), $e = new Path2D(), et = Me / 2, Be = h.length, Fe = new Float64Array(Be), be = new Float64Array(Be), Ae = new Float64Array(Be), fe = new Float64Array(Be), W = new Float64Array(Be), q = new Float64Array(Be), Ce = new Float64Array(Be), te = new Float64Array(Be);
  let ae = 0, qe = 0;
  for (let ge = 0; ge < h.length; ge++) {
    const kt = re(ge, h[ge]), wt = I(T + ge, T), ze = se(kt.open), Yt = se(kt.close), Zt = se(kt.high), Qe = se(kt.low), pt = Math.min(ze, Yt), nn = Math.max(1, Math.abs(Yt - ze));
    kt.close >= kt.open ? (ee.moveTo(wt, Zt), ee.lineTo(wt, Qe), Fe[ae] = wt - et, be[ae] = pt, Ae[ae] = Me, fe[ae] = nn, ae++) : ($e.moveTo(wt, Zt), $e.lineTo(wt, Qe), W[qe] = wt - et, q[qe] = pt, Ce[qe] = Me, te[qe] = nn, qe++);
  }
  if (n.lineWidth = r, n.lineCap = "round", ae) {
    n.strokeStyle = we.bullishWick, n.stroke(ee), n.fillStyle = we.bullish;
    for (let ge = 0; ge < ae; ge++)
      n.fillRect(Fe[ge], be[ge], Ae[ge], fe[ge]);
  }
  if (qe) {
    n.strokeStyle = we.bearishWick, n.stroke($e), n.fillStyle = we.bearish;
    for (let ge = 0; ge < qe; ge++)
      n.fillRect(W[ge], q[ge], Ce[ge], te[ge]);
  }
  if (n.lineCap = "butt", n.lineWidth = 1, ae) {
    n.strokeStyle = we.bullishBorder;
    for (let ge = 0; ge < ae; ge++)
      n.strokeRect(Fe[ge], be[ge], Ae[ge], fe[ge]);
  }
  if (qe) {
    n.strokeStyle = we.bearishBorder;
    for (let ge = 0; ge < qe; ge++)
      n.strokeRect(W[ge], q[ge], Ce[ge], te[ge]);
  }
}
const ld = (l) => {
  const n = (l || "").toUpperCase();
  if (n.includes("XAU") || n.includes("XAG")) return 0.8;
  if (n.includes("NAS100") || n.includes("SPX500") || n.includes("US30") || n.includes("US2000")) return 1.5;
  if (n.includes("BCO") || n.includes("WTICO")) return 0.05;
  if (n.includes("BTC")) return 4;
  if (n.includes("ETH")) return 2;
  if (n.includes("JPY")) return 1e-3;
  const h = n.replace("/", "");
  return h.length === 6 && /EUR|GBP|AUD|NZD|CAD|CHF|USD/.test(h) ? 1e-5 : 0.04;
}, od = (l, n) => ld(l), qo = ({
  candles: l,
  livePrice: n,
  symbol: h = "",
  timezone: T = "UTC",
  countdown: I,
  onCrosshairMove: se,
  syncedCrosshairTime: re,
  colors: Me,
  indicators: r,
  onIndicatorsChange: we,
  onRemoveBruePlot: ee,
  onRemoveEngineIndicator: $e,
  onEditEngineIndicator: et,
  onConverterReady: Be,
  onVisibleRangeChange: Fe,
  onViewportTimeChange: be,
  syncedViewportTime: Ae,
  disableAutoFollow: fe = !1,
  scrollToIndex: W,
  chartType: q = "candlestick",
  onScrollingChange: Ce,
  onScrollSync: te,
  scrollOffsetRef: ae,
  optionsPdfEnabled: qe = !1,
  heatmapEnabled: ge = !1,
  externalDimensions: kt,
  economicEvents: wt,
  positionLines: ze,
  onPositionModify: Yt,
  onPositionClose: Zt,
  autoSelectPositionId: Qe,
  l2DepthData: pt,
  onOpenSettings: nn,
  onOpenCustomEditor: wn,
  showBidAskSpread: Tt = !1,
  brokerBid: Lt = null,
  brokerAsk: sn = null,
  showSessions: zt = !1,
  timeframe: cn = "5m",
  rightOffset: Xn,
  onLoadMore: As,
  isLoadingMore: wl = !1,
  prependShift: ks = 0,
  drawings: ss,
  selectedDrawingId: ws,
  drawingCursorRef: Ss,
  requestRedrawRef: Ks,
  isDrawingDragging: Sl = !1
}) => {
  const st = o.useRef(null), Cl = o.useRef(null), Ge = o.useRef(null), Ds = o.useRef(null), Us = o.useRef(!1), qs = o.useRef(null);
  o.useRef(null);
  const Il = o.useRef(l), Tl = o.useRef(re ?? null), Bs = o.useRef(!1), Gs = o.useRef(null), Sn = typeof window < "u" ? Math.min(window.devicePixelRatio || 1, 2) : 1, [xe, Zs] = o.useState({ width: 300, height: 300 }), [ie, Nt] = o.useState({
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
  }), Le = o.useRef({
    startIndex: 0,
    candleWidth: 3
  }), Yn = o.useRef({
    startIndex: 0,
    candleWidth: 3
  }), Mt = o.useRef(!1), un = o.useRef(!1), Ne = o.useRef(null), ct = o.useRef(null), rt = o.useRef(null), at = o.useRef(null), Fn = o.useRef(null), zn = o.useRef(0), [, ln] = o.useState(0), ls = o.useRef(null), Kn = (a) => {
    const p = Ne.current, m = ls.current;
    if (p && m && m.posId === p) return m.offset;
    const v = on.current, f = v && v.range > 0 ? v.range * 0.18 : a * 5e-3;
    return ls.current = p && f > 0 ? { posId: p, offset: f } : null, f;
  }, Js = o.useRef(null);
  o.useEffect(() => {
    if (Qe && Qe !== Js.current && ze) {
      const a = ze.find((p) => p.id === Qe);
      a && (Js.current = Qe, Ne.current = a.id, ct.current = a.stopLoss ?? null, rt.current = a.takeProfit ?? null, ln((p) => p + 1));
    }
  }, [Qe, ze]);
  const os = o.useRef(0), Wt = o.useCallback((a) => {
    Mt.current = a, un.current !== a && (un.current = a, Ce?.(a), a || (os.current = Le.current.startIndex, ae && (ae.current = 0)));
  }, [Ce, ae]), St = o.useCallback(() => {
    if (ae) {
      const a = Le.current.startIndex, p = Le.current.candleWidth * (1 + Ve), m = a - os.current;
      ae.current = m * p;
    }
    te?.();
  }, [te, ae]), Un = o.useRef(St);
  Un.current = St;
  const Cn = o.useRef(null), On = o.useRef(null), qn = o.useRef(null), Ws = o.useRef(!1), tt = o.useCallback((a = !1) => {
    if (qn.current !== null) {
      a || (Ws.current = !1);
      return;
    }
    Ws.current = a, qn.current = requestAnimationFrame(() => {
      qn.current = null;
      const p = Ws.current;
      Cn.current && Cn.current(p);
    });
  }, []);
  o.useCallback((a = !1) => {
    qn.current !== null && (cancelAnimationFrame(qn.current), qn.current = null), Cn.current && Cn.current(a);
  }, []);
  const Gn = o.useRef(null), rs = o.useRef(0), Ml = o.useRef(0), In = o.useRef(!1), Qs = o.useRef(0), Tn = o.useRef(null), Cs = o.useRef(void 0), _n = o.useRef(null), Jt = o.useRef("standard"), [Mn, as] = o.useState([]), dt = o.useRef(null), dn = o.useRef(null), Is = o.useRef([]), Ts = o.useRef(null), pn = o.useRef(null), [jn, cs] = o.useState(!1), [xn, jl] = o.useState({ x: 0, y: 0, startIndex: 0, priceOffset: 0 }), [Rl, Pl] = o.useState(0), [ro, Ll] = o.useState(1), ht = o.useRef(null), Ct = o.useRef(null), Rn = o.useRef(0), el = o.useRef(null), lt = o.useRef(null), [Pn, is] = o.useState(!1), us = o.useRef(null), Fs = o.useRef(0), Os = o.useRef(0), Ln = o.useRef(!1);
  o.useRef(0), o.useRef(0);
  const mn = o.useRef(null), $n = o.useRef(null), bn = o.useRef(null), ao = o.useRef(null), y = "ns-resize", ce = "ns-resize";
  o.useRef(12), o.useRef(0), o.useRef(0);
  const [G, ke] = o.useState(0.15), [bt, Ee] = o.useState(!1), Et = o.useRef({ y: 0, ratio: 0 });
  o.useRef(null);
  const [Ht, De] = o.useState(1), [xt, ds] = o.useState(0), [Kt, jt] = o.useState(null), [At, Qr] = o.useState(null), [Jo, co] = o.useState(!1), [Qo, ea] = o.useState(!1), tl = o.useRef({ y: 0, scale: 1, offset: 0 }), hs = Kt !== null, gn = o.useRef(1), Zn = o.useRef(0), Jn = o.useRef(null), on = o.useRef(null), rn = o.useRef(0), Ms = o.useRef(null), [Qn, ta] = mu("preferences.chartShowOHLC", !0), [er, na] = o.useState(0), [nl, tr] = o.useState(!1), [rh, sa] = o.useState(0), io = o.useRef(null), uo = o.useRef(!1);
  o.useEffect(() => {
    if (!nl) return;
    const a = setInterval(() => sa((p) => p + 1), 3e4);
    return () => clearInterval(a);
  }, [nl]), o.useEffect(() => {
    wt && wt.length > 0 && bu(wt.map((a) => a.region_code));
  }, [wt]), o.useEffect(() => {
    if (!nl) return;
    const a = (p) => {
      io.current && !io.current.contains(p.target) && tr(!1);
    };
    return document.addEventListener("mousedown", a), () => document.removeEventListener("mousedown", a);
  }, [nl]);
  const [ho, la] = o.useState(0), [fo, oa] = o.useState(0), [po, ra] = o.useState(0), [xo, aa] = o.useState(0), [mo, ca] = o.useState(0), _s = o.useRef({}), [ot, ia] = o.useState({}), Hn = o.useRef({}), [nr, ua] = o.useState({}), [sr, bo] = o.useState(null), [sl, $s] = o.useState(null), Qt = o.useRef({});
  o.useRef(null);
  const lr = o.useRef(!1), en = o.useRef(!1), mt = o.useRef(null), [da, ye] = o.useState(null), [It, pe] = o.useState(null), [Nn, gt] = o.useState(null), or = typeof navigator < "u" && /Mac|iPhone|iPad|iPod/.test(navigator.platform), [ll, ha] = o.useState(or ? 8 : 2), go = o.useRef(or), ol = lo(), vo = o.useRef(ol);
  vo.current = ol, o.useEffect(() => {
    ol.chart?.scrollSensitivity !== void 0 && ha(ol.chart.scrollSensitivity);
  }, [ol.chart?.scrollSensitivity]);
  const ne = { ...oo(), ...Me }, rr = typeof document < "u" && document.documentElement.classList.contains("dark");
  o.useEffect(() => {
    Mt.current || (Le.current = {
      startIndex: ie.startIndex,
      candleWidth: ie.candleWidth
    });
  }, [ie.startIndex, ie.candleWidth]), o.useEffect(() => {
    gn.current = Ht, Zn.current = xt;
  }, [Ht, xt]), o.useEffect(() => {
    if (!ie.autoFollowLatest) return;
    const a = setInterval(() => {
      Pl((p) => (p + 0.1) % (Math.PI * 2)), Ll(0.85 + Math.sin(Date.now() / 1e3) * 0.15);
    }, 150);
    return () => clearInterval(a);
  }, [ie.autoFollowLatest]), o.useEffect(() => {
    Il.current = l;
    const a = l[l.length - 1];
    a && (qs.current = {
      time: a.time,
      open: a.open,
      high: a.high,
      low: a.low,
      close: a.close
    }, ie.autoFollowLatest && Cn.current && Cn.current(!0));
  }, [l, ie.autoFollowLatest]), o.useEffect(() => {
    const p = ((f) => {
      const e = f.toUpperCase().replace("_", "").replace("/", ""), O = [
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
      for (const H of O)
        if (e === H || e.startsWith(H)) return { ticker: H, etfDragPerYear: 0 };
      return e.includes("XAU") || e.includes("GOLD") ? { ticker: "GLD", etfDragPerYear: 4e-3 } : e.includes("SPX500") || e.includes("SPX") ? { ticker: "SPY", etfDragPerYear: 0 } : e.includes("NAS100") || e.includes("NDX") ? { ticker: "QQQ", etfDragPerYear: 0 } : e.includes("US30") || e.includes("DJI") ? { ticker: "DIA", etfDragPerYear: 0 } : null;
    })(h);
    if (!p || !qe) {
      bo(null);
      return;
    }
    const m = async () => {
      try {
        const f = [];
        if (!f || f.length === 0) {
          bo(null);
          return;
        }
        const e = f[0], O = l[l.length - 1]?.close || parseFloat(e.current_price), H = parseFloat(e.current_price), K = H > 0 ? O / H : 1;
        let _ = 0;
        if (e.expiration) {
          const X = new Date(e.expiration).getTime();
          Number.isNaN(X) || (_ = Math.max(0, (X - Date.now()) / (365 * 24 * 3600 * 1e3)));
        }
        const b = Math.exp(p.etfDragPerYear * _), w = K * b;
        let A = [];
        e.density_curve && Array.isArray(e.density_curve) && (A = e.density_curve.map((X) => ({
          p: X.p * w,
          d: X.d
        }))), bo({
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
    m();
    const v = setInterval(m, 6e4);
    return () => clearInterval(v);
  }, [h, qe]), o.useEffect(() => {
    if (!ge || !h) {
      as([]);
      return;
    }
    const a = async () => {
      try {
        const m = h.includes("/") ? h : h.length === 6 ? `${h.substring(0, 3)}/${h.substring(3)}` : h, v = await $u("l2_heatmap_snapshots", {
          params: { symbol: `eq.${m}`, order: "timestamp.desc", limit: "300" }
        });
        v && v.length > 0 && as(v.reverse());
      } catch (m) {
        console.error("Failed to fetch heatmap data:", m);
      }
    };
    a();
    const p = setInterval(a, 5e3);
    return () => clearInterval(p);
  }, [h, ge]), o.useEffect(() => () => {
    ht.current !== null && cancelAnimationFrame(ht.current), dn.current !== null && cancelAnimationFrame(dn.current), mn.current !== null && cancelAnimationFrame(mn.current), $n.current !== null && cancelAnimationFrame($n.current), bn.current !== null && cancelAnimationFrame(bn.current), Ct.current !== null && clearTimeout(Ct.current), Jn.current !== null && clearTimeout(Jn.current);
  }, []);
  const { isPhone: fa, isDesktop: Nl } = gu(xe.width), He = o.useMemo(() => vu(xe.width), [xe.width]), ar = fa, cr = n || (l.length > 0 ? l[l.length - 1]?.close : 100), Xe = o.useMemo(() => yu(ar, h, cr || 100, Xn), [ar, Nl, h, cr, Xn]), vt = He.timeAxisHeight, El = He.priceLabelFont, ir = He.timeLabelFont, Vt = He.subplotLabelFont, Al = 1, Dl = 50, fs = o.useMemo(() => {
    const a = [], m = Math.pow(Dl / Al, 0.025);
    for (let v = 0; v <= 40; v++)
      a.push(Al * Math.pow(m, v));
    return a;
  }, []), En = o.useCallback((a = !1) => {
    const p = xe.width - Xe, m = a && Mt.current ? Le.current : ie, v = m.candleWidth * (1 + Ve), f = Math.floor(p / v), e = Math.max(0, Math.floor(m.startIndex)), O = Math.min(l.length, e + f);
    return {
      candles: l.slice(e, O),
      startIndex: e,
      endIndex: O,
      visibleCount: f,
      totalWithFuture: f + ie.futureSpace,
      candleWidth: m.candleWidth
    };
  }, [l, xe.width, ie]);
  o.useEffect(() => {
    if (l.length > 0) {
      const a = xe.width - Xe, p = ie.candleWidth * (1 + Ve), m = Math.floor(a / p), v = Math.max(0, Math.floor(ie.startIndex)), f = Math.min(l.length, v + m);
      Fe && Fe({ startIndex: v, endIndex: f, totalCandles: l.length }), As && v < 2500 && !wl && !Ln.current && !ie.autoFollowLatest && (Tn.current && clearTimeout(Tn.current), Tn.current = setTimeout(() => {
        Ln.current || As();
      }, 100));
    }
  }, [Fe, As, wl, l.length, ie.startIndex, ie.candleWidth, xe.width, ie.autoFollowLatest]), o.useEffect(() => {
    if (!be || l.length === 0) return;
    if (Bs.current) {
      Bs.current = !1;
      return;
    }
    const a = xe.width - Xe, p = ie.candleWidth * (1 + Ve), m = Math.floor(a / p), v = Math.max(0, Math.floor(ie.startIndex)), f = Math.min(l.length, v + m), e = l.slice(v, f);
    if (e.length === 0) return;
    const O = Math.floor(e.length / 2), H = e[O];
    H && H.time !== Gs.current && (Gs.current = H.time, be(H.time));
  }, [be, l, ie.startIndex, ie.candleWidth, xe.width]), o.useEffect(() => {
    if (!Ae || l.length === 0 || Ae === Gs.current) return;
    let a = -1, p = 1 / 0;
    for (let A = 0; A < l.length; A++) {
      const X = Math.abs(l[A].time - Ae);
      X < p && (p = X, a = A);
    }
    if (a === -1) return;
    const m = xe.width - Xe, v = ie.candleWidth * (1 + Ve), f = Math.floor(m / v), e = Math.max(0, Math.floor(ie.startIndex)), O = Math.min(l.length, e + f), H = Math.floor(f / 2), K = Math.max(0, a - H), _ = a >= e && a < O, b = e + Math.floor(f / 2);
    (!_ || Math.abs(a - b) > H / 2) && (Bs.current = !0, Nt((A) => ({
      ...A,
      startIndex: K,
      autoFollowLatest: !1
    })), Le.current.startIndex = K);
  }, [Ae, l, xe.width, ie.candleWidth, ie.startIndex]);
  const js = o.useCallback((a, p = !0) => {
    if (Kt !== null && At !== null) {
      const K = gn.current, _ = Zn.current, b = At / K, w = Kt + _;
      return {
        min: w - b / 2,
        max: w + b / 2,
        range: b
      };
    }
    if (a.length === 0)
      return { min: 0, max: 100, range: 100 };
    let m = 1 / 0, v = -1 / 0;
    for (const K of a)
      K.low < m && (m = K.low), K.high > v && (v = K.high);
    p && n && (n < m && (m = n), n > v && (v = n));
    const f = v - m, e = f * 0.05, O = (v + m) / 2, H = f + e * 2;
    return {
      min: O - H / 2,
      max: O + H / 2,
      range: H
    };
  }, [n, Kt, At]), it = o.useCallback((a, p) => {
    const v = [
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
    ].filter((H) => r?.[H]?.enabled).length, f = xe.height - vt, e = v > 0 ? Math.max(60 * v, f * G) : 0, O = f - e;
    return O - (a - p.min) / p.range * O;
  }, [xe.height, r, l, G]), ur = o.useCallback((a, p) => {
    const v = [
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
    ].filter((H) => r?.[H]?.enabled).length, f = xe.height - vt, e = v > 0 ? Math.max(60 * v, f * G) : 0, O = f - e;
    return p.max - a / O * p.range;
  }, [xe.height, r, l, G]), dr = o.useCallback((a, p) => {
    const m = ie.candleWidth * (1 + Ve);
    return (a - p) * m + m / 2;
  }, [ie.candleWidth]), rl = o.useCallback((a, p) => {
    const m = ie.candleWidth * (1 + Ve);
    return Math.floor(a / m) + p;
  }, [ie.candleWidth]), An = o.useCallback((a) => ku(a, h), [h]), Rs = o.useCallback((a) => {
    const p = new Date(a);
    if (T === "local") {
      const m = p.getHours().toString().padStart(2, "0"), v = p.getMinutes().toString().padStart(2, "0");
      return `${m}:${v}`;
    } else if (T === "UTC") {
      const m = p.getUTCHours().toString().padStart(2, "0"), v = p.getUTCMinutes().toString().padStart(2, "0");
      return `${m}:${v}`;
    } else
      try {
        return p.toLocaleTimeString("en-GB", {
          timeZone: T,
          hour: "2-digit",
          minute: "2-digit",
          hour12: !1
        });
      } catch {
        const m = p.getUTCHours().toString().padStart(2, "0"), v = p.getUTCMinutes().toString().padStart(2, "0");
        return `${m}:${v}`;
      }
  }, [T]), es = o.useCallback((a, p = !1) => {
    const m = new Date(a);
    if (T === "local") {
      const v = m.getDate(), f = m.toLocaleString("en", { month: "short" }), e = String(m.getFullYear()).slice(-2);
      return p ? `${v} ${f} '${e}` : `${v} ${f}`;
    } else if (T === "UTC") {
      const v = m.getUTCDate(), f = m.toLocaleString("en", { month: "short", timeZone: "UTC" }), e = String(m.getUTCFullYear()).slice(-2);
      return p ? `${v} ${f} '${e}` : `${v} ${f}`;
    } else
      try {
        const v = m.toLocaleDateString("en-GB", { timeZone: T, day: "numeric" }), f = m.toLocaleDateString("en-GB", { timeZone: T, month: "short" }), e = m.toLocaleDateString("en-GB", { timeZone: T, year: "2-digit" });
        return p ? `${v} ${f} '${e}` : `${v} ${f}`;
      } catch {
        const v = m.getUTCDate(), f = m.toLocaleString("en", { month: "short", timeZone: "UTC" }), e = String(m.getUTCFullYear()).slice(-2);
        return p ? `${v} ${f} '${e}` : `${v} ${f}`;
      }
  }, [T]), hr = o.useCallback((a) => {
    const p = new Date(a), m = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    if (T === "local") return m[p.getDay()];
    if (T === "UTC") return m[p.getUTCDay()];
    try {
      return p.toLocaleDateString("en-GB", { timeZone: T, weekday: "short" });
    } catch {
      return m[p.getUTCDay()];
    }
  }, [T]), pa = (a, p) => {
    const m = a / p, v = Math.pow(10, Math.floor(Math.log10(m))), f = m / v;
    let e;
    return f <= 1 ? e = 1 : f <= 2 ? e = 2 : f <= 5 ? e = 5 : e = 10, e * v;
  };
  o.useRef(null);
  const { indicatorData: s } = sd(l, r, Mt), ps = o.useCallback((a = !1) => {
    const p = Cl.current;
    if (!p) return;
    const { width: m, height: v } = xe;
    Ds.current || (Ds.current = document.createElement("canvas"));
    const f = Ds.current;
    (f.width !== p.width || f.height !== p.height) && (f.width = p.width, f.height = p.height);
    const e = f.getContext("2d");
    if (!e) return;
    const O = !1;
    e.setTransform(Sn, 0, 0, Sn, 0, 0);
    const H = !!s?.rsi, K = !!s?.macd, _ = !!s?.atr, b = !!s?.stochastic, w = r?.volume?.enabled && l.some((D) => D.volume !== void 0 && D.volume > 0), A = !!s?.williamsR, X = !!s?.cci, u = !!s?.adx, L = !!s?.roc, x = !!s?.aroon, V = !!s?.momentum, d = !!s?.ao, j = !!s?.mfi, ue = !!s?.tsi, We = !!s?.trix, Q = !!s?.ultimateOsc, Oe = !!s?.dpo, Z = !!s?.kst, je = !!s?.stochRsi, Ke = !!s?.bbPercent, _e = !!s?.bbWidth, de = !!s?.histVol, Re = !!s?.chaikinVol, Je = !!s?.stdDev, Ye = !!s?.obv, Ot = !!s?.cmf, vn = !!s?.adl, Ut = !!s?.forceIndex, _l = !!s?.eom, Rt = !!s?.correlation, bs = !!s?.coppock, cl = !!s?.vortex, $l = !!s?.choppiness, To = !!s?.elderRay, Mo = !!s?.massIndex, jo = !!s?.linRegSlope, Aa = !!s?.ppo, Da = !!s?.pvo, Ba = !!s?.cmo, Wa = !!s?.fisher, Fa = !!s?.stc, Oa = !!s?.rviOsc, _a = !!s?.klinger, $a = !!s?.connorsRsi, Ha = !!s?.apo, Va = !!s?.qstick, Xa = !!s?.bop, Ya = !!s?.psychLine, za = !!s?.pfe, Ka = !!s?.smi, Ua = !!s?.ulcerIndex, qa = !!s?.natr, Ga = !!s?.trueRange, Za = !!s?.squeeze, Ja = !!s?.relVolIndex, Qa = !!s?.vhf, ec = !!s?.volumeOsc, tc = !!s?.nvi, nc = !!s?.pvi, sc = !!s?.pvt, lc = !!s?.vroc, oc = !!s?.netVolume, rc = !!s?.twiggsMF, ac = !!s?.linRegRSquared, cc = !!s?.gator, Hl = [
      H,
      K,
      _,
      b,
      A,
      X,
      u,
      L,
      x,
      V,
      d,
      j,
      ue,
      We,
      Q,
      Oe,
      Z,
      je,
      Ke,
      _e,
      de,
      Re,
      Je,
      Ye,
      Ot,
      vn,
      Ut,
      _l,
      Rt,
      bs,
      // Phase 2
      cl,
      $l,
      To,
      Mo,
      jo,
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
      ec,
      tc,
      nc,
      sc,
      lc,
      oc,
      rc,
      ac,
      cc
    ].filter(Boolean).length + (s?.customIndicators?.filter((D) => D.display === "subplot").length || 0), kr = v - vt, wr = Hl > 0 ? Math.max(60 * Hl, kr * G) : 0, ts = Hl > 0 ? wr / Hl : 0, Pe = kr - wr, U = m - Xe;
    e.fillStyle = ne.background, e.fillRect(0, 0, m, v);
    const c = En(!0), hn = Mt.current ? Le.current.candleWidth : ie.candleWidth, Ze = js(c.candles, ie.autoFollowLatest);
    on.current = Ze, rn.current = Pe;
    const Sr = Mt.current ? Le.current.startIndex : ie.startIndex, ic = (Sr - c.startIndex) * (hn * (1 + Ve)), ve = (D, i) => {
      const M = hn * (1 + Ve);
      return (D - i) * M + M / 2 - ic;
    }, nt = (D) => {
      const i = (D - Ze.min) / Ze.range;
      return Pe - i * Pe;
    }, Vl = (ne.gridOpacity ?? 100) / 100;
    e.globalAlpha = Vl, e.strokeStyle = ne.grid, e.lineWidth = 0.5, e.setLineDash([]);
    const uc = vo.current?.chart?.gridHorizontalLines, dc = vo.current?.chart?.gridVerticalLines, hc = Nl ? uc ?? He.priceTargetLabels : He.priceTargetLabels, Xl = pa(Ze.range, hc), Cr = Math.ceil(Ze.min / Xl) * Xl, fc = c.startIndex + c.candles.length - 1, pc = ve(l.length - 1, c.startIndex) <= U ? U : Math.max(0, Math.min(U, ve(fc, c.startIndex) + hn / 2)), Ir = 25;
    e.beginPath();
    let Tr = -1 / 0;
    for (let D = Cr; D <= Ze.max; D += Xl) {
      const i = nt(D);
      Math.abs(i - Tr) < Ir || (Tr = i, e.moveTo(0, i), e.lineTo(pc, i));
    }
    e.stroke(), e.setLineDash([]), e.globalAlpha = 1;
    const Mr = hn * (1 + Ve), Ro = Math.ceil(U / Mr), Po = c.startIndex + Ro, xc = Nl ? dc ?? He.targetLinesOnScreen : He.targetLinesOnScreen, mc = Math.max(1, Math.round(Ro / xc)), Hs = Math.max(1, mc), jr = Hs / 2, bc = Ro / Hs, Rr = Math.max(0, Math.min(
      1,
      (bc - 8) / 6
    )), Pr = Hs / 2, Lr = He.tertiaryGridVisible ? Math.max(0, Math.min(
      0.5,
      (3 - Mr) / 1.5
    )) : 0;
    e.globalAlpha = Vl, e.strokeStyle = ne.grid, e.beginPath();
    const Lo = c.startIndex;
    for (let D = Lo; D <= Po; D += Hs) {
      const i = ve(D, c.startIndex);
      if (i >= 0 && i <= U && (e.moveTo(i, 0), e.lineTo(i, Pe)), i > U) break;
    }
    if (e.stroke(), Rr > 0.01 && jr >= 1) {
      e.globalAlpha = Rr * Vl, e.strokeStyle = ne.grid, e.beginPath();
      const D = c.startIndex;
      for (let i = D; i <= Po; i += jr) {
        if ((i - Lo) % Hs === 0) continue;
        const M = ve(i, c.startIndex);
        if (M >= 0 && M <= U && (e.moveTo(M, 0), e.lineTo(M, Pe)), M > U) break;
      }
      e.stroke(), e.globalAlpha = 1;
    }
    if (Lr > 0.01 && Pr >= 1) {
      e.globalAlpha = Lr * Vl, e.strokeStyle = ne.grid, e.beginPath();
      const D = c.startIndex;
      for (let i = D; i <= Po; i += Pr) {
        if ((i - Lo) % Hs === 0) continue;
        const M = ve(i, c.startIndex);
        if (M >= 0 && M <= U && (e.moveTo(M, 0), e.lineTo(M, Pe)), M > U) break;
      }
      e.stroke(), e.globalAlpha = 1;
    }
    e.globalAlpha = 1, e.strokeStyle = ne.axisLine || ne.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(U, 0), e.lineTo(U, v), e.stroke(), e.save(), e.beginPath(), e.rect(0, 0, U, Pe), e.clip();
    const No = {
      ctx: e,
      chartWidth: U,
      mainChartHeight: Pe,
      candles: l,
      visible: c,
      indexToX: ve,
      mainPriceToY: nt,
      currentCandleWidth: hn
    };
    if (qe && sr && wu(No, sr), ge && Mn.length > 0 && Su(No, Mn), pt && (pt.bids.length > 0 || pt.asks.length > 0) && Cu(No, pt), zt) {
      const D = {
        ctx: e,
        chartWidth: U,
        mainChartHeight: Pe,
        candles: l,
        visibleStartIndex: c.startIndex,
        visibleEndIndex: c.startIndex + c.candles.length,
        candleWidth: hn,
        indexToX: ve,
        isDark: rr,
        timeframe: cn
      };
      Iu(D);
    }
    const Dn = Math.max(hn * 0.7, 3), il = Math.max(1, Dn * 0.15), Eo = qs.current, gc = l.length - 1, Ps = (D, i) => Eo && c.startIndex + D === gc && Eo.time === i.time ? Eo : i;
    if (q === "candlestick")
      fl({
        ctx: e,
        candles: c.candles,
        startIndex: c.startIndex,
        indexToX: ve,
        priceToY: nt,
        morphAt: Ps,
        candleBodyWidth: Dn,
        wickWidth: il,
        colors: {
          bullish: ne.bullish,
          bearish: ne.bearish,
          bullishWick: ne.bullishWick,
          bearishWick: ne.bearishWick,
          bullishBorder: ne.bullishBorder,
          bearishBorder: ne.bearishBorder
        }
      });
    else if (q === "line")
      e.strokeStyle = ne.bullish, e.lineWidth = 2, e.beginPath(), c.candles.forEach((D, i) => {
        const M = ve(c.startIndex + i, c.startIndex), g = nt(Ps(i, D).close);
        i === 0 ? e.moveTo(M, g) : e.lineTo(M, g);
      }), e.stroke();
    else if (q === "area") {
      const D = e.createLinearGradient(0, 0, 0, Pe);
      if (D.addColorStop(0, "rgba(34, 197, 94, 0.4)"), D.addColorStop(1, "rgba(34, 197, 94, 0.02)"), e.beginPath(), c.candles.forEach((i, M) => {
        const g = ve(c.startIndex + M, c.startIndex), C = nt(Ps(M, i).close);
        M === 0 ? e.moveTo(g, C) : e.lineTo(g, C);
      }), c.candles.length > 0) {
        const i = ve(c.startIndex + c.candles.length - 1, c.startIndex), M = ve(c.startIndex, c.startIndex);
        e.lineTo(i, Pe), e.lineTo(M, Pe), e.closePath(), e.fillStyle = D, e.fill();
      }
      e.strokeStyle = ne.bullish, e.lineWidth = 2, e.beginPath(), c.candles.forEach((i, M) => {
        const g = ve(c.startIndex + M, c.startIndex), C = nt(Ps(M, i).close);
        M === 0 ? e.moveTo(g, C) : e.lineTo(g, C);
      }), e.stroke();
    } else if (q === "heikin_ashi") {
      let D = c.candles[0]?.open || 0, i = c.candles[0]?.close || 0;
      const M = c.candles.map((g, C) => {
        const k = (g.open + g.high + g.low + g.close) / 4, N = C === 0 ? (g.open + g.close) / 2 : (D + i) / 2, B = Math.max(g.high, N, k), F = Math.min(g.low, N, k), E = { time: g.time, open: N, high: B, low: F, close: k, volume: g.volume };
        return D = N, i = k, E;
      });
      fl({
        ctx: e,
        candles: M,
        startIndex: c.startIndex,
        indexToX: ve,
        priceToY: nt,
        morphAt: (g, C) => M[g],
        candleBodyWidth: Dn,
        wickWidth: il,
        colors: {
          bullish: ne.bullish,
          bearish: ne.bearish,
          bullishWick: ne.bullishWick,
          bearishWick: ne.bearishWick,
          bullishBorder: ne.bullishBorder,
          bearishBorder: ne.bearishBorder
        }
      });
    } else if (q === "tpo") {
      const i = /* @__PURE__ */ new Map();
      c.candles.forEach((g) => {
        const C = Math.floor(g.time / 18e5) * 18e5, k = i.get(C);
        k ? (k.high = Math.max(k.high, g.high), k.low = Math.min(k.low, g.low), k.count++) : i.set(C, { high: g.high, low: g.low, count: 1 });
      });
      let M = 0;
      i.forEach((g) => {
        const C = ve(c.startIndex + M, c.startIndex), k = nt(g.high), N = nt(g.low);
        e.fillStyle = "#21b3a4", e.globalAlpha = 0.25, e.fillRect(C - Dn / 2, k, Dn, Math.max(2, N - k)), e.globalAlpha = 1, M++;
      }), e.globalAlpha = 0.3, fl({
        ctx: e,
        candles: c.candles,
        startIndex: c.startIndex,
        indexToX: ve,
        priceToY: nt,
        morphAt: Ps,
        candleBodyWidth: Dn,
        wickWidth: il,
        colors: {
          bullish: ne.bullish,
          bearish: ne.bearish,
          bullishWick: ne.bullishWick,
          bearishWick: ne.bearishWick,
          bullishBorder: ne.bullishBorder,
          bearishBorder: ne.bearishBorder
        }
      }), e.globalAlpha = 1;
    } else if (q === "footprint_cluster" || q === "footprint_profile")
      fl({
        ctx: e,
        candles: c.candles,
        startIndex: c.startIndex,
        indexToX: ve,
        priceToY: nt,
        morphAt: Ps,
        candleBodyWidth: Dn,
        wickWidth: il,
        colors: {
          bullish: ne.bullish,
          bearish: ne.bearish,
          bullishWick: ne.bullishWick,
          bearishWick: ne.bearishWick,
          bullishBorder: ne.bullishBorder,
          bearishBorder: ne.bearishBorder
        }
      }), e.font = "8px monospace", e.fillStyle = "#e8e8e8", c.candles.forEach((D, i) => {
        const M = ve(c.startIndex + i, c.startIndex), g = nt(D.close), C = D.volume || 0;
        if (C > 0) {
          const k = Math.round(C * 0.55), N = Math.round(C * 0.45);
          e.fillText(`${k}/${N}`, M - 12, g - 8);
        }
      });
    else if (q === "flow_positioning")
      fl({
        ctx: e,
        candles: c.candles,
        startIndex: c.startIndex,
        indexToX: ve,
        priceToY: nt,
        morphAt: Ps,
        candleBodyWidth: Dn,
        wickWidth: il,
        colors: {
          bullish: ne.bullish,
          bearish: ne.bearish,
          bullishWick: ne.bullishWick,
          bearishWick: ne.bearishWick,
          bullishBorder: ne.bullishBorder,
          bearishBorder: ne.bearishBorder
        }
      }), e.strokeStyle = "#d0d0d0", e.lineWidth = 1, c.candles.forEach((D, i) => {
        if (i % 5 !== 0) return;
        const M = ve(c.startIndex + i, c.startIndex), g = D.close > D.open, C = nt(D.close);
        e.beginPath(), e.moveTo(M, C), e.lineTo(M, C + (g ? -12 : 12)), e.stroke(), e.fillStyle = g ? "#21b3a4" : "#f0426c", e.beginPath(), e.arc(M, C + (g ? -14 : 14), 2, 0, Math.PI * 2), e.fill();
      });
    else if (q === "renko") {
      const D = Ze.range * 0.02, i = [];
      let M = c.candles[0]?.close || 0, g = 0;
      c.candles.forEach((C) => {
        const k = C.close - M, N = Math.floor(Math.abs(k) / D);
        for (let B = 0; B < N; B++) {
          const F = k > 0, E = M, S = F ? M + D : M - D;
          i.push({
            x: g * Dn * 1.2,
            isBullish: F,
            top: nt(Math.max(E, S)),
            bottom: nt(Math.min(E, S))
          }), M = S, g++;
        }
      }), i.forEach((C) => {
        const k = Math.abs(C.bottom - C.top);
        e.fillStyle = C.isBullish ? ne.bullish : ne.bearish, e.fillRect(C.x, C.top, Dn, k), e.strokeStyle = C.isBullish ? ne.bullishBorder : ne.bearishBorder, e.lineWidth = 1, e.strokeRect(C.x, C.top, Dn, k);
      });
    }
    if (w) {
      const D = Pe * 0.2, i = Pe, M = i - D, g = c.candles.map((N) => N.volume ?? 0).filter((N) => N > 0), C = g.length > 0 ? Math.max(...g) : 1, k = Math.max(2, hn * 0.7);
      c.candles.forEach((N, B) => {
        const F = N.volume ?? 0;
        if (F > 0) {
          const E = c.startIndex + B, S = ve(E, c.startIndex), P = F / C * D * 0.95, $ = i - P, J = N.close >= N.open, he = r?.volume?.upColor || "#26a69a", z = r?.volume?.downColor || "#ef5350", Y = J ? he : z, oe = parseInt(Y.slice(1, 3), 16), me = parseInt(Y.slice(3, 5), 16), Se = parseInt(Y.slice(5, 7), 16);
          e.fillStyle = `rgba(${oe}, ${me}, ${Se}, 0.45)`, e.fillRect(S - k / 2, $, k, P), e.strokeStyle = `rgba(${oe}, ${me}, ${Se}, 0.7)`, e.lineWidth = 1, e.beginPath(), e.moveTo(S - k / 2, $), e.lineTo(S + k / 2, $), e.stroke();
        }
      }), It === "volume" && (e.save(), c.candles.forEach((B, F) => {
        const E = B.volume ?? 0;
        if (E <= 0) return;
        const S = c.candles[F - 1]?.volume ?? 0, R = c.candles[F + 1]?.volume ?? 0;
        if (E < S || E < R) return;
        const P = c.startIndex + F, $ = ve(P, c.startIndex), he = E / C * D * 0.95, z = i - he;
        e.beginPath(), e.arc($, z, 2.5 + 1, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc($, z, 2.5, 0, Math.PI * 2);
        const Y = B.close >= B.open;
        e.fillStyle = Y ? r?.volume?.upColor || "#26a69a" : r?.volume?.downColor || "#ef5350", e.fill();
      }), e.restore()), Qt.current.volume = { top: M, bottom: i };
    }
    if (e.restore(), r) {
      if (r.ema?.enabled && s?.ema && r.ema.periods?.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Pe), e.clip();
        const i = rr ? ["#D1D4DC", "#A0A4B0", "#B2B5BE", "#9598A1", "#787B86"] : ["#363A45", "#5D606B", "#434651", "#787B86", "#9598A1"];
        r.ema.periods.forEach((M, g) => {
          const C = s.ema[g];
          if (!C) return;
          e.strokeStyle = i[g % i.length], e.lineWidth = 1.5, e.beginPath();
          let k = !1;
          c.candles.forEach((N, B) => {
            const F = c.startIndex + B, E = C[F];
            if (!isNaN(E) && isFinite(E)) {
              const S = ve(F, c.startIndex), R = it(E, Ze);
              k ? e.lineTo(S, R) : (e.moveTo(S, R), k = !0);
            }
          }), e.stroke();
        }), e.restore();
      }
      if (s?.movingAverages && s.movingAverages.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Pe), e.clip();
        const i = r?.movingAverages?.lineWidth ?? 1.5;
        s.movingAverages.forEach((M) => {
          e.strokeStyle = M.color, e.lineWidth = i, e.beginPath();
          let g = !1;
          c.candles.forEach((C, k) => {
            const N = c.startIndex + k, B = M.data[N];
            if (!isNaN(B) && isFinite(B)) {
              const F = ve(N, c.startIndex), E = it(B, Ze);
              g ? e.lineTo(F, E) : (e.moveTo(F, E), g = !0);
            }
          }), e.stroke();
        }), e.restore();
      }
      if (r.bollinger?.enabled && s?.bollinger) {
        const i = s.bollinger;
        e.save(), e.beginPath(), e.rect(0, 0, U, Pe), e.clip();
        const M = r.bollinger.lineWidth || 1, g = r.bollinger.upperColor || "#9B59B6", C = r.bollinger.middleColor || "#9B59B6", k = r.bollinger.lowerColor || "#9B59B6";
        e.strokeStyle = g, e.lineWidth = M, e.setLineDash([3, 3]), e.beginPath();
        let N = !1;
        c.candles.forEach((B, F) => {
          const E = c.startIndex + F, S = i.upper[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ve(E, c.startIndex), P = it(S, Ze);
            N ? e.lineTo(R, P) : (e.moveTo(R, P), N = !0);
          }
        }), e.stroke(), e.strokeStyle = C, e.lineWidth = M, e.setLineDash([]), e.beginPath(), N = !1, c.candles.forEach((B, F) => {
          const E = c.startIndex + F, S = i.middle[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ve(E, c.startIndex), P = it(S, Ze);
            N ? e.lineTo(R, P) : (e.moveTo(R, P), N = !0);
          }
        }), e.stroke(), e.strokeStyle = k, e.lineWidth = M, e.setLineDash([3, 3]), e.beginPath(), N = !1, c.candles.forEach((B, F) => {
          const E = c.startIndex + F, S = i.lower[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ve(E, c.startIndex), P = it(S, Ze);
            N ? e.lineTo(R, P) : (e.moveTo(R, P), N = !0);
          }
        }), e.stroke(), e.setLineDash([]), e.restore();
      }
      if (s?.vwap) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Pe), e.clip(), e.strokeStyle = r?.vwap?.color || "#2196F3", e.lineWidth = 2, e.beginPath();
        let i = !1;
        c.candles.forEach((M, g) => {
          const C = c.startIndex + g, k = s.vwap[C];
          if (!isNaN(k) && isFinite(k)) {
            const N = ve(C, c.startIndex), B = it(k, Ze);
            i ? e.lineTo(N, B) : (e.moveTo(N, B), i = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (s?.ichimoku) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Pe), e.clip();
        const i = s.ichimoku, M = r?.ichimoku?.tenkanColor || "#0496ff", g = r?.ichimoku?.kijunColor || "#ff0000", C = r?.ichimoku?.cloudUpColor || "rgba(0, 255, 0, 0.2)", k = r?.ichimoku?.cloudDownColor || "rgba(255, 0, 0, 0.2)";
        for (let B = 0; B < c.candles.length; B++) {
          const F = c.startIndex + B, E = i.senkouA[F], S = i.senkouB[F];
          if (!isNaN(E) && !isNaN(S) && isFinite(E) && isFinite(S)) {
            const R = ve(F, c.startIndex), P = it(E, Ze), $ = it(S, Ze);
            e.fillStyle = E >= S ? C : k;
            const J = hn * (1 + Ve);
            e.fillRect(R - J / 2, Math.min(P, $), J, Math.abs(P - $));
          }
        }
        e.strokeStyle = M, e.lineWidth = 1.5, e.beginPath();
        let N = !1;
        c.candles.forEach((B, F) => {
          const E = c.startIndex + F, S = i.tenkan[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ve(E, c.startIndex), P = it(S, Ze);
            N ? e.lineTo(R, P) : (e.moveTo(R, P), N = !0);
          }
        }), e.stroke(), e.strokeStyle = g, e.lineWidth = 1.5, e.beginPath(), N = !1, c.candles.forEach((B, F) => {
          const E = c.startIndex + F, S = i.kijun[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ve(E, c.startIndex), P = it(S, Ze);
            N ? e.lineTo(R, P) : (e.moveTo(R, P), N = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (s?.parabolicSAR) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Pe), e.clip();
        const i = s.parabolicSAR, M = r?.parabolicSAR?.bullishColor || "#22c55e", g = r?.parabolicSAR?.bearishColor || "#ef4444";
        c.candles.forEach((C, k) => {
          const N = c.startIndex + k, B = i.sar[N], F = i.direction[N];
          if (!isNaN(B) && isFinite(B)) {
            const E = ve(N, c.startIndex), S = it(B, Ze);
            e.fillStyle = F > 0 ? M : g, e.beginPath(), e.arc(E, S, 2.5, 0, Math.PI * 2), e.fill();
          }
        }), e.restore();
      }
      if (s?.keltner) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Pe), e.clip();
        const i = s.keltner, M = r?.keltner?.upperColor || "#FF9800", g = r?.keltner?.middleColor || "#FF9800", C = r?.keltner?.lowerColor || "#FF9800";
        e.strokeStyle = M, e.lineWidth = 1, e.setLineDash([3, 3]), e.beginPath();
        let k = !1;
        c.candles.forEach((N, B) => {
          const F = c.startIndex + B, E = i.upper[F];
          if (!isNaN(E) && isFinite(E)) {
            const S = ve(F, c.startIndex), R = it(E, Ze);
            k ? e.lineTo(S, R) : (e.moveTo(S, R), k = !0);
          }
        }), e.stroke(), e.strokeStyle = g, e.setLineDash([]), e.beginPath(), k = !1, c.candles.forEach((N, B) => {
          const F = c.startIndex + B, E = i.middle[F];
          if (!isNaN(E) && isFinite(E)) {
            const S = ve(F, c.startIndex), R = it(E, Ze);
            k ? e.lineTo(S, R) : (e.moveTo(S, R), k = !0);
          }
        }), e.stroke(), e.strokeStyle = C, e.setLineDash([3, 3]), e.beginPath(), k = !1, c.candles.forEach((N, B) => {
          const F = c.startIndex + B, E = i.lower[F];
          if (!isNaN(E) && isFinite(E)) {
            const S = ve(F, c.startIndex), R = it(E, Ze);
            k ? e.lineTo(S, R) : (e.moveTo(S, R), k = !0);
          }
        }), e.stroke(), e.setLineDash([]), e.restore();
      }
      if (s?.pivotPoints) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Pe), e.clip();
        const i = s.pivotPoints, M = r?.pivotPoints?.pivotColor || "#FFEB3B", g = r?.pivotPoints?.resistanceColor || "#ef4444", C = r?.pivotPoints?.supportColor || "#22c55e", k = (N, B, F, E = []) => {
          const S = N.filter((R) => !isNaN(R) && isFinite(R)).pop();
          if (S !== void 0) {
            const R = it(S, Ze);
            e.strokeStyle = B, e.lineWidth = 1, e.setLineDash(E), e.beginPath(), e.moveTo(0, R), e.lineTo(U, R), e.stroke(), e.fillStyle = B, e.font = Vt, e.textAlign = "left", e.fillText(F, 5, R - 3);
          }
        };
        e.setLineDash([]), k(i.pivot, M, "P"), k(i.r1, g, "R1", [2, 2]), k(i.r2, g, "R2", [4, 2]), k(i.r3, g, "R3", [6, 2]), k(i.s1, C, "S1", [2, 2]), k(i.s2, C, "S2", [4, 2]), k(i.s3, C, "S3", [6, 2]), e.setLineDash([]), e.restore();
      }
      if (s?.supertrend) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Pe), e.clip();
        const i = s.supertrend, M = r?.supertrend?.bullishColor || "#22c55e", g = r?.supertrend?.bearishColor || "#ef4444";
        e.lineWidth = r?.supertrend?.lineWidth || 2, c.candles.forEach((C, k) => {
          const N = c.startIndex + k, B = i.supertrend[N];
          if (isNaN(B) || !isFinite(B)) return;
          const F = ve(N, c.startIndex), E = it(B, Ze), S = N - 1;
          S >= 0 && !isNaN(i.supertrend[S]) && (e.strokeStyle = i.direction[N] === 1 ? M : g, e.beginPath(), e.moveTo(ve(S, c.startIndex), it(i.supertrend[S], Ze)), e.lineTo(F, E), e.stroke());
        }), e.restore();
      }
      if (s?.donchian) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Pe), e.clip();
        const i = s.donchian, M = (g, C, k = []) => {
          e.strokeStyle = C, e.lineWidth = r?.donchian?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let N = !1;
          c.candles.forEach((B, F) => {
            const E = c.startIndex + F, S = g[E];
            if (!isNaN(S) && isFinite(S)) {
              const R = ve(E, c.startIndex), P = it(S, Ze);
              N ? e.lineTo(R, P) : (e.moveTo(R, P), N = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        M(i.upper, r?.donchian?.upperColor || "#2196F3"), M(i.middle, r?.donchian?.middleColor || "#FFC107", [4, 4]), M(i.lower, r?.donchian?.lowerColor || "#2196F3"), e.restore();
      }
      if (s?.envelopes) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Pe), e.clip();
        const i = s.envelopes, M = (g, C, k = []) => {
          e.strokeStyle = C, e.lineWidth = r?.envelopes?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let N = !1;
          c.candles.forEach((B, F) => {
            const E = c.startIndex + F, S = g[E];
            if (!isNaN(S) && isFinite(S)) {
              const R = ve(E, c.startIndex);
              N ? e.lineTo(R, it(S, Ze)) : (e.moveTo(R, it(S, Ze)), N = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        M(i.upper, r?.envelopes?.upperColor || "#00BCD4"), M(i.middle, r?.envelopes?.middleColor || "#FFC107", [3, 3]), M(i.lower, r?.envelopes?.lowerColor || "#00BCD4"), e.restore();
      }
      if ([
        { key: "dema", defaultColor: "#FF9800", label: "DEMA" },
        { key: "tema", defaultColor: "#E91E63", label: "TEMA" },
        { key: "hma", defaultColor: "#00E676", label: "HMA" }
      ].forEach(({ key: i, defaultColor: M }) => {
        const g = s?.[i];
        if (!g) return;
        e.save(), e.beginPath(), e.rect(0, 0, U, Pe), e.clip(), e.strokeStyle = r?.[i]?.color || M, e.lineWidth = r?.[i]?.lineWidth || 2, e.beginPath();
        let C = !1;
        c.candles.forEach((k, N) => {
          const B = c.startIndex + N, F = g[B];
          if (!isNaN(F) && isFinite(F)) {
            const E = ve(B, c.startIndex), S = it(F, Ze);
            C ? e.lineTo(E, S) : (e.moveTo(E, S), C = !0);
          }
        }), e.stroke(), e.restore();
      }), s?.linearReg) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Pe), e.clip();
        const i = s.linearReg, M = (g, C, k = []) => {
          e.strokeStyle = C, e.lineWidth = r?.linearReg?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let N = !1;
          c.candles.forEach((B, F) => {
            const E = c.startIndex + F, S = g[E];
            if (!isNaN(S) && isFinite(S)) {
              const R = ve(E, c.startIndex);
              N ? e.lineTo(R, it(S, Ze)) : (e.moveTo(R, it(S, Ze)), N = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        M(i.upper, r?.linearReg?.upperColor || "#81D4FA"), M(i.middle, r?.linearReg?.middleColor || "#29B6F6", [4, 4]), M(i.lower, r?.linearReg?.lowerColor || "#81D4FA"), e.restore();
      }
      if (s?.fibRetracement) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Pe), e.clip();
        const i = s.fibRetracement, M = r?.fibRetracement?.color || "#FFD54F", g = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
        i.levels.forEach((C, k) => {
          const N = it(C, Ze);
          e.strokeStyle = M, e.lineWidth = r?.fibRetracement?.lineWidth || 1, e.setLineDash(k === 0 || k === 6 ? [] : [4, 3]), e.beginPath(), e.moveTo(0, N), e.lineTo(U, N), e.stroke(), e.fillStyle = M, e.font = Vt, e.textAlign = "left", e.fillText(`${(g[k] * 100).toFixed(1)}% (${C.toFixed(2)})`, 5, N - 3);
        }), e.setLineDash([]), e.restore();
      }
      if (s?.camarillaPivots) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Pe), e.clip();
        const i = s.camarillaPivots, M = r?.camarillaPivots?.resistanceColor || "#ef4444", g = r?.camarillaPivots?.supportColor || "#22c55e", C = (k, N, B) => {
          const F = k.filter((E) => !isNaN(E) && isFinite(E)).pop();
          if (F !== void 0) {
            const E = it(F, Ze);
            e.strokeStyle = N, e.lineWidth = r?.camarillaPivots?.lineWidth || 1, e.setLineDash([3, 3]), e.beginPath(), e.moveTo(0, E), e.lineTo(U, E), e.stroke(), e.fillStyle = N, e.font = Vt, e.textAlign = "left", e.fillText(B, 5, E - 3);
          }
        };
        C(i.h4, M, "H4"), C(i.h3, M, "H3"), C(i.l3, g, "L3"), C(i.l4, g, "L4"), e.setLineDash([]), e.restore();
      }
      if (s?.woodiePivots) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Pe), e.clip();
        const i = s.woodiePivots, M = r?.woodiePivots?.pivotColor || "#FFEB3B", g = r?.woodiePivots?.resistanceColor || "#ef4444", C = r?.woodiePivots?.supportColor || "#22c55e", k = (N, B, F) => {
          const E = N.filter((S) => !isNaN(S) && isFinite(S)).pop();
          if (E !== void 0) {
            const S = it(E, Ze);
            e.strokeStyle = B, e.lineWidth = r?.woodiePivots?.lineWidth || 1, e.setLineDash([3, 3]), e.beginPath(), e.moveTo(0, S), e.lineTo(U, S), e.stroke(), e.fillStyle = B, e.font = Vt, e.textAlign = "left", e.fillText(F, 5, S - 3);
          }
        };
        k(i.pivot, M, "WP"), k(i.r1, g, "WR1"), k(i.r2, g, "WR2"), k(i.s1, C, "WS1"), k(i.s2, C, "WS2"), e.setLineDash([]), e.restore();
      }
      if (s?.volumeSma && w) {
        e.save();
        const i = s.volumeSma, M = Pe * 0.2, g = Pe, C = c.candles.map((B) => B.volume || 0), k = Math.max(...C, 1);
        e.strokeStyle = r?.volumeSma?.color || "#FF9800", e.lineWidth = 1.5, e.beginPath();
        let N = !1;
        c.candles.forEach((B, F) => {
          const E = c.startIndex + F, S = i[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ve(E, c.startIndex), P = g - S / k * M;
            N ? e.lineTo(R, P) : (e.moveTo(R, P), N = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (r?.volumeProfile?.enabled && c.candles.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, U, Pe), e.clip();
        const i = r.volumeProfile.numberOfRows ?? 48, M = U * ((r.volumeProfile.rowWidth ?? 15) / 100), g = (r.volumeProfile.opacity ?? 60) / 100, C = r.volumeProfile.upColor || "#D97706", k = r.volumeProfile.downColor || "#1E3A8A", N = r.volumeProfile.pocColor || "#10B981", B = r.volumeProfile.lookbackBars ?? 0, F = B > 0 ? c.candles.slice(-B) : c.candles;
        let E = 1 / 0, S = -1 / 0;
        F.forEach((z) => {
          E = Math.min(E, z.low), S = Math.max(S, z.high);
        });
        const P = (S - E || 1) / i, $ = [];
        for (let z = 0; z < i; z++)
          $.push({
            priceLevel: E + (z + 0.5) * P,
            upVolume: 0,
            downVolume: 0,
            totalVolume: 0
          });
        F.forEach((z) => {
          if (!z.volume || z.volume <= 0) return;
          const Y = z.low, oe = z.high, me = oe - Y, Se = z.close >= z.open;
          for (let le = 0; le < i; le++) {
            const Ie = E + le * P, Te = Ie + P;
            if (oe >= Ie && Y <= Te) {
              const Ue = Math.max(Y, Ie), ut = Math.min(oe, Te), ft = me > 0 ? (ut - Ue) / me : 1, Dt = z.volume * ft;
              Se ? $[le].upVolume += Dt : $[le].downVolume += Dt, $[le].totalVolume += Dt;
            }
          }
        });
        let J = 0, he = 0;
        if ($.forEach((z, Y) => {
          z.totalVolume > J && (J = z.totalVolume, he = Y);
        }), J > 0) {
          const z = Pe / i * 0.85;
          $.forEach((Y, oe) => {
            if (Y.totalVolume <= 0) return;
            const me = nt(Y.priceLevel) - z / 2, Se = Y.totalVolume / J * M, le = Y.totalVolume > 0 ? Y.upVolume / Y.totalVolume * Se : 0, Ie = Se - le, Te = oe === he, Ue = U - Se;
            le > 0 && (e.globalAlpha = Te ? Math.min(g + 0.2, 1) : g, e.fillStyle = C, e.fillRect(Ue, me, le, z)), Ie > 0 && (e.globalAlpha = Te ? 0.95 : 0.85, e.fillStyle = k, e.fillRect(Ue + le, me, Ie, z)), Te && (e.globalAlpha = 0.9, e.strokeStyle = N, e.lineWidth = 1.5, e.strokeRect(Ue, me, Se, z));
          }), e.globalAlpha = 1, It === "volumeProfile" && $.forEach((oe, me) => {
            if (oe.totalVolume <= 0) return;
            const Se = nt(oe.priceLevel), le = oe.totalVolume / J * M, Ie = U - le;
            e.beginPath(), e.arc(Ie, Se, 2.5 + 1, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc(Ie, Se, 2.5, 0, Math.PI * 2), e.fillStyle = oe.upVolume >= oe.downVolume ? C : k, e.fill();
          });
        }
        e.restore(), e.restore();
      }
    }
    const Vs = [], Ls = [];
    let Yl = "", Ao = "", ul = 14, Do = 0, Bo = 0;
    const vc = Ss?.current && Ss.current.length > 0;
    if (ws && !vc && ss) {
      const D = ss.find((i) => i.id === ws);
      if (D && D.points && D.points.length > 0) {
        e.save();
        const i = He.badgeFont, M = "#2962ff", g = "rgba(41, 98, 255, 0.2)", C = He.badgePadding, k = He.badgeRowHeight, N = Xe - 6, B = U + 3, F = xe.height - vt, E = F + (vt - k) / 2;
        if (Yl = i, Ao = M, ul = k, Do = E, Bo = B, D.points.forEach((S) => {
          let R = null, P = null;
          if (S.price !== void 0 && (P = nt(S.price), P >= 0 && P <= Pe)) {
            const $ = An(S.price), J = e.measureText($).width, he = Math.min(J + C * 2, N), z = P - k / 2;
            Ls.push({
              pos: P,
              text: $,
              bWidth: he,
              topOrigin: z
            });
          }
          if (S.time !== void 0) {
            let $ = -1;
            if (l.length > 0) {
              const J = l[0].time, he = l[l.length - 1].time, z = l.length > 1 ? l[1].time - l[0].time : 6e4;
              if (S.time > he) $ = l.length - 1 + (S.time - he) / z;
              else if (S.time < J) $ = (S.time - J) / z;
              else {
                let Y = 0, oe = l.length - 1;
                for (; Y <= oe; ) {
                  const me = Math.floor((Y + oe) / 2);
                  if (l[me].time === S.time) {
                    $ = me;
                    break;
                  }
                  l[me].time < S.time ? Y = me + 1 : oe = me - 1;
                }
                if ($ === -1) {
                  const me = Y, Se = me - 1;
                  if (Se >= 0 && me < l.length) {
                    const le = l[Se], Ie = l[me], Te = (S.time - le.time) / (Ie.time - le.time);
                    $ = Se + Te;
                  } else
                    $ = Y;
                }
              }
            }
            if ($ !== -1) {
              const J = Le.current.startIndex, z = Le.current.candleWidth * (1 + Ve), Y = Math.floor(J), oe = (J - Y) * z;
              R = ($ - Y) * z + z / 2 - oe;
            }
            if (R !== null && R >= 0 && R <= U) {
              const J = `${hr(S.time)} ${es(S.time, !0)}  ${Rs(S.time)}`, z = e.measureText(J).width + C * 2;
              let Y = R - z / 2;
              Y < 0 && (Y = 0), Y + z > U && (Y = U - z), Vs.push({
                pos: R,
                text: J,
                bWidth: z,
                topOrigin: Y
              });
            }
          }
        }), (D.type === "long" || D.type === "short") && D.stopLoss) {
          const S = D.stopLoss.price, R = nt(S);
          if (R >= 0 && R <= Pe) {
            e.font = Yl || i;
            const P = An(S), $ = e.measureText(P).width, J = Math.min($ + C * 2, N), he = R - k / 2;
            Ls.push({
              pos: R,
              text: P,
              bWidth: J,
              topOrigin: he
            });
          }
        }
        if (Vs.length >= 2) {
          const S = Math.min(...Vs.map((P) => P.pos)), R = Math.max(...Vs.map((P) => P.pos));
          R > S && (e.fillStyle = g, e.fillRect(S, F, R - S, vt));
        }
        if (Ls.length >= 2) {
          const S = Math.min(...Ls.map((P) => P.pos)), R = Math.max(...Ls.map((P) => P.pos));
          R > S && (e.fillStyle = g, e.fillRect(B - 3, S, Xe, R - S));
        }
        e.restore();
      }
    }
    e.fillStyle = ne.axisLabel || "#787b86", e.font = El, e.textBaseline = "middle", e.textAlign = He.priceLabelAlign;
    const yc = He.priceLabelAlign === "right" ? m - (Xn !== void 0 ? Xn : Oo) - 4 : U + 2;
    let Nr = -1 / 0;
    for (let D = Cr; D <= Ze.max; D += Xl) {
      const i = nt(D);
      if (i >= 10 && i <= Pe - 10) {
        if (Math.abs(i - Nr) < Ir) continue;
        Nr = i, e.fillText(An(D), yc, i);
      }
    }
    const qt = n != null && !Number.isNaN(n) ? n : c.candles.length ? c.candles[c.candles.length - 1].close : null;
    if (qt != null && !Number.isNaN(qt) && !Tt) {
      const D = nt(qt);
      if (D >= 0 && D <= Pe) {
        e.save();
        const i = c.candles.length >= 2 ? c.candles[c.candles.length - 2] : null, M = c.candles.length >= 1 ? c.candles[c.candles.length - 1] : null, g = i ? i.close : M ? M.open : qt, C = qt >= g, k = ne.priceTickerBullish || ne.bullish, N = ne.priceTickerBearish || ne.bearish, B = C ? k : N, F = (Vn) => {
          const tn = Vn.replace("#", ""), $t = parseInt(tn.substring(0, 2), 16), fn = parseInt(tn.substring(2, 4), 16), Gt = parseInt(tn.substring(4, 6), 16);
          return `${$t}, ${fn}, ${Gt}`;
        }, E = F(ne.textDim || "#666666"), S = `rgba(${E}, 0.35)`, R = `rgba(${E}, 0.9)`, P = F(B).split(",").map(Number), $ = (0.299 * P[0] + 0.587 * P[1] + 0.114 * P[2]) / 255, J = Number.isNaN($) || $ <= 0.55 ? "#ffffff" : "#000000", he = c.candles.length - 1, z = c.candles.length > 0 ? ve(c.startIndex + he, c.startIndex) : 0;
        z > 0 && (e.strokeStyle = S, e.lineWidth = 1, e.setLineDash([4, 4]), e.beginPath(), e.moveTo(0, D), e.lineTo(z, D), e.stroke(), e.setLineDash([])), e.strokeStyle = R, e.lineWidth = 1, e.setLineDash([4, 3]), e.beginPath(), e.moveTo(z, D), e.lineTo(U, D), e.stroke(), e.setLineDash([]);
        const Y = An(qt), oe = El, me = He.liveCountdownFont;
        e.font = oe;
        const le = e.measureText(Y).width, Ie = He.livePriceLabelPadding, Te = He.livePriceRowHeight, Ue = I && I.length > 0, ut = Ue ? He.countdownRowHeight : 0, ft = Te + ut;
        let Dt = 0;
        Ue && (e.font = me, Dt = e.measureText(I).width);
        const yn = Xe - 6, Bn = Math.max(le, Dt) + Ie * 2, Pt = Math.min(Bn, yn), Bt = U + 3, yt = D - Te / 2;
        e.fillStyle = ne.background, e.fillRect(Bt - 1, yt - 1, Pt + 2, ft + 2), e.fillStyle = B, e.beginPath(), e.roundRect(Bt, yt, Pt, ft, 3), e.fill(), e.fillStyle = J, e.font = oe, e.textAlign = "center", e.textBaseline = "middle", e.fillText(Y, Bt + Pt / 2, yt + Te / 2), Ue && (e.strokeStyle = J === "#ffffff" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)", e.lineWidth = 0.5, e.beginPath(), e.moveTo(Bt + 3, yt + Te), e.lineTo(Bt + Pt - 3, yt + Te), e.stroke(), e.fillStyle = J === "#ffffff" ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)", e.font = me, e.textAlign = "center", e.textBaseline = "middle", e.fillText(I, Bt + Pt / 2, yt + Te + ut / 2)), e.restore();
      }
    }
    if (ss && ss.length > 0) {
      e.save();
      const D = El;
      e.font = D;
      const i = He.badgePadding, M = He.badgeRowHeight, g = [], C = [];
      ss.forEach((R) => {
        if ((R.type === "horizontalRay" || R.type === "horizontal") && R.points.length > 0) {
          const P = R.points[0].price;
          g.push({ price: P, color: R.color || "#2196f3", yPos: nt(P) });
        } else if ((R.type === "long" || R.type === "short") && R.points.length >= 2) {
          if (R.id === ws) return;
          const P = R.points[0].price, $ = R.points[1].price;
          if (g.push({ price: P, color: "#4b5563", yPos: nt(P) }), g.push({ price: $, color: "#22c55e", yPos: nt($) }), R.stopLoss) {
            const J = R.stopLoss.price;
            g.push({ price: J, color: "#ef4444", yPos: nt(J) });
          }
        }
      });
      let k = -9999, N = -9999;
      if (qt != null && !Number.isNaN(qt)) {
        const R = nt(qt), P = He.livePriceRowHeight + (I && I.length > 0 ? He.countdownRowHeight : 0);
        k = R - He.livePriceRowHeight / 2, N = k + P;
      }
      const B = 2, F = Xe - 6, E = U + 3;
      g.sort((R, P) => R.yPos - P.yPos);
      let S = -9999;
      g.forEach((R) => {
        let P = R.yPos - M / 2, $ = P + M;
        if (P < S + B && (P = S + B, $ = P + M), P < N + B && $ > k - B && (P = N + B, $ = P + M), S = $, P >= 0 && $ <= Pe) {
          const J = An(R.price), he = e.measureText(J).width, z = Math.min(he + i * 2, F);
          e.fillStyle = R.color, e.beginPath(), e.roundRect(E, P, z, M, 3), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.fillText(J, E + z / 2, P + M / 2);
        }
      }), e.font = He.alertFlagFont, C.forEach((R) => {
        if (R.xPos >= 0 && R.xPos <= U) {
          const P = es(R.time, !0) + " " + Rs(R.time), J = e.measureText(P).width + i * 2, z = xe.height - vt + (vt - M) / 2;
          let Y = R.xPos - J / 2;
          Y < 0 && (Y = 0), Y + J > U && (Y = U - J), e.fillStyle = R.color, e.beginPath(), e.roundRect(Y, z, J, M, 3), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.fillText(P, Y + J / 2, z + M / 2);
        }
      }), e.restore();
    }
    if (Tt && qt !== null && qt !== void 0 && !Number.isNaN(qt)) {
      const D = Lt != null && sn != null && Number.isFinite(Lt) && Number.isFinite(sn), i = D ? Lt : qt, M = D ? sn : qt + od(h || ""), g = nt(i), C = nt(M);
      if (e.save(), g >= 0 && g <= Pe) {
        e.strokeStyle = "#1976d2", e.lineWidth = 1, e.setLineDash([3, 4]), e.beginPath(), e.moveTo(0, g), e.lineTo(U, g), e.stroke(), e.setLineDash([]);
        const k = An(i);
        e.font = He.alertCountFont;
        const B = e.measureText(k).width + 12, F = 16, E = U + 2;
        e.fillStyle = "#1976d2", e.beginPath(), e.roundRect(E, g - F / 2, Math.min(B, Xe - 4), F, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "left", e.textBaseline = "middle", e.fillText(k, E + 6, g);
      }
      if (C >= 0 && C <= Pe) {
        e.strokeStyle = "#d32f2f", e.lineWidth = 1, e.setLineDash([3, 4]), e.beginPath(), e.moveTo(0, C), e.lineTo(U, C), e.stroke(), e.setLineDash([]);
        const k = An(M);
        e.font = He.alertCountFont;
        const B = e.measureText(k).width + 12, F = 16, E = U + 2;
        e.fillStyle = "#d32f2f", e.beginPath(), e.roundRect(E, C - F / 2, Math.min(B, Xe - 4), F, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "left", e.textBaseline = "middle", e.fillText(k, E + 6, C);
      }
      g >= 0 && C >= 0 && g <= Pe && C <= Pe && (e.fillStyle = "rgba(148, 163, 184, 0.04)", e.fillRect(0, Math.min(C, g), U, Math.abs(g - C))), e.restore();
    }
    if (ze && ze.length > 0) {
      const D = {
        ctx: e,
        chartWidth: U,
        mainChartHeight: Pe,
        mainPriceToY: nt,
        formatPrice: An,
        colors: {
          slColor: ne.slColor,
          slOpacity: ne.slOpacity,
          tpColor: ne.tpColor,
          tpOpacity: ne.tpOpacity
        },
        selectedPositionId: Ne.current,
        slDraft: ct.current,
        tpDraft: rt.current,
        hoveredSLTP: Fn.current,
        draggingHandle: at.current,
        defaultOffset: Kn(0) || void 0
      };
      Tu(D, ze), Mu(D, ze);
    }
    if (It && !It.startsWith("sp-") && s) {
      const D = Ze;
      if (D && Pe > 0) {
        const g = (k, N) => {
          e.save(), e.beginPath(), e.rect(0, 0, U, Pe), e.clip();
          for (let B = 0; B < c.candles.length; B += 8) {
            const F = c.startIndex + B;
            if (F >= k.length) continue;
            const E = k[F];
            if (isNaN(E) || !isFinite(E)) continue;
            const S = ve(F, c.startIndex), R = Pe - (E - D.min) / D.range * Pe;
            e.beginPath(), e.arc(S, R, 3.5, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc(S, R, 2.5, 0, Math.PI * 2), e.fillStyle = N, e.fill();
          }
          e.restore();
        }, C = It;
        if (C === "movingAverages" && s.movingAverages)
          for (const k of s.movingAverages) g(k.data, k.color);
        else if (C?.startsWith("movingAverages__") && s.movingAverages) {
          const k = parseInt(C.slice(16), 10), N = s.movingAverages[k];
          N && g(N.data, N.color);
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
          const k = s.supertrend.map((N) => N?.value ?? NaN);
          g(k, "#3b82f6");
        } else if (["dema", "tema", "hma"].includes(C)) {
          const k = s[C];
          Array.isArray(k) && g(k, "#3b82f6");
        } else if (C.startsWith("ci-") && r?.customIndicators) {
          const k = r.customIndicators.find((B) => `ci-${B.id}` === C), N = k?.data;
          k && N && Array.isArray(N) && g(N, k.color);
        } else if (C.startsWith("script-") && r?.customIndicators) {
          const k = C.slice(7);
          for (const N of r.customIndicators) {
            if (N.scriptId !== k) continue;
            const B = N.data;
            B && Array.isArray(B) && g(B, N.color);
          }
        }
      }
    }
    let _t = Pe;
    if (s?.rsi) {
      const D = ts, i = _t, M = i + D, g = r?.rsi?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, U, D), e.globalAlpha = 1), e.strokeStyle = ne.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const C = (Y) => i + D - Y / 100 * D, k = r?.rsi?.overbought ?? 70, N = r?.rsi?.oversold ?? 30;
      if (g.showZones) {
        const Y = C(k), oe = C(N), me = g.zoneOpacity ?? 0.1;
        e.fillStyle = g.overboughtZoneColor || "#ff4444", e.globalAlpha = me, e.fillRect(0, i, U, Y - i), e.fillStyle = g.oversoldZoneColor || "#44ff44", e.fillRect(0, oe, U, M - oe), e.globalAlpha = 1;
      }
      if (g.showGrid !== !1) {
        const Y = g.gridColor || "rgba(150, 150, 150, 0.3)";
        e.setLineDash([4, 4]), [N, 50, k].forEach((oe) => {
          e.beginPath(), oe === 50 ? (e.strokeStyle = Y, e.lineWidth = 1) : (e.strokeStyle = "rgba(180, 130, 80, 0.8)", e.lineWidth = 1.5);
          const me = C(oe);
          e.moveTo(0, me), e.lineTo(U, me), e.stroke();
        }), e.setLineDash([]), e.lineWidth = 1;
      }
      const B = r?.rsi?.color || "#E74C3C", F = g.lineWidth ?? 1.5;
      e.strokeStyle = B, e.lineWidth = F, e.beginPath();
      let E = !1;
      c.candles.forEach((Y, oe) => {
        const me = c.startIndex + oe, Se = s.rsi[me];
        if (!isNaN(Se) && isFinite(Se)) {
          const le = ve(me, c.startIndex), Ie = C(Se);
          E ? e.lineTo(le, Ie) : (e.moveTo(le, Ie), E = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Vt, e.textAlign = "left", [0, N, 50, k, 100].forEach((Y) => {
        const oe = C(Y);
        e.fillText(Y.toString(), U + 5, oe);
      }), Qt.current.rsi = { top: i, bottom: M };
      const S = dt.current !== null ? dt.current : c.startIndex + c.candles.length - 1, R = s.rsi[S], P = !isNaN(R) && isFinite(R) ? R.toFixed(2) : "--", $ = `RSI ${r?.rsi?.period || 14} close`, J = r?.rsi?.style?.customLabel || $, he = r?.rsi?.style?.labelColor || "#d1d5db";
      e.fillStyle = he, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left", e.fillText(J, 5, i + 15), e.fillStyle = B, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
      const z = e.measureText(J).width;
      e.fillText(P, 13 + z, i + 15), Hn.current.rsi = 13 + z + e.measureText(P).width + 8, _t = M;
    }
    if (s?.macd) {
      const D = ts, i = _t, M = i + D, g = r?.macd?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, U, D), e.globalAlpha = 1), e.strokeStyle = ne.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const C = s.macd.macd.slice(c.startIndex, c.endIndex), k = s.macd.signal.slice(c.startIndex, c.endIndex), N = s.macd.histogram.slice(c.startIndex, c.endIndex), B = [...C, ...k, ...N].filter((yt) => !isNaN(yt) && isFinite(yt)), F = Math.min(...B, 0), S = Math.max(...B, 0) - F || 1, R = (yt) => i + D - (yt - F) / S * D;
      if (g.showGrid !== !1) {
        e.strokeStyle = g.gridColor || ne.grid, e.setLineDash([2, 2]), e.beginPath();
        const yt = R(0);
        e.moveTo(0, yt), e.lineTo(U, yt), e.stroke(), e.setLineDash([]);
      }
      const P = Math.max(2, hn * 0.5), $ = r?.macd?.histogramUpColor || "#26a69a", J = r?.macd?.histogramDownColor || "#ef5350", he = R(0);
      c.candles.forEach((yt, Vn) => {
        const tn = c.startIndex + Vn, $t = s.macd.histogram[tn];
        if (!isNaN($t) && isFinite($t)) {
          const fn = ve(tn, c.startIndex), Gt = R($t), Ns = Math.abs(he - Gt);
          e.fillStyle = $t >= 0 ? $ : J, $t >= 0 ? e.fillRect(fn - P / 2, Gt, P, Ns) : e.fillRect(fn - P / 2, he, P, Ns);
        }
      });
      const z = r?.macd?.macdColor || "#3498DB";
      e.strokeStyle = z, e.lineWidth = 1.5, e.beginPath();
      let Y = !1;
      c.candles.forEach((yt, Vn) => {
        const tn = c.startIndex + Vn, $t = s.macd.macd[tn];
        if (!isNaN($t) && isFinite($t)) {
          const fn = ve(tn, c.startIndex), Gt = R($t);
          Y ? e.lineTo(fn, Gt) : (e.moveTo(fn, Gt), Y = !0);
        }
      }), e.stroke();
      const oe = r?.macd?.signalColor || "#E67E22";
      e.strokeStyle = oe, e.lineWidth = 1.5, e.beginPath(), Y = !1, c.candles.forEach((yt, Vn) => {
        const tn = c.startIndex + Vn, $t = s.macd.signal[tn];
        if (!isNaN($t) && isFinite($t)) {
          const fn = ve(tn, c.startIndex), Gt = R($t);
          Y ? e.lineTo(fn, Gt) : (e.moveTo(fn, Gt), Y = !0);
        }
      }), e.stroke(), Qt.current.macd = { top: i, bottom: M };
      const me = `MACD(${r?.macd?.fast || 12},${r?.macd?.slow || 26},${r?.macd?.signal || 9})`, Se = r?.macd?.style?.customLabel || me, le = r?.macd?.style?.labelColor || ne.textDim;
      e.fillStyle = le, e.font = `bold ${Vt}`, e.textAlign = "left";
      const Ie = dt.current !== null ? dt.current : c.startIndex + c.candles.length - 1, Te = s.macd.macd[Ie], Ue = s.macd.signal[Ie], ut = s.macd.histogram[Ie];
      e.fillText(Se, 5, i + 12), e.fillStyle = z, e.font = Vt;
      const ft = e.measureText(Se).width, Dt = !isNaN(Te) && isFinite(Te) ? Te.toFixed(4) : "--";
      e.fillText(Dt, 10 + ft, i + 12), e.fillStyle = oe;
      const yn = !isNaN(Ue) && isFinite(Ue) ? Ue.toFixed(4) : "--", Bn = e.measureText(Dt).width;
      e.fillText(yn, 16 + ft + Bn, i + 12);
      const Pt = !isNaN(ut) && isFinite(ut) ? ut.toFixed(4) : "--";
      e.fillStyle = ut >= 0 ? "#00ff88" : "#ff0080";
      const Bt = e.measureText(yn).width;
      e.fillText(Pt, 22 + ft + Bn + Bt, i + 12), Hn.current.macd = 22 + ft + Bn + Bt + e.measureText(Pt).width + 8, _t = M;
    }
    if (s?.atr) {
      const D = ts, i = _t, M = i + D, g = r?.atr?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, U, D), e.globalAlpha = 1), e.strokeStyle = ne.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const C = s.atr.slice(c.startIndex, c.endIndex).filter((me) => !isNaN(me) && isFinite(me)), k = Math.min(...C, 0), B = Math.max(...C) - k || 1, F = (me) => i + D - (me - k) / B * D, E = r?.atr?.color || "#17a2b8", S = g.lineWidth ?? 1.5;
      e.strokeStyle = E, e.lineWidth = S, e.beginPath();
      let R = !1;
      c.candles.forEach((me, Se) => {
        const le = c.startIndex + Se, Ie = s.atr[le];
        if (!isNaN(Ie) && isFinite(Ie)) {
          const Te = ve(le, c.startIndex), Ue = F(Ie);
          R ? e.lineTo(Te, Ue) : (e.moveTo(Te, Ue), R = !0);
        }
      }), e.stroke(), Qt.current.atr = { top: i, bottom: M };
      const P = `ATR(${r?.atr?.period || 14})`, $ = r?.atr?.style?.customLabel || P, J = r?.atr?.style?.labelColor || ne.textDim;
      e.fillStyle = J, e.font = `bold ${Vt}`, e.textAlign = "left";
      const he = dt.current !== null ? dt.current : c.startIndex + c.candles.length - 1, z = s.atr[he], Y = !isNaN(z) && isFinite(z) ? z.toFixed(5) : "--";
      e.fillText($, 5, i + 12), e.fillStyle = E, e.font = Vt;
      const oe = e.measureText($).width;
      e.fillText(Y, 10 + oe, i + 12), Hn.current.atr = 10 + oe + e.measureText(Y).width + 8, _t = M;
    }
    if (s?.stochastic) {
      const D = ts, i = _t, M = i + D, g = r?.stochastic?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, U, D), e.globalAlpha = 1), e.strokeStyle = ne.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const C = (Se) => i + D - Se / 100 * D;
      e.strokeStyle = ne.grid, e.setLineDash([2, 2]), e.beginPath();
      const k = r?.stochastic?.overbought ?? 80, N = r?.stochastic?.oversold ?? 20;
      [N, 50, k].forEach((Se) => {
        const le = C(Se);
        e.moveTo(0, le), e.lineTo(U, le);
      }), e.stroke(), e.setLineDash([]);
      const B = r?.stochastic?.kColor || "#3498DB";
      e.strokeStyle = B, e.lineWidth = 1.5, e.beginPath();
      let F = !1;
      c.candles.forEach((Se, le) => {
        const Ie = c.startIndex + le, Te = s.stochastic.k[Ie];
        if (!isNaN(Te) && isFinite(Te)) {
          const Ue = ve(Ie, c.startIndex), ut = C(Te);
          F ? e.lineTo(Ue, ut) : (e.moveTo(Ue, ut), F = !0);
        }
      }), e.stroke();
      const E = r?.stochastic?.dColor || "#E67E22";
      e.strokeStyle = E, e.lineWidth = 1.5, e.beginPath(), F = !1, c.candles.forEach((Se, le) => {
        const Ie = c.startIndex + le, Te = s.stochastic.d[Ie];
        if (!isNaN(Te) && isFinite(Te)) {
          const Ue = ve(Ie, c.startIndex), ut = C(Te);
          F ? e.lineTo(Ue, ut) : (e.moveTo(Ue, ut), F = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Vt, e.textAlign = "left", [0, N, 50, k, 100].forEach((Se) => {
        const le = C(Se);
        e.fillText(Se.toString(), U + 5, le);
      }), Qt.current.stochastic = { top: i, bottom: M };
      const S = `STOCH(${r?.stochastic?.kPeriod || 14},${r?.stochastic?.dPeriod || 3})`, R = r?.stochastic?.style?.customLabel || S, P = r?.stochastic?.style?.labelColor || ne.textDim;
      e.fillStyle = P, e.font = `bold ${Vt}`, e.textAlign = "left";
      const $ = dt.current !== null ? dt.current : c.startIndex + c.candles.length - 1, J = s.stochastic.k[$], he = s.stochastic.d[$];
      e.fillText(R, 5, i + 12), e.fillStyle = B, e.font = Vt;
      const z = e.measureText(R).width, Y = !isNaN(J) && isFinite(J) ? `%K ${J.toFixed(2)}` : "%K --";
      e.fillText(Y, 10 + z, i + 12), e.fillStyle = E;
      const oe = e.measureText(Y).width, me = !isNaN(he) && isFinite(he) ? `%D ${he.toFixed(2)}` : "%D --";
      e.fillText(me, 16 + z + oe, i + 12), Hn.current.stochastic = 16 + z + oe + e.measureText(me).width + 8, _t = M;
    }
    if (s?.williamsR) {
      const D = ts, i = _t, M = i + D, g = r?.williamsR?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, U, D), e.globalAlpha = 1), e.strokeStyle = ne.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const C = (z) => i + D - (z + 100) / 100 * D, k = r?.williamsR?.overbought ?? -20, N = r?.williamsR?.oversold ?? -80;
      e.setLineDash([4, 4]), e.strokeStyle = g.gridColor || "rgba(180, 130, 80, 0.6)", [N, -50, k].forEach((z) => {
        e.beginPath();
        const Y = C(z);
        e.moveTo(0, Y), e.lineTo(U, Y), e.stroke();
      }), e.setLineDash([]);
      const B = r?.williamsR?.color || "#E91E63";
      e.strokeStyle = B, e.lineWidth = g.lineWidth ?? 1.5, e.beginPath();
      let F = !1;
      c.candles.forEach((z, Y) => {
        const oe = c.startIndex + Y, me = s.williamsR[oe];
        if (!isNaN(me) && isFinite(me)) {
          const Se = ve(oe, c.startIndex), le = C(me);
          F ? e.lineTo(Se, le) : (e.moveTo(Se, le), F = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Vt, e.textAlign = "left", [-100, N, -50, k, 0].forEach((z) => {
        const Y = C(z);
        e.fillText(z.toString(), U + 5, Y);
      }), Qt.current.williamsR = { top: i, bottom: M };
      const E = `Williams %R ${r?.williamsR?.period || 14}`, S = r?.williamsR?.style?.customLabel || E, R = r?.williamsR?.style?.labelColor || "#d1d5db";
      e.fillStyle = R, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left";
      const P = dt.current !== null ? dt.current : c.startIndex + c.candles.length - 1, $ = s.williamsR[P], J = !isNaN($) && isFinite($) ? $.toFixed(2) : "--";
      e.fillText(S, 5, i + 15), e.fillStyle = B;
      const he = e.measureText(S).width;
      e.fillText(J, 13 + he, i + 15), Hn.current.williamsR = 13 + he + e.measureText(J).width + 8, _t = M;
    }
    if (s?.cci) {
      const D = ts, i = _t, M = i + D, g = r?.cci?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, U, D), e.globalAlpha = 1), e.strokeStyle = ne.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const C = c.candles.map((oe, me) => s.cci[c.startIndex + me]).filter((oe) => !isNaN(oe) && isFinite(oe)), k = C.length > 0 ? Math.max(200, Math.max(...C.map(Math.abs))) : 200, N = (oe) => i + D / 2 - oe / k * (D / 2), B = r?.cci?.overbought ?? 100, F = r?.cci?.oversold ?? -100;
      e.setLineDash([4, 4]), e.strokeStyle = g.gridColor || "rgba(180, 130, 80, 0.6)", [F, 0, B].forEach((oe) => {
        e.beginPath();
        const me = N(oe);
        e.moveTo(0, me), e.lineTo(U, me), e.stroke();
      }), e.setLineDash([]);
      const E = r?.cci?.color || "#00BCD4";
      e.strokeStyle = E, e.lineWidth = g.lineWidth ?? 1.5, e.beginPath();
      let S = !1;
      c.candles.forEach((oe, me) => {
        const Se = c.startIndex + me, le = s.cci[Se];
        if (!isNaN(le) && isFinite(le)) {
          const Ie = ve(Se, c.startIndex), Te = N(le);
          S ? e.lineTo(Ie, Te) : (e.moveTo(Ie, Te), S = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Vt, e.textAlign = "left", [Math.round(-k), F, 0, B, Math.round(k)].forEach((oe) => {
        const me = N(oe);
        e.fillText(oe.toString(), U + 5, me);
      }), Qt.current.cci = { top: i, bottom: M };
      const R = `CCI ${r?.cci?.period || 20}`, P = r?.cci?.style?.customLabel || R, $ = r?.cci?.style?.labelColor || "#d1d5db";
      e.fillStyle = $, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left";
      const J = dt.current !== null ? dt.current : c.startIndex + c.candles.length - 1, he = s.cci[J], z = !isNaN(he) && isFinite(he) ? he.toFixed(2) : "--";
      e.fillText(P, 5, i + 15), e.fillStyle = E;
      const Y = e.measureText(P).width;
      e.fillText(z, 13 + Y, i + 15), Hn.current.cci = 13 + Y + e.measureText(z).width + 8, _t = M;
    }
    if (s?.adx) {
      const D = ts, i = _t, M = i + D;
      e.strokeStyle = ne.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const g = (S) => i + D - S / 100 * D;
      e.setLineDash([4, 4]), e.strokeStyle = "rgba(150, 150, 150, 0.3)", [25, 50, 75].forEach((S) => {
        e.beginPath(), e.moveTo(0, g(S)), e.lineTo(U, g(S)), e.stroke();
      }), e.setLineDash([]);
      const C = r?.adx?.adxColor || "#FFEB3B", k = r?.adx?.plusDIColor || "#22c55e", N = r?.adx?.minusDIColor || "#ef4444";
      e.strokeStyle = k, e.lineWidth = 1, e.beginPath();
      let B = !1;
      c.candles.forEach((S, R) => {
        const P = c.startIndex + R, $ = s.adx.plusDI[P];
        if (!isNaN($) && isFinite($)) {
          const J = ve(P, c.startIndex), he = g($);
          B ? e.lineTo(J, he) : (e.moveTo(J, he), B = !0);
        }
      }), e.stroke(), e.strokeStyle = N, e.beginPath(), B = !1, c.candles.forEach((S, R) => {
        const P = c.startIndex + R, $ = s.adx.minusDI[P];
        if (!isNaN($) && isFinite($)) {
          const J = ve(P, c.startIndex), he = g($);
          B ? e.lineTo(J, he) : (e.moveTo(J, he), B = !0);
        }
      }), e.stroke(), e.strokeStyle = C, e.lineWidth = 2, e.beginPath(), B = !1, c.candles.forEach((S, R) => {
        const P = c.startIndex + R, $ = s.adx.adx[P];
        if (!isNaN($) && isFinite($)) {
          const J = ve(P, c.startIndex), he = g($);
          B ? e.lineTo(J, he) : (e.moveTo(J, he), B = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Vt, [0, 25, 50, 75, 100].forEach((S) => {
        e.fillText(S.toString(), U + 5, g(S));
      });
      const F = dt.current !== null ? dt.current : c.startIndex + c.candles.length - 1, E = s.adx.adx[F];
      e.fillStyle = "#d1d5db", e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.fillText(`ADX ${r?.adx?.period || 14}`, 5, i + 15), e.fillStyle = C, e.fillText(!isNaN(E) && isFinite(E) ? E.toFixed(2) : "--", 73, i + 15), e.fillStyle = k, e.fillText("+DI", 118, i + 15), e.fillStyle = N, e.fillText("-DI", 148, i + 15), Hn.current.adx = 148 + e.measureText("-DI").width + 8, Qt.current.adx = { top: i, bottom: M }, _t = M;
    }
    if (s?.roc) {
      const D = ts, i = _t, M = i + D;
      e.strokeStyle = ne.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const g = c.candles.map((P, $) => s.roc[c.startIndex + $]).filter((P) => !isNaN(P) && isFinite(P)), C = g.length > 0 ? Math.max(5, Math.max(...g.map(Math.abs))) : 5, k = (P) => i + D / 2 - P / C * (D / 2);
      e.setLineDash([4, 4]), e.strokeStyle = "rgba(150, 150, 150, 0.5)", e.beginPath(), e.moveTo(0, k(0)), e.lineTo(U, k(0)), e.stroke(), e.setLineDash([]);
      const N = r?.roc?.color || "#9C27B0";
      e.strokeStyle = N, e.lineWidth = 1.5, e.beginPath();
      let B = !1;
      c.candles.forEach((P, $) => {
        const J = c.startIndex + $, he = s.roc[J];
        if (!isNaN(he) && isFinite(he)) {
          const z = ve(J, c.startIndex), Y = k(he);
          B ? e.lineTo(z, Y) : (e.moveTo(z, Y), B = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Vt, [-C, 0, C].forEach((P) => {
        e.fillText(P.toFixed(1) + "%", U + 5, k(P));
      }), e.fillStyle = "#d1d5db", e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
      const F = dt.current !== null ? dt.current : c.startIndex + c.candles.length - 1, E = s.roc[F], S = !isNaN(E) && isFinite(E) ? E.toFixed(2) + "%" : "--";
      e.fillText(`ROC ${r?.roc?.period || 12}`, 5, i + 15), e.fillStyle = N;
      const R = e.measureText(`ROC ${r?.roc?.period || 12}`).width;
      e.fillText(S, 13 + R, i + 15), Hn.current.roc = 13 + R + e.measureText(S).width + 8, Qt.current.roc = { top: i, bottom: M }, _t = M;
    }
    const Wo = {
      ctx: e,
      chartWidth: U,
      subplotHeight: ts,
      visible: c,
      indexToX: ve,
      currentCandleWidth: hn,
      subplotLabelFont: Vt,
      hoveredCandleIndex: dt.current,
      colors: { textDim: ne.textDim, grid: ne.grid },
      indicators: r,
      indicatorData: s,
      indicatorBounds: Qt.current,
      subplotLabelEndX: Hn.current,
      mainPriceToY: nt,
      mainChartHeight: Pe,
      skipIndicators: O,
      clickedIndicatorKey: It
    };
    if (ju(Wo), _t = Ru(Wo, _t), Pu(Wo), wt && wt.length > 0 && c.candles.length > 0) {
      const D = (P) => P ? P.toUpperCase().trim().slice(0, 2) : "??", i = (P) => {
        if (P.datetime) {
          const $ = new Date(P.datetime).getTime();
          if (!isNaN($)) return $;
        }
        if (!P.date) return null;
        try {
          const [$, J, he] = P.date.split("-").map(Number);
          if (!P.time) return Date.UTC($, J - 1, he, 12, 0);
          const z = P.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
          if (!z) return Date.UTC($, J - 1, he, 12, 0);
          let Y = parseInt(z[1]);
          const oe = parseInt(z[2]), me = z[3]?.toUpperCase();
          return me === "PM" && Y !== 12 ? Y += 12 : me === "AM" && Y === 12 && (Y = 0), Date.UTC($, J - 1, he, Y, oe);
        } catch {
          return null;
        }
      }, M = [];
      e.save();
      const g = { high: 0, medium: 1, low: 2 }, C = [], k = Date.now();
      for (const P of wt) {
        const $ = i(P);
        if (!$ || $ < k) continue;
        const J = l.length > 1 ? Math.abs(l[1].time - l[0].time) : 6e4, he = l[l.length - 1], z = he && $ > he.time + J;
        let Y, oe;
        if (z) {
          const le = ($ - he.time) / J, Ie = l.length - 1 + le;
          if (oe = Math.round(Ie), Y = ve(Ie, c.startIndex), Y < 0 || Y > U - 10) continue;
        } else {
          let Se = 0, le = l.length - 1;
          for (oe = -1; Se <= le; ) {
            const Te = Math.floor((Se + le) / 2);
            if (l[Te].time === $) {
              oe = Te;
              break;
            }
            l[Te].time < $ ? Se = Te + 1 : le = Te - 1;
          }
          if (oe === -1) {
            const Te = Se >= 0 && Se < l.length, Ue = le >= 0 && le < l.length;
            Te && Ue ? oe = Math.abs(l[Se].time - $) < Math.abs(l[le].time - $) ? Se : le : Te ? oe = Se : Ue ? oe = le : oe = l.length - 1;
          }
          const Ie = Math.abs(l[oe].time - $);
          if (oe < 0 || Ie > J || oe < c.startIndex || oe >= c.endIndex || (Y = ve(oe, c.startIndex), Y < 0 || Y > U)) continue;
        }
        const me = Lu({ event: P.event || "", country: P.region_code || "" });
        C.push({ x: Y, event: P, impact: me, ts: $, closestIdx: oe });
      }
      C.sort((P, $) => {
        const J = g[P.impact] ?? 3, he = g[$.impact] ?? 3;
        return J !== he ? J - he : (P.event.event || "").localeCompare($.event.event || "");
      });
      const N = /* @__PURE__ */ new Map();
      for (const P of C) {
        const $ = Math.round(P.x);
        N.has($) || N.set($, []), N.get($).push(P);
      }
      const B = document.documentElement.classList.contains("dark"), F = v - vt, E = 22, S = 32, R = F - E / 2 - 5;
      for (const [P, $] of N) {
        const J = $[0].x, he = $[0].impact, z = he === "high", Y = he === "low", oe = D($[0].event.region_code), me = Nu($[0].event.region_code), Se = $.length;
        M.push({
          x: J,
          y: R,
          event: $[0].event,
          impact: he,
          ts: $[0].ts,
          groupEvents: $.map((ft) => ({ event: ft.event, impact: ft.impact, ts: ft.ts }))
        });
        const le = z ? "#dc2626" : Y ? "#22c55e" : "#d97706";
        e.save(), e.shadowColor = B ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.15)", e.shadowBlur = 8, e.shadowOffsetY = 2;
        const Ie = J - S / 2, Te = R - E / 2;
        e.fillStyle = B ? "rgba(30, 41, 59, 0.92)" : "rgba(255, 255, 255, 0.95)", e.beginPath(), e.roundRect(Ie, Te, S, E, 6), e.fill(), e.shadowColor = "transparent", e.shadowBlur = 0, e.strokeStyle = B ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)", e.lineWidth = 1, e.stroke(), e.fillStyle = le, e.beginPath(), e.roundRect(Ie, Te, 3, E, [6, 0, 0, 6]), e.fill(), e.restore();
        const Ue = 18, ut = 13;
        if (me ? e.drawImage(me, J - Ue / 2, R - ut / 2, Ue, ut) : (e.font = 'bold 9px -apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif', e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = B ? "#e2e8f0" : "#334155", e.fillText(oe, J + 1, R)), Se > 1) {
          const ft = Ie + S - 2, Dt = Te - 2, yn = 7;
          e.beginPath(), e.arc(ft, Dt, yn, 0, Math.PI * 2), e.fillStyle = le, e.fill(), e.strokeStyle = B ? "#0f172a" : "#ffffff", e.lineWidth = 1.5, e.stroke(), e.font = 'bold 8px -apple-system, BlinkMacSystemFont, "Inter", sans-serif', e.fillStyle = "#ffffff", e.fillText(String(Se), ft, Dt + 0.5);
        }
        e.beginPath(), e.moveTo(J, R + E / 2), e.lineTo(J, F), e.strokeStyle = z ? "rgba(220, 38, 38, 0.3)" : Y ? "rgba(34, 197, 94, 0.25)" : "rgba(217, 119, 6, 0.3)", e.lineWidth = 1, e.setLineDash([2, 3]), e.stroke(), e.setLineDash([]);
      }
      e.restore(), Is.current = M;
    } else
      Is.current = [];
    if (e.strokeStyle = ne.axisLine || ne.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, v - vt), e.lineTo(m, v - vt), e.stroke(), He.versionLabelVisible) {
      const D = Xn === 0 ? 0 : He.versionLabelXOffset, i = U + Xe / 2 + D, M = v - vt / 2 + 1;
      e.save(), e.font = 'bold 11px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = ne.text, e.fillText("v.23", i, M), e.restore();
    }
    if (c.candles.length > 0) {
      const D = hn * (1 + Ve), i = Math.max(1, Math.floor(80 / D)), M = v - vt, g = M + 16;
      if (e.font = ir, e.textAlign = "center", e.textBaseline = "middle", e.save(), e.beginPath(), e.rect(0, M, U, vt), e.clip(), !c.candles || c.candles.length === 0) {
        e.restore();
        return;
      }
      const C = c.candles[0], k = c.candles[c.candles.length - 1];
      if (!C || !k) {
        e.restore();
        return;
      }
      const N = (/* @__PURE__ */ new Date()).getFullYear(), B = new Date(C.time).getFullYear(), F = new Date(k.time).getFullYear(), E = B !== F, S = B !== N || F !== N, R = c.candles[1], P = R ? R.time - C.time : 6e4, J = P / 6e4 >= 60;
      let he = "", z = -1, Y = -1 / 0;
      const oe = 12, me = (le, Ie) => {
        if (J) {
          const ut = es(le, S || E || Ie !== z);
          return ut !== he ? (he = ut, z = Ie, ut) : Rs(le);
        }
        const Te = es(le, !1);
        return Ie !== z && z !== -1 ? (z = Ie, es(le, !0)) : Te !== he ? (he = Te, z = Ie, es(le, S)) : Rs(le);
      }, Se = xe.width < 400;
      if (He.useFixedTimeAxisLabels) {
        const le = Se ? He.fixedTimeAxisLabelCountSmall : He.fixedTimeAxisLabelCount, Ie = 5, Te = U - Ie * 2;
        for (let Ue = 0; Ue < le; Ue++) {
          const ut = Ie + Te * (Ue + 0.5) / le, ft = rl(ut, c.startIndex), Dt = Math.round(ft) - c.startIndex, yn = Dt >= 0 && Dt < c.candles.length ? c.candles[Dt] : null, Bn = yn ? yn.time : C.time + (ft - c.startIndex) * P, Pt = yn ? ve(c.startIndex + Dt, c.startIndex) : ut, Bt = new Date(Bn).getFullYear(), yt = me(Bn, Bt);
          e.fillStyle = ne.axisLabel, e.fillText(yt, Pt, g);
        }
      } else {
        const Ue = [
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
        ], ut = i * P;
        let ft = Ue[Ue.length - 1];
        for (const Pt of Ue)
          if (Pt >= ut) {
            ft = Pt;
            break;
          }
        const Dt = Math.ceil(C.time / ft) * ft, yn = k.time + ft * 25;
        let Bn = -1;
        for (let Pt = Dt; Pt <= yn; Pt += ft) {
          let Bt, yt = Pt;
          if (Pt <= k.time) {
            let Gt = 0, Ns = c.candles.length - 1, dl = Ns;
            for (; Gt <= Ns; ) {
              const zl = Gt + Ns >> 1;
              c.candles[zl].time >= Pt ? (dl = zl, Ns = zl - 1) : Gt = zl + 1;
            }
            if (dl === Bn) continue;
            Bn = dl, yt = c.candles[dl].time, Bt = ve(c.startIndex + dl, c.startIndex);
          } else {
            const Gt = c.startIndex + (c.candles.length - 1) + (Pt - k.time) / P;
            Bt = ve(Gt, c.startIndex);
          }
          if (Bt < 2 || Bt > U - 10) continue;
          const Vn = me(yt, new Date(yt).getFullYear()), tn = e.measureText(Vn).width, $t = Bt - tn / 2, fn = Bt + tn / 2;
          $t < Y + oe || fn > U - 10 || $t < 2 || (e.fillStyle = ne.axisLabel, e.fillText(Vn, Bt, g), Y = fn);
        }
      }
      e.restore(), (Vs.length > 0 || Ls.length > 0) && (e.save(), Vs.forEach((le) => {
        e.fillStyle = Ao, e.beginPath(), e.roundRect(le.topOrigin, Do, le.bWidth, ul, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.font = Yl, e.fillText(le.text, le.topOrigin + le.bWidth / 2, Do + ul / 2);
      }), Ls.forEach((le) => {
        e.fillStyle = Ao, e.beginPath(), e.roundRect(Bo, le.topOrigin, le.bWidth, ul, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.font = Yl, e.fillText(le.text, Bo + le.bWidth / 2, le.topOrigin + ul / 2);
      }), e.restore());
    }
    const Fo = p.getContext("2d");
    Fo && (Fo.setTransform(1, 0, 0, 1, 0, 0), Fo.drawImage(f, 0, 0)), Yn.current = {
      startIndex: Sr,
      candleWidth: hn
    }, Mt.current && Un.current?.();
  }, [xe, l, n, ie, ne, s, G, En, js, An, Rs, es, hr, Rl, Sn, I, r, q, it, wt, pt, It, ss, ws]);
  Cn.current = ps, o.useEffect(() => {
    Ks && (Ks.current = () => {
      tt(!0);
    });
  }, [Ks]);
  const Ft = o.useCallback(() => {
    const a = Ge.current, p = a?.getContext("2d");
    if (!a || !p) return;
    const m = {
      ctx: p,
      dimensions: xe,
      dpr: Sn,
      candles: l,
      colors: ne,
      viewState: ie,
      indicatorData: s,
      indicators: r,
      indicatorHeightRatio: G,
      showOHLC: Qn,
      isDesktop: Nl,
      PRICE_AXIS_WIDTH: Xe,
      TIME_AXIS_HEIGHT: vt,
      PRICE_LABEL_FONT: El,
      TIME_LABEL_FONT: ir,
      crosshair: _n.current,
      isScrolling: Mt.current,
      scrollState: {
        startIndex: Le.current.startIndex,
        candleWidth: Le.current.candleWidth
      },
      isDraggingHandle: !!at.current,
      isHoveredSLTP: !!Fn.current,
      sessionControlHovered: uo.current,
      isSyncedUpdate: Us.current,
      syncedCrosshairTime: Tl.current ?? void 0,
      hoveredEvent: pn.current || Ts.current,
      currentOhlcTextWidth: er,
      currentBbTextEndX: ho,
      currentMaTextEndX: fo,
      currentVwapTextEndX: po,
      currentVpTextEndX: xo,
      currentVolTextEndX: mo,
      overlayLabelEndXPrev: _s.current,
      subplotLabelEndXPrev: nr,
      getVisibleCandles: En,
      getPriceRange: js,
      yToPrice: ur,
      xToIndex: rl,
      indexToX: dr,
      formatPrice: An,
      formatTime: Rs,
      formatDate: es,
      callbacks: {
        setOhlcTextWidth: na,
        setBbTextEndX: la,
        setMaTextEndX: oa,
        setVwapTextEndX: ra,
        setVpTextEndX: aa,
        setVolTextEndX: ca,
        setOverlayLabelEndX: (v) => {
          _s.current = v, ia(v);
        },
        setSubplotLabelEndX: ua,
        onCrosshairMove: se
      }
    };
    Eu(m);
  }, [xe, l, ie, ne, s, r, G, En, js, ur, rl, dr, An, Rs, es, se, Sn, Qn, re]);
  o.useEffect(() => {
    On.current = Ft;
  }, [Ft]), o.useEffect(() => {
    Jt.current = ne?.crosshairStyle || "standard", Ge.current && (Ge.current.style.cursor = Jt.current !== "standard" ? "none" : "crosshair");
  }, [ne?.crosshairStyle]);
  const {
    handleZoomIn: xa,
    handleZoomOut: ma,
    handleResetView: ba,
    handleResetYAxis: ga,
    handleMoveLeft: va,
    handleMoveRight: ya,
    handleYAxisMouseDown: ka,
    handleYAxisTouchStart: wa,
    handleYAxisWheel: yo
  } = Au({
    minCandleWidth: Al,
    maxCandleWidth: Dl,
    priceAxisWidth: Xe,
    timeAxisHeight: vt,
    dimensions: xe,
    candlesLength: l.length,
    disableAutoFollow: fe,
    livePrice: n ?? null,
    scrollStateRef: Le,
    drawChartRef: Cn,
    notifyScrollSync: St,
    getVisibleCandles: En,
    getPriceRange: js,
    setViewState: Nt,
    setPriceScale: De,
    setPriceOffset: ds,
    setFixedPriceCenter: jt,
    setFixedPriceRange: Qr,
    setIsScalingYAxis: co,
    fixedPriceCenter: Kt,
    priceScale: Ht,
    priceOffset: xt,
    viewStateAutoFollowLatest: ie.autoFollowLatest,
    yAxisScaleStartRef: tl,
    priceScaleRef: gn,
    priceOffsetRef: Zn,
    yAxisDebounceRef: Jn
  }), Sa = o.useCallback((a) => {
    const p = Ge.current;
    if (!p) return;
    const m = p.getBoundingClientRect(), v = a.clientX - m.left, f = a.clientY - m.top;
    if (("ontouchstart" in window || navigator.maxTouchPoints > 0) && !Pn && !jn && !at.current)
      return;
    if (_n.current = { x: v, y: f }, !jn && !at.current && r && s) {
      const w = on.current, A = rn.current;
      if (w && A > 0 && f < A) {
        const X = Le.current, u = X.candleWidth * (1 + Ve), L = Math.max(0, Math.floor(X.startIndex)), x = L + Math.round(v / u), V = 8, d = (Q) => isNaN(Q) || !isFinite(Q) ? !1 : Math.abs(f - (A - (Q - w.min) / w.range * A)) < V;
        let j = null;
        if (!j && r.movingAverages?.enabled && s.movingAverages) {
          for (const Q of s.movingAverages)
            if (x >= 0 && x < Q.data.length && d(Q.data[x])) {
              j = "movingAverages";
              break;
            }
        }
        if (!j && r.bollinger?.enabled && s.bollinger) {
          const Q = s.bollinger;
          x >= 0 && x < Q.upper.length && (d(Q.upper[x]) || d(Q.middle[x]) || d(Q.lower[x])) && (j = "bollinger");
        }
        if (!j && r.vwap?.enabled && s.vwap && x >= 0 && x < s.vwap.length && d(s.vwap[x]) && (j = "vwap"), !j && r.supertrend?.enabled && s.supertrend && x >= 0 && x < s.supertrend.length && s.supertrend[x] && d(s.supertrend[x].value) && (j = "supertrend"), !j && r.ichimoku?.enabled && s.ichimoku) {
          const Q = s.ichimoku;
          x >= 0 && x < Q.tenkan.length && (d(Q.tenkan[x]) || d(Q.kijun[x]) || d(Q.senkouA[x]) || d(Q.senkouB[x])) && (j = "ichimoku");
        }
        if (!j && r.keltner?.enabled && s.keltner) {
          const Q = s.keltner;
          x >= 0 && x < Q.upper.length && (d(Q.upper[x]) || d(Q.middle[x]) || d(Q.lower[x])) && (j = "keltner");
        }
        if (!j && r.donchian?.enabled && s.donchian) {
          const Q = s.donchian;
          x >= 0 && x < Q.upper.length && (d(Q.upper[x]) || d(Q.middle[x]) || d(Q.lower[x])) && (j = "donchian");
        }
        if (!j && r.envelopes?.enabled && s.envelopes) {
          const Q = s.envelopes;
          x >= 0 && x < Q.upper.length && (d(Q.upper[x]) || d(Q.basis[x]) || d(Q.lower[x])) && (j = "envelopes");
        }
        if (!j && r?.volume?.enabled && A > 0 && f >= A * 0.8 && f <= A) {
          const Q = x - L, Oe = En();
          if (Q >= 0 && Q < Oe.candles.length) {
            const Z = Oe.candles[Q].volume ?? 0;
            if (Z > 0) {
              const je = A * 0.2, Ke = A, _e = Oe.candles.map((Ye) => Ye.volume ?? 0).filter((Ye) => Ye > 0), de = _e.length > 0 ? Math.max(..._e) : 1, Re = Z / de * je * 0.95, Je = Ke - Re;
              f >= Je && (j = "volume");
            }
          }
        }
        const ue = xe.width - Xe;
        if (!j && r?.volumeProfile?.enabled && A > 0 && v >= ue * (1 - (r.volumeProfile.rowWidth ?? 15) / 100)) {
          const Q = En();
          if (Q.candles.length > 0) {
            const Oe = r.volumeProfile.numberOfRows ?? 48, Z = ue * ((r.volumeProfile.rowWidth ?? 15) / 100), je = r.volumeProfile.lookbackBars ?? 0, Ke = je > 0 ? Q.candles.slice(-je) : Q.candles;
            let _e = 1 / 0, de = -1 / 0;
            Ke.forEach((Ye) => {
              _e = Math.min(_e, Ye.low), de = Math.max(de, Ye.high);
            });
            const Re = (de - _e || 1) / Oe, Je = on.current;
            if (Je && Je.range > 0) {
              const Ye = Je.max - f / A * Je.range, Ot = Math.floor((Ye - _e) / Re);
              if (Ot >= 0 && Ot < Oe) {
                const vn = new Float64Array(Oe);
                Ke.forEach((Rt) => {
                  if (!(!Rt.volume || Rt.volume <= 0))
                    for (let bs = 0; bs < Oe; bs++) {
                      const cl = _e + bs * Re, $l = cl + Re;
                      if (Rt.high >= cl && Rt.low <= $l) {
                        const To = Math.max(Rt.low, cl), Mo = Math.min(Rt.high, $l), jo = Rt.high - Rt.low > 0 ? (Mo - To) / (Rt.high - Rt.low) : 1;
                        vn[bs] += Rt.volume * jo;
                      }
                    }
                });
                let Ut = 0;
                for (let Rt = 0; Rt < Oe; Rt++)
                  vn[Rt] > Ut && (Ut = vn[Rt]);
                const _l = vn[Ot];
                if (_l > 0 && Ut > 0) {
                  const Rt = _l / Ut * Z, bs = ue - Rt;
                  v >= bs && (j = "volumeProfile");
                }
              }
            }
          }
        }
        if (!j && r.customIndicators) {
          const Oe = (Z) => isNaN(Z) || !isFinite(Z) ? !1 : Math.abs(f - (A - (Z - w.min) / w.range * A)) < 14;
          for (const Z of r.customIndicators) {
            const je = Z.data;
            if (!(!Z.enabled || Z.display !== "overlay" || !je) && x >= 0 && x < je.length && Oe(je[x])) {
              const Ke = Z.scriptId;
              j = typeof Z.expression == "string" && Z.expression.startsWith("brue:") && Ke ? `script-${Ke}` : `ci-${Z.id}`;
              break;
            }
          }
        }
        if (!j) {
          const Q = Qt.current, Oe = [];
          if (r.rsi?.enabled && s.rsi) {
            const Z = Q.rsi;
            Oe.push({ key: "sp-rsi", check: () => {
              if (!Z || f < Z.top || f > Z.bottom || x < 0 || x >= s.rsi.length) return !1;
              const je = s.rsi[x];
              if (isNaN(je) || !isFinite(je)) return !1;
              const Ke = Z.bottom - Z.top;
              return Math.abs(f - (Z.top + Ke - je / 100 * Ke)) < V;
            } });
          }
          if (r.macd?.enabled && s.macd) {
            const Z = Q.macd;
            Oe.push({ key: "sp-macd", check: () => !(!Z || f < Z.top || f > Z.bottom) });
          }
          if (r.stochastic?.enabled && s.stochastic) {
            const Z = Q.stochastic;
            Oe.push({ key: "sp-stochastic", check: () => {
              if (!Z || f < Z.top || f > Z.bottom || x < 0 || x >= s.stochastic.k.length) return !1;
              const je = Z.bottom - Z.top, Ke = Z.top + je - s.stochastic.k[x] / 100 * je, _e = Z.top + je - s.stochastic.d[x] / 100 * je;
              return Math.abs(f - Ke) < V || Math.abs(f - _e) < V;
            } });
          }
          if (r.atr?.enabled && s.atr) {
            const Z = Q.atr;
            Oe.push({ key: "sp-atr", check: () => !(!Z || f < Z.top || f > Z.bottom) });
          }
          for (const Z of Oe)
            if (Z.check()) {
              j = Z.key;
              break;
            }
        }
        const We = Ms.current;
        if (Ms.current = j, j !== We && Ge.current) {
          const Q = Jt.current !== "standard" ? "none" : "crosshair";
          Ge.current.style.cursor = j ? "pointer" : Q;
        }
      } else if (Ms.current && (Ms.current = null, Ge.current && !lr.current)) {
        const X = Jt.current !== "standard" ? "none" : "crosshair";
        Ge.current.style.cursor = X;
      }
    }
    const O = rn.current, H = xe.height;
    if (O > 0 && Ge.current) {
      if (f > O && f < H - 30)
        Ge.current.style.cursor = "pointer";
      else if (f <= O && !Ms.current && !lr.current) {
        const w = Jt.current !== "standard" ? "none" : "crosshair";
        Ge.current.style.cursor = w;
      }
    }
    let K = !1;
    for (const w of Is.current) {
      const A = v - w.x, X = f - w.y;
      if (Math.sqrt(A * A + X * X) < 16) {
        Ts.current = w, K = !0, Ge.current && (Ge.current.style.cursor = "pointer");
        break;
      }
    }
    if (K || (Ts.current = null), at.current) {
      const w = on.current, A = rn.current;
      if (w && w.range > 0 && A > 0) {
        const X = w.max - f / A * w.range;
        at.current === "sl" ? ct.current = X : rt.current = X, Ge.current && (Ge.current.style.cursor = ce), bn.current === null && (bn.current = requestAnimationFrame(() => {
          tt(!1), bn.current = null;
        }));
        return;
      }
    }
    if (ze && ze.length > 0) {
      const w = on.current, A = rn.current;
      if (w && w.range > 0 && A > 0) {
        let X = !1;
        for (const u of ze) {
          const L = (w.max - u.price) / w.range * A;
          if (v <= 160 && Math.abs(f - L) < 12) {
            X = !0;
            break;
          }
          if (u.id === Ne.current) {
            const V = Math.min(L + 10, A - 22 - 4), d = xe.width - Xe, j = 144 + 5 * 2, ue = (d - j) / 2;
            if (v >= ue - 8 && v <= ue + j + 8 && f >= V - 8 && f <= V + 22 + 8) {
              X = !0;
              break;
            }
          }
        }
        X && Ge.current && (Ge.current.style.cursor = "pointer");
      }
    }
    if (Ne.current && ze && ze.length > 0) {
      const w = on.current, A = rn.current;
      if (w && w.range > 0 && A > 0) {
        const X = w.max - f / A * w.range, u = w.range * 0.012, L = ze.find((x) => x.id === Ne.current);
        if (L) {
          const x = L.side === "buy", V = Kn(L.price), d = ct.current ?? L.stopLoss ?? (x ? L.price - V : L.price + V), j = rt.current ?? L.takeProfit ?? (x ? L.price + V : L.price - V), ue = Math.abs(X - d) < u, We = Math.abs(X - j) < u;
          if (ue || We)
            Ge.current && (Ge.current.style.cursor = y), Fn.current = ue ? "sl" : "tp", tt(!1);
          else if (Fn.current && (Fn.current = null, tt(!1)), Ge.current) {
            const Q = Jt.current !== "standard" ? "none" : "crosshair";
            Ge.current.style.cursor !== Q && (Ge.current.style.cursor = Q);
          }
        }
      }
    }
    if (jn) {
      if (a.buttons === 0) {
        cs(!1), Wt(!1);
        return;
      }
      Wt(!0);
      const w = v - xn.x, A = f - xn.y, X = ie.candleWidth * (1 + Ve), u = w / X, L = Math.max(
        0,
        Math.min(l.length - 10, xn.startIndex - u)
      );
      if (Le.current = {
        startIndex: L,
        candleWidth: ie.candleWidth
      }, hs && At !== null) {
        const x = At / gn.current / (xe.height - vt), V = A * x;
        Zn.current = xn.priceOffset + V;
      }
      $n.current === null && ($n.current = requestAnimationFrame(() => {
        tt(!0), Ft(), St(), $n.current = null;
      })), Ct.current && clearTimeout(Ct.current), Ct.current = setTimeout(() => {
        const x = Le.current;
        Nt((V) => ({
          ...V,
          startIndex: x.startIndex,
          // Keep float precision - no rounding
          autoFollowLatest: !1
        })), hs && ds(Zn.current), Wt(!1);
      }, 100);
      return;
    }
    const _ = En(), b = rl(v, _.startIndex);
    b >= 0 && b < l.length ? dt.current = b : dt.current = null, Ft();
  }, [jn, xn, ie.candleWidth, l.length, hs, At, Ht, xe.height, Ft, Pn, En, rl, l]), Ca = o.useCallback((a) => {
    const p = Ge.current;
    if (!p) return;
    const m = p.getBoundingClientRect(), v = a.clientX - m.left, f = a.clientY - m.top;
    let e = !1;
    for (const _ of Is.current) {
      const b = v - _.x, w = f - _.y;
      if (Math.sqrt(b * b + w * w) < 16) {
        e = !0, pn.current && pn.current.ts === _.ts && pn.current.x === _.x ? pn.current = null : pn.current = _, On.current && On.current();
        return;
      }
    }
    if (pn.current && !e && (pn.current = null, On.current && On.current()), Qn && r) {
      const _ = [
        { key: "bollinger", title: "BB", enabledCheck: () => !!(r?.bollinger?.enabled && s?.bollinger), endXSource: () => ho },
        { key: "movingAverages", title: "MA", enabledCheck: () => !!(r?.movingAverages?.enabled && s?.movingAverages), endXSource: () => fo },
        { key: "vwap", title: "VWAP", enabledCheck: () => !!(r?.vwap?.enabled && s?.vwap), endXSource: () => po },
        { key: "ichimoku", title: "Ichimoku", enabledCheck: () => !!(r?.ichimoku?.enabled && s?.ichimoku), endXSource: () => ot.ichimoku || 0 },
        { key: "keltner", title: "Keltner", enabledCheck: () => !!(r?.keltner?.enabled && s?.keltner), endXSource: () => ot.keltner || 0 },
        { key: "volumeProfile", title: "Vol Profile", enabledCheck: () => !!r?.volumeProfile?.enabled, endXSource: () => xo },
        { key: "volume", title: "Volume", enabledCheck: () => !!(r?.volume?.enabled && l.some((w) => w.volume)), endXSource: () => mo },
        { key: "supertrend", title: "Supertrend", enabledCheck: () => !!(r?.supertrend?.enabled && s?.supertrend), endXSource: () => ot.supertrend || 0 },
        { key: "donchian", title: "Donchian", enabledCheck: () => !!(r?.donchian?.enabled && s?.donchian), endXSource: () => ot.donchian || 0 },
        { key: "envelopes", title: "Envelopes", enabledCheck: () => !!(r?.envelopes?.enabled && s?.envelopes), endXSource: () => ot.envelopes || 0 },
        // Phase 2 overlays
        { key: "alma", title: "ALMA", enabledCheck: () => !!(r?.alma?.enabled && s?.alma), endXSource: () => ot.alma || 0 },
        { key: "kama", title: "KAMA", enabledCheck: () => !!(r?.kama?.enabled && s?.kama), endXSource: () => ot.kama || 0 },
        { key: "zlema", title: "ZLEMA", enabledCheck: () => !!(r?.zlema?.enabled && s?.zlema), endXSource: () => ot.zlema || 0 },
        { key: "t3", title: "T3", enabledCheck: () => !!(r?.t3?.enabled && s?.t3), endXSource: () => ot.t3 || 0 },
        { key: "lsma", title: "LSMA", enabledCheck: () => !!(r?.lsma?.enabled && s?.lsma), endXSource: () => ot.lsma || 0 },
        { key: "mcginley", title: "McGinley", enabledCheck: () => !!(r?.mcginley?.enabled && s?.mcginley), endXSource: () => ot.mcginley || 0 },
        { key: "wma", title: "WMA", enabledCheck: () => !!(r?.wma?.enabled && s?.wma), endXSource: () => ot.wma || 0 },
        { key: "smmaOverlay", title: "SMMA", enabledCheck: () => !!(r?.smmaOverlay?.enabled && s?.smmaOverlay), endXSource: () => ot.smmaOverlay || 0 },
        { key: "vwma", title: "VWMA", enabledCheck: () => !!(r?.vwma?.enabled && s?.vwma), endXSource: () => ot.vwma || 0 },
        { key: "medianPrice", title: "Median", enabledCheck: () => !!(r?.medianPrice?.enabled && s?.medianPrice), endXSource: () => ot.medianPrice || 0 },
        { key: "typicalPrice", title: "Typical", enabledCheck: () => !!(r?.typicalPrice?.enabled && s?.typicalPrice), endXSource: () => ot.typicalPrice || 0 },
        { key: "weightedClose", title: "WClose", enabledCheck: () => !!(r?.weightedClose?.enabled && s?.weightedClose), endXSource: () => ot.weightedClose || 0 },
        { key: "zigzag", title: "ZigZag", enabledCheck: () => !!(r?.zigzag?.enabled && s?.zigzag), endXSource: () => ot.zigzag || 0 },
        { key: "alligator", title: "Alligator", enabledCheck: () => !!(r?.alligator?.enabled && s?.alligator), endXSource: () => ot.alligator || 0 },
        { key: "priceChannel", title: "Price Ch", enabledCheck: () => !!(r?.priceChannel?.enabled && s?.priceChannel), endXSource: () => ot.priceChannel || 0 },
        { key: "chandeKroll", title: "Chande Kroll", enabledCheck: () => !!(r?.chandeKroll?.enabled && s?.chandeKroll), endXSource: () => ot.chandeKroll || 0 },
        { key: "chandelierExit", title: "Chandelier", enabledCheck: () => !!(r?.chandelierExit?.enabled && s?.chandelierExit), endXSource: () => ot.chandelierExit || 0 },
        { key: "accBands", title: "Acc Bands", enabledCheck: () => !!(r?.accBands?.enabled && s?.accBands), endXSource: () => ot.accBands || 0 },
        { key: "demarkPivots", title: "DeMark", enabledCheck: () => !!(r?.demarkPivots?.enabled && s?.demarkPivots), endXSource: () => ot.demarkPivots || 0 },
        { key: "fractals", title: "Fractals", enabledCheck: () => !!(r?.fractals?.enabled && s?.fractals), endXSource: () => ot.fractals || 0 }
      ];
      let b = 28;
      for (const w of _) {
        if (!w.enabledCheck()) continue;
        const A = xe.width < 500 ? 14 : 19, X = w.endXSource();
        if (w.key === "movingAverages" && s?.movingAverages?.length > 0) {
          const L = r.movingAverages?.lines ?? [], x = r?.customBrueScripts || {};
          let V = 0;
          for (let d = 0; d < s.movingAverages.length; d++) {
            const j = L[d]?.sourceScriptId;
            if (j && x[j]?.enabled) continue;
            const ue = b + V * A - 10, We = ue + A;
            if (X > 0 && v >= 0 && v <= X && f >= ue && f <= We) {
              const Q = `movingAverages__${d}`;
              pe((Oe) => Oe === Q ? null : Q), ye(Q);
              return;
            }
            V++;
          }
          b += V * A;
          continue;
        }
        const u = A;
        if (X > 0 && v >= 0 && v <= X && f >= b - 10 && f <= b - 10 + u) {
          pe((L) => L === w.key ? null : w.key), ye(w.key);
          return;
        }
        b += u;
      }
    }
    if (r && s) {
      const _ = on.current, b = rn.current;
      if (_ && b > 0) {
        const w = Le.current, A = w.candleWidth * (1 + Ve);
        xe.width - Xe;
        const u = Math.max(0, Math.floor(w.startIndex)) + Math.round(v / A), L = 8, x = (d) => {
          if (isNaN(d) || !isFinite(d)) return !1;
          const j = b - (d - _.min) / _.range * b;
          return Math.abs(f - j) < L;
        };
        if (r.movingAverages?.enabled && s.movingAverages)
          for (let d = 0; d < s.movingAverages.length; d++) {
            const j = s.movingAverages[d];
            if (u >= 0 && u < j.data.length && x(j.data[u])) {
              const ue = `movingAverages__${d}`;
              pe((We) => We === ue ? null : ue), ye(ue);
              return;
            }
          }
        if (r.bollinger?.enabled && s.bollinger) {
          const d = s.bollinger;
          if (u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.middle[u]) || x(d.lower[u]))) {
            pe((j) => j === "bollinger" ? null : "bollinger"), ye("bollinger");
            return;
          }
        }
        if (r.vwap?.enabled && s.vwap && u >= 0 && u < s.vwap.length && x(s.vwap[u])) {
          pe((d) => d === "vwap" ? null : "vwap"), ye("vwap");
          return;
        }
        if (r.supertrend?.enabled && s.supertrend && u >= 0 && u < s.supertrend.length) {
          const d = s.supertrend[u];
          if (d && x(d.value)) {
            pe((j) => j === "supertrend" ? null : "supertrend"), ye("supertrend");
            return;
          }
        }
        if (r.ichimoku?.enabled && s.ichimoku) {
          const d = s.ichimoku;
          if (u >= 0 && u < d.tenkan.length && (x(d.tenkan[u]) || x(d.kijun[u]) || x(d.senkouA[u]) || x(d.senkouB[u]))) {
            pe((j) => j === "ichimoku" ? null : "ichimoku"), ye("ichimoku");
            return;
          }
        }
        if (r.keltner?.enabled && s.keltner) {
          const d = s.keltner;
          if (u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.middle[u]) || x(d.lower[u]))) {
            pe((j) => j === "keltner" ? null : "keltner"), ye("keltner");
            return;
          }
        }
        if (r.donchian?.enabled && s.donchian) {
          const d = s.donchian;
          if (u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.middle[u]) || x(d.lower[u]))) {
            pe((j) => j === "donchian" ? null : "donchian"), ye("donchian");
            return;
          }
        }
        if (r.envelopes?.enabled && s.envelopes) {
          const d = s.envelopes;
          if (u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.basis[u]) || x(d.lower[u]))) {
            pe((j) => j === "envelopes" ? null : "envelopes"), ye("envelopes");
            return;
          }
        }
        const V = ["dema", "tema", "hma"];
        for (const d of V)
          if (r[d]?.enabled && s[d]) {
            const j = s[d];
            if (Array.isArray(j) && u >= 0 && u < j.length && x(j[u])) {
              pe((ue) => ue === d ? null : d), ye(d);
              return;
            }
          }
      }
    }
    if (r?.volume?.enabled) {
      const _ = rn.current;
      if (_ > 0 && f >= _ * 0.8 && f <= _) {
        pe((b) => b === "volume" ? null : "volume"), ye("volume");
        return;
      }
    }
    if (Ms.current === "volumeProfile") {
      pe((_) => _ === "volumeProfile" ? null : "volumeProfile"), ye("volumeProfile");
      return;
    }
    const O = Ms.current;
    if (O && (O.startsWith("ci-") || O.startsWith("script-"))) {
      pe((_) => _ === O ? null : O), ye(O);
      return;
    }
    const H = Qt.current, K = [
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
    for (const _ of K) {
      const b = H[_];
      if (b && f >= b.top && f <= b.top + 25 && v <= 200) {
        const w = `sp-${_}`;
        pe((A) => A === w ? null : w), ye(w);
        return;
      }
    }
    if (r && s) {
      const _ = Le.current, b = _.candleWidth * (1 + Ve), w = Math.max(0, Math.floor(_.startIndex)), A = w + Math.round(v / b), X = 10, u = (x, V) => {
        if (!V) return !1;
        const d = H[x];
        if (!d || f < d.top || f > d.bottom || A < 0 || A >= V.length) return !1;
        const j = V[A];
        if (isNaN(j) || !isFinite(j)) return !1;
        const ue = d.bottom - d.top, We = d.top + ue - j / 100 * ue;
        return Math.abs(f - We) < X;
      }, L = (x, V) => {
        const d = H[x];
        if (!d || f < d.top || f > d.bottom) return !1;
        const j = d.bottom - d.top;
        let ue = 1 / 0, We = -1 / 0;
        const Q = xe.width - Xe, Oe = Math.floor(Q / b), Z = Math.max(0, w), je = Math.min(Z + Oe, V[0]?.length ?? 0);
        for (const Re of V)
          if (Re)
            for (let Je = Z; Je < je; Je++) {
              const Ye = Re[Je];
              !isNaN(Ye) && isFinite(Ye) && (Ye < ue && (ue = Ye), Ye > We && (We = Ye));
            }
        if (ue >= We) return !1;
        const _e = (We - ue) * 0.1;
        ue -= _e, We += _e;
        const de = We - ue;
        if (A < 0) return !1;
        for (const Re of V) {
          if (!Re || A >= Re.length) continue;
          const Je = Re[A];
          if (isNaN(Je) || !isFinite(Je)) continue;
          const Ye = d.top + j - (Je - ue) / de * j;
          if (Math.abs(f - Ye) < X) return !0;
        }
        return !1;
      };
      if (r.rsi?.enabled && u("rsi", s.rsi)) {
        pe((x) => x === "sp-rsi" ? null : "sp-rsi"), ye("sp-rsi");
        return;
      }
      if (r.stochastic?.enabled && s.stochastic && (u("stochastic", s.stochastic.k) || u("stochastic", s.stochastic.d))) {
        pe((x) => x === "sp-stochastic" ? null : "sp-stochastic"), ye("sp-stochastic");
        return;
      }
      if (r.macd?.enabled && s.macd && L("macd", [s.macd.macd, s.macd.signal])) {
        pe((x) => x === "sp-macd" ? null : "sp-macd"), ye("sp-macd");
        return;
      }
      if (r.atr?.enabled && s.atr && L("atr", [s.atr])) {
        pe((x) => x === "sp-atr" ? null : "sp-atr"), ye("sp-atr");
        return;
      }
      if (r.williamsR?.enabled && s.williamsR) {
        const x = H.williamsR;
        if (x && f >= x.top && f <= x.bottom && A >= 0 && A < s.williamsR.length) {
          const V = s.williamsR[A];
          if (!isNaN(V) && isFinite(V)) {
            const d = x.bottom - x.top, j = x.top + d - (V + 100) / 100 * d;
            if (Math.abs(f - j) < X) {
              pe((ue) => ue === "sp-williamsR" ? null : "sp-williamsR"), ye("sp-williamsR");
              return;
            }
          }
        }
      }
      if (r.cci?.enabled && s.cci && L("cci", [s.cci])) {
        pe((x) => x === "sp-cci" ? null : "sp-cci"), ye("sp-cci");
        return;
      }
      if (r.adx?.enabled && s.adx && (u("adx", s.adx.adx) || u("adx", s.adx.plusDI) || u("adx", s.adx.minusDI))) {
        pe((x) => x === "sp-adx" ? null : "sp-adx"), ye("sp-adx");
        return;
      }
      if (r.roc?.enabled && s.roc && L("roc", [s.roc])) {
        pe((x) => x === "sp-roc" ? null : "sp-roc"), ye("sp-roc");
        return;
      }
      if (r.aroon?.enabled && s.aroon && (u("aroon", s.aroon.up) || u("aroon", s.aroon.down))) {
        pe((x) => x === "sp-aroon" ? null : "sp-aroon"), ye("sp-aroon");
        return;
      }
      if (r.tsi?.enabled && s.tsi && L("tsi", [s.tsi.tsi, s.tsi.signal])) {
        pe((x) => x === "sp-tsi" ? null : "sp-tsi"), ye("sp-tsi");
        return;
      }
      if (r.trix?.enabled && s.trix && L("trix", [s.trix.trix, s.trix.signal])) {
        pe((x) => x === "sp-trix" ? null : "sp-trix"), ye("sp-trix");
        return;
      }
      if (r.kst?.enabled && s.kst && L("kst", [s.kst.kst, s.kst.signal])) {
        pe((x) => x === "sp-kst" ? null : "sp-kst"), ye("sp-kst");
        return;
      }
      if (r.stochRsi?.enabled && s.stochRsi && (u("stochRsi", s.stochRsi.k) || u("stochRsi", s.stochRsi.d))) {
        pe((x) => x === "sp-stochRsi" ? null : "sp-stochRsi"), ye("sp-stochRsi");
        return;
      }
      for (const x of K) {
        const V = H[x];
        if (V && f >= V.top && f <= V.bottom) {
          const d = s[x];
          if (d && Array.isArray(d) && L(x, [d])) {
            const j = `sp-${x}`;
            pe((ue) => ue === j ? null : j), ye(j);
            return;
          }
        }
      }
    }
    if (sl && $s(null), It && pe(null), Nn && gt(null), ze && ze.length > 0 && Date.now() - zn.current > 500) {
      const _ = on.current, b = rn.current;
      if (_ && _.range > 0 && b > 0) {
        const w = _.max - f / b * _.range, A = _.range * 6e-3;
        if (Ne.current) {
          const u = ze.find((L) => L.id === Ne.current);
          if (u) {
            const L = (_.max - u.price) / _.range * b, x = 22, V = Math.min(L + 10, b - x - 4), d = 5, j = 45, ue = 55, We = 44, Q = xe.width - Xe, Oe = j + ue + We + d * 2, je = (Q - Oe) / 2, Ke = je + j + d, _e = Ke + ue + d, de = 8;
            if (v >= je - de && v <= je + j + de && f >= V - de && f <= V + x + de) {
              if (Yt) {
                const Re = u.side === "buy", Je = Kn(u.price), Ye = ct.current ?? u.stopLoss ?? (Re ? u.price - Je : u.price + Je), Ot = rt.current ?? u.takeProfit ?? (Re ? u.price + Je : u.price - Je);
                Yt(Ne.current, Ye, Ot);
              }
              Ne.current = null, ct.current = null, rt.current = null, at.current = null, ln((Re) => Re + 1), tt(!1);
              return;
            }
            if (v >= Ke - de && v <= Ke + ue + de && f >= V - de && f <= V + x + de) {
              Ne.current = null, ct.current = null, rt.current = null, at.current = null, ln((Re) => Re + 1), tt(!1);
              return;
            }
            if (v >= _e - de && v <= _e + We + de && f >= V - de && f <= V + x + de) {
              Zt && Zt(Ne.current), Ne.current = null, ct.current = null, rt.current = null, at.current = null, ln((Re) => Re + 1), tt(!1);
              return;
            }
          }
        }
        if (Ne.current) {
          const u = ze.find((L) => L.id === Ne.current);
          if (u) {
            const L = u.side === "buy", x = Kn(u.price), V = ct.current ?? u.stopLoss ?? (L ? u.price - x : u.price + x), d = rt.current ?? u.takeProfit ?? (L ? u.price + x : u.price - x);
            if (Math.abs(w - V) < A) {
              at.current = "sl", ct.current = V;
              return;
            }
            if (Math.abs(w - d) < A) {
              at.current = "tp", rt.current = d;
              return;
            }
          }
        }
        let X = null;
        for (const u of ze)
          if (Math.abs(w - u.price) < A) {
            X = u.id;
            break;
          }
        if (X) {
          if (Ne.current === X)
            Ne.current = null, ct.current = null, rt.current = null;
          else {
            Ne.current = X;
            const u = ze.find((L) => L.id === X);
            ct.current = u?.stopLoss ?? null, rt.current = u?.takeProfit ?? null;
          }
          at.current = null, ln((u) => u + 1), tt(!1);
          return;
        }
      }
    }
    cs(!0), jl({ x: v, y: f, startIndex: ie.startIndex, priceOffset: xt });
  }, [ie.startIndex, xt, sl, It, Nn, ze, Yt, Zt, nn]), ko = o.useCallback(() => {
    if (at.current && Ne.current) {
      at.current = null, Ge.current && (Ge.current.style.cursor = Jt.current !== "standard" ? "none" : "crosshair"), tt(!1);
      return;
    }
    if (Mt.current) {
      Wt(!1);
      const a = Le.current;
      if (tt(!1), fe) {
        const p = xe.width - Xe, m = ie.candleWidth * (1 + Ve), v = Math.floor(p / m), f = a.startIndex + v, e = l.length - 1 < f;
        In.current = !e;
      }
      Nt((p) => ({
        ...p,
        startIndex: a.startIndex,
        // Keep float precision - no rounding
        autoFollowLatest: !1
      }));
    }
    $n.current !== null && (cancelAnimationFrame($n.current), $n.current = null), cs(!1);
  }, [Yt, Zt]);
  o.useEffect(() => {
    if (!jn) return;
    const a = () => {
      ko();
    };
    return window.addEventListener("mouseup", a), () => {
      window.removeEventListener("mouseup", a);
    };
  }, [jn, ko]), o.useEffect(() => {
    const a = (p) => {
      Ne.current && (p.key === "Enter" ? (p.preventDefault(), Yt && Yt(Ne.current, ct.current ?? void 0, rt.current ?? void 0), Ne.current = null, ct.current = null, rt.current = null, at.current = null, ln((m) => m + 1), tt(!1)) : (p.key === "Escape" || p.key === "Backspace") && (p.preventDefault(), Ne.current = null, ct.current = null, rt.current = null, at.current = null, ln((m) => m + 1), tt(!1)));
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [Yt, Zt]), o.useEffect(() => {
    const a = (p) => {
      if (!It || !r || !we) return;
      const m = p.target?.tagName;
      if (!(m === "INPUT" || m === "TEXTAREA" || m === "SELECT"))
        if (p.key === "Backspace" || p.key === "Delete") {
          p.preventDefault();
          const v = It.startsWith("sp-") ? It.replace("sp-", "") : It.startsWith("movingAverages__") ? "movingAverages" : It, f = r[v];
          f && we({ ...r, [v]: { ...f, enabled: !1 } }), pe(null);
        } else p.key === "Escape" && pe(null);
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [It, r, we]);
  const Ia = o.useCallback(() => {
    mt.current && clearTimeout(mt.current), mt.current = setTimeout(() => {
      if (en.current) return;
      _n.current = null, dt.current = null, Ts.current = null;
      const a = Ge.current, p = a?.getContext("2d");
      p && a && p.clearRect(0, 0, a.width, a.height), On.current && On.current(), ps(), cs(!1), co(!1), se && se(null, null);
    }, 50);
  }, [se, ps]);
  o.useEffect(() => {
    if (!Jo && !Qo) return;
    const a = (v) => {
      const e = (tl.current.y - v.clientY) / 150, O = Math.max(0.1, Math.min(10, tl.current.scale + e));
      gn.current = O, tt(!0), St(), Jn.current && clearTimeout(Jn.current), Jn.current = setTimeout(() => {
        De(gn.current);
      }, 100);
    }, p = () => {
      co(!1), ea(!1), De(gn.current), St();
    }, m = (v) => {
      if (v.touches.length !== 1) return;
      v.preventDefault();
      const e = (tl.current.y - v.touches[0].clientY) / 150, O = Math.max(0.1, Math.min(10, tl.current.scale + e));
      gn.current = O, tt(!0), St(), Jn.current && clearTimeout(Jn.current), Jn.current = setTimeout(() => {
        De(gn.current);
      }, 100);
    };
    return window.addEventListener("mousemove", a), window.addEventListener("mouseup", p), window.addEventListener("touchmove", m, { passive: !1 }), window.addEventListener("touchend", p), window.addEventListener("touchcancel", p), () => {
      window.removeEventListener("mousemove", a), window.removeEventListener("mouseup", p), window.removeEventListener("touchmove", m), window.removeEventListener("touchend", p), window.removeEventListener("touchcancel", p);
    };
  }, [Jo, Qo, St]);
  const Ta = o.useCallback((a) => {
    if (a.preventDefault(), a.touches.length === 1) {
      const p = a.touches[0], m = Ge.current;
      if (!m) return;
      const v = m.getBoundingClientRect(), f = p.clientX - v.left, e = p.clientY - v.top;
      if (us.current = { x: f, y: e }, lt.current && (clearTimeout(lt.current), lt.current = null), Pn) {
        is(!1), _n.current = null;
        const _ = m.getContext("2d");
        _ && _.clearRect(0, 0, m.width, m.height);
      }
      const O = Date.now();
      Ln.current = !0, Os.current = O;
      const H = O - Fs.current;
      if (Fs.current = O, !(H < 300)) {
        const _ = O;
        lt.current = setTimeout(() => {
          Os.current === _ && Ln.current && (is(!0), _n.current = { x: f, y: e }, dn.current !== null && cancelAnimationFrame(dn.current), dn.current = requestAnimationFrame(() => {
            Ft(), dn.current = null;
          })), lt.current = null;
        }, 400);
      }
      if (ze && ze.length > 0) {
        zn.current = Date.now();
        const _ = on.current, b = rn.current;
        if (_ && _.range > 0 && b > 0) {
          const w = _.max - e / b * _.range, A = _.range * 0.015;
          if (Ne.current) {
            const u = ze.find((L) => L.id === Ne.current);
            if (u) {
              const L = (_.max - u.price) / _.range * b, x = 22, V = Math.min(L + 10, b - x - 4), d = 5, j = xe.width - Xe, ue = 45, We = 55, Q = 44, Oe = ue + We + Q + d * 2, je = (j - Oe) / 2, Ke = je + ue + d, _e = Ke + We + d, de = 12;
              if (f >= je - de && f <= je + ue + de && e >= V - de && e <= V + x + de) {
                Yt && Yt(Ne.current, ct.current ?? void 0, rt.current ?? void 0), Ne.current = null, ct.current = null, rt.current = null, at.current = null, ln((Re) => Re + 1), tt(!1);
                return;
              }
              if (f >= Ke - de && f <= Ke + We + de && e >= V - de && e <= V + x + de) {
                Ne.current = null, ct.current = null, rt.current = null, at.current = null, ln((Re) => Re + 1), tt(!1);
                return;
              }
              if (f >= _e - de && f <= _e + Q + de && e >= V - de && e <= V + x + de) {
                Zt && Zt(Ne.current), Ne.current = null, ct.current = null, rt.current = null, at.current = null, ln((Re) => Re + 1), tt(!1);
                return;
              }
            }
          }
          if (Ne.current) {
            const u = ze.find((L) => L.id === Ne.current);
            if (u) {
              const L = u.side === "buy", x = Kn(u.price), V = ct.current ?? u.stopLoss ?? (L ? u.price - x : u.price + x), d = rt.current ?? u.takeProfit ?? (L ? u.price + x : u.price - x);
              if (Math.abs(w - V) < A) {
                at.current = "sl", ct.current = V, lt.current && (clearTimeout(lt.current), lt.current = null);
                return;
              }
              if (Math.abs(w - d) < A) {
                at.current = "tp", rt.current = d, lt.current && (clearTimeout(lt.current), lt.current = null);
                return;
              }
            }
          }
          let X = null;
          for (const u of ze) {
            const L = (_.max - u.price) / _.range * b;
            if (f <= 160 && Math.abs(e - L) < 20) {
              X = u.id;
              break;
            }
          }
          if (X) {
            if (Ne.current === X)
              Ne.current = null, ct.current = null, rt.current = null;
            else {
              Ne.current = X;
              const u = ze.find((L) => L.id === X);
              ct.current = u?.stopLoss ?? null, rt.current = u?.takeProfit ?? null;
            }
            at.current = null, lt.current && (clearTimeout(lt.current), lt.current = null), ln((u) => u + 1), tt(!1);
            return;
          }
        }
      }
      cs(!0), jl({ x: f, y: e, startIndex: ie.startIndex, priceOffset: xt });
    }
  }, [ie.startIndex, xt, Ft, Pn]), Bl = o.useRef(null), fr = o.useCallback((a) => {
    if (a.touches.length === 2) {
      a.preventDefault();
      const p = a.touches[0], m = a.touches[1], v = Math.hypot(
        m.clientX - p.clientX,
        m.clientY - p.clientY
      );
      if (Bl.current !== null) {
        const f = Le.current.candleWidth, e = Le.current.startIndex, H = 1 + (v / Bl.current - 1) * 1.3, K = Math.max(
          Al,
          Math.min(Dl, f * H)
        ), _ = Ge.current;
        if (_) {
          const b = _.getBoundingClientRect(), w = (p.clientX + m.clientX) / 2 - b.left, A = f * (1 + Ve), X = K * (1 + Ve), u = e + w / A, L = Math.max(0, u - w / X);
          Le.current = { startIndex: L, candleWidth: K }, tt(!0), St(), Mt.current || Wt(!0);
        }
      }
      Bl.current = v;
    }
  }, [St]), Ma = o.useCallback((a) => {
    if (a.touches.length === 2) {
      fr(a), lt.current && (clearTimeout(lt.current), lt.current = null);
      return;
    }
    if (a.touches.length === 1) {
      const p = a.touches[0], m = Ge.current;
      if (!m) return;
      const v = m.getBoundingClientRect(), f = p.clientX - v.left, e = p.clientY - v.top;
      if (lt.current && us.current) {
        const O = Math.abs(f - us.current.x), H = Math.abs(e - us.current.y);
        (O > 10 || H > 10) && (clearTimeout(lt.current), lt.current = null);
      }
      if (Pn && (_n.current = { x: f, y: e }, dn.current !== null && cancelAnimationFrame(dn.current), dn.current = requestAnimationFrame(() => {
        Ft(), dn.current = null;
      })), at.current) {
        a.preventDefault();
        const O = on.current, H = rn.current;
        if (O && O.range > 0 && H > 0) {
          const K = O.max - e / H * O.range;
          at.current === "sl" ? ct.current = K : rt.current = K, bn.current === null && (bn.current = requestAnimationFrame(() => {
            tt(!1), bn.current = null;
          }));
        }
        return;
      }
      if (jn && !Pn) {
        a.preventDefault(), Wt(!0);
        const O = f - xn.x, H = e - xn.y, K = ie.candleWidth * (1 + Ve), _ = O / K, b = Math.max(
          0,
          Math.min(l.length - 10, xn.startIndex - _)
        );
        if (hs && At !== null) {
          const w = At / gn.current / (xe.height - vt), A = H * w;
          Zn.current = xn.priceOffset + A;
        }
        Le.current = {
          startIndex: b,
          candleWidth: ie.candleWidth
        }, mn.current === null && (mn.current = requestAnimationFrame(() => {
          tt(!0), St(), mn.current = null;
        }));
      }
    }
  }, [jn, xn, ie.candleWidth, l.length, fr, Ft, Pn, hs, At, xe.height, ze]), ja = o.useCallback(() => {
    if (Ln.current = !1, Os.current = 0, lt.current && (clearTimeout(lt.current), lt.current = null), at.current && Ne.current) {
      at.current = null, tt(!1), Ln.current = !1, Os.current = 0, lt.current && (clearTimeout(lt.current), lt.current = null);
      return;
    }
    if (Pn) {
      is(!1), _n.current = null;
      const a = Ge.current, p = a?.getContext("2d");
      p && a && p.clearRect(0, 0, a.width, a.height), se && se(null, null);
    }
    if (Mt.current) {
      Wt(!1);
      const a = Le.current;
      if (tt(!1), fe) {
        const p = xe.width - Xe, m = ie.candleWidth * (1 + Ve), v = Math.floor(p / m), f = a.startIndex + v, e = l.length - 1 < f;
        In.current = !e;
      }
      Nt((p) => ({
        ...p,
        startIndex: a.startIndex,
        // Keep float precision - no rounding
        candleWidth: a.candleWidth,
        // Pick up pinch-zoom final width
        autoFollowLatest: !1
      })), hs && ds(Zn.current);
    }
    cs(!1), Bl.current = null, us.current = null, ao.current = null, mn.current !== null && (cancelAnimationFrame(mn.current), mn.current = null);
  }, [Pn, se, hs]);
  o.useCallback((a) => {
    let p = fs[0], m = Math.abs(a - p);
    for (const v of fs) {
      const f = Math.abs(a - v);
      f < m && (m = f, p = v);
    }
    return p;
  }, [fs]);
  const wo = o.useCallback((a, p) => {
    const m = fs.findIndex((v) => v >= a - 1e-3);
    if (p) {
      const v = Math.min(fs.length - 1, m + 1);
      return fs[v];
    } else {
      const v = Math.max(0, m - 1);
      return fs[v];
    }
  }, [fs]), So = o.useCallback((a) => {
    const p = a.ctrlKey || a.metaKey;
    if (!go.current && !p) {
      const x = Math.abs(a.deltaX) > Math.abs(a.deltaY), V = a.shiftKey && a.deltaY !== 0;
      if (x || V) {
        a.preventDefault();
        const d = Le.current.startIndex, j = Le.current.candleWidth, ue = j * (1 + Ve);
        Wt(!0);
        const We = V ? a.deltaY : a.deltaX, Q = 0.2 + (ll - 1) * 0.2, Oe = We * Q / ue, Z = Math.max(
          0,
          Math.min(l.length - 10, d + Oe)
        );
        Le.current = { startIndex: Z, candleWidth: j }, Ct.current && clearTimeout(Ct.current), Ct.current = setTimeout(() => {
          if (fe) {
            const Ke = xe.width - Xe, _e = Le.current.candleWidth * (1 + Ve), de = Math.floor(Ke / _e), Re = Le.current.startIndex + de;
            In.current = !(l.length - 1 < Re);
          }
          const je = Le.current;
          Nt((Ke) => ({
            ...Ke,
            startIndex: je.startIndex,
            autoFollowLatest: !1
          })), Wt(!1);
        }, 150), ht.current === null && (ht.current = requestAnimationFrame(() => {
          tt(!0), Ft(), St(), ht.current = null;
        }));
        return;
      }
    }
    a.preventDefault(), Wt(!0);
    const m = Ge.current;
    if (!m) return;
    const v = m.getBoundingClientRect(), f = a.clientX - v.left, e = a.clientY - v.top;
    _n.current = { x: f, y: e };
    const O = Le.current.startIndex, H = Le.current.candleWidth, K = H * (1 + Ve);
    if (Math.abs(a.deltaX) > Math.abs(a.deltaY) || a.shiftKey) {
      const x = a.shiftKey ? a.deltaY : a.deltaX, V = go.current ? 0.02 + (ll - 1) * 0.02 : 0.2 + (ll - 1) * 0.2, d = x * V / K, j = Math.max(
        0,
        Math.min(l.length - 10, O + d)
      );
      Le.current = { startIndex: j, candleWidth: H }, ht.current === null && (ht.current = requestAnimationFrame(() => {
        tt(!0), Ft(), St(), ht.current = null;
      })), Ct.current && clearTimeout(Ct.current), Ct.current = setTimeout(() => {
        if (fe) {
          const We = xe.width - Xe, Q = Le.current.candleWidth * (1 + Ve), Oe = Math.floor(We / Q), Z = Le.current.startIndex + Oe;
          In.current = !(l.length - 1 < Z);
        }
        const ue = Le.current;
        Nt((We) => ({
          ...We,
          startIndex: ue.startIndex,
          // Keep float precision - no rounding
          autoFollowLatest: !1
        })), Wt(!1);
      }, 150);
      return;
    }
    if (go.current) {
      Rn.current += a.deltaY, el.current && clearTimeout(el.current), el.current = setTimeout(() => {
        Rn.current = 0;
      }, 200);
      const x = 220 - ll * 20;
      if (Math.abs(Rn.current) < x)
        return;
      const V = Rn.current < 0;
      Rn.current = 0;
      const d = wo(H, V);
      if (d === H) return;
      const j = xe.width - Xe, ue = H * (1 + Ve), We = d * (1 + Ve), Q = O + j / ue, Oe = Math.max(0, Q - j / We);
      Wt(!0), Le.current = { startIndex: Oe, candleWidth: d }, ht.current === null && (ht.current = requestAnimationFrame(() => {
        tt(!0), Ft(), St(), ht.current = null;
      })), Ct.current && clearTimeout(Ct.current), Ct.current = setTimeout(() => {
        const Z = Le.current;
        Nt((je) => ({
          ...je,
          candleWidth: Z.candleWidth,
          startIndex: Z.startIndex,
          // Keep float precision
          autoFollowLatest: !1
        })), Wt(!1);
      }, 100);
      return;
    }
    const _ = a.deltaY < 0, b = wo(H, _);
    if (b === H) return;
    const w = xe.width - Xe, A = H * (1 + Ve), X = b * (1 + Ve), u = O + w / A, L = Math.max(0, u - w / X);
    Wt(!0), Le.current = { startIndex: L, candleWidth: b }, ht.current === null && (ht.current = requestAnimationFrame(() => {
      tt(!0), Ft(), St(), ht.current = null;
    })), Ct.current && clearTimeout(Ct.current), Ct.current = setTimeout(() => {
      const x = Le.current;
      Nt((V) => ({
        ...V,
        candleWidth: x.candleWidth,
        startIndex: x.startIndex,
        // Keep float precision
        autoFollowLatest: !1
      })), Wt(!1);
    }, 100);
  }, [l.length, Ft, wo, xe.width, xe.height, ll, Kt, En, n, js, ie.autoFollowLatest, St]), pr = o.useRef(So), xr = o.useRef(yo);
  o.useEffect(() => {
    pr.current = So;
  }, [So]), o.useEffect(() => {
    xr.current = yo;
  }, [yo]);
  const Ra = o.useRef(null), xs = o.useRef(null), ms = o.useRef(null), Pa = o.useCallback((a) => {
    if (xs.current && (xs.current.el.removeEventListener("wheel", xs.current.fn), xs.current = null), Ge.current = a, a) {
      const p = (m) => pr.current(m);
      a.addEventListener("wheel", p, { passive: !1 }), xs.current = { el: a, fn: p };
    }
  }, []), La = o.useCallback((a) => {
    if (ms.current && (ms.current.el.removeEventListener("wheel", ms.current.fn), ms.current = null), Ra.current = a, a) {
      const p = (m) => xr.current(m);
      a.addEventListener("wheel", p, { passive: !1 }), ms.current = { el: a, fn: p };
    }
  }, []);
  o.useEffect(() => () => {
    xs.current && xs.current.el.removeEventListener("wheel", xs.current.fn), ms.current && ms.current.el.removeEventListener("wheel", ms.current.fn);
  }, []), o.useLayoutEffect(() => {
    const a = st.current;
    if (!a) return;
    const p = a.getBoundingClientRect();
    p.width > 0 && p.height > 0 && Zs({ width: Math.round(p.width), height: Math.round(p.height) });
    const m = new ResizeObserver((v) => {
      for (const f of v) {
        const e = Math.round(f.contentRect.width), O = Math.round(f.contentRect.height);
        e > 0 && O > 0 && Er.flushSync(() => {
          Zs(
            (H) => H.width === e && H.height === O ? H : { width: e, height: O }
          );
        });
      }
    });
    return m.observe(a), () => m.disconnect();
  }, []), o.useEffect(() => {
    kt && kt.width > 0 && kt.height > 0 && Zs(kt);
  }, [kt]);
  const mr = o.useRef(`${h}|${cn}`);
  o.useLayoutEffect(() => {
    const a = `${h}|${cn}`;
    mr.current !== a && (mr.current = a, !fe && Nt((p) => p.autoFollowLatest ? p : { ...p, autoFollowLatest: !0 }));
  }, [h, cn, fe]), o.useLayoutEffect(() => {
    if (l.length === 0) return;
    if (fe) {
      const e = rs.current, O = xe.width - Xe, H = ie.candleWidth * (1 + Ve), K = Math.floor(O / H), _ = Math.floor(K * 0.9), w = Ml.current <= 300 && xe.width > 300;
      if (Ml.current = xe.width, l.length !== e || e === 0 || w) {
        const A = e > 0 && l.length < e, X = Math.max(0, Math.floor(ie.startIndex)), u = Math.min(l.length, X + K), L = l.length - 1 < u;
        if (e === 0 || A || w || L && !In.current) {
          const x = Math.max(0, l.length - 1 - _);
          Nt((V) => ({ ...V, startIndex: x, autoFollowLatest: !1 })), A && (In.current = !1);
        }
      }
      rs.current = l.length;
      return;
    }
    if (!ie.autoFollowLatest) {
      if (ie.startIndex > l.length - 1) {
        const e = xe.width - Xe, O = ie.candleWidth * (1 + Ve), H = Math.max(1, Math.floor(e / O));
        Nt((K) => ({ ...K, startIndex: Math.max(0, l.length - H) }));
      }
      return;
    }
    const a = xe.width - Xe, p = ie.candleWidth * (1 + Ve), m = Math.floor(a / p);
    if (l.length > 0 && l.length < m * 0.75) {
      const e = Math.min(
        Dl,
        a * 0.92 / (l.length * (1 + Ve))
      );
      if (e > ie.candleWidth * 1.05) {
        Le.current = { startIndex: 0, candleWidth: e }, Nt((O) => ({ ...O, startIndex: 0, candleWidth: e })), rs.current = l.length;
        return;
      }
    }
    const v = Math.min(ie.futureSpace, Math.floor(m * 0.3)), f = Math.max(0, l.length - m + v);
    Nt((e) => ({ ...e, startIndex: f })), rs.current = l.length;
  }, [l.length, xe.width, ie.autoFollowLatest, ie.candleWidth, ie.futureSpace, ie.startIndex, fe]), o.useLayoutEffect(() => {
    const a = ks - Qs.current;
    a !== 0 && (Nt((p) => ({
      ...p,
      startIndex: Math.max(0, p.startIndex + a)
    })), Le.current.startIndex = Math.max(0, Le.current.startIndex + a), Yn.current.startIndex = Math.max(0, Yn.current.startIndex + a)), Qs.current = ks;
  }, [ks]), o.useEffect(() => {
    if (W == null) {
      Cs.current = void 0;
      return;
    }
    if (l.length === 0 || Cs.current === W) return;
    Cs.current = W;
    const a = xe.width - Xe, p = ie.candleWidth * (1 + Ve), m = Math.floor(a / p), v = Math.min(W, l.length - 1), f = Math.floor(m * 0.9), e = Math.max(0, v - f);
    Nt((O) => ({ ...O, startIndex: e, autoFollowLatest: !1 }));
  }, [W, l.length, xe.width, ie.candleWidth]), o.useEffect(() => {
    !Mt.current && !Sl && ps();
  }, [ps, Sl]);
  const Co = o.useRef(0), al = o.useRef(null);
  o.useEffect(() => {
    if (n == null || Mt.current) return;
    const a = Date.now(), p = a - Co.current;
    return p >= 50 ? (Co.current = a, ps()) : (al.current && clearTimeout(al.current), al.current = setTimeout(() => {
      Co.current = Date.now(), ps();
    }, 50 - p)), () => {
      al.current && clearTimeout(al.current);
    };
  }, [n, ps]), o.useEffect(() => {
    Ft();
  }, [Ft]), o.useEffect(() => {
    Tl.current = re, re != null && (Us.current = !0, requestAnimationFrame(() => {
      Ft(), Us.current = !1;
    }));
  }, [re, Ft]);
  const Wl = o.useRef(/* @__PURE__ */ new Map()), br = o.useMemo(() => {
    if (Mt.current && Wl.current.size > 0 && l.length === Wl.current.size)
      return Wl.current;
    const a = /* @__PURE__ */ new Map();
    for (let p = 0; p < l.length; p++)
      a.set(l[p].time, p);
    return Wl.current = a, a;
  }, [l]), Fl = o.useCallback(() => {
    if (!Be) return;
    const a = En();
    js(a.candles, ie.autoFollowLatest);
    const p = l.length > 0 ? l[l.length - 1] : null, m = l.length >= 2 ? l[l.length - 2] : null, v = p && m ? p.time - m.time : 6e4;
    Be({
      priceAxisWidth: Xe,
      timeToX: (f) => {
        const e = Mt.current ? Yn.current.startIndex : ie.startIndex, H = (Mt.current ? Yn.current.candleWidth : ie.candleWidth) * (1 + Ve), K = Math.floor(e), _ = (e - K) * H;
        let b = br.get(f) ?? -1;
        if (b === -1 && l.length > 0) {
          const w = l[0], A = l[l.length - 1];
          if (f > A.time) {
            const X = f - A.time;
            b = l.length - 1 + Math.round(X / v);
          } else if (f < w.time) {
            const X = w.time - f;
            b = -Math.round(X / v);
          } else {
            let X = 0, u = l.length - 1;
            for (; X < u; ) {
              const L = Math.floor((X + u) / 2);
              l[L].time < f ? X = L + 1 : u = L;
            }
            if (X > 0) {
              const L = l[X - 1], x = l[X], V = (f - L.time) / (x.time - L.time);
              return (X - 1 + V - K) * H + H / 2 - _;
            }
            b = X;
          }
        }
        return b === -1 ? null : (b - K) * H + H / 2 - _;
      },
      xToTime: (f) => {
        const e = Mt.current ? Yn.current.startIndex : ie.startIndex, H = (Mt.current ? Yn.current.candleWidth : ie.candleWidth) * (1 + Ve), K = Math.floor(e), _ = (e - K) * H, b = f + _, w = K + (b - H / 2) / H;
        if (w < 0) return null;
        const A = Math.floor(w), X = w - A;
        if (A >= l.length) {
          if (p) {
            const L = w - (l.length - 1);
            return p.time + L * v;
          }
          return null;
        }
        const u = l[A];
        if (!u) return null;
        if (X > 0 && A + 1 < l.length) {
          const L = l[A + 1];
          return u.time + X * (L.time - u.time);
        }
        return u.time + X * v;
      },
      priceToY: (f) => {
        let e = on.current, O = rn.current;
        if (!e || O === 0) {
          const H = xe.width - Xe, K = Le.current, _ = K.candleWidth * (1 + Ve), b = Math.floor(H / _), w = Math.max(0, Math.floor(K.startIndex)), A = Math.min(l.length, w + b), X = l.slice(w, A);
          let u = 1 / 0, L = -1 / 0;
          if (X.length === 0)
            u = 0, L = 100;
          else {
            for (const _e of X)
              _e.low < u && (u = _e.low), _e.high > L && (L = _e.high);
            n && (n < u && (u = n), n > L && (L = n));
          }
          const x = L - u, V = x * 0.05, d = (L + u) / 2, j = x + V * 2;
          e = {
            min: d - j / 2,
            max: d + j / 2,
            range: j
          };
          const ue = r?.rsi?.enabled, We = r?.macd?.enabled, Q = r?.atr?.enabled, Oe = r?.stochastic?.enabled;
          r?.volume?.enabled && l.some((_e) => _e.volume !== void 0 && _e.volume > 0);
          const Z = (ue ? 1 : 0) + (We ? 1 : 0) + (Q ? 1 : 0) + (Oe ? 1 : 0), je = xe.height - vt, Ke = Z > 0 ? Math.max(60 * Z, je * G) : 0;
          O = je - Ke;
        }
        if (Kt !== null && At !== null) {
          const H = gn.current, K = Zn.current, _ = At / H, b = Kt + K;
          e = {
            min: b - _ / 2,
            max: b + _ / 2,
            range: _
          };
        }
        return O - (f - e.min) / e.range * O;
      },
      yToPrice: (f) => {
        let e = on.current, O = rn.current;
        if (!e || O === 0) {
          const H = xe.width - Xe, K = Le.current, _ = K.candleWidth * (1 + Ve), b = Math.floor(H / _), w = Math.max(0, Math.floor(K.startIndex)), A = Math.min(l.length, w + b), X = l.slice(w, A);
          let u = 1 / 0, L = -1 / 0;
          if (X.length === 0)
            u = 0, L = 100;
          else {
            for (const _e of X)
              _e.low < u && (u = _e.low), _e.high > L && (L = _e.high);
            n && (n < u && (u = n), n > L && (L = n));
          }
          const x = L - u, V = x * 0.05, d = (L + u) / 2, j = x + V * 2;
          e = {
            min: d - j / 2,
            max: d + j / 2,
            range: j
          };
          const ue = r?.rsi?.enabled, We = r?.macd?.enabled, Q = r?.atr?.enabled, Oe = r?.stochastic?.enabled;
          r?.volume?.enabled && l.some((_e) => _e.volume !== void 0 && _e.volume > 0);
          const Z = (ue ? 1 : 0) + (We ? 1 : 0) + (Q ? 1 : 0) + (Oe ? 1 : 0), je = xe.height - vt, Ke = Z > 0 ? Math.max(60 * Z, je * G) : 0;
          O = je - Ke;
        }
        if (Kt !== null && At !== null) {
          const H = gn.current, K = Zn.current, _ = At / H, b = Kt + K;
          e = {
            min: b - _ / 2,
            max: b + _ / 2,
            range: _
          };
        }
        return e.max - f / O * e.range;
      }
    });
  }, [l, ie, xe, Be, r, G, n, Kt, At, br]);
  o.useEffect(() => {
    Gn.current = Fl;
  }, [Fl]), o.useLayoutEffect(() => {
    Fl();
  }, [Fl]);
  const Io = [
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
  ].filter(Boolean).length + (s?.customIndicators?.filter((a) => a.display === "subplot").length || 0), Na = Io > 0, gr = xe.height - vt, Ea = Io > 0 ? Math.max(60 * Io, gr * G) : 0, vr = gr - Ea, yr = o.useCallback((a) => {
    a.preventDefault(), a.stopPropagation(), Ee(!0);
    const p = "touches" in a ? a.touches[0].clientY : a.clientY;
    Et.current = { y: p, ratio: G };
  }, [G]);
  o.useEffect(() => {
    if (!bt) return;
    const a = (m) => {
      const v = "touches" in m ? m.touches[0].clientY : m.clientY, e = (Et.current.y - v) / (xe.height - vt), O = Math.max(0.1, Math.min(0.6, Et.current.ratio + e));
      ke(O);
    }, p = () => {
      Ee(!1);
    };
    return window.addEventListener("mousemove", a), window.addEventListener("mouseup", p), window.addEventListener("touchmove", a), window.addEventListener("touchend", p), () => {
      window.removeEventListener("mousemove", a), window.removeEventListener("mouseup", p), window.removeEventListener("touchmove", a), window.removeEventListener("touchend", p);
    };
  }, [bt, xe.height]);
  const Ol = (a) => {
    const { kind: p, label: m, menuKey: v, engineLabel: f, ciId: e, sid: O, remove: H } = a, K = "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground transition-colors", _ = () => {
      p !== "formula" || !e || !we || (we({
        ...r,
        customIndicators: (r.customIndicators || []).map((A) => A.id === e ? { ...A, enabled: !1 } : A)
      }), ye(null), pe(null));
    }, b = (A) => {
      A.stopPropagation(), gt({
        visible: !0,
        x: A.clientX,
        y: A.clientY,
        key: v,
        title: m,
        custom: p === "engine" ? { kind: p, label: f || m } : p === "formula" ? { kind: p, ciId: e } : { kind: p, sid: O }
      });
    }, w = p === "engine" && !!et && !!f || p === "formula" && !!wn;
    return /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
      p === "formula" && /* @__PURE__ */ t.jsx("button", { onClick: (A) => {
        A.stopPropagation(), _();
      }, className: `${K} hover:text-foreground`, title: `Hide ${m}`, children: /* @__PURE__ */ t.jsx(ql, { className: "w-[15px] h-[15px]" }) }),
      w && /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: (A) => {
            A.stopPropagation(), p === "engine" ? et?.(f) : wn?.();
          },
          className: `${K} hover:text-foreground`,
          title: `${m} Settings`,
          children: /* @__PURE__ */ t.jsx(Gl, { className: "w-[15px] h-[15px]" })
        }
      ),
      /* @__PURE__ */ t.jsx("button", { onClick: (A) => {
        A.stopPropagation(), H();
      }, className: `${K} hover:text-destructive`, title: `Remove ${m}`, children: /* @__PURE__ */ t.jsx(Zl, { className: "w-[15px] h-[15px]" }) }),
      /* @__PURE__ */ t.jsx("button", { onClick: b, className: `${K} hover:text-foreground`, title: "More options", children: /* @__PURE__ */ t.jsx(Jl, { className: "w-[15px] h-[15px]" }) })
    ] });
  };
  return /* @__PURE__ */ t.jsxs(
    "div",
    {
      ref: st,
      className: "relative w-full h-full select-none",
      style: {
        backgroundColor: ne.background,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none"
      },
      children: [
        /* @__PURE__ */ t.jsx(
          "canvas",
          {
            ref: Cl,
            width: xe.width * Sn,
            height: xe.height * Sn,
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
            ref: Pa,
            width: xe.width * Sn,
            height: xe.height * Sn,
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
            onMouseUp: ko,
            onMouseLeave: Ia,
            onTouchStart: Ta,
            onTouchMove: Ma,
            onTouchEnd: ja,
            onContextMenu: (a) => {
              if (!r || !s) return;
              const p = Ge.current;
              if (!p) return;
              const m = p.getBoundingClientRect(), v = a.clientX - m.left, f = a.clientY - m.top, e = Qt.current, O = (d) => !!d && f >= d.top && f <= d.bottom, H = r?.customBrueScripts || {}, K = (d, j) => {
                pe(`script-${d}`), gt({
                  visible: !0,
                  x: a.clientX,
                  y: a.clientY,
                  key: `script_${d}`,
                  title: H[d]?.name || j,
                  custom: { kind: "brue", sid: d }
                });
              };
              for (const d of Br()) {
                const j = r[d];
                if (!j?.enabled || !s?.[d] || !O(e[d])) continue;
                a.preventDefault(), a.stopPropagation();
                const ue = j.sourceScriptId;
                if (ue && H[ue]?.enabled) {
                  K(ue, Kl(d));
                  return;
                }
                pe(`sp-${d}`), gt({
                  visible: !0,
                  x: a.clientX,
                  y: a.clientY,
                  key: d,
                  title: Kl(d)
                });
                return;
              }
              for (const d of r.customIndicators || []) {
                if (!d.enabled || d.display !== "subplot" || !O(e[`custom_${d.id}`])) continue;
                a.preventDefault(), a.stopPropagation();
                const j = typeof d.expression == "string" ? d.expression : "";
                if (j.startsWith("brue:") && d.scriptId)
                  K(d.scriptId, d.name || "Brue script");
                else if (j.startsWith("local:")) {
                  const ue = d.group || j.split(":")[1] || d.name;
                  pe(`ci-${d.id}`), gt({
                    visible: !0,
                    x: a.clientX,
                    y: a.clientY,
                    key: `custom_${d.id}`,
                    title: ue || "Indicator",
                    custom: { kind: "engine", label: ue }
                  });
                } else
                  pe(`ci-${d.id}`), gt({
                    visible: !0,
                    x: a.clientX,
                    y: a.clientY,
                    key: `custom_${d.id}`,
                    title: d.name || "Custom indicator",
                    custom: { kind: "formula", ciId: d.id }
                  });
                return;
              }
              const _ = on.current, b = rn.current;
              if (!_ || b <= 0) return;
              const w = Le.current, A = w.candleWidth * (1 + Ve), u = Math.max(0, Math.floor(w.startIndex)) + Math.round(v / A), L = 8, x = (d) => {
                if (isNaN(d) || !isFinite(d)) return !1;
                const j = b - (d - _.min) / _.range * b;
                return Math.abs(f - j) < L;
              }, V = [];
              if (r.movingAverages?.enabled && s.movingAverages && V.push({ key: "movingAverages", title: "Moving Averages", check: () => s.movingAverages.some(
                (d) => u >= 0 && u < d.data.length && x(d.data[u])
              ) }), r.bollinger?.enabled && s.bollinger) {
                const d = s.bollinger;
                V.push({
                  key: "bollinger",
                  title: "Bollinger Bands",
                  check: () => u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.middle[u]) || x(d.lower[u]))
                });
              }
              if (r.vwap?.enabled && s.vwap && V.push({
                key: "vwap",
                title: "VWAP",
                check: () => u >= 0 && u < s.vwap.length && x(s.vwap[u])
              }), r.supertrend?.enabled && s.supertrend && V.push({
                key: "supertrend",
                title: "Supertrend",
                check: () => u >= 0 && u < s.supertrend.length && s.supertrend[u] && x(s.supertrend[u].value)
              }), r.ichimoku?.enabled && s.ichimoku) {
                const d = s.ichimoku;
                V.push({
                  key: "ichimoku",
                  title: "Ichimoku Cloud",
                  check: () => u >= 0 && u < d.tenkan.length && (x(d.tenkan[u]) || x(d.kijun[u]) || x(d.senkouA[u]) || x(d.senkouB[u]))
                });
              }
              if (r.keltner?.enabled && s.keltner) {
                const d = s.keltner;
                V.push({
                  key: "keltner",
                  title: "Keltner Channel",
                  check: () => u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.middle[u]) || x(d.lower[u]))
                });
              }
              if (r.donchian?.enabled && s.donchian) {
                const d = s.donchian;
                V.push({
                  key: "donchian",
                  title: "Donchian Channel",
                  check: () => u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.middle[u]) || x(d.lower[u]))
                });
              }
              for (const d of V)
                if (d.check()) {
                  a.preventDefault(), a.stopPropagation(), pe(d.key), gt({ visible: !0, x: a.clientX, y: a.clientY, key: d.key, title: d.title });
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
              left: Qn ? (er || 295) + 6 : 6,
              pointerEvents: "auto"
            },
            onMouseEnter: () => {
              uo.current = !0;
            },
            onMouseLeave: () => {
              uo.current = !1;
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
                const a = /* @__PURE__ */ new Date(), p = Du(h), m = Gr(h);
                let v = "", f = "", e = 0, O = 0, H = !1, K = m ? "#22c55e" : "#ef4444", _ = m ? "Market open" : "Market closed", b = "Real time";
                const w = Bu(a), A = w.hours * 60 + w.minutes, X = w.day, u = w.isBST, L = u ? "BST (UTC+1)" : "GMT (UTC+0)", x = String(w.hours).padStart(2, "0"), V = String(w.minutes).padStart(2, "0"), d = Wu(h);
                if (p === "crypto")
                  H = !0, v = "24/7", f = "Always open", K = "#22c55e", _ = "Market open";
                else if (p === "forex")
                  H = !0, v = u ? "Sun 10 PM – Fri 10 PM BST" : "Sun 10 PM – Fri 10 PM GMT", f = L, m || (_ = "Weekend — market closed");
                else if (p === "stock" && d) {
                  const de = Ul(d);
                  e = de.openHour * 60 + de.openMinute, O = de.closeHour * 60 + de.closeMinute;
                  const Re = String(de.openHour).padStart(2, "0"), Je = de.openMinute === 0 ? "00" : String(de.openMinute).padStart(2, "0"), Ye = String(de.closeHour).padStart(2, "0"), Ot = de.closeMinute === 0 ? "00" : String(de.closeMinute).padStart(2, "0");
                  if (v = `${Re}:${Je} – ${Ye}:${Ot} ${de.tzLabel}`, f = `${de.exchange} (${de.tzLabel})`, de.lunchBreak) {
                    const vn = `${String(de.lunchBreak.startHour).padStart(2, "0")}:${String(de.lunchBreak.startMinute).padStart(2, "0")}`, Ut = `${String(de.lunchBreak.endHour).padStart(2, "0")}:${String(de.lunchBreak.endMinute).padStart(2, "0")}`;
                    v += ` (break ${vn}–${Ut})`;
                  }
                } else if (p === "stock") {
                  e = 14 * 60 + 30, O = 21 * 60, Fu(a) && (O = 18 * 60, K = m ? "#f59e0b" : "#ef4444", _ = m ? "Early close today" : "Market closed");
                  const de = Math.floor(e / 60), Re = Math.floor(O / 60), Je = e % 60 === 0 ? ":00" : ":30", Ye = O % 60 === 0 ? ":00" : ":30";
                  v = `${de}${Je} – ${Re}${Ye} ${u ? "BST" : "GMT"}`, f = `NYSE/NASDAQ (${L})`;
                } else if (p === "commodity" || p === "index") {
                  H = !0, v = u ? "Sun 11 PM – Fri 10 PM BST" : "Sun 11 PM – Fri 10 PM GMT", f = L;
                  const de = u ? 23 * 60 : 22 * 60, Re = u ? 24 * 60 : 23 * 60;
                  m && A >= de - 15 && A < de ? (_ = "Closing soon — daily break", K = "#f59e0b") : !m && A >= de && A < Re && (_ = "Daily maintenance break");
                }
                let j = "";
                if (!H && p === "stock") {
                  let de = A;
                  if (d)
                    try {
                      const Re = Ul(d), Ye = new Intl.DateTimeFormat("en-GB", { timeZone: Re.timezone, hour: "numeric", minute: "numeric", hour12: !1 }).formatToParts(a), Ot = parseInt(Ye.find((Ut) => Ut.type === "hour")?.value || "0"), vn = parseInt(Ye.find((Ut) => Ut.type === "minute")?.value || "0");
                      de = Ot * 60 + vn;
                    } catch {
                    }
                  if (m) {
                    const Re = O - de;
                    if (Re > 0) {
                      const Je = Math.floor(Re / 60), Ye = Re % 60;
                      j = Je > 0 ? `Closes in ${Je}h ${Ye}m` : `Closes in ${Ye} minutes`;
                    }
                  } else {
                    const Re = d ? (() => {
                      try {
                        const Ye = new Intl.DateTimeFormat("en-GB", { timeZone: Ul(d).timezone, weekday: "short" }).formatToParts(a).find((Ot) => Ot.type === "weekday")?.value || "";
                        return { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5 }[Ye] || 0;
                      } catch {
                        return 0;
                      }
                    })() : X;
                    if (Re >= 1 && Re <= 5 && de < e) {
                      const Je = e - de, Ye = Math.floor(Je / 60), Ot = Je % 60;
                      j = Ye > 0 ? `Opens in ${Ye}h ${Ot}m` : `Opens in ${Ot} minutes`;
                    }
                  }
                }
                let ue = 0;
                if (!H && m && O > e) {
                  let de = A;
                  if (d)
                    try {
                      const Re = Ul(d), Ye = new Intl.DateTimeFormat("en-GB", { timeZone: Re.timezone, hour: "numeric", minute: "numeric", hour12: !1 }).formatToParts(a), Ot = parseInt(Ye.find((Ut) => Ut.type === "hour")?.value || "0"), vn = parseInt(Ye.find((Ut) => Ut.type === "minute")?.value || "0");
                      de = Ot * 60 + vn;
                    } catch {
                    }
                  ue = Math.max(0, Math.min(1, (de - e) / (O - e)));
                }
                const We = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][X], Q = typeof document < "u" && document.documentElement.classList.contains("dark"), Oe = Q ? "rgba(22, 25, 35, 0.98)" : "rgba(255, 255, 255, 0.98)", Z = Q ? "rgba(55, 60, 75, 0.6)" : "rgba(210, 215, 225, 0.8)", je = Q ? "#7b8094" : "#6b7280", Ke = Q ? "#a0a6b8" : "#374151", _e = Q ? "#2a2e3a" : "#e5e7eb";
                return /* @__PURE__ */ t.jsxs(
                  "div",
                  {
                    ref: io,
                    className: "relative",
                    children: [
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (de) => {
                            de.stopPropagation(), tr((Re) => !Re);
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
                      nl && /* @__PURE__ */ t.jsxs(
                        "div",
                        {
                          style: {
                            position: "absolute",
                            top: "calc(100% + 4px)",
                            left: -40,
                            width: 260,
                            background: Oe,
                            border: `1px solid ${Z}`,
                            borderRadius: 10,
                            boxShadow: Q ? "0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)" : "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
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
                                /* @__PURE__ */ t.jsx("span", { style: { color: K, fontSize: 13, fontWeight: 600 }, children: _ })
                              ] }),
                              j && /* @__PURE__ */ t.jsx("p", { style: { color: je, fontSize: 12, margin: "4px 0 0 16px", lineHeight: 1.3 }, children: j })
                            ] }),
                            !H && p === "stock" && /* @__PURE__ */ t.jsxs("div", { style: { padding: "6px 16px 10px" }, children: [
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: je, fontSize: 9, fontWeight: 700, letterSpacing: 1.2, fontFamily: '"SF Mono", Consolas, monospace' }, children: We }),
                                /* @__PURE__ */ t.jsx("div", { style: { flex: 1, height: 5, borderRadius: 3, background: _e, overflow: "hidden", position: "relative" }, children: m && /* @__PURE__ */ t.jsx(
                                  "div",
                                  {
                                    style: {
                                      position: "absolute",
                                      left: 0,
                                      top: 0,
                                      height: "100%",
                                      width: `${ue * 100}%`,
                                      background: `linear-gradient(90deg, ${K}aa, ${K})`,
                                      borderRadius: 3,
                                      transition: "width 1s ease"
                                    }
                                  }
                                ) })
                              ] }),
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 10, color: je, fontFamily: '"SF Mono", Consolas, monospace' }, children: [
                                /* @__PURE__ */ t.jsx("span", { children: v.split("–")[0]?.trim() }),
                                /* @__PURE__ */ t.jsx("span", { children: v.split("–")[1]?.trim() })
                              ] })
                            ] }),
                            /* @__PURE__ */ t.jsx("div", { style: { height: 1, background: Z, margin: "0 12px" } }),
                            /* @__PURE__ */ t.jsxs("div", { style: { padding: "10px 16px 14px" }, children: [
                              f && /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: je }, children: "Exchange timezone" }),
                                /* @__PURE__ */ t.jsx("span", { style: { color: Ke, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: f })
                              ] }),
                              v && p !== "stock" && /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: je }, children: "Session" }),
                                /* @__PURE__ */ t.jsx("span", { style: { color: Ke, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: v })
                              ] }),
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: je }, children: "Local time" }),
                                /* @__PURE__ */ t.jsxs("span", { style: { color: Ke, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: [
                                  x,
                                  ":",
                                  V,
                                  " ",
                                  u ? "BST" : "GMT"
                                ] })
                              ] }),
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: je }, children: "Update frequency" }),
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
        Qn && r && we && (() => {
          const a = {
            bollinger: () => ho,
            movingAverages: () => fo,
            vwap: () => po,
            volumeProfile: () => xo,
            volume: () => mo
          }, p = Ou().map((b) => ({
            key: b,
            title: Kl(b),
            enabledCheck: () => b === "volume" ? !!(r?.volume?.enabled && l.some((w) => w.volume)) : b === "volumeProfile" ? !!r?.volumeProfile?.enabled : !!(r?.[b]?.enabled && s?.[b]),
            endXSource: a[b] ?? (() => ot[b] || 0)
          })), m = He.toolbarLineHeight;
          let v = He.toolbarStartY;
          const f = [], e = r?.customBrueScripts || {};
          for (const b of p) {
            if (!b.enabledCheck()) continue;
            if (b.key !== "movingAverages") {
              const u = r?.[b.key]?.sourceScriptId;
              if (u && e[u]?.enabled) continue;
            }
            const w = _s.current[b.key] || b.endXSource() || 150;
            if (b.key === "movingAverages" && s?.movingAverages?.length > 0) {
              const u = r.movingAverages?.lines ?? [], L = r?.customBrueScripts || {};
              for (let x = 0; x < s.movingAverages.length; x++) {
                const V = u[x]?.sourceScriptId;
                if (V && L[V]?.enabled) continue;
                const d = `movingAverages__${x}`, j = v;
                v += m;
                const ue = It === d, We = u[x], Q = We ? `${We.type} ${We.period}` : "MA", Oe = () => {
                  const Z = u.filter((je, Ke) => Ke !== x);
                  we({
                    ...r,
                    movingAverages: {
                      ...r.movingAverages,
                      enabled: Z.length > 0,
                      lines: Z
                    }
                  }), ye(null), pe(null);
                };
                f.push(
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      className: "absolute z-20 flex items-center",
                      style: { left: 0, top: j - He.toolbarRowYOffset, height: m },
                      onMouseEnter: () => {
                        ye(d), en.current = !0, mt.current && clearTimeout(mt.current);
                      },
                      onMouseLeave: () => {
                        mt.current = setTimeout(() => {
                          ye((Z) => Z === d ? null : Z), en.current = !1;
                        }, 150);
                      },
                      children: [
                        ue && /* @__PURE__ */ t.jsx(
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
                            onClick: (Z) => {
                              Z.stopPropagation(), pe((je) => je === d ? null : d), ye(d);
                            },
                            onContextMenu: (Z) => {
                              Z.preventDefault(), Z.stopPropagation(), pe(d), gt({ visible: !0, x: Z.clientX, y: Z.clientY, key: d, title: Q });
                            }
                          }
                        ),
                        ue && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (Z) => {
                                Z.stopPropagation(), Oe();
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                              title: `Hide ${Q}`,
                              children: /* @__PURE__ */ t.jsx(ql, { className: "w-[15px] h-[15px]" })
                            }
                          ),
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (Z) => {
                                Z.stopPropagation(), $s({ type: "movingAverages", position: { x: w, y: j } });
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                              title: `${Q} Settings`,
                              children: /* @__PURE__ */ t.jsx(Gl, { className: "w-[15px] h-[15px]" })
                            }
                          ),
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (Z) => {
                                Z.stopPropagation(), Oe();
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors",
                              title: `Remove ${Q}`,
                              children: /* @__PURE__ */ t.jsx(Zl, { className: "w-[15px] h-[15px]" })
                            }
                          ),
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (Z) => {
                                Z.stopPropagation(), pe(d), gt({ visible: !0, x: Z.clientX, y: Z.clientY, key: d, title: Q });
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                              title: "More options",
                              children: /* @__PURE__ */ t.jsx(Jl, { className: "w-[15px] h-[15px]" })
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
            const A = v;
            v += m;
            const X = It === b.key;
            X || b.key, f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: {
                    left: 0,
                    top: A - He.toolbarRowYOffset,
                    height: m
                  },
                  onMouseEnter: () => {
                    ye(b.key), en.current = !0, mt.current && clearTimeout(mt.current);
                  },
                  onMouseLeave: () => {
                    mt.current = setTimeout(() => {
                      ye((u) => u === b.key ? null : u), en.current = !1;
                    }, 150);
                  },
                  children: [
                    X && /* @__PURE__ */ t.jsx(
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
                          u.stopPropagation(), pe((L) => L === b.key ? null : b.key), ye(b.key);
                        },
                        onContextMenu: (u) => {
                          u.preventDefault(), u.stopPropagation(), pe(b.key), gt({ visible: !0, x: u.clientX, y: u.clientY, key: b.key, title: b.title });
                        }
                      }
                    ),
                    X && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation();
                            const L = r[b.key];
                            L && we({ ...r, [b.key]: { ...L, enabled: !1 } }), ye(null), pe(null);
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                          title: `Hide ${b.title}`,
                          children: /* @__PURE__ */ t.jsx(ql, { className: "w-[15px] h-[15px]" })
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
                          children: /* @__PURE__ */ t.jsx(Gl, { className: "w-[15px] h-[15px]" })
                        }
                      ),
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation();
                            const L = r[b.key];
                            L && we({ ...r, [b.key]: { ...L, enabled: !1 } }), ye(null), pe(null);
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors",
                          title: `Remove ${b.title}`,
                          children: /* @__PURE__ */ t.jsx(Zl, { className: "w-[15px] h-[15px]" })
                        }
                      ),
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation(), pe(b.key), gt({ visible: !0, x: u.clientX, y: u.clientY, key: b.key, title: b.title });
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                          title: "More options",
                          children: /* @__PURE__ */ t.jsx(Jl, { className: "w-[15px] h-[15px]" })
                        }
                      )
                    ] })
                  ]
                },
                `overlay-row-${b.key}`
              )
            );
          }
          const O = (r?.customIndicators || []).filter((b) => b.enabled && b.display === "overlay"), H = /* @__PURE__ */ new Map(), K = [];
          for (const b of O)
            if (typeof b.expression == "string" && b.expression.startsWith("brue:") && b.scriptId) {
              const A = b.scriptId;
              H.has(A) || H.set(A, b);
            } else
              K.push(b);
          for (const b of K) {
            const w = `custom_overlay_${b.id}`, A = _s.current[w] || ot[w] || 150, X = v;
            v += m;
            const u = `ci-${b.id}`, L = It === u, x = typeof b.expression == "string" && b.expression.startsWith("local:"), V = x ? b.group || b.expression.split(":")[1] || b.name : null, d = () => {
              x ? $e?.(V) : we && we({
                ...r,
                customIndicators: (r.customIndicators || []).filter((j) => j.id !== b.id)
              }), ye(null), pe(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: X - He.toolbarRowYOffset, height: m },
                  onMouseEnter: () => {
                    ye(u), en.current = !0, mt.current && clearTimeout(mt.current);
                  },
                  onMouseLeave: () => {
                    mt.current = setTimeout(() => {
                      ye((j) => j === u ? null : j), en.current = !1;
                    }, 150);
                  },
                  children: [
                    L && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: A + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: A, height: 16 },
                        onClick: (j) => {
                          j.stopPropagation(), pe((ue) => ue === u ? null : u), ye(u);
                        },
                        onContextMenu: (j) => {
                          j.preventDefault(), j.stopPropagation(), pe(u), gt({
                            visible: !0,
                            x: j.clientX,
                            y: j.clientY,
                            key: w,
                            title: x && V || b.name,
                            custom: x ? { kind: "engine", label: V } : { kind: "formula", ciId: b.id }
                          });
                        }
                      }
                    ),
                    L && Ol({
                      kind: x ? "engine" : "formula",
                      label: x && V || b.name,
                      menuKey: w,
                      engineLabel: V || void 0,
                      ciId: b.id,
                      remove: d
                    })
                  ]
                },
                `overlay-row-${u}`
              )
            );
          }
          for (const [b, w] of H.entries()) {
            const A = `script_${b}`, X = _s.current[A] || ot[A] || 150, u = v;
            v += m;
            const L = `script-${b}`, x = It === L, V = r?.customBrueScripts?.[b]?.name || w.name || "Brue script", d = () => {
              ee?.(b), ye(null), pe(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: u - He.toolbarRowYOffset, height: m },
                  onMouseEnter: () => {
                    ye(L), en.current = !0, mt.current && clearTimeout(mt.current);
                  },
                  onMouseLeave: () => {
                    mt.current = setTimeout(() => {
                      ye((j) => j === L ? null : j), en.current = !1;
                    }, 150);
                  },
                  children: [
                    x && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: X + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: X, height: 16 },
                        onClick: (j) => {
                          j.stopPropagation(), pe((ue) => ue === L ? null : L), ye(L);
                        },
                        onContextMenu: (j) => {
                          j.preventDefault(), j.stopPropagation(), pe(L), gt({
                            visible: !0,
                            x: j.clientX,
                            y: j.clientY,
                            key: A,
                            title: V,
                            custom: { kind: "brue", sid: b }
                          });
                        }
                      }
                    ),
                    x && Ol({
                      kind: "brue",
                      label: V,
                      menuKey: A,
                      sid: b,
                      remove: d
                    })
                  ]
                },
                `overlay-row-${L}`
              )
            );
          }
          const _ = r?.customBrueScripts || {};
          for (const b of Object.keys(_)) {
            const w = _[b];
            if (!w?.enabled || H.has(b)) continue;
            const A = `script_${b}`, X = _s.current[A] || ot[A] || 150, u = v;
            v += m;
            const L = `script-${b}`, x = It === L, V = w.name || "Brue script", d = () => {
              ee?.(b), ye(null), pe(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: u - He.toolbarRowYOffset, height: m },
                  onMouseEnter: () => {
                    ye(L), en.current = !0, mt.current && clearTimeout(mt.current);
                  },
                  onMouseLeave: () => {
                    mt.current = setTimeout(() => {
                      ye((j) => j === L ? null : j), en.current = !1;
                    }, 150);
                  },
                  children: [
                    x && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: X + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: X, height: 16 },
                        onClick: (j) => {
                          j.stopPropagation(), pe((ue) => ue === L ? null : L), ye(L);
                        },
                        onContextMenu: (j) => {
                          j.preventDefault(), j.stopPropagation(), pe(L), gt({
                            visible: !0,
                            x: j.clientX,
                            y: j.clientY,
                            key: A,
                            title: V,
                            custom: { kind: "brue", sid: b }
                          });
                        }
                      }
                    ),
                    x && Ol({
                      kind: "brue",
                      label: V,
                      menuKey: A,
                      sid: b,
                      remove: d
                    })
                  ]
                },
                `overlay-row-${L}`
              )
            );
          }
          return f;
        })(),
        r && we && (() => {
          const a = Br().map((m) => ({ key: m, title: Kl(m) })), p = r?.customBrueScripts || {};
          return a.map(({ key: m, title: v }) => {
            const f = Qt.current[m];
            if (!s?.[m] || !f) return null;
            const O = r?.[m]?.sourceScriptId;
            if (O && p[O]?.enabled) return null;
            const H = Hn.current[m] || nr[m] || 150, K = `sp-${m}`, _ = It === K;
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
                  ye(K), en.current = !0, mt.current && clearTimeout(mt.current);
                },
                onMouseLeave: () => {
                  mt.current = setTimeout(() => {
                    ye((b) => b === K ? null : b), en.current = !1;
                  }, 150);
                },
                children: [
                  _ && /* @__PURE__ */ t.jsx(
                    "div",
                    {
                      className: "absolute inset-0 pointer-events-none",
                      style: {
                        width: H + 105,
                        borderRadius: 3,
                        background: "rgba(59, 130, 246, 0.08)"
                      }
                    }
                  ),
                  /* @__PURE__ */ t.jsx(
                    "div",
                    {
                      className: "cursor-pointer select-none",
                      style: { width: H, height: 16 },
                      onClick: (b) => {
                        b.stopPropagation(), pe((w) => w === K ? null : K), ye(K);
                      },
                      onContextMenu: (b) => {
                        b.preventDefault(), b.stopPropagation(), pe(K), gt({ visible: !0, x: b.clientX, y: b.clientY, key: m, title: v });
                      }
                    }
                  ),
                  _ && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (b) => {
                          b.stopPropagation();
                          const w = r[m];
                          w && we({ ...r, [m]: { ...w, enabled: !1 } }), ye(null), pe(null);
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: `Hide ${v}`,
                        children: /* @__PURE__ */ t.jsx(ql, { className: "w-[15px] h-[15px]" })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (b) => {
                          b.stopPropagation(), $s({ type: m, position: { x: H, y: f.top } });
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: `${v} Settings`,
                        children: /* @__PURE__ */ t.jsx(Gl, { className: "w-[15px] h-[15px]" })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (b) => {
                          b.stopPropagation();
                          const w = r[m];
                          w && we({ ...r, [m]: { ...w, enabled: !1 } }), ye(null), pe(null);
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors",
                        title: `Remove ${v}`,
                        children: /* @__PURE__ */ t.jsx(Zl, { className: "w-[15px] h-[15px]" })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (b) => {
                          b.stopPropagation(), pe(K), gt({ visible: !0, x: b.clientX, y: b.clientY, key: m, title: v });
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: "More options",
                        children: /* @__PURE__ */ t.jsx(Jl, { className: "w-[15px] h-[15px]" })
                      }
                    )
                  ] })
                ]
              },
              `sp-row-${m}`
            );
          });
        })(),
        r && we && (() => {
          const a = (r?.customIndicators || []).filter((e) => e.enabled && e.display === "subplot"), p = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Map();
          for (const e of a)
            if (typeof e.expression == "string" && e.expression.startsWith("brue:") && e.scriptId) {
              const H = e.scriptId;
              p.has(H) || p.set(H, e);
            } else if (typeof e.expression == "string" && e.expression.startsWith("local:") && e.group) {
              const H = e.group;
              m.has(H) || m.set(H, e);
            }
          const v = [], f = [];
          for (const [e, O] of p.entries())
            f.push({
              rowKey: `script-${e}`,
              firstPlot: O,
              label: r?.customBrueScripts?.[e]?.name || O.name || "Brue script",
              kind: "brue",
              handle: e,
              remove: () => ee?.(e)
            });
          for (const [e, O] of m.entries())
            f.push({
              rowKey: `engine-sp-${e}`,
              firstPlot: O,
              label: e,
              kind: "engine",
              handle: e,
              remove: () => $e?.(e)
            });
          for (const { rowKey: e, firstPlot: O, label: H, kind: K, handle: _, remove: b } of f) {
            const w = Qt.current[`custom_${O.id}`];
            if (!w) continue;
            const A = It === e, X = 200, u = () => {
              b(), ye(null), pe(null);
            };
            v.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: w.top + 2, height: 16 },
                  onMouseEnter: () => {
                    ye(e), en.current = !0, mt.current && clearTimeout(mt.current);
                  },
                  onMouseLeave: () => {
                    mt.current = setTimeout(() => {
                      ye((L) => L === e ? null : L), en.current = !1;
                    }, 150);
                  },
                  children: [
                    A && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: X + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: X, height: 16 },
                        onClick: (L) => {
                          L.stopPropagation(), pe((x) => x === e ? null : e), ye(e);
                        },
                        onContextMenu: (L) => {
                          L.preventDefault(), L.stopPropagation(), pe(e), gt({
                            visible: !0,
                            x: L.clientX,
                            y: L.clientY,
                            key: `custom_${O.id}`,
                            title: H,
                            custom: K === "engine" ? { kind: "engine", label: _ } : { kind: "brue", sid: _ }
                          });
                        }
                      }
                    ),
                    A && Ol({
                      kind: K,
                      label: H,
                      menuKey: `custom_${O.id}`,
                      engineLabel: K === "engine" ? _ : void 0,
                      sid: K === "brue" ? _ : void 0,
                      remove: u
                    })
                  ]
                },
                `sp-row-${e}`
              )
            );
          }
          return v;
        })(),
        /* @__PURE__ */ t.jsx(
          "div",
          {
            ref: La,
            className: "absolute top-0 cursor-ns-resize z-40",
            style: {
              right: 0,
              width: Xe,
              height: vr
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
              bottom: vt + 8,
              left: `calc(50% - ${Xe / 2}px)`,
              transform: "translateX(-50%)"
            },
            children: /* @__PURE__ */ t.jsxs("div", { className: "flex items-center bg-card/90 backdrop-blur-sm rounded-lg border border-border/40 shadow-lg overflow-hidden", children: [
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: ma,
                  className: "w-8 h-7 lg:w-10 lg:h-9 flex items-center justify-center hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all text-lg lg:text-xl font-light border-r border-border/30",
                  title: "Zoom out (show more candles)",
                  children: "−"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: xa,
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
              right: Xn ?? (He.yAxisResetUsesToolbarGap ? Oo : 0),
              width: Xn !== void 0 ? Xe - Xn : He.yAxisResetUsesToolbarGap ? Xe - Oo : Xe
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
        Na && /* @__PURE__ */ t.jsxs(
          "div",
          {
            className: "absolute left-0 h-3 flex items-center justify-center cursor-ns-resize z-10 group hover:h-4 transition-all duration-150",
            style: {
              top: vr - 6,
              right: Xe,
              left: 0
            },
            onMouseDown: yr,
            onTouchStart: yr,
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
        sl && r && we && xe && /* @__PURE__ */ t.jsx(
          _u,
          {
            type: sl.type,
            config: r,
            onConfigChange: we,
            position: sl.position,
            onClose: () => $s(null)
          }
        ),
        Nn && Nn.visible && r && we && (() => {
          const a = Ge.current?.getBoundingClientRect();
          if (!a) return null;
          const p = Nn.x - a.left, m = Nn.y - a.top, v = Nn.key, f = Nn.custom, e = () => {
            f?.kind === "brue" ? ee?.(f.sid) : f?.kind === "engine" ? $e?.(f.label) : f?.kind === "formula" && we({
              ...r,
              customIndicators: (r.customIndicators || []).filter((O) => O.id !== f.ciId)
            });
          };
          return Er.createPortal(
            (() => {
              const O = "var(--text)", H = "var(--dim)", K = "var(--hover)", _ = "var(--edge)", b = {
                display: "block",
                width: "100%",
                padding: "3px 10px",
                border: "none",
                cursor: "pointer",
                background: "transparent",
                textAlign: "left",
                fontSize: "12px",
                fontFamily: "inherit",
                color: O,
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
                          gt(null), pe(null);
                        },
                        onContextMenu: (w) => {
                          w.preventDefault(), gt(null), pe(null);
                        }
                      }
                    ),
                    /* @__PURE__ */ t.jsx("div", { style: {
                      padding: "5px 10px 3px",
                      fontSize: "11px",
                      color: H,
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
                          $s({ type: v, position: { x: p, y: m } }), gt(null);
                        },
                        children: "Settings..."
                      }
                    ),
                    f?.kind === "engine" && et && /* @__PURE__ */ t.jsx(
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
                          et(f.label), gt(null);
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
                          const w = r[v];
                          w && we({ ...r, [v]: { ...w, enabled: !1 } }), gt(null), pe(null);
                        },
                        children: "Hide"
                      }
                    ),
                    /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: `1px solid ${_}` } }),
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
                            const w = r[v];
                            w && we({ ...r, [v]: { ...w, enabled: !1 } });
                          }
                          gt(null), pe(null);
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
  { tools: ["cursor"] },
  { tools: ["trendline", "arrow", "ray", "extended", "hline", "hray", "vline", "cross"] },
  { tools: ["rectangle", "channel", "polyline", "brush"] },
  { tools: ["fib", "long", "short"] },
  { tools: ["text", "measure", "pricerange", "daterange"] }
], ad = {
  cursor: "Cursor",
  trendline: "Trendline",
  arrow: "Arrow",
  ray: "Ray",
  extended: "Extended line",
  hline: "Horizontal line",
  hray: "Horizontal ray",
  vline: "Vertical line",
  cross: "Cross line",
  rectangle: "Rectangle",
  brush: "Brush",
  measure: "Measure",
  pricerange: "Price range",
  daterange: "Date range",
  fib: "Fib retracement",
  long: "Long position",
  short: "Short position",
  text: "Text",
  channel: "Parallel channel",
  polyline: "Polyline"
};
function Xs({ children: l, size: n = 28, active: h = !1, title: T, onClick: I }) {
  return /* @__PURE__ */ t.jsxs(
    "button",
    {
      onClick: I,
      title: T,
      className: `relative flex items-center justify-center rounded-[2px] transition-colors shrink-0
        ${h ? "bg-[#343434] text-[#e8e8e8]" : "text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}
      `,
      style: { width: n, height: n },
      children: [
        h && /* @__PURE__ */ t.jsx("span", { className: "absolute left-[1px] top-[6px] bottom-[6px] w-[2px] bg-[#e8e8e8] rounded-r" }),
        /* @__PURE__ */ t.jsx("svg", { width: 14, height: 14, viewBox: "-1 -1 2 2", className: "overflow-visible", children: /* @__PURE__ */ t.jsx("g", { stroke: "currentColor", strokeWidth: 0.14, fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: l }) })
      ]
    }
  );
}
function cd({ tool: l }) {
  switch (l) {
    case "cursor":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("path", { d: "M -0.35 -0.8 L -0.35 0.45 L 0.30 0.05 Z", fill: "currentColor", stroke: "none" }),
        /* @__PURE__ */ t.jsx("line", { x1: 0.05, y1: 0.2, x2: 0.45, y2: 0.8 })
      ] });
    case "trendline":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("line", { x1: -0.55, y1: 0.55, x2: 0.55, y2: -0.55 }),
        /* @__PURE__ */ t.jsx("circle", { cx: -0.75, cy: 0.75, r: 0.12, fill: "none" }),
        /* @__PURE__ */ t.jsx("circle", { cx: 0.75, cy: -0.75, r: 0.12, fill: "none" })
      ] });
    case "arrow":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("line", { x1: -0.75, y1: 0.75, x2: 0.6, y2: -0.6 }),
        /* @__PURE__ */ t.jsx("path", { d: "M 0.75 -0.75 L 0.35 -0.55 L 0.55 -0.35 Z", fill: "currentColor", stroke: "none" })
      ] });
    case "ray":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("circle", { cx: -0.65, cy: 0.65, r: 0.12, fill: "none" }),
        /* @__PURE__ */ t.jsx("line", { x1: -0.45, y1: 0.45, x2: 0.95, y2: -0.95 })
      ] });
    case "extended":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("line", { x1: -0.95, y1: 0.95, x2: 0.95, y2: -0.95 }),
        /* @__PURE__ */ t.jsx("circle", { cx: -0.35, cy: 0.35, r: 0.1, fill: "none" }),
        /* @__PURE__ */ t.jsx("circle", { cx: 0.35, cy: -0.35, r: 0.1, fill: "none" })
      ] });
    case "hline":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("line", { x1: -0.95, y1: 0, x2: 0.95, y2: 0 }),
        /* @__PURE__ */ t.jsx("circle", { cx: 0, cy: 0, r: 0.12, fill: "none" })
      ] });
    case "hray":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("circle", { cx: -0.7, cy: 0, r: 0.12, fill: "none" }),
        /* @__PURE__ */ t.jsx("line", { x1: -0.48, y1: 0, x2: 0.95, y2: 0 })
      ] });
    case "vline":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("line", { x1: 0, y1: -0.95, x2: 0, y2: 0.95 }),
        /* @__PURE__ */ t.jsx("circle", { cx: 0, cy: 0, r: 0.12, fill: "none" })
      ] });
    case "cross":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("line", { x1: -0.95, y1: 0, x2: 0.95, y2: 0 }),
        /* @__PURE__ */ t.jsx("line", { x1: 0, y1: -0.95, x2: 0, y2: 0.95 })
      ] });
    case "rectangle":
      return /* @__PURE__ */ t.jsx("rect", { x: -0.75, y: -0.55, width: 1.5, height: 1.1, rx: 0.05 });
    case "brush":
      return /* @__PURE__ */ t.jsx("path", { d: "M -0.85 0.55 C -0.25 -0.85 0.25 0.85 0.85 -0.55" });
    case "measure":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("line", { x1: -0.8, y1: 0.6, x2: 0.8, y2: -0.6 }),
        /* @__PURE__ */ t.jsx("line", { x1: -0.55, y1: 0.15, x2: -0.3, y2: 0.5 }),
        /* @__PURE__ */ t.jsx("line", { x1: 0, y1: -0.28, x2: 0.25, y2: 0.08 }),
        /* @__PURE__ */ t.jsx("line", { x1: 0.52, y1: -0.68, x2: 0.78, y2: -0.32 })
      ] });
    case "pricerange":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("line", { x1: -0.85, y1: -0.8, x2: 0.85, y2: -0.8 }),
        /* @__PURE__ */ t.jsx("line", { x1: -0.85, y1: 0.8, x2: 0.85, y2: 0.8 }),
        /* @__PURE__ */ t.jsx("line", { x1: 0, y1: -0.62, x2: 0, y2: 0.62 }),
        /* @__PURE__ */ t.jsx("path", { d: "M 0 -0.62 L -0.12 -0.45 L 0.12 -0.45 Z", fill: "currentColor", stroke: "none" }),
        /* @__PURE__ */ t.jsx("path", { d: "M 0 0.62 L -0.12 0.45 L 0.12 0.45 Z", fill: "currentColor", stroke: "none" })
      ] });
    case "daterange":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("line", { x1: -0.8, y1: -0.85, x2: -0.8, y2: 0.85 }),
        /* @__PURE__ */ t.jsx("line", { x1: 0.8, y1: -0.85, x2: 0.8, y2: 0.85 }),
        /* @__PURE__ */ t.jsx("line", { x1: -0.62, y1: 0, x2: 0.62, y2: 0 }),
        /* @__PURE__ */ t.jsx("path", { d: "M -0.62 0 L -0.45 -0.12 L -0.45 0.12 Z", fill: "currentColor", stroke: "none" }),
        /* @__PURE__ */ t.jsx("path", { d: "M 0.62 0 L 0.45 -0.12 L 0.45 0.12 Z", fill: "currentColor", stroke: "none" })
      ] });
    case "fib":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("line", { x1: -0.85, y1: -0.65, x2: 0.85, y2: -0.65 }),
        /* @__PURE__ */ t.jsx("line", { x1: -0.85, y1: -0.1, x2: 0.3, y2: -0.1 }),
        /* @__PURE__ */ t.jsx("line", { x1: -0.85, y1: 0.35, x2: 0.6, y2: 0.35 }),
        /* @__PURE__ */ t.jsx("line", { x1: -0.85, y1: 0.8, x2: 0.85, y2: 0.8 })
      ] });
    case "long":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("rect", { x: -0.8, y: -0.85, width: 1.6, height: 0.8, rx: 0.05 }),
        /* @__PURE__ */ t.jsx("line", { x1: -0.8, y1: 0.45, x2: 0.8, y2: 0.45 }),
        /* @__PURE__ */ t.jsx("path", { d: "M 0 -0.60 L -0.12 -0.40 L 0.12 -0.40 Z", fill: "currentColor", stroke: "none" })
      ] });
    case "short":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("rect", { x: -0.8, y: 0.05, width: 1.6, height: 0.8, rx: 0.05 }),
        /* @__PURE__ */ t.jsx("line", { x1: -0.8, y1: -0.45, x2: 0.8, y2: -0.45 }),
        /* @__PURE__ */ t.jsx("path", { d: "M 0 0.60 L -0.12 0.40 L 0.12 0.40 Z", fill: "currentColor", stroke: "none" })
      ] });
    case "text":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("line", { x1: -0.7, y1: -0.7, x2: 0.7, y2: -0.7 }),
        /* @__PURE__ */ t.jsx("line", { x1: 0, y1: -0.7, x2: 0, y2: 0.8 }),
        /* @__PURE__ */ t.jsx("line", { x1: -0.28, y1: 0.8, x2: 0.28, y2: 0.8 })
      ] });
    case "channel":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("line", { x1: -0.85, y1: 0.35, x2: 0.55, y2: -0.85 }),
        /* @__PURE__ */ t.jsx("line", { x1: -0.55, y1: 0.85, x2: 0.85, y2: -0.35 })
      ] });
    case "polyline":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("line", { x1: -0.85, y1: 0.55, x2: -0.2, y2: -0.6 }),
        /* @__PURE__ */ t.jsx("line", { x1: -0.2, y1: -0.6, x2: 0.3, y2: 0.3 }),
        /* @__PURE__ */ t.jsx("line", { x1: 0.3, y1: 0.3, x2: 0.85, y2: -0.45 }),
        /* @__PURE__ */ t.jsx("circle", { cx: -0.2, cy: -0.6, r: 0.08, fill: "none" }),
        /* @__PURE__ */ t.jsx("circle", { cx: 0.3, cy: 0.3, r: 0.08, fill: "none" })
      ] });
    default:
      return null;
  }
}
function pl({ type: l }) {
  switch (l) {
    case "magnet":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("path", { d: "M -0.62 -0.15 A 0.62 0.62 0 0 0 0.62 -0.15", fill: "none" }),
        /* @__PURE__ */ t.jsx("line", { x1: -0.62, y1: -0.15, x2: -0.62, y2: 0.7 }),
        /* @__PURE__ */ t.jsx("line", { x1: 0.62, y1: -0.15, x2: 0.62, y2: 0.7 }),
        /* @__PURE__ */ t.jsx("line", { x1: -0.8, y1: 0.42, x2: -0.44, y2: 0.42 }),
        /* @__PURE__ */ t.jsx("line", { x1: 0.44, y1: 0.42, x2: 0.8, y2: 0.42 })
      ] });
    case "eye":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("path", { d: "M -0.70 -0.20 C -0.30 -0.80 0.30 -0.80 0.70 -0.20", fill: "none" }),
        /* @__PURE__ */ t.jsx("path", { d: "M -0.70 0.20 C -0.30 0.80 0.30 0.80 0.70 0.20", fill: "none" }),
        /* @__PURE__ */ t.jsx("circle", { cx: 0, cy: 0, r: 0.18, fill: "currentColor", stroke: "none" })
      ] });
    case "eyeOff":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("path", { d: "M -0.70 -0.20 C -0.30 -0.80 0.30 -0.80 0.70 -0.20", fill: "none" }),
        /* @__PURE__ */ t.jsx("path", { d: "M -0.70 0.20 C -0.30 0.80 0.30 0.80 0.70 0.20", fill: "none" }),
        /* @__PURE__ */ t.jsx("circle", { cx: 0, cy: 0, r: 0.18, fill: "currentColor", stroke: "none" }),
        /* @__PURE__ */ t.jsx("line", { x1: -0.75, y1: 0.75, x2: 0.75, y2: -0.75 })
      ] });
    case "trash":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("line", { x1: -0.8, y1: -0.55, x2: 0.8, y2: -0.55 }),
        /* @__PURE__ */ t.jsx("rect", { x: -0.55, y: -0.55, width: 1.1, height: 1.4, rx: 0.05 }),
        /* @__PURE__ */ t.jsx("line", { x1: -0.18, y1: -0.25, x2: -0.18, y2: 0.55 }),
        /* @__PURE__ */ t.jsx("line", { x1: 0.18, y1: -0.25, x2: 0.18, y2: 0.55 })
      ] });
    case "chevronLeft":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("line", { x1: 0.35, y1: -0.65, x2: -0.35, y2: 0 }),
        /* @__PURE__ */ t.jsx("line", { x1: -0.35, y1: 0, x2: 0.35, y2: 0.65 })
      ] });
    case "chevronRight":
      return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
        /* @__PURE__ */ t.jsx("line", { x1: -0.35, y1: -0.65, x2: 0.35, y2: 0 }),
        /* @__PURE__ */ t.jsx("line", { x1: 0.35, y1: 0, x2: -0.35, y2: 0.65 })
      ] });
  }
}
function id({
  activeTool: l = "cursor",
  onToolSelect: n,
  magnet: h = !1,
  onToggleMagnet: T,
  hiddenAll: I = !1,
  onToggleHidden: se,
  onClearAll: re,
  collapsed: Me = !1,
  onToggleCollapsed: r
}) {
  const [we, ee] = o.useState(!1), $e = Me ? 14 : 40;
  return Me ? /* @__PURE__ */ t.jsxs(
    "div",
    {
      className: "flex flex-col items-center bg-[#2a2a2a] border-r border-[#3a3a3a] shrink-0",
      style: { width: $e, minWidth: $e },
      children: [
        /* @__PURE__ */ t.jsx("div", { className: "h-1" }),
        /* @__PURE__ */ t.jsx(Xs, { size: 28, title: "Show drawing tools", onClick: () => r?.(), children: /* @__PURE__ */ t.jsx(pl, { type: "chevronRight" }) })
      ]
    }
  ) : /* @__PURE__ */ t.jsxs(
    "div",
    {
      className: "flex flex-col bg-[#2a2a2a] border-r border-[#3a3a3a] shrink-0 select-none",
      style: { width: $e, minWidth: $e },
      children: [
        /* @__PURE__ */ t.jsx("div", { className: "h-1 shrink-0" }),
        /* @__PURE__ */ t.jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden flex flex-col items-center gap-[2px] px-0 py-1 scrollbar-thin", children: rd.map((et, Be) => /* @__PURE__ */ t.jsxs(kc.Fragment, { children: [
          Be > 0 && /* @__PURE__ */ t.jsx("div", { className: "w-[26px] h-px bg-[#3a3a3a] my-[5px] shrink-0" }),
          et.tools.map((Fe) => /* @__PURE__ */ t.jsx(
            Xs,
            {
              active: l === Fe,
              title: ad[Fe],
              onClick: () => {
                n?.(l === Fe ? "cursor" : Fe);
              },
              children: /* @__PURE__ */ t.jsx(cd, { tool: Fe })
            },
            Fe
          ))
        ] }, Be)) }),
        /* @__PURE__ */ t.jsxs("div", { className: "shrink-0 flex flex-col items-center gap-[2px] pb-1", children: [
          /* @__PURE__ */ t.jsx("div", { className: "w-[26px] h-px bg-[#3a3a3a] my-[5px]" }),
          /* @__PURE__ */ t.jsx(Xs, { active: h, title: "Magnet (snap to OHLC)", onClick: () => T?.(), children: /* @__PURE__ */ t.jsx(pl, { type: "magnet" }) }),
          /* @__PURE__ */ t.jsx(Xs, { active: I, title: I ? "Show drawings" : "Hide all drawings", onClick: () => se?.(), children: /* @__PURE__ */ t.jsx(pl, { type: I ? "eyeOff" : "eye" }) }),
          /* @__PURE__ */ t.jsx(Xs, { title: "Remove all drawings", onClick: () => ee(!0), children: /* @__PURE__ */ t.jsx(pl, { type: "trash" }) }),
          /* @__PURE__ */ t.jsx(Xs, { title: "Hide drawing toolbar", onClick: () => r?.(), children: /* @__PURE__ */ t.jsx(pl, { type: "chevronLeft" }) })
        ] }),
        we && /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/40", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-[#262626] border border-[#3a3a3a] rounded-[3px] p-3 w-[200px] shadow-xl", children: [
          /* @__PURE__ */ t.jsx("div", { className: "text-[11px] text-[#e8e8e8] font-medium mb-3", children: "Remove all drawings?" }),
          /* @__PURE__ */ t.jsxs("div", { className: "flex gap-2 justify-end", children: [
            /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: () => ee(!1),
                className: "px-3 py-1 text-[11px] bg-[#2a2a2a] border border-[#3a3a3a] text-[#b9b9b9] rounded-[2px] hover:bg-[#343434]",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: () => {
                  re?.(), ee(!1);
                },
                className: "px-3 py-1 text-[11px] bg-[#f0426c] text-white rounded-[2px] hover:bg-[#d93a5e]",
                children: "Remove"
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
const _o = [
  { id: "candles", label: "Candles", desc: "OHLC candles" },
  { id: "fp_cluster", label: "Footprint Cluster", desc: "Bid/ask volume per price" },
  { id: "fp_profile", label: "Footprint Profile", desc: "Delta profile per candle" },
  { id: "heikin_ashi", label: "Heikin Ashi", desc: "Smoothed trend candles" },
  { id: "line", label: "Line", desc: "Close price line + live dot" },
  { id: "tpo", label: "TPO", desc: "Time Price Opportunity 30m blocks" },
  { id: "renko", label: "Renko", desc: "Brick size in ticks, price-driven" },
  { id: "flow_positioning", label: "Flow & Positioning", desc: "Analytics flow" }
];
function ud({
  value: l,
  onChange: n
}) {
  const [h, T] = o.useState(!1), I = o.useRef(null);
  o.useEffect(() => {
    const re = (Me) => {
      I.current && !I.current.contains(Me.target) && T(!1);
    };
    return document.addEventListener("mousedown", re), () => document.removeEventListener("mousedown", re);
  }, []);
  const se = _o.find((re) => re.id === l) || _o[0];
  return /* @__PURE__ */ t.jsxs("div", { ref: I, className: "relative", children: [
    /* @__PURE__ */ t.jsxs(
      "button",
      {
        onClick: () => T((re) => !re),
        className: "flex items-center gap-1 px-2 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8] hover:bg-[#343434]",
        children: [
          /* @__PURE__ */ t.jsx("span", { className: "font-medium", children: se.label }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[8px] opacity-60", children: "▾" })
        ]
      }
    ),
    h && /* @__PURE__ */ t.jsx("div", { className: "absolute top-full left-0 mt-1 z-30 w-[200px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl py-1", children: _o.map((re) => /* @__PURE__ */ t.jsxs(
      "button",
      {
        onClick: () => {
          n(re.id), T(!1);
        },
        className: `w-full text-left px-3 py-1.5 text-[11px] flex flex-col hover:bg-[#343434] ${l === re.id ? "bg-[#343434] text-[#e8e8e8]" : "text-[#b9b9b9]"}`,
        children: [
          /* @__PURE__ */ t.jsx("span", { className: "font-medium", children: re.label }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[9px] opacity-60", children: re.desc })
        ]
      },
      re.id
    )) })
  ] });
}
const Xt = [
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
  { label: "1d", ms: 864e5, sec: 86400 },
  { label: "3d", ms: 2592e5, sec: 259200 },
  { label: "1w", ms: 6048e5, sec: 604800 },
  { label: "1M", ms: 2592e6, sec: 2592e3 },
  // uppercase aliases for display compatibility
  { label: "1D", ms: 864e5, sec: 86400 },
  { label: "1W", ms: 6048e5, sec: 604800 }
];
function dd({
  value: l,
  onChange: n,
  favs: h,
  onToggleFav: T
}) {
  const [I, se] = o.useState(!1), [re, Me] = o.useState(""), r = o.useRef(null);
  o.useEffect(() => {
    const W = (q) => {
      r.current && !r.current.contains(q.target) && se(!1);
    };
    return document.addEventListener("mousedown", W), () => document.removeEventListener("mousedown", W);
  }, []);
  const we = (W) => {
    const q = W.trim();
    if (!q) return null;
    if (q.toLowerCase() === "tick") return Xt.find((ze) => ze.label === "tick") || { label: "tick", ms: 0, sec: 0 };
    if (q === "1M" || q.toLowerCase() === "1mth" || q.toLowerCase() === "1mo")
      return Xt.find((ze) => ze.label === "1M");
    const Ce = q.match(/^(\d+)(s|m|h|d|w|M)$/i);
    if (!Ce) return null;
    const te = parseInt(Ce[1], 10);
    if (!(te > 0)) return null;
    const ae = Ce[2], qe = ae.toLowerCase();
    let ge = 0;
    if (ae === "M") ge = te * 2592e6;
    else if (qe === "s") ge = te * 1e3;
    else if (qe === "m") ge = te * 6e4;
    else if (qe === "h") ge = te * 36e5;
    else if (qe === "d") ge = te * 864e5;
    else if (qe === "w") ge = te * 6048e5;
    else return null;
    if (ge < 1e3 && q.toLowerCase() !== "tick" && ge === 0 || ge > 31536e6) return null;
    const kt = ae === "M" ? `${te}M` : `${te}${qe === "d" ? "d" : qe === "w" ? "w" : qe}`;
    return { label: ae === "M" ? `${te}M` : qe === "d" && ae === "D" ? `${te}D` : qe === "w" && ae === "W" ? `${te}W` : kt, ms: ge, sec: Math.floor(ge / 1e3) };
  }, ee = (W) => h.has(W) || h.has(W.toLowerCase()) || h.has(W.toUpperCase()), $e = Xt.filter((W) => h.has(W.label)), et = ["1m", "5m", "15m", "1h", "4h", "1D"], Fe = ($e.length ? $e.map((W) => W.label).slice(0, 6) : et).filter((W, q, Ce) => Ce.indexOf(W) === q), be = (W) => {
    n(W), se(!1);
  }, Ae = (W) => W ? W === "1M" ? "1M" : W.toLowerCase() : "", fe = Ae(l.label);
  return /* @__PURE__ */ t.jsxs("div", { ref: r, className: "relative", style: { overflow: "visible" }, children: [
    /* @__PURE__ */ t.jsxs(
      "div",
      {
        className: "flex items-center gap-3 px-2 py-1 border border-[#3a3a3a] rounded bg-[#262626] text-[11px] font-mono cursor-pointer select-none overflow-visible",
        onClick: () => se((W) => !W),
        title: "Click to drop timeframe panel — exact EdgeDepth full list tick 1s 15s 30s 1m 3m 5m 15m 30m 1h 2h 4h 8h 12h 1d 3d 1w 1M + Custom",
        children: [
          Fe.map((W) => {
            const q = Xt.find((te) => te.label === W) || Xt.find((te) => te.label.toLowerCase() === W.toLowerCase()), Ce = q ? Ae(q.label) === fe || W.toLowerCase() === "1d" && (fe === "1d" || fe === "1D") : !1;
            return /* @__PURE__ */ t.jsx(
              "span",
              {
                onClick: (te) => {
                  te.stopPropagation(), q && be(q);
                },
                className: `pb-0.5 border-b-[2px] ${Ce ? "border-[#e8e8e8] text-[#e8e8e8]" : "border-transparent text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                children: W
              },
              W
            );
          }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[#b9b9b9] ml-1 text-[10px]", children: I ? "▼" : "▲" }),
          /* @__PURE__ */ t.jsxs("span", { className: "ml-2 flex items-center gap-1 text-[10px] text-[#b9b9b9]", children: [
            /* @__PURE__ */ t.jsx("span", { className: "w-1.5 h-1.5 rounded-full border border-[#b9b9b9] inline-block" }),
            " Real-time"
          ] })
        ]
      }
    ),
    I && /* @__PURE__ */ t.jsxs(
      "div",
      {
        className: "absolute top-full left-0 mt-1 z-[100] w-[300px] bg-[#0a0a0a] border border-[#2a2a2a] rounded-[4px] shadow-2xl text-[11px] font-mono overflow-hidden",
        style: { overflow: "visible" },
        children: [
          /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between px-3 py-2 bg-[#0a0a0a] border-b border-[#1e1e1e]", children: [
            /* @__PURE__ */ t.jsx("span", { className: "text-[10px] tracking-[0.15em] text-[#b9b9b9] font-bold", children: "TIMEFRAME" }),
            /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] text-[#b9b9b9] flex items-center gap-1", children: [
              /* @__PURE__ */ t.jsx("span", { className: "text-[#e8e8e8]", children: "★" }),
              " FAVOURITES ",
              $e.length,
              "/6 · FULL BAR"
            ] })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { className: "px-3 py-2 space-y-3 bg-[#0a0a0a] max-h-[65vh] overflow-auto", children: [
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] tracking-wider mb-1.5", children: "TICKS" }),
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-4 text-[11px] flex-wrap", children: ["tick"].map((W) => {
                const q = Xt.find((ae) => ae.label === W), Ce = q ? Ae(q.label) === fe : !1, te = ee(W);
                return /* @__PURE__ */ t.jsxs(
                  "button",
                  {
                    onClick: () => {
                      q && be(q);
                    },
                    onContextMenu: (ae) => {
                      ae.preventDefault(), T(W);
                    },
                    className: `flex items-center gap-0.5 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    title: "Tick chart — one bar per trade, click sets chart",
                    children: [
                      W,
                      " ",
                      te && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
                    ]
                  },
                  W
                );
              }) })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [
                /* @__PURE__ */ t.jsx("span", { className: "text-[10px] text-[#b9b9b9] tracking-wider", children: "SECONDS" }),
                /* @__PURE__ */ t.jsx("span", { className: "text-[9px] px-1 py-0.5 bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] rounded", children: "LIVE" })
              ] }),
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-3 text-[11px] flex-wrap", children: ["1s", "5s", "15s", "30s"].map((W) => {
                const q = Xt.find((ae) => ae.label === W), Ce = q ? Ae(q.label) === fe : !1, te = ee(W);
                return /* @__PURE__ */ t.jsxs(
                  "button",
                  {
                    onClick: () => {
                      q && be(q);
                    },
                    onContextMenu: (ae) => {
                      ae.preventDefault(), T(W);
                    },
                    className: `flex items-center gap-0.5 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    title: "Seconds — exact EdgeDepth, no paywall",
                    children: [
                      W,
                      " ",
                      te && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
                    ]
                  },
                  W
                );
              }) })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] tracking-wider mb-1.5", children: "MINUTES" }),
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-3 text-[11px] flex-wrap", children: ["1m", "3m", "5m", "15m", "30m"].map((W) => {
                const q = Xt.find((ae) => ae.label === W), Ce = q ? Ae(q.label) === fe : !1, te = ee(W);
                return /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    onClick: () => {
                      q && be(q);
                    },
                    onContextMenu: (ae) => {
                      ae.preventDefault(), T(W);
                    },
                    className: `flex flex-col items-center gap-0.5 pb-0.5 border-b-[2px] ${Ce ? "border-[#e8e8e8] text-[#e8e8e8]" : "border-transparent text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    title: "Click sets chart, right-click pins to bar (max 6)",
                    children: /* @__PURE__ */ t.jsxs("span", { className: "flex items-center gap-0.5", children: [
                      W,
                      " ",
                      te && /* @__PURE__ */ t.jsx("span", { className: "text-[8px] text-[#e8e8e8]", children: "★" })
                    ] })
                  },
                  W
                );
              }) })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] tracking-wider mb-1.5", children: "HOURS" }),
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-3 text-[11px] flex-wrap", children: ["1h", "2h", "4h", "6h", "8h", "12h"].map((W) => {
                const q = Xt.find((ae) => ae.label === W), Ce = q ? Ae(q.label) === fe : !1, te = ee(W);
                return /* @__PURE__ */ t.jsxs(
                  "button",
                  {
                    onClick: () => {
                      q && be(q);
                    },
                    onContextMenu: (ae) => {
                      ae.preventDefault(), T(W);
                    },
                    className: `flex items-center gap-0.5 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    children: [
                      W,
                      " ",
                      te && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
                    ]
                  },
                  W
                );
              }) })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] tracking-wider mb-1.5", children: "DAYS" }),
              /* @__PURE__ */ t.jsxs("div", { className: "flex gap-3 text-[11px] flex-wrap", children: [
                ["1d", "3d", "1w"].map((W) => {
                  const q = Xt.find((ae) => ae.label === W), Ce = q ? Ae(q.label) === fe : !1, te = ee(W);
                  return /* @__PURE__ */ t.jsxs(
                    "button",
                    {
                      onClick: () => {
                        q && be(q);
                      },
                      onContextMenu: (ae) => {
                        ae.preventDefault(), T(W);
                      },
                      className: `flex items-center gap-0.5 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                      children: [
                        W,
                        " ",
                        te && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
                      ]
                    },
                    W
                  );
                }),
                ["1D", "1W"].map((W) => {
                  const q = Xt.find((ae) => ae.label === W), Ce = q ? Ae(q.label) === fe : !1, te = ee(W);
                  return /* @__PURE__ */ t.jsxs(
                    "button",
                    {
                      onClick: () => {
                        q && be(q);
                      },
                      onContextMenu: (ae) => {
                        ae.preventDefault(), T(W);
                      },
                      className: `flex items-center gap-0.5 opacity-70 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                      title: "Alias — same as lowercase",
                      children: [
                        W,
                        " ",
                        te && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
                      ]
                    },
                    W
                  );
                })
              ] })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] tracking-wider mb-1.5", children: "MONTHS" }),
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-3 text-[11px] flex-wrap", children: ["1M"].map((W) => {
                const q = Xt.find((ae) => ae.label === W), Ce = q ? q.label === l.label || l.label === "1M" : !1, te = ee(W);
                return /* @__PURE__ */ t.jsxs(
                  "button",
                  {
                    onClick: () => {
                      q && be(q);
                    },
                    onContextMenu: (ae) => {
                      ae.preventDefault(), T(W);
                    },
                    className: `flex items-center gap-0.5 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    children: [
                      W,
                      " ",
                      te && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
                    ]
                  },
                  W
                );
              }) })
            ] }),
            /* @__PURE__ */ t.jsx("div", { className: "text-[8px] text-[#5a5a5a] tracking-wider pt-2 border-t border-[#1e1e1e]", children: "CLICK SETS THE CHART · RIGHT-CLICK PINS IT TO THE BAR (MAX 6) · FULL LIST tick 1s 15s 30s 1m 3m 5m 15m 30m 1h 2h 4h 8h 12h 1d 3d 1w 1M" }),
            /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2 pt-1 border-t border-[#1e1e1e] mt-2", children: [
              /* @__PURE__ */ t.jsx("span", { className: "text-[11px] text-[#b9b9b9] shrink-0", children: "Custom" }),
              /* @__PURE__ */ t.jsx(
                "input",
                {
                  value: re,
                  onChange: (W) => Me(W.target.value),
                  onKeyDown: (W) => {
                    if (W.key === "Enter") {
                      const q = we(re);
                      q && be(q);
                    }
                  },
                  placeholder: "e.g. 7m, 90s, 3h, tick, 1M",
                  className: "flex-1 px-2 py-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded text-[11px] text-[#e8e8e8] placeholder:text-[#4a4a4a] focus:border-[#3a3a3a] focus:outline-none"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: () => {
                    const W = we(re);
                    W && be(W);
                  },
                  className: "px-3 py-1.5 bg-[#2a2a2a] border border-[#3a3a3a] rounded text-[11px] text-[#e8e8e8] hover:bg-[#3a3a3a] shrink-0",
                  children: "Add"
                }
              )
            ] }),
            /* @__PURE__ */ t.jsx("div", { className: "text-[8px] text-[#4a4a4a]", children: "Custom timeframe — e.g. tick = tick chart, 7m = 7 minutes, 90s = 90 seconds, 3h = 3 hours, 8h = 8 hours, 3d = 3 days, 1M = 1 month, max 1y" })
          ] })
        ]
      }
    )
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
  const T = (I) => n({ ...l, ...I });
  return /* @__PURE__ */ t.jsxs("div", { className: "w-[340px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl text-[11px]", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex justify-between items-center px-3 py-2 border-b border-[#3a3a3a]", children: [
      /* @__PURE__ */ t.jsx("span", { className: "font-bold tracking-wider text-[10px] text-[#b9b9b9]", children: "APPEARANCE — ADVANCED" }),
      h && /* @__PURE__ */ t.jsx("button", { onClick: h, className: "text-[14px] text-[#b9b9b9] hover:text-[#e8e8e8]", children: "×" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "p-3 space-y-3 max-h-[70vh] overflow-auto", children: [
      /* @__PURE__ */ t.jsxs("div", { children: [
        /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] uppercase mb-1", children: "Market colors" }),
        /* @__PURE__ */ t.jsx("div", { className: "flex gap-1", children: ["teal_rose", "green_red"].map((I) => /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: () => T({ marketColors: I }),
            className: `flex-1 py-1 rounded border text-[10px] capitalize ${l.marketColors === I ? "bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]" : "border-[#3a3a3a] bg-[#2a2a2a] text-[#b9b9b9] hover:bg-[#343434]"}`,
            children: I === "teal_rose" ? "Teal / Rose #21b3a4 / #f0426c" : "Green / Red"
          },
          I
        )) })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { children: [
        /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] uppercase mb-1", children: "Interface accent" }),
        /* @__PURE__ */ t.jsx("div", { className: "flex gap-1", children: ["neutral", "mint", "indigo", "amber"].map((I) => /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: () => T({ accent: I }),
            className: `flex-1 py-1 rounded border text-[10px] capitalize ${l.accent === I ? "bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]" : "border-[#3a3a3a] bg-[#2a2a2a] text-[#b9b9b9] hover:bg-[#343434]"}`,
            children: I
          },
          I
        )) })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { children: [
        /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] uppercase mb-1", children: "Colormap — data colors exact EdgeDepth, chrome zinc" }),
        /* @__PURE__ */ t.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ t.jsx("div", { className: "text-[9px] text-[#b9b9b9]", children: "Liquidation" }),
          /* @__PURE__ */ t.jsx("div", { className: "flex gap-1", children: ["ember", "inferno", "viridis", "magma"].map((I) => /* @__PURE__ */ t.jsx(
            "button",
            {
              onClick: () => T({ liqColormap: I }),
              className: `flex-1 py-1 rounded border text-[10px] capitalize ${l.liqColormap === I ? "bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]" : "border-[#3a3a3a] bg-[#2a2a2a] text-[#b9b9b9] hover:bg-[#343434]"}`,
              children: I
            },
            I
          )) }),
          /* @__PURE__ */ t.jsx("div", { className: "text-[9px] text-[#b9b9b9] mt-2", children: "Orderbook" }),
          /* @__PURE__ */ t.jsx("div", { className: "flex gap-1", children: ["orderbook", "deepdom", "bookmap", "realtime", "realtime_warm"].map((I) => /* @__PURE__ */ t.jsx(
            "button",
            {
              onClick: () => T({ obColormap: I }),
              className: `flex-1 py-1 rounded border text-[10px] capitalize ${l.obColormap === I ? "bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]" : "border-[#3a3a3a] bg-[#2a2a2a] text-[#b9b9b9] hover:bg-[#343434]"}`,
              children: I
            },
            I
          )) })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Opacity ",
            Math.round(l.opacity * 100),
            "%"
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 0.1, max: 1, step: 0.05, value: l.opacity, onChange: (I) => T({ opacity: parseFloat(I.target.value) }), className: "accent-[#d0d0d0]" })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Intensity ",
            l.intensity.toFixed(2)
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 0.1, max: 3, step: 0.1, value: l.intensity, onChange: (I) => T({ intensity: parseFloat(I.target.value) }), className: "accent-[#d0d0d0]" })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Gamma ",
            l.gamma.toFixed(2)
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 0.5, max: 2.5, step: 0.1, value: l.gamma, onChange: (I) => T({ gamma: parseFloat(I.target.value) }), className: "accent-[#d0d0d0]" })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Noise floor ",
            l.noiseFloor.toFixed(3)
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 1e-3, max: 0.1, step: 1e-3, value: l.noiseFloor, onChange: (I) => T({ noiseFloor: parseFloat(I.target.value) }), className: "accent-[#d0d0d0]" })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Low ",
            l.lowPeak.low
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "number", value: l.lowPeak.low, onChange: (I) => T({ lowPeak: { ...l.lowPeak, low: parseFloat(I.target.value) || 0 } }), className: "px-2 py-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8]" })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Peak ",
            l.lowPeak.peak
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "number", value: l.lowPeak.peak, onChange: (I) => T({ lowPeak: { ...l.lowPeak, peak: parseFloat(I.target.value) || 1e5 } }), className: "px-2 py-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8]" })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Tick-per-row ×",
            l.tickPerRow
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 1, max: 8, step: 1, value: l.tickPerRow, onChange: (I) => T({ tickPerRow: parseInt(I.target.value) }), className: "accent-[#d0d0d0]" })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Half-life ",
            l.halfLife,
            "m"
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 1, max: 240, step: 1, value: l.halfLife, onChange: (I) => T({ halfLife: parseInt(I.target.value) }), className: "accent-[#d0d0d0]" })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ t.jsxs("label", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t.jsx("input", { type: "checkbox", checked: l.linearFilter, onChange: (I) => T({ linearFilter: I.target.checked }) }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[10px] text-[#e8e8e8]", children: "Linear filter (smooth cloud)" })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t.jsx("input", { type: "checkbox", checked: l.reachModulation, onChange: (I) => T({ reachModulation: I.target.checked }) }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[10px] text-[#e8e8e8]", children: "Reach modulation (cone)" })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "pt-2 border-t border-[#3a3a3a] space-y-1 text-[10px] text-[#b9b9b9]", children: [
        /* @__PURE__ */ t.jsx("div", { children: "• GPU ring 8192×1024 R32F + meta + reach — exact EdgeDepth" }),
        /* @__PURE__ */ t.jsx("div", { children: "• Market colors Teal #21b3a4 Rose #f0426c, accent Neutral #d0d0d0" }),
        /* @__PURE__ */ t.jsx("div", { children: "• Colormap Ember/Inferno/Magma/Viridis exact stops, discard 0.07/0.004" })
      ] })
    ] })
  ] });
}
const _r = hd;
function pd({ open: l, onClose: n, onSelect: h }) {
  const [T, I] = o.useState(""), [se, re] = o.useState(""), [Me, r] = o.useState([]);
  o.useEffect(() => {
    let ee = !0;
    return l && (async () => {
      try {
        const be = ["/api/orderflow/tickers?limit=770", "/api/symbols?limit=770", "/api/tickers"];
        for (const Ae of be)
          try {
            const fe = await fetch(Ae);
            if (fe.ok) {
              const W = await fe.json(), q = W.tickers || W.symbols || W.data || [];
              if (q.length) {
                const Ce = q.slice(0, 770).map((te) => ({
                  symbol: te.symbol || te.pair || te.name,
                  base: te.base_asset || te.base || (te.symbol || "").split("USDT")[0] || te.symbol,
                  exchange: te.exchange || te.provider || "binancef",
                  price: te.last_price || te.price || 100 + Math.random() * 5e4,
                  change: te.change_pct_24h || te.change || (Math.random() - 0.5) * 10,
                  listed: !0
                }));
                if (ee && Ce.length) {
                  r(Ce);
                  return;
                }
              }
            }
          } catch {
          }
      } catch {
      }
      if (!ee) return;
      const et = ["BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "DOGE", "AVAX", "DOT", "LINK", "LTC", "BCH", "UNI", "XLM", "ETC", "FIL", "TRX", "APT", "ARB", "OP", "MATIC", "ATOM", "NEAR", "FTM", "ALGO"], Be = ["binancef", "hl", "coinbase"], Fe = [];
      for (let be = 0; be < 770; be++) {
        const Ae = et[be % et.length], fe = Be[be % Be.length];
        Fe.push({ symbol: `${Ae}${fe === "binancef" ? "USDT" : "-USD"}`, base: Ae, exchange: fe, price: 100 + Math.random() * 5e4, change: (Math.random() - 0.5) * 10, listed: !0 });
      }
      r(Fe);
    })(), () => {
      ee = !1;
    };
  }, [l]);
  const we = o.useMemo(() => Me.filter((ee) => !(se && ee.exchange !== se || T && !ee.symbol.toLowerCase().includes(T.toLowerCase()) && !ee.base.toLowerCase().includes(T.toLowerCase()))).slice(0, 200), [Me, T, se]);
  return l ? /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-[150] flex items-center justify-center bg-black/60", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-[#262626] border border-[#3a3a3a] rounded shadow-2xl w-[480px] max-h-[80vh] flex flex-col", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "px-3 py-2 border-b border-[#3a3a3a] flex items-center gap-2", children: [
      /* @__PURE__ */ t.jsx("span", { className: "text-[11px] font-bold tracking-wider text-[#e8e8e8]", children: "FIND SYMBOL — 770 LISTED" }),
      /* @__PURE__ */ t.jsxs("span", { className: "text-[9px] text-[#b9b9b9]", children: [
        Me.length,
        " loaded • ",
        se || "all venues"
      ] }),
      /* @__PURE__ */ t.jsx("button", { onClick: n, className: "ml-auto text-[#b9b9b9] hover:text-[#e8e8e8]", children: "×" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "p-2 flex gap-2 border-b border-[#3a3a3a]/50", children: [
      /* @__PURE__ */ t.jsx("input", { value: T, onChange: (ee) => I(ee.target.value), placeholder: "Search BTC, ETH...", className: "flex-1 px-2 py-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded text-[11px] text-[#e8e8e8]", autoFocus: !0 }),
      /* @__PURE__ */ t.jsxs("select", { value: se, onChange: (ee) => re(ee.target.value), className: "px-2 py-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded text-[10px] text-[#b9b9b9]", children: [
        /* @__PURE__ */ t.jsx("option", { value: "", children: "All venues" }),
        /* @__PURE__ */ t.jsx("option", { value: "binancef", children: "Binance" }),
        /* @__PURE__ */ t.jsx("option", { value: "hl", children: "Hyperliquid" }),
        /* @__PURE__ */ t.jsx("option", { value: "coinbase", children: "Coinbase" })
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "flex-1 overflow-auto", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "grid grid-cols-4 px-2 py-1 text-[9px] text-[#b9b9b9] uppercase tracking-wider border-b border-[#3a3a3a]/30 bg-[#2a2a2a] sticky top-0", children: [
        /* @__PURE__ */ t.jsx("span", { children: "SYMBOL" }),
        /* @__PURE__ */ t.jsx("span", { children: "PRICE" }),
        /* @__PURE__ */ t.jsx("span", { children: "24H%" }),
        /* @__PURE__ */ t.jsx("span", { children: "VENUE" })
      ] }),
      we.map((ee) => /* @__PURE__ */ t.jsxs("div", { onClick: () => {
        h(ee.symbol), n();
      }, className: "grid grid-cols-4 px-2 py-1.5 text-[11px] border-b border-[#3a3a3a]/20 hover:bg-[#343434] cursor-pointer", children: [
        /* @__PURE__ */ t.jsx("span", { className: "font-mono font-medium text-[#e8e8e8]", children: ee.symbol }),
        /* @__PURE__ */ t.jsx("span", { className: "font-mono tabular-nums", children: ee.price.toFixed(2) }),
        /* @__PURE__ */ t.jsxs("span", { className: `tabular-nums ${ee.change >= 0 ? "text-[#21b3a4]" : "text-[#f0426c]"}`, children: [
          ee.change >= 0 ? "+" : "",
          ee.change.toFixed(2),
          "%"
        ] }),
        /* @__PURE__ */ t.jsx("span", { className: "text-[10px] text-[#b9b9b9]", children: ee.exchange })
      ] }, `${ee.exchange}:${ee.symbol}`)),
      we.length === 0 && /* @__PURE__ */ t.jsxs("div", { className: "px-2 py-4 text-[11px] text-[#b9b9b9] text-center", children: [
        "No matches — ",
        Me.length,
        " symbols loaded"
      ] })
    ] }),
    /* @__PURE__ */ t.jsx("div", { className: "px-2 py-1 text-[9px] text-[#b9b9b9]/60 border-t border-[#3a3a3a]", children: "770 listed • API first then synthetic • categories/venues/sparkline/score/type • click to select" })
  ] }) }) : null;
}
const xd = [
  { id: "chart", label: "Chart", desc: "Candles + indicators" },
  { id: "dom", label: "DOM", desc: "Depth ladder BUYS/BIDS/PRICE/ASKS/SELLS/DELTA" },
  { id: "tape", label: "Time & Sales", desc: "PRICE QTY TIME" },
  { id: "depth", label: "Depth Heatmap", desc: "Orderbook heatmap" },
  { id: "edgedepth", label: "EdgeDepth Heatmap", desc: "GPU 8192x1024" },
  { id: "footprint", label: "Footprint", desc: "Cluster/profile" },
  { id: "vpvr", label: "VPVR", desc: "Volume Profile POC/VAH/VAL" },
  { id: "tpo", label: "TPO", desc: "Time Price Opportunity 30m" },
  { id: "liquidations", label: "Liquidations", desc: "Liq heatmap Ember/Viridis/Magma/Inferno" },
  { id: "watchlist", label: "Watchlist", desc: "1503 pairs categories/venues/sparkline" }
];
function md({ onSelect: l }) {
  const [n, h] = o.useState(!1), T = o.useRef(null);
  return o.useEffect(() => {
    const I = (se) => {
      T.current && !T.current.contains(se.target) && h(!1);
    };
    return document.addEventListener("mousedown", I), () => document.removeEventListener("mousedown", I);
  }, []), /* @__PURE__ */ t.jsxs("div", { ref: T, className: "relative", children: [
    /* @__PURE__ */ t.jsx("button", { onClick: () => h((I) => !I), className: "px-2 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8] hover:bg-[#343434]", children: "+Widget ▾" }),
    n && /* @__PURE__ */ t.jsxs("div", { className: "absolute top-full left-0 mt-1 z-30 w-[240px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl py-1", children: [
      /* @__PURE__ */ t.jsx("div", { className: "px-2 py-1 text-[9px] text-[#b9b9b9] uppercase tracking-wider", children: "Add widget — 10 items" }),
      xd.map((I) => /* @__PURE__ */ t.jsxs("button", { onClick: () => {
        l(I.id), h(!1);
      }, className: "w-full text-left px-3 py-1.5 hover:bg-[#343434] flex flex-col", children: [
        /* @__PURE__ */ t.jsx("span", { className: "text-[11px] text-[#e8e8e8] font-medium", children: I.label }),
        /* @__PURE__ */ t.jsx("span", { className: "text-[9px] text-[#b9b9b9]/60", children: I.desc })
      ] }, I.id))
    ] })
  ] });
}
const an = (() => {
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
})(), Ho = /* @__PURE__ */ new Set(), xl = () => Ho.forEach((l) => l()), eo = (l, n) => {
  try {
    localStorage.setItem(l, n);
  } catch {
  }
}, Wn = {
  get: () => an,
  setLayout(l) {
    an.layout = l, eo("lset-layout", l), xl();
  },
  setSync(l) {
    an.sync = l, eo("lset-layout-sync", JSON.stringify(l)), xl();
  },
  setPanelSymbol(l, n) {
    an.panelSymbols = [...an.panelSymbols], an.panelSymbols[l] = n, eo("lset-layout-symbols", JSON.stringify(an.panelSymbols)), xl();
  },
  setPanelKind(l, n) {
    an.panelKinds = [...an.panelKinds], an.panelKinds[l] = n, eo("lset-layout-kinds", JSON.stringify(an.panelKinds)), xl();
  },
  setActivePanel(l) {
    an.activePanel !== l && (an.activePanel = l, xl());
  },
  subscribe(l) {
    return Ho.add(l), () => {
      Ho.delete(l);
    };
  }
};
function Go() {
  const [, l] = o.useState(0);
  return o.useEffect(() => Wn.subscribe(() => l((n) => n + 1)), []), { ...an };
}
const bd = o.lazy(() => import("./chunks/depth-DlOTyhhP.js").then((l) => l.E)), gd = o.lazy(() => import("./chunks/EdgeDepthDOMPanel-CSa5pgLO.js")), vd = o.lazy(() => import("./chunks/EdgeDepthTapePanel-DQfRW2GA.js")), yd = o.lazy(() => import("./chunks/EdgeDepthFootprintPanel-FdQWkwUq.js")), kd = o.lazy(() => import("./chunks/EdgeDepthVolumeProfilePanel-BC2W3WpS.js")), wd = o.lazy(() => import("./chunks/EdgeDepthTPOPanel-CbTLWjSe.js")), Sd = o.lazy(() => import("./chunks/EdgeDepthLiquidationPanel-Bt3fyOwF.js")), Cd = o.lazy(() => import("./chunks/EdgeDepthWatchlist-C5OkGnPW.js")), Id = o.lazy(() => import("./chunks/EdgeDepthIndicators-Dr9Njf69.js")), $r = () => /* @__PURE__ */ t.jsx("div", { className: "h-full w-full flex items-center justify-center text-[11px] text-[var(--dim)]", children: "Loading…" }), Hr = {
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
  colors: T,
  active: I,
  onActivate: se,
  kind: re,
  onToggleKind: Me,
  syncedCrosshairTime: r,
  onCrosshairMove: we,
  syncedViewportTime: ee,
  onViewportTimeChange: $e,
  quote: et
}) {
  const [Be, Fe] = o.useState([]), be = lo();
  o.useEffect(() => {
    if (re !== "chart") return;
    let fe = !1;
    Fe([]);
    const W = async () => {
      try {
        const Ce = await Hu("multi_panel", { symbol: l, timeframe: h, limit: 500 });
        !fe && Ce?.length && Fe(Ce.map((te) => ({
          time: Date.parse(te.timestamp),
          open: te.open,
          high: te.high,
          low: te.low,
          close: te.close,
          volume: te.volume
        })));
      } catch {
      }
    };
    W();
    const q = setInterval(W, 1e4);
    return () => {
      fe = !0, clearInterval(q);
    };
  }, [l, h, re]);
  const Ae = () => {
    const fe = re;
    return fe === "depth" ? /* @__PURE__ */ t.jsx(Qu, { symbol: l, sourceProvider: n, colors: T, syncedCrosshairTime: r, onCrosshairMove: we, onToggleKind: Me }) : fe === "edgedepth" ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx($r, {}), children: /* @__PURE__ */ t.jsx(bd, { symbol: l, provider: n || "binance", onToggleKind: Me }) }) : ["dom", "tape", "footprint", "vpvr", "tpo", "liquidations", "watchlist", "indicators", "ed_liquidations", "ed_vpvr", "ed_footprint", "ed_tpo"].includes(fe) ? /* @__PURE__ */ t.jsxs(o.Suspense, { fallback: /* @__PURE__ */ t.jsx($r, {}), children: [
      fe === "dom" && /* @__PURE__ */ t.jsx(gd, { symbol: l, provider: n || "binance" }),
      fe === "tape" && /* @__PURE__ */ t.jsx(vd, { symbol: l, provider: n || "binance" }),
      (fe === "footprint" || fe === "ed_footprint") && /* @__PURE__ */ t.jsx(yd, { symbol: l, provider: n || "binance" }),
      (fe === "vpvr" || fe === "ed_vpvr") && /* @__PURE__ */ t.jsx(kd, { symbol: l, provider: n || "binance" }),
      (fe === "tpo" || fe === "ed_tpo") && /* @__PURE__ */ t.jsx(wd, { symbol: l, provider: n || "binance" }),
      (fe === "liquidations" || fe === "ed_liquidations") && /* @__PURE__ */ t.jsx(Sd, { symbol: l, provider: n || "binance" }),
      fe === "watchlist" && /* @__PURE__ */ t.jsx(Cd, { activeSymbol: l, onSelectSymbol: (W) => {
        try {
          window.__lseShell?.selectSymbol?.(W);
        } catch {
        }
      } }),
      fe === "indicators" && /* @__PURE__ */ t.jsx(Id, { symbol: l, provider: n || "binance" })
    ] }) : Be.length > 0 ? /* @__PURE__ */ t.jsx(
      qo,
      {
        candles: Be,
        symbol: l,
        timeframe: h,
        chartType: "candlestick",
        livePrice: Be[Be.length - 1]?.close ?? null,
        rightOffset: 6,
        colors: T,
        indicators: zs,
        timezone: be?.data?.timezone || "local",
        syncedCrosshairTime: r ?? void 0,
        onCrosshairMove: we,
        syncedViewportTime: ee ?? void 0,
        onViewportTimeChange: $e,
        showBidAskSpread: !!et,
        brokerBid: et?.bid ?? null,
        brokerAsk: et?.ask ?? null
      }
    ) : null;
  };
  return /* @__PURE__ */ t.jsx(
    "div",
    {
      onMouseDown: se,
      style: {
        position: "relative",
        minWidth: 0,
        minHeight: 0,
        overflow: "hidden",
        border: I ? "1px solid var(--accent-bar, #888)" : "1px solid var(--edge, #2a2e39)"
      },
      children: Ae()
    }
  );
}
function Md({
  layout: l,
  syncSettings: n,
  pair: h,
  timeframe: T,
  colors: I,
  quote: se,
  sourceProvider: re
}) {
  const Me = Hr[l] || Hr["2x2"], { activePanel: r, panelSymbols: we, panelKinds: ee } = Go(), $e = Math.min(r, Me.count - 1), [et, Be] = o.useState([]), [Fe, be] = o.useState(null), [Ae, fe] = o.useState(null), W = o.useMemo(() => I || oo(), [I]);
  o.useEffect(() => {
    Be((te) => {
      const ae = [...te];
      for (let qe = ae.length; qe < Me.count; qe++)
        ae.push(qe === 0 ? T : Vr[qe % Vr.length]);
      return ae.slice(0, Me.count);
    });
  }, [Me.count, T]);
  const q = o.useCallback((te) => {
    n.syncCrosshair && be(te);
  }, [n.syncCrosshair]), Ce = o.useCallback((te) => {
    n.syncTime && fe(te);
  }, [n.syncTime]);
  return /* @__PURE__ */ t.jsx("div", { style: {
    display: "grid",
    width: "100%",
    height: "100%",
    gap: 2,
    gridTemplateColumns: `repeat(${Me.cols}, 1fr)`,
    gridTemplateRows: `repeat(${Me.rows}, 1fr)`
  }, children: Array.from({ length: Me.count }, (te, ae) => /* @__PURE__ */ t.jsx(
    Td,
    {
      symbol: n.syncSymbol ? h : we[ae] || h,
      sourceProvider: re,
      timeframe: n.syncInterval ? T : et[ae] || T,
      colors: W,
      active: ae === $e,
      onActivate: () => Wn.setActivePanel(ae),
      kind: ee[ae] || "chart",
      onToggleKind: () => {
        const qe = ee[ae] || "chart", ge = ["chart", "edgedepth", "depth", "dom", "tape", "footprint", "vpvr", "tpo", "liquidations", "watchlist", "indicators"], kt = ge.indexOf(qe), wt = ge[(kt + 1) % ge.length];
        Wn.setPanelKind(ae, wt);
      },
      syncedCrosshairTime: n.syncCrosshair ? Fe : null,
      onCrosshairMove: q,
      syncedViewportTime: n.syncTime ? Ae : null,
      onViewportTimeChange: Ce,
      quote: se
    },
    ae
  )) });
}
const no = [
  "lse-drawing-favorites",
  // which drawing tools are favourited
  "lse-drawing-favorites-pos",
  // position of the floating favourites toolbar
  "chart-sidebar-width"
  // chart sidebar width
];
let Xr = !1, to = null;
async function jd() {
  const l = {};
  for (const n of no) {
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
  to && clearTimeout(to), to = setTimeout(() => {
    to = null, jd();
  }, 400);
}
async function Jr() {
  if (Xr) return;
  Xr = !0;
  try {
    const h = await fetch("/api/workspace/tools");
    if (h.ok) {
      const I = (await h.json())?.value ?? {};
      for (const se of no) {
        const re = I[se];
        typeof re == "string" && localStorage.setItem(se, re);
      }
    }
  } catch {
  }
  const l = localStorage.setItem.bind(localStorage), n = localStorage.removeItem.bind(localStorage);
  localStorage.setItem = (h, T) => {
    l(h, T), no.includes(h) && Yr();
  }, localStorage.removeItem = (h) => {
    n(h), no.includes(h) && Yr();
  };
}
const zr = ["#38bdf8", "#fbbf24", "#c084fc", "#34d399", "#fb7185", "#a3e635"];
function Rd(l, n) {
  if (!l || !n.length) return [];
  const h = /* @__PURE__ */ new Map();
  for (let se = 0; se < n.length; se++)
    h.set(Math.floor(n[se].time / 1e3), se);
  const T = [];
  let I = 0;
  for (const [se, re] of Object.entries(l))
    for (const [Me, r] of Object.entries(re.series || {})) {
      const we = new Array(n.length).fill(NaN);
      let ee = 0;
      for (const [Be, Fe] of r.points || []) {
        const be = h.get(Be);
        be !== void 0 && (we[be] = Fe, ee++);
      }
      if (!ee) continue;
      const et = Object.keys(re.series).length > 1 ? `${se} ${Me}` : se;
      T.push({
        id: `local-${se}-${Me}`,
        name: et,
        // The prefix is what tells ProChart's formula evaluator to leave this
        // series alone and draw the precomputed values.
        expression: `local:${se}:${Me}`,
        enabled: !0,
        display: re.overlay ? "overlay" : "subplot",
        color: zr[I++ % zr.length],
        lineWidth: 2,
        zeroLine: !1,
        data: we,
        kind: r.kind,
        // One pane per ENGINE INDICATOR, not per column: MACD's three series
        // must share a pane and a scale or the histogram is meaningless.
        group: se
      });
    }
  return T;
}
const Pd = o.lazy(() => import("./chunks/depth-DlOTyhhP.js").then((l) => l.a)), Ld = o.lazy(() => import("./chunks/depth-DlOTyhhP.js").then((l) => l.E)), Kr = o.lazy(() => import("./chunks/EdgeDepthDOMPanel-CSa5pgLO.js")), Nd = o.lazy(() => import("./chunks/EdgeDepthTapePanel-DQfRW2GA.js")), Ed = o.lazy(() => import("./chunks/EdgeDepthWatchlist-C5OkGnPW.js")), Ad = o.lazy(() => import("./chunks/EdgeDepthIndicators-Dr9Njf69.js")), Dd = o.lazy(() => import("./chunks/EdgeDepthLayers-DRUflkF6.js")), Bd = o.lazy(() => import("./chunks/EdgeDepthLiquidationPanel-Bt3fyOwF.js")), Wd = o.lazy(() => import("./chunks/EdgeDepthVolumeProfilePanel-BC2W3WpS.js")), Fd = o.lazy(() => import("./chunks/EdgeDepthFootprintPanel-FdQWkwUq.js")), Od = o.lazy(() => import("./chunks/EdgeDepthTPOPanel-CbTLWjSe.js")), _d = o.lazy(() => import("./chunks/backtest-CeqYlV1v.js").then((l) => l.bN)), $d = o.lazy(() => import("./chunks/backtest-CeqYlV1v.js").then((l) => l.bO)), Hd = o.lazy(() => import("./chunks/econ-BeCAerYp.js")), Vd = o.lazy(() => import("./chunks/dataviz-D6zeVYjn.js")), Xd = o.lazy(() => import("./chunks/quant-CYlcHa_2.js")), Yd = o.lazy(() => import("./chunks/notebooks-fOzYQotZ.js")), ns = () => /* @__PURE__ */ t.jsx("div", { className: "h-full w-full flex items-center justify-center text-[11px] text-[var(--dim)]", children: "Loading…" }), zd = {
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
}, kn = {
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
function Kd({ provider: l, symbol: n, timeframe: h, candles: T, chartType: I = "candlestick", trades: se = [], engineIndicators: re, indicatorPatch: Me = null, quote: r = null, positions: we = [], onPositionModify: ee, onPositionClose: $e, autoSelectPositionId: et = null }) {
  const Be = `${l}|${n}|${h}`, [Fe, be] = o.useState(() => {
    try {
      const y = `${l}|${n}|${h}`, ce = localStorage.getItem(`lse-candles-${y}`);
      if (ce) {
        const G = JSON.parse(ce);
        if (Array.isArray(G) && G.length > 0)
          return { key: y, older: G.slice(-200), shift: 0 };
      }
    } catch {
    }
    return { key: Be, older: [], shift: 0 };
  });
  Fe.key !== Be && be({ key: Be, older: [], shift: 0 });
  const Ae = o.useRef(null), fe = o.useRef(!1), [W, q] = o.useState(!1), Ce = o.useMemo(() => {
    if (!Fe.older.length || !T.length) {
      try {
        T.length > 0 && localStorage.setItem(`lse-candles-${Be}`, JSON.stringify(T.slice(-200)));
      } catch {
      }
      return T;
    }
    const y = T[0].time, ce = [...Fe.older.filter((G) => G.time < y), ...T];
    try {
      localStorage.setItem(`lse-candles-${Be}`, JSON.stringify(ce.slice(-200)));
    } catch {
    }
    return ce;
  }, [Fe.older, T, Be]), te = o.useCallback(async () => {
    if (fe.current || Ae.current === Be) return;
    const ce = Ce;
    if (!ce.length || ce.length >= 5e4) return;
    const G = Be, ke = ce[0].time;
    fe.current = !0, q(!0);
    try {
      const bt = `/api/candles?provider=${encodeURIComponent(l)}&symbol=${encodeURIComponent(n)}&timeframe=${encodeURIComponent(h)}&limit=5000&end=${encodeURIComponent(new Date(ke).toISOString())}`, Ee = await fetch(bt);
      if (!Ee.ok) {
        let De = "";
        try {
          De = String((await Ee.json()).detail || "");
        } catch {
        }
        /no (history|prints|data)|served no|no real candles/i.test(De) && (Ae.current = G);
        return;
      }
      const Ht = ((await Ee.json()).candles || []).map(([De, xt, ds, Kt, jt, At]) => ({
        time: De < 1e12 ? De * 1e3 : De,
        open: xt,
        high: ds,
        low: Kt,
        close: jt,
        volume: At
      })).filter((De) => De.time < ke);
      if (!Ht.length) {
        Ae.current = G;
        return;
      }
      be((De) => De.key !== G ? De : {
        key: G,
        older: [...Ht, ...De.older],
        shift: De.shift + Ht.length
      });
    } catch {
    } finally {
      fe.current = !1, q(!1);
    }
  }, [Ce, l, n, h, Be]), [ae, qe] = o.useState(null), [ge, kt] = o.useState(null), [wt, ze] = o.useState("cursor"), [Yt, Zt] = o.useState(!1), [Qe, pt] = o.useState(!1), [nn, wn] = o.useState(null), [Tt, Lt] = o.useState([]), [sn, zt] = o.useState(zs), [cn, Xn] = o.useState(!1), [As, wl] = o.useState(!1), [ks, ss] = o.useState("candles"), [ws, Ss] = o.useState(() => {
    try {
      const y = typeof h == "string" ? h : "1m", ce = Xt.find((G) => G.label.toLowerCase() === y.toLowerCase() || G.label === y);
      if (ce) return ce;
    } catch {
    }
    return Xt.find((y) => y.label === "1m") || Xt[5] || Xt[0];
  }), [Ks, Sl] = o.useState(() => {
    try {
      const y = localStorage.getItem("ed_fav_tf");
      return new Set(y ? JSON.parse(y) : ["1m", "5m", "15m", "1h", "4h", "1D"]);
    } catch {
      return /* @__PURE__ */ new Set(["1m", "5m", "15m", "1h", "4h", "1D"]);
    }
  });
  o.useEffect(() => {
    try {
      const y = String(h || "1m"), ce = Xt.find((G) => G.label.toLowerCase() === y.toLowerCase() || G.label === y);
      if (ce && ce.label.toLowerCase() !== ws.label.toLowerCase())
        Ss(ce);
      else if (!ce) {
        const G = y.match(/^(\d+)([smhdwM])$/i);
        if (G) {
          const ke = parseInt(G[1], 10), bt = G[2];
          let Ee = 0;
          const Et = bt.toLowerCase();
          bt === "M" ? Ee = ke * 2592e6 : Et === "s" ? Ee = ke * 1e3 : Et === "m" ? Ee = ke * 6e4 : Et === "h" ? Ee = ke * 36e5 : Et === "d" ? Ee = ke * 864e5 : Et === "w" && (Ee = ke * 6048e5), Ee > 0 && Ss({ label: y, ms: Ee, sec: Math.floor(Ee / 1e3) });
        } else y.toLowerCase() === "tick" && Ss({ label: "tick", ms: 0, sec: 0 });
      }
    } catch {
    }
  }, [h]);
  const [st, Cl] = o.useState(() => {
    try {
      const y = localStorage.getItem("ed_appearance");
      if (y) return { ..._r, ...JSON.parse(y) };
    } catch {
    }
    return _r;
  }), [Ge, Ds] = o.useState(!1);
  o.useEffect(() => {
    try {
      localStorage.setItem("ed_appearance", JSON.stringify(st));
    } catch {
    }
  }, [st]);
  const [Us, qs] = o.useState(!1), [Il, Tl] = o.useState(!0), [Bs, Gs] = o.useState(!1), [Sn, xe] = o.useState(() => {
    try {
      const y = localStorage.getItem("ed_layers");
      if (y) return JSON.parse(y);
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
  }), Zs = o.useCallback((y) => {
    xe(y);
    try {
      localStorage.setItem("ed_layers", JSON.stringify(y));
    } catch {
    }
    const ce = (G) => y.find((ke) => ke.id === G)?.enabled;
    zt((G) => {
      let ke = !1;
      const bt = { ...G };
      if (ce("vpvr") !== void 0) {
        const Ee = !!ce("vpvr");
        G.volumeProfile?.enabled !== Ee && (bt.volumeProfile = { ...G.volumeProfile, enabled: Ee, numberOfRows: 48, rowWidth: 15, opacity: 60 }, ke = !0);
      }
      if (ce("session_vwap") !== void 0) {
        const Ee = !!ce("session_vwap");
        G.vwap?.enabled !== Ee && (bt.vwap = { ...G.vwap, enabled: Ee, color: "#2196F3" }, ke = !0);
      }
      if (ce("prev_day") !== void 0 || ce("prev_week") !== void 0) {
        const Ee = !!ce("prev_day") || !!ce("prev_week");
        G.pivotPoints?.enabled !== Ee && (bt.pivotPoints = { ...G.pivotPoints, enabled: Ee }, ke = !0);
      }
      return ke ? bt : G;
    }), ce("liquidations");
  }, []), ie = o.useCallback(() => {
    window.dispatchEvent(new CustomEvent("lset:open-indicators"));
  }, []), Nt = o.useCallback((y) => ({
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
  })[y] ?? null, []), Le = o.useCallback((y) => {
    ze(y);
    const ce = Nt(y);
    kt(ce);
  }, [Nt]), Yn = o.useCallback((y) => {
    Sl((ce) => {
      const G = new Set(ce);
      if (G.has(y)) G.delete(y);
      else {
        if (G.size >= 6) {
          const ke = G.values().next().value;
          ke && G.delete(ke);
        }
        G.add(y);
      }
      try {
        localStorage.setItem("ed_fav_tf", JSON.stringify([...G]));
      } catch {
      }
      return G;
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
  })[ks] || "candlestick", [ks]), [un, Ne] = o.useState(null), [ct, rt] = o.useState(!1), [at, Fn] = o.useState(!1), [zn, ln] = o.useState(""), [ls, Kn] = o.useState(null), [Js, os] = o.useState(""), [, Wt] = o.useState(0), [St, Un] = o.useState(null), [Cn, On] = o.useState(""), [qn, Ws] = o.useState(""), [tt, Gn] = o.useState(""), [rs, Ml] = o.useState(!1), In = o.useRef(null), Qs = async () => {
    const y = zn.trim();
    if (!y) {
      os("name the template first");
      return;
    }
    await window.__lseShell?.saveLayout?.(y) ? (Fn(!1), os(""), Wt((G) => G + 1)) : os("could not save this template");
  };
  o.useEffect(() => {
    if (!un) return;
    const y = () => {
      Ne(null), rt(!1), Fn(!1), Kn(null), os(""), Un(null), Gn("");
    }, ce = (G) => {
      G.key === "Escape" && y();
    };
    return document.addEventListener("click", y), document.addEventListener("keydown", ce), () => {
      document.removeEventListener("click", y), document.removeEventListener("keydown", ce);
    };
  }, [un]);
  const Tn = Go(), Cs = Tn.layout, _n = Tn.sync, [Jt, Mn] = o.useState(!1), [as, dt] = o.useState("appearance"), dn = o.useRef(Jt);
  dn.current = Jt;
  const Is = o.useRef(as);
  Is.current = as, o.useEffect(() => (Vo = (y) => {
    if (!dn.current) {
      dt(y || "appearance"), Mn(!0);
      return;
    }
    if (y && y !== Is.current) {
      dt(y);
      return;
    }
    Mn(!1);
  }, () => {
    Vo = null;
  }), []), o.useEffect(() => {
    if (!Jt) return;
    const y = (ce) => {
      ce.key === "Escape" && Mn(!1);
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [Jt]);
  const Ts = o.useRef(null), [pn, jn] = o.useState(null);
  o.useEffect(() => {
    Jt || jn(null);
  }, [Jt]);
  const cs = o.useCallback((y) => {
    if (y.target.closest("button")) return;
    const ce = Ts.current, G = ce?.offsetParent;
    if (!G || !ce) return;
    const ke = G.getBoundingClientRect(), bt = ce.getBoundingClientRect(), Ee = y.clientX - bt.left, Et = y.clientY - bt.top;
    y.preventDefault();
    const Ht = (xt) => {
      jn({
        x: Math.max(0, Math.min(xt.clientX - ke.left - Ee, ke.width - bt.width)),
        y: Math.max(0, Math.min(xt.clientY - ke.top - Et, ke.height - 36))
      });
    }, De = () => {
      window.removeEventListener("pointermove", Ht), window.removeEventListener("pointerup", De);
    };
    window.addEventListener("pointermove", Ht), window.addEventListener("pointerup", De);
  }, []), [xn, jl] = o.useState({
    color: "#e6e8ea",
    strokeWidth: 2,
    lineStyle: "solid",
    opacity: 100
  });
  o.useEffect(() => {
    let y = !0;
    return (async () => {
      const ce = await hl.getTools();
      y && ce?.drawingDefaults && jl((G) => ({ ...G, ...ce.drawingDefaults }));
    })(), () => {
      y = !1;
    };
  }, []);
  const Rl = o.useRef(null), Pl = o.useRef(0), ro = o.useRef(() => {
  }), Ll = o.useRef([]);
  o.useEffect(() => {
    zo({ provider: l, symbol: n });
  }, [l, n]);
  const ht = `${l}:${n}`, Ct = o.useRef(null);
  o.useEffect(() => {
    let y = !0;
    return Ct.current = null, (async () => {
      const [ce, G] = await Promise.all([
        hl.getDrawings(ht),
        hl.getIndicators(ht)
      ]);
      y && (Lt(ce), zt(G ?? zs), wn(null), Ct.current = ht);
    })(), () => {
      y = !1;
    };
  }, [ht]);
  const Rn = o.useCallback((y) => {
    Lt(y), Ct.current === ht && hl.setDrawings(ht, y);
  }, [ht]), el = o.useCallback((y) => {
    zt(y), Ct.current === ht && hl.setIndicators(ht, y);
  }, [ht]);
  o.useEffect(() => {
    Me && zt((y) => ({ ...y, ...Me }));
  }, [Me]);
  const lt = o.useCallback(() => {
    Rn([]), wn(null);
  }, [Rn]);
  o.useCallback((y) => {
    Rn(Tt.filter((ce) => ce.id !== y)), wn(null);
  }, [Tt, Rn]);
  const Pn = o.useMemo(() => {
    const y = Rd(re, Ce);
    return y.length ? { ...sn, customIndicators: y } : sn;
  }, [sn, re, Ce]), is = lo(), us = Xu(), Fs = o.useMemo(() => {
    const y = oo(), ce = is?.candles, G = is?.chart;
    let ke;
    return !us || !ce || !G ? ke = { ...y } : ke = {
      ...y,
      background: G.backgroundColor,
      backgroundOpacity: G.backgroundOpacity,
      grid: G.gridColor,
      gridOpacity: G.gridOpacity,
      axisLabel: G.axisLabelColor,
      axisLine: G.axisLineColor,
      crosshair: G.crosshairColor,
      priceTickerBullish: G.priceTickerBullish,
      priceTickerBearish: G.priceTickerBearish,
      bullish: ce.bodyBullish,
      bearish: ce.bodyBearish,
      bullishBorder: ce.bordersBullish,
      bearishBorder: ce.bordersBearish,
      bullishWick: ce.wickBullish,
      bearishWick: ce.wickBearish
    }, st.marketColors === "teal_rose" ? (ke.bullish = "#21b3a4", ke.bearish = "#f0426c", ke.bullishBorder = "#21b3a4", ke.bearishBorder = "#f0426c", ke.bullishWick = "#21b3a4", ke.bearishWick = "#f0426c", ke.priceTickerBullish = "#21b3a4", ke.priceTickerBearish = "#f0426c") : st.marketColors === "green_red" && (ke.bullish = "#26a69a", ke.bearish = "#ef5350", ke.bullishBorder = "#26a69a", ke.bearishBorder = "#ef5350", ke.bullishWick = "#26a69a", ke.bearishWick = "#ef5350", ke.priceTickerBullish = "#26a69a", ke.priceTickerBearish = "#ef5350"), st.accent === "mint" ? ke.grid = "#21b3a4" : st.accent === "indigo" ? ke.grid = "#6366f1" : st.accent === "amber" && (ke.grid = "#f59e0b"), st.opacity !== void 0 && (ke.backgroundOpacity = Math.round(st.opacity * 100)), ke;
  }, [is, us, st]), Os = is?.data?.timezone || "local", Ln = zd[h] ?? 36e5, mn = T.length ? T[T.length - 1].close : null, [$n, bn] = o.useState("");
  o.useEffect(() => {
    const y = () => {
      if (h === "tick") {
        bn("");
        return;
      }
      if (!n || !Gr(n)) {
        bn("");
        return;
      }
      const G = Date.now(), ke = Math.ceil(G / Ln) * Ln, bt = Math.max(0, ke - G), Ee = Math.floor(bt / 1e3), Et = Math.floor(Ee / 60) % 60, Ht = Math.floor(Ee / 3600), De = (xt) => String(xt).padStart(2, "0");
      bn(Ht > 0 ? `${Ht}:${De(Et)}:${De(Ee % 60)}` : `${Et}:${De(Ee % 60)}`);
    };
    y();
    const ce = setInterval(y, 1e3);
    return () => clearInterval(ce);
  }, [n, Ln, h]), o.useMemo(
    () => Object.values(sn || {}).filter((y) => y && y.enabled).length,
    [sn]
  );
  const ao = o.useMemo(
    () => [
      ...se.map((y, ce) => ({
        id: `trade-${ce}`,
        price: y.price,
        side: y.side,
        quantity: y.quantity ?? 0,
        symbol: n,
        pnl: y.pnl
      })),
      ...we.map((y) => ({ ...y, symbol: n }))
    ],
    [se, we, n]
  );
  return n ? /* @__PURE__ */ t.jsxs("div", { className: "relative h-full w-full flex flex-col bg-[#1c1c1c]", style: { overflow: "visible" }, children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-1 px-2 py-1 border-b border-[#3a3a3a] bg-[#2a2a2a] text-[11px] shrink-0 flex-wrap overflow-visible relative z-[60]", children: [
      /* @__PURE__ */ t.jsx("span", { className: "font-bold tracking-wider opacity-80 text-[#e8e8e8]", children: "EDGEDEPTH" }),
      /* @__PURE__ */ t.jsx("span", { className: "font-mono font-semibold text-[#e8e8e8] ml-1", children: n }),
      /* @__PURE__ */ t.jsx("div", { className: "flex items-center gap-0.5 ml-2", children: ["binance", "coinbase", "hyperliquid"].map((y) => /* @__PURE__ */ t.jsx("button", { onClick: () => {
        try {
          window.__lseShell?.setProvider?.(y);
        } catch {
        }
      }, className: `px-1.5 py-0.5 text-[9px] rounded border ${l === y ? "bg-[#21b3a4] text-black border-[#21b3a4] font-bold" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434]"}`, title: `${y} ${y === "hyperliquid" ? "15ms ⚡ ultra-fast" : y === "binance" ? "20ms fast" : "50ms"}`, children: y === "hyperliquid" ? "HL ⚡" : y === "binance" ? "BINANCE" : "COINBASE" }, y)) }),
      /* @__PURE__ */ t.jsxs("span", { className: "text-[9px] px-1.5 py-0.5 rounded bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9]", children: [
        l.toUpperCase(),
        " ",
        l === "hyperliquid" ? "⚡15ms" : l === "binance" ? "20ms" : l === "coinbase" ? "50ms" : "",
        " • ",
        h,
        " • LIVE"
      ] }),
      /* @__PURE__ */ t.jsx("div", { className: "ml-2", style: { overflow: "visible", position: "relative", zIndex: 50 }, children: /* @__PURE__ */ t.jsx(dd, { value: ws, onChange: (y) => {
        Ss(y);
        try {
          const ce = window.__lseShell;
          ce?.setTimeframe && ce.setTimeframe(y.label);
        } catch {
        }
      }, favs: Ks, onToggleFav: Yn }) }),
      /* @__PURE__ */ t.jsx("div", { className: "ml-1", children: /* @__PURE__ */ t.jsx(ud, { value: ks, onChange: ss }) }),
      /* @__PURE__ */ t.jsxs("select", { value: Tn.panelKinds[0] || "chart", onChange: (y) => Wn.setPanelKind(0, y.target.value), className: "ml-1 bg-[#262626] border border-[#3a3a3a] rounded px-1 py-0.5 text-[10px] text-[#e8e8e8]", children: [
        /* @__PURE__ */ t.jsx("option", { value: "chart", children: "Chart" }),
        /* @__PURE__ */ t.jsx("option", { value: "edgedepth", children: "EdgeDepth Heatmap" }),
        /* @__PURE__ */ t.jsx("option", { value: "depth", children: "Depth Heat" }),
        /* @__PURE__ */ t.jsx("option", { value: "dom", children: "DOM" }),
        /* @__PURE__ */ t.jsx("option", { value: "tape", children: "Tape" }),
        /* @__PURE__ */ t.jsx("option", { value: "footprint", children: "Footprint" }),
        /* @__PURE__ */ t.jsx("option", { value: "vpvr", children: "VPVR" }),
        /* @__PURE__ */ t.jsx("option", { value: "tpo", children: "TPO" }),
        /* @__PURE__ */ t.jsx("option", { value: "liquidations", children: "Liquidations" }),
        /* @__PURE__ */ t.jsx("option", { value: "watchlist", children: "Watchlist 1503" }),
        /* @__PURE__ */ t.jsx("option", { value: "indicators", children: "Indicators" })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-1 ml-1", children: [
        /* @__PURE__ */ t.jsx(md, { onSelect: (y) => Wn.setPanelKind(0, y) }),
        /* @__PURE__ */ t.jsxs("button", { onClick: () => Gs((y) => !y), className: "px-2 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8] hover:bg-[#343434]", children: [
          "Layers ",
          Bs ? "▲" : "▼"
        ] }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => qs(!0), className: "px-2 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8] hover:bg-[#343434]", children: "Find Symbol" })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "ml-auto flex items-center gap-1", children: [
        /* @__PURE__ */ t.jsx("span", { className: "text-[10px] text-[#b9b9b9]", children: "RT" }),
        /* @__PURE__ */ t.jsx("div", { className: "w-2 h-2 rounded-full bg-[#21b3a4] animate-pulse", title: "follow-live streaming" }),
        /* @__PURE__ */ t.jsxs("button", { onClick: () => Tl((y) => !y), className: `px-1.5 py-0.5 rounded border text-[9px] ${Il ? "bg-[#21b3a4]/20 border-[#21b3a4]/50 text-[#21b3a4]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434]"}`, title: "Real-time follow mode — exact EdgeDepth, no paywall, code present", children: [
          "RT MODE ",
          Il ? "● ON" : "○ OFF"
        ] }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => Ds((y) => !y), className: "px-2 py-0.5 rounded border border-[#3a3a3a] text-[10px] hover:bg-[#343434] text-[#e8e8e8]", children: "⚙ Appearance" }),
        /* @__PURE__ */ t.jsx("button", { onClick: ie, className: "px-2 py-0.5 rounded border border-[#3a3a3a] text-[10px] hover:bg-[#343434] text-[#e8e8e8]", children: "Indicators" })
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "relative flex-1 min-h-0 w-full flex", children: [
      /* @__PURE__ */ t.jsx(
        id,
        {
          activeTool: wt,
          onToolSelect: Le,
          magnet: Qe,
          onToggleMagnet: () => pt((y) => !y),
          hiddenAll: As,
          onToggleHidden: () => wl((y) => !y),
          onClearAll: lt,
          collapsed: Yt,
          onToggleCollapsed: () => Zt((y) => !y)
        }
      ),
      /* @__PURE__ */ t.jsx(
        "div",
        {
          ref: In,
          className: "relative flex-1 min-w-0",
          style: rs ? { transform: "scaleY(-1)" } : void 0,
          onContextMenu: (y) => {
            y.preventDefault(), rt(!1), Un(null), Gn("");
            let ce = null;
            if (Cs === "1x1" && ae && In.current) {
              const ke = In.current.getBoundingClientRect(), bt = rs ? ke.height - (y.clientY - ke.top) : y.clientY - ke.top, Ee = ae.yToPrice(bt);
              Number.isFinite(Ee) && Ee > 0 && (ce = Ee);
            }
            const G = window.__lseShell?.tradeInfo?.() || null;
            Ne({
              x: Math.min(y.clientX, window.innerWidth - 240),
              y: Math.min(y.clientY, window.innerHeight - (G?.available ? 360 : 230)),
              price: ce,
              ref: mn,
              trade: G
            });
          },
          children: Cs !== "1x1" ? /* @__PURE__ */ t.jsx(
            Md,
            {
              layout: Cs,
              syncSettings: _n,
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
              onToggleKind: () => Wn.setPanelKind(0, "chart")
            }
          ) }) : Tn.panelKinds[0] === "edgedepth" ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(ns, {}), children: /* @__PURE__ */ t.jsx(
            Ld,
            {
              symbol: n,
              provider: l,
              onToggleKind: () => Wn.setPanelKind(0, "chart"),
              liqColormap: st.liqColormap,
              obColormap: st.obColormap,
              opacity: st.opacity,
              intensity: st.intensity,
              gamma: st.gamma,
              noiseFloor: st.noiseFloor,
              tickPerRow: st.tickPerRow,
              halfLife: st.halfLife
            }
          ) }) : ["orderflow", "dom", "tape", "footprint", "vpvr", "tpo", "cvd", "liquidations", "ed_liquidations", "ed_vpvr", "ed_footprint", "ed_tpo", "watchlist", "indicators"].includes(Tn.panelKinds[0]) ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(ns, {}), children: (() => {
            const y = Tn.panelKinds[0];
            return y === "dom" ? /* @__PURE__ */ t.jsx(Kr, { symbol: n, provider: l }) : y === "tape" ? /* @__PURE__ */ t.jsx(Nd, { symbol: n, provider: l }) : y === "footprint" ? /* @__PURE__ */ t.jsx(Fd, { symbol: n, provider: l }) : y === "vpvr" ? /* @__PURE__ */ t.jsx(Wd, { symbol: n, provider: l }) : y === "tpo" ? /* @__PURE__ */ t.jsx(Od, { symbol: n, provider: l }) : y === "liquidations" ? /* @__PURE__ */ t.jsx(Bd, { symbol: n, provider: l, colormap: st.liqColormap, intensity: st.intensity, opacity: st.opacity, gamma: st.gamma, noiseFloor: st.noiseFloor, tickPerRow: st.tickPerRow, halfLife: st.halfLife, lowPeak: st.lowPeak }) : y === "watchlist" ? /* @__PURE__ */ t.jsx(Ed, { activeSymbol: n, onSelectSymbol: (ce) => {
              try {
                window.__lseShell?.selectSymbol?.(ce);
              } catch {
              }
            } }) : y === "indicators" ? /* @__PURE__ */ t.jsx(Ad, { symbol: n, provider: l }) : /* @__PURE__ */ t.jsx(Kr, { symbol: n, provider: l });
          })() }) : /* @__PURE__ */ t.jsx(t.Fragment, { children: /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
            /* @__PURE__ */ t.jsx(
              qo,
              {
                candles: Ce,
                symbol: n,
                timeframe: h,
                chartType: Mt,
                onLoadMore: te,
                isLoadingMore: W,
                prependShift: Fe.shift,
                livePrice: mn,
                countdown: $n,
                timezone: Os,
                rightOffset: 6,
                colors: Fs,
                indicators: Pn,
                onIndicatorsChange: el,
                onRemoveEngineIndicator: (y) => window.__lseShell?.removeIndicator?.(y),
                onEditEngineIndicator: (y) => {
                  window.__lseShell?.editIndicator?.(y) || ie();
                },
                drawings: Tt,
                selectedDrawingId: nn,
                drawingCursorRef: Ll,
                requestRedrawRef: Rl,
                scrollOffsetRef: Pl,
                onScrollSync: () => ro.current?.(),
                onConverterReady: qe,
                onOpenSettings: ie,
                positionLines: ao,
                onPositionModify: ee,
                onPositionClose: $e,
                autoSelectPositionId: et,
                showBidAskSpread: !!r,
                brokerBid: r?.bid ?? null,
                brokerAsk: r?.ask ?? null
              },
              Be
            ),
            /* @__PURE__ */ t.jsx(
              Yu,
              {
                activeTool: ge,
                onToolSelect: kt,
                drawings: Tt,
                onDrawingsChange: Rn,
                selectedDrawingId: nn,
                onSelectDrawing: wn,
                converter: ae,
                scrollSyncRef: ro,
                scrollOffsetRef: Pl,
                drawingCursorRef: Ll,
                requestRedrawRef: Rl,
                toolSettings: xn,
                isLocked: cn,
                isHidden: As,
                currentSymbol: n,
                timeframeMs: Ln,
                currentPrice: mn ?? void 0,
                candles: T
              }
            )
          ] }) })
        }
      ),
      Jt && /* @__PURE__ */ t.jsxs(
        "div",
        {
          ref: Ts,
          className: "absolute z-[95] w-80",
          style: {
            ...pn ? { left: pn.x, top: pn.y } : { top: 8, right: 8 },
            background: "var(--panel)",
            border: "1px solid var(--edge)",
            borderRadius: 3,
            boxShadow: "0 10px 32px var(--shadow)"
          },
          children: [
            /* @__PURE__ */ t.jsxs(
              "div",
              {
                onPointerDown: cs,
                className: "flex items-center justify-between px-3 py-1.5 select-none",
                style: { borderBottom: "1px solid var(--edge)", cursor: "move" },
                children: [
                  /* @__PURE__ */ t.jsx("span", { style: { fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "var(--dim)" }, children: "CHART LAYOUT" }),
                  /* @__PURE__ */ t.jsx(
                    "button",
                    {
                      onClick: () => Mn(!1),
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
                  onClick: () => dt("appearance"),
                  className: "flex-1 px-3 py-1.5 text-xs font-medium transition-colors",
                  style: as === "appearance" ? { color: "var(--text)", background: "var(--active)" } : { color: "var(--dim)" },
                  children: "Appearance"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: () => dt("chart"),
                  className: "flex-1 px-3 py-1.5 text-xs font-medium transition-colors",
                  style: as === "chart" ? { color: "var(--text)", background: "var(--active)" } : { color: "var(--dim)" },
                  children: "Chart"
                }
              )
            ] }),
            /* @__PURE__ */ t.jsx("div", { className: "max-h-[70vh] overflow-y-auto", children: as === "appearance" ? /* @__PURE__ */ t.jsx(zu, { hideHeader: !0, onBack: () => Mn(!1) }) : /* @__PURE__ */ t.jsx(Ku, { hideHeader: !0, onBack: () => Mn(!1) }) }),
            /* @__PURE__ */ t.jsx(
              "div",
              {
                className: "flex justify-end px-3 py-2",
                style: { borderTop: "1px solid var(--edge)" },
                children: /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    onClick: () => Mn(!1),
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
      Ge && /* @__PURE__ */ t.jsx("div", { className: "absolute top-10 right-2 z-[90]", children: /* @__PURE__ */ t.jsx(fd, { settings: st, onChange: Cl, onClose: () => Ds(!1) }) }),
      Bs && /* @__PURE__ */ t.jsx("div", { className: "absolute top-10 left-[320px] z-[90]", children: /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx("div", { className: "p-2 text-[10px] text-[#b9b9b9]", children: "Loading layers..." }), children: /* @__PURE__ */ t.jsx(Dd, { layers: Sn, onChange: Zs }) }) }),
      /* @__PURE__ */ t.jsx(pd, { open: Us, onClose: () => qs(!1), onSelect: (y) => {
        try {
          window.__lseShell?.selectSymbol?.(y);
        } catch {
        }
      } }),
      un && /* @__PURE__ */ t.jsxs(
        "div",
        {
          className: "fixed z-[110]",
          style: {
            left: un.x,
            top: un.y,
            minWidth: 190,
            padding: "2px 0 6px",
            background: "var(--panel)",
            border: "1px solid var(--edge)",
            borderRadius: 2,
            boxShadow: "0 6px 20px var(--shadow)",
            fontSize: 12,
            color: "var(--text)"
          },
          onClick: (y) => y.stopPropagation(),
          children: [
            un.trade?.available && (() => {
              const y = un.trade, ce = (De) => window.__lseShell?.fmtPrice?.(De) ?? String(De), G = (De) => De === "limit" ? "Limit" : "Stop";
              if (St) {
                const De = {
                  flex: 1,
                  minWidth: 0,
                  padding: "3px 6px",
                  fontSize: 12,
                  color: "var(--text)",
                  background: "var(--bg2)",
                  border: "1px solid var(--edge)",
                  borderRadius: 2
                }, xt = {
                  width: 38,
                  fontSize: 11,
                  color: "var(--dim)",
                  flexShrink: 0
                }, ds = () => {
                  const jt = parseFloat(Cn), At = parseFloat(qn);
                  if (!(jt > 0)) {
                    Gn("enter a price");
                    return;
                  }
                  if (!(At > 0)) {
                    Gn("enter a size");
                    return;
                  }
                  window.__lseShell?.quickOrder?.(St.side, St.otype, jt, At), Ne(null), Un(null);
                }, Kt = (jt) => {
                  jt.stopPropagation(), jt.key === "Enter" && ds(), jt.key === "Escape" && (Un(null), Gn(""));
                };
                return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                  /* @__PURE__ */ t.jsxs("div", { style: { ...kn, cursor: "default", fontWeight: 600 }, children: [
                    St.side === "buy" ? "Buy" : "Sell",
                    " ",
                    G(St.otype),
                    " · ",
                    y.symbol
                  ] }),
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      style: { display: "flex", gap: 6, alignItems: "center", margin: "2px 10px 4px" },
                      onClick: (jt) => jt.stopPropagation(),
                      children: [
                        /* @__PURE__ */ t.jsx("span", { style: xt, children: "Price" }),
                        /* @__PURE__ */ t.jsx(
                          "input",
                          {
                            autoFocus: !0,
                            value: Cn,
                            spellCheck: !1,
                            inputMode: "decimal",
                            style: De,
                            onChange: (jt) => On(jt.target.value),
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
                      onClick: (jt) => jt.stopPropagation(),
                      children: [
                        /* @__PURE__ */ t.jsx("span", { style: xt, children: "Units" }),
                        /* @__PURE__ */ t.jsx(
                          "input",
                          {
                            value: qn,
                            spellCheck: !1,
                            inputMode: "decimal",
                            style: De,
                            onChange: (jt) => Ws(jt.target.value),
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
                      onClick: (jt) => jt.stopPropagation(),
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
                  tt && /* @__PURE__ */ t.jsx("div", { style: { ...kn, color: "#e05d5d", cursor: "default" }, children: tt }),
                  /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: "1px solid var(--edge)" } })
                ] });
              }
              const ke = y.qty != null ? `${y.qty} ` : "", bt = [
                { label: `Buy ${ke}${y.symbol} at market`, side: "buy", otype: "market" },
                { label: `Sell ${ke}${y.symbol} at market`, side: "sell", otype: "market" }
              ], Ee = un.price, Et = un.ref, Ht = y.pendingTypes || [];
              if (Ee != null && Et != null && Ee !== Et && Ht.length) {
                const De = Ee < Et ? [{ side: "buy", otype: "limit" }, { side: "sell", otype: "stop" }] : [{ side: "sell", otype: "limit" }, { side: "buy", otype: "stop" }];
                for (const xt of De)
                  Ht.includes(xt.otype) && bt.push({ ...xt, label: `${xt.side === "buy" ? "Buy" : "Sell"} ${G(xt.otype)} @ ${ce(Ee)}…` });
              }
              return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                bt.map((De) => /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    className: "w-full text-left",
                    style: kn,
                    onMouseEnter: gs,
                    onMouseLeave: vs,
                    onClick: (xt) => {
                      if (De.otype === "market") {
                        window.__lseShell?.quickOrder?.(De.side, De.otype, un.price), Ne(null);
                        return;
                      }
                      xt.stopPropagation(), Un({ side: De.side, otype: De.otype }), On(Ee != null ? String(+Ee.toFixed(Ee >= 1e3 ? 2 : Ee >= 100 ? 3 : Ee >= 1 ? 4 : 6)) : ""), Ws(y.qty != null ? String(y.qty) : ""), Gn("");
                    },
                    children: De.label
                  },
                  `${De.side}-${De.otype}`
                )),
                /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: "1px solid var(--edge)" } })
              ] });
            })(),
            /* @__PURE__ */ t.jsxs(
              "button",
              {
                className: "w-full text-left",
                style: { ...kn, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 },
                onMouseEnter: gs,
                onMouseLeave: vs,
                onClick: () => rt((y) => !y),
                children: [
                  /* @__PURE__ */ t.jsx("span", { children: "Chart template" }),
                  /* @__PURE__ */ t.jsx("span", { style: { color: "var(--dim)" }, children: ct ? "▾" : "▸" })
                ]
              }
            ),
            ct && /* @__PURE__ */ t.jsxs("div", { className: "max-h-48 overflow-y-auto", style: { borderTop: "1px solid var(--edge)", borderBottom: "1px solid var(--edge)", margin: "3px 0" }, children: [
              (window.__lseShell?.layouts?.() || []).length === 0 ? /* @__PURE__ */ t.jsx("div", { style: { ...kn, color: "var(--dim)" }, children: "No saved templates yet" }) : window.__lseShell.layouts().map((y) => /* @__PURE__ */ t.jsxs(
                "div",
                {
                  style: { ...kn, display: "flex", alignItems: "center", gap: 8, paddingLeft: 20, cursor: "pointer" },
                  onMouseEnter: gs,
                  onMouseLeave: vs,
                  onClick: () => {
                    window.__lseShell?.applyLayout?.(y.id), Ne(null);
                  },
                  children: [
                    /* @__PURE__ */ t.jsx("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: y.name }),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        title: ls === y.id ? "Click again to delete" : "Delete template",
                        style: {
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          fontSize: ls === y.id ? 11 : 13,
                          lineHeight: 1,
                          padding: "0 2px",
                          color: ls === y.id ? "#e05d5d" : "var(--dim)"
                        },
                        onClick: async (ce) => {
                          if (ce.stopPropagation(), ls !== y.id) {
                            Kn(y.id);
                            return;
                          }
                          await window.__lseShell?.deleteLayout?.(y.id), Kn(null), Wt((G) => G + 1);
                        },
                        children: ls === y.id ? "sure?" : "×"
                      }
                    )
                  ]
                },
                y.id
              )),
              at ? /* @__PURE__ */ t.jsxs(
                "div",
                {
                  style: { display: "flex", gap: 4, margin: "3px 12px 5px", alignItems: "center" },
                  onClick: (y) => y.stopPropagation(),
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
                        onChange: (y) => ln(y.target.value),
                        onKeyDown: async (y) => {
                          if (y.stopPropagation(), y.key === "Escape") {
                            Fn(!1);
                            return;
                          }
                          y.key === "Enter" && await Qs();
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
                  style: { ...kn, paddingLeft: 20, color: "var(--dim)" },
                  onMouseEnter: gs,
                  onMouseLeave: vs,
                  onClick: (y) => {
                    y.stopPropagation(), ln(window.__lseShell?.layoutDefaultName?.() || ""), os(""), Fn(!0);
                  },
                  children: "+ Save current as template…"
                }
              ),
              Js && /* @__PURE__ */ t.jsx("div", { style: { ...kn, paddingLeft: 20, color: "#e05d5d" }, children: Js })
            ] }),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "w-full text-left",
                style: kn,
                onMouseEnter: gs,
                onMouseLeave: vs,
                onClick: () => {
                  In.current?.querySelector('button[title="Reset view"]')?.click(), Ne(null);
                },
                children: "Reset chart view"
              }
            ),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "w-full text-left",
                style: kn,
                onMouseEnter: gs,
                onMouseLeave: vs,
                onClick: () => {
                  Ml((y) => !y), Ne(null);
                },
                children: rs ? "Unflip chart" : "Flip chart"
              }
            ),
            Tt.length > 0 && /* @__PURE__ */ t.jsxs(
              "button",
              {
                className: "w-full text-left",
                style: kn,
                onMouseEnter: gs,
                onMouseLeave: vs,
                onClick: () => {
                  lt(), Ne(null);
                },
                children: [
                  "Remove drawings (",
                  Tt.length,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: "1px solid var(--edge)" } }),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "w-full text-left",
                style: kn,
                onMouseEnter: gs,
                onMouseLeave: vs,
                onClick: () => {
                  dt("appearance"), Mn(!0), Ne(null);
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
function Ud({ symbol: l, timeframe: n, candles: h, quote: T }) {
  const I = lo(), se = o.useMemo(() => oo(), []);
  return !l || !h.length ? /* @__PURE__ */ t.jsx("div", { className: "h-full w-full" }) : /* @__PURE__ */ t.jsx(
    qo,
    {
      candles: h,
      symbol: l,
      timeframe: n,
      chartType: "candlestick",
      livePrice: h[h.length - 1]?.close ?? null,
      rightOffset: 6,
      colors: se,
      indicators: zs,
      timezone: I?.data?.timezone || "local",
      showBidAskSpread: !!T,
      brokerBid: T?.bid ?? null,
      brokerAsk: T?.ask ?? null
    }
  );
}
const Es = /* @__PURE__ */ new Map();
function Ur(l) {
  const n = Es.get(l);
  n && n.root.render(
    /* @__PURE__ */ t.jsx(Uo, { children: /* @__PURE__ */ t.jsx(Ko, { children: /* @__PURE__ */ t.jsx(Ud, { ...n.props }) }) })
  );
}
const qd = {
  mount(l, n = {}) {
    Es.has(l) || Es.set(l, { root: ys(l), props: {} });
    const h = Es.get(l);
    h.props = { ...h.props, ...so(n) }, Ur(l);
  },
  update(l, n) {
    const h = Es.get(l);
    h && (h.props = { ...h.props, ...so(n) }, Ur(l));
  },
  unmount(l) {
    const n = Es.get(l);
    n && (n.root.unmount(), Es.delete(l));
  }
};
function Gd() {
  const l = Go();
  return /* @__PURE__ */ t.jsx(
    Uu,
    {
      selectedLayout: l.layout,
      onLayoutChange: (n) => Wn.setLayout(n),
      syncSettings: l.sync,
      onSyncSettingsChange: (n) => Wn.setSync(n),
      isMultiPanelActive: l.layout !== "1x1",
      onExitMultiPanel: () => Wn.setLayout("1x1")
    }
  );
}
let Ys = null, Vo = null, Xo = null, kl = {
  provider: "demo",
  symbol: "",
  timeframe: "1h",
  candles: [],
  chartType: "candlestick",
  trades: [],
  engineIndicators: void 0
};
function $o() {
  Ys && Ys.render(
    /* @__PURE__ */ t.jsx(Uo, { children: /* @__PURE__ */ t.jsx(Ko, { children: /* @__PURE__ */ t.jsx(Kd, { ...kl, indicatorPatch: Xo }) }) })
  );
}
const Zd = {
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
function so(l) {
  const n = { ...l };
  return l.chartType && (n.chartType = Zd[l.chartType] ?? "candlestick"), "symbol" in l && !l.symbol && (n.symbol = ""), l.candles?.length && l.candles[0].time < qr && (n.candles = l.candles.map((h) => ({ ...h, time: h.time * 1e3 }))), l.trades?.length && l.trades[0].time < qr && (n.trades = l.trades.map((h) => ({ ...h, time: h.time * 1e3 }))), n;
}
const Zo = {
  async mount(l, n = {}) {
    kl = { ...kl, ...so(n) }, Ys || (Ys = ys(l)), await Jr(), $o();
  },
  update(l) {
    kl = { ...kl, ...so(l) }, $o();
  },
  unmount() {
    Ys?.unmount(), Ys = null;
  },
  openAppearance(l) {
    Vo?.(l);
  },
  invalidateWorkspaceSection(l) {
    Vu(l);
  },
  setIndicators(l) {
    Xo = { ...Xo || {}, ...l }, $o();
  },
  indicatorKeys() {
    return Object.keys(zs);
  },
  indicatorDefaults() {
    return JSON.parse(JSON.stringify(zs));
  }
}, Jd = new qu(), Yo = { inReplay: !1 };
function Qd({ onExit: l }) {
  const [n, h] = o.useState(!0), T = Zr();
  o.useEffect(() => {
    h(!0);
  }, [T.key]);
  const I = (se) => {
    h(se), se || setTimeout(() => {
      Yo.inReplay || l();
    }, 150);
  };
  return /* @__PURE__ */ t.jsx("div", { className: "h-full w-full bg-[#0b0d12]", children: /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(ns, {}), children: /* @__PURE__ */ t.jsx($d, { open: n, onOpenChange: I }) }) });
}
function eh({ provider: l }) {
  const [n] = Ju(), h = Zr(), T = n.get("sym"), I = h.pathname.split("/").pop() || "", se = n.get("provider") || l;
  return zo({ provider: se, symbol: T || I }), o.useEffect(() => (Yo.inReplay = !0, () => {
    Yo.inReplay = !1;
  }), []), /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(ns, {}), children: /* @__PURE__ */ t.jsx(_d, {}) });
}
let ml = null;
const th = {
  async mount(l, n = {}) {
    const h = n.provider || "demo", T = n.onExit || (() => {
    });
    ml || (ml = ys(l)), zo({ provider: h, symbol: "" }), await Jr(), ml.render(
      /* @__PURE__ */ t.jsx(Gu, { client: Jd, children: /* @__PURE__ */ t.jsx(Uo, { initialEntries: ["/"], children: /* @__PURE__ */ t.jsxs(Ko, { children: [
        /* @__PURE__ */ t.jsxs(Zu, { children: [
          /* @__PURE__ */ t.jsx(Wr, { path: "/backtest/:pair", element: /* @__PURE__ */ t.jsx(eh, { provider: h }) }),
          /* @__PURE__ */ t.jsx(Wr, { path: "*", element: /* @__PURE__ */ t.jsx(Qd, { onExit: T }) })
        ] }),
        /* @__PURE__ */ t.jsx(ed, { theme: "dark", position: "bottom-right" })
      ] }) }) })
    );
  },
  unmount() {
    ml?.unmount(), ml = null;
  }
};
let bl = null;
const nh = {
  mount(l, n = {}) {
    bl || (bl = ys(l)), bl.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(ns, {}), children: /* @__PURE__ */ t.jsx(Hd, { onBack: n.onBack, initialView: n.view }) })
    );
  },
  unmount() {
    bl?.unmount(), bl = null;
  }
};
let gl = null;
const sh = {
  mount(l) {
    gl || (gl = ys(l)), gl.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(ns, {}), children: /* @__PURE__ */ t.jsx(Vd, {}) })
    );
  },
  unmount() {
    gl?.unmount(), gl = null;
  }
};
let vl = null;
const lh = {
  mount(l) {
    vl || (vl = ys(l)), vl.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(ns, {}), children: /* @__PURE__ */ t.jsx(Xd, {}) })
    );
  },
  unmount() {
    vl?.unmount(), vl = null;
  }
};
let yl = null;
const oh = {
  mount(l) {
    yl || (yl = ys(l)), yl.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(ns, {}), children: /* @__PURE__ */ t.jsx(Yd, {}) })
    );
  },
  unmount() {
    yl?.unmount(), yl = null;
  }
};
Zo.mountLayoutButton = (l) => {
  ys(l).render(/* @__PURE__ */ t.jsx(Gd, {}));
};
Zo.layoutStore = Wn;
window.LSEChart = Zo;
window.LSEChartPanes = qd;
window.LSEManualBacktest = th;
window.LSEEconCalendar = nh;
window.LSEDataViz = sh;
window.LSEQuantModels = lh;
window.LSENotebooks = oh;
export {
  Zo as default
};
