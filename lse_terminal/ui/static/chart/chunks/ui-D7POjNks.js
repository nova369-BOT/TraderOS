import { r as a, R as ht, j as p, a as mt, u as js, o as Ls, s as Fs, f as $s, b as Hs, c as zs, h as Vs, d as Bs, l as Us, e as vt } from "./react-vendor-C0yw3i6b.js";
function No(e, o) {
  if (typeof e == "function")
    return e(o);
  e != null && (e.current = o);
}
function Gs(...e) {
  return (o) => {
    let t = !1;
    const r = e.map((n) => {
      const s = No(n, o);
      return !t && typeof s == "function" && (t = !0), s;
    });
    if (t)
      return () => {
        for (let n = 0; n < r.length; n++) {
          const s = r[n];
          typeof s == "function" ? s() : No(e[n], null);
        }
      };
  };
}
function I(...e) {
  return a.useCallback(Gs(...e), e);
}
// @__NO_SIDE_EFFECTS__
function Ce(e) {
  const o = a.forwardRef((t, r) => {
    let { children: n, ...s } = t, c = null, i = !1;
    const l = [];
    Oo(n) && typeof nt == "function" && (n = nt(n._payload)), a.Children.forEach(n, (h) => {
      if (Xs(h)) {
        i = !0;
        const v = h;
        let g = "child" in v.props ? v.props.child : v.props.children;
        Oo(g) && typeof nt == "function" && (g = nt(g._payload)), c = Ks(v, g), l.push(c?.props?.children);
      } else
        l.push(h);
    }), c ? c = a.cloneElement(c, void 0, l) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !i && a.Children.count(n) === 1 && a.isValidElement(n) && (c = n)
    );
    const f = c ? Ys(c) : void 0, d = I(r, f);
    if (!c) {
      if (n || n === 0)
        throw new Error(
          i ? ea(e) : Qs(e)
        );
      return n;
    }
    const u = qs(s, c.props ?? {});
    return c.type !== a.Fragment && (u.ref = r ? d : f), a.cloneElement(c, u);
  });
  return o.displayName = `${e}.Slot`, o;
}
var Wu = /* @__PURE__ */ Ce("Slot"), Xo = Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Ws(e) {
  const o = (t) => "child" in t ? t.children(t.child) : t.children;
  return o.displayName = `${e}.Slottable`, o.__radixId = Xo, o;
}
var Ks = (e, o) => {
  if ("child" in e.props) {
    const t = e.props.child;
    return a.isValidElement(t) ? a.cloneElement(t, void 0, e.props.children(t.props.children)) : null;
  }
  return a.isValidElement(o) ? o : null;
};
function qs(e, o) {
  const t = { ...o };
  for (const r in o) {
    const n = e[r], s = o[r];
    /^on[A-Z]/.test(r) ? n && s ? t[r] = (...i) => {
      const l = s(...i);
      return n(...i), l;
    } : n && (t[r] = n) : r === "style" ? t[r] = { ...n, ...s } : r === "className" && (t[r] = [n, s].filter(Boolean).join(" "));
  }
  return { ...e, ...t };
}
function Ys(e) {
  let o = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, t = o && "isReactWarning" in o && o.isReactWarning;
  return t ? e.ref : (o = Object.getOwnPropertyDescriptor(e, "ref")?.get, t = o && "isReactWarning" in o && o.isReactWarning, t ? e.props.ref : e.props.ref || e.ref);
}
function Xs(e) {
  return a.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Xo;
}
var Zs = Symbol.for("react.lazy");
function Oo(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === Zs && "_payload" in e && Js(e._payload);
}
function Js(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
var Qs = (e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, ea = (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, nt = ht[" use ".trim().toString()];
function Zo(e) {
  var o, t, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var n = e.length;
    for (o = 0; o < n; o++) e[o] && (t = Zo(e[o])) && (r && (r += " "), r += t);
  } else for (t in e) e[t] && (r && (r += " "), r += t);
  return r;
}
function ta() {
  for (var e, o, t = 0, r = "", n = arguments.length; t < n; t++) (e = arguments[t]) && (o = Zo(e)) && (r && (r += " "), r += o);
  return r;
}
const Do = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, jo = ta, Ku = (e, o) => (t) => {
  var r;
  if (o?.variants == null) return jo(e, t?.class, t?.className);
  const { variants: n, defaultVariants: s } = o, c = Object.keys(n).map((f) => {
    const d = t?.[f], u = s?.[f];
    if (d === null) return null;
    const h = Do(d) || Do(u);
    return n[f][h];
  }), i = t && Object.entries(t).reduce((f, d) => {
    let [u, h] = d;
    return h === void 0 || (f[u] = h), f;
  }, {}), l = o == null || (r = o.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((f, d) => {
    let { class: u, className: h, ...v } = d;
    return Object.entries(v).every((g) => {
      let [m, b] = g;
      return Array.isArray(b) ? b.includes({
        ...s,
        ...i
      }[m]) : {
        ...s,
        ...i
      }[m] === b;
    }) ? [
      ...f,
      u,
      h
    ] : f;
  }, []);
  return jo(e, c, l, t?.class, t?.className);
}, so = "-", oa = (e) => {
  const o = na(e), {
    conflictingClassGroups: t,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (c) => {
      const i = c.split(so);
      return i[0] === "" && i.length !== 1 && i.shift(), Jo(i, o) || ra(c);
    },
    getConflictingClassGroupIds: (c, i) => {
      const l = t[c] || [];
      return i && r[c] ? [...l, ...r[c]] : l;
    }
  };
}, Jo = (e, o) => {
  if (e.length === 0)
    return o.classGroupId;
  const t = e[0], r = o.nextPart.get(t), n = r ? Jo(e.slice(1), r) : void 0;
  if (n)
    return n;
  if (o.validators.length === 0)
    return;
  const s = e.join(so);
  return o.validators.find(({
    validator: c
  }) => c(s))?.classGroupId;
}, Lo = /^\[(.+)\]$/, ra = (e) => {
  if (Lo.test(e)) {
    const o = Lo.exec(e)[1], t = o?.substring(0, o.indexOf(":"));
    if (t)
      return "arbitrary.." + t;
  }
}, na = (e) => {
  const {
    theme: o,
    prefix: t
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return aa(Object.entries(e.classGroups), t).forEach(([s, c]) => {
    qt(c, r, s, o);
  }), r;
}, qt = (e, o, t, r) => {
  e.forEach((n) => {
    if (typeof n == "string") {
      const s = n === "" ? o : Fo(o, n);
      s.classGroupId = t;
      return;
    }
    if (typeof n == "function") {
      if (sa(n)) {
        qt(n(r), o, t, r);
        return;
      }
      o.validators.push({
        validator: n,
        classGroupId: t
      });
      return;
    }
    Object.entries(n).forEach(([s, c]) => {
      qt(c, Fo(o, s), t, r);
    });
  });
}, Fo = (e, o) => {
  let t = e;
  return o.split(so).forEach((r) => {
    t.nextPart.has(r) || t.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), t = t.nextPart.get(r);
  }), t;
}, sa = (e) => e.isThemeGetter, aa = (e, o) => o ? e.map(([t, r]) => {
  const n = r.map((s) => typeof s == "string" ? o + s : typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([c, i]) => [o + c, i])) : s);
  return [t, n];
}) : e, ca = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let o = 0, t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const n = (s, c) => {
    t.set(s, c), o++, o > e && (o = 0, r = t, t = /* @__PURE__ */ new Map());
  };
  return {
    get(s) {
      let c = t.get(s);
      if (c !== void 0)
        return c;
      if ((c = r.get(s)) !== void 0)
        return n(s, c), c;
    },
    set(s, c) {
      t.has(s) ? t.set(s, c) : n(s, c);
    }
  };
}, Qo = "!", ia = (e) => {
  const {
    separator: o,
    experimentalParseClassName: t
  } = e, r = o.length === 1, n = o[0], s = o.length, c = (i) => {
    const l = [];
    let f = 0, d = 0, u;
    for (let b = 0; b < i.length; b++) {
      let y = i[b];
      if (f === 0) {
        if (y === n && (r || i.slice(b, b + s) === o)) {
          l.push(i.slice(d, b)), d = b + s;
          continue;
        }
        if (y === "/") {
          u = b;
          continue;
        }
      }
      y === "[" ? f++ : y === "]" && f--;
    }
    const h = l.length === 0 ? i : i.substring(d), v = h.startsWith(Qo), g = v ? h.substring(1) : h, m = u && u > d ? u - d : void 0;
    return {
      modifiers: l,
      hasImportantModifier: v,
      baseClassName: g,
      maybePostfixModifierPosition: m
    };
  };
  return t ? (i) => t({
    className: i,
    parseClassName: c
  }) : c;
}, la = (e) => {
  if (e.length <= 1)
    return e;
  const o = [];
  let t = [];
  return e.forEach((r) => {
    r[0] === "[" ? (o.push(...t.sort(), r), t = []) : t.push(r);
  }), o.push(...t.sort()), o;
}, ua = (e) => ({
  cache: ca(e.cacheSize),
  parseClassName: ia(e),
  ...oa(e)
}), da = /\s+/, pa = (e, o) => {
  const {
    parseClassName: t,
    getClassGroupId: r,
    getConflictingClassGroupIds: n
  } = o, s = [], c = e.trim().split(da);
  let i = "";
  for (let l = c.length - 1; l >= 0; l -= 1) {
    const f = c[l], {
      modifiers: d,
      hasImportantModifier: u,
      baseClassName: h,
      maybePostfixModifierPosition: v
    } = t(f);
    let g = !!v, m = r(g ? h.substring(0, v) : h);
    if (!m) {
      if (!g) {
        i = f + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (m = r(h), !m) {
        i = f + (i.length > 0 ? " " + i : i);
        continue;
      }
      g = !1;
    }
    const b = la(d).join(":"), y = u ? b + Qo : b, x = y + m;
    if (s.includes(x))
      continue;
    s.push(x);
    const w = n(m, g);
    for (let S = 0; S < w.length; ++S) {
      const P = w[S];
      s.push(y + P);
    }
    i = f + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function fa() {
  let e = 0, o, t, r = "";
  for (; e < arguments.length; )
    (o = arguments[e++]) && (t = er(o)) && (r && (r += " "), r += t);
  return r;
}
const er = (e) => {
  if (typeof e == "string")
    return e;
  let o, t = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (o = er(e[r])) && (t && (t += " "), t += o);
  return t;
};
function ha(e, ...o) {
  let t, r, n, s = c;
  function c(l) {
    const f = o.reduce((d, u) => u(d), e());
    return t = ua(f), r = t.cache.get, n = t.cache.set, s = i, i(l);
  }
  function i(l) {
    const f = r(l);
    if (f)
      return f;
    const d = pa(l, t);
    return n(l, d), d;
  }
  return function() {
    return s(fa.apply(null, arguments));
  };
}
const B = (e) => {
  const o = (t) => t[e] || [];
  return o.isThemeGetter = !0, o;
}, tr = /^\[(?:([a-z-]+):)?(.+)\]$/i, ma = /^\d+\/\d+$/, va = /* @__PURE__ */ new Set(["px", "full", "screen"]), ga = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, ya = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, ba = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, xa = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, wa = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ge = (e) => Oe(e) || va.has(e) || ma.test(e), ye = (e) => $e(e, "length", Ta), Oe = (e) => !!e && !Number.isNaN(Number(e)), Vt = (e) => $e(e, "number", Oe), Ve = (e) => !!e && Number.isInteger(Number(e)), Ca = (e) => e.endsWith("%") && Oe(e.slice(0, -1)), O = (e) => tr.test(e), be = (e) => ga.test(e), Sa = /* @__PURE__ */ new Set(["length", "size", "percentage"]), ka = (e) => $e(e, Sa, or), Pa = (e) => $e(e, "position", or), Ea = /* @__PURE__ */ new Set(["image", "url"]), Ra = (e) => $e(e, Ea, Aa), Ma = (e) => $e(e, "", _a), Be = () => !0, $e = (e, o, t) => {
  const r = tr.exec(e);
  return r ? r[1] ? typeof o == "string" ? r[1] === o : o.has(r[1]) : t(r[2]) : !1;
}, Ta = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  ya.test(e) && !ba.test(e)
), or = () => !1, _a = (e) => xa.test(e), Aa = (e) => wa.test(e), Ia = () => {
  const e = B("colors"), o = B("spacing"), t = B("blur"), r = B("brightness"), n = B("borderColor"), s = B("borderRadius"), c = B("borderSpacing"), i = B("borderWidth"), l = B("contrast"), f = B("grayscale"), d = B("hueRotate"), u = B("invert"), h = B("gap"), v = B("gradientColorStops"), g = B("gradientColorStopPositions"), m = B("inset"), b = B("margin"), y = B("opacity"), x = B("padding"), w = B("saturate"), S = B("scale"), P = B("sepia"), A = B("skew"), N = B("space"), D = B("translate"), j = () => ["auto", "contain", "none"], L = () => ["auto", "hidden", "clip", "visible", "scroll"], T = () => ["auto", O, o], _ = () => [O, o], U = () => ["", ge, ye], W = () => ["auto", Oe, O], q = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], F = () => ["solid", "dashed", "dotted", "double", "none"], Q = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], H = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], E = () => ["", "0", O], ee = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], $ = () => [Oe, O];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Be],
      spacing: [ge, ye],
      blur: ["none", "", be, O],
      brightness: $(),
      borderColor: [e],
      borderRadius: ["none", "", "full", be, O],
      borderSpacing: _(),
      borderWidth: U(),
      contrast: $(),
      grayscale: E(),
      hueRotate: $(),
      invert: E(),
      gap: _(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Ca, ye],
      inset: T(),
      margin: T(),
      opacity: $(),
      padding: _(),
      saturate: $(),
      scale: $(),
      sepia: E(),
      skew: $(),
      space: _(),
      translate: _()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", O]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [be]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": ee()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": ee()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...q(), O]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: L()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": L()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": L()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: j()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": j()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": j()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [m]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [m]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [m]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [m]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [m]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [m]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [m]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [m]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [m]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", Ve, O]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: T()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", O]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: E()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: E()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", Ve, O]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [Be]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Ve, O]
        }, O]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": W()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": W()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [Be]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Ve, O]
        }, O]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": W()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": W()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", O]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", O]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [h]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [h]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [h]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...H()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...H(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...H(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [x]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [x]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [x]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [x]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [x]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [x]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [x]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [x]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [x]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [b]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [b]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [b]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [b]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [b]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [b]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [b]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [b]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [b]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [N]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [N]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", O, o]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [O, o, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [O, o, "none", "full", "min", "max", "fit", "prose", {
          screen: [be]
        }, be]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [O, o, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [O, o, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [O, o, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [O, o, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", be, ye]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Vt]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Be]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", O]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Oe, Vt]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", ge, O]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", O]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", O]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [e]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [y]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [e]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [y]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...F(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", ge, ye]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", ge, O]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [e]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: _()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", O]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", O]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [y]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...q(), Pa]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", ka]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Ra]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [e]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [g]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [g]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [g]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [v]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [v]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [v]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [s]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [s]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [s]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [s]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [s]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [s]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [s]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [s]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [s]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [s]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [s]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [s]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [s]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [s]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [s]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [i]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [i]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [i]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [i]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [i]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [i]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [i]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [i]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [i]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [y]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...F(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [i]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [i]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [y]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: F()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [n]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [n]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [n]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [n]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [n]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [n]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [n]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [n]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [n]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [n]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...F()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ge, O]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [ge, ye]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [e]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: U()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [e]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [y]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [ge, ye]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", be, Ma]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [Be]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [y]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Q(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Q()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [t]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [r]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [l]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", be, O]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [f]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [d]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [u]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [w]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [P]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [t]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [r]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [l]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [f]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [d]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [u]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [y]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [w]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [P]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [c]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [c]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [c]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", O]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: $()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", O]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: $()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", O]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [S]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [S]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [S]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [Ve, O]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [D]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [D]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [A]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [A]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", O]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", e]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", O]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [e]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": _()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": _()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": _()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": _()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": _()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": _()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": _()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": _()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": _()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": _()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": _()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": _()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": _()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": _()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": _()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": _()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": _()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": _()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", O]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [e, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [ge, ye, Vt]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [e, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, qu = /* @__PURE__ */ ha(Ia);
