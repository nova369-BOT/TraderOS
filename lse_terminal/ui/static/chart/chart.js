import { r as o, i as Er, j as t, g as kc, q as ys } from "./chunks/react-vendor-C0yw3i6b.js";
import { n as Ar, o as Dr, p as wc, q as Sc, r as Cc, s as Ic, t as Tc, u as Mc, v as jc, w as Rc, x as Pc, y as Lc, z as Nc, A as Ec, C as Ac, D as Dc, E as Bc, F as Wc, G as Fc, H as Oc, J as _c, K as $c, M as Hc, N as Vc, O as Xc, Q as Yc, R as zc, U as Kc, V as Uc, W as qc, X as Gc, Y as Zc, Z as Jc, _ as Qc, $ as ei, a0 as ti, a1 as ni, a2 as si, a3 as li, a4 as oi, a5 as ri, a6 as ai, a7 as ci, a8 as ii, a9 as ui, aa as di, ab as hi, ac as fi, ad as pi, ae as mi, af as xi, ag as bi, ah as gi, ai as vi, aj as yi, ak as ki, al as wi, am as Si, an as Ci, ao as Ii, ap as Ti, aq as Mi, ar as ji, as as Ri, at as Pi, au as Li, av as Ni, aw as Ei, ax as Ai, ay as Di, az as Bi, aA as Wi, aB as Fi, aC as Oi, aD as _i, aE as $i, aF as Hi, aG as Vi, aH as Xi, aI as Yi, aJ as zi, aK as Ki, aL as Ui, aM as qi, aN as Gi, aO as Zi, aP as Ji, aQ as Qi, aR as eu, aS as tu, aT as nu, aU as su, aV as lu, aW as ou, aX as ru, aY as au, aZ as cu, a_ as iu, a$ as uu, b0 as du, b1 as hu, b2 as fu, b3 as pu, b4 as mu, b5 as Ye, b6 as xu, b7 as bu, b8 as lo, b9 as oo, ba as gu, bb as vu, bc as yu, bd as ku, be as wu, bf as Su, bg as Cu, bh as Iu, bi as Oo, bj as Tu, bk as Mu, bl as ju, bm as Ru, bn as Pu, g as Lu, bo as Nu, bp as Eu, bq as Au, br as Br, bs as Kl, bt as Du, bu as Gr, bv as Bu, bw as Wu, bx as Fu, by as Ul, bz as Ou, bA as _u, bB as $u, bC as Hu, bD as zs, bE as Vu, bF as zo, bG as Ko, bH as hl, bI as Xu, bJ as Yu, bK as zu, bL as Ku, bM as Uu } from "./chunks/backtest-CeqYlV1v.js";
import { au as ql, av as Gl, m as Zl, aw as Jl } from "./chunks/ui-DZwdMnFY.js";
import { Q as qu, d as Gu, M as Uo, R as Zu, e as Wr, c as Ju, a as Zr } from "./chunks/router-query-iQy8iLKR.js";
import { D as Qu } from "./chunks/depth-BzhG7qSx.js";
import { $ as ed } from "./chunks/ui-heavy-BL_8guwx.js";
function Fr(l, n) {
  const { closes: h, highs: T, lows: I, opens: le, volumes: ae, timestamps: Ie } = l;
  let r = null;
  return n.movingAverages?.enabled && n.movingAverages.lines?.length > 0 && (r = n.movingAverages.lines.map((te) => {
    let Ve;
    switch (te.type) {
      case "SMA":
        Ve = wc(h, te.period);
        break;
      case "SMMA":
        Ve = Dr(h, te.period);
        break;
      case "EMA":
      default:
        Ve = Ar(h, te.period);
        break;
    }
    return { data: Ve, color: te.color, name: `${te.type} ${te.period}` };
  })), {
    rsi: n.rsi?.enabled ? mu(h, n.rsi.period) : null,
    macd: n.macd?.enabled ? pu(h, n.macd.fast, n.macd.slow, n.macd.signal) : null,
    ema: n.ema?.enabled ? n.ema.periods.map((te) => Ar(h, te)) : null,
    bollinger: n.bollinger?.enabled ? fu(h, n.bollinger.period, n.bollinger.stdDev) : null,
    movingAverages: r,
    atr: n.atr?.enabled ? hu(T, I, h, n.atr.period) : null,
    stochastic: n.stochastic?.enabled ? du(T, I, h, n.stochastic.kPeriod, n.stochastic.dPeriod, n.stochastic.smooth) : null,
    williamsR: n.williamsR?.enabled ? uu(T, I, h, n.williamsR.period) : null,
    cci: n.cci?.enabled ? iu(T, I, h, n.cci.period) : null,
    adx: n.adx?.enabled ? cu(T, I, h, n.adx.period) : null,
    roc: n.roc?.enabled ? au(h, n.roc.period) : null,
    vwap: n.vwap?.enabled ? ru(T, I, h, ae, Ie) : null,
    ichimoku: n.ichimoku?.enabled ? ou(T, I, h, n.ichimoku.tenkanPeriod, n.ichimoku.kijunPeriod, n.ichimoku.senkouBPeriod, n.ichimoku.displacement) : null,
    parabolicSAR: n.parabolicSAR?.enabled ? lu(T, I, n.parabolicSAR.afStart, n.parabolicSAR.afStep, n.parabolicSAR.afMax) : null,
    keltner: n.keltner?.enabled ? su(T, I, h, n.keltner.emaPeriod, n.keltner.atrPeriod, n.keltner.multiplier) : null,
    pivotPoints: n.pivotPoints?.enabled ? nu(Ie, T, I, h) : null,
    supertrend: n.supertrend?.enabled ? tu(T, I, h, n.supertrend.period, n.supertrend.multiplier) : null,
    donchian: n.donchian?.enabled ? eu(T, I, n.donchian.period) : null,
    aroon: n.aroon?.enabled ? Qi(T, I, n.aroon.period) : null,
    envelopes: n.envelopes?.enabled ? Ji(h, n.envelopes.period, n.envelopes.percent) : null,
    dema: n.dema?.enabled ? Zi(h, n.dema.period) : null,
    tema: n.tema?.enabled ? Gi(h, n.tema.period) : null,
    hma: n.hma?.enabled ? qi(h, n.hma.period) : null,
    momentum: n.momentum?.enabled ? Ui(h, n.momentum.period) : null,
    awesomeOsc: n.awesomeOsc?.enabled ? Ki(T, I) : null,
    mfi: n.mfi?.enabled ? zi(T, I, h, ae, n.mfi.period) : null,
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
    obv: n.obv?.enabled ? Ai(h, ae) : null,
    cmf: n.cmf?.enabled ? Ei(T, I, h, ae, n.cmf.period) : null,
    adl: n.adl?.enabled ? Ni(T, I, h, ae) : null,
    forceIndex: n.forceIndex?.enabled ? Li(h, ae, n.forceIndex.period) : null,
    eom: n.eom?.enabled ? Pi(T, I, ae, n.eom.period) : null,
    volumeSma: n.volumeSma?.enabled ? Ri(ae, n.volumeSma.period) : null,
    fibRetracement: n.fibRetracement?.enabled ? ji(T, I, n.fibRetracement.lookback) : null,
    camarillaPivots: n.camarillaPivots?.enabled ? Mi(Ie, T, I, h) : null,
    woodiePivots: n.woodiePivots?.enabled ? Ti(Ie, T, I, h) : null,
    correlation: n.correlation?.enabled ? Ii(h, ae, n.correlation.period) : null,
    linearReg: n.linearReg?.enabled ? Ci(h, n.linearReg.period, n.linearReg.deviations) : null,
    coppock: n.coppock?.enabled ? Si(h, n.coppock.longROC, n.coppock.shortROC, n.coppock.wmaPeriod) : null,
    alma: n.alma?.enabled ? wi(h, n.alma.period, n.alma.offset, n.alma.sigma) : null,
    kama: n.kama?.enabled ? ki(h, n.kama.period, n.kama.fastPeriod, n.kama.slowPeriod) : null,
    zlema: n.zlema?.enabled ? yi(h, n.zlema.period) : null,
    t3: n.t3?.enabled ? vi(h, n.t3.period, n.t3.vFactor) : null,
    lsma: n.lsma?.enabled ? gi(h, n.lsma.period) : null,
    mcginley: n.mcginley?.enabled ? bi(h, n.mcginley.period) : null,
    vortex: n.vortex?.enabled ? xi(T, I, h, n.vortex.period) : null,
    choppiness: n.choppiness?.enabled ? mi(T, I, h, n.choppiness.period) : null,
    elderRay: n.elderRay?.enabled ? pi(T, I, h, n.elderRay.period) : null,
    massIndex: n.massIndex?.enabled ? fi(T, I, n.massIndex.period) : null,
    chandeKroll: n.chandeKroll?.enabled ? hi(T, I, h, n.chandeKroll.p, n.chandeKroll.q, n.chandeKroll.x) : null,
    chandelierExit: n.chandelierExit?.enabled ? di(T, I, h, n.chandelierExit.period, n.chandelierExit.multiplier) : null,
    linRegSlope: n.linRegSlope?.enabled ? ui(h, n.linRegSlope.period) : null,
    priceChannel: n.priceChannel?.enabled ? ii(T, I, n.priceChannel.period) : null,
    alligator: n.alligator?.enabled ? ci(h) : null,
    accBands: n.accBands?.enabled ? ai(T, I, h, n.accBands.period) : null,
    ppo: n.ppo?.enabled ? ri(h, n.ppo.fast, n.ppo.slow, n.ppo.signal) : null,
    pvo: n.pvo?.enabled ? oi(ae, n.pvo.fast, n.pvo.slow, n.pvo.signal) : null,
    cmo: n.cmo?.enabled ? li(h, n.cmo.period) : null,
    fisher: n.fisher?.enabled ? si(T, I, n.fisher.period) : null,
    stc: n.stc?.enabled ? ni(h, n.stc.fast, n.stc.slow, n.stc.cycle) : null,
    rviOsc: n.rviOsc?.enabled ? ti(le, T, I, h, n.rviOsc.period) : null,
    klinger: n.klinger?.enabled ? ei(T, I, h, ae, n.klinger.fast, n.klinger.slow, n.klinger.signal) : null,
    connorsRsi: n.connorsRsi?.enabled ? Qc(h, n.connorsRsi.rsiPeriod, n.connorsRsi.streakPeriod, n.connorsRsi.rankPeriod) : null,
    apo: n.apo?.enabled ? Jc(h, n.apo.fast, n.apo.slow) : null,
    qstick: n.qstick?.enabled ? Zc(le, h, n.qstick.period) : null,
    bop: n.bop?.enabled ? Gc(le, T, I, h, n.bop.period) : null,
    psychLine: n.psychLine?.enabled ? qc(h, n.psychLine.period) : null,
    pfe: n.pfe?.enabled ? Uc(h, n.pfe.period, n.pfe.smoothing) : null,
    smi: n.smi?.enabled ? Kc(T, I, h, n.smi.period, n.smi.smoothK, n.smi.smoothD) : null,
    ulcerIndex: n.ulcerIndex?.enabled ? zc(h, n.ulcerIndex.period) : null,
    natr: n.natr?.enabled ? Yc(T, I, h, n.natr.period) : null,
    trueRange: n.trueRange?.enabled ? Xc(T, I, h) : null,
    squeeze: n.squeeze?.enabled ? Vc(T, I, h, n.squeeze.bbPeriod, n.squeeze.bbMult, n.squeeze.kcPeriod, n.squeeze.kcMult) : null,
    relVolIndex: n.relVolIndex?.enabled ? Hc(h, n.relVolIndex.period, n.relVolIndex.smoothing) : null,
    vhf: n.vhf?.enabled ? $c(h, n.vhf.period) : null,
    vwma: n.vwma?.enabled ? _c(h, ae, n.vwma.period) : null,
    volumeOsc: n.volumeOsc?.enabled ? Oc(ae, n.volumeOsc.fast, n.volumeOsc.slow) : null,
    nvi: n.nvi?.enabled ? Fc(h, ae) : null,
    pvi: n.pvi?.enabled ? Wc(h, ae) : null,
    pvt: n.pvt?.enabled ? Bc(h, ae) : null,
    vroc: n.vroc?.enabled ? Dc(ae, n.vroc.period) : null,
    netVolume: n.netVolume?.enabled ? Ac(h, ae, n.netVolume.period) : null,
    twiggsMF: n.twiggsMF?.enabled ? Ec(T, I, h, ae, n.twiggsMF.period) : null,
    linRegRSquared: n.linRegRSquared?.enabled ? Nc(h, n.linRegRSquared.period) : null,
    medianPrice: n.medianPrice?.enabled ? Lc(T, I) : null,
    typicalPrice: n.typicalPrice?.enabled ? Pc(T, I, h) : null,
    weightedClose: n.weightedClose?.enabled ? Rc(T, I, h) : null,
    demarkPivots: n.demarkPivots?.enabled ? jc(Ie, T, I, le, h) : null,
    zigzag: n.zigzag?.enabled ? Mc(T, I, h, n.zigzag.deviation) : null,
    fractals: n.fractals?.enabled ? Tc(T, I) : null,
    gator: n.gator?.enabled ? Ic(h) : null,
    smmaOverlay: n.smmaOverlay?.enabled ? Dr(h, n.smmaOverlay.period) : null,
    wma: n.wma?.enabled ? Cc(h, n.wma.period) : null,
    customIndicators: (n.customIndicators || []).filter((te) => te.enabled).map((te) => {
      if (typeof te.expression == "string" && (te.expression.startsWith("brue:") || te.expression.startsWith("local:")) && Array.isArray(te.data) && te.data.length > 0)
        return te;
      const Ve = { closes: h, highs: T, lows: I, opens: le, volumes: ae, timestamps: Ie }, nt = Sc(te.expression, Ve);
      return { ...te, data: nt.errors.length === 0 ? nt.data : new Array(h.length).fill(NaN) };
    })
  };
}
function td(l, n) {
  if (n <= 0) return l;
  const h = new Array(n).fill(NaN), T = {};
  for (const I of Object.keys(l)) {
    const le = l[I];
    if (le == null) {
      T[I] = le;
      continue;
    }
    if (Array.isArray(le)) {
      le.length > 0 && typeof le[0] == "object" && le[0] !== null && "data" in le[0] ? T[I] = le.map((ae) => ({ ...ae, data: h.concat(ae.data || []) })) : T[I] = h.concat(le);
      continue;
    }
    if (typeof le == "object") {
      const ae = {};
      for (const Ie of Object.keys(le)) {
        const r = le[Ie];
        if (Array.isArray(r)) ae[Ie] = h.concat(r);
        else if (typeof r == "object" && r !== null) {
          const ve = {};
          for (const te of Object.keys(r)) {
            const Ve = r[te];
            ve[te] = Array.isArray(Ve) ? h.concat(Ve) : Ve;
          }
          ae[Ie] = ve;
        } else ae[Ie] = r;
      }
      T[I] = ae;
      continue;
    }
    T[I] = le;
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
  const [T, I] = o.useState(null), [le, ae] = o.useState(!1), [Ie, r] = o.useState(null), ve = o.useRef(null), te = o.useRef(null), Ve = o.useRef(0), nt = o.useRef(null), Le = o.useCallback((Oe) => {
    const { id: ye, result: ze, error: xe, durationMs: Re } = Oe.data;
    if (!(nt.current !== null && ye !== nt.current)) {
      if (nt.current = null, ae(!1), xe) {
        console.warn("[indicatorWorker] error", xe);
        return;
      }
      Re !== void 0 && r(Re), l.length > 0 && (Ve.current = l[0].close), te.current = ze, I(ze);
    }
  }, [l]);
  return o.useEffect(() => {
    const Oe = Or();
    return Oe.addEventListener("message", Le), () => Oe.removeEventListener("message", Le);
  }, [Le]), o.useEffect(() => {
    if (!n || l.length === 0) {
      I(null);
      return;
    }
    const Oe = l.length > 0 ? l[0].close : 0;
    if (h.current && te.current && Ve.current === Oe)
      return;
    const ye = ve.current;
    let ze, xe, Re, Ae, _e, D, X = null;
    const De = ye && ye.candles !== l && l.length >= ye.closes.length && l.length > 0 && ye.closes.length > 0 && l[0].time === ye.timestamps[0] && ye.closes.length > 10;
    let ee = 0;
    const we = !De && ye && ye.candles !== l && l.length > ye.closes.length && ye.closes.length > 10 && l.length - ye.closes.length > 0 && l[l.length - ye.closes.length]?.time === ye.timestamps[0];
    if (we && (ee = l.length - ye.closes.length), De) {
      const qe = ye.closes.length, xt = Math.max(0, qe - 1);
      ze = ye.closes, xe = ye.highs, Re = ye.lows, Ae = ye.opens, _e = ye.volumes, D = ye.timestamps, ze.length = xt, xe.length = xt, Re.length = xt, Ae.length = xt, _e.length = xt, D.length = xt;
      for (let Tt = xt; Tt < l.length; Tt++) {
        const Lt = l[Tt];
        ze.push(Lt.close), xe.push(Lt.high), Re.push(Lt.low), Ae.push(Lt.open), _e.push(Lt.volume || 0), D.push(Lt.time);
      }
      X = { closes: ze, highs: xe, lows: Re, opens: Ae, volumes: _e, timestamps: D }, ve.current = { candles: l, closes: ze, highs: xe, lows: Re, opens: Ae, volumes: _e, timestamps: D };
      const nn = Object.values(n).filter((Tt) => Tt?.enabled).length;
      if (!(l.length > 3e3 && nn > 3)) {
        const Tt = performance.now(), Lt = Fr(X, n), sn = performance.now() - Tt;
        r(sn), te.current = Lt, Ve.current = Oe, I(Lt);
        return;
      }
    } else if (we && te.current) {
      const qe = new Array(ee), xt = new Array(ee), nn = new Array(ee), wn = new Array(ee), Tt = new Array(ee), Lt = new Array(ee);
      for (let Kt = 0; Kt < ee; Kt++) {
        const cn = l[Kt];
        qe[Kt] = cn.close, xt[Kt] = cn.high, nn[Kt] = cn.low, wn[Kt] = cn.open, Tt[Kt] = cn.volume || 0, Lt[Kt] = cn.time;
      }
      ze = qe.concat(ye.closes), xe = xt.concat(ye.highs), Re = nn.concat(ye.lows), Ae = wn.concat(ye.opens), _e = Tt.concat(ye.volumes), D = Lt.concat(ye.timestamps);
      const sn = td(te.current, ee);
      ve.current = { candles: l, closes: ze, highs: xe, lows: Re, opens: Ae, volumes: _e, timestamps: D }, te.current = sn, Ve.current = Oe, I(sn);
      return;
    } else
      ze = l.map((qe) => qe.close), xe = l.map((qe) => qe.high), Re = l.map((qe) => qe.low), Ae = l.map((qe) => qe.open), _e = l.map((qe) => qe.volume || 0), D = l.map((qe) => qe.time), X = { closes: ze, highs: xe, lows: Re, opens: Ae, volumes: _e, timestamps: D }, ve.current = { candles: l, closes: ze, highs: xe, lows: Re, opens: Ae, volumes: _e, timestamps: D };
    X || (X = { closes: ze, highs: xe, lows: Re, opens: Ae, volumes: _e, timestamps: D });
    const tt = Object.values(n).filter((qe) => qe?.enabled).length;
    if (!(l.length > 1e3 || tt > 5 || (n.customIndicators?.filter((qe) => qe.enabled)?.length || 0) > 0)) {
      const qe = performance.now(), xt = Fr(X, n), nn = performance.now() - qe;
      r(nn), te.current = xt, Ve.current = Oe, I(xt);
      return;
    }
    ae(!0);
    const Wt = Or(), zt = ++nd;
    nt.current = zt, Wt.postMessage({ id: zt, price: X, indicators: n });
  }, [l, n, h]), { indicatorData: T, isComputing: le, computeDurationMs: Ie };
}
function fl(l) {
  const {
    ctx: n,
    candles: h,
    startIndex: T,
    indexToX: I,
    priceToY: le,
    morphAt: ae,
    candleBodyWidth: Ie,
    wickWidth: r,
    colors: ve
  } = l, te = new Path2D(), Ve = new Path2D(), nt = Ie / 2, Le = h.length, Oe = new Float64Array(Le), ye = new Float64Array(Le), ze = new Float64Array(Le), xe = new Float64Array(Le), Re = new Float64Array(Le), Ae = new Float64Array(Le), _e = new Float64Array(Le), D = new Float64Array(Le);
  let X = 0, De = 0;
  for (let ee = 0; ee < h.length; ee++) {
    const we = ae(ee, h[ee]), tt = I(T + ee, T), Be = le(we.open), Wt = le(we.close), zt = le(we.high), qe = le(we.low), xt = Math.min(Be, Wt), nn = Math.max(1, Math.abs(Wt - Be));
    we.close >= we.open ? (te.moveTo(tt, zt), te.lineTo(tt, qe), Oe[X] = tt - nt, ye[X] = xt, ze[X] = Ie, xe[X] = nn, X++) : (Ve.moveTo(tt, zt), Ve.lineTo(tt, qe), Re[De] = tt - nt, Ae[De] = xt, _e[De] = Ie, D[De] = nn, De++);
  }
  if (n.lineWidth = r, n.lineCap = "round", X) {
    n.strokeStyle = ve.bullishWick, n.stroke(te), n.fillStyle = ve.bullish;
    for (let ee = 0; ee < X; ee++)
      n.fillRect(Oe[ee], ye[ee], ze[ee], xe[ee]);
  }
  if (De) {
    n.strokeStyle = ve.bearishWick, n.stroke(Ve), n.fillStyle = ve.bearish;
    for (let ee = 0; ee < De; ee++)
      n.fillRect(Re[ee], Ae[ee], _e[ee], D[ee]);
  }
  if (n.lineCap = "butt", n.lineWidth = 1, X) {
    n.strokeStyle = ve.bullishBorder;
    for (let ee = 0; ee < X; ee++)
      n.strokeRect(Oe[ee], ye[ee], ze[ee], xe[ee]);
  }
  if (De) {
    n.strokeStyle = ve.bearishBorder;
    for (let ee = 0; ee < De; ee++)
      n.strokeRect(Re[ee], Ae[ee], _e[ee], D[ee]);
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
  onCrosshairMove: le,
  syncedCrosshairTime: ae,
  colors: Ie,
  indicators: r,
  onIndicatorsChange: ve,
  onRemoveBruePlot: te,
  onRemoveEngineIndicator: Ve,
  onEditEngineIndicator: nt,
  onConverterReady: Le,
  onVisibleRangeChange: Oe,
  onViewportTimeChange: ye,
  syncedViewportTime: ze,
  disableAutoFollow: xe = !1,
  scrollToIndex: Re,
  chartType: Ae = "candlestick",
  onScrollingChange: _e,
  onScrollSync: D,
  scrollOffsetRef: X,
  optionsPdfEnabled: De = !1,
  heatmapEnabled: ee = !1,
  externalDimensions: we,
  economicEvents: tt,
  positionLines: Be,
  onPositionModify: Wt,
  onPositionClose: zt,
  autoSelectPositionId: qe,
  l2DepthData: xt,
  onOpenSettings: nn,
  onOpenCustomEditor: wn,
  showBidAskSpread: Tt = !1,
  brokerBid: Lt = null,
  brokerAsk: sn = null,
  showSessions: Kt = !1,
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
  const ot = o.useRef(null), Cl = o.useRef(null), Je = o.useRef(null), Ds = o.useRef(null), Us = o.useRef(!1), qs = o.useRef(null);
  o.useRef(null);
  const Il = o.useRef(l), Tl = o.useRef(ae ?? null), Bs = o.useRef(!1), Gs = o.useRef(null), Sn = typeof window < "u" ? Math.min(window.devicePixelRatio || 1, 2) : 1, [fe, Zs] = o.useState({ width: 300, height: 300 }), [ce, Nt] = o.useState({
    startIndex: 0,
    candleWidth: 3,
    // Zoomed out default - shows more candles on first load
    // Backtest/replay mode has no future candles arriving, so zero right-side padding.
    // TERMINAL DIVERGENCE from the site port: the site keeps 35 future candles
    // for economic event flags, but the terminal draws no flags on the chart
    // (ECONOMIC is its own tab), so that margin was pure dead space on the
    // right and was dropped.
    futureSpace: 0,
    autoFollowLatest: !xe
    // Start disabled if in replay mode
  }), Pe = o.useRef({
    startIndex: 0,
    candleWidth: 3
  }), Yn = o.useRef({
    startIndex: 0,
    candleWidth: 3
  }), Mt = o.useRef(!1), un = o.useRef(!1), Ne = o.useRef(null), ut = o.useRef(null), ct = o.useRef(null), it = o.useRef(null), Fn = o.useRef(null), zn = o.useRef(0), [, ln] = o.useState(0), ls = o.useRef(null), Kn = (a) => {
    const p = Ne.current, x = ls.current;
    if (p && x && x.posId === p) return x.offset;
    const v = on.current, f = v && v.range > 0 ? v.range * 0.18 : a * 5e-3;
    return ls.current = p && f > 0 ? { posId: p, offset: f } : null, f;
  }, Js = o.useRef(null);
  o.useEffect(() => {
    if (qe && qe !== Js.current && Be) {
      const a = Be.find((p) => p.id === qe);
      a && (Js.current = qe, Ne.current = a.id, ut.current = a.stopLoss ?? null, ct.current = a.takeProfit ?? null, ln((p) => p + 1));
    }
  }, [qe, Be]);
  const os = o.useRef(0), Ft = o.useCallback((a) => {
    Mt.current = a, un.current !== a && (un.current = a, _e?.(a), a || (os.current = Pe.current.startIndex, X && (X.current = 0)));
  }, [_e, X]), St = o.useCallback(() => {
    if (X) {
      const a = Pe.current.startIndex, p = Pe.current.candleWidth * (1 + Ye), x = a - os.current;
      X.current = x * p;
    }
    D?.();
  }, [D, X]), Un = o.useRef(St);
  Un.current = St;
  const Cn = o.useRef(null), On = o.useRef(null), qn = o.useRef(null), Ws = o.useRef(!1), st = o.useCallback((a = !1) => {
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
  const Gn = o.useRef(null), rs = o.useRef(0), Ml = o.useRef(0), In = o.useRef(!1), Qs = o.useRef(0), Tn = o.useRef(null), Cs = o.useRef(void 0), _n = o.useRef(null), Jt = o.useRef("standard"), [Mn, as] = o.useState([]), ft = o.useRef(null), dn = o.useRef(null), Is = o.useRef([]), Ts = o.useRef(null), pn = o.useRef(null), [jn, cs] = o.useState(!1), [mn, jl] = o.useState({ x: 0, y: 0, startIndex: 0, priceOffset: 0 }), [Rl, Pl] = o.useState(0), [ro, Ll] = o.useState(1), pt = o.useRef(null), Ct = o.useRef(null), Rn = o.useRef(0), el = o.useRef(null), rt = o.useRef(null), [Pn, is] = o.useState(!1), us = o.useRef(null), Fs = o.useRef(0), Os = o.useRef(0), Ln = o.useRef(!1);
  o.useRef(0), o.useRef(0);
  const xn = o.useRef(null), $n = o.useRef(null), bn = o.useRef(null), ao = o.useRef(null), y = "ns-resize", ne = "ns-resize";
  o.useRef(12), o.useRef(0), o.useRef(0);
  const [G, ge] = o.useState(0.15), [vt, Ee] = o.useState(!1), Et = o.useRef({ y: 0, ratio: 0 });
  o.useRef(null);
  const [Vt, We] = o.useState(1), [bt, ds] = o.useState(0), [Ut, jt] = o.useState(null), [At, Qr] = o.useState(null), [Jo, co] = o.useState(!1), [Qo, ea] = o.useState(!1), tl = o.useRef({ y: 0, scale: 1, offset: 0 }), hs = Ut !== null, gn = o.useRef(1), Zn = o.useRef(0), Jn = o.useRef(null), on = o.useRef(null), rn = o.useRef(0), Ms = o.useRef(null), [Qn, ta] = xu("preferences.chartShowOHLC", !0), [er, na] = o.useState(0), [nl, tr] = o.useState(!1), [rh, sa] = o.useState(0), io = o.useRef(null), uo = o.useRef(!1);
  o.useEffect(() => {
    if (!nl) return;
    const a = setInterval(() => sa((p) => p + 1), 3e4);
    return () => clearInterval(a);
  }, [nl]), o.useEffect(() => {
    tt && tt.length > 0 && bu(tt.map((a) => a.region_code));
  }, [tt]), o.useEffect(() => {
    if (!nl) return;
    const a = (p) => {
      io.current && !io.current.contains(p.target) && tr(!1);
    };
    return document.addEventListener("mousedown", a), () => document.removeEventListener("mousedown", a);
  }, [nl]);
  const [ho, la] = o.useState(0), [fo, oa] = o.useState(0), [po, ra] = o.useState(0), [mo, aa] = o.useState(0), [xo, ca] = o.useState(0), _s = o.useRef({}), [at, ia] = o.useState({}), Hn = o.useRef({}), [nr, ua] = o.useState({}), [sr, bo] = o.useState(null), [sl, $s] = o.useState(null), Qt = o.useRef({});
  o.useRef(null);
  const lr = o.useRef(!1), en = o.useRef(!1), gt = o.useRef(null), [da, be] = o.useState(null), [It, he] = o.useState(null), [Nn, yt] = o.useState(null), or = typeof navigator < "u" && /Mac|iPhone|iPad|iPod/.test(navigator.platform), [ll, ha] = o.useState(or ? 8 : 2), go = o.useRef(or), ol = lo(), vo = o.useRef(ol);
  vo.current = ol, o.useEffect(() => {
    ol.chart?.scrollSensitivity !== void 0 && ha(ol.chart.scrollSensitivity);
  }, [ol.chart?.scrollSensitivity]);
  const se = { ...oo(), ...Ie }, rr = typeof document < "u" && document.documentElement.classList.contains("dark");
  o.useEffect(() => {
    Mt.current || (Pe.current = {
      startIndex: ce.startIndex,
      candleWidth: ce.candleWidth
    });
  }, [ce.startIndex, ce.candleWidth]), o.useEffect(() => {
    gn.current = Vt, Zn.current = bt;
  }, [Vt, bt]), o.useEffect(() => {
    if (!ce.autoFollowLatest) return;
    const a = setInterval(() => {
      Pl((p) => (p + 0.1) % (Math.PI * 2)), Ll(0.85 + Math.sin(Date.now() / 1e3) * 0.15);
    }, 150);
    return () => clearInterval(a);
  }, [ce.autoFollowLatest]), o.useEffect(() => {
    Il.current = l;
    const a = l[l.length - 1];
    a && (qs.current = {
      time: a.time,
      open: a.open,
      high: a.high,
      low: a.low,
      close: a.close
    }, ce.autoFollowLatest && Cn.current && Cn.current(!0));
  }, [l, ce.autoFollowLatest]), o.useEffect(() => {
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
    if (!p || !De) {
      bo(null);
      return;
    }
    const x = async () => {
      try {
        const f = [];
        if (!f || f.length === 0) {
          bo(null);
          return;
        }
        const e = f[0], O = l[l.length - 1]?.close || parseFloat(e.current_price), H = parseFloat(e.current_price), U = H > 0 ? O / H : 1;
        let _ = 0;
        if (e.expiration) {
          const Y = new Date(e.expiration).getTime();
          Number.isNaN(Y) || (_ = Math.max(0, (Y - Date.now()) / (365 * 24 * 3600 * 1e3)));
        }
        const b = Math.exp(p.etfDragPerYear * _), w = U * b;
        let A = [];
        e.density_curve && Array.isArray(e.density_curve) && (A = e.density_curve.map((Y) => ({
          p: Y.p * w,
          d: Y.d
        }))), bo({
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
    x();
    const v = setInterval(x, 6e4);
    return () => clearInterval(v);
  }, [h, De]), o.useEffect(() => {
    if (!ee || !h) {
      as([]);
      return;
    }
    const a = async () => {
      try {
        const x = h.includes("/") ? h : h.length === 6 ? `${h.substring(0, 3)}/${h.substring(3)}` : h, v = await $u("l2_heatmap_snapshots", {
          params: { symbol: `eq.${x}`, order: "timestamp.desc", limit: "300" }
        });
        v && v.length > 0 && as(v.reverse());
      } catch (x) {
        console.error("Failed to fetch heatmap data:", x);
      }
    };
    a();
    const p = setInterval(a, 5e3);
    return () => clearInterval(p);
  }, [h, ee]), o.useEffect(() => () => {
    pt.current !== null && cancelAnimationFrame(pt.current), dn.current !== null && cancelAnimationFrame(dn.current), xn.current !== null && cancelAnimationFrame(xn.current), $n.current !== null && cancelAnimationFrame($n.current), bn.current !== null && cancelAnimationFrame(bn.current), Ct.current !== null && clearTimeout(Ct.current), Jn.current !== null && clearTimeout(Jn.current);
  }, []);
  const { isPhone: fa, isDesktop: Nl } = gu(fe.width), Xe = o.useMemo(() => vu(fe.width), [fe.width]), ar = fa, cr = n || (l.length > 0 ? l[l.length - 1]?.close : 100), Ke = o.useMemo(() => yu(ar, h, cr || 100, Xn), [ar, Nl, h, cr, Xn]), kt = Xe.timeAxisHeight, El = Xe.priceLabelFont, ir = Xe.timeLabelFont, Xt = Xe.subplotLabelFont, Al = 1, Dl = 50, fs = o.useMemo(() => {
    const a = [], x = Math.pow(Dl / Al, 0.025);
    for (let v = 0; v <= 40; v++)
      a.push(Al * Math.pow(x, v));
    return a;
  }, []), En = o.useCallback((a = !1) => {
    const p = fe.width - Ke, x = a && Mt.current ? Pe.current : ce, v = x.candleWidth * (1 + Ye), f = Math.floor(p / v), e = Math.max(0, Math.floor(x.startIndex)), O = Math.min(l.length, e + f);
    return {
      candles: l.slice(e, O),
      startIndex: e,
      endIndex: O,
      visibleCount: f,
      totalWithFuture: f + ce.futureSpace,
      candleWidth: x.candleWidth
    };
  }, [l, fe.width, ce]);
  o.useEffect(() => {
    if (l.length > 0) {
      const a = fe.width - Ke, p = ce.candleWidth * (1 + Ye), x = Math.floor(a / p), v = Math.max(0, Math.floor(ce.startIndex)), f = Math.min(l.length, v + x);
      Oe && Oe({ startIndex: v, endIndex: f, totalCandles: l.length }), As && v < 2500 && !wl && !Ln.current && !ce.autoFollowLatest && (Tn.current && clearTimeout(Tn.current), Tn.current = setTimeout(() => {
        Ln.current || As();
      }, 100));
    }
  }, [Oe, As, wl, l.length, ce.startIndex, ce.candleWidth, fe.width, ce.autoFollowLatest]), o.useEffect(() => {
    if (!ye || l.length === 0) return;
    if (Bs.current) {
      Bs.current = !1;
      return;
    }
    const a = fe.width - Ke, p = ce.candleWidth * (1 + Ye), x = Math.floor(a / p), v = Math.max(0, Math.floor(ce.startIndex)), f = Math.min(l.length, v + x), e = l.slice(v, f);
    if (e.length === 0) return;
    const O = Math.floor(e.length / 2), H = e[O];
    H && H.time !== Gs.current && (Gs.current = H.time, ye(H.time));
  }, [ye, l, ce.startIndex, ce.candleWidth, fe.width]), o.useEffect(() => {
    if (!ze || l.length === 0 || ze === Gs.current) return;
    let a = -1, p = 1 / 0;
    for (let A = 0; A < l.length; A++) {
      const Y = Math.abs(l[A].time - ze);
      Y < p && (p = Y, a = A);
    }
    if (a === -1) return;
    const x = fe.width - Ke, v = ce.candleWidth * (1 + Ye), f = Math.floor(x / v), e = Math.max(0, Math.floor(ce.startIndex)), O = Math.min(l.length, e + f), H = Math.floor(f / 2), U = Math.max(0, a - H), _ = a >= e && a < O, b = e + Math.floor(f / 2);
    (!_ || Math.abs(a - b) > H / 2) && (Bs.current = !0, Nt((A) => ({
      ...A,
      startIndex: U,
      autoFollowLatest: !1
    })), Pe.current.startIndex = U);
  }, [ze, l, fe.width, ce.candleWidth, ce.startIndex]);
  const js = o.useCallback((a, p = !0) => {
    if (Ut !== null && At !== null) {
      const U = gn.current, _ = Zn.current, b = At / U, w = Ut + _;
      return {
        min: w - b / 2,
        max: w + b / 2,
        range: b
      };
    }
    if (a.length === 0)
      return { min: 0, max: 100, range: 100 };
    let x = 1 / 0, v = -1 / 0;
    for (const U of a)
      U.low < x && (x = U.low), U.high > v && (v = U.high);
    p && n && (n < x && (x = n), n > v && (v = n));
    const f = v - x, e = f * 0.05, O = (v + x) / 2, H = f + e * 2;
    return {
      min: O - H / 2,
      max: O + H / 2,
      range: H
    };
  }, [n, Ut, At]), dt = o.useCallback((a, p) => {
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
    ].filter((H) => r?.[H]?.enabled).length, f = fe.height - kt, e = v > 0 ? Math.max(60 * v, f * G) : 0, O = f - e;
    return O - (a - p.min) / p.range * O;
  }, [fe.height, r, l, G]), ur = o.useCallback((a, p) => {
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
    ].filter((H) => r?.[H]?.enabled).length, f = fe.height - kt, e = v > 0 ? Math.max(60 * v, f * G) : 0, O = f - e;
    return p.max - a / O * p.range;
  }, [fe.height, r, l, G]), dr = o.useCallback((a, p) => {
    const x = ce.candleWidth * (1 + Ye);
    return (a - p) * x + x / 2;
  }, [ce.candleWidth]), rl = o.useCallback((a, p) => {
    const x = ce.candleWidth * (1 + Ye);
    return Math.floor(a / x) + p;
  }, [ce.candleWidth]), An = o.useCallback((a) => ku(a, h), [h]), Rs = o.useCallback((a) => {
    const p = new Date(a);
    if (T === "local") {
      const x = p.getHours().toString().padStart(2, "0"), v = p.getMinutes().toString().padStart(2, "0");
      return `${x}:${v}`;
    } else if (T === "UTC") {
      const x = p.getUTCHours().toString().padStart(2, "0"), v = p.getUTCMinutes().toString().padStart(2, "0");
      return `${x}:${v}`;
    } else
      try {
        return p.toLocaleTimeString("en-GB", {
          timeZone: T,
          hour: "2-digit",
          minute: "2-digit",
          hour12: !1
        });
      } catch {
        const x = p.getUTCHours().toString().padStart(2, "0"), v = p.getUTCMinutes().toString().padStart(2, "0");
        return `${x}:${v}`;
      }
  }, [T]), es = o.useCallback((a, p = !1) => {
    const x = new Date(a);
    if (T === "local") {
      const v = x.getDate(), f = x.toLocaleString("en", { month: "short" }), e = String(x.getFullYear()).slice(-2);
      return p ? `${v} ${f} '${e}` : `${v} ${f}`;
    } else if (T === "UTC") {
      const v = x.getUTCDate(), f = x.toLocaleString("en", { month: "short", timeZone: "UTC" }), e = String(x.getUTCFullYear()).slice(-2);
      return p ? `${v} ${f} '${e}` : `${v} ${f}`;
    } else
      try {
        const v = x.toLocaleDateString("en-GB", { timeZone: T, day: "numeric" }), f = x.toLocaleDateString("en-GB", { timeZone: T, month: "short" }), e = x.toLocaleDateString("en-GB", { timeZone: T, year: "2-digit" });
        return p ? `${v} ${f} '${e}` : `${v} ${f}`;
      } catch {
        const v = x.getUTCDate(), f = x.toLocaleString("en", { month: "short", timeZone: "UTC" }), e = String(x.getUTCFullYear()).slice(-2);
        return p ? `${v} ${f} '${e}` : `${v} ${f}`;
      }
  }, [T]), hr = o.useCallback((a) => {
    const p = new Date(a), x = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    if (T === "local") return x[p.getDay()];
    if (T === "UTC") return x[p.getUTCDay()];
    try {
      return p.toLocaleDateString("en-GB", { timeZone: T, weekday: "short" });
    } catch {
      return x[p.getUTCDay()];
    }
  }, [T]), pa = (a, p) => {
    const x = a / p, v = Math.pow(10, Math.floor(Math.log10(x))), f = x / v;
    let e;
    return f <= 1 ? e = 1 : f <= 2 ? e = 2 : f <= 5 ? e = 5 : e = 10, e * v;
  };
  o.useRef(null);
  const { indicatorData: s } = sd(l, r, Mt), ps = o.useCallback((a = !1) => {
    const p = Cl.current;
    if (!p) return;
    const { width: x, height: v } = fe;
    Ds.current || (Ds.current = document.createElement("canvas"));
    const f = Ds.current;
    (f.width !== p.width || f.height !== p.height) && (f.width = p.width, f.height = p.height);
    const e = f.getContext("2d");
    if (!e) return;
    const O = !1;
    e.setTransform(Sn, 0, 0, Sn, 0, 0);
    const H = !!s?.rsi, U = !!s?.macd, _ = !!s?.atr, b = !!s?.stochastic, w = r?.volume?.enabled && l.some((B) => B.volume !== void 0 && B.volume > 0), A = !!s?.williamsR, Y = !!s?.cci, u = !!s?.adx, L = !!s?.roc, m = !!s?.aroon, V = !!s?.momentum, d = !!s?.ao, j = !!s?.mfi, ie = !!s?.tsi, Fe = !!s?.trix, Q = !!s?.ultimateOsc, $e = !!s?.dpo, Z = !!s?.kst, Te = !!s?.stochRsi, Ge = !!s?.bbPercent, He = !!s?.bbWidth, ue = !!s?.histVol, Me = !!s?.chaikinVol, et = !!s?.stdDev, Ue = !!s?.obv, _t = !!s?.cmf, vn = !!s?.adl, qt = !!s?.forceIndex, _l = !!s?.eom, Rt = !!s?.correlation, bs = !!s?.coppock, cl = !!s?.vortex, $l = !!s?.choppiness, To = !!s?.elderRay, Mo = !!s?.massIndex, jo = !!s?.linRegSlope, Aa = !!s?.ppo, Da = !!s?.pvo, Ba = !!s?.cmo, Wa = !!s?.fisher, Fa = !!s?.stc, Oa = !!s?.rviOsc, _a = !!s?.klinger, $a = !!s?.connorsRsi, Ha = !!s?.apo, Va = !!s?.qstick, Xa = !!s?.bop, Ya = !!s?.psychLine, za = !!s?.pfe, Ka = !!s?.smi, Ua = !!s?.ulcerIndex, qa = !!s?.natr, Ga = !!s?.trueRange, Za = !!s?.squeeze, Ja = !!s?.relVolIndex, Qa = !!s?.vhf, ec = !!s?.volumeOsc, tc = !!s?.nvi, nc = !!s?.pvi, sc = !!s?.pvt, lc = !!s?.vroc, oc = !!s?.netVolume, rc = !!s?.twiggsMF, ac = !!s?.linRegRSquared, cc = !!s?.gator, Hl = [
      H,
      U,
      _,
      b,
      A,
      Y,
      u,
      L,
      m,
      V,
      d,
      j,
      ie,
      Fe,
      Q,
      $e,
      Z,
      Te,
      Ge,
      He,
      ue,
      Me,
      et,
      Ue,
      _t,
      vn,
      qt,
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
    ].filter(Boolean).length + (s?.customIndicators?.filter((B) => B.display === "subplot").length || 0), kr = v - kt, wr = Hl > 0 ? Math.max(60 * Hl, kr * G) : 0, ts = Hl > 0 ? wr / Hl : 0, je = kr - wr, q = x - Ke;
    e.fillStyle = se.background, e.fillRect(0, 0, x, v);
    const c = En(!0), hn = Mt.current ? Pe.current.candleWidth : ce.candleWidth, Qe = js(c.candles, ce.autoFollowLatest);
    on.current = Qe, rn.current = je;
    const Sr = Mt.current ? Pe.current.startIndex : ce.startIndex, ic = (Sr - c.startIndex) * (hn * (1 + Ye)), me = (B, i) => {
      const M = hn * (1 + Ye);
      return (B - i) * M + M / 2 - ic;
    }, lt = (B) => {
      const i = (B - Qe.min) / Qe.range;
      return je - i * je;
    }, Vl = (se.gridOpacity ?? 100) / 100;
    e.globalAlpha = Vl, e.strokeStyle = se.grid, e.lineWidth = 0.5, e.setLineDash([]);
    const uc = vo.current?.chart?.gridHorizontalLines, dc = vo.current?.chart?.gridVerticalLines, hc = Nl ? uc ?? Xe.priceTargetLabels : Xe.priceTargetLabels, Xl = pa(Qe.range, hc), Cr = Math.ceil(Qe.min / Xl) * Xl, fc = c.startIndex + c.candles.length - 1, pc = me(l.length - 1, c.startIndex) <= q ? q : Math.max(0, Math.min(q, me(fc, c.startIndex) + hn / 2)), Ir = 25;
    e.beginPath();
    let Tr = -1 / 0;
    for (let B = Cr; B <= Qe.max; B += Xl) {
      const i = lt(B);
      Math.abs(i - Tr) < Ir || (Tr = i, e.moveTo(0, i), e.lineTo(pc, i));
    }
    e.stroke(), e.setLineDash([]), e.globalAlpha = 1;
    const Mr = hn * (1 + Ye), Ro = Math.ceil(q / Mr), Po = c.startIndex + Ro, mc = Nl ? dc ?? Xe.targetLinesOnScreen : Xe.targetLinesOnScreen, xc = Math.max(1, Math.round(Ro / mc)), Hs = Math.max(1, xc), jr = Hs / 2, bc = Ro / Hs, Rr = Math.max(0, Math.min(
      1,
      (bc - 8) / 6
    )), Pr = Hs / 2, Lr = Xe.tertiaryGridVisible ? Math.max(0, Math.min(
      0.5,
      (3 - Mr) / 1.5
    )) : 0;
    e.globalAlpha = Vl, e.strokeStyle = se.grid, e.beginPath();
    const Lo = c.startIndex;
    for (let B = Lo; B <= Po; B += Hs) {
      const i = me(B, c.startIndex);
      if (i >= 0 && i <= q && (e.moveTo(i, 0), e.lineTo(i, je)), i > q) break;
    }
    if (e.stroke(), Rr > 0.01 && jr >= 1) {
      e.globalAlpha = Rr * Vl, e.strokeStyle = se.grid, e.beginPath();
      const B = c.startIndex;
      for (let i = B; i <= Po; i += jr) {
        if ((i - Lo) % Hs === 0) continue;
        const M = me(i, c.startIndex);
        if (M >= 0 && M <= q && (e.moveTo(M, 0), e.lineTo(M, je)), M > q) break;
      }
      e.stroke(), e.globalAlpha = 1;
    }
    if (Lr > 0.01 && Pr >= 1) {
      e.globalAlpha = Lr * Vl, e.strokeStyle = se.grid, e.beginPath();
      const B = c.startIndex;
      for (let i = B; i <= Po; i += Pr) {
        if ((i - Lo) % Hs === 0) continue;
        const M = me(i, c.startIndex);
        if (M >= 0 && M <= q && (e.moveTo(M, 0), e.lineTo(M, je)), M > q) break;
      }
      e.stroke(), e.globalAlpha = 1;
    }
    e.globalAlpha = 1, e.strokeStyle = se.axisLine || se.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(q, 0), e.lineTo(q, v), e.stroke(), e.save(), e.beginPath(), e.rect(0, 0, q, je), e.clip();
    const No = {
      ctx: e,
      chartWidth: q,
      mainChartHeight: je,
      candles: l,
      visible: c,
      indexToX: me,
      mainPriceToY: lt,
      currentCandleWidth: hn
    };
    if (De && sr && wu(No, sr), ee && Mn.length > 0 && Su(No, Mn), xt && (xt.bids.length > 0 || xt.asks.length > 0) && Cu(No, xt), Kt) {
      const B = {
        ctx: e,
        chartWidth: q,
        mainChartHeight: je,
        candles: l,
        visibleStartIndex: c.startIndex,
        visibleEndIndex: c.startIndex + c.candles.length,
        candleWidth: hn,
        indexToX: me,
        isDark: rr,
        timeframe: cn
      };
      Iu(B);
    }
    const Dn = Math.max(hn * 0.7, 3), il = Math.max(1, Dn * 0.15), Eo = qs.current, gc = l.length - 1, Ps = (B, i) => Eo && c.startIndex + B === gc && Eo.time === i.time ? Eo : i;
    if (Ae === "candlestick")
      fl({
        ctx: e,
        candles: c.candles,
        startIndex: c.startIndex,
        indexToX: me,
        priceToY: lt,
        morphAt: Ps,
        candleBodyWidth: Dn,
        wickWidth: il,
        colors: {
          bullish: se.bullish,
          bearish: se.bearish,
          bullishWick: se.bullishWick,
          bearishWick: se.bearishWick,
          bullishBorder: se.bullishBorder,
          bearishBorder: se.bearishBorder
        }
      });
    else if (Ae === "line")
      e.strokeStyle = se.bullish, e.lineWidth = 2, e.beginPath(), c.candles.forEach((B, i) => {
        const M = me(c.startIndex + i, c.startIndex), g = lt(Ps(i, B).close);
        i === 0 ? e.moveTo(M, g) : e.lineTo(M, g);
      }), e.stroke();
    else if (Ae === "area") {
      const B = e.createLinearGradient(0, 0, 0, je);
      if (B.addColorStop(0, "rgba(34, 197, 94, 0.4)"), B.addColorStop(1, "rgba(34, 197, 94, 0.02)"), e.beginPath(), c.candles.forEach((i, M) => {
        const g = me(c.startIndex + M, c.startIndex), C = lt(Ps(M, i).close);
        M === 0 ? e.moveTo(g, C) : e.lineTo(g, C);
      }), c.candles.length > 0) {
        const i = me(c.startIndex + c.candles.length - 1, c.startIndex), M = me(c.startIndex, c.startIndex);
        e.lineTo(i, je), e.lineTo(M, je), e.closePath(), e.fillStyle = B, e.fill();
      }
      e.strokeStyle = se.bullish, e.lineWidth = 2, e.beginPath(), c.candles.forEach((i, M) => {
        const g = me(c.startIndex + M, c.startIndex), C = lt(Ps(M, i).close);
        M === 0 ? e.moveTo(g, C) : e.lineTo(g, C);
      }), e.stroke();
    } else if (Ae === "heikin_ashi") {
      let B = c.candles[0]?.open || 0, i = c.candles[0]?.close || 0;
      const M = c.candles.map((g, C) => {
        const k = (g.open + g.high + g.low + g.close) / 4, N = C === 0 ? (g.open + g.close) / 2 : (B + i) / 2, W = Math.max(g.high, N, k), F = Math.min(g.low, N, k), E = { time: g.time, open: N, high: W, low: F, close: k, volume: g.volume };
        return B = N, i = k, E;
      });
      fl({
        ctx: e,
        candles: M,
        startIndex: c.startIndex,
        indexToX: me,
        priceToY: lt,
        morphAt: (g, C) => M[g],
        candleBodyWidth: Dn,
        wickWidth: il,
        colors: {
          bullish: se.bullish,
          bearish: se.bearish,
          bullishWick: se.bullishWick,
          bearishWick: se.bearishWick,
          bullishBorder: se.bullishBorder,
          bearishBorder: se.bearishBorder
        }
      });
    } else if (Ae === "tpo") {
      const i = /* @__PURE__ */ new Map();
      c.candles.forEach((g) => {
        const C = Math.floor(g.time / 18e5) * 18e5, k = i.get(C);
        k ? (k.high = Math.max(k.high, g.high), k.low = Math.min(k.low, g.low), k.count++) : i.set(C, { high: g.high, low: g.low, count: 1 });
      });
      let M = 0;
      i.forEach((g) => {
        const C = me(c.startIndex + M, c.startIndex), k = lt(g.high), N = lt(g.low);
        e.fillStyle = "#21b3a4", e.globalAlpha = 0.25, e.fillRect(C - Dn / 2, k, Dn, Math.max(2, N - k)), e.globalAlpha = 1, M++;
      }), e.globalAlpha = 0.3, fl({
        ctx: e,
        candles: c.candles,
        startIndex: c.startIndex,
        indexToX: me,
        priceToY: lt,
        morphAt: Ps,
        candleBodyWidth: Dn,
        wickWidth: il,
        colors: {
          bullish: se.bullish,
          bearish: se.bearish,
          bullishWick: se.bullishWick,
          bearishWick: se.bearishWick,
          bullishBorder: se.bullishBorder,
          bearishBorder: se.bearishBorder
        }
      }), e.globalAlpha = 1;
    } else if (Ae === "footprint_cluster" || Ae === "footprint_profile")
      fl({
        ctx: e,
        candles: c.candles,
        startIndex: c.startIndex,
        indexToX: me,
        priceToY: lt,
        morphAt: Ps,
        candleBodyWidth: Dn,
        wickWidth: il,
        colors: {
          bullish: se.bullish,
          bearish: se.bearish,
          bullishWick: se.bullishWick,
          bearishWick: se.bearishWick,
          bullishBorder: se.bullishBorder,
          bearishBorder: se.bearishBorder
        }
      }), e.font = "8px monospace", e.fillStyle = "#e8e8e8", c.candles.forEach((B, i) => {
        const M = me(c.startIndex + i, c.startIndex), g = lt(B.close), C = B.volume || 0;
        if (C > 0) {
          const k = Math.round(C * 0.55), N = Math.round(C * 0.45);
          e.fillText(`${k}/${N}`, M - 12, g - 8);
        }
      });
    else if (Ae === "flow_positioning")
      fl({
        ctx: e,
        candles: c.candles,
        startIndex: c.startIndex,
        indexToX: me,
        priceToY: lt,
        morphAt: Ps,
        candleBodyWidth: Dn,
        wickWidth: il,
        colors: {
          bullish: se.bullish,
          bearish: se.bearish,
          bullishWick: se.bullishWick,
          bearishWick: se.bearishWick,
          bullishBorder: se.bullishBorder,
          bearishBorder: se.bearishBorder
        }
      }), e.strokeStyle = "#d0d0d0", e.lineWidth = 1, c.candles.forEach((B, i) => {
        if (i % 5 !== 0) return;
        const M = me(c.startIndex + i, c.startIndex), g = B.close > B.open, C = lt(B.close);
        e.beginPath(), e.moveTo(M, C), e.lineTo(M, C + (g ? -12 : 12)), e.stroke(), e.fillStyle = g ? "#21b3a4" : "#f0426c", e.beginPath(), e.arc(M, C + (g ? -14 : 14), 2, 0, Math.PI * 2), e.fill();
      });
    else if (Ae === "renko") {
      const B = Qe.range * 0.02, i = [];
      let M = c.candles[0]?.close || 0, g = 0;
      c.candles.forEach((C) => {
        const k = C.close - M, N = Math.floor(Math.abs(k) / B);
        for (let W = 0; W < N; W++) {
          const F = k > 0, E = M, S = F ? M + B : M - B;
          i.push({
            x: g * Dn * 1.2,
            isBullish: F,
            top: lt(Math.max(E, S)),
            bottom: lt(Math.min(E, S))
          }), M = S, g++;
        }
      }), i.forEach((C) => {
        const k = Math.abs(C.bottom - C.top);
        e.fillStyle = C.isBullish ? se.bullish : se.bearish, e.fillRect(C.x, C.top, Dn, k), e.strokeStyle = C.isBullish ? se.bullishBorder : se.bearishBorder, e.lineWidth = 1, e.strokeRect(C.x, C.top, Dn, k);
      });
    }
    if (w) {
      const B = je * 0.2, i = je, M = i - B, g = c.candles.map((N) => N.volume ?? 0).filter((N) => N > 0), C = g.length > 0 ? Math.max(...g) : 1, k = Math.max(2, hn * 0.7);
      c.candles.forEach((N, W) => {
        const F = N.volume ?? 0;
        if (F > 0) {
          const E = c.startIndex + W, S = me(E, c.startIndex), P = F / C * B * 0.95, $ = i - P, J = N.close >= N.open, de = r?.volume?.upColor || "#26a69a", K = r?.volume?.downColor || "#ef5350", z = J ? de : K, re = parseInt(z.slice(1, 3), 16), pe = parseInt(z.slice(3, 5), 16), ke = parseInt(z.slice(5, 7), 16);
          e.fillStyle = `rgba(${re}, ${pe}, ${ke}, 0.45)`, e.fillRect(S - k / 2, $, k, P), e.strokeStyle = `rgba(${re}, ${pe}, ${ke}, 0.7)`, e.lineWidth = 1, e.beginPath(), e.moveTo(S - k / 2, $), e.lineTo(S + k / 2, $), e.stroke();
        }
      }), It === "volume" && (e.save(), c.candles.forEach((W, F) => {
        const E = W.volume ?? 0;
        if (E <= 0) return;
        const S = c.candles[F - 1]?.volume ?? 0, R = c.candles[F + 1]?.volume ?? 0;
        if (E < S || E < R) return;
        const P = c.startIndex + F, $ = me(P, c.startIndex), de = E / C * B * 0.95, K = i - de;
        e.beginPath(), e.arc($, K, 2.5 + 1, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc($, K, 2.5, 0, Math.PI * 2);
        const z = W.close >= W.open;
        e.fillStyle = z ? r?.volume?.upColor || "#26a69a" : r?.volume?.downColor || "#ef5350", e.fill();
      }), e.restore()), Qt.current.volume = { top: M, bottom: i };
    }
    if (e.restore(), r) {
      if (r.ema?.enabled && s?.ema && r.ema.periods?.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, q, je), e.clip();
        const i = rr ? ["#D1D4DC", "#A0A4B0", "#B2B5BE", "#9598A1", "#787B86"] : ["#363A45", "#5D606B", "#434651", "#787B86", "#9598A1"];
        r.ema.periods.forEach((M, g) => {
          const C = s.ema[g];
          if (!C) return;
          e.strokeStyle = i[g % i.length], e.lineWidth = 1.5, e.beginPath();
          let k = !1;
          c.candles.forEach((N, W) => {
            const F = c.startIndex + W, E = C[F];
            if (!isNaN(E) && isFinite(E)) {
              const S = me(F, c.startIndex), R = dt(E, Qe);
              k ? e.lineTo(S, R) : (e.moveTo(S, R), k = !0);
            }
          }), e.stroke();
        }), e.restore();
      }
      if (s?.movingAverages && s.movingAverages.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, q, je), e.clip();
        const i = r?.movingAverages?.lineWidth ?? 1.5;
        s.movingAverages.forEach((M) => {
          e.strokeStyle = M.color, e.lineWidth = i, e.beginPath();
          let g = !1;
          c.candles.forEach((C, k) => {
            const N = c.startIndex + k, W = M.data[N];
            if (!isNaN(W) && isFinite(W)) {
              const F = me(N, c.startIndex), E = dt(W, Qe);
              g ? e.lineTo(F, E) : (e.moveTo(F, E), g = !0);
            }
          }), e.stroke();
        }), e.restore();
      }
      if (r.bollinger?.enabled && s?.bollinger) {
        const i = s.bollinger;
        e.save(), e.beginPath(), e.rect(0, 0, q, je), e.clip();
        const M = r.bollinger.lineWidth || 1, g = r.bollinger.upperColor || "#9B59B6", C = r.bollinger.middleColor || "#9B59B6", k = r.bollinger.lowerColor || "#9B59B6";
        e.strokeStyle = g, e.lineWidth = M, e.setLineDash([3, 3]), e.beginPath();
        let N = !1;
        c.candles.forEach((W, F) => {
          const E = c.startIndex + F, S = i.upper[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = me(E, c.startIndex), P = dt(S, Qe);
            N ? e.lineTo(R, P) : (e.moveTo(R, P), N = !0);
          }
        }), e.stroke(), e.strokeStyle = C, e.lineWidth = M, e.setLineDash([]), e.beginPath(), N = !1, c.candles.forEach((W, F) => {
          const E = c.startIndex + F, S = i.middle[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = me(E, c.startIndex), P = dt(S, Qe);
            N ? e.lineTo(R, P) : (e.moveTo(R, P), N = !0);
          }
        }), e.stroke(), e.strokeStyle = k, e.lineWidth = M, e.setLineDash([3, 3]), e.beginPath(), N = !1, c.candles.forEach((W, F) => {
          const E = c.startIndex + F, S = i.lower[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = me(E, c.startIndex), P = dt(S, Qe);
            N ? e.lineTo(R, P) : (e.moveTo(R, P), N = !0);
          }
        }), e.stroke(), e.setLineDash([]), e.restore();
      }
      if (s?.vwap) {
        e.save(), e.beginPath(), e.rect(0, 0, q, je), e.clip(), e.strokeStyle = r?.vwap?.color || "#2196F3", e.lineWidth = 2, e.beginPath();
        let i = !1;
        c.candles.forEach((M, g) => {
          const C = c.startIndex + g, k = s.vwap[C];
          if (!isNaN(k) && isFinite(k)) {
            const N = me(C, c.startIndex), W = dt(k, Qe);
            i ? e.lineTo(N, W) : (e.moveTo(N, W), i = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (s?.ichimoku) {
        e.save(), e.beginPath(), e.rect(0, 0, q, je), e.clip();
        const i = s.ichimoku, M = r?.ichimoku?.tenkanColor || "#0496ff", g = r?.ichimoku?.kijunColor || "#ff0000", C = r?.ichimoku?.cloudUpColor || "rgba(0, 255, 0, 0.2)", k = r?.ichimoku?.cloudDownColor || "rgba(255, 0, 0, 0.2)";
        for (let W = 0; W < c.candles.length; W++) {
          const F = c.startIndex + W, E = i.senkouA[F], S = i.senkouB[F];
          if (!isNaN(E) && !isNaN(S) && isFinite(E) && isFinite(S)) {
            const R = me(F, c.startIndex), P = dt(E, Qe), $ = dt(S, Qe);
            e.fillStyle = E >= S ? C : k;
            const J = hn * (1 + Ye);
            e.fillRect(R - J / 2, Math.min(P, $), J, Math.abs(P - $));
          }
        }
        e.strokeStyle = M, e.lineWidth = 1.5, e.beginPath();
        let N = !1;
        c.candles.forEach((W, F) => {
          const E = c.startIndex + F, S = i.tenkan[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = me(E, c.startIndex), P = dt(S, Qe);
            N ? e.lineTo(R, P) : (e.moveTo(R, P), N = !0);
          }
        }), e.stroke(), e.strokeStyle = g, e.lineWidth = 1.5, e.beginPath(), N = !1, c.candles.forEach((W, F) => {
          const E = c.startIndex + F, S = i.kijun[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = me(E, c.startIndex), P = dt(S, Qe);
            N ? e.lineTo(R, P) : (e.moveTo(R, P), N = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (s?.parabolicSAR) {
        e.save(), e.beginPath(), e.rect(0, 0, q, je), e.clip();
        const i = s.parabolicSAR, M = r?.parabolicSAR?.bullishColor || "#22c55e", g = r?.parabolicSAR?.bearishColor || "#ef4444";
        c.candles.forEach((C, k) => {
          const N = c.startIndex + k, W = i.sar[N], F = i.direction[N];
          if (!isNaN(W) && isFinite(W)) {
            const E = me(N, c.startIndex), S = dt(W, Qe);
            e.fillStyle = F > 0 ? M : g, e.beginPath(), e.arc(E, S, 2.5, 0, Math.PI * 2), e.fill();
          }
        }), e.restore();
      }
      if (s?.keltner) {
        e.save(), e.beginPath(), e.rect(0, 0, q, je), e.clip();
        const i = s.keltner, M = r?.keltner?.upperColor || "#FF9800", g = r?.keltner?.middleColor || "#FF9800", C = r?.keltner?.lowerColor || "#FF9800";
        e.strokeStyle = M, e.lineWidth = 1, e.setLineDash([3, 3]), e.beginPath();
        let k = !1;
        c.candles.forEach((N, W) => {
          const F = c.startIndex + W, E = i.upper[F];
          if (!isNaN(E) && isFinite(E)) {
            const S = me(F, c.startIndex), R = dt(E, Qe);
            k ? e.lineTo(S, R) : (e.moveTo(S, R), k = !0);
          }
        }), e.stroke(), e.strokeStyle = g, e.setLineDash([]), e.beginPath(), k = !1, c.candles.forEach((N, W) => {
          const F = c.startIndex + W, E = i.middle[F];
          if (!isNaN(E) && isFinite(E)) {
            const S = me(F, c.startIndex), R = dt(E, Qe);
            k ? e.lineTo(S, R) : (e.moveTo(S, R), k = !0);
          }
        }), e.stroke(), e.strokeStyle = C, e.setLineDash([3, 3]), e.beginPath(), k = !1, c.candles.forEach((N, W) => {
          const F = c.startIndex + W, E = i.lower[F];
          if (!isNaN(E) && isFinite(E)) {
            const S = me(F, c.startIndex), R = dt(E, Qe);
            k ? e.lineTo(S, R) : (e.moveTo(S, R), k = !0);
          }
        }), e.stroke(), e.setLineDash([]), e.restore();
      }
      if (s?.pivotPoints) {
        e.save(), e.beginPath(), e.rect(0, 0, q, je), e.clip();
        const i = s.pivotPoints, M = r?.pivotPoints?.pivotColor || "#FFEB3B", g = r?.pivotPoints?.resistanceColor || "#ef4444", C = r?.pivotPoints?.supportColor || "#22c55e", k = (N, W, F, E = []) => {
          const S = N.filter((R) => !isNaN(R) && isFinite(R)).pop();
          if (S !== void 0) {
            const R = dt(S, Qe);
            e.strokeStyle = W, e.lineWidth = 1, e.setLineDash(E), e.beginPath(), e.moveTo(0, R), e.lineTo(q, R), e.stroke(), e.fillStyle = W, e.font = Xt, e.textAlign = "left", e.fillText(F, 5, R - 3);
          }
        };
        e.setLineDash([]), k(i.pivot, M, "P"), k(i.r1, g, "R1", [2, 2]), k(i.r2, g, "R2", [4, 2]), k(i.r3, g, "R3", [6, 2]), k(i.s1, C, "S1", [2, 2]), k(i.s2, C, "S2", [4, 2]), k(i.s3, C, "S3", [6, 2]), e.setLineDash([]), e.restore();
      }
      if (s?.supertrend) {
        e.save(), e.beginPath(), e.rect(0, 0, q, je), e.clip();
        const i = s.supertrend, M = r?.supertrend?.bullishColor || "#22c55e", g = r?.supertrend?.bearishColor || "#ef4444";
        e.lineWidth = r?.supertrend?.lineWidth || 2, c.candles.forEach((C, k) => {
          const N = c.startIndex + k, W = i.supertrend[N];
          if (isNaN(W) || !isFinite(W)) return;
          const F = me(N, c.startIndex), E = dt(W, Qe), S = N - 1;
          S >= 0 && !isNaN(i.supertrend[S]) && (e.strokeStyle = i.direction[N] === 1 ? M : g, e.beginPath(), e.moveTo(me(S, c.startIndex), dt(i.supertrend[S], Qe)), e.lineTo(F, E), e.stroke());
        }), e.restore();
      }
      if (s?.donchian) {
        e.save(), e.beginPath(), e.rect(0, 0, q, je), e.clip();
        const i = s.donchian, M = (g, C, k = []) => {
          e.strokeStyle = C, e.lineWidth = r?.donchian?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let N = !1;
          c.candles.forEach((W, F) => {
            const E = c.startIndex + F, S = g[E];
            if (!isNaN(S) && isFinite(S)) {
              const R = me(E, c.startIndex), P = dt(S, Qe);
              N ? e.lineTo(R, P) : (e.moveTo(R, P), N = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        M(i.upper, r?.donchian?.upperColor || "#2196F3"), M(i.middle, r?.donchian?.middleColor || "#FFC107", [4, 4]), M(i.lower, r?.donchian?.lowerColor || "#2196F3"), e.restore();
      }
      if (s?.envelopes) {
        e.save(), e.beginPath(), e.rect(0, 0, q, je), e.clip();
        const i = s.envelopes, M = (g, C, k = []) => {
          e.strokeStyle = C, e.lineWidth = r?.envelopes?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let N = !1;
          c.candles.forEach((W, F) => {
            const E = c.startIndex + F, S = g[E];
            if (!isNaN(S) && isFinite(S)) {
              const R = me(E, c.startIndex);
              N ? e.lineTo(R, dt(S, Qe)) : (e.moveTo(R, dt(S, Qe)), N = !0);
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
        e.save(), e.beginPath(), e.rect(0, 0, q, je), e.clip(), e.strokeStyle = r?.[i]?.color || M, e.lineWidth = r?.[i]?.lineWidth || 2, e.beginPath();
        let C = !1;
        c.candles.forEach((k, N) => {
          const W = c.startIndex + N, F = g[W];
          if (!isNaN(F) && isFinite(F)) {
            const E = me(W, c.startIndex), S = dt(F, Qe);
            C ? e.lineTo(E, S) : (e.moveTo(E, S), C = !0);
          }
        }), e.stroke(), e.restore();
      }), s?.linearReg) {
        e.save(), e.beginPath(), e.rect(0, 0, q, je), e.clip();
        const i = s.linearReg, M = (g, C, k = []) => {
          e.strokeStyle = C, e.lineWidth = r?.linearReg?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let N = !1;
          c.candles.forEach((W, F) => {
            const E = c.startIndex + F, S = g[E];
            if (!isNaN(S) && isFinite(S)) {
              const R = me(E, c.startIndex);
              N ? e.lineTo(R, dt(S, Qe)) : (e.moveTo(R, dt(S, Qe)), N = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        M(i.upper, r?.linearReg?.upperColor || "#81D4FA"), M(i.middle, r?.linearReg?.middleColor || "#29B6F6", [4, 4]), M(i.lower, r?.linearReg?.lowerColor || "#81D4FA"), e.restore();
      }
      if (s?.fibRetracement) {
        e.save(), e.beginPath(), e.rect(0, 0, q, je), e.clip();
        const i = s.fibRetracement, M = r?.fibRetracement?.color || "#FFD54F", g = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
        i.levels.forEach((C, k) => {
          const N = dt(C, Qe);
          e.strokeStyle = M, e.lineWidth = r?.fibRetracement?.lineWidth || 1, e.setLineDash(k === 0 || k === 6 ? [] : [4, 3]), e.beginPath(), e.moveTo(0, N), e.lineTo(q, N), e.stroke(), e.fillStyle = M, e.font = Xt, e.textAlign = "left", e.fillText(`${(g[k] * 100).toFixed(1)}% (${C.toFixed(2)})`, 5, N - 3);
        }), e.setLineDash([]), e.restore();
      }
      if (s?.camarillaPivots) {
        e.save(), e.beginPath(), e.rect(0, 0, q, je), e.clip();
        const i = s.camarillaPivots, M = r?.camarillaPivots?.resistanceColor || "#ef4444", g = r?.camarillaPivots?.supportColor || "#22c55e", C = (k, N, W) => {
          const F = k.filter((E) => !isNaN(E) && isFinite(E)).pop();
          if (F !== void 0) {
            const E = dt(F, Qe);
            e.strokeStyle = N, e.lineWidth = r?.camarillaPivots?.lineWidth || 1, e.setLineDash([3, 3]), e.beginPath(), e.moveTo(0, E), e.lineTo(q, E), e.stroke(), e.fillStyle = N, e.font = Xt, e.textAlign = "left", e.fillText(W, 5, E - 3);
          }
        };
        C(i.h4, M, "H4"), C(i.h3, M, "H3"), C(i.l3, g, "L3"), C(i.l4, g, "L4"), e.setLineDash([]), e.restore();
      }
      if (s?.woodiePivots) {
        e.save(), e.beginPath(), e.rect(0, 0, q, je), e.clip();
        const i = s.woodiePivots, M = r?.woodiePivots?.pivotColor || "#FFEB3B", g = r?.woodiePivots?.resistanceColor || "#ef4444", C = r?.woodiePivots?.supportColor || "#22c55e", k = (N, W, F) => {
          const E = N.filter((S) => !isNaN(S) && isFinite(S)).pop();
          if (E !== void 0) {
            const S = dt(E, Qe);
            e.strokeStyle = W, e.lineWidth = r?.woodiePivots?.lineWidth || 1, e.setLineDash([3, 3]), e.beginPath(), e.moveTo(0, S), e.lineTo(q, S), e.stroke(), e.fillStyle = W, e.font = Xt, e.textAlign = "left", e.fillText(F, 5, S - 3);
          }
        };
        k(i.pivot, M, "WP"), k(i.r1, g, "WR1"), k(i.r2, g, "WR2"), k(i.s1, C, "WS1"), k(i.s2, C, "WS2"), e.setLineDash([]), e.restore();
      }
      if (s?.volumeSma && w) {
        e.save();
        const i = s.volumeSma, M = je * 0.2, g = je, C = c.candles.map((W) => W.volume || 0), k = Math.max(...C, 1);
        e.strokeStyle = r?.volumeSma?.color || "#FF9800", e.lineWidth = 1.5, e.beginPath();
        let N = !1;
        c.candles.forEach((W, F) => {
          const E = c.startIndex + F, S = i[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = me(E, c.startIndex), P = g - S / k * M;
            N ? e.lineTo(R, P) : (e.moveTo(R, P), N = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (r?.volumeProfile?.enabled && c.candles.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, q, je), e.clip();
        const i = r.volumeProfile.numberOfRows ?? 48, M = q * ((r.volumeProfile.rowWidth ?? 15) / 100), g = (r.volumeProfile.opacity ?? 60) / 100, C = r.volumeProfile.upColor || "#D97706", k = r.volumeProfile.downColor || "#1E3A8A", N = r.volumeProfile.pocColor || "#10B981", W = r.volumeProfile.lookbackBars ?? 0, F = W > 0 ? c.candles.slice(-W) : c.candles;
        let E = 1 / 0, S = -1 / 0;
        F.forEach((K) => {
          E = Math.min(E, K.low), S = Math.max(S, K.high);
        });
        const P = (S - E || 1) / i, $ = [];
        for (let K = 0; K < i; K++)
          $.push({
            priceLevel: E + (K + 0.5) * P,
            upVolume: 0,
            downVolume: 0,
            totalVolume: 0
          });
        F.forEach((K) => {
          if (!K.volume || K.volume <= 0) return;
          const z = K.low, re = K.high, pe = re - z, ke = K.close >= K.open;
          for (let oe = 0; oe < i; oe++) {
            const Se = E + oe * P, Ce = Se + P;
            if (re >= Se && z <= Ce) {
              const Ze = Math.max(z, Se), ht = Math.min(re, Ce), mt = pe > 0 ? (ht - Ze) / pe : 1, Dt = K.volume * mt;
              ke ? $[oe].upVolume += Dt : $[oe].downVolume += Dt, $[oe].totalVolume += Dt;
            }
          }
        });
        let J = 0, de = 0;
        if ($.forEach((K, z) => {
          K.totalVolume > J && (J = K.totalVolume, de = z);
        }), J > 0) {
          const K = je / i * 0.85;
          $.forEach((z, re) => {
            if (z.totalVolume <= 0) return;
            const pe = lt(z.priceLevel) - K / 2, ke = z.totalVolume / J * M, oe = z.totalVolume > 0 ? z.upVolume / z.totalVolume * ke : 0, Se = ke - oe, Ce = re === de, Ze = q - ke;
            oe > 0 && (e.globalAlpha = Ce ? Math.min(g + 0.2, 1) : g, e.fillStyle = C, e.fillRect(Ze, pe, oe, K)), Se > 0 && (e.globalAlpha = Ce ? 0.95 : 0.85, e.fillStyle = k, e.fillRect(Ze + oe, pe, Se, K)), Ce && (e.globalAlpha = 0.9, e.strokeStyle = N, e.lineWidth = 1.5, e.strokeRect(Ze, pe, ke, K));
          }), e.globalAlpha = 1, It === "volumeProfile" && $.forEach((re, pe) => {
            if (re.totalVolume <= 0) return;
            const ke = lt(re.priceLevel), oe = re.totalVolume / J * M, Se = q - oe;
            e.beginPath(), e.arc(Se, ke, 2.5 + 1, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc(Se, ke, 2.5, 0, Math.PI * 2), e.fillStyle = re.upVolume >= re.downVolume ? C : k, e.fill();
          });
        }
        e.restore(), e.restore();
      }
    }
    const Vs = [], Ls = [];
    let Yl = "", Ao = "", ul = 14, Do = 0, Bo = 0;
    const vc = Ss?.current && Ss.current.length > 0;
    if (ws && !vc && ss) {
      const B = ss.find((i) => i.id === ws);
      if (B && B.points && B.points.length > 0) {
        e.save();
        const i = Xe.badgeFont, M = "#2962ff", g = "rgba(41, 98, 255, 0.2)", C = Xe.badgePadding, k = Xe.badgeRowHeight, N = Ke - 6, W = q + 3, F = fe.height - kt, E = F + (kt - k) / 2;
        if (Yl = i, Ao = M, ul = k, Do = E, Bo = W, B.points.forEach((S) => {
          let R = null, P = null;
          if (S.price !== void 0 && (P = lt(S.price), P >= 0 && P <= je)) {
            const $ = An(S.price), J = e.measureText($).width, de = Math.min(J + C * 2, N), K = P - k / 2;
            Ls.push({
              pos: P,
              text: $,
              bWidth: de,
              topOrigin: K
            });
          }
          if (S.time !== void 0) {
            let $ = -1;
            if (l.length > 0) {
              const J = l[0].time, de = l[l.length - 1].time, K = l.length > 1 ? l[1].time - l[0].time : 6e4;
              if (S.time > de) $ = l.length - 1 + (S.time - de) / K;
              else if (S.time < J) $ = (S.time - J) / K;
              else {
                let z = 0, re = l.length - 1;
                for (; z <= re; ) {
                  const pe = Math.floor((z + re) / 2);
                  if (l[pe].time === S.time) {
                    $ = pe;
                    break;
                  }
                  l[pe].time < S.time ? z = pe + 1 : re = pe - 1;
                }
                if ($ === -1) {
                  const pe = z, ke = pe - 1;
                  if (ke >= 0 && pe < l.length) {
                    const oe = l[ke], Se = l[pe], Ce = (S.time - oe.time) / (Se.time - oe.time);
                    $ = ke + Ce;
                  } else
                    $ = z;
                }
              }
            }
            if ($ !== -1) {
              const J = Pe.current.startIndex, K = Pe.current.candleWidth * (1 + Ye), z = Math.floor(J), re = (J - z) * K;
              R = ($ - z) * K + K / 2 - re;
            }
            if (R !== null && R >= 0 && R <= q) {
              const J = `${hr(S.time)} ${es(S.time, !0)}  ${Rs(S.time)}`, K = e.measureText(J).width + C * 2;
              let z = R - K / 2;
              z < 0 && (z = 0), z + K > q && (z = q - K), Vs.push({
                pos: R,
                text: J,
                bWidth: K,
                topOrigin: z
              });
            }
          }
        }), (B.type === "long" || B.type === "short") && B.stopLoss) {
          const S = B.stopLoss.price, R = lt(S);
          if (R >= 0 && R <= je) {
            e.font = Yl || i;
            const P = An(S), $ = e.measureText(P).width, J = Math.min($ + C * 2, N), de = R - k / 2;
            Ls.push({
              pos: R,
              text: P,
              bWidth: J,
              topOrigin: de
            });
          }
        }
        if (Vs.length >= 2) {
          const S = Math.min(...Vs.map((P) => P.pos)), R = Math.max(...Vs.map((P) => P.pos));
          R > S && (e.fillStyle = g, e.fillRect(S, F, R - S, kt));
        }
        if (Ls.length >= 2) {
          const S = Math.min(...Ls.map((P) => P.pos)), R = Math.max(...Ls.map((P) => P.pos));
          R > S && (e.fillStyle = g, e.fillRect(W - 3, S, Ke, R - S));
        }
        e.restore();
      }
    }
    e.fillStyle = se.axisLabel || "#787b86", e.font = El, e.textBaseline = "middle", e.textAlign = Xe.priceLabelAlign;
    const yc = Xe.priceLabelAlign === "right" ? x - (Xn !== void 0 ? Xn : Oo) - 4 : q + 2;
    let Nr = -1 / 0;
    for (let B = Cr; B <= Qe.max; B += Xl) {
      const i = lt(B);
      if (i >= 10 && i <= je - 10) {
        if (Math.abs(i - Nr) < Ir) continue;
        Nr = i, e.fillText(An(B), yc, i);
      }
    }
    const Gt = n != null && !Number.isNaN(n) ? n : c.candles.length ? c.candles[c.candles.length - 1].close : null;
    if (Gt != null && !Number.isNaN(Gt) && !Tt) {
      const B = lt(Gt);
      if (B >= 0 && B <= je) {
        e.save();
        const i = c.candles.length >= 2 ? c.candles[c.candles.length - 2] : null, M = c.candles.length >= 1 ? c.candles[c.candles.length - 1] : null, g = i ? i.close : M ? M.open : Gt, C = Gt >= g, k = se.priceTickerBullish || se.bullish, N = se.priceTickerBearish || se.bearish, W = C ? k : N, F = (Vn) => {
          const tn = Vn.replace("#", ""), Ht = parseInt(tn.substring(0, 2), 16), fn = parseInt(tn.substring(2, 4), 16), Zt = parseInt(tn.substring(4, 6), 16);
          return `${Ht}, ${fn}, ${Zt}`;
        }, E = F(se.textDim || "#666666"), S = `rgba(${E}, 0.35)`, R = `rgba(${E}, 0.9)`, P = F(W).split(",").map(Number), $ = (0.299 * P[0] + 0.587 * P[1] + 0.114 * P[2]) / 255, J = Number.isNaN($) || $ <= 0.55 ? "#ffffff" : "#000000", de = c.candles.length - 1, K = c.candles.length > 0 ? me(c.startIndex + de, c.startIndex) : 0;
        K > 0 && (e.strokeStyle = S, e.lineWidth = 1, e.setLineDash([4, 4]), e.beginPath(), e.moveTo(0, B), e.lineTo(K, B), e.stroke(), e.setLineDash([])), e.strokeStyle = R, e.lineWidth = 1, e.setLineDash([4, 3]), e.beginPath(), e.moveTo(K, B), e.lineTo(q, B), e.stroke(), e.setLineDash([]);
        const z = An(Gt), re = El, pe = Xe.liveCountdownFont;
        e.font = re;
        const oe = e.measureText(z).width, Se = Xe.livePriceLabelPadding, Ce = Xe.livePriceRowHeight, Ze = I && I.length > 0, ht = Ze ? Xe.countdownRowHeight : 0, mt = Ce + ht;
        let Dt = 0;
        Ze && (e.font = pe, Dt = e.measureText(I).width);
        const yn = Ke - 6, Bn = Math.max(oe, Dt) + Se * 2, Pt = Math.min(Bn, yn), Bt = q + 3, wt = B - Ce / 2;
        e.fillStyle = se.background, e.fillRect(Bt - 1, wt - 1, Pt + 2, mt + 2), e.fillStyle = W, e.beginPath(), e.roundRect(Bt, wt, Pt, mt, 3), e.fill(), e.fillStyle = J, e.font = re, e.textAlign = "center", e.textBaseline = "middle", e.fillText(z, Bt + Pt / 2, wt + Ce / 2), Ze && (e.strokeStyle = J === "#ffffff" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)", e.lineWidth = 0.5, e.beginPath(), e.moveTo(Bt + 3, wt + Ce), e.lineTo(Bt + Pt - 3, wt + Ce), e.stroke(), e.fillStyle = J === "#ffffff" ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)", e.font = pe, e.textAlign = "center", e.textBaseline = "middle", e.fillText(I, Bt + Pt / 2, wt + Ce + ht / 2)), e.restore();
      }
    }
    if (ss && ss.length > 0) {
      e.save();
      const B = El;
      e.font = B;
      const i = Xe.badgePadding, M = Xe.badgeRowHeight, g = [], C = [];
      ss.forEach((R) => {
        if ((R.type === "horizontalRay" || R.type === "horizontal") && R.points.length > 0) {
          const P = R.points[0].price;
          g.push({ price: P, color: R.color || "#2196f3", yPos: lt(P) });
        } else if ((R.type === "long" || R.type === "short") && R.points.length >= 2) {
          if (R.id === ws) return;
          const P = R.points[0].price, $ = R.points[1].price;
          if (g.push({ price: P, color: "#4b5563", yPos: lt(P) }), g.push({ price: $, color: "#22c55e", yPos: lt($) }), R.stopLoss) {
            const J = R.stopLoss.price;
            g.push({ price: J, color: "#ef4444", yPos: lt(J) });
          }
        }
      });
      let k = -9999, N = -9999;
      if (Gt != null && !Number.isNaN(Gt)) {
        const R = lt(Gt), P = Xe.livePriceRowHeight + (I && I.length > 0 ? Xe.countdownRowHeight : 0);
        k = R - Xe.livePriceRowHeight / 2, N = k + P;
      }
      const W = 2, F = Ke - 6, E = q + 3;
      g.sort((R, P) => R.yPos - P.yPos);
      let S = -9999;
      g.forEach((R) => {
        let P = R.yPos - M / 2, $ = P + M;
        if (P < S + W && (P = S + W, $ = P + M), P < N + W && $ > k - W && (P = N + W, $ = P + M), S = $, P >= 0 && $ <= je) {
          const J = An(R.price), de = e.measureText(J).width, K = Math.min(de + i * 2, F);
          e.fillStyle = R.color, e.beginPath(), e.roundRect(E, P, K, M, 3), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.fillText(J, E + K / 2, P + M / 2);
        }
      }), e.font = Xe.alertFlagFont, C.forEach((R) => {
        if (R.xPos >= 0 && R.xPos <= q) {
          const P = es(R.time, !0) + " " + Rs(R.time), J = e.measureText(P).width + i * 2, K = fe.height - kt + (kt - M) / 2;
          let z = R.xPos - J / 2;
          z < 0 && (z = 0), z + J > q && (z = q - J), e.fillStyle = R.color, e.beginPath(), e.roundRect(z, K, J, M, 3), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.fillText(P, z + J / 2, K + M / 2);
        }
      }), e.restore();
    }
    if (Tt && Gt !== null && Gt !== void 0 && !Number.isNaN(Gt)) {
      const B = Lt != null && sn != null && Number.isFinite(Lt) && Number.isFinite(sn), i = B ? Lt : Gt, M = B ? sn : Gt + od(h || ""), g = lt(i), C = lt(M);
      if (e.save(), g >= 0 && g <= je) {
        e.strokeStyle = "#1976d2", e.lineWidth = 1, e.setLineDash([3, 4]), e.beginPath(), e.moveTo(0, g), e.lineTo(q, g), e.stroke(), e.setLineDash([]);
        const k = An(i);
        e.font = Xe.alertCountFont;
        const W = e.measureText(k).width + 12, F = 16, E = q + 2;
        e.fillStyle = "#1976d2", e.beginPath(), e.roundRect(E, g - F / 2, Math.min(W, Ke - 4), F, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "left", e.textBaseline = "middle", e.fillText(k, E + 6, g);
      }
      if (C >= 0 && C <= je) {
        e.strokeStyle = "#d32f2f", e.lineWidth = 1, e.setLineDash([3, 4]), e.beginPath(), e.moveTo(0, C), e.lineTo(q, C), e.stroke(), e.setLineDash([]);
        const k = An(M);
        e.font = Xe.alertCountFont;
        const W = e.measureText(k).width + 12, F = 16, E = q + 2;
        e.fillStyle = "#d32f2f", e.beginPath(), e.roundRect(E, C - F / 2, Math.min(W, Ke - 4), F, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "left", e.textBaseline = "middle", e.fillText(k, E + 6, C);
      }
      g >= 0 && C >= 0 && g <= je && C <= je && (e.fillStyle = "rgba(148, 163, 184, 0.04)", e.fillRect(0, Math.min(C, g), q, Math.abs(g - C))), e.restore();
    }
    if (Be && Be.length > 0) {
      const B = {
        ctx: e,
        chartWidth: q,
        mainChartHeight: je,
        mainPriceToY: lt,
        formatPrice: An,
        colors: {
          slColor: se.slColor,
          slOpacity: se.slOpacity,
          tpColor: se.tpColor,
          tpOpacity: se.tpOpacity
        },
        selectedPositionId: Ne.current,
        slDraft: ut.current,
        tpDraft: ct.current,
        hoveredSLTP: Fn.current,
        draggingHandle: it.current,
        defaultOffset: Kn(0) || void 0
      };
      Tu(B, Be), Mu(B, Be);
    }
    if (It && !It.startsWith("sp-") && s) {
      const B = Qe;
      if (B && je > 0) {
        const g = (k, N) => {
          e.save(), e.beginPath(), e.rect(0, 0, q, je), e.clip();
          for (let W = 0; W < c.candles.length; W += 8) {
            const F = c.startIndex + W;
            if (F >= k.length) continue;
            const E = k[F];
            if (isNaN(E) || !isFinite(E)) continue;
            const S = me(F, c.startIndex), R = je - (E - B.min) / B.range * je;
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
          const k = r.customIndicators.find((W) => `ci-${W.id}` === C), N = k?.data;
          k && N && Array.isArray(N) && g(N, k.color);
        } else if (C.startsWith("script-") && r?.customIndicators) {
          const k = C.slice(7);
          for (const N of r.customIndicators) {
            if (N.scriptId !== k) continue;
            const W = N.data;
            W && Array.isArray(W) && g(W, N.color);
          }
        }
      }
    }
    let $t = je;
    if (s?.rsi) {
      const B = ts, i = $t, M = i + B, g = r?.rsi?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, q, B), e.globalAlpha = 1), e.strokeStyle = se.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(q, i), e.stroke();
      const C = (z) => i + B - z / 100 * B, k = r?.rsi?.overbought ?? 70, N = r?.rsi?.oversold ?? 30;
      if (g.showZones) {
        const z = C(k), re = C(N), pe = g.zoneOpacity ?? 0.1;
        e.fillStyle = g.overboughtZoneColor || "#ff4444", e.globalAlpha = pe, e.fillRect(0, i, q, z - i), e.fillStyle = g.oversoldZoneColor || "#44ff44", e.fillRect(0, re, q, M - re), e.globalAlpha = 1;
      }
      if (g.showGrid !== !1) {
        const z = g.gridColor || "rgba(150, 150, 150, 0.3)";
        e.setLineDash([4, 4]), [N, 50, k].forEach((re) => {
          e.beginPath(), re === 50 ? (e.strokeStyle = z, e.lineWidth = 1) : (e.strokeStyle = "rgba(180, 130, 80, 0.8)", e.lineWidth = 1.5);
          const pe = C(re);
          e.moveTo(0, pe), e.lineTo(q, pe), e.stroke();
        }), e.setLineDash([]), e.lineWidth = 1;
      }
      const W = r?.rsi?.color || "#E74C3C", F = g.lineWidth ?? 1.5;
      e.strokeStyle = W, e.lineWidth = F, e.beginPath();
      let E = !1;
      c.candles.forEach((z, re) => {
        const pe = c.startIndex + re, ke = s.rsi[pe];
        if (!isNaN(ke) && isFinite(ke)) {
          const oe = me(pe, c.startIndex), Se = C(ke);
          E ? e.lineTo(oe, Se) : (e.moveTo(oe, Se), E = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Xt, e.textAlign = "left", [0, N, 50, k, 100].forEach((z) => {
        const re = C(z);
        e.fillText(z.toString(), q + 5, re);
      }), Qt.current.rsi = { top: i, bottom: M };
      const S = ft.current !== null ? ft.current : c.startIndex + c.candles.length - 1, R = s.rsi[S], P = !isNaN(R) && isFinite(R) ? R.toFixed(2) : "--", $ = `RSI ${r?.rsi?.period || 14} close`, J = r?.rsi?.style?.customLabel || $, de = r?.rsi?.style?.labelColor || "#d1d5db";
      e.fillStyle = de, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left", e.fillText(J, 5, i + 15), e.fillStyle = W, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
      const K = e.measureText(J).width;
      e.fillText(P, 13 + K, i + 15), Hn.current.rsi = 13 + K + e.measureText(P).width + 8, $t = M;
    }
    if (s?.macd) {
      const B = ts, i = $t, M = i + B, g = r?.macd?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, q, B), e.globalAlpha = 1), e.strokeStyle = se.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(q, i), e.stroke();
      const C = s.macd.macd.slice(c.startIndex, c.endIndex), k = s.macd.signal.slice(c.startIndex, c.endIndex), N = s.macd.histogram.slice(c.startIndex, c.endIndex), W = [...C, ...k, ...N].filter((wt) => !isNaN(wt) && isFinite(wt)), F = Math.min(...W, 0), S = Math.max(...W, 0) - F || 1, R = (wt) => i + B - (wt - F) / S * B;
      if (g.showGrid !== !1) {
        e.strokeStyle = g.gridColor || se.grid, e.setLineDash([2, 2]), e.beginPath();
        const wt = R(0);
        e.moveTo(0, wt), e.lineTo(q, wt), e.stroke(), e.setLineDash([]);
      }
      const P = Math.max(2, hn * 0.5), $ = r?.macd?.histogramUpColor || "#26a69a", J = r?.macd?.histogramDownColor || "#ef5350", de = R(0);
      c.candles.forEach((wt, Vn) => {
        const tn = c.startIndex + Vn, Ht = s.macd.histogram[tn];
        if (!isNaN(Ht) && isFinite(Ht)) {
          const fn = me(tn, c.startIndex), Zt = R(Ht), Ns = Math.abs(de - Zt);
          e.fillStyle = Ht >= 0 ? $ : J, Ht >= 0 ? e.fillRect(fn - P / 2, Zt, P, Ns) : e.fillRect(fn - P / 2, de, P, Ns);
        }
      });
      const K = r?.macd?.macdColor || "#3498DB";
      e.strokeStyle = K, e.lineWidth = 1.5, e.beginPath();
      let z = !1;
      c.candles.forEach((wt, Vn) => {
        const tn = c.startIndex + Vn, Ht = s.macd.macd[tn];
        if (!isNaN(Ht) && isFinite(Ht)) {
          const fn = me(tn, c.startIndex), Zt = R(Ht);
          z ? e.lineTo(fn, Zt) : (e.moveTo(fn, Zt), z = !0);
        }
      }), e.stroke();
      const re = r?.macd?.signalColor || "#E67E22";
      e.strokeStyle = re, e.lineWidth = 1.5, e.beginPath(), z = !1, c.candles.forEach((wt, Vn) => {
        const tn = c.startIndex + Vn, Ht = s.macd.signal[tn];
        if (!isNaN(Ht) && isFinite(Ht)) {
          const fn = me(tn, c.startIndex), Zt = R(Ht);
          z ? e.lineTo(fn, Zt) : (e.moveTo(fn, Zt), z = !0);
        }
      }), e.stroke(), Qt.current.macd = { top: i, bottom: M };
      const pe = `MACD(${r?.macd?.fast || 12},${r?.macd?.slow || 26},${r?.macd?.signal || 9})`, ke = r?.macd?.style?.customLabel || pe, oe = r?.macd?.style?.labelColor || se.textDim;
      e.fillStyle = oe, e.font = `bold ${Xt}`, e.textAlign = "left";
      const Se = ft.current !== null ? ft.current : c.startIndex + c.candles.length - 1, Ce = s.macd.macd[Se], Ze = s.macd.signal[Se], ht = s.macd.histogram[Se];
      e.fillText(ke, 5, i + 12), e.fillStyle = K, e.font = Xt;
      const mt = e.measureText(ke).width, Dt = !isNaN(Ce) && isFinite(Ce) ? Ce.toFixed(4) : "--";
      e.fillText(Dt, 10 + mt, i + 12), e.fillStyle = re;
      const yn = !isNaN(Ze) && isFinite(Ze) ? Ze.toFixed(4) : "--", Bn = e.measureText(Dt).width;
      e.fillText(yn, 16 + mt + Bn, i + 12);
      const Pt = !isNaN(ht) && isFinite(ht) ? ht.toFixed(4) : "--";
      e.fillStyle = ht >= 0 ? "#00ff88" : "#ff0080";
      const Bt = e.measureText(yn).width;
      e.fillText(Pt, 22 + mt + Bn + Bt, i + 12), Hn.current.macd = 22 + mt + Bn + Bt + e.measureText(Pt).width + 8, $t = M;
    }
    if (s?.atr) {
      const B = ts, i = $t, M = i + B, g = r?.atr?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, q, B), e.globalAlpha = 1), e.strokeStyle = se.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(q, i), e.stroke();
      const C = s.atr.slice(c.startIndex, c.endIndex).filter((pe) => !isNaN(pe) && isFinite(pe)), k = Math.min(...C, 0), W = Math.max(...C) - k || 1, F = (pe) => i + B - (pe - k) / W * B, E = r?.atr?.color || "#17a2b8", S = g.lineWidth ?? 1.5;
      e.strokeStyle = E, e.lineWidth = S, e.beginPath();
      let R = !1;
      c.candles.forEach((pe, ke) => {
        const oe = c.startIndex + ke, Se = s.atr[oe];
        if (!isNaN(Se) && isFinite(Se)) {
          const Ce = me(oe, c.startIndex), Ze = F(Se);
          R ? e.lineTo(Ce, Ze) : (e.moveTo(Ce, Ze), R = !0);
        }
      }), e.stroke(), Qt.current.atr = { top: i, bottom: M };
      const P = `ATR(${r?.atr?.period || 14})`, $ = r?.atr?.style?.customLabel || P, J = r?.atr?.style?.labelColor || se.textDim;
      e.fillStyle = J, e.font = `bold ${Xt}`, e.textAlign = "left";
      const de = ft.current !== null ? ft.current : c.startIndex + c.candles.length - 1, K = s.atr[de], z = !isNaN(K) && isFinite(K) ? K.toFixed(5) : "--";
      e.fillText($, 5, i + 12), e.fillStyle = E, e.font = Xt;
      const re = e.measureText($).width;
      e.fillText(z, 10 + re, i + 12), Hn.current.atr = 10 + re + e.measureText(z).width + 8, $t = M;
    }
    if (s?.stochastic) {
      const B = ts, i = $t, M = i + B, g = r?.stochastic?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, q, B), e.globalAlpha = 1), e.strokeStyle = se.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(q, i), e.stroke();
      const C = (ke) => i + B - ke / 100 * B;
      e.strokeStyle = se.grid, e.setLineDash([2, 2]), e.beginPath();
      const k = r?.stochastic?.overbought ?? 80, N = r?.stochastic?.oversold ?? 20;
      [N, 50, k].forEach((ke) => {
        const oe = C(ke);
        e.moveTo(0, oe), e.lineTo(q, oe);
      }), e.stroke(), e.setLineDash([]);
      const W = r?.stochastic?.kColor || "#3498DB";
      e.strokeStyle = W, e.lineWidth = 1.5, e.beginPath();
      let F = !1;
      c.candles.forEach((ke, oe) => {
        const Se = c.startIndex + oe, Ce = s.stochastic.k[Se];
        if (!isNaN(Ce) && isFinite(Ce)) {
          const Ze = me(Se, c.startIndex), ht = C(Ce);
          F ? e.lineTo(Ze, ht) : (e.moveTo(Ze, ht), F = !0);
        }
      }), e.stroke();
      const E = r?.stochastic?.dColor || "#E67E22";
      e.strokeStyle = E, e.lineWidth = 1.5, e.beginPath(), F = !1, c.candles.forEach((ke, oe) => {
        const Se = c.startIndex + oe, Ce = s.stochastic.d[Se];
        if (!isNaN(Ce) && isFinite(Ce)) {
          const Ze = me(Se, c.startIndex), ht = C(Ce);
          F ? e.lineTo(Ze, ht) : (e.moveTo(Ze, ht), F = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Xt, e.textAlign = "left", [0, N, 50, k, 100].forEach((ke) => {
        const oe = C(ke);
        e.fillText(ke.toString(), q + 5, oe);
      }), Qt.current.stochastic = { top: i, bottom: M };
      const S = `STOCH(${r?.stochastic?.kPeriod || 14},${r?.stochastic?.dPeriod || 3})`, R = r?.stochastic?.style?.customLabel || S, P = r?.stochastic?.style?.labelColor || se.textDim;
      e.fillStyle = P, e.font = `bold ${Xt}`, e.textAlign = "left";
      const $ = ft.current !== null ? ft.current : c.startIndex + c.candles.length - 1, J = s.stochastic.k[$], de = s.stochastic.d[$];
      e.fillText(R, 5, i + 12), e.fillStyle = W, e.font = Xt;
      const K = e.measureText(R).width, z = !isNaN(J) && isFinite(J) ? `%K ${J.toFixed(2)}` : "%K --";
      e.fillText(z, 10 + K, i + 12), e.fillStyle = E;
      const re = e.measureText(z).width, pe = !isNaN(de) && isFinite(de) ? `%D ${de.toFixed(2)}` : "%D --";
      e.fillText(pe, 16 + K + re, i + 12), Hn.current.stochastic = 16 + K + re + e.measureText(pe).width + 8, $t = M;
    }
    if (s?.williamsR) {
      const B = ts, i = $t, M = i + B, g = r?.williamsR?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, q, B), e.globalAlpha = 1), e.strokeStyle = se.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(q, i), e.stroke();
      const C = (K) => i + B - (K + 100) / 100 * B, k = r?.williamsR?.overbought ?? -20, N = r?.williamsR?.oversold ?? -80;
      e.setLineDash([4, 4]), e.strokeStyle = g.gridColor || "rgba(180, 130, 80, 0.6)", [N, -50, k].forEach((K) => {
        e.beginPath();
        const z = C(K);
        e.moveTo(0, z), e.lineTo(q, z), e.stroke();
      }), e.setLineDash([]);
      const W = r?.williamsR?.color || "#E91E63";
      e.strokeStyle = W, e.lineWidth = g.lineWidth ?? 1.5, e.beginPath();
      let F = !1;
      c.candles.forEach((K, z) => {
        const re = c.startIndex + z, pe = s.williamsR[re];
        if (!isNaN(pe) && isFinite(pe)) {
          const ke = me(re, c.startIndex), oe = C(pe);
          F ? e.lineTo(ke, oe) : (e.moveTo(ke, oe), F = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Xt, e.textAlign = "left", [-100, N, -50, k, 0].forEach((K) => {
        const z = C(K);
        e.fillText(K.toString(), q + 5, z);
      }), Qt.current.williamsR = { top: i, bottom: M };
      const E = `Williams %R ${r?.williamsR?.period || 14}`, S = r?.williamsR?.style?.customLabel || E, R = r?.williamsR?.style?.labelColor || "#d1d5db";
      e.fillStyle = R, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left";
      const P = ft.current !== null ? ft.current : c.startIndex + c.candles.length - 1, $ = s.williamsR[P], J = !isNaN($) && isFinite($) ? $.toFixed(2) : "--";
      e.fillText(S, 5, i + 15), e.fillStyle = W;
      const de = e.measureText(S).width;
      e.fillText(J, 13 + de, i + 15), Hn.current.williamsR = 13 + de + e.measureText(J).width + 8, $t = M;
    }
    if (s?.cci) {
      const B = ts, i = $t, M = i + B, g = r?.cci?.style || {};
      g.backgroundColor && (e.fillStyle = g.backgroundColor, e.globalAlpha = g.backgroundOpacity ?? 0.3, e.fillRect(0, i, q, B), e.globalAlpha = 1), e.strokeStyle = se.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(q, i), e.stroke();
      const C = c.candles.map((re, pe) => s.cci[c.startIndex + pe]).filter((re) => !isNaN(re) && isFinite(re)), k = C.length > 0 ? Math.max(200, Math.max(...C.map(Math.abs))) : 200, N = (re) => i + B / 2 - re / k * (B / 2), W = r?.cci?.overbought ?? 100, F = r?.cci?.oversold ?? -100;
      e.setLineDash([4, 4]), e.strokeStyle = g.gridColor || "rgba(180, 130, 80, 0.6)", [F, 0, W].forEach((re) => {
        e.beginPath();
        const pe = N(re);
        e.moveTo(0, pe), e.lineTo(q, pe), e.stroke();
      }), e.setLineDash([]);
      const E = r?.cci?.color || "#00BCD4";
      e.strokeStyle = E, e.lineWidth = g.lineWidth ?? 1.5, e.beginPath();
      let S = !1;
      c.candles.forEach((re, pe) => {
        const ke = c.startIndex + pe, oe = s.cci[ke];
        if (!isNaN(oe) && isFinite(oe)) {
          const Se = me(ke, c.startIndex), Ce = N(oe);
          S ? e.lineTo(Se, Ce) : (e.moveTo(Se, Ce), S = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Xt, e.textAlign = "left", [Math.round(-k), F, 0, W, Math.round(k)].forEach((re) => {
        const pe = N(re);
        e.fillText(re.toString(), q + 5, pe);
      }), Qt.current.cci = { top: i, bottom: M };
      const R = `CCI ${r?.cci?.period || 20}`, P = r?.cci?.style?.customLabel || R, $ = r?.cci?.style?.labelColor || "#d1d5db";
      e.fillStyle = $, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left";
      const J = ft.current !== null ? ft.current : c.startIndex + c.candles.length - 1, de = s.cci[J], K = !isNaN(de) && isFinite(de) ? de.toFixed(2) : "--";
      e.fillText(P, 5, i + 15), e.fillStyle = E;
      const z = e.measureText(P).width;
      e.fillText(K, 13 + z, i + 15), Hn.current.cci = 13 + z + e.measureText(K).width + 8, $t = M;
    }
    if (s?.adx) {
      const B = ts, i = $t, M = i + B;
      e.strokeStyle = se.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(q, i), e.stroke();
      const g = (S) => i + B - S / 100 * B;
      e.setLineDash([4, 4]), e.strokeStyle = "rgba(150, 150, 150, 0.3)", [25, 50, 75].forEach((S) => {
        e.beginPath(), e.moveTo(0, g(S)), e.lineTo(q, g(S)), e.stroke();
      }), e.setLineDash([]);
      const C = r?.adx?.adxColor || "#FFEB3B", k = r?.adx?.plusDIColor || "#22c55e", N = r?.adx?.minusDIColor || "#ef4444";
      e.strokeStyle = k, e.lineWidth = 1, e.beginPath();
      let W = !1;
      c.candles.forEach((S, R) => {
        const P = c.startIndex + R, $ = s.adx.plusDI[P];
        if (!isNaN($) && isFinite($)) {
          const J = me(P, c.startIndex), de = g($);
          W ? e.lineTo(J, de) : (e.moveTo(J, de), W = !0);
        }
      }), e.stroke(), e.strokeStyle = N, e.beginPath(), W = !1, c.candles.forEach((S, R) => {
        const P = c.startIndex + R, $ = s.adx.minusDI[P];
        if (!isNaN($) && isFinite($)) {
          const J = me(P, c.startIndex), de = g($);
          W ? e.lineTo(J, de) : (e.moveTo(J, de), W = !0);
        }
      }), e.stroke(), e.strokeStyle = C, e.lineWidth = 2, e.beginPath(), W = !1, c.candles.forEach((S, R) => {
        const P = c.startIndex + R, $ = s.adx.adx[P];
        if (!isNaN($) && isFinite($)) {
          const J = me(P, c.startIndex), de = g($);
          W ? e.lineTo(J, de) : (e.moveTo(J, de), W = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Xt, [0, 25, 50, 75, 100].forEach((S) => {
        e.fillText(S.toString(), q + 5, g(S));
      });
      const F = ft.current !== null ? ft.current : c.startIndex + c.candles.length - 1, E = s.adx.adx[F];
      e.fillStyle = "#d1d5db", e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.fillText(`ADX ${r?.adx?.period || 14}`, 5, i + 15), e.fillStyle = C, e.fillText(!isNaN(E) && isFinite(E) ? E.toFixed(2) : "--", 73, i + 15), e.fillStyle = k, e.fillText("+DI", 118, i + 15), e.fillStyle = N, e.fillText("-DI", 148, i + 15), Hn.current.adx = 148 + e.measureText("-DI").width + 8, Qt.current.adx = { top: i, bottom: M }, $t = M;
    }
    if (s?.roc) {
      const B = ts, i = $t, M = i + B;
      e.strokeStyle = se.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, i), e.lineTo(q, i), e.stroke();
      const g = c.candles.map((P, $) => s.roc[c.startIndex + $]).filter((P) => !isNaN(P) && isFinite(P)), C = g.length > 0 ? Math.max(5, Math.max(...g.map(Math.abs))) : 5, k = (P) => i + B / 2 - P / C * (B / 2);
      e.setLineDash([4, 4]), e.strokeStyle = "rgba(150, 150, 150, 0.5)", e.beginPath(), e.moveTo(0, k(0)), e.lineTo(q, k(0)), e.stroke(), e.setLineDash([]);
      const N = r?.roc?.color || "#9C27B0";
      e.strokeStyle = N, e.lineWidth = 1.5, e.beginPath();
      let W = !1;
      c.candles.forEach((P, $) => {
        const J = c.startIndex + $, de = s.roc[J];
        if (!isNaN(de) && isFinite(de)) {
          const K = me(J, c.startIndex), z = k(de);
          W ? e.lineTo(K, z) : (e.moveTo(K, z), W = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Xt, [-C, 0, C].forEach((P) => {
        e.fillText(P.toFixed(1) + "%", q + 5, k(P));
      }), e.fillStyle = "#d1d5db", e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
      const F = ft.current !== null ? ft.current : c.startIndex + c.candles.length - 1, E = s.roc[F], S = !isNaN(E) && isFinite(E) ? E.toFixed(2) + "%" : "--";
      e.fillText(`ROC ${r?.roc?.period || 12}`, 5, i + 15), e.fillStyle = N;
      const R = e.measureText(`ROC ${r?.roc?.period || 12}`).width;
      e.fillText(S, 13 + R, i + 15), Hn.current.roc = 13 + R + e.measureText(S).width + 8, Qt.current.roc = { top: i, bottom: M }, $t = M;
    }
    const Wo = {
      ctx: e,
      chartWidth: q,
      subplotHeight: ts,
      visible: c,
      indexToX: me,
      currentCandleWidth: hn,
      subplotLabelFont: Xt,
      hoveredCandleIndex: ft.current,
      colors: { textDim: se.textDim, grid: se.grid },
      indicators: r,
      indicatorData: s,
      indicatorBounds: Qt.current,
      subplotLabelEndX: Hn.current,
      mainPriceToY: lt,
      mainChartHeight: je,
      skipIndicators: O,
      clickedIndicatorKey: It
    };
    if (ju(Wo), $t = Ru(Wo, $t), Pu(Wo), tt && tt.length > 0 && c.candles.length > 0) {
      const B = (P) => P ? P.toUpperCase().trim().slice(0, 2) : "??", i = (P) => {
        if (P.datetime) {
          const $ = new Date(P.datetime).getTime();
          if (!isNaN($)) return $;
        }
        if (!P.date) return null;
        try {
          const [$, J, de] = P.date.split("-").map(Number);
          if (!P.time) return Date.UTC($, J - 1, de, 12, 0);
          const K = P.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
          if (!K) return Date.UTC($, J - 1, de, 12, 0);
          let z = parseInt(K[1]);
          const re = parseInt(K[2]), pe = K[3]?.toUpperCase();
          return pe === "PM" && z !== 12 ? z += 12 : pe === "AM" && z === 12 && (z = 0), Date.UTC($, J - 1, de, z, re);
        } catch {
          return null;
        }
      }, M = [];
      e.save();
      const g = { high: 0, medium: 1, low: 2 }, C = [], k = Date.now();
      for (const P of tt) {
        const $ = i(P);
        if (!$ || $ < k) continue;
        const J = l.length > 1 ? Math.abs(l[1].time - l[0].time) : 6e4, de = l[l.length - 1], K = de && $ > de.time + J;
        let z, re;
        if (K) {
          const oe = ($ - de.time) / J, Se = l.length - 1 + oe;
          if (re = Math.round(Se), z = me(Se, c.startIndex), z < 0 || z > q - 10) continue;
        } else {
          let ke = 0, oe = l.length - 1;
          for (re = -1; ke <= oe; ) {
            const Ce = Math.floor((ke + oe) / 2);
            if (l[Ce].time === $) {
              re = Ce;
              break;
            }
            l[Ce].time < $ ? ke = Ce + 1 : oe = Ce - 1;
          }
          if (re === -1) {
            const Ce = ke >= 0 && ke < l.length, Ze = oe >= 0 && oe < l.length;
            Ce && Ze ? re = Math.abs(l[ke].time - $) < Math.abs(l[oe].time - $) ? ke : oe : Ce ? re = ke : Ze ? re = oe : re = l.length - 1;
          }
          const Se = Math.abs(l[re].time - $);
          if (re < 0 || Se > J || re < c.startIndex || re >= c.endIndex || (z = me(re, c.startIndex), z < 0 || z > q)) continue;
        }
        const pe = Lu({ event: P.event || "", country: P.region_code || "" });
        C.push({ x: z, event: P, impact: pe, ts: $, closestIdx: re });
      }
      C.sort((P, $) => {
        const J = g[P.impact] ?? 3, de = g[$.impact] ?? 3;
        return J !== de ? J - de : (P.event.event || "").localeCompare($.event.event || "");
      });
      const N = /* @__PURE__ */ new Map();
      for (const P of C) {
        const $ = Math.round(P.x);
        N.has($) || N.set($, []), N.get($).push(P);
      }
      const W = document.documentElement.classList.contains("dark"), F = v - kt, E = 22, S = 32, R = F - E / 2 - 5;
      for (const [P, $] of N) {
        const J = $[0].x, de = $[0].impact, K = de === "high", z = de === "low", re = B($[0].event.region_code), pe = Nu($[0].event.region_code), ke = $.length;
        M.push({
          x: J,
          y: R,
          event: $[0].event,
          impact: de,
          ts: $[0].ts,
          groupEvents: $.map((mt) => ({ event: mt.event, impact: mt.impact, ts: mt.ts }))
        });
        const oe = K ? "#dc2626" : z ? "#22c55e" : "#d97706";
        e.save(), e.shadowColor = W ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.15)", e.shadowBlur = 8, e.shadowOffsetY = 2;
        const Se = J - S / 2, Ce = R - E / 2;
        e.fillStyle = W ? "rgba(30, 41, 59, 0.92)" : "rgba(255, 255, 255, 0.95)", e.beginPath(), e.roundRect(Se, Ce, S, E, 6), e.fill(), e.shadowColor = "transparent", e.shadowBlur = 0, e.strokeStyle = W ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)", e.lineWidth = 1, e.stroke(), e.fillStyle = oe, e.beginPath(), e.roundRect(Se, Ce, 3, E, [6, 0, 0, 6]), e.fill(), e.restore();
        const Ze = 18, ht = 13;
        if (pe ? e.drawImage(pe, J - Ze / 2, R - ht / 2, Ze, ht) : (e.font = 'bold 9px -apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif', e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = W ? "#e2e8f0" : "#334155", e.fillText(re, J + 1, R)), ke > 1) {
          const mt = Se + S - 2, Dt = Ce - 2, yn = 7;
          e.beginPath(), e.arc(mt, Dt, yn, 0, Math.PI * 2), e.fillStyle = oe, e.fill(), e.strokeStyle = W ? "#0f172a" : "#ffffff", e.lineWidth = 1.5, e.stroke(), e.font = 'bold 8px -apple-system, BlinkMacSystemFont, "Inter", sans-serif', e.fillStyle = "#ffffff", e.fillText(String(ke), mt, Dt + 0.5);
        }
        e.beginPath(), e.moveTo(J, R + E / 2), e.lineTo(J, F), e.strokeStyle = K ? "rgba(220, 38, 38, 0.3)" : z ? "rgba(34, 197, 94, 0.25)" : "rgba(217, 119, 6, 0.3)", e.lineWidth = 1, e.setLineDash([2, 3]), e.stroke(), e.setLineDash([]);
      }
      e.restore(), Is.current = M;
    } else
      Is.current = [];
    if (e.strokeStyle = se.axisLine || se.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, v - kt), e.lineTo(x, v - kt), e.stroke(), Xe.versionLabelVisible) {
      const B = Xn === 0 ? 0 : Xe.versionLabelXOffset, i = q + Ke / 2 + B, M = v - kt / 2 + 1;
      e.save(), e.font = 'bold 11px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = se.text, e.fillText("v.23", i, M), e.restore();
    }
    if (c.candles.length > 0) {
      const B = hn * (1 + Ye), i = Math.max(1, Math.floor(80 / B)), M = v - kt, g = M + 16;
      if (e.font = ir, e.textAlign = "center", e.textBaseline = "middle", e.save(), e.beginPath(), e.rect(0, M, q, kt), e.clip(), !c.candles || c.candles.length === 0) {
        e.restore();
        return;
      }
      const C = c.candles[0], k = c.candles[c.candles.length - 1];
      if (!C || !k) {
        e.restore();
        return;
      }
      const N = (/* @__PURE__ */ new Date()).getFullYear(), W = new Date(C.time).getFullYear(), F = new Date(k.time).getFullYear(), E = W !== F, S = W !== N || F !== N, R = c.candles[1], P = R ? R.time - C.time : 6e4, J = P / 6e4 >= 60;
      let de = "", K = -1, z = -1 / 0;
      const re = 12, pe = (oe, Se) => {
        if (J) {
          const ht = es(oe, S || E || Se !== K);
          return ht !== de ? (de = ht, K = Se, ht) : Rs(oe);
        }
        const Ce = es(oe, !1);
        return Se !== K && K !== -1 ? (K = Se, es(oe, !0)) : Ce !== de ? (de = Ce, K = Se, es(oe, S)) : Rs(oe);
      }, ke = fe.width < 400;
      if (Xe.useFixedTimeAxisLabels) {
        const oe = ke ? Xe.fixedTimeAxisLabelCountSmall : Xe.fixedTimeAxisLabelCount, Se = 5, Ce = q - Se * 2;
        for (let Ze = 0; Ze < oe; Ze++) {
          const ht = Se + Ce * (Ze + 0.5) / oe, mt = rl(ht, c.startIndex), Dt = Math.round(mt) - c.startIndex, yn = Dt >= 0 && Dt < c.candles.length ? c.candles[Dt] : null, Bn = yn ? yn.time : C.time + (mt - c.startIndex) * P, Pt = yn ? me(c.startIndex + Dt, c.startIndex) : ht, Bt = new Date(Bn).getFullYear(), wt = pe(Bn, Bt);
          e.fillStyle = se.axisLabel, e.fillText(wt, Pt, g);
        }
      } else {
        const Ze = [
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
        let mt = Ze[Ze.length - 1];
        for (const Pt of Ze)
          if (Pt >= ht) {
            mt = Pt;
            break;
          }
        const Dt = Math.ceil(C.time / mt) * mt, yn = k.time + mt * 25;
        let Bn = -1;
        for (let Pt = Dt; Pt <= yn; Pt += mt) {
          let Bt, wt = Pt;
          if (Pt <= k.time) {
            let Zt = 0, Ns = c.candles.length - 1, dl = Ns;
            for (; Zt <= Ns; ) {
              const zl = Zt + Ns >> 1;
              c.candles[zl].time >= Pt ? (dl = zl, Ns = zl - 1) : Zt = zl + 1;
            }
            if (dl === Bn) continue;
            Bn = dl, wt = c.candles[dl].time, Bt = me(c.startIndex + dl, c.startIndex);
          } else {
            const Zt = c.startIndex + (c.candles.length - 1) + (Pt - k.time) / P;
            Bt = me(Zt, c.startIndex);
          }
          if (Bt < 2 || Bt > q - 10) continue;
          const Vn = pe(wt, new Date(wt).getFullYear()), tn = e.measureText(Vn).width, Ht = Bt - tn / 2, fn = Bt + tn / 2;
          Ht < z + re || fn > q - 10 || Ht < 2 || (e.fillStyle = se.axisLabel, e.fillText(Vn, Bt, g), z = fn);
        }
      }
      e.restore(), (Vs.length > 0 || Ls.length > 0) && (e.save(), Vs.forEach((oe) => {
        e.fillStyle = Ao, e.beginPath(), e.roundRect(oe.topOrigin, Do, oe.bWidth, ul, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.font = Yl, e.fillText(oe.text, oe.topOrigin + oe.bWidth / 2, Do + ul / 2);
      }), Ls.forEach((oe) => {
        e.fillStyle = Ao, e.beginPath(), e.roundRect(Bo, oe.topOrigin, oe.bWidth, ul, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.font = Yl, e.fillText(oe.text, Bo + oe.bWidth / 2, oe.topOrigin + ul / 2);
      }), e.restore());
    }
    const Fo = p.getContext("2d");
    Fo && (Fo.setTransform(1, 0, 0, 1, 0, 0), Fo.drawImage(f, 0, 0)), Yn.current = {
      startIndex: Sr,
      candleWidth: hn
    }, Mt.current && Un.current?.();
  }, [fe, l, n, ce, se, s, G, En, js, An, Rs, es, hr, Rl, Sn, I, r, Ae, dt, tt, xt, It, ss, ws]);
  Cn.current = ps, o.useEffect(() => {
    Ks && (Ks.current = () => {
      st(!0);
    });
  }, [Ks]);
  const Ot = o.useCallback(() => {
    const a = Je.current, p = a?.getContext("2d");
    if (!a || !p) return;
    const x = {
      ctx: p,
      dimensions: fe,
      dpr: Sn,
      candles: l,
      colors: se,
      viewState: ce,
      indicatorData: s,
      indicators: r,
      indicatorHeightRatio: G,
      showOHLC: Qn,
      isDesktop: Nl,
      PRICE_AXIS_WIDTH: Ke,
      TIME_AXIS_HEIGHT: kt,
      PRICE_LABEL_FONT: El,
      TIME_LABEL_FONT: ir,
      crosshair: _n.current,
      isScrolling: Mt.current,
      scrollState: {
        startIndex: Pe.current.startIndex,
        candleWidth: Pe.current.candleWidth
      },
      isDraggingHandle: !!it.current,
      isHoveredSLTP: !!Fn.current,
      sessionControlHovered: uo.current,
      isSyncedUpdate: Us.current,
      syncedCrosshairTime: Tl.current ?? void 0,
      hoveredEvent: pn.current || Ts.current,
      currentOhlcTextWidth: er,
      currentBbTextEndX: ho,
      currentMaTextEndX: fo,
      currentVwapTextEndX: po,
      currentVpTextEndX: mo,
      currentVolTextEndX: xo,
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
        onCrosshairMove: le
      }
    };
    Eu(x);
  }, [fe, l, ce, se, s, r, G, En, js, ur, rl, dr, An, Rs, es, le, Sn, Qn, ae]);
  o.useEffect(() => {
    On.current = Ot;
  }, [Ot]), o.useEffect(() => {
    Jt.current = se?.crosshairStyle || "standard", Je.current && (Je.current.style.cursor = Jt.current !== "standard" ? "none" : "crosshair");
  }, [se?.crosshairStyle]);
  const {
    handleZoomIn: ma,
    handleZoomOut: xa,
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
    priceAxisWidth: Ke,
    timeAxisHeight: kt,
    dimensions: fe,
    candlesLength: l.length,
    disableAutoFollow: xe,
    livePrice: n ?? null,
    scrollStateRef: Pe,
    drawChartRef: Cn,
    notifyScrollSync: St,
    getVisibleCandles: En,
    getPriceRange: js,
    setViewState: Nt,
    setPriceScale: We,
    setPriceOffset: ds,
    setFixedPriceCenter: jt,
    setFixedPriceRange: Qr,
    setIsScalingYAxis: co,
    fixedPriceCenter: Ut,
    priceScale: Vt,
    priceOffset: bt,
    viewStateAutoFollowLatest: ce.autoFollowLatest,
    yAxisScaleStartRef: tl,
    priceScaleRef: gn,
    priceOffsetRef: Zn,
    yAxisDebounceRef: Jn
  }), Sa = o.useCallback((a) => {
    const p = Je.current;
    if (!p) return;
    const x = p.getBoundingClientRect(), v = a.clientX - x.left, f = a.clientY - x.top;
    if (("ontouchstart" in window || navigator.maxTouchPoints > 0) && !Pn && !jn && !it.current)
      return;
    if (_n.current = { x: v, y: f }, !jn && !it.current && r && s) {
      const w = on.current, A = rn.current;
      if (w && A > 0 && f < A) {
        const Y = Pe.current, u = Y.candleWidth * (1 + Ye), L = Math.max(0, Math.floor(Y.startIndex)), m = L + Math.round(v / u), V = 8, d = (Q) => isNaN(Q) || !isFinite(Q) ? !1 : Math.abs(f - (A - (Q - w.min) / w.range * A)) < V;
        let j = null;
        if (!j && r.movingAverages?.enabled && s.movingAverages) {
          for (const Q of s.movingAverages)
            if (m >= 0 && m < Q.data.length && d(Q.data[m])) {
              j = "movingAverages";
              break;
            }
        }
        if (!j && r.bollinger?.enabled && s.bollinger) {
          const Q = s.bollinger;
          m >= 0 && m < Q.upper.length && (d(Q.upper[m]) || d(Q.middle[m]) || d(Q.lower[m])) && (j = "bollinger");
        }
        if (!j && r.vwap?.enabled && s.vwap && m >= 0 && m < s.vwap.length && d(s.vwap[m]) && (j = "vwap"), !j && r.supertrend?.enabled && s.supertrend && m >= 0 && m < s.supertrend.length && s.supertrend[m] && d(s.supertrend[m].value) && (j = "supertrend"), !j && r.ichimoku?.enabled && s.ichimoku) {
          const Q = s.ichimoku;
          m >= 0 && m < Q.tenkan.length && (d(Q.tenkan[m]) || d(Q.kijun[m]) || d(Q.senkouA[m]) || d(Q.senkouB[m])) && (j = "ichimoku");
        }
        if (!j && r.keltner?.enabled && s.keltner) {
          const Q = s.keltner;
          m >= 0 && m < Q.upper.length && (d(Q.upper[m]) || d(Q.middle[m]) || d(Q.lower[m])) && (j = "keltner");
        }
        if (!j && r.donchian?.enabled && s.donchian) {
          const Q = s.donchian;
          m >= 0 && m < Q.upper.length && (d(Q.upper[m]) || d(Q.middle[m]) || d(Q.lower[m])) && (j = "donchian");
        }
        if (!j && r.envelopes?.enabled && s.envelopes) {
          const Q = s.envelopes;
          m >= 0 && m < Q.upper.length && (d(Q.upper[m]) || d(Q.basis[m]) || d(Q.lower[m])) && (j = "envelopes");
        }
        if (!j && r?.volume?.enabled && A > 0 && f >= A * 0.8 && f <= A) {
          const Q = m - L, $e = En();
          if (Q >= 0 && Q < $e.candles.length) {
            const Z = $e.candles[Q].volume ?? 0;
            if (Z > 0) {
              const Te = A * 0.2, Ge = A, He = $e.candles.map((Ue) => Ue.volume ?? 0).filter((Ue) => Ue > 0), ue = He.length > 0 ? Math.max(...He) : 1, Me = Z / ue * Te * 0.95, et = Ge - Me;
              f >= et && (j = "volume");
            }
          }
        }
        const ie = fe.width - Ke;
        if (!j && r?.volumeProfile?.enabled && A > 0 && v >= ie * (1 - (r.volumeProfile.rowWidth ?? 15) / 100)) {
          const Q = En();
          if (Q.candles.length > 0) {
            const $e = r.volumeProfile.numberOfRows ?? 48, Z = ie * ((r.volumeProfile.rowWidth ?? 15) / 100), Te = r.volumeProfile.lookbackBars ?? 0, Ge = Te > 0 ? Q.candles.slice(-Te) : Q.candles;
            let He = 1 / 0, ue = -1 / 0;
            Ge.forEach((Ue) => {
              He = Math.min(He, Ue.low), ue = Math.max(ue, Ue.high);
            });
            const Me = (ue - He || 1) / $e, et = on.current;
            if (et && et.range > 0) {
              const Ue = et.max - f / A * et.range, _t = Math.floor((Ue - He) / Me);
              if (_t >= 0 && _t < $e) {
                const vn = new Float64Array($e);
                Ge.forEach((Rt) => {
                  if (!(!Rt.volume || Rt.volume <= 0))
                    for (let bs = 0; bs < $e; bs++) {
                      const cl = He + bs * Me, $l = cl + Me;
                      if (Rt.high >= cl && Rt.low <= $l) {
                        const To = Math.max(Rt.low, cl), Mo = Math.min(Rt.high, $l), jo = Rt.high - Rt.low > 0 ? (Mo - To) / (Rt.high - Rt.low) : 1;
                        vn[bs] += Rt.volume * jo;
                      }
                    }
                });
                let qt = 0;
                for (let Rt = 0; Rt < $e; Rt++)
                  vn[Rt] > qt && (qt = vn[Rt]);
                const _l = vn[_t];
                if (_l > 0 && qt > 0) {
                  const Rt = _l / qt * Z, bs = ie - Rt;
                  v >= bs && (j = "volumeProfile");
                }
              }
            }
          }
        }
        if (!j && r.customIndicators) {
          const $e = (Z) => isNaN(Z) || !isFinite(Z) ? !1 : Math.abs(f - (A - (Z - w.min) / w.range * A)) < 14;
          for (const Z of r.customIndicators) {
            const Te = Z.data;
            if (!(!Z.enabled || Z.display !== "overlay" || !Te) && m >= 0 && m < Te.length && $e(Te[m])) {
              const Ge = Z.scriptId;
              j = typeof Z.expression == "string" && Z.expression.startsWith("brue:") && Ge ? `script-${Ge}` : `ci-${Z.id}`;
              break;
            }
          }
        }
        if (!j) {
          const Q = Qt.current, $e = [];
          if (r.rsi?.enabled && s.rsi) {
            const Z = Q.rsi;
            $e.push({ key: "sp-rsi", check: () => {
              if (!Z || f < Z.top || f > Z.bottom || m < 0 || m >= s.rsi.length) return !1;
              const Te = s.rsi[m];
              if (isNaN(Te) || !isFinite(Te)) return !1;
              const Ge = Z.bottom - Z.top;
              return Math.abs(f - (Z.top + Ge - Te / 100 * Ge)) < V;
            } });
          }
          if (r.macd?.enabled && s.macd) {
            const Z = Q.macd;
            $e.push({ key: "sp-macd", check: () => !(!Z || f < Z.top || f > Z.bottom) });
          }
          if (r.stochastic?.enabled && s.stochastic) {
            const Z = Q.stochastic;
            $e.push({ key: "sp-stochastic", check: () => {
              if (!Z || f < Z.top || f > Z.bottom || m < 0 || m >= s.stochastic.k.length) return !1;
              const Te = Z.bottom - Z.top, Ge = Z.top + Te - s.stochastic.k[m] / 100 * Te, He = Z.top + Te - s.stochastic.d[m] / 100 * Te;
              return Math.abs(f - Ge) < V || Math.abs(f - He) < V;
            } });
          }
          if (r.atr?.enabled && s.atr) {
            const Z = Q.atr;
            $e.push({ key: "sp-atr", check: () => !(!Z || f < Z.top || f > Z.bottom) });
          }
          for (const Z of $e)
            if (Z.check()) {
              j = Z.key;
              break;
            }
        }
        const Fe = Ms.current;
        if (Ms.current = j, j !== Fe && Je.current) {
          const Q = Jt.current !== "standard" ? "none" : "crosshair";
          Je.current.style.cursor = j ? "pointer" : Q;
        }
      } else if (Ms.current && (Ms.current = null, Je.current && !lr.current)) {
        const Y = Jt.current !== "standard" ? "none" : "crosshair";
        Je.current.style.cursor = Y;
      }
    }
    const O = rn.current, H = fe.height;
    if (O > 0 && Je.current) {
      if (f > O && f < H - 30)
        Je.current.style.cursor = "pointer";
      else if (f <= O && !Ms.current && !lr.current) {
        const w = Jt.current !== "standard" ? "none" : "crosshair";
        Je.current.style.cursor = w;
      }
    }
    let U = !1;
    for (const w of Is.current) {
      const A = v - w.x, Y = f - w.y;
      if (Math.sqrt(A * A + Y * Y) < 16) {
        Ts.current = w, U = !0, Je.current && (Je.current.style.cursor = "pointer");
        break;
      }
    }
    if (U || (Ts.current = null), it.current) {
      const w = on.current, A = rn.current;
      if (w && w.range > 0 && A > 0) {
        const Y = w.max - f / A * w.range;
        it.current === "sl" ? ut.current = Y : ct.current = Y, Je.current && (Je.current.style.cursor = ne), bn.current === null && (bn.current = requestAnimationFrame(() => {
          st(!1), bn.current = null;
        }));
        return;
      }
    }
    if (Be && Be.length > 0) {
      const w = on.current, A = rn.current;
      if (w && w.range > 0 && A > 0) {
        let Y = !1;
        for (const u of Be) {
          const L = (w.max - u.price) / w.range * A;
          if (v <= 160 && Math.abs(f - L) < 12) {
            Y = !0;
            break;
          }
          if (u.id === Ne.current) {
            const V = Math.min(L + 10, A - 22 - 4), d = fe.width - Ke, j = 144 + 5 * 2, ie = (d - j) / 2;
            if (v >= ie - 8 && v <= ie + j + 8 && f >= V - 8 && f <= V + 22 + 8) {
              Y = !0;
              break;
            }
          }
        }
        Y && Je.current && (Je.current.style.cursor = "pointer");
      }
    }
    if (Ne.current && Be && Be.length > 0) {
      const w = on.current, A = rn.current;
      if (w && w.range > 0 && A > 0) {
        const Y = w.max - f / A * w.range, u = w.range * 0.012, L = Be.find((m) => m.id === Ne.current);
        if (L) {
          const m = L.side === "buy", V = Kn(L.price), d = ut.current ?? L.stopLoss ?? (m ? L.price - V : L.price + V), j = ct.current ?? L.takeProfit ?? (m ? L.price + V : L.price - V), ie = Math.abs(Y - d) < u, Fe = Math.abs(Y - j) < u;
          if (ie || Fe)
            Je.current && (Je.current.style.cursor = y), Fn.current = ie ? "sl" : "tp", st(!1);
          else if (Fn.current && (Fn.current = null, st(!1)), Je.current) {
            const Q = Jt.current !== "standard" ? "none" : "crosshair";
            Je.current.style.cursor !== Q && (Je.current.style.cursor = Q);
          }
        }
      }
    }
    if (jn) {
      if (a.buttons === 0) {
        cs(!1), Ft(!1);
        return;
      }
      Ft(!0);
      const w = v - mn.x, A = f - mn.y, Y = ce.candleWidth * (1 + Ye), u = w / Y, L = Math.max(
        0,
        Math.min(l.length - 10, mn.startIndex - u)
      );
      if (Pe.current = {
        startIndex: L,
        candleWidth: ce.candleWidth
      }, hs && At !== null) {
        const m = At / gn.current / (fe.height - kt), V = A * m;
        Zn.current = mn.priceOffset + V;
      }
      $n.current === null && ($n.current = requestAnimationFrame(() => {
        st(!0), Ot(), St(), $n.current = null;
      })), Ct.current && clearTimeout(Ct.current), Ct.current = setTimeout(() => {
        const m = Pe.current;
        Nt((V) => ({
          ...V,
          startIndex: m.startIndex,
          // Keep float precision - no rounding
          autoFollowLatest: !1
        })), hs && ds(Zn.current), Ft(!1);
      }, 100);
      return;
    }
    const _ = En(), b = rl(v, _.startIndex);
    b >= 0 && b < l.length ? ft.current = b : ft.current = null, Ot();
  }, [jn, mn, ce.candleWidth, l.length, hs, At, Vt, fe.height, Ot, Pn, En, rl, l]), Ca = o.useCallback((a) => {
    const p = Je.current;
    if (!p) return;
    const x = p.getBoundingClientRect(), v = a.clientX - x.left, f = a.clientY - x.top;
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
        { key: "ichimoku", title: "Ichimoku", enabledCheck: () => !!(r?.ichimoku?.enabled && s?.ichimoku), endXSource: () => at.ichimoku || 0 },
        { key: "keltner", title: "Keltner", enabledCheck: () => !!(r?.keltner?.enabled && s?.keltner), endXSource: () => at.keltner || 0 },
        { key: "volumeProfile", title: "Vol Profile", enabledCheck: () => !!r?.volumeProfile?.enabled, endXSource: () => mo },
        { key: "volume", title: "Volume", enabledCheck: () => !!(r?.volume?.enabled && l.some((w) => w.volume)), endXSource: () => xo },
        { key: "supertrend", title: "Supertrend", enabledCheck: () => !!(r?.supertrend?.enabled && s?.supertrend), endXSource: () => at.supertrend || 0 },
        { key: "donchian", title: "Donchian", enabledCheck: () => !!(r?.donchian?.enabled && s?.donchian), endXSource: () => at.donchian || 0 },
        { key: "envelopes", title: "Envelopes", enabledCheck: () => !!(r?.envelopes?.enabled && s?.envelopes), endXSource: () => at.envelopes || 0 },
        // Phase 2 overlays
        { key: "alma", title: "ALMA", enabledCheck: () => !!(r?.alma?.enabled && s?.alma), endXSource: () => at.alma || 0 },
        { key: "kama", title: "KAMA", enabledCheck: () => !!(r?.kama?.enabled && s?.kama), endXSource: () => at.kama || 0 },
        { key: "zlema", title: "ZLEMA", enabledCheck: () => !!(r?.zlema?.enabled && s?.zlema), endXSource: () => at.zlema || 0 },
        { key: "t3", title: "T3", enabledCheck: () => !!(r?.t3?.enabled && s?.t3), endXSource: () => at.t3 || 0 },
        { key: "lsma", title: "LSMA", enabledCheck: () => !!(r?.lsma?.enabled && s?.lsma), endXSource: () => at.lsma || 0 },
        { key: "mcginley", title: "McGinley", enabledCheck: () => !!(r?.mcginley?.enabled && s?.mcginley), endXSource: () => at.mcginley || 0 },
        { key: "wma", title: "WMA", enabledCheck: () => !!(r?.wma?.enabled && s?.wma), endXSource: () => at.wma || 0 },
        { key: "smmaOverlay", title: "SMMA", enabledCheck: () => !!(r?.smmaOverlay?.enabled && s?.smmaOverlay), endXSource: () => at.smmaOverlay || 0 },
        { key: "vwma", title: "VWMA", enabledCheck: () => !!(r?.vwma?.enabled && s?.vwma), endXSource: () => at.vwma || 0 },
        { key: "medianPrice", title: "Median", enabledCheck: () => !!(r?.medianPrice?.enabled && s?.medianPrice), endXSource: () => at.medianPrice || 0 },
        { key: "typicalPrice", title: "Typical", enabledCheck: () => !!(r?.typicalPrice?.enabled && s?.typicalPrice), endXSource: () => at.typicalPrice || 0 },
        { key: "weightedClose", title: "WClose", enabledCheck: () => !!(r?.weightedClose?.enabled && s?.weightedClose), endXSource: () => at.weightedClose || 0 },
        { key: "zigzag", title: "ZigZag", enabledCheck: () => !!(r?.zigzag?.enabled && s?.zigzag), endXSource: () => at.zigzag || 0 },
        { key: "alligator", title: "Alligator", enabledCheck: () => !!(r?.alligator?.enabled && s?.alligator), endXSource: () => at.alligator || 0 },
        { key: "priceChannel", title: "Price Ch", enabledCheck: () => !!(r?.priceChannel?.enabled && s?.priceChannel), endXSource: () => at.priceChannel || 0 },
        { key: "chandeKroll", title: "Chande Kroll", enabledCheck: () => !!(r?.chandeKroll?.enabled && s?.chandeKroll), endXSource: () => at.chandeKroll || 0 },
        { key: "chandelierExit", title: "Chandelier", enabledCheck: () => !!(r?.chandelierExit?.enabled && s?.chandelierExit), endXSource: () => at.chandelierExit || 0 },
        { key: "accBands", title: "Acc Bands", enabledCheck: () => !!(r?.accBands?.enabled && s?.accBands), endXSource: () => at.accBands || 0 },
        { key: "demarkPivots", title: "DeMark", enabledCheck: () => !!(r?.demarkPivots?.enabled && s?.demarkPivots), endXSource: () => at.demarkPivots || 0 },
        { key: "fractals", title: "Fractals", enabledCheck: () => !!(r?.fractals?.enabled && s?.fractals), endXSource: () => at.fractals || 0 }
      ];
      let b = 28;
      for (const w of _) {
        if (!w.enabledCheck()) continue;
        const A = fe.width < 500 ? 14 : 19, Y = w.endXSource();
        if (w.key === "movingAverages" && s?.movingAverages?.length > 0) {
          const L = r.movingAverages?.lines ?? [], m = r?.customBrueScripts || {};
          let V = 0;
          for (let d = 0; d < s.movingAverages.length; d++) {
            const j = L[d]?.sourceScriptId;
            if (j && m[j]?.enabled) continue;
            const ie = b + V * A - 10, Fe = ie + A;
            if (Y > 0 && v >= 0 && v <= Y && f >= ie && f <= Fe) {
              const Q = `movingAverages__${d}`;
              he(($e) => $e === Q ? null : Q), be(Q);
              return;
            }
            V++;
          }
          b += V * A;
          continue;
        }
        const u = A;
        if (Y > 0 && v >= 0 && v <= Y && f >= b - 10 && f <= b - 10 + u) {
          he((L) => L === w.key ? null : w.key), be(w.key);
          return;
        }
        b += u;
      }
    }
    if (r && s) {
      const _ = on.current, b = rn.current;
      if (_ && b > 0) {
        const w = Pe.current, A = w.candleWidth * (1 + Ye);
        fe.width - Ke;
        const u = Math.max(0, Math.floor(w.startIndex)) + Math.round(v / A), L = 8, m = (d) => {
          if (isNaN(d) || !isFinite(d)) return !1;
          const j = b - (d - _.min) / _.range * b;
          return Math.abs(f - j) < L;
        };
        if (r.movingAverages?.enabled && s.movingAverages)
          for (let d = 0; d < s.movingAverages.length; d++) {
            const j = s.movingAverages[d];
            if (u >= 0 && u < j.data.length && m(j.data[u])) {
              const ie = `movingAverages__${d}`;
              he((Fe) => Fe === ie ? null : ie), be(ie);
              return;
            }
          }
        if (r.bollinger?.enabled && s.bollinger) {
          const d = s.bollinger;
          if (u >= 0 && u < d.upper.length && (m(d.upper[u]) || m(d.middle[u]) || m(d.lower[u]))) {
            he((j) => j === "bollinger" ? null : "bollinger"), be("bollinger");
            return;
          }
        }
        if (r.vwap?.enabled && s.vwap && u >= 0 && u < s.vwap.length && m(s.vwap[u])) {
          he((d) => d === "vwap" ? null : "vwap"), be("vwap");
          return;
        }
        if (r.supertrend?.enabled && s.supertrend && u >= 0 && u < s.supertrend.length) {
          const d = s.supertrend[u];
          if (d && m(d.value)) {
            he((j) => j === "supertrend" ? null : "supertrend"), be("supertrend");
            return;
          }
        }
        if (r.ichimoku?.enabled && s.ichimoku) {
          const d = s.ichimoku;
          if (u >= 0 && u < d.tenkan.length && (m(d.tenkan[u]) || m(d.kijun[u]) || m(d.senkouA[u]) || m(d.senkouB[u]))) {
            he((j) => j === "ichimoku" ? null : "ichimoku"), be("ichimoku");
            return;
          }
        }
        if (r.keltner?.enabled && s.keltner) {
          const d = s.keltner;
          if (u >= 0 && u < d.upper.length && (m(d.upper[u]) || m(d.middle[u]) || m(d.lower[u]))) {
            he((j) => j === "keltner" ? null : "keltner"), be("keltner");
            return;
          }
        }
        if (r.donchian?.enabled && s.donchian) {
          const d = s.donchian;
          if (u >= 0 && u < d.upper.length && (m(d.upper[u]) || m(d.middle[u]) || m(d.lower[u]))) {
            he((j) => j === "donchian" ? null : "donchian"), be("donchian");
            return;
          }
        }
        if (r.envelopes?.enabled && s.envelopes) {
          const d = s.envelopes;
          if (u >= 0 && u < d.upper.length && (m(d.upper[u]) || m(d.basis[u]) || m(d.lower[u]))) {
            he((j) => j === "envelopes" ? null : "envelopes"), be("envelopes");
            return;
          }
        }
        const V = ["dema", "tema", "hma"];
        for (const d of V)
          if (r[d]?.enabled && s[d]) {
            const j = s[d];
            if (Array.isArray(j) && u >= 0 && u < j.length && m(j[u])) {
              he((ie) => ie === d ? null : d), be(d);
              return;
            }
          }
      }
    }
    if (r?.volume?.enabled) {
      const _ = rn.current;
      if (_ > 0 && f >= _ * 0.8 && f <= _) {
        he((b) => b === "volume" ? null : "volume"), be("volume");
        return;
      }
    }
    if (Ms.current === "volumeProfile") {
      he((_) => _ === "volumeProfile" ? null : "volumeProfile"), be("volumeProfile");
      return;
    }
    const O = Ms.current;
    if (O && (O.startsWith("ci-") || O.startsWith("script-"))) {
      he((_) => _ === O ? null : O), be(O);
      return;
    }
    const H = Qt.current, U = [
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
      const b = H[_];
      if (b && f >= b.top && f <= b.top + 25 && v <= 200) {
        const w = `sp-${_}`;
        he((A) => A === w ? null : w), be(w);
        return;
      }
    }
    if (r && s) {
      const _ = Pe.current, b = _.candleWidth * (1 + Ye), w = Math.max(0, Math.floor(_.startIndex)), A = w + Math.round(v / b), Y = 10, u = (m, V) => {
        if (!V) return !1;
        const d = H[m];
        if (!d || f < d.top || f > d.bottom || A < 0 || A >= V.length) return !1;
        const j = V[A];
        if (isNaN(j) || !isFinite(j)) return !1;
        const ie = d.bottom - d.top, Fe = d.top + ie - j / 100 * ie;
        return Math.abs(f - Fe) < Y;
      }, L = (m, V) => {
        const d = H[m];
        if (!d || f < d.top || f > d.bottom) return !1;
        const j = d.bottom - d.top;
        let ie = 1 / 0, Fe = -1 / 0;
        const Q = fe.width - Ke, $e = Math.floor(Q / b), Z = Math.max(0, w), Te = Math.min(Z + $e, V[0]?.length ?? 0);
        for (const Me of V)
          if (Me)
            for (let et = Z; et < Te; et++) {
              const Ue = Me[et];
              !isNaN(Ue) && isFinite(Ue) && (Ue < ie && (ie = Ue), Ue > Fe && (Fe = Ue));
            }
        if (ie >= Fe) return !1;
        const He = (Fe - ie) * 0.1;
        ie -= He, Fe += He;
        const ue = Fe - ie;
        if (A < 0) return !1;
        for (const Me of V) {
          if (!Me || A >= Me.length) continue;
          const et = Me[A];
          if (isNaN(et) || !isFinite(et)) continue;
          const Ue = d.top + j - (et - ie) / ue * j;
          if (Math.abs(f - Ue) < Y) return !0;
        }
        return !1;
      };
      if (r.rsi?.enabled && u("rsi", s.rsi)) {
        he((m) => m === "sp-rsi" ? null : "sp-rsi"), be("sp-rsi");
        return;
      }
      if (r.stochastic?.enabled && s.stochastic && (u("stochastic", s.stochastic.k) || u("stochastic", s.stochastic.d))) {
        he((m) => m === "sp-stochastic" ? null : "sp-stochastic"), be("sp-stochastic");
        return;
      }
      if (r.macd?.enabled && s.macd && L("macd", [s.macd.macd, s.macd.signal])) {
        he((m) => m === "sp-macd" ? null : "sp-macd"), be("sp-macd");
        return;
      }
      if (r.atr?.enabled && s.atr && L("atr", [s.atr])) {
        he((m) => m === "sp-atr" ? null : "sp-atr"), be("sp-atr");
        return;
      }
      if (r.williamsR?.enabled && s.williamsR) {
        const m = H.williamsR;
        if (m && f >= m.top && f <= m.bottom && A >= 0 && A < s.williamsR.length) {
          const V = s.williamsR[A];
          if (!isNaN(V) && isFinite(V)) {
            const d = m.bottom - m.top, j = m.top + d - (V + 100) / 100 * d;
            if (Math.abs(f - j) < Y) {
              he((ie) => ie === "sp-williamsR" ? null : "sp-williamsR"), be("sp-williamsR");
              return;
            }
          }
        }
      }
      if (r.cci?.enabled && s.cci && L("cci", [s.cci])) {
        he((m) => m === "sp-cci" ? null : "sp-cci"), be("sp-cci");
        return;
      }
      if (r.adx?.enabled && s.adx && (u("adx", s.adx.adx) || u("adx", s.adx.plusDI) || u("adx", s.adx.minusDI))) {
        he((m) => m === "sp-adx" ? null : "sp-adx"), be("sp-adx");
        return;
      }
      if (r.roc?.enabled && s.roc && L("roc", [s.roc])) {
        he((m) => m === "sp-roc" ? null : "sp-roc"), be("sp-roc");
        return;
      }
      if (r.aroon?.enabled && s.aroon && (u("aroon", s.aroon.up) || u("aroon", s.aroon.down))) {
        he((m) => m === "sp-aroon" ? null : "sp-aroon"), be("sp-aroon");
        return;
      }
      if (r.tsi?.enabled && s.tsi && L("tsi", [s.tsi.tsi, s.tsi.signal])) {
        he((m) => m === "sp-tsi" ? null : "sp-tsi"), be("sp-tsi");
        return;
      }
      if (r.trix?.enabled && s.trix && L("trix", [s.trix.trix, s.trix.signal])) {
        he((m) => m === "sp-trix" ? null : "sp-trix"), be("sp-trix");
        return;
      }
      if (r.kst?.enabled && s.kst && L("kst", [s.kst.kst, s.kst.signal])) {
        he((m) => m === "sp-kst" ? null : "sp-kst"), be("sp-kst");
        return;
      }
      if (r.stochRsi?.enabled && s.stochRsi && (u("stochRsi", s.stochRsi.k) || u("stochRsi", s.stochRsi.d))) {
        he((m) => m === "sp-stochRsi" ? null : "sp-stochRsi"), be("sp-stochRsi");
        return;
      }
      for (const m of U) {
        const V = H[m];
        if (V && f >= V.top && f <= V.bottom) {
          const d = s[m];
          if (d && Array.isArray(d) && L(m, [d])) {
            const j = `sp-${m}`;
            he((ie) => ie === j ? null : j), be(j);
            return;
          }
        }
      }
    }
    if (sl && $s(null), It && he(null), Nn && yt(null), Be && Be.length > 0 && Date.now() - zn.current > 500) {
      const _ = on.current, b = rn.current;
      if (_ && _.range > 0 && b > 0) {
        const w = _.max - f / b * _.range, A = _.range * 6e-3;
        if (Ne.current) {
          const u = Be.find((L) => L.id === Ne.current);
          if (u) {
            const L = (_.max - u.price) / _.range * b, m = 22, V = Math.min(L + 10, b - m - 4), d = 5, j = 45, ie = 55, Fe = 44, Q = fe.width - Ke, $e = j + ie + Fe + d * 2, Te = (Q - $e) / 2, Ge = Te + j + d, He = Ge + ie + d, ue = 8;
            if (v >= Te - ue && v <= Te + j + ue && f >= V - ue && f <= V + m + ue) {
              if (Wt) {
                const Me = u.side === "buy", et = Kn(u.price), Ue = ut.current ?? u.stopLoss ?? (Me ? u.price - et : u.price + et), _t = ct.current ?? u.takeProfit ?? (Me ? u.price + et : u.price - et);
                Wt(Ne.current, Ue, _t);
              }
              Ne.current = null, ut.current = null, ct.current = null, it.current = null, ln((Me) => Me + 1), st(!1);
              return;
            }
            if (v >= Ge - ue && v <= Ge + ie + ue && f >= V - ue && f <= V + m + ue) {
              Ne.current = null, ut.current = null, ct.current = null, it.current = null, ln((Me) => Me + 1), st(!1);
              return;
            }
            if (v >= He - ue && v <= He + Fe + ue && f >= V - ue && f <= V + m + ue) {
              zt && zt(Ne.current), Ne.current = null, ut.current = null, ct.current = null, it.current = null, ln((Me) => Me + 1), st(!1);
              return;
            }
          }
        }
        if (Ne.current) {
          const u = Be.find((L) => L.id === Ne.current);
          if (u) {
            const L = u.side === "buy", m = Kn(u.price), V = ut.current ?? u.stopLoss ?? (L ? u.price - m : u.price + m), d = ct.current ?? u.takeProfit ?? (L ? u.price + m : u.price - m);
            if (Math.abs(w - V) < A) {
              it.current = "sl", ut.current = V;
              return;
            }
            if (Math.abs(w - d) < A) {
              it.current = "tp", ct.current = d;
              return;
            }
          }
        }
        let Y = null;
        for (const u of Be)
          if (Math.abs(w - u.price) < A) {
            Y = u.id;
            break;
          }
        if (Y) {
          if (Ne.current === Y)
            Ne.current = null, ut.current = null, ct.current = null;
          else {
            Ne.current = Y;
            const u = Be.find((L) => L.id === Y);
            ut.current = u?.stopLoss ?? null, ct.current = u?.takeProfit ?? null;
          }
          it.current = null, ln((u) => u + 1), st(!1);
          return;
        }
      }
    }
    cs(!0), jl({ x: v, y: f, startIndex: ce.startIndex, priceOffset: bt });
  }, [ce.startIndex, bt, sl, It, Nn, Be, Wt, zt, nn]), ko = o.useCallback(() => {
    if (it.current && Ne.current) {
      it.current = null, Je.current && (Je.current.style.cursor = Jt.current !== "standard" ? "none" : "crosshair"), st(!1);
      return;
    }
    if (Mt.current) {
      Ft(!1);
      const a = Pe.current;
      if (st(!1), xe) {
        const p = fe.width - Ke, x = ce.candleWidth * (1 + Ye), v = Math.floor(p / x), f = a.startIndex + v, e = l.length - 1 < f;
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
  }, [Wt, zt]);
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
      Ne.current && (p.key === "Enter" ? (p.preventDefault(), Wt && Wt(Ne.current, ut.current ?? void 0, ct.current ?? void 0), Ne.current = null, ut.current = null, ct.current = null, it.current = null, ln((x) => x + 1), st(!1)) : (p.key === "Escape" || p.key === "Backspace") && (p.preventDefault(), Ne.current = null, ut.current = null, ct.current = null, it.current = null, ln((x) => x + 1), st(!1)));
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [Wt, zt]), o.useEffect(() => {
    const a = (p) => {
      if (!It || !r || !ve) return;
      const x = p.target?.tagName;
      if (!(x === "INPUT" || x === "TEXTAREA" || x === "SELECT"))
        if (p.key === "Backspace" || p.key === "Delete") {
          p.preventDefault();
          const v = It.startsWith("sp-") ? It.replace("sp-", "") : It.startsWith("movingAverages__") ? "movingAverages" : It, f = r[v];
          f && ve({ ...r, [v]: { ...f, enabled: !1 } }), he(null);
        } else p.key === "Escape" && he(null);
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [It, r, ve]);
  const Ia = o.useCallback(() => {
    gt.current && clearTimeout(gt.current), gt.current = setTimeout(() => {
      if (en.current) return;
      _n.current = null, ft.current = null, Ts.current = null;
      const a = Je.current, p = a?.getContext("2d");
      p && a && p.clearRect(0, 0, a.width, a.height), On.current && On.current(), ps(), cs(!1), co(!1), le && le(null, null);
    }, 50);
  }, [le, ps]);
  o.useEffect(() => {
    if (!Jo && !Qo) return;
    const a = (v) => {
      const e = (tl.current.y - v.clientY) / 150, O = Math.max(0.1, Math.min(10, tl.current.scale + e));
      gn.current = O, st(!0), St(), Jn.current && clearTimeout(Jn.current), Jn.current = setTimeout(() => {
        We(gn.current);
      }, 100);
    }, p = () => {
      co(!1), ea(!1), We(gn.current), St();
    }, x = (v) => {
      if (v.touches.length !== 1) return;
      v.preventDefault();
      const e = (tl.current.y - v.touches[0].clientY) / 150, O = Math.max(0.1, Math.min(10, tl.current.scale + e));
      gn.current = O, st(!0), St(), Jn.current && clearTimeout(Jn.current), Jn.current = setTimeout(() => {
        We(gn.current);
      }, 100);
    };
    return window.addEventListener("mousemove", a), window.addEventListener("mouseup", p), window.addEventListener("touchmove", x, { passive: !1 }), window.addEventListener("touchend", p), window.addEventListener("touchcancel", p), () => {
      window.removeEventListener("mousemove", a), window.removeEventListener("mouseup", p), window.removeEventListener("touchmove", x), window.removeEventListener("touchend", p), window.removeEventListener("touchcancel", p);
    };
  }, [Jo, Qo, St]);
  const Ta = o.useCallback((a) => {
    if (a.preventDefault(), a.touches.length === 1) {
      const p = a.touches[0], x = Je.current;
      if (!x) return;
      const v = x.getBoundingClientRect(), f = p.clientX - v.left, e = p.clientY - v.top;
      if (us.current = { x: f, y: e }, rt.current && (clearTimeout(rt.current), rt.current = null), Pn) {
        is(!1), _n.current = null;
        const _ = x.getContext("2d");
        _ && _.clearRect(0, 0, x.width, x.height);
      }
      const O = Date.now();
      Ln.current = !0, Os.current = O;
      const H = O - Fs.current;
      if (Fs.current = O, !(H < 300)) {
        const _ = O;
        rt.current = setTimeout(() => {
          Os.current === _ && Ln.current && (is(!0), _n.current = { x: f, y: e }, dn.current !== null && cancelAnimationFrame(dn.current), dn.current = requestAnimationFrame(() => {
            Ot(), dn.current = null;
          })), rt.current = null;
        }, 400);
      }
      if (Be && Be.length > 0) {
        zn.current = Date.now();
        const _ = on.current, b = rn.current;
        if (_ && _.range > 0 && b > 0) {
          const w = _.max - e / b * _.range, A = _.range * 0.015;
          if (Ne.current) {
            const u = Be.find((L) => L.id === Ne.current);
            if (u) {
              const L = (_.max - u.price) / _.range * b, m = 22, V = Math.min(L + 10, b - m - 4), d = 5, j = fe.width - Ke, ie = 45, Fe = 55, Q = 44, $e = ie + Fe + Q + d * 2, Te = (j - $e) / 2, Ge = Te + ie + d, He = Ge + Fe + d, ue = 12;
              if (f >= Te - ue && f <= Te + ie + ue && e >= V - ue && e <= V + m + ue) {
                Wt && Wt(Ne.current, ut.current ?? void 0, ct.current ?? void 0), Ne.current = null, ut.current = null, ct.current = null, it.current = null, ln((Me) => Me + 1), st(!1);
                return;
              }
              if (f >= Ge - ue && f <= Ge + Fe + ue && e >= V - ue && e <= V + m + ue) {
                Ne.current = null, ut.current = null, ct.current = null, it.current = null, ln((Me) => Me + 1), st(!1);
                return;
              }
              if (f >= He - ue && f <= He + Q + ue && e >= V - ue && e <= V + m + ue) {
                zt && zt(Ne.current), Ne.current = null, ut.current = null, ct.current = null, it.current = null, ln((Me) => Me + 1), st(!1);
                return;
              }
            }
          }
          if (Ne.current) {
            const u = Be.find((L) => L.id === Ne.current);
            if (u) {
              const L = u.side === "buy", m = Kn(u.price), V = ut.current ?? u.stopLoss ?? (L ? u.price - m : u.price + m), d = ct.current ?? u.takeProfit ?? (L ? u.price + m : u.price - m);
              if (Math.abs(w - V) < A) {
                it.current = "sl", ut.current = V, rt.current && (clearTimeout(rt.current), rt.current = null);
                return;
              }
              if (Math.abs(w - d) < A) {
                it.current = "tp", ct.current = d, rt.current && (clearTimeout(rt.current), rt.current = null);
                return;
              }
            }
          }
          let Y = null;
          for (const u of Be) {
            const L = (_.max - u.price) / _.range * b;
            if (f <= 160 && Math.abs(e - L) < 20) {
              Y = u.id;
              break;
            }
          }
          if (Y) {
            if (Ne.current === Y)
              Ne.current = null, ut.current = null, ct.current = null;
            else {
              Ne.current = Y;
              const u = Be.find((L) => L.id === Y);
              ut.current = u?.stopLoss ?? null, ct.current = u?.takeProfit ?? null;
            }
            it.current = null, rt.current && (clearTimeout(rt.current), rt.current = null), ln((u) => u + 1), st(!1);
            return;
          }
        }
      }
      cs(!0), jl({ x: f, y: e, startIndex: ce.startIndex, priceOffset: bt });
    }
  }, [ce.startIndex, bt, Ot, Pn]), Bl = o.useRef(null), fr = o.useCallback((a) => {
    if (a.touches.length === 2) {
      a.preventDefault();
      const p = a.touches[0], x = a.touches[1], v = Math.hypot(
        x.clientX - p.clientX,
        x.clientY - p.clientY
      );
      if (Bl.current !== null) {
        const f = Pe.current.candleWidth, e = Pe.current.startIndex, H = 1 + (v / Bl.current - 1) * 1.3, U = Math.max(
          Al,
          Math.min(Dl, f * H)
        ), _ = Je.current;
        if (_) {
          const b = _.getBoundingClientRect(), w = (p.clientX + x.clientX) / 2 - b.left, A = f * (1 + Ye), Y = U * (1 + Ye), u = e + w / A, L = Math.max(0, u - w / Y);
          Pe.current = { startIndex: L, candleWidth: U }, st(!0), St(), Mt.current || Ft(!0);
        }
      }
      Bl.current = v;
    }
  }, [St]), Ma = o.useCallback((a) => {
    if (a.touches.length === 2) {
      fr(a), rt.current && (clearTimeout(rt.current), rt.current = null);
      return;
    }
    if (a.touches.length === 1) {
      const p = a.touches[0], x = Je.current;
      if (!x) return;
      const v = x.getBoundingClientRect(), f = p.clientX - v.left, e = p.clientY - v.top;
      if (rt.current && us.current) {
        const O = Math.abs(f - us.current.x), H = Math.abs(e - us.current.y);
        (O > 10 || H > 10) && (clearTimeout(rt.current), rt.current = null);
      }
      if (Pn && (_n.current = { x: f, y: e }, dn.current !== null && cancelAnimationFrame(dn.current), dn.current = requestAnimationFrame(() => {
        Ot(), dn.current = null;
      })), it.current) {
        a.preventDefault();
        const O = on.current, H = rn.current;
        if (O && O.range > 0 && H > 0) {
          const U = O.max - e / H * O.range;
          it.current === "sl" ? ut.current = U : ct.current = U, bn.current === null && (bn.current = requestAnimationFrame(() => {
            st(!1), bn.current = null;
          }));
        }
        return;
      }
      if (jn && !Pn) {
        a.preventDefault(), Ft(!0);
        const O = f - mn.x, H = e - mn.y, U = ce.candleWidth * (1 + Ye), _ = O / U, b = Math.max(
          0,
          Math.min(l.length - 10, mn.startIndex - _)
        );
        if (hs && At !== null) {
          const w = At / gn.current / (fe.height - kt), A = H * w;
          Zn.current = mn.priceOffset + A;
        }
        Pe.current = {
          startIndex: b,
          candleWidth: ce.candleWidth
        }, xn.current === null && (xn.current = requestAnimationFrame(() => {
          st(!0), St(), xn.current = null;
        }));
      }
    }
  }, [jn, mn, ce.candleWidth, l.length, fr, Ot, Pn, hs, At, fe.height, Be]), ja = o.useCallback(() => {
    if (Ln.current = !1, Os.current = 0, rt.current && (clearTimeout(rt.current), rt.current = null), it.current && Ne.current) {
      it.current = null, st(!1), Ln.current = !1, Os.current = 0, rt.current && (clearTimeout(rt.current), rt.current = null);
      return;
    }
    if (Pn) {
      is(!1), _n.current = null;
      const a = Je.current, p = a?.getContext("2d");
      p && a && p.clearRect(0, 0, a.width, a.height), le && le(null, null);
    }
    if (Mt.current) {
      Ft(!1);
      const a = Pe.current;
      if (st(!1), xe) {
        const p = fe.width - Ke, x = ce.candleWidth * (1 + Ye), v = Math.floor(p / x), f = a.startIndex + v, e = l.length - 1 < f;
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
    cs(!1), Bl.current = null, us.current = null, ao.current = null, xn.current !== null && (cancelAnimationFrame(xn.current), xn.current = null);
  }, [Pn, le, hs]);
  o.useCallback((a) => {
    let p = fs[0], x = Math.abs(a - p);
    for (const v of fs) {
      const f = Math.abs(a - v);
      f < x && (x = f, p = v);
    }
    return p;
  }, [fs]);
  const wo = o.useCallback((a, p) => {
    const x = fs.findIndex((v) => v >= a - 1e-3);
    if (p) {
      const v = Math.min(fs.length - 1, x + 1);
      return fs[v];
    } else {
      const v = Math.max(0, x - 1);
      return fs[v];
    }
  }, [fs]), So = o.useCallback((a) => {
    const p = a.ctrlKey || a.metaKey;
    if (!go.current && !p) {
      const m = Math.abs(a.deltaX) > Math.abs(a.deltaY), V = a.shiftKey && a.deltaY !== 0;
      if (m || V) {
        a.preventDefault();
        const d = Pe.current.startIndex, j = Pe.current.candleWidth, ie = j * (1 + Ye);
        Ft(!0);
        const Fe = V ? a.deltaY : a.deltaX, Q = 0.2 + (ll - 1) * 0.2, $e = Fe * Q / ie, Z = Math.max(
          0,
          Math.min(l.length - 10, d + $e)
        );
        Pe.current = { startIndex: Z, candleWidth: j }, Ct.current && clearTimeout(Ct.current), Ct.current = setTimeout(() => {
          if (xe) {
            const Ge = fe.width - Ke, He = Pe.current.candleWidth * (1 + Ye), ue = Math.floor(Ge / He), Me = Pe.current.startIndex + ue;
            In.current = !(l.length - 1 < Me);
          }
          const Te = Pe.current;
          Nt((Ge) => ({
            ...Ge,
            startIndex: Te.startIndex,
            autoFollowLatest: !1
          })), Ft(!1);
        }, 150), pt.current === null && (pt.current = requestAnimationFrame(() => {
          st(!0), Ot(), St(), pt.current = null;
        }));
        return;
      }
    }
    a.preventDefault(), Ft(!0);
    const x = Je.current;
    if (!x) return;
    const v = x.getBoundingClientRect(), f = a.clientX - v.left, e = a.clientY - v.top;
    _n.current = { x: f, y: e };
    const O = Pe.current.startIndex, H = Pe.current.candleWidth, U = H * (1 + Ye);
    if (Math.abs(a.deltaX) > Math.abs(a.deltaY) || a.shiftKey) {
      const m = a.shiftKey ? a.deltaY : a.deltaX, V = go.current ? 0.02 + (ll - 1) * 0.02 : 0.2 + (ll - 1) * 0.2, d = m * V / U, j = Math.max(
        0,
        Math.min(l.length - 10, O + d)
      );
      Pe.current = { startIndex: j, candleWidth: H }, pt.current === null && (pt.current = requestAnimationFrame(() => {
        st(!0), Ot(), St(), pt.current = null;
      })), Ct.current && clearTimeout(Ct.current), Ct.current = setTimeout(() => {
        if (xe) {
          const Fe = fe.width - Ke, Q = Pe.current.candleWidth * (1 + Ye), $e = Math.floor(Fe / Q), Z = Pe.current.startIndex + $e;
          In.current = !(l.length - 1 < Z);
        }
        const ie = Pe.current;
        Nt((Fe) => ({
          ...Fe,
          startIndex: ie.startIndex,
          // Keep float precision - no rounding
          autoFollowLatest: !1
        })), Ft(!1);
      }, 150);
      return;
    }
    if (go.current) {
      Rn.current += a.deltaY, el.current && clearTimeout(el.current), el.current = setTimeout(() => {
        Rn.current = 0;
      }, 200);
      const m = 220 - ll * 20;
      if (Math.abs(Rn.current) < m)
        return;
      const V = Rn.current < 0;
      Rn.current = 0;
      const d = wo(H, V);
      if (d === H) return;
      const j = fe.width - Ke, ie = H * (1 + Ye), Fe = d * (1 + Ye), Q = O + j / ie, $e = Math.max(0, Q - j / Fe);
      Ft(!0), Pe.current = { startIndex: $e, candleWidth: d }, pt.current === null && (pt.current = requestAnimationFrame(() => {
        st(!0), Ot(), St(), pt.current = null;
      })), Ct.current && clearTimeout(Ct.current), Ct.current = setTimeout(() => {
        const Z = Pe.current;
        Nt((Te) => ({
          ...Te,
          candleWidth: Z.candleWidth,
          startIndex: Z.startIndex,
          // Keep float precision
          autoFollowLatest: !1
        })), Ft(!1);
      }, 100);
      return;
    }
    const _ = a.deltaY < 0, b = wo(H, _);
    if (b === H) return;
    const w = fe.width - Ke, A = H * (1 + Ye), Y = b * (1 + Ye), u = O + w / A, L = Math.max(0, u - w / Y);
    Ft(!0), Pe.current = { startIndex: L, candleWidth: b }, pt.current === null && (pt.current = requestAnimationFrame(() => {
      st(!0), Ot(), St(), pt.current = null;
    })), Ct.current && clearTimeout(Ct.current), Ct.current = setTimeout(() => {
      const m = Pe.current;
      Nt((V) => ({
        ...V,
        candleWidth: m.candleWidth,
        startIndex: m.startIndex,
        // Keep float precision
        autoFollowLatest: !1
      })), Ft(!1);
    }, 100);
  }, [l.length, Ot, wo, fe.width, fe.height, ll, Ut, En, n, js, ce.autoFollowLatest, St]), pr = o.useRef(So), mr = o.useRef(yo);
  o.useEffect(() => {
    pr.current = So;
  }, [So]), o.useEffect(() => {
    mr.current = yo;
  }, [yo]);
  const Ra = o.useRef(null), ms = o.useRef(null), xs = o.useRef(null), Pa = o.useCallback((a) => {
    if (ms.current && (ms.current.el.removeEventListener("wheel", ms.current.fn), ms.current = null), Je.current = a, a) {
      const p = (x) => pr.current(x);
      a.addEventListener("wheel", p, { passive: !1 }), ms.current = { el: a, fn: p };
    }
  }, []), La = o.useCallback((a) => {
    if (xs.current && (xs.current.el.removeEventListener("wheel", xs.current.fn), xs.current = null), Ra.current = a, a) {
      const p = (x) => mr.current(x);
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
    const x = new ResizeObserver((v) => {
      for (const f of v) {
        const e = Math.round(f.contentRect.width), O = Math.round(f.contentRect.height);
        e > 0 && O > 0 && Er.flushSync(() => {
          Zs(
            (H) => H.width === e && H.height === O ? H : { width: e, height: O }
          );
        });
      }
    });
    return x.observe(a), () => x.disconnect();
  }, []), o.useEffect(() => {
    we && we.width > 0 && we.height > 0 && Zs(we);
  }, [we]);
  const xr = o.useRef(`${h}|${cn}`);
  o.useLayoutEffect(() => {
    const a = `${h}|${cn}`;
    xr.current !== a && (xr.current = a, !xe && Nt((p) => p.autoFollowLatest ? p : { ...p, autoFollowLatest: !0 }));
  }, [h, cn, xe]), o.useLayoutEffect(() => {
    if (l.length === 0) return;
    if (xe) {
      const e = rs.current, O = fe.width - Ke, H = ce.candleWidth * (1 + Ye), U = Math.floor(O / H), _ = Math.floor(U * 0.9), w = Ml.current <= 300 && fe.width > 300;
      if (Ml.current = fe.width, l.length !== e || e === 0 || w) {
        const A = e > 0 && l.length < e, Y = Math.max(0, Math.floor(ce.startIndex)), u = Math.min(l.length, Y + U), L = l.length - 1 < u;
        if (e === 0 || A || w || L && !In.current) {
          const m = Math.max(0, l.length - 1 - _);
          Nt((V) => ({ ...V, startIndex: m, autoFollowLatest: !1 })), A && (In.current = !1);
        }
      }
      rs.current = l.length;
      return;
    }
    if (!ce.autoFollowLatest) {
      if (ce.startIndex > l.length - 1) {
        const e = fe.width - Ke, O = ce.candleWidth * (1 + Ye), H = Math.max(1, Math.floor(e / O));
        Nt((U) => ({ ...U, startIndex: Math.max(0, l.length - H) }));
      }
      return;
    }
    const a = fe.width - Ke, p = ce.candleWidth * (1 + Ye), x = Math.floor(a / p);
    if (l.length > 0 && l.length < x * 0.75) {
      const e = Math.min(
        Dl,
        a * 0.92 / (l.length * (1 + Ye))
      );
      if (e > ce.candleWidth * 1.05) {
        Pe.current = { startIndex: 0, candleWidth: e }, Nt((O) => ({ ...O, startIndex: 0, candleWidth: e })), rs.current = l.length;
        return;
      }
    }
    const v = Math.min(ce.futureSpace, Math.floor(x * 0.3)), f = Math.max(0, l.length - x + v);
    Nt((e) => ({ ...e, startIndex: f })), rs.current = l.length;
  }, [l.length, fe.width, ce.autoFollowLatest, ce.candleWidth, ce.futureSpace, ce.startIndex, xe]), o.useLayoutEffect(() => {
    const a = ks - Qs.current;
    a !== 0 && (Nt((p) => ({
      ...p,
      startIndex: Math.max(0, p.startIndex + a)
    })), Pe.current.startIndex = Math.max(0, Pe.current.startIndex + a), Yn.current.startIndex = Math.max(0, Yn.current.startIndex + a)), Qs.current = ks;
  }, [ks]), o.useEffect(() => {
    if (Re == null) {
      Cs.current = void 0;
      return;
    }
    if (l.length === 0 || Cs.current === Re) return;
    Cs.current = Re;
    const a = fe.width - Ke, p = ce.candleWidth * (1 + Ye), x = Math.floor(a / p), v = Math.min(Re, l.length - 1), f = Math.floor(x * 0.9), e = Math.max(0, v - f);
    Nt((O) => ({ ...O, startIndex: e, autoFollowLatest: !1 }));
  }, [Re, l.length, fe.width, ce.candleWidth]), o.useEffect(() => {
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
    Ot();
  }, [Ot]), o.useEffect(() => {
    Tl.current = ae, ae != null && (Us.current = !0, requestAnimationFrame(() => {
      Ot(), Us.current = !1;
    }));
  }, [ae, Ot]);
  const Wl = o.useRef(/* @__PURE__ */ new Map()), br = o.useMemo(() => {
    if (Mt.current && Wl.current.size > 0 && l.length === Wl.current.size)
      return Wl.current;
    const a = /* @__PURE__ */ new Map();
    for (let p = 0; p < l.length; p++)
      a.set(l[p].time, p);
    return Wl.current = a, a;
  }, [l]), Fl = o.useCallback(() => {
    if (!Le) return;
    const a = En();
    js(a.candles, ce.autoFollowLatest);
    const p = l.length > 0 ? l[l.length - 1] : null, x = l.length >= 2 ? l[l.length - 2] : null, v = p && x ? p.time - x.time : 6e4;
    Le({
      priceAxisWidth: Ke,
      timeToX: (f) => {
        const e = Mt.current ? Yn.current.startIndex : ce.startIndex, H = (Mt.current ? Yn.current.candleWidth : ce.candleWidth) * (1 + Ye), U = Math.floor(e), _ = (e - U) * H;
        let b = br.get(f) ?? -1;
        if (b === -1 && l.length > 0) {
          const w = l[0], A = l[l.length - 1];
          if (f > A.time) {
            const Y = f - A.time;
            b = l.length - 1 + Math.round(Y / v);
          } else if (f < w.time) {
            const Y = w.time - f;
            b = -Math.round(Y / v);
          } else {
            let Y = 0, u = l.length - 1;
            for (; Y < u; ) {
              const L = Math.floor((Y + u) / 2);
              l[L].time < f ? Y = L + 1 : u = L;
            }
            if (Y > 0) {
              const L = l[Y - 1], m = l[Y], V = (f - L.time) / (m.time - L.time);
              return (Y - 1 + V - U) * H + H / 2 - _;
            }
            b = Y;
          }
        }
        return b === -1 ? null : (b - U) * H + H / 2 - _;
      },
      xToTime: (f) => {
        const e = Mt.current ? Yn.current.startIndex : ce.startIndex, H = (Mt.current ? Yn.current.candleWidth : ce.candleWidth) * (1 + Ye), U = Math.floor(e), _ = (e - U) * H, b = f + _, w = U + (b - H / 2) / H;
        if (w < 0) return null;
        const A = Math.floor(w), Y = w - A;
        if (A >= l.length) {
          if (p) {
            const L = w - (l.length - 1);
            return p.time + L * v;
          }
          return null;
        }
        const u = l[A];
        if (!u) return null;
        if (Y > 0 && A + 1 < l.length) {
          const L = l[A + 1];
          return u.time + Y * (L.time - u.time);
        }
        return u.time + Y * v;
      },
      priceToY: (f) => {
        let e = on.current, O = rn.current;
        if (!e || O === 0) {
          const H = fe.width - Ke, U = Pe.current, _ = U.candleWidth * (1 + Ye), b = Math.floor(H / _), w = Math.max(0, Math.floor(U.startIndex)), A = Math.min(l.length, w + b), Y = l.slice(w, A);
          let u = 1 / 0, L = -1 / 0;
          if (Y.length === 0)
            u = 0, L = 100;
          else {
            for (const He of Y)
              He.low < u && (u = He.low), He.high > L && (L = He.high);
            n && (n < u && (u = n), n > L && (L = n));
          }
          const m = L - u, V = m * 0.05, d = (L + u) / 2, j = m + V * 2;
          e = {
            min: d - j / 2,
            max: d + j / 2,
            range: j
          };
          const ie = r?.rsi?.enabled, Fe = r?.macd?.enabled, Q = r?.atr?.enabled, $e = r?.stochastic?.enabled;
          r?.volume?.enabled && l.some((He) => He.volume !== void 0 && He.volume > 0);
          const Z = (ie ? 1 : 0) + (Fe ? 1 : 0) + (Q ? 1 : 0) + ($e ? 1 : 0), Te = fe.height - kt, Ge = Z > 0 ? Math.max(60 * Z, Te * G) : 0;
          O = Te - Ge;
        }
        if (Ut !== null && At !== null) {
          const H = gn.current, U = Zn.current, _ = At / H, b = Ut + U;
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
          const H = fe.width - Ke, U = Pe.current, _ = U.candleWidth * (1 + Ye), b = Math.floor(H / _), w = Math.max(0, Math.floor(U.startIndex)), A = Math.min(l.length, w + b), Y = l.slice(w, A);
          let u = 1 / 0, L = -1 / 0;
          if (Y.length === 0)
            u = 0, L = 100;
          else {
            for (const He of Y)
              He.low < u && (u = He.low), He.high > L && (L = He.high);
            n && (n < u && (u = n), n > L && (L = n));
          }
          const m = L - u, V = m * 0.05, d = (L + u) / 2, j = m + V * 2;
          e = {
            min: d - j / 2,
            max: d + j / 2,
            range: j
          };
          const ie = r?.rsi?.enabled, Fe = r?.macd?.enabled, Q = r?.atr?.enabled, $e = r?.stochastic?.enabled;
          r?.volume?.enabled && l.some((He) => He.volume !== void 0 && He.volume > 0);
          const Z = (ie ? 1 : 0) + (Fe ? 1 : 0) + (Q ? 1 : 0) + ($e ? 1 : 0), Te = fe.height - kt, Ge = Z > 0 ? Math.max(60 * Z, Te * G) : 0;
          O = Te - Ge;
        }
        if (Ut !== null && At !== null) {
          const H = gn.current, U = Zn.current, _ = At / H, b = Ut + U;
          e = {
            min: b - _ / 2,
            max: b + _ / 2,
            range: _
          };
        }
        return e.max - f / O * e.range;
      }
    });
  }, [l, ce, fe, Le, r, G, n, Ut, At, br]);
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
  ].filter(Boolean).length + (s?.customIndicators?.filter((a) => a.display === "subplot").length || 0), Na = Io > 0, gr = fe.height - kt, Ea = Io > 0 ? Math.max(60 * Io, gr * G) : 0, vr = gr - Ea, yr = o.useCallback((a) => {
    a.preventDefault(), a.stopPropagation(), Ee(!0);
    const p = "touches" in a ? a.touches[0].clientY : a.clientY;
    Et.current = { y: p, ratio: G };
  }, [G]);
  o.useEffect(() => {
    if (!vt) return;
    const a = (x) => {
      const v = "touches" in x ? x.touches[0].clientY : x.clientY, e = (Et.current.y - v) / (fe.height - kt), O = Math.max(0.1, Math.min(0.6, Et.current.ratio + e));
      ge(O);
    }, p = () => {
      Ee(!1);
    };
    return window.addEventListener("mousemove", a), window.addEventListener("mouseup", p), window.addEventListener("touchmove", a), window.addEventListener("touchend", p), () => {
      window.removeEventListener("mousemove", a), window.removeEventListener("mouseup", p), window.removeEventListener("touchmove", a), window.removeEventListener("touchend", p);
    };
  }, [vt, fe.height]);
  const Ol = (a) => {
    const { kind: p, label: x, menuKey: v, engineLabel: f, ciId: e, sid: O, remove: H } = a, U = "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground transition-colors", _ = () => {
      p !== "formula" || !e || !ve || (ve({
        ...r,
        customIndicators: (r.customIndicators || []).map((A) => A.id === e ? { ...A, enabled: !1 } : A)
      }), be(null), he(null));
    }, b = (A) => {
      A.stopPropagation(), yt({
        visible: !0,
        x: A.clientX,
        y: A.clientY,
        key: v,
        title: x,
        custom: p === "engine" ? { kind: p, label: f || x } : p === "formula" ? { kind: p, ciId: e } : { kind: p, sid: O }
      });
    }, w = p === "engine" && !!nt && !!f || p === "formula" && !!wn;
    return /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
      p === "formula" && /* @__PURE__ */ t.jsx("button", { onClick: (A) => {
        A.stopPropagation(), _();
      }, className: `${U} hover:text-foreground`, title: `Hide ${x}`, children: /* @__PURE__ */ t.jsx(ql, { className: "w-[15px] h-[15px]" }) }),
      w && /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: (A) => {
            A.stopPropagation(), p === "engine" ? nt?.(f) : wn?.();
          },
          className: `${U} hover:text-foreground`,
          title: `${x} Settings`,
          children: /* @__PURE__ */ t.jsx(Gl, { className: "w-[15px] h-[15px]" })
        }
      ),
      /* @__PURE__ */ t.jsx("button", { onClick: (A) => {
        A.stopPropagation(), H();
      }, className: `${U} hover:text-destructive`, title: `Remove ${x}`, children: /* @__PURE__ */ t.jsx(Zl, { className: "w-[15px] h-[15px]" }) }),
      /* @__PURE__ */ t.jsx("button", { onClick: b, className: `${U} hover:text-foreground`, title: "More options", children: /* @__PURE__ */ t.jsx(Jl, { className: "w-[15px] h-[15px]" }) })
    ] });
  };
  return /* @__PURE__ */ t.jsxs(
    "div",
    {
      ref: ot,
      className: "relative w-full h-full select-none",
      style: {
        backgroundColor: se.background,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none"
      },
      children: [
        /* @__PURE__ */ t.jsx(
          "canvas",
          {
            ref: Cl,
            width: fe.width * Sn,
            height: fe.height * Sn,
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
            width: fe.width * Sn,
            height: fe.height * Sn,
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
              const p = Je.current;
              if (!p) return;
              const x = p.getBoundingClientRect(), v = a.clientX - x.left, f = a.clientY - x.top, e = Qt.current, O = (d) => !!d && f >= d.top && f <= d.bottom, H = r?.customBrueScripts || {}, U = (d, j) => {
                he(`script-${d}`), yt({
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
                const ie = j.sourceScriptId;
                if (ie && H[ie]?.enabled) {
                  U(ie, Kl(d));
                  return;
                }
                he(`sp-${d}`), yt({
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
                  U(d.scriptId, d.name || "Brue script");
                else if (j.startsWith("local:")) {
                  const ie = d.group || j.split(":")[1] || d.name;
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
              const _ = on.current, b = rn.current;
              if (!_ || b <= 0) return;
              const w = Pe.current, A = w.candleWidth * (1 + Ye), u = Math.max(0, Math.floor(w.startIndex)) + Math.round(v / A), L = 8, m = (d) => {
                if (isNaN(d) || !isFinite(d)) return !1;
                const j = b - (d - _.min) / _.range * b;
                return Math.abs(f - j) < L;
              }, V = [];
              if (r.movingAverages?.enabled && s.movingAverages && V.push({ key: "movingAverages", title: "Moving Averages", check: () => s.movingAverages.some(
                (d) => u >= 0 && u < d.data.length && m(d.data[u])
              ) }), r.bollinger?.enabled && s.bollinger) {
                const d = s.bollinger;
                V.push({
                  key: "bollinger",
                  title: "Bollinger Bands",
                  check: () => u >= 0 && u < d.upper.length && (m(d.upper[u]) || m(d.middle[u]) || m(d.lower[u]))
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
                const d = s.ichimoku;
                V.push({
                  key: "ichimoku",
                  title: "Ichimoku Cloud",
                  check: () => u >= 0 && u < d.tenkan.length && (m(d.tenkan[u]) || m(d.kijun[u]) || m(d.senkouA[u]) || m(d.senkouB[u]))
                });
              }
              if (r.keltner?.enabled && s.keltner) {
                const d = s.keltner;
                V.push({
                  key: "keltner",
                  title: "Keltner Channel",
                  check: () => u >= 0 && u < d.upper.length && (m(d.upper[u]) || m(d.middle[u]) || m(d.lower[u]))
                });
              }
              if (r.donchian?.enabled && s.donchian) {
                const d = s.donchian;
                V.push({
                  key: "donchian",
                  title: "Donchian Channel",
                  check: () => u >= 0 && u < d.upper.length && (m(d.upper[u]) || m(d.middle[u]) || m(d.lower[u]))
                });
              }
              for (const d of V)
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
                const a = /* @__PURE__ */ new Date(), p = Du(h), x = Gr(h);
                let v = "", f = "", e = 0, O = 0, H = !1, U = x ? "#22c55e" : "#ef4444", _ = x ? "Market open" : "Market closed", b = "Real time";
                const w = Bu(a), A = w.hours * 60 + w.minutes, Y = w.day, u = w.isBST, L = u ? "BST (UTC+1)" : "GMT (UTC+0)", m = String(w.hours).padStart(2, "0"), V = String(w.minutes).padStart(2, "0"), d = Wu(h);
                if (p === "crypto")
                  H = !0, v = "24/7", f = "Always open", U = "#22c55e", _ = "Market open";
                else if (p === "forex")
                  H = !0, v = u ? "Sun 10 PM – Fri 10 PM BST" : "Sun 10 PM – Fri 10 PM GMT", f = L, x || (_ = "Weekend — market closed");
                else if (p === "stock" && d) {
                  const ue = Ul(d);
                  e = ue.openHour * 60 + ue.openMinute, O = ue.closeHour * 60 + ue.closeMinute;
                  const Me = String(ue.openHour).padStart(2, "0"), et = ue.openMinute === 0 ? "00" : String(ue.openMinute).padStart(2, "0"), Ue = String(ue.closeHour).padStart(2, "0"), _t = ue.closeMinute === 0 ? "00" : String(ue.closeMinute).padStart(2, "0");
                  if (v = `${Me}:${et} – ${Ue}:${_t} ${ue.tzLabel}`, f = `${ue.exchange} (${ue.tzLabel})`, ue.lunchBreak) {
                    const vn = `${String(ue.lunchBreak.startHour).padStart(2, "0")}:${String(ue.lunchBreak.startMinute).padStart(2, "0")}`, qt = `${String(ue.lunchBreak.endHour).padStart(2, "0")}:${String(ue.lunchBreak.endMinute).padStart(2, "0")}`;
                    v += ` (break ${vn}–${qt})`;
                  }
                } else if (p === "stock") {
                  e = 14 * 60 + 30, O = 21 * 60, Fu(a) && (O = 18 * 60, U = x ? "#f59e0b" : "#ef4444", _ = x ? "Early close today" : "Market closed");
                  const ue = Math.floor(e / 60), Me = Math.floor(O / 60), et = e % 60 === 0 ? ":00" : ":30", Ue = O % 60 === 0 ? ":00" : ":30";
                  v = `${ue}${et} – ${Me}${Ue} ${u ? "BST" : "GMT"}`, f = `NYSE/NASDAQ (${L})`;
                } else if (p === "commodity" || p === "index") {
                  H = !0, v = u ? "Sun 11 PM – Fri 10 PM BST" : "Sun 11 PM – Fri 10 PM GMT", f = L;
                  const ue = u ? 23 * 60 : 22 * 60, Me = u ? 24 * 60 : 23 * 60;
                  x && A >= ue - 15 && A < ue ? (_ = "Closing soon — daily break", U = "#f59e0b") : !x && A >= ue && A < Me && (_ = "Daily maintenance break");
                }
                let j = "";
                if (!H && p === "stock") {
                  let ue = A;
                  if (d)
                    try {
                      const Me = Ul(d), Ue = new Intl.DateTimeFormat("en-GB", { timeZone: Me.timezone, hour: "numeric", minute: "numeric", hour12: !1 }).formatToParts(a), _t = parseInt(Ue.find((qt) => qt.type === "hour")?.value || "0"), vn = parseInt(Ue.find((qt) => qt.type === "minute")?.value || "0");
                      ue = _t * 60 + vn;
                    } catch {
                    }
                  if (x) {
                    const Me = O - ue;
                    if (Me > 0) {
                      const et = Math.floor(Me / 60), Ue = Me % 60;
                      j = et > 0 ? `Closes in ${et}h ${Ue}m` : `Closes in ${Ue} minutes`;
                    }
                  } else {
                    const Me = d ? (() => {
                      try {
                        const Ue = new Intl.DateTimeFormat("en-GB", { timeZone: Ul(d).timezone, weekday: "short" }).formatToParts(a).find((_t) => _t.type === "weekday")?.value || "";
                        return { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5 }[Ue] || 0;
                      } catch {
                        return 0;
                      }
                    })() : Y;
                    if (Me >= 1 && Me <= 5 && ue < e) {
                      const et = e - ue, Ue = Math.floor(et / 60), _t = et % 60;
                      j = Ue > 0 ? `Opens in ${Ue}h ${_t}m` : `Opens in ${_t} minutes`;
                    }
                  }
                }
                let ie = 0;
                if (!H && x && O > e) {
                  let ue = A;
                  if (d)
                    try {
                      const Me = Ul(d), Ue = new Intl.DateTimeFormat("en-GB", { timeZone: Me.timezone, hour: "numeric", minute: "numeric", hour12: !1 }).formatToParts(a), _t = parseInt(Ue.find((qt) => qt.type === "hour")?.value || "0"), vn = parseInt(Ue.find((qt) => qt.type === "minute")?.value || "0");
                      ue = _t * 60 + vn;
                    } catch {
                    }
                  ie = Math.max(0, Math.min(1, (ue - e) / (O - e)));
                }
                const Fe = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][Y], Q = typeof document < "u" && document.documentElement.classList.contains("dark"), $e = Q ? "rgba(22, 25, 35, 0.98)" : "rgba(255, 255, 255, 0.98)", Z = Q ? "rgba(55, 60, 75, 0.6)" : "rgba(210, 215, 225, 0.8)", Te = Q ? "#7b8094" : "#6b7280", Ge = Q ? "#a0a6b8" : "#374151", He = Q ? "#2a2e3a" : "#e5e7eb";
                return /* @__PURE__ */ t.jsxs(
                  "div",
                  {
                    ref: io,
                    className: "relative",
                    children: [
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (ue) => {
                            ue.stopPropagation(), tr((Me) => !Me);
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
                      nl && /* @__PURE__ */ t.jsxs(
                        "div",
                        {
                          style: {
                            position: "absolute",
                            top: "calc(100% + 4px)",
                            left: -40,
                            width: 260,
                            background: $e,
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
                                      background: U,
                                      boxShadow: `0 0 6px ${U}60`,
                                      flexShrink: 0
                                    }
                                  }
                                ),
                                /* @__PURE__ */ t.jsx("span", { style: { color: U, fontSize: 13, fontWeight: 600 }, children: _ })
                              ] }),
                              j && /* @__PURE__ */ t.jsx("p", { style: { color: Te, fontSize: 12, margin: "4px 0 0 16px", lineHeight: 1.3 }, children: j })
                            ] }),
                            !H && p === "stock" && /* @__PURE__ */ t.jsxs("div", { style: { padding: "6px 16px 10px" }, children: [
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Te, fontSize: 9, fontWeight: 700, letterSpacing: 1.2, fontFamily: '"SF Mono", Consolas, monospace' }, children: Fe }),
                                /* @__PURE__ */ t.jsx("div", { style: { flex: 1, height: 5, borderRadius: 3, background: He, overflow: "hidden", position: "relative" }, children: x && /* @__PURE__ */ t.jsx(
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
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 10, color: Te, fontFamily: '"SF Mono", Consolas, monospace' }, children: [
                                /* @__PURE__ */ t.jsx("span", { children: v.split("–")[0]?.trim() }),
                                /* @__PURE__ */ t.jsx("span", { children: v.split("–")[1]?.trim() })
                              ] })
                            ] }),
                            /* @__PURE__ */ t.jsx("div", { style: { height: 1, background: Z, margin: "0 12px" } }),
                            /* @__PURE__ */ t.jsxs("div", { style: { padding: "10px 16px 14px" }, children: [
                              f && /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Te }, children: "Exchange timezone" }),
                                /* @__PURE__ */ t.jsx("span", { style: { color: Ge, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: f })
                              ] }),
                              v && p !== "stock" && /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Te }, children: "Session" }),
                                /* @__PURE__ */ t.jsx("span", { style: { color: Ge, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: v })
                              ] }),
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Te }, children: "Local time" }),
                                /* @__PURE__ */ t.jsxs("span", { style: { color: Ge, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: [
                                  m,
                                  ":",
                                  V,
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
        Qn && r && ve && (() => {
          const a = {
            bollinger: () => ho,
            movingAverages: () => fo,
            vwap: () => po,
            volumeProfile: () => mo,
            volume: () => xo
          }, p = Ou().map((b) => ({
            key: b,
            title: Kl(b),
            enabledCheck: () => b === "volume" ? !!(r?.volume?.enabled && l.some((w) => w.volume)) : b === "volumeProfile" ? !!r?.volumeProfile?.enabled : !!(r?.[b]?.enabled && s?.[b]),
            endXSource: a[b] ?? (() => at[b] || 0)
          })), x = Xe.toolbarLineHeight;
          let v = Xe.toolbarStartY;
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
              for (let m = 0; m < s.movingAverages.length; m++) {
                const V = u[m]?.sourceScriptId;
                if (V && L[V]?.enabled) continue;
                const d = `movingAverages__${m}`, j = v;
                v += x;
                const ie = It === d, Fe = u[m], Q = Fe ? `${Fe.type} ${Fe.period}` : "MA", $e = () => {
                  const Z = u.filter((Te, Ge) => Ge !== m);
                  ve({
                    ...r,
                    movingAverages: {
                      ...r.movingAverages,
                      enabled: Z.length > 0,
                      lines: Z
                    }
                  }), be(null), he(null);
                };
                f.push(
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      className: "absolute z-20 flex items-center",
                      style: { left: 0, top: j - Xe.toolbarRowYOffset, height: x },
                      onMouseEnter: () => {
                        be(d), en.current = !0, gt.current && clearTimeout(gt.current);
                      },
                      onMouseLeave: () => {
                        gt.current = setTimeout(() => {
                          be((Z) => Z === d ? null : Z), en.current = !1;
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
                            onClick: (Z) => {
                              Z.stopPropagation(), he((Te) => Te === d ? null : d), be(d);
                            },
                            onContextMenu: (Z) => {
                              Z.preventDefault(), Z.stopPropagation(), he(d), yt({ visible: !0, x: Z.clientX, y: Z.clientY, key: d, title: Q });
                            }
                          }
                        ),
                        ie && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (Z) => {
                                Z.stopPropagation(), $e();
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
                                Z.stopPropagation(), $e();
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
                                Z.stopPropagation(), he(d), yt({ visible: !0, x: Z.clientX, y: Z.clientY, key: d, title: Q });
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
            v += x;
            const Y = It === b.key;
            Y || b.key, f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: {
                    left: 0,
                    top: A - Xe.toolbarRowYOffset,
                    height: x
                  },
                  onMouseEnter: () => {
                    be(b.key), en.current = !0, gt.current && clearTimeout(gt.current);
                  },
                  onMouseLeave: () => {
                    gt.current = setTimeout(() => {
                      be((u) => u === b.key ? null : u), en.current = !1;
                    }, 150);
                  },
                  children: [
                    Y && /* @__PURE__ */ t.jsx(
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
                          u.stopPropagation(), he((L) => L === b.key ? null : b.key), be(b.key);
                        },
                        onContextMenu: (u) => {
                          u.preventDefault(), u.stopPropagation(), he(b.key), yt({ visible: !0, x: u.clientX, y: u.clientY, key: b.key, title: b.title });
                        }
                      }
                    ),
                    Y && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation();
                            const L = r[b.key];
                            L && ve({ ...r, [b.key]: { ...L, enabled: !1 } }), be(null), he(null);
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
                            L && ve({ ...r, [b.key]: { ...L, enabled: !1 } }), be(null), he(null);
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
                            u.stopPropagation(), he(b.key), yt({ visible: !0, x: u.clientX, y: u.clientY, key: b.key, title: b.title });
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
          const O = (r?.customIndicators || []).filter((b) => b.enabled && b.display === "overlay"), H = /* @__PURE__ */ new Map(), U = [];
          for (const b of O)
            if (typeof b.expression == "string" && b.expression.startsWith("brue:") && b.scriptId) {
              const A = b.scriptId;
              H.has(A) || H.set(A, b);
            } else
              U.push(b);
          for (const b of U) {
            const w = `custom_overlay_${b.id}`, A = _s.current[w] || at[w] || 150, Y = v;
            v += x;
            const u = `ci-${b.id}`, L = It === u, m = typeof b.expression == "string" && b.expression.startsWith("local:"), V = m ? b.group || b.expression.split(":")[1] || b.name : null, d = () => {
              m ? Ve?.(V) : ve && ve({
                ...r,
                customIndicators: (r.customIndicators || []).filter((j) => j.id !== b.id)
              }), be(null), he(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: Y - Xe.toolbarRowYOffset, height: x },
                  onMouseEnter: () => {
                    be(u), en.current = !0, gt.current && clearTimeout(gt.current);
                  },
                  onMouseLeave: () => {
                    gt.current = setTimeout(() => {
                      be((j) => j === u ? null : j), en.current = !1;
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
                          j.stopPropagation(), he((ie) => ie === u ? null : u), be(u);
                        },
                        onContextMenu: (j) => {
                          j.preventDefault(), j.stopPropagation(), he(u), yt({
                            visible: !0,
                            x: j.clientX,
                            y: j.clientY,
                            key: w,
                            title: m && V || b.name,
                            custom: m ? { kind: "engine", label: V } : { kind: "formula", ciId: b.id }
                          });
                        }
                      }
                    ),
                    L && Ol({
                      kind: m ? "engine" : "formula",
                      label: m && V || b.name,
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
            const A = `script_${b}`, Y = _s.current[A] || at[A] || 150, u = v;
            v += x;
            const L = `script-${b}`, m = It === L, V = r?.customBrueScripts?.[b]?.name || w.name || "Brue script", d = () => {
              te?.(b), be(null), he(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: u - Xe.toolbarRowYOffset, height: x },
                  onMouseEnter: () => {
                    be(L), en.current = !0, gt.current && clearTimeout(gt.current);
                  },
                  onMouseLeave: () => {
                    gt.current = setTimeout(() => {
                      be((j) => j === L ? null : j), en.current = !1;
                    }, 150);
                  },
                  children: [
                    m && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: Y + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: Y, height: 16 },
                        onClick: (j) => {
                          j.stopPropagation(), he((ie) => ie === L ? null : L), be(L);
                        },
                        onContextMenu: (j) => {
                          j.preventDefault(), j.stopPropagation(), he(L), yt({
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
                    m && Ol({
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
            const A = `script_${b}`, Y = _s.current[A] || at[A] || 150, u = v;
            v += x;
            const L = `script-${b}`, m = It === L, V = w.name || "Brue script", d = () => {
              te?.(b), be(null), he(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: u - Xe.toolbarRowYOffset, height: x },
                  onMouseEnter: () => {
                    be(L), en.current = !0, gt.current && clearTimeout(gt.current);
                  },
                  onMouseLeave: () => {
                    gt.current = setTimeout(() => {
                      be((j) => j === L ? null : j), en.current = !1;
                    }, 150);
                  },
                  children: [
                    m && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: Y + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: Y, height: 16 },
                        onClick: (j) => {
                          j.stopPropagation(), he((ie) => ie === L ? null : L), be(L);
                        },
                        onContextMenu: (j) => {
                          j.preventDefault(), j.stopPropagation(), he(L), yt({
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
                    m && Ol({
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
        r && ve && (() => {
          const a = Br().map((x) => ({ key: x, title: Kl(x) })), p = r?.customBrueScripts || {};
          return a.map(({ key: x, title: v }) => {
            const f = Qt.current[x];
            if (!s?.[x] || !f) return null;
            const O = r?.[x]?.sourceScriptId;
            if (O && p[O]?.enabled) return null;
            const H = Hn.current[x] || nr[x] || 150, U = `sp-${x}`, _ = It === U;
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
                  be(U), en.current = !0, gt.current && clearTimeout(gt.current);
                },
                onMouseLeave: () => {
                  gt.current = setTimeout(() => {
                    be((b) => b === U ? null : b), en.current = !1;
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
                        b.stopPropagation(), he((w) => w === U ? null : U), be(U);
                      },
                      onContextMenu: (b) => {
                        b.preventDefault(), b.stopPropagation(), he(U), yt({ visible: !0, x: b.clientX, y: b.clientY, key: x, title: v });
                      }
                    }
                  ),
                  _ && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (b) => {
                          b.stopPropagation();
                          const w = r[x];
                          w && ve({ ...r, [x]: { ...w, enabled: !1 } }), be(null), he(null);
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
                          b.stopPropagation(), $s({ type: x, position: { x: H, y: f.top } });
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
                          const w = r[x];
                          w && ve({ ...r, [x]: { ...w, enabled: !1 } }), be(null), he(null);
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
                          b.stopPropagation(), he(U), yt({ visible: !0, x: b.clientX, y: b.clientY, key: x, title: v });
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: "More options",
                        children: /* @__PURE__ */ t.jsx(Jl, { className: "w-[15px] h-[15px]" })
                      }
                    )
                  ] })
                ]
              },
              `sp-row-${x}`
            );
          });
        })(),
        r && ve && (() => {
          const a = (r?.customIndicators || []).filter((e) => e.enabled && e.display === "subplot"), p = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Map();
          for (const e of a)
            if (typeof e.expression == "string" && e.expression.startsWith("brue:") && e.scriptId) {
              const H = e.scriptId;
              p.has(H) || p.set(H, e);
            } else if (typeof e.expression == "string" && e.expression.startsWith("local:") && e.group) {
              const H = e.group;
              x.has(H) || x.set(H, e);
            }
          const v = [], f = [];
          for (const [e, O] of p.entries())
            f.push({
              rowKey: `script-${e}`,
              firstPlot: O,
              label: r?.customBrueScripts?.[e]?.name || O.name || "Brue script",
              kind: "brue",
              handle: e,
              remove: () => te?.(e)
            });
          for (const [e, O] of x.entries())
            f.push({
              rowKey: `engine-sp-${e}`,
              firstPlot: O,
              label: e,
              kind: "engine",
              handle: e,
              remove: () => Ve?.(e)
            });
          for (const { rowKey: e, firstPlot: O, label: H, kind: U, handle: _, remove: b } of f) {
            const w = Qt.current[`custom_${O.id}`];
            if (!w) continue;
            const A = It === e, Y = 200, u = () => {
              b(), be(null), he(null);
            };
            v.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: w.top + 2, height: 16 },
                  onMouseEnter: () => {
                    be(e), en.current = !0, gt.current && clearTimeout(gt.current);
                  },
                  onMouseLeave: () => {
                    gt.current = setTimeout(() => {
                      be((L) => L === e ? null : L), en.current = !1;
                    }, 150);
                  },
                  children: [
                    A && /* @__PURE__ */ t.jsx("div", { className: "absolute inset-0 pointer-events-none", style: { width: Y + 105, borderRadius: 3, background: "rgba(59, 130, 246, 0.08)" } }),
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "cursor-pointer select-none",
                        style: { width: Y, height: 16 },
                        onClick: (L) => {
                          L.stopPropagation(), he((m) => m === e ? null : e), be(e);
                        },
                        onContextMenu: (L) => {
                          L.preventDefault(), L.stopPropagation(), he(e), yt({
                            visible: !0,
                            x: L.clientX,
                            y: L.clientY,
                            key: `custom_${O.id}`,
                            title: H,
                            custom: U === "engine" ? { kind: "engine", label: _ } : { kind: "brue", sid: _ }
                          });
                        }
                      }
                    ),
                    A && Ol({
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
          return v;
        })(),
        /* @__PURE__ */ t.jsx(
          "div",
          {
            ref: La,
            className: "absolute top-0 cursor-ns-resize z-40",
            style: {
              right: 0,
              width: Ke,
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
              bottom: kt + 8,
              left: `calc(50% - ${Ke / 2}px)`,
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
              right: Xn ?? (Xe.yAxisResetUsesToolbarGap ? Oo : 0),
              width: Xn !== void 0 ? Ke - Xn : Xe.yAxisResetUsesToolbarGap ? Ke - Oo : Ke
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
              right: Ke,
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
        sl && r && ve && fe && /* @__PURE__ */ t.jsx(
          _u,
          {
            type: sl.type,
            config: r,
            onConfigChange: ve,
            position: sl.position,
            onClose: () => $s(null)
          }
        ),
        Nn && Nn.visible && r && ve && (() => {
          const a = Je.current?.getBoundingClientRect();
          if (!a) return null;
          const p = Nn.x - a.left, x = Nn.y - a.top, v = Nn.key, f = Nn.custom, e = () => {
            f?.kind === "brue" ? te?.(f.sid) : f?.kind === "engine" ? Ve?.(f.label) : f?.kind === "formula" && ve({
              ...r,
              customIndicators: (r.customIndicators || []).filter((O) => O.id !== f.ciId)
            });
          };
          return Er.createPortal(
            (() => {
              const O = "var(--text)", H = "var(--dim)", U = "var(--hover)", _ = "var(--edge)", b = {
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
                      color: H,
                      whiteSpace: "nowrap"
                    }, children: Nn.title }),
                    !f && /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        style: b,
                        onMouseEnter: (w) => {
                          w.currentTarget.style.background = U;
                        },
                        onMouseLeave: (w) => {
                          w.currentTarget.style.background = "transparent";
                        },
                        onClick: () => {
                          $s({ type: v, position: { x: p, y: x } }), yt(null);
                        },
                        children: "Settings..."
                      }
                    ),
                    f?.kind === "engine" && nt && /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        style: b,
                        onMouseEnter: (w) => {
                          w.currentTarget.style.background = U;
                        },
                        onMouseLeave: (w) => {
                          w.currentTarget.style.background = "transparent";
                        },
                        onClick: () => {
                          nt(f.label), yt(null);
                        },
                        children: "Settings..."
                      }
                    ),
                    !f && /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        style: b,
                        onMouseEnter: (w) => {
                          w.currentTarget.style.background = U;
                        },
                        onMouseLeave: (w) => {
                          w.currentTarget.style.background = "transparent";
                        },
                        onClick: () => {
                          const w = r[v];
                          w && ve({ ...r, [v]: { ...w, enabled: !1 } }), yt(null), he(null);
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
                          w.currentTarget.style.background = U;
                        },
                        onMouseLeave: (w) => {
                          w.currentTarget.style.background = "transparent";
                        },
                        onClick: () => {
                          if (f)
                            e();
                          else {
                            const w = r[v];
                            w && ve({ ...r, [v]: { ...w, enabled: !1 } });
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
  onToggleHidden: le,
  onClearAll: ae,
  collapsed: Ie = !1,
  onToggleCollapsed: r
}) {
  const [ve, te] = o.useState(!1), Ve = Ie ? 14 : 40;
  return Ie ? /* @__PURE__ */ t.jsxs(
    "div",
    {
      className: "flex flex-col items-center bg-[#2a2a2a] border-r border-[#3a3a3a] shrink-0",
      style: { width: Ve, minWidth: Ve },
      children: [
        /* @__PURE__ */ t.jsx("div", { className: "h-1" }),
        /* @__PURE__ */ t.jsx(Xs, { size: 28, title: "Show drawing tools", onClick: () => r?.(), children: /* @__PURE__ */ t.jsx(pl, { type: "chevronRight" }) })
      ]
    }
  ) : /* @__PURE__ */ t.jsxs(
    "div",
    {
      className: "flex flex-col bg-[#2a2a2a] border-r border-[#3a3a3a] shrink-0 select-none",
      style: { width: Ve, minWidth: Ve },
      children: [
        /* @__PURE__ */ t.jsx("div", { className: "h-1 shrink-0" }),
        /* @__PURE__ */ t.jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden flex flex-col items-center gap-[2px] px-0 py-1 scrollbar-thin", children: rd.map((nt, Le) => /* @__PURE__ */ t.jsxs(kc.Fragment, { children: [
          Le > 0 && /* @__PURE__ */ t.jsx("div", { className: "w-[26px] h-px bg-[#3a3a3a] my-[5px] shrink-0" }),
          nt.tools.map((Oe) => /* @__PURE__ */ t.jsx(
            Xs,
            {
              active: l === Oe,
              title: ad[Oe],
              onClick: () => {
                n?.(l === Oe ? "cursor" : Oe);
              },
              children: /* @__PURE__ */ t.jsx(cd, { tool: Oe })
            },
            Oe
          ))
        ] }, Le)) }),
        /* @__PURE__ */ t.jsxs("div", { className: "shrink-0 flex flex-col items-center gap-[2px] pb-1", children: [
          /* @__PURE__ */ t.jsx("div", { className: "w-[26px] h-px bg-[#3a3a3a] my-[5px]" }),
          /* @__PURE__ */ t.jsx(Xs, { active: h, title: "Magnet (snap to OHLC)", onClick: () => T?.(), children: /* @__PURE__ */ t.jsx(pl, { type: "magnet" }) }),
          /* @__PURE__ */ t.jsx(Xs, { active: I, title: I ? "Show drawings" : "Hide all drawings", onClick: () => le?.(), children: /* @__PURE__ */ t.jsx(pl, { type: I ? "eyeOff" : "eye" }) }),
          /* @__PURE__ */ t.jsx(Xs, { title: "Remove all drawings", onClick: () => te(!0), children: /* @__PURE__ */ t.jsx(pl, { type: "trash" }) }),
          /* @__PURE__ */ t.jsx(Xs, { title: "Hide drawing toolbar", onClick: () => r?.(), children: /* @__PURE__ */ t.jsx(pl, { type: "chevronLeft" }) })
        ] }),
        ve && /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/40", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-[#262626] border border-[#3a3a3a] rounded-[3px] p-3 w-[200px] shadow-xl", children: [
          /* @__PURE__ */ t.jsx("div", { className: "text-[11px] text-[#e8e8e8] font-medium mb-3", children: "Remove all drawings?" }),
          /* @__PURE__ */ t.jsxs("div", { className: "flex gap-2 justify-end", children: [
            /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: () => te(!1),
                className: "px-3 py-1 text-[11px] bg-[#2a2a2a] border border-[#3a3a3a] text-[#b9b9b9] rounded-[2px] hover:bg-[#343434]",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: () => {
                  ae?.(), te(!1);
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
    const ae = (Ie) => {
      I.current && !I.current.contains(Ie.target) && T(!1);
    };
    return document.addEventListener("mousedown", ae), () => document.removeEventListener("mousedown", ae);
  }, []);
  const le = _o.find((ae) => ae.id === l) || _o[0];
  return /* @__PURE__ */ t.jsxs("div", { ref: I, className: "relative", children: [
    /* @__PURE__ */ t.jsxs(
      "button",
      {
        onClick: () => T((ae) => !ae),
        className: "flex items-center gap-1 px-2 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8] hover:bg-[#343434]",
        children: [
          /* @__PURE__ */ t.jsx("span", { className: "font-medium", children: le.label }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[8px] opacity-60", children: "▾" })
        ]
      }
    ),
    h && /* @__PURE__ */ t.jsx("div", { className: "absolute top-full left-0 mt-1 z-30 w-[200px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl py-1", children: _o.map((ae) => /* @__PURE__ */ t.jsxs(
      "button",
      {
        onClick: () => {
          n(ae.id), T(!1);
        },
        className: `w-full text-left px-3 py-1.5 text-[11px] flex flex-col hover:bg-[#343434] ${l === ae.id ? "bg-[#343434] text-[#e8e8e8]" : "text-[#b9b9b9]"}`,
        children: [
          /* @__PURE__ */ t.jsx("span", { className: "font-medium", children: ae.label }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[9px] opacity-60", children: ae.desc })
        ]
      },
      ae.id
    )) })
  ] });
}
const Yt = [
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
  // Canonical DAY/WEEK/MONTH uppercase only — deduped to prevent 1m 5m 5m bug, no lowercase duplicates
  { label: "1D", ms: 864e5, sec: 86400 },
  { label: "3D", ms: 2592e5, sec: 259200 },
  { label: "1W", ms: 6048e5, sec: 604800 },
  { label: "1M", ms: 2592e6, sec: 2592e3 }
];
function dd({
  value: l,
  onChange: n,
  favs: h,
  onToggleFav: T
}) {
  const [I, le] = o.useState(!1), [ae, Ie] = o.useState(""), r = o.useRef(null);
  o.useEffect(() => {
    const D = (X) => {
      r.current && !r.current.contains(X.target) && le(!1);
    };
    return document.addEventListener("mousedown", D), () => document.removeEventListener("mousedown", D);
  }, []);
  const ve = (D) => {
    const X = D.trim();
    if (!X) return null;
    if (X.toLowerCase() === "tick") return Yt.find((qe) => qe.label === "tick") || { label: "tick", ms: 0, sec: 0 };
    if (X === "1M" || X.toLowerCase() === "1mth" || X.toLowerCase() === "1mo")
      return Yt.find((qe) => qe.label === "1M");
    const De = X.match(/^(\d+)(s|m|h|d|w|M)$/i);
    if (!De) return null;
    const ee = parseInt(De[1], 10);
    if (!(ee > 0)) return null;
    const we = De[2], tt = we.toLowerCase();
    let Be = 0;
    if (we === "M") Be = ee * 2592e6;
    else if (tt === "s") Be = ee * 1e3;
    else if (tt === "m") Be = ee * 6e4;
    else if (tt === "h") Be = ee * 36e5;
    else if (tt === "d") Be = ee * 864e5;
    else if (tt === "w") Be = ee * 6048e5;
    else return null;
    if (Be < 1e3 && X.toLowerCase() !== "tick" && Be === 0 || Be > 31536e6) return null;
    const Wt = we === "M" ? `${ee}M` : `${ee}${tt === "d" ? "d" : tt === "w" ? "w" : tt}`;
    return { label: we === "M" ? `${ee}M` : tt === "d" && we === "D" ? `${ee}D` : tt === "w" && we === "W" ? `${ee}W` : Wt, ms: Be, sec: Math.floor(Be / 1e3) };
  }, te = (D) => h.has(D) || h.has(D.toLowerCase()) || h.has(D.toUpperCase()), Ve = /* @__PURE__ */ new Set(), Le = Yt.filter((D) => h.has(D.label) || h.has(D.label.toLowerCase()) || h.has(D.label.toUpperCase())).filter((D) => {
    const X = D.label.toLowerCase();
    return Ve.has(X) ? !1 : (Ve.add(X), !0);
  }), Oe = ["1m", "5m", "15m", "1h", "4h", "1D"], ye = Le.length ? Le.map((D) => D.label).slice(0, 6) : Oe, ze = /* @__PURE__ */ new Set(), xe = ye.filter((D) => {
    const X = D.toLowerCase();
    return ze.has(X) ? !1 : (ze.add(X), !0);
  }), Re = (D) => {
    n(D), le(!1);
  }, Ae = (D) => D ? D === "1M" ? "1M" : D.toLowerCase() : "", _e = Ae(l.label);
  return /* @__PURE__ */ t.jsxs("div", { ref: r, className: "relative", style: { overflow: "visible" }, children: [
    /* @__PURE__ */ t.jsxs(
      "div",
      {
        className: "flex items-center gap-3 px-2 py-1 border border-[#3a3a3a] rounded bg-[#262626] text-[11px] font-mono cursor-pointer select-none overflow-visible",
        onClick: () => le((D) => !D),
        title: "Click to drop timeframe panel — exact EdgeDepth full list tick 1s 15s 30s 1m 3m 5m 15m 30m 1h 2h 4h 8h 12h 1d 3d 1w 1M + Custom",
        children: [
          xe.map((D) => {
            const X = Yt.find((ee) => ee.label === D) || Yt.find((ee) => ee.label.toLowerCase() === D.toLowerCase()), De = X ? Ae(X.label) === _e || D.toLowerCase() === "1d" && (_e === "1d" || _e === "1D") : !1;
            return /* @__PURE__ */ t.jsx(
              "span",
              {
                onClick: (ee) => {
                  ee.stopPropagation(), X && Re(X);
                },
                className: `pb-0.5 border-b-[2px] ${De ? "border-[#e8e8e8] text-[#e8e8e8]" : "border-transparent text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                children: D
              },
              D
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
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-4 text-[11px] flex-wrap", children: ["tick"].map((D) => {
                const X = Yt.find((we) => we.label === D), De = X ? Ae(X.label) === _e : !1, ee = te(D);
                return /* @__PURE__ */ t.jsxs(
                  "button",
                  {
                    onClick: () => {
                      X && Re(X);
                    },
                    onContextMenu: (we) => {
                      we.preventDefault(), T(D);
                    },
                    className: `flex items-center gap-0.5 ${De ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    title: "Tick chart — one bar per trade, click sets chart",
                    children: [
                      D,
                      " ",
                      ee && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
                    ]
                  },
                  D
                );
              }) })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [
                /* @__PURE__ */ t.jsx("span", { className: "text-[10px] text-[#b9b9b9] tracking-wider", children: "SECONDS" }),
                /* @__PURE__ */ t.jsx("span", { className: "text-[9px] px-1 py-0.5 bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9] rounded", children: "LIVE" })
              ] }),
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-3 text-[11px] flex-wrap", children: ["1s", "5s", "15s", "30s"].map((D) => {
                const X = Yt.find((we) => we.label === D), De = X ? Ae(X.label) === _e : !1, ee = te(D);
                return /* @__PURE__ */ t.jsxs(
                  "button",
                  {
                    onClick: () => {
                      X && Re(X);
                    },
                    onContextMenu: (we) => {
                      we.preventDefault(), T(D);
                    },
                    className: `flex items-center gap-0.5 ${De ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    title: "Seconds — exact EdgeDepth, no paywall",
                    children: [
                      D,
                      " ",
                      ee && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
                    ]
                  },
                  D
                );
              }) })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] tracking-wider mb-1.5", children: "MINUTES" }),
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-3 text-[11px] flex-wrap", children: ["1m", "3m", "5m", "15m", "30m"].map((D) => {
                const X = Yt.find((we) => we.label === D), De = X ? Ae(X.label) === _e : !1, ee = te(D);
                return /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    onClick: () => {
                      X && Re(X);
                    },
                    onContextMenu: (we) => {
                      we.preventDefault(), T(D);
                    },
                    className: `flex flex-col items-center gap-0.5 pb-0.5 border-b-[2px] ${De ? "border-[#e8e8e8] text-[#e8e8e8]" : "border-transparent text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    title: "Click sets chart, right-click pins to bar (max 6)",
                    children: /* @__PURE__ */ t.jsxs("span", { className: "flex items-center gap-0.5", children: [
                      D,
                      " ",
                      ee && /* @__PURE__ */ t.jsx("span", { className: "text-[8px] text-[#e8e8e8]", children: "★" })
                    ] })
                  },
                  D
                );
              }) })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] tracking-wider mb-1.5", children: "HOURS" }),
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-3 text-[11px] flex-wrap", children: ["1h", "2h", "4h", "6h", "8h", "12h"].map((D) => {
                const X = Yt.find((we) => we.label === D), De = X ? Ae(X.label) === _e : !1, ee = te(D);
                return /* @__PURE__ */ t.jsxs(
                  "button",
                  {
                    onClick: () => {
                      X && Re(X);
                    },
                    onContextMenu: (we) => {
                      we.preventDefault(), T(D);
                    },
                    className: `flex items-center gap-0.5 ${De ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    children: [
                      D,
                      " ",
                      ee && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
                    ]
                  },
                  D
                );
              }) })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] tracking-wider mb-1.5", children: "DAYS" }),
              /* @__PURE__ */ t.jsxs("div", { className: "flex gap-3 text-[11px] flex-wrap", children: [
                ["1d", "3d", "1w"].map((D) => {
                  const X = Yt.find((we) => we.label === D), De = X ? Ae(X.label) === _e : !1, ee = te(D);
                  return /* @__PURE__ */ t.jsxs(
                    "button",
                    {
                      onClick: () => {
                        X && Re(X);
                      },
                      onContextMenu: (we) => {
                        we.preventDefault(), T(D);
                      },
                      className: `flex items-center gap-0.5 ${De ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                      children: [
                        D,
                        " ",
                        ee && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
                      ]
                    },
                    D
                  );
                }),
                ["1D", "1W"].map((D) => {
                  const X = Yt.find((we) => we.label === D), De = X ? Ae(X.label) === _e : !1, ee = te(D);
                  return /* @__PURE__ */ t.jsxs(
                    "button",
                    {
                      onClick: () => {
                        X && Re(X);
                      },
                      onContextMenu: (we) => {
                        we.preventDefault(), T(D);
                      },
                      className: `flex items-center gap-0.5 opacity-70 ${De ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                      title: "Alias — same as lowercase",
                      children: [
                        D,
                        " ",
                        ee && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
                      ]
                    },
                    D
                  );
                })
              ] })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] tracking-wider mb-1.5", children: "MONTHS" }),
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-3 text-[11px] flex-wrap", children: ["1M"].map((D) => {
                const X = Yt.find((we) => we.label === D), De = X ? X.label === l.label || l.label === "1M" : !1, ee = te(D);
                return /* @__PURE__ */ t.jsxs(
                  "button",
                  {
                    onClick: () => {
                      X && Re(X);
                    },
                    onContextMenu: (we) => {
                      we.preventDefault(), T(D);
                    },
                    className: `flex items-center gap-0.5 ${De ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    children: [
                      D,
                      " ",
                      ee && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
                    ]
                  },
                  D
                );
              }) })
            ] }),
            /* @__PURE__ */ t.jsx("div", { className: "text-[8px] text-[#5a5a5a] tracking-wider pt-2 border-t border-[#1e1e1e]", children: "CLICK SETS THE CHART · RIGHT-CLICK PINS IT TO THE BAR (MAX 6) · FULL LIST tick 1s 15s 30s 1m 3m 5m 15m 30m 1h 2h 4h 8h 12h 1d 3d 1w 1M" }),
            /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2 pt-1 border-t border-[#1e1e1e] mt-2", children: [
              /* @__PURE__ */ t.jsx("span", { className: "text-[11px] text-[#b9b9b9] shrink-0", children: "Custom" }),
              /* @__PURE__ */ t.jsx(
                "input",
                {
                  value: ae,
                  onChange: (D) => Ie(D.target.value),
                  onKeyDown: (D) => {
                    if (D.key === "Enter") {
                      const X = ve(ae);
                      X && Re(X);
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
                    const D = ve(ae);
                    D && Re(D);
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
  const [T, I] = o.useState(""), [le, ae] = o.useState(""), [Ie, r] = o.useState([]);
  o.useEffect(() => {
    let te = !0;
    return l && (async () => {
      try {
        const ye = ["/api/orderflow/tickers?limit=770", "/api/symbols?limit=770", "/api/tickers"];
        for (const ze of ye)
          try {
            const xe = await fetch(ze);
            if (xe.ok) {
              const Re = await xe.json(), Ae = Re.tickers || Re.symbols || Re.data || [];
              if (Ae.length) {
                const _e = Ae.slice(0, 770).map((D) => ({
                  symbol: D.symbol || D.pair || D.name,
                  base: D.base_asset || D.base || (D.symbol || "").split("USDT")[0] || D.symbol,
                  exchange: D.exchange || D.provider || "binancef",
                  price: D.last_price || D.price || 100 + Math.random() * 5e4,
                  change: D.change_pct_24h || D.change || (Math.random() - 0.5) * 10,
                  listed: !0
                }));
                if (te && _e.length) {
                  r(_e);
                  return;
                }
              }
            }
          } catch {
          }
      } catch {
      }
      if (!te) return;
      const nt = ["BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "DOGE", "AVAX", "DOT", "LINK", "LTC", "BCH", "UNI", "XLM", "ETC", "FIL", "TRX", "APT", "ARB", "OP", "MATIC", "ATOM", "NEAR", "FTM", "ALGO"], Le = ["binancef", "hl", "coinbase"], Oe = [];
      for (let ye = 0; ye < 770; ye++) {
        const ze = nt[ye % nt.length], xe = Le[ye % Le.length];
        Oe.push({ symbol: `${ze}${xe === "binancef" ? "USDT" : "-USD"}`, base: ze, exchange: xe, price: 100 + Math.random() * 5e4, change: (Math.random() - 0.5) * 10, listed: !0 });
      }
      r(Oe);
    })(), () => {
      te = !1;
    };
  }, [l]);
  const ve = o.useMemo(() => Ie.filter((te) => !(le && te.exchange !== le || T && !te.symbol.toLowerCase().includes(T.toLowerCase()) && !te.base.toLowerCase().includes(T.toLowerCase()))).slice(0, 200), [Ie, T, le]);
  return l ? /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-[150] flex items-center justify-center bg-black/60", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-[#262626] border border-[#3a3a3a] rounded shadow-2xl w-[480px] max-h-[80vh] flex flex-col", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "px-3 py-2 border-b border-[#3a3a3a] flex items-center gap-2", children: [
      /* @__PURE__ */ t.jsx("span", { className: "text-[11px] font-bold tracking-wider text-[#e8e8e8]", children: "FIND SYMBOL — 770 LISTED" }),
      /* @__PURE__ */ t.jsxs("span", { className: "text-[9px] text-[#b9b9b9]", children: [
        Ie.length,
        " loaded • ",
        le || "all venues"
      ] }),
      /* @__PURE__ */ t.jsx("button", { onClick: n, className: "ml-auto text-[#b9b9b9] hover:text-[#e8e8e8]", children: "×" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "p-2 flex gap-2 border-b border-[#3a3a3a]/50", children: [
      /* @__PURE__ */ t.jsx("input", { value: T, onChange: (te) => I(te.target.value), placeholder: "Search BTC, ETH...", className: "flex-1 px-2 py-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded text-[11px] text-[#e8e8e8]", autoFocus: !0 }),
      /* @__PURE__ */ t.jsxs("select", { value: le, onChange: (te) => ae(te.target.value), className: "px-2 py-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded text-[10px] text-[#b9b9b9]", children: [
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
      ve.map((te) => /* @__PURE__ */ t.jsxs("div", { onClick: () => {
        h(te.symbol), n();
      }, className: "grid grid-cols-4 px-2 py-1.5 text-[11px] border-b border-[#3a3a3a]/20 hover:bg-[#343434] cursor-pointer", children: [
        /* @__PURE__ */ t.jsx("span", { className: "font-mono font-medium text-[#e8e8e8]", children: te.symbol }),
        /* @__PURE__ */ t.jsx("span", { className: "font-mono tabular-nums", children: te.price.toFixed(2) }),
        /* @__PURE__ */ t.jsxs("span", { className: `tabular-nums ${te.change >= 0 ? "text-[#21b3a4]" : "text-[#f0426c]"}`, children: [
          te.change >= 0 ? "+" : "",
          te.change.toFixed(2),
          "%"
        ] }),
        /* @__PURE__ */ t.jsx("span", { className: "text-[10px] text-[#b9b9b9]", children: te.exchange })
      ] }, `${te.exchange}:${te.symbol}`)),
      ve.length === 0 && /* @__PURE__ */ t.jsxs("div", { className: "px-2 py-4 text-[11px] text-[#b9b9b9] text-center", children: [
        "No matches — ",
        Ie.length,
        " symbols loaded"
      ] })
    ] }),
    /* @__PURE__ */ t.jsx("div", { className: "px-2 py-1 text-[9px] text-[#b9b9b9]/60 border-t border-[#3a3a3a]", children: "770 listed • API first then synthetic • categories/venues/sparkline/score/type • click to select" })
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
  { id: "liquidations", label: "Liquidations", desc: "Liq heatmap Ember/Viridis/Magma/Inferno" },
  { id: "watchlist", label: "Watchlist", desc: "1503 pairs categories/venues/sparkline" }
];
function xd({ onSelect: l }) {
  const [n, h] = o.useState(!1), T = o.useRef(null);
  return o.useEffect(() => {
    const I = (le) => {
      T.current && !T.current.contains(le.target) && h(!1);
    };
    return document.addEventListener("mousedown", I), () => document.removeEventListener("mousedown", I);
  }, []), /* @__PURE__ */ t.jsxs("div", { ref: T, className: "relative", children: [
    /* @__PURE__ */ t.jsx("button", { onClick: () => h((I) => !I), className: "px-2 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8] hover:bg-[#343434]", children: "+Widget ▾" }),
    n && /* @__PURE__ */ t.jsxs("div", { className: "absolute top-full left-0 mt-1 z-30 w-[240px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl py-1", children: [
      /* @__PURE__ */ t.jsx("div", { className: "px-2 py-1 text-[9px] text-[#b9b9b9] uppercase tracking-wider", children: "Add widget — 10 items" }),
      md.map((I) => /* @__PURE__ */ t.jsxs("button", { onClick: () => {
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
})(), Ho = /* @__PURE__ */ new Set(), ml = () => Ho.forEach((l) => l()), eo = (l, n) => {
  try {
    localStorage.setItem(l, n);
  } catch {
  }
}, Wn = {
  get: () => an,
  setLayout(l) {
    an.layout = l, eo("lset-layout", l), ml();
  },
  setSync(l) {
    an.sync = l, eo("lset-layout-sync", JSON.stringify(l)), ml();
  },
  setPanelSymbol(l, n) {
    an.panelSymbols = [...an.panelSymbols], an.panelSymbols[l] = n, eo("lset-layout-symbols", JSON.stringify(an.panelSymbols)), ml();
  },
  setPanelKind(l, n) {
    an.panelKinds = [...an.panelKinds], an.panelKinds[l] = n, eo("lset-layout-kinds", JSON.stringify(an.panelKinds)), ml();
  },
  setActivePanel(l) {
    an.activePanel !== l && (an.activePanel = l, ml());
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
const bd = o.lazy(() => import("./chunks/depth-BzhG7qSx.js").then((l) => l.E)), gd = o.lazy(() => import("./chunks/EdgeDepthDOMPanel-CSa5pgLO.js")), vd = o.lazy(() => import("./chunks/EdgeDepthTapePanel-DQfRW2GA.js")), yd = o.lazy(() => import("./chunks/EdgeDepthFootprintPanel-FdQWkwUq.js")), kd = o.lazy(() => import("./chunks/EdgeDepthVolumeProfilePanel-BC2W3WpS.js")), wd = o.lazy(() => import("./chunks/EdgeDepthTPOPanel-CbTLWjSe.js")), Sd = o.lazy(() => import("./chunks/EdgeDepthLiquidationPanel-Bt3fyOwF.js")), Cd = o.lazy(() => import("./chunks/EdgeDepthWatchlist-C5OkGnPW.js")), Id = o.lazy(() => import("./chunks/EdgeDepthIndicators-Dr9Njf69.js")), $r = () => /* @__PURE__ */ t.jsx("div", { className: "h-full w-full flex items-center justify-center text-[11px] text-[var(--dim)]", children: "Loading…" }), Hr = {
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
  onActivate: le,
  kind: ae,
  onToggleKind: Ie,
  syncedCrosshairTime: r,
  onCrosshairMove: ve,
  syncedViewportTime: te,
  onViewportTimeChange: Ve,
  quote: nt
}) {
  const [Le, Oe] = o.useState([]), ye = lo();
  o.useEffect(() => {
    if (ae !== "chart") return;
    let xe = !1;
    Oe([]);
    const Re = async () => {
      try {
        const _e = await Hu("multi_panel", { symbol: l, timeframe: h, limit: 500 });
        !xe && _e?.length && Oe(_e.map((D) => ({
          time: Date.parse(D.timestamp),
          open: D.open,
          high: D.high,
          low: D.low,
          close: D.close,
          volume: D.volume
        })));
      } catch {
      }
    };
    Re();
    const Ae = setInterval(Re, 1e4);
    return () => {
      xe = !0, clearInterval(Ae);
    };
  }, [l, h, ae]);
  const ze = () => {
    const xe = ae;
    return xe === "depth" ? /* @__PURE__ */ t.jsx(Qu, { symbol: l, sourceProvider: n, colors: T, syncedCrosshairTime: r, onCrosshairMove: ve, onToggleKind: Ie }) : xe === "edgedepth" ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx($r, {}), children: /* @__PURE__ */ t.jsx(bd, { symbol: l, provider: n || "binance", onToggleKind: Ie }) }) : ["dom", "tape", "footprint", "vpvr", "tpo", "liquidations", "watchlist", "indicators", "ed_liquidations", "ed_vpvr", "ed_footprint", "ed_tpo"].includes(xe) ? /* @__PURE__ */ t.jsxs(o.Suspense, { fallback: /* @__PURE__ */ t.jsx($r, {}), children: [
      xe === "dom" && /* @__PURE__ */ t.jsx(gd, { symbol: l, provider: n || "binance" }),
      xe === "tape" && /* @__PURE__ */ t.jsx(vd, { symbol: l, provider: n || "binance" }),
      (xe === "footprint" || xe === "ed_footprint") && /* @__PURE__ */ t.jsx(yd, { symbol: l, provider: n || "binance" }),
      (xe === "vpvr" || xe === "ed_vpvr") && /* @__PURE__ */ t.jsx(kd, { symbol: l, provider: n || "binance" }),
      (xe === "tpo" || xe === "ed_tpo") && /* @__PURE__ */ t.jsx(wd, { symbol: l, provider: n || "binance" }),
      (xe === "liquidations" || xe === "ed_liquidations") && /* @__PURE__ */ t.jsx(Sd, { symbol: l, provider: n || "binance" }),
      xe === "watchlist" && /* @__PURE__ */ t.jsx(Cd, { activeSymbol: l, onSelectSymbol: (Re) => {
        try {
          window.__lseShell?.selectSymbol?.(Re);
        } catch {
        }
      } }),
      xe === "indicators" && /* @__PURE__ */ t.jsx(Id, { symbol: l, provider: n || "binance" })
    ] }) : Le.length > 0 ? /* @__PURE__ */ t.jsx(
      qo,
      {
        candles: Le,
        symbol: l,
        timeframe: h,
        chartType: "candlestick",
        livePrice: Le[Le.length - 1]?.close ?? null,
        rightOffset: 6,
        colors: T,
        indicators: zs,
        timezone: ye?.data?.timezone || "local",
        syncedCrosshairTime: r ?? void 0,
        onCrosshairMove: ve,
        syncedViewportTime: te ?? void 0,
        onViewportTimeChange: Ve,
        showBidAskSpread: !!nt,
        brokerBid: nt?.bid ?? null,
        brokerAsk: nt?.ask ?? null
      }
    ) : null;
  };
  return /* @__PURE__ */ t.jsx(
    "div",
    {
      onMouseDown: le,
      style: {
        position: "relative",
        minWidth: 0,
        minHeight: 0,
        overflow: "hidden",
        border: I ? "1px solid var(--accent-bar, #888)" : "1px solid var(--edge, #2a2e39)"
      },
      children: ze()
    }
  );
}
function Md({
  layout: l,
  syncSettings: n,
  pair: h,
  timeframe: T,
  colors: I,
  quote: le,
  sourceProvider: ae
}) {
  const Ie = Hr[l] || Hr["2x2"], { activePanel: r, panelSymbols: ve, panelKinds: te } = Go(), Ve = Math.min(r, Ie.count - 1), [nt, Le] = o.useState([]), [Oe, ye] = o.useState(null), [ze, xe] = o.useState(null), Re = o.useMemo(() => I || oo(), [I]);
  o.useEffect(() => {
    Le((D) => {
      const X = [...D];
      for (let De = X.length; De < Ie.count; De++)
        X.push(De === 0 ? T : Vr[De % Vr.length]);
      return X.slice(0, Ie.count);
    });
  }, [Ie.count, T]);
  const Ae = o.useCallback((D) => {
    n.syncCrosshair && ye(D);
  }, [n.syncCrosshair]), _e = o.useCallback((D) => {
    n.syncTime && xe(D);
  }, [n.syncTime]);
  return /* @__PURE__ */ t.jsx("div", { style: {
    display: "grid",
    width: "100%",
    height: "100%",
    gap: 2,
    gridTemplateColumns: `repeat(${Ie.cols}, 1fr)`,
    gridTemplateRows: `repeat(${Ie.rows}, 1fr)`
  }, children: Array.from({ length: Ie.count }, (D, X) => /* @__PURE__ */ t.jsx(
    Td,
    {
      symbol: n.syncSymbol ? h : ve[X] || h,
      sourceProvider: ae,
      timeframe: n.syncInterval ? T : nt[X] || T,
      colors: Re,
      active: X === Ve,
      onActivate: () => Wn.setActivePanel(X),
      kind: te[X] || "chart",
      onToggleKind: () => {
        const De = te[X] || "chart", ee = ["chart", "edgedepth", "depth", "dom", "tape", "footprint", "vpvr", "tpo", "liquidations", "watchlist", "indicators"], we = ee.indexOf(De), tt = ee[(we + 1) % ee.length];
        Wn.setPanelKind(X, tt);
      },
      syncedCrosshairTime: n.syncCrosshair ? Oe : null,
      onCrosshairMove: Ae,
      syncedViewportTime: n.syncTime ? ze : null,
      onViewportTimeChange: _e,
      quote: le
    },
    X
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
      for (const le of no) {
        const ae = I[le];
        typeof ae == "string" && localStorage.setItem(le, ae);
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
  for (let le = 0; le < n.length; le++)
    h.set(Math.floor(n[le].time / 1e3), le);
  const T = [];
  let I = 0;
  for (const [le, ae] of Object.entries(l))
    for (const [Ie, r] of Object.entries(ae.series || {})) {
      const ve = new Array(n.length).fill(NaN);
      let te = 0;
      for (const [Le, Oe] of r.points || []) {
        const ye = h.get(Le);
        ye !== void 0 && (ve[ye] = Oe, te++);
      }
      if (!te) continue;
      const nt = Object.keys(ae.series).length > 1 ? `${le} ${Ie}` : le;
      T.push({
        id: `local-${le}-${Ie}`,
        name: nt,
        // The prefix is what tells ProChart's formula evaluator to leave this
        // series alone and draw the precomputed values.
        expression: `local:${le}:${Ie}`,
        enabled: !0,
        display: ae.overlay ? "overlay" : "subplot",
        color: zr[I++ % zr.length],
        lineWidth: 2,
        zeroLine: !1,
        data: ve,
        kind: r.kind,
        // One pane per ENGINE INDICATOR, not per column: MACD's three series
        // must share a pane and a scale or the histogram is meaningless.
        group: le
      });
    }
  return T;
}
const Pd = o.lazy(() => import("./chunks/depth-BzhG7qSx.js").then((l) => l.a)), Ld = o.lazy(() => import("./chunks/depth-BzhG7qSx.js").then((l) => l.E)), Kr = o.lazy(() => import("./chunks/EdgeDepthDOMPanel-CSa5pgLO.js")), Nd = o.lazy(() => import("./chunks/EdgeDepthTapePanel-DQfRW2GA.js")), Ed = o.lazy(() => import("./chunks/EdgeDepthWatchlist-C5OkGnPW.js")), Ad = o.lazy(() => import("./chunks/EdgeDepthIndicators-Dr9Njf69.js")), Dd = o.lazy(() => import("./chunks/EdgeDepthLayers-DRUflkF6.js")), Bd = o.lazy(() => import("./chunks/EdgeDepthLiquidationPanel-Bt3fyOwF.js")), Wd = o.lazy(() => import("./chunks/EdgeDepthVolumeProfilePanel-BC2W3WpS.js")), Fd = o.lazy(() => import("./chunks/EdgeDepthFootprintPanel-FdQWkwUq.js")), Od = o.lazy(() => import("./chunks/EdgeDepthTPOPanel-CbTLWjSe.js")), _d = o.lazy(() => import("./chunks/backtest-CeqYlV1v.js").then((l) => l.bN)), $d = o.lazy(() => import("./chunks/backtest-CeqYlV1v.js").then((l) => l.bO)), Hd = o.lazy(() => import("./chunks/econ-BeCAerYp.js")), Vd = o.lazy(() => import("./chunks/dataviz-D6zeVYjn.js")), Xd = o.lazy(() => import("./chunks/quant-CYlcHa_2.js")), Yd = o.lazy(() => import("./chunks/notebooks-fOzYQotZ.js")), ns = () => /* @__PURE__ */ t.jsx("div", { className: "h-full w-full flex items-center justify-center text-[11px] text-[var(--dim)]", children: "Loading…" }), zd = {
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
function Kd({ provider: l, symbol: n, timeframe: h, candles: T, chartType: I = "candlestick", trades: le = [], engineIndicators: ae, indicatorPatch: Ie = null, quote: r = null, positions: ve = [], onPositionModify: te, onPositionClose: Ve, autoSelectPositionId: nt = null }) {
  o.useEffect(() => {
    const y = "lse-hide-shell-tf-style";
    if (!document.getElementById(y)) {
      const ne = document.createElement("style");
      ne.id = y, ne.textContent = `
        /* Hide LSE shell duplicate bars when EdgeDepth terminal active — professional single bar only */
        #timeframes { display: none !important; }
        #subrail { display: none !important; }
        #controls #chart-type, #controls #ind-open, #controls #panes-open, #controls #src-open,
        #controls #tpl-open, #controls #cs-open, #controls #sl-slot { display: none !important; }
        /* Also hide any Simple Moving Average pill that leaks from shell */
        #ind-active { display: none !important; }
      `, document.head.appendChild(ne);
    }
    try {
      const ne = document.getElementById("timeframes");
      ne && (ne.style.display = "none");
      const G = document.getElementById("subrail");
      G && (G.style.display = "none");
    } catch {
    }
  }, []);
  const Le = `${l}|${n}|${h}`, [Oe, ye] = o.useState(() => {
    try {
      const y = `${l}|${n}|${h}`, ne = localStorage.getItem(`lse-candles-${y}`);
      if (ne) {
        const G = JSON.parse(ne);
        if (Array.isArray(G) && G.length > 0)
          return { key: y, older: G.slice(-200), shift: 0 };
      }
    } catch {
    }
    return { key: Le, older: [], shift: 0 };
  });
  Oe.key !== Le && ye({ key: Le, older: [], shift: 0 });
  const ze = o.useRef(null), xe = o.useRef(!1), [Re, Ae] = o.useState(!1), _e = o.useMemo(() => {
    if (!Oe.older.length || !T.length) {
      try {
        T.length > 0 && localStorage.setItem(`lse-candles-${Le}`, JSON.stringify(T.slice(-200)));
      } catch {
      }
      return T;
    }
    const y = T[0].time, ne = [...Oe.older.filter((G) => G.time < y), ...T];
    try {
      localStorage.setItem(`lse-candles-${Le}`, JSON.stringify(ne.slice(-200)));
    } catch {
    }
    return ne;
  }, [Oe.older, T, Le]), D = o.useCallback(async () => {
    if (xe.current || ze.current === Le) return;
    const ne = _e;
    if (!ne.length || ne.length >= 5e4) return;
    const G = Le, ge = ne[0].time;
    xe.current = !0, Ae(!0);
    try {
      const vt = `/api/candles?provider=${encodeURIComponent(l)}&symbol=${encodeURIComponent(n)}&timeframe=${encodeURIComponent(h)}&limit=5000&end=${encodeURIComponent(new Date(ge).toISOString())}`, Ee = await fetch(vt);
      if (!Ee.ok) {
        let We = "";
        try {
          We = String((await Ee.json()).detail || "");
        } catch {
        }
        /no (history|prints|data)|served no|no real candles/i.test(We) && (ze.current = G);
        return;
      }
      const Vt = ((await Ee.json()).candles || []).map(([We, bt, ds, Ut, jt, At]) => ({
        time: We < 1e12 ? We * 1e3 : We,
        open: bt,
        high: ds,
        low: Ut,
        close: jt,
        volume: At
      })).filter((We) => We.time < ge);
      if (!Vt.length) {
        ze.current = G;
        return;
      }
      ye((We) => We.key !== G ? We : {
        key: G,
        older: [...Vt, ...We.older],
        shift: We.shift + Vt.length
      });
    } catch {
    } finally {
      xe.current = !1, Ae(!1);
    }
  }, [_e, l, n, h, Le]), [X, De] = o.useState(null), [ee, we] = o.useState(null), [tt, Be] = o.useState("cursor"), [Wt, zt] = o.useState(!1), [qe, xt] = o.useState(!1), [nn, wn] = o.useState(null), [Tt, Lt] = o.useState([]), [sn, Kt] = o.useState(zs), [cn, Xn] = o.useState(!1), [As, wl] = o.useState(!1), [ks, ss] = o.useState("candles"), [ws, Ss] = o.useState(() => {
    try {
      const y = typeof h == "string" ? h : "1m", ne = Yt.find((G) => G.label.toLowerCase() === y.toLowerCase() || G.label === y);
      if (ne) return ne;
    } catch {
    }
    return Yt.find((y) => y.label === "1m") || Yt[5] || Yt[0];
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
      const y = String(h || "1m"), ne = Yt.find((G) => G.label.toLowerCase() === y.toLowerCase() || G.label === y);
      if (ne && ne.label.toLowerCase() !== ws.label.toLowerCase())
        Ss(ne);
      else if (!ne) {
        const G = y.match(/^(\d+)([smhdwM])$/i);
        if (G) {
          const ge = parseInt(G[1], 10), vt = G[2];
          let Ee = 0;
          const Et = vt.toLowerCase();
          vt === "M" ? Ee = ge * 2592e6 : Et === "s" ? Ee = ge * 1e3 : Et === "m" ? Ee = ge * 6e4 : Et === "h" ? Ee = ge * 36e5 : Et === "d" ? Ee = ge * 864e5 : Et === "w" && (Ee = ge * 6048e5), Ee > 0 && Ss({ label: y, ms: Ee, sec: Math.floor(Ee / 1e3) });
        } else y.toLowerCase() === "tick" && Ss({ label: "tick", ms: 0, sec: 0 });
      }
    } catch {
    }
  }, [h]);
  const [ot, Cl] = o.useState(() => {
    try {
      const y = localStorage.getItem("ed_appearance");
      if (y) return { ..._r, ...JSON.parse(y) };
    } catch {
    }
    return _r;
  }), [Je, Ds] = o.useState(!1);
  o.useEffect(() => {
    try {
      localStorage.setItem("ed_appearance", JSON.stringify(ot));
    } catch {
    }
  }, [ot]);
  const [Us, qs] = o.useState(!1), [Il, Tl] = o.useState(!0), [Bs, Gs] = o.useState(!1), [Sn, fe] = o.useState(() => {
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
    fe(y);
    try {
      localStorage.setItem("ed_layers", JSON.stringify(y));
    } catch {
    }
    const ne = (G) => y.find((ge) => ge.id === G)?.enabled;
    Kt((G) => {
      let ge = !1;
      const vt = { ...G };
      if (ne("vpvr") !== void 0) {
        const Ee = !!ne("vpvr");
        G.volumeProfile?.enabled !== Ee && (vt.volumeProfile = { ...G.volumeProfile, enabled: Ee, numberOfRows: 48, rowWidth: 15, opacity: 60 }, ge = !0);
      }
      if (ne("session_vwap") !== void 0) {
        const Ee = !!ne("session_vwap");
        G.vwap?.enabled !== Ee && (vt.vwap = { ...G.vwap, enabled: Ee, color: "#2196F3" }, ge = !0);
      }
      if (ne("prev_day") !== void 0 || ne("prev_week") !== void 0) {
        const Ee = !!ne("prev_day") || !!ne("prev_week");
        G.pivotPoints?.enabled !== Ee && (vt.pivotPoints = { ...G.pivotPoints, enabled: Ee }, ge = !0);
      }
      return ge ? vt : G;
    }), ne("liquidations");
  }, []), ce = o.useCallback(() => {
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
  })[y] ?? null, []), Pe = o.useCallback((y) => {
    Be(y);
    const ne = Nt(y);
    we(ne);
  }, [Nt]), Yn = o.useCallback((y) => {
    Sl((ne) => {
      const G = new Set(ne);
      if (G.has(y)) G.delete(y);
      else {
        if (G.size >= 6) {
          const ge = G.values().next().value;
          ge && G.delete(ge);
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
  })[ks] || "candlestick", [ks]), [un, Ne] = o.useState(null), [ut, ct] = o.useState(!1), [it, Fn] = o.useState(!1), [zn, ln] = o.useState(""), [ls, Kn] = o.useState(null), [Js, os] = o.useState(""), [, Ft] = o.useState(0), [St, Un] = o.useState(null), [Cn, On] = o.useState(""), [qn, Ws] = o.useState(""), [st, Gn] = o.useState(""), [rs, Ml] = o.useState(!1), In = o.useRef(null), Qs = async () => {
    const y = zn.trim();
    if (!y) {
      os("name the template first");
      return;
    }
    await window.__lseShell?.saveLayout?.(y) ? (Fn(!1), os(""), Ft((G) => G + 1)) : os("could not save this template");
  };
  o.useEffect(() => {
    if (!un) return;
    const y = () => {
      Ne(null), ct(!1), Fn(!1), Kn(null), os(""), Un(null), Gn("");
    }, ne = (G) => {
      G.key === "Escape" && y();
    };
    return document.addEventListener("click", y), document.addEventListener("keydown", ne), () => {
      document.removeEventListener("click", y), document.removeEventListener("keydown", ne);
    };
  }, [un]);
  const Tn = Go(), Cs = Tn.layout, _n = Tn.sync, [Jt, Mn] = o.useState(!1), [as, ft] = o.useState("appearance"), dn = o.useRef(Jt);
  dn.current = Jt;
  const Is = o.useRef(as);
  Is.current = as, o.useEffect(() => (Vo = (y) => {
    if (!dn.current) {
      ft(y || "appearance"), Mn(!0);
      return;
    }
    if (y && y !== Is.current) {
      ft(y);
      return;
    }
    Mn(!1);
  }, () => {
    Vo = null;
  }), []), o.useEffect(() => {
    if (!Jt) return;
    const y = (ne) => {
      ne.key === "Escape" && Mn(!1);
    };
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, [Jt]);
  const Ts = o.useRef(null), [pn, jn] = o.useState(null);
  o.useEffect(() => {
    Jt || jn(null);
  }, [Jt]);
  const cs = o.useCallback((y) => {
    if (y.target.closest("button")) return;
    const ne = Ts.current, G = ne?.offsetParent;
    if (!G || !ne) return;
    const ge = G.getBoundingClientRect(), vt = ne.getBoundingClientRect(), Ee = y.clientX - vt.left, Et = y.clientY - vt.top;
    y.preventDefault();
    const Vt = (bt) => {
      jn({
        x: Math.max(0, Math.min(bt.clientX - ge.left - Ee, ge.width - vt.width)),
        y: Math.max(0, Math.min(bt.clientY - ge.top - Et, ge.height - 36))
      });
    }, We = () => {
      window.removeEventListener("pointermove", Vt), window.removeEventListener("pointerup", We);
    };
    window.addEventListener("pointermove", Vt), window.addEventListener("pointerup", We);
  }, []), [mn, jl] = o.useState({
    color: "#e6e8ea",
    strokeWidth: 2,
    lineStyle: "solid",
    opacity: 100
  });
  o.useEffect(() => {
    let y = !0;
    return (async () => {
      const ne = await hl.getTools();
      y && ne?.drawingDefaults && jl((G) => ({ ...G, ...ne.drawingDefaults }));
    })(), () => {
      y = !1;
    };
  }, []);
  const Rl = o.useRef(null), Pl = o.useRef(0), ro = o.useRef(() => {
  }), Ll = o.useRef([]);
  o.useEffect(() => {
    zo({ provider: l, symbol: n });
  }, [l, n]);
  const pt = `${l}:${n}`, Ct = o.useRef(null);
  o.useEffect(() => {
    let y = !0;
    return Ct.current = null, (async () => {
      const [ne, G] = await Promise.all([
        hl.getDrawings(pt),
        hl.getIndicators(pt)
      ]);
      y && (Lt(ne), Kt(G ?? zs), wn(null), Ct.current = pt);
    })(), () => {
      y = !1;
    };
  }, [pt]);
  const Rn = o.useCallback((y) => {
    Lt(y), Ct.current === pt && hl.setDrawings(pt, y);
  }, [pt]), el = o.useCallback((y) => {
    Kt(y), Ct.current === pt && hl.setIndicators(pt, y);
  }, [pt]);
  o.useEffect(() => {
    Ie && Kt((y) => ({ ...y, ...Ie }));
  }, [Ie]);
  const rt = o.useCallback(() => {
    Rn([]), wn(null);
  }, [Rn]);
  o.useCallback((y) => {
    Rn(Tt.filter((ne) => ne.id !== y)), wn(null);
  }, [Tt, Rn]);
  const Pn = o.useMemo(() => {
    const y = Rd(ae, _e);
    return y.length ? { ...sn, customIndicators: y } : sn;
  }, [sn, ae, _e]), is = lo(), us = Xu(), Fs = o.useMemo(() => {
    const y = oo(), ne = is?.candles, G = is?.chart;
    let ge;
    return !us || !ne || !G ? ge = { ...y } : ge = {
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
      bullish: ne.bodyBullish,
      bearish: ne.bodyBearish,
      bullishBorder: ne.bordersBullish,
      bearishBorder: ne.bordersBearish,
      bullishWick: ne.wickBullish,
      bearishWick: ne.wickBearish
    }, ot.marketColors === "teal_rose" ? (ge.bullish = "#21b3a4", ge.bearish = "#f0426c", ge.bullishBorder = "#21b3a4", ge.bearishBorder = "#f0426c", ge.bullishWick = "#21b3a4", ge.bearishWick = "#f0426c", ge.priceTickerBullish = "#21b3a4", ge.priceTickerBearish = "#f0426c") : ot.marketColors === "green_red" && (ge.bullish = "#26a69a", ge.bearish = "#ef5350", ge.bullishBorder = "#26a69a", ge.bearishBorder = "#ef5350", ge.bullishWick = "#26a69a", ge.bearishWick = "#ef5350", ge.priceTickerBullish = "#26a69a", ge.priceTickerBearish = "#ef5350"), ot.accent === "mint" ? ge.grid = "#21b3a4" : ot.accent === "indigo" ? ge.grid = "#6366f1" : ot.accent === "amber" && (ge.grid = "#f59e0b"), ot.opacity !== void 0 && (ge.backgroundOpacity = Math.round(ot.opacity * 100)), ge;
  }, [is, us, ot]), Os = is?.data?.timezone || "local", Ln = zd[h] ?? 36e5, xn = T.length ? T[T.length - 1].close : null, [$n, bn] = o.useState("");
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
      const G = Date.now(), ge = Math.ceil(G / Ln) * Ln, vt = Math.max(0, ge - G), Ee = Math.floor(vt / 1e3), Et = Math.floor(Ee / 60) % 60, Vt = Math.floor(Ee / 3600), We = (bt) => String(bt).padStart(2, "0");
      bn(Vt > 0 ? `${Vt}:${We(Et)}:${We(Ee % 60)}` : `${Et}:${We(Ee % 60)}`);
    };
    y();
    const ne = setInterval(y, 1e3);
    return () => clearInterval(ne);
  }, [n, Ln, h]), o.useMemo(
    () => Object.values(sn || {}).filter((y) => y && y.enabled).length,
    [sn]
  );
  const ao = o.useMemo(
    () => [
      ...le.map((y, ne) => ({
        id: `trade-${ne}`,
        price: y.price,
        side: y.side,
        quantity: y.quantity ?? 0,
        symbol: n,
        pnl: y.pnl
      })),
      ...ve.map((y) => ({ ...y, symbol: n }))
    ],
    [le, ve, n]
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
          const ne = window.__lseShell;
          ne?.setTimeframe && ne.setTimeframe(y.label);
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
        /* @__PURE__ */ t.jsx(xd, { onSelect: (y) => Wn.setPanelKind(0, y) }),
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
        /* @__PURE__ */ t.jsx("button", { onClick: ce, className: "px-2 py-0.5 rounded border border-[#3a3a3a] text-[10px] hover:bg-[#343434] text-[#e8e8e8]", children: "Indicators" })
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "relative flex-1 min-h-0 w-full flex", children: [
      /* @__PURE__ */ t.jsx(
        id,
        {
          activeTool: tt,
          onToolSelect: Pe,
          magnet: qe,
          onToggleMagnet: () => xt((y) => !y),
          hiddenAll: As,
          onToggleHidden: () => wl((y) => !y),
          onClearAll: rt,
          collapsed: Wt,
          onToggleCollapsed: () => zt((y) => !y)
        }
      ),
      /* @__PURE__ */ t.jsx(
        "div",
        {
          ref: In,
          className: "relative flex-1 min-w-0",
          style: rs ? { transform: "scaleY(-1)" } : void 0,
          onContextMenu: (y) => {
            y.preventDefault(), ct(!1), Un(null), Gn("");
            let ne = null;
            if (Cs === "1x1" && X && In.current) {
              const ge = In.current.getBoundingClientRect(), vt = rs ? ge.height - (y.clientY - ge.top) : y.clientY - ge.top, Ee = X.yToPrice(vt);
              Number.isFinite(Ee) && Ee > 0 && (ne = Ee);
            }
            const G = window.__lseShell?.tradeInfo?.() || null;
            Ne({
              x: Math.min(y.clientX, window.innerWidth - 240),
              y: Math.min(y.clientY, window.innerHeight - (G?.available ? 360 : 230)),
              price: ne,
              ref: xn,
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
              embedded: !0,
              onToggleKind: () => Wn.setPanelKind(0, "chart"),
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
            const y = Tn.panelKinds[0];
            return y === "dom" ? /* @__PURE__ */ t.jsx(Kr, { symbol: n, provider: l }) : y === "tape" ? /* @__PURE__ */ t.jsx(Nd, { symbol: n, provider: l }) : y === "footprint" ? /* @__PURE__ */ t.jsx(Fd, { symbol: n, provider: l }) : y === "vpvr" ? /* @__PURE__ */ t.jsx(Wd, { symbol: n, provider: l }) : y === "tpo" ? /* @__PURE__ */ t.jsx(Od, { symbol: n, provider: l }) : y === "liquidations" ? /* @__PURE__ */ t.jsx(Bd, { symbol: n, provider: l, colormap: ot.liqColormap, intensity: ot.intensity, opacity: ot.opacity, gamma: ot.gamma, noiseFloor: ot.noiseFloor, tickPerRow: ot.tickPerRow, halfLife: ot.halfLife, lowPeak: ot.lowPeak }) : y === "watchlist" ? /* @__PURE__ */ t.jsx(Ed, { activeSymbol: n, onSelectSymbol: (ne) => {
              try {
                window.__lseShell?.selectSymbol?.(ne);
              } catch {
              }
            } }) : y === "indicators" ? /* @__PURE__ */ t.jsx(Ad, { symbol: n, provider: l }) : /* @__PURE__ */ t.jsx(Kr, { symbol: n, provider: l });
          })() }) : /* @__PURE__ */ t.jsx(t.Fragment, { children: /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
            /* @__PURE__ */ t.jsx(
              qo,
              {
                candles: _e,
                symbol: n,
                timeframe: h,
                chartType: Mt,
                onLoadMore: D,
                isLoadingMore: Re,
                prependShift: Oe.shift,
                livePrice: xn,
                countdown: $n,
                timezone: Os,
                rightOffset: 6,
                colors: Fs,
                indicators: Pn,
                onIndicatorsChange: el,
                onRemoveEngineIndicator: (y) => window.__lseShell?.removeIndicator?.(y),
                onEditEngineIndicator: (y) => {
                  window.__lseShell?.editIndicator?.(y) || ce();
                },
                drawings: Tt,
                selectedDrawingId: nn,
                drawingCursorRef: Ll,
                requestRedrawRef: Rl,
                scrollOffsetRef: Pl,
                onScrollSync: () => ro.current?.(),
                onConverterReady: De,
                onOpenSettings: ce,
                positionLines: ao,
                onPositionModify: te,
                onPositionClose: Ve,
                autoSelectPositionId: nt,
                showBidAskSpread: !!r,
                brokerBid: r?.bid ?? null,
                brokerAsk: r?.ask ?? null
              },
              Le
            ),
            /* @__PURE__ */ t.jsx(
              Yu,
              {
                activeTool: ee,
                onToolSelect: we,
                drawings: Tt,
                onDrawingsChange: Rn,
                selectedDrawingId: nn,
                onSelectDrawing: wn,
                converter: X,
                scrollSyncRef: ro,
                scrollOffsetRef: Pl,
                drawingCursorRef: Ll,
                requestRedrawRef: Rl,
                toolSettings: mn,
                isLocked: cn,
                isHidden: As,
                currentSymbol: n,
                timeframeMs: Ln,
                currentPrice: xn ?? void 0,
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
      Je && /* @__PURE__ */ t.jsx("div", { className: "absolute top-10 right-2 z-[90]", children: /* @__PURE__ */ t.jsx(fd, { settings: ot, onChange: Cl, onClose: () => Ds(!1) }) }),
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
              const y = un.trade, ne = (We) => window.__lseShell?.fmtPrice?.(We) ?? String(We), G = (We) => We === "limit" ? "Limit" : "Stop";
              if (St) {
                const We = {
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
                }, Ut = (jt) => {
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
                        /* @__PURE__ */ t.jsx("span", { style: bt, children: "Price" }),
                        /* @__PURE__ */ t.jsx(
                          "input",
                          {
                            autoFocus: !0,
                            value: Cn,
                            spellCheck: !1,
                            inputMode: "decimal",
                            style: We,
                            onChange: (jt) => On(jt.target.value),
                            onKeyDown: Ut
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
                        /* @__PURE__ */ t.jsx("span", { style: bt, children: "Units" }),
                        /* @__PURE__ */ t.jsx(
                          "input",
                          {
                            value: qn,
                            spellCheck: !1,
                            inputMode: "decimal",
                            style: We,
                            onChange: (jt) => Ws(jt.target.value),
                            onKeyDown: Ut
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
                  st && /* @__PURE__ */ t.jsx("div", { style: { ...kn, color: "#e05d5d", cursor: "default" }, children: st }),
                  /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: "1px solid var(--edge)" } })
                ] });
              }
              const ge = y.qty != null ? `${y.qty} ` : "", vt = [
                { label: `Buy ${ge}${y.symbol} at market`, side: "buy", otype: "market" },
                { label: `Sell ${ge}${y.symbol} at market`, side: "sell", otype: "market" }
              ], Ee = un.price, Et = un.ref, Vt = y.pendingTypes || [];
              if (Ee != null && Et != null && Ee !== Et && Vt.length) {
                const We = Ee < Et ? [{ side: "buy", otype: "limit" }, { side: "sell", otype: "stop" }] : [{ side: "sell", otype: "limit" }, { side: "buy", otype: "stop" }];
                for (const bt of We)
                  Vt.includes(bt.otype) && vt.push({ ...bt, label: `${bt.side === "buy" ? "Buy" : "Sell"} ${G(bt.otype)} @ ${ne(Ee)}…` });
              }
              return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                vt.map((We) => /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    className: "w-full text-left",
                    style: kn,
                    onMouseEnter: gs,
                    onMouseLeave: vs,
                    onClick: (bt) => {
                      if (We.otype === "market") {
                        window.__lseShell?.quickOrder?.(We.side, We.otype, un.price), Ne(null);
                        return;
                      }
                      bt.stopPropagation(), Un({ side: We.side, otype: We.otype }), On(Ee != null ? String(+Ee.toFixed(Ee >= 1e3 ? 2 : Ee >= 100 ? 3 : Ee >= 1 ? 4 : 6)) : ""), Ws(y.qty != null ? String(y.qty) : ""), Gn("");
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
                style: { ...kn, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 },
                onMouseEnter: gs,
                onMouseLeave: vs,
                onClick: () => ct((y) => !y),
                children: [
                  /* @__PURE__ */ t.jsx("span", { children: "Chart template" }),
                  /* @__PURE__ */ t.jsx("span", { style: { color: "var(--dim)" }, children: ut ? "▾" : "▸" })
                ]
              }
            ),
            ut && /* @__PURE__ */ t.jsxs("div", { className: "max-h-48 overflow-y-auto", style: { borderTop: "1px solid var(--edge)", borderBottom: "1px solid var(--edge)", margin: "3px 0" }, children: [
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
                        onClick: async (ne) => {
                          if (ne.stopPropagation(), ls !== y.id) {
                            Kn(y.id);
                            return;
                          }
                          await window.__lseShell?.deleteLayout?.(y.id), Kn(null), Ft((G) => G + 1);
                        },
                        children: ls === y.id ? "sure?" : "×"
                      }
                    )
                  ]
                },
                y.id
              )),
              it ? /* @__PURE__ */ t.jsxs(
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
                  rt(), Ne(null);
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
                  ft("appearance"), Mn(!0), Ne(null);
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
  const I = lo(), le = o.useMemo(() => oo(), []);
  return !l || !h.length ? /* @__PURE__ */ t.jsx("div", { className: "h-full w-full" }) : /* @__PURE__ */ t.jsx(
    qo,
    {
      candles: h,
      symbol: l,
      timeframe: n,
      chartType: "candlestick",
      livePrice: h[h.length - 1]?.close ?? null,
      rightOffset: 6,
      colors: le,
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
  const I = (le) => {
    h(le), le || setTimeout(() => {
      Yo.inReplay || l();
    }, 150);
  };
  return /* @__PURE__ */ t.jsx("div", { className: "h-full w-full bg-[#0b0d12]", children: /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(ns, {}), children: /* @__PURE__ */ t.jsx($d, { open: n, onOpenChange: I }) }) });
}
function eh({ provider: l }) {
  const [n] = Ju(), h = Zr(), T = n.get("sym"), I = h.pathname.split("/").pop() || "", le = n.get("provider") || l;
  return zo({ provider: le, symbol: T || I }), o.useEffect(() => (Yo.inReplay = !0, () => {
    Yo.inReplay = !1;
  }), []), /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(ns, {}), children: /* @__PURE__ */ t.jsx(_d, {}) });
}
let xl = null;
const th = {
  async mount(l, n = {}) {
    const h = n.provider || "demo", T = n.onExit || (() => {
    });
    xl || (xl = ys(l)), zo({ provider: h, symbol: "" }), await Jr(), xl.render(
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
    xl?.unmount(), xl = null;
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
