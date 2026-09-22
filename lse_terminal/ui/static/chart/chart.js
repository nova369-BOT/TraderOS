import { r as o, i as Ar, j as t, g as ki, q as ps } from "./chunks/react-vendor-C0yw3i6b.js";
import { n as Dr, o as Br, p as wi, q as Si, r as Ci, s as Ii, t as Ti, u as ji, v as Mi, w as Ri, x as Pi, y as Ni, z as Li, A as Ei, C as Ai, D as Di, E as Bi, F as Wi, G as Fi, H as Oi, J as _i, K as Hi, M as $i, N as Vi, O as Xi, Q as Yi, R as zi, U as Ki, V as Ui, W as qi, X as Gi, Y as Zi, Z as Ji, _ as Qi, $ as ec, a0 as tc, a1 as nc, a2 as sc, a3 as lc, a4 as oc, a5 as rc, a6 as ac, a7 as ic, a8 as cc, a9 as uc, aa as dc, ab as hc, ac as fc, ad as pc, ae as xc, af as mc, ag as bc, ah as gc, ai as vc, aj as yc, ak as kc, al as wc, am as Sc, an as Cc, ao as Ic, ap as Tc, aq as jc, ar as Mc, as as Rc, at as Pc, au as Nc, av as Lc, aw as Ec, ax as Ac, ay as Dc, az as Bc, aA as Wc, aB as Fc, aC as Oc, aD as _c, aE as Hc, aF as $c, aG as Vc, aH as Xc, aI as Yc, aJ as zc, aK as Kc, aL as Uc, aM as qc, aN as Gc, aO as Zc, aP as Jc, aQ as Qc, aR as eu, aS as tu, aT as nu, aU as su, aV as lu, aW as ou, aX as ru, aY as au, aZ as iu, a_ as cu, a$ as uu, b0 as du, b1 as hu, b2 as fu, b3 as pu, b4 as xu, b5 as $e, b6 as mu, b7 as bu, b8 as lo, b9 as oo, ba as gu, bb as vu, bc as yu, bd as ku, be as wu, bf as Su, bg as Cu, bh as Iu, bi as $o, bj as Tu, bk as ju, bl as Mu, bm as Ru, bn as Pu, g as Nu, bo as Lu, bp as Eu, bq as Au, br as Wr, bs as Kl, bt as Du, bu as Zr, bv as Bu, bw as Wu, bx as Fu, by as Ul, bz as Ou, bA as _u, bB as Hu, bC as $u, bD as Ls, bE as Vu, bF as qo, bG as Go, bH as hl, bI as Xu, bJ as Yu, bK as zu, bL as Ku, bM as Uu, bN as qu } from "./chunks/backtest-BOI-AqD2.js";
import { ay as ql, aA as Gl, m as Zl, aS as Jl } from "./chunks/ui-D7POjNks.js";
import { Q as Gu, d as Zu, M as Zo, R as Ju, e as Fr, c as Qu, a as Jr } from "./chunks/router-query-iQy8iLKR.js";
import { D as ed } from "./chunks/depth-DgOhdG7Y.js";
import { $ as td } from "./chunks/ui-heavy-BL_8guwx.js";
function Or(s, n) {
  const { closes: h, highs: T, lows: I, opens: ne, volumes: le, timestamps: je } = s;
  let r = null;
  return n.movingAverages?.enabled && n.movingAverages.lines?.length > 0 && (r = n.movingAverages.lines.map((Q) => {
    let Oe;
    switch (Q.type) {
      case "SMA":
        Oe = wi(h, Q.period);
        break;
      case "SMMA":
        Oe = Br(h, Q.period);
        break;
      case "EMA":
      default:
        Oe = Dr(h, Q.period);
        break;
    }
    return { data: Oe, color: Q.color, name: `${Q.type} ${Q.period}` };
  })), {
    rsi: n.rsi?.enabled ? xu(h, n.rsi.period) : null,
    macd: n.macd?.enabled ? pu(h, n.macd.fast, n.macd.slow, n.macd.signal) : null,
    ema: n.ema?.enabled ? n.ema.periods.map((Q) => Dr(h, Q)) : null,
    bollinger: n.bollinger?.enabled ? fu(h, n.bollinger.period, n.bollinger.stdDev) : null,
    movingAverages: r,
    atr: n.atr?.enabled ? hu(T, I, h, n.atr.period) : null,
    stochastic: n.stochastic?.enabled ? du(T, I, h, n.stochastic.kPeriod, n.stochastic.dPeriod, n.stochastic.smooth) : null,
    williamsR: n.williamsR?.enabled ? uu(T, I, h, n.williamsR.period) : null,
    cci: n.cci?.enabled ? cu(T, I, h, n.cci.period) : null,
    adx: n.adx?.enabled ? iu(T, I, h, n.adx.period) : null,
    roc: n.roc?.enabled ? au(h, n.roc.period) : null,
    vwap: n.vwap?.enabled ? ru(T, I, h, le, je) : null,
    ichimoku: n.ichimoku?.enabled ? ou(T, I, h, n.ichimoku.tenkanPeriod, n.ichimoku.kijunPeriod, n.ichimoku.senkouBPeriod, n.ichimoku.displacement) : null,
    parabolicSAR: n.parabolicSAR?.enabled ? lu(T, I, n.parabolicSAR.afStart, n.parabolicSAR.afStep, n.parabolicSAR.afMax) : null,
    keltner: n.keltner?.enabled ? su(T, I, h, n.keltner.emaPeriod, n.keltner.atrPeriod, n.keltner.multiplier) : null,
    pivotPoints: n.pivotPoints?.enabled ? nu(je, T, I, h) : null,
    supertrend: n.supertrend?.enabled ? tu(T, I, h, n.supertrend.period, n.supertrend.multiplier) : null,
    donchian: n.donchian?.enabled ? eu(T, I, n.donchian.period) : null,
    aroon: n.aroon?.enabled ? Qc(T, I, n.aroon.period) : null,
    envelopes: n.envelopes?.enabled ? Jc(h, n.envelopes.period, n.envelopes.percent) : null,
    dema: n.dema?.enabled ? Zc(h, n.dema.period) : null,
    tema: n.tema?.enabled ? Gc(h, n.tema.period) : null,
    hma: n.hma?.enabled ? qc(h, n.hma.period) : null,
    momentum: n.momentum?.enabled ? Uc(h, n.momentum.period) : null,
    awesomeOsc: n.awesomeOsc?.enabled ? Kc(T, I) : null,
    mfi: n.mfi?.enabled ? zc(T, I, h, le, n.mfi.period) : null,
    tsi: n.tsi?.enabled ? Yc(h, n.tsi.longPeriod, n.tsi.shortPeriod, n.tsi.signalPeriod) : null,
    trix: n.trix?.enabled ? Xc(h, n.trix.period, n.trix.signalPeriod) : null,
    ultimateOsc: n.ultimateOsc?.enabled ? Vc(T, I, h, n.ultimateOsc.fast, n.ultimateOsc.med, n.ultimateOsc.slow) : null,
    dpo: n.dpo?.enabled ? $c(h, n.dpo.period) : null,
    kst: n.kst?.enabled ? Hc(h, n.kst.roc1, n.kst.roc2, n.kst.roc3, n.kst.roc4, n.kst.sma1, n.kst.sma2, n.kst.sma3, n.kst.sma4, n.kst.signalPeriod) : null,
    stochRsi: n.stochRsi?.enabled ? _c(h, n.stochRsi.rsiPeriod, n.stochRsi.kPeriod, n.stochRsi.dPeriod) : null,
    bbPercent: n.bbPercent?.enabled ? Oc(h, n.bbPercent.period, n.bbPercent.stdDev) : null,
    bbWidth: n.bbWidth?.enabled ? Fc(h, n.bbWidth.period, n.bbWidth.stdDev) : null,
    histVol: n.histVol?.enabled ? Wc(h, n.histVol.period) : null,
    chaikinVol: n.chaikinVol?.enabled ? Bc(T, I, n.chaikinVol.emaPeriod, n.chaikinVol.rocPeriod) : null,
    stdDev: n.stdDev?.enabled ? Dc(h, n.stdDev.period) : null,
    obv: n.obv?.enabled ? Ac(h, le) : null,
    cmf: n.cmf?.enabled ? Ec(T, I, h, le, n.cmf.period) : null,
    adl: n.adl?.enabled ? Lc(T, I, h, le) : null,
    forceIndex: n.forceIndex?.enabled ? Nc(h, le, n.forceIndex.period) : null,
    eom: n.eom?.enabled ? Pc(T, I, le, n.eom.period) : null,
    volumeSma: n.volumeSma?.enabled ? Rc(le, n.volumeSma.period) : null,
    fibRetracement: n.fibRetracement?.enabled ? Mc(T, I, n.fibRetracement.lookback) : null,
    camarillaPivots: n.camarillaPivots?.enabled ? jc(je, T, I, h) : null,
    woodiePivots: n.woodiePivots?.enabled ? Tc(je, T, I, h) : null,
    correlation: n.correlation?.enabled ? Ic(h, le, n.correlation.period) : null,
    linearReg: n.linearReg?.enabled ? Cc(h, n.linearReg.period, n.linearReg.deviations) : null,
    coppock: n.coppock?.enabled ? Sc(h, n.coppock.longROC, n.coppock.shortROC, n.coppock.wmaPeriod) : null,
    alma: n.alma?.enabled ? wc(h, n.alma.period, n.alma.offset, n.alma.sigma) : null,
    kama: n.kama?.enabled ? kc(h, n.kama.period, n.kama.fastPeriod, n.kama.slowPeriod) : null,
    zlema: n.zlema?.enabled ? yc(h, n.zlema.period) : null,
    t3: n.t3?.enabled ? vc(h, n.t3.period, n.t3.vFactor) : null,
    lsma: n.lsma?.enabled ? gc(h, n.lsma.period) : null,
    mcginley: n.mcginley?.enabled ? bc(h, n.mcginley.period) : null,
    vortex: n.vortex?.enabled ? mc(T, I, h, n.vortex.period) : null,
    choppiness: n.choppiness?.enabled ? xc(T, I, h, n.choppiness.period) : null,
    elderRay: n.elderRay?.enabled ? pc(T, I, h, n.elderRay.period) : null,
    massIndex: n.massIndex?.enabled ? fc(T, I, n.massIndex.period) : null,
    chandeKroll: n.chandeKroll?.enabled ? hc(T, I, h, n.chandeKroll.p, n.chandeKroll.q, n.chandeKroll.x) : null,
    chandelierExit: n.chandelierExit?.enabled ? dc(T, I, h, n.chandelierExit.period, n.chandelierExit.multiplier) : null,
    linRegSlope: n.linRegSlope?.enabled ? uc(h, n.linRegSlope.period) : null,
    priceChannel: n.priceChannel?.enabled ? cc(T, I, n.priceChannel.period) : null,
    alligator: n.alligator?.enabled ? ic(h) : null,
    accBands: n.accBands?.enabled ? ac(T, I, h, n.accBands.period) : null,
    ppo: n.ppo?.enabled ? rc(h, n.ppo.fast, n.ppo.slow, n.ppo.signal) : null,
    pvo: n.pvo?.enabled ? oc(le, n.pvo.fast, n.pvo.slow, n.pvo.signal) : null,
    cmo: n.cmo?.enabled ? lc(h, n.cmo.period) : null,
    fisher: n.fisher?.enabled ? sc(T, I, n.fisher.period) : null,
    stc: n.stc?.enabled ? nc(h, n.stc.fast, n.stc.slow, n.stc.cycle) : null,
    rviOsc: n.rviOsc?.enabled ? tc(ne, T, I, h, n.rviOsc.period) : null,
    klinger: n.klinger?.enabled ? ec(T, I, h, le, n.klinger.fast, n.klinger.slow, n.klinger.signal) : null,
    connorsRsi: n.connorsRsi?.enabled ? Qi(h, n.connorsRsi.rsiPeriod, n.connorsRsi.streakPeriod, n.connorsRsi.rankPeriod) : null,
    apo: n.apo?.enabled ? Ji(h, n.apo.fast, n.apo.slow) : null,
    qstick: n.qstick?.enabled ? Zi(ne, h, n.qstick.period) : null,
    bop: n.bop?.enabled ? Gi(ne, T, I, h, n.bop.period) : null,
    psychLine: n.psychLine?.enabled ? qi(h, n.psychLine.period) : null,
    pfe: n.pfe?.enabled ? Ui(h, n.pfe.period, n.pfe.smoothing) : null,
    smi: n.smi?.enabled ? Ki(T, I, h, n.smi.period, n.smi.smoothK, n.smi.smoothD) : null,
    ulcerIndex: n.ulcerIndex?.enabled ? zi(h, n.ulcerIndex.period) : null,
    natr: n.natr?.enabled ? Yi(T, I, h, n.natr.period) : null,
    trueRange: n.trueRange?.enabled ? Xi(T, I, h) : null,
    squeeze: n.squeeze?.enabled ? Vi(T, I, h, n.squeeze.bbPeriod, n.squeeze.bbMult, n.squeeze.kcPeriod, n.squeeze.kcMult) : null,
    relVolIndex: n.relVolIndex?.enabled ? $i(h, n.relVolIndex.period, n.relVolIndex.smoothing) : null,
    vhf: n.vhf?.enabled ? Hi(h, n.vhf.period) : null,
    vwma: n.vwma?.enabled ? _i(h, le, n.vwma.period) : null,
    volumeOsc: n.volumeOsc?.enabled ? Oi(le, n.volumeOsc.fast, n.volumeOsc.slow) : null,
    nvi: n.nvi?.enabled ? Fi(h, le) : null,
    pvi: n.pvi?.enabled ? Wi(h, le) : null,
    pvt: n.pvt?.enabled ? Bi(h, le) : null,
    vroc: n.vroc?.enabled ? Di(le, n.vroc.period) : null,
    netVolume: n.netVolume?.enabled ? Ai(h, le, n.netVolume.period) : null,
    twiggsMF: n.twiggsMF?.enabled ? Ei(T, I, h, le, n.twiggsMF.period) : null,
    linRegRSquared: n.linRegRSquared?.enabled ? Li(h, n.linRegRSquared.period) : null,
    medianPrice: n.medianPrice?.enabled ? Ni(T, I) : null,
    typicalPrice: n.typicalPrice?.enabled ? Pi(T, I, h) : null,
    weightedClose: n.weightedClose?.enabled ? Ri(T, I, h) : null,
    demarkPivots: n.demarkPivots?.enabled ? Mi(je, T, I, ne, h) : null,
    zigzag: n.zigzag?.enabled ? ji(T, I, h, n.zigzag.deviation) : null,
    fractals: n.fractals?.enabled ? Ti(T, I) : null,
    gator: n.gator?.enabled ? Ii(h) : null,
    smmaOverlay: n.smmaOverlay?.enabled ? Br(h, n.smmaOverlay.period) : null,
    wma: n.wma?.enabled ? Ci(h, n.wma.period) : null,
    customIndicators: (n.customIndicators || []).filter((Q) => Q.enabled).map((Q) => {
      if (typeof Q.expression == "string" && (Q.expression.startsWith("brue:") || Q.expression.startsWith("local:")) && Array.isArray(Q.data) && Q.data.length > 0)
        return Q;
      const Oe = { closes: h, highs: T, lows: I, opens: ne, volumes: le, timestamps: je }, nt = Si(Q.expression, Oe);
      return { ...Q, data: nt.errors.length === 0 ? nt.data : new Array(h.length).fill(NaN) };
    })
  };
}
function nd(s, n) {
  if (n <= 0) return s;
  const h = new Array(n).fill(NaN), T = {};
  for (const I of Object.keys(s)) {
    const ne = s[I];
    if (ne == null) {
      T[I] = ne;
      continue;
    }
    if (Array.isArray(ne)) {
      ne.length > 0 && typeof ne[0] == "object" && ne[0] !== null && "data" in ne[0] ? T[I] = ne.map((le) => ({ ...le, data: h.concat(le.data || []) })) : T[I] = h.concat(ne);
      continue;
    }
    if (typeof ne == "object") {
      const le = {};
      for (const je of Object.keys(ne)) {
        const r = ne[je];
        if (Array.isArray(r)) le[je] = h.concat(r);
        else if (typeof r == "object" && r !== null) {
          const ke = {};
          for (const Q of Object.keys(r)) {
            const Oe = r[Q];
            ke[Q] = Array.isArray(Oe) ? h.concat(Oe) : Oe;
          }
          le[je] = ke;
        } else le[je] = r;
      }
      T[I] = le;
      continue;
    }
    T[I] = ne;
  }
  return T;
}
let Ql = null, sd = 0;
function _r() {
  return Ql || (Ql = new Worker(new URL(
    /* @vite-ignore */
    "/assets/indicatorWorker-DBDvDVhS.js",
    import.meta.url
  ), { type: "module" }), Ql);
}
function ld(s, n, h) {
  const [T, I] = o.useState(null), [ne, le] = o.useState(!1), [je, r] = o.useState(null), ke = o.useRef(null), Q = o.useRef(null), Oe = o.useRef(0), nt = o.useRef(null), Ae = o.useCallback((Be) => {
    const { id: be, result: Ee, error: Se, durationMs: D } = Be.data;
    if (!(nt.current !== null && be !== nt.current)) {
      if (nt.current = null, le(!1), Se) {
        console.warn("[indicatorWorker] error", Se);
        return;
      }
      D !== void 0 && r(D), s.length > 0 && (Oe.current = s[0].close), Q.current = Ee, I(Ee);
    }
  }, [s]);
  return o.useEffect(() => {
    const Be = _r();
    return Be.addEventListener("message", Ae), () => Be.removeEventListener("message", Ae);
  }, [Ae]), o.useEffect(() => {
    if (!n || s.length === 0) {
      I(null);
      return;
    }
    const Be = s.length > 0 ? s[0].close : 0;
    if (h.current && Q.current && Oe.current === Be)
      return;
    const be = ke.current;
    let Ee, Se, D, K, Ce, re, ee = null;
    const qe = be && be.candles !== s && s.length >= be.closes.length && s.length > 0 && be.closes.length > 0 && s[0].time === be.timestamps[0] && be.closes.length > 10;
    let pe = 0;
    const gt = !qe && be && be.candles !== s && s.length > be.closes.length && be.closes.length > 10 && s.length - be.closes.length > 0 && s[s.length - be.closes.length]?.time === be.timestamps[0];
    if (gt && (pe = s.length - be.closes.length), qe) {
      const tt = be.closes.length, xt = Math.max(0, tt - 1);
      Ee = be.closes, Se = be.highs, D = be.lows, K = be.opens, Ce = be.volumes, re = be.timestamps, Ee.length = xt, Se.length = xt, D.length = xt, K.length = xt, Ce.length = xt, re.length = xt;
      for (let Tt = xt; Tt < s.length; Tt++) {
        const Nt = s[Tt];
        Ee.push(Nt.close), Se.push(Nt.high), D.push(Nt.low), K.push(Nt.open), Ce.push(Nt.volume || 0), re.push(Nt.time);
      }
      ee = { closes: Ee, highs: Se, lows: D, opens: K, volumes: Ce, timestamps: re }, ke.current = { candles: s, closes: Ee, highs: Se, lows: D, opens: K, volumes: Ce, timestamps: re };
      const tn = Object.values(n).filter((Tt) => Tt?.enabled).length;
      if (!(s.length > 3e3 && tn > 3)) {
        const Tt = performance.now(), Nt = Or(ee, n), on = performance.now() - Tt;
        r(on), Q.current = Nt, Oe.current = Be, I(Nt);
        return;
      }
    } else if (gt && Q.current) {
      const tt = new Array(pe), xt = new Array(pe), tn = new Array(pe), In = new Array(pe), Tt = new Array(pe), Nt = new Array(pe);
      for (let zt = 0; zt < pe; zt++) {
        const rn = s[zt];
        tt[zt] = rn.close, xt[zt] = rn.high, tn[zt] = rn.low, In[zt] = rn.open, Tt[zt] = rn.volume || 0, Nt[zt] = rn.time;
      }
      Ee = tt.concat(be.closes), Se = xt.concat(be.highs), D = tn.concat(be.lows), K = In.concat(be.opens), Ce = Tt.concat(be.volumes), re = Nt.concat(be.timestamps);
      const on = nd(Q.current, pe);
      ke.current = { candles: s, closes: Ee, highs: Se, lows: D, opens: K, volumes: Ce, timestamps: re }, Q.current = on, Oe.current = Be, I(on);
      return;
    } else
      Ee = s.map((tt) => tt.close), Se = s.map((tt) => tt.high), D = s.map((tt) => tt.low), K = s.map((tt) => tt.open), Ce = s.map((tt) => tt.volume || 0), re = s.map((tt) => tt.time), ee = { closes: Ee, highs: Se, lows: D, opens: K, volumes: Ce, timestamps: re }, ke.current = { candles: s, closes: Ee, highs: Se, lows: D, opens: K, volumes: Ce, timestamps: re };
    ee || (ee = { closes: Ee, highs: Se, lows: D, opens: K, volumes: Ce, timestamps: re });
    const wt = Object.values(n).filter((tt) => tt?.enabled).length;
    if (!(s.length > 1e3 || wt > 5 || (n.customIndicators?.filter((tt) => tt.enabled)?.length || 0) > 0)) {
      const tt = performance.now(), xt = Or(ee, n), tn = performance.now() - tt;
      r(tn), Q.current = xt, Oe.current = Be, I(xt);
      return;
    }
    le(!0);
    const Yt = _r(), en = ++sd;
    nt.current = en, Yt.postMessage({ id: en, price: ee, indicators: n });
  }, [s, n, h]), { indicatorData: T, isComputing: ne, computeDurationMs: je };
}
function fl(s) {
  const {
    ctx: n,
    candles: h,
    startIndex: T,
    indexToX: I,
    priceToY: ne,
    morphAt: le,
    candleBodyWidth: je,
    wickWidth: r,
    colors: ke
  } = s, Q = new Path2D(), Oe = new Path2D(), nt = je / 2, Ae = h.length, Be = new Float64Array(Ae), be = new Float64Array(Ae), Ee = new Float64Array(Ae), Se = new Float64Array(Ae), D = new Float64Array(Ae), K = new Float64Array(Ae), Ce = new Float64Array(Ae), re = new Float64Array(Ae);
  let ee = 0, qe = 0;
  for (let pe = 0; pe < h.length; pe++) {
    const gt = le(pe, h[pe]), wt = I(T + pe, T), ze = ne(gt.open), Yt = ne(gt.close), en = ne(gt.high), tt = ne(gt.low), xt = Math.min(ze, Yt), tn = Math.max(1, Math.abs(Yt - ze));
    gt.close >= gt.open ? (Q.moveTo(wt, en), Q.lineTo(wt, tt), Be[ee] = wt - nt, be[ee] = xt, Ee[ee] = je, Se[ee] = tn, ee++) : (Oe.moveTo(wt, en), Oe.lineTo(wt, tt), D[qe] = wt - nt, K[qe] = xt, Ce[qe] = je, re[qe] = tn, qe++);
  }
  if (n.lineWidth = r, n.lineCap = "round", ee) {
    n.strokeStyle = ke.bullishWick, n.stroke(Q), n.fillStyle = ke.bullish;
    for (let pe = 0; pe < ee; pe++)
      n.fillRect(Be[pe], be[pe], Ee[pe], Se[pe]);
  }
  if (qe) {
    n.strokeStyle = ke.bearishWick, n.stroke(Oe), n.fillStyle = ke.bearish;
    for (let pe = 0; pe < qe; pe++)
      n.fillRect(D[pe], K[pe], Ce[pe], re[pe]);
  }
  if (n.lineCap = "butt", n.lineWidth = 1, ee) {
    n.strokeStyle = ke.bullishBorder;
    for (let pe = 0; pe < ee; pe++)
      n.strokeRect(Be[pe], be[pe], Ee[pe], Se[pe]);
  }
  if (qe) {
    n.strokeStyle = ke.bearishBorder;
    for (let pe = 0; pe < qe; pe++)
      n.strokeRect(D[pe], K[pe], Ce[pe], re[pe]);
  }
}
const od = (s) => {
  const n = (s || "").toUpperCase();
  if (n.includes("XAU") || n.includes("XAG")) return 0.8;
  if (n.includes("NAS100") || n.includes("SPX500") || n.includes("US30") || n.includes("US2000")) return 1.5;
  if (n.includes("BCO") || n.includes("WTICO")) return 0.05;
  if (n.includes("BTC")) return 4;
  if (n.includes("ETH")) return 2;
  if (n.includes("JPY")) return 1e-3;
  const h = n.replace("/", "");
  return h.length === 6 && /EUR|GBP|AUD|NZD|CAD|CHF|USD/.test(h) ? 1e-5 : 0.04;
}, rd = (s, n) => od(s), Jo = ({
  candles: s,
  livePrice: n,
  symbol: h = "",
  timezone: T = "UTC",
  countdown: I,
  onCrosshairMove: ne,
  syncedCrosshairTime: le,
  colors: je,
  indicators: r,
  onIndicatorsChange: ke,
  onRemoveBruePlot: Q,
  onRemoveEngineIndicator: Oe,
  onEditEngineIndicator: nt,
  onConverterReady: Ae,
  onVisibleRangeChange: Be,
  onViewportTimeChange: be,
  syncedViewportTime: Ee,
  disableAutoFollow: Se = !1,
  scrollToIndex: D,
  chartType: K = "candlestick",
  onScrollingChange: Ce,
  onScrollSync: re,
  scrollOffsetRef: ee,
  optionsPdfEnabled: qe = !1,
  heatmapEnabled: pe = !1,
  externalDimensions: gt,
  economicEvents: wt,
  positionLines: ze,
  onPositionModify: Yt,
  onPositionClose: en,
  autoSelectPositionId: tt,
  l2DepthData: xt,
  onOpenSettings: tn,
  onOpenCustomEditor: In,
  showBidAskSpread: Tt = !1,
  brokerBid: Nt = null,
  brokerAsk: on = null,
  showSessions: zt = !1,
  timeframe: rn = "5m",
  rightOffset: An,
  onLoadMore: xs,
  isLoadingMore: zs = !1,
  prependShift: ms = 0,
  drawings: ts,
  selectedDrawingId: bs,
  drawingCursorRef: gs,
  requestRedrawRef: Ks,
  isDrawingDragging: wl = !1
}) => {
  const at = o.useRef(null), Sl = o.useRef(null), Ge = o.useRef(null), Es = o.useRef(null), Us = o.useRef(!1), qs = o.useRef(null);
  o.useRef(null);
  const ro = o.useRef(s), As = o.useRef(le ?? null), Gs = o.useRef(!1), Ds = o.useRef(null), gn = typeof window < "u" ? Math.min(window.devicePixelRatio || 1, 2) : 1, [xe, Zs] = o.useState({ width: 300, height: 300 }), [de, Dt] = o.useState({
    startIndex: 0,
    candleWidth: 3,
    // Zoomed out default - shows more candles on first load
    // Backtest/replay mode has no future candles arriving, so zero right-side padding.
    // TERMINAL DIVERGENCE from the site port: the site keeps 35 future candles
    // for economic event flags, but the terminal draws no flags on the chart
    // (ECONOMIC is its own tab), so that margin was pure dead space on the
    // right and was dropped.
    futureSpace: 0,
    autoFollowLatest: !Se
    // Start disabled if in replay mode
  }), Me = o.useRef({
    startIndex: 0,
    candleWidth: 3
  }), Dn = o.useRef({
    startIndex: 0,
    candleWidth: 3
  }), jt = o.useRef(!1), Cl = o.useRef(!1), Ye = o.useRef(null), Ze = o.useRef(null), Qe = o.useRef(null), it = o.useRef(null), Xn = o.useRef(null), Il = o.useRef(0), [, Kt] = o.useState(0), Yn = o.useRef(null), ns = (a) => {
    const p = Ye.current, b = Yn.current;
    if (p && b && b.posId === p) return b.offset;
    const y = dn.current, f = y && y.range > 0 ? y.range * 0.18 : a * 5e-3;
    return Yn.current = p && f > 0 ? { posId: p, offset: f } : null, f;
  }, ss = o.useRef(null);
  o.useEffect(() => {
    if (tt && tt !== ss.current && ze) {
      const a = ze.find((p) => p.id === tt);
      a && (ss.current = tt, Ye.current = a.id, Ze.current = a.stopLoss ?? null, Qe.current = a.takeProfit ?? null, Kt((p) => p + 1));
    }
  }, [tt, ze]);
  const Bs = o.useRef(0), Bt = o.useCallback((a) => {
    jt.current = a, Cl.current !== a && (Cl.current = a, Ce?.(a), a || (Bs.current = Me.current.startIndex, ee && (ee.current = 0)));
  }, [Ce, ee]), St = o.useCallback(() => {
    if (ee) {
      const a = Me.current.startIndex, p = Me.current.candleWidth * (1 + $e), b = a - Bs.current;
      ee.current = b * p;
    }
    re?.();
  }, [re, ee]), Js = o.useRef(St);
  Js.current = St;
  const an = o.useRef(null), cn = o.useRef(null), zn = o.useRef(null), Ws = o.useRef(!1), lt = o.useCallback((a = !1) => {
    if (zn.current !== null) {
      a || (Ws.current = !1);
      return;
    }
    Ws.current = a, zn.current = requestAnimationFrame(() => {
      zn.current = null;
      const p = Ws.current;
      an.current && an.current(p);
    });
  }, []);
  o.useCallback((a = !1) => {
    zn.current !== null && (cancelAnimationFrame(zn.current), zn.current = null), an.current && an.current(a);
  }, []);
  const Tl = o.useRef(null), vs = o.useRef(0), Bn = o.useRef(0), Wn = o.useRef(!1), jl = o.useRef(0), ls = o.useRef(null), Fs = o.useRef(void 0), Ht = o.useRef(null), Tn = o.useRef("standard"), [Ml, Fn] = o.useState([]), ct = o.useRef(null), Ut = o.useRef(null), On = o.useRef([]), ys = o.useRef(null), jn = o.useRef(null), [Mn, _n] = o.useState(!1), [pn, Rl] = o.useState({ x: 0, y: 0, startIndex: 0, priceOffset: 0 }), [ao, io] = o.useState(0), [co, Pl] = o.useState(1), $t = o.useRef(null), Mt = o.useRef(null), qt = o.useRef(0), os = o.useRef(null), st = o.useRef(null), [vn, ks] = o.useState(!1), ws = o.useRef(null), Nl = o.useRef(0), Kn = o.useRef(0), Un = o.useRef(!1);
  o.useRef(0), o.useRef(0);
  const un = o.useRef(null), Hn = o.useRef(null), xn = o.useRef(null), Qs = o.useRef(null), uo = "ns-resize", el = "ns-resize";
  o.useRef(12), o.useRef(0), o.useRef(0);
  const [Gt, ho] = o.useState(0.15), [m, ie] = o.useState(!1), ae = o.useRef({ y: 0, ratio: 0 });
  o.useRef(null);
  const [ve, ft] = o.useState(1), [Re, Lt] = o.useState(0), [mt, _e] = o.useState(null), [ot, Os] = o.useState(null), [Ss, Ct] = o.useState(!1), [Cs, ea] = o.useState(!1), tl = o.useRef({ y: 0, scale: 1, offset: 0 }), rs = mt !== null, yn = o.useRef(1), qn = o.useRef(0), Gn = o.useRef(null), dn = o.useRef(null), hn = o.useRef(0), Is = o.useRef(null), [Zn, ta] = mu("preferences.chartShowOHLC", !0), [tr, na] = o.useState(0), [nl, nr] = o.useState(!1), [mh, sa] = o.useState(0), fo = o.useRef(null), po = o.useRef(!1);
  o.useEffect(() => {
    if (!nl) return;
    const a = setInterval(() => sa((p) => p + 1), 3e4);
    return () => clearInterval(a);
  }, [nl]), o.useEffect(() => {
    wt && wt.length > 0 && bu(wt.map((a) => a.region_code));
  }, [wt]), o.useEffect(() => {
    if (!nl) return;
    const a = (p) => {
      fo.current && !fo.current.contains(p.target) && nr(!1);
    };
    return document.addEventListener("mousedown", a), () => document.removeEventListener("mousedown", a);
  }, [nl]);
  const [xo, la] = o.useState(0), [mo, oa] = o.useState(0), [bo, ra] = o.useState(0), [go, aa] = o.useState(0), [vo, ia] = o.useState(0), _s = o.useRef({}), [ut, ca] = o.useState({}), $n = o.useRef({}), [sr, ua] = o.useState({}), [lr, yo] = o.useState(null), [sl, Hs] = o.useState(null), nn = o.useRef({});
  o.useRef(null);
  const or = o.useRef(!1), sn = o.useRef(!1), bt = o.useRef(null), [da, ye] = o.useState(null), [It, fe] = o.useState(null), [Rn, vt] = o.useState(null), rr = typeof navigator < "u" && /Mac|iPhone|iPad|iPod/.test(navigator.platform), [ll, ha] = o.useState(rr ? 8 : 2), ko = o.useRef(rr), ol = lo(), wo = o.useRef(ol);
  wo.current = ol, o.useEffect(() => {
    ol.chart?.scrollSensitivity !== void 0 && ha(ol.chart.scrollSensitivity);
  }, [ol.chart?.scrollSensitivity]);
  const te = { ...oo(), ...je }, ar = typeof document < "u" && document.documentElement.classList.contains("dark");
  o.useEffect(() => {
    jt.current || (Me.current = {
      startIndex: de.startIndex,
      candleWidth: de.candleWidth
    });
  }, [de.startIndex, de.candleWidth]), o.useEffect(() => {
    yn.current = ve, qn.current = Re;
  }, [ve, Re]), o.useEffect(() => {
    if (!de.autoFollowLatest) return;
    const a = setInterval(() => {
      io((p) => (p + 0.1) % (Math.PI * 2)), Pl(0.85 + Math.sin(Date.now() / 1e3) * 0.15);
    }, 150);
    return () => clearInterval(a);
  }, [de.autoFollowLatest]), o.useEffect(() => {
    ro.current = s;
    const a = s[s.length - 1];
    a && (qs.current = {
      time: a.time,
      open: a.open,
      high: a.high,
      low: a.low,
      close: a.close
    }, de.autoFollowLatest && an.current && an.current(!0));
  }, [s, de.autoFollowLatest]), o.useEffect(() => {
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
      for (const $ of O)
        if (e === $ || e.startsWith($)) return { ticker: $, etfDragPerYear: 0 };
      return e.includes("XAU") || e.includes("GOLD") ? { ticker: "GLD", etfDragPerYear: 4e-3 } : e.includes("SPX500") || e.includes("SPX") ? { ticker: "SPY", etfDragPerYear: 0 } : e.includes("NAS100") || e.includes("NDX") ? { ticker: "QQQ", etfDragPerYear: 0 } : e.includes("US30") || e.includes("DJI") ? { ticker: "DIA", etfDragPerYear: 0 } : null;
    })(h);
    if (!p || !qe) {
      yo(null);
      return;
    }
    const b = async () => {
      try {
        const f = [];
        if (!f || f.length === 0) {
          yo(null);
          return;
        }
        const e = f[0], O = s[s.length - 1]?.close || parseFloat(e.current_price), $ = parseFloat(e.current_price), U = $ > 0 ? O / $ : 1;
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
        }))), yo({
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
    if (!pe || !h) {
      Fn([]);
      return;
    }
    const a = async () => {
      try {
        const b = h.includes("/") ? h : h.length === 6 ? `${h.substring(0, 3)}/${h.substring(3)}` : h, y = await Hu("l2_heatmap_snapshots", {
          params: { symbol: `eq.${b}`, order: "timestamp.desc", limit: "300" }
        });
        y && y.length > 0 && Fn(y.reverse());
      } catch (b) {
        console.error("Failed to fetch heatmap data:", b);
      }
    };
    a();
    const p = setInterval(a, 5e3);
    return () => clearInterval(p);
  }, [h, pe]), o.useEffect(() => () => {
    $t.current !== null && cancelAnimationFrame($t.current), Ut.current !== null && cancelAnimationFrame(Ut.current), un.current !== null && cancelAnimationFrame(un.current), Hn.current !== null && cancelAnimationFrame(Hn.current), xn.current !== null && cancelAnimationFrame(xn.current), Mt.current !== null && clearTimeout(Mt.current), Gn.current !== null && clearTimeout(Gn.current);
  }, []);
  const { isPhone: fa, isDesktop: Ll } = gu(xe.width), He = o.useMemo(() => vu(xe.width), [xe.width]), ir = fa, cr = n || (s.length > 0 ? s[s.length - 1]?.close : 100), Ve = o.useMemo(() => yu(ir, h, cr || 100, An), [ir, Ll, h, cr, An]), yt = He.timeAxisHeight, El = He.priceLabelFont, ur = He.timeLabelFont, Vt = He.subplotLabelFont, Al = 1, Dl = 50, as = o.useMemo(() => {
    const a = [], b = Math.pow(Dl / Al, 0.025);
    for (let y = 0; y <= 40; y++)
      a.push(Al * Math.pow(b, y));
    return a;
  }, []), Pn = o.useCallback((a = !1) => {
    const p = xe.width - Ve, b = a && jt.current ? Me.current : de, y = b.candleWidth * (1 + $e), f = Math.floor(p / y), e = Math.max(0, Math.floor(b.startIndex)), O = Math.min(s.length, e + f);
    return {
      candles: s.slice(e, O),
      startIndex: e,
      endIndex: O,
      visibleCount: f,
      totalWithFuture: f + de.futureSpace,
      candleWidth: b.candleWidth
    };
  }, [s, xe.width, de]);
  o.useEffect(() => {
    if (s.length > 0) {
      const a = xe.width - Ve, p = de.candleWidth * (1 + $e), b = Math.floor(a / p), y = Math.max(0, Math.floor(de.startIndex)), f = Math.min(s.length, y + b);
      Be && Be({ startIndex: y, endIndex: f, totalCandles: s.length }), xs && y < 2500 && !zs && !Un.current && !de.autoFollowLatest && (ls.current && clearTimeout(ls.current), ls.current = setTimeout(() => {
        Un.current || xs();
      }, 100));
    }
  }, [Be, xs, zs, s.length, de.startIndex, de.candleWidth, xe.width, de.autoFollowLatest]), o.useEffect(() => {
    if (!be || s.length === 0) return;
    if (Gs.current) {
      Gs.current = !1;
      return;
    }
    const a = xe.width - Ve, p = de.candleWidth * (1 + $e), b = Math.floor(a / p), y = Math.max(0, Math.floor(de.startIndex)), f = Math.min(s.length, y + b), e = s.slice(y, f);
    if (e.length === 0) return;
    const O = Math.floor(e.length / 2), $ = e[O];
    $ && $.time !== Ds.current && (Ds.current = $.time, be($.time));
  }, [be, s, de.startIndex, de.candleWidth, xe.width]), o.useEffect(() => {
    if (!Ee || s.length === 0 || Ee === Ds.current) return;
    let a = -1, p = 1 / 0;
    for (let A = 0; A < s.length; A++) {
      const X = Math.abs(s[A].time - Ee);
      X < p && (p = X, a = A);
    }
    if (a === -1) return;
    const b = xe.width - Ve, y = de.candleWidth * (1 + $e), f = Math.floor(b / y), e = Math.max(0, Math.floor(de.startIndex)), O = Math.min(s.length, e + f), $ = Math.floor(f / 2), U = Math.max(0, a - $), _ = a >= e && a < O, g = e + Math.floor(f / 2);
    (!_ || Math.abs(a - g) > $ / 2) && (Gs.current = !0, Dt((A) => ({
      ...A,
      startIndex: U,
      autoFollowLatest: !1
    })), Me.current.startIndex = U);
  }, [Ee, s, xe.width, de.candleWidth, de.startIndex]);
  const Ts = o.useCallback((a, p = !0) => {
    if (mt !== null && ot !== null) {
      const U = yn.current, _ = qn.current, g = ot / U, w = mt + _;
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
    const f = y - b, e = f * 0.05, O = (y + b) / 2, $ = f + e * 2;
    return {
      min: O - $ / 2,
      max: O + $ / 2,
      range: $
    };
  }, [n, mt, ot]), dt = o.useCallback((a, p) => {
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
    ].filter(($) => r?.[$]?.enabled).length, f = xe.height - yt, e = y > 0 ? Math.max(60 * y, f * Gt) : 0, O = f - e;
    return O - (a - p.min) / p.range * O;
  }, [xe.height, r, s, Gt]), dr = o.useCallback((a, p) => {
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
    ].filter(($) => r?.[$]?.enabled).length, f = xe.height - yt, e = y > 0 ? Math.max(60 * y, f * Gt) : 0, O = f - e;
    return p.max - a / O * p.range;
  }, [xe.height, r, s, Gt]), hr = o.useCallback((a, p) => {
    const b = de.candleWidth * (1 + $e);
    return (a - p) * b + b / 2;
  }, [de.candleWidth]), rl = o.useCallback((a, p) => {
    const b = de.candleWidth * (1 + $e);
    return Math.floor(a / b) + p;
  }, [de.candleWidth]), Nn = o.useCallback((a) => ku(a, h), [h]), js = o.useCallback((a) => {
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
  }, [T]), Jn = o.useCallback((a, p = !1) => {
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
  const { indicatorData: l } = ld(s, r, jt), is = o.useCallback((a = !1) => {
    const p = Sl.current;
    if (!p) return;
    const { width: b, height: y } = xe;
    Es.current || (Es.current = document.createElement("canvas"));
    const f = Es.current;
    (f.width !== p.width || f.height !== p.height) && (f.width = p.width, f.height = p.height);
    const e = f.getContext("2d");
    if (!e) return;
    const O = !1;
    e.setTransform(gn, 0, 0, gn, 0, 0);
    const $ = !!l?.rsi, U = !!l?.macd, _ = !!l?.atr, g = !!l?.stochastic, w = r?.volume?.enabled && s.some((B) => B.volume !== void 0 && B.volume > 0), A = !!l?.williamsR, X = !!l?.cci, u = !!l?.adx, N = !!l?.roc, x = !!l?.aroon, V = !!l?.momentum, d = !!l?.ao, M = !!l?.mfi, ce = !!l?.tsi, De = !!l?.trix, J = !!l?.ultimateOsc, We = !!l?.dpo, G = !!l?.kst, Pe = !!l?.stochRsi, Ke = !!l?.bbPercent, Fe = !!l?.bbWidth, ue = !!l?.histVol, Ne = !!l?.chaikinVol, et = !!l?.stdDev, Xe = !!l?.obv, Ft = !!l?.cmf, kn = !!l?.adl, Zt = !!l?.forceIndex, _l = !!l?.eom, Rt = !!l?.correlation, ds = !!l?.coppock, il = !!l?.vortex, Hl = !!l?.choppiness, Ro = !!l?.elderRay, Po = !!l?.massIndex, No = !!l?.linRegSlope, Aa = !!l?.ppo, Da = !!l?.pvo, Ba = !!l?.cmo, Wa = !!l?.fisher, Fa = !!l?.stc, Oa = !!l?.rviOsc, _a = !!l?.klinger, Ha = !!l?.connorsRsi, $a = !!l?.apo, Va = !!l?.qstick, Xa = !!l?.bop, Ya = !!l?.psychLine, za = !!l?.pfe, Ka = !!l?.smi, Ua = !!l?.ulcerIndex, qa = !!l?.natr, Ga = !!l?.trueRange, Za = !!l?.squeeze, Ja = !!l?.relVolIndex, Qa = !!l?.vhf, ei = !!l?.volumeOsc, ti = !!l?.nvi, ni = !!l?.pvi, si = !!l?.pvt, li = !!l?.vroc, oi = !!l?.netVolume, ri = !!l?.twiggsMF, ai = !!l?.linRegRSquared, ii = !!l?.gator, $l = [
      $,
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
      M,
      ce,
      De,
      J,
      We,
      G,
      Pe,
      Ke,
      Fe,
      ue,
      Ne,
      et,
      Xe,
      Ft,
      kn,
      Zt,
      _l,
      Rt,
      ds,
      // Phase 2
      il,
      Hl,
      Ro,
      Po,
      No,
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
      Ja,
      Qa,
      ei,
      ti,
      ni,
      si,
      li,
      oi,
      ri,
      ai,
      ii
    ].filter(Boolean).length + (l?.customIndicators?.filter((B) => B.display === "subplot").length || 0), wr = y - yt, Sr = $l > 0 ? Math.max(60 * $l, wr * Gt) : 0, Qn = $l > 0 ? Sr / $l : 0, Le = wr - Sr, q = b - Ve;
    e.fillStyle = te.background, e.fillRect(0, 0, b, y);
    const i = Pn(!0), mn = jt.current ? Me.current.candleWidth : de.candleWidth, Je = Ts(i.candles, de.autoFollowLatest);
    dn.current = Je, hn.current = Le;
    const Cr = jt.current ? Me.current.startIndex : de.startIndex, ci = (Cr - i.startIndex) * (mn * (1 + $e)), ge = (B, c) => {
      const j = mn * (1 + $e);
      return (B - c) * j + j / 2 - ci;
    }, rt = (B) => {
      const c = (B - Je.min) / Je.range;
      return Le - c * Le;
    }, Vl = (te.gridOpacity ?? 100) / 100;
    e.globalAlpha = Vl, e.strokeStyle = te.grid, e.lineWidth = 0.5, e.setLineDash([]);
    const ui = wo.current?.chart?.gridHorizontalLines, di = wo.current?.chart?.gridVerticalLines, hi = Ll ? ui ?? He.priceTargetLabels : He.priceTargetLabels, Xl = pa(Je.range, hi), Ir = Math.ceil(Je.min / Xl) * Xl, fi = i.startIndex + i.candles.length - 1, pi = ge(s.length - 1, i.startIndex) <= q ? q : Math.max(0, Math.min(q, ge(fi, i.startIndex) + mn / 2)), Tr = 25;
    e.beginPath();
    let jr = -1 / 0;
    for (let B = Ir; B <= Je.max; B += Xl) {
      const c = rt(B);
      Math.abs(c - jr) < Tr || (jr = c, e.moveTo(0, c), e.lineTo(pi, c));
    }
    e.stroke(), e.setLineDash([]), e.globalAlpha = 1;
    const Mr = mn * (1 + $e), Lo = Math.ceil(q / Mr), Eo = i.startIndex + Lo, xi = Ll ? di ?? He.targetLinesOnScreen : He.targetLinesOnScreen, mi = Math.max(1, Math.round(Lo / xi)), $s = Math.max(1, mi), Rr = $s / 2, bi = Lo / $s, Pr = Math.max(0, Math.min(
      1,
      (bi - 8) / 6
    )), Nr = $s / 2, Lr = He.tertiaryGridVisible ? Math.max(0, Math.min(
      0.5,
      (3 - Mr) / 1.5
    )) : 0;
    e.globalAlpha = Vl, e.strokeStyle = te.grid, e.beginPath();
    const Ao = i.startIndex;
    for (let B = Ao; B <= Eo; B += $s) {
      const c = ge(B, i.startIndex);
      if (c >= 0 && c <= q && (e.moveTo(c, 0), e.lineTo(c, Le)), c > q) break;
    }
    if (e.stroke(), Pr > 0.01 && Rr >= 1) {
      e.globalAlpha = Pr * Vl, e.strokeStyle = te.grid, e.beginPath();
      const B = i.startIndex;
      for (let c = B; c <= Eo; c += Rr) {
        if ((c - Ao) % $s === 0) continue;
        const j = ge(c, i.startIndex);
        if (j >= 0 && j <= q && (e.moveTo(j, 0), e.lineTo(j, Le)), j > q) break;
      }
      e.stroke(), e.globalAlpha = 1;
    }
    if (Lr > 0.01 && Nr >= 1) {
      e.globalAlpha = Lr * Vl, e.strokeStyle = te.grid, e.beginPath();
      const B = i.startIndex;
      for (let c = B; c <= Eo; c += Nr) {
        if ((c - Ao) % $s === 0) continue;
        const j = ge(c, i.startIndex);
        if (j >= 0 && j <= q && (e.moveTo(j, 0), e.lineTo(j, Le)), j > q) break;
      }
      e.stroke(), e.globalAlpha = 1;
    }
    e.globalAlpha = 1, e.strokeStyle = te.axisLine || te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(q, 0), e.lineTo(q, y), e.stroke(), e.save(), e.beginPath(), e.rect(0, 0, q, Le), e.clip();
    const Do = {
      ctx: e,
      chartWidth: q,
      mainChartHeight: Le,
      candles: s,
      visible: i,
      indexToX: ge,
      mainPriceToY: rt,
      currentCandleWidth: mn
    };
    if (qe && lr && wu(Do, lr), pe && Ml.length > 0 && Su(Do, Ml), xt && (xt.bids.length > 0 || xt.asks.length > 0) && Cu(Do, xt), zt) {
      const B = {
        ctx: e,
        chartWidth: q,
        mainChartHeight: Le,
        candles: s,
        visibleStartIndex: i.startIndex,
        visibleEndIndex: i.startIndex + i.candles.length,
        candleWidth: mn,
        indexToX: ge,
        isDark: ar,
        timeframe: rn
      };
      Iu(B);
    }
    const Ln = Math.max(mn * 0.7, 3), cl = Math.max(1, Ln * 0.15), Bo = qs.current, gi = s.length - 1, Ms = (B, c) => Bo && i.startIndex + B === gi && Bo.time === c.time ? Bo : c;
    if (K === "candlestick")
      fl({
        ctx: e,
        candles: i.candles,
        startIndex: i.startIndex,
        indexToX: ge,
        priceToY: rt,
        morphAt: Ms,
        candleBodyWidth: Ln,
        wickWidth: cl,
        colors: {
          bullish: te.bullish,
          bearish: te.bearish,
          bullishWick: te.bullishWick,
          bearishWick: te.bearishWick,
          bullishBorder: te.bullishBorder,
          bearishBorder: te.bearishBorder
        }
      });
    else if (K === "line")
      e.strokeStyle = te.bullish, e.lineWidth = 2, e.beginPath(), i.candles.forEach((B, c) => {
        const j = ge(i.startIndex + c, i.startIndex), v = rt(Ms(c, B).close);
        c === 0 ? e.moveTo(j, v) : e.lineTo(j, v);
      }), e.stroke();
    else if (K === "area") {
      const B = e.createLinearGradient(0, 0, 0, Le);
      if (B.addColorStop(0, "rgba(34, 197, 94, 0.4)"), B.addColorStop(1, "rgba(34, 197, 94, 0.02)"), e.beginPath(), i.candles.forEach((c, j) => {
        const v = ge(i.startIndex + j, i.startIndex), C = rt(Ms(j, c).close);
        j === 0 ? e.moveTo(v, C) : e.lineTo(v, C);
      }), i.candles.length > 0) {
        const c = ge(i.startIndex + i.candles.length - 1, i.startIndex), j = ge(i.startIndex, i.startIndex);
        e.lineTo(c, Le), e.lineTo(j, Le), e.closePath(), e.fillStyle = B, e.fill();
      }
      e.strokeStyle = te.bullish, e.lineWidth = 2, e.beginPath(), i.candles.forEach((c, j) => {
        const v = ge(i.startIndex + j, i.startIndex), C = rt(Ms(j, c).close);
        j === 0 ? e.moveTo(v, C) : e.lineTo(v, C);
      }), e.stroke();
    } else if (K === "heikin_ashi") {
      let B = i.candles[0]?.open || 0, c = i.candles[0]?.close || 0;
      const j = i.candles.map((v, C) => {
        const k = (v.open + v.high + v.low + v.close) / 4, L = C === 0 ? (v.open + v.close) / 2 : (B + c) / 2, W = Math.max(v.high, L, k), F = Math.min(v.low, L, k), E = { time: v.time, open: L, high: W, low: F, close: k, volume: v.volume };
        return B = L, c = k, E;
      });
      fl({
        ctx: e,
        candles: j,
        startIndex: i.startIndex,
        indexToX: ge,
        priceToY: rt,
        morphAt: (v, C) => j[v],
        candleBodyWidth: Ln,
        wickWidth: cl,
        colors: {
          bullish: te.bullish,
          bearish: te.bearish,
          bullishWick: te.bullishWick,
          bearishWick: te.bearishWick,
          bullishBorder: te.bullishBorder,
          bearishBorder: te.bearishBorder
        }
      });
    } else if (K === "tpo") {
      const c = /* @__PURE__ */ new Map();
      i.candles.forEach((v) => {
        const C = Math.floor(v.time / 18e5) * 18e5, k = c.get(C);
        k ? (k.high = Math.max(k.high, v.high), k.low = Math.min(k.low, v.low), k.count++) : c.set(C, { high: v.high, low: v.low, count: 1 });
      });
      let j = 0;
      c.forEach((v) => {
        const C = ge(i.startIndex + j, i.startIndex), k = rt(v.high), L = rt(v.low);
        e.fillStyle = "#21b3a4", e.globalAlpha = 0.25, e.fillRect(C - Ln / 2, k, Ln, Math.max(2, L - k)), e.globalAlpha = 1, j++;
      }), e.globalAlpha = 0.3, fl({
        ctx: e,
        candles: i.candles,
        startIndex: i.startIndex,
        indexToX: ge,
        priceToY: rt,
        morphAt: Ms,
        candleBodyWidth: Ln,
        wickWidth: cl,
        colors: {
          bullish: te.bullish,
          bearish: te.bearish,
          bullishWick: te.bullishWick,
          bearishWick: te.bearishWick,
          bullishBorder: te.bullishBorder,
          bearishBorder: te.bearishBorder
        }
      }), e.globalAlpha = 1;
    } else if (K === "footprint_cluster" || K === "footprint_profile")
      fl({
        ctx: e,
        candles: i.candles,
        startIndex: i.startIndex,
        indexToX: ge,
        priceToY: rt,
        morphAt: Ms,
        candleBodyWidth: Ln,
        wickWidth: cl,
        colors: {
          bullish: te.bullish,
          bearish: te.bearish,
          bullishWick: te.bullishWick,
          bearishWick: te.bearishWick,
          bullishBorder: te.bullishBorder,
          bearishBorder: te.bearishBorder
        }
      }), e.font = "8px monospace", e.fillStyle = "#e8e8e8", i.candles.forEach((B, c) => {
        const j = ge(i.startIndex + c, i.startIndex), v = rt(B.close), C = B.volume || 0;
        if (C > 0) {
          const k = Math.round(C * 0.55), L = Math.round(C * 0.45);
          e.fillText(`${k}/${L}`, j - 12, v - 8);
        }
      });
    else if (K === "flow_positioning")
      fl({
        ctx: e,
        candles: i.candles,
        startIndex: i.startIndex,
        indexToX: ge,
        priceToY: rt,
        morphAt: Ms,
        candleBodyWidth: Ln,
        wickWidth: cl,
        colors: {
          bullish: te.bullish,
          bearish: te.bearish,
          bullishWick: te.bullishWick,
          bearishWick: te.bearishWick,
          bullishBorder: te.bullishBorder,
          bearishBorder: te.bearishBorder
        }
      }), e.strokeStyle = "#d0d0d0", e.lineWidth = 1, i.candles.forEach((B, c) => {
        if (c % 5 !== 0) return;
        const j = ge(i.startIndex + c, i.startIndex), v = B.close > B.open, C = rt(B.close);
        e.beginPath(), e.moveTo(j, C), e.lineTo(j, C + (v ? -12 : 12)), e.stroke(), e.fillStyle = v ? "#21b3a4" : "#f0426c", e.beginPath(), e.arc(j, C + (v ? -14 : 14), 2, 0, Math.PI * 2), e.fill();
      });
    else if (K === "renko") {
      const B = Je.range * 0.02, c = [];
      let j = i.candles[0]?.close || 0, v = 0;
      i.candles.forEach((C) => {
        const k = C.close - j, L = Math.floor(Math.abs(k) / B);
        for (let W = 0; W < L; W++) {
          const F = k > 0, E = j, S = F ? j + B : j - B;
          c.push({
            x: v * Ln * 1.2,
            isBullish: F,
            top: rt(Math.max(E, S)),
            bottom: rt(Math.min(E, S))
          }), j = S, v++;
        }
      }), c.forEach((C) => {
        const k = Math.abs(C.bottom - C.top);
        e.fillStyle = C.isBullish ? te.bullish : te.bearish, e.fillRect(C.x, C.top, Ln, k), e.strokeStyle = C.isBullish ? te.bullishBorder : te.bearishBorder, e.lineWidth = 1, e.strokeRect(C.x, C.top, Ln, k);
      });
    }
    if (w) {
      const B = Le * 0.2, c = Le, j = c - B, v = i.candles.map((L) => L.volume ?? 0).filter((L) => L > 0), C = v.length > 0 ? Math.max(...v) : 1, k = Math.max(2, mn * 0.7);
      i.candles.forEach((L, W) => {
        const F = L.volume ?? 0;
        if (F > 0) {
          const E = i.startIndex + W, S = ge(E, i.startIndex), P = F / C * B * 0.95, H = c - P, Z = L.close >= L.open, he = r?.volume?.upColor || "#26a69a", z = r?.volume?.downColor || "#ef5350", Y = Z ? he : z, oe = parseInt(Y.slice(1, 3), 16), me = parseInt(Y.slice(3, 5), 16), we = parseInt(Y.slice(5, 7), 16);
          e.fillStyle = `rgba(${oe}, ${me}, ${we}, 0.45)`, e.fillRect(S - k / 2, H, k, P), e.strokeStyle = `rgba(${oe}, ${me}, ${we}, 0.7)`, e.lineWidth = 1, e.beginPath(), e.moveTo(S - k / 2, H), e.lineTo(S + k / 2, H), e.stroke();
        }
      }), It === "volume" && (e.save(), i.candles.forEach((W, F) => {
        const E = W.volume ?? 0;
        if (E <= 0) return;
        const S = i.candles[F - 1]?.volume ?? 0, R = i.candles[F + 1]?.volume ?? 0;
        if (E < S || E < R) return;
        const P = i.startIndex + F, H = ge(P, i.startIndex), he = E / C * B * 0.95, z = c - he;
        e.beginPath(), e.arc(H, z, 2.5 + 1, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc(H, z, 2.5, 0, Math.PI * 2);
        const Y = W.close >= W.open;
        e.fillStyle = Y ? r?.volume?.upColor || "#26a69a" : r?.volume?.downColor || "#ef5350", e.fill();
      }), e.restore()), nn.current.volume = { top: j, bottom: c };
    }
    if (e.restore(), r) {
      if (r.ema?.enabled && l?.ema && r.ema.periods?.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, q, Le), e.clip();
        const c = ar ? ["#D1D4DC", "#A0A4B0", "#B2B5BE", "#9598A1", "#787B86"] : ["#363A45", "#5D606B", "#434651", "#787B86", "#9598A1"];
        r.ema.periods.forEach((j, v) => {
          const C = l.ema[v];
          if (!C) return;
          e.strokeStyle = c[v % c.length], e.lineWidth = 1.5, e.beginPath();
          let k = !1;
          i.candles.forEach((L, W) => {
            const F = i.startIndex + W, E = C[F];
            if (!isNaN(E) && isFinite(E)) {
              const S = ge(F, i.startIndex), R = dt(E, Je);
              k ? e.lineTo(S, R) : (e.moveTo(S, R), k = !0);
            }
          }), e.stroke();
        }), e.restore();
      }
      if (l?.movingAverages && l.movingAverages.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, q, Le), e.clip();
        const c = r?.movingAverages?.lineWidth ?? 1.5;
        l.movingAverages.forEach((j) => {
          e.strokeStyle = j.color, e.lineWidth = c, e.beginPath();
          let v = !1;
          i.candles.forEach((C, k) => {
            const L = i.startIndex + k, W = j.data[L];
            if (!isNaN(W) && isFinite(W)) {
              const F = ge(L, i.startIndex), E = dt(W, Je);
              v ? e.lineTo(F, E) : (e.moveTo(F, E), v = !0);
            }
          }), e.stroke();
        }), e.restore();
      }
      if (r.bollinger?.enabled && l?.bollinger) {
        const c = l.bollinger;
        e.save(), e.beginPath(), e.rect(0, 0, q, Le), e.clip();
        const j = r.bollinger.lineWidth || 1, v = r.bollinger.upperColor || "#9B59B6", C = r.bollinger.middleColor || "#9B59B6", k = r.bollinger.lowerColor || "#9B59B6";
        e.strokeStyle = v, e.lineWidth = j, e.setLineDash([3, 3]), e.beginPath();
        let L = !1;
        i.candles.forEach((W, F) => {
          const E = i.startIndex + F, S = c.upper[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ge(E, i.startIndex), P = dt(S, Je);
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.strokeStyle = C, e.lineWidth = j, e.setLineDash([]), e.beginPath(), L = !1, i.candles.forEach((W, F) => {
          const E = i.startIndex + F, S = c.middle[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ge(E, i.startIndex), P = dt(S, Je);
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.strokeStyle = k, e.lineWidth = j, e.setLineDash([3, 3]), e.beginPath(), L = !1, i.candles.forEach((W, F) => {
          const E = i.startIndex + F, S = c.lower[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ge(E, i.startIndex), P = dt(S, Je);
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.setLineDash([]), e.restore();
      }
      if (l?.vwap) {
        e.save(), e.beginPath(), e.rect(0, 0, q, Le), e.clip(), e.strokeStyle = r?.vwap?.color || "#2196F3", e.lineWidth = 2, e.beginPath();
        let c = !1;
        i.candles.forEach((j, v) => {
          const C = i.startIndex + v, k = l.vwap[C];
          if (!isNaN(k) && isFinite(k)) {
            const L = ge(C, i.startIndex), W = dt(k, Je);
            c ? e.lineTo(L, W) : (e.moveTo(L, W), c = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (l?.ichimoku) {
        e.save(), e.beginPath(), e.rect(0, 0, q, Le), e.clip();
        const c = l.ichimoku, j = r?.ichimoku?.tenkanColor || "#0496ff", v = r?.ichimoku?.kijunColor || "#ff0000", C = r?.ichimoku?.cloudUpColor || "rgba(0, 255, 0, 0.2)", k = r?.ichimoku?.cloudDownColor || "rgba(255, 0, 0, 0.2)";
        for (let W = 0; W < i.candles.length; W++) {
          const F = i.startIndex + W, E = c.senkouA[F], S = c.senkouB[F];
          if (!isNaN(E) && !isNaN(S) && isFinite(E) && isFinite(S)) {
            const R = ge(F, i.startIndex), P = dt(E, Je), H = dt(S, Je);
            e.fillStyle = E >= S ? C : k;
            const Z = mn * (1 + $e);
            e.fillRect(R - Z / 2, Math.min(P, H), Z, Math.abs(P - H));
          }
        }
        e.strokeStyle = j, e.lineWidth = 1.5, e.beginPath();
        let L = !1;
        i.candles.forEach((W, F) => {
          const E = i.startIndex + F, S = c.tenkan[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ge(E, i.startIndex), P = dt(S, Je);
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.strokeStyle = v, e.lineWidth = 1.5, e.beginPath(), L = !1, i.candles.forEach((W, F) => {
          const E = i.startIndex + F, S = c.kijun[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ge(E, i.startIndex), P = dt(S, Je);
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (l?.parabolicSAR) {
        e.save(), e.beginPath(), e.rect(0, 0, q, Le), e.clip();
        const c = l.parabolicSAR, j = r?.parabolicSAR?.bullishColor || "#22c55e", v = r?.parabolicSAR?.bearishColor || "#ef4444";
        i.candles.forEach((C, k) => {
          const L = i.startIndex + k, W = c.sar[L], F = c.direction[L];
          if (!isNaN(W) && isFinite(W)) {
            const E = ge(L, i.startIndex), S = dt(W, Je);
            e.fillStyle = F > 0 ? j : v, e.beginPath(), e.arc(E, S, 2.5, 0, Math.PI * 2), e.fill();
          }
        }), e.restore();
      }
      if (l?.keltner) {
        e.save(), e.beginPath(), e.rect(0, 0, q, Le), e.clip();
        const c = l.keltner, j = r?.keltner?.upperColor || "#FF9800", v = r?.keltner?.middleColor || "#FF9800", C = r?.keltner?.lowerColor || "#FF9800";
        e.strokeStyle = j, e.lineWidth = 1, e.setLineDash([3, 3]), e.beginPath();
        let k = !1;
        i.candles.forEach((L, W) => {
          const F = i.startIndex + W, E = c.upper[F];
          if (!isNaN(E) && isFinite(E)) {
            const S = ge(F, i.startIndex), R = dt(E, Je);
            k ? e.lineTo(S, R) : (e.moveTo(S, R), k = !0);
          }
        }), e.stroke(), e.strokeStyle = v, e.setLineDash([]), e.beginPath(), k = !1, i.candles.forEach((L, W) => {
          const F = i.startIndex + W, E = c.middle[F];
          if (!isNaN(E) && isFinite(E)) {
            const S = ge(F, i.startIndex), R = dt(E, Je);
            k ? e.lineTo(S, R) : (e.moveTo(S, R), k = !0);
          }
        }), e.stroke(), e.strokeStyle = C, e.setLineDash([3, 3]), e.beginPath(), k = !1, i.candles.forEach((L, W) => {
          const F = i.startIndex + W, E = c.lower[F];
          if (!isNaN(E) && isFinite(E)) {
            const S = ge(F, i.startIndex), R = dt(E, Je);
            k ? e.lineTo(S, R) : (e.moveTo(S, R), k = !0);
          }
        }), e.stroke(), e.setLineDash([]), e.restore();
      }
      if (l?.pivotPoints) {
        e.save(), e.beginPath(), e.rect(0, 0, q, Le), e.clip();
        const c = l.pivotPoints, j = r?.pivotPoints?.pivotColor || "#FFEB3B", v = r?.pivotPoints?.resistanceColor || "#ef4444", C = r?.pivotPoints?.supportColor || "#22c55e", k = (L, W, F, E = []) => {
          const S = L.filter((R) => !isNaN(R) && isFinite(R)).pop();
          if (S !== void 0) {
            const R = dt(S, Je);
            e.strokeStyle = W, e.lineWidth = 1, e.setLineDash(E), e.beginPath(), e.moveTo(0, R), e.lineTo(q, R), e.stroke(), e.fillStyle = W, e.font = Vt, e.textAlign = "left", e.fillText(F, 5, R - 3);
          }
        };
        e.setLineDash([]), k(c.pivot, j, "P"), k(c.r1, v, "R1", [2, 2]), k(c.r2, v, "R2", [4, 2]), k(c.r3, v, "R3", [6, 2]), k(c.s1, C, "S1", [2, 2]), k(c.s2, C, "S2", [4, 2]), k(c.s3, C, "S3", [6, 2]), e.setLineDash([]), e.restore();
      }
      if (l?.supertrend) {
        e.save(), e.beginPath(), e.rect(0, 0, q, Le), e.clip();
        const c = l.supertrend, j = r?.supertrend?.bullishColor || "#22c55e", v = r?.supertrend?.bearishColor || "#ef4444";
        e.lineWidth = r?.supertrend?.lineWidth || 2, i.candles.forEach((C, k) => {
          const L = i.startIndex + k, W = c.supertrend[L];
          if (isNaN(W) || !isFinite(W)) return;
          const F = ge(L, i.startIndex), E = dt(W, Je), S = L - 1;
          S >= 0 && !isNaN(c.supertrend[S]) && (e.strokeStyle = c.direction[L] === 1 ? j : v, e.beginPath(), e.moveTo(ge(S, i.startIndex), dt(c.supertrend[S], Je)), e.lineTo(F, E), e.stroke());
        }), e.restore();
      }
      if (l?.donchian) {
        e.save(), e.beginPath(), e.rect(0, 0, q, Le), e.clip();
        const c = l.donchian, j = (v, C, k = []) => {
          e.strokeStyle = C, e.lineWidth = r?.donchian?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let L = !1;
          i.candles.forEach((W, F) => {
            const E = i.startIndex + F, S = v[E];
            if (!isNaN(S) && isFinite(S)) {
              const R = ge(E, i.startIndex), P = dt(S, Je);
              L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        j(c.upper, r?.donchian?.upperColor || "#2196F3"), j(c.middle, r?.donchian?.middleColor || "#FFC107", [4, 4]), j(c.lower, r?.donchian?.lowerColor || "#2196F3"), e.restore();
      }
      if (l?.envelopes) {
        e.save(), e.beginPath(), e.rect(0, 0, q, Le), e.clip();
        const c = l.envelopes, j = (v, C, k = []) => {
          e.strokeStyle = C, e.lineWidth = r?.envelopes?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let L = !1;
          i.candles.forEach((W, F) => {
            const E = i.startIndex + F, S = v[E];
            if (!isNaN(S) && isFinite(S)) {
              const R = ge(E, i.startIndex);
              L ? e.lineTo(R, dt(S, Je)) : (e.moveTo(R, dt(S, Je)), L = !0);
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
        const v = l?.[c];
        if (!v) return;
        e.save(), e.beginPath(), e.rect(0, 0, q, Le), e.clip(), e.strokeStyle = r?.[c]?.color || j, e.lineWidth = r?.[c]?.lineWidth || 2, e.beginPath();
        let C = !1;
        i.candles.forEach((k, L) => {
          const W = i.startIndex + L, F = v[W];
          if (!isNaN(F) && isFinite(F)) {
            const E = ge(W, i.startIndex), S = dt(F, Je);
            C ? e.lineTo(E, S) : (e.moveTo(E, S), C = !0);
          }
        }), e.stroke(), e.restore();
      }), l?.linearReg) {
        e.save(), e.beginPath(), e.rect(0, 0, q, Le), e.clip();
        const c = l.linearReg, j = (v, C, k = []) => {
          e.strokeStyle = C, e.lineWidth = r?.linearReg?.lineWidth || 1, e.setLineDash(k), e.beginPath();
          let L = !1;
          i.candles.forEach((W, F) => {
            const E = i.startIndex + F, S = v[E];
            if (!isNaN(S) && isFinite(S)) {
              const R = ge(E, i.startIndex);
              L ? e.lineTo(R, dt(S, Je)) : (e.moveTo(R, dt(S, Je)), L = !0);
            }
          }), e.stroke(), e.setLineDash([]);
        };
        j(c.upper, r?.linearReg?.upperColor || "#81D4FA"), j(c.middle, r?.linearReg?.middleColor || "#29B6F6", [4, 4]), j(c.lower, r?.linearReg?.lowerColor || "#81D4FA"), e.restore();
      }
      if (l?.fibRetracement) {
        e.save(), e.beginPath(), e.rect(0, 0, q, Le), e.clip();
        const c = l.fibRetracement, j = r?.fibRetracement?.color || "#FFD54F", v = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
        c.levels.forEach((C, k) => {
          const L = dt(C, Je);
          e.strokeStyle = j, e.lineWidth = r?.fibRetracement?.lineWidth || 1, e.setLineDash(k === 0 || k === 6 ? [] : [4, 3]), e.beginPath(), e.moveTo(0, L), e.lineTo(q, L), e.stroke(), e.fillStyle = j, e.font = Vt, e.textAlign = "left", e.fillText(`${(v[k] * 100).toFixed(1)}% (${C.toFixed(2)})`, 5, L - 3);
        }), e.setLineDash([]), e.restore();
      }
      if (l?.camarillaPivots) {
        e.save(), e.beginPath(), e.rect(0, 0, q, Le), e.clip();
        const c = l.camarillaPivots, j = r?.camarillaPivots?.resistanceColor || "#ef4444", v = r?.camarillaPivots?.supportColor || "#22c55e", C = (k, L, W) => {
          const F = k.filter((E) => !isNaN(E) && isFinite(E)).pop();
          if (F !== void 0) {
            const E = dt(F, Je);
            e.strokeStyle = L, e.lineWidth = r?.camarillaPivots?.lineWidth || 1, e.setLineDash([3, 3]), e.beginPath(), e.moveTo(0, E), e.lineTo(q, E), e.stroke(), e.fillStyle = L, e.font = Vt, e.textAlign = "left", e.fillText(W, 5, E - 3);
          }
        };
        C(c.h4, j, "H4"), C(c.h3, j, "H3"), C(c.l3, v, "L3"), C(c.l4, v, "L4"), e.setLineDash([]), e.restore();
      }
      if (l?.woodiePivots) {
        e.save(), e.beginPath(), e.rect(0, 0, q, Le), e.clip();
        const c = l.woodiePivots, j = r?.woodiePivots?.pivotColor || "#FFEB3B", v = r?.woodiePivots?.resistanceColor || "#ef4444", C = r?.woodiePivots?.supportColor || "#22c55e", k = (L, W, F) => {
          const E = L.filter((S) => !isNaN(S) && isFinite(S)).pop();
          if (E !== void 0) {
            const S = dt(E, Je);
            e.strokeStyle = W, e.lineWidth = r?.woodiePivots?.lineWidth || 1, e.setLineDash([3, 3]), e.beginPath(), e.moveTo(0, S), e.lineTo(q, S), e.stroke(), e.fillStyle = W, e.font = Vt, e.textAlign = "left", e.fillText(F, 5, S - 3);
          }
        };
        k(c.pivot, j, "WP"), k(c.r1, v, "WR1"), k(c.r2, v, "WR2"), k(c.s1, C, "WS1"), k(c.s2, C, "WS2"), e.setLineDash([]), e.restore();
      }
      if (l?.volumeSma && w) {
        e.save();
        const c = l.volumeSma, j = Le * 0.2, v = Le, C = i.candles.map((W) => W.volume || 0), k = Math.max(...C, 1);
        e.strokeStyle = r?.volumeSma?.color || "#FF9800", e.lineWidth = 1.5, e.beginPath();
        let L = !1;
        i.candles.forEach((W, F) => {
          const E = i.startIndex + F, S = c[E];
          if (!isNaN(S) && isFinite(S)) {
            const R = ge(E, i.startIndex), P = v - S / k * j;
            L ? e.lineTo(R, P) : (e.moveTo(R, P), L = !0);
          }
        }), e.stroke(), e.restore();
      }
      if (r?.volumeProfile?.enabled && i.candles.length > 0) {
        e.save(), e.beginPath(), e.rect(0, 0, q, Le), e.clip();
        const c = r.volumeProfile.numberOfRows ?? 48, j = q * ((r.volumeProfile.rowWidth ?? 15) / 100), v = (r.volumeProfile.opacity ?? 60) / 100, C = r.volumeProfile.upColor || "#D97706", k = r.volumeProfile.downColor || "#1E3A8A", L = r.volumeProfile.pocColor || "#10B981", W = r.volumeProfile.lookbackBars ?? 0, F = W > 0 ? i.candles.slice(-W) : i.candles;
        let E = 1 / 0, S = -1 / 0;
        F.forEach((z) => {
          E = Math.min(E, z.low), S = Math.max(S, z.high);
        });
        const P = (S - E || 1) / c, H = [];
        for (let z = 0; z < c; z++)
          H.push({
            priceLevel: E + (z + 0.5) * P,
            upVolume: 0,
            downVolume: 0,
            totalVolume: 0
          });
        F.forEach((z) => {
          if (!z.volume || z.volume <= 0) return;
          const Y = z.low, oe = z.high, me = oe - Y, we = z.close >= z.open;
          for (let se = 0; se < c; se++) {
            const Ie = E + se * P, Te = Ie + P;
            if (oe >= Ie && Y <= Te) {
              const Ue = Math.max(Y, Ie), ht = Math.min(oe, Te), pt = me > 0 ? (ht - Ue) / me : 1, Et = z.volume * pt;
              we ? H[se].upVolume += Et : H[se].downVolume += Et, H[se].totalVolume += Et;
            }
          }
        });
        let Z = 0, he = 0;
        if (H.forEach((z, Y) => {
          z.totalVolume > Z && (Z = z.totalVolume, he = Y);
        }), Z > 0) {
          const z = Le / c * 0.85;
          H.forEach((Y, oe) => {
            if (Y.totalVolume <= 0) return;
            const me = rt(Y.priceLevel) - z / 2, we = Y.totalVolume / Z * j, se = Y.totalVolume > 0 ? Y.upVolume / Y.totalVolume * we : 0, Ie = we - se, Te = oe === he, Ue = q - we;
            se > 0 && (e.globalAlpha = Te ? Math.min(v + 0.2, 1) : v, e.fillStyle = C, e.fillRect(Ue, me, se, z)), Ie > 0 && (e.globalAlpha = Te ? 0.95 : 0.85, e.fillStyle = k, e.fillRect(Ue + se, me, Ie, z)), Te && (e.globalAlpha = 0.9, e.strokeStyle = L, e.lineWidth = 1.5, e.strokeRect(Ue, me, we, z));
          }), e.globalAlpha = 1, It === "volumeProfile" && H.forEach((oe, me) => {
            if (oe.totalVolume <= 0) return;
            const we = rt(oe.priceLevel), se = oe.totalVolume / Z * j, Ie = q - se;
            e.beginPath(), e.arc(Ie, we, 2.5 + 1, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc(Ie, we, 2.5, 0, Math.PI * 2), e.fillStyle = oe.upVolume >= oe.downVolume ? C : k, e.fill();
          });
        }
        e.restore(), e.restore();
      }
    }
    const Vs = [], Rs = [];
    let Yl = "", Wo = "", ul = 14, Fo = 0, Oo = 0;
    const vi = gs?.current && gs.current.length > 0;
    if (bs && !vi && ts) {
      const B = ts.find((c) => c.id === bs);
      if (B && B.points && B.points.length > 0) {
        e.save();
        const c = He.badgeFont, j = "#2962ff", v = "rgba(41, 98, 255, 0.2)", C = He.badgePadding, k = He.badgeRowHeight, L = Ve - 6, W = q + 3, F = xe.height - yt, E = F + (yt - k) / 2;
        if (Yl = c, Wo = j, ul = k, Fo = E, Oo = W, B.points.forEach((S) => {
          let R = null, P = null;
          if (S.price !== void 0 && (P = rt(S.price), P >= 0 && P <= Le)) {
            const H = Nn(S.price), Z = e.measureText(H).width, he = Math.min(Z + C * 2, L), z = P - k / 2;
            Rs.push({
              pos: P,
              text: H,
              bWidth: he,
              topOrigin: z
            });
          }
          if (S.time !== void 0) {
            let H = -1;
            if (s.length > 0) {
              const Z = s[0].time, he = s[s.length - 1].time, z = s.length > 1 ? s[1].time - s[0].time : 6e4;
              if (S.time > he) H = s.length - 1 + (S.time - he) / z;
              else if (S.time < Z) H = (S.time - Z) / z;
              else {
                let Y = 0, oe = s.length - 1;
                for (; Y <= oe; ) {
                  const me = Math.floor((Y + oe) / 2);
                  if (s[me].time === S.time) {
                    H = me;
                    break;
                  }
                  s[me].time < S.time ? Y = me + 1 : oe = me - 1;
                }
                if (H === -1) {
                  const me = Y, we = me - 1;
                  if (we >= 0 && me < s.length) {
                    const se = s[we], Ie = s[me], Te = (S.time - se.time) / (Ie.time - se.time);
                    H = we + Te;
                  } else
                    H = Y;
                }
              }
            }
            if (H !== -1) {
              const Z = Me.current.startIndex, z = Me.current.candleWidth * (1 + $e), Y = Math.floor(Z), oe = (Z - Y) * z;
              R = (H - Y) * z + z / 2 - oe;
            }
            if (R !== null && R >= 0 && R <= q) {
              const Z = `${fr(S.time)} ${Jn(S.time, !0)}  ${js(S.time)}`, z = e.measureText(Z).width + C * 2;
              let Y = R - z / 2;
              Y < 0 && (Y = 0), Y + z > q && (Y = q - z), Vs.push({
                pos: R,
                text: Z,
                bWidth: z,
                topOrigin: Y
              });
            }
          }
        }), (B.type === "long" || B.type === "short") && B.stopLoss) {
          const S = B.stopLoss.price, R = rt(S);
          if (R >= 0 && R <= Le) {
            e.font = Yl || c;
            const P = Nn(S), H = e.measureText(P).width, Z = Math.min(H + C * 2, L), he = R - k / 2;
            Rs.push({
              pos: R,
              text: P,
              bWidth: Z,
              topOrigin: he
            });
          }
        }
        if (Vs.length >= 2) {
          const S = Math.min(...Vs.map((P) => P.pos)), R = Math.max(...Vs.map((P) => P.pos));
          R > S && (e.fillStyle = v, e.fillRect(S, F, R - S, yt));
        }
        if (Rs.length >= 2) {
          const S = Math.min(...Rs.map((P) => P.pos)), R = Math.max(...Rs.map((P) => P.pos));
          R > S && (e.fillStyle = v, e.fillRect(W - 3, S, Ve, R - S));
        }
        e.restore();
      }
    }
    e.fillStyle = te.axisLabel || "#787b86", e.font = El, e.textBaseline = "middle", e.textAlign = He.priceLabelAlign;
    const yi = He.priceLabelAlign === "right" ? b - (An !== void 0 ? An : $o) - 4 : q + 2;
    let Er = -1 / 0;
    for (let B = Ir; B <= Je.max; B += Xl) {
      const c = rt(B);
      if (c >= 10 && c <= Le - 10) {
        if (Math.abs(c - Er) < Tr) continue;
        Er = c, e.fillText(Nn(B), yi, c);
      }
    }
    const Jt = n != null && !Number.isNaN(n) ? n : i.candles.length ? i.candles[i.candles.length - 1].close : null;
    if (Jt != null && !Number.isNaN(Jt) && !Tt) {
      const B = rt(Jt);
      if (B >= 0 && B <= Le) {
        e.save();
        const c = i.candles.length >= 2 ? i.candles[i.candles.length - 2] : null, j = i.candles.length >= 1 ? i.candles[i.candles.length - 1] : null, v = c ? c.close : j ? j.open : Jt, C = Jt >= v, k = te.priceTickerBullish || te.bullish, L = te.priceTickerBearish || te.bearish, W = C ? k : L, F = (Vn) => {
          const ln = Vn.replace("#", ""), _t = parseInt(ln.substring(0, 2), 16), bn = parseInt(ln.substring(2, 4), 16), Qt = parseInt(ln.substring(4, 6), 16);
          return `${_t}, ${bn}, ${Qt}`;
        }, E = F(te.textDim || "#666666"), S = `rgba(${E}, 0.35)`, R = `rgba(${E}, 0.9)`, P = F(W).split(",").map(Number), H = (0.299 * P[0] + 0.587 * P[1] + 0.114 * P[2]) / 255, Z = Number.isNaN(H) || H <= 0.55 ? "#ffffff" : "#000000", he = i.candles.length - 1, z = i.candles.length > 0 ? ge(i.startIndex + he, i.startIndex) : 0;
        z > 0 && (e.strokeStyle = S, e.lineWidth = 1, e.setLineDash([4, 4]), e.beginPath(), e.moveTo(0, B), e.lineTo(z, B), e.stroke(), e.setLineDash([])), e.strokeStyle = R, e.lineWidth = 1, e.setLineDash([4, 3]), e.beginPath(), e.moveTo(z, B), e.lineTo(q, B), e.stroke(), e.setLineDash([]);
        const Y = Nn(Jt), oe = El, me = He.liveCountdownFont;
        e.font = oe;
        const se = e.measureText(Y).width, Ie = He.livePriceLabelPadding, Te = He.livePriceRowHeight, Ue = I && I.length > 0, ht = Ue ? He.countdownRowHeight : 0, pt = Te + ht;
        let Et = 0;
        Ue && (e.font = me, Et = e.measureText(I).width);
        const wn = Ve - 6, En = Math.max(se, Et) + Ie * 2, Pt = Math.min(En, wn), At = q + 3, kt = B - Te / 2;
        e.fillStyle = te.background, e.fillRect(At - 1, kt - 1, Pt + 2, pt + 2), e.fillStyle = W, e.beginPath(), e.roundRect(At, kt, Pt, pt, 3), e.fill(), e.fillStyle = Z, e.font = oe, e.textAlign = "center", e.textBaseline = "middle", e.fillText(Y, At + Pt / 2, kt + Te / 2), Ue && (e.strokeStyle = Z === "#ffffff" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)", e.lineWidth = 0.5, e.beginPath(), e.moveTo(At + 3, kt + Te), e.lineTo(At + Pt - 3, kt + Te), e.stroke(), e.fillStyle = Z === "#ffffff" ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)", e.font = me, e.textAlign = "center", e.textBaseline = "middle", e.fillText(I, At + Pt / 2, kt + Te + ht / 2)), e.restore();
      }
    }
    if (ts && ts.length > 0) {
      e.save();
      const B = El;
      e.font = B;
      const c = He.badgePadding, j = He.badgeRowHeight, v = [], C = [];
      ts.forEach((R) => {
        if ((R.type === "horizontalRay" || R.type === "horizontal") && R.points.length > 0) {
          const P = R.points[0].price;
          v.push({ price: P, color: R.color || "#2196f3", yPos: rt(P) });
        } else if ((R.type === "long" || R.type === "short") && R.points.length >= 2) {
          if (R.id === bs) return;
          const P = R.points[0].price, H = R.points[1].price;
          if (v.push({ price: P, color: "#4b5563", yPos: rt(P) }), v.push({ price: H, color: "#22c55e", yPos: rt(H) }), R.stopLoss) {
            const Z = R.stopLoss.price;
            v.push({ price: Z, color: "#ef4444", yPos: rt(Z) });
          }
        }
      });
      let k = -9999, L = -9999;
      if (Jt != null && !Number.isNaN(Jt)) {
        const R = rt(Jt), P = He.livePriceRowHeight + (I && I.length > 0 ? He.countdownRowHeight : 0);
        k = R - He.livePriceRowHeight / 2, L = k + P;
      }
      const W = 2, F = Ve - 6, E = q + 3;
      v.sort((R, P) => R.yPos - P.yPos);
      let S = -9999;
      v.forEach((R) => {
        let P = R.yPos - j / 2, H = P + j;
        if (P < S + W && (P = S + W, H = P + j), P < L + W && H > k - W && (P = L + W, H = P + j), S = H, P >= 0 && H <= Le) {
          const Z = Nn(R.price), he = e.measureText(Z).width, z = Math.min(he + c * 2, F);
          e.fillStyle = R.color, e.beginPath(), e.roundRect(E, P, z, j, 3), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.fillText(Z, E + z / 2, P + j / 2);
        }
      }), e.font = He.alertFlagFont, C.forEach((R) => {
        if (R.xPos >= 0 && R.xPos <= q) {
          const P = Jn(R.time, !0) + " " + js(R.time), Z = e.measureText(P).width + c * 2, z = xe.height - yt + (yt - j) / 2;
          let Y = R.xPos - Z / 2;
          Y < 0 && (Y = 0), Y + Z > q && (Y = q - Z), e.fillStyle = R.color, e.beginPath(), e.roundRect(Y, z, Z, j, 3), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.fillText(P, Y + Z / 2, z + j / 2);
        }
      }), e.restore();
    }
    if (Tt && Jt !== null && Jt !== void 0 && !Number.isNaN(Jt)) {
      const B = Nt != null && on != null && Number.isFinite(Nt) && Number.isFinite(on), c = B ? Nt : Jt, j = B ? on : Jt + rd(h || ""), v = rt(c), C = rt(j);
      if (e.save(), v >= 0 && v <= Le) {
        e.strokeStyle = "#1976d2", e.lineWidth = 1, e.setLineDash([3, 4]), e.beginPath(), e.moveTo(0, v), e.lineTo(q, v), e.stroke(), e.setLineDash([]);
        const k = Nn(c);
        e.font = He.alertCountFont;
        const W = e.measureText(k).width + 12, F = 16, E = q + 2;
        e.fillStyle = "#1976d2", e.beginPath(), e.roundRect(E, v - F / 2, Math.min(W, Ve - 4), F, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "left", e.textBaseline = "middle", e.fillText(k, E + 6, v);
      }
      if (C >= 0 && C <= Le) {
        e.strokeStyle = "#d32f2f", e.lineWidth = 1, e.setLineDash([3, 4]), e.beginPath(), e.moveTo(0, C), e.lineTo(q, C), e.stroke(), e.setLineDash([]);
        const k = Nn(j);
        e.font = He.alertCountFont;
        const W = e.measureText(k).width + 12, F = 16, E = q + 2;
        e.fillStyle = "#d32f2f", e.beginPath(), e.roundRect(E, C - F / 2, Math.min(W, Ve - 4), F, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "left", e.textBaseline = "middle", e.fillText(k, E + 6, C);
      }
      v >= 0 && C >= 0 && v <= Le && C <= Le && (e.fillStyle = "rgba(148, 163, 184, 0.04)", e.fillRect(0, Math.min(C, v), q, Math.abs(v - C))), e.restore();
    }
    if (ze && ze.length > 0) {
      const B = {
        ctx: e,
        chartWidth: q,
        mainChartHeight: Le,
        mainPriceToY: rt,
        formatPrice: Nn,
        colors: {
          slColor: te.slColor,
          slOpacity: te.slOpacity,
          tpColor: te.tpColor,
          tpOpacity: te.tpOpacity
        },
        selectedPositionId: Ye.current,
        slDraft: Ze.current,
        tpDraft: Qe.current,
        hoveredSLTP: Xn.current,
        draggingHandle: it.current,
        defaultOffset: ns(0) || void 0
      };
      Tu(B, ze), ju(B, ze);
    }
    if (It && !It.startsWith("sp-") && l) {
      const B = Je;
      if (B && Le > 0) {
        const v = (k, L) => {
          e.save(), e.beginPath(), e.rect(0, 0, q, Le), e.clip();
          for (let W = 0; W < i.candles.length; W += 8) {
            const F = i.startIndex + W;
            if (F >= k.length) continue;
            const E = k[F];
            if (isNaN(E) || !isFinite(E)) continue;
            const S = ge(F, i.startIndex), R = Le - (E - B.min) / B.range * Le;
            e.beginPath(), e.arc(S, R, 3.5, 0, Math.PI * 2), e.fillStyle = "#131722", e.fill(), e.beginPath(), e.arc(S, R, 2.5, 0, Math.PI * 2), e.fillStyle = L, e.fill();
          }
          e.restore();
        }, C = It;
        if (C === "movingAverages" && l.movingAverages)
          for (const k of l.movingAverages) v(k.data, k.color);
        else if (C?.startsWith("movingAverages__") && l.movingAverages) {
          const k = parseInt(C.slice(16), 10), L = l.movingAverages[k];
          L && v(L.data, L.color);
        } else if (C === "bollinger" && l.bollinger) {
          const k = l.bollinger;
          v(k.upper, r?.bollinger?.upperColor || "#9B59B6"), v(k.middle, r?.bollinger?.middleColor || "#9B59B6"), v(k.lower, r?.bollinger?.lowerColor || "#9B59B6");
        } else if (C === "vwap" && l.vwap)
          v(l.vwap, "#ff9800");
        else if (C === "ichimoku" && l.ichimoku) {
          const k = l.ichimoku;
          v(k.tenkan, "#0094FF"), v(k.kijun, "#AD1457"), v(k.senkouA, "#4CAF50"), v(k.senkouB, "#FF5722");
        } else if (C === "keltner" && l.keltner)
          v(l.keltner.upper, "#3b82f6"), v(l.keltner.middle, "#3b82f6"), v(l.keltner.lower, "#3b82f6");
        else if (C === "donchian" && l.donchian)
          v(l.donchian.upper, "#3b82f6"), v(l.donchian.middle, "#3b82f6"), v(l.donchian.lower, "#3b82f6");
        else if (C === "envelopes" && l.envelopes)
          v(l.envelopes.upper, "#3b82f6"), v(l.envelopes.basis, "#3b82f6"), v(l.envelopes.lower, "#3b82f6");
        else if (C === "supertrend" && l.supertrend) {
          const k = l.supertrend.map((L) => L?.value ?? NaN);
          v(k, "#3b82f6");
        } else if (["dema", "tema", "hma"].includes(C)) {
          const k = l[C];
          Array.isArray(k) && v(k, "#3b82f6");
        } else if (C.startsWith("ci-") && r?.customIndicators) {
          const k = r.customIndicators.find((W) => `ci-${W.id}` === C), L = k?.data;
          k && L && Array.isArray(L) && v(L, k.color);
        } else if (C.startsWith("script-") && r?.customIndicators) {
          const k = C.slice(7);
          for (const L of r.customIndicators) {
            if (L.scriptId !== k) continue;
            const W = L.data;
            W && Array.isArray(W) && v(W, L.color);
          }
        }
      }
    }
    let Ot = Le;
    if (l?.rsi) {
      const B = Qn, c = Ot, j = c + B, v = r?.rsi?.style || {};
      v.backgroundColor && (e.fillStyle = v.backgroundColor, e.globalAlpha = v.backgroundOpacity ?? 0.3, e.fillRect(0, c, q, B), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(q, c), e.stroke();
      const C = (Y) => c + B - Y / 100 * B, k = r?.rsi?.overbought ?? 70, L = r?.rsi?.oversold ?? 30;
      if (v.showZones) {
        const Y = C(k), oe = C(L), me = v.zoneOpacity ?? 0.1;
        e.fillStyle = v.overboughtZoneColor || "#ff4444", e.globalAlpha = me, e.fillRect(0, c, q, Y - c), e.fillStyle = v.oversoldZoneColor || "#44ff44", e.fillRect(0, oe, q, j - oe), e.globalAlpha = 1;
      }
      if (v.showGrid !== !1) {
        const Y = v.gridColor || "rgba(150, 150, 150, 0.3)";
        e.setLineDash([4, 4]), [L, 50, k].forEach((oe) => {
          e.beginPath(), oe === 50 ? (e.strokeStyle = Y, e.lineWidth = 1) : (e.strokeStyle = "rgba(180, 130, 80, 0.8)", e.lineWidth = 1.5);
          const me = C(oe);
          e.moveTo(0, me), e.lineTo(q, me), e.stroke();
        }), e.setLineDash([]), e.lineWidth = 1;
      }
      const W = r?.rsi?.color || "#E74C3C", F = v.lineWidth ?? 1.5;
      e.strokeStyle = W, e.lineWidth = F, e.beginPath();
      let E = !1;
      i.candles.forEach((Y, oe) => {
        const me = i.startIndex + oe, we = l.rsi[me];
        if (!isNaN(we) && isFinite(we)) {
          const se = ge(me, i.startIndex), Ie = C(we);
          E ? e.lineTo(se, Ie) : (e.moveTo(se, Ie), E = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Vt, e.textAlign = "left", [0, L, 50, k, 100].forEach((Y) => {
        const oe = C(Y);
        e.fillText(Y.toString(), q + 5, oe);
      }), nn.current.rsi = { top: c, bottom: j };
      const S = ct.current !== null ? ct.current : i.startIndex + i.candles.length - 1, R = l.rsi[S], P = !isNaN(R) && isFinite(R) ? R.toFixed(2) : "--", H = `RSI ${r?.rsi?.period || 14} close`, Z = r?.rsi?.style?.customLabel || H, he = r?.rsi?.style?.labelColor || "#d1d5db";
      e.fillStyle = he, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left", e.fillText(Z, 5, c + 15), e.fillStyle = W, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
      const z = e.measureText(Z).width;
      e.fillText(P, 13 + z, c + 15), $n.current.rsi = 13 + z + e.measureText(P).width + 8, Ot = j;
    }
    if (l?.macd) {
      const B = Qn, c = Ot, j = c + B, v = r?.macd?.style || {};
      v.backgroundColor && (e.fillStyle = v.backgroundColor, e.globalAlpha = v.backgroundOpacity ?? 0.3, e.fillRect(0, c, q, B), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(q, c), e.stroke();
      const C = l.macd.macd.slice(i.startIndex, i.endIndex), k = l.macd.signal.slice(i.startIndex, i.endIndex), L = l.macd.histogram.slice(i.startIndex, i.endIndex), W = [...C, ...k, ...L].filter((kt) => !isNaN(kt) && isFinite(kt)), F = Math.min(...W, 0), S = Math.max(...W, 0) - F || 1, R = (kt) => c + B - (kt - F) / S * B;
      if (v.showGrid !== !1) {
        e.strokeStyle = v.gridColor || te.grid, e.setLineDash([2, 2]), e.beginPath();
        const kt = R(0);
        e.moveTo(0, kt), e.lineTo(q, kt), e.stroke(), e.setLineDash([]);
      }
      const P = Math.max(2, mn * 0.5), H = r?.macd?.histogramUpColor || "#26a69a", Z = r?.macd?.histogramDownColor || "#ef5350", he = R(0);
      i.candles.forEach((kt, Vn) => {
        const ln = i.startIndex + Vn, _t = l.macd.histogram[ln];
        if (!isNaN(_t) && isFinite(_t)) {
          const bn = ge(ln, i.startIndex), Qt = R(_t), Ps = Math.abs(he - Qt);
          e.fillStyle = _t >= 0 ? H : Z, _t >= 0 ? e.fillRect(bn - P / 2, Qt, P, Ps) : e.fillRect(bn - P / 2, he, P, Ps);
        }
      });
      const z = r?.macd?.macdColor || "#3498DB";
      e.strokeStyle = z, e.lineWidth = 1.5, e.beginPath();
      let Y = !1;
      i.candles.forEach((kt, Vn) => {
        const ln = i.startIndex + Vn, _t = l.macd.macd[ln];
        if (!isNaN(_t) && isFinite(_t)) {
          const bn = ge(ln, i.startIndex), Qt = R(_t);
          Y ? e.lineTo(bn, Qt) : (e.moveTo(bn, Qt), Y = !0);
        }
      }), e.stroke();
      const oe = r?.macd?.signalColor || "#E67E22";
      e.strokeStyle = oe, e.lineWidth = 1.5, e.beginPath(), Y = !1, i.candles.forEach((kt, Vn) => {
        const ln = i.startIndex + Vn, _t = l.macd.signal[ln];
        if (!isNaN(_t) && isFinite(_t)) {
          const bn = ge(ln, i.startIndex), Qt = R(_t);
          Y ? e.lineTo(bn, Qt) : (e.moveTo(bn, Qt), Y = !0);
        }
      }), e.stroke(), nn.current.macd = { top: c, bottom: j };
      const me = `MACD(${r?.macd?.fast || 12},${r?.macd?.slow || 26},${r?.macd?.signal || 9})`, we = r?.macd?.style?.customLabel || me, se = r?.macd?.style?.labelColor || te.textDim;
      e.fillStyle = se, e.font = `bold ${Vt}`, e.textAlign = "left";
      const Ie = ct.current !== null ? ct.current : i.startIndex + i.candles.length - 1, Te = l.macd.macd[Ie], Ue = l.macd.signal[Ie], ht = l.macd.histogram[Ie];
      e.fillText(we, 5, c + 12), e.fillStyle = z, e.font = Vt;
      const pt = e.measureText(we).width, Et = !isNaN(Te) && isFinite(Te) ? Te.toFixed(4) : "--";
      e.fillText(Et, 10 + pt, c + 12), e.fillStyle = oe;
      const wn = !isNaN(Ue) && isFinite(Ue) ? Ue.toFixed(4) : "--", En = e.measureText(Et).width;
      e.fillText(wn, 16 + pt + En, c + 12);
      const Pt = !isNaN(ht) && isFinite(ht) ? ht.toFixed(4) : "--";
      e.fillStyle = ht >= 0 ? "#00ff88" : "#ff0080";
      const At = e.measureText(wn).width;
      e.fillText(Pt, 22 + pt + En + At, c + 12), $n.current.macd = 22 + pt + En + At + e.measureText(Pt).width + 8, Ot = j;
    }
    if (l?.atr) {
      const B = Qn, c = Ot, j = c + B, v = r?.atr?.style || {};
      v.backgroundColor && (e.fillStyle = v.backgroundColor, e.globalAlpha = v.backgroundOpacity ?? 0.3, e.fillRect(0, c, q, B), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(q, c), e.stroke();
      const C = l.atr.slice(i.startIndex, i.endIndex).filter((me) => !isNaN(me) && isFinite(me)), k = Math.min(...C, 0), W = Math.max(...C) - k || 1, F = (me) => c + B - (me - k) / W * B, E = r?.atr?.color || "#17a2b8", S = v.lineWidth ?? 1.5;
      e.strokeStyle = E, e.lineWidth = S, e.beginPath();
      let R = !1;
      i.candles.forEach((me, we) => {
        const se = i.startIndex + we, Ie = l.atr[se];
        if (!isNaN(Ie) && isFinite(Ie)) {
          const Te = ge(se, i.startIndex), Ue = F(Ie);
          R ? e.lineTo(Te, Ue) : (e.moveTo(Te, Ue), R = !0);
        }
      }), e.stroke(), nn.current.atr = { top: c, bottom: j };
      const P = `ATR(${r?.atr?.period || 14})`, H = r?.atr?.style?.customLabel || P, Z = r?.atr?.style?.labelColor || te.textDim;
      e.fillStyle = Z, e.font = `bold ${Vt}`, e.textAlign = "left";
      const he = ct.current !== null ? ct.current : i.startIndex + i.candles.length - 1, z = l.atr[he], Y = !isNaN(z) && isFinite(z) ? z.toFixed(5) : "--";
      e.fillText(H, 5, c + 12), e.fillStyle = E, e.font = Vt;
      const oe = e.measureText(H).width;
      e.fillText(Y, 10 + oe, c + 12), $n.current.atr = 10 + oe + e.measureText(Y).width + 8, Ot = j;
    }
    if (l?.stochastic) {
      const B = Qn, c = Ot, j = c + B, v = r?.stochastic?.style || {};
      v.backgroundColor && (e.fillStyle = v.backgroundColor, e.globalAlpha = v.backgroundOpacity ?? 0.3, e.fillRect(0, c, q, B), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(q, c), e.stroke();
      const C = (we) => c + B - we / 100 * B;
      e.strokeStyle = te.grid, e.setLineDash([2, 2]), e.beginPath();
      const k = r?.stochastic?.overbought ?? 80, L = r?.stochastic?.oversold ?? 20;
      [L, 50, k].forEach((we) => {
        const se = C(we);
        e.moveTo(0, se), e.lineTo(q, se);
      }), e.stroke(), e.setLineDash([]);
      const W = r?.stochastic?.kColor || "#3498DB";
      e.strokeStyle = W, e.lineWidth = 1.5, e.beginPath();
      let F = !1;
      i.candles.forEach((we, se) => {
        const Ie = i.startIndex + se, Te = l.stochastic.k[Ie];
        if (!isNaN(Te) && isFinite(Te)) {
          const Ue = ge(Ie, i.startIndex), ht = C(Te);
          F ? e.lineTo(Ue, ht) : (e.moveTo(Ue, ht), F = !0);
        }
      }), e.stroke();
      const E = r?.stochastic?.dColor || "#E67E22";
      e.strokeStyle = E, e.lineWidth = 1.5, e.beginPath(), F = !1, i.candles.forEach((we, se) => {
        const Ie = i.startIndex + se, Te = l.stochastic.d[Ie];
        if (!isNaN(Te) && isFinite(Te)) {
          const Ue = ge(Ie, i.startIndex), ht = C(Te);
          F ? e.lineTo(Ue, ht) : (e.moveTo(Ue, ht), F = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Vt, e.textAlign = "left", [0, L, 50, k, 100].forEach((we) => {
        const se = C(we);
        e.fillText(we.toString(), q + 5, se);
      }), nn.current.stochastic = { top: c, bottom: j };
      const S = `STOCH(${r?.stochastic?.kPeriod || 14},${r?.stochastic?.dPeriod || 3})`, R = r?.stochastic?.style?.customLabel || S, P = r?.stochastic?.style?.labelColor || te.textDim;
      e.fillStyle = P, e.font = `bold ${Vt}`, e.textAlign = "left";
      const H = ct.current !== null ? ct.current : i.startIndex + i.candles.length - 1, Z = l.stochastic.k[H], he = l.stochastic.d[H];
      e.fillText(R, 5, c + 12), e.fillStyle = W, e.font = Vt;
      const z = e.measureText(R).width, Y = !isNaN(Z) && isFinite(Z) ? `%K ${Z.toFixed(2)}` : "%K --";
      e.fillText(Y, 10 + z, c + 12), e.fillStyle = E;
      const oe = e.measureText(Y).width, me = !isNaN(he) && isFinite(he) ? `%D ${he.toFixed(2)}` : "%D --";
      e.fillText(me, 16 + z + oe, c + 12), $n.current.stochastic = 16 + z + oe + e.measureText(me).width + 8, Ot = j;
    }
    if (l?.williamsR) {
      const B = Qn, c = Ot, j = c + B, v = r?.williamsR?.style || {};
      v.backgroundColor && (e.fillStyle = v.backgroundColor, e.globalAlpha = v.backgroundOpacity ?? 0.3, e.fillRect(0, c, q, B), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(q, c), e.stroke();
      const C = (z) => c + B - (z + 100) / 100 * B, k = r?.williamsR?.overbought ?? -20, L = r?.williamsR?.oversold ?? -80;
      e.setLineDash([4, 4]), e.strokeStyle = v.gridColor || "rgba(180, 130, 80, 0.6)", [L, -50, k].forEach((z) => {
        e.beginPath();
        const Y = C(z);
        e.moveTo(0, Y), e.lineTo(q, Y), e.stroke();
      }), e.setLineDash([]);
      const W = r?.williamsR?.color || "#E91E63";
      e.strokeStyle = W, e.lineWidth = v.lineWidth ?? 1.5, e.beginPath();
      let F = !1;
      i.candles.forEach((z, Y) => {
        const oe = i.startIndex + Y, me = l.williamsR[oe];
        if (!isNaN(me) && isFinite(me)) {
          const we = ge(oe, i.startIndex), se = C(me);
          F ? e.lineTo(we, se) : (e.moveTo(we, se), F = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Vt, e.textAlign = "left", [-100, L, -50, k, 0].forEach((z) => {
        const Y = C(z);
        e.fillText(z.toString(), q + 5, Y);
      }), nn.current.williamsR = { top: c, bottom: j };
      const E = `Williams %R ${r?.williamsR?.period || 14}`, S = r?.williamsR?.style?.customLabel || E, R = r?.williamsR?.style?.labelColor || "#d1d5db";
      e.fillStyle = R, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left";
      const P = ct.current !== null ? ct.current : i.startIndex + i.candles.length - 1, H = l.williamsR[P], Z = !isNaN(H) && isFinite(H) ? H.toFixed(2) : "--";
      e.fillText(S, 5, c + 15), e.fillStyle = W;
      const he = e.measureText(S).width;
      e.fillText(Z, 13 + he, c + 15), $n.current.williamsR = 13 + he + e.measureText(Z).width + 8, Ot = j;
    }
    if (l?.cci) {
      const B = Qn, c = Ot, j = c + B, v = r?.cci?.style || {};
      v.backgroundColor && (e.fillStyle = v.backgroundColor, e.globalAlpha = v.backgroundOpacity ?? 0.3, e.fillRect(0, c, q, B), e.globalAlpha = 1), e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(q, c), e.stroke();
      const C = i.candles.map((oe, me) => l.cci[i.startIndex + me]).filter((oe) => !isNaN(oe) && isFinite(oe)), k = C.length > 0 ? Math.max(200, Math.max(...C.map(Math.abs))) : 200, L = (oe) => c + B / 2 - oe / k * (B / 2), W = r?.cci?.overbought ?? 100, F = r?.cci?.oversold ?? -100;
      e.setLineDash([4, 4]), e.strokeStyle = v.gridColor || "rgba(180, 130, 80, 0.6)", [F, 0, W].forEach((oe) => {
        e.beginPath();
        const me = L(oe);
        e.moveTo(0, me), e.lineTo(q, me), e.stroke();
      }), e.setLineDash([]);
      const E = r?.cci?.color || "#00BCD4";
      e.strokeStyle = E, e.lineWidth = v.lineWidth ?? 1.5, e.beginPath();
      let S = !1;
      i.candles.forEach((oe, me) => {
        const we = i.startIndex + me, se = l.cci[we];
        if (!isNaN(se) && isFinite(se)) {
          const Ie = ge(we, i.startIndex), Te = L(se);
          S ? e.lineTo(Ie, Te) : (e.moveTo(Ie, Te), S = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Vt, e.textAlign = "left", [Math.round(-k), F, 0, W, Math.round(k)].forEach((oe) => {
        const me = L(oe);
        e.fillText(oe.toString(), q + 5, me);
      }), nn.current.cci = { top: c, bottom: j };
      const R = `CCI ${r?.cci?.period || 20}`, P = r?.cci?.style?.customLabel || R, H = r?.cci?.style?.labelColor || "#d1d5db";
      e.fillStyle = H, e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.textAlign = "left";
      const Z = ct.current !== null ? ct.current : i.startIndex + i.candles.length - 1, he = l.cci[Z], z = !isNaN(he) && isFinite(he) ? he.toFixed(2) : "--";
      e.fillText(P, 5, c + 15), e.fillStyle = E;
      const Y = e.measureText(P).width;
      e.fillText(z, 13 + Y, c + 15), $n.current.cci = 13 + Y + e.measureText(z).width + 8, Ot = j;
    }
    if (l?.adx) {
      const B = Qn, c = Ot, j = c + B;
      e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(q, c), e.stroke();
      const v = (S) => c + B - S / 100 * B;
      e.setLineDash([4, 4]), e.strokeStyle = "rgba(150, 150, 150, 0.3)", [25, 50, 75].forEach((S) => {
        e.beginPath(), e.moveTo(0, v(S)), e.lineTo(q, v(S)), e.stroke();
      }), e.setLineDash([]);
      const C = r?.adx?.adxColor || "#FFEB3B", k = r?.adx?.plusDIColor || "#22c55e", L = r?.adx?.minusDIColor || "#ef4444";
      e.strokeStyle = k, e.lineWidth = 1, e.beginPath();
      let W = !1;
      i.candles.forEach((S, R) => {
        const P = i.startIndex + R, H = l.adx.plusDI[P];
        if (!isNaN(H) && isFinite(H)) {
          const Z = ge(P, i.startIndex), he = v(H);
          W ? e.lineTo(Z, he) : (e.moveTo(Z, he), W = !0);
        }
      }), e.stroke(), e.strokeStyle = L, e.beginPath(), W = !1, i.candles.forEach((S, R) => {
        const P = i.startIndex + R, H = l.adx.minusDI[P];
        if (!isNaN(H) && isFinite(H)) {
          const Z = ge(P, i.startIndex), he = v(H);
          W ? e.lineTo(Z, he) : (e.moveTo(Z, he), W = !0);
        }
      }), e.stroke(), e.strokeStyle = C, e.lineWidth = 2, e.beginPath(), W = !1, i.candles.forEach((S, R) => {
        const P = i.startIndex + R, H = l.adx.adx[P];
        if (!isNaN(H) && isFinite(H)) {
          const Z = ge(P, i.startIndex), he = v(H);
          W ? e.lineTo(Z, he) : (e.moveTo(Z, he), W = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Vt, [0, 25, 50, 75, 100].forEach((S) => {
        e.fillText(S.toString(), q + 5, v(S));
      });
      const F = ct.current !== null ? ct.current : i.startIndex + i.candles.length - 1, E = l.adx.adx[F];
      e.fillStyle = "#d1d5db", e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif", e.fillText(`ADX ${r?.adx?.period || 14}`, 5, c + 15), e.fillStyle = C, e.fillText(!isNaN(E) && isFinite(E) ? E.toFixed(2) : "--", 73, c + 15), e.fillStyle = k, e.fillText("+DI", 118, c + 15), e.fillStyle = L, e.fillText("-DI", 148, c + 15), $n.current.adx = 148 + e.measureText("-DI").width + 8, nn.current.adx = { top: c, bottom: j }, Ot = j;
    }
    if (l?.roc) {
      const B = Qn, c = Ot, j = c + B;
      e.strokeStyle = te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, c), e.lineTo(q, c), e.stroke();
      const v = i.candles.map((P, H) => l.roc[i.startIndex + H]).filter((P) => !isNaN(P) && isFinite(P)), C = v.length > 0 ? Math.max(5, Math.max(...v.map(Math.abs))) : 5, k = (P) => c + B / 2 - P / C * (B / 2);
      e.setLineDash([4, 4]), e.strokeStyle = "rgba(150, 150, 150, 0.5)", e.beginPath(), e.moveTo(0, k(0)), e.lineTo(q, k(0)), e.stroke(), e.setLineDash([]);
      const L = r?.roc?.color || "#9C27B0";
      e.strokeStyle = L, e.lineWidth = 1.5, e.beginPath();
      let W = !1;
      i.candles.forEach((P, H) => {
        const Z = i.startIndex + H, he = l.roc[Z];
        if (!isNaN(he) && isFinite(he)) {
          const z = ge(Z, i.startIndex), Y = k(he);
          W ? e.lineTo(z, Y) : (e.moveTo(z, Y), W = !0);
        }
      }), e.stroke(), e.fillStyle = "#6b7280", e.font = Vt, [-C, 0, C].forEach((P) => {
        e.fillText(P.toFixed(1) + "%", q + 5, k(P));
      }), e.fillStyle = "#d1d5db", e.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
      const F = ct.current !== null ? ct.current : i.startIndex + i.candles.length - 1, E = l.roc[F], S = !isNaN(E) && isFinite(E) ? E.toFixed(2) + "%" : "--";
      e.fillText(`ROC ${r?.roc?.period || 12}`, 5, c + 15), e.fillStyle = L;
      const R = e.measureText(`ROC ${r?.roc?.period || 12}`).width;
      e.fillText(S, 13 + R, c + 15), $n.current.roc = 13 + R + e.measureText(S).width + 8, nn.current.roc = { top: c, bottom: j }, Ot = j;
    }
    const _o = {
      ctx: e,
      chartWidth: q,
      subplotHeight: Qn,
      visible: i,
      indexToX: ge,
      currentCandleWidth: mn,
      subplotLabelFont: Vt,
      hoveredCandleIndex: ct.current,
      colors: { textDim: te.textDim, grid: te.grid },
      indicators: r,
      indicatorData: l,
      indicatorBounds: nn.current,
      subplotLabelEndX: $n.current,
      mainPriceToY: rt,
      mainChartHeight: Le,
      skipIndicators: O,
      clickedIndicatorKey: It
    };
    if (Mu(_o), Ot = Ru(_o, Ot), Pu(_o), wt && wt.length > 0 && i.candles.length > 0) {
      const B = (P) => P ? P.toUpperCase().trim().slice(0, 2) : "??", c = (P) => {
        if (P.datetime) {
          const H = new Date(P.datetime).getTime();
          if (!isNaN(H)) return H;
        }
        if (!P.date) return null;
        try {
          const [H, Z, he] = P.date.split("-").map(Number);
          if (!P.time) return Date.UTC(H, Z - 1, he, 12, 0);
          const z = P.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
          if (!z) return Date.UTC(H, Z - 1, he, 12, 0);
          let Y = parseInt(z[1]);
          const oe = parseInt(z[2]), me = z[3]?.toUpperCase();
          return me === "PM" && Y !== 12 ? Y += 12 : me === "AM" && Y === 12 && (Y = 0), Date.UTC(H, Z - 1, he, Y, oe);
        } catch {
          return null;
        }
      }, j = [];
      e.save();
      const v = { high: 0, medium: 1, low: 2 }, C = [], k = Date.now();
      for (const P of wt) {
        const H = c(P);
        if (!H || H < k) continue;
        const Z = s.length > 1 ? Math.abs(s[1].time - s[0].time) : 6e4, he = s[s.length - 1], z = he && H > he.time + Z;
        let Y, oe;
        if (z) {
          const se = (H - he.time) / Z, Ie = s.length - 1 + se;
          if (oe = Math.round(Ie), Y = ge(Ie, i.startIndex), Y < 0 || Y > q - 10) continue;
        } else {
          let we = 0, se = s.length - 1;
          for (oe = -1; we <= se; ) {
            const Te = Math.floor((we + se) / 2);
            if (s[Te].time === H) {
              oe = Te;
              break;
            }
            s[Te].time < H ? we = Te + 1 : se = Te - 1;
          }
          if (oe === -1) {
            const Te = we >= 0 && we < s.length, Ue = se >= 0 && se < s.length;
            Te && Ue ? oe = Math.abs(s[we].time - H) < Math.abs(s[se].time - H) ? we : se : Te ? oe = we : Ue ? oe = se : oe = s.length - 1;
          }
          const Ie = Math.abs(s[oe].time - H);
          if (oe < 0 || Ie > Z || oe < i.startIndex || oe >= i.endIndex || (Y = ge(oe, i.startIndex), Y < 0 || Y > q)) continue;
        }
        const me = Nu({ event: P.event || "", country: P.region_code || "" });
        C.push({ x: Y, event: P, impact: me, ts: H, closestIdx: oe });
      }
      C.sort((P, H) => {
        const Z = v[P.impact] ?? 3, he = v[H.impact] ?? 3;
        return Z !== he ? Z - he : (P.event.event || "").localeCompare(H.event.event || "");
      });
      const L = /* @__PURE__ */ new Map();
      for (const P of C) {
        const H = Math.round(P.x);
        L.has(H) || L.set(H, []), L.get(H).push(P);
      }
      const W = document.documentElement.classList.contains("dark"), F = y - yt, E = 22, S = 32, R = F - E / 2 - 5;
      for (const [P, H] of L) {
        const Z = H[0].x, he = H[0].impact, z = he === "high", Y = he === "low", oe = B(H[0].event.region_code), me = Lu(H[0].event.region_code), we = H.length;
        j.push({
          x: Z,
          y: R,
          event: H[0].event,
          impact: he,
          ts: H[0].ts,
          groupEvents: H.map((pt) => ({ event: pt.event, impact: pt.impact, ts: pt.ts }))
        });
        const se = z ? "#dc2626" : Y ? "#22c55e" : "#d97706";
        e.save(), e.shadowColor = W ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.15)", e.shadowBlur = 8, e.shadowOffsetY = 2;
        const Ie = Z - S / 2, Te = R - E / 2;
        e.fillStyle = W ? "rgba(30, 41, 59, 0.92)" : "rgba(255, 255, 255, 0.95)", e.beginPath(), e.roundRect(Ie, Te, S, E, 6), e.fill(), e.shadowColor = "transparent", e.shadowBlur = 0, e.strokeStyle = W ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)", e.lineWidth = 1, e.stroke(), e.fillStyle = se, e.beginPath(), e.roundRect(Ie, Te, 3, E, [6, 0, 0, 6]), e.fill(), e.restore();
        const Ue = 18, ht = 13;
        if (me ? e.drawImage(me, Z - Ue / 2, R - ht / 2, Ue, ht) : (e.font = 'bold 9px -apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif', e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = W ? "#e2e8f0" : "#334155", e.fillText(oe, Z + 1, R)), we > 1) {
          const pt = Ie + S - 2, Et = Te - 2, wn = 7;
          e.beginPath(), e.arc(pt, Et, wn, 0, Math.PI * 2), e.fillStyle = se, e.fill(), e.strokeStyle = W ? "#0f172a" : "#ffffff", e.lineWidth = 1.5, e.stroke(), e.font = 'bold 8px -apple-system, BlinkMacSystemFont, "Inter", sans-serif', e.fillStyle = "#ffffff", e.fillText(String(we), pt, Et + 0.5);
        }
        e.beginPath(), e.moveTo(Z, R + E / 2), e.lineTo(Z, F), e.strokeStyle = z ? "rgba(220, 38, 38, 0.3)" : Y ? "rgba(34, 197, 94, 0.25)" : "rgba(217, 119, 6, 0.3)", e.lineWidth = 1, e.setLineDash([2, 3]), e.stroke(), e.setLineDash([]);
      }
      e.restore(), On.current = j;
    } else
      On.current = [];
    if (e.strokeStyle = te.axisLine || te.textDim, e.lineWidth = 1, e.beginPath(), e.moveTo(0, y - yt), e.lineTo(b, y - yt), e.stroke(), He.versionLabelVisible) {
      const B = An === 0 ? 0 : He.versionLabelXOffset, c = q + Ve / 2 + B, j = y - yt / 2 + 1;
      e.save(), e.font = 'bold 11px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = te.text, e.fillText("v.23", c, j), e.restore();
    }
    if (i.candles.length > 0) {
      const B = mn * (1 + $e), c = Math.max(1, Math.floor(80 / B)), j = y - yt, v = j + 16;
      if (e.font = ur, e.textAlign = "center", e.textBaseline = "middle", e.save(), e.beginPath(), e.rect(0, j, q, yt), e.clip(), !i.candles || i.candles.length === 0) {
        e.restore();
        return;
      }
      const C = i.candles[0], k = i.candles[i.candles.length - 1];
      if (!C || !k) {
        e.restore();
        return;
      }
      const L = (/* @__PURE__ */ new Date()).getFullYear(), W = new Date(C.time).getFullYear(), F = new Date(k.time).getFullYear(), E = W !== F, S = W !== L || F !== L, R = i.candles[1], P = R ? R.time - C.time : 6e4, Z = P / 6e4 >= 60;
      let he = "", z = -1, Y = -1 / 0;
      const oe = 12, me = (se, Ie) => {
        if (Z) {
          const ht = Jn(se, S || E || Ie !== z);
          return ht !== he ? (he = ht, z = Ie, ht) : js(se);
        }
        const Te = Jn(se, !1);
        return Ie !== z && z !== -1 ? (z = Ie, Jn(se, !0)) : Te !== he ? (he = Te, z = Ie, Jn(se, S)) : js(se);
      }, we = xe.width < 400;
      if (He.useFixedTimeAxisLabels) {
        const se = we ? He.fixedTimeAxisLabelCountSmall : He.fixedTimeAxisLabelCount, Ie = 5, Te = q - Ie * 2;
        for (let Ue = 0; Ue < se; Ue++) {
          const ht = Ie + Te * (Ue + 0.5) / se, pt = rl(ht, i.startIndex), Et = Math.round(pt) - i.startIndex, wn = Et >= 0 && Et < i.candles.length ? i.candles[Et] : null, En = wn ? wn.time : C.time + (pt - i.startIndex) * P, Pt = wn ? ge(i.startIndex + Et, i.startIndex) : ht, At = new Date(En).getFullYear(), kt = me(En, At);
          e.fillStyle = te.axisLabel, e.fillText(kt, Pt, v);
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
        ], ht = c * P;
        let pt = Ue[Ue.length - 1];
        for (const Pt of Ue)
          if (Pt >= ht) {
            pt = Pt;
            break;
          }
        const Et = Math.ceil(C.time / pt) * pt, wn = k.time + pt * 25;
        let En = -1;
        for (let Pt = Et; Pt <= wn; Pt += pt) {
          let At, kt = Pt;
          if (Pt <= k.time) {
            let Qt = 0, Ps = i.candles.length - 1, dl = Ps;
            for (; Qt <= Ps; ) {
              const zl = Qt + Ps >> 1;
              i.candles[zl].time >= Pt ? (dl = zl, Ps = zl - 1) : Qt = zl + 1;
            }
            if (dl === En) continue;
            En = dl, kt = i.candles[dl].time, At = ge(i.startIndex + dl, i.startIndex);
          } else {
            const Qt = i.startIndex + (i.candles.length - 1) + (Pt - k.time) / P;
            At = ge(Qt, i.startIndex);
          }
          if (At < 2 || At > q - 10) continue;
          const Vn = me(kt, new Date(kt).getFullYear()), ln = e.measureText(Vn).width, _t = At - ln / 2, bn = At + ln / 2;
          _t < Y + oe || bn > q - 10 || _t < 2 || (e.fillStyle = te.axisLabel, e.fillText(Vn, At, v), Y = bn);
        }
      }
      e.restore(), (Vs.length > 0 || Rs.length > 0) && (e.save(), Vs.forEach((se) => {
        e.fillStyle = Wo, e.beginPath(), e.roundRect(se.topOrigin, Fo, se.bWidth, ul, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.font = Yl, e.fillText(se.text, se.topOrigin + se.bWidth / 2, Fo + ul / 2);
      }), Rs.forEach((se) => {
        e.fillStyle = Wo, e.beginPath(), e.roundRect(Oo, se.topOrigin, se.bWidth, ul, 2), e.fill(), e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.font = Yl, e.fillText(se.text, Oo + se.bWidth / 2, se.topOrigin + ul / 2);
      }), e.restore());
    }
    const Ho = p.getContext("2d");
    Ho && (Ho.setTransform(1, 0, 0, 1, 0, 0), Ho.drawImage(f, 0, 0)), Dn.current = {
      startIndex: Cr,
      candleWidth: mn
    }, jt.current && Js.current?.();
  }, [xe, s, n, de, te, l, Gt, Pn, Ts, Nn, js, Jn, fr, ao, gn, I, r, K, dt, wt, xt, It, ts, bs]);
  an.current = is, o.useEffect(() => {
    Ks && (Ks.current = () => {
      lt(!0);
    });
  }, [Ks]);
  const Wt = o.useCallback(() => {
    const a = Ge.current, p = a?.getContext("2d");
    if (!a || !p) return;
    const b = {
      ctx: p,
      dimensions: xe,
      dpr: gn,
      candles: s,
      colors: te,
      viewState: de,
      indicatorData: l,
      indicators: r,
      indicatorHeightRatio: Gt,
      showOHLC: Zn,
      isDesktop: Ll,
      PRICE_AXIS_WIDTH: Ve,
      TIME_AXIS_HEIGHT: yt,
      PRICE_LABEL_FONT: El,
      TIME_LABEL_FONT: ur,
      crosshair: Ht.current,
      isScrolling: jt.current,
      scrollState: {
        startIndex: Me.current.startIndex,
        candleWidth: Me.current.candleWidth
      },
      isDraggingHandle: !!it.current,
      isHoveredSLTP: !!Xn.current,
      sessionControlHovered: po.current,
      isSyncedUpdate: Us.current,
      syncedCrosshairTime: As.current ?? void 0,
      hoveredEvent: jn.current || ys.current,
      currentOhlcTextWidth: tr,
      currentBbTextEndX: xo,
      currentMaTextEndX: mo,
      currentVwapTextEndX: bo,
      currentVpTextEndX: go,
      currentVolTextEndX: vo,
      overlayLabelEndXPrev: _s.current,
      subplotLabelEndXPrev: sr,
      getVisibleCandles: Pn,
      getPriceRange: Ts,
      yToPrice: dr,
      xToIndex: rl,
      indexToX: hr,
      formatPrice: Nn,
      formatTime: js,
      formatDate: Jn,
      callbacks: {
        setOhlcTextWidth: na,
        setBbTextEndX: la,
        setMaTextEndX: oa,
        setVwapTextEndX: ra,
        setVpTextEndX: aa,
        setVolTextEndX: ia,
        setOverlayLabelEndX: (y) => {
          _s.current = y, ca(y);
        },
        setSubplotLabelEndX: ua,
        onCrosshairMove: ne
      }
    };
    Eu(b);
  }, [xe, s, de, te, l, r, Gt, Pn, Ts, dr, rl, hr, Nn, js, Jn, ne, gn, Zn, le]);
  o.useEffect(() => {
    cn.current = Wt;
  }, [Wt]), o.useEffect(() => {
    Tn.current = te?.crosshairStyle || "standard", Ge.current && (Ge.current.style.cursor = Tn.current !== "standard" ? "none" : "crosshair");
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
    handleYAxisWheel: So
  } = Au({
    minCandleWidth: Al,
    maxCandleWidth: Dl,
    priceAxisWidth: Ve,
    timeAxisHeight: yt,
    dimensions: xe,
    candlesLength: s.length,
    disableAutoFollow: Se,
    livePrice: n ?? null,
    scrollStateRef: Me,
    drawChartRef: an,
    notifyScrollSync: St,
    getVisibleCandles: Pn,
    getPriceRange: Ts,
    setViewState: Dt,
    setPriceScale: ft,
    setPriceOffset: Lt,
    setFixedPriceCenter: _e,
    setFixedPriceRange: Os,
    setIsScalingYAxis: Ct,
    fixedPriceCenter: mt,
    priceScale: ve,
    priceOffset: Re,
    viewStateAutoFollowLatest: de.autoFollowLatest,
    yAxisScaleStartRef: tl,
    priceScaleRef: yn,
    priceOffsetRef: qn,
    yAxisDebounceRef: Gn
  }), Sa = o.useCallback((a) => {
    const p = Ge.current;
    if (!p) return;
    const b = p.getBoundingClientRect(), y = a.clientX - b.left, f = a.clientY - b.top;
    if (("ontouchstart" in window || navigator.maxTouchPoints > 0) && !vn && !Mn && !it.current)
      return;
    if (Ht.current = { x: y, y: f }, !Mn && !it.current && r && l) {
      const w = dn.current, A = hn.current;
      if (w && A > 0 && f < A) {
        const X = Me.current, u = X.candleWidth * (1 + $e), N = Math.max(0, Math.floor(X.startIndex)), x = N + Math.round(y / u), V = 8, d = (J) => isNaN(J) || !isFinite(J) ? !1 : Math.abs(f - (A - (J - w.min) / w.range * A)) < V;
        let M = null;
        if (!M && r.movingAverages?.enabled && l.movingAverages) {
          for (const J of l.movingAverages)
            if (x >= 0 && x < J.data.length && d(J.data[x])) {
              M = "movingAverages";
              break;
            }
        }
        if (!M && r.bollinger?.enabled && l.bollinger) {
          const J = l.bollinger;
          x >= 0 && x < J.upper.length && (d(J.upper[x]) || d(J.middle[x]) || d(J.lower[x])) && (M = "bollinger");
        }
        if (!M && r.vwap?.enabled && l.vwap && x >= 0 && x < l.vwap.length && d(l.vwap[x]) && (M = "vwap"), !M && r.supertrend?.enabled && l.supertrend && x >= 0 && x < l.supertrend.length && l.supertrend[x] && d(l.supertrend[x].value) && (M = "supertrend"), !M && r.ichimoku?.enabled && l.ichimoku) {
          const J = l.ichimoku;
          x >= 0 && x < J.tenkan.length && (d(J.tenkan[x]) || d(J.kijun[x]) || d(J.senkouA[x]) || d(J.senkouB[x])) && (M = "ichimoku");
        }
        if (!M && r.keltner?.enabled && l.keltner) {
          const J = l.keltner;
          x >= 0 && x < J.upper.length && (d(J.upper[x]) || d(J.middle[x]) || d(J.lower[x])) && (M = "keltner");
        }
        if (!M && r.donchian?.enabled && l.donchian) {
          const J = l.donchian;
          x >= 0 && x < J.upper.length && (d(J.upper[x]) || d(J.middle[x]) || d(J.lower[x])) && (M = "donchian");
        }
        if (!M && r.envelopes?.enabled && l.envelopes) {
          const J = l.envelopes;
          x >= 0 && x < J.upper.length && (d(J.upper[x]) || d(J.basis[x]) || d(J.lower[x])) && (M = "envelopes");
        }
        if (!M && r?.volume?.enabled && A > 0 && f >= A * 0.8 && f <= A) {
          const J = x - N, We = Pn();
          if (J >= 0 && J < We.candles.length) {
            const G = We.candles[J].volume ?? 0;
            if (G > 0) {
              const Pe = A * 0.2, Ke = A, Fe = We.candles.map((Xe) => Xe.volume ?? 0).filter((Xe) => Xe > 0), ue = Fe.length > 0 ? Math.max(...Fe) : 1, Ne = G / ue * Pe * 0.95, et = Ke - Ne;
              f >= et && (M = "volume");
            }
          }
        }
        const ce = xe.width - Ve;
        if (!M && r?.volumeProfile?.enabled && A > 0 && y >= ce * (1 - (r.volumeProfile.rowWidth ?? 15) / 100)) {
          const J = Pn();
          if (J.candles.length > 0) {
            const We = r.volumeProfile.numberOfRows ?? 48, G = ce * ((r.volumeProfile.rowWidth ?? 15) / 100), Pe = r.volumeProfile.lookbackBars ?? 0, Ke = Pe > 0 ? J.candles.slice(-Pe) : J.candles;
            let Fe = 1 / 0, ue = -1 / 0;
            Ke.forEach((Xe) => {
              Fe = Math.min(Fe, Xe.low), ue = Math.max(ue, Xe.high);
            });
            const Ne = (ue - Fe || 1) / We, et = dn.current;
            if (et && et.range > 0) {
              const Xe = et.max - f / A * et.range, Ft = Math.floor((Xe - Fe) / Ne);
              if (Ft >= 0 && Ft < We) {
                const kn = new Float64Array(We);
                Ke.forEach((Rt) => {
                  if (!(!Rt.volume || Rt.volume <= 0))
                    for (let ds = 0; ds < We; ds++) {
                      const il = Fe + ds * Ne, Hl = il + Ne;
                      if (Rt.high >= il && Rt.low <= Hl) {
                        const Ro = Math.max(Rt.low, il), Po = Math.min(Rt.high, Hl), No = Rt.high - Rt.low > 0 ? (Po - Ro) / (Rt.high - Rt.low) : 1;
                        kn[ds] += Rt.volume * No;
                      }
                    }
                });
                let Zt = 0;
                for (let Rt = 0; Rt < We; Rt++)
                  kn[Rt] > Zt && (Zt = kn[Rt]);
                const _l = kn[Ft];
                if (_l > 0 && Zt > 0) {
                  const Rt = _l / Zt * G, ds = ce - Rt;
                  y >= ds && (M = "volumeProfile");
                }
              }
            }
          }
        }
        if (!M && r.customIndicators) {
          const We = (G) => isNaN(G) || !isFinite(G) ? !1 : Math.abs(f - (A - (G - w.min) / w.range * A)) < 14;
          for (const G of r.customIndicators) {
            const Pe = G.data;
            if (!(!G.enabled || G.display !== "overlay" || !Pe) && x >= 0 && x < Pe.length && We(Pe[x])) {
              const Ke = G.scriptId;
              M = typeof G.expression == "string" && G.expression.startsWith("brue:") && Ke ? `script-${Ke}` : `ci-${G.id}`;
              break;
            }
          }
        }
        if (!M) {
          const J = nn.current, We = [];
          if (r.rsi?.enabled && l.rsi) {
            const G = J.rsi;
            We.push({ key: "sp-rsi", check: () => {
              if (!G || f < G.top || f > G.bottom || x < 0 || x >= l.rsi.length) return !1;
              const Pe = l.rsi[x];
              if (isNaN(Pe) || !isFinite(Pe)) return !1;
              const Ke = G.bottom - G.top;
              return Math.abs(f - (G.top + Ke - Pe / 100 * Ke)) < V;
            } });
          }
          if (r.macd?.enabled && l.macd) {
            const G = J.macd;
            We.push({ key: "sp-macd", check: () => !(!G || f < G.top || f > G.bottom) });
          }
          if (r.stochastic?.enabled && l.stochastic) {
            const G = J.stochastic;
            We.push({ key: "sp-stochastic", check: () => {
              if (!G || f < G.top || f > G.bottom || x < 0 || x >= l.stochastic.k.length) return !1;
              const Pe = G.bottom - G.top, Ke = G.top + Pe - l.stochastic.k[x] / 100 * Pe, Fe = G.top + Pe - l.stochastic.d[x] / 100 * Pe;
              return Math.abs(f - Ke) < V || Math.abs(f - Fe) < V;
            } });
          }
          if (r.atr?.enabled && l.atr) {
            const G = J.atr;
            We.push({ key: "sp-atr", check: () => !(!G || f < G.top || f > G.bottom) });
          }
          for (const G of We)
            if (G.check()) {
              M = G.key;
              break;
            }
        }
        const De = Is.current;
        if (Is.current = M, M !== De && Ge.current) {
          const J = Tn.current !== "standard" ? "none" : "crosshair";
          Ge.current.style.cursor = M ? "pointer" : J;
        }
      } else if (Is.current && (Is.current = null, Ge.current && !or.current)) {
        const X = Tn.current !== "standard" ? "none" : "crosshair";
        Ge.current.style.cursor = X;
      }
    }
    const O = hn.current, $ = xe.height;
    if (O > 0 && Ge.current) {
      if (f > O && f < $ - 30)
        Ge.current.style.cursor = "pointer";
      else if (f <= O && !Is.current && !or.current) {
        const w = Tn.current !== "standard" ? "none" : "crosshair";
        Ge.current.style.cursor = w;
      }
    }
    let U = !1;
    for (const w of On.current) {
      const A = y - w.x, X = f - w.y;
      if (Math.sqrt(A * A + X * X) < 16) {
        ys.current = w, U = !0, Ge.current && (Ge.current.style.cursor = "pointer");
        break;
      }
    }
    if (U || (ys.current = null), it.current) {
      const w = dn.current, A = hn.current;
      if (w && w.range > 0 && A > 0) {
        const X = w.max - f / A * w.range;
        it.current === "sl" ? Ze.current = X : Qe.current = X, Ge.current && (Ge.current.style.cursor = el), xn.current === null && (xn.current = requestAnimationFrame(() => {
          lt(!1), xn.current = null;
        }));
        return;
      }
    }
    if (ze && ze.length > 0) {
      const w = dn.current, A = hn.current;
      if (w && w.range > 0 && A > 0) {
        let X = !1;
        for (const u of ze) {
          const N = (w.max - u.price) / w.range * A;
          if (y <= 160 && Math.abs(f - N) < 12) {
            X = !0;
            break;
          }
          if (u.id === Ye.current) {
            const V = Math.min(N + 10, A - 22 - 4), d = xe.width - Ve, M = 144 + 5 * 2, ce = (d - M) / 2;
            if (y >= ce - 8 && y <= ce + M + 8 && f >= V - 8 && f <= V + 22 + 8) {
              X = !0;
              break;
            }
          }
        }
        X && Ge.current && (Ge.current.style.cursor = "pointer");
      }
    }
    if (Ye.current && ze && ze.length > 0) {
      const w = dn.current, A = hn.current;
      if (w && w.range > 0 && A > 0) {
        const X = w.max - f / A * w.range, u = w.range * 0.012, N = ze.find((x) => x.id === Ye.current);
        if (N) {
          const x = N.side === "buy", V = ns(N.price), d = Ze.current ?? N.stopLoss ?? (x ? N.price - V : N.price + V), M = Qe.current ?? N.takeProfit ?? (x ? N.price + V : N.price - V), ce = Math.abs(X - d) < u, De = Math.abs(X - M) < u;
          if (ce || De)
            Ge.current && (Ge.current.style.cursor = uo), Xn.current = ce ? "sl" : "tp", lt(!1);
          else if (Xn.current && (Xn.current = null, lt(!1)), Ge.current) {
            const J = Tn.current !== "standard" ? "none" : "crosshair";
            Ge.current.style.cursor !== J && (Ge.current.style.cursor = J);
          }
        }
      }
    }
    if (Mn) {
      if (a.buttons === 0) {
        _n(!1), Bt(!1);
        return;
      }
      Bt(!0);
      const w = y - pn.x, A = f - pn.y, X = de.candleWidth * (1 + $e), u = w / X, N = Math.max(
        0,
        Math.min(s.length - 10, pn.startIndex - u)
      );
      if (Me.current = {
        startIndex: N,
        candleWidth: de.candleWidth
      }, rs && ot !== null) {
        const x = ot / yn.current / (xe.height - yt), V = A * x;
        qn.current = pn.priceOffset + V;
      }
      Hn.current === null && (Hn.current = requestAnimationFrame(() => {
        lt(!0), Wt(), St(), Hn.current = null;
      })), Mt.current && clearTimeout(Mt.current), Mt.current = setTimeout(() => {
        const x = Me.current;
        Dt((V) => ({
          ...V,
          startIndex: x.startIndex,
          // Keep float precision - no rounding
          autoFollowLatest: !1
        })), rs && Lt(qn.current), Bt(!1);
      }, 100);
      return;
    }
    const _ = Pn(), g = rl(y, _.startIndex);
    g >= 0 && g < s.length ? ct.current = g : ct.current = null, Wt();
  }, [Mn, pn, de.candleWidth, s.length, rs, ot, ve, xe.height, Wt, vn, Pn, rl, s]), Ca = o.useCallback((a) => {
    const p = Ge.current;
    if (!p) return;
    const b = p.getBoundingClientRect(), y = a.clientX - b.left, f = a.clientY - b.top;
    let e = !1;
    for (const _ of On.current) {
      const g = y - _.x, w = f - _.y;
      if (Math.sqrt(g * g + w * w) < 16) {
        e = !0, jn.current && jn.current.ts === _.ts && jn.current.x === _.x ? jn.current = null : jn.current = _, cn.current && cn.current();
        return;
      }
    }
    if (jn.current && !e && (jn.current = null, cn.current && cn.current()), Zn && r) {
      const _ = [
        { key: "bollinger", title: "BB", enabledCheck: () => !!(r?.bollinger?.enabled && l?.bollinger), endXSource: () => xo },
        { key: "movingAverages", title: "MA", enabledCheck: () => !!(r?.movingAverages?.enabled && l?.movingAverages), endXSource: () => mo },
        { key: "vwap", title: "VWAP", enabledCheck: () => !!(r?.vwap?.enabled && l?.vwap), endXSource: () => bo },
        { key: "ichimoku", title: "Ichimoku", enabledCheck: () => !!(r?.ichimoku?.enabled && l?.ichimoku), endXSource: () => ut.ichimoku || 0 },
        { key: "keltner", title: "Keltner", enabledCheck: () => !!(r?.keltner?.enabled && l?.keltner), endXSource: () => ut.keltner || 0 },
        { key: "volumeProfile", title: "Vol Profile", enabledCheck: () => !!r?.volumeProfile?.enabled, endXSource: () => go },
        { key: "volume", title: "Volume", enabledCheck: () => !!(r?.volume?.enabled && s.some((w) => w.volume)), endXSource: () => vo },
        { key: "supertrend", title: "Supertrend", enabledCheck: () => !!(r?.supertrend?.enabled && l?.supertrend), endXSource: () => ut.supertrend || 0 },
        { key: "donchian", title: "Donchian", enabledCheck: () => !!(r?.donchian?.enabled && l?.donchian), endXSource: () => ut.donchian || 0 },
        { key: "envelopes", title: "Envelopes", enabledCheck: () => !!(r?.envelopes?.enabled && l?.envelopes), endXSource: () => ut.envelopes || 0 },
        // Phase 2 overlays
        { key: "alma", title: "ALMA", enabledCheck: () => !!(r?.alma?.enabled && l?.alma), endXSource: () => ut.alma || 0 },
        { key: "kama", title: "KAMA", enabledCheck: () => !!(r?.kama?.enabled && l?.kama), endXSource: () => ut.kama || 0 },
        { key: "zlema", title: "ZLEMA", enabledCheck: () => !!(r?.zlema?.enabled && l?.zlema), endXSource: () => ut.zlema || 0 },
        { key: "t3", title: "T3", enabledCheck: () => !!(r?.t3?.enabled && l?.t3), endXSource: () => ut.t3 || 0 },
        { key: "lsma", title: "LSMA", enabledCheck: () => !!(r?.lsma?.enabled && l?.lsma), endXSource: () => ut.lsma || 0 },
        { key: "mcginley", title: "McGinley", enabledCheck: () => !!(r?.mcginley?.enabled && l?.mcginley), endXSource: () => ut.mcginley || 0 },
        { key: "wma", title: "WMA", enabledCheck: () => !!(r?.wma?.enabled && l?.wma), endXSource: () => ut.wma || 0 },
        { key: "smmaOverlay", title: "SMMA", enabledCheck: () => !!(r?.smmaOverlay?.enabled && l?.smmaOverlay), endXSource: () => ut.smmaOverlay || 0 },
        { key: "vwma", title: "VWMA", enabledCheck: () => !!(r?.vwma?.enabled && l?.vwma), endXSource: () => ut.vwma || 0 },
        { key: "medianPrice", title: "Median", enabledCheck: () => !!(r?.medianPrice?.enabled && l?.medianPrice), endXSource: () => ut.medianPrice || 0 },
        { key: "typicalPrice", title: "Typical", enabledCheck: () => !!(r?.typicalPrice?.enabled && l?.typicalPrice), endXSource: () => ut.typicalPrice || 0 },
        { key: "weightedClose", title: "WClose", enabledCheck: () => !!(r?.weightedClose?.enabled && l?.weightedClose), endXSource: () => ut.weightedClose || 0 },
        { key: "zigzag", title: "ZigZag", enabledCheck: () => !!(r?.zigzag?.enabled && l?.zigzag), endXSource: () => ut.zigzag || 0 },
        { key: "alligator", title: "Alligator", enabledCheck: () => !!(r?.alligator?.enabled && l?.alligator), endXSource: () => ut.alligator || 0 },
        { key: "priceChannel", title: "Price Ch", enabledCheck: () => !!(r?.priceChannel?.enabled && l?.priceChannel), endXSource: () => ut.priceChannel || 0 },
        { key: "chandeKroll", title: "Chande Kroll", enabledCheck: () => !!(r?.chandeKroll?.enabled && l?.chandeKroll), endXSource: () => ut.chandeKroll || 0 },
        { key: "chandelierExit", title: "Chandelier", enabledCheck: () => !!(r?.chandelierExit?.enabled && l?.chandelierExit), endXSource: () => ut.chandelierExit || 0 },
        { key: "accBands", title: "Acc Bands", enabledCheck: () => !!(r?.accBands?.enabled && l?.accBands), endXSource: () => ut.accBands || 0 },
        { key: "demarkPivots", title: "DeMark", enabledCheck: () => !!(r?.demarkPivots?.enabled && l?.demarkPivots), endXSource: () => ut.demarkPivots || 0 },
        { key: "fractals", title: "Fractals", enabledCheck: () => !!(r?.fractals?.enabled && l?.fractals), endXSource: () => ut.fractals || 0 }
      ];
      let g = 28;
      for (const w of _) {
        if (!w.enabledCheck()) continue;
        const A = xe.width < 500 ? 14 : 19, X = w.endXSource();
        if (w.key === "movingAverages" && l?.movingAverages?.length > 0) {
          const N = r.movingAverages?.lines ?? [], x = r?.customBrueScripts || {};
          let V = 0;
          for (let d = 0; d < l.movingAverages.length; d++) {
            const M = N[d]?.sourceScriptId;
            if (M && x[M]?.enabled) continue;
            const ce = g + V * A - 10, De = ce + A;
            if (X > 0 && y >= 0 && y <= X && f >= ce && f <= De) {
              const J = `movingAverages__${d}`;
              fe((We) => We === J ? null : J), ye(J);
              return;
            }
            V++;
          }
          g += V * A;
          continue;
        }
        const u = A;
        if (X > 0 && y >= 0 && y <= X && f >= g - 10 && f <= g - 10 + u) {
          fe((N) => N === w.key ? null : w.key), ye(w.key);
          return;
        }
        g += u;
      }
    }
    if (r && l) {
      const _ = dn.current, g = hn.current;
      if (_ && g > 0) {
        const w = Me.current, A = w.candleWidth * (1 + $e);
        xe.width - Ve;
        const u = Math.max(0, Math.floor(w.startIndex)) + Math.round(y / A), N = 8, x = (d) => {
          if (isNaN(d) || !isFinite(d)) return !1;
          const M = g - (d - _.min) / _.range * g;
          return Math.abs(f - M) < N;
        };
        if (r.movingAverages?.enabled && l.movingAverages)
          for (let d = 0; d < l.movingAverages.length; d++) {
            const M = l.movingAverages[d];
            if (u >= 0 && u < M.data.length && x(M.data[u])) {
              const ce = `movingAverages__${d}`;
              fe((De) => De === ce ? null : ce), ye(ce);
              return;
            }
          }
        if (r.bollinger?.enabled && l.bollinger) {
          const d = l.bollinger;
          if (u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.middle[u]) || x(d.lower[u]))) {
            fe((M) => M === "bollinger" ? null : "bollinger"), ye("bollinger");
            return;
          }
        }
        if (r.vwap?.enabled && l.vwap && u >= 0 && u < l.vwap.length && x(l.vwap[u])) {
          fe((d) => d === "vwap" ? null : "vwap"), ye("vwap");
          return;
        }
        if (r.supertrend?.enabled && l.supertrend && u >= 0 && u < l.supertrend.length) {
          const d = l.supertrend[u];
          if (d && x(d.value)) {
            fe((M) => M === "supertrend" ? null : "supertrend"), ye("supertrend");
            return;
          }
        }
        if (r.ichimoku?.enabled && l.ichimoku) {
          const d = l.ichimoku;
          if (u >= 0 && u < d.tenkan.length && (x(d.tenkan[u]) || x(d.kijun[u]) || x(d.senkouA[u]) || x(d.senkouB[u]))) {
            fe((M) => M === "ichimoku" ? null : "ichimoku"), ye("ichimoku");
            return;
          }
        }
        if (r.keltner?.enabled && l.keltner) {
          const d = l.keltner;
          if (u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.middle[u]) || x(d.lower[u]))) {
            fe((M) => M === "keltner" ? null : "keltner"), ye("keltner");
            return;
          }
        }
        if (r.donchian?.enabled && l.donchian) {
          const d = l.donchian;
          if (u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.middle[u]) || x(d.lower[u]))) {
            fe((M) => M === "donchian" ? null : "donchian"), ye("donchian");
            return;
          }
        }
        if (r.envelopes?.enabled && l.envelopes) {
          const d = l.envelopes;
          if (u >= 0 && u < d.upper.length && (x(d.upper[u]) || x(d.basis[u]) || x(d.lower[u]))) {
            fe((M) => M === "envelopes" ? null : "envelopes"), ye("envelopes");
            return;
          }
        }
        const V = ["dema", "tema", "hma"];
        for (const d of V)
          if (r[d]?.enabled && l[d]) {
            const M = l[d];
            if (Array.isArray(M) && u >= 0 && u < M.length && x(M[u])) {
              fe((ce) => ce === d ? null : d), ye(d);
              return;
            }
          }
      }
    }
    if (r?.volume?.enabled) {
      const _ = hn.current;
      if (_ > 0 && f >= _ * 0.8 && f <= _) {
        fe((g) => g === "volume" ? null : "volume"), ye("volume");
        return;
      }
    }
    if (Is.current === "volumeProfile") {
      fe((_) => _ === "volumeProfile" ? null : "volumeProfile"), ye("volumeProfile");
      return;
    }
    const O = Is.current;
    if (O && (O.startsWith("ci-") || O.startsWith("script-"))) {
      fe((_) => _ === O ? null : O), ye(O);
      return;
    }
    const $ = nn.current, U = [
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
      const g = $[_];
      if (g && f >= g.top && f <= g.top + 25 && y <= 200) {
        const w = `sp-${_}`;
        fe((A) => A === w ? null : w), ye(w);
        return;
      }
    }
    if (r && l) {
      const _ = Me.current, g = _.candleWidth * (1 + $e), w = Math.max(0, Math.floor(_.startIndex)), A = w + Math.round(y / g), X = 10, u = (x, V) => {
        if (!V) return !1;
        const d = $[x];
        if (!d || f < d.top || f > d.bottom || A < 0 || A >= V.length) return !1;
        const M = V[A];
        if (isNaN(M) || !isFinite(M)) return !1;
        const ce = d.bottom - d.top, De = d.top + ce - M / 100 * ce;
        return Math.abs(f - De) < X;
      }, N = (x, V) => {
        const d = $[x];
        if (!d || f < d.top || f > d.bottom) return !1;
        const M = d.bottom - d.top;
        let ce = 1 / 0, De = -1 / 0;
        const J = xe.width - Ve, We = Math.floor(J / g), G = Math.max(0, w), Pe = Math.min(G + We, V[0]?.length ?? 0);
        for (const Ne of V)
          if (Ne)
            for (let et = G; et < Pe; et++) {
              const Xe = Ne[et];
              !isNaN(Xe) && isFinite(Xe) && (Xe < ce && (ce = Xe), Xe > De && (De = Xe));
            }
        if (ce >= De) return !1;
        const Fe = (De - ce) * 0.1;
        ce -= Fe, De += Fe;
        const ue = De - ce;
        if (A < 0) return !1;
        for (const Ne of V) {
          if (!Ne || A >= Ne.length) continue;
          const et = Ne[A];
          if (isNaN(et) || !isFinite(et)) continue;
          const Xe = d.top + M - (et - ce) / ue * M;
          if (Math.abs(f - Xe) < X) return !0;
        }
        return !1;
      };
      if (r.rsi?.enabled && u("rsi", l.rsi)) {
        fe((x) => x === "sp-rsi" ? null : "sp-rsi"), ye("sp-rsi");
        return;
      }
      if (r.stochastic?.enabled && l.stochastic && (u("stochastic", l.stochastic.k) || u("stochastic", l.stochastic.d))) {
        fe((x) => x === "sp-stochastic" ? null : "sp-stochastic"), ye("sp-stochastic");
        return;
      }
      if (r.macd?.enabled && l.macd && N("macd", [l.macd.macd, l.macd.signal])) {
        fe((x) => x === "sp-macd" ? null : "sp-macd"), ye("sp-macd");
        return;
      }
      if (r.atr?.enabled && l.atr && N("atr", [l.atr])) {
        fe((x) => x === "sp-atr" ? null : "sp-atr"), ye("sp-atr");
        return;
      }
      if (r.williamsR?.enabled && l.williamsR) {
        const x = $.williamsR;
        if (x && f >= x.top && f <= x.bottom && A >= 0 && A < l.williamsR.length) {
          const V = l.williamsR[A];
          if (!isNaN(V) && isFinite(V)) {
            const d = x.bottom - x.top, M = x.top + d - (V + 100) / 100 * d;
            if (Math.abs(f - M) < X) {
              fe((ce) => ce === "sp-williamsR" ? null : "sp-williamsR"), ye("sp-williamsR");
              return;
            }
          }
        }
      }
      if (r.cci?.enabled && l.cci && N("cci", [l.cci])) {
        fe((x) => x === "sp-cci" ? null : "sp-cci"), ye("sp-cci");
        return;
      }
      if (r.adx?.enabled && l.adx && (u("adx", l.adx.adx) || u("adx", l.adx.plusDI) || u("adx", l.adx.minusDI))) {
        fe((x) => x === "sp-adx" ? null : "sp-adx"), ye("sp-adx");
        return;
      }
      if (r.roc?.enabled && l.roc && N("roc", [l.roc])) {
        fe((x) => x === "sp-roc" ? null : "sp-roc"), ye("sp-roc");
        return;
      }
      if (r.aroon?.enabled && l.aroon && (u("aroon", l.aroon.up) || u("aroon", l.aroon.down))) {
        fe((x) => x === "sp-aroon" ? null : "sp-aroon"), ye("sp-aroon");
        return;
      }
      if (r.tsi?.enabled && l.tsi && N("tsi", [l.tsi.tsi, l.tsi.signal])) {
        fe((x) => x === "sp-tsi" ? null : "sp-tsi"), ye("sp-tsi");
        return;
      }
      if (r.trix?.enabled && l.trix && N("trix", [l.trix.trix, l.trix.signal])) {
        fe((x) => x === "sp-trix" ? null : "sp-trix"), ye("sp-trix");
        return;
      }
      if (r.kst?.enabled && l.kst && N("kst", [l.kst.kst, l.kst.signal])) {
        fe((x) => x === "sp-kst" ? null : "sp-kst"), ye("sp-kst");
        return;
      }
      if (r.stochRsi?.enabled && l.stochRsi && (u("stochRsi", l.stochRsi.k) || u("stochRsi", l.stochRsi.d))) {
        fe((x) => x === "sp-stochRsi" ? null : "sp-stochRsi"), ye("sp-stochRsi");
        return;
      }
      for (const x of U) {
        const V = $[x];
        if (V && f >= V.top && f <= V.bottom) {
          const d = l[x];
          if (d && Array.isArray(d) && N(x, [d])) {
            const M = `sp-${x}`;
            fe((ce) => ce === M ? null : M), ye(M);
            return;
          }
        }
      }
    }
    if (sl && Hs(null), It && fe(null), Rn && vt(null), ze && ze.length > 0 && Date.now() - Il.current > 500) {
      const _ = dn.current, g = hn.current;
      if (_ && _.range > 0 && g > 0) {
        const w = _.max - f / g * _.range, A = _.range * 6e-3;
        if (Ye.current) {
          const u = ze.find((N) => N.id === Ye.current);
          if (u) {
            const N = (_.max - u.price) / _.range * g, x = 22, V = Math.min(N + 10, g - x - 4), d = 5, M = 45, ce = 55, De = 44, J = xe.width - Ve, We = M + ce + De + d * 2, Pe = (J - We) / 2, Ke = Pe + M + d, Fe = Ke + ce + d, ue = 8;
            if (y >= Pe - ue && y <= Pe + M + ue && f >= V - ue && f <= V + x + ue) {
              if (Yt) {
                const Ne = u.side === "buy", et = ns(u.price), Xe = Ze.current ?? u.stopLoss ?? (Ne ? u.price - et : u.price + et), Ft = Qe.current ?? u.takeProfit ?? (Ne ? u.price + et : u.price - et);
                Yt(Ye.current, Xe, Ft);
              }
              Ye.current = null, Ze.current = null, Qe.current = null, it.current = null, Kt((Ne) => Ne + 1), lt(!1);
              return;
            }
            if (y >= Ke - ue && y <= Ke + ce + ue && f >= V - ue && f <= V + x + ue) {
              Ye.current = null, Ze.current = null, Qe.current = null, it.current = null, Kt((Ne) => Ne + 1), lt(!1);
              return;
            }
            if (y >= Fe - ue && y <= Fe + De + ue && f >= V - ue && f <= V + x + ue) {
              en && en(Ye.current), Ye.current = null, Ze.current = null, Qe.current = null, it.current = null, Kt((Ne) => Ne + 1), lt(!1);
              return;
            }
          }
        }
        if (Ye.current) {
          const u = ze.find((N) => N.id === Ye.current);
          if (u) {
            const N = u.side === "buy", x = ns(u.price), V = Ze.current ?? u.stopLoss ?? (N ? u.price - x : u.price + x), d = Qe.current ?? u.takeProfit ?? (N ? u.price + x : u.price - x);
            if (Math.abs(w - V) < A) {
              it.current = "sl", Ze.current = V;
              return;
            }
            if (Math.abs(w - d) < A) {
              it.current = "tp", Qe.current = d;
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
          it.current = null, Kt((u) => u + 1), lt(!1);
          return;
        }
      }
    }
    _n(!0), Rl({ x: y, y: f, startIndex: de.startIndex, priceOffset: Re });
  }, [de.startIndex, Re, sl, It, Rn, ze, Yt, en, tn]), Co = o.useCallback(() => {
    if (it.current && Ye.current) {
      it.current = null, Ge.current && (Ge.current.style.cursor = Tn.current !== "standard" ? "none" : "crosshair"), lt(!1);
      return;
    }
    if (jt.current) {
      Bt(!1);
      const a = Me.current;
      if (lt(!1), Se) {
        const p = xe.width - Ve, b = de.candleWidth * (1 + $e), y = Math.floor(p / b), f = a.startIndex + y, e = s.length - 1 < f;
        Wn.current = !e;
      }
      Dt((p) => ({
        ...p,
        startIndex: a.startIndex,
        // Keep float precision - no rounding
        autoFollowLatest: !1
      }));
    }
    Hn.current !== null && (cancelAnimationFrame(Hn.current), Hn.current = null), _n(!1);
  }, [Yt, en]);
  o.useEffect(() => {
    if (!Mn) return;
    const a = () => {
      Co();
    };
    return window.addEventListener("mouseup", a), () => {
      window.removeEventListener("mouseup", a);
    };
  }, [Mn, Co]), o.useEffect(() => {
    const a = (p) => {
      Ye.current && (p.key === "Enter" ? (p.preventDefault(), Yt && Yt(Ye.current, Ze.current ?? void 0, Qe.current ?? void 0), Ye.current = null, Ze.current = null, Qe.current = null, it.current = null, Kt((b) => b + 1), lt(!1)) : (p.key === "Escape" || p.key === "Backspace") && (p.preventDefault(), Ye.current = null, Ze.current = null, Qe.current = null, it.current = null, Kt((b) => b + 1), lt(!1)));
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [Yt, en]), o.useEffect(() => {
    const a = (p) => {
      if (!It || !r || !ke) return;
      const b = p.target?.tagName;
      if (!(b === "INPUT" || b === "TEXTAREA" || b === "SELECT"))
        if (p.key === "Backspace" || p.key === "Delete") {
          p.preventDefault();
          const y = It.startsWith("sp-") ? It.replace("sp-", "") : It.startsWith("movingAverages__") ? "movingAverages" : It, f = r[y];
          f && ke({ ...r, [y]: { ...f, enabled: !1 } }), fe(null);
        } else p.key === "Escape" && fe(null);
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [It, r, ke]);
  const Ia = o.useCallback(() => {
    bt.current && clearTimeout(bt.current), bt.current = setTimeout(() => {
      if (sn.current) return;
      Ht.current = null, ct.current = null, ys.current = null;
      const a = Ge.current, p = a?.getContext("2d");
      p && a && p.clearRect(0, 0, a.width, a.height), cn.current && cn.current(), is(), _n(!1), Ct(!1), ne && ne(null, null);
    }, 50);
  }, [ne, is]);
  o.useEffect(() => {
    if (!Ss && !Cs) return;
    const a = (y) => {
      const e = (tl.current.y - y.clientY) / 150, O = Math.max(0.1, Math.min(10, tl.current.scale + e));
      yn.current = O, lt(!0), St(), Gn.current && clearTimeout(Gn.current), Gn.current = setTimeout(() => {
        ft(yn.current);
      }, 100);
    }, p = () => {
      Ct(!1), ea(!1), ft(yn.current), St();
    }, b = (y) => {
      if (y.touches.length !== 1) return;
      y.preventDefault();
      const e = (tl.current.y - y.touches[0].clientY) / 150, O = Math.max(0.1, Math.min(10, tl.current.scale + e));
      yn.current = O, lt(!0), St(), Gn.current && clearTimeout(Gn.current), Gn.current = setTimeout(() => {
        ft(yn.current);
      }, 100);
    };
    return window.addEventListener("mousemove", a), window.addEventListener("mouseup", p), window.addEventListener("touchmove", b, { passive: !1 }), window.addEventListener("touchend", p), window.addEventListener("touchcancel", p), () => {
      window.removeEventListener("mousemove", a), window.removeEventListener("mouseup", p), window.removeEventListener("touchmove", b), window.removeEventListener("touchend", p), window.removeEventListener("touchcancel", p);
    };
  }, [Ss, Cs, St]);
  const Ta = o.useCallback((a) => {
    if (a.preventDefault(), a.touches.length === 1) {
      const p = a.touches[0], b = Ge.current;
      if (!b) return;
      const y = b.getBoundingClientRect(), f = p.clientX - y.left, e = p.clientY - y.top;
      if (ws.current = { x: f, y: e }, st.current && (clearTimeout(st.current), st.current = null), vn) {
        ks(!1), Ht.current = null;
        const _ = b.getContext("2d");
        _ && _.clearRect(0, 0, b.width, b.height);
      }
      const O = Date.now();
      Un.current = !0, Kn.current = O;
      const $ = O - Nl.current;
      if (Nl.current = O, !($ < 300)) {
        const _ = O;
        st.current = setTimeout(() => {
          Kn.current === _ && Un.current && (ks(!0), Ht.current = { x: f, y: e }, Ut.current !== null && cancelAnimationFrame(Ut.current), Ut.current = requestAnimationFrame(() => {
            Wt(), Ut.current = null;
          })), st.current = null;
        }, 400);
      }
      if (ze && ze.length > 0) {
        Il.current = Date.now();
        const _ = dn.current, g = hn.current;
        if (_ && _.range > 0 && g > 0) {
          const w = _.max - e / g * _.range, A = _.range * 0.015;
          if (Ye.current) {
            const u = ze.find((N) => N.id === Ye.current);
            if (u) {
              const N = (_.max - u.price) / _.range * g, x = 22, V = Math.min(N + 10, g - x - 4), d = 5, M = xe.width - Ve, ce = 45, De = 55, J = 44, We = ce + De + J + d * 2, Pe = (M - We) / 2, Ke = Pe + ce + d, Fe = Ke + De + d, ue = 12;
              if (f >= Pe - ue && f <= Pe + ce + ue && e >= V - ue && e <= V + x + ue) {
                Yt && Yt(Ye.current, Ze.current ?? void 0, Qe.current ?? void 0), Ye.current = null, Ze.current = null, Qe.current = null, it.current = null, Kt((Ne) => Ne + 1), lt(!1);
                return;
              }
              if (f >= Ke - ue && f <= Ke + De + ue && e >= V - ue && e <= V + x + ue) {
                Ye.current = null, Ze.current = null, Qe.current = null, it.current = null, Kt((Ne) => Ne + 1), lt(!1);
                return;
              }
              if (f >= Fe - ue && f <= Fe + J + ue && e >= V - ue && e <= V + x + ue) {
                en && en(Ye.current), Ye.current = null, Ze.current = null, Qe.current = null, it.current = null, Kt((Ne) => Ne + 1), lt(!1);
                return;
              }
            }
          }
          if (Ye.current) {
            const u = ze.find((N) => N.id === Ye.current);
            if (u) {
              const N = u.side === "buy", x = ns(u.price), V = Ze.current ?? u.stopLoss ?? (N ? u.price - x : u.price + x), d = Qe.current ?? u.takeProfit ?? (N ? u.price + x : u.price - x);
              if (Math.abs(w - V) < A) {
                it.current = "sl", Ze.current = V, st.current && (clearTimeout(st.current), st.current = null);
                return;
              }
              if (Math.abs(w - d) < A) {
                it.current = "tp", Qe.current = d, st.current && (clearTimeout(st.current), st.current = null);
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
            it.current = null, st.current && (clearTimeout(st.current), st.current = null), Kt((u) => u + 1), lt(!1);
            return;
          }
        }
      }
      _n(!0), Rl({ x: f, y: e, startIndex: de.startIndex, priceOffset: Re });
    }
  }, [de.startIndex, Re, Wt, vn]), Bl = o.useRef(null), pr = o.useCallback((a) => {
    if (a.touches.length === 2) {
      a.preventDefault();
      const p = a.touches[0], b = a.touches[1], y = Math.hypot(
        b.clientX - p.clientX,
        b.clientY - p.clientY
      );
      if (Bl.current !== null) {
        const f = Me.current.candleWidth, e = Me.current.startIndex, $ = 1 + (y / Bl.current - 1) * 1.3, U = Math.max(
          Al,
          Math.min(Dl, f * $)
        ), _ = Ge.current;
        if (_) {
          const g = _.getBoundingClientRect(), w = (p.clientX + b.clientX) / 2 - g.left, A = f * (1 + $e), X = U * (1 + $e), u = e + w / A, N = Math.max(0, u - w / X);
          Me.current = { startIndex: N, candleWidth: U }, lt(!0), St(), jt.current || Bt(!0);
        }
      }
      Bl.current = y;
    }
  }, [St]), ja = o.useCallback((a) => {
    if (a.touches.length === 2) {
      pr(a), st.current && (clearTimeout(st.current), st.current = null);
      return;
    }
    if (a.touches.length === 1) {
      const p = a.touches[0], b = Ge.current;
      if (!b) return;
      const y = b.getBoundingClientRect(), f = p.clientX - y.left, e = p.clientY - y.top;
      if (st.current && ws.current) {
        const O = Math.abs(f - ws.current.x), $ = Math.abs(e - ws.current.y);
        (O > 10 || $ > 10) && (clearTimeout(st.current), st.current = null);
      }
      if (vn && (Ht.current = { x: f, y: e }, Ut.current !== null && cancelAnimationFrame(Ut.current), Ut.current = requestAnimationFrame(() => {
        Wt(), Ut.current = null;
      })), it.current) {
        a.preventDefault();
        const O = dn.current, $ = hn.current;
        if (O && O.range > 0 && $ > 0) {
          const U = O.max - e / $ * O.range;
          it.current === "sl" ? Ze.current = U : Qe.current = U, xn.current === null && (xn.current = requestAnimationFrame(() => {
            lt(!1), xn.current = null;
          }));
        }
        return;
      }
      if (Mn && !vn) {
        a.preventDefault(), Bt(!0);
        const O = f - pn.x, $ = e - pn.y, U = de.candleWidth * (1 + $e), _ = O / U, g = Math.max(
          0,
          Math.min(s.length - 10, pn.startIndex - _)
        );
        if (rs && ot !== null) {
          const w = ot / yn.current / (xe.height - yt), A = $ * w;
          qn.current = pn.priceOffset + A;
        }
        Me.current = {
          startIndex: g,
          candleWidth: de.candleWidth
        }, un.current === null && (un.current = requestAnimationFrame(() => {
          lt(!0), St(), un.current = null;
        }));
      }
    }
  }, [Mn, pn, de.candleWidth, s.length, pr, Wt, vn, rs, ot, xe.height, ze]), Ma = o.useCallback(() => {
    if (Un.current = !1, Kn.current = 0, st.current && (clearTimeout(st.current), st.current = null), it.current && Ye.current) {
      it.current = null, lt(!1), Un.current = !1, Kn.current = 0, st.current && (clearTimeout(st.current), st.current = null);
      return;
    }
    if (vn) {
      ks(!1), Ht.current = null;
      const a = Ge.current, p = a?.getContext("2d");
      p && a && p.clearRect(0, 0, a.width, a.height), ne && ne(null, null);
    }
    if (jt.current) {
      Bt(!1);
      const a = Me.current;
      if (lt(!1), Se) {
        const p = xe.width - Ve, b = de.candleWidth * (1 + $e), y = Math.floor(p / b), f = a.startIndex + y, e = s.length - 1 < f;
        Wn.current = !e;
      }
      Dt((p) => ({
        ...p,
        startIndex: a.startIndex,
        // Keep float precision - no rounding
        candleWidth: a.candleWidth,
        // Pick up pinch-zoom final width
        autoFollowLatest: !1
      })), rs && Lt(qn.current);
    }
    _n(!1), Bl.current = null, ws.current = null, Qs.current = null, un.current !== null && (cancelAnimationFrame(un.current), un.current = null);
  }, [vn, ne, rs]);
  o.useCallback((a) => {
    let p = as[0], b = Math.abs(a - p);
    for (const y of as) {
      const f = Math.abs(a - y);
      f < b && (b = f, p = y);
    }
    return p;
  }, [as]);
  const Io = o.useCallback((a, p) => {
    const b = as.findIndex((y) => y >= a - 1e-3);
    if (p) {
      const y = Math.min(as.length - 1, b + 1);
      return as[y];
    } else {
      const y = Math.max(0, b - 1);
      return as[y];
    }
  }, [as]), To = o.useCallback((a) => {
    const p = a.ctrlKey || a.metaKey;
    if (!ko.current && !p) {
      const x = Math.abs(a.deltaX) > Math.abs(a.deltaY), V = a.shiftKey && a.deltaY !== 0;
      if (x || V) {
        a.preventDefault();
        const d = Me.current.startIndex, M = Me.current.candleWidth, ce = M * (1 + $e);
        Bt(!0);
        const De = V ? a.deltaY : a.deltaX, J = 0.2 + (ll - 1) * 0.2, We = De * J / ce, G = Math.max(
          0,
          Math.min(s.length - 10, d + We)
        );
        Me.current = { startIndex: G, candleWidth: M }, Mt.current && clearTimeout(Mt.current), Mt.current = setTimeout(() => {
          if (Se) {
            const Ke = xe.width - Ve, Fe = Me.current.candleWidth * (1 + $e), ue = Math.floor(Ke / Fe), Ne = Me.current.startIndex + ue;
            Wn.current = !(s.length - 1 < Ne);
          }
          const Pe = Me.current;
          Dt((Ke) => ({
            ...Ke,
            startIndex: Pe.startIndex,
            autoFollowLatest: !1
          })), Bt(!1);
        }, 150), $t.current === null && ($t.current = requestAnimationFrame(() => {
          lt(!0), Wt(), St(), $t.current = null;
        }));
        return;
      }
    }
    a.preventDefault(), Bt(!0);
    const b = Ge.current;
    if (!b) return;
    const y = b.getBoundingClientRect(), f = a.clientX - y.left, e = a.clientY - y.top;
    Ht.current = { x: f, y: e };
    const O = Me.current.startIndex, $ = Me.current.candleWidth, U = $ * (1 + $e);
    if (Math.abs(a.deltaX) > Math.abs(a.deltaY) || a.shiftKey) {
      const x = a.shiftKey ? a.deltaY : a.deltaX, V = ko.current ? 0.02 + (ll - 1) * 0.02 : 0.2 + (ll - 1) * 0.2, d = x * V / U, M = Math.max(
        0,
        Math.min(s.length - 10, O + d)
      );
      Me.current = { startIndex: M, candleWidth: $ }, $t.current === null && ($t.current = requestAnimationFrame(() => {
        lt(!0), Wt(), St(), $t.current = null;
      })), Mt.current && clearTimeout(Mt.current), Mt.current = setTimeout(() => {
        if (Se) {
          const De = xe.width - Ve, J = Me.current.candleWidth * (1 + $e), We = Math.floor(De / J), G = Me.current.startIndex + We;
          Wn.current = !(s.length - 1 < G);
        }
        const ce = Me.current;
        Dt((De) => ({
          ...De,
          startIndex: ce.startIndex,
          // Keep float precision - no rounding
          autoFollowLatest: !1
        })), Bt(!1);
      }, 150);
      return;
    }
    if (ko.current) {
      qt.current += a.deltaY, os.current && clearTimeout(os.current), os.current = setTimeout(() => {
        qt.current = 0;
      }, 200);
      const x = 220 - ll * 20;
      if (Math.abs(qt.current) < x)
        return;
      const V = qt.current < 0;
      qt.current = 0;
      const d = Io($, V);
      if (d === $) return;
      const M = xe.width - Ve, ce = $ * (1 + $e), De = d * (1 + $e), J = O + M / ce, We = Math.max(0, J - M / De);
      Bt(!0), Me.current = { startIndex: We, candleWidth: d }, $t.current === null && ($t.current = requestAnimationFrame(() => {
        lt(!0), Wt(), St(), $t.current = null;
      })), Mt.current && clearTimeout(Mt.current), Mt.current = setTimeout(() => {
        const G = Me.current;
        Dt((Pe) => ({
          ...Pe,
          candleWidth: G.candleWidth,
          startIndex: G.startIndex,
          // Keep float precision
          autoFollowLatest: !1
        })), Bt(!1);
      }, 100);
      return;
    }
    const _ = a.deltaY < 0, g = Io($, _);
    if (g === $) return;
    const w = xe.width - Ve, A = $ * (1 + $e), X = g * (1 + $e), u = O + w / A, N = Math.max(0, u - w / X);
    Bt(!0), Me.current = { startIndex: N, candleWidth: g }, $t.current === null && ($t.current = requestAnimationFrame(() => {
      lt(!0), Wt(), St(), $t.current = null;
    })), Mt.current && clearTimeout(Mt.current), Mt.current = setTimeout(() => {
      const x = Me.current;
      Dt((V) => ({
        ...V,
        candleWidth: x.candleWidth,
        startIndex: x.startIndex,
        // Keep float precision
        autoFollowLatest: !1
      })), Bt(!1);
    }, 100);
  }, [s.length, Wt, Io, xe.width, xe.height, ll, mt, Pn, n, Ts, de.autoFollowLatest, St]), xr = o.useRef(To), mr = o.useRef(So);
  o.useEffect(() => {
    xr.current = To;
  }, [To]), o.useEffect(() => {
    mr.current = So;
  }, [So]);
  const Ra = o.useRef(null), cs = o.useRef(null), us = o.useRef(null), Pa = o.useCallback((a) => {
    if (cs.current && (cs.current.el.removeEventListener("wheel", cs.current.fn), cs.current = null), Ge.current = a, a) {
      const p = (b) => xr.current(b);
      a.addEventListener("wheel", p, { passive: !1 }), cs.current = { el: a, fn: p };
    }
  }, []), Na = o.useCallback((a) => {
    if (us.current && (us.current.el.removeEventListener("wheel", us.current.fn), us.current = null), Ra.current = a, a) {
      const p = (b) => mr.current(b);
      a.addEventListener("wheel", p, { passive: !1 }), us.current = { el: a, fn: p };
    }
  }, []);
  o.useEffect(() => () => {
    cs.current && cs.current.el.removeEventListener("wheel", cs.current.fn), us.current && us.current.el.removeEventListener("wheel", us.current.fn);
  }, []), o.useLayoutEffect(() => {
    const a = at.current;
    if (!a) return;
    const p = a.getBoundingClientRect();
    p.width > 0 && p.height > 0 && Zs({ width: Math.round(p.width), height: Math.round(p.height) });
    const b = new ResizeObserver((y) => {
      for (const f of y) {
        const e = Math.round(f.contentRect.width), O = Math.round(f.contentRect.height);
        e > 0 && O > 0 && Ar.flushSync(() => {
          Zs(
            ($) => $.width === e && $.height === O ? $ : { width: e, height: O }
          );
        });
      }
    });
    return b.observe(a), () => b.disconnect();
  }, []), o.useEffect(() => {
    gt && gt.width > 0 && gt.height > 0 && Zs(gt);
  }, [gt]);
  const br = o.useRef(`${h}|${rn}`);
  o.useLayoutEffect(() => {
    const a = `${h}|${rn}`;
    br.current !== a && (br.current = a, !Se && Dt((p) => p.autoFollowLatest ? p : { ...p, autoFollowLatest: !0 }));
  }, [h, rn, Se]), o.useLayoutEffect(() => {
    if (s.length === 0) return;
    if (Se) {
      const e = vs.current, O = xe.width - Ve, $ = de.candleWidth * (1 + $e), U = Math.floor(O / $), _ = Math.floor(U * 0.9), w = Bn.current <= 300 && xe.width > 300;
      if (Bn.current = xe.width, s.length !== e || e === 0 || w) {
        const A = e > 0 && s.length < e, X = Math.max(0, Math.floor(de.startIndex)), u = Math.min(s.length, X + U), N = s.length - 1 < u;
        if (e === 0 || A || w || N && !Wn.current) {
          const x = Math.max(0, s.length - 1 - _);
          Dt((V) => ({ ...V, startIndex: x, autoFollowLatest: !1 })), A && (Wn.current = !1);
        }
      }
      vs.current = s.length;
      return;
    }
    if (!de.autoFollowLatest) {
      if (de.startIndex > s.length - 1) {
        const e = xe.width - Ve, O = de.candleWidth * (1 + $e), $ = Math.max(1, Math.floor(e / O));
        Dt((U) => ({ ...U, startIndex: Math.max(0, s.length - $) }));
      }
      return;
    }
    const a = xe.width - Ve, p = de.candleWidth * (1 + $e), b = Math.floor(a / p);
    if (s.length > 0 && s.length < b * 0.75) {
      const e = Math.min(
        Dl,
        a * 0.92 / (s.length * (1 + $e))
      );
      if (e > de.candleWidth * 1.05) {
        Me.current = { startIndex: 0, candleWidth: e }, Dt((O) => ({ ...O, startIndex: 0, candleWidth: e })), vs.current = s.length;
        return;
      }
    }
    const y = Math.min(de.futureSpace, Math.floor(b * 0.3)), f = Math.max(0, s.length - b + y);
    Dt((e) => ({ ...e, startIndex: f })), vs.current = s.length;
  }, [s.length, xe.width, de.autoFollowLatest, de.candleWidth, de.futureSpace, de.startIndex, Se]), o.useLayoutEffect(() => {
    const a = ms - jl.current;
    a !== 0 && (Dt((p) => ({
      ...p,
      startIndex: Math.max(0, p.startIndex + a)
    })), Me.current.startIndex = Math.max(0, Me.current.startIndex + a), Dn.current.startIndex = Math.max(0, Dn.current.startIndex + a)), jl.current = ms;
  }, [ms]), o.useEffect(() => {
    if (D == null) {
      Fs.current = void 0;
      return;
    }
    if (s.length === 0 || Fs.current === D) return;
    Fs.current = D;
    const a = xe.width - Ve, p = de.candleWidth * (1 + $e), b = Math.floor(a / p), y = Math.min(D, s.length - 1), f = Math.floor(b * 0.9), e = Math.max(0, y - f);
    Dt((O) => ({ ...O, startIndex: e, autoFollowLatest: !1 }));
  }, [D, s.length, xe.width, de.candleWidth]), o.useEffect(() => {
    !jt.current && !wl && is();
  }, [is, wl]);
  const jo = o.useRef(0), al = o.useRef(null);
  o.useEffect(() => {
    if (n == null || jt.current) return;
    const a = Date.now(), p = a - jo.current;
    return p >= 50 ? (jo.current = a, is()) : (al.current && clearTimeout(al.current), al.current = setTimeout(() => {
      jo.current = Date.now(), is();
    }, 50 - p)), () => {
      al.current && clearTimeout(al.current);
    };
  }, [n, is]), o.useEffect(() => {
    Wt();
  }, [Wt]), o.useEffect(() => {
    As.current = le, le != null && (Us.current = !0, requestAnimationFrame(() => {
      Wt(), Us.current = !1;
    }));
  }, [le, Wt]);
  const Wl = o.useRef(/* @__PURE__ */ new Map()), gr = o.useMemo(() => {
    if (jt.current && Wl.current.size > 0 && s.length === Wl.current.size)
      return Wl.current;
    const a = /* @__PURE__ */ new Map();
    for (let p = 0; p < s.length; p++)
      a.set(s[p].time, p);
    return Wl.current = a, a;
  }, [s]), Fl = o.useCallback(() => {
    if (!Ae) return;
    const a = Pn();
    Ts(a.candles, de.autoFollowLatest);
    const p = s.length > 0 ? s[s.length - 1] : null, b = s.length >= 2 ? s[s.length - 2] : null, y = p && b ? p.time - b.time : 6e4;
    Ae({
      priceAxisWidth: Ve,
      timeToX: (f) => {
        const e = jt.current ? Dn.current.startIndex : de.startIndex, $ = (jt.current ? Dn.current.candleWidth : de.candleWidth) * (1 + $e), U = Math.floor(e), _ = (e - U) * $;
        let g = gr.get(f) ?? -1;
        if (g === -1 && s.length > 0) {
          const w = s[0], A = s[s.length - 1];
          if (f > A.time) {
            const X = f - A.time;
            g = s.length - 1 + Math.round(X / y);
          } else if (f < w.time) {
            const X = w.time - f;
            g = -Math.round(X / y);
          } else {
            let X = 0, u = s.length - 1;
            for (; X < u; ) {
              const N = Math.floor((X + u) / 2);
              s[N].time < f ? X = N + 1 : u = N;
            }
            if (X > 0) {
              const N = s[X - 1], x = s[X], V = (f - N.time) / (x.time - N.time);
              return (X - 1 + V - U) * $ + $ / 2 - _;
            }
            g = X;
          }
        }
        return g === -1 ? null : (g - U) * $ + $ / 2 - _;
      },
      xToTime: (f) => {
        const e = jt.current ? Dn.current.startIndex : de.startIndex, $ = (jt.current ? Dn.current.candleWidth : de.candleWidth) * (1 + $e), U = Math.floor(e), _ = (e - U) * $, g = f + _, w = U + (g - $ / 2) / $;
        if (w < 0) return null;
        const A = Math.floor(w), X = w - A;
        if (A >= s.length) {
          if (p) {
            const N = w - (s.length - 1);
            return p.time + N * y;
          }
          return null;
        }
        const u = s[A];
        if (!u) return null;
        if (X > 0 && A + 1 < s.length) {
          const N = s[A + 1];
          return u.time + X * (N.time - u.time);
        }
        return u.time + X * y;
      },
      priceToY: (f) => {
        let e = dn.current, O = hn.current;
        if (!e || O === 0) {
          const $ = xe.width - Ve, U = Me.current, _ = U.candleWidth * (1 + $e), g = Math.floor($ / _), w = Math.max(0, Math.floor(U.startIndex)), A = Math.min(s.length, w + g), X = s.slice(w, A);
          let u = 1 / 0, N = -1 / 0;
          if (X.length === 0)
            u = 0, N = 100;
          else {
            for (const Fe of X)
              Fe.low < u && (u = Fe.low), Fe.high > N && (N = Fe.high);
            n && (n < u && (u = n), n > N && (N = n));
          }
          const x = N - u, V = x * 0.05, d = (N + u) / 2, M = x + V * 2;
          e = {
            min: d - M / 2,
            max: d + M / 2,
            range: M
          };
          const ce = r?.rsi?.enabled, De = r?.macd?.enabled, J = r?.atr?.enabled, We = r?.stochastic?.enabled;
          r?.volume?.enabled && s.some((Fe) => Fe.volume !== void 0 && Fe.volume > 0);
          const G = (ce ? 1 : 0) + (De ? 1 : 0) + (J ? 1 : 0) + (We ? 1 : 0), Pe = xe.height - yt, Ke = G > 0 ? Math.max(60 * G, Pe * Gt) : 0;
          O = Pe - Ke;
        }
        if (mt !== null && ot !== null) {
          const $ = yn.current, U = qn.current, _ = ot / $, g = mt + U;
          e = {
            min: g - _ / 2,
            max: g + _ / 2,
            range: _
          };
        }
        return O - (f - e.min) / e.range * O;
      },
      yToPrice: (f) => {
        let e = dn.current, O = hn.current;
        if (!e || O === 0) {
          const $ = xe.width - Ve, U = Me.current, _ = U.candleWidth * (1 + $e), g = Math.floor($ / _), w = Math.max(0, Math.floor(U.startIndex)), A = Math.min(s.length, w + g), X = s.slice(w, A);
          let u = 1 / 0, N = -1 / 0;
          if (X.length === 0)
            u = 0, N = 100;
          else {
            for (const Fe of X)
              Fe.low < u && (u = Fe.low), Fe.high > N && (N = Fe.high);
            n && (n < u && (u = n), n > N && (N = n));
          }
          const x = N - u, V = x * 0.05, d = (N + u) / 2, M = x + V * 2;
          e = {
            min: d - M / 2,
            max: d + M / 2,
            range: M
          };
          const ce = r?.rsi?.enabled, De = r?.macd?.enabled, J = r?.atr?.enabled, We = r?.stochastic?.enabled;
          r?.volume?.enabled && s.some((Fe) => Fe.volume !== void 0 && Fe.volume > 0);
          const G = (ce ? 1 : 0) + (De ? 1 : 0) + (J ? 1 : 0) + (We ? 1 : 0), Pe = xe.height - yt, Ke = G > 0 ? Math.max(60 * G, Pe * Gt) : 0;
          O = Pe - Ke;
        }
        if (mt !== null && ot !== null) {
          const $ = yn.current, U = qn.current, _ = ot / $, g = mt + U;
          e = {
            min: g - _ / 2,
            max: g + _ / 2,
            range: _
          };
        }
        return e.max - f / O * e.range;
      }
    });
  }, [s, de, xe, Ae, r, Gt, n, mt, ot, gr]);
  o.useEffect(() => {
    Tl.current = Fl;
  }, [Fl]), o.useLayoutEffect(() => {
    Fl();
  }, [Fl]);
  const Mo = [
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
  ].filter(Boolean).length + (l?.customIndicators?.filter((a) => a.display === "subplot").length || 0), La = Mo > 0, vr = xe.height - yt, Ea = Mo > 0 ? Math.max(60 * Mo, vr * Gt) : 0, yr = vr - Ea, kr = o.useCallback((a) => {
    a.preventDefault(), a.stopPropagation(), ie(!0);
    const p = "touches" in a ? a.touches[0].clientY : a.clientY;
    ae.current = { y: p, ratio: Gt };
  }, [Gt]);
  o.useEffect(() => {
    if (!m) return;
    const a = (b) => {
      const y = "touches" in b ? b.touches[0].clientY : b.clientY, e = (ae.current.y - y) / (xe.height - yt), O = Math.max(0.1, Math.min(0.6, ae.current.ratio + e));
      ho(O);
    }, p = () => {
      ie(!1);
    };
    return window.addEventListener("mousemove", a), window.addEventListener("mouseup", p), window.addEventListener("touchmove", a), window.addEventListener("touchend", p), () => {
      window.removeEventListener("mousemove", a), window.removeEventListener("mouseup", p), window.removeEventListener("touchmove", a), window.removeEventListener("touchend", p);
    };
  }, [m, xe.height]);
  const Ol = (a) => {
    const { kind: p, label: b, menuKey: y, engineLabel: f, ciId: e, sid: O, remove: $ } = a, U = "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground transition-colors", _ = () => {
      p !== "formula" || !e || !ke || (ke({
        ...r,
        customIndicators: (r.customIndicators || []).map((A) => A.id === e ? { ...A, enabled: !1 } : A)
      }), ye(null), fe(null));
    }, g = (A) => {
      A.stopPropagation(), vt({
        visible: !0,
        x: A.clientX,
        y: A.clientY,
        key: y,
        title: b,
        custom: p === "engine" ? { kind: p, label: f || b } : p === "formula" ? { kind: p, ciId: e } : { kind: p, sid: O }
      });
    }, w = p === "engine" && !!nt && !!f || p === "formula" && !!In;
    return /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
      p === "formula" && /* @__PURE__ */ t.jsx("button", { onClick: (A) => {
        A.stopPropagation(), _();
      }, className: `${U} hover:text-foreground`, title: `Hide ${b}`, children: /* @__PURE__ */ t.jsx(ql, { className: "w-[15px] h-[15px]" }) }),
      w && /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: (A) => {
            A.stopPropagation(), p === "engine" ? nt?.(f) : In?.();
          },
          className: `${U} hover:text-foreground`,
          title: `${b} Settings`,
          children: /* @__PURE__ */ t.jsx(Gl, { className: "w-[15px] h-[15px]" })
        }
      ),
      /* @__PURE__ */ t.jsx("button", { onClick: (A) => {
        A.stopPropagation(), $();
      }, className: `${U} hover:text-destructive`, title: `Remove ${b}`, children: /* @__PURE__ */ t.jsx(Zl, { className: "w-[15px] h-[15px]" }) }),
      /* @__PURE__ */ t.jsx("button", { onClick: g, className: `${U} hover:text-foreground`, title: "More options", children: /* @__PURE__ */ t.jsx(Jl, { className: "w-[15px] h-[15px]" }) })
    ] });
  };
  return /* @__PURE__ */ t.jsxs(
    "div",
    {
      ref: at,
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
            ref: Sl,
            width: xe.width * gn,
            height: xe.height * gn,
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
            width: xe.width * gn,
            height: xe.height * gn,
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
            onMouseUp: Co,
            onMouseLeave: Ia,
            onTouchStart: Ta,
            onTouchMove: ja,
            onTouchEnd: Ma,
            onContextMenu: (a) => {
              if (!r || !l) return;
              const p = Ge.current;
              if (!p) return;
              const b = p.getBoundingClientRect(), y = a.clientX - b.left, f = a.clientY - b.top, e = nn.current, O = (d) => !!d && f >= d.top && f <= d.bottom, $ = r?.customBrueScripts || {}, U = (d, M) => {
                fe(`script-${d}`), vt({
                  visible: !0,
                  x: a.clientX,
                  y: a.clientY,
                  key: `script_${d}`,
                  title: $[d]?.name || M,
                  custom: { kind: "brue", sid: d }
                });
              };
              for (const d of Wr()) {
                const M = r[d];
                if (!M?.enabled || !l?.[d] || !O(e[d])) continue;
                a.preventDefault(), a.stopPropagation();
                const ce = M.sourceScriptId;
                if (ce && $[ce]?.enabled) {
                  U(ce, Kl(d));
                  return;
                }
                fe(`sp-${d}`), vt({
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
                const M = typeof d.expression == "string" ? d.expression : "";
                if (M.startsWith("brue:") && d.scriptId)
                  U(d.scriptId, d.name || "Brue script");
                else if (M.startsWith("local:")) {
                  const ce = d.group || M.split(":")[1] || d.name;
                  fe(`ci-${d.id}`), vt({
                    visible: !0,
                    x: a.clientX,
                    y: a.clientY,
                    key: `custom_${d.id}`,
                    title: ce || "Indicator",
                    custom: { kind: "engine", label: ce }
                  });
                } else
                  fe(`ci-${d.id}`), vt({
                    visible: !0,
                    x: a.clientX,
                    y: a.clientY,
                    key: `custom_${d.id}`,
                    title: d.name || "Custom indicator",
                    custom: { kind: "formula", ciId: d.id }
                  });
                return;
              }
              const _ = dn.current, g = hn.current;
              if (!_ || g <= 0) return;
              const w = Me.current, A = w.candleWidth * (1 + $e), u = Math.max(0, Math.floor(w.startIndex)) + Math.round(y / A), N = 8, x = (d) => {
                if (isNaN(d) || !isFinite(d)) return !1;
                const M = g - (d - _.min) / _.range * g;
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
                  a.preventDefault(), a.stopPropagation(), fe(d.key), vt({ visible: !0, x: a.clientX, y: a.clientY, key: d.key, title: d.title });
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
              left: Zn ? (tr || 295) + 6 : 6,
              pointerEvents: "auto"
            },
            onMouseEnter: () => {
              po.current = !0;
            },
            onMouseLeave: () => {
              po.current = !1;
            },
            children: [
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: () => {
                    ta(!Zn);
                  },
                  className: "flex items-center justify-center w-4 h-4 rounded transition-all duration-200",
                  style: { background: "rgba(128, 128, 128, 0.3)" },
                  title: Zn ? "Hide OHLC" : "Show OHLC",
                  children: Zn ? /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", className: "w-2.5 h-2.5", fill: "none", stroke: "#9ca3af", strokeWidth: "3", strokeLinecap: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M10 4L5 8L10 12" }) }) : /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 16 16", className: "w-2.5 h-2.5", fill: "none", stroke: "#9ca3af", strokeWidth: "3", strokeLinecap: "round", children: /* @__PURE__ */ t.jsx("path", { d: "M6 4L11 8L6 12" }) })
                }
              ),
              Zn && h && (() => {
                const a = /* @__PURE__ */ new Date(), p = Du(h), b = Zr(h);
                let y = "", f = "", e = 0, O = 0, $ = !1, U = b ? "#22c55e" : "#ef4444", _ = b ? "Market open" : "Market closed", g = "Real time";
                const w = Bu(a), A = w.hours * 60 + w.minutes, X = w.day, u = w.isBST, N = u ? "BST (UTC+1)" : "GMT (UTC+0)", x = String(w.hours).padStart(2, "0"), V = String(w.minutes).padStart(2, "0"), d = Wu(h);
                if (p === "crypto")
                  $ = !0, y = "24/7", f = "Always open", U = "#22c55e", _ = "Market open";
                else if (p === "forex")
                  $ = !0, y = u ? "Sun 10 PM – Fri 10 PM BST" : "Sun 10 PM – Fri 10 PM GMT", f = N, b || (_ = "Weekend — market closed");
                else if (p === "stock" && d) {
                  const ue = Ul(d);
                  e = ue.openHour * 60 + ue.openMinute, O = ue.closeHour * 60 + ue.closeMinute;
                  const Ne = String(ue.openHour).padStart(2, "0"), et = ue.openMinute === 0 ? "00" : String(ue.openMinute).padStart(2, "0"), Xe = String(ue.closeHour).padStart(2, "0"), Ft = ue.closeMinute === 0 ? "00" : String(ue.closeMinute).padStart(2, "0");
                  if (y = `${Ne}:${et} – ${Xe}:${Ft} ${ue.tzLabel}`, f = `${ue.exchange} (${ue.tzLabel})`, ue.lunchBreak) {
                    const kn = `${String(ue.lunchBreak.startHour).padStart(2, "0")}:${String(ue.lunchBreak.startMinute).padStart(2, "0")}`, Zt = `${String(ue.lunchBreak.endHour).padStart(2, "0")}:${String(ue.lunchBreak.endMinute).padStart(2, "0")}`;
                    y += ` (break ${kn}–${Zt})`;
                  }
                } else if (p === "stock") {
                  e = 14 * 60 + 30, O = 21 * 60, Fu(a) && (O = 18 * 60, U = b ? "#f59e0b" : "#ef4444", _ = b ? "Early close today" : "Market closed");
                  const ue = Math.floor(e / 60), Ne = Math.floor(O / 60), et = e % 60 === 0 ? ":00" : ":30", Xe = O % 60 === 0 ? ":00" : ":30";
                  y = `${ue}${et} – ${Ne}${Xe} ${u ? "BST" : "GMT"}`, f = `NYSE/NASDAQ (${N})`;
                } else if (p === "commodity" || p === "index") {
                  $ = !0, y = u ? "Sun 11 PM – Fri 10 PM BST" : "Sun 11 PM – Fri 10 PM GMT", f = N;
                  const ue = u ? 23 * 60 : 22 * 60, Ne = u ? 24 * 60 : 23 * 60;
                  b && A >= ue - 15 && A < ue ? (_ = "Closing soon — daily break", U = "#f59e0b") : !b && A >= ue && A < Ne && (_ = "Daily maintenance break");
                }
                let M = "";
                if (!$ && p === "stock") {
                  let ue = A;
                  if (d)
                    try {
                      const Ne = Ul(d), Xe = new Intl.DateTimeFormat("en-GB", { timeZone: Ne.timezone, hour: "numeric", minute: "numeric", hour12: !1 }).formatToParts(a), Ft = parseInt(Xe.find((Zt) => Zt.type === "hour")?.value || "0"), kn = parseInt(Xe.find((Zt) => Zt.type === "minute")?.value || "0");
                      ue = Ft * 60 + kn;
                    } catch {
                    }
                  if (b) {
                    const Ne = O - ue;
                    if (Ne > 0) {
                      const et = Math.floor(Ne / 60), Xe = Ne % 60;
                      M = et > 0 ? `Closes in ${et}h ${Xe}m` : `Closes in ${Xe} minutes`;
                    }
                  } else {
                    const Ne = d ? (() => {
                      try {
                        const Xe = new Intl.DateTimeFormat("en-GB", { timeZone: Ul(d).timezone, weekday: "short" }).formatToParts(a).find((Ft) => Ft.type === "weekday")?.value || "";
                        return { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5 }[Xe] || 0;
                      } catch {
                        return 0;
                      }
                    })() : X;
                    if (Ne >= 1 && Ne <= 5 && ue < e) {
                      const et = e - ue, Xe = Math.floor(et / 60), Ft = et % 60;
                      M = Xe > 0 ? `Opens in ${Xe}h ${Ft}m` : `Opens in ${Ft} minutes`;
                    }
                  }
                }
                let ce = 0;
                if (!$ && b && O > e) {
                  let ue = A;
                  if (d)
                    try {
                      const Ne = Ul(d), Xe = new Intl.DateTimeFormat("en-GB", { timeZone: Ne.timezone, hour: "numeric", minute: "numeric", hour12: !1 }).formatToParts(a), Ft = parseInt(Xe.find((Zt) => Zt.type === "hour")?.value || "0"), kn = parseInt(Xe.find((Zt) => Zt.type === "minute")?.value || "0");
                      ue = Ft * 60 + kn;
                    } catch {
                    }
                  ce = Math.max(0, Math.min(1, (ue - e) / (O - e)));
                }
                const De = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][X], J = typeof document < "u" && document.documentElement.classList.contains("dark"), We = J ? "rgba(22, 25, 35, 0.98)" : "rgba(255, 255, 255, 0.98)", G = J ? "rgba(55, 60, 75, 0.6)" : "rgba(210, 215, 225, 0.8)", Pe = J ? "#7b8094" : "#6b7280", Ke = J ? "#a0a6b8" : "#374151", Fe = J ? "#2a2e3a" : "#e5e7eb";
                return /* @__PURE__ */ t.jsxs(
                  "div",
                  {
                    ref: fo,
                    className: "relative",
                    children: [
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (ue) => {
                            ue.stopPropagation(), nr((Ne) => !Ne);
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
                            background: We,
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
                              M && /* @__PURE__ */ t.jsx("p", { style: { color: Pe, fontSize: 12, margin: "4px 0 0 16px", lineHeight: 1.3 }, children: M })
                            ] }),
                            !$ && p === "stock" && /* @__PURE__ */ t.jsxs("div", { style: { padding: "6px 16px 10px" }, children: [
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Pe, fontSize: 9, fontWeight: 700, letterSpacing: 1.2, fontFamily: '"SF Mono", Consolas, monospace' }, children: De }),
                                /* @__PURE__ */ t.jsx("div", { style: { flex: 1, height: 5, borderRadius: 3, background: Fe, overflow: "hidden", position: "relative" }, children: b && /* @__PURE__ */ t.jsx(
                                  "div",
                                  {
                                    style: {
                                      position: "absolute",
                                      left: 0,
                                      top: 0,
                                      height: "100%",
                                      width: `${ce * 100}%`,
                                      background: `linear-gradient(90deg, ${U}aa, ${U})`,
                                      borderRadius: 3,
                                      transition: "width 1s ease"
                                    }
                                  }
                                ) })
                              ] }),
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 10, color: Pe, fontFamily: '"SF Mono", Consolas, monospace' }, children: [
                                /* @__PURE__ */ t.jsx("span", { children: y.split("–")[0]?.trim() }),
                                /* @__PURE__ */ t.jsx("span", { children: y.split("–")[1]?.trim() })
                              ] })
                            ] }),
                            /* @__PURE__ */ t.jsx("div", { style: { height: 1, background: G, margin: "0 12px" } }),
                            /* @__PURE__ */ t.jsxs("div", { style: { padding: "10px 16px 14px" }, children: [
                              f && /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Pe }, children: "Exchange timezone" }),
                                /* @__PURE__ */ t.jsx("span", { style: { color: Ke, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: f })
                              ] }),
                              y && p !== "stock" && /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Pe }, children: "Session" }),
                                /* @__PURE__ */ t.jsx("span", { style: { color: Ke, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: y })
                              ] }),
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginBottom: 6 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Pe }, children: "Local time" }),
                                /* @__PURE__ */ t.jsxs("span", { style: { color: Ke, fontFamily: '"SF Mono", Consolas, monospace', fontSize: 10 }, children: [
                                  x,
                                  ":",
                                  V,
                                  " ",
                                  u ? "BST" : "GMT"
                                ] })
                              ] }),
                              /* @__PURE__ */ t.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11 }, children: [
                                /* @__PURE__ */ t.jsx("span", { style: { color: Pe }, children: "Update frequency" }),
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
        Zn && r && ke && (() => {
          const a = {
            bollinger: () => xo,
            movingAverages: () => mo,
            vwap: () => bo,
            volumeProfile: () => go,
            volume: () => vo
          }, p = Ou().map((g) => ({
            key: g,
            title: Kl(g),
            enabledCheck: () => g === "volume" ? !!(r?.volume?.enabled && s.some((w) => w.volume)) : g === "volumeProfile" ? !!r?.volumeProfile?.enabled : !!(r?.[g]?.enabled && l?.[g]),
            endXSource: a[g] ?? (() => ut[g] || 0)
          })), b = He.toolbarLineHeight;
          let y = He.toolbarStartY;
          const f = [], e = r?.customBrueScripts || {};
          for (const g of p) {
            if (!g.enabledCheck()) continue;
            if (g.key !== "movingAverages") {
              const u = r?.[g.key]?.sourceScriptId;
              if (u && e[u]?.enabled) continue;
            }
            const w = _s.current[g.key] || g.endXSource() || 150;
            if (g.key === "movingAverages" && l?.movingAverages?.length > 0) {
              const u = r.movingAverages?.lines ?? [], N = r?.customBrueScripts || {};
              for (let x = 0; x < l.movingAverages.length; x++) {
                const V = u[x]?.sourceScriptId;
                if (V && N[V]?.enabled) continue;
                const d = `movingAverages__${x}`, M = y;
                y += b;
                const ce = It === d, De = u[x], J = De ? `${De.type} ${De.period}` : "MA", We = () => {
                  const G = u.filter((Pe, Ke) => Ke !== x);
                  ke({
                    ...r,
                    movingAverages: {
                      ...r.movingAverages,
                      enabled: G.length > 0,
                      lines: G
                    }
                  }), ye(null), fe(null);
                };
                f.push(
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      className: "absolute z-20 flex items-center",
                      style: { left: 0, top: M - He.toolbarRowYOffset, height: b },
                      onMouseEnter: () => {
                        ye(d), sn.current = !0, bt.current && clearTimeout(bt.current);
                      },
                      onMouseLeave: () => {
                        bt.current = setTimeout(() => {
                          ye((G) => G === d ? null : G), sn.current = !1;
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
                              G.stopPropagation(), fe((Pe) => Pe === d ? null : d), ye(d);
                            },
                            onContextMenu: (G) => {
                              G.preventDefault(), G.stopPropagation(), fe(d), vt({ visible: !0, x: G.clientX, y: G.clientY, key: d, title: J });
                            }
                          }
                        ),
                        ce && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-[3px] ml-1.5 rounded-[4px] border border-border bg-card px-[2px] shadow-md", style: { height: 20 }, children: [
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (G) => {
                                G.stopPropagation(), We();
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                              title: `Hide ${J}`,
                              children: /* @__PURE__ */ t.jsx(ql, { className: "w-[15px] h-[15px]" })
                            }
                          ),
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (G) => {
                                G.stopPropagation(), Hs({ type: "movingAverages", position: { x: w, y: M } });
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                              title: `${J} Settings`,
                              children: /* @__PURE__ */ t.jsx(Gl, { className: "w-[15px] h-[15px]" })
                            }
                          ),
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (G) => {
                                G.stopPropagation(), We();
                              },
                              className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors",
                              title: `Remove ${J}`,
                              children: /* @__PURE__ */ t.jsx(Zl, { className: "w-[15px] h-[15px]" })
                            }
                          ),
                          /* @__PURE__ */ t.jsx(
                            "button",
                            {
                              onClick: (G) => {
                                G.stopPropagation(), fe(d), vt({ visible: !0, x: G.clientX, y: G.clientY, key: d, title: J });
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
            const A = y;
            y += b;
            const X = It === g.key;
            X || g.key, f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: {
                    left: 0,
                    top: A - He.toolbarRowYOffset,
                    height: b
                  },
                  onMouseEnter: () => {
                    ye(g.key), sn.current = !0, bt.current && clearTimeout(bt.current);
                  },
                  onMouseLeave: () => {
                    bt.current = setTimeout(() => {
                      ye((u) => u === g.key ? null : u), sn.current = !1;
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
                          u.stopPropagation(), fe((N) => N === g.key ? null : g.key), ye(g.key);
                        },
                        onContextMenu: (u) => {
                          u.preventDefault(), u.stopPropagation(), fe(g.key), vt({ visible: !0, x: u.clientX, y: u.clientY, key: g.key, title: g.title });
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
                            N && ke({ ...r, [g.key]: { ...N, enabled: !1 } }), ye(null), fe(null);
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                          title: `Hide ${g.title}`,
                          children: /* @__PURE__ */ t.jsx(ql, { className: "w-[15px] h-[15px]" })
                        }
                      ),
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation(), Hs({ type: g.key, position: { x: w, y: A } });
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                          title: `${g.title} Settings`,
                          children: /* @__PURE__ */ t.jsx(Gl, { className: "w-[15px] h-[15px]" })
                        }
                      ),
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation();
                            const N = r[g.key];
                            N && ke({ ...r, [g.key]: { ...N, enabled: !1 } }), ye(null), fe(null);
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors",
                          title: `Remove ${g.title}`,
                          children: /* @__PURE__ */ t.jsx(Zl, { className: "w-[15px] h-[15px]" })
                        }
                      ),
                      /* @__PURE__ */ t.jsx(
                        "button",
                        {
                          onClick: (u) => {
                            u.stopPropagation(), fe(g.key), vt({ visible: !0, x: u.clientX, y: u.clientY, key: g.key, title: g.title });
                          },
                          className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                          title: "More options",
                          children: /* @__PURE__ */ t.jsx(Jl, { className: "w-[15px] h-[15px]" })
                        }
                      )
                    ] })
                  ]
                },
                `overlay-row-${g.key}`
              )
            );
          }
          const O = (r?.customIndicators || []).filter((g) => g.enabled && g.display === "overlay"), $ = /* @__PURE__ */ new Map(), U = [];
          for (const g of O)
            if (typeof g.expression == "string" && g.expression.startsWith("brue:") && g.scriptId) {
              const A = g.scriptId;
              $.has(A) || $.set(A, g);
            } else
              U.push(g);
          for (const g of U) {
            const w = `custom_overlay_${g.id}`, A = _s.current[w] || ut[w] || 150, X = y;
            y += b;
            const u = `ci-${g.id}`, N = It === u, x = typeof g.expression == "string" && g.expression.startsWith("local:"), V = x ? g.group || g.expression.split(":")[1] || g.name : null, d = () => {
              x ? Oe?.(V) : ke && ke({
                ...r,
                customIndicators: (r.customIndicators || []).filter((M) => M.id !== g.id)
              }), ye(null), fe(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: X - He.toolbarRowYOffset, height: b },
                  onMouseEnter: () => {
                    ye(u), sn.current = !0, bt.current && clearTimeout(bt.current);
                  },
                  onMouseLeave: () => {
                    bt.current = setTimeout(() => {
                      ye((M) => M === u ? null : M), sn.current = !1;
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
                          M.stopPropagation(), fe((ce) => ce === u ? null : u), ye(u);
                        },
                        onContextMenu: (M) => {
                          M.preventDefault(), M.stopPropagation(), fe(u), vt({
                            visible: !0,
                            x: M.clientX,
                            y: M.clientY,
                            key: w,
                            title: x && V || g.name,
                            custom: x ? { kind: "engine", label: V } : { kind: "formula", ciId: g.id }
                          });
                        }
                      }
                    ),
                    N && Ol({
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
          for (const [g, w] of $.entries()) {
            const A = `script_${g}`, X = _s.current[A] || ut[A] || 150, u = y;
            y += b;
            const N = `script-${g}`, x = It === N, V = r?.customBrueScripts?.[g]?.name || w.name || "Brue script", d = () => {
              Q?.(g), ye(null), fe(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: u - He.toolbarRowYOffset, height: b },
                  onMouseEnter: () => {
                    ye(N), sn.current = !0, bt.current && clearTimeout(bt.current);
                  },
                  onMouseLeave: () => {
                    bt.current = setTimeout(() => {
                      ye((M) => M === N ? null : M), sn.current = !1;
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
                          M.stopPropagation(), fe((ce) => ce === N ? null : N), ye(N);
                        },
                        onContextMenu: (M) => {
                          M.preventDefault(), M.stopPropagation(), fe(N), vt({
                            visible: !0,
                            x: M.clientX,
                            y: M.clientY,
                            key: A,
                            title: V,
                            custom: { kind: "brue", sid: g }
                          });
                        }
                      }
                    ),
                    x && Ol({
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
            if (!w?.enabled || $.has(g)) continue;
            const A = `script_${g}`, X = _s.current[A] || ut[A] || 150, u = y;
            y += b;
            const N = `script-${g}`, x = It === N, V = w.name || "Brue script", d = () => {
              Q?.(g), ye(null), fe(null);
            };
            f.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: u - He.toolbarRowYOffset, height: b },
                  onMouseEnter: () => {
                    ye(N), sn.current = !0, bt.current && clearTimeout(bt.current);
                  },
                  onMouseLeave: () => {
                    bt.current = setTimeout(() => {
                      ye((M) => M === N ? null : M), sn.current = !1;
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
                          M.stopPropagation(), fe((ce) => ce === N ? null : N), ye(N);
                        },
                        onContextMenu: (M) => {
                          M.preventDefault(), M.stopPropagation(), fe(N), vt({
                            visible: !0,
                            x: M.clientX,
                            y: M.clientY,
                            key: A,
                            title: V,
                            custom: { kind: "brue", sid: g }
                          });
                        }
                      }
                    ),
                    x && Ol({
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
        r && ke && (() => {
          const a = Wr().map((b) => ({ key: b, title: Kl(b) })), p = r?.customBrueScripts || {};
          return a.map(({ key: b, title: y }) => {
            const f = nn.current[b];
            if (!l?.[b] || !f) return null;
            const O = r?.[b]?.sourceScriptId;
            if (O && p[O]?.enabled) return null;
            const $ = $n.current[b] || sr[b] || 150, U = `sp-${b}`, _ = It === U;
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
                  ye(U), sn.current = !0, bt.current && clearTimeout(bt.current);
                },
                onMouseLeave: () => {
                  bt.current = setTimeout(() => {
                    ye((g) => g === U ? null : g), sn.current = !1;
                  }, 150);
                },
                children: [
                  _ && /* @__PURE__ */ t.jsx(
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
                      onClick: (g) => {
                        g.stopPropagation(), fe((w) => w === U ? null : U), ye(U);
                      },
                      onContextMenu: (g) => {
                        g.preventDefault(), g.stopPropagation(), fe(U), vt({ visible: !0, x: g.clientX, y: g.clientY, key: b, title: y });
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
                          w && ke({ ...r, [b]: { ...w, enabled: !1 } }), ye(null), fe(null);
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: `Hide ${y}`,
                        children: /* @__PURE__ */ t.jsx(ql, { className: "w-[15px] h-[15px]" })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (g) => {
                          g.stopPropagation(), Hs({ type: b, position: { x: $, y: f.top } });
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: `${y} Settings`,
                        children: /* @__PURE__ */ t.jsx(Gl, { className: "w-[15px] h-[15px]" })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (g) => {
                          g.stopPropagation();
                          const w = r[b];
                          w && ke({ ...r, [b]: { ...w, enabled: !1 } }), ye(null), fe(null);
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors",
                        title: `Remove ${y}`,
                        children: /* @__PURE__ */ t.jsx(Zl, { className: "w-[15px] h-[15px]" })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: (g) => {
                          g.stopPropagation(), fe(U), vt({ visible: !0, x: g.clientX, y: g.clientY, key: b, title: y });
                        },
                        className: "w-[22px] h-[18px] flex items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
                        title: "More options",
                        children: /* @__PURE__ */ t.jsx(Jl, { className: "w-[15px] h-[15px]" })
                      }
                    )
                  ] })
                ]
              },
              `sp-row-${b}`
            );
          });
        })(),
        r && ke && (() => {
          const a = (r?.customIndicators || []).filter((e) => e.enabled && e.display === "subplot"), p = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map();
          for (const e of a)
            if (typeof e.expression == "string" && e.expression.startsWith("brue:") && e.scriptId) {
              const $ = e.scriptId;
              p.has($) || p.set($, e);
            } else if (typeof e.expression == "string" && e.expression.startsWith("local:") && e.group) {
              const $ = e.group;
              b.has($) || b.set($, e);
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
              remove: () => Oe?.(e)
            });
          for (const { rowKey: e, firstPlot: O, label: $, kind: U, handle: _, remove: g } of f) {
            const w = nn.current[`custom_${O.id}`];
            if (!w) continue;
            const A = It === e, X = 200, u = () => {
              g(), ye(null), fe(null);
            };
            y.push(
              /* @__PURE__ */ t.jsxs(
                "div",
                {
                  className: "absolute z-20 flex items-center",
                  style: { left: 0, top: w.top + 2, height: 16 },
                  onMouseEnter: () => {
                    ye(e), sn.current = !0, bt.current && clearTimeout(bt.current);
                  },
                  onMouseLeave: () => {
                    bt.current = setTimeout(() => {
                      ye((N) => N === e ? null : N), sn.current = !1;
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
                          N.stopPropagation(), fe((x) => x === e ? null : e), ye(e);
                        },
                        onContextMenu: (N) => {
                          N.preventDefault(), N.stopPropagation(), fe(e), vt({
                            visible: !0,
                            x: N.clientX,
                            y: N.clientY,
                            key: `custom_${O.id}`,
                            title: $,
                            custom: U === "engine" ? { kind: "engine", label: _ } : { kind: "brue", sid: _ }
                          });
                        }
                      }
                    ),
                    A && Ol({
                      kind: U,
                      label: $,
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
              bottom: yt + 8,
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
        rs && /* @__PURE__ */ t.jsx(
          "div",
          {
            className: "absolute z-50 flex items-center justify-center",
            style: {
              top: 4,
              // Desktop reserves the RIGHT_TOOLBAR_WIDTH gap because the price
              // axis carries the right toolbar overlay; phone/tablet have no
              // overlay, so the reset button uses the full axis width.
              right: An ?? (He.yAxisResetUsesToolbarGap ? $o : 0),
              width: An !== void 0 ? Ve - An : He.yAxisResetUsesToolbarGap ? Ve - $o : Ve
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
        sl && r && ke && xe && /* @__PURE__ */ t.jsx(
          _u,
          {
            type: sl.type,
            config: r,
            onConfigChange: ke,
            position: sl.position,
            onClose: () => Hs(null)
          }
        ),
        Rn && Rn.visible && r && ke && (() => {
          const a = Ge.current?.getBoundingClientRect();
          if (!a) return null;
          const p = Rn.x - a.left, b = Rn.y - a.top, y = Rn.key, f = Rn.custom, e = () => {
            f?.kind === "brue" ? Q?.(f.sid) : f?.kind === "engine" ? Oe?.(f.label) : f?.kind === "formula" && ke({
              ...r,
              customIndicators: (r.customIndicators || []).filter((O) => O.id !== f.ciId)
            });
          };
          return Ar.createPortal(
            (() => {
              const O = "var(--text)", $ = "var(--dim)", U = "var(--hover)", _ = "var(--edge)", g = {
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
                    left: Math.min(Rn.x, window.innerWidth - 170),
                    top: Math.min(Rn.y, window.innerHeight - 140)
                  },
                  children: [
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        style: { position: "fixed", inset: 0, zIndex: -1 },
                        onClick: () => {
                          vt(null), fe(null);
                        },
                        onContextMenu: (w) => {
                          w.preventDefault(), vt(null), fe(null);
                        }
                      }
                    ),
                    /* @__PURE__ */ t.jsx("div", { style: {
                      padding: "5px 10px 3px",
                      fontSize: "11px",
                      color: $,
                      whiteSpace: "nowrap"
                    }, children: Rn.title }),
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
                          Hs({ type: y, position: { x: p, y: b } }), vt(null);
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
                          nt(f.label), vt(null);
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
                          w && ke({ ...r, [y]: { ...w, enabled: !1 } }), vt(null), fe(null);
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
                            w && ke({ ...r, [y]: { ...w, enabled: !1 } });
                          }
                          vt(null), fe(null);
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
}, ad = [
  { tools: ["cursor"] },
  { tools: ["trendline", "arrow", "ray", "extended", "hline", "hray", "vline", "cross"] },
  { tools: ["rectangle", "channel", "polyline", "brush"] },
  { tools: ["fib", "long", "short"] },
  { tools: ["text", "measure", "pricerange", "daterange"] }
], id = {
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
function Xs({ children: s, size: n = 28, active: h = !1, title: T, onClick: I }) {
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
function pl({ type: s }) {
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
function ud({
  activeTool: s = "cursor",
  onToolSelect: n,
  magnet: h = !1,
  onToggleMagnet: T,
  hiddenAll: I = !1,
  onToggleHidden: ne,
  onClearAll: le,
  collapsed: je = !1,
  onToggleCollapsed: r
}) {
  const [ke, Q] = o.useState(!1), Oe = je ? 14 : 40;
  return je ? /* @__PURE__ */ t.jsxs(
    "div",
    {
      className: "flex flex-col items-center bg-[#2a2a2a] border-r border-[#3a3a3a] shrink-0",
      style: { width: Oe, minWidth: Oe },
      children: [
        /* @__PURE__ */ t.jsx("div", { className: "h-1" }),
        /* @__PURE__ */ t.jsx(Xs, { size: 28, title: "Show drawing tools", onClick: () => r?.(), children: /* @__PURE__ */ t.jsx(pl, { type: "chevronRight" }) })
      ]
    }
  ) : /* @__PURE__ */ t.jsxs(
    "div",
    {
      className: "flex flex-col bg-[#2a2a2a] border-r border-[#3a3a3a] shrink-0 select-none",
      style: { width: Oe, minWidth: Oe },
      children: [
        /* @__PURE__ */ t.jsx("div", { className: "h-1 shrink-0" }),
        /* @__PURE__ */ t.jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden flex flex-col items-center gap-[2px] px-0 py-1 scrollbar-thin", children: ad.map((nt, Ae) => /* @__PURE__ */ t.jsxs(ki.Fragment, { children: [
          Ae > 0 && /* @__PURE__ */ t.jsx("div", { className: "w-[26px] h-px bg-[#3a3a3a] my-[5px] shrink-0" }),
          nt.tools.map((Be) => /* @__PURE__ */ t.jsx(
            Xs,
            {
              active: s === Be,
              title: id[Be],
              onClick: () => {
                n?.(s === Be ? "cursor" : Be);
              },
              children: /* @__PURE__ */ t.jsx(cd, { tool: Be })
            },
            Be
          ))
        ] }, Ae)) }),
        /* @__PURE__ */ t.jsxs("div", { className: "shrink-0 flex flex-col items-center gap-[2px] pb-1", children: [
          /* @__PURE__ */ t.jsx("div", { className: "w-[26px] h-px bg-[#3a3a3a] my-[5px]" }),
          /* @__PURE__ */ t.jsx(Xs, { active: h, title: "Magnet (snap to OHLC)", onClick: () => T?.(), children: /* @__PURE__ */ t.jsx(pl, { type: "magnet" }) }),
          /* @__PURE__ */ t.jsx(Xs, { active: I, title: I ? "Show drawings" : "Hide all drawings", onClick: () => ne?.(), children: /* @__PURE__ */ t.jsx(pl, { type: I ? "eyeOff" : "eye" }) }),
          /* @__PURE__ */ t.jsx(Xs, { title: "Remove all drawings", onClick: () => Q(!0), children: /* @__PURE__ */ t.jsx(pl, { type: "trash" }) }),
          /* @__PURE__ */ t.jsx(Xs, { title: "Hide drawing toolbar", onClick: () => r?.(), children: /* @__PURE__ */ t.jsx(pl, { type: "chevronLeft" }) })
        ] }),
        ke && /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/40", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-[#262626] border border-[#3a3a3a] rounded-[3px] p-3 w-[200px] shadow-xl", children: [
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
                  le?.(), Q(!1);
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
const Vo = [
  { id: "candles", label: "Candles", desc: "OHLC candles" },
  { id: "fp_cluster", label: "Footprint Cluster", desc: "Bid/ask volume per price" },
  { id: "fp_profile", label: "Footprint Profile", desc: "Delta profile per candle" },
  { id: "heikin_ashi", label: "Heikin Ashi", desc: "Smoothed trend candles" },
  { id: "line", label: "Line", desc: "Close price line + live dot" },
  { id: "tpo", label: "TPO", desc: "Time Price Opportunity 30m blocks" },
  { id: "renko", label: "Renko", desc: "Brick size in ticks, price-driven" },
  { id: "flow_positioning", label: "Flow & Positioning", desc: "Analytics flow" }
];
function dd({
  value: s,
  onChange: n
}) {
  const [h, T] = o.useState(!1), I = o.useRef(null);
  o.useEffect(() => {
    const le = (je) => {
      I.current && !I.current.contains(je.target) && T(!1);
    };
    return document.addEventListener("mousedown", le), () => document.removeEventListener("mousedown", le);
  }, []);
  const ne = Vo.find((le) => le.id === s) || Vo[0];
  return /* @__PURE__ */ t.jsxs("div", { ref: I, className: "relative", children: [
    /* @__PURE__ */ t.jsxs(
      "button",
      {
        onClick: () => T((le) => !le),
        className: "flex items-center gap-1 px-2 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8] hover:bg-[#343434]",
        children: [
          /* @__PURE__ */ t.jsx("span", { className: "font-medium", children: ne.label }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[8px] opacity-60", children: "▾" })
        ]
      }
    ),
    h && /* @__PURE__ */ t.jsx("div", { className: "absolute top-full left-0 mt-1 z-30 w-[200px] bg-[#262626] border border-[#3a3a3a] rounded shadow-xl py-1", children: Vo.map((le) => /* @__PURE__ */ t.jsxs(
      "button",
      {
        onClick: () => {
          n(le.id), T(!1);
        },
        className: `w-full text-left px-3 py-1.5 text-[11px] flex flex-col hover:bg-[#343434] ${s === le.id ? "bg-[#343434] text-[#e8e8e8]" : "text-[#b9b9b9]"}`,
        children: [
          /* @__PURE__ */ t.jsx("span", { className: "font-medium", children: le.label }),
          /* @__PURE__ */ t.jsx("span", { className: "text-[9px] opacity-60", children: le.desc })
        ]
      },
      le.id
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
function hd({
  value: s,
  onChange: n,
  favs: h,
  onToggleFav: T
}) {
  const [I, ne] = o.useState(!1), [le, je] = o.useState(""), r = o.useRef(null);
  o.useEffect(() => {
    const D = (K) => {
      r.current && !r.current.contains(K.target) && ne(!1);
    };
    return document.addEventListener("mousedown", D), () => document.removeEventListener("mousedown", D);
  }, []);
  const ke = (D) => {
    const K = D.trim();
    if (!K) return null;
    if (K.toLowerCase() === "tick") return Xt.find((ze) => ze.label === "tick") || { label: "tick", ms: 0, sec: 0 };
    if (K === "1M" || K.toLowerCase() === "1mth" || K.toLowerCase() === "1mo")
      return Xt.find((ze) => ze.label === "1M");
    const Ce = K.match(/^(\d+)(s|m|h|d|w|M)$/i);
    if (!Ce) return null;
    const re = parseInt(Ce[1], 10);
    if (!(re > 0)) return null;
    const ee = Ce[2], qe = ee.toLowerCase();
    let pe = 0;
    if (ee === "M") pe = re * 2592e6;
    else if (qe === "s") pe = re * 1e3;
    else if (qe === "m") pe = re * 6e4;
    else if (qe === "h") pe = re * 36e5;
    else if (qe === "d") pe = re * 864e5;
    else if (qe === "w") pe = re * 6048e5;
    else return null;
    if (pe < 1e3 && K.toLowerCase() !== "tick" && pe === 0 || pe > 31536e6) return null;
    const gt = ee === "M" ? `${re}M` : `${re}${qe === "d" ? "d" : qe === "w" ? "w" : qe}`;
    return { label: ee === "M" ? `${re}M` : qe === "d" && ee === "D" ? `${re}D` : qe === "w" && ee === "W" ? `${re}W` : gt, ms: pe, sec: Math.floor(pe / 1e3) };
  }, Q = (D) => h.has(D) || h.has(D.toLowerCase()) || h.has(D.toUpperCase()), Oe = Xt.filter((D) => h.has(D.label)), nt = ["1m", "5m", "15m", "1h", "4h", "1D"], Be = (Oe.length ? Oe.map((D) => D.label).slice(0, 6) : nt).filter((D, K, Ce) => Ce.indexOf(D) === K), be = (D) => {
    n(D), ne(!1);
  }, Ee = (D) => D ? D === "1M" ? "1M" : D.toLowerCase() : "", Se = Ee(s.label);
  return /* @__PURE__ */ t.jsxs("div", { ref: r, className: "relative", style: { overflow: "visible" }, children: [
    /* @__PURE__ */ t.jsxs(
      "div",
      {
        className: "flex items-center gap-3 px-2 py-1 border border-[#3a3a3a] rounded bg-[#262626] text-[11px] font-mono cursor-pointer select-none overflow-visible",
        onClick: () => ne((D) => !D),
        title: "Click to drop timeframe panel — exact EdgeDepth full list tick 1s 15s 30s 1m 3m 5m 15m 30m 1h 2h 4h 8h 12h 1d 3d 1w 1M + Custom",
        children: [
          Be.map((D) => {
            const K = Xt.find((re) => re.label === D) || Xt.find((re) => re.label.toLowerCase() === D.toLowerCase()), Ce = K ? Ee(K.label) === Se || D.toLowerCase() === "1d" && (Se === "1d" || Se === "1D") : !1;
            return /* @__PURE__ */ t.jsx(
              "span",
              {
                onClick: (re) => {
                  re.stopPropagation(), K && be(K);
                },
                className: `pb-0.5 border-b-[2px] ${Ce ? "border-[#e8e8e8] text-[#e8e8e8]" : "border-transparent text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
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
              Oe.length,
              "/6 · FULL BAR"
            ] })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { className: "px-3 py-2 space-y-3 bg-[#0a0a0a] max-h-[65vh] overflow-auto", children: [
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] tracking-wider mb-1.5", children: "TICKS" }),
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-4 text-[11px] flex-wrap", children: ["tick"].map((D) => {
                const K = Xt.find((ee) => ee.label === D), Ce = K ? Ee(K.label) === Se : !1, re = Q(D);
                return /* @__PURE__ */ t.jsxs(
                  "button",
                  {
                    onClick: () => {
                      K && be(K);
                    },
                    onContextMenu: (ee) => {
                      ee.preventDefault(), T(D);
                    },
                    className: `flex items-center gap-0.5 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    title: "Tick chart — one bar per trade, click sets chart",
                    children: [
                      D,
                      " ",
                      re && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
                    ]
                  },
                  D
                );
              }) })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [
                /* @__PURE__ */ t.jsx("span", { className: "text-[10px] text-[#b9b9b9] tracking-wider", children: "SECONDS" }),
                /* @__PURE__ */ t.jsx("span", { className: "text-[9px] px-1 py-0.5 bg-[#1e2a2a] border border-[#21b3a4]/30 text-[#21b3a4] rounded flex items-center gap-0.5", children: "🔒 PRO" })
              ] }),
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-3 text-[11px] flex-wrap", children: ["1s", "5s", "15s", "30s"].map((D) => {
                const K = Xt.find((ee) => ee.label === D), Ce = K ? Ee(K.label) === Se : !1, re = Q(D);
                return /* @__PURE__ */ t.jsxs(
                  "button",
                  {
                    onClick: () => {
                      K && be(K);
                    },
                    onContextMenu: (ee) => {
                      ee.preventDefault(), T(D);
                    },
                    className: `flex items-center gap-0.5 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    title: "SECONDS PRO — click sets, right-click pins",
                    children: [
                      D,
                      " ",
                      re && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" }),
                      " ",
                      /* @__PURE__ */ t.jsx("span", { className: "text-[8px] opacity-50", children: "🔒" })
                    ]
                  },
                  D
                );
              }) })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] tracking-wider mb-1.5", children: "MINUTES" }),
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-3 text-[11px] flex-wrap", children: ["1m", "3m", "5m", "15m", "30m"].map((D) => {
                const K = Xt.find((ee) => ee.label === D), Ce = K ? Ee(K.label) === Se : !1, re = Q(D);
                return /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    onClick: () => {
                      K && be(K);
                    },
                    onContextMenu: (ee) => {
                      ee.preventDefault(), T(D);
                    },
                    className: `flex flex-col items-center gap-0.5 pb-0.5 border-b-[2px] ${Ce ? "border-[#e8e8e8] text-[#e8e8e8]" : "border-transparent text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    title: "Click sets chart, right-click pins to bar (max 6)",
                    children: /* @__PURE__ */ t.jsxs("span", { className: "flex items-center gap-0.5", children: [
                      D,
                      " ",
                      re && /* @__PURE__ */ t.jsx("span", { className: "text-[8px] text-[#e8e8e8]", children: "★" })
                    ] })
                  },
                  D
                );
              }) })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("div", { className: "text-[10px] text-[#b9b9b9] tracking-wider mb-1.5", children: "HOURS" }),
              /* @__PURE__ */ t.jsx("div", { className: "flex gap-3 text-[11px] flex-wrap", children: ["1h", "2h", "4h", "6h", "8h", "12h"].map((D) => {
                const K = Xt.find((ee) => ee.label === D), Ce = K ? Ee(K.label) === Se : !1, re = Q(D);
                return /* @__PURE__ */ t.jsxs(
                  "button",
                  {
                    onClick: () => {
                      K && be(K);
                    },
                    onContextMenu: (ee) => {
                      ee.preventDefault(), T(D);
                    },
                    className: `flex items-center gap-0.5 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    children: [
                      D,
                      " ",
                      re && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
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
                  const K = Xt.find((ee) => ee.label === D), Ce = K ? Ee(K.label) === Se : !1, re = Q(D);
                  return /* @__PURE__ */ t.jsxs(
                    "button",
                    {
                      onClick: () => {
                        K && be(K);
                      },
                      onContextMenu: (ee) => {
                        ee.preventDefault(), T(D);
                      },
                      className: `flex items-center gap-0.5 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                      children: [
                        D,
                        " ",
                        re && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
                      ]
                    },
                    D
                  );
                }),
                ["1D", "1W"].map((D) => {
                  const K = Xt.find((ee) => ee.label === D), Ce = K ? Ee(K.label) === Se : !1, re = Q(D);
                  return /* @__PURE__ */ t.jsxs(
                    "button",
                    {
                      onClick: () => {
                        K && be(K);
                      },
                      onContextMenu: (ee) => {
                        ee.preventDefault(), T(D);
                      },
                      className: `flex items-center gap-0.5 opacity-70 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                      title: "Alias — same as lowercase",
                      children: [
                        D,
                        " ",
                        re && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
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
                const K = Xt.find((ee) => ee.label === D), Ce = K ? K.label === s.label || s.label === "1M" : !1, re = Q(D);
                return /* @__PURE__ */ t.jsxs(
                  "button",
                  {
                    onClick: () => {
                      K && be(K);
                    },
                    onContextMenu: (ee) => {
                      ee.preventDefault(), T(D);
                    },
                    className: `flex items-center gap-0.5 ${Ce ? "text-[#e8e8e8] border-b-[2px] border-[#e8e8e8]" : "text-[#b9b9b9] hover:text-[#e8e8e8]"}`,
                    children: [
                      D,
                      " ",
                      re && /* @__PURE__ */ t.jsx("span", { className: "text-[8px]", children: "★" })
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
                  value: le,
                  onChange: (D) => je(D.target.value),
                  onKeyDown: (D) => {
                    if (D.key === "Enter") {
                      const K = ke(le);
                      K && be(K);
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
                    const D = ke(le);
                    D && be(D);
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
const fd = {
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
function pd({
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
const Hr = fd;
function xd({ open: s, onClose: n, onSelect: h }) {
  const [T, I] = o.useState(""), [ne, le] = o.useState(""), [je, r] = o.useState([]);
  o.useEffect(() => {
    let Q = !0;
    return s && (async () => {
      try {
        const be = ["/api/orderflow/tickers?limit=770", "/api/symbols?limit=770", "/api/tickers"];
        for (const Ee of be)
          try {
            const Se = await fetch(Ee);
            if (Se.ok) {
              const D = await Se.json(), K = D.tickers || D.symbols || D.data || [];
              if (K.length) {
                const Ce = K.slice(0, 770).map((re) => ({
                  symbol: re.symbol || re.pair || re.name,
                  base: re.base_asset || re.base || (re.symbol || "").split("USDT")[0] || re.symbol,
                  exchange: re.exchange || re.provider || "binancef",
                  price: re.last_price || re.price || 100 + Math.random() * 5e4,
                  change: re.change_pct_24h || re.change || (Math.random() - 0.5) * 10,
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
      const nt = ["BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "DOGE", "AVAX", "DOT", "LINK", "LTC", "BCH", "UNI", "XLM", "ETC", "FIL", "TRX", "APT", "ARB", "OP", "MATIC", "ATOM", "NEAR", "FTM", "ALGO"], Ae = ["binancef", "hl", "coinbase"], Be = [];
      for (let be = 0; be < 770; be++) {
        const Ee = nt[be % nt.length], Se = Ae[be % Ae.length];
        Be.push({ symbol: `${Ee}${Se === "binancef" ? "USDT" : "-USD"}`, base: Ee, exchange: Se, price: 100 + Math.random() * 5e4, change: (Math.random() - 0.5) * 10, listed: !0 });
      }
      r(Be);
    })(), () => {
      Q = !1;
    };
  }, [s]);
  const ke = o.useMemo(() => je.filter((Q) => !(ne && Q.exchange !== ne || T && !Q.symbol.toLowerCase().includes(T.toLowerCase()) && !Q.base.toLowerCase().includes(T.toLowerCase()))).slice(0, 200), [je, T, ne]);
  return s ? /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-[150] flex items-center justify-center bg-black/60", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-[#262626] border border-[#3a3a3a] rounded shadow-2xl w-[480px] max-h-[80vh] flex flex-col", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "px-3 py-2 border-b border-[#3a3a3a] flex items-center gap-2", children: [
      /* @__PURE__ */ t.jsx("span", { className: "text-[11px] font-bold tracking-wider text-[#e8e8e8]", children: "FIND SYMBOL — 770 LISTED" }),
      /* @__PURE__ */ t.jsxs("span", { className: "text-[9px] text-[#b9b9b9]", children: [
        je.length,
        " loaded • ",
        ne || "all venues"
      ] }),
      /* @__PURE__ */ t.jsx("button", { onClick: n, className: "ml-auto text-[#b9b9b9] hover:text-[#e8e8e8]", children: "×" })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "p-2 flex gap-2 border-b border-[#3a3a3a]/50", children: [
      /* @__PURE__ */ t.jsx("input", { value: T, onChange: (Q) => I(Q.target.value), placeholder: "Search BTC, ETH...", className: "flex-1 px-2 py-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded text-[11px] text-[#e8e8e8]", autoFocus: !0 }),
      /* @__PURE__ */ t.jsxs("select", { value: ne, onChange: (Q) => le(Q.target.value), className: "px-2 py-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded text-[10px] text-[#b9b9b9]", children: [
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
      ke.map((Q) => /* @__PURE__ */ t.jsxs("div", { onClick: () => {
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
      ke.length === 0 && /* @__PURE__ */ t.jsxs("div", { className: "px-2 py-4 text-[11px] text-[#b9b9b9] text-center", children: [
        "No matches — ",
        je.length,
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
function bd({ onSelect: s }) {
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
const fn = (() => {
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
})(), Yo = /* @__PURE__ */ new Set(), xl = () => Yo.forEach((s) => s()), eo = (s, n) => {
  try {
    localStorage.setItem(s, n);
  } catch {
  }
}, Cn = {
  get: () => fn,
  setLayout(s) {
    fn.layout = s, eo("lset-layout", s), xl();
  },
  setSync(s) {
    fn.sync = s, eo("lset-layout-sync", JSON.stringify(s)), xl();
  },
  setPanelSymbol(s, n) {
    fn.panelSymbols = [...fn.panelSymbols], fn.panelSymbols[s] = n, eo("lset-layout-symbols", JSON.stringify(fn.panelSymbols)), xl();
  },
  setPanelKind(s, n) {
    fn.panelKinds = [...fn.panelKinds], fn.panelKinds[s] = n, eo("lset-layout-kinds", JSON.stringify(fn.panelKinds)), xl();
  },
  setActivePanel(s) {
    fn.activePanel !== s && (fn.activePanel = s, xl());
  },
  subscribe(s) {
    return Yo.add(s), () => {
      Yo.delete(s);
    };
  }
};
function Qo() {
  const [, s] = o.useState(0);
  return o.useEffect(() => Cn.subscribe(() => s((n) => n + 1)), []), { ...fn };
}
const vd = o.lazy(() => import("./chunks/depth-DgOhdG7Y.js").then((s) => s.E)), yd = o.lazy(() => import("./chunks/OrderflowPanel-3gWgqqly.js"));
o.lazy(() => import("./chunks/DOMPanel-CXeJYfu3.js"));
o.lazy(() => import("./chunks/TapePanel-CHPghbfI.js"));
const kd = o.lazy(() => import("./chunks/FootprintPanel-9lf4EGuV.js")), wd = o.lazy(() => import("./chunks/VolumeProfilePanel-D_VY7Om5.js")), Sd = o.lazy(() => import("./chunks/TPOPanel-h_4YpZGs.js")), Cd = o.lazy(() => import("./chunks/CVDPanel-yEJSuTR6.js")), Id = o.lazy(() => import("./chunks/LiquidationPanel-fYGFwa7I.js")), Td = o.lazy(() => import("./chunks/EdgeDepthDOMPanel-CSa5pgLO.js")), jd = o.lazy(() => import("./chunks/EdgeDepthTapePanel-DQfRW2GA.js")), Md = o.lazy(() => import("./chunks/EdgeDepthWatchlist-C5OkGnPW.js")), Rd = o.lazy(() => import("./chunks/EdgeDepthIndicators-Bu1JCT-0.js")), $r = () => /* @__PURE__ */ t.jsx("div", { className: "h-full w-full flex items-center justify-center text-[11px] text-[var(--dim)]", children: "Loading…" }), Vr = {
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
function Pd({
  symbol: s,
  sourceProvider: n,
  timeframe: h,
  colors: T,
  active: I,
  onActivate: ne,
  kind: le,
  onToggleKind: je,
  syncedCrosshairTime: r,
  onCrosshairMove: ke,
  syncedViewportTime: Q,
  onViewportTimeChange: Oe,
  quote: nt
}) {
  const [Ae, Be] = o.useState([]), be = lo(), Ee = o.useRef(!0);
  o.useEffect(() => (Ee.current = !0, () => {
    Ee.current = !1;
  }), []), o.useEffect(() => {
    if (le !== "chart") return;
    let D = !1;
    Be([]);
    const K = async () => {
      try {
        const re = await $u("multi_panel", {
          symbol: s,
          timeframe: h,
          limit: 500
        });
        !D && re?.length && Be(re.map((ee) => ({
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
    K();
    const Ce = setInterval(K, 1e4);
    return () => {
      D = !0, clearInterval(Ce);
    };
  }, [s, h, le]);
  const Se = () => {
    const D = le;
    return D === "depth" ? /* @__PURE__ */ t.jsx(
      ed,
      {
        symbol: s,
        sourceProvider: n,
        colors: T,
        syncedCrosshairTime: r,
        onCrosshairMove: ke,
        onToggleKind: je
      }
    ) : D === "edgedepth" ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx($r, {}), children: /* @__PURE__ */ t.jsx(
      vd,
      {
        symbol: s,
        provider: n || "binance",
        onToggleKind: je
      }
    ) }) : ["orderflow", "dom", "tape", "footprint", "vpvr", "tpo", "cvd", "liquidations", "watchlist", "indicators"].includes(D) ? /* @__PURE__ */ t.jsxs(o.Suspense, { fallback: /* @__PURE__ */ t.jsx($r, {}), children: [
      D === "orderflow" && /* @__PURE__ */ t.jsx(yd, { symbol: s, provider: n || "binance", colors: T }),
      D === "dom" && /* @__PURE__ */ t.jsx(Td, { symbol: s, provider: n || "binance" }),
      D === "tape" && /* @__PURE__ */ t.jsx(jd, { symbol: s, provider: n || "binance" }),
      D === "footprint" && /* @__PURE__ */ t.jsx(kd, { symbol: s, provider: n || "binance" }),
      D === "vpvr" && /* @__PURE__ */ t.jsx(wd, { symbol: s, provider: n || "binance" }),
      D === "tpo" && /* @__PURE__ */ t.jsx(Sd, { symbol: s, provider: n || "binance" }),
      D === "cvd" && /* @__PURE__ */ t.jsx(Cd, { symbol: s, provider: n || "binance" }),
      D === "liquidations" && /* @__PURE__ */ t.jsx(Id, { symbol: s, provider: n || "binance" }),
      D === "watchlist" && /* @__PURE__ */ t.jsx(Md, { activeSymbol: s, onSelectSymbol: (K) => {
        try {
          window.__lseShell?.selectSymbol?.(K);
        } catch {
        }
      } }),
      D === "indicators" && /* @__PURE__ */ t.jsx(Rd, { symbol: s, provider: n || "binance" })
    ] }) : Ae.length > 0 ? /* @__PURE__ */ t.jsx(
      Jo,
      {
        candles: Ae,
        symbol: s,
        timeframe: h,
        chartType: "candlestick",
        livePrice: Ae[Ae.length - 1]?.close ?? null,
        rightOffset: 6,
        colors: T,
        indicators: Ls,
        timezone: be?.data?.timezone || "local",
        syncedCrosshairTime: r ?? void 0,
        onCrosshairMove: ke,
        syncedViewportTime: Q ?? void 0,
        onViewportTimeChange: Oe,
        showBidAskSpread: !!nt,
        brokerBid: nt?.bid ?? null,
        brokerAsk: nt?.ask ?? null
      }
    ) : null;
  };
  return /* @__PURE__ */ t.jsxs(
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
      children: [
        Se(),
        le === "chart" && /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: (D) => {
              D.stopPropagation(), je();
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
  quote: ne,
  sourceProvider: le
}) {
  const je = Vr[s] || Vr["2x2"], { activePanel: r, panelSymbols: ke, panelKinds: Q } = Qo(), Oe = Math.min(r, je.count - 1), [nt, Ae] = o.useState([]), [Be, be] = o.useState(null), [Ee, Se] = o.useState(null), D = o.useMemo(() => I || oo(), [I]);
  o.useEffect(() => {
    Ae((re) => {
      const ee = [...re];
      for (let qe = ee.length; qe < je.count; qe++)
        ee.push(qe === 0 ? T : Xr[qe % Xr.length]);
      return ee.slice(0, je.count);
    });
  }, [je.count, T]);
  const K = o.useCallback((re) => {
    n.syncCrosshair && be(re);
  }, [n.syncCrosshair]), Ce = o.useCallback((re) => {
    n.syncTime && Se(re);
  }, [n.syncTime]);
  return /* @__PURE__ */ t.jsx("div", { style: {
    display: "grid",
    width: "100%",
    height: "100%",
    gap: 2,
    gridTemplateColumns: `repeat(${je.cols}, 1fr)`,
    gridTemplateRows: `repeat(${je.rows}, 1fr)`
  }, children: Array.from({ length: je.count }, (re, ee) => /* @__PURE__ */ t.jsx(
    Pd,
    {
      symbol: n.syncSymbol ? h : ke[ee] || h,
      sourceProvider: le,
      timeframe: n.syncInterval ? T : nt[ee] || T,
      colors: D,
      active: ee === Oe,
      onActivate: () => Cn.setActivePanel(ee),
      kind: Q[ee] || "chart",
      onToggleKind: () => {
        const qe = Q[ee] || "chart", pe = ["chart", "depth", "edgedepth", "orderflow", "dom", "tape", "footprint", "vpvr", "tpo", "cvd", "liquidations", "watchlist", "indicators"], gt = pe.indexOf(qe), wt = pe[(gt + 1) % pe.length];
        Cn.setPanelKind(ee, wt);
      },
      syncedCrosshairTime: n.syncCrosshair ? Be : null,
      onCrosshairMove: K,
      syncedViewportTime: n.syncTime ? Ee : null,
      onViewportTimeChange: Ce,
      quote: ne
    },
    ee
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
let Yr = !1, to = null;
async function Ld() {
  const s = {};
  for (const n of no) {
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
function zr() {
  to && clearTimeout(to), to = setTimeout(() => {
    to = null, Ld();
  }, 400);
}
async function Qr() {
  if (Yr) return;
  Yr = !0;
  try {
    const h = await fetch("/api/workspace/tools");
    if (h.ok) {
      const I = (await h.json())?.value ?? {};
      for (const ne of no) {
        const le = I[ne];
        typeof le == "string" && localStorage.setItem(ne, le);
      }
    }
  } catch {
  }
  const s = localStorage.setItem.bind(localStorage), n = localStorage.removeItem.bind(localStorage);
  localStorage.setItem = (h, T) => {
    s(h, T), no.includes(h) && zr();
  }, localStorage.removeItem = (h) => {
    n(h), no.includes(h) && zr();
  };
}
const Kr = ["#38bdf8", "#fbbf24", "#c084fc", "#34d399", "#fb7185", "#a3e635"];
function Ed(s, n) {
  if (!s || !n.length) return [];
  const h = /* @__PURE__ */ new Map();
  for (let ne = 0; ne < n.length; ne++)
    h.set(Math.floor(n[ne].time / 1e3), ne);
  const T = [];
  let I = 0;
  for (const [ne, le] of Object.entries(s))
    for (const [je, r] of Object.entries(le.series || {})) {
      const ke = new Array(n.length).fill(NaN);
      let Q = 0;
      for (const [Ae, Be] of r.points || []) {
        const be = h.get(Ae);
        be !== void 0 && (ke[be] = Be, Q++);
      }
      if (!Q) continue;
      const nt = Object.keys(le.series).length > 1 ? `${ne} ${je}` : ne;
      T.push({
        id: `local-${ne}-${je}`,
        name: nt,
        // The prefix is what tells ProChart's formula evaluator to leave this
        // series alone and draw the precomputed values.
        expression: `local:${ne}:${je}`,
        enabled: !0,
        display: le.overlay ? "overlay" : "subplot",
        color: Kr[I++ % Kr.length],
        lineWidth: 2,
        zeroLine: !1,
        data: ke,
        kind: r.kind,
        // One pane per ENGINE INDICATOR, not per column: MACD's three series
        // must share a pane and a scale or the histogram is meaningless.
        group: ne
      });
    }
  return T;
}
const Ad = o.lazy(() => import("./chunks/depth-DgOhdG7Y.js").then((s) => s.a)), Dd = o.lazy(() => import("./chunks/depth-DgOhdG7Y.js").then((s) => s.E)), Ur = o.lazy(() => import("./chunks/OrderflowPanel-3gWgqqly.js"));
o.lazy(() => import("./chunks/DOMPanel-CXeJYfu3.js"));
o.lazy(() => import("./chunks/TapePanel-CHPghbfI.js"));
const Bd = o.lazy(() => import("./chunks/FootprintPanel-9lf4EGuV.js")), Wd = o.lazy(() => import("./chunks/VolumeProfilePanel-D_VY7Om5.js")), Fd = o.lazy(() => import("./chunks/TPOPanel-h_4YpZGs.js")), Od = o.lazy(() => import("./chunks/CVDPanel-yEJSuTR6.js")), _d = o.lazy(() => import("./chunks/LiquidationPanel-fYGFwa7I.js")), Hd = o.lazy(() => import("./chunks/EdgeDepthDOMPanel-CSa5pgLO.js")), $d = o.lazy(() => import("./chunks/EdgeDepthTapePanel-DQfRW2GA.js")), Vd = o.lazy(() => import("./chunks/EdgeDepthWatchlist-C5OkGnPW.js")), Xd = o.lazy(() => import("./chunks/EdgeDepthIndicators-Bu1JCT-0.js")), Yd = o.lazy(() => import("./chunks/EdgeDepthLayers-DRUflkF6.js")), zd = o.lazy(() => import("./chunks/EdgeDepthLiquidationPanel-Bt3fyOwF.js")), Kd = o.lazy(() => import("./chunks/EdgeDepthVolumeProfilePanel-BC2W3WpS.js")), Ud = o.lazy(() => import("./chunks/EdgeDepthFootprintPanel-FdQWkwUq.js")), qd = o.lazy(() => import("./chunks/EdgeDepthTPOPanel-CbTLWjSe.js")), Gd = o.lazy(() => import("./chunks/backtest-BOI-AqD2.js").then((s) => s.bO)), Zd = o.lazy(() => import("./chunks/backtest-BOI-AqD2.js").then((s) => s.bP)), Jd = o.lazy(() => import("./chunks/econ-CJsRkA6M.js")), Qd = o.lazy(() => import("./chunks/dataviz-D6zeVYjn.js")), eh = o.lazy(() => import("./chunks/quant-CKRT66-2.js")), th = o.lazy(() => import("./chunks/notebooks-fOzYQotZ.js")), es = () => /* @__PURE__ */ t.jsx("div", { className: "h-full w-full flex items-center justify-center text-[11px] text-[var(--dim)]", children: "Loading…" }), nh = {
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
}, Sn = {
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
}, hs = (s) => {
  s.currentTarget.style.background = "var(--hover)";
}, fs = (s) => {
  s.currentTarget.style.background = "transparent";
};
function sh({ provider: s, symbol: n, timeframe: h, candles: T, chartType: I = "candlestick", trades: ne = [], engineIndicators: le, indicatorPatch: je = null, quote: r = null, positions: ke = [], onPositionModify: Q, onPositionClose: Oe, autoSelectPositionId: nt = null }) {
  const Ae = `${s}|${n}|${h}`, [Be, be] = o.useState(() => {
    try {
      const m = `${s}|${n}|${h}`, ie = localStorage.getItem(`lse-candles-${m}`);
      if (ie) {
        const ae = JSON.parse(ie);
        if (Array.isArray(ae) && ae.length > 0)
          return { key: m, older: ae.slice(-200), shift: 0 };
      }
    } catch {
    }
    return { key: Ae, older: [], shift: 0 };
  });
  Be.key !== Ae && be({ key: Ae, older: [], shift: 0 });
  const Ee = o.useRef(null), Se = o.useRef(!1), [D, K] = o.useState(!1), Ce = o.useMemo(() => {
    if (!Be.older.length || !T.length) {
      try {
        T.length > 0 && localStorage.setItem(`lse-candles-${Ae}`, JSON.stringify(T.slice(-200)));
      } catch {
      }
      return T;
    }
    const m = T[0].time, ie = [...Be.older.filter((ae) => ae.time < m), ...T];
    try {
      localStorage.setItem(`lse-candles-${Ae}`, JSON.stringify(ie.slice(-200)));
    } catch {
    }
    return ie;
  }, [Be.older, T, Ae]), re = o.useCallback(async () => {
    if (Se.current || Ee.current === Ae) return;
    const ie = Ce;
    if (!ie.length || ie.length >= 5e4) return;
    const ae = Ae, ve = ie[0].time;
    Se.current = !0, K(!0);
    try {
      const ft = `/api/candles?provider=${encodeURIComponent(s)}&symbol=${encodeURIComponent(n)}&timeframe=${encodeURIComponent(h)}&limit=5000&end=${encodeURIComponent(new Date(ve).toISOString())}`, Re = await fetch(ft);
      if (!Re.ok) {
        let _e = "";
        try {
          _e = String((await Re.json()).detail || "");
        } catch {
        }
        /no (history|prints|data)|served no|no real candles/i.test(_e) && (Ee.current = ae);
        return;
      }
      const mt = ((await Re.json()).candles || []).map(([_e, ot, Os, Ss, Ct, Cs]) => ({
        time: _e < 1e12 ? _e * 1e3 : _e,
        open: ot,
        high: Os,
        low: Ss,
        close: Ct,
        volume: Cs
      })).filter((_e) => _e.time < ve);
      if (!mt.length) {
        Ee.current = ae;
        return;
      }
      be((_e) => _e.key !== ae ? _e : {
        key: ae,
        older: [...mt, ..._e.older],
        shift: _e.shift + mt.length
      });
    } catch {
    } finally {
      Se.current = !1, K(!1);
    }
  }, [Ce, s, n, h, Ae]), [ee, qe] = o.useState(null), [pe, gt] = o.useState(null), [wt, ze] = o.useState("cursor"), [Yt, en] = o.useState(!1), [tt, xt] = o.useState(!1), [tn, In] = o.useState(null), [Tt, Nt] = o.useState([]), [on, zt] = o.useState(Ls), [rn, An] = o.useState(!1), [xs, zs] = o.useState(!1), [ms, ts] = o.useState("candles"), [bs, gs] = o.useState(() => {
    try {
      const m = typeof h == "string" ? h : "1m", ie = Xt.find((ae) => ae.label.toLowerCase() === m.toLowerCase() || ae.label === m);
      if (ie) return ie;
    } catch {
    }
    return Xt.find((m) => m.label === "1m") || Xt[5] || Xt[0];
  }), [Ks, wl] = o.useState(() => {
    try {
      const m = localStorage.getItem("ed_fav_tf");
      return new Set(m ? JSON.parse(m) : ["1m", "5m", "15m", "1h", "4h", "1D"]);
    } catch {
      return /* @__PURE__ */ new Set(["1m", "5m", "15m", "1h", "4h", "1D"]);
    }
  });
  o.useEffect(() => {
    try {
      const m = String(h || "1m"), ie = Xt.find((ae) => ae.label.toLowerCase() === m.toLowerCase() || ae.label === m);
      if (ie && ie.label.toLowerCase() !== bs.label.toLowerCase())
        gs(ie);
      else if (!ie) {
        const ae = m.match(/^(\d+)([smhdwM])$/i);
        if (ae) {
          const ve = parseInt(ae[1], 10), ft = ae[2];
          let Re = 0;
          const Lt = ft.toLowerCase();
          ft === "M" ? Re = ve * 2592e6 : Lt === "s" ? Re = ve * 1e3 : Lt === "m" ? Re = ve * 6e4 : Lt === "h" ? Re = ve * 36e5 : Lt === "d" ? Re = ve * 864e5 : Lt === "w" && (Re = ve * 6048e5), Re > 0 && gs({ label: m, ms: Re, sec: Math.floor(Re / 1e3) });
        } else m.toLowerCase() === "tick" && gs({ label: "tick", ms: 0, sec: 0 });
      }
    } catch {
    }
  }, [h]);
  const [at, Sl] = o.useState(() => {
    try {
      const m = localStorage.getItem("ed_appearance");
      if (m) return { ...Hr, ...JSON.parse(m) };
    } catch {
    }
    return Hr;
  }), [Ge, Es] = o.useState(!1);
  o.useEffect(() => {
    try {
      localStorage.setItem("ed_appearance", JSON.stringify(at));
    } catch {
    }
  }, [at]);
  const [Us, qs] = o.useState(!1), [ro, As] = o.useState(!1), [Gs, Ds] = o.useState("SECONDS PRO"), [gn, xe] = o.useState(!1), [Zs, de] = o.useState(() => {
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
  }), Dt = o.useCallback((m) => {
    de(m);
    try {
      localStorage.setItem("ed_layers", JSON.stringify(m));
    } catch {
    }
    const ie = (ae) => m.find((ve) => ve.id === ae)?.enabled;
    zt((ae) => {
      let ve = !1;
      const ft = { ...ae };
      if (ie("vpvr") !== void 0) {
        const Re = !!ie("vpvr");
        ae.volumeProfile?.enabled !== Re && (ft.volumeProfile = { ...ae.volumeProfile, enabled: Re, numberOfRows: 48, rowWidth: 15, opacity: 60 }, ve = !0);
      }
      if (ie("session_vwap") !== void 0) {
        const Re = !!ie("session_vwap");
        ae.vwap?.enabled !== Re && (ft.vwap = { ...ae.vwap, enabled: Re, color: "#2196F3" }, ve = !0);
      }
      if (ie("prev_day") !== void 0 || ie("prev_week") !== void 0) {
        const Re = !!ie("prev_day") || !!ie("prev_week");
        ae.pivotPoints?.enabled !== Re && (ft.pivotPoints = { ...ae.pivotPoints, enabled: Re }, ve = !0);
      }
      return ve ? ft : ae;
    }), ie("liquidations");
  }, []), Me = o.useCallback(() => {
    window.dispatchEvent(new CustomEvent("lset:open-indicators"));
  }, []), Dn = o.useCallback((m) => ({
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
  })[m] ?? null, []), jt = o.useCallback((m) => {
    ze(m);
    const ie = Dn(m);
    gt(ie);
  }, [Dn]), Cl = o.useCallback((m) => {
    wl((ie) => {
      const ae = new Set(ie);
      if (ae.has(m)) ae.delete(m);
      else {
        if (ae.size >= 6) {
          const ve = ae.values().next().value;
          ve && ae.delete(ve);
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
  })[ms] || "candlestick", [ms]), [Ze, Qe] = o.useState(null), [it, Xn] = o.useState(!1), [Il, Kt] = o.useState(!1), [Yn, ns] = o.useState(""), [ss, Bs] = o.useState(null), [Bt, St] = o.useState(""), [, Js] = o.useState(0), [an, cn] = o.useState(null), [zn, Ws] = o.useState(""), [lt, Tl] = o.useState(""), [vs, Bn] = o.useState(""), [Wn, jl] = o.useState(!1), ls = o.useRef(null), Fs = async () => {
    const m = Yn.trim();
    if (!m) {
      St("name the template first");
      return;
    }
    await window.__lseShell?.saveLayout?.(m) ? (Kt(!1), St(""), Js((ae) => ae + 1)) : St("could not save this template");
  };
  o.useEffect(() => {
    if (!Ze) return;
    const m = () => {
      Qe(null), Xn(!1), Kt(!1), Bs(null), St(""), cn(null), Bn("");
    }, ie = (ae) => {
      ae.key === "Escape" && m();
    };
    return document.addEventListener("click", m), document.addEventListener("keydown", ie), () => {
      document.removeEventListener("click", m), document.removeEventListener("keydown", ie);
    };
  }, [Ze]);
  const Ht = Qo(), Tn = Ht.layout, Ml = Ht.sync, [Fn, ct] = o.useState(!1), [Ut, On] = o.useState("appearance"), ys = o.useRef(Fn);
  ys.current = Fn;
  const jn = o.useRef(Ut);
  jn.current = Ut, o.useEffect(() => (zo = (m) => {
    if (!ys.current) {
      On(m || "appearance"), ct(!0);
      return;
    }
    if (m && m !== jn.current) {
      On(m);
      return;
    }
    ct(!1);
  }, () => {
    zo = null;
  }), []), o.useEffect(() => {
    if (!Fn) return;
    const m = (ie) => {
      ie.key === "Escape" && ct(!1);
    };
    return document.addEventListener("keydown", m), () => document.removeEventListener("keydown", m);
  }, [Fn]);
  const Mn = o.useRef(null), [_n, pn] = o.useState(null);
  o.useEffect(() => {
    Fn || pn(null);
  }, [Fn]);
  const Rl = o.useCallback((m) => {
    if (m.target.closest("button")) return;
    const ie = Mn.current, ae = ie?.offsetParent;
    if (!ae || !ie) return;
    const ve = ae.getBoundingClientRect(), ft = ie.getBoundingClientRect(), Re = m.clientX - ft.left, Lt = m.clientY - ft.top;
    m.preventDefault();
    const mt = (ot) => {
      pn({
        x: Math.max(0, Math.min(ot.clientX - ve.left - Re, ve.width - ft.width)),
        y: Math.max(0, Math.min(ot.clientY - ve.top - Lt, ve.height - 36))
      });
    }, _e = () => {
      window.removeEventListener("pointermove", mt), window.removeEventListener("pointerup", _e);
    };
    window.addEventListener("pointermove", mt), window.addEventListener("pointerup", _e);
  }, []), [ao, io] = o.useState({
    color: "#e6e8ea",
    strokeWidth: 2,
    lineStyle: "solid",
    opacity: 100
  });
  o.useEffect(() => {
    let m = !0;
    return (async () => {
      const ie = await hl.getTools();
      m && ie?.drawingDefaults && io((ae) => ({ ...ae, ...ie.drawingDefaults }));
    })(), () => {
      m = !1;
    };
  }, []);
  const co = o.useRef(null), Pl = o.useRef(0), $t = o.useRef(() => {
  }), Mt = o.useRef([]);
  o.useEffect(() => {
    qo({ provider: s, symbol: n });
  }, [s, n]);
  const qt = `${s}:${n}`, os = o.useRef(null);
  o.useEffect(() => {
    let m = !0;
    return os.current = null, (async () => {
      const [ie, ae] = await Promise.all([
        hl.getDrawings(qt),
        hl.getIndicators(qt)
      ]);
      m && (Nt(ie), zt(ae ?? Ls), In(null), os.current = qt);
    })(), () => {
      m = !1;
    };
  }, [qt]);
  const st = o.useCallback((m) => {
    Nt(m), os.current === qt && hl.setDrawings(qt, m);
  }, [qt]), vn = o.useCallback((m) => {
    zt(m), os.current === qt && hl.setIndicators(qt, m);
  }, [qt]);
  o.useEffect(() => {
    je && zt((m) => ({ ...m, ...je }));
  }, [je]);
  const ks = o.useCallback(() => {
    st([]), In(null);
  }, [st]), ws = o.useCallback((m) => {
    st(Tt.filter((ie) => ie.id !== m)), In(null);
  }, [Tt, st]), Nl = o.useMemo(() => {
    const m = Ed(le, Ce);
    return m.length ? { ...on, customIndicators: m } : on;
  }, [on, le, Ce]), Kn = lo(), Un = Xu(), un = o.useMemo(() => {
    const m = oo(), ie = Kn?.candles, ae = Kn?.chart;
    let ve;
    return !Un || !ie || !ae ? ve = { ...m } : ve = {
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
      bullish: ie.bodyBullish,
      bearish: ie.bodyBearish,
      bullishBorder: ie.bordersBullish,
      bearishBorder: ie.bordersBearish,
      bullishWick: ie.wickBullish,
      bearishWick: ie.wickBearish
    }, at.marketColors === "teal_rose" ? (ve.bullish = "#21b3a4", ve.bearish = "#f0426c", ve.bullishBorder = "#21b3a4", ve.bearishBorder = "#f0426c", ve.bullishWick = "#21b3a4", ve.bearishWick = "#f0426c", ve.priceTickerBullish = "#21b3a4", ve.priceTickerBearish = "#f0426c") : at.marketColors === "green_red" && (ve.bullish = "#26a69a", ve.bearish = "#ef5350", ve.bullishBorder = "#26a69a", ve.bearishBorder = "#ef5350", ve.bullishWick = "#26a69a", ve.bearishWick = "#ef5350", ve.priceTickerBullish = "#26a69a", ve.priceTickerBearish = "#ef5350"), at.accent === "mint" ? ve.grid = "#21b3a4" : at.accent === "indigo" ? ve.grid = "#6366f1" : at.accent === "amber" && (ve.grid = "#f59e0b"), at.opacity !== void 0 && (ve.backgroundOpacity = Math.round(at.opacity * 100)), ve;
  }, [Kn, Un, at]), Hn = Kn?.data?.timezone || "local", xn = nh[h] ?? 36e5, Qs = T.length ? T[T.length - 1].close : null, [uo, el] = o.useState("");
  o.useEffect(() => {
    const m = () => {
      if (h === "tick") {
        el("");
        return;
      }
      if (!n || !Zr(n)) {
        el("");
        return;
      }
      const ae = Date.now(), ve = Math.ceil(ae / xn) * xn, ft = Math.max(0, ve - ae), Re = Math.floor(ft / 1e3), Lt = Math.floor(Re / 60) % 60, mt = Math.floor(Re / 3600), _e = (ot) => String(ot).padStart(2, "0");
      el(mt > 0 ? `${mt}:${_e(Lt)}:${_e(Re % 60)}` : `${Lt}:${_e(Re % 60)}`);
    };
    m();
    const ie = setInterval(m, 1e3);
    return () => clearInterval(ie);
  }, [n, xn, h]);
  const Gt = o.useMemo(
    () => Object.values(on || {}).filter((m) => m && m.enabled).length,
    [on]
  ), ho = o.useMemo(
    () => [
      ...ne.map((m, ie) => ({
        id: `trade-${ie}`,
        price: m.price,
        side: m.side,
        quantity: m.quantity ?? 0,
        symbol: n,
        pnl: m.pnl
      })),
      ...ke.map((m) => ({ ...m, symbol: n }))
    ],
    [ne, ke, n]
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
      }, className: `px-1.5 py-0.5 text-[9px] rounded border ${s === m ? "bg-[#21b3a4] text-black border-[#21b3a4] font-bold" : "bg-[#262626] border-[#3a3a3a] text-[#b9b9b9] hover:bg-[#343434]"}`, title: `${m} ${m === "hyperliquid" ? "15ms ⚡ ultra-fast" : m === "binance" ? "20ms fast" : "50ms"}`, children: m === "hyperliquid" ? "HL ⚡" : m === "binance" ? "BINANCE" : "COINBASE" }, m)) }),
      /* @__PURE__ */ t.jsxs("span", { className: "text-[9px] px-1.5 py-0.5 rounded bg-[#262626] border border-[#3a3a3a] text-[#b9b9b9]", children: [
        s.toUpperCase(),
        " ",
        s === "hyperliquid" ? "⚡15ms" : s === "binance" ? "20ms" : s === "coinbase" ? "50ms" : "",
        " • ",
        h,
        " • LIVE"
      ] }),
      /* @__PURE__ */ t.jsx("div", { className: "ml-2", style: { overflow: "visible", position: "relative", zIndex: 50 }, children: /* @__PURE__ */ t.jsx(hd, { value: bs, onChange: (m) => {
        if (m.pro) {
          Ds("SECONDS PRO"), As(!0);
          return;
        }
        gs(m);
        try {
          const ie = window.__lseShell;
          ie?.setTimeframe && ie.setTimeframe(m.label);
        } catch {
        }
      }, favs: Ks, onToggleFav: Cl }) }),
      /* @__PURE__ */ t.jsx("div", { className: "ml-1", children: /* @__PURE__ */ t.jsx(dd, { value: ms, onChange: ts }) }),
      /* @__PURE__ */ t.jsxs("select", { value: Ht.panelKinds[0] || "chart", onChange: (m) => Cn.setPanelKind(0, m.target.value), className: "ml-1 bg-[#262626] border border-[#3a3a3a] rounded px-1 py-0.5 text-[10px] text-[#e8e8e8]", children: [
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
        /* @__PURE__ */ t.jsx(bd, { onSelect: (m) => Cn.setPanelKind(0, m) }),
        /* @__PURE__ */ t.jsxs("button", { onClick: () => xe((m) => !m), className: "px-2 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8] hover:bg-[#343434]", children: [
          "Layers ",
          gn ? "▲" : "▼"
        ] }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => qs(!0), className: "px-2 py-0.5 bg-[#262626] border border-[#3a3a3a] rounded text-[10px] text-[#e8e8e8] hover:bg-[#343434]", children: "Find Symbol" })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "ml-auto flex items-center gap-1", children: [
        /* @__PURE__ */ t.jsx("span", { className: "text-[10px] text-[#b9b9b9]", children: "RT" }),
        /* @__PURE__ */ t.jsx("div", { className: "w-2 h-2 rounded-full bg-[#21b3a4] animate-pulse", title: "follow-live streaming" }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => {
          Ds("RT MODE"), As(!0);
        }, className: "px-1.5 py-0.5 rounded border border-[#3a3a3a] text-[9px] bg-[#21b3a4]/20 text-[#21b3a4] hover:bg-[#21b3a4]/30", children: "RT MODE ●" }),
        /* @__PURE__ */ t.jsx("button", { onClick: () => Es((m) => !m), className: "px-2 py-0.5 rounded border border-[#3a3a3a] text-[10px] hover:bg-[#343434] text-[#e8e8e8]", children: "⚙ Appearance" }),
        /* @__PURE__ */ t.jsx("button", { onClick: Me, className: "px-2 py-0.5 rounded border border-[#3a3a3a] text-[10px] hover:bg-[#343434] text-[#e8e8e8]", children: "Indicators" })
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "relative flex-1 min-h-0 w-full flex", children: [
      /* @__PURE__ */ t.jsx(
        ud,
        {
          activeTool: wt,
          onToolSelect: jt,
          magnet: tt,
          onToggleMagnet: () => xt((m) => !m),
          hiddenAll: xs,
          onToggleHidden: () => zs((m) => !m),
          onClearAll: ks,
          collapsed: Yt,
          onToggleCollapsed: () => en((m) => !m)
        }
      ),
      /* @__PURE__ */ t.jsx("div", { className: "hidden", children: /* @__PURE__ */ t.jsx(
        Yu,
        {
          activeTool: pe,
          onToolSelect: gt,
          drawings: Tt,
          onClearAllDrawings: ks,
          selectedDrawingId: tn,
          onDeleteSelectedDrawing: ws,
          drawingsLocked: rn,
          onToggleLock: () => An((m) => !m),
          drawingsHidden: xs,
          onToggleHide: () => zs((m) => !m),
          indicatorCount: Gt,
          onClearIndicators: () => vn(Ls),
          onOpenSettings: Me
        }
      ) }),
      /* @__PURE__ */ t.jsx(
        "div",
        {
          ref: ls,
          className: "relative flex-1 min-w-0",
          style: Wn ? { transform: "scaleY(-1)" } : void 0,
          onContextMenu: (m) => {
            m.preventDefault(), Xn(!1), cn(null), Bn("");
            let ie = null;
            if (Tn === "1x1" && ee && ls.current) {
              const ve = ls.current.getBoundingClientRect(), ft = Wn ? ve.height - (m.clientY - ve.top) : m.clientY - ve.top, Re = ee.yToPrice(ft);
              Number.isFinite(Re) && Re > 0 && (ie = Re);
            }
            const ae = window.__lseShell?.tradeInfo?.() || null;
            Qe({
              x: Math.min(m.clientX, window.innerWidth - 240),
              y: Math.min(m.clientY, window.innerHeight - (ae?.available ? 360 : 230)),
              price: ie,
              ref: Qs,
              trade: ae
            });
          },
          children: Tn !== "1x1" ? /* @__PURE__ */ t.jsx(
            Nd,
            {
              layout: Tn,
              syncSettings: Ml,
              pair: n,
              timeframe: h,
              colors: un,
              quote: r,
              sourceProvider: s
            }
          ) : Ht.panelKinds[0] === "depth" ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(es, {}), children: /* @__PURE__ */ t.jsx(
            Ad,
            {
              symbol: n,
              sourceProvider: s,
              colors: un,
              onToggleKind: () => Cn.setPanelKind(0, "chart")
            }
          ) }) : Ht.panelKinds[0] === "edgedepth" ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(es, {}), children: /* @__PURE__ */ t.jsx(
            Dd,
            {
              symbol: n,
              provider: s,
              onToggleKind: () => Cn.setPanelKind(0, "chart"),
              liqColormap: at.liqColormap,
              obColormap: at.obColormap,
              opacity: at.opacity,
              intensity: at.intensity,
              gamma: at.gamma,
              noiseFloor: at.noiseFloor,
              tickPerRow: at.tickPerRow,
              halfLife: at.halfLife
            }
          ) }) : ["orderflow", "dom", "tape", "footprint", "vpvr", "tpo", "cvd", "liquidations", "ed_liquidations", "ed_vpvr", "ed_footprint", "ed_tpo", "watchlist", "indicators"].includes(Ht.panelKinds[0]) ? /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(es, {}), children: (() => {
            const m = Ht.panelKinds[0];
            return m === "orderflow" ? /* @__PURE__ */ t.jsx(Ur, { symbol: n, provider: s, colors: un }) : m === "dom" ? /* @__PURE__ */ t.jsx(Hd, { symbol: n, provider: s }) : m === "tape" ? /* @__PURE__ */ t.jsx($d, { symbol: n, provider: s }) : m === "footprint" ? /* @__PURE__ */ t.jsx(Bd, { symbol: n, provider: s }) : m === "vpvr" ? /* @__PURE__ */ t.jsx(Wd, { symbol: n, provider: s }) : m === "tpo" ? /* @__PURE__ */ t.jsx(Fd, { symbol: n, provider: s }) : m === "cvd" ? /* @__PURE__ */ t.jsx(Od, { symbol: n, provider: s }) : m === "liquidations" ? /* @__PURE__ */ t.jsx(_d, { symbol: n, provider: s }) : m === "ed_liquidations" ? /* @__PURE__ */ t.jsx(zd, { symbol: n, provider: s, colormap: at.liqColormap, intensity: at.intensity, opacity: at.opacity, gamma: at.gamma, noiseFloor: at.noiseFloor, tickPerRow: at.tickPerRow, halfLife: at.halfLife, lowPeak: at.lowPeak }) : m === "ed_vpvr" ? /* @__PURE__ */ t.jsx(Kd, { symbol: n, provider: s }) : m === "ed_footprint" ? /* @__PURE__ */ t.jsx(Ud, { symbol: n, provider: s }) : m === "ed_tpo" ? /* @__PURE__ */ t.jsx(qd, { symbol: n, provider: s }) : m === "watchlist" ? /* @__PURE__ */ t.jsx(Vd, { activeSymbol: n, onSelectSymbol: (ie) => {
              try {
                window.__lseShell?.selectSymbol?.(ie);
              } catch {
              }
            } }) : m === "indicators" ? /* @__PURE__ */ t.jsx(Xd, { symbol: n, provider: s }) : /* @__PURE__ */ t.jsx(Ur, { symbol: n, provider: s, colors: un });
          })() }) : /* @__PURE__ */ t.jsx(t.Fragment, { children: /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
            /* @__PURE__ */ t.jsx(
              Jo,
              {
                candles: Ce,
                symbol: n,
                timeframe: h,
                chartType: Ye,
                onLoadMore: re,
                isLoadingMore: D,
                prependShift: Be.shift,
                livePrice: Qs,
                countdown: uo,
                timezone: Hn,
                rightOffset: 6,
                colors: un,
                indicators: Nl,
                onIndicatorsChange: vn,
                onRemoveEngineIndicator: (m) => window.__lseShell?.removeIndicator?.(m),
                onEditEngineIndicator: (m) => {
                  window.__lseShell?.editIndicator?.(m) || Me();
                },
                drawings: Tt,
                selectedDrawingId: tn,
                drawingCursorRef: Mt,
                requestRedrawRef: co,
                scrollOffsetRef: Pl,
                onScrollSync: () => $t.current?.(),
                onConverterReady: qe,
                onOpenSettings: Me,
                positionLines: ho,
                onPositionModify: Q,
                onPositionClose: Oe,
                autoSelectPositionId: nt,
                showBidAskSpread: !!r,
                brokerBid: r?.bid ?? null,
                brokerAsk: r?.ask ?? null
              },
              Ae
            ),
            /* @__PURE__ */ t.jsx(
              zu,
              {
                activeTool: pe,
                onToolSelect: gt,
                drawings: Tt,
                onDrawingsChange: st,
                selectedDrawingId: tn,
                onSelectDrawing: In,
                converter: ee,
                scrollSyncRef: $t,
                scrollOffsetRef: Pl,
                drawingCursorRef: Mt,
                requestRedrawRef: co,
                toolSettings: ao,
                isLocked: rn,
                isHidden: xs,
                currentSymbol: n,
                timeframeMs: xn,
                currentPrice: Qs ?? void 0,
                candles: T
              }
            ),
            Ht.panelKinds[0] !== "depth" && /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: (m) => {
                  m.stopPropagation(), Cn.setPanelKind(0, "depth");
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
      Fn && /* @__PURE__ */ t.jsxs(
        "div",
        {
          ref: Mn,
          className: "absolute z-[95] w-80",
          style: {
            ..._n ? { left: _n.x, top: _n.y } : { top: 8, right: 8 },
            background: "var(--panel)",
            border: "1px solid var(--edge)",
            borderRadius: 3,
            boxShadow: "0 10px 32px var(--shadow)"
          },
          children: [
            /* @__PURE__ */ t.jsxs(
              "div",
              {
                onPointerDown: Rl,
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
                  onClick: () => On("appearance"),
                  className: "flex-1 px-3 py-1.5 text-xs font-medium transition-colors",
                  style: Ut === "appearance" ? { color: "var(--text)", background: "var(--active)" } : { color: "var(--dim)" },
                  children: "Appearance"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: () => On("chart"),
                  className: "flex-1 px-3 py-1.5 text-xs font-medium transition-colors",
                  style: Ut === "chart" ? { color: "var(--text)", background: "var(--active)" } : { color: "var(--dim)" },
                  children: "Chart"
                }
              )
            ] }),
            /* @__PURE__ */ t.jsx("div", { className: "max-h-[70vh] overflow-y-auto", children: Ut === "appearance" ? /* @__PURE__ */ t.jsx(Ku, { hideHeader: !0, onBack: () => ct(!1) }) : /* @__PURE__ */ t.jsx(Uu, { hideHeader: !0, onBack: () => ct(!1) }) }),
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
      Ge && /* @__PURE__ */ t.jsx("div", { className: "absolute top-10 right-2 z-[90]", children: /* @__PURE__ */ t.jsx(pd, { settings: at, onChange: Sl, onClose: () => Es(!1) }) }),
      gn && /* @__PURE__ */ t.jsx("div", { className: "absolute top-10 left-[320px] z-[90]", children: /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx("div", { className: "p-2 text-[10px] text-[#b9b9b9]", children: "Loading layers..." }), children: /* @__PURE__ */ t.jsx(Yd, { layers: Zs, onChange: Dt }) }) }),
      /* @__PURE__ */ t.jsx(xd, { open: Us, onClose: () => qs(!1), onSelect: (m) => {
        try {
          window.__lseShell?.selectSymbol?.(m);
        } catch {
        }
      } }),
      /* @__PURE__ */ t.jsx(gd, { open: ro, onClose: () => As(!1), feature: Gs }),
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
              const m = Ze.trade, ie = (_e) => window.__lseShell?.fmtPrice?.(_e) ?? String(_e), ae = (_e) => _e === "limit" ? "Limit" : "Stop";
              if (an) {
                const _e = {
                  flex: 1,
                  minWidth: 0,
                  padding: "3px 6px",
                  fontSize: 12,
                  color: "var(--text)",
                  background: "var(--bg2)",
                  border: "1px solid var(--edge)",
                  borderRadius: 2
                }, ot = {
                  width: 38,
                  fontSize: 11,
                  color: "var(--dim)",
                  flexShrink: 0
                }, Os = () => {
                  const Ct = parseFloat(zn), Cs = parseFloat(lt);
                  if (!(Ct > 0)) {
                    Bn("enter a price");
                    return;
                  }
                  if (!(Cs > 0)) {
                    Bn("enter a size");
                    return;
                  }
                  window.__lseShell?.quickOrder?.(an.side, an.otype, Ct, Cs), Qe(null), cn(null);
                }, Ss = (Ct) => {
                  Ct.stopPropagation(), Ct.key === "Enter" && Os(), Ct.key === "Escape" && (cn(null), Bn(""));
                };
                return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                  /* @__PURE__ */ t.jsxs("div", { style: { ...Sn, cursor: "default", fontWeight: 600 }, children: [
                    an.side === "buy" ? "Buy" : "Sell",
                    " ",
                    ae(an.otype),
                    " · ",
                    m.symbol
                  ] }),
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      style: { display: "flex", gap: 6, alignItems: "center", margin: "2px 10px 4px" },
                      onClick: (Ct) => Ct.stopPropagation(),
                      children: [
                        /* @__PURE__ */ t.jsx("span", { style: ot, children: "Price" }),
                        /* @__PURE__ */ t.jsx(
                          "input",
                          {
                            autoFocus: !0,
                            value: zn,
                            spellCheck: !1,
                            inputMode: "decimal",
                            style: _e,
                            onChange: (Ct) => Ws(Ct.target.value),
                            onKeyDown: Ss
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      style: { display: "flex", gap: 6, alignItems: "center", margin: "0 10px 4px" },
                      onClick: (Ct) => Ct.stopPropagation(),
                      children: [
                        /* @__PURE__ */ t.jsx("span", { style: ot, children: "Units" }),
                        /* @__PURE__ */ t.jsx(
                          "input",
                          {
                            value: lt,
                            spellCheck: !1,
                            inputMode: "decimal",
                            style: _e,
                            onChange: (Ct) => Tl(Ct.target.value),
                            onKeyDown: Ss
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ t.jsxs(
                    "div",
                    {
                      style: { display: "flex", gap: 4, margin: "0 10px 2px", justifyContent: "flex-end" },
                      onClick: (Ct) => Ct.stopPropagation(),
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
                              cn(null), Bn("");
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
                            onClick: Os,
                            children: "Place"
                          }
                        )
                      ]
                    }
                  ),
                  vs && /* @__PURE__ */ t.jsx("div", { style: { ...Sn, color: "#e05d5d", cursor: "default" }, children: vs }),
                  /* @__PURE__ */ t.jsx("div", { style: { margin: "3px 0", borderTop: "1px solid var(--edge)" } })
                ] });
              }
              const ve = m.qty != null ? `${m.qty} ` : "", ft = [
                { label: `Buy ${ve}${m.symbol} at market`, side: "buy", otype: "market" },
                { label: `Sell ${ve}${m.symbol} at market`, side: "sell", otype: "market" }
              ], Re = Ze.price, Lt = Ze.ref, mt = m.pendingTypes || [];
              if (Re != null && Lt != null && Re !== Lt && mt.length) {
                const _e = Re < Lt ? [{ side: "buy", otype: "limit" }, { side: "sell", otype: "stop" }] : [{ side: "sell", otype: "limit" }, { side: "buy", otype: "stop" }];
                for (const ot of _e)
                  mt.includes(ot.otype) && ft.push({ ...ot, label: `${ot.side === "buy" ? "Buy" : "Sell"} ${ae(ot.otype)} @ ${ie(Re)}…` });
              }
              return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                ft.map((_e) => /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    className: "w-full text-left",
                    style: Sn,
                    onMouseEnter: hs,
                    onMouseLeave: fs,
                    onClick: (ot) => {
                      if (_e.otype === "market") {
                        window.__lseShell?.quickOrder?.(_e.side, _e.otype, Ze.price), Qe(null);
                        return;
                      }
                      ot.stopPropagation(), cn({ side: _e.side, otype: _e.otype }), Ws(Re != null ? String(+Re.toFixed(Re >= 1e3 ? 2 : Re >= 100 ? 3 : Re >= 1 ? 4 : 6)) : ""), Tl(m.qty != null ? String(m.qty) : ""), Bn("");
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
                style: { ...Sn, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 },
                onMouseEnter: hs,
                onMouseLeave: fs,
                onClick: () => Xn((m) => !m),
                children: [
                  /* @__PURE__ */ t.jsx("span", { children: "Chart template" }),
                  /* @__PURE__ */ t.jsx("span", { style: { color: "var(--dim)" }, children: it ? "▾" : "▸" })
                ]
              }
            ),
            it && /* @__PURE__ */ t.jsxs("div", { className: "max-h-48 overflow-y-auto", style: { borderTop: "1px solid var(--edge)", borderBottom: "1px solid var(--edge)", margin: "3px 0" }, children: [
              (window.__lseShell?.layouts?.() || []).length === 0 ? /* @__PURE__ */ t.jsx("div", { style: { ...Sn, color: "var(--dim)" }, children: "No saved templates yet" }) : window.__lseShell.layouts().map((m) => /* @__PURE__ */ t.jsxs(
                "div",
                {
                  style: { ...Sn, display: "flex", alignItems: "center", gap: 8, paddingLeft: 20, cursor: "pointer" },
                  onMouseEnter: hs,
                  onMouseLeave: fs,
                  onClick: () => {
                    window.__lseShell?.applyLayout?.(m.id), Qe(null);
                  },
                  children: [
                    /* @__PURE__ */ t.jsx("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: m.name }),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        title: ss === m.id ? "Click again to delete" : "Delete template",
                        style: {
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          fontSize: ss === m.id ? 11 : 13,
                          lineHeight: 1,
                          padding: "0 2px",
                          color: ss === m.id ? "#e05d5d" : "var(--dim)"
                        },
                        onClick: async (ie) => {
                          if (ie.stopPropagation(), ss !== m.id) {
                            Bs(m.id);
                            return;
                          }
                          await window.__lseShell?.deleteLayout?.(m.id), Bs(null), Js((ae) => ae + 1);
                        },
                        children: ss === m.id ? "sure?" : "×"
                      }
                    )
                  ]
                },
                m.id
              )),
              Il ? /* @__PURE__ */ t.jsxs(
                "div",
                {
                  style: { display: "flex", gap: 4, margin: "3px 12px 5px", alignItems: "center" },
                  onClick: (m) => m.stopPropagation(),
                  children: [
                    /* @__PURE__ */ t.jsx(
                      "input",
                      {
                        autoFocus: !0,
                        value: Yn,
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
                        onChange: (m) => ns(m.target.value),
                        onKeyDown: async (m) => {
                          if (m.stopPropagation(), m.key === "Escape") {
                            Kt(!1);
                            return;
                          }
                          m.key === "Enter" && await Fs();
                        }
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        disabled: !Yn.trim(),
                        title: Yn.trim() ? "Save this chart as a template" : "Name the template first",
                        style: {
                          padding: "3px 10px",
                          fontSize: 12,
                          lineHeight: 1.5,
                          borderRadius: 2,
                          border: "1px solid var(--edge)",
                          background: "var(--active)",
                          color: "var(--text)",
                          cursor: Yn.trim() ? "pointer" : "default",
                          opacity: Yn.trim() ? 1 : 0.5
                        },
                        onClick: Fs,
                        children: "Save"
                      }
                    )
                  ]
                }
              ) : /* @__PURE__ */ t.jsx(
                "button",
                {
                  className: "w-full text-left",
                  style: { ...Sn, paddingLeft: 20, color: "var(--dim)" },
                  onMouseEnter: hs,
                  onMouseLeave: fs,
                  onClick: (m) => {
                    m.stopPropagation(), ns(window.__lseShell?.layoutDefaultName?.() || ""), St(""), Kt(!0);
                  },
                  children: "+ Save current as template…"
                }
              ),
              Bt && /* @__PURE__ */ t.jsx("div", { style: { ...Sn, paddingLeft: 20, color: "#e05d5d" }, children: Bt })
            ] }),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "w-full text-left",
                style: Sn,
                onMouseEnter: hs,
                onMouseLeave: fs,
                onClick: () => {
                  ls.current?.querySelector('button[title="Reset view"]')?.click(), Qe(null);
                },
                children: "Reset chart view"
              }
            ),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                className: "w-full text-left",
                style: Sn,
                onMouseEnter: hs,
                onMouseLeave: fs,
                onClick: () => {
                  jl((m) => !m), Qe(null);
                },
                children: Wn ? "Unflip chart" : "Flip chart"
              }
            ),
            Tt.length > 0 && /* @__PURE__ */ t.jsxs(
              "button",
              {
                className: "w-full text-left",
                style: Sn,
                onMouseEnter: hs,
                onMouseLeave: fs,
                onClick: () => {
                  ks(), Qe(null);
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
                style: Sn,
                onMouseEnter: hs,
                onMouseLeave: fs,
                onClick: () => {
                  On("appearance"), ct(!0), Qe(null);
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
  const I = lo(), ne = o.useMemo(() => oo(), []);
  return !s || !h.length ? /* @__PURE__ */ t.jsx("div", { className: "h-full w-full" }) : /* @__PURE__ */ t.jsx(
    Jo,
    {
      candles: h,
      symbol: s,
      timeframe: n,
      chartType: "candlestick",
      livePrice: h[h.length - 1]?.close ?? null,
      rightOffset: 6,
      colors: ne,
      indicators: Ls,
      timezone: I?.data?.timezone || "local",
      showBidAskSpread: !!T,
      brokerBid: T?.bid ?? null,
      brokerAsk: T?.ask ?? null
    }
  );
}
const Ns = /* @__PURE__ */ new Map();
function qr(s) {
  const n = Ns.get(s);
  n && n.root.render(
    /* @__PURE__ */ t.jsx(Zo, { children: /* @__PURE__ */ t.jsx(Go, { children: /* @__PURE__ */ t.jsx(lh, { ...n.props }) }) })
  );
}
const oh = {
  mount(s, n = {}) {
    Ns.has(s) || Ns.set(s, { root: ps(s), props: {} });
    const h = Ns.get(s);
    h.props = { ...h.props, ...so(n) }, qr(s);
  },
  update(s, n) {
    const h = Ns.get(s);
    h && (h.props = { ...h.props, ...so(n) }, qr(s));
  },
  unmount(s) {
    const n = Ns.get(s);
    n && (n.root.unmount(), Ns.delete(s));
  }
};
function rh() {
  const s = Qo();
  return /* @__PURE__ */ t.jsx(
    qu,
    {
      selectedLayout: s.layout,
      onLayoutChange: (n) => Cn.setLayout(n),
      syncSettings: s.sync,
      onSyncSettingsChange: (n) => Cn.setSync(n),
      isMultiPanelActive: s.layout !== "1x1",
      onExitMultiPanel: () => Cn.setLayout("1x1")
    }
  );
}
let Ys = null, zo = null, Ko = null, kl = {
  provider: "demo",
  symbol: "",
  timeframe: "1h",
  candles: [],
  chartType: "candlestick",
  trades: [],
  engineIndicators: void 0
};
function Xo() {
  Ys && Ys.render(
    /* @__PURE__ */ t.jsx(Zo, { children: /* @__PURE__ */ t.jsx(Go, { children: /* @__PURE__ */ t.jsx(sh, { ...kl, indicatorPatch: Ko }) }) })
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
}, Gr = 1e12;
function so(s) {
  const n = { ...s };
  return s.chartType && (n.chartType = ah[s.chartType] ?? "candlestick"), "symbol" in s && !s.symbol && (n.symbol = ""), s.candles?.length && s.candles[0].time < Gr && (n.candles = s.candles.map((h) => ({ ...h, time: h.time * 1e3 }))), s.trades?.length && s.trades[0].time < Gr && (n.trades = s.trades.map((h) => ({ ...h, time: h.time * 1e3 }))), n;
}
const er = {
  async mount(s, n = {}) {
    kl = { ...kl, ...so(n) }, Ys || (Ys = ps(s)), await Qr(), Xo();
  },
  update(s) {
    kl = { ...kl, ...so(s) }, Xo();
  },
  unmount() {
    Ys?.unmount(), Ys = null;
  },
  openAppearance(s) {
    zo?.(s);
  },
  invalidateWorkspaceSection(s) {
    Vu(s);
  },
  setIndicators(s) {
    Ko = { ...Ko || {}, ...s }, Xo();
  },
  indicatorKeys() {
    return Object.keys(Ls);
  },
  indicatorDefaults() {
    return JSON.parse(JSON.stringify(Ls));
  }
}, ih = new Gu(), Uo = { inReplay: !1 };
function ch({ onExit: s }) {
  const [n, h] = o.useState(!0), T = Jr();
  o.useEffect(() => {
    h(!0);
  }, [T.key]);
  const I = (ne) => {
    h(ne), ne || setTimeout(() => {
      Uo.inReplay || s();
    }, 150);
  };
  return /* @__PURE__ */ t.jsx("div", { className: "h-full w-full bg-[#0b0d12]", children: /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(es, {}), children: /* @__PURE__ */ t.jsx(Zd, { open: n, onOpenChange: I }) }) });
}
function uh({ provider: s }) {
  const [n] = Qu(), h = Jr(), T = n.get("sym"), I = h.pathname.split("/").pop() || "", ne = n.get("provider") || s;
  return qo({ provider: ne, symbol: T || I }), o.useEffect(() => (Uo.inReplay = !0, () => {
    Uo.inReplay = !1;
  }), []), /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(es, {}), children: /* @__PURE__ */ t.jsx(Gd, {}) });
}
let ml = null;
const dh = {
  async mount(s, n = {}) {
    const h = n.provider || "demo", T = n.onExit || (() => {
    });
    ml || (ml = ps(s)), qo({ provider: h, symbol: "" }), await Qr(), ml.render(
      /* @__PURE__ */ t.jsx(Zu, { client: ih, children: /* @__PURE__ */ t.jsx(Zo, { initialEntries: ["/"], children: /* @__PURE__ */ t.jsxs(Go, { children: [
        /* @__PURE__ */ t.jsxs(Ju, { children: [
          /* @__PURE__ */ t.jsx(Fr, { path: "/backtest/:pair", element: /* @__PURE__ */ t.jsx(uh, { provider: h }) }),
          /* @__PURE__ */ t.jsx(Fr, { path: "*", element: /* @__PURE__ */ t.jsx(ch, { onExit: T }) })
        ] }),
        /* @__PURE__ */ t.jsx(td, { theme: "dark", position: "bottom-right" })
      ] }) }) })
    );
  },
  unmount() {
    ml?.unmount(), ml = null;
  }
};
let bl = null;
const hh = {
  mount(s, n = {}) {
    bl || (bl = ps(s)), bl.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(es, {}), children: /* @__PURE__ */ t.jsx(Jd, { onBack: n.onBack, initialView: n.view }) })
    );
  },
  unmount() {
    bl?.unmount(), bl = null;
  }
};
let gl = null;
const fh = {
  mount(s) {
    gl || (gl = ps(s)), gl.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(es, {}), children: /* @__PURE__ */ t.jsx(Qd, {}) })
    );
  },
  unmount() {
    gl?.unmount(), gl = null;
  }
};
let vl = null;
const ph = {
  mount(s) {
    vl || (vl = ps(s)), vl.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(es, {}), children: /* @__PURE__ */ t.jsx(eh, {}) })
    );
  },
  unmount() {
    vl?.unmount(), vl = null;
  }
};
let yl = null;
const xh = {
  mount(s) {
    yl || (yl = ps(s)), yl.render(
      /* @__PURE__ */ t.jsx(o.Suspense, { fallback: /* @__PURE__ */ t.jsx(es, {}), children: /* @__PURE__ */ t.jsx(th, {}) })
    );
  },
  unmount() {
    yl?.unmount(), yl = null;
  }
};
er.mountLayoutButton = (s) => {
  ps(s).render(/* @__PURE__ */ t.jsx(rh, {}));
};
er.layoutStore = Cn;
window.LSEChart = er;
window.LSEChartPanes = oh;
window.LSEManualBacktest = dh;
window.LSEEconCalendar = hh;
window.LSEDataViz = fh;
window.LSEQuantModels = ph;
window.LSENotebooks = xh;
export {
  er as default
};
