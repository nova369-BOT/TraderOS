import { r as o, i as Ar, j as t, g as yc, q as ms } from "./chunks/react-vendor-C0yw3i6b.js";
import { n as Dr, o as Br, p as kc, q as wc, r as Sc, s as Cc, t as Ic, u as Tc, v as jc, w as Mc, x as Rc, y as Pc, z as Nc, A as Lc, C as Ec, D as Ac, E as Dc, F as Bc, G as Wc, H as Fc, J as Oc, K as _c, M as $c, N as Hc, O as Vc, Q as Xc, R as Yc, U as zc, V as Kc, W as Uc, X as qc, Y as Gc, Z as Zc, _ as Qc, $ as Jc, a0 as ei, a1 as ti, a2 as ni, a3 as si, a4 as li, a5 as oi, a6 as ri, a7 as ai, a8 as ci, a9 as ii, aa as ui, ab as di, ac as hi, ad as fi, ae as pi, af as xi, ag as mi, ah as bi, ai as gi, aj as vi, ak as yi, al as ki, am as wi, an as Si, ao as Ci, ap as Ii, aq as Ti, ar as ji, as as Mi, at as Ri, au as Pi, av as Ni, aw as Li, ax as Ei, ay as Ai, az as Di, aA as Bi, aB as Wi, aC as Fi, aD as Oi, aE as _i, aF as $i, aG as Hi, aH as Vi, aI as Xi, aJ as Yi, aK as zi, aL as Ki, aM as Ui, aN as qi, aO as Gi, aP as Zi, aQ as Qi, aR as Ji, aS as eu, aT as tu, aU as nu, aV as su, aW as lu, aX as ou, aY as ru, aZ as au, a_ as cu, a$ as iu, b0 as uu, b1 as du, b2 as hu, b3 as fu, b4 as pu, b5 as _e, b6 as xu, b7 as mu, b8 as so, b9 as lo, ba as bu, bb as gu, bc as vu, bd as yu, be as ku, bf as wu, bg as Su, bh as Cu, bi as _o, bj as Iu, bk as Tu, bl as ju, bm as Mu, bn as Ru, g as Pu, bo as Nu, bp as Lu, bq as Eu, br as Wr, bs as zl, bt as Au, bu as Gr, bv as Du, bw as Bu, bx as Wu, by as Kl, bz as Fu, bA as Ou, bB as _u, bC as $u, bD as Ls, bE as Hu, bF as Ko, bG as Uo, bH as ml, bI as Vu, bJ as Xu, bK as Yu, bL as zu, bM as Ku, bN as Uu } from "./chunks/backtest-BOI-AqD2.js";
import { ay as Ul, aA as ql, m as Gl, aS as Zl } from "./chunks/ui-D7POjNks.js";
import { Q as qu, d as Gu, M as qo, R as Zu, e as Fr, c as Qu, a as Zr } from "./chunks/router-query-iQy8iLKR.js";
import { D as Ju } from "./chunks/depth-ChRRoHC5.js";
import { $ as ed } from "./chunks/ui-heavy-BL_8guwx.js";
function Or(s, n) {
  const { closes: h, highs: T, lows: I, opens: te, volumes: se, timestamps: Me } = s;
  let r = null;
  return n.movingAverages?.enabled && n.movingAverages.lines?.length > 0 && (r = n.movingAverages.lines.map((xe) => {
    let Le;
    switch (xe.type) {
      case "SMA":
        Le = kc(h, xe.period);
        break;
      case "SMMA":
        Le = Br(h, xe.period);
        break;
      case "EMA":
      default:
        Le = Dr(h, xe.period);
        break;
    }
    return { data: Le, color: xe.color, name: `${xe.type} ${xe.period}` };
  })), {
    rsi: n.rsi?.enabled ? pu(h, n.rsi.period) : null,
    macd: n.macd?.enabled ? fu(h, n.macd.fast, n.macd.slow, n.macd.signal) : null,
    ema: n.ema?.enabled ? n.ema.periods.map((xe) => Dr(h, xe)) : null,
    bollinger: n.bollinger?.enabled ? hu(h, n.bollinger.period, n.bollinger.stdDev) : null,
    movingAverages: r,
    atr: n.atr?.enabled ? du(T, I, h, n.atr.period) : null,
    stochastic: n.stochastic?.enabled ? uu(T, I, h, n.stochastic.kPeriod, n.stochastic.dPeriod, n.stochastic.smooth) : null,
    williamsR: n.williamsR?.enabled ? iu(T, I, h, n.williamsR.period) : null,
    cci: n.cci?.enabled ? cu(T, I, h, n.cci.period) : null,
    adx: n.adx?.enabled ? au(T, I, h, n.adx.period) : null,
    roc: n.roc?.enabled ? ru(h, n.roc.period) : null,
    vwap: n.vwap?.enabled ? ou(T, I, h, se, Me) : null,
    ichimoku: n.ichimoku?.enabled ? lu(T, I, h, n.ichimoku.tenkanPeriod, n.ichimoku.kijunPeriod, n.ichimoku.senkouBPeriod, n.ichimoku.displacement) : null,
    parabolicSAR: n.parabolicSAR?.enabled ? su(T, I, n.parabolicSAR.afStart, n.parabolicSAR.afStep, n.parabolicSAR.afMax) : null,
    keltner: n.keltner?.enabled ? nu(T, I, h, n.keltner.emaPeriod, n.keltner.atrPeriod, n.keltner.multiplier) : null,
    pivotPoints: n.pivotPoints?.enabled ? tu(Me, T, I, h) : null,
    supertrend: n.supertrend?.enabled ? eu(T, I, h, n.supertrend.period, n.supertrend.multiplier) : null,
    donchian: n.donchian?.enabled ? Ji(T, I, n.donchian.period) : null,
    aroon: n.aroon?.enabled ? Qi(T, I, n.aroon.period) : null,
    envelopes: n.envelopes?.enabled ? Zi(h, n.envelopes.period, n.envelopes.percent) : null,
    dema: n.dema?.enabled ? Gi(h, n.dema.period) : null,
    tema: n.tema?.enabled ? qi(h, n.tema.period) : null,
    hma: n.hma?.enabled ? Ui(h, n.hma.period) : null,
    momentum: n.momentum?.enabled ? Ki(h, n.momentum.period) : null,
    awesomeOsc: n.awesomeOsc?.enabled ? zi(T, I) : null,
    mfi: n.mfi?.enabled ? Yi(T, I, h, se, n.mfi.period) : null,
    tsi: n.tsi?.enabled ? Xi(h, n.tsi.longPeriod, n.tsi.shortPeriod, n.tsi.signalPeriod) : null,
    trix: n.trix?.enabled ? Vi(h, n.trix.period, n.trix.signalPeriod) : null,
    ultimateOsc: n.ultimateOsc?.enabled ? Hi(T, I, h, n.ultimateOsc.fast, n.ultimateOsc.med, n.ultimateOsc.slow) : null,
    dpo: n.dpo?.enabled ? $i(h, n.dpo.period) : null,
    kst: n.kst?.enabled ? _i(h, n.kst.roc1, n.kst.roc2, n.kst.roc3, n.kst.roc4, n.kst.sma1, n.kst.sma2, n.kst.sma3, n.kst.sma4, n.kst.signalPeriod) : null,
    stochRsi: n.stochRsi?.enabled ? Oi(h, n.stochRsi.rsiPeriod, n.stochRsi.kPeriod, n.stochRsi.dPeriod) : null,
    bbPercent: n.bbPercent?.enabled ? Fi(h, n.bbPercent.period, n.bbPercent.stdDev) : null,
    bbWidth: n.bbWidth?.enabled ? Wi(h, n.bbWidth.period, n.bbWidth.stdDev) : null,
    histVol: n.histVol?.enabled ? Bi(h, n.histVol.period) : null,
    chaikinVol: n.chaikinVol?.enabled ? Di(T, I, n.chaikinVol.emaPeriod, n.chaikinVol.rocPeriod) : null,
    stdDev: n.stdDev?.enabled ? Ai(h, n.stdDev.period) : null,
    obv: n.obv?.enabled ? Ei(h, se) : null,
    cmf: n.cmf?.enabled ? Li(T, I, h, se, n.cmf.period) : null,
    adl: n.adl?.enabled ? Ni(T, I, h, se) : null,
    forceIndex: n.forceIndex?.enabled ? Pi(h, se, n.forceIndex.period) : null,
    eom: n.eom?.enabled ? Ri(T, I, se, n.eom.period) : null,
    volumeSma: n.volumeSma?.enabled ? Mi(se, n.volumeSma.period) : null,
    fibRetracement: n.fibRetracement?.enabled ? ji(T, I, n.fibRetracement.lookback) : null,
    camarillaPivots: n.camarillaPivots?.enabled ? Ti(Me, T, I, h) : null,
    woodiePivots: n.woodiePivots?.enabled ? Ii(Me, T, I, h) : null,
    correlation: n.correlation?.enabled ? Ci(h, se, n.correlation.period) : null,
    linearReg: n.linearReg?.enabled ? Si(h, n.linearReg.period, n.linearReg.deviations) : null,
    coppock: n.coppock?.enabled ? wi(h, n.coppock.longROC, n.coppock.shortROC, n.coppock.wmaPeriod) : null,
    alma: n.alma?.enabled ? ki(h, n.alma.period, n.alma.offset, n.alma.sigma) : null,
    kama: n.kama?.enabled ? yi(h, n.kama.period, n.kama.fastPeriod, n.kama.slowPeriod) : null,
    zlema: n.zlema?.enabled ? vi(h, n.zlema.period) : null,
    t3: n.t3?.enabled ? gi(h, n.t3.period, n.t3.vFactor) : null,
    lsma: n.lsma?.enabled ? bi(h, n.lsma.period) : null,
    mcginley: n.mcginley?.enabled ? mi(h, n.mcginley.period) : null,
    vortex: n.vortex?.enabled ? xi(T, I, h, n.vortex.period) : null,
    choppiness: n.choppiness?.enabled ? pi(T, I, h, n.choppiness.period) : null,
    elderRay: n.elderRay?.enabled ? fi(T, I, h, n.elderRay.period) : null,
    massIndex: n.massIndex?.enabled ? hi(T, I, n.massIndex.period) : null,
    chandeKroll: n.chandeKroll?.enabled ? di(T, I, h, n.chandeKroll.p, n.chandeKroll.q, n.chandeKroll.x) : null,
    chandelierExit: n.chandelierExit?.enabled ? ui(T, I, h, n.chandelierExit.period, n.chandelierExit.multiplier) : null,
    linRegSlope: n.linRegSlope?.enabled ? ii(h, n.linRegSlope.period) : null,
    priceChannel: n.priceChannel?.enabled ? ci(T, I, n.priceChannel.period) : null,
    alligator: n.alligator?.enabled ? ai(h) : null,
    accBands: n.accBands?.enabled ? ri(T, I, h, n.accBands.period) : null,
    ppo: n.ppo?.enabled ? oi(h, n.ppo.fast, n.ppo.slow, n.ppo.signal) : null,
    pvo: n.pvo?.enabled ? li(se, n.pvo.fast, n.pvo.slow, n.pvo.signal) : null,
    cmo: n.cmo?.enabled ? si(h, n.cmo.period) : null,
    fisher: n.fisher?.enabled ? ni(T, I, n.fisher.period) : null,
    stc: n.stc?.enabled ? ti(h, n.stc.fast, n.stc.slow, n.stc.cycle) : null,
    rviOsc: n.rviOsc?.enabled ? ei(te, T, I, h, n.rviOsc.period) : null,
    klinger: n.klinger?.enabled ? Jc(T, I, h, se, n.klinger.fast, n.klinger.slow, n.klinger.signal) : null,
    connorsRsi: n.connorsRsi?.enabled ? Qc(h, n.connorsRsi.rsiPeriod, n.connorsRsi.streakPeriod, n.connorsRsi.rankPeriod) : null,
    apo: n.apo?.enabled ? Zc(h, n.apo.fast, n.apo.slow) : null,
    qstick: n.qstick?.enabled ? Gc(te, h, n.qstick.period) : null,
    bop: n.bop?.enabled ? qc(te, T, I, h, n.bop.period) : null,
    psychLine: n.psychLine?.enabled ? Uc(h, n.psychLine.period) : null,
    pfe: n.pfe?.enabled ? Kc(h, n.pfe.period, n.pfe.smoothing) : null,
    smi: n.smi?.enabled ? zc(T, I, h, n.smi.period, n.smi.smoothK, n.smi.smoothD) : null,
    ulcerIndex: n.ulcerIndex?.enabled ? Yc(h, n.ulcerIndex.period) : null,
    natr: n.natr?.enabled ? Xc(T, I, h, n.natr.period) : null,
    trueRange: n.trueRange?.enabled ? Vc(T, I, h) : null,
    squeeze: n.squeeze?.enabled ? Hc(T, I, h, n.squeeze.bbPeriod, n.squeeze.bbMult, n.squeeze.kcPeriod, n.squeeze.kcMult) : null,
    relVolIndex: n.relVolIndex?.enabled ? $c(h, n.relVolIndex.period, n.relVolIndex.smoothing) : null,
    vhf: n.vhf?.enabled ? _c(h, n.vhf.period) : null,
    vwma: n.vwma?.enabled ? Oc(h, se, n.vwma.period) : null,
    volumeOsc: n.volumeOsc?.enabled ? Fc(se, n.volumeOsc.fast, n.volumeOsc.slow) : null,
    nvi: n.nvi?.enabled ? Wc(h, se) : null,
    pvi: n.pvi?.enabled ? Bc(h, se) : null,
    pvt: n.pvt?.enabled ? Dc(h, se) : null,
    vroc: n.vroc?.enabled ? Ac(se, n.vroc.period) : null,
    netVolume: n.netVolume?.enabled ? Ec(h, se, n.netVolume.period) : null,
    twiggsMF: n.twiggsMF?.enabled ? Lc(T, I, h, se, n.twiggsMF.period) : null,
    linRegRSquared: n.linRegRSquared?.enabled ? Nc(h, n.linRegRSquared.period) : null,
    medianPrice: n.medianPrice?.enabled ? Pc(T, I) : null,
    typicalPrice: n.typicalPrice?.enabled ? Rc(T, I, h) : null,
    weightedClose: n.weightedClose?.enabled ? Mc(T, I, h) : null,
    demarkPivots: n.demarkPivots?.enabled ? jc(Me, T, I, te, h) : null,
    zigzag: n.zigzag?.enabled ? Tc(T, I, h, n.zigzag.deviation) : null,
    fractals: n.fractals?.enabled ? Ic(T, I) : null,
    gator: n.gator?.enabled ? Cc(h) : null,
    smmaOverlay: n.smmaOverlay?.enabled ? Br(h, n.smmaOverlay.period) : null,
    wma: n.wma?.enabled ? Sc(h, n.wma.period) : null,
    customIndicators: (n.customIndicators || []).filter((xe) => xe.enabled).map((xe) => {
      if (typeof xe.expression == "string" && (xe.expression.startsWith("brue:") || xe.expression.startsWith("local:")) && Array.isArray(xe.data) && xe.data.length > 0)
        return xe;
      const Le = { closes: h, highs: T, lows: I, opens: te, volumes: se, timestamps: Me }, Qe = wc(xe.expression, Le);
      return { ...xe, data: Qe.errors.length === 0 ? Qe.data : new Array(h.length).fill(NaN) };
    })
  };
}
function td(s, n) {
  if (n <= 0) return s;
  const h = new Array(n).fill(NaN), T = {};
  for (const I of Object.keys(s)) {
    const te = s[I];
    if (te == null) {
      T[I] = te;
      continue;
    }
    if (Array.isArray(te)) {
      te.length > 0 && typeof te[0] == "object" && te[0] !== null && "data" in te[0] ? T[I] = te.map((se) => ({ ...se, data: h.concat(se.data || []) })) : T[I] = h.concat(te);
      continue;
    }
    if (typeof te == "object") {
      const se = {};
      for (const Me of Object.keys(te)) {
        const r = te[Me];
        if (Array.isArray(r)) se[Me] = h.concat(r);
        else if (typeof r == "object" && r !== null) {
          const re = {};
          for (const xe of Object.keys(r)) {
            const Le = r[xe];
            re[xe] = Array.isArray(Le) ? h.concat(Le) : Le;
          }
          se[Me] = re;
        } else se[Me] = r;
      }
      T[I] = se;
      continue;
    }
    T[I] = te;
  }
  return T;
}
let Ql = null, nd = 0;
function _r() {
  return Ql || (Ql = new Worker(new URL(
    /* @vite-ignore */
    "/assets/indicatorWorker-DBDvDVhS.js",
    import.meta.url
  ), { type: "module" }), Ql);
}
function sd(s, n, h) {
  const [T, I] = o.useState(null), [te, se] = o.useState(!1), [Me, r] = o.useState(null), re = o.useRef(null), xe = o.useRef(null), Le = o.useRef(0), Qe = o.useRef(null), Ee = o.useCallback((De) => {
    const { id: ye, result: Fe, error: Pe, durationMs: B } = De.data;
    if (!(Qe.current !== null && ye !== Qe.current)) {
      if (Qe.current = null, se(!1), Pe) {
        console.warn("[indicatorWorker] error", Pe);
        return;
      }
      B !== void 0 && r(B), s.length > 0 && (Le.current = s[0].close), xe.current = Fe, I(Fe);
    }
  }, [s]);
  return o.useEffect(() => {
    const De = _r();
    return De.addEventListener("message", Ee), () => De.removeEventListener("message", Ee);
  }, [Ee]), o.useEffect(() => {
    if (!n || s.length === 0) {
      I(null);
      return;
    }
    const De = s.length > 0 ? s[0].close : 0;
    if (h.current && xe.current && Le.current === De)
      return;
    const ye = re.current;
    let Fe, Pe, B, q, Ce, be, J = null;
    const Ue = ye && ye.candles !== s && s.length >= ye.closes.length && s.length > 0 && ye.closes.length > 0 && s[0].time === ye.timestamps[0] && ye.closes.length > 10;
    let he = 0;
    const xt = !Ue && ye && ye.candles !== s && s.length > ye.closes.length && ye.closes.length > 10 && s.length - ye.closes.length > 0 && s[s.length - ye.closes.length]?.time === ye.timestamps[0];
    if (xt && (he = s.length - ye.closes.length), Ue) {
      const et = ye.closes.length, ft = Math.max(0, et - 1);
      Fe = ye.closes, Pe = ye.highs, B = ye.lows, q = ye.opens, Ce = ye.volumes, be = ye.timestamps, Fe.length = ft, Pe.length = ft, B.length = ft, q.length = ft, Ce.length = ft, be.length = ft;
      for (let Ct = ft; Ct < s.length; Ct++) {
        const Pt = s[Ct];
        Fe.push(Pt.close), Pe.push(Pt.high), B.push(Pt.low), q.push(Pt.open), Ce.push(Pt.volume || 0), be.push(Pt.time);
      }
      J = { closes: Fe, highs: Pe, lows: B, opens: q, volumes: Ce, timestamps: be }, re.current = { candles: s, closes: Fe, highs: Pe, lows: B, opens: q, volumes: Ce, timestamps: be };
      const Qt = Object.values(n).filter((Ct) => Ct?.enabled).length;
      if (!(s.length > 3e3 && Qt > 3)) {
        const Ct = performance.now(), Pt = Or(J, n), sn = performance.now() - Ct;
        r(sn), xe.current = Pt, Le.current = De, I(Pt);
        return;
      }
    } else if (xt && xe.current) {
      const et = new Array(he), ft = new Array(he), Qt = new Array(he), Cn = new Array(he), Ct = new Array(he), Pt = new Array(he);
      for (let Jt = 0; Jt < he; Jt++) {
        const ln = s[Jt];
        et[Jt] = ln.close, ft[Jt] = ln.high, Qt[Jt] = ln.low, Cn[Jt] = ln.open, Ct[Jt] = ln.volume || 0, Pt[Jt] = ln.time;
      }
      Fe = et.concat(ye.closes), Pe = ft.concat(ye.highs), B = Qt.concat(ye.lows), q = Cn.concat(ye.opens), Ce = Ct.concat(ye.volumes), be = Pt.concat(ye.timestamps);
      const sn = td(xe.current, he);
      re.current = { candles: s, closes: Fe, highs: Pe, lows: B, opens: q, volumes: Ce, timestamps: be }, xe.current = sn, Le.current = De, I(sn);
      return;
    } else
      Fe = s.map((et) => et.close), Pe = s.map((et) => et.high), B = s.map((et) => et.low), q = s.map((et) => et.open), Ce = s.map((et) => et.volume || 0), be = s.map((et) => et.time), J = { closes: Fe, highs: Pe, lows: B, opens: q, volumes: Ce, timestamps: be }, re.current = { candles: s, closes: Fe, highs: Pe, lows: B, opens: q, volumes: Ce, timestamps: be };
    J || (J = { closes: Fe, highs: Pe, lows: B, opens: q, volumes: Ce, timestamps: be });
    const wt = Object.values(n).filter((et) => et?.enabled).length;
    if (!(s.length > 1e3 || wt > 5 || (n.customIndicators?.filter((et) => et.enabled)?.length || 0) > 0)) {
      const et = performance.now(), ft = Or(J, n), Qt = performance.now() - et;
      r(Qt), xe.current = ft, Le.current = De, I(ft);
      return;
    }
    se(!0);
    const Xt = _r(), Zt = ++nd;
    Qe.current = Zt, Xt.postMessage({ id: Zt, price: J, indicators: n });
  }, [s, n, h]), { indicatorData: T, isComputing: te, computeDurationMs: Me };
}
function bl(s) {
  const {
    ctx: n,
    candles: h,
    startIndex: T,
    indexToX: I,
    priceToY: te,
    morphAt: se,
    candleBodyWidth: Me,
    wickWidth: r,
    colors: re
  } = s, xe = new Path2D(), Le = new Path2D(), Qe = Me / 2, Ee = h.length, De = new Float64Array(Ee), ye = new Float64Array(Ee), Fe = new Float64Array(Ee), Pe = new Float64Array(Ee), B = new Float64Array(Ee), q = new Float64Array(Ee), Ce = new Float64Array(Ee), be = new Float64Array(Ee);
  let J = 0, Ue = 0;
  for (let he = 0; he < h.length; he++) {
    const xt = se(he, h[he]), wt = I(T + he, T), Ye = te(xt.open), Xt = te(xt.close), Zt = te(xt.high), et = te(xt.low), ft = Math.min(Ye, Xt), Qt = Math.max(1, Math.abs(Xt - Ye));
    xt.close >= xt.open ? (xe.moveTo(wt, Zt), xe.lineTo(wt, et), De[J] = wt - Qe, ye[J] = ft, Fe[J] = Me, Pe[J] = Qt, J++) : (Le.moveTo(wt, Zt), Le.lineTo(wt, et), B[Ue] = wt - Qe, q[Ue] = ft, Ce[Ue] = Me, be[Ue] = Qt, Ue++);
  }
  if (n.lineWidth = r, n.lineCap = "round", J) {
    n.strokeStyle = re.bullishWick, n.stroke(xe), n.fillStyle = re.bullish;
    for (let he = 0; he < J; he++)
      n.fillRect(De[he], ye[he], Fe[he], Pe[he]);
  }
  if (Ue) {
    n.strokeStyle = re.bearishWick, n.stroke(Le), n.fillStyle = re.bearish;
    for (let he = 0; he < Ue; he++)
      n.fillRect(B[he], q[he], Ce[he], be[he]);
  }
  if (n.lineCap = "butt", n.lineWidth = 1, J) {
    n.strokeStyle = re.bullishBorder;
    for (let he = 0; he < J; he++)
      n.strokeRect(De[he], ye[he], Fe[he], Pe[he]);
  }
  if (Ue) {
    n.strokeStyle = re.bearishBorder;
    for (let he = 0; he < Ue; he++)
      n.strokeRect(B[he], q[he], Ce[he], be[he]);
  }
}
const ld = (s) => {
  const n = (s || "").toUpperCase();
  if (n.includes("XAU") || n.includes("XAG")) return 0.8;
  if (n.includes("NAS100") || n.includes("SPX500") || n.includes("US30") || n.includes("US2000")) return 1.5;
  if (n.includes("BCO") || n.includes("WTICO")) return 0.05;
  if (n.includes("BTC")) return 4;
  if (n.includes("ETH")) return 2;
  if (n.includes("JPY")) return 1e-3;
  const h = n.replace("/", "");
  return h.length === 6 && /EUR|GBP|AUD|NZD|CAD|CHF|USD/.test(h) ? 1e-5 : 0.04;
}, od = (s, n) => ld(s), Go = ({
  candles: s,
  livePrice: n,
  symbol: h = "",
  timezone: T = "UTC",
  countdown: I,
  onCrosshairMove: te,
  syncedCrosshairTime: se,
  colors: Me,
  indicators: r,
  onIndicatorsChange: re,
  onRemoveBruePlot: xe,
  onRemoveEngineIndicator: Le,
  onEditEngineIndicator: Qe,
  onConverterReady: Ee,
  onVisibleRangeChange: De,
  onViewportTimeChange: ye,
  syncedViewportTime: Fe,
  disableAutoFollow: Pe = !1,
  scrollToIndex: B,
  chartType: q = "candlestick",
  onScrollingChange: Ce,
  onScrollSync: be,
  scrollOffsetRef: J,
  optionsPdfEnabled: Ue = !1,
  heatmapEnabled: he = !1,
  externalDimensions: xt,
  economicEvents: wt,
  positionLines: Ye,
  onPositionModify: Xt,
  onPositionClose: Zt,
  autoSelectPositionId: et,
  l2DepthData: ft,
  onOpenSettings: Qt,
  onOpenCustomEditor: Cn,
  showBidAskSpread: Ct = !1,
  brokerBid: Pt = null,
  brokerAsk: sn = null,
  showSessions: Jt = !1,
  timeframe: ln = "5m",
  rightOffset: Dn,
  onLoadMore: bs,
  isLoadingMore: Us = !1,
  prependShift: gs = 0,
  drawings: Gn,
  selectedDrawingId: vs,
  drawingCursorRef: ys,
  requestRedrawRef: qs,
  isDrawingDragging: Tl = !1
}) => {
  const jl = o.useRef(null), Ml = o.useRef(null), qe = o.useRef(null), Es = o.useRef(null), Gs = o.useRef(!1), Zs = o.useRef(null);
  o.useRef(null);
  const oo = o.useRef(s), As = o.useRef(se ?? null), Qs = o.useRef(!1), Ds = o.useRef(null), hn = typeof window < "u" ? Math.min(window.devicePixelRatio || 1, 2) : 1, [fe, Zn] = o.useState({ width: 300, height: 300 }), [ae, At] = o.useState({
    startIndex: 0,
    candleWidth: 3,
    // Zoomed out default - shows more candles on first load
    // Backtest/replay mode has no future candles arriving, so zero right-side padding.
    // TERMINAL DIVERGENCE from the site port: the site keeps 35 future candles
    // for economic event flags, but the terminal draws no flags on the chart
    // (ECONOMIC is its own tab), so that margin was pure dead space on the
    // right and was dropped.
    futureSpace: 0,
    autoFollowLatest: !Pe
    // Start disabled if in replay mode
  }), Re = o.useRef({
    startIndex: 0,
    candleWidth: 3
  }), $n = o.useRef({
    startIndex: 0,
    candleWidth: 3
  }), lt = o.useRef(!1), fn = o.useRef(!1), $e = o.useRef(null), at = o.useRef(null), dt = o.useRef(null), nt = o.useRef(null), pn = o.useRef(null), Js = o.useRef(0), [, _t] = o.useState(0), Bs = o.useRef(null), Qn = (a) => {
    const p = $e.current, m = Bs.current;
    if (p && m && m.posId === p) return m.offset;
    const v = on.current, f = v && v.range > 0 ? v.range * 0.18 : a * 5e-3;
    return Bs.current = p && f > 0 ? { posId: p, offset: f } : null, f;
  }, Jn = o.useRef(null);
  o.useEffect(() => {
    if (et && et !== Jn.current && Ye) {
      const a = Ye.find((p) => p.id === et);
      a && (Jn.current = et, $e.current = a.id, at.current = a.stopLoss ?? null, dt.current = a.takeProfit ?? null, _t((p) => p + 1));
    }
  }, [et, Ye]);
  const el = o.useRef(0), It = o.useCallback((a) => {
    lt.current = a, fn.current !== a && (fn.current = a, Ce?.(a), a || (el.current = Re.current.startIndex, J && (J.current = 0)));
  }, [Ce, J]), mt = o.useCallback(() => {
    if (J) {
      const a = Re.current.startIndex, p = Re.current.candleWidth * (1 + _e), m = a - el.current;
      J.current = m * p;
    }
    be?.();
  }, [be, J]), tl = o.useRef(mt);
  tl.current = mt;
  const In = o.useRef(null), Bn = o.useRef(null), Hn = o.useRef(null), Ws = o.useRef(!1), Ge = o.useCallback((a = !1) => {
    if (Hn.current !== null) {
      a || (Ws.current = !1);
      return;
    }
    Ws.current = a, Hn.current = requestAnimationFrame(() => {
      Hn.current = null;
      const p = Ws.current;
      In.current && In.current(p);
    });
  }, []);
  o.useCallback((a = !1) => {
    Hn.current !== null && (cancelAnimationFrame(Hn.current), Hn.current = null), In.current && In.current(a);
  }, []);
  const nl = o.useRef(null), Fs = o.useRef(0), ks = o.useRef(0), Vn = o.useRef(!1), Tn = o.useRef(0), ws = o.useRef(null), sl = o.useRef(void 0), Yt = o.useRef(null), zt = o.useRef("standard"), [es, ts] = o.useState([]), bt = o.useRef(null), cn = o.useRef(null), Ss = o.useRef([]), ns = o.useRef(null), jn = o.useRef(null), [Wn, ss] = o.useState(!1), [xn, ll] = o.useState({ x: 0, y: 0, startIndex: 0, priceOffset: 0 }), [Rl, Pl] = o.useState(0), [ro, mn] = o.useState(1), Nt = o.useRef(null), gt = o.useRef(null), ls = o.useRef(0), Cs = o.useRef(null), ct = o.useRef(null), [Mn, os] = o.useState(!1), rs = o.useRef(null), as = o.useRef(0), Os = o.useRef(0), Rn = o.useRef(!1);
  o.useRef(0), o.useRef(0);
  const bn = o.useRef(null), Fn = o.useRef(null), gn = o.useRef(null), ao = o.useRef(null), co = "ns-resize", y = "ns-resize";
  o.useRef(12), o.useRef(0), o.useRef(0);
  const [le, me] = o.useState(0.15), [ot, Dt] = o.useState(!1), Xe = o.useRef({ y: 0, ratio: 0 });
  o.useRef(null);
  const [Tt, $t] = o.useState(1), [Ne, jt] = o.useState(0), [Kt, _s] = o.useState(null), [tt, $s] = o.useState(null), [Jo, io] = o.useState(!1), [er, Jr] = o.useState(!1), ol = o.useRef({ y: 0, scale: 1, offset: 0 }), cs = Kt !== null, vn = o.useRef(1), Xn = o.useRef(0), Yn = o.useRef(null), on = o.useRef(null), rn = o.useRef(0), Is = o.useRef(null), [zn, ea] = xu("preferences.chartShowOHLC", !0), [tr, ta] = o.useState(0), [rl, nr] = o.useState(!1), [mh, na] = o.useState(0), uo = o.useRef(null), ho = o.useRef(!1);
  o.useEffect(() => {
    if (!rl) return;
    const a = setInterval(() => na((p) => p + 1), 3e4);
    return () => clearInterval(a);
  }, [rl]), o.useEffect(() => {
    wt && wt.length > 0 && mu(wt.map((a) => a.region_code));
  }, [wt]), o.useEffect(() => {
    if (!rl) return;
    const a = (p) => {
      uo.current && !uo.current.contains(p.target) && nr(!1);
    };
    return document.addEventListener("mousedown", a), () => document.removeEventListener("mousedown", a);
  }, [rl]);
  const [fo, sa] = o.useState(0), [po, la] = o.useState(0), [xo, oa] = o.useState(0), [mo, ra] = o.useState(0), [bo, aa] = o.useState(0), Hs = o.useRef({}), [rt, ca] = o.useState({}), On = o.useRef({}), [sr, ia] = o.useState({}), [lr, go] = o.useState(null), [al, Vs] = o.useState(null), en = o.useRef({});
  o.useRef(null);
  const or = o.useRef(!1), tn = o.useRef(!1), pt = o.useRef(null), [ua, ve] = o.useState(null), [St, de] = o.useState(null), [Pn, vt] = o.useState(null), rr = typeof navigator < "u" && /Mac|iPhone|iPad|iPod/.test(navigator.platform), [cl, da] = o.useState(rr ? 8 : 2), vo = o.useRef(rr), il = so(), yo = o.useRef(il);
  yo.current = il, o.useEffect(() => {
    il.chart?.scrollSensitivity !== void 0 && da(il.chart.scrollSensitivity);
  }, [il.chart?.scrollSensitivity]);
  const ee = { ...lo(), ...Me }, ar = typeof document < "u" && document.documentElement.classList.contains("dark");
  o.useEffect(() => {
    lt.current || (Re.current = {
      startIndex: ae.startIndex,
      candleWidth: ae.candleWidth
    });
  }, [ae.startIndex, ae.candleWidth]), o.useEffect(() => {
    vn.current = Tt, Xn.current = Ne;
  }, [Tt, Ne]), o.useEffect(() => {
    if (!ae.autoFollowLatest) return;
    const a = setInterval(() => {
      Pl((p) => (p + 0.1) % (Math.PI * 2)), mn(0.85 + Math.sin(Date.now() / 1e3) * 0.15);
    }, 150);
    return () => clearInterval(a);
  }, [ae.autoFollowLatest]), o.useEffect(() => {
    oo.current = s;
    const a = s[s.length - 1];
    a && (Zs.current = {
      time: a.time,
      open: a.open,
      high: a.high,
      low: a.low,
      close: a.close
    }, ae.autoFollowLatest && In.current && In.current(!0));
  }, [s, ae.autoFollowLatest]), o.useEffect(() => {
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
    if (!p || !Ue) {
      go(null);
      return;
    }
    const m = async () => {
      try {
        const f = [];
        if (!f || f.length === 0) {
          go(null);
          return;
        }
        const e = f[0], O = s[s.length - 1]?.close || parseFloat(e.current_price), H = parseFloat(e.current_price), K = H > 0 ? O / H : 1;
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
        }))), go({
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
  }, [h, Ue]), o.useEffect(() => {
    if (!he || !h) {
      ts([]);
      return;
    }
    const a = async () => {
      try {
        const m = h.includes("/") ? h : h.length === 6 ? `${h.substring(0, 3)}/${h.substring(3)}` : h, v = await _u("l2_heatmap_snapshots", {
          params: { symbol: `eq.${m}`, order: "timestamp.desc", limit: "300" }
        });
        v && v.length > 0 && ts(v.reverse());
      } catch (m) {
        console.error("Failed to fetch heatmap data:", m);
      }
    };
    a();
    const p = setInterval(a, 5e3);
    return () => clearInterval(p);
  }, [h, he]), o.useEffect(() => () => {
    Nt.current !== null && cancelAnimationFrame(Nt.current), cn.current !== null && cancelAnimationFrame(cn.current), bn.current !== null && cancelAnimationFrame(bn.current), Fn.current !== null && cancelAnimationFrame(Fn.current), gn.current !== null && cancelAnimationFrame(gn.current), gt.current !== null && clearTimeout(gt.current), Yn.current !== null && clearTimeout(Yn.current);
  }, []);
  const { isPhone: ha, isDesktop: Nl } = bu(fe.width), Oe = o.useMemo(() => gu(fe.width), [fe.width]), cr = ha, ir = n || (s.length > 0 ? s[s.length - 1]?.close : 100), He = o.useMemo(() => vu(cr, h, ir || 100, Dn), [cr, Nl, h, ir, Dn]), yt = Oe.timeAxisHeight, Ll = Oe.priceLabelFont, ur = Oe.timeLabelFont, Ht = Oe.subplotLabelFont, El = 1, Al = 50, is = o.useMemo(() => {
    const a = [], m = Math.pow(Al / El, 0.025);
    for (let v = 0; v <= 40; v++)
      a.push(El * Math.pow(m, v));
    return a;
  }, []), Nn = o.useCallback((a = !1) => {
    const p = fe.width - He, m = a && lt.current ? Re.current : ae, v = m.candleWidth * (1 + _e), f = Math.floor(p / v), e = Math.max(0, Math.floor(m.startIndex)), O = Math.min(s.length, e + f);
    return {
      candles: s.slice(e, O),
      startIndex: e,
      endIndex: O,
      visibleCount: f,
      totalWithFuture: f + ae.futureSpace,
      candleWidth: m.candleWidth
    };
  }, [s, fe.width, ae]);
  o.useEffect(() => {
    if (s.length > 0) {
      const a = fe.width - He, p = ae.candleWidth * (1 + _e), m = Math.floor(a / p), v = Math.max(0, Math.floor(ae.startIndex)), f = Math.min(s.length, v + m);
      De && De({ startIndex: v, endIndex: f, totalCandles: s.length }), bs && v < 2500 && !Us && !Rn.current && !ae.autoFollowLatest && (ws.current && clearTimeout(ws.current), ws.current = setTimeout(() => {
        Rn.current || bs();
      }, 100));
    }
  }, [De, bs, Us, s.length, ae.startIndex, ae.candleWidth, fe.width, ae.autoFollowLatest]), o.useEffect(() => {
    if (!ye || s.length === 0) return;
    if (Qs.current) {
      Qs.current = !1;
      return;
    }
    const a = fe.width - He, p = ae.candleWidth * (1 + _e), m = Math.floor(a / p), v = Math.max(0, Math.floor(ae.startIndex)), f = Math.min(s.length, v + m), e = s.slice(v, f);
    if (e.length === 0) return;
    const O = Math.floor(e.length / 2), H = e[O];
    H && H.time !== Ds.current && (Ds.current = H.time, ye(H.time));
  }, [ye, s, ae.startIndex, ae.candleWidth, fe.width]), o.useEffect(() => {
    if (!Fe || s.length === 0 || Fe === Ds.current) return;
    let a = -1, p = 1 / 0;
    for (let A = 0; A < s.length; A++) {
      const X = Math.abs(s[A].time - Fe);
      X < p && (p = X, a = A);
    }
    if (a === -1) return;
    const m = fe.width - He, v = ae.candleWidth * (1 + _e), f = Math.floor(m / v), e = Math.max(0, Math.floor(ae.startIndex)), O = Math.min(s.length, e + f), H = Math.floor(f / 2), K = Math.max(0, a - H), _ = a >= e && a < O, b = e + Math.floor(f / 2);
    (!_ || Math.abs(a - b) > H / 2) && (Qs.current = !0, At((A) => ({
      ...A,
      startIndex: K,
      autoFollowLatest: !1
    })), Re.current.startIndex = K);
  }, [Fe, s, fe.width, ae.candleWidth, ae.startIndex]);
  const Ts = o.useCallback((a, p = !0) => {
    if (Kt !== null && tt !== null) {
      const K = vn.current, _ = Xn.current, b = tt / K, w = Kt + _;
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
  }, [n, Kt, tt]), it = o.useCallback((a, p) => {
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
    ].filter((H) => r?.[H]?.enabled).length, f = fe.height - yt, e = v > 0 ? Math.max(60 * v, f * le) : 0, O = f - e;
    return O - (a - p.min) / p.range * O;
  }, [fe.height, r, s, le]), dr = o.useCallback((a, p) => {
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
    ].filter((H) => r?.[H]?.enabled).length, f = fe.height - yt, e = v > 0 ? Math.max(60 * v, f * le) : 0, O = f - e;
    return p.max - a / O * p.range;
  }, [fe.height, r, s, le]), hr = o.useCallback((a, p) => {
    const m = ae.candleWidth * (1 + _e);
    return (a - p) * m + m / 2;
  }, [ae.candleWidth]), ul = o.useCallback((a, p) => {
    const m = ae.candleWidth * (1 + _e);
    return Math.floor(a / m) + p;
  }, [ae.candleWidth]), Ln = o.useCallback((a) => yu(a, h), [h]), js = o.useCallback((a) => {
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
  }, [T]), Kn = o.useCallback((a, p = !1) => {
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
  }, [T]), fr = o.useCallback((a) => {
    const p = new Date(a), m = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    if (T === "local") return m[p.getDay()];
    if (T === "UTC") return m[p.getUTCDay()];
    try {
      return p.toLocaleDateString("en-GB", { timeZone: T, weekday: "short" });
    } catch {
      return m[p.getUTCDay()];
    }
  }, [T]), fa = (a, p) => {
    const m = a / p, v = Math.pow(10, Math.floor(Math.log10(m))), f = m / v;
    let e;
    return f <= 1 ? e = 1 : f <= 2 ? e = 2 : f <= 5 ? e = 5 : e = 10, e * v;
  };
  o.useRef(null);
  const { indicatorData: l } = sd(s, r, lt), us = o.useCallback((a = !1) => {
    const p = Ml.current;
    if (!p) return;
    const { width: m, height: v } = fe;
    Es.current || (Es.current = document.createElement("canvas"));
    const f = Es.current;
    (f.width !== p.width || f.height !== p.height) && (f.width = p.width, f.height = p.height);
    const e = f.getContext("2d");
    if (!e) return;
    const O = !1;
    e.setTransform(hn, 0, 0, hn, 0, 0);
    const H = !!l?.rsi, K = !!l?.macd, _ = !!l?.atr, b = !!l?.stochastic, w = r?.volume?.enabled && s.some((D) => D.volume !== void 0 && D.volume > 0), A = !!l?.williamsR, X = !!l?.cci, u = !!l?.adx, N = !!l?.roc, x = !!l?.aroon, V = !!l?.momentum, d = !!l?.ao, M = !!l?.mfi, ce = !!l?.tsi, Ae = !!l?.trix, Q = !!l?.ultimateOsc, Be = !!l?.dpo, G = !!l?.kst, Ie = !!l?.stochRsi, ze = !!l?.bbPercent, We = !!l?.bbWidth, ie = !!l?.histVol, Te = !!l?.chaikinVol, Je = !!l?.stdDev, Ve = !!l?.obv, Wt = !!l?.cmf, yn = !!l?.adl, Ut = !!l?.forceIndex, Ol = !!l?.eom, Mt = !!l?.correlation, fs = !!l?.coppock, hl = !!l?.vortex, _l = !!l?.choppiness, jo = !!l?.elderRay, Mo = !!l?.massIndex, Ro = !!l?.linRegSlope, Ea = !!l?.ppo, Aa = !!l?.pvo, Da = !!l?.cmo, Ba = !!l?.fisher, Wa = !!l?.stc, Fa = !!l?.rviOsc, Oa = !!l?.klinger, _a = !!l?.connorsRsi, $a = !!l?.apo, Ha = !!l?.qstick, Va = !!l?.bop, Xa = !!l?.psychLine, Ya = !!l?.pfe, za = !!l?.smi, Ka = !!l?.ulcerIndex, Ua = !!l?.natr, qa = !!l?.trueRange, Ga = !!l?.squeeze, Za = !!l?.relVolIndex, Qa = !!l?.vhf, Ja = !!l?.volumeOsc, ec = !!l?.nvi, tc = !!l?.pvi, nc = !!l?.pvt, sc = !!l?.vroc, lc = !!l?.netVolume, oc = !!l?.twiggsMF, rc = !!l?.linRegRSquared, ac = !!l?.gator, $l = [
      H,
      K,
      _,
      b,
      A,
      X,
      u,
      N,
      x,
      V,
      d,
      M,
      ce,
      Ae,
      Q,
      Be,
      G,
      Ie,
      ze,
      We,
      ie,
      Te,
      Je,
      Ve,
      Wt,
      yn,
      Ut,
      Ol,
      Mt,
      fs,
      // Phase 2
      hl,
      _l,
      jo,
      Mo,
      Ro,
      Ea,
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
      Qa,
      Ja,
      ec,
      tc,
      nc,
      sc,
      lc,
      oc,
      rc,
      ac
    ].filter(Boolean).length + (l?.customIndicators?.filter((D) => D.display === "subplot").length || 0), wr = v - yt, Sr = $l > 0 ? Math.max(60 * $l, wr * le) : 0, Un = $l > 0 ? Sr / $l : 0, je = wr - Sr, U = m - He;
    e.fillStyle = ee.background, e.fillRect(0, 0, m, v);
    const c = Nn(!0), un = lt.current ? Re.current.candleWidth : ae.candleWidth, Ze = Ts(c.candles, ae.autoFollowLatest);
    on.current = Ze, rn.current = je;
    const Cr = lt.current ? Re.current.startIndex : ae.startIndex, cc = (Cr - c.startIndex) * (un * (1 + _e)), ge = (D, i) => {
      const j = un * (1 + _e);
      return (D - i) * j + j / 2 - cc;
    }, st = (D) => {
      const i = (D - Ze.min) / Ze.range;
      return je - i * je;
    }, Hl = (ee.gridOpacity ?? 100) / 100;
    e.globalAlpha = Hl, e.strokeStyle = ee.grid, e.lineWidth = 0.5, e.setLineDash([]);
    const ic = yo.current?.chart?.gridHorizontalLines, uc = yo.current?.chart?.gridVerticalLines, dc = Nl ? ic ?? Oe.priceTargetLabels : Oe.priceTargetLabels, Vl = fa(Ze.range, dc), Ir = Math.ceil(Ze.min / Vl) * Vl, hc = c.startIndex + c.candles.length - 1, fc = ge(s.length - 1, c.startIndex) <= U ? U : Math.max(0, Math.min(U, ge(hc, c.startIndex) + un / 2)), Tr = 25;
    e.beginPath();
    let jr = -1 / 0;
    for (let D = Ir; D <= Ze.max; D += Vl) {
      const i = st(D);
      Math.abs(i - jr) < Tr || (jr = i, e.moveTo(0, i), e.lineTo(fc, i));
    }
    e.stroke(), e.setLineDash([]), e.globalAlpha = 1;
    const Mr = un * (1 + _e), Po = Math.ceil(U / Mr), No = c.startIndex + Po, pc = Nl ? uc ?? Oe.targetLinesOnScreen : Oe.targetLinesOnScreen, xc = Math.max(1, Math.round(Po / pc)), Xs = Math.max(1, xc), Rr = Xs / 2, mc = Po / Xs, Pr = Math.max(0, Math.min(
      1,
      (mc - 8) / 6
    )), Nr = Xs / 2, Lr = Oe.tertiaryGridVisible ? Math.max(0, Math.min(
      0.5,
      (3 - Mr) / 1.5
    )) : 0;
    e.globalAlpha = Hl, e.strokeStyle = ee.grid, e.beginPath();
    const Lo = c.startIndex;
    for (let D = Lo; D <= No; D += Xs) {
      const i = ge(D, c.startIndex);
      if (i >= 0 && i <= U && (e.moveTo(i, 0), e.lineTo(i, je)), i > U) break;
    }
    if (e.stroke(), Pr > 0.01 && Rr >= 1) {
      e.globalAlpha = Pr * Hl, e.strokeStyle = ee.grid, e.beginPath();
      const D = c.startIndex;
      for (let i = D; i <= No; i += Rr) {
        if ((i - Lo) % Xs === 0) continue;
        const j = ge(i, c.startIndex);
        if (j >= 0 && j <= U && (e.moveTo(j, 0), e.lineTo(j, je)), j > U) break;
      }
      e.stroke(), e.globalAlpha = 1;
    }
    if (Lr > 0.01 && Nr >= 1) {
      e.globalAlpha = Lr * Hl, e.strokeStyle = ee.grid, e.beginPath();
      const D = c.startIndex;
      for (let i = D; i <= No; i += Nr) {
        if ((i - Lo) % Xs === 0) continue;
        const j = ge(i, c.startIndex);
        if (j >= 0 && j <= U && (e.moveTo(j, 0), e.lineTo(j, je)), j > U) break;
      }
      e.stroke(), e.globalAlpha = 1;
    }
    e.globalAlpha = 1, e.strokeStyle = ee.axisLine || ee.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(U, 0), e.lineTo(U, v), e.stroke(), e.save(), e.beginPath(), e.rect(0, 0, U, je), e.clip();
    const Eo = {
      ctx: e,
      chartWidth: U,
      mainChartHeight: je,
      candles: s,
      visible: c,
      indexToX: ge,
      mainPriceToY: st,
      currentCandleWidth: un
    };
    if (Ue && lr && ku(Eo, lr), he && es.length > 0 && wu(Eo, es), ft && (ft.bids.length > 0 || ft.asks.length > 0) && Su(Eo, ft), Jt) {
      const D = {
        ctx: e,
        chartWidth: U,
        mainChartHeight: je,
        candles: s,
        visibleStartIndex: c.startIndex,
        visibleEndIndex: c.startIndex + c.candles.length,
        candleWidth: un,
        indexToX: ge,
        isDark: ar,
        timeframe: ln
      };
      Cu(D);
    }
    const En = Math.max(un * 0.7, 3), fl = Math.max(1, En * 0.15), Ao = Zs.current, bc = s.length - 1, Ms = (D, i) => Ao && c.startIndex + D === bc && Ao.time === i.time ? Ao : i;
    if (q === "candlestick")
      bl({
        ctx: e,
        candles: c.candles,
        startIndex: c.startIndex,
        indexToX: ge,
        priceToY: st,
        morphAt: Ms,
        candleBodyWidth: En,
        wickWidth: fl,
        colors: {
          bullish: ee.bullish,
          bearish: ee.bearish,
          bullishWick: ee.bullishWick,
          bearishWick: ee.bearishWick,
          bullishBorder: ee.bullishBorder,
          bearishBorder: ee.bearishBorder
        }
      });
    else if (q === "line")
      e.strokeStyle = ee.bullish, e.lineWidth = 2, e.beginPath(), c.candles.forEach((D, i) => {
        const j = ge(c.startIndex + i, c.startIndex), g = st(Ms(i, D).close);
        i === 0 ? e.moveTo(j, g) : e.lineTo(j, g);
      }), e.stroke();
    else if (q === "area") {
      const D = e.createLinearGradient(0, 0, 0, je);
      if (D.addColorStop(0, "rgba(34, 197, 94, 0.4)"), D.addColorStop(1, "rgba(34, 197, 94, 0.02)"), e.beginPath(), c.candles.forEach((i, j) => {
        const g = ge(c.startIndex + j, c.startIndex), C = st(Ms(j, i).close);
        j === 0 ? e.moveTo(g, C) : e.lineTo(g, C);
      }), c.candles.length > 0) {
        const i = ge(c.startIndex + c.candles.length - 1, c.startIndex), j = ge(c.startIndex, c.startIndex);
        e.lineTo(i, je), e.lineTo(j, je), e.closePath(), e.fillStyle = D, e.fill();
      }
      e.strokeStyle = ee.bullish, e.lineWidth = 2, e.beginPath(), c.candles.forEach((i, j) => {
        const g = ge(c.startIndex + j, c.startIndex), C = st(Ms(j, i).close);
        j === 0 ? e.moveTo(g, C) : e.lineTo(g, C);
      }), e.stroke();
    } else if (q === "heikin_ashi") {
      let D = c.candles[0]?.open || 0, i = c.candles[0]?.close || 0;
      const j = c.candles.map((g, C) => {
        const k = (g.open + g.high + g.low + g.close) / 4, L = C === 0 ? (g.open + g.close) / 2 : (D + i) / 2, W = Math.max(g.high, L, k), F = Math.min(g.low, L, k), E = { time: g.time, open: L, high: W, low: F, close: k, volume: g.volume };
        return D = L, i = k, E;
      });
      bl({
        ctx: e,
        candles: j,
        startIndex: c.startIndex,
        indexToX: ge,
        priceToY: st,
        morphAt: (g, C) => j[g],
        candleBodyWidth: En,
        wickWidth: fl,
        colors: {
          bullish: ee.bullish,
          bearish: ee.bearish,
          bullishWick: ee.bullishWick,
          bearishWick: ee.bearishWick,
          bullishBorder: ee.bullishBorder,
          bearishBorder: ee.bearishBorder
        }
      });
    } else if (q === "tpo") {
      const i = /* @__PURE__ */ new Map();
      c.candles.forEach((g) => {
        const C = Math.floor(g.time / 18e5) * 18e5, k = i.get(C);
        k ? (k.high = Math.max(k.high, g.high), k.low = Math.min(k.low, g.low), k.count++) : i.set(C, { high: g.high, low: g.low, count: 1 });
      });
      let j = 0;
      i.forEach((g) => {
        const C = ge(c.startIndex + j, c.startIndex), k = st(g.high), L = st(g.low);
        e.fillStyle = "#21b3a4", e.globalAlpha = 0.25, e.fillRect(C - En / 2, k, En, Math.max(2, L - k)), e.globalAlpha = 1, j++;
      }), e.globalAlpha = 0.3, bl({
        ctx: e,
        candles: c.candles,
        startIndex: c.startIndex,
        indexToX: ge,
        priceToY: st,
        morphAt: Ms,
        candleBodyWidth: En,
        wickWidth: fl,
        colors: {
          bullish: ee.bullish,
          bearish: ee.bearish,
          bullishWick: ee.bullishWick,
          bearishWick: ee.bearishWick,
          bullishBorder: ee.bullishBorder,
          bearishBorder: ee.bearishBorder
        }
      }), e.globalAlpha = 1;
    } else if (q === "footprint_cluster" || q === "footprint_profile")
      bl({
        ctx: e,
        candles: c.candles,
        startIndex: c.startIndex,
        indexToX: ge,
        priceToY: st,
        morphAt: Ms,
        candleBodyWidth: En,
        wickWidth: fl,
        colors: {
          bullish: ee.bullish,
          bearish: ee.bearish,
          bullishWick: ee.bullishWick,
          bearishWick: ee.bearishWick,
          bullishBorder: ee.bullishBorder,
          bearishBorder: ee.bearishBorder
        }
      }), e.font = "8px monospace", e.fillStyle = "#e8e8e8", c.candles.forEach((D, i) => {
        const j = ge(c.startIndex + i, c.startIndex), g = st(D.close), C = D.volume || 0;
        if (C > 0) {
          const k = Math.round(C * 0.55), L = Math.round(C * 0.45);
          e.fillText(`${k}/${L}`, j - 12, g - 8);
        }
      });
    else if (q === "flow_positioning")
      bl({
        ctx: e,
        candles: c.candles,
        startIndex: c.startIndex,
        indexToX: ge,
        priceToY: st,
        morphAt: Ms,
        candleBodyWidth: En,
        wickWidth: fl,
        colors: {
          bullish: ee.bullish,
          bearish: ee.bearish,
          bullishWick: ee.bullishWick,
          bearishWick: ee.bearishWick,
          bullishBorder: ee.bullishBorder,
          bearishBorder: ee.bearishBorder
        }
      }), e.strokeStyle = "#d0d0d0", e.lineWidth = 1, c.candles.forEach((D, i) => {
        if (i % 5 !== 0) return;
        const j = ge(c.startIndex + i, c.startIndex), g = D.close > D.open, C = st(D.close);
        e.beginPath(), e.moveTo(j, C), e.lineTo(j, C + (g ? -12 : 12)), e.stroke(), e.fillStyle = g ? "#21b3a4" : "#f0426c", e.beginPath(), e.arc(j, C + (g ? -14 : 14), 2, 0, Math.PI * 2), e.fill();
      });
    else if (q === "renko") {
      const D = Ze.range * 0.02, i = [];
      let j = c.candles[0]?.close || 0, g = 0;
      c.candles.forEach((C) => {
        const k = C.close - j, L = Math.floor(Math.abs(k) / D);
        for (let W = 0; W < L; W++) {
          const F = k > 0, E = j, S = F ? j + D : j - D;
          i.push({
            x: g * En * 1.2,
            isBullish: F,
            top: st(Math.max(E, S)),
            bottom: st(Math.min(E, S))
          }), j = S, g++;
        }
      }), i.forEach((C) => {
        const k = Math.abs(C.bottom - C.top);
        e.fillStyle = C.isBullish ? ee.bullish : ee.bearish, e.fillRect(C.x, C.top, En, k), e.strokeStyle = C.isBullish ? ee.bullishBorder : ee.bearishBorder, e.lineWidth = 1, e.strokeRect(C.x, C.top, En, k);
      });
    }
    if (w) {
      const D = je * 0.2, i = je, j = i - D, g = c.candles.map((L) => L.volume ?? 0).filter((L) => L > 0), C = g.length > 0 ? Math.max(...g) : 1, k = Math.max(2, un * 0.7);
      c.candles.forEach((L, W) => {
        const F = L.volume ?? 0;
        if (F > 0) {
          const E = c.startIndex + W, S = ge(E, c.startIndex), P = F / C * D * 0.95, $ = i - P, Z = L.close >= L.open, ue = r?.volume?.upColor || "#26a69a", z = r?.volume?.downColor || "#ef5350", Y = Z ? ue : z, oe = parseInt(Y.slice(1, 3), 16), pe = parseInt(Y.slice(3, 5), 16), ke = parseInt(Y.slice(5, 7), 16);
          e.fillStyle = `rgba(${oe}, ${pe}, ${ke}, 0.45)`, e.fillRect(S - k / 2, $, k, P), e.strokeStyle = `rgba(${oe}, ${pe}, ${ke}, 0.7)`, e.lineWidth = 1, e.beginPath(), e.moveTo(S - k / 2, $), e.lineTo(S + k / 2, $), e.stroke();
        }
      }), St === "volume" && (e.save(), c.candles.forEach((W, F) => {
        const E = W.volume ?? 0;
        if (E <= 0) return;
        const S = c.candles[F - 1]?.volume ?? 0, R = c.candles[F + 1]?.volume ?? 0;
        if (E < S || E < R) return;
        const P = c.startIndex + F, $ = ge(P, c.startIndex), ue = E / C * D * 0.95, z = i - ue;
        e.beginPath(), e.arc($, z, 2.5 + 1, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc($, z, 2.5, 0, Math.PI * 2);
        const Y = W.close >= W.open;
        e.fillStyle = Y ? r?.volume?.upColor || "#26a69a" : r?.volume?.downColor || "#ef5350", e.fill();
      }), e.restore()), en.current.volume = { top: j, bottom: i };
    }
    if (e.restore(), r) {
      if (r.ema?.enabled && l?.ema && r.ema.periods?.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, U, je), e.clip();
        const i = ar ? ["#D1D4DC", "#A0A4B0", "#B2B5BE", "#9598A1", "#787B86"] : ["#363A45", "#5D606B", "#434651", "#787B86", "#9598A1"];
        r.ema.periods.forEach((j, g) => {
          const C = l.ema[g];
          if (!C) return;
          e.strokeStyle = i[g % i.length], e.lineWidth = 1.5, e.beginPath();
          let k = !1;
          c.candles.forEach((L, W) => {
            const F = c.startIndex + W, E = C[F];
            if (!isNaN(E) && isFinite(E)) {
              const S = ge(F, c.startIndex), R = it(E, Ze);
              k ? e.lineTo(S, R) : (e.moveTo(S, R), k = !0);
            }
          }), e.stroke();
        }), e.restore();
      }
      if (l?.movingAverages && l.movingAverages.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, U, je), e.clip();
        const i = r?.movingAverages?.lineWidth ?? 1.5;
        l.movingAverages.forEach((j) => {
          e.strokeStyle = j.color, e.lineWidth = i, e.beginPath();
          let g = !1;
          c.candles.forEach((C, k) => {
            const L = c.startIndex + k, W = j.data[L];
            if (!isNaN(W) && isFinite(W)) {
              const F = ge(L, c.startIndex), E = it(W, Ze);
              g ? e.lineTo(F, E) : (e.moveTo(F, E), g = !0);
            }
          }), e.stroke();
        }), e.restore();
      }
      if (r.bollinger?.enabled && l?.bollinger) {
        const i = l.bollinger;
        e.save(), e.beginPath(), e.rect(0, 0, U, je), e.clip();
        const j = r.bollinger.lineWidth || 1, g = r.bollinger.upperColor || "#9B59B6", C = r.bollinger.middleColor || "#9B59B6", k = r.bollinger.lowerColor || "#9B59B6";
        e.strokeStyle = g, e.lineWidth = j, e.setLineDash([3, 3]), e.beginPath();
        let L = !1;
        c.candles.forEach((W, F) => {
          const E = c.startIndex + F, S = i.upper[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ge(E, c.startIndex), P = it(S, Ze);
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.strokeStyle = C, e.lineWidth = j, e.setLineDash([]), e.beginPath(), L = !1, c.candles.forEach((W, F) => {
          const E = c.startIndex + F, S = i.middle[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ge(E, c.startIndex), P = it(S, Ze);
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.strokeStyle = k, e.lineWidth = j, e.setLineDash([3, 3]), e.beginPath(), L = !1, c.candles.forEach((W, F) => {
          const E = c.startIndex + F, S = i.lower[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ge(E, c.startIndex), P = it(S, Ze);
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.setLineDash([]), e.restore();
      }
      if (l?.vwap) {
        e.save(), e.beginPath(), e.rect(0, 0, U, je), e.clip(), e.strokeStyle = r?.vwap?.color || "#2196F3", e.lineWidth = 2, e.beginPath();
        let i = !1;
        c.candles.forEach((j, g) => {
          const C = c.startIndex + g, k = l.vwap[C];
          if (!isNaN(k) && isFinite(k)) {
            const L = ge(C, c.startIndex), W = it(k, Ze);
            i ? e.lineTo(L, W) : (e.moveTo(L, W), i = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (l?.ichimoku) {
        e.save(), e.beginPath(), e.rect(0, 0, U, je), e.clip();
        const i = l.ichimoku, j = r?.ichimoku?.tenkanColor || "#0496ff", g = r?.ichimoku?.kijunColor || "#ff0000", C = r?.ichimoku?.cloudUpColor || "rgba(0, 255, 0, 0.2)", k = r?.ichimoku?.cloudDownColor || "rgba(255, 0, 0, 0.2)";
        for (let W = 0; W < c.candles.length; W++) {
          const F = c.startIndex + W, E = i.senkouA[F], S = i.senkouB[F];
          if (!isNaN(E) && !isNaN(S) && isFinite(E) && isFinite(S)) {
            const R = ge(F, c.startIndex), P = it(E, Ze), $ = it(S, Ze);
            e.fillStyle = E >= S ? C : k;
            const Z = un * (1 + _e);
            e.fillRect(R - Z / 2, Math.min(P, $), Z, Math.abs(P - $));
          }
        }
        e.strokeStyle = j, e.lineWidth = 1.5, e.beginPath();
        let L = !1;
        c.candles.forEach((W, F) => {
          const E = c.startIndex + F, S = i.tenkan[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ge(E, c.startIndex), P = it(S, Ze);
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.strokeStyle = g, e.lineWidth = 1.5, e.beginPath(), L = !1, c.candles.forEach((W, F) => {
          const E = c.startIndex + F, S = i.kijun[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ge(E, c.startIndex), P = it(S, Ze);
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (l?.parabolicSAR) {
        e.save(), e.beginPath(), e.rect(0, 0, U, je), e.clip();
        const i = l.parabolicSAR, j = r?.parabolicSAR?.bullishColor || "#22c55e", g = r?.parabolicSAR?.bearishColor || "#ef4444";
        c.candles.forEach((C, k) => {
          const L = c.startIndex + k, W = i.sar[L], F = i.direction[L];
          if (!isNaN(W) && isFinite(W)) {
            const E = ge(L, c.startIndex), S = it(W, Ze);
            e.fillStyle = F > 0 ? j : g, e.beginPath(), e.arc(E, S, 2.5, 0, Math.PI * 2), e.fill();
          }
        }), e.restore();
      }
      if (l?.keltner) {
        e.save(), e.beginPath(), e.rect(0, 0, U, je), e.clip();
        const i = l.keltner, j = r?.keltner?.upperColor || "#FF9800", g = r?.keltner?.middleColor || "#FF9800", C = r?.keltner?.lowerColor || "#FF9800";
        e.strokeStyle = j, e.lineWidth = 1, e.setLineDash([3, 3]), e.beginPath();
        let k = !1;
        c.candles.forEach((L, W) => {
          const F = c.startIndex + W, E = i.upper[F];
          if (!isNaN(E) && isFinite(E)) {
            const S = ge(F, c.startIndex), R = it(E, Ze);
            k ? e.lineTo(S, R) : (e.moveTo(S, R), k = !0);
          }
        }), e.stroke(), e.strokeStyle = g, e.setLineDash([]), e.beginPath(), k = !1, c.candles.forEach((L, W) => {
          const F = c.startIndex + W, E = i.middle[F];
          if (!isNaN(E) && isFinite(E)) {
            const S = ge(F, c.startIndex), R = it(E, Ze);
            k ? e.lineTo(S, R) : (e.moveTo(S, R), k = !0);
          }
        }), e.stroke(), e.strokeStyle = C, e.setLineDash([3, 3]), e.beginPath(), k = !1, c.candles.forEach((L, W) => {
          const F = c.startIndex + W, E = i.lower[F];
          if (!isNaN(E) && isFinite(E)) {
            const S = ge(F, c.startIndex), R = it(E, Ze);
            k ? e.lineTo(S, R) : (e.moveTo(S, R), k = !0);
          }
        }), e.stroke(), e.setLineDash([]), e.restore();
      }
      if (l?.pivotPoints) {
        e.save(), e.beginPath(), e.rect(0, 0, U, je), e.clip();
        const i = l.pivotPoints, j = r?.pivotPoints?.pivotColor || "#FFEB3B", g = r?.pivotPoints?.resistanceColor || "#ef4444", C = r?.pivotPoints?.supportColor || "#22c55e", k = (L, W, F, E = []) => {
          const S = L.filter((R) => !isNaN(R) && isFinite(R)).pop();
          if (S !== void 0) {
            const R = it(S, Ze);
            e.strokeStyle = W, e.lineWidth = 1, e.setLineDash(E), e.beginPath(), e.moveTo(0, R), e.lineTo(U, R), e.stroke(), e.fillStyle = W, e.font = Ht, e.textAlign = "left", e.fillText(F, 5, R - 3);
          }
        };
        e.setLineDash([]), k(i.pivot, j, "P"), k(i.r1, g, "R1", [2, 2]), k(i.r2, g, "R2", [4, 2]), k(i.r3, g, "R3", [6, 2]), k(i.s1, C, "S1", [2, 2]), k(i.s2, C, "S2", [4, 2]), k(i.s3, C, "S3", [6, 2]), e.setLineDash([]), e.restore();
      }
      if (l?.supertrend) {
        e.save(), e.beginPath(), e.rect(0, 0, U, je), e.clip();
        const i = l.supertrend, j = r?.supertrend?.bullishColor || "#22c55e", g = r?.supertrend?.bearishColor || "#ef4444";
        e.lineWidth = r?.supertrend?.lineWidth || 2, c.candles.forEach((C, k) => {
          const L = c.startIndex + k, W = i.supertrend[L];
          if (isNaN(W) || !isFinite(W)) return;
          const F = ge(L, c.startIndex), E = it(W, Ze), S = L - 1;
          S >= 0 && !isNaN(i.supertrend[S]) && (e.strokeStyle = i.direction[L] === 1 ? j : g, e.beginPath(), e.moveTo(ge(S, c.startIndex), it(i.supertrend[S], Ze)), e.lineTo(F, E), e.stroke());
        }), e.restore();
      }
      if (l?.donchian) {
        e.save(), e.beginPath(), e.rect(0, 0, U, je), e.clip();
        const i = l.donchian, j = (g, C, k = []) => {
          e.strokeStyle = C, e.lineWidth = r?.donchian?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let L = !1;
          c.candles.forEach((W, F) => {
            const E = c.startIndex + F, S = g[E];
            if (!isNaN(S) && isFinite(S)) {
              const R = ge(E, c.startIndex), P = it(S, Ze);
              L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        j(i.upper, r?.donchian?.upperColor || "#2196F3"), j(i.middle, r?.donchian?.middleColor || "#FFC107", [4, 4]), j(i.lower, r?.donchian?.lowerColor || "#2196F3"), e.restore();
      }
      if (l?.envelopes) {
        e.save(), e.beginPath(), e.rect(0, 0, U, je), e.clip();
        const i = l.envelopes, j = (g, C, k = []) => {
          e.strokeStyle = C, e.lineWidth = r?.envelopes?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let L = !1;
          c.candles.forEach((W, F) => {
            const E = c.startIndex + F, S = g[E];
            if (!isNaN(S) && isFinite(S)) {
              const R = ge(E, c.startIndex);
              L ? e.lineTo(R, it(S, Ze)) : (e.moveTo(R, it(S, Ze)), L = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        j(i.upper, r?.envelopes?.upperColor || "#00BCD4"), j(i.middle, r?.envelopes?.middleColor || "#FFC107", [3, 3]), j(i.lower, r?.envelopes?.lowerColor || "#00BCD4"), e.restore();
      }
      if ([
        { key: "dema", defaultColor: "#FF9800", label: "DEMA" },
        { key: "tema", defaultColor: "#E91E63", label: "TEMA" },
        { key: "hma", defaultColor: "#00E676", label: "HMA" }
      ].forEach(({ key: i, defaultColor: j }) => {
        const g = l?.[i];
        if (!g) return;
        e.save(), e.beginPath(), e.rect(0, 0, U, je), e.clip(), e.strokeStyle = r?.[i]?.color || j, e.lineWidth = r?.[i]?.lineWidth || 2, e.beginPath();
        let C = !1;
        c.candles.forEach((k, L) => {
          const W = c.startIndex + L, F = g[W];
          if (!isNaN(F) && isFinite(F)) {
            const E = ge(W, c.startIndex), S = it(F, Ze);
            C ? e.lineTo(E, S) : (e.moveTo(E, S), C = !0);
          }
        }), e.stroke(), e.restore();
      }), l?.linearReg) {
        e.save(), e.beginPath(), e.rect(0, 0, U, je), e.clip();
        const i = l.linearReg, j = (g, C, k = []) => {
          e.strokeStyle = C, e.lineWidth = r?.linearReg?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let L = !1;
          c.candles.forEach((W, F) => {
            const E = c.startIndex + F, S = g[E];
            if (!isNaN(S) && isFinite(S)) {
              const R = ge(E, c.startIndex);
              L ? e.lineTo(R, it(S, Ze)) : (e.moveTo(R, it(S, Ze)), L = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        j(i.upper, r?.linearReg?.upperColor || "#81D4FA"), j(i.middle, r?.linearReg?.middleColor || "#29B6F6", [4, 4]), j(i.lower, r?.linearReg?.lowerColor || "#81D4FA"), e.restore();
      }
      if (l?.fibRetracement) {
        e.save(), e.beginPath(), e.rect(0, 0, U, je), e.clip();
        const i = l.fibRetracement, j = r?.fibRetracement?.color || "#FFD54F", g = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
        i.levels.forEach((C, k) => {
          const L = it(C, Ze);
          e.strokeStyle = j, e.lineWidth = r?.fibRetracement?.lineWidth || 1, e.setLineDash(k === 0 || k === 6 ? [] : [4, 3]), e.beginPath(), e.moveTo(0, L), e.lineTo(U, L), e.stroke(), e.fillStyle = j, e.font = Ht, e.textAlign = "left", e.fillText(`${(g[k] * 100).toFixed(1)}% (${C.toFixed(2)})`, 5, L - 3);
        }), e.setLineDash([]), e.restore();
      }
      if (l?.camarillaPivots) {
        e.save(), e.beginPath(), e.rect(0, 0, U, je), e.clip();
        const i = l.camarillaPivots, j = r?.camarillaPivots?.resistanceColor || "#ef4444", g = r?.camarillaPivots?.supportColor || "#22c55e", C = (k, L, W) => {
          const F = k.filter((E) => !isNaN(E) && isFinite(E)).pop();
          if (F !== void 0) {
            const E = it(F, Ze);
            e.strokeStyle = L, e.lineWidth = r?.camarillaPivots?.lineWidth || 1, e.setLineDash([3, 3]), e.beginPath(), e.moveTo(0, E), e.lineTo(U, E), e.stroke(), e.fillStyle = L, e.font = Ht, e.textAlign = "left", e.fillText(W, 5, E - 3);
          }
        };
        C(i.h4, j, "H4"), C(i.h3, j, "H3"), C(i.l3, g, "L3"), C(i.l4, g, "L4"), e.setLineDash([]), e.restore();
      }
      if (l?.woodiePivots) {
        e.save(), e.beginPath(), e.rect(0, 0, U, je), e.clip();
        const i = l.woodiePivots, j = r?.woodiePivots?.pivotColor || "#FFEB3B", g = r?.woodiePivots?.resistanceColor || "#ef4444", C = r?.woodiePivots?.supportColor || "#22c55e", k = (L, W, F) => {
          const E = L.filter((S) => !isNaN(S) && isFinite(S)).pop();
          if (E !== void 0) {
            const S = it(E, Ze);
            e.strokeStyle = W, e.lineWidth = r?.woodiePivots?.lineWidth || 1, e.setLineDash([3, 3]), e.beginPath(), e.moveTo(0, S), e.lineTo(U, S), e.stroke(), e.fillStyle = W, e.font = Ht, e.textAlign = "left", e.fillText(F, 5, S - 3);
          }
        };
        k(i.pivot, j, "WP"), k(i.r1, g, "WR1"), k(i.r2, g, "WR2"), k(i.s1, C, "WS1"), k(i.s2, C, "WS2"), e.setLineDash([]), e.restore();
      }
      if (l?.volumeSma && w) {
        e.save();
        const i = l.volumeSma, j = je * 0.2, g = je, C = c.candles.map((W) => W.volume || 0), k = Math.max(...C, 1);
        e.strokeStyle = r?.volumeSma?.color || "#FF9800", e.lineWidth = 1.5, e.beginPath();
        let L = !1;
        c.candles.forEach((W, F) => {
          const E = c.startIndex + F, S = i[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ge(E, c.startIndex), P = g - S / k * j;
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (r?.volumeProfile?.enabled && c.candles.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, U, je), e.clip();
        const i = r.volumeProfile.numberOfRows ?? 48, j = U * ((r.volumeProfile.rowWidth ?? 15) / 100), g = (r.volumeProfile.opacity ?? 60) / 100, C = r.volumeProfile.upColor || "#D97706", k = r.volumeProfile.downColor || "#1E3A8A", L = r.volumeProfile.pocColor || "#10B981", W = r.volumeProfile.lookbackBars ?? 0, F = W > 0 ? c.candles.slice(-W) : c.candles;
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
          const Y = z.low, oe = z.high, pe = oe - Y, ke = z.close >= z.open;
          for (let ne = 0; ne < i; ne++) {
            const we = E + ne * P, Se = we + P;
            if (oe >= we && Y <= Se) {
              const Ke = Math.max(Y, we), ut = Math.min(oe, Se), ht = pe > 0 ? (ut - Ke) / pe : 1, Lt = z.volume * ht;
              ke ? $[ne].upVolume += Lt : $[ne].downVolume += Lt, $[ne].totalVolume += Lt;
            }
          }
        });
        let Z = 0, ue = 0;
        if ($.forEach((z, Y) => {
          z.totalVolume > Z && (Z = z.totalVolume, ue = Y);
        }), Z > 0) {
          const z = je / i * 0.85;
          $.forEach((Y, oe) => {
            if (Y.totalVolume <= 0) return;
            const pe = st(Y.priceLevel) - z / 2, ke = Y.totalVolume / Z * j, ne = Y.totalVolume > 0 ? Y.upVolume / Y.totalVolume * ke : 0, we = ke - ne, Se = oe === ue, Ke = U - ke;
            ne > 0 && (e.globalAlpha = Se ? Math.min(g + 0.2, 1) : g, e.fillStyle = C, e.fillRect(Ke, pe, ne, z)), we > 0 && (e.globalAlpha = Se ? 0.95 : 0.85, e.fillStyle = k, e.fillRect(Ke + ne, pe, we, z)), Se && (e.globalAlpha = 0.9, e.strokeStyle = L, e.lineWidth = 1.5, e.strokeRect(Ke, pe, ke, z));
          }), e.globalAlpha = 1, St === "volumeProfile" && $.forEach((oe, pe) => {
            if (oe.totalVolume <= 0) return;
            const ke = st(oe.priceLevel), ne = oe.totalVolume / Z * j, we = U - ne;
            e.beginPath(), e.arc(we, ke, 2.5 + 1, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc(we, ke, 2.5, 0, Math.PI * 2), e.fillStyle = oe.upVolume >= oe.downVolume ? C : k, e.fill();
          });
        }
        e.restore(), e.restore();
      }
    }
    const Ys = [], Rs = [];
    let Xl = "", Do = "", pl = 14, Bo = 0, Wo = 0;
    const gc = ys?.current && ys.current.length > 0;
    if (vs && !gc && Gn) {
      const D = Gn.find((i) => i.id === vs);
      if (D && D.points && D.points.length > 0) {
        e.save();
        const i = Oe.badgeFont, j = "#2962ff", g = "rgba(41, 98, 255, 0.2)", C = Oe.badgePadding, k = Oe.badgeRowHeight, L = He - 6, W = U + 3, F = fe.height - yt, E = F + (yt - k) / 2;
        if (Xl = i, Do = j, pl = k, Bo = E, Wo = W, D.points.forEach((S) => {
          let R = null, P = null;
          if (S.price !== void 0 && (P = st(S.price), P >= 0 && P <= je)) {
            const $ = Ln(S.price), Z = e.measureText($).width, ue = Math.min(Z + C * 2, L), z = P - k / 2;
            Rs.push({
              pos: P,
              text: $,
              bWidth: ue,
              topOrigin: z
            });
          }
          if (S.time !== void 0) {
            let $ = -1;
            if (s.length > 0) {
              const Z = s[0].time, ue = s[s.length - 1].time, z = s.length > 1 ? s[1].time - s[0].time : 6e4;
              if (S.time > ue) $ = s.length - 1 + (S.time - ue) / z;
              else if (S.time < Z) $ = (S.time - Z) / z;
              else {
                let Y = 0, oe = s.length - 1;
                for (; Y <= oe; ) {
                  const pe = Math.floor((Y + oe) / 2);
                  if (s[pe].time === S.time) {
                    $ = pe;
                    break;
                  }
                  s[pe].time < S.time ? Y = pe + 1 : oe = pe - 1;
                }
                if ($ === -1) {
                  const pe = Y, ke = pe - 1;
                  if (ke >= 0 && pe < s.length) {
                    const ne = s[ke], we = s[pe], Se = (S.time - ne.time) / (we.time - ne.time);
                    $ = ke + Se;
                  } else
                    $ = Y;
                }
              }
            }
            if ($ !== -1) {
              const Z = Re.current.startIndex, z = Re.current.candleWidth * (1 + _e), Y = Math.floor(Z), oe = (Z - Y) * z;
              R = ($ - Y) * z + z / 2 - oe;
            }
            if (R !== null && R >= 0 && R <= U) {
              const Z = `${fr(S.time)} ${Kn(S.time, !0)}  ${js(S.time)}`, z = e.measureText(Z).width + C * 2;
              let Y = R - z / 2;
              Y < 0 && (Y = 0), Y + z > U && (Y = U - z), Ys.push({
                pos: R,
                text: Z,
                bWidth: z,
                topOrigin: Y
              });
            }
          }
        }), (D.type === "long" || D.type === "short") && D.stopLoss) {
          const S = D.stopLoss.price, R = st(S);
          if (R >= 0 && R <= je) {
            e.font = Xl || i;
            const P = Ln(S), $ = e.measureText(P).width, Z = Math.min($ + C * 2, L), ue = R - k / 2;
            Rs.push({
              pos: R,
              text: P,
              bWidth: Z,
              topOrigin: ue
            });
          }
        }
        if (Ys.length >= 2) {
          const S = Math.min(...Ys.map((P) => P.pos)), R = Math.max(...Ys.map((P) => P.pos));
          R > S && (e.fillStyle = g, e.fillRect(S, F, R - S, yt));
        }
        if (Rs.length >= 2) {
          const S = Math.min(...Rs.map((P) => P.pos)), R = Math.max(...Rs.map((P) => P.pos));
          R > S && (e.fillStyle = g, e.fillRect(W - 3, S, He, R - S));
        }
        e.restore();
      }
    }
    e.fillStyle = ee.axisLabel || "#787b86", e.font = Ll, e.textBaseline = "middle", e.textAlign = Oe.priceLabelAlign;
    const vc = Oe.priceLabelAlign === "right" ? m - (Dn !== void 0 ? Dn : _o) - 4 : U + 2;
    let Er = -1 / 0;
    for (let D = Ir; D <= Ze.max; D += Vl) {
      const i = st(D);
      if (i >= 10 && i <= je - 10) {
        if (Math.abs(i - Er) < Tr) continue;
        Er = i, e.fillText(Ln(D), vc, i);
      }
    }
    const qt = n != null && !Number.isNaN(n) ? n : c.candles.length ? c.candles[c.candles.length - 1].close : null;
    if (qt != null && !Number.isNaN(qt) && !Ct) {
      const D = st(qt);
      if (D >= 0 && D <= je) {
        e.save();
        const i = c.candles.length >= 2 ? c.candles[c.candles.length - 2] : null, j = c.candles.length >= 1 ? c.candles[c.candles.length - 1] : null, g = i ? i.close : j ? j.open : qt, C = qt >= g, k = ee.priceTickerBullish || ee.bullish, L = ee.priceTickerBearish || ee.bearish, W = C ? k : L, F = (_n) => {
          const nn = _n.replace("#", ""), Ot = parseInt(nn.substring(0, 2), 16), dn = parseInt(nn.substring(2, 4), 16), Gt = parseInt(nn.substring(4, 6), 16);
          return `${Ot}, ${dn}, ${Gt}`;
        }, E = F(ee.textDim || "#666666"), S = `rgba(${E}, 0.35)`, R = `rgba(${E}, 0.9)`, P = F(W).split(",").map(Number), $ = (0.299 * P[0] + 0.587 * P[1] + 0.114 * P[2]) / 255, Z = Number.isNaN($) || $ <= 0.55 ? "#ffffff" : "#000000", ue = c.candles.length - 1, z = c.candles.length > 0 ? ge(c.startIndex + ue, c.startIndex) : 0;
        z > 0 && (e.strokeStyle = S, e.lineWidth = 1, e.setLineDash([4, 4]), e.beginPath(), e.moveTo(0, D), e.lineTo(z, D), e.stroke(), e.setLineDash([])), e.strokeStyle = R, e.lineWidth = 1, e.setLineDash([4, 3]), e.beginPath(), e.moveTo(z, D), e.lineTo(U, D), e.stroke(), e.setLineDash([]);
        const Y = Ln(qt), oe = Ll, pe = Oe.liveCountdownFont;
        e.font = oe;
        const ne = e.measureText(Y).width, we = Oe.livePriceLabelPadding, Se = Oe.livePriceRowHeight, Ke = I && I.length > 0, ut = Ke ? Oe.countdownRowHeight : 0, ht = Se + ut;
        let Lt = 0;
        Ke && (e.font = pe, Lt = e.measureText(I).width);
        const kn = He - 6, An = Math.max(ne, Lt) + we * 2, Rt = Math.min(An, kn), Et = U + 3, kt = D - Se / 2;
        e.fillStyle = ee.background, e.fillRect(Et - 1, kt - 1, Rt + 2, ht + 2), e.fillStyle = W, e.beginPath(), e.roundRect(Et, kt, Rt, ht, 3), e.fill(), e.fillStyle = Z, e.font = oe, e.textAlign = "center", e.textBaseline = "middle", e.fillText(Y, Et + Rt / 2, kt + Se / 2), Ke && (e.strokeStyle = Z === "#ffffff" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)", e.lineWidth = 0.5, e.beginPath(), e.moveTo(Et + 3, kt + Se), e.lineTo(Et + Rt - 3, kt + Se), e.stroke(), e.fillStyle = Z === "#ffffff" ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)", e.font = pe, e.textAlign = "center", e.textBaseline = "middle", e.fillText(I, Et + Rt / 2, kt + Se + ut / 2)), e.restore();
      }
    }
    if (Gn && Gn.length > 0) {
      e.save();
      const D = Ll;
      e.font = D;
      const i = Oe.badgePadding, j = Oe.badgeRowHeight, g = [], C = [];
      Gn.forEach((R) => {
        if ((R.type === "horizontalRay" || R.type === "horizontal") && R.points.length > 0) {
          const P = R.points[0].price;
          g.push({ price: P, color: R.color || "#2196f3", yPos: st(P) });
        } else if ((R.type === "long" || R.type === "short") && R.points.length >= 2) {
          if (R.id === vs) return;
          const P = R.points[0].price, $ = R.points[1].price;
          if (g.push({ price: P, color: "#4b5563", yPos: st(P) }), g.push({ price: $, color: "#22c55e", yPos: st($) }), R.stopLoss) {
            const Z = R.stopLoss.price;
            g.push({ price: Z, color: "#ef4444", yPos: st(Z) });
          }
        }
      });
      let k = -9999, L = -9999;
      if (qt != null && !Number.isNaN(qt)) {
        const R = st(qt), P = Oe.livePriceRowHeight + (I && I.length > 0 ? Oe.countdownRowHeight : 0);
        k = R - Oe.livePriceRowHeight / 2, L = k + P;
      }
      const W = 2, F = He - 6, E = U + 3;
      g.sort((R, P) => R.yPos - P.yPos);
      let S = -9999;
      g.forEach((R) => {
        let P = R.yPos - j / 2, $ = P + j;
        if (P < S + W && (P = S + W, $ = P + j), P < L + W && $ > k - W && (P = L + W, $ = P + j), S = $, P >= 0 && $ <= je) {
          const Z = Ln(R.price), ue = e.measureText(Z).width, z = Math.min(ue + i * 2, F);
          e.fillStyle = R.color, e.beginPath(), e.roundRect(E, P, z, j, 3), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.fillText(Z, E + z / 2, P + j / 2);
        }
      }), e.font = Oe.alertFlagFont, C.forEach((R) => {
        if (R.xPos >= 0 && R.xPos <= U) {
          const P = Kn(R.time, !0) + " " + js(R.time), Z = e.measureText(P).width + i * 2, z = fe.height - yt + (yt - j) / 2;
          let Y = R.xPos - Z / 2;
          Y < 0 && (Y = 0), Y + Z > U && (Y = U - Z), e.fillStyle = R.color, e.beginPath(), e.roundRect(Y, z, Z, j, 3), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.fillText(P, Y + Z / 2, z + j / 2);
        }
      }), e.restore();
    }
    if (Ct && qt !== null && qt !== void 0 && !Number.isNaN(qt)) {
      const D = Pt != null && sn != null && Number.isFinite(Pt) && Number.isFinite(sn), i = D ? Pt : qt, j = D ? sn : qt + od(h || ""), g = st(i), C = st(j);
      if (e.save(), g >= 0 && g <= je) {
        e.strokeStyle = "#1976d2", e.lineWidth = 1, e.setLineDash([3, 4]), e.beginPath(), e.moveTo(0, g), e.lineTo(U, g), e.stroke(), e.setLineDash([]);
        const k = Ln(i);
        e.font = Oe.alertCountFont;
        const W = e.measureText(k).width + 12, F = 16, E = U + 2;
        e.fillStyle = "#1976d2", e.beginPath(), e.roundRect(E, g - F / 2, Math.min(W, He - 4), F, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "left", e.textBaseline = "middle", e.fillText(k, E + 6, g);
      }
      if (C >= 0 && C <= je) {
        e.strokeStyle = "#d32f2f", e.lineWidth = 1, e.setLineDash([3, 4]), e.beginPath(), e.moveTo(0, C), e.lineTo(U, C), e.stroke(), e.setLineDash([]);
        const k = Ln(j);
        e.font = Oe.alertCountFont;
        const W = e.measureText(k).width + 12, F = 16, E = U + 2;
        e.fillStyle = "#d32f2f", e.beginPath(), e.roundRect(E, C - F / 2, Math.min(W, He - 4), F, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "left", e.textBaseline = "middle", e.fillText(k, E + 6, C);
      }
      g >= 0 && C >= 0 && g <= je && C <= je && (e.fillStyle = "rgba(148, 163, 184, 0.04)", e.fillRect(0, Math.min(C, g), U, Math.abs(g - C))), e.restore();
    }
    if (Ye && Ye.length > 0) {
      const D = {
        ctx: e,
        chartWidth: U,
        mainChartHeight: je,
        mainPriceToY: st,
        formatPrice: Ln,
        colors: {
          slColor: ee.slColor,
          slOpacity: ee.slOpacity,
          tpColor: ee.tpColor,
          tpOpacity: ee.tpOpacity
        },
        selectedPositionId: $e.current,
        slDraft: at.current,
        tpDraft: dt.current,
        hoveredSLTP: pn.current,
        draggingHandle: nt.current,
        defaultOffset: Qn(0) || void 0
      };
      Iu(D, Ye), Tu(D, Ye);
    }
    if (St && !St.startsWith("sp-") && l) {
      const D = Ze;
      if (D && je > 0) {
        const g = (k, L) => {
          e.save(), e.beginPath(), e.rect(0, 0, U, je), e.clip();
          for (let W = 0; W < c.candles.length; W += 8) {
            const F = c.startIndex + W;
            if (F >= k.length) continue;
            const E = k[F];
            if (isNaN(E) || !isFinite(E)) continue;
            const S = ge(F, c.startIndex), R = je - (E - D.min) / D.range * je;
            e.beginPath(), e.arc(S, R, 3.5, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc(S, R, 2.5, 0, Math.PI * 2), e.fillStyle = L, e.fill();
          }
          e.restore();
        }, C = St;
        if (C === "movingAverages" && l.movingAverages)
          for (const k of l.movingAverages) g(k.data, k.color);
        else if (C?.startsWith("movingAverages__") && l.movingAverages) {
          const k = parseInt(C.slice(16), 10), L = l.movingAverages[k];
          L && g(L.data, L.color);
        } else if (C === "bollinger" && l.bollinger) {
          const k = l.bollinger;
          g(k.upper, r?.bollinger?.upperColor || "#9B59B6"), g(k.middle, r?.bollinger?.middleColor || "#9B59B6"), g(k.lower, r?.bollinger?.lowerColor || "#9B59B6");
        } else if (C === "vwap" && l.vwap)
          g(l.vwap, "#ff9800");
        else if (C === "ichimoku" && l.ichimoku) {
          const k = l.ichimoku;
          g(k.tenkan, "#0094FF"), g(k.kijun, "#AD1457"), g(k.senkouA, "#4CAF50"), g(k.senkouB, "#FF5722");
        } else if (C === "keltner" && l.keltner)
          g(l.keltner.upper, "#3b82f6"), g(l.keltner.middle, "#3b82f6"), g(l.keltner.lower, "#3b82f6");
        else if (C === "donchian" && l.donchian)
          g(l.donchian.upper, "#3b82f6"), g(l.donchian.middle, "#3b82f6"), g(l.donchian.lower, "#3b82f6");
        else if (C === "envelopes" && l.envelopes)
          g(l.envelopes.upper, "#3b82f6"), g(l.envelopes.basis, "#3b82f6"), g(l.envelopes.lower, "#3b82f6");
        else if (C === "supertrend" && l.supertrend) {
          const k = l.supertrend.map((L) => L?.value ?? NaN);
          g(k, "#3b82f6");
        } else if (["dema", "tema", "hma"].includes(C)) {
          const k = l[C];
          Array.isArray(k) && g(k, "#3b82f6");
        } else if (C.startsWith("ci-") && r?.customIndicators) {
          const k = r.customIndicators.find((W) => `ci-${W.id}` === C), L = k?.data;
          k && L && Array.isArray(L) && g(L, k.color);
        } else if (C.startsWith("script-") && r?.customIndicators) {
          const k = C.slice(7);
          for (const L of r.customIndicators) {
            if (L.scriptId !== k) continue;
            const W = L.data;
            W && Array.isArray(W) && g(W, L.color);
          }
        }
      }
    }
    let Ft = je;
    if (l?.rsi) {
      const D = Un, i = Ft, j = i + D, g = r?.rsi?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, U, D), e.globalAlpha = 1), e.strokeStyle = ee.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const C = (Y) => i + D - Y / 100 * D, k = r?.rsi?.overbought ?? 70, L = r?.rsi?.oversold ?? 30;
      if (g.showZones) {
        const Y = C(k), oe = C(L), pe = g.zoneOpacity ?? 0.1;
        e.fillStyle = g.overboughtZoneColor || "#ff4444", e.globalAlpha = pe, e.fillRect(0, i, U, Y - i), e.fillStyle = g.oversoldZoneColor || "#44ff44", e.fillRect(0, oe, U, j - oe), e.globalAlpha = 1;
      }
      if (g.showGrid !== !1) {
        const Y = g.gridColor || "rgba(150, 150, 150, 0.3)";
        e.setLineDash([4, 4]), [L, 50, k].forEach((oe) => {
          e.beginPath(), oe === 50 ? (e.strokeStyle = Y, e.lineWidth = 1) : (e.strokeStyle = "rgba(180, 130, 80, 0.8)", e.lineWidth = 1.5);
          const pe = C(oe);
          e.moveTo(0, pe), e.lineTo(U, pe), e.stroke();
        }), e.setLineDash([]), e.lineWidth = 1;
      }
      const W = r?.rsi?.color || "#E74C3C", F = g.lineWidth ?? 1.5;
      e.strokeStyle = W, e.lineWidth = F, e.beginPath();
      let E = !1;
      c.candles.forEach((Y, oe) => {
        const pe = c.startIndex + oe, ke = l.rsi[pe];
        if (!isNaN(ke) && isFinite(ke)) {
          const ne = ge(pe, c.startIndex), we = C(ke);
          E ? e.lineTo(ne, we) : (e.moveTo(ne, we), E = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Ht, e.textAlign = "left", [0, L, 50, k, 100].forEach((Y) => {
        const oe = C(Y);
        e.fillText(Y.toString(), U + 5, oe);
      }), en.current.rsi = { top: i, bottom: j };
      const S = bt.current !== null ? bt.current : c.startIndex + c.candles.length - 1, R = l.rsi[S], P = !isNaN(R) && isFinite(R) ? R.toFixed(2) : "--", $ = `RSI ${r?.rsi?.period || 14} close`, Z = r?.rsi?.style?.customLabel || $, ue = r?.rsi?.style?.labelColor || "#d1d5db";
      e.fillStyle = ue, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left", e.fillText(Z, 5, i + 15), e.fillStyle = W, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
      const z = e.measureText(Z).width;
      e.fillText(P, 13 + z, i + 15), On.current.rsi = 13 + z + e.measureText(P).width + 8, Ft = j;
    }
    if (l?.macd) {
      const D = Un, i = Ft, j = i + D, g = r?.macd?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, U, D), e.globalAlpha = 1), e.strokeStyle = ee.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const C = l.macd.macd.slice(c.startIndex, c.endIndex), k = l.macd.signal.slice(c.startIndex, c.endIndex), L = l.macd.histogram.slice(c.startIndex, c.endIndex), W = [...C, ...k, ...L].filter((kt) => !isNaN(kt) && isFinite(kt)), F = Math.min(...W, 0), S = Math.max(...W, 0) - F || 1, R = (kt) => i + D - (kt - F) / S * D;
      if (g.showGrid !== !1) {
        e.strokeStyle = g.gridColor || ee.grid, e.setLineDash([2, 2]), e.beginPath();
        const kt = R(0);
        e.moveTo(0, kt), e.lineTo(U, kt), e.stroke(), e.setLineDash([]);
      }
      const P = Math.max(2, un * 0.5), $ = r?.macd?.histogramUpColor || "#26a69a", Z = r?.macd?.histogramDownColor || "#ef5350", ue = R(0);
      c.candles.forEach((kt, _n) => {
        const nn = c.startIndex + _n, Ot = l.macd.histogram[nn];
        if (!isNaN(Ot) && isFinite(Ot)) {
          const dn = ge(nn, c.startIndex), Gt = R(Ot), Ps = Math.abs(ue - Gt);
          e.fillStyle = Ot >= 0 ? $ : Z, Ot >= 0 ? e.fillRect(dn - P / 2, Gt, P, Ps) : e.fillRect(dn - P / 2, ue, P, Ps);
        }
      });
      const z = r?.macd?.macdColor || "#3498DB";
      e.strokeStyle = z, e.lineWidth = 1.5, e.beginPath();
      let Y = !1;
      c.candles.forEach((kt, _n) => {
        const nn = c.startIndex + _n, Ot = l.macd.macd[nn];
        if (!isNaN(Ot) && isFinite(Ot)) {
          const dn = ge(nn, c.startIndex), Gt = R(Ot);
          Y ? e.lineTo(dn, Gt) : (e.moveTo(dn, Gt), Y = !0);
        }
      }), e.stroke();
      const oe = r?.macd?.signalColor || "#E67E22";
      e.strokeStyle = oe, e.lineWidth = 1.5, e.beginPath(), Y = !1, c.candles.forEach((kt, _n) => {
        const nn = c.startIndex + _n, Ot = l.macd.signal[nn];
        if (!isNaN(Ot) && isFinite(Ot)) {
          const dn = ge(nn, c.startIndex), Gt = R(Ot);
          Y ? e.lineTo(dn, Gt) : (e.moveTo(dn, Gt), Y = !0);
        }
      }), e.stroke(), en.current.macd = { top: i, bottom: j };
      const pe = `MACD(${r?.macd?.fast || 12},${r?.macd?.slow || 26},${r?.macd?.signal || 9})`, ke = r?.macd?.style?.customLabel || pe, ne = r?.macd?.style?.labelColor || ee.textDim;
      e.fillStyle = ne, e.font = `bold ${Ht}`, e.textAlign = "left";
      const we = bt.current !== null ? bt.current : c.startIndex + c.candles.length - 1, Se = l.macd.macd[we], Ke = l.macd.signal[we], ut = l.macd.histogram[we];
      e.fillText(ke, 5, i + 12), e.fillStyle = z, e.font = Ht;
      const ht = e.measureText(ke).width, Lt = !isNaN(Se) && isFinite(Se) ? Se.toFixed(4) : "--";
      e.fillText(Lt, 10 + ht, i + 12), e.fillStyle = oe;
      const kn = !isNaN(Ke) && isFinite(Ke) ? Ke.toFixed(4) : "--", An = e.measureText(Lt).width;
      e.fillText(kn, 16 + ht + An, i + 12);
      const Rt = !isNaN(ut) && isFinite(ut) ? ut.toFixed(4) : "--";
      e.fillStyle = ut >= 0 ? "#00ff88" : "#ff0080";
      const Et = e.measureText(kn).width;
      e.fillText(Rt, 22 + ht + An + Et, i + 12), On.current.macd = 22 + ht + An + Et + e.measureText(Rt).width + 8, Ft = j;
    }
    if (l?.atr) {
      const D = Un, i = Ft, j = i + D, g = r?.atr?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, U, D), e.globalAlpha = 1), e.strokeStyle = ee.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const C = l.atr.slice(c.startIndex, c.endIndex).filter((pe) => !isNaN(pe) && isFinite(pe)), k = Math.min(...C, 0), W = Math.max(...C) - k || 1, F = (pe) => i + D - (pe - k) / W * D, E = r?.atr?.color || "#17a2b8", S = g.lineWidth ?? 1.5;
      e.strokeStyle = E, e.lineWidth = S, e.beginPath();
      let R = !1;
      c.candles.forEach((pe, ke) => {
        const ne = c.startIndex + ke, we = l.atr[ne];
        if (!isNaN(we) && isFinite(we)) {
          const Se = ge(ne, c.startIndex), Ke = F(we);
          R ? e.lineTo(Se, Ke) : (e.moveTo(Se, Ke), R = !0);
        }
      }), e.stroke(), en.current.atr = { top: i, bottom: j };
      const P = `ATR(${r?.atr?.period || 14})`, $ = r?.atr?.style?.customLabel || P, Z = r?.atr?.style?.labelColor || ee.textDim;
      e.fillStyle = Z, e.font = `bold ${Ht}`, e.textAlign = "left";
      const ue = bt.current !== null ? bt.current : c.startIndex + c.candles.length - 1, z = l.atr[ue], Y = !isNaN(z) && isFinite(z) ? z.toFixed(5) : "--";
      e.fillText($, 5, i + 12), e.fillStyle = E, e.font = Ht;
      const oe = e.measureText($).width;
      e.fillText(Y, 10 + oe, i + 12), On.current.atr = 10 + oe + e.measureText(Y).width + 8, Ft = j;
    }
    if (l?.stochastic) {
      const D = Un, i = Ft, j = i + D, g = r?.stochastic?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, U, D), e.globalAlpha = 1), e.strokeStyle = ee.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const C = (ke) => i + D - ke / 100 * D;
      e.strokeStyle = ee.grid, e.setLineDash([2, 2]), e.beginPath();
      const k = r?.stochastic?.overbought ?? 80, L = r?.stochastic?.oversold ?? 20;
      [L, 50, k].forEach((ke) => {
        const ne = C(ke);
        e.moveTo(0, ne), e.lineTo(U, ne);
      }), e.stroke(), e.setLineDash([]);
      const W = r?.stochastic?.kColor || "#3498DB";
      e.strokeStyle = W, e.lineWidth = 1.5, e.beginPath();
      let F = !1;
      c.candles.forEach((ke, ne) => {
        const we = c.startIndex + ne, Se = l.stochastic.k[we];
        if (!isNaN(Se) && isFinite(Se)) {
          const Ke = ge(we, c.startIndex), ut = C(Se);
          F ? e.lineTo(Ke, ut) : (e.moveTo(Ke, ut), F = !0);
        }
      }), e.stroke();
      const E = r?.stochastic?.dColor || "#E67E22";
      e.strokeStyle = E, e.lineWidth = 1.5, e.beginPath(), F = !1, c.candles.forEach((ke, ne) => {
        const we = c.startIndex + ne, Se = l.stochastic.d[we];
        if (!isNaN(Se) && isFinite(Se)) {
          const Ke = ge(we, c.startIndex), ut = C(Se);
          F ? e.lineTo(Ke, ut) : (e.moveTo(Ke, ut), F = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Ht, e.textAlign = "left", [0, L, 50, k, 100].forEach((ke) => {
        const ne = C(ke);
        e.fillText(ke.toString(), U + 5, ne);
      }), en.current.stochastic = { top: i, bottom: j };
      const S = `STOCH(${r?.stochastic?.kPeriod || 14},${r?.stochastic?.dPeriod || 3})`, R = r?.stochastic?.style?.customLabel || S, P = r?.stochastic?.style?.labelColor || ee.textDim;
      e.fillStyle = P, e.font = `bold ${Ht}`, e.textAlign = "left";
      const $ = bt.current !== null ? bt.current : c.startIndex + c.candles.length - 1, Z = l.stochastic.k[$], ue = l.stochastic.d[$];
      e.fillText(R, 5, i + 12), e.fillStyle = W, e.font = Ht;
      const z = e.measureText(R).width, Y = !isNaN(Z) && isFinite(Z) ? `%K ${Z.toFixed(2)}` : "%K --";
      e.fillText(Y, 10 + z, i + 12), e.fillStyle = E;
      const oe = e.measureText(Y).width, pe = !isNaN(ue) && isFinite(ue) ? `%D ${ue.toFixed(2)}` : "%D --";
      e.fillText(pe, 16 + z + oe, i + 12), On.current.stochastic = 16 + z + oe + e.measureText(pe).width + 8, Ft = j;
    }
    if (l?.williamsR) {
      const D = Un, i = Ft, j = i + D, g = r?.williamsR?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, U, D), e.globalAlpha = 1), e.strokeStyle = ee.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const C = (z) => i + D - (z + 100) / 100 * D, k = r?.williamsR?.overbought ?? -20, L = r?.williamsR?.oversold ?? -80;
      e.setLineDash([4, 4]), e.strokeStyle = g.gridColor || "rgba(180, 130, 80, 0.6)", [L, -50, k].forEach((z) => {
        e.beginPath();
        const Y = C(z);
        e.moveTo(0, Y), e.lineTo(U, Y), e.stroke();
      }), e.setLineDash([]);
      const W = r?.williamsR?.color || "#E91E63";
      e.strokeStyle = W, e.lineWidth = g.lineWidth ?? 1.5, e.beginPath();
      let F = !1;
      c.candles.forEach((z, Y) => {
        const oe = c.startIndex + Y, pe = l.williamsR[oe];
        if (!isNaN(pe) && isFinite(pe)) {
          const ke = ge(oe, c.startIndex), ne = C(pe);
          F ? e.lineTo(ke, ne) : (e.moveTo(ke, ne), F = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Ht, e.textAlign = "left", [-100, L, -50, k, 0].forEach((z) => {
        const Y = C(z);
        e.fillText(z.toString(), U + 5, Y);
      }), en.current.williamsR = { top: i, bottom: j };
      const E = `Williams %R ${r?.williamsR?.period || 14}`, S = r?.williamsR?.style?.customLabel || E, R = r?.williamsR?.style?.labelColor || "#d1d5db";
      e.fillStyle = R, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left";
      const P = bt.current !== null ? bt.current : c.startIndex + c.candles.length - 1, $ = l.williamsR[P], Z = !isNaN($) && isFinite($) ? $.toFixed(2) : "--";
      e.fillText(S, 5, i + 15), e.fillStyle = W;
      const ue = e.measureText(S).width;
      e.fillText(Z, 13 + ue, i + 15), On.current.williamsR = 13 + ue + e.measureText(Z).width + 8, Ft = j;
    }
    if (l?.cci) {
      const D = Un, i = Ft, j = i + D, g = r?.cci?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, U, D), e.globalAlpha = 1), e.strokeStyle = ee.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const C = c.candles.map((oe, pe) => l.cci[c.startIndex + pe]).filter((oe) => !isNaN(oe) && isFinite(oe)), k = C.length > 0 ? Math.max(200, Math.max(...C.map(Math.abs))) : 200, L = (oe) => i + D / 2 - oe / k * (D / 2), W = r?.cci?.overbought ?? 100, F = r?.cci?.oversold ?? -100;
      e.setLineDash([4, 4]), e.strokeStyle = g.gridColor || "rgba(180, 130, 80, 0.6)", [F, 0, W].forEach((oe) => {
        e.beginPath();
        const pe = L(oe);
        e.moveTo(0, pe), e.lineTo(U, pe), e.stroke();
      }), e.setLineDash([]);
      const E = r?.cci?.color || "#00BCD4";
      e.strokeStyle = E, e.lineWidth = g.lineWidth ?? 1.5, e.beginPath();
      let S = !1;
      c.candles.forEach((oe, pe) => {
        const ke = c.startIndex + pe, ne = l.cci[ke];
        if (!isNaN(ne) && isFinite(ne)) {
          const we = ge(ke, c.startIndex), Se = L(ne);
          S ? e.lineTo(we, Se) : (e.moveTo(we, Se), S = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Ht, e.textAlign = "left", [Math.round(-k), F, 0, W, Math.round(k)].forEach((oe) => {
        const pe = L(oe);
        e.fillText(oe.toString(), U + 5, pe);
      }), en.current.cci = { top: i, bottom: j };
      const R = `CCI ${r?.cci?.period || 20}`, P = r?.cci?.style?.customLabel || R, $ = r?.cci?.style?.labelColor || "#d1d5db";
      e.fillStyle = $, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left";
      const Z = bt.current !== null ? bt.current : c.startIndex + c.candles.length - 1, ue = l.cci[Z], z = !isNaN(ue) && isFinite(ue) ? ue.toFixed(2) : "--";
      e.fillText(P, 5, i + 15), e.fillStyle = E;
      const Y = e.measureText(P).width;
      e.fillText(z, 13 + Y, i + 15), On.current.cci = 13 + Y + e.measureText(z).width + 8, Ft = j;
    }
    if (l?.adx) {
      const D = Un, i = Ft, j = i + D;
      e.strokeStyle = ee.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const g = (S) => i + D - S / 100 * D;
      e.setLineDash([4, 4]), e.strokeStyle = "rgba(150, 150, 150, 0.3)", [25, 50, 75].forEach((S) => {
        e.beginPath(), e.moveTo(0, g(S)), e.lineTo(U, g(S)), e.stroke();
      }), e.setLineDash([]);
      const C = r?.adx?.adxColor || "#FFEB3B", k = r?.adx?.plusDIColor || "#22c55e", L = r?.adx?.minusDIColor || "#ef4444";
      e.strokeStyle = k, e.lineWidth = 1, e.beginPath();
      let W = !1;
      c.candles.forEach((S, R) => {
        const P = c.startIndex + R, $ = l.adx.plusDI[P];
        if (!isNaN($) && isFinite($)) {
          const Z = ge(P, c.startIndex), ue = g($);
          W ? e.lineTo(Z, ue) : (e.moveTo(Z, ue), W = !0);
        }
      }), e.stroke(), e.strokeStyle = L, e.beginPath(), W = !1, c.candles.forEach((S, R) => {
        const P = c.startIndex + R, $ = l.adx.minusDI[P];
        if (!isNaN($) && isFinite($)) {
          const Z = ge(P, c.startIndex), ue = g($);
          W ? e.lineTo(Z, ue) : (e.moveTo(Z, ue), W = !0);
        }
      }), e.stroke(), e.strokeStyle = C, e.lineWidth = 2, e.beginPath(), W = !1, c.candles.forEach((S, R) => {
        const P = c.startIndex + R, $ = l.adx.adx[P];
        if (!isNaN($) && isFinite($)) {
          const Z = ge(P, c.startIndex), ue = g($);
          W ? e.lineTo(Z, ue) : (e.moveTo(Z, ue), W = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Ht, [0, 25, 50, 75, 100].forEach((S) => {
        e.fillText(S.toString(), U + 5, g(S));
      });
      const F = bt.current !== null ? bt.current : c.startIndex + c.candles.length - 1, E = l.adx.adx[F];
      e.fillStyle = "#d1d5db", e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.fillText(`ADX ${r?.adx?.period || 14}`, 5, i + 15), e.fillStyle = C, e.fillText(!isNaN(E) && isFinite(E) ? E.toFixed(2) : "--", 73, i + 15), e.fillStyle = k, e.fillText("+DI", 118, i + 15), e.fillStyle = L, e.fillText("-DI", 148, i + 15), On.current.adx = 148 + e.measureText("-DI").width + 8, en.current.adx = { top: i, bottom: j }, Ft = j;
    }
    if (l?.roc) {
      const D = Un, i = Ft, j = i + D;
      e.strokeStyle = ee.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const g = c.candles.map((P, $) => l.roc[c.startIndex + $]).filter((P) => !isNaN(P) && isFinite(P)), C = g.length > 0 ? Math.max(5, Math.max(...g.map(Math.abs))) : 5, k = (P) => i + D / 2 - P / C * (D / 2);
      e.setLineDash([4, 4]), e.strokeStyle = "rgba(150, 150, 150, 0.5)", e.beginPath(), e.moveTo(0, k(0)), e.lineTo(U, k(0)), e.stroke(), e.setLineDash([]);
      const L = r?.roc?.color || "#9C27B0";
      e.strokeStyle = L, e.lineWidth = 1.5, e.beginPath();
      let W = !1;
      c.candles.forEach((P, $) => {
        const Z = c.startIndex + $, ue = l.roc[Z];
        if (!isNaN(ue) && isFinite(ue)) {
          const z = ge(Z, c.startIndex), Y = k(ue);
          W ? e.lineTo(z, Y) : (e.moveTo(z, Y), W = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Ht, [-C, 0, C].forEach((P) => {
        e.fillText(P.toFixed(1) + "%", U + 5, k(P));
      }), e.fillStyle = "#d1d5db", e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
      const F = bt.current !== null ? bt.current : c.startIndex + c.candles.length - 1, E = l.roc[F], S = !isNaN(E) && isFinite(E) ? E.toFixed(2) + "%" : "--";
      e.fillText(`ROC ${r?.roc?.period || 12}`, 5, i + 15), e.fillStyle = L;
      const R = e.measureText(`ROC ${r?.roc?.period || 12}`).width;
      e.fillText(S, 13 + R, i + 15), On.current.roc = 13 + R + e.measureText(S).width + 8, en.current.roc = { top: i, bottom: j }, Ft = j;
    }
    const Fo = {
      ctx: e,
      chartWidth: U,
      subplotHeight: Un,
      visible: c,
      indexToX: ge,
      currentCandleWidth: un,
      subplotLabelFont: Ht,
      hoveredCandleIndex: bt.current,
      colors: { textDim: ee.textDim, grid: ee.grid },
      indicators: r,
      indicatorData: l,
      indicatorBounds: en.current,
      subplotLabelEndX: On.current,
      mainPriceToY: st,
      mainChartHeight: je,
      skipIndicators: O,
      clickedIndicatorKey: St
    };
    if (ju(Fo), Ft = Mu(Fo, Ft), Ru(Fo), wt && wt.length > 0 && c.candles.length > 0) {
      const D = (P) => P ? P.toUpperCase().trim().slice(0, 2) : "??", i = (P) => {
        if (P.datetime) {
          const $ = new Date(P.datetime).getTime();
          if (!isNaN($)) return $;
        }
        if (!P.date) return null;
        try {
          const [$, Z, ue] = P.date.split("-").map(Number);
          if (!P.time) return Date.UTC($, Z - 1, ue, 12, 0);
          const z = P.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
          if (!z) return Date.UTC($, Z - 1, ue, 12, 0);
          let Y = parseInt(z[1]);
          const oe = parseInt(z[2]), pe = z[3]?.toUpperCase();
          return pe === "PM" && Y !== 12 ? Y += 12 : pe === "AM" && Y === 12 && (Y = 0), Date.UTC($, Z - 1, ue, Y, oe);
        } catch {
          return null;
        }
      }, j = [];
      e.save();
      const g = { high: 0, medium: 1, low: 2 }, C = [], k = Date.now();
      for (const P of wt) {
        const $ = i(P);
        if (!$ || $ < k) continue;
        const Z = s.length > 1 ? Math.abs(s[1].time - s[0].time) : 6e4, ue = s[s.length - 1], z = ue && $ > ue.time + Z;
        let Y, oe;
        if (z) {
          const ne = ($ - ue.time) / Z, we = s.length - 1 + ne;
          if (oe = Math.round(we), Y = ge(we, c.startIndex), Y < 0 || Y > U - 10) continue;
        } else {
          let ke = 0, ne = s.length - 1;
          for (oe = -1; ke <= ne; ) {
            const Se = Math.floor((ke + ne) / 2);
            if (s[Se].time === $) {
              oe = Se;
              break;
            }
            s[Se].time < $ ? ke = Se + 1 : ne = Se - 1;
          }
          if (oe === -1) {
            const Se = ke >= 0 && ke < s.length, Ke = ne >= 0 && ne < s.length;
            Se && Ke ? oe = Math.abs(s[ke].time - $) < Math.abs(s[ne].time - $) ? ke : ne : Se ? oe = ke : Ke ? oe = ne : oe = s.length - 1;
          }
          const we = Math.abs(s[oe].time - $);
          if (oe < 0 || we > Z || oe < c.startIndex || oe >= c.endIndex || (Y = ge(oe, c.startIndex), Y < 0 || Y > U)) continue;
        }
        const pe = Pu({ event: P.event || "", country: P.region_code || "" });
        C.push({ x: Y, event: P, impact: pe, ts: $, closestIdx: oe });
      }
      C.sort((P, $) => {
        const Z = g[P.impact] ?? 3, ue = g[$.impact] ?? 3;
        return Z !== ue ? Z - ue : (P.event.event || "").localeCompare($.event.event || "");
      });
      const L = /* @__PURE__ */ new Map();
      for (const P of C) {
        const $ = Math.round(P.x);
        L.has($) || L.set($, []), L.get($).push(P);
      }
      const W = document.documentElement.classList.contains("dark"), F = v - yt, E = 22, S = 32, R = F - E / 2 - 5;
      for (const [P, $] of L) {
        const Z = $[0].x, ue = $[0].impact, z = ue === "high", Y = ue === "low", oe = D($[0].event.region_code), pe = Nu($[0].event.region_code), ke = $.length;
        j.push({
          x: Z,
          y: R,
          event: $[0].event,
          impact: ue,
          ts: $[0].ts,
          groupEvents: $.map((ht) => ({ event: ht.event, impact: ht.impact, ts: ht.ts }))
        });
        const ne = z ? "#dc2626" : Y ? "#22c55e" : "#d97706";
        e.save(), e.shadowColor = W ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.15)", e.shadowBlur = 8, e.shadowOffsetY = 2;
        const we = Z - S / 2, Se = R - E / 2;
        e.fillStyle = W ? "rgba(30, 41, 59, 0.92)" : "rgba(255, 255, 255, 0.95)", e.beginPath(), e.roundRect(we, Se, S, E, 6), e.fill(), e.shadowColor = "transparent", e.shadowBlur = 0, e.strokeStyle = W ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)", e.lineWidth = 1, e.stroke(), e.fillStyle = ne, e.beginPath(), e.roundRect(we, Se, 3, E, [6, 0, 0, 6]), e.fill(), e.restore();
        const Ke = 18, ut = 13;
        if (pe ? e.drawImage(pe, Z - Ke / 2, R - ut / 2, Ke, ut) : (e.font = 'bold 9px -apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif', e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = W ? "#e2e8f0" : "#334155", e.fillText(oe, Z + 1, R)), ke > 1) {
          const ht = we + S - 2, Lt = Se - 2, kn = 7;
          e.beginPath(), e.arc(ht, Lt, kn, 0, Math.PI * 2), e.fillStyle = ne, e.fill(), e.strokeStyle = W ? "#0f172a" : "#ffffff", e.lineWidth = 1.5, e.stroke(), e.font = 'bold 8px -apple-system, BlinkMacSystemFont, "Inter", sans-serif', e.fillStyle = "#ffffff", e.fillText(String(ke), ht, Lt + 0.5);
        }
        e.beginPath(), e.moveTo(Z, R + E / 2), e.lineTo(Z, F), e.strokeStyle = z ? "rgba(220, 38, 38, 0.3)" : Y ? "rgba(34, 197, 94, 0.25)" : "rgba(217, 119, 6, 0.3)", e.lineWidth = 1, e.setLineDash([2, 3]), e.stroke(), e.setLineDash([]);
      }
      e.restore(), Ss.current = j;
    } else
      Ss.current = [];
    if (e.strokeStyle = ee.axisLine || ee.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, v - yt), e.lineTo(m, v - yt), e.stroke(), Oe.versionLabelVisible) {
      const D = Dn === 0 ? 0 : Oe.versionLabelXOffset, i = U + He / 2 + D, j = v - yt / 2 + 1;
      e.save(), e.font = 'bold 11px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = ee.text, e.fillText("v.23", i, j), e.restore();
    }
    if (c.candles.length > 0) {
      const D = un * (1 + _e), i = Math.max(1, Math.floor(80 / D)), j = v - yt, g = j + 16;
      if (e.font = ur, e.textAlign = "center", e.textBaseline = "middle", e.save(), e.beginPath(), e.rect(0, j, U, yt), e.clip(), !c.candles || c.candles.length === 0) {
        e.restore();
        return;
      }
      const C = c.candles[0], k = c.candles[c.candles.length - 1];
      if (!C || !k) {
        e.restore();
        return;
      }
      const L = (/* @__PURE__ */ new Date()).getFullYear(), W = new Date(C.time).getFullYear(), F = new Date(k.time).getFullYear(), E = W !== F, S = W !== L || F !== L, R = c.candles[1], P = R ? R.time - C.time : 6e4, Z = P / 6e4 >= 60;
      let ue = "", z = -1, Y = -1 / 0;
      const oe = 12, pe = (ne, we) => {
        if (Z) {
          const ut = Kn(ne, S || E || we !== z);
          return ut !== ue ? (ue = ut, z = we, ut) : js(ne);
        }
        const Se = Kn(ne, !1);
        return we !== z && z !== -1 ? (z = we, Kn(ne, !0)) : Se !== ue ? (ue = Se, z = we, Kn(ne, S)) : js(ne);
      }, ke = fe.width < 400;
      if (Oe.useFixedTimeAxisLabels) {
        const ne = ke ? Oe.fixedTimeAxisLabelCountSmall : Oe.fixedTimeAxisLabelCount, we = 5, Se = U - we * 2;
        for (let Ke = 0; Ke < ne; Ke++) {
          const ut = we + Se * (Ke + 0.5) / ne, ht = ul(ut, c.startIndex), Lt = Math.round(ht) - c.startIndex, kn = Lt >= 0 && Lt < c.candles.length ? c.candles[Lt] : null, An = kn ? kn.time : C.time + (ht - c.startIndex) * P, Rt = kn ? ge(c.startIndex + Lt, c.startIndex) : ut, Et = new Date(An).getFullYear(), kt = pe(An, Et);
          e.fillStyle = ee.axisLabel, e.fillText(kt, Rt, g);
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
        ], ut = i * P;
        let ht = Ke[Ke.length - 1];
        for (const Rt of Ke)
          if (Rt >= ut) {
            ht = Rt;
            break;
          }
        const Lt = Math.ceil(C.time / ht) * ht, kn = k.time + ht * 25;
        let An = -1;
        for (let Rt = Lt; Rt <= kn; Rt += ht) {
          let Et, kt = Rt;
          if (Rt <= k.time) {
            let Gt = 0, Ps = c.candles.length - 1, xl = Ps;
            for (; Gt <= Ps; ) {
              const Yl = Gt + Ps >> 1;
              c.candles[Yl].time >= Rt ? (xl = Yl, Ps = Yl - 1) : Gt = Yl + 1;
            }
            if (xl === An) continue;
            An = xl, kt = c.candles[xl].time, Et = ge(c.startIndex + xl, c.startIndex);
          } else {
            const Gt = c.startIndex + (c.candles.length - 1) + (Rt - k.time) / P;
            Et = ge(Gt, c.startIndex);
          }
          if (Et < 2 || Et > U - 10) continue;
          const _n = pe(kt, new Date(kt).getFullYear()), nn = e.measureText(_n).width, Ot = Et - nn / 2, dn = Et + nn / 2;
          Ot < Y + oe || dn > U - 10 || Ot < 2 || (e.fillStyle = ee.axisLabel, e.fillText(_n, Et, g), Y = dn);
        }
      }
      e.restore(), (Ys.length > 0 || Rs.length > 0) && (e.save(), Ys.forEach((ne) => {
        e.fillStyle = Do, e.beginPath(), e.roundRect(ne.topOrigin, Bo, ne.bWidth, pl, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.font = Xl, e.fillText(ne.text, ne.topOrigin + ne.bWidth / 2, Bo + pl / 2);
      }), Rs.forEach((ne) => {
        e.fillStyle = Do, e.beginPath(), e.roundRect(Wo, ne.topOrigin, ne.bWidth, pl, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.font = Xl, e.fillText(ne.text, Wo + ne.bWidth / 2, ne.topOrigin + pl / 2);
      }), e.restore());
    }
    const Oo = p.getContext("2d");
    Oo && (Oo.setTransform(1, 0, 0, 1, 0, 0), Oo.drawImage(f, 0, 0)), $n.current = {
      startIndex: Cr,
      candleWidth: un
    }, lt.current && tl.current?.();
  }, [fe, s, n, ae, ee, l, le, Nn, Ts, Ln, js, Kn, fr, Rl, hn, I, r, q, it, wt, ft, St, Gn, vs]);
  In.current = us, o.useEffect(() => {
    qs && (qs.current = () => {
      Ge(!0);
    });
  }, [qs]);
  const Bt = o.useCallback(() => {
    const a = qe.current, p = a?.getContext("2d");
    if (!a || !p) return;
    const m = {
      ctx: p,
      dimensions: fe,
      dpr: hn,
      candles: s,
      colors: ee,
      viewState: ae,
      indicatorData: l,
      indicators: r,
      indicatorHeightRatio: le,
      showOHLC: zn,
      isDesktop: Nl,
      PRICE_AXIS_WIDTH: He,
      TIME_AXIS_HEIGHT: yt,
      PRICE_LABEL_FONT: Ll,
      TIME_LABEL_FONT: ur,
      crosshair: Yt.current,
      isScrolling: lt.current,
      scrollState: {
        startIndex: Re.current.startIndex,
        candleWidth: Re.current.candleWidth
      },
      isDraggingHandle: !!nt.current,
      isHoveredSLTP: !!pn.current,
      sessionControlHovered: ho.current,
      isSyncedUpdate: Gs.current,
      syncedCrosshairTime: As.current ?? void 0,
      hoveredEvent: jn.current || ns.current,
      currentOhlcTextWidth: tr,
      currentBbTextEndX: fo,
      currentMaTextEndX: po,
      currentVwapTextEndX: xo,
      currentVpTextEndX: mo,
      currentVolTextEndX: bo,
      overlayLabelEndXPrev: Hs.current,
      subplotLabelEndXPrev: sr,
      getVisibleCandles: Nn,
      getPriceRange: Ts,
      yToPrice: dr,
      xToIndex: ul,
      indexToX: hr,
      formatPrice: Ln,
      formatTime: js,
      formatDate: Kn,
      callbacks: {
        setOhlcTextWidth: ta,
        setBbTextEndX: sa,
        setMaTextEndX: la,
        setVwapTextEndX: oa,
        setVpTextEndX: ra,
        setVolTextEndX: aa,
        setOverlayLabelEndX: (v) => {
          Hs.current = v, ca(v);
        },
        setSubplotLabelEndX: ia,
        onCrosshairMove: te
      }
    };
    Lu(m);
  }, [fe, s, ae, ee, l, r, le, Nn, Ts, dr, ul, hr, Ln, js, Kn, te, hn, zn, se]);
  o.useEffect(() => {
    Bn.current = Bt;
  }, [Bt]), o.useEffect(() => {
    zt.current = ee?.crosshairStyle || "standard", qe.current && (qe.current.style.cursor = zt.current !== "standard" ? "none" : "crosshair");
  }, [ee?.crosshairStyle]);
  const {
    handleZoomIn: pa,
    handleZoomOut: xa,
    handleResetView: ma,
    handleResetYAxis: ba,
    handleMoveLeft: ga,
    handleMoveRight: va,
    handleYAxisMouseDown: ya,
    handleYAxisTouchStart: ka,
    handleYAxisWheel: ko
  } = Eu({
    minCandleWidth: El,
    maxCandleWidth: Al,
    priceAxisWidth: He,
    timeAxisHeight: yt,
    dimensions: fe,
    candlesLength: s.length,
    disableAutoFollow: Pe,
    livePrice: n ?? null,
    scrollStateRef: Re,
    drawChartRef: In,
    notifyScrollSync: mt,
    getVisibleCandles: Nn,
    getPriceRange: Ts,
    setViewState: At,
    setPriceScale: $t,
    setPriceOffset: jt,
    setFixedPriceCenter: _s,
    setFixedPriceRange: $s,
    setIsScalingYAxis: io,
    fixedPriceCenter: Kt,
    priceScale: Tt,
    priceOffset: Ne,
    viewStateAutoFollowLatest: ae.autoFollowLatest,
    yAxisScaleStartRef: ol,
    priceScaleRef: vn,
    priceOffsetRef: Xn,
    yAxisDebounceRef: Yn
  }), wa = o.useCallback((a) => {
    const p = qe.current;
    if (!p) return;
    const m = p.getBoundingClientRect(), v = a.clientX - m.left, f = a.clientY - m.top;
    if (("ontouchstart" in window || navigator.maxTouchPoints > 0) && !Mn && !Wn && !nt.current)
      return;
    if (Yt.current = { x: v, y: f }, !Wn && !nt.current && r && l) {
      const w = on.current, A = rn.current;
      if (w && A > 0 && f < A) {
        const X = Re.current, u = X.candleWidth * (1 + _e), N = Math.max(0, Math.floor(X.startIndex)), x = N + Math.round(v / u), V = 8, d = (Q) => isNaN(Q) || !isFinite(Q) ? !1 : Math.abs(f - (A - (Q - w.min) / w.range * A)) < V;
        let M = null;
        if (!M && r.movingAverages?.enabled && l.movingAverages) {
          for (const Q of l.movingAverages)
            if (x >= 0 && x < Q.data.length && d(Q.data[x])) {
              M = "movingAverages";
              break;
            }
        }
        if (!M && r.bollinger?.enabled && l.bollinger) {
          const Q = l.bollinger;
          x >= 0 && x < Q.upper.length && (d(Q.upper[x]) || d(Q.middle[x]) || d(Q.lower[x])) && (M = "bollinger");
        }
        if (!M && r.vwap?.enabled && l.vwap && x >= 0 && x < l.vwap.length && d(l.vwap[x]) && (M = "vwap"), !M && r.supertrend?.enabled && l.supertrend && x >= 0 && x < l.supertrend.length && l.supertrend[x] && d(l.supertrend[x].value) && (M = "supertrend"), !M && r.ichimoku?.enabled && l.ichimoku) {
          const Q = l.ichimoku;
          x >= 0 && x < Q.tenkan.length && (d(Q.tenkan[x]) || d(Q.kijun[x]) || d(Q.senkouA[x]) || d(Q.senkouB[x])) && (M = "ichimoku");
        }
        if (!M && r.keltner?.enabled && l.keltner) {
          const Q = l.keltner;
          x >= 0 && x < Q.upper.length && (d(Q.upper[x]) || d(Q.middle[x]) || d(Q.lower[x])) && (M = "keltner");
        }
        if (!M && r.donchian?.enabled && l.donchian) {
          const Q = l.donchian;
          x >= 0 && x < Q.upper.length && (d(Q.upper[x]) || d(Q.middle[x]) || d(Q.lower[x])) && (M = "donchian");
        }
        if (!M && r.envelopes?.enabled && l.envelopes) {
          const Q = l.envelopes;
          x >= 0 && x < Q.upper.length && (d(Q.upper[x]) || d(Q.basis[x]) || d(Q.lower[x])) && (M = "envelopes");
        }
        if (!M && r?.volume?.enabled && A > 0 && f >= A * 0.8 && f <= A) {
          const Q = x - N, Be = Nn();
          if (Q >= 0 && Q < Be.candles.length) {
            const G = Be.candles[Q].volume ?? 0;
            if (G > 0) {
              const Ie = A * 0.2, ze = A, We = Be.candles.map((Ve) => Ve.volume ?? 0).filter((Ve) => Ve > 0), ie = We.length > 0 ? Math.max(...We) : 1, Te = G / ie * Ie * 0.95, Je = ze - Te;
              f >= Je && (M = "volume");
            }
          }
        }
        const ce = fe.width - He;
        if (!M && r?.volumeProfile?.enabled && A > 0 && v >= ce * (1 - (r.volumeProfile.rowWidth ?? 15) / 100)) {
          const Q = Nn();
          if (Q.candles.length > 0) {
            const Be = r.volumeProfile.numberOfRows ?? 48, G = ce * ((r.volumeProfile.rowWidth ?? 15) / 100), Ie = r.volumeProfile.lookbackBars ?? 0, ze = Ie > 0 ? Q.candles.slice(-Ie) : Q.candles;
            let We = 1 / 0, ie = -1 / 0;
            ze.forEach((Ve) => {
              We = Math.min(We, Ve.low), ie = Math.max(ie, Ve.high);
            });
            const Te = (ie - We || 1) / Be, Je = on.current;
            if (Je && Je.range > 0) {
              const Ve = Je.max - f / A * Je.range, Wt = Math.floor((Ve - We) / Te);
              if (Wt >= 0 && Wt < Be) {
                const yn = new Float64Array(Be);
                ze.forEach((Mt) => {
                  if (!(!Mt.volume || Mt.volume <= 0))
                    for (let fs = 0; fs < Be; fs++) {
                      const hl = We + fs * Te, _l = hl + Te;
                      if (Mt.high >= hl && Mt.low <= _l) {
                        const jo = Math.max(Mt.low, hl), Mo = Math.min(Mt.high, _l), Ro = Mt.high - Mt.low > 0 ? (Mo - jo) / (Mt.high - Mt.low) : 1;
                        yn[fs] += Mt.volume * Ro;
                      }
                    }
                });
                let Ut = 0;
                for (let Mt = 0; Mt < Be; Mt++)
                  yn[Mt] > Ut && (Ut = yn[Mt]);
                const Ol = yn[Wt];
                if (Ol > 0 && Ut > 0) {
                  const Mt = Ol / Ut * G, fs = ce - Mt;
                  v >= fs && (M = "volumeProfile");
                }
              }
            }
          }
        }
        if (!M && r.customIndicators) {
          const Be = (G) => isNaN(G) || !isFinite(G) ? !1 : Math.abs(f - (A - (G - w.min) / w.range * A)) < 14;
          for (const G of r.customIndicators) {
            const Ie = G.data;
            if (!(!G.enabled || G.display !== "overlay" || !Ie) && x >= 0 && x < Ie.length && Be(Ie[x])) {
              const ze = G.scriptId;
              M = typeof G.expression == "string" && G.expression.startsWith("brue:") && ze ? `script-${ze}` : `ci-${G.id}`;
              break;
            }
          }
        }
        if (!M) {
          const Q = en.current, Be = [];
          if (r.rsi?.enabled && l.rsi) {
            const G = Q.rsi;
            Be.push({ key: "sp-rsi", check: () => {
              if (!G || f < G.top || f > G.bottom || x < 0 || x >= l.rsi.length) return !1;
              const Ie = l.rsi[x];
              if (isNaN(Ie) || !isFinite(Ie)) return !1;
              const ze = G.bottom - G.top;
              return Math.abs(f - (G.top + ze - Ie / 100 * ze)) < V;
            } });
          }
          if (r.macd?.enabled && l.macd) {
            const G = Q.macd;
            Be.push({ key: "sp-macd", check: () => !(!G || f < G.top || f > G.bottom) });
          }
          if (r.stochastic?.enabled && l.stochastic) {
            const G = Q.stochastic;
            Be.push({ key: "sp-stochastic", check: () => {
              if (!G || f < G.top || f > G.bottom || x < 0 || x >= l.stochastic.k.length) return !1;
              const Ie = G.bottom - G.top, ze = G.top + Ie - l.stochastic.k[x] / 100 * Ie, We = G.top + Ie - l.stochastic.d[x] / 100 * Ie;
              return Math.abs(f - ze) < V || Math.abs(f - We) < V;
            } });
          }
          if (r.atr?.enabled && l.atr) {
            const G = Q.atr;
            Be.push({ key: "sp-atr", check: () => !(!G || f < G.top || f > G.bottom) });
          }
          for (const G of Be)
            if (G.check()) {
              M = G.key;
              break;
            }
        }
        const Ae = Is.current;
        if (Is.current = M, M !== Ae && qe.current) {
          const Q = zt.current !== "standard" ? "none" : "crosshair";
          qe.current.style.cursor = M ? "pointer" : Q;
        }
      } else if (Is.current && (Is.current = null, qe.current && !or.current)) {
        const X = zt.current !== "standard" ? "none" : "crosshair";
        qe.current.style.cursor = X;
      }
    }
    const O = rn.current, H = fe.height;
    if (O > 0 && qe.current) {
      if (f > O && f < H - 30)
        qe.current.style.cursor = "pointer";
      else if (f <= O && !Is.current && !or.current) {
        const w = zt.current !== "standard" ? "none" : "crosshair";
        qe.current.style.cursor = w;
      }
    }
    let K = !1;
    for (const w of Ss.current) {
      const A = v - w.x, X = f - w.y;
      if (Math.sqrt(A * A + X * X) < 16) {
        ns.current = w, K = !0, qe.current && (qe.current.style.cursor = "pointer");
        break;
      }
    }
    if (K || (ns.current = null), nt.current) {
      const w = on.current, A = rn.current;
      if (w && w.range > 0 && A > 0) {
        const X = w.max - f / A * w.range;
        nt.current === "sl" ? at.current = X : dt.current = X, qe.current && (qe.current.style.cursor = y), gn.current === null && (gn.current = requestAnimationFrame(() => {
          Ge(!1), gn.current = null;
        }));
        return;
      }
    }
    if (Ye && Ye.length > 0) {
      const w = on.current, A = rn.current;
      if (w && w.range > 0 && A > 0) {
        let X = !1;
        for (const u of Ye) {
          const N = (w.max - u.price) / w.range * A;
          if (v <= 160 && Math.abs(f - N) < 12) {
            X = !0;
            break;
          }
          if (u.id === $e.current) {
            const V = Math.min(N + 10, A - 22 - 4), d = fe.width - He, M = 144 + 5 * 2, ce = (d - M) / 2;
            if (v >= ce - 8 && v <= ce + M + 8 && f >= V - 8 && f <= V + 22 + 8) {
              X = !0;
              break;
            }
          }
        }
        X && qe.current && (qe.current.style.cursor = "pointer");
      }
    }
    if ($e.current && Ye && Ye.length > 0) {
      const w = on.current, A = rn.current;
      if (w && w.range > 0 && A > 0) {
        const X = w.max - f / A * w.range, u = w.range * 0.012, N = Ye.find((x) => x.id === $e.current);
        if (N) {
          const x = N.side === "buy", V = Qn(N.price), d = at.current ?? N.stopLoss ?? (x ? N.price - V : N.price + V), M = dt.current ?? N.takeProfit ?? (x ? N.price + V : N.price - V), ce = Math.abs(X - d) < u, Ae = Math.abs(X - M) < u;
          if (ce || Ae)
            qe.current && (qe.current.style.cursor = co), pn.current = ce ? "sl" : "tp", Ge(!1);
          else if (pn.current && (pn.current = null, Ge(!1)), qe.current) {
            const Q = zt.current !== "standard" ? "none" : "crosshair";
            qe.current.style.cursor !== Q && (qe.current.style.cursor = Q);
          }
        }
      }
    }
    if (Wn) {
      if (a.buttons === 0) {
        ss(!1), It(!1);
        return;
      }
      It(!0);
      const w = v - xn.x, A = f - xn.y, X = ae.candleWidth * (1 + _e), u = w / X, N = Math.max(
        0,
        Math.min(s.length - 10, xn.startIndex - u)
      );
      if (Re.current = {
        startIndex: N,
        candleWidth: ae.candleWidth
      }, cs && tt !== null) {
        const x = tt / vn.current / (fe.height - yt), V = A * x;
        Xn.current = xn.priceOffset + V;
      }
      Fn.current === null && (Fn.current = requestAnimationFrame(() => {
        Ge(!0), Bt(), mt(), Fn.current = null;
      })), gt.current && clearTimeout(gt.current), gt.current = setTimeout(() => {
        const x = Re.current;
        At((V) => ({
          ...V,
          startIndex: x.startIndex,
          // Keep float precision - no rounding
          autoFollowLatest: !1
        })), cs && jt(Xn.current), It(!1);
      }, 100);
      return;
    }
    const _ = Nn(), b = ul(v, _.startIndex);
    b >= 0 && b < s.length ? bt.current = b : bt.current = null, Bt();
  }, [Wn, xn, ae.candleWidth, s.length, cs, tt, Tt, fe.height, Bt, Mn, Nn, ul, s]), Sa = o.useCallback((a) => {
    const p = qe.current;
    if (!p) return;
    const m = p.getBoundingClientRect(), v = a.clientX - m.left, f = a.clientY - m.top;
    let e = !1;
    for (const _ of Ss.current) {
      const b = v - _.x, w = f - _.y;
      if (Math.sqrt(b * b + w * w) < 16) {
        e = !0, jn.current && jn.current.ts === _.ts && jn.current.x === _.x ? jn.current = null : jn.current = _, Bn.current && Bn.current();
        return;
      }
    }
    if (jn.current && !e && (jn.current = null, Bn.current && Bn.current()), zn && r) {
      const _ = [
        { key: "bollinger", title: "BB", enabledCheck: () => !!(r?.bollinger?.enabled && l?.bollinger), endXSource: () => fo },
        { key: "movingAverages", title: "MA", enabledCheck: () => !!(r?.movingAverages?.enabled && l?.movingAverages), endXSource: () => po },
        { key: "vwap", title: "VWAP", enabledCheck: () => !!(r?.vwap?.enabled && l?.vwap), endXSource: () => xo },
        { key: "ichimoku", title: "Ichimoku", enabledCheck: () => !!(r?.ichimoku?.enabled && l?.ichimoku), endXSource: () => rt.ichimoku || 0 },
        { key: "keltner", title: "Keltner", enabledCheck: () => !!(r?.keltner?.enabled && l?.keltner), endXSource: () => rt.keltner || 0 },
        { key: "volumeProfile", title: "Vol Profile", enabledCheck: () => !!r?.volumeProfile?.enabled, endXSource: () => mo },
        { key: "volume", title: "Volume", enabledCheck: () => !!(r?.volume?.enabled && s.some((w) => w.volume)), endXSource: () => bo },
        { key: "supertrend", title: "Supertrend", enabledCheck: () => !!(r?.supertrend?.enabled && l?.supertrend), endXSource: () => rt.supertrend || 0 },
        { key: "donchian", title: "Donchian", enabledCheck: () => !!(r?.donchian?.enabled && l?.donchian), endXSource: () => rt.donchian || 0 },
        { key: "envelopes", title: "Envelopes", enabledCheck: () => !!(r?.envelopes?.enabled && l?.envelopes), endXSource: () => rt.envelopes || 0 },
        // Phase 2 overlays
        { key: "alma", title: "ALMA", enabledCheck: () => !!(r?.alma?.enabled && l?.alma), endXSource: () => rt.alma || 0 },
        { key: "kama", title: "KAMA", enabledCheck: () => !!(r?.kama?.enabled && l?.kama), endXSource: () => rt.kama || 0 },
        { key: "zlema", title: "ZLEMA", enabledCheck: () => !!(r?.zlema?.enabled && l?.zlema), endXSource: () => rt.zlema || 0 },
        { key: "t3", title: "T3", enabledCheck: () => !!(r?.t3?.enabled && l?.t3), endXSource: () => rt.t3 || 0 },
        { key: "lsma", title: "LSMA", enabledCheck: () => !!(r?.lsma?.enabled && l?.lsma), endXSource: () => rt.lsma || 0 },
        { key: "mcginley", title: "McGinley", enabledCheck: () => !!(r?.mcginley?.enabled && l?.mcginley), endXSource: () => rt.mcginley || 0 },
        { key: "wma", title: "WMA", enabledCheck: () => !!(r?.wma?.enabled && l?.wma), endXSource: () => rt.wma || 0 },
        { key: "smmaOverlay", title: "SMMA", enabledCheck: () => !!(r?.smmaOverlay?.enabled && l?.smmaOverlay), endXSource: () => rt.smmaOverlay || 0 },
        { key: "vwma", title: "VWMA", enabledCheck: () => !!(r?.vwma?.enabled && l?.vwma), endXSource: () => rt.vwma || 0 },
        { key: "medianPrice", title: "Median", enabledCheck: () => !!(r?.medianPrice?.enabled && l?.medianPrice), endXSource: () => rt.medianPrice || 0 },
        { key: "typicalPrice", title: "Typical", enabledCheck: () => !!(r?.typicalPrice?.enabled && l?.typicalPrice), endXSource: () => rt.typicalPrice || 0 },
        { key: "weightedClose", title: "WClose", enabledCheck: () => !!(r?.weightedClose?.enabled && l?.weightedClose), endXSource: () => rt.weightedClose || 0 },
        { key: "zigzag", title: "ZigZag", enabledCheck: () => !!(r?.zigzag?.enabled && l?.zigzag), endXSource: () => rt.zigzag || 0 },
        { key: "alligator", title: "Alligator", enabledCheck: () => !!(r?.alligator?.enabled && l?.alligator), endXSource: () => rt.alligator || 0 },
        { key: "priceChannel", title: "Price Ch", enabledCheck: () => !!(r?.priceChannel?.enabled && l?.priceChannel), endXSource: () => rt.priceChannel || 0 },
        { key: "chandeKroll", title: "Chande Kroll", enabledCheck: () => !!(r?.chandeKroll?.enabled && l?.chandeKroll), endXSource: () => rt.chandeKroll || 0 },
        { key: "chandelierExit", title: "Chandelier", enabledCheck: () => !!(r?.chandelierExit?.enabled && l?.chandelierExit), endXSource: () => rt.chandelierExit || 0 },
        { key: "accBands", title: "Acc Bands", enabledCheck: () => !!(r?.accBands?.enabled && l?.accBands), endXSource: () => rt.accBands || 0 },
        { key: "demarkPivots", title: "DeMark", enabledCheck: () => !!(r?.demarkPivots?.enabled && l?.demarkPivots), endXSource: () => rt.demarkPivots || 0 },
        { key: "fractals", title: "Fractals", enabledCheck: () => !!(r?.fractals?.enabled && l?.fractals), endXSource: () => rt.fractals || 0 }
      ];
      let b = 28;
      for (const w of _) {
        if (!w.enabledCheck()) continue;
        const A = fe.width < 500 ? 14 : 19, X = w.endXSource();
        if (w.key === "movingAverages" && l?.movingAverages?.length > 0) {
          const N = r.movingAverages?.lines ?? [], x = r?.customBrueScripts || {};
          let V = 0;
          for (let d = 0; d < l.movingAverages.length; d++) {
            const M = N[d]?.sourceScriptId;
            if (M && x[M]?.enabled) continue;
            const ce = b + V * A - 10, Ae = ce + A;
            if (X > 0 && v >= 0 && v <= X && f >= ce && f <= Ae) {
              const Q = `movingAverages__${d}`;
              de((Be) => Be === Q ? null : Q), ve(Q);
              return;
            }
            V++;
          }
          b += V * A;
          continue;
        }
        const u = A;
        if (X > 0 && v >= 0 && v <= X && f >= b - 10 && f <= b - 10 + u) {
          de((N) => N === w.key ? null : w.key), ve(w.key);
          return;
        }
        b += u;
      }
    }
    if (r && l) {
      const _ = on.current, b = rn.current;
      if (_ && b > 0) {
        const w = Re.current, A = w.candleWidth * (1 + _e);
        fe.width - He;
        const u = Math.max(0, Math.floor(w.startIndex)) + Math.round(v / A), N = 8, x = (d) => {
          if (isNaN(d) || !isFinite(d)) return !1;
          const M = b - (d - _.min) / _.range * b;
          return Math.abs(f - M) < N;
        };
        if (r.movingAverages?.enabled && l.movingAverages)
          for (let d = 0; d < l.movingAverages.length; d++) {
            const M = l.movingAverages[d];
            if (u >= 0 && u < M.data.length && x(M.data[u])) {
              const ce = `movingAverages__${d}`;
              de((Ae) => Ae === ce ? null : ce), ve(ce);
              return;
            }
          }
        if (r.bollinger?.enabled && l.bollinger) {
          const d = l.bollinger;
          if (u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.middle[u]) || x(d.lower[u]))) {
            de((M) => M === "bollinger" ? null : "bollinger"), ve("bollinger");
            return;
          }
        }
        if (r.vwap?.enabled && l.vwap && u >= 0 && u < l.vwap.length && x(l.vwap[u])) {
          de((d) => d === "vwap" ? null : "vwap"), ve("vwap");
          return;
        }
        if (r.supertrend?.enabled && l.supertrend && u >= 0 && u < l.supertrend.length) {
          const d = l.supertrend[u];
          if (d && x(d.value)) {
            de((M) => M === "supertrend" ? null : "supertrend"), ve("supertrend");
            return;
          }
        }
        if (r.ichimoku?.enabled && l.ichimoku) {
          const d = l.ichimoku;
          if (u >= 0 && u < d.tenkan.length && (x(d.tenkan[u]) || x(d.kijun[u]) || x(d.senkouA[u]) || x(d.senkouB[u]))) {
            de((M) => M === "ichimoku" ? null : "ichimoku"), ve("ichimoku");
            return;
          }
        }
        if (r.keltner?.enabled && l.keltner) {
          const d = l.keltner;
          if (u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.middle[u]) || x(d.lower[u]))) {
            de((M) => M === "keltner" ? null : "keltner"), ve("keltner");
            return;
          }
        }
        if (r.donchian?.enabled && l.donchian) {
          const d = l.donchian;
          if (u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.middle[u]) || x(d.lower[u]))) {
            de((M) => M === "donchian" ? null : "donchian"), ve("donchian");
            return;
          }
        }
        if (r.envelopes?.enabled && l.envelopes) {
          const d = l.envelopes;
          if (u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.basis[u]) || x(d.lower[u]))) {
            de((M) => M === "envelopes" ? null : "envelopes"), ve("envelopes");
            return;
          }
        }
        const V = ["dema", "tema", "hma"];
        for (const d of V)
          if (r[d]?.enabled && l[d]) {
            const M = l[d];
            if (Array.isArray(M) && u >= 0 && u < M.length && x(M[u])) {
              de((ce) => ce === d ? null : d), ve(d);
              return;
            }
          }
      }
    }
    if (r?.volume?.enabled) {
      const _ = rn.current;
      if (_ > 0 && f >= _ * 0.8 && f <= _) {
        de((b) => b === "volume" ? null : "volume"), ve("volume");
        return;
      }
    }
    if (Is.current === "volumeProfile") {
      de((_) => _ === "volumeProfile" ? null : "volumeProfile"), ve("volumeProfile");
      return;
    }
    const O = Is.current;
    if (O && (O.startsWith("ci-") || O.startsWith("script-"))) {
      de((_) => _ === O ? null : O), ve(O);
      return;
    }
    const H = en.current, K = [
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
        de((A) => A === w ? null : w), ve(w);
        return;
      }
    }
    if (r && l) {
      const _ = Re.current, b = _.candleWidth * (1 + _e), w = Math.max(0, Math.floor(_.startIndex)), A = w + Math.round(v / b), X = 10, u = (x, V) => {
        if (!V) return !1;
        const d = H[x];
        if (!d || f < d.top || f > d.bottom || A < 0 || A >= V.length) return !1;
        const M = V[A];
        if (isNaN(M) || !isFinite(M)) return !1;
        const ce = d.bottom - d.top, Ae = d.top + ce - M / 100 * ce;
        return Math.abs(f - Ae) < X;
      }, N = (x, V) => {
        const d = H[x];
        if (!d || f < d.top || f > d.bottom) return !1;
        const M = d.bottom - d.top;
        let ce = 1 / 0, Ae = -1 / 0;
        const Q = fe.width - He, Be = Math.floor(Q / b), G = Math.max(0, w), Ie = Math.min(G + Be, V[0]?.length ?? 0);
        for (const Te of V)
          if (Te)
            for (let Je = G; Je < Ie; Je++) {
              const Ve = Te[Je];
              !isNaN(Ve) && isFinite(Ve) && (Ve < ce && (ce = Ve), Ve > Ae && (Ae = Ve));
            }
        if (ce >= Ae) return !1;
        const We = (Ae - ce) * 0.1;
        ce -= We, Ae += We;
        const ie = Ae - ce;
        if (A < 0) return !1;
        for (const Te of V) {
          if (!Te || A >= Te.length) continue;
          const Je = Te[A];
          if (isNaN(Je) || !isFinite(Je)) continue;
          const Ve = d.top + M - (Je - ce) / ie * M;
          if (Math.abs(f - Ve) < X) return !0;
        }
        return !1;
      };
      if (r.rsi?.enabled && u("rsi", l.rsi)) {
        de((x) => x === "sp-rsi" ? null : "sp-rsi"), ve("sp-rsi");
        return;
      }
      if (r.stochastic?.enabled && l.stochastic && (u("stochastic", l.stochastic.k) || u("stochastic", l.stochastic.d))) {
        de((x) => x === "sp-stochastic" ? null : "sp-stochastic"), ve("sp-stochastic");
        return;
      }
      if (r.macd?.enabled && l.macd && N("macd", [l.macd.macd, l.macd.signal])) {
        de((x) => x === "sp-macd" ? null : "sp-macd"), ve("sp-macd");
        return;
      }
      if (r.atr?.enabled && l.atr && N("atr", [l.atr])) {
        de((x) => x === "sp-atr" ? null : "sp-atr"), ve("sp-atr");
        return;
      }
      if (r.williamsR?.enabled && l.williamsR) {
        const x = H.williamsR;
        if (x && f >= x.top && f <= x.bottom && A >= 0 && A < l.williamsR.length) {
          const V = l.williamsR[A];
          if (!isNaN(V) && isFinite(V)) {
            const d = x.bottom - x.top, M = x.top + d - (V + 100) / 100 * d;
            if (Math.abs(f - M) < X) {
              de((ce) => ce === "sp-williamsR" ? null : "sp-williamsR"), ve("sp-williamsR");
              return;
            }
          }
        }
      }
      if (r.cci?.enabled && l.cci && N("cci", [l.cci])) {
        de((x) => x === "sp-cci" ? null : "sp-cci"), ve("sp-cci");
        return;
      }
      if (r.adx?.enabled && l.adx && (u("adx", l.adx.adx) || u("adx", l.adx.plusDI) || u("adx", l.adx.minusDI))) {
        de((x) => x === "sp-adx" ? null : "sp-adx"), ve("sp-adx");
        return;
      }
      if (r.roc?.enabled && l.roc && N("roc", [l.roc])) {
        de((x) => x === "sp-roc" ? null : "sp-roc"), ve("sp-roc");
        return;
      }
      if (r.aroon?.enabled && l.aroon && (u("aroon", l.aroon.up) || u("aroon", l.aroon.down))) {
        de((x) => x === "sp-aroon" ? null : "sp-aroon"), ve("sp-aroon");
        return;
      }
      if (r.tsi?.enabled && l.tsi && N("tsi", [l.tsi.tsi, l.tsi.signal])) {
        de((x) => x === "sp-tsi" ? null : "sp-tsi"), ve("sp-tsi");
        return;
      }
      if (r.trix?.enabled && l.trix && N("trix", [l.trix.trix, l.trix.signal])) {
        de((x) => x === "sp-trix" ? null : "sp-trix"), ve("sp-trix");
        return;
      }
      if (r.kst?.enabled && l.kst && N("kst", [l.kst.kst, l.kst.signal])) {
        de((x) => x === "sp-kst" ? null : "sp-kst"), ve("sp-kst");
        return;
      }
      if (r.stochRsi?.enabled && l.stochRsi && (u("stochRsi", l.stochRsi.k) || u("stochRsi", l.stochRsi.d))) {
        de((x) => x === "sp-stochRsi" ? null : "sp-stochRsi"), ve("sp-stochRsi");
        return;
      }
      for (const x of K) {
        const V = H[x];
        if (V && f >= V.top && f <= V.bottom) {
          const d = l[x];
          if (d && Array.isArray(d) && N(x, [d])) {
            const M = `sp-${x}`;
            de((ce) => ce === M ? null : M), ve(M);
            return;
          }
        }
      }
    }
    if (al && Vs(null), St && de(null), Pn && vt(null), Ye && Ye.length > 0 && Date.now() - Js.current > 500) {
      const _ = on.current, b = rn.current;
      if (_ && _.range > 0 && b > 0) {
        const w = _.max - f / b * _.range, A = _.range * 6e-3;
        if ($e.current) {
          const u = Ye.find((N) => N.id === $e.current);
          if (u) {
            const N = (_.max - u.price) / _.range * b, x = 22, V = Math.min(N + 10, b - x - 4), d = 5, M = 45, ce = 55, Ae = 44, Q = fe.width - He, Be = M + ce + Ae + d * 2, Ie = (Q - Be) / 2, ze = Ie + M + d, We = ze + ce + d, ie = 8;
            if (v >= Ie - ie && v <= Ie + M + ie && f >= V - ie && f <= V + x + ie) {
              if (Xt) {
                const Te = u.side === "buy", Je = Qn(u.price), Ve = at.current ?? u.stopLoss ?? (Te ? u.price - Je : u.price + Je), Wt = dt.current ?? u.takeProfit ?? (Te ? u.price + Je : u.price - Je);
                Xt($e.current, Ve, Wt);
              }
              $e.current = null, at.current = null, dt.current = null, nt.current = null, _t((Te) => Te + 1), Ge(!1);
              return;
            }
            if (v >= ze - ie && v <= ze + ce + ie && f >= V - ie && f <= V + x + ie) {
              $e.current = null, at.current = null, dt.current = null, nt.current = null, _t((Te) => Te + 1), Ge(!1);
              return;
            }
            if (v >= We - ie && v <= We + Ae + ie && f >= V - ie && f <= V + x + ie) {
              Zt && Zt($e.current), $e.current = null, at.current = null, dt.current = null, nt.current = null, _t((Te) => Te + 1), Ge(!1);
              return;
            }
          }
        }
        if ($e.current) {
          const u = Ye.find((N) => N.id === $e.current);
          if (u) {
            const N = u.side === "buy", x = Qn(u.price), V = at.current ?? u.stopLoss ?? (N ? u.price - x : u.price + x), d = dt.current ?? u.takeProfit ?? (N ? u.price + x : u.price - x);
            if (Math.abs(w - V) < A) {
              nt.current = "sl", at.current = V;
              return;
            }
            if (Math.abs(w - d) < A) {
              nt.current = "tp", dt.current = d;
              return;
            }
          }
        }
        let X = null;
        for (const u of Ye)
          if (Math.abs(w - u.price) < A) {
            X = u.id;
            break;
          }
        if (X) {
          if ($e.current === X)
            $e.current = null, at.current = null, dt.current = null;
          else {
            $e.current = X;
            const u = Ye.find((N) => N.id === X);
            at.current = u?.stopLoss ?? null, dt.current = u?.takeProfit ?? null;
          }
          nt.current = null, _t((u) => u + 1), Ge(!1);
          return;
        }
      }
    }
    ss(!0), ll({ x: v, y: f, startIndex: ae.startIndex, priceOffset: Ne });
  }, [ae.startIndex, Ne, al, St, Pn, Ye, Xt, Zt, Qt]), wo = o.useCallback(() => {
    if (nt.current && $e.current) {
      nt.current = null, qe.current && (qe.current.style.cursor = zt.current !== "standard" ? "none" : "crosshair"), Ge(!1);
      return;
    }
    if (lt.current) {
      It(!1);
      const a = Re.current;
      if (Ge(!1), Pe) {
        const p = fe.width - He, m = ae.candleWidth * (1 + _e), v = Math.floor(p / m), f = a.startIndex + v, e = s.length - 1 < f;
        Vn.current = !e;
      }
      At((p) => ({
        ...p,
        startIndex: a.startIndex,
        // Keep float precision - no rounding
        autoFollowLatest: !1
      }));
    }
    Fn.current !== null && (cancelAnimationFrame(Fn.current), Fn.current = null), ss(!1);
  }, [Xt, Zt]);
  o.useEffect(() => {
    if (!Wn) return;
    const a = () => {
      wo();
    };
    return window.addEventListener("mouseup", a), () => {
      window.removeEventListener("mouseup", a);
    };
  }, [Wn, wo]), o.useEffect(() => {
    const a = (p) => {
      $e.current && (p.key === "Enter" ? (p.preventDefault(), Xt && Xt($e.current, at.current ?? void 0, dt.current ?? void 0), $e.current = null, at.current = null, dt.current = null, nt.current = null, _t((m) => m + 1), Ge(!1)) : (p.key === "Escape" || p.key === "Backspace") && (p.preventDefault(), $e.current = null, at.current = null, dt.current = null, nt.current = null, _t((m) => m + 1), Ge(!1)));
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [Xt, Zt]), o.useEffect(() => {
    const a = (p) => {
      if (!St || !r || !re) return;
      const m = p.target?.tagName;
      if (!(m === "INPUT" || m === "TEXTAREA" || m === "SELECT"))
        if (p.key === "Backspace" || p.key === "Delete") {
          p.preventDefault();
          const v = St.startsWith("sp-") ? St.replace("sp-", "") : St.startsWith("movingAverages__") ? "movingAverages" : St, f = r[v];
          f && re({ ...r, [v]: { ...f, enabled: !1 } }), de(null);
        } else p.key === "Escape" && de(null);
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [St, r, re]);
  const Ca = o.useCallback(() => {
    pt.current && clearTimeout(pt.current), pt.current = setTimeout(() => {
      if (tn.current) return;
      Yt.current = null, bt.current = null, ns.current = null;
      const a = qe.current, p = a?.getContext("2d");
      p && a && p.clearRect(0, 0, a.width, a.height), Bn.current && Bn.current(), us(), ss(!1), io(!1), te && te(null, null);
    }, 50);
  }, [te, us]);
  o.useEffect(() => {
    if (!Jo && !er) return;
    const a = (v) => {
      const e = (ol.current.y - v.clientY) / 150, O = Math.max(0.1, Math.min(10, ol.current.scale + e));
      vn.current = O, Ge(!0), mt(), Yn.current && clearTimeout(Yn.current), Yn.current = setTimeout(() => {
        $t(vn.current);
      }, 100);
    }, p = () => {
      io(!1), Jr(!1), $t(vn.current), mt();
    }, m = (v) => {
      if (v.touches.length !== 1) return;
      v.preventDefault();
      const e = (ol.current.y - v.touches[0].clientY) / 150, O = Math.max(0.1, Math.min(10, ol.current.scale + e));
      vn.current = O, Ge(!0), mt(), Yn.current && clearTimeout(Yn.current), Yn.current = setTimeout(() => {
        $t(vn.current);
      }, 100);
    };
    return window.addEventListener("mousemove", a), window.addEventListener("mouseup", p), window.addEventListener("touchmove", m, { passive: !1 }), window.addEventListener("touchend", p), window.addEventListener("touchcancel", p), () => {
      window.removeEventListener("mousemove", a), window.removeEventListener("mouseup", p), window.removeEventListener("touchmove", m), window.removeEventListener("touchend", p), window.removeEventListener("touchcancel", p);
    };
  }, [Jo, er, mt]);
  const Ia = o.useCallback((a) => {
    if (a.preventDefault(), a.touches.length === 1) {
      const p = a.touches[0], m = qe.current;
      if (!m) return;
      const v = m.getBoundingClientRect(), f = p.clientX - v.left, e = p.clientY - v.top;
      if (rs.current = { x: f, y: e }, ct.current && (clearTimeout(ct.current), ct.current = null), Mn) {
        os(!1), Yt.current = null;
        const _ = m.getContext("2d");
        _ && _.clearRect(0, 0, m.width, m.height);
      }
      const O = Date.now();
      Rn.current = !0, Os.current = O;
      const H = O - as.current;
      if (as.current = O, !(H < 300)) {
        const _ = O;
        ct.current = setTimeout(() => {
          Os.current === _ && Rn.current && (os(!0), Yt.current = { x: f, y: e }, cn.current !== null && cancelAnimationFrame(cn.current), cn.current = requestAnimationFrame(() => {
            Bt(), cn.current = null;
          })), ct.current = null;
        }, 400);
      }
      if (Ye && Ye.length > 0) {
        Js.current = Date.now();
        const _ = on.current, b = rn.current;
        if (_ && _.range > 0 && b > 0) {
          const w = _.max - e / b * _.range, A = _.range * 0.015;
          if ($e.current) {
            const u = Ye.find((N) => N.id === $e.current);
            if (u) {
              const N = (_.max - u.price) / _.range * b, x = 22, V = Math.min(N + 10, b - x - 4), d = 5, M = fe.width - He, ce = 45, Ae = 55, Q = 44, Be = ce + Ae + Q + d * 2, Ie = (M - Be) / 2, ze = Ie + ce + d, We = ze + Ae + d, ie = 12;
              if (f >= Ie - ie && f <= Ie + ce + ie && e >= V - ie && e <= V + x + ie) {
                Xt && Xt($e.current, at.current ?? void 0, dt.current ?? void 0), $e.current = null, at.current = null, dt.current = null, nt.current = null, _t((Te) => Te + 1), Ge(!1);
                return;
              }
              if (f >= ze - ie && f <= ze + Ae + ie && e >= V - ie && e <= V + x + ie) {
                $e.current = null, at.current = null, dt.current = null, nt.current = null, _t((Te) => Te + 1), Ge(!1);
                return;
              }
              if (f >= We - ie && f <= We + Q + ie && e >= V - ie && e <= V + x + ie) {
                Zt && Zt($e.current), $e.current = null, at.current = null, dt.current = null, nt.current = null, _t((Te) => Te + 1), Ge(!1);
                return;
              }
            }
          }
          if ($e.current) {
            const u = Ye.find((N) => N.id === $e.current);
            if (u) {
              const N = u.side === "buy", x = Qn(u.price), V = at.current ?? u.stopLoss ?? (N ? u.price - x : u.price + x), d = dt.current ?? u.takeProfit ?? (N ? u.price + x : u.price - x);
              if (Math.abs(w - V) < A) {
                nt.current = "sl", at.current = V, ct.current && (clearTimeout(ct.current), ct.current = null);
                return;
              }
              if (Math.abs(w - d) < A) {
                nt.current = "tp", dt.current = d, ct.current && (clearTimeout(ct.current), ct.current = null);
                return;
              }
            }
          }
          let X = null;
          for (const u of Ye) {
            const N = (_.max - u.price) / _.range * b;
            if (f <= 160 && Math.abs(e - N) < 20) {
              X = u.id;
              break;
            }
          }
          if (X) {
            if ($e.current === X)
              $e.current = null, at.current = null, dt.current = null;
            else {
              $e.current = X;
              const u = Ye.find((N) => N.id === X);
              at.current = u?.stopLoss ?? null, dt.current = u?.takeProfit ?? null;
            }
            nt.current = null, ct.current && (clearTimeout(ct.current), ct.current = null), _t((u) => u + 1), Ge(!1);
            return;
          }
        }
      }
      ss(!0), ll({ x: f, y: e, startIndex: ae.startIndex, priceOffset: Ne });
    }
  }, [ae.startIndex, Ne, Bt, Mn]), Dl = o.useRef(null), pr = o.useCallback((a) => {
    if (a.touches.length === 2) {
      a.preventDefault();
      const p = a.touches[0], m = a.touches[1], v = Math.hypot(
        m.clientX - p.clientX,
        m.clientY - p.clientY
      );
      if (Dl.current !== null) {
        const f = Re.current.candleWidth, e = Re.current.startIndex, H = 1 + (v / Dl.current - 1) * 1.3, K = Math.max(
          El,
          Math.min(Al, f * H)
        ), _ = qe.current;
        if (_) {
          const b = _.getBoundingClientRect(), w = (p.clientX + m.clientX) / 2 - b.left, A = f * (1 + _e), X = K * (1 + _e), u = e + w / A, N = Math.max(0, u - w / X);
          Re.current = { startIndex: N, candleWidth: K }, Ge(!0), mt(), lt.current || It(!0);
        }
      }
      Dl.current = v;
    }
  }, [mt]), Ta = o.useCallback((a) => {
    if (a.touches.length === 2) {
      pr(a), ct.current && (clearTimeout(ct.current), ct.current = null);
      return;
    }
    if (a.touches.length === 1) {
      const p = a.touches[0], m = qe.current;
      if (!m) return;
      const v = m.getBoundingClientRect(), f = p.clientX - v.left, e = p.clientY - v.top;
      if (ct.current && rs.current) {
        const O = Math.abs(f - rs.current.x), H = Math.abs(e - rs.current.y);
        (O > 10 || H > 10) && (clearTimeout(ct.current), ct.current = null);
      }
      if (Mn && (Yt.current = { x: f, y: e }, cn.current !== null && cancelAnimationFrame(cn.current), cn.current = requestAnimationFrame(() => {
        Bt(), cn.current = null;
      })), nt.current) {
        a.preventDefault();
        const O = on.current, H = rn.current;
        if (O && O.range > 0 && H > 0) {
          const K = O.max - e / H * O.range;
          nt.current === "sl" ? at.current = K : dt.current = K, gn.current === null && (gn.current = requestAnimationFrame(() => {
            Ge(!1), gn.current = null;
          }));
        }
        return;
      }
      if (Wn && !Mn) {
        a.preventDefault(), It(!0);
        const O = f - xn.x, H = e - xn.y, K = ae.candleWidth * (1 + _e), _ = O / K, b = Math.max(
          0,
          Math.min(s.length - 10, xn.startIndex - _)
        );
        if (cs && tt !== null) {
          const w = tt / vn.current / (fe.height - yt), A = H * w;
          Xn.current = xn.priceOffset + A;
        }
        Re.current = {
          startIndex: b,
          candleWidth: ae.candleWidth
        }, bn.current === null && (bn.current = requestAnimationFrame(() => {
          Ge(!0), mt(), bn.current = null;
        }));
      }
    }
  }, [Wn, xn, ae.candleWidth, s.length, pr, Bt, Mn, cs, tt, fe.height, Ye]), ja = o.useCallback(() => {
    if (Rn.current = !1, Os.current = 0, ct.current && (clearTimeout(ct.current), ct.current = null), nt.current && $e.current) {
      nt.current = null, Ge(!1), Rn.current = !1, Os.current = 0, ct.current && (clearTimeout(ct.current), ct.current = null);
      return;
    }
    if (Mn) {
      os(!1), Yt.current = null;
      const a = qe.current, p = a?.getContext("2d");
      p && a && p.clearRect(0, 0, a.width, a.height), te && te(null, null);
    }
    if (lt.current) {
      It(!1);
      const a = Re.current;
      if (Ge(!1), Pe) {
        const p = fe.width - He, m = ae.candleWidth * (1 + _e), v = Math.floor(p / m), f = a.startIndex + v, e = s.length - 1 < f;
        Vn.current = !e;
      }
      At((p) => ({
        ...p,
        startIndex: a.startIndex,
        // Keep float precision - no rounding
        candleWidth: a.candleWidth,
        // Pick up pinch-zoom final width
        autoFollowLatest: !1
      })), cs && jt(Xn.current);
    }
    ss(!1), Dl.current = null, rs.current = null, ao.current = null, bn.current !== null && (cancelAnimationFrame(bn.current), bn.current = null);
  }, [Mn, te, cs]);
  o.useCallback((a) => {
    let p = is[0], m = Math.abs(a - p);
    for (const v of is) {
      const f = Math.abs(a - v);
      f < m && (m = f, p = v);
    }
    return p;
  }, [is]);
  const So = o.useCallback((a, p) => {
    const m = is.findIndex((v) => v >= a - 1e-3);
    if (p) {
      const v = Math.min(is.length - 1, m + 1);
      return is[v];
    } else {
      const v = Math.max(0, m - 1);
      return is[v];
    }
  }, [is]), Co = o.useCallback((a) => {
    const p = a.ctrlKey || a.metaKey;
    if (!vo.current && !p) {
      const x = Math.abs(a.deltaX) > Math.abs(a.deltaY), V = a.shiftKey && a.deltaY !== 0;
      if (x || V) {
        a.preventDefault();
        const d = Re.current.startIndex, M = Re.current.candleWidth, ce = M * (1 + _e);
        It(!0);
        const Ae = V ? a.deltaY : a.deltaX, Q = 0.2 + (cl - 1) * 0.2, Be = Ae * Q / ce, G = Math.max(
          0,
          Math.min(s.length - 10, d + Be)
        );
        Re.current = { startIndex: G, candleWidth: M }, gt.current && clearTimeout(gt.current), gt.current = setTimeout(() => {
          if (Pe) {
            const ze = fe.width - He, We = Re.current.candleWidth * (1 + _e), ie = Math.floor(ze / We), Te = Re.current.startIndex + ie;
            Vn.current = !(s.length - 1 < Te);
          }
          const Ie = Re.current;
          At((ze) => ({
            ...ze,
            startIndex: Ie.startIndex,
            autoFollowLatest: !1
          })), It(!1);
        }, 150), Nt.current === null && (Nt.current = requestAnimationFrame(() => {
          Ge(!0), Bt(), mt(), Nt.current = null;
        }));
        return;
      }
    }
    a.preventDefault(), It(!0);
    const m = qe.current;
    if (!m) return;
    const v = m.getBoundingClientRect(), f = a.clientX - v.left, e = a.clientY - v.top;
    Yt.current = { x: f, y: e };
    const O = Re.current.startIndex, H = Re.current.candleWidth, K = H * (1 + _e);
    if (Math.abs(a.deltaX) > Math.abs(a.deltaY) || a.shiftKey) {
      const x = a.shiftKey ? a.deltaY : a.deltaX, V = vo.current ? 0.02 + (cl - 1) * 0.02 : 0.2 + (cl - 1) * 0.2, d = x * V / K, M = Math.max(
        0,
        Math.min(s.length - 10, O + d)
      );
      Re.current = { startIndex: M, candleWidth: H }, Nt.current === null && (Nt.current = requestAnimationFrame(() => {
        Ge(!0), Bt(), mt(), Nt.current = null;
      })), gt.current && clearTimeout(gt.current), gt.current = setTimeout(() => {
        if (Pe) {
          const Ae = fe.width - He, Q = Re.current.candleWidth * (1 + _e), Be = Math.floor(Ae / Q), G = Re.current.startIndex + Be;
          Vn.current = !(s.length - 1 < G);
        }
        const ce = Re.current;
        At((Ae) => ({
          ...Ae,
          startIndex: ce.startIndex,
          // Keep float precision - no rounding
          autoFollowLatest: !1
        })), It(!1);
      }, 150);
      return;
    }
    if (vo.current) {
      ls.current += a.deltaY, Cs.current && clearTimeout(Cs.current), Cs.current = setTimeout(() => {
        ls.current = 0;
      }, 200);
      const x = 220 - cl * 20;
      if (Math.abs(ls.current) < x)
        return;
      const V = ls.current < 0;
      ls.current = 0;
      const d = So(H, V);
      if (d === H) return;
      const M = fe.width - He, ce = H * (1 + _e), Ae = d * (1 + _e), Q = O + M / ce, Be = Math.max(0, Q - M / Ae);
      It(!0), Re.current = { startIndex: Be, candleWidth: d }, Nt.current === null && (Nt.current = requestAnimationFrame(() => {
        Ge(!0), Bt(), mt(), Nt.current = null;
      })), gt.current && clearTimeout(gt.current), gt.current = setTimeout(() => {
        const G = Re.current;
        At((Ie) => ({
          ...Ie,
          candleWidth: G.candleWidth,
          startIndex: G.startIndex,
          // Keep float precision
          autoFollowLatest: !1
        })), It(!1);
      }, 100);
      return;
    }
    const _ = a.deltaY < 0, b = So(H, _);
    if (b === H) return;
    const w = fe.width - He, A = H * (1 + _e), X = b * (1 + _e), u = O + w / A, N = Math.max(0, u - w / X);
    It(!0), Re.current = { startIndex: N, candleWidth: b }, Nt.current === null && (Nt.current = requestAnimationFrame(() => {
      Ge(!0), Bt(), mt(), Nt.current = null;
    })), gt.current && clearTimeout(gt.current), gt.current = setTimeout(() => {
      const x = Re.current;
      At((V) => ({
        ...V,
        candleWidth: x.candleWidth,
        startIndex: x.startIndex,
        // Keep float precision
        autoFollowLatest: !1
      })), It(!1);
    }, 100);
  }, [s.length, Bt, So, fe.width, fe.height, cl, Kt, Nn, n, Ts, ae.autoFollowLatest, mt]), xr = o.useRef(Co), mr = o.useRef(ko);
  o.useEffect(() => {
    xr.current = Co;
  }, [Co]), o.useEffect(() => {
    mr.current = ko;
  }, [ko]);
  const Ma = o.useRef(null), ds = o.useRef(null), hs = o.useRef(null), Ra = o.useCallback((a) => {
    if (ds.current && (ds.current.el.removeEventListener("wheel", ds.current.fn), ds.current = null), qe.current = a, a) {
      const p = (m) => xr.current(m);
      a.addEventListener("wheel", p, { passive: !1 }), ds.current = { el: a, fn: p };
    }
  }, []), Pa = o.useCallback((a) => {
    if (hs.current && (hs.current.el.removeEventListener("wheel", hs.current.fn), hs.current = null), Ma.current = a, a) {
      const p = (m) => mr.current(m);
      a.addEventListener("wheel", p, { passive: !1 }), hs.current = { el: a, fn: p };
    }
  }, []);
  o.useEffect(() => () => {
    ds.current && ds.current.el.removeEventListener("wheel", ds.current.fn), hs.current && hs.current.el.removeEventListener("wheel", hs.current.fn);
  }, []), o.useLayoutEffect(() => {
    const a = jl.current;
    if (!a) return;
    const p = a.getBoundingClientRect();
    p.width > 0 && p.height > 0 && Zn({ width: Math.round(p.width), height: Math.round(p.height) });
    const m = new ResizeObserver((v) => {
      for (const f of v) {
        const e = Math.round(f.contentRect.width), O = Math.round(f.contentRect.height);
        e > 0 && O > 0 && Ar.flushSync(() => {
          Zn(
            (H) => H.width === e && H.height === O ? H : { width: e, height: O }
          );
        });
      }
    });
    return m.observe(a), () => m.disconnect();
  }, []), o.useEffect(() => {
    xt && xt.width > 0 && xt.height > 0 && Zn(xt);
  }, [xt]);
  const br = o.useRef(`${h}|${ln}`);
  o.useLayoutEffect(() => {
    const a = `${h}|${ln}`;
    br.current !== a && (br.current = a, !Pe && At((p) => p.autoFollowLatest ? p : { ...p, autoFollowLatest: !0 }));
  }, [h, ln, Pe]), o.useLayoutEffect(() => {
    if (s.length === 0) return;
    if (Pe) {
      const e = Fs.current, O = fe.width - He, H = ae.candleWidth * (1 + _e), K = Math.floor(O / H), _ = Math.floor(K * 0.9), w = ks.current <= 300 && fe.width > 300;
      if (ks.current = fe.width, s.length !== e || e === 0 || w) {
        const A = e > 0 && s.length < e, X = Math.max(0, Math.floor(ae.startIndex)), u = Math.min(s.length, X + K), N = s.length - 1 < u;
        if (e === 0 || A || w || N && !Vn.current) {
          const x = Math.max(0, s.length - 1 - _);
          At((V) => ({ ...V, startIndex: x, autoFollowLatest: !1 })), A && (Vn.current = !1);
        }
      }
      Fs.current = s.length;
      return;
    }
    if (!ae.autoFollowLatest) {
      if (ae.startIndex > s.length - 1) {
        const e = fe.width - He, O = ae.candleWidth * (1 + _e), H = Math.max(1, Math.floor(e / O));
        At((K) => ({ ...K, startIndex: Math.max(0, s.length - H) }));
      }
      return;
    }
    const a = fe.width - He, p = ae.candleWidth * (1 + _e), m = Math.floor(a / p);
    if (s.length > 0 && s.length < m * 0.75) {
      const e = Math.min(
        Al,
        a * 0.92 / (s.length * (1 + _e))
      );
      if (e > ae.candleWidth * 1.05) {
        Re.current = { startIndex: 0, candleWidth: e }, At((O) => ({ ...O, startIndex: 0, candleWidth: e })), Fs.current = s.length;
        return;
      }
    }
    const v = Math.min(ae.futureSpace, Math.floor(m * 0.3)), f = Math.max(0, s.length - m + v);
    At((e) => ({ ...e, startIndex: f })), Fs.current = s.length;
  }, [s.length, fe.width, ae.autoFollowLatest, ae.candleWidth, ae.futureSpace, ae.startIndex, Pe]), o.useLayoutEffect(() => {
    const a = gs - Tn.current;
    a !== 0 && (At((p) => ({
      ...p,
      startIndex: Math.max(0, p.startIndex + a)
    })), Re.current.startIndex = Math.max(0, Re.current.startIndex + a), $n.current.startIndex = Math.max(0, $n.current.startIndex + a)), Tn.current = gs;
  }, [gs]), o.useEffect(() => {
    if (B == null) {
      sl.current = void 0;
      return;
    }
    if (s.length === 0 || sl.current === B) return;
    sl.current = B;
    const a = fe.width - He, p = ae.candleWidth * (1 + _e), m = Math.floor(a / p), v = Math.min(B, s.length - 1), f = Math.floor(m * 0.9), e = Math.max(0, v - f);
    At((O) => ({ ...O, startIndex: e, autoFollowLatest: !1 }));
  }, [B, s.length, fe.width, ae.candleWidth]), o.useEffect(() => {
    !lt.current && !Tl && us();
  }, [us, Tl]);
  const Io = o.useRef(0), dl = o.useRef(null);
  o.useEffect(() => {
    if (n == null || lt.current) return;
    const a = Date.now(), p = a - Io.current;
    return p >= 50 ? (Io.current = a, us()) : (dl.current && clearTimeout(dl.current), dl.current = setTimeout(() => {
      Io.current = Date.now(), us();
    }, 50 - p)), () => {
      dl.current && clearTimeout(dl.current);
    };
  }, [n, us]), o.useEffect(() => {
    Bt();
  }, [Bt]), o.useEffect(() => {
    As.current = se, se != null && (Gs.current = !0, requestAnimationFrame(() => {
      Bt(), Gs.current = !1;
    }));
  }, [se, Bt]);
  const Bl = o.useRef(/* @__PURE__ */ new Map()), gr = o.useMemo(() => {
    if (lt.current && Bl.current.size > 0 && s.length === Bl.current.size)
      return Bl.current;
    const a = /* @__PURE__ */ new Map();
    for (let p = 0; p < s.length; p++)
      a.set(s[p].time, p);
    return Bl.current = a, a;
  }, [s]), Wl = o.useCallback(() => {
    if (!Ee) return;
    const a = Nn();
    Ts(a.candles, ae.autoFollowLatest);
    const p = s.length > 0 ? s[s.length - 1] : null, m = s.length >= 2 ? s[s.length - 2] : null, v = p && m ? p.time - m.time : 6e4;
    Ee({
      priceAxisWidth: He,
      timeToX: (f) => {
        const e = lt.current ? $n.current.startIndex : ae.startIndex, H = (lt.current ? $n.current.candleWidth : ae.candleWidth) * (1 + _e), K = Math.floor(e), _ = (e - K) * H;
        let b = gr.get(f) ?? -1;
        if (b === -1 && s.length > 0) {
          const w = s[0], A = s[s.length - 1];
          if (f > A.time) {
            const X = f - A.time;
            b = s.length - 1 + Math.round(X / v);
          } else if (f < w.time) {
            const X = w.time - f;
            b = -Math.round(X / v);
          } else {
            let X = 0, u = s.length - 1;
            for (; X < u; ) {
              const N = Math.floor((X + u) / 2);
              s[N].time < f ? X = N + 1 : u = N;
            }
            if (X > 0) {
              const N = s[X - 1], x = s[X], V = (f - N.time) / (x.time - N.time);
              return (X - 1 + V - K) * H + H / 2 - _;
            }
            b = X;
          }
        }
        return b === -1 ? null : (b - K) * H + H / 2 - _;
      },
      xToTime: (f) => {
        const e = lt.current ? $n.current.startIndex : ae.startIndex, H = (lt.current ? $n.current.candleWidth : ae.candleWidth) * (1 + _e), K = Math.floor(e), _ = (e - K) * H, b = f + _, w = K + (b - H / 2) / H;
        if (w < 0) return null;
        const A = Math.floor(w), X = w - A;
        if (A >= s.length) {
          if (p) {
            const N = w - (s.length - 1);
            return p.time + N * v;
          }
          return null;
        }
        const u = s[A];
        if (!u) return null;
        if (X > 0 && A + 1 < s.length) {
          const N = s[A + 1];
          return u.time + X * (N.time - u.time);
        }
        return u.time + X * v;
      },
      priceToY: (f) => {
        let e = on.current, O = rn.current;
        if (!e || O === 0) {
          const H = fe.width - He, K = Re.current, _ = K.candleWidth * (1 + _e), b = Math.floor(H / _), w = Math.max(0, Math.floor(K.startIndex)), A = Math.min(s.length, w + b), X = s.slice(w, A);
          let u = 1 / 0, N = -1 / 0;
          if (X.length === 0)
            u = 0, N = 100;
          else {
            for (const We of X)
              We.low < u && (u = We.low), We.high > N && (N = We.high);
            n && (n < u && (u = n), n > N && (N = n));
          }
          const x = N - u, V = x * 0.05, d = (N + u) / 2, M = x + V * 2;
          e = {
            min: d - M / 2,
            max: d + M / 2,
            range: M
          };
          const ce = r?.rsi?.enabled, Ae = r?.macd?.enabled, Q = r?.atr?.enabled, Be = r?.stochastic?.enabled;
          r?.volume?.enabled && s.some((We) => We.volume !== void 0 && We.volume > 0);
          const G = (ce ? 1 : 0) + (Ae ? 1 : 0) + (Q ? 1 : 0) + (Be ? 1 : 0), Ie = fe.height - yt, ze = G > 0 ? Math.max(60 * G, Ie * le) : 0;
          O = Ie - ze;
        }
        if (Kt !== null && tt !== null) {
          const H = vn.current, K = Xn.current, _ = tt / H, b = Kt + K;
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
          const H = fe.width - He, K = Re.current, _ = K.candleWidth * (1 + _e), b = Math.floor(H / _), w = Math.max(0, Math.floor(K.startIndex)), A = Math.min(s.length, w + b), X = s.slice(w, A);
          let u = 1 / 0, N = -1 / 0;
          if (X.length === 0)
            u = 0, N = 100;
          else {
            for (const We of X)
              We.low < u && (u = We.low), We.high > N && (N = We.high);
            n && (n < u && (u = n), n > N && (N = n));
          }
          const x = N - u, V = x * 0.05, d = (N + u) / 2, M = x + V * 2;
          e = {
            min: d - M / 2,
            max: d + M / 2,
            range: M
          };
          const ce = r?.rsi?.enabled, Ae = r?.macd?.enabled, Q = r?.atr?.enabled, Be = r?.stochastic?.enabled;
          r?.volume?.enabled && s.some((We) => We.volume !== void 0 && We.volume > 0);
          const G = (ce ? 1 : 0) + (Ae ? 1 : 0) + (Q ? 1 : 0) + (Be ? 1 : 0), Ie = fe.height - yt, ze = G > 0 ? Math.max(60 * G, Ie * le) : 0;
          O = Ie - ze;
        }
        if (Kt !== null && tt !== null) {
          const H = vn.current, K = Xn.current, _ = tt / H, b = Kt + K;
          e = {
            min: b - _ / 2,
            max: b + _ / 2,
            range: _
          };
        }
        return e.max - f / O * e.range;
      }
    });
  }, [s, ae, fe, Ee, r, le, n, Kt, tt, gr]);
  o.useEffect(() => {
    nl.current = Wl;
  }, [Wl]), o.useLayoutEffect(() => {
    Wl();
  }, [Wl]);
  const To = [
    l?.rsi,
    l?.macd,
    l?.atr,
    l?.stochastic,
    l?.williamsR,
    l?.cci,
    l?.adx,
    l?.roc,
    l?.aroon,
    l?.momentum,
    l?.ao,
    l?.mfi,
    l?.tsi,
    l?.trix,
    l?.ultimateOsc,
    l?.dpo,
    l?.kst,
    l?.stochRsi,
    l?.bbPercent,
    l?.bbWidth,
    l?.histVol,
    l?.chaikinVol,
    l?.stdDev,
    l?.obv,
    l?.cmf,
    l?.adl,
    l?.forceIndex,
    l?.eom,
    l?.correlation,
    l?.coppock,
    // Phase 2 subplots
    l?.vortex,
    l?.choppiness,
    l?.elderRay,
    l?.massIndex,
    l?.linRegSlope,
    l?.ppo,
    l?.pvo,
    l?.cmo,
    l?.fisher,
    l?.stc,
    l?.rviOsc,
    l?.klinger,
    l?.connorsRsi,
    l?.apo,
    l?.qstick,
    l?.bop,
    l?.psychLine,
    l?.pfe,
    l?.smi,
    l?.ulcerIndex,
    l?.natr,
    l?.trueRange,
    l?.squeeze,
    l?.relVolIndex,
    l?.vhf,
    l?.volumeOsc,
    l?.nvi,
    l?.pvi,
    l?.pvt,
    l?.vroc,
    l?.netVolume,
    l?.twiggsMF,
    l?.linRegRSquared,
    l?.gator
  ].filter(Boolean).length + (l?.customIndicators?.filter((a) => a.display === "subplot").length || 0), Na = To > 0, vr = fe.height - yt, La = To > 0 ? Math.max(60 * To, vr * le) : 0, yr = vr - La, kr = o.useCallback((a) => {
    a.preventDefault(), a.stopPropagation(), Dt(!0);
    const p = "touches" in a ? a.touches[0].clientY : a.clientY;
    Xe.current = { y: p, ratio: le };
  }, [le]);
  o.useEffect(() => {
    if (!ot) return;
    const a = (m) => {
      const v = "touches" in m ? m.touches[0].clientY : m.clientY, e = (Xe.current.y - v) / (fe.height - yt), O = Math.max(0.1, Math.min(0.6, Xe.current.ratio + e));
      me(O);
    }, p = () => {
      Dt(!1);
    };
    return window.addEventListener("mousemove", a), window.addEventListener("mouseup", p), window.addEventListener("touchmove", a), window.addEventListener("touchend", p), () => {
      window.removeEventListener("mousemove", a), window.removeEventListener("mouseup", p), window.removeEventListener("touchmove", a), window.removeEventListener("touchend", p);
    };
  }, [ot, fe.height]);
  const Fl = (a) => {
    const { kind: p, label: m, menuKey: v, engineLabel: f, ciId: e, sid: O, remove: H } = a, K = "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground transition-colors", _ = () => {
      p !== "formula" || !e || !re || (re({
        ...r,
        customIndicators: (r.customIndicators || []).map((A) => A.id === e ? { ...A, enabled: !1 } : A)
      }), ve(null), de(null));
    }, b = (A) => {
      A.stopPropagation(), vt({
        visible: !0,
        x: A.clientX,
        y: A.clientY,
        key: v,
        title: m,
        custom: p === "engine" ? { kind: p, label: f || m } : p === "formula" ? { kind: p, ciId: e } : { kind: p, sid: O }
      });
    }, w = p === "engine" && !!Qe && !!f || p === "formula" && !!Cn;
    return /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
      p === "formula" && /* @__PURE__ */ t.jsx("button", { onClick: (A) => {
        A.stopPropagation(), _();
      }, className: `${K} hover:text-foreground`, title: `Hide ${m}`, children: /* @__PURE__ */ t.jsx(Ul, { className: "w-[15px] h-[15px]" }) }),
      w && /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: (A) => {
            A.stopPropagation(), p === "engine" ? Qe?.(f) : Cn?.();
          },
          className: `${K} hover:text-foreground`,
          title: `${m} Settings`,
          children: /* @__PURE__ */ t.jsx(ql, { className: "w-[15px] h-[15px]" })
        }
      ),
      /* @__PURE__ */ t.jsx("button", { onClick: (A) => {
        A.stopPropagation(), H();
      }, className: `${K} hover:text-destructive`, title: `Remove ${m}`, children: /* @__PURE__ */ t.jsx(Gl, { className: "w-[15px] h-[15px]" }) }),
      /* @__PURE__ */ t.jsx("button", { onClick: b, className: `${K} hover:text-foreground`, title: "More options", children: /* @__PURE__ */ t.jsx(Zl, { className: "w-[15px] h-[15px]" }) })
    ] });
  };
  return /* @__PURE__ */ t.jsxs(
    "div",
    {
      ref: jl,
      className: "relative w-full h-full select-none",
      style: {
        backgroundColor: ee.background,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none"
      },
      children: [
        /* @__PURE__ */ t.jsx(
          "canvas",
          {
            ref: Ml,
            width: fe.width * hn,
            height: fe.height * hn,
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
            ref: Ra,
            width: fe.width * hn,
            height: fe.height * hn,
            className: "absolute inset-0 w-full h-full cursor-crosshair touch-none select-none",
            draggable: !1,
            onDragStart: (a) => a.preventDefault(),
            style: {
              WebkitTouchCallout: "none",
              WebkitUserSelect: "none",
              willChange: "contents"
            },
            onMouseMove: wa,
            onMouseDown: Sa,
            onMouseUp: wo,
            onMouseLeave: Ca,
            onTouchStart: Ia,
            onTouchMove: Ta,
            onTouchEnd: ja,
            onContextMenu: (a) => {
              if (!r || !l) return;
              const p = qe.current;
              if (!p) return;
              const m = p.getBoundingClientRect(), v = a.clientX - m.left, f = a.clientY - m.top, e = en.current, O = (d) => !!d && f >= d.top && f <= d.bottom, H = r?.customBrueScripts || {}, K = (d, M) => {
                de(`script-${d}`), vt({
                  visible: !0,
                  x: a.clientX,
                  y: a.clientY,
                  key: `script_${d}`,
                  title: H[d]?.name || M,
                  custom: { kind: "brue", sid: d }
                });
              };
              for (const d of Wr()) {
                const M = r[d];
                if (!M?.enabled || !l?.[d] || !O(e[d])) continue;
                a.preventDefault(), a.stopPropagation();
                const ce = M.sourceScriptId;
                if (ce && H[ce]?.enabled) {
                  K(ce, zl(d));
                  return;
                }
                de(`sp-${d}`), vt({
                  visible: !0,
                  x: a.clientX,
                  y: a.clientY,
                  key: d,
                  title: zl(d)
                });
                return;
              }
              for (const d of r.customIndicators || []) {
                if (!d.enabled || d.display !== "subplot" || !O(e[`custom_${d.id}`])) continue;
                a.preventDefault(), a.stopPropagation();
                const M = typeof d.expression == "string" ? d.expression : "";
                if (M.startsWith("brue:") && d.scriptId)
                  K(d.scriptId, d.name || "Brue script");
                else if (M.startsWith("local:")) {
                  const ce = d.group || M.split(":")[1] || d.name;
                  de(`ci-${d.id}`), vt({
                    visible: !0,
                    x: a.clientX,
                    y: a.clientY,
                    key: `custom_${d.id}`,
                    title: ce || "Indicator",
                    custom: { kind: "engine", label: ce }
                  });
                } else
                  de(`ci-${d.id}`), vt({
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
              const w = Re.current, A = w.candleWidth * (1 + _e), u = Math.max(0, Math.floor(w.startIndex)) + Math.round(v / A), N = 8, x = (d) => {
                if (isNaN(d) || !isFinite(d)) return !1;
                const M = b - (d - _.min) / _.range * b;
                return Math.abs(f - M) < N;
              }, V = [];
              if (r.movingAverages?.enabled && l.movingAverages && V.push({ key: "movingAverages", title: "Moving Averages", check: () => l.movingAverages.some(
                (d) => u >= 0 && u < d.data.length && x(d.data[u])
              ) }), r.bollinger?.enabled && l.bollinger) {
                const d = l.bollinger;
                V.push({
                  key: "bollinger",
                  title: "Bollinger Bands",
                  check: () => u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.middle[u]) || x(d.lower[u]))
                });
              }
              if (r.vwap?.enabled && l.vwap && V.push({
                key: "vwap",
                title: "VWAP",
                check: () => u >= 0 && u < l.vwap.length && x(l.vwap[u])
              }), r.supertrend?.enabled && l.supertrend && V.push({
                key: "supertrend",
                title: "Supertrend",
                check: () => u >= 0 && u < l.supertrend.length && l.supertrend[u] && x(l.supertrend[u].value)
              }), r.ichimoku?.enabled && l.ichimoku) {
                const d = l.ichimoku;
                V.push({
                  key: "ichimoku",
                  title: "Ichimoku Cloud",
                  check: () => u >= 0 && u < d.tenkan.length && (x(d.tenkan[u]) || x(d.kijun[u]) || x(d.senkouA[u]) || x(d.senkouB[u]))
                });
              }
              if (r.keltner?.enabled && l.keltner) {
                const d = l.keltner;
                V.push({
                  key: "keltner",
                  title: "Keltner Channel",
                  check: () => u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.middle[u]) || x(d.lower[u]))
                });
              }
              if (r.donchian?.enabled && l.donchian) {
                const d = l.donchian;
                V.push({
                  key: "donchian",
                  title: "Donchian Channel",
                  check: () => u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.middle[u]) || x(d.lower[u]))
                });
              }
              for (const d of V)
                if (d.check()) {
                  a.preventDefault(), a.stopPropagation(), de(d.key), vt({ visible: !0, x: a.clientX, y: a.clientY, key: d.key, title: d.title });
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
              left: zn ? (tr || 295) + 6 : 6,
              pointerEvents: "auto"
            },
            onMouseEnter: () => {
              ho.current = !0;
            },
            onMouseLeave: () => {
              ho.current = !1;
            },
            children: [
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: () => {
                    ea(!zn);
                  },
                  className: "flex items-center justify-center w-4 h-4 rounded transition-all duration-200",
                  style: { background: "rgba(128, 128, 128, 0.3)" },
                  title: zn ? "Hide OHLC" : "Show OHLC",
                  children: zn ? /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", className: "w-2.5 h-2.5", fill: "none", stroke: "#9ca3af", strokeWidth: "3", strokeLinecap: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M10 4L5 8L10 12" }) }) : /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", className: "w-2.5 h-2.5", fill: "none", stroke: "#9ca3af", strokeWidth: "3", strokeLinecap: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M6 4L11 8L6 12" }) })
                }
              ),
              zn && h && (() => {
                const a = /* @__PURE__ */ new Date(), p = Au(h), m = Gr(h);
                let v = "", f = "", e = 0, O = 0, H = !1, K = m ? "#22c55e" : "#ef4444", _ = m ? "Market open" : "Market closed", b = "Real time";
                const w = Du(a), A = w.hours * 60 + w.minutes, X = w.day, u = w.isBST, N = u ? "BST (UTC+1)" : "GMT (UTC+0)", x = String(w.hours).padStart(2, "0"), V = String(w.minutes).padStart(2, "0"), d = Bu(h);
                if (p === "crypto")
                  H = !0, v = "24/7", f = "Always open", K = "#22c55e", _ = "Market open";
                else if (p === "forex")
                  H = !0, v = u ? "Sun 10 PM – Fri 10 PM BST" : "Sun 10 PM – Fri 10 PM GMT", f = N, m || (_ = "Weekend — market closed");
                else if (p === "stock" && d) {
                  const ie = Kl(d);
                  e = ie.openHour * 60 + ie.openMinute, O = ie.closeHour * 60 + ie.closeMinute;
                  const Te = String(ie.openHour).padStart(2, "0"), Je = ie.openMinute === 0 ? "00" : String(ie.openMinute).padStart(2, "0"), Ve = String(ie.closeHour).padStart(2, "0"), Wt = ie.closeMinute === 0 ? "00" : String(ie.closeMinute).padStart(2, "0");
                  if (v = `${Te}:${Je} – ${Ve}:${Wt} ${ie.tzLabel}`, f = `${ie.exchange} (${ie.tzLabel})`, ie.lunchBreak) {
                    const yn = `${String(ie.lunchBreak.startHour).padStart(2, "0")}:${String(ie.lunchBreak.startMinute).padStart(2, "0")}`, Ut = `${String(ie.lunchBreak.endHour).padStart(2, "0")}:${String(ie.lunchBreak.endMinute).padStart(2, "0")}`;
                    v += ` (break ${yn}–${Ut})`;
                  }
                } else if (p === "stock") {
                  e = 14 * 60 + 30, O = 21 * 60, Wu(a) && (O = 18 * 60, K = m ? "#f59e0b" : "#ef4444", _ = m ? "Early close today" : "Market closed");
                  const ie = Math.floor(e / 60), Te = Math.floor(O / 60), Je = e % 60 === 0 ? ":00" : ":30", Ve = O % 60 === 0 ? ":00" : ":30";
                  v = `${ie}${Je} – ${Te}${Ve} ${u ? "BST" : "GMT"}`, f = `NYSE/NASDAQ (${N})`;
                } else if (p === "commodity" || p === "index") {
                  H = !0, v = u ? "Sun 11 PM – Fri 10 PM BST" : "Sun 11 PM – Fri 10 PM GMT", f = N;
                  const ie = u ? 23 * 60 : 22 * 60, Te = u ? 24 * 60 : 23 * 60;
                  m && A >= ie - 15 && A < ie ? (_ = "Closing soon — daily break", K = "#f59e0b") : !m && A >= ie && A < Te && (_ = "Daily maintenance break");
                }
                let M = "";
                if (!H && p === "stock") {
                  let ie = A;
                  if (d)
                    try {
                      const Te = Kl(d), Ve = new Intl.DateTimeFormat("en-GB", { timeZone: Te.timezone, hour: "numeric", minute: "numeric", hour12: !1 }).formatToParts(a), Wt = parseInt(Ve.find((Ut) => Ut.type === "hour")?.value || "0"), yn = parseInt(Ve.find((Ut) => Ut.type === "minute")?.value || "0");
                      ie = Wt * 60 + yn;
                    } catch {
                    }
                  if (m) {
                    const Te = O - ie;
                    if (Te > 0) {
                      const Je = Math.floor(Te / 60), Ve = Te % 60;
                      M = Je > 0 ? `Closes in ${Je}h ${Ve}m` : `Closes in ${Ve} minutes`;
                    }
                  } else {
                    const Te = d ? (() => {
                      try {
                        const Ve = new Intl.DateTimeFormat("en-GB", { timeZone: Kl(d).timezone, weekday: "short" }).formatToParts(a).find((Wt) => Wt.type === "weekday")?.value || "";
                        return { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5 }[Ve] || 0;
                      } catch {
                        return 0;
                      }
                    })() : X;
                    if (Te >= 1 && Te <= 5 && ie < e) {
                      const Je = e - ie, Ve = Math.floor(Je / 60), Wt = Je % 60;
                      M = Ve > 0 ? `Opens in ${Ve}h ${Wt}m` : `Opens in ${Wt} minutes`;
                    }
                  }
                }
                let ce = 0;
                if (!H && m && O > e) {
                  let ie = A;
                  if (d)
                    try {
                      const Te = Kl(d), Ve = new Intl.DateTimeFormat("en-GB", { timeZone: Te.timezone, hour: "numeric", minute: "numeric", hour12: !1 }).formatToParts(a), Wt = parseInt(Ve.find((Ut) => Ut.type === "hour")?.value || "0"), yn = parseInt(Ve.find((Ut) => Ut.type === "minute")?.value || "0");
                      ie = Wt * 60 + yn;
                    } catch {
                    }
                  ce = Math.max(0, Math.min(1, (ie - e) / (O - e)));
                }
                const Ae = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][X], Q = typeof document < "u" && document.documentElement.classList.contains("dark"), Be = Q ? "rgba(22, 25, 35, 0.98)" : "rgba(255, 255, 255, 0.98)", G = Q ? "rgba(55, 60, 75, 0.6)" : "rgba(210, 215, 225, 0.8)", Ie = Q ? "#7b8094" : "#6b7280", ze = Q ? "#a0a6b8" : "#374151", We = Q ? "#2a2e3a" : "#e5e7eb";
                return /* @__PURE__ */ t.jsxs(
                  "div",
                  {
                    ref: uo,
                    className: "relative",
                    children: [
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (ie) => {
                            ie.stopPropagation(), nr((Te) => !Te);
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
                      rl && /* @__PURE__ */ t.jsxs(
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
                              M && /* @__PURE__ */ t.jsx("p", { style: { color: Ie, fontSize: 12, margin: "4px 0 0 16px", lineHeight: 1.3 }, children: M })
                            ] }),
                            !H && p === "stock" && /* @__PURE__ */ t.jsxs("div", { style: { padding: "6px 16px 10px" }, children: [
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Ie, fontSize: 9, fontWeight: 700, letterSpacing: 1.2, fontFamily: '"SF Mono", Consolas, monospace' }, children: Ae }),
                                /* @__PURE__ */ t.jsx("div", { style: { flex: 1, height: 5, borderRadius: 3, background: We, overflow: "hidden", position: "relative" }, children: m && /* @__PURE__ */ t.jsx(
                                  "div",
                                  {
                                    style: {
                                      position: "absolute",
                                      left: 0,
                                      top: 0,
                                      height: "100%",
                                      width: `${ce * 100}%`,
                                      background: `linear-gradient(90deg, ${K}aa, ${K})`,
                                      borderRadius: 3,
                                      transition: "width 1s ease"
                                    }
                                  }
                                ) })
                              ] }),
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 10, color: Ie, fontFamily: '"SF Mono", Consolas, monospace' }, children: [
                                /* @__PURE__ */ t.jsx("span", { children: v.split("–")[0]?.trim() }),
                                /* @__PURE__ */ t.jsx("span", { children: v.split("–")[1]?.trim() })
                              ] })
                            ] }),
                            /* @__PURE__ */ t.jsx("div", { style: { height: 1, background: G, margin: "0 12px" } }),
                            /* @__PURE__ */ t.jsxs("div", { style: { padding: "10px 16px 14px" }, children: [
                              f && /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Ie }, children: "Exchange timezone" }),
                                /* @__PURE__ */ t.jsx("span", { style: { color: ze, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: f })
                              ] }),
                              v && p !== "stock" && /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Ie }, children: "Session" }),
                                /* @__PURE__ */ t.jsx("span", { style: { color: ze, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: v })
                              ] }),
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Ie }, children: "Local time" }),
                                /* @__PURE__ */ t.jsxs("span", { style: { color: ze, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: [
                                  x,
                                  ":",
                                  V,
                                  " ",
                                  u ? "BST" : "GMT"
                                ] })
                              ] }),
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Ie }, children: "Update frequency" }),
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
        zn && r && re && (() => {
          const a = {
            bollinger: () => fo,
            movingAverages: () => po,
            vwap: () => xo,
            volumeProfile: () => mo,
            volume: () => bo
          }, p = Fu().map((b) => ({
            key: b,
            title: zl(b),
            enabledCheck: () => b === "volume" ? !!(r?.volume?.enabled && s.some((w) => w.volume)) : b === "volumeProfile" ? !!r?.volumeProfile?.enabled : !!(r?.[b]?.enabled && l?.[b]),
            endXSource: a[b] ?? (() => rt[b] || 0)
          })), m = Oe.toolbarLineHeight;
          let v = Oe.toolbarStartY;
          const f = [], e = r?.customBrueScripts || {};
          for (const b of p) {
            if (!b.enabledCheck()) continue;
            if (b.key !== "movingAverages") {
              const u = r?.[b.key]?.sourceScriptId;
              if (u && e[u]?.enabled) continue;
            }
            const w = Hs.current[b.key] || b.endXSource() || 150;
            if (b.key === "movingAverages" && l?.movingAverages?.length > 0) {
              const u = r.movingAverages?.lines ?? [], N = r?.customBrueScripts || {};
              for (let x = 0; x < l.movingAverages.length; x++) {
                const V = u[x]?.sourceScriptId;
                if (V && N[V]?.enabled) continue;
                const d = `movingAverages__${x}`, M = v;
                v += m;
                const ce = St === d, Ae = u[x], Q = Ae ? `${Ae.type} ${Ae.period}` : "MA", Be = () => {
                  const G = u.filter((Ie, ze) => ze !== x);
                  re({
                    ...r,
                    movingAverages: {
                      ...r.movingAverages,
                      enabled: G.length > 0,
                      lines: G
                    }
                  }), ve(null), de(null);
                };
                f.push(
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      className: "absolute z-20 flex items-center",
                      style: { left: 0, top: M - Oe.toolbarRowYOffset, height: m },
                      onMouseEnter: () => {
                        ve(d), tn.current = !0, pt.current && clearTimeout(pt.current);
                      },
                      onMouseLeave: () => {
                        pt.current = setTimeout(() => {
                          ve((G) => G === d ? null : G), tn.current = !1;
                        }, 150);
                      },
                      children: [
                        ce && /* @__PURE__ */ t.jsx(
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
                              G.stopPropagation(), de((Ie) => Ie === d ? null : d), ve(d);
                            },
                            onContextMenu: (G) => {
                              G.preventDefault(), G.stopPropagation(), de(d), vt({ visible: !0, x: G.clientX, y: G.clientY, key: d, title: Q });
                            }
                          }
                        ),
                        ce && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (G) => {
                                G.stopPropagation(), Be();
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                              title: `Hide ${Q}`,
                              children: /* @__PURE__ */ t.jsx(Ul, { className: "w-[15px] h-[15px]" })
                            }
                          ),
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (G) => {
                                G.stopPropagation(), Vs({ type: "movingAverages", position: { x: w, y: M } });
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                              title: `${Q} Settings`,
                              children: /* @__PURE__ */ t.jsx(ql, { className: "w-[15px] h-[15px]" })
                            }
                          ),
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (G) => {
                                G.stopPropagation(), Be();
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors",
                              title: `Remove ${Q}`,
                              children: /* @__PURE__ */ t.jsx(Gl, { className: "w-[15px] h-[15px]" })
                            }
                          ),
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (G) => {
                                G.stopPropagation(), de(d), vt({ visible: !0, x: G.clientX, y: G.clientY, key: d, title: Q });
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                              title: "More options",
                              children: /* @__PURE__ */ t.jsx(Zl, { className: "w-[15px] h-[15px]" })
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
            const X = St === b.key;
            X || b.key, f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: {
                    left: 0,
                    top: A - Oe.toolbarRowYOffset,
                    height: m
                  },
                  onMouseEnter: () => {
                    ve(b.key), tn.current = !0, pt.current && clearTimeout(pt.current);
                  },
                  onMouseLeave: () => {
                    pt.current = setTimeout(() => {
                      ve((u) => u === b.key ? null : u), tn.current = !1;
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
                          u.stopPropagation(), de((N) => N === b.key ? null : b.key), ve(b.key);
                        },
                        onContextMenu: (u) => {
                          u.preventDefault(), u.stopPropagation(), de(b.key), vt({ visible: !0, x: u.clientX, y: u.clientY, key: b.key, title: b.title });
                        }
                      }
                    ),
                    X && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation();
                            const N = r[b.key];
                            N && re({ ...r, [b.key]: { ...N, enabled: !1 } }), ve(null), de(null);
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                          title: `Hide ${b.title}`,
                          children: /* @__PURE__ */ t.jsx(Ul, { className: "w-[15px] h-[15px]" })
                        }
                      ),
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation(), Vs({ type: b.key, position: { x: w, y: A } });
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                          title: `${b.title} Settings`,
                          children: /* @__PURE__ */ t.jsx(ql, { className: "w-[15px] h-[15px]" })
                        }
                      ),
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation();
                            const N = r[b.key];
                            N && re({ ...r, [b.key]: { ...N, enabled: !1 } }), ve(null), de(null);
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors",
                          title: `Remove ${b.title}`,
                          children: /* @__PURE__ */ t.jsx(Gl, { className: "w-[15px] h-[15px]" })
                        }
                      ),
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation(), de(b.key), vt({ visible: !0, x: u.clientX, y: u.clientY, key: b.key, title: b.title });
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                          title: "More options",
                          children: /* @__PURE__ */ t.jsx(Zl, { className: "w-[15px] h-[15px]" })
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
            const w = `custom_overlay_${b.id}`, A = Hs.current[w] || rt[w] || 150, X = v;
            v += m;
            const u = `ci-${b.id}`, N = St === u, x = typeof b.expression == "string" && b.expression.startsWith("local:"), V = x ? b.group || b.expression.split(":")[1] || b.name : null, d = () => {
              x ? Le?.(V) : re && re({
                ...r,
                customIndicators: (r.customIndicators || []).filter((M) => M.id !== b.id)
              }), ve(null), de(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: X - Oe.toolbarRowYOffset, height: m },
                  onMouseEnter: () => {
                    ve(u), tn.current = !0, pt.current && clearTimeout(pt.current);
                  },
                  onMouseLeave: () => {
                    pt.current = setTimeout(() => {
                      ve((M) => M === u ? null : M), tn.current = !1;
                    }, 150);
                  },
                  children: [
                    N && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: A + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: A, height: 16 },
                        onClick: (M) => {
                          M.stopPropagation(), de((ce) => ce === u ? null : u), ve(u);
                        },
                        onContextMenu: (M) => {
                          M.preventDefault(), M.stopPropagation(), de(u), vt({
                            visible: !0,
                            x: M.clientX,
                            y: M.clientY,
                            key: w,
                            title: x && V || b.name,
                            custom: x ? { kind: "engine", label: V } : { kind: "formula", ciId: b.id }
                          });
                        }
                      }
                    ),
                    N && Fl({
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
            const A = `script_${b}`, X = Hs.current[A] || rt[A] || 150, u = v;
            v += m;
            const N = `script-${b}`, x = St === N, V = r?.customBrueScripts?.[b]?.name || w.name || "Brue script", d = () => {
              xe?.(b), ve(null), de(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: u - Oe.toolbarRowYOffset, height: m },
                  onMouseEnter: () => {
                    ve(N), tn.current = !0, pt.current && clearTimeout(pt.current);
                  },
                  onMouseLeave: () => {
                    pt.current = setTimeout(() => {
                      ve((M) => M === N ? null : M), tn.current = !1;
                    }, 150);
                  },
                  children: [
                    x && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: X + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: X, height: 16 },
                        onClick: (M) => {
                          M.stopPropagation(), de((ce) => ce === N ? null : N), ve(N);
                        },
                        onContextMenu: (M) => {
                          M.preventDefault(), M.stopPropagation(), de(N), vt({
                            visible: !0,
                            x: M.clientX,
                            y: M.clientY,
                            key: A,
                            title: V,
                            custom: { kind: "brue", sid: b }
                          });
                        }
                      }
                    ),
                    x && Fl({
                      kind: "brue",
                      label: V,
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
          const _ = r?.customBrueScripts || {};
          for (const b of Object.keys(_)) {
            const w = _[b];
            if (!w?.enabled || H.has(b)) continue;
            const A = `script_${b}`, X = Hs.current[A] || rt[A] || 150, u = v;
            v += m;
            const N = `script-${b}`, x = St === N, V = w.name || "Brue script", d = () => {
              xe?.(b), ve(null), de(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: u - Oe.toolbarRowYOffset, height: m },
                  onMouseEnter: () => {
                    ve(N), tn.current = !0, pt.current && clearTimeout(pt.current);
                  },
                  onMouseLeave: () => {
                    pt.current = setTimeout(() => {
                      ve((M) => M === N ? null : M), tn.current = !1;
                    }, 150);
                  },
                  children: [
                    x && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: X + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: X, height: 16 },
                        onClick: (M) => {
                          M.stopPropagation(), de((ce) => ce === N ? null : N), ve(N);
                        },
                        onContextMenu: (M) => {
                          M.preventDefault(), M.stopPropagation(), de(N), vt({
                            visible: !0,
                            x: M.clientX,
                            y: M.clientY,
                            key: A,
                            title: V,
                            custom: { kind: "brue", sid: b }
                          });
                        }
                      }
                    ),
                    x && Fl({
                      kind: "brue",
                      label: V,
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
        r && re && (() => {
          const a = Wr().map((m) => ({ key: m, title: zl(m) })), p = r?.customBrueScripts || {};
          return a.map(({ key: m, title: v }) => {
            const f = en.current[m];
            if (!l?.[m] || !f) return null;
            const O = r?.[m]?.sourceScriptId;
            if (O && p[O]?.enabled) return null;
            const H = On.current[m] || sr[m] || 150, K = `sp-${m}`, _ = St === K;
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
                  ve(K), tn.current = !0, pt.current && clearTimeout(pt.current);
                },
                onMouseLeave: () => {
                  pt.current = setTimeout(() => {
                    ve((b) => b === K ? null : b), tn.current = !1;
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
                        b.stopPropagation(), de((w) => w === K ? null : K), ve(K);
                      },
                      onContextMenu: (b) => {
                        b.preventDefault(), b.stopPropagation(), de(K), vt({ visible: !0, x: b.clientX, y: b.clientY, key: m, title: v });
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
                          w && re({ ...r, [m]: { ...w, enabled: !1 } }), ve(null), de(null);
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: `Hide ${v}`,
                        children: /* @__PURE__ */ t.jsx(Ul, { className: "w-[15px] h-[15px]" })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (b) => {
                          b.stopPropagation(), Vs({ type: m, position: { x: H, y: f.top } });
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: `${v} Settings`,
                        children: /* @__PURE__ */ t.jsx(ql, { className: "w-[15px] h-[15px]" })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (b) => {
                          b.stopPropagation();
                          const w = r[m];
                          w && re({ ...r, [m]: { ...w, enabled: !1 } }), ve(null), de(null);
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors",
                        title: `Remove ${v}`,
                        children: /* @__PURE__ */ t.jsx(Gl, { className: "w-[15px] h-[15px]" })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (b) => {
                          b.stopPropagation(), de(K), vt({ visible: !0, x: b.clientX, y: b.clientY, key: m, title: v });
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: "More options",
                        children: /* @__PURE__ */ t.jsx(Zl, { className: "w-[15px] h-[15px]" })
                      }
                    )
                  ] })
                ]
              },
              `sp-row-${m}`
            );
          });
        })(),
        r && re && (() => {
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
              remove: () => xe?.(e)
            });
          for (const [e, O] of m.entries())
            f.push({
              rowKey: `engine-sp-${e}`,
              firstPlot: O,
              label: e,
              kind: "engine",
              handle: e,
              remove: () => Le?.(e)
            });
          for (const { rowKey: e, firstPlot: O, label: H, kind: K, handle: _, remove: b } of f) {
            const w = en.current[`custom_${O.id}`];
            if (!w) continue;
            const A = St === e, X = 200, u = () => {
              b(), ve(null), de(null);
            };
            v.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: w.top + 2, height: 16 },
                  onMouseEnter: () => {
                    ve(e), tn.current = !0, pt.current && clearTimeout(pt.current);
                  },
                  onMouseLeave: () => {
                    pt.current = setTimeout(() => {
                      ve((N) => N === e ? null : N), tn.current = !1;
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
                          N.stopPropagation(), de((x) => x === e ? null : e), ve(e);
                        },
                        onContextMenu: (N) => {
                          N.preventDefault(), N.stopPropagation(), de(e), vt({
                            visible: !0,
                            x: N.clientX,
                            y: N.clientY,
                            key: `custom_${O.id}`,
                            title: H,
                            custom: K === "engine" ? { kind: "engine", label: _ } : { kind: "brue", sid: _ }
                          });
                        }
                      }
                    ),
                    A && Fl({
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
            ref: Pa,
            className: "absolute top-0 cursor-ns-resize z-40",
            style: {
              right: 0,
              width: He,
              height: yr
            },
            onMouseDown: ya,
            onTouchStart: ka,
            title: "Drag to stretch/compress, Scroll to pan up/down"
          }
        ),
        /* @__PURE__ */ t.jsx(
          "div",
          {
            className: "absolute z-10 flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity duration-200",
            style: {
              bottom: yt + 8,
              left: `calc(50% - ${He / 2}px)`,
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
                  onClick: pa,
                  className: "w-8 h-7 lg:w-10 lg:h-9 flex items-center justify-center hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all text-lg lg:text-xl font-light border-r border-border/30",
                  title: "Zoom in (show fewer candles)",
                  children: "+"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: ga,
                  className: "w-7 h-7 lg:w-9 lg:h-9 flex items-center justify-center hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all text-base lg:text-lg border-r border-border/30",
                  title: "Move left (older)",
                  children: "‹"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: va,
                  className: "w-7 h-7 lg:w-9 lg:h-9 flex items-center justify-center hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all text-base lg:text-lg border-r border-border/30",
                  title: "Move right (newer)",
                  children: "›"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: ma,
                  className: "w-8 h-7 lg:w-10 lg:h-9 flex items-center justify-center hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all",
                  title: "Reset view",
                  children: /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 14 14", className: "w-3.5 h-3.5 lg:w-4 lg:h-4", fill: "currentColor", children: /* @__PURE__ */ t.jsx("path", { d: "M7 1.5c-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5c2.41 0 4.46-1.55 5.2-3.71l-1.41-.49c-.53 1.51-1.96 2.6-3.79 2.6-2.13 0-3.9-1.77-3.9-3.9s1.77-3.9 3.9-3.9c1.08 0 2.05.44 2.75 1.15L8 6h4.5V1.5L10.96 3C9.93 1.97 8.54 1.5 7 1.5z" }) })
                }
              )
            ] })
          }
        ),
        cs && /* @__PURE__ */ t.jsx(
          "div",
          {
            className: "absolute z-50 flex items-center justify-center",
            style: {
              top: 4,
              // Desktop reserves the RIGHT_TOOLBAR_WIDTH gap because the price
              // axis carries the right toolbar overlay; phone/tablet have no
              // overlay, so the reset button uses the full axis width.
              right: Dn ?? (Oe.yAxisResetUsesToolbarGap ? _o : 0),
              width: Dn !== void 0 ? He - Dn : Oe.yAxisResetUsesToolbarGap ? He - _o : He
            },
            children: /* @__PURE__ */ t.jsxs(
              "button",
              {
                onClick: ba,
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
              top: yr - 6,
              right: He,
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
        al && r && re && fe && /* @__PURE__ */ t.jsx(
          Ou,
          {
            type: al.type,
            config: r,
            onConfigChange: re,
            position: al.position,
            onClose: () => Vs(null)
          }
        ),
        Pn && Pn.visible && r && re && (() => {
          const a = qe.current?.getBoundingClientRect();
          if (!a) return null;
          const p = Pn.x - a.left, m = Pn.y - a.top, v = Pn.key, f = Pn.custom, e = () => {
            f?.kind === "brue" ? xe?.(f.sid) : f?.kind === "engine" ? Le?.(f.label) : f?.kind === "formula" && re({
              ...r,
              customIndicators: (r.customIndicators || []).filter((O) => O.id !== f.ciId)
            });
          };
          return Ar.createPortal(
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
                    left: Math.min(Pn.x, window.innerWidth - 170),
                    top: Math.min(Pn.y, window.innerHeight - 140)
                  },
                  children: [
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        style: { position: "fixed", inset: 0, zIndex: -1 },
                        onClick: () => {
                          vt(null), de(null);
                        },
                        onContextMenu: (w) => {
                          w.preventDefault(), vt(null), de(null);
                        }
                      }
                    ),
                    /* @__PURE__ */ t.jsx("div", { style: {
                      padding: "5px 10px 3px",
                      fontSize: "11px",
                      color: H,
                      whiteSpace: "nowrap"
                    }, children: Pn.title }),
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
                          Vs({ type: v, position: { x: p, y: m } }), vt(null);
                        },
                        children: "Settings..."
                      }
                    ),
                    f?.kind === "engine" && Qe && /* @__PURE__ */ t.jsx(
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
                          Qe(f.label), vt(null);
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
                          w && re({ ...r, [v]: { ...w, enabled: !1 } }), vt(null), de(null);
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
                            w && re({ ...r, [v]: { ...w, enabled: !1 } });
                          }
                          vt(null), de(null);
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
function zs({ children: s, size: n = 28, active: h = !1, title: T, onClick: I }) {
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
        /* @__PURE__ */ t.jsx("svg", { width: 14, height: 14, viewBox: "-1 -1 2 2", className: "overflow-visible", children: /* @__PURE__ */ t.jsx("g", { stroke: "currentColor", strokeWidth: 0.14, fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: s }) })
      ]
    }
  );
}
function cd({ tool: s }) {
  switch (s) {
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
function gl({ type: s }) {
  switch (s) {
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
  activeTool: s = "cursor",
  onToolSelect: n,
  magnet: h = !1,
  onToggleMagnet: T,
  hiddenAll: I = !1,
  onToggleHidden: te,
  onClearAll: se,
  collapsed: Me = !1,
  onToggleCollapsed: r
}) {
  const [re, xe] = o.useState(!1), Le = Me ? 14 : 40;
  return Me ? /* @__PURE__ */ t.jsxs(
    "div",
    {
      className: "flex flex-col items-center bg-[#2a2a2a] border-r border-[#3a3a3a] shrink-0",
      style: { width: Le, minWidth: Le },
      children: [
        /* @__PURE__ */ t.jsx("div", { className: "h-1" }),
        /* @__PURE__ */ t.jsx(zs, { size: 28, title: "Show drawing tools", onClick: () => r?.(), children: /* @__PURE__ */ t.jsx(gl, { type: "chevronRight" }) })
      ]
    }
  ) : /* @__PURE__ */ t.jsxs(
    "div",
    {
      className: "flex flex-col bg-[#2a2a2a] border-r border-[#3a3a3a] shrink-0 select-none",
      style: { width: Le, minWidth: Le },
      children: [
        /* @__PURE__ */ t.jsx("div", { className: "h-1 shrink-0" }),
        /* @__PURE__ */ t.jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden flex flex-col items-center gap-[2px] px-0 py-1 scrollbar-thin", children: rd.map((Qe, Ee) => /* @__PURE__ */ t.jsxs(yc.Fragment, { children: [
          Ee > 0 && /* @__PURE__ */ t.jsx("div", { className: "w-[26px] h-px bg-[#3a3a3a] my-[5px] shrink-0" }),
          Qe.tools.map((De) => /* @__PURE__ */ t.jsx(
            zs,
            {
              active: s === De,
              title: ad[De],
              onClick: () => {
                n?.(s === De ? "cursor" : De);
              },
              children: /* @__PURE__ */ t.jsx(cd, { tool: De })
            },
            De
          ))
        ] }, Ee)) }),
        /* @__PURE__ */ t.jsxs("div", { className: "shrink-0 flex flex-col items-center gap-[2px] pb-1", children: [
          /* @__PURE__ */ t.jsx("div", { className: "w-[26px] h-px bg-[#3a3a3a] my-[5px]" }),
          /* @__PURE__ */ t.jsx(zs, { active: h, title: "Magnet (snap to OHLC)", onClick: () => T?.(), children: /* @__PURE__ */ t.jsx(gl, { type: "magnet" }) }),
          /* @__PURE__ */ t.jsx(zs, { active: I, title: I ? "Show drawings" : "Hide all drawings", onClick: () => te?.(), children: /* @__PURE__ */ t.jsx(gl, { type: I ? "eyeOff" : "eye" }) }),
          /* @__PURE__ */ t.jsx(zs, { title: "Remove all drawings", onClick: () => xe(!0), children: /* @__PURE__ */ t.jsx(gl, { type: "trash" }) }),
          /* @__PURE__ */ t.jsx(zs, { title: "Hide drawing toolbar", onClick: () => r?.(), children: /* @__PURE__ */ t.jsx(gl, { type: "chevronLeft" }) })
        ] }),
        re && /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/40", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-[#262626] border border-[#3a3a3a] rounded-[3px] p-3 w-[200px] shadow-xl", children: [
          /* @__PURE__ */ t.jsx("div", { className: "text-[11px] text-[#e8e8e8] font-medium mb-3", children: "Remove all drawings?" }),
          /* @__PURE__ */ t.jsxs("div", { className: "flex gap-2 justify-end", children: [
            /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: () => xe(!1),
                className: "px-3 py-1 text-[11px] bg-[#2a2a2a] border border-[#3a3a3a] text-[#b9b9b9] rounded-[2px] hover:bg-[#343434]",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: () => {
                  se?.(), xe(!1);
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
const $o = [
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
  value: s,
  onChange: n
}) {
  const [h, T] = o.useState(!1), I = o.useRef(null);
  o.useEffect(() => {
    const se = (Me) => {
      I.current && !I.current.contains(Me.target) && T(!1);
    };
    return document.addEventListener("mousedown", se), () => document.removeEventListener("mousedown", se);
  }, []);
  const te = $o.find((se) => se.id === s) || $o[0];
  return /* @__PURE__ */ t.jsxs("div", { ref: I, className: "relative", children: [
    /* @__PURE__ */ t.jsxs(
      "button",
      {
        onClick: () => T((se) => !se),
        className: "flex items-center gap-1 px-2 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8] hover:bg-[#343434]",
        children: [
          /* @__PURE__ */ t.jsx("span", { className: "font-medium", children: te.label }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[8px] opacity-60", children: "▾" })
        ]
      }
    ),
    h && /* @__PURE__ */ t.jsx("div", { className: "absolute top-full left-0 mt-1 z-30 w-[200px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl py-1", children: $o.map((se) => /* @__PURE__ */ t.jsxs(
      "button",
      {
        onClick: () => {
          n(se.id), T(!1);
        },
        className: `w-full text-left px-3 py-1.5 text-[11px] flex flex-col hover:bg-[#343434] ${s === se.id ? "bg-[#343434] text-[#e8e8e8]" : "text-[#b9b9b9]"}`,
        children: [
          /* @__PURE__ */ t.jsx("span", { className: "font-medium", children: se.label }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[9px] opacity-60", children: se.desc })
        ]
      },
      se.id
    )) })
  ] });
}
const Vt = [
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
  value: s,
  onChange: n,
  favs: h,
  onToggleFav: T
}) {
  const [I, te] = o.useState(!1), [se, Me] = o.useState(""), r = o.useRef(null);
  o.useEffect(() => {
    const B = (q) => {
      r.current && !r.current.contains(q.target) && te(!1);
    };
    return document.addEventListener("mousedown", B), () => document.removeEventListener("mousedown", B);
  }, []);
  const re = (B) => {
    const q = B.trim();
    if (!q) return null;
    if (q.toLowerCase() === "tick") return Vt.find((Ye) => Ye.label === "tick") || { label: "tick", ms: 0, sec: 0 };
    if (q === "1M" || q.toLowerCase() === "1mth" || q.toLowerCase() === "1mo")
      return Vt.find((Ye) => Ye.label === "1M");
    const Ce = q.match(/^(\d+)(s|m|h|d|w|M)$/i);
    if (!Ce) return null;
    const be = parseInt(Ce[1], 10);
    if (!(be > 0)) return null;
    const J = Ce[2], Ue = J.toLowerCase();
    let he = 0;
    if (J === "M") he = be * 2592e6;
    else if (Ue === "s") he = be * 1e3;
    else if (Ue === "m") he = be * 6e4;
    else if (Ue === "h") he = be * 36e5;
    else if (Ue === "d") he = be * 864e5;
    else if (Ue === "w") he = be * 6048e5;
    else return null;
    if (he < 1e3 && q.toLowerCase() !== "tick" && he === 0 || he > 31536e6) return null;
    const xt = J === "M" ? `${be}M` : `${be}${Ue === "d" ? "d" : Ue === "w" ? "w" : Ue}`;
    return { label: J === "M" ? `${be}M` : Ue === "d" && J === "D" ? `${be}D` : Ue === "w" && J === "W" ? `${be}W` : xt, ms: he, sec: Math.floor(he / 1e3) };
  }, xe = (B) => h.has(B) || h.has(B.toLowerCase()) || h.has(B.toUpperCase()), Le = Vt.filter((B) => h.has(B.label)), Qe = ["1m", "5m", "15m", "1h", "4h", "1D"], De = (Le.length ? Le.map((B) => B.label).slice(0, 6) : Qe).filter((B, q, Ce) => Ce.indexOf(B) === q), ye = (B) => {
    n(B), te(!1);
  }, Fe = (B) => B ? B === "1M" ? "1M" : B.toLowerCase() : "", Pe = Fe(s.label);
  return /* @__PURE__ */ t.jsxs("div", { ref: r, className: "relative", style: { overflow: "visible" }, children: [
    /* @__PURE__ */ t.jsxs(
      "div",
      {
        className: "flex items-center gap-3 px-2 py-1 border border-[#3a3a3a] rounded bg-[#262626] text-[11px] font-mono cursor-pointer select-none overflow-visible",
        onClick: () => te((B) => !B),
        title: "Click to drop timeframe panel — exact EdgeDepth full list tick 1s 15s 30s 1m 3m 5m 15m 30m 1h 2h 4h 8h 12h 1d 3d 1w 1M + Custom",
        children: [
          De.map((B) => {
            const q = Vt.find((be) => be.label === B) || Vt.find((be) => be.label.toLowerCase() === B.toLowerCase()), Ce = q ? Fe(q.label) === Pe || B.toLowerCase() === "1d" && (Pe === "1d" || Pe === "1D") : !1;
            return /* @__PURE__ */ t.jsx(
              "span",
              {
                onClick: (be) => {
                  be.stopPropagation(), q && ye(q);
                },
                className: `pb-0.5 border-b-[2px] ${Ce ? "border-[#e8e8e8] text-[#e8e8e8]" : "border-transparent text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                children: B
              },
              B
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
              Le.length,
              "/6 · FULL BAR"
            ] })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { className: "px-3 py-2 space-y-3 bg-[#0a0a0a] max-h-[65vh] overflow-auto", children: [
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] tracking-wider mb-1.5", children: "TICKS" }),
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-4 text-[11px] flex-wrap", children: ["tick"].map((B) => {
                const q = Vt.find((J) => J.label === B), Ce = q ? Fe(q.label) === Pe : !1, be = xe(B);
                return /* @__PURE__ */ t.jsxs(
                  "button",
                  {
                    onClick: () => {
                      q && ye(q);
                    },
                    onContextMenu: (J) => {
                      J.preventDefault(), T(B);
                    },
                    className: `flex items-center gap-0.5 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    title: "Tick chart — one bar per trade, click sets chart",
                    children: [
                      B,
                      " ",
                      be && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
                    ]
                  },
                  B
                );
              }) })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [
                /* @__PURE__ */ t.jsx("span", { className: "text-[10px] text-[#b9b9b9] tracking-wider", children: "SECONDS" }),
                /* @__PURE__ */ t.jsx("span", { className: "text-[9px] px-1 py-0.5 bg-[#1e2a2a] border border-[#21b3a4]/30 text-[#21b3a4] rounded flex items-center gap-0.5", children: "🔒 PRO" })
              ] }),
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-3 text-[11px] flex-wrap", children: ["1s", "5s", "15s", "30s"].map((B) => {
                const q = Vt.find((J) => J.label === B), Ce = q ? Fe(q.label) === Pe : !1, be = xe(B);
                return /* @__PURE__ */ t.jsxs(
                  "button",
                  {
                    onClick: () => {
                      q && ye(q);
                    },
                    onContextMenu: (J) => {
                      J.preventDefault(), T(B);
                    },
                    className: `flex items-center gap-0.5 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    title: "SECONDS PRO — click sets, right-click pins",
                    children: [
                      B,
                      " ",
                      be && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" }),
                      " ",
                      /* @__PURE__ */ t.jsx("span", { className: "text-[8px] opacity-50", children: "🔒" })
                    ]
                  },
                  B
                );
              }) })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] tracking-wider mb-1.5", children: "MINUTES" }),
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-3 text-[11px] flex-wrap", children: ["1m", "3m", "5m", "15m", "30m"].map((B) => {
                const q = Vt.find((J) => J.label === B), Ce = q ? Fe(q.label) === Pe : !1, be = xe(B);
                return /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    onClick: () => {
                      q && ye(q);
                    },
                    onContextMenu: (J) => {
                      J.preventDefault(), T(B);
                    },
                    className: `flex flex-col items-center gap-0.5 pb-0.5 border-b-[2px] ${Ce ? "border-[#e8e8e8] text-[#e8e8e8]" : "border-transparent text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    title: "Click sets chart, right-click pins to bar (max 6)",
                    children: /* @__PURE__ */ t.jsxs("span", { className: "flex items-center gap-0.5", children: [
                      B,
                      " ",
                      be && /* @__PURE__ */ t.jsx("span", { className: "text-[8px] text-[#e8e8e8]", children: "★" })
                    ] })
                  },
                  B
                );
              }) })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] tracking-wider mb-1.5", children: "HOURS" }),
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-3 text-[11px] flex-wrap", children: ["1h", "2h", "4h", "6h", "8h", "12h"].map((B) => {
                const q = Vt.find((J) => J.label === B), Ce = q ? Fe(q.label) === Pe : !1, be = xe(B);
                return /* @__PURE__ */ t.jsxs(
                  "button",
                  {
                    onClick: () => {
                      q && ye(q);
                    },
                    onContextMenu: (J) => {
                      J.preventDefault(), T(B);
                    },
                    className: `flex items-center gap-0.5 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    children: [
                      B,
                      " ",
                      be && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
                    ]
                  },
                  B
                );
              }) })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] tracking-wider mb-1.5", children: "DAYS" }),
              /* @__PURE__ */ t.jsxs("div", { className: "flex gap-3 text-[11px] flex-wrap", children: [
                ["1d", "3d", "1w"].map((B) => {
                  const q = Vt.find((J) => J.label === B), Ce = q ? Fe(q.label) === Pe : !1, be = xe(B);
                  return /* @__PURE__ */ t.jsxs(
                    "button",
                    {
                      onClick: () => {
                        q && ye(q);
                      },
                      onContextMenu: (J) => {
                        J.preventDefault(), T(B);
                      },
                      className: `flex items-center gap-0.5 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                      children: [
                        B,
                        " ",
                        be && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
                      ]
                    },
                    B
                  );
                }),
                ["1D", "1W"].map((B) => {
                  const q = Vt.find((J) => J.label === B), Ce = q ? Fe(q.label) === Pe : !1, be = xe(B);
                  return /* @__PURE__ */ t.jsxs(
                    "button",
                    {
                      onClick: () => {
                        q && ye(q);
                      },
                      onContextMenu: (J) => {
                        J.preventDefault(), T(B);
                      },
                      className: `flex items-center gap-0.5 opacity-70 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                      title: "Alias — same as lowercase",
                      children: [
                        B,
                        " ",
                        be && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
                      ]
                    },
                    B
                  );
                })
              ] })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] tracking-wider mb-1.5", children: "MONTHS" }),
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-3 text-[11px] flex-wrap", children: ["1M"].map((B) => {
                const q = Vt.find((J) => J.label === B), Ce = q ? q.label === s.label || s.label === "1M" : !1, be = xe(B);
                return /* @__PURE__ */ t.jsxs(
                  "button",
                  {
                    onClick: () => {
                      q && ye(q);
                    },
                    onContextMenu: (J) => {
                      J.preventDefault(), T(B);
                    },
                    className: `flex items-center gap-0.5 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    children: [
                      B,
                      " ",
                      be && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
                    ]
                  },
                  B
                );
              }) })
            ] }),
            /* @__PURE__ */ t.jsx("div", { className: "text-[8px] text-[#5a5a5a] tracking-wider pt-2 border-t border-[#1e1e1e]", children: "CLICK SETS THE CHART · RIGHT-CLICK PINS IT TO THE BAR (MAX 6) · FULL LIST tick 1s 15s 30s 1m 3m 5m 15m 30m 1h 2h 4h 8h 12h 1d 3d 1w 1M" }),
            /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2 pt-1 border-t border-[#1e1e1e] mt-2", children: [
              /* @__PURE__ */ t.jsx("span", { className: "text-[11px] text-[#b9b9b9] shrink-0", children: "Custom" }),
              /* @__PURE__ */ t.jsx(
                "input",
                {
                  value: se,
                  onChange: (B) => Me(B.target.value),
                  onKeyDown: (B) => {
                    if (B.key === "Enter") {
                      const q = re(se);
                      q && ye(q);
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
                    const B = re(se);
                    B && ye(B);
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
  settings: s,
  onChange: n,
  onClose: h
}) {
  const T = (I) => n({ ...s, ...I });
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
            className: `flex-1 py-1 rounded border text-[10px] capitalize ${s.marketColors === I ? "bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]" : "border-[#3a3a3a] bg-[#2a2a2a] text-[#b9b9b9] hover:bg-[#343434]"}`,
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
            className: `flex-1 py-1 rounded border text-[10px] capitalize ${s.accent === I ? "bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]" : "border-[#3a3a3a] bg-[#2a2a2a] text-[#b9b9b9] hover:bg-[#343434]"}`,
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
              className: `flex-1 py-1 rounded border text-[10px] capitalize ${s.liqColormap === I ? "bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]" : "border-[#3a3a3a] bg-[#2a2a2a] text-[#b9b9b9] hover:bg-[#343434]"}`,
              children: I
            },
            I
          )) }),
          /* @__PURE__ */ t.jsx("div", { className: "text-[9px] text-[#b9b9b9] mt-2", children: "Orderbook" }),
          /* @__PURE__ */ t.jsx("div", { className: "flex gap-1", children: ["orderbook", "deepdom", "bookmap", "realtime", "realtime_warm"].map((I) => /* @__PURE__ */ t.jsx(
            "button",
            {
              onClick: () => T({ obColormap: I }),
              className: `flex-1 py-1 rounded border text-[10px] capitalize ${s.obColormap === I ? "bg-[#d0d0d0] border-[#d0d0d0] text-[#1c1c1c]" : "border-[#3a3a3a] bg-[#2a2a2a] text-[#b9b9b9] hover:bg-[#343434]"}`,
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
            Math.round(s.opacity * 100),
            "%"
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 0.1, max: 1, step: 0.05, value: s.opacity, onChange: (I) => T({ opacity: parseFloat(I.target.value) }), className: "accent-[#d0d0d0]" })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Intensity ",
            s.intensity.toFixed(2)
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 0.1, max: 3, step: 0.1, value: s.intensity, onChange: (I) => T({ intensity: parseFloat(I.target.value) }), className: "accent-[#d0d0d0]" })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Gamma ",
            s.gamma.toFixed(2)
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 0.5, max: 2.5, step: 0.1, value: s.gamma, onChange: (I) => T({ gamma: parseFloat(I.target.value) }), className: "accent-[#d0d0d0]" })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Noise floor ",
            s.noiseFloor.toFixed(3)
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 1e-3, max: 0.1, step: 1e-3, value: s.noiseFloor, onChange: (I) => T({ noiseFloor: parseFloat(I.target.value) }), className: "accent-[#d0d0d0]" })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Low ",
            s.lowPeak.low
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "number", value: s.lowPeak.low, onChange: (I) => T({ lowPeak: { ...s.lowPeak, low: parseFloat(I.target.value) || 0 } }), className: "px-2 py-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8]" })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Peak ",
            s.lowPeak.peak
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "number", value: s.lowPeak.peak, onChange: (I) => T({ lowPeak: { ...s.lowPeak, peak: parseFloat(I.target.value) || 1e5 } }), className: "px-2 py-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8]" })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Tick-per-row ×",
            s.tickPerRow
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 1, max: 8, step: 1, value: s.tickPerRow, onChange: (I) => T({ tickPerRow: parseInt(I.target.value) }), className: "accent-[#d0d0d0]" })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ t.jsxs("span", { className: "text-[10px] text-[#b9b9b9]", children: [
            "Half-life ",
            s.halfLife,
            "m"
          ] }),
          /* @__PURE__ */ t.jsx("input", { type: "range", min: 1, max: 240, step: 1, value: s.halfLife, onChange: (I) => T({ halfLife: parseInt(I.target.value) }), className: "accent-[#d0d0d0]" })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ t.jsxs("label", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t.jsx("input", { type: "checkbox", checked: s.linearFilter, onChange: (I) => T({ linearFilter: I.target.checked }) }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[10px] text-[#e8e8e8]", children: "Linear filter (smooth cloud)" })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t.jsx("input", { type: "checkbox", checked: s.reachModulation, onChange: (I) => T({ reachModulation: I.target.checked }) }),
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
const pd = hd;
function xd({ open: s, onClose: n, onSelect: h }) {
  const [T, I] = o.useState(""), [te, se] = o.useState(""), Me = o.useMemo(() => {
    const re = ["BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "DOGE", "AVAX", "DOT", "LINK", "LTC", "BCH", "UNI", "XLM", "ETC", "FIL", "TRX", "APT", "ARB", "OP", "MATIC", "ATOM", "NEAR", "FTM", "ALGO"], xe = ["binancef", "hl", "coinbase"], Le = [];
    for (let Qe = 0; Qe < 770; Qe++) {
      const Ee = re[Qe % re.length], De = xe[Qe % xe.length];
      Le.push({ symbol: `${Ee}${De === "binancef" ? "USDT" : "-USD"}`, base: Ee, exchange: De, price: 100 + Math.random() * 5e4, change: (Math.random() - 0.5) * 10, listed: !0 });
    }
    return Le;
  }, []), r = o.useMemo(() => Me.filter((re) => !(te && re.exchange !== te || T && !re.symbol.toLowerCase().includes(T.toLowerCase()) && !re.base.toLowerCase().includes(T.toLowerCase()))).slice(0, 200), [Me, T, te]);
  return s ? /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-[150] flex items-center justify-center bg-black/60", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-[#262626] border border-[#3a3a3a] rounded shadow-2xl w-[480px] max-h-[80vh] flex flex-col", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "px-3 py-2 border-b border-[#3a3a3a] flex items-center gap-2", children: [
      /* @__PURE__ */ t.jsx("span", { className: "text-[11px] font-bold tracking-wider text-[#e8e8e8]", children: "FIND SYMBOL — 770 LISTED" }),
      /* @__PURE__ */ t.jsx("button", { onClick: n, className: "ml-auto text-[#b9b9b9] hover:text-[#e8e8e8]", children: "×" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "p-2 flex gap-2 border-b border-[#3a3a3a]/50", children: [
      /* @__PURE__ */ t.jsx("input", { value: T, onChange: (re) => I(re.target.value), placeholder: "Search BTC, ETH...", className: "flex-1 px-2 py-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded text-[11px] text-[#e8e8e8]", autoFocus: !0 }),
      /* @__PURE__ */ t.jsxs("select", { value: te, onChange: (re) => se(re.target.value), className: "px-2 py-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded text-[10px] text-[#b9b9b9]", children: [
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
      r.map((re) => /* @__PURE__ */ t.jsxs("div", { onClick: () => {
        h(re.symbol), n();
      }, className: "grid grid-cols-4 px-2 py-1.5 text-[11px] border-b border-[#3a3a3a]/20 hover:bg-[#343434] cursor-pointer", children: [
        /* @__PURE__ */ t.jsx("span", { className: "font-mono font-medium text-[#e8e8e8]", children: re.symbol }),
        /* @__PURE__ */ t.jsx("span", { className: "font-mono tabular-nums", children: re.price.toFixed(2) }),
        /* @__PURE__ */ t.jsxs("span", { className: `tabular-nums ${re.change >= 0 ? "text-[#21b3a4]" : "text-[#f0426c]"}`, children: [
          re.change >= 0 ? "+" : "",
          re.change.toFixed(2),
          "%"
        ] }),
        /* @__PURE__ */ t.jsx("span", { className: "text-[10px] text-[#b9b9b9]", children: re.exchange })
      ] }, `${re.exchange}:${re.symbol}`))
    ] }),
    /* @__PURE__ */ t.jsx("div", { className: "px-2 py-1 text-[9px] text-[#b9b9b9]/60 border-t border-[#3a3a3a]", children: "770 listed • categories/venues/sparkline/score/type • click to select" })
  ] }) }) : null;
}
const md = [
  { id: "chart", label: "Chart", desc: "Candles + indicators" },
  { id: "dom", label: "DOM", desc: "Depth ladder BUYS/BIDS/PRICE/ASKS/SELLS/DELTA" },
  { id: "tape", label: "Time & Sales", desc: "PRICE QTY TIME" },
  { id: "depth", label: "Depth Heatmap", desc: "Orderbook heatmap" },
  { id: "edgedepth", label: "EdgeDepth Heatmap", desc: "GPU 8192x1024" },
  { id: "footprint", label: "Footprint", desc: "Cluster/profile" },
  { id: "vpvr", label: "VPVR", desc: "Volume Profile POC/VAH/VAL" },
  { id: "tpo", label: "TPO", desc: "Time Price Opportunity 30m" },
  { id: "cvd", label: "CVD", desc: "Cumulative Volume Delta" },
  { id: "liquidations", label: "Liquidations", desc: "Liq heatmap Ember/Viridis/Magma/Inferno" },
  { id: "watchlist", label: "Watchlist", desc: "1503 pairs categories/venues/sparkline" },
  { id: "indicators", label: "Indicators", desc: "Volume CVD RSI MACD Funding OI VPIN" }
];
function bd({ onSelect: s }) {
  const [n, h] = o.useState(!1), T = o.useRef(null);
  return o.useEffect(() => {
    const I = (te) => {
      T.current && !T.current.contains(te.target) && h(!1);
    };
    return document.addEventListener("mousedown", I), () => document.removeEventListener("mousedown", I);
  }, []), /* @__PURE__ */ t.jsxs("div", { ref: T, className: "relative", children: [
    /* @__PURE__ */ t.jsx("button", { onClick: () => h((I) => !I), className: "px-2 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8] hover:bg-[#343434]", children: "+Widget ▾" }),
    n && /* @__PURE__ */ t.jsxs("div", { className: "absolute top-full left-0 mt-1 z-30 w-[240px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl py-1", children: [
      /* @__PURE__ */ t.jsx("div", { className: "px-2 py-1 text-[9px] text-[#b9b9b9] uppercase tracking-wider", children: "Add widget — 10+ items" }),
      md.map((I) => /* @__PURE__ */ t.jsxs("button", { onClick: () => {
        s(I.id), h(!1);
      }, className: "w-full text-left px-3 py-1.5 hover:bg-[#343434] flex flex-col", children: [
        /* @__PURE__ */ t.jsx("span", { className: "text-[11px] text-[#e8e8e8] font-medium", children: I.label }),
        /* @__PURE__ */ t.jsx("span", { className: "text-[9px] text-[#b9b9b9]/60", children: I.desc })
      ] }, I.id))
    ] })
  ] });
}
function gd({ open: s, onClose: n, feature: h = "SECONDS PRO" }) {
  return s ? /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-[#262626] border border-[#3a3a3a] rounded shadow-2xl w-[380px] overflow-hidden", children: [
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
})(), Vo = /* @__PURE__ */ new Set(), vl = () => Vo.forEach((s) => s()), Jl = (s, n) => {
  try {
    localStorage.setItem(s, n);
  } catch {
  }
}, Sn = {
  get: () => an,
  setLayout(s) {
    an.layout = s, Jl("lset-layout", s), vl();
  },
  setSync(s) {
    an.sync = s, Jl("lset-layout-sync", JSON.stringify(s)), vl();
  },
  setPanelSymbol(s, n) {
    an.panelSymbols = [...an.panelSymbols], an.panelSymbols[s] = n, Jl("lset-layout-symbols", JSON.stringify(an.panelSymbols)), vl();
  },
  setPanelKind(s, n) {
    an.panelKinds = [...an.panelKinds], an.panelKinds[s] = n, Jl("lset-layout-kinds", JSON.stringify(an.panelKinds)), vl();
  },
  setActivePanel(s) {
    an.activePanel !== s && (an.activePanel = s, vl());
  },
  subscribe(s) {
    return Vo.add(s), () => {
      Vo.delete(s);
    };
  }
};
function Zo() {
  const [, s] = o.useState(0);
  return o.useEffect(() => Sn.subscribe(() => s((n) => n + 1)), []), { ...an };
}
const vd = o.lazy(() => import("./chunks/depth-ChRRoHC5.js").then((s) => s.E)), yd = o.lazy(() => import("./chunks/OrderflowPanel-3gWgqqly.js"));
o.lazy(() => import("./chunks/DOMPanel-CXeJYfu3.js"));
o.lazy(() => import("./chunks/TapePanel-CHPghbfI.js"));
const kd = o.lazy(() => import("./chunks/FootprintPanel-9lf4EGuV.js")), wd = o.lazy(() => import("./chunks/VolumeProfilePanel-D_VY7Om5.js")), Sd = o.lazy(() => import("./chunks/TPOPanel-h_4YpZGs.js")), Cd = o.lazy(() => import("./chunks/CVDPanel-yEJSuTR6.js")), Id = o.lazy(() => import("./chunks/LiquidationPanel-fYGFwa7I.js")), Td = o.lazy(() => import("./chunks/EdgeDepthDOMPanel-BHDn0NLB.js")), jd = o.lazy(() => import("./chunks/EdgeDepthTapePanel-Gtvqy5qk.js")), Md = o.lazy(() => import("./chunks/EdgeDepthWatchlist-Dkwkl9-p.js")), Rd = o.lazy(() => import("./chunks/EdgeDepthIndicators--yFAyVp6.js")), $r = () => /* @__PURE__ */ t.jsx("div", { className: "h-full w-full flex items-center justify-center text-[11px] text-[var(--dim)]", children: "Loading…" }), Hr = {
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
function Pd({
  symbol: s,
  sourceProvider: n,
  timeframe: h,
  colors: T,
  active: I,
  onActivate: te,
  kind: se,
  onToggleKind: Me,
  syncedCrosshairTime: r,
  onCrosshairMove: re,
  syncedViewportTime: xe,
  onViewportTimeChange: Le,
  quote: Qe
}) {
  const [Ee, De] = o.useState([]), ye = so(), Fe = o.useRef(!0);
  o.useEffect(() => (Fe.current = !0, () => {
    Fe.current = !1;
  }), []), o.useEffect(() => {
    if (se !== "chart") return;
    let B = !1;
    De([]);
    const q = async () => {
      try {
        const be = await $u("multi_panel", {
          symbol: s,
          timeframe: h,
          limit: 500
        });
        !B && be?.length && De(be.map((J) => ({
          time: Date.parse(J.timestamp),
          open: J.open,
          high: J.high,
          low: J.low,
          close: J.close,
          volume: J.volume
        })));
      } catch {
      }
    };
    q();
    const Ce = setInterval(q, 1e4);
    return () => {
      B = !0, clearInterval(Ce);
    };
  }, [s, h, se]);
  const Pe = () => {
    const B = se;
    return B === "depth" ? /* @__PURE__ */ t.jsx(
      Ju,
      {
        symbol: s,
        sourceProvider: n,
        colors: T,
        syncedCrosshairTime: r,
        onCrosshairMove: re,
        onToggleKind: Me
      }
    ) : B === "edgedepth" ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx($r, {}), children: /* @__PURE__ */ t.jsx(
      vd,
      {
        symbol: s,
        provider: n || "binance",
        onToggleKind: Me
      }
    ) }) : ["orderflow", "dom", "tape", "footprint", "vpvr", "tpo", "cvd", "liquidations", "watchlist", "indicators"].includes(B) ? /* @__PURE__ */ t.jsxs(o.Suspense, { fallback: /* @__PURE__ */ t.jsx($r, {}), children: [
      B === "orderflow" && /* @__PURE__ */ t.jsx(yd, { symbol: s, provider: n || "binance", colors: T }),
      B === "dom" && /* @__PURE__ */ t.jsx(Td, { symbol: s, provider: n || "binance" }),
      B === "tape" && /* @__PURE__ */ t.jsx(jd, { symbol: s, provider: n || "binance" }),
      B === "footprint" && /* @__PURE__ */ t.jsx(kd, { symbol: s, provider: n || "binance" }),
      B === "vpvr" && /* @__PURE__ */ t.jsx(wd, { symbol: s, provider: n || "binance" }),
      B === "tpo" && /* @__PURE__ */ t.jsx(Sd, { symbol: s, provider: n || "binance" }),
      B === "cvd" && /* @__PURE__ */ t.jsx(Cd, { symbol: s, provider: n || "binance" }),
      B === "liquidations" && /* @__PURE__ */ t.jsx(Id, { symbol: s, provider: n || "binance" }),
      B === "watchlist" && /* @__PURE__ */ t.jsx(Md, { activeSymbol: s, onSelectSymbol: (q) => {
        try {
          window.__lseShell?.selectSymbol?.(q);
        } catch {
        }
      } }),
      B === "indicators" && /* @__PURE__ */ t.jsx(Rd, { symbol: s, provider: n || "binance" })
    ] }) : Ee.length > 0 ? /* @__PURE__ */ t.jsx(
      Go,
      {
        candles: Ee,
        symbol: s,
        timeframe: h,
        chartType: "candlestick",
        livePrice: Ee[Ee.length - 1]?.close ?? null,
        rightOffset: 6,
        colors: T,
        indicators: Ls,
        timezone: ye?.data?.timezone || "local",
        syncedCrosshairTime: r ?? void 0,
        onCrosshairMove: re,
        syncedViewportTime: xe ?? void 0,
        onViewportTimeChange: Le,
        showBidAskSpread: !!Qe,
        brokerBid: Qe?.bid ?? null,
        brokerAsk: Qe?.ask ?? null
      }
    ) : null;
  };
  return /* @__PURE__ */ t.jsxs(
    "div",
    {
      onMouseDown: te,
      style: {
        position: "relative",
        minWidth: 0,
        minHeight: 0,
        overflow: "hidden",
        border: I ? "1px solid var(--accent-bar, #888)" : "1px solid var(--edge, #2a2e39)"
      },
      children: [
        Pe(),
        se === "chart" && /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: (B) => {
              B.stopPropagation(), Me();
            },
            title: "Open the Depth Heat (order-flow liquidity heatmap) pane",
            style: {
              position: "absolute",
              top: 4,
              right: 4,
              zIndex: 5,
              background: "rgba(20, 24, 30, 0.75)",
              color: "#9aa4b2",
              border: "1px solid var(--edge, #2a2e39)",
              borderRadius: 3,
              fontSize: 9,
              padding: "1px 5px",
              cursor: "pointer",
              opacity: 0.85
            },
            children: "🔥 depth"
          }
        )
      ]
    }
  );
}
function Nd({
  layout: s,
  syncSettings: n,
  pair: h,
  timeframe: T,
  colors: I,
  quote: te,
  sourceProvider: se
}) {
  const Me = Hr[s] || Hr["2x2"], { activePanel: r, panelSymbols: re, panelKinds: xe } = Zo(), Le = Math.min(r, Me.count - 1), [Qe, Ee] = o.useState([]), [De, ye] = o.useState(null), [Fe, Pe] = o.useState(null), B = o.useMemo(() => I || lo(), [I]);
  o.useEffect(() => {
    Ee((be) => {
      const J = [...be];
      for (let Ue = J.length; Ue < Me.count; Ue++)
        J.push(Ue === 0 ? T : Vr[Ue % Vr.length]);
      return J.slice(0, Me.count);
    });
  }, [Me.count, T]);
  const q = o.useCallback((be) => {
    n.syncCrosshair && ye(be);
  }, [n.syncCrosshair]), Ce = o.useCallback((be) => {
    n.syncTime && Pe(be);
  }, [n.syncTime]);
  return /* @__PURE__ */ t.jsx("div", { style: {
    display: "grid",
    width: "100%",
    height: "100%",
    gap: 2,
    gridTemplateColumns: `repeat(${Me.cols}, 1fr)`,
    gridTemplateRows: `repeat(${Me.rows}, 1fr)`
  }, children: Array.from({ length: Me.count }, (be, J) => /* @__PURE__ */ t.jsx(
    Pd,
    {
      symbol: n.syncSymbol ? h : re[J] || h,
      sourceProvider: se,
      timeframe: n.syncInterval ? T : Qe[J] || T,
      colors: B,
      active: J === Le,
      onActivate: () => Sn.setActivePanel(J),
      kind: xe[J] || "chart",
      onToggleKind: () => {
        const Ue = xe[J] || "chart", he = ["chart", "depth", "edgedepth", "orderflow", "dom", "tape", "footprint", "vpvr", "tpo", "cvd", "liquidations", "watchlist", "indicators"], xt = he.indexOf(Ue), wt = he[(xt + 1) % he.length];
        Sn.setPanelKind(J, wt);
      },
      syncedCrosshairTime: n.syncCrosshair ? De : null,
      onCrosshairMove: q,
      syncedViewportTime: n.syncTime ? Fe : null,
      onViewportTimeChange: Ce,
      quote: te
    },
    J
  )) });
}
const to = [
  "lse-drawing-favorites",
  // which drawing tools are favourited
  "lse-drawing-favorites-pos",
  // position of the floating favourites toolbar
  "chart-sidebar-width"
  // chart sidebar width
];
let Xr = !1, eo = null;
async function Ld() {
  const s = {};
  for (const n of to) {
    const h = localStorage.getItem(n);
    h !== null && (s[n] = h);
  }
  try {
    await fetch("/api/workspace/tools", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(s)
    });
  } catch {
  }
}
function Yr() {
  eo && clearTimeout(eo), eo = setTimeout(() => {
    eo = null, Ld();
  }, 400);
}
async function Qr() {
  if (Xr) return;
  Xr = !0;
  try {
    const h = await fetch("/api/workspace/tools");
    if (h.ok) {
      const I = (await h.json())?.value ?? {};
      for (const te of to) {
        const se = I[te];
        typeof se == "string" && localStorage.setItem(te, se);
      }
    }
  } catch {
  }
  const s = localStorage.setItem.bind(localStorage), n = localStorage.removeItem.bind(localStorage);
  localStorage.setItem = (h, T) => {
    s(h, T), to.includes(h) && Yr();
  }, localStorage.removeItem = (h) => {
    n(h), to.includes(h) && Yr();
  };
}
const zr = ["#38bdf8", "#fbbf24", "#c084fc", "#34d399", "#fb7185", "#a3e635"];
function Ed(s, n) {
  if (!s || !n.length) return [];
  const h = /* @__PURE__ */ new Map();
  for (let te = 0; te < n.length; te++)
    h.set(Math.floor(n[te].time / 1e3), te);
  const T = [];
  let I = 0;
  for (const [te, se] of Object.entries(s))
    for (const [Me, r] of Object.entries(se.series || {})) {
      const re = new Array(n.length).fill(NaN);
      let xe = 0;
      for (const [Ee, De] of r.points || []) {
        const ye = h.get(Ee);
        ye !== void 0 && (re[ye] = De, xe++);
      }
      if (!xe) continue;
      const Qe = Object.keys(se.series).length > 1 ? `${te} ${Me}` : te;
      T.push({
        id: `local-${te}-${Me}`,
        name: Qe,
        // The prefix is what tells ProChart's formula evaluator to leave this
        // series alone and draw the precomputed values.
        expression: `local:${te}:${Me}`,
        enabled: !0,
        display: se.overlay ? "overlay" : "subplot",
        color: zr[I++ % zr.length],
        lineWidth: 2,
        zeroLine: !1,
        data: re,
        kind: r.kind,
        // One pane per ENGINE INDICATOR, not per column: MACD's three series
        // must share a pane and a scale or the histogram is meaningless.
        group: te
      });
    }
  return T;
}
const Ad = o.lazy(() => import("./chunks/depth-ChRRoHC5.js").then((s) => s.a)), Dd = o.lazy(() => import("./chunks/depth-ChRRoHC5.js").then((s) => s.E)), Kr = o.lazy(() => import("./chunks/OrderflowPanel-3gWgqqly.js"));
o.lazy(() => import("./chunks/DOMPanel-CXeJYfu3.js"));
o.lazy(() => import("./chunks/TapePanel-CHPghbfI.js"));
const Bd = o.lazy(() => import("./chunks/FootprintPanel-9lf4EGuV.js")), Wd = o.lazy(() => import("./chunks/VolumeProfilePanel-D_VY7Om5.js")), Fd = o.lazy(() => import("./chunks/TPOPanel-h_4YpZGs.js")), Od = o.lazy(() => import("./chunks/CVDPanel-yEJSuTR6.js")), _d = o.lazy(() => import("./chunks/LiquidationPanel-fYGFwa7I.js")), $d = o.lazy(() => import("./chunks/EdgeDepthDOMPanel-BHDn0NLB.js")), Hd = o.lazy(() => import("./chunks/EdgeDepthTapePanel-Gtvqy5qk.js")), Vd = o.lazy(() => import("./chunks/EdgeDepthWatchlist-Dkwkl9-p.js")), Xd = o.lazy(() => import("./chunks/EdgeDepthIndicators--yFAyVp6.js")), Yd = o.lazy(() => import("./chunks/EdgeDepthLayers-BC-ehdzx.js")), zd = o.lazy(() => import("./chunks/EdgeDepthLiquidationPanel-BdvEeBo7.js")), Kd = o.lazy(() => import("./chunks/EdgeDepthVolumeProfilePanel-BC2W3WpS.js")), Ud = o.lazy(() => import("./chunks/EdgeDepthFootprintPanel-FdQWkwUq.js")), qd = o.lazy(() => import("./chunks/EdgeDepthTPOPanel-CbTLWjSe.js")), Gd = o.lazy(() => import("./chunks/backtest-BOI-AqD2.js").then((s) => s.bO)), Zd = o.lazy(() => import("./chunks/backtest-BOI-AqD2.js").then((s) => s.bP)), Qd = o.lazy(() => import("./chunks/econ-CJsRkA6M.js")), Jd = o.lazy(() => import("./chunks/dataviz-D6zeVYjn.js")), eh = o.lazy(() => import("./chunks/quant-CKRT66-2.js")), th = o.lazy(() => import("./chunks/notebooks-fOzYQotZ.js")), qn = () => /* @__PURE__ */ t.jsx("div", { className: "h-full w-full flex items-center justify-center text-[11px] text-[var(--dim)]", children: "Loading…" }), nh = {
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
}, ps = (s) => {
  s.currentTarget.style.background = "var(--hover)";
}, xs = (s) => {
  s.currentTarget.style.background = "transparent";
};
function sh({ provider: s, symbol: n, timeframe: h, candles: T, chartType: I = "candlestick", trades: te = [], engineIndicators: se, indicatorPatch: Me = null, quote: r = null, positions: re = [], onPositionModify: xe, onPositionClose: Le, autoSelectPositionId: Qe = null }) {
  const Ee = `${s}|${n}|${h}`, [De, ye] = o.useState(() => {
    try {
      const y = `${s}|${n}|${h}`, le = localStorage.getItem(`lse-candles-${y}`);
      if (le) {
        const me = JSON.parse(le);
        if (Array.isArray(me) && me.length > 0)
          return { key: y, older: me.slice(-200), shift: 0 };
      }
    } catch {
    }
    return { key: Ee, older: [], shift: 0 };
  });
  De.key !== Ee && ye({ key: Ee, older: [], shift: 0 });
  const Fe = o.useRef(null), Pe = o.useRef(!1), [B, q] = o.useState(!1), Ce = o.useMemo(() => {
    if (!De.older.length || !T.length) {
      try {
        T.length > 0 && localStorage.setItem(`lse-candles-${Ee}`, JSON.stringify(T.slice(-200)));
      } catch {
      }
      return T;
    }
    const y = T[0].time, le = [...De.older.filter((me) => me.time < y), ...T];
    try {
      localStorage.setItem(`lse-candles-${Ee}`, JSON.stringify(le.slice(-200)));
    } catch {
    }
    return le;
  }, [De.older, T, Ee]), be = o.useCallback(async () => {
    if (Pe.current || Fe.current === Ee) return;
    const le = Ce;
    if (!le.length || le.length >= 5e4) return;
    const me = Ee, ot = le[0].time;
    Pe.current = !0, q(!0);
    try {
      const Dt = `/api/candles?provider=${encodeURIComponent(s)}&symbol=${encodeURIComponent(n)}&timeframe=${encodeURIComponent(h)}&limit=5000&end=${encodeURIComponent(new Date(ot).toISOString())}`, Xe = await fetch(Dt);
      if (!Xe.ok) {
        let Ne = "";
        try {
          Ne = String((await Xe.json()).detail || "");
        } catch {
        }
        /no (history|prints|data)|served no|no real candles/i.test(Ne) && (Fe.current = me);
        return;
      }
      const $t = ((await Xe.json()).candles || []).map(([Ne, jt, Kt, _s, tt, $s]) => ({
        time: Ne < 1e12 ? Ne * 1e3 : Ne,
        open: jt,
        high: Kt,
        low: _s,
        close: tt,
        volume: $s
      })).filter((Ne) => Ne.time < ot);
      if (!$t.length) {
        Fe.current = me;
        return;
      }
      ye((Ne) => Ne.key !== me ? Ne : {
        key: me,
        older: [...$t, ...Ne.older],
        shift: Ne.shift + $t.length
      });
    } catch {
    } finally {
      Pe.current = !1, q(!1);
    }
  }, [Ce, s, n, h, Ee]), [J, Ue] = o.useState(null), [he, xt] = o.useState(null), [wt, Ye] = o.useState("cursor"), [Xt, Zt] = o.useState(!1), [et, ft] = o.useState(!1), [Qt, Cn] = o.useState(null), [Ct, Pt] = o.useState([]), [sn, Jt] = o.useState(Ls), [ln, Dn] = o.useState(!1), [bs, Us] = o.useState(!1), [gs, Gn] = o.useState("candles"), [vs, ys] = o.useState(() => {
    try {
      const y = typeof h == "string" ? h : "1m", le = Vt.find((me) => me.label.toLowerCase() === y.toLowerCase() || me.label === y);
      if (le) return le;
    } catch {
    }
    return Vt.find((y) => y.label === "1m") || Vt[5] || Vt[0];
  }), [qs, Tl] = o.useState(() => {
    try {
      const y = localStorage.getItem("ed_fav_tf");
      return new Set(y ? JSON.parse(y) : ["1m", "5m", "15m", "1h", "4h", "1D"]);
    } catch {
      return /* @__PURE__ */ new Set(["1m", "5m", "15m", "1h", "4h", "1D"]);
    }
  });
  o.useEffect(() => {
    try {
      const y = String(h || "1m"), le = Vt.find((me) => me.label.toLowerCase() === y.toLowerCase() || me.label === y);
      if (le && le.label.toLowerCase() !== vs.label.toLowerCase())
        ys(le);
      else if (!le) {
        const me = y.match(/^(\d+)([smhdwM])$/i);
        if (me) {
          const ot = parseInt(me[1], 10), Dt = me[2];
          let Xe = 0;
          const Tt = Dt.toLowerCase();
          Dt === "M" ? Xe = ot * 2592e6 : Tt === "s" ? Xe = ot * 1e3 : Tt === "m" ? Xe = ot * 6e4 : Tt === "h" ? Xe = ot * 36e5 : Tt === "d" ? Xe = ot * 864e5 : Tt === "w" && (Xe = ot * 6048e5), Xe > 0 && ys({ label: y, ms: Xe, sec: Math.floor(Xe / 1e3) });
        } else y.toLowerCase() === "tick" && ys({ label: "tick", ms: 0, sec: 0 });
      }
    } catch {
    }
  }, [h]);
  const [jl, Ml] = o.useState(pd), [qe, Es] = o.useState(!1), [Gs, Zs] = o.useState(!1), [oo, As] = o.useState(!1), [Qs, Ds] = o.useState("SECONDS PRO"), [hn, fe] = o.useState(!1), Zn = o.useCallback(() => {
    window.dispatchEvent(new CustomEvent("lset:open-indicators"));
  }, []), ae = o.useCallback((y) => ({
    cursor: null,
    trendline: "trend",
    arrow: "trend",
    ray: "trend",
    extended: "trend",
    hline: "horizontal",
    hray: "horizontal",
    vline: "vertical",
    cross: "horizontal",
    rectangle: "rectangle",
    channel: "trend",
    polyline: "trend",
    brush: "brush",
    fib: "fibonacci",
    long: "long",
    short: "short",
    text: "text",
    measure: "measure",
    pricerange: "measure",
    daterange: "measure"
  })[y] ?? null, []), At = o.useCallback((y) => {
    Ye(y);
    const le = ae(y);
    xt(le);
  }, [ae]), Re = o.useCallback((y) => {
    Tl((le) => {
      const me = new Set(le);
      if (me.has(y)) me.delete(y);
      else {
        if (me.size >= 6) {
          const ot = me.values().next().value;
          ot && me.delete(ot);
        }
        me.add(y);
      }
      try {
        localStorage.setItem("ed_fav_tf", JSON.stringify([...me]));
      } catch {
      }
      return me;
    });
  }, []), $n = o.useMemo(() => ({
    candles: "candlestick",
    fp_cluster: "footprint_cluster",
    fp_profile: "footprint_profile",
    heikin_ashi: "heikin_ashi",
    line: "line",
    tpo: "tpo",
    renko: "renko",
    flow_positioning: "flow_positioning"
  })[gs] || "candlestick", [gs]), [lt, fn] = o.useState(null), [$e, at] = o.useState(!1), [dt, nt] = o.useState(!1), [pn, Js] = o.useState(""), [_t, Bs] = o.useState(null), [Qn, Jn] = o.useState(""), [, el] = o.useState(0), [It, mt] = o.useState(null), [tl, In] = o.useState(""), [Bn, Hn] = o.useState(""), [Ws, Ge] = o.useState(""), [nl, Fs] = o.useState(!1), ks = o.useRef(null), Vn = async () => {
    const y = pn.trim();
    if (!y) {
      Jn("name the template first");
      return;
    }
    await window.__lseShell?.saveLayout?.(y) ? (nt(!1), Jn(""), el((me) => me + 1)) : Jn("could not save this template");
  };
  o.useEffect(() => {
    if (!lt) return;
    const y = () => {
      fn(null), at(!1), nt(!1), Bs(null), Jn(""), mt(null), Ge("");
    }, le = (me) => {
      me.key === "Escape" && y();
    };
    return document.addEventListener("click", y), document.addEventListener("keydown", le), () => {
      document.removeEventListener("click", y), document.removeEventListener("keydown", le);
    };
  }, [lt]);
  const Tn = Zo(), ws = Tn.layout, sl = Tn.sync, [Yt, zt] = o.useState(!1), [es, ts] = o.useState("appearance"), bt = o.useRef(Yt);
  bt.current = Yt;
  const cn = o.useRef(es);
  cn.current = es, o.useEffect(() => (Xo = (y) => {
    if (!bt.current) {
      ts(y || "appearance"), zt(!0);
      return;
    }
    if (y && y !== cn.current) {
      ts(y);
      return;
    }
    zt(!1);
  }, () => {
    Xo = null;
  }), []), o.useEffect(() => {
    if (!Yt) return;
    const y = (le) => {
      le.key === "Escape" && zt(!1);
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [Yt]);
  const Ss = o.useRef(null), [ns, jn] = o.useState(null);
  o.useEffect(() => {
    Yt || jn(null);
  }, [Yt]);
  const Wn = o.useCallback((y) => {
    if (y.target.closest("button")) return;
    const le = Ss.current, me = le?.offsetParent;
    if (!me || !le) return;
    const ot = me.getBoundingClientRect(), Dt = le.getBoundingClientRect(), Xe = y.clientX - Dt.left, Tt = y.clientY - Dt.top;
    y.preventDefault();
    const $t = (jt) => {
      jn({
        x: Math.max(0, Math.min(jt.clientX - ot.left - Xe, ot.width - Dt.width)),
        y: Math.max(0, Math.min(jt.clientY - ot.top - Tt, ot.height - 36))
      });
    }, Ne = () => {
      window.removeEventListener("pointermove", $t), window.removeEventListener("pointerup", Ne);
    };
    window.addEventListener("pointermove", $t), window.addEventListener("pointerup", Ne);
  }, []), [ss, xn] = o.useState({
    color: "#e6e8ea",
    strokeWidth: 2,
    lineStyle: "solid",
    opacity: 100
  });
  o.useEffect(() => {
    let y = !0;
    return (async () => {
      const le = await ml.getTools();
      y && le?.drawingDefaults && xn((me) => ({ ...me, ...le.drawingDefaults }));
    })(), () => {
      y = !1;
    };
  }, []);
  const ll = o.useRef(null), Rl = o.useRef(0), Pl = o.useRef(() => {
  }), ro = o.useRef([]);
  o.useEffect(() => {
    Ko({ provider: s, symbol: n });
  }, [s, n]);
  const mn = `${s}:${n}`, Nt = o.useRef(null);
  o.useEffect(() => {
    let y = !0;
    return Nt.current = null, (async () => {
      const [le, me] = await Promise.all([
        ml.getDrawings(mn),
        ml.getIndicators(mn)
      ]);
      y && (Pt(le), Jt(me ?? Ls), Cn(null), Nt.current = mn);
    })(), () => {
      y = !1;
    };
  }, [mn]);
  const gt = o.useCallback((y) => {
    Pt(y), Nt.current === mn && ml.setDrawings(mn, y);
  }, [mn]), ls = o.useCallback((y) => {
    Jt(y), Nt.current === mn && ml.setIndicators(mn, y);
  }, [mn]);
  o.useEffect(() => {
    Me && Jt((y) => ({ ...y, ...Me }));
  }, [Me]);
  const Cs = o.useCallback(() => {
    gt([]), Cn(null);
  }, [gt]), ct = o.useCallback((y) => {
    gt(Ct.filter((le) => le.id !== y)), Cn(null);
  }, [Ct, gt]), Mn = o.useMemo(() => {
    const y = Ed(se, Ce);
    return y.length ? { ...sn, customIndicators: y } : sn;
  }, [sn, se, Ce]), os = so(), rs = Vu(), as = o.useMemo(() => {
    const y = lo(), le = os?.candles, me = os?.chart;
    return !rs || !le || !me ? { ...y } : {
      ...y,
      background: me.backgroundColor,
      backgroundOpacity: me.backgroundOpacity,
      grid: me.gridColor,
      gridOpacity: me.gridOpacity,
      axisLabel: me.axisLabelColor,
      axisLine: me.axisLineColor,
      crosshair: me.crosshairColor,
      priceTickerBullish: me.priceTickerBullish,
      priceTickerBearish: me.priceTickerBearish,
      bullish: le.bodyBullish,
      bearish: le.bodyBearish,
      bullishBorder: le.bordersBullish,
      bearishBorder: le.bordersBearish,
      bullishWick: le.wickBullish,
      bearishWick: le.wickBearish
    };
  }, [os, rs]), Os = os?.data?.timezone || "local", Rn = nh[h] ?? 36e5, bn = T.length ? T[T.length - 1].close : null, [Fn, gn] = o.useState("");
  o.useEffect(() => {
    const y = () => {
      if (h === "tick") {
        gn("");
        return;
      }
      if (!n || !Gr(n)) {
        gn("");
        return;
      }
      const me = Date.now(), ot = Math.ceil(me / Rn) * Rn, Dt = Math.max(0, ot - me), Xe = Math.floor(Dt / 1e3), Tt = Math.floor(Xe / 60) % 60, $t = Math.floor(Xe / 3600), Ne = (jt) => String(jt).padStart(2, "0");
      gn($t > 0 ? `${$t}:${Ne(Tt)}:${Ne(Xe % 60)}` : `${Tt}:${Ne(Xe % 60)}`);
    };
    y();
    const le = setInterval(y, 1e3);
    return () => clearInterval(le);
  }, [n, Rn, h]);
  const ao = o.useMemo(
    () => Object.values(sn || {}).filter((y) => y && y.enabled).length,
    [sn]
  ), co = o.useMemo(
    () => [
      ...te.map((y, le) => ({
        id: `trade-${le}`,
        price: y.price,
        side: y.side,
        quantity: y.quantity ?? 0,
        symbol: n,
        pnl: y.pnl
      })),
      ...re.map((y) => ({ ...y, symbol: n }))
    ],
    [te, re, n]
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
      }, className: `px-1.5 py-0.5 text-[9px] rounded border ${s === y ? "bg-[#21b3a4] text-black border-[#21b3a4] font-bold" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434]"}`, title: `${y} ${y === "hyperliquid" ? "15ms ⚡ ultra-fast" : y === "binance" ? "20ms fast" : "50ms"}`, children: y === "hyperliquid" ? "HL ⚡" : y === "binance" ? "BINANCE" : "COINBASE" }, y)) }),
      /* @__PURE__ */ t.jsxs("span", { className: "text-[9px] px-1.5 py-0.5 rounded bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9]", children: [
        s.toUpperCase(),
        " ",
        s === "hyperliquid" ? "⚡15ms" : s === "binance" ? "20ms" : s === "coinbase" ? "50ms" : "",
        " • ",
        h,
        " • LIVE"
      ] }),
      /* @__PURE__ */ t.jsx("div", { className: "ml-2", style: { overflow: "visible", position: "relative", zIndex: 50 }, children: /* @__PURE__ */ t.jsx(dd, { value: vs, onChange: (y) => {
        if (y.pro) {
          Ds("SECONDS PRO"), As(!0);
          return;
        }
        ys(y);
        try {
          const le = window.__lseShell;
          le?.setTimeframe && le.setTimeframe(y.label);
        } catch {
        }
      }, favs: qs, onToggleFav: Re }) }),
      /* @__PURE__ */ t.jsx("div", { className: "ml-1", children: /* @__PURE__ */ t.jsx(ud, { value: gs, onChange: Gn }) }),
      /* @__PURE__ */ t.jsxs("select", { value: Tn.panelKinds[0] || "chart", onChange: (y) => Sn.setPanelKind(0, y.target.value), className: "ml-1 bg-[#262626] border border-[#3a3a3a] rounded px-1 py-0.5 text-[10px] text-[#e8e8e8]", children: [
        /* @__PURE__ */ t.jsx("option", { value: "chart", children: "Chart" }),
        /* @__PURE__ */ t.jsx("option", { value: "edgedepth", children: "EdgeDepth Heatmap" }),
        /* @__PURE__ */ t.jsx("option", { value: "depth", children: "Depth Heat" }),
        /* @__PURE__ */ t.jsx("option", { value: "orderflow", children: "Orderflow" }),
        /* @__PURE__ */ t.jsx("option", { value: "dom", children: "DOM" }),
        /* @__PURE__ */ t.jsx("option", { value: "tape", children: "Tape" }),
        /* @__PURE__ */ t.jsx("option", { value: "footprint", children: "Footprint" }),
        /* @__PURE__ */ t.jsx("option", { value: "vpvr", children: "VPVR" }),
        /* @__PURE__ */ t.jsx("option", { value: "tpo", children: "TPO" }),
        /* @__PURE__ */ t.jsx("option", { value: "cvd", children: "CVD" }),
        /* @__PURE__ */ t.jsx("option", { value: "liquidations", children: "Liquidations" }),
        /* @__PURE__ */ t.jsx("option", { value: "ed_liquidations", children: "Edge Liqs Heatmap" }),
        /* @__PURE__ */ t.jsx("option", { value: "ed_vpvr", children: "Edge VPVR POC/VAH/VAL" }),
        /* @__PURE__ */ t.jsx("option", { value: "ed_footprint", children: "Edge Footprint" }),
        /* @__PURE__ */ t.jsx("option", { value: "ed_tpo", children: "Edge TPO 30m" }),
        /* @__PURE__ */ t.jsx("option", { value: "watchlist", children: "Watchlist 1503" }),
        /* @__PURE__ */ t.jsx("option", { value: "indicators", children: "Indicators" })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-1 ml-1", children: [
        /* @__PURE__ */ t.jsx(bd, { onSelect: (y) => Sn.setPanelKind(0, y) }),
        /* @__PURE__ */ t.jsxs("button", { onClick: () => fe((y) => !y), className: "px-2 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8] hover:bg-[#343434]", children: [
          "Layers ",
          hn ? "▲" : "▼"
        ] }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => Zs(!0), className: "px-2 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8] hover:bg-[#343434]", children: "Find Symbol" })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "ml-auto flex items-center gap-1", children: [
        /* @__PURE__ */ t.jsx("span", { className: "text-[10px] text-[#b9b9b9]", children: "RT" }),
        /* @__PURE__ */ t.jsx("div", { className: "w-2 h-2 rounded-full bg-[#21b3a4] animate-pulse", title: "follow-live streaming" }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => {
          Ds("RT MODE"), As(!0);
        }, className: "px-1.5 py-0.5 rounded border border-[#3a3a3a] text-[9px] bg-[#21b3a4]/20 text-[#21b3a4] hover:bg-[#21b3a4]/30", children: "RT MODE ●" }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => Es((y) => !y), className: "px-2 py-0.5 rounded border border-[#3a3a3a] text-[10px] hover:bg-[#343434] text-[#e8e8e8]", children: "⚙ Appearance" }),
        /* @__PURE__ */ t.jsx("button", { onClick: Zn, className: "px-2 py-0.5 rounded border border-[#3a3a3a] text-[10px] hover:bg-[#343434] text-[#e8e8e8]", children: "Indicators" })
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "relative flex-1 min-h-0 w-full flex", children: [
      /* @__PURE__ */ t.jsx(
        id,
        {
          activeTool: wt,
          onToolSelect: At,
          magnet: et,
          onToggleMagnet: () => ft((y) => !y),
          hiddenAll: bs,
          onToggleHidden: () => Us((y) => !y),
          onClearAll: Cs,
          collapsed: Xt,
          onToggleCollapsed: () => Zt((y) => !y)
        }
      ),
      /* @__PURE__ */ t.jsx("div", { className: "hidden", children: /* @__PURE__ */ t.jsx(
        Xu,
        {
          activeTool: he,
          onToolSelect: xt,
          drawings: Ct,
          onClearAllDrawings: Cs,
          selectedDrawingId: Qt,
          onDeleteSelectedDrawing: ct,
          drawingsLocked: ln,
          onToggleLock: () => Dn((y) => !y),
          drawingsHidden: bs,
          onToggleHide: () => Us((y) => !y),
          indicatorCount: ao,
          onClearIndicators: () => ls(Ls),
          onOpenSettings: Zn
        }
      ) }),
      /* @__PURE__ */ t.jsx(
        "div",
        {
          ref: ks,
          className: "relative flex-1 min-w-0",
          style: nl ? { transform: "scaleY(-1)" } : void 0,
          onContextMenu: (y) => {
            y.preventDefault(), at(!1), mt(null), Ge("");
            let le = null;
            if (ws === "1x1" && J && ks.current) {
              const ot = ks.current.getBoundingClientRect(), Dt = nl ? ot.height - (y.clientY - ot.top) : y.clientY - ot.top, Xe = J.yToPrice(Dt);
              Number.isFinite(Xe) && Xe > 0 && (le = Xe);
            }
            const me = window.__lseShell?.tradeInfo?.() || null;
            fn({
              x: Math.min(y.clientX, window.innerWidth - 240),
              y: Math.min(y.clientY, window.innerHeight - (me?.available ? 360 : 230)),
              price: le,
              ref: bn,
              trade: me
            });
          },
          children: ws !== "1x1" ? /* @__PURE__ */ t.jsx(
            Nd,
            {
              layout: ws,
              syncSettings: sl,
              pair: n,
              timeframe: h,
              colors: as,
              quote: r,
              sourceProvider: s
            }
          ) : Tn.panelKinds[0] === "depth" ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(qn, {}), children: /* @__PURE__ */ t.jsx(
            Ad,
            {
              symbol: n,
              sourceProvider: s,
              colors: as,
              onToggleKind: () => Sn.setPanelKind(0, "chart")
            }
          ) }) : Tn.panelKinds[0] === "edgedepth" ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(qn, {}), children: /* @__PURE__ */ t.jsx(
            Dd,
            {
              symbol: n,
              provider: s,
              onToggleKind: () => Sn.setPanelKind(0, "chart")
            }
          ) }) : ["orderflow", "dom", "tape", "footprint", "vpvr", "tpo", "cvd", "liquidations", "ed_liquidations", "ed_vpvr", "ed_footprint", "ed_tpo", "watchlist", "indicators"].includes(Tn.panelKinds[0]) ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(qn, {}), children: (() => {
            const y = Tn.panelKinds[0];
            return y === "orderflow" ? /* @__PURE__ */ t.jsx(Kr, { symbol: n, provider: s, colors: as }) : y === "dom" ? /* @__PURE__ */ t.jsx($d, { symbol: n, provider: s }) : y === "tape" ? /* @__PURE__ */ t.jsx(Hd, { symbol: n, provider: s }) : y === "footprint" ? /* @__PURE__ */ t.jsx(Bd, { symbol: n, provider: s }) : y === "vpvr" ? /* @__PURE__ */ t.jsx(Wd, { symbol: n, provider: s }) : y === "tpo" ? /* @__PURE__ */ t.jsx(Fd, { symbol: n, provider: s }) : y === "cvd" ? /* @__PURE__ */ t.jsx(Od, { symbol: n, provider: s }) : y === "liquidations" ? /* @__PURE__ */ t.jsx(_d, { symbol: n, provider: s }) : y === "ed_liquidations" ? /* @__PURE__ */ t.jsx(zd, { symbol: n, provider: s }) : y === "ed_vpvr" ? /* @__PURE__ */ t.jsx(Kd, { symbol: n, provider: s }) : y === "ed_footprint" ? /* @__PURE__ */ t.jsx(Ud, { symbol: n, provider: s }) : y === "ed_tpo" ? /* @__PURE__ */ t.jsx(qd, { symbol: n, provider: s }) : y === "watchlist" ? /* @__PURE__ */ t.jsx(Vd, { activeSymbol: n, onSelectSymbol: (le) => {
              try {
                window.__lseShell?.selectSymbol?.(le);
              } catch {
              }
            } }) : y === "indicators" ? /* @__PURE__ */ t.jsx(Xd, { symbol: n, provider: s }) : /* @__PURE__ */ t.jsx(Kr, { symbol: n, provider: s, colors: as });
          })() }) : /* @__PURE__ */ t.jsx(t.Fragment, { children: /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
            /* @__PURE__ */ t.jsx(
              Go,
              {
                candles: Ce,
                symbol: n,
                timeframe: h,
                chartType: $n,
                onLoadMore: be,
                isLoadingMore: B,
                prependShift: De.shift,
                livePrice: bn,
                countdown: Fn,
                timezone: Os,
                rightOffset: 6,
                colors: as,
                indicators: Mn,
                onIndicatorsChange: ls,
                onRemoveEngineIndicator: (y) => window.__lseShell?.removeIndicator?.(y),
                onEditEngineIndicator: (y) => {
                  window.__lseShell?.editIndicator?.(y) || Zn();
                },
                drawings: Ct,
                selectedDrawingId: Qt,
                drawingCursorRef: ro,
                requestRedrawRef: ll,
                scrollOffsetRef: Rl,
                onScrollSync: () => Pl.current?.(),
                onConverterReady: Ue,
                onOpenSettings: Zn,
                positionLines: co,
                onPositionModify: xe,
                onPositionClose: Le,
                autoSelectPositionId: Qe,
                showBidAskSpread: !!r,
                brokerBid: r?.bid ?? null,
                brokerAsk: r?.ask ?? null
              },
              Ee
            ),
            /* @__PURE__ */ t.jsx(
              Yu,
              {
                activeTool: he,
                onToolSelect: xt,
                drawings: Ct,
                onDrawingsChange: gt,
                selectedDrawingId: Qt,
                onSelectDrawing: Cn,
                converter: J,
                scrollSyncRef: Pl,
                scrollOffsetRef: Rl,
                drawingCursorRef: ro,
                requestRedrawRef: ll,
                toolSettings: ss,
                isLocked: ln,
                isHidden: bs,
                currentSymbol: n,
                timeframeMs: Rn,
                currentPrice: bn ?? void 0,
                candles: T
              }
            ),
            Tn.panelKinds[0] !== "depth" && /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: (y) => {
                  y.stopPropagation(), Sn.setPanelKind(0, "depth");
                },
                title: "Open the Depth Heat pane",
                style: {
                  position: "absolute",
                  top: 4,
                  right: 4,
                  zIndex: 5,
                  background: "rgba(20, 24, 30, 0.75)",
                  color: "#9aa4b2",
                  border: "1px solid var(--edge, #2a2e39)",
                  borderRadius: 3,
                  fontSize: 9,
                  padding: "1px 5px",
                  cursor: "pointer",
                  opacity: 0.85
                },
                children: "🔥 depth"
              }
            )
          ] }) })
        }
      ),
      Yt && /* @__PURE__ */ t.jsxs(
        "div",
        {
          ref: Ss,
          className: "absolute z-[95] w-80",
          style: {
            ...ns ? { left: ns.x, top: ns.y } : { top: 8, right: 8 },
            background: "var(--panel)",
            border: "1px solid var(--edge)",
            borderRadius: 3,
            boxShadow: "0 10px 32px var(--shadow)"
          },
          children: [
            /* @__PURE__ */ t.jsxs(
              "div",
              {
                onPointerDown: Wn,
                className: "flex items-center justify-between px-3 py-1.5 select-none",
                style: { borderBottom: "1px solid var(--edge)", cursor: "move" },
                children: [
                  /* @__PURE__ */ t.jsx("span", { style: { fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "var(--dim)" }, children: "CHART LAYOUT" }),
                  /* @__PURE__ */ t.jsx(
                    "button",
                    {
                      onClick: () => zt(!1),
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
                  onClick: () => ts("appearance"),
                  className: "flex-1 px-3 py-1.5 text-xs font-medium transition-colors",
                  style: es === "appearance" ? { color: "var(--text)", background: "var(--active)" } : { color: "var(--dim)" },
                  children: "Appearance"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: () => ts("chart"),
                  className: "flex-1 px-3 py-1.5 text-xs font-medium transition-colors",
                  style: es === "chart" ? { color: "var(--text)", background: "var(--active)" } : { color: "var(--dim)" },
                  children: "Chart"
                }
              )
            ] }),
            /* @__PURE__ */ t.jsx("div", { className: "max-h-[70vh] overflow-y-auto", children: es === "appearance" ? /* @__PURE__ */ t.jsx(zu, { hideHeader: !0, onBack: () => zt(!1) }) : /* @__PURE__ */ t.jsx(Ku, { hideHeader: !0, onBack: () => zt(!1) }) }),
            /* @__PURE__ */ t.jsx(
              "div",
              {
                className: "flex justify-end px-3 py-2",
                style: { borderTop: "1px solid var(--edge)" },
                children: /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    onClick: () => zt(!1),
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
      qe && /* @__PURE__ */ t.jsx("div", { className: "absolute top-10 right-2 z-[90]", children: /* @__PURE__ */ t.jsx(fd, { settings: jl, onChange: Ml, onClose: () => Es(!1) }) }),
      hn && /* @__PURE__ */ t.jsx("div", { className: "absolute top-10 left-[320px] z-[90]", children: /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx("div", { className: "p-2 text-[10px] text-[#b9b9b9]", children: "Loading layers…" }), children: /* @__PURE__ */ t.jsx(Yd, { onChange: () => {
      } }) }) }),
      /* @__PURE__ */ t.jsx(xd, { open: Gs, onClose: () => Zs(!1), onSelect: (y) => {
        try {
          window.__lseShell?.selectSymbol?.(y);
        } catch {
        }
      } }),
      /* @__PURE__ */ t.jsx(gd, { open: oo, onClose: () => As(!1), feature: Qs }),
      lt && /* @__PURE__ */ t.jsxs(
        "div",
        {
          className: "fixed z-[110]",
          style: {
            left: lt.x,
            top: lt.y,
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
            lt.trade?.available && (() => {
              const y = lt.trade, le = (Ne) => window.__lseShell?.fmtPrice?.(Ne) ?? String(Ne), me = (Ne) => Ne === "limit" ? "Limit" : "Stop";
              if (It) {
                const Ne = {
                  flex: 1,
                  minWidth: 0,
                  padding: "3px 6px",
                  fontSize: 12,
                  color: "var(--text)",
                  background: "var(--bg2)",
                  border: "1px solid var(--edge)",
                  borderRadius: 2
                }, jt = {
                  width: 38,
                  fontSize: 11,
                  color: "var(--dim)",
                  flexShrink: 0
                }, Kt = () => {
                  const tt = parseFloat(tl), $s = parseFloat(Bn);
                  if (!(tt > 0)) {
                    Ge("enter a price");
                    return;
                  }
                  if (!($s > 0)) {
                    Ge("enter a size");
                    return;
                  }
                  window.__lseShell?.quickOrder?.(It.side, It.otype, tt, $s), fn(null), mt(null);
                }, _s = (tt) => {
                  tt.stopPropagation(), tt.key === "Enter" && Kt(), tt.key === "Escape" && (mt(null), Ge(""));
                };
                return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                  /* @__PURE__ */ t.jsxs("div", { style: { ...wn, cursor: "default", fontWeight: 600 }, children: [
                    It.side === "buy" ? "Buy" : "Sell",
                    " ",
                    me(It.otype),
                    " · ",
                    y.symbol
                  ] }),
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      style: { display: "flex", gap: 6, alignItems: "center", margin: "2px 10px 4px" },
                      onClick: (tt) => tt.stopPropagation(),
                      children: [
                        /* @__PURE__ */ t.jsx("span", { style: jt, children: "Price" }),
                        /* @__PURE__ */ t.jsx(
                          "input",
                          {
                            autoFocus: !0,
                            value: tl,
                            spellCheck: !1,
                            inputMode: "decimal",
                            style: Ne,
                            onChange: (tt) => In(tt.target.value),
                            onKeyDown: _s
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      style: { display: "flex", gap: 6, alignItems: "center", margin: "0 10px 4px" },
                      onClick: (tt) => tt.stopPropagation(),
                      children: [
                        /* @__PURE__ */ t.jsx("span", { style: jt, children: "Units" }),
                        /* @__PURE__ */ t.jsx(
                          "input",
                          {
                            value: Bn,
                            spellCheck: !1,
                            inputMode: "decimal",
                            style: Ne,
                            onChange: (tt) => Hn(tt.target.value),
                            onKeyDown: _s
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      style: { display: "flex", gap: 4, margin: "0 10px 2px", justifyContent: "flex-end" },
                      onClick: (tt) => tt.stopPropagation(),
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
                              mt(null), Ge("");
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
                            onClick: Kt,
                            children: "Place"
                          }
                        )
                      ]
                    }
                  ),
                  Ws && /* @__PURE__ */ t.jsx("div", { style: { ...wn, color: "#e05d5d", cursor: "default" }, children: Ws }),
                  /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: "1px solid var(--edge)" } })
                ] });
              }
              const ot = y.qty != null ? `${y.qty} ` : "", Dt = [
                { label: `Buy ${ot}${y.symbol} at market`, side: "buy", otype: "market" },
                { label: `Sell ${ot}${y.symbol} at market`, side: "sell", otype: "market" }
              ], Xe = lt.price, Tt = lt.ref, $t = y.pendingTypes || [];
              if (Xe != null && Tt != null && Xe !== Tt && $t.length) {
                const Ne = Xe < Tt ? [{ side: "buy", otype: "limit" }, { side: "sell", otype: "stop" }] : [{ side: "sell", otype: "limit" }, { side: "buy", otype: "stop" }];
                for (const jt of Ne)
                  $t.includes(jt.otype) && Dt.push({ ...jt, label: `${jt.side === "buy" ? "Buy" : "Sell"} ${me(jt.otype)} @ ${le(Xe)}…` });
              }
              return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                Dt.map((Ne) => /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    className: "w-full text-left",
                    style: wn,
                    onMouseEnter: ps,
                    onMouseLeave: xs,
                    onClick: (jt) => {
                      if (Ne.otype === "market") {
                        window.__lseShell?.quickOrder?.(Ne.side, Ne.otype, lt.price), fn(null);
                        return;
                      }
                      jt.stopPropagation(), mt({ side: Ne.side, otype: Ne.otype }), In(Xe != null ? String(+Xe.toFixed(Xe >= 1e3 ? 2 : Xe >= 100 ? 3 : Xe >= 1 ? 4 : 6)) : ""), Hn(y.qty != null ? String(y.qty) : ""), Ge("");
                    },
                    children: Ne.label
                  },
                  `${Ne.side}-${Ne.otype}`
                )),
                /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: "1px solid var(--edge)" } })
              ] });
            })(),
            /* @__PURE__ */ t.jsxs(
              "button",
              {
                className: "w-full text-left",
                style: { ...wn, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 },
                onMouseEnter: ps,
                onMouseLeave: xs,
                onClick: () => at((y) => !y),
                children: [
                  /* @__PURE__ */ t.jsx("span", { children: "Chart template" }),
                  /* @__PURE__ */ t.jsx("span", { style: { color: "var(--dim)" }, children: $e ? "▾" : "▸" })
                ]
              }
            ),
            $e && /* @__PURE__ */ t.jsxs("div", { className: "max-h-48 overflow-y-auto", style: { borderTop: "1px solid var(--edge)", borderBottom: "1px solid var(--edge)", margin: "3px 0" }, children: [
              (window.__lseShell?.layouts?.() || []).length === 0 ? /* @__PURE__ */ t.jsx("div", { style: { ...wn, color: "var(--dim)" }, children: "No saved templates yet" }) : window.__lseShell.layouts().map((y) => /* @__PURE__ */ t.jsxs(
                "div",
                {
                  style: { ...wn, display: "flex", alignItems: "center", gap: 8, paddingLeft: 20, cursor: "pointer" },
                  onMouseEnter: ps,
                  onMouseLeave: xs,
                  onClick: () => {
                    window.__lseShell?.applyLayout?.(y.id), fn(null);
                  },
                  children: [
                    /* @__PURE__ */ t.jsx("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: y.name }),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        title: _t === y.id ? "Click again to delete" : "Delete template",
                        style: {
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          fontSize: _t === y.id ? 11 : 13,
                          lineHeight: 1,
                          padding: "0 2px",
                          color: _t === y.id ? "#e05d5d" : "var(--dim)"
                        },
                        onClick: async (le) => {
                          if (le.stopPropagation(), _t !== y.id) {
                            Bs(y.id);
                            return;
                          }
                          await window.__lseShell?.deleteLayout?.(y.id), Bs(null), el((me) => me + 1);
                        },
                        children: _t === y.id ? "sure?" : "×"
                      }
                    )
                  ]
                },
                y.id
              )),
              dt ? /* @__PURE__ */ t.jsxs(
                "div",
                {
                  style: { display: "flex", gap: 4, margin: "3px 12px 5px", alignItems: "center" },
                  onClick: (y) => y.stopPropagation(),
                  children: [
                    /* @__PURE__ */ t.jsx(
                      "input",
                      {
                        autoFocus: !0,
                        value: pn,
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
                        onChange: (y) => Js(y.target.value),
                        onKeyDown: async (y) => {
                          if (y.stopPropagation(), y.key === "Escape") {
                            nt(!1);
                            return;
                          }
                          y.key === "Enter" && await Vn();
                        }
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        disabled: !pn.trim(),
                        title: pn.trim() ? "Save this chart as a template" : "Name the template first",
                        style: {
                          padding: "3px 10px",
                          fontSize: 12,
                          lineHeight: 1.5,
                          borderRadius: 2,
                          border: "1px solid var(--edge)",
                          background: "var(--active)",
                          color: "var(--text)",
                          cursor: pn.trim() ? "pointer" : "default",
                          opacity: pn.trim() ? 1 : 0.5
                        },
                        onClick: Vn,
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
                  onMouseEnter: ps,
                  onMouseLeave: xs,
                  onClick: (y) => {
                    y.stopPropagation(), Js(window.__lseShell?.layoutDefaultName?.() || ""), Jn(""), nt(!0);
                  },
                  children: "+ Save current as template…"
                }
              ),
              Qn && /* @__PURE__ */ t.jsx("div", { style: { ...wn, paddingLeft: 20, color: "#e05d5d" }, children: Qn })
            ] }),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "w-full text-left",
                style: wn,
                onMouseEnter: ps,
                onMouseLeave: xs,
                onClick: () => {
                  ks.current?.querySelector('button[title="Reset view"]')?.click(), fn(null);
                },
                children: "Reset chart view"
              }
            ),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "w-full text-left",
                style: wn,
                onMouseEnter: ps,
                onMouseLeave: xs,
                onClick: () => {
                  Fs((y) => !y), fn(null);
                },
                children: nl ? "Unflip chart" : "Flip chart"
              }
            ),
            Ct.length > 0 && /* @__PURE__ */ t.jsxs(
              "button",
              {
                className: "w-full text-left",
                style: wn,
                onMouseEnter: ps,
                onMouseLeave: xs,
                onClick: () => {
                  Cs(), fn(null);
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
                onMouseEnter: ps,
                onMouseLeave: xs,
                onClick: () => {
                  ts("appearance"), zt(!0), fn(null);
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
function lh({ symbol: s, timeframe: n, candles: h, quote: T }) {
  const I = so(), te = o.useMemo(() => lo(), []);
  return !s || !h.length ? /* @__PURE__ */ t.jsx("div", { className: "h-full w-full" }) : /* @__PURE__ */ t.jsx(
    Go,
    {
      candles: h,
      symbol: s,
      timeframe: n,
      chartType: "candlestick",
      livePrice: h[h.length - 1]?.close ?? null,
      rightOffset: 6,
      colors: te,
      indicators: Ls,
      timezone: I?.data?.timezone || "local",
      showBidAskSpread: !!T,
      brokerBid: T?.bid ?? null,
      brokerAsk: T?.ask ?? null
    }
  );
}
const Ns = /* @__PURE__ */ new Map();
function Ur(s) {
  const n = Ns.get(s);
  n && n.root.render(
    /* @__PURE__ */ t.jsx(qo, { children: /* @__PURE__ */ t.jsx(Uo, { children: /* @__PURE__ */ t.jsx(lh, { ...n.props }) }) })
  );
}
const oh = {
  mount(s, n = {}) {
    Ns.has(s) || Ns.set(s, { root: ms(s), props: {} });
    const h = Ns.get(s);
    h.props = { ...h.props, ...no(n) }, Ur(s);
  },
  update(s, n) {
    const h = Ns.get(s);
    h && (h.props = { ...h.props, ...no(n) }, Ur(s));
  },
  unmount(s) {
    const n = Ns.get(s);
    n && (n.root.unmount(), Ns.delete(s));
  }
};
function rh() {
  const s = Zo();
  return /* @__PURE__ */ t.jsx(
    Uu,
    {
      selectedLayout: s.layout,
      onLayoutChange: (n) => Sn.setLayout(n),
      syncSettings: s.sync,
      onSyncSettingsChange: (n) => Sn.setSync(n),
      isMultiPanelActive: s.layout !== "1x1",
      onExitMultiPanel: () => Sn.setLayout("1x1")
    }
  );
}
let Ks = null, Xo = null, Yo = null, Il = {
  provider: "demo",
  symbol: "",
  timeframe: "1h",
  candles: [],
  chartType: "candlestick",
  trades: [],
  engineIndicators: void 0
};
function Ho() {
  Ks && Ks.render(
    /* @__PURE__ */ t.jsx(qo, { children: /* @__PURE__ */ t.jsx(Uo, { children: /* @__PURE__ */ t.jsx(sh, { ...Il, indicatorPatch: Yo }) }) })
  );
}
const ah = {
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
function no(s) {
  const n = { ...s };
  return s.chartType && (n.chartType = ah[s.chartType] ?? "candlestick"), "symbol" in s && !s.symbol && (n.symbol = ""), s.candles?.length && s.candles[0].time < qr && (n.candles = s.candles.map((h) => ({ ...h, time: h.time * 1e3 }))), s.trades?.length && s.trades[0].time < qr && (n.trades = s.trades.map((h) => ({ ...h, time: h.time * 1e3 }))), n;
}
const Qo = {
  async mount(s, n = {}) {
    Il = { ...Il, ...no(n) }, Ks || (Ks = ms(s)), await Qr(), Ho();
  },
  update(s) {
    Il = { ...Il, ...no(s) }, Ho();
  },
  unmount() {
    Ks?.unmount(), Ks = null;
  },
  openAppearance(s) {
    Xo?.(s);
  },
  invalidateWorkspaceSection(s) {
    Hu(s);
  },
  setIndicators(s) {
    Yo = { ...Yo || {}, ...s }, Ho();
  },
  indicatorKeys() {
    return Object.keys(Ls);
  },
  indicatorDefaults() {
    return JSON.parse(JSON.stringify(Ls));
  }
}, ch = new qu(), zo = { inReplay: !1 };
function ih({ onExit: s }) {
  const [n, h] = o.useState(!0), T = Zr();
  o.useEffect(() => {
    h(!0);
  }, [T.key]);
  const I = (te) => {
    h(te), te || setTimeout(() => {
      zo.inReplay || s();
    }, 150);
  };
  return /* @__PURE__ */ t.jsx("div", { className: "h-full w-full bg-[#0b0d12]", children: /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(qn, {}), children: /* @__PURE__ */ t.jsx(Zd, { open: n, onOpenChange: I }) }) });
}
function uh({ provider: s }) {
  const [n] = Qu(), h = Zr(), T = n.get("sym"), I = h.pathname.split("/").pop() || "", te = n.get("provider") || s;
  return Ko({ provider: te, symbol: T || I }), o.useEffect(() => (zo.inReplay = !0, () => {
    zo.inReplay = !1;
  }), []), /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(qn, {}), children: /* @__PURE__ */ t.jsx(Gd, {}) });
}
let yl = null;
const dh = {
  async mount(s, n = {}) {
    const h = n.provider || "demo", T = n.onExit || (() => {
    });
    yl || (yl = ms(s)), Ko({ provider: h, symbol: "" }), await Qr(), yl.render(
      /* @__PURE__ */ t.jsx(Gu, { client: ch, children: /* @__PURE__ */ t.jsx(qo, { initialEntries: ["/"], children: /* @__PURE__ */ t.jsxs(Uo, { children: [
        /* @__PURE__ */ t.jsxs(Zu, { children: [
          /* @__PURE__ */ t.jsx(Fr, { path: "/backtest/:pair", element: /* @__PURE__ */ t.jsx(uh, { provider: h }) }),
          /* @__PURE__ */ t.jsx(Fr, { path: "*", element: /* @__PURE__ */ t.jsx(ih, { onExit: T }) })
        ] }),
        /* @__PURE__ */ t.jsx(ed, { theme: "dark", position: "bottom-right" })
      ] }) }) })
    );
  },
  unmount() {
    yl?.unmount(), yl = null;
  }
};
let kl = null;
const hh = {
  mount(s, n = {}) {
    kl || (kl = ms(s)), kl.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(qn, {}), children: /* @__PURE__ */ t.jsx(Qd, { onBack: n.onBack, initialView: n.view }) })
    );
  },
  unmount() {
    kl?.unmount(), kl = null;
  }
};
let wl = null;
const fh = {
  mount(s) {
    wl || (wl = ms(s)), wl.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(qn, {}), children: /* @__PURE__ */ t.jsx(Jd, {}) })
    );
  },
  unmount() {
    wl?.unmount(), wl = null;
  }
};
let Sl = null;
const ph = {
  mount(s) {
    Sl || (Sl = ms(s)), Sl.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(qn, {}), children: /* @__PURE__ */ t.jsx(eh, {}) })
    );
  },
  unmount() {
    Sl?.unmount(), Sl = null;
  }
};
let Cl = null;
const xh = {
  mount(s) {
    Cl || (Cl = ms(s)), Cl.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(qn, {}), children: /* @__PURE__ */ t.jsx(th, {}) })
    );
  },
  unmount() {
    Cl?.unmount(), Cl = null;
  }
};
Qo.mountLayoutButton = (s) => {
  ms(s).render(/* @__PURE__ */ t.jsx(rh, {}));
};
Qo.layoutStore = Sn;
window.LSEChart = Qo;
window.LSEChartPanes = oh;
window.LSEManualBacktest = dh;
window.LSEEconCalendar = hh;
window.LSEDataViz = fh;
window.LSEQuantModels = ph;
window.LSENotebooks = xh;
export {
  Qo as default
};