function k(e, o, { checkForDefaultPrevented: t = !0 } = {}) {
  return function(n) {
    if (e?.(n), t === !1 || !n || !n.defaultPrevented)
      return o?.(n);
  };
}
function ae(e, o = []) {
  let t = [];
  function r(s, c) {
    const i = a.createContext(c);
    i.displayName = s + "Context";
    const l = t.length;
    t = [...t, c];
    const f = (u) => {
      const { scope: h, children: v, ...g } = u, m = h?.[e]?.[l] || i, b = a.useMemo(() => g, Object.values(g));
      return /* @__PURE__ */ p.jsx(m.Provider, { value: b, children: v });
    };
    f.displayName = s + "Provider";
    function d(u, h, v = {}) {
      const { optional: g = !1 } = v, m = h?.[e]?.[l] || i, b = a.useContext(m);
      if (b) return b;
      if (c !== void 0) return c;
      if (!g)
        throw new Error(`\`${u}\` must be used within \`${s}\``);
    }
    return [f, d];
  }
  const n = () => {
    const s = t.map((c) => a.createContext(c));
    return function(i) {
      const l = i?.[e] || s;
      return a.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: l } }),
        [i, l]
      );
    };
  };
  return n.scopeName = e, [r, Na(n, ...o)];
}
function Na(...e) {
  const o = e[0];
  if (e.length === 1) return o;
  const t = () => {
    const r = e.map((n) => ({
      useScope: n(),
      scopeName: n.scopeName
    }));
    return function(s) {
      const c = r.reduce((i, { useScope: l, scopeName: f }) => {
        const u = l(s)[`__scope${f}`];
        return { ...i, ...u };
      }, {});
      return a.useMemo(() => ({ [`__scope${o.scopeName}`]: c }), [c]);
    };
  };
  return t.scopeName = o.scopeName, t;
}
var Oa = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], M = Oa.reduce((e, o) => {
  const t = /* @__PURE__ */ Ce(`Primitive.${o}`), r = a.forwardRef((n, s) => {
    const { asChild: c, ...i } = n, l = c ? t : o;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ p.jsx(l, { ...i, ref: s });
  });
  return r.displayName = `Primitive.${o}`, { ...e, [o]: r };
}, {});
function rr(e, o) {
  e && mt.flushSync(() => e.dispatchEvent(o));
}
function X(e) {
  const o = a.useRef(e);
  return a.useEffect(() => {
    o.current = e;
  }), a.useMemo(() => (...t) => o.current?.(...t), []);
}
var Da = "DismissableLayer", Yt = "dismissableLayer.update", ja = "dismissableLayer.pointerDownOutside", La = "dismissableLayer.focusOutside", $o, ao = a.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set(),
  // Outside elements that belong to a layer's own dismiss affordance (eg, a
  // dialog overlay). Pressing them should dismiss the layer regardless of
  // whether or not they stop propagation.
  //
  // See https://github.com/radix-ui/primitives/issues/3346
  dismissableSurfaces: /* @__PURE__ */ new Set()
}), He = a.forwardRef(
  (e, o) => {
    const {
      disableOutsidePointerEvents: t = !1,
      deferPointerDownOutside: r = !1,
      onEscapeKeyDown: n,
      onPointerDownOutside: s,
      onFocusOutside: c,
      onInteractOutside: i,
      onDismiss: l,
      ...f
    } = e, d = a.useContext(ao), [u, h] = a.useState(null), v = u?.ownerDocument ?? globalThis?.document, [, g] = a.useState({}), m = I(o, h), b = Array.from(d.layers), [y] = [
      ...d.layersWithOutsidePointerEventsDisabled
    ].slice(-1), x = y ? b.indexOf(y) : -1, w = u ? b.indexOf(u) : -1, S = d.layersWithOutsidePointerEventsDisabled.size > 0, P = w >= x, A = a.useRef(!1), N = Va(
      (T) => {
        s?.(T), i?.(T), T.defaultPrevented || l?.();
      },
      {
        ownerDocument: v,
        deferPointerDownOutside: r,
        isDeferredPointerDownOutsideRef: A,
        dismissableSurfaces: d.dismissableSurfaces,
        shouldHandlePointerDownOutside: a.useCallback(
          (T) => {
            if (!(T instanceof Node))
              return !1;
            const _ = [...d.branches].some(
              (U) => U.contains(T)
            );
            return P && !_;
          },
          [d.branches, P]
        )
      }
    ), D = Ba((T) => {
      if (r && A.current)
        return;
      const _ = T.target;
      [...d.branches].some((W) => W.contains(_)) || (c?.(T), i?.(T), T.defaultPrevented || l?.());
    }, v), j = u ? w === b.length - 1 : !1, L = X((T) => {
      T.key === "Escape" && (n?.(T), !T.defaultPrevented && l && (T.preventDefault(), l()));
    });
    return a.useEffect(() => {
      if (j)
        return v.addEventListener("keydown", L, { capture: !0 }), () => v.removeEventListener("keydown", L, { capture: !0 });
    }, [v, j, L]), a.useEffect(() => {
      if (u)
        return t && (d.layersWithOutsidePointerEventsDisabled.size === 0 && ($o = v.body.style.pointerEvents, v.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(u)), d.layers.add(u), Ho(), () => {
          t && (d.layersWithOutsidePointerEventsDisabled.delete(u), d.layersWithOutsidePointerEventsDisabled.size === 0 && (v.body.style.pointerEvents = $o));
        };
    }, [u, v, t, d]), a.useEffect(() => () => {
      u && (d.layers.delete(u), d.layersWithOutsidePointerEventsDisabled.delete(u), Ho());
    }, [u, d]), a.useEffect(() => {
      const T = () => g({});
      return document.addEventListener(Yt, T), () => document.removeEventListener(Yt, T);
    }, []), /* @__PURE__ */ p.jsx(
      M.div,
      {
        ...f,
        ref: m,
        style: {
          pointerEvents: S ? P ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: k(e.onFocusCapture, D.onFocusCapture),
        onBlurCapture: k(e.onBlurCapture, D.onBlurCapture),
        onPointerDownCapture: k(
          e.onPointerDownCapture,
          N.onPointerDownCapture
        )
      }
    );
  }
);
He.displayName = Da;
var Fa = "DismissableLayerBranch", $a = a.forwardRef((e, o) => {
  const t = a.useContext(ao), r = a.useRef(null), n = I(o, r);
  return a.useEffect(() => {
    const s = r.current;
    if (s)
      return t.branches.add(s), () => {
        t.branches.delete(s);
      };
  }, [t.branches]), /* @__PURE__ */ p.jsx(M.div, { ...e, ref: n });
});
$a.displayName = Fa;
function Ha() {
  const e = a.useContext(ao), [o, t] = a.useState(null);
  return a.useEffect(() => {
    if (o)
      return e.dismissableSurfaces.add(o), () => {
        e.dismissableSurfaces.delete(o);
      };
  }, [o, e.dismissableSurfaces]), t;
}
var za = () => !0;
function Va(e, o) {
  const {
    ownerDocument: t = globalThis?.document,
    deferPointerDownOutside: r = !1,
    isDeferredPointerDownOutsideRef: n,
    dismissableSurfaces: s,
    shouldHandlePointerDownOutside: c = za
  } = o, i = X(e), l = a.useRef(!1), f = a.useRef(!1), d = a.useRef(/* @__PURE__ */ new Map()), u = a.useRef(() => {
  });
  return a.useEffect(() => {
    function h() {
      f.current = !1, n.current = !1, d.current.clear();
    }
    function v() {
      return Array.from(d.current.values()).some(Boolean);
    }
    function g(w) {
      if (!f.current)
        return;
      const S = w.target;
      S instanceof Node && [...s].some((A) => A.contains(S)) || d.current.set(w.type, !0), w.type === "click" && window.setTimeout(() => {
        f.current && u.current();
      }, 0);
    }
    function m(w) {
      f.current && d.current.set(w.type, !1);
    }
    const b = (w) => {
      if (w.target && !l.current) {
        let S = function() {
          t.removeEventListener("click", u.current);
          const A = v();
          h(), A || nr(
            ja,
            i,
            P,
            { discrete: !0 }
          );
        };
        if (!c(w.target)) {
          t.removeEventListener("click", u.current), h(), l.current = !1;
          return;
        }
        const P = { originalEvent: w };
        f.current = !0, n.current = r && w.button === 0, d.current.clear(), !r || w.button !== 0 ? S() : (t.removeEventListener("click", u.current), u.current = S, t.addEventListener("click", u.current, { once: !0 }));
      } else
        t.removeEventListener("click", u.current), h();
      l.current = !1;
    }, y = [
      "pointerup",
      "mousedown",
      "mouseup",
      "touchstart",
      "touchend",
      "click"
    ];
    for (const w of y)
      t.addEventListener(w, g, !0), t.addEventListener(w, m);
    const x = window.setTimeout(() => {
      t.addEventListener("pointerdown", b);
    }, 0);
    return () => {
      window.clearTimeout(x), t.removeEventListener("pointerdown", b), t.removeEventListener("click", u.current);
      for (const w of y)
        t.removeEventListener(w, g, !0), t.removeEventListener(w, m);
    };
  }, [
    t,
    i,
    r,
    n,
    s,
    c
  ]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => l.current = !0
  };
}
function Ba(e, o = globalThis?.document) {
  const t = X(e), r = a.useRef(!1);
  return a.useEffect(() => {
    const n = (s) => {
      s.target && !r.current && nr(La, t, { originalEvent: s }, {
        discrete: !1
      });
    };
    return o.addEventListener("focusin", n), () => o.removeEventListener("focusin", n);
  }, [o, t]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Ho() {
  const e = new CustomEvent(Yt);
  document.dispatchEvent(e);
}
function nr(e, o, t, { discrete: r }) {
  const n = t.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: t });
  o && n.addEventListener(e, o, { once: !0 }), r ? rr(n, s) : n.dispatchEvent(s);
}
var st = 0, Ie = null;
function gt() {
  a.useEffect(() => {
    Ie || (Ie = { start: zo(), end: zo() });
    const { start: e, end: o } = Ie;
    return document.body.firstElementChild !== e && document.body.insertAdjacentElement("afterbegin", e), document.body.lastElementChild !== o && document.body.insertAdjacentElement("beforeend", o), st++, () => {
      st === 1 && (Ie?.start.remove(), Ie?.end.remove(), Ie = null), st = Math.max(0, st - 1);
    };
  }, []);
}
function zo() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Bt = "focusScope.autoFocusOnMount", Ut = "focusScope.autoFocusOnUnmount", Vo = { bubbles: !1, cancelable: !0 }, Ua = "FocusScope", Xe = a.forwardRef((e, o) => {
  const {
    loop: t = !1,
    trapped: r = !1,
    onMountAutoFocus: n,
    onUnmountAutoFocus: s,
    ...c
  } = e, [i, l] = a.useState(null), f = X(n), d = X(s), u = a.useRef(null), h = I(o, l), v = a.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  a.useEffect(() => {
    if (r) {
      let m = function(w) {
        if (v.paused || !i) return;
        const S = w.target;
        i.contains(S) ? u.current = S : xe(u.current, { select: !0 });
      }, b = function(w) {
        if (v.paused || !i) return;
        const S = w.relatedTarget;
        S !== null && (i.contains(S) || xe(u.current, { select: !0 }));
      }, y = function(w) {
        if (document.activeElement === document.body)
          for (const P of w)
            P.removedNodes.length > 0 && xe(i);
      };
      document.addEventListener("focusin", m), document.addEventListener("focusout", b);
      const x = new MutationObserver(y);
      return i && x.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", m), document.removeEventListener("focusout", b), x.disconnect();
      };
    }
  }, [r, i, v.paused]), a.useEffect(() => {
    if (i) {
      Uo.add(v);
      const m = document.activeElement;
      if (!i.contains(m)) {
        const y = new CustomEvent(Bt, Vo);
        i.addEventListener(Bt, f), i.dispatchEvent(y), y.defaultPrevented || (Ga(Xa(sr(i)), { select: !0 }), document.activeElement === m && xe(i));
      }
      return () => {
        i.removeEventListener(Bt, f), setTimeout(() => {
          const y = new CustomEvent(Ut, Vo);
          i.addEventListener(Ut, d), i.dispatchEvent(y), y.defaultPrevented || xe(m ?? document.body, { select: !0 }), i.removeEventListener(Ut, d), Uo.remove(v);
        }, 0);
      };
    }
  }, [i, f, d, v]);
  const g = a.useCallback(
    (m) => {
      if (!t && !r || v.paused) return;
      const b = m.key === "Tab" && !m.altKey && !m.ctrlKey && !m.metaKey, y = document.activeElement;
      if (b && y) {
        const x = m.currentTarget, [w, S] = Wa(x);
        w && S ? !m.shiftKey && y === S ? (m.preventDefault(), t && xe(w, { select: !0 })) : m.shiftKey && y === w && (m.preventDefault(), t && xe(S, { select: !0 })) : y === x && m.preventDefault();
      }
    },
    [t, r, v.paused]
  );
  return /* @__PURE__ */ p.jsx(M.div, { tabIndex: -1, ...c, ref: h, onKeyDown: g });
});
Xe.displayName = Ua;
function Ga(e, { select: o = !1 } = {}) {
  const t = document.activeElement;
  for (const r of e)
    if (xe(r, { select: o }), document.activeElement !== t) return;
}
function Wa(e) {
  const o = sr(e), t = Bo(o, e), r = Bo(o.reverse(), e);
  return [t, r];
}
function sr(e) {
  const o = [], t = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const n = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || n ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; t.nextNode(); ) o.push(t.currentNode);
  return o;
}
function Bo(e, o) {
  const t = typeof o.checkVisibility == "function" && o.checkVisibility({ checkVisibilityCSS: !0 });
  for (const r of e)
    if (!(t ? !r.checkVisibility({ checkVisibilityCSS: !0 }) : Ka(r, { upTo: o })))
      return r;
}
function Ka(e, { upTo: o }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (o !== void 0 && e === o) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function qa(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function xe(e, { select: o = !1 } = {}) {
  if (e && e.focus) {
    const t = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== t && qa(e) && o && e.select();
  }
}
var Uo = Ya();
function Ya() {
  let e = [];
  return {
    add(o) {
      const t = e[0];
      o !== t && t?.pause(), e = Go(e, o), e.unshift(o);
    },
    remove(o) {
      e = Go(e, o), e[0]?.resume();
    }
  };
}
function Go(e, o) {
  const t = [...e], r = t.indexOf(o);
  return r !== -1 && t.splice(r, 1), t;
}
function Xa(e) {
  return e.filter((o) => o.tagName !== "A");
}
var Z = globalThis?.document ? a.useLayoutEffect : () => {
}, Za = ht[" useId ".trim().toString()] || (() => {
}), Ja = 0;
function ie(e) {
  const [o, t] = a.useState(Za());
  return Z(() => {
    t((r) => r ?? String(Ja++));
  }, [e]), o ? `radix-${o}` : "";
}
var Qa = "Arrow", ar = a.forwardRef((e, o) => {
  const { children: t, width: r = 10, height: n = 5, ...s } = e;
  return /* @__PURE__ */ p.jsx(
    M.svg,
    {
      ...s,
      ref: o,
      width: r,
      height: n,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? t : /* @__PURE__ */ p.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
ar.displayName = Qa;
var ec = ar;
function co(e) {
  const [o, t] = a.useState(void 0);
  return Z(() => {
    if (e) {
      t({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((n) => {
        if (!Array.isArray(n) || !n.length)
          return;
        const s = n[0];
        let c, i;
        if ("borderBoxSize" in s) {
          const l = s.borderBoxSize, f = Array.isArray(l) ? l[0] : l;
          c = f.inlineSize, i = f.blockSize;
        } else
          c = e.offsetWidth, i = e.offsetHeight;
        t({ width: c, height: i });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      t(void 0);
  }, [e]), o;
}
var io = "Popper", [cr, ke] = ae(io), [tc, ir] = cr(io), lr = (e) => {
  const { __scopePopper: o, children: t } = e, [r, n] = a.useState(null), [s, c] = a.useState(void 0);
  return /* @__PURE__ */ p.jsx(
    tc,
    {
      scope: o,
      anchor: r,
      onAnchorChange: n,
      placementState: s,
      setPlacementState: c,
      children: t
    }
  );
};
lr.displayName = io;
var ur = "PopperAnchor", dr = a.forwardRef(
  (e, o) => {
    const { __scopePopper: t, virtualRef: r, ...n } = e, s = ir(ur, t), c = a.useRef(null), i = s.onAnchorChange, l = a.useCallback(
      (g) => {
        c.current = g, g && i(g);
      },
      [i]
    ), f = I(o, l), d = a.useRef(null);
    a.useEffect(() => {
      if (!r)
        return;
      const g = d.current;
      d.current = r.current, g !== d.current && i(d.current);
    });
    const u = s.placementState && uo(s.placementState), h = u?.[0], v = u?.[1];
    return r ? null : /* @__PURE__ */ p.jsx(
      M.div,
      {
        "data-radix-popper-side": h,
        "data-radix-popper-align": v,
        ...n,
        ref: f
      }
    );
  }
);
dr.displayName = ur;
var lo = "PopperContent", [oc, rc] = cr(lo), pr = a.forwardRef(
  (e, o) => {
    const {
      __scopePopper: t,
      side: r = "bottom",
      sideOffset: n = 0,
      align: s = "center",
      alignOffset: c = 0,
      arrowPadding: i = 0,
      avoidCollisions: l = !0,
      collisionBoundary: f = [],
      collisionPadding: d = 0,
      sticky: u = "partial",
      hideWhenDetached: h = !1,
      updatePositionStrategy: v = "optimized",
      onPlaced: g,
      ...m
    } = e, b = ir(lo, t), [y, x] = a.useState(null), w = I(o, x), [S, P] = a.useState(null), A = co(S), N = A?.width ?? 0, D = A?.height ?? 0, j = r + (s !== "center" ? "-" + s : ""), L = typeof d == "number" ? d : { top: 0, right: 0, bottom: 0, left: 0, ...d }, T = Array.isArray(f) ? f : [f], _ = T.length > 0, U = {
      padding: L,
      boundary: T.filter(sc),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: _
    }, { refs: W, floatingStyles: q, placement: F, isPositioned: Q, middlewareData: H } = js({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: j,
      whileElementsMounted: (...z) => Bs(...z, {
        animationFrame: v === "always"
      }),
      elements: {
        reference: b.anchor
      },
      middleware: [
        Ls({ mainAxis: n + D, alignmentAxis: c }),
        l && Fs({
          mainAxis: !0,
          crossAxis: !1,
          limiter: u === "partial" ? Us() : void 0,
          ...U
        }),
        l && $s({ ...U }),
        Hs({
          ...U,
          apply: ({ elements: z, rects: oe, availableWidth: V, availableHeight: G }) => {
            const { width: Y, height: ve } = oe.reference, ce = z.floating.style;
            ce.setProperty("--radix-popper-available-width", `${V}px`), ce.setProperty("--radix-popper-available-height", `${G}px`), ce.setProperty("--radix-popper-anchor-width", `${Y}px`), ce.setProperty("--radix-popper-anchor-height", `${ve}px`);
          }
        }),
        S && zs({ element: S, padding: i }),
        ac({ arrowWidth: N, arrowHeight: D }),
        h && Vs({
          strategy: "referenceHidden",
          ...U,
          // `hide` detects whether the anchor (reference) is clipped, so when
          // no explicit `collisionBoundary` is set we fall back to Floating
          // UI's default clipping ancestors (e.g. a scrollable menu). This
          // lets an occluded submenu hide once its anchor scrolls out of view
          // (#3237). The collision/size middlewares deliberately keep the
          // viewport-based default to avoid clamping content rendered inside
          // transformed or overflow-clipping portal containers.
          boundary: _ ? U.boundary : void 0
        })
      ]
    }), E = b.setPlacementState;
    Z(() => (E(F), () => {
      E(void 0);
    }), [F, E]);
    const [ee, $] = uo(F), K = X(g);
    Z(() => {
      Q && K?.();
    }, [Q, K]);
    const te = H.arrow?.x, re = H.arrow?.y, me = H.arrow?.centerOffset !== 0, [se, R] = a.useState();
    return Z(() => {
      y && R(window.getComputedStyle(y).zIndex);
    }, [y]), /* @__PURE__ */ p.jsx(
      "div",
      {
        ref: W.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...q,
          transform: Q ? q.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: se,
          "--radix-popper-transform-origin": [
            H.transformOrigin?.x,
            H.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...H.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ p.jsx(
          oc,
          {
            scope: t,
            placedSide: ee,
            placedAlign: $,
            onArrowChange: P,
            arrowX: te,
            arrowY: re,
            shouldHideArrow: me,
            children: /* @__PURE__ */ p.jsx(
              M.div,
              {
                "data-side": ee,
                "data-align": $,
                ...m,
                ref: w,
                style: {
                  ...m.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: Q ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
pr.displayName = lo;
var fr = "PopperArrow", nc = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, hr = a.forwardRef(function(o, t) {
  const { __scopePopper: r, ...n } = o, s = rc(fr, r), c = nc[s.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ p.jsx(
      "span",
      {
        ref: s.onArrowChange,
        style: {
          position: "absolute",
          left: s.arrowX,
          top: s.arrowY,
          [c]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[s.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[s.placedSide],
          visibility: s.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ p.jsx(
          ec,
          {
            ...n,
            ref: t,
            style: {
              ...n.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
hr.displayName = fr;
function sc(e) {
  return e !== null;
}
var ac = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(o) {
    const { placement: t, rects: r, middlewareData: n } = o, c = n.arrow?.centerOffset !== 0, i = c ? 0 : e.arrowWidth, l = c ? 0 : e.arrowHeight, [f, d] = uo(t), u = { start: "0%", center: "50%", end: "100%" }[d], h = (n.arrow?.x ?? 0) + i / 2, v = (n.arrow?.y ?? 0) + l / 2;
    let g = "", m = "";
    return f === "bottom" ? (g = c ? u : `${h}px`, m = `${-l}px`) : f === "top" ? (g = c ? u : `${h}px`, m = `${r.floating.height + l}px`) : f === "right" ? (g = `${-l}px`, m = c ? u : `${v}px`) : f === "left" && (g = `${r.floating.width + l}px`, m = c ? u : `${v}px`), { data: { x: g, y: m } };
  }
});
function uo(e) {
  const [o, t = "center"] = e.split("-");
  return [o, t];
}
var yt = lr, Ze = dr, bt = pr, xt = hr, cc = "Portal", ze = a.forwardRef((e, o) => {
  const { container: t, ...r } = e, [n, s] = a.useState(!1);
  Z(() => s(!0), []);
  const c = t || n && globalThis?.document?.body;
  return c ? mt.createPortal(/* @__PURE__ */ p.jsx(M.div, { ...r, ref: o }), c) : null;
});
ze.displayName = cc;
function ic(e, o) {
  return a.useReducer((t, r) => o[t][r] ?? t, e);
}
var J = (e) => {
  const { present: o, children: t } = e, r = lc(o), n = typeof t == "function" ? t({ present: r.isPresent }) : a.Children.only(t), s = uc(r.ref, dc(n));
  return typeof t == "function" || r.isPresent ? a.cloneElement(n, { ref: s }) : null;
};
J.displayName = "Presence";
function lc(e) {
  const [o, t] = a.useState(), r = a.useRef(null), n = a.useRef(e), s = a.useRef("none"), c = a.useRef(void 0), i = e ? "mounted" : "unmounted", [l, f] = ic(i, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return a.useEffect(() => {
    l === "mounted" ? (s.current = c.current ?? Ue(r.current), c.current = void 0) : s.current = "none";
  }, [l]), Z(() => {
    const d = r.current, u = n.current;
    if (u !== e) {
      const v = s.current, g = Ue(d);
      e ? (c.current = g, f("MOUNT")) : g === "none" || d?.display === "none" ? f("UNMOUNT") : f(u && v !== g ? "ANIMATION_OUT" : "UNMOUNT"), n.current = e;
    }
  }, [e, f]), Z(() => {
    if (o) {
      let d;
      const u = o.ownerDocument.defaultView ?? window, h = (g) => {
        const b = Ue(r.current).includes(CSS.escape(g.animationName));
        if (g.target === o && b && (f("ANIMATION_END"), !n.current)) {
          const y = o.style.animationFillMode;
          o.style.animationFillMode = "forwards", d = u.setTimeout(() => {
            o.style.animationFillMode === "forwards" && (o.style.animationFillMode = y);
          });
        }
      }, v = (g) => {
        g.target === o && (s.current = Ue(r.current));
      };
      return o.addEventListener("animationstart", v), o.addEventListener("animationcancel", h), o.addEventListener("animationend", h), () => {
        u.clearTimeout(d), o.removeEventListener("animationstart", v), o.removeEventListener("animationcancel", h), o.removeEventListener("animationend", h);
      };
    } else
      f("ANIMATION_END");
  }, [o, f]), {
    isPresent: ["mounted", "unmountSuspended"].includes(l),
    ref: a.useCallback((d) => {
      if (d) {
        const u = getComputedStyle(d);
        r.current = u, c.current = Ue(u);
      } else
        r.current = null;
      t(d);
    }, [])
  };
}
function Wo(e, o) {
  if (typeof e == "function")
    return e(o);
  e != null && (e.current = o);
}
function uc(...e) {
  const o = a.useRef(e);
  return o.current = e, a.useCallback((t) => {
    const r = o.current;
    let n = !1;
    const s = r.map((c) => {
      const i = Wo(c, t);
      return !n && typeof i == "function" && (n = !0), i;
    });
    if (n)
      return () => {
        for (let c = 0; c < s.length; c++) {
          const i = s[c];
          typeof i == "function" ? i() : Wo(r[c], null);
        }
      };
  }, []);
}
function Ue(e) {
  return e?.animationName || "none";
}
function dc(e) {
  let o = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, t = o && "isReactWarning" in o && o.isReactWarning;
  return t ? e.ref : (o = Object.getOwnPropertyDescriptor(e, "ref")?.get, t = o && "isReactWarning" in o && o.isReactWarning, t ? e.props.ref : e.props.ref || e.ref);
}
var pc = ht[" useInsertionEffect ".trim().toString()] || Z;
function fe({
  prop: e,
  defaultProp: o,
  onChange: t = () => {
  },
  caller: r
}) {
  const [n, s, c] = fc({
    defaultProp: o,
    onChange: t
  }), i = e !== void 0, l = i ? e : n;
  {
    const d = a.useRef(e !== void 0);
    a.useEffect(() => {
      const u = d.current;
      u !== i && console.warn(
        `${r} is changing from ${u ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), d.current = i;
    }, [i, r]);
  }
  const f = a.useCallback(
    (d) => {
      if (i) {
        const u = hc(d) ? d(e) : d;
        u !== e && c.current?.(u);
      } else
        s(d);
    },
    [i, e, s, c]
  );
  return [l, f];
}
function fc({
  defaultProp: e,
  onChange: o
}) {
  const [t, r] = a.useState(e), n = a.useRef(t), s = a.useRef(o);
  return pc(() => {
    s.current = o;
  }, [o]), a.useEffect(() => {
    n.current !== t && (s.current?.(t), n.current = t);
  }, [t, n]), [t, r, s];
}
function hc(e) {
  return typeof e == "function";
}
var mc = function(e) {
  if (typeof document > "u")
    return null;
  var o = Array.isArray(e) ? e[0] : e;
  return o.ownerDocument.body;
}, Ne = /* @__PURE__ */ new WeakMap(), at = /* @__PURE__ */ new WeakMap(), ct = {}, Gt = 0, mr = function(e) {
  return e && (e.host || mr(e.parentNode));
}, vc = function(e, o) {
  return o.map(function(t) {
    if (e.contains(t))
      return t;
    var r = mr(t);
    return r && e.contains(r) ? r : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(t) {
    return !!t;
  });
}, gc = function(e, o, t, r) {
  var n = vc(o, Array.isArray(e) ? e : [e]);
  ct[t] || (ct[t] = /* @__PURE__ */ new WeakMap());
  var s = ct[t], c = [], i = /* @__PURE__ */ new Set(), l = new Set(n), f = function(u) {
    !u || i.has(u) || (i.add(u), f(u.parentNode));
  };
  n.forEach(f);
  var d = function(u) {
    !u || l.has(u) || Array.prototype.forEach.call(u.children, function(h) {
      if (i.has(h))
        d(h);
      else
        try {
          var v = h.getAttribute(r), g = v !== null && v !== "false", m = (Ne.get(h) || 0) + 1, b = (s.get(h) || 0) + 1;
          Ne.set(h, m), s.set(h, b), c.push(h), m === 1 && g && at.set(h, !0), b === 1 && h.setAttribute(t, "true"), g || h.setAttribute(r, "true");
        } catch (y) {
          console.error("aria-hidden: cannot operate on ", h, y);
        }
    });
  };
  return d(o), i.clear(), Gt++, function() {
    c.forEach(function(u) {
      var h = Ne.get(u) - 1, v = s.get(u) - 1;
      Ne.set(u, h), s.set(u, v), h || (at.has(u) || u.removeAttribute(r), at.delete(u)), v || u.removeAttribute(t);
    }), Gt--, Gt || (Ne = /* @__PURE__ */ new WeakMap(), Ne = /* @__PURE__ */ new WeakMap(), at = /* @__PURE__ */ new WeakMap(), ct = {});
  };
}, wt = function(e, o, t) {
  t === void 0 && (t = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), n = mc(e);
  return n ? (r.push.apply(r, Array.from(n.querySelectorAll("[aria-live], script"))), gc(r, n, t, "aria-hidden")) : function() {
    return null;
  };
}, Ct = "Popover", [vr] = ae(Ct, [
  ke
]), Je = ke(), [yc, Pe] = vr(Ct), gr = (e) => {
  const {
    __scopePopover: o,
    children: t,
    open: r,
    defaultOpen: n,
    onOpenChange: s,
    modal: c = !1
  } = e, i = Je(o), l = a.useRef(null), [f, d] = a.useState(!1), [u, h] = fe({
    prop: r,
    defaultProp: n ?? !1,
    onChange: s,
    caller: Ct
  });
  return /* @__PURE__ */ p.jsx(yt, { ...i, children: /* @__PURE__ */ p.jsx(
    yc,
    {
      scope: o,
      contentId: ie(),
      triggerRef: l,
      open: u,
      onOpenChange: h,
      onOpenToggle: a.useCallback(() => h((v) => !v), [h]),
      hasCustomAnchor: f,
      onCustomAnchorAdd: a.useCallback(() => d(!0), []),
      onCustomAnchorRemove: a.useCallback(() => d(!1), []),
      modal: c,
      children: t
    }
  ) });
};
gr.displayName = Ct;
var yr = "PopoverAnchor", bc = a.forwardRef(
  (e, o) => {
    const { __scopePopover: t, ...r } = e, n = Pe(yr, t), s = Je(t), { onCustomAnchorAdd: c, onCustomAnchorRemove: i } = n;
    return a.useEffect(() => (c(), () => i()), [c, i]), /* @__PURE__ */ p.jsx(Ze, { ...s, ...r, ref: o });
  }
);
bc.displayName = yr;
var br = "PopoverTrigger", xr = a.forwardRef(
  (e, o) => {
    const { __scopePopover: t, ...r } = e, n = Pe(br, t), s = Je(t), c = I(o, n.triggerRef), i = /* @__PURE__ */ p.jsx(
      M.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": n.open,
        "aria-controls": n.open ? n.contentId : void 0,
        "data-state": Pr(n.open),
        ...r,
        ref: c,
        onClick: k(e.onClick, n.onOpenToggle)
      }
    );
    return n.hasCustomAnchor ? i : /* @__PURE__ */ p.jsx(Ze, { asChild: !0, ...s, children: i });
  }
);
xr.displayName = br;
var po = "PopoverPortal", [xc, wc] = vr(po, {
  forceMount: void 0
}), wr = (e) => {
  const { __scopePopover: o, forceMount: t, children: r, container: n } = e, s = Pe(po, o);
  return /* @__PURE__ */ p.jsx(xc, { scope: o, forceMount: t, children: /* @__PURE__ */ p.jsx(J, { present: t || s.open, children: /* @__PURE__ */ p.jsx(ze, { asChild: !0, container: n, children: r }) }) });
};
wr.displayName = po;
var De = "PopoverContent", Cr = a.forwardRef(
  (e, o) => {
    const t = wc(De, e.__scopePopover), { forceMount: r = t.forceMount, ...n } = e, s = Pe(De, e.__scopePopover);
    return /* @__PURE__ */ p.jsx(J, { present: r || s.open, children: s.modal ? /* @__PURE__ */ p.jsx(Sc, { ...n, ref: o }) : /* @__PURE__ */ p.jsx(kc, { ...n, ref: o }) });
  }
);
Cr.displayName = De;
var Cc = /* @__PURE__ */ Ce("PopoverContent.RemoveScroll"), Sc = a.forwardRef(
  (e, o) => {
    const t = Pe(De, e.__scopePopover), r = a.useRef(null), n = I(o, r), s = a.useRef(!1);
    return a.useEffect(() => {
      const c = r.current;
      if (c) return wt(c);
    }, []), /* @__PURE__ */ p.jsx(vt, { as: Cc, allowPinchZoom: !0, children: /* @__PURE__ */ p.jsx(
      Sr,
      {
        ...e,
        ref: n,
        trapFocus: t.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: k(e.onCloseAutoFocus, (c) => {
          c.preventDefault(), s.current || t.triggerRef.current?.focus();
        }),
        onPointerDownOutside: k(
          e.onPointerDownOutside,
          (c) => {
            const i = c.detail.originalEvent, l = i.button === 0 && i.ctrlKey === !0, f = i.button === 2 || l;
            s.current = f;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: k(
          e.onFocusOutside,
          (c) => c.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), kc = a.forwardRef(
  (e, o) => {
    const t = Pe(De, e.__scopePopover), r = a.useRef(!1), n = a.useRef(!1);
    return /* @__PURE__ */ p.jsx(
      Sr,
      {
        ...e,
        ref: o,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (s) => {
          e.onCloseAutoFocus?.(s), s.defaultPrevented || (r.current || t.triggerRef.current?.focus(), s.preventDefault()), r.current = !1, n.current = !1;
        },
        onInteractOutside: (s) => {
          e.onInteractOutside?.(s), s.defaultPrevented || (r.current = !0, s.detail.originalEvent.type === "pointerdown" && (n.current = !0));
          const c = s.target;
          t.triggerRef.current?.contains(c) && s.preventDefault(), s.detail.originalEvent.type === "focusin" && n.current && s.preventDefault();
        }
      }
    );
  }
), Sr = a.forwardRef(
  (e, o) => {
    const {
      __scopePopover: t,
      trapFocus: r,
      onOpenAutoFocus: n,
      onCloseAutoFocus: s,
      disableOutsidePointerEvents: c,
      onEscapeKeyDown: i,
      onPointerDownOutside: l,
      onFocusOutside: f,
      onInteractOutside: d,
      ...u
    } = e, h = Pe(De, t), v = Je(t);
    return gt(), /* @__PURE__ */ p.jsx(
      Xe,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: n,
        onUnmountAutoFocus: s,
        children: /* @__PURE__ */ p.jsx(
          He,
          {
            asChild: !0,
            disableOutsidePointerEvents: c,
            onInteractOutside: d,
            onEscapeKeyDown: i,
            onPointerDownOutside: l,
            onFocusOutside: f,
            onDismiss: () => h.onOpenChange(!1),
            deferPointerDownOutside: !0,
            children: /* @__PURE__ */ p.jsx(
              bt,
              {
                "data-state": Pr(h.open),
                role: "dialog",
                id: h.contentId,
                ...v,
                ...u,
                ref: o,
                style: {
                  ...u.style,
                  "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                  "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                  "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                  "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                  "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                }
              }
            )
          }
        )
      }
    );
  }
), kr = "PopoverClose", Pc = a.forwardRef(
  (e, o) => {
    const { __scopePopover: t, ...r } = e, n = Pe(kr, t);
    return /* @__PURE__ */ p.jsx(
      M.button,
      {
        type: "button",
        ...r,
        ref: o,
        onClick: k(e.onClick, () => n.onOpenChange(!1))
      }
    );
  }
);
Pc.displayName = kr;
var Ec = "PopoverArrow", Rc = a.forwardRef(
  (e, o) => {
    const { __scopePopover: t, ...r } = e, n = Je(t);
    return /* @__PURE__ */ p.jsx(xt, { ...n, ...r, ref: o });
  }
);
Rc.displayName = Ec;
function Pr(e) {
  return e ? "open" : "closed";
}
var Yu = gr, Xu = xr, Zu = wr, Ju = Cr, Er = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
}), Mc = "VisuallyHidden", Rr = a.forwardRef(
  (e, o) => /* @__PURE__ */ p.jsx(
    M.span,
    {
      ...e,
      ref: o,
      style: { ...Er, ...e.style }
    }
  )
);
Rr.displayName = Mc;
var Tc = Rr, [St] = ae("Tooltip", [
  ke
]), kt = ke(), Mr = "TooltipProvider", _c = 700, Xt = "tooltip.open", [Ac, fo] = St(Mr), Tr = (e) => {
  const {
    __scopeTooltip: o,
    delayDuration: t = _c,
    skipDelayDuration: r = 300,
    disableHoverableContent: n = !1,
    children: s
  } = e, c = a.useRef(!0), i = a.useRef(!1), l = a.useRef(0);
  return a.useEffect(() => {
    const f = l.current;
    return () => window.clearTimeout(f);
  }, []), /* @__PURE__ */ p.jsx(
    Ac,
    {
      scope: o,
      isOpenDelayedRef: c,
      delayDuration: t,
      onOpen: a.useCallback(() => {
        r <= 0 || (window.clearTimeout(l.current), c.current = !1);
      }, [r]),
      onClose: a.useCallback(() => {
        r <= 0 || (window.clearTimeout(l.current), l.current = window.setTimeout(
          () => c.current = !0,
          r
        ));
      }, [r]),
      isPointerInTransitRef: i,
      onPointerInTransitChange: a.useCallback((f) => {
        i.current = f;
      }, []),
      disableHoverableContent: n,
      children: s
    }
  );
};
Tr.displayName = Mr;
var Ke = "Tooltip", [Ic, Qe] = St(Ke), _r = (e) => {
  const {
    __scopeTooltip: o,
    children: t,
    open: r,
    defaultOpen: n,
    onOpenChange: s,
    disableHoverableContent: c,
    delayDuration: i
  } = e, l = fo(Ke, e.__scopeTooltip), f = kt(o), [d, u] = a.useState(null), h = ie(), v = a.useRef(0), g = c ?? l.disableHoverableContent, m = i ?? l.delayDuration, b = a.useRef(!1), [y, x] = fe({
    prop: r,
    defaultProp: n ?? !1,
    onChange: (N) => {
      N ? (l.onOpen(), document.dispatchEvent(new CustomEvent(Xt))) : l.onClose(), s?.(N);
    },
    caller: Ke
  }), w = a.useMemo(() => y ? b.current ? "delayed-open" : "instant-open" : "closed", [y]), S = a.useCallback(() => {
    window.clearTimeout(v.current), v.current = 0, b.current = !1, x(!0);
  }, [x]), P = a.useCallback(() => {
    window.clearTimeout(v.current), v.current = 0, x(!1);
  }, [x]), A = a.useCallback(() => {
    window.clearTimeout(v.current), v.current = window.setTimeout(() => {
      b.current = !0, x(!0), v.current = 0;
    }, m);
  }, [m, x]);
  return a.useEffect(() => () => {
    v.current && (window.clearTimeout(v.current), v.current = 0);
  }, []), /* @__PURE__ */ p.jsx(yt, { ...f, children: /* @__PURE__ */ p.jsx(
    Ic,
    {
      scope: o,
      contentId: h,
      open: y,
      stateAttribute: w,
      trigger: d,
      onTriggerChange: u,
      onTriggerEnter: a.useCallback(() => {
        l.isOpenDelayedRef.current ? A() : S();
      }, [l.isOpenDelayedRef, A, S]),
      onTriggerLeave: a.useCallback(() => {
        g ? P() : (window.clearTimeout(v.current), v.current = 0);
      }, [P, g]),
      onOpen: S,
      onClose: P,
      disableHoverableContent: g,
      children: t
    }
  ) });
};
_r.displayName = Ke;
var Zt = "TooltipTrigger", Ar = a.forwardRef(
  (e, o) => {
    const { __scopeTooltip: t, ...r } = e, n = Qe(Zt, t), s = fo(Zt, t), c = kt(t), i = a.useRef(null), l = I(o, i, n.onTriggerChange), f = a.useRef(!1), d = a.useRef(!1), u = a.useCallback(() => f.current = !1, []);
    return a.useEffect(() => () => document.removeEventListener("pointerup", u), [u]), /* @__PURE__ */ p.jsx(Ze, { asChild: !0, ...c, children: /* @__PURE__ */ p.jsx(
      M.button,
      {
        "aria-describedby": n.open ? n.contentId : void 0,
        "data-state": n.stateAttribute,
        ...r,
        ref: l,
        onPointerMove: k(e.onPointerMove, (h) => {
          h.pointerType !== "touch" && !d.current && !s.isPointerInTransitRef.current && (n.onTriggerEnter(), d.current = !0);
        }),
        onPointerLeave: k(e.onPointerLeave, () => {
          n.onTriggerLeave(), d.current = !1;
        }),
        onPointerDown: k(e.onPointerDown, () => {
          n.open && n.onClose(), f.current = !0, document.addEventListener("pointerup", u, { once: !0 });
        }),
        onFocus: k(e.onFocus, () => {
          f.current || n.onOpen();
        }),
        onBlur: k(e.onBlur, n.onClose),
        onClick: k(e.onClick, n.onClose)
      }
    ) });
  }
);
Ar.displayName = Zt;
var ho = "TooltipPortal", [Nc, Oc] = St(ho, {
  forceMount: void 0
}), Ir = (e) => {
  const { __scopeTooltip: o, forceMount: t, children: r, container: n } = e, s = Qe(ho, o);
  return /* @__PURE__ */ p.jsx(Nc, { scope: o, forceMount: t, children: /* @__PURE__ */ p.jsx(J, { present: t || s.open, children: /* @__PURE__ */ p.jsx(ze, { asChild: !0, container: n, children: r }) }) });
};
Ir.displayName = ho;
var je = "TooltipContent", Nr = a.forwardRef(
  (e, o) => {
    const t = Oc(je, e.__scopeTooltip), { forceMount: r = t.forceMount, side: n = "top", ...s } = e, c = Qe(je, e.__scopeTooltip);
    return /* @__PURE__ */ p.jsx(J, { present: r || c.open, children: c.disableHoverableContent ? /* @__PURE__ */ p.jsx(Or, { side: n, ...s, ref: o }) : /* @__PURE__ */ p.jsx(Dc, { side: n, ...s, ref: o }) });
  }
), Dc = a.forwardRef((e, o) => {
  const t = Qe(je, e.__scopeTooltip), r = fo(je, e.__scopeTooltip), n = a.useRef(null), s = I(o, n), [c, i] = a.useState(null), { trigger: l, onClose: f } = t, d = n.current, { onPointerInTransitChange: u } = r, h = a.useCallback(() => {
    i(null), u(!1);
  }, [u]), v = a.useCallback(
    (g, m) => {
      const b = g.currentTarget, y = { x: g.clientX, y: g.clientY }, x = Hc(y, b.getBoundingClientRect()), w = zc(y, x), S = Vc(m.getBoundingClientRect()), P = Uc([...w, ...S]);
      i(P), u(!0);
    },
    [u]
  );
  return a.useEffect(() => () => h(), [h]), a.useEffect(() => {
    if (l && d) {
      const g = (b) => v(b, d), m = (b) => v(b, l);
      return l.addEventListener("pointerleave", g), d.addEventListener("pointerleave", m), () => {
        l.removeEventListener("pointerleave", g), d.removeEventListener("pointerleave", m);
      };
    }
  }, [l, d, v, h]), a.useEffect(() => {
    if (c) {
      const g = (m) => {
        const b = m.target, y = { x: m.clientX, y: m.clientY }, x = l?.contains(b) || d?.contains(b), w = !Bc(y, c);
        x ? h() : w && (h(), f());
      };
      return document.addEventListener("pointermove", g), () => document.removeEventListener("pointermove", g);
    }
  }, [l, d, c, f, h]), /* @__PURE__ */ p.jsx(Or, { ...e, ref: s });
}), [jc, Lc] = St(Ke, { isInside: !1 }), Fc = /* @__PURE__ */ Ws("TooltipContent"), Or = a.forwardRef(
  (e, o) => {
    const {
      __scopeTooltip: t,
      children: r,
      "aria-label": n,
      onEscapeKeyDown: s,
      onPointerDownOutside: c,
      ...i
    } = e, l = Qe(je, t), f = kt(t), { onClose: d } = l;
    return a.useEffect(() => (document.addEventListener(Xt, d), () => document.removeEventListener(Xt, d)), [d]), a.useEffect(() => {
      if (l.trigger) {
        const u = (h) => {
          h.target instanceof Node && h.target.contains(l.trigger) && d();
        };
        return window.addEventListener("scroll", u, { capture: !0 }), () => window.removeEventListener("scroll", u, { capture: !0 });
      }
    }, [l.trigger, d]), /* @__PURE__ */ p.jsx(
      He,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: c,
        onFocusOutside: (u) => u.preventDefault(),
        onDismiss: d,
        children: /* @__PURE__ */ p.jsxs(
          bt,
          {
            "data-state": l.stateAttribute,
            ...f,
            ...i,
            ref: o,
            style: {
              ...i.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ p.jsx(Fc, { children: r }),
              /* @__PURE__ */ p.jsx(jc, { scope: t, isInside: !0, children: /* @__PURE__ */ p.jsx(Tc, { id: l.contentId, role: "tooltip", children: n || r }) })
            ]
          }
        )
      }
    );
  }
);
Nr.displayName = je;
var Dr = "TooltipArrow", $c = a.forwardRef(
  (e, o) => {
    const { __scopeTooltip: t, ...r } = e, n = kt(t);
    return Lc(
      Dr,
      t
    ).isInside ? null : /* @__PURE__ */ p.jsx(xt, { ...n, ...r, ref: o });
  }
);
$c.displayName = Dr;
function Hc(e, o) {
  const t = Math.abs(o.top - e.y), r = Math.abs(o.bottom - e.y), n = Math.abs(o.right - e.x), s = Math.abs(o.left - e.x);
  switch (Math.min(t, r, n, s)) {
    case s:
      return "left";
    case n:
      return "right";
    case t:
      return "top";
    case r:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function zc(e, o, t = 5) {
  const r = [];
  switch (o) {
    case "top":
      r.push(
        { x: e.x - t, y: e.y + t },
        { x: e.x + t, y: e.y + t }
      );
      break;
    case "bottom":
      r.push(
        { x: e.x - t, y: e.y - t },
        { x: e.x + t, y: e.y - t }
      );
      break;
    case "left":
      r.push(
        { x: e.x + t, y: e.y - t },
        { x: e.x + t, y: e.y + t }
      );
      break;
    case "right":
      r.push(
        { x: e.x - t, y: e.y - t },
        { x: e.x - t, y: e.y + t }
      );
      break;
  }
  return r;
}
function Vc(e) {
  const { top: o, right: t, bottom: r, left: n } = e;
  return [
    { x: n, y: o },
    { x: t, y: o },
    { x: t, y: r },
    { x: n, y: r }
  ];
}
function Bc(e, o) {
  const { x: t, y: r } = e;
  let n = !1;
  for (let s = 0, c = o.length - 1; s < o.length; c = s++) {
    const i = o[s], l = o[c], f = i.x, d = i.y, u = l.x, h = l.y;
    d > r != h > r && t < (u - f) * (r - d) / (h - d) + f && (n = !n);
  }
  return n;
}
function Uc(e) {
  const o = e.slice();
  return o.sort((t, r) => t.x < r.x ? -1 : t.x > r.x ? 1 : t.y < r.y ? -1 : t.y > r.y ? 1 : 0), Gc(o);
}
function Gc(e) {
  if (e.length <= 1) return e.slice();
  const o = [];
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    for (; o.length >= 2; ) {
      const s = o[o.length - 1], c = o[o.length - 2];
      if ((s.x - c.x) * (n.y - c.y) >= (s.y - c.y) * (n.x - c.x)) o.pop();
      else break;
    }
    o.push(n);
  }
  o.pop();
  const t = [];
  for (let r = e.length - 1; r >= 0; r--) {
    const n = e[r];
    for (; t.length >= 2; ) {
      const s = t[t.length - 1], c = t[t.length - 2];
      if ((s.x - c.x) * (n.y - c.y) >= (s.y - c.y) * (n.x - c.x)) t.pop();
      else break;
    }
    t.push(n);
  }
  return t.pop(), o.length === 1 && t.length === 1 && o[0].x === t[0].x && o[0].y === t[0].y ? o : o.concat(t);
}
var Qu = Tr, ed = _r, td = Ar, od = Ir, rd = Nr, Wc = a.createContext(void 0);
function et(e) {
  const o = a.useContext(Wc);
  return e || o || "ltr";
}
function Jt(e, [o, t]) {
  return Math.min(t, Math.max(o, e));
}
function Kc(e, o) {
  return a.useReducer((t, r) => o[t][r] ?? t, e);
}
var mo = "ScrollArea", [jr] = ae(mo), [qc, ue] = jr(mo), Lr = a.forwardRef(
  (e, o) => {
    const {
      __scopeScrollArea: t,
      type: r = "hover",
      dir: n,
      scrollHideDelay: s = 600,
      ...c
    } = e, [i, l] = a.useState(null), [f, d] = a.useState(null), [u, h] = a.useState(null), [v, g] = a.useState(null), [m, b] = a.useState(null), [y, x] = a.useState(0), [w, S] = a.useState(0), [P, A] = a.useState(!1), [N, D] = a.useState(!1), j = I(o, l), L = et(n);
    return /* @__PURE__ */ p.jsx(
      qc,
      {
        scope: t,
        type: r,
        dir: L,
        scrollHideDelay: s,
        scrollArea: i,
        viewport: f,
        onViewportChange: d,
        content: u,
        onContentChange: h,
        scrollbarX: v,
        onScrollbarXChange: g,
        scrollbarXEnabled: P,
        onScrollbarXEnabledChange: A,
        scrollbarY: m,
        onScrollbarYChange: b,
        scrollbarYEnabled: N,
        onScrollbarYEnabledChange: D,
        onCornerWidthChange: x,
        onCornerHeightChange: S,
        children: /* @__PURE__ */ p.jsx(
          M.div,
          {
            dir: L,
            ...c,
            ref: j,
            style: {
              position: "relative",
              // Pass corner sizes as CSS vars to reduce re-renders of context consumers
              "--radix-scroll-area-corner-width": y + "px",
              "--radix-scroll-area-corner-height": w + "px",
              ...e.style
            }
          }
        )
      }
    );
  }
);
Lr.displayName = mo;
var Fr = "ScrollAreaViewport", $r = a.forwardRef(
  (e, o) => {
    const { __scopeScrollArea: t, children: r, nonce: n, ...s } = e, c = ue(Fr, t), i = a.useRef(null), l = I(o, i, c.onViewportChange);
    return /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
      /* @__PURE__ */ p.jsx(Yc, { nonce: n }),
      /* @__PURE__ */ p.jsx(
        M.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...s,
          ref: l,
          style: {
            /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */
            overflowX: c.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: c.scrollbarYEnabled ? "scroll" : "hidden",
            ...e.style
          },
          children: /* @__PURE__ */ p.jsx("div", { ref: c.onContentChange, style: { minWidth: "100%", display: "table" }, children: r })
        }
      )
    ] });
  }
);
$r.displayName = Fr;
var Yc = a.memo(
  ({ nonce: e }) => /* @__PURE__ */ p.jsx(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"
      },
      nonce: e
    }
  ),
  (e, o) => e.nonce === o.nonce
), he = "ScrollAreaScrollbar", Xc = a.forwardRef(
  (e, o) => {
    const { forceMount: t, ...r } = e, n = ue(he, e.__scopeScrollArea), { onScrollbarXEnabledChange: s, onScrollbarYEnabledChange: c } = n, i = e.orientation === "horizontal";
    return a.useEffect(() => (i ? s(!0) : c(!0), () => {
      i ? s(!1) : c(!1);
    }), [i, s, c]), n.type === "hover" ? /* @__PURE__ */ p.jsx(Zc, { ...r, ref: o, forceMount: t }) : n.type === "scroll" ? /* @__PURE__ */ p.jsx(Jc, { ...r, ref: o, forceMount: t }) : n.type === "auto" ? /* @__PURE__ */ p.jsx(Hr, { ...r, ref: o, forceMount: t }) : n.type === "always" ? /* @__PURE__ */ p.jsx(vo, { ...r, ref: o, "data-state": "visible" }) : null;
  }
);
Xc.displayName = he;
var Zc = a.forwardRef((e, o) => {
  const { forceMount: t, ...r } = e, n = ue(he, e.__scopeScrollArea), [s, c] = a.useState(!1);
  return a.useEffect(() => {
    const i = n.scrollArea;
    let l = 0;
    if (i) {
      const f = () => {
        window.clearTimeout(l), c(!0);
      }, d = () => {
        l = window.setTimeout(() => c(!1), n.scrollHideDelay);
      };
      return i.addEventListener("pointerenter", f), i.addEventListener("pointerleave", d), () => {
        window.clearTimeout(l), i.removeEventListener("pointerenter", f), i.removeEventListener("pointerleave", d);
      };
    }
  }, [n.scrollArea, n.scrollHideDelay]), /* @__PURE__ */ p.jsx(J, { present: t || s, children: /* @__PURE__ */ p.jsx(
    Hr,
    {
      "data-state": s ? "visible" : "hidden",
      ...r,
      ref: o
    }
  ) });
}), Jc = a.forwardRef((e, o) => {
  const { forceMount: t, ...r } = e, n = ue(he, e.__scopeScrollArea), s = e.orientation === "horizontal", c = Et(() => l("SCROLL_END"), 100), [i, l] = Kc("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  return a.useEffect(() => {
    if (i === "idle") {
      const f = window.setTimeout(() => l("HIDE"), n.scrollHideDelay);
      return () => window.clearTimeout(f);
    }
  }, [i, n.scrollHideDelay, l]), a.useEffect(() => {
    const f = n.viewport, d = s ? "scrollLeft" : "scrollTop";
    if (f) {
      let u = f[d];
      const h = () => {
        const v = f[d];
        u !== v && (l("SCROLL"), c()), u = v;
      };
      return f.addEventListener("scroll", h), () => f.removeEventListener("scroll", h);
    }
  }, [n.viewport, s, l, c]), /* @__PURE__ */ p.jsx(J, { present: t || i !== "hidden", children: /* @__PURE__ */ p.jsx(
    vo,
    {
      "data-state": i === "hidden" ? "hidden" : "visible",
      ...r,
      ref: o,
      onPointerEnter: k(e.onPointerEnter, () => l("POINTER_ENTER")),
      onPointerLeave: k(e.onPointerLeave, () => l("POINTER_LEAVE"))
    }
  ) });
}), Hr = a.forwardRef((e, o) => {
  const t = ue(he, e.__scopeScrollArea), { forceMount: r, ...n } = e, [s, c] = a.useState(!1), i = e.orientation === "horizontal", l = Et(() => {
    if (t.viewport) {
      const f = t.viewport.offsetWidth < t.viewport.scrollWidth, d = t.viewport.offsetHeight < t.viewport.scrollHeight;
      c(i ? f : d);
    }
  }, 10);
  return Le(t.viewport, l), Le(t.content, l), /* @__PURE__ */ p.jsx(J, { present: r || s, children: /* @__PURE__ */ p.jsx(
    vo,
    {
      "data-state": s ? "visible" : "hidden",
      ...n,
      ref: o
    }
  ) });
}), vo = a.forwardRef((e, o) => {
  const { orientation: t = "vertical", ...r } = e, n = ue(he, e.__scopeScrollArea), s = a.useRef(null), c = a.useRef(0), [i, l] = a.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  }), f = Ur(i.viewport, i.content), d = {
    ...r,
    sizes: i,
    onSizesChange: l,
    hasThumb: f > 0 && f < 1,
    onThumbChange: (h) => s.current = h,
    onThumbPointerUp: () => c.current = 0,
    onThumbPointerDown: (h) => c.current = h
  };
  function u(h, v) {
    return si(h, c.current, i, v);
  }
  return t === "horizontal" ? /* @__PURE__ */ p.jsx(
    Qc,
    {
      ...d,
      ref: o,
      onThumbPositionChange: () => {
        if (n.viewport && s.current) {
          const h = n.viewport.scrollLeft, v = Ko(h, i, n.dir);
          s.current.style.transform = `translate3d(${v}px, 0, 0)`;
        }
      },
      onWheelScroll: (h) => {
        n.viewport && (n.viewport.scrollLeft = h);
      },
      onDragScroll: (h) => {
        n.viewport && (n.viewport.scrollLeft = u(h, n.dir));
      }
    }
  ) : t === "vertical" ? /* @__PURE__ */ p.jsx(
    ei,
    {
      ...d,
      ref: o,
      onThumbPositionChange: () => {
        if (n.viewport && s.current) {
          const h = n.viewport.scrollTop, v = Ko(h, i);
          s.current.style.transform = `translate3d(0, ${v}px, 0)`;
        }
      },
      onWheelScroll: (h) => {
        n.viewport && (n.viewport.scrollTop = h);
      },
      onDragScroll: (h) => {
        n.viewport && (n.viewport.scrollTop = u(h));
      }
    }
  ) : null;
}), Qc = a.forwardRef((e, o) => {
  const { sizes: t, onSizesChange: r, ...n } = e, s = ue(he, e.__scopeScrollArea), [c, i] = a.useState(), l = a.useRef(null), f = I(o, l, s.onScrollbarXChange);
  return a.useEffect(() => {
    l.current && i(getComputedStyle(l.current));
  }, [l]), /* @__PURE__ */ p.jsx(
    Vr,
    {
      "data-orientation": "horizontal",
      ...n,
      ref: f,
      sizes: t,
      style: {
        bottom: 0,
        left: s.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: s.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        "--radix-scroll-area-thumb-width": Pt(t) + "px",
        ...e.style
      },
      onThumbPointerDown: (d) => e.onThumbPointerDown(d.x),
      onDragScroll: (d) => e.onDragScroll(d.x),
      onWheelScroll: (d, u) => {
        if (s.viewport) {
          const h = s.viewport.scrollLeft + d.deltaX;
          e.onWheelScroll(h), Wr(h, u) && d.preventDefault();
        }
      },
      onResize: () => {
        l.current && s.viewport && c && r({
          content: s.viewport.scrollWidth,
          viewport: s.viewport.offsetWidth,
          scrollbar: {
            size: l.current.clientWidth,
            paddingStart: lt(c.paddingLeft),
            paddingEnd: lt(c.paddingRight)
          }
        });
      }
    }
  );
}), ei = a.forwardRef((e, o) => {
  const { sizes: t, onSizesChange: r, ...n } = e, s = ue(he, e.__scopeScrollArea), [c, i] = a.useState(), l = a.useRef(null), f = I(o, l, s.onScrollbarYChange);
  return a.useEffect(() => {
    l.current && i(getComputedStyle(l.current));
  }, [l]), /* @__PURE__ */ p.jsx(
    Vr,
    {
      "data-orientation": "vertical",
      ...n,
      ref: f,
      sizes: t,
      style: {
        top: 0,
        right: s.dir === "ltr" ? 0 : void 0,
        left: s.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        "--radix-scroll-area-thumb-height": Pt(t) + "px",
        ...e.style
      },
      onThumbPointerDown: (d) => e.onThumbPointerDown(d.y),
      onDragScroll: (d) => e.onDragScroll(d.y),
      onWheelScroll: (d, u) => {
        if (s.viewport) {
          const h = s.viewport.scrollTop + d.deltaY;
          e.onWheelScroll(h), Wr(h, u) && d.preventDefault();
        }
      },
      onResize: () => {
        l.current && s.viewport && c && r({
          content: s.viewport.scrollHeight,
          viewport: s.viewport.offsetHeight,
          scrollbar: {
            size: l.current.clientHeight,
            paddingStart: lt(c.paddingTop),
            paddingEnd: lt(c.paddingBottom)
          }
        });
      }
    }
  );
}), [ti, zr] = jr(he), Vr = a.forwardRef((e, o) => {
  const {
    __scopeScrollArea: t,
    sizes: r,
    hasThumb: n,
    onThumbChange: s,
    onThumbPointerUp: c,
    onThumbPointerDown: i,
    onThumbPositionChange: l,
    onDragScroll: f,
    onWheelScroll: d,
    onResize: u,
    ...h
  } = e, v = ue(he, t), [g, m] = a.useState(null), b = I(o, m), y = a.useRef(null), x = a.useRef(""), w = v.viewport, S = r.content - r.viewport, P = X(d), A = X(l), N = Et(u, 10);
  function D(j) {
    if (y.current) {
      const L = j.clientX - y.current.left, T = j.clientY - y.current.top;
      f({ x: L, y: T });
    }
  }
  return a.useEffect(() => {
    const j = (L) => {
      const T = L.target;
      g?.contains(T) && P(L, S);
    };
    return document.addEventListener("wheel", j, { passive: !1 }), () => document.removeEventListener("wheel", j, { passive: !1 });
  }, [w, g, S, P]), a.useEffect(A, [r, A]), Le(g, N), Le(v.content, N), /* @__PURE__ */ p.jsx(
    ti,
    {
      scope: t,
      scrollbar: g,
      hasThumb: n,
      onThumbChange: X(s),
      onThumbPointerUp: X(c),
      onThumbPositionChange: A,
      onThumbPointerDown: X(i),
      children: /* @__PURE__ */ p.jsx(
        M.div,
        {
          ...h,
          ref: b,
          style: { position: "absolute", ...h.style },
          onPointerDown: k(e.onPointerDown, (j) => {
            j.button === 0 && (j.target.setPointerCapture(j.pointerId), y.current = g.getBoundingClientRect(), x.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", v.viewport && (v.viewport.style.scrollBehavior = "auto"), D(j));
          }),
          onPointerMove: k(e.onPointerMove, D),
          onPointerUp: k(e.onPointerUp, (j) => {
            const L = j.target;
            L.hasPointerCapture(j.pointerId) && L.releasePointerCapture(j.pointerId), document.body.style.webkitUserSelect = x.current, v.viewport && (v.viewport.style.scrollBehavior = ""), y.current = null;
          })
        }
      )
    }
  );
}), it = "ScrollAreaThumb", oi = a.forwardRef(
  (e, o) => {
    const { forceMount: t, ...r } = e, n = zr(it, e.__scopeScrollArea);
    return /* @__PURE__ */ p.jsx(J, { present: t || n.hasThumb, children: /* @__PURE__ */ p.jsx(ri, { ref: o, ...r }) });
  }
), ri = a.forwardRef(
  (e, o) => {
    const { __scopeScrollArea: t, style: r, ...n } = e, s = ue(it, t), c = zr(it, t), { onThumbPositionChange: i } = c, l = I(o, c.onThumbChange), f = a.useRef(void 0), d = Et(() => {
      f.current && (f.current(), f.current = void 0);
    }, 100);
    return a.useEffect(() => {
      const u = s.viewport;
      if (u) {
        const h = () => {
          if (d(), !f.current) {
            const v = ai(u, i);
            f.current = v, i();
          }
        };
        return i(), u.addEventListener("scroll", h), () => u.removeEventListener("scroll", h);
      }
    }, [s.viewport, d, i]), /* @__PURE__ */ p.jsx(
      M.div,
      {
        "data-state": c.hasThumb ? "visible" : "hidden",
        ...n,
        ref: l,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...r
        },
        onPointerDownCapture: k(e.onPointerDownCapture, (u) => {
          const v = u.target.getBoundingClientRect(), g = u.clientX - v.left, m = u.clientY - v.top;
          c.onThumbPointerDown({ x: g, y: m });
        }),
        onPointerUp: k(e.onPointerUp, c.onThumbPointerUp)
      }
    );
  }
);
oi.displayName = it;
var go = "ScrollAreaCorner", Br = a.forwardRef(
  (e, o) => {
    const t = ue(go, e.__scopeScrollArea), r = !!(t.scrollbarX && t.scrollbarY);
    return t.type !== "scroll" && r ? /* @__PURE__ */ p.jsx(ni, { ...e, ref: o }) : null;
  }
);
Br.displayName = go;
var ni = a.forwardRef((e, o) => {
  const { __scopeScrollArea: t, ...r } = e, n = ue(go, t), [s, c] = a.useState(0), [i, l] = a.useState(0), f = !!(s && i), { onCornerWidthChange: d, onCornerHeightChange: u } = n;
  return Le(n.scrollbarX, () => {
    const h = n.scrollbarX?.offsetHeight || 0;
    n.onCornerHeightChange(h), l(h);
  }), Le(n.scrollbarY, () => {
    const h = n.scrollbarY?.offsetWidth || 0;
    n.onCornerWidthChange(h), c(h);
  }), a.useEffect(() => () => {
    d(0), u(0);
  }, [d, u]), f ? /* @__PURE__ */ p.jsx(
    M.div,
    {
      ...r,
      ref: o,
      style: {
        width: s,
        height: i,
        position: "absolute",
        right: n.dir === "ltr" ? 0 : void 0,
        left: n.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...e.style
      }
    }
  ) : null;
});
function lt(e) {
  return e ? parseInt(e, 10) : 0;
}
function Ur(e, o) {
  const t = e / o;
  return isNaN(t) ? 0 : t;
}
function Pt(e) {
  const o = Ur(e.viewport, e.content), t = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, r = (e.scrollbar.size - t) * o;
  return Math.max(r, 18);
}
function si(e, o, t, r = "ltr") {
  const n = Pt(t), s = n / 2, c = o || s, i = n - c, l = t.scrollbar.paddingStart + c, f = t.scrollbar.size - t.scrollbar.paddingEnd - i, d = t.content - t.viewport, u = r === "ltr" ? [0, d] : [d * -1, 0];
  return Gr([l, f], u)(e);
}
function Ko(e, o, t = "ltr") {
  const r = Pt(o), n = o.scrollbar.paddingStart + o.scrollbar.paddingEnd, s = o.scrollbar.size - n, c = o.content - o.viewport, i = s - r, l = t === "ltr" ? [0, c] : [c * -1, 0], f = Jt(e, l);
  return Gr([0, c], [0, i])(f);
}
function Gr(e, o) {
  return (t) => {
    if (e[0] === e[1] || o[0] === o[1]) return o[0];
    const r = (o[1] - o[0]) / (e[1] - e[0]);
    return o[0] + r * (t - e[0]);
  };
}
function Wr(e, o) {
  return e > 0 && e < o;
}
var ai = (e, o = () => {
}) => {
  let t = { left: e.scrollLeft, top: e.scrollTop }, r = 0;
  return function n() {
    const s = { left: e.scrollLeft, top: e.scrollTop }, c = t.left !== s.left, i = t.top !== s.top;
    (c || i) && o(), t = s, r = window.requestAnimationFrame(n);
  }(), () => window.cancelAnimationFrame(r);
};
function Et(e, o) {
  const t = X(e), r = a.useRef(0);
  return a.useEffect(() => () => window.clearTimeout(r.current), []), a.useCallback(() => {
    window.clearTimeout(r.current), r.current = window.setTimeout(t, o);
  }, [t, o]);
}
function Le(e, o) {
  const t = X(o);
  Z(() => {
    let r = 0;
    if (e) {
      const n = new ResizeObserver(() => {
        cancelAnimationFrame(r), r = window.requestAnimationFrame(t);
      });
      return n.observe(e), () => {
        window.cancelAnimationFrame(r), n.unobserve(e);
      };
    }
  }, [e, t]);
}
var nd = Lr, sd = $r, ad = Br;
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ci = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Kr = (...e) => e.filter((o, t, r) => !!o && r.indexOf(o) === t).join(" ");
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var ii = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const li = a.forwardRef(
  ({
    color: e = "currentColor",
    size: o = 24,
    strokeWidth: t = 2,
    absoluteStrokeWidth: r,
    className: n = "",
    children: s,
    iconNode: c,
    ...i
  }, l) => a.createElement(
    "svg",
    {
      ref: l,
      ...ii,
      width: o,
      height: o,
      stroke: e,
      strokeWidth: r ? Number(t) * 24 / Number(o) : t,
      className: Kr("lucide", n),
      ...i
    },
    [
      ...c.map(([f, d]) => a.createElement(f, d)),
      ...Array.isArray(s) ? s : [s]
    ]
  )
);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C = (e, o) => {
  const t = a.forwardRef(
    ({ className: r, ...n }, s) => a.createElement(li, {
      ref: s,
      iconNode: o,
      className: Kr(`lucide-${ci(e)}`, r),
      ...n
    })
  );
  return t.displayName = `${e}`, t;
};
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cd = C("Activity", [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const id = C("AreaChart", [
  ["path", { d: "M3 3v18h18", key: "1s2lah" }],
  ["path", { d: "M7 12v5h12V8l-5 5-4-4Z", key: "zxz28u" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ld = C("ArrowBigRight", [
  ["path", { d: "M6 9h6V5l7 7-7 7v-4H6V9z", key: "7fvt9c" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ud = C("ArrowLeft", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dd = C("ArrowRight", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pd = C("BarChart3", [
  ["path", { d: "M3 3v18h18", key: "1s2lah" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fd = C("Bell", [
  ["path", { d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", key: "1qo2s2" }],
  ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0", key: "qgo35s" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hd = C("BoxSelect", [
  ["path", { d: "M5 3a2 2 0 0 0-2 2", key: "y57alp" }],
  ["path", { d: "M19 3a2 2 0 0 1 2 2", key: "18rm91" }],
  ["path", { d: "M21 19a2 2 0 0 1-2 2", key: "1j7049" }],
  ["path", { d: "M5 21a2 2 0 0 1-2-2", key: "sbafld" }],
  ["path", { d: "M9 3h1", key: "1yesri" }],
  ["path", { d: "M9 21h1", key: "15o7lz" }],
  ["path", { d: "M14 3h1", key: "1ec4yj" }],
  ["path", { d: "M14 21h1", key: "v9vybs" }],
  ["path", { d: "M3 9v1", key: "1r0deq" }],
  ["path", { d: "M21 9v1", key: "mxsmne" }],
  ["path", { d: "M3 14v1", key: "vnatye" }],
  ["path", { d: "M21 14v1", key: "169vum" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const md = C("Box", [
  [
    "path",
    {
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
      key: "hh9hay"
    }
  ],
  ["path", { d: "m3.3 7 8.7 5 8.7-5", key: "g66t2b" }],
  ["path", { d: "M12 22V12", key: "d0xqtd" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vd = C("CalendarDays", [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gd = C("Calendar", [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yd = C("CandlestickChart", [
  ["path", { d: "M9 5v4", key: "14uxtq" }],
  ["rect", { width: "4", height: "6", x: "7", y: "9", rx: "1", key: "f4fvz0" }],
  ["path", { d: "M9 15v2", key: "r5rk32" }],
  ["path", { d: "M17 3v2", key: "1l2re6" }],
  ["rect", { width: "4", height: "8", x: "15", y: "5", rx: "1", key: "z38je5" }],
  ["path", { d: "M17 13v3", key: "5l0wba" }],
  ["path", { d: "M3 3v18h18", key: "1s2lah" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bd = C("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xd = C("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wd = C("ChevronLeft", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cd = C("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sd = C("ChevronUp", [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kd = C("Circle", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pd = C("Clapperboard", [
  [
    "path",
    { d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z", key: "1tn4o7" }
  ],
  ["path", { d: "m6.2 5.3 3.1 3.9", key: "iuk76l" }],
  ["path", { d: "m12.4 3.4 3.1 4", key: "6hsd6n" }],
  ["path", { d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z", key: "ltgou9" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ed = C("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rd = C("Cloud", [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Md = C("CodeXml", [
  ["path", { d: "m18 16 4-4-4-4", key: "1inbqp" }],
  ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }],
  ["path", { d: "m14.5 4-5 16", key: "e7oirm" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Td = C("Crosshair", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "22", x2: "18", y1: "12", y2: "12", key: "l9bcsi" }],
  ["line", { x1: "6", x2: "2", y1: "12", y2: "12", key: "13hhkx" }],
  ["line", { x1: "12", x2: "12", y1: "6", y2: "2", key: "10w3f3" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "18", key: "15g9kq" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _d = C("Diamond", [
  [
    "path",
    {
      d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z",
      key: "1f1r0c"
    }
  ]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ad = C("DollarSign", [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Id = C("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nd = C("Ellipsis", [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Od = C("ExternalLink", [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dd = C("EyeOff", [
  ["path", { d: "M9.88 9.88a3 3 0 1 0 4.24 4.24", key: "1jxqfv" }],
  [
    "path",
    {
      d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",
      key: "9wicm4"
    }
  ],
  [
    "path",
    { d: "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61", key: "1jreej" }
  ],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jd = C("Eye", [
  ["path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z", key: "rwhkz3" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ld = C("Film", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M7 3v18", key: "bbkbws" }],
  ["path", { d: "M3 7.5h4", key: "zfgn84" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["path", { d: "M3 16.5h4", key: "1230mu" }],
  ["path", { d: "M17 3v18", key: "in4fa5" }],
  ["path", { d: "M17 7.5h4", key: "myr1c1" }],
  ["path", { d: "M17 16.5h4", key: "go4c1d" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fd = C("Flag", [
  ["path", { d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z", key: "i9b6wo" }],
  ["line", { x1: "4", x2: "4", y1: "22", y2: "15", key: "1cm3nv" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $d = C("FlaskConical", [
  [
    "path",
    {
      d: "M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2",
      key: "pzvekw"
    }
  ],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }],
  ["path", { d: "M7 16h10", key: "wp8him" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hd = C("Focus", [
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zd = C("FolderOpen", [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vd = C("FolderPlus", [
  ["path", { d: "M12 10v6", key: "1bos4e" }],
  ["path", { d: "M9 13h6", key: "1uhe8q" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bd = C("Gauge", [
  ["path", { d: "m12 14 4-4", key: "9kzdfg" }],
  ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0", key: "19p75a" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ud = C("Grid2x2", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["path", { d: "M12 3v18", key: "108xh3" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gd = C("Grid3x3", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M3 15h18", key: "5xshup" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wd = C("GripVertical", [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kd = C("Heart", [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qd = C("Hexagon", [
  [
    "path",
    {
      d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
      key: "yt0hxn"
    }
  ]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yd = C("Highlighter", [
  ["path", { d: "m9 11-6 6v3h9l3-3", key: "1a3l36" }],
  ["path", { d: "m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4", key: "14a9rk" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xd = C("History", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zd = C("House", [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jd = C("Info", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qd = C("Keyboard", [
  ["path", { d: "M10 8h.01", key: "1r9ogq" }],
  ["path", { d: "M12 12h.01", key: "1mp3jc" }],
  ["path", { d: "M14 8h.01", key: "1primd" }],
  ["path", { d: "M16 12h.01", key: "1l6xoz" }],
  ["path", { d: "M18 8h.01", key: "emo2bl" }],
  ["path", { d: "M6 8h.01", key: "x9i8wu" }],
  ["path", { d: "M7 16h10", key: "wp8him" }],
  ["path", { d: "M8 12h.01", key: "czm47f" }],
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ep = C("Layers", [
  [
    "path",
    {
      d: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",
      key: "8b97xw"
    }
  ],
  ["path", { d: "m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65", key: "dd6zsq" }],
  ["path", { d: "m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65", key: "ep9fru" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tp = C("LineChart", [
  ["path", { d: "M3 3v18h18", key: "1s2lah" }],
  ["path", { d: "m19 9-5 5-4-4-3 3", key: "2osh9i" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const op = C("LoaderCircle", [
  ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rp = C("LockOpen", [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const np = C("Lock", [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sp = C("LogIn", [
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }],
  ["polyline", { points: "10 17 15 12 10 7", key: "1ail0h" }],
  ["line", { x1: "15", x2: "3", y1: "12", y2: "12", key: "v6grx8" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ap = C("LogOut", [
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
  ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cp = C("Maximize", [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3", key: "1dcmit" }],
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3", key: "1e4gt3" }],
  ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3", key: "wsl5sc" }],
  ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3", key: "18trek" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ip = C("Minimize", [
  ["path", { d: "M8 3v3a2 2 0 0 1-2 2H3", key: "hohbtr" }],
  ["path", { d: "M21 8h-3a2 2 0 0 1-2-2V3", key: "5jw1f3" }],
  ["path", { d: "M3 16h3a2 2 0 0 1 2 2v3", key: "198tvr" }],
  ["path", { d: "M16 21v-3a2 2 0 0 1 2-2h3", key: "ph8mxp" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lp = C("Minus", [["path", { d: "M5 12h14", key: "1ays0h" }]]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const up = C("Moon", [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dp = C("MousePointer2", [
  ["path", { d: "m4 4 7.07 17 2.51-7.39L21 11.07z", key: "1vqm48" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pp = C("MoveVertical", [
  ["polyline", { points: "8 18 12 22 16 18", key: "1uutw3" }],
  ["polyline", { points: "8 6 12 2 16 6", key: "d60sxy" }],
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fp = C("Move", [
  ["polyline", { points: "5 9 2 12 5 15", key: "1r5uj5" }],
  ["polyline", { points: "9 5 12 2 15 5", key: "5v383o" }],
  ["polyline", { points: "15 19 12 22 9 19", key: "g7qi8m" }],
  ["polyline", { points: "19 9 22 12 19 15", key: "tpp73q" }],
  ["line", { x1: "2", x2: "22", y1: "12", y2: "12", key: "1dnqot" }],
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hp = C("Newspaper", [
  [
    "path",
    {
      d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2",
      key: "7pis2x"
    }
  ],
  ["path", { d: "M18 14h-8", key: "sponae" }],
  ["path", { d: "M15 18h-5", key: "95g1m2" }],
  ["path", { d: "M10 6h8v4h-8V6Z", key: "smlsk5" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mp = C("Octagon", [
  [
    "polygon",
    {
      points: "7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2",
      key: "h1p8hx"
    }
  ]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vp = C("Paintbrush", [
  ["path", { d: "m14.622 17.897-10.68-2.913", key: "vj2p1u" }],
  [
    "path",
    {
      d: "M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z",
      key: "18tc5c"
    }
  ],
  [
    "path",
    {
      d: "M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15",
      key: "ytzfxy"
    }
  ]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gp = C("Palette", [
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  [
    "path",
    {
      d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",
      key: "12rzf8"
    }
  ]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yp = C("PanelLeft", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bp = C("Pause", [
  ["rect", { x: "14", y: "4", width: "4", height: "16", rx: "1", key: "zuxfzm" }],
  ["rect", { x: "6", y: "4", width: "4", height: "16", rx: "1", key: "1okwgv" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xp = C("PenLine", [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wp = C("Pencil", [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cp = C("Pentagon", [
  [
    "path",
    {
      d: "M3.5 8.7c-.7.5-1 1.4-.7 2.2l2.8 8.7c.3.8 1 1.4 1.9 1.4h9.1c.9 0 1.6-.6 1.9-1.4l2.8-8.7c.3-.8 0-1.7-.7-2.2l-7.4-5.3a2.1 2.1 0 0 0-2.4 0Z",
      key: "hsj90r"
    }
  ]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sp = C("Play", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kp = C("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pp = C("RectangleHorizontal", [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ep = C("Rocket", [
  [
    "path",
    {
      d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
      key: "m3kijz"
    }
  ],
  [
    "path",
    {
      d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",
      key: "1fmvmk"
    }
  ],
  ["path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0", key: "1f8sc4" }],
  ["path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5", key: "qeys4" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rp = C("RotateCcw", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mp = C("Ruler", [
  [
    "path",
    {
      d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",
      key: "icamh8"
    }
  ],
  ["path", { d: "m14.5 12.5 2-2", key: "inckbg" }],
  ["path", { d: "m11.5 9.5 2-2", key: "fmmyf7" }],
  ["path", { d: "m8.5 6.5 2-2", key: "vc6u1g" }],
  ["path", { d: "m17.5 15.5 2-2", key: "wo5hmg" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tp = C("Save", [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _p = C("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ap = C("Settings2", [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ip = C("Settings", [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Np = C("Share2", [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Op = C("Shuffle", [
  ["path", { d: "M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22", key: "1wmou1" }],
  ["path", { d: "m18 2 4 4-4 4", key: "pucp1d" }],
  ["path", { d: "M2 6h1.9c1.5 0 2.9.9 3.6 2.2", key: "10bdb2" }],
  ["path", { d: "M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8", key: "vgxac0" }],
  ["path", { d: "m18 14 4 4-4 4", key: "10pe0f" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dp = C("SkipBack", [
  ["polygon", { points: "19 20 9 12 19 4 19 20", key: "o2sva" }],
  ["line", { x1: "5", x2: "5", y1: "19", y2: "5", key: "1ocqjk" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jp = C("SkipForward", [
  ["polygon", { points: "5 4 15 12 5 20 5 4", key: "16p6eg" }],
  ["line", { x1: "19", x2: "19", y1: "5", y2: "19", key: "futhcm" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lp = C("SlidersHorizontal", [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fp = C("Smartphone", [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $p = C("Square", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hp = C("Star", [
  [
    "polygon",
    {
      points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",
      key: "8f66p6"
    }
  ]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zp = C("Sun", [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vp = C("Target", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bp = C("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Up = C("TrendingDown", [
  ["polyline", { points: "22 17 13.5 8.5 8.5 13.5 2 7", key: "1r2t7k" }],
  ["polyline", { points: "16 17 22 17 22 11", key: "11uiuu" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gp = C("TrendingUp", [
  ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" }],
  ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wp = C("Triangle", [
  [
    "path",
    { d: "M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z", key: "14u9p9" }
  ]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kp = C("Type", [
  ["polyline", { points: "4 7 4 4 20 4 20 7", key: "1nosan" }],
  ["line", { x1: "9", x2: "15", y1: "20", y2: "20", key: "swin9y" }],
  ["line", { x1: "12", x2: "12", y1: "4", y2: "20", key: "1tx1rr" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qp = C("Waves", [
  [
    "path",
    {
      d: "M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
      key: "knzxuh"
    }
  ],
  [
    "path",
    {
      d: "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
      key: "2jd2cc"
    }
  ],
  [
    "path",
    {
      d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
      key: "rd2r6e"
    }
  ]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yp = C("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xp = C("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zp = C("ZoomIn", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "11", x2: "11", y1: "8", y2: "14", key: "1vmskp" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jp = C("ZoomOut", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
]);
var ui = "Label", qr = a.forwardRef((e, o) => /* @__PURE__ */ p.jsx(
  M.label,
  {
    ...e,
    ref: o,
    onMouseDown: (t) => {
      t.target.closest("button, input, select, textarea") || (e.onMouseDown?.(t), !t.defaultPrevented && t.detail > 1 && t.preventDefault());
    }
  }
));
qr.displayName = ui;
var Qp = qr, Rt = "Dialog", [Yr] = ae(Rt), [di, pe] = Yr(Rt), pi = (e) => {
  const {
    __scopeDialog: o,
    children: t,
    open: r,
    defaultOpen: n,
    onOpenChange: s,
    modal: c = !0
  } = e, i = a.useRef(null), l = a.useRef(null), [f, d] = fe({
    prop: r,
    defaultProp: n ?? !1,
    onChange: s,
    caller: Rt
  });
  return /* @__PURE__ */ p.jsx(
    di,
    {
      scope: o,
      triggerRef: i,
      contentRef: l,
      contentId: ie(),
      titleId: ie(),
      descriptionId: ie(),
      open: f,
      onOpenChange: d,
      onOpenToggle: a.useCallback(() => d((u) => !u), [d]),
      modal: c,
      children: t
    }
  );
};
pi.displayName = Rt;
var Xr = "DialogTrigger", fi = a.forwardRef(
  (e, o) => {
    const { __scopeDialog: t, ...r } = e, n = pe(Xr, t), s = I(o, n.triggerRef);
    return /* @__PURE__ */ p.jsx(
      M.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": n.open,
        "aria-controls": n.open ? n.contentId : void 0,
        "data-state": bo(n.open),
        ...r,
        ref: s,
        onClick: k(e.onClick, n.onOpenToggle)
      }
    );
  }
);
fi.displayName = Xr;
var yo = "DialogPortal", [hi, Zr] = Yr(yo, {
  forceMount: void 0
}), mi = (e) => {
  const { __scopeDialog: o, forceMount: t, children: r, container: n } = e, s = pe(yo, o);
  return /* @__PURE__ */ p.jsx(hi, { scope: o, forceMount: t, children: a.Children.map(r, (c) => /* @__PURE__ */ p.jsx(J, { present: t || s.open, children: /* @__PURE__ */ p.jsx(ze, { asChild: !0, container: n, children: c }) })) });
};
mi.displayName = yo;
var ut = "DialogOverlay", vi = a.forwardRef(
  (e, o) => {
    const t = Zr(ut, e.__scopeDialog), { forceMount: r = t.forceMount, ...n } = e, s = pe(ut, e.__scopeDialog);
    return s.modal ? /* @__PURE__ */ p.jsx(J, { present: r || s.open, children: /* @__PURE__ */ p.jsx(yi, { ...n, ref: o }) }) : null;
  }
);
vi.displayName = ut;
var gi = /* @__PURE__ */ Ce("DialogOverlay.RemoveScroll"), yi = a.forwardRef(
  (e, o) => {
    const { __scopeDialog: t, ...r } = e, n = pe(ut, t), s = Ha(), c = I(o, s);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ p.jsx(vt, { as: gi, allowPinchZoom: !0, shards: [n.contentRef], children: /* @__PURE__ */ p.jsx(
        M.div,
        {
          "data-state": bo(n.open),
          ...r,
          ref: c,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }
), Fe = "DialogContent", bi = a.forwardRef(
  (e, o) => {
    const t = Zr(Fe, e.__scopeDialog), { forceMount: r = t.forceMount, ...n } = e, s = pe(Fe, e.__scopeDialog);
    return /* @__PURE__ */ p.jsx(J, { present: r || s.open, children: s.modal ? /* @__PURE__ */ p.jsx(xi, { ...n, ref: o }) : /* @__PURE__ */ p.jsx(wi, { ...n, ref: o }) });
  }
);
bi.displayName = Fe;
var xi = a.forwardRef(
  (e, o) => {
    const t = pe(Fe, e.__scopeDialog), r = a.useRef(null), n = I(o, t.contentRef, r);
    return a.useEffect(() => {
      const s = r.current;
      if (s) return wt(s);
    }, []), /* @__PURE__ */ p.jsx(
      Jr,
      {
        ...e,
        ref: n,
        trapFocus: t.open,
        disableOutsidePointerEvents: t.open,
        onCloseAutoFocus: k(e.onCloseAutoFocus, (s) => {
          s.preventDefault(), t.triggerRef.current?.focus();
        }),
        onPointerDownOutside: k(e.onPointerDownOutside, (s) => {
          const c = s.detail.originalEvent, i = c.button === 0 && c.ctrlKey === !0;
          (c.button === 2 || i) && s.preventDefault();
        }),
        onFocusOutside: k(
          e.onFocusOutside,
          (s) => s.preventDefault()
        )
      }
    );
  }
), wi = a.forwardRef(
  (e, o) => {
    const t = pe(Fe, e.__scopeDialog), r = a.useRef(!1), n = a.useRef(!1);
    return /* @__PURE__ */ p.jsx(
      Jr,
      {
        ...e,
        ref: o,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (s) => {
          e.onCloseAutoFocus?.(s), s.defaultPrevented || (r.current || t.triggerRef.current?.focus(), s.preventDefault()), r.current = !1, n.current = !1;
        },
        onInteractOutside: (s) => {
          e.onInteractOutside?.(s), s.defaultPrevented || (r.current = !0, s.detail.originalEvent.type === "pointerdown" && (n.current = !0));
          const c = s.target;
          t.triggerRef.current?.contains(c) && s.preventDefault(), s.detail.originalEvent.type === "focusin" && n.current && s.preventDefault();
        }
      }
    );
  }
), Jr = a.forwardRef(
  (e, o) => {
    const { __scopeDialog: t, trapFocus: r, onOpenAutoFocus: n, onCloseAutoFocus: s, ...c } = e, i = pe(Fe, t);
    return gt(), /* @__PURE__ */ p.jsx(p.Fragment, { children: /* @__PURE__ */ p.jsx(
      Xe,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: n,
        onUnmountAutoFocus: s,
        children: /* @__PURE__ */ p.jsx(
          He,
          {
            role: "dialog",
            id: i.contentId,
            "aria-describedby": i.descriptionId,
            "aria-labelledby": i.titleId,
            "data-state": bo(i.open),
            ...c,
            ref: o,
            deferPointerDownOutside: !0,
            onDismiss: () => i.onOpenChange(!1)
          }
        )
      }
    ) });
  }
), Qr = "DialogTitle", Ci = a.forwardRef(
  (e, o) => {
    const { __scopeDialog: t, ...r } = e, n = pe(Qr, t);
    return /* @__PURE__ */ p.jsx(M.h2, { id: n.titleId, ...r, ref: o });
  }
);
Ci.displayName = Qr;
var en = "DialogDescription", Si = a.forwardRef(
  (e, o) => {
    const { __scopeDialog: t, ...r } = e, n = pe(en, t);
    return /* @__PURE__ */ p.jsx(M.p, { id: n.descriptionId, ...r, ref: o });
  }
);
Si.displayName = en;
var tn = "DialogClose", ki = a.forwardRef(
  (e, o) => {
    const { __scopeDialog: t, ...r } = e, n = pe(tn, t);
    return /* @__PURE__ */ p.jsx(
      M.button,
      {
        type: "button",
        ...r,
        ref: o,
        onClick: k(e.onClick, () => n.onOpenChange(!1))
      }
    );
  }
);
ki.displayName = tn;
function bo(e) {
  return e ? "open" : "closed";
}
function xo(e) {
  const o = a.useRef({ value: e, previous: e });
  return a.useMemo(() => (o.current.value !== e && (o.current.previous = o.current.value, o.current.value = e), o.current.previous), [e]);
}
var Mt = "Checkbox", [Pi] = ae(Mt), [Ei, wo] = Pi(Mt);
function Ri(e) {
  const {
    __scopeCheckbox: o,
    checked: t,
    children: r,
    defaultChecked: n,
    disabled: s,
    form: c,
    name: i,
    onCheckedChange: l,
    required: f,
    value: d = "on",
    // @ts-expect-error
    internal_do_not_use_render: u
  } = e, [h, v] = fe({
    prop: t,
    defaultProp: n ?? !1,
    onChange: l,
    caller: Mt
  }), [g, m] = a.useState(null), [b, y] = a.useState(null), x = a.useRef(!1), w = g ? !!c || !!g.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), S = {
    checked: h,
    disabled: s,
    setChecked: v,
    control: g,
    setControl: m,
    name: i,
    form: c,
    value: d,
    hasConsumerStoppedPropagationRef: x,
    required: f,
    defaultChecked: we(n) ? !1 : n,
    isFormControl: w,
    bubbleInput: b,
    setBubbleInput: y
  };
  return /* @__PURE__ */ p.jsx(
    Ei,
    {
      scope: o,
      ...S,
      children: _i(u) ? u(S) : r
    }
  );
}
var on = "CheckboxTrigger", rn = a.forwardRef(
  ({ __scopeCheckbox: e, onKeyDown: o, onClick: t, ...r }, n) => {
    const {
      control: s,
      value: c,
      disabled: i,
      checked: l,
      required: f,
      setControl: d,
      setChecked: u,
      hasConsumerStoppedPropagationRef: h,
      isFormControl: v,
      bubbleInput: g
    } = wo(on, e), m = I(n, d), b = a.useRef(l);
    return a.useEffect(() => {
      const y = s?.form;
      if (y) {
        const x = () => u(b.current);
        return y.addEventListener("reset", x), () => y.removeEventListener("reset", x);
      }
    }, [s, u]), /* @__PURE__ */ p.jsx(
      M.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": we(l) ? "mixed" : l,
        "aria-required": f,
        "data-state": cn(l),
        "data-disabled": i ? "" : void 0,
        disabled: i,
        value: c,
        ...r,
        ref: m,
        onKeyDown: k(o, (y) => {
          y.key === "Enter" && y.preventDefault();
        }),
        onClick: k(t, (y) => {
          u((x) => we(x) ? !0 : !x), g && v && (h.current = y.isPropagationStopped(), h.current || y.stopPropagation());
        })
      }
    );
  }
);
rn.displayName = on;
var Mi = a.forwardRef(
  (e, o) => {
    const {
      __scopeCheckbox: t,
      name: r,
      checked: n,
      defaultChecked: s,
      required: c,
      disabled: i,
      value: l,
      onCheckedChange: f,
      form: d,
      ...u
    } = e;
    return /* @__PURE__ */ p.jsx(
      Ri,
      {
        __scopeCheckbox: t,
        checked: n,
        defaultChecked: s,
        disabled: i,
        required: c,
        onCheckedChange: f,
        name: r,
        form: d,
        value: l,
        internal_do_not_use_render: ({ isFormControl: h }) => /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
          /* @__PURE__ */ p.jsx(
            rn,
            {
              ...u,
              ref: o,
              __scopeCheckbox: t
            }
          ),
          h && /* @__PURE__ */ p.jsx(
            an,
            {
              __scopeCheckbox: t
            }
          )
        ] })
      }
    );
  }
);
Mi.displayName = Mt;
var nn = "CheckboxIndicator", Ti = a.forwardRef(
  (e, o) => {
    const { __scopeCheckbox: t, forceMount: r, ...n } = e, s = wo(nn, t);
    return /* @__PURE__ */ p.jsx(
      J,
      {
        present: r || we(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ p.jsx(
          M.span,
          {
            "data-state": cn(s.checked),
            "data-disabled": s.disabled ? "" : void 0,
            ...n,
            ref: o,
            style: { pointerEvents: "none", ...e.style }
          }
        )
      }
    );
  }
);
Ti.displayName = nn;
var sn = "CheckboxBubbleInput", an = a.forwardRef(
  ({ __scopeCheckbox: e, ...o }, t) => {
    const {
      control: r,
      hasConsumerStoppedPropagationRef: n,
      checked: s,
      defaultChecked: c,
      required: i,
      disabled: l,
      name: f,
      value: d,
      form: u,
      bubbleInput: h,
      setBubbleInput: v
    } = wo(sn, e), g = I(t, v), m = xo(s), b = co(r);
    a.useEffect(() => {
      const x = h;
      if (!x) return;
      const w = window.HTMLInputElement.prototype, P = Object.getOwnPropertyDescriptor(
        w,
        "checked"
      ).set, A = !n.current;
      if (m !== s && P) {
        const N = new Event("click", { bubbles: A });
        x.indeterminate = we(s), P.call(x, we(s) ? !1 : s), x.dispatchEvent(N);
      }
    }, [h, m, s, n]);
    const y = a.useRef(we(s) ? !1 : s);
    return /* @__PURE__ */ p.jsx(
      M.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: c ?? y.current,
        required: i,
        disabled: l,
        name: f,
        value: d,
        form: u,
        ...o,
        tabIndex: -1,
        ref: g,
        style: {
          ...o.style,
          ...b,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
an.displayName = sn;
function _i(e) {
  return typeof e == "function";
}
function we(e) {
  return e === "indeterminate";
}
function cn(e) {
  return we(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function Co(e) {
  const o = e + "CollectionProvider", [t, r] = ae(o), [n, s] = t(
    o,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), c = (m) => {
    const { scope: b, children: y } = m, x = a.useRef(null), w = a.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ p.jsx(n, { scope: b, itemMap: w, collectionRef: x, children: y });
  };
  c.displayName = o;
  const i = e + "CollectionSlot", l = /* @__PURE__ */ Ce(i), f = a.forwardRef(
    (m, b) => {
      const { scope: y, children: x } = m, w = s(i, y), S = I(b, w.collectionRef);
      return /* @__PURE__ */ p.jsx(l, { ref: S, children: x });
    }
  );
  f.displayName = i;
  const d = e + "CollectionItemSlot", u = "data-radix-collection-item", h = /* @__PURE__ */ Ce(d), v = a.forwardRef(
    (m, b) => {
      const { scope: y, children: x, ...w } = m, S = a.useRef(null), P = I(b, S), A = s(d, y);
      return a.useEffect(() => (A.itemMap.set(S, { ref: S, ...w }), () => void A.itemMap.delete(S))), /* @__PURE__ */ p.jsx(h, { [u]: "", ref: P, children: x });
    }
  );
  v.displayName = d;
  function g(m) {
    const b = s(e + "CollectionConsumer", m);
    return a.useCallback(() => {
      const x = b.collectionRef.current;
      if (!x) return [];
      const w = Array.from(x.querySelectorAll(`[${u}]`));
      return Array.from(b.itemMap.values()).sort(
        (A, N) => w.indexOf(A.ref.current) - w.indexOf(N.ref.current)
      );
    }, [b.collectionRef, b.itemMap]);
  }
  return [
    { Provider: c, Slot: f, ItemSlot: v },
    g,
    r
  ];
}
var Ai = [" ", "Enter", "ArrowUp", "ArrowDown"], Ii = [" ", "Enter"], Me = "Select", [Tt, _t, Ni] = Co(Me), [Te] = ae(Me, [
  Ni,
  ke
]), At = ke(), [Oi, Ee] = Te(Me), [Di, ji] = Te(Me), Li = "SelectProvider";
function ln(e) {
  const {
    __scopeSelect: o,
    children: t,
    open: r,
    defaultOpen: n,
    onOpenChange: s,
    value: c,
    defaultValue: i,
    onValueChange: l,
    dir: f,
    name: d,
    autoComplete: u,
    disabled: h,
    required: v,
    form: g,
    // @ts-expect-error internal render prop used by `Select` to compose its default parts
    internal_do_not_use_render: m
  } = e, b = At(o), [y, x] = a.useState(null), [w, S] = a.useState(null), [P, A] = a.useState(!1), N = et(f), [D, j] = fe({
    prop: r,
    defaultProp: n ?? !1,
    onChange: s,
    caller: Me
  }), [L, T] = fe({
    prop: c,
    defaultProp: i,
    onChange: l,
    caller: Me
  }), _ = a.useRef(null), U = a.useRef(L);
  a.useEffect(() => {
    const K = g ? y?.ownerDocument.getElementById(g) : y?.form;
    if (K instanceof HTMLFormElement) {
      const te = () => T(U.current);
      return K.addEventListener("reset", te), () => K.removeEventListener("reset", te);
    }
  }, [g, y, T]);
  const W = y ? !!g || !!y.closest("form") : !0, [q, F] = a.useState(/* @__PURE__ */ new Set()), Q = ie(), H = Array.from(q).map((K) => K.props.value).join(";"), E = a.useCallback((K) => {
    F((te) => new Set(te).add(K));
  }, []), ee = a.useCallback((K) => {
    F((te) => {
      const re = new Set(te);
      return re.delete(K), re;
    });
  }, []), $ = {
    required: v,
    trigger: y,
    onTriggerChange: x,
    valueNode: w,
    onValueNodeChange: S,
    valueNodeHasChildren: P,
    onValueNodeHasChildrenChange: A,
    contentId: Q,
    value: L,
    onValueChange: T,
    open: D,
    onOpenChange: j,
    dir: N,
    triggerPointerDownPosRef: _,
    disabled: h,
    name: d,
    autoComplete: u,
    form: g,
    nativeOptions: q,
    nativeSelectKey: H,
    isFormControl: W
  };
  return /* @__PURE__ */ p.jsx(yt, { ...b, children: /* @__PURE__ */ p.jsx(Oi, { scope: o, ...$, children: /* @__PURE__ */ p.jsx(Tt.Provider, { scope: o, children: /* @__PURE__ */ p.jsx(
    Di,
    {
      scope: o,
      onNativeOptionAdd: E,
      onNativeOptionRemove: ee,
      children: pl(m) ? m($) : t
    }
  ) }) }) });
}
ln.displayName = Li;
var Fi = (e) => {
  const { __scopeSelect: o, children: t, ...r } = e;
  return /* @__PURE__ */ p.jsx(
    ln,
    {
      __scopeSelect: o,
      ...r,
      internal_do_not_use_render: ({ isFormControl: n }) => /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
        t,
        n ? /* @__PURE__ */ p.jsx(
          kn,
          {
            __scopeSelect: o
          }
        ) : null
      ] })
    }
  );
};
Fi.displayName = Me;
var un = "SelectTrigger", $i = a.forwardRef(
  (e, o) => {
    const { __scopeSelect: t, disabled: r = !1, ...n } = e, s = At(t), c = Ee(un, t), i = c.disabled || r, l = I(o, c.onTriggerChange), f = _t(t), d = a.useRef("touch"), [u, h, v] = Pn((m) => {
      const b = f().filter((w) => !w.disabled), y = b.find((w) => w.value === c.value), x = En(b, m, y);
      x !== void 0 && c.onValueChange(x.value);
    }), g = (m) => {
      i || (c.onOpenChange(!0), v()), m && (c.triggerPointerDownPosRef.current = {
        x: Math.round(m.pageX),
        y: Math.round(m.pageY)
      });
    };
    return /* @__PURE__ */ p.jsx(Ze, { asChild: !0, ...s, children: /* @__PURE__ */ p.jsx(
      M.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": c.open ? c.contentId : void 0,
        "aria-expanded": c.open,
        "aria-required": c.required,
        "aria-autocomplete": "none",
        dir: c.dir,
        "data-state": c.open ? "open" : "closed",
        disabled: i,
        "data-disabled": i ? "" : void 0,
        "data-placeholder": It(c.value) ? "" : void 0,
        ...n,
        ref: l,
        onClick: k(n.onClick, (m) => {
          m.currentTarget.focus(), d.current !== "mouse" && g(m);
        }),
        onPointerDown: k(n.onPointerDown, (m) => {
          d.current = m.pointerType;
          const b = m.target;
          b.hasPointerCapture(m.pointerId) && b.releasePointerCapture(m.pointerId), m.button === 0 && m.ctrlKey === !1 && m.pointerType === "mouse" && (g(m), m.preventDefault());
        }),
        onKeyDown: k(n.onKeyDown, (m) => {
          const b = u.current !== "";
          !(m.ctrlKey || m.altKey || m.metaKey) && m.key.length === 1 && h(m.key), !(b && m.key === " ") && Ai.includes(m.key) && (g(), m.preventDefault());
        })
      }
    ) });
  }
);
$i.displayName = un;
var dn = "SelectValue", Hi = a.forwardRef(
  (e, o) => {
    const { __scopeSelect: t, className: r, style: n, children: s, placeholder: c = "", ...i } = e, l = Ee(dn, t), { onValueNodeHasChildrenChange: f } = l, d = s !== void 0, u = I(o, l.onValueNodeChange);
    Z(() => {
      f(d);
    }, [f, d]);
    const h = It(l.value);
    return /* @__PURE__ */ p.jsx(
      M.span,
      {
        ...i,
        asChild: h ? !1 : i.asChild,
        ref: u,
        style: { pointerEvents: "none" },
        children: /* @__PURE__ */ p.jsx(a.Fragment, { children: h ? c : s }, h ? "placeholder" : "value")
      }
    );
  }
);
Hi.displayName = dn;
var zi = "SelectIcon", Vi = a.forwardRef(
  (e, o) => {
    const { __scopeSelect: t, children: r, ...n } = e;
    return /* @__PURE__ */ p.jsx(M.span, { "aria-hidden": !0, ...n, ref: o, children: r || "▼" });
  }
);
Vi.displayName = zi;
var pn = "SelectPortal", [Bi, Ui] = Te(pn, {
  forceMount: void 0
}), Gi = (e) => {
  const { __scopeSelect: o, forceMount: t, ...r } = e;
  return /* @__PURE__ */ p.jsx(Bi, { scope: e.__scopeSelect, forceMount: t, children: /* @__PURE__ */ p.jsx(ze, { asChild: !0, ...r }) });
};
Gi.displayName = pn;
var Se = "SelectContent", Wi = a.forwardRef(
  (e, o) => {
    const t = Ui(Se, e.__scopeSelect), { forceMount: r = t.forceMount, ...n } = e, s = Ee(Se, e.__scopeSelect), [c, i] = a.useState();
    return Z(() => {
      i(new DocumentFragment());
    }, []), /* @__PURE__ */ p.jsx(J, { present: r || s.open, children: ({ present: l }) => l ? /* @__PURE__ */ p.jsx(mn, { ...n, ref: o }) : /* @__PURE__ */ p.jsx(fn, { ...n, fragment: c }) });
  }
);
Wi.displayName = Se;
var fn = a.forwardRef((e, o) => {
  const { __scopeSelect: t, children: r, fragment: n } = e;
  return n ? mt.createPortal(
    /* @__PURE__ */ p.jsx(hn, { scope: t, children: /* @__PURE__ */ p.jsx(Tt.Slot, { scope: t, children: /* @__PURE__ */ p.jsx("div", { ref: o, children: r }) }) }),
    n
  ) : null;
});
fn.displayName = "SelectContentFragment";
var de = 10, [hn, Re] = Te(Se), Ki = "SelectContentImpl", qi = /* @__PURE__ */ Ce("SelectContent.RemoveScroll"), mn = a.forwardRef(
  (e, o) => {
    const { __scopeSelect: t } = e, {
      position: r = "item-aligned",
      onCloseAutoFocus: n,
      onEscapeKeyDown: s,
      onPointerDownOutside: c,
      //
      // PopperContent props
      side: i,
      sideOffset: l,
      align: f,
      alignOffset: d,
      arrowPadding: u,
      collisionBoundary: h,
      collisionPadding: v,
      sticky: g,
      hideWhenDetached: m,
      avoidCollisions: b,
      //
      ...y
    } = e, x = Ee(Se, t), [w, S] = a.useState(null), [P, A] = a.useState(null), N = I(o, S), [D, j] = a.useState(null), [L, T] = a.useState(
      null
    ), _ = _t(t), [U, W] = a.useState(!1), q = a.useRef(!1);
    a.useEffect(() => {
      if (w) return wt(w);
    }, [w]), gt();
    const F = a.useCallback(
      (R) => {
        const [z, ...oe] = _().map((Y) => Y.ref.current), [V] = oe.slice(-1), G = document.activeElement;
        for (const Y of R)
          if (Y === G || (Y?.scrollIntoView({ block: "nearest" }), Y === z && P && (P.scrollTop = 0), Y === V && P && (P.scrollTop = P.scrollHeight), Y?.focus(), document.activeElement !== G)) return;
      },
      [_, P]
    ), Q = a.useCallback(
      () => F([D, w]),
      [F, D, w]
    );
    a.useEffect(() => {
      U && Q();
    }, [U, Q]);
    const { onOpenChange: H, triggerPointerDownPosRef: E } = x;
    a.useEffect(() => {
      if (w) {
        let R = { x: 0, y: 0 };
        const z = (V) => {
          R = {
            x: Math.abs(Math.round(V.pageX) - (E.current?.x ?? 0)),
            y: Math.abs(Math.round(V.pageY) - (E.current?.y ?? 0))
          };
        }, oe = (V) => {
          R.x <= 10 && R.y <= 10 ? V.preventDefault() : V.composedPath().includes(w) || H(!1), document.removeEventListener("pointermove", z), E.current = null;
        };
        return E.current !== null && (document.addEventListener("pointermove", z), document.addEventListener("pointerup", oe, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", z), document.removeEventListener("pointerup", oe, { capture: !0 });
        };
      }
    }, [w, H, E]), a.useEffect(() => {
      const R = () => H(!1);
      return window.addEventListener("blur", R), window.addEventListener("resize", R), () => {
        window.removeEventListener("blur", R), window.removeEventListener("resize", R);
      };
    }, [H]);
    const [ee, $] = Pn((R) => {
      const z = _().filter((G) => !G.disabled), oe = z.find((G) => G.ref.current === document.activeElement), V = En(z, R, oe);
      V && setTimeout(() => V.ref.current?.focus());
    }), K = a.useCallback(
      (R, z, oe) => {
        const V = !q.current && !oe;
        (x.value !== void 0 && x.value === z || V) && (j(R), V && (q.current = !0));
      },
      [x.value]
    ), te = a.useCallback(() => w?.focus(), [w]), re = a.useCallback(
      (R, z, oe) => {
        const V = !q.current && !oe;
        (x.value !== void 0 && x.value === z || V) && T(R);
      },
      [x.value]
    ), me = r === "popper" ? Qt : vn, se = me === Qt ? {
      side: i,
      sideOffset: l,
      align: f,
      alignOffset: d,
      arrowPadding: u,
      collisionBoundary: h,
      collisionPadding: v,
      sticky: g,
      hideWhenDetached: m,
      avoidCollisions: b
    } : {};
    return /* @__PURE__ */ p.jsx(
      hn,
      {
        scope: t,
        content: w,
        viewport: P,
        onViewportChange: A,
        itemRefCallback: K,
        selectedItem: D,
        onItemLeave: te,
        itemTextRefCallback: re,
        focusSelectedItem: Q,
        selectedItemText: L,
        position: r,
        isPositioned: U,
        searchRef: ee,
        children: /* @__PURE__ */ p.jsx(vt, { as: qi, allowPinchZoom: !0, children: /* @__PURE__ */ p.jsx(
          Xe,
          {
            asChild: !0,
            trapped: x.open,
            onMountAutoFocus: (R) => {
              R.preventDefault();
            },
            onUnmountAutoFocus: k(n, (R) => {
              x.trigger?.focus({ preventScroll: !0 }), R.preventDefault();
            }),
            children: /* @__PURE__ */ p.jsx(
              He,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: s,
                onPointerDownOutside: c,
                onFocusOutside: (R) => R.preventDefault(),
                onDismiss: () => x.onOpenChange(!1),
                children: /* @__PURE__ */ p.jsx(
                  me,
                  {
                    role: "listbox",
                    id: x.contentId,
                    "data-state": x.open ? "open" : "closed",
                    dir: x.dir,
                    onContextMenu: (R) => R.preventDefault(),
                    ...y,
                    ...se,
                    onPlaced: () => W(!0),
                    ref: N,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...y.style
                    },
                    onKeyDown: k(y.onKeyDown, (R) => {
                      const z = R.ctrlKey || R.altKey || R.metaKey;
                      if (R.key === "Tab" && R.preventDefault(), !z && R.key.length === 1 && $(R.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(R.key)) {
                        let V = _().filter((G) => !G.disabled).map((G) => G.ref.current);
                        if (["ArrowUp", "End"].includes(R.key) && (V = V.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(R.key)) {
                          const G = R.target, Y = V.indexOf(G);
                          V = V.slice(Y + 1);
                        }
                        setTimeout(() => F(V)), R.preventDefault();
                      }
                    })
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
mn.displayName = Ki;
var Yi = "SelectItemAlignedPosition", vn = a.forwardRef((e, o) => {
  const { __scopeSelect: t, onPlaced: r, ...n } = e, s = Ee(Se, t), c = Re(Se, t), [i, l] = a.useState(null), [f, d] = a.useState(null), u = I(o, d), h = _t(t), v = a.useRef(!1), g = a.useRef(!0), { viewport: m, selectedItem: b, selectedItemText: y, focusSelectedItem: x } = c, w = a.useCallback(() => {
    if (s.trigger && s.valueNode && i && f && m && b && y) {
      const N = s.trigger.getBoundingClientRect(), D = f.getBoundingClientRect(), j = s.valueNode.getBoundingClientRect(), L = y.getBoundingClientRect();
      if (s.dir !== "rtl") {
        const G = L.left - D.left, Y = j.left - G, ve = N.left - Y, ce = N.width + ve, $t = Math.max(ce, D.width), Ht = window.innerWidth - de, zt = Jt(Y, [
          de,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(de, Ht - $t)
        ]);
        i.style.minWidth = ce + "px", i.style.left = zt + "px";
      } else {
        const G = D.right - L.right, Y = window.innerWidth - j.right - G, ve = window.innerWidth - N.right - Y, ce = N.width + ve, $t = Math.max(ce, D.width), Ht = window.innerWidth - de, zt = Jt(Y, [
          de,
          Math.max(de, Ht - $t)
        ]);
        i.style.minWidth = ce + "px", i.style.right = zt + "px";
      }
      const T = h(), _ = window.innerHeight - de * 2, U = m.scrollHeight, W = window.getComputedStyle(f), q = parseInt(W.borderTopWidth, 10), F = parseInt(W.paddingTop, 10), Q = parseInt(W.borderBottomWidth, 10), H = parseInt(W.paddingBottom, 10), E = q + F + U + H + Q, ee = Math.min(b.offsetHeight * 5, E), $ = window.getComputedStyle(m), K = parseInt($.paddingTop, 10), te = parseInt($.paddingBottom, 10), re = N.top + N.height / 2 - de, me = _ - re, se = b.offsetHeight / 2, R = b.offsetTop + se, z = q + F + R, oe = E - z;
      if (z <= re) {
        const G = T.length > 0 && b === T[T.length - 1].ref.current;
        i.style.bottom = "0px";
        const Y = f.clientHeight - m.offsetTop - m.offsetHeight, ve = Math.max(
          me,
          se + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (G ? te : 0) + Y + Q
        ), ce = z + ve;
        i.style.height = ce + "px";
      } else {
        const G = T.length > 0 && b === T[0].ref.current;
        i.style.top = "0px";
        const ve = Math.max(
          re,
          q + m.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (G ? K : 0) + se
        ) + oe;
        i.style.height = ve + "px", m.scrollTop = z - re + m.offsetTop;
      }
      i.style.margin = `${de}px 0`, i.style.minHeight = ee + "px", i.style.maxHeight = _ + "px", r?.(), requestAnimationFrame(() => v.current = !0);
    }
  }, [
    h,
    s.trigger,
    s.valueNode,
    i,
    f,
    m,
    b,
    y,
    s.dir,
    r
  ]);
  Z(() => w(), [w]);
  const [S, P] = a.useState();
  Z(() => {
    f && P(window.getComputedStyle(f).zIndex);
  }, [f]);
  const A = a.useCallback(
    (N) => {
      N && g.current === !0 && (w(), x?.(), g.current = !1);
    },
    [w, x]
  );
  return /* @__PURE__ */ p.jsx(
    Zi,
    {
      scope: t,
      contentWrapper: i,
      shouldExpandOnScrollRef: v,
      onScrollButtonChange: A,
      children: /* @__PURE__ */ p.jsx(
        "div",
        {
          ref: l,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: S
          },
          children: /* @__PURE__ */ p.jsx(
            M.div,
            {
              ...n,
              ref: u,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...n.style
              }
            }
          )
        }
      )
    }
  );
});
vn.displayName = Yi;
var Xi = "SelectPopperPosition", Qt = a.forwardRef((e, o) => {
  const {
    __scopeSelect: t,
    align: r = "start",
    collisionPadding: n = de,
    ...s
  } = e, c = At(t);
  return /* @__PURE__ */ p.jsx(
    bt,
    {
      ...c,
      ...s,
      ref: o,
      align: r,
      collisionPadding: n,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...s.style,
        "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width": "var(--radix-popper-available-width)",
        "--radix-select-content-available-height": "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
Qt.displayName = Xi;
var [Zi, So] = Te(Se, {}), eo = "SelectViewport", Ji = a.forwardRef(
  (e, o) => {
    const { __scopeSelect: t, nonce: r, ...n } = e, s = Re(eo, t), c = So(eo, t), i = I(o, s.onViewportChange), l = a.useRef(0);
    return /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
      /* @__PURE__ */ p.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: r
        }
      ),
      /* @__PURE__ */ p.jsx(Tt.Slot, { scope: t, children: /* @__PURE__ */ p.jsx(
        M.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...n,
          ref: i,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...n.style
          },
          onScroll: k(n.onScroll, (f) => {
            const d = f.currentTarget, { contentWrapper: u, shouldExpandOnScrollRef: h } = c;
            if (h?.current && u) {
              const v = Math.abs(l.current - d.scrollTop);
              if (v > 0) {
                const g = window.innerHeight - de * 2, m = parseFloat(u.style.minHeight), b = parseFloat(u.style.height), y = Math.max(m, b);
                if (y < g) {
                  const x = y + v, w = Math.min(g, x), S = x - w;
                  u.style.height = w + "px", u.style.bottom === "0px" && (d.scrollTop = S > 0 ? S : 0, u.style.justifyContent = "flex-end");
                }
              }
            }
            l.current = d.scrollTop;
          })
        }
      ) })
    ] });
  }
);
Ji.displayName = eo;
var gn = "SelectGroup", [Qi, el] = Te(gn), tl = a.forwardRef(
  (e, o) => {
    const { __scopeSelect: t, ...r } = e, n = ie();
    return /* @__PURE__ */ p.jsx(Qi, { scope: t, id: n, children: /* @__PURE__ */ p.jsx(M.div, { role: "group", "aria-labelledby": n, ...r, ref: o }) });
  }
);
tl.displayName = gn;
var yn = "SelectLabel", ol = a.forwardRef(
  (e, o) => {
    const { __scopeSelect: t, ...r } = e, n = el(yn, t);
    return /* @__PURE__ */ p.jsx(M.div, { id: n.id, ...r, ref: o });
  }
);
ol.displayName = yn;
var dt = "SelectItem", [rl, bn] = Te(dt), nl = a.forwardRef(
  (e, o) => {
    const {
      __scopeSelect: t,
      value: r,
      disabled: n = !1,
      textValue: s,
      ...c
    } = e, i = Ee(dt, t), l = Re(dt, t), f = i.value === r, [d, u] = a.useState(s ?? ""), [h, v] = a.useState(!1), g = X(
      (w) => l.itemRefCallback?.(w, r, n)
    ), m = I(o, g), b = ie(), y = a.useRef("touch"), x = () => {
      n || (i.onValueChange(r), i.onOpenChange(!1));
    };
    return /* @__PURE__ */ p.jsx(
      rl,
      {
        scope: t,
        value: r,
        disabled: n,
        textId: b,
        isSelected: f,
        onItemTextChange: a.useCallback((w) => {
          u((S) => S || (w?.textContent ?? "").trim());
        }, []),
        children: /* @__PURE__ */ p.jsx(
          Tt.ItemSlot,
          {
            scope: t,
            value: r,
            disabled: n,
            textValue: d,
            children: /* @__PURE__ */ p.jsx(
              M.div,
              {
                role: "option",
                "aria-labelledby": b,
                "data-highlighted": h ? "" : void 0,
                "aria-selected": f && h,
                "data-state": f ? "checked" : "unchecked",
                "aria-disabled": n || void 0,
                "data-disabled": n ? "" : void 0,
                tabIndex: n ? void 0 : -1,
                ...c,
                ref: m,
                onFocus: k(c.onFocus, () => v(!0)),
                onBlur: k(c.onBlur, () => v(!1)),
                onClick: k(c.onClick, () => {
                  y.current !== "mouse" && x();
                }),
                onPointerUp: k(c.onPointerUp, () => {
                  y.current === "mouse" && x();
                }),
                onPointerDown: k(c.onPointerDown, (w) => {
                  y.current = w.pointerType;
                }),
                onPointerMove: k(c.onPointerMove, (w) => {
                  y.current = w.pointerType, n ? l.onItemLeave?.() : y.current === "mouse" && w.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: k(c.onPointerLeave, (w) => {
                  w.currentTarget === document.activeElement && l.onItemLeave?.();
                }),
                onKeyDown: k(c.onKeyDown, (w) => {
                  n || w.target !== w.currentTarget || l.searchRef?.current !== "" && w.key === " " || (Ii.includes(w.key) && x(), w.key === " " && w.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
nl.displayName = dt;
var Ge = "SelectItemText", sl = a.forwardRef(
  (e, o) => {
    const { __scopeSelect: t, className: r, style: n, ...s } = e, c = Ee(Ge, t), i = Re(Ge, t), l = bn(Ge, t), f = ji(Ge, t), [d, u] = a.useState(null), h = X(
      (x) => i.itemTextRefCallback?.(x, l.value, l.disabled)
    ), v = I(
      o,
      u,
      l.onItemTextChange,
      h
    ), g = d?.textContent, m = a.useMemo(
      () => /* @__PURE__ */ p.jsx("option", { value: l.value, disabled: l.disabled, children: g }, l.value),
      [l.disabled, l.value, g]
    ), { onNativeOptionAdd: b, onNativeOptionRemove: y } = f;
    return Z(() => (b(m), () => y(m)), [b, y, m]), /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
      /* @__PURE__ */ p.jsx(M.span, { id: l.textId, ...s, ref: v }),
      l.isSelected && c.valueNode && !c.valueNodeHasChildren && !It(c.value) ? mt.createPortal(s.children, c.valueNode) : null
    ] });
  }
);
sl.displayName = Ge;
var xn = "SelectItemIndicator", al = a.forwardRef(
  (e, o) => {
    const { __scopeSelect: t, ...r } = e;
    return bn(xn, t).isSelected ? /* @__PURE__ */ p.jsx(M.span, { "aria-hidden": !0, ...r, ref: o }) : null;
  }
);
al.displayName = xn;
var to = "SelectScrollUpButton", cl = a.forwardRef((e, o) => {
  const t = Re(to, e.__scopeSelect), r = So(to, e.__scopeSelect), [n, s] = a.useState(!1), c = I(o, r.onScrollButtonChange);
  return Z(() => {
    if (t.viewport && t.isPositioned) {
      let i = function() {
        const f = l.scrollTop > 0;
        s(f);
      };
      const l = t.viewport;
      return i(), l.addEventListener("scroll", i), () => l.removeEventListener("scroll", i);
    }
  }, [t.viewport, t.isPositioned]), n ? /* @__PURE__ */ p.jsx(
    wn,
    {
      ...e,
      ref: c,
      onAutoScroll: () => {
        const { viewport: i, selectedItem: l } = t;
        i && l && (i.scrollTop = i.scrollTop - l.offsetHeight);
      }
    }
  ) : null;
});
cl.displayName = to;
var oo = "SelectScrollDownButton", il = a.forwardRef((e, o) => {
  const t = Re(oo, e.__scopeSelect), r = So(oo, e.__scopeSelect), [n, s] = a.useState(!1), c = I(o, r.onScrollButtonChange);
  return Z(() => {
    if (t.viewport && t.isPositioned) {
      let i = function() {
        const f = l.scrollHeight - l.clientHeight, d = Math.ceil(l.scrollTop) < f;
        s(d);
      };
      const l = t.viewport;
      return i(), l.addEventListener("scroll", i), () => l.removeEventListener("scroll", i);
    }
  }, [t.viewport, t.isPositioned]), n ? /* @__PURE__ */ p.jsx(
    wn,
    {
      ...e,
      ref: c,
      onAutoScroll: () => {
        const { viewport: i, selectedItem: l } = t;
        i && l && (i.scrollTop = i.scrollTop + l.offsetHeight);
      }
    }
  ) : null;
});
il.displayName = oo;
var wn = a.forwardRef((e, o) => {
  const { __scopeSelect: t, onAutoScroll: r, ...n } = e, s = Re("SelectScrollButton", t), c = a.useRef(null), i = _t(t), l = a.useCallback(() => {
    c.current !== null && (window.clearInterval(c.current), c.current = null);
  }, []);
  return a.useEffect(() => () => l(), [l]), Z(() => {
    i().find((d) => d.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
  }, [i]), /* @__PURE__ */ p.jsx(
    M.div,
    {
      "aria-hidden": !0,
      ...n,
      ref: o,
      style: { flexShrink: 0, ...n.style },
      onPointerDown: k(n.onPointerDown, () => {
        c.current === null && (c.current = window.setInterval(r, 50));
      }),
      onPointerMove: k(n.onPointerMove, () => {
        s.onItemLeave?.(), c.current === null && (c.current = window.setInterval(r, 50));
      }),
      onPointerLeave: k(n.onPointerLeave, () => {
        l();
      })
    }
  );
}), ll = "SelectSeparator", ul = a.forwardRef(
  (e, o) => {
    const { __scopeSelect: t, ...r } = e;
    return /* @__PURE__ */ p.jsx(M.div, { "aria-hidden": !0, ...r, ref: o });
  }
);
ul.displayName = ll;
var Cn = "SelectArrow", dl = a.forwardRef(
  (e, o) => {
    const { __scopeSelect: t, ...r } = e, n = At(t);
    return Re(Cn, t).position === "popper" ? /* @__PURE__ */ p.jsx(xt, { ...n, ...r, ref: o }) : null;
  }
);
dl.displayName = Cn;
var Sn = "SelectBubbleInput", kn = a.forwardRef(
  ({ __scopeSelect: e, ...o }, t) => {
    const r = Ee(Sn, e), { value: n, onValueChange: s, required: c, disabled: i, name: l, autoComplete: f, form: d } = r, { nativeOptions: u, nativeSelectKey: h } = r, v = a.useRef(null), g = I(t, v), m = n ?? "", b = xo(m), y = Array.from(u).some(
      (x) => (x.props.value ?? "") === ""
    );
    return a.useEffect(() => {
      const x = v.current;
      if (!x) return;
      const w = window.HTMLSelectElement.prototype, P = Object.getOwnPropertyDescriptor(
        w,
        "value"
      ).set;
      if (b !== m && P) {
        const A = new Event("change", { bubbles: !0 });
        P.call(x, m), x.dispatchEvent(A);
      }
    }, [b, m]), /* @__PURE__ */ p.jsxs(
      M.select,
      {
        "aria-hidden": !0,
        required: c,
        tabIndex: -1,
        name: l,
        autoComplete: f,
        disabled: i,
        form: d,
        onChange: (x) => s(x.target.value),
        ...o,
        style: { ...Er, ...o.style },
        ref: g,
        defaultValue: m,
        children: [
          It(n) && !y ? /* @__PURE__ */ p.jsx("option", { value: "" }) : null,
          Array.from(u)
        ]
      },
      h
    );
  }
);
kn.displayName = Sn;
function pl(e) {
  return typeof e == "function";
}
function It(e) {
  return e === "" || e === void 0;
}
function Pn(e) {
  const o = X(e), t = a.useRef(""), r = a.useRef(0), n = a.useCallback(
    (c) => {
      const i = t.current + c;
      o(i), function l(f) {
        t.current = f, window.clearTimeout(r.current), f !== "" && (r.current = window.setTimeout(() => l(""), 1e3));
      }(i);
    },
    [o]
  ), s = a.useCallback(() => {
    t.current = "", window.clearTimeout(r.current);
  }, []);
  return a.useEffect(() => () => window.clearTimeout(r.current), []), [t, n, s];
}
function En(e, o, t) {
  const n = o.length > 1 && Array.from(o).every((f) => f === o[0]) ? o[0] : o, s = t ? e.indexOf(t) : -1;
  let c = fl(e, Math.max(s, 0));
  n.length === 1 && (c = c.filter((f) => f !== t));
  const l = c.find(
    (f) => f.textValue.toLowerCase().startsWith(n.toLowerCase())
  );
  return l !== t ? l : void 0;
}
function fl(e, o) {
  return e.map((t, r) => e[(o + r) % e.length]);
}
var Wt = !1;
function hl() {
  const [e, o] = a.useState(Wt);
  return a.useEffect(() => {
    Wt || (Wt = !0, o(!0));
  }, []), e;
}
var Rn = ht[" useSyncExternalStore ".trim().toString()];
function ml() {
  return () => {
  };
}
function vl() {
  return Rn(
    ml,
    () => !0,
    () => !1
  );
}
var gl = typeof Rn == "function" ? vl : hl, Kt = "rovingFocusGroup.onEntryFocus", yl = { bubbles: !1, cancelable: !0 }, tt = "RovingFocusGroup", [ro, Mn, bl] = Co(tt), [xl, Nt] = ae(
  tt,
  [bl]
), [wl, Cl] = xl(tt), Tn = a.forwardRef(
  (e, o) => /* @__PURE__ */ p.jsx(ro.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ p.jsx(ro.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ p.jsx(Sl, { ...e, ref: o }) }) })
);
Tn.displayName = tt;
var Sl = a.forwardRef((e, o) => {
  const {
    __scopeRovingFocusGroup: t,
    orientation: r,
    loop: n = !1,
    dir: s,
    currentTabStopId: c,
    defaultCurrentTabStopId: i,
    onCurrentTabStopIdChange: l,
    onEntryFocus: f,
    preventScrollOnEntryFocus: d = !1,
    ...u
  } = e, h = a.useRef(null), v = I(o, h), g = et(s), [m, b] = fe({
    prop: c,
    defaultProp: i ?? null,
    onChange: l,
    caller: tt
  }), [y, x] = a.useState(!1), w = X(f), S = Mn(t), P = a.useRef(!1), [A, N] = a.useState(0);
  return a.useEffect(() => {
    const D = h.current;
    if (D)
      return D.addEventListener(Kt, w), () => D.removeEventListener(Kt, w);
  }, [w]), /* @__PURE__ */ p.jsx(
    wl,
    {
      scope: t,
      orientation: r,
      dir: g,
      loop: n,
      currentTabStopId: m,
      onItemFocus: a.useCallback(
        (D) => b(D),
        [b]
      ),
      onItemShiftTab: a.useCallback(() => x(!0), []),
      onFocusableItemAdd: a.useCallback(
        () => N((D) => D + 1),
        []
      ),
      onFocusableItemRemove: a.useCallback(
        () => N((D) => D - 1),
        []
      ),
      children: /* @__PURE__ */ p.jsx(
        M.div,
        {
          tabIndex: y || A === 0 ? -1 : 0,
          "data-orientation": r,
          ...u,
          ref: v,
          style: { outline: "none", ...e.style },
          onMouseDown: k(e.onMouseDown, () => {
            P.current = !0;
          }),
          onFocus: k(e.onFocus, (D) => {
            const j = !P.current;
            if (D.target === D.currentTarget && j && !y) {
              const L = new CustomEvent(Kt, yl);
              if (D.currentTarget.dispatchEvent(L), !L.defaultPrevented) {
                const T = S().filter((F) => F.focusable), _ = T.find((F) => F.active), U = T.find((F) => F.id === m), q = [_, U, ...T].filter(
                  Boolean
                ).map((F) => F.ref.current);
                In(q, d);
              }
            }
            P.current = !1;
          }),
          onBlur: k(e.onBlur, () => x(!1))
        }
      )
    }
  );
}), _n = "RovingFocusGroupItem", An = a.forwardRef(
  (e, o) => {
    const {
      __scopeRovingFocusGroup: t,
      focusable: r = !0,
      active: n = !1,
      tabStopId: s,
      children: c,
      ...i
    } = e, l = ie(), f = s || l, d = Cl(_n, t), u = d.currentTabStopId === f, h = Mn(t), { onFocusableItemAdd: v, onFocusableItemRemove: g, currentTabStopId: m } = d, b = gl();
    return Z(() => {
      if (!(!b || !r))
        return v(), () => g();
    }, [b, r, v, g]), a.useEffect(() => {
      if (!(b || !r))
        return v(), () => g();
    }, [b, r, v, g]), /* @__PURE__ */ p.jsx(
      ro.ItemSlot,
      {
        scope: t,
        id: f,
        focusable: r,
        active: n,
        children: /* @__PURE__ */ p.jsx(
          M.span,
          {
            tabIndex: u ? 0 : -1,
            "data-orientation": d.orientation,
            ...i,
            ref: o,
            onMouseDown: k(e.onMouseDown, (y) => {
              r ? d.onItemFocus(f) : y.preventDefault();
            }),
            onFocus: k(e.onFocus, () => d.onItemFocus(f)),
            onKeyDown: k(e.onKeyDown, (y) => {
              if (y.key === "Tab" && y.shiftKey) {
                d.onItemShiftTab();
                return;
              }
              if (y.target !== y.currentTarget) return;
              const x = El(y, d.orientation, d.dir);
              if (x !== void 0) {
                if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
                y.preventDefault();
                let S = h().filter((P) => P.focusable).map((P) => P.ref.current);
                if (x === "last") S.reverse();
                else if (x === "prev" || x === "next") {
                  x === "prev" && S.reverse();
                  const P = S.indexOf(y.currentTarget);
                  S = d.loop ? Rl(S, P + 1) : S.slice(P + 1);
                }
                setTimeout(() => In(S));
              }
            }),
            children: typeof c == "function" ? c({ isCurrentTabStop: u, hasTabStop: m != null }) : c
          }
        )
      }
    );
  }
);
An.displayName = _n;
var kl = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Pl(e, o) {
  return o !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function El(e, o, t) {
  const r = Pl(e.key, t);
  if (!(o === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(o === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return kl[r];
}
function In(e, o = !1) {
  const t = document.activeElement;
  for (const r of e)
    if (r === t || (r.focus({ preventScroll: o }), document.activeElement !== t)) return;
}
function Rl(e, o) {
  return e.map((t, r) => e[(o + r) % e.length]);
}
var Nn = Tn, On = An, Ot = "Tabs", [Ml] = ae(Ot, [
  Nt
]), Dn = Nt(), [Tl, ko] = Ml(Ot), jn = a.forwardRef(
  (e, o) => {
    const {
      __scopeTabs: t,
      value: r,
      onValueChange: n,
      defaultValue: s,
      orientation: c = "horizontal",
      dir: i,
      activationMode: l = "automatic",
      ...f
    } = e, d = et(i), [u, h] = fe({
      prop: r,
      onChange: n,
      defaultProp: s ?? "",
      caller: Ot
    });
    return /* @__PURE__ */ p.jsx(
      Tl,
      {
        scope: t,
        baseId: ie(),
        value: u,
        onValueChange: h,
        orientation: c,
        dir: d,
        activationMode: l,
        children: /* @__PURE__ */ p.jsx(
          M.div,
          {
            dir: d,
            "data-orientation": c,
            ...f,
            ref: o
          }
        )
      }
    );
  }
);
jn.displayName = Ot;
var Ln = "TabsList", Fn = a.forwardRef(
  (e, o) => {
    const { __scopeTabs: t, loop: r = !0, ...n } = e, s = ko(Ln, t), c = Dn(t);
    return /* @__PURE__ */ p.jsx(
      Nn,
      {
        asChild: !0,
        ...c,
        orientation: s.orientation,
        dir: s.dir,
        loop: r,
        children: /* @__PURE__ */ p.jsx(
          M.div,
          {
            role: "tablist",
            "aria-orientation": s.orientation,
            ...n,
            ref: o
          }
        )
      }
    );
  }
);
Fn.displayName = Ln;
var $n = "TabsTrigger", Hn = a.forwardRef(
  (e, o) => {
    const { __scopeTabs: t, value: r, disabled: n = !1, ...s } = e, c = ko($n, t), i = Dn(t), l = Bn(c.baseId, r), f = Un(c.baseId, r), d = r === c.value;
    return /* @__PURE__ */ p.jsx(
      On,
      {
        asChild: !0,
        ...i,
        focusable: !n,
        active: d,
        children: /* @__PURE__ */ p.jsx(
          M.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": d,
            "aria-controls": f,
            "data-state": d ? "active" : "inactive",
            "data-disabled": n ? "" : void 0,
            disabled: n,
            id: l,
            ...s,
            ref: o,
            onMouseDown: k(e.onMouseDown, (u) => {
              !n && u.button === 0 && u.ctrlKey === !1 ? c.onValueChange(r) : u.preventDefault();
            }),
            onKeyDown: k(e.onKeyDown, (u) => {
              n || u.target !== u.currentTarget || [" ", "Enter"].includes(u.key) && c.onValueChange(r);
            }),
            onFocus: k(e.onFocus, () => {
              const u = c.activationMode !== "manual";
              !d && !n && u && c.onValueChange(r);
            })
          }
        )
      }
    );
  }
);
Hn.displayName = $n;
var zn = "TabsContent", Vn = a.forwardRef(
  (e, o) => {
    const { __scopeTabs: t, value: r, forceMount: n, children: s, ...c } = e, i = ko(zn, t), l = Bn(i.baseId, r), f = Un(i.baseId, r), d = r === i.value, u = a.useRef(d);
    return a.useEffect(() => {
      const h = requestAnimationFrame(() => u.current = !1);
      return () => cancelAnimationFrame(h);
    }, []), /* @__PURE__ */ p.jsx(J, { present: n || d, children: ({ present: h }) => /* @__PURE__ */ p.jsx(
      M.div,
      {
        "data-state": d ? "active" : "inactive",
        "data-orientation": i.orientation,
        role: "tabpanel",
        "aria-labelledby": l,
        hidden: !h,
        id: f,
        tabIndex: 0,
        ...c,
        ref: o,
        style: {
          ...e.style,
          animationDuration: u.current ? "0s" : void 0
        },
        children: h && s
      }
    ) });
  }
);
Vn.displayName = zn;
function Bn(e, o) {
  return `${e}-trigger-${o}`;
}
function Un(e, o) {
  return `${e}-content-${o}`;
}
var ef = jn, tf = Fn, of = Hn, rf = Vn, no = ["Enter", " "], _l = ["ArrowDown", "PageUp", "Home"], Gn = ["ArrowUp", "PageDown", "End"], Al = [..._l, ...Gn], Il = {
  ltr: [...no, "ArrowRight"],
  rtl: [...no, "ArrowLeft"]
}, Nl = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, ot = "Menu", [qe, Ol, Dl] = Co(ot), [_e, Wn] = ae(ot, [
  Dl,
  ke,
  Nt
]), Dt = ke(), Kn = Nt(), [jl, Ae] = _e(ot), [Ll, rt] = _e(ot), qn = (e) => {
  const { __scopeMenu: o, open: t = !1, children: r, dir: n, onOpenChange: s, modal: c = !0 } = e, i = Dt(o), [l, f] = a.useState(null), d = a.useRef(!1), u = X(s), h = et(n);
  return a.useEffect(() => {
    const v = () => {
      d.current = !0, document.addEventListener("pointerdown", g, { capture: !0, once: !0 }), document.addEventListener("pointermove", g, { capture: !0, once: !0 });
    }, g = () => d.current = !1;
    return document.addEventListener("keydown", v, { capture: !0 }), () => {
      document.removeEventListener("keydown", v, { capture: !0 }), document.removeEventListener("pointerdown", g, { capture: !0 }), document.removeEventListener("pointermove", g, { capture: !0 });
    };
  }, []), a.useEffect(() => {
    if (!t)
      return;
    const v = () => u(!1);
    return window.addEventListener("blur", v), () => window.removeEventListener("blur", v);
  }, [t, u]), /* @__PURE__ */ p.jsx(yt, { ...i, children: /* @__PURE__ */ p.jsx(
    jl,
    {
      scope: o,
      open: t,
      onOpenChange: u,
      content: l,
      onContentChange: f,
      children: /* @__PURE__ */ p.jsx(
        Ll,
        {
          scope: o,
          onClose: a.useCallback(() => u(!1), [u]),
          isUsingKeyboardRef: d,
          dir: h,
          modal: c,
          children: r
        }
      )
    }
  ) });
};
qn.displayName = ot;
var Fl = "MenuAnchor", Po = a.forwardRef(
  (e, o) => {
    const { __scopeMenu: t, ...r } = e, n = Dt(t);
    return /* @__PURE__ */ p.jsx(Ze, { ...n, ...r, ref: o });
  }
);
Po.displayName = Fl;
var Eo = "MenuPortal", [$l, Yn] = _e(Eo, {
  forceMount: void 0
}), Xn = (e) => {
  const { __scopeMenu: o, forceMount: t, children: r, container: n } = e, s = Ae(Eo, o);
  return /* @__PURE__ */ p.jsx($l, { scope: o, forceMount: t, children: /* @__PURE__ */ p.jsx(J, { present: t || s.open, children: /* @__PURE__ */ p.jsx(ze, { asChild: !0, container: n, children: r }) }) });
};
Xn.displayName = Eo;
var le = "MenuContent", [Hl, Ro] = _e(le), Zn = a.forwardRef(
  (e, o) => {
    const t = Yn(le, e.__scopeMenu), { forceMount: r = t.forceMount, ...n } = e, s = Ae(le, e.__scopeMenu), c = rt(le, e.__scopeMenu);
    return /* @__PURE__ */ p.jsx(qe.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ p.jsx(J, { present: r || s.open, children: /* @__PURE__ */ p.jsx(qe.Slot, { scope: e.__scopeMenu, children: c.modal ? /* @__PURE__ */ p.jsx(zl, { ...n, ref: o }) : /* @__PURE__ */ p.jsx(Vl, { ...n, ref: o }) }) }) });
  }
), zl = a.forwardRef(
  (e, o) => {
    const t = Ae(le, e.__scopeMenu), r = a.useRef(null), n = I(o, r);
    return a.useEffect(() => {
      const s = r.current;
      if (s) return wt(s);
    }, []), /* @__PURE__ */ p.jsx(
      Mo,
      {
        ...e,
        ref: n,
        trapFocus: t.open,
        disableOutsidePointerEvents: t.open,
        disableOutsideScroll: !0,
        onFocusOutside: k(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => t.onOpenChange(!1)
      }
    );
  }
), Vl = a.forwardRef((e, o) => {
  const t = Ae(le, e.__scopeMenu);
  return /* @__PURE__ */ p.jsx(
    Mo,
    {
      ...e,
      ref: o,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => t.onOpenChange(!1)
    }
  );
}), Bl = /* @__PURE__ */ Ce("MenuContent.ScrollLock"), Mo = a.forwardRef(
  (e, o) => {
    const {
      __scopeMenu: t,
      loop: r = !1,
      trapFocus: n,
      onOpenAutoFocus: s,
      onCloseAutoFocus: c,
      disableOutsidePointerEvents: i,
      onEntryFocus: l,
      onEscapeKeyDown: f,
      onPointerDownOutside: d,
      onFocusOutside: u,
      onInteractOutside: h,
      onDismiss: v,
      disableOutsideScroll: g,
      ...m
    } = e, b = Ae(le, t), y = rt(le, t), x = Dt(t), w = Kn(t), S = Ol(t), [P, A] = a.useState(null), N = a.useRef(null), D = I(o, N, b.onContentChange), j = a.useRef(0), L = a.useRef(""), T = a.useRef(0), _ = a.useRef(null), U = a.useRef("right"), W = a.useRef(0), q = g ? vt : a.Fragment, F = g ? { as: Bl, allowPinchZoom: !0 } : void 0, Q = (E) => {
      const ee = L.current + E, $ = S().filter((R) => !R.disabled), K = document.activeElement, te = $.find((R) => R.ref.current === K)?.textValue, re = $.map((R) => R.textValue), me = tu(re, ee, te), se = $.find((R) => R.textValue === me)?.ref.current;
      (function R(z) {
        L.current = z, window.clearTimeout(j.current), z !== "" && (j.current = window.setTimeout(() => R(""), 1e3));
      })(ee), se && setTimeout(() => se.focus());
    };
    a.useEffect(() => () => window.clearTimeout(j.current), []), gt();
    const H = a.useCallback((E) => U.current === _.current?.side && ru(E, _.current?.area), []);
    return /* @__PURE__ */ p.jsx(
      Hl,
      {
        scope: t,
        searchRef: L,
        onItemEnter: a.useCallback(
          (E) => {
            H(E) && E.preventDefault();
          },
          [H]
        ),
        onItemLeave: a.useCallback(
          (E) => {
            H(E) || (N.current?.focus(), A(null));
          },
          [H]
        ),
        onTriggerLeave: a.useCallback(
          (E) => {
            H(E) && E.preventDefault();
          },
          [H]
        ),
        pointerGraceTimerRef: T,
        onPointerGraceIntentChange: a.useCallback((E) => {
          _.current = E;
        }, []),
        children: /* @__PURE__ */ p.jsx(q, { ...F, children: /* @__PURE__ */ p.jsx(
          Xe,
          {
            asChild: !0,
            trapped: n,
            onMountAutoFocus: k(s, (E) => {
              E.preventDefault(), N.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: c,
            children: /* @__PURE__ */ p.jsx(
              He,
              {
                asChild: !0,
                disableOutsidePointerEvents: i,
                onEscapeKeyDown: f,
                onPointerDownOutside: d,
                onFocusOutside: u,
                onInteractOutside: h,
                onDismiss: v,
                children: /* @__PURE__ */ p.jsx(
                  Nn,
                  {
                    asChild: !0,
                    ...w,
                    dir: y.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: P,
                    onCurrentTabStopIdChange: A,
                    onEntryFocus: k(l, (E) => {
                      y.isUsingKeyboardRef.current || E.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ p.jsx(
                      bt,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": fs(b.open),
                        "data-radix-menu-content": "",
                        dir: y.dir,
                        ...x,
                        ...m,
                        ref: D,
                        style: { outline: "none", ...m.style },
                        onKeyDown: k(m.onKeyDown, (E) => {
                          const $ = E.target.closest("[data-radix-menu-content]") === E.currentTarget, K = E.ctrlKey || E.altKey || E.metaKey, te = E.key.length === 1;
                          $ && (E.key === "Tab" && E.preventDefault(), !K && te && Q(E.key));
                          const re = N.current;
                          if (E.target !== re || !Al.includes(E.key)) return;
                          E.preventDefault();
                          const se = S().filter((R) => !R.disabled).map((R) => R.ref.current);
                          Gn.includes(E.key) && se.reverse(), Ql(se);
                        }),
                        onBlur: k(e.onBlur, (E) => {
                          E.currentTarget.contains(E.target) || (window.clearTimeout(j.current), L.current = "");
                        }),
                        onPointerMove: k(
                          e.onPointerMove,
                          Ye((E) => {
                            const ee = E.target, $ = W.current !== E.clientX;
                            if (E.currentTarget.contains(ee) && $) {
                              const K = E.clientX > W.current ? "right" : "left";
                              U.current = K, W.current = E.clientX;
                            }
                          })
                        )
                      }
                    )
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
Zn.displayName = le;
var Ul = "MenuGroup", To = a.forwardRef(
  (e, o) => {
    const { __scopeMenu: t, ...r } = e;
    return /* @__PURE__ */ p.jsx(M.div, { role: "group", ...r, ref: o });
  }
);
To.displayName = Ul;
var Gl = "MenuLabel", Jn = a.forwardRef(
  (e, o) => {
    const { __scopeMenu: t, ...r } = e;
    return /* @__PURE__ */ p.jsx(M.div, { ...r, ref: o });
  }
);
Jn.displayName = Gl;
var pt = "MenuItem", qo = "menu.itemSelect", jt = a.forwardRef(
  (e, o) => {
    const { disabled: t = !1, onSelect: r, ...n } = e, s = a.useRef(null), c = rt(pt, e.__scopeMenu), i = Ro(pt, e.__scopeMenu), l = I(o, s), f = a.useRef(!1), d = () => {
      const u = s.current;
      if (!t && u) {
        const h = new CustomEvent(qo, { bubbles: !0, cancelable: !0 });
        u.addEventListener(qo, (v) => r?.(v), { once: !0 }), rr(u, h), h.defaultPrevented ? f.current = !1 : c.onClose();
      }
    };
    return /* @__PURE__ */ p.jsx(
      Qn,
      {
        ...n,
        ref: l,
        disabled: t,
        onClick: k(e.onClick, d),
        onPointerDown: (u) => {
          e.onPointerDown?.(u), f.current = !0;
        },
        onPointerUp: k(e.onPointerUp, (u) => {
          f.current || u.currentTarget?.click();
        }),
        onKeyDown: k(e.onKeyDown, (u) => {
          t || u.target !== u.currentTarget || i.searchRef.current !== "" && u.key === " " || no.includes(u.key) && (u.currentTarget.click(), u.preventDefault());
        })
      }
    );
  }
);
jt.displayName = pt;
var Qn = a.forwardRef(
  (e, o) => {
    const { __scopeMenu: t, disabled: r = !1, textValue: n, ...s } = e, c = Ro(pt, t), i = Kn(t), l = a.useRef(null), f = I(o, l), [d, u] = a.useState(!1), [h, v] = a.useState("");
    return a.useEffect(() => {
      const g = l.current;
      g && v((g.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ p.jsx(
      qe.ItemSlot,
      {
        scope: t,
        disabled: r,
        textValue: n ?? h,
        children: /* @__PURE__ */ p.jsx(On, { asChild: !0, ...i, focusable: !r, children: /* @__PURE__ */ p.jsx(
          M.div,
          {
            role: "menuitem",
            "data-highlighted": d ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...s,
            ref: f,
            onPointerMove: k(
              e.onPointerMove,
              Ye((g) => {
                r ? c.onItemLeave(g) : (c.onItemEnter(g), g.defaultPrevented || g.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: k(
              e.onPointerLeave,
              Ye((g) => c.onItemLeave(g))
            ),
            onFocus: k(e.onFocus, () => u(!0)),
            onBlur: k(e.onBlur, () => u(!1))
          }
        ) })
      }
    );
  }
), Wl = "MenuCheckboxItem", es = a.forwardRef(
  (e, o) => {
    const { checked: t = !1, onCheckedChange: r, ...n } = e;
    return /* @__PURE__ */ p.jsx(ss, { scope: e.__scopeMenu, checked: t, children: /* @__PURE__ */ p.jsx(
      jt,
      {
        role: "menuitemcheckbox",
        "aria-checked": ft(t) ? "mixed" : t,
        ...n,
        ref: o,
        "data-state": Ao(t),
        onSelect: k(
          n.onSelect,
          () => r?.(ft(t) ? !0 : !t),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
es.displayName = Wl;
var ts = "MenuRadioGroup", [Kl, ql] = _e(
  ts,
  { value: void 0, onValueChange: () => {
  } }
), os = a.forwardRef(
  (e, o) => {
    const { value: t, onValueChange: r, ...n } = e, s = X(r);
    return /* @__PURE__ */ p.jsx(Kl, { scope: e.__scopeMenu, value: t, onValueChange: s, children: /* @__PURE__ */ p.jsx(To, { ...n, ref: o }) });
  }
);
os.displayName = ts;
var rs = "MenuRadioItem", ns = a.forwardRef(
  (e, o) => {
    const { value: t, ...r } = e, n = ql(rs, e.__scopeMenu), s = t === n.value;
    return /* @__PURE__ */ p.jsx(ss, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ p.jsx(
      jt,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...r,
        ref: o,
        "data-state": Ao(s),
        onSelect: k(
          r.onSelect,
          () => n.onValueChange?.(t),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
ns.displayName = rs;
var _o = "MenuItemIndicator", [ss, Yl] = _e(
  _o,
  { checked: !1 }
), as = a.forwardRef(
  (e, o) => {
    const { __scopeMenu: t, forceMount: r, ...n } = e, s = Yl(_o, t);
    return /* @__PURE__ */ p.jsx(
      J,
      {
        present: r || ft(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ p.jsx(
          M.span,
          {
            ...n,
            ref: o,
            "data-state": Ao(s.checked)
          }
        )
      }
    );
  }
);
as.displayName = _o;
var Xl = "MenuSeparator", cs = a.forwardRef(
  (e, o) => {
    const { __scopeMenu: t, ...r } = e;
    return /* @__PURE__ */ p.jsx(
      M.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...r,
        ref: o
      }
    );
  }
);
cs.displayName = Xl;
var Zl = "MenuArrow", is = a.forwardRef(
  (e, o) => {
    const { __scopeMenu: t, ...r } = e, n = Dt(t);
    return /* @__PURE__ */ p.jsx(xt, { ...n, ...r, ref: o });
  }
);
is.displayName = Zl;
var Jl = "MenuSub", [nf, ls] = _e(Jl), We = "MenuSubTrigger", us = a.forwardRef(
  (e, o) => {
    const t = Ae(We, e.__scopeMenu), r = rt(We, e.__scopeMenu), n = ls(We, e.__scopeMenu), s = Ro(We, e.__scopeMenu), c = a.useRef(null), { pointerGraceTimerRef: i, onPointerGraceIntentChange: l } = s, f = { __scopeMenu: e.__scopeMenu }, d = a.useCallback(() => {
      c.current && window.clearTimeout(c.current), c.current = null;
    }, []);
    a.useEffect(() => d, [d]), a.useEffect(() => {
      const h = i.current;
      return () => {
        window.clearTimeout(h), l(null);
      };
    }, [i, l]);
    const u = I(o, n.onTriggerChange);
    return /* @__PURE__ */ p.jsx(Po, { asChild: !0, ...f, children: /* @__PURE__ */ p.jsx(
      Qn,
      {
        id: n.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": t.open,
        "aria-controls": t.open ? n.contentId : void 0,
        "data-state": fs(t.open),
        ...e,
        ref: u,
        onClick: (h) => {
          e.onClick?.(h), !(e.disabled || h.defaultPrevented) && (h.currentTarget.focus(), t.open || t.onOpenChange(!0));
        },
        onPointerMove: k(
          e.onPointerMove,
          Ye((h) => {
            s.onItemEnter(h), !h.defaultPrevented && !e.disabled && !t.open && !c.current && (s.onPointerGraceIntentChange(null), c.current = window.setTimeout(() => {
              t.onOpenChange(!0), d();
            }, 100));
          })
        ),
        onPointerLeave: k(
          e.onPointerLeave,
          Ye((h) => {
            d();
            const v = t.content?.getBoundingClientRect();
            if (v) {
              const g = t.content?.dataset.side, m = g === "right", b = m ? -5 : 5, y = v[m ? "left" : "right"], x = v[m ? "right" : "left"];
              s.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: h.clientX + b, y: h.clientY },
                  { x: y, y: v.top },
                  { x, y: v.top },
                  { x, y: v.bottom },
                  { x: y, y: v.bottom }
                ],
                side: g
              }), window.clearTimeout(i.current), i.current = window.setTimeout(
                () => s.onPointerGraceIntentChange(null),
                300
              );
            } else {
              if (s.onTriggerLeave(h), h.defaultPrevented) return;
              s.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: k(e.onKeyDown, (h) => {
          e.disabled || h.target !== h.currentTarget || s.searchRef.current !== "" && h.key === " " || Il[r.dir].includes(h.key) && (t.onOpenChange(!0), t.content?.focus(), h.preventDefault());
        })
      }
    ) });
  }
);
us.displayName = We;
var ds = "MenuSubContent", ps = a.forwardRef(
  (e, o) => {
    const t = Yn(le, e.__scopeMenu), { forceMount: r = t.forceMount, align: n = "start", ...s } = e, c = Ae(le, e.__scopeMenu), i = rt(le, e.__scopeMenu), l = ls(ds, e.__scopeMenu), f = a.useRef(null), d = I(o, f);
    return /* @__PURE__ */ p.jsx(qe.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ p.jsx(J, { present: r || c.open, children: /* @__PURE__ */ p.jsx(qe.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ p.jsx(
      Mo,
      {
        id: l.contentId,
        "aria-labelledby": l.triggerId,
        ...s,
        ref: d,
        align: n,
        side: i.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (u) => {
          i.isUsingKeyboardRef.current && f.current?.focus(), u.preventDefault();
        },
        onCloseAutoFocus: (u) => u.preventDefault(),
        onFocusOutside: k(e.onFocusOutside, (u) => {
          u.target !== l.trigger && c.onOpenChange(!1);
        }),
        onEscapeKeyDown: k(e.onEscapeKeyDown, (u) => {
          i.onClose(), u.preventDefault();
        }),
        onKeyDown: k(e.onKeyDown, (u) => {
          const h = u.currentTarget.contains(u.target), v = Nl[i.dir].includes(u.key);
          h && v && (c.onOpenChange(!1), l.trigger?.focus(), u.preventDefault());
        })
      }
    ) }) }) });
  }
);
ps.displayName = ds;
function fs(e) {
  return e ? "open" : "closed";
}
function ft(e) {
  return e === "indeterminate";
}
function Ao(e) {
  return ft(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function Ql(e) {
  const o = document.activeElement;
  for (const t of e)
    if (t === o || (t.focus(), document.activeElement !== o)) return;
}
function eu(e, o) {
  return e.map((t, r) => e[(o + r) % e.length]);
}
function tu(e, o, t) {
  const n = o.length > 1 && Array.from(o).every((f) => f === o[0]) ? o[0] : o, s = t ? e.indexOf(t) : -1;
  let c = eu(e, Math.max(s, 0));
  n.length === 1 && (c = c.filter((f) => f !== t));
  const l = c.find(
    (f) => f.toLowerCase().startsWith(n.toLowerCase())
  );
  return l !== t ? l : void 0;
}
function ou(e, o) {
  const { x: t, y: r } = e;
  let n = !1;
  for (let s = 0, c = o.length - 1; s < o.length; c = s++) {
    const i = o[s], l = o[c], f = i.x, d = i.y, u = l.x, h = l.y;
    d > r != h > r && t < (u - f) * (r - d) / (h - d) + f && (n = !n);
  }
  return n;
}
function ru(e, o) {
  if (!o) return !1;
  const t = { x: e.clientX, y: e.clientY };
  return ou(t, o);
}
function Ye(e) {
  return (o) => o.pointerType === "mouse" ? e(o) : void 0;
}
var nu = qn, su = Po, au = Xn, cu = Zn, iu = To, lu = Jn, uu = jt, du = es, pu = os, fu = ns, hu = as, mu = cs, vu = is, gu = us, yu = ps, Lt = "DropdownMenu", [bu] = ae(
  Lt,
  [Wn]
), ne = Wn(), [xu, hs] = bu(Lt), ms = (e) => {
  const {
    __scopeDropdownMenu: o,
    children: t,
    dir: r,
    open: n,
    defaultOpen: s,
    onOpenChange: c,
    modal: i = !0
  } = e, l = ne(o), f = a.useRef(null), [d, u] = fe({
    prop: n,
    defaultProp: s ?? !1,
    onChange: c,
    caller: Lt
  });
  return /* @__PURE__ */ p.jsx(
    xu,
    {
      scope: o,
      triggerId: ie(),
      triggerRef: f,
      contentId: ie(),
      open: d,
      onOpenChange: u,
      onOpenToggle: a.useCallback(() => u((h) => !h), [u]),
      modal: i,
      children: /* @__PURE__ */ p.jsx(nu, { ...l, open: d, onOpenChange: u, dir: r, modal: i, children: t })
    }
  );
};
ms.displayName = Lt;
var vs = "DropdownMenuTrigger", gs = a.forwardRef(
  (e, o) => {
    const { __scopeDropdownMenu: t, disabled: r = !1, ...n } = e, s = hs(vs, t), c = ne(t), i = I(o, s.triggerRef);
    return /* @__PURE__ */ p.jsx(su, { asChild: !0, ...c, children: /* @__PURE__ */ p.jsx(
      M.button,
      {
        type: "button",
        id: s.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": s.open,
        "aria-controls": s.open ? s.contentId : void 0,
        "data-state": s.open ? "open" : "closed",
        "data-disabled": r ? "" : void 0,
        disabled: r,
        ...n,
        ref: i,
        onPointerDown: k(e.onPointerDown, (l) => {
          !r && l.button === 0 && l.ctrlKey === !1 && (s.onOpenToggle(), s.open || l.preventDefault());
        }),
        onKeyDown: k(e.onKeyDown, (l) => {
          r || (["Enter", " "].includes(l.key) && s.onOpenToggle(), l.key === "ArrowDown" && s.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(l.key) && l.preventDefault());
        })
      }
    ) });
  }
);
gs.displayName = vs;
var wu = "DropdownMenuPortal", ys = (e) => {
  const { __scopeDropdownMenu: o, ...t } = e, r = ne(o);
  return /* @__PURE__ */ p.jsx(au, { ...r, ...t });
};
ys.displayName = wu;
var bs = "DropdownMenuContent", xs = a.forwardRef(
  (e, o) => {
    const { __scopeDropdownMenu: t, ...r } = e, n = hs(bs, t), s = ne(t), c = a.useRef(!1);
    return /* @__PURE__ */ p.jsx(
      cu,
      {
        id: n.contentId,
        "aria-labelledby": n.triggerId,
        ...s,
        ...r,
        ref: o,
        onCloseAutoFocus: k(e.onCloseAutoFocus, (i) => {
          c.current || n.triggerRef.current?.focus(), c.current = !1, i.preventDefault();
        }),
        onInteractOutside: k(e.onInteractOutside, (i) => {
          const l = i.detail.originalEvent, f = l.button === 0 && l.ctrlKey === !0, d = l.button === 2 || f;
          (!n.modal || d) && (c.current = !0);
        }),
        style: {
          ...e.style,
          "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
          "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
          "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    );
  }
);
xs.displayName = bs;
var Cu = "DropdownMenuGroup", Su = a.forwardRef(
  (e, o) => {
    const { __scopeDropdownMenu: t, ...r } = e, n = ne(t);
    return /* @__PURE__ */ p.jsx(iu, { ...n, ...r, ref: o });
  }
);
Su.displayName = Cu;
var ku = "DropdownMenuLabel", ws = a.forwardRef(
  (e, o) => {
    const { __scopeDropdownMenu: t, ...r } = e, n = ne(t);
    return /* @__PURE__ */ p.jsx(lu, { ...n, ...r, ref: o });
  }
);
ws.displayName = ku;
var Pu = "DropdownMenuItem", Cs = a.forwardRef(
  (e, o) => {
    const { __scopeDropdownMenu: t, ...r } = e, n = ne(t);
    return /* @__PURE__ */ p.jsx(uu, { ...n, ...r, ref: o });
  }
);
Cs.displayName = Pu;
var Eu = "DropdownMenuCheckboxItem", Ss = a.forwardRef((e, o) => {
  const { __scopeDropdownMenu: t, ...r } = e, n = ne(t);
  return /* @__PURE__ */ p.jsx(du, { ...n, ...r, ref: o });
});
Ss.displayName = Eu;
var Ru = "DropdownMenuRadioGroup", Mu = a.forwardRef((e, o) => {
  const { __scopeDropdownMenu: t, ...r } = e, n = ne(t);
  return /* @__PURE__ */ p.jsx(pu, { ...n, ...r, ref: o });
});
Mu.displayName = Ru;
var Tu = "DropdownMenuRadioItem", ks = a.forwardRef((e, o) => {
  const { __scopeDropdownMenu: t, ...r } = e, n = ne(t);
  return /* @__PURE__ */ p.jsx(fu, { ...n, ...r, ref: o });
});
ks.displayName = Tu;
var _u = "DropdownMenuItemIndicator", Ps = a.forwardRef((e, o) => {
  const { __scopeDropdownMenu: t, ...r } = e, n = ne(t);
  return /* @__PURE__ */ p.jsx(hu, { ...n, ...r, ref: o });
});
Ps.displayName = _u;
var Au = "DropdownMenuSeparator", Es = a.forwardRef((e, o) => {
  const { __scopeDropdownMenu: t, ...r } = e, n = ne(t);
  return /* @__PURE__ */ p.jsx(mu, { ...n, ...r, ref: o });
});
Es.displayName = Au;
var Iu = "DropdownMenuArrow", Nu = a.forwardRef(
  (e, o) => {
    const { __scopeDropdownMenu: t, ...r } = e, n = ne(t);
    return /* @__PURE__ */ p.jsx(vu, { ...n, ...r, ref: o });
  }
);
Nu.displayName = Iu;
var Ou = "DropdownMenuSubTrigger", Rs = a.forwardRef((e, o) => {
  const { __scopeDropdownMenu: t, ...r } = e, n = ne(t);
  return /* @__PURE__ */ p.jsx(gu, { ...n, ...r, ref: o });
});
Rs.displayName = Ou;
var Du = "DropdownMenuSubContent", Ms = a.forwardRef((e, o) => {
  const { __scopeDropdownMenu: t, ...r } = e, n = ne(t);
  return /* @__PURE__ */ p.jsx(
    yu,
    {
      ...n,
      ...r,
      ref: o,
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
Ms.displayName = Du;
var sf = ms, af = gs, cf = ys, lf = xs, uf = ws, df = Cs, pf = Ss, ff = ks, hf = Ps, mf = Es, vf = Rs, gf = Ms, Ft = "Switch", [ju] = ae(Ft), [Lu, Io] = ju(Ft);
function Fu(e) {
  const {
    __scopeSwitch: o,
    checked: t,
    children: r,
    defaultChecked: n,
    disabled: s,
    form: c,
    name: i,
    onCheckedChange: l,
    required: f,
    value: d = "on",
    // @ts-expect-error
    internal_do_not_use_render: u
  } = e, [h, v] = fe({
    prop: t,
    defaultProp: n ?? !1,
    onChange: l,
    caller: Ft
  }), [g, m] = a.useState(null), [b, y] = a.useState(null), x = a.useRef(!1), w = g ? !!c || !!g.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), S = {
    checked: h,
    setChecked: v,
    disabled: s,
    control: g,
    setControl: m,
    name: i,
    form: c,
    value: d,
    hasConsumerStoppedPropagationRef: x,
    required: f,
    defaultChecked: n,
    isFormControl: w,
    bubbleInput: b,
    setBubbleInput: y
  };
  return /* @__PURE__ */ p.jsx(Lu, { scope: o, ...S, children: zu(u) ? u(S) : r });
}
var Ts = "SwitchTrigger", _s = a.forwardRef(
  ({ __scopeSwitch: e, onClick: o, ...t }, r) => {
    const {
      control: n,
      form: s,
      value: c,
      disabled: i,
      checked: l,
      required: f,
      setControl: d,
      setChecked: u,
      hasConsumerStoppedPropagationRef: h,
      isFormControl: v,
      bubbleInput: g
    } = Io(Ts, e), m = I(r, d), b = a.useRef(l);
    return a.useEffect(() => {
      const y = s ? n?.ownerDocument.getElementById(s) : n?.form;
      if (y instanceof HTMLFormElement) {
        const x = () => u(b.current);
        return y.addEventListener("reset", x), () => y.removeEventListener("reset", x);
      }
    }, [n, s, u]), /* @__PURE__ */ p.jsx(
      M.button,
      {
        type: "button",
        role: "switch",
        "aria-checked": l,
        "aria-required": f,
        "data-state": Os(l),
        "data-disabled": i ? "" : void 0,
        disabled: i,
        value: c,
        ...t,
        ref: m,
        onClick: k(o, (y) => {
          u((x) => !x), g && v && (h.current = y.isPropagationStopped(), h.current || y.stopPropagation());
        })
      }
    );
  }
);
_s.displayName = Ts;
var $u = a.forwardRef(
  (e, o) => {
    const {
      __scopeSwitch: t,
      name: r,
      checked: n,
      defaultChecked: s,
      required: c,
      disabled: i,
      value: l,
      onCheckedChange: f,
      form: d,
      ...u
    } = e;
    return /* @__PURE__ */ p.jsx(
      Fu,
      {
        __scopeSwitch: t,
        checked: n,
        defaultChecked: s,
        disabled: i,
        required: c,
        onCheckedChange: f,
        name: r,
        form: d,
        value: l,
        internal_do_not_use_render: ({ isFormControl: h }) => /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
          /* @__PURE__ */ p.jsx(
            _s,
            {
              ...u,
              ref: o,
              __scopeSwitch: t
            }
          ),
          h && /* @__PURE__ */ p.jsx(
            Ns,
            {
              __scopeSwitch: t
            }
          )
        ] })
      }
    );
  }
);
$u.displayName = Ft;
var As = "SwitchThumb", Hu = a.forwardRef(
  (e, o) => {
    const { __scopeSwitch: t, ...r } = e, n = Io(As, t);
    return /* @__PURE__ */ p.jsx(
      M.span,
      {
        "data-state": Os(n.checked),
        "data-disabled": n.disabled ? "" : void 0,
        ...r,
        ref: o
      }
    );
  }
);
Hu.displayName = As;
var Is = "SwitchBubbleInput", Ns = a.forwardRef(
  ({ __scopeSwitch: e, ...o }, t) => {
    const {
      control: r,
      hasConsumerStoppedPropagationRef: n,
      checked: s,
      defaultChecked: c,
      required: i,
      disabled: l,
      name: f,
      value: d,
      form: u,
      bubbleInput: h,
      setBubbleInput: v
    } = Io(Is, e), g = I(t, v), m = xo(s), b = co(r);
    a.useEffect(() => {
      const x = h;
      if (!x) return;
      const w = window.HTMLInputElement.prototype, P = Object.getOwnPropertyDescriptor(
        w,
        "checked"
      ).set, A = !n.current;
      if (m !== s && P) {
        const N = new Event("click", { bubbles: A });
        P.call(x, s), x.dispatchEvent(N);
      }
    }, [h, m, s, n]);
    const y = a.useRef(s);
    return /* @__PURE__ */ p.jsx(
      M.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: c ?? y.current,
        required: i,
        disabled: l,
        name: f,
        value: d,
        form: u,
        ...o,
        tabIndex: -1,
        ref: g,
        style: {
          ...o.style,
          ...b,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
Ns.displayName = Is;
function zu(e) {
  return typeof e == "function";
}
function Os(e) {
  return e ? "checked" : "unchecked";
}
var Vu = "Separator", Yo = "horizontal", Bu = ["horizontal", "vertical"], Ds = a.forwardRef((e, o) => {
  const { decorative: t, orientation: r = Yo, ...n } = e, s = Uu(r) ? r : Yo, i = t ? { role: "none" } : { "aria-orientation": s === "vertical" ? s : void 0, role: "separator" };
  return /* @__PURE__ */ p.jsx(
    M.div,
    {
      "data-orientation": s,
      ...i,
      ...n,
      ref: o
    }
  );
});
Ds.displayName = Vu;
function Uu(e) {
  return Bu.includes(e);
}
var yf = Ds;
export {
  vf as $,
  $i as A,
  Vi as B,
  Ju as C,
  vi as D,
  cl as E,
  Sd as F,
  il as G,
  Gi as H,
  Wi as I,
  Ji as J,
  ol as K,
  nl as L,
  al as M,
  sl as N,
  ul as O,
  Zu as P,
  Fi as Q,
  Yu as R,
  Xc as S,
  Xu as T,
  Hi as U,
  sd as V,
  tf as W,
  Yp as X,
  of as Y,
  rf as Z,
  ef as _,
  od as a,
  Md as a$,
  Cd as a0,
  gf as a1,
  cf as a2,
  lf as a3,
  df as a4,
  pf as a5,
  hf as a6,
  ff as a7,
  kd as a8,
  uf as a9,
  Ip as aA,
  Qd as aB,
  dd as aC,
  pp as aD,
  lp as aE,
  Kd as aF,
  Wp as aG,
  ld as aH,
  Hp as aI,
  qd as aJ,
  Cp as aK,
  _d as aL,
  mp as aM,
  $p as aN,
  Pp as aO,
  dp as aP,
  Yd as aQ,
  vp as aR,
  Nd as aS,
  yp as aT,
  _p as aU,
  Xp as aV,
  Vp as aW,
  pd as aX,
  qp as aY,
  cd as aZ,
  Gp as a_,
  mf as aa,
  sf as ab,
  af as ac,
  yd as ad,
  Ap as ae,
  fd as af,
  gd as ag,
  Tp as ah,
  wp as ai,
  Vd as aj,
  $u as ak,
  Hu as al,
  wd as am,
  yf as an,
  zd as ao,
  Lp as ap,
  kp as aq,
  vd as ar,
  Ud as as,
  Jd as at,
  Kp as au,
  np as av,
  rp as aw,
  Dd as ax,
  jd as ay,
  Mp as az,
  rd as b,
  Wd as b0,
  hd as b1,
  xp as b2,
  Dp as b3,
  bp as b4,
  Sp as b5,
  jp as b6,
  Bd as b7,
  Xd as b8,
  Up as b9,
  op as bA,
  Td as bB,
  Hd as bC,
  Op as bD,
  Gd as bE,
  md as bF,
  Ld as bG,
  Pd as bH,
  Ad as ba,
  Ed as bb,
  Np as bc,
  Id as bd,
  hp as be,
  Od as bf,
  Rd as bg,
  Fp as bh,
  tp as bi,
  id as bj,
  Zd as bk,
  Ep as bl,
  up as bm,
  zp as bn,
  ap as bo,
  sp as bp,
  ud as bq,
  $d as br,
  Fd as bs,
  ep as bt,
  Zp as bu,
  Jp as bv,
  fp as bw,
  Rp as bx,
  ip as by,
  cp as bz,
  Qu as c,
  ed as d,
  td as e,
  nd as f,
  ad as g,
  oi as h,
  ta as i,
  Wu as j,
  Ku as k,
  Qp as l,
  Bp as m,
  gp as n,
  xd as o,
  mi as p,
  bi as q,
  ki as r,
  Ci as s,
  qu as t,
  Si as u,
  pi as v,
  fi as w,
  Mi as x,
  Ti as y,
  bd as z
};
