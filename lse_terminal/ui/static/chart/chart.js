import { r as o, i as Ar, j as t, g as yc, q as xl } from "./chunks/react-vendor-C0yw3i6b.js";
import { n as Dr, o as Br, p as kc, q as wc, r as Sc, s as Cc, t as Ic, u as Tc, v as jc, w as Mc, x as Rc, y as Pc, z as Nc, A as Lc, C as Ec, D as Ac, E as Dc, F as Bc, G as Wc, H as Fc, J as Oc, K as _c, M as Hc, N as $c, O as Vc, Q as Xc, R as Yc, U as zc, V as Kc, W as Uc, X as qc, Y as Gc, Z as Zc, _ as Qc, $ as Jc, a0 as ei, a1 as ti, a2 as ni, a3 as li, a4 as si, a5 as oi, a6 as ri, a7 as ai, a8 as ci, a9 as ii, aa as ui, ab as di, ac as hi, ad as fi, ae as pi, af as xi, ag as mi, ah as bi, ai as gi, aj as vi, ak as yi, al as ki, am as wi, an as Si, ao as Ci, ap as Ii, aq as Ti, ar as ji, as as Mi, at as Ri, au as Pi, av as Ni, aw as Li, ax as Ei, ay as Ai, az as Di, aA as Bi, aB as Wi, aC as Fi, aD as Oi, aE as _i, aF as Hi, aG as $i, aH as Vi, aI as Xi, aJ as Yi, aK as zi, aL as Ki, aM as Ui, aN as qi, aO as Gi, aP as Zi, aQ as Qi, aR as Ji, aS as eu, aT as tu, aU as nu, aV as lu, aW as su, aX as ou, aY as ru, aZ as au, a_ as cu, a$ as iu, b0 as uu, b1 as du, b2 as hu, b3 as fu, b4 as pu, b5 as De, b6 as xu, b7 as mu, b8 as lo, b9 as so, ba as bu, bb as gu, bc as vu, bd as yu, be as ku, bf as wu, bg as Su, bh as Cu, bi as _o, bj as Iu, bk as Tu, bl as ju, bm as Mu, bn as Ru, g as Pu, bo as Nu, bp as Lu, bq as Eu, br as Wr, bs as zs, bt as Au, bu as Gr, bv as Du, bw as Bu, bx as Wu, by as Ks, bz as Fu, bA as Ou, bB as _u, bC as Hu, bD as Rl, bE as $u, bF as Ko, bG as Uo, bH as xs, bI as Vu, bJ as Xu, bK as Yu, bL as zu, bM as Ku, bN as Uu } from "./chunks/backtest-CzvEPgfb.js";
import { ay as Us, aA as qs, m as Gs, aS as Zs } from "./chunks/ui-D7POjNks.js";
import { Q as qu, d as Gu, M as qo, R as Zu, e as Fr, c as Qu, a as Zr } from "./chunks/router-query-iQy8iLKR.js";
import { D as Ju } from "./chunks/depth-BNoeWN9_.js";
import { $ as ed } from "./chunks/ui-heavy-BL_8guwx.js";
function Or(l, n) {
  const { closes: f, highs: T, lows: I, opens: Q, volumes: ne, timestamps: Se } = l;
  let r = null;
  return n.movingAverages?.enabled && n.movingAverages.lines?.length > 0 && (r = n.movingAverages.lines.map(($) => {
    let ge;
    switch ($.type) {
      case "SMA":
        ge = kc(f, $.period);
        break;
      case "SMMA":
        ge = Br(f, $.period);
        break;
      case "EMA":
      default:
        ge = Dr(f, $.period);
        break;
    }
    return { data: ge, color: $.color, name: `${$.type} ${$.period}` };
  })), {
    rsi: n.rsi?.enabled ? pu(f, n.rsi.period) : null,
    macd: n.macd?.enabled ? fu(f, n.macd.fast, n.macd.slow, n.macd.signal) : null,
    ema: n.ema?.enabled ? n.ema.periods.map(($) => Dr(f, $)) : null,
    bollinger: n.bollinger?.enabled ? hu(f, n.bollinger.period, n.bollinger.stdDev) : null,
    movingAverages: r,
    atr: n.atr?.enabled ? du(T, I, f, n.atr.period) : null,
    stochastic: n.stochastic?.enabled ? uu(T, I, f, n.stochastic.kPeriod, n.stochastic.dPeriod, n.stochastic.smooth) : null,
    williamsR: n.williamsR?.enabled ? iu(T, I, f, n.williamsR.period) : null,
    cci: n.cci?.enabled ? cu(T, I, f, n.cci.period) : null,
    adx: n.adx?.enabled ? au(T, I, f, n.adx.period) : null,
    roc: n.roc?.enabled ? ru(f, n.roc.period) : null,
    vwap: n.vwap?.enabled ? ou(T, I, f, ne, Se) : null,
    ichimoku: n.ichimoku?.enabled ? su(T, I, f, n.ichimoku.tenkanPeriod, n.ichimoku.kijunPeriod, n.ichimoku.senkouBPeriod, n.ichimoku.displacement) : null,
    parabolicSAR: n.parabolicSAR?.enabled ? lu(T, I, n.parabolicSAR.afStart, n.parabolicSAR.afStep, n.parabolicSAR.afMax) : null,
    keltner: n.keltner?.enabled ? nu(T, I, f, n.keltner.emaPeriod, n.keltner.atrPeriod, n.keltner.multiplier) : null,
    pivotPoints: n.pivotPoints?.enabled ? tu(Se, T, I, f) : null,
    supertrend: n.supertrend?.enabled ? eu(T, I, f, n.supertrend.period, n.supertrend.multiplier) : null,
    donchian: n.donchian?.enabled ? Ji(T, I, n.donchian.period) : null,
    aroon: n.aroon?.enabled ? Qi(T, I, n.aroon.period) : null,
    envelopes: n.envelopes?.enabled ? Zi(f, n.envelopes.period, n.envelopes.percent) : null,
    dema: n.dema?.enabled ? Gi(f, n.dema.period) : null,
    tema: n.tema?.enabled ? qi(f, n.tema.period) : null,
    hma: n.hma?.enabled ? Ui(f, n.hma.period) : null,
    momentum: n.momentum?.enabled ? Ki(f, n.momentum.period) : null,
    awesomeOsc: n.awesomeOsc?.enabled ? zi(T, I) : null,
    mfi: n.mfi?.enabled ? Yi(T, I, f, ne, n.mfi.period) : null,
    tsi: n.tsi?.enabled ? Xi(f, n.tsi.longPeriod, n.tsi.shortPeriod, n.tsi.signalPeriod) : null,
    trix: n.trix?.enabled ? Vi(f, n.trix.period, n.trix.signalPeriod) : null,
    ultimateOsc: n.ultimateOsc?.enabled ? $i(T, I, f, n.ultimateOsc.fast, n.ultimateOsc.med, n.ultimateOsc.slow) : null,
    dpo: n.dpo?.enabled ? Hi(f, n.dpo.period) : null,
    kst: n.kst?.enabled ? _i(f, n.kst.roc1, n.kst.roc2, n.kst.roc3, n.kst.roc4, n.kst.sma1, n.kst.sma2, n.kst.sma3, n.kst.sma4, n.kst.signalPeriod) : null,
    stochRsi: n.stochRsi?.enabled ? Oi(f, n.stochRsi.rsiPeriod, n.stochRsi.kPeriod, n.stochRsi.dPeriod) : null,
    bbPercent: n.bbPercent?.enabled ? Fi(f, n.bbPercent.period, n.bbPercent.stdDev) : null,
    bbWidth: n.bbWidth?.enabled ? Wi(f, n.bbWidth.period, n.bbWidth.stdDev) : null,
    histVol: n.histVol?.enabled ? Bi(f, n.histVol.period) : null,
    chaikinVol: n.chaikinVol?.enabled ? Di(T, I, n.chaikinVol.emaPeriod, n.chaikinVol.rocPeriod) : null,
    stdDev: n.stdDev?.enabled ? Ai(f, n.stdDev.period) : null,
    obv: n.obv?.enabled ? Ei(f, ne) : null,
    cmf: n.cmf?.enabled ? Li(T, I, f, ne, n.cmf.period) : null,
    adl: n.adl?.enabled ? Ni(T, I, f, ne) : null,
    forceIndex: n.forceIndex?.enabled ? Pi(f, ne, n.forceIndex.period) : null,
    eom: n.eom?.enabled ? Ri(T, I, ne, n.eom.period) : null,
    volumeSma: n.volumeSma?.enabled ? Mi(ne, n.volumeSma.period) : null,
    fibRetracement: n.fibRetracement?.enabled ? ji(T, I, n.fibRetracement.lookback) : null,
    camarillaPivots: n.camarillaPivots?.enabled ? Ti(Se, T, I, f) : null,
    woodiePivots: n.woodiePivots?.enabled ? Ii(Se, T, I, f) : null,
    correlation: n.correlation?.enabled ? Ci(f, ne, n.correlation.period) : null,
    linearReg: n.linearReg?.enabled ? Si(f, n.linearReg.period, n.linearReg.deviations) : null,
    coppock: n.coppock?.enabled ? wi(f, n.coppock.longROC, n.coppock.shortROC, n.coppock.wmaPeriod) : null,
    alma: n.alma?.enabled ? ki(f, n.alma.period, n.alma.offset, n.alma.sigma) : null,
    kama: n.kama?.enabled ? yi(f, n.kama.period, n.kama.fastPeriod, n.kama.slowPeriod) : null,
    zlema: n.zlema?.enabled ? vi(f, n.zlema.period) : null,
    t3: n.t3?.enabled ? gi(f, n.t3.period, n.t3.vFactor) : null,
    lsma: n.lsma?.enabled ? bi(f, n.lsma.period) : null,
    mcginley: n.mcginley?.enabled ? mi(f, n.mcginley.period) : null,
    vortex: n.vortex?.enabled ? xi(T, I, f, n.vortex.period) : null,
    choppiness: n.choppiness?.enabled ? pi(T, I, f, n.choppiness.period) : null,
    elderRay: n.elderRay?.enabled ? fi(T, I, f, n.elderRay.period) : null,
    massIndex: n.massIndex?.enabled ? hi(T, I, n.massIndex.period) : null,
    chandeKroll: n.chandeKroll?.enabled ? di(T, I, f, n.chandeKroll.p, n.chandeKroll.q, n.chandeKroll.x) : null,
    chandelierExit: n.chandelierExit?.enabled ? ui(T, I, f, n.chandelierExit.period, n.chandelierExit.multiplier) : null,
    linRegSlope: n.linRegSlope?.enabled ? ii(f, n.linRegSlope.period) : null,
    priceChannel: n.priceChannel?.enabled ? ci(T, I, n.priceChannel.period) : null,
    alligator: n.alligator?.enabled ? ai(f) : null,
    accBands: n.accBands?.enabled ? ri(T, I, f, n.accBands.period) : null,
    ppo: n.ppo?.enabled ? oi(f, n.ppo.fast, n.ppo.slow, n.ppo.signal) : null,
    pvo: n.pvo?.enabled ? si(ne, n.pvo.fast, n.pvo.slow, n.pvo.signal) : null,
    cmo: n.cmo?.enabled ? li(f, n.cmo.period) : null,
    fisher: n.fisher?.enabled ? ni(T, I, n.fisher.period) : null,
    stc: n.stc?.enabled ? ti(f, n.stc.fast, n.stc.slow, n.stc.cycle) : null,
    rviOsc: n.rviOsc?.enabled ? ei(Q, T, I, f, n.rviOsc.period) : null,
    klinger: n.klinger?.enabled ? Jc(T, I, f, ne, n.klinger.fast, n.klinger.slow, n.klinger.signal) : null,
    connorsRsi: n.connorsRsi?.enabled ? Qc(f, n.connorsRsi.rsiPeriod, n.connorsRsi.streakPeriod, n.connorsRsi.rankPeriod) : null,
    apo: n.apo?.enabled ? Zc(f, n.apo.fast, n.apo.slow) : null,
    qstick: n.qstick?.enabled ? Gc(Q, f, n.qstick.period) : null,
    bop: n.bop?.enabled ? qc(Q, T, I, f, n.bop.period) : null,
    psychLine: n.psychLine?.enabled ? Uc(f, n.psychLine.period) : null,
    pfe: n.pfe?.enabled ? Kc(f, n.pfe.period, n.pfe.smoothing) : null,
    smi: n.smi?.enabled ? zc(T, I, f, n.smi.period, n.smi.smoothK, n.smi.smoothD) : null,
    ulcerIndex: n.ulcerIndex?.enabled ? Yc(f, n.ulcerIndex.period) : null,
    natr: n.natr?.enabled ? Xc(T, I, f, n.natr.period) : null,
    trueRange: n.trueRange?.enabled ? Vc(T, I, f) : null,
    squeeze: n.squeeze?.enabled ? $c(T, I, f, n.squeeze.bbPeriod, n.squeeze.bbMult, n.squeeze.kcPeriod, n.squeeze.kcMult) : null,
    relVolIndex: n.relVolIndex?.enabled ? Hc(f, n.relVolIndex.period, n.relVolIndex.smoothing) : null,
    vhf: n.vhf?.enabled ? _c(f, n.vhf.period) : null,
    vwma: n.vwma?.enabled ? Oc(f, ne, n.vwma.period) : null,
    volumeOsc: n.volumeOsc?.enabled ? Fc(ne, n.volumeOsc.fast, n.volumeOsc.slow) : null,
    nvi: n.nvi?.enabled ? Wc(f, ne) : null,
    pvi: n.pvi?.enabled ? Bc(f, ne) : null,
    pvt: n.pvt?.enabled ? Dc(f, ne) : null,
    vroc: n.vroc?.enabled ? Ac(ne, n.vroc.period) : null,
    netVolume: n.netVolume?.enabled ? Ec(f, ne, n.netVolume.period) : null,
    twiggsMF: n.twiggsMF?.enabled ? Lc(T, I, f, ne, n.twiggsMF.period) : null,
    linRegRSquared: n.linRegRSquared?.enabled ? Nc(f, n.linRegRSquared.period) : null,
    medianPrice: n.medianPrice?.enabled ? Pc(T, I) : null,
    typicalPrice: n.typicalPrice?.enabled ? Rc(T, I, f) : null,
    weightedClose: n.weightedClose?.enabled ? Mc(T, I, f) : null,
    demarkPivots: n.demarkPivots?.enabled ? jc(Se, T, I, Q, f) : null,
    zigzag: n.zigzag?.enabled ? Tc(T, I, f, n.zigzag.deviation) : null,
    fractals: n.fractals?.enabled ? Ic(T, I) : null,
    gator: n.gator?.enabled ? Cc(f) : null,
    smmaOverlay: n.smmaOverlay?.enabled ? Br(f, n.smmaOverlay.period) : null,
    wma: n.wma?.enabled ? Sc(f, n.wma.period) : null,
    customIndicators: (n.customIndicators || []).filter(($) => $.enabled).map(($) => {
      if (typeof $.expression == "string" && ($.expression.startsWith("brue:") || $.expression.startsWith("local:")) && Array.isArray($.data) && $.data.length > 0)
        return $;
      const ge = { closes: f, highs: T, lows: I, opens: Q, volumes: ne, timestamps: Se }, Oe = wc($.expression, ge);
      return { ...$, data: Oe.errors.length === 0 ? Oe.data : new Array(f.length).fill(NaN) };
    })
  };
}
function td(l, n) {
  if (n <= 0) return l;
  const f = new Array(n).fill(NaN), T = {};
  for (const I of Object.keys(l)) {
    const Q = l[I];
    if (Q == null) {
      T[I] = Q;
      continue;
    }
    if (Array.isArray(Q)) {
      Q.length > 0 && typeof Q[0] == "object" && Q[0] !== null && "data" in Q[0] ? T[I] = Q.map((ne) => ({ ...ne, data: f.concat(ne.data || []) })) : T[I] = f.concat(Q);
      continue;
    }
    if (typeof Q == "object") {
      const ne = {};
      for (const Se of Object.keys(Q)) {
        const r = Q[Se];
        if (Array.isArray(r)) ne[Se] = f.concat(r);
        else if (typeof r == "object" && r !== null) {
          const le = {};
          for (const $ of Object.keys(r)) {
            const ge = r[$];
            le[$] = Array.isArray(ge) ? f.concat(ge) : ge;
          }
          ne[Se] = le;
        } else ne[Se] = r;
      }
      T[I] = ne;
      continue;
    }
    T[I] = Q;
  }
  return T;
}
let Qs = null, nd = 0;
function _r() {
  return Qs || (Qs = new Worker(new URL(
    /* @vite-ignore */
    "/assets/indicatorWorker-DBDvDVhS.js",
    import.meta.url
  ), { type: "module" }), Qs);
}
function ld(l, n, f) {
  const [T, I] = o.useState(null), [Q, ne] = o.useState(!1), [Se, r] = o.useState(null), le = o.useRef(null), $ = o.useRef(null), ge = o.useRef(0), Oe = o.useRef(null), Pe = o.useCallback((ve) => {
    const { id: Me, result: Ze, error: _e, durationMs: Ce } = ve.data;
    if (!(Oe.current !== null && Me !== Oe.current)) {
      if (Oe.current = null, ne(!1), _e) {
        console.warn("[indicatorWorker] error", _e);
        return;
      }
      Ce !== void 0 && r(Ce), l.length > 0 && (ge.current = l[0].close), $.current = Ze, I(Ze);
    }
  }, [l]);
  return o.useEffect(() => {
    const ve = _r();
    return ve.addEventListener("message", Pe), () => ve.removeEventListener("message", Pe);
  }, [Pe]), o.useEffect(() => {
    if (!n || l.length === 0) {
      I(null);
      return;
    }
    const ve = l.length > 0 ? l[0].close : 0;
    if (f.current && $.current && ge.current === ve)
      return;
    const Me = le.current;
    let Ze, _e, Ce, Ve, tt, et, Ie = null;
    const ut = Me && Me.candles !== l && l.length >= Me.closes.length && l.length > 0 && Me.closes.length > 0 && l[0].time === Me.timestamps[0] && Me.closes.length > 10;
    let xe = 0;
    const wt = !ut && Me && Me.candles !== l && l.length > Me.closes.length && Me.closes.length > 10 && l.length - Me.closes.length > 0 && l[l.length - Me.closes.length]?.time === Me.timestamps[0];
    if (wt && (xe = l.length - Me.closes.length), ut) {
      const qe = Me.closes.length, ht = Math.max(0, qe - 1);
      Ze = Me.closes, _e = Me.highs, Ce = Me.lows, Ve = Me.opens, tt = Me.volumes, et = Me.timestamps, Ze.length = ht, _e.length = ht, Ce.length = ht, Ve.length = ht, tt.length = ht, et.length = ht;
      for (let Ct = ht; Ct < l.length; Ct++) {
        const Rt = l[Ct];
        Ze.push(Rt.close), _e.push(Rt.high), Ce.push(Rt.low), Ve.push(Rt.open), tt.push(Rt.volume || 0), et.push(Rt.time);
      }
      Ie = { closes: Ze, highs: _e, lows: Ce, opens: Ve, volumes: tt, timestamps: et }, le.current = { candles: l, closes: Ze, highs: _e, lows: Ce, opens: Ve, volumes: tt, timestamps: et };
      const qt = Object.values(n).filter((Ct) => Ct?.enabled).length;
      if (!(l.length > 3e3 && qt > 3)) {
        const Ct = performance.now(), Rt = Or(Ie, n), tn = performance.now() - Ct;
        r(tn), $.current = Rt, ge.current = ve, I(Rt);
        return;
      }
    } else if (wt && $.current) {
      const qe = new Array(xe), ht = new Array(xe), qt = new Array(xe), Sn = new Array(xe), Ct = new Array(xe), Rt = new Array(xe);
      for (let Gt = 0; Gt < xe; Gt++) {
        const nn = l[Gt];
        qe[Gt] = nn.close, ht[Gt] = nn.high, qt[Gt] = nn.low, Sn[Gt] = nn.open, Ct[Gt] = nn.volume || 0, Rt[Gt] = nn.time;
      }
      Ze = qe.concat(Me.closes), _e = ht.concat(Me.highs), Ce = qt.concat(Me.lows), Ve = Sn.concat(Me.opens), tt = Ct.concat(Me.volumes), et = Rt.concat(Me.timestamps);
      const tn = td($.current, xe);
      le.current = { candles: l, closes: Ze, highs: _e, lows: Ce, opens: Ve, volumes: tt, timestamps: et }, $.current = tn, ge.current = ve, I(tn);
      return;
    } else
      Ze = l.map((qe) => qe.close), _e = l.map((qe) => qe.high), Ce = l.map((qe) => qe.low), Ve = l.map((qe) => qe.open), tt = l.map((qe) => qe.volume || 0), et = l.map((qe) => qe.time), Ie = { closes: Ze, highs: _e, lows: Ce, opens: Ve, volumes: tt, timestamps: et }, le.current = { candles: l, closes: Ze, highs: _e, lows: Ce, opens: Ve, volumes: tt, timestamps: et };
    Ie || (Ie = { closes: Ze, highs: _e, lows: Ce, opens: Ve, volumes: tt, timestamps: et });
    const St = Object.values(n).filter((qe) => qe?.enabled).length;
    if (!(l.length > 1e3 || St > 5 || (n.customIndicators?.filter((qe) => qe.enabled)?.length || 0) > 0)) {
      const qe = performance.now(), ht = Or(Ie, n), qt = performance.now() - qe;
      r(qt), $.current = ht, ge.current = ve, I(ht);
      return;
    }
    ne(!0);
    const Ht = _r(), Ut = ++nd;
    Oe.current = Ut, Ht.postMessage({ id: Ut, price: Ie, indicators: n });
  }, [l, n, f]), { indicatorData: T, isComputing: Q, computeDurationMs: Se };
}
function ms(l) {
  const {
    ctx: n,
    candles: f,
    startIndex: T,
    indexToX: I,
    priceToY: Q,
    morphAt: ne,
    candleBodyWidth: Se,
    wickWidth: r,
    colors: le
  } = l, $ = new Path2D(), ge = new Path2D(), Oe = Se / 2, Pe = f.length, ve = new Float64Array(Pe), Me = new Float64Array(Pe), Ze = new Float64Array(Pe), _e = new Float64Array(Pe), Ce = new Float64Array(Pe), Ve = new Float64Array(Pe), tt = new Float64Array(Pe), et = new Float64Array(Pe);
  let Ie = 0, ut = 0;
  for (let xe = 0; xe < f.length; xe++) {
    const wt = ne(xe, f[xe]), St = I(T + xe, T), Ue = Q(wt.open), Ht = Q(wt.close), Ut = Q(wt.high), qe = Q(wt.low), ht = Math.min(Ue, Ht), qt = Math.max(1, Math.abs(Ht - Ue));
    wt.close >= wt.open ? ($.moveTo(St, Ut), $.lineTo(St, qe), ve[Ie] = St - Oe, Me[Ie] = ht, Ze[Ie] = Se, _e[Ie] = qt, Ie++) : (ge.moveTo(St, Ut), ge.lineTo(St, qe), Ce[ut] = St - Oe, Ve[ut] = ht, tt[ut] = Se, et[ut] = qt, ut++);
  }
  if (n.lineWidth = r, n.lineCap = "round", Ie) {
    n.strokeStyle = le.bullishWick, n.stroke($), n.fillStyle = le.bullish;
    for (let xe = 0; xe < Ie; xe++)
      n.fillRect(ve[xe], Me[xe], Ze[xe], _e[xe]);
  }
  if (ut) {
    n.strokeStyle = le.bearishWick, n.stroke(ge), n.fillStyle = le.bearish;
    for (let xe = 0; xe < ut; xe++)
      n.fillRect(Ce[xe], Ve[xe], tt[xe], et[xe]);
  }
  if (n.lineCap = "butt", n.lineWidth = 1, Ie) {
    n.strokeStyle = le.bullishBorder;
    for (let xe = 0; xe < Ie; xe++)
      n.strokeRect(ve[xe], Me[xe], Ze[xe], _e[xe]);
  }
  if (ut) {
    n.strokeStyle = le.bearishBorder;
    for (let xe = 0; xe < ut; xe++)
      n.strokeRect(Ce[xe], Ve[xe], tt[xe], et[xe]);
  }
}
const sd = (l) => {
  const n = (l || "").toUpperCase();
  if (n.includes("XAU") || n.includes("XAG")) return 0.8;
  if (n.includes("NAS100") || n.includes("SPX500") || n.includes("US30") || n.includes("US2000")) return 1.5;
  if (n.includes("BCO") || n.includes("WTICO")) return 0.05;
  if (n.includes("BTC")) return 4;
  if (n.includes("ETH")) return 2;
  if (n.includes("JPY")) return 1e-3;
  const f = n.replace("/", "");
  return f.length === 6 && /EUR|GBP|AUD|NZD|CAD|CHF|USD/.test(f) ? 1e-5 : 0.04;
}, od = (l, n) => sd(l), Go = ({
  candles: l,
  livePrice: n,
  symbol: f = "",
  timezone: T = "UTC",
  countdown: I,
  onCrosshairMove: Q,
  syncedCrosshairTime: ne,
  colors: Se,
  indicators: r,
  onIndicatorsChange: le,
  onRemoveBruePlot: $,
  onRemoveEngineIndicator: ge,
  onEditEngineIndicator: Oe,
  onConverterReady: Pe,
  onVisibleRangeChange: ve,
  onViewportTimeChange: Me,
  syncedViewportTime: Ze,
  disableAutoFollow: _e = !1,
  scrollToIndex: Ce,
  chartType: Ve = "candlestick",
  onScrollingChange: tt,
  onScrollSync: et,
  scrollOffsetRef: Ie,
  optionsPdfEnabled: ut = !1,
  heatmapEnabled: xe = !1,
  externalDimensions: wt,
  economicEvents: St,
  positionLines: Ue,
  onPositionModify: Ht,
  onPositionClose: Ut,
  autoSelectPositionId: qe,
  l2DepthData: ht,
  onOpenSettings: qt,
  onOpenCustomEditor: Sn,
  showBidAskSpread: Ct = !1,
  brokerBid: Rt = null,
  brokerAsk: tn = null,
  showSessions: Gt = !1,
  timeframe: nn = "5m",
  rightOffset: An,
  onLoadMore: ml,
  isLoadingMore: Kl = !1,
  prependShift: bl = 0,
  drawings: qn,
  selectedDrawingId: Pl,
  drawingCursorRef: Is,
  requestRedrawRef: Ul,
  isDrawingDragging: Ts = !1
}) => {
  const js = o.useRef(null), Ms = o.useRef(null), Xe = o.useRef(null), Nl = o.useRef(null), ql = o.useRef(!1), Gl = o.useRef(null);
  o.useRef(null);
  const oo = o.useRef(l), Ll = o.useRef(ne ?? null), Zl = o.useRef(!1), El = o.useRef(null), dn = typeof window < "u" ? Math.min(window.devicePixelRatio || 1, 2) : 1, [ie, Gn] = o.useState({ width: 300, height: 300 }), [se, Et] = o.useState({
    startIndex: 0,
    candleWidth: 3,
    // Zoomed out default - shows more candles on first load
    // Backtest/replay mode has no future candles arriving, so zero right-side padding.
    // TERMINAL DIVERGENCE from the site port: the site keeps 35 future candles
    // for economic event flags, but the terminal draws no flags on the chart
    // (ECONOMIC is its own tab), so that margin was pure dead space on the
    // right and was dropped.
    futureSpace: 0,
    autoFollowLatest: !_e
    // Start disabled if in replay mode
  }), Te = o.useRef({
    startIndex: 0,
    candleWidth: 3
  }), _n = o.useRef({
    startIndex: 0,
    candleWidth: 3
  }), nt = o.useRef(!1), hn = o.useRef(!1), Be = o.useRef(null), st = o.useRef(null), it = o.useRef(null), Qe = o.useRef(null), fn = o.useRef(null), Ql = o.useRef(0), [, Ft] = o.useState(0), Al = o.useRef(null), Zn = (a) => {
    const p = Be.current, m = Al.current;
    if (p && m && m.posId === p) return m.offset;
    const v = sn.current, h = v && v.range > 0 ? v.range * 0.18 : a * 5e-3;
    return Al.current = p && h > 0 ? { posId: p, offset: h } : null, h;
  }, Qn = o.useRef(null);
  o.useEffect(() => {
    if (qe && qe !== Qn.current && Ue) {
      const a = Ue.find((p) => p.id === qe);
      a && (Qn.current = qe, Be.current = a.id, st.current = a.stopLoss ?? null, it.current = a.takeProfit ?? null, Ft((p) => p + 1));
    }
  }, [qe, Ue]);
  const Jl = o.useRef(0), It = o.useCallback((a) => {
    nt.current = a, hn.current !== a && (hn.current = a, tt?.(a), a || (Jl.current = Te.current.startIndex, Ie && (Ie.current = 0)));
  }, [tt, Ie]), pt = o.useCallback(() => {
    if (Ie) {
      const a = Te.current.startIndex, p = Te.current.candleWidth * (1 + De), m = a - Jl.current;
      Ie.current = m * p;
    }
    et?.();
  }, [et, Ie]), es = o.useRef(pt);
  es.current = pt;
  const Cn = o.useRef(null), Dn = o.useRef(null), Hn = o.useRef(null), Dl = o.useRef(!1), Ye = o.useCallback((a = !1) => {
    if (Hn.current !== null) {
      a || (Dl.current = !1);
      return;
    }
    Dl.current = a, Hn.current = requestAnimationFrame(() => {
      Hn.current = null;
      const p = Dl.current;
      Cn.current && Cn.current(p);
    });
  }, []);
  o.useCallback((a = !1) => {
    Hn.current !== null && (cancelAnimationFrame(Hn.current), Hn.current = null), Cn.current && Cn.current(a);
  }, []);
  const ts = o.useRef(null), Bl = o.useRef(0), gl = o.useRef(0), $n = o.useRef(!1), In = o.useRef(0), vl = o.useRef(null), ns = o.useRef(void 0), $t = o.useRef(null), Vt = o.useRef("standard"), [Jn, el] = o.useState([]), xt = o.useRef(null), an = o.useRef(null), yl = o.useRef([]), tl = o.useRef(null), Tn = o.useRef(null), [Bn, nl] = o.useState(!1), [pn, ls] = o.useState({ x: 0, y: 0, startIndex: 0, priceOffset: 0 }), [Rs, Ps] = o.useState(0), [ro, xn] = o.useState(1), Pt = o.useRef(null), mt = o.useRef(null), ll = o.useRef(0), kl = o.useRef(null), ot = o.useRef(null), [jn, sl] = o.useState(!1), ol = o.useRef(null), rl = o.useRef(0), Wl = o.useRef(0), Mn = o.useRef(!1);
  o.useRef(0), o.useRef(0);
  const mn = o.useRef(null), Wn = o.useRef(null), bn = o.useRef(null), ao = o.useRef(null), co = "ns-resize", k = "ns-resize";
  o.useRef(12), o.useRef(0), o.useRef(0);
  const [de, je] = o.useState(0.15), [yt, Zt] = o.useState(!1), rt = o.useRef({ y: 0, ratio: 0 });
  o.useRef(null);
  const [ln, Ot] = o.useState(1), [Re, Tt] = o.useState(0), [Xt, Fl] = o.useState(null), [Ge, Ol] = o.useState(null), [Jo, io] = o.useState(!1), [er, Jr] = o.useState(!1), ss = o.useRef({ y: 0, scale: 1, offset: 0 }), al = Xt !== null, gn = o.useRef(1), Vn = o.useRef(0), Xn = o.useRef(null), sn = o.useRef(null), on = o.useRef(0), wl = o.useRef(null), [Yn, ea] = xu("preferences.chartShowOHLC", !0), [tr, ta] = o.useState(0), [os, nr] = o.useState(!1), [hh, na] = o.useState(0), uo = o.useRef(null), ho = o.useRef(!1);
  o.useEffect(() => {
    if (!os) return;
    const a = setInterval(() => na((p) => p + 1), 3e4);
    return () => clearInterval(a);
  }, [os]), o.useEffect(() => {
    St && St.length > 0 && mu(St.map((a) => a.region_code));
  }, [St]), o.useEffect(() => {
    if (!os) return;
    const a = (p) => {
      uo.current && !uo.current.contains(p.target) && nr(!1);
    };
    return document.addEventListener("mousedown", a), () => document.removeEventListener("mousedown", a);
  }, [os]);
  const [fo, la] = o.useState(0), [po, sa] = o.useState(0), [xo, oa] = o.useState(0), [mo, ra] = o.useState(0), [bo, aa] = o.useState(0), _l = o.useRef({}), [lt, ca] = o.useState({}), Fn = o.useRef({}), [lr, ia] = o.useState({}), [sr, go] = o.useState(null), [rs, Hl] = o.useState(null), Qt = o.useRef({});
  o.useRef(null);
  const or = o.useRef(!1), Jt = o.useRef(!1), ft = o.useRef(null), [ua, fe] = o.useState(null), [kt, ce] = o.useState(null), [Rn, bt] = o.useState(null), rr = typeof navigator < "u" && /Mac|iPhone|iPad|iPod/.test(navigator.platform), [as, da] = o.useState(rr ? 8 : 2), vo = o.useRef(rr), cs = lo(), yo = o.useRef(cs);
  yo.current = cs, o.useEffect(() => {
    cs.chart?.scrollSensitivity !== void 0 && da(cs.chart.scrollSensitivity);
  }, [cs.chart?.scrollSensitivity]);
  const J = { ...so(), ...Se }, ar = typeof document < "u" && document.documentElement.classList.contains("dark");
  o.useEffect(() => {
    nt.current || (Te.current = {
      startIndex: se.startIndex,
      candleWidth: se.candleWidth
    });
  }, [se.startIndex, se.candleWidth]), o.useEffect(() => {
    gn.current = ln, Vn.current = Re;
  }, [ln, Re]), o.useEffect(() => {
    if (!se.autoFollowLatest) return;
    const a = setInterval(() => {
      Ps((p) => (p + 0.1) % (Math.PI * 2)), xn(0.85 + Math.sin(Date.now() / 1e3) * 0.15);
    }, 150);
    return () => clearInterval(a);
  }, [se.autoFollowLatest]), o.useEffect(() => {
    oo.current = l;
    const a = l[l.length - 1];
    a && (Gl.current = {
      time: a.time,
      open: a.open,
      high: a.high,
      low: a.low,
      close: a.close
    }, se.autoFollowLatest && Cn.current && Cn.current(!0));
  }, [l, se.autoFollowLatest]), o.useEffect(() => {
    const p = ((h) => {
      const e = h.toUpperCase().replace("_", "").replace("/", ""), F = [
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
      for (const H of F)
        if (e === H || e.startsWith(H)) return { ticker: H, etfDragPerYear: 0 };
      return e.includes("XAU") || e.includes("GOLD") ? { ticker: "GLD", etfDragPerYear: 4e-3 } : e.includes("SPX500") || e.includes("SPX") ? { ticker: "SPY", etfDragPerYear: 0 } : e.includes("NAS100") || e.includes("NDX") ? { ticker: "QQQ", etfDragPerYear: 0 } : e.includes("US30") || e.includes("DJI") ? { ticker: "DIA", etfDragPerYear: 0 } : null;
    })(f);
    if (!p || !ut) {
      go(null);
      return;
    }
    const m = async () => {
      try {
        const h = [];
        if (!h || h.length === 0) {
          go(null);
          return;
        }
        const e = h[0], F = l[l.length - 1]?.close || parseFloat(e.current_price), H = parseFloat(e.current_price), K = H > 0 ? F / H : 1;
        let O = 0;
        if (e.expiration) {
          const X = new Date(e.expiration).getTime();
          Number.isNaN(X) || (O = Math.max(0, (X - Date.now()) / (365 * 24 * 3600 * 1e3)));
        }
        const b = Math.exp(p.etfDragPerYear * O), w = K * b;
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
      } catch (h) {
        console.error("Failed to fetch predicted price:", h);
      }
    };
    m();
    const v = setInterval(m, 6e4);
    return () => clearInterval(v);
  }, [f, ut]), o.useEffect(() => {
    if (!xe || !f) {
      el([]);
      return;
    }
    const a = async () => {
      try {
        const m = f.includes("/") ? f : f.length === 6 ? `${f.substring(0, 3)}/${f.substring(3)}` : f, v = await _u("l2_heatmap_snapshots", {
          params: { symbol: `eq.${m}`, order: "timestamp.desc", limit: "300" }
        });
        v && v.length > 0 && el(v.reverse());
      } catch (m) {
        console.error("Failed to fetch heatmap data:", m);
      }
    };
    a();
    const p = setInterval(a, 5e3);
    return () => clearInterval(p);
  }, [f, xe]), o.useEffect(() => () => {
    Pt.current !== null && cancelAnimationFrame(Pt.current), an.current !== null && cancelAnimationFrame(an.current), mn.current !== null && cancelAnimationFrame(mn.current), Wn.current !== null && cancelAnimationFrame(Wn.current), bn.current !== null && cancelAnimationFrame(bn.current), mt.current !== null && clearTimeout(mt.current), Xn.current !== null && clearTimeout(Xn.current);
  }, []);
  const { isPhone: ha, isDesktop: Ns } = bu(ie.width), Ae = o.useMemo(() => gu(ie.width), [ie.width]), cr = ha, ir = n || (l.length > 0 ? l[l.length - 1]?.close : 100), We = o.useMemo(() => vu(cr, f, ir || 100, An), [cr, Ns, f, ir, An]), gt = Ae.timeAxisHeight, Ls = Ae.priceLabelFont, ur = Ae.timeLabelFont, _t = Ae.subplotLabelFont, Es = 1, As = 50, cl = o.useMemo(() => {
    const a = [], m = Math.pow(As / Es, 0.025);
    for (let v = 0; v <= 40; v++)
      a.push(Es * Math.pow(m, v));
    return a;
  }, []), Pn = o.useCallback((a = !1) => {
    const p = ie.width - We, m = a && nt.current ? Te.current : se, v = m.candleWidth * (1 + De), h = Math.floor(p / v), e = Math.max(0, Math.floor(m.startIndex)), F = Math.min(l.length, e + h);
    return {
      candles: l.slice(e, F),
      startIndex: e,
      endIndex: F,
      visibleCount: h,
      totalWithFuture: h + se.futureSpace,
      candleWidth: m.candleWidth
    };
  }, [l, ie.width, se]);
  o.useEffect(() => {
    if (l.length > 0) {
      const a = ie.width - We, p = se.candleWidth * (1 + De), m = Math.floor(a / p), v = Math.max(0, Math.floor(se.startIndex)), h = Math.min(l.length, v + m);
      ve && ve({ startIndex: v, endIndex: h, totalCandles: l.length }), ml && v < 2500 && !Kl && !Mn.current && !se.autoFollowLatest && (vl.current && clearTimeout(vl.current), vl.current = setTimeout(() => {
        Mn.current || ml();
      }, 100));
    }
  }, [ve, ml, Kl, l.length, se.startIndex, se.candleWidth, ie.width, se.autoFollowLatest]), o.useEffect(() => {
    if (!Me || l.length === 0) return;
    if (Zl.current) {
      Zl.current = !1;
      return;
    }
    const a = ie.width - We, p = se.candleWidth * (1 + De), m = Math.floor(a / p), v = Math.max(0, Math.floor(se.startIndex)), h = Math.min(l.length, v + m), e = l.slice(v, h);
    if (e.length === 0) return;
    const F = Math.floor(e.length / 2), H = e[F];
    H && H.time !== El.current && (El.current = H.time, Me(H.time));
  }, [Me, l, se.startIndex, se.candleWidth, ie.width]), o.useEffect(() => {
    if (!Ze || l.length === 0 || Ze === El.current) return;
    let a = -1, p = 1 / 0;
    for (let A = 0; A < l.length; A++) {
      const X = Math.abs(l[A].time - Ze);
      X < p && (p = X, a = A);
    }
    if (a === -1) return;
    const m = ie.width - We, v = se.candleWidth * (1 + De), h = Math.floor(m / v), e = Math.max(0, Math.floor(se.startIndex)), F = Math.min(l.length, e + h), H = Math.floor(h / 2), K = Math.max(0, a - H), O = a >= e && a < F, b = e + Math.floor(h / 2);
    (!O || Math.abs(a - b) > H / 2) && (Zl.current = !0, Et((A) => ({
      ...A,
      startIndex: K,
      autoFollowLatest: !1
    })), Te.current.startIndex = K);
  }, [Ze, l, ie.width, se.candleWidth, se.startIndex]);
  const Sl = o.useCallback((a, p = !0) => {
    if (Xt !== null && Ge !== null) {
      const K = gn.current, O = Vn.current, b = Ge / K, w = Xt + O;
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
    const h = v - m, e = h * 0.05, F = (v + m) / 2, H = h + e * 2;
    return {
      min: F - H / 2,
      max: F + H / 2,
      range: H
    };
  }, [n, Xt, Ge]), at = o.useCallback((a, p) => {
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
    ].filter((H) => r?.[H]?.enabled).length, h = ie.height - gt, e = v > 0 ? Math.max(60 * v, h * de) : 0, F = h - e;
    return F - (a - p.min) / p.range * F;
  }, [ie.height, r, l, de]), dr = o.useCallback((a, p) => {
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
    ].filter((H) => r?.[H]?.enabled).length, h = ie.height - gt, e = v > 0 ? Math.max(60 * v, h * de) : 0, F = h - e;
    return p.max - a / F * p.range;
  }, [ie.height, r, l, de]), hr = o.useCallback((a, p) => {
    const m = se.candleWidth * (1 + De);
    return (a - p) * m + m / 2;
  }, [se.candleWidth]), is = o.useCallback((a, p) => {
    const m = se.candleWidth * (1 + De);
    return Math.floor(a / m) + p;
  }, [se.candleWidth]), Nn = o.useCallback((a) => yu(a, f), [f]), Cl = o.useCallback((a) => {
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
  }, [T]), zn = o.useCallback((a, p = !1) => {
    const m = new Date(a);
    if (T === "local") {
      const v = m.getDate(), h = m.toLocaleString("en", { month: "short" }), e = String(m.getFullYear()).slice(-2);
      return p ? `${v} ${h} '${e}` : `${v} ${h}`;
    } else if (T === "UTC") {
      const v = m.getUTCDate(), h = m.toLocaleString("en", { month: "short", timeZone: "UTC" }), e = String(m.getUTCFullYear()).slice(-2);
      return p ? `${v} ${h} '${e}` : `${v} ${h}`;
    } else
      try {
        const v = m.toLocaleDateString("en-GB", { timeZone: T, day: "numeric" }), h = m.toLocaleDateString("en-GB", { timeZone: T, month: "short" }), e = m.toLocaleDateString("en-GB", { timeZone: T, year: "2-digit" });
        return p ? `${v} ${h} '${e}` : `${v} ${h}`;
      } catch {
        const v = m.getUTCDate(), h = m.toLocaleString("en", { month: "short", timeZone: "UTC" }), e = String(m.getUTCFullYear()).slice(-2);
        return p ? `${v} ${h} '${e}` : `${v} ${h}`;
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
    const m = a / p, v = Math.pow(10, Math.floor(Math.log10(m))), h = m / v;
    let e;
    return h <= 1 ? e = 1 : h <= 2 ? e = 2 : h <= 5 ? e = 5 : e = 10, e * v;
  };
  o.useRef(null);
  const { indicatorData: s } = ld(l, r, nt), il = o.useCallback((a = !1) => {
    const p = Ms.current;
    if (!p) return;
    const { width: m, height: v } = ie;
    Nl.current || (Nl.current = document.createElement("canvas"));
    const h = Nl.current;
    (h.width !== p.width || h.height !== p.height) && (h.width = p.width, h.height = p.height);
    const e = h.getContext("2d");
    if (!e) return;
    const F = !1;
    e.setTransform(dn, 0, 0, dn, 0, 0);
    const H = !!s?.rsi, K = !!s?.macd, O = !!s?.atr, b = !!s?.stochastic, w = r?.volume?.enabled && l.some((D) => D.volume !== void 0 && D.volume > 0), A = !!s?.williamsR, X = !!s?.cci, u = !!s?.adx, N = !!s?.roc, x = !!s?.aroon, V = !!s?.momentum, d = !!s?.ao, M = !!s?.mfi, oe = !!s?.tsi, Ne = !!s?.trix, Z = !!s?.ultimateOsc, Le = !!s?.dpo, q = !!s?.kst, ye = !!s?.stochRsi, He = !!s?.bbPercent, Ee = !!s?.bbWidth, re = !!s?.histVol, ke = !!s?.chaikinVol, Ke = !!s?.stdDev, Fe = !!s?.obv, Dt = !!s?.cmf, vn = !!s?.adl, Yt = !!s?.forceIndex, Os = !!s?.eom, jt = !!s?.correlation, hl = !!s?.coppock, ds = !!s?.vortex, _s = !!s?.choppiness, jo = !!s?.elderRay, Mo = !!s?.massIndex, Ro = !!s?.linRegSlope, Ea = !!s?.ppo, Aa = !!s?.pvo, Da = !!s?.cmo, Ba = !!s?.fisher, Wa = !!s?.stc, Fa = !!s?.rviOsc, Oa = !!s?.klinger, _a = !!s?.connorsRsi, Ha = !!s?.apo, $a = !!s?.qstick, Va = !!s?.bop, Xa = !!s?.psychLine, Ya = !!s?.pfe, za = !!s?.smi, Ka = !!s?.ulcerIndex, Ua = !!s?.natr, qa = !!s?.trueRange, Ga = !!s?.squeeze, Za = !!s?.relVolIndex, Qa = !!s?.vhf, Ja = !!s?.volumeOsc, ec = !!s?.nvi, tc = !!s?.pvi, nc = !!s?.pvt, lc = !!s?.vroc, sc = !!s?.netVolume, oc = !!s?.twiggsMF, rc = !!s?.linRegRSquared, ac = !!s?.gator, Hs = [
      H,
      K,
      O,
      b,
      A,
      X,
      u,
      N,
      x,
      V,
      d,
      M,
      oe,
      Ne,
      Z,
      Le,
      q,
      ye,
      He,
      Ee,
      re,
      ke,
      Ke,
      Fe,
      Dt,
      vn,
      Yt,
      Os,
      jt,
      hl,
      // Phase 2
      ds,
      _s,
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
      Ha,
      $a,
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
      lc,
      sc,
      oc,
      rc,
      ac
    ].filter(Boolean).length + (s?.customIndicators?.filter((D) => D.display === "subplot").length || 0), wr = v - gt, Sr = Hs > 0 ? Math.max(60 * Hs, wr * de) : 0, Kn = Hs > 0 ? Sr / Hs : 0, we = wr - Sr, U = m - We;
    e.fillStyle = J.background, e.fillRect(0, 0, m, v);
    const c = Pn(!0), cn = nt.current ? Te.current.candleWidth : se.candleWidth, ze = Sl(c.candles, se.autoFollowLatest);
    sn.current = ze, on.current = we;
    const Cr = nt.current ? Te.current.startIndex : se.startIndex, cc = (Cr - c.startIndex) * (cn * (1 + De)), he = (D, i) => {
      const j = cn * (1 + De);
      return (D - i) * j + j / 2 - cc;
    }, Je = (D) => {
      const i = (D - ze.min) / ze.range;
      return we - i * we;
    }, $s = (J.gridOpacity ?? 100) / 100;
    e.globalAlpha = $s, e.strokeStyle = J.grid, e.lineWidth = 0.5, e.setLineDash([]);
    const ic = yo.current?.chart?.gridHorizontalLines, uc = yo.current?.chart?.gridVerticalLines, dc = Ns ? ic ?? Ae.priceTargetLabels : Ae.priceTargetLabels, Vs = fa(ze.range, dc), Ir = Math.ceil(ze.min / Vs) * Vs, hc = c.startIndex + c.candles.length - 1, fc = he(l.length - 1, c.startIndex) <= U ? U : Math.max(0, Math.min(U, he(hc, c.startIndex) + cn / 2)), Tr = 25;
    e.beginPath();
    let jr = -1 / 0;
    for (let D = Ir; D <= ze.max; D += Vs) {
      const i = Je(D);
      Math.abs(i - jr) < Tr || (jr = i, e.moveTo(0, i), e.lineTo(fc, i));
    }
    e.stroke(), e.setLineDash([]), e.globalAlpha = 1;
    const Mr = cn * (1 + De), Po = Math.ceil(U / Mr), No = c.startIndex + Po, pc = Ns ? uc ?? Ae.targetLinesOnScreen : Ae.targetLinesOnScreen, xc = Math.max(1, Math.round(Po / pc)), $l = Math.max(1, xc), Rr = $l / 2, mc = Po / $l, Pr = Math.max(0, Math.min(
      1,
      (mc - 8) / 6
    )), Nr = $l / 2, Lr = Ae.tertiaryGridVisible ? Math.max(0, Math.min(
      0.5,
      (3 - Mr) / 1.5
    )) : 0;
    e.globalAlpha = $s, e.strokeStyle = J.grid, e.beginPath();
    const Lo = c.startIndex;
    for (let D = Lo; D <= No; D += $l) {
      const i = he(D, c.startIndex);
      if (i >= 0 && i <= U && (e.moveTo(i, 0), e.lineTo(i, we)), i > U) break;
    }
    if (e.stroke(), Pr > 0.01 && Rr >= 1) {
      e.globalAlpha = Pr * $s, e.strokeStyle = J.grid, e.beginPath();
      const D = c.startIndex;
      for (let i = D; i <= No; i += Rr) {
        if ((i - Lo) % $l === 0) continue;
        const j = he(i, c.startIndex);
        if (j >= 0 && j <= U && (e.moveTo(j, 0), e.lineTo(j, we)), j > U) break;
      }
      e.stroke(), e.globalAlpha = 1;
    }
    if (Lr > 0.01 && Nr >= 1) {
      e.globalAlpha = Lr * $s, e.strokeStyle = J.grid, e.beginPath();
      const D = c.startIndex;
      for (let i = D; i <= No; i += Nr) {
        if ((i - Lo) % $l === 0) continue;
        const j = he(i, c.startIndex);
        if (j >= 0 && j <= U && (e.moveTo(j, 0), e.lineTo(j, we)), j > U) break;
      }
      e.stroke(), e.globalAlpha = 1;
    }
    e.globalAlpha = 1, e.strokeStyle = J.axisLine || J.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(U, 0), e.lineTo(U, v), e.stroke(), e.save(), e.beginPath(), e.rect(0, 0, U, we), e.clip();
    const Eo = {
      ctx: e,
      chartWidth: U,
      mainChartHeight: we,
      candles: l,
      visible: c,
      indexToX: he,
      mainPriceToY: Je,
      currentCandleWidth: cn
    };
    if (ut && sr && ku(Eo, sr), xe && Jn.length > 0 && wu(Eo, Jn), ht && (ht.bids.length > 0 || ht.asks.length > 0) && Su(Eo, ht), Gt) {
      const D = {
        ctx: e,
        chartWidth: U,
        mainChartHeight: we,
        candles: l,
        visibleStartIndex: c.startIndex,
        visibleEndIndex: c.startIndex + c.candles.length,
        candleWidth: cn,
        indexToX: he,
        isDark: ar,
        timeframe: nn
      };
      Cu(D);
    }
    const Ln = Math.max(cn * 0.7, 3), hs = Math.max(1, Ln * 0.15), Ao = Gl.current, bc = l.length - 1, Il = (D, i) => Ao && c.startIndex + D === bc && Ao.time === i.time ? Ao : i;
    if (Ve === "candlestick")
      ms({
        ctx: e,
        candles: c.candles,
        startIndex: c.startIndex,
        indexToX: he,
        priceToY: Je,
        morphAt: Il,
        candleBodyWidth: Ln,
        wickWidth: hs,
        colors: {
          bullish: J.bullish,
          bearish: J.bearish,
          bullishWick: J.bullishWick,
          bearishWick: J.bearishWick,
          bullishBorder: J.bullishBorder,
          bearishBorder: J.bearishBorder
        }
      });
    else if (Ve === "line")
      e.strokeStyle = J.bullish, e.lineWidth = 2, e.beginPath(), c.candles.forEach((D, i) => {
        const j = he(c.startIndex + i, c.startIndex), g = Je(Il(i, D).close);
        i === 0 ? e.moveTo(j, g) : e.lineTo(j, g);
      }), e.stroke();
    else if (Ve === "area") {
      const D = e.createLinearGradient(0, 0, 0, we);
      if (D.addColorStop(0, "rgba(34, 197, 94, 0.4)"), D.addColorStop(1, "rgba(34, 197, 94, 0.02)"), e.beginPath(), c.candles.forEach((i, j) => {
        const g = he(c.startIndex + j, c.startIndex), C = Je(Il(j, i).close);
        j === 0 ? e.moveTo(g, C) : e.lineTo(g, C);
      }), c.candles.length > 0) {
        const i = he(c.startIndex + c.candles.length - 1, c.startIndex), j = he(c.startIndex, c.startIndex);
        e.lineTo(i, we), e.lineTo(j, we), e.closePath(), e.fillStyle = D, e.fill();
      }
      e.strokeStyle = J.bullish, e.lineWidth = 2, e.beginPath(), c.candles.forEach((i, j) => {
        const g = he(c.startIndex + j, c.startIndex), C = Je(Il(j, i).close);
        j === 0 ? e.moveTo(g, C) : e.lineTo(g, C);
      }), e.stroke();
    } else if (Ve === "heikin_ashi") {
      let D = c.candles[0]?.open || 0, i = c.candles[0]?.close || 0;
      const j = c.candles.map((g, C) => {
        const y = (g.open + g.high + g.low + g.close) / 4, L = C === 0 ? (g.open + g.close) / 2 : (D + i) / 2, B = Math.max(g.high, L, y), W = Math.min(g.low, L, y), E = { time: g.time, open: L, high: B, low: W, close: y, volume: g.volume };
        return D = L, i = y, E;
      });
      ms({
        ctx: e,
        candles: j,
        startIndex: c.startIndex,
        indexToX: he,
        priceToY: Je,
        morphAt: (g, C) => j[g],
        candleBodyWidth: Ln,
        wickWidth: hs,
        colors: {
          bullish: J.bullish,
          bearish: J.bearish,
          bullishWick: J.bullishWick,
          bearishWick: J.bearishWick,
          bullishBorder: J.bullishBorder,
          bearishBorder: J.bearishBorder
        }
      });
    } else if (Ve === "tpo") {
      const i = /* @__PURE__ */ new Map();
      c.candles.forEach((g) => {
        const C = Math.floor(g.time / 18e5) * 18e5, y = i.get(C);
        y ? (y.high = Math.max(y.high, g.high), y.low = Math.min(y.low, g.low), y.count++) : i.set(C, { high: g.high, low: g.low, count: 1 });
      });
      let j = 0;
      i.forEach((g) => {
        const C = he(c.startIndex + j, c.startIndex), y = Je(g.high), L = Je(g.low);
        e.fillStyle = "#21b3a4", e.globalAlpha = 0.25, e.fillRect(C - Ln / 2, y, Ln, Math.max(2, L - y)), e.globalAlpha = 1, j++;
      }), e.globalAlpha = 0.3, ms({
        ctx: e,
        candles: c.candles,
        startIndex: c.startIndex,
        indexToX: he,
        priceToY: Je,
        morphAt: Il,
        candleBodyWidth: Ln,
        wickWidth: hs,
        colors: {
          bullish: J.bullish,
          bearish: J.bearish,
          bullishWick: J.bullishWick,
          bearishWick: J.bearishWick,
          bullishBorder: J.bullishBorder,
          bearishBorder: J.bearishBorder
        }
      }), e.globalAlpha = 1;
    } else if (Ve === "footprint_cluster" || Ve === "footprint_profile")
      ms({
        ctx: e,
        candles: c.candles,
        startIndex: c.startIndex,
        indexToX: he,
        priceToY: Je,
        morphAt: Il,
        candleBodyWidth: Ln,
        wickWidth: hs,
        colors: {
          bullish: J.bullish,
          bearish: J.bearish,
          bullishWick: J.bullishWick,
          bearishWick: J.bearishWick,
          bullishBorder: J.bullishBorder,
          bearishBorder: J.bearishBorder
        }
      }), e.font = "8px monospace", e.fillStyle = "#e8e8e8", c.candles.forEach((D, i) => {
        const j = he(c.startIndex + i, c.startIndex), g = Je(D.close), C = D.volume || 0;
        if (C > 0) {
          const y = Math.round(C * 0.55), L = Math.round(C * 0.45);
          e.fillText(`${y}/${L}`, j - 12, g - 8);
        }
      });
    else if (Ve === "flow_positioning")
      ms({
        ctx: e,
        candles: c.candles,
        startIndex: c.startIndex,
        indexToX: he,
        priceToY: Je,
        morphAt: Il,
        candleBodyWidth: Ln,
        wickWidth: hs,
        colors: {
          bullish: J.bullish,
          bearish: J.bearish,
          bullishWick: J.bullishWick,
          bearishWick: J.bearishWick,
          bullishBorder: J.bullishBorder,
          bearishBorder: J.bearishBorder
        }
      }), e.strokeStyle = "#d0d0d0", e.lineWidth = 1, c.candles.forEach((D, i) => {
        if (i % 5 !== 0) return;
        const j = he(c.startIndex + i, c.startIndex), g = D.close > D.open, C = Je(D.close);
        e.beginPath(), e.moveTo(j, C), e.lineTo(j, C + (g ? -12 : 12)), e.stroke(), e.fillStyle = g ? "#21b3a4" : "#f0426c", e.beginPath(), e.arc(j, C + (g ? -14 : 14), 2, 0, Math.PI * 2), e.fill();
      });
    else if (Ve === "renko") {
      const D = ze.range * 0.02, i = [];
      let j = c.candles[0]?.close || 0, g = 0;
      c.candles.forEach((C) => {
        const y = C.close - j, L = Math.floor(Math.abs(y) / D);
        for (let B = 0; B < L; B++) {
          const W = y > 0, E = j, S = W ? j + D : j - D;
          i.push({
            x: g * Ln * 1.2,
            isBullish: W,
            top: Je(Math.max(E, S)),
            bottom: Je(Math.min(E, S))
          }), j = S, g++;
        }
      }), i.forEach((C) => {
        const y = Math.abs(C.bottom - C.top);
        e.fillStyle = C.isBullish ? J.bullish : J.bearish, e.fillRect(C.x, C.top, Ln, y), e.strokeStyle = C.isBullish ? J.bullishBorder : J.bearishBorder, e.lineWidth = 1, e.strokeRect(C.x, C.top, Ln, y);
      });
    }
    if (w) {
      const D = we * 0.2, i = we, j = i - D, g = c.candles.map((L) => L.volume ?? 0).filter((L) => L > 0), C = g.length > 0 ? Math.max(...g) : 1, y = Math.max(2, cn * 0.7);
      c.candles.forEach((L, B) => {
        const W = L.volume ?? 0;
        if (W > 0) {
          const E = c.startIndex + B, S = he(E, c.startIndex), P = W / C * D * 0.95, _ = i - P, G = L.close >= L.open, ae = r?.volume?.upColor || "#26a69a", z = r?.volume?.downColor || "#ef5350", Y = G ? ae : z, te = parseInt(Y.slice(1, 3), 16), ue = parseInt(Y.slice(3, 5), 16), pe = parseInt(Y.slice(5, 7), 16);
          e.fillStyle = `rgba(${te}, ${ue}, ${pe}, 0.45)`, e.fillRect(S - y / 2, _, y, P), e.strokeStyle = `rgba(${te}, ${ue}, ${pe}, 0.7)`, e.lineWidth = 1, e.beginPath(), e.moveTo(S - y / 2, _), e.lineTo(S + y / 2, _), e.stroke();
        }
      }), kt === "volume" && (e.save(), c.candles.forEach((B, W) => {
        const E = B.volume ?? 0;
        if (E <= 0) return;
        const S = c.candles[W - 1]?.volume ?? 0, R = c.candles[W + 1]?.volume ?? 0;
        if (E < S || E < R) return;
        const P = c.startIndex + W, _ = he(P, c.startIndex), ae = E / C * D * 0.95, z = i - ae;
        e.beginPath(), e.arc(_, z, 2.5 + 1, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc(_, z, 2.5, 0, Math.PI * 2);
        const Y = B.close >= B.open;
        e.fillStyle = Y ? r?.volume?.upColor || "#26a69a" : r?.volume?.downColor || "#ef5350", e.fill();
      }), e.restore()), Qt.current.volume = { top: j, bottom: i };
    }
    if (e.restore(), r) {
      if (r.ema?.enabled && s?.ema && r.ema.periods?.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, U, we), e.clip();
        const i = ar ? ["#D1D4DC", "#A0A4B0", "#B2B5BE", "#9598A1", "#787B86"] : ["#363A45", "#5D606B", "#434651", "#787B86", "#9598A1"];
        r.ema.periods.forEach((j, g) => {
          const C = s.ema[g];
          if (!C) return;
          e.strokeStyle = i[g % i.length], e.lineWidth = 1.5, e.beginPath();
          let y = !1;
          c.candles.forEach((L, B) => {
            const W = c.startIndex + B, E = C[W];
            if (!isNaN(E) && isFinite(E)) {
              const S = he(W, c.startIndex), R = at(E, ze);
              y ? e.lineTo(S, R) : (e.moveTo(S, R), y = !0);
            }
          }), e.stroke();
        }), e.restore();
      }
      if (s?.movingAverages && s.movingAverages.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, U, we), e.clip();
        const i = r?.movingAverages?.lineWidth ?? 1.5;
        s.movingAverages.forEach((j) => {
          e.strokeStyle = j.color, e.lineWidth = i, e.beginPath();
          let g = !1;
          c.candles.forEach((C, y) => {
            const L = c.startIndex + y, B = j.data[L];
            if (!isNaN(B) && isFinite(B)) {
              const W = he(L, c.startIndex), E = at(B, ze);
              g ? e.lineTo(W, E) : (e.moveTo(W, E), g = !0);
            }
          }), e.stroke();
        }), e.restore();
      }
      if (r.bollinger?.enabled && s?.bollinger) {
        const i = s.bollinger;
        e.save(), e.beginPath(), e.rect(0, 0, U, we), e.clip();
        const j = r.bollinger.lineWidth || 1, g = r.bollinger.upperColor || "#9B59B6", C = r.bollinger.middleColor || "#9B59B6", y = r.bollinger.lowerColor || "#9B59B6";
        e.strokeStyle = g, e.lineWidth = j, e.setLineDash([3, 3]), e.beginPath();
        let L = !1;
        c.candles.forEach((B, W) => {
          const E = c.startIndex + W, S = i.upper[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = he(E, c.startIndex), P = at(S, ze);
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.strokeStyle = C, e.lineWidth = j, e.setLineDash([]), e.beginPath(), L = !1, c.candles.forEach((B, W) => {
          const E = c.startIndex + W, S = i.middle[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = he(E, c.startIndex), P = at(S, ze);
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.strokeStyle = y, e.lineWidth = j, e.setLineDash([3, 3]), e.beginPath(), L = !1, c.candles.forEach((B, W) => {
          const E = c.startIndex + W, S = i.lower[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = he(E, c.startIndex), P = at(S, ze);
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.setLineDash([]), e.restore();
      }
      if (s?.vwap) {
        e.save(), e.beginPath(), e.rect(0, 0, U, we), e.clip(), e.strokeStyle = r?.vwap?.color || "#2196F3", e.lineWidth = 2, e.beginPath();
        let i = !1;
        c.candles.forEach((j, g) => {
          const C = c.startIndex + g, y = s.vwap[C];
          if (!isNaN(y) && isFinite(y)) {
            const L = he(C, c.startIndex), B = at(y, ze);
            i ? e.lineTo(L, B) : (e.moveTo(L, B), i = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (s?.ichimoku) {
        e.save(), e.beginPath(), e.rect(0, 0, U, we), e.clip();
        const i = s.ichimoku, j = r?.ichimoku?.tenkanColor || "#0496ff", g = r?.ichimoku?.kijunColor || "#ff0000", C = r?.ichimoku?.cloudUpColor || "rgba(0, 255, 0, 0.2)", y = r?.ichimoku?.cloudDownColor || "rgba(255, 0, 0, 0.2)";
        for (let B = 0; B < c.candles.length; B++) {
          const W = c.startIndex + B, E = i.senkouA[W], S = i.senkouB[W];
          if (!isNaN(E) && !isNaN(S) && isFinite(E) && isFinite(S)) {
            const R = he(W, c.startIndex), P = at(E, ze), _ = at(S, ze);
            e.fillStyle = E >= S ? C : y;
            const G = cn * (1 + De);
            e.fillRect(R - G / 2, Math.min(P, _), G, Math.abs(P - _));
          }
        }
        e.strokeStyle = j, e.lineWidth = 1.5, e.beginPath();
        let L = !1;
        c.candles.forEach((B, W) => {
          const E = c.startIndex + W, S = i.tenkan[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = he(E, c.startIndex), P = at(S, ze);
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.strokeStyle = g, e.lineWidth = 1.5, e.beginPath(), L = !1, c.candles.forEach((B, W) => {
          const E = c.startIndex + W, S = i.kijun[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = he(E, c.startIndex), P = at(S, ze);
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (s?.parabolicSAR) {
        e.save(), e.beginPath(), e.rect(0, 0, U, we), e.clip();
        const i = s.parabolicSAR, j = r?.parabolicSAR?.bullishColor || "#22c55e", g = r?.parabolicSAR?.bearishColor || "#ef4444";
        c.candles.forEach((C, y) => {
          const L = c.startIndex + y, B = i.sar[L], W = i.direction[L];
          if (!isNaN(B) && isFinite(B)) {
            const E = he(L, c.startIndex), S = at(B, ze);
            e.fillStyle = W > 0 ? j : g, e.beginPath(), e.arc(E, S, 2.5, 0, Math.PI * 2), e.fill();
          }
        }), e.restore();
      }
      if (s?.keltner) {
        e.save(), e.beginPath(), e.rect(0, 0, U, we), e.clip();
        const i = s.keltner, j = r?.keltner?.upperColor || "#FF9800", g = r?.keltner?.middleColor || "#FF9800", C = r?.keltner?.lowerColor || "#FF9800";
        e.strokeStyle = j, e.lineWidth = 1, e.setLineDash([3, 3]), e.beginPath();
        let y = !1;
        c.candles.forEach((L, B) => {
          const W = c.startIndex + B, E = i.upper[W];
          if (!isNaN(E) && isFinite(E)) {
            const S = he(W, c.startIndex), R = at(E, ze);
            y ? e.lineTo(S, R) : (e.moveTo(S, R), y = !0);
          }
        }), e.stroke(), e.strokeStyle = g, e.setLineDash([]), e.beginPath(), y = !1, c.candles.forEach((L, B) => {
          const W = c.startIndex + B, E = i.middle[W];
          if (!isNaN(E) && isFinite(E)) {
            const S = he(W, c.startIndex), R = at(E, ze);
            y ? e.lineTo(S, R) : (e.moveTo(S, R), y = !0);
          }
        }), e.stroke(), e.strokeStyle = C, e.setLineDash([3, 3]), e.beginPath(), y = !1, c.candles.forEach((L, B) => {
          const W = c.startIndex + B, E = i.lower[W];
          if (!isNaN(E) && isFinite(E)) {
            const S = he(W, c.startIndex), R = at(E, ze);
            y ? e.lineTo(S, R) : (e.moveTo(S, R), y = !0);
          }
        }), e.stroke(), e.setLineDash([]), e.restore();
      }
      if (s?.pivotPoints) {
        e.save(), e.beginPath(), e.rect(0, 0, U, we), e.clip();
        const i = s.pivotPoints, j = r?.pivotPoints?.pivotColor || "#FFEB3B", g = r?.pivotPoints?.resistanceColor || "#ef4444", C = r?.pivotPoints?.supportColor || "#22c55e", y = (L, B, W, E = []) => {
          const S = L.filter((R) => !isNaN(R) && isFinite(R)).pop();
          if (S !== void 0) {
            const R = at(S, ze);
            e.strokeStyle = B, e.lineWidth = 1, e.setLineDash(E), e.beginPath(), e.moveTo(0, R), e.lineTo(U, R), e.stroke(), e.fillStyle = B, e.font = _t, e.textAlign = "left", e.fillText(W, 5, R - 3);
          }
        };
        e.setLineDash([]), y(i.pivot, j, "P"), y(i.r1, g, "R1", [2, 2]), y(i.r2, g, "R2", [4, 2]), y(i.r3, g, "R3", [6, 2]), y(i.s1, C, "S1", [2, 2]), y(i.s2, C, "S2", [4, 2]), y(i.s3, C, "S3", [6, 2]), e.setLineDash([]), e.restore();
      }
      if (s?.supertrend) {
        e.save(), e.beginPath(), e.rect(0, 0, U, we), e.clip();
        const i = s.supertrend, j = r?.supertrend?.bullishColor || "#22c55e", g = r?.supertrend?.bearishColor || "#ef4444";
        e.lineWidth = r?.supertrend?.lineWidth || 2, c.candles.forEach((C, y) => {
          const L = c.startIndex + y, B = i.supertrend[L];
          if (isNaN(B) || !isFinite(B)) return;
          const W = he(L, c.startIndex), E = at(B, ze), S = L - 1;
          S >= 0 && !isNaN(i.supertrend[S]) && (e.strokeStyle = i.direction[L] === 1 ? j : g, e.beginPath(), e.moveTo(he(S, c.startIndex), at(i.supertrend[S], ze)), e.lineTo(W, E), e.stroke());
        }), e.restore();
      }
      if (s?.donchian) {
        e.save(), e.beginPath(), e.rect(0, 0, U, we), e.clip();
        const i = s.donchian, j = (g, C, y = []) => {
          e.strokeStyle = C, e.lineWidth = r?.donchian?.lineWidth || 1, e.setLineDash(y), e.beginPath();
          let L = !1;
          c.candles.forEach((B, W) => {
            const E = c.startIndex + W, S = g[E];
            if (!isNaN(S) && isFinite(S)) {
              const R = he(E, c.startIndex), P = at(S, ze);
              L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        j(i.upper, r?.donchian?.upperColor || "#2196F3"), j(i.middle, r?.donchian?.middleColor || "#FFC107", [4, 4]), j(i.lower, r?.donchian?.lowerColor || "#2196F3"), e.restore();
      }
      if (s?.envelopes) {
        e.save(), e.beginPath(), e.rect(0, 0, U, we), e.clip();
        const i = s.envelopes, j = (g, C, y = []) => {
          e.strokeStyle = C, e.lineWidth = r?.envelopes?.lineWidth || 1, e.setLineDash(y), e.beginPath();
          let L = !1;
          c.candles.forEach((B, W) => {
            const E = c.startIndex + W, S = g[E];
            if (!isNaN(S) && isFinite(S)) {
              const R = he(E, c.startIndex);
              L ? e.lineTo(R, at(S, ze)) : (e.moveTo(R, at(S, ze)), L = !0);
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
        const g = s?.[i];
        if (!g) return;
        e.save(), e.beginPath(), e.rect(0, 0, U, we), e.clip(), e.strokeStyle = r?.[i]?.color || j, e.lineWidth = r?.[i]?.lineWidth || 2, e.beginPath();
        let C = !1;
        c.candles.forEach((y, L) => {
          const B = c.startIndex + L, W = g[B];
          if (!isNaN(W) && isFinite(W)) {
            const E = he(B, c.startIndex), S = at(W, ze);
            C ? e.lineTo(E, S) : (e.moveTo(E, S), C = !0);
          }
        }), e.stroke(), e.restore();
      }), s?.linearReg) {
        e.save(), e.beginPath(), e.rect(0, 0, U, we), e.clip();
        const i = s.linearReg, j = (g, C, y = []) => {
          e.strokeStyle = C, e.lineWidth = r?.linearReg?.lineWidth || 1, e.setLineDash(y), e.beginPath();
          let L = !1;
          c.candles.forEach((B, W) => {
            const E = c.startIndex + W, S = g[E];
            if (!isNaN(S) && isFinite(S)) {
              const R = he(E, c.startIndex);
              L ? e.lineTo(R, at(S, ze)) : (e.moveTo(R, at(S, ze)), L = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        j(i.upper, r?.linearReg?.upperColor || "#81D4FA"), j(i.middle, r?.linearReg?.middleColor || "#29B6F6", [4, 4]), j(i.lower, r?.linearReg?.lowerColor || "#81D4FA"), e.restore();
      }
      if (s?.fibRetracement) {
        e.save(), e.beginPath(), e.rect(0, 0, U, we), e.clip();
        const i = s.fibRetracement, j = r?.fibRetracement?.color || "#FFD54F", g = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
        i.levels.forEach((C, y) => {
          const L = at(C, ze);
          e.strokeStyle = j, e.lineWidth = r?.fibRetracement?.lineWidth || 1, e.setLineDash(y === 0 || y === 6 ? [] : [4, 3]), e.beginPath(), e.moveTo(0, L), e.lineTo(U, L), e.stroke(), e.fillStyle = j, e.font = _t, e.textAlign = "left", e.fillText(`${(g[y] * 100).toFixed(1)}% (${C.toFixed(2)})`, 5, L - 3);
        }), e.setLineDash([]), e.restore();
      }
      if (s?.camarillaPivots) {
        e.save(), e.beginPath(), e.rect(0, 0, U, we), e.clip();
        const i = s.camarillaPivots, j = r?.camarillaPivots?.resistanceColor || "#ef4444", g = r?.camarillaPivots?.supportColor || "#22c55e", C = (y, L, B) => {
          const W = y.filter((E) => !isNaN(E) && isFinite(E)).pop();
          if (W !== void 0) {
            const E = at(W, ze);
            e.strokeStyle = L, e.lineWidth = r?.camarillaPivots?.lineWidth || 1, e.setLineDash([3, 3]), e.beginPath(), e.moveTo(0, E), e.lineTo(U, E), e.stroke(), e.fillStyle = L, e.font = _t, e.textAlign = "left", e.fillText(B, 5, E - 3);
          }
        };
        C(i.h4, j, "H4"), C(i.h3, j, "H3"), C(i.l3, g, "L3"), C(i.l4, g, "L4"), e.setLineDash([]), e.restore();
      }
      if (s?.woodiePivots) {
        e.save(), e.beginPath(), e.rect(0, 0, U, we), e.clip();
        const i = s.woodiePivots, j = r?.woodiePivots?.pivotColor || "#FFEB3B", g = r?.woodiePivots?.resistanceColor || "#ef4444", C = r?.woodiePivots?.supportColor || "#22c55e", y = (L, B, W) => {
          const E = L.filter((S) => !isNaN(S) && isFinite(S)).pop();
          if (E !== void 0) {
            const S = at(E, ze);
            e.strokeStyle = B, e.lineWidth = r?.woodiePivots?.lineWidth || 1, e.setLineDash([3, 3]), e.beginPath(), e.moveTo(0, S), e.lineTo(U, S), e.stroke(), e.fillStyle = B, e.font = _t, e.textAlign = "left", e.fillText(W, 5, S - 3);
          }
        };
        y(i.pivot, j, "WP"), y(i.r1, g, "WR1"), y(i.r2, g, "WR2"), y(i.s1, C, "WS1"), y(i.s2, C, "WS2"), e.setLineDash([]), e.restore();
      }
      if (s?.volumeSma && w) {
        e.save();
        const i = s.volumeSma, j = we * 0.2, g = we, C = c.candles.map((B) => B.volume || 0), y = Math.max(...C, 1);
        e.strokeStyle = r?.volumeSma?.color || "#FF9800", e.lineWidth = 1.5, e.beginPath();
        let L = !1;
        c.candles.forEach((B, W) => {
          const E = c.startIndex + W, S = i[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = he(E, c.startIndex), P = g - S / y * j;
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (r?.volumeProfile?.enabled && c.candles.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, U, we), e.clip();
        const i = r.volumeProfile.numberOfRows ?? 48, j = U * ((r.volumeProfile.rowWidth ?? 15) / 100), g = (r.volumeProfile.opacity ?? 60) / 100, C = r.volumeProfile.upColor || "#D97706", y = r.volumeProfile.downColor || "#1E3A8A", L = r.volumeProfile.pocColor || "#10B981", B = r.volumeProfile.lookbackBars ?? 0, W = B > 0 ? c.candles.slice(-B) : c.candles;
        let E = 1 / 0, S = -1 / 0;
        W.forEach((z) => {
          E = Math.min(E, z.low), S = Math.max(S, z.high);
        });
        const P = (S - E || 1) / i, _ = [];
        for (let z = 0; z < i; z++)
          _.push({
            priceLevel: E + (z + 0.5) * P,
            upVolume: 0,
            downVolume: 0,
            totalVolume: 0
          });
        W.forEach((z) => {
          if (!z.volume || z.volume <= 0) return;
          const Y = z.low, te = z.high, ue = te - Y, pe = z.close >= z.open;
          for (let ee = 0; ee < i; ee++) {
            const me = E + ee * P, be = me + P;
            if (te >= me && Y <= be) {
              const $e = Math.max(Y, me), ct = Math.min(te, be), dt = ue > 0 ? (ct - $e) / ue : 1, Nt = z.volume * dt;
              pe ? _[ee].upVolume += Nt : _[ee].downVolume += Nt, _[ee].totalVolume += Nt;
            }
          }
        });
        let G = 0, ae = 0;
        if (_.forEach((z, Y) => {
          z.totalVolume > G && (G = z.totalVolume, ae = Y);
        }), G > 0) {
          const z = we / i * 0.85;
          _.forEach((Y, te) => {
            if (Y.totalVolume <= 0) return;
            const ue = Je(Y.priceLevel) - z / 2, pe = Y.totalVolume / G * j, ee = Y.totalVolume > 0 ? Y.upVolume / Y.totalVolume * pe : 0, me = pe - ee, be = te === ae, $e = U - pe;
            ee > 0 && (e.globalAlpha = be ? Math.min(g + 0.2, 1) : g, e.fillStyle = C, e.fillRect($e, ue, ee, z)), me > 0 && (e.globalAlpha = be ? 0.95 : 0.85, e.fillStyle = y, e.fillRect($e + ee, ue, me, z)), be && (e.globalAlpha = 0.9, e.strokeStyle = L, e.lineWidth = 1.5, e.strokeRect($e, ue, pe, z));
          }), e.globalAlpha = 1, kt === "volumeProfile" && _.forEach((te, ue) => {
            if (te.totalVolume <= 0) return;
            const pe = Je(te.priceLevel), ee = te.totalVolume / G * j, me = U - ee;
            e.beginPath(), e.arc(me, pe, 2.5 + 1, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc(me, pe, 2.5, 0, Math.PI * 2), e.fillStyle = te.upVolume >= te.downVolume ? C : y, e.fill();
          });
        }
        e.restore(), e.restore();
      }
    }
    const Vl = [], Tl = [];
    let Xs = "", Do = "", fs = 14, Bo = 0, Wo = 0;
    const gc = Is?.current && Is.current.length > 0;
    if (Pl && !gc && qn) {
      const D = qn.find((i) => i.id === Pl);
      if (D && D.points && D.points.length > 0) {
        e.save();
        const i = Ae.badgeFont, j = "#2962ff", g = "rgba(41, 98, 255, 0.2)", C = Ae.badgePadding, y = Ae.badgeRowHeight, L = We - 6, B = U + 3, W = ie.height - gt, E = W + (gt - y) / 2;
        if (Xs = i, Do = j, fs = y, Bo = E, Wo = B, D.points.forEach((S) => {
          let R = null, P = null;
          if (S.price !== void 0 && (P = Je(S.price), P >= 0 && P <= we)) {
            const _ = Nn(S.price), G = e.measureText(_).width, ae = Math.min(G + C * 2, L), z = P - y / 2;
            Tl.push({
              pos: P,
              text: _,
              bWidth: ae,
              topOrigin: z
            });
          }
          if (S.time !== void 0) {
            let _ = -1;
            if (l.length > 0) {
              const G = l[0].time, ae = l[l.length - 1].time, z = l.length > 1 ? l[1].time - l[0].time : 6e4;
              if (S.time > ae) _ = l.length - 1 + (S.time - ae) / z;
              else if (S.time < G) _ = (S.time - G) / z;
              else {
                let Y = 0, te = l.length - 1;
                for (; Y <= te; ) {
                  const ue = Math.floor((Y + te) / 2);
                  if (l[ue].time === S.time) {
                    _ = ue;
                    break;
                  }
                  l[ue].time < S.time ? Y = ue + 1 : te = ue - 1;
                }
                if (_ === -1) {
                  const ue = Y, pe = ue - 1;
                  if (pe >= 0 && ue < l.length) {
                    const ee = l[pe], me = l[ue], be = (S.time - ee.time) / (me.time - ee.time);
                    _ = pe + be;
                  } else
                    _ = Y;
                }
              }
            }
            if (_ !== -1) {
              const G = Te.current.startIndex, z = Te.current.candleWidth * (1 + De), Y = Math.floor(G), te = (G - Y) * z;
              R = (_ - Y) * z + z / 2 - te;
            }
            if (R !== null && R >= 0 && R <= U) {
              const G = `${fr(S.time)} ${zn(S.time, !0)}  ${Cl(S.time)}`, z = e.measureText(G).width + C * 2;
              let Y = R - z / 2;
              Y < 0 && (Y = 0), Y + z > U && (Y = U - z), Vl.push({
                pos: R,
                text: G,
                bWidth: z,
                topOrigin: Y
              });
            }
          }
        }), (D.type === "long" || D.type === "short") && D.stopLoss) {
          const S = D.stopLoss.price, R = Je(S);
          if (R >= 0 && R <= we) {
            e.font = Xs || i;
            const P = Nn(S), _ = e.measureText(P).width, G = Math.min(_ + C * 2, L), ae = R - y / 2;
            Tl.push({
              pos: R,
              text: P,
              bWidth: G,
              topOrigin: ae
            });
          }
        }
        if (Vl.length >= 2) {
          const S = Math.min(...Vl.map((P) => P.pos)), R = Math.max(...Vl.map((P) => P.pos));
          R > S && (e.fillStyle = g, e.fillRect(S, W, R - S, gt));
        }
        if (Tl.length >= 2) {
          const S = Math.min(...Tl.map((P) => P.pos)), R = Math.max(...Tl.map((P) => P.pos));
          R > S && (e.fillStyle = g, e.fillRect(B - 3, S, We, R - S));
        }
        e.restore();
      }
    }
    e.fillStyle = J.axisLabel || "#787b86", e.font = Ls, e.textBaseline = "middle", e.textAlign = Ae.priceLabelAlign;
    const vc = Ae.priceLabelAlign === "right" ? m - (An !== void 0 ? An : _o) - 4 : U + 2;
    let Er = -1 / 0;
    for (let D = Ir; D <= ze.max; D += Vs) {
      const i = Je(D);
      if (i >= 10 && i <= we - 10) {
        if (Math.abs(i - Er) < Tr) continue;
        Er = i, e.fillText(Nn(D), vc, i);
      }
    }
    const zt = n != null && !Number.isNaN(n) ? n : c.candles.length ? c.candles[c.candles.length - 1].close : null;
    if (zt != null && !Number.isNaN(zt) && !Ct) {
      const D = Je(zt);
      if (D >= 0 && D <= we) {
        e.save();
        const i = c.candles.length >= 2 ? c.candles[c.candles.length - 2] : null, j = c.candles.length >= 1 ? c.candles[c.candles.length - 1] : null, g = i ? i.close : j ? j.open : zt, C = zt >= g, y = J.priceTickerBullish || J.bullish, L = J.priceTickerBearish || J.bearish, B = C ? y : L, W = (On) => {
          const en = On.replace("#", ""), Wt = parseInt(en.substring(0, 2), 16), un = parseInt(en.substring(2, 4), 16), Kt = parseInt(en.substring(4, 6), 16);
          return `${Wt}, ${un}, ${Kt}`;
        }, E = W(J.textDim || "#666666"), S = `rgba(${E}, 0.35)`, R = `rgba(${E}, 0.9)`, P = W(B).split(",").map(Number), _ = (0.299 * P[0] + 0.587 * P[1] + 0.114 * P[2]) / 255, G = Number.isNaN(_) || _ <= 0.55 ? "#ffffff" : "#000000", ae = c.candles.length - 1, z = c.candles.length > 0 ? he(c.startIndex + ae, c.startIndex) : 0;
        z > 0 && (e.strokeStyle = S, e.lineWidth = 1, e.setLineDash([4, 4]), e.beginPath(), e.moveTo(0, D), e.lineTo(z, D), e.stroke(), e.setLineDash([])), e.strokeStyle = R, e.lineWidth = 1, e.setLineDash([4, 3]), e.beginPath(), e.moveTo(z, D), e.lineTo(U, D), e.stroke(), e.setLineDash([]);
        const Y = Nn(zt), te = Ls, ue = Ae.liveCountdownFont;
        e.font = te;
        const ee = e.measureText(Y).width, me = Ae.livePriceLabelPadding, be = Ae.livePriceRowHeight, $e = I && I.length > 0, ct = $e ? Ae.countdownRowHeight : 0, dt = be + ct;
        let Nt = 0;
        $e && (e.font = ue, Nt = e.measureText(I).width);
        const yn = We - 6, En = Math.max(ee, Nt) + me * 2, Mt = Math.min(En, yn), Lt = U + 3, vt = D - be / 2;
        e.fillStyle = J.background, e.fillRect(Lt - 1, vt - 1, Mt + 2, dt + 2), e.fillStyle = B, e.beginPath(), e.roundRect(Lt, vt, Mt, dt, 3), e.fill(), e.fillStyle = G, e.font = te, e.textAlign = "center", e.textBaseline = "middle", e.fillText(Y, Lt + Mt / 2, vt + be / 2), $e && (e.strokeStyle = G === "#ffffff" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)", e.lineWidth = 0.5, e.beginPath(), e.moveTo(Lt + 3, vt + be), e.lineTo(Lt + Mt - 3, vt + be), e.stroke(), e.fillStyle = G === "#ffffff" ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)", e.font = ue, e.textAlign = "center", e.textBaseline = "middle", e.fillText(I, Lt + Mt / 2, vt + be + ct / 2)), e.restore();
      }
    }
    if (qn && qn.length > 0) {
      e.save();
      const D = Ls;
      e.font = D;
      const i = Ae.badgePadding, j = Ae.badgeRowHeight, g = [], C = [];
      qn.forEach((R) => {
        if ((R.type === "horizontalRay" || R.type === "horizontal") && R.points.length > 0) {
          const P = R.points[0].price;
          g.push({ price: P, color: R.color || "#2196f3", yPos: Je(P) });
        } else if ((R.type === "long" || R.type === "short") && R.points.length >= 2) {
          if (R.id === Pl) return;
          const P = R.points[0].price, _ = R.points[1].price;
          if (g.push({ price: P, color: "#4b5563", yPos: Je(P) }), g.push({ price: _, color: "#22c55e", yPos: Je(_) }), R.stopLoss) {
            const G = R.stopLoss.price;
            g.push({ price: G, color: "#ef4444", yPos: Je(G) });
          }
        }
      });
      let y = -9999, L = -9999;
      if (zt != null && !Number.isNaN(zt)) {
        const R = Je(zt), P = Ae.livePriceRowHeight + (I && I.length > 0 ? Ae.countdownRowHeight : 0);
        y = R - Ae.livePriceRowHeight / 2, L = y + P;
      }
      const B = 2, W = We - 6, E = U + 3;
      g.sort((R, P) => R.yPos - P.yPos);
      let S = -9999;
      g.forEach((R) => {
        let P = R.yPos - j / 2, _ = P + j;
        if (P < S + B && (P = S + B, _ = P + j), P < L + B && _ > y - B && (P = L + B, _ = P + j), S = _, P >= 0 && _ <= we) {
          const G = Nn(R.price), ae = e.measureText(G).width, z = Math.min(ae + i * 2, W);
          e.fillStyle = R.color, e.beginPath(), e.roundRect(E, P, z, j, 3), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.fillText(G, E + z / 2, P + j / 2);
        }
      }), e.font = Ae.alertFlagFont, C.forEach((R) => {
        if (R.xPos >= 0 && R.xPos <= U) {
          const P = zn(R.time, !0) + " " + Cl(R.time), G = e.measureText(P).width + i * 2, z = ie.height - gt + (gt - j) / 2;
          let Y = R.xPos - G / 2;
          Y < 0 && (Y = 0), Y + G > U && (Y = U - G), e.fillStyle = R.color, e.beginPath(), e.roundRect(Y, z, G, j, 3), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.fillText(P, Y + G / 2, z + j / 2);
        }
      }), e.restore();
    }
    if (Ct && zt !== null && zt !== void 0 && !Number.isNaN(zt)) {
      const D = Rt != null && tn != null && Number.isFinite(Rt) && Number.isFinite(tn), i = D ? Rt : zt, j = D ? tn : zt + od(f || ""), g = Je(i), C = Je(j);
      if (e.save(), g >= 0 && g <= we) {
        e.strokeStyle = "#1976d2", e.lineWidth = 1, e.setLineDash([3, 4]), e.beginPath(), e.moveTo(0, g), e.lineTo(U, g), e.stroke(), e.setLineDash([]);
        const y = Nn(i);
        e.font = Ae.alertCountFont;
        const B = e.measureText(y).width + 12, W = 16, E = U + 2;
        e.fillStyle = "#1976d2", e.beginPath(), e.roundRect(E, g - W / 2, Math.min(B, We - 4), W, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "left", e.textBaseline = "middle", e.fillText(y, E + 6, g);
      }
      if (C >= 0 && C <= we) {
        e.strokeStyle = "#d32f2f", e.lineWidth = 1, e.setLineDash([3, 4]), e.beginPath(), e.moveTo(0, C), e.lineTo(U, C), e.stroke(), e.setLineDash([]);
        const y = Nn(j);
        e.font = Ae.alertCountFont;
        const B = e.measureText(y).width + 12, W = 16, E = U + 2;
        e.fillStyle = "#d32f2f", e.beginPath(), e.roundRect(E, C - W / 2, Math.min(B, We - 4), W, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "left", e.textBaseline = "middle", e.fillText(y, E + 6, C);
      }
      g >= 0 && C >= 0 && g <= we && C <= we && (e.fillStyle = "rgba(148, 163, 184, 0.04)", e.fillRect(0, Math.min(C, g), U, Math.abs(g - C))), e.restore();
    }
    if (Ue && Ue.length > 0) {
      const D = {
        ctx: e,
        chartWidth: U,
        mainChartHeight: we,
        mainPriceToY: Je,
        formatPrice: Nn,
        colors: {
          slColor: J.slColor,
          slOpacity: J.slOpacity,
          tpColor: J.tpColor,
          tpOpacity: J.tpOpacity
        },
        selectedPositionId: Be.current,
        slDraft: st.current,
        tpDraft: it.current,
        hoveredSLTP: fn.current,
        draggingHandle: Qe.current,
        defaultOffset: Zn(0) || void 0
      };
      Iu(D, Ue), Tu(D, Ue);
    }
    if (kt && !kt.startsWith("sp-") && s) {
      const D = ze;
      if (D && we > 0) {
        const g = (y, L) => {
          e.save(), e.beginPath(), e.rect(0, 0, U, we), e.clip();
          for (let B = 0; B < c.candles.length; B += 8) {
            const W = c.startIndex + B;
            if (W >= y.length) continue;
            const E = y[W];
            if (isNaN(E) || !isFinite(E)) continue;
            const S = he(W, c.startIndex), R = we - (E - D.min) / D.range * we;
            e.beginPath(), e.arc(S, R, 3.5, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc(S, R, 2.5, 0, Math.PI * 2), e.fillStyle = L, e.fill();
          }
          e.restore();
        }, C = kt;
        if (C === "movingAverages" && s.movingAverages)
          for (const y of s.movingAverages) g(y.data, y.color);
        else if (C?.startsWith("movingAverages__") && s.movingAverages) {
          const y = parseInt(C.slice(16), 10), L = s.movingAverages[y];
          L && g(L.data, L.color);
        } else if (C === "bollinger" && s.bollinger) {
          const y = s.bollinger;
          g(y.upper, r?.bollinger?.upperColor || "#9B59B6"), g(y.middle, r?.bollinger?.middleColor || "#9B59B6"), g(y.lower, r?.bollinger?.lowerColor || "#9B59B6");
        } else if (C === "vwap" && s.vwap)
          g(s.vwap, "#ff9800");
        else if (C === "ichimoku" && s.ichimoku) {
          const y = s.ichimoku;
          g(y.tenkan, "#0094FF"), g(y.kijun, "#AD1457"), g(y.senkouA, "#4CAF50"), g(y.senkouB, "#FF5722");
        } else if (C === "keltner" && s.keltner)
          g(s.keltner.upper, "#3b82f6"), g(s.keltner.middle, "#3b82f6"), g(s.keltner.lower, "#3b82f6");
        else if (C === "donchian" && s.donchian)
          g(s.donchian.upper, "#3b82f6"), g(s.donchian.middle, "#3b82f6"), g(s.donchian.lower, "#3b82f6");
        else if (C === "envelopes" && s.envelopes)
          g(s.envelopes.upper, "#3b82f6"), g(s.envelopes.basis, "#3b82f6"), g(s.envelopes.lower, "#3b82f6");
        else if (C === "supertrend" && s.supertrend) {
          const y = s.supertrend.map((L) => L?.value ?? NaN);
          g(y, "#3b82f6");
        } else if (["dema", "tema", "hma"].includes(C)) {
          const y = s[C];
          Array.isArray(y) && g(y, "#3b82f6");
        } else if (C.startsWith("ci-") && r?.customIndicators) {
          const y = r.customIndicators.find((B) => `ci-${B.id}` === C), L = y?.data;
          y && L && Array.isArray(L) && g(L, y.color);
        } else if (C.startsWith("script-") && r?.customIndicators) {
          const y = C.slice(7);
          for (const L of r.customIndicators) {
            if (L.scriptId !== y) continue;
            const B = L.data;
            B && Array.isArray(B) && g(B, L.color);
          }
        }
      }
    }
    let Bt = we;
    if (s?.rsi) {
      const D = Kn, i = Bt, j = i + D, g = r?.rsi?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, U, D), e.globalAlpha = 1), e.strokeStyle = J.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const C = (Y) => i + D - Y / 100 * D, y = r?.rsi?.overbought ?? 70, L = r?.rsi?.oversold ?? 30;
      if (g.showZones) {
        const Y = C(y), te = C(L), ue = g.zoneOpacity ?? 0.1;
        e.fillStyle = g.overboughtZoneColor || "#ff4444", e.globalAlpha = ue, e.fillRect(0, i, U, Y - i), e.fillStyle = g.oversoldZoneColor || "#44ff44", e.fillRect(0, te, U, j - te), e.globalAlpha = 1;
      }
      if (g.showGrid !== !1) {
        const Y = g.gridColor || "rgba(150, 150, 150, 0.3)";
        e.setLineDash([4, 4]), [L, 50, y].forEach((te) => {
          e.beginPath(), te === 50 ? (e.strokeStyle = Y, e.lineWidth = 1) : (e.strokeStyle = "rgba(180, 130, 80, 0.8)", e.lineWidth = 1.5);
          const ue = C(te);
          e.moveTo(0, ue), e.lineTo(U, ue), e.stroke();
        }), e.setLineDash([]), e.lineWidth = 1;
      }
      const B = r?.rsi?.color || "#E74C3C", W = g.lineWidth ?? 1.5;
      e.strokeStyle = B, e.lineWidth = W, e.beginPath();
      let E = !1;
      c.candles.forEach((Y, te) => {
        const ue = c.startIndex + te, pe = s.rsi[ue];
        if (!isNaN(pe) && isFinite(pe)) {
          const ee = he(ue, c.startIndex), me = C(pe);
          E ? e.lineTo(ee, me) : (e.moveTo(ee, me), E = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = _t, e.textAlign = "left", [0, L, 50, y, 100].forEach((Y) => {
        const te = C(Y);
        e.fillText(Y.toString(), U + 5, te);
      }), Qt.current.rsi = { top: i, bottom: j };
      const S = xt.current !== null ? xt.current : c.startIndex + c.candles.length - 1, R = s.rsi[S], P = !isNaN(R) && isFinite(R) ? R.toFixed(2) : "--", _ = `RSI ${r?.rsi?.period || 14} close`, G = r?.rsi?.style?.customLabel || _, ae = r?.rsi?.style?.labelColor || "#d1d5db";
      e.fillStyle = ae, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left", e.fillText(G, 5, i + 15), e.fillStyle = B, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
      const z = e.measureText(G).width;
      e.fillText(P, 13 + z, i + 15), Fn.current.rsi = 13 + z + e.measureText(P).width + 8, Bt = j;
    }
    if (s?.macd) {
      const D = Kn, i = Bt, j = i + D, g = r?.macd?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, U, D), e.globalAlpha = 1), e.strokeStyle = J.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const C = s.macd.macd.slice(c.startIndex, c.endIndex), y = s.macd.signal.slice(c.startIndex, c.endIndex), L = s.macd.histogram.slice(c.startIndex, c.endIndex), B = [...C, ...y, ...L].filter((vt) => !isNaN(vt) && isFinite(vt)), W = Math.min(...B, 0), S = Math.max(...B, 0) - W || 1, R = (vt) => i + D - (vt - W) / S * D;
      if (g.showGrid !== !1) {
        e.strokeStyle = g.gridColor || J.grid, e.setLineDash([2, 2]), e.beginPath();
        const vt = R(0);
        e.moveTo(0, vt), e.lineTo(U, vt), e.stroke(), e.setLineDash([]);
      }
      const P = Math.max(2, cn * 0.5), _ = r?.macd?.histogramUpColor || "#26a69a", G = r?.macd?.histogramDownColor || "#ef5350", ae = R(0);
      c.candles.forEach((vt, On) => {
        const en = c.startIndex + On, Wt = s.macd.histogram[en];
        if (!isNaN(Wt) && isFinite(Wt)) {
          const un = he(en, c.startIndex), Kt = R(Wt), jl = Math.abs(ae - Kt);
          e.fillStyle = Wt >= 0 ? _ : G, Wt >= 0 ? e.fillRect(un - P / 2, Kt, P, jl) : e.fillRect(un - P / 2, ae, P, jl);
        }
      });
      const z = r?.macd?.macdColor || "#3498DB";
      e.strokeStyle = z, e.lineWidth = 1.5, e.beginPath();
      let Y = !1;
      c.candles.forEach((vt, On) => {
        const en = c.startIndex + On, Wt = s.macd.macd[en];
        if (!isNaN(Wt) && isFinite(Wt)) {
          const un = he(en, c.startIndex), Kt = R(Wt);
          Y ? e.lineTo(un, Kt) : (e.moveTo(un, Kt), Y = !0);
        }
      }), e.stroke();
      const te = r?.macd?.signalColor || "#E67E22";
      e.strokeStyle = te, e.lineWidth = 1.5, e.beginPath(), Y = !1, c.candles.forEach((vt, On) => {
        const en = c.startIndex + On, Wt = s.macd.signal[en];
        if (!isNaN(Wt) && isFinite(Wt)) {
          const un = he(en, c.startIndex), Kt = R(Wt);
          Y ? e.lineTo(un, Kt) : (e.moveTo(un, Kt), Y = !0);
        }
      }), e.stroke(), Qt.current.macd = { top: i, bottom: j };
      const ue = `MACD(${r?.macd?.fast || 12},${r?.macd?.slow || 26},${r?.macd?.signal || 9})`, pe = r?.macd?.style?.customLabel || ue, ee = r?.macd?.style?.labelColor || J.textDim;
      e.fillStyle = ee, e.font = `bold ${_t}`, e.textAlign = "left";
      const me = xt.current !== null ? xt.current : c.startIndex + c.candles.length - 1, be = s.macd.macd[me], $e = s.macd.signal[me], ct = s.macd.histogram[me];
      e.fillText(pe, 5, i + 12), e.fillStyle = z, e.font = _t;
      const dt = e.measureText(pe).width, Nt = !isNaN(be) && isFinite(be) ? be.toFixed(4) : "--";
      e.fillText(Nt, 10 + dt, i + 12), e.fillStyle = te;
      const yn = !isNaN($e) && isFinite($e) ? $e.toFixed(4) : "--", En = e.measureText(Nt).width;
      e.fillText(yn, 16 + dt + En, i + 12);
      const Mt = !isNaN(ct) && isFinite(ct) ? ct.toFixed(4) : "--";
      e.fillStyle = ct >= 0 ? "#00ff88" : "#ff0080";
      const Lt = e.measureText(yn).width;
      e.fillText(Mt, 22 + dt + En + Lt, i + 12), Fn.current.macd = 22 + dt + En + Lt + e.measureText(Mt).width + 8, Bt = j;
    }
    if (s?.atr) {
      const D = Kn, i = Bt, j = i + D, g = r?.atr?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, U, D), e.globalAlpha = 1), e.strokeStyle = J.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const C = s.atr.slice(c.startIndex, c.endIndex).filter((ue) => !isNaN(ue) && isFinite(ue)), y = Math.min(...C, 0), B = Math.max(...C) - y || 1, W = (ue) => i + D - (ue - y) / B * D, E = r?.atr?.color || "#17a2b8", S = g.lineWidth ?? 1.5;
      e.strokeStyle = E, e.lineWidth = S, e.beginPath();
      let R = !1;
      c.candles.forEach((ue, pe) => {
        const ee = c.startIndex + pe, me = s.atr[ee];
        if (!isNaN(me) && isFinite(me)) {
          const be = he(ee, c.startIndex), $e = W(me);
          R ? e.lineTo(be, $e) : (e.moveTo(be, $e), R = !0);
        }
      }), e.stroke(), Qt.current.atr = { top: i, bottom: j };
      const P = `ATR(${r?.atr?.period || 14})`, _ = r?.atr?.style?.customLabel || P, G = r?.atr?.style?.labelColor || J.textDim;
      e.fillStyle = G, e.font = `bold ${_t}`, e.textAlign = "left";
      const ae = xt.current !== null ? xt.current : c.startIndex + c.candles.length - 1, z = s.atr[ae], Y = !isNaN(z) && isFinite(z) ? z.toFixed(5) : "--";
      e.fillText(_, 5, i + 12), e.fillStyle = E, e.font = _t;
      const te = e.measureText(_).width;
      e.fillText(Y, 10 + te, i + 12), Fn.current.atr = 10 + te + e.measureText(Y).width + 8, Bt = j;
    }
    if (s?.stochastic) {
      const D = Kn, i = Bt, j = i + D, g = r?.stochastic?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, U, D), e.globalAlpha = 1), e.strokeStyle = J.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const C = (pe) => i + D - pe / 100 * D;
      e.strokeStyle = J.grid, e.setLineDash([2, 2]), e.beginPath();
      const y = r?.stochastic?.overbought ?? 80, L = r?.stochastic?.oversold ?? 20;
      [L, 50, y].forEach((pe) => {
        const ee = C(pe);
        e.moveTo(0, ee), e.lineTo(U, ee);
      }), e.stroke(), e.setLineDash([]);
      const B = r?.stochastic?.kColor || "#3498DB";
      e.strokeStyle = B, e.lineWidth = 1.5, e.beginPath();
      let W = !1;
      c.candles.forEach((pe, ee) => {
        const me = c.startIndex + ee, be = s.stochastic.k[me];
        if (!isNaN(be) && isFinite(be)) {
          const $e = he(me, c.startIndex), ct = C(be);
          W ? e.lineTo($e, ct) : (e.moveTo($e, ct), W = !0);
        }
      }), e.stroke();
      const E = r?.stochastic?.dColor || "#E67E22";
      e.strokeStyle = E, e.lineWidth = 1.5, e.beginPath(), W = !1, c.candles.forEach((pe, ee) => {
        const me = c.startIndex + ee, be = s.stochastic.d[me];
        if (!isNaN(be) && isFinite(be)) {
          const $e = he(me, c.startIndex), ct = C(be);
          W ? e.lineTo($e, ct) : (e.moveTo($e, ct), W = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = _t, e.textAlign = "left", [0, L, 50, y, 100].forEach((pe) => {
        const ee = C(pe);
        e.fillText(pe.toString(), U + 5, ee);
      }), Qt.current.stochastic = { top: i, bottom: j };
      const S = `STOCH(${r?.stochastic?.kPeriod || 14},${r?.stochastic?.dPeriod || 3})`, R = r?.stochastic?.style?.customLabel || S, P = r?.stochastic?.style?.labelColor || J.textDim;
      e.fillStyle = P, e.font = `bold ${_t}`, e.textAlign = "left";
      const _ = xt.current !== null ? xt.current : c.startIndex + c.candles.length - 1, G = s.stochastic.k[_], ae = s.stochastic.d[_];
      e.fillText(R, 5, i + 12), e.fillStyle = B, e.font = _t;
      const z = e.measureText(R).width, Y = !isNaN(G) && isFinite(G) ? `%K ${G.toFixed(2)}` : "%K --";
      e.fillText(Y, 10 + z, i + 12), e.fillStyle = E;
      const te = e.measureText(Y).width, ue = !isNaN(ae) && isFinite(ae) ? `%D ${ae.toFixed(2)}` : "%D --";
      e.fillText(ue, 16 + z + te, i + 12), Fn.current.stochastic = 16 + z + te + e.measureText(ue).width + 8, Bt = j;
    }
    if (s?.williamsR) {
      const D = Kn, i = Bt, j = i + D, g = r?.williamsR?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, U, D), e.globalAlpha = 1), e.strokeStyle = J.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const C = (z) => i + D - (z + 100) / 100 * D, y = r?.williamsR?.overbought ?? -20, L = r?.williamsR?.oversold ?? -80;
      e.setLineDash([4, 4]), e.strokeStyle = g.gridColor || "rgba(180, 130, 80, 0.6)", [L, -50, y].forEach((z) => {
        e.beginPath();
        const Y = C(z);
        e.moveTo(0, Y), e.lineTo(U, Y), e.stroke();
      }), e.setLineDash([]);
      const B = r?.williamsR?.color || "#E91E63";
      e.strokeStyle = B, e.lineWidth = g.lineWidth ?? 1.5, e.beginPath();
      let W = !1;
      c.candles.forEach((z, Y) => {
        const te = c.startIndex + Y, ue = s.williamsR[te];
        if (!isNaN(ue) && isFinite(ue)) {
          const pe = he(te, c.startIndex), ee = C(ue);
          W ? e.lineTo(pe, ee) : (e.moveTo(pe, ee), W = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = _t, e.textAlign = "left", [-100, L, -50, y, 0].forEach((z) => {
        const Y = C(z);
        e.fillText(z.toString(), U + 5, Y);
      }), Qt.current.williamsR = { top: i, bottom: j };
      const E = `Williams %R ${r?.williamsR?.period || 14}`, S = r?.williamsR?.style?.customLabel || E, R = r?.williamsR?.style?.labelColor || "#d1d5db";
      e.fillStyle = R, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left";
      const P = xt.current !== null ? xt.current : c.startIndex + c.candles.length - 1, _ = s.williamsR[P], G = !isNaN(_) && isFinite(_) ? _.toFixed(2) : "--";
      e.fillText(S, 5, i + 15), e.fillStyle = B;
      const ae = e.measureText(S).width;
      e.fillText(G, 13 + ae, i + 15), Fn.current.williamsR = 13 + ae + e.measureText(G).width + 8, Bt = j;
    }
    if (s?.cci) {
      const D = Kn, i = Bt, j = i + D, g = r?.cci?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, U, D), e.globalAlpha = 1), e.strokeStyle = J.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const C = c.candles.map((te, ue) => s.cci[c.startIndex + ue]).filter((te) => !isNaN(te) && isFinite(te)), y = C.length > 0 ? Math.max(200, Math.max(...C.map(Math.abs))) : 200, L = (te) => i + D / 2 - te / y * (D / 2), B = r?.cci?.overbought ?? 100, W = r?.cci?.oversold ?? -100;
      e.setLineDash([4, 4]), e.strokeStyle = g.gridColor || "rgba(180, 130, 80, 0.6)", [W, 0, B].forEach((te) => {
        e.beginPath();
        const ue = L(te);
        e.moveTo(0, ue), e.lineTo(U, ue), e.stroke();
      }), e.setLineDash([]);
      const E = r?.cci?.color || "#00BCD4";
      e.strokeStyle = E, e.lineWidth = g.lineWidth ?? 1.5, e.beginPath();
      let S = !1;
      c.candles.forEach((te, ue) => {
        const pe = c.startIndex + ue, ee = s.cci[pe];
        if (!isNaN(ee) && isFinite(ee)) {
          const me = he(pe, c.startIndex), be = L(ee);
          S ? e.lineTo(me, be) : (e.moveTo(me, be), S = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = _t, e.textAlign = "left", [Math.round(-y), W, 0, B, Math.round(y)].forEach((te) => {
        const ue = L(te);
        e.fillText(te.toString(), U + 5, ue);
      }), Qt.current.cci = { top: i, bottom: j };
      const R = `CCI ${r?.cci?.period || 20}`, P = r?.cci?.style?.customLabel || R, _ = r?.cci?.style?.labelColor || "#d1d5db";
      e.fillStyle = _, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left";
      const G = xt.current !== null ? xt.current : c.startIndex + c.candles.length - 1, ae = s.cci[G], z = !isNaN(ae) && isFinite(ae) ? ae.toFixed(2) : "--";
      e.fillText(P, 5, i + 15), e.fillStyle = E;
      const Y = e.measureText(P).width;
      e.fillText(z, 13 + Y, i + 15), Fn.current.cci = 13 + Y + e.measureText(z).width + 8, Bt = j;
    }
    if (s?.adx) {
      const D = Kn, i = Bt, j = i + D;
      e.strokeStyle = J.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const g = (S) => i + D - S / 100 * D;
      e.setLineDash([4, 4]), e.strokeStyle = "rgba(150, 150, 150, 0.3)", [25, 50, 75].forEach((S) => {
        e.beginPath(), e.moveTo(0, g(S)), e.lineTo(U, g(S)), e.stroke();
      }), e.setLineDash([]);
      const C = r?.adx?.adxColor || "#FFEB3B", y = r?.adx?.plusDIColor || "#22c55e", L = r?.adx?.minusDIColor || "#ef4444";
      e.strokeStyle = y, e.lineWidth = 1, e.beginPath();
      let B = !1;
      c.candles.forEach((S, R) => {
        const P = c.startIndex + R, _ = s.adx.plusDI[P];
        if (!isNaN(_) && isFinite(_)) {
          const G = he(P, c.startIndex), ae = g(_);
          B ? e.lineTo(G, ae) : (e.moveTo(G, ae), B = !0);
        }
      }), e.stroke(), e.strokeStyle = L, e.beginPath(), B = !1, c.candles.forEach((S, R) => {
        const P = c.startIndex + R, _ = s.adx.minusDI[P];
        if (!isNaN(_) && isFinite(_)) {
          const G = he(P, c.startIndex), ae = g(_);
          B ? e.lineTo(G, ae) : (e.moveTo(G, ae), B = !0);
        }
      }), e.stroke(), e.strokeStyle = C, e.lineWidth = 2, e.beginPath(), B = !1, c.candles.forEach((S, R) => {
        const P = c.startIndex + R, _ = s.adx.adx[P];
        if (!isNaN(_) && isFinite(_)) {
          const G = he(P, c.startIndex), ae = g(_);
          B ? e.lineTo(G, ae) : (e.moveTo(G, ae), B = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = _t, [0, 25, 50, 75, 100].forEach((S) => {
        e.fillText(S.toString(), U + 5, g(S));
      });
      const W = xt.current !== null ? xt.current : c.startIndex + c.candles.length - 1, E = s.adx.adx[W];
      e.fillStyle = "#d1d5db", e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.fillText(`ADX ${r?.adx?.period || 14}`, 5, i + 15), e.fillStyle = C, e.fillText(!isNaN(E) && isFinite(E) ? E.toFixed(2) : "--", 73, i + 15), e.fillStyle = y, e.fillText("+DI", 118, i + 15), e.fillStyle = L, e.fillText("-DI", 148, i + 15), Fn.current.adx = 148 + e.measureText("-DI").width + 8, Qt.current.adx = { top: i, bottom: j }, Bt = j;
    }
    if (s?.roc) {
      const D = Kn, i = Bt, j = i + D;
      e.strokeStyle = J.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(U, i), e.stroke();
      const g = c.candles.map((P, _) => s.roc[c.startIndex + _]).filter((P) => !isNaN(P) && isFinite(P)), C = g.length > 0 ? Math.max(5, Math.max(...g.map(Math.abs))) : 5, y = (P) => i + D / 2 - P / C * (D / 2);
      e.setLineDash([4, 4]), e.strokeStyle = "rgba(150, 150, 150, 0.5)", e.beginPath(), e.moveTo(0, y(0)), e.lineTo(U, y(0)), e.stroke(), e.setLineDash([]);
      const L = r?.roc?.color || "#9C27B0";
      e.strokeStyle = L, e.lineWidth = 1.5, e.beginPath();
      let B = !1;
      c.candles.forEach((P, _) => {
        const G = c.startIndex + _, ae = s.roc[G];
        if (!isNaN(ae) && isFinite(ae)) {
          const z = he(G, c.startIndex), Y = y(ae);
          B ? e.lineTo(z, Y) : (e.moveTo(z, Y), B = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = _t, [-C, 0, C].forEach((P) => {
        e.fillText(P.toFixed(1) + "%", U + 5, y(P));
      }), e.fillStyle = "#d1d5db", e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
      const W = xt.current !== null ? xt.current : c.startIndex + c.candles.length - 1, E = s.roc[W], S = !isNaN(E) && isFinite(E) ? E.toFixed(2) + "%" : "--";
      e.fillText(`ROC ${r?.roc?.period || 12}`, 5, i + 15), e.fillStyle = L;
      const R = e.measureText(`ROC ${r?.roc?.period || 12}`).width;
      e.fillText(S, 13 + R, i + 15), Fn.current.roc = 13 + R + e.measureText(S).width + 8, Qt.current.roc = { top: i, bottom: j }, Bt = j;
    }
    const Fo = {
      ctx: e,
      chartWidth: U,
      subplotHeight: Kn,
      visible: c,
      indexToX: he,
      currentCandleWidth: cn,
      subplotLabelFont: _t,
      hoveredCandleIndex: xt.current,
      colors: { textDim: J.textDim, grid: J.grid },
      indicators: r,
      indicatorData: s,
      indicatorBounds: Qt.current,
      subplotLabelEndX: Fn.current,
      mainPriceToY: Je,
      mainChartHeight: we,
      skipIndicators: F,
      clickedIndicatorKey: kt
    };
    if (ju(Fo), Bt = Mu(Fo, Bt), Ru(Fo), St && St.length > 0 && c.candles.length > 0) {
      const D = (P) => P ? P.toUpperCase().trim().slice(0, 2) : "??", i = (P) => {
        if (P.datetime) {
          const _ = new Date(P.datetime).getTime();
          if (!isNaN(_)) return _;
        }
        if (!P.date) return null;
        try {
          const [_, G, ae] = P.date.split("-").map(Number);
          if (!P.time) return Date.UTC(_, G - 1, ae, 12, 0);
          const z = P.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
          if (!z) return Date.UTC(_, G - 1, ae, 12, 0);
          let Y = parseInt(z[1]);
          const te = parseInt(z[2]), ue = z[3]?.toUpperCase();
          return ue === "PM" && Y !== 12 ? Y += 12 : ue === "AM" && Y === 12 && (Y = 0), Date.UTC(_, G - 1, ae, Y, te);
        } catch {
          return null;
        }
      }, j = [];
      e.save();
      const g = { high: 0, medium: 1, low: 2 }, C = [], y = Date.now();
      for (const P of St) {
        const _ = i(P);
        if (!_ || _ < y) continue;
        const G = l.length > 1 ? Math.abs(l[1].time - l[0].time) : 6e4, ae = l[l.length - 1], z = ae && _ > ae.time + G;
        let Y, te;
        if (z) {
          const ee = (_ - ae.time) / G, me = l.length - 1 + ee;
          if (te = Math.round(me), Y = he(me, c.startIndex), Y < 0 || Y > U - 10) continue;
        } else {
          let pe = 0, ee = l.length - 1;
          for (te = -1; pe <= ee; ) {
            const be = Math.floor((pe + ee) / 2);
            if (l[be].time === _) {
              te = be;
              break;
            }
            l[be].time < _ ? pe = be + 1 : ee = be - 1;
          }
          if (te === -1) {
            const be = pe >= 0 && pe < l.length, $e = ee >= 0 && ee < l.length;
            be && $e ? te = Math.abs(l[pe].time - _) < Math.abs(l[ee].time - _) ? pe : ee : be ? te = pe : $e ? te = ee : te = l.length - 1;
          }
          const me = Math.abs(l[te].time - _);
          if (te < 0 || me > G || te < c.startIndex || te >= c.endIndex || (Y = he(te, c.startIndex), Y < 0 || Y > U)) continue;
        }
        const ue = Pu({ event: P.event || "", country: P.region_code || "" });
        C.push({ x: Y, event: P, impact: ue, ts: _, closestIdx: te });
      }
      C.sort((P, _) => {
        const G = g[P.impact] ?? 3, ae = g[_.impact] ?? 3;
        return G !== ae ? G - ae : (P.event.event || "").localeCompare(_.event.event || "");
      });
      const L = /* @__PURE__ */ new Map();
      for (const P of C) {
        const _ = Math.round(P.x);
        L.has(_) || L.set(_, []), L.get(_).push(P);
      }
      const B = document.documentElement.classList.contains("dark"), W = v - gt, E = 22, S = 32, R = W - E / 2 - 5;
      for (const [P, _] of L) {
        const G = _[0].x, ae = _[0].impact, z = ae === "high", Y = ae === "low", te = D(_[0].event.region_code), ue = Nu(_[0].event.region_code), pe = _.length;
        j.push({
          x: G,
          y: R,
          event: _[0].event,
          impact: ae,
          ts: _[0].ts,
          groupEvents: _.map((dt) => ({ event: dt.event, impact: dt.impact, ts: dt.ts }))
        });
        const ee = z ? "#dc2626" : Y ? "#22c55e" : "#d97706";
        e.save(), e.shadowColor = B ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.15)", e.shadowBlur = 8, e.shadowOffsetY = 2;
        const me = G - S / 2, be = R - E / 2;
        e.fillStyle = B ? "rgba(30, 41, 59, 0.92)" : "rgba(255, 255, 255, 0.95)", e.beginPath(), e.roundRect(me, be, S, E, 6), e.fill(), e.shadowColor = "transparent", e.shadowBlur = 0, e.strokeStyle = B ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)", e.lineWidth = 1, e.stroke(), e.fillStyle = ee, e.beginPath(), e.roundRect(me, be, 3, E, [6, 0, 0, 6]), e.fill(), e.restore();
        const $e = 18, ct = 13;
        if (ue ? e.drawImage(ue, G - $e / 2, R - ct / 2, $e, ct) : (e.font = 'bold 9px -apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif', e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = B ? "#e2e8f0" : "#334155", e.fillText(te, G + 1, R)), pe > 1) {
          const dt = me + S - 2, Nt = be - 2, yn = 7;
          e.beginPath(), e.arc(dt, Nt, yn, 0, Math.PI * 2), e.fillStyle = ee, e.fill(), e.strokeStyle = B ? "#0f172a" : "#ffffff", e.lineWidth = 1.5, e.stroke(), e.font = 'bold 8px -apple-system, BlinkMacSystemFont, "Inter", sans-serif', e.fillStyle = "#ffffff", e.fillText(String(pe), dt, Nt + 0.5);
        }
        e.beginPath(), e.moveTo(G, R + E / 2), e.lineTo(G, W), e.strokeStyle = z ? "rgba(220, 38, 38, 0.3)" : Y ? "rgba(34, 197, 94, 0.25)" : "rgba(217, 119, 6, 0.3)", e.lineWidth = 1, e.setLineDash([2, 3]), e.stroke(), e.setLineDash([]);
      }
      e.restore(), yl.current = j;
    } else
      yl.current = [];
    if (e.strokeStyle = J.axisLine || J.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, v - gt), e.lineTo(m, v - gt), e.stroke(), Ae.versionLabelVisible) {
      const D = An === 0 ? 0 : Ae.versionLabelXOffset, i = U + We / 2 + D, j = v - gt / 2 + 1;
      e.save(), e.font = 'bold 11px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = J.text, e.fillText("v.23", i, j), e.restore();
    }
    if (c.candles.length > 0) {
      const D = cn * (1 + De), i = Math.max(1, Math.floor(80 / D)), j = v - gt, g = j + 16;
      if (e.font = ur, e.textAlign = "center", e.textBaseline = "middle", e.save(), e.beginPath(), e.rect(0, j, U, gt), e.clip(), !c.candles || c.candles.length === 0) {
        e.restore();
        return;
      }
      const C = c.candles[0], y = c.candles[c.candles.length - 1];
      if (!C || !y) {
        e.restore();
        return;
      }
      const L = (/* @__PURE__ */ new Date()).getFullYear(), B = new Date(C.time).getFullYear(), W = new Date(y.time).getFullYear(), E = B !== W, S = B !== L || W !== L, R = c.candles[1], P = R ? R.time - C.time : 6e4, G = P / 6e4 >= 60;
      let ae = "", z = -1, Y = -1 / 0;
      const te = 12, ue = (ee, me) => {
        if (G) {
          const ct = zn(ee, S || E || me !== z);
          return ct !== ae ? (ae = ct, z = me, ct) : Cl(ee);
        }
        const be = zn(ee, !1);
        return me !== z && z !== -1 ? (z = me, zn(ee, !0)) : be !== ae ? (ae = be, z = me, zn(ee, S)) : Cl(ee);
      }, pe = ie.width < 400;
      if (Ae.useFixedTimeAxisLabels) {
        const ee = pe ? Ae.fixedTimeAxisLabelCountSmall : Ae.fixedTimeAxisLabelCount, me = 5, be = U - me * 2;
        for (let $e = 0; $e < ee; $e++) {
          const ct = me + be * ($e + 0.5) / ee, dt = is(ct, c.startIndex), Nt = Math.round(dt) - c.startIndex, yn = Nt >= 0 && Nt < c.candles.length ? c.candles[Nt] : null, En = yn ? yn.time : C.time + (dt - c.startIndex) * P, Mt = yn ? he(c.startIndex + Nt, c.startIndex) : ct, Lt = new Date(En).getFullYear(), vt = ue(En, Lt);
          e.fillStyle = J.axisLabel, e.fillText(vt, Mt, g);
        }
      } else {
        const $e = [
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
        ], ct = i * P;
        let dt = $e[$e.length - 1];
        for (const Mt of $e)
          if (Mt >= ct) {
            dt = Mt;
            break;
          }
        const Nt = Math.ceil(C.time / dt) * dt, yn = y.time + dt * 25;
        let En = -1;
        for (let Mt = Nt; Mt <= yn; Mt += dt) {
          let Lt, vt = Mt;
          if (Mt <= y.time) {
            let Kt = 0, jl = c.candles.length - 1, ps = jl;
            for (; Kt <= jl; ) {
              const Ys = Kt + jl >> 1;
              c.candles[Ys].time >= Mt ? (ps = Ys, jl = Ys - 1) : Kt = Ys + 1;
            }
            if (ps === En) continue;
            En = ps, vt = c.candles[ps].time, Lt = he(c.startIndex + ps, c.startIndex);
          } else {
            const Kt = c.startIndex + (c.candles.length - 1) + (Mt - y.time) / P;
            Lt = he(Kt, c.startIndex);
          }
          if (Lt < 2 || Lt > U - 10) continue;
          const On = ue(vt, new Date(vt).getFullYear()), en = e.measureText(On).width, Wt = Lt - en / 2, un = Lt + en / 2;
          Wt < Y + te || un > U - 10 || Wt < 2 || (e.fillStyle = J.axisLabel, e.fillText(On, Lt, g), Y = un);
        }
      }
      e.restore(), (Vl.length > 0 || Tl.length > 0) && (e.save(), Vl.forEach((ee) => {
        e.fillStyle = Do, e.beginPath(), e.roundRect(ee.topOrigin, Bo, ee.bWidth, fs, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.font = Xs, e.fillText(ee.text, ee.topOrigin + ee.bWidth / 2, Bo + fs / 2);
      }), Tl.forEach((ee) => {
        e.fillStyle = Do, e.beginPath(), e.roundRect(Wo, ee.topOrigin, ee.bWidth, fs, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.font = Xs, e.fillText(ee.text, Wo + ee.bWidth / 2, ee.topOrigin + fs / 2);
      }), e.restore());
    }
    const Oo = p.getContext("2d");
    Oo && (Oo.setTransform(1, 0, 0, 1, 0, 0), Oo.drawImage(h, 0, 0)), _n.current = {
      startIndex: Cr,
      candleWidth: cn
    }, nt.current && es.current?.();
  }, [ie, l, n, se, J, s, de, Pn, Sl, Nn, Cl, zn, fr, Rs, dn, I, r, Ve, at, St, ht, kt, qn, Pl]);
  Cn.current = il, o.useEffect(() => {
    Ul && (Ul.current = () => {
      Ye(!0);
    });
  }, [Ul]);
  const At = o.useCallback(() => {
    const a = Xe.current, p = a?.getContext("2d");
    if (!a || !p) return;
    const m = {
      ctx: p,
      dimensions: ie,
      dpr: dn,
      candles: l,
      colors: J,
      viewState: se,
      indicatorData: s,
      indicators: r,
      indicatorHeightRatio: de,
      showOHLC: Yn,
      isDesktop: Ns,
      PRICE_AXIS_WIDTH: We,
      TIME_AXIS_HEIGHT: gt,
      PRICE_LABEL_FONT: Ls,
      TIME_LABEL_FONT: ur,
      crosshair: $t.current,
      isScrolling: nt.current,
      scrollState: {
        startIndex: Te.current.startIndex,
        candleWidth: Te.current.candleWidth
      },
      isDraggingHandle: !!Qe.current,
      isHoveredSLTP: !!fn.current,
      sessionControlHovered: ho.current,
      isSyncedUpdate: ql.current,
      syncedCrosshairTime: Ll.current ?? void 0,
      hoveredEvent: Tn.current || tl.current,
      currentOhlcTextWidth: tr,
      currentBbTextEndX: fo,
      currentMaTextEndX: po,
      currentVwapTextEndX: xo,
      currentVpTextEndX: mo,
      currentVolTextEndX: bo,
      overlayLabelEndXPrev: _l.current,
      subplotLabelEndXPrev: lr,
      getVisibleCandles: Pn,
      getPriceRange: Sl,
      yToPrice: dr,
      xToIndex: is,
      indexToX: hr,
      formatPrice: Nn,
      formatTime: Cl,
      formatDate: zn,
      callbacks: {
        setOhlcTextWidth: ta,
        setBbTextEndX: la,
        setMaTextEndX: sa,
        setVwapTextEndX: oa,
        setVpTextEndX: ra,
        setVolTextEndX: aa,
        setOverlayLabelEndX: (v) => {
          _l.current = v, ca(v);
        },
        setSubplotLabelEndX: ia,
        onCrosshairMove: Q
      }
    };
    Lu(m);
  }, [ie, l, se, J, s, r, de, Pn, Sl, dr, is, hr, Nn, Cl, zn, Q, dn, Yn, ne]);
  o.useEffect(() => {
    Dn.current = At;
  }, [At]), o.useEffect(() => {
    Vt.current = J?.crosshairStyle || "standard", Xe.current && (Xe.current.style.cursor = Vt.current !== "standard" ? "none" : "crosshair");
  }, [J?.crosshairStyle]);
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
    minCandleWidth: Es,
    maxCandleWidth: As,
    priceAxisWidth: We,
    timeAxisHeight: gt,
    dimensions: ie,
    candlesLength: l.length,
    disableAutoFollow: _e,
    livePrice: n ?? null,
    scrollStateRef: Te,
    drawChartRef: Cn,
    notifyScrollSync: pt,
    getVisibleCandles: Pn,
    getPriceRange: Sl,
    setViewState: Et,
    setPriceScale: Ot,
    setPriceOffset: Tt,
    setFixedPriceCenter: Fl,
    setFixedPriceRange: Ol,
    setIsScalingYAxis: io,
    fixedPriceCenter: Xt,
    priceScale: ln,
    priceOffset: Re,
    viewStateAutoFollowLatest: se.autoFollowLatest,
    yAxisScaleStartRef: ss,
    priceScaleRef: gn,
    priceOffsetRef: Vn,
    yAxisDebounceRef: Xn
  }), wa = o.useCallback((a) => {
    const p = Xe.current;
    if (!p) return;
    const m = p.getBoundingClientRect(), v = a.clientX - m.left, h = a.clientY - m.top;
    if (("ontouchstart" in window || navigator.maxTouchPoints > 0) && !jn && !Bn && !Qe.current)
      return;
    if ($t.current = { x: v, y: h }, !Bn && !Qe.current && r && s) {
      const w = sn.current, A = on.current;
      if (w && A > 0 && h < A) {
        const X = Te.current, u = X.candleWidth * (1 + De), N = Math.max(0, Math.floor(X.startIndex)), x = N + Math.round(v / u), V = 8, d = (Z) => isNaN(Z) || !isFinite(Z) ? !1 : Math.abs(h - (A - (Z - w.min) / w.range * A)) < V;
        let M = null;
        if (!M && r.movingAverages?.enabled && s.movingAverages) {
          for (const Z of s.movingAverages)
            if (x >= 0 && x < Z.data.length && d(Z.data[x])) {
              M = "movingAverages";
              break;
            }
        }
        if (!M && r.bollinger?.enabled && s.bollinger) {
          const Z = s.bollinger;
          x >= 0 && x < Z.upper.length && (d(Z.upper[x]) || d(Z.middle[x]) || d(Z.lower[x])) && (M = "bollinger");
        }
        if (!M && r.vwap?.enabled && s.vwap && x >= 0 && x < s.vwap.length && d(s.vwap[x]) && (M = "vwap"), !M && r.supertrend?.enabled && s.supertrend && x >= 0 && x < s.supertrend.length && s.supertrend[x] && d(s.supertrend[x].value) && (M = "supertrend"), !M && r.ichimoku?.enabled && s.ichimoku) {
          const Z = s.ichimoku;
          x >= 0 && x < Z.tenkan.length && (d(Z.tenkan[x]) || d(Z.kijun[x]) || d(Z.senkouA[x]) || d(Z.senkouB[x])) && (M = "ichimoku");
        }
        if (!M && r.keltner?.enabled && s.keltner) {
          const Z = s.keltner;
          x >= 0 && x < Z.upper.length && (d(Z.upper[x]) || d(Z.middle[x]) || d(Z.lower[x])) && (M = "keltner");
        }
        if (!M && r.donchian?.enabled && s.donchian) {
          const Z = s.donchian;
          x >= 0 && x < Z.upper.length && (d(Z.upper[x]) || d(Z.middle[x]) || d(Z.lower[x])) && (M = "donchian");
        }
        if (!M && r.envelopes?.enabled && s.envelopes) {
          const Z = s.envelopes;
          x >= 0 && x < Z.upper.length && (d(Z.upper[x]) || d(Z.basis[x]) || d(Z.lower[x])) && (M = "envelopes");
        }
        if (!M && r?.volume?.enabled && A > 0 && h >= A * 0.8 && h <= A) {
          const Z = x - N, Le = Pn();
          if (Z >= 0 && Z < Le.candles.length) {
            const q = Le.candles[Z].volume ?? 0;
            if (q > 0) {
              const ye = A * 0.2, He = A, Ee = Le.candles.map((Fe) => Fe.volume ?? 0).filter((Fe) => Fe > 0), re = Ee.length > 0 ? Math.max(...Ee) : 1, ke = q / re * ye * 0.95, Ke = He - ke;
              h >= Ke && (M = "volume");
            }
          }
        }
        const oe = ie.width - We;
        if (!M && r?.volumeProfile?.enabled && A > 0 && v >= oe * (1 - (r.volumeProfile.rowWidth ?? 15) / 100)) {
          const Z = Pn();
          if (Z.candles.length > 0) {
            const Le = r.volumeProfile.numberOfRows ?? 48, q = oe * ((r.volumeProfile.rowWidth ?? 15) / 100), ye = r.volumeProfile.lookbackBars ?? 0, He = ye > 0 ? Z.candles.slice(-ye) : Z.candles;
            let Ee = 1 / 0, re = -1 / 0;
            He.forEach((Fe) => {
              Ee = Math.min(Ee, Fe.low), re = Math.max(re, Fe.high);
            });
            const ke = (re - Ee || 1) / Le, Ke = sn.current;
            if (Ke && Ke.range > 0) {
              const Fe = Ke.max - h / A * Ke.range, Dt = Math.floor((Fe - Ee) / ke);
              if (Dt >= 0 && Dt < Le) {
                const vn = new Float64Array(Le);
                He.forEach((jt) => {
                  if (!(!jt.volume || jt.volume <= 0))
                    for (let hl = 0; hl < Le; hl++) {
                      const ds = Ee + hl * ke, _s = ds + ke;
                      if (jt.high >= ds && jt.low <= _s) {
                        const jo = Math.max(jt.low, ds), Mo = Math.min(jt.high, _s), Ro = jt.high - jt.low > 0 ? (Mo - jo) / (jt.high - jt.low) : 1;
                        vn[hl] += jt.volume * Ro;
                      }
                    }
                });
                let Yt = 0;
                for (let jt = 0; jt < Le; jt++)
                  vn[jt] > Yt && (Yt = vn[jt]);
                const Os = vn[Dt];
                if (Os > 0 && Yt > 0) {
                  const jt = Os / Yt * q, hl = oe - jt;
                  v >= hl && (M = "volumeProfile");
                }
              }
            }
          }
        }
        if (!M && r.customIndicators) {
          const Le = (q) => isNaN(q) || !isFinite(q) ? !1 : Math.abs(h - (A - (q - w.min) / w.range * A)) < 14;
          for (const q of r.customIndicators) {
            const ye = q.data;
            if (!(!q.enabled || q.display !== "overlay" || !ye) && x >= 0 && x < ye.length && Le(ye[x])) {
              const He = q.scriptId;
              M = typeof q.expression == "string" && q.expression.startsWith("brue:") && He ? `script-${He}` : `ci-${q.id}`;
              break;
            }
          }
        }
        if (!M) {
          const Z = Qt.current, Le = [];
          if (r.rsi?.enabled && s.rsi) {
            const q = Z.rsi;
            Le.push({ key: "sp-rsi", check: () => {
              if (!q || h < q.top || h > q.bottom || x < 0 || x >= s.rsi.length) return !1;
              const ye = s.rsi[x];
              if (isNaN(ye) || !isFinite(ye)) return !1;
              const He = q.bottom - q.top;
              return Math.abs(h - (q.top + He - ye / 100 * He)) < V;
            } });
          }
          if (r.macd?.enabled && s.macd) {
            const q = Z.macd;
            Le.push({ key: "sp-macd", check: () => !(!q || h < q.top || h > q.bottom) });
          }
          if (r.stochastic?.enabled && s.stochastic) {
            const q = Z.stochastic;
            Le.push({ key: "sp-stochastic", check: () => {
              if (!q || h < q.top || h > q.bottom || x < 0 || x >= s.stochastic.k.length) return !1;
              const ye = q.bottom - q.top, He = q.top + ye - s.stochastic.k[x] / 100 * ye, Ee = q.top + ye - s.stochastic.d[x] / 100 * ye;
              return Math.abs(h - He) < V || Math.abs(h - Ee) < V;
            } });
          }
          if (r.atr?.enabled && s.atr) {
            const q = Z.atr;
            Le.push({ key: "sp-atr", check: () => !(!q || h < q.top || h > q.bottom) });
          }
          for (const q of Le)
            if (q.check()) {
              M = q.key;
              break;
            }
        }
        const Ne = wl.current;
        if (wl.current = M, M !== Ne && Xe.current) {
          const Z = Vt.current !== "standard" ? "none" : "crosshair";
          Xe.current.style.cursor = M ? "pointer" : Z;
        }
      } else if (wl.current && (wl.current = null, Xe.current && !or.current)) {
        const X = Vt.current !== "standard" ? "none" : "crosshair";
        Xe.current.style.cursor = X;
      }
    }
    const F = on.current, H = ie.height;
    if (F > 0 && Xe.current) {
      if (h > F && h < H - 30)
        Xe.current.style.cursor = "pointer";
      else if (h <= F && !wl.current && !or.current) {
        const w = Vt.current !== "standard" ? "none" : "crosshair";
        Xe.current.style.cursor = w;
      }
    }
    let K = !1;
    for (const w of yl.current) {
      const A = v - w.x, X = h - w.y;
      if (Math.sqrt(A * A + X * X) < 16) {
        tl.current = w, K = !0, Xe.current && (Xe.current.style.cursor = "pointer");
        break;
      }
    }
    if (K || (tl.current = null), Qe.current) {
      const w = sn.current, A = on.current;
      if (w && w.range > 0 && A > 0) {
        const X = w.max - h / A * w.range;
        Qe.current === "sl" ? st.current = X : it.current = X, Xe.current && (Xe.current.style.cursor = k), bn.current === null && (bn.current = requestAnimationFrame(() => {
          Ye(!1), bn.current = null;
        }));
        return;
      }
    }
    if (Ue && Ue.length > 0) {
      const w = sn.current, A = on.current;
      if (w && w.range > 0 && A > 0) {
        let X = !1;
        for (const u of Ue) {
          const N = (w.max - u.price) / w.range * A;
          if (v <= 160 && Math.abs(h - N) < 12) {
            X = !0;
            break;
          }
          if (u.id === Be.current) {
            const V = Math.min(N + 10, A - 22 - 4), d = ie.width - We, M = 144 + 5 * 2, oe = (d - M) / 2;
            if (v >= oe - 8 && v <= oe + M + 8 && h >= V - 8 && h <= V + 22 + 8) {
              X = !0;
              break;
            }
          }
        }
        X && Xe.current && (Xe.current.style.cursor = "pointer");
      }
    }
    if (Be.current && Ue && Ue.length > 0) {
      const w = sn.current, A = on.current;
      if (w && w.range > 0 && A > 0) {
        const X = w.max - h / A * w.range, u = w.range * 0.012, N = Ue.find((x) => x.id === Be.current);
        if (N) {
          const x = N.side === "buy", V = Zn(N.price), d = st.current ?? N.stopLoss ?? (x ? N.price - V : N.price + V), M = it.current ?? N.takeProfit ?? (x ? N.price + V : N.price - V), oe = Math.abs(X - d) < u, Ne = Math.abs(X - M) < u;
          if (oe || Ne)
            Xe.current && (Xe.current.style.cursor = co), fn.current = oe ? "sl" : "tp", Ye(!1);
          else if (fn.current && (fn.current = null, Ye(!1)), Xe.current) {
            const Z = Vt.current !== "standard" ? "none" : "crosshair";
            Xe.current.style.cursor !== Z && (Xe.current.style.cursor = Z);
          }
        }
      }
    }
    if (Bn) {
      if (a.buttons === 0) {
        nl(!1), It(!1);
        return;
      }
      It(!0);
      const w = v - pn.x, A = h - pn.y, X = se.candleWidth * (1 + De), u = w / X, N = Math.max(
        0,
        Math.min(l.length - 10, pn.startIndex - u)
      );
      if (Te.current = {
        startIndex: N,
        candleWidth: se.candleWidth
      }, al && Ge !== null) {
        const x = Ge / gn.current / (ie.height - gt), V = A * x;
        Vn.current = pn.priceOffset + V;
      }
      Wn.current === null && (Wn.current = requestAnimationFrame(() => {
        Ye(!0), At(), pt(), Wn.current = null;
      })), mt.current && clearTimeout(mt.current), mt.current = setTimeout(() => {
        const x = Te.current;
        Et((V) => ({
          ...V,
          startIndex: x.startIndex,
          // Keep float precision - no rounding
          autoFollowLatest: !1
        })), al && Tt(Vn.current), It(!1);
      }, 100);
      return;
    }
    const O = Pn(), b = is(v, O.startIndex);
    b >= 0 && b < l.length ? xt.current = b : xt.current = null, At();
  }, [Bn, pn, se.candleWidth, l.length, al, Ge, ln, ie.height, At, jn, Pn, is, l]), Sa = o.useCallback((a) => {
    const p = Xe.current;
    if (!p) return;
    const m = p.getBoundingClientRect(), v = a.clientX - m.left, h = a.clientY - m.top;
    let e = !1;
    for (const O of yl.current) {
      const b = v - O.x, w = h - O.y;
      if (Math.sqrt(b * b + w * w) < 16) {
        e = !0, Tn.current && Tn.current.ts === O.ts && Tn.current.x === O.x ? Tn.current = null : Tn.current = O, Dn.current && Dn.current();
        return;
      }
    }
    if (Tn.current && !e && (Tn.current = null, Dn.current && Dn.current()), Yn && r) {
      const O = [
        { key: "bollinger", title: "BB", enabledCheck: () => !!(r?.bollinger?.enabled && s?.bollinger), endXSource: () => fo },
        { key: "movingAverages", title: "MA", enabledCheck: () => !!(r?.movingAverages?.enabled && s?.movingAverages), endXSource: () => po },
        { key: "vwap", title: "VWAP", enabledCheck: () => !!(r?.vwap?.enabled && s?.vwap), endXSource: () => xo },
        { key: "ichimoku", title: "Ichimoku", enabledCheck: () => !!(r?.ichimoku?.enabled && s?.ichimoku), endXSource: () => lt.ichimoku || 0 },
        { key: "keltner", title: "Keltner", enabledCheck: () => !!(r?.keltner?.enabled && s?.keltner), endXSource: () => lt.keltner || 0 },
        { key: "volumeProfile", title: "Vol Profile", enabledCheck: () => !!r?.volumeProfile?.enabled, endXSource: () => mo },
        { key: "volume", title: "Volume", enabledCheck: () => !!(r?.volume?.enabled && l.some((w) => w.volume)), endXSource: () => bo },
        { key: "supertrend", title: "Supertrend", enabledCheck: () => !!(r?.supertrend?.enabled && s?.supertrend), endXSource: () => lt.supertrend || 0 },
        { key: "donchian", title: "Donchian", enabledCheck: () => !!(r?.donchian?.enabled && s?.donchian), endXSource: () => lt.donchian || 0 },
        { key: "envelopes", title: "Envelopes", enabledCheck: () => !!(r?.envelopes?.enabled && s?.envelopes), endXSource: () => lt.envelopes || 0 },
        // Phase 2 overlays
        { key: "alma", title: "ALMA", enabledCheck: () => !!(r?.alma?.enabled && s?.alma), endXSource: () => lt.alma || 0 },
        { key: "kama", title: "KAMA", enabledCheck: () => !!(r?.kama?.enabled && s?.kama), endXSource: () => lt.kama || 0 },
        { key: "zlema", title: "ZLEMA", enabledCheck: () => !!(r?.zlema?.enabled && s?.zlema), endXSource: () => lt.zlema || 0 },
        { key: "t3", title: "T3", enabledCheck: () => !!(r?.t3?.enabled && s?.t3), endXSource: () => lt.t3 || 0 },
        { key: "lsma", title: "LSMA", enabledCheck: () => !!(r?.lsma?.enabled && s?.lsma), endXSource: () => lt.lsma || 0 },
        { key: "mcginley", title: "McGinley", enabledCheck: () => !!(r?.mcginley?.enabled && s?.mcginley), endXSource: () => lt.mcginley || 0 },
        { key: "wma", title: "WMA", enabledCheck: () => !!(r?.wma?.enabled && s?.wma), endXSource: () => lt.wma || 0 },
        { key: "smmaOverlay", title: "SMMA", enabledCheck: () => !!(r?.smmaOverlay?.enabled && s?.smmaOverlay), endXSource: () => lt.smmaOverlay || 0 },
        { key: "vwma", title: "VWMA", enabledCheck: () => !!(r?.vwma?.enabled && s?.vwma), endXSource: () => lt.vwma || 0 },
        { key: "medianPrice", title: "Median", enabledCheck: () => !!(r?.medianPrice?.enabled && s?.medianPrice), endXSource: () => lt.medianPrice || 0 },
        { key: "typicalPrice", title: "Typical", enabledCheck: () => !!(r?.typicalPrice?.enabled && s?.typicalPrice), endXSource: () => lt.typicalPrice || 0 },
        { key: "weightedClose", title: "WClose", enabledCheck: () => !!(r?.weightedClose?.enabled && s?.weightedClose), endXSource: () => lt.weightedClose || 0 },
        { key: "zigzag", title: "ZigZag", enabledCheck: () => !!(r?.zigzag?.enabled && s?.zigzag), endXSource: () => lt.zigzag || 0 },
        { key: "alligator", title: "Alligator", enabledCheck: () => !!(r?.alligator?.enabled && s?.alligator), endXSource: () => lt.alligator || 0 },
        { key: "priceChannel", title: "Price Ch", enabledCheck: () => !!(r?.priceChannel?.enabled && s?.priceChannel), endXSource: () => lt.priceChannel || 0 },
        { key: "chandeKroll", title: "Chande Kroll", enabledCheck: () => !!(r?.chandeKroll?.enabled && s?.chandeKroll), endXSource: () => lt.chandeKroll || 0 },
        { key: "chandelierExit", title: "Chandelier", enabledCheck: () => !!(r?.chandelierExit?.enabled && s?.chandelierExit), endXSource: () => lt.chandelierExit || 0 },
        { key: "accBands", title: "Acc Bands", enabledCheck: () => !!(r?.accBands?.enabled && s?.accBands), endXSource: () => lt.accBands || 0 },
        { key: "demarkPivots", title: "DeMark", enabledCheck: () => !!(r?.demarkPivots?.enabled && s?.demarkPivots), endXSource: () => lt.demarkPivots || 0 },
        { key: "fractals", title: "Fractals", enabledCheck: () => !!(r?.fractals?.enabled && s?.fractals), endXSource: () => lt.fractals || 0 }
      ];
      let b = 28;
      for (const w of O) {
        if (!w.enabledCheck()) continue;
        const A = ie.width < 500 ? 14 : 19, X = w.endXSource();
        if (w.key === "movingAverages" && s?.movingAverages?.length > 0) {
          const N = r.movingAverages?.lines ?? [], x = r?.customBrueScripts || {};
          let V = 0;
          for (let d = 0; d < s.movingAverages.length; d++) {
            const M = N[d]?.sourceScriptId;
            if (M && x[M]?.enabled) continue;
            const oe = b + V * A - 10, Ne = oe + A;
            if (X > 0 && v >= 0 && v <= X && h >= oe && h <= Ne) {
              const Z = `movingAverages__${d}`;
              ce((Le) => Le === Z ? null : Z), fe(Z);
              return;
            }
            V++;
          }
          b += V * A;
          continue;
        }
        const u = A;
        if (X > 0 && v >= 0 && v <= X && h >= b - 10 && h <= b - 10 + u) {
          ce((N) => N === w.key ? null : w.key), fe(w.key);
          return;
        }
        b += u;
      }
    }
    if (r && s) {
      const O = sn.current, b = on.current;
      if (O && b > 0) {
        const w = Te.current, A = w.candleWidth * (1 + De);
        ie.width - We;
        const u = Math.max(0, Math.floor(w.startIndex)) + Math.round(v / A), N = 8, x = (d) => {
          if (isNaN(d) || !isFinite(d)) return !1;
          const M = b - (d - O.min) / O.range * b;
          return Math.abs(h - M) < N;
        };
        if (r.movingAverages?.enabled && s.movingAverages)
          for (let d = 0; d < s.movingAverages.length; d++) {
            const M = s.movingAverages[d];
            if (u >= 0 && u < M.data.length && x(M.data[u])) {
              const oe = `movingAverages__${d}`;
              ce((Ne) => Ne === oe ? null : oe), fe(oe);
              return;
            }
          }
        if (r.bollinger?.enabled && s.bollinger) {
          const d = s.bollinger;
          if (u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.middle[u]) || x(d.lower[u]))) {
            ce((M) => M === "bollinger" ? null : "bollinger"), fe("bollinger");
            return;
          }
        }
        if (r.vwap?.enabled && s.vwap && u >= 0 && u < s.vwap.length && x(s.vwap[u])) {
          ce((d) => d === "vwap" ? null : "vwap"), fe("vwap");
          return;
        }
        if (r.supertrend?.enabled && s.supertrend && u >= 0 && u < s.supertrend.length) {
          const d = s.supertrend[u];
          if (d && x(d.value)) {
            ce((M) => M === "supertrend" ? null : "supertrend"), fe("supertrend");
            return;
          }
        }
        if (r.ichimoku?.enabled && s.ichimoku) {
          const d = s.ichimoku;
          if (u >= 0 && u < d.tenkan.length && (x(d.tenkan[u]) || x(d.kijun[u]) || x(d.senkouA[u]) || x(d.senkouB[u]))) {
            ce((M) => M === "ichimoku" ? null : "ichimoku"), fe("ichimoku");
            return;
          }
        }
        if (r.keltner?.enabled && s.keltner) {
          const d = s.keltner;
          if (u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.middle[u]) || x(d.lower[u]))) {
            ce((M) => M === "keltner" ? null : "keltner"), fe("keltner");
            return;
          }
        }
        if (r.donchian?.enabled && s.donchian) {
          const d = s.donchian;
          if (u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.middle[u]) || x(d.lower[u]))) {
            ce((M) => M === "donchian" ? null : "donchian"), fe("donchian");
            return;
          }
        }
        if (r.envelopes?.enabled && s.envelopes) {
          const d = s.envelopes;
          if (u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.basis[u]) || x(d.lower[u]))) {
            ce((M) => M === "envelopes" ? null : "envelopes"), fe("envelopes");
            return;
          }
        }
        const V = ["dema", "tema", "hma"];
        for (const d of V)
          if (r[d]?.enabled && s[d]) {
            const M = s[d];
            if (Array.isArray(M) && u >= 0 && u < M.length && x(M[u])) {
              ce((oe) => oe === d ? null : d), fe(d);
              return;
            }
          }
      }
    }
    if (r?.volume?.enabled) {
      const O = on.current;
      if (O > 0 && h >= O * 0.8 && h <= O) {
        ce((b) => b === "volume" ? null : "volume"), fe("volume");
        return;
      }
    }
    if (wl.current === "volumeProfile") {
      ce((O) => O === "volumeProfile" ? null : "volumeProfile"), fe("volumeProfile");
      return;
    }
    const F = wl.current;
    if (F && (F.startsWith("ci-") || F.startsWith("script-"))) {
      ce((O) => O === F ? null : F), fe(F);
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
    for (const O of K) {
      const b = H[O];
      if (b && h >= b.top && h <= b.top + 25 && v <= 200) {
        const w = `sp-${O}`;
        ce((A) => A === w ? null : w), fe(w);
        return;
      }
    }
    if (r && s) {
      const O = Te.current, b = O.candleWidth * (1 + De), w = Math.max(0, Math.floor(O.startIndex)), A = w + Math.round(v / b), X = 10, u = (x, V) => {
        if (!V) return !1;
        const d = H[x];
        if (!d || h < d.top || h > d.bottom || A < 0 || A >= V.length) return !1;
        const M = V[A];
        if (isNaN(M) || !isFinite(M)) return !1;
        const oe = d.bottom - d.top, Ne = d.top + oe - M / 100 * oe;
        return Math.abs(h - Ne) < X;
      }, N = (x, V) => {
        const d = H[x];
        if (!d || h < d.top || h > d.bottom) return !1;
        const M = d.bottom - d.top;
        let oe = 1 / 0, Ne = -1 / 0;
        const Z = ie.width - We, Le = Math.floor(Z / b), q = Math.max(0, w), ye = Math.min(q + Le, V[0]?.length ?? 0);
        for (const ke of V)
          if (ke)
            for (let Ke = q; Ke < ye; Ke++) {
              const Fe = ke[Ke];
              !isNaN(Fe) && isFinite(Fe) && (Fe < oe && (oe = Fe), Fe > Ne && (Ne = Fe));
            }
        if (oe >= Ne) return !1;
        const Ee = (Ne - oe) * 0.1;
        oe -= Ee, Ne += Ee;
        const re = Ne - oe;
        if (A < 0) return !1;
        for (const ke of V) {
          if (!ke || A >= ke.length) continue;
          const Ke = ke[A];
          if (isNaN(Ke) || !isFinite(Ke)) continue;
          const Fe = d.top + M - (Ke - oe) / re * M;
          if (Math.abs(h - Fe) < X) return !0;
        }
        return !1;
      };
      if (r.rsi?.enabled && u("rsi", s.rsi)) {
        ce((x) => x === "sp-rsi" ? null : "sp-rsi"), fe("sp-rsi");
        return;
      }
      if (r.stochastic?.enabled && s.stochastic && (u("stochastic", s.stochastic.k) || u("stochastic", s.stochastic.d))) {
        ce((x) => x === "sp-stochastic" ? null : "sp-stochastic"), fe("sp-stochastic");
        return;
      }
      if (r.macd?.enabled && s.macd && N("macd", [s.macd.macd, s.macd.signal])) {
        ce((x) => x === "sp-macd" ? null : "sp-macd"), fe("sp-macd");
        return;
      }
      if (r.atr?.enabled && s.atr && N("atr", [s.atr])) {
        ce((x) => x === "sp-atr" ? null : "sp-atr"), fe("sp-atr");
        return;
      }
      if (r.williamsR?.enabled && s.williamsR) {
        const x = H.williamsR;
        if (x && h >= x.top && h <= x.bottom && A >= 0 && A < s.williamsR.length) {
          const V = s.williamsR[A];
          if (!isNaN(V) && isFinite(V)) {
            const d = x.bottom - x.top, M = x.top + d - (V + 100) / 100 * d;
            if (Math.abs(h - M) < X) {
              ce((oe) => oe === "sp-williamsR" ? null : "sp-williamsR"), fe("sp-williamsR");
              return;
            }
          }
        }
      }
      if (r.cci?.enabled && s.cci && N("cci", [s.cci])) {
        ce((x) => x === "sp-cci" ? null : "sp-cci"), fe("sp-cci");
        return;
      }
      if (r.adx?.enabled && s.adx && (u("adx", s.adx.adx) || u("adx", s.adx.plusDI) || u("adx", s.adx.minusDI))) {
        ce((x) => x === "sp-adx" ? null : "sp-adx"), fe("sp-adx");
        return;
      }
      if (r.roc?.enabled && s.roc && N("roc", [s.roc])) {
        ce((x) => x === "sp-roc" ? null : "sp-roc"), fe("sp-roc");
        return;
      }
      if (r.aroon?.enabled && s.aroon && (u("aroon", s.aroon.up) || u("aroon", s.aroon.down))) {
        ce((x) => x === "sp-aroon" ? null : "sp-aroon"), fe("sp-aroon");
        return;
      }
      if (r.tsi?.enabled && s.tsi && N("tsi", [s.tsi.tsi, s.tsi.signal])) {
        ce((x) => x === "sp-tsi" ? null : "sp-tsi"), fe("sp-tsi");
        return;
      }
      if (r.trix?.enabled && s.trix && N("trix", [s.trix.trix, s.trix.signal])) {
        ce((x) => x === "sp-trix" ? null : "sp-trix"), fe("sp-trix");
        return;
      }
      if (r.kst?.enabled && s.kst && N("kst", [s.kst.kst, s.kst.signal])) {
        ce((x) => x === "sp-kst" ? null : "sp-kst"), fe("sp-kst");
        return;
      }
      if (r.stochRsi?.enabled && s.stochRsi && (u("stochRsi", s.stochRsi.k) || u("stochRsi", s.stochRsi.d))) {
        ce((x) => x === "sp-stochRsi" ? null : "sp-stochRsi"), fe("sp-stochRsi");
        return;
      }
      for (const x of K) {
        const V = H[x];
        if (V && h >= V.top && h <= V.bottom) {
          const d = s[x];
          if (d && Array.isArray(d) && N(x, [d])) {
            const M = `sp-${x}`;
            ce((oe) => oe === M ? null : M), fe(M);
            return;
          }
        }
      }
    }
    if (rs && Hl(null), kt && ce(null), Rn && bt(null), Ue && Ue.length > 0 && Date.now() - Ql.current > 500) {
      const O = sn.current, b = on.current;
      if (O && O.range > 0 && b > 0) {
        const w = O.max - h / b * O.range, A = O.range * 6e-3;
        if (Be.current) {
          const u = Ue.find((N) => N.id === Be.current);
          if (u) {
            const N = (O.max - u.price) / O.range * b, x = 22, V = Math.min(N + 10, b - x - 4), d = 5, M = 45, oe = 55, Ne = 44, Z = ie.width - We, Le = M + oe + Ne + d * 2, ye = (Z - Le) / 2, He = ye + M + d, Ee = He + oe + d, re = 8;
            if (v >= ye - re && v <= ye + M + re && h >= V - re && h <= V + x + re) {
              if (Ht) {
                const ke = u.side === "buy", Ke = Zn(u.price), Fe = st.current ?? u.stopLoss ?? (ke ? u.price - Ke : u.price + Ke), Dt = it.current ?? u.takeProfit ?? (ke ? u.price + Ke : u.price - Ke);
                Ht(Be.current, Fe, Dt);
              }
              Be.current = null, st.current = null, it.current = null, Qe.current = null, Ft((ke) => ke + 1), Ye(!1);
              return;
            }
            if (v >= He - re && v <= He + oe + re && h >= V - re && h <= V + x + re) {
              Be.current = null, st.current = null, it.current = null, Qe.current = null, Ft((ke) => ke + 1), Ye(!1);
              return;
            }
            if (v >= Ee - re && v <= Ee + Ne + re && h >= V - re && h <= V + x + re) {
              Ut && Ut(Be.current), Be.current = null, st.current = null, it.current = null, Qe.current = null, Ft((ke) => ke + 1), Ye(!1);
              return;
            }
          }
        }
        if (Be.current) {
          const u = Ue.find((N) => N.id === Be.current);
          if (u) {
            const N = u.side === "buy", x = Zn(u.price), V = st.current ?? u.stopLoss ?? (N ? u.price - x : u.price + x), d = it.current ?? u.takeProfit ?? (N ? u.price + x : u.price - x);
            if (Math.abs(w - V) < A) {
              Qe.current = "sl", st.current = V;
              return;
            }
            if (Math.abs(w - d) < A) {
              Qe.current = "tp", it.current = d;
              return;
            }
          }
        }
        let X = null;
        for (const u of Ue)
          if (Math.abs(w - u.price) < A) {
            X = u.id;
            break;
          }
        if (X) {
          if (Be.current === X)
            Be.current = null, st.current = null, it.current = null;
          else {
            Be.current = X;
            const u = Ue.find((N) => N.id === X);
            st.current = u?.stopLoss ?? null, it.current = u?.takeProfit ?? null;
          }
          Qe.current = null, Ft((u) => u + 1), Ye(!1);
          return;
        }
      }
    }
    nl(!0), ls({ x: v, y: h, startIndex: se.startIndex, priceOffset: Re });
  }, [se.startIndex, Re, rs, kt, Rn, Ue, Ht, Ut, qt]), wo = o.useCallback(() => {
    if (Qe.current && Be.current) {
      Qe.current = null, Xe.current && (Xe.current.style.cursor = Vt.current !== "standard" ? "none" : "crosshair"), Ye(!1);
      return;
    }
    if (nt.current) {
      It(!1);
      const a = Te.current;
      if (Ye(!1), _e) {
        const p = ie.width - We, m = se.candleWidth * (1 + De), v = Math.floor(p / m), h = a.startIndex + v, e = l.length - 1 < h;
        $n.current = !e;
      }
      Et((p) => ({
        ...p,
        startIndex: a.startIndex,
        // Keep float precision - no rounding
        autoFollowLatest: !1
      }));
    }
    Wn.current !== null && (cancelAnimationFrame(Wn.current), Wn.current = null), nl(!1);
  }, [Ht, Ut]);
  o.useEffect(() => {
    if (!Bn) return;
    const a = () => {
      wo();
    };
    return window.addEventListener("mouseup", a), () => {
      window.removeEventListener("mouseup", a);
    };
  }, [Bn, wo]), o.useEffect(() => {
    const a = (p) => {
      Be.current && (p.key === "Enter" ? (p.preventDefault(), Ht && Ht(Be.current, st.current ?? void 0, it.current ?? void 0), Be.current = null, st.current = null, it.current = null, Qe.current = null, Ft((m) => m + 1), Ye(!1)) : (p.key === "Escape" || p.key === "Backspace") && (p.preventDefault(), Be.current = null, st.current = null, it.current = null, Qe.current = null, Ft((m) => m + 1), Ye(!1)));
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [Ht, Ut]), o.useEffect(() => {
    const a = (p) => {
      if (!kt || !r || !le) return;
      const m = p.target?.tagName;
      if (!(m === "INPUT" || m === "TEXTAREA" || m === "SELECT"))
        if (p.key === "Backspace" || p.key === "Delete") {
          p.preventDefault();
          const v = kt.startsWith("sp-") ? kt.replace("sp-", "") : kt.startsWith("movingAverages__") ? "movingAverages" : kt, h = r[v];
          h && le({ ...r, [v]: { ...h, enabled: !1 } }), ce(null);
        } else p.key === "Escape" && ce(null);
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [kt, r, le]);
  const Ca = o.useCallback(() => {
    ft.current && clearTimeout(ft.current), ft.current = setTimeout(() => {
      if (Jt.current) return;
      $t.current = null, xt.current = null, tl.current = null;
      const a = Xe.current, p = a?.getContext("2d");
      p && a && p.clearRect(0, 0, a.width, a.height), Dn.current && Dn.current(), il(), nl(!1), io(!1), Q && Q(null, null);
    }, 50);
  }, [Q, il]);
  o.useEffect(() => {
    if (!Jo && !er) return;
    const a = (v) => {
      const e = (ss.current.y - v.clientY) / 150, F = Math.max(0.1, Math.min(10, ss.current.scale + e));
      gn.current = F, Ye(!0), pt(), Xn.current && clearTimeout(Xn.current), Xn.current = setTimeout(() => {
        Ot(gn.current);
      }, 100);
    }, p = () => {
      io(!1), Jr(!1), Ot(gn.current), pt();
    }, m = (v) => {
      if (v.touches.length !== 1) return;
      v.preventDefault();
      const e = (ss.current.y - v.touches[0].clientY) / 150, F = Math.max(0.1, Math.min(10, ss.current.scale + e));
      gn.current = F, Ye(!0), pt(), Xn.current && clearTimeout(Xn.current), Xn.current = setTimeout(() => {
        Ot(gn.current);
      }, 100);
    };
    return window.addEventListener("mousemove", a), window.addEventListener("mouseup", p), window.addEventListener("touchmove", m, { passive: !1 }), window.addEventListener("touchend", p), window.addEventListener("touchcancel", p), () => {
      window.removeEventListener("mousemove", a), window.removeEventListener("mouseup", p), window.removeEventListener("touchmove", m), window.removeEventListener("touchend", p), window.removeEventListener("touchcancel", p);
    };
  }, [Jo, er, pt]);
  const Ia = o.useCallback((a) => {
    if (a.preventDefault(), a.touches.length === 1) {
      const p = a.touches[0], m = Xe.current;
      if (!m) return;
      const v = m.getBoundingClientRect(), h = p.clientX - v.left, e = p.clientY - v.top;
      if (ol.current = { x: h, y: e }, ot.current && (clearTimeout(ot.current), ot.current = null), jn) {
        sl(!1), $t.current = null;
        const O = m.getContext("2d");
        O && O.clearRect(0, 0, m.width, m.height);
      }
      const F = Date.now();
      Mn.current = !0, Wl.current = F;
      const H = F - rl.current;
      if (rl.current = F, !(H < 300)) {
        const O = F;
        ot.current = setTimeout(() => {
          Wl.current === O && Mn.current && (sl(!0), $t.current = { x: h, y: e }, an.current !== null && cancelAnimationFrame(an.current), an.current = requestAnimationFrame(() => {
            At(), an.current = null;
          })), ot.current = null;
        }, 400);
      }
      if (Ue && Ue.length > 0) {
        Ql.current = Date.now();
        const O = sn.current, b = on.current;
        if (O && O.range > 0 && b > 0) {
          const w = O.max - e / b * O.range, A = O.range * 0.015;
          if (Be.current) {
            const u = Ue.find((N) => N.id === Be.current);
            if (u) {
              const N = (O.max - u.price) / O.range * b, x = 22, V = Math.min(N + 10, b - x - 4), d = 5, M = ie.width - We, oe = 45, Ne = 55, Z = 44, Le = oe + Ne + Z + d * 2, ye = (M - Le) / 2, He = ye + oe + d, Ee = He + Ne + d, re = 12;
              if (h >= ye - re && h <= ye + oe + re && e >= V - re && e <= V + x + re) {
                Ht && Ht(Be.current, st.current ?? void 0, it.current ?? void 0), Be.current = null, st.current = null, it.current = null, Qe.current = null, Ft((ke) => ke + 1), Ye(!1);
                return;
              }
              if (h >= He - re && h <= He + Ne + re && e >= V - re && e <= V + x + re) {
                Be.current = null, st.current = null, it.current = null, Qe.current = null, Ft((ke) => ke + 1), Ye(!1);
                return;
              }
              if (h >= Ee - re && h <= Ee + Z + re && e >= V - re && e <= V + x + re) {
                Ut && Ut(Be.current), Be.current = null, st.current = null, it.current = null, Qe.current = null, Ft((ke) => ke + 1), Ye(!1);
                return;
              }
            }
          }
          if (Be.current) {
            const u = Ue.find((N) => N.id === Be.current);
            if (u) {
              const N = u.side === "buy", x = Zn(u.price), V = st.current ?? u.stopLoss ?? (N ? u.price - x : u.price + x), d = it.current ?? u.takeProfit ?? (N ? u.price + x : u.price - x);
              if (Math.abs(w - V) < A) {
                Qe.current = "sl", st.current = V, ot.current && (clearTimeout(ot.current), ot.current = null);
                return;
              }
              if (Math.abs(w - d) < A) {
                Qe.current = "tp", it.current = d, ot.current && (clearTimeout(ot.current), ot.current = null);
                return;
              }
            }
          }
          let X = null;
          for (const u of Ue) {
            const N = (O.max - u.price) / O.range * b;
            if (h <= 160 && Math.abs(e - N) < 20) {
              X = u.id;
              break;
            }
          }
          if (X) {
            if (Be.current === X)
              Be.current = null, st.current = null, it.current = null;
            else {
              Be.current = X;
              const u = Ue.find((N) => N.id === X);
              st.current = u?.stopLoss ?? null, it.current = u?.takeProfit ?? null;
            }
            Qe.current = null, ot.current && (clearTimeout(ot.current), ot.current = null), Ft((u) => u + 1), Ye(!1);
            return;
          }
        }
      }
      nl(!0), ls({ x: h, y: e, startIndex: se.startIndex, priceOffset: Re });
    }
  }, [se.startIndex, Re, At, jn]), Ds = o.useRef(null), pr = o.useCallback((a) => {
    if (a.touches.length === 2) {
      a.preventDefault();
      const p = a.touches[0], m = a.touches[1], v = Math.hypot(
        m.clientX - p.clientX,
        m.clientY - p.clientY
      );
      if (Ds.current !== null) {
        const h = Te.current.candleWidth, e = Te.current.startIndex, H = 1 + (v / Ds.current - 1) * 1.3, K = Math.max(
          Es,
          Math.min(As, h * H)
        ), O = Xe.current;
        if (O) {
          const b = O.getBoundingClientRect(), w = (p.clientX + m.clientX) / 2 - b.left, A = h * (1 + De), X = K * (1 + De), u = e + w / A, N = Math.max(0, u - w / X);
          Te.current = { startIndex: N, candleWidth: K }, Ye(!0), pt(), nt.current || It(!0);
        }
      }
      Ds.current = v;
    }
  }, [pt]), Ta = o.useCallback((a) => {
    if (a.touches.length === 2) {
      pr(a), ot.current && (clearTimeout(ot.current), ot.current = null);
      return;
    }
    if (a.touches.length === 1) {
      const p = a.touches[0], m = Xe.current;
      if (!m) return;
      const v = m.getBoundingClientRect(), h = p.clientX - v.left, e = p.clientY - v.top;
      if (ot.current && ol.current) {
        const F = Math.abs(h - ol.current.x), H = Math.abs(e - ol.current.y);
        (F > 10 || H > 10) && (clearTimeout(ot.current), ot.current = null);
      }
      if (jn && ($t.current = { x: h, y: e }, an.current !== null && cancelAnimationFrame(an.current), an.current = requestAnimationFrame(() => {
        At(), an.current = null;
      })), Qe.current) {
        a.preventDefault();
        const F = sn.current, H = on.current;
        if (F && F.range > 0 && H > 0) {
          const K = F.max - e / H * F.range;
          Qe.current === "sl" ? st.current = K : it.current = K, bn.current === null && (bn.current = requestAnimationFrame(() => {
            Ye(!1), bn.current = null;
          }));
        }
        return;
      }
      if (Bn && !jn) {
        a.preventDefault(), It(!0);
        const F = h - pn.x, H = e - pn.y, K = se.candleWidth * (1 + De), O = F / K, b = Math.max(
          0,
          Math.min(l.length - 10, pn.startIndex - O)
        );
        if (al && Ge !== null) {
          const w = Ge / gn.current / (ie.height - gt), A = H * w;
          Vn.current = pn.priceOffset + A;
        }
        Te.current = {
          startIndex: b,
          candleWidth: se.candleWidth
        }, mn.current === null && (mn.current = requestAnimationFrame(() => {
          Ye(!0), pt(), mn.current = null;
        }));
      }
    }
  }, [Bn, pn, se.candleWidth, l.length, pr, At, jn, al, Ge, ie.height, Ue]), ja = o.useCallback(() => {
    if (Mn.current = !1, Wl.current = 0, ot.current && (clearTimeout(ot.current), ot.current = null), Qe.current && Be.current) {
      Qe.current = null, Ye(!1), Mn.current = !1, Wl.current = 0, ot.current && (clearTimeout(ot.current), ot.current = null);
      return;
    }
    if (jn) {
      sl(!1), $t.current = null;
      const a = Xe.current, p = a?.getContext("2d");
      p && a && p.clearRect(0, 0, a.width, a.height), Q && Q(null, null);
    }
    if (nt.current) {
      It(!1);
      const a = Te.current;
      if (Ye(!1), _e) {
        const p = ie.width - We, m = se.candleWidth * (1 + De), v = Math.floor(p / m), h = a.startIndex + v, e = l.length - 1 < h;
        $n.current = !e;
      }
      Et((p) => ({
        ...p,
        startIndex: a.startIndex,
        // Keep float precision - no rounding
        candleWidth: a.candleWidth,
        // Pick up pinch-zoom final width
        autoFollowLatest: !1
      })), al && Tt(Vn.current);
    }
    nl(!1), Ds.current = null, ol.current = null, ao.current = null, mn.current !== null && (cancelAnimationFrame(mn.current), mn.current = null);
  }, [jn, Q, al]);
  o.useCallback((a) => {
    let p = cl[0], m = Math.abs(a - p);
    for (const v of cl) {
      const h = Math.abs(a - v);
      h < m && (m = h, p = v);
    }
    return p;
  }, [cl]);
  const So = o.useCallback((a, p) => {
    const m = cl.findIndex((v) => v >= a - 1e-3);
    if (p) {
      const v = Math.min(cl.length - 1, m + 1);
      return cl[v];
    } else {
      const v = Math.max(0, m - 1);
      return cl[v];
    }
  }, [cl]), Co = o.useCallback((a) => {
    const p = a.ctrlKey || a.metaKey;
    if (!vo.current && !p) {
      const x = Math.abs(a.deltaX) > Math.abs(a.deltaY), V = a.shiftKey && a.deltaY !== 0;
      if (x || V) {
        a.preventDefault();
        const d = Te.current.startIndex, M = Te.current.candleWidth, oe = M * (1 + De);
        It(!0);
        const Ne = V ? a.deltaY : a.deltaX, Z = 0.2 + (as - 1) * 0.2, Le = Ne * Z / oe, q = Math.max(
          0,
          Math.min(l.length - 10, d + Le)
        );
        Te.current = { startIndex: q, candleWidth: M }, mt.current && clearTimeout(mt.current), mt.current = setTimeout(() => {
          if (_e) {
            const He = ie.width - We, Ee = Te.current.candleWidth * (1 + De), re = Math.floor(He / Ee), ke = Te.current.startIndex + re;
            $n.current = !(l.length - 1 < ke);
          }
          const ye = Te.current;
          Et((He) => ({
            ...He,
            startIndex: ye.startIndex,
            autoFollowLatest: !1
          })), It(!1);
        }, 150), Pt.current === null && (Pt.current = requestAnimationFrame(() => {
          Ye(!0), At(), pt(), Pt.current = null;
        }));
        return;
      }
    }
    a.preventDefault(), It(!0);
    const m = Xe.current;
    if (!m) return;
    const v = m.getBoundingClientRect(), h = a.clientX - v.left, e = a.clientY - v.top;
    $t.current = { x: h, y: e };
    const F = Te.current.startIndex, H = Te.current.candleWidth, K = H * (1 + De);
    if (Math.abs(a.deltaX) > Math.abs(a.deltaY) || a.shiftKey) {
      const x = a.shiftKey ? a.deltaY : a.deltaX, V = vo.current ? 0.02 + (as - 1) * 0.02 : 0.2 + (as - 1) * 0.2, d = x * V / K, M = Math.max(
        0,
        Math.min(l.length - 10, F + d)
      );
      Te.current = { startIndex: M, candleWidth: H }, Pt.current === null && (Pt.current = requestAnimationFrame(() => {
        Ye(!0), At(), pt(), Pt.current = null;
      })), mt.current && clearTimeout(mt.current), mt.current = setTimeout(() => {
        if (_e) {
          const Ne = ie.width - We, Z = Te.current.candleWidth * (1 + De), Le = Math.floor(Ne / Z), q = Te.current.startIndex + Le;
          $n.current = !(l.length - 1 < q);
        }
        const oe = Te.current;
        Et((Ne) => ({
          ...Ne,
          startIndex: oe.startIndex,
          // Keep float precision - no rounding
          autoFollowLatest: !1
        })), It(!1);
      }, 150);
      return;
    }
    if (vo.current) {
      ll.current += a.deltaY, kl.current && clearTimeout(kl.current), kl.current = setTimeout(() => {
        ll.current = 0;
      }, 200);
      const x = 220 - as * 20;
      if (Math.abs(ll.current) < x)
        return;
      const V = ll.current < 0;
      ll.current = 0;
      const d = So(H, V);
      if (d === H) return;
      const M = ie.width - We, oe = H * (1 + De), Ne = d * (1 + De), Z = F + M / oe, Le = Math.max(0, Z - M / Ne);
      It(!0), Te.current = { startIndex: Le, candleWidth: d }, Pt.current === null && (Pt.current = requestAnimationFrame(() => {
        Ye(!0), At(), pt(), Pt.current = null;
      })), mt.current && clearTimeout(mt.current), mt.current = setTimeout(() => {
        const q = Te.current;
        Et((ye) => ({
          ...ye,
          candleWidth: q.candleWidth,
          startIndex: q.startIndex,
          // Keep float precision
          autoFollowLatest: !1
        })), It(!1);
      }, 100);
      return;
    }
    const O = a.deltaY < 0, b = So(H, O);
    if (b === H) return;
    const w = ie.width - We, A = H * (1 + De), X = b * (1 + De), u = F + w / A, N = Math.max(0, u - w / X);
    It(!0), Te.current = { startIndex: N, candleWidth: b }, Pt.current === null && (Pt.current = requestAnimationFrame(() => {
      Ye(!0), At(), pt(), Pt.current = null;
    })), mt.current && clearTimeout(mt.current), mt.current = setTimeout(() => {
      const x = Te.current;
      Et((V) => ({
        ...V,
        candleWidth: x.candleWidth,
        startIndex: x.startIndex,
        // Keep float precision
        autoFollowLatest: !1
      })), It(!1);
    }, 100);
  }, [l.length, At, So, ie.width, ie.height, as, Xt, Pn, n, Sl, se.autoFollowLatest, pt]), xr = o.useRef(Co), mr = o.useRef(ko);
  o.useEffect(() => {
    xr.current = Co;
  }, [Co]), o.useEffect(() => {
    mr.current = ko;
  }, [ko]);
  const Ma = o.useRef(null), ul = o.useRef(null), dl = o.useRef(null), Ra = o.useCallback((a) => {
    if (ul.current && (ul.current.el.removeEventListener("wheel", ul.current.fn), ul.current = null), Xe.current = a, a) {
      const p = (m) => xr.current(m);
      a.addEventListener("wheel", p, { passive: !1 }), ul.current = { el: a, fn: p };
    }
  }, []), Pa = o.useCallback((a) => {
    if (dl.current && (dl.current.el.removeEventListener("wheel", dl.current.fn), dl.current = null), Ma.current = a, a) {
      const p = (m) => mr.current(m);
      a.addEventListener("wheel", p, { passive: !1 }), dl.current = { el: a, fn: p };
    }
  }, []);
  o.useEffect(() => () => {
    ul.current && ul.current.el.removeEventListener("wheel", ul.current.fn), dl.current && dl.current.el.removeEventListener("wheel", dl.current.fn);
  }, []), o.useLayoutEffect(() => {
    const a = js.current;
    if (!a) return;
    const p = a.getBoundingClientRect();
    p.width > 0 && p.height > 0 && Gn({ width: Math.round(p.width), height: Math.round(p.height) });
    const m = new ResizeObserver((v) => {
      for (const h of v) {
        const e = Math.round(h.contentRect.width), F = Math.round(h.contentRect.height);
        e > 0 && F > 0 && Ar.flushSync(() => {
          Gn(
            (H) => H.width === e && H.height === F ? H : { width: e, height: F }
          );
        });
      }
    });
    return m.observe(a), () => m.disconnect();
  }, []), o.useEffect(() => {
    wt && wt.width > 0 && wt.height > 0 && Gn(wt);
  }, [wt]);
  const br = o.useRef(`${f}|${nn}`);
  o.useLayoutEffect(() => {
    const a = `${f}|${nn}`;
    br.current !== a && (br.current = a, !_e && Et((p) => p.autoFollowLatest ? p : { ...p, autoFollowLatest: !0 }));
  }, [f, nn, _e]), o.useLayoutEffect(() => {
    if (l.length === 0) return;
    if (_e) {
      const e = Bl.current, F = ie.width - We, H = se.candleWidth * (1 + De), K = Math.floor(F / H), O = Math.floor(K * 0.9), w = gl.current <= 300 && ie.width > 300;
      if (gl.current = ie.width, l.length !== e || e === 0 || w) {
        const A = e > 0 && l.length < e, X = Math.max(0, Math.floor(se.startIndex)), u = Math.min(l.length, X + K), N = l.length - 1 < u;
        if (e === 0 || A || w || N && !$n.current) {
          const x = Math.max(0, l.length - 1 - O);
          Et((V) => ({ ...V, startIndex: x, autoFollowLatest: !1 })), A && ($n.current = !1);
        }
      }
      Bl.current = l.length;
      return;
    }
    if (!se.autoFollowLatest) {
      if (se.startIndex > l.length - 1) {
        const e = ie.width - We, F = se.candleWidth * (1 + De), H = Math.max(1, Math.floor(e / F));
        Et((K) => ({ ...K, startIndex: Math.max(0, l.length - H) }));
      }
      return;
    }
    const a = ie.width - We, p = se.candleWidth * (1 + De), m = Math.floor(a / p);
    if (l.length > 0 && l.length < m * 0.75) {
      const e = Math.min(
        As,
        a * 0.92 / (l.length * (1 + De))
      );
      if (e > se.candleWidth * 1.05) {
        Te.current = { startIndex: 0, candleWidth: e }, Et((F) => ({ ...F, startIndex: 0, candleWidth: e })), Bl.current = l.length;
        return;
      }
    }
    const v = Math.min(se.futureSpace, Math.floor(m * 0.3)), h = Math.max(0, l.length - m + v);
    Et((e) => ({ ...e, startIndex: h })), Bl.current = l.length;
  }, [l.length, ie.width, se.autoFollowLatest, se.candleWidth, se.futureSpace, se.startIndex, _e]), o.useLayoutEffect(() => {
    const a = bl - In.current;
    a !== 0 && (Et((p) => ({
      ...p,
      startIndex: Math.max(0, p.startIndex + a)
    })), Te.current.startIndex = Math.max(0, Te.current.startIndex + a), _n.current.startIndex = Math.max(0, _n.current.startIndex + a)), In.current = bl;
  }, [bl]), o.useEffect(() => {
    if (Ce == null) {
      ns.current = void 0;
      return;
    }
    if (l.length === 0 || ns.current === Ce) return;
    ns.current = Ce;
    const a = ie.width - We, p = se.candleWidth * (1 + De), m = Math.floor(a / p), v = Math.min(Ce, l.length - 1), h = Math.floor(m * 0.9), e = Math.max(0, v - h);
    Et((F) => ({ ...F, startIndex: e, autoFollowLatest: !1 }));
  }, [Ce, l.length, ie.width, se.candleWidth]), o.useEffect(() => {
    !nt.current && !Ts && il();
  }, [il, Ts]);
  const Io = o.useRef(0), us = o.useRef(null);
  o.useEffect(() => {
    if (n == null || nt.current) return;
    const a = Date.now(), p = a - Io.current;
    return p >= 50 ? (Io.current = a, il()) : (us.current && clearTimeout(us.current), us.current = setTimeout(() => {
      Io.current = Date.now(), il();
    }, 50 - p)), () => {
      us.current && clearTimeout(us.current);
    };
  }, [n, il]), o.useEffect(() => {
    At();
  }, [At]), o.useEffect(() => {
    Ll.current = ne, ne != null && (ql.current = !0, requestAnimationFrame(() => {
      At(), ql.current = !1;
    }));
  }, [ne, At]);
  const Bs = o.useRef(/* @__PURE__ */ new Map()), gr = o.useMemo(() => {
    if (nt.current && Bs.current.size > 0 && l.length === Bs.current.size)
      return Bs.current;
    const a = /* @__PURE__ */ new Map();
    for (let p = 0; p < l.length; p++)
      a.set(l[p].time, p);
    return Bs.current = a, a;
  }, [l]), Ws = o.useCallback(() => {
    if (!Pe) return;
    const a = Pn();
    Sl(a.candles, se.autoFollowLatest);
    const p = l.length > 0 ? l[l.length - 1] : null, m = l.length >= 2 ? l[l.length - 2] : null, v = p && m ? p.time - m.time : 6e4;
    Pe({
      priceAxisWidth: We,
      timeToX: (h) => {
        const e = nt.current ? _n.current.startIndex : se.startIndex, H = (nt.current ? _n.current.candleWidth : se.candleWidth) * (1 + De), K = Math.floor(e), O = (e - K) * H;
        let b = gr.get(h) ?? -1;
        if (b === -1 && l.length > 0) {
          const w = l[0], A = l[l.length - 1];
          if (h > A.time) {
            const X = h - A.time;
            b = l.length - 1 + Math.round(X / v);
          } else if (h < w.time) {
            const X = w.time - h;
            b = -Math.round(X / v);
          } else {
            let X = 0, u = l.length - 1;
            for (; X < u; ) {
              const N = Math.floor((X + u) / 2);
              l[N].time < h ? X = N + 1 : u = N;
            }
            if (X > 0) {
              const N = l[X - 1], x = l[X], V = (h - N.time) / (x.time - N.time);
              return (X - 1 + V - K) * H + H / 2 - O;
            }
            b = X;
          }
        }
        return b === -1 ? null : (b - K) * H + H / 2 - O;
      },
      xToTime: (h) => {
        const e = nt.current ? _n.current.startIndex : se.startIndex, H = (nt.current ? _n.current.candleWidth : se.candleWidth) * (1 + De), K = Math.floor(e), O = (e - K) * H, b = h + O, w = K + (b - H / 2) / H;
        if (w < 0) return null;
        const A = Math.floor(w), X = w - A;
        if (A >= l.length) {
          if (p) {
            const N = w - (l.length - 1);
            return p.time + N * v;
          }
          return null;
        }
        const u = l[A];
        if (!u) return null;
        if (X > 0 && A + 1 < l.length) {
          const N = l[A + 1];
          return u.time + X * (N.time - u.time);
        }
        return u.time + X * v;
      },
      priceToY: (h) => {
        let e = sn.current, F = on.current;
        if (!e || F === 0) {
          const H = ie.width - We, K = Te.current, O = K.candleWidth * (1 + De), b = Math.floor(H / O), w = Math.max(0, Math.floor(K.startIndex)), A = Math.min(l.length, w + b), X = l.slice(w, A);
          let u = 1 / 0, N = -1 / 0;
          if (X.length === 0)
            u = 0, N = 100;
          else {
            for (const Ee of X)
              Ee.low < u && (u = Ee.low), Ee.high > N && (N = Ee.high);
            n && (n < u && (u = n), n > N && (N = n));
          }
          const x = N - u, V = x * 0.05, d = (N + u) / 2, M = x + V * 2;
          e = {
            min: d - M / 2,
            max: d + M / 2,
            range: M
          };
          const oe = r?.rsi?.enabled, Ne = r?.macd?.enabled, Z = r?.atr?.enabled, Le = r?.stochastic?.enabled;
          r?.volume?.enabled && l.some((Ee) => Ee.volume !== void 0 && Ee.volume > 0);
          const q = (oe ? 1 : 0) + (Ne ? 1 : 0) + (Z ? 1 : 0) + (Le ? 1 : 0), ye = ie.height - gt, He = q > 0 ? Math.max(60 * q, ye * de) : 0;
          F = ye - He;
        }
        if (Xt !== null && Ge !== null) {
          const H = gn.current, K = Vn.current, O = Ge / H, b = Xt + K;
          e = {
            min: b - O / 2,
            max: b + O / 2,
            range: O
          };
        }
        return F - (h - e.min) / e.range * F;
      },
      yToPrice: (h) => {
        let e = sn.current, F = on.current;
        if (!e || F === 0) {
          const H = ie.width - We, K = Te.current, O = K.candleWidth * (1 + De), b = Math.floor(H / O), w = Math.max(0, Math.floor(K.startIndex)), A = Math.min(l.length, w + b), X = l.slice(w, A);
          let u = 1 / 0, N = -1 / 0;
          if (X.length === 0)
            u = 0, N = 100;
          else {
            for (const Ee of X)
              Ee.low < u && (u = Ee.low), Ee.high > N && (N = Ee.high);
            n && (n < u && (u = n), n > N && (N = n));
          }
          const x = N - u, V = x * 0.05, d = (N + u) / 2, M = x + V * 2;
          e = {
            min: d - M / 2,
            max: d + M / 2,
            range: M
          };
          const oe = r?.rsi?.enabled, Ne = r?.macd?.enabled, Z = r?.atr?.enabled, Le = r?.stochastic?.enabled;
          r?.volume?.enabled && l.some((Ee) => Ee.volume !== void 0 && Ee.volume > 0);
          const q = (oe ? 1 : 0) + (Ne ? 1 : 0) + (Z ? 1 : 0) + (Le ? 1 : 0), ye = ie.height - gt, He = q > 0 ? Math.max(60 * q, ye * de) : 0;
          F = ye - He;
        }
        if (Xt !== null && Ge !== null) {
          const H = gn.current, K = Vn.current, O = Ge / H, b = Xt + K;
          e = {
            min: b - O / 2,
            max: b + O / 2,
            range: O
          };
        }
        return e.max - h / F * e.range;
      }
    });
  }, [l, se, ie, Pe, r, de, n, Xt, Ge, gr]);
  o.useEffect(() => {
    ts.current = Ws;
  }, [Ws]), o.useLayoutEffect(() => {
    Ws();
  }, [Ws]);
  const To = [
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
  ].filter(Boolean).length + (s?.customIndicators?.filter((a) => a.display === "subplot").length || 0), Na = To > 0, vr = ie.height - gt, La = To > 0 ? Math.max(60 * To, vr * de) : 0, yr = vr - La, kr = o.useCallback((a) => {
    a.preventDefault(), a.stopPropagation(), Zt(!0);
    const p = "touches" in a ? a.touches[0].clientY : a.clientY;
    rt.current = { y: p, ratio: de };
  }, [de]);
  o.useEffect(() => {
    if (!yt) return;
    const a = (m) => {
      const v = "touches" in m ? m.touches[0].clientY : m.clientY, e = (rt.current.y - v) / (ie.height - gt), F = Math.max(0.1, Math.min(0.6, rt.current.ratio + e));
      je(F);
    }, p = () => {
      Zt(!1);
    };
    return window.addEventListener("mousemove", a), window.addEventListener("mouseup", p), window.addEventListener("touchmove", a), window.addEventListener("touchend", p), () => {
      window.removeEventListener("mousemove", a), window.removeEventListener("mouseup", p), window.removeEventListener("touchmove", a), window.removeEventListener("touchend", p);
    };
  }, [yt, ie.height]);
  const Fs = (a) => {
    const { kind: p, label: m, menuKey: v, engineLabel: h, ciId: e, sid: F, remove: H } = a, K = "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground transition-colors", O = () => {
      p !== "formula" || !e || !le || (le({
        ...r,
        customIndicators: (r.customIndicators || []).map((A) => A.id === e ? { ...A, enabled: !1 } : A)
      }), fe(null), ce(null));
    }, b = (A) => {
      A.stopPropagation(), bt({
        visible: !0,
        x: A.clientX,
        y: A.clientY,
        key: v,
        title: m,
        custom: p === "engine" ? { kind: p, label: h || m } : p === "formula" ? { kind: p, ciId: e } : { kind: p, sid: F }
      });
    }, w = p === "engine" && !!Oe && !!h || p === "formula" && !!Sn;
    return /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
      p === "formula" && /* @__PURE__ */ t.jsx("button", { onClick: (A) => {
        A.stopPropagation(), O();
      }, className: `${K} hover:text-foreground`, title: `Hide ${m}`, children: /* @__PURE__ */ t.jsx(Us, { className: "w-[15px] h-[15px]" }) }),
      w && /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: (A) => {
            A.stopPropagation(), p === "engine" ? Oe?.(h) : Sn?.();
          },
          className: `${K} hover:text-foreground`,
          title: `${m} Settings`,
          children: /* @__PURE__ */ t.jsx(qs, { className: "w-[15px] h-[15px]" })
        }
      ),
      /* @__PURE__ */ t.jsx("button", { onClick: (A) => {
        A.stopPropagation(), H();
      }, className: `${K} hover:text-destructive`, title: `Remove ${m}`, children: /* @__PURE__ */ t.jsx(Gs, { className: "w-[15px] h-[15px]" }) }),
      /* @__PURE__ */ t.jsx("button", { onClick: b, className: `${K} hover:text-foreground`, title: "More options", children: /* @__PURE__ */ t.jsx(Zs, { className: "w-[15px] h-[15px]" }) })
    ] });
  };
  return /* @__PURE__ */ t.jsxs(
    "div",
    {
      ref: js,
      className: "relative w-full h-full select-none",
      style: {
        backgroundColor: J.background,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none"
      },
      children: [
        /* @__PURE__ */ t.jsx(
          "canvas",
          {
            ref: Ms,
            width: ie.width * dn,
            height: ie.height * dn,
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
            width: ie.width * dn,
            height: ie.height * dn,
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
              if (!r || !s) return;
              const p = Xe.current;
              if (!p) return;
              const m = p.getBoundingClientRect(), v = a.clientX - m.left, h = a.clientY - m.top, e = Qt.current, F = (d) => !!d && h >= d.top && h <= d.bottom, H = r?.customBrueScripts || {}, K = (d, M) => {
                ce(`script-${d}`), bt({
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
                if (!M?.enabled || !s?.[d] || !F(e[d])) continue;
                a.preventDefault(), a.stopPropagation();
                const oe = M.sourceScriptId;
                if (oe && H[oe]?.enabled) {
                  K(oe, zs(d));
                  return;
                }
                ce(`sp-${d}`), bt({
                  visible: !0,
                  x: a.clientX,
                  y: a.clientY,
                  key: d,
                  title: zs(d)
                });
                return;
              }
              for (const d of r.customIndicators || []) {
                if (!d.enabled || d.display !== "subplot" || !F(e[`custom_${d.id}`])) continue;
                a.preventDefault(), a.stopPropagation();
                const M = typeof d.expression == "string" ? d.expression : "";
                if (M.startsWith("brue:") && d.scriptId)
                  K(d.scriptId, d.name || "Brue script");
                else if (M.startsWith("local:")) {
                  const oe = d.group || M.split(":")[1] || d.name;
                  ce(`ci-${d.id}`), bt({
                    visible: !0,
                    x: a.clientX,
                    y: a.clientY,
                    key: `custom_${d.id}`,
                    title: oe || "Indicator",
                    custom: { kind: "engine", label: oe }
                  });
                } else
                  ce(`ci-${d.id}`), bt({
                    visible: !0,
                    x: a.clientX,
                    y: a.clientY,
                    key: `custom_${d.id}`,
                    title: d.name || "Custom indicator",
                    custom: { kind: "formula", ciId: d.id }
                  });
                return;
              }
              const O = sn.current, b = on.current;
              if (!O || b <= 0) return;
              const w = Te.current, A = w.candleWidth * (1 + De), u = Math.max(0, Math.floor(w.startIndex)) + Math.round(v / A), N = 8, x = (d) => {
                if (isNaN(d) || !isFinite(d)) return !1;
                const M = b - (d - O.min) / O.range * b;
                return Math.abs(h - M) < N;
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
                  a.preventDefault(), a.stopPropagation(), ce(d.key), bt({ visible: !0, x: a.clientX, y: a.clientY, key: d.key, title: d.title });
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
              left: Yn ? (tr || 295) + 6 : 6,
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
                    ea(!Yn);
                  },
                  className: "flex items-center justify-center w-4 h-4 rounded transition-all duration-200",
                  style: { background: "rgba(128, 128, 128, 0.3)" },
                  title: Yn ? "Hide OHLC" : "Show OHLC",
                  children: Yn ? /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", className: "w-2.5 h-2.5", fill: "none", stroke: "#9ca3af", strokeWidth: "3", strokeLinecap: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M10 4L5 8L10 12" }) }) : /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", className: "w-2.5 h-2.5", fill: "none", stroke: "#9ca3af", strokeWidth: "3", strokeLinecap: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M6 4L11 8L6 12" }) })
                }
              ),
              Yn && f && (() => {
                const a = /* @__PURE__ */ new Date(), p = Au(f), m = Gr(f);
                let v = "", h = "", e = 0, F = 0, H = !1, K = m ? "#22c55e" : "#ef4444", O = m ? "Market open" : "Market closed", b = "Real time";
                const w = Du(a), A = w.hours * 60 + w.minutes, X = w.day, u = w.isBST, N = u ? "BST (UTC+1)" : "GMT (UTC+0)", x = String(w.hours).padStart(2, "0"), V = String(w.minutes).padStart(2, "0"), d = Bu(f);
                if (p === "crypto")
                  H = !0, v = "24/7", h = "Always open", K = "#22c55e", O = "Market open";
                else if (p === "forex")
                  H = !0, v = u ? "Sun 10 PM – Fri 10 PM BST" : "Sun 10 PM – Fri 10 PM GMT", h = N, m || (O = "Weekend — market closed");
                else if (p === "stock" && d) {
                  const re = Ks(d);
                  e = re.openHour * 60 + re.openMinute, F = re.closeHour * 60 + re.closeMinute;
                  const ke = String(re.openHour).padStart(2, "0"), Ke = re.openMinute === 0 ? "00" : String(re.openMinute).padStart(2, "0"), Fe = String(re.closeHour).padStart(2, "0"), Dt = re.closeMinute === 0 ? "00" : String(re.closeMinute).padStart(2, "0");
                  if (v = `${ke}:${Ke} – ${Fe}:${Dt} ${re.tzLabel}`, h = `${re.exchange} (${re.tzLabel})`, re.lunchBreak) {
                    const vn = `${String(re.lunchBreak.startHour).padStart(2, "0")}:${String(re.lunchBreak.startMinute).padStart(2, "0")}`, Yt = `${String(re.lunchBreak.endHour).padStart(2, "0")}:${String(re.lunchBreak.endMinute).padStart(2, "0")}`;
                    v += ` (break ${vn}–${Yt})`;
                  }
                } else if (p === "stock") {
                  e = 14 * 60 + 30, F = 21 * 60, Wu(a) && (F = 18 * 60, K = m ? "#f59e0b" : "#ef4444", O = m ? "Early close today" : "Market closed");
                  const re = Math.floor(e / 60), ke = Math.floor(F / 60), Ke = e % 60 === 0 ? ":00" : ":30", Fe = F % 60 === 0 ? ":00" : ":30";
                  v = `${re}${Ke} – ${ke}${Fe} ${u ? "BST" : "GMT"}`, h = `NYSE/NASDAQ (${N})`;
                } else if (p === "commodity" || p === "index") {
                  H = !0, v = u ? "Sun 11 PM – Fri 10 PM BST" : "Sun 11 PM – Fri 10 PM GMT", h = N;
                  const re = u ? 23 * 60 : 22 * 60, ke = u ? 24 * 60 : 23 * 60;
                  m && A >= re - 15 && A < re ? (O = "Closing soon — daily break", K = "#f59e0b") : !m && A >= re && A < ke && (O = "Daily maintenance break");
                }
                let M = "";
                if (!H && p === "stock") {
                  let re = A;
                  if (d)
                    try {
                      const ke = Ks(d), Fe = new Intl.DateTimeFormat("en-GB", { timeZone: ke.timezone, hour: "numeric", minute: "numeric", hour12: !1 }).formatToParts(a), Dt = parseInt(Fe.find((Yt) => Yt.type === "hour")?.value || "0"), vn = parseInt(Fe.find((Yt) => Yt.type === "minute")?.value || "0");
                      re = Dt * 60 + vn;
                    } catch {
                    }
                  if (m) {
                    const ke = F - re;
                    if (ke > 0) {
                      const Ke = Math.floor(ke / 60), Fe = ke % 60;
                      M = Ke > 0 ? `Closes in ${Ke}h ${Fe}m` : `Closes in ${Fe} minutes`;
                    }
                  } else {
                    const ke = d ? (() => {
                      try {
                        const Fe = new Intl.DateTimeFormat("en-GB", { timeZone: Ks(d).timezone, weekday: "short" }).formatToParts(a).find((Dt) => Dt.type === "weekday")?.value || "";
                        return { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5 }[Fe] || 0;
                      } catch {
                        return 0;
                      }
                    })() : X;
                    if (ke >= 1 && ke <= 5 && re < e) {
                      const Ke = e - re, Fe = Math.floor(Ke / 60), Dt = Ke % 60;
                      M = Fe > 0 ? `Opens in ${Fe}h ${Dt}m` : `Opens in ${Dt} minutes`;
                    }
                  }
                }
                let oe = 0;
                if (!H && m && F > e) {
                  let re = A;
                  if (d)
                    try {
                      const ke = Ks(d), Fe = new Intl.DateTimeFormat("en-GB", { timeZone: ke.timezone, hour: "numeric", minute: "numeric", hour12: !1 }).formatToParts(a), Dt = parseInt(Fe.find((Yt) => Yt.type === "hour")?.value || "0"), vn = parseInt(Fe.find((Yt) => Yt.type === "minute")?.value || "0");
                      re = Dt * 60 + vn;
                    } catch {
                    }
                  oe = Math.max(0, Math.min(1, (re - e) / (F - e)));
                }
                const Ne = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][X], Z = typeof document < "u" && document.documentElement.classList.contains("dark"), Le = Z ? "rgba(22, 25, 35, 0.98)" : "rgba(255, 255, 255, 0.98)", q = Z ? "rgba(55, 60, 75, 0.6)" : "rgba(210, 215, 225, 0.8)", ye = Z ? "#7b8094" : "#6b7280", He = Z ? "#a0a6b8" : "#374151", Ee = Z ? "#2a2e3a" : "#e5e7eb";
                return /* @__PURE__ */ t.jsxs(
                  "div",
                  {
                    ref: uo,
                    className: "relative",
                    children: [
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (re) => {
                            re.stopPropagation(), nr((ke) => !ke);
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
                      os && /* @__PURE__ */ t.jsxs(
                        "div",
                        {
                          style: {
                            position: "absolute",
                            top: "calc(100% + 4px)",
                            left: -40,
                            width: 260,
                            background: Le,
                            border: `1px solid ${q}`,
                            borderRadius: 10,
                            boxShadow: Z ? "0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)" : "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
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
                              M && /* @__PURE__ */ t.jsx("p", { style: { color: ye, fontSize: 12, margin: "4px 0 0 16px", lineHeight: 1.3 }, children: M })
                            ] }),
                            !H && p === "stock" && /* @__PURE__ */ t.jsxs("div", { style: { padding: "6px 16px 10px" }, children: [
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: ye, fontSize: 9, fontWeight: 700, letterSpacing: 1.2, fontFamily: '"SF Mono", Consolas, monospace' }, children: Ne }),
                                /* @__PURE__ */ t.jsx("div", { style: { flex: 1, height: 5, borderRadius: 3, background: Ee, overflow: "hidden", position: "relative" }, children: m && /* @__PURE__ */ t.jsx(
                                  "div",
                                  {
                                    style: {
                                      position: "absolute",
                                      left: 0,
                                      top: 0,
                                      height: "100%",
                                      width: `${oe * 100}%`,
                                      background: `linear-gradient(90deg, ${K}aa, ${K})`,
                                      borderRadius: 3,
                                      transition: "width 1s ease"
                                    }
                                  }
                                ) })
                              ] }),
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 10, color: ye, fontFamily: '"SF Mono", Consolas, monospace' }, children: [
                                /* @__PURE__ */ t.jsx("span", { children: v.split("–")[0]?.trim() }),
                                /* @__PURE__ */ t.jsx("span", { children: v.split("–")[1]?.trim() })
                              ] })
                            ] }),
                            /* @__PURE__ */ t.jsx("div", { style: { height: 1, background: q, margin: "0 12px" } }),
                            /* @__PURE__ */ t.jsxs("div", { style: { padding: "10px 16px 14px" }, children: [
                              h && /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: ye }, children: "Exchange timezone" }),
                                /* @__PURE__ */ t.jsx("span", { style: { color: He, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: h })
                              ] }),
                              v && p !== "stock" && /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: ye }, children: "Session" }),
                                /* @__PURE__ */ t.jsx("span", { style: { color: He, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: v })
                              ] }),
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: ye }, children: "Local time" }),
                                /* @__PURE__ */ t.jsxs("span", { style: { color: He, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: [
                                  x,
                                  ":",
                                  V,
                                  " ",
                                  u ? "BST" : "GMT"
                                ] })
                              ] }),
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: ye }, children: "Update frequency" }),
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
        Yn && r && le && (() => {
          const a = {
            bollinger: () => fo,
            movingAverages: () => po,
            vwap: () => xo,
            volumeProfile: () => mo,
            volume: () => bo
          }, p = Fu().map((b) => ({
            key: b,
            title: zs(b),
            enabledCheck: () => b === "volume" ? !!(r?.volume?.enabled && l.some((w) => w.volume)) : b === "volumeProfile" ? !!r?.volumeProfile?.enabled : !!(r?.[b]?.enabled && s?.[b]),
            endXSource: a[b] ?? (() => lt[b] || 0)
          })), m = Ae.toolbarLineHeight;
          let v = Ae.toolbarStartY;
          const h = [], e = r?.customBrueScripts || {};
          for (const b of p) {
            if (!b.enabledCheck()) continue;
            if (b.key !== "movingAverages") {
              const u = r?.[b.key]?.sourceScriptId;
              if (u && e[u]?.enabled) continue;
            }
            const w = _l.current[b.key] || b.endXSource() || 150;
            if (b.key === "movingAverages" && s?.movingAverages?.length > 0) {
              const u = r.movingAverages?.lines ?? [], N = r?.customBrueScripts || {};
              for (let x = 0; x < s.movingAverages.length; x++) {
                const V = u[x]?.sourceScriptId;
                if (V && N[V]?.enabled) continue;
                const d = `movingAverages__${x}`, M = v;
                v += m;
                const oe = kt === d, Ne = u[x], Z = Ne ? `${Ne.type} ${Ne.period}` : "MA", Le = () => {
                  const q = u.filter((ye, He) => He !== x);
                  le({
                    ...r,
                    movingAverages: {
                      ...r.movingAverages,
                      enabled: q.length > 0,
                      lines: q
                    }
                  }), fe(null), ce(null);
                };
                h.push(
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      className: "absolute z-20 flex items-center",
                      style: { left: 0, top: M - Ae.toolbarRowYOffset, height: m },
                      onMouseEnter: () => {
                        fe(d), Jt.current = !0, ft.current && clearTimeout(ft.current);
                      },
                      onMouseLeave: () => {
                        ft.current = setTimeout(() => {
                          fe((q) => q === d ? null : q), Jt.current = !1;
                        }, 150);
                      },
                      children: [
                        oe && /* @__PURE__ */ t.jsx(
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
                            onClick: (q) => {
                              q.stopPropagation(), ce((ye) => ye === d ? null : d), fe(d);
                            },
                            onContextMenu: (q) => {
                              q.preventDefault(), q.stopPropagation(), ce(d), bt({ visible: !0, x: q.clientX, y: q.clientY, key: d, title: Z });
                            }
                          }
                        ),
                        oe && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (q) => {
                                q.stopPropagation(), Le();
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                              title: `Hide ${Z}`,
                              children: /* @__PURE__ */ t.jsx(Us, { className: "w-[15px] h-[15px]" })
                            }
                          ),
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (q) => {
                                q.stopPropagation(), Hl({ type: "movingAverages", position: { x: w, y: M } });
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                              title: `${Z} Settings`,
                              children: /* @__PURE__ */ t.jsx(qs, { className: "w-[15px] h-[15px]" })
                            }
                          ),
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (q) => {
                                q.stopPropagation(), Le();
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors",
                              title: `Remove ${Z}`,
                              children: /* @__PURE__ */ t.jsx(Gs, { className: "w-[15px] h-[15px]" })
                            }
                          ),
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (q) => {
                                q.stopPropagation(), ce(d), bt({ visible: !0, x: q.clientX, y: q.clientY, key: d, title: Z });
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                              title: "More options",
                              children: /* @__PURE__ */ t.jsx(Zs, { className: "w-[15px] h-[15px]" })
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
            const X = kt === b.key;
            X || b.key, h.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: {
                    left: 0,
                    top: A - Ae.toolbarRowYOffset,
                    height: m
                  },
                  onMouseEnter: () => {
                    fe(b.key), Jt.current = !0, ft.current && clearTimeout(ft.current);
                  },
                  onMouseLeave: () => {
                    ft.current = setTimeout(() => {
                      fe((u) => u === b.key ? null : u), Jt.current = !1;
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
                          u.stopPropagation(), ce((N) => N === b.key ? null : b.key), fe(b.key);
                        },
                        onContextMenu: (u) => {
                          u.preventDefault(), u.stopPropagation(), ce(b.key), bt({ visible: !0, x: u.clientX, y: u.clientY, key: b.key, title: b.title });
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
                            N && le({ ...r, [b.key]: { ...N, enabled: !1 } }), fe(null), ce(null);
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                          title: `Hide ${b.title}`,
                          children: /* @__PURE__ */ t.jsx(Us, { className: "w-[15px] h-[15px]" })
                        }
                      ),
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation(), Hl({ type: b.key, position: { x: w, y: A } });
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                          title: `${b.title} Settings`,
                          children: /* @__PURE__ */ t.jsx(qs, { className: "w-[15px] h-[15px]" })
                        }
                      ),
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation();
                            const N = r[b.key];
                            N && le({ ...r, [b.key]: { ...N, enabled: !1 } }), fe(null), ce(null);
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors",
                          title: `Remove ${b.title}`,
                          children: /* @__PURE__ */ t.jsx(Gs, { className: "w-[15px] h-[15px]" })
                        }
                      ),
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation(), ce(b.key), bt({ visible: !0, x: u.clientX, y: u.clientY, key: b.key, title: b.title });
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                          title: "More options",
                          children: /* @__PURE__ */ t.jsx(Zs, { className: "w-[15px] h-[15px]" })
                        }
                      )
                    ] })
                  ]
                },
                `overlay-row-${b.key}`
              )
            );
          }
          const F = (r?.customIndicators || []).filter((b) => b.enabled && b.display === "overlay"), H = /* @__PURE__ */ new Map(), K = [];
          for (const b of F)
            if (typeof b.expression == "string" && b.expression.startsWith("brue:") && b.scriptId) {
              const A = b.scriptId;
              H.has(A) || H.set(A, b);
            } else
              K.push(b);
          for (const b of K) {
            const w = `custom_overlay_${b.id}`, A = _l.current[w] || lt[w] || 150, X = v;
            v += m;
            const u = `ci-${b.id}`, N = kt === u, x = typeof b.expression == "string" && b.expression.startsWith("local:"), V = x ? b.group || b.expression.split(":")[1] || b.name : null, d = () => {
              x ? ge?.(V) : le && le({
                ...r,
                customIndicators: (r.customIndicators || []).filter((M) => M.id !== b.id)
              }), fe(null), ce(null);
            };
            h.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: X - Ae.toolbarRowYOffset, height: m },
                  onMouseEnter: () => {
                    fe(u), Jt.current = !0, ft.current && clearTimeout(ft.current);
                  },
                  onMouseLeave: () => {
                    ft.current = setTimeout(() => {
                      fe((M) => M === u ? null : M), Jt.current = !1;
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
                          M.stopPropagation(), ce((oe) => oe === u ? null : u), fe(u);
                        },
                        onContextMenu: (M) => {
                          M.preventDefault(), M.stopPropagation(), ce(u), bt({
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
                    N && Fs({
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
            const A = `script_${b}`, X = _l.current[A] || lt[A] || 150, u = v;
            v += m;
            const N = `script-${b}`, x = kt === N, V = r?.customBrueScripts?.[b]?.name || w.name || "Brue script", d = () => {
              $?.(b), fe(null), ce(null);
            };
            h.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: u - Ae.toolbarRowYOffset, height: m },
                  onMouseEnter: () => {
                    fe(N), Jt.current = !0, ft.current && clearTimeout(ft.current);
                  },
                  onMouseLeave: () => {
                    ft.current = setTimeout(() => {
                      fe((M) => M === N ? null : M), Jt.current = !1;
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
                          M.stopPropagation(), ce((oe) => oe === N ? null : N), fe(N);
                        },
                        onContextMenu: (M) => {
                          M.preventDefault(), M.stopPropagation(), ce(N), bt({
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
                    x && Fs({
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
          const O = r?.customBrueScripts || {};
          for (const b of Object.keys(O)) {
            const w = O[b];
            if (!w?.enabled || H.has(b)) continue;
            const A = `script_${b}`, X = _l.current[A] || lt[A] || 150, u = v;
            v += m;
            const N = `script-${b}`, x = kt === N, V = w.name || "Brue script", d = () => {
              $?.(b), fe(null), ce(null);
            };
            h.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: u - Ae.toolbarRowYOffset, height: m },
                  onMouseEnter: () => {
                    fe(N), Jt.current = !0, ft.current && clearTimeout(ft.current);
                  },
                  onMouseLeave: () => {
                    ft.current = setTimeout(() => {
                      fe((M) => M === N ? null : M), Jt.current = !1;
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
                          M.stopPropagation(), ce((oe) => oe === N ? null : N), fe(N);
                        },
                        onContextMenu: (M) => {
                          M.preventDefault(), M.stopPropagation(), ce(N), bt({
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
                    x && Fs({
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
          return h;
        })(),
        r && le && (() => {
          const a = Wr().map((m) => ({ key: m, title: zs(m) })), p = r?.customBrueScripts || {};
          return a.map(({ key: m, title: v }) => {
            const h = Qt.current[m];
            if (!s?.[m] || !h) return null;
            const F = r?.[m]?.sourceScriptId;
            if (F && p[F]?.enabled) return null;
            const H = Fn.current[m] || lr[m] || 150, K = `sp-${m}`, O = kt === K;
            return /* @__PURE__ */ t.jsxs(
              "div",
              {
                className: "absolute z-20 flex items-center",
                style: {
                  left: 0,
                  top: h.top + 2,
                  height: 16
                },
                onMouseEnter: () => {
                  fe(K), Jt.current = !0, ft.current && clearTimeout(ft.current);
                },
                onMouseLeave: () => {
                  ft.current = setTimeout(() => {
                    fe((b) => b === K ? null : b), Jt.current = !1;
                  }, 150);
                },
                children: [
                  O && /* @__PURE__ */ t.jsx(
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
                        b.stopPropagation(), ce((w) => w === K ? null : K), fe(K);
                      },
                      onContextMenu: (b) => {
                        b.preventDefault(), b.stopPropagation(), ce(K), bt({ visible: !0, x: b.clientX, y: b.clientY, key: m, title: v });
                      }
                    }
                  ),
                  O && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (b) => {
                          b.stopPropagation();
                          const w = r[m];
                          w && le({ ...r, [m]: { ...w, enabled: !1 } }), fe(null), ce(null);
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: `Hide ${v}`,
                        children: /* @__PURE__ */ t.jsx(Us, { className: "w-[15px] h-[15px]" })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (b) => {
                          b.stopPropagation(), Hl({ type: m, position: { x: H, y: h.top } });
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: `${v} Settings`,
                        children: /* @__PURE__ */ t.jsx(qs, { className: "w-[15px] h-[15px]" })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (b) => {
                          b.stopPropagation();
                          const w = r[m];
                          w && le({ ...r, [m]: { ...w, enabled: !1 } }), fe(null), ce(null);
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors",
                        title: `Remove ${v}`,
                        children: /* @__PURE__ */ t.jsx(Gs, { className: "w-[15px] h-[15px]" })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (b) => {
                          b.stopPropagation(), ce(K), bt({ visible: !0, x: b.clientX, y: b.clientY, key: m, title: v });
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: "More options",
                        children: /* @__PURE__ */ t.jsx(Zs, { className: "w-[15px] h-[15px]" })
                      }
                    )
                  ] })
                ]
              },
              `sp-row-${m}`
            );
          });
        })(),
        r && le && (() => {
          const a = (r?.customIndicators || []).filter((e) => e.enabled && e.display === "subplot"), p = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Map();
          for (const e of a)
            if (typeof e.expression == "string" && e.expression.startsWith("brue:") && e.scriptId) {
              const H = e.scriptId;
              p.has(H) || p.set(H, e);
            } else if (typeof e.expression == "string" && e.expression.startsWith("local:") && e.group) {
              const H = e.group;
              m.has(H) || m.set(H, e);
            }
          const v = [], h = [];
          for (const [e, F] of p.entries())
            h.push({
              rowKey: `script-${e}`,
              firstPlot: F,
              label: r?.customBrueScripts?.[e]?.name || F.name || "Brue script",
              kind: "brue",
              handle: e,
              remove: () => $?.(e)
            });
          for (const [e, F] of m.entries())
            h.push({
              rowKey: `engine-sp-${e}`,
              firstPlot: F,
              label: e,
              kind: "engine",
              handle: e,
              remove: () => ge?.(e)
            });
          for (const { rowKey: e, firstPlot: F, label: H, kind: K, handle: O, remove: b } of h) {
            const w = Qt.current[`custom_${F.id}`];
            if (!w) continue;
            const A = kt === e, X = 200, u = () => {
              b(), fe(null), ce(null);
            };
            v.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: w.top + 2, height: 16 },
                  onMouseEnter: () => {
                    fe(e), Jt.current = !0, ft.current && clearTimeout(ft.current);
                  },
                  onMouseLeave: () => {
                    ft.current = setTimeout(() => {
                      fe((N) => N === e ? null : N), Jt.current = !1;
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
                          N.stopPropagation(), ce((x) => x === e ? null : e), fe(e);
                        },
                        onContextMenu: (N) => {
                          N.preventDefault(), N.stopPropagation(), ce(e), bt({
                            visible: !0,
                            x: N.clientX,
                            y: N.clientY,
                            key: `custom_${F.id}`,
                            title: H,
                            custom: K === "engine" ? { kind: "engine", label: O } : { kind: "brue", sid: O }
                          });
                        }
                      }
                    ),
                    A && Fs({
                      kind: K,
                      label: H,
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
          return v;
        })(),
        /* @__PURE__ */ t.jsx(
          "div",
          {
            ref: Pa,
            className: "absolute top-0 cursor-ns-resize z-40",
            style: {
              right: 0,
              width: We,
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
              bottom: gt + 8,
              left: `calc(50% - ${We / 2}px)`,
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
        al && /* @__PURE__ */ t.jsx(
          "div",
          {
            className: "absolute z-50 flex items-center justify-center",
            style: {
              top: 4,
              // Desktop reserves the RIGHT_TOOLBAR_WIDTH gap because the price
              // axis carries the right toolbar overlay; phone/tablet have no
              // overlay, so the reset button uses the full axis width.
              right: An ?? (Ae.yAxisResetUsesToolbarGap ? _o : 0),
              width: An !== void 0 ? We - An : Ae.yAxisResetUsesToolbarGap ? We - _o : We
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
              right: We,
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
        rs && r && le && ie && /* @__PURE__ */ t.jsx(
          Ou,
          {
            type: rs.type,
            config: r,
            onConfigChange: le,
            position: rs.position,
            onClose: () => Hl(null)
          }
        ),
        Rn && Rn.visible && r && le && (() => {
          const a = Xe.current?.getBoundingClientRect();
          if (!a) return null;
          const p = Rn.x - a.left, m = Rn.y - a.top, v = Rn.key, h = Rn.custom, e = () => {
            h?.kind === "brue" ? $?.(h.sid) : h?.kind === "engine" ? ge?.(h.label) : h?.kind === "formula" && le({
              ...r,
              customIndicators: (r.customIndicators || []).filter((F) => F.id !== h.ciId)
            });
          };
          return Ar.createPortal(
            (() => {
              const F = "var(--text)", H = "var(--dim)", K = "var(--hover)", O = "var(--edge)", b = {
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
                    left: Math.min(Rn.x, window.innerWidth - 170),
                    top: Math.min(Rn.y, window.innerHeight - 140)
                  },
                  children: [
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        style: { position: "fixed", inset: 0, zIndex: -1 },
                        onClick: () => {
                          bt(null), ce(null);
                        },
                        onContextMenu: (w) => {
                          w.preventDefault(), bt(null), ce(null);
                        }
                      }
                    ),
                    /* @__PURE__ */ t.jsx("div", { style: {
                      padding: "5px 10px 3px",
                      fontSize: "11px",
                      color: H,
                      whiteSpace: "nowrap"
                    }, children: Rn.title }),
                    !h && /* @__PURE__ */ t.jsx(
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
                          Hl({ type: v, position: { x: p, y: m } }), bt(null);
                        },
                        children: "Settings..."
                      }
                    ),
                    h?.kind === "engine" && Oe && /* @__PURE__ */ t.jsx(
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
                          Oe(h.label), bt(null);
                        },
                        children: "Settings..."
                      }
                    ),
                    !h && /* @__PURE__ */ t.jsx(
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
                          w && le({ ...r, [v]: { ...w, enabled: !1 } }), bt(null), ce(null);
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
                          if (h)
                            e();
                          else {
                            const w = r[v];
                            w && le({ ...r, [v]: { ...w, enabled: !1 } });
                          }
                          bt(null), ce(null);
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
function Xl({ children: l, size: n = 28, active: f = !1, title: T, onClick: I }) {
  return /* @__PURE__ */ t.jsxs(
    "button",
    {
      onClick: I,
      title: T,
      className: `relative flex items-center justify-center rounded-[2px] transition-colors shrink-0
        ${f ? "bg-[#343434] text-[#e8e8e8]" : "text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}
      `,
      style: { width: n, height: n },
      children: [
        f && /* @__PURE__ */ t.jsx("span", { className: "absolute left-[1px] top-[6px] bottom-[6px] w-[2px] bg-[#e8e8e8] rounded-r" }),
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
function bs({ type: l }) {
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
  magnet: f = !1,
  onToggleMagnet: T,
  hiddenAll: I = !1,
  onToggleHidden: Q,
  onClearAll: ne,
  collapsed: Se = !1,
  onToggleCollapsed: r
}) {
  const [le, $] = o.useState(!1), ge = Se ? 14 : 40;
  return Se ? /* @__PURE__ */ t.jsxs(
    "div",
    {
      className: "flex flex-col items-center bg-[#2a2a2a] border-r border-[#3a3a3a] shrink-0",
      style: { width: ge, minWidth: ge },
      children: [
        /* @__PURE__ */ t.jsx("div", { className: "h-1" }),
        /* @__PURE__ */ t.jsx(Xl, { size: 28, title: "Show drawing tools", onClick: () => r?.(), children: /* @__PURE__ */ t.jsx(bs, { type: "chevronRight" }) })
      ]
    }
  ) : /* @__PURE__ */ t.jsxs(
    "div",
    {
      className: "flex flex-col bg-[#2a2a2a] border-r border-[#3a3a3a] shrink-0 select-none",
      style: { width: ge, minWidth: ge },
      children: [
        /* @__PURE__ */ t.jsx("div", { className: "h-1 shrink-0" }),
        /* @__PURE__ */ t.jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden flex flex-col items-center gap-[2px] px-0 py-1 scrollbar-thin", children: rd.map((Oe, Pe) => /* @__PURE__ */ t.jsxs(yc.Fragment, { children: [
          Pe > 0 && /* @__PURE__ */ t.jsx("div", { className: "w-[26px] h-px bg-[#3a3a3a] my-[5px] shrink-0" }),
          Oe.tools.map((ve) => /* @__PURE__ */ t.jsx(
            Xl,
            {
              active: l === ve,
              title: ad[ve],
              onClick: () => {
                n?.(l === ve ? "cursor" : ve);
              },
              children: /* @__PURE__ */ t.jsx(cd, { tool: ve })
            },
            ve
          ))
        ] }, Pe)) }),
        /* @__PURE__ */ t.jsxs("div", { className: "shrink-0 flex flex-col items-center gap-[2px] pb-1", children: [
          /* @__PURE__ */ t.jsx("div", { className: "w-[26px] h-px bg-[#3a3a3a] my-[5px]" }),
          /* @__PURE__ */ t.jsx(Xl, { active: f, title: "Magnet (snap to OHLC)", onClick: () => T?.(), children: /* @__PURE__ */ t.jsx(bs, { type: "magnet" }) }),
          /* @__PURE__ */ t.jsx(Xl, { active: I, title: I ? "Show drawings" : "Hide all drawings", onClick: () => Q?.(), children: /* @__PURE__ */ t.jsx(bs, { type: I ? "eyeOff" : "eye" }) }),
          /* @__PURE__ */ t.jsx(Xl, { title: "Remove all drawings", onClick: () => $(!0), children: /* @__PURE__ */ t.jsx(bs, { type: "trash" }) }),
          /* @__PURE__ */ t.jsx(Xl, { title: "Hide drawing toolbar", onClick: () => r?.(), children: /* @__PURE__ */ t.jsx(bs, { type: "chevronLeft" }) })
        ] }),
        le && /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/40", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-[#262626] border border-[#3a3a3a] rounded-[3px] p-3 w-[200px] shadow-xl", children: [
          /* @__PURE__ */ t.jsx("div", { className: "text-[11px] text-[#e8e8e8] font-medium mb-3", children: "Remove all drawings?" }),
          /* @__PURE__ */ t.jsxs("div", { className: "flex gap-2 justify-end", children: [
            /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: () => $(!1),
                className: "px-3 py-1 text-[11px] bg-[#2a2a2a] border border-[#3a3a3a] text-[#b9b9b9] rounded-[2px] hover:bg-[#343434]",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: () => {
                  ne?.(), $(!1);
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
  const [f, T] = o.useState(!1), I = o.useRef(null);
  o.useEffect(() => {
    const ne = (Se) => {
      I.current && !I.current.contains(Se.target) && T(!1);
    };
    return document.addEventListener("mousedown", ne), () => document.removeEventListener("mousedown", ne);
  }, []);
  const Q = Ho.find((ne) => ne.id === l) || Ho[0];
  return /* @__PURE__ */ t.jsxs("div", { ref: I, className: "relative", children: [
    /* @__PURE__ */ t.jsxs(
      "button",
      {
        onClick: () => T((ne) => !ne),
        className: "flex items-center gap-1 px-2 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8] hover:bg-[#343434]",
        children: [
          /* @__PURE__ */ t.jsx("span", { className: "font-medium", children: Q.label }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[8px] opacity-60", children: "▾" })
        ]
      }
    ),
    f && /* @__PURE__ */ t.jsx("div", { className: "absolute top-full left-0 mt-1 z-30 w-[200px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl py-1", children: Ho.map((ne) => /* @__PURE__ */ t.jsxs(
      "button",
      {
        onClick: () => {
          n(ne.id), T(!1);
        },
        className: `w-full text-left px-3 py-1.5 text-[11px] flex flex-col hover:bg-[#343434] ${l === ne.id ? "bg-[#343434] text-[#e8e8e8]" : "text-[#b9b9b9]"}`,
        children: [
          /* @__PURE__ */ t.jsx("span", { className: "font-medium", children: ne.label }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[9px] opacity-60", children: ne.desc })
        ]
      },
      ne.id
    )) })
  ] });
}
const Yl = [
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
  { label: "12h", ms: 432e5, sec: 43200 },
  { label: "1D", ms: 864e5, sec: 86400 },
  { label: "1W", ms: 6048e5, sec: 604800 }
];
function dd({
  value: l,
  onChange: n,
  favs: f,
  onToggleFav: T
}) {
  const [I, Q] = o.useState(!1), [ne, Se] = o.useState("2m"), r = Yl.filter(($) => f.has($.label));
  Yl.filter(($) => !f.has($.label));
  const le = ($) => {
    const ge = $.match(/^(\d+)(s|m|h|D|W)$/);
    if (!ge) return null;
    const Oe = parseInt(ge[1]), Pe = ge[2];
    let ve = 0;
    return Pe === "s" ? ve = Oe * 1e3 : Pe === "m" ? ve = Oe * 6e4 : Pe === "h" ? ve = Oe * 36e5 : Pe === "D" ? ve = Oe * 864e5 : Pe === "W" && (ve = Oe * 6048e5), ve < 1e3 || ve > 6048e5 ? null : { label: $, ms: ve, sec: Math.floor(ve / 1e3) };
  };
  return /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-0.5 border border-[#3a3a3a] rounded overflow-hidden bg-[#262626]", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-0", children: [
      r.map(($) => /* @__PURE__ */ t.jsxs(
        "button",
        {
          onClick: () => n($),
          onContextMenu: (ge) => {
            ge.preventDefault(), T($.label);
          },
          className: `px-1.5 py-0.5 text-[10px] border-r border-[#3a3a3a]/50 last:border-0
              ${l.label === $.label ? "bg-[#414141] text-[#e8e8e8]" : "text-[#b9b9b9] hover:bg-[#343434] hover:text-[#e8e8e8]"}
              ${$.pro ? "text-[#f0426c]" : ""}`,
          title: $.pro ? "SECONDS PRO — locked" : `Right-click to unpin (fav ${r.length}/6)`,
          children: [
            $.label,
            $.pro ? " PRO" : ""
          ]
        },
        $.label
      )),
      /* @__PURE__ */ t.jsxs("span", { className: "text-[8px] px-1 text-[#b9b9b9] border-l border-[#3a3a3a] ml-0.5", children: [
        "FAV ",
        r.length,
        "/6"
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "relative ml-1", children: [
      /* @__PURE__ */ t.jsxs(
        "button",
        {
          onClick: () => Q(($) => !$),
          className: "px-1.5 py-0.5 text-[10px] text-[#b9b9b9] hover:text-[#e8e8e8] hover:bg-[#343434] border-l border-[#3a3a3a]",
          children: [
            "▾ ",
            l.label
          ]
        }
      ),
      I && /* @__PURE__ */ t.jsxs("div", { className: "absolute top-full left-0 mt-1 z-30 w-[320px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl p-2", children: [
        /* @__PURE__ */ t.jsx("div", { className: "text-[9px] text-[#b9b9b9] uppercase tracking-wider mb-1", children: "Seconds PRO locked" }),
        /* @__PURE__ */ t.jsx("div", { className: "flex flex-wrap gap-1 mb-2", children: Yl.filter(($) => $.pro).map(($) => /* @__PURE__ */ t.jsxs(
          "button",
          {
            onClick: () => {
              n($), Q(!1);
            },
            onContextMenu: (ge) => {
              ge.preventDefault(), T($.label);
            },
            className: `px-2 py-1 text-[10px] rounded border ${l.label === $.label ? "bg-[#414141] text-[#e8e8e8] border-[#414141]" : "bg-[#2a2a2a] text-[#f0426c] border-[#3a3a3a] hover:bg-[#343434]"}`,
            children: [
              $.label,
              " PRO"
            ]
          },
          $.label
        )) }),
        /* @__PURE__ */ t.jsx("div", { className: "text-[9px] text-[#b9b9b9] uppercase tracking-wider mb-1", children: "Minutes" }),
        /* @__PURE__ */ t.jsx("div", { className: "flex flex-wrap gap-1 mb-2", children: Yl.filter(($) => !$.pro && $.sec < 3600).map(($) => /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: () => {
              n($), Q(!1);
            },
            onContextMenu: (ge) => {
              ge.preventDefault(), T($.label);
            },
            className: `px-2 py-1 text-[10px] rounded border ${l.label === $.label ? "bg-[#414141] text-[#e8e8e8] border-[#414141]" : "bg-[#2a2a2a] text-[#b9b9b9] border-[#3a3a3a] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
            children: $.label
          },
          $.label
        )) }),
        /* @__PURE__ */ t.jsx("div", { className: "text-[9px] text-[#b9b9b9] uppercase tracking-wider mb-1", children: "Hours / Days" }),
        /* @__PURE__ */ t.jsx("div", { className: "flex flex-wrap gap-1 mb-3", children: Yl.filter(($) => !$.pro && $.sec >= 3600).map(($) => /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: () => {
              n($), Q(!1);
            },
            onContextMenu: (ge) => {
              ge.preventDefault(), T($.label);
            },
            className: `px-2 py-1 text-[10px] rounded border ${l.label === $.label ? "bg-[#414141] text-[#e8e8e8] border-[#414141]" : "bg-[#2a2a2a] text-[#b9b9b9] border-[#3a3a3a] hover:bg-[#343434] hover:text-[#e8e8e8]"}`,
            children: $.label
          },
          $.label
        )) }),
        /* @__PURE__ */ t.jsxs("div", { className: "border-t border-[#3a3a3a] pt-2 flex items-center gap-2", children: [
          /* @__PURE__ */ t.jsx("span", { className: "text-[10px] text-[#b9b9b9]", children: "Custom" }),
          /* @__PURE__ */ t.jsx(
            "input",
            {
              value: ne,
              onChange: ($) => Se($.target.value),
              placeholder: "e.g. 2m",
              className: "flex-1 px-2 py-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8]"
            }
          ),
          /* @__PURE__ */ t.jsx("button", { onClick: () => {
            const $ = le(ne);
            $ && (n($), Q(!1));
          }, className: "px-2 py-1 bg-[#d0d0d0] text-[#1c1c1c] rounded text-[10px]", children: "Add" })
        ] }),
        /* @__PURE__ */ t.jsx("div", { className: "text-[8px] text-[#b9b9b9] mt-1 opacity-60", children: "Click sets, right-click pins max 6. PRO seconds locked behind upsell." })
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
  onClose: f
}) {
  const T = (I) => n({ ...l, ...I });
  return /* @__PURE__ */ t.jsxs("div", { className: "w-[340px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl text-[11px]", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex justify-between items-center px-3 py-2 border-b border-[#3a3a3a]", children: [
      /* @__PURE__ */ t.jsx("span", { className: "font-bold tracking-wider text-[10px] text-[#b9b9b9]", children: "APPEARANCE — ADVANCED" }),
      f && /* @__PURE__ */ t.jsx("button", { onClick: f, className: "text-[14px] text-[#b9b9b9] hover:text-[#e8e8e8]", children: "×" })
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
const pd = hd;
function xd({ open: l, onClose: n, onSelect: f }) {
  const [T, I] = o.useState(""), [Q, ne] = o.useState(""), Se = o.useMemo(() => {
    const le = ["BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "DOGE", "AVAX", "DOT", "LINK", "LTC", "BCH", "UNI", "XLM", "ETC", "FIL", "TRX", "APT", "ARB", "OP", "MATIC", "ATOM", "NEAR", "FTM", "ALGO"], $ = ["binancef", "hl", "coinbase"], ge = [];
    for (let Oe = 0; Oe < 770; Oe++) {
      const Pe = le[Oe % le.length], ve = $[Oe % $.length];
      ge.push({ symbol: `${Pe}${ve === "binancef" ? "USDT" : "-USD"}`, base: Pe, exchange: ve, price: 100 + Math.random() * 5e4, change: (Math.random() - 0.5) * 10, listed: !0 });
    }
    return ge;
  }, []), r = o.useMemo(() => Se.filter((le) => !(Q && le.exchange !== Q || T && !le.symbol.toLowerCase().includes(T.toLowerCase()) && !le.base.toLowerCase().includes(T.toLowerCase()))).slice(0, 200), [Se, T, Q]);
  return l ? /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-[150] flex items-center justify-center bg-black/60", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-[#262626] border border-[#3a3a3a] rounded shadow-2xl w-[480px] max-h-[80vh] flex flex-col", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "px-3 py-2 border-b border-[#3a3a3a] flex items-center gap-2", children: [
      /* @__PURE__ */ t.jsx("span", { className: "text-[11px] font-bold tracking-wider text-[#e8e8e8]", children: "FIND SYMBOL — 770 LISTED" }),
      /* @__PURE__ */ t.jsx("button", { onClick: n, className: "ml-auto text-[#b9b9b9] hover:text-[#e8e8e8]", children: "×" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "p-2 flex gap-2 border-b border-[#3a3a3a]/50", children: [
      /* @__PURE__ */ t.jsx("input", { value: T, onChange: (le) => I(le.target.value), placeholder: "Search BTC, ETH...", className: "flex-1 px-2 py-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded text-[11px] text-[#e8e8e8]", autoFocus: !0 }),
      /* @__PURE__ */ t.jsxs("select", { value: Q, onChange: (le) => ne(le.target.value), className: "px-2 py-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded text-[10px] text-[#b9b9b9]", children: [
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
      r.map((le) => /* @__PURE__ */ t.jsxs("div", { onClick: () => {
        f(le.symbol), n();
      }, className: "grid grid-cols-4 px-2 py-1.5 text-[11px] border-b border-[#3a3a3a]/20 hover:bg-[#343434] cursor-pointer", children: [
        /* @__PURE__ */ t.jsx("span", { className: "font-mono font-medium text-[#e8e8e8]", children: le.symbol }),
        /* @__PURE__ */ t.jsx("span", { className: "font-mono tabular-nums", children: le.price.toFixed(2) }),
        /* @__PURE__ */ t.jsxs("span", { className: `tabular-nums ${le.change >= 0 ? "text-[#21b3a4]" : "text-[#f0426c]"}`, children: [
          le.change >= 0 ? "+" : "",
          le.change.toFixed(2),
          "%"
        ] }),
        /* @__PURE__ */ t.jsx("span", { className: "text-[10px] text-[#b9b9b9]", children: le.exchange })
      ] }, `${le.exchange}:${le.symbol}`))
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
function bd({ onSelect: l }) {
  const [n, f] = o.useState(!1), T = o.useRef(null);
  return o.useEffect(() => {
    const I = (Q) => {
      T.current && !T.current.contains(Q.target) && f(!1);
    };
    return document.addEventListener("mousedown", I), () => document.removeEventListener("mousedown", I);
  }, []), /* @__PURE__ */ t.jsxs("div", { ref: T, className: "relative", children: [
    /* @__PURE__ */ t.jsx("button", { onClick: () => f((I) => !I), className: "px-2 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8] hover:bg-[#343434]", children: "+Widget ▾" }),
    n && /* @__PURE__ */ t.jsxs("div", { className: "absolute top-full left-0 mt-1 z-30 w-[240px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl py-1", children: [
      /* @__PURE__ */ t.jsx("div", { className: "px-2 py-1 text-[9px] text-[#b9b9b9] uppercase tracking-wider", children: "Add widget — 10+ items" }),
      md.map((I) => /* @__PURE__ */ t.jsxs("button", { onClick: () => {
        l(I.id), f(!1);
      }, className: "w-full text-left px-3 py-1.5 hover:bg-[#343434] flex flex-col", children: [
        /* @__PURE__ */ t.jsx("span", { className: "text-[11px] text-[#e8e8e8] font-medium", children: I.label }),
        /* @__PURE__ */ t.jsx("span", { className: "text-[9px] text-[#b9b9b9]/60", children: I.desc })
      ] }, I.id))
    ] })
  ] });
}
function gd({ open: l, onClose: n, feature: f = "SECONDS PRO" }) {
  return l ? /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-[#262626] border border-[#3a3a3a] rounded shadow-2xl w-[380px] overflow-hidden", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "px-4 py-3 border-b border-[#3a3a3a] flex justify-between items-center", children: [
      /* @__PURE__ */ t.jsxs("span", { className: "text-[11px] font-bold tracking-wider text-[#e8e8e8]", children: [
        "PRO — ",
        f
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
          /* @__PURE__ */ t.jsx("span", { className: "text-[#e8e8e8] font-medium", children: f }),
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
})(), Vo = /* @__PURE__ */ new Set(), gs = () => Vo.forEach((l) => l()), Js = (l, n) => {
  try {
    localStorage.setItem(l, n);
  } catch {
  }
}, wn = {
  get: () => rn,
  setLayout(l) {
    rn.layout = l, Js("lset-layout", l), gs();
  },
  setSync(l) {
    rn.sync = l, Js("lset-layout-sync", JSON.stringify(l)), gs();
  },
  setPanelSymbol(l, n) {
    rn.panelSymbols = [...rn.panelSymbols], rn.panelSymbols[l] = n, Js("lset-layout-symbols", JSON.stringify(rn.panelSymbols)), gs();
  },
  setPanelKind(l, n) {
    rn.panelKinds = [...rn.panelKinds], rn.panelKinds[l] = n, Js("lset-layout-kinds", JSON.stringify(rn.panelKinds)), gs();
  },
  setActivePanel(l) {
    rn.activePanel !== l && (rn.activePanel = l, gs());
  },
  subscribe(l) {
    return Vo.add(l), () => {
      Vo.delete(l);
    };
  }
};
function Zo() {
  const [, l] = o.useState(0);
  return o.useEffect(() => wn.subscribe(() => l((n) => n + 1)), []), { ...rn };
}
const vd = o.lazy(() => import("./chunks/depth-BNoeWN9_.js").then((l) => l.E)), yd = o.lazy(() => import("./chunks/OrderflowPanel-3gWgqqly.js"));
o.lazy(() => import("./chunks/DOMPanel-CXeJYfu3.js"));
o.lazy(() => import("./chunks/TapePanel-CHPghbfI.js"));
const kd = o.lazy(() => import("./chunks/FootprintPanel-9lf4EGuV.js")), wd = o.lazy(() => import("./chunks/VolumeProfilePanel-D_VY7Om5.js")), Sd = o.lazy(() => import("./chunks/TPOPanel-h_4YpZGs.js")), Cd = o.lazy(() => import("./chunks/CVDPanel-yEJSuTR6.js")), Id = o.lazy(() => import("./chunks/LiquidationPanel-fYGFwa7I.js")), Td = o.lazy(() => import("./chunks/EdgeDepthDOMPanel-CK7OOfWZ.js")), jd = o.lazy(() => import("./chunks/EdgeDepthTapePanel-COMqFZeA.js")), Md = o.lazy(() => import("./chunks/EdgeDepthWatchlist-Ce-HB6gq.js")), Rd = o.lazy(() => import("./chunks/EdgeDepthIndicators-1Co7hMQX.js")), Hr = () => /* @__PURE__ */ t.jsx("div", { className: "h-full w-full flex items-center justify-center text-[11px] text-[var(--dim)]", children: "Loading…" }), $r = {
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
  symbol: l,
  sourceProvider: n,
  timeframe: f,
  colors: T,
  active: I,
  onActivate: Q,
  kind: ne,
  onToggleKind: Se,
  syncedCrosshairTime: r,
  onCrosshairMove: le,
  syncedViewportTime: $,
  onViewportTimeChange: ge,
  quote: Oe
}) {
  const [Pe, ve] = o.useState([]), Me = lo(), Ze = o.useRef(!0);
  o.useEffect(() => (Ze.current = !0, () => {
    Ze.current = !1;
  }), []), o.useEffect(() => {
    if (ne !== "chart") return;
    let Ce = !1;
    ve([]);
    const Ve = async () => {
      try {
        const et = await Hu("multi_panel", {
          symbol: l,
          timeframe: f,
          limit: 500
        });
        !Ce && et?.length && ve(et.map((Ie) => ({
          time: Date.parse(Ie.timestamp),
          open: Ie.open,
          high: Ie.high,
          low: Ie.low,
          close: Ie.close,
          volume: Ie.volume
        })));
      } catch {
      }
    };
    Ve();
    const tt = setInterval(Ve, 1e4);
    return () => {
      Ce = !0, clearInterval(tt);
    };
  }, [l, f, ne]);
  const _e = () => {
    const Ce = ne;
    return Ce === "depth" ? /* @__PURE__ */ t.jsx(
      Ju,
      {
        symbol: l,
        sourceProvider: n,
        colors: T,
        syncedCrosshairTime: r,
        onCrosshairMove: le,
        onToggleKind: Se
      }
    ) : Ce === "edgedepth" ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(Hr, {}), children: /* @__PURE__ */ t.jsx(
      vd,
      {
        symbol: l,
        provider: n || "binance",
        onToggleKind: Se
      }
    ) }) : ["orderflow", "dom", "tape", "footprint", "vpvr", "tpo", "cvd", "liquidations", "watchlist", "indicators"].includes(Ce) ? /* @__PURE__ */ t.jsxs(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(Hr, {}), children: [
      Ce === "orderflow" && /* @__PURE__ */ t.jsx(yd, { symbol: l, provider: n || "binance", colors: T }),
      Ce === "dom" && /* @__PURE__ */ t.jsx(Td, { symbol: l, provider: n || "binance" }),
      Ce === "tape" && /* @__PURE__ */ t.jsx(jd, { symbol: l, provider: n || "binance" }),
      Ce === "footprint" && /* @__PURE__ */ t.jsx(kd, { symbol: l, provider: n || "binance" }),
      Ce === "vpvr" && /* @__PURE__ */ t.jsx(wd, { symbol: l, provider: n || "binance" }),
      Ce === "tpo" && /* @__PURE__ */ t.jsx(Sd, { symbol: l, provider: n || "binance" }),
      Ce === "cvd" && /* @__PURE__ */ t.jsx(Cd, { symbol: l, provider: n || "binance" }),
      Ce === "liquidations" && /* @__PURE__ */ t.jsx(Id, { symbol: l, provider: n || "binance" }),
      Ce === "watchlist" && /* @__PURE__ */ t.jsx(Md, { activeSymbol: l, onSelectSymbol: (Ve) => {
        try {
          window.__lseShell?.selectSymbol?.(Ve);
        } catch {
        }
      } }),
      Ce === "indicators" && /* @__PURE__ */ t.jsx(Rd, { symbol: l, provider: n || "binance" })
    ] }) : Pe.length > 0 ? /* @__PURE__ */ t.jsx(
      Go,
      {
        candles: Pe,
        symbol: l,
        timeframe: f,
        chartType: "candlestick",
        livePrice: Pe[Pe.length - 1]?.close ?? null,
        rightOffset: 6,
        colors: T,
        indicators: Rl,
        timezone: Me?.data?.timezone || "local",
        syncedCrosshairTime: r ?? void 0,
        onCrosshairMove: le,
        syncedViewportTime: $ ?? void 0,
        onViewportTimeChange: ge,
        showBidAskSpread: !!Oe,
        brokerBid: Oe?.bid ?? null,
        brokerAsk: Oe?.ask ?? null
      }
    ) : null;
  };
  return /* @__PURE__ */ t.jsxs(
    "div",
    {
      onMouseDown: Q,
      style: {
        position: "relative",
        minWidth: 0,
        minHeight: 0,
        overflow: "hidden",
        border: I ? "1px solid var(--accent-bar, #888)" : "1px solid var(--edge, #2a2e39)"
      },
      children: [
        _e(),
        ne === "chart" && /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: (Ce) => {
              Ce.stopPropagation(), Se();
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
  layout: l,
  syncSettings: n,
  pair: f,
  timeframe: T,
  colors: I,
  quote: Q,
  sourceProvider: ne
}) {
  const Se = $r[l] || $r["2x2"], { activePanel: r, panelSymbols: le, panelKinds: $ } = Zo(), ge = Math.min(r, Se.count - 1), [Oe, Pe] = o.useState([]), [ve, Me] = o.useState(null), [Ze, _e] = o.useState(null), Ce = o.useMemo(() => I || so(), [I]);
  o.useEffect(() => {
    Pe((et) => {
      const Ie = [...et];
      for (let ut = Ie.length; ut < Se.count; ut++)
        Ie.push(ut === 0 ? T : Vr[ut % Vr.length]);
      return Ie.slice(0, Se.count);
    });
  }, [Se.count, T]);
  const Ve = o.useCallback((et) => {
    n.syncCrosshair && Me(et);
  }, [n.syncCrosshair]), tt = o.useCallback((et) => {
    n.syncTime && _e(et);
  }, [n.syncTime]);
  return /* @__PURE__ */ t.jsx("div", { style: {
    display: "grid",
    width: "100%",
    height: "100%",
    gap: 2,
    gridTemplateColumns: `repeat(${Se.cols}, 1fr)`,
    gridTemplateRows: `repeat(${Se.rows}, 1fr)`
  }, children: Array.from({ length: Se.count }, (et, Ie) => /* @__PURE__ */ t.jsx(
    Pd,
    {
      symbol: n.syncSymbol ? f : le[Ie] || f,
      sourceProvider: ne,
      timeframe: n.syncInterval ? T : Oe[Ie] || T,
      colors: Ce,
      active: Ie === ge,
      onActivate: () => wn.setActivePanel(Ie),
      kind: $[Ie] || "chart",
      onToggleKind: () => {
        const ut = $[Ie] || "chart", xe = ["chart", "depth", "edgedepth", "orderflow", "dom", "tape", "footprint", "vpvr", "tpo", "cvd", "liquidations", "watchlist", "indicators"], wt = xe.indexOf(ut), St = xe[(wt + 1) % xe.length];
        wn.setPanelKind(Ie, St);
      },
      syncedCrosshairTime: n.syncCrosshair ? ve : null,
      onCrosshairMove: Ve,
      syncedViewportTime: n.syncTime ? Ze : null,
      onViewportTimeChange: tt,
      quote: Q
    },
    Ie
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
  const l = {};
  for (const n of to) {
    const f = localStorage.getItem(n);
    f !== null && (l[n] = f);
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
  eo && clearTimeout(eo), eo = setTimeout(() => {
    eo = null, Ld();
  }, 400);
}
async function Qr() {
  if (Xr) return;
  Xr = !0;
  try {
    const f = await fetch("/api/workspace/tools");
    if (f.ok) {
      const I = (await f.json())?.value ?? {};
      for (const Q of to) {
        const ne = I[Q];
        typeof ne == "string" && localStorage.setItem(Q, ne);
      }
    }
  } catch {
  }
  const l = localStorage.setItem.bind(localStorage), n = localStorage.removeItem.bind(localStorage);
  localStorage.setItem = (f, T) => {
    l(f, T), to.includes(f) && Yr();
  }, localStorage.removeItem = (f) => {
    n(f), to.includes(f) && Yr();
  };
}
const zr = ["#38bdf8", "#fbbf24", "#c084fc", "#34d399", "#fb7185", "#a3e635"];
function Ed(l, n) {
  if (!l || !n.length) return [];
  const f = /* @__PURE__ */ new Map();
  for (let Q = 0; Q < n.length; Q++)
    f.set(Math.floor(n[Q].time / 1e3), Q);
  const T = [];
  let I = 0;
  for (const [Q, ne] of Object.entries(l))
    for (const [Se, r] of Object.entries(ne.series || {})) {
      const le = new Array(n.length).fill(NaN);
      let $ = 0;
      for (const [Pe, ve] of r.points || []) {
        const Me = f.get(Pe);
        Me !== void 0 && (le[Me] = ve, $++);
      }
      if (!$) continue;
      const Oe = Object.keys(ne.series).length > 1 ? `${Q} ${Se}` : Q;
      T.push({
        id: `local-${Q}-${Se}`,
        name: Oe,
        // The prefix is what tells ProChart's formula evaluator to leave this
        // series alone and draw the precomputed values.
        expression: `local:${Q}:${Se}`,
        enabled: !0,
        display: ne.overlay ? "overlay" : "subplot",
        color: zr[I++ % zr.length],
        lineWidth: 2,
        zeroLine: !1,
        data: le,
        kind: r.kind,
        // One pane per ENGINE INDICATOR, not per column: MACD's three series
        // must share a pane and a scale or the histogram is meaningless.
        group: Q
      });
    }
  return T;
}
const Ad = o.lazy(() => import("./chunks/depth-BNoeWN9_.js").then((l) => l.a)), Dd = o.lazy(() => import("./chunks/depth-BNoeWN9_.js").then((l) => l.E)), Kr = o.lazy(() => import("./chunks/OrderflowPanel-3gWgqqly.js"));
o.lazy(() => import("./chunks/DOMPanel-CXeJYfu3.js"));
o.lazy(() => import("./chunks/TapePanel-CHPghbfI.js"));
const Bd = o.lazy(() => import("./chunks/FootprintPanel-9lf4EGuV.js")), Wd = o.lazy(() => import("./chunks/VolumeProfilePanel-D_VY7Om5.js")), Fd = o.lazy(() => import("./chunks/TPOPanel-h_4YpZGs.js")), Od = o.lazy(() => import("./chunks/CVDPanel-yEJSuTR6.js")), _d = o.lazy(() => import("./chunks/LiquidationPanel-fYGFwa7I.js")), Hd = o.lazy(() => import("./chunks/EdgeDepthDOMPanel-CK7OOfWZ.js")), $d = o.lazy(() => import("./chunks/EdgeDepthTapePanel-COMqFZeA.js")), Vd = o.lazy(() => import("./chunks/EdgeDepthWatchlist-Ce-HB6gq.js")), Xd = o.lazy(() => import("./chunks/EdgeDepthIndicators-1Co7hMQX.js")), Yd = o.lazy(() => import("./chunks/EdgeDepthLayers-CxWEYtSf.js")), zd = o.lazy(() => import("./chunks/backtest-CzvEPgfb.js").then((l) => l.bO)), Kd = o.lazy(() => import("./chunks/backtest-CzvEPgfb.js").then((l) => l.bP)), Ud = o.lazy(() => import("./chunks/econ-Bm3t6Jr7.js")), qd = o.lazy(() => import("./chunks/dataviz-D6zeVYjn.js")), Gd = o.lazy(() => import("./chunks/quant-CUgWwGm2.js")), Zd = o.lazy(() => import("./chunks/notebooks-fOzYQotZ.js")), Un = () => /* @__PURE__ */ t.jsx("div", { className: "h-full w-full flex items-center justify-center text-[11px] text-[var(--dim)]", children: "Loading…" }), Qd = {
  "1s": 1e3,
  "5s": 5e3,
  "10s": 1e4,
  "30s": 3e4,
  "1m": 6e4,
  "5m": 3e5,
  "15m": 9e5,
  "30m": 18e5,
  "1h": 36e5,
  "2h": 72e5,
  "4h": 144e5,
  "1d": 864e5,
  "1w": 6048e5,
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
}, fl = (l) => {
  l.currentTarget.style.background = "var(--hover)";
}, pl = (l) => {
  l.currentTarget.style.background = "transparent";
};
function Jd({ provider: l, symbol: n, timeframe: f, candles: T, chartType: I = "candlestick", trades: Q = [], engineIndicators: ne, indicatorPatch: Se = null, quote: r = null, positions: le = [], onPositionModify: $, onPositionClose: ge, autoSelectPositionId: Oe = null }) {
  const Pe = `${l}|${n}|${f}`, [ve, Me] = o.useState(
    { key: Pe, older: [], shift: 0 }
  );
  ve.key !== Pe && Me({ key: Pe, older: [], shift: 0 });
  const Ze = o.useRef(null), _e = o.useRef(!1), [Ce, Ve] = o.useState(!1), tt = o.useMemo(() => {
    if (!ve.older.length || !T.length) return T;
    const k = T[0].time;
    return [...ve.older.filter((de) => de.time < k), ...T];
  }, [ve.older, T]), et = o.useCallback(async () => {
    if (_e.current || Ze.current === Pe) return;
    const de = tt;
    if (!de.length || de.length >= 5e4) return;
    const je = Pe, yt = de[0].time;
    _e.current = !0, Ve(!0);
    try {
      const Zt = `/api/candles?provider=${encodeURIComponent(l)}&symbol=${encodeURIComponent(n)}&timeframe=${encodeURIComponent(f)}&limit=5000&end=${encodeURIComponent(new Date(yt).toISOString())}`, rt = await fetch(Zt);
      if (!rt.ok) {
        let Re = "";
        try {
          Re = String((await rt.json()).detail || "");
        } catch {
        }
        /no (history|prints|data)|served no|no real candles/i.test(Re) && (Ze.current = je);
        return;
      }
      const Ot = ((await rt.json()).candles || []).map(([Re, Tt, Xt, Fl, Ge, Ol]) => ({
        time: Re < 1e12 ? Re * 1e3 : Re,
        open: Tt,
        high: Xt,
        low: Fl,
        close: Ge,
        volume: Ol
      })).filter((Re) => Re.time < yt);
      if (!Ot.length) {
        Ze.current = je;
        return;
      }
      Me((Re) => Re.key !== je ? Re : {
        key: je,
        older: [...Ot, ...Re.older],
        shift: Re.shift + Ot.length
      });
    } catch {
    } finally {
      _e.current = !1, Ve(!1);
    }
  }, [tt, l, n, f, Pe]), [Ie, ut] = o.useState(null), [xe, wt] = o.useState(null), [St, Ue] = o.useState("cursor"), [Ht, Ut] = o.useState(!1), [qe, ht] = o.useState(!1), [qt, Sn] = o.useState(null), [Ct, Rt] = o.useState([]), [tn, Gt] = o.useState(Rl), [nn, An] = o.useState(!1), [ml, Kl] = o.useState(!1), [bl, qn] = o.useState("candles"), [Pl, Is] = o.useState(Yl[4]), [Ul, Ts] = o.useState(() => {
    try {
      const k = localStorage.getItem("ed_fav_tf");
      return new Set(k ? JSON.parse(k) : ["1m", "5m", "15m", "1h", "4h", "1D"]);
    } catch {
      return /* @__PURE__ */ new Set(["1m", "5m", "15m", "1h", "4h", "1D"]);
    }
  }), [js, Ms] = o.useState(pd), [Xe, Nl] = o.useState(!1), [ql, Gl] = o.useState(!1), [oo, Ll] = o.useState(!1), [Zl, El] = o.useState("SECONDS PRO"), [dn, ie] = o.useState(!1), Gn = o.useCallback(() => {
    window.dispatchEvent(new CustomEvent("lset:open-indicators"));
  }, []), se = o.useCallback((k) => ({
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
  })[k] ?? null, []), Et = o.useCallback((k) => {
    Ue(k);
    const de = se(k);
    wt(de);
  }, [se]), Te = o.useCallback((k) => {
    Ts((de) => {
      const je = new Set(de);
      if (je.has(k)) je.delete(k);
      else {
        if (je.size >= 6) {
          const yt = je.values().next().value;
          yt && je.delete(yt);
        }
        je.add(k);
      }
      try {
        localStorage.setItem("ed_fav_tf", JSON.stringify([...je]));
      } catch {
      }
      return je;
    });
  }, []), _n = o.useMemo(() => ({
    candles: "candlestick",
    fp_cluster: "footprint_cluster",
    fp_profile: "footprint_profile",
    heikin_ashi: "heikin_ashi",
    line: "line",
    tpo: "tpo",
    renko: "renko",
    flow_positioning: "flow_positioning"
  })[bl] || "candlestick", [bl]), [nt, hn] = o.useState(null), [Be, st] = o.useState(!1), [it, Qe] = o.useState(!1), [fn, Ql] = o.useState(""), [Ft, Al] = o.useState(null), [Zn, Qn] = o.useState(""), [, Jl] = o.useState(0), [It, pt] = o.useState(null), [es, Cn] = o.useState(""), [Dn, Hn] = o.useState(""), [Dl, Ye] = o.useState(""), [ts, Bl] = o.useState(!1), gl = o.useRef(null), $n = async () => {
    const k = fn.trim();
    if (!k) {
      Qn("name the template first");
      return;
    }
    await window.__lseShell?.saveLayout?.(k) ? (Qe(!1), Qn(""), Jl((je) => je + 1)) : Qn("could not save this template");
  };
  o.useEffect(() => {
    if (!nt) return;
    const k = () => {
      hn(null), st(!1), Qe(!1), Al(null), Qn(""), pt(null), Ye("");
    }, de = (je) => {
      je.key === "Escape" && k();
    };
    return document.addEventListener("click", k), document.addEventListener("keydown", de), () => {
      document.removeEventListener("click", k), document.removeEventListener("keydown", de);
    };
  }, [nt]);
  const In = Zo(), vl = In.layout, ns = In.sync, [$t, Vt] = o.useState(!1), [Jn, el] = o.useState("appearance"), xt = o.useRef($t);
  xt.current = $t;
  const an = o.useRef(Jn);
  an.current = Jn, o.useEffect(() => (Xo = (k) => {
    if (!xt.current) {
      el(k || "appearance"), Vt(!0);
      return;
    }
    if (k && k !== an.current) {
      el(k);
      return;
    }
    Vt(!1);
  }, () => {
    Xo = null;
  }), []), o.useEffect(() => {
    if (!$t) return;
    const k = (de) => {
      de.key === "Escape" && Vt(!1);
    };
    return document.addEventListener("keydown", k), () => document.removeEventListener("keydown", k);
  }, [$t]);
  const yl = o.useRef(null), [tl, Tn] = o.useState(null);
  o.useEffect(() => {
    $t || Tn(null);
  }, [$t]);
  const Bn = o.useCallback((k) => {
    if (k.target.closest("button")) return;
    const de = yl.current, je = de?.offsetParent;
    if (!je || !de) return;
    const yt = je.getBoundingClientRect(), Zt = de.getBoundingClientRect(), rt = k.clientX - Zt.left, ln = k.clientY - Zt.top;
    k.preventDefault();
    const Ot = (Tt) => {
      Tn({
        x: Math.max(0, Math.min(Tt.clientX - yt.left - rt, yt.width - Zt.width)),
        y: Math.max(0, Math.min(Tt.clientY - yt.top - ln, yt.height - 36))
      });
    }, Re = () => {
      window.removeEventListener("pointermove", Ot), window.removeEventListener("pointerup", Re);
    };
    window.addEventListener("pointermove", Ot), window.addEventListener("pointerup", Re);
  }, []), [nl, pn] = o.useState({
    color: "#e6e8ea",
    strokeWidth: 2,
    lineStyle: "solid",
    opacity: 100
  });
  o.useEffect(() => {
    let k = !0;
    return (async () => {
      const de = await xs.getTools();
      k && de?.drawingDefaults && pn((je) => ({ ...je, ...de.drawingDefaults }));
    })(), () => {
      k = !1;
    };
  }, []);
  const ls = o.useRef(null), Rs = o.useRef(0), Ps = o.useRef(() => {
  }), ro = o.useRef([]);
  o.useEffect(() => {
    Ko({ provider: l, symbol: n });
  }, [l, n]);
  const xn = `${l}:${n}`, Pt = o.useRef(null);
  o.useEffect(() => {
    let k = !0;
    return Pt.current = null, (async () => {
      const [de, je] = await Promise.all([
        xs.getDrawings(xn),
        xs.getIndicators(xn)
      ]);
      k && (Rt(de), Gt(je ?? Rl), Sn(null), Pt.current = xn);
    })(), () => {
      k = !1;
    };
  }, [xn]);
  const mt = o.useCallback((k) => {
    Rt(k), Pt.current === xn && xs.setDrawings(xn, k);
  }, [xn]), ll = o.useCallback((k) => {
    Gt(k), Pt.current === xn && xs.setIndicators(xn, k);
  }, [xn]);
  o.useEffect(() => {
    Se && Gt((k) => ({ ...k, ...Se }));
  }, [Se]);
  const kl = o.useCallback(() => {
    mt([]), Sn(null);
  }, [mt]), ot = o.useCallback((k) => {
    mt(Ct.filter((de) => de.id !== k)), Sn(null);
  }, [Ct, mt]), jn = o.useMemo(() => {
    const k = Ed(ne, tt);
    return k.length ? { ...tn, customIndicators: k } : tn;
  }, [tn, ne, tt]), sl = lo(), ol = Vu(), rl = o.useMemo(() => {
    const k = so(), de = sl?.candles, je = sl?.chart;
    return !ol || !de || !je ? { ...k } : {
      ...k,
      background: je.backgroundColor,
      backgroundOpacity: je.backgroundOpacity,
      grid: je.gridColor,
      gridOpacity: je.gridOpacity,
      axisLabel: je.axisLabelColor,
      axisLine: je.axisLineColor,
      crosshair: je.crosshairColor,
      priceTickerBullish: je.priceTickerBullish,
      priceTickerBearish: je.priceTickerBearish,
      bullish: de.bodyBullish,
      bearish: de.bodyBearish,
      bullishBorder: de.bordersBullish,
      bearishBorder: de.bordersBearish,
      bullishWick: de.wickBullish,
      bearishWick: de.wickBearish
    };
  }, [sl, ol]), Wl = sl?.data?.timezone || "local", Mn = Qd[f] ?? 36e5, mn = T.length ? T[T.length - 1].close : null, [Wn, bn] = o.useState("");
  o.useEffect(() => {
    const k = () => {
      if (f === "tick") {
        bn("");
        return;
      }
      if (!n || !Gr(n)) {
        bn("");
        return;
      }
      const je = Date.now(), yt = Math.ceil(je / Mn) * Mn, Zt = Math.max(0, yt - je), rt = Math.floor(Zt / 1e3), ln = Math.floor(rt / 60) % 60, Ot = Math.floor(rt / 3600), Re = (Tt) => String(Tt).padStart(2, "0");
      bn(Ot > 0 ? `${Ot}:${Re(ln)}:${Re(rt % 60)}` : `${ln}:${Re(rt % 60)}`);
    };
    k();
    const de = setInterval(k, 1e3);
    return () => clearInterval(de);
  }, [n, Mn, f]);
  const ao = o.useMemo(
    () => Object.values(tn || {}).filter((k) => k && k.enabled).length,
    [tn]
  ), co = o.useMemo(
    () => [
      ...Q.map((k, de) => ({
        id: `trade-${de}`,
        price: k.price,
        side: k.side,
        quantity: k.quantity ?? 0,
        symbol: n,
        pnl: k.pnl
      })),
      ...le.map((k) => ({ ...k, symbol: n }))
    ],
    [Q, le, n]
  );
  return n ? /* @__PURE__ */ t.jsxs("div", { className: "relative h-full w-full flex flex-col bg-[#1c1c1c]", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-1 px-2 py-1 border-b border-[#3a3a3a] bg-[#2a2a2a] text-[11px] shrink-0 flex-wrap", children: [
      /* @__PURE__ */ t.jsx("span", { className: "font-bold tracking-wider opacity-80 text-[#e8e8e8]", children: "EDGEDEPTH" }),
      /* @__PURE__ */ t.jsx("span", { className: "font-mono font-semibold text-[#e8e8e8] ml-1", children: n }),
      /* @__PURE__ */ t.jsx("div", { className: "flex items-center gap-0.5 ml-2", children: ["binance", "coinbase", "hyperliquid"].map((k) => /* @__PURE__ */ t.jsx("button", { onClick: () => {
        try {
          window.__lseShell?.setProvider?.(k);
        } catch {
        }
      }, className: `px-1.5 py-0.5 text-[9px] rounded border ${l === k ? "bg-[#21b3a4] text-black border-[#21b3a4] font-bold" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434]"}`, title: `${k} ${k === "hyperliquid" ? "15ms ⚡ ultra-fast" : k === "binance" ? "20ms fast" : "50ms"}`, children: k === "hyperliquid" ? "HL ⚡" : k === "binance" ? "BINANCE" : "COINBASE" }, k)) }),
      /* @__PURE__ */ t.jsxs("span", { className: "text-[9px] px-1.5 py-0.5 rounded bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9]", children: [
        l.toUpperCase(),
        " ",
        l === "hyperliquid" ? "⚡15ms" : l === "binance" ? "20ms" : l === "coinbase" ? "50ms" : "",
        " • ",
        f,
        " • LIVE"
      ] }),
      /* @__PURE__ */ t.jsx("div", { className: "ml-2", children: /* @__PURE__ */ t.jsx(dd, { value: Pl, onChange: (k) => {
        k.pro ? (El("SECONDS PRO"), Ll(!0)) : Is(k);
      }, favs: Ul, onToggleFav: Te }) }),
      /* @__PURE__ */ t.jsx("div", { className: "ml-1", children: /* @__PURE__ */ t.jsx(ud, { value: bl, onChange: qn }) }),
      /* @__PURE__ */ t.jsxs("select", { value: In.panelKinds[0] || "chart", onChange: (k) => wn.setPanelKind(0, k.target.value), className: "ml-1 bg-[#262626] border border-[#3a3a3a] rounded px-1 py-0.5 text-[10px] text-[#e8e8e8]", children: [
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
        /* @__PURE__ */ t.jsx("option", { value: "watchlist", children: "Watchlist 1503" }),
        /* @__PURE__ */ t.jsx("option", { value: "indicators", children: "Indicators" })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-1 ml-1", children: [
        /* @__PURE__ */ t.jsx(bd, { onSelect: (k) => wn.setPanelKind(0, k) }),
        /* @__PURE__ */ t.jsxs("button", { onClick: () => ie((k) => !k), className: "px-2 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8] hover:bg-[#343434]", children: [
          "Layers ",
          dn ? "▲" : "▼"
        ] }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => Gl(!0), className: "px-2 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8] hover:bg-[#343434]", children: "Find Symbol" })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "ml-auto flex items-center gap-1", children: [
        /* @__PURE__ */ t.jsx("span", { className: "text-[10px] text-[#b9b9b9]", children: "RT" }),
        /* @__PURE__ */ t.jsx("div", { className: "w-2 h-2 rounded-full bg-[#21b3a4] animate-pulse", title: "follow-live streaming" }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => {
          El("RT MODE"), Ll(!0);
        }, className: "px-1.5 py-0.5 rounded border border-[#3a3a3a] text-[9px] bg-[#21b3a4]/20 text-[#21b3a4] hover:bg-[#21b3a4]/30", children: "RT MODE ●" }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => Nl((k) => !k), className: "px-2 py-0.5 rounded border border-[#3a3a3a] text-[10px] hover:bg-[#343434] text-[#e8e8e8]", children: "⚙ Appearance" }),
        /* @__PURE__ */ t.jsx("button", { onClick: Gn, className: "px-2 py-0.5 rounded border border-[#3a3a3a] text-[10px] hover:bg-[#343434] text-[#e8e8e8]", children: "Indicators" })
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "relative flex-1 min-h-0 w-full flex", children: [
      /* @__PURE__ */ t.jsx(
        id,
        {
          activeTool: St,
          onToolSelect: Et,
          magnet: qe,
          onToggleMagnet: () => ht((k) => !k),
          hiddenAll: ml,
          onToggleHidden: () => Kl((k) => !k),
          onClearAll: kl,
          collapsed: Ht,
          onToggleCollapsed: () => Ut((k) => !k)
        }
      ),
      /* @__PURE__ */ t.jsx("div", { className: "hidden", children: /* @__PURE__ */ t.jsx(
        Xu,
        {
          activeTool: xe,
          onToolSelect: wt,
          drawings: Ct,
          onClearAllDrawings: kl,
          selectedDrawingId: qt,
          onDeleteSelectedDrawing: ot,
          drawingsLocked: nn,
          onToggleLock: () => An((k) => !k),
          drawingsHidden: ml,
          onToggleHide: () => Kl((k) => !k),
          indicatorCount: ao,
          onClearIndicators: () => ll(Rl),
          onOpenSettings: Gn
        }
      ) }),
      /* @__PURE__ */ t.jsx(
        "div",
        {
          ref: gl,
          className: "relative flex-1 min-w-0",
          style: ts ? { transform: "scaleY(-1)" } : void 0,
          onContextMenu: (k) => {
            k.preventDefault(), st(!1), pt(null), Ye("");
            let de = null;
            if (vl === "1x1" && Ie && gl.current) {
              const yt = gl.current.getBoundingClientRect(), Zt = ts ? yt.height - (k.clientY - yt.top) : k.clientY - yt.top, rt = Ie.yToPrice(Zt);
              Number.isFinite(rt) && rt > 0 && (de = rt);
            }
            const je = window.__lseShell?.tradeInfo?.() || null;
            hn({
              x: Math.min(k.clientX, window.innerWidth - 240),
              y: Math.min(k.clientY, window.innerHeight - (je?.available ? 360 : 230)),
              price: de,
              ref: mn,
              trade: je
            });
          },
          children: vl !== "1x1" ? /* @__PURE__ */ t.jsx(
            Nd,
            {
              layout: vl,
              syncSettings: ns,
              pair: n,
              timeframe: f,
              colors: rl,
              quote: r,
              sourceProvider: l
            }
          ) : In.panelKinds[0] === "depth" ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(Un, {}), children: /* @__PURE__ */ t.jsx(
            Ad,
            {
              symbol: n,
              sourceProvider: l,
              colors: rl,
              onToggleKind: () => wn.setPanelKind(0, "chart")
            }
          ) }) : In.panelKinds[0] === "edgedepth" ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(Un, {}), children: /* @__PURE__ */ t.jsx(
            Dd,
            {
              symbol: n,
              provider: l,
              onToggleKind: () => wn.setPanelKind(0, "chart")
            }
          ) }) : ["orderflow", "dom", "tape", "footprint", "vpvr", "tpo", "cvd", "liquidations", "watchlist", "indicators"].includes(In.panelKinds[0]) ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(Un, {}), children: (() => {
            const k = In.panelKinds[0];
            return k === "orderflow" ? /* @__PURE__ */ t.jsx(Kr, { symbol: n, provider: l, colors: rl }) : k === "dom" ? /* @__PURE__ */ t.jsx(Hd, { symbol: n, provider: l }) : k === "tape" ? /* @__PURE__ */ t.jsx($d, { symbol: n, provider: l }) : k === "footprint" ? /* @__PURE__ */ t.jsx(Bd, { symbol: n, provider: l }) : k === "vpvr" ? /* @__PURE__ */ t.jsx(Wd, { symbol: n, provider: l }) : k === "tpo" ? /* @__PURE__ */ t.jsx(Fd, { symbol: n, provider: l }) : k === "cvd" ? /* @__PURE__ */ t.jsx(Od, { symbol: n, provider: l }) : k === "liquidations" ? /* @__PURE__ */ t.jsx(_d, { symbol: n, provider: l }) : k === "watchlist" ? /* @__PURE__ */ t.jsx(Vd, { activeSymbol: n, onSelectSymbol: (de) => {
              try {
                window.__lseShell?.selectSymbol?.(de);
              } catch {
              }
            } }) : k === "indicators" ? /* @__PURE__ */ t.jsx(Xd, { symbol: n, provider: l }) : /* @__PURE__ */ t.jsx(Kr, { symbol: n, provider: l, colors: rl });
          })() }) : /* @__PURE__ */ t.jsx(t.Fragment, { children: tt.length === 0 ? /* @__PURE__ */ t.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-[#0b0e11] text-[#d1d4dc] text-[13px] font-mono p-4 text-center", children: [
            /* @__PURE__ */ t.jsxs("div", { className: "font-bold", children: [
              "Loading ",
              n,
              " ",
              f,
              " — ",
              l.toUpperCase()
            ] }),
            /* @__PURE__ */ t.jsxs("div", { className: "text-[11px] opacity-70 mt-2", children: [
              "Provider ",
              l,
              " • TF ",
              f,
              " • ",
              l === "hyperliquid" ? "15ms ultra-fast ⚡" : l === "binance" ? "20ms fast" : l === "coinbase" ? "50ms" : ""
            ] }),
            /* @__PURE__ */ t.jsx("div", { className: "text-[10px] opacity-50 mt-3", children: "If stuck, fallback to DEMO active — check console for /api/candles errors" }),
            /* @__PURE__ */ t.jsxs("div", { className: "mt-4 flex gap-2", children: [
              /* @__PURE__ */ t.jsx("button", { onClick: () => window.location.reload(), className: "px-3 py-1 bg-[#2962ff] text-white rounded text-[11px]", children: "Reload" }),
              /* @__PURE__ */ t.jsx("button", { onClick: () => {
                try {
                  localStorage.removeItem("lset-layout-kinds");
                } catch {
                }
                window.location.reload();
              }, className: "px-3 py-1 bg-[#1e222d] border border-[#2a2e39] rounded text-[11px]", children: "Reset Panes" })
            ] })
          ] }) : /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
            /* @__PURE__ */ t.jsx(
              Go,
              {
                candles: tt,
                symbol: n,
                timeframe: f,
                chartType: _n,
                onLoadMore: et,
                isLoadingMore: Ce,
                prependShift: ve.shift,
                livePrice: mn,
                countdown: Wn,
                timezone: Wl,
                rightOffset: 6,
                colors: rl,
                indicators: jn,
                onIndicatorsChange: ll,
                onRemoveEngineIndicator: (k) => window.__lseShell?.removeIndicator?.(k),
                onEditEngineIndicator: (k) => {
                  window.__lseShell?.editIndicator?.(k) || Gn();
                },
                drawings: Ct,
                selectedDrawingId: qt,
                drawingCursorRef: ro,
                requestRedrawRef: ls,
                scrollOffsetRef: Rs,
                onScrollSync: () => Ps.current?.(),
                onConverterReady: ut,
                onOpenSettings: Gn,
                positionLines: co,
                onPositionModify: $,
                onPositionClose: ge,
                autoSelectPositionId: Oe,
                showBidAskSpread: !!r,
                brokerBid: r?.bid ?? null,
                brokerAsk: r?.ask ?? null
              },
              Pe
            ),
            /* @__PURE__ */ t.jsx(
              Yu,
              {
                activeTool: xe,
                onToolSelect: wt,
                drawings: Ct,
                onDrawingsChange: mt,
                selectedDrawingId: qt,
                onSelectDrawing: Sn,
                converter: Ie,
                scrollSyncRef: Ps,
                scrollOffsetRef: Rs,
                drawingCursorRef: ro,
                requestRedrawRef: ls,
                toolSettings: nl,
                isLocked: nn,
                isHidden: ml,
                currentSymbol: n,
                timeframeMs: Mn,
                currentPrice: mn ?? void 0,
                candles: T
              }
            ),
            In.panelKinds[0] !== "depth" && /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: (k) => {
                  k.stopPropagation(), wn.setPanelKind(0, "depth");
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
      $t && /* @__PURE__ */ t.jsxs(
        "div",
        {
          ref: yl,
          className: "absolute z-[95] w-80",
          style: {
            ...tl ? { left: tl.x, top: tl.y } : { top: 8, right: 8 },
            background: "var(--panel)",
            border: "1px solid var(--edge)",
            borderRadius: 3,
            boxShadow: "0 10px 32px var(--shadow)"
          },
          children: [
            /* @__PURE__ */ t.jsxs(
              "div",
              {
                onPointerDown: Bn,
                className: "flex items-center justify-between px-3 py-1.5 select-none",
                style: { borderBottom: "1px solid var(--edge)", cursor: "move" },
                children: [
                  /* @__PURE__ */ t.jsx("span", { style: { fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "var(--dim)" }, children: "CHART LAYOUT" }),
                  /* @__PURE__ */ t.jsx(
                    "button",
                    {
                      onClick: () => Vt(!1),
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
                  onClick: () => el("appearance"),
                  className: "flex-1 px-3 py-1.5 text-xs font-medium transition-colors",
                  style: Jn === "appearance" ? { color: "var(--text)", background: "var(--active)" } : { color: "var(--dim)" },
                  children: "Appearance"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: () => el("chart"),
                  className: "flex-1 px-3 py-1.5 text-xs font-medium transition-colors",
                  style: Jn === "chart" ? { color: "var(--text)", background: "var(--active)" } : { color: "var(--dim)" },
                  children: "Chart"
                }
              )
            ] }),
            /* @__PURE__ */ t.jsx("div", { className: "max-h-[70vh] overflow-y-auto", children: Jn === "appearance" ? /* @__PURE__ */ t.jsx(zu, { hideHeader: !0, onBack: () => Vt(!1) }) : /* @__PURE__ */ t.jsx(Ku, { hideHeader: !0, onBack: () => Vt(!1) }) }),
            /* @__PURE__ */ t.jsx(
              "div",
              {
                className: "flex justify-end px-3 py-2",
                style: { borderTop: "1px solid var(--edge)" },
                children: /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    onClick: () => Vt(!1),
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
      Xe && /* @__PURE__ */ t.jsx("div", { className: "absolute top-10 right-2 z-[90]", children: /* @__PURE__ */ t.jsx(fd, { settings: js, onChange: Ms, onClose: () => Nl(!1) }) }),
      dn && /* @__PURE__ */ t.jsx("div", { className: "absolute top-10 left-[320px] z-[90]", children: /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx("div", { className: "p-2 text-[10px] text-[#b9b9b9]", children: "Loading layers…" }), children: /* @__PURE__ */ t.jsx(Yd, { onChange: () => {
      } }) }) }),
      /* @__PURE__ */ t.jsx(xd, { open: ql, onClose: () => Gl(!1), onSelect: (k) => {
        try {
          window.__lseShell?.selectSymbol?.(k);
        } catch {
        }
      } }),
      /* @__PURE__ */ t.jsx(gd, { open: oo, onClose: () => Ll(!1), feature: Zl }),
      nt && /* @__PURE__ */ t.jsxs(
        "div",
        {
          className: "fixed z-[110]",
          style: {
            left: nt.x,
            top: nt.y,
            minWidth: 190,
            padding: "2px 0 6px",
            background: "var(--panel)",
            border: "1px solid var(--edge)",
            borderRadius: 2,
            boxShadow: "0 6px 20px var(--shadow)",
            fontSize: 12,
            color: "var(--text)"
          },
          onClick: (k) => k.stopPropagation(),
          children: [
            nt.trade?.available && (() => {
              const k = nt.trade, de = (Re) => window.__lseShell?.fmtPrice?.(Re) ?? String(Re), je = (Re) => Re === "limit" ? "Limit" : "Stop";
              if (It) {
                const Re = {
                  flex: 1,
                  minWidth: 0,
                  padding: "3px 6px",
                  fontSize: 12,
                  color: "var(--text)",
                  background: "var(--bg2)",
                  border: "1px solid var(--edge)",
                  borderRadius: 2
                }, Tt = {
                  width: 38,
                  fontSize: 11,
                  color: "var(--dim)",
                  flexShrink: 0
                }, Xt = () => {
                  const Ge = parseFloat(es), Ol = parseFloat(Dn);
                  if (!(Ge > 0)) {
                    Ye("enter a price");
                    return;
                  }
                  if (!(Ol > 0)) {
                    Ye("enter a size");
                    return;
                  }
                  window.__lseShell?.quickOrder?.(It.side, It.otype, Ge, Ol), hn(null), pt(null);
                }, Fl = (Ge) => {
                  Ge.stopPropagation(), Ge.key === "Enter" && Xt(), Ge.key === "Escape" && (pt(null), Ye(""));
                };
                return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                  /* @__PURE__ */ t.jsxs("div", { style: { ...kn, cursor: "default", fontWeight: 600 }, children: [
                    It.side === "buy" ? "Buy" : "Sell",
                    " ",
                    je(It.otype),
                    " · ",
                    k.symbol
                  ] }),
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      style: { display: "flex", gap: 6, alignItems: "center", margin: "2px 10px 4px" },
                      onClick: (Ge) => Ge.stopPropagation(),
                      children: [
                        /* @__PURE__ */ t.jsx("span", { style: Tt, children: "Price" }),
                        /* @__PURE__ */ t.jsx(
                          "input",
                          {
                            autoFocus: !0,
                            value: es,
                            spellCheck: !1,
                            inputMode: "decimal",
                            style: Re,
                            onChange: (Ge) => Cn(Ge.target.value),
                            onKeyDown: Fl
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      style: { display: "flex", gap: 6, alignItems: "center", margin: "0 10px 4px" },
                      onClick: (Ge) => Ge.stopPropagation(),
                      children: [
                        /* @__PURE__ */ t.jsx("span", { style: Tt, children: "Units" }),
                        /* @__PURE__ */ t.jsx(
                          "input",
                          {
                            value: Dn,
                            spellCheck: !1,
                            inputMode: "decimal",
                            style: Re,
                            onChange: (Ge) => Hn(Ge.target.value),
                            onKeyDown: Fl
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      style: { display: "flex", gap: 4, margin: "0 10px 2px", justifyContent: "flex-end" },
                      onClick: (Ge) => Ge.stopPropagation(),
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
                              pt(null), Ye("");
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
                            onClick: Xt,
                            children: "Place"
                          }
                        )
                      ]
                    }
                  ),
                  Dl && /* @__PURE__ */ t.jsx("div", { style: { ...kn, color: "#e05d5d", cursor: "default" }, children: Dl }),
                  /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: "1px solid var(--edge)" } })
                ] });
              }
              const yt = k.qty != null ? `${k.qty} ` : "", Zt = [
                { label: `Buy ${yt}${k.symbol} at market`, side: "buy", otype: "market" },
                { label: `Sell ${yt}${k.symbol} at market`, side: "sell", otype: "market" }
              ], rt = nt.price, ln = nt.ref, Ot = k.pendingTypes || [];
              if (rt != null && ln != null && rt !== ln && Ot.length) {
                const Re = rt < ln ? [{ side: "buy", otype: "limit" }, { side: "sell", otype: "stop" }] : [{ side: "sell", otype: "limit" }, { side: "buy", otype: "stop" }];
                for (const Tt of Re)
                  Ot.includes(Tt.otype) && Zt.push({ ...Tt, label: `${Tt.side === "buy" ? "Buy" : "Sell"} ${je(Tt.otype)} @ ${de(rt)}…` });
              }
              return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                Zt.map((Re) => /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    className: "w-full text-left",
                    style: kn,
                    onMouseEnter: fl,
                    onMouseLeave: pl,
                    onClick: (Tt) => {
                      if (Re.otype === "market") {
                        window.__lseShell?.quickOrder?.(Re.side, Re.otype, nt.price), hn(null);
                        return;
                      }
                      Tt.stopPropagation(), pt({ side: Re.side, otype: Re.otype }), Cn(rt != null ? String(+rt.toFixed(rt >= 1e3 ? 2 : rt >= 100 ? 3 : rt >= 1 ? 4 : 6)) : ""), Hn(k.qty != null ? String(k.qty) : ""), Ye("");
                    },
                    children: Re.label
                  },
                  `${Re.side}-${Re.otype}`
                )),
                /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: "1px solid var(--edge)" } })
              ] });
            })(),
            /* @__PURE__ */ t.jsxs(
              "button",
              {
                className: "w-full text-left",
                style: { ...kn, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 },
                onMouseEnter: fl,
                onMouseLeave: pl,
                onClick: () => st((k) => !k),
                children: [
                  /* @__PURE__ */ t.jsx("span", { children: "Chart template" }),
                  /* @__PURE__ */ t.jsx("span", { style: { color: "var(--dim)" }, children: Be ? "▾" : "▸" })
                ]
              }
            ),
            Be && /* @__PURE__ */ t.jsxs("div", { className: "max-h-48 overflow-y-auto", style: { borderTop: "1px solid var(--edge)", borderBottom: "1px solid var(--edge)", margin: "3px 0" }, children: [
              (window.__lseShell?.layouts?.() || []).length === 0 ? /* @__PURE__ */ t.jsx("div", { style: { ...kn, color: "var(--dim)" }, children: "No saved templates yet" }) : window.__lseShell.layouts().map((k) => /* @__PURE__ */ t.jsxs(
                "div",
                {
                  style: { ...kn, display: "flex", alignItems: "center", gap: 8, paddingLeft: 20, cursor: "pointer" },
                  onMouseEnter: fl,
                  onMouseLeave: pl,
                  onClick: () => {
                    window.__lseShell?.applyLayout?.(k.id), hn(null);
                  },
                  children: [
                    /* @__PURE__ */ t.jsx("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: k.name }),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        title: Ft === k.id ? "Click again to delete" : "Delete template",
                        style: {
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          fontSize: Ft === k.id ? 11 : 13,
                          lineHeight: 1,
                          padding: "0 2px",
                          color: Ft === k.id ? "#e05d5d" : "var(--dim)"
                        },
                        onClick: async (de) => {
                          if (de.stopPropagation(), Ft !== k.id) {
                            Al(k.id);
                            return;
                          }
                          await window.__lseShell?.deleteLayout?.(k.id), Al(null), Jl((je) => je + 1);
                        },
                        children: Ft === k.id ? "sure?" : "×"
                      }
                    )
                  ]
                },
                k.id
              )),
              it ? /* @__PURE__ */ t.jsxs(
                "div",
                {
                  style: { display: "flex", gap: 4, margin: "3px 12px 5px", alignItems: "center" },
                  onClick: (k) => k.stopPropagation(),
                  children: [
                    /* @__PURE__ */ t.jsx(
                      "input",
                      {
                        autoFocus: !0,
                        value: fn,
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
                        onChange: (k) => Ql(k.target.value),
                        onKeyDown: async (k) => {
                          if (k.stopPropagation(), k.key === "Escape") {
                            Qe(!1);
                            return;
                          }
                          k.key === "Enter" && await $n();
                        }
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        disabled: !fn.trim(),
                        title: fn.trim() ? "Save this chart as a template" : "Name the template first",
                        style: {
                          padding: "3px 10px",
                          fontSize: 12,
                          lineHeight: 1.5,
                          borderRadius: 2,
                          border: "1px solid var(--edge)",
                          background: "var(--active)",
                          color: "var(--text)",
                          cursor: fn.trim() ? "pointer" : "default",
                          opacity: fn.trim() ? 1 : 0.5
                        },
                        onClick: $n,
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
                  onMouseEnter: fl,
                  onMouseLeave: pl,
                  onClick: (k) => {
                    k.stopPropagation(), Ql(window.__lseShell?.layoutDefaultName?.() || ""), Qn(""), Qe(!0);
                  },
                  children: "+ Save current as template…"
                }
              ),
              Zn && /* @__PURE__ */ t.jsx("div", { style: { ...kn, paddingLeft: 20, color: "#e05d5d" }, children: Zn })
            ] }),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "w-full text-left",
                style: kn,
                onMouseEnter: fl,
                onMouseLeave: pl,
                onClick: () => {
                  gl.current?.querySelector('button[title="Reset view"]')?.click(), hn(null);
                },
                children: "Reset chart view"
              }
            ),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "w-full text-left",
                style: kn,
                onMouseEnter: fl,
                onMouseLeave: pl,
                onClick: () => {
                  Bl((k) => !k), hn(null);
                },
                children: ts ? "Unflip chart" : "Flip chart"
              }
            ),
            Ct.length > 0 && /* @__PURE__ */ t.jsxs(
              "button",
              {
                className: "w-full text-left",
                style: kn,
                onMouseEnter: fl,
                onMouseLeave: pl,
                onClick: () => {
                  kl(), hn(null);
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
                style: kn,
                onMouseEnter: fl,
                onMouseLeave: pl,
                onClick: () => {
                  el("appearance"), Vt(!0), hn(null);
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
function eh({ symbol: l, timeframe: n, candles: f, quote: T }) {
  const I = lo(), Q = o.useMemo(() => so(), []);
  return !l || !f.length ? /* @__PURE__ */ t.jsx("div", { className: "h-full w-full" }) : /* @__PURE__ */ t.jsx(
    Go,
    {
      candles: f,
      symbol: l,
      timeframe: n,
      chartType: "candlestick",
      livePrice: f[f.length - 1]?.close ?? null,
      rightOffset: 6,
      colors: Q,
      indicators: Rl,
      timezone: I?.data?.timezone || "local",
      showBidAskSpread: !!T,
      brokerBid: T?.bid ?? null,
      brokerAsk: T?.ask ?? null
    }
  );
}
const Ml = /* @__PURE__ */ new Map();
function Ur(l) {
  const n = Ml.get(l);
  n && n.root.render(
    /* @__PURE__ */ t.jsx(qo, { children: /* @__PURE__ */ t.jsx(Uo, { children: /* @__PURE__ */ t.jsx(eh, { ...n.props }) }) })
  );
}
const th = {
  mount(l, n = {}) {
    Ml.has(l) || Ml.set(l, { root: xl(l), props: {} });
    const f = Ml.get(l);
    f.props = { ...f.props, ...no(n) }, Ur(l);
  },
  update(l, n) {
    const f = Ml.get(l);
    f && (f.props = { ...f.props, ...no(n) }, Ur(l));
  },
  unmount(l) {
    const n = Ml.get(l);
    n && (n.root.unmount(), Ml.delete(l));
  }
};
function nh() {
  const l = Zo();
  return /* @__PURE__ */ t.jsx(
    Uu,
    {
      selectedLayout: l.layout,
      onLayoutChange: (n) => wn.setLayout(n),
      syncSettings: l.sync,
      onSyncSettingsChange: (n) => wn.setSync(n),
      isMultiPanelActive: l.layout !== "1x1",
      onExitMultiPanel: () => wn.setLayout("1x1")
    }
  );
}
let zl = null, Xo = null, Yo = null, Cs = {
  provider: "demo",
  symbol: "",
  timeframe: "1h",
  candles: [],
  chartType: "candlestick",
  trades: [],
  engineIndicators: void 0
};
function $o() {
  zl && zl.render(
    /* @__PURE__ */ t.jsx(qo, { children: /* @__PURE__ */ t.jsx(Uo, { children: /* @__PURE__ */ t.jsx(Jd, { ...Cs, indicatorPatch: Yo }) }) })
  );
}
const lh = {
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
function no(l) {
  const n = { ...l };
  return l.chartType && (n.chartType = lh[l.chartType] ?? "candlestick"), "symbol" in l && !l.symbol && (n.symbol = ""), l.candles?.length && l.candles[0].time < qr && (n.candles = l.candles.map((f) => ({ ...f, time: f.time * 1e3 }))), l.trades?.length && l.trades[0].time < qr && (n.trades = l.trades.map((f) => ({ ...f, time: f.time * 1e3 }))), n;
}
const Qo = {
  async mount(l, n = {}) {
    Cs = { ...Cs, ...no(n) }, zl || (zl = xl(l)), await Qr(), $o();
  },
  update(l) {
    Cs = { ...Cs, ...no(l) }, $o();
  },
  unmount() {
    zl?.unmount(), zl = null;
  },
  openAppearance(l) {
    Xo?.(l);
  },
  invalidateWorkspaceSection(l) {
    $u(l);
  },
  setIndicators(l) {
    Yo = { ...Yo || {}, ...l }, $o();
  },
  indicatorKeys() {
    return Object.keys(Rl);
  },
  indicatorDefaults() {
    return JSON.parse(JSON.stringify(Rl));
  }
}, sh = new qu(), zo = { inReplay: !1 };
function oh({ onExit: l }) {
  const [n, f] = o.useState(!0), T = Zr();
  o.useEffect(() => {
    f(!0);
  }, [T.key]);
  const I = (Q) => {
    f(Q), Q || setTimeout(() => {
      zo.inReplay || l();
    }, 150);
  };
  return /* @__PURE__ */ t.jsx("div", { className: "h-full w-full bg-[#0b0d12]", children: /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(Un, {}), children: /* @__PURE__ */ t.jsx(Kd, { open: n, onOpenChange: I }) }) });
}
function rh({ provider: l }) {
  const [n] = Qu(), f = Zr(), T = n.get("sym"), I = f.pathname.split("/").pop() || "", Q = n.get("provider") || l;
  return Ko({ provider: Q, symbol: T || I }), o.useEffect(() => (zo.inReplay = !0, () => {
    zo.inReplay = !1;
  }), []), /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(Un, {}), children: /* @__PURE__ */ t.jsx(zd, {}) });
}
let vs = null;
const ah = {
  async mount(l, n = {}) {
    const f = n.provider || "demo", T = n.onExit || (() => {
    });
    vs || (vs = xl(l)), Ko({ provider: f, symbol: "" }), await Qr(), vs.render(
      /* @__PURE__ */ t.jsx(Gu, { client: sh, children: /* @__PURE__ */ t.jsx(qo, { initialEntries: ["/"], children: /* @__PURE__ */ t.jsxs(Uo, { children: [
        /* @__PURE__ */ t.jsxs(Zu, { children: [
          /* @__PURE__ */ t.jsx(Fr, { path: "/backtest/:pair", element: /* @__PURE__ */ t.jsx(rh, { provider: f }) }),
          /* @__PURE__ */ t.jsx(Fr, { path: "*", element: /* @__PURE__ */ t.jsx(oh, { onExit: T }) })
        ] }),
        /* @__PURE__ */ t.jsx(ed, { theme: "dark", position: "bottom-right" })
      ] }) }) })
    );
  },
  unmount() {
    vs?.unmount(), vs = null;
  }
};
let ys = null;
const ch = {
  mount(l, n = {}) {
    ys || (ys = xl(l)), ys.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(Un, {}), children: /* @__PURE__ */ t.jsx(Ud, { onBack: n.onBack, initialView: n.view }) })
    );
  },
  unmount() {
    ys?.unmount(), ys = null;
  }
};
let ks = null;
const ih = {
  mount(l) {
    ks || (ks = xl(l)), ks.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(Un, {}), children: /* @__PURE__ */ t.jsx(qd, {}) })
    );
  },
  unmount() {
    ks?.unmount(), ks = null;
  }
};
let ws = null;
const uh = {
  mount(l) {
    ws || (ws = xl(l)), ws.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(Un, {}), children: /* @__PURE__ */ t.jsx(Gd, {}) })
    );
  },
  unmount() {
    ws?.unmount(), ws = null;
  }
};
let Ss = null;
const dh = {
  mount(l) {
    Ss || (Ss = xl(l)), Ss.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(Un, {}), children: /* @__PURE__ */ t.jsx(Zd, {}) })
    );
  },
  unmount() {
    Ss?.unmount(), Ss = null;
  }
};
Qo.mountLayoutButton = (l) => {
  xl(l).render(/* @__PURE__ */ t.jsx(nh, {}));
};
Qo.layoutStore = wn;
window.LSEChart = Qo;
window.LSEChartPanes = th;
window.LSEManualBacktest = ah;
window.LSEEconCalendar = ch;
window.LSEDataViz = ih;
window.LSEQuantModels = uh;
window.LSENotebooks = dh;
export {
  Qo as default
};
