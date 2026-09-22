import { r as l, i as Br, j as t, g as Ii, q as ws } from "./chunks/react-vendor-C0yw3i6b.js";
import { n as Wr, o as Dr, p as Ri, q as Pi, r as ji, s as Ni, t as Li, u as Ei, v as Ai, w as Bi, x as Wi, y as Di, z as Fi, A as Oi, C as _i, D as $i, E as Hi, F as Vi, G as Xi, H as Yi, J as zi, K as Ki, M as Ui, N as qi, O as Gi, Q as Zi, R as Ji, U as Qi, V as ec, W as tc, X as nc, Y as sc, Z as oc, _ as lc, $ as rc, a0 as ac, a1 as ic, a2 as cc, a3 as uc, a4 as dc, a5 as hc, a6 as fc, a7 as pc, a8 as mc, a9 as xc, aa as bc, ab as gc, ac as vc, ad as yc, ae as kc, af as wc, ag as Sc, ah as Cc, ai as Mc, aj as Tc, ak as Ic, al as Rc, am as Pc, an as jc, ao as Nc, ap as Lc, aq as Ec, ar as Ac, as as Bc, at as Wc, au as Dc, av as Fc, aw as Oc, ax as _c, ay as $c, az as Hc, aA as Vc, aB as Xc, aC as Yc, aD as zc, aE as Kc, aF as Uc, aG as qc, aH as Gc, aI as Zc, aJ as Jc, aK as Qc, aL as eu, aM as tu, aN as nu, aO as su, aP as ou, aQ as lu, aR as ru, aS as au, aT as iu, aU as cu, aV as uu, aW as du, aX as hu, aY as fu, aZ as pu, a_ as mu, a$ as xu, b0 as bu, b1 as gu, b2 as vu, b3 as yu, b4 as ku, b5 as Ze, b6 as wu, b7 as Su, b8 as rl, b9 as al, ba as Cu, bb as Mu, bc as Tu, bd as Iu, be as Ru, bf as Pu, bg as ju, bh as Nu, bi as _l, bj as Lu, bk as Eu, bl as Au, bm as Bu, bn as Wu, g as Du, bo as Fu, bp as Ou, bq as _u, br as Fr, bs as Ko, bt as $u, bu as Qr, bv as Hu, bw as Vu, bx as Xu, by as Uo, bz as Yu, bA as zu, bB as Ku, bC as Uu, bD as qs, bE as qu, bF as Kl, bG as Ul, bH as mo, bI as Gu, bJ as Zu, bK as Ju, bL as Qu, bM as ed } from "./chunks/backtest-CeqYlV1v.js";
import { au as qo, av as Go, m as Zo, aw as Jo } from "./chunks/ui-DZwdMnFY.js";
import { Q as td, d as nd, M as ql, R as sd, e as Or, c as od, a as ea } from "./chunks/router-query-iQy8iLKR.js";
import { D as ld } from "./chunks/depth-Cd6YmxgB.js";
import { $ as rd } from "./chunks/ui-heavy-BL_8guwx.js";
function _r(o, n) {
  const { closes: d, highs: T, lows: M, opens: se, volumes: U, timestamps: Me } = o;
  let r = null;
  return n.movingAverages?.enabled && n.movingAverages.lines?.length > 0 && (r = n.movingAverages.lines.map((re) => {
    let ze;
    switch (re.type) {
      case "SMA":
        ze = Ri(d, re.period);
        break;
      case "SMMA":
        ze = Dr(d, re.period);
        break;
      case "EMA":
      default:
        ze = Wr(d, re.period);
        break;
    }
    return { data: ze, color: re.color, name: `${re.type} ${re.period}` };
  })), {
    rsi: n.rsi?.enabled ? ku(d, n.rsi.period) : null,
    macd: n.macd?.enabled ? yu(d, n.macd.fast, n.macd.slow, n.macd.signal) : null,
    ema: n.ema?.enabled ? n.ema.periods.map((re) => Wr(d, re)) : null,
    bollinger: n.bollinger?.enabled ? vu(d, n.bollinger.period, n.bollinger.stdDev) : null,
    movingAverages: r,
    atr: n.atr?.enabled ? gu(T, M, d, n.atr.period) : null,
    stochastic: n.stochastic?.enabled ? bu(T, M, d, n.stochastic.kPeriod, n.stochastic.dPeriod, n.stochastic.smooth) : null,
    williamsR: n.williamsR?.enabled ? xu(T, M, d, n.williamsR.period) : null,
    cci: n.cci?.enabled ? mu(T, M, d, n.cci.period) : null,
    adx: n.adx?.enabled ? pu(T, M, d, n.adx.period) : null,
    roc: n.roc?.enabled ? fu(d, n.roc.period) : null,
    vwap: n.vwap?.enabled ? hu(T, M, d, U, Me) : null,
    ichimoku: n.ichimoku?.enabled ? du(T, M, d, n.ichimoku.tenkanPeriod, n.ichimoku.kijunPeriod, n.ichimoku.senkouBPeriod, n.ichimoku.displacement) : null,
    parabolicSAR: n.parabolicSAR?.enabled ? uu(T, M, n.parabolicSAR.afStart, n.parabolicSAR.afStep, n.parabolicSAR.afMax) : null,
    keltner: n.keltner?.enabled ? cu(T, M, d, n.keltner.emaPeriod, n.keltner.atrPeriod, n.keltner.multiplier) : null,
    pivotPoints: n.pivotPoints?.enabled ? iu(Me, T, M, d) : null,
    supertrend: n.supertrend?.enabled ? au(T, M, d, n.supertrend.period, n.supertrend.multiplier) : null,
    donchian: n.donchian?.enabled ? ru(T, M, n.donchian.period) : null,
    aroon: n.aroon?.enabled ? lu(T, M, n.aroon.period) : null,
    envelopes: n.envelopes?.enabled ? ou(d, n.envelopes.period, n.envelopes.percent) : null,
    dema: n.dema?.enabled ? su(d, n.dema.period) : null,
    tema: n.tema?.enabled ? nu(d, n.tema.period) : null,
    hma: n.hma?.enabled ? tu(d, n.hma.period) : null,
    momentum: n.momentum?.enabled ? eu(d, n.momentum.period) : null,
    awesomeOsc: n.awesomeOsc?.enabled ? Qc(T, M) : null,
    mfi: n.mfi?.enabled ? Jc(T, M, d, U, n.mfi.period) : null,
    tsi: n.tsi?.enabled ? Zc(d, n.tsi.longPeriod, n.tsi.shortPeriod, n.tsi.signalPeriod) : null,
    trix: n.trix?.enabled ? Gc(d, n.trix.period, n.trix.signalPeriod) : null,
    ultimateOsc: n.ultimateOsc?.enabled ? qc(T, M, d, n.ultimateOsc.fast, n.ultimateOsc.med, n.ultimateOsc.slow) : null,
    dpo: n.dpo?.enabled ? Uc(d, n.dpo.period) : null,
    kst: n.kst?.enabled ? Kc(d, n.kst.roc1, n.kst.roc2, n.kst.roc3, n.kst.roc4, n.kst.sma1, n.kst.sma2, n.kst.sma3, n.kst.sma4, n.kst.signalPeriod) : null,
    stochRsi: n.stochRsi?.enabled ? zc(d, n.stochRsi.rsiPeriod, n.stochRsi.kPeriod, n.stochRsi.dPeriod) : null,
    bbPercent: n.bbPercent?.enabled ? Yc(d, n.bbPercent.period, n.bbPercent.stdDev) : null,
    bbWidth: n.bbWidth?.enabled ? Xc(d, n.bbWidth.period, n.bbWidth.stdDev) : null,
    histVol: n.histVol?.enabled ? Vc(d, n.histVol.period) : null,
    chaikinVol: n.chaikinVol?.enabled ? Hc(T, M, n.chaikinVol.emaPeriod, n.chaikinVol.rocPeriod) : null,
    stdDev: n.stdDev?.enabled ? $c(d, n.stdDev.period) : null,
    obv: n.obv?.enabled ? _c(d, U) : null,
    cmf: n.cmf?.enabled ? Oc(T, M, d, U, n.cmf.period) : null,
    adl: n.adl?.enabled ? Fc(T, M, d, U) : null,
    forceIndex: n.forceIndex?.enabled ? Dc(d, U, n.forceIndex.period) : null,
    eom: n.eom?.enabled ? Wc(T, M, U, n.eom.period) : null,
    volumeSma: n.volumeSma?.enabled ? Bc(U, n.volumeSma.period) : null,
    fibRetracement: n.fibRetracement?.enabled ? Ac(T, M, n.fibRetracement.lookback) : null,
    camarillaPivots: n.camarillaPivots?.enabled ? Ec(Me, T, M, d) : null,
    woodiePivots: n.woodiePivots?.enabled ? Lc(Me, T, M, d) : null,
    correlation: n.correlation?.enabled ? Nc(d, U, n.correlation.period) : null,
    linearReg: n.linearReg?.enabled ? jc(d, n.linearReg.period, n.linearReg.deviations) : null,
    coppock: n.coppock?.enabled ? Pc(d, n.coppock.longROC, n.coppock.shortROC, n.coppock.wmaPeriod) : null,
    alma: n.alma?.enabled ? Rc(d, n.alma.period, n.alma.offset, n.alma.sigma) : null,
    kama: n.kama?.enabled ? Ic(d, n.kama.period, n.kama.fastPeriod, n.kama.slowPeriod) : null,
    zlema: n.zlema?.enabled ? Tc(d, n.zlema.period) : null,
    t3: n.t3?.enabled ? Mc(d, n.t3.period, n.t3.vFactor) : null,
    lsma: n.lsma?.enabled ? Cc(d, n.lsma.period) : null,
    mcginley: n.mcginley?.enabled ? Sc(d, n.mcginley.period) : null,
    vortex: n.vortex?.enabled ? wc(T, M, d, n.vortex.period) : null,
    choppiness: n.choppiness?.enabled ? kc(T, M, d, n.choppiness.period) : null,
    elderRay: n.elderRay?.enabled ? yc(T, M, d, n.elderRay.period) : null,
    massIndex: n.massIndex?.enabled ? vc(T, M, n.massIndex.period) : null,
    chandeKroll: n.chandeKroll?.enabled ? gc(T, M, d, n.chandeKroll.p, n.chandeKroll.q, n.chandeKroll.x) : null,
    chandelierExit: n.chandelierExit?.enabled ? bc(T, M, d, n.chandelierExit.period, n.chandelierExit.multiplier) : null,
    linRegSlope: n.linRegSlope?.enabled ? xc(d, n.linRegSlope.period) : null,
    priceChannel: n.priceChannel?.enabled ? mc(T, M, n.priceChannel.period) : null,
    alligator: n.alligator?.enabled ? pc(d) : null,
    accBands: n.accBands?.enabled ? fc(T, M, d, n.accBands.period) : null,
    ppo: n.ppo?.enabled ? hc(d, n.ppo.fast, n.ppo.slow, n.ppo.signal) : null,
    pvo: n.pvo?.enabled ? dc(U, n.pvo.fast, n.pvo.slow, n.pvo.signal) : null,
    cmo: n.cmo?.enabled ? uc(d, n.cmo.period) : null,
    fisher: n.fisher?.enabled ? cc(T, M, n.fisher.period) : null,
    stc: n.stc?.enabled ? ic(d, n.stc.fast, n.stc.slow, n.stc.cycle) : null,
    rviOsc: n.rviOsc?.enabled ? ac(se, T, M, d, n.rviOsc.period) : null,
    klinger: n.klinger?.enabled ? rc(T, M, d, U, n.klinger.fast, n.klinger.slow, n.klinger.signal) : null,
    connorsRsi: n.connorsRsi?.enabled ? lc(d, n.connorsRsi.rsiPeriod, n.connorsRsi.streakPeriod, n.connorsRsi.rankPeriod) : null,
    apo: n.apo?.enabled ? oc(d, n.apo.fast, n.apo.slow) : null,
    qstick: n.qstick?.enabled ? sc(se, d, n.qstick.period) : null,
    bop: n.bop?.enabled ? nc(se, T, M, d, n.bop.period) : null,
    psychLine: n.psychLine?.enabled ? tc(d, n.psychLine.period) : null,
    pfe: n.pfe?.enabled ? ec(d, n.pfe.period, n.pfe.smoothing) : null,
    smi: n.smi?.enabled ? Qi(T, M, d, n.smi.period, n.smi.smoothK, n.smi.smoothD) : null,
    ulcerIndex: n.ulcerIndex?.enabled ? Ji(d, n.ulcerIndex.period) : null,
    natr: n.natr?.enabled ? Zi(T, M, d, n.natr.period) : null,
    trueRange: n.trueRange?.enabled ? Gi(T, M, d) : null,
    squeeze: n.squeeze?.enabled ? qi(T, M, d, n.squeeze.bbPeriod, n.squeeze.bbMult, n.squeeze.kcPeriod, n.squeeze.kcMult) : null,
    relVolIndex: n.relVolIndex?.enabled ? Ui(d, n.relVolIndex.period, n.relVolIndex.smoothing) : null,
    vhf: n.vhf?.enabled ? Ki(d, n.vhf.period) : null,
    vwma: n.vwma?.enabled ? zi(d, U, n.vwma.period) : null,
    volumeOsc: n.volumeOsc?.enabled ? Yi(U, n.volumeOsc.fast, n.volumeOsc.slow) : null,
    nvi: n.nvi?.enabled ? Xi(d, U) : null,
    pvi: n.pvi?.enabled ? Vi(d, U) : null,
    pvt: n.pvt?.enabled ? Hi(d, U) : null,
    vroc: n.vroc?.enabled ? $i(U, n.vroc.period) : null,
    netVolume: n.netVolume?.enabled ? _i(d, U, n.netVolume.period) : null,
    twiggsMF: n.twiggsMF?.enabled ? Oi(T, M, d, U, n.twiggsMF.period) : null,
    linRegRSquared: n.linRegRSquared?.enabled ? Fi(d, n.linRegRSquared.period) : null,
    medianPrice: n.medianPrice?.enabled ? Di(T, M) : null,
    typicalPrice: n.typicalPrice?.enabled ? Wi(T, M, d) : null,
    weightedClose: n.weightedClose?.enabled ? Bi(T, M, d) : null,
    demarkPivots: n.demarkPivots?.enabled ? Ai(Me, T, M, se, d) : null,
    zigzag: n.zigzag?.enabled ? Ei(T, M, d, n.zigzag.deviation) : null,
    fractals: n.fractals?.enabled ? Li(T, M) : null,
    gator: n.gator?.enabled ? Ni(d) : null,
    smmaOverlay: n.smmaOverlay?.enabled ? Dr(d, n.smmaOverlay.period) : null,
    wma: n.wma?.enabled ? ji(d, n.wma.period) : null,
    customIndicators: (n.customIndicators || []).filter((re) => re.enabled).map((re) => {
      if (typeof re.expression == "string" && (re.expression.startsWith("brue:") || re.expression.startsWith("local:")) && Array.isArray(re.data) && re.data.length > 0)
        return re;
      const ze = { closes: d, highs: T, lows: M, opens: se, volumes: U, timestamps: Me }, lt = Pi(re.expression, ze);
      return { ...re, data: lt.errors.length === 0 ? lt.data : new Array(d.length).fill(NaN) };
    })
  };
}
function ad(o, n) {
  if (n <= 0) return o;
  const d = new Array(n).fill(NaN), T = {};
  for (const M of Object.keys(o)) {
    const se = o[M];
    if (se == null) {
      T[M] = se;
      continue;
    }
    if (Array.isArray(se)) {
      se.length > 0 && typeof se[0] == "object" && se[0] !== null && "data" in se[0] ? T[M] = se.map((U) => ({ ...U, data: d.concat(U.data || []) })) : T[M] = d.concat(se);
      continue;
    }
    if (typeof se == "object") {
      const U = {};
      for (const Me of Object.keys(se)) {
        const r = se[Me];
        if (Array.isArray(r)) U[Me] = d.concat(r);
        else if (typeof r == "object" && r !== null) {
          const Ce = {};
          for (const re of Object.keys(r)) {
            const ze = r[re];
            Ce[re] = Array.isArray(ze) ? d.concat(ze) : ze;
          }
          U[Me] = Ce;
        } else U[Me] = r;
      }
      T[M] = U;
      continue;
    }
    T[M] = se;
  }
  return T;
}
let Qo = null, id = 0;
function $r() {
  return Qo || (Qo = new Worker(new URL(
    /* @vite-ignore */
    "/assets/indicatorWorker-DBDvDVhS.js",
    import.meta.url
  ), { type: "module" }), Qo);
}
function cd(o, n, d) {
  const [T, M] = l.useState(null), [se, U] = l.useState(!1), [Me, r] = l.useState(null), Ce = l.useRef(null), re = l.useRef(null), ze = l.useRef(0), lt = l.useRef(null), Be = l.useCallback((Ye) => {
    const { id: ve, result: et, error: me, durationMs: Fe } = Ye.data;
    if (!(lt.current !== null && ve !== lt.current)) {
      if (lt.current = null, U(!1), me) {
        console.warn("[indicatorWorker] error", me);
        return;
      }
      Fe !== void 0 && r(Fe), o.length > 0 && (ze.current = o[0].close), re.current = et, M(et);
    }
  }, [o]);
  return l.useEffect(() => {
    const Ye = $r();
    return Ye.addEventListener("message", Be), () => Ye.removeEventListener("message", Be);
  }, [Be]), l.useEffect(() => {
    if (!n || o.length === 0) {
      M(null);
      return;
    }
    const Ye = o.length > 0 ? o[0].close : 0;
    if (d.current && re.current && ze.current === Ye)
      return;
    const ve = Ce.current;
    let et, me, Fe, Ne, rt, q, fe = null;
    const tt = ve && ve.candles !== o && o.length >= ve.closes.length && o.length > 0 && ve.closes.length > 0 && o[0].time === ve.timestamps[0] && ve.closes.length > 10;
    let ue = 0;
    const kt = !tt && ve && ve.candles !== o && o.length > ve.closes.length && ve.closes.length > 10 && o.length - ve.closes.length > 0 && o[o.length - ve.closes.length]?.time === ve.timestamps[0];
    if (kt && (ue = o.length - ve.closes.length), tt) {
      const dt = ve.closes.length, It = Math.max(0, dt - 1);
      et = ve.closes, me = ve.highs, Fe = ve.lows, Ne = ve.opens, rt = ve.volumes, q = ve.timestamps, et.length = It, me.length = It, Fe.length = It, Ne.length = It, rt.length = It, q.length = It;
      for (let Wt = It; Wt < o.length; Wt++) {
        const $t = o[Wt];
        et.push($t.close), me.push($t.high), Fe.push($t.low), Ne.push($t.open), rt.push($t.volume || 0), q.push($t.time);
      }
      fe = { closes: et, highs: me, lows: Fe, opens: Ne, volumes: rt, timestamps: q }, Ce.current = { candles: o, closes: et, highs: me, lows: Fe, opens: Ne, volumes: rt, timestamps: q };
      const an = Object.values(n).filter((Wt) => Wt?.enabled).length;
      if (!(o.length > 3e3 && an > 3)) {
        const Wt = performance.now(), $t = _r(fe, n), cn = performance.now() - Wt;
        r(cn), re.current = $t, ze.current = Ye, M($t);
        return;
      }
    } else if (kt && re.current) {
      const dt = new Array(ue), It = new Array(ue), an = new Array(ue), Mn = new Array(ue), Wt = new Array(ue), $t = new Array(ue);
      for (let Jt = 0; Jt < ue; Jt++) {
        const mn = o[Jt];
        dt[Jt] = mn.close, It[Jt] = mn.high, an[Jt] = mn.low, Mn[Jt] = mn.open, Wt[Jt] = mn.volume || 0, $t[Jt] = mn.time;
      }
      et = dt.concat(ve.closes), me = It.concat(ve.highs), Fe = an.concat(ve.lows), Ne = Mn.concat(ve.opens), rt = Wt.concat(ve.volumes), q = $t.concat(ve.timestamps);
      const cn = ad(re.current, ue);
      Ce.current = { candles: o, closes: et, highs: me, lows: Fe, opens: Ne, volumes: rt, timestamps: q }, re.current = cn, ze.current = Ye, M(cn);
      return;
    } else
      et = o.map((dt) => dt.close), me = o.map((dt) => dt.high), Fe = o.map((dt) => dt.low), Ne = o.map((dt) => dt.open), rt = o.map((dt) => dt.volume || 0), q = o.map((dt) => dt.time), fe = { closes: et, highs: me, lows: Fe, opens: Ne, volumes: rt, timestamps: q }, Ce.current = { candles: o, closes: et, highs: me, lows: Fe, opens: Ne, volumes: rt, timestamps: q };
    fe || (fe = { closes: et, highs: me, lows: Fe, opens: Ne, volumes: rt, timestamps: q });
    const at = Object.values(n).filter((dt) => dt?.enabled).length;
    if (!(o.length > 1e3 || at > 5 || (n.customIndicators?.filter((dt) => dt.enabled)?.length || 0) > 0)) {
      const dt = performance.now(), It = _r(fe, n), an = performance.now() - dt;
      r(an), re.current = It, ze.current = Ye, M(It);
      return;
    }
    U(!0);
    const Ut = $r(), qt = ++id;
    lt.current = qt, Ut.postMessage({ id: qt, price: fe, indicators: n });
  }, [o, n, d]), { indicatorData: T, isComputing: se, computeDurationMs: Me };
}
function Ks(o) {
  const {
    ctx: n,
    candles: d,
    startIndex: T,
    indexToX: M,
    priceToY: se,
    morphAt: U,
    candleBodyWidth: Me,
    wickWidth: r,
    colors: Ce
  } = o, re = new Path2D(), ze = new Path2D(), lt = Me / 2, Be = d.length, Ye = new Float64Array(Be), ve = new Float64Array(Be), et = new Float64Array(Be), me = new Float64Array(Be), Fe = new Float64Array(Be), Ne = new Float64Array(Be), rt = new Float64Array(Be), q = new Float64Array(Be);
  let fe = 0, tt = 0;
  for (let ue = 0; ue < d.length; ue++) {
    const kt = U(ue, d[ue]), at = M(T + ue, T), Oe = se(kt.open), Ut = se(kt.close), qt = se(kt.high), dt = se(kt.low), It = Math.min(Oe, Ut), an = Math.max(1, Math.abs(Ut - Oe));
    kt.close >= kt.open ? (re.moveTo(at, qt), re.lineTo(at, dt), Ye[fe] = at - lt, ve[fe] = It, et[fe] = Me, me[fe] = an, fe++) : (ze.moveTo(at, qt), ze.lineTo(at, dt), Fe[tt] = at - lt, Ne[tt] = It, rt[tt] = Me, q[tt] = an, tt++);
  }
  if (n.lineWidth = r, n.lineCap = "round", fe) {
    n.strokeStyle = Ce.bullishWick, n.stroke(re), n.fillStyle = Ce.bullish;
    for (let ue = 0; ue < fe; ue++)
      n.fillRect(Ye[ue], ve[ue], et[ue], me[ue]);
  }
  if (tt) {
    n.strokeStyle = Ce.bearishWick, n.stroke(ze), n.fillStyle = Ce.bearish;
    for (let ue = 0; ue < tt; ue++)
      n.fillRect(Fe[ue], Ne[ue], rt[ue], q[ue]);
  }
  if (n.lineCap = "butt", n.lineWidth = 1, fe) {
    n.strokeStyle = Ce.bullishBorder;
    for (let ue = 0; ue < fe; ue++)
      n.strokeRect(Ye[ue], ve[ue], et[ue], me[ue]);
  }
  if (tt) {
    n.strokeStyle = Ce.bearishBorder;
    for (let ue = 0; ue < tt; ue++)
      n.strokeRect(Fe[ue], Ne[ue], rt[ue], q[ue]);
  }
}
const ud = (o) => {
  const n = (o || "").toUpperCase();
  if (n.includes("XAU") || n.includes("XAG")) return 0.8;
  if (n.includes("NAS100") || n.includes("SPX500") || n.includes("US30") || n.includes("US2000")) return 1.5;
  if (n.includes("BCO") || n.includes("WTICO")) return 0.05;
  if (n.includes("BTC")) return 4;
  if (n.includes("ETH")) return 2;
  if (n.includes("JPY")) return 1e-3;
  const d = n.replace("/", "");
  return d.length === 6 && /EUR|GBP|AUD|NZD|CAD|CHF|USD/.test(d) ? 1e-5 : 0.04;
}, dd = (o, n) => ud(o), Gl = ({
  candles: o,
  livePrice: n,
  symbol: d = "",
  timezone: T = "UTC",
  countdown: M,
  onCrosshairMove: se,
  syncedCrosshairTime: U,
  colors: Me,
  indicators: r,
  onIndicatorsChange: Ce,
  onRemoveBruePlot: re,
  onRemoveEngineIndicator: ze,
  onEditEngineIndicator: lt,
  onConverterReady: Be,
  onVisibleRangeChange: Ye,
  onViewportTimeChange: ve,
  syncedViewportTime: et,
  disableAutoFollow: me = !1,
  scrollToIndex: Fe,
  chartType: Ne = "candlestick",
  onScrollingChange: rt,
  onScrollSync: q,
  scrollOffsetRef: fe,
  optionsPdfEnabled: tt = !1,
  heatmapEnabled: ue = !1,
  externalDimensions: kt,
  economicEvents: at,
  positionLines: Oe,
  onPositionModify: Ut,
  onPositionClose: qt,
  autoSelectPositionId: dt,
  l2DepthData: It,
  onOpenSettings: an,
  onOpenCustomEditor: Mn,
  showBidAskSpread: Wt = !1,
  brokerBid: $t = null,
  brokerAsk: cn = null,
  showSessions: Jt = !1,
  timeframe: mn = "5m",
  rightOffset: zn,
  onLoadMore: Bs,
  isLoadingMore: So = !1,
  prependShift: Ss = 0,
  drawings: os,
  selectedDrawingId: Cs,
  drawingCursorRef: Ms,
  requestRedrawRef: Gs,
  isDrawingDragging: Co = !1
}) => {
  const pt = l.useRef(null), Mo = l.useRef(null), nt = l.useRef(null), Ws = l.useRef(null), Zs = l.useRef(!1), Js = l.useRef(null);
  l.useRef(null);
  const Qs = l.useRef(o), To = l.useRef(U ?? null), Ds = l.useRef(!1), eo = l.useRef(null), Tn = typeof window < "u" ? Math.min(window.devicePixelRatio || 1, 2) : 1, [xe, to] = l.useState({ width: 300, height: 300 }), [ce, Dt] = l.useState({
    startIndex: 0,
    candleWidth: 3,
    // Zoomed out default - shows more candles on first load
    // Backtest/replay mode has no future candles arriving, so zero right-side padding.
    // TERMINAL DIVERGENCE from the site port: the site keeps 35 future candles
    // for economic event flags, but the terminal draws no flags on the chart
    // (ECONOMIC is its own tab), so that margin was pure dead space on the
    // right and was dropped.
    futureSpace: 0,
    autoFollowLatest: !me
    // Start disabled if in replay mode
  }), Ie = l.useRef({
    startIndex: 0,
    candleWidth: 3
  }), In = l.useRef({
    startIndex: 0,
    candleWidth: 3
  }), Ft = l.useRef(!1), xn = l.useRef(!1), Ee = l.useRef(null), wt = l.useRef(null), vt = l.useRef(null), yt = l.useRef(null), _n = l.useRef(null), Kn = l.useRef(0), [, un] = l.useState(0), ls = l.useRef(null), Un = (a) => {
    const p = Ee.current, x = ls.current;
    if (p && x && x.posId === p) return x.offset;
    const y = dn.current, f = y && y.range > 0 ? y.range * 0.18 : a * 5e-3;
    return ls.current = p && f > 0 ? { posId: p, offset: f } : null, f;
  }, no = l.useRef(null);
  l.useEffect(() => {
    if (dt && dt !== no.current && Oe) {
      const a = Oe.find((p) => p.id === dt);
      a && (no.current = dt, Ee.current = a.id, wt.current = a.stopLoss ?? null, vt.current = a.takeProfit ?? null, un((p) => p + 1));
    }
  }, [dt, Oe]);
  const rs = l.useRef(0), Xt = l.useCallback((a) => {
    Ft.current = a, xn.current !== a && (xn.current = a, rt?.(a), a || (rs.current = Ie.current.startIndex, fe && (fe.current = 0)));
  }, [rt, fe]), Et = l.useCallback(() => {
    if (fe) {
      const a = Ie.current.startIndex, p = Ie.current.candleWidth * (1 + Ze), x = a - rs.current;
      fe.current = x * p;
    }
    q?.();
  }, [q, fe]), qn = l.useRef(Et);
  qn.current = Et;
  const Rn = l.useRef(null), $n = l.useRef(null), Gn = l.useRef(null), Fs = l.useRef(!1), ft = l.useCallback((a = !1) => {
    if (Gn.current !== null) {
      a || (Fs.current = !1);
      return;
    }
    Fs.current = a, Gn.current = requestAnimationFrame(() => {
      Gn.current = null;
      const p = Fs.current;
      Rn.current && Rn.current(p);
    });
  }, []);
  l.useCallback((a = !1) => {
    Gn.current !== null && (cancelAnimationFrame(Gn.current), Gn.current = null), Rn.current && Rn.current(a);
  }, []);
  const Zn = l.useRef(null), as = l.useRef(0), Io = l.useRef(0), Pn = l.useRef(!1), so = l.useRef(0), jn = l.useRef(null), Ts = l.useRef(void 0), Hn = l.useRef(null), sn = l.useRef("standard"), [Nn, is] = l.useState([]), Ct = l.useRef(null), bn = l.useRef(null), Is = l.useRef([]), Rs = l.useRef(null), gn = l.useRef(null), [Ln, cs] = l.useState(!1), [vn, Ro] = l.useState({ x: 0, y: 0, startIndex: 0, priceOffset: 0 }), [Po, jo] = l.useState(0), [il, No] = l.useState(1), Tt = l.useRef(null), At = l.useRef(null), En = l.useRef(0), oo = l.useRef(null), xt = l.useRef(null), [An, us] = l.useState(!1), ds = l.useRef(null), Os = l.useRef(0), _s = l.useRef(0), Bn = l.useRef(!1);
  l.useRef(0), l.useRef(0);
  const yn = l.useRef(null), Vn = l.useRef(null), kn = l.useRef(null), cl = l.useRef(null), v = "ns-resize", oe = "ns-resize";
  l.useRef(12), l.useRef(0), l.useRef(0);
  const [J, ge] = l.useState(0.15), [jt, Ae] = l.useState(!1), Ht = l.useRef({ y: 0, ratio: 0 });
  l.useRef(null);
  const [Gt, We] = l.useState(1), [Rt, hs] = l.useState(0), [Qt, Ot] = l.useState(null), [Vt, na] = l.useState(null), [Ql, ul] = l.useState(!1), [er, sa] = l.useState(!1), lo = l.useRef({ y: 0, scale: 1, offset: 0 }), fs = Qt !== null, wn = l.useRef(1), Jn = l.useRef(0), Qn = l.useRef(null), dn = l.useRef(null), hn = l.useRef(0), Ps = l.useRef(null), [es, oa] = wu("preferences.chartShowOHLC", !0), [tr, la] = l.useState(0), [ro, nr] = l.useState(!1), [hh, ra] = l.useState(0), dl = l.useRef(null), hl = l.useRef(!1);
  l.useEffect(() => {
    if (!ro) return;
    const a = setInterval(() => ra((p) => p + 1), 3e4);
    return () => clearInterval(a);
  }, [ro]), l.useEffect(() => {
    at && at.length > 0 && Su(at.map((a) => a.region_code));
  }, [at]), l.useEffect(() => {
    if (!ro) return;
    const a = (p) => {
      dl.current && !dl.current.contains(p.target) && nr(!1);
    };
    return document.addEventListener("mousedown", a), () => document.removeEventListener("mousedown", a);
  }, [ro]);
  const [fl, aa] = l.useState(0), [pl, ia] = l.useState(0), [ml, ca] = l.useState(0), [xl, ua] = l.useState(0), [bl, da] = l.useState(0), $s = l.useRef({}), [bt, ha] = l.useState({}), Xn = l.useRef({}), [sr, fa] = l.useState({}), [or, gl] = l.useState(null), [ao, Hs] = l.useState(null), on = l.useRef({});
  l.useRef(null);
  const lr = l.useRef(!1), ln = l.useRef(!1), Pt = l.useRef(null), [pa, ye] = l.useState(null), [Bt, pe] = l.useState(null), [Wn, Nt] = l.useState(null), rr = typeof navigator < "u" && /Mac|iPhone|iPad|iPod/.test(navigator.platform), [io, ma] = l.useState(rr ? 8 : 2), vl = l.useRef(rr), co = rl(), yl = l.useRef(co);
  yl.current = co, l.useEffect(() => {
    co.chart?.scrollSensitivity !== void 0 && ma(co.chart.scrollSensitivity);
  }, [co.chart?.scrollSensitivity]);
  const te = { ...al(), ...Me }, ar = typeof document < "u" && document.documentElement.classList.contains("dark");
  l.useEffect(() => {
    Ft.current || (Ie.current = {
      startIndex: ce.startIndex,
      candleWidth: ce.candleWidth
    });
  }, [ce.startIndex, ce.candleWidth]), l.useEffect(() => {
    wn.current = Gt, Jn.current = Rt;
  }, [Gt, Rt]), l.useEffect(() => {
    if (!ce.autoFollowLatest) return;
    const a = setInterval(() => {
      jo((p) => (p + 0.1) % (Math.PI * 2)), No(0.85 + Math.sin(Date.now() / 1e3) * 0.15);
    }, 150);
    return () => clearInterval(a);
  }, [ce.autoFollowLatest]), l.useEffect(() => {
    Qs.current = o;
    const a = o[o.length - 1];
    a && (Js.current = {
      time: a.time,
      open: a.open,
      high: a.high,
      low: a.low,
      close: a.close
    }, ce.autoFollowLatest && Rn.current && Rn.current(!0));
  }, [o, ce.autoFollowLatest]), l.useEffect(() => {
    const p = ((f) => {
      const e = f.toUpperCase().replace("_", "").replace("/", ""), _ = [
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
      for (const O of _)
        if (e === O || e.startsWith(O)) return { ticker: O, etfDragPerYear: 0 };
      return e.includes("XAU") || e.includes("GOLD") ? { ticker: "GLD", etfDragPerYear: 4e-3 } : e.includes("SPX500") || e.includes("SPX") ? { ticker: "SPY", etfDragPerYear: 0 } : e.includes("NAS100") || e.includes("NDX") ? { ticker: "QQQ", etfDragPerYear: 0 } : e.includes("US30") || e.includes("DJI") ? { ticker: "DIA", etfDragPerYear: 0 } : null;
    })(d);
    if (!p || !tt) {
      gl(null);
      return;
    }
    const x = async () => {
      try {
        const f = [];
        if (!f || f.length === 0) {
          gl(null);
          return;
        }
        const e = f[0], _ = o[o.length - 1]?.close || parseFloat(e.current_price), O = parseFloat(e.current_price), z = O > 0 ? _ / O : 1;
        let $ = 0;
        if (e.expiration) {
          const Y = new Date(e.expiration).getTime();
          Number.isNaN(Y) || ($ = Math.max(0, (Y - Date.now()) / (365 * 24 * 3600 * 1e3)));
        }
        const g = Math.exp(p.etfDragPerYear * $), S = z * g;
        let B = [];
        e.density_curve && Array.isArray(e.density_curve) && (B = e.density_curve.map((Y) => ({
          p: Y.p * S,
          d: Y.d
        }))), gl({
          currentPrice: parseFloat(e.current_price) * z,
          predictedPrice: parseFloat(e.predicted_price) * S,
          modePrice: e.mode_price ? parseFloat(e.mode_price) * S : parseFloat(e.predicted_price) * S,
          direction: e.direction,
          distancePct: parseFloat(e.distance_pct),
          probAbove: parseFloat(e.prob_above || "0.5"),
          probBelow: parseFloat(e.prob_below || "0.5"),
          confidence: parseFloat(e.confidence || "0.5"),
          densityCurve: B
        });
      } catch (f) {
        console.error("Failed to fetch predicted price:", f);
      }
    };
    x();
    const y = setInterval(x, 6e4);
    return () => clearInterval(y);
  }, [d, tt]), l.useEffect(() => {
    if (!ue || !d) {
      is([]);
      return;
    }
    const a = async () => {
      try {
        const x = d.includes("/") ? d : d.length === 6 ? `${d.substring(0, 3)}/${d.substring(3)}` : d, y = await Ku("l2_heatmap_snapshots", {
          params: { symbol: `eq.${x}`, order: "timestamp.desc", limit: "300" }
        });
        y && y.length > 0 && is(y.reverse());
      } catch (x) {
        console.error("Failed to fetch heatmap data:", x);
      }
    };
    a();
    const p = setInterval(a, 5e3);
    return () => clearInterval(p);
  }, [d, ue]), l.useEffect(() => () => {
    Tt.current !== null && cancelAnimationFrame(Tt.current), bn.current !== null && cancelAnimationFrame(bn.current), yn.current !== null && cancelAnimationFrame(yn.current), Vn.current !== null && cancelAnimationFrame(Vn.current), kn.current !== null && cancelAnimationFrame(kn.current), At.current !== null && clearTimeout(At.current), Qn.current !== null && clearTimeout(Qn.current);
  }, []);
  const { isPhone: xa, isDesktop: Lo } = Cu(xe.width), Ke = l.useMemo(() => Mu(xe.width), [xe.width]), ir = xa, cr = n || (o.length > 0 ? o[o.length - 1]?.close : 100), Ue = l.useMemo(() => Tu(ir, d, cr || 100, zn), [ir, Lo, d, cr, zn]), Lt = Ke.timeAxisHeight, Eo = Ke.priceLabelFont, ur = Ke.timeLabelFont, Zt = Ke.subplotLabelFont, Ao = 1, Bo = 50, ps = l.useMemo(() => {
    const a = [], x = Math.pow(Bo / Ao, 0.025);
    for (let y = 0; y <= 40; y++)
      a.push(Ao * Math.pow(x, y));
    return a;
  }, []), Dn = l.useCallback((a = !1) => {
    const p = xe.width - Ue, x = a && Ft.current ? Ie.current : ce, e = (Ne === "footprint_cluster" || Ne === "footprint_profile" ? Math.max(x.candleWidth, 22) : x.candleWidth) * (1 + Ze), _ = Math.floor(p / e), O = Math.max(0, Math.floor(x.startIndex)), z = Math.min(o.length, O + _);
    return {
      candles: o.slice(O, z),
      startIndex: O,
      endIndex: z,
      visibleCount: _,
      totalWithFuture: _ + ce.futureSpace,
      candleWidth: x.candleWidth
    };
  }, [o, xe.width, ce]);
  l.useEffect(() => {
    if (o.length > 0) {
      const a = xe.width - Ue, p = ce.candleWidth * (1 + Ze), x = Math.floor(a / p), y = Math.max(0, Math.floor(ce.startIndex)), f = Math.min(o.length, y + x);
      Ye && Ye({ startIndex: y, endIndex: f, totalCandles: o.length }), Bs && y < 2500 && !So && !Bn.current && !ce.autoFollowLatest && (jn.current && clearTimeout(jn.current), jn.current = setTimeout(() => {
        Bn.current || Bs();
      }, 100));
    }
  }, [Ye, Bs, So, o.length, ce.startIndex, ce.candleWidth, xe.width, ce.autoFollowLatest]), l.useEffect(() => {
    if (!ve || o.length === 0) return;
    if (Ds.current) {
      Ds.current = !1;
      return;
    }
    const a = xe.width - Ue, p = ce.candleWidth * (1 + Ze), x = Math.floor(a / p), y = Math.max(0, Math.floor(ce.startIndex)), f = Math.min(o.length, y + x), e = o.slice(y, f);
    if (e.length === 0) return;
    const _ = Math.floor(e.length / 2), O = e[_];
    O && O.time !== eo.current && (eo.current = O.time, ve(O.time));
  }, [ve, o, ce.startIndex, ce.candleWidth, xe.width]), l.useEffect(() => {
    if (!et || o.length === 0 || et === eo.current) return;
    let a = -1, p = 1 / 0;
    for (let B = 0; B < o.length; B++) {
      const Y = Math.abs(o[B].time - et);
      Y < p && (p = Y, a = B);
    }
    if (a === -1) return;
    const x = xe.width - Ue, y = ce.candleWidth * (1 + Ze), f = Math.floor(x / y), e = Math.max(0, Math.floor(ce.startIndex)), _ = Math.min(o.length, e + f), O = Math.floor(f / 2), z = Math.max(0, a - O), $ = a >= e && a < _, g = e + Math.floor(f / 2);
    (!$ || Math.abs(a - g) > O / 2) && (Ds.current = !0, Dt((B) => ({
      ...B,
      startIndex: z,
      autoFollowLatest: !1
    })), Ie.current.startIndex = z);
  }, [et, o, xe.width, ce.candleWidth, ce.startIndex]);
  const js = l.useCallback((a, p = !0) => {
    if (Qt !== null && Vt !== null) {
      const z = wn.current, $ = Jn.current, g = Vt / z, S = Qt + $;
      return {
        min: S - g / 2,
        max: S + g / 2,
        range: g
      };
    }
    if (a.length === 0)
      return { min: 0, max: 100, range: 100 };
    let x = 1 / 0, y = -1 / 0;
    for (const z of a)
      z.low < x && (x = z.low), z.high > y && (y = z.high);
    p && n && (n < x && (x = n), n > y && (y = n));
    const f = y - x, e = f * 0.05, _ = (y + x) / 2, O = f + e * 2;
    return {
      min: _ - O / 2,
      max: _ + O / 2,
      range: O
    };
  }, [n, Qt, Vt]), St = l.useCallback((a, p) => {
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
    ].filter((O) => r?.[O]?.enabled).length, f = xe.height - Lt, e = y > 0 ? Math.max(60 * y, f * J) : 0, _ = f - e;
    return _ - (a - p.min) / p.range * _;
  }, [xe.height, r, o, J]), dr = l.useCallback((a, p) => {
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
    ].filter((O) => r?.[O]?.enabled).length, f = xe.height - Lt, e = y > 0 ? Math.max(60 * y, f * J) : 0, _ = f - e;
    return p.max - a / _ * p.range;
  }, [xe.height, r, o, J]), hr = l.useCallback((a, p) => {
    const x = ce.candleWidth * (1 + Ze);
    return (a - p) * x + x / 2;
  }, [ce.candleWidth]), uo = l.useCallback((a, p) => {
    const x = ce.candleWidth * (1 + Ze);
    return Math.floor(a / x) + p;
  }, [ce.candleWidth]), Fn = l.useCallback((a) => Iu(a, d), [d]), Ns = l.useCallback((a) => {
    const p = new Date(a);
    if (T === "local") {
      const x = p.getHours().toString().padStart(2, "0"), y = p.getMinutes().toString().padStart(2, "0");
      return `${x}:${y}`;
    } else if (T === "UTC") {
      const x = p.getUTCHours().toString().padStart(2, "0"), y = p.getUTCMinutes().toString().padStart(2, "0");
      return `${x}:${y}`;
    } else
      try {
        return p.toLocaleTimeString("en-GB", {
          timeZone: T,
          hour: "2-digit",
          minute: "2-digit",
          hour12: !1
        });
      } catch {
        const x = p.getUTCHours().toString().padStart(2, "0"), y = p.getUTCMinutes().toString().padStart(2, "0");
        return `${x}:${y}`;
      }
  }, [T]), ts = l.useCallback((a, p = !1) => {
    const x = new Date(a);
    if (T === "local") {
      const y = x.getDate(), f = x.toLocaleString("en", { month: "short" }), e = String(x.getFullYear()).slice(-2);
      return p ? `${y} ${f} '${e}` : `${y} ${f}`;
    } else if (T === "UTC") {
      const y = x.getUTCDate(), f = x.toLocaleString("en", { month: "short", timeZone: "UTC" }), e = String(x.getUTCFullYear()).slice(-2);
      return p ? `${y} ${f} '${e}` : `${y} ${f}`;
    } else
      try {
        const y = x.toLocaleDateString("en-GB", { timeZone: T, day: "numeric" }), f = x.toLocaleDateString("en-GB", { timeZone: T, month: "short" }), e = x.toLocaleDateString("en-GB", { timeZone: T, year: "2-digit" });
        return p ? `${y} ${f} '${e}` : `${y} ${f}`;
      } catch {
        const y = x.getUTCDate(), f = x.toLocaleString("en", { month: "short", timeZone: "UTC" }), e = String(x.getUTCFullYear()).slice(-2);
        return p ? `${y} ${f} '${e}` : `${y} ${f}`;
      }
  }, [T]), fr = l.useCallback((a) => {
    const p = new Date(a), x = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    if (T === "local") return x[p.getDay()];
    if (T === "UTC") return x[p.getUTCDay()];
    try {
      return p.toLocaleDateString("en-GB", { timeZone: T, weekday: "short" });
    } catch {
      return x[p.getUTCDay()];
    }
  }, [T]), ba = (a, p) => {
    const x = a / p, y = Math.pow(10, Math.floor(Math.log10(x))), f = x / y;
    let e;
    return f <= 1 ? e = 1 : f <= 2 ? e = 2 : f <= 5 ? e = 5 : e = 10, e * y;
  };
  l.useRef(null);
  const { indicatorData: s } = cd(o, r, Ft), ms = l.useCallback((a = !1) => {
    const p = Mo.current;
    if (!p) return;
    const { width: x, height: y } = xe;
    Ws.current || (Ws.current = document.createElement("canvas"));
    const f = Ws.current;
    (f.width !== p.width || f.height !== p.height) && (f.width = p.width, f.height = p.height);
    const e = f.getContext("2d");
    if (!e) return;
    const _ = !1;
    e.setTransform(Tn, 0, 0, Tn, 0, 0);
    const O = !!s?.rsi, z = !!s?.macd, $ = !!s?.atr, g = !!s?.stochastic, S = r?.volume?.enabled && o.some((D) => D.volume !== void 0 && D.volume > 0), B = !!s?.williamsR, Y = !!s?.cci, u = !!s?.adx, A = !!s?.roc, m = !!s?.aroon, V = !!s?.momentum, h = !!s?.ao, N = !!s?.mfi, de = !!s?.tsi, _e = !!s?.trix, ne = !!s?.ultimateOsc, $e = !!s?.dpo, ee = !!s?.kst, Re = !!s?.stochRsi, st = !!s?.bbPercent, He = !!s?.bbWidth, he = !!s?.histVol, Pe = !!s?.chaikinVol, it = !!s?.stdDev, Je = !!s?.obv, zt = !!s?.cmf, Sn = !!s?.adl, en = !!s?.forceIndex, _o = !!s?.eom, _t = !!s?.correlation, gs = !!s?.coppock, fo = !!s?.vortex, $o = !!s?.choppiness, Il = !!s?.elderRay, Rl = !!s?.massIndex, Pl = !!s?.linRegSlope, Da = !!s?.ppo, Fa = !!s?.pvo, Oa = !!s?.cmo, _a = !!s?.fisher, $a = !!s?.stc, Ha = !!s?.rviOsc, Va = !!s?.klinger, Xa = !!s?.connorsRsi, Ya = !!s?.apo, za = !!s?.qstick, Ka = !!s?.bop, Ua = !!s?.psychLine, qa = !!s?.pfe, Ga = !!s?.smi, Za = !!s?.ulcerIndex, Ja = !!s?.natr, Qa = !!s?.trueRange, ei = !!s?.squeeze, ti = !!s?.relVolIndex, ni = !!s?.vhf, si = !!s?.volumeOsc, oi = !!s?.nvi, li = !!s?.pvi, ri = !!s?.pvt, ai = !!s?.vroc, ii = !!s?.netVolume, ci = !!s?.twiggsMF, ui = !!s?.linRegRSquared, di = !!s?.gator, Ho = [
      O,
      z,
      $,
      g,
      B,
      Y,
      u,
      A,
      m,
      V,
      h,
      N,
      de,
      _e,
      ne,
      $e,
      ee,
      Re,
      st,
      He,
      he,
      Pe,
      it,
      Je,
      zt,
      Sn,
      en,
      _o,
      _t,
      gs,
      // Phase 2
      fo,
      $o,
      Il,
      Rl,
      Pl,
      Da,
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
      ii,
      ci,
      ui,
      di
    ].filter(Boolean).length + (s?.customIndicators?.filter((D) => D.display === "subplot").length || 0), wr = y - Lt, Sr = Ho > 0 ? Math.max(60 * Ho, wr * J) : 0, ns = Ho > 0 ? Sr / Ho : 0, Te = wr - Sr, Z = x - Ue;
    e.fillStyle = te.background, e.fillRect(0, 0, x, y);
    const i = Dn(!0);
    let rn = Ft.current ? Ie.current.candleWidth : ce.candleWidth;
    (Ne === "footprint_cluster" || Ne === "footprint_profile") && (rn = Math.max(rn, 22));
    const Ve = js(i.candles, ce.autoFollowLatest);
    dn.current = Ve, hn.current = Te;
    const Cr = Ft.current ? Ie.current.startIndex : ce.startIndex, hi = (Cr - i.startIndex) * (rn * (1 + Ze)), be = (D, c) => {
      const E = rn * (1 + Ze);
      return (D - c) * E + E / 2 - hi;
    }, qe = (D) => {
      const c = (D - Ve.min) / Ve.range;
      return Te - c * Te;
    }, Vo = (te.gridOpacity ?? 100) / 100;
    e.globalAlpha = Vo, e.strokeStyle = te.grid, e.lineWidth = 0.5, e.setLineDash([]);
    const fi = yl.current?.chart?.gridHorizontalLines, pi = yl.current?.chart?.gridVerticalLines, mi = Lo ? fi ?? Ke.priceTargetLabels : Ke.priceTargetLabels, Xo = ba(Ve.range, mi), Mr = Math.ceil(Ve.min / Xo) * Xo, xi = i.startIndex + i.candles.length - 1, bi = be(o.length - 1, i.startIndex) <= Z ? Z : Math.max(0, Math.min(Z, be(xi, i.startIndex) + rn / 2)), Tr = 25;
    e.beginPath();
    let Ir = -1 / 0;
    for (let D = Mr; D <= Ve.max; D += Xo) {
      const c = qe(D);
      Math.abs(c - Ir) < Tr || (Ir = c, e.moveTo(0, c), e.lineTo(bi, c));
    }
    e.stroke(), e.setLineDash([]), e.globalAlpha = 1;
    const Rr = rn * (1 + Ze), jl = Math.ceil(Z / Rr), Nl = i.startIndex + jl, gi = Lo ? pi ?? Ke.targetLinesOnScreen : Ke.targetLinesOnScreen, vi = Math.max(1, Math.round(jl / gi)), Vs = Math.max(1, vi), Pr = Vs / 2, yi = jl / Vs, jr = Math.max(0, Math.min(
      1,
      (yi - 8) / 6
    )), Nr = Vs / 2, Lr = Ke.tertiaryGridVisible ? Math.max(0, Math.min(
      0.5,
      (3 - Rr) / 1.5
    )) : 0;
    e.globalAlpha = Vo, e.strokeStyle = te.grid, e.beginPath();
    const Ll = i.startIndex;
    for (let D = Ll; D <= Nl; D += Vs) {
      const c = be(D, i.startIndex);
      if (c >= 0 && c <= Z && (e.moveTo(c, 0), e.lineTo(c, Te)), c > Z) break;
    }
    if (e.stroke(), jr > 0.01 && Pr >= 1) {
      e.globalAlpha = jr * Vo, e.strokeStyle = te.grid, e.beginPath();
      const D = i.startIndex;
      for (let c = D; c <= Nl; c += Pr) {
        if ((c - Ll) % Vs === 0) continue;
        const E = be(c, i.startIndex);
        if (E >= 0 && E <= Z && (e.moveTo(E, 0), e.lineTo(E, Te)), E > Z) break;
      }
      e.stroke(), e.globalAlpha = 1;
    }
    if (Lr > 0.01 && Nr >= 1) {
      e.globalAlpha = Lr * Vo, e.strokeStyle = te.grid, e.beginPath();
      const D = i.startIndex;
      for (let c = D; c <= Nl; c += Nr) {
        if ((c - Ll) % Vs === 0) continue;
        const E = be(c, i.startIndex);
        if (E >= 0 && E <= Z && (e.moveTo(E, 0), e.lineTo(E, Te)), E > Z) break;
      }
      e.stroke(), e.globalAlpha = 1;
    }
    e.globalAlpha = 1, e.strokeStyle = te.axisLine || te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(Z, 0), e.lineTo(Z, y), e.stroke(), e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
    const El = {
      ctx: e,
      chartWidth: Z,
      mainChartHeight: Te,
      candles: o,
      visible: i,
      indexToX: be,
      mainPriceToY: qe,
      currentCandleWidth: rn
    };
    if (tt && or && Ru(El, or), ue && Nn.length > 0 && Pu(El, Nn), It && (It.bids.length > 0 || It.asks.length > 0) && ju(El, It), Jt) {
      const D = {
        ctx: e,
        chartWidth: Z,
        mainChartHeight: Te,
        candles: o,
        visibleStartIndex: i.startIndex,
        visibleEndIndex: i.startIndex + i.candles.length,
        candleWidth: rn,
        indexToX: be,
        isDark: ar,
        timeframe: mn
      };
      Nu(D);
    }
    const fn = Math.max(rn * 0.7, 3), Xs = Math.max(1, fn * 0.15), Al = Js.current, ki = o.length - 1, vs = (D, c) => Al && i.startIndex + D === ki && Al.time === c.time ? Al : c;
    if (Ne === "candlestick")
      Ks({
        ctx: e,
        candles: i.candles,
        startIndex: i.startIndex,
        indexToX: be,
        priceToY: qe,
        morphAt: vs,
        candleBodyWidth: fn,
        wickWidth: Xs,
        colors: {
          bullish: te.bullish,
          bearish: te.bearish,
          bullishWick: te.bullishWick,
          bearishWick: te.bearishWick,
          bullishBorder: te.bullishBorder,
          bearishBorder: te.bearishBorder
        }
      });
    else if (Ne === "line")
      e.strokeStyle = te.bullish, e.lineWidth = 2, e.beginPath(), i.candles.forEach((D, c) => {
        const E = be(i.startIndex + c, i.startIndex), b = qe(vs(c, D).close);
        c === 0 ? e.moveTo(E, b) : e.lineTo(E, b);
      }), e.stroke();
    else if (Ne === "area") {
      const D = e.createLinearGradient(0, 0, 0, Te);
      if (D.addColorStop(0, "rgba(34, 197, 94, 0.4)"), D.addColorStop(1, "rgba(34, 197, 94, 0.02)"), e.beginPath(), i.candles.forEach((c, E) => {
        const b = be(i.startIndex + E, i.startIndex), I = qe(vs(E, c).close);
        E === 0 ? e.moveTo(b, I) : e.lineTo(b, I);
      }), i.candles.length > 0) {
        const c = be(i.startIndex + i.candles.length - 1, i.startIndex), E = be(i.startIndex, i.startIndex);
        e.lineTo(c, Te), e.lineTo(E, Te), e.closePath(), e.fillStyle = D, e.fill();
      }
      e.strokeStyle = te.bullish, e.lineWidth = 2, e.beginPath(), i.candles.forEach((c, E) => {
        const b = be(i.startIndex + E, i.startIndex), I = qe(vs(E, c).close);
        E === 0 ? e.moveTo(b, I) : e.lineTo(b, I);
      }), e.stroke();
    } else if (Ne === "heikin_ashi") {
      if (i.candles.length !== 0) {
        let D = i.candles[0]?.open || 0, c = i.candles[0]?.close || 0;
        const E = i.candles.map((b, I) => {
          const k = (b.open + b.high + b.low + b.close) / 4, P = I === 0 ? (b.open + b.close) / 2 : (D + c) / 2, W = Math.max(b.high, P, k), F = Math.min(b.low, P, k), L = { time: b.time, open: P, high: W, low: F, close: k, volume: b.volume };
          return D = P, c = k, L;
        });
        Ks({
          ctx: e,
          candles: E,
          startIndex: i.startIndex,
          indexToX: be,
          priceToY: qe,
          morphAt: (b, I) => E[b],
          candleBodyWidth: fn,
          wickWidth: Xs,
          colors: {
            bullish: te.bullish,
            bearish: te.bearish,
            bullishWick: te.bullishWick,
            bearishWick: te.bearishWick,
            bullishBorder: te.bullishBorder,
            bearishBorder: te.bearishBorder
          }
        });
      }
    } else if (Ne === "tpo") {
      const c = /* @__PURE__ */ new Map();
      i.candles.forEach((b) => {
        const I = Math.floor(b.time / 18e5) * 18e5, k = c.get(I);
        k ? (k.high = Math.max(k.high, b.high), k.low = Math.min(k.low, b.low), k.count++) : c.set(I, { high: b.high, low: b.low, count: 1 });
      });
      let E = 0;
      c.forEach((b) => {
        const I = be(i.startIndex + E, i.startIndex), k = qe(b.high), P = qe(b.low);
        e.fillStyle = "#21b3a4", e.globalAlpha = 0.25, e.fillRect(I - fn / 2, k, fn, Math.max(2, P - k)), e.globalAlpha = 1, E++;
      }), e.globalAlpha = 0.3, Ks({
        ctx: e,
        candles: i.candles,
        startIndex: i.startIndex,
        indexToX: be,
        priceToY: qe,
        morphAt: vs,
        candleBodyWidth: fn,
        wickWidth: Xs,
        colors: {
          bullish: te.bullish,
          bearish: te.bearish,
          bullishWick: te.bullishWick,
          bearishWick: te.bearishWick,
          bullishBorder: te.bullishBorder,
          bearishBorder: te.bearishBorder
        }
      }), e.globalAlpha = 1;
    } else if (Ne === "footprint_cluster" || Ne === "footprint_profile") {
      const c = Ne === "footprint_profile" ? "delta" : "sellsBuys", E = x - Ue, b = i.candles.length || 1, I = E / Math.max(b, 1), k = I < 25, P = !k && I >= 20, F = 10 * (I < 80 ? 0.7 : I < 120 ? 0.8 : 1), L = 3, w = 0, C = (R) => Math.abs(R) >= 1e6 ? (R / 1e6).toFixed(1) + "M" : Math.abs(R) >= 1e3 ? (R / 1e3).toFixed(1) + "K" : Math.abs(R) >= 100 ? R.toFixed(0) : Math.abs(R) >= 10 ? R.toFixed(1) : R.toFixed(2), j = (R, Q) => {
        const le = Math.max(R.high - R.low, R.close * 5e-4, 0.01), X = 0.5;
        let H = le / 18;
        const K = Math.abs(qe(R.high) - qe(R.low));
        if (K > 0) {
          const Le = Math.max(3, Math.floor(K / 12)), Ge = le / Le;
          H < Ge && (H = Ge);
        }
        H = Math.max(X, Math.ceil(H / X) * X);
        const ie = Math.max(3, Math.min(24, Math.floor(le / H) || 15)), ae = [];
        let G = 0, ke = 0, Se = 0;
        const Xe = R.volume || 100;
        for (let Le = 0; Le < ie; Le++) {
          const Ge = R.low + Le / ie * le, ut = Ge + le / ie, De = (Ge + ut) / 2, Qe = Math.abs(De - R.close) / (le || 1), ht = Math.exp(-Math.pow(Qe * 3, 2)) + 0.15, ot = Xe * ht / ie * (0.8 + Math.random() * 0.4);
          let je = R.close >= R.open ? 0.55 + Math.random() * 0.15 : 0.35 + Math.random() * 0.15;
          Math.random() > 0.7 && (Math.random() > 0.5 ? je = Math.min(0.85, je + 0.25) : je = Math.max(0.15, je - 0.25));
          const Mt = ot * je, nn = ot * (1 - je);
          G += Mt, ke += nn, Se += ot, ae.push({ price_mid: De, price_lo: Ge, price_hi: ut, buy: Mt, sell: nn, total: ot, delta: Mt - nn, bucket_idx: Le });
        }
        let ct = 0, we = 0;
        return ae.forEach((Le, Ge) => {
          Le.total > we && (we = Le.total, ct = Ge);
        }), { levels: ae.map((Le, Ge) => {
          let ut = !1, De = !1;
          return Le.buy >= Math.max(0, w) && Le.sell > 0 && Le.buy / Le.sell >= L && (ut = !0), Le.sell >= Math.max(0, w) && Le.buy > 0 && Le.sell / Le.buy >= L && (De = !0), { ...Le, is_poc: Ge === ct, buy_imbalance: ut, sell_imbalance: De };
        }), totalBuy: G, totalSell: ke, totalVol: Se, delta: G - ke, pocIdx: ct, maxVol: we, tickPerRow: H, range: le };
      };
      e.save(), e.globalAlpha = 0.3, Ks({
        ctx: e,
        candles: i.candles,
        startIndex: i.startIndex,
        indexToX: be,
        priceToY: qe,
        morphAt: vs,
        candleBodyWidth: Math.max(1, fn * 0.3),
        wickWidth: Xs,
        colors: {
          bullish: te.bullish,
          bearish: te.bearish,
          bullishWick: te.bullishWick,
          bearishWick: te.bearishWick,
          bullishBorder: te.bullishBorder,
          bearishBorder: te.bearishBorder
        }
      }), e.restore(), i.candles.forEach((R, Q) => {
        const le = i.startIndex + Q, X = be(le, i.startIndex), H = fn * 0.45, K = X - H, ie = X + H, ae = ie - K;
        if (ae < 2) return;
        const G = j(R), ke = G.maxVol || 1, Se = Math.max(...G.levels.map((we) => Math.abs(we.delta)), 1);
        if (k) {
          const we = G.delta, gt = G.totalBuy + G.totalSell || 1;
          let Le = Math.abs(we) / gt;
          Le = Math.sqrt(Le);
          const Ge = Math.max(R.open, R.close), ut = Math.min(R.open, R.close), De = qe(Ge), Qe = qe(ut);
          let ht = Math.min(De, Qe), ot = Math.max(De, Qe);
          if (ot - ht < 2) {
            const nn = (ht + ot) * 0.5;
            ht = nn - 1, ot = nn + 1;
          }
          let mt, je, Mt;
          we >= 0 ? (mt = 20 + 30 * Le, je = 30 + 70 * Le, Mt = 50 + 140 * Le) : (mt = 40 + 140 * Le, je = 20 + 25 * Le, Mt = 40 + 70 * Le), e.fillStyle = `rgba(${Math.round(mt)},${Math.round(je)},${Math.round(Mt)},0.9)`, e.fillRect(K, ht, ae, ot - ht);
          return;
        }
        for (const we of G.levels) {
          const gt = qe(we.price_hi), Le = qe(we.price_lo), Ge = Math.min(gt, Le), ut = Math.max(gt, Le), De = ut - Ge;
          if (!(De < 1))
            if (c === "sellsBuys") {
              const Qe = K + ae * 0.5;
              let ht = we.sell / ke;
              ht = Math.sqrt(Math.max(0, ht));
              let ot = we.buy / ke;
              ot = Math.sqrt(Math.max(0, ot));
              const mt = 25 + 130 * ht, je = 14 + 20 * ht, Mt = 30 + 60 * ht, nn = 0.9 + 0.1 * ht;
              e.fillStyle = `rgba(${Math.round(mt)},${Math.round(je)},${Math.round(Mt)},${nn})`, e.fillRect(K, Ge, ae * 0.5, De);
              const Es = 14 + 20 * ot, zs = 20 + 55 * ot, Ci = 35 + 120 * ot, Mi = 0.9 + 0.1 * ot;
              if (e.fillStyle = `rgba(${Math.round(Es)},${Math.round(zs)},${Math.round(Ci)},${Mi})`, e.fillRect(Qe, Ge, ae * 0.5, De), e.strokeStyle = "rgba(100,100,120,0.3)", e.lineWidth = 0.5, e.beginPath(), e.moveTo(Qe, Ge), e.lineTo(Qe, ut), e.stroke(), P && De >= F * 0.5) {
                e.font = `${F}px JetBrains Mono, monospace`;
                const zo = C(we.sell), Ti = C(we.buy), Ar = Ge + (De + F * 0.35) * 0.5;
                e.fillStyle = "rgba(230,215,215,0.95)", e.textAlign = "center", e.fillText(zo, K + ae * 0.25, Ar), e.fillStyle = "rgba(215,225,240,0.95)", e.fillText(Ti, K + ae * 0.75, Ar);
              }
              if (we.sell_imbalance && (e.strokeStyle = "rgba(180,80,80,0.9)", e.lineWidth = we.buy_imbalance && we.sell_imbalance ? 1.5 : 1, e.strokeRect(K + 0.5, Ge + 0.5, ae * 0.5 - 1, De - 1)), we.buy_imbalance && (e.strokeStyle = "rgba(80,180,120,0.9)", e.lineWidth = we.buy_imbalance && we.sell_imbalance ? 1.5 : 1, e.strokeRect(K + ae * 0.5 + 0.5, Ge + 0.5, ae * 0.5 - 1, De - 1)), we.is_poc) {
                const zo = Ge + De * 0.5;
                e.strokeStyle = "rgba(200,180,100,0.9)", e.lineWidth = 1, e.beginPath(), e.moveTo(K, zo), e.lineTo(ie, zo), e.stroke();
              }
            } else {
              let Qe, ht, ot, mt;
              if (c === "delta") {
                let je = Math.abs(we.delta) / Se;
                je = Math.sqrt(je), we.delta >= 0 ? (Qe = 14 + 20 * je, ht = 20 + 60 * je, ot = 35 + 110 * je, mt = 0.9 + 0.1 * je) : (Qe = 25 + 125 * je, ht = 14 + 20 * je, ot = 30 + 55 * je, mt = 0.9 + 0.1 * je);
              } else {
                let je = we.total / ke;
                je = Math.sqrt(je), Qe = 14 + 20 * je, ht = 20 + 50 * je, ot = 40 + 115 * je, mt = 0.9 + 0.1 * je;
              }
              if (e.fillStyle = `rgba(${Math.round(Qe)},${Math.round(ht)},${Math.round(ot)},${mt})`, e.fillRect(K, Ge, ae, De), P && De >= F * 0.5) {
                e.font = `${F}px JetBrains Mono, monospace`, e.textAlign = "center", e.fillStyle = "rgba(230,230,230,0.95)";
                const je = C(c === "delta" ? we.delta : we.total);
                e.fillText(je, K + ae * 0.5, Ge + (De + F * 0.35) * 0.5);
              }
              if ((we.buy_imbalance || we.sell_imbalance) && (e.strokeStyle = we.buy_imbalance ? "rgba(80,180,120,0.9)" : "rgba(180,80,80,0.9)", e.lineWidth = 1, e.strokeRect(K + 0.5, Ge + 0.5, ae - 1, De - 1)), we.is_poc) {
                const je = Ge + De * 0.5;
                e.strokeStyle = "rgba(200,180,100,0.9)", e.lineWidth = 1, e.beginPath(), e.moveTo(K, je), e.lineTo(ie, je), e.stroke();
              }
            }
        }
        const Xe = qe(G.levels[G.levels.length - 1]?.price_hi || R.high), ct = qe(G.levels[0]?.price_lo || R.low);
        if (e.strokeStyle = "rgba(120,130,150,0.25)", e.lineWidth = 1, e.strokeRect(K, Math.min(Xe, ct), ae, Math.abs(ct - Xe)), P) {
          const gt = qe(R.low) + 12;
          if (gt < Te - 4) {
            e.font = `${F * 0.8}px JetBrains Mono, monospace`;
            const Le = `V:${C(G.totalVol)}`, Ge = `D:${C(G.delta)}`, ut = e.measureText(Le).width, De = e.measureText(Ge).width, Qe = ut + 3 + De, ht = K + (ae - Qe) * 0.5;
            e.fillStyle = "rgba(120,170,200,0.9)", e.textAlign = "left", e.fillText(Le, ht, gt), e.fillStyle = G.delta >= 0 ? "rgba(100,180,130,0.9)" : "rgba(180,100,100,0.9)", e.fillText(Ge, ht + ut + 3, gt);
          }
        }
      });
    } else if (Ne === "flow_positioning")
      Ks({
        ctx: e,
        candles: i.candles,
        startIndex: i.startIndex,
        indexToX: be,
        priceToY: qe,
        morphAt: vs,
        candleBodyWidth: fn,
        wickWidth: Xs,
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
        const E = be(i.startIndex + c, i.startIndex), b = D.close > D.open, I = qe(D.close);
        e.beginPath(), e.moveTo(E, I), e.lineTo(E, I + (b ? -12 : 12)), e.stroke(), e.fillStyle = b ? "#21b3a4" : "#f0426c", e.beginPath(), e.arc(E, I + (b ? -14 : 14), 2, 0, Math.PI * 2), e.fill();
      });
    else if (Ne === "renko") {
      const D = Math.max(Ve.range * 0.015, Ve.range / 200 || 1), c = Math.max(D, 1e-4), E = [];
      let b = i.candles[0]?.close || Ve.min + Ve.range / 2, I = i.startIndex;
      i.candles.forEach((k, P) => {
        const W = i.startIndex + P, F = k.close - b;
        let L = Math.floor(Math.abs(F) / c);
        P === 0 && L === 0 && (L = 1);
        for (let w = 0; w < L; w++) {
          const C = F >= 0 || w === 0 && P === 0 && k.close >= k.open, j = b, R = C ? b + c : b - c;
          if (R < Ve.min - Ve.range || R > Ve.max + Ve.range) {
            b = R;
            continue;
          }
          E.push({ gi: I + (w + 1), isBullish: C, bottom: Math.min(j, R), top: Math.max(j, R) }), b = R;
        }
        L > 0 && (I = W);
      }), E.length === 0 ? Ks({
        ctx: e,
        candles: i.candles,
        startIndex: i.startIndex,
        indexToX: be,
        priceToY: qe,
        morphAt: vs,
        candleBodyWidth: fn,
        wickWidth: Xs,
        colors: {
          bullish: te.bullish,
          bearish: te.bearish,
          bullishWick: te.bullishWick,
          bearishWick: te.bearishWick,
          bullishBorder: te.bullishBorder,
          bearishBorder: te.bearishBorder
        }
      }) : E.forEach((k) => {
        const P = be(k.gi, i.startIndex), W = qe(k.top), F = qe(k.bottom), L = Math.max(2, Math.abs(F - W)), w = Math.min(W, F);
        e.fillStyle = k.isBullish ? te.bullish : te.bearish, e.fillRect(P - fn / 2, w, fn, L), e.strokeStyle = k.isBullish ? te.bullishBorder : te.bearishBorder, e.lineWidth = 1, e.strokeRect(P - fn / 2, w, fn, L);
      });
    }
    if (S) {
      const D = Te * 0.2, c = Te, E = c - D, b = i.candles.map((P) => P.volume ?? 0).filter((P) => P > 0), I = b.length > 0 ? Math.max(...b) : 1, k = Math.max(2, rn * 0.7);
      i.candles.forEach((P, W) => {
        const F = P.volume ?? 0;
        if (F > 0) {
          const L = i.startIndex + W, w = be(L, i.startIndex), j = F / I * D * 0.95, R = c - j, Q = P.close >= P.open, le = r?.volume?.upColor || "#26a69a", X = r?.volume?.downColor || "#ef5350", H = Q ? le : X, K = parseInt(H.slice(1, 3), 16), ie = parseInt(H.slice(3, 5), 16), ae = parseInt(H.slice(5, 7), 16);
          e.fillStyle = `rgba(${K}, ${ie}, ${ae}, 0.45)`, e.fillRect(w - k / 2, R, k, j), e.strokeStyle = `rgba(${K}, ${ie}, ${ae}, 0.7)`, e.lineWidth = 1, e.beginPath(), e.moveTo(w - k / 2, R), e.lineTo(w + k / 2, R), e.stroke();
        }
      }), Bt === "volume" && (e.save(), i.candles.forEach((W, F) => {
        const L = W.volume ?? 0;
        if (L <= 0) return;
        const w = i.candles[F - 1]?.volume ?? 0, C = i.candles[F + 1]?.volume ?? 0;
        if (L < w || L < C) return;
        const j = i.startIndex + F, R = be(j, i.startIndex), le = L / I * D * 0.95, X = c - le;
        e.beginPath(), e.arc(R, X, 2.5 + 1, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc(R, X, 2.5, 0, Math.PI * 2);
        const H = W.close >= W.open;
        e.fillStyle = H ? r?.volume?.upColor || "#26a69a" : r?.volume?.downColor || "#ef5350", e.fill();
      }), e.restore()), on.current.volume = { top: E, bottom: c };
    }
    if (e.restore(), r) {
      if (r.ema?.enabled && s?.ema && r.ema.periods?.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = ar ? ["#D1D4DC", "#A0A4B0", "#B2B5BE", "#9598A1", "#787B86"] : ["#363A45", "#5D606B", "#434651", "#787B86", "#9598A1"];
        r.ema.periods.forEach((E, b) => {
          const I = s.ema[b];
          if (!I) return;
          e.strokeStyle = c[b % c.length], e.lineWidth = 1.5, e.beginPath();
          let k = !1;
          i.candles.forEach((P, W) => {
            const F = i.startIndex + W, L = I[F];
            if (!isNaN(L) && isFinite(L)) {
              const w = be(F, i.startIndex), C = St(L, Ve);
              k ? e.lineTo(w, C) : (e.moveTo(w, C), k = !0);
            }
          }), e.stroke();
        }), e.restore();
      }
      if (s?.movingAverages && s.movingAverages.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = r?.movingAverages?.lineWidth ?? 1.5;
        s.movingAverages.forEach((E) => {
          e.strokeStyle = E.color, e.lineWidth = c, e.beginPath();
          let b = !1;
          i.candles.forEach((I, k) => {
            const P = i.startIndex + k, W = E.data[P];
            if (!isNaN(W) && isFinite(W)) {
              const F = be(P, i.startIndex), L = St(W, Ve);
              b ? e.lineTo(F, L) : (e.moveTo(F, L), b = !0);
            }
          }), e.stroke();
        }), e.restore();
      }
      if (r.bollinger?.enabled && s?.bollinger) {
        const c = s.bollinger;
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const E = r.bollinger.lineWidth || 1, b = r.bollinger.upperColor || "#9B59B6", I = r.bollinger.middleColor || "#9B59B6", k = r.bollinger.lowerColor || "#9B59B6";
        e.strokeStyle = b, e.lineWidth = E, e.setLineDash([3, 3]), e.beginPath();
        let P = !1;
        i.candles.forEach((W, F) => {
          const L = i.startIndex + F, w = c.upper[L];
          if (!isNaN(w) && isFinite(w)) {
            const C = be(L, i.startIndex), j = St(w, Ve);
            P ? e.lineTo(C, j) : (e.moveTo(C, j), P = !0);
          }
        }), e.stroke(), e.strokeStyle = I, e.lineWidth = E, e.setLineDash([]), e.beginPath(), P = !1, i.candles.forEach((W, F) => {
          const L = i.startIndex + F, w = c.middle[L];
          if (!isNaN(w) && isFinite(w)) {
            const C = be(L, i.startIndex), j = St(w, Ve);
            P ? e.lineTo(C, j) : (e.moveTo(C, j), P = !0);
          }
        }), e.stroke(), e.strokeStyle = k, e.lineWidth = E, e.setLineDash([3, 3]), e.beginPath(), P = !1, i.candles.forEach((W, F) => {
          const L = i.startIndex + F, w = c.lower[L];
          if (!isNaN(w) && isFinite(w)) {
            const C = be(L, i.startIndex), j = St(w, Ve);
            P ? e.lineTo(C, j) : (e.moveTo(C, j), P = !0);
          }
        }), e.stroke(), e.setLineDash([]), e.restore();
      }
      if (s?.vwap) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip(), e.strokeStyle = r?.vwap?.color || "#2196F3", e.lineWidth = 2, e.beginPath();
        let c = !1;
        i.candles.forEach((E, b) => {
          const I = i.startIndex + b, k = s.vwap[I];
          if (!isNaN(k) && isFinite(k)) {
            const P = be(I, i.startIndex), W = St(k, Ve);
            c ? e.lineTo(P, W) : (e.moveTo(P, W), c = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (s?.ichimoku) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = s.ichimoku, E = r?.ichimoku?.tenkanColor || "#0496ff", b = r?.ichimoku?.kijunColor || "#ff0000", I = r?.ichimoku?.cloudUpColor || "rgba(0, 255, 0, 0.2)", k = r?.ichimoku?.cloudDownColor || "rgba(255, 0, 0, 0.2)";
        for (let W = 0; W < i.candles.length; W++) {
          const F = i.startIndex + W, L = c.senkouA[F], w = c.senkouB[F];
          if (!isNaN(L) && !isNaN(w) && isFinite(L) && isFinite(w)) {
            const C = be(F, i.startIndex), j = St(L, Ve), R = St(w, Ve);
            e.fillStyle = L >= w ? I : k;
            const Q = rn * (1 + Ze);
            e.fillRect(C - Q / 2, Math.min(j, R), Q, Math.abs(j - R));
          }
        }
        e.strokeStyle = E, e.lineWidth = 1.5, e.beginPath();
        let P = !1;
        i.candles.forEach((W, F) => {
          const L = i.startIndex + F, w = c.tenkan[L];
          if (!isNaN(w) && isFinite(w)) {
            const C = be(L, i.startIndex), j = St(w, Ve);
            P ? e.lineTo(C, j) : (e.moveTo(C, j), P = !0);
          }
        }), e.stroke(), e.strokeStyle = b, e.lineWidth = 1.5, e.beginPath(), P = !1, i.candles.forEach((W, F) => {
          const L = i.startIndex + F, w = c.kijun[L];
          if (!isNaN(w) && isFinite(w)) {
            const C = be(L, i.startIndex), j = St(w, Ve);
            P ? e.lineTo(C, j) : (e.moveTo(C, j), P = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (s?.parabolicSAR) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = s.parabolicSAR, E = r?.parabolicSAR?.bullishColor || "#22c55e", b = r?.parabolicSAR?.bearishColor || "#ef4444";
        i.candles.forEach((I, k) => {
          const P = i.startIndex + k, W = c.sar[P], F = c.direction[P];
          if (!isNaN(W) && isFinite(W)) {
            const L = be(P, i.startIndex), w = St(W, Ve);
            e.fillStyle = F > 0 ? E : b, e.beginPath(), e.arc(L, w, 2.5, 0, Math.PI * 2), e.fill();
          }
        }), e.restore();
      }
      if (s?.keltner) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = s.keltner, E = r?.keltner?.upperColor || "#FF9800", b = r?.keltner?.middleColor || "#FF9800", I = r?.keltner?.lowerColor || "#FF9800";
        e.strokeStyle = E, e.lineWidth = 1, e.setLineDash([3, 3]), e.beginPath();
        let k = !1;
        i.candles.forEach((P, W) => {
          const F = i.startIndex + W, L = c.upper[F];
          if (!isNaN(L) && isFinite(L)) {
            const w = be(F, i.startIndex), C = St(L, Ve);
            k ? e.lineTo(w, C) : (e.moveTo(w, C), k = !0);
          }
        }), e.stroke(), e.strokeStyle = b, e.setLineDash([]), e.beginPath(), k = !1, i.candles.forEach((P, W) => {
          const F = i.startIndex + W, L = c.middle[F];
          if (!isNaN(L) && isFinite(L)) {
            const w = be(F, i.startIndex), C = St(L, Ve);
            k ? e.lineTo(w, C) : (e.moveTo(w, C), k = !0);
          }
        }), e.stroke(), e.strokeStyle = I, e.setLineDash([3, 3]), e.beginPath(), k = !1, i.candles.forEach((P, W) => {
          const F = i.startIndex + W, L = c.lower[F];
          if (!isNaN(L) && isFinite(L)) {
            const w = be(F, i.startIndex), C = St(L, Ve);
            k ? e.lineTo(w, C) : (e.moveTo(w, C), k = !0);
          }
        }), e.stroke(), e.setLineDash([]), e.restore();
      }
      if (s?.pivotPoints) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = s.pivotPoints, E = r?.pivotPoints?.pivotColor || "#FFEB3B", b = r?.pivotPoints?.resistanceColor || "#ef4444", I = r?.pivotPoints?.supportColor || "#22c55e", k = (P, W, F, L = []) => {
          const w = P.filter((C) => !isNaN(C) && isFinite(C)).pop();
          if (w !== void 0) {
            const C = St(w, Ve);
            e.strokeStyle = W, e.lineWidth = 1, e.setLineDash(L), e.beginPath(), e.moveTo(0, C), e.lineTo(Z, C), e.stroke(), e.fillStyle = W, e.font = Zt, e.textAlign = "left", e.fillText(F, 5, C - 3);
          }
        };
        e.setLineDash([]), k(c.pivot, E, "P"), k(c.r1, b, "R1", [2, 2]), k(c.r2, b, "R2", [4, 2]), k(c.r3, b, "R3", [6, 2]), k(c.s1, I, "S1", [2, 2]), k(c.s2, I, "S2", [4, 2]), k(c.s3, I, "S3", [6, 2]), e.setLineDash([]), e.restore();
      }
      if (s?.supertrend) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = s.supertrend, E = r?.supertrend?.bullishColor || "#22c55e", b = r?.supertrend?.bearishColor || "#ef4444";
        e.lineWidth = r?.supertrend?.lineWidth || 2, i.candles.forEach((I, k) => {
          const P = i.startIndex + k, W = c.supertrend[P];
          if (isNaN(W) || !isFinite(W)) return;
          const F = be(P, i.startIndex), L = St(W, Ve), w = P - 1;
          w >= 0 && !isNaN(c.supertrend[w]) && (e.strokeStyle = c.direction[P] === 1 ? E : b, e.beginPath(), e.moveTo(be(w, i.startIndex), St(c.supertrend[w], Ve)), e.lineTo(F, L), e.stroke());
        }), e.restore();
      }
      if (s?.donchian) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = s.donchian, E = (b, I, k = []) => {
          e.strokeStyle = I, e.lineWidth = r?.donchian?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let P = !1;
          i.candles.forEach((W, F) => {
            const L = i.startIndex + F, w = b[L];
            if (!isNaN(w) && isFinite(w)) {
              const C = be(L, i.startIndex), j = St(w, Ve);
              P ? e.lineTo(C, j) : (e.moveTo(C, j), P = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        E(c.upper, r?.donchian?.upperColor || "#2196F3"), E(c.middle, r?.donchian?.middleColor || "#FFC107", [4, 4]), E(c.lower, r?.donchian?.lowerColor || "#2196F3"), e.restore();
      }
      if (s?.envelopes) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = s.envelopes, E = (b, I, k = []) => {
          e.strokeStyle = I, e.lineWidth = r?.envelopes?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let P = !1;
          i.candles.forEach((W, F) => {
            const L = i.startIndex + F, w = b[L];
            if (!isNaN(w) && isFinite(w)) {
              const C = be(L, i.startIndex);
              P ? e.lineTo(C, St(w, Ve)) : (e.moveTo(C, St(w, Ve)), P = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        E(c.upper, r?.envelopes?.upperColor || "#00BCD4"), E(c.middle, r?.envelopes?.middleColor || "#FFC107", [3, 3]), E(c.lower, r?.envelopes?.lowerColor || "#00BCD4"), e.restore();
      }
      if ([
        { key: "dema", defaultColor: "#FF9800", label: "DEMA" },
        { key: "tema", defaultColor: "#E91E63", label: "TEMA" },
        { key: "hma", defaultColor: "#00E676", label: "HMA" }
      ].forEach(({ key: c, defaultColor: E }) => {
        const b = s?.[c];
        if (!b) return;
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip(), e.strokeStyle = r?.[c]?.color || E, e.lineWidth = r?.[c]?.lineWidth || 2, e.beginPath();
        let I = !1;
        i.candles.forEach((k, P) => {
          const W = i.startIndex + P, F = b[W];
          if (!isNaN(F) && isFinite(F)) {
            const L = be(W, i.startIndex), w = St(F, Ve);
            I ? e.lineTo(L, w) : (e.moveTo(L, w), I = !0);
          }
        }), e.stroke(), e.restore();
      }), s?.linearReg) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = s.linearReg, E = (b, I, k = []) => {
          e.strokeStyle = I, e.lineWidth = r?.linearReg?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let P = !1;
          i.candles.forEach((W, F) => {
            const L = i.startIndex + F, w = b[L];
            if (!isNaN(w) && isFinite(w)) {
              const C = be(L, i.startIndex);
              P ? e.lineTo(C, St(w, Ve)) : (e.moveTo(C, St(w, Ve)), P = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        E(c.upper, r?.linearReg?.upperColor || "#81D4FA"), E(c.middle, r?.linearReg?.middleColor || "#29B6F6", [4, 4]), E(c.lower, r?.linearReg?.lowerColor || "#81D4FA"), e.restore();
      }
      if (s?.fibRetracement) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = s.fibRetracement, E = r?.fibRetracement?.color || "#FFD54F", b = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
        c.levels.forEach((I, k) => {
          const P = St(I, Ve);
          e.strokeStyle = E, e.lineWidth = r?.fibRetracement?.lineWidth || 1, e.setLineDash(k === 0 || k === 6 ? [] : [4, 3]), e.beginPath(), e.moveTo(0, P), e.lineTo(Z, P), e.stroke(), e.fillStyle = E, e.font = Zt, e.textAlign = "left", e.fillText(`${(b[k] * 100).toFixed(1)}% (${I.toFixed(2)})`, 5, P - 3);
        }), e.setLineDash([]), e.restore();
      }
      if (s?.camarillaPivots) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = s.camarillaPivots, E = r?.camarillaPivots?.resistanceColor || "#ef4444", b = r?.camarillaPivots?.supportColor || "#22c55e", I = (k, P, W) => {
          const F = k.filter((L) => !isNaN(L) && isFinite(L)).pop();
          if (F !== void 0) {
            const L = St(F, Ve);
            e.strokeStyle = P, e.lineWidth = r?.camarillaPivots?.lineWidth || 1, e.setLineDash([3, 3]), e.beginPath(), e.moveTo(0, L), e.lineTo(Z, L), e.stroke(), e.fillStyle = P, e.font = Zt, e.textAlign = "left", e.fillText(W, 5, L - 3);
          }
        };
        I(c.h4, E, "H4"), I(c.h3, E, "H3"), I(c.l3, b, "L3"), I(c.l4, b, "L4"), e.setLineDash([]), e.restore();
      }
      if (s?.woodiePivots) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = s.woodiePivots, E = r?.woodiePivots?.pivotColor || "#FFEB3B", b = r?.woodiePivots?.resistanceColor || "#ef4444", I = r?.woodiePivots?.supportColor || "#22c55e", k = (P, W, F) => {
          const L = P.filter((w) => !isNaN(w) && isFinite(w)).pop();
          if (L !== void 0) {
            const w = St(L, Ve);
            e.strokeStyle = W, e.lineWidth = r?.woodiePivots?.lineWidth || 1, e.setLineDash([3, 3]), e.beginPath(), e.moveTo(0, w), e.lineTo(Z, w), e.stroke(), e.fillStyle = W, e.font = Zt, e.textAlign = "left", e.fillText(F, 5, w - 3);
          }
        };
        k(c.pivot, E, "WP"), k(c.r1, b, "WR1"), k(c.r2, b, "WR2"), k(c.s1, I, "WS1"), k(c.s2, I, "WS2"), e.setLineDash([]), e.restore();
      }
      if (s?.volumeSma && S) {
        e.save();
        const c = s.volumeSma, E = Te * 0.2, b = Te, I = i.candles.map((W) => W.volume || 0), k = Math.max(...I, 1);
        e.strokeStyle = r?.volumeSma?.color || "#FF9800", e.lineWidth = 1.5, e.beginPath();
        let P = !1;
        i.candles.forEach((W, F) => {
          const L = i.startIndex + F, w = c[L];
          if (!isNaN(w) && isFinite(w)) {
            const C = be(L, i.startIndex), j = b - w / k * E;
            P ? e.lineTo(C, j) : (e.moveTo(C, j), P = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (r?.volumeProfile?.enabled && i.candles.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = r.volumeProfile.numberOfRows ?? 48, E = Z * ((r.volumeProfile.rowWidth ?? 15) / 100), b = (r.volumeProfile.opacity ?? 60) / 100, I = r.volumeProfile.upColor || "#D97706", k = r.volumeProfile.downColor || "#1E3A8A", P = r.volumeProfile.pocColor || "#10B981", W = r.volumeProfile.lookbackBars ?? 0, F = W > 0 ? i.candles.slice(-W) : i.candles;
        let L = 1 / 0, w = -1 / 0;
        F.forEach((X) => {
          L = Math.min(L, X.low), w = Math.max(w, X.high);
        });
        const j = (w - L || 1) / c, R = [];
        for (let X = 0; X < c; X++)
          R.push({
            priceLevel: L + (X + 0.5) * j,
            upVolume: 0,
            downVolume: 0,
            totalVolume: 0
          });
        F.forEach((X) => {
          if (!X.volume || X.volume <= 0) return;
          const H = X.low, K = X.high, ie = K - H, ae = X.close >= X.open;
          for (let G = 0; G < c; G++) {
            const ke = L + G * j, Se = ke + j;
            if (K >= ke && H <= Se) {
              const Xe = Math.max(H, ke), ct = Math.min(K, Se), we = ie > 0 ? (ct - Xe) / ie : 1, gt = X.volume * we;
              ae ? R[G].upVolume += gt : R[G].downVolume += gt, R[G].totalVolume += gt;
            }
          }
        });
        let Q = 0, le = 0;
        if (R.forEach((X, H) => {
          X.totalVolume > Q && (Q = X.totalVolume, le = H);
        }), Q > 0) {
          const X = Te / c * 0.85;
          R.forEach((H, K) => {
            if (H.totalVolume <= 0) return;
            const ie = qe(H.priceLevel) - X / 2, ae = H.totalVolume / Q * E, G = H.totalVolume > 0 ? H.upVolume / H.totalVolume * ae : 0, ke = ae - G, Se = K === le, Xe = Z - ae;
            G > 0 && (e.globalAlpha = Se ? Math.min(b + 0.2, 1) : b, e.fillStyle = I, e.fillRect(Xe, ie, G, X)), ke > 0 && (e.globalAlpha = Se ? 0.95 : 0.85, e.fillStyle = k, e.fillRect(Xe + G, ie, ke, X)), Se && (e.globalAlpha = 0.9, e.strokeStyle = P, e.lineWidth = 1.5, e.strokeRect(Xe, ie, ae, X));
          }), e.globalAlpha = 1, Bt === "volumeProfile" && R.forEach((K, ie) => {
            if (K.totalVolume <= 0) return;
            const ae = qe(K.priceLevel), G = K.totalVolume / Q * E, ke = Z - G;
            e.beginPath(), e.arc(ke, ae, 2.5 + 1, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc(ke, ae, 2.5, 0, Math.PI * 2), e.fillStyle = K.upVolume >= K.downVolume ? I : k, e.fill();
          });
        }
        e.restore(), e.restore();
      }
    }
    const Ys = [], Ls = [];
    let Yo = "", Bl = "", po = 14, Wl = 0, Dl = 0;
    const wi = Ms?.current && Ms.current.length > 0;
    if (Cs && !wi && os) {
      const D = os.find((c) => c.id === Cs);
      if (D && D.points && D.points.length > 0) {
        e.save();
        const c = Ke.badgeFont, E = "#2962ff", b = "rgba(41, 98, 255, 0.2)", I = Ke.badgePadding, k = Ke.badgeRowHeight, P = Ue - 6, W = Z + 3, F = xe.height - Lt, L = F + (Lt - k) / 2;
        if (Yo = c, Bl = E, po = k, Wl = L, Dl = W, D.points.forEach((w) => {
          let C = null, j = null;
          if (w.price !== void 0 && (j = qe(w.price), j >= 0 && j <= Te)) {
            const R = Fn(w.price), Q = e.measureText(R).width, le = Math.min(Q + I * 2, P), X = j - k / 2;
            Ls.push({
              pos: j,
              text: R,
              bWidth: le,
              topOrigin: X
            });
          }
          if (w.time !== void 0) {
            let R = -1;
            if (o.length > 0) {
              const Q = o[0].time, le = o[o.length - 1].time, X = o.length > 1 ? o[1].time - o[0].time : 6e4;
              if (w.time > le) R = o.length - 1 + (w.time - le) / X;
              else if (w.time < Q) R = (w.time - Q) / X;
              else {
                let H = 0, K = o.length - 1;
                for (; H <= K; ) {
                  const ie = Math.floor((H + K) / 2);
                  if (o[ie].time === w.time) {
                    R = ie;
                    break;
                  }
                  o[ie].time < w.time ? H = ie + 1 : K = ie - 1;
                }
                if (R === -1) {
                  const ie = H, ae = ie - 1;
                  if (ae >= 0 && ie < o.length) {
                    const G = o[ae], ke = o[ie], Se = (w.time - G.time) / (ke.time - G.time);
                    R = ae + Se;
                  } else
                    R = H;
                }
              }
            }
            if (R !== -1) {
              const Q = Ie.current.startIndex, X = Ie.current.candleWidth * (1 + Ze), H = Math.floor(Q), K = (Q - H) * X;
              C = (R - H) * X + X / 2 - K;
            }
            if (C !== null && C >= 0 && C <= Z) {
              const Q = `${fr(w.time)} ${ts(w.time, !0)}  ${Ns(w.time)}`, X = e.measureText(Q).width + I * 2;
              let H = C - X / 2;
              H < 0 && (H = 0), H + X > Z && (H = Z - X), Ys.push({
                pos: C,
                text: Q,
                bWidth: X,
                topOrigin: H
              });
            }
          }
        }), (D.type === "long" || D.type === "short") && D.stopLoss) {
          const w = D.stopLoss.price, C = qe(w);
          if (C >= 0 && C <= Te) {
            e.font = Yo || c;
            const j = Fn(w), R = e.measureText(j).width, Q = Math.min(R + I * 2, P), le = C - k / 2;
            Ls.push({
              pos: C,
              text: j,
              bWidth: Q,
              topOrigin: le
            });
          }
        }
        if (Ys.length >= 2) {
          const w = Math.min(...Ys.map((j) => j.pos)), C = Math.max(...Ys.map((j) => j.pos));
          C > w && (e.fillStyle = b, e.fillRect(w, F, C - w, Lt));
        }
        if (Ls.length >= 2) {
          const w = Math.min(...Ls.map((j) => j.pos)), C = Math.max(...Ls.map((j) => j.pos));
          C > w && (e.fillStyle = b, e.fillRect(W - 3, w, Ue, C - w));
        }
        e.restore();
      }
    }
    e.fillStyle = te.axisLabel || "#787b86", e.font = Eo, e.textBaseline = "middle", e.textAlign = Ke.priceLabelAlign;
    const Si = Ke.priceLabelAlign === "right" ? x - (zn !== void 0 ? zn : _l) - 4 : Z + 2;
    let Er = -1 / 0;
    for (let D = Mr; D <= Ve.max; D += Xo) {
      const c = qe(D);
      if (c >= 10 && c <= Te - 10) {
        if (Math.abs(c - Er) < Tr) continue;
        Er = c, e.fillText(Fn(D), Si, c);
      }
    }
    const tn = n != null && !Number.isNaN(n) ? n : i.candles.length ? i.candles[i.candles.length - 1].close : null;
    if (tn != null && !Number.isNaN(tn) && !Wt) {
      const D = qe(tn);
      if (D >= 0 && D <= Te) {
        e.save();
        const c = i.candles.length >= 2 ? i.candles[i.candles.length - 2] : null, E = i.candles.length >= 1 ? i.candles[i.candles.length - 1] : null, b = c ? c.close : E ? E.open : tn, I = tn >= b, k = te.priceTickerBullish || te.bullish, P = te.priceTickerBearish || te.bearish, W = I ? k : P, F = (ht) => {
          const ot = ht.replace("#", ""), mt = parseInt(ot.substring(0, 2), 16), je = parseInt(ot.substring(2, 4), 16), Mt = parseInt(ot.substring(4, 6), 16);
          return `${mt}, ${je}, ${Mt}`;
        }, L = F(te.textDim || "#666666"), w = `rgba(${L}, 0.35)`, C = `rgba(${L}, 0.9)`, j = F(W).split(",").map(Number), R = (0.299 * j[0] + 0.587 * j[1] + 0.114 * j[2]) / 255, Q = Number.isNaN(R) || R <= 0.55 ? "#ffffff" : "#000000", le = i.candles.length - 1, X = i.candles.length > 0 ? be(i.startIndex + le, i.startIndex) : 0;
        X > 0 && (e.strokeStyle = w, e.lineWidth = 1, e.setLineDash([4, 4]), e.beginPath(), e.moveTo(0, D), e.lineTo(X, D), e.stroke(), e.setLineDash([])), e.strokeStyle = C, e.lineWidth = 1, e.setLineDash([4, 3]), e.beginPath(), e.moveTo(X, D), e.lineTo(Z, D), e.stroke(), e.setLineDash([]);
        const H = Fn(tn), K = Eo, ie = Ke.liveCountdownFont;
        e.font = K;
        const G = e.measureText(H).width, ke = Ke.livePriceLabelPadding, Se = Ke.livePriceRowHeight, Xe = M && M.length > 0, ct = Xe ? Ke.countdownRowHeight : 0, we = Se + ct;
        let gt = 0;
        Xe && (e.font = ie, gt = e.measureText(M).width);
        const Le = Ue - 6, Ge = Math.max(G, gt) + ke * 2, ut = Math.min(Ge, Le), De = Z + 3, Qe = D - Se / 2;
        e.fillStyle = te.background, e.fillRect(De - 1, Qe - 1, ut + 2, we + 2), e.fillStyle = W, e.beginPath(), e.roundRect(De, Qe, ut, we, 3), e.fill(), e.fillStyle = Q, e.font = K, e.textAlign = "center", e.textBaseline = "middle", e.fillText(H, De + ut / 2, Qe + Se / 2), Xe && (e.strokeStyle = Q === "#ffffff" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)", e.lineWidth = 0.5, e.beginPath(), e.moveTo(De + 3, Qe + Se), e.lineTo(De + ut - 3, Qe + Se), e.stroke(), e.fillStyle = Q === "#ffffff" ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)", e.font = ie, e.textAlign = "center", e.textBaseline = "middle", e.fillText(M, De + ut / 2, Qe + Se + ct / 2)), e.restore();
      }
    }
    if (os && os.length > 0) {
      e.save();
      const D = Eo;
      e.font = D;
      const c = Ke.badgePadding, E = Ke.badgeRowHeight, b = [], I = [];
      os.forEach((C) => {
        if ((C.type === "horizontalRay" || C.type === "horizontal") && C.points.length > 0) {
          const j = C.points[0].price;
          b.push({ price: j, color: C.color || "#2196f3", yPos: qe(j) });
        } else if ((C.type === "long" || C.type === "short") && C.points.length >= 2) {
          if (C.id === Cs) return;
          const j = C.points[0].price, R = C.points[1].price;
          if (b.push({ price: j, color: "#4b5563", yPos: qe(j) }), b.push({ price: R, color: "#22c55e", yPos: qe(R) }), C.stopLoss) {
            const Q = C.stopLoss.price;
            b.push({ price: Q, color: "#ef4444", yPos: qe(Q) });
          }
        }
      });
      let k = -9999, P = -9999;
      if (tn != null && !Number.isNaN(tn)) {
        const C = qe(tn), j = Ke.livePriceRowHeight + (M && M.length > 0 ? Ke.countdownRowHeight : 0);
        k = C - Ke.livePriceRowHeight / 2, P = k + j;
      }
      const W = 2, F = Ue - 6, L = Z + 3;
      b.sort((C, j) => C.yPos - j.yPos);
      let w = -9999;
      b.forEach((C) => {
        let j = C.yPos - E / 2, R = j + E;
        if (j < w + W && (j = w + W, R = j + E), j < P + W && R > k - W && (j = P + W, R = j + E), w = R, j >= 0 && R <= Te) {
          const Q = Fn(C.price), le = e.measureText(Q).width, X = Math.min(le + c * 2, F);
          e.fillStyle = C.color, e.beginPath(), e.roundRect(L, j, X, E, 3), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.fillText(Q, L + X / 2, j + E / 2);
        }
      }), e.font = Ke.alertFlagFont, I.forEach((C) => {
        if (C.xPos >= 0 && C.xPos <= Z) {
          const j = ts(C.time, !0) + " " + Ns(C.time), Q = e.measureText(j).width + c * 2, X = xe.height - Lt + (Lt - E) / 2;
          let H = C.xPos - Q / 2;
          H < 0 && (H = 0), H + Q > Z && (H = Z - Q), e.fillStyle = C.color, e.beginPath(), e.roundRect(H, X, Q, E, 3), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.fillText(j, H + Q / 2, X + E / 2);
        }
      }), e.restore();
    }
    if (Wt && tn !== null && tn !== void 0 && !Number.isNaN(tn)) {
      const D = $t != null && cn != null && Number.isFinite($t) && Number.isFinite(cn), c = D ? $t : tn, E = D ? cn : tn + dd(d || ""), b = qe(c), I = qe(E);
      if (e.save(), b >= 0 && b <= Te) {
        e.strokeStyle = "#1976d2", e.lineWidth = 1, e.setLineDash([3, 4]), e.beginPath(), e.moveTo(0, b), e.lineTo(Z, b), e.stroke(), e.setLineDash([]);
        const k = Fn(c);
        e.font = Ke.alertCountFont;
        const W = e.measureText(k).width + 12, F = 16, L = Z + 2;
        e.fillStyle = "#1976d2", e.beginPath(), e.roundRect(L, b - F / 2, Math.min(W, Ue - 4), F, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "left", e.textBaseline = "middle", e.fillText(k, L + 6, b);
      }
      if (I >= 0 && I <= Te) {
        e.strokeStyle = "#d32f2f", e.lineWidth = 1, e.setLineDash([3, 4]), e.beginPath(), e.moveTo(0, I), e.lineTo(Z, I), e.stroke(), e.setLineDash([]);
        const k = Fn(E);
        e.font = Ke.alertCountFont;
        const W = e.measureText(k).width + 12, F = 16, L = Z + 2;
        e.fillStyle = "#d32f2f", e.beginPath(), e.roundRect(L, I - F / 2, Math.min(W, Ue - 4), F, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "left", e.textBaseline = "middle", e.fillText(k, L + 6, I);
      }
      b >= 0 && I >= 0 && b <= Te && I <= Te && (e.fillStyle = "rgba(148, 163, 184, 0.04)", e.fillRect(0, Math.min(I, b), Z, Math.abs(b - I))), e.restore();
    }
    if (Oe && Oe.length > 0) {
      const D = {
        ctx: e,
        chartWidth: Z,
        mainChartHeight: Te,
        mainPriceToY: qe,
        formatPrice: Fn,
        colors: {
          slColor: te.slColor,
          slOpacity: te.slOpacity,
          tpColor: te.tpColor,
          tpOpacity: te.tpOpacity
        },
        selectedPositionId: Ee.current,
        slDraft: wt.current,
        tpDraft: vt.current,
        hoveredSLTP: _n.current,
        draggingHandle: yt.current,
        defaultOffset: Un(0) || void 0
      };
      Lu(D, Oe), Eu(D, Oe);
    }
    if (Bt && !Bt.startsWith("sp-") && s) {
      const D = Ve;
      if (D && Te > 0) {
        const b = (k, P) => {
          e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
          for (let W = 0; W < i.candles.length; W += 8) {
            const F = i.startIndex + W;
            if (F >= k.length) continue;
            const L = k[F];
            if (isNaN(L) || !isFinite(L)) continue;
            const w = be(F, i.startIndex), C = Te - (L - D.min) / D.range * Te;
            e.beginPath(), e.arc(w, C, 3.5, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc(w, C, 2.5, 0, Math.PI * 2), e.fillStyle = P, e.fill();
          }
          e.restore();
        }, I = Bt;
        if (I === "movingAverages" && s.movingAverages)
          for (const k of s.movingAverages) b(k.data, k.color);
        else if (I?.startsWith("movingAverages__") && s.movingAverages) {
          const k = parseInt(I.slice(16), 10), P = s.movingAverages[k];
          P && b(P.data, P.color);
        } else if (I === "bollinger" && s.bollinger) {
          const k = s.bollinger;
          b(k.upper, r?.bollinger?.upperColor || "#9B59B6"), b(k.middle, r?.bollinger?.middleColor || "#9B59B6"), b(k.lower, r?.bollinger?.lowerColor || "#9B59B6");
        } else if (I === "vwap" && s.vwap)
          b(s.vwap, "#ff9800");
        else if (I === "ichimoku" && s.ichimoku) {
          const k = s.ichimoku;
          b(k.tenkan, "#0094FF"), b(k.kijun, "#AD1457"), b(k.senkouA, "#4CAF50"), b(k.senkouB, "#FF5722");
        } else if (I === "keltner" && s.keltner)
          b(s.keltner.upper, "#3b82f6"), b(s.keltner.middle, "#3b82f6"), b(s.keltner.lower, "#3b82f6");
        else if (I === "donchian" && s.donchian)
          b(s.donchian.upper, "#3b82f6"), b(s.donchian.middle, "#3b82f6"), b(s.donchian.lower, "#3b82f6");
        else if (I === "envelopes" && s.envelopes)
          b(s.envelopes.upper, "#3b82f6"), b(s.envelopes.basis, "#3b82f6"), b(s.envelopes.lower, "#3b82f6");
        else if (I === "supertrend" && s.supertrend) {
          const k = s.supertrend.map((P) => P?.value ?? NaN);
          b(k, "#3b82f6");
        } else if (["dema", "tema", "hma"].includes(I)) {
          const k = s[I];
          Array.isArray(k) && b(k, "#3b82f6");
        } else if (I.startsWith("ci-") && r?.customIndicators) {
          const k = r.customIndicators.find((W) => `ci-${W.id}` === I), P = k?.data;
          k && P && Array.isArray(P) && b(P, k.color);
        } else if (I.startsWith("script-") && r?.customIndicators) {
          const k = I.slice(7);
          for (const P of r.customIndicators) {
            if (P.scriptId !== k) continue;
            const W = P.data;
            W && Array.isArray(W) && b(W, P.color);
          }
        }
      }
    }
    let Kt = Te;
    if (s?.rsi) {
      const D = ns, c = Kt, E = c + D, b = r?.rsi?.style || {};
      b.backgroundColor && (e.fillStyle = b.backgroundColor, e.globalAlpha = b.backgroundOpacity ?? 0.3, e.fillRect(0, c, Z, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(Z, c), e.stroke();
      const I = (H) => c + D - H / 100 * D, k = r?.rsi?.overbought ?? 70, P = r?.rsi?.oversold ?? 30;
      if (b.showZones) {
        const H = I(k), K = I(P), ie = b.zoneOpacity ?? 0.1;
        e.fillStyle = b.overboughtZoneColor || "#ff4444", e.globalAlpha = ie, e.fillRect(0, c, Z, H - c), e.fillStyle = b.oversoldZoneColor || "#44ff44", e.fillRect(0, K, Z, E - K), e.globalAlpha = 1;
      }
      if (b.showGrid !== !1) {
        const H = b.gridColor || "rgba(150, 150, 150, 0.3)";
        e.setLineDash([4, 4]), [P, 50, k].forEach((K) => {
          e.beginPath(), K === 50 ? (e.strokeStyle = H, e.lineWidth = 1) : (e.strokeStyle = "rgba(180, 130, 80, 0.8)", e.lineWidth = 1.5);
          const ie = I(K);
          e.moveTo(0, ie), e.lineTo(Z, ie), e.stroke();
        }), e.setLineDash([]), e.lineWidth = 1;
      }
      const W = r?.rsi?.color || "#E74C3C", F = b.lineWidth ?? 1.5;
      e.strokeStyle = W, e.lineWidth = F, e.beginPath();
      let L = !1;
      i.candles.forEach((H, K) => {
        const ie = i.startIndex + K, ae = s.rsi[ie];
        if (!isNaN(ae) && isFinite(ae)) {
          const G = be(ie, i.startIndex), ke = I(ae);
          L ? e.lineTo(G, ke) : (e.moveTo(G, ke), L = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Zt, e.textAlign = "left", [0, P, 50, k, 100].forEach((H) => {
        const K = I(H);
        e.fillText(H.toString(), Z + 5, K);
      }), on.current.rsi = { top: c, bottom: E };
      const w = Ct.current !== null ? Ct.current : i.startIndex + i.candles.length - 1, C = s.rsi[w], j = !isNaN(C) && isFinite(C) ? C.toFixed(2) : "--", R = `RSI ${r?.rsi?.period || 14} close`, Q = r?.rsi?.style?.customLabel || R, le = r?.rsi?.style?.labelColor || "#d1d5db";
      e.fillStyle = le, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left", e.fillText(Q, 5, c + 15), e.fillStyle = W, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
      const X = e.measureText(Q).width;
      e.fillText(j, 13 + X, c + 15), Xn.current.rsi = 13 + X + e.measureText(j).width + 8, Kt = E;
    }
    if (s?.macd) {
      const D = ns, c = Kt, E = c + D, b = r?.macd?.style || {};
      b.backgroundColor && (e.fillStyle = b.backgroundColor, e.globalAlpha = b.backgroundOpacity ?? 0.3, e.fillRect(0, c, Z, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(Z, c), e.stroke();
      const I = s.macd.macd.slice(i.startIndex, i.endIndex), k = s.macd.signal.slice(i.startIndex, i.endIndex), P = s.macd.histogram.slice(i.startIndex, i.endIndex), W = [...I, ...k, ...P].filter((Qe) => !isNaN(Qe) && isFinite(Qe)), F = Math.min(...W, 0), w = Math.max(...W, 0) - F || 1, C = (Qe) => c + D - (Qe - F) / w * D;
      if (b.showGrid !== !1) {
        e.strokeStyle = b.gridColor || te.grid, e.setLineDash([2, 2]), e.beginPath();
        const Qe = C(0);
        e.moveTo(0, Qe), e.lineTo(Z, Qe), e.stroke(), e.setLineDash([]);
      }
      const j = Math.max(2, rn * 0.5), R = r?.macd?.histogramUpColor || "#26a69a", Q = r?.macd?.histogramDownColor || "#ef5350", le = C(0);
      i.candles.forEach((Qe, ht) => {
        const ot = i.startIndex + ht, mt = s.macd.histogram[ot];
        if (!isNaN(mt) && isFinite(mt)) {
          const je = be(ot, i.startIndex), Mt = C(mt), nn = Math.abs(le - Mt);
          e.fillStyle = mt >= 0 ? R : Q, mt >= 0 ? e.fillRect(je - j / 2, Mt, j, nn) : e.fillRect(je - j / 2, le, j, nn);
        }
      });
      const X = r?.macd?.macdColor || "#3498DB";
      e.strokeStyle = X, e.lineWidth = 1.5, e.beginPath();
      let H = !1;
      i.candles.forEach((Qe, ht) => {
        const ot = i.startIndex + ht, mt = s.macd.macd[ot];
        if (!isNaN(mt) && isFinite(mt)) {
          const je = be(ot, i.startIndex), Mt = C(mt);
          H ? e.lineTo(je, Mt) : (e.moveTo(je, Mt), H = !0);
        }
      }), e.stroke();
      const K = r?.macd?.signalColor || "#E67E22";
      e.strokeStyle = K, e.lineWidth = 1.5, e.beginPath(), H = !1, i.candles.forEach((Qe, ht) => {
        const ot = i.startIndex + ht, mt = s.macd.signal[ot];
        if (!isNaN(mt) && isFinite(mt)) {
          const je = be(ot, i.startIndex), Mt = C(mt);
          H ? e.lineTo(je, Mt) : (e.moveTo(je, Mt), H = !0);
        }
      }), e.stroke(), on.current.macd = { top: c, bottom: E };
      const ie = `MACD(${r?.macd?.fast || 12},${r?.macd?.slow || 26},${r?.macd?.signal || 9})`, ae = r?.macd?.style?.customLabel || ie, G = r?.macd?.style?.labelColor || te.textDim;
      e.fillStyle = G, e.font = `bold ${Zt}`, e.textAlign = "left";
      const ke = Ct.current !== null ? Ct.current : i.startIndex + i.candles.length - 1, Se = s.macd.macd[ke], Xe = s.macd.signal[ke], ct = s.macd.histogram[ke];
      e.fillText(ae, 5, c + 12), e.fillStyle = X, e.font = Zt;
      const we = e.measureText(ae).width, gt = !isNaN(Se) && isFinite(Se) ? Se.toFixed(4) : "--";
      e.fillText(gt, 10 + we, c + 12), e.fillStyle = K;
      const Le = !isNaN(Xe) && isFinite(Xe) ? Xe.toFixed(4) : "--", Ge = e.measureText(gt).width;
      e.fillText(Le, 16 + we + Ge, c + 12);
      const ut = !isNaN(ct) && isFinite(ct) ? ct.toFixed(4) : "--";
      e.fillStyle = ct >= 0 ? "#00ff88" : "#ff0080";
      const De = e.measureText(Le).width;
      e.fillText(ut, 22 + we + Ge + De, c + 12), Xn.current.macd = 22 + we + Ge + De + e.measureText(ut).width + 8, Kt = E;
    }
    if (s?.atr) {
      const D = ns, c = Kt, E = c + D, b = r?.atr?.style || {};
      b.backgroundColor && (e.fillStyle = b.backgroundColor, e.globalAlpha = b.backgroundOpacity ?? 0.3, e.fillRect(0, c, Z, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(Z, c), e.stroke();
      const I = s.atr.slice(i.startIndex, i.endIndex).filter((ie) => !isNaN(ie) && isFinite(ie)), k = Math.min(...I, 0), W = Math.max(...I) - k || 1, F = (ie) => c + D - (ie - k) / W * D, L = r?.atr?.color || "#17a2b8", w = b.lineWidth ?? 1.5;
      e.strokeStyle = L, e.lineWidth = w, e.beginPath();
      let C = !1;
      i.candles.forEach((ie, ae) => {
        const G = i.startIndex + ae, ke = s.atr[G];
        if (!isNaN(ke) && isFinite(ke)) {
          const Se = be(G, i.startIndex), Xe = F(ke);
          C ? e.lineTo(Se, Xe) : (e.moveTo(Se, Xe), C = !0);
        }
      }), e.stroke(), on.current.atr = { top: c, bottom: E };
      const j = `ATR(${r?.atr?.period || 14})`, R = r?.atr?.style?.customLabel || j, Q = r?.atr?.style?.labelColor || te.textDim;
      e.fillStyle = Q, e.font = `bold ${Zt}`, e.textAlign = "left";
      const le = Ct.current !== null ? Ct.current : i.startIndex + i.candles.length - 1, X = s.atr[le], H = !isNaN(X) && isFinite(X) ? X.toFixed(5) : "--";
      e.fillText(R, 5, c + 12), e.fillStyle = L, e.font = Zt;
      const K = e.measureText(R).width;
      e.fillText(H, 10 + K, c + 12), Xn.current.atr = 10 + K + e.measureText(H).width + 8, Kt = E;
    }
    if (s?.stochastic) {
      const D = ns, c = Kt, E = c + D, b = r?.stochastic?.style || {};
      b.backgroundColor && (e.fillStyle = b.backgroundColor, e.globalAlpha = b.backgroundOpacity ?? 0.3, e.fillRect(0, c, Z, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(Z, c), e.stroke();
      const I = (ae) => c + D - ae / 100 * D;
      e.strokeStyle = te.grid, e.setLineDash([2, 2]), e.beginPath();
      const k = r?.stochastic?.overbought ?? 80, P = r?.stochastic?.oversold ?? 20;
      [P, 50, k].forEach((ae) => {
        const G = I(ae);
        e.moveTo(0, G), e.lineTo(Z, G);
      }), e.stroke(), e.setLineDash([]);
      const W = r?.stochastic?.kColor || "#3498DB";
      e.strokeStyle = W, e.lineWidth = 1.5, e.beginPath();
      let F = !1;
      i.candles.forEach((ae, G) => {
        const ke = i.startIndex + G, Se = s.stochastic.k[ke];
        if (!isNaN(Se) && isFinite(Se)) {
          const Xe = be(ke, i.startIndex), ct = I(Se);
          F ? e.lineTo(Xe, ct) : (e.moveTo(Xe, ct), F = !0);
        }
      }), e.stroke();
      const L = r?.stochastic?.dColor || "#E67E22";
      e.strokeStyle = L, e.lineWidth = 1.5, e.beginPath(), F = !1, i.candles.forEach((ae, G) => {
        const ke = i.startIndex + G, Se = s.stochastic.d[ke];
        if (!isNaN(Se) && isFinite(Se)) {
          const Xe = be(ke, i.startIndex), ct = I(Se);
          F ? e.lineTo(Xe, ct) : (e.moveTo(Xe, ct), F = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Zt, e.textAlign = "left", [0, P, 50, k, 100].forEach((ae) => {
        const G = I(ae);
        e.fillText(ae.toString(), Z + 5, G);
      }), on.current.stochastic = { top: c, bottom: E };
      const w = `STOCH(${r?.stochastic?.kPeriod || 14},${r?.stochastic?.dPeriod || 3})`, C = r?.stochastic?.style?.customLabel || w, j = r?.stochastic?.style?.labelColor || te.textDim;
      e.fillStyle = j, e.font = `bold ${Zt}`, e.textAlign = "left";
      const R = Ct.current !== null ? Ct.current : i.startIndex + i.candles.length - 1, Q = s.stochastic.k[R], le = s.stochastic.d[R];
      e.fillText(C, 5, c + 12), e.fillStyle = W, e.font = Zt;
      const X = e.measureText(C).width, H = !isNaN(Q) && isFinite(Q) ? `%K ${Q.toFixed(2)}` : "%K --";
      e.fillText(H, 10 + X, c + 12), e.fillStyle = L;
      const K = e.measureText(H).width, ie = !isNaN(le) && isFinite(le) ? `%D ${le.toFixed(2)}` : "%D --";
      e.fillText(ie, 16 + X + K, c + 12), Xn.current.stochastic = 16 + X + K + e.measureText(ie).width + 8, Kt = E;
    }
    if (s?.williamsR) {
      const D = ns, c = Kt, E = c + D, b = r?.williamsR?.style || {};
      b.backgroundColor && (e.fillStyle = b.backgroundColor, e.globalAlpha = b.backgroundOpacity ?? 0.3, e.fillRect(0, c, Z, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(Z, c), e.stroke();
      const I = (X) => c + D - (X + 100) / 100 * D, k = r?.williamsR?.overbought ?? -20, P = r?.williamsR?.oversold ?? -80;
      e.setLineDash([4, 4]), e.strokeStyle = b.gridColor || "rgba(180, 130, 80, 0.6)", [P, -50, k].forEach((X) => {
        e.beginPath();
        const H = I(X);
        e.moveTo(0, H), e.lineTo(Z, H), e.stroke();
      }), e.setLineDash([]);
      const W = r?.williamsR?.color || "#E91E63";
      e.strokeStyle = W, e.lineWidth = b.lineWidth ?? 1.5, e.beginPath();
      let F = !1;
      i.candles.forEach((X, H) => {
        const K = i.startIndex + H, ie = s.williamsR[K];
        if (!isNaN(ie) && isFinite(ie)) {
          const ae = be(K, i.startIndex), G = I(ie);
          F ? e.lineTo(ae, G) : (e.moveTo(ae, G), F = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Zt, e.textAlign = "left", [-100, P, -50, k, 0].forEach((X) => {
        const H = I(X);
        e.fillText(X.toString(), Z + 5, H);
      }), on.current.williamsR = { top: c, bottom: E };
      const L = `Williams %R ${r?.williamsR?.period || 14}`, w = r?.williamsR?.style?.customLabel || L, C = r?.williamsR?.style?.labelColor || "#d1d5db";
      e.fillStyle = C, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left";
      const j = Ct.current !== null ? Ct.current : i.startIndex + i.candles.length - 1, R = s.williamsR[j], Q = !isNaN(R) && isFinite(R) ? R.toFixed(2) : "--";
      e.fillText(w, 5, c + 15), e.fillStyle = W;
      const le = e.measureText(w).width;
      e.fillText(Q, 13 + le, c + 15), Xn.current.williamsR = 13 + le + e.measureText(Q).width + 8, Kt = E;
    }
    if (s?.cci) {
      const D = ns, c = Kt, E = c + D, b = r?.cci?.style || {};
      b.backgroundColor && (e.fillStyle = b.backgroundColor, e.globalAlpha = b.backgroundOpacity ?? 0.3, e.fillRect(0, c, Z, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(Z, c), e.stroke();
      const I = i.candles.map((K, ie) => s.cci[i.startIndex + ie]).filter((K) => !isNaN(K) && isFinite(K)), k = I.length > 0 ? Math.max(200, Math.max(...I.map(Math.abs))) : 200, P = (K) => c + D / 2 - K / k * (D / 2), W = r?.cci?.overbought ?? 100, F = r?.cci?.oversold ?? -100;
      e.setLineDash([4, 4]), e.strokeStyle = b.gridColor || "rgba(180, 130, 80, 0.6)", [F, 0, W].forEach((K) => {
        e.beginPath();
        const ie = P(K);
        e.moveTo(0, ie), e.lineTo(Z, ie), e.stroke();
      }), e.setLineDash([]);
      const L = r?.cci?.color || "#00BCD4";
      e.strokeStyle = L, e.lineWidth = b.lineWidth ?? 1.5, e.beginPath();
      let w = !1;
      i.candles.forEach((K, ie) => {
        const ae = i.startIndex + ie, G = s.cci[ae];
        if (!isNaN(G) && isFinite(G)) {
          const ke = be(ae, i.startIndex), Se = P(G);
          w ? e.lineTo(ke, Se) : (e.moveTo(ke, Se), w = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Zt, e.textAlign = "left", [Math.round(-k), F, 0, W, Math.round(k)].forEach((K) => {
        const ie = P(K);
        e.fillText(K.toString(), Z + 5, ie);
      }), on.current.cci = { top: c, bottom: E };
      const C = `CCI ${r?.cci?.period || 20}`, j = r?.cci?.style?.customLabel || C, R = r?.cci?.style?.labelColor || "#d1d5db";
      e.fillStyle = R, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left";
      const Q = Ct.current !== null ? Ct.current : i.startIndex + i.candles.length - 1, le = s.cci[Q], X = !isNaN(le) && isFinite(le) ? le.toFixed(2) : "--";
      e.fillText(j, 5, c + 15), e.fillStyle = L;
      const H = e.measureText(j).width;
      e.fillText(X, 13 + H, c + 15), Xn.current.cci = 13 + H + e.measureText(X).width + 8, Kt = E;
    }
    if (s?.adx) {
      const D = ns, c = Kt, E = c + D;
      e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(Z, c), e.stroke();
      const b = (w) => c + D - w / 100 * D;
      e.setLineDash([4, 4]), e.strokeStyle = "rgba(150, 150, 150, 0.3)", [25, 50, 75].forEach((w) => {
        e.beginPath(), e.moveTo(0, b(w)), e.lineTo(Z, b(w)), e.stroke();
      }), e.setLineDash([]);
      const I = r?.adx?.adxColor || "#FFEB3B", k = r?.adx?.plusDIColor || "#22c55e", P = r?.adx?.minusDIColor || "#ef4444";
      e.strokeStyle = k, e.lineWidth = 1, e.beginPath();
      let W = !1;
      i.candles.forEach((w, C) => {
        const j = i.startIndex + C, R = s.adx.plusDI[j];
        if (!isNaN(R) && isFinite(R)) {
          const Q = be(j, i.startIndex), le = b(R);
          W ? e.lineTo(Q, le) : (e.moveTo(Q, le), W = !0);
        }
      }), e.stroke(), e.strokeStyle = P, e.beginPath(), W = !1, i.candles.forEach((w, C) => {
        const j = i.startIndex + C, R = s.adx.minusDI[j];
        if (!isNaN(R) && isFinite(R)) {
          const Q = be(j, i.startIndex), le = b(R);
          W ? e.lineTo(Q, le) : (e.moveTo(Q, le), W = !0);
        }
      }), e.stroke(), e.strokeStyle = I, e.lineWidth = 2, e.beginPath(), W = !1, i.candles.forEach((w, C) => {
        const j = i.startIndex + C, R = s.adx.adx[j];
        if (!isNaN(R) && isFinite(R)) {
          const Q = be(j, i.startIndex), le = b(R);
          W ? e.lineTo(Q, le) : (e.moveTo(Q, le), W = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Zt, [0, 25, 50, 75, 100].forEach((w) => {
        e.fillText(w.toString(), Z + 5, b(w));
      });
      const F = Ct.current !== null ? Ct.current : i.startIndex + i.candles.length - 1, L = s.adx.adx[F];
      e.fillStyle = "#d1d5db", e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.fillText(`ADX ${r?.adx?.period || 14}`, 5, c + 15), e.fillStyle = I, e.fillText(!isNaN(L) && isFinite(L) ? L.toFixed(2) : "--", 73, c + 15), e.fillStyle = k, e.fillText("+DI", 118, c + 15), e.fillStyle = P, e.fillText("-DI", 148, c + 15), Xn.current.adx = 148 + e.measureText("-DI").width + 8, on.current.adx = { top: c, bottom: E }, Kt = E;
    }
    if (s?.roc) {
      const D = ns, c = Kt, E = c + D;
      e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(Z, c), e.stroke();
      const b = i.candles.map((j, R) => s.roc[i.startIndex + R]).filter((j) => !isNaN(j) && isFinite(j)), I = b.length > 0 ? Math.max(5, Math.max(...b.map(Math.abs))) : 5, k = (j) => c + D / 2 - j / I * (D / 2);
      e.setLineDash([4, 4]), e.strokeStyle = "rgba(150, 150, 150, 0.5)", e.beginPath(), e.moveTo(0, k(0)), e.lineTo(Z, k(0)), e.stroke(), e.setLineDash([]);
      const P = r?.roc?.color || "#9C27B0";
      e.strokeStyle = P, e.lineWidth = 1.5, e.beginPath();
      let W = !1;
      i.candles.forEach((j, R) => {
        const Q = i.startIndex + R, le = s.roc[Q];
        if (!isNaN(le) && isFinite(le)) {
          const X = be(Q, i.startIndex), H = k(le);
          W ? e.lineTo(X, H) : (e.moveTo(X, H), W = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Zt, [-I, 0, I].forEach((j) => {
        e.fillText(j.toFixed(1) + "%", Z + 5, k(j));
      }), e.fillStyle = "#d1d5db", e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
      const F = Ct.current !== null ? Ct.current : i.startIndex + i.candles.length - 1, L = s.roc[F], w = !isNaN(L) && isFinite(L) ? L.toFixed(2) + "%" : "--";
      e.fillText(`ROC ${r?.roc?.period || 12}`, 5, c + 15), e.fillStyle = P;
      const C = e.measureText(`ROC ${r?.roc?.period || 12}`).width;
      e.fillText(w, 13 + C, c + 15), Xn.current.roc = 13 + C + e.measureText(w).width + 8, on.current.roc = { top: c, bottom: E }, Kt = E;
    }
    const Fl = {
      ctx: e,
      chartWidth: Z,
      subplotHeight: ns,
      visible: i,
      indexToX: be,
      currentCandleWidth: rn,
      subplotLabelFont: Zt,
      hoveredCandleIndex: Ct.current,
      colors: { textDim: te.textDim, grid: te.grid },
      indicators: r,
      indicatorData: s,
      indicatorBounds: on.current,
      subplotLabelEndX: Xn.current,
      mainPriceToY: qe,
      mainChartHeight: Te,
      skipIndicators: _,
      clickedIndicatorKey: Bt
    };
    if (Au(Fl), Kt = Bu(Fl, Kt), Wu(Fl), at && at.length > 0 && i.candles.length > 0) {
      const D = (j) => j ? j.toUpperCase().trim().slice(0, 2) : "??", c = (j) => {
        if (j.datetime) {
          const R = new Date(j.datetime).getTime();
          if (!isNaN(R)) return R;
        }
        if (!j.date) return null;
        try {
          const [R, Q, le] = j.date.split("-").map(Number);
          if (!j.time) return Date.UTC(R, Q - 1, le, 12, 0);
          const X = j.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
          if (!X) return Date.UTC(R, Q - 1, le, 12, 0);
          let H = parseInt(X[1]);
          const K = parseInt(X[2]), ie = X[3]?.toUpperCase();
          return ie === "PM" && H !== 12 ? H += 12 : ie === "AM" && H === 12 && (H = 0), Date.UTC(R, Q - 1, le, H, K);
        } catch {
          return null;
        }
      }, E = [];
      e.save();
      const b = { high: 0, medium: 1, low: 2 }, I = [], k = Date.now();
      for (const j of at) {
        const R = c(j);
        if (!R || R < k) continue;
        const Q = o.length > 1 ? Math.abs(o[1].time - o[0].time) : 6e4, le = o[o.length - 1], X = le && R > le.time + Q;
        let H, K;
        if (X) {
          const G = (R - le.time) / Q, ke = o.length - 1 + G;
          if (K = Math.round(ke), H = be(ke, i.startIndex), H < 0 || H > Z - 10) continue;
        } else {
          let ae = 0, G = o.length - 1;
          for (K = -1; ae <= G; ) {
            const Se = Math.floor((ae + G) / 2);
            if (o[Se].time === R) {
              K = Se;
              break;
            }
            o[Se].time < R ? ae = Se + 1 : G = Se - 1;
          }
          if (K === -1) {
            const Se = ae >= 0 && ae < o.length, Xe = G >= 0 && G < o.length;
            Se && Xe ? K = Math.abs(o[ae].time - R) < Math.abs(o[G].time - R) ? ae : G : Se ? K = ae : Xe ? K = G : K = o.length - 1;
          }
          const ke = Math.abs(o[K].time - R);
          if (K < 0 || ke > Q || K < i.startIndex || K >= i.endIndex || (H = be(K, i.startIndex), H < 0 || H > Z)) continue;
        }
        const ie = Du({ event: j.event || "", country: j.region_code || "" });
        I.push({ x: H, event: j, impact: ie, ts: R, closestIdx: K });
      }
      I.sort((j, R) => {
        const Q = b[j.impact] ?? 3, le = b[R.impact] ?? 3;
        return Q !== le ? Q - le : (j.event.event || "").localeCompare(R.event.event || "");
      });
      const P = /* @__PURE__ */ new Map();
      for (const j of I) {
        const R = Math.round(j.x);
        P.has(R) || P.set(R, []), P.get(R).push(j);
      }
      const W = document.documentElement.classList.contains("dark"), F = y - Lt, L = 22, w = 32, C = F - L / 2 - 5;
      for (const [j, R] of P) {
        const Q = R[0].x, le = R[0].impact, X = le === "high", H = le === "low", K = D(R[0].event.region_code), ie = Fu(R[0].event.region_code), ae = R.length;
        E.push({
          x: Q,
          y: C,
          event: R[0].event,
          impact: le,
          ts: R[0].ts,
          groupEvents: R.map((we) => ({ event: we.event, impact: we.impact, ts: we.ts }))
        });
        const G = X ? "#dc2626" : H ? "#22c55e" : "#d97706";
        e.save(), e.shadowColor = W ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.15)", e.shadowBlur = 8, e.shadowOffsetY = 2;
        const ke = Q - w / 2, Se = C - L / 2;
        e.fillStyle = W ? "rgba(30, 41, 59, 0.92)" : "rgba(255, 255, 255, 0.95)", e.beginPath(), e.roundRect(ke, Se, w, L, 6), e.fill(), e.shadowColor = "transparent", e.shadowBlur = 0, e.strokeStyle = W ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)", e.lineWidth = 1, e.stroke(), e.fillStyle = G, e.beginPath(), e.roundRect(ke, Se, 3, L, [6, 0, 0, 6]), e.fill(), e.restore();
        const Xe = 18, ct = 13;
        if (ie ? e.drawImage(ie, Q - Xe / 2, C - ct / 2, Xe, ct) : (e.font = 'bold 9px -apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif', e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = W ? "#e2e8f0" : "#334155", e.fillText(K, Q + 1, C)), ae > 1) {
          const we = ke + w - 2, gt = Se - 2, Le = 7;
          e.beginPath(), e.arc(we, gt, Le, 0, Math.PI * 2), e.fillStyle = G, e.fill(), e.strokeStyle = W ? "#0f172a" : "#ffffff", e.lineWidth = 1.5, e.stroke(), e.font = 'bold 8px -apple-system, BlinkMacSystemFont, "Inter", sans-serif', e.fillStyle = "#ffffff", e.fillText(String(ae), we, gt + 0.5);
        }
        e.beginPath(), e.moveTo(Q, C + L / 2), e.lineTo(Q, F), e.strokeStyle = X ? "rgba(220, 38, 38, 0.3)" : H ? "rgba(34, 197, 94, 0.25)" : "rgba(217, 119, 6, 0.3)", e.lineWidth = 1, e.setLineDash([2, 3]), e.stroke(), e.setLineDash([]);
      }
      e.restore(), Is.current = E;
    } else
      Is.current = [];
    if (e.strokeStyle = te.axisLine || te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, y - Lt), e.lineTo(x, y - Lt), e.stroke(), Ke.versionLabelVisible) {
      const D = zn === 0 ? 0 : Ke.versionLabelXOffset, c = Z + Ue / 2 + D, E = y - Lt / 2 + 1;
      e.save(), e.font = 'bold 11px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = te.text, e.fillText("v.23", c, E), e.restore();
    }
    if (i.candles.length > 0) {
      const D = rn * (1 + Ze), c = Math.max(1, Math.floor(80 / D)), E = y - Lt, b = E + 16;
      if (e.font = ur, e.textAlign = "center", e.textBaseline = "middle", e.save(), e.beginPath(), e.rect(0, E, Z, Lt), e.clip(), !i.candles || i.candles.length === 0) {
        e.restore();
        return;
      }
      const I = i.candles[0], k = i.candles[i.candles.length - 1];
      if (!I || !k) {
        e.restore();
        return;
      }
      const P = (/* @__PURE__ */ new Date()).getFullYear(), W = new Date(I.time).getFullYear(), F = new Date(k.time).getFullYear(), L = W !== F, w = W !== P || F !== P, C = i.candles[1], j = C ? C.time - I.time : 6e4, Q = j / 6e4 >= 60;
      let le = "", X = -1, H = -1 / 0;
      const K = 12, ie = (G, ke) => {
        if (Q) {
          const ct = ts(G, w || L || ke !== X);
          return ct !== le ? (le = ct, X = ke, ct) : Ns(G);
        }
        const Se = ts(G, !1);
        return ke !== X && X !== -1 ? (X = ke, ts(G, !0)) : Se !== le ? (le = Se, X = ke, ts(G, w)) : Ns(G);
      }, ae = xe.width < 400;
      if (Ke.useFixedTimeAxisLabels) {
        const G = ae ? Ke.fixedTimeAxisLabelCountSmall : Ke.fixedTimeAxisLabelCount, ke = 5, Se = Z - ke * 2;
        for (let Xe = 0; Xe < G; Xe++) {
          const ct = ke + Se * (Xe + 0.5) / G, we = uo(ct, i.startIndex), gt = Math.round(we) - i.startIndex, Le = gt >= 0 && gt < i.candles.length ? i.candles[gt] : null, Ge = Le ? Le.time : I.time + (we - i.startIndex) * j, ut = Le ? be(i.startIndex + gt, i.startIndex) : ct, De = new Date(Ge).getFullYear(), Qe = ie(Ge, De);
          e.fillStyle = te.axisLabel, e.fillText(Qe, ut, b);
        }
      } else {
        const Xe = [
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
        ], ct = c * j;
        let we = Xe[Xe.length - 1];
        for (const ut of Xe)
          if (ut >= ct) {
            we = ut;
            break;
          }
        const gt = Math.ceil(I.time / we) * we, Le = k.time + we * 25;
        let Ge = -1;
        for (let ut = gt; ut <= Le; ut += we) {
          let De, Qe = ut;
          if (ut <= k.time) {
            let Mt = 0, nn = i.candles.length - 1, Es = nn;
            for (; Mt <= nn; ) {
              const zs = Mt + nn >> 1;
              i.candles[zs].time >= ut ? (Es = zs, nn = zs - 1) : Mt = zs + 1;
            }
            if (Es === Ge) continue;
            Ge = Es, Qe = i.candles[Es].time, De = be(i.startIndex + Es, i.startIndex);
          } else {
            const Mt = i.startIndex + (i.candles.length - 1) + (ut - k.time) / j;
            De = be(Mt, i.startIndex);
          }
          if (De < 2 || De > Z - 10) continue;
          const ht = ie(Qe, new Date(Qe).getFullYear()), ot = e.measureText(ht).width, mt = De - ot / 2, je = De + ot / 2;
          mt < H + K || je > Z - 10 || mt < 2 || (e.fillStyle = te.axisLabel, e.fillText(ht, De, b), H = je);
        }
      }
      e.restore(), (Ys.length > 0 || Ls.length > 0) && (e.save(), Ys.forEach((G) => {
        e.fillStyle = Bl, e.beginPath(), e.roundRect(G.topOrigin, Wl, G.bWidth, po, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.font = Yo, e.fillText(G.text, G.topOrigin + G.bWidth / 2, Wl + po / 2);
      }), Ls.forEach((G) => {
        e.fillStyle = Bl, e.beginPath(), e.roundRect(Dl, G.topOrigin, G.bWidth, po, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.font = Yo, e.fillText(G.text, Dl + G.bWidth / 2, G.topOrigin + po / 2);
      }), e.restore());
    }
    const Ol = p.getContext("2d");
    Ol && (Ol.setTransform(1, 0, 0, 1, 0, 0), Ol.drawImage(f, 0, 0)), In.current = {
      startIndex: Cr,
      candleWidth: rn
    }, Ft.current && qn.current?.();
  }, [xe, o, n, ce, te, s, J, Dn, js, Fn, Ns, ts, fr, Po, Tn, M, r, Ne, St, at, It, Bt, os, Cs]);
  Rn.current = ms, l.useEffect(() => {
    Gs && (Gs.current = () => {
      ft(!0);
    });
  }, [Gs]);
  const Yt = l.useCallback(() => {
    const a = nt.current, p = a?.getContext("2d");
    if (!a || !p) return;
    const x = {
      ctx: p,
      dimensions: xe,
      dpr: Tn,
      candles: o,
      colors: te,
      viewState: ce,
      indicatorData: s,
      indicators: r,
      indicatorHeightRatio: J,
      showOHLC: es,
      isDesktop: Lo,
      PRICE_AXIS_WIDTH: Ue,
      TIME_AXIS_HEIGHT: Lt,
      PRICE_LABEL_FONT: Eo,
      TIME_LABEL_FONT: ur,
      crosshair: Hn.current,
      isScrolling: Ft.current,
      scrollState: {
        startIndex: Ie.current.startIndex,
        candleWidth: Ie.current.candleWidth
      },
      isDraggingHandle: !!yt.current,
      isHoveredSLTP: !!_n.current,
      sessionControlHovered: hl.current,
      isSyncedUpdate: Zs.current,
      syncedCrosshairTime: To.current ?? void 0,
      hoveredEvent: gn.current || Rs.current,
      currentOhlcTextWidth: tr,
      currentBbTextEndX: fl,
      currentMaTextEndX: pl,
      currentVwapTextEndX: ml,
      currentVpTextEndX: xl,
      currentVolTextEndX: bl,
      overlayLabelEndXPrev: $s.current,
      subplotLabelEndXPrev: sr,
      getVisibleCandles: Dn,
      getPriceRange: js,
      yToPrice: dr,
      xToIndex: uo,
      indexToX: hr,
      formatPrice: Fn,
      formatTime: Ns,
      formatDate: ts,
      callbacks: {
        setOhlcTextWidth: la,
        setBbTextEndX: aa,
        setMaTextEndX: ia,
        setVwapTextEndX: ca,
        setVpTextEndX: ua,
        setVolTextEndX: da,
        setOverlayLabelEndX: (y) => {
          $s.current = y, ha(y);
        },
        setSubplotLabelEndX: fa,
        onCrosshairMove: se
      }
    };
    Ou(x);
  }, [xe, o, ce, te, s, r, J, Dn, js, dr, uo, hr, Fn, Ns, ts, se, Tn, es, U]);
  l.useEffect(() => {
    $n.current = Yt;
  }, [Yt]), l.useEffect(() => {
    sn.current = te?.crosshairStyle || "standard", nt.current && (nt.current.style.cursor = sn.current !== "standard" ? "none" : "crosshair");
  }, [te?.crosshairStyle]);
  const {
    handleZoomIn: ga,
    handleZoomOut: va,
    handleResetView: ya,
    handleResetYAxis: ka,
    handleMoveLeft: wa,
    handleMoveRight: Sa,
    handleYAxisMouseDown: Ca,
    handleYAxisTouchStart: Ma,
    handleYAxisWheel: kl
  } = _u({
    minCandleWidth: Ao,
    maxCandleWidth: Bo,
    priceAxisWidth: Ue,
    timeAxisHeight: Lt,
    dimensions: xe,
    candlesLength: o.length,
    disableAutoFollow: me,
    livePrice: n ?? null,
    scrollStateRef: Ie,
    drawChartRef: Rn,
    notifyScrollSync: Et,
    getVisibleCandles: Dn,
    getPriceRange: js,
    setViewState: Dt,
    setPriceScale: We,
    setPriceOffset: hs,
    setFixedPriceCenter: Ot,
    setFixedPriceRange: na,
    setIsScalingYAxis: ul,
    fixedPriceCenter: Qt,
    priceScale: Gt,
    priceOffset: Rt,
    viewStateAutoFollowLatest: ce.autoFollowLatest,
    yAxisScaleStartRef: lo,
    priceScaleRef: wn,
    priceOffsetRef: Jn,
    yAxisDebounceRef: Qn
  }), Ta = l.useCallback((a) => {
    const p = nt.current;
    if (!p) return;
    const x = p.getBoundingClientRect(), y = a.clientX - x.left, f = a.clientY - x.top;
    if (("ontouchstart" in window || navigator.maxTouchPoints > 0) && !An && !Ln && !yt.current)
      return;
    if (Hn.current = { x: y, y: f }, !Ln && !yt.current && r && s) {
      const S = dn.current, B = hn.current;
      if (S && B > 0 && f < B) {
        const Y = Ie.current, u = Y.candleWidth * (1 + Ze), A = Math.max(0, Math.floor(Y.startIndex)), m = A + Math.round(y / u), V = 8, h = (ne) => isNaN(ne) || !isFinite(ne) ? !1 : Math.abs(f - (B - (ne - S.min) / S.range * B)) < V;
        let N = null;
        if (!N && r.movingAverages?.enabled && s.movingAverages) {
          for (const ne of s.movingAverages)
            if (m >= 0 && m < ne.data.length && h(ne.data[m])) {
              N = "movingAverages";
              break;
            }
        }
        if (!N && r.bollinger?.enabled && s.bollinger) {
          const ne = s.bollinger;
          m >= 0 && m < ne.upper.length && (h(ne.upper[m]) || h(ne.middle[m]) || h(ne.lower[m])) && (N = "bollinger");
        }
        if (!N && r.vwap?.enabled && s.vwap && m >= 0 && m < s.vwap.length && h(s.vwap[m]) && (N = "vwap"), !N && r.supertrend?.enabled && s.supertrend && m >= 0 && m < s.supertrend.length && s.supertrend[m] && h(s.supertrend[m].value) && (N = "supertrend"), !N && r.ichimoku?.enabled && s.ichimoku) {
          const ne = s.ichimoku;
          m >= 0 && m < ne.tenkan.length && (h(ne.tenkan[m]) || h(ne.kijun[m]) || h(ne.senkouA[m]) || h(ne.senkouB[m])) && (N = "ichimoku");
        }
        if (!N && r.keltner?.enabled && s.keltner) {
          const ne = s.keltner;
          m >= 0 && m < ne.upper.length && (h(ne.upper[m]) || h(ne.middle[m]) || h(ne.lower[m])) && (N = "keltner");
        }
        if (!N && r.donchian?.enabled && s.donchian) {
          const ne = s.donchian;
          m >= 0 && m < ne.upper.length && (h(ne.upper[m]) || h(ne.middle[m]) || h(ne.lower[m])) && (N = "donchian");
        }
        if (!N && r.envelopes?.enabled && s.envelopes) {
          const ne = s.envelopes;
          m >= 0 && m < ne.upper.length && (h(ne.upper[m]) || h(ne.basis[m]) || h(ne.lower[m])) && (N = "envelopes");
        }
        if (!N && r?.volume?.enabled && B > 0 && f >= B * 0.8 && f <= B) {
          const ne = m - A, $e = Dn();
          if (ne >= 0 && ne < $e.candles.length) {
            const ee = $e.candles[ne].volume ?? 0;
            if (ee > 0) {
              const Re = B * 0.2, st = B, He = $e.candles.map((Je) => Je.volume ?? 0).filter((Je) => Je > 0), he = He.length > 0 ? Math.max(...He) : 1, Pe = ee / he * Re * 0.95, it = st - Pe;
              f >= it && (N = "volume");
            }
          }
        }
        const de = xe.width - Ue;
        if (!N && r?.volumeProfile?.enabled && B > 0 && y >= de * (1 - (r.volumeProfile.rowWidth ?? 15) / 100)) {
          const ne = Dn();
          if (ne.candles.length > 0) {
            const $e = r.volumeProfile.numberOfRows ?? 48, ee = de * ((r.volumeProfile.rowWidth ?? 15) / 100), Re = r.volumeProfile.lookbackBars ?? 0, st = Re > 0 ? ne.candles.slice(-Re) : ne.candles;
            let He = 1 / 0, he = -1 / 0;
            st.forEach((Je) => {
              He = Math.min(He, Je.low), he = Math.max(he, Je.high);
            });
            const Pe = (he - He || 1) / $e, it = dn.current;
            if (it && it.range > 0) {
              const Je = it.max - f / B * it.range, zt = Math.floor((Je - He) / Pe);
              if (zt >= 0 && zt < $e) {
                const Sn = new Float64Array($e);
                st.forEach((_t) => {
                  if (!(!_t.volume || _t.volume <= 0))
                    for (let gs = 0; gs < $e; gs++) {
                      const fo = He + gs * Pe, $o = fo + Pe;
                      if (_t.high >= fo && _t.low <= $o) {
                        const Il = Math.max(_t.low, fo), Rl = Math.min(_t.high, $o), Pl = _t.high - _t.low > 0 ? (Rl - Il) / (_t.high - _t.low) : 1;
                        Sn[gs] += _t.volume * Pl;
                      }
                    }
                });
                let en = 0;
                for (let _t = 0; _t < $e; _t++)
                  Sn[_t] > en && (en = Sn[_t]);
                const _o = Sn[zt];
                if (_o > 0 && en > 0) {
                  const _t = _o / en * ee, gs = de - _t;
                  y >= gs && (N = "volumeProfile");
                }
              }
            }
          }
        }
        if (!N && r.customIndicators) {
          const $e = (ee) => isNaN(ee) || !isFinite(ee) ? !1 : Math.abs(f - (B - (ee - S.min) / S.range * B)) < 14;
          for (const ee of r.customIndicators) {
            const Re = ee.data;
            if (!(!ee.enabled || ee.display !== "overlay" || !Re) && m >= 0 && m < Re.length && $e(Re[m])) {
              const st = ee.scriptId;
              N = typeof ee.expression == "string" && ee.expression.startsWith("brue:") && st ? `script-${st}` : `ci-${ee.id}`;
              break;
            }
          }
        }
        if (!N) {
          const ne = on.current, $e = [];
          if (r.rsi?.enabled && s.rsi) {
            const ee = ne.rsi;
            $e.push({ key: "sp-rsi", check: () => {
              if (!ee || f < ee.top || f > ee.bottom || m < 0 || m >= s.rsi.length) return !1;
              const Re = s.rsi[m];
              if (isNaN(Re) || !isFinite(Re)) return !1;
              const st = ee.bottom - ee.top;
              return Math.abs(f - (ee.top + st - Re / 100 * st)) < V;
            } });
          }
          if (r.macd?.enabled && s.macd) {
            const ee = ne.macd;
            $e.push({ key: "sp-macd", check: () => !(!ee || f < ee.top || f > ee.bottom) });
          }
          if (r.stochastic?.enabled && s.stochastic) {
            const ee = ne.stochastic;
            $e.push({ key: "sp-stochastic", check: () => {
              if (!ee || f < ee.top || f > ee.bottom || m < 0 || m >= s.stochastic.k.length) return !1;
              const Re = ee.bottom - ee.top, st = ee.top + Re - s.stochastic.k[m] / 100 * Re, He = ee.top + Re - s.stochastic.d[m] / 100 * Re;
              return Math.abs(f - st) < V || Math.abs(f - He) < V;
            } });
          }
          if (r.atr?.enabled && s.atr) {
            const ee = ne.atr;
            $e.push({ key: "sp-atr", check: () => !(!ee || f < ee.top || f > ee.bottom) });
          }
          for (const ee of $e)
            if (ee.check()) {
              N = ee.key;
              break;
            }
        }
        const _e = Ps.current;
        if (Ps.current = N, N !== _e && nt.current) {
          const ne = sn.current !== "standard" ? "none" : "crosshair";
          nt.current.style.cursor = N ? "pointer" : ne;
        }
      } else if (Ps.current && (Ps.current = null, nt.current && !lr.current)) {
        const Y = sn.current !== "standard" ? "none" : "crosshair";
        nt.current.style.cursor = Y;
      }
    }
    const _ = hn.current, O = xe.height;
    if (_ > 0 && nt.current) {
      if (f > _ && f < O - 30)
        nt.current.style.cursor = "pointer";
      else if (f <= _ && !Ps.current && !lr.current) {
        const S = sn.current !== "standard" ? "none" : "crosshair";
        nt.current.style.cursor = S;
      }
    }
    let z = !1;
    for (const S of Is.current) {
      const B = y - S.x, Y = f - S.y;
      if (Math.sqrt(B * B + Y * Y) < 16) {
        Rs.current = S, z = !0, nt.current && (nt.current.style.cursor = "pointer");
        break;
      }
    }
    if (z || (Rs.current = null), yt.current) {
      const S = dn.current, B = hn.current;
      if (S && S.range > 0 && B > 0) {
        const Y = S.max - f / B * S.range;
        yt.current === "sl" ? wt.current = Y : vt.current = Y, nt.current && (nt.current.style.cursor = oe), kn.current === null && (kn.current = requestAnimationFrame(() => {
          ft(!1), kn.current = null;
        }));
        return;
      }
    }
    if (Oe && Oe.length > 0) {
      const S = dn.current, B = hn.current;
      if (S && S.range > 0 && B > 0) {
        let Y = !1;
        for (const u of Oe) {
          const A = (S.max - u.price) / S.range * B;
          if (y <= 160 && Math.abs(f - A) < 12) {
            Y = !0;
            break;
          }
          if (u.id === Ee.current) {
            const V = Math.min(A + 10, B - 22 - 4), h = xe.width - Ue, N = 144 + 5 * 2, de = (h - N) / 2;
            if (y >= de - 8 && y <= de + N + 8 && f >= V - 8 && f <= V + 22 + 8) {
              Y = !0;
              break;
            }
          }
        }
        Y && nt.current && (nt.current.style.cursor = "pointer");
      }
    }
    if (Ee.current && Oe && Oe.length > 0) {
      const S = dn.current, B = hn.current;
      if (S && S.range > 0 && B > 0) {
        const Y = S.max - f / B * S.range, u = S.range * 0.012, A = Oe.find((m) => m.id === Ee.current);
        if (A) {
          const m = A.side === "buy", V = Un(A.price), h = wt.current ?? A.stopLoss ?? (m ? A.price - V : A.price + V), N = vt.current ?? A.takeProfit ?? (m ? A.price + V : A.price - V), de = Math.abs(Y - h) < u, _e = Math.abs(Y - N) < u;
          if (de || _e)
            nt.current && (nt.current.style.cursor = v), _n.current = de ? "sl" : "tp", ft(!1);
          else if (_n.current && (_n.current = null, ft(!1)), nt.current) {
            const ne = sn.current !== "standard" ? "none" : "crosshair";
            nt.current.style.cursor !== ne && (nt.current.style.cursor = ne);
          }
        }
      }
    }
    if (Ln) {
      if (a.buttons === 0) {
        cs(!1), Xt(!1);
        return;
      }
      Xt(!0);
      const S = y - vn.x, B = f - vn.y, Y = ce.candleWidth * (1 + Ze), u = S / Y, A = Math.max(
        0,
        Math.min(o.length - 10, vn.startIndex - u)
      );
      if (Ie.current = {
        startIndex: A,
        candleWidth: ce.candleWidth
      }, fs && Vt !== null) {
        const m = Vt / wn.current / (xe.height - Lt), V = B * m;
        Jn.current = vn.priceOffset + V;
      }
      Vn.current === null && (Vn.current = requestAnimationFrame(() => {
        ft(!0), Yt(), Et(), Vn.current = null;
      })), At.current && clearTimeout(At.current), At.current = setTimeout(() => {
        const m = Ie.current;
        Dt((V) => ({
          ...V,
          startIndex: m.startIndex,
          // Keep float precision - no rounding
          autoFollowLatest: !1
        })), fs && hs(Jn.current), Xt(!1);
      }, 100);
      return;
    }
    const $ = Dn(), g = uo(y, $.startIndex);
    g >= 0 && g < o.length ? Ct.current = g : Ct.current = null, Yt();
  }, [Ln, vn, ce.candleWidth, o.length, fs, Vt, Gt, xe.height, Yt, An, Dn, uo, o]), Ia = l.useCallback((a) => {
    const p = nt.current;
    if (!p) return;
    const x = p.getBoundingClientRect(), y = a.clientX - x.left, f = a.clientY - x.top;
    let e = !1;
    for (const $ of Is.current) {
      const g = y - $.x, S = f - $.y;
      if (Math.sqrt(g * g + S * S) < 16) {
        e = !0, gn.current && gn.current.ts === $.ts && gn.current.x === $.x ? gn.current = null : gn.current = $, $n.current && $n.current();
        return;
      }
    }
    if (gn.current && !e && (gn.current = null, $n.current && $n.current()), es && r) {
      const $ = [
        { key: "bollinger", title: "BB", enabledCheck: () => !!(r?.bollinger?.enabled && s?.bollinger), endXSource: () => fl },
        { key: "movingAverages", title: "MA", enabledCheck: () => !!(r?.movingAverages?.enabled && s?.movingAverages), endXSource: () => pl },
        { key: "vwap", title: "VWAP", enabledCheck: () => !!(r?.vwap?.enabled && s?.vwap), endXSource: () => ml },
        { key: "ichimoku", title: "Ichimoku", enabledCheck: () => !!(r?.ichimoku?.enabled && s?.ichimoku), endXSource: () => bt.ichimoku || 0 },
        { key: "keltner", title: "Keltner", enabledCheck: () => !!(r?.keltner?.enabled && s?.keltner), endXSource: () => bt.keltner || 0 },
        { key: "volumeProfile", title: "Vol Profile", enabledCheck: () => !!r?.volumeProfile?.enabled, endXSource: () => xl },
        { key: "volume", title: "Volume", enabledCheck: () => !!(r?.volume?.enabled && o.some((S) => S.volume)), endXSource: () => bl },
        { key: "supertrend", title: "Supertrend", enabledCheck: () => !!(r?.supertrend?.enabled && s?.supertrend), endXSource: () => bt.supertrend || 0 },
        { key: "donchian", title: "Donchian", enabledCheck: () => !!(r?.donchian?.enabled && s?.donchian), endXSource: () => bt.donchian || 0 },
        { key: "envelopes", title: "Envelopes", enabledCheck: () => !!(r?.envelopes?.enabled && s?.envelopes), endXSource: () => bt.envelopes || 0 },
        // Phase 2 overlays
        { key: "alma", title: "ALMA", enabledCheck: () => !!(r?.alma?.enabled && s?.alma), endXSource: () => bt.alma || 0 },
        { key: "kama", title: "KAMA", enabledCheck: () => !!(r?.kama?.enabled && s?.kama), endXSource: () => bt.kama || 0 },
        { key: "zlema", title: "ZLEMA", enabledCheck: () => !!(r?.zlema?.enabled && s?.zlema), endXSource: () => bt.zlema || 0 },
        { key: "t3", title: "T3", enabledCheck: () => !!(r?.t3?.enabled && s?.t3), endXSource: () => bt.t3 || 0 },
        { key: "lsma", title: "LSMA", enabledCheck: () => !!(r?.lsma?.enabled && s?.lsma), endXSource: () => bt.lsma || 0 },
        { key: "mcginley", title: "McGinley", enabledCheck: () => !!(r?.mcginley?.enabled && s?.mcginley), endXSource: () => bt.mcginley || 0 },
        { key: "wma", title: "WMA", enabledCheck: () => !!(r?.wma?.enabled && s?.wma), endXSource: () => bt.wma || 0 },
        { key: "smmaOverlay", title: "SMMA", enabledCheck: () => !!(r?.smmaOverlay?.enabled && s?.smmaOverlay), endXSource: () => bt.smmaOverlay || 0 },
        { key: "vwma", title: "VWMA", enabledCheck: () => !!(r?.vwma?.enabled && s?.vwma), endXSource: () => bt.vwma || 0 },
        { key: "medianPrice", title: "Median", enabledCheck: () => !!(r?.medianPrice?.enabled && s?.medianPrice), endXSource: () => bt.medianPrice || 0 },
        { key: "typicalPrice", title: "Typical", enabledCheck: () => !!(r?.typicalPrice?.enabled && s?.typicalPrice), endXSource: () => bt.typicalPrice || 0 },
        { key: "weightedClose", title: "WClose", enabledCheck: () => !!(r?.weightedClose?.enabled && s?.weightedClose), endXSource: () => bt.weightedClose || 0 },
        { key: "zigzag", title: "ZigZag", enabledCheck: () => !!(r?.zigzag?.enabled && s?.zigzag), endXSource: () => bt.zigzag || 0 },
        { key: "alligator", title: "Alligator", enabledCheck: () => !!(r?.alligator?.enabled && s?.alligator), endXSource: () => bt.alligator || 0 },
        { key: "priceChannel", title: "Price Ch", enabledCheck: () => !!(r?.priceChannel?.enabled && s?.priceChannel), endXSource: () => bt.priceChannel || 0 },
        { key: "chandeKroll", title: "Chande Kroll", enabledCheck: () => !!(r?.chandeKroll?.enabled && s?.chandeKroll), endXSource: () => bt.chandeKroll || 0 },
        { key: "chandelierExit", title: "Chandelier", enabledCheck: () => !!(r?.chandelierExit?.enabled && s?.chandelierExit), endXSource: () => bt.chandelierExit || 0 },
        { key: "accBands", title: "Acc Bands", enabledCheck: () => !!(r?.accBands?.enabled && s?.accBands), endXSource: () => bt.accBands || 0 },
        { key: "demarkPivots", title: "DeMark", enabledCheck: () => !!(r?.demarkPivots?.enabled && s?.demarkPivots), endXSource: () => bt.demarkPivots || 0 },
        { key: "fractals", title: "Fractals", enabledCheck: () => !!(r?.fractals?.enabled && s?.fractals), endXSource: () => bt.fractals || 0 }
      ];
      let g = 28;
      for (const S of $) {
        if (!S.enabledCheck()) continue;
        const B = xe.width < 500 ? 14 : 19, Y = S.endXSource();
        if (S.key === "movingAverages" && s?.movingAverages?.length > 0) {
          const A = r.movingAverages?.lines ?? [], m = r?.customBrueScripts || {};
          let V = 0;
          for (let h = 0; h < s.movingAverages.length; h++) {
            const N = A[h]?.sourceScriptId;
            if (N && m[N]?.enabled) continue;
            const de = g + V * B - 10, _e = de + B;
            if (Y > 0 && y >= 0 && y <= Y && f >= de && f <= _e) {
              const ne = `movingAverages__${h}`;
              pe(($e) => $e === ne ? null : ne), ye(ne);
              return;
            }
            V++;
          }
          g += V * B;
          continue;
        }
        const u = B;
        if (Y > 0 && y >= 0 && y <= Y && f >= g - 10 && f <= g - 10 + u) {
          pe((A) => A === S.key ? null : S.key), ye(S.key);
          return;
        }
        g += u;
      }
    }
    if (r && s) {
      const $ = dn.current, g = hn.current;
      if ($ && g > 0) {
        const S = Ie.current, B = S.candleWidth * (1 + Ze);
        xe.width - Ue;
        const u = Math.max(0, Math.floor(S.startIndex)) + Math.round(y / B), A = 8, m = (h) => {
          if (isNaN(h) || !isFinite(h)) return !1;
          const N = g - (h - $.min) / $.range * g;
          return Math.abs(f - N) < A;
        };
        if (r.movingAverages?.enabled && s.movingAverages)
          for (let h = 0; h < s.movingAverages.length; h++) {
            const N = s.movingAverages[h];
            if (u >= 0 && u < N.data.length && m(N.data[u])) {
              const de = `movingAverages__${h}`;
              pe((_e) => _e === de ? null : de), ye(de);
              return;
            }
          }
        if (r.bollinger?.enabled && s.bollinger) {
          const h = s.bollinger;
          if (u >= 0 && u < h.upper.length && (m(h.upper[u]) || m(h.middle[u]) || m(h.lower[u]))) {
            pe((N) => N === "bollinger" ? null : "bollinger"), ye("bollinger");
            return;
          }
        }
        if (r.vwap?.enabled && s.vwap && u >= 0 && u < s.vwap.length && m(s.vwap[u])) {
          pe((h) => h === "vwap" ? null : "vwap"), ye("vwap");
          return;
        }
        if (r.supertrend?.enabled && s.supertrend && u >= 0 && u < s.supertrend.length) {
          const h = s.supertrend[u];
          if (h && m(h.value)) {
            pe((N) => N === "supertrend" ? null : "supertrend"), ye("supertrend");
            return;
          }
        }
        if (r.ichimoku?.enabled && s.ichimoku) {
          const h = s.ichimoku;
          if (u >= 0 && u < h.tenkan.length && (m(h.tenkan[u]) || m(h.kijun[u]) || m(h.senkouA[u]) || m(h.senkouB[u]))) {
            pe((N) => N === "ichimoku" ? null : "ichimoku"), ye("ichimoku");
            return;
          }
        }
        if (r.keltner?.enabled && s.keltner) {
          const h = s.keltner;
          if (u >= 0 && u < h.upper.length && (m(h.upper[u]) || m(h.middle[u]) || m(h.lower[u]))) {
            pe((N) => N === "keltner" ? null : "keltner"), ye("keltner");
            return;
          }
        }
        if (r.donchian?.enabled && s.donchian) {
          const h = s.donchian;
          if (u >= 0 && u < h.upper.length && (m(h.upper[u]) || m(h.middle[u]) || m(h.lower[u]))) {
            pe((N) => N === "donchian" ? null : "donchian"), ye("donchian");
            return;
          }
        }
        if (r.envelopes?.enabled && s.envelopes) {
          const h = s.envelopes;
          if (u >= 0 && u < h.upper.length && (m(h.upper[u]) || m(h.basis[u]) || m(h.lower[u]))) {
            pe((N) => N === "envelopes" ? null : "envelopes"), ye("envelopes");
            return;
          }
        }
        const V = ["dema", "tema", "hma"];
        for (const h of V)
          if (r[h]?.enabled && s[h]) {
            const N = s[h];
            if (Array.isArray(N) && u >= 0 && u < N.length && m(N[u])) {
              pe((de) => de === h ? null : h), ye(h);
              return;
            }
          }
      }
    }
    if (r?.volume?.enabled) {
      const $ = hn.current;
      if ($ > 0 && f >= $ * 0.8 && f <= $) {
        pe((g) => g === "volume" ? null : "volume"), ye("volume");
        return;
      }
    }
    if (Ps.current === "volumeProfile") {
      pe(($) => $ === "volumeProfile" ? null : "volumeProfile"), ye("volumeProfile");
      return;
    }
    const _ = Ps.current;
    if (_ && (_.startsWith("ci-") || _.startsWith("script-"))) {
      pe(($) => $ === _ ? null : _), ye(_);
      return;
    }
    const O = on.current, z = [
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
    for (const $ of z) {
      const g = O[$];
      if (g && f >= g.top && f <= g.top + 25 && y <= 200) {
        const S = `sp-${$}`;
        pe((B) => B === S ? null : S), ye(S);
        return;
      }
    }
    if (r && s) {
      const $ = Ie.current, g = $.candleWidth * (1 + Ze), S = Math.max(0, Math.floor($.startIndex)), B = S + Math.round(y / g), Y = 10, u = (m, V) => {
        if (!V) return !1;
        const h = O[m];
        if (!h || f < h.top || f > h.bottom || B < 0 || B >= V.length) return !1;
        const N = V[B];
        if (isNaN(N) || !isFinite(N)) return !1;
        const de = h.bottom - h.top, _e = h.top + de - N / 100 * de;
        return Math.abs(f - _e) < Y;
      }, A = (m, V) => {
        const h = O[m];
        if (!h || f < h.top || f > h.bottom) return !1;
        const N = h.bottom - h.top;
        let de = 1 / 0, _e = -1 / 0;
        const ne = xe.width - Ue, $e = Math.floor(ne / g), ee = Math.max(0, S), Re = Math.min(ee + $e, V[0]?.length ?? 0);
        for (const Pe of V)
          if (Pe)
            for (let it = ee; it < Re; it++) {
              const Je = Pe[it];
              !isNaN(Je) && isFinite(Je) && (Je < de && (de = Je), Je > _e && (_e = Je));
            }
        if (de >= _e) return !1;
        const He = (_e - de) * 0.1;
        de -= He, _e += He;
        const he = _e - de;
        if (B < 0) return !1;
        for (const Pe of V) {
          if (!Pe || B >= Pe.length) continue;
          const it = Pe[B];
          if (isNaN(it) || !isFinite(it)) continue;
          const Je = h.top + N - (it - de) / he * N;
          if (Math.abs(f - Je) < Y) return !0;
        }
        return !1;
      };
      if (r.rsi?.enabled && u("rsi", s.rsi)) {
        pe((m) => m === "sp-rsi" ? null : "sp-rsi"), ye("sp-rsi");
        return;
      }
      if (r.stochastic?.enabled && s.stochastic && (u("stochastic", s.stochastic.k) || u("stochastic", s.stochastic.d))) {
        pe((m) => m === "sp-stochastic" ? null : "sp-stochastic"), ye("sp-stochastic");
        return;
      }
      if (r.macd?.enabled && s.macd && A("macd", [s.macd.macd, s.macd.signal])) {
        pe((m) => m === "sp-macd" ? null : "sp-macd"), ye("sp-macd");
        return;
      }
      if (r.atr?.enabled && s.atr && A("atr", [s.atr])) {
        pe((m) => m === "sp-atr" ? null : "sp-atr"), ye("sp-atr");
        return;
      }
      if (r.williamsR?.enabled && s.williamsR) {
        const m = O.williamsR;
        if (m && f >= m.top && f <= m.bottom && B >= 0 && B < s.williamsR.length) {
          const V = s.williamsR[B];
          if (!isNaN(V) && isFinite(V)) {
            const h = m.bottom - m.top, N = m.top + h - (V + 100) / 100 * h;
            if (Math.abs(f - N) < Y) {
              pe((de) => de === "sp-williamsR" ? null : "sp-williamsR"), ye("sp-williamsR");
              return;
            }
          }
        }
      }
      if (r.cci?.enabled && s.cci && A("cci", [s.cci])) {
        pe((m) => m === "sp-cci" ? null : "sp-cci"), ye("sp-cci");
        return;
      }
      if (r.adx?.enabled && s.adx && (u("adx", s.adx.adx) || u("adx", s.adx.plusDI) || u("adx", s.adx.minusDI))) {
        pe((m) => m === "sp-adx" ? null : "sp-adx"), ye("sp-adx");
        return;
      }
      if (r.roc?.enabled && s.roc && A("roc", [s.roc])) {
        pe((m) => m === "sp-roc" ? null : "sp-roc"), ye("sp-roc");
        return;
      }
      if (r.aroon?.enabled && s.aroon && (u("aroon", s.aroon.up) || u("aroon", s.aroon.down))) {
        pe((m) => m === "sp-aroon" ? null : "sp-aroon"), ye("sp-aroon");
        return;
      }
      if (r.tsi?.enabled && s.tsi && A("tsi", [s.tsi.tsi, s.tsi.signal])) {
        pe((m) => m === "sp-tsi" ? null : "sp-tsi"), ye("sp-tsi");
        return;
      }
      if (r.trix?.enabled && s.trix && A("trix", [s.trix.trix, s.trix.signal])) {
        pe((m) => m === "sp-trix" ? null : "sp-trix"), ye("sp-trix");
        return;
      }
      if (r.kst?.enabled && s.kst && A("kst", [s.kst.kst, s.kst.signal])) {
        pe((m) => m === "sp-kst" ? null : "sp-kst"), ye("sp-kst");
        return;
      }
      if (r.stochRsi?.enabled && s.stochRsi && (u("stochRsi", s.stochRsi.k) || u("stochRsi", s.stochRsi.d))) {
        pe((m) => m === "sp-stochRsi" ? null : "sp-stochRsi"), ye("sp-stochRsi");
        return;
      }
      for (const m of z) {
        const V = O[m];
        if (V && f >= V.top && f <= V.bottom) {
          const h = s[m];
          if (h && Array.isArray(h) && A(m, [h])) {
            const N = `sp-${m}`;
            pe((de) => de === N ? null : N), ye(N);
            return;
          }
        }
      }
    }
    if (ao && Hs(null), Bt && pe(null), Wn && Nt(null), Oe && Oe.length > 0 && Date.now() - Kn.current > 500) {
      const $ = dn.current, g = hn.current;
      if ($ && $.range > 0 && g > 0) {
        const S = $.max - f / g * $.range, B = $.range * 6e-3;
        if (Ee.current) {
          const u = Oe.find((A) => A.id === Ee.current);
          if (u) {
            const A = ($.max - u.price) / $.range * g, m = 22, V = Math.min(A + 10, g - m - 4), h = 5, N = 45, de = 55, _e = 44, ne = xe.width - Ue, $e = N + de + _e + h * 2, Re = (ne - $e) / 2, st = Re + N + h, He = st + de + h, he = 8;
            if (y >= Re - he && y <= Re + N + he && f >= V - he && f <= V + m + he) {
              if (Ut) {
                const Pe = u.side === "buy", it = Un(u.price), Je = wt.current ?? u.stopLoss ?? (Pe ? u.price - it : u.price + it), zt = vt.current ?? u.takeProfit ?? (Pe ? u.price + it : u.price - it);
                Ut(Ee.current, Je, zt);
              }
              Ee.current = null, wt.current = null, vt.current = null, yt.current = null, un((Pe) => Pe + 1), ft(!1);
              return;
            }
            if (y >= st - he && y <= st + de + he && f >= V - he && f <= V + m + he) {
              Ee.current = null, wt.current = null, vt.current = null, yt.current = null, un((Pe) => Pe + 1), ft(!1);
              return;
            }
            if (y >= He - he && y <= He + _e + he && f >= V - he && f <= V + m + he) {
              qt && qt(Ee.current), Ee.current = null, wt.current = null, vt.current = null, yt.current = null, un((Pe) => Pe + 1), ft(!1);
              return;
            }
          }
        }
        if (Ee.current) {
          const u = Oe.find((A) => A.id === Ee.current);
          if (u) {
            const A = u.side === "buy", m = Un(u.price), V = wt.current ?? u.stopLoss ?? (A ? u.price - m : u.price + m), h = vt.current ?? u.takeProfit ?? (A ? u.price + m : u.price - m);
            if (Math.abs(S - V) < B) {
              yt.current = "sl", wt.current = V;
              return;
            }
            if (Math.abs(S - h) < B) {
              yt.current = "tp", vt.current = h;
              return;
            }
          }
        }
        let Y = null;
        for (const u of Oe)
          if (Math.abs(S - u.price) < B) {
            Y = u.id;
            break;
          }
        if (Y) {
          if (Ee.current === Y)
            Ee.current = null, wt.current = null, vt.current = null;
          else {
            Ee.current = Y;
            const u = Oe.find((A) => A.id === Y);
            wt.current = u?.stopLoss ?? null, vt.current = u?.takeProfit ?? null;
          }
          yt.current = null, un((u) => u + 1), ft(!1);
          return;
        }
      }
    }
    cs(!0), Ro({ x: y, y: f, startIndex: ce.startIndex, priceOffset: Rt });
  }, [ce.startIndex, Rt, ao, Bt, Wn, Oe, Ut, qt, an]), wl = l.useCallback(() => {
    if (yt.current && Ee.current) {
      yt.current = null, nt.current && (nt.current.style.cursor = sn.current !== "standard" ? "none" : "crosshair"), ft(!1);
      return;
    }
    if (Ft.current) {
      Xt(!1);
      const a = Ie.current;
      if (ft(!1), me) {
        const p = xe.width - Ue, x = ce.candleWidth * (1 + Ze), y = Math.floor(p / x), f = a.startIndex + y, e = o.length - 1 < f;
        Pn.current = !e;
      }
      Dt((p) => ({
        ...p,
        startIndex: a.startIndex,
        // Keep float precision - no rounding
        autoFollowLatest: !1
      }));
    }
    Vn.current !== null && (cancelAnimationFrame(Vn.current), Vn.current = null), cs(!1);
  }, [Ut, qt]);
  l.useEffect(() => {
    if (!Ln) return;
    const a = () => {
      wl();
    };
    return window.addEventListener("mouseup", a), () => {
      window.removeEventListener("mouseup", a);
    };
  }, [Ln, wl]), l.useEffect(() => {
    const a = (p) => {
      Ee.current && (p.key === "Enter" ? (p.preventDefault(), Ut && Ut(Ee.current, wt.current ?? void 0, vt.current ?? void 0), Ee.current = null, wt.current = null, vt.current = null, yt.current = null, un((x) => x + 1), ft(!1)) : (p.key === "Escape" || p.key === "Backspace") && (p.preventDefault(), Ee.current = null, wt.current = null, vt.current = null, yt.current = null, un((x) => x + 1), ft(!1)));
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [Ut, qt]), l.useEffect(() => {
    const a = (p) => {
      if (!Bt || !r || !Ce) return;
      const x = p.target?.tagName;
      if (!(x === "INPUT" || x === "TEXTAREA" || x === "SELECT"))
        if (p.key === "Backspace" || p.key === "Delete") {
          p.preventDefault();
          const y = Bt.startsWith("sp-") ? Bt.replace("sp-", "") : Bt.startsWith("movingAverages__") ? "movingAverages" : Bt, f = r[y];
          f && Ce({ ...r, [y]: { ...f, enabled: !1 } }), pe(null);
        } else p.key === "Escape" && pe(null);
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [Bt, r, Ce]);
  const Ra = l.useCallback(() => {
    Pt.current && clearTimeout(Pt.current), Pt.current = setTimeout(() => {
      if (ln.current) return;
      Hn.current = null, Ct.current = null, Rs.current = null;
      const a = nt.current, p = a?.getContext("2d");
      p && a && p.clearRect(0, 0, a.width, a.height), $n.current && $n.current(), ms(), cs(!1), ul(!1), se && se(null, null);
    }, 50);
  }, [se, ms]);
  l.useEffect(() => {
    if (!Ql && !er) return;
    const a = (y) => {
      const e = (lo.current.y - y.clientY) / 150, _ = Math.max(0.1, Math.min(10, lo.current.scale + e));
      wn.current = _, ft(!0), Et(), Qn.current && clearTimeout(Qn.current), Qn.current = setTimeout(() => {
        We(wn.current);
      }, 100);
    }, p = () => {
      ul(!1), sa(!1), We(wn.current), Et();
    }, x = (y) => {
      if (y.touches.length !== 1) return;
      y.preventDefault();
      const e = (lo.current.y - y.touches[0].clientY) / 150, _ = Math.max(0.1, Math.min(10, lo.current.scale + e));
      wn.current = _, ft(!0), Et(), Qn.current && clearTimeout(Qn.current), Qn.current = setTimeout(() => {
        We(wn.current);
      }, 100);
    };
    return window.addEventListener("mousemove", a), window.addEventListener("mouseup", p), window.addEventListener("touchmove", x, { passive: !1 }), window.addEventListener("touchend", p), window.addEventListener("touchcancel", p), () => {
      window.removeEventListener("mousemove", a), window.removeEventListener("mouseup", p), window.removeEventListener("touchmove", x), window.removeEventListener("touchend", p), window.removeEventListener("touchcancel", p);
    };
  }, [Ql, er, Et]);
  const Pa = l.useCallback((a) => {
    if (a.preventDefault(), a.touches.length === 1) {
      const p = a.touches[0], x = nt.current;
      if (!x) return;
      const y = x.getBoundingClientRect(), f = p.clientX - y.left, e = p.clientY - y.top;
      if (ds.current = { x: f, y: e }, xt.current && (clearTimeout(xt.current), xt.current = null), An) {
        us(!1), Hn.current = null;
        const $ = x.getContext("2d");
        $ && $.clearRect(0, 0, x.width, x.height);
      }
      const _ = Date.now();
      Bn.current = !0, _s.current = _;
      const O = _ - Os.current;
      if (Os.current = _, !(O < 300)) {
        const $ = _;
        xt.current = setTimeout(() => {
          _s.current === $ && Bn.current && (us(!0), Hn.current = { x: f, y: e }, bn.current !== null && cancelAnimationFrame(bn.current), bn.current = requestAnimationFrame(() => {
            Yt(), bn.current = null;
          })), xt.current = null;
        }, 400);
      }
      if (Oe && Oe.length > 0) {
        Kn.current = Date.now();
        const $ = dn.current, g = hn.current;
        if ($ && $.range > 0 && g > 0) {
          const S = $.max - e / g * $.range, B = $.range * 0.015;
          if (Ee.current) {
            const u = Oe.find((A) => A.id === Ee.current);
            if (u) {
              const A = ($.max - u.price) / $.range * g, m = 22, V = Math.min(A + 10, g - m - 4), h = 5, N = xe.width - Ue, de = 45, _e = 55, ne = 44, $e = de + _e + ne + h * 2, Re = (N - $e) / 2, st = Re + de + h, He = st + _e + h, he = 12;
              if (f >= Re - he && f <= Re + de + he && e >= V - he && e <= V + m + he) {
                Ut && Ut(Ee.current, wt.current ?? void 0, vt.current ?? void 0), Ee.current = null, wt.current = null, vt.current = null, yt.current = null, un((Pe) => Pe + 1), ft(!1);
                return;
              }
              if (f >= st - he && f <= st + _e + he && e >= V - he && e <= V + m + he) {
                Ee.current = null, wt.current = null, vt.current = null, yt.current = null, un((Pe) => Pe + 1), ft(!1);
                return;
              }
              if (f >= He - he && f <= He + ne + he && e >= V - he && e <= V + m + he) {
                qt && qt(Ee.current), Ee.current = null, wt.current = null, vt.current = null, yt.current = null, un((Pe) => Pe + 1), ft(!1);
                return;
              }
            }
          }
          if (Ee.current) {
            const u = Oe.find((A) => A.id === Ee.current);
            if (u) {
              const A = u.side === "buy", m = Un(u.price), V = wt.current ?? u.stopLoss ?? (A ? u.price - m : u.price + m), h = vt.current ?? u.takeProfit ?? (A ? u.price + m : u.price - m);
              if (Math.abs(S - V) < B) {
                yt.current = "sl", wt.current = V, xt.current && (clearTimeout(xt.current), xt.current = null);
                return;
              }
              if (Math.abs(S - h) < B) {
                yt.current = "tp", vt.current = h, xt.current && (clearTimeout(xt.current), xt.current = null);
                return;
              }
            }
          }
          let Y = null;
          for (const u of Oe) {
            const A = ($.max - u.price) / $.range * g;
            if (f <= 160 && Math.abs(e - A) < 20) {
              Y = u.id;
              break;
            }
          }
          if (Y) {
            if (Ee.current === Y)
              Ee.current = null, wt.current = null, vt.current = null;
            else {
              Ee.current = Y;
              const u = Oe.find((A) => A.id === Y);
              wt.current = u?.stopLoss ?? null, vt.current = u?.takeProfit ?? null;
            }
            yt.current = null, xt.current && (clearTimeout(xt.current), xt.current = null), un((u) => u + 1), ft(!1);
            return;
          }
        }
      }
      cs(!0), Ro({ x: f, y: e, startIndex: ce.startIndex, priceOffset: Rt });
    }
  }, [ce.startIndex, Rt, Yt, An]), Wo = l.useRef(null), pr = l.useCallback((a) => {
    if (a.touches.length === 2) {
      a.preventDefault();
      const p = a.touches[0], x = a.touches[1], y = Math.hypot(
        x.clientX - p.clientX,
        x.clientY - p.clientY
      );
      if (Wo.current !== null) {
        const f = Ie.current.candleWidth, e = Ie.current.startIndex, O = 1 + (y / Wo.current - 1) * 1.3, z = Math.max(
          Ao,
          Math.min(Bo, f * O)
        ), $ = nt.current;
        if ($) {
          const g = $.getBoundingClientRect(), S = (p.clientX + x.clientX) / 2 - g.left, B = f * (1 + Ze), Y = z * (1 + Ze), u = e + S / B, A = Math.max(0, u - S / Y);
          Ie.current = { startIndex: A, candleWidth: z }, ft(!0), Et(), Ft.current || Xt(!0);
        }
      }
      Wo.current = y;
    }
  }, [Et]), ja = l.useCallback((a) => {
    if (a.touches.length === 2) {
      pr(a), xt.current && (clearTimeout(xt.current), xt.current = null);
      return;
    }
    if (a.touches.length === 1) {
      const p = a.touches[0], x = nt.current;
      if (!x) return;
      const y = x.getBoundingClientRect(), f = p.clientX - y.left, e = p.clientY - y.top;
      if (xt.current && ds.current) {
        const _ = Math.abs(f - ds.current.x), O = Math.abs(e - ds.current.y);
        (_ > 10 || O > 10) && (clearTimeout(xt.current), xt.current = null);
      }
      if (An && (Hn.current = { x: f, y: e }, bn.current !== null && cancelAnimationFrame(bn.current), bn.current = requestAnimationFrame(() => {
        Yt(), bn.current = null;
      })), yt.current) {
        a.preventDefault();
        const _ = dn.current, O = hn.current;
        if (_ && _.range > 0 && O > 0) {
          const z = _.max - e / O * _.range;
          yt.current === "sl" ? wt.current = z : vt.current = z, kn.current === null && (kn.current = requestAnimationFrame(() => {
            ft(!1), kn.current = null;
          }));
        }
        return;
      }
      if (Ln && !An) {
        a.preventDefault(), Xt(!0);
        const _ = f - vn.x, O = e - vn.y, z = ce.candleWidth * (1 + Ze), $ = _ / z, g = Math.max(
          0,
          Math.min(o.length - 10, vn.startIndex - $)
        );
        if (fs && Vt !== null) {
          const S = Vt / wn.current / (xe.height - Lt), B = O * S;
          Jn.current = vn.priceOffset + B;
        }
        Ie.current = {
          startIndex: g,
          candleWidth: ce.candleWidth
        }, yn.current === null && (yn.current = requestAnimationFrame(() => {
          ft(!0), Et(), yn.current = null;
        }));
      }
    }
  }, [Ln, vn, ce.candleWidth, o.length, pr, Yt, An, fs, Vt, xe.height, Oe]), Na = l.useCallback(() => {
    if (Bn.current = !1, _s.current = 0, xt.current && (clearTimeout(xt.current), xt.current = null), yt.current && Ee.current) {
      yt.current = null, ft(!1), Bn.current = !1, _s.current = 0, xt.current && (clearTimeout(xt.current), xt.current = null);
      return;
    }
    if (An) {
      us(!1), Hn.current = null;
      const a = nt.current, p = a?.getContext("2d");
      p && a && p.clearRect(0, 0, a.width, a.height), se && se(null, null);
    }
    if (Ft.current) {
      Xt(!1);
      const a = Ie.current;
      if (ft(!1), me) {
        const p = xe.width - Ue, x = ce.candleWidth * (1 + Ze), y = Math.floor(p / x), f = a.startIndex + y, e = o.length - 1 < f;
        Pn.current = !e;
      }
      Dt((p) => ({
        ...p,
        startIndex: a.startIndex,
        // Keep float precision - no rounding
        candleWidth: a.candleWidth,
        // Pick up pinch-zoom final width
        autoFollowLatest: !1
      })), fs && hs(Jn.current);
    }
    cs(!1), Wo.current = null, ds.current = null, cl.current = null, yn.current !== null && (cancelAnimationFrame(yn.current), yn.current = null);
  }, [An, se, fs]);
  l.useCallback((a) => {
    let p = ps[0], x = Math.abs(a - p);
    for (const y of ps) {
      const f = Math.abs(a - y);
      f < x && (x = f, p = y);
    }
    return p;
  }, [ps]);
  const Sl = l.useCallback((a, p) => {
    const x = ps.findIndex((y) => y >= a - 1e-3);
    if (p) {
      const y = Math.min(ps.length - 1, x + 1);
      return ps[y];
    } else {
      const y = Math.max(0, x - 1);
      return ps[y];
    }
  }, [ps]), Cl = l.useCallback((a) => {
    const p = a.ctrlKey || a.metaKey;
    if (!vl.current && !p) {
      const m = Math.abs(a.deltaX) > Math.abs(a.deltaY), V = a.shiftKey && a.deltaY !== 0;
      if (m || V) {
        a.preventDefault();
        const h = Ie.current.startIndex, N = Ie.current.candleWidth, de = N * (1 + Ze);
        Xt(!0);
        const _e = V ? a.deltaY : a.deltaX, ne = 0.2 + (io - 1) * 0.2, $e = _e * ne / de, ee = Math.max(
          0,
          Math.min(o.length - 10, h + $e)
        );
        Ie.current = { startIndex: ee, candleWidth: N }, At.current && clearTimeout(At.current), At.current = setTimeout(() => {
          if (me) {
            const st = xe.width - Ue, He = Ie.current.candleWidth * (1 + Ze), he = Math.floor(st / He), Pe = Ie.current.startIndex + he;
            Pn.current = !(o.length - 1 < Pe);
          }
          const Re = Ie.current;
          Dt((st) => ({
            ...st,
            startIndex: Re.startIndex,
            autoFollowLatest: !1
          })), Xt(!1);
        }, 150), Tt.current === null && (Tt.current = requestAnimationFrame(() => {
          ft(!0), Yt(), Et(), Tt.current = null;
        }));
        return;
      }
    }
    a.preventDefault(), Xt(!0);
    const x = nt.current;
    if (!x) return;
    const y = x.getBoundingClientRect(), f = a.clientX - y.left, e = a.clientY - y.top;
    Hn.current = { x: f, y: e };
    const _ = Ie.current.startIndex, O = Ie.current.candleWidth, z = O * (1 + Ze);
    if (Math.abs(a.deltaX) > Math.abs(a.deltaY) || a.shiftKey) {
      const m = a.shiftKey ? a.deltaY : a.deltaX, V = vl.current ? 0.02 + (io - 1) * 0.02 : 0.2 + (io - 1) * 0.2, h = m * V / z, N = Math.max(
        0,
        Math.min(o.length - 10, _ + h)
      );
      Ie.current = { startIndex: N, candleWidth: O }, Tt.current === null && (Tt.current = requestAnimationFrame(() => {
        ft(!0), Yt(), Et(), Tt.current = null;
      })), At.current && clearTimeout(At.current), At.current = setTimeout(() => {
        if (me) {
          const _e = xe.width - Ue, ne = Ie.current.candleWidth * (1 + Ze), $e = Math.floor(_e / ne), ee = Ie.current.startIndex + $e;
          Pn.current = !(o.length - 1 < ee);
        }
        const de = Ie.current;
        Dt((_e) => ({
          ..._e,
          startIndex: de.startIndex,
          // Keep float precision - no rounding
          autoFollowLatest: !1
        })), Xt(!1);
      }, 150);
      return;
    }
    if (vl.current) {
      En.current += a.deltaY, oo.current && clearTimeout(oo.current), oo.current = setTimeout(() => {
        En.current = 0;
      }, 200);
      const m = 220 - io * 20;
      if (Math.abs(En.current) < m)
        return;
      const V = En.current < 0;
      En.current = 0;
      const h = Sl(O, V);
      if (h === O) return;
      const N = xe.width - Ue, de = O * (1 + Ze), _e = h * (1 + Ze), ne = _ + N / de, $e = Math.max(0, ne - N / _e);
      Xt(!0), Ie.current = { startIndex: $e, candleWidth: h }, Tt.current === null && (Tt.current = requestAnimationFrame(() => {
        ft(!0), Yt(), Et(), Tt.current = null;
      })), At.current && clearTimeout(At.current), At.current = setTimeout(() => {
        const ee = Ie.current;
        Dt((Re) => ({
          ...Re,
          candleWidth: ee.candleWidth,
          startIndex: ee.startIndex,
          // Keep float precision
          autoFollowLatest: !1
        })), Xt(!1);
      }, 100);
      return;
    }
    const $ = a.deltaY < 0, g = Sl(O, $);
    if (g === O) return;
    const S = xe.width - Ue, B = O * (1 + Ze), Y = g * (1 + Ze), u = _ + S / B, A = Math.max(0, u - S / Y);
    Xt(!0), Ie.current = { startIndex: A, candleWidth: g }, Tt.current === null && (Tt.current = requestAnimationFrame(() => {
      ft(!0), Yt(), Et(), Tt.current = null;
    })), At.current && clearTimeout(At.current), At.current = setTimeout(() => {
      const m = Ie.current;
      Dt((V) => ({
        ...V,
        candleWidth: m.candleWidth,
        startIndex: m.startIndex,
        // Keep float precision
        autoFollowLatest: !1
      })), Xt(!1);
    }, 100);
  }, [o.length, Yt, Sl, xe.width, xe.height, io, Qt, Dn, n, js, ce.autoFollowLatest, Et]), mr = l.useRef(Cl), xr = l.useRef(kl);
  l.useEffect(() => {
    mr.current = Cl;
  }, [Cl]), l.useEffect(() => {
    xr.current = kl;
  }, [kl]);
  const La = l.useRef(null), xs = l.useRef(null), bs = l.useRef(null), Ea = l.useCallback((a) => {
    if (xs.current && (xs.current.el.removeEventListener("wheel", xs.current.fn), xs.current = null), nt.current = a, a) {
      const p = (x) => mr.current(x);
      a.addEventListener("wheel", p, { passive: !1 }), xs.current = { el: a, fn: p };
    }
  }, []), Aa = l.useCallback((a) => {
    if (bs.current && (bs.current.el.removeEventListener("wheel", bs.current.fn), bs.current = null), La.current = a, a) {
      const p = (x) => xr.current(x);
      a.addEventListener("wheel", p, { passive: !1 }), bs.current = { el: a, fn: p };
    }
  }, []);
  l.useEffect(() => () => {
    xs.current && xs.current.el.removeEventListener("wheel", xs.current.fn), bs.current && bs.current.el.removeEventListener("wheel", bs.current.fn);
  }, []), l.useLayoutEffect(() => {
    const a = pt.current;
    if (!a) return;
    const p = a.getBoundingClientRect();
    p.width > 0 && p.height > 0 && to({ width: Math.round(p.width), height: Math.round(p.height) });
    const x = new ResizeObserver((y) => {
      for (const f of y) {
        const e = Math.round(f.contentRect.width), _ = Math.round(f.contentRect.height);
        e > 0 && _ > 0 && Br.flushSync(() => {
          to(
            (O) => O.width === e && O.height === _ ? O : { width: e, height: _ }
          );
        });
      }
    });
    return x.observe(a), () => x.disconnect();
  }, []), l.useEffect(() => {
    kt && kt.width > 0 && kt.height > 0 && to(kt);
  }, [kt]);
  const br = l.useRef(`${d}|${mn}`);
  l.useLayoutEffect(() => {
    const a = `${d}|${mn}`;
    br.current !== a && (br.current = a, !me && Dt((p) => p.autoFollowLatest ? p : { ...p, autoFollowLatest: !0 }));
  }, [d, mn, me]), l.useLayoutEffect(() => {
    (Ne === "footprint_cluster" || Ne === "footprint_profile") && ce.candleWidth < 22 && (Dt((a) => ({ ...a, candleWidth: 22 })), Ie.current.candleWidth = Math.max(Ie.current.candleWidth, 22), In.current.candleWidth = Math.max(In.current.candleWidth, 22));
  }, [Ne]), l.useLayoutEffect(() => {
    if (o.length === 0) return;
    if (me) {
      const e = as.current, _ = xe.width - Ue, O = ce.candleWidth * (1 + Ze), z = Math.floor(_ / O), $ = Math.floor(z * 0.9), S = Io.current <= 300 && xe.width > 300;
      if (Io.current = xe.width, o.length !== e || e === 0 || S) {
        const B = e > 0 && o.length < e, Y = Math.max(0, Math.floor(ce.startIndex)), u = Math.min(o.length, Y + z), A = o.length - 1 < u;
        if (e === 0 || B || S || A && !Pn.current) {
          const m = Math.max(0, o.length - 1 - $);
          Dt((V) => ({ ...V, startIndex: m, autoFollowLatest: !1 })), B && (Pn.current = !1);
        }
      }
      as.current = o.length;
      return;
    }
    if (!ce.autoFollowLatest) {
      if (ce.startIndex > o.length - 1) {
        const e = xe.width - Ue, _ = ce.candleWidth * (1 + Ze), O = Math.max(1, Math.floor(e / _));
        Dt((z) => ({ ...z, startIndex: Math.max(0, o.length - O) }));
      }
      return;
    }
    const a = xe.width - Ue, p = ce.candleWidth * (1 + Ze), x = Math.floor(a / p);
    if (o.length > 0 && o.length < x * 0.75) {
      const e = Math.min(
        Bo,
        a * 0.92 / (o.length * (1 + Ze))
      );
      if (e > ce.candleWidth * 1.05) {
        Ie.current = { startIndex: 0, candleWidth: e }, Dt((_) => ({ ..._, startIndex: 0, candleWidth: e })), as.current = o.length;
        return;
      }
    }
    const y = Math.min(ce.futureSpace, Math.floor(x * 0.3)), f = Math.max(0, o.length - x + y);
    Dt((e) => ({ ...e, startIndex: f })), as.current = o.length;
  }, [o.length, xe.width, ce.autoFollowLatest, ce.candleWidth, ce.futureSpace, ce.startIndex, me]), l.useLayoutEffect(() => {
    const a = Ss - so.current;
    a !== 0 && (Dt((p) => ({
      ...p,
      startIndex: Math.max(0, p.startIndex + a)
    })), Ie.current.startIndex = Math.max(0, Ie.current.startIndex + a), In.current.startIndex = Math.max(0, In.current.startIndex + a)), so.current = Ss;
  }, [Ss]), l.useEffect(() => {
    if (Fe == null) {
      Ts.current = void 0;
      return;
    }
    if (o.length === 0 || Ts.current === Fe) return;
    Ts.current = Fe;
    const a = xe.width - Ue, p = ce.candleWidth * (1 + Ze), x = Math.floor(a / p), y = Math.min(Fe, o.length - 1), f = Math.floor(x * 0.9), e = Math.max(0, y - f);
    Dt((_) => ({ ..._, startIndex: e, autoFollowLatest: !1 }));
  }, [Fe, o.length, xe.width, ce.candleWidth]), l.useEffect(() => {
    !Ft.current && !Co && ms();
  }, [ms, Co]);
  const Ml = l.useRef(0), ho = l.useRef(null);
  l.useEffect(() => {
    if (n == null || Ft.current) return;
    const a = Date.now(), p = a - Ml.current;
    return p >= 50 ? (Ml.current = a, ms()) : (ho.current && clearTimeout(ho.current), ho.current = setTimeout(() => {
      Ml.current = Date.now(), ms();
    }, 50 - p)), () => {
      ho.current && clearTimeout(ho.current);
    };
  }, [n, ms]), l.useEffect(() => {
    Yt();
  }, [Yt]), l.useEffect(() => {
    To.current = U, U != null && (Zs.current = !0, requestAnimationFrame(() => {
      Yt(), Zs.current = !1;
    }));
  }, [U, Yt]);
  const Do = l.useRef(/* @__PURE__ */ new Map()), gr = l.useMemo(() => {
    if (Ft.current && Do.current.size > 0 && o.length === Do.current.size)
      return Do.current;
    const a = /* @__PURE__ */ new Map();
    for (let p = 0; p < o.length; p++)
      a.set(o[p].time, p);
    return Do.current = a, a;
  }, [o]), Fo = l.useCallback(() => {
    if (!Be) return;
    const a = Dn();
    js(a.candles, ce.autoFollowLatest);
    const p = o.length > 0 ? o[o.length - 1] : null, x = o.length >= 2 ? o[o.length - 2] : null, y = p && x ? p.time - x.time : 6e4;
    Be({
      priceAxisWidth: Ue,
      timeToX: (f) => {
        const e = Ft.current ? In.current.startIndex : ce.startIndex, O = (Ft.current ? In.current.candleWidth : ce.candleWidth) * (1 + Ze), z = Math.floor(e), $ = (e - z) * O;
        let g = gr.get(f) ?? -1;
        if (g === -1 && o.length > 0) {
          const S = o[0], B = o[o.length - 1];
          if (f > B.time) {
            const Y = f - B.time;
            g = o.length - 1 + Math.round(Y / y);
          } else if (f < S.time) {
            const Y = S.time - f;
            g = -Math.round(Y / y);
          } else {
            let Y = 0, u = o.length - 1;
            for (; Y < u; ) {
              const A = Math.floor((Y + u) / 2);
              o[A].time < f ? Y = A + 1 : u = A;
            }
            if (Y > 0) {
              const A = o[Y - 1], m = o[Y], V = (f - A.time) / (m.time - A.time);
              return (Y - 1 + V - z) * O + O / 2 - $;
            }
            g = Y;
          }
        }
        return g === -1 ? null : (g - z) * O + O / 2 - $;
      },
      xToTime: (f) => {
        const e = Ft.current ? In.current.startIndex : ce.startIndex, O = (Ft.current ? In.current.candleWidth : ce.candleWidth) * (1 + Ze), z = Math.floor(e), $ = (e - z) * O, g = f + $, S = z + (g - O / 2) / O;
        if (S < 0) return null;
        const B = Math.floor(S), Y = S - B;
        if (B >= o.length) {
          if (p) {
            const A = S - (o.length - 1);
            return p.time + A * y;
          }
          return null;
        }
        const u = o[B];
        if (!u) return null;
        if (Y > 0 && B + 1 < o.length) {
          const A = o[B + 1];
          return u.time + Y * (A.time - u.time);
        }
        return u.time + Y * y;
      },
      priceToY: (f) => {
        let e = dn.current, _ = hn.current;
        if (!e || _ === 0) {
          const O = xe.width - Ue, z = Ie.current, $ = z.candleWidth * (1 + Ze), g = Math.floor(O / $), S = Math.max(0, Math.floor(z.startIndex)), B = Math.min(o.length, S + g), Y = o.slice(S, B);
          let u = 1 / 0, A = -1 / 0;
          if (Y.length === 0)
            u = 0, A = 100;
          else {
            for (const He of Y)
              He.low < u && (u = He.low), He.high > A && (A = He.high);
            n && (n < u && (u = n), n > A && (A = n));
          }
          const m = A - u, V = m * 0.05, h = (A + u) / 2, N = m + V * 2;
          e = {
            min: h - N / 2,
            max: h + N / 2,
            range: N
          };
          const de = r?.rsi?.enabled, _e = r?.macd?.enabled, ne = r?.atr?.enabled, $e = r?.stochastic?.enabled;
          r?.volume?.enabled && o.some((He) => He.volume !== void 0 && He.volume > 0);
          const ee = (de ? 1 : 0) + (_e ? 1 : 0) + (ne ? 1 : 0) + ($e ? 1 : 0), Re = xe.height - Lt, st = ee > 0 ? Math.max(60 * ee, Re * J) : 0;
          _ = Re - st;
        }
        if (Qt !== null && Vt !== null) {
          const O = wn.current, z = Jn.current, $ = Vt / O, g = Qt + z;
          e = {
            min: g - $ / 2,
            max: g + $ / 2,
            range: $
          };
        }
        return _ - (f - e.min) / e.range * _;
      },
      yToPrice: (f) => {
        let e = dn.current, _ = hn.current;
        if (!e || _ === 0) {
          const O = xe.width - Ue, z = Ie.current, $ = z.candleWidth * (1 + Ze), g = Math.floor(O / $), S = Math.max(0, Math.floor(z.startIndex)), B = Math.min(o.length, S + g), Y = o.slice(S, B);
          let u = 1 / 0, A = -1 / 0;
          if (Y.length === 0)
            u = 0, A = 100;
          else {
            for (const He of Y)
              He.low < u && (u = He.low), He.high > A && (A = He.high);
            n && (n < u && (u = n), n > A && (A = n));
          }
          const m = A - u, V = m * 0.05, h = (A + u) / 2, N = m + V * 2;
          e = {
            min: h - N / 2,
            max: h + N / 2,
            range: N
          };
          const de = r?.rsi?.enabled, _e = r?.macd?.enabled, ne = r?.atr?.enabled, $e = r?.stochastic?.enabled;
          r?.volume?.enabled && o.some((He) => He.volume !== void 0 && He.volume > 0);
          const ee = (de ? 1 : 0) + (_e ? 1 : 0) + (ne ? 1 : 0) + ($e ? 1 : 0), Re = xe.height - Lt, st = ee > 0 ? Math.max(60 * ee, Re * J) : 0;
          _ = Re - st;
        }
        if (Qt !== null && Vt !== null) {
          const O = wn.current, z = Jn.current, $ = Vt / O, g = Qt + z;
          e = {
            min: g - $ / 2,
            max: g + $ / 2,
            range: $
          };
        }
        return e.max - f / _ * e.range;
      }
    });
  }, [o, ce, xe, Be, r, J, n, Qt, Vt, gr]);
  l.useEffect(() => {
    Zn.current = Fo;
  }, [Fo]), l.useLayoutEffect(() => {
    Fo();
  }, [Fo]);
  const Tl = [
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
  ].filter(Boolean).length + (s?.customIndicators?.filter((a) => a.display === "subplot").length || 0), Ba = Tl > 0, vr = xe.height - Lt, Wa = Tl > 0 ? Math.max(60 * Tl, vr * J) : 0, yr = vr - Wa, kr = l.useCallback((a) => {
    a.preventDefault(), a.stopPropagation(), Ae(!0);
    const p = "touches" in a ? a.touches[0].clientY : a.clientY;
    Ht.current = { y: p, ratio: J };
  }, [J]);
  l.useEffect(() => {
    if (!jt) return;
    const a = (x) => {
      const y = "touches" in x ? x.touches[0].clientY : x.clientY, e = (Ht.current.y - y) / (xe.height - Lt), _ = Math.max(0.1, Math.min(0.6, Ht.current.ratio + e));
      ge(_);
    }, p = () => {
      Ae(!1);
    };
    return window.addEventListener("mousemove", a), window.addEventListener("mouseup", p), window.addEventListener("touchmove", a), window.addEventListener("touchend", p), () => {
      window.removeEventListener("mousemove", a), window.removeEventListener("mouseup", p), window.removeEventListener("touchmove", a), window.removeEventListener("touchend", p);
    };
  }, [jt, xe.height]);
  const Oo = (a) => {
    const { kind: p, label: x, menuKey: y, engineLabel: f, ciId: e, sid: _, remove: O } = a, z = "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground transition-colors", $ = () => {
      p !== "formula" || !e || !Ce || (Ce({
        ...r,
        customIndicators: (r.customIndicators || []).map((B) => B.id === e ? { ...B, enabled: !1 } : B)
      }), ye(null), pe(null));
    }, g = (B) => {
      B.stopPropagation(), Nt({
        visible: !0,
        x: B.clientX,
        y: B.clientY,
        key: y,
        title: x,
        custom: p === "engine" ? { kind: p, label: f || x } : p === "formula" ? { kind: p, ciId: e } : { kind: p, sid: _ }
      });
    }, S = p === "engine" && !!lt && !!f || p === "formula" && !!Mn;
    return /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
      p === "formula" && /* @__PURE__ */ t.jsx("button", { onClick: (B) => {
        B.stopPropagation(), $();
      }, className: `${z} hover:text-foreground`, title: `Hide ${x}`, children: /* @__PURE__ */ t.jsx(qo, { className: "w-[15px] h-[15px]" }) }),
      S && /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: (B) => {
            B.stopPropagation(), p === "engine" ? lt?.(f) : Mn?.();
          },
          className: `${z} hover:text-foreground`,
          title: `${x} Settings`,
          children: /* @__PURE__ */ t.jsx(Go, { className: "w-[15px] h-[15px]" })
        }
      ),
      /* @__PURE__ */ t.jsx("button", { onClick: (B) => {
        B.stopPropagation(), O();
      }, className: `${z} hover:text-destructive`, title: `Remove ${x}`, children: /* @__PURE__ */ t.jsx(Zo, { className: "w-[15px] h-[15px]" }) }),
      /* @__PURE__ */ t.jsx("button", { onClick: g, className: `${z} hover:text-foreground`, title: "More options", children: /* @__PURE__ */ t.jsx(Jo, { className: "w-[15px] h-[15px]" }) })
    ] });
  };
  return /* @__PURE__ */ t.jsxs(
    "div",
    {
      ref: pt,
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
            ref: Mo,
            width: xe.width * Tn,
            height: xe.height * Tn,
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
            ref: Ea,
            width: xe.width * Tn,
            height: xe.height * Tn,
            className: "absolute inset-0 w-full h-full cursor-crosshair touch-none select-none",
            draggable: !1,
            onDragStart: (a) => a.preventDefault(),
            style: {
              WebkitTouchCallout: "none",
              WebkitUserSelect: "none",
              willChange: "contents"
            },
            onMouseMove: Ta,
            onMouseDown: Ia,
            onMouseUp: wl,
            onMouseLeave: Ra,
            onTouchStart: Pa,
            onTouchMove: ja,
            onTouchEnd: Na,
            onContextMenu: (a) => {
              if (!r || !s) return;
              const p = nt.current;
              if (!p) return;
              const x = p.getBoundingClientRect(), y = a.clientX - x.left, f = a.clientY - x.top, e = on.current, _ = (h) => !!h && f >= h.top && f <= h.bottom, O = r?.customBrueScripts || {}, z = (h, N) => {
                pe(`script-${h}`), Nt({
                  visible: !0,
                  x: a.clientX,
                  y: a.clientY,
                  key: `script_${h}`,
                  title: O[h]?.name || N,
                  custom: { kind: "brue", sid: h }
                });
              };
              for (const h of Fr()) {
                const N = r[h];
                if (!N?.enabled || !s?.[h] || !_(e[h])) continue;
                a.preventDefault(), a.stopPropagation();
                const de = N.sourceScriptId;
                if (de && O[de]?.enabled) {
                  z(de, Ko(h));
                  return;
                }
                pe(`sp-${h}`), Nt({
                  visible: !0,
                  x: a.clientX,
                  y: a.clientY,
                  key: h,
                  title: Ko(h)
                });
                return;
              }
              for (const h of r.customIndicators || []) {
                if (!h.enabled || h.display !== "subplot" || !_(e[`custom_${h.id}`])) continue;
                a.preventDefault(), a.stopPropagation();
                const N = typeof h.expression == "string" ? h.expression : "";
                if (N.startsWith("brue:") && h.scriptId)
                  z(h.scriptId, h.name || "Brue script");
                else if (N.startsWith("local:")) {
                  const de = h.group || N.split(":")[1] || h.name;
                  pe(`ci-${h.id}`), Nt({
                    visible: !0,
                    x: a.clientX,
                    y: a.clientY,
                    key: `custom_${h.id}`,
                    title: de || "Indicator",
                    custom: { kind: "engine", label: de }
                  });
                } else
                  pe(`ci-${h.id}`), Nt({
                    visible: !0,
                    x: a.clientX,
                    y: a.clientY,
                    key: `custom_${h.id}`,
                    title: h.name || "Custom indicator",
                    custom: { kind: "formula", ciId: h.id }
                  });
                return;
              }
              const $ = dn.current, g = hn.current;
              if (!$ || g <= 0) return;
              const S = Ie.current, B = S.candleWidth * (1 + Ze), u = Math.max(0, Math.floor(S.startIndex)) + Math.round(y / B), A = 8, m = (h) => {
                if (isNaN(h) || !isFinite(h)) return !1;
                const N = g - (h - $.min) / $.range * g;
                return Math.abs(f - N) < A;
              }, V = [];
              if (r.movingAverages?.enabled && s.movingAverages && V.push({ key: "movingAverages", title: "Moving Averages", check: () => s.movingAverages.some(
                (h) => u >= 0 && u < h.data.length && m(h.data[u])
              ) }), r.bollinger?.enabled && s.bollinger) {
                const h = s.bollinger;
                V.push({
                  key: "bollinger",
                  title: "Bollinger Bands",
                  check: () => u >= 0 && u < h.upper.length && (m(h.upper[u]) || m(h.middle[u]) || m(h.lower[u]))
                });
              }
              if (r.vwap?.enabled && s.vwap && V.push({
                key: "vwap",
                title: "VWAP",
                check: () => u >= 0 && u < s.vwap.length && m(s.vwap[u])
              }), r.supertrend?.enabled && s.supertrend && V.push({
                key: "supertrend",
                title: "Supertrend",
                check: () => u >= 0 && u < s.supertrend.length && s.supertrend[u] && m(s.supertrend[u].value)
              }), r.ichimoku?.enabled && s.ichimoku) {
                const h = s.ichimoku;
                V.push({
                  key: "ichimoku",
                  title: "Ichimoku Cloud",
                  check: () => u >= 0 && u < h.tenkan.length && (m(h.tenkan[u]) || m(h.kijun[u]) || m(h.senkouA[u]) || m(h.senkouB[u]))
                });
              }
              if (r.keltner?.enabled && s.keltner) {
                const h = s.keltner;
                V.push({
                  key: "keltner",
                  title: "Keltner Channel",
                  check: () => u >= 0 && u < h.upper.length && (m(h.upper[u]) || m(h.middle[u]) || m(h.lower[u]))
                });
              }
              if (r.donchian?.enabled && s.donchian) {
                const h = s.donchian;
                V.push({
                  key: "donchian",
                  title: "Donchian Channel",
                  check: () => u >= 0 && u < h.upper.length && (m(h.upper[u]) || m(h.middle[u]) || m(h.lower[u]))
                });
              }
              for (const h of V)
                if (h.check()) {
                  a.preventDefault(), a.stopPropagation(), pe(h.key), Nt({ visible: !0, x: a.clientX, y: a.clientY, key: h.key, title: h.title });
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
              left: es ? (tr || 295) + 6 : 6,
              pointerEvents: "auto"
            },
            onMouseEnter: () => {
              hl.current = !0;
            },
            onMouseLeave: () => {
              hl.current = !1;
            },
            children: [
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: () => {
                    oa(!es);
                  },
                  className: "flex items-center justify-center w-4 h-4 rounded transition-all duration-200",
                  style: { background: "rgba(128, 128, 128, 0.3)" },
                  title: es ? "Hide OHLC" : "Show OHLC",
                  children: es ? /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", className: "w-2.5 h-2.5", fill: "none", stroke: "#9ca3af", strokeWidth: "3", strokeLinecap: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M10 4L5 8L10 12" }) }) : /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", className: "w-2.5 h-2.5", fill: "none", stroke: "#9ca3af", strokeWidth: "3", strokeLinecap: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M6 4L11 8L6 12" }) })
                }
              ),
              es && d && (() => {
                const a = /* @__PURE__ */ new Date(), p = $u(d), x = Qr(d);
                let y = "", f = "", e = 0, _ = 0, O = !1, z = x ? "#22c55e" : "#ef4444", $ = x ? "Market open" : "Market closed", g = "Real time";
                const S = Hu(a), B = S.hours * 60 + S.minutes, Y = S.day, u = S.isBST, A = u ? "BST (UTC+1)" : "GMT (UTC+0)", m = String(S.hours).padStart(2, "0"), V = String(S.minutes).padStart(2, "0"), h = Vu(d);
                if (p === "crypto")
                  O = !0, y = "24/7", f = "Always open", z = "#22c55e", $ = "Market open";
                else if (p === "forex")
                  O = !0, y = u ? "Sun 10 PM – Fri 10 PM BST" : "Sun 10 PM – Fri 10 PM GMT", f = A, x || ($ = "Weekend — market closed");
                else if (p === "stock" && h) {
                  const he = Uo(h);
                  e = he.openHour * 60 + he.openMinute, _ = he.closeHour * 60 + he.closeMinute;
                  const Pe = String(he.openHour).padStart(2, "0"), it = he.openMinute === 0 ? "00" : String(he.openMinute).padStart(2, "0"), Je = String(he.closeHour).padStart(2, "0"), zt = he.closeMinute === 0 ? "00" : String(he.closeMinute).padStart(2, "0");
                  if (y = `${Pe}:${it} – ${Je}:${zt} ${he.tzLabel}`, f = `${he.exchange} (${he.tzLabel})`, he.lunchBreak) {
                    const Sn = `${String(he.lunchBreak.startHour).padStart(2, "0")}:${String(he.lunchBreak.startMinute).padStart(2, "0")}`, en = `${String(he.lunchBreak.endHour).padStart(2, "0")}:${String(he.lunchBreak.endMinute).padStart(2, "0")}`;
                    y += ` (break ${Sn}–${en})`;
                  }
                } else if (p === "stock") {
                  e = 14 * 60 + 30, _ = 21 * 60, Xu(a) && (_ = 18 * 60, z = x ? "#f59e0b" : "#ef4444", $ = x ? "Early close today" : "Market closed");
                  const he = Math.floor(e / 60), Pe = Math.floor(_ / 60), it = e % 60 === 0 ? ":00" : ":30", Je = _ % 60 === 0 ? ":00" : ":30";
                  y = `${he}${it} – ${Pe}${Je} ${u ? "BST" : "GMT"}`, f = `NYSE/NASDAQ (${A})`;
                } else if (p === "commodity" || p === "index") {
                  O = !0, y = u ? "Sun 11 PM – Fri 10 PM BST" : "Sun 11 PM – Fri 10 PM GMT", f = A;
                  const he = u ? 23 * 60 : 22 * 60, Pe = u ? 24 * 60 : 23 * 60;
                  x && B >= he - 15 && B < he ? ($ = "Closing soon — daily break", z = "#f59e0b") : !x && B >= he && B < Pe && ($ = "Daily maintenance break");
                }
                let N = "";
                if (!O && p === "stock") {
                  let he = B;
                  if (h)
                    try {
                      const Pe = Uo(h), Je = new Intl.DateTimeFormat("en-GB", { timeZone: Pe.timezone, hour: "numeric", minute: "numeric", hour12: !1 }).formatToParts(a), zt = parseInt(Je.find((en) => en.type === "hour")?.value || "0"), Sn = parseInt(Je.find((en) => en.type === "minute")?.value || "0");
                      he = zt * 60 + Sn;
                    } catch {
                    }
                  if (x) {
                    const Pe = _ - he;
                    if (Pe > 0) {
                      const it = Math.floor(Pe / 60), Je = Pe % 60;
                      N = it > 0 ? `Closes in ${it}h ${Je}m` : `Closes in ${Je} minutes`;
                    }
                  } else {
                    const Pe = h ? (() => {
                      try {
                        const Je = new Intl.DateTimeFormat("en-GB", { timeZone: Uo(h).timezone, weekday: "short" }).formatToParts(a).find((zt) => zt.type === "weekday")?.value || "";
                        return { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5 }[Je] || 0;
                      } catch {
                        return 0;
                      }
                    })() : Y;
                    if (Pe >= 1 && Pe <= 5 && he < e) {
                      const it = e - he, Je = Math.floor(it / 60), zt = it % 60;
                      N = Je > 0 ? `Opens in ${Je}h ${zt}m` : `Opens in ${zt} minutes`;
                    }
                  }
                }
                let de = 0;
                if (!O && x && _ > e) {
                  let he = B;
                  if (h)
                    try {
                      const Pe = Uo(h), Je = new Intl.DateTimeFormat("en-GB", { timeZone: Pe.timezone, hour: "numeric", minute: "numeric", hour12: !1 }).formatToParts(a), zt = parseInt(Je.find((en) => en.type === "hour")?.value || "0"), Sn = parseInt(Je.find((en) => en.type === "minute")?.value || "0");
                      he = zt * 60 + Sn;
                    } catch {
                    }
                  de = Math.max(0, Math.min(1, (he - e) / (_ - e)));
                }
                const _e = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][Y], ne = typeof document < "u" && document.documentElement.classList.contains("dark"), $e = ne ? "rgba(22, 25, 35, 0.98)" : "rgba(255, 255, 255, 0.98)", ee = ne ? "rgba(55, 60, 75, 0.6)" : "rgba(210, 215, 225, 0.8)", Re = ne ? "#7b8094" : "#6b7280", st = ne ? "#a0a6b8" : "#374151", He = ne ? "#2a2e3a" : "#e5e7eb";
                return /* @__PURE__ */ t.jsxs(
                  "div",
                  {
                    ref: dl,
                    className: "relative",
                    children: [
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (he) => {
                            he.stopPropagation(), nr((Pe) => !Pe);
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
                                background: z,
                                boxShadow: `0 0 6px ${z}60`
                              }
                            }
                          )
                        }
                      ),
                      ro && /* @__PURE__ */ t.jsxs(
                        "div",
                        {
                          style: {
                            position: "absolute",
                            top: "calc(100% + 4px)",
                            left: -40,
                            width: 260,
                            background: $e,
                            border: `1px solid ${ee}`,
                            borderRadius: 10,
                            boxShadow: ne ? "0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)" : "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
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
                                      background: z,
                                      boxShadow: `0 0 6px ${z}60`,
                                      flexShrink: 0
                                    }
                                  }
                                ),
                                /* @__PURE__ */ t.jsx("span", { style: { color: z, fontSize: 13, fontWeight: 600 }, children: $ })
                              ] }),
                              N && /* @__PURE__ */ t.jsx("p", { style: { color: Re, fontSize: 12, margin: "4px 0 0 16px", lineHeight: 1.3 }, children: N })
                            ] }),
                            !O && p === "stock" && /* @__PURE__ */ t.jsxs("div", { style: { padding: "6px 16px 10px" }, children: [
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Re, fontSize: 9, fontWeight: 700, letterSpacing: 1.2, fontFamily: '"SF Mono", Consolas, monospace' }, children: _e }),
                                /* @__PURE__ */ t.jsx("div", { style: { flex: 1, height: 5, borderRadius: 3, background: He, overflow: "hidden", position: "relative" }, children: x && /* @__PURE__ */ t.jsx(
                                  "div",
                                  {
                                    style: {
                                      position: "absolute",
                                      left: 0,
                                      top: 0,
                                      height: "100%",
                                      width: `${de * 100}%`,
                                      background: `linear-gradient(90deg, ${z}aa, ${z})`,
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
                            /* @__PURE__ */ t.jsx("div", { style: { height: 1, background: ee, margin: "0 12px" } }),
                            /* @__PURE__ */ t.jsxs("div", { style: { padding: "10px 16px 14px" }, children: [
                              f && /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Re }, children: "Exchange timezone" }),
                                /* @__PURE__ */ t.jsx("span", { style: { color: st, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: f })
                              ] }),
                              y && p !== "stock" && /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Re }, children: "Session" }),
                                /* @__PURE__ */ t.jsx("span", { style: { color: st, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: y })
                              ] }),
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Re }, children: "Local time" }),
                                /* @__PURE__ */ t.jsxs("span", { style: { color: st, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: [
                                  m,
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
        es && r && Ce && (() => {
          const a = {
            bollinger: () => fl,
            movingAverages: () => pl,
            vwap: () => ml,
            volumeProfile: () => xl,
            volume: () => bl
          }, p = Yu().map((g) => ({
            key: g,
            title: Ko(g),
            enabledCheck: () => g === "volume" ? !!(r?.volume?.enabled && o.some((S) => S.volume)) : g === "volumeProfile" ? !!r?.volumeProfile?.enabled : !!(r?.[g]?.enabled && s?.[g]),
            endXSource: a[g] ?? (() => bt[g] || 0)
          })), x = Ke.toolbarLineHeight;
          let y = Ke.toolbarStartY;
          const f = [], e = r?.customBrueScripts || {};
          for (const g of p) {
            if (!g.enabledCheck()) continue;
            if (g.key !== "movingAverages") {
              const u = r?.[g.key]?.sourceScriptId;
              if (u && e[u]?.enabled) continue;
            }
            const S = $s.current[g.key] || g.endXSource() || 150;
            if (g.key === "movingAverages" && s?.movingAverages?.length > 0) {
              const u = r.movingAverages?.lines ?? [], A = r?.customBrueScripts || {};
              for (let m = 0; m < s.movingAverages.length; m++) {
                const V = u[m]?.sourceScriptId;
                if (V && A[V]?.enabled) continue;
                const h = `movingAverages__${m}`, N = y;
                y += x;
                const de = Bt === h, _e = u[m], ne = _e ? `${_e.type} ${_e.period}` : "MA", $e = () => {
                  const ee = u.filter((Re, st) => st !== m);
                  Ce({
                    ...r,
                    movingAverages: {
                      ...r.movingAverages,
                      enabled: ee.length > 0,
                      lines: ee
                    }
                  }), ye(null), pe(null);
                };
                f.push(
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      className: "absolute z-20 flex items-center",
                      style: { left: 0, top: N - Ke.toolbarRowYOffset, height: x },
                      onMouseEnter: () => {
                        ye(h), ln.current = !0, Pt.current && clearTimeout(Pt.current);
                      },
                      onMouseLeave: () => {
                        Pt.current = setTimeout(() => {
                          ye((ee) => ee === h ? null : ee), ln.current = !1;
                        }, 150);
                      },
                      children: [
                        de && /* @__PURE__ */ t.jsx(
                          "div",
                          {
                            className: "absolute inset-0 pointer-events-none",
                            style: { width: S + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" }
                          }
                        ),
                        /* @__PURE__ */ t.jsx(
                          "div",
                          {
                            className: "cursor-pointer select-none",
                            style: { width: S, height: 16 },
                            onClick: (ee) => {
                              ee.stopPropagation(), pe((Re) => Re === h ? null : h), ye(h);
                            },
                            onContextMenu: (ee) => {
                              ee.preventDefault(), ee.stopPropagation(), pe(h), Nt({ visible: !0, x: ee.clientX, y: ee.clientY, key: h, title: ne });
                            }
                          }
                        ),
                        de && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (ee) => {
                                ee.stopPropagation(), $e();
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                              title: `Hide ${ne}`,
                              children: /* @__PURE__ */ t.jsx(qo, { className: "w-[15px] h-[15px]" })
                            }
                          ),
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (ee) => {
                                ee.stopPropagation(), Hs({ type: "movingAverages", position: { x: S, y: N } });
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                              title: `${ne} Settings`,
                              children: /* @__PURE__ */ t.jsx(Go, { className: "w-[15px] h-[15px]" })
                            }
                          ),
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (ee) => {
                                ee.stopPropagation(), $e();
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors",
                              title: `Remove ${ne}`,
                              children: /* @__PURE__ */ t.jsx(Zo, { className: "w-[15px] h-[15px]" })
                            }
                          ),
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (ee) => {
                                ee.stopPropagation(), pe(h), Nt({ visible: !0, x: ee.clientX, y: ee.clientY, key: h, title: ne });
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                              title: "More options",
                              children: /* @__PURE__ */ t.jsx(Jo, { className: "w-[15px] h-[15px]" })
                            }
                          )
                        ] })
                      ]
                    },
                    `overlay-row-${h}`
                  )
                );
              }
              continue;
            }
            const B = y;
            y += x;
            const Y = Bt === g.key;
            Y || g.key, f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: {
                    left: 0,
                    top: B - Ke.toolbarRowYOffset,
                    height: x
                  },
                  onMouseEnter: () => {
                    ye(g.key), ln.current = !0, Pt.current && clearTimeout(Pt.current);
                  },
                  onMouseLeave: () => {
                    Pt.current = setTimeout(() => {
                      ye((u) => u === g.key ? null : u), ln.current = !1;
                    }, 150);
                  },
                  children: [
                    Y && /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "absolute inset-0 pointer-events-none",
                        style: {
                          width: S + 105,
                          borderRadius: 3,
                          background: "rgba(59, 130, 246, 0.08)"
                        }
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: S, height: 16 },
                        onClick: (u) => {
                          u.stopPropagation(), pe((A) => A === g.key ? null : g.key), ye(g.key);
                        },
                        onContextMenu: (u) => {
                          u.preventDefault(), u.stopPropagation(), pe(g.key), Nt({ visible: !0, x: u.clientX, y: u.clientY, key: g.key, title: g.title });
                        }
                      }
                    ),
                    Y && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation();
                            const A = r[g.key];
                            A && Ce({ ...r, [g.key]: { ...A, enabled: !1 } }), ye(null), pe(null);
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                          title: `Hide ${g.title}`,
                          children: /* @__PURE__ */ t.jsx(qo, { className: "w-[15px] h-[15px]" })
                        }
                      ),
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation(), Hs({ type: g.key, position: { x: S, y: B } });
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                          title: `${g.title} Settings`,
                          children: /* @__PURE__ */ t.jsx(Go, { className: "w-[15px] h-[15px]" })
                        }
                      ),
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation();
                            const A = r[g.key];
                            A && Ce({ ...r, [g.key]: { ...A, enabled: !1 } }), ye(null), pe(null);
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors",
                          title: `Remove ${g.title}`,
                          children: /* @__PURE__ */ t.jsx(Zo, { className: "w-[15px] h-[15px]" })
                        }
                      ),
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation(), pe(g.key), Nt({ visible: !0, x: u.clientX, y: u.clientY, key: g.key, title: g.title });
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                          title: "More options",
                          children: /* @__PURE__ */ t.jsx(Jo, { className: "w-[15px] h-[15px]" })
                        }
                      )
                    ] })
                  ]
                },
                `overlay-row-${g.key}`
              )
            );
          }
          const _ = (r?.customIndicators || []).filter((g) => g.enabled && g.display === "overlay"), O = /* @__PURE__ */ new Map(), z = [];
          for (const g of _)
            if (typeof g.expression == "string" && g.expression.startsWith("brue:") && g.scriptId) {
              const B = g.scriptId;
              O.has(B) || O.set(B, g);
            } else
              z.push(g);
          for (const g of z) {
            const S = `custom_overlay_${g.id}`, B = $s.current[S] || bt[S] || 150, Y = y;
            y += x;
            const u = `ci-${g.id}`, A = Bt === u, m = typeof g.expression == "string" && g.expression.startsWith("local:"), V = m ? g.group || g.expression.split(":")[1] || g.name : null, h = () => {
              m ? ze?.(V) : Ce && Ce({
                ...r,
                customIndicators: (r.customIndicators || []).filter((N) => N.id !== g.id)
              }), ye(null), pe(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: Y - Ke.toolbarRowYOffset, height: x },
                  onMouseEnter: () => {
                    ye(u), ln.current = !0, Pt.current && clearTimeout(Pt.current);
                  },
                  onMouseLeave: () => {
                    Pt.current = setTimeout(() => {
                      ye((N) => N === u ? null : N), ln.current = !1;
                    }, 150);
                  },
                  children: [
                    A && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: B + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: B, height: 16 },
                        onClick: (N) => {
                          N.stopPropagation(), pe((de) => de === u ? null : u), ye(u);
                        },
                        onContextMenu: (N) => {
                          N.preventDefault(), N.stopPropagation(), pe(u), Nt({
                            visible: !0,
                            x: N.clientX,
                            y: N.clientY,
                            key: S,
                            title: m && V || g.name,
                            custom: m ? { kind: "engine", label: V } : { kind: "formula", ciId: g.id }
                          });
                        }
                      }
                    ),
                    A && Oo({
                      kind: m ? "engine" : "formula",
                      label: m && V || g.name,
                      menuKey: S,
                      engineLabel: V || void 0,
                      ciId: g.id,
                      remove: h
                    })
                  ]
                },
                `overlay-row-${u}`
              )
            );
          }
          for (const [g, S] of O.entries()) {
            const B = `script_${g}`, Y = $s.current[B] || bt[B] || 150, u = y;
            y += x;
            const A = `script-${g}`, m = Bt === A, V = r?.customBrueScripts?.[g]?.name || S.name || "Brue script", h = () => {
              re?.(g), ye(null), pe(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: u - Ke.toolbarRowYOffset, height: x },
                  onMouseEnter: () => {
                    ye(A), ln.current = !0, Pt.current && clearTimeout(Pt.current);
                  },
                  onMouseLeave: () => {
                    Pt.current = setTimeout(() => {
                      ye((N) => N === A ? null : N), ln.current = !1;
                    }, 150);
                  },
                  children: [
                    m && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: Y + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: Y, height: 16 },
                        onClick: (N) => {
                          N.stopPropagation(), pe((de) => de === A ? null : A), ye(A);
                        },
                        onContextMenu: (N) => {
                          N.preventDefault(), N.stopPropagation(), pe(A), Nt({
                            visible: !0,
                            x: N.clientX,
                            y: N.clientY,
                            key: B,
                            title: V,
                            custom: { kind: "brue", sid: g }
                          });
                        }
                      }
                    ),
                    m && Oo({
                      kind: "brue",
                      label: V,
                      menuKey: B,
                      sid: g,
                      remove: h
                    })
                  ]
                },
                `overlay-row-${A}`
              )
            );
          }
          const $ = r?.customBrueScripts || {};
          for (const g of Object.keys($)) {
            const S = $[g];
            if (!S?.enabled || O.has(g)) continue;
            const B = `script_${g}`, Y = $s.current[B] || bt[B] || 150, u = y;
            y += x;
            const A = `script-${g}`, m = Bt === A, V = S.name || "Brue script", h = () => {
              re?.(g), ye(null), pe(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: u - Ke.toolbarRowYOffset, height: x },
                  onMouseEnter: () => {
                    ye(A), ln.current = !0, Pt.current && clearTimeout(Pt.current);
                  },
                  onMouseLeave: () => {
                    Pt.current = setTimeout(() => {
                      ye((N) => N === A ? null : N), ln.current = !1;
                    }, 150);
                  },
                  children: [
                    m && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: Y + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: Y, height: 16 },
                        onClick: (N) => {
                          N.stopPropagation(), pe((de) => de === A ? null : A), ye(A);
                        },
                        onContextMenu: (N) => {
                          N.preventDefault(), N.stopPropagation(), pe(A), Nt({
                            visible: !0,
                            x: N.clientX,
                            y: N.clientY,
                            key: B,
                            title: V,
                            custom: { kind: "brue", sid: g }
                          });
                        }
                      }
                    ),
                    m && Oo({
                      kind: "brue",
                      label: V,
                      menuKey: B,
                      sid: g,
                      remove: h
                    })
                  ]
                },
                `overlay-row-${A}`
              )
            );
          }
          return f;
        })(),
        r && Ce && (() => {
          const a = Fr().map((x) => ({ key: x, title: Ko(x) })), p = r?.customBrueScripts || {};
          return a.map(({ key: x, title: y }) => {
            const f = on.current[x];
            if (!s?.[x] || !f) return null;
            const _ = r?.[x]?.sourceScriptId;
            if (_ && p[_]?.enabled) return null;
            const O = Xn.current[x] || sr[x] || 150, z = `sp-${x}`, $ = Bt === z;
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
                  ye(z), ln.current = !0, Pt.current && clearTimeout(Pt.current);
                },
                onMouseLeave: () => {
                  Pt.current = setTimeout(() => {
                    ye((g) => g === z ? null : g), ln.current = !1;
                  }, 150);
                },
                children: [
                  $ && /* @__PURE__ */ t.jsx(
                    "div",
                    {
                      className: "absolute inset-0 pointer-events-none",
                      style: {
                        width: O + 105,
                        borderRadius: 3,
                        background: "rgba(59, 130, 246, 0.08)"
                      }
                    }
                  ),
                  /* @__PURE__ */ t.jsx(
                    "div",
                    {
                      className: "cursor-pointer select-none",
                      style: { width: O, height: 16 },
                      onClick: (g) => {
                        g.stopPropagation(), pe((S) => S === z ? null : z), ye(z);
                      },
                      onContextMenu: (g) => {
                        g.preventDefault(), g.stopPropagation(), pe(z), Nt({ visible: !0, x: g.clientX, y: g.clientY, key: x, title: y });
                      }
                    }
                  ),
                  $ && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (g) => {
                          g.stopPropagation();
                          const S = r[x];
                          S && Ce({ ...r, [x]: { ...S, enabled: !1 } }), ye(null), pe(null);
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: `Hide ${y}`,
                        children: /* @__PURE__ */ t.jsx(qo, { className: "w-[15px] h-[15px]" })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (g) => {
                          g.stopPropagation(), Hs({ type: x, position: { x: O, y: f.top } });
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: `${y} Settings`,
                        children: /* @__PURE__ */ t.jsx(Go, { className: "w-[15px] h-[15px]" })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (g) => {
                          g.stopPropagation();
                          const S = r[x];
                          S && Ce({ ...r, [x]: { ...S, enabled: !1 } }), ye(null), pe(null);
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors",
                        title: `Remove ${y}`,
                        children: /* @__PURE__ */ t.jsx(Zo, { className: "w-[15px] h-[15px]" })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (g) => {
                          g.stopPropagation(), pe(z), Nt({ visible: !0, x: g.clientX, y: g.clientY, key: x, title: y });
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: "More options",
                        children: /* @__PURE__ */ t.jsx(Jo, { className: "w-[15px] h-[15px]" })
                      }
                    )
                  ] })
                ]
              },
              `sp-row-${x}`
            );
          });
        })(),
        r && Ce && (() => {
          const a = (r?.customIndicators || []).filter((e) => e.enabled && e.display === "subplot"), p = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Map();
          for (const e of a)
            if (typeof e.expression == "string" && e.expression.startsWith("brue:") && e.scriptId) {
              const O = e.scriptId;
              p.has(O) || p.set(O, e);
            } else if (typeof e.expression == "string" && e.expression.startsWith("local:") && e.group) {
              const O = e.group;
              x.has(O) || x.set(O, e);
            }
          const y = [], f = [];
          for (const [e, _] of p.entries())
            f.push({
              rowKey: `script-${e}`,
              firstPlot: _,
              label: r?.customBrueScripts?.[e]?.name || _.name || "Brue script",
              kind: "brue",
              handle: e,
              remove: () => re?.(e)
            });
          for (const [e, _] of x.entries())
            f.push({
              rowKey: `engine-sp-${e}`,
              firstPlot: _,
              label: e,
              kind: "engine",
              handle: e,
              remove: () => ze?.(e)
            });
          for (const { rowKey: e, firstPlot: _, label: O, kind: z, handle: $, remove: g } of f) {
            const S = on.current[`custom_${_.id}`];
            if (!S) continue;
            const B = Bt === e, Y = 200, u = () => {
              g(), ye(null), pe(null);
            };
            y.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: S.top + 2, height: 16 },
                  onMouseEnter: () => {
                    ye(e), ln.current = !0, Pt.current && clearTimeout(Pt.current);
                  },
                  onMouseLeave: () => {
                    Pt.current = setTimeout(() => {
                      ye((A) => A === e ? null : A), ln.current = !1;
                    }, 150);
                  },
                  children: [
                    B && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: Y + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: Y, height: 16 },
                        onClick: (A) => {
                          A.stopPropagation(), pe((m) => m === e ? null : e), ye(e);
                        },
                        onContextMenu: (A) => {
                          A.preventDefault(), A.stopPropagation(), pe(e), Nt({
                            visible: !0,
                            x: A.clientX,
                            y: A.clientY,
                            key: `custom_${_.id}`,
                            title: O,
                            custom: z === "engine" ? { kind: "engine", label: $ } : { kind: "brue", sid: $ }
                          });
                        }
                      }
                    ),
                    B && Oo({
                      kind: z,
                      label: O,
                      menuKey: `custom_${_.id}`,
                      engineLabel: z === "engine" ? $ : void 0,
                      sid: z === "brue" ? $ : void 0,
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
            ref: Aa,
            className: "absolute top-0 cursor-ns-resize z-40",
            style: {
              right: 0,
              width: Ue,
              height: yr
            },
            onMouseDown: Ca,
            onTouchStart: Ma,
            title: "Drag to stretch/compress, Scroll to pan up/down"
          }
        ),
        /* @__PURE__ */ t.jsx(
          "div",
          {
            className: "absolute z-10 flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity duration-200",
            style: {
              bottom: Lt + 8,
              left: `calc(50% - ${Ue / 2}px)`,
              transform: "translateX(-50%)"
            },
            children: /* @__PURE__ */ t.jsxs("div", { className: "flex items-center bg-card/90 backdrop-blur-sm rounded-lg border border-border/40 shadow-lg overflow-hidden", children: [
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: va,
                  className: "w-8 h-7 lg:w-10 lg:h-9 flex items-center justify-center hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all text-lg lg:text-xl font-light border-r border-border/30",
                  title: "Zoom out (show more candles)",
                  children: "−"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: ga,
                  className: "w-8 h-7 lg:w-10 lg:h-9 flex items-center justify-center hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all text-lg lg:text-xl font-light border-r border-border/30",
                  title: "Zoom in (show fewer candles)",
                  children: "+"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: wa,
                  className: "w-7 h-7 lg:w-9 lg:h-9 flex items-center justify-center hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all text-base lg:text-lg border-r border-border/30",
                  title: "Move left (older)",
                  children: "‹"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: Sa,
                  className: "w-7 h-7 lg:w-9 lg:h-9 flex items-center justify-center hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all text-base lg:text-lg border-r border-border/30",
                  title: "Move right (newer)",
                  children: "›"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: ya,
                  className: "w-8 h-7 lg:w-10 lg:h-9 flex items-center justify-center hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all",
                  title: "Reset view",
                  children: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 14 14", className: "w-3.5 h-3.5 lg:w-4 lg:h-4", fill: "currentColor", children: /* @__PURE__ */ t.jsx("path", { d: "M7 1.5c-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5c2.41 0 4.46-1.55 5.2-3.71l-1.41-.49c-.53 1.51-1.96 2.6-3.79 2.6-2.13 0-3.9-1.77-3.9-3.9s1.77-3.9 3.9-3.9c1.08 0 2.05.44 2.75 1.15L8 6h4.5V1.5L10.96 3C9.93 1.97 8.54 1.5 7 1.5z" }) })
                }
              )
            ] })
          }
        ),
        fs && /* @__PURE__ */ t.jsx(
          "div",
          {
            className: "absolute z-50 flex items-center justify-center",
            style: {
              top: 4,
              // Desktop reserves the RIGHT_TOOLBAR_WIDTH gap because the price
              // axis carries the right toolbar overlay; phone/tablet have no
              // overlay, so the reset button uses the full axis width.
              right: zn ?? (Ke.yAxisResetUsesToolbarGap ? _l : 0),
              width: zn !== void 0 ? Ue - zn : Ke.yAxisResetUsesToolbarGap ? Ue - _l : Ue
            },
            children: /* @__PURE__ */ t.jsxs(
              "button",
              {
                onClick: ka,
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
        Ba && /* @__PURE__ */ t.jsxs(
          "div",
          {
            className: "absolute left-0 h-3 flex items-center justify-center cursor-ns-resize z-10 group hover:h-4 transition-all duration-150",
            style: {
              top: yr - 6,
              right: Ue,
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
        ao && r && Ce && xe && /* @__PURE__ */ t.jsx(
          zu,
          {
            type: ao.type,
            config: r,
            onConfigChange: Ce,
            position: ao.position,
            onClose: () => Hs(null)
          }
        ),
        Wn && Wn.visible && r && Ce && (() => {
          const a = nt.current?.getBoundingClientRect();
          if (!a) return null;
          const p = Wn.x - a.left, x = Wn.y - a.top, y = Wn.key, f = Wn.custom, e = () => {
            f?.kind === "brue" ? re?.(f.sid) : f?.kind === "engine" ? ze?.(f.label) : f?.kind === "formula" && Ce({
              ...r,
              customIndicators: (r.customIndicators || []).filter((_) => _.id !== f.ciId)
            });
          };
          return Br.createPortal(
            (() => {
              const _ = "var(--text)", O = "var(--dim)", z = "var(--hover)", $ = "var(--edge)", g = {
                display: "block",
                width: "100%",
                padding: "3px 10px",
                border: "none",
                cursor: "pointer",
                background: "transparent",
                textAlign: "left",
                fontSize: "12px",
                fontFamily: "inherit",
                color: _,
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
                    left: Math.min(Wn.x, window.innerWidth - 170),
                    top: Math.min(Wn.y, window.innerHeight - 140)
                  },
                  children: [
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        style: { position: "fixed", inset: 0, zIndex: -1 },
                        onClick: () => {
                          Nt(null), pe(null);
                        },
                        onContextMenu: (S) => {
                          S.preventDefault(), Nt(null), pe(null);
                        }
                      }
                    ),
                    /* @__PURE__ */ t.jsx("div", { style: {
                      padding: "5px 10px 3px",
                      fontSize: "11px",
                      color: O,
                      whiteSpace: "nowrap"
                    }, children: Wn.title }),
                    !f && /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        style: g,
                        onMouseEnter: (S) => {
                          S.currentTarget.style.background = z;
                        },
                        onMouseLeave: (S) => {
                          S.currentTarget.style.background = "transparent";
                        },
                        onClick: () => {
                          Hs({ type: y, position: { x: p, y: x } }), Nt(null);
                        },
                        children: "Settings..."
                      }
                    ),
                    f?.kind === "engine" && lt && /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        style: g,
                        onMouseEnter: (S) => {
                          S.currentTarget.style.background = z;
                        },
                        onMouseLeave: (S) => {
                          S.currentTarget.style.background = "transparent";
                        },
                        onClick: () => {
                          lt(f.label), Nt(null);
                        },
                        children: "Settings..."
                      }
                    ),
                    !f && /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        style: g,
                        onMouseEnter: (S) => {
                          S.currentTarget.style.background = z;
                        },
                        onMouseLeave: (S) => {
                          S.currentTarget.style.background = "transparent";
                        },
                        onClick: () => {
                          const S = r[y];
                          S && Ce({ ...r, [y]: { ...S, enabled: !1 } }), Nt(null), pe(null);
                        },
                        children: "Hide"
                      }
                    ),
                    /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: `1px solid ${$}` } }),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        style: { ...g, color: "var(--err)" },
                        onMouseEnter: (S) => {
                          S.currentTarget.style.background = z;
                        },
                        onMouseLeave: (S) => {
                          S.currentTarget.style.background = "transparent";
                        },
                        onClick: () => {
                          if (f)
                            e();
                          else {
                            const S = r[y];
                            S && Ce({ ...r, [y]: { ...S, enabled: !1 } });
                          }
                          Nt(null), pe(null);
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
}, hd = [
  { title: "Select", tools: ["cursor"] },
  { title: "Lines", tools: ["trendline", "arrow", "ray", "extended", "hline", "hray", "vline", "cross"] },
  { title: "Shapes", tools: ["rectangle", "channel", "polyline", "brush"] },
  { title: "Levels", tools: ["fib", "long", "short"] },
  { title: "Notes", tools: ["text", "measure", "pricerange", "daterange"] }
], fd = {
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
function pd({ active: o, title: n, icon: d, onClick: T }) {
  return /* @__PURE__ */ t.jsxs(
    "button",
    {
      onClick: T,
      title: n,
      className: `relative w-9 h-9 flex items-center justify-center rounded-md text-[14px] font-medium transition-all
        ${o ? "bg-[#e8e8e8] text-[#1c1c1c] shadow-sm" : "bg-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}
      `,
      children: [
        o && /* @__PURE__ */ t.jsx("span", { className: "absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-[#21b3a4] rounded-r" }),
        /* @__PURE__ */ t.jsx("span", { className: "leading-none", children: d })
      ]
    }
  );
}
function el({ active: o, title: n, icon: d, onClick: T }) {
  return /* @__PURE__ */ t.jsx(
    "button",
    {
      onClick: T,
      title: n,
      className: `w-9 h-9 flex items-center justify-center rounded-md text-[13px] transition-colors
        ${o ? "bg-[#343434] text-[#e8e8e8] border border-[#4a4a4a]" : "text-[#6a6a6a] hover:bg-[#262626] hover:text-[#b9b9b9]"}
      `,
      children: d
    }
  );
}
function md({
  activeTool: o = "cursor",
  onToolSelect: n,
  magnet: d = !1,
  onToggleMagnet: T,
  hiddenAll: M = !1,
  onToggleHidden: se,
  onClearAll: U,
  collapsed: Me = !1,
  onToggleCollapsed: r
}) {
  const [Ce, re] = l.useState(!1), ze = Me ? 16 : 48;
  return Me ? /* @__PURE__ */ t.jsx("div", { className: "flex flex-col items-center bg-[#1c1c1c] border-r border-[#2a2a2a] shrink-0 py-2", style: { width: ze, minWidth: ze }, children: /* @__PURE__ */ t.jsx("button", { onClick: () => r?.(), className: "w-6 h-6 flex items-center justify-center rounded bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] hover:text-[#e8e8e8] hover:bg-[#343434] text-[10px]", children: "›" }) }) : /* @__PURE__ */ t.jsxs("div", { className: "flex flex-col bg-[#1c1c1c] border-r border-[#2a2a2a] shrink-0 select-none", style: { width: ze, minWidth: ze }, children: [
    /* @__PURE__ */ t.jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden flex flex-col items-center gap-1 px-1 py-2 scrollbar-thin", children: hd.map((lt, Be) => /* @__PURE__ */ t.jsxs(Ii.Fragment, { children: [
      Be > 0 && /* @__PURE__ */ t.jsx("div", { className: "w-8 h-px bg-[#2a2a2a] my-2 shrink-0" }),
      /* @__PURE__ */ t.jsx("div", { className: "flex flex-col items-center gap-1", children: lt.tools.map((Ye) => {
        const ve = fd[Ye];
        return /* @__PURE__ */ t.jsx(
          pd,
          {
            active: o === Ye,
            title: ve.label,
            icon: ve.icon,
            onClick: () => {
              n?.(o === Ye ? "cursor" : Ye);
            }
          },
          Ye
        );
      }) })
    ] }, Be)) }),
    /* @__PURE__ */ t.jsxs("div", { className: "shrink-0 flex flex-col items-center gap-1 px-1 py-2 border-t border-[#2a2a2a]", children: [
      /* @__PURE__ */ t.jsx(el, { active: d, title: d ? "Magnet ON — snap to OHLC" : "Magnet OFF", icon: "🧲", onClick: () => T?.() }),
      /* @__PURE__ */ t.jsx(el, { active: M, title: M ? "Show drawings" : "Hide all", icon: M ? "👁‍🗨" : "👁", onClick: () => se?.() }),
      /* @__PURE__ */ t.jsx(el, { title: "Remove all drawings", icon: "🗑", onClick: () => re(!0) }),
      /* @__PURE__ */ t.jsx("div", { className: "w-8 h-px bg-[#2a2a2a] my-1" }),
      /* @__PURE__ */ t.jsx(el, { title: "Collapse toolbar", icon: "‹", onClick: () => r?.() })
    ] }),
    Ce && /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-[#1c1c1c] border border-[#3a3a3a] rounded-lg p-4 w-[260px] shadow-2xl", children: [
      /* @__PURE__ */ t.jsx("div", { className: "text-[13px] font-semibold text-[#e8e8e8] mb-1", children: "Remove all drawings?" }),
      /* @__PURE__ */ t.jsx("div", { className: "text-[11px] text-[#b9b9b9] mb-4", children: "This will clear all drawings on the chart. This action cannot be undone." }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex gap-2 justify-end", children: [
        /* @__PURE__ */ t.jsx("button", { onClick: () => re(!1), className: "px-4 py-1.5 text-[12px] rounded-md bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]", children: "Cancel" }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => {
          U?.(), re(!1);
        }, className: "px-4 py-1.5 text-[12px] rounded-md bg-[#f0426c] text-white hover:bg-[#d93a5e] font-medium", children: "Remove" })
      ] })
    ] }) })
  ] });
}
const $l = [
  { id: "candles", label: "Candles", desc: "OHLC candles", icon: "◧" },
  { id: "fp_cluster", label: "Cluster", desc: "Bid/ask volume per price", icon: "▦" },
  { id: "fp_profile", label: "Profile", desc: "Delta profile per candle", icon: "◫" },
  { id: "heikin_ashi", label: "Heikin Ashi", desc: "Smoothed trend", icon: "⬓" },
  { id: "line", label: "Line", desc: "Close price line", icon: "╱" },
  { id: "tpo", label: "TPO", desc: "Time Price Opportunity", icon: "☰" },
  { id: "renko", label: "Renko", desc: "Price-driven bricks", icon: "▭" },
  { id: "flow_positioning", label: "Flow", desc: "Flow & Positioning", icon: "⇄" }
];
function xd({
  value: o,
  onChange: n
}) {
  const [d, T] = l.useState(!1), M = l.useRef(null);
  l.useEffect(() => {
    const U = (Me) => {
      M.current && !M.current.contains(Me.target) && T(!1);
    };
    return document.addEventListener("mousedown", U), () => document.removeEventListener("mousedown", U);
  }, []);
  const se = $l.find((U) => U.id === o) || $l[0];
  return /* @__PURE__ */ t.jsxs("div", { ref: M, className: "relative", children: [
    /* @__PURE__ */ t.jsxs(
      "button",
      {
        onClick: () => T((U) => !U),
        className: "flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#3a3a3a] bg-[#262626] text-[12px] font-medium text-[#e8e8e8] hover:bg-[#343434] hover:border-[#4a4a4a] transition-colors",
        children: [
          /* @__PURE__ */ t.jsx("span", { className: "text-[12px] opacity-70", children: se.icon }),
          /* @__PURE__ */ t.jsx("span", { children: se.label }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[10px] opacity-50 ml-1", children: d ? "▲" : "▼" })
        ]
      }
    ),
    d && /* @__PURE__ */ t.jsxs("div", { className: "absolute top-full left-0 mt-2 z-40 w-[260px] rounded-lg border border-[#3a3a3a] bg-[#1c1c1c] shadow-2xl overflow-hidden", children: [
      /* @__PURE__ */ t.jsx("div", { className: "px-3 py-2 border-b border-[#2a2a2a] bg-[#222222]", children: /* @__PURE__ */ t.jsx("span", { className: "text-[10px] font-semibold tracking-wider text-[#b9b9b9]", children: "CHART TYPE" }) }),
      /* @__PURE__ */ t.jsx("div", { className: "p-2 grid grid-cols-1 gap-1 max-h-[320px] overflow-auto", children: $l.map((U) => /* @__PURE__ */ t.jsxs(
        "button",
        {
          onClick: () => {
            n(U.id), T(!1);
          },
          className: `flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${o === U.id ? "bg-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border border-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8] hover:border-[#3a3a3a]"}`,
          children: [
            /* @__PURE__ */ t.jsx("span", { className: "text-[14px] w-5 text-center", children: U.icon }),
            /* @__PURE__ */ t.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[12px] font-medium leading-tight", children: U.label }),
              /* @__PURE__ */ t.jsx("div", { className: `text-[10px] leading-tight mt-0.5 ${o === U.id ? "text-[#1c1c1c]/70" : "text-[#6a6a6a]"}`, children: U.desc })
            ] }),
            o === U.id && /* @__PURE__ */ t.jsx("span", { className: "text-[10px]", children: "●" })
          ]
        },
        U.id
      )) })
    ] })
  ] });
}
const Yn = [
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
function bd({
  value: o,
  onChange: n,
  favs: d,
  onToggleFav: T
}) {
  const [M, se] = l.useState(!1), [U, Me] = l.useState(""), r = l.useRef(null);
  l.useEffect(() => {
    const q = (fe) => {
      r.current && !r.current.contains(fe.target) && se(!1);
    };
    return document.addEventListener("mousedown", q), () => document.removeEventListener("mousedown", q);
  }, []);
  const Ce = (q) => {
    const fe = q.trim();
    if (!fe) return null;
    if (fe.toLowerCase() === "tick") return Yn.find((qt) => qt.label === "tick");
    const tt = fe.match(/^(\d+)(s|m|h|d|w|M)$/i);
    if (!tt) return null;
    const ue = parseInt(tt[1], 10);
    if (!(ue > 0)) return null;
    const kt = tt[2], at = kt.toLowerCase();
    let Oe = 0;
    if (kt === "M") Oe = ue * 2592e6;
    else if (at === "s") Oe = ue * 1e3;
    else if (at === "m") Oe = ue * 6e4;
    else if (at === "h") Oe = ue * 36e5;
    else if (at === "d") Oe = ue * 864e5;
    else if (at === "w") Oe = ue * 6048e5;
    else return null;
    return Oe > 31536e6 ? null : { label: kt === "M" ? `${ue}M` : at === "d" ? `${ue}D` : at === "w" ? `${ue}W` : `${ue}${at}`, ms: Oe, sec: Math.floor(Oe / 1e3) };
  }, re = (q) => d.has(q) || d.has(q.toLowerCase()) || d.has(q.toUpperCase()), ze = /* @__PURE__ */ new Set(), lt = Yn.filter((q) => d.has(q.label) || d.has(q.label.toLowerCase()) || d.has(q.label.toUpperCase())).filter((q) => {
    const fe = q.label.toLowerCase();
    return ze.has(fe) ? !1 : (ze.add(fe), !0);
  }), Be = ["1m", "5m", "15m", "1h", "4h", "1D"], Ye = lt.length ? lt.map((q) => q.label).slice(0, 6) : Be, ve = /* @__PURE__ */ new Set(), et = Ye.filter((q) => {
    const fe = q.toLowerCase();
    return ve.has(fe) ? !1 : (ve.add(fe), !0);
  }), me = (q) => {
    n(q), se(!1);
  }, Fe = (q) => q === "1M" ? "1M" : q.toLowerCase(), Ne = Fe(o.label), rt = [
    { title: "Ticks", items: ["tick"] },
    { title: "Seconds", items: ["1s", "5s", "15s", "30s"] },
    { title: "Minutes", items: ["1m", "3m", "5m", "15m", "30m"] },
    { title: "Hours", items: ["1h", "2h", "4h", "6h", "8h", "12h"] },
    { title: "Days & Months", items: ["1D", "3D", "1W", "1M"] }
  ];
  return /* @__PURE__ */ t.jsxs("div", { ref: r, className: "relative", style: { overflow: "visible" }, children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-1 px-2 py-1 rounded-md border border-[#3a3a3a] bg-[#262626] text-[12px] select-none", children: [
      /* @__PURE__ */ t.jsx("div", { className: "flex items-center gap-1", children: et.map((q) => {
        const fe = Yn.find((ue) => ue.label.toLowerCase() === q.toLowerCase()) || Yn.find((ue) => ue.label === q), tt = fe ? Fe(fe.label) === Ne : !1;
        return /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: (ue) => {
              ue.stopPropagation(), fe && me(fe);
            },
            className: `px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${tt ? "bg-[#e8e8e8] text-[#1c1c1c]" : "bg-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
            children: q
          },
          q
        );
      }) }),
      /* @__PURE__ */ t.jsx("div", { className: "w-px h-4 bg-[#3a3a3a] mx-1" }),
      /* @__PURE__ */ t.jsxs(
        "button",
        {
          onClick: () => se((q) => !q),
          className: "flex items-center gap-1 px-2 py-0.5 rounded bg-[#2a2a2a] border border-[#3a3a3a] text-[#e8e8e8] hover:bg-[#343434] text-[11px] font-medium",
          children: [
            /* @__PURE__ */ t.jsx("span", { children: o.label }),
            /* @__PURE__ */ t.jsx("span", { className: "text-[10px] opacity-60", children: M ? "▲" : "▼" })
          ]
        }
      ),
      /* @__PURE__ */ t.jsxs("span", { className: "ml-2 hidden md:flex items-center gap-1.5 text-[10px] text-[#b9b9b9]", children: [
        /* @__PURE__ */ t.jsx("span", { className: "w-2 h-2 rounded-full bg-[#21b3a4] animate-pulse" }),
        "Live"
      ] })
    ] }),
    M && /* @__PURE__ */ t.jsxs("div", { className: "absolute top-full left-0 mt-2 z-[100] w-[340px] rounded-lg border border-[#3a3a3a] bg-[#1c1c1c] shadow-2xl overflow-hidden", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 border-b border-[#2a2a2a] bg-[#222222]", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t.jsx("span", { className: "text-[11px] font-semibold tracking-wider text-[#e8e8e8]", children: "TIMEFRAME" }),
          /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] px-1.5 py-0.5 rounded bg-[#2a2a2a] border border-[#3a3a3a] text-[#b9b9b9]", children: [
            lt.length,
            "/6 favs"
          ] })
        ] }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => se(!1), className: "text-[#b9b9b9] hover:text-[#e8e8e8] text-[14px]", children: "×" })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "p-3 space-y-4 max-h-[60vh] overflow-auto scrollbar-thin", children: [
        lt.length > 0 && /* @__PURE__ */ t.jsxs("div", { children: [
          /* @__PURE__ */ t.jsxs("div", { className: "text-[10px] font-semibold tracking-wider text-[#b9b9b9] mb-2 flex items-center gap-1", children: [
            /* @__PURE__ */ t.jsx("span", { className: "text-[#e8e8e8]", children: "★" }),
            " FAVOURITES"
          ] }),
          /* @__PURE__ */ t.jsx("div", { className: "flex flex-wrap gap-1.5", children: lt.map((q) => {
            const fe = Fe(q.label) === Ne;
            return /* @__PURE__ */ t.jsxs(
              "button",
              {
                onClick: () => me(q),
                className: `group flex items-center gap-1 px-2.5 py-1 rounded-md border text-[11px] font-medium transition-colors ${fe ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#e8e8e8] hover:bg-[#343434]"}`,
                children: [
                  q.label,
                  /* @__PURE__ */ t.jsx(
                    "span",
                    {
                      onClick: (tt) => {
                        tt.stopPropagation(), T(q.label);
                      },
                      className: "ml-1 text-[10px] opacity-60 hover:opacity-100",
                      title: "Remove from favourites",
                      children: "★"
                    }
                  )
                ]
              },
              q.label
            );
          }) })
        ] }),
        rt.map((q) => /* @__PURE__ */ t.jsxs("div", { children: [
          /* @__PURE__ */ t.jsx("div", { className: "text-[10px] font-semibold tracking-wider text-[#b9b9b9] mb-2", children: q.title.toUpperCase() }),
          /* @__PURE__ */ t.jsx("div", { className: "grid grid-cols-5 gap-1.5", children: q.items.map((fe) => {
            const tt = Yn.find((at) => at.label === fe);
            if (!tt) return null;
            const ue = Fe(tt.label) === Ne, kt = re(fe);
            return /* @__PURE__ */ t.jsxs(
              "button",
              {
                onClick: () => me(tt),
                onContextMenu: (at) => {
                  at.preventDefault(), T(fe);
                },
                className: `relative px-2 py-1.5 rounded-md border text-[11px] font-medium transition-colors ${ue ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8] hover:border-[#4a4a4a]"}`,
                title: kt ? "Favourite — right-click to remove" : "Right-click to add to favourites",
                children: [
                  fe,
                  kt && /* @__PURE__ */ t.jsx("span", { className: "absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#21b3a4] rounded-full" })
                ]
              },
              fe
            );
          }) })
        ] }, q.title)),
        /* @__PURE__ */ t.jsxs("div", { className: "pt-3 border-t border-[#2a2a2a]", children: [
          /* @__PURE__ */ t.jsx("div", { className: "text-[10px] font-semibold tracking-wider text-[#b9b9b9] mb-2", children: "CUSTOM" }),
          /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ t.jsx(
              "input",
              {
                value: U,
                onChange: (q) => Me(q.target.value),
                onKeyDown: (q) => {
                  if (q.key === "Enter") {
                    const fe = Ce(U);
                    fe && me(fe);
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
                  const q = Ce(U);
                  q && me(q);
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
const gd = {
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
function vd({
  settings: o,
  onChange: n,
  onClose: d
}) {
  const T = (M) => n({ ...o, ...M });
  return /* @__PURE__ */ t.jsxs("div", { className: "w-[360px] rounded-xl border border-[#3a3a3a] bg-[#1c1c1c] shadow-2xl overflow-hidden", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex justify-between items-center px-4 py-3 border-b border-[#2a2a2a] bg-[#222222]", children: [
      /* @__PURE__ */ t.jsx("span", { className: "font-semibold tracking-wider text-[11px] text-[#e8e8e8]", children: "APPEARANCE" }),
      d && /* @__PURE__ */ t.jsx("button", { onClick: d, className: "w-7 h-7 flex items-center justify-center rounded-md bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] hover:text-[#e8e8e8] hover:bg-[#343434]", children: "×" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "p-4 space-y-5 max-h-[70vh] overflow-auto scrollbar-thin", children: [
      /* @__PURE__ */ t.jsxs("div", { children: [
        /* @__PURE__ */ t.jsx("div", { className: "text-[10px] font-semibold tracking-wider text-[#b9b9b9] mb-2", children: "MARKET COLORS" }),
        /* @__PURE__ */ t.jsx("div", { className: "grid grid-cols-2 gap-2", children: ["teal_rose", "green_red"].map((M) => /* @__PURE__ */ t.jsxs(
          "button",
          {
            onClick: () => T({ marketColors: M }),
            className: `p-2.5 rounded-lg border text-left transition-colors ${o.marketColors === M ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
            children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[12px] font-medium", children: M === "teal_rose" ? "Teal / Rose" : "Green / Red" }),
              /* @__PURE__ */ t.jsx("div", { className: "text-[10px] opacity-60 mt-0.5", children: M === "teal_rose" ? "#21b3a4 / #f0426c" : "#26a69a / #ef5350" })
            ]
          },
          M
        )) })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { children: [
        /* @__PURE__ */ t.jsx("div", { className: "text-[10px] font-semibold tracking-wider text-[#b9b9b9] mb-2", children: "INTERFACE ACCENT" }),
        /* @__PURE__ */ t.jsx("div", { className: "grid grid-cols-4 gap-1.5", children: ["neutral", "mint", "indigo", "amber"].map((M) => /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: () => T({ accent: M }),
            className: `py-2 rounded-lg border text-[11px] font-medium capitalize transition-colors ${o.accent === M ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434]"}`,
            children: M
          },
          M
        )) })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { children: [
        /* @__PURE__ */ t.jsx("div", { className: "text-[10px] font-semibold tracking-wider text-[#b9b9b9] mb-2", children: "HEATMAP COLORMAP" }),
        /* @__PURE__ */ t.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#6a6a6a] mb-1.5", children: "Liquidation" }),
            /* @__PURE__ */ t.jsx("div", { className: "grid grid-cols-4 gap-1.5", children: ["ember", "inferno", "viridis", "magma"].map((M) => /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: () => T({ liqColormap: M }),
                className: `py-2 rounded-lg border text-[11px] font-medium capitalize transition-colors ${o.liqColormap === M ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434]"}`,
                children: M
              },
              M
            )) })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#6a6a6a] mb-1.5", children: "Orderbook" }),
            /* @__PURE__ */ t.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: ["orderbook", "deepdom", "bookmap"].map((M) => /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: () => T({ obColormap: M }),
                className: `py-2 rounded-lg border text-[10px] font-medium capitalize transition-colors ${o.obColormap === M ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434]"}`,
                children: M
              },
              M
            )) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[11px] text-[#b9b9b9]", children: [
            "Opacity ",
            /* @__PURE__ */ t.jsxs("span", { className: "text-[#e8e8e8] font-medium", children: [
              Math.round(o.opacity * 100),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 0.1, max: 1, step: 0.05, value: o.opacity, onChange: (M) => T({ opacity: parseFloat(M.target.value) }), className: "accent-[#e8e8e8]" })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[11px] text-[#b9b9b9]", children: [
            "Intensity ",
            /* @__PURE__ */ t.jsx("span", { className: "text-[#e8e8e8] font-medium", children: o.intensity.toFixed(2) })
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 0.1, max: 3, step: 0.1, value: o.intensity, onChange: (M) => T({ intensity: parseFloat(M.target.value) }), className: "accent-[#e8e8e8]" })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[11px] text-[#b9b9b9]", children: [
            "Gamma ",
            /* @__PURE__ */ t.jsx("span", { className: "text-[#e8e8e8] font-medium", children: o.gamma.toFixed(2) })
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 0.5, max: 2.5, step: 0.1, value: o.gamma, onChange: (M) => T({ gamma: parseFloat(M.target.value) }), className: "accent-[#e8e8e8]" })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[11px] text-[#b9b9b9]", children: [
            "Tick ×",
            /* @__PURE__ */ t.jsx("span", { className: "text-[#e8e8e8] font-medium", children: o.tickPerRow })
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 1, max: 8, step: 1, value: o.tickPerRow, onChange: (M) => T({ tickPerRow: parseInt(M.target.value) }), className: "accent-[#e8e8e8]" })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex gap-4 pt-2 border-t border-[#2a2a2a]", children: [
        /* @__PURE__ */ t.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
          /* @__PURE__ */ t.jsx("input", { type: "checkbox", checked: o.linearFilter, onChange: (M) => T({ linearFilter: M.target.checked }), className: "accent-[#e8e8e8]" }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[11px] text-[#b9b9b9]", children: "Smooth" })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
          /* @__PURE__ */ t.jsx("input", { type: "checkbox", checked: o.reachModulation, onChange: (M) => T({ reachModulation: M.target.checked }), className: "accent-[#e8e8e8]" }),
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
const Hr = gd;
function yd({ open: o, onClose: n, onSelect: d }) {
  const [T, M] = l.useState(""), [se, U] = l.useState(""), [Me, r] = l.useState([]);
  l.useEffect(() => {
    let re = !0;
    return o && (async () => {
      try {
        const ve = ["/api/orderflow/tickers?limit=770", "/api/symbols?limit=770", "/api/tickers"];
        for (const et of ve)
          try {
            const me = await fetch(et);
            if (me.ok) {
              const Fe = await me.json(), Ne = Fe.tickers || Fe.symbols || Fe.data || [];
              if (Ne.length) {
                const rt = Ne.slice(0, 770).map((q) => ({
                  symbol: q.symbol || q.pair || q.name,
                  base: q.base_asset || q.base || (q.symbol || "").split("USDT")[0] || q.symbol,
                  exchange: q.exchange || q.provider || "binancef",
                  price: q.last_price || q.price || 100 + Math.random() * 5e4,
                  change: q.change_pct_24h || q.change || (Math.random() - 0.5) * 10,
                  listed: !0
                }));
                if (re && rt.length) {
                  r(rt);
                  return;
                }
              }
            }
          } catch {
          }
      } catch {
      }
      if (!re) return;
      const lt = ["BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "DOGE", "AVAX", "DOT", "LINK", "LTC", "BCH", "UNI", "XLM", "ETC", "FIL", "TRX", "APT", "ARB", "OP", "MATIC", "ATOM", "NEAR", "FTM", "ALGO"], Be = ["binancef", "hl", "coinbase"], Ye = [];
      for (let ve = 0; ve < 770; ve++) {
        const et = lt[ve % lt.length], me = Be[ve % Be.length];
        Ye.push({ symbol: `${et}${me === "binancef" ? "USDT" : "-USD"}`, base: et, exchange: me, price: 100 + Math.random() * 5e4, change: (Math.random() - 0.5) * 10, listed: !0 });
      }
      r(Ye);
    })(), () => {
      re = !1;
    };
  }, [o]);
  const Ce = l.useMemo(() => Me.filter((re) => !(se && re.exchange !== se || T && !re.symbol.toLowerCase().includes(T.toLowerCase()) && !re.base.toLowerCase().includes(T.toLowerCase()))).slice(0, 200), [Me, T, se]);
  return o ? /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-[#1c1c1c] border border-[#3a3a3a] rounded-xl shadow-2xl w-[520px] max-h-[80vh] flex flex-col overflow-hidden", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "px-4 py-3 border-b border-[#2a2a2a] flex items-center gap-3 bg-[#222222]", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t.jsx("span", { className: "text-[12px] font-semibold tracking-wider text-[#e8e8e8]", children: "FIND SYMBOL" }),
        /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9]", children: [
          Me.length,
          " pairs"
        ] })
      ] }),
      /* @__PURE__ */ t.jsx("button", { onClick: n, className: "ml-auto w-7 h-7 flex items-center justify-center rounded-md bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] hover:text-[#e8e8e8] hover:bg-[#343434]", children: "×" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "p-3 flex gap-2 border-b border-[#2a2a2a] bg-[#1c1c1c]", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ t.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-[#6a6a6a] text-[12px]", children: "⌕" }),
        /* @__PURE__ */ t.jsx("input", { value: T, onChange: (re) => M(re.target.value), placeholder: "Search BTC, ETH, SOL...", className: "w-full pl-8 pr-3 py-2 rounded-lg bg-[#262626] border border-[#3a3a3a] text-[13px] text-[#e8e8e8] placeholder:text-[#6a6a6a] focus:border-[#4a4a4a] focus:outline-none", autoFocus: !0 })
      ] }),
      /* @__PURE__ */ t.jsxs("select", { value: se, onChange: (re) => U(re.target.value), className: "px-3 py-2 rounded-lg bg-[#262626] border border-[#3a3a3a] text-[12px] font-medium text-[#b9b9b9] focus:outline-none focus:border-[#4a4a4a]", children: [
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
      Ce.map((re) => /* @__PURE__ */ t.jsxs("button", { onClick: () => {
        d(re.symbol), n();
      }, className: "grid grid-cols-[1.5fr_1fr_0.8fr_0.8fr] w-full px-4 py-2.5 text-[13px] border-b border-[#2a2a2a]/50 hover:bg-[#262626] text-left transition-colors", children: [
        /* @__PURE__ */ t.jsx("span", { className: "font-mono font-medium text-[#e8e8e8]", children: re.symbol }),
        /* @__PURE__ */ t.jsx("span", { className: "font-mono tabular-nums text-[#b9b9b9]", children: re.price.toFixed(2) }),
        /* @__PURE__ */ t.jsxs("span", { className: `tabular-nums font-medium ${re.change >= 0 ? "text-[#21b3a4]" : "text-[#f0426c]"}`, children: [
          re.change >= 0 ? "+" : "",
          re.change.toFixed(2),
          "%"
        ] }),
        /* @__PURE__ */ t.jsx("span", { className: "text-[11px] px-1.5 py-0.5 rounded bg-[#262626] border border-[#3a3a3a] text-[#6a6a6a] w-fit", children: re.exchange })
      ] }, `${re.exchange}:${re.symbol}`)),
      Ce.length === 0 && /* @__PURE__ */ t.jsx("div", { className: "px-4 py-8 text-[13px] text-[#6a6a6a] text-center", children: "No matches found" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "px-4 py-2 text-[10px] text-[#6a6a6a] border-t border-[#2a2a2a] bg-[#222222]", children: [
      "Press Enter to select • ",
      Me.length,
      " symbols • Click any row"
    ] })
  ] }) }) : null;
}
const Vr = [
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
function kd({ onSelect: o }) {
  const [n, d] = l.useState(!1), T = l.useRef(null);
  return l.useEffect(() => {
    const M = (se) => {
      T.current && !T.current.contains(se.target) && d(!1);
    };
    return document.addEventListener("mousedown", M), () => document.removeEventListener("mousedown", M);
  }, []), /* @__PURE__ */ t.jsxs("div", { ref: T, className: "relative", children: [
    /* @__PURE__ */ t.jsxs("button", { onClick: () => d((M) => !M), className: "flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#3a3a3a] bg-[#262626] text-[12px] font-medium text-[#e8e8e8] hover:bg-[#343434] hover:border-[#4a4a4a] transition-colors", children: [
      /* @__PURE__ */ t.jsx("span", { className: "text-[14px]", children: "+" }),
      " Widget ",
      /* @__PURE__ */ t.jsx("span", { className: "text-[10px] opacity-50 ml-1", children: n ? "▲" : "▼" })
    ] }),
    n && /* @__PURE__ */ t.jsxs("div", { className: "absolute top-full left-0 mt-2 z-40 w-[280px] rounded-lg border border-[#3a3a3a] bg-[#1c1c1c] shadow-2xl overflow-hidden", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "px-3 py-2 border-b border-[#2a2a2a] bg-[#222222] flex items-center justify-between", children: [
        /* @__PURE__ */ t.jsx("span", { className: "text-[10px] font-semibold tracking-wider text-[#b9b9b9]", children: "ADD WIDGET" }),
        /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] px-1.5 py-0.5 rounded bg-[#2a2a2a] border border-[#3a3a3a] text-[#6a6a6a]", children: [
          Vr.length,
          " items"
        ] })
      ] }),
      /* @__PURE__ */ t.jsx("div", { className: "p-2 grid gap-1 max-h-[380px] overflow-auto", children: Vr.map((M) => /* @__PURE__ */ t.jsxs("button", { onClick: () => {
        o(M.id), d(!1);
      }, className: "flex items-center gap-3 px-3 py-2.5 rounded-md bg-[#262626] border border-transparent text-left hover:bg-[#343434] hover:border-[#3a3a3a] hover:text-[#e8e8e8] text-[#b9b9b9] transition-colors", children: [
        /* @__PURE__ */ t.jsx("span", { className: "text-[16px] w-6 text-center opacity-80", children: M.icon }),
        /* @__PURE__ */ t.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ t.jsx("div", { className: "text-[12px] font-medium text-[#e8e8e8]", children: M.label }),
          /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#6a6a6a] mt-0.5 leading-tight", children: M.desc })
        ] })
      ] }, M.id)) })
    ] })
  ] });
}
const tl = [
  { id: "chart", label: "Chart", desc: "Candles + indicators", icon: "◧" },
  { id: "edgedepth", label: "Heatmap Pro", desc: "GPU heatmap 8192×1024", icon: "◫" },
  { id: "depth", label: "Depth Heat", desc: "Legacy depth heatmap", icon: "▤" },
  { id: "dom", label: "DOM Ladder", desc: "Depth ladder with delta", icon: "☰" },
  { id: "tape", label: "Tape", desc: "Time & sales", icon: "≡" },
  { id: "footprint", label: "Footprint", desc: "Cluster & profile", icon: "▦" },
  { id: "vpvr", label: "VPVR", desc: "Volume profile POC/VAH/VAL", icon: "◨" },
  { id: "tpo", label: "TPO", desc: "Time price opportunity", icon: "◰" },
  { id: "liquidations", label: "Liquidations", desc: "Liquidation heatmap", icon: "⚡" },
  { id: "watchlist", label: "Watchlist", desc: "1503 pairs live", icon: "☆" },
  { id: "indicators", label: "Indicators", desc: "8 indicators panel", icon: "◩" }
];
function wd({
  value: o,
  onChange: n
}) {
  const [d, T] = l.useState(!1), M = l.useRef(null);
  l.useEffect(() => {
    const U = (Me) => {
      M.current && !M.current.contains(Me.target) && T(!1);
    };
    return document.addEventListener("mousedown", U), () => document.removeEventListener("mousedown", U);
  }, []);
  const se = tl.find((U) => U.id === o) || tl[0];
  return /* @__PURE__ */ t.jsxs("div", { ref: M, className: "relative", children: [
    /* @__PURE__ */ t.jsxs(
      "button",
      {
        onClick: () => T((U) => !U),
        className: "flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#3a3a3a] bg-[#262626] text-[12px] font-medium text-[#e8e8e8] hover:bg-[#343434] hover:border-[#4a4a4a] transition-colors",
        children: [
          /* @__PURE__ */ t.jsx("span", { className: "text-[11px] opacity-70", children: se.icon }),
          /* @__PURE__ */ t.jsx("span", { children: se.label }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[10px] opacity-50 ml-1", children: d ? "▲" : "▼" })
        ]
      }
    ),
    d && /* @__PURE__ */ t.jsxs("div", { className: "absolute top-full left-0 mt-2 z-[70] w-[280px] rounded-xl border border-[#3a3a3a] bg-[#1c1c1c] shadow-2xl overflow-hidden", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "px-3 py-2 border-b border-[#2a2a2a] bg-[#222222] flex items-center justify-between", children: [
        /* @__PURE__ */ t.jsx("span", { className: "text-[10px] font-semibold tracking-wider text-[#b9b9b9]", children: "VIEW" }),
        /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] px-1.5 py-0.5 rounded bg-[#262626] border border-[#3a3a3a] text-[#6a6a6a]", children: [
          tl.length,
          " panes"
        ] })
      ] }),
      /* @__PURE__ */ t.jsx("div", { className: "p-2 grid gap-1 max-h-[380px] overflow-auto", children: tl.map((U) => /* @__PURE__ */ t.jsxs(
        "button",
        {
          onClick: () => {
            n(U.id), T(!1);
          },
          className: `flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${o === U.id ? "bg-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border border-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8] hover:border-[#3a3a3a]"}`,
          children: [
            /* @__PURE__ */ t.jsx("span", { className: "text-[14px] w-5 text-center opacity-80", children: U.icon }),
            /* @__PURE__ */ t.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[12px] font-medium leading-tight", children: U.label }),
              /* @__PURE__ */ t.jsx("div", { className: `text-[10px] leading-tight mt-0.5 ${o === U.id ? "text-[#1c1c1c]/70" : "text-[#6a6a6a]"}`, children: U.desc })
            ] }),
            o === U.id && /* @__PURE__ */ t.jsx("span", { className: "text-[10px]", children: "●" })
          ]
        },
        U.id
      )) }),
      /* @__PURE__ */ t.jsx("div", { className: "px-3 py-2 border-t border-[#2a2a2a] bg-[#1c1c1c] text-[10px] text-[#6a6a6a]", children: "Own professional UI • no clone • functional" })
    ] })
  ] });
}
const pn = (() => {
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
})(), Vl = /* @__PURE__ */ new Set(), xo = () => Vl.forEach((o) => o()), nl = (o, n) => {
  try {
    localStorage.setItem(o, n);
  } catch {
  }
}, On = {
  get: () => pn,
  setLayout(o) {
    pn.layout = o, nl("lset-layout", o), xo();
  },
  setSync(o) {
    pn.sync = o, nl("lset-layout-sync", JSON.stringify(o)), xo();
  },
  setPanelSymbol(o, n) {
    pn.panelSymbols = [...pn.panelSymbols], pn.panelSymbols[o] = n, nl("lset-layout-symbols", JSON.stringify(pn.panelSymbols)), xo();
  },
  setPanelKind(o, n) {
    pn.panelKinds = [...pn.panelKinds], pn.panelKinds[o] = n, nl("lset-layout-kinds", JSON.stringify(pn.panelKinds)), xo();
  },
  setActivePanel(o) {
    pn.activePanel !== o && (pn.activePanel = o, xo());
  },
  subscribe(o) {
    return Vl.add(o), () => {
      Vl.delete(o);
    };
  }
};
function Zl() {
  const [, o] = l.useState(0);
  return l.useEffect(() => On.subscribe(() => o((n) => n + 1)), []), { ...pn };
}
const Sd = l.lazy(() => import("./chunks/depth-Cd6YmxgB.js").then((o) => o.E)), Cd = l.lazy(() => import("./chunks/EdgeDepthDOMPanel-B4fScATi.js")), Md = l.lazy(() => import("./chunks/EdgeDepthTapePanel-D8VGo-3N.js")), Td = l.lazy(() => import("./chunks/EdgeDepthFootprintPanel-DNBBYlR2.js")), Id = l.lazy(() => import("./chunks/EdgeDepthVolumeProfilePanel-B1KVIDpA.js")), Rd = l.lazy(() => import("./chunks/EdgeDepthTPOPanel-LE8PBLrF.js")), Pd = l.lazy(() => import("./chunks/EdgeDepthLiquidationPanel-DPB0-guo.js")), jd = l.lazy(() => import("./chunks/EdgeDepthWatchlist-Dw2Nss9z.js")), Nd = l.lazy(() => import("./chunks/EdgeDepthIndicators-CjDmUwSO.js")), Xr = () => /* @__PURE__ */ t.jsx("div", { className: "h-full w-full flex items-center justify-center text-[11px] text-[var(--dim)]", children: "Loading…" }), Yr = {
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
}, zr = ["1h", "4h", "1d", "15m", "5m", "1w", "30m", "1m"];
function Ld({
  symbol: o,
  sourceProvider: n,
  timeframe: d,
  colors: T,
  active: M,
  onActivate: se,
  kind: U,
  onToggleKind: Me,
  syncedCrosshairTime: r,
  onCrosshairMove: Ce,
  syncedViewportTime: re,
  onViewportTimeChange: ze,
  quote: lt
}) {
  const [Be, Ye] = l.useState([]), ve = rl();
  l.useEffect(() => {
    if (U !== "chart") return;
    let me = !1;
    Ye([]);
    const Fe = async () => {
      try {
        const rt = await Uu("multi_panel", { symbol: o, timeframe: d, limit: 500 });
        !me && rt?.length && Ye(rt.map((q) => ({
          time: Date.parse(q.timestamp),
          open: q.open,
          high: q.high,
          low: q.low,
          close: q.close,
          volume: q.volume
        })));
      } catch {
      }
    };
    Fe();
    const Ne = setInterval(Fe, 1e4);
    return () => {
      me = !0, clearInterval(Ne);
    };
  }, [o, d, U]);
  const et = () => {
    const me = U;
    return me === "depth" ? /* @__PURE__ */ t.jsx(ld, { symbol: o, sourceProvider: n, colors: T, syncedCrosshairTime: r, onCrosshairMove: Ce, onToggleKind: Me }) : me === "edgedepth" ? /* @__PURE__ */ t.jsx(l.Suspense, { fallback: /* @__PURE__ */ t.jsx(Xr, {}), children: /* @__PURE__ */ t.jsx(Sd, { symbol: o, provider: n || "binance", onToggleKind: Me }) }) : ["dom", "tape", "footprint", "vpvr", "tpo", "liquidations", "watchlist", "indicators", "ed_liquidations", "ed_vpvr", "ed_footprint", "ed_tpo"].includes(me) ? /* @__PURE__ */ t.jsxs(l.Suspense, { fallback: /* @__PURE__ */ t.jsx(Xr, {}), children: [
      me === "dom" && /* @__PURE__ */ t.jsx(Cd, { symbol: o, provider: n || "binance" }),
      me === "tape" && /* @__PURE__ */ t.jsx(Md, { symbol: o, provider: n || "binance" }),
      (me === "footprint" || me === "ed_footprint") && /* @__PURE__ */ t.jsx(Td, { symbol: o, provider: n || "binance" }),
      (me === "vpvr" || me === "ed_vpvr") && /* @__PURE__ */ t.jsx(Id, { symbol: o, provider: n || "binance" }),
      (me === "tpo" || me === "ed_tpo") && /* @__PURE__ */ t.jsx(Rd, { symbol: o, provider: n || "binance" }),
      (me === "liquidations" || me === "ed_liquidations") && /* @__PURE__ */ t.jsx(Pd, { symbol: o, provider: n || "binance" }),
      me === "watchlist" && /* @__PURE__ */ t.jsx(jd, { activeSymbol: o, onSelectSymbol: (Fe) => {
        try {
          window.__lseShell?.selectSymbol?.(Fe);
        } catch {
        }
      } }),
      me === "indicators" && /* @__PURE__ */ t.jsx(Nd, { symbol: o, provider: n || "binance" })
    ] }) : Be.length > 0 ? /* @__PURE__ */ t.jsx(
      Gl,
      {
        candles: Be,
        symbol: o,
        timeframe: d,
        chartType: "candlestick",
        livePrice: Be[Be.length - 1]?.close ?? null,
        rightOffset: 6,
        colors: T,
        indicators: qs,
        timezone: ve?.data?.timezone || "local",
        syncedCrosshairTime: r ?? void 0,
        onCrosshairMove: Ce,
        syncedViewportTime: re ?? void 0,
        onViewportTimeChange: ze,
        showBidAskSpread: !!lt,
        brokerBid: lt?.bid ?? null,
        brokerAsk: lt?.ask ?? null
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
        border: M ? "1px solid var(--accent-bar, #888)" : "1px solid var(--edge, #2a2e39)"
      },
      children: et()
    }
  );
}
function Ed({
  layout: o,
  syncSettings: n,
  pair: d,
  timeframe: T,
  colors: M,
  quote: se,
  sourceProvider: U
}) {
  const Me = Yr[o] || Yr["2x2"], { activePanel: r, panelSymbols: Ce, panelKinds: re } = Zl(), ze = Math.min(r, Me.count - 1), [lt, Be] = l.useState([]), [Ye, ve] = l.useState(null), [et, me] = l.useState(null), Fe = l.useMemo(() => M || al(), [M]);
  l.useEffect(() => {
    Be((q) => {
      const fe = [...q];
      for (let tt = fe.length; tt < Me.count; tt++)
        fe.push(tt === 0 ? T : zr[tt % zr.length]);
      return fe.slice(0, Me.count);
    });
  }, [Me.count, T]);
  const Ne = l.useCallback((q) => {
    n.syncCrosshair && ve(q);
  }, [n.syncCrosshair]), rt = l.useCallback((q) => {
    n.syncTime && me(q);
  }, [n.syncTime]);
  return /* @__PURE__ */ t.jsx("div", { style: {
    display: "grid",
    width: "100%",
    height: "100%",
    gap: 2,
    gridTemplateColumns: `repeat(${Me.cols}, 1fr)`,
    gridTemplateRows: `repeat(${Me.rows}, 1fr)`
  }, children: Array.from({ length: Me.count }, (q, fe) => /* @__PURE__ */ t.jsx(
    Ld,
    {
      symbol: n.syncSymbol ? d : Ce[fe] || d,
      sourceProvider: U,
      timeframe: n.syncInterval ? T : lt[fe] || T,
      colors: Fe,
      active: fe === ze,
      onActivate: () => On.setActivePanel(fe),
      kind: re[fe] || "chart",
      onToggleKind: () => {
        const tt = re[fe] || "chart", ue = ["chart", "edgedepth", "depth", "dom", "tape", "footprint", "vpvr", "tpo", "liquidations", "watchlist", "indicators"], kt = ue.indexOf(tt), at = ue[(kt + 1) % ue.length];
        On.setPanelKind(fe, at);
      },
      syncedCrosshairTime: n.syncCrosshair ? Ye : null,
      onCrosshairMove: Ne,
      syncedViewportTime: n.syncTime ? et : null,
      onViewportTimeChange: rt,
      quote: se
    },
    fe
  )) });
}
const ol = [
  "lse-drawing-favorites",
  // which drawing tools are favourited
  "lse-drawing-favorites-pos",
  // position of the floating favourites toolbar
  "chart-sidebar-width"
  // chart sidebar width
];
let Kr = !1, sl = null;
async function Ad() {
  const o = {};
  for (const n of ol) {
    const d = localStorage.getItem(n);
    d !== null && (o[n] = d);
  }
  try {
    await fetch("/api/workspace/tools", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(o)
    });
  } catch {
  }
}
function Ur() {
  sl && clearTimeout(sl), sl = setTimeout(() => {
    sl = null, Ad();
  }, 400);
}
async function ta() {
  if (Kr) return;
  Kr = !0;
  try {
    const d = await fetch("/api/workspace/tools");
    if (d.ok) {
      const M = (await d.json())?.value ?? {};
      for (const se of ol) {
        const U = M[se];
        typeof U == "string" && localStorage.setItem(se, U);
      }
    }
  } catch {
  }
  const o = localStorage.setItem.bind(localStorage), n = localStorage.removeItem.bind(localStorage);
  localStorage.setItem = (d, T) => {
    o(d, T), ol.includes(d) && Ur();
  }, localStorage.removeItem = (d) => {
    n(d), ol.includes(d) && Ur();
  };
}
const qr = ["#38bdf8", "#fbbf24", "#c084fc", "#34d399", "#fb7185", "#a3e635"];
function Bd(o, n) {
  if (!o || !n.length) return [];
  const d = /* @__PURE__ */ new Map();
  for (let se = 0; se < n.length; se++)
    d.set(Math.floor(n[se].time / 1e3), se);
  const T = [];
  let M = 0;
  for (const [se, U] of Object.entries(o))
    for (const [Me, r] of Object.entries(U.series || {})) {
      const Ce = new Array(n.length).fill(NaN);
      let re = 0;
      for (const [Be, Ye] of r.points || []) {
        const ve = d.get(Be);
        ve !== void 0 && (Ce[ve] = Ye, re++);
      }
      if (!re) continue;
      const lt = Object.keys(U.series).length > 1 ? `${se} ${Me}` : se;
      T.push({
        id: `local-${se}-${Me}`,
        name: lt,
        // The prefix is what tells ProChart's formula evaluator to leave this
        // series alone and draw the precomputed values.
        expression: `local:${se}:${Me}`,
        enabled: !0,
        display: U.overlay ? "overlay" : "subplot",
        color: qr[M++ % qr.length],
        lineWidth: 2,
        zeroLine: !1,
        data: Ce,
        kind: r.kind,
        // One pane per ENGINE INDICATOR, not per column: MACD's three series
        // must share a pane and a scale or the histogram is meaningless.
        group: se
      });
    }
  return T;
}
const Wd = l.lazy(() => import("./chunks/depth-Cd6YmxgB.js").then((o) => o.a)), Dd = l.lazy(() => import("./chunks/depth-Cd6YmxgB.js").then((o) => o.E)), Gr = l.lazy(() => import("./chunks/EdgeDepthDOMPanel-B4fScATi.js")), Fd = l.lazy(() => import("./chunks/EdgeDepthTapePanel-D8VGo-3N.js")), Od = l.lazy(() => import("./chunks/EdgeDepthWatchlist-Dw2Nss9z.js")), _d = l.lazy(() => import("./chunks/EdgeDepthIndicators-CjDmUwSO.js")), $d = l.lazy(() => import("./chunks/EdgeDepthLayers-B8T1v-xC.js")), Hd = l.lazy(() => import("./chunks/EdgeDepthLiquidationPanel-DPB0-guo.js")), Vd = l.lazy(() => import("./chunks/EdgeDepthVolumeProfilePanel-B1KVIDpA.js")), Xd = l.lazy(() => import("./chunks/EdgeDepthFootprintPanel-DNBBYlR2.js")), Yd = l.lazy(() => import("./chunks/EdgeDepthTPOPanel-LE8PBLrF.js")), zd = l.lazy(() => import("./chunks/backtest-CeqYlV1v.js").then((o) => o.bN)), Kd = l.lazy(() => import("./chunks/backtest-CeqYlV1v.js").then((o) => o.bO)), Ud = l.lazy(() => import("./chunks/econ-BeCAerYp.js")), qd = l.lazy(() => import("./chunks/dataviz-D6zeVYjn.js")), Gd = l.lazy(() => import("./chunks/quant-CYlcHa_2.js")), Zd = l.lazy(() => import("./chunks/notebooks-fOzYQotZ.js")), ss = () => /* @__PURE__ */ t.jsx("div", { className: "h-full w-full flex items-center justify-center text-[11px] text-[var(--dim)]", children: "Loading…" }), Jd = {
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
}, Cn = {
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
}, ys = (o) => {
  o.currentTarget.style.background = "var(--hover)";
}, ks = (o) => {
  o.currentTarget.style.background = "transparent";
};
function Qd({ provider: o, symbol: n, timeframe: d, candles: T, chartType: M = "candlestick", trades: se = [], engineIndicators: U, indicatorPatch: Me = null, quote: r = null, positions: Ce = [], onPositionModify: re, onPositionClose: ze, autoSelectPositionId: lt = null }) {
  l.useEffect(() => {
    const v = "lse-hide-shell-tf-style";
    if (!document.getElementById(v)) {
      const oe = document.createElement("style");
      oe.id = v, oe.textContent = `
        /* Hide LSE shell duplicate bars when EdgeDepth terminal active — professional single bar only */
        #timeframes { display: none !important; }
        #subrail { display: none !important; }
        #controls #chart-type, #controls #ind-open, #controls #panes-open, #controls #src-open,
        #controls #tpl-open, #controls #cs-open, #controls #sl-slot { display: none !important; }
        /* Also hide any Simple Moving Average pill that leaks from shell */
        #ind-active { display: none !important; }
      `, document.head.appendChild(oe);
    }
    try {
      const oe = document.getElementById("timeframes");
      oe && (oe.style.display = "none");
      const J = document.getElementById("subrail");
      J && (J.style.display = "none");
    } catch {
    }
  }, []);
  const Be = `${o}|${n}|${d}`, [Ye, ve] = l.useState(() => {
    try {
      const v = `${o}|${n}|${d}`, oe = localStorage.getItem(`lse-candles-${v}`);
      if (oe) {
        const J = JSON.parse(oe);
        if (Array.isArray(J) && J.length > 0)
          return { key: v, older: J.slice(-200), shift: 0 };
      }
    } catch {
    }
    return { key: Be, older: [], shift: 0 };
  });
  Ye.key !== Be && ve({ key: Be, older: [], shift: 0 });
  const et = l.useRef(null), me = l.useRef(!1), [Fe, Ne] = l.useState(!1), rt = l.useMemo(() => {
    if (!Ye.older.length || !T.length) {
      try {
        T.length > 0 && localStorage.setItem(`lse-candles-${Be}`, JSON.stringify(T.slice(-200)));
      } catch {
      }
      return T;
    }
    const v = T[0].time, oe = [...Ye.older.filter((J) => J.time < v), ...T];
    try {
      localStorage.setItem(`lse-candles-${Be}`, JSON.stringify(oe.slice(-200)));
    } catch {
    }
    return oe;
  }, [Ye.older, T, Be]), q = l.useCallback(async () => {
    if (me.current || et.current === Be) return;
    const oe = rt;
    if (!oe.length || oe.length >= 5e4) return;
    const J = Be, ge = oe[0].time;
    me.current = !0, Ne(!0);
    try {
      const jt = `/api/candles?provider=${encodeURIComponent(o)}&symbol=${encodeURIComponent(n)}&timeframe=${encodeURIComponent(d)}&limit=5000&end=${encodeURIComponent(new Date(ge).toISOString())}`, Ae = await fetch(jt);
      if (!Ae.ok) {
        let We = "";
        try {
          We = String((await Ae.json()).detail || "");
        } catch {
        }
        /no (history|prints|data)|served no|no real candles/i.test(We) && (et.current = J);
        return;
      }
      const Gt = ((await Ae.json()).candles || []).map(([We, Rt, hs, Qt, Ot, Vt]) => ({
        time: We < 1e12 ? We * 1e3 : We,
        open: Rt,
        high: hs,
        low: Qt,
        close: Ot,
        volume: Vt
      })).filter((We) => We.time < ge);
      if (!Gt.length) {
        et.current = J;
        return;
      }
      ve((We) => We.key !== J ? We : {
        key: J,
        older: [...Gt, ...We.older],
        shift: We.shift + Gt.length
      });
    } catch {
    } finally {
      me.current = !1, Ne(!1);
    }
  }, [rt, o, n, d, Be]), [fe, tt] = l.useState(null), [ue, kt] = l.useState(null), [at, Oe] = l.useState("cursor"), [Ut, qt] = l.useState(!1), [dt, It] = l.useState(!1), [an, Mn] = l.useState(null), [Wt, $t] = l.useState([]), [cn, Jt] = l.useState(qs), [mn, zn] = l.useState(!1), [Bs, So] = l.useState(!1), [Ss, os] = l.useState("candles"), [Cs, Ms] = l.useState(() => {
    try {
      const v = typeof d == "string" ? d : "1m", oe = Yn.find((J) => J.label.toLowerCase() === v.toLowerCase() || J.label === v);
      if (oe) return oe;
    } catch {
    }
    return Yn.find((v) => v.label === "1m") || Yn[5] || Yn[0];
  }), [Gs, Co] = l.useState(() => {
    try {
      const v = localStorage.getItem("ed_fav_tf");
      return new Set(v ? JSON.parse(v) : ["1m", "5m", "15m", "1h", "4h", "1D"]);
    } catch {
      return /* @__PURE__ */ new Set(["1m", "5m", "15m", "1h", "4h", "1D"]);
    }
  });
  l.useEffect(() => {
    try {
      const v = String(d || "1m"), oe = Yn.find((J) => J.label.toLowerCase() === v.toLowerCase() || J.label === v);
      if (oe && oe.label.toLowerCase() !== Cs.label.toLowerCase())
        Ms(oe);
      else if (!oe) {
        const J = v.match(/^(\d+)([smhdwM])$/i);
        if (J) {
          const ge = parseInt(J[1], 10), jt = J[2];
          let Ae = 0;
          const Ht = jt.toLowerCase();
          jt === "M" ? Ae = ge * 2592e6 : Ht === "s" ? Ae = ge * 1e3 : Ht === "m" ? Ae = ge * 6e4 : Ht === "h" ? Ae = ge * 36e5 : Ht === "d" ? Ae = ge * 864e5 : Ht === "w" && (Ae = ge * 6048e5), Ae > 0 && Ms({ label: v, ms: Ae, sec: Math.floor(Ae / 1e3) });
        } else v.toLowerCase() === "tick" && Ms({ label: "tick", ms: 0, sec: 0 });
      }
    } catch {
    }
  }, [d]);
  const [pt, Mo] = l.useState(() => {
    try {
      const v = localStorage.getItem("ed_appearance");
      if (v) return { ...Hr, ...JSON.parse(v) };
    } catch {
    }
    return Hr;
  }), [nt, Ws] = l.useState(!1);
  l.useEffect(() => {
    try {
      localStorage.setItem("ed_appearance", JSON.stringify(pt));
    } catch {
    }
  }, [pt]);
  const [Zs, Js] = l.useState(!1), [Qs, To] = l.useState(!0), [Ds, eo] = l.useState(!1), [Tn, xe] = l.useState(() => {
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
  }), to = l.useCallback((v) => {
    xe(v);
    try {
      localStorage.setItem("ed_layers", JSON.stringify(v));
    } catch {
    }
    const oe = (J) => v.find((ge) => ge.id === J)?.enabled;
    Jt((J) => {
      let ge = !1;
      const jt = { ...J };
      if (oe("vpvr") !== void 0) {
        const Ae = !!oe("vpvr");
        J.volumeProfile?.enabled !== Ae && (jt.volumeProfile = { ...J.volumeProfile, enabled: Ae, numberOfRows: 48, rowWidth: 15, opacity: 60 }, ge = !0);
      }
      if (oe("session_vwap") !== void 0) {
        const Ae = !!oe("session_vwap");
        J.vwap?.enabled !== Ae && (jt.vwap = { ...J.vwap, enabled: Ae, color: "#2196F3" }, ge = !0);
      }
      if (oe("prev_day") !== void 0 || oe("prev_week") !== void 0) {
        const Ae = !!oe("prev_day") || !!oe("prev_week");
        J.pivotPoints?.enabled !== Ae && (jt.pivotPoints = { ...J.pivotPoints, enabled: Ae }, ge = !0);
      }
      return ge ? jt : J;
    }), oe("liquidations");
  }, []), ce = l.useCallback(() => {
    window.dispatchEvent(new CustomEvent("lset:open-indicators"));
  }, []), Dt = l.useCallback((v) => ({
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
  })[v] ?? null, []), Ie = l.useCallback((v) => {
    Oe(v);
    const oe = Dt(v);
    kt(oe);
  }, [Dt]), In = l.useCallback((v) => {
    Co((oe) => {
      const J = new Set(oe);
      if (J.has(v)) J.delete(v);
      else {
        if (J.size >= 6) {
          const ge = J.values().next().value;
          ge && J.delete(ge);
        }
        J.add(v);
      }
      try {
        localStorage.setItem("ed_fav_tf", JSON.stringify([...J]));
      } catch {
      }
      return J;
    });
  }, []), Ft = l.useMemo(() => ({
    candles: "candlestick",
    fp_cluster: "footprint_cluster",
    fp_profile: "footprint_profile",
    heikin_ashi: "heikin_ashi",
    line: "line",
    tpo: "tpo",
    renko: "renko",
    flow_positioning: "flow_positioning"
  })[Ss] || "candlestick", [Ss]), [xn, Ee] = l.useState(null), [wt, vt] = l.useState(!1), [yt, _n] = l.useState(!1), [Kn, un] = l.useState(""), [ls, Un] = l.useState(null), [no, rs] = l.useState(""), [, Xt] = l.useState(0), [Et, qn] = l.useState(null), [Rn, $n] = l.useState(""), [Gn, Fs] = l.useState(""), [ft, Zn] = l.useState(""), [as, Io] = l.useState(!1), Pn = l.useRef(null), so = async () => {
    const v = Kn.trim();
    if (!v) {
      rs("name the template first");
      return;
    }
    await window.__lseShell?.saveLayout?.(v) ? (_n(!1), rs(""), Xt((J) => J + 1)) : rs("could not save this template");
  };
  l.useEffect(() => {
    if (!xn) return;
    const v = () => {
      Ee(null), vt(!1), _n(!1), Un(null), rs(""), qn(null), Zn("");
    }, oe = (J) => {
      J.key === "Escape" && v();
    };
    return document.addEventListener("click", v), document.addEventListener("keydown", oe), () => {
      document.removeEventListener("click", v), document.removeEventListener("keydown", oe);
    };
  }, [xn]);
  const jn = Zl(), Ts = jn.layout, Hn = jn.sync, [sn, Nn] = l.useState(!1), [is, Ct] = l.useState("appearance"), bn = l.useRef(sn);
  bn.current = sn;
  const Is = l.useRef(is);
  Is.current = is, l.useEffect(() => (Xl = (v) => {
    if (!bn.current) {
      Ct(v || "appearance"), Nn(!0);
      return;
    }
    if (v && v !== Is.current) {
      Ct(v);
      return;
    }
    Nn(!1);
  }, () => {
    Xl = null;
  }), []), l.useEffect(() => {
    if (!sn) return;
    const v = (oe) => {
      oe.key === "Escape" && Nn(!1);
    };
    return document.addEventListener("keydown", v), () => document.removeEventListener("keydown", v);
  }, [sn]);
  const Rs = l.useRef(null), [gn, Ln] = l.useState(null);
  l.useEffect(() => {
    sn || Ln(null);
  }, [sn]);
  const cs = l.useCallback((v) => {
    if (v.target.closest("button")) return;
    const oe = Rs.current, J = oe?.offsetParent;
    if (!J || !oe) return;
    const ge = J.getBoundingClientRect(), jt = oe.getBoundingClientRect(), Ae = v.clientX - jt.left, Ht = v.clientY - jt.top;
    v.preventDefault();
    const Gt = (Rt) => {
      Ln({
        x: Math.max(0, Math.min(Rt.clientX - ge.left - Ae, ge.width - jt.width)),
        y: Math.max(0, Math.min(Rt.clientY - ge.top - Ht, ge.height - 36))
      });
    }, We = () => {
      window.removeEventListener("pointermove", Gt), window.removeEventListener("pointerup", We);
    };
    window.addEventListener("pointermove", Gt), window.addEventListener("pointerup", We);
  }, []), [vn, Ro] = l.useState({
    color: "#e6e8ea",
    strokeWidth: 2,
    lineStyle: "solid",
    opacity: 100
  });
  l.useEffect(() => {
    let v = !0;
    return (async () => {
      const oe = await mo.getTools();
      v && oe?.drawingDefaults && Ro((J) => ({ ...J, ...oe.drawingDefaults }));
    })(), () => {
      v = !1;
    };
  }, []);
  const Po = l.useRef(null), jo = l.useRef(0), il = l.useRef(() => {
  }), No = l.useRef([]);
  l.useEffect(() => {
    Kl({ provider: o, symbol: n });
  }, [o, n]);
  const Tt = `${o}:${n}`, At = l.useRef(null);
  l.useEffect(() => {
    let v = !0;
    return At.current = null, (async () => {
      const [oe, J] = await Promise.all([
        mo.getDrawings(Tt),
        mo.getIndicators(Tt)
      ]);
      v && ($t(oe), Jt(J ?? qs), Mn(null), At.current = Tt);
    })(), () => {
      v = !1;
    };
  }, [Tt]);
  const En = l.useCallback((v) => {
    $t(v), At.current === Tt && mo.setDrawings(Tt, v);
  }, [Tt]), oo = l.useCallback((v) => {
    Jt(v), At.current === Tt && mo.setIndicators(Tt, v);
  }, [Tt]);
  l.useEffect(() => {
    Me && Jt((v) => ({ ...v, ...Me }));
  }, [Me]);
  const xt = l.useCallback(() => {
    En([]), Mn(null);
  }, [En]);
  l.useCallback((v) => {
    En(Wt.filter((oe) => oe.id !== v)), Mn(null);
  }, [Wt, En]);
  const An = l.useMemo(() => {
    const v = Bd(U, rt);
    return v.length ? { ...cn, customIndicators: v } : cn;
  }, [cn, U, rt]), us = rl(), ds = Gu(), Os = l.useMemo(() => {
    const v = al(), oe = us?.candles, J = us?.chart;
    let ge;
    return !ds || !oe || !J ? ge = { ...v } : ge = {
      ...v,
      background: J.backgroundColor,
      backgroundOpacity: J.backgroundOpacity,
      grid: J.gridColor,
      gridOpacity: J.gridOpacity,
      axisLabel: J.axisLabelColor,
      axisLine: J.axisLineColor,
      crosshair: J.crosshairColor,
      priceTickerBullish: J.priceTickerBullish,
      priceTickerBearish: J.priceTickerBearish,
      bullish: oe.bodyBullish,
      bearish: oe.bodyBearish,
      bullishBorder: oe.bordersBullish,
      bearishBorder: oe.bordersBearish,
      bullishWick: oe.wickBullish,
      bearishWick: oe.wickBearish
    }, pt.marketColors === "teal_rose" ? (ge.bullish = "#21b3a4", ge.bearish = "#f0426c", ge.bullishBorder = "#21b3a4", ge.bearishBorder = "#f0426c", ge.bullishWick = "#21b3a4", ge.bearishWick = "#f0426c", ge.priceTickerBullish = "#21b3a4", ge.priceTickerBearish = "#f0426c") : pt.marketColors === "green_red" && (ge.bullish = "#26a69a", ge.bearish = "#ef5350", ge.bullishBorder = "#26a69a", ge.bearishBorder = "#ef5350", ge.bullishWick = "#26a69a", ge.bearishWick = "#ef5350", ge.priceTickerBullish = "#26a69a", ge.priceTickerBearish = "#ef5350"), pt.accent === "mint" ? ge.grid = "#21b3a4" : pt.accent === "indigo" ? ge.grid = "#6366f1" : pt.accent === "amber" && (ge.grid = "#f59e0b"), pt.opacity !== void 0 && (ge.backgroundOpacity = Math.round(pt.opacity * 100)), ge;
  }, [us, ds, pt]), _s = us?.data?.timezone || "local", Bn = Jd[d] ?? 36e5, yn = T.length ? T[T.length - 1].close : null, [Vn, kn] = l.useState("");
  l.useEffect(() => {
    const v = () => {
      if (d === "tick") {
        kn("");
        return;
      }
      if (!n || !Qr(n)) {
        kn("");
        return;
      }
      const J = Date.now(), ge = Math.ceil(J / Bn) * Bn, jt = Math.max(0, ge - J), Ae = Math.floor(jt / 1e3), Ht = Math.floor(Ae / 60) % 60, Gt = Math.floor(Ae / 3600), We = (Rt) => String(Rt).padStart(2, "0");
      kn(Gt > 0 ? `${Gt}:${We(Ht)}:${We(Ae % 60)}` : `${Ht}:${We(Ae % 60)}`);
    };
    v();
    const oe = setInterval(v, 1e3);
    return () => clearInterval(oe);
  }, [n, Bn, d]), l.useMemo(
    () => Object.values(cn || {}).filter((v) => v && v.enabled).length,
    [cn]
  );
  const cl = l.useMemo(
    () => [
      ...se.map((v, oe) => ({
        id: `trade-${oe}`,
        price: v.price,
        side: v.side,
        quantity: v.quantity ?? 0,
        symbol: n,
        pnl: v.pnl
      })),
      ...Ce.map((v) => ({ ...v, symbol: n }))
    ],
    [se, Ce, n]
  );
  return n ? /* @__PURE__ */ t.jsxs("div", { className: "relative h-full w-full flex flex-col bg-[#1c1c1c]", style: { overflow: "visible" }, children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-3 px-3 h-[44px] border-b border-[#2a2a2a] bg-[#1c1c1c] text-[12px] shrink-0 overflow-visible relative z-[60]", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t.jsx("span", { className: "font-bold tracking-wider text-[#e8e8e8] text-[11px]", children: "LSE" }),
          /* @__PURE__ */ t.jsx("span", { className: "font-mono font-semibold text-[#e8e8e8] text-[13px]", children: n }),
          /* @__PURE__ */ t.jsxs("span", { className: "hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[10px] text-[#b9b9b9]", children: [
            /* @__PURE__ */ t.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#21b3a4] animate-pulse" }),
            o.toUpperCase(),
            " • ",
            d
          ] })
        ] }),
        /* @__PURE__ */ t.jsx("div", { className: "flex items-center gap-0.5 p-0.5 rounded-lg bg-[#262626] border border-[#3a3a3a]", children: ["binance", "coinbase", "hyperliquid"].map((v) => {
          const oe = o === v, J = v === "hyperliquid" ? "HL" : v === "binance" ? "BIN" : "CB", ge = v === "hyperliquid" ? "15ms" : v === "binance" ? "20ms" : "50ms";
          return /* @__PURE__ */ t.jsxs(
            "button",
            {
              onClick: () => {
                try {
                  window.__lseShell?.setProvider?.(v);
                } catch {
                }
              },
              className: `px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-colors ${oe ? "bg-[#e8e8e8] text-[#1c1c1c] shadow-sm" : "bg-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
              title: `${v} ${ge} ultra-fast — auto load immediate`,
              children: [
                J,
                " ",
                /* @__PURE__ */ t.jsxs("span", { className: `text-[9px] ${oe ? "text-[#1c1c1c]/60" : "text-[#6a6a6a]"}`, children: [
                  ge,
                  v === "hyperliquid" ? " ⚡" : ""
                ] })
              ]
            },
            v
          );
        }) })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2 shrink-0", style: { overflow: "visible" }, children: [
        /* @__PURE__ */ t.jsx("div", { style: { overflow: "visible", position: "relative", zIndex: 50 }, children: /* @__PURE__ */ t.jsx(bd, { value: Cs, onChange: (v) => {
          Ms(v);
          try {
            window.__lseShell?.setTimeframe?.(v.label);
          } catch {
          }
        }, favs: Gs, onToggleFav: In }) }),
        /* @__PURE__ */ t.jsx(xd, { value: Ss, onChange: os }),
        /* @__PURE__ */ t.jsx(wd, { value: jn.panelKinds[0] || "chart", onChange: (v) => On.setPanelKind(0, v) })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "ml-auto flex items-center gap-1.5 shrink-0", children: [
        /* @__PURE__ */ t.jsx(kd, { onSelect: (v) => On.setPanelKind(0, v) }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => eo((v) => !v), className: `px-3 py-1.5 rounded-md border text-[12px] font-medium transition-colors ${Ds ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`, children: "Layers" }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => Js(!0), className: "px-3 py-1.5 rounded-md border border-[#3a3a3a] bg-[#262626] text-[12px] font-medium text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]", children: "Find" }),
        /* @__PURE__ */ t.jsx("div", { className: "w-px h-5 bg-[#2a2a2a] mx-1" }),
        /* @__PURE__ */ t.jsxs("button", { onClick: () => To((v) => !v), className: `px-2.5 py-1 rounded-full border text-[10px] font-medium flex items-center gap-1.5 transition-colors ${Qs ? "bg-[#21b3a4]/10 border-[#21b3a4]/30 text-[#21b3a4]" : "bg-[#262626] border-[#3a3a3a] text-[#6a6a6a] hover:text-[#b9b9b9]"}`, title: "Real-time follow", children: [
          /* @__PURE__ */ t.jsx("span", { className: `w-1.5 h-1.5 rounded-full ${Qs ? "bg-[#21b3a4] animate-pulse" : "bg-[#6a6a6a]"}` }),
          " ",
          Qs ? "LIVE" : "PAUSED"
        ] }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => Ws((v) => !v), className: `w-8 h-8 rounded-md border flex items-center justify-center transition-colors ${nt ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`, children: "⚙" }),
        /* @__PURE__ */ t.jsx("button", { onClick: ce, className: "px-3 py-1.5 rounded-md bg-[#e8e8e8] text-[#1c1c1c] text-[12px] font-semibold hover:bg-white transition-colors", children: "Indicators" })
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "relative flex-1 min-h-0 w-full flex", children: [
      /* @__PURE__ */ t.jsx(
        md,
        {
          activeTool: at,
          onToolSelect: Ie,
          magnet: dt,
          onToggleMagnet: () => It((v) => !v),
          hiddenAll: Bs,
          onToggleHidden: () => So((v) => !v),
          onClearAll: xt,
          collapsed: Ut,
          onToggleCollapsed: () => qt((v) => !v)
        }
      ),
      /* @__PURE__ */ t.jsx(
        "div",
        {
          ref: Pn,
          className: "relative flex-1 min-w-0",
          style: as ? { transform: "scaleY(-1)" } : void 0,
          onContextMenu: (v) => {
            v.preventDefault(), vt(!1), qn(null), Zn("");
            let oe = null;
            if (Ts === "1x1" && fe && Pn.current) {
              const ge = Pn.current.getBoundingClientRect(), jt = as ? ge.height - (v.clientY - ge.top) : v.clientY - ge.top, Ae = fe.yToPrice(jt);
              Number.isFinite(Ae) && Ae > 0 && (oe = Ae);
            }
            const J = window.__lseShell?.tradeInfo?.() || null;
            Ee({
              x: Math.min(v.clientX, window.innerWidth - 240),
              y: Math.min(v.clientY, window.innerHeight - (J?.available ? 360 : 230)),
              price: oe,
              ref: yn,
              trade: J
            });
          },
          children: Ts !== "1x1" ? /* @__PURE__ */ t.jsx(
            Ed,
            {
              layout: Ts,
              syncSettings: Hn,
              pair: n,
              timeframe: d,
              colors: Os,
              quote: r,
              sourceProvider: o
            }
          ) : jn.panelKinds[0] === "depth" ? /* @__PURE__ */ t.jsx(l.Suspense, { fallback: /* @__PURE__ */ t.jsx(ss, {}), children: /* @__PURE__ */ t.jsx(
            Wd,
            {
              symbol: n,
              sourceProvider: o,
              colors: Os,
              onToggleKind: () => On.setPanelKind(0, "chart")
            }
          ) }) : jn.panelKinds[0] === "edgedepth" ? /* @__PURE__ */ t.jsx(l.Suspense, { fallback: /* @__PURE__ */ t.jsx(ss, {}), children: /* @__PURE__ */ t.jsx(
            Dd,
            {
              symbol: n,
              provider: o,
              embedded: !0,
              onToggleKind: () => On.setPanelKind(0, "chart"),
              liqColormap: pt.liqColormap,
              obColormap: pt.obColormap,
              opacity: pt.opacity,
              intensity: pt.intensity,
              gamma: pt.gamma,
              noiseFloor: pt.noiseFloor,
              tickPerRow: pt.tickPerRow,
              halfLife: pt.halfLife
            }
          ) }) : ["orderflow", "dom", "tape", "footprint", "vpvr", "tpo", "cvd", "liquidations", "ed_liquidations", "ed_vpvr", "ed_footprint", "ed_tpo", "watchlist", "indicators"].includes(jn.panelKinds[0]) ? /* @__PURE__ */ t.jsx(l.Suspense, { fallback: /* @__PURE__ */ t.jsx(ss, {}), children: (() => {
            const v = jn.panelKinds[0];
            return v === "dom" ? /* @__PURE__ */ t.jsx(Gr, { symbol: n, provider: o }) : v === "tape" ? /* @__PURE__ */ t.jsx(Fd, { symbol: n, provider: o }) : v === "footprint" ? /* @__PURE__ */ t.jsx(Xd, { symbol: n, provider: o }) : v === "vpvr" ? /* @__PURE__ */ t.jsx(Vd, { symbol: n, provider: o }) : v === "tpo" ? /* @__PURE__ */ t.jsx(Yd, { symbol: n, provider: o }) : v === "liquidations" ? /* @__PURE__ */ t.jsx(Hd, { symbol: n, provider: o, colormap: pt.liqColormap, intensity: pt.intensity, opacity: pt.opacity, gamma: pt.gamma, noiseFloor: pt.noiseFloor, tickPerRow: pt.tickPerRow, halfLife: pt.halfLife, lowPeak: pt.lowPeak }) : v === "watchlist" ? /* @__PURE__ */ t.jsx(Od, { activeSymbol: n, onSelectSymbol: (oe) => {
              try {
                window.__lseShell?.selectSymbol?.(oe);
              } catch {
              }
            } }) : v === "indicators" ? /* @__PURE__ */ t.jsx(_d, { symbol: n, provider: o }) : /* @__PURE__ */ t.jsx(Gr, { symbol: n, provider: o });
          })() }) : /* @__PURE__ */ t.jsx(t.Fragment, { children: /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
            /* @__PURE__ */ t.jsx(
              Gl,
              {
                candles: rt,
                symbol: n,
                timeframe: d,
                chartType: Ft,
                onLoadMore: q,
                isLoadingMore: Fe,
                prependShift: Ye.shift,
                livePrice: yn,
                countdown: Vn,
                timezone: _s,
                rightOffset: 6,
                colors: Os,
                indicators: An,
                onIndicatorsChange: oo,
                onRemoveEngineIndicator: (v) => window.__lseShell?.removeIndicator?.(v),
                onEditEngineIndicator: (v) => {
                  window.__lseShell?.editIndicator?.(v) || ce();
                },
                drawings: Wt,
                selectedDrawingId: an,
                drawingCursorRef: No,
                requestRedrawRef: Po,
                scrollOffsetRef: jo,
                onScrollSync: () => il.current?.(),
                onConverterReady: tt,
                onOpenSettings: ce,
                positionLines: cl,
                onPositionModify: re,
                onPositionClose: ze,
                autoSelectPositionId: lt,
                showBidAskSpread: !!r,
                brokerBid: r?.bid ?? null,
                brokerAsk: r?.ask ?? null
              },
              Be
            ),
            /* @__PURE__ */ t.jsx(
              Zu,
              {
                activeTool: ue,
                onToolSelect: kt,
                drawings: Wt,
                onDrawingsChange: En,
                selectedDrawingId: an,
                onSelectDrawing: Mn,
                converter: fe,
                scrollSyncRef: il,
                scrollOffsetRef: jo,
                drawingCursorRef: No,
                requestRedrawRef: Po,
                toolSettings: vn,
                isLocked: mn,
                isHidden: Bs,
                currentSymbol: n,
                timeframeMs: Bn,
                currentPrice: yn ?? void 0,
                candles: T
              }
            )
          ] }) })
        }
      ),
      sn && /* @__PURE__ */ t.jsxs(
        "div",
        {
          ref: Rs,
          className: "absolute z-[95] w-80",
          style: {
            ...gn ? { left: gn.x, top: gn.y } : { top: 8, right: 8 },
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
                      onClick: () => Nn(!1),
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
                  onClick: () => Ct("appearance"),
                  className: "flex-1 px-3 py-1.5 text-xs font-medium transition-colors",
                  style: is === "appearance" ? { color: "var(--text)", background: "var(--active)" } : { color: "var(--dim)" },
                  children: "Appearance"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: () => Ct("chart"),
                  className: "flex-1 px-3 py-1.5 text-xs font-medium transition-colors",
                  style: is === "chart" ? { color: "var(--text)", background: "var(--active)" } : { color: "var(--dim)" },
                  children: "Chart"
                }
              )
            ] }),
            /* @__PURE__ */ t.jsx("div", { className: "max-h-[70vh] overflow-y-auto", children: is === "appearance" ? /* @__PURE__ */ t.jsx(Ju, { hideHeader: !0, onBack: () => Nn(!1) }) : /* @__PURE__ */ t.jsx(Qu, { hideHeader: !0, onBack: () => Nn(!1) }) }),
            /* @__PURE__ */ t.jsx(
              "div",
              {
                className: "flex justify-end px-3 py-2",
                style: { borderTop: "1px solid var(--edge)" },
                children: /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    onClick: () => Nn(!1),
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
      nt && /* @__PURE__ */ t.jsx("div", { className: "absolute top-10 right-2 z-[90]", children: /* @__PURE__ */ t.jsx(vd, { settings: pt, onChange: Mo, onClose: () => Ws(!1) }) }),
      Ds && /* @__PURE__ */ t.jsx("div", { className: "absolute top-10 left-[320px] z-[90]", children: /* @__PURE__ */ t.jsx(l.Suspense, { fallback: /* @__PURE__ */ t.jsx("div", { className: "p-2 text-[10px] text-[#b9b9b9]", children: "Loading layers..." }), children: /* @__PURE__ */ t.jsx($d, { layers: Tn, onChange: to }) }) }),
      /* @__PURE__ */ t.jsx(yd, { open: Zs, onClose: () => Js(!1), onSelect: (v) => {
        try {
          window.__lseShell?.selectSymbol?.(v);
        } catch {
        }
      } }),
      xn && /* @__PURE__ */ t.jsxs(
        "div",
        {
          className: "fixed z-[110]",
          style: {
            left: xn.x,
            top: xn.y,
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
            xn.trade?.available && (() => {
              const v = xn.trade, oe = (We) => window.__lseShell?.fmtPrice?.(We) ?? String(We), J = (We) => We === "limit" ? "Limit" : "Stop";
              if (Et) {
                const We = {
                  flex: 1,
                  minWidth: 0,
                  padding: "3px 6px",
                  fontSize: 12,
                  color: "var(--text)",
                  background: "var(--bg2)",
                  border: "1px solid var(--edge)",
                  borderRadius: 2
                }, Rt = {
                  width: 38,
                  fontSize: 11,
                  color: "var(--dim)",
                  flexShrink: 0
                }, hs = () => {
                  const Ot = parseFloat(Rn), Vt = parseFloat(Gn);
                  if (!(Ot > 0)) {
                    Zn("enter a price");
                    return;
                  }
                  if (!(Vt > 0)) {
                    Zn("enter a size");
                    return;
                  }
                  window.__lseShell?.quickOrder?.(Et.side, Et.otype, Ot, Vt), Ee(null), qn(null);
                }, Qt = (Ot) => {
                  Ot.stopPropagation(), Ot.key === "Enter" && hs(), Ot.key === "Escape" && (qn(null), Zn(""));
                };
                return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                  /* @__PURE__ */ t.jsxs("div", { style: { ...Cn, cursor: "default", fontWeight: 600 }, children: [
                    Et.side === "buy" ? "Buy" : "Sell",
                    " ",
                    J(Et.otype),
                    " · ",
                    v.symbol
                  ] }),
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      style: { display: "flex", gap: 6, alignItems: "center", margin: "2px 10px 4px" },
                      onClick: (Ot) => Ot.stopPropagation(),
                      children: [
                        /* @__PURE__ */ t.jsx("span", { style: Rt, children: "Price" }),
                        /* @__PURE__ */ t.jsx(
                          "input",
                          {
                            autoFocus: !0,
                            value: Rn,
                            spellCheck: !1,
                            inputMode: "decimal",
                            style: We,
                            onChange: (Ot) => $n(Ot.target.value),
                            onKeyDown: Qt
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      style: { display: "flex", gap: 6, alignItems: "center", margin: "0 10px 4px" },
                      onClick: (Ot) => Ot.stopPropagation(),
                      children: [
                        /* @__PURE__ */ t.jsx("span", { style: Rt, children: "Units" }),
                        /* @__PURE__ */ t.jsx(
                          "input",
                          {
                            value: Gn,
                            spellCheck: !1,
                            inputMode: "decimal",
                            style: We,
                            onChange: (Ot) => Fs(Ot.target.value),
                            onKeyDown: Qt
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      style: { display: "flex", gap: 4, margin: "0 10px 2px", justifyContent: "flex-end" },
                      onClick: (Ot) => Ot.stopPropagation(),
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
                              qn(null), Zn("");
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
                            onClick: hs,
                            children: "Place"
                          }
                        )
                      ]
                    }
                  ),
                  ft && /* @__PURE__ */ t.jsx("div", { style: { ...Cn, color: "#e05d5d", cursor: "default" }, children: ft }),
                  /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: "1px solid var(--edge)" } })
                ] });
              }
              const ge = v.qty != null ? `${v.qty} ` : "", jt = [
                { label: `Buy ${ge}${v.symbol} at market`, side: "buy", otype: "market" },
                { label: `Sell ${ge}${v.symbol} at market`, side: "sell", otype: "market" }
              ], Ae = xn.price, Ht = xn.ref, Gt = v.pendingTypes || [];
              if (Ae != null && Ht != null && Ae !== Ht && Gt.length) {
                const We = Ae < Ht ? [{ side: "buy", otype: "limit" }, { side: "sell", otype: "stop" }] : [{ side: "sell", otype: "limit" }, { side: "buy", otype: "stop" }];
                for (const Rt of We)
                  Gt.includes(Rt.otype) && jt.push({ ...Rt, label: `${Rt.side === "buy" ? "Buy" : "Sell"} ${J(Rt.otype)} @ ${oe(Ae)}…` });
              }
              return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                jt.map((We) => /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    className: "w-full text-left",
                    style: Cn,
                    onMouseEnter: ys,
                    onMouseLeave: ks,
                    onClick: (Rt) => {
                      if (We.otype === "market") {
                        window.__lseShell?.quickOrder?.(We.side, We.otype, xn.price), Ee(null);
                        return;
                      }
                      Rt.stopPropagation(), qn({ side: We.side, otype: We.otype }), $n(Ae != null ? String(+Ae.toFixed(Ae >= 1e3 ? 2 : Ae >= 100 ? 3 : Ae >= 1 ? 4 : 6)) : ""), Fs(v.qty != null ? String(v.qty) : ""), Zn("");
                    },
                    children: We.label
                  },
                  `${We.side}-${We.otype}`
                )),
                /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: "1px solid var(--edge)" } })
              ] });
            })(),
            /* @__PURE__ */ t.jsxs(
              "button",
              {
                className: "w-full text-left",
                style: { ...Cn, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 },
                onMouseEnter: ys,
                onMouseLeave: ks,
                onClick: () => vt((v) => !v),
                children: [
                  /* @__PURE__ */ t.jsx("span", { children: "Chart template" }),
                  /* @__PURE__ */ t.jsx("span", { style: { color: "var(--dim)" }, children: wt ? "▾" : "▸" })
                ]
              }
            ),
            wt && /* @__PURE__ */ t.jsxs("div", { className: "max-h-48 overflow-y-auto", style: { borderTop: "1px solid var(--edge)", borderBottom: "1px solid var(--edge)", margin: "3px 0" }, children: [
              (window.__lseShell?.layouts?.() || []).length === 0 ? /* @__PURE__ */ t.jsx("div", { style: { ...Cn, color: "var(--dim)" }, children: "No saved templates yet" }) : window.__lseShell.layouts().map((v) => /* @__PURE__ */ t.jsxs(
                "div",
                {
                  style: { ...Cn, display: "flex", alignItems: "center", gap: 8, paddingLeft: 20, cursor: "pointer" },
                  onMouseEnter: ys,
                  onMouseLeave: ks,
                  onClick: () => {
                    window.__lseShell?.applyLayout?.(v.id), Ee(null);
                  },
                  children: [
                    /* @__PURE__ */ t.jsx("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: v.name }),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        title: ls === v.id ? "Click again to delete" : "Delete template",
                        style: {
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          fontSize: ls === v.id ? 11 : 13,
                          lineHeight: 1,
                          padding: "0 2px",
                          color: ls === v.id ? "#e05d5d" : "var(--dim)"
                        },
                        onClick: async (oe) => {
                          if (oe.stopPropagation(), ls !== v.id) {
                            Un(v.id);
                            return;
                          }
                          await window.__lseShell?.deleteLayout?.(v.id), Un(null), Xt((J) => J + 1);
                        },
                        children: ls === v.id ? "sure?" : "×"
                      }
                    )
                  ]
                },
                v.id
              )),
              yt ? /* @__PURE__ */ t.jsxs(
                "div",
                {
                  style: { display: "flex", gap: 4, margin: "3px 12px 5px", alignItems: "center" },
                  onClick: (v) => v.stopPropagation(),
                  children: [
                    /* @__PURE__ */ t.jsx(
                      "input",
                      {
                        autoFocus: !0,
                        value: Kn,
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
                        onChange: (v) => un(v.target.value),
                        onKeyDown: async (v) => {
                          if (v.stopPropagation(), v.key === "Escape") {
                            _n(!1);
                            return;
                          }
                          v.key === "Enter" && await so();
                        }
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        disabled: !Kn.trim(),
                        title: Kn.trim() ? "Save this chart as a template" : "Name the template first",
                        style: {
                          padding: "3px 10px",
                          fontSize: 12,
                          lineHeight: 1.5,
                          borderRadius: 2,
                          border: "1px solid var(--edge)",
                          background: "var(--active)",
                          color: "var(--text)",
                          cursor: Kn.trim() ? "pointer" : "default",
                          opacity: Kn.trim() ? 1 : 0.5
                        },
                        onClick: so,
                        children: "Save"
                      }
                    )
                  ]
                }
              ) : /* @__PURE__ */ t.jsx(
                "button",
                {
                  className: "w-full text-left",
                  style: { ...Cn, paddingLeft: 20, color: "var(--dim)" },
                  onMouseEnter: ys,
                  onMouseLeave: ks,
                  onClick: (v) => {
                    v.stopPropagation(), un(window.__lseShell?.layoutDefaultName?.() || ""), rs(""), _n(!0);
                  },
                  children: "+ Save current as template…"
                }
              ),
              no && /* @__PURE__ */ t.jsx("div", { style: { ...Cn, paddingLeft: 20, color: "#e05d5d" }, children: no })
            ] }),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "w-full text-left",
                style: Cn,
                onMouseEnter: ys,
                onMouseLeave: ks,
                onClick: () => {
                  Pn.current?.querySelector('button[title="Reset view"]')?.click(), Ee(null);
                },
                children: "Reset chart view"
              }
            ),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "w-full text-left",
                style: Cn,
                onMouseEnter: ys,
                onMouseLeave: ks,
                onClick: () => {
                  Io((v) => !v), Ee(null);
                },
                children: as ? "Unflip chart" : "Flip chart"
              }
            ),
            Wt.length > 0 && /* @__PURE__ */ t.jsxs(
              "button",
              {
                className: "w-full text-left",
                style: Cn,
                onMouseEnter: ys,
                onMouseLeave: ks,
                onClick: () => {
                  xt(), Ee(null);
                },
                children: [
                  "Remove drawings (",
                  Wt.length,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: "1px solid var(--edge)" } }),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "w-full text-left",
                style: Cn,
                onMouseEnter: ys,
                onMouseLeave: ks,
                onClick: () => {
                  Ct("appearance"), Nn(!0), Ee(null);
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
function eh({ symbol: o, timeframe: n, candles: d, quote: T }) {
  const M = rl(), se = l.useMemo(() => al(), []);
  return !o || !d.length ? /* @__PURE__ */ t.jsx("div", { className: "h-full w-full" }) : /* @__PURE__ */ t.jsx(
    Gl,
    {
      candles: d,
      symbol: o,
      timeframe: n,
      chartType: "candlestick",
      livePrice: d[d.length - 1]?.close ?? null,
      rightOffset: 6,
      colors: se,
      indicators: qs,
      timezone: M?.data?.timezone || "local",
      showBidAskSpread: !!T,
      brokerBid: T?.bid ?? null,
      brokerAsk: T?.ask ?? null
    }
  );
}
const As = /* @__PURE__ */ new Map();
function Zr(o) {
  const n = As.get(o);
  n && n.root.render(
    /* @__PURE__ */ t.jsx(ql, { children: /* @__PURE__ */ t.jsx(Ul, { children: /* @__PURE__ */ t.jsx(eh, { ...n.props }) }) })
  );
}
const th = {
  mount(o, n = {}) {
    As.has(o) || As.set(o, { root: ws(o), props: {} });
    const d = As.get(o);
    d.props = { ...d.props, ...ll(n) }, Zr(o);
  },
  update(o, n) {
    const d = As.get(o);
    d && (d.props = { ...d.props, ...ll(n) }, Zr(o));
  },
  unmount(o) {
    const n = As.get(o);
    n && (n.root.unmount(), As.delete(o));
  }
};
function nh() {
  const o = Zl();
  return /* @__PURE__ */ t.jsx(
    ed,
    {
      selectedLayout: o.layout,
      onLayoutChange: (n) => On.setLayout(n),
      syncSettings: o.sync,
      onSyncSettingsChange: (n) => On.setSync(n),
      isMultiPanelActive: o.layout !== "1x1",
      onExitMultiPanel: () => On.setLayout("1x1")
    }
  );
}
let Us = null, Xl = null, Yl = null, wo = {
  provider: "demo",
  symbol: "",
  timeframe: "1h",
  candles: [],
  chartType: "candlestick",
  trades: [],
  engineIndicators: void 0
};
function Hl() {
  Us && Us.render(
    /* @__PURE__ */ t.jsx(ql, { children: /* @__PURE__ */ t.jsx(Ul, { children: /* @__PURE__ */ t.jsx(Qd, { ...wo, indicatorPatch: Yl }) }) })
  );
}
const sh = {
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
}, Jr = 1e12;
function ll(o) {
  const n = { ...o };
  return o.chartType && (n.chartType = sh[o.chartType] ?? "candlestick"), "symbol" in o && !o.symbol && (n.symbol = ""), o.candles?.length && o.candles[0].time < Jr && (n.candles = o.candles.map((d) => ({ ...d, time: d.time * 1e3 }))), o.trades?.length && o.trades[0].time < Jr && (n.trades = o.trades.map((d) => ({ ...d, time: d.time * 1e3 }))), n;
}
const Jl = {
  async mount(o, n = {}) {
    wo = { ...wo, ...ll(n) }, Us || (Us = ws(o)), await ta(), Hl();
  },
  update(o) {
    wo = { ...wo, ...ll(o) }, Hl();
  },
  unmount() {
    Us?.unmount(), Us = null;
  },
  openAppearance(o) {
    Xl?.(o);
  },
  invalidateWorkspaceSection(o) {
    qu(o);
  },
  setIndicators(o) {
    Yl = { ...Yl || {}, ...o }, Hl();
  },
  indicatorKeys() {
    return Object.keys(qs);
  },
  indicatorDefaults() {
    return JSON.parse(JSON.stringify(qs));
  }
}, oh = new td(), zl = { inReplay: !1 };
function lh({ onExit: o }) {
  const [n, d] = l.useState(!0), T = ea();
  l.useEffect(() => {
    d(!0);
  }, [T.key]);
  const M = (se) => {
    d(se), se || setTimeout(() => {
      zl.inReplay || o();
    }, 150);
  };
  return /* @__PURE__ */ t.jsx("div", { className: "h-full w-full bg-[#0b0d12]", children: /* @__PURE__ */ t.jsx(l.Suspense, { fallback: /* @__PURE__ */ t.jsx(ss, {}), children: /* @__PURE__ */ t.jsx(Kd, { open: n, onOpenChange: M }) }) });
}
function rh({ provider: o }) {
  const [n] = od(), d = ea(), T = n.get("sym"), M = d.pathname.split("/").pop() || "", se = n.get("provider") || o;
  return Kl({ provider: se, symbol: T || M }), l.useEffect(() => (zl.inReplay = !0, () => {
    zl.inReplay = !1;
  }), []), /* @__PURE__ */ t.jsx(l.Suspense, { fallback: /* @__PURE__ */ t.jsx(ss, {}), children: /* @__PURE__ */ t.jsx(zd, {}) });
}
let bo = null;
const ah = {
  async mount(o, n = {}) {
    const d = n.provider || "demo", T = n.onExit || (() => {
    });
    bo || (bo = ws(o)), Kl({ provider: d, symbol: "" }), await ta(), bo.render(
      /* @__PURE__ */ t.jsx(nd, { client: oh, children: /* @__PURE__ */ t.jsx(ql, { initialEntries: ["/"], children: /* @__PURE__ */ t.jsxs(Ul, { children: [
        /* @__PURE__ */ t.jsxs(sd, { children: [
          /* @__PURE__ */ t.jsx(Or, { path: "/backtest/:pair", element: /* @__PURE__ */ t.jsx(rh, { provider: d }) }),
          /* @__PURE__ */ t.jsx(Or, { path: "*", element: /* @__PURE__ */ t.jsx(lh, { onExit: T }) })
        ] }),
        /* @__PURE__ */ t.jsx(rd, { theme: "dark", position: "bottom-right" })
      ] }) }) })
    );
  },
  unmount() {
    bo?.unmount(), bo = null;
  }
};
let go = null;
const ih = {
  mount(o, n = {}) {
    go || (go = ws(o)), go.render(
      /* @__PURE__ */ t.jsx(l.Suspense, { fallback: /* @__PURE__ */ t.jsx(ss, {}), children: /* @__PURE__ */ t.jsx(Ud, { onBack: n.onBack, initialView: n.view }) })
    );
  },
  unmount() {
    go?.unmount(), go = null;
  }
};
let vo = null;
const ch = {
  mount(o) {
    vo || (vo = ws(o)), vo.render(
      /* @__PURE__ */ t.jsx(l.Suspense, { fallback: /* @__PURE__ */ t.jsx(ss, {}), children: /* @__PURE__ */ t.jsx(qd, {}) })
    );
  },
  unmount() {
    vo?.unmount(), vo = null;
  }
};
let yo = null;
const uh = {
  mount(o) {
    yo || (yo = ws(o)), yo.render(
      /* @__PURE__ */ t.jsx(l.Suspense, { fallback: /* @__PURE__ */ t.jsx(ss, {}), children: /* @__PURE__ */ t.jsx(Gd, {}) })
    );
  },
  unmount() {
    yo?.unmount(), yo = null;
  }
};
let ko = null;
const dh = {
  mount(o) {
    ko || (ko = ws(o)), ko.render(
      /* @__PURE__ */ t.jsx(l.Suspense, { fallback: /* @__PURE__ */ t.jsx(ss, {}), children: /* @__PURE__ */ t.jsx(Zd, {}) })
    );
  },
  unmount() {
    ko?.unmount(), ko = null;
  }
};
Jl.mountLayoutButton = (o) => {
  ws(o).render(/* @__PURE__ */ t.jsx(nh, {}));
};
Jl.layoutStore = On;
window.LSEChart = Jl;
window.LSEChartPanes = th;
window.LSEManualBacktest = ah;
window.LSEEconCalendar = ih;
window.LSEDataViz = ch;
window.LSEQuantModels = uh;
window.LSENotebooks = dh;
export {
  Jl as default
};
