import { r as l, i as Br, j as t, g as Ii, q as Cs } from "./chunks/react-vendor-C0yw3i6b.js";
import { n as Wr, o as Dr, p as Ri, q as Pi, r as ji, s as Ni, t as Li, u as Ei, v as Ai, w as Bi, x as Wi, y as Di, z as Fi, A as _i, C as Oi, D as $i, E as Hi, F as Vi, G as Xi, H as Yi, J as zi, K as Ki, M as Ui, N as qi, O as Gi, Q as Zi, R as Ji, U as Qi, V as ec, W as tc, X as nc, Y as sc, Z as oc, _ as lc, $ as rc, a0 as ac, a1 as ic, a2 as cc, a3 as uc, a4 as dc, a5 as hc, a6 as fc, a7 as pc, a8 as mc, a9 as xc, aa as bc, ab as gc, ac as vc, ad as yc, ae as kc, af as wc, ag as Sc, ah as Cc, ai as Mc, aj as Tc, ak as Ic, al as Rc, am as Pc, an as jc, ao as Nc, ap as Lc, aq as Ec, ar as Ac, as as Bc, at as Wc, au as Dc, av as Fc, aw as _c, ax as Oc, ay as $c, az as Hc, aA as Vc, aB as Xc, aC as Yc, aD as zc, aE as Kc, aF as Uc, aG as qc, aH as Gc, aI as Zc, aJ as Jc, aK as Qc, aL as eu, aM as tu, aN as nu, aO as su, aP as ou, aQ as lu, aR as ru, aS as au, aT as iu, aU as cu, aV as uu, aW as du, aX as hu, aY as fu, aZ as pu, a_ as mu, a$ as xu, b0 as bu, b1 as gu, b2 as vu, b3 as yu, b4 as ku, b5 as Qe, b6 as wu, b7 as Su, b8 as rl, b9 as al, ba as Cu, bb as Mu, bc as Tu, bd as Iu, be as Ru, bf as Pu, bg as ju, bh as Nu, bi as Ol, bj as Lu, bk as Eu, bl as Au, bm as Bu, bn as Wu, g as Du, bo as Fu, bp as _u, bq as Ou, br as Fr, bs as Ko, bt as $u, bu as Qr, bv as Hu, bw as Vu, bx as Xu, by as Uo, bz as Yu, bA as zu, bB as Ku, bC as Uu, bD as qs, bE as qu, bF as Kl, bG as Ul, bH as mo, bI as Gu, bJ as Zu, bK as Ju, bL as Qu, bM as ed } from "./chunks/backtest-CeqYlV1v.js";
import { au as qo, av as Go, m as Zo, aw as Jo } from "./chunks/ui-DZwdMnFY.js";
import { Q as td, d as nd, M as ql, R as sd, e as _r, c as od, a as ea } from "./chunks/router-query-iQy8iLKR.js";
import { D as ld } from "./chunks/depth-CvS64Irn.js";
import { $ as rd } from "./chunks/ui-heavy-BL_8guwx.js";
function Or(o, n) {
  const { closes: d, highs: I, lows: T, opens: se, volumes: U, timestamps: Pe } = o;
  let r = null;
  return n.movingAverages?.enabled && n.movingAverages.lines?.length > 0 && (r = n.movingAverages.lines.map((re) => {
    let Ge;
    switch (re.type) {
      case "SMA":
        Ge = Ri(d, re.period);
        break;
      case "SMMA":
        Ge = Dr(d, re.period);
        break;
      case "EMA":
      default:
        Ge = Wr(d, re.period);
        break;
    }
    return { data: Ge, color: re.color, name: `${re.type} ${re.period}` };
  })), {
    rsi: n.rsi?.enabled ? ku(d, n.rsi.period) : null,
    macd: n.macd?.enabled ? yu(d, n.macd.fast, n.macd.slow, n.macd.signal) : null,
    ema: n.ema?.enabled ? n.ema.periods.map((re) => Wr(d, re)) : null,
    bollinger: n.bollinger?.enabled ? vu(d, n.bollinger.period, n.bollinger.stdDev) : null,
    movingAverages: r,
    atr: n.atr?.enabled ? gu(I, T, d, n.atr.period) : null,
    stochastic: n.stochastic?.enabled ? bu(I, T, d, n.stochastic.kPeriod, n.stochastic.dPeriod, n.stochastic.smooth) : null,
    williamsR: n.williamsR?.enabled ? xu(I, T, d, n.williamsR.period) : null,
    cci: n.cci?.enabled ? mu(I, T, d, n.cci.period) : null,
    adx: n.adx?.enabled ? pu(I, T, d, n.adx.period) : null,
    roc: n.roc?.enabled ? fu(d, n.roc.period) : null,
    vwap: n.vwap?.enabled ? hu(I, T, d, U, Pe) : null,
    ichimoku: n.ichimoku?.enabled ? du(I, T, d, n.ichimoku.tenkanPeriod, n.ichimoku.kijunPeriod, n.ichimoku.senkouBPeriod, n.ichimoku.displacement) : null,
    parabolicSAR: n.parabolicSAR?.enabled ? uu(I, T, n.parabolicSAR.afStart, n.parabolicSAR.afStep, n.parabolicSAR.afMax) : null,
    keltner: n.keltner?.enabled ? cu(I, T, d, n.keltner.emaPeriod, n.keltner.atrPeriod, n.keltner.multiplier) : null,
    pivotPoints: n.pivotPoints?.enabled ? iu(Pe, I, T, d) : null,
    supertrend: n.supertrend?.enabled ? au(I, T, d, n.supertrend.period, n.supertrend.multiplier) : null,
    donchian: n.donchian?.enabled ? ru(I, T, n.donchian.period) : null,
    aroon: n.aroon?.enabled ? lu(I, T, n.aroon.period) : null,
    envelopes: n.envelopes?.enabled ? ou(d, n.envelopes.period, n.envelopes.percent) : null,
    dema: n.dema?.enabled ? su(d, n.dema.period) : null,
    tema: n.tema?.enabled ? nu(d, n.tema.period) : null,
    hma: n.hma?.enabled ? tu(d, n.hma.period) : null,
    momentum: n.momentum?.enabled ? eu(d, n.momentum.period) : null,
    awesomeOsc: n.awesomeOsc?.enabled ? Qc(I, T) : null,
    mfi: n.mfi?.enabled ? Jc(I, T, d, U, n.mfi.period) : null,
    tsi: n.tsi?.enabled ? Zc(d, n.tsi.longPeriod, n.tsi.shortPeriod, n.tsi.signalPeriod) : null,
    trix: n.trix?.enabled ? Gc(d, n.trix.period, n.trix.signalPeriod) : null,
    ultimateOsc: n.ultimateOsc?.enabled ? qc(I, T, d, n.ultimateOsc.fast, n.ultimateOsc.med, n.ultimateOsc.slow) : null,
    dpo: n.dpo?.enabled ? Uc(d, n.dpo.period) : null,
    kst: n.kst?.enabled ? Kc(d, n.kst.roc1, n.kst.roc2, n.kst.roc3, n.kst.roc4, n.kst.sma1, n.kst.sma2, n.kst.sma3, n.kst.sma4, n.kst.signalPeriod) : null,
    stochRsi: n.stochRsi?.enabled ? zc(d, n.stochRsi.rsiPeriod, n.stochRsi.kPeriod, n.stochRsi.dPeriod) : null,
    bbPercent: n.bbPercent?.enabled ? Yc(d, n.bbPercent.period, n.bbPercent.stdDev) : null,
    bbWidth: n.bbWidth?.enabled ? Xc(d, n.bbWidth.period, n.bbWidth.stdDev) : null,
    histVol: n.histVol?.enabled ? Vc(d, n.histVol.period) : null,
    chaikinVol: n.chaikinVol?.enabled ? Hc(I, T, n.chaikinVol.emaPeriod, n.chaikinVol.rocPeriod) : null,
    stdDev: n.stdDev?.enabled ? $c(d, n.stdDev.period) : null,
    obv: n.obv?.enabled ? Oc(d, U) : null,
    cmf: n.cmf?.enabled ? _c(I, T, d, U, n.cmf.period) : null,
    adl: n.adl?.enabled ? Fc(I, T, d, U) : null,
    forceIndex: n.forceIndex?.enabled ? Dc(d, U, n.forceIndex.period) : null,
    eom: n.eom?.enabled ? Wc(I, T, U, n.eom.period) : null,
    volumeSma: n.volumeSma?.enabled ? Bc(U, n.volumeSma.period) : null,
    fibRetracement: n.fibRetracement?.enabled ? Ac(I, T, n.fibRetracement.lookback) : null,
    camarillaPivots: n.camarillaPivots?.enabled ? Ec(Pe, I, T, d) : null,
    woodiePivots: n.woodiePivots?.enabled ? Lc(Pe, I, T, d) : null,
    correlation: n.correlation?.enabled ? Nc(d, U, n.correlation.period) : null,
    linearReg: n.linearReg?.enabled ? jc(d, n.linearReg.period, n.linearReg.deviations) : null,
    coppock: n.coppock?.enabled ? Pc(d, n.coppock.longROC, n.coppock.shortROC, n.coppock.wmaPeriod) : null,
    alma: n.alma?.enabled ? Rc(d, n.alma.period, n.alma.offset, n.alma.sigma) : null,
    kama: n.kama?.enabled ? Ic(d, n.kama.period, n.kama.fastPeriod, n.kama.slowPeriod) : null,
    zlema: n.zlema?.enabled ? Tc(d, n.zlema.period) : null,
    t3: n.t3?.enabled ? Mc(d, n.t3.period, n.t3.vFactor) : null,
    lsma: n.lsma?.enabled ? Cc(d, n.lsma.period) : null,
    mcginley: n.mcginley?.enabled ? Sc(d, n.mcginley.period) : null,
    vortex: n.vortex?.enabled ? wc(I, T, d, n.vortex.period) : null,
    choppiness: n.choppiness?.enabled ? kc(I, T, d, n.choppiness.period) : null,
    elderRay: n.elderRay?.enabled ? yc(I, T, d, n.elderRay.period) : null,
    massIndex: n.massIndex?.enabled ? vc(I, T, n.massIndex.period) : null,
    chandeKroll: n.chandeKroll?.enabled ? gc(I, T, d, n.chandeKroll.p, n.chandeKroll.q, n.chandeKroll.x) : null,
    chandelierExit: n.chandelierExit?.enabled ? bc(I, T, d, n.chandelierExit.period, n.chandelierExit.multiplier) : null,
    linRegSlope: n.linRegSlope?.enabled ? xc(d, n.linRegSlope.period) : null,
    priceChannel: n.priceChannel?.enabled ? mc(I, T, n.priceChannel.period) : null,
    alligator: n.alligator?.enabled ? pc(d) : null,
    accBands: n.accBands?.enabled ? fc(I, T, d, n.accBands.period) : null,
    ppo: n.ppo?.enabled ? hc(d, n.ppo.fast, n.ppo.slow, n.ppo.signal) : null,
    pvo: n.pvo?.enabled ? dc(U, n.pvo.fast, n.pvo.slow, n.pvo.signal) : null,
    cmo: n.cmo?.enabled ? uc(d, n.cmo.period) : null,
    fisher: n.fisher?.enabled ? cc(I, T, n.fisher.period) : null,
    stc: n.stc?.enabled ? ic(d, n.stc.fast, n.stc.slow, n.stc.cycle) : null,
    rviOsc: n.rviOsc?.enabled ? ac(se, I, T, d, n.rviOsc.period) : null,
    klinger: n.klinger?.enabled ? rc(I, T, d, U, n.klinger.fast, n.klinger.slow, n.klinger.signal) : null,
    connorsRsi: n.connorsRsi?.enabled ? lc(d, n.connorsRsi.rsiPeriod, n.connorsRsi.streakPeriod, n.connorsRsi.rankPeriod) : null,
    apo: n.apo?.enabled ? oc(d, n.apo.fast, n.apo.slow) : null,
    qstick: n.qstick?.enabled ? sc(se, d, n.qstick.period) : null,
    bop: n.bop?.enabled ? nc(se, I, T, d, n.bop.period) : null,
    psychLine: n.psychLine?.enabled ? tc(d, n.psychLine.period) : null,
    pfe: n.pfe?.enabled ? ec(d, n.pfe.period, n.pfe.smoothing) : null,
    smi: n.smi?.enabled ? Qi(I, T, d, n.smi.period, n.smi.smoothK, n.smi.smoothD) : null,
    ulcerIndex: n.ulcerIndex?.enabled ? Ji(d, n.ulcerIndex.period) : null,
    natr: n.natr?.enabled ? Zi(I, T, d, n.natr.period) : null,
    trueRange: n.trueRange?.enabled ? Gi(I, T, d) : null,
    squeeze: n.squeeze?.enabled ? qi(I, T, d, n.squeeze.bbPeriod, n.squeeze.bbMult, n.squeeze.kcPeriod, n.squeeze.kcMult) : null,
    relVolIndex: n.relVolIndex?.enabled ? Ui(d, n.relVolIndex.period, n.relVolIndex.smoothing) : null,
    vhf: n.vhf?.enabled ? Ki(d, n.vhf.period) : null,
    vwma: n.vwma?.enabled ? zi(d, U, n.vwma.period) : null,
    volumeOsc: n.volumeOsc?.enabled ? Yi(U, n.volumeOsc.fast, n.volumeOsc.slow) : null,
    nvi: n.nvi?.enabled ? Xi(d, U) : null,
    pvi: n.pvi?.enabled ? Vi(d, U) : null,
    pvt: n.pvt?.enabled ? Hi(d, U) : null,
    vroc: n.vroc?.enabled ? $i(U, n.vroc.period) : null,
    netVolume: n.netVolume?.enabled ? Oi(d, U, n.netVolume.period) : null,
    twiggsMF: n.twiggsMF?.enabled ? _i(I, T, d, U, n.twiggsMF.period) : null,
    linRegRSquared: n.linRegRSquared?.enabled ? Fi(d, n.linRegRSquared.period) : null,
    medianPrice: n.medianPrice?.enabled ? Di(I, T) : null,
    typicalPrice: n.typicalPrice?.enabled ? Wi(I, T, d) : null,
    weightedClose: n.weightedClose?.enabled ? Bi(I, T, d) : null,
    demarkPivots: n.demarkPivots?.enabled ? Ai(Pe, I, T, se, d) : null,
    zigzag: n.zigzag?.enabled ? Ei(I, T, d, n.zigzag.deviation) : null,
    fractals: n.fractals?.enabled ? Li(I, T) : null,
    gator: n.gator?.enabled ? Ni(d) : null,
    smmaOverlay: n.smmaOverlay?.enabled ? Dr(d, n.smmaOverlay.period) : null,
    wma: n.wma?.enabled ? ji(d, n.wma.period) : null,
    customIndicators: (n.customIndicators || []).filter((re) => re.enabled).map((re) => {
      if (typeof re.expression == "string" && (re.expression.startsWith("brue:") || re.expression.startsWith("local:")) && Array.isArray(re.data) && re.data.length > 0)
        return re;
      const Ge = { closes: d, highs: I, lows: T, opens: se, volumes: U, timestamps: Pe }, rt = Pi(re.expression, Ge);
      return { ...re, data: rt.errors.length === 0 ? rt.data : new Array(d.length).fill(NaN) };
    })
  };
}
function ad(o, n) {
  if (n <= 0) return o;
  const d = new Array(n).fill(NaN), I = {};
  for (const T of Object.keys(o)) {
    const se = o[T];
    if (se == null) {
      I[T] = se;
      continue;
    }
    if (Array.isArray(se)) {
      se.length > 0 && typeof se[0] == "object" && se[0] !== null && "data" in se[0] ? I[T] = se.map((U) => ({ ...U, data: d.concat(U.data || []) })) : I[T] = d.concat(se);
      continue;
    }
    if (typeof se == "object") {
      const U = {};
      for (const Pe of Object.keys(se)) {
        const r = se[Pe];
        if (Array.isArray(r)) U[Pe] = d.concat(r);
        else if (typeof r == "object" && r !== null) {
          const Me = {};
          for (const re of Object.keys(r)) {
            const Ge = r[re];
            Me[re] = Array.isArray(Ge) ? d.concat(Ge) : Ge;
          }
          U[Pe] = Me;
        } else U[Pe] = r;
      }
      I[T] = U;
      continue;
    }
    I[T] = se;
  }
  return I;
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
  const [I, T] = l.useState(null), [se, U] = l.useState(!1), [Pe, r] = l.useState(null), Me = l.useRef(null), re = l.useRef(null), Ge = l.useRef(0), rt = l.useRef(null), Fe = l.useCallback((Ue) => {
    const { id: ve, result: nt, error: me, durationMs: Oe } = Ue.data;
    if (!(rt.current !== null && ve !== rt.current)) {
      if (rt.current = null, U(!1), me) {
        console.warn("[indicatorWorker] error", me);
        return;
      }
      Oe !== void 0 && r(Oe), o.length > 0 && (Ge.current = o[0].close), re.current = nt, T(nt);
    }
  }, [o]);
  return l.useEffect(() => {
    const Ue = $r();
    return Ue.addEventListener("message", Fe), () => Ue.removeEventListener("message", Fe);
  }, [Fe]), l.useEffect(() => {
    if (!n || o.length === 0) {
      T(null);
      return;
    }
    const Ue = o.length > 0 ? o[0].close : 0;
    if (d.current && re.current && Ge.current === Ue)
      return;
    const ve = Me.current;
    let nt, me, Oe, Ie, at, q, fe = null;
    const st = ve && ve.candles !== o && o.length >= ve.closes.length && o.length > 0 && ve.closes.length > 0 && o[0].time === ve.timestamps[0] && ve.closes.length > 10;
    let ce = 0;
    const kt = !st && ve && ve.candles !== o && o.length > ve.closes.length && ve.closes.length > 10 && o.length - ve.closes.length > 0 && o[o.length - ve.closes.length]?.time === ve.timestamps[0];
    if (kt && (ce = o.length - ve.closes.length), st) {
      const dt = ve.closes.length, Tt = Math.max(0, dt - 1);
      nt = ve.closes, me = ve.highs, Oe = ve.lows, Ie = ve.opens, at = ve.volumes, q = ve.timestamps, nt.length = Tt, me.length = Tt, Oe.length = Tt, Ie.length = Tt, at.length = Tt, q.length = Tt;
      for (let Wt = Tt; Wt < o.length; Wt++) {
        const $t = o[Wt];
        nt.push($t.close), me.push($t.high), Oe.push($t.low), Ie.push($t.open), at.push($t.volume || 0), q.push($t.time);
      }
      fe = { closes: nt, highs: me, lows: Oe, opens: Ie, volumes: at, timestamps: q }, Me.current = { candles: o, closes: nt, highs: me, lows: Oe, opens: Ie, volumes: at, timestamps: q };
      const an = Object.values(n).filter((Wt) => Wt?.enabled).length;
      if (!(o.length > 3e3 && an > 3)) {
        const Wt = performance.now(), $t = Or(fe, n), cn = performance.now() - Wt;
        r(cn), re.current = $t, Ge.current = Ue, T($t);
        return;
      }
    } else if (kt && re.current) {
      const dt = new Array(ce), Tt = new Array(ce), an = new Array(ce), Tn = new Array(ce), Wt = new Array(ce), $t = new Array(ce);
      for (let Qt = 0; Qt < ce; Qt++) {
        const mn = o[Qt];
        dt[Qt] = mn.close, Tt[Qt] = mn.high, an[Qt] = mn.low, Tn[Qt] = mn.open, Wt[Qt] = mn.volume || 0, $t[Qt] = mn.time;
      }
      nt = dt.concat(ve.closes), me = Tt.concat(ve.highs), Oe = an.concat(ve.lows), Ie = Tn.concat(ve.opens), at = Wt.concat(ve.volumes), q = $t.concat(ve.timestamps);
      const cn = ad(re.current, ce);
      Me.current = { candles: o, closes: nt, highs: me, lows: Oe, opens: Ie, volumes: at, timestamps: q }, re.current = cn, Ge.current = Ue, T(cn);
      return;
    } else
      nt = o.map((dt) => dt.close), me = o.map((dt) => dt.high), Oe = o.map((dt) => dt.low), Ie = o.map((dt) => dt.open), at = o.map((dt) => dt.volume || 0), q = o.map((dt) => dt.time), fe = { closes: nt, highs: me, lows: Oe, opens: Ie, volumes: at, timestamps: q }, Me.current = { candles: o, closes: nt, highs: me, lows: Oe, opens: Ie, volumes: at, timestamps: q };
    fe || (fe = { closes: nt, highs: me, lows: Oe, opens: Ie, volumes: at, timestamps: q });
    const it = Object.values(n).filter((dt) => dt?.enabled).length;
    if (!(o.length > 1e3 || it > 5 || (n.customIndicators?.filter((dt) => dt.enabled)?.length || 0) > 0)) {
      const dt = performance.now(), Tt = Or(fe, n), an = performance.now() - dt;
      r(an), re.current = Tt, Ge.current = Ue, T(Tt);
      return;
    }
    U(!0);
    const qt = $r(), Gt = ++id;
    rt.current = Gt, qt.postMessage({ id: Gt, price: fe, indicators: n });
  }, [o, n, d]), { indicatorData: I, isComputing: se, computeDurationMs: Pe };
}
function Ks(o) {
  const {
    ctx: n,
    candles: d,
    startIndex: I,
    indexToX: T,
    priceToY: se,
    morphAt: U,
    candleBodyWidth: Pe,
    wickWidth: r,
    colors: Me
  } = o, re = new Path2D(), Ge = new Path2D(), rt = Pe / 2, Fe = d.length, Ue = new Float64Array(Fe), ve = new Float64Array(Fe), nt = new Float64Array(Fe), me = new Float64Array(Fe), Oe = new Float64Array(Fe), Ie = new Float64Array(Fe), at = new Float64Array(Fe), q = new Float64Array(Fe);
  let fe = 0, st = 0;
  for (let ce = 0; ce < d.length; ce++) {
    const kt = U(ce, d[ce]), it = T(I + ce, I), $e = se(kt.open), qt = se(kt.close), Gt = se(kt.high), dt = se(kt.low), Tt = Math.min($e, qt), an = Math.max(1, Math.abs(qt - $e));
    kt.close >= kt.open ? (re.moveTo(it, Gt), re.lineTo(it, dt), Ue[fe] = it - rt, ve[fe] = Tt, nt[fe] = Pe, me[fe] = an, fe++) : (Ge.moveTo(it, Gt), Ge.lineTo(it, dt), Oe[st] = it - rt, Ie[st] = Tt, at[st] = Pe, q[st] = an, st++);
  }
  if (n.lineWidth = r, n.lineCap = "round", fe) {
    n.strokeStyle = Me.bullishWick, n.stroke(re), n.fillStyle = Me.bullish;
    for (let ce = 0; ce < fe; ce++)
      n.fillRect(Ue[ce], ve[ce], nt[ce], me[ce]);
  }
  if (st) {
    n.strokeStyle = Me.bearishWick, n.stroke(Ge), n.fillStyle = Me.bearish;
    for (let ce = 0; ce < st; ce++)
      n.fillRect(Oe[ce], Ie[ce], at[ce], q[ce]);
  }
  if (n.lineCap = "butt", n.lineWidth = 1, fe) {
    n.strokeStyle = Me.bullishBorder;
    for (let ce = 0; ce < fe; ce++)
      n.strokeRect(Ue[ce], ve[ce], nt[ce], me[ce]);
  }
  if (st) {
    n.strokeStyle = Me.bearishBorder;
    for (let ce = 0; ce < st; ce++)
      n.strokeRect(Oe[ce], Ie[ce], at[ce], q[ce]);
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
  timezone: I = "UTC",
  countdown: T,
  onCrosshairMove: se,
  syncedCrosshairTime: U,
  colors: Pe,
  indicators: r,
  onIndicatorsChange: Me,
  onRemoveBruePlot: re,
  onRemoveEngineIndicator: Ge,
  onEditEngineIndicator: rt,
  onConverterReady: Fe,
  onVisibleRangeChange: Ue,
  onViewportTimeChange: ve,
  syncedViewportTime: nt,
  disableAutoFollow: me = !1,
  scrollToIndex: Oe,
  chartType: Ie = "candlestick",
  onScrollingChange: at,
  onScrollSync: q,
  scrollOffsetRef: fe,
  optionsPdfEnabled: st = !1,
  heatmapEnabled: ce = !1,
  externalDimensions: kt,
  economicEvents: it,
  positionLines: $e,
  onPositionModify: qt,
  onPositionClose: Gt,
  autoSelectPositionId: dt,
  l2DepthData: Tt,
  onOpenSettings: an,
  onOpenCustomEditor: Tn,
  showBidAskSpread: Wt = !1,
  brokerBid: $t = null,
  brokerAsk: cn = null,
  showSessions: Qt = !1,
  timeframe: mn = "5m",
  rightOffset: Un,
  onLoadMore: Ws,
  isLoadingMore: So = !1,
  prependShift: Ms = 0,
  drawings: rs,
  selectedDrawingId: Ts,
  drawingCursorRef: Is,
  requestRedrawRef: Gs,
  isDrawingDragging: Co = !1
}) => {
  const pt = l.useRef(null), Mo = l.useRef(null), ot = l.useRef(null), Ds = l.useRef(null), Zs = l.useRef(!1), Js = l.useRef(null);
  l.useRef(null);
  const Qs = l.useRef(o), To = l.useRef(U ?? null), Fs = l.useRef(!1), eo = l.useRef(null), In = typeof window < "u" ? Math.min(window.devicePixelRatio || 1, 2) : 1, [xe, to] = l.useState({ width: 300, height: 300 }), [ue, Dt] = l.useState({
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
  }), je = l.useRef({
    startIndex: 0,
    candleWidth: 3
  }), Rn = l.useRef({
    startIndex: 0,
    candleWidth: 3
  }), Ft = l.useRef(!1), xn = l.useRef(!1), Ae = l.useRef(null), wt = l.useRef(null), vt = l.useRef(null), yt = l.useRef(null), $n = l.useRef(null), qn = l.useRef(0), [, un] = l.useState(0), as = l.useRef(null), Gn = (a) => {
    const p = Ae.current, b = as.current;
    if (p && b && b.posId === p) return b.offset;
    const y = dn.current, f = y && y.range > 0 ? y.range * 0.18 : a * 5e-3;
    return as.current = p && f > 0 ? { posId: p, offset: f } : null, f;
  }, no = l.useRef(null);
  l.useEffect(() => {
    if (dt && dt !== no.current && $e) {
      const a = $e.find((p) => p.id === dt);
      a && (no.current = dt, Ae.current = a.id, wt.current = a.stopLoss ?? null, vt.current = a.takeProfit ?? null, un((p) => p + 1));
    }
  }, [dt, $e]);
  const is = l.useRef(0), Yt = l.useCallback((a) => {
    Ft.current = a, xn.current !== a && (xn.current = a, at?.(a), a || (is.current = je.current.startIndex, fe && (fe.current = 0)));
  }, [at, fe]), Et = l.useCallback(() => {
    if (fe) {
      const a = je.current.startIndex, p = je.current.candleWidth * (1 + Qe), b = a - is.current;
      fe.current = b * p;
    }
    q?.();
  }, [q, fe]), Zn = l.useRef(Et);
  Zn.current = Et;
  const Pn = l.useRef(null), Hn = l.useRef(null), Jn = l.useRef(null), _s = l.useRef(!1), ht = l.useCallback((a = !1) => {
    if (Jn.current !== null) {
      a || (_s.current = !1);
      return;
    }
    _s.current = a, Jn.current = requestAnimationFrame(() => {
      Jn.current = null;
      const p = _s.current;
      Pn.current && Pn.current(p);
    });
  }, []);
  l.useCallback((a = !1) => {
    Jn.current !== null && (cancelAnimationFrame(Jn.current), Jn.current = null), Pn.current && Pn.current(a);
  }, []);
  const Qn = l.useRef(null), cs = l.useRef(0), Io = l.useRef(0), jn = l.useRef(!1), so = l.useRef(0), Nn = l.useRef(null), Rs = l.useRef(void 0), Vn = l.useRef(null), sn = l.useRef("standard"), [gn, us] = l.useState([]), Ct = l.useRef(null), bn = l.useRef(null), Ps = l.useRef([]), js = l.useRef(null), vn = l.useRef(null), [Ln, ds] = l.useState(!1), [yn, Ro] = l.useState({ x: 0, y: 0, startIndex: 0, priceOffset: 0 }), [Po, jo] = l.useState(0), [il, No] = l.useState(1), Mt = l.useRef(null), At = l.useRef(null), En = l.useRef(0), oo = l.useRef(null), xt = l.useRef(null), [An, hs] = l.useState(!1), fs = l.useRef(null), Os = l.useRef(0), $s = l.useRef(0), Bn = l.useRef(!1);
  l.useRef(0), l.useRef(0);
  const kn = l.useRef(null), Xn = l.useRef(null), wn = l.useRef(null), cl = l.useRef(null), v = "ns-resize", oe = "ns-resize";
  l.useRef(12), l.useRef(0), l.useRef(0);
  const [J, ge] = l.useState(0.15), [Pt, Be] = l.useState(!1), Ht = l.useRef({ y: 0, ratio: 0 });
  l.useRef(null);
  const [Zt, _e] = l.useState(1), [It, ps] = l.useState(0), [en, _t] = l.useState(null), [Vt, na] = l.useState(null), [Ql, ul] = l.useState(!1), [er, sa] = l.useState(!1), lo = l.useRef({ y: 0, scale: 1, offset: 0 }), ms = en !== null, Sn = l.useRef(1), es = l.useRef(0), ts = l.useRef(null), dn = l.useRef(null), hn = l.useRef(0), Ns = l.useRef(null), [ns, oa] = wu("preferences.chartShowOHLC", !0), [tr, la] = l.useState(0), [ro, nr] = l.useState(!1), [hh, ra] = l.useState(0), dl = l.useRef(null), hl = l.useRef(!1);
  l.useEffect(() => {
    if (!ro) return;
    const a = setInterval(() => ra((p) => p + 1), 3e4);
    return () => clearInterval(a);
  }, [ro]), l.useEffect(() => {
    it && it.length > 0 && Su(it.map((a) => a.region_code));
  }, [it]), l.useEffect(() => {
    if (!ro) return;
    const a = (p) => {
      dl.current && !dl.current.contains(p.target) && nr(!1);
    };
    return document.addEventListener("mousedown", a), () => document.removeEventListener("mousedown", a);
  }, [ro]);
  const [fl, aa] = l.useState(0), [pl, ia] = l.useState(0), [ml, ca] = l.useState(0), [xl, ua] = l.useState(0), [bl, da] = l.useState(0), Hs = l.useRef({}), [bt, ha] = l.useState({}), Yn = l.useRef({}), [sr, fa] = l.useState({}), [or, gl] = l.useState(null), [ao, Vs] = l.useState(null), on = l.useRef({});
  l.useRef(null);
  const lr = l.useRef(!1), ln = l.useRef(!1), Rt = l.useRef(null), [pa, ye] = l.useState(null), [Bt, pe] = l.useState(null), [Wn, jt] = l.useState(null), rr = typeof navigator < "u" && /Mac|iPhone|iPad|iPod/.test(navigator.platform), [io, ma] = l.useState(rr ? 8 : 2), vl = l.useRef(rr), co = rl(), yl = l.useRef(co);
  yl.current = co, l.useEffect(() => {
    co.chart?.scrollSensitivity !== void 0 && ma(co.chart.scrollSensitivity);
  }, [co.chart?.scrollSensitivity]);
  const te = { ...al(), ...Pe }, ar = typeof document < "u" && document.documentElement.classList.contains("dark");
  l.useEffect(() => {
    Ft.current || (je.current = {
      startIndex: ue.startIndex,
      candleWidth: ue.candleWidth
    });
  }, [ue.startIndex, ue.candleWidth]), l.useEffect(() => {
    Sn.current = Zt, es.current = It;
  }, [Zt, It]), l.useEffect(() => {
    if (!ue.autoFollowLatest) return;
    const a = setInterval(() => {
      jo((p) => (p + 0.1) % (Math.PI * 2)), No(0.85 + Math.sin(Date.now() / 1e3) * 0.15);
    }, 150);
    return () => clearInterval(a);
  }, [ue.autoFollowLatest]), l.useEffect(() => {
    Qs.current = o;
    const a = o[o.length - 1];
    a && (Js.current = {
      time: a.time,
      open: a.open,
      high: a.high,
      low: a.low,
      close: a.close
    }, ue.autoFollowLatest && Pn.current && Pn.current(!0));
  }, [o, ue.autoFollowLatest]), l.useEffect(() => {
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
      for (const _ of O)
        if (e === _ || e.startsWith(_)) return { ticker: _, etfDragPerYear: 0 };
      return e.includes("XAU") || e.includes("GOLD") ? { ticker: "GLD", etfDragPerYear: 4e-3 } : e.includes("SPX500") || e.includes("SPX") ? { ticker: "SPY", etfDragPerYear: 0 } : e.includes("NAS100") || e.includes("NDX") ? { ticker: "QQQ", etfDragPerYear: 0 } : e.includes("US30") || e.includes("DJI") ? { ticker: "DIA", etfDragPerYear: 0 } : null;
    })(d);
    if (!p || !st) {
      gl(null);
      return;
    }
    const b = async () => {
      try {
        const f = [];
        if (!f || f.length === 0) {
          gl(null);
          return;
        }
        const e = f[0], O = o[o.length - 1]?.close || parseFloat(e.current_price), _ = parseFloat(e.current_price), z = _ > 0 ? O / _ : 1;
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
    b();
    const y = setInterval(b, 6e4);
    return () => clearInterval(y);
  }, [d, st]), l.useEffect(() => {
    if (!ce || !d) {
      us([]);
      return;
    }
    const a = async () => {
      try {
        const b = d.includes("/") ? d : d.length === 6 ? `${d.substring(0, 3)}/${d.substring(3)}` : d, y = await Ku("l2_heatmap_snapshots", {
          params: { symbol: `eq.${b}`, order: "timestamp.desc", limit: "300" }
        });
        y && y.length > 0 && us(y.reverse());
      } catch (b) {
        console.error("Failed to fetch heatmap data:", b);
      }
    };
    a();
    const p = setInterval(a, 5e3);
    return () => clearInterval(p);
  }, [d, ce]), l.useEffect(() => () => {
    Mt.current !== null && cancelAnimationFrame(Mt.current), bn.current !== null && cancelAnimationFrame(bn.current), kn.current !== null && cancelAnimationFrame(kn.current), Xn.current !== null && cancelAnimationFrame(Xn.current), wn.current !== null && cancelAnimationFrame(wn.current), At.current !== null && clearTimeout(At.current), ts.current !== null && clearTimeout(ts.current);
  }, []);
  const { isPhone: xa, isDesktop: Lo } = Cu(xe.width), Ze = l.useMemo(() => Mu(xe.width), [xe.width]), ir = xa, cr = n || (o.length > 0 ? o[o.length - 1]?.close : 100), Je = l.useMemo(() => Tu(ir, d, cr || 100, Un), [ir, Lo, d, cr, Un]), Nt = Ze.timeAxisHeight, Eo = Ze.priceLabelFont, ur = Ze.timeLabelFont, Jt = Ze.subplotLabelFont, Ao = 1, Bo = 50, xs = l.useMemo(() => {
    const a = [], b = Math.pow(Bo / Ao, 0.025);
    for (let y = 0; y <= 40; y++)
      a.push(Ao * Math.pow(b, y));
    return a;
  }, []), Dn = l.useCallback((a = !1) => {
    const p = xe.width - Je, b = a && Ft.current ? je.current : ue, e = (Ie === "footprint_cluster" || Ie === "footprint_profile" ? Math.max(b.candleWidth, 22) : b.candleWidth) * (1 + Qe), O = Math.floor(p / e), _ = Math.max(0, Math.floor(b.startIndex)), z = Math.min(o.length, _ + O);
    return {
      candles: o.slice(_, z),
      startIndex: _,
      endIndex: z,
      visibleCount: O,
      totalWithFuture: O + ue.futureSpace,
      candleWidth: b.candleWidth
    };
  }, [o, xe.width, ue, Ie]);
  l.useEffect(() => {
    if (o.length > 0) {
      const a = xe.width - Je, p = ue.candleWidth * (1 + Qe), b = Math.floor(a / p), y = Math.max(0, Math.floor(ue.startIndex)), f = Math.min(o.length, y + b);
      Ue && Ue({ startIndex: y, endIndex: f, totalCandles: o.length }), Ws && y < 2500 && !So && !Bn.current && !ue.autoFollowLatest && (Nn.current && clearTimeout(Nn.current), Nn.current = setTimeout(() => {
        Bn.current || Ws();
      }, 100));
    }
  }, [Ue, Ws, So, o.length, ue.startIndex, ue.candleWidth, xe.width, ue.autoFollowLatest]), l.useEffect(() => {
    if (!ve || o.length === 0) return;
    if (Fs.current) {
      Fs.current = !1;
      return;
    }
    const a = xe.width - Je, p = ue.candleWidth * (1 + Qe), b = Math.floor(a / p), y = Math.max(0, Math.floor(ue.startIndex)), f = Math.min(o.length, y + b), e = o.slice(y, f);
    if (e.length === 0) return;
    const O = Math.floor(e.length / 2), _ = e[O];
    _ && _.time !== eo.current && (eo.current = _.time, ve(_.time));
  }, [ve, o, ue.startIndex, ue.candleWidth, xe.width]), l.useEffect(() => {
    if (!nt || o.length === 0 || nt === eo.current) return;
    let a = -1, p = 1 / 0;
    for (let B = 0; B < o.length; B++) {
      const Y = Math.abs(o[B].time - nt);
      Y < p && (p = Y, a = B);
    }
    if (a === -1) return;
    const b = xe.width - Je, y = ue.candleWidth * (1 + Qe), f = Math.floor(b / y), e = Math.max(0, Math.floor(ue.startIndex)), O = Math.min(o.length, e + f), _ = Math.floor(f / 2), z = Math.max(0, a - _), $ = a >= e && a < O, g = e + Math.floor(f / 2);
    (!$ || Math.abs(a - g) > _ / 2) && (Fs.current = !0, Dt((B) => ({
      ...B,
      startIndex: z,
      autoFollowLatest: !1
    })), je.current.startIndex = z);
  }, [nt, o, xe.width, ue.candleWidth, ue.startIndex]);
  const Ls = l.useCallback((a, p = !0) => {
    if (en !== null && Vt !== null) {
      const z = Sn.current, $ = es.current, g = Vt / z, S = en + $;
      return {
        min: S - g / 2,
        max: S + g / 2,
        range: g
      };
    }
    if (a.length === 0)
      return { min: 0, max: 100, range: 100 };
    let b = 1 / 0, y = -1 / 0;
    for (const z of a)
      z.low < b && (b = z.low), z.high > y && (y = z.high);
    p && n && (n < b && (b = n), n > y && (y = n));
    const f = y - b, e = f * 0.05, O = (y + b) / 2, _ = f + e * 2;
    return {
      min: O - _ / 2,
      max: O + _ / 2,
      range: _
    };
  }, [n, en, Vt]), St = l.useCallback((a, p) => {
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
    ].filter((_) => r?.[_]?.enabled).length, f = xe.height - Nt, e = y > 0 ? Math.max(60 * y, f * J) : 0, O = f - e;
    return O - (a - p.min) / p.range * O;
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
    ].filter((_) => r?.[_]?.enabled).length, f = xe.height - Nt, e = y > 0 ? Math.max(60 * y, f * J) : 0, O = f - e;
    return p.max - a / O * p.range;
  }, [xe.height, r, o, J]), hr = l.useCallback((a, p) => {
    const b = ue.candleWidth * (1 + Qe);
    return (a - p) * b + b / 2;
  }, [ue.candleWidth]), uo = l.useCallback((a, p) => {
    const b = ue.candleWidth * (1 + Qe);
    return Math.floor(a / b) + p;
  }, [ue.candleWidth]), Fn = l.useCallback((a) => Iu(a, d), [d]), Es = l.useCallback((a) => {
    const p = new Date(a);
    if (I === "local") {
      const b = p.getHours().toString().padStart(2, "0"), y = p.getMinutes().toString().padStart(2, "0");
      return `${b}:${y}`;
    } else if (I === "UTC") {
      const b = p.getUTCHours().toString().padStart(2, "0"), y = p.getUTCMinutes().toString().padStart(2, "0");
      return `${b}:${y}`;
    } else
      try {
        return p.toLocaleTimeString("en-GB", {
          timeZone: I,
          hour: "2-digit",
          minute: "2-digit",
          hour12: !1
        });
      } catch {
        const b = p.getUTCHours().toString().padStart(2, "0"), y = p.getUTCMinutes().toString().padStart(2, "0");
        return `${b}:${y}`;
      }
  }, [I]), ss = l.useCallback((a, p = !1) => {
    const b = new Date(a);
    if (I === "local") {
      const y = b.getDate(), f = b.toLocaleString("en", { month: "short" }), e = String(b.getFullYear()).slice(-2);
      return p ? `${y} ${f} '${e}` : `${y} ${f}`;
    } else if (I === "UTC") {
      const y = b.getUTCDate(), f = b.toLocaleString("en", { month: "short", timeZone: "UTC" }), e = String(b.getUTCFullYear()).slice(-2);
      return p ? `${y} ${f} '${e}` : `${y} ${f}`;
    } else
      try {
        const y = b.toLocaleDateString("en-GB", { timeZone: I, day: "numeric" }), f = b.toLocaleDateString("en-GB", { timeZone: I, month: "short" }), e = b.toLocaleDateString("en-GB", { timeZone: I, year: "2-digit" });
        return p ? `${y} ${f} '${e}` : `${y} ${f}`;
      } catch {
        const y = b.getUTCDate(), f = b.toLocaleString("en", { month: "short", timeZone: "UTC" }), e = String(b.getUTCFullYear()).slice(-2);
        return p ? `${y} ${f} '${e}` : `${y} ${f}`;
      }
  }, [I]), fr = l.useCallback((a) => {
    const p = new Date(a), b = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    if (I === "local") return b[p.getDay()];
    if (I === "UTC") return b[p.getUTCDay()];
    try {
      return p.toLocaleDateString("en-GB", { timeZone: I, weekday: "short" });
    } catch {
      return b[p.getUTCDay()];
    }
  }, [I]), ba = (a, p) => {
    const b = a / p, y = Math.pow(10, Math.floor(Math.log10(b))), f = b / y;
    let e;
    return f <= 1 ? e = 1 : f <= 2 ? e = 2 : f <= 5 ? e = 5 : e = 10, e * y;
  };
  l.useRef(null);
  const { indicatorData: s } = cd(o, r, Ft), bs = l.useCallback((a = !1) => {
    const p = Mo.current;
    if (!p) return;
    const { width: b, height: y } = xe;
    Ds.current || (Ds.current = document.createElement("canvas"));
    const f = Ds.current;
    (f.width !== p.width || f.height !== p.height) && (f.width = p.width, f.height = p.height);
    const e = f.getContext("2d");
    if (!e) return;
    const O = !1;
    e.setTransform(In, 0, 0, In, 0, 0);
    const _ = !!s?.rsi, z = !!s?.macd, $ = !!s?.atr, g = !!s?.stochastic, S = r?.volume?.enabled && o.some((D) => D.volume !== void 0 && D.volume > 0), B = !!s?.williamsR, Y = !!s?.cci, u = !!s?.adx, A = !!s?.roc, m = !!s?.aroon, V = !!s?.momentum, h = !!s?.ao, L = !!s?.mfi, de = !!s?.tsi, He = !!s?.trix, ne = !!s?.ultimateOsc, Ve = !!s?.dpo, ee = !!s?.kst, Ne = !!s?.stochRsi, lt = !!s?.bbPercent, Xe = !!s?.bbWidth, he = !!s?.histVol, Le = !!s?.chaikinVol, ct = !!s?.stdDev, et = !!s?.obv, Kt = !!s?.cmf, Cn = !!s?.adl, tn = !!s?.forceIndex, Oo = !!s?.eom, Ot = !!s?.correlation, ys = !!s?.coppock, fo = !!s?.vortex, $o = !!s?.choppiness, Il = !!s?.elderRay, Rl = !!s?.massIndex, Pl = !!s?.linRegSlope, Da = !!s?.ppo, Fa = !!s?.pvo, _a = !!s?.cmo, Oa = !!s?.fisher, $a = !!s?.stc, Ha = !!s?.rviOsc, Va = !!s?.klinger, Xa = !!s?.connorsRsi, Ya = !!s?.apo, za = !!s?.qstick, Ka = !!s?.bop, Ua = !!s?.psychLine, qa = !!s?.pfe, Ga = !!s?.smi, Za = !!s?.ulcerIndex, Ja = !!s?.natr, Qa = !!s?.trueRange, ei = !!s?.squeeze, ti = !!s?.relVolIndex, ni = !!s?.vhf, si = !!s?.volumeOsc, oi = !!s?.nvi, li = !!s?.pvi, ri = !!s?.pvt, ai = !!s?.vroc, ii = !!s?.netVolume, ci = !!s?.twiggsMF, ui = !!s?.linRegRSquared, di = !!s?.gator, Ho = [
      _,
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
      L,
      de,
      He,
      ne,
      Ve,
      ee,
      Ne,
      lt,
      Xe,
      he,
      Le,
      ct,
      et,
      Kt,
      Cn,
      tn,
      Oo,
      Ot,
      ys,
      // Phase 2
      fo,
      $o,
      Il,
      Rl,
      Pl,
      Da,
      Fa,
      _a,
      Oa,
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
    ].filter(Boolean).length + (s?.customIndicators?.filter((D) => D.display === "subplot").length || 0), wr = y - Nt, Sr = Ho > 0 ? Math.max(60 * Ho, wr * J) : 0, os = Ho > 0 ? Sr / Ho : 0, Te = wr - Sr, Z = b - Je;
    e.fillStyle = te.background, e.fillRect(0, 0, b, y);
    const i = Dn(!0);
    let rn = Ft.current ? je.current.candleWidth : ue.candleWidth;
    (Ie === "footprint_cluster" || Ie === "footprint_profile") && (rn = Math.max(rn, 22));
    const Ye = Ls(i.candles, ue.autoFollowLatest);
    dn.current = Ye, hn.current = Te;
    const Cr = Ft.current ? je.current.startIndex : ue.startIndex, hi = (Cr - i.startIndex) * (rn * (1 + Qe)), be = (D, c) => {
      const j = rn * (1 + Qe);
      return (D - c) * j + j / 2 - hi;
    }, qe = (D) => {
      const c = (D - Ye.min) / Ye.range;
      return Te - c * Te;
    }, Vo = (te.gridOpacity ?? 100) / 100;
    e.globalAlpha = Vo, e.strokeStyle = te.grid, e.lineWidth = 0.5, e.setLineDash([]);
    const fi = yl.current?.chart?.gridHorizontalLines, pi = yl.current?.chart?.gridVerticalLines, mi = Lo ? fi ?? Ze.priceTargetLabels : Ze.priceTargetLabels, Xo = ba(Ye.range, mi), Mr = Math.ceil(Ye.min / Xo) * Xo, xi = i.startIndex + i.candles.length - 1, bi = be(o.length - 1, i.startIndex) <= Z ? Z : Math.max(0, Math.min(Z, be(xi, i.startIndex) + rn / 2)), Tr = 25;
    e.beginPath();
    let Ir = -1 / 0;
    for (let D = Mr; D <= Ye.max; D += Xo) {
      const c = qe(D);
      Math.abs(c - Ir) < Tr || (Ir = c, e.moveTo(0, c), e.lineTo(bi, c));
    }
    e.stroke(), e.setLineDash([]), e.globalAlpha = 1;
    const Rr = rn * (1 + Qe), jl = Math.ceil(Z / Rr), Nl = i.startIndex + jl, gi = Lo ? pi ?? Ze.targetLinesOnScreen : Ze.targetLinesOnScreen, vi = Math.max(1, Math.round(jl / gi)), Xs = Math.max(1, vi), Pr = Xs / 2, yi = jl / Xs, jr = Math.max(0, Math.min(
      1,
      (yi - 8) / 6
    )), Nr = Xs / 2, Lr = Ze.tertiaryGridVisible ? Math.max(0, Math.min(
      0.5,
      (3 - Rr) / 1.5
    )) : 0;
    e.globalAlpha = Vo, e.strokeStyle = te.grid, e.beginPath();
    const Ll = i.startIndex;
    for (let D = Ll; D <= Nl; D += Xs) {
      const c = be(D, i.startIndex);
      if (c >= 0 && c <= Z && (e.moveTo(c, 0), e.lineTo(c, Te)), c > Z) break;
    }
    if (e.stroke(), jr > 0.01 && Pr >= 1) {
      e.globalAlpha = jr * Vo, e.strokeStyle = te.grid, e.beginPath();
      const D = i.startIndex;
      for (let c = D; c <= Nl; c += Pr) {
        if ((c - Ll) % Xs === 0) continue;
        const j = be(c, i.startIndex);
        if (j >= 0 && j <= Z && (e.moveTo(j, 0), e.lineTo(j, Te)), j > Z) break;
      }
      e.stroke(), e.globalAlpha = 1;
    }
    if (Lr > 0.01 && Nr >= 1) {
      e.globalAlpha = Lr * Vo, e.strokeStyle = te.grid, e.beginPath();
      const D = i.startIndex;
      for (let c = D; c <= Nl; c += Nr) {
        if ((c - Ll) % Xs === 0) continue;
        const j = be(c, i.startIndex);
        if (j >= 0 && j <= Z && (e.moveTo(j, 0), e.lineTo(j, Te)), j > Z) break;
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
    if (st && or && Ru(El, or), ce && gn.length > 0 && Pu(El, gn), Tt && (Tt.bids.length > 0 || Tt.asks.length > 0) && ju(El, Tt), Qt) {
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
    const fn = Math.max(rn * 0.7, 3), Ys = Math.max(1, fn * 0.15), Al = Js.current, ki = o.length - 1, ks = (D, c) => Al && i.startIndex + D === ki && Al.time === c.time ? Al : c;
    if (Ie === "candlestick")
      Ks({
        ctx: e,
        candles: i.candles,
        startIndex: i.startIndex,
        indexToX: be,
        priceToY: qe,
        morphAt: ks,
        candleBodyWidth: fn,
        wickWidth: Ys,
        colors: {
          bullish: te.bullish,
          bearish: te.bearish,
          bullishWick: te.bullishWick,
          bearishWick: te.bearishWick,
          bullishBorder: te.bullishBorder,
          bearishBorder: te.bearishBorder
        }
      });
    else if (Ie === "line")
      e.strokeStyle = te.bullish, e.lineWidth = 2, e.beginPath(), i.candles.forEach((D, c) => {
        const j = be(i.startIndex + c, i.startIndex), x = qe(ks(c, D).close);
        c === 0 ? e.moveTo(j, x) : e.lineTo(j, x);
      }), e.stroke();
    else if (Ie === "area") {
      const D = e.createLinearGradient(0, 0, 0, Te);
      if (D.addColorStop(0, "rgba(34, 197, 94, 0.4)"), D.addColorStop(1, "rgba(34, 197, 94, 0.02)"), e.beginPath(), i.candles.forEach((c, j) => {
        const x = be(i.startIndex + j, i.startIndex), M = qe(ks(j, c).close);
        j === 0 ? e.moveTo(x, M) : e.lineTo(x, M);
      }), i.candles.length > 0) {
        const c = be(i.startIndex + i.candles.length - 1, i.startIndex), j = be(i.startIndex, i.startIndex);
        e.lineTo(c, Te), e.lineTo(j, Te), e.closePath(), e.fillStyle = D, e.fill();
      }
      e.strokeStyle = te.bullish, e.lineWidth = 2, e.beginPath(), i.candles.forEach((c, j) => {
        const x = be(i.startIndex + j, i.startIndex), M = qe(ks(j, c).close);
        j === 0 ? e.moveTo(x, M) : e.lineTo(x, M);
      }), e.stroke();
    } else if (Ie === "heikin_ashi") {
      if (i.candles.length !== 0) {
        let D = i.candles[0]?.open || 0, c = i.candles[0]?.close || 0;
        const j = i.candles.map((x, M) => {
          const k = (x.open + x.high + x.low + x.close) / 4, P = M === 0 ? (x.open + x.close) / 2 : (D + c) / 2, W = Math.max(x.high, P, k), F = Math.min(x.low, P, k), E = { time: x.time, open: P, high: W, low: F, close: k, volume: x.volume };
          return D = P, c = k, E;
        });
        Ks({
          ctx: e,
          candles: j,
          startIndex: i.startIndex,
          indexToX: be,
          priceToY: qe,
          morphAt: (x, M) => j[x],
          candleBodyWidth: fn,
          wickWidth: Ys,
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
    } else if (Ie === "tpo") {
      const c = /* @__PURE__ */ new Map();
      i.candles.forEach((x) => {
        const M = Math.floor(x.time / 18e5) * 18e5, k = c.get(M);
        k ? (k.high = Math.max(k.high, x.high), k.low = Math.min(k.low, x.low), k.count++) : c.set(M, { high: x.high, low: x.low, count: 1 });
      });
      let j = 0;
      c.forEach((x) => {
        const M = be(i.startIndex + j, i.startIndex), k = qe(x.high), P = qe(x.low);
        e.fillStyle = "#21b3a4", e.globalAlpha = 0.25, e.fillRect(M - fn / 2, k, fn, Math.max(2, P - k)), e.globalAlpha = 1, j++;
      }), e.globalAlpha = 0.3, Ks({
        ctx: e,
        candles: i.candles,
        startIndex: i.startIndex,
        indexToX: be,
        priceToY: qe,
        morphAt: ks,
        candleBodyWidth: fn,
        wickWidth: Ys,
        colors: {
          bullish: te.bullish,
          bearish: te.bearish,
          bullishWick: te.bullishWick,
          bearishWick: te.bearishWick,
          bullishBorder: te.bullishBorder,
          bearishBorder: te.bearishBorder
        }
      }), e.globalAlpha = 1;
    } else if (Ie === "footprint_cluster" || Ie === "footprint_profile") {
      const c = Ie === "footprint_profile" ? "delta" : "sellsBuys", j = b - Je, x = i.candles.length || 1, M = j / Math.max(x, 1), k = M < 25, P = !k && M >= 20, F = 10 * (M < 80 ? 0.7 : M < 120 ? 0.8 : 1), E = 3, w = 0, C = (R) => Math.abs(R) >= 1e6 ? (R / 1e6).toFixed(1) + "M" : Math.abs(R) >= 1e3 ? (R / 1e3).toFixed(1) + "K" : Math.abs(R) >= 100 ? R.toFixed(0) : Math.abs(R) >= 10 ? R.toFixed(1) : R.toFixed(2), N = (R, Q) => {
        const le = Math.max(R.high - R.low, R.close * 5e-4, 0.01), X = 0.5;
        let H = le / 18;
        const K = Math.abs(qe(R.high) - qe(R.low));
        if (K > 0) {
          const Re = Math.max(3, Math.floor(K / 12)), Ce = le / Re;
          H < Ce && (H = Ce);
        }
        H = Math.max(X, Math.ceil(H / X) * X);
        const ie = Math.max(3, Math.min(24, Math.floor(le / H) || 15)), ae = [];
        let G = 0, ke = 0, Se = 0;
        const ze = R.volume || 100;
        for (let Re = 0; Re < ie; Re++) {
          const Ce = R.low + Re / ie * le, We = Ce + le / ie, De = (Ce + We) / 2, Ke = Math.abs(De - R.close) / (le || 1), ft = Math.exp(-Math.pow(Ke * 3, 2)) + 0.15, Ee = ze * ft / ie * (0.8 + Math.random() * 0.4);
          let Xt = R.close >= R.open ? 0.55 + Math.random() * 0.15 : 0.35 + Math.random() * 0.15;
          Math.random() > 0.7 && (Math.random() > 0.5 ? Xt = Math.min(0.85, Xt + 0.25) : Xt = Math.max(0.15, Xt - 0.25));
          const _n = Ee * Xt, zn = Ee * (1 - Xt);
          G += _n, ke += zn, Se += Ee, ae.push({ price_mid: De, price_lo: Ce, price_hi: We, buy: _n, sell: zn, total: Ee, delta: _n - zn, bucket_idx: Re });
        }
        let ut = 0, we = 0;
        ae.forEach((Re, Ce) => {
          Re.total > we && (we = Re.total, ut = Ce);
        });
        const mt = ae.map((Re, Ce) => {
          let We = !1, De = !1;
          return Re.buy >= Math.max(0, w) && Re.sell > 0 && Re.buy / Re.sell >= E && (We = !0), Re.sell >= Math.max(0, w) && Re.buy > 0 && Re.sell / Re.buy >= E && (De = !0), { ...Re, is_poc: Ce === ut, buy_imbalance: We, sell_imbalance: De, buy_stack: !1, sell_stack: !1 };
        }), gt = 2, tt = mt.map((Re) => ({ ...Re }));
        for (const Re of [!1, !0]) {
          let Ce = 0;
          for (; Ce < tt.length; ) {
            const We = (Ke) => Re ? Ke.buy_imbalance : Ke.sell_imbalance;
            if (!We(tt[Ce])) {
              Ce++;
              continue;
            }
            let De = Ce + 1;
            for (; De < tt.length && We(tt[De]) && tt[De - 1].bucket_idx + 1 === tt[De].bucket_idx; ) De++;
            if (De - Ce >= gt)
              for (let Ke = Ce; Ke < De; Ke++)
                Re ? tt[Ke].buy_stack = !0 : tt[Ke].sell_stack = !0;
            Ce = De;
          }
        }
        return { levels: tt, totalBuy: G, totalSell: ke, totalVol: Se, delta: G - ke, pocIdx: ut, maxVol: we, tickPerRow: H, range: le };
      };
      e.save(), e.globalAlpha = 0.3, Ks({
        ctx: e,
        candles: i.candles,
        startIndex: i.startIndex,
        indexToX: be,
        priceToY: qe,
        morphAt: ks,
        candleBodyWidth: Math.max(1, fn * 0.3),
        wickWidth: Ys,
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
        const G = N(R), ke = G.maxVol || 1, Se = Math.max(...G.levels.map((we) => Math.abs(we.delta)), 1);
        if (k) {
          const we = G.delta, mt = G.totalBuy + G.totalSell || 1;
          let gt = Math.abs(we) / mt;
          gt = Math.sqrt(gt);
          const tt = Math.max(R.open, R.close), Re = Math.min(R.open, R.close), Ce = qe(tt), We = qe(Re);
          let De = Math.min(Ce, We), Ke = Math.max(Ce, We);
          if (Ke - De < 2) {
            const Xt = (De + Ke) * 0.5;
            De = Xt - 1, Ke = Xt + 1;
          }
          let ft, Ee, Lt;
          we >= 0 ? (ft = 20 + 30 * gt, Ee = 30 + 70 * gt, Lt = 50 + 140 * gt) : (ft = 40 + 140 * gt, Ee = 20 + 25 * gt, Lt = 40 + 70 * gt), e.fillStyle = `rgba(${Math.round(ft)},${Math.round(Ee)},${Math.round(Lt)},0.9)`, e.fillRect(K, De, ae, Ke - De);
          return;
        }
        for (const we of G.levels) {
          const mt = qe(we.price_hi), gt = qe(we.price_lo), tt = Math.min(mt, gt), Re = Math.max(mt, gt), Ce = Re - tt;
          if (!(Ce < 1))
            if (c === "sellsBuys") {
              const We = K + ae * 0.5;
              let De = we.sell / ke;
              De = Math.sqrt(Math.max(0, De));
              let Ke = we.buy / ke;
              Ke = Math.sqrt(Math.max(0, Ke));
              const ft = 25 + 130 * De, Ee = 14 + 20 * De, Lt = 30 + 60 * De, Xt = 0.9 + 0.1 * De;
              e.fillStyle = `rgba(${Math.round(ft)},${Math.round(Ee)},${Math.round(Lt)},${Xt})`, e.fillRect(K, tt, ae * 0.5, Ce);
              const _n = 14 + 20 * Ke, zn = 20 + 55 * Ke, Ci = 35 + 120 * Ke, Mi = 0.9 + 0.1 * Ke;
              if (e.fillStyle = `rgba(${Math.round(_n)},${Math.round(zn)},${Math.round(Ci)},${Mi})`, e.fillRect(We, tt, ae * 0.5, Ce), e.strokeStyle = "rgba(100,100,120,0.3)", e.lineWidth = 0.5, e.beginPath(), e.moveTo(We, tt), e.lineTo(We, Re), e.stroke(), P && Ce >= F * 0.5) {
                e.font = `${F}px JetBrains Mono, monospace`;
                const zo = C(we.sell), Ti = C(we.buy), Ar = tt + (Ce + F * 0.35) * 0.5;
                e.fillStyle = "rgba(230,215,215,0.95)", e.textAlign = "center", e.fillText(zo, K + ae * 0.25, Ar), e.fillStyle = "rgba(215,225,240,0.95)", e.fillText(Ti, K + ae * 0.75, Ar);
              }
              if (we.sell_imbalance && (e.strokeStyle = "rgba(180,80,80,0.9)", e.lineWidth = we.buy_imbalance && we.sell_imbalance ? 1.5 : 1, e.strokeRect(K + 0.5, tt + 0.5, ae * 0.5 - 1, Ce - 1)), we.buy_imbalance && (e.strokeStyle = "rgba(80,180,120,0.9)", e.lineWidth = we.buy_imbalance && we.sell_imbalance ? 1.5 : 1, e.strokeRect(K + ae * 0.5 + 0.5, tt + 0.5, ae * 0.5 - 1, Ce - 1)), we.is_poc) {
                const zo = tt + Ce * 0.5;
                e.strokeStyle = "rgba(200,180,100,0.9)", e.lineWidth = 1, e.beginPath(), e.moveTo(K, zo), e.lineTo(ie, zo), e.stroke();
              }
            } else {
              let We, De, Ke, ft;
              if (c === "delta") {
                let Ee = Math.abs(we.delta) / Se;
                Ee = Math.sqrt(Ee), we.delta >= 0 ? (We = 14 + 20 * Ee, De = 20 + 60 * Ee, Ke = 35 + 110 * Ee, ft = 0.9 + 0.1 * Ee) : (We = 25 + 125 * Ee, De = 14 + 20 * Ee, Ke = 30 + 55 * Ee, ft = 0.9 + 0.1 * Ee);
              } else {
                let Ee = we.total / ke;
                Ee = Math.sqrt(Ee), We = 14 + 20 * Ee, De = 20 + 50 * Ee, Ke = 40 + 115 * Ee, ft = 0.9 + 0.1 * Ee;
              }
              if (e.fillStyle = `rgba(${Math.round(We)},${Math.round(De)},${Math.round(Ke)},${ft})`, e.fillRect(K, tt, ae, Ce), P && Ce >= F * 0.5) {
                e.font = `${F}px JetBrains Mono, monospace`, e.textAlign = "center", e.fillStyle = "rgba(230,230,230,0.95)";
                const Ee = C(c === "delta" ? we.delta : we.total);
                e.fillText(Ee, K + ae * 0.5, tt + (Ce + F * 0.35) * 0.5);
              }
              if ((we.buy_imbalance || we.sell_imbalance) && (e.strokeStyle = we.buy_imbalance ? "rgba(80,180,120,0.9)" : "rgba(180,80,80,0.9)", e.lineWidth = 1, e.strokeRect(K + 0.5, tt + 0.5, ae - 1, Ce - 1)), we.is_poc) {
                const Ee = tt + Ce * 0.5;
                e.strokeStyle = "rgba(200,180,100,0.9)", e.lineWidth = 1, e.beginPath(), e.moveTo(K, Ee), e.lineTo(ie, Ee), e.stroke();
              }
            }
        }
        const ze = qe(G.levels[G.levels.length - 1]?.price_hi || R.high), ut = qe(G.levels[0]?.price_lo || R.low);
        if (e.strokeStyle = "rgba(120,130,150,0.25)", e.lineWidth = 1, e.strokeRect(K, Math.min(ze, ut), ae, Math.abs(ut - ze)), P) {
          const mt = qe(R.low) + 12;
          if (mt < Te - 4) {
            e.font = `${F * 0.8}px JetBrains Mono, monospace`;
            const gt = `V:${C(G.totalVol)}`, tt = `D:${C(G.delta)}`, Re = e.measureText(gt).width, Ce = e.measureText(tt).width, We = Re + 3 + Ce, De = K + (ae - We) * 0.5;
            e.fillStyle = "rgba(120,170,200,0.9)", e.textAlign = "left", e.fillText(gt, De, mt), e.fillStyle = G.delta >= 0 ? "rgba(100,180,130,0.9)" : "rgba(180,100,100,0.9)", e.fillText(tt, De + Re + 3, mt);
          }
        }
      });
    } else if (Ie === "flow_positioning")
      Ks({
        ctx: e,
        candles: i.candles,
        startIndex: i.startIndex,
        indexToX: be,
        priceToY: qe,
        morphAt: ks,
        candleBodyWidth: fn,
        wickWidth: Ys,
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
        const j = be(i.startIndex + c, i.startIndex), x = D.close > D.open, M = qe(D.close);
        e.beginPath(), e.moveTo(j, M), e.lineTo(j, M + (x ? -12 : 12)), e.stroke(), e.fillStyle = x ? "#21b3a4" : "#f0426c", e.beginPath(), e.arc(j, M + (x ? -14 : 14), 2, 0, Math.PI * 2), e.fill();
      });
    else if (Ie === "renko") {
      const D = Math.max(Ye.range * 0.015, Ye.range / 200 || 1), c = Math.max(D, 1e-4), j = [];
      let x = i.candles[0]?.close || Ye.min + Ye.range / 2, M = i.startIndex;
      i.candles.forEach((k, P) => {
        const W = i.startIndex + P, F = k.close - x;
        let E = Math.floor(Math.abs(F) / c);
        P === 0 && E === 0 && (E = 1);
        for (let w = 0; w < E; w++) {
          const C = F >= 0 || w === 0 && P === 0 && k.close >= k.open, N = x, R = C ? x + c : x - c;
          if (R < Ye.min - Ye.range || R > Ye.max + Ye.range) {
            x = R;
            continue;
          }
          j.push({ gi: M + (w + 1), isBullish: C, bottom: Math.min(N, R), top: Math.max(N, R) }), x = R;
        }
        E > 0 && (M = W);
      }), j.length === 0 ? Ks({
        ctx: e,
        candles: i.candles,
        startIndex: i.startIndex,
        indexToX: be,
        priceToY: qe,
        morphAt: ks,
        candleBodyWidth: fn,
        wickWidth: Ys,
        colors: {
          bullish: te.bullish,
          bearish: te.bearish,
          bullishWick: te.bullishWick,
          bearishWick: te.bearishWick,
          bullishBorder: te.bullishBorder,
          bearishBorder: te.bearishBorder
        }
      }) : j.forEach((k) => {
        const P = be(k.gi, i.startIndex), W = qe(k.top), F = qe(k.bottom), E = Math.max(2, Math.abs(F - W)), w = Math.min(W, F);
        e.fillStyle = k.isBullish ? te.bullish : te.bearish, e.fillRect(P - fn / 2, w, fn, E), e.strokeStyle = k.isBullish ? te.bullishBorder : te.bearishBorder, e.lineWidth = 1, e.strokeRect(P - fn / 2, w, fn, E);
      });
    }
    if (Ie === "footprint_cluster" || Ie === "footprint_profile" || Ie === "candlestick") {
      try {
        const D = Math.max(...i.candles.map((c) => c.volume || 0), 1);
        i.candles.forEach((c, j) => {
          if (Math.random() > 0.85) {
            const x = c.volume || 0, M = Math.sqrt(x / (D || 1) * 80) * 2.5, k = Math.max(3, Math.min(12, M, 16));
            if (k < 3) return;
            const P = be(i.startIndex + j, i.startIndex), W = qe(c.high + (c.high - c.low) * 0.15);
            if (W < 10 || W > Te - 10) return;
            const F = c.close >= c.open;
            e.beginPath(), e.arc(P, W, k, 0, Math.PI * 2), e.fillStyle = F ? "rgba(33,179,164,0.85)" : "rgba(240,66,108,0.85)", e.fill(), e.strokeStyle = "rgba(0,0,0,0.4)", e.lineWidth = 0.5, e.stroke();
          }
        });
      } catch {
      }
      if (Ie === "footprint_cluster" || Ie === "footprint_profile") {
        e.save(), e.font = "11px JetBrains Mono, monospace", e.textAlign = "left", e.fillStyle = "rgba(152,170,184,0.9)", e.fillText("Live: observed trades; reconciled after minute close", 8, 18);
        const D = Z * 0.5, c = Te * 0.35;
        e.fillStyle = "rgba(233,239,245,0.85)", e.font = "12px JetBrains Mono, monospace", e.fillText("Live observed (partial)", D - 80, c), e.restore();
      }
    }
    if (ce && gn.length === 0 && (e.save(), e.font = "11px JetBrains Mono, monospace", e.textAlign = "left", e.fillStyle = "rgba(255,140,0,0.9)", e.fillText("Depth gaps: no observation loaded", 8, Te * 0.5 - 10), e.fillStyle = "rgba(100,150,255,0.8)", e.fillText("Absorption: unavailable; see layer details", 8, Te * 0.5 + 10), e.restore()), S) {
      const D = Te * 0.2, c = Te, j = c - D, x = i.candles.map((P) => P.volume ?? 0).filter((P) => P > 0), M = x.length > 0 ? Math.max(...x) : 1, k = Math.max(2, rn * 0.7);
      i.candles.forEach((P, W) => {
        const F = P.volume ?? 0;
        if (F > 0) {
          const E = i.startIndex + W, w = be(E, i.startIndex), N = F / M * D * 0.95, R = c - N, Q = P.close >= P.open, le = r?.volume?.upColor || "#26a69a", X = r?.volume?.downColor || "#ef5350", H = Q ? le : X, K = parseInt(H.slice(1, 3), 16), ie = parseInt(H.slice(3, 5), 16), ae = parseInt(H.slice(5, 7), 16);
          e.fillStyle = `rgba(${K}, ${ie}, ${ae}, 0.45)`, e.fillRect(w - k / 2, R, k, N), e.strokeStyle = `rgba(${K}, ${ie}, ${ae}, 0.7)`, e.lineWidth = 1, e.beginPath(), e.moveTo(w - k / 2, R), e.lineTo(w + k / 2, R), e.stroke();
        }
      }), Bt === "volume" && (e.save(), i.candles.forEach((W, F) => {
        const E = W.volume ?? 0;
        if (E <= 0) return;
        const w = i.candles[F - 1]?.volume ?? 0, C = i.candles[F + 1]?.volume ?? 0;
        if (E < w || E < C) return;
        const N = i.startIndex + F, R = be(N, i.startIndex), le = E / M * D * 0.95, X = c - le;
        e.beginPath(), e.arc(R, X, 2.5 + 1, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc(R, X, 2.5, 0, Math.PI * 2);
        const H = W.close >= W.open;
        e.fillStyle = H ? r?.volume?.upColor || "#26a69a" : r?.volume?.downColor || "#ef5350", e.fill();
      }), e.restore()), on.current.volume = { top: j, bottom: c };
    }
    if (e.restore(), r) {
      if (r.ema?.enabled && s?.ema && r.ema.periods?.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = ar ? ["#D1D4DC", "#A0A4B0", "#B2B5BE", "#9598A1", "#787B86"] : ["#363A45", "#5D606B", "#434651", "#787B86", "#9598A1"];
        r.ema.periods.forEach((j, x) => {
          const M = s.ema[x];
          if (!M) return;
          e.strokeStyle = c[x % c.length], e.lineWidth = 1.5, e.beginPath();
          let k = !1;
          i.candles.forEach((P, W) => {
            const F = i.startIndex + W, E = M[F];
            if (!isNaN(E) && isFinite(E)) {
              const w = be(F, i.startIndex), C = St(E, Ye);
              k ? e.lineTo(w, C) : (e.moveTo(w, C), k = !0);
            }
          }), e.stroke();
        }), e.restore();
      }
      if (s?.movingAverages && s.movingAverages.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = r?.movingAverages?.lineWidth ?? 1.5;
        s.movingAverages.forEach((j) => {
          e.strokeStyle = j.color, e.lineWidth = c, e.beginPath();
          let x = !1;
          i.candles.forEach((M, k) => {
            const P = i.startIndex + k, W = j.data[P];
            if (!isNaN(W) && isFinite(W)) {
              const F = be(P, i.startIndex), E = St(W, Ye);
              x ? e.lineTo(F, E) : (e.moveTo(F, E), x = !0);
            }
          }), e.stroke();
        }), e.restore();
      }
      if (r.bollinger?.enabled && s?.bollinger) {
        const c = s.bollinger;
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const j = r.bollinger.lineWidth || 1, x = r.bollinger.upperColor || "#9B59B6", M = r.bollinger.middleColor || "#9B59B6", k = r.bollinger.lowerColor || "#9B59B6";
        e.strokeStyle = x, e.lineWidth = j, e.setLineDash([3, 3]), e.beginPath();
        let P = !1;
        i.candles.forEach((W, F) => {
          const E = i.startIndex + F, w = c.upper[E];
          if (!isNaN(w) && isFinite(w)) {
            const C = be(E, i.startIndex), N = St(w, Ye);
            P ? e.lineTo(C, N) : (e.moveTo(C, N), P = !0);
          }
        }), e.stroke(), e.strokeStyle = M, e.lineWidth = j, e.setLineDash([]), e.beginPath(), P = !1, i.candles.forEach((W, F) => {
          const E = i.startIndex + F, w = c.middle[E];
          if (!isNaN(w) && isFinite(w)) {
            const C = be(E, i.startIndex), N = St(w, Ye);
            P ? e.lineTo(C, N) : (e.moveTo(C, N), P = !0);
          }
        }), e.stroke(), e.strokeStyle = k, e.lineWidth = j, e.setLineDash([3, 3]), e.beginPath(), P = !1, i.candles.forEach((W, F) => {
          const E = i.startIndex + F, w = c.lower[E];
          if (!isNaN(w) && isFinite(w)) {
            const C = be(E, i.startIndex), N = St(w, Ye);
            P ? e.lineTo(C, N) : (e.moveTo(C, N), P = !0);
          }
        }), e.stroke(), e.setLineDash([]), e.restore();
      }
      if (s?.vwap) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip(), e.strokeStyle = r?.vwap?.color || "#2196F3", e.lineWidth = 2, e.beginPath();
        let c = !1;
        i.candles.forEach((j, x) => {
          const M = i.startIndex + x, k = s.vwap[M];
          if (!isNaN(k) && isFinite(k)) {
            const P = be(M, i.startIndex), W = St(k, Ye);
            c ? e.lineTo(P, W) : (e.moveTo(P, W), c = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (s?.ichimoku) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = s.ichimoku, j = r?.ichimoku?.tenkanColor || "#0496ff", x = r?.ichimoku?.kijunColor || "#ff0000", M = r?.ichimoku?.cloudUpColor || "rgba(0, 255, 0, 0.2)", k = r?.ichimoku?.cloudDownColor || "rgba(255, 0, 0, 0.2)";
        for (let W = 0; W < i.candles.length; W++) {
          const F = i.startIndex + W, E = c.senkouA[F], w = c.senkouB[F];
          if (!isNaN(E) && !isNaN(w) && isFinite(E) && isFinite(w)) {
            const C = be(F, i.startIndex), N = St(E, Ye), R = St(w, Ye);
            e.fillStyle = E >= w ? M : k;
            const Q = rn * (1 + Qe);
            e.fillRect(C - Q / 2, Math.min(N, R), Q, Math.abs(N - R));
          }
        }
        e.strokeStyle = j, e.lineWidth = 1.5, e.beginPath();
        let P = !1;
        i.candles.forEach((W, F) => {
          const E = i.startIndex + F, w = c.tenkan[E];
          if (!isNaN(w) && isFinite(w)) {
            const C = be(E, i.startIndex), N = St(w, Ye);
            P ? e.lineTo(C, N) : (e.moveTo(C, N), P = !0);
          }
        }), e.stroke(), e.strokeStyle = x, e.lineWidth = 1.5, e.beginPath(), P = !1, i.candles.forEach((W, F) => {
          const E = i.startIndex + F, w = c.kijun[E];
          if (!isNaN(w) && isFinite(w)) {
            const C = be(E, i.startIndex), N = St(w, Ye);
            P ? e.lineTo(C, N) : (e.moveTo(C, N), P = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (s?.parabolicSAR) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = s.parabolicSAR, j = r?.parabolicSAR?.bullishColor || "#22c55e", x = r?.parabolicSAR?.bearishColor || "#ef4444";
        i.candles.forEach((M, k) => {
          const P = i.startIndex + k, W = c.sar[P], F = c.direction[P];
          if (!isNaN(W) && isFinite(W)) {
            const E = be(P, i.startIndex), w = St(W, Ye);
            e.fillStyle = F > 0 ? j : x, e.beginPath(), e.arc(E, w, 2.5, 0, Math.PI * 2), e.fill();
          }
        }), e.restore();
      }
      if (s?.keltner) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = s.keltner, j = r?.keltner?.upperColor || "#FF9800", x = r?.keltner?.middleColor || "#FF9800", M = r?.keltner?.lowerColor || "#FF9800";
        e.strokeStyle = j, e.lineWidth = 1, e.setLineDash([3, 3]), e.beginPath();
        let k = !1;
        i.candles.forEach((P, W) => {
          const F = i.startIndex + W, E = c.upper[F];
          if (!isNaN(E) && isFinite(E)) {
            const w = be(F, i.startIndex), C = St(E, Ye);
            k ? e.lineTo(w, C) : (e.moveTo(w, C), k = !0);
          }
        }), e.stroke(), e.strokeStyle = x, e.setLineDash([]), e.beginPath(), k = !1, i.candles.forEach((P, W) => {
          const F = i.startIndex + W, E = c.middle[F];
          if (!isNaN(E) && isFinite(E)) {
            const w = be(F, i.startIndex), C = St(E, Ye);
            k ? e.lineTo(w, C) : (e.moveTo(w, C), k = !0);
          }
        }), e.stroke(), e.strokeStyle = M, e.setLineDash([3, 3]), e.beginPath(), k = !1, i.candles.forEach((P, W) => {
          const F = i.startIndex + W, E = c.lower[F];
          if (!isNaN(E) && isFinite(E)) {
            const w = be(F, i.startIndex), C = St(E, Ye);
            k ? e.lineTo(w, C) : (e.moveTo(w, C), k = !0);
          }
        }), e.stroke(), e.setLineDash([]), e.restore();
      }
      if (s?.pivotPoints) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = s.pivotPoints, j = r?.pivotPoints?.pivotColor || "#FFEB3B", x = r?.pivotPoints?.resistanceColor || "#ef4444", M = r?.pivotPoints?.supportColor || "#22c55e", k = (P, W, F, E = []) => {
          const w = P.filter((C) => !isNaN(C) && isFinite(C)).pop();
          if (w !== void 0) {
            const C = St(w, Ye);
            e.strokeStyle = W, e.lineWidth = 1, e.setLineDash(E), e.beginPath(), e.moveTo(0, C), e.lineTo(Z, C), e.stroke(), e.fillStyle = W, e.font = Jt, e.textAlign = "left", e.fillText(F, 5, C - 3);
          }
        };
        e.setLineDash([]), k(c.pivot, j, "P"), k(c.r1, x, "R1", [2, 2]), k(c.r2, x, "R2", [4, 2]), k(c.r3, x, "R3", [6, 2]), k(c.s1, M, "S1", [2, 2]), k(c.s2, M, "S2", [4, 2]), k(c.s3, M, "S3", [6, 2]), e.setLineDash([]), e.restore();
      }
      if (s?.supertrend) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = s.supertrend, j = r?.supertrend?.bullishColor || "#22c55e", x = r?.supertrend?.bearishColor || "#ef4444";
        e.lineWidth = r?.supertrend?.lineWidth || 2, i.candles.forEach((M, k) => {
          const P = i.startIndex + k, W = c.supertrend[P];
          if (isNaN(W) || !isFinite(W)) return;
          const F = be(P, i.startIndex), E = St(W, Ye), w = P - 1;
          w >= 0 && !isNaN(c.supertrend[w]) && (e.strokeStyle = c.direction[P] === 1 ? j : x, e.beginPath(), e.moveTo(be(w, i.startIndex), St(c.supertrend[w], Ye)), e.lineTo(F, E), e.stroke());
        }), e.restore();
      }
      if (s?.donchian) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = s.donchian, j = (x, M, k = []) => {
          e.strokeStyle = M, e.lineWidth = r?.donchian?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let P = !1;
          i.candles.forEach((W, F) => {
            const E = i.startIndex + F, w = x[E];
            if (!isNaN(w) && isFinite(w)) {
              const C = be(E, i.startIndex), N = St(w, Ye);
              P ? e.lineTo(C, N) : (e.moveTo(C, N), P = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        j(c.upper, r?.donchian?.upperColor || "#2196F3"), j(c.middle, r?.donchian?.middleColor || "#FFC107", [4, 4]), j(c.lower, r?.donchian?.lowerColor || "#2196F3"), e.restore();
      }
      if (s?.envelopes) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = s.envelopes, j = (x, M, k = []) => {
          e.strokeStyle = M, e.lineWidth = r?.envelopes?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let P = !1;
          i.candles.forEach((W, F) => {
            const E = i.startIndex + F, w = x[E];
            if (!isNaN(w) && isFinite(w)) {
              const C = be(E, i.startIndex);
              P ? e.lineTo(C, St(w, Ye)) : (e.moveTo(C, St(w, Ye)), P = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        j(c.upper, r?.envelopes?.upperColor || "#00BCD4"), j(c.middle, r?.envelopes?.middleColor || "#FFC107", [3, 3]), j(c.lower, r?.envelopes?.lowerColor || "#00BCD4"), e.restore();
      }
      if ([
        { key: "dema", defaultColor: "#FF9800", label: "DEMA" },
        { key: "tema", defaultColor: "#E91E63", label: "TEMA" },
        { key: "hma", defaultColor: "#00E676", label: "HMA" }
      ].forEach(({ key: c, defaultColor: j }) => {
        const x = s?.[c];
        if (!x) return;
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip(), e.strokeStyle = r?.[c]?.color || j, e.lineWidth = r?.[c]?.lineWidth || 2, e.beginPath();
        let M = !1;
        i.candles.forEach((k, P) => {
          const W = i.startIndex + P, F = x[W];
          if (!isNaN(F) && isFinite(F)) {
            const E = be(W, i.startIndex), w = St(F, Ye);
            M ? e.lineTo(E, w) : (e.moveTo(E, w), M = !0);
          }
        }), e.stroke(), e.restore();
      }), s?.linearReg) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = s.linearReg, j = (x, M, k = []) => {
          e.strokeStyle = M, e.lineWidth = r?.linearReg?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let P = !1;
          i.candles.forEach((W, F) => {
            const E = i.startIndex + F, w = x[E];
            if (!isNaN(w) && isFinite(w)) {
              const C = be(E, i.startIndex);
              P ? e.lineTo(C, St(w, Ye)) : (e.moveTo(C, St(w, Ye)), P = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        j(c.upper, r?.linearReg?.upperColor || "#81D4FA"), j(c.middle, r?.linearReg?.middleColor || "#29B6F6", [4, 4]), j(c.lower, r?.linearReg?.lowerColor || "#81D4FA"), e.restore();
      }
      if (s?.fibRetracement) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = s.fibRetracement, j = r?.fibRetracement?.color || "#FFD54F", x = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
        c.levels.forEach((M, k) => {
          const P = St(M, Ye);
          e.strokeStyle = j, e.lineWidth = r?.fibRetracement?.lineWidth || 1, e.setLineDash(k === 0 || k === 6 ? [] : [4, 3]), e.beginPath(), e.moveTo(0, P), e.lineTo(Z, P), e.stroke(), e.fillStyle = j, e.font = Jt, e.textAlign = "left", e.fillText(`${(x[k] * 100).toFixed(1)}% (${M.toFixed(2)})`, 5, P - 3);
        }), e.setLineDash([]), e.restore();
      }
      if (s?.camarillaPivots) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = s.camarillaPivots, j = r?.camarillaPivots?.resistanceColor || "#ef4444", x = r?.camarillaPivots?.supportColor || "#22c55e", M = (k, P, W) => {
          const F = k.filter((E) => !isNaN(E) && isFinite(E)).pop();
          if (F !== void 0) {
            const E = St(F, Ye);
            e.strokeStyle = P, e.lineWidth = r?.camarillaPivots?.lineWidth || 1, e.setLineDash([3, 3]), e.beginPath(), e.moveTo(0, E), e.lineTo(Z, E), e.stroke(), e.fillStyle = P, e.font = Jt, e.textAlign = "left", e.fillText(W, 5, E - 3);
          }
        };
        M(c.h4, j, "H4"), M(c.h3, j, "H3"), M(c.l3, x, "L3"), M(c.l4, x, "L4"), e.setLineDash([]), e.restore();
      }
      if (s?.woodiePivots) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = s.woodiePivots, j = r?.woodiePivots?.pivotColor || "#FFEB3B", x = r?.woodiePivots?.resistanceColor || "#ef4444", M = r?.woodiePivots?.supportColor || "#22c55e", k = (P, W, F) => {
          const E = P.filter((w) => !isNaN(w) && isFinite(w)).pop();
          if (E !== void 0) {
            const w = St(E, Ye);
            e.strokeStyle = W, e.lineWidth = r?.woodiePivots?.lineWidth || 1, e.setLineDash([3, 3]), e.beginPath(), e.moveTo(0, w), e.lineTo(Z, w), e.stroke(), e.fillStyle = W, e.font = Jt, e.textAlign = "left", e.fillText(F, 5, w - 3);
          }
        };
        k(c.pivot, j, "WP"), k(c.r1, x, "WR1"), k(c.r2, x, "WR2"), k(c.s1, M, "WS1"), k(c.s2, M, "WS2"), e.setLineDash([]), e.restore();
      }
      if (s?.volumeSma && S) {
        e.save();
        const c = s.volumeSma, j = Te * 0.2, x = Te, M = i.candles.map((W) => W.volume || 0), k = Math.max(...M, 1);
        e.strokeStyle = r?.volumeSma?.color || "#FF9800", e.lineWidth = 1.5, e.beginPath();
        let P = !1;
        i.candles.forEach((W, F) => {
          const E = i.startIndex + F, w = c[E];
          if (!isNaN(w) && isFinite(w)) {
            const C = be(E, i.startIndex), N = x - w / k * j;
            P ? e.lineTo(C, N) : (e.moveTo(C, N), P = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (r?.volumeProfile?.enabled && i.candles.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
        const c = r.volumeProfile.numberOfRows ?? 48, j = Z * ((r.volumeProfile.rowWidth ?? 15) / 100), x = (r.volumeProfile.opacity ?? 60) / 100, M = r.volumeProfile.upColor || "#D97706", k = r.volumeProfile.downColor || "#1E3A8A", P = r.volumeProfile.pocColor || "#10B981", W = r.volumeProfile.lookbackBars ?? 0, F = W > 0 ? i.candles.slice(-W) : i.candles;
        let E = 1 / 0, w = -1 / 0;
        F.forEach((X) => {
          E = Math.min(E, X.low), w = Math.max(w, X.high);
        });
        const N = (w - E || 1) / c, R = [];
        for (let X = 0; X < c; X++)
          R.push({
            priceLevel: E + (X + 0.5) * N,
            upVolume: 0,
            downVolume: 0,
            totalVolume: 0
          });
        F.forEach((X) => {
          if (!X.volume || X.volume <= 0) return;
          const H = X.low, K = X.high, ie = K - H, ae = X.close >= X.open;
          for (let G = 0; G < c; G++) {
            const ke = E + G * N, Se = ke + N;
            if (K >= ke && H <= Se) {
              const ze = Math.max(H, ke), ut = Math.min(K, Se), we = ie > 0 ? (ut - ze) / ie : 1, mt = X.volume * we;
              ae ? R[G].upVolume += mt : R[G].downVolume += mt, R[G].totalVolume += mt;
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
            const ie = qe(H.priceLevel) - X / 2, ae = H.totalVolume / Q * j, G = H.totalVolume > 0 ? H.upVolume / H.totalVolume * ae : 0, ke = ae - G, Se = K === le, ze = Z - ae;
            G > 0 && (e.globalAlpha = Se ? Math.min(x + 0.2, 1) : x, e.fillStyle = M, e.fillRect(ze, ie, G, X)), ke > 0 && (e.globalAlpha = Se ? 0.95 : 0.85, e.fillStyle = k, e.fillRect(ze + G, ie, ke, X)), Se && (e.globalAlpha = 0.9, e.strokeStyle = P, e.lineWidth = 1.5, e.strokeRect(ze, ie, ae, X));
          }), e.globalAlpha = 1, Bt === "volumeProfile" && R.forEach((K, ie) => {
            if (K.totalVolume <= 0) return;
            const ae = qe(K.priceLevel), G = K.totalVolume / Q * j, ke = Z - G;
            e.beginPath(), e.arc(ke, ae, 2.5 + 1, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc(ke, ae, 2.5, 0, Math.PI * 2), e.fillStyle = K.upVolume >= K.downVolume ? M : k, e.fill();
          });
        }
        e.restore(), e.restore();
      }
    }
    const zs = [], As = [];
    let Yo = "", Bl = "", po = 14, Wl = 0, Dl = 0;
    const wi = Is?.current && Is.current.length > 0;
    if (Ts && !wi && rs) {
      const D = rs.find((c) => c.id === Ts);
      if (D && D.points && D.points.length > 0) {
        e.save();
        const c = Ze.badgeFont, j = "#2962ff", x = "rgba(41, 98, 255, 0.2)", M = Ze.badgePadding, k = Ze.badgeRowHeight, P = Je - 6, W = Z + 3, F = xe.height - Nt, E = F + (Nt - k) / 2;
        if (Yo = c, Bl = j, po = k, Wl = E, Dl = W, D.points.forEach((w) => {
          let C = null, N = null;
          if (w.price !== void 0 && (N = qe(w.price), N >= 0 && N <= Te)) {
            const R = Fn(w.price), Q = e.measureText(R).width, le = Math.min(Q + M * 2, P), X = N - k / 2;
            As.push({
              pos: N,
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
              const Q = je.current.startIndex, X = je.current.candleWidth * (1 + Qe), H = Math.floor(Q), K = (Q - H) * X;
              C = (R - H) * X + X / 2 - K;
            }
            if (C !== null && C >= 0 && C <= Z) {
              const Q = `${fr(w.time)} ${ss(w.time, !0)}  ${Es(w.time)}`, X = e.measureText(Q).width + M * 2;
              let H = C - X / 2;
              H < 0 && (H = 0), H + X > Z && (H = Z - X), zs.push({
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
            const N = Fn(w), R = e.measureText(N).width, Q = Math.min(R + M * 2, P), le = C - k / 2;
            As.push({
              pos: C,
              text: N,
              bWidth: Q,
              topOrigin: le
            });
          }
        }
        if (zs.length >= 2) {
          const w = Math.min(...zs.map((N) => N.pos)), C = Math.max(...zs.map((N) => N.pos));
          C > w && (e.fillStyle = x, e.fillRect(w, F, C - w, Nt));
        }
        if (As.length >= 2) {
          const w = Math.min(...As.map((N) => N.pos)), C = Math.max(...As.map((N) => N.pos));
          C > w && (e.fillStyle = x, e.fillRect(W - 3, w, Je, C - w));
        }
        e.restore();
      }
    }
    e.fillStyle = te.axisLabel || "#787b86", e.font = Eo, e.textBaseline = "middle", e.textAlign = Ze.priceLabelAlign;
    const Si = Ze.priceLabelAlign === "right" ? b - (Un !== void 0 ? Un : Ol) - 4 : Z + 2;
    let Er = -1 / 0;
    for (let D = Mr; D <= Ye.max; D += Xo) {
      const c = qe(D);
      if (c >= 10 && c <= Te - 10) {
        if (Math.abs(c - Er) < Tr) continue;
        Er = c, e.fillText(Fn(D), Si, c);
      }
    }
    const nn = n != null && !Number.isNaN(n) ? n : i.candles.length ? i.candles[i.candles.length - 1].close : null;
    if (nn != null && !Number.isNaN(nn) && !Wt) {
      const D = qe(nn);
      if (D >= 0 && D <= Te) {
        e.save();
        const c = i.candles.length >= 2 ? i.candles[i.candles.length - 2] : null, j = i.candles.length >= 1 ? i.candles[i.candles.length - 1] : null, x = c ? c.close : j ? j.open : nn, M = nn >= x, k = te.priceTickerBullish || te.bullish, P = te.priceTickerBearish || te.bearish, W = M ? k : P, F = (De) => {
          const Ke = De.replace("#", ""), ft = parseInt(Ke.substring(0, 2), 16), Ee = parseInt(Ke.substring(2, 4), 16), Lt = parseInt(Ke.substring(4, 6), 16);
          return `${ft}, ${Ee}, ${Lt}`;
        }, E = F(te.textDim || "#666666"), w = `rgba(${E}, 0.35)`, C = `rgba(${E}, 0.9)`, N = F(W).split(",").map(Number), R = (0.299 * N[0] + 0.587 * N[1] + 0.114 * N[2]) / 255, Q = Number.isNaN(R) || R <= 0.55 ? "#ffffff" : "#000000", le = i.candles.length - 1, X = i.candles.length > 0 ? be(i.startIndex + le, i.startIndex) : 0;
        X > 0 && (e.strokeStyle = w, e.lineWidth = 1, e.setLineDash([4, 4]), e.beginPath(), e.moveTo(0, D), e.lineTo(X, D), e.stroke(), e.setLineDash([])), e.strokeStyle = C, e.lineWidth = 1, e.setLineDash([4, 3]), e.beginPath(), e.moveTo(X, D), e.lineTo(Z, D), e.stroke(), e.setLineDash([]);
        const H = Fn(nn), K = Eo, ie = Ze.liveCountdownFont;
        e.font = K;
        const G = e.measureText(H).width, ke = Ze.livePriceLabelPadding, Se = Ze.livePriceRowHeight, ze = T && T.length > 0, ut = ze ? Ze.countdownRowHeight : 0, we = Se + ut;
        let mt = 0;
        ze && (e.font = ie, mt = e.measureText(T).width);
        const gt = Je - 6, tt = Math.max(G, mt) + ke * 2, Re = Math.min(tt, gt), Ce = Z + 3, We = D - Se / 2;
        e.fillStyle = te.background, e.fillRect(Ce - 1, We - 1, Re + 2, we + 2), e.fillStyle = W, e.beginPath(), e.roundRect(Ce, We, Re, we, 3), e.fill(), e.fillStyle = Q, e.font = K, e.textAlign = "center", e.textBaseline = "middle", e.fillText(H, Ce + Re / 2, We + Se / 2), ze && (e.strokeStyle = Q === "#ffffff" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)", e.lineWidth = 0.5, e.beginPath(), e.moveTo(Ce + 3, We + Se), e.lineTo(Ce + Re - 3, We + Se), e.stroke(), e.fillStyle = Q === "#ffffff" ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)", e.font = ie, e.textAlign = "center", e.textBaseline = "middle", e.fillText(T, Ce + Re / 2, We + Se + ut / 2)), e.restore();
      }
    }
    if (rs && rs.length > 0) {
      e.save();
      const D = Eo;
      e.font = D;
      const c = Ze.badgePadding, j = Ze.badgeRowHeight, x = [], M = [];
      rs.forEach((C) => {
        if ((C.type === "horizontalRay" || C.type === "horizontal") && C.points.length > 0) {
          const N = C.points[0].price;
          x.push({ price: N, color: C.color || "#2196f3", yPos: qe(N) });
        } else if ((C.type === "long" || C.type === "short") && C.points.length >= 2) {
          if (C.id === Ts) return;
          const N = C.points[0].price, R = C.points[1].price;
          if (x.push({ price: N, color: "#4b5563", yPos: qe(N) }), x.push({ price: R, color: "#22c55e", yPos: qe(R) }), C.stopLoss) {
            const Q = C.stopLoss.price;
            x.push({ price: Q, color: "#ef4444", yPos: qe(Q) });
          }
        }
      });
      let k = -9999, P = -9999;
      if (nn != null && !Number.isNaN(nn)) {
        const C = qe(nn), N = Ze.livePriceRowHeight + (T && T.length > 0 ? Ze.countdownRowHeight : 0);
        k = C - Ze.livePriceRowHeight / 2, P = k + N;
      }
      const W = 2, F = Je - 6, E = Z + 3;
      x.sort((C, N) => C.yPos - N.yPos);
      let w = -9999;
      x.forEach((C) => {
        let N = C.yPos - j / 2, R = N + j;
        if (N < w + W && (N = w + W, R = N + j), N < P + W && R > k - W && (N = P + W, R = N + j), w = R, N >= 0 && R <= Te) {
          const Q = Fn(C.price), le = e.measureText(Q).width, X = Math.min(le + c * 2, F);
          e.fillStyle = C.color, e.beginPath(), e.roundRect(E, N, X, j, 3), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.fillText(Q, E + X / 2, N + j / 2);
        }
      }), e.font = Ze.alertFlagFont, M.forEach((C) => {
        if (C.xPos >= 0 && C.xPos <= Z) {
          const N = ss(C.time, !0) + " " + Es(C.time), Q = e.measureText(N).width + c * 2, X = xe.height - Nt + (Nt - j) / 2;
          let H = C.xPos - Q / 2;
          H < 0 && (H = 0), H + Q > Z && (H = Z - Q), e.fillStyle = C.color, e.beginPath(), e.roundRect(H, X, Q, j, 3), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.fillText(N, H + Q / 2, X + j / 2);
        }
      }), e.restore();
    }
    if (Wt && nn !== null && nn !== void 0 && !Number.isNaN(nn)) {
      const D = $t != null && cn != null && Number.isFinite($t) && Number.isFinite(cn), c = D ? $t : nn, j = D ? cn : nn + dd(d || ""), x = qe(c), M = qe(j);
      if (e.save(), x >= 0 && x <= Te) {
        e.strokeStyle = "#1976d2", e.lineWidth = 1, e.setLineDash([3, 4]), e.beginPath(), e.moveTo(0, x), e.lineTo(Z, x), e.stroke(), e.setLineDash([]);
        const k = Fn(c);
        e.font = Ze.alertCountFont;
        const W = e.measureText(k).width + 12, F = 16, E = Z + 2;
        e.fillStyle = "#1976d2", e.beginPath(), e.roundRect(E, x - F / 2, Math.min(W, Je - 4), F, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "left", e.textBaseline = "middle", e.fillText(k, E + 6, x);
      }
      if (M >= 0 && M <= Te) {
        e.strokeStyle = "#d32f2f", e.lineWidth = 1, e.setLineDash([3, 4]), e.beginPath(), e.moveTo(0, M), e.lineTo(Z, M), e.stroke(), e.setLineDash([]);
        const k = Fn(j);
        e.font = Ze.alertCountFont;
        const W = e.measureText(k).width + 12, F = 16, E = Z + 2;
        e.fillStyle = "#d32f2f", e.beginPath(), e.roundRect(E, M - F / 2, Math.min(W, Je - 4), F, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "left", e.textBaseline = "middle", e.fillText(k, E + 6, M);
      }
      x >= 0 && M >= 0 && x <= Te && M <= Te && (e.fillStyle = "rgba(148, 163, 184, 0.04)", e.fillRect(0, Math.min(M, x), Z, Math.abs(x - M))), e.restore();
    }
    if ($e && $e.length > 0) {
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
        selectedPositionId: Ae.current,
        slDraft: wt.current,
        tpDraft: vt.current,
        hoveredSLTP: $n.current,
        draggingHandle: yt.current,
        defaultOffset: Gn(0) || void 0
      };
      Lu(D, $e), Eu(D, $e);
    }
    if (Bt && !Bt.startsWith("sp-") && s) {
      const D = Ye;
      if (D && Te > 0) {
        const x = (k, P) => {
          e.save(), e.beginPath(), e.rect(0, 0, Z, Te), e.clip();
          for (let W = 0; W < i.candles.length; W += 8) {
            const F = i.startIndex + W;
            if (F >= k.length) continue;
            const E = k[F];
            if (isNaN(E) || !isFinite(E)) continue;
            const w = be(F, i.startIndex), C = Te - (E - D.min) / D.range * Te;
            e.beginPath(), e.arc(w, C, 3.5, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc(w, C, 2.5, 0, Math.PI * 2), e.fillStyle = P, e.fill();
          }
          e.restore();
        }, M = Bt;
        if (M === "movingAverages" && s.movingAverages)
          for (const k of s.movingAverages) x(k.data, k.color);
        else if (M?.startsWith("movingAverages__") && s.movingAverages) {
          const k = parseInt(M.slice(16), 10), P = s.movingAverages[k];
          P && x(P.data, P.color);
        } else if (M === "bollinger" && s.bollinger) {
          const k = s.bollinger;
          x(k.upper, r?.bollinger?.upperColor || "#9B59B6"), x(k.middle, r?.bollinger?.middleColor || "#9B59B6"), x(k.lower, r?.bollinger?.lowerColor || "#9B59B6");
        } else if (M === "vwap" && s.vwap)
          x(s.vwap, "#ff9800");
        else if (M === "ichimoku" && s.ichimoku) {
          const k = s.ichimoku;
          x(k.tenkan, "#0094FF"), x(k.kijun, "#AD1457"), x(k.senkouA, "#4CAF50"), x(k.senkouB, "#FF5722");
        } else if (M === "keltner" && s.keltner)
          x(s.keltner.upper, "#3b82f6"), x(s.keltner.middle, "#3b82f6"), x(s.keltner.lower, "#3b82f6");
        else if (M === "donchian" && s.donchian)
          x(s.donchian.upper, "#3b82f6"), x(s.donchian.middle, "#3b82f6"), x(s.donchian.lower, "#3b82f6");
        else if (M === "envelopes" && s.envelopes)
          x(s.envelopes.upper, "#3b82f6"), x(s.envelopes.basis, "#3b82f6"), x(s.envelopes.lower, "#3b82f6");
        else if (M === "supertrend" && s.supertrend) {
          const k = s.supertrend.map((P) => P?.value ?? NaN);
          x(k, "#3b82f6");
        } else if (["dema", "tema", "hma"].includes(M)) {
          const k = s[M];
          Array.isArray(k) && x(k, "#3b82f6");
        } else if (M.startsWith("ci-") && r?.customIndicators) {
          const k = r.customIndicators.find((W) => `ci-${W.id}` === M), P = k?.data;
          k && P && Array.isArray(P) && x(P, k.color);
        } else if (M.startsWith("script-") && r?.customIndicators) {
          const k = M.slice(7);
          for (const P of r.customIndicators) {
            if (P.scriptId !== k) continue;
            const W = P.data;
            W && Array.isArray(W) && x(W, P.color);
          }
        }
      }
    }
    let Ut = Te;
    if (s?.rsi) {
      const D = os, c = Ut, j = c + D, x = r?.rsi?.style || {};
      x.backgroundColor && (e.fillStyle = x.backgroundColor, e.globalAlpha = x.backgroundOpacity ?? 0.3, e.fillRect(0, c, Z, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(Z, c), e.stroke();
      const M = (H) => c + D - H / 100 * D, k = r?.rsi?.overbought ?? 70, P = r?.rsi?.oversold ?? 30;
      if (x.showZones) {
        const H = M(k), K = M(P), ie = x.zoneOpacity ?? 0.1;
        e.fillStyle = x.overboughtZoneColor || "#ff4444", e.globalAlpha = ie, e.fillRect(0, c, Z, H - c), e.fillStyle = x.oversoldZoneColor || "#44ff44", e.fillRect(0, K, Z, j - K), e.globalAlpha = 1;
      }
      if (x.showGrid !== !1) {
        const H = x.gridColor || "rgba(150, 150, 150, 0.3)";
        e.setLineDash([4, 4]), [P, 50, k].forEach((K) => {
          e.beginPath(), K === 50 ? (e.strokeStyle = H, e.lineWidth = 1) : (e.strokeStyle = "rgba(180, 130, 80, 0.8)", e.lineWidth = 1.5);
          const ie = M(K);
          e.moveTo(0, ie), e.lineTo(Z, ie), e.stroke();
        }), e.setLineDash([]), e.lineWidth = 1;
      }
      const W = r?.rsi?.color || "#E74C3C", F = x.lineWidth ?? 1.5;
      e.strokeStyle = W, e.lineWidth = F, e.beginPath();
      let E = !1;
      i.candles.forEach((H, K) => {
        const ie = i.startIndex + K, ae = s.rsi[ie];
        if (!isNaN(ae) && isFinite(ae)) {
          const G = be(ie, i.startIndex), ke = M(ae);
          E ? e.lineTo(G, ke) : (e.moveTo(G, ke), E = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Jt, e.textAlign = "left", [0, P, 50, k, 100].forEach((H) => {
        const K = M(H);
        e.fillText(H.toString(), Z + 5, K);
      }), on.current.rsi = { top: c, bottom: j };
      const w = Ct.current !== null ? Ct.current : i.startIndex + i.candles.length - 1, C = s.rsi[w], N = !isNaN(C) && isFinite(C) ? C.toFixed(2) : "--", R = `RSI ${r?.rsi?.period || 14} close`, Q = r?.rsi?.style?.customLabel || R, le = r?.rsi?.style?.labelColor || "#d1d5db";
      e.fillStyle = le, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left", e.fillText(Q, 5, c + 15), e.fillStyle = W, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
      const X = e.measureText(Q).width;
      e.fillText(N, 13 + X, c + 15), Yn.current.rsi = 13 + X + e.measureText(N).width + 8, Ut = j;
    }
    if (s?.macd) {
      const D = os, c = Ut, j = c + D, x = r?.macd?.style || {};
      x.backgroundColor && (e.fillStyle = x.backgroundColor, e.globalAlpha = x.backgroundOpacity ?? 0.3, e.fillRect(0, c, Z, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(Z, c), e.stroke();
      const M = s.macd.macd.slice(i.startIndex, i.endIndex), k = s.macd.signal.slice(i.startIndex, i.endIndex), P = s.macd.histogram.slice(i.startIndex, i.endIndex), W = [...M, ...k, ...P].filter((We) => !isNaN(We) && isFinite(We)), F = Math.min(...W, 0), w = Math.max(...W, 0) - F || 1, C = (We) => c + D - (We - F) / w * D;
      if (x.showGrid !== !1) {
        e.strokeStyle = x.gridColor || te.grid, e.setLineDash([2, 2]), e.beginPath();
        const We = C(0);
        e.moveTo(0, We), e.lineTo(Z, We), e.stroke(), e.setLineDash([]);
      }
      const N = Math.max(2, rn * 0.5), R = r?.macd?.histogramUpColor || "#26a69a", Q = r?.macd?.histogramDownColor || "#ef5350", le = C(0);
      i.candles.forEach((We, De) => {
        const Ke = i.startIndex + De, ft = s.macd.histogram[Ke];
        if (!isNaN(ft) && isFinite(ft)) {
          const Ee = be(Ke, i.startIndex), Lt = C(ft), Xt = Math.abs(le - Lt);
          e.fillStyle = ft >= 0 ? R : Q, ft >= 0 ? e.fillRect(Ee - N / 2, Lt, N, Xt) : e.fillRect(Ee - N / 2, le, N, Xt);
        }
      });
      const X = r?.macd?.macdColor || "#3498DB";
      e.strokeStyle = X, e.lineWidth = 1.5, e.beginPath();
      let H = !1;
      i.candles.forEach((We, De) => {
        const Ke = i.startIndex + De, ft = s.macd.macd[Ke];
        if (!isNaN(ft) && isFinite(ft)) {
          const Ee = be(Ke, i.startIndex), Lt = C(ft);
          H ? e.lineTo(Ee, Lt) : (e.moveTo(Ee, Lt), H = !0);
        }
      }), e.stroke();
      const K = r?.macd?.signalColor || "#E67E22";
      e.strokeStyle = K, e.lineWidth = 1.5, e.beginPath(), H = !1, i.candles.forEach((We, De) => {
        const Ke = i.startIndex + De, ft = s.macd.signal[Ke];
        if (!isNaN(ft) && isFinite(ft)) {
          const Ee = be(Ke, i.startIndex), Lt = C(ft);
          H ? e.lineTo(Ee, Lt) : (e.moveTo(Ee, Lt), H = !0);
        }
      }), e.stroke(), on.current.macd = { top: c, bottom: j };
      const ie = `MACD(${r?.macd?.fast || 12},${r?.macd?.slow || 26},${r?.macd?.signal || 9})`, ae = r?.macd?.style?.customLabel || ie, G = r?.macd?.style?.labelColor || te.textDim;
      e.fillStyle = G, e.font = `bold ${Jt}`, e.textAlign = "left";
      const ke = Ct.current !== null ? Ct.current : i.startIndex + i.candles.length - 1, Se = s.macd.macd[ke], ze = s.macd.signal[ke], ut = s.macd.histogram[ke];
      e.fillText(ae, 5, c + 12), e.fillStyle = X, e.font = Jt;
      const we = e.measureText(ae).width, mt = !isNaN(Se) && isFinite(Se) ? Se.toFixed(4) : "--";
      e.fillText(mt, 10 + we, c + 12), e.fillStyle = K;
      const gt = !isNaN(ze) && isFinite(ze) ? ze.toFixed(4) : "--", tt = e.measureText(mt).width;
      e.fillText(gt, 16 + we + tt, c + 12);
      const Re = !isNaN(ut) && isFinite(ut) ? ut.toFixed(4) : "--";
      e.fillStyle = ut >= 0 ? "#00ff88" : "#ff0080";
      const Ce = e.measureText(gt).width;
      e.fillText(Re, 22 + we + tt + Ce, c + 12), Yn.current.macd = 22 + we + tt + Ce + e.measureText(Re).width + 8, Ut = j;
    }
    if (s?.atr) {
      const D = os, c = Ut, j = c + D, x = r?.atr?.style || {};
      x.backgroundColor && (e.fillStyle = x.backgroundColor, e.globalAlpha = x.backgroundOpacity ?? 0.3, e.fillRect(0, c, Z, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(Z, c), e.stroke();
      const M = s.atr.slice(i.startIndex, i.endIndex).filter((ie) => !isNaN(ie) && isFinite(ie)), k = Math.min(...M, 0), W = Math.max(...M) - k || 1, F = (ie) => c + D - (ie - k) / W * D, E = r?.atr?.color || "#17a2b8", w = x.lineWidth ?? 1.5;
      e.strokeStyle = E, e.lineWidth = w, e.beginPath();
      let C = !1;
      i.candles.forEach((ie, ae) => {
        const G = i.startIndex + ae, ke = s.atr[G];
        if (!isNaN(ke) && isFinite(ke)) {
          const Se = be(G, i.startIndex), ze = F(ke);
          C ? e.lineTo(Se, ze) : (e.moveTo(Se, ze), C = !0);
        }
      }), e.stroke(), on.current.atr = { top: c, bottom: j };
      const N = `ATR(${r?.atr?.period || 14})`, R = r?.atr?.style?.customLabel || N, Q = r?.atr?.style?.labelColor || te.textDim;
      e.fillStyle = Q, e.font = `bold ${Jt}`, e.textAlign = "left";
      const le = Ct.current !== null ? Ct.current : i.startIndex + i.candles.length - 1, X = s.atr[le], H = !isNaN(X) && isFinite(X) ? X.toFixed(5) : "--";
      e.fillText(R, 5, c + 12), e.fillStyle = E, e.font = Jt;
      const K = e.measureText(R).width;
      e.fillText(H, 10 + K, c + 12), Yn.current.atr = 10 + K + e.measureText(H).width + 8, Ut = j;
    }
    if (s?.stochastic) {
      const D = os, c = Ut, j = c + D, x = r?.stochastic?.style || {};
      x.backgroundColor && (e.fillStyle = x.backgroundColor, e.globalAlpha = x.backgroundOpacity ?? 0.3, e.fillRect(0, c, Z, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(Z, c), e.stroke();
      const M = (ae) => c + D - ae / 100 * D;
      e.strokeStyle = te.grid, e.setLineDash([2, 2]), e.beginPath();
      const k = r?.stochastic?.overbought ?? 80, P = r?.stochastic?.oversold ?? 20;
      [P, 50, k].forEach((ae) => {
        const G = M(ae);
        e.moveTo(0, G), e.lineTo(Z, G);
      }), e.stroke(), e.setLineDash([]);
      const W = r?.stochastic?.kColor || "#3498DB";
      e.strokeStyle = W, e.lineWidth = 1.5, e.beginPath();
      let F = !1;
      i.candles.forEach((ae, G) => {
        const ke = i.startIndex + G, Se = s.stochastic.k[ke];
        if (!isNaN(Se) && isFinite(Se)) {
          const ze = be(ke, i.startIndex), ut = M(Se);
          F ? e.lineTo(ze, ut) : (e.moveTo(ze, ut), F = !0);
        }
      }), e.stroke();
      const E = r?.stochastic?.dColor || "#E67E22";
      e.strokeStyle = E, e.lineWidth = 1.5, e.beginPath(), F = !1, i.candles.forEach((ae, G) => {
        const ke = i.startIndex + G, Se = s.stochastic.d[ke];
        if (!isNaN(Se) && isFinite(Se)) {
          const ze = be(ke, i.startIndex), ut = M(Se);
          F ? e.lineTo(ze, ut) : (e.moveTo(ze, ut), F = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Jt, e.textAlign = "left", [0, P, 50, k, 100].forEach((ae) => {
        const G = M(ae);
        e.fillText(ae.toString(), Z + 5, G);
      }), on.current.stochastic = { top: c, bottom: j };
      const w = `STOCH(${r?.stochastic?.kPeriod || 14},${r?.stochastic?.dPeriod || 3})`, C = r?.stochastic?.style?.customLabel || w, N = r?.stochastic?.style?.labelColor || te.textDim;
      e.fillStyle = N, e.font = `bold ${Jt}`, e.textAlign = "left";
      const R = Ct.current !== null ? Ct.current : i.startIndex + i.candles.length - 1, Q = s.stochastic.k[R], le = s.stochastic.d[R];
      e.fillText(C, 5, c + 12), e.fillStyle = W, e.font = Jt;
      const X = e.measureText(C).width, H = !isNaN(Q) && isFinite(Q) ? `%K ${Q.toFixed(2)}` : "%K --";
      e.fillText(H, 10 + X, c + 12), e.fillStyle = E;
      const K = e.measureText(H).width, ie = !isNaN(le) && isFinite(le) ? `%D ${le.toFixed(2)}` : "%D --";
      e.fillText(ie, 16 + X + K, c + 12), Yn.current.stochastic = 16 + X + K + e.measureText(ie).width + 8, Ut = j;
    }
    if (s?.williamsR) {
      const D = os, c = Ut, j = c + D, x = r?.williamsR?.style || {};
      x.backgroundColor && (e.fillStyle = x.backgroundColor, e.globalAlpha = x.backgroundOpacity ?? 0.3, e.fillRect(0, c, Z, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(Z, c), e.stroke();
      const M = (X) => c + D - (X + 100) / 100 * D, k = r?.williamsR?.overbought ?? -20, P = r?.williamsR?.oversold ?? -80;
      e.setLineDash([4, 4]), e.strokeStyle = x.gridColor || "rgba(180, 130, 80, 0.6)", [P, -50, k].forEach((X) => {
        e.beginPath();
        const H = M(X);
        e.moveTo(0, H), e.lineTo(Z, H), e.stroke();
      }), e.setLineDash([]);
      const W = r?.williamsR?.color || "#E91E63";
      e.strokeStyle = W, e.lineWidth = x.lineWidth ?? 1.5, e.beginPath();
      let F = !1;
      i.candles.forEach((X, H) => {
        const K = i.startIndex + H, ie = s.williamsR[K];
        if (!isNaN(ie) && isFinite(ie)) {
          const ae = be(K, i.startIndex), G = M(ie);
          F ? e.lineTo(ae, G) : (e.moveTo(ae, G), F = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Jt, e.textAlign = "left", [-100, P, -50, k, 0].forEach((X) => {
        const H = M(X);
        e.fillText(X.toString(), Z + 5, H);
      }), on.current.williamsR = { top: c, bottom: j };
      const E = `Williams %R ${r?.williamsR?.period || 14}`, w = r?.williamsR?.style?.customLabel || E, C = r?.williamsR?.style?.labelColor || "#d1d5db";
      e.fillStyle = C, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left";
      const N = Ct.current !== null ? Ct.current : i.startIndex + i.candles.length - 1, R = s.williamsR[N], Q = !isNaN(R) && isFinite(R) ? R.toFixed(2) : "--";
      e.fillText(w, 5, c + 15), e.fillStyle = W;
      const le = e.measureText(w).width;
      e.fillText(Q, 13 + le, c + 15), Yn.current.williamsR = 13 + le + e.measureText(Q).width + 8, Ut = j;
    }
    if (s?.cci) {
      const D = os, c = Ut, j = c + D, x = r?.cci?.style || {};
      x.backgroundColor && (e.fillStyle = x.backgroundColor, e.globalAlpha = x.backgroundOpacity ?? 0.3, e.fillRect(0, c, Z, D), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(Z, c), e.stroke();
      const M = i.candles.map((K, ie) => s.cci[i.startIndex + ie]).filter((K) => !isNaN(K) && isFinite(K)), k = M.length > 0 ? Math.max(200, Math.max(...M.map(Math.abs))) : 200, P = (K) => c + D / 2 - K / k * (D / 2), W = r?.cci?.overbought ?? 100, F = r?.cci?.oversold ?? -100;
      e.setLineDash([4, 4]), e.strokeStyle = x.gridColor || "rgba(180, 130, 80, 0.6)", [F, 0, W].forEach((K) => {
        e.beginPath();
        const ie = P(K);
        e.moveTo(0, ie), e.lineTo(Z, ie), e.stroke();
      }), e.setLineDash([]);
      const E = r?.cci?.color || "#00BCD4";
      e.strokeStyle = E, e.lineWidth = x.lineWidth ?? 1.5, e.beginPath();
      let w = !1;
      i.candles.forEach((K, ie) => {
        const ae = i.startIndex + ie, G = s.cci[ae];
        if (!isNaN(G) && isFinite(G)) {
          const ke = be(ae, i.startIndex), Se = P(G);
          w ? e.lineTo(ke, Se) : (e.moveTo(ke, Se), w = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Jt, e.textAlign = "left", [Math.round(-k), F, 0, W, Math.round(k)].forEach((K) => {
        const ie = P(K);
        e.fillText(K.toString(), Z + 5, ie);
      }), on.current.cci = { top: c, bottom: j };
      const C = `CCI ${r?.cci?.period || 20}`, N = r?.cci?.style?.customLabel || C, R = r?.cci?.style?.labelColor || "#d1d5db";
      e.fillStyle = R, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left";
      const Q = Ct.current !== null ? Ct.current : i.startIndex + i.candles.length - 1, le = s.cci[Q], X = !isNaN(le) && isFinite(le) ? le.toFixed(2) : "--";
      e.fillText(N, 5, c + 15), e.fillStyle = E;
      const H = e.measureText(N).width;
      e.fillText(X, 13 + H, c + 15), Yn.current.cci = 13 + H + e.measureText(X).width + 8, Ut = j;
    }
    if (s?.adx) {
      const D = os, c = Ut, j = c + D;
      e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(Z, c), e.stroke();
      const x = (w) => c + D - w / 100 * D;
      e.setLineDash([4, 4]), e.strokeStyle = "rgba(150, 150, 150, 0.3)", [25, 50, 75].forEach((w) => {
        e.beginPath(), e.moveTo(0, x(w)), e.lineTo(Z, x(w)), e.stroke();
      }), e.setLineDash([]);
      const M = r?.adx?.adxColor || "#FFEB3B", k = r?.adx?.plusDIColor || "#22c55e", P = r?.adx?.minusDIColor || "#ef4444";
      e.strokeStyle = k, e.lineWidth = 1, e.beginPath();
      let W = !1;
      i.candles.forEach((w, C) => {
        const N = i.startIndex + C, R = s.adx.plusDI[N];
        if (!isNaN(R) && isFinite(R)) {
          const Q = be(N, i.startIndex), le = x(R);
          W ? e.lineTo(Q, le) : (e.moveTo(Q, le), W = !0);
        }
      }), e.stroke(), e.strokeStyle = P, e.beginPath(), W = !1, i.candles.forEach((w, C) => {
        const N = i.startIndex + C, R = s.adx.minusDI[N];
        if (!isNaN(R) && isFinite(R)) {
          const Q = be(N, i.startIndex), le = x(R);
          W ? e.lineTo(Q, le) : (e.moveTo(Q, le), W = !0);
        }
      }), e.stroke(), e.strokeStyle = M, e.lineWidth = 2, e.beginPath(), W = !1, i.candles.forEach((w, C) => {
        const N = i.startIndex + C, R = s.adx.adx[N];
        if (!isNaN(R) && isFinite(R)) {
          const Q = be(N, i.startIndex), le = x(R);
          W ? e.lineTo(Q, le) : (e.moveTo(Q, le), W = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Jt, [0, 25, 50, 75, 100].forEach((w) => {
        e.fillText(w.toString(), Z + 5, x(w));
      });
      const F = Ct.current !== null ? Ct.current : i.startIndex + i.candles.length - 1, E = s.adx.adx[F];
      e.fillStyle = "#d1d5db", e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.fillText(`ADX ${r?.adx?.period || 14}`, 5, c + 15), e.fillStyle = M, e.fillText(!isNaN(E) && isFinite(E) ? E.toFixed(2) : "--", 73, c + 15), e.fillStyle = k, e.fillText("+DI", 118, c + 15), e.fillStyle = P, e.fillText("-DI", 148, c + 15), Yn.current.adx = 148 + e.measureText("-DI").width + 8, on.current.adx = { top: c, bottom: j }, Ut = j;
    }
    if (s?.roc) {
      const D = os, c = Ut, j = c + D;
      e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(Z, c), e.stroke();
      const x = i.candles.map((N, R) => s.roc[i.startIndex + R]).filter((N) => !isNaN(N) && isFinite(N)), M = x.length > 0 ? Math.max(5, Math.max(...x.map(Math.abs))) : 5, k = (N) => c + D / 2 - N / M * (D / 2);
      e.setLineDash([4, 4]), e.strokeStyle = "rgba(150, 150, 150, 0.5)", e.beginPath(), e.moveTo(0, k(0)), e.lineTo(Z, k(0)), e.stroke(), e.setLineDash([]);
      const P = r?.roc?.color || "#9C27B0";
      e.strokeStyle = P, e.lineWidth = 1.5, e.beginPath();
      let W = !1;
      i.candles.forEach((N, R) => {
        const Q = i.startIndex + R, le = s.roc[Q];
        if (!isNaN(le) && isFinite(le)) {
          const X = be(Q, i.startIndex), H = k(le);
          W ? e.lineTo(X, H) : (e.moveTo(X, H), W = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Jt, [-M, 0, M].forEach((N) => {
        e.fillText(N.toFixed(1) + "%", Z + 5, k(N));
      }), e.fillStyle = "#d1d5db", e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
      const F = Ct.current !== null ? Ct.current : i.startIndex + i.candles.length - 1, E = s.roc[F], w = !isNaN(E) && isFinite(E) ? E.toFixed(2) + "%" : "--";
      e.fillText(`ROC ${r?.roc?.period || 12}`, 5, c + 15), e.fillStyle = P;
      const C = e.measureText(`ROC ${r?.roc?.period || 12}`).width;
      e.fillText(w, 13 + C, c + 15), Yn.current.roc = 13 + C + e.measureText(w).width + 8, on.current.roc = { top: c, bottom: j }, Ut = j;
    }
    const Fl = {
      ctx: e,
      chartWidth: Z,
      subplotHeight: os,
      visible: i,
      indexToX: be,
      currentCandleWidth: rn,
      subplotLabelFont: Jt,
      hoveredCandleIndex: Ct.current,
      colors: { textDim: te.textDim, grid: te.grid },
      indicators: r,
      indicatorData: s,
      indicatorBounds: on.current,
      subplotLabelEndX: Yn.current,
      mainPriceToY: qe,
      mainChartHeight: Te,
      skipIndicators: O,
      clickedIndicatorKey: Bt
    };
    if (Au(Fl), Ut = Bu(Fl, Ut), Wu(Fl), it && it.length > 0 && i.candles.length > 0) {
      const D = (N) => N ? N.toUpperCase().trim().slice(0, 2) : "??", c = (N) => {
        if (N.datetime) {
          const R = new Date(N.datetime).getTime();
          if (!isNaN(R)) return R;
        }
        if (!N.date) return null;
        try {
          const [R, Q, le] = N.date.split("-").map(Number);
          if (!N.time) return Date.UTC(R, Q - 1, le, 12, 0);
          const X = N.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
          if (!X) return Date.UTC(R, Q - 1, le, 12, 0);
          let H = parseInt(X[1]);
          const K = parseInt(X[2]), ie = X[3]?.toUpperCase();
          return ie === "PM" && H !== 12 ? H += 12 : ie === "AM" && H === 12 && (H = 0), Date.UTC(R, Q - 1, le, H, K);
        } catch {
          return null;
        }
      }, j = [];
      e.save();
      const x = { high: 0, medium: 1, low: 2 }, M = [], k = Date.now();
      for (const N of it) {
        const R = c(N);
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
            const Se = ae >= 0 && ae < o.length, ze = G >= 0 && G < o.length;
            Se && ze ? K = Math.abs(o[ae].time - R) < Math.abs(o[G].time - R) ? ae : G : Se ? K = ae : ze ? K = G : K = o.length - 1;
          }
          const ke = Math.abs(o[K].time - R);
          if (K < 0 || ke > Q || K < i.startIndex || K >= i.endIndex || (H = be(K, i.startIndex), H < 0 || H > Z)) continue;
        }
        const ie = Du({ event: N.event || "", country: N.region_code || "" });
        M.push({ x: H, event: N, impact: ie, ts: R, closestIdx: K });
      }
      M.sort((N, R) => {
        const Q = x[N.impact] ?? 3, le = x[R.impact] ?? 3;
        return Q !== le ? Q - le : (N.event.event || "").localeCompare(R.event.event || "");
      });
      const P = /* @__PURE__ */ new Map();
      for (const N of M) {
        const R = Math.round(N.x);
        P.has(R) || P.set(R, []), P.get(R).push(N);
      }
      const W = document.documentElement.classList.contains("dark"), F = y - Nt, E = 22, w = 32, C = F - E / 2 - 5;
      for (const [N, R] of P) {
        const Q = R[0].x, le = R[0].impact, X = le === "high", H = le === "low", K = D(R[0].event.region_code), ie = Fu(R[0].event.region_code), ae = R.length;
        j.push({
          x: Q,
          y: C,
          event: R[0].event,
          impact: le,
          ts: R[0].ts,
          groupEvents: R.map((we) => ({ event: we.event, impact: we.impact, ts: we.ts }))
        });
        const G = X ? "#dc2626" : H ? "#22c55e" : "#d97706";
        e.save(), e.shadowColor = W ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.15)", e.shadowBlur = 8, e.shadowOffsetY = 2;
        const ke = Q - w / 2, Se = C - E / 2;
        e.fillStyle = W ? "rgba(30, 41, 59, 0.92)" : "rgba(255, 255, 255, 0.95)", e.beginPath(), e.roundRect(ke, Se, w, E, 6), e.fill(), e.shadowColor = "transparent", e.shadowBlur = 0, e.strokeStyle = W ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)", e.lineWidth = 1, e.stroke(), e.fillStyle = G, e.beginPath(), e.roundRect(ke, Se, 3, E, [6, 0, 0, 6]), e.fill(), e.restore();
        const ze = 18, ut = 13;
        if (ie ? e.drawImage(ie, Q - ze / 2, C - ut / 2, ze, ut) : (e.font = 'bold 9px -apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif', e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = W ? "#e2e8f0" : "#334155", e.fillText(K, Q + 1, C)), ae > 1) {
          const we = ke + w - 2, mt = Se - 2, gt = 7;
          e.beginPath(), e.arc(we, mt, gt, 0, Math.PI * 2), e.fillStyle = G, e.fill(), e.strokeStyle = W ? "#0f172a" : "#ffffff", e.lineWidth = 1.5, e.stroke(), e.font = 'bold 8px -apple-system, BlinkMacSystemFont, "Inter", sans-serif', e.fillStyle = "#ffffff", e.fillText(String(ae), we, mt + 0.5);
        }
        e.beginPath(), e.moveTo(Q, C + E / 2), e.lineTo(Q, F), e.strokeStyle = X ? "rgba(220, 38, 38, 0.3)" : H ? "rgba(34, 197, 94, 0.25)" : "rgba(217, 119, 6, 0.3)", e.lineWidth = 1, e.setLineDash([2, 3]), e.stroke(), e.setLineDash([]);
      }
      e.restore(), Ps.current = j;
    } else
      Ps.current = [];
    if (e.strokeStyle = te.axisLine || te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, y - Nt), e.lineTo(b, y - Nt), e.stroke(), Ze.versionLabelVisible) {
      const D = Un === 0 ? 0 : Ze.versionLabelXOffset, c = Z + Je / 2 + D, j = y - Nt / 2 + 1;
      e.save(), e.font = 'bold 11px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = te.text, e.fillText("v.23", c, j), e.restore();
    }
    if (i.candles.length > 0) {
      const D = rn * (1 + Qe), c = Math.max(1, Math.floor(80 / D)), j = y - Nt, x = j + 16;
      if (e.font = ur, e.textAlign = "center", e.textBaseline = "middle", e.save(), e.beginPath(), e.rect(0, j, Z, Nt), e.clip(), !i.candles || i.candles.length === 0) {
        e.restore();
        return;
      }
      const M = i.candles[0], k = i.candles[i.candles.length - 1];
      if (!M || !k) {
        e.restore();
        return;
      }
      const P = (/* @__PURE__ */ new Date()).getFullYear(), W = new Date(M.time).getFullYear(), F = new Date(k.time).getFullYear(), E = W !== F, w = W !== P || F !== P, C = i.candles[1], N = C ? C.time - M.time : 6e4, Q = N / 6e4 >= 60;
      let le = "", X = -1, H = -1 / 0;
      const K = 12, ie = (G, ke) => {
        if (Q) {
          const ut = ss(G, w || E || ke !== X);
          return ut !== le ? (le = ut, X = ke, ut) : Es(G);
        }
        const Se = ss(G, !1);
        return ke !== X && X !== -1 ? (X = ke, ss(G, !0)) : Se !== le ? (le = Se, X = ke, ss(G, w)) : Es(G);
      }, ae = xe.width < 400;
      if (Ze.useFixedTimeAxisLabels) {
        const G = ae ? Ze.fixedTimeAxisLabelCountSmall : Ze.fixedTimeAxisLabelCount, ke = 5, Se = Z - ke * 2;
        for (let ze = 0; ze < G; ze++) {
          const ut = ke + Se * (ze + 0.5) / G, we = uo(ut, i.startIndex), mt = Math.round(we) - i.startIndex, gt = mt >= 0 && mt < i.candles.length ? i.candles[mt] : null, tt = gt ? gt.time : M.time + (we - i.startIndex) * N, Re = gt ? be(i.startIndex + mt, i.startIndex) : ut, Ce = new Date(tt).getFullYear(), We = ie(tt, Ce);
          e.fillStyle = te.axisLabel, e.fillText(We, Re, x);
        }
      } else {
        const ze = [
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
        ], ut = c * N;
        let we = ze[ze.length - 1];
        for (const Re of ze)
          if (Re >= ut) {
            we = Re;
            break;
          }
        const mt = Math.ceil(M.time / we) * we, gt = k.time + we * 25;
        let tt = -1;
        for (let Re = mt; Re <= gt; Re += we) {
          let Ce, We = Re;
          if (Re <= k.time) {
            let Lt = 0, Xt = i.candles.length - 1, _n = Xt;
            for (; Lt <= Xt; ) {
              const zn = Lt + Xt >> 1;
              i.candles[zn].time >= Re ? (_n = zn, Xt = zn - 1) : Lt = zn + 1;
            }
            if (_n === tt) continue;
            tt = _n, We = i.candles[_n].time, Ce = be(i.startIndex + _n, i.startIndex);
          } else {
            const Lt = i.startIndex + (i.candles.length - 1) + (Re - k.time) / N;
            Ce = be(Lt, i.startIndex);
          }
          if (Ce < 2 || Ce > Z - 10) continue;
          const De = ie(We, new Date(We).getFullYear()), Ke = e.measureText(De).width, ft = Ce - Ke / 2, Ee = Ce + Ke / 2;
          ft < H + K || Ee > Z - 10 || ft < 2 || (e.fillStyle = te.axisLabel, e.fillText(De, Ce, x), H = Ee);
        }
      }
      e.restore(), (zs.length > 0 || As.length > 0) && (e.save(), zs.forEach((G) => {
        e.fillStyle = Bl, e.beginPath(), e.roundRect(G.topOrigin, Wl, G.bWidth, po, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.font = Yo, e.fillText(G.text, G.topOrigin + G.bWidth / 2, Wl + po / 2);
      }), As.forEach((G) => {
        e.fillStyle = Bl, e.beginPath(), e.roundRect(Dl, G.topOrigin, G.bWidth, po, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.font = Yo, e.fillText(G.text, Dl + G.bWidth / 2, G.topOrigin + po / 2);
      }), e.restore());
    }
    const _l = p.getContext("2d");
    _l && (_l.setTransform(1, 0, 0, 1, 0, 0), _l.drawImage(f, 0, 0)), Rn.current = {
      startIndex: Cr,
      candleWidth: rn
    }, Ft.current && Zn.current?.();
  }, [xe, o, n, ue, te, s, J, Dn, Ls, Fn, Es, ss, fr, Po, In, T, r, Ie, St, it, Tt, Bt, rs, Ts]);
  Pn.current = bs, l.useEffect(() => {
    Gs && (Gs.current = () => {
      ht(!0);
    });
  }, [Gs]);
  const zt = l.useCallback(() => {
    const a = ot.current, p = a?.getContext("2d");
    if (!a || !p) return;
    const b = {
      ctx: p,
      dimensions: xe,
      dpr: In,
      candles: o,
      colors: te,
      viewState: ue,
      indicatorData: s,
      indicators: r,
      indicatorHeightRatio: J,
      showOHLC: ns,
      isDesktop: Lo,
      PRICE_AXIS_WIDTH: Je,
      TIME_AXIS_HEIGHT: Nt,
      PRICE_LABEL_FONT: Eo,
      TIME_LABEL_FONT: ur,
      crosshair: Vn.current,
      isScrolling: Ft.current,
      scrollState: {
        startIndex: je.current.startIndex,
        candleWidth: je.current.candleWidth
      },
      isDraggingHandle: !!yt.current,
      isHoveredSLTP: !!$n.current,
      sessionControlHovered: hl.current,
      isSyncedUpdate: Zs.current,
      syncedCrosshairTime: To.current ?? void 0,
      hoveredEvent: vn.current || js.current,
      currentOhlcTextWidth: tr,
      currentBbTextEndX: fl,
      currentMaTextEndX: pl,
      currentVwapTextEndX: ml,
      currentVpTextEndX: xl,
      currentVolTextEndX: bl,
      overlayLabelEndXPrev: Hs.current,
      subplotLabelEndXPrev: sr,
      getVisibleCandles: Dn,
      getPriceRange: Ls,
      yToPrice: dr,
      xToIndex: uo,
      indexToX: hr,
      formatPrice: Fn,
      formatTime: Es,
      formatDate: ss,
      callbacks: {
        setOhlcTextWidth: la,
        setBbTextEndX: aa,
        setMaTextEndX: ia,
        setVwapTextEndX: ca,
        setVpTextEndX: ua,
        setVolTextEndX: da,
        setOverlayLabelEndX: (y) => {
          Hs.current = y, ha(y);
        },
        setSubplotLabelEndX: fa,
        onCrosshairMove: se
      }
    };
    _u(b);
  }, [xe, o, ue, te, s, r, J, Dn, Ls, dr, uo, hr, Fn, Es, ss, se, In, ns, U]);
  l.useEffect(() => {
    Hn.current = zt;
  }, [zt]), l.useEffect(() => {
    sn.current = te?.crosshairStyle || "standard", ot.current && (ot.current.style.cursor = sn.current !== "standard" ? "none" : "crosshair");
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
  } = Ou({
    minCandleWidth: Ao,
    maxCandleWidth: Bo,
    priceAxisWidth: Je,
    timeAxisHeight: Nt,
    dimensions: xe,
    candlesLength: o.length,
    disableAutoFollow: me,
    livePrice: n ?? null,
    scrollStateRef: je,
    drawChartRef: Pn,
    notifyScrollSync: Et,
    getVisibleCandles: Dn,
    getPriceRange: Ls,
    setViewState: Dt,
    setPriceScale: _e,
    setPriceOffset: ps,
    setFixedPriceCenter: _t,
    setFixedPriceRange: na,
    setIsScalingYAxis: ul,
    fixedPriceCenter: en,
    priceScale: Zt,
    priceOffset: It,
    viewStateAutoFollowLatest: ue.autoFollowLatest,
    yAxisScaleStartRef: lo,
    priceScaleRef: Sn,
    priceOffsetRef: es,
    yAxisDebounceRef: ts
  }), Ta = l.useCallback((a) => {
    const p = ot.current;
    if (!p) return;
    const b = p.getBoundingClientRect(), y = a.clientX - b.left, f = a.clientY - b.top;
    if (("ontouchstart" in window || navigator.maxTouchPoints > 0) && !An && !Ln && !yt.current)
      return;
    if (Vn.current = { x: y, y: f }, !Ln && !yt.current && r && s) {
      const S = dn.current, B = hn.current;
      if (S && B > 0 && f < B) {
        const Y = je.current, u = Y.candleWidth * (1 + Qe), A = Math.max(0, Math.floor(Y.startIndex)), m = A + Math.round(y / u), V = 8, h = (ne) => isNaN(ne) || !isFinite(ne) ? !1 : Math.abs(f - (B - (ne - S.min) / S.range * B)) < V;
        let L = null;
        if (!L && r.movingAverages?.enabled && s.movingAverages) {
          for (const ne of s.movingAverages)
            if (m >= 0 && m < ne.data.length && h(ne.data[m])) {
              L = "movingAverages";
              break;
            }
        }
        if (!L && r.bollinger?.enabled && s.bollinger) {
          const ne = s.bollinger;
          m >= 0 && m < ne.upper.length && (h(ne.upper[m]) || h(ne.middle[m]) || h(ne.lower[m])) && (L = "bollinger");
        }
        if (!L && r.vwap?.enabled && s.vwap && m >= 0 && m < s.vwap.length && h(s.vwap[m]) && (L = "vwap"), !L && r.supertrend?.enabled && s.supertrend && m >= 0 && m < s.supertrend.length && s.supertrend[m] && h(s.supertrend[m].value) && (L = "supertrend"), !L && r.ichimoku?.enabled && s.ichimoku) {
          const ne = s.ichimoku;
          m >= 0 && m < ne.tenkan.length && (h(ne.tenkan[m]) || h(ne.kijun[m]) || h(ne.senkouA[m]) || h(ne.senkouB[m])) && (L = "ichimoku");
        }
        if (!L && r.keltner?.enabled && s.keltner) {
          const ne = s.keltner;
          m >= 0 && m < ne.upper.length && (h(ne.upper[m]) || h(ne.middle[m]) || h(ne.lower[m])) && (L = "keltner");
        }
        if (!L && r.donchian?.enabled && s.donchian) {
          const ne = s.donchian;
          m >= 0 && m < ne.upper.length && (h(ne.upper[m]) || h(ne.middle[m]) || h(ne.lower[m])) && (L = "donchian");
        }
        if (!L && r.envelopes?.enabled && s.envelopes) {
          const ne = s.envelopes;
          m >= 0 && m < ne.upper.length && (h(ne.upper[m]) || h(ne.basis[m]) || h(ne.lower[m])) && (L = "envelopes");
        }
        if (!L && r?.volume?.enabled && B > 0 && f >= B * 0.8 && f <= B) {
          const ne = m - A, Ve = Dn();
          if (ne >= 0 && ne < Ve.candles.length) {
            const ee = Ve.candles[ne].volume ?? 0;
            if (ee > 0) {
              const Ne = B * 0.2, lt = B, Xe = Ve.candles.map((et) => et.volume ?? 0).filter((et) => et > 0), he = Xe.length > 0 ? Math.max(...Xe) : 1, Le = ee / he * Ne * 0.95, ct = lt - Le;
              f >= ct && (L = "volume");
            }
          }
        }
        const de = xe.width - Je;
        if (!L && r?.volumeProfile?.enabled && B > 0 && y >= de * (1 - (r.volumeProfile.rowWidth ?? 15) / 100)) {
          const ne = Dn();
          if (ne.candles.length > 0) {
            const Ve = r.volumeProfile.numberOfRows ?? 48, ee = de * ((r.volumeProfile.rowWidth ?? 15) / 100), Ne = r.volumeProfile.lookbackBars ?? 0, lt = Ne > 0 ? ne.candles.slice(-Ne) : ne.candles;
            let Xe = 1 / 0, he = -1 / 0;
            lt.forEach((et) => {
              Xe = Math.min(Xe, et.low), he = Math.max(he, et.high);
            });
            const Le = (he - Xe || 1) / Ve, ct = dn.current;
            if (ct && ct.range > 0) {
              const et = ct.max - f / B * ct.range, Kt = Math.floor((et - Xe) / Le);
              if (Kt >= 0 && Kt < Ve) {
                const Cn = new Float64Array(Ve);
                lt.forEach((Ot) => {
                  if (!(!Ot.volume || Ot.volume <= 0))
                    for (let ys = 0; ys < Ve; ys++) {
                      const fo = Xe + ys * Le, $o = fo + Le;
                      if (Ot.high >= fo && Ot.low <= $o) {
                        const Il = Math.max(Ot.low, fo), Rl = Math.min(Ot.high, $o), Pl = Ot.high - Ot.low > 0 ? (Rl - Il) / (Ot.high - Ot.low) : 1;
                        Cn[ys] += Ot.volume * Pl;
                      }
                    }
                });
                let tn = 0;
                for (let Ot = 0; Ot < Ve; Ot++)
                  Cn[Ot] > tn && (tn = Cn[Ot]);
                const Oo = Cn[Kt];
                if (Oo > 0 && tn > 0) {
                  const Ot = Oo / tn * ee, ys = de - Ot;
                  y >= ys && (L = "volumeProfile");
                }
              }
            }
          }
        }
        if (!L && r.customIndicators) {
          const Ve = (ee) => isNaN(ee) || !isFinite(ee) ? !1 : Math.abs(f - (B - (ee - S.min) / S.range * B)) < 14;
          for (const ee of r.customIndicators) {
            const Ne = ee.data;
            if (!(!ee.enabled || ee.display !== "overlay" || !Ne) && m >= 0 && m < Ne.length && Ve(Ne[m])) {
              const lt = ee.scriptId;
              L = typeof ee.expression == "string" && ee.expression.startsWith("brue:") && lt ? `script-${lt}` : `ci-${ee.id}`;
              break;
            }
          }
        }
        if (!L) {
          const ne = on.current, Ve = [];
          if (r.rsi?.enabled && s.rsi) {
            const ee = ne.rsi;
            Ve.push({ key: "sp-rsi", check: () => {
              if (!ee || f < ee.top || f > ee.bottom || m < 0 || m >= s.rsi.length) return !1;
              const Ne = s.rsi[m];
              if (isNaN(Ne) || !isFinite(Ne)) return !1;
              const lt = ee.bottom - ee.top;
              return Math.abs(f - (ee.top + lt - Ne / 100 * lt)) < V;
            } });
          }
          if (r.macd?.enabled && s.macd) {
            const ee = ne.macd;
            Ve.push({ key: "sp-macd", check: () => !(!ee || f < ee.top || f > ee.bottom) });
          }
          if (r.stochastic?.enabled && s.stochastic) {
            const ee = ne.stochastic;
            Ve.push({ key: "sp-stochastic", check: () => {
              if (!ee || f < ee.top || f > ee.bottom || m < 0 || m >= s.stochastic.k.length) return !1;
              const Ne = ee.bottom - ee.top, lt = ee.top + Ne - s.stochastic.k[m] / 100 * Ne, Xe = ee.top + Ne - s.stochastic.d[m] / 100 * Ne;
              return Math.abs(f - lt) < V || Math.abs(f - Xe) < V;
            } });
          }
          if (r.atr?.enabled && s.atr) {
            const ee = ne.atr;
            Ve.push({ key: "sp-atr", check: () => !(!ee || f < ee.top || f > ee.bottom) });
          }
          for (const ee of Ve)
            if (ee.check()) {
              L = ee.key;
              break;
            }
        }
        const He = Ns.current;
        if (Ns.current = L, L !== He && ot.current) {
          const ne = sn.current !== "standard" ? "none" : "crosshair";
          ot.current.style.cursor = L ? "pointer" : ne;
        }
      } else if (Ns.current && (Ns.current = null, ot.current && !lr.current)) {
        const Y = sn.current !== "standard" ? "none" : "crosshair";
        ot.current.style.cursor = Y;
      }
    }
    const O = hn.current, _ = xe.height;
    if (O > 0 && ot.current) {
      if (f > O && f < _ - 30)
        ot.current.style.cursor = "pointer";
      else if (f <= O && !Ns.current && !lr.current) {
        const S = sn.current !== "standard" ? "none" : "crosshair";
        ot.current.style.cursor = S;
      }
    }
    let z = !1;
    for (const S of Ps.current) {
      const B = y - S.x, Y = f - S.y;
      if (Math.sqrt(B * B + Y * Y) < 16) {
        js.current = S, z = !0, ot.current && (ot.current.style.cursor = "pointer");
        break;
      }
    }
    if (z || (js.current = null), yt.current) {
      const S = dn.current, B = hn.current;
      if (S && S.range > 0 && B > 0) {
        const Y = S.max - f / B * S.range;
        yt.current === "sl" ? wt.current = Y : vt.current = Y, ot.current && (ot.current.style.cursor = oe), wn.current === null && (wn.current = requestAnimationFrame(() => {
          ht(!1), wn.current = null;
        }));
        return;
      }
    }
    if ($e && $e.length > 0) {
      const S = dn.current, B = hn.current;
      if (S && S.range > 0 && B > 0) {
        let Y = !1;
        for (const u of $e) {
          const A = (S.max - u.price) / S.range * B;
          if (y <= 160 && Math.abs(f - A) < 12) {
            Y = !0;
            break;
          }
          if (u.id === Ae.current) {
            const V = Math.min(A + 10, B - 22 - 4), h = xe.width - Je, L = 144 + 5 * 2, de = (h - L) / 2;
            if (y >= de - 8 && y <= de + L + 8 && f >= V - 8 && f <= V + 22 + 8) {
              Y = !0;
              break;
            }
          }
        }
        Y && ot.current && (ot.current.style.cursor = "pointer");
      }
    }
    if (Ae.current && $e && $e.length > 0) {
      const S = dn.current, B = hn.current;
      if (S && S.range > 0 && B > 0) {
        const Y = S.max - f / B * S.range, u = S.range * 0.012, A = $e.find((m) => m.id === Ae.current);
        if (A) {
          const m = A.side === "buy", V = Gn(A.price), h = wt.current ?? A.stopLoss ?? (m ? A.price - V : A.price + V), L = vt.current ?? A.takeProfit ?? (m ? A.price + V : A.price - V), de = Math.abs(Y - h) < u, He = Math.abs(Y - L) < u;
          if (de || He)
            ot.current && (ot.current.style.cursor = v), $n.current = de ? "sl" : "tp", ht(!1);
          else if ($n.current && ($n.current = null, ht(!1)), ot.current) {
            const ne = sn.current !== "standard" ? "none" : "crosshair";
            ot.current.style.cursor !== ne && (ot.current.style.cursor = ne);
          }
        }
      }
    }
    if (Ln) {
      if (a.buttons === 0) {
        ds(!1), Yt(!1);
        return;
      }
      Yt(!0);
      const S = y - yn.x, B = f - yn.y, Y = ue.candleWidth * (1 + Qe), u = S / Y, A = Math.max(
        0,
        Math.min(o.length - 10, yn.startIndex - u)
      );
      if (je.current = {
        startIndex: A,
        candleWidth: ue.candleWidth
      }, ms && Vt !== null) {
        const m = Vt / Sn.current / (xe.height - Nt), V = B * m;
        es.current = yn.priceOffset + V;
      }
      Xn.current === null && (Xn.current = requestAnimationFrame(() => {
        ht(!0), zt(), Et(), Xn.current = null;
      })), At.current && clearTimeout(At.current), At.current = setTimeout(() => {
        const m = je.current;
        Dt((V) => ({
          ...V,
          startIndex: m.startIndex,
          // Keep float precision - no rounding
          autoFollowLatest: !1
        })), ms && ps(es.current), Yt(!1);
      }, 100);
      return;
    }
    const $ = Dn(), g = uo(y, $.startIndex);
    g >= 0 && g < o.length ? Ct.current = g : Ct.current = null, zt();
  }, [Ln, yn, ue.candleWidth, o.length, ms, Vt, Zt, xe.height, zt, An, Dn, uo, o]), Ia = l.useCallback((a) => {
    const p = ot.current;
    if (!p) return;
    const b = p.getBoundingClientRect(), y = a.clientX - b.left, f = a.clientY - b.top;
    let e = !1;
    for (const $ of Ps.current) {
      const g = y - $.x, S = f - $.y;
      if (Math.sqrt(g * g + S * S) < 16) {
        e = !0, vn.current && vn.current.ts === $.ts && vn.current.x === $.x ? vn.current = null : vn.current = $, Hn.current && Hn.current();
        return;
      }
    }
    if (vn.current && !e && (vn.current = null, Hn.current && Hn.current()), ns && r) {
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
            const L = A[h]?.sourceScriptId;
            if (L && m[L]?.enabled) continue;
            const de = g + V * B - 10, He = de + B;
            if (Y > 0 && y >= 0 && y <= Y && f >= de && f <= He) {
              const ne = `movingAverages__${h}`;
              pe((Ve) => Ve === ne ? null : ne), ye(ne);
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
        const S = je.current, B = S.candleWidth * (1 + Qe);
        xe.width - Je;
        const u = Math.max(0, Math.floor(S.startIndex)) + Math.round(y / B), A = 8, m = (h) => {
          if (isNaN(h) || !isFinite(h)) return !1;
          const L = g - (h - $.min) / $.range * g;
          return Math.abs(f - L) < A;
        };
        if (r.movingAverages?.enabled && s.movingAverages)
          for (let h = 0; h < s.movingAverages.length; h++) {
            const L = s.movingAverages[h];
            if (u >= 0 && u < L.data.length && m(L.data[u])) {
              const de = `movingAverages__${h}`;
              pe((He) => He === de ? null : de), ye(de);
              return;
            }
          }
        if (r.bollinger?.enabled && s.bollinger) {
          const h = s.bollinger;
          if (u >= 0 && u < h.upper.length && (m(h.upper[u]) || m(h.middle[u]) || m(h.lower[u]))) {
            pe((L) => L === "bollinger" ? null : "bollinger"), ye("bollinger");
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
            pe((L) => L === "supertrend" ? null : "supertrend"), ye("supertrend");
            return;
          }
        }
        if (r.ichimoku?.enabled && s.ichimoku) {
          const h = s.ichimoku;
          if (u >= 0 && u < h.tenkan.length && (m(h.tenkan[u]) || m(h.kijun[u]) || m(h.senkouA[u]) || m(h.senkouB[u]))) {
            pe((L) => L === "ichimoku" ? null : "ichimoku"), ye("ichimoku");
            return;
          }
        }
        if (r.keltner?.enabled && s.keltner) {
          const h = s.keltner;
          if (u >= 0 && u < h.upper.length && (m(h.upper[u]) || m(h.middle[u]) || m(h.lower[u]))) {
            pe((L) => L === "keltner" ? null : "keltner"), ye("keltner");
            return;
          }
        }
        if (r.donchian?.enabled && s.donchian) {
          const h = s.donchian;
          if (u >= 0 && u < h.upper.length && (m(h.upper[u]) || m(h.middle[u]) || m(h.lower[u]))) {
            pe((L) => L === "donchian" ? null : "donchian"), ye("donchian");
            return;
          }
        }
        if (r.envelopes?.enabled && s.envelopes) {
          const h = s.envelopes;
          if (u >= 0 && u < h.upper.length && (m(h.upper[u]) || m(h.basis[u]) || m(h.lower[u]))) {
            pe((L) => L === "envelopes" ? null : "envelopes"), ye("envelopes");
            return;
          }
        }
        const V = ["dema", "tema", "hma"];
        for (const h of V)
          if (r[h]?.enabled && s[h]) {
            const L = s[h];
            if (Array.isArray(L) && u >= 0 && u < L.length && m(L[u])) {
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
    if (Ns.current === "volumeProfile") {
      pe(($) => $ === "volumeProfile" ? null : "volumeProfile"), ye("volumeProfile");
      return;
    }
    const O = Ns.current;
    if (O && (O.startsWith("ci-") || O.startsWith("script-"))) {
      pe(($) => $ === O ? null : O), ye(O);
      return;
    }
    const _ = on.current, z = [
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
      const g = _[$];
      if (g && f >= g.top && f <= g.top + 25 && y <= 200) {
        const S = `sp-${$}`;
        pe((B) => B === S ? null : S), ye(S);
        return;
      }
    }
    if (r && s) {
      const $ = je.current, g = $.candleWidth * (1 + Qe), S = Math.max(0, Math.floor($.startIndex)), B = S + Math.round(y / g), Y = 10, u = (m, V) => {
        if (!V) return !1;
        const h = _[m];
        if (!h || f < h.top || f > h.bottom || B < 0 || B >= V.length) return !1;
        const L = V[B];
        if (isNaN(L) || !isFinite(L)) return !1;
        const de = h.bottom - h.top, He = h.top + de - L / 100 * de;
        return Math.abs(f - He) < Y;
      }, A = (m, V) => {
        const h = _[m];
        if (!h || f < h.top || f > h.bottom) return !1;
        const L = h.bottom - h.top;
        let de = 1 / 0, He = -1 / 0;
        const ne = xe.width - Je, Ve = Math.floor(ne / g), ee = Math.max(0, S), Ne = Math.min(ee + Ve, V[0]?.length ?? 0);
        for (const Le of V)
          if (Le)
            for (let ct = ee; ct < Ne; ct++) {
              const et = Le[ct];
              !isNaN(et) && isFinite(et) && (et < de && (de = et), et > He && (He = et));
            }
        if (de >= He) return !1;
        const Xe = (He - de) * 0.1;
        de -= Xe, He += Xe;
        const he = He - de;
        if (B < 0) return !1;
        for (const Le of V) {
          if (!Le || B >= Le.length) continue;
          const ct = Le[B];
          if (isNaN(ct) || !isFinite(ct)) continue;
          const et = h.top + L - (ct - de) / he * L;
          if (Math.abs(f - et) < Y) return !0;
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
        const m = _.williamsR;
        if (m && f >= m.top && f <= m.bottom && B >= 0 && B < s.williamsR.length) {
          const V = s.williamsR[B];
          if (!isNaN(V) && isFinite(V)) {
            const h = m.bottom - m.top, L = m.top + h - (V + 100) / 100 * h;
            if (Math.abs(f - L) < Y) {
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
        const V = _[m];
        if (V && f >= V.top && f <= V.bottom) {
          const h = s[m];
          if (h && Array.isArray(h) && A(m, [h])) {
            const L = `sp-${m}`;
            pe((de) => de === L ? null : L), ye(L);
            return;
          }
        }
      }
    }
    if (ao && Vs(null), Bt && pe(null), Wn && jt(null), $e && $e.length > 0 && Date.now() - qn.current > 500) {
      const $ = dn.current, g = hn.current;
      if ($ && $.range > 0 && g > 0) {
        const S = $.max - f / g * $.range, B = $.range * 6e-3;
        if (Ae.current) {
          const u = $e.find((A) => A.id === Ae.current);
          if (u) {
            const A = ($.max - u.price) / $.range * g, m = 22, V = Math.min(A + 10, g - m - 4), h = 5, L = 45, de = 55, He = 44, ne = xe.width - Je, Ve = L + de + He + h * 2, Ne = (ne - Ve) / 2, lt = Ne + L + h, Xe = lt + de + h, he = 8;
            if (y >= Ne - he && y <= Ne + L + he && f >= V - he && f <= V + m + he) {
              if (qt) {
                const Le = u.side === "buy", ct = Gn(u.price), et = wt.current ?? u.stopLoss ?? (Le ? u.price - ct : u.price + ct), Kt = vt.current ?? u.takeProfit ?? (Le ? u.price + ct : u.price - ct);
                qt(Ae.current, et, Kt);
              }
              Ae.current = null, wt.current = null, vt.current = null, yt.current = null, un((Le) => Le + 1), ht(!1);
              return;
            }
            if (y >= lt - he && y <= lt + de + he && f >= V - he && f <= V + m + he) {
              Ae.current = null, wt.current = null, vt.current = null, yt.current = null, un((Le) => Le + 1), ht(!1);
              return;
            }
            if (y >= Xe - he && y <= Xe + He + he && f >= V - he && f <= V + m + he) {
              Gt && Gt(Ae.current), Ae.current = null, wt.current = null, vt.current = null, yt.current = null, un((Le) => Le + 1), ht(!1);
              return;
            }
          }
        }
        if (Ae.current) {
          const u = $e.find((A) => A.id === Ae.current);
          if (u) {
            const A = u.side === "buy", m = Gn(u.price), V = wt.current ?? u.stopLoss ?? (A ? u.price - m : u.price + m), h = vt.current ?? u.takeProfit ?? (A ? u.price + m : u.price - m);
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
        for (const u of $e)
          if (Math.abs(S - u.price) < B) {
            Y = u.id;
            break;
          }
        if (Y) {
          if (Ae.current === Y)
            Ae.current = null, wt.current = null, vt.current = null;
          else {
            Ae.current = Y;
            const u = $e.find((A) => A.id === Y);
            wt.current = u?.stopLoss ?? null, vt.current = u?.takeProfit ?? null;
          }
          yt.current = null, un((u) => u + 1), ht(!1);
          return;
        }
      }
    }
    ds(!0), Ro({ x: y, y: f, startIndex: ue.startIndex, priceOffset: It });
  }, [ue.startIndex, It, ao, Bt, Wn, $e, qt, Gt, an]), wl = l.useCallback(() => {
    if (yt.current && Ae.current) {
      yt.current = null, ot.current && (ot.current.style.cursor = sn.current !== "standard" ? "none" : "crosshair"), ht(!1);
      return;
    }
    if (Ft.current) {
      Yt(!1);
      const a = je.current;
      if (ht(!1), me) {
        const p = xe.width - Je, b = ue.candleWidth * (1 + Qe), y = Math.floor(p / b), f = a.startIndex + y, e = o.length - 1 < f;
        jn.current = !e;
      }
      Dt((p) => ({
        ...p,
        startIndex: a.startIndex,
        // Keep float precision - no rounding
        autoFollowLatest: !1
      }));
    }
    Xn.current !== null && (cancelAnimationFrame(Xn.current), Xn.current = null), ds(!1);
  }, [qt, Gt]);
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
      Ae.current && (p.key === "Enter" ? (p.preventDefault(), qt && qt(Ae.current, wt.current ?? void 0, vt.current ?? void 0), Ae.current = null, wt.current = null, vt.current = null, yt.current = null, un((b) => b + 1), ht(!1)) : (p.key === "Escape" || p.key === "Backspace") && (p.preventDefault(), Ae.current = null, wt.current = null, vt.current = null, yt.current = null, un((b) => b + 1), ht(!1)));
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [qt, Gt]), l.useEffect(() => {
    const a = (p) => {
      if (!Bt || !r || !Me) return;
      const b = p.target?.tagName;
      if (!(b === "INPUT" || b === "TEXTAREA" || b === "SELECT"))
        if (p.key === "Backspace" || p.key === "Delete") {
          p.preventDefault();
          const y = Bt.startsWith("sp-") ? Bt.replace("sp-", "") : Bt.startsWith("movingAverages__") ? "movingAverages" : Bt, f = r[y];
          f && Me({ ...r, [y]: { ...f, enabled: !1 } }), pe(null);
        } else p.key === "Escape" && pe(null);
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [Bt, r, Me]);
  const Ra = l.useCallback(() => {
    Rt.current && clearTimeout(Rt.current), Rt.current = setTimeout(() => {
      if (ln.current) return;
      Vn.current = null, Ct.current = null, js.current = null;
      const a = ot.current, p = a?.getContext("2d");
      p && a && p.clearRect(0, 0, a.width, a.height), Hn.current && Hn.current(), bs(), ds(!1), ul(!1), se && se(null, null);
    }, 50);
  }, [se, bs]);
  l.useEffect(() => {
    if (!Ql && !er) return;
    const a = (y) => {
      const e = (lo.current.y - y.clientY) / 150, O = Math.max(0.1, Math.min(10, lo.current.scale + e));
      Sn.current = O, ht(!0), Et(), ts.current && clearTimeout(ts.current), ts.current = setTimeout(() => {
        _e(Sn.current);
      }, 100);
    }, p = () => {
      ul(!1), sa(!1), _e(Sn.current), Et();
    }, b = (y) => {
      if (y.touches.length !== 1) return;
      y.preventDefault();
      const e = (lo.current.y - y.touches[0].clientY) / 150, O = Math.max(0.1, Math.min(10, lo.current.scale + e));
      Sn.current = O, ht(!0), Et(), ts.current && clearTimeout(ts.current), ts.current = setTimeout(() => {
        _e(Sn.current);
      }, 100);
    };
    return window.addEventListener("mousemove", a), window.addEventListener("mouseup", p), window.addEventListener("touchmove", b, { passive: !1 }), window.addEventListener("touchend", p), window.addEventListener("touchcancel", p), () => {
      window.removeEventListener("mousemove", a), window.removeEventListener("mouseup", p), window.removeEventListener("touchmove", b), window.removeEventListener("touchend", p), window.removeEventListener("touchcancel", p);
    };
  }, [Ql, er, Et]);
  const Pa = l.useCallback((a) => {
    if (a.preventDefault(), a.touches.length === 1) {
      const p = a.touches[0], b = ot.current;
      if (!b) return;
      const y = b.getBoundingClientRect(), f = p.clientX - y.left, e = p.clientY - y.top;
      if (fs.current = { x: f, y: e }, xt.current && (clearTimeout(xt.current), xt.current = null), An) {
        hs(!1), Vn.current = null;
        const $ = b.getContext("2d");
        $ && $.clearRect(0, 0, b.width, b.height);
      }
      const O = Date.now();
      Bn.current = !0, $s.current = O;
      const _ = O - Os.current;
      if (Os.current = O, !(_ < 300)) {
        const $ = O;
        xt.current = setTimeout(() => {
          $s.current === $ && Bn.current && (hs(!0), Vn.current = { x: f, y: e }, bn.current !== null && cancelAnimationFrame(bn.current), bn.current = requestAnimationFrame(() => {
            zt(), bn.current = null;
          })), xt.current = null;
        }, 400);
      }
      if ($e && $e.length > 0) {
        qn.current = Date.now();
        const $ = dn.current, g = hn.current;
        if ($ && $.range > 0 && g > 0) {
          const S = $.max - e / g * $.range, B = $.range * 0.015;
          if (Ae.current) {
            const u = $e.find((A) => A.id === Ae.current);
            if (u) {
              const A = ($.max - u.price) / $.range * g, m = 22, V = Math.min(A + 10, g - m - 4), h = 5, L = xe.width - Je, de = 45, He = 55, ne = 44, Ve = de + He + ne + h * 2, Ne = (L - Ve) / 2, lt = Ne + de + h, Xe = lt + He + h, he = 12;
              if (f >= Ne - he && f <= Ne + de + he && e >= V - he && e <= V + m + he) {
                qt && qt(Ae.current, wt.current ?? void 0, vt.current ?? void 0), Ae.current = null, wt.current = null, vt.current = null, yt.current = null, un((Le) => Le + 1), ht(!1);
                return;
              }
              if (f >= lt - he && f <= lt + He + he && e >= V - he && e <= V + m + he) {
                Ae.current = null, wt.current = null, vt.current = null, yt.current = null, un((Le) => Le + 1), ht(!1);
                return;
              }
              if (f >= Xe - he && f <= Xe + ne + he && e >= V - he && e <= V + m + he) {
                Gt && Gt(Ae.current), Ae.current = null, wt.current = null, vt.current = null, yt.current = null, un((Le) => Le + 1), ht(!1);
                return;
              }
            }
          }
          if (Ae.current) {
            const u = $e.find((A) => A.id === Ae.current);
            if (u) {
              const A = u.side === "buy", m = Gn(u.price), V = wt.current ?? u.stopLoss ?? (A ? u.price - m : u.price + m), h = vt.current ?? u.takeProfit ?? (A ? u.price + m : u.price - m);
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
          for (const u of $e) {
            const A = ($.max - u.price) / $.range * g;
            if (f <= 160 && Math.abs(e - A) < 20) {
              Y = u.id;
              break;
            }
          }
          if (Y) {
            if (Ae.current === Y)
              Ae.current = null, wt.current = null, vt.current = null;
            else {
              Ae.current = Y;
              const u = $e.find((A) => A.id === Y);
              wt.current = u?.stopLoss ?? null, vt.current = u?.takeProfit ?? null;
            }
            yt.current = null, xt.current && (clearTimeout(xt.current), xt.current = null), un((u) => u + 1), ht(!1);
            return;
          }
        }
      }
      ds(!0), Ro({ x: f, y: e, startIndex: ue.startIndex, priceOffset: It });
    }
  }, [ue.startIndex, It, zt, An]), Wo = l.useRef(null), pr = l.useCallback((a) => {
    if (a.touches.length === 2) {
      a.preventDefault();
      const p = a.touches[0], b = a.touches[1], y = Math.hypot(
        b.clientX - p.clientX,
        b.clientY - p.clientY
      );
      if (Wo.current !== null) {
        const f = je.current.candleWidth, e = je.current.startIndex, _ = 1 + (y / Wo.current - 1) * 1.3, z = Math.max(
          Ao,
          Math.min(Bo, f * _)
        ), $ = ot.current;
        if ($) {
          const g = $.getBoundingClientRect(), S = (p.clientX + b.clientX) / 2 - g.left, B = f * (1 + Qe), Y = z * (1 + Qe), u = e + S / B, A = Math.max(0, u - S / Y);
          je.current = { startIndex: A, candleWidth: z }, ht(!0), Et(), Ft.current || Yt(!0);
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
      const p = a.touches[0], b = ot.current;
      if (!b) return;
      const y = b.getBoundingClientRect(), f = p.clientX - y.left, e = p.clientY - y.top;
      if (xt.current && fs.current) {
        const O = Math.abs(f - fs.current.x), _ = Math.abs(e - fs.current.y);
        (O > 10 || _ > 10) && (clearTimeout(xt.current), xt.current = null);
      }
      if (An && (Vn.current = { x: f, y: e }, bn.current !== null && cancelAnimationFrame(bn.current), bn.current = requestAnimationFrame(() => {
        zt(), bn.current = null;
      })), yt.current) {
        a.preventDefault();
        const O = dn.current, _ = hn.current;
        if (O && O.range > 0 && _ > 0) {
          const z = O.max - e / _ * O.range;
          yt.current === "sl" ? wt.current = z : vt.current = z, wn.current === null && (wn.current = requestAnimationFrame(() => {
            ht(!1), wn.current = null;
          }));
        }
        return;
      }
      if (Ln && !An) {
        a.preventDefault(), Yt(!0);
        const O = f - yn.x, _ = e - yn.y, z = ue.candleWidth * (1 + Qe), $ = O / z, g = Math.max(
          0,
          Math.min(o.length - 10, yn.startIndex - $)
        );
        if (ms && Vt !== null) {
          const S = Vt / Sn.current / (xe.height - Nt), B = _ * S;
          es.current = yn.priceOffset + B;
        }
        je.current = {
          startIndex: g,
          candleWidth: ue.candleWidth
        }, kn.current === null && (kn.current = requestAnimationFrame(() => {
          ht(!0), Et(), kn.current = null;
        }));
      }
    }
  }, [Ln, yn, ue.candleWidth, o.length, pr, zt, An, ms, Vt, xe.height, $e]), Na = l.useCallback(() => {
    if (Bn.current = !1, $s.current = 0, xt.current && (clearTimeout(xt.current), xt.current = null), yt.current && Ae.current) {
      yt.current = null, ht(!1), Bn.current = !1, $s.current = 0, xt.current && (clearTimeout(xt.current), xt.current = null);
      return;
    }
    if (An) {
      hs(!1), Vn.current = null;
      const a = ot.current, p = a?.getContext("2d");
      p && a && p.clearRect(0, 0, a.width, a.height), se && se(null, null);
    }
    if (Ft.current) {
      Yt(!1);
      const a = je.current;
      if (ht(!1), me) {
        const p = xe.width - Je, b = ue.candleWidth * (1 + Qe), y = Math.floor(p / b), f = a.startIndex + y, e = o.length - 1 < f;
        jn.current = !e;
      }
      Dt((p) => ({
        ...p,
        startIndex: a.startIndex,
        // Keep float precision - no rounding
        candleWidth: a.candleWidth,
        // Pick up pinch-zoom final width
        autoFollowLatest: !1
      })), ms && ps(es.current);
    }
    ds(!1), Wo.current = null, fs.current = null, cl.current = null, kn.current !== null && (cancelAnimationFrame(kn.current), kn.current = null);
  }, [An, se, ms]);
  l.useCallback((a) => {
    let p = xs[0], b = Math.abs(a - p);
    for (const y of xs) {
      const f = Math.abs(a - y);
      f < b && (b = f, p = y);
    }
    return p;
  }, [xs]);
  const Sl = l.useCallback((a, p) => {
    const b = xs.findIndex((y) => y >= a - 1e-3);
    if (p) {
      const y = Math.min(xs.length - 1, b + 1);
      return xs[y];
    } else {
      const y = Math.max(0, b - 1);
      return xs[y];
    }
  }, [xs]), Cl = l.useCallback((a) => {
    const p = a.ctrlKey || a.metaKey;
    if (!vl.current && !p) {
      const m = Math.abs(a.deltaX) > Math.abs(a.deltaY), V = a.shiftKey && a.deltaY !== 0;
      if (m || V) {
        a.preventDefault();
        const h = je.current.startIndex, L = je.current.candleWidth, de = L * (1 + Qe);
        Yt(!0);
        const He = V ? a.deltaY : a.deltaX, ne = 0.2 + (io - 1) * 0.2, Ve = He * ne / de, ee = Math.max(
          0,
          Math.min(o.length - 10, h + Ve)
        );
        je.current = { startIndex: ee, candleWidth: L }, At.current && clearTimeout(At.current), At.current = setTimeout(() => {
          if (me) {
            const lt = xe.width - Je, Xe = je.current.candleWidth * (1 + Qe), he = Math.floor(lt / Xe), Le = je.current.startIndex + he;
            jn.current = !(o.length - 1 < Le);
          }
          const Ne = je.current;
          Dt((lt) => ({
            ...lt,
            startIndex: Ne.startIndex,
            autoFollowLatest: !1
          })), Yt(!1);
        }, 150), Mt.current === null && (Mt.current = requestAnimationFrame(() => {
          ht(!0), zt(), Et(), Mt.current = null;
        }));
        return;
      }
    }
    a.preventDefault(), Yt(!0);
    const b = ot.current;
    if (!b) return;
    const y = b.getBoundingClientRect(), f = a.clientX - y.left, e = a.clientY - y.top;
    Vn.current = { x: f, y: e };
    const O = je.current.startIndex, _ = je.current.candleWidth, z = _ * (1 + Qe);
    if (Math.abs(a.deltaX) > Math.abs(a.deltaY) || a.shiftKey) {
      const m = a.shiftKey ? a.deltaY : a.deltaX, V = vl.current ? 0.02 + (io - 1) * 0.02 : 0.2 + (io - 1) * 0.2, h = m * V / z, L = Math.max(
        0,
        Math.min(o.length - 10, O + h)
      );
      je.current = { startIndex: L, candleWidth: _ }, Mt.current === null && (Mt.current = requestAnimationFrame(() => {
        ht(!0), zt(), Et(), Mt.current = null;
      })), At.current && clearTimeout(At.current), At.current = setTimeout(() => {
        if (me) {
          const He = xe.width - Je, ne = je.current.candleWidth * (1 + Qe), Ve = Math.floor(He / ne), ee = je.current.startIndex + Ve;
          jn.current = !(o.length - 1 < ee);
        }
        const de = je.current;
        Dt((He) => ({
          ...He,
          startIndex: de.startIndex,
          // Keep float precision - no rounding
          autoFollowLatest: !1
        })), Yt(!1);
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
      const h = Sl(_, V);
      if (h === _) return;
      const L = xe.width - Je, de = _ * (1 + Qe), He = h * (1 + Qe), ne = O + L / de, Ve = Math.max(0, ne - L / He);
      Yt(!0), je.current = { startIndex: Ve, candleWidth: h }, Mt.current === null && (Mt.current = requestAnimationFrame(() => {
        ht(!0), zt(), Et(), Mt.current = null;
      })), At.current && clearTimeout(At.current), At.current = setTimeout(() => {
        const ee = je.current;
        Dt((Ne) => ({
          ...Ne,
          candleWidth: ee.candleWidth,
          startIndex: ee.startIndex,
          // Keep float precision
          autoFollowLatest: !1
        })), Yt(!1);
      }, 100);
      return;
    }
    const $ = a.deltaY < 0, g = Sl(_, $);
    if (g === _) return;
    const S = xe.width - Je, B = _ * (1 + Qe), Y = g * (1 + Qe), u = O + S / B, A = Math.max(0, u - S / Y);
    Yt(!0), je.current = { startIndex: A, candleWidth: g }, Mt.current === null && (Mt.current = requestAnimationFrame(() => {
      ht(!0), zt(), Et(), Mt.current = null;
    })), At.current && clearTimeout(At.current), At.current = setTimeout(() => {
      const m = je.current;
      Dt((V) => ({
        ...V,
        candleWidth: m.candleWidth,
        startIndex: m.startIndex,
        // Keep float precision
        autoFollowLatest: !1
      })), Yt(!1);
    }, 100);
  }, [o.length, zt, Sl, xe.width, xe.height, io, en, Dn, n, Ls, ue.autoFollowLatest, Et]), mr = l.useRef(Cl), xr = l.useRef(kl);
  l.useEffect(() => {
    mr.current = Cl;
  }, [Cl]), l.useEffect(() => {
    xr.current = kl;
  }, [kl]);
  const La = l.useRef(null), gs = l.useRef(null), vs = l.useRef(null), Ea = l.useCallback((a) => {
    if (gs.current && (gs.current.el.removeEventListener("wheel", gs.current.fn), gs.current = null), ot.current = a, a) {
      const p = (b) => mr.current(b);
      a.addEventListener("wheel", p, { passive: !1 }), gs.current = { el: a, fn: p };
    }
  }, []), Aa = l.useCallback((a) => {
    if (vs.current && (vs.current.el.removeEventListener("wheel", vs.current.fn), vs.current = null), La.current = a, a) {
      const p = (b) => xr.current(b);
      a.addEventListener("wheel", p, { passive: !1 }), vs.current = { el: a, fn: p };
    }
  }, []);
  l.useEffect(() => () => {
    gs.current && gs.current.el.removeEventListener("wheel", gs.current.fn), vs.current && vs.current.el.removeEventListener("wheel", vs.current.fn);
  }, []), l.useLayoutEffect(() => {
    const a = pt.current;
    if (!a) return;
    const p = a.getBoundingClientRect();
    p.width > 0 && p.height > 0 && to({ width: Math.round(p.width), height: Math.round(p.height) });
    const b = new ResizeObserver((y) => {
      for (const f of y) {
        const e = Math.round(f.contentRect.width), O = Math.round(f.contentRect.height);
        e > 0 && O > 0 && Br.flushSync(() => {
          to(
            (_) => _.width === e && _.height === O ? _ : { width: e, height: O }
          );
        });
      }
    });
    return b.observe(a), () => b.disconnect();
  }, []), l.useEffect(() => {
    kt && kt.width > 0 && kt.height > 0 && to(kt);
  }, [kt]);
  const br = l.useRef(`${d}|${mn}`);
  l.useLayoutEffect(() => {
    const a = `${d}|${mn}`;
    br.current !== a && (br.current = a, !me && Dt((p) => p.autoFollowLatest ? p : { ...p, autoFollowLatest: !0 }));
  }, [d, mn, me]), l.useLayoutEffect(() => {
    (Ie === "footprint_cluster" || Ie === "footprint_profile") && ue.candleWidth < 22 && (Dt((a) => ({ ...a, candleWidth: 22 })), je.current.candleWidth = Math.max(je.current.candleWidth, 22), Rn.current.candleWidth = Math.max(Rn.current.candleWidth, 22));
  }, [Ie]), l.useLayoutEffect(() => {
    if (o.length === 0) return;
    if (me) {
      const e = cs.current, O = xe.width - Je, _ = ue.candleWidth * (1 + Qe), z = Math.floor(O / _), $ = Math.floor(z * 0.9), S = Io.current <= 300 && xe.width > 300;
      if (Io.current = xe.width, o.length !== e || e === 0 || S) {
        const B = e > 0 && o.length < e, Y = Math.max(0, Math.floor(ue.startIndex)), u = Math.min(o.length, Y + z), A = o.length - 1 < u;
        if (e === 0 || B || S || A && !jn.current) {
          const m = Math.max(0, o.length - 1 - $);
          Dt((V) => ({ ...V, startIndex: m, autoFollowLatest: !1 })), B && (jn.current = !1);
        }
      }
      cs.current = o.length;
      return;
    }
    if (!ue.autoFollowLatest) {
      if (ue.startIndex > o.length - 1) {
        const e = xe.width - Je, O = ue.candleWidth * (1 + Qe), _ = Math.max(1, Math.floor(e / O));
        Dt((z) => ({ ...z, startIndex: Math.max(0, o.length - _) }));
      }
      return;
    }
    const a = xe.width - Je, p = ue.candleWidth * (1 + Qe), b = Math.floor(a / p);
    if (o.length > 0 && o.length < b * 0.75) {
      const e = Math.min(
        Bo,
        a * 0.92 / (o.length * (1 + Qe))
      );
      if (e > ue.candleWidth * 1.05) {
        je.current = { startIndex: 0, candleWidth: e }, Dt((O) => ({ ...O, startIndex: 0, candleWidth: e })), cs.current = o.length;
        return;
      }
    }
    const y = Math.min(ue.futureSpace, Math.floor(b * 0.3)), f = Math.max(0, o.length - b + y);
    Dt((e) => ({ ...e, startIndex: f })), cs.current = o.length;
  }, [o.length, xe.width, ue.autoFollowLatest, ue.candleWidth, ue.futureSpace, ue.startIndex, me]), l.useLayoutEffect(() => {
    const a = Ms - so.current;
    a !== 0 && (Dt((p) => ({
      ...p,
      startIndex: Math.max(0, p.startIndex + a)
    })), je.current.startIndex = Math.max(0, je.current.startIndex + a), Rn.current.startIndex = Math.max(0, Rn.current.startIndex + a)), so.current = Ms;
  }, [Ms]), l.useEffect(() => {
    if (Oe == null) {
      Rs.current = void 0;
      return;
    }
    if (o.length === 0 || Rs.current === Oe) return;
    Rs.current = Oe;
    const a = xe.width - Je, p = ue.candleWidth * (1 + Qe), b = Math.floor(a / p), y = Math.min(Oe, o.length - 1), f = Math.floor(b * 0.9), e = Math.max(0, y - f);
    Dt((O) => ({ ...O, startIndex: e, autoFollowLatest: !1 }));
  }, [Oe, o.length, xe.width, ue.candleWidth]), l.useEffect(() => {
    !Ft.current && !Co && bs();
  }, [bs, Co]);
  const Ml = l.useRef(0), ho = l.useRef(null);
  l.useEffect(() => {
    if (n == null || Ft.current) return;
    const a = Date.now(), p = a - Ml.current;
    return p >= 50 ? (Ml.current = a, bs()) : (ho.current && clearTimeout(ho.current), ho.current = setTimeout(() => {
      Ml.current = Date.now(), bs();
    }, 50 - p)), () => {
      ho.current && clearTimeout(ho.current);
    };
  }, [n, bs]), l.useEffect(() => {
    zt();
  }, [zt]), l.useEffect(() => {
    To.current = U, U != null && (Zs.current = !0, requestAnimationFrame(() => {
      zt(), Zs.current = !1;
    }));
  }, [U, zt]);
  const Do = l.useRef(/* @__PURE__ */ new Map()), gr = l.useMemo(() => {
    if (Ft.current && Do.current.size > 0 && o.length === Do.current.size)
      return Do.current;
    const a = /* @__PURE__ */ new Map();
    for (let p = 0; p < o.length; p++)
      a.set(o[p].time, p);
    return Do.current = a, a;
  }, [o]), Fo = l.useCallback(() => {
    if (!Fe) return;
    const a = Dn();
    Ls(a.candles, ue.autoFollowLatest);
    const p = o.length > 0 ? o[o.length - 1] : null, b = o.length >= 2 ? o[o.length - 2] : null, y = p && b ? p.time - b.time : 6e4;
    Fe({
      priceAxisWidth: Je,
      timeToX: (f) => {
        const e = Ft.current ? Rn.current.startIndex : ue.startIndex, _ = (Ft.current ? Rn.current.candleWidth : ue.candleWidth) * (1 + Qe), z = Math.floor(e), $ = (e - z) * _;
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
              return (Y - 1 + V - z) * _ + _ / 2 - $;
            }
            g = Y;
          }
        }
        return g === -1 ? null : (g - z) * _ + _ / 2 - $;
      },
      xToTime: (f) => {
        const e = Ft.current ? Rn.current.startIndex : ue.startIndex, _ = (Ft.current ? Rn.current.candleWidth : ue.candleWidth) * (1 + Qe), z = Math.floor(e), $ = (e - z) * _, g = f + $, S = z + (g - _ / 2) / _;
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
        let e = dn.current, O = hn.current;
        if (!e || O === 0) {
          const _ = xe.width - Je, z = je.current, $ = z.candleWidth * (1 + Qe), g = Math.floor(_ / $), S = Math.max(0, Math.floor(z.startIndex)), B = Math.min(o.length, S + g), Y = o.slice(S, B);
          let u = 1 / 0, A = -1 / 0;
          if (Y.length === 0)
            u = 0, A = 100;
          else {
            for (const Xe of Y)
              Xe.low < u && (u = Xe.low), Xe.high > A && (A = Xe.high);
            n && (n < u && (u = n), n > A && (A = n));
          }
          const m = A - u, V = m * 0.05, h = (A + u) / 2, L = m + V * 2;
          e = {
            min: h - L / 2,
            max: h + L / 2,
            range: L
          };
          const de = r?.rsi?.enabled, He = r?.macd?.enabled, ne = r?.atr?.enabled, Ve = r?.stochastic?.enabled;
          r?.volume?.enabled && o.some((Xe) => Xe.volume !== void 0 && Xe.volume > 0);
          const ee = (de ? 1 : 0) + (He ? 1 : 0) + (ne ? 1 : 0) + (Ve ? 1 : 0), Ne = xe.height - Nt, lt = ee > 0 ? Math.max(60 * ee, Ne * J) : 0;
          O = Ne - lt;
        }
        if (en !== null && Vt !== null) {
          const _ = Sn.current, z = es.current, $ = Vt / _, g = en + z;
          e = {
            min: g - $ / 2,
            max: g + $ / 2,
            range: $
          };
        }
        return O - (f - e.min) / e.range * O;
      },
      yToPrice: (f) => {
        let e = dn.current, O = hn.current;
        if (!e || O === 0) {
          const _ = xe.width - Je, z = je.current, $ = z.candleWidth * (1 + Qe), g = Math.floor(_ / $), S = Math.max(0, Math.floor(z.startIndex)), B = Math.min(o.length, S + g), Y = o.slice(S, B);
          let u = 1 / 0, A = -1 / 0;
          if (Y.length === 0)
            u = 0, A = 100;
          else {
            for (const Xe of Y)
              Xe.low < u && (u = Xe.low), Xe.high > A && (A = Xe.high);
            n && (n < u && (u = n), n > A && (A = n));
          }
          const m = A - u, V = m * 0.05, h = (A + u) / 2, L = m + V * 2;
          e = {
            min: h - L / 2,
            max: h + L / 2,
            range: L
          };
          const de = r?.rsi?.enabled, He = r?.macd?.enabled, ne = r?.atr?.enabled, Ve = r?.stochastic?.enabled;
          r?.volume?.enabled && o.some((Xe) => Xe.volume !== void 0 && Xe.volume > 0);
          const ee = (de ? 1 : 0) + (He ? 1 : 0) + (ne ? 1 : 0) + (Ve ? 1 : 0), Ne = xe.height - Nt, lt = ee > 0 ? Math.max(60 * ee, Ne * J) : 0;
          O = Ne - lt;
        }
        if (en !== null && Vt !== null) {
          const _ = Sn.current, z = es.current, $ = Vt / _, g = en + z;
          e = {
            min: g - $ / 2,
            max: g + $ / 2,
            range: $
          };
        }
        return e.max - f / O * e.range;
      }
    });
  }, [o, ue, xe, Fe, r, J, n, en, Vt, gr]);
  l.useEffect(() => {
    Qn.current = Fo;
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
  ].filter(Boolean).length + (s?.customIndicators?.filter((a) => a.display === "subplot").length || 0), Ba = Tl > 0, vr = xe.height - Nt, Wa = Tl > 0 ? Math.max(60 * Tl, vr * J) : 0, yr = vr - Wa, kr = l.useCallback((a) => {
    a.preventDefault(), a.stopPropagation(), Be(!0);
    const p = "touches" in a ? a.touches[0].clientY : a.clientY;
    Ht.current = { y: p, ratio: J };
  }, [J]);
  l.useEffect(() => {
    if (!Pt) return;
    const a = (b) => {
      const y = "touches" in b ? b.touches[0].clientY : b.clientY, e = (Ht.current.y - y) / (xe.height - Nt), O = Math.max(0.1, Math.min(0.6, Ht.current.ratio + e));
      ge(O);
    }, p = () => {
      Be(!1);
    };
    return window.addEventListener("mousemove", a), window.addEventListener("mouseup", p), window.addEventListener("touchmove", a), window.addEventListener("touchend", p), () => {
      window.removeEventListener("mousemove", a), window.removeEventListener("mouseup", p), window.removeEventListener("touchmove", a), window.removeEventListener("touchend", p);
    };
  }, [Pt, xe.height]);
  const _o = (a) => {
    const { kind: p, label: b, menuKey: y, engineLabel: f, ciId: e, sid: O, remove: _ } = a, z = "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground transition-colors", $ = () => {
      p !== "formula" || !e || !Me || (Me({
        ...r,
        customIndicators: (r.customIndicators || []).map((B) => B.id === e ? { ...B, enabled: !1 } : B)
      }), ye(null), pe(null));
    }, g = (B) => {
      B.stopPropagation(), jt({
        visible: !0,
        x: B.clientX,
        y: B.clientY,
        key: y,
        title: b,
        custom: p === "engine" ? { kind: p, label: f || b } : p === "formula" ? { kind: p, ciId: e } : { kind: p, sid: O }
      });
    }, S = p === "engine" && !!rt && !!f || p === "formula" && !!Tn;
    return /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
      p === "formula" && /* @__PURE__ */ t.jsx("button", { onClick: (B) => {
        B.stopPropagation(), $();
      }, className: `${z} hover:text-foreground`, title: `Hide ${b}`, children: /* @__PURE__ */ t.jsx(qo, { className: "w-[15px] h-[15px]" }) }),
      S && /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: (B) => {
            B.stopPropagation(), p === "engine" ? rt?.(f) : Tn?.();
          },
          className: `${z} hover:text-foreground`,
          title: `${b} Settings`,
          children: /* @__PURE__ */ t.jsx(Go, { className: "w-[15px] h-[15px]" })
        }
      ),
      /* @__PURE__ */ t.jsx("button", { onClick: (B) => {
        B.stopPropagation(), _();
      }, className: `${z} hover:text-destructive`, title: `Remove ${b}`, children: /* @__PURE__ */ t.jsx(Zo, { className: "w-[15px] h-[15px]" }) }),
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
            width: xe.width * In,
            height: xe.height * In,
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
            width: xe.width * In,
            height: xe.height * In,
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
              const p = ot.current;
              if (!p) return;
              const b = p.getBoundingClientRect(), y = a.clientX - b.left, f = a.clientY - b.top, e = on.current, O = (h) => !!h && f >= h.top && f <= h.bottom, _ = r?.customBrueScripts || {}, z = (h, L) => {
                pe(`script-${h}`), jt({
                  visible: !0,
                  x: a.clientX,
                  y: a.clientY,
                  key: `script_${h}`,
                  title: _[h]?.name || L,
                  custom: { kind: "brue", sid: h }
                });
              };
              for (const h of Fr()) {
                const L = r[h];
                if (!L?.enabled || !s?.[h] || !O(e[h])) continue;
                a.preventDefault(), a.stopPropagation();
                const de = L.sourceScriptId;
                if (de && _[de]?.enabled) {
                  z(de, Ko(h));
                  return;
                }
                pe(`sp-${h}`), jt({
                  visible: !0,
                  x: a.clientX,
                  y: a.clientY,
                  key: h,
                  title: Ko(h)
                });
                return;
              }
              for (const h of r.customIndicators || []) {
                if (!h.enabled || h.display !== "subplot" || !O(e[`custom_${h.id}`])) continue;
                a.preventDefault(), a.stopPropagation();
                const L = typeof h.expression == "string" ? h.expression : "";
                if (L.startsWith("brue:") && h.scriptId)
                  z(h.scriptId, h.name || "Brue script");
                else if (L.startsWith("local:")) {
                  const de = h.group || L.split(":")[1] || h.name;
                  pe(`ci-${h.id}`), jt({
                    visible: !0,
                    x: a.clientX,
                    y: a.clientY,
                    key: `custom_${h.id}`,
                    title: de || "Indicator",
                    custom: { kind: "engine", label: de }
                  });
                } else
                  pe(`ci-${h.id}`), jt({
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
              const S = je.current, B = S.candleWidth * (1 + Qe), u = Math.max(0, Math.floor(S.startIndex)) + Math.round(y / B), A = 8, m = (h) => {
                if (isNaN(h) || !isFinite(h)) return !1;
                const L = g - (h - $.min) / $.range * g;
                return Math.abs(f - L) < A;
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
                  a.preventDefault(), a.stopPropagation(), pe(h.key), jt({ visible: !0, x: a.clientX, y: a.clientY, key: h.key, title: h.title });
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
              left: ns ? (tr || 295) + 6 : 6,
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
                    oa(!ns);
                  },
                  className: "flex items-center justify-center w-4 h-4 rounded transition-all duration-200",
                  style: { background: "rgba(128, 128, 128, 0.3)" },
                  title: ns ? "Hide OHLC" : "Show OHLC",
                  children: ns ? /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", className: "w-2.5 h-2.5", fill: "none", stroke: "#9ca3af", strokeWidth: "3", strokeLinecap: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M10 4L5 8L10 12" }) }) : /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", className: "w-2.5 h-2.5", fill: "none", stroke: "#9ca3af", strokeWidth: "3", strokeLinecap: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M6 4L11 8L6 12" }) })
                }
              ),
              ns && d && (() => {
                const a = /* @__PURE__ */ new Date(), p = $u(d), b = Qr(d);
                let y = "", f = "", e = 0, O = 0, _ = !1, z = b ? "#22c55e" : "#ef4444", $ = b ? "Market open" : "Market closed", g = "Real time";
                const S = Hu(a), B = S.hours * 60 + S.minutes, Y = S.day, u = S.isBST, A = u ? "BST (UTC+1)" : "GMT (UTC+0)", m = String(S.hours).padStart(2, "0"), V = String(S.minutes).padStart(2, "0"), h = Vu(d);
                if (p === "crypto")
                  _ = !0, y = "24/7", f = "Always open", z = "#22c55e", $ = "Market open";
                else if (p === "forex")
                  _ = !0, y = u ? "Sun 10 PM – Fri 10 PM BST" : "Sun 10 PM – Fri 10 PM GMT", f = A, b || ($ = "Weekend — market closed");
                else if (p === "stock" && h) {
                  const he = Uo(h);
                  e = he.openHour * 60 + he.openMinute, O = he.closeHour * 60 + he.closeMinute;
                  const Le = String(he.openHour).padStart(2, "0"), ct = he.openMinute === 0 ? "00" : String(he.openMinute).padStart(2, "0"), et = String(he.closeHour).padStart(2, "0"), Kt = he.closeMinute === 0 ? "00" : String(he.closeMinute).padStart(2, "0");
                  if (y = `${Le}:${ct} – ${et}:${Kt} ${he.tzLabel}`, f = `${he.exchange} (${he.tzLabel})`, he.lunchBreak) {
                    const Cn = `${String(he.lunchBreak.startHour).padStart(2, "0")}:${String(he.lunchBreak.startMinute).padStart(2, "0")}`, tn = `${String(he.lunchBreak.endHour).padStart(2, "0")}:${String(he.lunchBreak.endMinute).padStart(2, "0")}`;
                    y += ` (break ${Cn}–${tn})`;
                  }
                } else if (p === "stock") {
                  e = 14 * 60 + 30, O = 21 * 60, Xu(a) && (O = 18 * 60, z = b ? "#f59e0b" : "#ef4444", $ = b ? "Early close today" : "Market closed");
                  const he = Math.floor(e / 60), Le = Math.floor(O / 60), ct = e % 60 === 0 ? ":00" : ":30", et = O % 60 === 0 ? ":00" : ":30";
                  y = `${he}${ct} – ${Le}${et} ${u ? "BST" : "GMT"}`, f = `NYSE/NASDAQ (${A})`;
                } else if (p === "commodity" || p === "index") {
                  _ = !0, y = u ? "Sun 11 PM – Fri 10 PM BST" : "Sun 11 PM – Fri 10 PM GMT", f = A;
                  const he = u ? 23 * 60 : 22 * 60, Le = u ? 24 * 60 : 23 * 60;
                  b && B >= he - 15 && B < he ? ($ = "Closing soon — daily break", z = "#f59e0b") : !b && B >= he && B < Le && ($ = "Daily maintenance break");
                }
                let L = "";
                if (!_ && p === "stock") {
                  let he = B;
                  if (h)
                    try {
                      const Le = Uo(h), et = new Intl.DateTimeFormat("en-GB", { timeZone: Le.timezone, hour: "numeric", minute: "numeric", hour12: !1 }).formatToParts(a), Kt = parseInt(et.find((tn) => tn.type === "hour")?.value || "0"), Cn = parseInt(et.find((tn) => tn.type === "minute")?.value || "0");
                      he = Kt * 60 + Cn;
                    } catch {
                    }
                  if (b) {
                    const Le = O - he;
                    if (Le > 0) {
                      const ct = Math.floor(Le / 60), et = Le % 60;
                      L = ct > 0 ? `Closes in ${ct}h ${et}m` : `Closes in ${et} minutes`;
                    }
                  } else {
                    const Le = h ? (() => {
                      try {
                        const et = new Intl.DateTimeFormat("en-GB", { timeZone: Uo(h).timezone, weekday: "short" }).formatToParts(a).find((Kt) => Kt.type === "weekday")?.value || "";
                        return { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5 }[et] || 0;
                      } catch {
                        return 0;
                      }
                    })() : Y;
                    if (Le >= 1 && Le <= 5 && he < e) {
                      const ct = e - he, et = Math.floor(ct / 60), Kt = ct % 60;
                      L = et > 0 ? `Opens in ${et}h ${Kt}m` : `Opens in ${Kt} minutes`;
                    }
                  }
                }
                let de = 0;
                if (!_ && b && O > e) {
                  let he = B;
                  if (h)
                    try {
                      const Le = Uo(h), et = new Intl.DateTimeFormat("en-GB", { timeZone: Le.timezone, hour: "numeric", minute: "numeric", hour12: !1 }).formatToParts(a), Kt = parseInt(et.find((tn) => tn.type === "hour")?.value || "0"), Cn = parseInt(et.find((tn) => tn.type === "minute")?.value || "0");
                      he = Kt * 60 + Cn;
                    } catch {
                    }
                  de = Math.max(0, Math.min(1, (he - e) / (O - e)));
                }
                const He = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][Y], ne = typeof document < "u" && document.documentElement.classList.contains("dark"), Ve = ne ? "rgba(22, 25, 35, 0.98)" : "rgba(255, 255, 255, 0.98)", ee = ne ? "rgba(55, 60, 75, 0.6)" : "rgba(210, 215, 225, 0.8)", Ne = ne ? "#7b8094" : "#6b7280", lt = ne ? "#a0a6b8" : "#374151", Xe = ne ? "#2a2e3a" : "#e5e7eb";
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
                            he.stopPropagation(), nr((Le) => !Le);
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
                            background: Ve,
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
                              L && /* @__PURE__ */ t.jsx("p", { style: { color: Ne, fontSize: 12, margin: "4px 0 0 16px", lineHeight: 1.3 }, children: L })
                            ] }),
                            !_ && p === "stock" && /* @__PURE__ */ t.jsxs("div", { style: { padding: "6px 16px 10px" }, children: [
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Ne, fontSize: 9, fontWeight: 700, letterSpacing: 1.2, fontFamily: '"SF Mono", Consolas, monospace' }, children: He }),
                                /* @__PURE__ */ t.jsx("div", { style: { flex: 1, height: 5, borderRadius: 3, background: Xe, overflow: "hidden", position: "relative" }, children: b && /* @__PURE__ */ t.jsx(
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
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 10, color: Ne, fontFamily: '"SF Mono", Consolas, monospace' }, children: [
                                /* @__PURE__ */ t.jsx("span", { children: y.split("–")[0]?.trim() }),
                                /* @__PURE__ */ t.jsx("span", { children: y.split("–")[1]?.trim() })
                              ] })
                            ] }),
                            /* @__PURE__ */ t.jsx("div", { style: { height: 1, background: ee, margin: "0 12px" } }),
                            /* @__PURE__ */ t.jsxs("div", { style: { padding: "10px 16px 14px" }, children: [
                              f && /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Ne }, children: "Exchange timezone" }),
                                /* @__PURE__ */ t.jsx("span", { style: { color: lt, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: f })
                              ] }),
                              y && p !== "stock" && /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Ne }, children: "Session" }),
                                /* @__PURE__ */ t.jsx("span", { style: { color: lt, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: y })
                              ] }),
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Ne }, children: "Local time" }),
                                /* @__PURE__ */ t.jsxs("span", { style: { color: lt, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: [
                                  m,
                                  ":",
                                  V,
                                  " ",
                                  u ? "BST" : "GMT"
                                ] })
                              ] }),
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Ne }, children: "Update frequency" }),
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
        ns && r && Me && (() => {
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
          })), b = Ze.toolbarLineHeight;
          let y = Ze.toolbarStartY;
          const f = [], e = r?.customBrueScripts || {};
          for (const g of p) {
            if (!g.enabledCheck()) continue;
            if (g.key !== "movingAverages") {
              const u = r?.[g.key]?.sourceScriptId;
              if (u && e[u]?.enabled) continue;
            }
            const S = Hs.current[g.key] || g.endXSource() || 150;
            if (g.key === "movingAverages" && s?.movingAverages?.length > 0) {
              const u = r.movingAverages?.lines ?? [], A = r?.customBrueScripts || {};
              for (let m = 0; m < s.movingAverages.length; m++) {
                const V = u[m]?.sourceScriptId;
                if (V && A[V]?.enabled) continue;
                const h = `movingAverages__${m}`, L = y;
                y += b;
                const de = Bt === h, He = u[m], ne = He ? `${He.type} ${He.period}` : "MA", Ve = () => {
                  const ee = u.filter((Ne, lt) => lt !== m);
                  Me({
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
                      style: { left: 0, top: L - Ze.toolbarRowYOffset, height: b },
                      onMouseEnter: () => {
                        ye(h), ln.current = !0, Rt.current && clearTimeout(Rt.current);
                      },
                      onMouseLeave: () => {
                        Rt.current = setTimeout(() => {
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
                              ee.stopPropagation(), pe((Ne) => Ne === h ? null : h), ye(h);
                            },
                            onContextMenu: (ee) => {
                              ee.preventDefault(), ee.stopPropagation(), pe(h), jt({ visible: !0, x: ee.clientX, y: ee.clientY, key: h, title: ne });
                            }
                          }
                        ),
                        de && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (ee) => {
                                ee.stopPropagation(), Ve();
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
                                ee.stopPropagation(), Vs({ type: "movingAverages", position: { x: S, y: L } });
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
                                ee.stopPropagation(), Ve();
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
                                ee.stopPropagation(), pe(h), jt({ visible: !0, x: ee.clientX, y: ee.clientY, key: h, title: ne });
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
            y += b;
            const Y = Bt === g.key;
            Y || g.key, f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: {
                    left: 0,
                    top: B - Ze.toolbarRowYOffset,
                    height: b
                  },
                  onMouseEnter: () => {
                    ye(g.key), ln.current = !0, Rt.current && clearTimeout(Rt.current);
                  },
                  onMouseLeave: () => {
                    Rt.current = setTimeout(() => {
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
                          u.preventDefault(), u.stopPropagation(), pe(g.key), jt({ visible: !0, x: u.clientX, y: u.clientY, key: g.key, title: g.title });
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
                            A && Me({ ...r, [g.key]: { ...A, enabled: !1 } }), ye(null), pe(null);
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
                            u.stopPropagation(), Vs({ type: g.key, position: { x: S, y: B } });
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
                            A && Me({ ...r, [g.key]: { ...A, enabled: !1 } }), ye(null), pe(null);
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
                            u.stopPropagation(), pe(g.key), jt({ visible: !0, x: u.clientX, y: u.clientY, key: g.key, title: g.title });
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
          const O = (r?.customIndicators || []).filter((g) => g.enabled && g.display === "overlay"), _ = /* @__PURE__ */ new Map(), z = [];
          for (const g of O)
            if (typeof g.expression == "string" && g.expression.startsWith("brue:") && g.scriptId) {
              const B = g.scriptId;
              _.has(B) || _.set(B, g);
            } else
              z.push(g);
          for (const g of z) {
            const S = `custom_overlay_${g.id}`, B = Hs.current[S] || bt[S] || 150, Y = y;
            y += b;
            const u = `ci-${g.id}`, A = Bt === u, m = typeof g.expression == "string" && g.expression.startsWith("local:"), V = m ? g.group || g.expression.split(":")[1] || g.name : null, h = () => {
              m ? Ge?.(V) : Me && Me({
                ...r,
                customIndicators: (r.customIndicators || []).filter((L) => L.id !== g.id)
              }), ye(null), pe(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: Y - Ze.toolbarRowYOffset, height: b },
                  onMouseEnter: () => {
                    ye(u), ln.current = !0, Rt.current && clearTimeout(Rt.current);
                  },
                  onMouseLeave: () => {
                    Rt.current = setTimeout(() => {
                      ye((L) => L === u ? null : L), ln.current = !1;
                    }, 150);
                  },
                  children: [
                    A && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: B + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: B, height: 16 },
                        onClick: (L) => {
                          L.stopPropagation(), pe((de) => de === u ? null : u), ye(u);
                        },
                        onContextMenu: (L) => {
                          L.preventDefault(), L.stopPropagation(), pe(u), jt({
                            visible: !0,
                            x: L.clientX,
                            y: L.clientY,
                            key: S,
                            title: m && V || g.name,
                            custom: m ? { kind: "engine", label: V } : { kind: "formula", ciId: g.id }
                          });
                        }
                      }
                    ),
                    A && _o({
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
          for (const [g, S] of _.entries()) {
            const B = `script_${g}`, Y = Hs.current[B] || bt[B] || 150, u = y;
            y += b;
            const A = `script-${g}`, m = Bt === A, V = r?.customBrueScripts?.[g]?.name || S.name || "Brue script", h = () => {
              re?.(g), ye(null), pe(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: u - Ze.toolbarRowYOffset, height: b },
                  onMouseEnter: () => {
                    ye(A), ln.current = !0, Rt.current && clearTimeout(Rt.current);
                  },
                  onMouseLeave: () => {
                    Rt.current = setTimeout(() => {
                      ye((L) => L === A ? null : L), ln.current = !1;
                    }, 150);
                  },
                  children: [
                    m && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: Y + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: Y, height: 16 },
                        onClick: (L) => {
                          L.stopPropagation(), pe((de) => de === A ? null : A), ye(A);
                        },
                        onContextMenu: (L) => {
                          L.preventDefault(), L.stopPropagation(), pe(A), jt({
                            visible: !0,
                            x: L.clientX,
                            y: L.clientY,
                            key: B,
                            title: V,
                            custom: { kind: "brue", sid: g }
                          });
                        }
                      }
                    ),
                    m && _o({
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
            if (!S?.enabled || _.has(g)) continue;
            const B = `script_${g}`, Y = Hs.current[B] || bt[B] || 150, u = y;
            y += b;
            const A = `script-${g}`, m = Bt === A, V = S.name || "Brue script", h = () => {
              re?.(g), ye(null), pe(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: u - Ze.toolbarRowYOffset, height: b },
                  onMouseEnter: () => {
                    ye(A), ln.current = !0, Rt.current && clearTimeout(Rt.current);
                  },
                  onMouseLeave: () => {
                    Rt.current = setTimeout(() => {
                      ye((L) => L === A ? null : L), ln.current = !1;
                    }, 150);
                  },
                  children: [
                    m && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: Y + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: Y, height: 16 },
                        onClick: (L) => {
                          L.stopPropagation(), pe((de) => de === A ? null : A), ye(A);
                        },
                        onContextMenu: (L) => {
                          L.preventDefault(), L.stopPropagation(), pe(A), jt({
                            visible: !0,
                            x: L.clientX,
                            y: L.clientY,
                            key: B,
                            title: V,
                            custom: { kind: "brue", sid: g }
                          });
                        }
                      }
                    ),
                    m && _o({
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
        r && Me && (() => {
          const a = Fr().map((b) => ({ key: b, title: Ko(b) })), p = r?.customBrueScripts || {};
          return a.map(({ key: b, title: y }) => {
            const f = on.current[b];
            if (!s?.[b] || !f) return null;
            const O = r?.[b]?.sourceScriptId;
            if (O && p[O]?.enabled) return null;
            const _ = Yn.current[b] || sr[b] || 150, z = `sp-${b}`, $ = Bt === z;
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
                  ye(z), ln.current = !0, Rt.current && clearTimeout(Rt.current);
                },
                onMouseLeave: () => {
                  Rt.current = setTimeout(() => {
                    ye((g) => g === z ? null : g), ln.current = !1;
                  }, 150);
                },
                children: [
                  $ && /* @__PURE__ */ t.jsx(
                    "div",
                    {
                      className: "absolute inset-0 pointer-events-none",
                      style: {
                        width: _ + 105,
                        borderRadius: 3,
                        background: "rgba(59, 130, 246, 0.08)"
                      }
                    }
                  ),
                  /* @__PURE__ */ t.jsx(
                    "div",
                    {
                      className: "cursor-pointer select-none",
                      style: { width: _, height: 16 },
                      onClick: (g) => {
                        g.stopPropagation(), pe((S) => S === z ? null : z), ye(z);
                      },
                      onContextMenu: (g) => {
                        g.preventDefault(), g.stopPropagation(), pe(z), jt({ visible: !0, x: g.clientX, y: g.clientY, key: b, title: y });
                      }
                    }
                  ),
                  $ && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (g) => {
                          g.stopPropagation();
                          const S = r[b];
                          S && Me({ ...r, [b]: { ...S, enabled: !1 } }), ye(null), pe(null);
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
                          g.stopPropagation(), Vs({ type: b, position: { x: _, y: f.top } });
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
                          const S = r[b];
                          S && Me({ ...r, [b]: { ...S, enabled: !1 } }), ye(null), pe(null);
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
                          g.stopPropagation(), pe(z), jt({ visible: !0, x: g.clientX, y: g.clientY, key: b, title: y });
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: "More options",
                        children: /* @__PURE__ */ t.jsx(Jo, { className: "w-[15px] h-[15px]" })
                      }
                    )
                  ] })
                ]
              },
              `sp-row-${b}`
            );
          });
        })(),
        r && Me && (() => {
          const a = (r?.customIndicators || []).filter((e) => e.enabled && e.display === "subplot"), p = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map();
          for (const e of a)
            if (typeof e.expression == "string" && e.expression.startsWith("brue:") && e.scriptId) {
              const _ = e.scriptId;
              p.has(_) || p.set(_, e);
            } else if (typeof e.expression == "string" && e.expression.startsWith("local:") && e.group) {
              const _ = e.group;
              b.has(_) || b.set(_, e);
            }
          const y = [], f = [];
          for (const [e, O] of p.entries())
            f.push({
              rowKey: `script-${e}`,
              firstPlot: O,
              label: r?.customBrueScripts?.[e]?.name || O.name || "Brue script",
              kind: "brue",
              handle: e,
              remove: () => re?.(e)
            });
          for (const [e, O] of b.entries())
            f.push({
              rowKey: `engine-sp-${e}`,
              firstPlot: O,
              label: e,
              kind: "engine",
              handle: e,
              remove: () => Ge?.(e)
            });
          for (const { rowKey: e, firstPlot: O, label: _, kind: z, handle: $, remove: g } of f) {
            const S = on.current[`custom_${O.id}`];
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
                    ye(e), ln.current = !0, Rt.current && clearTimeout(Rt.current);
                  },
                  onMouseLeave: () => {
                    Rt.current = setTimeout(() => {
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
                          A.preventDefault(), A.stopPropagation(), pe(e), jt({
                            visible: !0,
                            x: A.clientX,
                            y: A.clientY,
                            key: `custom_${O.id}`,
                            title: _,
                            custom: z === "engine" ? { kind: "engine", label: $ } : { kind: "brue", sid: $ }
                          });
                        }
                      }
                    ),
                    B && _o({
                      kind: z,
                      label: _,
                      menuKey: `custom_${O.id}`,
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
              width: Je,
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
              bottom: Nt + 8,
              left: `calc(50% - ${Je / 2}px)`,
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
        ms && /* @__PURE__ */ t.jsx(
          "div",
          {
            className: "absolute z-50 flex items-center justify-center",
            style: {
              top: 4,
              // Desktop reserves the RIGHT_TOOLBAR_WIDTH gap because the price
              // axis carries the right toolbar overlay; phone/tablet have no
              // overlay, so the reset button uses the full axis width.
              right: Un ?? (Ze.yAxisResetUsesToolbarGap ? Ol : 0),
              width: Un !== void 0 ? Je - Un : Ze.yAxisResetUsesToolbarGap ? Je - Ol : Je
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
              right: Je,
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
        ao && r && Me && xe && /* @__PURE__ */ t.jsx(
          zu,
          {
            type: ao.type,
            config: r,
            onConfigChange: Me,
            position: ao.position,
            onClose: () => Vs(null)
          }
        ),
        Wn && Wn.visible && r && Me && (() => {
          const a = ot.current?.getBoundingClientRect();
          if (!a) return null;
          const p = Wn.x - a.left, b = Wn.y - a.top, y = Wn.key, f = Wn.custom, e = () => {
            f?.kind === "brue" ? re?.(f.sid) : f?.kind === "engine" ? Ge?.(f.label) : f?.kind === "formula" && Me({
              ...r,
              customIndicators: (r.customIndicators || []).filter((O) => O.id !== f.ciId)
            });
          };
          return Br.createPortal(
            (() => {
              const O = "var(--text)", _ = "var(--dim)", z = "var(--hover)", $ = "var(--edge)", g = {
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
                    left: Math.min(Wn.x, window.innerWidth - 170),
                    top: Math.min(Wn.y, window.innerHeight - 140)
                  },
                  children: [
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        style: { position: "fixed", inset: 0, zIndex: -1 },
                        onClick: () => {
                          jt(null), pe(null);
                        },
                        onContextMenu: (S) => {
                          S.preventDefault(), jt(null), pe(null);
                        }
                      }
                    ),
                    /* @__PURE__ */ t.jsx("div", { style: {
                      padding: "5px 10px 3px",
                      fontSize: "11px",
                      color: _,
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
                          Vs({ type: y, position: { x: p, y: b } }), jt(null);
                        },
                        children: "Settings..."
                      }
                    ),
                    f?.kind === "engine" && rt && /* @__PURE__ */ t.jsx(
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
                          rt(f.label), jt(null);
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
                          S && Me({ ...r, [y]: { ...S, enabled: !1 } }), jt(null), pe(null);
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
                            S && Me({ ...r, [y]: { ...S, enabled: !1 } });
                          }
                          jt(null), pe(null);
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
function pd({ active: o, title: n, icon: d, onClick: I }) {
  return /* @__PURE__ */ t.jsxs(
    "button",
    {
      onClick: I,
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
function el({ active: o, title: n, icon: d, onClick: I }) {
  return /* @__PURE__ */ t.jsx(
    "button",
    {
      onClick: I,
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
  onToggleMagnet: I,
  hiddenAll: T = !1,
  onToggleHidden: se,
  onClearAll: U,
  collapsed: Pe = !1,
  onToggleCollapsed: r
}) {
  const [Me, re] = l.useState(!1), Ge = Pe ? 16 : 48;
  return Pe ? /* @__PURE__ */ t.jsx("div", { className: "flex flex-col items-center bg-[#1c1c1c] border-r border-[#2a2a2a] shrink-0 py-2", style: { width: Ge, minWidth: Ge }, children: /* @__PURE__ */ t.jsx("button", { onClick: () => r?.(), className: "w-6 h-6 flex items-center justify-center rounded bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] hover:text-[#e8e8e8] hover:bg-[#343434] text-[10px]", children: "›" }) }) : /* @__PURE__ */ t.jsxs("div", { className: "flex flex-col bg-[#1c1c1c] border-r border-[#2a2a2a] shrink-0 select-none", style: { width: Ge, minWidth: Ge }, children: [
    /* @__PURE__ */ t.jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden flex flex-col items-center gap-1 px-1 py-2 scrollbar-thin", children: hd.map((rt, Fe) => /* @__PURE__ */ t.jsxs(Ii.Fragment, { children: [
      Fe > 0 && /* @__PURE__ */ t.jsx("div", { className: "w-8 h-px bg-[#2a2a2a] my-2 shrink-0" }),
      /* @__PURE__ */ t.jsx("div", { className: "flex flex-col items-center gap-1", children: rt.tools.map((Ue) => {
        const ve = fd[Ue];
        return /* @__PURE__ */ t.jsx(
          pd,
          {
            active: o === Ue,
            title: ve.label,
            icon: ve.icon,
            onClick: () => {
              n?.(o === Ue ? "cursor" : Ue);
            }
          },
          Ue
        );
      }) })
    ] }, Fe)) }),
    /* @__PURE__ */ t.jsxs("div", { className: "shrink-0 flex flex-col items-center gap-1 px-1 py-2 border-t border-[#2a2a2a]", children: [
      /* @__PURE__ */ t.jsx(el, { active: d, title: d ? "Magnet ON — snap to OHLC" : "Magnet OFF", icon: "🧲", onClick: () => I?.() }),
      /* @__PURE__ */ t.jsx(el, { active: T, title: T ? "Show drawings" : "Hide all", icon: T ? "👁‍🗨" : "👁", onClick: () => se?.() }),
      /* @__PURE__ */ t.jsx(el, { title: "Remove all drawings", icon: "🗑", onClick: () => re(!0) }),
      /* @__PURE__ */ t.jsx("div", { className: "w-8 h-px bg-[#2a2a2a] my-1" }),
      /* @__PURE__ */ t.jsx(el, { title: "Collapse toolbar", icon: "‹", onClick: () => r?.() })
    ] }),
    Me && /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-[#1c1c1c] border border-[#3a3a3a] rounded-lg p-4 w-[260px] shadow-2xl", children: [
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
  const [d, I] = l.useState(!1), T = l.useRef(null);
  l.useEffect(() => {
    const U = (Pe) => {
      T.current && !T.current.contains(Pe.target) && I(!1);
    };
    return document.addEventListener("mousedown", U), () => document.removeEventListener("mousedown", U);
  }, []);
  const se = $l.find((U) => U.id === o) || $l[0];
  return /* @__PURE__ */ t.jsxs("div", { ref: T, className: "relative", children: [
    /* @__PURE__ */ t.jsxs(
      "button",
      {
        onClick: () => I((U) => !U),
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
            n(U.id), I(!1);
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
const Kn = [
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
  onToggleFav: I
}) {
  const [T, se] = l.useState(!1), [U, Pe] = l.useState(""), r = l.useRef(null);
  l.useEffect(() => {
    const q = (fe) => {
      r.current && !r.current.contains(fe.target) && se(!1);
    };
    return document.addEventListener("mousedown", q), () => document.removeEventListener("mousedown", q);
  }, []);
  const Me = (q) => {
    const fe = q.trim();
    if (!fe) return null;
    if (fe.toLowerCase() === "tick") return Kn.find((Gt) => Gt.label === "tick");
    const st = fe.match(/^(\d+)(s|m|h|d|w|M)$/i);
    if (!st) return null;
    const ce = parseInt(st[1], 10);
    if (!(ce > 0)) return null;
    const kt = st[2], it = kt.toLowerCase();
    let $e = 0;
    if (kt === "M") $e = ce * 2592e6;
    else if (it === "s") $e = ce * 1e3;
    else if (it === "m") $e = ce * 6e4;
    else if (it === "h") $e = ce * 36e5;
    else if (it === "d") $e = ce * 864e5;
    else if (it === "w") $e = ce * 6048e5;
    else return null;
    return $e > 31536e6 ? null : { label: kt === "M" ? `${ce}M` : it === "d" ? `${ce}D` : it === "w" ? `${ce}W` : `${ce}${it}`, ms: $e, sec: Math.floor($e / 1e3) };
  }, re = (q) => d.has(q) || d.has(q.toLowerCase()) || d.has(q.toUpperCase()), Ge = /* @__PURE__ */ new Set(), rt = Kn.filter((q) => d.has(q.label) || d.has(q.label.toLowerCase()) || d.has(q.label.toUpperCase())).filter((q) => {
    const fe = q.label.toLowerCase();
    return Ge.has(fe) ? !1 : (Ge.add(fe), !0);
  }), Fe = ["1m", "5m", "15m", "1h", "4h", "1D"], Ue = rt.length ? rt.map((q) => q.label).slice(0, 6) : Fe, ve = /* @__PURE__ */ new Set(), nt = Ue.filter((q) => {
    const fe = q.toLowerCase();
    return ve.has(fe) ? !1 : (ve.add(fe), !0);
  }), me = (q) => {
    n(q), se(!1);
  }, Oe = (q) => q === "1M" ? "1M" : q.toLowerCase(), Ie = Oe(o.label), at = [
    { title: "Ticks", items: ["tick"] },
    { title: "Seconds", items: ["1s", "5s", "15s", "30s"] },
    { title: "Minutes", items: ["1m", "3m", "5m", "15m", "30m"] },
    { title: "Hours", items: ["1h", "2h", "4h", "6h", "8h", "12h"] },
    { title: "Days & Months", items: ["1D", "3D", "1W", "1M"] }
  ];
  return /* @__PURE__ */ t.jsxs("div", { ref: r, className: "relative", style: { overflow: "visible" }, children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-1 px-2 py-1 rounded-md border border-[#3a3a3a] bg-[#262626] text-[12px] select-none", children: [
      /* @__PURE__ */ t.jsx("div", { className: "flex items-center gap-1", children: nt.map((q) => {
        const fe = Kn.find((ce) => ce.label.toLowerCase() === q.toLowerCase()) || Kn.find((ce) => ce.label === q), st = fe ? Oe(fe.label) === Ie : !1;
        return /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: (ce) => {
              ce.stopPropagation(), fe && me(fe);
            },
            className: `px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${st ? "bg-[#e8e8e8] text-[#1c1c1c]" : "bg-transparent text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
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
            rt.length,
            "/6 favs"
          ] })
        ] }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => se(!1), className: "text-[#b9b9b9] hover:text-[#e8e8e8] text-[14px]", children: "×" })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "p-3 space-y-4 max-h-[60vh] overflow-auto scrollbar-thin", children: [
        rt.length > 0 && /* @__PURE__ */ t.jsxs("div", { children: [
          /* @__PURE__ */ t.jsxs("div", { className: "text-[10px] font-semibold tracking-wider text-[#b9b9b9] mb-2 flex items-center gap-1", children: [
            /* @__PURE__ */ t.jsx("span", { className: "text-[#e8e8e8]", children: "★" }),
            " FAVOURITES"
          ] }),
          /* @__PURE__ */ t.jsx("div", { className: "flex flex-wrap gap-1.5", children: rt.map((q) => {
            const fe = Oe(q.label) === Ie;
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
                      onClick: (st) => {
                        st.stopPropagation(), I(q.label);
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
        at.map((q) => /* @__PURE__ */ t.jsxs("div", { children: [
          /* @__PURE__ */ t.jsx("div", { className: "text-[10px] font-semibold tracking-wider text-[#b9b9b9] mb-2", children: q.title.toUpperCase() }),
          /* @__PURE__ */ t.jsx("div", { className: "grid grid-cols-5 gap-1.5", children: q.items.map((fe) => {
            const st = Kn.find((it) => it.label === fe);
            if (!st) return null;
            const ce = Oe(st.label) === Ie, kt = re(fe);
            return /* @__PURE__ */ t.jsxs(
              "button",
              {
                onClick: () => me(st),
                onContextMenu: (it) => {
                  it.preventDefault(), I(fe);
                },
                className: `relative px-2 py-1.5 rounded-md border text-[11px] font-medium transition-colors ${ce ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8] hover:border-[#4a4a4a]"}`,
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
                onChange: (q) => Pe(q.target.value),
                onKeyDown: (q) => {
                  if (q.key === "Enter") {
                    const fe = Me(U);
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
                  const q = Me(U);
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
  const I = (T) => n({ ...o, ...T });
  return /* @__PURE__ */ t.jsxs("div", { className: "w-[360px] rounded-xl border border-[#3a3a3a] bg-[#1c1c1c] shadow-2xl overflow-hidden", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex justify-between items-center px-4 py-3 border-b border-[#2a2a2a] bg-[#222222]", children: [
      /* @__PURE__ */ t.jsx("span", { className: "font-semibold tracking-wider text-[11px] text-[#e8e8e8]", children: "APPEARANCE" }),
      d && /* @__PURE__ */ t.jsx("button", { onClick: d, className: "w-7 h-7 flex items-center justify-center rounded-md bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] hover:text-[#e8e8e8] hover:bg-[#343434]", children: "×" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "p-4 space-y-5 max-h-[70vh] overflow-auto scrollbar-thin", children: [
      /* @__PURE__ */ t.jsxs("div", { children: [
        /* @__PURE__ */ t.jsx("div", { className: "text-[10px] font-semibold tracking-wider text-[#b9b9b9] mb-2", children: "MARKET COLORS" }),
        /* @__PURE__ */ t.jsx("div", { className: "grid grid-cols-2 gap-2", children: ["teal_rose", "green_red"].map((T) => /* @__PURE__ */ t.jsxs(
          "button",
          {
            onClick: () => I({ marketColors: T }),
            className: `p-2.5 rounded-lg border text-left transition-colors ${o.marketColors === T ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
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
            onClick: () => I({ accent: T }),
            className: `py-2 rounded-lg border text-[11px] font-medium capitalize transition-colors ${o.accent === T ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434]"}`,
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
                onClick: () => I({ liqColormap: T }),
                className: `py-2 rounded-lg border text-[11px] font-medium capitalize transition-colors ${o.liqColormap === T ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434]"}`,
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
                onClick: () => I({ obColormap: T }),
                className: `py-2 rounded-lg border text-[10px] font-medium capitalize transition-colors ${o.obColormap === T ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434]"}`,
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
              Math.round(o.opacity * 100),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 0.1, max: 1, step: 0.05, value: o.opacity, onChange: (T) => I({ opacity: parseFloat(T.target.value) }), className: "accent-[#e8e8e8]" })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[11px] text-[#b9b9b9]", children: [
            "Intensity ",
            /* @__PURE__ */ t.jsx("span", { className: "text-[#e8e8e8] font-medium", children: o.intensity.toFixed(2) })
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 0.1, max: 3, step: 0.1, value: o.intensity, onChange: (T) => I({ intensity: parseFloat(T.target.value) }), className: "accent-[#e8e8e8]" })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[11px] text-[#b9b9b9]", children: [
            "Gamma ",
            /* @__PURE__ */ t.jsx("span", { className: "text-[#e8e8e8] font-medium", children: o.gamma.toFixed(2) })
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 0.5, max: 2.5, step: 0.1, value: o.gamma, onChange: (T) => I({ gamma: parseFloat(T.target.value) }), className: "accent-[#e8e8e8]" })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[11px] text-[#b9b9b9]", children: [
            "Tick ×",
            /* @__PURE__ */ t.jsx("span", { className: "text-[#e8e8e8] font-medium", children: o.tickPerRow })
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 1, max: 8, step: 1, value: o.tickPerRow, onChange: (T) => I({ tickPerRow: parseInt(T.target.value) }), className: "accent-[#e8e8e8]" })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex gap-4 pt-2 border-t border-[#2a2a2a]", children: [
        /* @__PURE__ */ t.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
          /* @__PURE__ */ t.jsx("input", { type: "checkbox", checked: o.linearFilter, onChange: (T) => I({ linearFilter: T.target.checked }), className: "accent-[#e8e8e8]" }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[11px] text-[#b9b9b9]", children: "Smooth" })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
          /* @__PURE__ */ t.jsx("input", { type: "checkbox", checked: o.reachModulation, onChange: (T) => I({ reachModulation: T.target.checked }), className: "accent-[#e8e8e8]" }),
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
  const [I, T] = l.useState(""), [se, U] = l.useState(""), [Pe, r] = l.useState([]);
  l.useEffect(() => {
    let re = !0;
    return o && (async () => {
      try {
        const ve = ["/api/orderflow/tickers?limit=770", "/api/symbols?limit=770", "/api/tickers"];
        for (const nt of ve)
          try {
            const me = await fetch(nt);
            if (me.ok) {
              const Oe = await me.json(), Ie = Oe.tickers || Oe.symbols || Oe.data || [];
              if (Ie.length) {
                const at = Ie.slice(0, 770).map((q) => ({
                  symbol: q.symbol || q.pair || q.name,
                  base: q.base_asset || q.base || (q.symbol || "").split("USDT")[0] || q.symbol,
                  exchange: q.exchange || q.provider || "binancef",
                  price: q.last_price || q.price || 100 + Math.random() * 5e4,
                  change: q.change_pct_24h || q.change || (Math.random() - 0.5) * 10,
                  listed: !0
                }));
                if (re && at.length) {
                  r(at);
                  return;
                }
              }
            }
          } catch {
          }
      } catch {
      }
      if (!re) return;
      const rt = ["BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "DOGE", "AVAX", "DOT", "LINK", "LTC", "BCH", "UNI", "XLM", "ETC", "FIL", "TRX", "APT", "ARB", "OP", "MATIC", "ATOM", "NEAR", "FTM", "ALGO"], Fe = ["binancef", "hl", "coinbase"], Ue = [];
      for (let ve = 0; ve < 770; ve++) {
        const nt = rt[ve % rt.length], me = Fe[ve % Fe.length];
        Ue.push({ symbol: `${nt}${me === "binancef" ? "USDT" : "-USD"}`, base: nt, exchange: me, price: 100 + Math.random() * 5e4, change: (Math.random() - 0.5) * 10, listed: !0 });
      }
      r(Ue);
    })(), () => {
      re = !1;
    };
  }, [o]);
  const Me = l.useMemo(() => Pe.filter((re) => !(se && re.exchange !== se || I && !re.symbol.toLowerCase().includes(I.toLowerCase()) && !re.base.toLowerCase().includes(I.toLowerCase()))).slice(0, 200), [Pe, I, se]);
  return o ? /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-[#1c1c1c] border border-[#3a3a3a] rounded-xl shadow-2xl w-[520px] max-h-[80vh] flex flex-col overflow-hidden", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "px-4 py-3 border-b border-[#2a2a2a] flex items-center gap-3 bg-[#222222]", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t.jsx("span", { className: "text-[12px] font-semibold tracking-wider text-[#e8e8e8]", children: "FIND SYMBOL" }),
        /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9]", children: [
          Pe.length,
          " pairs"
        ] })
      ] }),
      /* @__PURE__ */ t.jsx("button", { onClick: n, className: "ml-auto w-7 h-7 flex items-center justify-center rounded-md bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] hover:text-[#e8e8e8] hover:bg-[#343434]", children: "×" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "p-3 flex gap-2 border-b border-[#2a2a2a] bg-[#1c1c1c]", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ t.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-[#6a6a6a] text-[12px]", children: "⌕" }),
        /* @__PURE__ */ t.jsx("input", { value: I, onChange: (re) => T(re.target.value), placeholder: "Search BTC, ETH, SOL...", className: "w-full pl-8 pr-3 py-2 rounded-lg bg-[#262626] border border-[#3a3a3a] text-[13px] text-[#e8e8e8] placeholder:text-[#6a6a6a] focus:border-[#4a4a4a] focus:outline-none", autoFocus: !0 })
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
      Me.map((re) => /* @__PURE__ */ t.jsxs("button", { onClick: () => {
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
      Me.length === 0 && /* @__PURE__ */ t.jsx("div", { className: "px-4 py-8 text-[13px] text-[#6a6a6a] text-center", children: "No matches found" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "px-4 py-2 text-[10px] text-[#6a6a6a] border-t border-[#2a2a2a] bg-[#222222]", children: [
      "Press Enter to select • ",
      Pe.length,
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
  const [n, d] = l.useState(!1), I = l.useRef(null);
  return l.useEffect(() => {
    const T = (se) => {
      I.current && !I.current.contains(se.target) && d(!1);
    };
    return document.addEventListener("mousedown", T), () => document.removeEventListener("mousedown", T);
  }, []), /* @__PURE__ */ t.jsxs("div", { ref: I, className: "relative", children: [
    /* @__PURE__ */ t.jsxs("button", { onClick: () => d((T) => !T), className: "flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#3a3a3a] bg-[#262626] text-[12px] font-medium text-[#e8e8e8] hover:bg-[#343434] hover:border-[#4a4a4a] transition-colors", children: [
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
      /* @__PURE__ */ t.jsx("div", { className: "p-2 grid gap-1 max-h-[380px] overflow-auto", children: Vr.map((T) => /* @__PURE__ */ t.jsxs("button", { onClick: () => {
        o(T.id), d(!1);
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
  const [d, I] = l.useState(!1), T = l.useRef(null);
  l.useEffect(() => {
    const U = (Pe) => {
      T.current && !T.current.contains(Pe.target) && I(!1);
    };
    return document.addEventListener("mousedown", U), () => document.removeEventListener("mousedown", U);
  }, []);
  const se = tl.find((U) => U.id === o) || tl[0];
  return /* @__PURE__ */ t.jsxs("div", { ref: T, className: "relative", children: [
    /* @__PURE__ */ t.jsxs(
      "button",
      {
        onClick: () => I((U) => !U),
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
            n(U.id), I(!1);
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
const Sd = l.lazy(() => import("./chunks/depth-CvS64Irn.js").then((o) => o.E)), Cd = l.lazy(() => import("./chunks/EdgeDepthDOMPanel-BTcXz2D9.js")), Md = l.lazy(() => import("./chunks/EdgeDepthTapePanel-D8VGo-3N.js")), Td = l.lazy(() => import("./chunks/EdgeDepthFootprintPanel-o1ZQITU4.js")), Id = l.lazy(() => import("./chunks/EdgeDepthVolumeProfilePanel-B1KVIDpA.js")), Rd = l.lazy(() => import("./chunks/EdgeDepthTPOPanel-LE8PBLrF.js")), Pd = l.lazy(() => import("./chunks/EdgeDepthLiquidationPanel-DPB0-guo.js")), jd = l.lazy(() => import("./chunks/EdgeDepthWatchlist-Dw2Nss9z.js")), Nd = l.lazy(() => import("./chunks/EdgeDepthIndicators-CjDmUwSO.js")), Xr = () => /* @__PURE__ */ t.jsx("div", { className: "h-full w-full flex items-center justify-center text-[11px] text-[var(--dim)]", children: "Loading…" }), Yr = {
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
  colors: I,
  active: T,
  onActivate: se,
  kind: U,
  onToggleKind: Pe,
  syncedCrosshairTime: r,
  onCrosshairMove: Me,
  syncedViewportTime: re,
  onViewportTimeChange: Ge,
  quote: rt
}) {
  const [Fe, Ue] = l.useState([]), ve = rl();
  l.useEffect(() => {
    if (U !== "chart") return;
    let me = !1;
    Ue([]);
    const Oe = async () => {
      try {
        const at = await Uu("multi_panel", { symbol: o, timeframe: d, limit: 500 });
        !me && at?.length && Ue(at.map((q) => ({
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
    Oe();
    const Ie = setInterval(Oe, 1e4);
    return () => {
      me = !0, clearInterval(Ie);
    };
  }, [o, d, U]);
  const nt = () => {
    const me = U;
    return me === "depth" ? /* @__PURE__ */ t.jsx(ld, { symbol: o, sourceProvider: n, colors: I, syncedCrosshairTime: r, onCrosshairMove: Me, onToggleKind: Pe }) : me === "edgedepth" ? /* @__PURE__ */ t.jsx(l.Suspense, { fallback: /* @__PURE__ */ t.jsx(Xr, {}), children: /* @__PURE__ */ t.jsx(Sd, { symbol: o, provider: n || "binance", onToggleKind: Pe }) }) : ["dom", "tape", "footprint", "vpvr", "tpo", "liquidations", "watchlist", "indicators", "ed_liquidations", "ed_vpvr", "ed_footprint", "ed_tpo"].includes(me) ? /* @__PURE__ */ t.jsxs(l.Suspense, { fallback: /* @__PURE__ */ t.jsx(Xr, {}), children: [
      me === "dom" && /* @__PURE__ */ t.jsx(Cd, { symbol: o, provider: n || "binance" }),
      me === "tape" && /* @__PURE__ */ t.jsx(Md, { symbol: o, provider: n || "binance" }),
      (me === "footprint" || me === "ed_footprint") && /* @__PURE__ */ t.jsx(Td, { symbol: o, provider: n || "binance" }),
      (me === "vpvr" || me === "ed_vpvr") && /* @__PURE__ */ t.jsx(Id, { symbol: o, provider: n || "binance" }),
      (me === "tpo" || me === "ed_tpo") && /* @__PURE__ */ t.jsx(Rd, { symbol: o, provider: n || "binance" }),
      (me === "liquidations" || me === "ed_liquidations") && /* @__PURE__ */ t.jsx(Pd, { symbol: o, provider: n || "binance" }),
      me === "watchlist" && /* @__PURE__ */ t.jsx(jd, { activeSymbol: o, onSelectSymbol: (Oe) => {
        try {
          window.__lseShell?.selectSymbol?.(Oe);
        } catch {
        }
      } }),
      me === "indicators" && /* @__PURE__ */ t.jsx(Nd, { symbol: o, provider: n || "binance" })
    ] }) : Fe.length > 0 ? /* @__PURE__ */ t.jsx(
      Gl,
      {
        candles: Fe,
        symbol: o,
        timeframe: d,
        chartType: "candlestick",
        livePrice: Fe[Fe.length - 1]?.close ?? null,
        rightOffset: 6,
        colors: I,
        indicators: qs,
        timezone: ve?.data?.timezone || "local",
        syncedCrosshairTime: r ?? void 0,
        onCrosshairMove: Me,
        syncedViewportTime: re ?? void 0,
        onViewportTimeChange: Ge,
        showBidAskSpread: !!rt,
        brokerBid: rt?.bid ?? null,
        brokerAsk: rt?.ask ?? null
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
        border: T ? "1px solid var(--accent-bar, #888)" : "1px solid var(--edge, #2a2e39)"
      },
      children: nt()
    }
  );
}
function Ed({
  layout: o,
  syncSettings: n,
  pair: d,
  timeframe: I,
  colors: T,
  quote: se,
  sourceProvider: U
}) {
  const Pe = Yr[o] || Yr["2x2"], { activePanel: r, panelSymbols: Me, panelKinds: re } = Zl(), Ge = Math.min(r, Pe.count - 1), [rt, Fe] = l.useState([]), [Ue, ve] = l.useState(null), [nt, me] = l.useState(null), Oe = l.useMemo(() => T || al(), [T]);
  l.useEffect(() => {
    Fe((q) => {
      const fe = [...q];
      for (let st = fe.length; st < Pe.count; st++)
        fe.push(st === 0 ? I : zr[st % zr.length]);
      return fe.slice(0, Pe.count);
    });
  }, [Pe.count, I]);
  const Ie = l.useCallback((q) => {
    n.syncCrosshair && ve(q);
  }, [n.syncCrosshair]), at = l.useCallback((q) => {
    n.syncTime && me(q);
  }, [n.syncTime]);
  return /* @__PURE__ */ t.jsx("div", { style: {
    display: "grid",
    width: "100%",
    height: "100%",
    gap: 2,
    gridTemplateColumns: `repeat(${Pe.cols}, 1fr)`,
    gridTemplateRows: `repeat(${Pe.rows}, 1fr)`
  }, children: Array.from({ length: Pe.count }, (q, fe) => /* @__PURE__ */ t.jsx(
    Ld,
    {
      symbol: n.syncSymbol ? d : Me[fe] || d,
      sourceProvider: U,
      timeframe: n.syncInterval ? I : rt[fe] || I,
      colors: Oe,
      active: fe === Ge,
      onActivate: () => On.setActivePanel(fe),
      kind: re[fe] || "chart",
      onToggleKind: () => {
        const st = re[fe] || "chart", ce = ["chart", "edgedepth", "depth", "dom", "tape", "footprint", "vpvr", "tpo", "liquidations", "watchlist", "indicators"], kt = ce.indexOf(st), it = ce[(kt + 1) % ce.length];
        On.setPanelKind(fe, it);
      },
      syncedCrosshairTime: n.syncCrosshair ? Ue : null,
      onCrosshairMove: Ie,
      syncedViewportTime: n.syncTime ? nt : null,
      onViewportTimeChange: at,
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
      const T = (await d.json())?.value ?? {};
      for (const se of ol) {
        const U = T[se];
        typeof U == "string" && localStorage.setItem(se, U);
      }
    }
  } catch {
  }
  const o = localStorage.setItem.bind(localStorage), n = localStorage.removeItem.bind(localStorage);
  localStorage.setItem = (d, I) => {
    o(d, I), ol.includes(d) && Ur();
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
  const I = [];
  let T = 0;
  for (const [se, U] of Object.entries(o))
    for (const [Pe, r] of Object.entries(U.series || {})) {
      const Me = new Array(n.length).fill(NaN);
      let re = 0;
      for (const [Fe, Ue] of r.points || []) {
        const ve = d.get(Fe);
        ve !== void 0 && (Me[ve] = Ue, re++);
      }
      if (!re) continue;
      const rt = Object.keys(U.series).length > 1 ? `${se} ${Pe}` : se;
      I.push({
        id: `local-${se}-${Pe}`,
        name: rt,
        // The prefix is what tells ProChart's formula evaluator to leave this
        // series alone and draw the precomputed values.
        expression: `local:${se}:${Pe}`,
        enabled: !0,
        display: U.overlay ? "overlay" : "subplot",
        color: qr[T++ % qr.length],
        lineWidth: 2,
        zeroLine: !1,
        data: Me,
        kind: r.kind,
        // One pane per ENGINE INDICATOR, not per column: MACD's three series
        // must share a pane and a scale or the histogram is meaningless.
        group: se
      });
    }
  return I;
}
const Wd = l.lazy(() => import("./chunks/depth-CvS64Irn.js").then((o) => o.a)), Dd = l.lazy(() => import("./chunks/depth-CvS64Irn.js").then((o) => o.E)), Gr = l.lazy(() => import("./chunks/EdgeDepthDOMPanel-BTcXz2D9.js")), Fd = l.lazy(() => import("./chunks/EdgeDepthTapePanel-D8VGo-3N.js")), _d = l.lazy(() => import("./chunks/EdgeDepthWatchlist-Dw2Nss9z.js")), Od = l.lazy(() => import("./chunks/EdgeDepthIndicators-CjDmUwSO.js")), $d = l.lazy(() => import("./chunks/EdgeDepthLayers-B8T1v-xC.js")), Hd = l.lazy(() => import("./chunks/EdgeDepthLiquidationPanel-DPB0-guo.js")), Vd = l.lazy(() => import("./chunks/EdgeDepthVolumeProfilePanel-B1KVIDpA.js")), Xd = l.lazy(() => import("./chunks/EdgeDepthFootprintPanel-o1ZQITU4.js")), Yd = l.lazy(() => import("./chunks/EdgeDepthTPOPanel-LE8PBLrF.js")), zd = l.lazy(() => import("./chunks/backtest-CeqYlV1v.js").then((o) => o.bN)), Kd = l.lazy(() => import("./chunks/backtest-CeqYlV1v.js").then((o) => o.bO)), Ud = l.lazy(() => import("./chunks/econ-BeCAerYp.js")), qd = l.lazy(() => import("./chunks/dataviz-D6zeVYjn.js")), Gd = l.lazy(() => import("./chunks/quant-CYlcHa_2.js")), Zd = l.lazy(() => import("./chunks/notebooks-fOzYQotZ.js")), ls = () => /* @__PURE__ */ t.jsx("div", { className: "h-full w-full flex items-center justify-center text-[11px] text-[var(--dim)]", children: "Loading…" }), Jd = {
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
}, Mn = {
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
}, ws = (o) => {
  o.currentTarget.style.background = "var(--hover)";
}, Ss = (o) => {
  o.currentTarget.style.background = "transparent";
};
function Qd({ provider: o, symbol: n, timeframe: d, candles: I, chartType: T = "candlestick", trades: se = [], engineIndicators: U, indicatorPatch: Pe = null, quote: r = null, positions: Me = [], onPositionModify: re, onPositionClose: Ge, autoSelectPositionId: rt = null }) {
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
  const Fe = `${o}|${n}|${d}`, [Ue, ve] = l.useState(() => {
    try {
      const v = `${o}|${n}|${d}`, oe = localStorage.getItem(`lse-candles-${v}`);
      if (oe) {
        const J = JSON.parse(oe);
        if (Array.isArray(J) && J.length > 0)
          return { key: v, older: J.slice(-200), shift: 0 };
      }
    } catch {
    }
    return { key: Fe, older: [], shift: 0 };
  });
  Ue.key !== Fe && ve({ key: Fe, older: [], shift: 0 });
  const nt = l.useRef(null), me = l.useRef(!1), [Oe, Ie] = l.useState(!1), at = l.useMemo(() => {
    if (!Ue.older.length || !I.length) {
      try {
        I.length > 0 && localStorage.setItem(`lse-candles-${Fe}`, JSON.stringify(I.slice(-200)));
      } catch {
      }
      return I;
    }
    const v = I[0].time, oe = [...Ue.older.filter((J) => J.time < v), ...I];
    try {
      localStorage.setItem(`lse-candles-${Fe}`, JSON.stringify(oe.slice(-200)));
    } catch {
    }
    return oe;
  }, [Ue.older, I, Fe]), q = l.useCallback(async () => {
    if (me.current || nt.current === Fe) return;
    const oe = at;
    if (!oe.length || oe.length >= 5e4) return;
    const J = Fe, ge = oe[0].time;
    me.current = !0, Ie(!0);
    try {
      const Pt = `/api/candles?provider=${encodeURIComponent(o)}&symbol=${encodeURIComponent(n)}&timeframe=${encodeURIComponent(d)}&limit=5000&end=${encodeURIComponent(new Date(ge).toISOString())}`, Be = await fetch(Pt);
      if (!Be.ok) {
        let _e = "";
        try {
          _e = String((await Be.json()).detail || "");
        } catch {
        }
        /no (history|prints|data)|served no|no real candles/i.test(_e) && (nt.current = J);
        return;
      }
      const Zt = ((await Be.json()).candles || []).map(([_e, It, ps, en, _t, Vt]) => ({
        time: _e < 1e12 ? _e * 1e3 : _e,
        open: It,
        high: ps,
        low: en,
        close: _t,
        volume: Vt
      })).filter((_e) => _e.time < ge);
      if (!Zt.length) {
        nt.current = J;
        return;
      }
      ve((_e) => _e.key !== J ? _e : {
        key: J,
        older: [...Zt, ..._e.older],
        shift: _e.shift + Zt.length
      });
    } catch {
    } finally {
      me.current = !1, Ie(!1);
    }
  }, [at, o, n, d, Fe]), [fe, st] = l.useState(null), [ce, kt] = l.useState(null), [it, $e] = l.useState("cursor"), [qt, Gt] = l.useState(!1), [dt, Tt] = l.useState(!1), [an, Tn] = l.useState(null), [Wt, $t] = l.useState([]), [cn, Qt] = l.useState(qs), [mn, Un] = l.useState(!1), [Ws, So] = l.useState(!1), [Ms, rs] = l.useState("candles"), [Ts, Is] = l.useState(() => {
    try {
      const v = typeof d == "string" ? d : "1m", oe = Kn.find((J) => J.label.toLowerCase() === v.toLowerCase() || J.label === v);
      if (oe) return oe;
    } catch {
    }
    return Kn.find((v) => v.label === "1m") || Kn[5] || Kn[0];
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
      const v = String(d || "1m"), oe = Kn.find((J) => J.label.toLowerCase() === v.toLowerCase() || J.label === v);
      if (oe && oe.label.toLowerCase() !== Ts.label.toLowerCase())
        Is(oe);
      else if (!oe) {
        const J = v.match(/^(\d+)([smhdwM])$/i);
        if (J) {
          const ge = parseInt(J[1], 10), Pt = J[2];
          let Be = 0;
          const Ht = Pt.toLowerCase();
          Pt === "M" ? Be = ge * 2592e6 : Ht === "s" ? Be = ge * 1e3 : Ht === "m" ? Be = ge * 6e4 : Ht === "h" ? Be = ge * 36e5 : Ht === "d" ? Be = ge * 864e5 : Ht === "w" && (Be = ge * 6048e5), Be > 0 && Is({ label: v, ms: Be, sec: Math.floor(Be / 1e3) });
        } else v.toLowerCase() === "tick" && Is({ label: "tick", ms: 0, sec: 0 });
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
  }), [ot, Ds] = l.useState(!1);
  l.useEffect(() => {
    try {
      localStorage.setItem("ed_appearance", JSON.stringify(pt));
    } catch {
    }
  }, [pt]);
  const [Zs, Js] = l.useState(!1), [Qs, To] = l.useState(!0), [Fs, eo] = l.useState(!1), [In, xe] = l.useState(() => {
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
    Qt((J) => {
      let ge = !1;
      const Pt = { ...J };
      if (oe("vpvr") !== void 0) {
        const Be = !!oe("vpvr");
        J.volumeProfile?.enabled !== Be && (Pt.volumeProfile = { ...J.volumeProfile, enabled: Be, numberOfRows: 48, rowWidth: 15, opacity: 60 }, ge = !0);
      }
      if (oe("session_vwap") !== void 0) {
        const Be = !!oe("session_vwap");
        J.vwap?.enabled !== Be && (Pt.vwap = { ...J.vwap, enabled: Be, color: "#2196F3" }, ge = !0);
      }
      if (oe("prev_day") !== void 0 || oe("prev_week") !== void 0) {
        const Be = !!oe("prev_day") || !!oe("prev_week");
        J.pivotPoints?.enabled !== Be && (Pt.pivotPoints = { ...J.pivotPoints, enabled: Be }, ge = !0);
      }
      return ge ? Pt : J;
    }), oe("liquidations");
  }, []), ue = l.useCallback(() => {
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
  })[v] ?? null, []), je = l.useCallback((v) => {
    $e(v);
    const oe = Dt(v);
    kt(oe);
  }, [Dt]), Rn = l.useCallback((v) => {
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
  })[Ms] || "candlestick", [Ms]), [xn, Ae] = l.useState(null), [wt, vt] = l.useState(!1), [yt, $n] = l.useState(!1), [qn, un] = l.useState(""), [as, Gn] = l.useState(null), [no, is] = l.useState(""), [, Yt] = l.useState(0), [Et, Zn] = l.useState(null), [Pn, Hn] = l.useState(""), [Jn, _s] = l.useState(""), [ht, Qn] = l.useState(""), [cs, Io] = l.useState(!1), jn = l.useRef(null), so = async () => {
    const v = qn.trim();
    if (!v) {
      is("name the template first");
      return;
    }
    await window.__lseShell?.saveLayout?.(v) ? ($n(!1), is(""), Yt((J) => J + 1)) : is("could not save this template");
  };
  l.useEffect(() => {
    if (!xn) return;
    const v = () => {
      Ae(null), vt(!1), $n(!1), Gn(null), is(""), Zn(null), Qn("");
    }, oe = (J) => {
      J.key === "Escape" && v();
    };
    return document.addEventListener("click", v), document.addEventListener("keydown", oe), () => {
      document.removeEventListener("click", v), document.removeEventListener("keydown", oe);
    };
  }, [xn]);
  const Nn = Zl(), Rs = Nn.layout, Vn = Nn.sync, [sn, gn] = l.useState(!1), [us, Ct] = l.useState("appearance"), bn = l.useRef(sn);
  bn.current = sn;
  const Ps = l.useRef(us);
  Ps.current = us, l.useEffect(() => (Xl = (v) => {
    if (!bn.current) {
      Ct(v || "appearance"), gn(!0);
      return;
    }
    if (v && v !== Ps.current) {
      Ct(v);
      return;
    }
    gn(!1);
  }, () => {
    Xl = null;
  }), []), l.useEffect(() => {
    if (!sn) return;
    const v = (oe) => {
      oe.key === "Escape" && gn(!1);
    };
    return document.addEventListener("keydown", v), () => document.removeEventListener("keydown", v);
  }, [sn]);
  const js = l.useRef(null), [vn, Ln] = l.useState(null);
  l.useEffect(() => {
    sn || Ln(null);
  }, [sn]);
  const ds = l.useCallback((v) => {
    if (v.target.closest("button")) return;
    const oe = js.current, J = oe?.offsetParent;
    if (!J || !oe) return;
    const ge = J.getBoundingClientRect(), Pt = oe.getBoundingClientRect(), Be = v.clientX - Pt.left, Ht = v.clientY - Pt.top;
    v.preventDefault();
    const Zt = (It) => {
      Ln({
        x: Math.max(0, Math.min(It.clientX - ge.left - Be, ge.width - Pt.width)),
        y: Math.max(0, Math.min(It.clientY - ge.top - Ht, ge.height - 36))
      });
    }, _e = () => {
      window.removeEventListener("pointermove", Zt), window.removeEventListener("pointerup", _e);
    };
    window.addEventListener("pointermove", Zt), window.addEventListener("pointerup", _e);
  }, []), [yn, Ro] = l.useState({
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
  const Mt = `${o}:${n}`, At = l.useRef(null);
  l.useEffect(() => {
    let v = !0;
    return At.current = null, (async () => {
      const [oe, J] = await Promise.all([
        mo.getDrawings(Mt),
        mo.getIndicators(Mt)
      ]);
      v && ($t(oe), Qt(J ?? qs), Tn(null), At.current = Mt);
    })(), () => {
      v = !1;
    };
  }, [Mt]);
  const En = l.useCallback((v) => {
    $t(v), At.current === Mt && mo.setDrawings(Mt, v);
  }, [Mt]), oo = l.useCallback((v) => {
    Qt(v), At.current === Mt && mo.setIndicators(Mt, v);
  }, [Mt]);
  l.useEffect(() => {
    Pe && Qt((v) => ({ ...v, ...Pe }));
  }, [Pe]);
  const xt = l.useCallback(() => {
    En([]), Tn(null);
  }, [En]);
  l.useCallback((v) => {
    En(Wt.filter((oe) => oe.id !== v)), Tn(null);
  }, [Wt, En]);
  const An = l.useMemo(() => {
    const v = Bd(U, at);
    return v.length ? { ...cn, customIndicators: v } : cn;
  }, [cn, U, at]), hs = rl(), fs = Gu(), Os = l.useMemo(() => {
    const v = al(), oe = hs?.candles, J = hs?.chart;
    let ge;
    return !fs || !oe || !J ? ge = { ...v } : ge = {
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
  }, [hs, fs, pt]), $s = hs?.data?.timezone || "local", Bn = Jd[d] ?? 36e5, kn = I.length ? I[I.length - 1].close : null, [Xn, wn] = l.useState("");
  l.useEffect(() => {
    const v = () => {
      if (d === "tick") {
        wn("");
        return;
      }
      if (!n || !Qr(n)) {
        wn("");
        return;
      }
      const J = Date.now(), ge = Math.ceil(J / Bn) * Bn, Pt = Math.max(0, ge - J), Be = Math.floor(Pt / 1e3), Ht = Math.floor(Be / 60) % 60, Zt = Math.floor(Be / 3600), _e = (It) => String(It).padStart(2, "0");
      wn(Zt > 0 ? `${Zt}:${_e(Ht)}:${_e(Be % 60)}` : `${Ht}:${_e(Be % 60)}`);
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
      ...Me.map((v) => ({ ...v, symbol: n }))
    ],
    [se, Me, n]
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
        /* @__PURE__ */ t.jsx("div", { style: { overflow: "visible", position: "relative", zIndex: 50 }, children: /* @__PURE__ */ t.jsx(bd, { value: Ts, onChange: (v) => {
          Is(v);
          try {
            window.__lseShell?.setTimeframe?.(v.label);
          } catch {
          }
        }, favs: Gs, onToggleFav: Rn }) }),
        /* @__PURE__ */ t.jsx(xd, { value: Ms, onChange: rs }),
        /* @__PURE__ */ t.jsx(wd, { value: Nn.panelKinds[0] || "chart", onChange: (v) => On.setPanelKind(0, v) })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "ml-auto flex items-center gap-1.5 shrink-0", children: [
        /* @__PURE__ */ t.jsx(kd, { onSelect: (v) => On.setPanelKind(0, v) }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => eo((v) => !v), className: `px-3 py-1.5 rounded-md border text-[12px] font-medium transition-colors ${Fs ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`, children: "Layers" }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => Js(!0), className: "px-3 py-1.5 rounded-md border border-[#3a3a3a] bg-[#262626] text-[12px] font-medium text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]", children: "Find" }),
        /* @__PURE__ */ t.jsx("div", { className: "w-px h-5 bg-[#2a2a2a] mx-1" }),
        /* @__PURE__ */ t.jsxs("button", { onClick: () => To((v) => !v), className: `px-2.5 py-1 rounded-full border text-[10px] font-medium flex items-center gap-1.5 transition-colors ${Qs ? "bg-[#21b3a4]/10 border-[#21b3a4]/30 text-[#21b3a4]" : "bg-[#262626] border-[#3a3a3a] text-[#6a6a6a] hover:text-[#b9b9b9]"}`, title: "Real-time follow", children: [
          /* @__PURE__ */ t.jsx("span", { className: `w-1.5 h-1.5 rounded-full ${Qs ? "bg-[#21b3a4] animate-pulse" : "bg-[#6a6a6a]"}` }),
          " ",
          Qs ? "LIVE" : "PAUSED"
        ] }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => Ds((v) => !v), className: `w-8 h-8 rounded-md border flex items-center justify-center transition-colors ${ot ? "bg-[#e8e8e8] border-[#e8e8e8] text-[#1c1c1c]" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}`, children: "⚙" }),
        /* @__PURE__ */ t.jsx("button", { onClick: ue, className: "px-3 py-1.5 rounded-md bg-[#e8e8e8] text-[#1c1c1c] text-[12px] font-semibold hover:bg-white transition-colors", children: "Indicators" })
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "relative flex-1 min-h-0 w-full flex", children: [
      /* @__PURE__ */ t.jsx(
        md,
        {
          activeTool: it,
          onToolSelect: je,
          magnet: dt,
          onToggleMagnet: () => Tt((v) => !v),
          hiddenAll: Ws,
          onToggleHidden: () => So((v) => !v),
          onClearAll: xt,
          collapsed: qt,
          onToggleCollapsed: () => Gt((v) => !v)
        }
      ),
      /* @__PURE__ */ t.jsx(
        "div",
        {
          ref: jn,
          className: "relative flex-1 min-w-0",
          style: cs ? { transform: "scaleY(-1)" } : void 0,
          onContextMenu: (v) => {
            v.preventDefault(), vt(!1), Zn(null), Qn("");
            let oe = null;
            if (Rs === "1x1" && fe && jn.current) {
              const ge = jn.current.getBoundingClientRect(), Pt = cs ? ge.height - (v.clientY - ge.top) : v.clientY - ge.top, Be = fe.yToPrice(Pt);
              Number.isFinite(Be) && Be > 0 && (oe = Be);
            }
            const J = window.__lseShell?.tradeInfo?.() || null;
            Ae({
              x: Math.min(v.clientX, window.innerWidth - 240),
              y: Math.min(v.clientY, window.innerHeight - (J?.available ? 360 : 230)),
              price: oe,
              ref: kn,
              trade: J
            });
          },
          children: Rs !== "1x1" ? /* @__PURE__ */ t.jsx(
            Ed,
            {
              layout: Rs,
              syncSettings: Vn,
              pair: n,
              timeframe: d,
              colors: Os,
              quote: r,
              sourceProvider: o
            }
          ) : Nn.panelKinds[0] === "depth" ? /* @__PURE__ */ t.jsx(l.Suspense, { fallback: /* @__PURE__ */ t.jsx(ls, {}), children: /* @__PURE__ */ t.jsx(
            Wd,
            {
              symbol: n,
              sourceProvider: o,
              colors: Os,
              onToggleKind: () => On.setPanelKind(0, "chart")
            }
          ) }) : Nn.panelKinds[0] === "edgedepth" ? /* @__PURE__ */ t.jsx(l.Suspense, { fallback: /* @__PURE__ */ t.jsx(ls, {}), children: /* @__PURE__ */ t.jsx(
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
          ) }) : ["orderflow", "dom", "tape", "footprint", "vpvr", "tpo", "cvd", "liquidations", "ed_liquidations", "ed_vpvr", "ed_footprint", "ed_tpo", "watchlist", "indicators"].includes(Nn.panelKinds[0]) ? /* @__PURE__ */ t.jsx(l.Suspense, { fallback: /* @__PURE__ */ t.jsx(ls, {}), children: (() => {
            const v = Nn.panelKinds[0];
            return v === "dom" ? /* @__PURE__ */ t.jsx(Gr, { symbol: n, provider: o }) : v === "tape" ? /* @__PURE__ */ t.jsx(Fd, { symbol: n, provider: o }) : v === "footprint" ? /* @__PURE__ */ t.jsx(Xd, { symbol: n, provider: o }) : v === "vpvr" ? /* @__PURE__ */ t.jsx(Vd, { symbol: n, provider: o }) : v === "tpo" ? /* @__PURE__ */ t.jsx(Yd, { symbol: n, provider: o }) : v === "liquidations" ? /* @__PURE__ */ t.jsx(Hd, { symbol: n, provider: o, colormap: pt.liqColormap, intensity: pt.intensity, opacity: pt.opacity, gamma: pt.gamma, noiseFloor: pt.noiseFloor, tickPerRow: pt.tickPerRow, halfLife: pt.halfLife, lowPeak: pt.lowPeak }) : v === "watchlist" ? /* @__PURE__ */ t.jsx(_d, { activeSymbol: n, onSelectSymbol: (oe) => {
              try {
                window.__lseShell?.selectSymbol?.(oe);
              } catch {
              }
            } }) : v === "indicators" ? /* @__PURE__ */ t.jsx(Od, { symbol: n, provider: o }) : /* @__PURE__ */ t.jsx(Gr, { symbol: n, provider: o });
          })() }) : /* @__PURE__ */ t.jsx(t.Fragment, { children: /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
            /* @__PURE__ */ t.jsx(
              Gl,
              {
                candles: at,
                symbol: n,
                timeframe: d,
                chartType: Ft,
                onLoadMore: q,
                isLoadingMore: Oe,
                prependShift: Ue.shift,
                livePrice: kn,
                countdown: Xn,
                timezone: $s,
                rightOffset: 6,
                colors: Os,
                indicators: An,
                onIndicatorsChange: oo,
                onRemoveEngineIndicator: (v) => window.__lseShell?.removeIndicator?.(v),
                onEditEngineIndicator: (v) => {
                  window.__lseShell?.editIndicator?.(v) || ue();
                },
                drawings: Wt,
                selectedDrawingId: an,
                drawingCursorRef: No,
                requestRedrawRef: Po,
                scrollOffsetRef: jo,
                onScrollSync: () => il.current?.(),
                onConverterReady: st,
                onOpenSettings: ue,
                positionLines: cl,
                onPositionModify: re,
                onPositionClose: Ge,
                autoSelectPositionId: rt,
                showBidAskSpread: !!r,
                brokerBid: r?.bid ?? null,
                brokerAsk: r?.ask ?? null
              },
              Fe
            ),
            /* @__PURE__ */ t.jsx(
              Zu,
              {
                activeTool: ce,
                onToolSelect: kt,
                drawings: Wt,
                onDrawingsChange: En,
                selectedDrawingId: an,
                onSelectDrawing: Tn,
                converter: fe,
                scrollSyncRef: il,
                scrollOffsetRef: jo,
                drawingCursorRef: No,
                requestRedrawRef: Po,
                toolSettings: yn,
                isLocked: mn,
                isHidden: Ws,
                currentSymbol: n,
                timeframeMs: Bn,
                currentPrice: kn ?? void 0,
                candles: I
              }
            )
          ] }) })
        }
      ),
      sn && /* @__PURE__ */ t.jsxs(
        "div",
        {
          ref: js,
          className: "absolute z-[95] w-80",
          style: {
            ...vn ? { left: vn.x, top: vn.y } : { top: 8, right: 8 },
            background: "var(--panel)",
            border: "1px solid var(--edge)",
            borderRadius: 3,
            boxShadow: "0 10px 32px var(--shadow)"
          },
          children: [
            /* @__PURE__ */ t.jsxs(
              "div",
              {
                onPointerDown: ds,
                className: "flex items-center justify-between px-3 py-1.5 select-none",
                style: { borderBottom: "1px solid var(--edge)", cursor: "move" },
                children: [
                  /* @__PURE__ */ t.jsx("span", { style: { fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "var(--dim)" }, children: "CHART LAYOUT" }),
                  /* @__PURE__ */ t.jsx(
                    "button",
                    {
                      onClick: () => gn(!1),
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
                  style: us === "appearance" ? { color: "var(--text)", background: "var(--active)" } : { color: "var(--dim)" },
                  children: "Appearance"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: () => Ct("chart"),
                  className: "flex-1 px-3 py-1.5 text-xs font-medium transition-colors",
                  style: us === "chart" ? { color: "var(--text)", background: "var(--active)" } : { color: "var(--dim)" },
                  children: "Chart"
                }
              )
            ] }),
            /* @__PURE__ */ t.jsx("div", { className: "max-h-[70vh] overflow-y-auto", children: us === "appearance" ? /* @__PURE__ */ t.jsx(Ju, { hideHeader: !0, onBack: () => gn(!1) }) : /* @__PURE__ */ t.jsx(Qu, { hideHeader: !0, onBack: () => gn(!1) }) }),
            /* @__PURE__ */ t.jsx(
              "div",
              {
                className: "flex justify-end px-3 py-2",
                style: { borderTop: "1px solid var(--edge)" },
                children: /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    onClick: () => gn(!1),
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
      ot && /* @__PURE__ */ t.jsx("div", { className: "absolute top-10 right-2 z-[90]", children: /* @__PURE__ */ t.jsx(vd, { settings: pt, onChange: Mo, onClose: () => Ds(!1) }) }),
      Fs && /* @__PURE__ */ t.jsx("div", { className: "absolute top-10 left-[320px] z-[90]", children: /* @__PURE__ */ t.jsx(l.Suspense, { fallback: /* @__PURE__ */ t.jsx("div", { className: "p-2 text-[10px] text-[#b9b9b9]", children: "Loading layers..." }), children: /* @__PURE__ */ t.jsx($d, { layers: In, onChange: to }) }) }),
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
              const v = xn.trade, oe = (_e) => window.__lseShell?.fmtPrice?.(_e) ?? String(_e), J = (_e) => _e === "limit" ? "Limit" : "Stop";
              if (Et) {
                const _e = {
                  flex: 1,
                  minWidth: 0,
                  padding: "3px 6px",
                  fontSize: 12,
                  color: "var(--text)",
                  background: "var(--bg2)",
                  border: "1px solid var(--edge)",
                  borderRadius: 2
                }, It = {
                  width: 38,
                  fontSize: 11,
                  color: "var(--dim)",
                  flexShrink: 0
                }, ps = () => {
                  const _t = parseFloat(Pn), Vt = parseFloat(Jn);
                  if (!(_t > 0)) {
                    Qn("enter a price");
                    return;
                  }
                  if (!(Vt > 0)) {
                    Qn("enter a size");
                    return;
                  }
                  window.__lseShell?.quickOrder?.(Et.side, Et.otype, _t, Vt), Ae(null), Zn(null);
                }, en = (_t) => {
                  _t.stopPropagation(), _t.key === "Enter" && ps(), _t.key === "Escape" && (Zn(null), Qn(""));
                };
                return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                  /* @__PURE__ */ t.jsxs("div", { style: { ...Mn, cursor: "default", fontWeight: 600 }, children: [
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
                      onClick: (_t) => _t.stopPropagation(),
                      children: [
                        /* @__PURE__ */ t.jsx("span", { style: It, children: "Price" }),
                        /* @__PURE__ */ t.jsx(
                          "input",
                          {
                            autoFocus: !0,
                            value: Pn,
                            spellCheck: !1,
                            inputMode: "decimal",
                            style: _e,
                            onChange: (_t) => Hn(_t.target.value),
                            onKeyDown: en
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      style: { display: "flex", gap: 6, alignItems: "center", margin: "0 10px 4px" },
                      onClick: (_t) => _t.stopPropagation(),
                      children: [
                        /* @__PURE__ */ t.jsx("span", { style: It, children: "Units" }),
                        /* @__PURE__ */ t.jsx(
                          "input",
                          {
                            value: Jn,
                            spellCheck: !1,
                            inputMode: "decimal",
                            style: _e,
                            onChange: (_t) => _s(_t.target.value),
                            onKeyDown: en
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      style: { display: "flex", gap: 4, margin: "0 10px 2px", justifyContent: "flex-end" },
                      onClick: (_t) => _t.stopPropagation(),
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
                              Zn(null), Qn("");
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
                            onClick: ps,
                            children: "Place"
                          }
                        )
                      ]
                    }
                  ),
                  ht && /* @__PURE__ */ t.jsx("div", { style: { ...Mn, color: "#e05d5d", cursor: "default" }, children: ht }),
                  /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: "1px solid var(--edge)" } })
                ] });
              }
              const ge = v.qty != null ? `${v.qty} ` : "", Pt = [
                { label: `Buy ${ge}${v.symbol} at market`, side: "buy", otype: "market" },
                { label: `Sell ${ge}${v.symbol} at market`, side: "sell", otype: "market" }
              ], Be = xn.price, Ht = xn.ref, Zt = v.pendingTypes || [];
              if (Be != null && Ht != null && Be !== Ht && Zt.length) {
                const _e = Be < Ht ? [{ side: "buy", otype: "limit" }, { side: "sell", otype: "stop" }] : [{ side: "sell", otype: "limit" }, { side: "buy", otype: "stop" }];
                for (const It of _e)
                  Zt.includes(It.otype) && Pt.push({ ...It, label: `${It.side === "buy" ? "Buy" : "Sell"} ${J(It.otype)} @ ${oe(Be)}…` });
              }
              return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                Pt.map((_e) => /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    className: "w-full text-left",
                    style: Mn,
                    onMouseEnter: ws,
                    onMouseLeave: Ss,
                    onClick: (It) => {
                      if (_e.otype === "market") {
                        window.__lseShell?.quickOrder?.(_e.side, _e.otype, xn.price), Ae(null);
                        return;
                      }
                      It.stopPropagation(), Zn({ side: _e.side, otype: _e.otype }), Hn(Be != null ? String(+Be.toFixed(Be >= 1e3 ? 2 : Be >= 100 ? 3 : Be >= 1 ? 4 : 6)) : ""), _s(v.qty != null ? String(v.qty) : ""), Qn("");
                    },
                    children: _e.label
                  },
                  `${_e.side}-${_e.otype}`
                )),
                /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: "1px solid var(--edge)" } })
              ] });
            })(),
            /* @__PURE__ */ t.jsxs(
              "button",
              {
                className: "w-full text-left",
                style: { ...Mn, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 },
                onMouseEnter: ws,
                onMouseLeave: Ss,
                onClick: () => vt((v) => !v),
                children: [
                  /* @__PURE__ */ t.jsx("span", { children: "Chart template" }),
                  /* @__PURE__ */ t.jsx("span", { style: { color: "var(--dim)" }, children: wt ? "▾" : "▸" })
                ]
              }
            ),
            wt && /* @__PURE__ */ t.jsxs("div", { className: "max-h-48 overflow-y-auto", style: { borderTop: "1px solid var(--edge)", borderBottom: "1px solid var(--edge)", margin: "3px 0" }, children: [
              (window.__lseShell?.layouts?.() || []).length === 0 ? /* @__PURE__ */ t.jsx("div", { style: { ...Mn, color: "var(--dim)" }, children: "No saved templates yet" }) : window.__lseShell.layouts().map((v) => /* @__PURE__ */ t.jsxs(
                "div",
                {
                  style: { ...Mn, display: "flex", alignItems: "center", gap: 8, paddingLeft: 20, cursor: "pointer" },
                  onMouseEnter: ws,
                  onMouseLeave: Ss,
                  onClick: () => {
                    window.__lseShell?.applyLayout?.(v.id), Ae(null);
                  },
                  children: [
                    /* @__PURE__ */ t.jsx("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: v.name }),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        title: as === v.id ? "Click again to delete" : "Delete template",
                        style: {
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          fontSize: as === v.id ? 11 : 13,
                          lineHeight: 1,
                          padding: "0 2px",
                          color: as === v.id ? "#e05d5d" : "var(--dim)"
                        },
                        onClick: async (oe) => {
                          if (oe.stopPropagation(), as !== v.id) {
                            Gn(v.id);
                            return;
                          }
                          await window.__lseShell?.deleteLayout?.(v.id), Gn(null), Yt((J) => J + 1);
                        },
                        children: as === v.id ? "sure?" : "×"
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
                        value: qn,
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
                            $n(!1);
                            return;
                          }
                          v.key === "Enter" && await so();
                        }
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        disabled: !qn.trim(),
                        title: qn.trim() ? "Save this chart as a template" : "Name the template first",
                        style: {
                          padding: "3px 10px",
                          fontSize: 12,
                          lineHeight: 1.5,
                          borderRadius: 2,
                          border: "1px solid var(--edge)",
                          background: "var(--active)",
                          color: "var(--text)",
                          cursor: qn.trim() ? "pointer" : "default",
                          opacity: qn.trim() ? 1 : 0.5
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
                  style: { ...Mn, paddingLeft: 20, color: "var(--dim)" },
                  onMouseEnter: ws,
                  onMouseLeave: Ss,
                  onClick: (v) => {
                    v.stopPropagation(), un(window.__lseShell?.layoutDefaultName?.() || ""), is(""), $n(!0);
                  },
                  children: "+ Save current as template…"
                }
              ),
              no && /* @__PURE__ */ t.jsx("div", { style: { ...Mn, paddingLeft: 20, color: "#e05d5d" }, children: no })
            ] }),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "w-full text-left",
                style: Mn,
                onMouseEnter: ws,
                onMouseLeave: Ss,
                onClick: () => {
                  jn.current?.querySelector('button[title="Reset view"]')?.click(), Ae(null);
                },
                children: "Reset chart view"
              }
            ),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "w-full text-left",
                style: Mn,
                onMouseEnter: ws,
                onMouseLeave: Ss,
                onClick: () => {
                  Io((v) => !v), Ae(null);
                },
                children: cs ? "Unflip chart" : "Flip chart"
              }
            ),
            Wt.length > 0 && /* @__PURE__ */ t.jsxs(
              "button",
              {
                className: "w-full text-left",
                style: Mn,
                onMouseEnter: ws,
                onMouseLeave: Ss,
                onClick: () => {
                  xt(), Ae(null);
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
                style: Mn,
                onMouseEnter: ws,
                onMouseLeave: Ss,
                onClick: () => {
                  Ct("appearance"), gn(!0), Ae(null);
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
function eh({ symbol: o, timeframe: n, candles: d, quote: I }) {
  const T = rl(), se = l.useMemo(() => al(), []);
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
      timezone: T?.data?.timezone || "local",
      showBidAskSpread: !!I,
      brokerBid: I?.bid ?? null,
      brokerAsk: I?.ask ?? null
    }
  );
}
const Bs = /* @__PURE__ */ new Map();
function Zr(o) {
  const n = Bs.get(o);
  n && n.root.render(
    /* @__PURE__ */ t.jsx(ql, { children: /* @__PURE__ */ t.jsx(Ul, { children: /* @__PURE__ */ t.jsx(eh, { ...n.props }) }) })
  );
}
const th = {
  mount(o, n = {}) {
    Bs.has(o) || Bs.set(o, { root: Cs(o), props: {} });
    const d = Bs.get(o);
    d.props = { ...d.props, ...ll(n) }, Zr(o);
  },
  update(o, n) {
    const d = Bs.get(o);
    d && (d.props = { ...d.props, ...ll(n) }, Zr(o));
  },
  unmount(o) {
    const n = Bs.get(o);
    n && (n.root.unmount(), Bs.delete(o));
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
    wo = { ...wo, ...ll(n) }, Us || (Us = Cs(o)), await ta(), Hl();
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
  const [n, d] = l.useState(!0), I = ea();
  l.useEffect(() => {
    d(!0);
  }, [I.key]);
  const T = (se) => {
    d(se), se || setTimeout(() => {
      zl.inReplay || o();
    }, 150);
  };
  return /* @__PURE__ */ t.jsx("div", { className: "h-full w-full bg-[#0b0d12]", children: /* @__PURE__ */ t.jsx(l.Suspense, { fallback: /* @__PURE__ */ t.jsx(ls, {}), children: /* @__PURE__ */ t.jsx(Kd, { open: n, onOpenChange: T }) }) });
}
function rh({ provider: o }) {
  const [n] = od(), d = ea(), I = n.get("sym"), T = d.pathname.split("/").pop() || "", se = n.get("provider") || o;
  return Kl({ provider: se, symbol: I || T }), l.useEffect(() => (zl.inReplay = !0, () => {
    zl.inReplay = !1;
  }), []), /* @__PURE__ */ t.jsx(l.Suspense, { fallback: /* @__PURE__ */ t.jsx(ls, {}), children: /* @__PURE__ */ t.jsx(zd, {}) });
}
let bo = null;
const ah = {
  async mount(o, n = {}) {
    const d = n.provider || "demo", I = n.onExit || (() => {
    });
    bo || (bo = Cs(o)), Kl({ provider: d, symbol: "" }), await ta(), bo.render(
      /* @__PURE__ */ t.jsx(nd, { client: oh, children: /* @__PURE__ */ t.jsx(ql, { initialEntries: ["/"], children: /* @__PURE__ */ t.jsxs(Ul, { children: [
        /* @__PURE__ */ t.jsxs(sd, { children: [
          /* @__PURE__ */ t.jsx(_r, { path: "/backtest/:pair", element: /* @__PURE__ */ t.jsx(rh, { provider: d }) }),
          /* @__PURE__ */ t.jsx(_r, { path: "*", element: /* @__PURE__ */ t.jsx(lh, { onExit: I }) })
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
    go || (go = Cs(o)), go.render(
      /* @__PURE__ */ t.jsx(l.Suspense, { fallback: /* @__PURE__ */ t.jsx(ls, {}), children: /* @__PURE__ */ t.jsx(Ud, { onBack: n.onBack, initialView: n.view }) })
    );
  },
  unmount() {
    go?.unmount(), go = null;
  }
};
let vo = null;
const ch = {
  mount(o) {
    vo || (vo = Cs(o)), vo.render(
      /* @__PURE__ */ t.jsx(l.Suspense, { fallback: /* @__PURE__ */ t.jsx(ls, {}), children: /* @__PURE__ */ t.jsx(qd, {}) })
    );
  },
  unmount() {
    vo?.unmount(), vo = null;
  }
};
let yo = null;
const uh = {
  mount(o) {
    yo || (yo = Cs(o)), yo.render(
      /* @__PURE__ */ t.jsx(l.Suspense, { fallback: /* @__PURE__ */ t.jsx(ls, {}), children: /* @__PURE__ */ t.jsx(Gd, {}) })
    );
  },
  unmount() {
    yo?.unmount(), yo = null;
  }
};
let ko = null;
const dh = {
  mount(o) {
    ko || (ko = Cs(o)), ko.render(
      /* @__PURE__ */ t.jsx(l.Suspense, { fallback: /* @__PURE__ */ t.jsx(ls, {}), children: /* @__PURE__ */ t.jsx(Zd, {}) })
    );
  },
  unmount() {
    ko?.unmount(), ko = null;
  }
};
Jl.mountLayoutButton = (o) => {
  Cs(o).render(/* @__PURE__ */ t.jsx(nh, {}));
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
