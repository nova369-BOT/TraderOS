import { r as o, i as Ar, j as t, g as kc, q as fs } from "./chunks/react-vendor-C0yw3i6b.js";
import { n as Dr, o as Br, p as wc, q as Sc, r as Cc, s as Ic, t as Tc, u as Mc, v as jc, w as Rc, x as Pc, y as Nc, z as Lc, A as Ec, C as Ac, D as Dc, E as Bc, F as Wc, G as Fc, H as Oc, J as _c, K as $c, M as Hc, N as Vc, O as Xc, Q as Yc, R as zc, U as Uc, V as Kc, W as qc, X as Gc, Y as Zc, Z as Jc, _ as Qc, $ as ei, a0 as ti, a1 as ni, a2 as si, a3 as li, a4 as oi, a5 as ri, a6 as ai, a7 as ci, a8 as ii, a9 as ui, aa as di, ab as hi, ac as fi, ad as pi, ae as xi, af as mi, ag as bi, ah as gi, ai as vi, aj as yi, ak as ki, al as wi, am as Si, an as Ci, ao as Ii, ap as Ti, aq as Mi, ar as ji, as as Ri, at as Pi, au as Ni, av as Li, aw as Ei, ax as Ai, ay as Di, az as Bi, aA as Wi, aB as Fi, aC as Oi, aD as _i, aE as $i, aF as Hi, aG as Vi, aH as Xi, aI as Yi, aJ as zi, aK as Ui, aL as Ki, aM as qi, aN as Gi, aO as Zi, aP as Ji, aQ as Qi, aR as eu, aS as tu, aT as nu, aU as su, aV as lu, aW as ou, aX as ru, aY as au, aZ as cu, a_ as iu, a$ as uu, b0 as du, b1 as hu, b2 as fu, b3 as pu, b4 as xu, b5 as He, b6 as mu, b7 as bu, b8 as no, b9 as so, ba as gu, bb as vu, bc as yu, bd as ku, be as wu, bf as Su, bg as Cu, bh as Iu, bi as $o, bj as Tu, bk as Mu, bl as ju, bm as Ru, bn as Pu, g as Nu, bo as Lu, bp as Eu, bq as Au, br as Wr, bs as Yl, bt as Du, bu as Zr, bv as Bu, bw as Wu, bx as Fu, by as zl, bz as Ou, bA as _u, bB as $u, bC as Hu, bD as Ys, bE as Vu, bF as Ko, bG as qo, bH as ul, bI as Xu, bJ as Yu, bK as zu, bL as Uu, bM as Ku } from "./chunks/backtest-CeqYlV1v.js";
import { au as Ul, av as Kl, m as ql, aw as Gl } from "./chunks/ui-DZwdMnFY.js";
import { Q as qu, d as Gu, M as Go, R as Zu, e as Fr, c as Ju, a as Jr } from "./chunks/router-query-iQy8iLKR.js";
import { D as Qu } from "./chunks/depth-DgOhdG7Y.js";
import { $ as ed } from "./chunks/ui-heavy-BL_8guwx.js";
function Or(l, n) {
  const { closes: h, highs: T, lows: I, opens: ne, volumes: oe, timestamps: Me } = l;
  let r = null;
  return n.movingAverages?.enabled && n.movingAverages.lines?.length > 0 && (r = n.movingAverages.lines.map((Q) => {
    let _e;
    switch (Q.type) {
      case "SMA":
        _e = wc(h, Q.period);
        break;
      case "SMMA":
        _e = Br(h, Q.period);
        break;
      case "EMA":
      default:
        _e = Dr(h, Q.period);
        break;
    }
    return { data: _e, color: Q.color, name: `${Q.type} ${Q.period}` };
  })), {
    rsi: n.rsi?.enabled ? xu(h, n.rsi.period) : null,
    macd: n.macd?.enabled ? pu(h, n.macd.fast, n.macd.slow, n.macd.signal) : null,
    ema: n.ema?.enabled ? n.ema.periods.map((Q) => Dr(h, Q)) : null,
    bollinger: n.bollinger?.enabled ? fu(h, n.bollinger.period, n.bollinger.stdDev) : null,
    movingAverages: r,
    atr: n.atr?.enabled ? hu(T, I, h, n.atr.period) : null,
    stochastic: n.stochastic?.enabled ? du(T, I, h, n.stochastic.kPeriod, n.stochastic.dPeriod, n.stochastic.smooth) : null,
    williamsR: n.williamsR?.enabled ? uu(T, I, h, n.williamsR.period) : null,
    cci: n.cci?.enabled ? iu(T, I, h, n.cci.period) : null,
    adx: n.adx?.enabled ? cu(T, I, h, n.adx.period) : null,
    roc: n.roc?.enabled ? au(h, n.roc.period) : null,
    vwap: n.vwap?.enabled ? ru(T, I, h, oe, Me) : null,
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
    momentum: n.momentum?.enabled ? Ki(h, n.momentum.period) : null,
    awesomeOsc: n.awesomeOsc?.enabled ? Ui(T, I) : null,
    mfi: n.mfi?.enabled ? zi(T, I, h, oe, n.mfi.period) : null,
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
    obv: n.obv?.enabled ? Ai(h, oe) : null,
    cmf: n.cmf?.enabled ? Ei(T, I, h, oe, n.cmf.period) : null,
    adl: n.adl?.enabled ? Li(T, I, h, oe) : null,
    forceIndex: n.forceIndex?.enabled ? Ni(h, oe, n.forceIndex.period) : null,
    eom: n.eom?.enabled ? Pi(T, I, oe, n.eom.period) : null,
    volumeSma: n.volumeSma?.enabled ? Ri(oe, n.volumeSma.period) : null,
    fibRetracement: n.fibRetracement?.enabled ? ji(T, I, n.fibRetracement.lookback) : null,
    camarillaPivots: n.camarillaPivots?.enabled ? Mi(Me, T, I, h) : null,
    woodiePivots: n.woodiePivots?.enabled ? Ti(Me, T, I, h) : null,
    correlation: n.correlation?.enabled ? Ii(h, oe, n.correlation.period) : null,
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
    pvo: n.pvo?.enabled ? oi(oe, n.pvo.fast, n.pvo.slow, n.pvo.signal) : null,
    cmo: n.cmo?.enabled ? li(h, n.cmo.period) : null,
    fisher: n.fisher?.enabled ? si(T, I, n.fisher.period) : null,
    stc: n.stc?.enabled ? ni(h, n.stc.fast, n.stc.slow, n.stc.cycle) : null,
    rviOsc: n.rviOsc?.enabled ? ti(ne, T, I, h, n.rviOsc.period) : null,
    klinger: n.klinger?.enabled ? ei(T, I, h, oe, n.klinger.fast, n.klinger.slow, n.klinger.signal) : null,
    connorsRsi: n.connorsRsi?.enabled ? Qc(h, n.connorsRsi.rsiPeriod, n.connorsRsi.streakPeriod, n.connorsRsi.rankPeriod) : null,
    apo: n.apo?.enabled ? Jc(h, n.apo.fast, n.apo.slow) : null,
    qstick: n.qstick?.enabled ? Zc(ne, h, n.qstick.period) : null,
    bop: n.bop?.enabled ? Gc(ne, T, I, h, n.bop.period) : null,
    psychLine: n.psychLine?.enabled ? qc(h, n.psychLine.period) : null,
    pfe: n.pfe?.enabled ? Kc(h, n.pfe.period, n.pfe.smoothing) : null,
    smi: n.smi?.enabled ? Uc(T, I, h, n.smi.period, n.smi.smoothK, n.smi.smoothD) : null,
    ulcerIndex: n.ulcerIndex?.enabled ? zc(h, n.ulcerIndex.period) : null,
    natr: n.natr?.enabled ? Yc(T, I, h, n.natr.period) : null,
    trueRange: n.trueRange?.enabled ? Xc(T, I, h) : null,
    squeeze: n.squeeze?.enabled ? Vc(T, I, h, n.squeeze.bbPeriod, n.squeeze.bbMult, n.squeeze.kcPeriod, n.squeeze.kcMult) : null,
    relVolIndex: n.relVolIndex?.enabled ? Hc(h, n.relVolIndex.period, n.relVolIndex.smoothing) : null,
    vhf: n.vhf?.enabled ? $c(h, n.vhf.period) : null,
    vwma: n.vwma?.enabled ? _c(h, oe, n.vwma.period) : null,
    volumeOsc: n.volumeOsc?.enabled ? Oc(oe, n.volumeOsc.fast, n.volumeOsc.slow) : null,
    nvi: n.nvi?.enabled ? Fc(h, oe) : null,
    pvi: n.pvi?.enabled ? Wc(h, oe) : null,
    pvt: n.pvt?.enabled ? Bc(h, oe) : null,
    vroc: n.vroc?.enabled ? Dc(oe, n.vroc.period) : null,
    netVolume: n.netVolume?.enabled ? Ac(h, oe, n.netVolume.period) : null,
    twiggsMF: n.twiggsMF?.enabled ? Ec(T, I, h, oe, n.twiggsMF.period) : null,
    linRegRSquared: n.linRegRSquared?.enabled ? Lc(h, n.linRegRSquared.period) : null,
    medianPrice: n.medianPrice?.enabled ? Nc(T, I) : null,
    typicalPrice: n.typicalPrice?.enabled ? Pc(T, I, h) : null,
    weightedClose: n.weightedClose?.enabled ? Rc(T, I, h) : null,
    demarkPivots: n.demarkPivots?.enabled ? jc(Me, T, I, ne, h) : null,
    zigzag: n.zigzag?.enabled ? Mc(T, I, h, n.zigzag.deviation) : null,
    fractals: n.fractals?.enabled ? Tc(T, I) : null,
    gator: n.gator?.enabled ? Ic(h) : null,
    smmaOverlay: n.smmaOverlay?.enabled ? Br(h, n.smmaOverlay.period) : null,
    wma: n.wma?.enabled ? Cc(h, n.wma.period) : null,
    customIndicators: (n.customIndicators || []).filter((Q) => Q.enabled).map((Q) => {
      if (typeof Q.expression == "string" && (Q.expression.startsWith("brue:") || Q.expression.startsWith("local:")) && Array.isArray(Q.data) && Q.data.length > 0)
        return Q;
      const _e = { closes: h, highs: T, lows: I, opens: ne, volumes: oe, timestamps: Me }, nt = Sc(Q.expression, _e);
      return { ...Q, data: nt.errors.length === 0 ? nt.data : new Array(h.length).fill(NaN) };
    })
  };
}
function td(l, n) {
  if (n <= 0) return l;
  const h = new Array(n).fill(NaN), T = {};
  for (const I of Object.keys(l)) {
    const ne = l[I];
    if (ne == null) {
      T[I] = ne;
      continue;
    }
    if (Array.isArray(ne)) {
      ne.length > 0 && typeof ne[0] == "object" && ne[0] !== null && "data" in ne[0] ? T[I] = ne.map((oe) => ({ ...oe, data: h.concat(oe.data || []) })) : T[I] = h.concat(ne);
      continue;
    }
    if (typeof ne == "object") {
      const oe = {};
      for (const Me of Object.keys(ne)) {
        const r = ne[Me];
        if (Array.isArray(r)) oe[Me] = h.concat(r);
        else if (typeof r == "object" && r !== null) {
          const we = {};
          for (const Q of Object.keys(r)) {
            const _e = r[Q];
            we[Q] = Array.isArray(_e) ? h.concat(_e) : _e;
          }
          oe[Me] = we;
        } else oe[Me] = r;
      }
      T[I] = oe;
      continue;
    }
    T[I] = ne;
  }
  return T;
}
let Zl = null, nd = 0;
function _r() {
  return Zl || (Zl = new Worker(new URL(
    /* @vite-ignore */
    "/assets/indicatorWorker-DBDvDVhS.js",
    import.meta.url
  ), { type: "module" }), Zl);
}
function sd(l, n, h) {
  const [T, I] = o.useState(null), [ne, oe] = o.useState(!1), [Me, r] = o.useState(null), we = o.useRef(null), Q = o.useRef(null), _e = o.useRef(0), nt = o.useRef(null), Ae = o.useCallback((We) => {
    const { id: be, result: Ee, error: fe, durationMs: W } = We.data;
    if (!(nt.current !== null && be !== nt.current)) {
      if (nt.current = null, oe(!1), fe) {
        console.warn("[indicatorWorker] error", fe);
        return;
      }
      W !== void 0 && r(W), l.length > 0 && (_e.current = l[0].close), Q.current = Ee, I(Ee);
    }
  }, [l]);
  return o.useEffect(() => {
    const We = _r();
    return We.addEventListener("message", Ae), () => We.removeEventListener("message", Ae);
  }, [Ae]), o.useEffect(() => {
    if (!n || l.length === 0) {
      I(null);
      return;
    }
    const We = l.length > 0 ? l[0].close : 0;
    if (h.current && Q.current && _e.current === We)
      return;
    const be = we.current;
    let Ee, fe, W, q, Ce, ee, re = null;
    const qe = be && be.candles !== l && l.length >= be.closes.length && l.length > 0 && be.closes.length > 0 && l[0].time === be.timestamps[0] && be.closes.length > 10;
    let ge = 0;
    const yt = !qe && be && be.candles !== l && l.length > be.closes.length && be.closes.length > 10 && l.length - be.closes.length > 0 && l[l.length - be.closes.length]?.time === be.timestamps[0];
    if (yt && (ge = l.length - be.closes.length), qe) {
      const tt = be.closes.length, pt = Math.max(0, tt - 1);
      Ee = be.closes, fe = be.highs, W = be.lows, q = be.opens, Ce = be.volumes, ee = be.timestamps, Ee.length = pt, fe.length = pt, W.length = pt, q.length = pt, Ce.length = pt, ee.length = pt;
      for (let Ct = pt; Ct < l.length; Ct++) {
        const Lt = l[Ct];
        Ee.push(Lt.close), fe.push(Lt.high), W.push(Lt.low), q.push(Lt.open), Ce.push(Lt.volume || 0), ee.push(Lt.time);
      }
      re = { closes: Ee, highs: fe, lows: W, opens: q, volumes: Ce, timestamps: ee }, we.current = { candles: l, closes: Ee, highs: fe, lows: W, opens: q, volumes: Ce, timestamps: ee };
      const ln = Object.values(n).filter((Ct) => Ct?.enabled).length;
      if (!(l.length > 3e3 && ln > 3)) {
        const Ct = performance.now(), Lt = Or(re, n), on = performance.now() - Ct;
        r(on), Q.current = Lt, _e.current = We, I(Lt);
        return;
      }
    } else if (yt && Q.current) {
      const tt = new Array(ge), pt = new Array(ge), ln = new Array(ge), Sn = new Array(ge), Ct = new Array(ge), Lt = new Array(ge);
      for (let zt = 0; zt < ge; zt++) {
        const hn = l[zt];
        tt[zt] = hn.close, pt[zt] = hn.high, ln[zt] = hn.low, Sn[zt] = hn.open, Ct[zt] = hn.volume || 0, Lt[zt] = hn.time;
      }
      Ee = tt.concat(be.closes), fe = pt.concat(be.highs), W = ln.concat(be.lows), q = Sn.concat(be.opens), Ce = Ct.concat(be.volumes), ee = Lt.concat(be.timestamps);
      const on = td(Q.current, ge);
      we.current = { candles: l, closes: Ee, highs: fe, lows: W, opens: q, volumes: Ce, timestamps: ee }, Q.current = on, _e.current = We, I(on);
      return;
    } else
      Ee = l.map((tt) => tt.close), fe = l.map((tt) => tt.high), W = l.map((tt) => tt.low), q = l.map((tt) => tt.open), Ce = l.map((tt) => tt.volume || 0), ee = l.map((tt) => tt.time), re = { closes: Ee, highs: fe, lows: W, opens: q, volumes: Ce, timestamps: ee }, we.current = { candles: l, closes: Ee, highs: fe, lows: W, opens: q, volumes: Ce, timestamps: ee };
    re || (re = { closes: Ee, highs: fe, lows: W, opens: q, volumes: Ce, timestamps: ee });
    const kt = Object.values(n).filter((tt) => tt?.enabled).length;
    if (!(l.length > 1e3 || kt > 5 || (n.customIndicators?.filter((tt) => tt.enabled)?.length || 0) > 0)) {
      const tt = performance.now(), pt = Or(re, n), ln = performance.now() - tt;
      r(ln), Q.current = pt, _e.current = We, I(pt);
      return;
    }
    oe(!0);
    const Yt = _r(), en = ++nd;
    nt.current = en, Yt.postMessage({ id: en, price: re, indicators: n });
  }, [l, n, h]), { indicatorData: T, isComputing: ne, computeDurationMs: Me };
}
function dl(l) {
  const {
    ctx: n,
    candles: h,
    startIndex: T,
    indexToX: I,
    priceToY: ne,
    morphAt: oe,
    candleBodyWidth: Me,
    wickWidth: r,
    colors: we
  } = l, Q = new Path2D(), _e = new Path2D(), nt = Me / 2, Ae = h.length, We = new Float64Array(Ae), be = new Float64Array(Ae), Ee = new Float64Array(Ae), fe = new Float64Array(Ae), W = new Float64Array(Ae), q = new Float64Array(Ae), Ce = new Float64Array(Ae), ee = new Float64Array(Ae);
  let re = 0, qe = 0;
  for (let ge = 0; ge < h.length; ge++) {
    const yt = oe(ge, h[ge]), kt = I(T + ge, T), ze = ne(yt.open), Yt = ne(yt.close), en = ne(yt.high), tt = ne(yt.low), pt = Math.min(ze, Yt), ln = Math.max(1, Math.abs(Yt - ze));
    yt.close >= yt.open ? (Q.moveTo(kt, en), Q.lineTo(kt, tt), We[re] = kt - nt, be[re] = pt, Ee[re] = Me, fe[re] = ln, re++) : (_e.moveTo(kt, en), _e.lineTo(kt, tt), W[qe] = kt - nt, q[qe] = pt, Ce[qe] = Me, ee[qe] = ln, qe++);
  }
  if (n.lineWidth = r, n.lineCap = "round", re) {
    n.strokeStyle = we.bullishWick, n.stroke(Q), n.fillStyle = we.bullish;
    for (let ge = 0; ge < re; ge++)
      n.fillRect(We[ge], be[ge], Ee[ge], fe[ge]);
  }
  if (qe) {
    n.strokeStyle = we.bearishWick, n.stroke(_e), n.fillStyle = we.bearish;
    for (let ge = 0; ge < qe; ge++)
      n.fillRect(W[ge], q[ge], Ce[ge], ee[ge]);
  }
  if (n.lineCap = "butt", n.lineWidth = 1, re) {
    n.strokeStyle = we.bullishBorder;
    for (let ge = 0; ge < re; ge++)
      n.strokeRect(We[ge], be[ge], Ee[ge], fe[ge]);
  }
  if (qe) {
    n.strokeStyle = we.bearishBorder;
    for (let ge = 0; ge < qe; ge++)
      n.strokeRect(W[ge], q[ge], Ce[ge], ee[ge]);
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
}, od = (l, n) => ld(l), Zo = ({
  candles: l,
  livePrice: n,
  symbol: h = "",
  timezone: T = "UTC",
  countdown: I,
  onCrosshairMove: ne,
  syncedCrosshairTime: oe,
  colors: Me,
  indicators: r,
  onIndicatorsChange: we,
  onRemoveBruePlot: Q,
  onRemoveEngineIndicator: _e,
  onEditEngineIndicator: nt,
  onConverterReady: Ae,
  onVisibleRangeChange: We,
  onViewportTimeChange: be,
  syncedViewportTime: Ee,
  disableAutoFollow: fe = !1,
  scrollToIndex: W,
  chartType: q = "candlestick",
  onScrollingChange: Ce,
  onScrollSync: ee,
  scrollOffsetRef: re,
  optionsPdfEnabled: qe = !1,
  heatmapEnabled: ge = !1,
  externalDimensions: yt,
  economicEvents: kt,
  positionLines: ze,
  onPositionModify: Yt,
  onPositionClose: en,
  autoSelectPositionId: tt,
  l2DepthData: pt,
  onOpenSettings: ln,
  onOpenCustomEditor: Sn,
  showBidAskSpread: Ct = !1,
  brokerBid: Lt = null,
  brokerAsk: on = null,
  showSessions: zt = !1,
  timeframe: hn = "5m",
  rightOffset: Xn,
  onLoadMore: Ps,
  isLoadingMore: yl = !1,
  prependShift: ps = 0,
  drawings: es,
  selectedDrawingId: xs,
  drawingCursorRef: ms,
  requestRedrawRef: zs,
  isDrawingDragging: kl = !1
}) => {
  const rt = o.useRef(null), wl = o.useRef(null), Ge = o.useRef(null), Ns = o.useRef(null), Us = o.useRef(!1), Ks = o.useRef(null);
  o.useRef(null);
  const lo = o.useRef(l), Ls = o.useRef(oe ?? null), qs = o.useRef(!1), Es = o.useRef(null), bn = typeof window < "u" ? Math.min(window.devicePixelRatio || 1, 2) : 1, [xe, Gs] = o.useState({ width: 300, height: 300 }), [de, Bt] = o.useState({
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
  }), je = o.useRef({
    startIndex: 0,
    candleWidth: 3
  }), An = o.useRef({
    startIndex: 0,
    candleWidth: 3
  }), It = o.useRef(!1), Sl = o.useRef(!1), Ye = o.useRef(null), Ze = o.useRef(null), Qe = o.useRef(null), at = o.useRef(null), Yn = o.useRef(null), Cl = o.useRef(0), [, Ut] = o.useState(0), zn = o.useRef(null), ts = (a) => {
    const p = Ye.current, b = zn.current;
    if (p && b && b.posId === p) return b.offset;
    const y = cn.current, f = y && y.range > 0 ? y.range * 0.18 : a * 5e-3;
    return zn.current = p && f > 0 ? { posId: p, offset: f } : null, f;
  }, ns = o.useRef(null);
  o.useEffect(() => {
    if (tt && tt !== ns.current && ze) {
      const a = ze.find((p) => p.id === tt);
      a && (ns.current = tt, Ye.current = a.id, Ze.current = a.stopLoss ?? null, Qe.current = a.takeProfit ?? null, Ut((p) => p + 1));
    }
  }, [tt, ze]);
  const As = o.useRef(0), Wt = o.useCallback((a) => {
    It.current = a, Sl.current !== a && (Sl.current = a, Ce?.(a), a || (As.current = je.current.startIndex, re && (re.current = 0)));
  }, [Ce, re]), wt = o.useCallback(() => {
    if (re) {
      const a = je.current.startIndex, p = je.current.candleWidth * (1 + He), b = a - As.current;
      re.current = b * p;
    }
    ee?.();
  }, [ee, re]), Zs = o.useRef(wt);
  Zs.current = wt;
  const rn = o.useRef(null), an = o.useRef(null), Un = o.useRef(null), Ds = o.useRef(!1), lt = o.useCallback((a = !1) => {
    if (Un.current !== null) {
      a || (Ds.current = !1);
      return;
    }
    Ds.current = a, Un.current = requestAnimationFrame(() => {
      Un.current = null;
      const p = Ds.current;
      rn.current && rn.current(p);
    });
  }, []);
  o.useCallback((a = !1) => {
    Un.current !== null && (cancelAnimationFrame(Un.current), Un.current = null), rn.current && rn.current(a);
  }, []);
  const Il = o.useRef(null), bs = o.useRef(0), Dn = o.useRef(0), Bn = o.useRef(!1), Tl = o.useRef(0), ss = o.useRef(null), Bs = o.useRef(void 0), Kt = o.useRef(null), Cn = o.useRef("standard"), [Ml, Wn] = o.useState([]), ct = o.useRef(null), qt = o.useRef(null), Fn = o.useRef([]), gs = o.useRef(null), In = o.useRef(null), [Tn, On] = o.useState(!1), [fn, jl] = o.useState({ x: 0, y: 0, startIndex: 0, priceOffset: 0 }), [oo, ro] = o.useState(0), [ao, Rl] = o.useState(1), Ht = o.useRef(null), Tt = o.useRef(null), Gt = o.useRef(0), ls = o.useRef(null), st = o.useRef(null), [Mn, Ws] = o.useState(!1), vs = o.useRef(null), ys = o.useRef(0), ks = o.useRef(0), _n = o.useRef(!1);
  o.useRef(0), o.useRef(0);
  const $n = o.useRef(null), pn = o.useRef(null), gn = o.useRef(null), co = o.useRef(null), Js = "ns-resize", io = "ns-resize";
  o.useRef(12), o.useRef(0), o.useRef(0);
  const [m, ce] = o.useState(0.15), [ae, ye] = o.useState(!1), xt = o.useRef({ y: 0, ratio: 0 });
  o.useRef(null);
  const [Le, Mt] = o.useState(1), [jt, De] = o.useState(0), [ut, Fs] = o.useState(null), [Et, Rt] = o.useState(null), [ws, uo] = o.useState(!1), [er, ea] = o.useState(!1), Qs = o.useRef({ y: 0, scale: 1, offset: 0 }), os = ut !== null, vn = o.useRef(1), Kn = o.useRef(0), qn = o.useRef(null), cn = o.useRef(null), un = o.useRef(0), Ss = o.useRef(null), [Gn, ta] = mu("preferences.chartShowOHLC", !0), [tr, na] = o.useState(0), [el, nr] = o.useState(!1), [ah, sa] = o.useState(0), ho = o.useRef(null), fo = o.useRef(!1);
  o.useEffect(() => {
    if (!el) return;
    const a = setInterval(() => sa((p) => p + 1), 3e4);
    return () => clearInterval(a);
  }, [el]), o.useEffect(() => {
    kt && kt.length > 0 && bu(kt.map((a) => a.region_code));
  }, [kt]), o.useEffect(() => {
    if (!el) return;
    const a = (p) => {
      ho.current && !ho.current.contains(p.target) && nr(!1);
    };
    return document.addEventListener("mousedown", a), () => document.removeEventListener("mousedown", a);
  }, [el]);
  const [po, la] = o.useState(0), [xo, oa] = o.useState(0), [mo, ra] = o.useState(0), [bo, aa] = o.useState(0), [go, ca] = o.useState(0), Os = o.useRef({}), [it, ia] = o.useState({}), Hn = o.useRef({}), [sr, ua] = o.useState({}), [lr, vo] = o.useState(null), [tl, _s] = o.useState(null), tn = o.useRef({});
  o.useRef(null);
  const or = o.useRef(!1), nn = o.useRef(!1), mt = o.useRef(null), [da, ke] = o.useState(null), [St, pe] = o.useState(null), [jn, bt] = o.useState(null), rr = typeof navigator < "u" && /Mac|iPhone|iPad|iPod/.test(navigator.platform), [nl, ha] = o.useState(rr ? 8 : 2), yo = o.useRef(rr), sl = no(), ko = o.useRef(sl);
  ko.current = sl, o.useEffect(() => {
    sl.chart?.scrollSensitivity !== void 0 && ha(sl.chart.scrollSensitivity);
  }, [sl.chart?.scrollSensitivity]);
  const te = { ...so(), ...Me }, ar = typeof document < "u" && document.documentElement.classList.contains("dark");
  o.useEffect(() => {
    It.current || (je.current = {
      startIndex: de.startIndex,
      candleWidth: de.candleWidth
    });
  }, [de.startIndex, de.candleWidth]), o.useEffect(() => {
    vn.current = Le, Kn.current = jt;
  }, [Le, jt]), o.useEffect(() => {
    if (!de.autoFollowLatest) return;
    const a = setInterval(() => {
      ro((p) => (p + 0.1) % (Math.PI * 2)), Rl(0.85 + Math.sin(Date.now() / 1e3) * 0.15);
    }, 150);
    return () => clearInterval(a);
  }, [de.autoFollowLatest]), o.useEffect(() => {
    lo.current = l;
    const a = l[l.length - 1];
    a && (Ks.current = {
      time: a.time,
      open: a.open,
      high: a.high,
      low: a.low,
      close: a.close
    }, de.autoFollowLatest && rn.current && rn.current(!0));
  }, [l, de.autoFollowLatest]), o.useEffect(() => {
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
      vo(null);
      return;
    }
    const b = async () => {
      try {
        const f = [];
        if (!f || f.length === 0) {
          vo(null);
          return;
        }
        const e = f[0], O = l[l.length - 1]?.close || parseFloat(e.current_price), H = parseFloat(e.current_price), U = H > 0 ? O / H : 1;
        let _ = 0;
        if (e.expiration) {
          const X = new Date(e.expiration).getTime();
          Number.isNaN(X) || (_ = Math.max(0, (X - Date.now()) / (365 * 24 * 3600 * 1e3)));
        }
        const g = Math.exp(p.etfDragPerYear * _), w = U * g;
        let A = [];
        e.density_curve && Array.isArray(e.density_curve) && (A = e.density_curve.map((X) => ({
          p: X.p * w,
          d: X.d
        }))), vo({
          currentPrice: parseFloat(e.current_price) * U,
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
    b();
    const y = setInterval(b, 6e4);
    return () => clearInterval(y);
  }, [h, qe]), o.useEffect(() => {
    if (!ge || !h) {
      Wn([]);
      return;
    }
    const a = async () => {
      try {
        const b = h.includes("/") ? h : h.length === 6 ? `${h.substring(0, 3)}/${h.substring(3)}` : h, y = await $u("l2_heatmap_snapshots", {
          params: { symbol: `eq.${b}`, order: "timestamp.desc", limit: "300" }
        });
        y && y.length > 0 && Wn(y.reverse());
      } catch (b) {
        console.error("Failed to fetch heatmap data:", b);
      }
    };
    a();
    const p = setInterval(a, 5e3);
    return () => clearInterval(p);
  }, [h, ge]), o.useEffect(() => () => {
    Ht.current !== null && cancelAnimationFrame(Ht.current), qt.current !== null && cancelAnimationFrame(qt.current), $n.current !== null && cancelAnimationFrame($n.current), pn.current !== null && cancelAnimationFrame(pn.current), gn.current !== null && cancelAnimationFrame(gn.current), Tt.current !== null && clearTimeout(Tt.current), qn.current !== null && clearTimeout(qn.current);
  }, []);
  const { isPhone: fa, isDesktop: Pl } = gu(xe.width), $e = o.useMemo(() => vu(xe.width), [xe.width]), cr = fa, ir = n || (l.length > 0 ? l[l.length - 1]?.close : 100), Ve = o.useMemo(() => yu(cr, h, ir || 100, Xn), [cr, Pl, h, ir, Xn]), gt = $e.timeAxisHeight, Nl = $e.priceLabelFont, ur = $e.timeLabelFont, Vt = $e.subplotLabelFont, Ll = 1, El = 50, rs = o.useMemo(() => {
    const a = [], b = Math.pow(El / Ll, 0.025);
    for (let y = 0; y <= 40; y++)
      a.push(Ll * Math.pow(b, y));
    return a;
  }, []), Rn = o.useCallback((a = !1) => {
    const p = xe.width - Ve, b = a && It.current ? je.current : de, y = b.candleWidth * (1 + He), f = Math.floor(p / y), e = Math.max(0, Math.floor(b.startIndex)), O = Math.min(l.length, e + f);
    return {
      candles: l.slice(e, O),
      startIndex: e,
      endIndex: O,
      visibleCount: f,
      totalWithFuture: f + de.futureSpace,
      candleWidth: b.candleWidth
    };
  }, [l, xe.width, de]);
  o.useEffect(() => {
    if (l.length > 0) {
      const a = xe.width - Ve, p = de.candleWidth * (1 + He), b = Math.floor(a / p), y = Math.max(0, Math.floor(de.startIndex)), f = Math.min(l.length, y + b);
      We && We({ startIndex: y, endIndex: f, totalCandles: l.length }), Ps && y < 2500 && !yl && !_n.current && !de.autoFollowLatest && (ss.current && clearTimeout(ss.current), ss.current = setTimeout(() => {
        _n.current || Ps();
      }, 100));
    }
  }, [We, Ps, yl, l.length, de.startIndex, de.candleWidth, xe.width, de.autoFollowLatest]), o.useEffect(() => {
    if (!be || l.length === 0) return;
    if (qs.current) {
      qs.current = !1;
      return;
    }
    const a = xe.width - Ve, p = de.candleWidth * (1 + He), b = Math.floor(a / p), y = Math.max(0, Math.floor(de.startIndex)), f = Math.min(l.length, y + b), e = l.slice(y, f);
    if (e.length === 0) return;
    const O = Math.floor(e.length / 2), H = e[O];
    H && H.time !== Es.current && (Es.current = H.time, be(H.time));
  }, [be, l, de.startIndex, de.candleWidth, xe.width]), o.useEffect(() => {
    if (!Ee || l.length === 0 || Ee === Es.current) return;
    let a = -1, p = 1 / 0;
    for (let A = 0; A < l.length; A++) {
      const X = Math.abs(l[A].time - Ee);
      X < p && (p = X, a = A);
    }
    if (a === -1) return;
    const b = xe.width - Ve, y = de.candleWidth * (1 + He), f = Math.floor(b / y), e = Math.max(0, Math.floor(de.startIndex)), O = Math.min(l.length, e + f), H = Math.floor(f / 2), U = Math.max(0, a - H), _ = a >= e && a < O, g = e + Math.floor(f / 2);
    (!_ || Math.abs(a - g) > H / 2) && (qs.current = !0, Bt((A) => ({
      ...A,
      startIndex: U,
      autoFollowLatest: !1
    })), je.current.startIndex = U);
  }, [Ee, l, xe.width, de.candleWidth, de.startIndex]);
  const Cs = o.useCallback((a, p = !0) => {
    if (ut !== null && Et !== null) {
      const U = vn.current, _ = Kn.current, g = Et / U, w = ut + _;
      return {
        min: w - g / 2,
        max: w + g / 2,
        range: g
      };
    }
    if (a.length === 0)
      return { min: 0, max: 100, range: 100 };
    let b = 1 / 0, y = -1 / 0;
    for (const U of a)
      U.low < b && (b = U.low), U.high > y && (y = U.high);
    p && n && (n < b && (b = n), n > y && (y = n));
    const f = y - b, e = f * 0.05, O = (y + b) / 2, H = f + e * 2;
    return {
      min: O - H / 2,
      max: O + H / 2,
      range: H
    };
  }, [n, ut, Et]), dt = o.useCallback((a, p) => {
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
    ].filter((H) => r?.[H]?.enabled).length, f = xe.height - gt, e = y > 0 ? Math.max(60 * y, f * m) : 0, O = f - e;
    return O - (a - p.min) / p.range * O;
  }, [xe.height, r, l, m]), dr = o.useCallback((a, p) => {
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
    ].filter((H) => r?.[H]?.enabled).length, f = xe.height - gt, e = y > 0 ? Math.max(60 * y, f * m) : 0, O = f - e;
    return p.max - a / O * p.range;
  }, [xe.height, r, l, m]), hr = o.useCallback((a, p) => {
    const b = de.candleWidth * (1 + He);
    return (a - p) * b + b / 2;
  }, [de.candleWidth]), ll = o.useCallback((a, p) => {
    const b = de.candleWidth * (1 + He);
    return Math.floor(a / b) + p;
  }, [de.candleWidth]), Pn = o.useCallback((a) => ku(a, h), [h]), Is = o.useCallback((a) => {
    const p = new Date(a);
    if (T === "local") {
      const b = p.getHours().toString().padStart(2, "0"), y = p.getMinutes().toString().padStart(2, "0");
      return `${b}:${y}`;
    } else if (T === "UTC") {
      const b = p.getUTCHours().toString().padStart(2, "0"), y = p.getUTCMinutes().toString().padStart(2, "0");
      return `${b}:${y}`;
    } else
      try {
        return p.toLocaleTimeString("en-GB", {
          timeZone: T,
          hour: "2-digit",
          minute: "2-digit",
          hour12: !1
        });
      } catch {
        const b = p.getUTCHours().toString().padStart(2, "0"), y = p.getUTCMinutes().toString().padStart(2, "0");
        return `${b}:${y}`;
      }
  }, [T]), Zn = o.useCallback((a, p = !1) => {
    const b = new Date(a);
    if (T === "local") {
      const y = b.getDate(), f = b.toLocaleString("en", { month: "short" }), e = String(b.getFullYear()).slice(-2);
      return p ? `${y} ${f} '${e}` : `${y} ${f}`;
    } else if (T === "UTC") {
      const y = b.getUTCDate(), f = b.toLocaleString("en", { month: "short", timeZone: "UTC" }), e = String(b.getUTCFullYear()).slice(-2);
      return p ? `${y} ${f} '${e}` : `${y} ${f}`;
    } else
      try {
        const y = b.toLocaleDateString("en-GB", { timeZone: T, day: "numeric" }), f = b.toLocaleDateString("en-GB", { timeZone: T, month: "short" }), e = b.toLocaleDateString("en-GB", { timeZone: T, year: "2-digit" });
        return p ? `${y} ${f} '${e}` : `${y} ${f}`;
      } catch {
        const y = b.getUTCDate(), f = b.toLocaleString("en", { month: "short", timeZone: "UTC" }), e = String(b.getUTCFullYear()).slice(-2);
        return p ? `${y} ${f} '${e}` : `${y} ${f}`;
      }
  }, [T]), fr = o.useCallback((a) => {
    const p = new Date(a), b = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    if (T === "local") return b[p.getDay()];
    if (T === "UTC") return b[p.getUTCDay()];
    try {
      return p.toLocaleDateString("en-GB", { timeZone: T, weekday: "short" });
    } catch {
      return b[p.getUTCDay()];
    }
  }, [T]), pa = (a, p) => {
    const b = a / p, y = Math.pow(10, Math.floor(Math.log10(b))), f = b / y;
    let e;
    return f <= 1 ? e = 1 : f <= 2 ? e = 2 : f <= 5 ? e = 5 : e = 10, e * y;
  };
  o.useRef(null);
  const { indicatorData: s } = sd(l, r, It), as = o.useCallback((a = !1) => {
    const p = wl.current;
    if (!p) return;
    const { width: b, height: y } = xe;
    Ns.current || (Ns.current = document.createElement("canvas"));
    const f = Ns.current;
    (f.width !== p.width || f.height !== p.height) && (f.width = p.width, f.height = p.height);
    const e = f.getContext("2d");
    if (!e) return;
    const O = !1;
    e.setTransform(bn, 0, 0, bn, 0, 0);
    const H = !!s?.rsi, U = !!s?.macd, _ = !!s?.atr, g = !!s?.stochastic, w = r?.volume?.enabled && l.some((D) => D.volume !== void 0 && D.volume > 0), A = !!s?.williamsR, X = !!s?.cci, u = !!s?.adx, N = !!s?.roc, x = !!s?.aroon, V = !!s?.momentum, d = !!s?.ao, j = !!s?.mfi, ie = !!s?.tsi, Be = !!s?.trix, J = !!s?.ultimateOsc, Fe = !!s?.dpo, G = !!s?.kst, Re = !!s?.stochRsi, Ue = !!s?.bbPercent, Oe = !!s?.bbWidth, ue = !!s?.histVol, Pe = !!s?.chaikinVol, et = !!s?.stdDev, Xe = !!s?.obv, Ot = !!s?.cmf, yn = !!s?.adl, Zt = !!s?.forceIndex, Fl = !!s?.eom, Pt = !!s?.correlation, us = !!s?.coppock, rl = !!s?.vortex, Ol = !!s?.choppiness, jo = !!s?.elderRay, Ro = !!s?.massIndex, Po = !!s?.linRegSlope, Aa = !!s?.ppo, Da = !!s?.pvo, Ba = !!s?.cmo, Wa = !!s?.fisher, Fa = !!s?.stc, Oa = !!s?.rviOsc, _a = !!s?.klinger, $a = !!s?.connorsRsi, Ha = !!s?.apo, Va = !!s?.qstick, Xa = !!s?.bop, Ya = !!s?.psychLine, za = !!s?.pfe, Ua = !!s?.smi, Ka = !!s?.ulcerIndex, qa = !!s?.natr, Ga = !!s?.trueRange, Za = !!s?.squeeze, Ja = !!s?.relVolIndex, Qa = !!s?.vhf, ec = !!s?.volumeOsc, tc = !!s?.nvi, nc = !!s?.pvi, sc = !!s?.pvt, lc = !!s?.vroc, oc = !!s?.netVolume, rc = !!s?.twiggsMF, ac = !!s?.linRegRSquared, cc = !!s?.gator, _l = [
      H,
      U,
      _,
      g,
      A,
      X,
      u,
      N,
      x,
      V,
      d,
      j,
      ie,
      Be,
      J,
      Fe,
      G,
      Re,
      Ue,
      Oe,
      ue,
      Pe,
      et,
      Xe,
      Ot,
      yn,
      Zt,
      Fl,
      Pt,
      us,
      // Phase 2
      rl,
      Ol,
      jo,
      Ro,
      Po,
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
      Ua,
      Ka,
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
    ].filter(Boolean).length + (s?.customIndicators?.filter((D) => D.display === "subplot").length || 0), wr = y - gt, Sr = _l > 0 ? Math.max(60 * _l, wr * m) : 0, Jn = _l > 0 ? Sr / _l : 0, Ne = wr - Sr, K = b - Ve;
    e.fillStyle = te.background, e.fillRect(0, 0, b, y);
    const c = Rn(!0), xn = It.current ? je.current.candleWidth : de.candleWidth, Je = Cs(c.candles, de.autoFollowLatest);
    cn.current = Je, un.current = Ne;
    const Cr = It.current ? je.current.startIndex : de.startIndex, ic = (Cr - c.startIndex) * (xn * (1 + He)), ve = (D, i) => {
      const M = xn * (1 + He);
      return (D - i) * M + M / 2 - ic;
    }, ot = (D) => {
      const i = (D - Je.min) / Je.range;
      return Ne - i * Ne;
    }, $l = (te.gridOpacity ?? 100) / 100;
    e.globalAlpha = $l, e.strokeStyle = te.grid, e.lineWidth = 0.5, e.setLineDash([]);
    const uc = ko.current?.chart?.gridHorizontalLines, dc = ko.current?.chart?.gridVerticalLines, hc = Pl ? uc ?? $e.priceTargetLabels : $e.priceTargetLabels, Hl = pa(Je.range, hc), Ir = Math.ceil(Je.min / Hl) * Hl, fc = c.startIndex + c.candles.length - 1, pc = ve(l.length - 1, c.startIndex) <= K ? K : Math.max(0, Math.min(K, ve(fc, c.startIndex) + xn / 2)), Tr = 25;
    e.beginPath();
    let Mr = -1 / 0;
    for (let D = Ir; D <= Je.max; D += Hl) {
      const i = ot(D);
      Math.abs(i - Mr) < Tr || (Mr = i, e.moveTo(0, i), e.lineTo(pc, i));
    }
    e.stroke(), e.setLineDash([]), e.globalAlpha = 1;
    const jr = xn * (1 + He), No = Math.ceil(K / jr), Lo = c.startIndex + No, xc = Pl ? dc ?? $e.targetLinesOnScreen : $e.targetLinesOnScreen, mc = Math.max(1, Math.round(No / xc)), $s = Math.max(1, mc), Rr = $s / 2, bc = No / $s, Pr = Math.max(0, Math.min(
      1,
      (bc - 8) / 6
    )), Nr = $s / 2, Lr = $e.tertiaryGridVisible ? Math.max(0, Math.min(
      0.5,
      (3 - jr) / 1.5
    )) : 0;
    e.globalAlpha = $l, e.strokeStyle = te.grid, e.beginPath();
    const Eo = c.startIndex;
    for (let D = Eo; D <= Lo; D += $s) {
      const i = ve(D, c.startIndex);
      if (i >= 0 && i <= K && (e.moveTo(i, 0), e.lineTo(i, Ne)), i > K) break;
    }
    if (e.stroke(), Pr > 0.01 && Rr >= 1) {
      e.globalAlpha = Pr * $l, e.strokeStyle = te.grid, e.beginPath();
      const D = c.startIndex;
      for (let i = D; i <= Lo; i += Rr) {
        if ((i - Eo) % $s === 0) continue;
        const M = ve(i, c.startIndex);
        if (M >= 0 && M <= K && (e.moveTo(M, 0), e.lineTo(M, Ne)), M > K) break;
      }
      e.stroke(), e.globalAlpha = 1;
    }
    if (Lr > 0.01 && Nr >= 1) {
      e.globalAlpha = Lr * $l, e.strokeStyle = te.grid, e.beginPath();
      const D = c.startIndex;
      for (let i = D; i <= Lo; i += Nr) {
        if ((i - Eo) % $s === 0) continue;
        const M = ve(i, c.startIndex);
        if (M >= 0 && M <= K && (e.moveTo(M, 0), e.lineTo(M, Ne)), M > K) break;
      }
      e.stroke(), e.globalAlpha = 1;
    }
    e.globalAlpha = 1, e.strokeStyle = te.axisLine || te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(K, 0), e.lineTo(K, y), e.stroke(), e.save(), e.beginPath(), e.rect(0, 0, K, Ne), e.clip();
    const Ao = {
      ctx: e,
      chartWidth: K,
      mainChartHeight: Ne,
      candles: l,
      visible: c,
      indexToX: ve,
      mainPriceToY: ot,
      currentCandleWidth: xn
    };
    if (qe && lr && wu(Ao, lr), ge && Ml.length > 0 && Su(Ao, Ml), pt && (pt.bids.length > 0 || pt.asks.length > 0) && Cu(Ao, pt), zt) {
      const D = {
        ctx: e,
        chartWidth: K,
        mainChartHeight: Ne,
        candles: l,
        visibleStartIndex: c.startIndex,
        visibleEndIndex: c.startIndex + c.candles.length,
        candleWidth: xn,
        indexToX: ve,
        isDark: ar,
        timeframe: hn
      };
      Iu(D);
    }
    const Nn = Math.max(xn * 0.7, 3), al = Math.max(1, Nn * 0.15), Do = Ks.current, gc = l.length - 1, Ts = (D, i) => Do && c.startIndex + D === gc && Do.time === i.time ? Do : i;
    if (q === "candlestick")
      dl({
        ctx: e,
        candles: c.candles,
        startIndex: c.startIndex,
        indexToX: ve,
        priceToY: ot,
        morphAt: Ts,
        candleBodyWidth: Nn,
        wickWidth: al,
        colors: {
          bullish: te.bullish,
          bearish: te.bearish,
          bullishWick: te.bullishWick,
          bearishWick: te.bearishWick,
          bullishBorder: te.bullishBorder,
          bearishBorder: te.bearishBorder
        }
      });
    else if (q === "line")
      e.strokeStyle = te.bullish, e.lineWidth = 2, e.beginPath(), c.candles.forEach((D, i) => {
        const M = ve(c.startIndex + i, c.startIndex), v = ot(Ts(i, D).close);
        i === 0 ? e.moveTo(M, v) : e.lineTo(M, v);
      }), e.stroke();
    else if (q === "area") {
      const D = e.createLinearGradient(0, 0, 0, Ne);
      if (D.addColorStop(0, "rgba(34, 197, 94, 0.4)"), D.addColorStop(1, "rgba(34, 197, 94, 0.02)"), e.beginPath(), c.candles.forEach((i, M) => {
        const v = ve(c.startIndex + M, c.startIndex), C = ot(Ts(M, i).close);
        M === 0 ? e.moveTo(v, C) : e.lineTo(v, C);
      }), c.candles.length > 0) {
        const i = ve(c.startIndex + c.candles.length - 1, c.startIndex), M = ve(c.startIndex, c.startIndex);
        e.lineTo(i, Ne), e.lineTo(M, Ne), e.closePath(), e.fillStyle = D, e.fill();
      }
      e.strokeStyle = te.bullish, e.lineWidth = 2, e.beginPath(), c.candles.forEach((i, M) => {
        const v = ve(c.startIndex + M, c.startIndex), C = ot(Ts(M, i).close);
        M === 0 ? e.moveTo(v, C) : e.lineTo(v, C);
      }), e.stroke();
    } else if (q === "heikin_ashi") {
      let D = c.candles[0]?.open || 0, i = c.candles[0]?.close || 0;
      const M = c.candles.map((v, C) => {
        const k = (v.open + v.high + v.low + v.close) / 4, L = C === 0 ? (v.open + v.close) / 2 : (D + i) / 2, B = Math.max(v.high, L, k), F = Math.min(v.low, L, k), E = { time: v.time, open: L, high: B, low: F, close: k, volume: v.volume };
        return D = L, i = k, E;
      });
      dl({
        ctx: e,
        candles: M,
        startIndex: c.startIndex,
        indexToX: ve,
        priceToY: ot,
        morphAt: (v, C) => M[v],
        candleBodyWidth: Nn,
        wickWidth: al,
        colors: {
          bullish: te.bullish,
          bearish: te.bearish,
          bullishWick: te.bullishWick,
          bearishWick: te.bearishWick,
          bullishBorder: te.bullishBorder,
          bearishBorder: te.bearishBorder
        }
      });
    } else if (q === "tpo") {
      const i = /* @__PURE__ */ new Map();
      c.candles.forEach((v) => {
        const C = Math.floor(v.time / 18e5) * 18e5, k = i.get(C);
        k ? (k.high = Math.max(k.high, v.high), k.low = Math.min(k.low, v.low), k.count++) : i.set(C, { high: v.high, low: v.low, count: 1 });
      });
      let M = 0;
      i.forEach((v) => {
        const C = ve(c.startIndex + M, c.startIndex), k = ot(v.high), L = ot(v.low);
        e.fillStyle = "#21b3a4", e.globalAlpha = 0.25, e.fillRect(C - Nn / 2, k, Nn, Math.max(2, L - k)), e.globalAlpha = 1, M++;
      }), e.globalAlpha = 0.3, dl({
        ctx: e,
        candles: c.candles,
        startIndex: c.startIndex,
        indexToX: ve,
        priceToY: ot,
        morphAt: Ts,
        candleBodyWidth: Nn,
        wickWidth: al,
        colors: {
          bullish: te.bullish,
          bearish: te.bearish,
          bullishWick: te.bullishWick,
          bearishWick: te.bearishWick,
          bullishBorder: te.bullishBorder,
          bearishBorder: te.bearishBorder
        }
      }), e.globalAlpha = 1;
    } else if (q === "footprint_cluster" || q === "footprint_profile")
      dl({
        ctx: e,
        candles: c.candles,
        startIndex: c.startIndex,
        indexToX: ve,
        priceToY: ot,
        morphAt: Ts,
        candleBodyWidth: Nn,
        wickWidth: al,
        colors: {
          bullish: te.bullish,
          bearish: te.bearish,
          bullishWick: te.bullishWick,
          bearishWick: te.bearishWick,
          bullishBorder: te.bullishBorder,
          bearishBorder: te.bearishBorder
        }
      }), e.font = "8px monospace", e.fillStyle = "#e8e8e8", c.candles.forEach((D, i) => {
        const M = ve(c.startIndex + i, c.startIndex), v = ot(D.close), C = D.volume || 0;
        if (C > 0) {
          const k = Math.round(C * 0.55), L = Math.round(C * 0.45);
          e.fillText(`${k}/${L}`, M - 12, v - 8);
        }
      });
    else if (q === "flow_positioning")
      dl({
        ctx: e,
        candles: c.candles,
        startIndex: c.startIndex,
        indexToX: ve,
        priceToY: ot,
        morphAt: Ts,
        candleBodyWidth: Nn,
        wickWidth: al,
        colors: {
          bullish: te.bullish,
          bearish: te.bearish,
          bullishWick: te.bullishWick,
          bearishWick: te.bearishWick,
          bullishBorder: te.bullishBorder,
          bearishBorder: te.bearishBorder
        }
      }), e.strokeStyle = "#d0d0d0", e.lineWidth = 1, c.candles.forEach((D, i) => {
        if (i % 5 !== 0) return;
        const M = ve(c.startIndex + i, c.startIndex), v = D.close > D.open, C = ot(D.close);
        e.beginPath(), e.moveTo(M, C), e.lineTo(M, C + (v ? -12 : 12)), e.stroke(), e.fillStyle = v ? "#21b3a4" : "#f0426c", e.beginPath(), e.arc(M, C + (v ? -14 : 14), 2, 0, Math.PI * 2), e.fill();
      });
    else if (q === "renko") {
      const D = Je.range * 0.02, i = [];
      let M = c.candles[0]?.close || 0, v = 0;
      c.candles.forEach((C) => {
        const k = C.close - M, L = Math.floor(Math.abs(k) / D);
        for (let B = 0; B < L; B++) {
          const F = k > 0, E = M, S = F ? M + D : M - D;
          i.push({
            x: v * Nn * 1.2,
            isBullish: F,
            top: ot(Math.max(E, S)),
            bottom: ot(Math.min(E, S))
          }), M = S, v++;
        }
      }), i.forEach((C) => {
        const k = Math.abs(C.bottom - C.top);
        e.fillStyle = C.isBullish ? te.bullish : te.bearish, e.fillRect(C.x, C.top, Nn, k), e.strokeStyle = C.isBullish ? te.bullishBorder : te.bearishBorder, e.lineWidth = 1, e.strokeRect(C.x, C.top, Nn, k);
      });
    }
    if (w) {
      const D = Ne * 0.2, i = Ne, M = i - D, v = c.candles.map((L) => L.volume ?? 0).filter((L) => L > 0), C = v.length > 0 ? Math.max(...v) : 1, k = Math.max(2, xn * 0.7);
      c.candles.forEach((L, B) => {
        const F = L.volume ?? 0;
        if (F > 0) {
          const E = c.startIndex + B, S = ve(E, c.startIndex), P = F / C * D * 0.95, $ = i - P, Z = L.close >= L.open, he = r?.volume?.upColor || "#26a69a", z = r?.volume?.downColor || "#ef5350", Y = Z ? he : z, le = parseInt(Y.slice(1, 3), 16), me = parseInt(Y.slice(3, 5), 16), Se = parseInt(Y.slice(5, 7), 16);
          e.fillStyle = `rgba(${le}, ${me}, ${Se}, 0.45)`, e.fillRect(S - k / 2, $, k, P), e.strokeStyle = `rgba(${le}, ${me}, ${Se}, 0.7)`, e.lineWidth = 1, e.beginPath(), e.moveTo(S - k / 2, $), e.lineTo(S + k / 2, $), e.stroke();
        }
      }), St === "volume" && (e.save(), c.candles.forEach((B, F) => {
        const E = B.volume ?? 0;
        if (E <= 0) return;
        const S = c.candles[F - 1]?.volume ?? 0, R = c.candles[F + 1]?.volume ?? 0;
        if (E < S || E < R) return;
        const P = c.startIndex + F, $ = ve(P, c.startIndex), he = E / C * D * 0.95, z = i - he;
        e.beginPath(), e.arc($, z, 2.5 + 1, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc($, z, 2.5, 0, Math.PI * 2);
        const Y = B.close >= B.open;
        e.fillStyle = Y ? r?.volume?.upColor || "#26a69a" : r?.volume?.downColor || "#ef5350", e.fill();
      }), e.restore()), tn.current.volume = { top: M, bottom: i };
    }
    if (e.restore(), r) {
      if (r.ema?.enabled && s?.ema && r.ema.periods?.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, K, Ne), e.clip();
        const i = ar ? ["#D1D4DC", "#A0A4B0", "#B2B5BE", "#9598A1", "#787B86"] : ["#363A45", "#5D606B", "#434651", "#787B86", "#9598A1"];
        r.ema.periods.forEach((M, v) => {
          const C = s.ema[v];
          if (!C) return;
          e.strokeStyle = i[v % i.length], e.lineWidth = 1.5, e.beginPath();
          let k = !1;
          c.candles.forEach((L, B) => {
            const F = c.startIndex + B, E = C[F];
            if (!isNaN(E) && isFinite(E)) {
              const S = ve(F, c.startIndex), R = dt(E, Je);
              k ? e.lineTo(S, R) : (e.moveTo(S, R), k = !0);
            }
          }), e.stroke();
        }), e.restore();
      }
      if (s?.movingAverages && s.movingAverages.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, K, Ne), e.clip();
        const i = r?.movingAverages?.lineWidth ?? 1.5;
        s.movingAverages.forEach((M) => {
          e.strokeStyle = M.color, e.lineWidth = i, e.beginPath();
          let v = !1;
          c.candles.forEach((C, k) => {
            const L = c.startIndex + k, B = M.data[L];
            if (!isNaN(B) && isFinite(B)) {
              const F = ve(L, c.startIndex), E = dt(B, Je);
              v ? e.lineTo(F, E) : (e.moveTo(F, E), v = !0);
            }
          }), e.stroke();
        }), e.restore();
      }
      if (r.bollinger?.enabled && s?.bollinger) {
        const i = s.bollinger;
        e.save(), e.beginPath(), e.rect(0, 0, K, Ne), e.clip();
        const M = r.bollinger.lineWidth || 1, v = r.bollinger.upperColor || "#9B59B6", C = r.bollinger.middleColor || "#9B59B6", k = r.bollinger.lowerColor || "#9B59B6";
        e.strokeStyle = v, e.lineWidth = M, e.setLineDash([3, 3]), e.beginPath();
        let L = !1;
        c.candles.forEach((B, F) => {
          const E = c.startIndex + F, S = i.upper[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ve(E, c.startIndex), P = dt(S, Je);
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.strokeStyle = C, e.lineWidth = M, e.setLineDash([]), e.beginPath(), L = !1, c.candles.forEach((B, F) => {
          const E = c.startIndex + F, S = i.middle[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ve(E, c.startIndex), P = dt(S, Je);
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.strokeStyle = k, e.lineWidth = M, e.setLineDash([3, 3]), e.beginPath(), L = !1, c.candles.forEach((B, F) => {
          const E = c.startIndex + F, S = i.lower[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ve(E, c.startIndex), P = dt(S, Je);
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.setLineDash([]), e.restore();
      }
      if (s?.vwap) {
        e.save(), e.beginPath(), e.rect(0, 0, K, Ne), e.clip(), e.strokeStyle = r?.vwap?.color || "#2196F3", e.lineWidth = 2, e.beginPath();
        let i = !1;
        c.candles.forEach((M, v) => {
          const C = c.startIndex + v, k = s.vwap[C];
          if (!isNaN(k) && isFinite(k)) {
            const L = ve(C, c.startIndex), B = dt(k, Je);
            i ? e.lineTo(L, B) : (e.moveTo(L, B), i = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (s?.ichimoku) {
        e.save(), e.beginPath(), e.rect(0, 0, K, Ne), e.clip();
        const i = s.ichimoku, M = r?.ichimoku?.tenkanColor || "#0496ff", v = r?.ichimoku?.kijunColor || "#ff0000", C = r?.ichimoku?.cloudUpColor || "rgba(0, 255, 0, 0.2)", k = r?.ichimoku?.cloudDownColor || "rgba(255, 0, 0, 0.2)";
        for (let B = 0; B < c.candles.length; B++) {
          const F = c.startIndex + B, E = i.senkouA[F], S = i.senkouB[F];
          if (!isNaN(E) && !isNaN(S) && isFinite(E) && isFinite(S)) {
            const R = ve(F, c.startIndex), P = dt(E, Je), $ = dt(S, Je);
            e.fillStyle = E >= S ? C : k;
            const Z = xn * (1 + He);
            e.fillRect(R - Z / 2, Math.min(P, $), Z, Math.abs(P - $));
          }
        }
        e.strokeStyle = M, e.lineWidth = 1.5, e.beginPath();
        let L = !1;
        c.candles.forEach((B, F) => {
          const E = c.startIndex + F, S = i.tenkan[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ve(E, c.startIndex), P = dt(S, Je);
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.strokeStyle = v, e.lineWidth = 1.5, e.beginPath(), L = !1, c.candles.forEach((B, F) => {
          const E = c.startIndex + F, S = i.kijun[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ve(E, c.startIndex), P = dt(S, Je);
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (s?.parabolicSAR) {
        e.save(), e.beginPath(), e.rect(0, 0, K, Ne), e.clip();
        const i = s.parabolicSAR, M = r?.parabolicSAR?.bullishColor || "#22c55e", v = r?.parabolicSAR?.bearishColor || "#ef4444";
        c.candles.forEach((C, k) => {
          const L = c.startIndex + k, B = i.sar[L], F = i.direction[L];
          if (!isNaN(B) && isFinite(B)) {
            const E = ve(L, c.startIndex), S = dt(B, Je);
            e.fillStyle = F > 0 ? M : v, e.beginPath(), e.arc(E, S, 2.5, 0, Math.PI * 2), e.fill();
          }
        }), e.restore();
      }
      if (s?.keltner) {
        e.save(), e.beginPath(), e.rect(0, 0, K, Ne), e.clip();
        const i = s.keltner, M = r?.keltner?.upperColor || "#FF9800", v = r?.keltner?.middleColor || "#FF9800", C = r?.keltner?.lowerColor || "#FF9800";
        e.strokeStyle = M, e.lineWidth = 1, e.setLineDash([3, 3]), e.beginPath();
        let k = !1;
        c.candles.forEach((L, B) => {
          const F = c.startIndex + B, E = i.upper[F];
          if (!isNaN(E) && isFinite(E)) {
            const S = ve(F, c.startIndex), R = dt(E, Je);
            k ? e.lineTo(S, R) : (e.moveTo(S, R), k = !0);
          }
        }), e.stroke(), e.strokeStyle = v, e.setLineDash([]), e.beginPath(), k = !1, c.candles.forEach((L, B) => {
          const F = c.startIndex + B, E = i.middle[F];
          if (!isNaN(E) && isFinite(E)) {
            const S = ve(F, c.startIndex), R = dt(E, Je);
            k ? e.lineTo(S, R) : (e.moveTo(S, R), k = !0);
          }
        }), e.stroke(), e.strokeStyle = C, e.setLineDash([3, 3]), e.beginPath(), k = !1, c.candles.forEach((L, B) => {
          const F = c.startIndex + B, E = i.lower[F];
          if (!isNaN(E) && isFinite(E)) {
            const S = ve(F, c.startIndex), R = dt(E, Je);
            k ? e.lineTo(S, R) : (e.moveTo(S, R), k = !0);
          }
        }), e.stroke(), e.setLineDash([]), e.restore();
      }
      if (s?.pivotPoints) {
        e.save(), e.beginPath(), e.rect(0, 0, K, Ne), e.clip();
        const i = s.pivotPoints, M = r?.pivotPoints?.pivotColor || "#FFEB3B", v = r?.pivotPoints?.resistanceColor || "#ef4444", C = r?.pivotPoints?.supportColor || "#22c55e", k = (L, B, F, E = []) => {
          const S = L.filter((R) => !isNaN(R) && isFinite(R)).pop();
          if (S !== void 0) {
            const R = dt(S, Je);
            e.strokeStyle = B, e.lineWidth = 1, e.setLineDash(E), e.beginPath(), e.moveTo(0, R), e.lineTo(K, R), e.stroke(), e.fillStyle = B, e.font = Vt, e.textAlign = "left", e.fillText(F, 5, R - 3);
          }
        };
        e.setLineDash([]), k(i.pivot, M, "P"), k(i.r1, v, "R1", [2, 2]), k(i.r2, v, "R2", [4, 2]), k(i.r3, v, "R3", [6, 2]), k(i.s1, C, "S1", [2, 2]), k(i.s2, C, "S2", [4, 2]), k(i.s3, C, "S3", [6, 2]), e.setLineDash([]), e.restore();
      }
      if (s?.supertrend) {
        e.save(), e.beginPath(), e.rect(0, 0, K, Ne), e.clip();
        const i = s.supertrend, M = r?.supertrend?.bullishColor || "#22c55e", v = r?.supertrend?.bearishColor || "#ef4444";
        e.lineWidth = r?.supertrend?.lineWidth || 2, c.candles.forEach((C, k) => {
          const L = c.startIndex + k, B = i.supertrend[L];
          if (isNaN(B) || !isFinite(B)) return;
          const F = ve(L, c.startIndex), E = dt(B, Je), S = L - 1;
          S >= 0 && !isNaN(i.supertrend[S]) && (e.strokeStyle = i.direction[L] === 1 ? M : v, e.beginPath(), e.moveTo(ve(S, c.startIndex), dt(i.supertrend[S], Je)), e.lineTo(F, E), e.stroke());
        }), e.restore();
      }
      if (s?.donchian) {
        e.save(), e.beginPath(), e.rect(0, 0, K, Ne), e.clip();
        const i = s.donchian, M = (v, C, k = []) => {
          e.strokeStyle = C, e.lineWidth = r?.donchian?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let L = !1;
          c.candles.forEach((B, F) => {
            const E = c.startIndex + F, S = v[E];
            if (!isNaN(S) && isFinite(S)) {
              const R = ve(E, c.startIndex), P = dt(S, Je);
              L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        M(i.upper, r?.donchian?.upperColor || "#2196F3"), M(i.middle, r?.donchian?.middleColor || "#FFC107", [4, 4]), M(i.lower, r?.donchian?.lowerColor || "#2196F3"), e.restore();
      }
      if (s?.envelopes) {
        e.save(), e.beginPath(), e.rect(0, 0, K, Ne), e.clip();
        const i = s.envelopes, M = (v, C, k = []) => {
          e.strokeStyle = C, e.lineWidth = r?.envelopes?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let L = !1;
          c.candles.forEach((B, F) => {
            const E = c.startIndex + F, S = v[E];
            if (!isNaN(S) && isFinite(S)) {
              const R = ve(E, c.startIndex);
              L ? e.lineTo(R, dt(S, Je)) : (e.moveTo(R, dt(S, Je)), L = !0);
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
        const v = s?.[i];
        if (!v) return;
        e.save(), e.beginPath(), e.rect(0, 0, K, Ne), e.clip(), e.strokeStyle = r?.[i]?.color || M, e.lineWidth = r?.[i]?.lineWidth || 2, e.beginPath();
        let C = !1;
        c.candles.forEach((k, L) => {
          const B = c.startIndex + L, F = v[B];
          if (!isNaN(F) && isFinite(F)) {
            const E = ve(B, c.startIndex), S = dt(F, Je);
            C ? e.lineTo(E, S) : (e.moveTo(E, S), C = !0);
          }
        }), e.stroke(), e.restore();
      }), s?.linearReg) {
        e.save(), e.beginPath(), e.rect(0, 0, K, Ne), e.clip();
        const i = s.linearReg, M = (v, C, k = []) => {
          e.strokeStyle = C, e.lineWidth = r?.linearReg?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let L = !1;
          c.candles.forEach((B, F) => {
            const E = c.startIndex + F, S = v[E];
            if (!isNaN(S) && isFinite(S)) {
              const R = ve(E, c.startIndex);
              L ? e.lineTo(R, dt(S, Je)) : (e.moveTo(R, dt(S, Je)), L = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        M(i.upper, r?.linearReg?.upperColor || "#81D4FA"), M(i.middle, r?.linearReg?.middleColor || "#29B6F6", [4, 4]), M(i.lower, r?.linearReg?.lowerColor || "#81D4FA"), e.restore();
      }
      if (s?.fibRetracement) {
        e.save(), e.beginPath(), e.rect(0, 0, K, Ne), e.clip();
        const i = s.fibRetracement, M = r?.fibRetracement?.color || "#FFD54F", v = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
        i.levels.forEach((C, k) => {
          const L = dt(C, Je);
          e.strokeStyle = M, e.lineWidth = r?.fibRetracement?.lineWidth || 1, e.setLineDash(k === 0 || k === 6 ? [] : [4, 3]), e.beginPath(), e.moveTo(0, L), e.lineTo(K, L), e.stroke(), e.fillStyle = M, e.font = Vt, e.textAlign = "left", e.fillText(`${(v[k] * 100).toFixed(1)}% (${C.toFixed(2)})`, 5, L - 3);
        }), e.setLineDash([]), e.restore();
      }
      if (s?.camarillaPivots) {
        e.save(), e.beginPath(), e.rect(0, 0, K, Ne), e.clip();
        const i = s.camarillaPivots, M = r?.camarillaPivots?.resistanceColor || "#ef4444", v = r?.camarillaPivots?.supportColor || "#22c55e", C = (k, L, B) => {
          const F = k.filter((E) => !isNaN(E) && isFinite(E)).pop();
          if (F !== void 0) {
            const E = dt(F, Je);
            e.strokeStyle = L, e.lineWidth = r?.camarillaPivots?.lineWidth || 1, e.setLineDash([3, 3]), e.beginPath(), e.moveTo(0, E), e.lineTo(K, E), e.stroke(), e.fillStyle = L, e.font = Vt, e.textAlign = "left", e.fillText(B, 5, E - 3);
          }
        };
        C(i.h4, M, "H4"), C(i.h3, M, "H3"), C(i.l3, v, "L3"), C(i.l4, v, "L4"), e.setLineDash([]), e.restore();
      }
      if (s?.woodiePivots) {
        e.save(), e.beginPath(), e.rect(0, 0, K, Ne), e.clip();
        const i = s.woodiePivots, M = r?.woodiePivots?.pivotColor || "#FFEB3B", v = r?.woodiePivots?.resistanceColor || "#ef4444", C = r?.woodiePivots?.supportColor || "#22c55e", k = (L, B, F) => {
          const E = L.filter((S) => !isNaN(S) && isFinite(S)).pop();
          if (E !== void 0) {
            const S = dt(E, Je);
            e.strokeStyle = B, e.lineWidth = r?.woodiePivots?.lineWidth || 1, e.setLineDash([3, 3]), e.beginPath(), e.moveTo(0, S), e.lineTo(K, S), e.stroke(), e.fillStyle = B, e.font = Vt, e.textAlign = "left", e.fillText(F, 5, S - 3);
          }
        };
        k(i.pivot, M, "WP"), k(i.r1, v, "WR1"), k(i.r2, v, "WR2"), k(i.s1, C, "WS1"), k(i.s2, C, "WS2"), e.setLineDash([]), e.restore();
      }
      if (s?.volumeSma && w) {
        e.save();
        const i = s.volumeSma, M = Ne * 0.2, v = Ne, C = c.candles.map((B) => B.volume || 0), k = Math.max(...C, 1);
        e.strokeStyle = r?.volumeSma?.color || "#FF9800", e.lineWidth = 1.5, e.beginPath();
        let L = !1;
        c.candles.forEach((B, F) => {
          const E = c.startIndex + F, S = i[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ve(E, c.startIndex), P = v - S / k * M;
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (r?.volumeProfile?.enabled && c.candles.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, K, Ne), e.clip();
        const i = r.volumeProfile.numberOfRows ?? 48, M = K * ((r.volumeProfile.rowWidth ?? 15) / 100), v = (r.volumeProfile.opacity ?? 60) / 100, C = r.volumeProfile.upColor || "#D97706", k = r.volumeProfile.downColor || "#1E3A8A", L = r.volumeProfile.pocColor || "#10B981", B = r.volumeProfile.lookbackBars ?? 0, F = B > 0 ? c.candles.slice(-B) : c.candles;
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
          const Y = z.low, le = z.high, me = le - Y, Se = z.close >= z.open;
          for (let se = 0; se < i; se++) {
            const Ie = E + se * P, Te = Ie + P;
            if (le >= Ie && Y <= Te) {
              const Ke = Math.max(Y, Ie), ht = Math.min(le, Te), ft = me > 0 ? (ht - Ke) / me : 1, At = z.volume * ft;
              Se ? $[se].upVolume += At : $[se].downVolume += At, $[se].totalVolume += At;
            }
          }
        });
        let Z = 0, he = 0;
        if ($.forEach((z, Y) => {
          z.totalVolume > Z && (Z = z.totalVolume, he = Y);
        }), Z > 0) {
          const z = Ne / i * 0.85;
          $.forEach((Y, le) => {
            if (Y.totalVolume <= 0) return;
            const me = ot(Y.priceLevel) - z / 2, Se = Y.totalVolume / Z * M, se = Y.totalVolume > 0 ? Y.upVolume / Y.totalVolume * Se : 0, Ie = Se - se, Te = le === he, Ke = K - Se;
            se > 0 && (e.globalAlpha = Te ? Math.min(v + 0.2, 1) : v, e.fillStyle = C, e.fillRect(Ke, me, se, z)), Ie > 0 && (e.globalAlpha = Te ? 0.95 : 0.85, e.fillStyle = k, e.fillRect(Ke + se, me, Ie, z)), Te && (e.globalAlpha = 0.9, e.strokeStyle = L, e.lineWidth = 1.5, e.strokeRect(Ke, me, Se, z));
          }), e.globalAlpha = 1, St === "volumeProfile" && $.forEach((le, me) => {
            if (le.totalVolume <= 0) return;
            const Se = ot(le.priceLevel), se = le.totalVolume / Z * M, Ie = K - se;
            e.beginPath(), e.arc(Ie, Se, 2.5 + 1, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc(Ie, Se, 2.5, 0, Math.PI * 2), e.fillStyle = le.upVolume >= le.downVolume ? C : k, e.fill();
          });
        }
        e.restore(), e.restore();
      }
    }
    const Hs = [], Ms = [];
    let Vl = "", Bo = "", cl = 14, Wo = 0, Fo = 0;
    const vc = ms?.current && ms.current.length > 0;
    if (xs && !vc && es) {
      const D = es.find((i) => i.id === xs);
      if (D && D.points && D.points.length > 0) {
        e.save();
        const i = $e.badgeFont, M = "#2962ff", v = "rgba(41, 98, 255, 0.2)", C = $e.badgePadding, k = $e.badgeRowHeight, L = Ve - 6, B = K + 3, F = xe.height - gt, E = F + (gt - k) / 2;
        if (Vl = i, Bo = M, cl = k, Wo = E, Fo = B, D.points.forEach((S) => {
          let R = null, P = null;
          if (S.price !== void 0 && (P = ot(S.price), P >= 0 && P <= Ne)) {
            const $ = Pn(S.price), Z = e.measureText($).width, he = Math.min(Z + C * 2, L), z = P - k / 2;
            Ms.push({
              pos: P,
              text: $,
              bWidth: he,
              topOrigin: z
            });
          }
          if (S.time !== void 0) {
            let $ = -1;
            if (l.length > 0) {
              const Z = l[0].time, he = l[l.length - 1].time, z = l.length > 1 ? l[1].time - l[0].time : 6e4;
              if (S.time > he) $ = l.length - 1 + (S.time - he) / z;
              else if (S.time < Z) $ = (S.time - Z) / z;
              else {
                let Y = 0, le = l.length - 1;
                for (; Y <= le; ) {
                  const me = Math.floor((Y + le) / 2);
                  if (l[me].time === S.time) {
                    $ = me;
                    break;
                  }
                  l[me].time < S.time ? Y = me + 1 : le = me - 1;
                }
                if ($ === -1) {
                  const me = Y, Se = me - 1;
                  if (Se >= 0 && me < l.length) {
                    const se = l[Se], Ie = l[me], Te = (S.time - se.time) / (Ie.time - se.time);
                    $ = Se + Te;
                  } else
                    $ = Y;
                }
              }
            }
            if ($ !== -1) {
              const Z = je.current.startIndex, z = je.current.candleWidth * (1 + He), Y = Math.floor(Z), le = (Z - Y) * z;
              R = ($ - Y) * z + z / 2 - le;
            }
            if (R !== null && R >= 0 && R <= K) {
              const Z = `${fr(S.time)} ${Zn(S.time, !0)}  ${Is(S.time)}`, z = e.measureText(Z).width + C * 2;
              let Y = R - z / 2;
              Y < 0 && (Y = 0), Y + z > K && (Y = K - z), Hs.push({
                pos: R,
                text: Z,
                bWidth: z,
                topOrigin: Y
              });
            }
          }
        }), (D.type === "long" || D.type === "short") && D.stopLoss) {
          const S = D.stopLoss.price, R = ot(S);
          if (R >= 0 && R <= Ne) {
            e.font = Vl || i;
            const P = Pn(S), $ = e.measureText(P).width, Z = Math.min($ + C * 2, L), he = R - k / 2;
            Ms.push({
              pos: R,
              text: P,
              bWidth: Z,
              topOrigin: he
            });
          }
        }
        if (Hs.length >= 2) {
          const S = Math.min(...Hs.map((P) => P.pos)), R = Math.max(...Hs.map((P) => P.pos));
          R > S && (e.fillStyle = v, e.fillRect(S, F, R - S, gt));
        }
        if (Ms.length >= 2) {
          const S = Math.min(...Ms.map((P) => P.pos)), R = Math.max(...Ms.map((P) => P.pos));
          R > S && (e.fillStyle = v, e.fillRect(B - 3, S, Ve, R - S));
        }
        e.restore();
      }
    }
    e.fillStyle = te.axisLabel || "#787b86", e.font = Nl, e.textBaseline = "middle", e.textAlign = $e.priceLabelAlign;
    const yc = $e.priceLabelAlign === "right" ? b - (Xn !== void 0 ? Xn : $o) - 4 : K + 2;
    let Er = -1 / 0;
    for (let D = Ir; D <= Je.max; D += Hl) {
      const i = ot(D);
      if (i >= 10 && i <= Ne - 10) {
        if (Math.abs(i - Er) < Tr) continue;
        Er = i, e.fillText(Pn(D), yc, i);
      }
    }
    const Jt = n != null && !Number.isNaN(n) ? n : c.candles.length ? c.candles[c.candles.length - 1].close : null;
    if (Jt != null && !Number.isNaN(Jt) && !Ct) {
      const D = ot(Jt);
      if (D >= 0 && D <= Ne) {
        e.save();
        const i = c.candles.length >= 2 ? c.candles[c.candles.length - 2] : null, M = c.candles.length >= 1 ? c.candles[c.candles.length - 1] : null, v = i ? i.close : M ? M.open : Jt, C = Jt >= v, k = te.priceTickerBullish || te.bullish, L = te.priceTickerBearish || te.bearish, B = C ? k : L, F = (Vn) => {
          const sn = Vn.replace("#", ""), $t = parseInt(sn.substring(0, 2), 16), mn = parseInt(sn.substring(2, 4), 16), Qt = parseInt(sn.substring(4, 6), 16);
          return `${$t}, ${mn}, ${Qt}`;
        }, E = F(te.textDim || "#666666"), S = `rgba(${E}, 0.35)`, R = `rgba(${E}, 0.9)`, P = F(B).split(",").map(Number), $ = (0.299 * P[0] + 0.587 * P[1] + 0.114 * P[2]) / 255, Z = Number.isNaN($) || $ <= 0.55 ? "#ffffff" : "#000000", he = c.candles.length - 1, z = c.candles.length > 0 ? ve(c.startIndex + he, c.startIndex) : 0;
        z > 0 && (e.strokeStyle = S, e.lineWidth = 1, e.setLineDash([4, 4]), e.beginPath(), e.moveTo(0, D), e.lineTo(z, D), e.stroke(), e.setLineDash([])), e.strokeStyle = R, e.lineWidth = 1, e.setLineDash([4, 3]), e.beginPath(), e.moveTo(z, D), e.lineTo(K, D), e.stroke(), e.setLineDash([]);
        const Y = Pn(Jt), le = Nl, me = $e.liveCountdownFont;
        e.font = le;
        const se = e.measureText(Y).width, Ie = $e.livePriceLabelPadding, Te = $e.livePriceRowHeight, Ke = I && I.length > 0, ht = Ke ? $e.countdownRowHeight : 0, ft = Te + ht;
        let At = 0;
        Ke && (e.font = me, At = e.measureText(I).width);
        const kn = Ve - 6, Ln = Math.max(se, At) + Ie * 2, Nt = Math.min(Ln, kn), Dt = K + 3, vt = D - Te / 2;
        e.fillStyle = te.background, e.fillRect(Dt - 1, vt - 1, Nt + 2, ft + 2), e.fillStyle = B, e.beginPath(), e.roundRect(Dt, vt, Nt, ft, 3), e.fill(), e.fillStyle = Z, e.font = le, e.textAlign = "center", e.textBaseline = "middle", e.fillText(Y, Dt + Nt / 2, vt + Te / 2), Ke && (e.strokeStyle = Z === "#ffffff" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)", e.lineWidth = 0.5, e.beginPath(), e.moveTo(Dt + 3, vt + Te), e.lineTo(Dt + Nt - 3, vt + Te), e.stroke(), e.fillStyle = Z === "#ffffff" ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)", e.font = me, e.textAlign = "center", e.textBaseline = "middle", e.fillText(I, Dt + Nt / 2, vt + Te + ht / 2)), e.restore();
      }
    }
    if (es && es.length > 0) {
      e.save();
      const D = Nl;
      e.font = D;
      const i = $e.badgePadding, M = $e.badgeRowHeight, v = [], C = [];
      es.forEach((R) => {
        if ((R.type === "horizontalRay" || R.type === "horizontal") && R.points.length > 0) {
          const P = R.points[0].price;
          v.push({ price: P, color: R.color || "#2196f3", yPos: ot(P) });
        } else if ((R.type === "long" || R.type === "short") && R.points.length >= 2) {
          if (R.id === xs) return;
          const P = R.points[0].price, $ = R.points[1].price;
          if (v.push({ price: P, color: "#4b5563", yPos: ot(P) }), v.push({ price: $, color: "#22c55e", yPos: ot($) }), R.stopLoss) {
            const Z = R.stopLoss.price;
            v.push({ price: Z, color: "#ef4444", yPos: ot(Z) });
          }
        }
      });
      let k = -9999, L = -9999;
      if (Jt != null && !Number.isNaN(Jt)) {
        const R = ot(Jt), P = $e.livePriceRowHeight + (I && I.length > 0 ? $e.countdownRowHeight : 0);
        k = R - $e.livePriceRowHeight / 2, L = k + P;
      }
      const B = 2, F = Ve - 6, E = K + 3;
      v.sort((R, P) => R.yPos - P.yPos);
      let S = -9999;
      v.forEach((R) => {
        let P = R.yPos - M / 2, $ = P + M;
        if (P < S + B && (P = S + B, $ = P + M), P < L + B && $ > k - B && (P = L + B, $ = P + M), S = $, P >= 0 && $ <= Ne) {
          const Z = Pn(R.price), he = e.measureText(Z).width, z = Math.min(he + i * 2, F);
          e.fillStyle = R.color, e.beginPath(), e.roundRect(E, P, z, M, 3), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.fillText(Z, E + z / 2, P + M / 2);
        }
      }), e.font = $e.alertFlagFont, C.forEach((R) => {
        if (R.xPos >= 0 && R.xPos <= K) {
          const P = Zn(R.time, !0) + " " + Is(R.time), Z = e.measureText(P).width + i * 2, z = xe.height - gt + (gt - M) / 2;
          let Y = R.xPos - Z / 2;
          Y < 0 && (Y = 0), Y + Z > K && (Y = K - Z), e.fillStyle = R.color, e.beginPath(), e.roundRect(Y, z, Z, M, 3), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.fillText(P, Y + Z / 2, z + M / 2);
        }
      }), e.restore();
    }
    if (Ct && Jt !== null && Jt !== void 0 && !Number.isNaN(Jt)) {
      const D = Lt != null && on != null && Number.isFinite(Lt) && Number.isFinite(on), i = D ? Lt : Jt, M = D ? on : Jt + od(h || ""), v = ot(i), C = ot(M);
      if (e.save(), v >= 0 && v <= Ne) {
        e.strokeStyle = "#1976d2", e.lineWidth = 1, e.setLineDash([3, 4]), e.beginPath(), e.moveTo(0, v), e.lineTo(K, v), e.stroke(), e.setLineDash([]);
        const k = Pn(i);
        e.font = $e.alertCountFont;
        const B = e.measureText(k).width + 12, F = 16, E = K + 2;
        e.fillStyle = "#1976d2", e.beginPath(), e.roundRect(E, v - F / 2, Math.min(B, Ve - 4), F, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "left", e.textBaseline = "middle", e.fillText(k, E + 6, v);
      }
      if (C >= 0 && C <= Ne) {
        e.strokeStyle = "#d32f2f", e.lineWidth = 1, e.setLineDash([3, 4]), e.beginPath(), e.moveTo(0, C), e.lineTo(K, C), e.stroke(), e.setLineDash([]);
        const k = Pn(M);
        e.font = $e.alertCountFont;
        const B = e.measureText(k).width + 12, F = 16, E = K + 2;
        e.fillStyle = "#d32f2f", e.beginPath(), e.roundRect(E, C - F / 2, Math.min(B, Ve - 4), F, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "left", e.textBaseline = "middle", e.fillText(k, E + 6, C);
      }
      v >= 0 && C >= 0 && v <= Ne && C <= Ne && (e.fillStyle = "rgba(148, 163, 184, 0.04)", e.fillRect(0, Math.min(C, v), K, Math.abs(v - C))), e.restore();
    }
    if (ze && ze.length > 0) {
      const D = {
        ctx: e,
        chartWidth: K,
        mainChartHeight: Ne,
        mainPriceToY: ot,
        formatPrice: Pn,
        colors: {
          slColor: te.slColor,
          slOpacity: te.slOpacity,
          tpColor: te.tpColor,
          tpOpacity: te.tpOpacity
        },
        selectedPositionId: Ye.current,
        slDraft: Ze.current,
        tpDraft: Qe.current,
        hoveredSLTP: Yn.current,
        draggingHandle: at.current,
        defaultOffset: ts(0) || void 0
      };
      Tu(D, ze), Mu(D, ze);
    }
    if (St && !St.startsWith("sp-") && s) {
      const D = Je;
      if (D && Ne > 0) {
        const v = (k, L) => {
          e.save(), e.beginPath(), e.rect(0, 0, K, Ne), e.clip();
          for (let B = 0; B < c.candles.length; B += 8) {
            const F = c.startIndex + B;
            if (F >= k.length) continue;
            const E = k[F];
            if (isNaN(E) || !isFinite(E)) continue;
            const S = ve(F, c.startIndex), R = Ne - (E - D.min) / D.range * Ne;
            e.beginPath(), e.arc(S, R, 3.5, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc(S, R, 2.5, 0, Math.PI * 2), e.fillStyle = L, e.fill();
          }
          e.restore();
        }, C = St;
        if (C === "movingAverages" && s.movingAverages)
          for (const k of s.movingAverages) v(k.data, k.color);
        else if (C?.startsWith("movingAverages__") && s.movingAverages) {
          const k = parseInt(C.slice(16), 10), L = s.movingAverages[k];
          L && v(L.data, L.color);
        } else if (C === "bollinger" && s.bollinger) {
          const k = s.bollinger;
          v(k.upper, r?.bollinger?.upperColor || "#9B59B6"), v(k.middle, r?.bollinger?.middleColor || "#9B59B6"), v(k.lower, r?.bollinger?.lowerColor || "#9B59B6");
        } else if (C === "vwap" && s.vwap)
          v(s.vwap, "#ff9800");
        else if (C === "ichimoku" && s.ichimoku) {
          const k = s.ichimoku;
          v(k.tenkan, "#0094FF"), v(k.kijun, "#AD1457"), v(k.senkouA, "#4CAF50"), v(k.senkouB, "#FF5722");
        } else if (C === "keltner" && s.keltner)
          v(s.keltner.upper, "#3b82f6"), v(s.keltner.middle, "#3b82f6"), v(s.keltner.lower, "#3b82f6");
        else if (C === "donchian" && s.donchian)
          v(s.donchian.upper, "#3b82f6"), v(s.donchian.middle, "#3b82f6"), v(s.donchian.lower, "#3b82f6");
        else if (C === "envelopes" && s.envelopes)
          v(s.envelopes.upper, "#3b82f6"), v(s.envelopes.basis, "#3b82f6"), v(s.envelopes.lower, "#3b82f6");
        else if (C === "supertrend" && s.supertrend) {
          const k = s.supertrend.map((L) => L?.value ?? NaN);
          v(k, "#3b82f6");
        } else if (["dema", "tema", "hma"].includes(C)) {
          const k = s[C];
          Array.isArray(k) && v(k, "#3b82f6");
        } else if (C.startsWith("ci-") && r?.customIndicators) {
          const k = r.customIndicators.find((B) => `ci-${B.id}` === C), L = k?.data;
          k && L && Array.isArray(L) && v(L, k.color);
        } else if (C.startsWith("script-") && r?.customIndicators) {
          const k = C.slice(7);
          for (const L of r.customIndicators) {
            if (L.scriptId !== k) continue;
            const B = L.data;
            B && Array.isArray(B) && v(B, L.color);
          }
        }
      }
    }
    let _t = Ne;
    if (s?.rsi) {
      const D = Jn, i = _t, M = i + D, v = r?.rsi?.style || {};
      v.backgroundColor && (e.fillStyle = v.backgroundColor, e.globalAlpha = v.backgroundOpacity ?? 0.3, e.fillRect(0, i, K, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(K, i), e.stroke();
      const C = (Y) => i + D - Y / 100 * D, k = r?.rsi?.overbought ?? 70, L = r?.rsi?.oversold ?? 30;
      if (v.showZones) {
        const Y = C(k), le = C(L), me = v.zoneOpacity ?? 0.1;
        e.fillStyle = v.overboughtZoneColor || "#ff4444", e.globalAlpha = me, e.fillRect(0, i, K, Y - i), e.fillStyle = v.oversoldZoneColor || "#44ff44", e.fillRect(0, le, K, M - le), e.globalAlpha = 1;
      }
      if (v.showGrid !== !1) {
        const Y = v.gridColor || "rgba(150, 150, 150, 0.3)";
        e.setLineDash([4, 4]), [L, 50, k].forEach((le) => {
          e.beginPath(), le === 50 ? (e.strokeStyle = Y, e.lineWidth = 1) : (e.strokeStyle = "rgba(180, 130, 80, 0.8)", e.lineWidth = 1.5);
          const me = C(le);
          e.moveTo(0, me), e.lineTo(K, me), e.stroke();
        }), e.setLineDash([]), e.lineWidth = 1;
      }
      const B = r?.rsi?.color || "#E74C3C", F = v.lineWidth ?? 1.5;
      e.strokeStyle = B, e.lineWidth = F, e.beginPath();
      let E = !1;
      c.candles.forEach((Y, le) => {
        const me = c.startIndex + le, Se = s.rsi[me];
        if (!isNaN(Se) && isFinite(Se)) {
          const se = ve(me, c.startIndex), Ie = C(Se);
          E ? e.lineTo(se, Ie) : (e.moveTo(se, Ie), E = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Vt, e.textAlign = "left", [0, L, 50, k, 100].forEach((Y) => {
        const le = C(Y);
        e.fillText(Y.toString(), K + 5, le);
      }), tn.current.rsi = { top: i, bottom: M };
      const S = ct.current !== null ? ct.current : c.startIndex + c.candles.length - 1, R = s.rsi[S], P = !isNaN(R) && isFinite(R) ? R.toFixed(2) : "--", $ = `RSI ${r?.rsi?.period || 14} close`, Z = r?.rsi?.style?.customLabel || $, he = r?.rsi?.style?.labelColor || "#d1d5db";
      e.fillStyle = he, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left", e.fillText(Z, 5, i + 15), e.fillStyle = B, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
      const z = e.measureText(Z).width;
      e.fillText(P, 13 + z, i + 15), Hn.current.rsi = 13 + z + e.measureText(P).width + 8, _t = M;
    }
    if (s?.macd) {
      const D = Jn, i = _t, M = i + D, v = r?.macd?.style || {};
      v.backgroundColor && (e.fillStyle = v.backgroundColor, e.globalAlpha = v.backgroundOpacity ?? 0.3, e.fillRect(0, i, K, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(K, i), e.stroke();
      const C = s.macd.macd.slice(c.startIndex, c.endIndex), k = s.macd.signal.slice(c.startIndex, c.endIndex), L = s.macd.histogram.slice(c.startIndex, c.endIndex), B = [...C, ...k, ...L].filter((vt) => !isNaN(vt) && isFinite(vt)), F = Math.min(...B, 0), S = Math.max(...B, 0) - F || 1, R = (vt) => i + D - (vt - F) / S * D;
      if (v.showGrid !== !1) {
        e.strokeStyle = v.gridColor || te.grid, e.setLineDash([2, 2]), e.beginPath();
        const vt = R(0);
        e.moveTo(0, vt), e.lineTo(K, vt), e.stroke(), e.setLineDash([]);
      }
      const P = Math.max(2, xn * 0.5), $ = r?.macd?.histogramUpColor || "#26a69a", Z = r?.macd?.histogramDownColor || "#ef5350", he = R(0);
      c.candles.forEach((vt, Vn) => {
        const sn = c.startIndex + Vn, $t = s.macd.histogram[sn];
        if (!isNaN($t) && isFinite($t)) {
          const mn = ve(sn, c.startIndex), Qt = R($t), js = Math.abs(he - Qt);
          e.fillStyle = $t >= 0 ? $ : Z, $t >= 0 ? e.fillRect(mn - P / 2, Qt, P, js) : e.fillRect(mn - P / 2, he, P, js);
        }
      });
      const z = r?.macd?.macdColor || "#3498DB";
      e.strokeStyle = z, e.lineWidth = 1.5, e.beginPath();
      let Y = !1;
      c.candles.forEach((vt, Vn) => {
        const sn = c.startIndex + Vn, $t = s.macd.macd[sn];
        if (!isNaN($t) && isFinite($t)) {
          const mn = ve(sn, c.startIndex), Qt = R($t);
          Y ? e.lineTo(mn, Qt) : (e.moveTo(mn, Qt), Y = !0);
        }
      }), e.stroke();
      const le = r?.macd?.signalColor || "#E67E22";
      e.strokeStyle = le, e.lineWidth = 1.5, e.beginPath(), Y = !1, c.candles.forEach((vt, Vn) => {
        const sn = c.startIndex + Vn, $t = s.macd.signal[sn];
        if (!isNaN($t) && isFinite($t)) {
          const mn = ve(sn, c.startIndex), Qt = R($t);
          Y ? e.lineTo(mn, Qt) : (e.moveTo(mn, Qt), Y = !0);
        }
      }), e.stroke(), tn.current.macd = { top: i, bottom: M };
      const me = `MACD(${r?.macd?.fast || 12},${r?.macd?.slow || 26},${r?.macd?.signal || 9})`, Se = r?.macd?.style?.customLabel || me, se = r?.macd?.style?.labelColor || te.textDim;
      e.fillStyle = se, e.font = `bold ${Vt}`, e.textAlign = "left";
      const Ie = ct.current !== null ? ct.current : c.startIndex + c.candles.length - 1, Te = s.macd.macd[Ie], Ke = s.macd.signal[Ie], ht = s.macd.histogram[Ie];
      e.fillText(Se, 5, i + 12), e.fillStyle = z, e.font = Vt;
      const ft = e.measureText(Se).width, At = !isNaN(Te) && isFinite(Te) ? Te.toFixed(4) : "--";
      e.fillText(At, 10 + ft, i + 12), e.fillStyle = le;
      const kn = !isNaN(Ke) && isFinite(Ke) ? Ke.toFixed(4) : "--", Ln = e.measureText(At).width;
      e.fillText(kn, 16 + ft + Ln, i + 12);
      const Nt = !isNaN(ht) && isFinite(ht) ? ht.toFixed(4) : "--";
      e.fillStyle = ht >= 0 ? "#00ff88" : "#ff0080";
      const Dt = e.measureText(kn).width;
      e.fillText(Nt, 22 + ft + Ln + Dt, i + 12), Hn.current.macd = 22 + ft + Ln + Dt + e.measureText(Nt).width + 8, _t = M;
    }
    if (s?.atr) {
      const D = Jn, i = _t, M = i + D, v = r?.atr?.style || {};
      v.backgroundColor && (e.fillStyle = v.backgroundColor, e.globalAlpha = v.backgroundOpacity ?? 0.3, e.fillRect(0, i, K, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(K, i), e.stroke();
      const C = s.atr.slice(c.startIndex, c.endIndex).filter((me) => !isNaN(me) && isFinite(me)), k = Math.min(...C, 0), B = Math.max(...C) - k || 1, F = (me) => i + D - (me - k) / B * D, E = r?.atr?.color || "#17a2b8", S = v.lineWidth ?? 1.5;
      e.strokeStyle = E, e.lineWidth = S, e.beginPath();
      let R = !1;
      c.candles.forEach((me, Se) => {
        const se = c.startIndex + Se, Ie = s.atr[se];
        if (!isNaN(Ie) && isFinite(Ie)) {
          const Te = ve(se, c.startIndex), Ke = F(Ie);
          R ? e.lineTo(Te, Ke) : (e.moveTo(Te, Ke), R = !0);
        }
      }), e.stroke(), tn.current.atr = { top: i, bottom: M };
      const P = `ATR(${r?.atr?.period || 14})`, $ = r?.atr?.style?.customLabel || P, Z = r?.atr?.style?.labelColor || te.textDim;
      e.fillStyle = Z, e.font = `bold ${Vt}`, e.textAlign = "left";
      const he = ct.current !== null ? ct.current : c.startIndex + c.candles.length - 1, z = s.atr[he], Y = !isNaN(z) && isFinite(z) ? z.toFixed(5) : "--";
      e.fillText($, 5, i + 12), e.fillStyle = E, e.font = Vt;
      const le = e.measureText($).width;
      e.fillText(Y, 10 + le, i + 12), Hn.current.atr = 10 + le + e.measureText(Y).width + 8, _t = M;
    }
    if (s?.stochastic) {
      const D = Jn, i = _t, M = i + D, v = r?.stochastic?.style || {};
      v.backgroundColor && (e.fillStyle = v.backgroundColor, e.globalAlpha = v.backgroundOpacity ?? 0.3, e.fillRect(0, i, K, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(K, i), e.stroke();
      const C = (Se) => i + D - Se / 100 * D;
      e.strokeStyle = te.grid, e.setLineDash([2, 2]), e.beginPath();
      const k = r?.stochastic?.overbought ?? 80, L = r?.stochastic?.oversold ?? 20;
      [L, 50, k].forEach((Se) => {
        const se = C(Se);
        e.moveTo(0, se), e.lineTo(K, se);
      }), e.stroke(), e.setLineDash([]);
      const B = r?.stochastic?.kColor || "#3498DB";
      e.strokeStyle = B, e.lineWidth = 1.5, e.beginPath();
      let F = !1;
      c.candles.forEach((Se, se) => {
        const Ie = c.startIndex + se, Te = s.stochastic.k[Ie];
        if (!isNaN(Te) && isFinite(Te)) {
          const Ke = ve(Ie, c.startIndex), ht = C(Te);
          F ? e.lineTo(Ke, ht) : (e.moveTo(Ke, ht), F = !0);
        }
      }), e.stroke();
      const E = r?.stochastic?.dColor || "#E67E22";
      e.strokeStyle = E, e.lineWidth = 1.5, e.beginPath(), F = !1, c.candles.forEach((Se, se) => {
        const Ie = c.startIndex + se, Te = s.stochastic.d[Ie];
        if (!isNaN(Te) && isFinite(Te)) {
          const Ke = ve(Ie, c.startIndex), ht = C(Te);
          F ? e.lineTo(Ke, ht) : (e.moveTo(Ke, ht), F = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Vt, e.textAlign = "left", [0, L, 50, k, 100].forEach((Se) => {
        const se = C(Se);
        e.fillText(Se.toString(), K + 5, se);
      }), tn.current.stochastic = { top: i, bottom: M };
      const S = `STOCH(${r?.stochastic?.kPeriod || 14},${r?.stochastic?.dPeriod || 3})`, R = r?.stochastic?.style?.customLabel || S, P = r?.stochastic?.style?.labelColor || te.textDim;
      e.fillStyle = P, e.font = `bold ${Vt}`, e.textAlign = "left";
      const $ = ct.current !== null ? ct.current : c.startIndex + c.candles.length - 1, Z = s.stochastic.k[$], he = s.stochastic.d[$];
      e.fillText(R, 5, i + 12), e.fillStyle = B, e.font = Vt;
      const z = e.measureText(R).width, Y = !isNaN(Z) && isFinite(Z) ? `%K ${Z.toFixed(2)}` : "%K --";
      e.fillText(Y, 10 + z, i + 12), e.fillStyle = E;
      const le = e.measureText(Y).width, me = !isNaN(he) && isFinite(he) ? `%D ${he.toFixed(2)}` : "%D --";
      e.fillText(me, 16 + z + le, i + 12), Hn.current.stochastic = 16 + z + le + e.measureText(me).width + 8, _t = M;
    }
    if (s?.williamsR) {
      const D = Jn, i = _t, M = i + D, v = r?.williamsR?.style || {};
      v.backgroundColor && (e.fillStyle = v.backgroundColor, e.globalAlpha = v.backgroundOpacity ?? 0.3, e.fillRect(0, i, K, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(K, i), e.stroke();
      const C = (z) => i + D - (z + 100) / 100 * D, k = r?.williamsR?.overbought ?? -20, L = r?.williamsR?.oversold ?? -80;
      e.setLineDash([4, 4]), e.strokeStyle = v.gridColor || "rgba(180, 130, 80, 0.6)", [L, -50, k].forEach((z) => {
        e.beginPath();
        const Y = C(z);
        e.moveTo(0, Y), e.lineTo(K, Y), e.stroke();
      }), e.setLineDash([]);
      const B = r?.williamsR?.color || "#E91E63";
      e.strokeStyle = B, e.lineWidth = v.lineWidth ?? 1.5, e.beginPath();
      let F = !1;
      c.candles.forEach((z, Y) => {
        const le = c.startIndex + Y, me = s.williamsR[le];
        if (!isNaN(me) && isFinite(me)) {
          const Se = ve(le, c.startIndex), se = C(me);
          F ? e.lineTo(Se, se) : (e.moveTo(Se, se), F = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Vt, e.textAlign = "left", [-100, L, -50, k, 0].forEach((z) => {
        const Y = C(z);
        e.fillText(z.toString(), K + 5, Y);
      }), tn.current.williamsR = { top: i, bottom: M };
      const E = `Williams %R ${r?.williamsR?.period || 14}`, S = r?.williamsR?.style?.customLabel || E, R = r?.williamsR?.style?.labelColor || "#d1d5db";
      e.fillStyle = R, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left";
      const P = ct.current !== null ? ct.current : c.startIndex + c.candles.length - 1, $ = s.williamsR[P], Z = !isNaN($) && isFinite($) ? $.toFixed(2) : "--";
      e.fillText(S, 5, i + 15), e.fillStyle = B;
      const he = e.measureText(S).width;
      e.fillText(Z, 13 + he, i + 15), Hn.current.williamsR = 13 + he + e.measureText(Z).width + 8, _t = M;
    }
    if (s?.cci) {
      const D = Jn, i = _t, M = i + D, v = r?.cci?.style || {};
      v.backgroundColor && (e.fillStyle = v.backgroundColor, e.globalAlpha = v.backgroundOpacity ?? 0.3, e.fillRect(0, i, K, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(K, i), e.stroke();
      const C = c.candles.map((le, me) => s.cci[c.startIndex + me]).filter((le) => !isNaN(le) && isFinite(le)), k = C.length > 0 ? Math.max(200, Math.max(...C.map(Math.abs))) : 200, L = (le) => i + D / 2 - le / k * (D / 2), B = r?.cci?.overbought ?? 100, F = r?.cci?.oversold ?? -100;
      e.setLineDash([4, 4]), e.strokeStyle = v.gridColor || "rgba(180, 130, 80, 0.6)", [F, 0, B].forEach((le) => {
        e.beginPath();
        const me = L(le);
        e.moveTo(0, me), e.lineTo(K, me), e.stroke();
      }), e.setLineDash([]);
      const E = r?.cci?.color || "#00BCD4";
      e.strokeStyle = E, e.lineWidth = v.lineWidth ?? 1.5, e.beginPath();
      let S = !1;
      c.candles.forEach((le, me) => {
        const Se = c.startIndex + me, se = s.cci[Se];
        if (!isNaN(se) && isFinite(se)) {
          const Ie = ve(Se, c.startIndex), Te = L(se);
          S ? e.lineTo(Ie, Te) : (e.moveTo(Ie, Te), S = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Vt, e.textAlign = "left", [Math.round(-k), F, 0, B, Math.round(k)].forEach((le) => {
        const me = L(le);
        e.fillText(le.toString(), K + 5, me);
      }), tn.current.cci = { top: i, bottom: M };
      const R = `CCI ${r?.cci?.period || 20}`, P = r?.cci?.style?.customLabel || R, $ = r?.cci?.style?.labelColor || "#d1d5db";
      e.fillStyle = $, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left";
      const Z = ct.current !== null ? ct.current : c.startIndex + c.candles.length - 1, he = s.cci[Z], z = !isNaN(he) && isFinite(he) ? he.toFixed(2) : "--";
      e.fillText(P, 5, i + 15), e.fillStyle = E;
      const Y = e.measureText(P).width;
      e.fillText(z, 13 + Y, i + 15), Hn.current.cci = 13 + Y + e.measureText(z).width + 8, _t = M;
    }
    if (s?.adx) {
      const D = Jn, i = _t, M = i + D;
      e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(K, i), e.stroke();
      const v = (S) => i + D - S / 100 * D;
      e.setLineDash([4, 4]), e.strokeStyle = "rgba(150, 150, 150, 0.3)", [25, 50, 75].forEach((S) => {
        e.beginPath(), e.moveTo(0, v(S)), e.lineTo(K, v(S)), e.stroke();
      }), e.setLineDash([]);
      const C = r?.adx?.adxColor || "#FFEB3B", k = r?.adx?.plusDIColor || "#22c55e", L = r?.adx?.minusDIColor || "#ef4444";
      e.strokeStyle = k, e.lineWidth = 1, e.beginPath();
      let B = !1;
      c.candles.forEach((S, R) => {
        const P = c.startIndex + R, $ = s.adx.plusDI[P];
        if (!isNaN($) && isFinite($)) {
          const Z = ve(P, c.startIndex), he = v($);
          B ? e.lineTo(Z, he) : (e.moveTo(Z, he), B = !0);
        }
      }), e.stroke(), e.strokeStyle = L, e.beginPath(), B = !1, c.candles.forEach((S, R) => {
        const P = c.startIndex + R, $ = s.adx.minusDI[P];
        if (!isNaN($) && isFinite($)) {
          const Z = ve(P, c.startIndex), he = v($);
          B ? e.lineTo(Z, he) : (e.moveTo(Z, he), B = !0);
        }
      }), e.stroke(), e.strokeStyle = C, e.lineWidth = 2, e.beginPath(), B = !1, c.candles.forEach((S, R) => {
        const P = c.startIndex + R, $ = s.adx.adx[P];
        if (!isNaN($) && isFinite($)) {
          const Z = ve(P, c.startIndex), he = v($);
          B ? e.lineTo(Z, he) : (e.moveTo(Z, he), B = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Vt, [0, 25, 50, 75, 100].forEach((S) => {
        e.fillText(S.toString(), K + 5, v(S));
      });
      const F = ct.current !== null ? ct.current : c.startIndex + c.candles.length - 1, E = s.adx.adx[F];
      e.fillStyle = "#d1d5db", e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.fillText(`ADX ${r?.adx?.period || 14}`, 5, i + 15), e.fillStyle = C, e.fillText(!isNaN(E) && isFinite(E) ? E.toFixed(2) : "--", 73, i + 15), e.fillStyle = k, e.fillText("+DI", 118, i + 15), e.fillStyle = L, e.fillText("-DI", 148, i + 15), Hn.current.adx = 148 + e.measureText("-DI").width + 8, tn.current.adx = { top: i, bottom: M }, _t = M;
    }
    if (s?.roc) {
      const D = Jn, i = _t, M = i + D;
      e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(K, i), e.stroke();
      const v = c.candles.map((P, $) => s.roc[c.startIndex + $]).filter((P) => !isNaN(P) && isFinite(P)), C = v.length > 0 ? Math.max(5, Math.max(...v.map(Math.abs))) : 5, k = (P) => i + D / 2 - P / C * (D / 2);
      e.setLineDash([4, 4]), e.strokeStyle = "rgba(150, 150, 150, 0.5)", e.beginPath(), e.moveTo(0, k(0)), e.lineTo(K, k(0)), e.stroke(), e.setLineDash([]);
      const L = r?.roc?.color || "#9C27B0";
      e.strokeStyle = L, e.lineWidth = 1.5, e.beginPath();
      let B = !1;
      c.candles.forEach((P, $) => {
        const Z = c.startIndex + $, he = s.roc[Z];
        if (!isNaN(he) && isFinite(he)) {
          const z = ve(Z, c.startIndex), Y = k(he);
          B ? e.lineTo(z, Y) : (e.moveTo(z, Y), B = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Vt, [-C, 0, C].forEach((P) => {
        e.fillText(P.toFixed(1) + "%", K + 5, k(P));
      }), e.fillStyle = "#d1d5db", e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
      const F = ct.current !== null ? ct.current : c.startIndex + c.candles.length - 1, E = s.roc[F], S = !isNaN(E) && isFinite(E) ? E.toFixed(2) + "%" : "--";
      e.fillText(`ROC ${r?.roc?.period || 12}`, 5, i + 15), e.fillStyle = L;
      const R = e.measureText(`ROC ${r?.roc?.period || 12}`).width;
      e.fillText(S, 13 + R, i + 15), Hn.current.roc = 13 + R + e.measureText(S).width + 8, tn.current.roc = { top: i, bottom: M }, _t = M;
    }
    const Oo = {
      ctx: e,
      chartWidth: K,
      subplotHeight: Jn,
      visible: c,
      indexToX: ve,
      currentCandleWidth: xn,
      subplotLabelFont: Vt,
      hoveredCandleIndex: ct.current,
      colors: { textDim: te.textDim, grid: te.grid },
      indicators: r,
      indicatorData: s,
      indicatorBounds: tn.current,
      subplotLabelEndX: Hn.current,
      mainPriceToY: ot,
      mainChartHeight: Ne,
      skipIndicators: O,
      clickedIndicatorKey: St
    };
    if (ju(Oo), _t = Ru(Oo, _t), Pu(Oo), kt && kt.length > 0 && c.candles.length > 0) {
      const D = (P) => P ? P.toUpperCase().trim().slice(0, 2) : "??", i = (P) => {
        if (P.datetime) {
          const $ = new Date(P.datetime).getTime();
          if (!isNaN($)) return $;
        }
        if (!P.date) return null;
        try {
          const [$, Z, he] = P.date.split("-").map(Number);
          if (!P.time) return Date.UTC($, Z - 1, he, 12, 0);
          const z = P.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
          if (!z) return Date.UTC($, Z - 1, he, 12, 0);
          let Y = parseInt(z[1]);
          const le = parseInt(z[2]), me = z[3]?.toUpperCase();
          return me === "PM" && Y !== 12 ? Y += 12 : me === "AM" && Y === 12 && (Y = 0), Date.UTC($, Z - 1, he, Y, le);
        } catch {
          return null;
        }
      }, M = [];
      e.save();
      const v = { high: 0, medium: 1, low: 2 }, C = [], k = Date.now();
      for (const P of kt) {
        const $ = i(P);
        if (!$ || $ < k) continue;
        const Z = l.length > 1 ? Math.abs(l[1].time - l[0].time) : 6e4, he = l[l.length - 1], z = he && $ > he.time + Z;
        let Y, le;
        if (z) {
          const se = ($ - he.time) / Z, Ie = l.length - 1 + se;
          if (le = Math.round(Ie), Y = ve(Ie, c.startIndex), Y < 0 || Y > K - 10) continue;
        } else {
          let Se = 0, se = l.length - 1;
          for (le = -1; Se <= se; ) {
            const Te = Math.floor((Se + se) / 2);
            if (l[Te].time === $) {
              le = Te;
              break;
            }
            l[Te].time < $ ? Se = Te + 1 : se = Te - 1;
          }
          if (le === -1) {
            const Te = Se >= 0 && Se < l.length, Ke = se >= 0 && se < l.length;
            Te && Ke ? le = Math.abs(l[Se].time - $) < Math.abs(l[se].time - $) ? Se : se : Te ? le = Se : Ke ? le = se : le = l.length - 1;
          }
          const Ie = Math.abs(l[le].time - $);
          if (le < 0 || Ie > Z || le < c.startIndex || le >= c.endIndex || (Y = ve(le, c.startIndex), Y < 0 || Y > K)) continue;
        }
        const me = Nu({ event: P.event || "", country: P.region_code || "" });
        C.push({ x: Y, event: P, impact: me, ts: $, closestIdx: le });
      }
      C.sort((P, $) => {
        const Z = v[P.impact] ?? 3, he = v[$.impact] ?? 3;
        return Z !== he ? Z - he : (P.event.event || "").localeCompare($.event.event || "");
      });
      const L = /* @__PURE__ */ new Map();
      for (const P of C) {
        const $ = Math.round(P.x);
        L.has($) || L.set($, []), L.get($).push(P);
      }
      const B = document.documentElement.classList.contains("dark"), F = y - gt, E = 22, S = 32, R = F - E / 2 - 5;
      for (const [P, $] of L) {
        const Z = $[0].x, he = $[0].impact, z = he === "high", Y = he === "low", le = D($[0].event.region_code), me = Lu($[0].event.region_code), Se = $.length;
        M.push({
          x: Z,
          y: R,
          event: $[0].event,
          impact: he,
          ts: $[0].ts,
          groupEvents: $.map((ft) => ({ event: ft.event, impact: ft.impact, ts: ft.ts }))
        });
        const se = z ? "#dc2626" : Y ? "#22c55e" : "#d97706";
        e.save(), e.shadowColor = B ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.15)", e.shadowBlur = 8, e.shadowOffsetY = 2;
        const Ie = Z - S / 2, Te = R - E / 2;
        e.fillStyle = B ? "rgba(30, 41, 59, 0.92)" : "rgba(255, 255, 255, 0.95)", e.beginPath(), e.roundRect(Ie, Te, S, E, 6), e.fill(), e.shadowColor = "transparent", e.shadowBlur = 0, e.strokeStyle = B ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)", e.lineWidth = 1, e.stroke(), e.fillStyle = se, e.beginPath(), e.roundRect(Ie, Te, 3, E, [6, 0, 0, 6]), e.fill(), e.restore();
        const Ke = 18, ht = 13;
        if (me ? e.drawImage(me, Z - Ke / 2, R - ht / 2, Ke, ht) : (e.font = 'bold 9px -apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif', e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = B ? "#e2e8f0" : "#334155", e.fillText(le, Z + 1, R)), Se > 1) {
          const ft = Ie + S - 2, At = Te - 2, kn = 7;
          e.beginPath(), e.arc(ft, At, kn, 0, Math.PI * 2), e.fillStyle = se, e.fill(), e.strokeStyle = B ? "#0f172a" : "#ffffff", e.lineWidth = 1.5, e.stroke(), e.font = 'bold 8px -apple-system, BlinkMacSystemFont, "Inter", sans-serif', e.fillStyle = "#ffffff", e.fillText(String(Se), ft, At + 0.5);
        }
        e.beginPath(), e.moveTo(Z, R + E / 2), e.lineTo(Z, F), e.strokeStyle = z ? "rgba(220, 38, 38, 0.3)" : Y ? "rgba(34, 197, 94, 0.25)" : "rgba(217, 119, 6, 0.3)", e.lineWidth = 1, e.setLineDash([2, 3]), e.stroke(), e.setLineDash([]);
      }
      e.restore(), Fn.current = M;
    } else
      Fn.current = [];
    if (e.strokeStyle = te.axisLine || te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, y - gt), e.lineTo(b, y - gt), e.stroke(), $e.versionLabelVisible) {
      const D = Xn === 0 ? 0 : $e.versionLabelXOffset, i = K + Ve / 2 + D, M = y - gt / 2 + 1;
      e.save(), e.font = 'bold 11px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = te.text, e.fillText("v.23", i, M), e.restore();
    }
    if (c.candles.length > 0) {
      const D = xn * (1 + He), i = Math.max(1, Math.floor(80 / D)), M = y - gt, v = M + 16;
      if (e.font = ur, e.textAlign = "center", e.textBaseline = "middle", e.save(), e.beginPath(), e.rect(0, M, K, gt), e.clip(), !c.candles || c.candles.length === 0) {
        e.restore();
        return;
      }
      const C = c.candles[0], k = c.candles[c.candles.length - 1];
      if (!C || !k) {
        e.restore();
        return;
      }
      const L = (/* @__PURE__ */ new Date()).getFullYear(), B = new Date(C.time).getFullYear(), F = new Date(k.time).getFullYear(), E = B !== F, S = B !== L || F !== L, R = c.candles[1], P = R ? R.time - C.time : 6e4, Z = P / 6e4 >= 60;
      let he = "", z = -1, Y = -1 / 0;
      const le = 12, me = (se, Ie) => {
        if (Z) {
          const ht = Zn(se, S || E || Ie !== z);
          return ht !== he ? (he = ht, z = Ie, ht) : Is(se);
        }
        const Te = Zn(se, !1);
        return Ie !== z && z !== -1 ? (z = Ie, Zn(se, !0)) : Te !== he ? (he = Te, z = Ie, Zn(se, S)) : Is(se);
      }, Se = xe.width < 400;
      if ($e.useFixedTimeAxisLabels) {
        const se = Se ? $e.fixedTimeAxisLabelCountSmall : $e.fixedTimeAxisLabelCount, Ie = 5, Te = K - Ie * 2;
        for (let Ke = 0; Ke < se; Ke++) {
          const ht = Ie + Te * (Ke + 0.5) / se, ft = ll(ht, c.startIndex), At = Math.round(ft) - c.startIndex, kn = At >= 0 && At < c.candles.length ? c.candles[At] : null, Ln = kn ? kn.time : C.time + (ft - c.startIndex) * P, Nt = kn ? ve(c.startIndex + At, c.startIndex) : ht, Dt = new Date(Ln).getFullYear(), vt = me(Ln, Dt);
          e.fillStyle = te.axisLabel, e.fillText(vt, Nt, v);
        }
      } else {
        const Ke = [
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
        ], ht = i * P;
        let ft = Ke[Ke.length - 1];
        for (const Nt of Ke)
          if (Nt >= ht) {
            ft = Nt;
            break;
          }
        const At = Math.ceil(C.time / ft) * ft, kn = k.time + ft * 25;
        let Ln = -1;
        for (let Nt = At; Nt <= kn; Nt += ft) {
          let Dt, vt = Nt;
          if (Nt <= k.time) {
            let Qt = 0, js = c.candles.length - 1, il = js;
            for (; Qt <= js; ) {
              const Xl = Qt + js >> 1;
              c.candles[Xl].time >= Nt ? (il = Xl, js = Xl - 1) : Qt = Xl + 1;
            }
            if (il === Ln) continue;
            Ln = il, vt = c.candles[il].time, Dt = ve(c.startIndex + il, c.startIndex);
          } else {
            const Qt = c.startIndex + (c.candles.length - 1) + (Nt - k.time) / P;
            Dt = ve(Qt, c.startIndex);
          }
          if (Dt < 2 || Dt > K - 10) continue;
          const Vn = me(vt, new Date(vt).getFullYear()), sn = e.measureText(Vn).width, $t = Dt - sn / 2, mn = Dt + sn / 2;
          $t < Y + le || mn > K - 10 || $t < 2 || (e.fillStyle = te.axisLabel, e.fillText(Vn, Dt, v), Y = mn);
        }
      }
      e.restore(), (Hs.length > 0 || Ms.length > 0) && (e.save(), Hs.forEach((se) => {
        e.fillStyle = Bo, e.beginPath(), e.roundRect(se.topOrigin, Wo, se.bWidth, cl, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.font = Vl, e.fillText(se.text, se.topOrigin + se.bWidth / 2, Wo + cl / 2);
      }), Ms.forEach((se) => {
        e.fillStyle = Bo, e.beginPath(), e.roundRect(Fo, se.topOrigin, se.bWidth, cl, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.font = Vl, e.fillText(se.text, Fo + se.bWidth / 2, se.topOrigin + cl / 2);
      }), e.restore());
    }
    const _o = p.getContext("2d");
    _o && (_o.setTransform(1, 0, 0, 1, 0, 0), _o.drawImage(f, 0, 0)), An.current = {
      startIndex: Cr,
      candleWidth: xn
    }, It.current && Zs.current?.();
  }, [xe, l, n, de, te, s, m, Rn, Cs, Pn, Is, Zn, fr, oo, bn, I, r, q, dt, kt, pt, St, es, xs]);
  rn.current = as, o.useEffect(() => {
    zs && (zs.current = () => {
      lt(!0);
    });
  }, [zs]);
  const Ft = o.useCallback(() => {
    const a = Ge.current, p = a?.getContext("2d");
    if (!a || !p) return;
    const b = {
      ctx: p,
      dimensions: xe,
      dpr: bn,
      candles: l,
      colors: te,
      viewState: de,
      indicatorData: s,
      indicators: r,
      indicatorHeightRatio: m,
      showOHLC: Gn,
      isDesktop: Pl,
      PRICE_AXIS_WIDTH: Ve,
      TIME_AXIS_HEIGHT: gt,
      PRICE_LABEL_FONT: Nl,
      TIME_LABEL_FONT: ur,
      crosshair: Kt.current,
      isScrolling: It.current,
      scrollState: {
        startIndex: je.current.startIndex,
        candleWidth: je.current.candleWidth
      },
      isDraggingHandle: !!at.current,
      isHoveredSLTP: !!Yn.current,
      sessionControlHovered: fo.current,
      isSyncedUpdate: Us.current,
      syncedCrosshairTime: Ls.current ?? void 0,
      hoveredEvent: In.current || gs.current,
      currentOhlcTextWidth: tr,
      currentBbTextEndX: po,
      currentMaTextEndX: xo,
      currentVwapTextEndX: mo,
      currentVpTextEndX: bo,
      currentVolTextEndX: go,
      overlayLabelEndXPrev: Os.current,
      subplotLabelEndXPrev: sr,
      getVisibleCandles: Rn,
      getPriceRange: Cs,
      yToPrice: dr,
      xToIndex: ll,
      indexToX: hr,
      formatPrice: Pn,
      formatTime: Is,
      formatDate: Zn,
      callbacks: {
        setOhlcTextWidth: na,
        setBbTextEndX: la,
        setMaTextEndX: oa,
        setVwapTextEndX: ra,
        setVpTextEndX: aa,
        setVolTextEndX: ca,
        setOverlayLabelEndX: (y) => {
          Os.current = y, ia(y);
        },
        setSubplotLabelEndX: ua,
        onCrosshairMove: ne
      }
    };
    Eu(b);
  }, [xe, l, de, te, s, r, m, Rn, Cs, dr, ll, hr, Pn, Is, Zn, ne, bn, Gn, oe]);
  o.useEffect(() => {
    an.current = Ft;
  }, [Ft]), o.useEffect(() => {
    Cn.current = te?.crosshairStyle || "standard", Ge.current && (Ge.current.style.cursor = Cn.current !== "standard" ? "none" : "crosshair");
  }, [te?.crosshairStyle]);
  const {
    handleZoomIn: xa,
    handleZoomOut: ma,
    handleResetView: ba,
    handleResetYAxis: ga,
    handleMoveLeft: va,
    handleMoveRight: ya,
    handleYAxisMouseDown: ka,
    handleYAxisTouchStart: wa,
    handleYAxisWheel: wo
  } = Au({
    minCandleWidth: Ll,
    maxCandleWidth: El,
    priceAxisWidth: Ve,
    timeAxisHeight: gt,
    dimensions: xe,
    candlesLength: l.length,
    disableAutoFollow: fe,
    livePrice: n ?? null,
    scrollStateRef: je,
    drawChartRef: rn,
    notifyScrollSync: wt,
    getVisibleCandles: Rn,
    getPriceRange: Cs,
    setViewState: Bt,
    setPriceScale: Mt,
    setPriceOffset: De,
    setFixedPriceCenter: Fs,
    setFixedPriceRange: Rt,
    setIsScalingYAxis: uo,
    fixedPriceCenter: ut,
    priceScale: Le,
    priceOffset: jt,
    viewStateAutoFollowLatest: de.autoFollowLatest,
    yAxisScaleStartRef: Qs,
    priceScaleRef: vn,
    priceOffsetRef: Kn,
    yAxisDebounceRef: qn
  }), Sa = o.useCallback((a) => {
    const p = Ge.current;
    if (!p) return;
    const b = p.getBoundingClientRect(), y = a.clientX - b.left, f = a.clientY - b.top;
    if (("ontouchstart" in window || navigator.maxTouchPoints > 0) && !Mn && !Tn && !at.current)
      return;
    if (Kt.current = { x: y, y: f }, !Tn && !at.current && r && s) {
      const w = cn.current, A = un.current;
      if (w && A > 0 && f < A) {
        const X = je.current, u = X.candleWidth * (1 + He), N = Math.max(0, Math.floor(X.startIndex)), x = N + Math.round(y / u), V = 8, d = (J) => isNaN(J) || !isFinite(J) ? !1 : Math.abs(f - (A - (J - w.min) / w.range * A)) < V;
        let j = null;
        if (!j && r.movingAverages?.enabled && s.movingAverages) {
          for (const J of s.movingAverages)
            if (x >= 0 && x < J.data.length && d(J.data[x])) {
              j = "movingAverages";
              break;
            }
        }
        if (!j && r.bollinger?.enabled && s.bollinger) {
          const J = s.bollinger;
          x >= 0 && x < J.upper.length && (d(J.upper[x]) || d(J.middle[x]) || d(J.lower[x])) && (j = "bollinger");
        }
        if (!j && r.vwap?.enabled && s.vwap && x >= 0 && x < s.vwap.length && d(s.vwap[x]) && (j = "vwap"), !j && r.supertrend?.enabled && s.supertrend && x >= 0 && x < s.supertrend.length && s.supertrend[x] && d(s.supertrend[x].value) && (j = "supertrend"), !j && r.ichimoku?.enabled && s.ichimoku) {
          const J = s.ichimoku;
          x >= 0 && x < J.tenkan.length && (d(J.tenkan[x]) || d(J.kijun[x]) || d(J.senkouA[x]) || d(J.senkouB[x])) && (j = "ichimoku");
        }
        if (!j && r.keltner?.enabled && s.keltner) {
          const J = s.keltner;
          x >= 0 && x < J.upper.length && (d(J.upper[x]) || d(J.middle[x]) || d(J.lower[x])) && (j = "keltner");
        }
        if (!j && r.donchian?.enabled && s.donchian) {
          const J = s.donchian;
          x >= 0 && x < J.upper.length && (d(J.upper[x]) || d(J.middle[x]) || d(J.lower[x])) && (j = "donchian");
        }
        if (!j && r.envelopes?.enabled && s.envelopes) {
          const J = s.envelopes;
          x >= 0 && x < J.upper.length && (d(J.upper[x]) || d(J.basis[x]) || d(J.lower[x])) && (j = "envelopes");
        }
        if (!j && r?.volume?.enabled && A > 0 && f >= A * 0.8 && f <= A) {
          const J = x - N, Fe = Rn();
          if (J >= 0 && J < Fe.candles.length) {
            const G = Fe.candles[J].volume ?? 0;
            if (G > 0) {
              const Re = A * 0.2, Ue = A, Oe = Fe.candles.map((Xe) => Xe.volume ?? 0).filter((Xe) => Xe > 0), ue = Oe.length > 0 ? Math.max(...Oe) : 1, Pe = G / ue * Re * 0.95, et = Ue - Pe;
              f >= et && (j = "volume");
            }
          }
        }
        const ie = xe.width - Ve;
        if (!j && r?.volumeProfile?.enabled && A > 0 && y >= ie * (1 - (r.volumeProfile.rowWidth ?? 15) / 100)) {
          const J = Rn();
          if (J.candles.length > 0) {
            const Fe = r.volumeProfile.numberOfRows ?? 48, G = ie * ((r.volumeProfile.rowWidth ?? 15) / 100), Re = r.volumeProfile.lookbackBars ?? 0, Ue = Re > 0 ? J.candles.slice(-Re) : J.candles;
            let Oe = 1 / 0, ue = -1 / 0;
            Ue.forEach((Xe) => {
              Oe = Math.min(Oe, Xe.low), ue = Math.max(ue, Xe.high);
            });
            const Pe = (ue - Oe || 1) / Fe, et = cn.current;
            if (et && et.range > 0) {
              const Xe = et.max - f / A * et.range, Ot = Math.floor((Xe - Oe) / Pe);
              if (Ot >= 0 && Ot < Fe) {
                const yn = new Float64Array(Fe);
                Ue.forEach((Pt) => {
                  if (!(!Pt.volume || Pt.volume <= 0))
                    for (let us = 0; us < Fe; us++) {
                      const rl = Oe + us * Pe, Ol = rl + Pe;
                      if (Pt.high >= rl && Pt.low <= Ol) {
                        const jo = Math.max(Pt.low, rl), Ro = Math.min(Pt.high, Ol), Po = Pt.high - Pt.low > 0 ? (Ro - jo) / (Pt.high - Pt.low) : 1;
                        yn[us] += Pt.volume * Po;
                      }
                    }
                });
                let Zt = 0;
                for (let Pt = 0; Pt < Fe; Pt++)
                  yn[Pt] > Zt && (Zt = yn[Pt]);
                const Fl = yn[Ot];
                if (Fl > 0 && Zt > 0) {
                  const Pt = Fl / Zt * G, us = ie - Pt;
                  y >= us && (j = "volumeProfile");
                }
              }
            }
          }
        }
        if (!j && r.customIndicators) {
          const Fe = (G) => isNaN(G) || !isFinite(G) ? !1 : Math.abs(f - (A - (G - w.min) / w.range * A)) < 14;
          for (const G of r.customIndicators) {
            const Re = G.data;
            if (!(!G.enabled || G.display !== "overlay" || !Re) && x >= 0 && x < Re.length && Fe(Re[x])) {
              const Ue = G.scriptId;
              j = typeof G.expression == "string" && G.expression.startsWith("brue:") && Ue ? `script-${Ue}` : `ci-${G.id}`;
              break;
            }
          }
        }
        if (!j) {
          const J = tn.current, Fe = [];
          if (r.rsi?.enabled && s.rsi) {
            const G = J.rsi;
            Fe.push({ key: "sp-rsi", check: () => {
              if (!G || f < G.top || f > G.bottom || x < 0 || x >= s.rsi.length) return !1;
              const Re = s.rsi[x];
              if (isNaN(Re) || !isFinite(Re)) return !1;
              const Ue = G.bottom - G.top;
              return Math.abs(f - (G.top + Ue - Re / 100 * Ue)) < V;
            } });
          }
          if (r.macd?.enabled && s.macd) {
            const G = J.macd;
            Fe.push({ key: "sp-macd", check: () => !(!G || f < G.top || f > G.bottom) });
          }
          if (r.stochastic?.enabled && s.stochastic) {
            const G = J.stochastic;
            Fe.push({ key: "sp-stochastic", check: () => {
              if (!G || f < G.top || f > G.bottom || x < 0 || x >= s.stochastic.k.length) return !1;
              const Re = G.bottom - G.top, Ue = G.top + Re - s.stochastic.k[x] / 100 * Re, Oe = G.top + Re - s.stochastic.d[x] / 100 * Re;
              return Math.abs(f - Ue) < V || Math.abs(f - Oe) < V;
            } });
          }
          if (r.atr?.enabled && s.atr) {
            const G = J.atr;
            Fe.push({ key: "sp-atr", check: () => !(!G || f < G.top || f > G.bottom) });
          }
          for (const G of Fe)
            if (G.check()) {
              j = G.key;
              break;
            }
        }
        const Be = Ss.current;
        if (Ss.current = j, j !== Be && Ge.current) {
          const J = Cn.current !== "standard" ? "none" : "crosshair";
          Ge.current.style.cursor = j ? "pointer" : J;
        }
      } else if (Ss.current && (Ss.current = null, Ge.current && !or.current)) {
        const X = Cn.current !== "standard" ? "none" : "crosshair";
        Ge.current.style.cursor = X;
      }
    }
    const O = un.current, H = xe.height;
    if (O > 0 && Ge.current) {
      if (f > O && f < H - 30)
        Ge.current.style.cursor = "pointer";
      else if (f <= O && !Ss.current && !or.current) {
        const w = Cn.current !== "standard" ? "none" : "crosshair";
        Ge.current.style.cursor = w;
      }
    }
    let U = !1;
    for (const w of Fn.current) {
      const A = y - w.x, X = f - w.y;
      if (Math.sqrt(A * A + X * X) < 16) {
        gs.current = w, U = !0, Ge.current && (Ge.current.style.cursor = "pointer");
        break;
      }
    }
    if (U || (gs.current = null), at.current) {
      const w = cn.current, A = un.current;
      if (w && w.range > 0 && A > 0) {
        const X = w.max - f / A * w.range;
        at.current === "sl" ? Ze.current = X : Qe.current = X, Ge.current && (Ge.current.style.cursor = io), gn.current === null && (gn.current = requestAnimationFrame(() => {
          lt(!1), gn.current = null;
        }));
        return;
      }
    }
    if (ze && ze.length > 0) {
      const w = cn.current, A = un.current;
      if (w && w.range > 0 && A > 0) {
        let X = !1;
        for (const u of ze) {
          const N = (w.max - u.price) / w.range * A;
          if (y <= 160 && Math.abs(f - N) < 12) {
            X = !0;
            break;
          }
          if (u.id === Ye.current) {
            const V = Math.min(N + 10, A - 22 - 4), d = xe.width - Ve, j = 144 + 5 * 2, ie = (d - j) / 2;
            if (y >= ie - 8 && y <= ie + j + 8 && f >= V - 8 && f <= V + 22 + 8) {
              X = !0;
              break;
            }
          }
        }
        X && Ge.current && (Ge.current.style.cursor = "pointer");
      }
    }
    if (Ye.current && ze && ze.length > 0) {
      const w = cn.current, A = un.current;
      if (w && w.range > 0 && A > 0) {
        const X = w.max - f / A * w.range, u = w.range * 0.012, N = ze.find((x) => x.id === Ye.current);
        if (N) {
          const x = N.side === "buy", V = ts(N.price), d = Ze.current ?? N.stopLoss ?? (x ? N.price - V : N.price + V), j = Qe.current ?? N.takeProfit ?? (x ? N.price + V : N.price - V), ie = Math.abs(X - d) < u, Be = Math.abs(X - j) < u;
          if (ie || Be)
            Ge.current && (Ge.current.style.cursor = Js), Yn.current = ie ? "sl" : "tp", lt(!1);
          else if (Yn.current && (Yn.current = null, lt(!1)), Ge.current) {
            const J = Cn.current !== "standard" ? "none" : "crosshair";
            Ge.current.style.cursor !== J && (Ge.current.style.cursor = J);
          }
        }
      }
    }
    if (Tn) {
      if (a.buttons === 0) {
        On(!1), Wt(!1);
        return;
      }
      Wt(!0);
      const w = y - fn.x, A = f - fn.y, X = de.candleWidth * (1 + He), u = w / X, N = Math.max(
        0,
        Math.min(l.length - 10, fn.startIndex - u)
      );
      if (je.current = {
        startIndex: N,
        candleWidth: de.candleWidth
      }, os && Et !== null) {
        const x = Et / vn.current / (xe.height - gt), V = A * x;
        Kn.current = fn.priceOffset + V;
      }
      pn.current === null && (pn.current = requestAnimationFrame(() => {
        lt(!0), Ft(), wt(), pn.current = null;
      })), Tt.current && clearTimeout(Tt.current), Tt.current = setTimeout(() => {
        const x = je.current;
        Bt((V) => ({
          ...V,
          startIndex: x.startIndex,
          // Keep float precision - no rounding
          autoFollowLatest: !1
        })), os && De(Kn.current), Wt(!1);
      }, 100);
      return;
    }
    const _ = Rn(), g = ll(y, _.startIndex);
    g >= 0 && g < l.length ? ct.current = g : ct.current = null, Ft();
  }, [Tn, fn, de.candleWidth, l.length, os, Et, Le, xe.height, Ft, Mn, Rn, ll, l]), Ca = o.useCallback((a) => {
    const p = Ge.current;
    if (!p) return;
    const b = p.getBoundingClientRect(), y = a.clientX - b.left, f = a.clientY - b.top;
    let e = !1;
    for (const _ of Fn.current) {
      const g = y - _.x, w = f - _.y;
      if (Math.sqrt(g * g + w * w) < 16) {
        e = !0, In.current && In.current.ts === _.ts && In.current.x === _.x ? In.current = null : In.current = _, an.current && an.current();
        return;
      }
    }
    if (In.current && !e && (In.current = null, an.current && an.current()), Gn && r) {
      const _ = [
        { key: "bollinger", title: "BB", enabledCheck: () => !!(r?.bollinger?.enabled && s?.bollinger), endXSource: () => po },
        { key: "movingAverages", title: "MA", enabledCheck: () => !!(r?.movingAverages?.enabled && s?.movingAverages), endXSource: () => xo },
        { key: "vwap", title: "VWAP", enabledCheck: () => !!(r?.vwap?.enabled && s?.vwap), endXSource: () => mo },
        { key: "ichimoku", title: "Ichimoku", enabledCheck: () => !!(r?.ichimoku?.enabled && s?.ichimoku), endXSource: () => it.ichimoku || 0 },
        { key: "keltner", title: "Keltner", enabledCheck: () => !!(r?.keltner?.enabled && s?.keltner), endXSource: () => it.keltner || 0 },
        { key: "volumeProfile", title: "Vol Profile", enabledCheck: () => !!r?.volumeProfile?.enabled, endXSource: () => bo },
        { key: "volume", title: "Volume", enabledCheck: () => !!(r?.volume?.enabled && l.some((w) => w.volume)), endXSource: () => go },
        { key: "supertrend", title: "Supertrend", enabledCheck: () => !!(r?.supertrend?.enabled && s?.supertrend), endXSource: () => it.supertrend || 0 },
        { key: "donchian", title: "Donchian", enabledCheck: () => !!(r?.donchian?.enabled && s?.donchian), endXSource: () => it.donchian || 0 },
        { key: "envelopes", title: "Envelopes", enabledCheck: () => !!(r?.envelopes?.enabled && s?.envelopes), endXSource: () => it.envelopes || 0 },
        // Phase 2 overlays
        { key: "alma", title: "ALMA", enabledCheck: () => !!(r?.alma?.enabled && s?.alma), endXSource: () => it.alma || 0 },
        { key: "kama", title: "KAMA", enabledCheck: () => !!(r?.kama?.enabled && s?.kama), endXSource: () => it.kama || 0 },
        { key: "zlema", title: "ZLEMA", enabledCheck: () => !!(r?.zlema?.enabled && s?.zlema), endXSource: () => it.zlema || 0 },
        { key: "t3", title: "T3", enabledCheck: () => !!(r?.t3?.enabled && s?.t3), endXSource: () => it.t3 || 0 },
        { key: "lsma", title: "LSMA", enabledCheck: () => !!(r?.lsma?.enabled && s?.lsma), endXSource: () => it.lsma || 0 },
        { key: "mcginley", title: "McGinley", enabledCheck: () => !!(r?.mcginley?.enabled && s?.mcginley), endXSource: () => it.mcginley || 0 },
        { key: "wma", title: "WMA", enabledCheck: () => !!(r?.wma?.enabled && s?.wma), endXSource: () => it.wma || 0 },
        { key: "smmaOverlay", title: "SMMA", enabledCheck: () => !!(r?.smmaOverlay?.enabled && s?.smmaOverlay), endXSource: () => it.smmaOverlay || 0 },
        { key: "vwma", title: "VWMA", enabledCheck: () => !!(r?.vwma?.enabled && s?.vwma), endXSource: () => it.vwma || 0 },
        { key: "medianPrice", title: "Median", enabledCheck: () => !!(r?.medianPrice?.enabled && s?.medianPrice), endXSource: () => it.medianPrice || 0 },
        { key: "typicalPrice", title: "Typical", enabledCheck: () => !!(r?.typicalPrice?.enabled && s?.typicalPrice), endXSource: () => it.typicalPrice || 0 },
        { key: "weightedClose", title: "WClose", enabledCheck: () => !!(r?.weightedClose?.enabled && s?.weightedClose), endXSource: () => it.weightedClose || 0 },
        { key: "zigzag", title: "ZigZag", enabledCheck: () => !!(r?.zigzag?.enabled && s?.zigzag), endXSource: () => it.zigzag || 0 },
        { key: "alligator", title: "Alligator", enabledCheck: () => !!(r?.alligator?.enabled && s?.alligator), endXSource: () => it.alligator || 0 },
        { key: "priceChannel", title: "Price Ch", enabledCheck: () => !!(r?.priceChannel?.enabled && s?.priceChannel), endXSource: () => it.priceChannel || 0 },
        { key: "chandeKroll", title: "Chande Kroll", enabledCheck: () => !!(r?.chandeKroll?.enabled && s?.chandeKroll), endXSource: () => it.chandeKroll || 0 },
        { key: "chandelierExit", title: "Chandelier", enabledCheck: () => !!(r?.chandelierExit?.enabled && s?.chandelierExit), endXSource: () => it.chandelierExit || 0 },
        { key: "accBands", title: "Acc Bands", enabledCheck: () => !!(r?.accBands?.enabled && s?.accBands), endXSource: () => it.accBands || 0 },
        { key: "demarkPivots", title: "DeMark", enabledCheck: () => !!(r?.demarkPivots?.enabled && s?.demarkPivots), endXSource: () => it.demarkPivots || 0 },
        { key: "fractals", title: "Fractals", enabledCheck: () => !!(r?.fractals?.enabled && s?.fractals), endXSource: () => it.fractals || 0 }
      ];
      let g = 28;
      for (const w of _) {
        if (!w.enabledCheck()) continue;
        const A = xe.width < 500 ? 14 : 19, X = w.endXSource();
        if (w.key === "movingAverages" && s?.movingAverages?.length > 0) {
          const N = r.movingAverages?.lines ?? [], x = r?.customBrueScripts || {};
          let V = 0;
          for (let d = 0; d < s.movingAverages.length; d++) {
            const j = N[d]?.sourceScriptId;
            if (j && x[j]?.enabled) continue;
            const ie = g + V * A - 10, Be = ie + A;
            if (X > 0 && y >= 0 && y <= X && f >= ie && f <= Be) {
              const J = `movingAverages__${d}`;
              pe((Fe) => Fe === J ? null : J), ke(J);
              return;
            }
            V++;
          }
          g += V * A;
          continue;
        }
        const u = A;
        if (X > 0 && y >= 0 && y <= X && f >= g - 10 && f <= g - 10 + u) {
          pe((N) => N === w.key ? null : w.key), ke(w.key);
          return;
        }
        g += u;
      }
    }
    if (r && s) {
      const _ = cn.current, g = un.current;
      if (_ && g > 0) {
        const w = je.current, A = w.candleWidth * (1 + He);
        xe.width - Ve;
        const u = Math.max(0, Math.floor(w.startIndex)) + Math.round(y / A), N = 8, x = (d) => {
          if (isNaN(d) || !isFinite(d)) return !1;
          const j = g - (d - _.min) / _.range * g;
          return Math.abs(f - j) < N;
        };
        if (r.movingAverages?.enabled && s.movingAverages)
          for (let d = 0; d < s.movingAverages.length; d++) {
            const j = s.movingAverages[d];
            if (u >= 0 && u < j.data.length && x(j.data[u])) {
              const ie = `movingAverages__${d}`;
              pe((Be) => Be === ie ? null : ie), ke(ie);
              return;
            }
          }
        if (r.bollinger?.enabled && s.bollinger) {
          const d = s.bollinger;
          if (u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.middle[u]) || x(d.lower[u]))) {
            pe((j) => j === "bollinger" ? null : "bollinger"), ke("bollinger");
            return;
          }
        }
        if (r.vwap?.enabled && s.vwap && u >= 0 && u < s.vwap.length && x(s.vwap[u])) {
          pe((d) => d === "vwap" ? null : "vwap"), ke("vwap");
          return;
        }
        if (r.supertrend?.enabled && s.supertrend && u >= 0 && u < s.supertrend.length) {
          const d = s.supertrend[u];
          if (d && x(d.value)) {
            pe((j) => j === "supertrend" ? null : "supertrend"), ke("supertrend");
            return;
          }
        }
        if (r.ichimoku?.enabled && s.ichimoku) {
          const d = s.ichimoku;
          if (u >= 0 && u < d.tenkan.length && (x(d.tenkan[u]) || x(d.kijun[u]) || x(d.senkouA[u]) || x(d.senkouB[u]))) {
            pe((j) => j === "ichimoku" ? null : "ichimoku"), ke("ichimoku");
            return;
          }
        }
        if (r.keltner?.enabled && s.keltner) {
          const d = s.keltner;
          if (u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.middle[u]) || x(d.lower[u]))) {
            pe((j) => j === "keltner" ? null : "keltner"), ke("keltner");
            return;
          }
        }
        if (r.donchian?.enabled && s.donchian) {
          const d = s.donchian;
          if (u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.middle[u]) || x(d.lower[u]))) {
            pe((j) => j === "donchian" ? null : "donchian"), ke("donchian");
            return;
          }
        }
        if (r.envelopes?.enabled && s.envelopes) {
          const d = s.envelopes;
          if (u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.basis[u]) || x(d.lower[u]))) {
            pe((j) => j === "envelopes" ? null : "envelopes"), ke("envelopes");
            return;
          }
        }
        const V = ["dema", "tema", "hma"];
        for (const d of V)
          if (r[d]?.enabled && s[d]) {
            const j = s[d];
            if (Array.isArray(j) && u >= 0 && u < j.length && x(j[u])) {
              pe((ie) => ie === d ? null : d), ke(d);
              return;
            }
          }
      }
    }
    if (r?.volume?.enabled) {
      const _ = un.current;
      if (_ > 0 && f >= _ * 0.8 && f <= _) {
        pe((g) => g === "volume" ? null : "volume"), ke("volume");
        return;
      }
    }
    if (Ss.current === "volumeProfile") {
      pe((_) => _ === "volumeProfile" ? null : "volumeProfile"), ke("volumeProfile");
      return;
    }
    const O = Ss.current;
    if (O && (O.startsWith("ci-") || O.startsWith("script-"))) {
      pe((_) => _ === O ? null : O), ke(O);
      return;
    }
    const H = tn.current, U = [
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
    for (const _ of U) {
      const g = H[_];
      if (g && f >= g.top && f <= g.top + 25 && y <= 200) {
        const w = `sp-${_}`;
        pe((A) => A === w ? null : w), ke(w);
        return;
      }
    }
    if (r && s) {
      const _ = je.current, g = _.candleWidth * (1 + He), w = Math.max(0, Math.floor(_.startIndex)), A = w + Math.round(y / g), X = 10, u = (x, V) => {
        if (!V) return !1;
        const d = H[x];
        if (!d || f < d.top || f > d.bottom || A < 0 || A >= V.length) return !1;
        const j = V[A];
        if (isNaN(j) || !isFinite(j)) return !1;
        const ie = d.bottom - d.top, Be = d.top + ie - j / 100 * ie;
        return Math.abs(f - Be) < X;
      }, N = (x, V) => {
        const d = H[x];
        if (!d || f < d.top || f > d.bottom) return !1;
        const j = d.bottom - d.top;
        let ie = 1 / 0, Be = -1 / 0;
        const J = xe.width - Ve, Fe = Math.floor(J / g), G = Math.max(0, w), Re = Math.min(G + Fe, V[0]?.length ?? 0);
        for (const Pe of V)
          if (Pe)
            for (let et = G; et < Re; et++) {
              const Xe = Pe[et];
              !isNaN(Xe) && isFinite(Xe) && (Xe < ie && (ie = Xe), Xe > Be && (Be = Xe));
            }
        if (ie >= Be) return !1;
        const Oe = (Be - ie) * 0.1;
        ie -= Oe, Be += Oe;
        const ue = Be - ie;
        if (A < 0) return !1;
        for (const Pe of V) {
          if (!Pe || A >= Pe.length) continue;
          const et = Pe[A];
          if (isNaN(et) || !isFinite(et)) continue;
          const Xe = d.top + j - (et - ie) / ue * j;
          if (Math.abs(f - Xe) < X) return !0;
        }
        return !1;
      };
      if (r.rsi?.enabled && u("rsi", s.rsi)) {
        pe((x) => x === "sp-rsi" ? null : "sp-rsi"), ke("sp-rsi");
        return;
      }
      if (r.stochastic?.enabled && s.stochastic && (u("stochastic", s.stochastic.k) || u("stochastic", s.stochastic.d))) {
        pe((x) => x === "sp-stochastic" ? null : "sp-stochastic"), ke("sp-stochastic");
        return;
      }
      if (r.macd?.enabled && s.macd && N("macd", [s.macd.macd, s.macd.signal])) {
        pe((x) => x === "sp-macd" ? null : "sp-macd"), ke("sp-macd");
        return;
      }
      if (r.atr?.enabled && s.atr && N("atr", [s.atr])) {
        pe((x) => x === "sp-atr" ? null : "sp-atr"), ke("sp-atr");
        return;
      }
      if (r.williamsR?.enabled && s.williamsR) {
        const x = H.williamsR;
        if (x && f >= x.top && f <= x.bottom && A >= 0 && A < s.williamsR.length) {
          const V = s.williamsR[A];
          if (!isNaN(V) && isFinite(V)) {
            const d = x.bottom - x.top, j = x.top + d - (V + 100) / 100 * d;
            if (Math.abs(f - j) < X) {
              pe((ie) => ie === "sp-williamsR" ? null : "sp-williamsR"), ke("sp-williamsR");
              return;
            }
          }
        }
      }
      if (r.cci?.enabled && s.cci && N("cci", [s.cci])) {
        pe((x) => x === "sp-cci" ? null : "sp-cci"), ke("sp-cci");
        return;
      }
      if (r.adx?.enabled && s.adx && (u("adx", s.adx.adx) || u("adx", s.adx.plusDI) || u("adx", s.adx.minusDI))) {
        pe((x) => x === "sp-adx" ? null : "sp-adx"), ke("sp-adx");
        return;
      }
      if (r.roc?.enabled && s.roc && N("roc", [s.roc])) {
        pe((x) => x === "sp-roc" ? null : "sp-roc"), ke("sp-roc");
        return;
      }
      if (r.aroon?.enabled && s.aroon && (u("aroon", s.aroon.up) || u("aroon", s.aroon.down))) {
        pe((x) => x === "sp-aroon" ? null : "sp-aroon"), ke("sp-aroon");
        return;
      }
      if (r.tsi?.enabled && s.tsi && N("tsi", [s.tsi.tsi, s.tsi.signal])) {
        pe((x) => x === "sp-tsi" ? null : "sp-tsi"), ke("sp-tsi");
        return;
      }
      if (r.trix?.enabled && s.trix && N("trix", [s.trix.trix, s.trix.signal])) {
        pe((x) => x === "sp-trix" ? null : "sp-trix"), ke("sp-trix");
        return;
      }
      if (r.kst?.enabled && s.kst && N("kst", [s.kst.kst, s.kst.signal])) {
        pe((x) => x === "sp-kst" ? null : "sp-kst"), ke("sp-kst");
        return;
      }
      if (r.stochRsi?.enabled && s.stochRsi && (u("stochRsi", s.stochRsi.k) || u("stochRsi", s.stochRsi.d))) {
        pe((x) => x === "sp-stochRsi" ? null : "sp-stochRsi"), ke("sp-stochRsi");
        return;
      }
      for (const x of U) {
        const V = H[x];
        if (V && f >= V.top && f <= V.bottom) {
          const d = s[x];
          if (d && Array.isArray(d) && N(x, [d])) {
            const j = `sp-${x}`;
            pe((ie) => ie === j ? null : j), ke(j);
            return;
          }
        }
      }
    }
    if (tl && _s(null), St && pe(null), jn && bt(null), ze && ze.length > 0 && Date.now() - Cl.current > 500) {
      const _ = cn.current, g = un.current;
      if (_ && _.range > 0 && g > 0) {
        const w = _.max - f / g * _.range, A = _.range * 6e-3;
        if (Ye.current) {
          const u = ze.find((N) => N.id === Ye.current);
          if (u) {
            const N = (_.max - u.price) / _.range * g, x = 22, V = Math.min(N + 10, g - x - 4), d = 5, j = 45, ie = 55, Be = 44, J = xe.width - Ve, Fe = j + ie + Be + d * 2, Re = (J - Fe) / 2, Ue = Re + j + d, Oe = Ue + ie + d, ue = 8;
            if (y >= Re - ue && y <= Re + j + ue && f >= V - ue && f <= V + x + ue) {
              if (Yt) {
                const Pe = u.side === "buy", et = ts(u.price), Xe = Ze.current ?? u.stopLoss ?? (Pe ? u.price - et : u.price + et), Ot = Qe.current ?? u.takeProfit ?? (Pe ? u.price + et : u.price - et);
                Yt(Ye.current, Xe, Ot);
              }
              Ye.current = null, Ze.current = null, Qe.current = null, at.current = null, Ut((Pe) => Pe + 1), lt(!1);
              return;
            }
            if (y >= Ue - ue && y <= Ue + ie + ue && f >= V - ue && f <= V + x + ue) {
              Ye.current = null, Ze.current = null, Qe.current = null, at.current = null, Ut((Pe) => Pe + 1), lt(!1);
              return;
            }
            if (y >= Oe - ue && y <= Oe + Be + ue && f >= V - ue && f <= V + x + ue) {
              en && en(Ye.current), Ye.current = null, Ze.current = null, Qe.current = null, at.current = null, Ut((Pe) => Pe + 1), lt(!1);
              return;
            }
          }
        }
        if (Ye.current) {
          const u = ze.find((N) => N.id === Ye.current);
          if (u) {
            const N = u.side === "buy", x = ts(u.price), V = Ze.current ?? u.stopLoss ?? (N ? u.price - x : u.price + x), d = Qe.current ?? u.takeProfit ?? (N ? u.price + x : u.price - x);
            if (Math.abs(w - V) < A) {
              at.current = "sl", Ze.current = V;
              return;
            }
            if (Math.abs(w - d) < A) {
              at.current = "tp", Qe.current = d;
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
          if (Ye.current === X)
            Ye.current = null, Ze.current = null, Qe.current = null;
          else {
            Ye.current = X;
            const u = ze.find((N) => N.id === X);
            Ze.current = u?.stopLoss ?? null, Qe.current = u?.takeProfit ?? null;
          }
          at.current = null, Ut((u) => u + 1), lt(!1);
          return;
        }
      }
    }
    On(!0), jl({ x: y, y: f, startIndex: de.startIndex, priceOffset: jt });
  }, [de.startIndex, jt, tl, St, jn, ze, Yt, en, ln]), So = o.useCallback(() => {
    if (at.current && Ye.current) {
      at.current = null, Ge.current && (Ge.current.style.cursor = Cn.current !== "standard" ? "none" : "crosshair"), lt(!1);
      return;
    }
    if (It.current) {
      Wt(!1);
      const a = je.current;
      if (lt(!1), fe) {
        const p = xe.width - Ve, b = de.candleWidth * (1 + He), y = Math.floor(p / b), f = a.startIndex + y, e = l.length - 1 < f;
        Bn.current = !e;
      }
      Bt((p) => ({
        ...p,
        startIndex: a.startIndex,
        // Keep float precision - no rounding
        autoFollowLatest: !1
      }));
    }
    pn.current !== null && (cancelAnimationFrame(pn.current), pn.current = null), On(!1);
  }, [Yt, en]);
  o.useEffect(() => {
    if (!Tn) return;
    const a = () => {
      So();
    };
    return window.addEventListener("mouseup", a), () => {
      window.removeEventListener("mouseup", a);
    };
  }, [Tn, So]), o.useEffect(() => {
    const a = (p) => {
      Ye.current && (p.key === "Enter" ? (p.preventDefault(), Yt && Yt(Ye.current, Ze.current ?? void 0, Qe.current ?? void 0), Ye.current = null, Ze.current = null, Qe.current = null, at.current = null, Ut((b) => b + 1), lt(!1)) : (p.key === "Escape" || p.key === "Backspace") && (p.preventDefault(), Ye.current = null, Ze.current = null, Qe.current = null, at.current = null, Ut((b) => b + 1), lt(!1)));
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [Yt, en]), o.useEffect(() => {
    const a = (p) => {
      if (!St || !r || !we) return;
      const b = p.target?.tagName;
      if (!(b === "INPUT" || b === "TEXTAREA" || b === "SELECT"))
        if (p.key === "Backspace" || p.key === "Delete") {
          p.preventDefault();
          const y = St.startsWith("sp-") ? St.replace("sp-", "") : St.startsWith("movingAverages__") ? "movingAverages" : St, f = r[y];
          f && we({ ...r, [y]: { ...f, enabled: !1 } }), pe(null);
        } else p.key === "Escape" && pe(null);
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [St, r, we]);
  const Ia = o.useCallback(() => {
    mt.current && clearTimeout(mt.current), mt.current = setTimeout(() => {
      if (nn.current) return;
      Kt.current = null, ct.current = null, gs.current = null;
      const a = Ge.current, p = a?.getContext("2d");
      p && a && p.clearRect(0, 0, a.width, a.height), an.current && an.current(), as(), On(!1), uo(!1), ne && ne(null, null);
    }, 50);
  }, [ne, as]);
  o.useEffect(() => {
    if (!ws && !er) return;
    const a = (y) => {
      const e = (Qs.current.y - y.clientY) / 150, O = Math.max(0.1, Math.min(10, Qs.current.scale + e));
      vn.current = O, lt(!0), wt(), qn.current && clearTimeout(qn.current), qn.current = setTimeout(() => {
        Mt(vn.current);
      }, 100);
    }, p = () => {
      uo(!1), ea(!1), Mt(vn.current), wt();
    }, b = (y) => {
      if (y.touches.length !== 1) return;
      y.preventDefault();
      const e = (Qs.current.y - y.touches[0].clientY) / 150, O = Math.max(0.1, Math.min(10, Qs.current.scale + e));
      vn.current = O, lt(!0), wt(), qn.current && clearTimeout(qn.current), qn.current = setTimeout(() => {
        Mt(vn.current);
      }, 100);
    };
    return window.addEventListener("mousemove", a), window.addEventListener("mouseup", p), window.addEventListener("touchmove", b, { passive: !1 }), window.addEventListener("touchend", p), window.addEventListener("touchcancel", p), () => {
      window.removeEventListener("mousemove", a), window.removeEventListener("mouseup", p), window.removeEventListener("touchmove", b), window.removeEventListener("touchend", p), window.removeEventListener("touchcancel", p);
    };
  }, [ws, er, wt]);
  const Ta = o.useCallback((a) => {
    if (a.preventDefault(), a.touches.length === 1) {
      const p = a.touches[0], b = Ge.current;
      if (!b) return;
      const y = b.getBoundingClientRect(), f = p.clientX - y.left, e = p.clientY - y.top;
      if (vs.current = { x: f, y: e }, st.current && (clearTimeout(st.current), st.current = null), Mn) {
        Ws(!1), Kt.current = null;
        const _ = b.getContext("2d");
        _ && _.clearRect(0, 0, b.width, b.height);
      }
      const O = Date.now();
      _n.current = !0, ks.current = O;
      const H = O - ys.current;
      if (ys.current = O, !(H < 300)) {
        const _ = O;
        st.current = setTimeout(() => {
          ks.current === _ && _n.current && (Ws(!0), Kt.current = { x: f, y: e }, qt.current !== null && cancelAnimationFrame(qt.current), qt.current = requestAnimationFrame(() => {
            Ft(), qt.current = null;
          })), st.current = null;
        }, 400);
      }
      if (ze && ze.length > 0) {
        Cl.current = Date.now();
        const _ = cn.current, g = un.current;
        if (_ && _.range > 0 && g > 0) {
          const w = _.max - e / g * _.range, A = _.range * 0.015;
          if (Ye.current) {
            const u = ze.find((N) => N.id === Ye.current);
            if (u) {
              const N = (_.max - u.price) / _.range * g, x = 22, V = Math.min(N + 10, g - x - 4), d = 5, j = xe.width - Ve, ie = 45, Be = 55, J = 44, Fe = ie + Be + J + d * 2, Re = (j - Fe) / 2, Ue = Re + ie + d, Oe = Ue + Be + d, ue = 12;
              if (f >= Re - ue && f <= Re + ie + ue && e >= V - ue && e <= V + x + ue) {
                Yt && Yt(Ye.current, Ze.current ?? void 0, Qe.current ?? void 0), Ye.current = null, Ze.current = null, Qe.current = null, at.current = null, Ut((Pe) => Pe + 1), lt(!1);
                return;
              }
              if (f >= Ue - ue && f <= Ue + Be + ue && e >= V - ue && e <= V + x + ue) {
                Ye.current = null, Ze.current = null, Qe.current = null, at.current = null, Ut((Pe) => Pe + 1), lt(!1);
                return;
              }
              if (f >= Oe - ue && f <= Oe + J + ue && e >= V - ue && e <= V + x + ue) {
                en && en(Ye.current), Ye.current = null, Ze.current = null, Qe.current = null, at.current = null, Ut((Pe) => Pe + 1), lt(!1);
                return;
              }
            }
          }
          if (Ye.current) {
            const u = ze.find((N) => N.id === Ye.current);
            if (u) {
              const N = u.side === "buy", x = ts(u.price), V = Ze.current ?? u.stopLoss ?? (N ? u.price - x : u.price + x), d = Qe.current ?? u.takeProfit ?? (N ? u.price + x : u.price - x);
              if (Math.abs(w - V) < A) {
                at.current = "sl", Ze.current = V, st.current && (clearTimeout(st.current), st.current = null);
                return;
              }
              if (Math.abs(w - d) < A) {
                at.current = "tp", Qe.current = d, st.current && (clearTimeout(st.current), st.current = null);
                return;
              }
            }
          }
          let X = null;
          for (const u of ze) {
            const N = (_.max - u.price) / _.range * g;
            if (f <= 160 && Math.abs(e - N) < 20) {
              X = u.id;
              break;
            }
          }
          if (X) {
            if (Ye.current === X)
              Ye.current = null, Ze.current = null, Qe.current = null;
            else {
              Ye.current = X;
              const u = ze.find((N) => N.id === X);
              Ze.current = u?.stopLoss ?? null, Qe.current = u?.takeProfit ?? null;
            }
            at.current = null, st.current && (clearTimeout(st.current), st.current = null), Ut((u) => u + 1), lt(!1);
            return;
          }
        }
      }
      On(!0), jl({ x: f, y: e, startIndex: de.startIndex, priceOffset: jt });
    }
  }, [de.startIndex, jt, Ft, Mn]), Al = o.useRef(null), pr = o.useCallback((a) => {
    if (a.touches.length === 2) {
      a.preventDefault();
      const p = a.touches[0], b = a.touches[1], y = Math.hypot(
        b.clientX - p.clientX,
        b.clientY - p.clientY
      );
      if (Al.current !== null) {
        const f = je.current.candleWidth, e = je.current.startIndex, H = 1 + (y / Al.current - 1) * 1.3, U = Math.max(
          Ll,
          Math.min(El, f * H)
        ), _ = Ge.current;
        if (_) {
          const g = _.getBoundingClientRect(), w = (p.clientX + b.clientX) / 2 - g.left, A = f * (1 + He), X = U * (1 + He), u = e + w / A, N = Math.max(0, u - w / X);
          je.current = { startIndex: N, candleWidth: U }, lt(!0), wt(), It.current || Wt(!0);
        }
      }
      Al.current = y;
    }
  }, [wt]), Ma = o.useCallback((a) => {
    if (a.touches.length === 2) {
      pr(a), st.current && (clearTimeout(st.current), st.current = null);
      return;
    }
    if (a.touches.length === 1) {
      const p = a.touches[0], b = Ge.current;
      if (!b) return;
      const y = b.getBoundingClientRect(), f = p.clientX - y.left, e = p.clientY - y.top;
      if (st.current && vs.current) {
        const O = Math.abs(f - vs.current.x), H = Math.abs(e - vs.current.y);
        (O > 10 || H > 10) && (clearTimeout(st.current), st.current = null);
      }
      if (Mn && (Kt.current = { x: f, y: e }, qt.current !== null && cancelAnimationFrame(qt.current), qt.current = requestAnimationFrame(() => {
        Ft(), qt.current = null;
      })), at.current) {
        a.preventDefault();
        const O = cn.current, H = un.current;
        if (O && O.range > 0 && H > 0) {
          const U = O.max - e / H * O.range;
          at.current === "sl" ? Ze.current = U : Qe.current = U, gn.current === null && (gn.current = requestAnimationFrame(() => {
            lt(!1), gn.current = null;
          }));
        }
        return;
      }
      if (Tn && !Mn) {
        a.preventDefault(), Wt(!0);
        const O = f - fn.x, H = e - fn.y, U = de.candleWidth * (1 + He), _ = O / U, g = Math.max(
          0,
          Math.min(l.length - 10, fn.startIndex - _)
        );
        if (os && Et !== null) {
          const w = Et / vn.current / (xe.height - gt), A = H * w;
          Kn.current = fn.priceOffset + A;
        }
        je.current = {
          startIndex: g,
          candleWidth: de.candleWidth
        }, $n.current === null && ($n.current = requestAnimationFrame(() => {
          lt(!0), wt(), $n.current = null;
        }));
      }
    }
  }, [Tn, fn, de.candleWidth, l.length, pr, Ft, Mn, os, Et, xe.height, ze]), ja = o.useCallback(() => {
    if (_n.current = !1, ks.current = 0, st.current && (clearTimeout(st.current), st.current = null), at.current && Ye.current) {
      at.current = null, lt(!1), _n.current = !1, ks.current = 0, st.current && (clearTimeout(st.current), st.current = null);
      return;
    }
    if (Mn) {
      Ws(!1), Kt.current = null;
      const a = Ge.current, p = a?.getContext("2d");
      p && a && p.clearRect(0, 0, a.width, a.height), ne && ne(null, null);
    }
    if (It.current) {
      Wt(!1);
      const a = je.current;
      if (lt(!1), fe) {
        const p = xe.width - Ve, b = de.candleWidth * (1 + He), y = Math.floor(p / b), f = a.startIndex + y, e = l.length - 1 < f;
        Bn.current = !e;
      }
      Bt((p) => ({
        ...p,
        startIndex: a.startIndex,
        // Keep float precision - no rounding
        candleWidth: a.candleWidth,
        // Pick up pinch-zoom final width
        autoFollowLatest: !1
      })), os && De(Kn.current);
    }
    On(!1), Al.current = null, vs.current = null, co.current = null, $n.current !== null && (cancelAnimationFrame($n.current), $n.current = null);
  }, [Mn, ne, os]);
  o.useCallback((a) => {
    let p = rs[0], b = Math.abs(a - p);
    for (const y of rs) {
      const f = Math.abs(a - y);
      f < b && (b = f, p = y);
    }
    return p;
  }, [rs]);
  const Co = o.useCallback((a, p) => {
    const b = rs.findIndex((y) => y >= a - 1e-3);
    if (p) {
      const y = Math.min(rs.length - 1, b + 1);
      return rs[y];
    } else {
      const y = Math.max(0, b - 1);
      return rs[y];
    }
  }, [rs]), Io = o.useCallback((a) => {
    const p = a.ctrlKey || a.metaKey;
    if (!yo.current && !p) {
      const x = Math.abs(a.deltaX) > Math.abs(a.deltaY), V = a.shiftKey && a.deltaY !== 0;
      if (x || V) {
        a.preventDefault();
        const d = je.current.startIndex, j = je.current.candleWidth, ie = j * (1 + He);
        Wt(!0);
        const Be = V ? a.deltaY : a.deltaX, J = 0.2 + (nl - 1) * 0.2, Fe = Be * J / ie, G = Math.max(
          0,
          Math.min(l.length - 10, d + Fe)
        );
        je.current = { startIndex: G, candleWidth: j }, Tt.current && clearTimeout(Tt.current), Tt.current = setTimeout(() => {
          if (fe) {
            const Ue = xe.width - Ve, Oe = je.current.candleWidth * (1 + He), ue = Math.floor(Ue / Oe), Pe = je.current.startIndex + ue;
            Bn.current = !(l.length - 1 < Pe);
          }
          const Re = je.current;
          Bt((Ue) => ({
            ...Ue,
            startIndex: Re.startIndex,
            autoFollowLatest: !1
          })), Wt(!1);
        }, 150), Ht.current === null && (Ht.current = requestAnimationFrame(() => {
          lt(!0), Ft(), wt(), Ht.current = null;
        }));
        return;
      }
    }
    a.preventDefault(), Wt(!0);
    const b = Ge.current;
    if (!b) return;
    const y = b.getBoundingClientRect(), f = a.clientX - y.left, e = a.clientY - y.top;
    Kt.current = { x: f, y: e };
    const O = je.current.startIndex, H = je.current.candleWidth, U = H * (1 + He);
    if (Math.abs(a.deltaX) > Math.abs(a.deltaY) || a.shiftKey) {
      const x = a.shiftKey ? a.deltaY : a.deltaX, V = yo.current ? 0.02 + (nl - 1) * 0.02 : 0.2 + (nl - 1) * 0.2, d = x * V / U, j = Math.max(
        0,
        Math.min(l.length - 10, O + d)
      );
      je.current = { startIndex: j, candleWidth: H }, Ht.current === null && (Ht.current = requestAnimationFrame(() => {
        lt(!0), Ft(), wt(), Ht.current = null;
      })), Tt.current && clearTimeout(Tt.current), Tt.current = setTimeout(() => {
        if (fe) {
          const Be = xe.width - Ve, J = je.current.candleWidth * (1 + He), Fe = Math.floor(Be / J), G = je.current.startIndex + Fe;
          Bn.current = !(l.length - 1 < G);
        }
        const ie = je.current;
        Bt((Be) => ({
          ...Be,
          startIndex: ie.startIndex,
          // Keep float precision - no rounding
          autoFollowLatest: !1
        })), Wt(!1);
      }, 150);
      return;
    }
    if (yo.current) {
      Gt.current += a.deltaY, ls.current && clearTimeout(ls.current), ls.current = setTimeout(() => {
        Gt.current = 0;
      }, 200);
      const x = 220 - nl * 20;
      if (Math.abs(Gt.current) < x)
        return;
      const V = Gt.current < 0;
      Gt.current = 0;
      const d = Co(H, V);
      if (d === H) return;
      const j = xe.width - Ve, ie = H * (1 + He), Be = d * (1 + He), J = O + j / ie, Fe = Math.max(0, J - j / Be);
      Wt(!0), je.current = { startIndex: Fe, candleWidth: d }, Ht.current === null && (Ht.current = requestAnimationFrame(() => {
        lt(!0), Ft(), wt(), Ht.current = null;
      })), Tt.current && clearTimeout(Tt.current), Tt.current = setTimeout(() => {
        const G = je.current;
        Bt((Re) => ({
          ...Re,
          candleWidth: G.candleWidth,
          startIndex: G.startIndex,
          // Keep float precision
          autoFollowLatest: !1
        })), Wt(!1);
      }, 100);
      return;
    }
    const _ = a.deltaY < 0, g = Co(H, _);
    if (g === H) return;
    const w = xe.width - Ve, A = H * (1 + He), X = g * (1 + He), u = O + w / A, N = Math.max(0, u - w / X);
    Wt(!0), je.current = { startIndex: N, candleWidth: g }, Ht.current === null && (Ht.current = requestAnimationFrame(() => {
      lt(!0), Ft(), wt(), Ht.current = null;
    })), Tt.current && clearTimeout(Tt.current), Tt.current = setTimeout(() => {
      const x = je.current;
      Bt((V) => ({
        ...V,
        candleWidth: x.candleWidth,
        startIndex: x.startIndex,
        // Keep float precision
        autoFollowLatest: !1
      })), Wt(!1);
    }, 100);
  }, [l.length, Ft, Co, xe.width, xe.height, nl, ut, Rn, n, Cs, de.autoFollowLatest, wt]), xr = o.useRef(Io), mr = o.useRef(wo);
  o.useEffect(() => {
    xr.current = Io;
  }, [Io]), o.useEffect(() => {
    mr.current = wo;
  }, [wo]);
  const Ra = o.useRef(null), cs = o.useRef(null), is = o.useRef(null), Pa = o.useCallback((a) => {
    if (cs.current && (cs.current.el.removeEventListener("wheel", cs.current.fn), cs.current = null), Ge.current = a, a) {
      const p = (b) => xr.current(b);
      a.addEventListener("wheel", p, { passive: !1 }), cs.current = { el: a, fn: p };
    }
  }, []), Na = o.useCallback((a) => {
    if (is.current && (is.current.el.removeEventListener("wheel", is.current.fn), is.current = null), Ra.current = a, a) {
      const p = (b) => mr.current(b);
      a.addEventListener("wheel", p, { passive: !1 }), is.current = { el: a, fn: p };
    }
  }, []);
  o.useEffect(() => () => {
    cs.current && cs.current.el.removeEventListener("wheel", cs.current.fn), is.current && is.current.el.removeEventListener("wheel", is.current.fn);
  }, []), o.useLayoutEffect(() => {
    const a = rt.current;
    if (!a) return;
    const p = a.getBoundingClientRect();
    p.width > 0 && p.height > 0 && Gs({ width: Math.round(p.width), height: Math.round(p.height) });
    const b = new ResizeObserver((y) => {
      for (const f of y) {
        const e = Math.round(f.contentRect.width), O = Math.round(f.contentRect.height);
        e > 0 && O > 0 && Ar.flushSync(() => {
          Gs(
            (H) => H.width === e && H.height === O ? H : { width: e, height: O }
          );
        });
      }
    });
    return b.observe(a), () => b.disconnect();
  }, []), o.useEffect(() => {
    yt && yt.width > 0 && yt.height > 0 && Gs(yt);
  }, [yt]);
  const br = o.useRef(`${h}|${hn}`);
  o.useLayoutEffect(() => {
    const a = `${h}|${hn}`;
    br.current !== a && (br.current = a, !fe && Bt((p) => p.autoFollowLatest ? p : { ...p, autoFollowLatest: !0 }));
  }, [h, hn, fe]), o.useLayoutEffect(() => {
    if (l.length === 0) return;
    if (fe) {
      const e = bs.current, O = xe.width - Ve, H = de.candleWidth * (1 + He), U = Math.floor(O / H), _ = Math.floor(U * 0.9), w = Dn.current <= 300 && xe.width > 300;
      if (Dn.current = xe.width, l.length !== e || e === 0 || w) {
        const A = e > 0 && l.length < e, X = Math.max(0, Math.floor(de.startIndex)), u = Math.min(l.length, X + U), N = l.length - 1 < u;
        if (e === 0 || A || w || N && !Bn.current) {
          const x = Math.max(0, l.length - 1 - _);
          Bt((V) => ({ ...V, startIndex: x, autoFollowLatest: !1 })), A && (Bn.current = !1);
        }
      }
      bs.current = l.length;
      return;
    }
    if (!de.autoFollowLatest) {
      if (de.startIndex > l.length - 1) {
        const e = xe.width - Ve, O = de.candleWidth * (1 + He), H = Math.max(1, Math.floor(e / O));
        Bt((U) => ({ ...U, startIndex: Math.max(0, l.length - H) }));
      }
      return;
    }
    const a = xe.width - Ve, p = de.candleWidth * (1 + He), b = Math.floor(a / p);
    if (l.length > 0 && l.length < b * 0.75) {
      const e = Math.min(
        El,
        a * 0.92 / (l.length * (1 + He))
      );
      if (e > de.candleWidth * 1.05) {
        je.current = { startIndex: 0, candleWidth: e }, Bt((O) => ({ ...O, startIndex: 0, candleWidth: e })), bs.current = l.length;
        return;
      }
    }
    const y = Math.min(de.futureSpace, Math.floor(b * 0.3)), f = Math.max(0, l.length - b + y);
    Bt((e) => ({ ...e, startIndex: f })), bs.current = l.length;
  }, [l.length, xe.width, de.autoFollowLatest, de.candleWidth, de.futureSpace, de.startIndex, fe]), o.useLayoutEffect(() => {
    const a = ps - Tl.current;
    a !== 0 && (Bt((p) => ({
      ...p,
      startIndex: Math.max(0, p.startIndex + a)
    })), je.current.startIndex = Math.max(0, je.current.startIndex + a), An.current.startIndex = Math.max(0, An.current.startIndex + a)), Tl.current = ps;
  }, [ps]), o.useEffect(() => {
    if (W == null) {
      Bs.current = void 0;
      return;
    }
    if (l.length === 0 || Bs.current === W) return;
    Bs.current = W;
    const a = xe.width - Ve, p = de.candleWidth * (1 + He), b = Math.floor(a / p), y = Math.min(W, l.length - 1), f = Math.floor(b * 0.9), e = Math.max(0, y - f);
    Bt((O) => ({ ...O, startIndex: e, autoFollowLatest: !1 }));
  }, [W, l.length, xe.width, de.candleWidth]), o.useEffect(() => {
    !It.current && !kl && as();
  }, [as, kl]);
  const To = o.useRef(0), ol = o.useRef(null);
  o.useEffect(() => {
    if (n == null || It.current) return;
    const a = Date.now(), p = a - To.current;
    return p >= 50 ? (To.current = a, as()) : (ol.current && clearTimeout(ol.current), ol.current = setTimeout(() => {
      To.current = Date.now(), as();
    }, 50 - p)), () => {
      ol.current && clearTimeout(ol.current);
    };
  }, [n, as]), o.useEffect(() => {
    Ft();
  }, [Ft]), o.useEffect(() => {
    Ls.current = oe, oe != null && (Us.current = !0, requestAnimationFrame(() => {
      Ft(), Us.current = !1;
    }));
  }, [oe, Ft]);
  const Dl = o.useRef(/* @__PURE__ */ new Map()), gr = o.useMemo(() => {
    if (It.current && Dl.current.size > 0 && l.length === Dl.current.size)
      return Dl.current;
    const a = /* @__PURE__ */ new Map();
    for (let p = 0; p < l.length; p++)
      a.set(l[p].time, p);
    return Dl.current = a, a;
  }, [l]), Bl = o.useCallback(() => {
    if (!Ae) return;
    const a = Rn();
    Cs(a.candles, de.autoFollowLatest);
    const p = l.length > 0 ? l[l.length - 1] : null, b = l.length >= 2 ? l[l.length - 2] : null, y = p && b ? p.time - b.time : 6e4;
    Ae({
      priceAxisWidth: Ve,
      timeToX: (f) => {
        const e = It.current ? An.current.startIndex : de.startIndex, H = (It.current ? An.current.candleWidth : de.candleWidth) * (1 + He), U = Math.floor(e), _ = (e - U) * H;
        let g = gr.get(f) ?? -1;
        if (g === -1 && l.length > 0) {
          const w = l[0], A = l[l.length - 1];
          if (f > A.time) {
            const X = f - A.time;
            g = l.length - 1 + Math.round(X / y);
          } else if (f < w.time) {
            const X = w.time - f;
            g = -Math.round(X / y);
          } else {
            let X = 0, u = l.length - 1;
            for (; X < u; ) {
              const N = Math.floor((X + u) / 2);
              l[N].time < f ? X = N + 1 : u = N;
            }
            if (X > 0) {
              const N = l[X - 1], x = l[X], V = (f - N.time) / (x.time - N.time);
              return (X - 1 + V - U) * H + H / 2 - _;
            }
            g = X;
          }
        }
        return g === -1 ? null : (g - U) * H + H / 2 - _;
      },
      xToTime: (f) => {
        const e = It.current ? An.current.startIndex : de.startIndex, H = (It.current ? An.current.candleWidth : de.candleWidth) * (1 + He), U = Math.floor(e), _ = (e - U) * H, g = f + _, w = U + (g - H / 2) / H;
        if (w < 0) return null;
        const A = Math.floor(w), X = w - A;
        if (A >= l.length) {
          if (p) {
            const N = w - (l.length - 1);
            return p.time + N * y;
          }
          return null;
        }
        const u = l[A];
        if (!u) return null;
        if (X > 0 && A + 1 < l.length) {
          const N = l[A + 1];
          return u.time + X * (N.time - u.time);
        }
        return u.time + X * y;
      },
      priceToY: (f) => {
        let e = cn.current, O = un.current;
        if (!e || O === 0) {
          const H = xe.width - Ve, U = je.current, _ = U.candleWidth * (1 + He), g = Math.floor(H / _), w = Math.max(0, Math.floor(U.startIndex)), A = Math.min(l.length, w + g), X = l.slice(w, A);
          let u = 1 / 0, N = -1 / 0;
          if (X.length === 0)
            u = 0, N = 100;
          else {
            for (const Oe of X)
              Oe.low < u && (u = Oe.low), Oe.high > N && (N = Oe.high);
            n && (n < u && (u = n), n > N && (N = n));
          }
          const x = N - u, V = x * 0.05, d = (N + u) / 2, j = x + V * 2;
          e = {
            min: d - j / 2,
            max: d + j / 2,
            range: j
          };
          const ie = r?.rsi?.enabled, Be = r?.macd?.enabled, J = r?.atr?.enabled, Fe = r?.stochastic?.enabled;
          r?.volume?.enabled && l.some((Oe) => Oe.volume !== void 0 && Oe.volume > 0);
          const G = (ie ? 1 : 0) + (Be ? 1 : 0) + (J ? 1 : 0) + (Fe ? 1 : 0), Re = xe.height - gt, Ue = G > 0 ? Math.max(60 * G, Re * m) : 0;
          O = Re - Ue;
        }
        if (ut !== null && Et !== null) {
          const H = vn.current, U = Kn.current, _ = Et / H, g = ut + U;
          e = {
            min: g - _ / 2,
            max: g + _ / 2,
            range: _
          };
        }
        return O - (f - e.min) / e.range * O;
      },
      yToPrice: (f) => {
        let e = cn.current, O = un.current;
        if (!e || O === 0) {
          const H = xe.width - Ve, U = je.current, _ = U.candleWidth * (1 + He), g = Math.floor(H / _), w = Math.max(0, Math.floor(U.startIndex)), A = Math.min(l.length, w + g), X = l.slice(w, A);
          let u = 1 / 0, N = -1 / 0;
          if (X.length === 0)
            u = 0, N = 100;
          else {
            for (const Oe of X)
              Oe.low < u && (u = Oe.low), Oe.high > N && (N = Oe.high);
            n && (n < u && (u = n), n > N && (N = n));
          }
          const x = N - u, V = x * 0.05, d = (N + u) / 2, j = x + V * 2;
          e = {
            min: d - j / 2,
            max: d + j / 2,
            range: j
          };
          const ie = r?.rsi?.enabled, Be = r?.macd?.enabled, J = r?.atr?.enabled, Fe = r?.stochastic?.enabled;
          r?.volume?.enabled && l.some((Oe) => Oe.volume !== void 0 && Oe.volume > 0);
          const G = (ie ? 1 : 0) + (Be ? 1 : 0) + (J ? 1 : 0) + (Fe ? 1 : 0), Re = xe.height - gt, Ue = G > 0 ? Math.max(60 * G, Re * m) : 0;
          O = Re - Ue;
        }
        if (ut !== null && Et !== null) {
          const H = vn.current, U = Kn.current, _ = Et / H, g = ut + U;
          e = {
            min: g - _ / 2,
            max: g + _ / 2,
            range: _
          };
        }
        return e.max - f / O * e.range;
      }
    });
  }, [l, de, xe, Ae, r, m, n, ut, Et, gr]);
  o.useEffect(() => {
    Il.current = Bl;
  }, [Bl]), o.useLayoutEffect(() => {
    Bl();
  }, [Bl]);
  const Mo = [
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
  ].filter(Boolean).length + (s?.customIndicators?.filter((a) => a.display === "subplot").length || 0), La = Mo > 0, vr = xe.height - gt, Ea = Mo > 0 ? Math.max(60 * Mo, vr * m) : 0, yr = vr - Ea, kr = o.useCallback((a) => {
    a.preventDefault(), a.stopPropagation(), ye(!0);
    const p = "touches" in a ? a.touches[0].clientY : a.clientY;
    xt.current = { y: p, ratio: m };
  }, [m]);
  o.useEffect(() => {
    if (!ae) return;
    const a = (b) => {
      const y = "touches" in b ? b.touches[0].clientY : b.clientY, e = (xt.current.y - y) / (xe.height - gt), O = Math.max(0.1, Math.min(0.6, xt.current.ratio + e));
      ce(O);
    }, p = () => {
      ye(!1);
    };
    return window.addEventListener("mousemove", a), window.addEventListener("mouseup", p), window.addEventListener("touchmove", a), window.addEventListener("touchend", p), () => {
      window.removeEventListener("mousemove", a), window.removeEventListener("mouseup", p), window.removeEventListener("touchmove", a), window.removeEventListener("touchend", p);
    };
  }, [ae, xe.height]);
  const Wl = (a) => {
    const { kind: p, label: b, menuKey: y, engineLabel: f, ciId: e, sid: O, remove: H } = a, U = "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground transition-colors", _ = () => {
      p !== "formula" || !e || !we || (we({
        ...r,
        customIndicators: (r.customIndicators || []).map((A) => A.id === e ? { ...A, enabled: !1 } : A)
      }), ke(null), pe(null));
    }, g = (A) => {
      A.stopPropagation(), bt({
        visible: !0,
        x: A.clientX,
        y: A.clientY,
        key: y,
        title: b,
        custom: p === "engine" ? { kind: p, label: f || b } : p === "formula" ? { kind: p, ciId: e } : { kind: p, sid: O }
      });
    }, w = p === "engine" && !!nt && !!f || p === "formula" && !!Sn;
    return /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
      p === "formula" && /* @__PURE__ */ t.jsx("button", { onClick: (A) => {
        A.stopPropagation(), _();
      }, className: `${U} hover:text-foreground`, title: `Hide ${b}`, children: /* @__PURE__ */ t.jsx(Ul, { className: "w-[15px] h-[15px]" }) }),
      w && /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: (A) => {
            A.stopPropagation(), p === "engine" ? nt?.(f) : Sn?.();
          },
          className: `${U} hover:text-foreground`,
          title: `${b} Settings`,
          children: /* @__PURE__ */ t.jsx(Kl, { className: "w-[15px] h-[15px]" })
        }
      ),
      /* @__PURE__ */ t.jsx("button", { onClick: (A) => {
        A.stopPropagation(), H();
      }, className: `${U} hover:text-destructive`, title: `Remove ${b}`, children: /* @__PURE__ */ t.jsx(ql, { className: "w-[15px] h-[15px]" }) }),
      /* @__PURE__ */ t.jsx("button", { onClick: g, className: `${U} hover:text-foreground`, title: "More options", children: /* @__PURE__ */ t.jsx(Gl, { className: "w-[15px] h-[15px]" }) })
    ] });
  };
  return /* @__PURE__ */ t.jsxs(
    "div",
    {
      ref: rt,
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
            ref: wl,
            width: xe.width * bn,
            height: xe.height * bn,
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
            width: xe.width * bn,
            height: xe.height * bn,
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
            onMouseUp: So,
            onMouseLeave: Ia,
            onTouchStart: Ta,
            onTouchMove: Ma,
            onTouchEnd: ja,
            onContextMenu: (a) => {
              if (!r || !s) return;
              const p = Ge.current;
              if (!p) return;
              const b = p.getBoundingClientRect(), y = a.clientX - b.left, f = a.clientY - b.top, e = tn.current, O = (d) => !!d && f >= d.top && f <= d.bottom, H = r?.customBrueScripts || {}, U = (d, j) => {
                pe(`script-${d}`), bt({
                  visible: !0,
                  x: a.clientX,
                  y: a.clientY,
                  key: `script_${d}`,
                  title: H[d]?.name || j,
                  custom: { kind: "brue", sid: d }
                });
              };
              for (const d of Wr()) {
                const j = r[d];
                if (!j?.enabled || !s?.[d] || !O(e[d])) continue;
                a.preventDefault(), a.stopPropagation();
                const ie = j.sourceScriptId;
                if (ie && H[ie]?.enabled) {
                  U(ie, Yl(d));
                  return;
                }
                pe(`sp-${d}`), bt({
                  visible: !0,
                  x: a.clientX,
                  y: a.clientY,
                  key: d,
                  title: Yl(d)
                });
                return;
              }
              for (const d of r.customIndicators || []) {
                if (!d.enabled || d.display !== "subplot" || !O(e[`custom_${d.id}`])) continue;
                a.preventDefault(), a.stopPropagation();
                const j = typeof d.expression == "string" ? d.expression : "";
                if (j.startsWith("brue:") && d.scriptId)
                  U(d.scriptId, d.name || "Brue script");
                else if (j.startsWith("local:")) {
                  const ie = d.group || j.split(":")[1] || d.name;
                  pe(`ci-${d.id}`), bt({
                    visible: !0,
                    x: a.clientX,
                    y: a.clientY,
                    key: `custom_${d.id}`,
                    title: ie || "Indicator",
                    custom: { kind: "engine", label: ie }
                  });
                } else
                  pe(`ci-${d.id}`), bt({
                    visible: !0,
                    x: a.clientX,
                    y: a.clientY,
                    key: `custom_${d.id}`,
                    title: d.name || "Custom indicator",
                    custom: { kind: "formula", ciId: d.id }
                  });
                return;
              }
              const _ = cn.current, g = un.current;
              if (!_ || g <= 0) return;
              const w = je.current, A = w.candleWidth * (1 + He), u = Math.max(0, Math.floor(w.startIndex)) + Math.round(y / A), N = 8, x = (d) => {
                if (isNaN(d) || !isFinite(d)) return !1;
                const j = g - (d - _.min) / _.range * g;
                return Math.abs(f - j) < N;
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
                  a.preventDefault(), a.stopPropagation(), pe(d.key), bt({ visible: !0, x: a.clientX, y: a.clientY, key: d.key, title: d.title });
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
              left: Gn ? (tr || 295) + 6 : 6,
              pointerEvents: "auto"
            },
            onMouseEnter: () => {
              fo.current = !0;
            },
            onMouseLeave: () => {
              fo.current = !1;
            },
            children: [
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: () => {
                    ta(!Gn);
                  },
                  className: "flex items-center justify-center w-4 h-4 rounded transition-all duration-200",
                  style: { background: "rgba(128, 128, 128, 0.3)" },
                  title: Gn ? "Hide OHLC" : "Show OHLC",
                  children: Gn ? /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", className: "w-2.5 h-2.5", fill: "none", stroke: "#9ca3af", strokeWidth: "3", strokeLinecap: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M10 4L5 8L10 12" }) }) : /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", className: "w-2.5 h-2.5", fill: "none", stroke: "#9ca3af", strokeWidth: "3", strokeLinecap: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M6 4L11 8L6 12" }) })
                }
              ),
              Gn && h && (() => {
                const a = /* @__PURE__ */ new Date(), p = Du(h), b = Zr(h);
                let y = "", f = "", e = 0, O = 0, H = !1, U = b ? "#22c55e" : "#ef4444", _ = b ? "Market open" : "Market closed", g = "Real time";
                const w = Bu(a), A = w.hours * 60 + w.minutes, X = w.day, u = w.isBST, N = u ? "BST (UTC+1)" : "GMT (UTC+0)", x = String(w.hours).padStart(2, "0"), V = String(w.minutes).padStart(2, "0"), d = Wu(h);
                if (p === "crypto")
                  H = !0, y = "24/7", f = "Always open", U = "#22c55e", _ = "Market open";
                else if (p === "forex")
                  H = !0, y = u ? "Sun 10 PM – Fri 10 PM BST" : "Sun 10 PM – Fri 10 PM GMT", f = N, b || (_ = "Weekend — market closed");
                else if (p === "stock" && d) {
                  const ue = zl(d);
                  e = ue.openHour * 60 + ue.openMinute, O = ue.closeHour * 60 + ue.closeMinute;
                  const Pe = String(ue.openHour).padStart(2, "0"), et = ue.openMinute === 0 ? "00" : String(ue.openMinute).padStart(2, "0"), Xe = String(ue.closeHour).padStart(2, "0"), Ot = ue.closeMinute === 0 ? "00" : String(ue.closeMinute).padStart(2, "0");
                  if (y = `${Pe}:${et} – ${Xe}:${Ot} ${ue.tzLabel}`, f = `${ue.exchange} (${ue.tzLabel})`, ue.lunchBreak) {
                    const yn = `${String(ue.lunchBreak.startHour).padStart(2, "0")}:${String(ue.lunchBreak.startMinute).padStart(2, "0")}`, Zt = `${String(ue.lunchBreak.endHour).padStart(2, "0")}:${String(ue.lunchBreak.endMinute).padStart(2, "0")}`;
                    y += ` (break ${yn}–${Zt})`;
                  }
                } else if (p === "stock") {
                  e = 14 * 60 + 30, O = 21 * 60, Fu(a) && (O = 18 * 60, U = b ? "#f59e0b" : "#ef4444", _ = b ? "Early close today" : "Market closed");
                  const ue = Math.floor(e / 60), Pe = Math.floor(O / 60), et = e % 60 === 0 ? ":00" : ":30", Xe = O % 60 === 0 ? ":00" : ":30";
                  y = `${ue}${et} – ${Pe}${Xe} ${u ? "BST" : "GMT"}`, f = `NYSE/NASDAQ (${N})`;
                } else if (p === "commodity" || p === "index") {
                  H = !0, y = u ? "Sun 11 PM – Fri 10 PM BST" : "Sun 11 PM – Fri 10 PM GMT", f = N;
                  const ue = u ? 23 * 60 : 22 * 60, Pe = u ? 24 * 60 : 23 * 60;
                  b && A >= ue - 15 && A < ue ? (_ = "Closing soon — daily break", U = "#f59e0b") : !b && A >= ue && A < Pe && (_ = "Daily maintenance break");
                }
                let j = "";
                if (!H && p === "stock") {
                  let ue = A;
                  if (d)
                    try {
                      const Pe = zl(d), Xe = new Intl.DateTimeFormat("en-GB", { timeZone: Pe.timezone, hour: "numeric", minute: "numeric", hour12: !1 }).formatToParts(a), Ot = parseInt(Xe.find((Zt) => Zt.type === "hour")?.value || "0"), yn = parseInt(Xe.find((Zt) => Zt.type === "minute")?.value || "0");
                      ue = Ot * 60 + yn;
                    } catch {
                    }
                  if (b) {
                    const Pe = O - ue;
                    if (Pe > 0) {
                      const et = Math.floor(Pe / 60), Xe = Pe % 60;
                      j = et > 0 ? `Closes in ${et}h ${Xe}m` : `Closes in ${Xe} minutes`;
                    }
                  } else {
                    const Pe = d ? (() => {
                      try {
                        const Xe = new Intl.DateTimeFormat("en-GB", { timeZone: zl(d).timezone, weekday: "short" }).formatToParts(a).find((Ot) => Ot.type === "weekday")?.value || "";
                        return { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5 }[Xe] || 0;
                      } catch {
                        return 0;
                      }
                    })() : X;
                    if (Pe >= 1 && Pe <= 5 && ue < e) {
                      const et = e - ue, Xe = Math.floor(et / 60), Ot = et % 60;
                      j = Xe > 0 ? `Opens in ${Xe}h ${Ot}m` : `Opens in ${Ot} minutes`;
                    }
                  }
                }
                let ie = 0;
                if (!H && b && O > e) {
                  let ue = A;
                  if (d)
                    try {
                      const Pe = zl(d), Xe = new Intl.DateTimeFormat("en-GB", { timeZone: Pe.timezone, hour: "numeric", minute: "numeric", hour12: !1 }).formatToParts(a), Ot = parseInt(Xe.find((Zt) => Zt.type === "hour")?.value || "0"), yn = parseInt(Xe.find((Zt) => Zt.type === "minute")?.value || "0");
                      ue = Ot * 60 + yn;
                    } catch {
                    }
                  ie = Math.max(0, Math.min(1, (ue - e) / (O - e)));
                }
                const Be = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][X], J = typeof document < "u" && document.documentElement.classList.contains("dark"), Fe = J ? "rgba(22, 25, 35, 0.98)" : "rgba(255, 255, 255, 0.98)", G = J ? "rgba(55, 60, 75, 0.6)" : "rgba(210, 215, 225, 0.8)", Re = J ? "#7b8094" : "#6b7280", Ue = J ? "#a0a6b8" : "#374151", Oe = J ? "#2a2e3a" : "#e5e7eb";
                return /* @__PURE__ */ t.jsxs(
                  "div",
                  {
                    ref: ho,
                    className: "relative",
                    children: [
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (ue) => {
                            ue.stopPropagation(), nr((Pe) => !Pe);
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
                                background: U,
                                boxShadow: `0 0 6px ${U}60`
                              }
                            }
                          )
                        }
                      ),
                      el && /* @__PURE__ */ t.jsxs(
                        "div",
                        {
                          style: {
                            position: "absolute",
                            top: "calc(100% + 4px)",
                            left: -40,
                            width: 260,
                            background: Fe,
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
                                      background: U,
                                      boxShadow: `0 0 6px ${U}60`,
                                      flexShrink: 0
                                    }
                                  }
                                ),
                                /* @__PURE__ */ t.jsx("span", { style: { color: U, fontSize: 13, fontWeight: 600 }, children: _ })
                              ] }),
                              j && /* @__PURE__ */ t.jsx("p", { style: { color: Re, fontSize: 12, margin: "4px 0 0 16px", lineHeight: 1.3 }, children: j })
                            ] }),
                            !H && p === "stock" && /* @__PURE__ */ t.jsxs("div", { style: { padding: "6px 16px 10px" }, children: [
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Re, fontSize: 9, fontWeight: 700, letterSpacing: 1.2, fontFamily: '"SF Mono", Consolas, monospace' }, children: Be }),
                                /* @__PURE__ */ t.jsx("div", { style: { flex: 1, height: 5, borderRadius: 3, background: Oe, overflow: "hidden", position: "relative" }, children: b && /* @__PURE__ */ t.jsx(
                                  "div",
                                  {
                                    style: {
                                      position: "absolute",
                                      left: 0,
                                      top: 0,
                                      height: "100%",
                                      width: `${ie * 100}%`,
                                      background: `linear-gradient(90deg, ${U}aa, ${U})`,
                                      borderRadius: 3,
                                      transition: "width 1s ease"
                                    }
                                  }
                                ) })
                              ] }),
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 10, color: Re, fontFamily: '"SF Mono", Consolas, monospace' }, children: [
                                /* @__PURE__ */ t.jsx("span", { children: y.split("–")[0]?.trim() }),
                                /* @__PURE__ */ t.jsx("span", { children: y.split("–")[1]?.trim() })
                              ] })
                            ] }),
                            /* @__PURE__ */ t.jsx("div", { style: { height: 1, background: G, margin: "0 12px" } }),
                            /* @__PURE__ */ t.jsxs("div", { style: { padding: "10px 16px 14px" }, children: [
                              f && /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Re }, children: "Exchange timezone" }),
                                /* @__PURE__ */ t.jsx("span", { style: { color: Ue, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: f })
                              ] }),
                              y && p !== "stock" && /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Re }, children: "Session" }),
                                /* @__PURE__ */ t.jsx("span", { style: { color: Ue, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: y })
                              ] }),
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Re }, children: "Local time" }),
                                /* @__PURE__ */ t.jsxs("span", { style: { color: Ue, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: [
                                  x,
                                  ":",
                                  V,
                                  " ",
                                  u ? "BST" : "GMT"
                                ] })
                              ] }),
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Re }, children: "Update frequency" }),
                                /* @__PURE__ */ t.jsx("span", { style: { color: "#22c55e", fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: g })
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
        Gn && r && we && (() => {
          const a = {
            bollinger: () => po,
            movingAverages: () => xo,
            vwap: () => mo,
            volumeProfile: () => bo,
            volume: () => go
          }, p = Ou().map((g) => ({
            key: g,
            title: Yl(g),
            enabledCheck: () => g === "volume" ? !!(r?.volume?.enabled && l.some((w) => w.volume)) : g === "volumeProfile" ? !!r?.volumeProfile?.enabled : !!(r?.[g]?.enabled && s?.[g]),
            endXSource: a[g] ?? (() => it[g] || 0)
          })), b = $e.toolbarLineHeight;
          let y = $e.toolbarStartY;
          const f = [], e = r?.customBrueScripts || {};
          for (const g of p) {
            if (!g.enabledCheck()) continue;
            if (g.key !== "movingAverages") {
              const u = r?.[g.key]?.sourceScriptId;
              if (u && e[u]?.enabled) continue;
            }
            const w = Os.current[g.key] || g.endXSource() || 150;
            if (g.key === "movingAverages" && s?.movingAverages?.length > 0) {
              const u = r.movingAverages?.lines ?? [], N = r?.customBrueScripts || {};
              for (let x = 0; x < s.movingAverages.length; x++) {
                const V = u[x]?.sourceScriptId;
                if (V && N[V]?.enabled) continue;
                const d = `movingAverages__${x}`, j = y;
                y += b;
                const ie = St === d, Be = u[x], J = Be ? `${Be.type} ${Be.period}` : "MA", Fe = () => {
                  const G = u.filter((Re, Ue) => Ue !== x);
                  we({
                    ...r,
                    movingAverages: {
                      ...r.movingAverages,
                      enabled: G.length > 0,
                      lines: G
                    }
                  }), ke(null), pe(null);
                };
                f.push(
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      className: "absolute z-20 flex items-center",
                      style: { left: 0, top: j - $e.toolbarRowYOffset, height: b },
                      onMouseEnter: () => {
                        ke(d), nn.current = !0, mt.current && clearTimeout(mt.current);
                      },
                      onMouseLeave: () => {
                        mt.current = setTimeout(() => {
                          ke((G) => G === d ? null : G), nn.current = !1;
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
                              G.stopPropagation(), pe((Re) => Re === d ? null : d), ke(d);
                            },
                            onContextMenu: (G) => {
                              G.preventDefault(), G.stopPropagation(), pe(d), bt({ visible: !0, x: G.clientX, y: G.clientY, key: d, title: J });
                            }
                          }
                        ),
                        ie && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (G) => {
                                G.stopPropagation(), Fe();
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                              title: `Hide ${J}`,
                              children: /* @__PURE__ */ t.jsx(Ul, { className: "w-[15px] h-[15px]" })
                            }
                          ),
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (G) => {
                                G.stopPropagation(), _s({ type: "movingAverages", position: { x: w, y: j } });
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                              title: `${J} Settings`,
                              children: /* @__PURE__ */ t.jsx(Kl, { className: "w-[15px] h-[15px]" })
                            }
                          ),
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (G) => {
                                G.stopPropagation(), Fe();
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors",
                              title: `Remove ${J}`,
                              children: /* @__PURE__ */ t.jsx(ql, { className: "w-[15px] h-[15px]" })
                            }
                          ),
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (G) => {
                                G.stopPropagation(), pe(d), bt({ visible: !0, x: G.clientX, y: G.clientY, key: d, title: J });
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                              title: "More options",
                              children: /* @__PURE__ */ t.jsx(Gl, { className: "w-[15px] h-[15px]" })
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
            y += b;
            const X = St === g.key;
            X || g.key, f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: {
                    left: 0,
                    top: A - $e.toolbarRowYOffset,
                    height: b
                  },
                  onMouseEnter: () => {
                    ke(g.key), nn.current = !0, mt.current && clearTimeout(mt.current);
                  },
                  onMouseLeave: () => {
                    mt.current = setTimeout(() => {
                      ke((u) => u === g.key ? null : u), nn.current = !1;
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
                          u.stopPropagation(), pe((N) => N === g.key ? null : g.key), ke(g.key);
                        },
                        onContextMenu: (u) => {
                          u.preventDefault(), u.stopPropagation(), pe(g.key), bt({ visible: !0, x: u.clientX, y: u.clientY, key: g.key, title: g.title });
                        }
                      }
                    ),
                    X && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation();
                            const N = r[g.key];
                            N && we({ ...r, [g.key]: { ...N, enabled: !1 } }), ke(null), pe(null);
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                          title: `Hide ${g.title}`,
                          children: /* @__PURE__ */ t.jsx(Ul, { className: "w-[15px] h-[15px]" })
                        }
                      ),
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation(), _s({ type: g.key, position: { x: w, y: A } });
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                          title: `${g.title} Settings`,
                          children: /* @__PURE__ */ t.jsx(Kl, { className: "w-[15px] h-[15px]" })
                        }
                      ),
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation();
                            const N = r[g.key];
                            N && we({ ...r, [g.key]: { ...N, enabled: !1 } }), ke(null), pe(null);
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors",
                          title: `Remove ${g.title}`,
                          children: /* @__PURE__ */ t.jsx(ql, { className: "w-[15px] h-[15px]" })
                        }
                      ),
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation(), pe(g.key), bt({ visible: !0, x: u.clientX, y: u.clientY, key: g.key, title: g.title });
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                          title: "More options",
                          children: /* @__PURE__ */ t.jsx(Gl, { className: "w-[15px] h-[15px]" })
                        }
                      )
                    ] })
                  ]
                },
                `overlay-row-${g.key}`
              )
            );
          }
          const O = (r?.customIndicators || []).filter((g) => g.enabled && g.display === "overlay"), H = /* @__PURE__ */ new Map(), U = [];
          for (const g of O)
            if (typeof g.expression == "string" && g.expression.startsWith("brue:") && g.scriptId) {
              const A = g.scriptId;
              H.has(A) || H.set(A, g);
            } else
              U.push(g);
          for (const g of U) {
            const w = `custom_overlay_${g.id}`, A = Os.current[w] || it[w] || 150, X = y;
            y += b;
            const u = `ci-${g.id}`, N = St === u, x = typeof g.expression == "string" && g.expression.startsWith("local:"), V = x ? g.group || g.expression.split(":")[1] || g.name : null, d = () => {
              x ? _e?.(V) : we && we({
                ...r,
                customIndicators: (r.customIndicators || []).filter((j) => j.id !== g.id)
              }), ke(null), pe(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: X - $e.toolbarRowYOffset, height: b },
                  onMouseEnter: () => {
                    ke(u), nn.current = !0, mt.current && clearTimeout(mt.current);
                  },
                  onMouseLeave: () => {
                    mt.current = setTimeout(() => {
                      ke((j) => j === u ? null : j), nn.current = !1;
                    }, 150);
                  },
                  children: [
                    N && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: A + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: A, height: 16 },
                        onClick: (j) => {
                          j.stopPropagation(), pe((ie) => ie === u ? null : u), ke(u);
                        },
                        onContextMenu: (j) => {
                          j.preventDefault(), j.stopPropagation(), pe(u), bt({
                            visible: !0,
                            x: j.clientX,
                            y: j.clientY,
                            key: w,
                            title: x && V || g.name,
                            custom: x ? { kind: "engine", label: V } : { kind: "formula", ciId: g.id }
                          });
                        }
                      }
                    ),
                    N && Wl({
                      kind: x ? "engine" : "formula",
                      label: x && V || g.name,
                      menuKey: w,
                      engineLabel: V || void 0,
                      ciId: g.id,
                      remove: d
                    })
                  ]
                },
                `overlay-row-${u}`
              )
            );
          }
          for (const [g, w] of H.entries()) {
            const A = `script_${g}`, X = Os.current[A] || it[A] || 150, u = y;
            y += b;
            const N = `script-${g}`, x = St === N, V = r?.customBrueScripts?.[g]?.name || w.name || "Brue script", d = () => {
              Q?.(g), ke(null), pe(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: u - $e.toolbarRowYOffset, height: b },
                  onMouseEnter: () => {
                    ke(N), nn.current = !0, mt.current && clearTimeout(mt.current);
                  },
                  onMouseLeave: () => {
                    mt.current = setTimeout(() => {
                      ke((j) => j === N ? null : j), nn.current = !1;
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
                          j.stopPropagation(), pe((ie) => ie === N ? null : N), ke(N);
                        },
                        onContextMenu: (j) => {
                          j.preventDefault(), j.stopPropagation(), pe(N), bt({
                            visible: !0,
                            x: j.clientX,
                            y: j.clientY,
                            key: A,
                            title: V,
                            custom: { kind: "brue", sid: g }
                          });
                        }
                      }
                    ),
                    x && Wl({
                      kind: "brue",
                      label: V,
                      menuKey: A,
                      sid: g,
                      remove: d
                    })
                  ]
                },
                `overlay-row-${N}`
              )
            );
          }
          const _ = r?.customBrueScripts || {};
          for (const g of Object.keys(_)) {
            const w = _[g];
            if (!w?.enabled || H.has(g)) continue;
            const A = `script_${g}`, X = Os.current[A] || it[A] || 150, u = y;
            y += b;
            const N = `script-${g}`, x = St === N, V = w.name || "Brue script", d = () => {
              Q?.(g), ke(null), pe(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: u - $e.toolbarRowYOffset, height: b },
                  onMouseEnter: () => {
                    ke(N), nn.current = !0, mt.current && clearTimeout(mt.current);
                  },
                  onMouseLeave: () => {
                    mt.current = setTimeout(() => {
                      ke((j) => j === N ? null : j), nn.current = !1;
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
                          j.stopPropagation(), pe((ie) => ie === N ? null : N), ke(N);
                        },
                        onContextMenu: (j) => {
                          j.preventDefault(), j.stopPropagation(), pe(N), bt({
                            visible: !0,
                            x: j.clientX,
                            y: j.clientY,
                            key: A,
                            title: V,
                            custom: { kind: "brue", sid: g }
                          });
                        }
                      }
                    ),
                    x && Wl({
                      kind: "brue",
                      label: V,
                      menuKey: A,
                      sid: g,
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
        r && we && (() => {
          const a = Wr().map((b) => ({ key: b, title: Yl(b) })), p = r?.customBrueScripts || {};
          return a.map(({ key: b, title: y }) => {
            const f = tn.current[b];
            if (!s?.[b] || !f) return null;
            const O = r?.[b]?.sourceScriptId;
            if (O && p[O]?.enabled) return null;
            const H = Hn.current[b] || sr[b] || 150, U = `sp-${b}`, _ = St === U;
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
                  ke(U), nn.current = !0, mt.current && clearTimeout(mt.current);
                },
                onMouseLeave: () => {
                  mt.current = setTimeout(() => {
                    ke((g) => g === U ? null : g), nn.current = !1;
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
                      onClick: (g) => {
                        g.stopPropagation(), pe((w) => w === U ? null : U), ke(U);
                      },
                      onContextMenu: (g) => {
                        g.preventDefault(), g.stopPropagation(), pe(U), bt({ visible: !0, x: g.clientX, y: g.clientY, key: b, title: y });
                      }
                    }
                  ),
                  _ && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (g) => {
                          g.stopPropagation();
                          const w = r[b];
                          w && we({ ...r, [b]: { ...w, enabled: !1 } }), ke(null), pe(null);
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: `Hide ${y}`,
                        children: /* @__PURE__ */ t.jsx(Ul, { className: "w-[15px] h-[15px]" })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (g) => {
                          g.stopPropagation(), _s({ type: b, position: { x: H, y: f.top } });
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: `${y} Settings`,
                        children: /* @__PURE__ */ t.jsx(Kl, { className: "w-[15px] h-[15px]" })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (g) => {
                          g.stopPropagation();
                          const w = r[b];
                          w && we({ ...r, [b]: { ...w, enabled: !1 } }), ke(null), pe(null);
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors",
                        title: `Remove ${y}`,
                        children: /* @__PURE__ */ t.jsx(ql, { className: "w-[15px] h-[15px]" })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (g) => {
                          g.stopPropagation(), pe(U), bt({ visible: !0, x: g.clientX, y: g.clientY, key: b, title: y });
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: "More options",
                        children: /* @__PURE__ */ t.jsx(Gl, { className: "w-[15px] h-[15px]" })
                      }
                    )
                  ] })
                ]
              },
              `sp-row-${b}`
            );
          });
        })(),
        r && we && (() => {
          const a = (r?.customIndicators || []).filter((e) => e.enabled && e.display === "subplot"), p = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map();
          for (const e of a)
            if (typeof e.expression == "string" && e.expression.startsWith("brue:") && e.scriptId) {
              const H = e.scriptId;
              p.has(H) || p.set(H, e);
            } else if (typeof e.expression == "string" && e.expression.startsWith("local:") && e.group) {
              const H = e.group;
              b.has(H) || b.set(H, e);
            }
          const y = [], f = [];
          for (const [e, O] of p.entries())
            f.push({
              rowKey: `script-${e}`,
              firstPlot: O,
              label: r?.customBrueScripts?.[e]?.name || O.name || "Brue script",
              kind: "brue",
              handle: e,
              remove: () => Q?.(e)
            });
          for (const [e, O] of b.entries())
            f.push({
              rowKey: `engine-sp-${e}`,
              firstPlot: O,
              label: e,
              kind: "engine",
              handle: e,
              remove: () => _e?.(e)
            });
          for (const { rowKey: e, firstPlot: O, label: H, kind: U, handle: _, remove: g } of f) {
            const w = tn.current[`custom_${O.id}`];
            if (!w) continue;
            const A = St === e, X = 200, u = () => {
              g(), ke(null), pe(null);
            };
            y.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: w.top + 2, height: 16 },
                  onMouseEnter: () => {
                    ke(e), nn.current = !0, mt.current && clearTimeout(mt.current);
                  },
                  onMouseLeave: () => {
                    mt.current = setTimeout(() => {
                      ke((N) => N === e ? null : N), nn.current = !1;
                    }, 150);
                  },
                  children: [
                    A && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: X + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: X, height: 16 },
                        onClick: (N) => {
                          N.stopPropagation(), pe((x) => x === e ? null : e), ke(e);
                        },
                        onContextMenu: (N) => {
                          N.preventDefault(), N.stopPropagation(), pe(e), bt({
                            visible: !0,
                            x: N.clientX,
                            y: N.clientY,
                            key: `custom_${O.id}`,
                            title: H,
                            custom: U === "engine" ? { kind: "engine", label: _ } : { kind: "brue", sid: _ }
                          });
                        }
                      }
                    ),
                    A && Wl({
                      kind: U,
                      label: H,
                      menuKey: `custom_${O.id}`,
                      engineLabel: U === "engine" ? _ : void 0,
                      sid: U === "brue" ? _ : void 0,
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
              height: yr
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
              bottom: gt + 8,
              left: `calc(50% - ${Ve / 2}px)`,
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
        os && /* @__PURE__ */ t.jsx(
          "div",
          {
            className: "absolute z-50 flex items-center justify-center",
            style: {
              top: 4,
              // Desktop reserves the RIGHT_TOOLBAR_WIDTH gap because the price
              // axis carries the right toolbar overlay; phone/tablet have no
              // overlay, so the reset button uses the full axis width.
              right: Xn ?? ($e.yAxisResetUsesToolbarGap ? $o : 0),
              width: Xn !== void 0 ? Ve - Xn : $e.yAxisResetUsesToolbarGap ? Ve - $o : Ve
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
              top: yr - 6,
              right: Ve,
              left: 0
            },
            onMouseDown: kr,
            onTouchStart: kr,
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
        tl && r && we && xe && /* @__PURE__ */ t.jsx(
          _u,
          {
            type: tl.type,
            config: r,
            onConfigChange: we,
            position: tl.position,
            onClose: () => _s(null)
          }
        ),
        jn && jn.visible && r && we && (() => {
          const a = Ge.current?.getBoundingClientRect();
          if (!a) return null;
          const p = jn.x - a.left, b = jn.y - a.top, y = jn.key, f = jn.custom, e = () => {
            f?.kind === "brue" ? Q?.(f.sid) : f?.kind === "engine" ? _e?.(f.label) : f?.kind === "formula" && we({
              ...r,
              customIndicators: (r.customIndicators || []).filter((O) => O.id !== f.ciId)
            });
          };
          return Ar.createPortal(
            (() => {
              const O = "var(--text)", H = "var(--dim)", U = "var(--hover)", _ = "var(--edge)", g = {
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
                    left: Math.min(jn.x, window.innerWidth - 170),
                    top: Math.min(jn.y, window.innerHeight - 140)
                  },
                  children: [
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        style: { position: "fixed", inset: 0, zIndex: -1 },
                        onClick: () => {
                          bt(null), pe(null);
                        },
                        onContextMenu: (w) => {
                          w.preventDefault(), bt(null), pe(null);
                        }
                      }
                    ),
                    /* @__PURE__ */ t.jsx("div", { style: {
                      padding: "5px 10px 3px",
                      fontSize: "11px",
                      color: H,
                      whiteSpace: "nowrap"
                    }, children: jn.title }),
                    !f && /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        style: g,
                        onMouseEnter: (w) => {
                          w.currentTarget.style.background = U;
                        },
                        onMouseLeave: (w) => {
                          w.currentTarget.style.background = "transparent";
                        },
                        onClick: () => {
                          _s({ type: y, position: { x: p, y: b } }), bt(null);
                        },
                        children: "Settings..."
                      }
                    ),
                    f?.kind === "engine" && nt && /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        style: g,
                        onMouseEnter: (w) => {
                          w.currentTarget.style.background = U;
                        },
                        onMouseLeave: (w) => {
                          w.currentTarget.style.background = "transparent";
                        },
                        onClick: () => {
                          nt(f.label), bt(null);
                        },
                        children: "Settings..."
                      }
                    ),
                    !f && /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        style: g,
                        onMouseEnter: (w) => {
                          w.currentTarget.style.background = U;
                        },
                        onMouseLeave: (w) => {
                          w.currentTarget.style.background = "transparent";
                        },
                        onClick: () => {
                          const w = r[y];
                          w && we({ ...r, [y]: { ...w, enabled: !1 } }), bt(null), pe(null);
                        },
                        children: "Hide"
                      }
                    ),
                    /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: `1px solid ${_}` } }),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        style: { ...g, color: "var(--err)" },
                        onMouseEnter: (w) => {
                          w.currentTarget.style.background = U;
                        },
                        onMouseLeave: (w) => {
                          w.currentTarget.style.background = "transparent";
                        },
                        onClick: () => {
                          if (f)
                            e();
                          else {
                            const w = r[y];
                            w && we({ ...r, [y]: { ...w, enabled: !1 } });
                          }
                          bt(null), pe(null);
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
function Vs({ children: l, size: n = 28, active: h = !1, title: T, onClick: I }) {
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
function hl({ type: l }) {
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
  onToggleHidden: ne,
  onClearAll: oe,
  collapsed: Me = !1,
  onToggleCollapsed: r
}) {
  const [we, Q] = o.useState(!1), _e = Me ? 14 : 40;
  return Me ? /* @__PURE__ */ t.jsxs(
    "div",
    {
      className: "flex flex-col items-center bg-[#2a2a2a] border-r border-[#3a3a3a] shrink-0",
      style: { width: _e, minWidth: _e },
      children: [
        /* @__PURE__ */ t.jsx("div", { className: "h-1" }),
        /* @__PURE__ */ t.jsx(Vs, { size: 28, title: "Show drawing tools", onClick: () => r?.(), children: /* @__PURE__ */ t.jsx(hl, { type: "chevronRight" }) })
      ]
    }
  ) : /* @__PURE__ */ t.jsxs(
    "div",
    {
      className: "flex flex-col bg-[#2a2a2a] border-r border-[#3a3a3a] shrink-0 select-none",
      style: { width: _e, minWidth: _e },
      children: [
        /* @__PURE__ */ t.jsx("div", { className: "h-1 shrink-0" }),
        /* @__PURE__ */ t.jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden flex flex-col items-center gap-[2px] px-0 py-1 scrollbar-thin", children: rd.map((nt, Ae) => /* @__PURE__ */ t.jsxs(kc.Fragment, { children: [
          Ae > 0 && /* @__PURE__ */ t.jsx("div", { className: "w-[26px] h-px bg-[#3a3a3a] my-[5px] shrink-0" }),
          nt.tools.map((We) => /* @__PURE__ */ t.jsx(
            Vs,
            {
              active: l === We,
              title: ad[We],
              onClick: () => {
                n?.(l === We ? "cursor" : We);
              },
              children: /* @__PURE__ */ t.jsx(cd, { tool: We })
            },
            We
          ))
        ] }, Ae)) }),
        /* @__PURE__ */ t.jsxs("div", { className: "shrink-0 flex flex-col items-center gap-[2px] pb-1", children: [
          /* @__PURE__ */ t.jsx("div", { className: "w-[26px] h-px bg-[#3a3a3a] my-[5px]" }),
          /* @__PURE__ */ t.jsx(Vs, { active: h, title: "Magnet (snap to OHLC)", onClick: () => T?.(), children: /* @__PURE__ */ t.jsx(hl, { type: "magnet" }) }),
          /* @__PURE__ */ t.jsx(Vs, { active: I, title: I ? "Show drawings" : "Hide all drawings", onClick: () => ne?.(), children: /* @__PURE__ */ t.jsx(hl, { type: I ? "eyeOff" : "eye" }) }),
          /* @__PURE__ */ t.jsx(Vs, { title: "Remove all drawings", onClick: () => Q(!0), children: /* @__PURE__ */ t.jsx(hl, { type: "trash" }) }),
          /* @__PURE__ */ t.jsx(Vs, { title: "Hide drawing toolbar", onClick: () => r?.(), children: /* @__PURE__ */ t.jsx(hl, { type: "chevronLeft" }) })
        ] }),
        we && /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/40", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-[#262626] border border-[#3a3a3a] rounded-[3px] p-3 w-[200px] shadow-xl", children: [
          /* @__PURE__ */ t.jsx("div", { className: "text-[11px] text-[#e8e8e8] font-medium mb-3", children: "Remove all drawings?" }),
          /* @__PURE__ */ t.jsxs("div", { className: "flex gap-2 justify-end", children: [
            /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: () => Q(!1),
                className: "px-3 py-1 text-[11px] bg-[#2a2a2a] border border-[#3a3a3a] text-[#b9b9b9] rounded-[2px] hover:bg-[#343434]",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: () => {
                  oe?.(), Q(!1);
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
const Ho = [
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
    const oe = (Me) => {
      I.current && !I.current.contains(Me.target) && T(!1);
    };
    return document.addEventListener("mousedown", oe), () => document.removeEventListener("mousedown", oe);
  }, []);
  const ne = Ho.find((oe) => oe.id === l) || Ho[0];
  return /* @__PURE__ */ t.jsxs("div", { ref: I, className: "relative", children: [
    /* @__PURE__ */ t.jsxs(
      "button",
      {
        onClick: () => T((oe) => !oe),
        className: "flex items-center gap-1 px-2 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8] hover:bg-[#343434]",
        children: [
          /* @__PURE__ */ t.jsx("span", { className: "font-medium", children: ne.label }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[8px] opacity-60", children: "▾" })
        ]
      }
    ),
    h && /* @__PURE__ */ t.jsx("div", { className: "absolute top-full left-0 mt-1 z-30 w-[200px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl py-1", children: Ho.map((oe) => /* @__PURE__ */ t.jsxs(
      "button",
      {
        onClick: () => {
          n(oe.id), T(!1);
        },
        className: `w-full text-left px-3 py-1.5 text-[11px] flex flex-col hover:bg-[#343434] ${l === oe.id ? "bg-[#343434] text-[#e8e8e8]" : "text-[#b9b9b9]"}`,
        children: [
          /* @__PURE__ */ t.jsx("span", { className: "font-medium", children: oe.label }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[9px] opacity-60", children: oe.desc })
        ]
      },
      oe.id
    )) })
  ] });
}
const Xt = [
  { label: "tick", ms: 0, sec: 0 },
  { label: "1s", ms: 1e3, sec: 1, pro: !0 },
  { label: "5s", ms: 5e3, sec: 5, pro: !0 },
  { label: "15s", ms: 15e3, sec: 15, pro: !0 },
  { label: "30s", ms: 3e4, sec: 30, pro: !0 },
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
  const [I, ne] = o.useState(!1), [oe, Me] = o.useState(""), r = o.useRef(null);
  o.useEffect(() => {
    const W = (q) => {
      r.current && !r.current.contains(q.target) && ne(!1);
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
    const ee = parseInt(Ce[1], 10);
    if (!(ee > 0)) return null;
    const re = Ce[2], qe = re.toLowerCase();
    let ge = 0;
    if (re === "M") ge = ee * 2592e6;
    else if (qe === "s") ge = ee * 1e3;
    else if (qe === "m") ge = ee * 6e4;
    else if (qe === "h") ge = ee * 36e5;
    else if (qe === "d") ge = ee * 864e5;
    else if (qe === "w") ge = ee * 6048e5;
    else return null;
    if (ge < 1e3 && q.toLowerCase() !== "tick" && ge === 0 || ge > 31536e6) return null;
    const yt = re === "M" ? `${ee}M` : `${ee}${qe === "d" ? "d" : qe === "w" ? "w" : qe}`;
    return { label: re === "M" ? `${ee}M` : qe === "d" && re === "D" ? `${ee}D` : qe === "w" && re === "W" ? `${ee}W` : yt, ms: ge, sec: Math.floor(ge / 1e3) };
  }, Q = (W) => h.has(W) || h.has(W.toLowerCase()) || h.has(W.toUpperCase()), _e = Xt.filter((W) => h.has(W.label)), nt = ["1m", "5m", "15m", "1h", "4h", "1D"], We = (_e.length ? _e.map((W) => W.label).slice(0, 6) : nt).filter((W, q, Ce) => Ce.indexOf(W) === q), be = (W) => {
    n(W), ne(!1);
  }, Ee = (W) => W ? W === "1M" ? "1M" : W.toLowerCase() : "", fe = Ee(l.label);
  return /* @__PURE__ */ t.jsxs("div", { ref: r, className: "relative", style: { overflow: "visible" }, children: [
    /* @__PURE__ */ t.jsxs(
      "div",
      {
        className: "flex items-center gap-3 px-2 py-1 border border-[#3a3a3a] rounded bg-[#262626] text-[11px] font-mono cursor-pointer select-none overflow-visible",
        onClick: () => ne((W) => !W),
        title: "Click to drop timeframe panel — exact EdgeDepth full list tick 1s 15s 30s 1m 3m 5m 15m 30m 1h 2h 4h 8h 12h 1d 3d 1w 1M + Custom",
        children: [
          We.map((W) => {
            const q = Xt.find((ee) => ee.label === W) || Xt.find((ee) => ee.label.toLowerCase() === W.toLowerCase()), Ce = q ? Ee(q.label) === fe || W.toLowerCase() === "1d" && (fe === "1d" || fe === "1D") : !1;
            return /* @__PURE__ */ t.jsx(
              "span",
              {
                onClick: (ee) => {
                  ee.stopPropagation(), q && be(q);
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
              _e.length,
              "/6 · FULL BAR"
            ] })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { className: "px-3 py-2 space-y-3 bg-[#0a0a0a] max-h-[65vh] overflow-auto", children: [
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] tracking-wider mb-1.5", children: "TICKS" }),
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-4 text-[11px] flex-wrap", children: ["tick"].map((W) => {
                const q = Xt.find((re) => re.label === W), Ce = q ? Ee(q.label) === fe : !1, ee = Q(W);
                return /* @__PURE__ */ t.jsxs(
                  "button",
                  {
                    onClick: () => {
                      q && be(q);
                    },
                    onContextMenu: (re) => {
                      re.preventDefault(), T(W);
                    },
                    className: `flex items-center gap-0.5 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    title: "Tick chart — one bar per trade, click sets chart",
                    children: [
                      W,
                      " ",
                      ee && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
                    ]
                  },
                  W
                );
              }) })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [
                /* @__PURE__ */ t.jsx("span", { className: "text-[10px] text-[#b9b9b9] tracking-wider", children: "SECONDS" }),
                /* @__PURE__ */ t.jsx("span", { className: "text-[9px] px-1 py-0.5 bg-[#1e2a2a] border border-[#21b3a4]/30 text-[#21b3a4] rounded flex items-center gap-0.5", children: "🔒 PRO" })
              ] }),
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-3 text-[11px] flex-wrap", children: ["1s", "5s", "15s", "30s"].map((W) => {
                const q = Xt.find((re) => re.label === W), Ce = q ? Ee(q.label) === fe : !1, ee = Q(W);
                return /* @__PURE__ */ t.jsxs(
                  "button",
                  {
                    onClick: () => {
                      q && be(q);
                    },
                    onContextMenu: (re) => {
                      re.preventDefault(), T(W);
                    },
                    className: `flex items-center gap-0.5 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    title: "SECONDS PRO — click sets, right-click pins",
                    children: [
                      W,
                      " ",
                      ee && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" }),
                      " ",
                      /* @__PURE__ */ t.jsx("span", { className: "text-[8px] opacity-50", children: "🔒" })
                    ]
                  },
                  W
                );
              }) })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] tracking-wider mb-1.5", children: "MINUTES" }),
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-3 text-[11px] flex-wrap", children: ["1m", "3m", "5m", "15m", "30m"].map((W) => {
                const q = Xt.find((re) => re.label === W), Ce = q ? Ee(q.label) === fe : !1, ee = Q(W);
                return /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    onClick: () => {
                      q && be(q);
                    },
                    onContextMenu: (re) => {
                      re.preventDefault(), T(W);
                    },
                    className: `flex flex-col items-center gap-0.5 pb-0.5 border-b-[2px] ${Ce ? "border-[#e8e8e8] text-[#e8e8e8]" : "border-transparent text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    title: "Click sets chart, right-click pins to bar (max 6)",
                    children: /* @__PURE__ */ t.jsxs("span", { className: "flex items-center gap-0.5", children: [
                      W,
                      " ",
                      ee && /* @__PURE__ */ t.jsx("span", { className: "text-[8px] text-[#e8e8e8]", children: "★" })
                    ] })
                  },
                  W
                );
              }) })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] tracking-wider mb-1.5", children: "HOURS" }),
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-3 text-[11px] flex-wrap", children: ["1h", "2h", "4h", "6h", "8h", "12h"].map((W) => {
                const q = Xt.find((re) => re.label === W), Ce = q ? Ee(q.label) === fe : !1, ee = Q(W);
                return /* @__PURE__ */ t.jsxs(
                  "button",
                  {
                    onClick: () => {
                      q && be(q);
                    },
                    onContextMenu: (re) => {
                      re.preventDefault(), T(W);
                    },
                    className: `flex items-center gap-0.5 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    children: [
                      W,
                      " ",
                      ee && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
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
                  const q = Xt.find((re) => re.label === W), Ce = q ? Ee(q.label) === fe : !1, ee = Q(W);
                  return /* @__PURE__ */ t.jsxs(
                    "button",
                    {
                      onClick: () => {
                        q && be(q);
                      },
                      onContextMenu: (re) => {
                        re.preventDefault(), T(W);
                      },
                      className: `flex items-center gap-0.5 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                      children: [
                        W,
                        " ",
                        ee && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
                      ]
                    },
                    W
                  );
                }),
                ["1D", "1W"].map((W) => {
                  const q = Xt.find((re) => re.label === W), Ce = q ? Ee(q.label) === fe : !1, ee = Q(W);
                  return /* @__PURE__ */ t.jsxs(
                    "button",
                    {
                      onClick: () => {
                        q && be(q);
                      },
                      onContextMenu: (re) => {
                        re.preventDefault(), T(W);
                      },
                      className: `flex items-center gap-0.5 opacity-70 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                      title: "Alias — same as lowercase",
                      children: [
                        W,
                        " ",
                        ee && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
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
                const q = Xt.find((re) => re.label === W), Ce = q ? q.label === l.label || l.label === "1M" : !1, ee = Q(W);
                return /* @__PURE__ */ t.jsxs(
                  "button",
                  {
                    onClick: () => {
                      q && be(q);
                    },
                    onContextMenu: (re) => {
                      re.preventDefault(), T(W);
                    },
                    className: `flex items-center gap-0.5 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    children: [
                      W,
                      " ",
                      ee && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
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
                  value: oe,
                  onChange: (W) => Me(W.target.value),
                  onKeyDown: (W) => {
                    if (W.key === "Enter") {
                      const q = we(oe);
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
                    const W = we(oe);
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
const $r = hd;
function pd({ open: l, onClose: n, onSelect: h }) {
  const [T, I] = o.useState(""), [ne, oe] = o.useState(""), [Me, r] = o.useState([]);
  o.useEffect(() => {
    let Q = !0;
    return l && (async () => {
      try {
        const be = ["/api/orderflow/tickers?limit=770", "/api/symbols?limit=770", "/api/tickers"];
        for (const Ee of be)
          try {
            const fe = await fetch(Ee);
            if (fe.ok) {
              const W = await fe.json(), q = W.tickers || W.symbols || W.data || [];
              if (q.length) {
                const Ce = q.slice(0, 770).map((ee) => ({
                  symbol: ee.symbol || ee.pair || ee.name,
                  base: ee.base_asset || ee.base || (ee.symbol || "").split("USDT")[0] || ee.symbol,
                  exchange: ee.exchange || ee.provider || "binancef",
                  price: ee.last_price || ee.price || 100 + Math.random() * 5e4,
                  change: ee.change_pct_24h || ee.change || (Math.random() - 0.5) * 10,
                  listed: !0
                }));
                if (Q && Ce.length) {
                  r(Ce);
                  return;
                }
              }
            }
          } catch {
          }
      } catch {
      }
      if (!Q) return;
      const nt = ["BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "DOGE", "AVAX", "DOT", "LINK", "LTC", "BCH", "UNI", "XLM", "ETC", "FIL", "TRX", "APT", "ARB", "OP", "MATIC", "ATOM", "NEAR", "FTM", "ALGO"], Ae = ["binancef", "hl", "coinbase"], We = [];
      for (let be = 0; be < 770; be++) {
        const Ee = nt[be % nt.length], fe = Ae[be % Ae.length];
        We.push({ symbol: `${Ee}${fe === "binancef" ? "USDT" : "-USD"}`, base: Ee, exchange: fe, price: 100 + Math.random() * 5e4, change: (Math.random() - 0.5) * 10, listed: !0 });
      }
      r(We);
    })(), () => {
      Q = !1;
    };
  }, [l]);
  const we = o.useMemo(() => Me.filter((Q) => !(ne && Q.exchange !== ne || T && !Q.symbol.toLowerCase().includes(T.toLowerCase()) && !Q.base.toLowerCase().includes(T.toLowerCase()))).slice(0, 200), [Me, T, ne]);
  return l ? /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-[150] flex items-center justify-center bg-black/60", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-[#262626] border border-[#3a3a3a] rounded shadow-2xl w-[480px] max-h-[80vh] flex flex-col", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "px-3 py-2 border-b border-[#3a3a3a] flex items-center gap-2", children: [
      /* @__PURE__ */ t.jsx("span", { className: "text-[11px] font-bold tracking-wider text-[#e8e8e8]", children: "FIND SYMBOL — 770 LISTED" }),
      /* @__PURE__ */ t.jsxs("span", { className: "text-[9px] text-[#b9b9b9]", children: [
        Me.length,
        " loaded • ",
        ne || "all venues"
      ] }),
      /* @__PURE__ */ t.jsx("button", { onClick: n, className: "ml-auto text-[#b9b9b9] hover:text-[#e8e8e8]", children: "×" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "p-2 flex gap-2 border-b border-[#3a3a3a]/50", children: [
      /* @__PURE__ */ t.jsx("input", { value: T, onChange: (Q) => I(Q.target.value), placeholder: "Search BTC, ETH...", className: "flex-1 px-2 py-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded text-[11px] text-[#e8e8e8]", autoFocus: !0 }),
      /* @__PURE__ */ t.jsxs("select", { value: ne, onChange: (Q) => oe(Q.target.value), className: "px-2 py-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded text-[10px] text-[#b9b9b9]", children: [
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
      we.map((Q) => /* @__PURE__ */ t.jsxs("div", { onClick: () => {
        h(Q.symbol), n();
      }, className: "grid grid-cols-4 px-2 py-1.5 text-[11px] border-b border-[#3a3a3a]/20 hover:bg-[#343434] cursor-pointer", children: [
        /* @__PURE__ */ t.jsx("span", { className: "font-mono font-medium text-[#e8e8e8]", children: Q.symbol }),
        /* @__PURE__ */ t.jsx("span", { className: "font-mono tabular-nums", children: Q.price.toFixed(2) }),
        /* @__PURE__ */ t.jsxs("span", { className: `tabular-nums ${Q.change >= 0 ? "text-[#21b3a4]" : "text-[#f0426c]"}`, children: [
          Q.change >= 0 ? "+" : "",
          Q.change.toFixed(2),
          "%"
        ] }),
        /* @__PURE__ */ t.jsx("span", { className: "text-[10px] text-[#b9b9b9]", children: Q.exchange })
      ] }, `${Q.exchange}:${Q.symbol}`)),
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
    const I = (ne) => {
      T.current && !T.current.contains(ne.target) && h(!1);
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
function bd({ open: l, onClose: n, feature: h = "SECONDS PRO" }) {
  return l ? /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-[#262626] border border-[#3a3a3a] rounded shadow-2xl w-[380px] overflow-hidden", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "px-4 py-3 border-b border-[#3a3a3a] flex justify-between items-center", children: [
      /* @__PURE__ */ t.jsxs("span", { className: "text-[11px] font-bold tracking-wider text-[#e8e8e8]", children: [
        "PRO — ",
        h
      ] }),
      /* @__PURE__ */ t.jsx("button", { onClick: n, className: "text-[#b9b9b9] hover:text-[#e8e8e8] text-[16px]", children: "×" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t.jsx("div", { className: "w-8 h-8 rounded bg-[#d0d0d0] flex items-center justify-center text-[#1c1c1c] font-bold text-[14px]", children: "D" }),
        /* @__PURE__ */ t.jsx("span", { className: "text-[12px] font-semibold text-[#e8e8e8]", children: "EdgeDepth Pro" }),
        /* @__PURE__ */ t.jsx("span", { className: "text-[9px] px-1.5 py-0.5 bg-[#21b3a4]/20 text-[#21b3a4] rounded", children: "UPGRADE" })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "text-[11px] text-[#b9b9b9] leading-relaxed", children: [
        /* @__PURE__ */ t.jsxs("p", { className: "mb-2", children: [
          /* @__PURE__ */ t.jsx("span", { className: "text-[#e8e8e8] font-medium", children: h }),
          " is locked behind Pro. Unlock:"
        ] }),
        /* @__PURE__ */ t.jsxs("ul", { className: "list-disc pl-4 space-y-1 text-[10px]", children: [
          /* @__PURE__ */ t.jsx("li", { children: "Seconds timeframe 1s/5s/15s/30s — ultra-fast scalping" }),
          /* @__PURE__ */ t.jsx("li", { children: "Real-time DOM linked — follow-live streaming with live-edge dot" }),
          /* @__PURE__ */ t.jsx("li", { children: "Liquidation heatmap — 800 bands 0.05%, leverage tiers, reach cone" }),
          /* @__PURE__ */ t.jsx("li", { children: "Flow & Positioning — Exposure V2, Hyperliquid levels, Market structure" }),
          /* @__PURE__ */ t.jsx("li", { children: "VPVR + TPO + Footprint cluster/profile + Renko" }),
          /* @__PURE__ */ t.jsx("li", { children: "Volume Delta + Trade Intensity + VWAP Deviation" }),
          /* @__PURE__ */ t.jsx("li", { children: "VPIN Toxicity + Funding Rate + Open Interest" }),
          /* @__PURE__ */ t.jsx("li", { children: "1503 pairs watchlist with sparkline/score/type" })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ t.jsx("button", { onClick: n, className: "flex-1 py-2 bg-[#2a2a2a] border border-[#3a3a3a] text-[#b9b9b9] rounded text-[11px] hover:bg-[#343434]", children: "Maybe later" }),
        /* @__PURE__ */ t.jsx("button", { onClick: n, className: "flex-1 py-2 bg-[#d0d0d0] text-[#1c1c1c] rounded text-[11px] font-medium hover:bg-[#e8e8e8]", children: "Upgrade to Pro" })
      ] }),
      /* @__PURE__ */ t.jsx("div", { className: "text-[9px] text-[#b9b9b9]/60 text-center", children: "Zinc palette #1c1c1c/#2a2a2a/#3a3a3a #e8e8e8/#b9b9b9 #21b3a4/#f0426c • Data colors exact EdgeDepth Ember/Viridis/Magma/Inferno" })
    ] })
  ] }) }) : null;
}
const dn = (() => {
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
})(), Xo = /* @__PURE__ */ new Set(), fl = () => Xo.forEach((l) => l()), Jl = (l, n) => {
  try {
    localStorage.setItem(l, n);
  } catch {
  }
}, En = {
  get: () => dn,
  setLayout(l) {
    dn.layout = l, Jl("lset-layout", l), fl();
  },
  setSync(l) {
    dn.sync = l, Jl("lset-layout-sync", JSON.stringify(l)), fl();
  },
  setPanelSymbol(l, n) {
    dn.panelSymbols = [...dn.panelSymbols], dn.panelSymbols[l] = n, Jl("lset-layout-symbols", JSON.stringify(dn.panelSymbols)), fl();
  },
  setPanelKind(l, n) {
    dn.panelKinds = [...dn.panelKinds], dn.panelKinds[l] = n, Jl("lset-layout-kinds", JSON.stringify(dn.panelKinds)), fl();
  },
  setActivePanel(l) {
    dn.activePanel !== l && (dn.activePanel = l, fl());
  },
  subscribe(l) {
    return Xo.add(l), () => {
      Xo.delete(l);
    };
  }
};
function Jo() {
  const [, l] = o.useState(0);
  return o.useEffect(() => En.subscribe(() => l((n) => n + 1)), []), { ...dn };
}
const gd = o.lazy(() => import("./chunks/depth-DgOhdG7Y.js").then((l) => l.E)), vd = o.lazy(() => import("./chunks/EdgeDepthDOMPanel-CSa5pgLO.js")), yd = o.lazy(() => import("./chunks/EdgeDepthTapePanel-DQfRW2GA.js")), kd = o.lazy(() => import("./chunks/EdgeDepthFootprintPanel-FdQWkwUq.js")), wd = o.lazy(() => import("./chunks/EdgeDepthVolumeProfilePanel-BC2W3WpS.js")), Sd = o.lazy(() => import("./chunks/EdgeDepthTPOPanel-CbTLWjSe.js")), Cd = o.lazy(() => import("./chunks/EdgeDepthLiquidationPanel-Bt3fyOwF.js")), Id = o.lazy(() => import("./chunks/EdgeDepthWatchlist-C5OkGnPW.js")), Td = o.lazy(() => import("./chunks/EdgeDepthIndicators-Bu1JCT-0.js")), Hr = () => /* @__PURE__ */ t.jsx("div", { className: "h-full w-full flex items-center justify-center text-[11px] text-[var(--dim)]", children: "Loading…" }), Vr = {
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
}, Xr = ["1h", "4h", "1d", "15m", "5m", "1w", "30m", "1m"];
function Md({
  symbol: l,
  sourceProvider: n,
  timeframe: h,
  colors: T,
  active: I,
  onActivate: ne,
  kind: oe,
  onToggleKind: Me,
  syncedCrosshairTime: r,
  onCrosshairMove: we,
  syncedViewportTime: Q,
  onViewportTimeChange: _e,
  quote: nt
}) {
  const [Ae, We] = o.useState([]), be = no();
  o.useEffect(() => {
    if (oe !== "chart") return;
    let fe = !1;
    We([]);
    const W = async () => {
      try {
        const Ce = await Hu("multi_panel", { symbol: l, timeframe: h, limit: 500 });
        !fe && Ce?.length && We(Ce.map((ee) => ({
          time: Date.parse(ee.timestamp),
          open: ee.open,
          high: ee.high,
          low: ee.low,
          close: ee.close,
          volume: ee.volume
        })));
      } catch {
      }
    };
    W();
    const q = setInterval(W, 1e4);
    return () => {
      fe = !0, clearInterval(q);
    };
  }, [l, h, oe]);
  const Ee = () => {
    const fe = oe;
    return fe === "depth" ? /* @__PURE__ */ t.jsx(Qu, { symbol: l, sourceProvider: n, colors: T, syncedCrosshairTime: r, onCrosshairMove: we, onToggleKind: Me }) : fe === "edgedepth" ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(Hr, {}), children: /* @__PURE__ */ t.jsx(gd, { symbol: l, provider: n || "binance", onToggleKind: Me }) }) : ["dom", "tape", "footprint", "vpvr", "tpo", "liquidations", "watchlist", "indicators", "ed_liquidations", "ed_vpvr", "ed_footprint", "ed_tpo"].includes(fe) ? /* @__PURE__ */ t.jsxs(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(Hr, {}), children: [
      fe === "dom" && /* @__PURE__ */ t.jsx(vd, { symbol: l, provider: n || "binance" }),
      fe === "tape" && /* @__PURE__ */ t.jsx(yd, { symbol: l, provider: n || "binance" }),
      (fe === "footprint" || fe === "ed_footprint") && /* @__PURE__ */ t.jsx(kd, { symbol: l, provider: n || "binance" }),
      (fe === "vpvr" || fe === "ed_vpvr") && /* @__PURE__ */ t.jsx(wd, { symbol: l, provider: n || "binance" }),
      (fe === "tpo" || fe === "ed_tpo") && /* @__PURE__ */ t.jsx(Sd, { symbol: l, provider: n || "binance" }),
      (fe === "liquidations" || fe === "ed_liquidations") && /* @__PURE__ */ t.jsx(Cd, { symbol: l, provider: n || "binance" }),
      fe === "watchlist" && /* @__PURE__ */ t.jsx(Id, { activeSymbol: l, onSelectSymbol: (W) => {
        try {
          window.__lseShell?.selectSymbol?.(W);
        } catch {
        }
      } }),
      fe === "indicators" && /* @__PURE__ */ t.jsx(Td, { symbol: l, provider: n || "binance" })
    ] }) : Ae.length > 0 ? /* @__PURE__ */ t.jsx(
      Zo,
      {
        candles: Ae,
        symbol: l,
        timeframe: h,
        chartType: "candlestick",
        livePrice: Ae[Ae.length - 1]?.close ?? null,
        rightOffset: 6,
        colors: T,
        indicators: Ys,
        timezone: be?.data?.timezone || "local",
        syncedCrosshairTime: r ?? void 0,
        onCrosshairMove: we,
        syncedViewportTime: Q ?? void 0,
        onViewportTimeChange: _e,
        showBidAskSpread: !!nt,
        brokerBid: nt?.bid ?? null,
        brokerAsk: nt?.ask ?? null
      }
    ) : null;
  };
  return /* @__PURE__ */ t.jsx(
    "div",
    {
      onMouseDown: ne,
      style: {
        position: "relative",
        minWidth: 0,
        minHeight: 0,
        overflow: "hidden",
        border: I ? "1px solid var(--accent-bar, #888)" : "1px solid var(--edge, #2a2e39)"
      },
      children: Ee()
    }
  );
}
function jd({
  layout: l,
  syncSettings: n,
  pair: h,
  timeframe: T,
  colors: I,
  quote: ne,
  sourceProvider: oe
}) {
  const Me = Vr[l] || Vr["2x2"], { activePanel: r, panelSymbols: we, panelKinds: Q } = Jo(), _e = Math.min(r, Me.count - 1), [nt, Ae] = o.useState([]), [We, be] = o.useState(null), [Ee, fe] = o.useState(null), W = o.useMemo(() => I || so(), [I]);
  o.useEffect(() => {
    Ae((ee) => {
      const re = [...ee];
      for (let qe = re.length; qe < Me.count; qe++)
        re.push(qe === 0 ? T : Xr[qe % Xr.length]);
      return re.slice(0, Me.count);
    });
  }, [Me.count, T]);
  const q = o.useCallback((ee) => {
    n.syncCrosshair && be(ee);
  }, [n.syncCrosshair]), Ce = o.useCallback((ee) => {
    n.syncTime && fe(ee);
  }, [n.syncTime]);
  return /* @__PURE__ */ t.jsx("div", { style: {
    display: "grid",
    width: "100%",
    height: "100%",
    gap: 2,
    gridTemplateColumns: `repeat(${Me.cols}, 1fr)`,
    gridTemplateRows: `repeat(${Me.rows}, 1fr)`
  }, children: Array.from({ length: Me.count }, (ee, re) => /* @__PURE__ */ t.jsx(
    Md,
    {
      symbol: n.syncSymbol ? h : we[re] || h,
      sourceProvider: oe,
      timeframe: n.syncInterval ? T : nt[re] || T,
      colors: W,
      active: re === _e,
      onActivate: () => En.setActivePanel(re),
      kind: Q[re] || "chart",
      onToggleKind: () => {
        const qe = Q[re] || "chart", ge = ["chart", "edgedepth", "depth", "dom", "tape", "footprint", "vpvr", "tpo", "liquidations", "watchlist", "indicators"], yt = ge.indexOf(qe), kt = ge[(yt + 1) % ge.length];
        En.setPanelKind(re, kt);
      },
      syncedCrosshairTime: n.syncCrosshair ? We : null,
      onCrosshairMove: q,
      syncedViewportTime: n.syncTime ? Ee : null,
      onViewportTimeChange: Ce,
      quote: ne
    },
    re
  )) });
}
const eo = [
  "lse-drawing-favorites",
  // which drawing tools are favourited
  "lse-drawing-favorites-pos",
  // position of the floating favourites toolbar
  "chart-sidebar-width"
  // chart sidebar width
];
let Yr = !1, Ql = null;
async function Rd() {
  const l = {};
  for (const n of eo) {
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
function zr() {
  Ql && clearTimeout(Ql), Ql = setTimeout(() => {
    Ql = null, Rd();
  }, 400);
}
async function Qr() {
  if (Yr) return;
  Yr = !0;
  try {
    const h = await fetch("/api/workspace/tools");
    if (h.ok) {
      const I = (await h.json())?.value ?? {};
      for (const ne of eo) {
        const oe = I[ne];
        typeof oe == "string" && localStorage.setItem(ne, oe);
      }
    }
  } catch {
  }
  const l = localStorage.setItem.bind(localStorage), n = localStorage.removeItem.bind(localStorage);
  localStorage.setItem = (h, T) => {
    l(h, T), eo.includes(h) && zr();
  }, localStorage.removeItem = (h) => {
    n(h), eo.includes(h) && zr();
  };
}
const Ur = ["#38bdf8", "#fbbf24", "#c084fc", "#34d399", "#fb7185", "#a3e635"];
function Pd(l, n) {
  if (!l || !n.length) return [];
  const h = /* @__PURE__ */ new Map();
  for (let ne = 0; ne < n.length; ne++)
    h.set(Math.floor(n[ne].time / 1e3), ne);
  const T = [];
  let I = 0;
  for (const [ne, oe] of Object.entries(l))
    for (const [Me, r] of Object.entries(oe.series || {})) {
      const we = new Array(n.length).fill(NaN);
      let Q = 0;
      for (const [Ae, We] of r.points || []) {
        const be = h.get(Ae);
        be !== void 0 && (we[be] = We, Q++);
      }
      if (!Q) continue;
      const nt = Object.keys(oe.series).length > 1 ? `${ne} ${Me}` : ne;
      T.push({
        id: `local-${ne}-${Me}`,
        name: nt,
        // The prefix is what tells ProChart's formula evaluator to leave this
        // series alone and draw the precomputed values.
        expression: `local:${ne}:${Me}`,
        enabled: !0,
        display: oe.overlay ? "overlay" : "subplot",
        color: Ur[I++ % Ur.length],
        lineWidth: 2,
        zeroLine: !1,
        data: we,
        kind: r.kind,
        // One pane per ENGINE INDICATOR, not per column: MACD's three series
        // must share a pane and a scale or the histogram is meaningless.
        group: ne
      });
    }
  return T;
}
const Nd = o.lazy(() => import("./chunks/depth-DgOhdG7Y.js").then((l) => l.a)), Ld = o.lazy(() => import("./chunks/depth-DgOhdG7Y.js").then((l) => l.E)), Kr = o.lazy(() => import("./chunks/EdgeDepthDOMPanel-CSa5pgLO.js")), Ed = o.lazy(() => import("./chunks/EdgeDepthTapePanel-DQfRW2GA.js")), Ad = o.lazy(() => import("./chunks/EdgeDepthWatchlist-C5OkGnPW.js")), Dd = o.lazy(() => import("./chunks/EdgeDepthIndicators-Bu1JCT-0.js")), Bd = o.lazy(() => import("./chunks/EdgeDepthLayers-DRUflkF6.js")), Wd = o.lazy(() => import("./chunks/EdgeDepthLiquidationPanel-Bt3fyOwF.js")), Fd = o.lazy(() => import("./chunks/EdgeDepthVolumeProfilePanel-BC2W3WpS.js")), Od = o.lazy(() => import("./chunks/EdgeDepthFootprintPanel-FdQWkwUq.js")), _d = o.lazy(() => import("./chunks/EdgeDepthTPOPanel-CbTLWjSe.js")), $d = o.lazy(() => import("./chunks/backtest-CeqYlV1v.js").then((l) => l.bN)), Hd = o.lazy(() => import("./chunks/backtest-CeqYlV1v.js").then((l) => l.bO)), Vd = o.lazy(() => import("./chunks/econ-BeCAerYp.js")), Xd = o.lazy(() => import("./chunks/dataviz-D6zeVYjn.js")), Yd = o.lazy(() => import("./chunks/quant-CYlcHa_2.js")), zd = o.lazy(() => import("./chunks/notebooks-fOzYQotZ.js")), Qn = () => /* @__PURE__ */ t.jsx("div", { className: "h-full w-full flex items-center justify-center text-[11px] text-[var(--dim)]", children: "Loading…" }), Ud = {
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
}, wn = {
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
}, ds = (l) => {
  l.currentTarget.style.background = "var(--hover)";
}, hs = (l) => {
  l.currentTarget.style.background = "transparent";
};
function Kd({ provider: l, symbol: n, timeframe: h, candles: T, chartType: I = "candlestick", trades: ne = [], engineIndicators: oe, indicatorPatch: Me = null, quote: r = null, positions: we = [], onPositionModify: Q, onPositionClose: _e, autoSelectPositionId: nt = null }) {
  const Ae = `${l}|${n}|${h}`, [We, be] = o.useState(() => {
    try {
      const m = `${l}|${n}|${h}`, ce = localStorage.getItem(`lse-candles-${m}`);
      if (ce) {
        const ae = JSON.parse(ce);
        if (Array.isArray(ae) && ae.length > 0)
          return { key: m, older: ae.slice(-200), shift: 0 };
      }
    } catch {
    }
    return { key: Ae, older: [], shift: 0 };
  });
  We.key !== Ae && be({ key: Ae, older: [], shift: 0 });
  const Ee = o.useRef(null), fe = o.useRef(!1), [W, q] = o.useState(!1), Ce = o.useMemo(() => {
    if (!We.older.length || !T.length) {
      try {
        T.length > 0 && localStorage.setItem(`lse-candles-${Ae}`, JSON.stringify(T.slice(-200)));
      } catch {
      }
      return T;
    }
    const m = T[0].time, ce = [...We.older.filter((ae) => ae.time < m), ...T];
    try {
      localStorage.setItem(`lse-candles-${Ae}`, JSON.stringify(ce.slice(-200)));
    } catch {
    }
    return ce;
  }, [We.older, T, Ae]), ee = o.useCallback(async () => {
    if (fe.current || Ee.current === Ae) return;
    const ce = Ce;
    if (!ce.length || ce.length >= 5e4) return;
    const ae = Ae, ye = ce[0].time;
    fe.current = !0, q(!0);
    try {
      const xt = `/api/candles?provider=${encodeURIComponent(l)}&symbol=${encodeURIComponent(n)}&timeframe=${encodeURIComponent(h)}&limit=5000&end=${encodeURIComponent(new Date(ye).toISOString())}`, Le = await fetch(xt);
      if (!Le.ok) {
        let De = "";
        try {
          De = String((await Le.json()).detail || "");
        } catch {
        }
        /no (history|prints|data)|served no|no real candles/i.test(De) && (Ee.current = ae);
        return;
      }
      const jt = ((await Le.json()).candles || []).map(([De, ut, Fs, Et, Rt, ws]) => ({
        time: De < 1e12 ? De * 1e3 : De,
        open: ut,
        high: Fs,
        low: Et,
        close: Rt,
        volume: ws
      })).filter((De) => De.time < ye);
      if (!jt.length) {
        Ee.current = ae;
        return;
      }
      be((De) => De.key !== ae ? De : {
        key: ae,
        older: [...jt, ...De.older],
        shift: De.shift + jt.length
      });
    } catch {
    } finally {
      fe.current = !1, q(!1);
    }
  }, [Ce, l, n, h, Ae]), [re, qe] = o.useState(null), [ge, yt] = o.useState(null), [kt, ze] = o.useState("cursor"), [Yt, en] = o.useState(!1), [tt, pt] = o.useState(!1), [ln, Sn] = o.useState(null), [Ct, Lt] = o.useState([]), [on, zt] = o.useState(Ys), [hn, Xn] = o.useState(!1), [Ps, yl] = o.useState(!1), [ps, es] = o.useState("candles"), [xs, ms] = o.useState(() => {
    try {
      const m = typeof h == "string" ? h : "1m", ce = Xt.find((ae) => ae.label.toLowerCase() === m.toLowerCase() || ae.label === m);
      if (ce) return ce;
    } catch {
    }
    return Xt.find((m) => m.label === "1m") || Xt[5] || Xt[0];
  }), [zs, kl] = o.useState(() => {
    try {
      const m = localStorage.getItem("ed_fav_tf");
      return new Set(m ? JSON.parse(m) : ["1m", "5m", "15m", "1h", "4h", "1D"]);
    } catch {
      return /* @__PURE__ */ new Set(["1m", "5m", "15m", "1h", "4h", "1D"]);
    }
  });
  o.useEffect(() => {
    try {
      const m = String(h || "1m"), ce = Xt.find((ae) => ae.label.toLowerCase() === m.toLowerCase() || ae.label === m);
      if (ce && ce.label.toLowerCase() !== xs.label.toLowerCase())
        ms(ce);
      else if (!ce) {
        const ae = m.match(/^(\d+)([smhdwM])$/i);
        if (ae) {
          const ye = parseInt(ae[1], 10), xt = ae[2];
          let Le = 0;
          const Mt = xt.toLowerCase();
          xt === "M" ? Le = ye * 2592e6 : Mt === "s" ? Le = ye * 1e3 : Mt === "m" ? Le = ye * 6e4 : Mt === "h" ? Le = ye * 36e5 : Mt === "d" ? Le = ye * 864e5 : Mt === "w" && (Le = ye * 6048e5), Le > 0 && ms({ label: m, ms: Le, sec: Math.floor(Le / 1e3) });
        } else m.toLowerCase() === "tick" && ms({ label: "tick", ms: 0, sec: 0 });
      }
    } catch {
    }
  }, [h]);
  const [rt, wl] = o.useState(() => {
    try {
      const m = localStorage.getItem("ed_appearance");
      if (m) return { ...$r, ...JSON.parse(m) };
    } catch {
    }
    return $r;
  }), [Ge, Ns] = o.useState(!1);
  o.useEffect(() => {
    try {
      localStorage.setItem("ed_appearance", JSON.stringify(rt));
    } catch {
    }
  }, [rt]);
  const [Us, Ks] = o.useState(!1), [lo, Ls] = o.useState(!1), [qs, Es] = o.useState("SECONDS PRO"), [bn, xe] = o.useState(!1), [Gs, de] = o.useState(() => {
    try {
      const m = localStorage.getItem("ed_layers");
      if (m) return JSON.parse(m);
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
  }), Bt = o.useCallback((m) => {
    de(m);
    try {
      localStorage.setItem("ed_layers", JSON.stringify(m));
    } catch {
    }
    const ce = (ae) => m.find((ye) => ye.id === ae)?.enabled;
    zt((ae) => {
      let ye = !1;
      const xt = { ...ae };
      if (ce("vpvr") !== void 0) {
        const Le = !!ce("vpvr");
        ae.volumeProfile?.enabled !== Le && (xt.volumeProfile = { ...ae.volumeProfile, enabled: Le, numberOfRows: 48, rowWidth: 15, opacity: 60 }, ye = !0);
      }
      if (ce("session_vwap") !== void 0) {
        const Le = !!ce("session_vwap");
        ae.vwap?.enabled !== Le && (xt.vwap = { ...ae.vwap, enabled: Le, color: "#2196F3" }, ye = !0);
      }
      if (ce("prev_day") !== void 0 || ce("prev_week") !== void 0) {
        const Le = !!ce("prev_day") || !!ce("prev_week");
        ae.pivotPoints?.enabled !== Le && (xt.pivotPoints = { ...ae.pivotPoints, enabled: Le }, ye = !0);
      }
      return ye ? xt : ae;
    }), ce("liquidations");
  }, []), je = o.useCallback(() => {
    window.dispatchEvent(new CustomEvent("lset:open-indicators"));
  }, []), An = o.useCallback((m) => ({
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
  })[m] ?? null, []), It = o.useCallback((m) => {
    ze(m);
    const ce = An(m);
    yt(ce);
  }, [An]), Sl = o.useCallback((m) => {
    kl((ce) => {
      const ae = new Set(ce);
      if (ae.has(m)) ae.delete(m);
      else {
        if (ae.size >= 6) {
          const ye = ae.values().next().value;
          ye && ae.delete(ye);
        }
        ae.add(m);
      }
      try {
        localStorage.setItem("ed_fav_tf", JSON.stringify([...ae]));
      } catch {
      }
      return ae;
    });
  }, []), Ye = o.useMemo(() => ({
    candles: "candlestick",
    fp_cluster: "footprint_cluster",
    fp_profile: "footprint_profile",
    heikin_ashi: "heikin_ashi",
    line: "line",
    tpo: "tpo",
    renko: "renko",
    flow_positioning: "flow_positioning"
  })[ps] || "candlestick", [ps]), [Ze, Qe] = o.useState(null), [at, Yn] = o.useState(!1), [Cl, Ut] = o.useState(!1), [zn, ts] = o.useState(""), [ns, As] = o.useState(null), [Wt, wt] = o.useState(""), [, Zs] = o.useState(0), [rn, an] = o.useState(null), [Un, Ds] = o.useState(""), [lt, Il] = o.useState(""), [bs, Dn] = o.useState(""), [Bn, Tl] = o.useState(!1), ss = o.useRef(null), Bs = async () => {
    const m = zn.trim();
    if (!m) {
      wt("name the template first");
      return;
    }
    await window.__lseShell?.saveLayout?.(m) ? (Ut(!1), wt(""), Zs((ae) => ae + 1)) : wt("could not save this template");
  };
  o.useEffect(() => {
    if (!Ze) return;
    const m = () => {
      Qe(null), Yn(!1), Ut(!1), As(null), wt(""), an(null), Dn("");
    }, ce = (ae) => {
      ae.key === "Escape" && m();
    };
    return document.addEventListener("click", m), document.addEventListener("keydown", ce), () => {
      document.removeEventListener("click", m), document.removeEventListener("keydown", ce);
    };
  }, [Ze]);
  const Kt = Jo(), Cn = Kt.layout, Ml = Kt.sync, [Wn, ct] = o.useState(!1), [qt, Fn] = o.useState("appearance"), gs = o.useRef(Wn);
  gs.current = Wn;
  const In = o.useRef(qt);
  In.current = qt, o.useEffect(() => (Yo = (m) => {
    if (!gs.current) {
      Fn(m || "appearance"), ct(!0);
      return;
    }
    if (m && m !== In.current) {
      Fn(m);
      return;
    }
    ct(!1);
  }, () => {
    Yo = null;
  }), []), o.useEffect(() => {
    if (!Wn) return;
    const m = (ce) => {
      ce.key === "Escape" && ct(!1);
    };
    return document.addEventListener("keydown", m), () => document.removeEventListener("keydown", m);
  }, [Wn]);
  const Tn = o.useRef(null), [On, fn] = o.useState(null);
  o.useEffect(() => {
    Wn || fn(null);
  }, [Wn]);
  const jl = o.useCallback((m) => {
    if (m.target.closest("button")) return;
    const ce = Tn.current, ae = ce?.offsetParent;
    if (!ae || !ce) return;
    const ye = ae.getBoundingClientRect(), xt = ce.getBoundingClientRect(), Le = m.clientX - xt.left, Mt = m.clientY - xt.top;
    m.preventDefault();
    const jt = (ut) => {
      fn({
        x: Math.max(0, Math.min(ut.clientX - ye.left - Le, ye.width - xt.width)),
        y: Math.max(0, Math.min(ut.clientY - ye.top - Mt, ye.height - 36))
      });
    }, De = () => {
      window.removeEventListener("pointermove", jt), window.removeEventListener("pointerup", De);
    };
    window.addEventListener("pointermove", jt), window.addEventListener("pointerup", De);
  }, []), [oo, ro] = o.useState({
    color: "#e6e8ea",
    strokeWidth: 2,
    lineStyle: "solid",
    opacity: 100
  });
  o.useEffect(() => {
    let m = !0;
    return (async () => {
      const ce = await ul.getTools();
      m && ce?.drawingDefaults && ro((ae) => ({ ...ae, ...ce.drawingDefaults }));
    })(), () => {
      m = !1;
    };
  }, []);
  const ao = o.useRef(null), Rl = o.useRef(0), Ht = o.useRef(() => {
  }), Tt = o.useRef([]);
  o.useEffect(() => {
    Ko({ provider: l, symbol: n });
  }, [l, n]);
  const Gt = `${l}:${n}`, ls = o.useRef(null);
  o.useEffect(() => {
    let m = !0;
    return ls.current = null, (async () => {
      const [ce, ae] = await Promise.all([
        ul.getDrawings(Gt),
        ul.getIndicators(Gt)
      ]);
      m && (Lt(ce), zt(ae ?? Ys), Sn(null), ls.current = Gt);
    })(), () => {
      m = !1;
    };
  }, [Gt]);
  const st = o.useCallback((m) => {
    Lt(m), ls.current === Gt && ul.setDrawings(Gt, m);
  }, [Gt]), Mn = o.useCallback((m) => {
    zt(m), ls.current === Gt && ul.setIndicators(Gt, m);
  }, [Gt]);
  o.useEffect(() => {
    Me && zt((m) => ({ ...m, ...Me }));
  }, [Me]);
  const Ws = o.useCallback(() => {
    st([]), Sn(null);
  }, [st]);
  o.useCallback((m) => {
    st(Ct.filter((ce) => ce.id !== m)), Sn(null);
  }, [Ct, st]);
  const vs = o.useMemo(() => {
    const m = Pd(oe, Ce);
    return m.length ? { ...on, customIndicators: m } : on;
  }, [on, oe, Ce]), ys = no(), ks = Xu(), _n = o.useMemo(() => {
    const m = so(), ce = ys?.candles, ae = ys?.chart;
    let ye;
    return !ks || !ce || !ae ? ye = { ...m } : ye = {
      ...m,
      background: ae.backgroundColor,
      backgroundOpacity: ae.backgroundOpacity,
      grid: ae.gridColor,
      gridOpacity: ae.gridOpacity,
      axisLabel: ae.axisLabelColor,
      axisLine: ae.axisLineColor,
      crosshair: ae.crosshairColor,
      priceTickerBullish: ae.priceTickerBullish,
      priceTickerBearish: ae.priceTickerBearish,
      bullish: ce.bodyBullish,
      bearish: ce.bodyBearish,
      bullishBorder: ce.bordersBullish,
      bearishBorder: ce.bordersBearish,
      bullishWick: ce.wickBullish,
      bearishWick: ce.wickBearish
    }, rt.marketColors === "teal_rose" ? (ye.bullish = "#21b3a4", ye.bearish = "#f0426c", ye.bullishBorder = "#21b3a4", ye.bearishBorder = "#f0426c", ye.bullishWick = "#21b3a4", ye.bearishWick = "#f0426c", ye.priceTickerBullish = "#21b3a4", ye.priceTickerBearish = "#f0426c") : rt.marketColors === "green_red" && (ye.bullish = "#26a69a", ye.bearish = "#ef5350", ye.bullishBorder = "#26a69a", ye.bearishBorder = "#ef5350", ye.bullishWick = "#26a69a", ye.bearishWick = "#ef5350", ye.priceTickerBullish = "#26a69a", ye.priceTickerBearish = "#ef5350"), rt.accent === "mint" ? ye.grid = "#21b3a4" : rt.accent === "indigo" ? ye.grid = "#6366f1" : rt.accent === "amber" && (ye.grid = "#f59e0b"), rt.opacity !== void 0 && (ye.backgroundOpacity = Math.round(rt.opacity * 100)), ye;
  }, [ys, ks, rt]), $n = ys?.data?.timezone || "local", pn = Ud[h] ?? 36e5, gn = T.length ? T[T.length - 1].close : null, [co, Js] = o.useState("");
  o.useEffect(() => {
    const m = () => {
      if (h === "tick") {
        Js("");
        return;
      }
      if (!n || !Zr(n)) {
        Js("");
        return;
      }
      const ae = Date.now(), ye = Math.ceil(ae / pn) * pn, xt = Math.max(0, ye - ae), Le = Math.floor(xt / 1e3), Mt = Math.floor(Le / 60) % 60, jt = Math.floor(Le / 3600), De = (ut) => String(ut).padStart(2, "0");
      Js(jt > 0 ? `${jt}:${De(Mt)}:${De(Le % 60)}` : `${Mt}:${De(Le % 60)}`);
    };
    m();
    const ce = setInterval(m, 1e3);
    return () => clearInterval(ce);
  }, [n, pn, h]), o.useMemo(
    () => Object.values(on || {}).filter((m) => m && m.enabled).length,
    [on]
  );
  const io = o.useMemo(
    () => [
      ...ne.map((m, ce) => ({
        id: `trade-${ce}`,
        price: m.price,
        side: m.side,
        quantity: m.quantity ?? 0,
        symbol: n,
        pnl: m.pnl
      })),
      ...we.map((m) => ({ ...m, symbol: n }))
    ],
    [ne, we, n]
  );
  return n ? /* @__PURE__ */ t.jsxs("div", { className: "relative h-full w-full flex flex-col bg-[#1c1c1c]", style: { overflow: "visible" }, children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-1 px-2 py-1 border-b border-[#3a3a3a] bg-[#2a2a2a] text-[11px] shrink-0 flex-wrap overflow-visible relative z-[60]", children: [
      /* @__PURE__ */ t.jsx("span", { className: "font-bold tracking-wider opacity-80 text-[#e8e8e8]", children: "EDGEDEPTH" }),
      /* @__PURE__ */ t.jsx("span", { className: "font-mono font-semibold text-[#e8e8e8] ml-1", children: n }),
      /* @__PURE__ */ t.jsx("div", { className: "flex items-center gap-0.5 ml-2", children: ["binance", "coinbase", "hyperliquid"].map((m) => /* @__PURE__ */ t.jsx("button", { onClick: () => {
        try {
          window.__lseShell?.setProvider?.(m);
        } catch {
        }
      }, className: `px-1.5 py-0.5 text-[9px] rounded border ${l === m ? "bg-[#21b3a4] text-black border-[#21b3a4] font-bold" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434]"}`, title: `${m} ${m === "hyperliquid" ? "15ms ⚡ ultra-fast" : m === "binance" ? "20ms fast" : "50ms"}`, children: m === "hyperliquid" ? "HL ⚡" : m === "binance" ? "BINANCE" : "COINBASE" }, m)) }),
      /* @__PURE__ */ t.jsxs("span", { className: "text-[9px] px-1.5 py-0.5 rounded bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9]", children: [
        l.toUpperCase(),
        " ",
        l === "hyperliquid" ? "⚡15ms" : l === "binance" ? "20ms" : l === "coinbase" ? "50ms" : "",
        " • ",
        h,
        " • LIVE"
      ] }),
      /* @__PURE__ */ t.jsx("div", { className: "ml-2", style: { overflow: "visible", position: "relative", zIndex: 50 }, children: /* @__PURE__ */ t.jsx(dd, { value: xs, onChange: (m) => {
        if (m.pro) {
          Es("SECONDS PRO"), Ls(!0);
          return;
        }
        ms(m);
        try {
          const ce = window.__lseShell;
          ce?.setTimeframe && ce.setTimeframe(m.label);
        } catch {
        }
      }, favs: zs, onToggleFav: Sl }) }),
      /* @__PURE__ */ t.jsx("div", { className: "ml-1", children: /* @__PURE__ */ t.jsx(ud, { value: ps, onChange: es }) }),
      /* @__PURE__ */ t.jsxs("select", { value: Kt.panelKinds[0] || "chart", onChange: (m) => En.setPanelKind(0, m.target.value), className: "ml-1 bg-[#262626] border border-[#3a3a3a] rounded px-1 py-0.5 text-[10px] text-[#e8e8e8]", children: [
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
        /* @__PURE__ */ t.jsx(md, { onSelect: (m) => En.setPanelKind(0, m) }),
        /* @__PURE__ */ t.jsxs("button", { onClick: () => xe((m) => !m), className: "px-2 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8] hover:bg-[#343434]", children: [
          "Layers ",
          bn ? "▲" : "▼"
        ] }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => Ks(!0), className: "px-2 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8] hover:bg-[#343434]", children: "Find Symbol" })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "ml-auto flex items-center gap-1", children: [
        /* @__PURE__ */ t.jsx("span", { className: "text-[10px] text-[#b9b9b9]", children: "RT" }),
        /* @__PURE__ */ t.jsx("div", { className: "w-2 h-2 rounded-full bg-[#21b3a4] animate-pulse", title: "follow-live streaming" }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => {
          Es("RT MODE"), Ls(!0);
        }, className: "px-1.5 py-0.5 rounded border border-[#3a3a3a] text-[9px] bg-[#21b3a4]/20 text-[#21b3a4] hover:bg-[#21b3a4]/30", children: "RT MODE ●" }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => Ns((m) => !m), className: "px-2 py-0.5 rounded border border-[#3a3a3a] text-[10px] hover:bg-[#343434] text-[#e8e8e8]", children: "⚙ Appearance" }),
        /* @__PURE__ */ t.jsx("button", { onClick: je, className: "px-2 py-0.5 rounded border border-[#3a3a3a] text-[10px] hover:bg-[#343434] text-[#e8e8e8]", children: "Indicators" })
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "relative flex-1 min-h-0 w-full flex", children: [
      /* @__PURE__ */ t.jsx(
        id,
        {
          activeTool: kt,
          onToolSelect: It,
          magnet: tt,
          onToggleMagnet: () => pt((m) => !m),
          hiddenAll: Ps,
          onToggleHidden: () => yl((m) => !m),
          onClearAll: Ws,
          collapsed: Yt,
          onToggleCollapsed: () => en((m) => !m)
        }
      ),
      /* @__PURE__ */ t.jsx(
        "div",
        {
          ref: ss,
          className: "relative flex-1 min-w-0",
          style: Bn ? { transform: "scaleY(-1)" } : void 0,
          onContextMenu: (m) => {
            m.preventDefault(), Yn(!1), an(null), Dn("");
            let ce = null;
            if (Cn === "1x1" && re && ss.current) {
              const ye = ss.current.getBoundingClientRect(), xt = Bn ? ye.height - (m.clientY - ye.top) : m.clientY - ye.top, Le = re.yToPrice(xt);
              Number.isFinite(Le) && Le > 0 && (ce = Le);
            }
            const ae = window.__lseShell?.tradeInfo?.() || null;
            Qe({
              x: Math.min(m.clientX, window.innerWidth - 240),
              y: Math.min(m.clientY, window.innerHeight - (ae?.available ? 360 : 230)),
              price: ce,
              ref: gn,
              trade: ae
            });
          },
          children: Cn !== "1x1" ? /* @__PURE__ */ t.jsx(
            jd,
            {
              layout: Cn,
              syncSettings: Ml,
              pair: n,
              timeframe: h,
              colors: _n,
              quote: r,
              sourceProvider: l
            }
          ) : Kt.panelKinds[0] === "depth" ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(Qn, {}), children: /* @__PURE__ */ t.jsx(
            Nd,
            {
              symbol: n,
              sourceProvider: l,
              colors: _n,
              onToggleKind: () => En.setPanelKind(0, "chart")
            }
          ) }) : Kt.panelKinds[0] === "edgedepth" ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(Qn, {}), children: /* @__PURE__ */ t.jsx(
            Ld,
            {
              symbol: n,
              provider: l,
              onToggleKind: () => En.setPanelKind(0, "chart"),
              liqColormap: rt.liqColormap,
              obColormap: rt.obColormap,
              opacity: rt.opacity,
              intensity: rt.intensity,
              gamma: rt.gamma,
              noiseFloor: rt.noiseFloor,
              tickPerRow: rt.tickPerRow,
              halfLife: rt.halfLife
            }
          ) }) : ["orderflow", "dom", "tape", "footprint", "vpvr", "tpo", "cvd", "liquidations", "ed_liquidations", "ed_vpvr", "ed_footprint", "ed_tpo", "watchlist", "indicators"].includes(Kt.panelKinds[0]) ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(Qn, {}), children: (() => {
            const m = Kt.panelKinds[0];
            return m === "dom" ? /* @__PURE__ */ t.jsx(Kr, { symbol: n, provider: l }) : m === "tape" ? /* @__PURE__ */ t.jsx(Ed, { symbol: n, provider: l }) : m === "footprint" ? /* @__PURE__ */ t.jsx(Od, { symbol: n, provider: l }) : m === "vpvr" ? /* @__PURE__ */ t.jsx(Fd, { symbol: n, provider: l }) : m === "tpo" ? /* @__PURE__ */ t.jsx(_d, { symbol: n, provider: l }) : m === "liquidations" ? /* @__PURE__ */ t.jsx(Wd, { symbol: n, provider: l, colormap: rt.liqColormap, intensity: rt.intensity, opacity: rt.opacity, gamma: rt.gamma, noiseFloor: rt.noiseFloor, tickPerRow: rt.tickPerRow, halfLife: rt.halfLife, lowPeak: rt.lowPeak }) : m === "watchlist" ? /* @__PURE__ */ t.jsx(Ad, { activeSymbol: n, onSelectSymbol: (ce) => {
              try {
                window.__lseShell?.selectSymbol?.(ce);
              } catch {
              }
            } }) : m === "indicators" ? /* @__PURE__ */ t.jsx(Dd, { symbol: n, provider: l }) : /* @__PURE__ */ t.jsx(Kr, { symbol: n, provider: l });
          })() }) : /* @__PURE__ */ t.jsx(t.Fragment, { children: /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
            /* @__PURE__ */ t.jsx(
              Zo,
              {
                candles: Ce,
                symbol: n,
                timeframe: h,
                chartType: Ye,
                onLoadMore: ee,
                isLoadingMore: W,
                prependShift: We.shift,
                livePrice: gn,
                countdown: co,
                timezone: $n,
                rightOffset: 6,
                colors: _n,
                indicators: vs,
                onIndicatorsChange: Mn,
                onRemoveEngineIndicator: (m) => window.__lseShell?.removeIndicator?.(m),
                onEditEngineIndicator: (m) => {
                  window.__lseShell?.editIndicator?.(m) || je();
                },
                drawings: Ct,
                selectedDrawingId: ln,
                drawingCursorRef: Tt,
                requestRedrawRef: ao,
                scrollOffsetRef: Rl,
                onScrollSync: () => Ht.current?.(),
                onConverterReady: qe,
                onOpenSettings: je,
                positionLines: io,
                onPositionModify: Q,
                onPositionClose: _e,
                autoSelectPositionId: nt,
                showBidAskSpread: !!r,
                brokerBid: r?.bid ?? null,
                brokerAsk: r?.ask ?? null
              },
              Ae
            ),
            /* @__PURE__ */ t.jsx(
              Yu,
              {
                activeTool: ge,
                onToolSelect: yt,
                drawings: Ct,
                onDrawingsChange: st,
                selectedDrawingId: ln,
                onSelectDrawing: Sn,
                converter: re,
                scrollSyncRef: Ht,
                scrollOffsetRef: Rl,
                drawingCursorRef: Tt,
                requestRedrawRef: ao,
                toolSettings: oo,
                isLocked: hn,
                isHidden: Ps,
                currentSymbol: n,
                timeframeMs: pn,
                currentPrice: gn ?? void 0,
                candles: T
              }
            )
          ] }) })
        }
      ),
      Wn && /* @__PURE__ */ t.jsxs(
        "div",
        {
          ref: Tn,
          className: "absolute z-[95] w-80",
          style: {
            ...On ? { left: On.x, top: On.y } : { top: 8, right: 8 },
            background: "var(--panel)",
            border: "1px solid var(--edge)",
            borderRadius: 3,
            boxShadow: "0 10px 32px var(--shadow)"
          },
          children: [
            /* @__PURE__ */ t.jsxs(
              "div",
              {
                onPointerDown: jl,
                className: "flex items-center justify-between px-3 py-1.5 select-none",
                style: { borderBottom: "1px solid var(--edge)", cursor: "move" },
                children: [
                  /* @__PURE__ */ t.jsx("span", { style: { fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "var(--dim)" }, children: "CHART LAYOUT" }),
                  /* @__PURE__ */ t.jsx(
                    "button",
                    {
                      onClick: () => ct(!1),
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
                  onClick: () => Fn("appearance"),
                  className: "flex-1 px-3 py-1.5 text-xs font-medium transition-colors",
                  style: qt === "appearance" ? { color: "var(--text)", background: "var(--active)" } : { color: "var(--dim)" },
                  children: "Appearance"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: () => Fn("chart"),
                  className: "flex-1 px-3 py-1.5 text-xs font-medium transition-colors",
                  style: qt === "chart" ? { color: "var(--text)", background: "var(--active)" } : { color: "var(--dim)" },
                  children: "Chart"
                }
              )
            ] }),
            /* @__PURE__ */ t.jsx("div", { className: "max-h-[70vh] overflow-y-auto", children: qt === "appearance" ? /* @__PURE__ */ t.jsx(zu, { hideHeader: !0, onBack: () => ct(!1) }) : /* @__PURE__ */ t.jsx(Uu, { hideHeader: !0, onBack: () => ct(!1) }) }),
            /* @__PURE__ */ t.jsx(
              "div",
              {
                className: "flex justify-end px-3 py-2",
                style: { borderTop: "1px solid var(--edge)" },
                children: /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    onClick: () => ct(!1),
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
      Ge && /* @__PURE__ */ t.jsx("div", { className: "absolute top-10 right-2 z-[90]", children: /* @__PURE__ */ t.jsx(fd, { settings: rt, onChange: wl, onClose: () => Ns(!1) }) }),
      bn && /* @__PURE__ */ t.jsx("div", { className: "absolute top-10 left-[320px] z-[90]", children: /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx("div", { className: "p-2 text-[10px] text-[#b9b9b9]", children: "Loading layers..." }), children: /* @__PURE__ */ t.jsx(Bd, { layers: Gs, onChange: Bt }) }) }),
      /* @__PURE__ */ t.jsx(pd, { open: Us, onClose: () => Ks(!1), onSelect: (m) => {
        try {
          window.__lseShell?.selectSymbol?.(m);
        } catch {
        }
      } }),
      /* @__PURE__ */ t.jsx(bd, { open: lo, onClose: () => Ls(!1), feature: qs }),
      Ze && /* @__PURE__ */ t.jsxs(
        "div",
        {
          className: "fixed z-[110]",
          style: {
            left: Ze.x,
            top: Ze.y,
            minWidth: 190,
            padding: "2px 0 6px",
            background: "var(--panel)",
            border: "1px solid var(--edge)",
            borderRadius: 2,
            boxShadow: "0 6px 20px var(--shadow)",
            fontSize: 12,
            color: "var(--text)"
          },
          onClick: (m) => m.stopPropagation(),
          children: [
            Ze.trade?.available && (() => {
              const m = Ze.trade, ce = (De) => window.__lseShell?.fmtPrice?.(De) ?? String(De), ae = (De) => De === "limit" ? "Limit" : "Stop";
              if (rn) {
                const De = {
                  flex: 1,
                  minWidth: 0,
                  padding: "3px 6px",
                  fontSize: 12,
                  color: "var(--text)",
                  background: "var(--bg2)",
                  border: "1px solid var(--edge)",
                  borderRadius: 2
                }, ut = {
                  width: 38,
                  fontSize: 11,
                  color: "var(--dim)",
                  flexShrink: 0
                }, Fs = () => {
                  const Rt = parseFloat(Un), ws = parseFloat(lt);
                  if (!(Rt > 0)) {
                    Dn("enter a price");
                    return;
                  }
                  if (!(ws > 0)) {
                    Dn("enter a size");
                    return;
                  }
                  window.__lseShell?.quickOrder?.(rn.side, rn.otype, Rt, ws), Qe(null), an(null);
                }, Et = (Rt) => {
                  Rt.stopPropagation(), Rt.key === "Enter" && Fs(), Rt.key === "Escape" && (an(null), Dn(""));
                };
                return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                  /* @__PURE__ */ t.jsxs("div", { style: { ...wn, cursor: "default", fontWeight: 600 }, children: [
                    rn.side === "buy" ? "Buy" : "Sell",
                    " ",
                    ae(rn.otype),
                    " · ",
                    m.symbol
                  ] }),
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      style: { display: "flex", gap: 6, alignItems: "center", margin: "2px 10px 4px" },
                      onClick: (Rt) => Rt.stopPropagation(),
                      children: [
                        /* @__PURE__ */ t.jsx("span", { style: ut, children: "Price" }),
                        /* @__PURE__ */ t.jsx(
                          "input",
                          {
                            autoFocus: !0,
                            value: Un,
                            spellCheck: !1,
                            inputMode: "decimal",
                            style: De,
                            onChange: (Rt) => Ds(Rt.target.value),
                            onKeyDown: Et
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
                        /* @__PURE__ */ t.jsx("span", { style: ut, children: "Units" }),
                        /* @__PURE__ */ t.jsx(
                          "input",
                          {
                            value: lt,
                            spellCheck: !1,
                            inputMode: "decimal",
                            style: De,
                            onChange: (Rt) => Il(Rt.target.value),
                            onKeyDown: Et
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
                              an(null), Dn("");
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
                            onClick: Fs,
                            children: "Place"
                          }
                        )
                      ]
                    }
                  ),
                  bs && /* @__PURE__ */ t.jsx("div", { style: { ...wn, color: "#e05d5d", cursor: "default" }, children: bs }),
                  /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: "1px solid var(--edge)" } })
                ] });
              }
              const ye = m.qty != null ? `${m.qty} ` : "", xt = [
                { label: `Buy ${ye}${m.symbol} at market`, side: "buy", otype: "market" },
                { label: `Sell ${ye}${m.symbol} at market`, side: "sell", otype: "market" }
              ], Le = Ze.price, Mt = Ze.ref, jt = m.pendingTypes || [];
              if (Le != null && Mt != null && Le !== Mt && jt.length) {
                const De = Le < Mt ? [{ side: "buy", otype: "limit" }, { side: "sell", otype: "stop" }] : [{ side: "sell", otype: "limit" }, { side: "buy", otype: "stop" }];
                for (const ut of De)
                  jt.includes(ut.otype) && xt.push({ ...ut, label: `${ut.side === "buy" ? "Buy" : "Sell"} ${ae(ut.otype)} @ ${ce(Le)}…` });
              }
              return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                xt.map((De) => /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    className: "w-full text-left",
                    style: wn,
                    onMouseEnter: ds,
                    onMouseLeave: hs,
                    onClick: (ut) => {
                      if (De.otype === "market") {
                        window.__lseShell?.quickOrder?.(De.side, De.otype, Ze.price), Qe(null);
                        return;
                      }
                      ut.stopPropagation(), an({ side: De.side, otype: De.otype }), Ds(Le != null ? String(+Le.toFixed(Le >= 1e3 ? 2 : Le >= 100 ? 3 : Le >= 1 ? 4 : 6)) : ""), Il(m.qty != null ? String(m.qty) : ""), Dn("");
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
                style: { ...wn, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 },
                onMouseEnter: ds,
                onMouseLeave: hs,
                onClick: () => Yn((m) => !m),
                children: [
                  /* @__PURE__ */ t.jsx("span", { children: "Chart template" }),
                  /* @__PURE__ */ t.jsx("span", { style: { color: "var(--dim)" }, children: at ? "▾" : "▸" })
                ]
              }
            ),
            at && /* @__PURE__ */ t.jsxs("div", { className: "max-h-48 overflow-y-auto", style: { borderTop: "1px solid var(--edge)", borderBottom: "1px solid var(--edge)", margin: "3px 0" }, children: [
              (window.__lseShell?.layouts?.() || []).length === 0 ? /* @__PURE__ */ t.jsx("div", { style: { ...wn, color: "var(--dim)" }, children: "No saved templates yet" }) : window.__lseShell.layouts().map((m) => /* @__PURE__ */ t.jsxs(
                "div",
                {
                  style: { ...wn, display: "flex", alignItems: "center", gap: 8, paddingLeft: 20, cursor: "pointer" },
                  onMouseEnter: ds,
                  onMouseLeave: hs,
                  onClick: () => {
                    window.__lseShell?.applyLayout?.(m.id), Qe(null);
                  },
                  children: [
                    /* @__PURE__ */ t.jsx("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: m.name }),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        title: ns === m.id ? "Click again to delete" : "Delete template",
                        style: {
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          fontSize: ns === m.id ? 11 : 13,
                          lineHeight: 1,
                          padding: "0 2px",
                          color: ns === m.id ? "#e05d5d" : "var(--dim)"
                        },
                        onClick: async (ce) => {
                          if (ce.stopPropagation(), ns !== m.id) {
                            As(m.id);
                            return;
                          }
                          await window.__lseShell?.deleteLayout?.(m.id), As(null), Zs((ae) => ae + 1);
                        },
                        children: ns === m.id ? "sure?" : "×"
                      }
                    )
                  ]
                },
                m.id
              )),
              Cl ? /* @__PURE__ */ t.jsxs(
                "div",
                {
                  style: { display: "flex", gap: 4, margin: "3px 12px 5px", alignItems: "center" },
                  onClick: (m) => m.stopPropagation(),
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
                        onChange: (m) => ts(m.target.value),
                        onKeyDown: async (m) => {
                          if (m.stopPropagation(), m.key === "Escape") {
                            Ut(!1);
                            return;
                          }
                          m.key === "Enter" && await Bs();
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
                        onClick: Bs,
                        children: "Save"
                      }
                    )
                  ]
                }
              ) : /* @__PURE__ */ t.jsx(
                "button",
                {
                  className: "w-full text-left",
                  style: { ...wn, paddingLeft: 20, color: "var(--dim)" },
                  onMouseEnter: ds,
                  onMouseLeave: hs,
                  onClick: (m) => {
                    m.stopPropagation(), ts(window.__lseShell?.layoutDefaultName?.() || ""), wt(""), Ut(!0);
                  },
                  children: "+ Save current as template…"
                }
              ),
              Wt && /* @__PURE__ */ t.jsx("div", { style: { ...wn, paddingLeft: 20, color: "#e05d5d" }, children: Wt })
            ] }),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "w-full text-left",
                style: wn,
                onMouseEnter: ds,
                onMouseLeave: hs,
                onClick: () => {
                  ss.current?.querySelector('button[title="Reset view"]')?.click(), Qe(null);
                },
                children: "Reset chart view"
              }
            ),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "w-full text-left",
                style: wn,
                onMouseEnter: ds,
                onMouseLeave: hs,
                onClick: () => {
                  Tl((m) => !m), Qe(null);
                },
                children: Bn ? "Unflip chart" : "Flip chart"
              }
            ),
            Ct.length > 0 && /* @__PURE__ */ t.jsxs(
              "button",
              {
                className: "w-full text-left",
                style: wn,
                onMouseEnter: ds,
                onMouseLeave: hs,
                onClick: () => {
                  Ws(), Qe(null);
                },
                children: [
                  "Remove drawings (",
                  Ct.length,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: "1px solid var(--edge)" } }),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "w-full text-left",
                style: wn,
                onMouseEnter: ds,
                onMouseLeave: hs,
                onClick: () => {
                  Fn("appearance"), ct(!0), Qe(null);
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
function qd({ symbol: l, timeframe: n, candles: h, quote: T }) {
  const I = no(), ne = o.useMemo(() => so(), []);
  return !l || !h.length ? /* @__PURE__ */ t.jsx("div", { className: "h-full w-full" }) : /* @__PURE__ */ t.jsx(
    Zo,
    {
      candles: h,
      symbol: l,
      timeframe: n,
      chartType: "candlestick",
      livePrice: h[h.length - 1]?.close ?? null,
      rightOffset: 6,
      colors: ne,
      indicators: Ys,
      timezone: I?.data?.timezone || "local",
      showBidAskSpread: !!T,
      brokerBid: T?.bid ?? null,
      brokerAsk: T?.ask ?? null
    }
  );
}
const Rs = /* @__PURE__ */ new Map();
function qr(l) {
  const n = Rs.get(l);
  n && n.root.render(
    /* @__PURE__ */ t.jsx(Go, { children: /* @__PURE__ */ t.jsx(qo, { children: /* @__PURE__ */ t.jsx(qd, { ...n.props }) }) })
  );
}
const Gd = {
  mount(l, n = {}) {
    Rs.has(l) || Rs.set(l, { root: fs(l), props: {} });
    const h = Rs.get(l);
    h.props = { ...h.props, ...to(n) }, qr(l);
  },
  update(l, n) {
    const h = Rs.get(l);
    h && (h.props = { ...h.props, ...to(n) }, qr(l));
  },
  unmount(l) {
    const n = Rs.get(l);
    n && (n.root.unmount(), Rs.delete(l));
  }
};
function Zd() {
  const l = Jo();
  return /* @__PURE__ */ t.jsx(
    Ku,
    {
      selectedLayout: l.layout,
      onLayoutChange: (n) => En.setLayout(n),
      syncSettings: l.sync,
      onSyncSettingsChange: (n) => En.setSync(n),
      isMultiPanelActive: l.layout !== "1x1",
      onExitMultiPanel: () => En.setLayout("1x1")
    }
  );
}
let Xs = null, Yo = null, zo = null, vl = {
  provider: "demo",
  symbol: "",
  timeframe: "1h",
  candles: [],
  chartType: "candlestick",
  trades: [],
  engineIndicators: void 0
};
function Vo() {
  Xs && Xs.render(
    /* @__PURE__ */ t.jsx(Go, { children: /* @__PURE__ */ t.jsx(qo, { children: /* @__PURE__ */ t.jsx(Kd, { ...vl, indicatorPatch: zo }) }) })
  );
}
const Jd = {
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
}, Gr = 1e12;
function to(l) {
  const n = { ...l };
  return l.chartType && (n.chartType = Jd[l.chartType] ?? "candlestick"), "symbol" in l && !l.symbol && (n.symbol = ""), l.candles?.length && l.candles[0].time < Gr && (n.candles = l.candles.map((h) => ({ ...h, time: h.time * 1e3 }))), l.trades?.length && l.trades[0].time < Gr && (n.trades = l.trades.map((h) => ({ ...h, time: h.time * 1e3 }))), n;
}
const Qo = {
  async mount(l, n = {}) {
    vl = { ...vl, ...to(n) }, Xs || (Xs = fs(l)), await Qr(), Vo();
  },
  update(l) {
    vl = { ...vl, ...to(l) }, Vo();
  },
  unmount() {
    Xs?.unmount(), Xs = null;
  },
  openAppearance(l) {
    Yo?.(l);
  },
  invalidateWorkspaceSection(l) {
    Vu(l);
  },
  setIndicators(l) {
    zo = { ...zo || {}, ...l }, Vo();
  },
  indicatorKeys() {
    return Object.keys(Ys);
  },
  indicatorDefaults() {
    return JSON.parse(JSON.stringify(Ys));
  }
}, Qd = new qu(), Uo = { inReplay: !1 };
function eh({ onExit: l }) {
  const [n, h] = o.useState(!0), T = Jr();
  o.useEffect(() => {
    h(!0);
  }, [T.key]);
  const I = (ne) => {
    h(ne), ne || setTimeout(() => {
      Uo.inReplay || l();
    }, 150);
  };
  return /* @__PURE__ */ t.jsx("div", { className: "h-full w-full bg-[#0b0d12]", children: /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(Qn, {}), children: /* @__PURE__ */ t.jsx(Hd, { open: n, onOpenChange: I }) }) });
}
function th({ provider: l }) {
  const [n] = Ju(), h = Jr(), T = n.get("sym"), I = h.pathname.split("/").pop() || "", ne = n.get("provider") || l;
  return Ko({ provider: ne, symbol: T || I }), o.useEffect(() => (Uo.inReplay = !0, () => {
    Uo.inReplay = !1;
  }), []), /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(Qn, {}), children: /* @__PURE__ */ t.jsx($d, {}) });
}
let pl = null;
const nh = {
  async mount(l, n = {}) {
    const h = n.provider || "demo", T = n.onExit || (() => {
    });
    pl || (pl = fs(l)), Ko({ provider: h, symbol: "" }), await Qr(), pl.render(
      /* @__PURE__ */ t.jsx(Gu, { client: Qd, children: /* @__PURE__ */ t.jsx(Go, { initialEntries: ["/"], children: /* @__PURE__ */ t.jsxs(qo, { children: [
        /* @__PURE__ */ t.jsxs(Zu, { children: [
          /* @__PURE__ */ t.jsx(Fr, { path: "/backtest/:pair", element: /* @__PURE__ */ t.jsx(th, { provider: h }) }),
          /* @__PURE__ */ t.jsx(Fr, { path: "*", element: /* @__PURE__ */ t.jsx(eh, { onExit: T }) })
        ] }),
        /* @__PURE__ */ t.jsx(ed, { theme: "dark", position: "bottom-right" })
      ] }) }) })
    );
  },
  unmount() {
    pl?.unmount(), pl = null;
  }
};
let xl = null;
const sh = {
  mount(l, n = {}) {
    xl || (xl = fs(l)), xl.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(Qn, {}), children: /* @__PURE__ */ t.jsx(Vd, { onBack: n.onBack, initialView: n.view }) })
    );
  },
  unmount() {
    xl?.unmount(), xl = null;
  }
};
let ml = null;
const lh = {
  mount(l) {
    ml || (ml = fs(l)), ml.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(Qn, {}), children: /* @__PURE__ */ t.jsx(Xd, {}) })
    );
  },
  unmount() {
    ml?.unmount(), ml = null;
  }
};
let bl = null;
const oh = {
  mount(l) {
    bl || (bl = fs(l)), bl.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(Qn, {}), children: /* @__PURE__ */ t.jsx(Yd, {}) })
    );
  },
  unmount() {
    bl?.unmount(), bl = null;
  }
};
let gl = null;
const rh = {
  mount(l) {
    gl || (gl = fs(l)), gl.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(Qn, {}), children: /* @__PURE__ */ t.jsx(zd, {}) })
    );
  },
  unmount() {
    gl?.unmount(), gl = null;
  }
};
Qo.mountLayoutButton = (l) => {
  fs(l).render(/* @__PURE__ */ t.jsx(Zd, {}));
};
Qo.layoutStore = En;
window.LSEChart = Qo;
window.LSEChartPanes = Gd;
window.LSEManualBacktest = nh;
window.LSEEconCalendar = sh;
window.LSEDataViz = lh;
window.LSEQuantModels = oh;
window.LSENotebooks = rh;
export {
  Qo as default
};
