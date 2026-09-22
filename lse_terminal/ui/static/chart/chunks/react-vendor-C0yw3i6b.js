function t1(e, t) {
  for (var r = 0; r < t.length; r++) {
    const i = t[r];
    if (typeof i != "string" && !Array.isArray(i)) {
      for (const o in i)
        if (o !== "default" && !(o in e)) {
          const a = Object.getOwnPropertyDescriptor(i, o);
          a && Object.defineProperty(e, o, a.get ? a : {
            enumerable: !0,
            get: () => i[o]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
function kf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var jh = { exports: {} }, ps = {}, Uh = { exports: {} }, le = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tu = Symbol.for("react.element"), n1 = Symbol.for("react.portal"), r1 = Symbol.for("react.fragment"), l1 = Symbol.for("react.strict_mode"), i1 = Symbol.for("react.profiler"), u1 = Symbol.for("react.provider"), o1 = Symbol.for("react.context"), s1 = Symbol.for("react.forward_ref"), a1 = Symbol.for("react.suspense"), c1 = Symbol.for("react.memo"), f1 = Symbol.for("react.lazy"), fm = Symbol.iterator;
function d1(e) {
  return e === null || typeof e != "object" ? null : (e = fm && e[fm] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Hh = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Bh = Object.assign, Wh = {};
function Bl(e, t, r) {
  this.props = e, this.context = t, this.refs = Wh, this.updater = r || Hh;
}
Bl.prototype.isReactComponent = {};
Bl.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Bl.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Qh() {
}
Qh.prototype = Bl.prototype;
function xf(e, t, r) {
  this.props = e, this.context = t, this.refs = Wh, this.updater = r || Hh;
}
var Ef = xf.prototype = new Qh();
Ef.constructor = xf;
Bh(Ef, Bl.prototype);
Ef.isPureReactComponent = !0;
var dm = Array.isArray, Vh = Object.prototype.hasOwnProperty, Cf = { current: null }, Yh = { key: !0, ref: !0, __self: !0, __source: !0 };
function Xh(e, t, r) {
  var i, o = {}, a = null, c = null;
  if (t != null) for (i in t.ref !== void 0 && (c = t.ref), t.key !== void 0 && (a = "" + t.key), t) Vh.call(t, i) && !Yh.hasOwnProperty(i) && (o[i] = t[i]);
  var p = arguments.length - 2;
  if (p === 1) o.children = r;
  else if (1 < p) {
    for (var m = Array(p), h = 0; h < p; h++) m[h] = arguments[h + 2];
    o.children = m;
  }
  if (e && e.defaultProps) for (i in p = e.defaultProps, p) o[i] === void 0 && (o[i] = p[i]);
  return { $$typeof: tu, type: e, key: a, ref: c, props: o, _owner: Cf.current };
}
function p1(e, t) {
  return { $$typeof: tu, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Pf(e) {
  return typeof e == "object" && e !== null && e.$$typeof === tu;
}
function m1(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(r) {
    return t[r];
  });
}
var pm = /\/+/g;
function Ya(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? m1("" + e.key) : t.toString(36);
}
function Co(e, t, r, i, o) {
  var a = typeof e;
  (a === "undefined" || a === "boolean") && (e = null);
  var c = !1;
  if (e === null) c = !0;
  else switch (a) {
    case "string":
    case "number":
      c = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case tu:
        case n1:
          c = !0;
      }
  }
  if (c) return c = e, o = o(c), e = i === "" ? "." + Ya(c, 0) : i, dm(o) ? (r = "", e != null && (r = e.replace(pm, "$&/") + "/"), Co(o, t, r, "", function(h) {
    return h;
  })) : o != null && (Pf(o) && (o = p1(o, r + (!o.key || c && c.key === o.key ? "" : ("" + o.key).replace(pm, "$&/") + "/") + e)), t.push(o)), 1;
  if (c = 0, i = i === "" ? "." : i + ":", dm(e)) for (var p = 0; p < e.length; p++) {
    a = e[p];
    var m = i + Ya(a, p);
    c += Co(a, t, r, m, o);
  }
  else if (m = d1(e), typeof m == "function") for (e = m.call(e), p = 0; !(a = e.next()).done; ) a = a.value, m = i + Ya(a, p++), c += Co(a, t, r, m, o);
  else if (a === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return c;
}
function no(e, t, r) {
  if (e == null) return e;
  var i = [], o = 0;
  return Co(e, i, "", "", function(a) {
    return t.call(r, a, o++);
  }), i;
}
function h1(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(r) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = r);
    }, function(r) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = r);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var at = { current: null }, Po = { transition: null }, v1 = { ReactCurrentDispatcher: at, ReactCurrentBatchConfig: Po, ReactCurrentOwner: Cf };
function Kh() {
  throw Error("act(...) is not supported in production builds of React.");
}
le.Children = { map: no, forEach: function(e, t, r) {
  no(e, function() {
    t.apply(this, arguments);
  }, r);
}, count: function(e) {
  var t = 0;
  return no(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return no(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Pf(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
le.Component = Bl;
le.Fragment = r1;
le.Profiler = i1;
le.PureComponent = xf;
le.StrictMode = l1;
le.Suspense = a1;
le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = v1;
le.act = Kh;
le.cloneElement = function(e, t, r) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var i = Bh({}, e.props), o = e.key, a = e.ref, c = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (a = t.ref, c = Cf.current), t.key !== void 0 && (o = "" + t.key), e.type && e.type.defaultProps) var p = e.type.defaultProps;
    for (m in t) Vh.call(t, m) && !Yh.hasOwnProperty(m) && (i[m] = t[m] === void 0 && p !== void 0 ? p[m] : t[m]);
  }
  var m = arguments.length - 2;
  if (m === 1) i.children = r;
  else if (1 < m) {
    p = Array(m);
    for (var h = 0; h < m; h++) p[h] = arguments[h + 2];
    i.children = p;
  }
  return { $$typeof: tu, type: e.type, key: o, ref: a, props: i, _owner: c };
};
le.createContext = function(e) {
  return e = { $$typeof: o1, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: u1, _context: e }, e.Consumer = e;
};
le.createElement = Xh;
le.createFactory = function(e) {
  var t = Xh.bind(null, e);
  return t.type = e, t;
};
le.createRef = function() {
  return { current: null };
};
le.forwardRef = function(e) {
  return { $$typeof: s1, render: e };
};
le.isValidElement = Pf;
le.lazy = function(e) {
  return { $$typeof: f1, _payload: { _status: -1, _result: e }, _init: h1 };
};
le.memo = function(e, t) {
  return { $$typeof: c1, type: e, compare: t === void 0 ? null : t };
};
le.startTransition = function(e) {
  var t = Po.transition;
  Po.transition = {};
  try {
    e();
  } finally {
    Po.transition = t;
  }
};
le.unstable_act = Kh;
le.useCallback = function(e, t) {
  return at.current.useCallback(e, t);
};
le.useContext = function(e) {
  return at.current.useContext(e);
};
le.useDebugValue = function() {
};
le.useDeferredValue = function(e) {
  return at.current.useDeferredValue(e);
};
le.useEffect = function(e, t) {
  return at.current.useEffect(e, t);
};
le.useId = function() {
  return at.current.useId();
};
le.useImperativeHandle = function(e, t, r) {
  return at.current.useImperativeHandle(e, t, r);
};
le.useInsertionEffect = function(e, t) {
  return at.current.useInsertionEffect(e, t);
};
le.useLayoutEffect = function(e, t) {
  return at.current.useLayoutEffect(e, t);
};
le.useMemo = function(e, t) {
  return at.current.useMemo(e, t);
};
le.useReducer = function(e, t, r) {
  return at.current.useReducer(e, t, r);
};
le.useRef = function(e) {
  return at.current.useRef(e);
};
le.useState = function(e) {
  return at.current.useState(e);
};
le.useSyncExternalStore = function(e, t, r) {
  return at.current.useSyncExternalStore(e, t, r);
};
le.useTransition = function() {
  return at.current.useTransition();
};
le.version = "18.3.1";
Uh.exports = le;
var Y = Uh.exports;
const g1 = /* @__PURE__ */ kf(Y), wk = /* @__PURE__ */ t1({
  __proto__: null,
  default: g1
}, [Y]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var y1 = Y, w1 = Symbol.for("react.element"), S1 = Symbol.for("react.fragment"), k1 = Object.prototype.hasOwnProperty, x1 = y1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, E1 = { key: !0, ref: !0, __self: !0, __source: !0 };
function Gh(e, t, r) {
  var i, o = {}, a = null, c = null;
  r !== void 0 && (a = "" + r), t.key !== void 0 && (a = "" + t.key), t.ref !== void 0 && (c = t.ref);
  for (i in t) k1.call(t, i) && !E1.hasOwnProperty(i) && (o[i] = t[i]);
  if (e && e.defaultProps) for (i in t = e.defaultProps, t) o[i] === void 0 && (o[i] = t[i]);
  return { $$typeof: w1, type: e, key: a, ref: c, props: o, _owner: x1.current };
}
ps.Fragment = S1;
ps.jsx = Gh;
ps.jsxs = Gh;
jh.exports = ps;
var Sk = jh.exports, Zh = { exports: {} }, Tt = {}, Jh = { exports: {} }, $h = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t(z, A) {
    var U = z.length;
    z.push(A);
    e: for (; 0 < U; ) {
      var q = U - 1 >>> 1, te = z[q];
      if (0 < o(te, A)) z[q] = A, z[U] = te, U = q;
      else break e;
    }
  }
  function r(z) {
    return z.length === 0 ? null : z[0];
  }
  function i(z) {
    if (z.length === 0) return null;
    var A = z[0], U = z.pop();
    if (U !== A) {
      z[0] = U;
      e: for (var q = 0, te = z.length, Mt = te >>> 1; q < Mt; ) {
        var Ue = 2 * (q + 1) - 1, Zt = z[Ue], He = Ue + 1, It = z[He];
        if (0 > o(Zt, U)) He < te && 0 > o(It, Zt) ? (z[q] = It, z[He] = U, q = He) : (z[q] = Zt, z[Ue] = U, q = Ue);
        else if (He < te && 0 > o(It, U)) z[q] = It, z[He] = U, q = He;
        else break e;
      }
    }
    return A;
  }
  function o(z, A) {
    var U = z.sortIndex - A.sortIndex;
    return U !== 0 ? U : z.id - A.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var a = performance;
    e.unstable_now = function() {
      return a.now();
    };
  } else {
    var c = Date, p = c.now();
    e.unstable_now = function() {
      return c.now() - p;
    };
  }
  var m = [], h = [], x = 1, k = null, S = 3, P = !1, N = !1, _ = !1, F = typeof setTimeout == "function" ? setTimeout : null, y = typeof clearTimeout == "function" ? clearTimeout : null, g = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function w(z) {
    for (var A = r(h); A !== null; ) {
      if (A.callback === null) i(h);
      else if (A.startTime <= z) i(h), A.sortIndex = A.expirationTime, t(m, A);
      else break;
      A = r(h);
    }
  }
  function L(z) {
    if (_ = !1, w(z), !N) if (r(m) !== null) N = !0, fe(M);
    else {
      var A = r(h);
      A !== null && Te(L, A.startTime - z);
    }
  }
  function M(z, A) {
    N = !1, _ && (_ = !1, y(B), B = -1), P = !0;
    var U = S;
    try {
      for (w(A), k = r(m); k !== null && (!(k.expirationTime > A) || z && !ue()); ) {
        var q = k.callback;
        if (typeof q == "function") {
          k.callback = null, S = k.priorityLevel;
          var te = q(k.expirationTime <= A);
          A = e.unstable_now(), typeof te == "function" ? k.callback = te : k === r(m) && i(m), w(A);
        } else i(m);
        k = r(m);
      }
      if (k !== null) var Mt = !0;
      else {
        var Ue = r(h);
        Ue !== null && Te(L, Ue.startTime - A), Mt = !1;
      }
      return Mt;
    } finally {
      k = null, S = U, P = !1;
    }
  }
  var I = !1, D = null, B = -1, $ = 5, V = -1;
  function ue() {
    return !(e.unstable_now() - V < $);
  }
  function we() {
    if (D !== null) {
      var z = e.unstable_now();
      V = z;
      var A = !0;
      try {
        A = D(!0, z);
      } finally {
        A ? ce() : (I = !1, D = null);
      }
    } else I = !1;
  }
  var ce;
  if (typeof g == "function") ce = function() {
    g(we);
  };
  else if (typeof MessageChannel < "u") {
    var Se = new MessageChannel(), De = Se.port2;
    Se.port1.onmessage = we, ce = function() {
      De.postMessage(null);
    };
  } else ce = function() {
    F(we, 0);
  };
  function fe(z) {
    D = z, I || (I = !0, ce());
  }
  function Te(z, A) {
    B = F(function() {
      z(e.unstable_now());
    }, A);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(z) {
    z.callback = null;
  }, e.unstable_continueExecution = function() {
    N || P || (N = !0, fe(M));
  }, e.unstable_forceFrameRate = function(z) {
    0 > z || 125 < z ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : $ = 0 < z ? Math.floor(1e3 / z) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return S;
  }, e.unstable_getFirstCallbackNode = function() {
    return r(m);
  }, e.unstable_next = function(z) {
    switch (S) {
      case 1:
      case 2:
      case 3:
        var A = 3;
        break;
      default:
        A = S;
    }
    var U = S;
    S = A;
    try {
      return z();
    } finally {
      S = U;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(z, A) {
    switch (z) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        z = 3;
    }
    var U = S;
    S = z;
    try {
      return A();
    } finally {
      S = U;
    }
  }, e.unstable_scheduleCallback = function(z, A, U) {
    var q = e.unstable_now();
    switch (typeof U == "object" && U !== null ? (U = U.delay, U = typeof U == "number" && 0 < U ? q + U : q) : U = q, z) {
      case 1:
        var te = -1;
        break;
      case 2:
        te = 250;
        break;
      case 5:
        te = 1073741823;
        break;
      case 4:
        te = 1e4;
        break;
      default:
        te = 5e3;
    }
    return te = U + te, z = { id: x++, callback: A, priorityLevel: z, startTime: U, expirationTime: te, sortIndex: -1 }, U > q ? (z.sortIndex = U, t(h, z), r(m) === null && z === r(h) && (_ ? (y(B), B = -1) : _ = !0, Te(L, U - q))) : (z.sortIndex = te, t(m, z), N || P || (N = !0, fe(M))), z;
  }, e.unstable_shouldYield = ue, e.unstable_wrapCallback = function(z) {
    var A = S;
    return function() {
      var U = S;
      S = A;
      try {
        return z.apply(this, arguments);
      } finally {
        S = U;
      }
    };
  };
})($h);
Jh.exports = $h;
var C1 = Jh.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var P1 = Y, Lt = C1;
function j(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 1; r < arguments.length; r++) t += "&args[]=" + encodeURIComponent(arguments[r]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var qh = /* @__PURE__ */ new Set(), Fi = {};
function Gr(e, t) {
  Il(e, t), Il(e + "Capture", t);
}
function Il(e, t) {
  for (Fi[e] = t, e = 0; e < t.length; e++) qh.add(t[e]);
}
var An = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Pc = Object.prototype.hasOwnProperty, _1 = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, mm = {}, hm = {};
function z1(e) {
  return Pc.call(hm, e) ? !0 : Pc.call(mm, e) ? !1 : _1.test(e) ? hm[e] = !0 : (mm[e] = !0, !1);
}
function N1(e, t, r, i) {
  if (r !== null && r.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return i ? !1 : r !== null ? !r.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function R1(e, t, r, i) {
  if (t === null || typeof t > "u" || N1(e, t, r, i)) return !0;
  if (i) return !1;
  if (r !== null) switch (r.type) {
    case 3:
      return !t;
    case 4:
      return t === !1;
    case 5:
      return isNaN(t);
    case 6:
      return isNaN(t) || 1 > t;
  }
  return !1;
}
function ct(e, t, r, i, o, a, c) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = i, this.attributeNamespace = o, this.mustUseProperty = r, this.propertyName = e, this.type = t, this.sanitizeURL = a, this.removeEmptyString = c;
}
var Ze = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  Ze[e] = new ct(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  Ze[t] = new ct(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  Ze[e] = new ct(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  Ze[e] = new ct(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  Ze[e] = new ct(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  Ze[e] = new ct(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  Ze[e] = new ct(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  Ze[e] = new ct(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  Ze[e] = new ct(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var _f = /[\-:]([a-z])/g;
function zf(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    _f,
    zf
  );
  Ze[t] = new ct(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(_f, zf);
  Ze[t] = new ct(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(_f, zf);
  Ze[t] = new ct(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  Ze[e] = new ct(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Ze.xlinkHref = new ct("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  Ze[e] = new ct(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Nf(e, t, r, i) {
  var o = Ze.hasOwnProperty(t) ? Ze[t] : null;
  (o !== null ? o.type !== 0 : i || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (R1(t, r, o, i) && (r = null), i || o === null ? z1(t) && (r === null ? e.removeAttribute(t) : e.setAttribute(t, "" + r)) : o.mustUseProperty ? e[o.propertyName] = r === null ? o.type === 3 ? !1 : "" : r : (t = o.attributeName, i = o.attributeNamespace, r === null ? e.removeAttribute(t) : (o = o.type, r = o === 3 || o === 4 && r === !0 ? "" : "" + r, i ? e.setAttributeNS(i, t, r) : e.setAttribute(t, r))));
}
var Wn = P1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ro = Symbol.for("react.element"), ml = Symbol.for("react.portal"), hl = Symbol.for("react.fragment"), Rf = Symbol.for("react.strict_mode"), _c = Symbol.for("react.profiler"), bh = Symbol.for("react.provider"), ev = Symbol.for("react.context"), Lf = Symbol.for("react.forward_ref"), zc = Symbol.for("react.suspense"), Nc = Symbol.for("react.suspense_list"), Tf = Symbol.for("react.memo"), tr = Symbol.for("react.lazy"), tv = Symbol.for("react.offscreen"), vm = Symbol.iterator;
function hi(e) {
  return e === null || typeof e != "object" ? null : (e = vm && e[vm] || e["@@iterator"], typeof e == "function" ? e : null);
}
var _e = Object.assign, Xa;
function Ei(e) {
  if (Xa === void 0) try {
    throw Error();
  } catch (r) {
    var t = r.stack.trim().match(/\n( *(at )?)/);
    Xa = t && t[1] || "";
  }
  return `
` + Xa + e;
}
var Ka = !1;
function Ga(e, t) {
  if (!e || Ka) return "";
  Ka = !0;
  var r = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t) if (t = function() {
      throw Error();
    }, Object.defineProperty(t.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(t, []);
      } catch (h) {
        var i = h;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (h) {
        i = h;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (h) {
        i = h;
      }
      e();
    }
  } catch (h) {
    if (h && i && typeof h.stack == "string") {
      for (var o = h.stack.split(`
`), a = i.stack.split(`
`), c = o.length - 1, p = a.length - 1; 1 <= c && 0 <= p && o[c] !== a[p]; ) p--;
      for (; 1 <= c && 0 <= p; c--, p--) if (o[c] !== a[p]) {
        if (c !== 1 || p !== 1)
          do
            if (c--, p--, 0 > p || o[c] !== a[p]) {
              var m = `
` + o[c].replace(" at new ", " at ");
              return e.displayName && m.includes("<anonymous>") && (m = m.replace("<anonymous>", e.displayName)), m;
            }
          while (1 <= c && 0 <= p);
        break;
      }
    }
  } finally {
    Ka = !1, Error.prepareStackTrace = r;
  }
  return (e = e ? e.displayName || e.name : "") ? Ei(e) : "";
}
function L1(e) {
  switch (e.tag) {
    case 5:
      return Ei(e.type);
    case 16:
      return Ei("Lazy");
    case 13:
      return Ei("Suspense");
    case 19:
      return Ei("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Ga(e.type, !1), e;
    case 11:
      return e = Ga(e.type.render, !1), e;
    case 1:
      return e = Ga(e.type, !0), e;
    default:
      return "";
  }
}
function Rc(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case hl:
      return "Fragment";
    case ml:
      return "Portal";
    case _c:
      return "Profiler";
    case Rf:
      return "StrictMode";
    case zc:
      return "Suspense";
    case Nc:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case ev:
      return (e.displayName || "Context") + ".Consumer";
    case bh:
      return (e._context.displayName || "Context") + ".Provider";
    case Lf:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Tf:
      return t = e.displayName || null, t !== null ? t : Rc(e.type) || "Memo";
    case tr:
      t = e._payload, e = e._init;
      try {
        return Rc(e(t));
      } catch {
      }
  }
  return null;
}
function T1(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Rc(t);
    case 8:
      return t === Rf ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function hr(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function nv(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function O1(e) {
  var t = nv(e) ? "checked" : "value", r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), i = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
    var o = r.get, a = r.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return o.call(this);
    }, set: function(c) {
      i = "" + c, a.call(this, c);
    } }), Object.defineProperty(e, t, { enumerable: r.enumerable }), { getValue: function() {
      return i;
    }, setValue: function(c) {
      i = "" + c;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function lo(e) {
  e._valueTracker || (e._valueTracker = O1(e));
}
function rv(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var r = t.getValue(), i = "";
  return e && (i = nv(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== r ? (t.setValue(e), !0) : !1;
}
function Uo(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Lc(e, t) {
  var r = t.checked;
  return _e({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: r ?? e._wrapperState.initialChecked });
}
function gm(e, t) {
  var r = t.defaultValue == null ? "" : t.defaultValue, i = t.checked != null ? t.checked : t.defaultChecked;
  r = hr(t.value != null ? t.value : r), e._wrapperState = { initialChecked: i, initialValue: r, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function lv(e, t) {
  t = t.checked, t != null && Nf(e, "checked", t, !1);
}
function Tc(e, t) {
  lv(e, t);
  var r = hr(t.value), i = t.type;
  if (r != null) i === "number" ? (r === 0 && e.value === "" || e.value != r) && (e.value = "" + r) : e.value !== "" + r && (e.value = "" + r);
  else if (i === "submit" || i === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Oc(e, t.type, r) : t.hasOwnProperty("defaultValue") && Oc(e, t.type, hr(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function ym(e, t, r) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var i = t.type;
    if (!(i !== "submit" && i !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, r || t === e.value || (e.value = t), e.defaultValue = t;
  }
  r = e.name, r !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, r !== "" && (e.name = r);
}
function Oc(e, t, r) {
  (t !== "number" || Uo(e.ownerDocument) !== e) && (r == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + r && (e.defaultValue = "" + r));
}
var Ci = Array.isArray;
function _l(e, t, r, i) {
  if (e = e.options, t) {
    t = {};
    for (var o = 0; o < r.length; o++) t["$" + r[o]] = !0;
    for (r = 0; r < e.length; r++) o = t.hasOwnProperty("$" + e[r].value), e[r].selected !== o && (e[r].selected = o), o && i && (e[r].defaultSelected = !0);
  } else {
    for (r = "" + hr(r), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === r) {
        e[o].selected = !0, i && (e[o].defaultSelected = !0);
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function Mc(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(j(91));
  return _e({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function wm(e, t) {
  var r = t.value;
  if (r == null) {
    if (r = t.children, t = t.defaultValue, r != null) {
      if (t != null) throw Error(j(92));
      if (Ci(r)) {
        if (1 < r.length) throw Error(j(93));
        r = r[0];
      }
      t = r;
    }
    t == null && (t = ""), r = t;
  }
  e._wrapperState = { initialValue: hr(r) };
}
function iv(e, t) {
  var r = hr(t.value), i = hr(t.defaultValue);
  r != null && (r = "" + r, r !== e.value && (e.value = r), t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)), i != null && (e.defaultValue = "" + i);
}
function Sm(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function uv(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Ic(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? uv(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var io, ov = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, r, i, o) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, r, i, o);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (io = io || document.createElement("div"), io.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = io.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Ai(e, t) {
  if (t) {
    var r = e.firstChild;
    if (r && r === e.lastChild && r.nodeType === 3) {
      r.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var zi = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, M1 = ["Webkit", "ms", "Moz", "O"];
Object.keys(zi).forEach(function(e) {
  M1.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), zi[t] = zi[e];
  });
});
function sv(e, t, r) {
  return t == null || typeof t == "boolean" || t === "" ? "" : r || typeof t != "number" || t === 0 || zi.hasOwnProperty(e) && zi[e] ? ("" + t).trim() : t + "px";
}
function av(e, t) {
  e = e.style;
  for (var r in t) if (t.hasOwnProperty(r)) {
    var i = r.indexOf("--") === 0, o = sv(r, t[r], i);
    r === "float" && (r = "cssFloat"), i ? e.setProperty(r, o) : e[r] = o;
  }
}
var I1 = _e({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Dc(e, t) {
  if (t) {
    if (I1[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(j(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(j(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(j(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(j(62));
  }
}
function Fc(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Ac = null;
function Of(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var jc = null, zl = null, Nl = null;
function km(e) {
  if (e = lu(e)) {
    if (typeof jc != "function") throw Error(j(280));
    var t = e.stateNode;
    t && (t = ys(t), jc(e.stateNode, e.type, t));
  }
}
function cv(e) {
  zl ? Nl ? Nl.push(e) : Nl = [e] : zl = e;
}
function fv() {
  if (zl) {
    var e = zl, t = Nl;
    if (Nl = zl = null, km(e), t) for (e = 0; e < t.length; e++) km(t[e]);
  }
}
function dv(e, t) {
  return e(t);
}
function pv() {
}
var Za = !1;
function mv(e, t, r) {
  if (Za) return e(t, r);
  Za = !0;
  try {
    return dv(e, t, r);
  } finally {
    Za = !1, (zl !== null || Nl !== null) && (pv(), fv());
  }
}
function ji(e, t) {
  var r = e.stateNode;
  if (r === null) return null;
  var i = ys(r);
  if (i === null) return null;
  r = i[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (i = !i.disabled) || (e = e.type, i = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !i;
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (r && typeof r != "function") throw Error(j(231, t, typeof r));
  return r;
}
var Uc = !1;
if (An) try {
  var vi = {};
  Object.defineProperty(vi, "passive", { get: function() {
    Uc = !0;
  } }), window.addEventListener("test", vi, vi), window.removeEventListener("test", vi, vi);
} catch {
  Uc = !1;
}
function D1(e, t, r, i, o, a, c, p, m) {
  var h = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(r, h);
  } catch (x) {
    this.onError(x);
  }
}
var Ni = !1, Ho = null, Bo = !1, Hc = null, F1 = { onError: function(e) {
  Ni = !0, Ho = e;
} };
function A1(e, t, r, i, o, a, c, p, m) {
  Ni = !1, Ho = null, D1.apply(F1, arguments);
}
function j1(e, t, r, i, o, a, c, p, m) {
  if (A1.apply(this, arguments), Ni) {
    if (Ni) {
      var h = Ho;
      Ni = !1, Ho = null;
    } else throw Error(j(198));
    Bo || (Bo = !0, Hc = h);
  }
}
function Zr(e) {
  var t = e, r = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do
      t = e, t.flags & 4098 && (r = t.return), e = t.return;
    while (e);
  }
  return t.tag === 3 ? r : null;
}
function hv(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function xm(e) {
  if (Zr(e) !== e) throw Error(j(188));
}
function U1(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Zr(e), t === null) throw Error(j(188));
    return t !== e ? null : e;
  }
  for (var r = e, i = t; ; ) {
    var o = r.return;
    if (o === null) break;
    var a = o.alternate;
    if (a === null) {
      if (i = o.return, i !== null) {
        r = i;
        continue;
      }
      break;
    }
    if (o.child === a.child) {
      for (a = o.child; a; ) {
        if (a === r) return xm(o), e;
        if (a === i) return xm(o), t;
        a = a.sibling;
      }
      throw Error(j(188));
    }
    if (r.return !== i.return) r = o, i = a;
    else {
      for (var c = !1, p = o.child; p; ) {
        if (p === r) {
          c = !0, r = o, i = a;
          break;
        }
        if (p === i) {
          c = !0, i = o, r = a;
          break;
        }
        p = p.sibling;
      }
      if (!c) {
        for (p = a.child; p; ) {
          if (p === r) {
            c = !0, r = a, i = o;
            break;
          }
          if (p === i) {
            c = !0, i = a, r = o;
            break;
          }
          p = p.sibling;
        }
        if (!c) throw Error(j(189));
      }
    }
    if (r.alternate !== i) throw Error(j(190));
  }
  if (r.tag !== 3) throw Error(j(188));
  return r.stateNode.current === r ? e : t;
}
function vv(e) {
  return e = U1(e), e !== null ? gv(e) : null;
}
function gv(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = gv(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var yv = Lt.unstable_scheduleCallback, Em = Lt.unstable_cancelCallback, H1 = Lt.unstable_shouldYield, B1 = Lt.unstable_requestPaint, Le = Lt.unstable_now, W1 = Lt.unstable_getCurrentPriorityLevel, Mf = Lt.unstable_ImmediatePriority, wv = Lt.unstable_UserBlockingPriority, Wo = Lt.unstable_NormalPriority, Q1 = Lt.unstable_LowPriority, Sv = Lt.unstable_IdlePriority, ms = null, Sn = null;
function V1(e) {
  if (Sn && typeof Sn.onCommitFiberRoot == "function") try {
    Sn.onCommitFiberRoot(ms, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var ln = Math.clz32 ? Math.clz32 : K1, Y1 = Math.log, X1 = Math.LN2;
function K1(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Y1(e) / X1 | 0) | 0;
}
var uo = 64, oo = 4194304;
function Pi(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Qo(e, t) {
  var r = e.pendingLanes;
  if (r === 0) return 0;
  var i = 0, o = e.suspendedLanes, a = e.pingedLanes, c = r & 268435455;
  if (c !== 0) {
    var p = c & ~o;
    p !== 0 ? i = Pi(p) : (a &= c, a !== 0 && (i = Pi(a)));
  } else c = r & ~o, c !== 0 ? i = Pi(c) : a !== 0 && (i = Pi(a));
  if (i === 0) return 0;
  if (t !== 0 && t !== i && !(t & o) && (o = i & -i, a = t & -t, o >= a || o === 16 && (a & 4194240) !== 0)) return t;
  if (i & 4 && (i |= r & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= i; 0 < t; ) r = 31 - ln(t), o = 1 << r, i |= e[r], t &= ~o;
  return i;
}
function G1(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Z1(e, t) {
  for (var r = e.suspendedLanes, i = e.pingedLanes, o = e.expirationTimes, a = e.pendingLanes; 0 < a; ) {
    var c = 31 - ln(a), p = 1 << c, m = o[c];
    m === -1 ? (!(p & r) || p & i) && (o[c] = G1(p, t)) : m <= t && (e.expiredLanes |= p), a &= ~p;
  }
}
function Bc(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function kv() {
  var e = uo;
  return uo <<= 1, !(uo & 4194240) && (uo = 64), e;
}
function Ja(e) {
  for (var t = [], r = 0; 31 > r; r++) t.push(e);
  return t;
}
function nu(e, t, r) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - ln(t), e[t] = r;
}
function J1(e, t) {
  var r = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var i = e.eventTimes;
  for (e = e.expirationTimes; 0 < r; ) {
    var o = 31 - ln(r), a = 1 << o;
    t[o] = 0, i[o] = -1, e[o] = -1, r &= ~a;
  }
}
function If(e, t) {
  var r = e.entangledLanes |= t;
  for (e = e.entanglements; r; ) {
    var i = 31 - ln(r), o = 1 << i;
    o & t | e[i] & t && (e[i] |= t), r &= ~o;
  }
}
var de = 0;
function xv(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Ev, Df, Cv, Pv, _v, Wc = !1, so = [], or = null, sr = null, ar = null, Ui = /* @__PURE__ */ new Map(), Hi = /* @__PURE__ */ new Map(), rr = [], $1 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Cm(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      or = null;
      break;
    case "dragenter":
    case "dragleave":
      sr = null;
      break;
    case "mouseover":
    case "mouseout":
      ar = null;
      break;
    case "pointerover":
    case "pointerout":
      Ui.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Hi.delete(t.pointerId);
  }
}
function gi(e, t, r, i, o, a) {
  return e === null || e.nativeEvent !== a ? (e = { blockedOn: t, domEventName: r, eventSystemFlags: i, nativeEvent: a, targetContainers: [o] }, t !== null && (t = lu(t), t !== null && Df(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, o !== null && t.indexOf(o) === -1 && t.push(o), e);
}
function q1(e, t, r, i, o) {
  switch (t) {
    case "focusin":
      return or = gi(or, e, t, r, i, o), !0;
    case "dragenter":
      return sr = gi(sr, e, t, r, i, o), !0;
    case "mouseover":
      return ar = gi(ar, e, t, r, i, o), !0;
    case "pointerover":
      var a = o.pointerId;
      return Ui.set(a, gi(Ui.get(a) || null, e, t, r, i, o)), !0;
    case "gotpointercapture":
      return a = o.pointerId, Hi.set(a, gi(Hi.get(a) || null, e, t, r, i, o)), !0;
  }
  return !1;
}
function zv(e) {
  var t = Fr(e.target);
  if (t !== null) {
    var r = Zr(t);
    if (r !== null) {
      if (t = r.tag, t === 13) {
        if (t = hv(r), t !== null) {
          e.blockedOn = t, _v(e.priority, function() {
            Cv(r);
          });
          return;
        }
      } else if (t === 3 && r.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function _o(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var r = Qc(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (r === null) {
      r = e.nativeEvent;
      var i = new r.constructor(r.type, r);
      Ac = i, r.target.dispatchEvent(i), Ac = null;
    } else return t = lu(r), t !== null && Df(t), e.blockedOn = r, !1;
    t.shift();
  }
  return !0;
}
function Pm(e, t, r) {
  _o(e) && r.delete(t);
}
function b1() {
  Wc = !1, or !== null && _o(or) && (or = null), sr !== null && _o(sr) && (sr = null), ar !== null && _o(ar) && (ar = null), Ui.forEach(Pm), Hi.forEach(Pm);
}
function yi(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Wc || (Wc = !0, Lt.unstable_scheduleCallback(Lt.unstable_NormalPriority, b1)));
}
function Bi(e) {
  function t(o) {
    return yi(o, e);
  }
  if (0 < so.length) {
    yi(so[0], e);
    for (var r = 1; r < so.length; r++) {
      var i = so[r];
      i.blockedOn === e && (i.blockedOn = null);
    }
  }
  for (or !== null && yi(or, e), sr !== null && yi(sr, e), ar !== null && yi(ar, e), Ui.forEach(t), Hi.forEach(t), r = 0; r < rr.length; r++) i = rr[r], i.blockedOn === e && (i.blockedOn = null);
  for (; 0 < rr.length && (r = rr[0], r.blockedOn === null); ) zv(r), r.blockedOn === null && rr.shift();
}
var Rl = Wn.ReactCurrentBatchConfig, Vo = !0;
function ew(e, t, r, i) {
  var o = de, a = Rl.transition;
  Rl.transition = null;
  try {
    de = 1, Ff(e, t, r, i);
  } finally {
    de = o, Rl.transition = a;
  }
}
function tw(e, t, r, i) {
  var o = de, a = Rl.transition;
  Rl.transition = null;
  try {
    de = 4, Ff(e, t, r, i);
  } finally {
    de = o, Rl.transition = a;
  }
}
function Ff(e, t, r, i) {
  if (Vo) {
    var o = Qc(e, t, r, i);
    if (o === null) uc(e, t, i, Yo, r), Cm(e, i);
    else if (q1(o, e, t, r, i)) i.stopPropagation();
    else if (Cm(e, i), t & 4 && -1 < $1.indexOf(e)) {
      for (; o !== null; ) {
        var a = lu(o);
        if (a !== null && Ev(a), a = Qc(e, t, r, i), a === null && uc(e, t, i, Yo, r), a === o) break;
        o = a;
      }
      o !== null && i.stopPropagation();
    } else uc(e, t, i, null, r);
  }
}
var Yo = null;
function Qc(e, t, r, i) {
  if (Yo = null, e = Of(i), e = Fr(e), e !== null) if (t = Zr(e), t === null) e = null;
  else if (r = t.tag, r === 13) {
    if (e = hv(t), e !== null) return e;
    e = null;
  } else if (r === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Yo = e, null;
}
function Nv(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (W1()) {
        case Mf:
          return 1;
        case wv:
          return 4;
        case Wo:
        case Q1:
          return 16;
        case Sv:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ir = null, Af = null, zo = null;
function Rv() {
  if (zo) return zo;
  var e, t = Af, r = t.length, i, o = "value" in ir ? ir.value : ir.textContent, a = o.length;
  for (e = 0; e < r && t[e] === o[e]; e++) ;
  var c = r - e;
  for (i = 1; i <= c && t[r - i] === o[a - i]; i++) ;
  return zo = o.slice(e, 1 < i ? 1 - i : void 0);
}
function No(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function ao() {
  return !0;
}
function _m() {
  return !1;
}
function Ot(e) {
  function t(r, i, o, a, c) {
    this._reactName = r, this._targetInst = o, this.type = i, this.nativeEvent = a, this.target = c, this.currentTarget = null;
    for (var p in e) e.hasOwnProperty(p) && (r = e[p], this[p] = r ? r(a) : a[p]);
    return this.isDefaultPrevented = (a.defaultPrevented != null ? a.defaultPrevented : a.returnValue === !1) ? ao : _m, this.isPropagationStopped = _m, this;
  }
  return _e(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var r = this.nativeEvent;
    r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = ao);
  }, stopPropagation: function() {
    var r = this.nativeEvent;
    r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = ao);
  }, persist: function() {
  }, isPersistent: ao }), t;
}
var Wl = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, jf = Ot(Wl), ru = _e({}, Wl, { view: 0, detail: 0 }), nw = Ot(ru), $a, qa, wi, hs = _e({}, ru, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Uf, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== wi && (wi && e.type === "mousemove" ? ($a = e.screenX - wi.screenX, qa = e.screenY - wi.screenY) : qa = $a = 0, wi = e), $a);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : qa;
} }), zm = Ot(hs), rw = _e({}, hs, { dataTransfer: 0 }), lw = Ot(rw), iw = _e({}, ru, { relatedTarget: 0 }), ba = Ot(iw), uw = _e({}, Wl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), ow = Ot(uw), sw = _e({}, Wl, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), aw = Ot(sw), cw = _e({}, Wl, { data: 0 }), Nm = Ot(cw), fw = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, dw = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, pw = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function mw(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = pw[e]) ? !!t[e] : !1;
}
function Uf() {
  return mw;
}
var hw = _e({}, ru, { key: function(e) {
  if (e.key) {
    var t = fw[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = No(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? dw[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Uf, charCode: function(e) {
  return e.type === "keypress" ? No(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? No(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), vw = Ot(hw), gw = _e({}, hs, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Rm = Ot(gw), yw = _e({}, ru, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Uf }), ww = Ot(yw), Sw = _e({}, Wl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), kw = Ot(Sw), xw = _e({}, hs, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Ew = Ot(xw), Cw = [9, 13, 27, 32], Hf = An && "CompositionEvent" in window, Ri = null;
An && "documentMode" in document && (Ri = document.documentMode);
var Pw = An && "TextEvent" in window && !Ri, Lv = An && (!Hf || Ri && 8 < Ri && 11 >= Ri), Lm = " ", Tm = !1;
function Tv(e, t) {
  switch (e) {
    case "keyup":
      return Cw.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Ov(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var vl = !1;
function _w(e, t) {
  switch (e) {
    case "compositionend":
      return Ov(t);
    case "keypress":
      return t.which !== 32 ? null : (Tm = !0, Lm);
    case "textInput":
      return e = t.data, e === Lm && Tm ? null : e;
    default:
      return null;
  }
}
function zw(e, t) {
  if (vl) return e === "compositionend" || !Hf && Tv(e, t) ? (e = Rv(), zo = Af = ir = null, vl = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Lv && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Nw = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Om(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Nw[e.type] : t === "textarea";
}
function Mv(e, t, r, i) {
  cv(i), t = Xo(t, "onChange"), 0 < t.length && (r = new jf("onChange", "change", null, r, i), e.push({ event: r, listeners: t }));
}
var Li = null, Wi = null;
function Rw(e) {
  Vv(e, 0);
}
function vs(e) {
  var t = wl(e);
  if (rv(t)) return e;
}
function Lw(e, t) {
  if (e === "change") return t;
}
var Iv = !1;
if (An) {
  var ec;
  if (An) {
    var tc = "oninput" in document;
    if (!tc) {
      var Mm = document.createElement("div");
      Mm.setAttribute("oninput", "return;"), tc = typeof Mm.oninput == "function";
    }
    ec = tc;
  } else ec = !1;
  Iv = ec && (!document.documentMode || 9 < document.documentMode);
}
function Im() {
  Li && (Li.detachEvent("onpropertychange", Dv), Wi = Li = null);
}
function Dv(e) {
  if (e.propertyName === "value" && vs(Wi)) {
    var t = [];
    Mv(t, Wi, e, Of(e)), mv(Rw, t);
  }
}
function Tw(e, t, r) {
  e === "focusin" ? (Im(), Li = t, Wi = r, Li.attachEvent("onpropertychange", Dv)) : e === "focusout" && Im();
}
function Ow(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return vs(Wi);
}
function Mw(e, t) {
  if (e === "click") return vs(t);
}
function Iw(e, t) {
  if (e === "input" || e === "change") return vs(t);
}
function Dw(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var on = typeof Object.is == "function" ? Object.is : Dw;
function Qi(e, t) {
  if (on(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var r = Object.keys(e), i = Object.keys(t);
  if (r.length !== i.length) return !1;
  for (i = 0; i < r.length; i++) {
    var o = r[i];
    if (!Pc.call(t, o) || !on(e[o], t[o])) return !1;
  }
  return !0;
}
function Dm(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Fm(e, t) {
  var r = Dm(e);
  e = 0;
  for (var i; r; ) {
    if (r.nodeType === 3) {
      if (i = e + r.textContent.length, e <= t && i >= t) return { node: r, offset: t - e };
      e = i;
    }
    e: {
      for (; r; ) {
        if (r.nextSibling) {
          r = r.nextSibling;
          break e;
        }
        r = r.parentNode;
      }
      r = void 0;
    }
    r = Dm(r);
  }
}
function Fv(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Fv(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Av() {
  for (var e = window, t = Uo(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var r = typeof t.contentWindow.location.href == "string";
    } catch {
      r = !1;
    }
    if (r) e = t.contentWindow;
    else break;
    t = Uo(e.document);
  }
  return t;
}
function Bf(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Fw(e) {
  var t = Av(), r = e.focusedElem, i = e.selectionRange;
  if (t !== r && r && r.ownerDocument && Fv(r.ownerDocument.documentElement, r)) {
    if (i !== null && Bf(r)) {
      if (t = i.start, e = i.end, e === void 0 && (e = t), "selectionStart" in r) r.selectionStart = t, r.selectionEnd = Math.min(e, r.value.length);
      else if (e = (t = r.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var o = r.textContent.length, a = Math.min(i.start, o);
        i = i.end === void 0 ? a : Math.min(i.end, o), !e.extend && a > i && (o = i, i = a, a = o), o = Fm(r, a);
        var c = Fm(
          r,
          i
        );
        o && c && (e.rangeCount !== 1 || e.anchorNode !== o.node || e.anchorOffset !== o.offset || e.focusNode !== c.node || e.focusOffset !== c.offset) && (t = t.createRange(), t.setStart(o.node, o.offset), e.removeAllRanges(), a > i ? (e.addRange(t), e.extend(c.node, c.offset)) : (t.setEnd(c.node, c.offset), e.addRange(t)));
      }
    }
    for (t = [], e = r; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof r.focus == "function" && r.focus(), r = 0; r < t.length; r++) e = t[r], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var Aw = An && "documentMode" in document && 11 >= document.documentMode, gl = null, Vc = null, Ti = null, Yc = !1;
function Am(e, t, r) {
  var i = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
  Yc || gl == null || gl !== Uo(i) || (i = gl, "selectionStart" in i && Bf(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = { anchorNode: i.anchorNode, anchorOffset: i.anchorOffset, focusNode: i.focusNode, focusOffset: i.focusOffset }), Ti && Qi(Ti, i) || (Ti = i, i = Xo(Vc, "onSelect"), 0 < i.length && (t = new jf("onSelect", "select", null, t, r), e.push({ event: t, listeners: i }), t.target = gl)));
}
function co(e, t) {
  var r = {};
  return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit" + e] = "webkit" + t, r["Moz" + e] = "moz" + t, r;
}
var yl = { animationend: co("Animation", "AnimationEnd"), animationiteration: co("Animation", "AnimationIteration"), animationstart: co("Animation", "AnimationStart"), transitionend: co("Transition", "TransitionEnd") }, nc = {}, jv = {};
An && (jv = document.createElement("div").style, "AnimationEvent" in window || (delete yl.animationend.animation, delete yl.animationiteration.animation, delete yl.animationstart.animation), "TransitionEvent" in window || delete yl.transitionend.transition);
function gs(e) {
  if (nc[e]) return nc[e];
  if (!yl[e]) return e;
  var t = yl[e], r;
  for (r in t) if (t.hasOwnProperty(r) && r in jv) return nc[e] = t[r];
  return e;
}
var Uv = gs("animationend"), Hv = gs("animationiteration"), Bv = gs("animationstart"), Wv = gs("transitionend"), Qv = /* @__PURE__ */ new Map(), jm = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function wr(e, t) {
  Qv.set(e, t), Gr(t, [e]);
}
for (var rc = 0; rc < jm.length; rc++) {
  var lc = jm[rc], jw = lc.toLowerCase(), Uw = lc[0].toUpperCase() + lc.slice(1);
  wr(jw, "on" + Uw);
}
wr(Uv, "onAnimationEnd");
wr(Hv, "onAnimationIteration");
wr(Bv, "onAnimationStart");
wr("dblclick", "onDoubleClick");
wr("focusin", "onFocus");
wr("focusout", "onBlur");
wr(Wv, "onTransitionEnd");
Il("onMouseEnter", ["mouseout", "mouseover"]);
Il("onMouseLeave", ["mouseout", "mouseover"]);
Il("onPointerEnter", ["pointerout", "pointerover"]);
Il("onPointerLeave", ["pointerout", "pointerover"]);
Gr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Gr("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Gr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Gr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Gr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Gr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var _i = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Hw = new Set("cancel close invalid load scroll toggle".split(" ").concat(_i));
function Um(e, t, r) {
  var i = e.type || "unknown-event";
  e.currentTarget = r, j1(i, t, void 0, e), e.currentTarget = null;
}
function Vv(e, t) {
  t = (t & 4) !== 0;
  for (var r = 0; r < e.length; r++) {
    var i = e[r], o = i.event;
    i = i.listeners;
    e: {
      var a = void 0;
      if (t) for (var c = i.length - 1; 0 <= c; c--) {
        var p = i[c], m = p.instance, h = p.currentTarget;
        if (p = p.listener, m !== a && o.isPropagationStopped()) break e;
        Um(o, p, h), a = m;
      }
      else for (c = 0; c < i.length; c++) {
        if (p = i[c], m = p.instance, h = p.currentTarget, p = p.listener, m !== a && o.isPropagationStopped()) break e;
        Um(o, p, h), a = m;
      }
    }
  }
  if (Bo) throw e = Hc, Bo = !1, Hc = null, e;
}
function ge(e, t) {
  var r = t[Jc];
  r === void 0 && (r = t[Jc] = /* @__PURE__ */ new Set());
  var i = e + "__bubble";
  r.has(i) || (Yv(t, e, 2, !1), r.add(i));
}
function ic(e, t, r) {
  var i = 0;
  t && (i |= 4), Yv(r, e, i, t);
}
var fo = "_reactListening" + Math.random().toString(36).slice(2);
function Vi(e) {
  if (!e[fo]) {
    e[fo] = !0, qh.forEach(function(r) {
      r !== "selectionchange" && (Hw.has(r) || ic(r, !1, e), ic(r, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[fo] || (t[fo] = !0, ic("selectionchange", !1, t));
  }
}
function Yv(e, t, r, i) {
  switch (Nv(t)) {
    case 1:
      var o = ew;
      break;
    case 4:
      o = tw;
      break;
    default:
      o = Ff;
  }
  r = o.bind(null, t, r, e), o = void 0, !Uc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (o = !0), i ? o !== void 0 ? e.addEventListener(t, r, { capture: !0, passive: o }) : e.addEventListener(t, r, !0) : o !== void 0 ? e.addEventListener(t, r, { passive: o }) : e.addEventListener(t, r, !1);
}
function uc(e, t, r, i, o) {
  var a = i;
  if (!(t & 1) && !(t & 2) && i !== null) e: for (; ; ) {
    if (i === null) return;
    var c = i.tag;
    if (c === 3 || c === 4) {
      var p = i.stateNode.containerInfo;
      if (p === o || p.nodeType === 8 && p.parentNode === o) break;
      if (c === 4) for (c = i.return; c !== null; ) {
        var m = c.tag;
        if ((m === 3 || m === 4) && (m = c.stateNode.containerInfo, m === o || m.nodeType === 8 && m.parentNode === o)) return;
        c = c.return;
      }
      for (; p !== null; ) {
        if (c = Fr(p), c === null) return;
        if (m = c.tag, m === 5 || m === 6) {
          i = a = c;
          continue e;
        }
        p = p.parentNode;
      }
    }
    i = i.return;
  }
  mv(function() {
    var h = a, x = Of(r), k = [];
    e: {
      var S = Qv.get(e);
      if (S !== void 0) {
        var P = jf, N = e;
        switch (e) {
          case "keypress":
            if (No(r) === 0) break e;
          case "keydown":
          case "keyup":
            P = vw;
            break;
          case "focusin":
            N = "focus", P = ba;
            break;
          case "focusout":
            N = "blur", P = ba;
            break;
          case "beforeblur":
          case "afterblur":
            P = ba;
            break;
          case "click":
            if (r.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            P = zm;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            P = lw;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            P = ww;
            break;
          case Uv:
          case Hv:
          case Bv:
            P = ow;
            break;
          case Wv:
            P = kw;
            break;
          case "scroll":
            P = nw;
            break;
          case "wheel":
            P = Ew;
            break;
          case "copy":
          case "cut":
          case "paste":
            P = aw;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            P = Rm;
        }
        var _ = (t & 4) !== 0, F = !_ && e === "scroll", y = _ ? S !== null ? S + "Capture" : null : S;
        _ = [];
        for (var g = h, w; g !== null; ) {
          w = g;
          var L = w.stateNode;
          if (w.tag === 5 && L !== null && (w = L, y !== null && (L = ji(g, y), L != null && _.push(Yi(g, L, w)))), F) break;
          g = g.return;
        }
        0 < _.length && (S = new P(S, N, null, r, x), k.push({ event: S, listeners: _ }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (S = e === "mouseover" || e === "pointerover", P = e === "mouseout" || e === "pointerout", S && r !== Ac && (N = r.relatedTarget || r.fromElement) && (Fr(N) || N[jn])) break e;
        if ((P || S) && (S = x.window === x ? x : (S = x.ownerDocument) ? S.defaultView || S.parentWindow : window, P ? (N = r.relatedTarget || r.toElement, P = h, N = N ? Fr(N) : null, N !== null && (F = Zr(N), N !== F || N.tag !== 5 && N.tag !== 6) && (N = null)) : (P = null, N = h), P !== N)) {
          if (_ = zm, L = "onMouseLeave", y = "onMouseEnter", g = "mouse", (e === "pointerout" || e === "pointerover") && (_ = Rm, L = "onPointerLeave", y = "onPointerEnter", g = "pointer"), F = P == null ? S : wl(P), w = N == null ? S : wl(N), S = new _(L, g + "leave", P, r, x), S.target = F, S.relatedTarget = w, L = null, Fr(x) === h && (_ = new _(y, g + "enter", N, r, x), _.target = w, _.relatedTarget = F, L = _), F = L, P && N) t: {
            for (_ = P, y = N, g = 0, w = _; w; w = fl(w)) g++;
            for (w = 0, L = y; L; L = fl(L)) w++;
            for (; 0 < g - w; ) _ = fl(_), g--;
            for (; 0 < w - g; ) y = fl(y), w--;
            for (; g--; ) {
              if (_ === y || y !== null && _ === y.alternate) break t;
              _ = fl(_), y = fl(y);
            }
            _ = null;
          }
          else _ = null;
          P !== null && Hm(k, S, P, _, !1), N !== null && F !== null && Hm(k, F, N, _, !0);
        }
      }
      e: {
        if (S = h ? wl(h) : window, P = S.nodeName && S.nodeName.toLowerCase(), P === "select" || P === "input" && S.type === "file") var M = Lw;
        else if (Om(S)) if (Iv) M = Iw;
        else {
          M = Ow;
          var I = Tw;
        }
        else (P = S.nodeName) && P.toLowerCase() === "input" && (S.type === "checkbox" || S.type === "radio") && (M = Mw);
        if (M && (M = M(e, h))) {
          Mv(k, M, r, x);
          break e;
        }
        I && I(e, S, h), e === "focusout" && (I = S._wrapperState) && I.controlled && S.type === "number" && Oc(S, "number", S.value);
      }
      switch (I = h ? wl(h) : window, e) {
        case "focusin":
          (Om(I) || I.contentEditable === "true") && (gl = I, Vc = h, Ti = null);
          break;
        case "focusout":
          Ti = Vc = gl = null;
          break;
        case "mousedown":
          Yc = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Yc = !1, Am(k, r, x);
          break;
        case "selectionchange":
          if (Aw) break;
        case "keydown":
        case "keyup":
          Am(k, r, x);
      }
      var D;
      if (Hf) e: {
        switch (e) {
          case "compositionstart":
            var B = "onCompositionStart";
            break e;
          case "compositionend":
            B = "onCompositionEnd";
            break e;
          case "compositionupdate":
            B = "onCompositionUpdate";
            break e;
        }
        B = void 0;
      }
      else vl ? Tv(e, r) && (B = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (B = "onCompositionStart");
      B && (Lv && r.locale !== "ko" && (vl || B !== "onCompositionStart" ? B === "onCompositionEnd" && vl && (D = Rv()) : (ir = x, Af = "value" in ir ? ir.value : ir.textContent, vl = !0)), I = Xo(h, B), 0 < I.length && (B = new Nm(B, e, null, r, x), k.push({ event: B, listeners: I }), D ? B.data = D : (D = Ov(r), D !== null && (B.data = D)))), (D = Pw ? _w(e, r) : zw(e, r)) && (h = Xo(h, "onBeforeInput"), 0 < h.length && (x = new Nm("onBeforeInput", "beforeinput", null, r, x), k.push({ event: x, listeners: h }), x.data = D));
    }
    Vv(k, t);
  });
}
function Yi(e, t, r) {
  return { instance: e, listener: t, currentTarget: r };
}
function Xo(e, t) {
  for (var r = t + "Capture", i = []; e !== null; ) {
    var o = e, a = o.stateNode;
    o.tag === 5 && a !== null && (o = a, a = ji(e, r), a != null && i.unshift(Yi(e, a, o)), a = ji(e, t), a != null && i.push(Yi(e, a, o))), e = e.return;
  }
  return i;
}
function fl(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Hm(e, t, r, i, o) {
  for (var a = t._reactName, c = []; r !== null && r !== i; ) {
    var p = r, m = p.alternate, h = p.stateNode;
    if (m !== null && m === i) break;
    p.tag === 5 && h !== null && (p = h, o ? (m = ji(r, a), m != null && c.unshift(Yi(r, m, p))) : o || (m = ji(r, a), m != null && c.push(Yi(r, m, p)))), r = r.return;
  }
  c.length !== 0 && e.push({ event: t, listeners: c });
}
var Bw = /\r\n?/g, Ww = /\u0000|\uFFFD/g;
function Bm(e) {
  return (typeof e == "string" ? e : "" + e).replace(Bw, `
`).replace(Ww, "");
}
function po(e, t, r) {
  if (t = Bm(t), Bm(e) !== t && r) throw Error(j(425));
}
function Ko() {
}
var Xc = null, Kc = null;
function Gc(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Zc = typeof setTimeout == "function" ? setTimeout : void 0, Qw = typeof clearTimeout == "function" ? clearTimeout : void 0, Wm = typeof Promise == "function" ? Promise : void 0, Vw = typeof queueMicrotask == "function" ? queueMicrotask : typeof Wm < "u" ? function(e) {
  return Wm.resolve(null).then(e).catch(Yw);
} : Zc;
function Yw(e) {
  setTimeout(function() {
    throw e;
  });
}
function oc(e, t) {
  var r = t, i = 0;
  do {
    var o = r.nextSibling;
    if (e.removeChild(r), o && o.nodeType === 8) if (r = o.data, r === "/$") {
      if (i === 0) {
        e.removeChild(o), Bi(t);
        return;
      }
      i--;
    } else r !== "$" && r !== "$?" && r !== "$!" || i++;
    r = o;
  } while (r);
  Bi(t);
}
function cr(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Qm(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var r = e.data;
      if (r === "$" || r === "$!" || r === "$?") {
        if (t === 0) return e;
        t--;
      } else r === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Ql = Math.random().toString(36).slice(2), gn = "__reactFiber$" + Ql, Xi = "__reactProps$" + Ql, jn = "__reactContainer$" + Ql, Jc = "__reactEvents$" + Ql, Xw = "__reactListeners$" + Ql, Kw = "__reactHandles$" + Ql;
function Fr(e) {
  var t = e[gn];
  if (t) return t;
  for (var r = e.parentNode; r; ) {
    if (t = r[jn] || r[gn]) {
      if (r = t.alternate, t.child !== null || r !== null && r.child !== null) for (e = Qm(e); e !== null; ) {
        if (r = e[gn]) return r;
        e = Qm(e);
      }
      return t;
    }
    e = r, r = e.parentNode;
  }
  return null;
}
function lu(e) {
  return e = e[gn] || e[jn], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function wl(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(j(33));
}
function ys(e) {
  return e[Xi] || null;
}
var $c = [], Sl = -1;
function Sr(e) {
  return { current: e };
}
function ye(e) {
  0 > Sl || (e.current = $c[Sl], $c[Sl] = null, Sl--);
}
function he(e, t) {
  Sl++, $c[Sl] = e.current, e.current = t;
}
var vr = {}, lt = Sr(vr), yt = Sr(!1), Br = vr;
function Dl(e, t) {
  var r = e.type.contextTypes;
  if (!r) return vr;
  var i = e.stateNode;
  if (i && i.__reactInternalMemoizedUnmaskedChildContext === t) return i.__reactInternalMemoizedMaskedChildContext;
  var o = {}, a;
  for (a in r) o[a] = t[a];
  return i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = o), o;
}
function wt(e) {
  return e = e.childContextTypes, e != null;
}
function Go() {
  ye(yt), ye(lt);
}
function Vm(e, t, r) {
  if (lt.current !== vr) throw Error(j(168));
  he(lt, t), he(yt, r);
}
function Xv(e, t, r) {
  var i = e.stateNode;
  if (t = t.childContextTypes, typeof i.getChildContext != "function") return r;
  i = i.getChildContext();
  for (var o in i) if (!(o in t)) throw Error(j(108, T1(e) || "Unknown", o));
  return _e({}, r, i);
}
function Zo(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || vr, Br = lt.current, he(lt, e), he(yt, yt.current), !0;
}
function Ym(e, t, r) {
  var i = e.stateNode;
  if (!i) throw Error(j(169));
  r ? (e = Xv(e, t, Br), i.__reactInternalMemoizedMergedChildContext = e, ye(yt), ye(lt), he(lt, e)) : ye(yt), he(yt, r);
}
var Tn = null, ws = !1, sc = !1;
function Kv(e) {
  Tn === null ? Tn = [e] : Tn.push(e);
}
function Gw(e) {
  ws = !0, Kv(e);
}
function kr() {
  if (!sc && Tn !== null) {
    sc = !0;
    var e = 0, t = de;
    try {
      var r = Tn;
      for (de = 1; e < r.length; e++) {
        var i = r[e];
        do
          i = i(!0);
        while (i !== null);
      }
      Tn = null, ws = !1;
    } catch (o) {
      throw Tn !== null && (Tn = Tn.slice(e + 1)), yv(Mf, kr), o;
    } finally {
      de = t, sc = !1;
    }
  }
  return null;
}
var kl = [], xl = 0, Jo = null, $o = 0, Qt = [], Vt = 0, Wr = null, On = 1, Mn = "";
function Ir(e, t) {
  kl[xl++] = $o, kl[xl++] = Jo, Jo = e, $o = t;
}
function Gv(e, t, r) {
  Qt[Vt++] = On, Qt[Vt++] = Mn, Qt[Vt++] = Wr, Wr = e;
  var i = On;
  e = Mn;
  var o = 32 - ln(i) - 1;
  i &= ~(1 << o), r += 1;
  var a = 32 - ln(t) + o;
  if (30 < a) {
    var c = o - o % 5;
    a = (i & (1 << c) - 1).toString(32), i >>= c, o -= c, On = 1 << 32 - ln(t) + o | r << o | i, Mn = a + e;
  } else On = 1 << a | r << o | i, Mn = e;
}
function Wf(e) {
  e.return !== null && (Ir(e, 1), Gv(e, 1, 0));
}
function Qf(e) {
  for (; e === Jo; ) Jo = kl[--xl], kl[xl] = null, $o = kl[--xl], kl[xl] = null;
  for (; e === Wr; ) Wr = Qt[--Vt], Qt[Vt] = null, Mn = Qt[--Vt], Qt[Vt] = null, On = Qt[--Vt], Qt[Vt] = null;
}
var Rt = null, Nt = null, xe = !1, rn = null;
function Zv(e, t) {
  var r = Yt(5, null, null, 0);
  r.elementType = "DELETED", r.stateNode = t, r.return = e, t = e.deletions, t === null ? (e.deletions = [r], e.flags |= 16) : t.push(r);
}
function Xm(e, t) {
  switch (e.tag) {
    case 5:
      var r = e.type;
      return t = t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Rt = e, Nt = cr(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Rt = e, Nt = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (r = Wr !== null ? { id: On, overflow: Mn } : null, e.memoizedState = { dehydrated: t, treeContext: r, retryLane: 1073741824 }, r = Yt(18, null, null, 0), r.stateNode = t, r.return = e, e.child = r, Rt = e, Nt = null, !0) : !1;
    default:
      return !1;
  }
}
function qc(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function bc(e) {
  if (xe) {
    var t = Nt;
    if (t) {
      var r = t;
      if (!Xm(e, t)) {
        if (qc(e)) throw Error(j(418));
        t = cr(r.nextSibling);
        var i = Rt;
        t && Xm(e, t) ? Zv(i, r) : (e.flags = e.flags & -4097 | 2, xe = !1, Rt = e);
      }
    } else {
      if (qc(e)) throw Error(j(418));
      e.flags = e.flags & -4097 | 2, xe = !1, Rt = e;
    }
  }
}
function Km(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Rt = e;
}
function mo(e) {
  if (e !== Rt) return !1;
  if (!xe) return Km(e), xe = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Gc(e.type, e.memoizedProps)), t && (t = Nt)) {
    if (qc(e)) throw Jv(), Error(j(418));
    for (; t; ) Zv(e, t), t = cr(t.nextSibling);
  }
  if (Km(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(j(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var r = e.data;
          if (r === "/$") {
            if (t === 0) {
              Nt = cr(e.nextSibling);
              break e;
            }
            t--;
          } else r !== "$" && r !== "$!" && r !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Nt = null;
    }
  } else Nt = Rt ? cr(e.stateNode.nextSibling) : null;
  return !0;
}
function Jv() {
  for (var e = Nt; e; ) e = cr(e.nextSibling);
}
function Fl() {
  Nt = Rt = null, xe = !1;
}
function Vf(e) {
  rn === null ? rn = [e] : rn.push(e);
}
var Zw = Wn.ReactCurrentBatchConfig;
function Si(e, t, r) {
  if (e = r.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (r._owner) {
      if (r = r._owner, r) {
        if (r.tag !== 1) throw Error(j(309));
        var i = r.stateNode;
      }
      if (!i) throw Error(j(147, e));
      var o = i, a = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === a ? t.ref : (t = function(c) {
        var p = o.refs;
        c === null ? delete p[a] : p[a] = c;
      }, t._stringRef = a, t);
    }
    if (typeof e != "string") throw Error(j(284));
    if (!r._owner) throw Error(j(290, e));
  }
  return e;
}
function ho(e, t) {
  throw e = Object.prototype.toString.call(t), Error(j(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Gm(e) {
  var t = e._init;
  return t(e._payload);
}
function $v(e) {
  function t(y, g) {
    if (e) {
      var w = y.deletions;
      w === null ? (y.deletions = [g], y.flags |= 16) : w.push(g);
    }
  }
  function r(y, g) {
    if (!e) return null;
    for (; g !== null; ) t(y, g), g = g.sibling;
    return null;
  }
  function i(y, g) {
    for (y = /* @__PURE__ */ new Map(); g !== null; ) g.key !== null ? y.set(g.key, g) : y.set(g.index, g), g = g.sibling;
    return y;
  }
  function o(y, g) {
    return y = mr(y, g), y.index = 0, y.sibling = null, y;
  }
  function a(y, g, w) {
    return y.index = w, e ? (w = y.alternate, w !== null ? (w = w.index, w < g ? (y.flags |= 2, g) : w) : (y.flags |= 2, g)) : (y.flags |= 1048576, g);
  }
  function c(y) {
    return e && y.alternate === null && (y.flags |= 2), y;
  }
  function p(y, g, w, L) {
    return g === null || g.tag !== 6 ? (g = hc(w, y.mode, L), g.return = y, g) : (g = o(g, w), g.return = y, g);
  }
  function m(y, g, w, L) {
    var M = w.type;
    return M === hl ? x(y, g, w.props.children, L, w.key) : g !== null && (g.elementType === M || typeof M == "object" && M !== null && M.$$typeof === tr && Gm(M) === g.type) ? (L = o(g, w.props), L.ref = Si(y, g, w), L.return = y, L) : (L = Do(w.type, w.key, w.props, null, y.mode, L), L.ref = Si(y, g, w), L.return = y, L);
  }
  function h(y, g, w, L) {
    return g === null || g.tag !== 4 || g.stateNode.containerInfo !== w.containerInfo || g.stateNode.implementation !== w.implementation ? (g = vc(w, y.mode, L), g.return = y, g) : (g = o(g, w.children || []), g.return = y, g);
  }
  function x(y, g, w, L, M) {
    return g === null || g.tag !== 7 ? (g = Hr(w, y.mode, L, M), g.return = y, g) : (g = o(g, w), g.return = y, g);
  }
  function k(y, g, w) {
    if (typeof g == "string" && g !== "" || typeof g == "number") return g = hc("" + g, y.mode, w), g.return = y, g;
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case ro:
          return w = Do(g.type, g.key, g.props, null, y.mode, w), w.ref = Si(y, null, g), w.return = y, w;
        case ml:
          return g = vc(g, y.mode, w), g.return = y, g;
        case tr:
          var L = g._init;
          return k(y, L(g._payload), w);
      }
      if (Ci(g) || hi(g)) return g = Hr(g, y.mode, w, null), g.return = y, g;
      ho(y, g);
    }
    return null;
  }
  function S(y, g, w, L) {
    var M = g !== null ? g.key : null;
    if (typeof w == "string" && w !== "" || typeof w == "number") return M !== null ? null : p(y, g, "" + w, L);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case ro:
          return w.key === M ? m(y, g, w, L) : null;
        case ml:
          return w.key === M ? h(y, g, w, L) : null;
        case tr:
          return M = w._init, S(
            y,
            g,
            M(w._payload),
            L
          );
      }
      if (Ci(w) || hi(w)) return M !== null ? null : x(y, g, w, L, null);
      ho(y, w);
    }
    return null;
  }
  function P(y, g, w, L, M) {
    if (typeof L == "string" && L !== "" || typeof L == "number") return y = y.get(w) || null, p(g, y, "" + L, M);
    if (typeof L == "object" && L !== null) {
      switch (L.$$typeof) {
        case ro:
          return y = y.get(L.key === null ? w : L.key) || null, m(g, y, L, M);
        case ml:
          return y = y.get(L.key === null ? w : L.key) || null, h(g, y, L, M);
        case tr:
          var I = L._init;
          return P(y, g, w, I(L._payload), M);
      }
      if (Ci(L) || hi(L)) return y = y.get(w) || null, x(g, y, L, M, null);
      ho(g, L);
    }
    return null;
  }
  function N(y, g, w, L) {
    for (var M = null, I = null, D = g, B = g = 0, $ = null; D !== null && B < w.length; B++) {
      D.index > B ? ($ = D, D = null) : $ = D.sibling;
      var V = S(y, D, w[B], L);
      if (V === null) {
        D === null && (D = $);
        break;
      }
      e && D && V.alternate === null && t(y, D), g = a(V, g, B), I === null ? M = V : I.sibling = V, I = V, D = $;
    }
    if (B === w.length) return r(y, D), xe && Ir(y, B), M;
    if (D === null) {
      for (; B < w.length; B++) D = k(y, w[B], L), D !== null && (g = a(D, g, B), I === null ? M = D : I.sibling = D, I = D);
      return xe && Ir(y, B), M;
    }
    for (D = i(y, D); B < w.length; B++) $ = P(D, y, B, w[B], L), $ !== null && (e && $.alternate !== null && D.delete($.key === null ? B : $.key), g = a($, g, B), I === null ? M = $ : I.sibling = $, I = $);
    return e && D.forEach(function(ue) {
      return t(y, ue);
    }), xe && Ir(y, B), M;
  }
  function _(y, g, w, L) {
    var M = hi(w);
    if (typeof M != "function") throw Error(j(150));
    if (w = M.call(w), w == null) throw Error(j(151));
    for (var I = M = null, D = g, B = g = 0, $ = null, V = w.next(); D !== null && !V.done; B++, V = w.next()) {
      D.index > B ? ($ = D, D = null) : $ = D.sibling;
      var ue = S(y, D, V.value, L);
      if (ue === null) {
        D === null && (D = $);
        break;
      }
      e && D && ue.alternate === null && t(y, D), g = a(ue, g, B), I === null ? M = ue : I.sibling = ue, I = ue, D = $;
    }
    if (V.done) return r(
      y,
      D
    ), xe && Ir(y, B), M;
    if (D === null) {
      for (; !V.done; B++, V = w.next()) V = k(y, V.value, L), V !== null && (g = a(V, g, B), I === null ? M = V : I.sibling = V, I = V);
      return xe && Ir(y, B), M;
    }
    for (D = i(y, D); !V.done; B++, V = w.next()) V = P(D, y, B, V.value, L), V !== null && (e && V.alternate !== null && D.delete(V.key === null ? B : V.key), g = a(V, g, B), I === null ? M = V : I.sibling = V, I = V);
    return e && D.forEach(function(we) {
      return t(y, we);
    }), xe && Ir(y, B), M;
  }
  function F(y, g, w, L) {
    if (typeof w == "object" && w !== null && w.type === hl && w.key === null && (w = w.props.children), typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case ro:
          e: {
            for (var M = w.key, I = g; I !== null; ) {
              if (I.key === M) {
                if (M = w.type, M === hl) {
                  if (I.tag === 7) {
                    r(y, I.sibling), g = o(I, w.props.children), g.return = y, y = g;
                    break e;
                  }
                } else if (I.elementType === M || typeof M == "object" && M !== null && M.$$typeof === tr && Gm(M) === I.type) {
                  r(y, I.sibling), g = o(I, w.props), g.ref = Si(y, I, w), g.return = y, y = g;
                  break e;
                }
                r(y, I);
                break;
              } else t(y, I);
              I = I.sibling;
            }
            w.type === hl ? (g = Hr(w.props.children, y.mode, L, w.key), g.return = y, y = g) : (L = Do(w.type, w.key, w.props, null, y.mode, L), L.ref = Si(y, g, w), L.return = y, y = L);
          }
          return c(y);
        case ml:
          e: {
            for (I = w.key; g !== null; ) {
              if (g.key === I) if (g.tag === 4 && g.stateNode.containerInfo === w.containerInfo && g.stateNode.implementation === w.implementation) {
                r(y, g.sibling), g = o(g, w.children || []), g.return = y, y = g;
                break e;
              } else {
                r(y, g);
                break;
              }
              else t(y, g);
              g = g.sibling;
            }
            g = vc(w, y.mode, L), g.return = y, y = g;
          }
          return c(y);
        case tr:
          return I = w._init, F(y, g, I(w._payload), L);
      }
      if (Ci(w)) return N(y, g, w, L);
      if (hi(w)) return _(y, g, w, L);
      ho(y, w);
    }
    return typeof w == "string" && w !== "" || typeof w == "number" ? (w = "" + w, g !== null && g.tag === 6 ? (r(y, g.sibling), g = o(g, w), g.return = y, y = g) : (r(y, g), g = hc(w, y.mode, L), g.return = y, y = g), c(y)) : r(y, g);
  }
  return F;
}
var Al = $v(!0), qv = $v(!1), qo = Sr(null), bo = null, El = null, Yf = null;
function Xf() {
  Yf = El = bo = null;
}
function Kf(e) {
  var t = qo.current;
  ye(qo), e._currentValue = t;
}
function ef(e, t, r) {
  for (; e !== null; ) {
    var i = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === r) break;
    e = e.return;
  }
}
function Ll(e, t) {
  bo = e, Yf = El = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (gt = !0), e.firstContext = null);
}
function Kt(e) {
  var t = e._currentValue;
  if (Yf !== e) if (e = { context: e, memoizedValue: t, next: null }, El === null) {
    if (bo === null) throw Error(j(308));
    El = e, bo.dependencies = { lanes: 0, firstContext: e };
  } else El = El.next = e;
  return t;
}
var Ar = null;
function Gf(e) {
  Ar === null ? Ar = [e] : Ar.push(e);
}
function bv(e, t, r, i) {
  var o = t.interleaved;
  return o === null ? (r.next = r, Gf(t)) : (r.next = o.next, o.next = r), t.interleaved = r, Un(e, i);
}
function Un(e, t) {
  e.lanes |= t;
  var r = e.alternate;
  for (r !== null && (r.lanes |= t), r = e, e = e.return; e !== null; ) e.childLanes |= t, r = e.alternate, r !== null && (r.childLanes |= t), r = e, e = e.return;
  return r.tag === 3 ? r.stateNode : null;
}
var nr = !1;
function Zf(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function eg(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function In(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function fr(e, t, r) {
  var i = e.updateQueue;
  if (i === null) return null;
  if (i = i.shared, ie & 2) {
    var o = i.pending;
    return o === null ? t.next = t : (t.next = o.next, o.next = t), i.pending = t, Un(e, r);
  }
  return o = i.interleaved, o === null ? (t.next = t, Gf(i)) : (t.next = o.next, o.next = t), i.interleaved = t, Un(e, r);
}
function Ro(e, t, r) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (r & 4194240) !== 0)) {
    var i = t.lanes;
    i &= e.pendingLanes, r |= i, t.lanes = r, If(e, r);
  }
}
function Zm(e, t) {
  var r = e.updateQueue, i = e.alternate;
  if (i !== null && (i = i.updateQueue, r === i)) {
    var o = null, a = null;
    if (r = r.firstBaseUpdate, r !== null) {
      do {
        var c = { eventTime: r.eventTime, lane: r.lane, tag: r.tag, payload: r.payload, callback: r.callback, next: null };
        a === null ? o = a = c : a = a.next = c, r = r.next;
      } while (r !== null);
      a === null ? o = a = t : a = a.next = t;
    } else o = a = t;
    r = { baseState: i.baseState, firstBaseUpdate: o, lastBaseUpdate: a, shared: i.shared, effects: i.effects }, e.updateQueue = r;
    return;
  }
  e = r.lastBaseUpdate, e === null ? r.firstBaseUpdate = t : e.next = t, r.lastBaseUpdate = t;
}
function es(e, t, r, i) {
  var o = e.updateQueue;
  nr = !1;
  var a = o.firstBaseUpdate, c = o.lastBaseUpdate, p = o.shared.pending;
  if (p !== null) {
    o.shared.pending = null;
    var m = p, h = m.next;
    m.next = null, c === null ? a = h : c.next = h, c = m;
    var x = e.alternate;
    x !== null && (x = x.updateQueue, p = x.lastBaseUpdate, p !== c && (p === null ? x.firstBaseUpdate = h : p.next = h, x.lastBaseUpdate = m));
  }
  if (a !== null) {
    var k = o.baseState;
    c = 0, x = h = m = null, p = a;
    do {
      var S = p.lane, P = p.eventTime;
      if ((i & S) === S) {
        x !== null && (x = x.next = {
          eventTime: P,
          lane: 0,
          tag: p.tag,
          payload: p.payload,
          callback: p.callback,
          next: null
        });
        e: {
          var N = e, _ = p;
          switch (S = t, P = r, _.tag) {
            case 1:
              if (N = _.payload, typeof N == "function") {
                k = N.call(P, k, S);
                break e;
              }
              k = N;
              break e;
            case 3:
              N.flags = N.flags & -65537 | 128;
            case 0:
              if (N = _.payload, S = typeof N == "function" ? N.call(P, k, S) : N, S == null) break e;
              k = _e({}, k, S);
              break e;
            case 2:
              nr = !0;
          }
        }
        p.callback !== null && p.lane !== 0 && (e.flags |= 64, S = o.effects, S === null ? o.effects = [p] : S.push(p));
      } else P = { eventTime: P, lane: S, tag: p.tag, payload: p.payload, callback: p.callback, next: null }, x === null ? (h = x = P, m = k) : x = x.next = P, c |= S;
      if (p = p.next, p === null) {
        if (p = o.shared.pending, p === null) break;
        S = p, p = S.next, S.next = null, o.lastBaseUpdate = S, o.shared.pending = null;
      }
    } while (!0);
    if (x === null && (m = k), o.baseState = m, o.firstBaseUpdate = h, o.lastBaseUpdate = x, t = o.shared.interleaved, t !== null) {
      o = t;
      do
        c |= o.lane, o = o.next;
      while (o !== t);
    } else a === null && (o.shared.lanes = 0);
    Vr |= c, e.lanes = c, e.memoizedState = k;
  }
}
function Jm(e, t, r) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var i = e[t], o = i.callback;
    if (o !== null) {
      if (i.callback = null, i = r, typeof o != "function") throw Error(j(191, o));
      o.call(i);
    }
  }
}
var iu = {}, kn = Sr(iu), Ki = Sr(iu), Gi = Sr(iu);
function jr(e) {
  if (e === iu) throw Error(j(174));
  return e;
}
function Jf(e, t) {
  switch (he(Gi, t), he(Ki, e), he(kn, iu), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Ic(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Ic(t, e);
  }
  ye(kn), he(kn, t);
}
function jl() {
  ye(kn), ye(Ki), ye(Gi);
}
function tg(e) {
  jr(Gi.current);
  var t = jr(kn.current), r = Ic(t, e.type);
  t !== r && (he(Ki, e), he(kn, r));
}
function $f(e) {
  Ki.current === e && (ye(kn), ye(Ki));
}
var Ce = Sr(0);
function ts(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var r = t.memoizedState;
      if (r !== null && (r = r.dehydrated, r === null || r.data === "$?" || r.data === "$!")) return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var ac = [];
function qf() {
  for (var e = 0; e < ac.length; e++) ac[e]._workInProgressVersionPrimary = null;
  ac.length = 0;
}
var Lo = Wn.ReactCurrentDispatcher, cc = Wn.ReactCurrentBatchConfig, Qr = 0, Pe = null, Ae = null, Ve = null, ns = !1, Oi = !1, Zi = 0, Jw = 0;
function tt() {
  throw Error(j(321));
}
function bf(e, t) {
  if (t === null) return !1;
  for (var r = 0; r < t.length && r < e.length; r++) if (!on(e[r], t[r])) return !1;
  return !0;
}
function ed(e, t, r, i, o, a) {
  if (Qr = a, Pe = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Lo.current = e === null || e.memoizedState === null ? eS : tS, e = r(i, o), Oi) {
    a = 0;
    do {
      if (Oi = !1, Zi = 0, 25 <= a) throw Error(j(301));
      a += 1, Ve = Ae = null, t.updateQueue = null, Lo.current = nS, e = r(i, o);
    } while (Oi);
  }
  if (Lo.current = rs, t = Ae !== null && Ae.next !== null, Qr = 0, Ve = Ae = Pe = null, ns = !1, t) throw Error(j(300));
  return e;
}
function td() {
  var e = Zi !== 0;
  return Zi = 0, e;
}
function vn() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return Ve === null ? Pe.memoizedState = Ve = e : Ve = Ve.next = e, Ve;
}
function Gt() {
  if (Ae === null) {
    var e = Pe.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Ae.next;
  var t = Ve === null ? Pe.memoizedState : Ve.next;
  if (t !== null) Ve = t, Ae = e;
  else {
    if (e === null) throw Error(j(310));
    Ae = e, e = { memoizedState: Ae.memoizedState, baseState: Ae.baseState, baseQueue: Ae.baseQueue, queue: Ae.queue, next: null }, Ve === null ? Pe.memoizedState = Ve = e : Ve = Ve.next = e;
  }
  return Ve;
}
function Ji(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function fc(e) {
  var t = Gt(), r = t.queue;
  if (r === null) throw Error(j(311));
  r.lastRenderedReducer = e;
  var i = Ae, o = i.baseQueue, a = r.pending;
  if (a !== null) {
    if (o !== null) {
      var c = o.next;
      o.next = a.next, a.next = c;
    }
    i.baseQueue = o = a, r.pending = null;
  }
  if (o !== null) {
    a = o.next, i = i.baseState;
    var p = c = null, m = null, h = a;
    do {
      var x = h.lane;
      if ((Qr & x) === x) m !== null && (m = m.next = { lane: 0, action: h.action, hasEagerState: h.hasEagerState, eagerState: h.eagerState, next: null }), i = h.hasEagerState ? h.eagerState : e(i, h.action);
      else {
        var k = {
          lane: x,
          action: h.action,
          hasEagerState: h.hasEagerState,
          eagerState: h.eagerState,
          next: null
        };
        m === null ? (p = m = k, c = i) : m = m.next = k, Pe.lanes |= x, Vr |= x;
      }
      h = h.next;
    } while (h !== null && h !== a);
    m === null ? c = i : m.next = p, on(i, t.memoizedState) || (gt = !0), t.memoizedState = i, t.baseState = c, t.baseQueue = m, r.lastRenderedState = i;
  }
  if (e = r.interleaved, e !== null) {
    o = e;
    do
      a = o.lane, Pe.lanes |= a, Vr |= a, o = o.next;
    while (o !== e);
  } else o === null && (r.lanes = 0);
  return [t.memoizedState, r.dispatch];
}
function dc(e) {
  var t = Gt(), r = t.queue;
  if (r === null) throw Error(j(311));
  r.lastRenderedReducer = e;
  var i = r.dispatch, o = r.pending, a = t.memoizedState;
  if (o !== null) {
    r.pending = null;
    var c = o = o.next;
    do
      a = e(a, c.action), c = c.next;
    while (c !== o);
    on(a, t.memoizedState) || (gt = !0), t.memoizedState = a, t.baseQueue === null && (t.baseState = a), r.lastRenderedState = a;
  }
  return [a, i];
}
function ng() {
}
function rg(e, t) {
  var r = Pe, i = Gt(), o = t(), a = !on(i.memoizedState, o);
  if (a && (i.memoizedState = o, gt = !0), i = i.queue, nd(ug.bind(null, r, i, e), [e]), i.getSnapshot !== t || a || Ve !== null && Ve.memoizedState.tag & 1) {
    if (r.flags |= 2048, $i(9, ig.bind(null, r, i, o, t), void 0, null), Ye === null) throw Error(j(349));
    Qr & 30 || lg(r, t, o);
  }
  return o;
}
function lg(e, t, r) {
  e.flags |= 16384, e = { getSnapshot: t, value: r }, t = Pe.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Pe.updateQueue = t, t.stores = [e]) : (r = t.stores, r === null ? t.stores = [e] : r.push(e));
}
function ig(e, t, r, i) {
  t.value = r, t.getSnapshot = i, og(t) && sg(e);
}
function ug(e, t, r) {
  return r(function() {
    og(t) && sg(e);
  });
}
function og(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var r = t();
    return !on(e, r);
  } catch {
    return !0;
  }
}
function sg(e) {
  var t = Un(e, 1);
  t !== null && un(t, e, 1, -1);
}
function $m(e) {
  var t = vn();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Ji, lastRenderedState: e }, t.queue = e, e = e.dispatch = bw.bind(null, Pe, e), [t.memoizedState, e];
}
function $i(e, t, r, i) {
  return e = { tag: e, create: t, destroy: r, deps: i, next: null }, t = Pe.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Pe.updateQueue = t, t.lastEffect = e.next = e) : (r = t.lastEffect, r === null ? t.lastEffect = e.next = e : (i = r.next, r.next = e, e.next = i, t.lastEffect = e)), e;
}
function ag() {
  return Gt().memoizedState;
}
function To(e, t, r, i) {
  var o = vn();
  Pe.flags |= e, o.memoizedState = $i(1 | t, r, void 0, i === void 0 ? null : i);
}
function Ss(e, t, r, i) {
  var o = Gt();
  i = i === void 0 ? null : i;
  var a = void 0;
  if (Ae !== null) {
    var c = Ae.memoizedState;
    if (a = c.destroy, i !== null && bf(i, c.deps)) {
      o.memoizedState = $i(t, r, a, i);
      return;
    }
  }
  Pe.flags |= e, o.memoizedState = $i(1 | t, r, a, i);
}
function qm(e, t) {
  return To(8390656, 8, e, t);
}
function nd(e, t) {
  return Ss(2048, 8, e, t);
}
function cg(e, t) {
  return Ss(4, 2, e, t);
}
function fg(e, t) {
  return Ss(4, 4, e, t);
}
function dg(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function pg(e, t, r) {
  return r = r != null ? r.concat([e]) : null, Ss(4, 4, dg.bind(null, t, e), r);
}
function rd() {
}
function mg(e, t) {
  var r = Gt();
  t = t === void 0 ? null : t;
  var i = r.memoizedState;
  return i !== null && t !== null && bf(t, i[1]) ? i[0] : (r.memoizedState = [e, t], e);
}
function hg(e, t) {
  var r = Gt();
  t = t === void 0 ? null : t;
  var i = r.memoizedState;
  return i !== null && t !== null && bf(t, i[1]) ? i[0] : (e = e(), r.memoizedState = [e, t], e);
}
function vg(e, t, r) {
  return Qr & 21 ? (on(r, t) || (r = kv(), Pe.lanes |= r, Vr |= r, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, gt = !0), e.memoizedState = r);
}
function $w(e, t) {
  var r = de;
  de = r !== 0 && 4 > r ? r : 4, e(!0);
  var i = cc.transition;
  cc.transition = {};
  try {
    e(!1), t();
  } finally {
    de = r, cc.transition = i;
  }
}
function gg() {
  return Gt().memoizedState;
}
function qw(e, t, r) {
  var i = pr(e);
  if (r = { lane: i, action: r, hasEagerState: !1, eagerState: null, next: null }, yg(e)) wg(t, r);
  else if (r = bv(e, t, r, i), r !== null) {
    var o = st();
    un(r, e, i, o), Sg(r, t, i);
  }
}
function bw(e, t, r) {
  var i = pr(e), o = { lane: i, action: r, hasEagerState: !1, eagerState: null, next: null };
  if (yg(e)) wg(t, o);
  else {
    var a = e.alternate;
    if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
      var c = t.lastRenderedState, p = a(c, r);
      if (o.hasEagerState = !0, o.eagerState = p, on(p, c)) {
        var m = t.interleaved;
        m === null ? (o.next = o, Gf(t)) : (o.next = m.next, m.next = o), t.interleaved = o;
        return;
      }
    } catch {
    } finally {
    }
    r = bv(e, t, o, i), r !== null && (o = st(), un(r, e, i, o), Sg(r, t, i));
  }
}
function yg(e) {
  var t = e.alternate;
  return e === Pe || t !== null && t === Pe;
}
function wg(e, t) {
  Oi = ns = !0;
  var r = e.pending;
  r === null ? t.next = t : (t.next = r.next, r.next = t), e.pending = t;
}
function Sg(e, t, r) {
  if (r & 4194240) {
    var i = t.lanes;
    i &= e.pendingLanes, r |= i, t.lanes = r, If(e, r);
  }
}
var rs = { readContext: Kt, useCallback: tt, useContext: tt, useEffect: tt, useImperativeHandle: tt, useInsertionEffect: tt, useLayoutEffect: tt, useMemo: tt, useReducer: tt, useRef: tt, useState: tt, useDebugValue: tt, useDeferredValue: tt, useTransition: tt, useMutableSource: tt, useSyncExternalStore: tt, useId: tt, unstable_isNewReconciler: !1 }, eS = { readContext: Kt, useCallback: function(e, t) {
  return vn().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Kt, useEffect: qm, useImperativeHandle: function(e, t, r) {
  return r = r != null ? r.concat([e]) : null, To(
    4194308,
    4,
    dg.bind(null, t, e),
    r
  );
}, useLayoutEffect: function(e, t) {
  return To(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return To(4, 2, e, t);
}, useMemo: function(e, t) {
  var r = vn();
  return t = t === void 0 ? null : t, e = e(), r.memoizedState = [e, t], e;
}, useReducer: function(e, t, r) {
  var i = vn();
  return t = r !== void 0 ? r(t) : t, i.memoizedState = i.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, i.queue = e, e = e.dispatch = qw.bind(null, Pe, e), [i.memoizedState, e];
}, useRef: function(e) {
  var t = vn();
  return e = { current: e }, t.memoizedState = e;
}, useState: $m, useDebugValue: rd, useDeferredValue: function(e) {
  return vn().memoizedState = e;
}, useTransition: function() {
  var e = $m(!1), t = e[0];
  return e = $w.bind(null, e[1]), vn().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, r) {
  var i = Pe, o = vn();
  if (xe) {
    if (r === void 0) throw Error(j(407));
    r = r();
  } else {
    if (r = t(), Ye === null) throw Error(j(349));
    Qr & 30 || lg(i, t, r);
  }
  o.memoizedState = r;
  var a = { value: r, getSnapshot: t };
  return o.queue = a, qm(ug.bind(
    null,
    i,
    a,
    e
  ), [e]), i.flags |= 2048, $i(9, ig.bind(null, i, a, r, t), void 0, null), r;
}, useId: function() {
  var e = vn(), t = Ye.identifierPrefix;
  if (xe) {
    var r = Mn, i = On;
    r = (i & ~(1 << 32 - ln(i) - 1)).toString(32) + r, t = ":" + t + "R" + r, r = Zi++, 0 < r && (t += "H" + r.toString(32)), t += ":";
  } else r = Jw++, t = ":" + t + "r" + r.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, tS = {
  readContext: Kt,
  useCallback: mg,
  useContext: Kt,
  useEffect: nd,
  useImperativeHandle: pg,
  useInsertionEffect: cg,
  useLayoutEffect: fg,
  useMemo: hg,
  useReducer: fc,
  useRef: ag,
  useState: function() {
    return fc(Ji);
  },
  useDebugValue: rd,
  useDeferredValue: function(e) {
    var t = Gt();
    return vg(t, Ae.memoizedState, e);
  },
  useTransition: function() {
    var e = fc(Ji)[0], t = Gt().memoizedState;
    return [e, t];
  },
  useMutableSource: ng,
  useSyncExternalStore: rg,
  useId: gg,
  unstable_isNewReconciler: !1
}, nS = { readContext: Kt, useCallback: mg, useContext: Kt, useEffect: nd, useImperativeHandle: pg, useInsertionEffect: cg, useLayoutEffect: fg, useMemo: hg, useReducer: dc, useRef: ag, useState: function() {
  return dc(Ji);
}, useDebugValue: rd, useDeferredValue: function(e) {
  var t = Gt();
  return Ae === null ? t.memoizedState = e : vg(t, Ae.memoizedState, e);
}, useTransition: function() {
  var e = dc(Ji)[0], t = Gt().memoizedState;
  return [e, t];
}, useMutableSource: ng, useSyncExternalStore: rg, useId: gg, unstable_isNewReconciler: !1 };
function tn(e, t) {
  if (e && e.defaultProps) {
    t = _e({}, t), e = e.defaultProps;
    for (var r in e) t[r] === void 0 && (t[r] = e[r]);
    return t;
  }
  return t;
}
function tf(e, t, r, i) {
  t = e.memoizedState, r = r(i, t), r = r == null ? t : _e({}, t, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
}
var ks = { isMounted: function(e) {
  return (e = e._reactInternals) ? Zr(e) === e : !1;
}, enqueueSetState: function(e, t, r) {
  e = e._reactInternals;
  var i = st(), o = pr(e), a = In(i, o);
  a.payload = t, r != null && (a.callback = r), t = fr(e, a, o), t !== null && (un(t, e, o, i), Ro(t, e, o));
}, enqueueReplaceState: function(e, t, r) {
  e = e._reactInternals;
  var i = st(), o = pr(e), a = In(i, o);
  a.tag = 1, a.payload = t, r != null && (a.callback = r), t = fr(e, a, o), t !== null && (un(t, e, o, i), Ro(t, e, o));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var r = st(), i = pr(e), o = In(r, i);
  o.tag = 2, t != null && (o.callback = t), t = fr(e, o, i), t !== null && (un(t, e, i, r), Ro(t, e, i));
} };
function bm(e, t, r, i, o, a, c) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, a, c) : t.prototype && t.prototype.isPureReactComponent ? !Qi(r, i) || !Qi(o, a) : !0;
}
function kg(e, t, r) {
  var i = !1, o = vr, a = t.contextType;
  return typeof a == "object" && a !== null ? a = Kt(a) : (o = wt(t) ? Br : lt.current, i = t.contextTypes, a = (i = i != null) ? Dl(e, o) : vr), t = new t(r, a), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = ks, e.stateNode = t, t._reactInternals = e, i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = o, e.__reactInternalMemoizedMaskedChildContext = a), t;
}
function eh(e, t, r, i) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(r, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(r, i), t.state !== e && ks.enqueueReplaceState(t, t.state, null);
}
function nf(e, t, r, i) {
  var o = e.stateNode;
  o.props = r, o.state = e.memoizedState, o.refs = {}, Zf(e);
  var a = t.contextType;
  typeof a == "object" && a !== null ? o.context = Kt(a) : (a = wt(t) ? Br : lt.current, o.context = Dl(e, a)), o.state = e.memoizedState, a = t.getDerivedStateFromProps, typeof a == "function" && (tf(e, t, a, r), o.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (t = o.state, typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(), t !== o.state && ks.enqueueReplaceState(o, o.state, null), es(e, r, o, i), o.state = e.memoizedState), typeof o.componentDidMount == "function" && (e.flags |= 4194308);
}
function Ul(e, t) {
  try {
    var r = "", i = t;
    do
      r += L1(i), i = i.return;
    while (i);
    var o = r;
  } catch (a) {
    o = `
Error generating stack: ` + a.message + `
` + a.stack;
  }
  return { value: e, source: t, stack: o, digest: null };
}
function pc(e, t, r) {
  return { value: e, source: null, stack: r ?? null, digest: t ?? null };
}
function rf(e, t) {
  try {
    console.error(t.value);
  } catch (r) {
    setTimeout(function() {
      throw r;
    });
  }
}
var rS = typeof WeakMap == "function" ? WeakMap : Map;
function xg(e, t, r) {
  r = In(-1, r), r.tag = 3, r.payload = { element: null };
  var i = t.value;
  return r.callback = function() {
    is || (is = !0, mf = i), rf(e, t);
  }, r;
}
function Eg(e, t, r) {
  r = In(-1, r), r.tag = 3;
  var i = e.type.getDerivedStateFromError;
  if (typeof i == "function") {
    var o = t.value;
    r.payload = function() {
      return i(o);
    }, r.callback = function() {
      rf(e, t);
    };
  }
  var a = e.stateNode;
  return a !== null && typeof a.componentDidCatch == "function" && (r.callback = function() {
    rf(e, t), typeof i != "function" && (dr === null ? dr = /* @__PURE__ */ new Set([this]) : dr.add(this));
    var c = t.stack;
    this.componentDidCatch(t.value, { componentStack: c !== null ? c : "" });
  }), r;
}
function th(e, t, r) {
  var i = e.pingCache;
  if (i === null) {
    i = e.pingCache = new rS();
    var o = /* @__PURE__ */ new Set();
    i.set(t, o);
  } else o = i.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), i.set(t, o));
  o.has(r) || (o.add(r), e = gS.bind(null, e, t, r), t.then(e, e));
}
function nh(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function rh(e, t, r, i, o) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = o, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, r.flags |= 131072, r.flags &= -52805, r.tag === 1 && (r.alternate === null ? r.tag = 17 : (t = In(-1, 1), t.tag = 2, fr(r, t, 1))), r.lanes |= 1), e);
}
var lS = Wn.ReactCurrentOwner, gt = !1;
function ot(e, t, r, i) {
  t.child = e === null ? qv(t, null, r, i) : Al(t, e.child, r, i);
}
function lh(e, t, r, i, o) {
  r = r.render;
  var a = t.ref;
  return Ll(t, o), i = ed(e, t, r, i, a, o), r = td(), e !== null && !gt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~o, Hn(e, t, o)) : (xe && r && Wf(t), t.flags |= 1, ot(e, t, i, o), t.child);
}
function ih(e, t, r, i, o) {
  if (e === null) {
    var a = r.type;
    return typeof a == "function" && !fd(a) && a.defaultProps === void 0 && r.compare === null && r.defaultProps === void 0 ? (t.tag = 15, t.type = a, Cg(e, t, a, i, o)) : (e = Do(r.type, null, i, t, t.mode, o), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (a = e.child, !(e.lanes & o)) {
    var c = a.memoizedProps;
    if (r = r.compare, r = r !== null ? r : Qi, r(c, i) && e.ref === t.ref) return Hn(e, t, o);
  }
  return t.flags |= 1, e = mr(a, i), e.ref = t.ref, e.return = t, t.child = e;
}
function Cg(e, t, r, i, o) {
  if (e !== null) {
    var a = e.memoizedProps;
    if (Qi(a, i) && e.ref === t.ref) if (gt = !1, t.pendingProps = i = a, (e.lanes & o) !== 0) e.flags & 131072 && (gt = !0);
    else return t.lanes = e.lanes, Hn(e, t, o);
  }
  return lf(e, t, r, i, o);
}
function Pg(e, t, r) {
  var i = t.pendingProps, o = i.children, a = e !== null ? e.memoizedState : null;
  if (i.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, he(Pl, zt), zt |= r;
  else {
    if (!(r & 1073741824)) return e = a !== null ? a.baseLanes | r : r, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, he(Pl, zt), zt |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, i = a !== null ? a.baseLanes : r, he(Pl, zt), zt |= i;
  }
  else a !== null ? (i = a.baseLanes | r, t.memoizedState = null) : i = r, he(Pl, zt), zt |= i;
  return ot(e, t, o, r), t.child;
}
function _g(e, t) {
  var r = t.ref;
  (e === null && r !== null || e !== null && e.ref !== r) && (t.flags |= 512, t.flags |= 2097152);
}
function lf(e, t, r, i, o) {
  var a = wt(r) ? Br : lt.current;
  return a = Dl(t, a), Ll(t, o), r = ed(e, t, r, i, a, o), i = td(), e !== null && !gt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~o, Hn(e, t, o)) : (xe && i && Wf(t), t.flags |= 1, ot(e, t, r, o), t.child);
}
function uh(e, t, r, i, o) {
  if (wt(r)) {
    var a = !0;
    Zo(t);
  } else a = !1;
  if (Ll(t, o), t.stateNode === null) Oo(e, t), kg(t, r, i), nf(t, r, i, o), i = !0;
  else if (e === null) {
    var c = t.stateNode, p = t.memoizedProps;
    c.props = p;
    var m = c.context, h = r.contextType;
    typeof h == "object" && h !== null ? h = Kt(h) : (h = wt(r) ? Br : lt.current, h = Dl(t, h));
    var x = r.getDerivedStateFromProps, k = typeof x == "function" || typeof c.getSnapshotBeforeUpdate == "function";
    k || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (p !== i || m !== h) && eh(t, c, i, h), nr = !1;
    var S = t.memoizedState;
    c.state = S, es(t, i, c, o), m = t.memoizedState, p !== i || S !== m || yt.current || nr ? (typeof x == "function" && (tf(t, r, x, i), m = t.memoizedState), (p = nr || bm(t, r, p, i, S, m, h)) ? (k || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = m), c.props = i, c.state = m, c.context = h, i = p) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
  } else {
    c = t.stateNode, eg(e, t), p = t.memoizedProps, h = t.type === t.elementType ? p : tn(t.type, p), c.props = h, k = t.pendingProps, S = c.context, m = r.contextType, typeof m == "object" && m !== null ? m = Kt(m) : (m = wt(r) ? Br : lt.current, m = Dl(t, m));
    var P = r.getDerivedStateFromProps;
    (x = typeof P == "function" || typeof c.getSnapshotBeforeUpdate == "function") || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (p !== k || S !== m) && eh(t, c, i, m), nr = !1, S = t.memoizedState, c.state = S, es(t, i, c, o);
    var N = t.memoizedState;
    p !== k || S !== N || yt.current || nr ? (typeof P == "function" && (tf(t, r, P, i), N = t.memoizedState), (h = nr || bm(t, r, h, i, S, N, m) || !1) ? (x || typeof c.UNSAFE_componentWillUpdate != "function" && typeof c.componentWillUpdate != "function" || (typeof c.componentWillUpdate == "function" && c.componentWillUpdate(i, N, m), typeof c.UNSAFE_componentWillUpdate == "function" && c.UNSAFE_componentWillUpdate(i, N, m)), typeof c.componentDidUpdate == "function" && (t.flags |= 4), typeof c.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof c.componentDidUpdate != "function" || p === e.memoizedProps && S === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || p === e.memoizedProps && S === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = N), c.props = i, c.state = N, c.context = m, i = h) : (typeof c.componentDidUpdate != "function" || p === e.memoizedProps && S === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || p === e.memoizedProps && S === e.memoizedState || (t.flags |= 1024), i = !1);
  }
  return uf(e, t, r, i, a, o);
}
function uf(e, t, r, i, o, a) {
  _g(e, t);
  var c = (t.flags & 128) !== 0;
  if (!i && !c) return o && Ym(t, r, !1), Hn(e, t, a);
  i = t.stateNode, lS.current = t;
  var p = c && typeof r.getDerivedStateFromError != "function" ? null : i.render();
  return t.flags |= 1, e !== null && c ? (t.child = Al(t, e.child, null, a), t.child = Al(t, null, p, a)) : ot(e, t, p, a), t.memoizedState = i.state, o && Ym(t, r, !0), t.child;
}
function zg(e) {
  var t = e.stateNode;
  t.pendingContext ? Vm(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Vm(e, t.context, !1), Jf(e, t.containerInfo);
}
function oh(e, t, r, i, o) {
  return Fl(), Vf(o), t.flags |= 256, ot(e, t, r, i), t.child;
}
var of = { dehydrated: null, treeContext: null, retryLane: 0 };
function sf(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Ng(e, t, r) {
  var i = t.pendingProps, o = Ce.current, a = !1, c = (t.flags & 128) !== 0, p;
  if ((p = c) || (p = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0), p ? (a = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (o |= 1), he(Ce, o & 1), e === null)
    return bc(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (c = i.children, e = i.fallback, a ? (i = t.mode, a = t.child, c = { mode: "hidden", children: c }, !(i & 1) && a !== null ? (a.childLanes = 0, a.pendingProps = c) : a = Cs(c, i, 0, null), e = Hr(e, i, r, null), a.return = t, e.return = t, a.sibling = e, t.child = a, t.child.memoizedState = sf(r), t.memoizedState = of, e) : ld(t, c));
  if (o = e.memoizedState, o !== null && (p = o.dehydrated, p !== null)) return iS(e, t, c, i, p, o, r);
  if (a) {
    a = i.fallback, c = t.mode, o = e.child, p = o.sibling;
    var m = { mode: "hidden", children: i.children };
    return !(c & 1) && t.child !== o ? (i = t.child, i.childLanes = 0, i.pendingProps = m, t.deletions = null) : (i = mr(o, m), i.subtreeFlags = o.subtreeFlags & 14680064), p !== null ? a = mr(p, a) : (a = Hr(a, c, r, null), a.flags |= 2), a.return = t, i.return = t, i.sibling = a, t.child = i, i = a, a = t.child, c = e.child.memoizedState, c = c === null ? sf(r) : { baseLanes: c.baseLanes | r, cachePool: null, transitions: c.transitions }, a.memoizedState = c, a.childLanes = e.childLanes & ~r, t.memoizedState = of, i;
  }
  return a = e.child, e = a.sibling, i = mr(a, { mode: "visible", children: i.children }), !(t.mode & 1) && (i.lanes = r), i.return = t, i.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = i, t.memoizedState = null, i;
}
function ld(e, t) {
  return t = Cs({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function vo(e, t, r, i) {
  return i !== null && Vf(i), Al(t, e.child, null, r), e = ld(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function iS(e, t, r, i, o, a, c) {
  if (r)
    return t.flags & 256 ? (t.flags &= -257, i = pc(Error(j(422))), vo(e, t, c, i)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (a = i.fallback, o = t.mode, i = Cs({ mode: "visible", children: i.children }, o, 0, null), a = Hr(a, o, c, null), a.flags |= 2, i.return = t, a.return = t, i.sibling = a, t.child = i, t.mode & 1 && Al(t, e.child, null, c), t.child.memoizedState = sf(c), t.memoizedState = of, a);
  if (!(t.mode & 1)) return vo(e, t, c, null);
  if (o.data === "$!") {
    if (i = o.nextSibling && o.nextSibling.dataset, i) var p = i.dgst;
    return i = p, a = Error(j(419)), i = pc(a, i, void 0), vo(e, t, c, i);
  }
  if (p = (c & e.childLanes) !== 0, gt || p) {
    if (i = Ye, i !== null) {
      switch (c & -c) {
        case 4:
          o = 2;
          break;
        case 16:
          o = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          o = 32;
          break;
        case 536870912:
          o = 268435456;
          break;
        default:
          o = 0;
      }
      o = o & (i.suspendedLanes | c) ? 0 : o, o !== 0 && o !== a.retryLane && (a.retryLane = o, Un(e, o), un(i, e, o, -1));
    }
    return cd(), i = pc(Error(j(421))), vo(e, t, c, i);
  }
  return o.data === "$?" ? (t.flags |= 128, t.child = e.child, t = yS.bind(null, e), o._reactRetry = t, null) : (e = a.treeContext, Nt = cr(o.nextSibling), Rt = t, xe = !0, rn = null, e !== null && (Qt[Vt++] = On, Qt[Vt++] = Mn, Qt[Vt++] = Wr, On = e.id, Mn = e.overflow, Wr = t), t = ld(t, i.children), t.flags |= 4096, t);
}
function sh(e, t, r) {
  e.lanes |= t;
  var i = e.alternate;
  i !== null && (i.lanes |= t), ef(e.return, t, r);
}
function mc(e, t, r, i, o) {
  var a = e.memoizedState;
  a === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: i, tail: r, tailMode: o } : (a.isBackwards = t, a.rendering = null, a.renderingStartTime = 0, a.last = i, a.tail = r, a.tailMode = o);
}
function Rg(e, t, r) {
  var i = t.pendingProps, o = i.revealOrder, a = i.tail;
  if (ot(e, t, i.children, r), i = Ce.current, i & 2) i = i & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && sh(e, r, t);
      else if (e.tag === 19) sh(e, r, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    i &= 1;
  }
  if (he(Ce, i), !(t.mode & 1)) t.memoizedState = null;
  else switch (o) {
    case "forwards":
      for (r = t.child, o = null; r !== null; ) e = r.alternate, e !== null && ts(e) === null && (o = r), r = r.sibling;
      r = o, r === null ? (o = t.child, t.child = null) : (o = r.sibling, r.sibling = null), mc(t, !1, o, r, a);
      break;
    case "backwards":
      for (r = null, o = t.child, t.child = null; o !== null; ) {
        if (e = o.alternate, e !== null && ts(e) === null) {
          t.child = o;
          break;
        }
        e = o.sibling, o.sibling = r, r = o, o = e;
      }
      mc(t, !0, r, null, a);
      break;
    case "together":
      mc(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Oo(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Hn(e, t, r) {
  if (e !== null && (t.dependencies = e.dependencies), Vr |= t.lanes, !(r & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(j(153));
  if (t.child !== null) {
    for (e = t.child, r = mr(e, e.pendingProps), t.child = r, r.return = t; e.sibling !== null; ) e = e.sibling, r = r.sibling = mr(e, e.pendingProps), r.return = t;
    r.sibling = null;
  }
  return t.child;
}
function uS(e, t, r) {
  switch (t.tag) {
    case 3:
      zg(t), Fl();
      break;
    case 5:
      tg(t);
      break;
    case 1:
      wt(t.type) && Zo(t);
      break;
    case 4:
      Jf(t, t.stateNode.containerInfo);
      break;
    case 10:
      var i = t.type._context, o = t.memoizedProps.value;
      he(qo, i._currentValue), i._currentValue = o;
      break;
    case 13:
      if (i = t.memoizedState, i !== null)
        return i.dehydrated !== null ? (he(Ce, Ce.current & 1), t.flags |= 128, null) : r & t.child.childLanes ? Ng(e, t, r) : (he(Ce, Ce.current & 1), e = Hn(e, t, r), e !== null ? e.sibling : null);
      he(Ce, Ce.current & 1);
      break;
    case 19:
      if (i = (r & t.childLanes) !== 0, e.flags & 128) {
        if (i) return Rg(e, t, r);
        t.flags |= 128;
      }
      if (o = t.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), he(Ce, Ce.current), i) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Pg(e, t, r);
  }
  return Hn(e, t, r);
}
var Lg, af, Tg, Og;
Lg = function(e, t) {
  for (var r = t.child; r !== null; ) {
    if (r.tag === 5 || r.tag === 6) e.appendChild(r.stateNode);
    else if (r.tag !== 4 && r.child !== null) {
      r.child.return = r, r = r.child;
      continue;
    }
    if (r === t) break;
    for (; r.sibling === null; ) {
      if (r.return === null || r.return === t) return;
      r = r.return;
    }
    r.sibling.return = r.return, r = r.sibling;
  }
};
af = function() {
};
Tg = function(e, t, r, i) {
  var o = e.memoizedProps;
  if (o !== i) {
    e = t.stateNode, jr(kn.current);
    var a = null;
    switch (r) {
      case "input":
        o = Lc(e, o), i = Lc(e, i), a = [];
        break;
      case "select":
        o = _e({}, o, { value: void 0 }), i = _e({}, i, { value: void 0 }), a = [];
        break;
      case "textarea":
        o = Mc(e, o), i = Mc(e, i), a = [];
        break;
      default:
        typeof o.onClick != "function" && typeof i.onClick == "function" && (e.onclick = Ko);
    }
    Dc(r, i);
    var c;
    r = null;
    for (h in o) if (!i.hasOwnProperty(h) && o.hasOwnProperty(h) && o[h] != null) if (h === "style") {
      var p = o[h];
      for (c in p) p.hasOwnProperty(c) && (r || (r = {}), r[c] = "");
    } else h !== "dangerouslySetInnerHTML" && h !== "children" && h !== "suppressContentEditableWarning" && h !== "suppressHydrationWarning" && h !== "autoFocus" && (Fi.hasOwnProperty(h) ? a || (a = []) : (a = a || []).push(h, null));
    for (h in i) {
      var m = i[h];
      if (p = o?.[h], i.hasOwnProperty(h) && m !== p && (m != null || p != null)) if (h === "style") if (p) {
        for (c in p) !p.hasOwnProperty(c) || m && m.hasOwnProperty(c) || (r || (r = {}), r[c] = "");
        for (c in m) m.hasOwnProperty(c) && p[c] !== m[c] && (r || (r = {}), r[c] = m[c]);
      } else r || (a || (a = []), a.push(
        h,
        r
      )), r = m;
      else h === "dangerouslySetInnerHTML" ? (m = m ? m.__html : void 0, p = p ? p.__html : void 0, m != null && p !== m && (a = a || []).push(h, m)) : h === "children" ? typeof m != "string" && typeof m != "number" || (a = a || []).push(h, "" + m) : h !== "suppressContentEditableWarning" && h !== "suppressHydrationWarning" && (Fi.hasOwnProperty(h) ? (m != null && h === "onScroll" && ge("scroll", e), a || p === m || (a = [])) : (a = a || []).push(h, m));
    }
    r && (a = a || []).push("style", r);
    var h = a;
    (t.updateQueue = h) && (t.flags |= 4);
  }
};
Og = function(e, t, r, i) {
  r !== i && (t.flags |= 4);
};
function ki(e, t) {
  if (!xe) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var r = null; t !== null; ) t.alternate !== null && (r = t), t = t.sibling;
      r === null ? e.tail = null : r.sibling = null;
      break;
    case "collapsed":
      r = e.tail;
      for (var i = null; r !== null; ) r.alternate !== null && (i = r), r = r.sibling;
      i === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : i.sibling = null;
  }
}
function nt(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, r = 0, i = 0;
  if (t) for (var o = e.child; o !== null; ) r |= o.lanes | o.childLanes, i |= o.subtreeFlags & 14680064, i |= o.flags & 14680064, o.return = e, o = o.sibling;
  else for (o = e.child; o !== null; ) r |= o.lanes | o.childLanes, i |= o.subtreeFlags, i |= o.flags, o.return = e, o = o.sibling;
  return e.subtreeFlags |= i, e.childLanes = r, t;
}
function oS(e, t, r) {
  var i = t.pendingProps;
  switch (Qf(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return nt(t), null;
    case 1:
      return wt(t.type) && Go(), nt(t), null;
    case 3:
      return i = t.stateNode, jl(), ye(yt), ye(lt), qf(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (mo(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, rn !== null && (gf(rn), rn = null))), af(e, t), nt(t), null;
    case 5:
      $f(t);
      var o = jr(Gi.current);
      if (r = t.type, e !== null && t.stateNode != null) Tg(e, t, r, i, o), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!i) {
          if (t.stateNode === null) throw Error(j(166));
          return nt(t), null;
        }
        if (e = jr(kn.current), mo(t)) {
          i = t.stateNode, r = t.type;
          var a = t.memoizedProps;
          switch (i[gn] = t, i[Xi] = a, e = (t.mode & 1) !== 0, r) {
            case "dialog":
              ge("cancel", i), ge("close", i);
              break;
            case "iframe":
            case "object":
            case "embed":
              ge("load", i);
              break;
            case "video":
            case "audio":
              for (o = 0; o < _i.length; o++) ge(_i[o], i);
              break;
            case "source":
              ge("error", i);
              break;
            case "img":
            case "image":
            case "link":
              ge(
                "error",
                i
              ), ge("load", i);
              break;
            case "details":
              ge("toggle", i);
              break;
            case "input":
              gm(i, a), ge("invalid", i);
              break;
            case "select":
              i._wrapperState = { wasMultiple: !!a.multiple }, ge("invalid", i);
              break;
            case "textarea":
              wm(i, a), ge("invalid", i);
          }
          Dc(r, a), o = null;
          for (var c in a) if (a.hasOwnProperty(c)) {
            var p = a[c];
            c === "children" ? typeof p == "string" ? i.textContent !== p && (a.suppressHydrationWarning !== !0 && po(i.textContent, p, e), o = ["children", p]) : typeof p == "number" && i.textContent !== "" + p && (a.suppressHydrationWarning !== !0 && po(
              i.textContent,
              p,
              e
            ), o = ["children", "" + p]) : Fi.hasOwnProperty(c) && p != null && c === "onScroll" && ge("scroll", i);
          }
          switch (r) {
            case "input":
              lo(i), ym(i, a, !0);
              break;
            case "textarea":
              lo(i), Sm(i);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof a.onClick == "function" && (i.onclick = Ko);
          }
          i = o, t.updateQueue = i, i !== null && (t.flags |= 4);
        } else {
          c = o.nodeType === 9 ? o : o.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = uv(r)), e === "http://www.w3.org/1999/xhtml" ? r === "script" ? (e = c.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof i.is == "string" ? e = c.createElement(r, { is: i.is }) : (e = c.createElement(r), r === "select" && (c = e, i.multiple ? c.multiple = !0 : i.size && (c.size = i.size))) : e = c.createElementNS(e, r), e[gn] = t, e[Xi] = i, Lg(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (c = Fc(r, i), r) {
              case "dialog":
                ge("cancel", e), ge("close", e), o = i;
                break;
              case "iframe":
              case "object":
              case "embed":
                ge("load", e), o = i;
                break;
              case "video":
              case "audio":
                for (o = 0; o < _i.length; o++) ge(_i[o], e);
                o = i;
                break;
              case "source":
                ge("error", e), o = i;
                break;
              case "img":
              case "image":
              case "link":
                ge(
                  "error",
                  e
                ), ge("load", e), o = i;
                break;
              case "details":
                ge("toggle", e), o = i;
                break;
              case "input":
                gm(e, i), o = Lc(e, i), ge("invalid", e);
                break;
              case "option":
                o = i;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!i.multiple }, o = _e({}, i, { value: void 0 }), ge("invalid", e);
                break;
              case "textarea":
                wm(e, i), o = Mc(e, i), ge("invalid", e);
                break;
              default:
                o = i;
            }
            Dc(r, o), p = o;
            for (a in p) if (p.hasOwnProperty(a)) {
              var m = p[a];
              a === "style" ? av(e, m) : a === "dangerouslySetInnerHTML" ? (m = m ? m.__html : void 0, m != null && ov(e, m)) : a === "children" ? typeof m == "string" ? (r !== "textarea" || m !== "") && Ai(e, m) : typeof m == "number" && Ai(e, "" + m) : a !== "suppressContentEditableWarning" && a !== "suppressHydrationWarning" && a !== "autoFocus" && (Fi.hasOwnProperty(a) ? m != null && a === "onScroll" && ge("scroll", e) : m != null && Nf(e, a, m, c));
            }
            switch (r) {
              case "input":
                lo(e), ym(e, i, !1);
                break;
              case "textarea":
                lo(e), Sm(e);
                break;
              case "option":
                i.value != null && e.setAttribute("value", "" + hr(i.value));
                break;
              case "select":
                e.multiple = !!i.multiple, a = i.value, a != null ? _l(e, !!i.multiple, a, !1) : i.defaultValue != null && _l(
                  e,
                  !!i.multiple,
                  i.defaultValue,
                  !0
                );
                break;
              default:
                typeof o.onClick == "function" && (e.onclick = Ko);
            }
            switch (r) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                i = !!i.autoFocus;
                break e;
              case "img":
                i = !0;
                break e;
              default:
                i = !1;
            }
          }
          i && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return nt(t), null;
    case 6:
      if (e && t.stateNode != null) Og(e, t, e.memoizedProps, i);
      else {
        if (typeof i != "string" && t.stateNode === null) throw Error(j(166));
        if (r = jr(Gi.current), jr(kn.current), mo(t)) {
          if (i = t.stateNode, r = t.memoizedProps, i[gn] = t, (a = i.nodeValue !== r) && (e = Rt, e !== null)) switch (e.tag) {
            case 3:
              po(i.nodeValue, r, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && po(i.nodeValue, r, (e.mode & 1) !== 0);
          }
          a && (t.flags |= 4);
        } else i = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(i), i[gn] = t, t.stateNode = i;
      }
      return nt(t), null;
    case 13:
      if (ye(Ce), i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (xe && Nt !== null && t.mode & 1 && !(t.flags & 128)) Jv(), Fl(), t.flags |= 98560, a = !1;
        else if (a = mo(t), i !== null && i.dehydrated !== null) {
          if (e === null) {
            if (!a) throw Error(j(318));
            if (a = t.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(j(317));
            a[gn] = t;
          } else Fl(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          nt(t), a = !1;
        } else rn !== null && (gf(rn), rn = null), a = !0;
        if (!a) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = r, t) : (i = i !== null, i !== (e !== null && e.memoizedState !== null) && i && (t.child.flags |= 8192, t.mode & 1 && (e === null || Ce.current & 1 ? je === 0 && (je = 3) : cd())), t.updateQueue !== null && (t.flags |= 4), nt(t), null);
    case 4:
      return jl(), af(e, t), e === null && Vi(t.stateNode.containerInfo), nt(t), null;
    case 10:
      return Kf(t.type._context), nt(t), null;
    case 17:
      return wt(t.type) && Go(), nt(t), null;
    case 19:
      if (ye(Ce), a = t.memoizedState, a === null) return nt(t), null;
      if (i = (t.flags & 128) !== 0, c = a.rendering, c === null) if (i) ki(a, !1);
      else {
        if (je !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (c = ts(e), c !== null) {
            for (t.flags |= 128, ki(a, !1), i = c.updateQueue, i !== null && (t.updateQueue = i, t.flags |= 4), t.subtreeFlags = 0, i = r, r = t.child; r !== null; ) a = r, e = i, a.flags &= 14680066, c = a.alternate, c === null ? (a.childLanes = 0, a.lanes = e, a.child = null, a.subtreeFlags = 0, a.memoizedProps = null, a.memoizedState = null, a.updateQueue = null, a.dependencies = null, a.stateNode = null) : (a.childLanes = c.childLanes, a.lanes = c.lanes, a.child = c.child, a.subtreeFlags = 0, a.deletions = null, a.memoizedProps = c.memoizedProps, a.memoizedState = c.memoizedState, a.updateQueue = c.updateQueue, a.type = c.type, e = c.dependencies, a.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), r = r.sibling;
            return he(Ce, Ce.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        a.tail !== null && Le() > Hl && (t.flags |= 128, i = !0, ki(a, !1), t.lanes = 4194304);
      }
      else {
        if (!i) if (e = ts(c), e !== null) {
          if (t.flags |= 128, i = !0, r = e.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), ki(a, !0), a.tail === null && a.tailMode === "hidden" && !c.alternate && !xe) return nt(t), null;
        } else 2 * Le() - a.renderingStartTime > Hl && r !== 1073741824 && (t.flags |= 128, i = !0, ki(a, !1), t.lanes = 4194304);
        a.isBackwards ? (c.sibling = t.child, t.child = c) : (r = a.last, r !== null ? r.sibling = c : t.child = c, a.last = c);
      }
      return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = Le(), t.sibling = null, r = Ce.current, he(Ce, i ? r & 1 | 2 : r & 1), t) : (nt(t), null);
    case 22:
    case 23:
      return ad(), i = t.memoizedState !== null, e !== null && e.memoizedState !== null !== i && (t.flags |= 8192), i && t.mode & 1 ? zt & 1073741824 && (nt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : nt(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(j(156, t.tag));
}
function sS(e, t) {
  switch (Qf(t), t.tag) {
    case 1:
      return wt(t.type) && Go(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return jl(), ye(yt), ye(lt), qf(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return $f(t), null;
    case 13:
      if (ye(Ce), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(j(340));
        Fl();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return ye(Ce), null;
    case 4:
      return jl(), null;
    case 10:
      return Kf(t.type._context), null;
    case 22:
    case 23:
      return ad(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var go = !1, rt = !1, aS = typeof WeakSet == "function" ? WeakSet : Set, X = null;
function Cl(e, t) {
  var r = e.ref;
  if (r !== null) if (typeof r == "function") try {
    r(null);
  } catch (i) {
    Ne(e, t, i);
  }
  else r.current = null;
}
function cf(e, t, r) {
  try {
    r();
  } catch (i) {
    Ne(e, t, i);
  }
}
var ah = !1;
function cS(e, t) {
  if (Xc = Vo, e = Av(), Bf(e)) {
    if ("selectionStart" in e) var r = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      r = (r = e.ownerDocument) && r.defaultView || window;
      var i = r.getSelection && r.getSelection();
      if (i && i.rangeCount !== 0) {
        r = i.anchorNode;
        var o = i.anchorOffset, a = i.focusNode;
        i = i.focusOffset;
        try {
          r.nodeType, a.nodeType;
        } catch {
          r = null;
          break e;
        }
        var c = 0, p = -1, m = -1, h = 0, x = 0, k = e, S = null;
        t: for (; ; ) {
          for (var P; k !== r || o !== 0 && k.nodeType !== 3 || (p = c + o), k !== a || i !== 0 && k.nodeType !== 3 || (m = c + i), k.nodeType === 3 && (c += k.nodeValue.length), (P = k.firstChild) !== null; )
            S = k, k = P;
          for (; ; ) {
            if (k === e) break t;
            if (S === r && ++h === o && (p = c), S === a && ++x === i && (m = c), (P = k.nextSibling) !== null) break;
            k = S, S = k.parentNode;
          }
          k = P;
        }
        r = p === -1 || m === -1 ? null : { start: p, end: m };
      } else r = null;
    }
    r = r || { start: 0, end: 0 };
  } else r = null;
  for (Kc = { focusedElem: e, selectionRange: r }, Vo = !1, X = t; X !== null; ) if (t = X, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, X = e;
  else for (; X !== null; ) {
    t = X;
    try {
      var N = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (N !== null) {
            var _ = N.memoizedProps, F = N.memoizedState, y = t.stateNode, g = y.getSnapshotBeforeUpdate(t.elementType === t.type ? _ : tn(t.type, _), F);
            y.__reactInternalSnapshotBeforeUpdate = g;
          }
          break;
        case 3:
          var w = t.stateNode.containerInfo;
          w.nodeType === 1 ? w.textContent = "" : w.nodeType === 9 && w.documentElement && w.removeChild(w.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(j(163));
      }
    } catch (L) {
      Ne(t, t.return, L);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, X = e;
      break;
    }
    X = t.return;
  }
  return N = ah, ah = !1, N;
}
function Mi(e, t, r) {
  var i = t.updateQueue;
  if (i = i !== null ? i.lastEffect : null, i !== null) {
    var o = i = i.next;
    do {
      if ((o.tag & e) === e) {
        var a = o.destroy;
        o.destroy = void 0, a !== void 0 && cf(t, r, a);
      }
      o = o.next;
    } while (o !== i);
  }
}
function xs(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var r = t = t.next;
    do {
      if ((r.tag & e) === e) {
        var i = r.create;
        r.destroy = i();
      }
      r = r.next;
    } while (r !== t);
  }
}
function ff(e) {
  var t = e.ref;
  if (t !== null) {
    var r = e.stateNode;
    switch (e.tag) {
      case 5:
        e = r;
        break;
      default:
        e = r;
    }
    typeof t == "function" ? t(e) : t.current = e;
  }
}
function Mg(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Mg(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[gn], delete t[Xi], delete t[Jc], delete t[Xw], delete t[Kw])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Ig(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function ch(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Ig(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function df(e, t, r) {
  var i = e.tag;
  if (i === 5 || i === 6) e = e.stateNode, t ? r.nodeType === 8 ? r.parentNode.insertBefore(e, t) : r.insertBefore(e, t) : (r.nodeType === 8 ? (t = r.parentNode, t.insertBefore(e, r)) : (t = r, t.appendChild(e)), r = r._reactRootContainer, r != null || t.onclick !== null || (t.onclick = Ko));
  else if (i !== 4 && (e = e.child, e !== null)) for (df(e, t, r), e = e.sibling; e !== null; ) df(e, t, r), e = e.sibling;
}
function pf(e, t, r) {
  var i = e.tag;
  if (i === 5 || i === 6) e = e.stateNode, t ? r.insertBefore(e, t) : r.appendChild(e);
  else if (i !== 4 && (e = e.child, e !== null)) for (pf(e, t, r), e = e.sibling; e !== null; ) pf(e, t, r), e = e.sibling;
}
var Ke = null, nn = !1;
function er(e, t, r) {
  for (r = r.child; r !== null; ) Dg(e, t, r), r = r.sibling;
}
function Dg(e, t, r) {
  if (Sn && typeof Sn.onCommitFiberUnmount == "function") try {
    Sn.onCommitFiberUnmount(ms, r);
  } catch {
  }
  switch (r.tag) {
    case 5:
      rt || Cl(r, t);
    case 6:
      var i = Ke, o = nn;
      Ke = null, er(e, t, r), Ke = i, nn = o, Ke !== null && (nn ? (e = Ke, r = r.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(r) : e.removeChild(r)) : Ke.removeChild(r.stateNode));
      break;
    case 18:
      Ke !== null && (nn ? (e = Ke, r = r.stateNode, e.nodeType === 8 ? oc(e.parentNode, r) : e.nodeType === 1 && oc(e, r), Bi(e)) : oc(Ke, r.stateNode));
      break;
    case 4:
      i = Ke, o = nn, Ke = r.stateNode.containerInfo, nn = !0, er(e, t, r), Ke = i, nn = o;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!rt && (i = r.updateQueue, i !== null && (i = i.lastEffect, i !== null))) {
        o = i = i.next;
        do {
          var a = o, c = a.destroy;
          a = a.tag, c !== void 0 && (a & 2 || a & 4) && cf(r, t, c), o = o.next;
        } while (o !== i);
      }
      er(e, t, r);
      break;
    case 1:
      if (!rt && (Cl(r, t), i = r.stateNode, typeof i.componentWillUnmount == "function")) try {
        i.props = r.memoizedProps, i.state = r.memoizedState, i.componentWillUnmount();
      } catch (p) {
        Ne(r, t, p);
      }
      er(e, t, r);
      break;
    case 21:
      er(e, t, r);
      break;
    case 22:
      r.mode & 1 ? (rt = (i = rt) || r.memoizedState !== null, er(e, t, r), rt = i) : er(e, t, r);
      break;
    default:
      er(e, t, r);
  }
}
function fh(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var r = e.stateNode;
    r === null && (r = e.stateNode = new aS()), t.forEach(function(i) {
      var o = wS.bind(null, e, i);
      r.has(i) || (r.add(i), i.then(o, o));
    });
  }
}
function en(e, t) {
  var r = t.deletions;
  if (r !== null) for (var i = 0; i < r.length; i++) {
    var o = r[i];
    try {
      var a = e, c = t, p = c;
      e: for (; p !== null; ) {
        switch (p.tag) {
          case 5:
            Ke = p.stateNode, nn = !1;
            break e;
          case 3:
            Ke = p.stateNode.containerInfo, nn = !0;
            break e;
          case 4:
            Ke = p.stateNode.containerInfo, nn = !0;
            break e;
        }
        p = p.return;
      }
      if (Ke === null) throw Error(j(160));
      Dg(a, c, o), Ke = null, nn = !1;
      var m = o.alternate;
      m !== null && (m.return = null), o.return = null;
    } catch (h) {
      Ne(o, t, h);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Fg(t, e), t = t.sibling;
}
function Fg(e, t) {
  var r = e.alternate, i = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (en(t, e), hn(e), i & 4) {
        try {
          Mi(3, e, e.return), xs(3, e);
        } catch (_) {
          Ne(e, e.return, _);
        }
        try {
          Mi(5, e, e.return);
        } catch (_) {
          Ne(e, e.return, _);
        }
      }
      break;
    case 1:
      en(t, e), hn(e), i & 512 && r !== null && Cl(r, r.return);
      break;
    case 5:
      if (en(t, e), hn(e), i & 512 && r !== null && Cl(r, r.return), e.flags & 32) {
        var o = e.stateNode;
        try {
          Ai(o, "");
        } catch (_) {
          Ne(e, e.return, _);
        }
      }
      if (i & 4 && (o = e.stateNode, o != null)) {
        var a = e.memoizedProps, c = r !== null ? r.memoizedProps : a, p = e.type, m = e.updateQueue;
        if (e.updateQueue = null, m !== null) try {
          p === "input" && a.type === "radio" && a.name != null && lv(o, a), Fc(p, c);
          var h = Fc(p, a);
          for (c = 0; c < m.length; c += 2) {
            var x = m[c], k = m[c + 1];
            x === "style" ? av(o, k) : x === "dangerouslySetInnerHTML" ? ov(o, k) : x === "children" ? Ai(o, k) : Nf(o, x, k, h);
          }
          switch (p) {
            case "input":
              Tc(o, a);
              break;
            case "textarea":
              iv(o, a);
              break;
            case "select":
              var S = o._wrapperState.wasMultiple;
              o._wrapperState.wasMultiple = !!a.multiple;
              var P = a.value;
              P != null ? _l(o, !!a.multiple, P, !1) : S !== !!a.multiple && (a.defaultValue != null ? _l(
                o,
                !!a.multiple,
                a.defaultValue,
                !0
              ) : _l(o, !!a.multiple, a.multiple ? [] : "", !1));
          }
          o[Xi] = a;
        } catch (_) {
          Ne(e, e.return, _);
        }
      }
      break;
    case 6:
      if (en(t, e), hn(e), i & 4) {
        if (e.stateNode === null) throw Error(j(162));
        o = e.stateNode, a = e.memoizedProps;
        try {
          o.nodeValue = a;
        } catch (_) {
          Ne(e, e.return, _);
        }
      }
      break;
    case 3:
      if (en(t, e), hn(e), i & 4 && r !== null && r.memoizedState.isDehydrated) try {
        Bi(t.containerInfo);
      } catch (_) {
        Ne(e, e.return, _);
      }
      break;
    case 4:
      en(t, e), hn(e);
      break;
    case 13:
      en(t, e), hn(e), o = e.child, o.flags & 8192 && (a = o.memoizedState !== null, o.stateNode.isHidden = a, !a || o.alternate !== null && o.alternate.memoizedState !== null || (od = Le())), i & 4 && fh(e);
      break;
    case 22:
      if (x = r !== null && r.memoizedState !== null, e.mode & 1 ? (rt = (h = rt) || x, en(t, e), rt = h) : en(t, e), hn(e), i & 8192) {
        if (h = e.memoizedState !== null, (e.stateNode.isHidden = h) && !x && e.mode & 1) for (X = e, x = e.child; x !== null; ) {
          for (k = X = x; X !== null; ) {
            switch (S = X, P = S.child, S.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Mi(4, S, S.return);
                break;
              case 1:
                Cl(S, S.return);
                var N = S.stateNode;
                if (typeof N.componentWillUnmount == "function") {
                  i = S, r = S.return;
                  try {
                    t = i, N.props = t.memoizedProps, N.state = t.memoizedState, N.componentWillUnmount();
                  } catch (_) {
                    Ne(i, r, _);
                  }
                }
                break;
              case 5:
                Cl(S, S.return);
                break;
              case 22:
                if (S.memoizedState !== null) {
                  ph(k);
                  continue;
                }
            }
            P !== null ? (P.return = S, X = P) : ph(k);
          }
          x = x.sibling;
        }
        e: for (x = null, k = e; ; ) {
          if (k.tag === 5) {
            if (x === null) {
              x = k;
              try {
                o = k.stateNode, h ? (a = o.style, typeof a.setProperty == "function" ? a.setProperty("display", "none", "important") : a.display = "none") : (p = k.stateNode, m = k.memoizedProps.style, c = m != null && m.hasOwnProperty("display") ? m.display : null, p.style.display = sv("display", c));
              } catch (_) {
                Ne(e, e.return, _);
              }
            }
          } else if (k.tag === 6) {
            if (x === null) try {
              k.stateNode.nodeValue = h ? "" : k.memoizedProps;
            } catch (_) {
              Ne(e, e.return, _);
            }
          } else if ((k.tag !== 22 && k.tag !== 23 || k.memoizedState === null || k === e) && k.child !== null) {
            k.child.return = k, k = k.child;
            continue;
          }
          if (k === e) break e;
          for (; k.sibling === null; ) {
            if (k.return === null || k.return === e) break e;
            x === k && (x = null), k = k.return;
          }
          x === k && (x = null), k.sibling.return = k.return, k = k.sibling;
        }
      }
      break;
    case 19:
      en(t, e), hn(e), i & 4 && fh(e);
      break;
    case 21:
      break;
    default:
      en(
        t,
        e
      ), hn(e);
  }
}
function hn(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var r = e.return; r !== null; ) {
          if (Ig(r)) {
            var i = r;
            break e;
          }
          r = r.return;
        }
        throw Error(j(160));
      }
      switch (i.tag) {
        case 5:
          var o = i.stateNode;
          i.flags & 32 && (Ai(o, ""), i.flags &= -33);
          var a = ch(e);
          pf(e, a, o);
          break;
        case 3:
        case 4:
          var c = i.stateNode.containerInfo, p = ch(e);
          df(e, p, c);
          break;
        default:
          throw Error(j(161));
      }
    } catch (m) {
      Ne(e, e.return, m);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function fS(e, t, r) {
  X = e, Ag(e);
}
function Ag(e, t, r) {
  for (var i = (e.mode & 1) !== 0; X !== null; ) {
    var o = X, a = o.child;
    if (o.tag === 22 && i) {
      var c = o.memoizedState !== null || go;
      if (!c) {
        var p = o.alternate, m = p !== null && p.memoizedState !== null || rt;
        p = go;
        var h = rt;
        if (go = c, (rt = m) && !h) for (X = o; X !== null; ) c = X, m = c.child, c.tag === 22 && c.memoizedState !== null ? mh(o) : m !== null ? (m.return = c, X = m) : mh(o);
        for (; a !== null; ) X = a, Ag(a), a = a.sibling;
        X = o, go = p, rt = h;
      }
      dh(e);
    } else o.subtreeFlags & 8772 && a !== null ? (a.return = o, X = a) : dh(e);
  }
}
function dh(e) {
  for (; X !== null; ) {
    var t = X;
    if (t.flags & 8772) {
      var r = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            rt || xs(5, t);
            break;
          case 1:
            var i = t.stateNode;
            if (t.flags & 4 && !rt) if (r === null) i.componentDidMount();
            else {
              var o = t.elementType === t.type ? r.memoizedProps : tn(t.type, r.memoizedProps);
              i.componentDidUpdate(o, r.memoizedState, i.__reactInternalSnapshotBeforeUpdate);
            }
            var a = t.updateQueue;
            a !== null && Jm(t, a, i);
            break;
          case 3:
            var c = t.updateQueue;
            if (c !== null) {
              if (r = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  r = t.child.stateNode;
                  break;
                case 1:
                  r = t.child.stateNode;
              }
              Jm(t, c, r);
            }
            break;
          case 5:
            var p = t.stateNode;
            if (r === null && t.flags & 4) {
              r = p;
              var m = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  m.autoFocus && r.focus();
                  break;
                case "img":
                  m.src && (r.src = m.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (t.memoizedState === null) {
              var h = t.alternate;
              if (h !== null) {
                var x = h.memoizedState;
                if (x !== null) {
                  var k = x.dehydrated;
                  k !== null && Bi(k);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(j(163));
        }
        rt || t.flags & 512 && ff(t);
      } catch (S) {
        Ne(t, t.return, S);
      }
    }
    if (t === e) {
      X = null;
      break;
    }
    if (r = t.sibling, r !== null) {
      r.return = t.return, X = r;
      break;
    }
    X = t.return;
  }
}
function ph(e) {
  for (; X !== null; ) {
    var t = X;
    if (t === e) {
      X = null;
      break;
    }
    var r = t.sibling;
    if (r !== null) {
      r.return = t.return, X = r;
      break;
    }
    X = t.return;
  }
}
function mh(e) {
  for (; X !== null; ) {
    var t = X;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var r = t.return;
          try {
            xs(4, t);
          } catch (m) {
            Ne(t, r, m);
          }
          break;
        case 1:
          var i = t.stateNode;
          if (typeof i.componentDidMount == "function") {
            var o = t.return;
            try {
              i.componentDidMount();
            } catch (m) {
              Ne(t, o, m);
            }
          }
          var a = t.return;
          try {
            ff(t);
          } catch (m) {
            Ne(t, a, m);
          }
          break;
        case 5:
          var c = t.return;
          try {
            ff(t);
          } catch (m) {
            Ne(t, c, m);
          }
      }
    } catch (m) {
      Ne(t, t.return, m);
    }
    if (t === e) {
      X = null;
      break;
    }
    var p = t.sibling;
    if (p !== null) {
      p.return = t.return, X = p;
      break;
    }
    X = t.return;
  }
}
var dS = Math.ceil, ls = Wn.ReactCurrentDispatcher, id = Wn.ReactCurrentOwner, Xt = Wn.ReactCurrentBatchConfig, ie = 0, Ye = null, Ie = null, Ge = 0, zt = 0, Pl = Sr(0), je = 0, qi = null, Vr = 0, Es = 0, ud = 0, Ii = null, vt = null, od = 0, Hl = 1 / 0, Ln = null, is = !1, mf = null, dr = null, yo = !1, ur = null, us = 0, Di = 0, hf = null, Mo = -1, Io = 0;
function st() {
  return ie & 6 ? Le() : Mo !== -1 ? Mo : Mo = Le();
}
function pr(e) {
  return e.mode & 1 ? ie & 2 && Ge !== 0 ? Ge & -Ge : Zw.transition !== null ? (Io === 0 && (Io = kv()), Io) : (e = de, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Nv(e.type)), e) : 1;
}
function un(e, t, r, i) {
  if (50 < Di) throw Di = 0, hf = null, Error(j(185));
  nu(e, r, i), (!(ie & 2) || e !== Ye) && (e === Ye && (!(ie & 2) && (Es |= r), je === 4 && lr(e, Ge)), St(e, i), r === 1 && ie === 0 && !(t.mode & 1) && (Hl = Le() + 500, ws && kr()));
}
function St(e, t) {
  var r = e.callbackNode;
  Z1(e, t);
  var i = Qo(e, e === Ye ? Ge : 0);
  if (i === 0) r !== null && Em(r), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = i & -i, e.callbackPriority !== t) {
    if (r != null && Em(r), t === 1) e.tag === 0 ? Gw(hh.bind(null, e)) : Kv(hh.bind(null, e)), Vw(function() {
      !(ie & 6) && kr();
    }), r = null;
    else {
      switch (xv(i)) {
        case 1:
          r = Mf;
          break;
        case 4:
          r = wv;
          break;
        case 16:
          r = Wo;
          break;
        case 536870912:
          r = Sv;
          break;
        default:
          r = Wo;
      }
      r = Yg(r, jg.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = r;
  }
}
function jg(e, t) {
  if (Mo = -1, Io = 0, ie & 6) throw Error(j(327));
  var r = e.callbackNode;
  if (Tl() && e.callbackNode !== r) return null;
  var i = Qo(e, e === Ye ? Ge : 0);
  if (i === 0) return null;
  if (i & 30 || i & e.expiredLanes || t) t = os(e, i);
  else {
    t = i;
    var o = ie;
    ie |= 2;
    var a = Hg();
    (Ye !== e || Ge !== t) && (Ln = null, Hl = Le() + 500, Ur(e, t));
    do
      try {
        hS();
        break;
      } catch (p) {
        Ug(e, p);
      }
    while (!0);
    Xf(), ls.current = a, ie = o, Ie !== null ? t = 0 : (Ye = null, Ge = 0, t = je);
  }
  if (t !== 0) {
    if (t === 2 && (o = Bc(e), o !== 0 && (i = o, t = vf(e, o))), t === 1) throw r = qi, Ur(e, 0), lr(e, i), St(e, Le()), r;
    if (t === 6) lr(e, i);
    else {
      if (o = e.current.alternate, !(i & 30) && !pS(o) && (t = os(e, i), t === 2 && (a = Bc(e), a !== 0 && (i = a, t = vf(e, a))), t === 1)) throw r = qi, Ur(e, 0), lr(e, i), St(e, Le()), r;
      switch (e.finishedWork = o, e.finishedLanes = i, t) {
        case 0:
        case 1:
          throw Error(j(345));
        case 2:
          Dr(e, vt, Ln);
          break;
        case 3:
          if (lr(e, i), (i & 130023424) === i && (t = od + 500 - Le(), 10 < t)) {
            if (Qo(e, 0) !== 0) break;
            if (o = e.suspendedLanes, (o & i) !== i) {
              st(), e.pingedLanes |= e.suspendedLanes & o;
              break;
            }
            e.timeoutHandle = Zc(Dr.bind(null, e, vt, Ln), t);
            break;
          }
          Dr(e, vt, Ln);
          break;
        case 4:
          if (lr(e, i), (i & 4194240) === i) break;
          for (t = e.eventTimes, o = -1; 0 < i; ) {
            var c = 31 - ln(i);
            a = 1 << c, c = t[c], c > o && (o = c), i &= ~a;
          }
          if (i = o, i = Le() - i, i = (120 > i ? 120 : 480 > i ? 480 : 1080 > i ? 1080 : 1920 > i ? 1920 : 3e3 > i ? 3e3 : 4320 > i ? 4320 : 1960 * dS(i / 1960)) - i, 10 < i) {
            e.timeoutHandle = Zc(Dr.bind(null, e, vt, Ln), i);
            break;
          }
          Dr(e, vt, Ln);
          break;
        case 5:
          Dr(e, vt, Ln);
          break;
        default:
          throw Error(j(329));
      }
    }
  }
  return St(e, Le()), e.callbackNode === r ? jg.bind(null, e) : null;
}
function vf(e, t) {
  var r = Ii;
  return e.current.memoizedState.isDehydrated && (Ur(e, t).flags |= 256), e = os(e, t), e !== 2 && (t = vt, vt = r, t !== null && gf(t)), e;
}
function gf(e) {
  vt === null ? vt = e : vt.push.apply(vt, e);
}
function pS(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var r = t.updateQueue;
      if (r !== null && (r = r.stores, r !== null)) for (var i = 0; i < r.length; i++) {
        var o = r[i], a = o.getSnapshot;
        o = o.value;
        try {
          if (!on(a(), o)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (r = t.child, t.subtreeFlags & 16384 && r !== null) r.return = t, t = r;
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function lr(e, t) {
  for (t &= ~ud, t &= ~Es, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var r = 31 - ln(t), i = 1 << r;
    e[r] = -1, t &= ~i;
  }
}
function hh(e) {
  if (ie & 6) throw Error(j(327));
  Tl();
  var t = Qo(e, 0);
  if (!(t & 1)) return St(e, Le()), null;
  var r = os(e, t);
  if (e.tag !== 0 && r === 2) {
    var i = Bc(e);
    i !== 0 && (t = i, r = vf(e, i));
  }
  if (r === 1) throw r = qi, Ur(e, 0), lr(e, t), St(e, Le()), r;
  if (r === 6) throw Error(j(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Dr(e, vt, Ln), St(e, Le()), null;
}
function sd(e, t) {
  var r = ie;
  ie |= 1;
  try {
    return e(t);
  } finally {
    ie = r, ie === 0 && (Hl = Le() + 500, ws && kr());
  }
}
function Yr(e) {
  ur !== null && ur.tag === 0 && !(ie & 6) && Tl();
  var t = ie;
  ie |= 1;
  var r = Xt.transition, i = de;
  try {
    if (Xt.transition = null, de = 1, e) return e();
  } finally {
    de = i, Xt.transition = r, ie = t, !(ie & 6) && kr();
  }
}
function ad() {
  zt = Pl.current, ye(Pl);
}
function Ur(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var r = e.timeoutHandle;
  if (r !== -1 && (e.timeoutHandle = -1, Qw(r)), Ie !== null) for (r = Ie.return; r !== null; ) {
    var i = r;
    switch (Qf(i), i.tag) {
      case 1:
        i = i.type.childContextTypes, i != null && Go();
        break;
      case 3:
        jl(), ye(yt), ye(lt), qf();
        break;
      case 5:
        $f(i);
        break;
      case 4:
        jl();
        break;
      case 13:
        ye(Ce);
        break;
      case 19:
        ye(Ce);
        break;
      case 10:
        Kf(i.type._context);
        break;
      case 22:
      case 23:
        ad();
    }
    r = r.return;
  }
  if (Ye = e, Ie = e = mr(e.current, null), Ge = zt = t, je = 0, qi = null, ud = Es = Vr = 0, vt = Ii = null, Ar !== null) {
    for (t = 0; t < Ar.length; t++) if (r = Ar[t], i = r.interleaved, i !== null) {
      r.interleaved = null;
      var o = i.next, a = r.pending;
      if (a !== null) {
        var c = a.next;
        a.next = o, i.next = c;
      }
      r.pending = i;
    }
    Ar = null;
  }
  return e;
}
function Ug(e, t) {
  do {
    var r = Ie;
    try {
      if (Xf(), Lo.current = rs, ns) {
        for (var i = Pe.memoizedState; i !== null; ) {
          var o = i.queue;
          o !== null && (o.pending = null), i = i.next;
        }
        ns = !1;
      }
      if (Qr = 0, Ve = Ae = Pe = null, Oi = !1, Zi = 0, id.current = null, r === null || r.return === null) {
        je = 1, qi = t, Ie = null;
        break;
      }
      e: {
        var a = e, c = r.return, p = r, m = t;
        if (t = Ge, p.flags |= 32768, m !== null && typeof m == "object" && typeof m.then == "function") {
          var h = m, x = p, k = x.tag;
          if (!(x.mode & 1) && (k === 0 || k === 11 || k === 15)) {
            var S = x.alternate;
            S ? (x.updateQueue = S.updateQueue, x.memoizedState = S.memoizedState, x.lanes = S.lanes) : (x.updateQueue = null, x.memoizedState = null);
          }
          var P = nh(c);
          if (P !== null) {
            P.flags &= -257, rh(P, c, p, a, t), P.mode & 1 && th(a, h, t), t = P, m = h;
            var N = t.updateQueue;
            if (N === null) {
              var _ = /* @__PURE__ */ new Set();
              _.add(m), t.updateQueue = _;
            } else N.add(m);
            break e;
          } else {
            if (!(t & 1)) {
              th(a, h, t), cd();
              break e;
            }
            m = Error(j(426));
          }
        } else if (xe && p.mode & 1) {
          var F = nh(c);
          if (F !== null) {
            !(F.flags & 65536) && (F.flags |= 256), rh(F, c, p, a, t), Vf(Ul(m, p));
            break e;
          }
        }
        a = m = Ul(m, p), je !== 4 && (je = 2), Ii === null ? Ii = [a] : Ii.push(a), a = c;
        do {
          switch (a.tag) {
            case 3:
              a.flags |= 65536, t &= -t, a.lanes |= t;
              var y = xg(a, m, t);
              Zm(a, y);
              break e;
            case 1:
              p = m;
              var g = a.type, w = a.stateNode;
              if (!(a.flags & 128) && (typeof g.getDerivedStateFromError == "function" || w !== null && typeof w.componentDidCatch == "function" && (dr === null || !dr.has(w)))) {
                a.flags |= 65536, t &= -t, a.lanes |= t;
                var L = Eg(a, p, t);
                Zm(a, L);
                break e;
              }
          }
          a = a.return;
        } while (a !== null);
      }
      Wg(r);
    } catch (M) {
      t = M, Ie === r && r !== null && (Ie = r = r.return);
      continue;
    }
    break;
  } while (!0);
}
function Hg() {
  var e = ls.current;
  return ls.current = rs, e === null ? rs : e;
}
function cd() {
  (je === 0 || je === 3 || je === 2) && (je = 4), Ye === null || !(Vr & 268435455) && !(Es & 268435455) || lr(Ye, Ge);
}
function os(e, t) {
  var r = ie;
  ie |= 2;
  var i = Hg();
  (Ye !== e || Ge !== t) && (Ln = null, Ur(e, t));
  do
    try {
      mS();
      break;
    } catch (o) {
      Ug(e, o);
    }
  while (!0);
  if (Xf(), ie = r, ls.current = i, Ie !== null) throw Error(j(261));
  return Ye = null, Ge = 0, je;
}
function mS() {
  for (; Ie !== null; ) Bg(Ie);
}
function hS() {
  for (; Ie !== null && !H1(); ) Bg(Ie);
}
function Bg(e) {
  var t = Vg(e.alternate, e, zt);
  e.memoizedProps = e.pendingProps, t === null ? Wg(e) : Ie = t, id.current = null;
}
function Wg(e) {
  var t = e;
  do {
    var r = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (r = sS(r, t), r !== null) {
        r.flags &= 32767, Ie = r;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        je = 6, Ie = null;
        return;
      }
    } else if (r = oS(r, t, zt), r !== null) {
      Ie = r;
      return;
    }
    if (t = t.sibling, t !== null) {
      Ie = t;
      return;
    }
    Ie = t = e;
  } while (t !== null);
  je === 0 && (je = 5);
}
function Dr(e, t, r) {
  var i = de, o = Xt.transition;
  try {
    Xt.transition = null, de = 1, vS(e, t, r, i);
  } finally {
    Xt.transition = o, de = i;
  }
  return null;
}
function vS(e, t, r, i) {
  do
    Tl();
  while (ur !== null);
  if (ie & 6) throw Error(j(327));
  r = e.finishedWork;
  var o = e.finishedLanes;
  if (r === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, r === e.current) throw Error(j(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var a = r.lanes | r.childLanes;
  if (J1(e, a), e === Ye && (Ie = Ye = null, Ge = 0), !(r.subtreeFlags & 2064) && !(r.flags & 2064) || yo || (yo = !0, Yg(Wo, function() {
    return Tl(), null;
  })), a = (r.flags & 15990) !== 0, r.subtreeFlags & 15990 || a) {
    a = Xt.transition, Xt.transition = null;
    var c = de;
    de = 1;
    var p = ie;
    ie |= 4, id.current = null, cS(e, r), Fg(r, e), Fw(Kc), Vo = !!Xc, Kc = Xc = null, e.current = r, fS(r), B1(), ie = p, de = c, Xt.transition = a;
  } else e.current = r;
  if (yo && (yo = !1, ur = e, us = o), a = e.pendingLanes, a === 0 && (dr = null), V1(r.stateNode), St(e, Le()), t !== null) for (i = e.onRecoverableError, r = 0; r < t.length; r++) o = t[r], i(o.value, { componentStack: o.stack, digest: o.digest });
  if (is) throw is = !1, e = mf, mf = null, e;
  return us & 1 && e.tag !== 0 && Tl(), a = e.pendingLanes, a & 1 ? e === hf ? Di++ : (Di = 0, hf = e) : Di = 0, kr(), null;
}
function Tl() {
  if (ur !== null) {
    var e = xv(us), t = Xt.transition, r = de;
    try {
      if (Xt.transition = null, de = 16 > e ? 16 : e, ur === null) var i = !1;
      else {
        if (e = ur, ur = null, us = 0, ie & 6) throw Error(j(331));
        var o = ie;
        for (ie |= 4, X = e.current; X !== null; ) {
          var a = X, c = a.child;
          if (X.flags & 16) {
            var p = a.deletions;
            if (p !== null) {
              for (var m = 0; m < p.length; m++) {
                var h = p[m];
                for (X = h; X !== null; ) {
                  var x = X;
                  switch (x.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Mi(8, x, a);
                  }
                  var k = x.child;
                  if (k !== null) k.return = x, X = k;
                  else for (; X !== null; ) {
                    x = X;
                    var S = x.sibling, P = x.return;
                    if (Mg(x), x === h) {
                      X = null;
                      break;
                    }
                    if (S !== null) {
                      S.return = P, X = S;
                      break;
                    }
                    X = P;
                  }
                }
              }
              var N = a.alternate;
              if (N !== null) {
                var _ = N.child;
                if (_ !== null) {
                  N.child = null;
                  do {
                    var F = _.sibling;
                    _.sibling = null, _ = F;
                  } while (_ !== null);
                }
              }
              X = a;
            }
          }
          if (a.subtreeFlags & 2064 && c !== null) c.return = a, X = c;
          else e: for (; X !== null; ) {
            if (a = X, a.flags & 2048) switch (a.tag) {
              case 0:
              case 11:
              case 15:
                Mi(9, a, a.return);
            }
            var y = a.sibling;
            if (y !== null) {
              y.return = a.return, X = y;
              break e;
            }
            X = a.return;
          }
        }
        var g = e.current;
        for (X = g; X !== null; ) {
          c = X;
          var w = c.child;
          if (c.subtreeFlags & 2064 && w !== null) w.return = c, X = w;
          else e: for (c = g; X !== null; ) {
            if (p = X, p.flags & 2048) try {
              switch (p.tag) {
                case 0:
                case 11:
                case 15:
                  xs(9, p);
              }
            } catch (M) {
              Ne(p, p.return, M);
            }
            if (p === c) {
              X = null;
              break e;
            }
            var L = p.sibling;
            if (L !== null) {
              L.return = p.return, X = L;
              break e;
            }
            X = p.return;
          }
        }
        if (ie = o, kr(), Sn && typeof Sn.onPostCommitFiberRoot == "function") try {
          Sn.onPostCommitFiberRoot(ms, e);
        } catch {
        }
        i = !0;
      }
      return i;
    } finally {
      de = r, Xt.transition = t;
    }
  }
  return !1;
}
function vh(e, t, r) {
  t = Ul(r, t), t = xg(e, t, 1), e = fr(e, t, 1), t = st(), e !== null && (nu(e, 1, t), St(e, t));
}
function Ne(e, t, r) {
  if (e.tag === 3) vh(e, e, r);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      vh(t, e, r);
      break;
    } else if (t.tag === 1) {
      var i = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (dr === null || !dr.has(i))) {
        e = Ul(r, e), e = Eg(t, e, 1), t = fr(t, e, 1), e = st(), t !== null && (nu(t, 1, e), St(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function gS(e, t, r) {
  var i = e.pingCache;
  i !== null && i.delete(t), t = st(), e.pingedLanes |= e.suspendedLanes & r, Ye === e && (Ge & r) === r && (je === 4 || je === 3 && (Ge & 130023424) === Ge && 500 > Le() - od ? Ur(e, 0) : ud |= r), St(e, t);
}
function Qg(e, t) {
  t === 0 && (e.mode & 1 ? (t = oo, oo <<= 1, !(oo & 130023424) && (oo = 4194304)) : t = 1);
  var r = st();
  e = Un(e, t), e !== null && (nu(e, t, r), St(e, r));
}
function yS(e) {
  var t = e.memoizedState, r = 0;
  t !== null && (r = t.retryLane), Qg(e, r);
}
function wS(e, t) {
  var r = 0;
  switch (e.tag) {
    case 13:
      var i = e.stateNode, o = e.memoizedState;
      o !== null && (r = o.retryLane);
      break;
    case 19:
      i = e.stateNode;
      break;
    default:
      throw Error(j(314));
  }
  i !== null && i.delete(t), Qg(e, r);
}
var Vg;
Vg = function(e, t, r) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || yt.current) gt = !0;
  else {
    if (!(e.lanes & r) && !(t.flags & 128)) return gt = !1, uS(e, t, r);
    gt = !!(e.flags & 131072);
  }
  else gt = !1, xe && t.flags & 1048576 && Gv(t, $o, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var i = t.type;
      Oo(e, t), e = t.pendingProps;
      var o = Dl(t, lt.current);
      Ll(t, r), o = ed(null, t, i, e, o, r);
      var a = td();
      return t.flags |= 1, typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, wt(i) ? (a = !0, Zo(t)) : a = !1, t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, Zf(t), o.updater = ks, t.stateNode = o, o._reactInternals = t, nf(t, i, e, r), t = uf(null, t, i, !0, a, r)) : (t.tag = 0, xe && a && Wf(t), ot(null, t, o, r), t = t.child), t;
    case 16:
      i = t.elementType;
      e: {
        switch (Oo(e, t), e = t.pendingProps, o = i._init, i = o(i._payload), t.type = i, o = t.tag = kS(i), e = tn(i, e), o) {
          case 0:
            t = lf(null, t, i, e, r);
            break e;
          case 1:
            t = uh(null, t, i, e, r);
            break e;
          case 11:
            t = lh(null, t, i, e, r);
            break e;
          case 14:
            t = ih(null, t, i, tn(i.type, e), r);
            break e;
        }
        throw Error(j(
          306,
          i,
          ""
        ));
      }
      return t;
    case 0:
      return i = t.type, o = t.pendingProps, o = t.elementType === i ? o : tn(i, o), lf(e, t, i, o, r);
    case 1:
      return i = t.type, o = t.pendingProps, o = t.elementType === i ? o : tn(i, o), uh(e, t, i, o, r);
    case 3:
      e: {
        if (zg(t), e === null) throw Error(j(387));
        i = t.pendingProps, a = t.memoizedState, o = a.element, eg(e, t), es(t, i, null, r);
        var c = t.memoizedState;
        if (i = c.element, a.isDehydrated) if (a = { element: i, isDehydrated: !1, cache: c.cache, pendingSuspenseBoundaries: c.pendingSuspenseBoundaries, transitions: c.transitions }, t.updateQueue.baseState = a, t.memoizedState = a, t.flags & 256) {
          o = Ul(Error(j(423)), t), t = oh(e, t, i, r, o);
          break e;
        } else if (i !== o) {
          o = Ul(Error(j(424)), t), t = oh(e, t, i, r, o);
          break e;
        } else for (Nt = cr(t.stateNode.containerInfo.firstChild), Rt = t, xe = !0, rn = null, r = qv(t, null, i, r), t.child = r; r; ) r.flags = r.flags & -3 | 4096, r = r.sibling;
        else {
          if (Fl(), i === o) {
            t = Hn(e, t, r);
            break e;
          }
          ot(e, t, i, r);
        }
        t = t.child;
      }
      return t;
    case 5:
      return tg(t), e === null && bc(t), i = t.type, o = t.pendingProps, a = e !== null ? e.memoizedProps : null, c = o.children, Gc(i, o) ? c = null : a !== null && Gc(i, a) && (t.flags |= 32), _g(e, t), ot(e, t, c, r), t.child;
    case 6:
      return e === null && bc(t), null;
    case 13:
      return Ng(e, t, r);
    case 4:
      return Jf(t, t.stateNode.containerInfo), i = t.pendingProps, e === null ? t.child = Al(t, null, i, r) : ot(e, t, i, r), t.child;
    case 11:
      return i = t.type, o = t.pendingProps, o = t.elementType === i ? o : tn(i, o), lh(e, t, i, o, r);
    case 7:
      return ot(e, t, t.pendingProps, r), t.child;
    case 8:
      return ot(e, t, t.pendingProps.children, r), t.child;
    case 12:
      return ot(e, t, t.pendingProps.children, r), t.child;
    case 10:
      e: {
        if (i = t.type._context, o = t.pendingProps, a = t.memoizedProps, c = o.value, he(qo, i._currentValue), i._currentValue = c, a !== null) if (on(a.value, c)) {
          if (a.children === o.children && !yt.current) {
            t = Hn(e, t, r);
            break e;
          }
        } else for (a = t.child, a !== null && (a.return = t); a !== null; ) {
          var p = a.dependencies;
          if (p !== null) {
            c = a.child;
            for (var m = p.firstContext; m !== null; ) {
              if (m.context === i) {
                if (a.tag === 1) {
                  m = In(-1, r & -r), m.tag = 2;
                  var h = a.updateQueue;
                  if (h !== null) {
                    h = h.shared;
                    var x = h.pending;
                    x === null ? m.next = m : (m.next = x.next, x.next = m), h.pending = m;
                  }
                }
                a.lanes |= r, m = a.alternate, m !== null && (m.lanes |= r), ef(
                  a.return,
                  r,
                  t
                ), p.lanes |= r;
                break;
              }
              m = m.next;
            }
          } else if (a.tag === 10) c = a.type === t.type ? null : a.child;
          else if (a.tag === 18) {
            if (c = a.return, c === null) throw Error(j(341));
            c.lanes |= r, p = c.alternate, p !== null && (p.lanes |= r), ef(c, r, t), c = a.sibling;
          } else c = a.child;
          if (c !== null) c.return = a;
          else for (c = a; c !== null; ) {
            if (c === t) {
              c = null;
              break;
            }
            if (a = c.sibling, a !== null) {
              a.return = c.return, c = a;
              break;
            }
            c = c.return;
          }
          a = c;
        }
        ot(e, t, o.children, r), t = t.child;
      }
      return t;
    case 9:
      return o = t.type, i = t.pendingProps.children, Ll(t, r), o = Kt(o), i = i(o), t.flags |= 1, ot(e, t, i, r), t.child;
    case 14:
      return i = t.type, o = tn(i, t.pendingProps), o = tn(i.type, o), ih(e, t, i, o, r);
    case 15:
      return Cg(e, t, t.type, t.pendingProps, r);
    case 17:
      return i = t.type, o = t.pendingProps, o = t.elementType === i ? o : tn(i, o), Oo(e, t), t.tag = 1, wt(i) ? (e = !0, Zo(t)) : e = !1, Ll(t, r), kg(t, i, o), nf(t, i, o, r), uf(null, t, i, !0, e, r);
    case 19:
      return Rg(e, t, r);
    case 22:
      return Pg(e, t, r);
  }
  throw Error(j(156, t.tag));
};
function Yg(e, t) {
  return yv(e, t);
}
function SS(e, t, r, i) {
  this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Yt(e, t, r, i) {
  return new SS(e, t, r, i);
}
function fd(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function kS(e) {
  if (typeof e == "function") return fd(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Lf) return 11;
    if (e === Tf) return 14;
  }
  return 2;
}
function mr(e, t) {
  var r = e.alternate;
  return r === null ? (r = Yt(e.tag, t, e.key, e.mode), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = t, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 14680064, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, t = e.dependencies, r.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r;
}
function Do(e, t, r, i, o, a) {
  var c = 2;
  if (i = e, typeof e == "function") fd(e) && (c = 1);
  else if (typeof e == "string") c = 5;
  else e: switch (e) {
    case hl:
      return Hr(r.children, o, a, t);
    case Rf:
      c = 8, o |= 8;
      break;
    case _c:
      return e = Yt(12, r, t, o | 2), e.elementType = _c, e.lanes = a, e;
    case zc:
      return e = Yt(13, r, t, o), e.elementType = zc, e.lanes = a, e;
    case Nc:
      return e = Yt(19, r, t, o), e.elementType = Nc, e.lanes = a, e;
    case tv:
      return Cs(r, o, a, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case bh:
          c = 10;
          break e;
        case ev:
          c = 9;
          break e;
        case Lf:
          c = 11;
          break e;
        case Tf:
          c = 14;
          break e;
        case tr:
          c = 16, i = null;
          break e;
      }
      throw Error(j(130, e == null ? e : typeof e, ""));
  }
  return t = Yt(c, r, t, o), t.elementType = e, t.type = i, t.lanes = a, t;
}
function Hr(e, t, r, i) {
  return e = Yt(7, e, i, t), e.lanes = r, e;
}
function Cs(e, t, r, i) {
  return e = Yt(22, e, i, t), e.elementType = tv, e.lanes = r, e.stateNode = { isHidden: !1 }, e;
}
function hc(e, t, r) {
  return e = Yt(6, e, null, t), e.lanes = r, e;
}
function vc(e, t, r) {
  return t = Yt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = r, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function xS(e, t, r, i, o) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ja(0), this.expirationTimes = Ja(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ja(0), this.identifierPrefix = i, this.onRecoverableError = o, this.mutableSourceEagerHydrationData = null;
}
function dd(e, t, r, i, o, a, c, p, m) {
  return e = new xS(e, t, r, p, m), t === 1 ? (t = 1, a === !0 && (t |= 8)) : t = 0, a = Yt(3, null, null, t), e.current = a, a.stateNode = e, a.memoizedState = { element: i, isDehydrated: r, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Zf(a), e;
}
function ES(e, t, r) {
  var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: ml, key: i == null ? null : "" + i, children: e, containerInfo: t, implementation: r };
}
function Xg(e) {
  if (!e) return vr;
  e = e._reactInternals;
  e: {
    if (Zr(e) !== e || e.tag !== 1) throw Error(j(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (wt(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(j(171));
  }
  if (e.tag === 1) {
    var r = e.type;
    if (wt(r)) return Xv(e, r, t);
  }
  return t;
}
function Kg(e, t, r, i, o, a, c, p, m) {
  return e = dd(r, i, !0, e, o, a, c, p, m), e.context = Xg(null), r = e.current, i = st(), o = pr(r), a = In(i, o), a.callback = t ?? null, fr(r, a, o), e.current.lanes = o, nu(e, o, i), St(e, i), e;
}
function Ps(e, t, r, i) {
  var o = t.current, a = st(), c = pr(o);
  return r = Xg(r), t.context === null ? t.context = r : t.pendingContext = r, t = In(a, c), t.payload = { element: e }, i = i === void 0 ? null : i, i !== null && (t.callback = i), e = fr(o, t, c), e !== null && (un(e, o, c, a), Ro(e, o, c)), c;
}
function ss(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function gh(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var r = e.retryLane;
    e.retryLane = r !== 0 && r < t ? r : t;
  }
}
function pd(e, t) {
  gh(e, t), (e = e.alternate) && gh(e, t);
}
function CS() {
  return null;
}
var Gg = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function md(e) {
  this._internalRoot = e;
}
_s.prototype.render = md.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(j(409));
  Ps(e, t, null, null);
};
_s.prototype.unmount = md.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Yr(function() {
      Ps(null, e, null, null);
    }), t[jn] = null;
  }
};
function _s(e) {
  this._internalRoot = e;
}
_s.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Pv();
    e = { blockedOn: null, target: e, priority: t };
    for (var r = 0; r < rr.length && t !== 0 && t < rr[r].priority; r++) ;
    rr.splice(r, 0, e), r === 0 && zv(e);
  }
};
function hd(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function zs(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function yh() {
}
function PS(e, t, r, i, o) {
  if (o) {
    if (typeof i == "function") {
      var a = i;
      i = function() {
        var h = ss(c);
        a.call(h);
      };
    }
    var c = Kg(t, i, e, 0, null, !1, !1, "", yh);
    return e._reactRootContainer = c, e[jn] = c.current, Vi(e.nodeType === 8 ? e.parentNode : e), Yr(), c;
  }
  for (; o = e.lastChild; ) e.removeChild(o);
  if (typeof i == "function") {
    var p = i;
    i = function() {
      var h = ss(m);
      p.call(h);
    };
  }
  var m = dd(e, 0, !1, null, null, !1, !1, "", yh);
  return e._reactRootContainer = m, e[jn] = m.current, Vi(e.nodeType === 8 ? e.parentNode : e), Yr(function() {
    Ps(t, m, r, i);
  }), m;
}
function Ns(e, t, r, i, o) {
  var a = r._reactRootContainer;
  if (a) {
    var c = a;
    if (typeof o == "function") {
      var p = o;
      o = function() {
        var m = ss(c);
        p.call(m);
      };
    }
    Ps(t, c, e, o);
  } else c = PS(r, t, e, o, i);
  return ss(c);
}
Ev = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var r = Pi(t.pendingLanes);
        r !== 0 && (If(t, r | 1), St(t, Le()), !(ie & 6) && (Hl = Le() + 500, kr()));
      }
      break;
    case 13:
      Yr(function() {
        var i = Un(e, 1);
        if (i !== null) {
          var o = st();
          un(i, e, 1, o);
        }
      }), pd(e, 1);
  }
};
Df = function(e) {
  if (e.tag === 13) {
    var t = Un(e, 134217728);
    if (t !== null) {
      var r = st();
      un(t, e, 134217728, r);
    }
    pd(e, 134217728);
  }
};
Cv = function(e) {
  if (e.tag === 13) {
    var t = pr(e), r = Un(e, t);
    if (r !== null) {
      var i = st();
      un(r, e, t, i);
    }
    pd(e, t);
  }
};
Pv = function() {
  return de;
};
_v = function(e, t) {
  var r = de;
  try {
    return de = e, t();
  } finally {
    de = r;
  }
};
jc = function(e, t, r) {
  switch (t) {
    case "input":
      if (Tc(e, r), t = r.name, r.type === "radio" && t != null) {
        for (r = e; r.parentNode; ) r = r.parentNode;
        for (r = r.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < r.length; t++) {
          var i = r[t];
          if (i !== e && i.form === e.form) {
            var o = ys(i);
            if (!o) throw Error(j(90));
            rv(i), Tc(i, o);
          }
        }
      }
      break;
    case "textarea":
      iv(e, r);
      break;
    case "select":
      t = r.value, t != null && _l(e, !!r.multiple, t, !1);
  }
};
dv = sd;
pv = Yr;
var _S = { usingClientEntryPoint: !1, Events: [lu, wl, ys, cv, fv, sd] }, xi = { findFiberByHostInstance: Fr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, zS = { bundleType: xi.bundleType, version: xi.version, rendererPackageName: xi.rendererPackageName, rendererConfig: xi.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Wn.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = vv(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: xi.findFiberByHostInstance || CS, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var wo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!wo.isDisabled && wo.supportsFiber) try {
    ms = wo.inject(zS), Sn = wo;
  } catch {
  }
}
Tt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = _S;
Tt.createPortal = function(e, t) {
  var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!hd(t)) throw Error(j(200));
  return ES(e, t, null, r);
};
Tt.createRoot = function(e, t) {
  if (!hd(e)) throw Error(j(299));
  var r = !1, i = "", o = Gg;
  return t != null && (t.unstable_strictMode === !0 && (r = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = dd(e, 1, !1, null, null, r, !1, i, o), e[jn] = t.current, Vi(e.nodeType === 8 ? e.parentNode : e), new md(t);
};
Tt.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(j(188)) : (e = Object.keys(e).join(","), Error(j(268, e)));
  return e = vv(t), e = e === null ? null : e.stateNode, e;
};
Tt.flushSync = function(e) {
  return Yr(e);
};
Tt.hydrate = function(e, t, r) {
  if (!zs(t)) throw Error(j(200));
  return Ns(null, e, t, !0, r);
};
Tt.hydrateRoot = function(e, t, r) {
  if (!hd(e)) throw Error(j(405));
  var i = r != null && r.hydratedSources || null, o = !1, a = "", c = Gg;
  if (r != null && (r.unstable_strictMode === !0 && (o = !0), r.identifierPrefix !== void 0 && (a = r.identifierPrefix), r.onRecoverableError !== void 0 && (c = r.onRecoverableError)), t = Kg(t, null, e, 1, r ?? null, o, !1, a, c), e[jn] = t.current, Vi(e), i) for (e = 0; e < i.length; e++) r = i[e], o = r._getVersion, o = o(r._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [r, o] : t.mutableSourceEagerHydrationData.push(
    r,
    o
  );
  return new _s(t);
};
Tt.render = function(e, t, r) {
  if (!zs(t)) throw Error(j(200));
  return Ns(null, e, t, !1, r);
};
Tt.unmountComponentAtNode = function(e) {
  if (!zs(e)) throw Error(j(40));
  return e._reactRootContainer ? (Yr(function() {
    Ns(null, null, e, !1, function() {
      e._reactRootContainer = null, e[jn] = null;
    });
  }), !0) : !1;
};
Tt.unstable_batchedUpdates = sd;
Tt.unstable_renderSubtreeIntoContainer = function(e, t, r, i) {
  if (!zs(r)) throw Error(j(200));
  if (e == null || e._reactInternals === void 0) throw Error(j(38));
  return Ns(e, t, r, !1, i);
};
Tt.version = "18.3.1-next-f1338f8080-20240426";
function Zg() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Zg);
    } catch (e) {
      console.error(e);
    }
}
Zg(), Zh.exports = Tt;
var vd = Zh.exports;
const kk = /* @__PURE__ */ kf(vd);
var NS, wh = vd;
NS = wh.createRoot, wh.hydrateRoot;
const RS = ["top", "right", "bottom", "left"], gr = Math.min, Dn = Math.max, as = Math.round, So = Math.floor, Fn = (e) => ({
  x: e,
  y: e
}), LS = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Jg(e, t, r) {
  return Dn(e, gr(t, r));
}
function Bn(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function yr(e) {
  return e.split("-")[0];
}
function Vl(e) {
  return e.split("-")[1];
}
function gd(e) {
  return e === "x" ? "y" : "x";
}
function yd(e) {
  return e === "y" ? "height" : "width";
}
function wn(e) {
  const t = e[0];
  return t === "t" || t === "b" ? "y" : "x";
}
function wd(e) {
  return gd(wn(e));
}
function TS(e, t, r) {
  r === void 0 && (r = !1);
  const i = Vl(e), o = wd(e), a = yd(o);
  let c = o === "x" ? i === (r ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (c = cs(c)), [c, cs(c)];
}
function OS(e) {
  const t = cs(e);
  return [yf(e), t, yf(t)];
}
function yf(e) {
  return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
const Sh = ["left", "right"], kh = ["right", "left"], MS = ["top", "bottom"], IS = ["bottom", "top"];
function DS(e, t, r) {
  switch (e) {
    case "top":
    case "bottom":
      return r ? t ? kh : Sh : t ? Sh : kh;
    case "left":
    case "right":
      return t ? MS : IS;
    default:
      return [];
  }
}
function FS(e, t, r, i) {
  const o = Vl(e);
  let a = DS(yr(e), r === "start", i);
  return o && (a = a.map((c) => c + "-" + o), t && (a = a.concat(a.map(yf)))), a;
}
function cs(e) {
  const t = yr(e);
  return LS[t] + e.slice(t.length);
}
function AS(e) {
  var t, r, i, o;
  return {
    top: (t = e.top) != null ? t : 0,
    right: (r = e.right) != null ? r : 0,
    bottom: (i = e.bottom) != null ? i : 0,
    left: (o = e.left) != null ? o : 0
  };
}
function $g(e) {
  return typeof e != "number" ? AS(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function fs(e) {
  const {
    x: t,
    y: r,
    width: i,
    height: o
  } = e;
  return {
    width: i,
    height: o,
    top: r,
    left: t,
    right: t + i,
    bottom: r + o,
    x: t,
    y: r
  };
}
function xh(e, t, r) {
  let {
    reference: i,
    floating: o
  } = e;
  const a = wn(t), c = wd(t), p = yd(c), m = yr(t), h = a === "y", x = i.x + i.width / 2 - o.width / 2, k = i.y + i.height / 2 - o.height / 2, S = i[p] / 2 - o[p] / 2;
  let P;
  switch (m) {
    case "top":
      P = {
        x,
        y: i.y - o.height
      };
      break;
    case "bottom":
      P = {
        x,
        y: i.y + i.height
      };
      break;
    case "right":
      P = {
        x: i.x + i.width,
        y: k
      };
      break;
    case "left":
      P = {
        x: i.x - o.width,
        y: k
      };
      break;
    default:
      P = {
        x: i.x,
        y: i.y
      };
  }
  const N = Vl(t);
  return N && (P[c] += S * (N === "end" ? 1 : -1) * (r && h ? -1 : 1)), P;
}
async function jS(e, t) {
  var r;
  t === void 0 && (t = {});
  const {
    x: i,
    y: o,
    platform: a,
    rects: c,
    elements: p,
    strategy: m
  } = e, {
    boundary: h = "clippingAncestors",
    rootBoundary: x = "viewport",
    elementContext: k = "floating",
    altBoundary: S = !1,
    padding: P = 0
  } = Bn(t, e), N = $g(P), F = p[S ? k === "floating" ? "reference" : "floating" : k], y = fs(await a.getClippingRect({
    element: (r = await (a.isElement == null ? void 0 : a.isElement(F))) == null || r ? F : F.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(p.floating)),
    boundary: h,
    rootBoundary: x,
    strategy: m
  })), g = k === "floating" ? {
    x: i,
    y: o,
    width: c.floating.width,
    height: c.floating.height
  } : c.reference, w = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(p.floating)), L = await (a.isElement == null ? void 0 : a.isElement(w)) && await (a.getScale == null ? void 0 : a.getScale(w)) || {
    x: 1,
    y: 1
  }, M = fs(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: p,
    rect: g,
    offsetParent: w,
    strategy: m
  }) : g);
  return {
    top: (y.top - M.top + N.top) / L.y,
    bottom: (M.bottom - y.bottom + N.bottom) / L.y,
    left: (y.left - M.left + N.left) / L.x,
    right: (M.right - y.right + N.right) / L.x
  };
}
const US = 50, HS = async (e, t, r) => {
  const {
    placement: i = "bottom",
    strategy: o = "absolute",
    middleware: a = [],
    platform: c
  } = r, p = c.detectOverflow ? c : {
    ...c,
    detectOverflow: jS
  }, m = await (c.isRTL == null ? void 0 : c.isRTL(t));
  let h = await c.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x,
    y: k
  } = xh(h, i, m), S = i, P = 0;
  const N = {};
  for (let _ = 0; _ < a.length; _++) {
    const F = a[_];
    if (!F)
      continue;
    const {
      name: y,
      fn: g
    } = F, {
      x: w,
      y: L,
      data: M,
      reset: I
    } = await g({
      x,
      y: k,
      initialPlacement: i,
      placement: S,
      strategy: o,
      middlewareData: N,
      rects: h,
      platform: p,
      elements: {
        reference: e,
        floating: t
      }
    });
    x = w ?? x, k = L ?? k, N[y] = {
      ...N[y],
      ...M
    }, I && P < US && (P++, typeof I == "object" && (I.placement && (S = I.placement), I.rects && (h = I.rects === !0 ? await c.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : I.rects), {
      x,
      y: k
    } = xh(h, S, m)), _ = -1);
  }
  return {
    x,
    y: k,
    placement: S,
    strategy: o,
    middlewareData: N
  };
}, BS = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: r,
      y: i,
      placement: o,
      rects: a,
      platform: c,
      elements: p,
      middlewareData: m
    } = t, {
      element: h,
      padding: x = 0
    } = Bn(e, t) || {};
    if (h == null)
      return {};
    const k = $g(x), S = {
      x: r,
      y: i
    }, P = wd(o), N = yd(P), _ = await c.getDimensions(h), F = P === "y", y = F ? "top" : "left", g = F ? "bottom" : "right", w = F ? "clientHeight" : "clientWidth", L = a.reference[N] + a.reference[P] - S[P] - a.floating[N], M = S[P] - a.reference[P], I = await (c.getOffsetParent == null ? void 0 : c.getOffsetParent(h));
    let D = I ? I[w] : 0;
    (!D || !await (c.isElement == null ? void 0 : c.isElement(I))) && (D = p.floating[w] || a.floating[N]);
    const B = L / 2 - M / 2, $ = D / 2 - _[N] / 2 - 1, V = gr(k[y], $), ue = gr(k[g], $), we = D - _[N] - ue, ce = D / 2 - _[N] / 2 + B, Se = Jg(V, ce, we), De = !m.arrow && Vl(o) != null && ce !== Se && a.reference[N] / 2 - (ce < V ? V : ue) - _[N] / 2 < 0, fe = De ? ce < V ? ce - V : ce - we : 0;
    return {
      [P]: S[P] + fe,
      data: {
        [P]: Se,
        centerOffset: ce - Se - fe,
        ...De && {
          alignmentOffset: fe
        }
      },
      reset: De
    };
  }
}), WS = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var r, i;
      const {
        placement: o,
        middlewareData: a,
        rects: c,
        initialPlacement: p,
        platform: m,
        elements: h
      } = t, {
        mainAxis: x = !0,
        crossAxis: k = !0,
        fallbackPlacements: S,
        fallbackStrategy: P = "bestFit",
        fallbackAxisSideDirection: N = "none",
        flipAlignment: _ = !0,
        ...F
      } = Bn(e, t);
      if ((r = a.arrow) != null && r.alignmentOffset)
        return {};
      const y = yr(o), g = wn(p), w = yr(p) === p, L = await (m.isRTL == null ? void 0 : m.isRTL(h.floating)), M = S || (w || !_ ? [cs(p)] : OS(p)), I = N !== "none";
      !S && I && M.push(...FS(p, _, N, L));
      const D = [p, ...M], B = await m.detectOverflow(t, F), $ = [];
      let V = ((i = a.flip) == null ? void 0 : i.overflows) || [];
      if (x && $.push(B[y]), k) {
        const Se = TS(o, c, L);
        $.push(B[Se[0]], B[Se[1]]);
      }
      if (V = [...V, {
        placement: o,
        overflows: $
      }], !$.every((Se) => Se <= 0)) {
        var ue, we;
        const Se = (((ue = a.flip) == null ? void 0 : ue.index) || 0) + 1, De = D[Se];
        if (De && (!(k === "alignment" ? g !== wn(De) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        V.every((z) => wn(z.placement) === g ? z.overflows[0] > 0 : !0)))
          return {
            data: {
              index: Se,
              overflows: V
            },
            reset: {
              placement: De
            }
          };
        let fe = (we = V.filter((Te) => Te.overflows[0] <= 0).sort((Te, z) => Te.overflows[1] - z.overflows[1])[0]) == null ? void 0 : we.placement;
        if (!fe)
          switch (P) {
            case "bestFit": {
              var ce;
              const Te = (ce = V.filter((z) => {
                if (I) {
                  const A = wn(z.placement);
                  return A === g || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  A === "y";
                }
                return !0;
              }).map((z) => [z.placement, z.overflows.filter((A) => A > 0).reduce((A, U) => A + U, 0)]).sort((z, A) => z[1] - A[1])[0]) == null ? void 0 : ce[0];
              Te && (fe = Te);
              break;
            }
            case "initialPlacement":
              fe = p;
              break;
          }
        if (o !== fe)
          return {
            reset: {
              placement: fe
            }
          };
      }
      return {};
    }
  };
};
function Eh(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Ch(e) {
  return RS.some((t) => e[t] >= 0);
}
const QS = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: r,
        platform: i
      } = t, {
        strategy: o = "referenceHidden",
        ...a
      } = Bn(e, t);
      switch (o) {
        case "referenceHidden": {
          const c = await i.detectOverflow(t, {
            ...a,
            elementContext: "reference"
          }), p = Eh(c, r.reference);
          return {
            data: {
              referenceHiddenOffsets: p,
              referenceHidden: Ch(p)
            }
          };
        }
        case "escaped": {
          const c = await i.detectOverflow(t, {
            ...a,
            altBoundary: !0
          }), p = Eh(c, r.floating);
          return {
            data: {
              escapedOffsets: p,
              escaped: Ch(p)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, qg = /* @__PURE__ */ new Set(["left", "top"]);
async function VS(e, t) {
  const {
    placement: r,
    platform: i,
    elements: o
  } = e, a = await (i.isRTL == null ? void 0 : i.isRTL(o.floating)), c = yr(r), p = Vl(r), m = wn(r) === "y", h = qg.has(c) ? -1 : 1, x = a && m ? -1 : 1, k = Bn(t, e);
  let {
    mainAxis: S,
    crossAxis: P,
    alignmentAxis: N
  } = typeof k == "number" ? {
    mainAxis: k,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: k.mainAxis || 0,
    crossAxis: k.crossAxis || 0,
    alignmentAxis: k.alignmentAxis
  };
  return p && typeof N == "number" && (P = p === "end" ? N * -1 : N), m ? {
    x: P * x,
    y: S * h
  } : {
    x: S * h,
    y: P * x
  };
}
const YS = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var r, i;
      const {
        x: o,
        y: a,
        placement: c,
        middlewareData: p
      } = t, m = await VS(t, e);
      return c === ((r = p.offset) == null ? void 0 : r.placement) && (i = p.arrow) != null && i.alignmentOffset ? {} : {
        x: o + m.x,
        y: a + m.y,
        data: {
          ...m,
          placement: c
        }
      };
    }
  };
}, XS = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: r,
        y: i,
        placement: o,
        platform: a
      } = t, {
        mainAxis: c = !0,
        crossAxis: p = !1,
        limiter: m = {
          fn: (g) => {
            let {
              x: w,
              y: L
            } = g;
            return {
              x: w,
              y: L
            };
          }
        },
        ...h
      } = Bn(e, t), x = {
        x: r,
        y: i
      }, k = await a.detectOverflow(t, h), S = wn(o), P = gd(S);
      let N = x[P], _ = x[S];
      const F = (g, w) => Jg(w + k[g === "y" ? "top" : "left"], w, w - k[g === "y" ? "bottom" : "right"]);
      c && (N = F(P, N)), p && (_ = F(S, _));
      const y = m.fn({
        ...t,
        [P]: N,
        [S]: _
      });
      return {
        ...y,
        data: {
          x: y.x - r,
          y: y.y - i,
          enabled: {
            [P]: c,
            [S]: p
          }
        }
      };
    }
  };
}, KS = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      var r, i;
      const {
        x: o,
        y: a,
        placement: c,
        rects: p,
        middlewareData: m
      } = t, {
        offset: h = 0,
        mainAxis: x = !0,
        crossAxis: k = !0
      } = Bn(e, t), S = {
        x: o,
        y: a
      }, P = wn(c), N = gd(P);
      let _ = S[N], F = S[P];
      const y = Bn(h, t), g = typeof y == "number" ? {
        mainAxis: y,
        crossAxis: 0
      } : {
        mainAxis: (r = y.mainAxis) != null ? r : 0,
        crossAxis: (i = y.crossAxis) != null ? i : 0
      };
      if (x) {
        const M = N === "y" ? "height" : "width", I = p.reference[N] - p.floating[M] + g.mainAxis, D = p.reference[N] + p.reference[M] - g.mainAxis;
        _ < I ? _ = I : _ > D && (_ = D);
      }
      if (k) {
        var w, L;
        const M = N === "y" ? "width" : "height", I = qg.has(yr(c)), D = p.reference[P] - p.floating[M] + (I && ((w = m.offset) == null ? void 0 : w[P]) || 0) + (I ? 0 : g.crossAxis), B = p.reference[P] + p.reference[M] + (I ? 0 : ((L = m.offset) == null ? void 0 : L[P]) || 0) - (I ? g.crossAxis : 0);
        F < D ? F = D : F > B && (F = B);
      }
      return {
        [N]: _,
        [P]: F
      };
    }
  };
}, GS = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      const {
        placement: r,
        rects: i,
        platform: o,
        elements: a
      } = t, {
        apply: c = () => {
        },
        ...p
      } = Bn(e, t), m = await o.detectOverflow(t, p), h = yr(r), x = Vl(r), k = wn(r) === "y", {
        width: S,
        height: P
      } = i.floating;
      let N, _;
      h === "top" || h === "bottom" ? (N = h, _ = x === (await (o.isRTL == null ? void 0 : o.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (_ = h, N = x === "end" ? "top" : "bottom");
      const F = P - m.top - m.bottom, y = S - m.left - m.right, g = gr(P - m[N], F), w = gr(S - m[_], y), L = t.middlewareData.shift, M = !L;
      let I = g, D = w;
      L != null && L.enabled.x && (D = y), L != null && L.enabled.y && (I = F), M && !x && (k ? D = S - 2 * Dn(m.left, m.right) : I = P - 2 * Dn(m.top, m.bottom)), await c({
        ...t,
        availableWidth: D,
        availableHeight: I
      });
      const B = await o.getDimensions(a.floating);
      return S !== B.width || P !== B.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Rs() {
  return typeof window < "u";
}
function Yl(e) {
  return bg(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function kt(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Qn(e) {
  var t;
  return (t = (bg(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function bg(e) {
  return Rs() ? e instanceof Node || e instanceof kt(e).Node : !1;
}
function xn(e) {
  return Rs() ? e instanceof Element || e instanceof kt(e).Element : !1;
}
function xr(e) {
  return Rs() ? e instanceof HTMLElement || e instanceof kt(e).HTMLElement : !1;
}
function Ph(e) {
  return !Rs() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof kt(e).ShadowRoot;
}
function Ls(e) {
  const {
    overflow: t,
    overflowX: r,
    overflowY: i,
    display: o
  } = En(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + i + r) && o !== "inline" && o !== "contents";
}
function ZS(e) {
  return /^(table|td|th)$/.test(Yl(e));
}
function Ts(e) {
  try {
    if (e.matches(":popover-open"))
      return !0;
  } catch {
  }
  try {
    return e.matches(":modal");
  } catch {
    return !1;
  }
}
const JS = /transform|translate|scale|rotate|perspective|filter/, $S = /paint|layout|strict|content/, Mr = (e) => !!e && e !== "none";
let gc;
function Sd(e) {
  const t = xn(e) ? En(e) : e;
  return Mr(t.transform) || Mr(t.translate) || Mr(t.scale) || Mr(t.rotate) || Mr(t.perspective) || !kd() && (Mr(t.backdropFilter) || Mr(t.filter)) || JS.test(t.willChange || "") || $S.test(t.contain || "");
}
function qS(e) {
  let t = Xr(e);
  for (; xr(t) && !bi(t); ) {
    if (Sd(t))
      return t;
    if (Ts(t))
      return null;
    t = Xr(t);
  }
  return null;
}
function kd() {
  return gc == null && (gc = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), gc;
}
function bi(e) {
  return /^(html|body|#document)$/.test(Yl(e));
}
function En(e) {
  return kt(e).getComputedStyle(e);
}
function Os(e) {
  return xn(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Xr(e) {
  if (Yl(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Ph(e) && e.host || // Fallback.
    Qn(e)
  );
  return Ph(t) ? t.host : t;
}
function ey(e) {
  const t = Xr(e);
  return bi(t) ? (e.ownerDocument || e).body : xr(t) && Ls(t) ? t : ey(t);
}
function eu(e, t, r) {
  var i;
  t === void 0 && (t = []), r === void 0 && (r = !0);
  const o = ey(e), a = o === ((i = e.ownerDocument) == null ? void 0 : i.body), c = kt(o);
  if (a) {
    const p = wf(c);
    return t.concat(c, c.visualViewport || [], Ls(o) ? o : [], p && r ? eu(p) : []);
  } else
    return t.concat(o, eu(o, [], r));
}
function wf(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function ty(e) {
  const t = En(e);
  let r = parseFloat(t.width) || 0, i = parseFloat(t.height) || 0;
  const o = xr(e), a = o ? e.offsetWidth : r, c = o ? e.offsetHeight : i, p = as(r) !== a || as(i) !== c;
  return p && (r = a, i = c), {
    width: r,
    height: i,
    $: p
  };
}
function xd(e) {
  return xn(e) ? e : e.contextElement;
}
function Ol(e) {
  const t = xd(e);
  if (!xr(t))
    return Fn(1);
  const r = t.getBoundingClientRect(), {
    width: i,
    height: o,
    $: a
  } = ty(t);
  let c = (a ? as(r.width) : r.width) / i, p = (a ? as(r.height) : r.height) / o;
  return (!c || !Number.isFinite(c)) && (c = 1), (!p || !Number.isFinite(p)) && (p = 1), {
    x: c,
    y: p
  };
}
const bS = /* @__PURE__ */ Fn(0);
function ny(e) {
  const t = kt(e);
  return !kd() || !t.visualViewport ? bS : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function e2(e, t, r) {
  return t === void 0 && (t = !1), !!r && t && r === kt(e);
}
function Kr(e, t, r, i) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  const o = e.getBoundingClientRect(), a = xd(e);
  let c = Fn(1);
  t && (i ? xn(i) && (c = Ol(i)) : c = Ol(e));
  const p = e2(a, r, i) ? ny(a) : Fn(0);
  let m = (o.left + p.x) / c.x, h = (o.top + p.y) / c.y, x = o.width / c.x, k = o.height / c.y;
  if (a && i) {
    const S = kt(a), P = xn(i) ? kt(i) : i;
    let N = S, _ = wf(N);
    for (; _ && P !== N; ) {
      const F = Ol(_), y = _.getBoundingClientRect(), g = En(_), w = y.left + (_.clientLeft + parseFloat(g.paddingLeft)) * F.x, L = y.top + (_.clientTop + parseFloat(g.paddingTop)) * F.y;
      m *= F.x, h *= F.y, x *= F.x, k *= F.y, m += w, h += L, N = kt(_), _ = wf(N);
    }
  }
  return fs({
    width: x,
    height: k,
    x: m,
    y: h
  });
}
function Ms(e, t) {
  const r = Os(e).scrollLeft;
  return t ? t.left + r : Kr(Qn(e)).left + r;
}
function ry(e, t) {
  const r = e.getBoundingClientRect(), i = r.left + t.scrollLeft - Ms(e, r), o = r.top + t.scrollTop;
  return {
    x: i,
    y: o
  };
}
function t2(e) {
  let {
    elements: t,
    rect: r,
    offsetParent: i,
    strategy: o
  } = e;
  const a = o === "fixed", c = Qn(i), p = t ? Ts(t.floating) : !1;
  if (i === c || p && a)
    return r;
  let m = {
    scrollLeft: 0,
    scrollTop: 0
  }, h = Fn(1);
  const x = Fn(0), k = xr(i);
  if ((k || !a) && ((Yl(i) !== "body" || Ls(c)) && (m = Os(i)), k)) {
    const P = Kr(i);
    h = Ol(i), x.x = P.x + i.clientLeft, x.y = P.y + i.clientTop;
  }
  const S = c && !k && !a ? ry(c, m) : Fn(0);
  return {
    width: r.width * h.x,
    height: r.height * h.y,
    x: r.x * h.x - m.scrollLeft * h.x + x.x + S.x,
    y: r.y * h.y - m.scrollTop * h.y + x.y + S.y
  };
}
function n2(e) {
  return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function r2(e) {
  const t = Os(e), r = e.ownerDocument.body, i = Dn(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth), o = Dn(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -t.scrollLeft + Ms(e);
  const c = -t.scrollTop;
  return En(r).direction === "rtl" && (a += Dn(e.clientWidth, r.clientWidth) - i), {
    width: i,
    height: o,
    x: a,
    y: c
  };
}
const l2 = 25;
function i2(e, t, r) {
  r === void 0 && (r = "viewport");
  const i = r === "layoutViewport", o = kt(e), a = Qn(e), c = o.visualViewport;
  let p = a.clientWidth, m = a.clientHeight, h = 0, x = 0;
  if (c) {
    const S = !kd() || t === "fixed";
    i ? S || (h = -c.offsetLeft, x = -c.offsetTop) : (p = c.width, m = c.height, S && (h = c.offsetLeft, x = c.offsetTop));
  }
  if (Ms(a) <= 0) {
    const S = a.ownerDocument, P = S.body, N = getComputedStyle(P), _ = S.compatMode === "CSS1Compat" && parseFloat(N.marginLeft) + parseFloat(N.marginRight) || 0, F = Math.abs(a.clientWidth - P.clientWidth - _), y = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? F / 2 : F;
    y <= l2 && (p -= y);
  }
  return {
    width: p,
    height: m,
    x: h,
    y: x
  };
}
function u2(e, t) {
  const r = Kr(e, !0, t === "fixed"), i = r.top + e.clientTop, o = r.left + e.clientLeft, a = Ol(e), c = e.clientWidth * a.x, p = e.clientHeight * a.y, m = o * a.x, h = i * a.y;
  return {
    width: c,
    height: p,
    x: m,
    y: h
  };
}
function _h(e, t, r) {
  let i;
  if (t === "viewport" || t === "layoutViewport")
    i = i2(e, r, t);
  else if (t === "document")
    i = r2(Qn(e));
  else if (xn(t))
    i = u2(t, r);
  else {
    const o = ny(e);
    i = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return fs(i);
}
function o2(e, t) {
  const r = t.get(e);
  if (r)
    return r;
  let i = eu(e, [], !1).filter((p) => xn(p) && Yl(p) !== "body"), o = null;
  const a = En(e).position === "fixed";
  let c = a ? Xr(e) : e;
  for (; xn(c) && !bi(c); ) {
    const p = En(c), m = Sd(c), h = o ? o.position : a ? "fixed" : "";
    !m && (h === "fixed" || h === "absolute" && p.position === "static") ? i = i.filter((k) => k !== c) : o = p, c = Xr(c);
  }
  return t.set(e, i), i;
}
function s2(e) {
  let {
    element: t,
    boundary: r,
    rootBoundary: i,
    strategy: o
  } = e;
  const c = [...r === "clippingAncestors" ? Ts(t) ? [] : o2(t, this._c) : [].concat(r), i], p = _h(t, c[0], o);
  let m = p.top, h = p.right, x = p.bottom, k = p.left;
  for (let S = 1; S < c.length; S++) {
    const P = _h(t, c[S], o);
    m = Dn(P.top, m), h = gr(P.right, h), x = gr(P.bottom, x), k = Dn(P.left, k);
  }
  return {
    width: h - k,
    height: x - m,
    x: k,
    y: m
  };
}
function a2(e) {
  const {
    width: t,
    height: r
  } = ty(e);
  return {
    width: t,
    height: r
  };
}
function c2(e, t, r) {
  const i = xr(t), o = Qn(t), a = r === "fixed", c = Kr(e, !0, a, t);
  let p = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const m = Fn(0);
  if ((i || !a) && ((Yl(t) !== "body" || Ls(o)) && (p = Os(t)), i)) {
    const S = Kr(t, !0, a, t);
    m.x = S.x + t.clientLeft, m.y = S.y + t.clientTop;
  }
  !i && o && (m.x = Ms(o));
  const h = o && !i && !a ? ry(o, p) : Fn(0), x = c.left + p.scrollLeft - m.x - h.x, k = c.top + p.scrollTop - m.y - h.y;
  return {
    x,
    y: k,
    width: c.width,
    height: c.height
  };
}
function yc(e) {
  return En(e).position === "static";
}
function zh(e, t) {
  if (!xr(e) || En(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let r = e.offsetParent;
  return Qn(e) === r && (r = r.ownerDocument.body), r;
}
function ly(e, t) {
  const r = kt(e);
  if (Ts(e))
    return r;
  if (!xr(e)) {
    let o = Xr(e);
    for (; o && !bi(o); ) {
      if (xn(o) && !yc(o))
        return o;
      o = Xr(o);
    }
    return r;
  }
  let i = zh(e, t);
  for (; i && ZS(i) && yc(i); )
    i = zh(i, t);
  return i && bi(i) && yc(i) && !Sd(i) ? r : i || qS(e) || r;
}
const f2 = async function(e) {
  const t = this.getOffsetParent || ly, r = this.getDimensions, i = await r(e.floating);
  return {
    reference: c2(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: i.width,
      height: i.height
    }
  };
};
function d2(e) {
  return En(e).direction === "rtl";
}
const p2 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: t2,
  getDocumentElement: Qn,
  getClippingRect: s2,
  getOffsetParent: ly,
  getElementRects: f2,
  getClientRects: n2,
  getDimensions: a2,
  getScale: Ol,
  isElement: xn,
  isRTL: d2
};
function iy(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function m2(e, t, r) {
  let i = null, o;
  const a = Qn(e);
  function c() {
    var x;
    clearTimeout(o), (x = i) == null || x.disconnect(), i = null;
  }
  function p(x, k) {
    x === void 0 && (x = !1), k === void 0 && (k = 1), c();
    const S = e.getBoundingClientRect(), {
      left: P,
      top: N,
      width: _,
      height: F
    } = S;
    if (x || t(), !_ || !F)
      return;
    const y = So(N), g = So(a.clientWidth - (P + _)), w = So(a.clientHeight - (N + F)), L = So(P), I = {
      rootMargin: -y + "px " + -g + "px " + -w + "px " + -L + "px",
      threshold: Dn(0, gr(1, k)) || 1
    };
    let D = !0;
    function B($) {
      const V = $[0].intersectionRatio;
      if (!iy(S, e.getBoundingClientRect()))
        return p();
      if (V !== k) {
        if (!D)
          return p();
        V ? p(!1, V) : o = setTimeout(() => {
          p(!1, 1e-7);
        }, 1e3);
      }
      D = !1;
    }
    try {
      i = new IntersectionObserver(B, {
        ...I,
        // Handle <iframe>s
        root: a.ownerDocument
      });
    } catch {
      i = new IntersectionObserver(B, I);
    }
    i.observe(e);
  }
  const m = kt(e), h = () => p(r);
  return m.addEventListener("resize", h), p(!0), () => {
    m.removeEventListener("resize", h), c();
  };
}
function xk(e, t, r, i) {
  i === void 0 && (i = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: a = !0,
    elementResize: c = typeof ResizeObserver == "function",
    layoutShift: p = typeof IntersectionObserver == "function",
    animationFrame: m = !1
  } = i, h = xd(e), x = o || a ? [...h ? eu(h) : [], ...t ? eu(t) : []] : [];
  x.forEach((y) => {
    o && y.addEventListener("scroll", r), a && y.addEventListener("resize", r);
  });
  const k = h && p ? m2(h, r, a) : null;
  let S = -1, P = null;
  c && (P = new ResizeObserver((y) => {
    let [g] = y;
    g && g.target === h && P && t && (P.unobserve(t), cancelAnimationFrame(S), S = requestAnimationFrame(() => {
      var w;
      (w = P) == null || w.observe(t);
    })), r();
  }), h && !m && P.observe(h), t && P.observe(t));
  let N, _ = m ? Kr(e) : null;
  m && F();
  function F() {
    const y = Kr(e);
    _ && !iy(_, y) && r(), _ = y, N = requestAnimationFrame(F);
  }
  return r(), () => {
    var y;
    x.forEach((g) => {
      o && g.removeEventListener("scroll", r), a && g.removeEventListener("resize", r);
    }), k?.(), (y = P) == null || y.disconnect(), P = null, m && cancelAnimationFrame(N);
  };
}
const h2 = YS, v2 = XS, g2 = WS, y2 = GS, w2 = QS, Nh = BS, S2 = KS, k2 = (e, t, r) => {
  const i = /* @__PURE__ */ new Map(), o = r ?? {}, a = {
    ...p2,
    ...o.platform,
    _c: i
  };
  return HS(e, t, {
    ...o,
    platform: a
  });
};
var x2 = typeof document < "u", E2 = function() {
}, Fo = x2 ? Y.useLayoutEffect : E2;
function ds(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let r, i, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (r = e.length, r !== t.length) return !1;
      for (i = r; i-- !== 0; )
        if (!ds(e[i], t[i]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), r = o.length, r !== Object.keys(t).length)
      return !1;
    for (i = r; i-- !== 0; )
      if (!{}.hasOwnProperty.call(t, o[i]))
        return !1;
    for (i = r; i-- !== 0; ) {
      const a = o[i];
      if (!(a === "_owner" && e.$$typeof) && !ds(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function uy(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Rh(e, t) {
  const r = uy(e);
  return Math.round(t * r) / r;
}
function wc(e) {
  const t = Y.useRef(e);
  return Fo(() => {
    t.current = e;
  }), t;
}
function Ek(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: r = "absolute",
    middleware: i = [],
    platform: o,
    elements: {
      reference: a,
      floating: c
    } = {},
    transform: p = !0,
    whileElementsMounted: m,
    open: h
  } = e, [x, k] = Y.useState({
    x: 0,
    y: 0,
    strategy: r,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [S, P] = Y.useState(i);
  ds(S, i) || P(i);
  const [N, _] = Y.useState(null), [F, y] = Y.useState(null), g = Y.useCallback((z) => {
    z !== I.current && (I.current = z, _(z));
  }, []), w = Y.useCallback((z) => {
    z !== D.current && (D.current = z, y(z));
  }, []), L = a || N, M = c || F, I = Y.useRef(null), D = Y.useRef(null), B = Y.useRef(x), $ = m != null, V = wc(m), ue = wc(o), we = wc(h), ce = Y.useCallback(() => {
    if (!I.current || !D.current)
      return;
    const z = {
      placement: t,
      strategy: r,
      middleware: S
    };
    ue.current && (z.platform = ue.current), k2(I.current, D.current, z).then((A) => {
      const U = {
        ...A,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: we.current !== !1
      };
      Se.current && !ds(B.current, U) && (B.current = U, vd.flushSync(() => {
        k(U);
      }));
    });
  }, [S, t, r, ue, we]);
  Fo(() => {
    h === !1 && B.current.isPositioned && (B.current.isPositioned = !1, k((z) => ({
      ...z,
      isPositioned: !1
    })));
  }, [h]);
  const Se = Y.useRef(!1);
  Fo(() => (Se.current = !0, () => {
    Se.current = !1;
  }), []), Fo(() => {
    if (L && (I.current = L), M && (D.current = M), L && M) {
      if (V.current)
        return V.current(L, M, ce);
      ce();
    }
  }, [L, M, ce, V, $]);
  const De = Y.useMemo(() => ({
    reference: I,
    floating: D,
    setReference: g,
    setFloating: w
  }), [g, w]), fe = Y.useMemo(() => ({
    reference: L,
    floating: M
  }), [L, M]), Te = Y.useMemo(() => {
    const z = {
      position: r,
      left: 0,
      top: 0
    };
    if (!fe.floating)
      return z;
    const A = Rh(fe.floating, x.x), U = Rh(fe.floating, x.y);
    return p ? {
      ...z,
      transform: "translate(" + A + "px, " + U + "px)",
      ...uy(fe.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: r,
      left: A,
      top: U
    };
  }, [r, p, fe.floating, x.x, x.y]);
  return Y.useMemo(() => ({
    ...x,
    update: ce,
    refs: De,
    elements: fe,
    floatingStyles: Te
  }), [x, ce, De, fe, Te]);
}
const C2 = (e) => {
  function t(r) {
    return {}.hasOwnProperty.call(r, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(r) {
      const {
        element: i,
        padding: o
      } = typeof e == "function" ? e(r) : e;
      return i && t(i) ? i.current != null ? Nh({
        element: i.current,
        padding: o
      }).fn(r) : {} : i ? Nh({
        element: i,
        padding: o
      }).fn(r) : {};
    }
  };
}, Ck = (e, t) => {
  const r = h2(e);
  return {
    name: r.name,
    fn: r.fn,
    options: [e, t]
  };
}, Pk = (e, t) => {
  const r = v2(e);
  return {
    name: r.name,
    fn: r.fn,
    options: [e, t]
  };
}, _k = (e, t) => ({
  fn: S2(e).fn,
  options: [e, t]
}), zk = (e, t) => {
  const r = g2(e);
  return {
    name: r.name,
    fn: r.fn,
    options: [e, t]
  };
}, Nk = (e, t) => {
  const r = y2(e);
  return {
    name: r.name,
    fn: r.fn,
    options: [e, t]
  };
}, Rk = (e, t) => {
  const r = w2(e);
  return {
    name: r.name,
    fn: r.fn,
    options: [e, t]
  };
}, Lk = (e, t) => {
  const r = C2(e);
  return {
    name: r.name,
    fn: r.fn,
    options: [e, t]
  };
};
var yn = function() {
  return yn = Object.assign || function(t) {
    for (var r, i = 1, o = arguments.length; i < o; i++) {
      r = arguments[i];
      for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a]);
    }
    return t;
  }, yn.apply(this, arguments);
};
function oy(e, t) {
  var r = {};
  for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.indexOf(i) < 0 && (r[i] = e[i]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, i = Object.getOwnPropertySymbols(e); o < i.length; o++)
      t.indexOf(i[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, i[o]) && (r[i[o]] = e[i[o]]);
  return r;
}
function P2(e, t, r) {
  if (r || arguments.length === 2) for (var i = 0, o = t.length, a; i < o; i++)
    (a || !(i in t)) && (a || (a = Array.prototype.slice.call(t, 0, i)), a[i] = t[i]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var Ao = "right-scroll-bar-position", jo = "width-before-scroll-bar", _2 = "with-scroll-bars-hidden", z2 = "--removed-body-scroll-bar-size";
function Sc(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function N2(e, t) {
  var r = Y.useState(function() {
    return {
      // value
      value: e,
      // last callback
      callback: t,
      // "memoized" public interface
      facade: {
        get current() {
          return r.value;
        },
        set current(i) {
          var o = r.value;
          o !== i && (r.value = i, r.callback(i, o));
        }
      }
    };
  })[0];
  return r.callback = t, r.facade;
}
var R2 = typeof window < "u" ? Y.useLayoutEffect : Y.useEffect, Lh = /* @__PURE__ */ new WeakMap();
function L2(e, t) {
  var r = N2(null, function(i) {
    return e.forEach(function(o) {
      return Sc(o, i);
    });
  });
  return R2(function() {
    var i = Lh.get(r);
    if (i) {
      var o = new Set(i), a = new Set(e), c = r.current;
      o.forEach(function(p) {
        a.has(p) || Sc(p, null);
      }), a.forEach(function(p) {
        o.has(p) || Sc(p, c);
      });
    }
    Lh.set(r, e);
  }, [e]), r;
}
function T2(e) {
  return e;
}
function O2(e, t) {
  t === void 0 && (t = T2);
  var r = [], i = !1, o = {
    read: function() {
      if (i)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return r.length ? r[r.length - 1] : e;
    },
    useMedium: function(a) {
      var c = t(a, i);
      return r.push(c), function() {
        r = r.filter(function(p) {
          return p !== c;
        });
      };
    },
    assignSyncMedium: function(a) {
      for (i = !0; r.length; ) {
        var c = r;
        r = [], c.forEach(a);
      }
      r = {
        push: function(p) {
          return a(p);
        },
        filter: function() {
          return r;
        }
      };
    },
    assignMedium: function(a) {
      i = !0;
      var c = [];
      if (r.length) {
        var p = r;
        r = [], p.forEach(a), c = r;
      }
      var m = function() {
        var x = c;
        c = [], x.forEach(a);
      }, h = function() {
        return Promise.resolve().then(m);
      };
      h(), r = {
        push: function(x) {
          c.push(x), h();
        },
        filter: function(x) {
          return c = c.filter(x), r;
        }
      };
    }
  };
  return o;
}
function M2(e) {
  e === void 0 && (e = {});
  var t = O2(null);
  return t.options = yn({ async: !0, ssr: !1 }, e), t;
}
var sy = function(e) {
  var t = e.sideCar, r = oy(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var i = t.read();
  if (!i)
    throw new Error("Sidecar medium not found");
  return Y.createElement(i, yn({}, r));
};
sy.isSideCarExport = !0;
function I2(e, t) {
  return e.useMedium(t), sy;
}
var ay = M2(), kc = function() {
}, Is = Y.forwardRef(function(e, t) {
  var r = Y.useRef(null), i = Y.useState({
    onScrollCapture: kc,
    onWheelCapture: kc,
    onTouchMoveCapture: kc
  }), o = i[0], a = i[1], c = e.forwardProps, p = e.children, m = e.className, h = e.removeScrollBar, x = e.enabled, k = e.shards, S = e.sideCar, P = e.noRelative, N = e.noIsolation, _ = e.inert, F = e.allowPinchZoom, y = e.as, g = y === void 0 ? "div" : y, w = e.gapMode, L = oy(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), M = S, I = L2([r, t]), D = yn(yn({}, L), o);
  return Y.createElement(
    Y.Fragment,
    null,
    x && Y.createElement(M, { sideCar: ay, removeScrollBar: h, shards: k, noRelative: P, noIsolation: N, inert: _, setCallbacks: a, allowPinchZoom: !!F, lockRef: r, gapMode: w }),
    c ? Y.cloneElement(Y.Children.only(p), yn(yn({}, D), { ref: I })) : Y.createElement(g, yn({}, D, { className: m, ref: I }), p)
  );
});
Is.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Is.classNames = {
  fullWidth: jo,
  zeroRight: Ao
};
var D2 = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function F2() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = D2();
  return t && e.setAttribute("nonce", t), e;
}
function A2(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function j2(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var U2 = function() {
  var e = 0, t = null;
  return {
    add: function(r) {
      e == 0 && (t = F2()) && (A2(t, r), j2(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, H2 = function() {
  var e = U2();
  return function(t, r) {
    Y.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && r]);
  };
}, cy = function() {
  var e = H2(), t = function(r) {
    var i = r.styles, o = r.dynamic;
    return e(i, o), null;
  };
  return t;
}, B2 = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, xc = function(e) {
  return parseInt(e || "", 10) || 0;
}, W2 = function(e) {
  var t = window.getComputedStyle(document.body), r = t[e === "padding" ? "paddingLeft" : "marginLeft"], i = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [xc(r), xc(i), xc(o)];
}, Q2 = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return B2;
  var t = W2(e), r = document.documentElement.clientWidth, i = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, i - r + t[2] - t[0])
  };
}, V2 = cy(), Ml = "data-scroll-locked", Y2 = function(e, t, r, i) {
  var o = e.left, a = e.top, c = e.right, p = e.gap;
  return r === void 0 && (r = "margin"), `
  .`.concat(_2, ` {
   overflow: hidden `).concat(i, `;
   padding-right: `).concat(p, "px ").concat(i, `;
  }
  body[`).concat(Ml, `] {
    overflow: hidden `).concat(i, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(i, ";"),
    r === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(a, `px;
    padding-right: `).concat(c, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(p, "px ").concat(i, `;
    `),
    r === "padding" && "padding-right: ".concat(p, "px ").concat(i, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Ao, ` {
    right: `).concat(p, "px ").concat(i, `;
  }
  
  .`).concat(jo, ` {
    margin-right: `).concat(p, "px ").concat(i, `;
  }
  
  .`).concat(Ao, " .").concat(Ao, ` {
    right: 0 `).concat(i, `;
  }
  
  .`).concat(jo, " .").concat(jo, ` {
    margin-right: 0 `).concat(i, `;
  }
  
  body[`).concat(Ml, `] {
    `).concat(z2, ": ").concat(p, `px;
  }
`);
}, Th = function() {
  var e = parseInt(document.body.getAttribute(Ml) || "0", 10);
  return isFinite(e) ? e : 0;
}, X2 = function() {
  Y.useEffect(function() {
    return document.body.setAttribute(Ml, (Th() + 1).toString()), function() {
      var e = Th() - 1;
      e <= 0 ? document.body.removeAttribute(Ml) : document.body.setAttribute(Ml, e.toString());
    };
  }, []);
}, K2 = function(e) {
  var t = e.noRelative, r = e.noImportant, i = e.gapMode, o = i === void 0 ? "margin" : i;
  X2();
  var a = Y.useMemo(function() {
    return Q2(o);
  }, [o]);
  return Y.createElement(V2, { styles: Y2(a, !t, o, r ? "" : "!important") });
}, Sf = !1;
if (typeof window < "u")
  try {
    var ko = Object.defineProperty({}, "passive", {
      get: function() {
        return Sf = !0, !0;
      }
    });
    window.addEventListener("test", ko, ko), window.removeEventListener("test", ko, ko);
  } catch {
    Sf = !1;
  }
var dl = Sf ? { passive: !1 } : !1, G2 = function(e) {
  return e.tagName === "TEXTAREA";
}, fy = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var r = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    r[t] !== "hidden" && // contains scroll inside self
    !(r.overflowY === r.overflowX && !G2(e) && r[t] === "visible")
  );
}, Z2 = function(e) {
  return fy(e, "overflowY");
}, J2 = function(e) {
  return fy(e, "overflowX");
}, Oh = function(e, t) {
  var r = t.ownerDocument, i = t;
  do {
    typeof ShadowRoot < "u" && i instanceof ShadowRoot && (i = i.host);
    var o = dy(e, i);
    if (o) {
      var a = py(e, i), c = a[1], p = a[2];
      if (c > p)
        return !0;
    }
    i = i.parentNode;
  } while (i && i !== r.body);
  return !1;
}, $2 = function(e) {
  var t = e.scrollTop, r = e.scrollHeight, i = e.clientHeight;
  return [
    t,
    r,
    i
  ];
}, q2 = function(e) {
  var t = e.scrollLeft, r = e.scrollWidth, i = e.clientWidth;
  return [
    t,
    r,
    i
  ];
}, dy = function(e, t) {
  return e === "v" ? Z2(t) : J2(t);
}, py = function(e, t) {
  return e === "v" ? $2(t) : q2(t);
}, b2 = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, ek = function(e, t, r, i, o) {
  var a = b2(e, window.getComputedStyle(t).direction), c = a * i, p = r.target, m = t.contains(p), h = !1, x = c > 0, k = 0, S = 0;
  do {
    if (!p)
      break;
    var P = py(e, p), N = P[0], _ = P[1], F = P[2], y = _ - F - a * N;
    (N || y) && dy(e, p) && (k += y, S += N);
    var g = p.parentNode;
    p = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
  } while (
    // portaled content
    !m && p !== document.body || // self content
    m && (t.contains(p) || t === p)
  );
  return (x && Math.abs(k) < 1 || !x && Math.abs(S) < 1) && (h = !0), h;
}, xo = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Mh = function(e) {
  return [e.deltaX, e.deltaY];
}, Ih = function(e) {
  return e && "current" in e ? e.current : e;
}, tk = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, nk = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, rk = 0, pl = [];
function lk(e) {
  var t = Y.useRef([]), r = Y.useRef([0, 0]), i = Y.useRef(), o = Y.useState(rk++)[0], a = Y.useState(cy)[0], c = Y.useRef(e);
  Y.useEffect(function() {
    c.current = e;
  }, [e]), Y.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var _ = P2([e.lockRef.current], (e.shards || []).map(Ih), !0).filter(Boolean);
      return _.forEach(function(F) {
        return F.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), _.forEach(function(F) {
          return F.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var p = Y.useCallback(function(_, F) {
    if ("touches" in _ && _.touches.length === 2 || _.type === "wheel" && _.ctrlKey)
      return !c.current.allowPinchZoom;
    var y = xo(_), g = r.current, w = "deltaX" in _ ? _.deltaX : g[0] - y[0], L = "deltaY" in _ ? _.deltaY : g[1] - y[1], M, I = _.target, D = Math.abs(w) > Math.abs(L) ? "h" : "v";
    if ("touches" in _ && D === "h" && I.type === "range")
      return !1;
    var B = window.getSelection(), $ = B && B.anchorNode, V = $ ? $ === I || $.contains(I) : !1;
    if (V)
      return !1;
    var ue = Oh(D, I);
    if (!ue)
      return !0;
    if (ue ? M = D : (M = D === "v" ? "h" : "v", ue = Oh(D, I)), !ue)
      return !1;
    if (!i.current && "changedTouches" in _ && (w || L) && (i.current = M), !M)
      return !0;
    var we = i.current || M;
    return ek(we, F, _, we === "h" ? w : L);
  }, []), m = Y.useCallback(function(_) {
    var F = _;
    if (!(!pl.length || pl[pl.length - 1] !== a)) {
      var y = "deltaY" in F ? Mh(F) : xo(F), g = t.current.filter(function(M) {
        return M.name === F.type && (M.target === F.target || F.target === M.shadowParent) && tk(M.delta, y);
      })[0];
      if (g && g.should) {
        F.cancelable && F.preventDefault();
        return;
      }
      if (!g) {
        var w = (c.current.shards || []).map(Ih).filter(Boolean).filter(function(M) {
          return M.contains(F.target);
        }), L = w.length > 0 ? p(F, w[0]) : !c.current.noIsolation;
        L && F.cancelable && F.preventDefault();
      }
    }
  }, []), h = Y.useCallback(function(_, F, y, g) {
    var w = { name: _, delta: F, target: y, should: g, shadowParent: ik(y) };
    t.current.push(w), setTimeout(function() {
      t.current = t.current.filter(function(L) {
        return L !== w;
      });
    }, 1);
  }, []), x = Y.useCallback(function(_) {
    r.current = xo(_), i.current = void 0;
  }, []), k = Y.useCallback(function(_) {
    h(_.type, Mh(_), _.target, p(_, e.lockRef.current));
  }, []), S = Y.useCallback(function(_) {
    h(_.type, xo(_), _.target, p(_, e.lockRef.current));
  }, []);
  Y.useEffect(function() {
    return pl.push(a), e.setCallbacks({
      onScrollCapture: k,
      onWheelCapture: k,
      onTouchMoveCapture: S
    }), document.addEventListener("wheel", m, dl), document.addEventListener("touchmove", m, dl), document.addEventListener("touchstart", x, dl), function() {
      pl = pl.filter(function(_) {
        return _ !== a;
      }), document.removeEventListener("wheel", m, dl), document.removeEventListener("touchmove", m, dl), document.removeEventListener("touchstart", x, dl);
    };
  }, []);
  var P = e.removeScrollBar, N = e.inert;
  return Y.createElement(
    Y.Fragment,
    null,
    N ? Y.createElement(a, { styles: nk(o) }) : null,
    P ? Y.createElement(K2, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function ik(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const uk = I2(ay, lk);
var ok = Y.forwardRef(function(e, t) {
  return Y.createElement(Is, yn({}, e, { ref: t, sideCar: uk }));
});
ok.classNames = Is.classNames;
var my = { exports: {} }, Jr = {};
/**
 * @license React
 * react-reconciler-constants.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Jr.ConcurrentRoot = 1;
Jr.ContinuousEventPriority = 4;
Jr.DefaultEventPriority = 16;
Jr.DiscreteEventPriority = 1;
Jr.IdleEventPriority = 536870912;
Jr.LegacyRoot = 0;
my.exports = Jr;
var Tk = my.exports;
const sk = (e) => typeof e == "object" && typeof e.then == "function", Eo = [];
function ak(e, t, r = (i, o) => i === o) {
  if (e === t) return !0;
  if (!e || !t) return !1;
  const i = e.length;
  if (t.length !== i) return !1;
  for (let o = 0; o < i; o++) if (!r(e[o], t[o])) return !1;
  return !0;
}
function ck(e, t = null, r = !1, i = {}) {
  t === null && (t = [e]);
  for (const a of Eo)
    if (ak(t, a.keys, a.equal)) {
      if (r) return;
      if (Object.prototype.hasOwnProperty.call(a, "error")) throw a.error;
      if (Object.prototype.hasOwnProperty.call(a, "response"))
        return i.lifespan && i.lifespan > 0 && (a.timeout && clearTimeout(a.timeout), a.timeout = setTimeout(a.remove, i.lifespan)), a.response;
      if (!r) throw a.promise;
    }
  const o = {
    keys: t,
    equal: i.equal,
    remove: () => {
      const a = Eo.indexOf(o);
      a !== -1 && Eo.splice(a, 1);
    },
    promise: (
      // Execute the promise
      (sk(e) ? e : e(...t)).then((a) => {
        o.response = a, i.lifespan && i.lifespan > 0 && (o.timeout = setTimeout(o.remove, i.lifespan));
      }).catch((a) => o.error = a)
    )
  };
  if (Eo.push(o), !r) throw o.promise;
}
const Ok = (e, t, r) => ck(e, t, !1, r);
var hy = { exports: {} }, Ec = { exports: {} }, Cc = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dh;
function fk() {
  return Dh || (Dh = 1, function(e) {
    function t(z, A) {
      var U = z.length;
      z.push(A);
      e: for (; 0 < U; ) {
        var q = U - 1 >>> 1, te = z[q];
        if (0 < o(te, A)) z[q] = A, z[U] = te, U = q;
        else break e;
      }
    }
    function r(z) {
      return z.length === 0 ? null : z[0];
    }
    function i(z) {
      if (z.length === 0) return null;
      var A = z[0], U = z.pop();
      if (U !== A) {
        z[0] = U;
        e: for (var q = 0, te = z.length, Mt = te >>> 1; q < Mt; ) {
          var Ue = 2 * (q + 1) - 1, Zt = z[Ue], He = Ue + 1, It = z[He];
          if (0 > o(Zt, U)) He < te && 0 > o(It, Zt) ? (z[q] = It, z[He] = U, q = He) : (z[q] = Zt, z[Ue] = U, q = Ue);
          else if (He < te && 0 > o(It, U)) z[q] = It, z[He] = U, q = He;
          else break e;
        }
      }
      return A;
    }
    function o(z, A) {
      var U = z.sortIndex - A.sortIndex;
      return U !== 0 ? U : z.id - A.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var a = performance;
      e.unstable_now = function() {
        return a.now();
      };
    } else {
      var c = Date, p = c.now();
      e.unstable_now = function() {
        return c.now() - p;
      };
    }
    var m = [], h = [], x = 1, k = null, S = 3, P = !1, N = !1, _ = !1, F = typeof setTimeout == "function" ? setTimeout : null, y = typeof clearTimeout == "function" ? clearTimeout : null, g = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function w(z) {
      for (var A = r(h); A !== null; ) {
        if (A.callback === null) i(h);
        else if (A.startTime <= z) i(h), A.sortIndex = A.expirationTime, t(m, A);
        else break;
        A = r(h);
      }
    }
    function L(z) {
      if (_ = !1, w(z), !N) if (r(m) !== null) N = !0, fe(M);
      else {
        var A = r(h);
        A !== null && Te(L, A.startTime - z);
      }
    }
    function M(z, A) {
      N = !1, _ && (_ = !1, y(B), B = -1), P = !0;
      var U = S;
      try {
        for (w(A), k = r(m); k !== null && (!(k.expirationTime > A) || z && !ue()); ) {
          var q = k.callback;
          if (typeof q == "function") {
            k.callback = null, S = k.priorityLevel;
            var te = q(k.expirationTime <= A);
            A = e.unstable_now(), typeof te == "function" ? k.callback = te : k === r(m) && i(m), w(A);
          } else i(m);
          k = r(m);
        }
        if (k !== null) var Mt = !0;
        else {
          var Ue = r(h);
          Ue !== null && Te(L, Ue.startTime - A), Mt = !1;
        }
        return Mt;
      } finally {
        k = null, S = U, P = !1;
      }
    }
    var I = !1, D = null, B = -1, $ = 5, V = -1;
    function ue() {
      return !(e.unstable_now() - V < $);
    }
    function we() {
      if (D !== null) {
        var z = e.unstable_now();
        V = z;
        var A = !0;
        try {
          A = D(!0, z);
        } finally {
          A ? ce() : (I = !1, D = null);
        }
      } else I = !1;
    }
    var ce;
    if (typeof g == "function") ce = function() {
      g(we);
    };
    else if (typeof MessageChannel < "u") {
      var Se = new MessageChannel(), De = Se.port2;
      Se.port1.onmessage = we, ce = function() {
        De.postMessage(null);
      };
    } else ce = function() {
      F(we, 0);
    };
    function fe(z) {
      D = z, I || (I = !0, ce());
    }
    function Te(z, A) {
      B = F(function() {
        z(e.unstable_now());
      }, A);
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(z) {
      z.callback = null;
    }, e.unstable_continueExecution = function() {
      N || P || (N = !0, fe(M));
    }, e.unstable_forceFrameRate = function(z) {
      0 > z || 125 < z ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : $ = 0 < z ? Math.floor(1e3 / z) : 5;
    }, e.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, e.unstable_getFirstCallbackNode = function() {
      return r(m);
    }, e.unstable_next = function(z) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var A = 3;
          break;
        default:
          A = S;
      }
      var U = S;
      S = A;
      try {
        return z();
      } finally {
        S = U;
      }
    }, e.unstable_pauseExecution = function() {
    }, e.unstable_requestPaint = function() {
    }, e.unstable_runWithPriority = function(z, A) {
      switch (z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          z = 3;
      }
      var U = S;
      S = z;
      try {
        return A();
      } finally {
        S = U;
      }
    }, e.unstable_scheduleCallback = function(z, A, U) {
      var q = e.unstable_now();
      switch (typeof U == "object" && U !== null ? (U = U.delay, U = typeof U == "number" && 0 < U ? q + U : q) : U = q, z) {
        case 1:
          var te = -1;
          break;
        case 2:
          te = 250;
          break;
        case 5:
          te = 1073741823;
          break;
        case 4:
          te = 1e4;
          break;
        default:
          te = 5e3;
      }
      return te = U + te, z = { id: x++, callback: A, priorityLevel: z, startTime: U, expirationTime: te, sortIndex: -1 }, U > q ? (z.sortIndex = U, t(h, z), r(m) === null && z === r(h) && (_ ? (y(B), B = -1) : _ = !0, Te(L, U - q))) : (z.sortIndex = te, t(m, z), N || P || (N = !0, fe(M))), z;
    }, e.unstable_shouldYield = ue, e.unstable_wrapCallback = function(z) {
      var A = S;
      return function() {
        var U = S;
        S = A;
        try {
          return z.apply(this, arguments);
        } finally {
          S = U;
        }
      };
    };
  }(Cc)), Cc;
}
var Fh;
function dk() {
  return Fh || (Fh = 1, Ec.exports = fk()), Ec.exports;
}
/**
 * @license React
 * react-reconciler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var pk = function(t) {
  var r = {}, i = Y, o = dk(), a = Object.assign;
  function c(n) {
    for (var l = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, u = 1; u < arguments.length; u++) l += "&args[]=" + encodeURIComponent(arguments[u]);
    return "Minified React error #" + n + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var p = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, m = Symbol.for("react.element"), h = Symbol.for("react.portal"), x = Symbol.for("react.fragment"), k = Symbol.for("react.strict_mode"), S = Symbol.for("react.profiler"), P = Symbol.for("react.provider"), N = Symbol.for("react.context"), _ = Symbol.for("react.forward_ref"), F = Symbol.for("react.suspense"), y = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), L = Symbol.for("react.offscreen"), M = Symbol.iterator;
  function I(n) {
    return n === null || typeof n != "object" ? null : (n = M && n[M] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  function D(n) {
    if (n == null) return null;
    if (typeof n == "function") return n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case x:
        return "Fragment";
      case h:
        return "Portal";
      case S:
        return "Profiler";
      case k:
        return "StrictMode";
      case F:
        return "Suspense";
      case y:
        return "SuspenseList";
    }
    if (typeof n == "object") switch (n.$$typeof) {
      case N:
        return (n.displayName || "Context") + ".Consumer";
      case P:
        return (n._context.displayName || "Context") + ".Provider";
      case _:
        var l = n.render;
        return n = n.displayName, n || (n = l.displayName || l.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case g:
        return l = n.displayName || null, l !== null ? l : D(n.type) || "Memo";
      case w:
        l = n._payload, n = n._init;
        try {
          return D(n(l));
        } catch {
        }
    }
    return null;
  }
  function B(n) {
    var l = n.type;
    switch (n.tag) {
      case 24:
        return "Cache";
      case 9:
        return (l.displayName || "Context") + ".Consumer";
      case 10:
        return (l._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return n = l.render, n = n.displayName || n.name || "", l.displayName || (n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return l;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return D(l);
      case 8:
        return l === k ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof l == "function") return l.displayName || l.name || null;
        if (typeof l == "string") return l;
    }
    return null;
  }
  function $(n) {
    var l = n, u = n;
    if (n.alternate) for (; l.return; ) l = l.return;
    else {
      n = l;
      do
        l = n, l.flags & 4098 && (u = l.return), n = l.return;
      while (n);
    }
    return l.tag === 3 ? u : null;
  }
  function V(n) {
    if ($(n) !== n) throw Error(c(188));
  }
  function ue(n) {
    var l = n.alternate;
    if (!l) {
      if (l = $(n), l === null) throw Error(c(188));
      return l !== n ? null : n;
    }
    for (var u = n, s = l; ; ) {
      var f = u.return;
      if (f === null) break;
      var d = f.alternate;
      if (d === null) {
        if (s = f.return, s !== null) {
          u = s;
          continue;
        }
        break;
      }
      if (f.child === d.child) {
        for (d = f.child; d; ) {
          if (d === u) return V(f), n;
          if (d === s) return V(f), l;
          d = d.sibling;
        }
        throw Error(c(188));
      }
      if (u.return !== s.return) u = f, s = d;
      else {
        for (var v = !1, E = f.child; E; ) {
          if (E === u) {
            v = !0, u = f, s = d;
            break;
          }
          if (E === s) {
            v = !0, s = f, u = d;
            break;
          }
          E = E.sibling;
        }
        if (!v) {
          for (E = d.child; E; ) {
            if (E === u) {
              v = !0, u = d, s = f;
              break;
            }
            if (E === s) {
              v = !0, s = d, u = f;
              break;
            }
            E = E.sibling;
          }
          if (!v) throw Error(c(189));
        }
      }
      if (u.alternate !== s) throw Error(c(190));
    }
    if (u.tag !== 3) throw Error(c(188));
    return u.stateNode.current === u ? n : l;
  }
  function we(n) {
    return n = ue(n), n !== null ? ce(n) : null;
  }
  function ce(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var l = ce(n);
      if (l !== null) return l;
      n = n.sibling;
    }
    return null;
  }
  function Se(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      if (n.tag !== 4) {
        var l = Se(n);
        if (l !== null) return l;
      }
      n = n.sibling;
    }
    return null;
  }
  var De = Array.isArray, fe = t.getPublicInstance, Te = t.getRootHostContext, z = t.getChildHostContext, A = t.prepareForCommit, U = t.resetAfterCommit, q = t.createInstance, te = t.appendInitialChild, Mt = t.finalizeInitialChildren, Ue = t.prepareUpdate, Zt = t.shouldSetTextContent, He = t.createTextInstance, It = t.scheduleTimeout, gy = t.cancelTimeout, Ds = t.noTimeout, uu = t.isPrimaryRenderer, Jt = t.supportsMutation, ou = t.supportsPersistence, xt = t.supportsHydration, yy = t.getInstanceFromNode, wy = t.preparePortalMount, Sy = t.getCurrentEventPriority, ky = t.detachDeletedInstance, xy = t.supportsMicrotasks, Ey = t.scheduleMicrotask, Xl = t.supportsTestSelectors, Cy = t.findFiberRoot, Py = t.getBoundingRect, _y = t.getTextContent, Kl = t.isHiddenSubtree, zy = t.matchAccessibilityRole, Ny = t.setFocusIfFocusable, Ry = t.setupIntersectionObserver, Ly = t.appendChild, Ty = t.appendChildToContainer, Oy = t.commitTextUpdate, My = t.commitMount, Iy = t.commitUpdate, Dy = t.insertBefore, Fy = t.insertInContainerBefore, Ay = t.removeChild, jy = t.removeChildFromContainer, Ed = t.resetTextContent, Uy = t.hideInstance, Hy = t.hideTextInstance, By = t.unhideInstance, Wy = t.unhideTextInstance, Qy = t.clearContainer, Vy = t.cloneInstance, Cd = t.createContainerChildSet, Pd = t.appendChildToContainerChildSet, Yy = t.finalizeContainerChildren, _d = t.replaceContainerChildren, zd = t.cloneHiddenInstance, Nd = t.cloneHiddenTextInstance, Xy = t.canHydrateInstance, Ky = t.canHydrateTextInstance, Gy = t.canHydrateSuspenseInstance, Rd = t.isSuspenseInstancePending, Fs = t.isSuspenseInstanceFallback, Zy = t.registerSuspenseInstanceRetry, Gl = t.getNextHydratableSibling, Jy = t.getFirstHydratableChild, $y = t.getFirstHydratableChildWithinContainer, qy = t.getFirstHydratableChildWithinSuspenseInstance, by = t.hydrateInstance, e0 = t.hydrateTextInstance, t0 = t.hydrateSuspenseInstance, n0 = t.getNextHydratableInstanceAfterSuspenseInstance, Ld = t.commitHydratedContainer, r0 = t.commitHydratedSuspenseInstance, l0 = t.clearSuspenseBoundary, i0 = t.clearSuspenseBoundaryFromContainer, u0 = t.shouldDeleteUnhydratedTailInstances, o0 = t.didNotMatchHydratedContainerTextInstance, s0 = t.didNotMatchHydratedTextInstance, As;
  function Zl(n) {
    if (As === void 0) try {
      throw Error();
    } catch (u) {
      var l = u.stack.trim().match(/\n( *(at )?)/);
      As = l && l[1] || "";
    }
    return `
` + As + n;
  }
  var js = !1;
  function Us(n, l) {
    if (!n || js) return "";
    js = !0;
    var u = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (l) if (l = function() {
        throw Error();
      }, Object.defineProperty(l.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(l, []);
        } catch (H) {
          var s = H;
        }
        Reflect.construct(n, [], l);
      } else {
        try {
          l.call();
        } catch (H) {
          s = H;
        }
        n.call(l.prototype);
      }
      else {
        try {
          throw Error();
        } catch (H) {
          s = H;
        }
        n();
      }
    } catch (H) {
      if (H && s && typeof H.stack == "string") {
        for (var f = H.stack.split(`
`), d = s.stack.split(`
`), v = f.length - 1, E = d.length - 1; 1 <= v && 0 <= E && f[v] !== d[E]; ) E--;
        for (; 1 <= v && 0 <= E; v--, E--) if (f[v] !== d[E]) {
          if (v !== 1 || E !== 1)
            do
              if (v--, E--, 0 > E || f[v] !== d[E]) {
                var O = `
` + f[v].replace(" at new ", " at ");
                return n.displayName && O.includes("<anonymous>") && (O = O.replace("<anonymous>", n.displayName)), O;
              }
            while (1 <= v && 0 <= E);
          break;
        }
      }
    } finally {
      js = !1, Error.prepareStackTrace = u;
    }
    return (n = n ? n.displayName || n.name : "") ? Zl(n) : "";
  }
  var a0 = Object.prototype.hasOwnProperty, Hs = [], $r = -1;
  function Vn(n) {
    return { current: n };
  }
  function ve(n) {
    0 > $r || (n.current = Hs[$r], Hs[$r] = null, $r--);
  }
  function me(n, l) {
    $r++, Hs[$r] = n.current, n.current = l;
  }
  var Yn = {}, Je = Vn(Yn), ft = Vn(!1), Er = Yn;
  function qr(n, l) {
    var u = n.type.contextTypes;
    if (!u) return Yn;
    var s = n.stateNode;
    if (s && s.__reactInternalMemoizedUnmaskedChildContext === l) return s.__reactInternalMemoizedMaskedChildContext;
    var f = {}, d;
    for (d in u) f[d] = l[d];
    return s && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = l, n.__reactInternalMemoizedMaskedChildContext = f), f;
  }
  function dt(n) {
    return n = n.childContextTypes, n != null;
  }
  function su() {
    ve(ft), ve(Je);
  }
  function Td(n, l, u) {
    if (Je.current !== Yn) throw Error(c(168));
    me(Je, l), me(ft, u);
  }
  function Od(n, l, u) {
    var s = n.stateNode;
    if (l = l.childContextTypes, typeof s.getChildContext != "function") return u;
    s = s.getChildContext();
    for (var f in s) if (!(f in l)) throw Error(c(108, B(n) || "Unknown", f));
    return a({}, u, s);
  }
  function au(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || Yn, Er = Je.current, me(Je, n), me(ft, ft.current), !0;
  }
  function Md(n, l, u) {
    var s = n.stateNode;
    if (!s) throw Error(c(169));
    u ? (n = Od(n, l, Er), s.__reactInternalMemoizedMergedChildContext = n, ve(ft), ve(Je), me(Je, n)) : ve(ft), me(ft, u);
  }
  var $t = Math.clz32 ? Math.clz32 : d0, c0 = Math.log, f0 = Math.LN2;
  function d0(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (c0(n) / f0 | 0) | 0;
  }
  var cu = 64, fu = 4194304;
  function Jl(n) {
    switch (n & -n) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return n & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return n;
    }
  }
  function du(n, l) {
    var u = n.pendingLanes;
    if (u === 0) return 0;
    var s = 0, f = n.suspendedLanes, d = n.pingedLanes, v = u & 268435455;
    if (v !== 0) {
      var E = v & ~f;
      E !== 0 ? s = Jl(E) : (d &= v, d !== 0 && (s = Jl(d)));
    } else v = u & ~f, v !== 0 ? s = Jl(v) : d !== 0 && (s = Jl(d));
    if (s === 0) return 0;
    if (l !== 0 && l !== s && !(l & f) && (f = s & -s, d = l & -l, f >= d || f === 16 && (d & 4194240) !== 0)) return l;
    if (s & 4 && (s |= u & 16), l = n.entangledLanes, l !== 0) for (n = n.entanglements, l &= s; 0 < l; ) u = 31 - $t(l), f = 1 << u, s |= n[u], l &= ~f;
    return s;
  }
  function p0(n, l) {
    switch (n) {
      case 1:
      case 2:
      case 4:
        return l + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function m0(n, l) {
    for (var u = n.suspendedLanes, s = n.pingedLanes, f = n.expirationTimes, d = n.pendingLanes; 0 < d; ) {
      var v = 31 - $t(d), E = 1 << v, O = f[v];
      O === -1 ? (!(E & u) || E & s) && (f[v] = p0(E, l)) : O <= l && (n.expiredLanes |= E), d &= ~E;
    }
  }
  function Bs(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function Ws(n) {
    for (var l = [], u = 0; 31 > u; u++) l.push(n);
    return l;
  }
  function $l(n, l, u) {
    n.pendingLanes |= l, l !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, l = 31 - $t(l), n[l] = u;
  }
  function h0(n, l) {
    var u = n.pendingLanes & ~l;
    n.pendingLanes = l, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= l, n.mutableReadLanes &= l, n.entangledLanes &= l, l = n.entanglements;
    var s = n.eventTimes;
    for (n = n.expirationTimes; 0 < u; ) {
      var f = 31 - $t(u), d = 1 << f;
      l[f] = 0, s[f] = -1, n[f] = -1, u &= ~d;
    }
  }
  function Qs(n, l) {
    var u = n.entangledLanes |= l;
    for (n = n.entanglements; u; ) {
      var s = 31 - $t(u), f = 1 << s;
      f & l | n[s] & l && (n[s] |= l), u &= ~f;
    }
  }
  var oe = 0;
  function Id(n) {
    return n &= -n, 1 < n ? 4 < n ? n & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var Vs = o.unstable_scheduleCallback, Dd = o.unstable_cancelCallback, v0 = o.unstable_shouldYield, g0 = o.unstable_requestPaint, Be = o.unstable_now, Ys = o.unstable_ImmediatePriority, y0 = o.unstable_UserBlockingPriority, Xs = o.unstable_NormalPriority, w0 = o.unstable_IdlePriority, pu = null, sn = null;
  function S0(n) {
    if (sn && typeof sn.onCommitFiberRoot == "function") try {
      sn.onCommitFiberRoot(pu, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  function k0(n, l) {
    return n === l && (n !== 0 || 1 / n === 1 / l) || n !== n && l !== l;
  }
  var an = typeof Object.is == "function" ? Object.is : k0, Cn = null, mu = !1, Ks = !1;
  function Fd(n) {
    Cn === null ? Cn = [n] : Cn.push(n);
  }
  function x0(n) {
    mu = !0, Fd(n);
  }
  function cn() {
    if (!Ks && Cn !== null) {
      Ks = !0;
      var n = 0, l = oe;
      try {
        var u = Cn;
        for (oe = 1; n < u.length; n++) {
          var s = u[n];
          do
            s = s(!0);
          while (s !== null);
        }
        Cn = null, mu = !1;
      } catch (f) {
        throw Cn !== null && (Cn = Cn.slice(n + 1)), Vs(Ys, cn), f;
      } finally {
        oe = l, Ks = !1;
      }
    }
    return null;
  }
  var E0 = p.ReactCurrentBatchConfig;
  function hu(n, l) {
    if (an(n, l)) return !0;
    if (typeof n != "object" || n === null || typeof l != "object" || l === null) return !1;
    var u = Object.keys(n), s = Object.keys(l);
    if (u.length !== s.length) return !1;
    for (s = 0; s < u.length; s++) {
      var f = u[s];
      if (!a0.call(l, f) || !an(n[f], l[f])) return !1;
    }
    return !0;
  }
  function C0(n) {
    switch (n.tag) {
      case 5:
        return Zl(n.type);
      case 16:
        return Zl("Lazy");
      case 13:
        return Zl("Suspense");
      case 19:
        return Zl("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = Us(n.type, !1), n;
      case 11:
        return n = Us(n.type.render, !1), n;
      case 1:
        return n = Us(n.type, !0), n;
      default:
        return "";
    }
  }
  function qt(n, l) {
    if (n && n.defaultProps) {
      l = a({}, l), n = n.defaultProps;
      for (var u in n) l[u] === void 0 && (l[u] = n[u]);
      return l;
    }
    return l;
  }
  var vu = Vn(null), gu = null, br = null, Gs = null;
  function Zs() {
    Gs = br = gu = null;
  }
  function Ad(n, l, u) {
    uu ? (me(vu, l._currentValue), l._currentValue = u) : (me(vu, l._currentValue2), l._currentValue2 = u);
  }
  function Js(n) {
    var l = vu.current;
    ve(vu), uu ? n._currentValue = l : n._currentValue2 = l;
  }
  function $s(n, l, u) {
    for (; n !== null; ) {
      var s = n.alternate;
      if ((n.childLanes & l) !== l ? (n.childLanes |= l, s !== null && (s.childLanes |= l)) : s !== null && (s.childLanes & l) !== l && (s.childLanes |= l), n === u) break;
      n = n.return;
    }
  }
  function el(n, l) {
    gu = n, Gs = br = null, n = n.dependencies, n !== null && n.firstContext !== null && (n.lanes & l && (Pt = !0), n.firstContext = null);
  }
  function Dt(n) {
    var l = uu ? n._currentValue : n._currentValue2;
    if (Gs !== n) if (n = { context: n, memoizedValue: l, next: null }, br === null) {
      if (gu === null) throw Error(c(308));
      br = n, gu.dependencies = { lanes: 0, firstContext: n };
    } else br = br.next = n;
    return l;
  }
  var fn = null, Xn = !1;
  function qs(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function jd(n, l) {
    n = n.updateQueue, l.updateQueue === n && (l.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function Pn(n, l) {
    return { eventTime: n, lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function Kn(n, l) {
    var u = n.updateQueue;
    u !== null && (u = u.shared, Oe !== null && n.mode & 1 && !(re & 2) ? (n = u.interleaved, n === null ? (l.next = l, fn === null ? fn = [u] : fn.push(u)) : (l.next = n.next, n.next = l), u.interleaved = l) : (n = u.pending, n === null ? l.next = l : (l.next = n.next, n.next = l), u.pending = l));
  }
  function yu(n, l, u) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (u & 4194240) !== 0)) {
      var s = l.lanes;
      s &= n.pendingLanes, u |= s, l.lanes = u, Qs(n, u);
    }
  }
  function Ud(n, l) {
    var u = n.updateQueue, s = n.alternate;
    if (s !== null && (s = s.updateQueue, u === s)) {
      var f = null, d = null;
      if (u = u.firstBaseUpdate, u !== null) {
        do {
          var v = { eventTime: u.eventTime, lane: u.lane, tag: u.tag, payload: u.payload, callback: u.callback, next: null };
          d === null ? f = d = v : d = d.next = v, u = u.next;
        } while (u !== null);
        d === null ? f = d = l : d = d.next = l;
      } else f = d = l;
      u = { baseState: s.baseState, firstBaseUpdate: f, lastBaseUpdate: d, shared: s.shared, effects: s.effects }, n.updateQueue = u;
      return;
    }
    n = u.lastBaseUpdate, n === null ? u.firstBaseUpdate = l : n.next = l, u.lastBaseUpdate = l;
  }
  function wu(n, l, u, s) {
    var f = n.updateQueue;
    Xn = !1;
    var d = f.firstBaseUpdate, v = f.lastBaseUpdate, E = f.shared.pending;
    if (E !== null) {
      f.shared.pending = null;
      var O = E, H = O.next;
      O.next = null, v === null ? d = H : v.next = H, v = O;
      var K = n.alternate;
      K !== null && (K = K.updateQueue, E = K.lastBaseUpdate, E !== v && (E === null ? K.firstBaseUpdate = H : E.next = H, K.lastBaseUpdate = O));
    }
    if (d !== null) {
      var b = f.baseState;
      v = 0, K = H = O = null, E = d;
      do {
        var J = E.lane, pe = E.eventTime;
        if ((s & J) === J) {
          K !== null && (K = K.next = {
            eventTime: pe,
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          });
          e: {
            var Z = n, et = E;
            switch (J = l, pe = u, et.tag) {
              case 1:
                if (Z = et.payload, typeof Z == "function") {
                  b = Z.call(pe, b, J);
                  break e;
                }
                b = Z;
                break e;
              case 3:
                Z.flags = Z.flags & -65537 | 128;
              case 0:
                if (Z = et.payload, J = typeof Z == "function" ? Z.call(pe, b, J) : Z, J == null) break e;
                b = a({}, b, J);
                break e;
              case 2:
                Xn = !0;
            }
          }
          E.callback !== null && E.lane !== 0 && (n.flags |= 64, J = f.effects, J === null ? f.effects = [E] : J.push(E));
        } else pe = { eventTime: pe, lane: J, tag: E.tag, payload: E.payload, callback: E.callback, next: null }, K === null ? (H = K = pe, O = b) : K = K.next = pe, v |= J;
        if (E = E.next, E === null) {
          if (E = f.shared.pending, E === null) break;
          J = E, E = J.next, J.next = null, f.lastBaseUpdate = J, f.shared.pending = null;
        }
      } while (!0);
      if (K === null && (O = b), f.baseState = O, f.firstBaseUpdate = H, f.lastBaseUpdate = K, l = f.shared.interleaved, l !== null) {
        f = l;
        do
          v |= f.lane, f = f.next;
        while (f !== l);
      } else d === null && (f.shared.lanes = 0);
      al |= v, n.lanes = v, n.memoizedState = b;
    }
  }
  function Hd(n, l, u) {
    if (n = l.effects, l.effects = null, n !== null) for (l = 0; l < n.length; l++) {
      var s = n[l], f = s.callback;
      if (f !== null) {
        if (s.callback = null, s = u, typeof f != "function") throw Error(c(191, f));
        f.call(s);
      }
    }
  }
  var Bd = new i.Component().refs;
  function bs(n, l, u, s) {
    l = n.memoizedState, u = u(s, l), u = u == null ? l : a({}, l, u), n.memoizedState = u, n.lanes === 0 && (n.updateQueue.baseState = u);
  }
  var Su = { isMounted: function(n) {
    return (n = n._reactInternals) ? $(n) === n : !1;
  }, enqueueSetState: function(n, l, u) {
    n = n._reactInternals;
    var s = ut(), f = Jn(n), d = Pn(s, f);
    d.payload = l, u != null && (d.callback = u), Kn(n, d), l = Ht(n, f, s), l !== null && yu(l, n, f);
  }, enqueueReplaceState: function(n, l, u) {
    n = n._reactInternals;
    var s = ut(), f = Jn(n), d = Pn(s, f);
    d.tag = 1, d.payload = l, u != null && (d.callback = u), Kn(n, d), l = Ht(n, f, s), l !== null && yu(l, n, f);
  }, enqueueForceUpdate: function(n, l) {
    n = n._reactInternals;
    var u = ut(), s = Jn(n), f = Pn(
      u,
      s
    );
    f.tag = 2, l != null && (f.callback = l), Kn(n, f), l = Ht(n, s, u), l !== null && yu(l, n, s);
  } };
  function Wd(n, l, u, s, f, d, v) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(s, d, v) : l.prototype && l.prototype.isPureReactComponent ? !hu(u, s) || !hu(f, d) : !0;
  }
  function Qd(n, l, u) {
    var s = !1, f = Yn, d = l.contextType;
    return typeof d == "object" && d !== null ? d = Dt(d) : (f = dt(l) ? Er : Je.current, s = l.contextTypes, d = (s = s != null) ? qr(n, f) : Yn), l = new l(u, d), n.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, l.updater = Su, n.stateNode = l, l._reactInternals = n, s && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = f, n.__reactInternalMemoizedMaskedChildContext = d), l;
  }
  function Vd(n, l, u, s) {
    n = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(u, s), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(u, s), l.state !== n && Su.enqueueReplaceState(l, l.state, null);
  }
  function ea(n, l, u, s) {
    var f = n.stateNode;
    f.props = u, f.state = n.memoizedState, f.refs = Bd, qs(n);
    var d = l.contextType;
    typeof d == "object" && d !== null ? f.context = Dt(d) : (d = dt(l) ? Er : Je.current, f.context = qr(n, d)), f.state = n.memoizedState, d = l.getDerivedStateFromProps, typeof d == "function" && (bs(n, l, d, u), f.state = n.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (l = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), l !== f.state && Su.enqueueReplaceState(f, f.state, null), wu(n, u, f, s), f.state = n.memoizedState), typeof f.componentDidMount == "function" && (n.flags |= 4194308);
  }
  var tl = [], nl = 0, ku = null, xu = 0, Ft = [], At = 0, Cr = null, _n = 1, zn = "";
  function Pr(n, l) {
    tl[nl++] = xu, tl[nl++] = ku, ku = n, xu = l;
  }
  function Yd(n, l, u) {
    Ft[At++] = _n, Ft[At++] = zn, Ft[At++] = Cr, Cr = n;
    var s = _n;
    n = zn;
    var f = 32 - $t(s) - 1;
    s &= ~(1 << f), u += 1;
    var d = 32 - $t(l) + f;
    if (30 < d) {
      var v = f - f % 5;
      d = (s & (1 << v) - 1).toString(32), s >>= v, f -= v, _n = 1 << 32 - $t(l) + f | u << f | s, zn = d + n;
    } else _n = 1 << d | u << f | s, zn = n;
  }
  function ta(n) {
    n.return !== null && (Pr(n, 1), Yd(n, 1, 0));
  }
  function na(n) {
    for (; n === ku; ) ku = tl[--nl], tl[nl] = null, xu = tl[--nl], tl[nl] = null;
    for (; n === Cr; ) Cr = Ft[--At], Ft[At] = null, zn = Ft[--At], Ft[At] = null, _n = Ft[--At], Ft[At] = null;
  }
  var Et = null, Ct = null, ke = !1, ql = !1, bt = null;
  function Xd(n, l) {
    var u = Bt(5, null, null, 0);
    u.elementType = "DELETED", u.stateNode = l, u.return = n, l = n.deletions, l === null ? (n.deletions = [u], n.flags |= 16) : l.push(u);
  }
  function Kd(n, l) {
    switch (n.tag) {
      case 5:
        return l = Xy(l, n.type, n.pendingProps), l !== null ? (n.stateNode = l, Et = n, Ct = Jy(l), !0) : !1;
      case 6:
        return l = Ky(l, n.pendingProps), l !== null ? (n.stateNode = l, Et = n, Ct = null, !0) : !1;
      case 13:
        if (l = Gy(l), l !== null) {
          var u = Cr !== null ? { id: _n, overflow: zn } : null;
          return n.memoizedState = { dehydrated: l, treeContext: u, retryLane: 1073741824 }, u = Bt(18, null, null, 0), u.stateNode = l, u.return = n, n.child = u, Et = n, Ct = null, !0;
        }
        return !1;
      default:
        return !1;
    }
  }
  function ra(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function la(n) {
    if (ke) {
      var l = Ct;
      if (l) {
        var u = l;
        if (!Kd(n, l)) {
          if (ra(n)) throw Error(c(418));
          l = Gl(u);
          var s = Et;
          l && Kd(n, l) ? Xd(s, u) : (n.flags = n.flags & -4097 | 2, ke = !1, Et = n);
        }
      } else {
        if (ra(n)) throw Error(c(418));
        n.flags = n.flags & -4097 | 2, ke = !1, Et = n;
      }
    }
  }
  function Gd(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    Et = n;
  }
  function bl(n) {
    if (!xt || n !== Et) return !1;
    if (!ke) return Gd(n), ke = !0, !1;
    if (n.tag !== 3 && (n.tag !== 5 || u0(n.type) && !Zt(n.type, n.memoizedProps))) {
      var l = Ct;
      if (l) {
        if (ra(n)) {
          for (n = Ct; n; ) n = Gl(n);
          throw Error(c(418));
        }
        for (; l; ) Xd(n, l), l = Gl(l);
      }
    }
    if (Gd(n), n.tag === 13) {
      if (!xt) throw Error(c(316));
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(c(317));
      Ct = n0(n);
    } else Ct = Et ? Gl(n.stateNode) : null;
    return !0;
  }
  function rl() {
    xt && (Ct = Et = null, ql = ke = !1);
  }
  function ia(n) {
    bt === null ? bt = [n] : bt.push(n);
  }
  function ei(n, l, u) {
    if (n = u.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (u._owner) {
        if (u = u._owner, u) {
          if (u.tag !== 1) throw Error(c(309));
          var s = u.stateNode;
        }
        if (!s) throw Error(c(147, n));
        var f = s, d = "" + n;
        return l !== null && l.ref !== null && typeof l.ref == "function" && l.ref._stringRef === d ? l.ref : (l = function(v) {
          var E = f.refs;
          E === Bd && (E = f.refs = {}), v === null ? delete E[d] : E[d] = v;
        }, l._stringRef = d, l);
      }
      if (typeof n != "string") throw Error(c(284));
      if (!u._owner) throw Error(c(290, n));
    }
    return n;
  }
  function Eu(n, l) {
    throw n = Object.prototype.toString.call(l), Error(c(31, n === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : n));
  }
  function Zd(n) {
    var l = n._init;
    return l(n._payload);
  }
  function Jd(n) {
    function l(R, C) {
      if (n) {
        var T = R.deletions;
        T === null ? (R.deletions = [C], R.flags |= 16) : T.push(C);
      }
    }
    function u(R, C) {
      if (!n) return null;
      for (; C !== null; ) l(R, C), C = C.sibling;
      return null;
    }
    function s(R, C) {
      for (R = /* @__PURE__ */ new Map(); C !== null; ) C.key !== null ? R.set(C.key, C) : R.set(C.index, C), C = C.sibling;
      return R;
    }
    function f(R, C) {
      return R = qn(R, C), R.index = 0, R.sibling = null, R;
    }
    function d(R, C, T) {
      return R.index = T, n ? (T = R.alternate, T !== null ? (T = T.index, T < C ? (R.flags |= 2, C) : T) : (R.flags |= 2, C)) : (R.flags |= 1048576, C);
    }
    function v(R) {
      return n && R.alternate === null && (R.flags |= 2), R;
    }
    function E(R, C, T, Q) {
      return C === null || C.tag !== 6 ? (C = Wa(T, R.mode, Q), C.return = R, C) : (C = f(C, T), C.return = R, C);
    }
    function O(R, C, T, Q) {
      var G = T.type;
      return G === x ? K(R, C, T.props.children, Q, T.key) : C !== null && (C.elementType === G || typeof G == "object" && G !== null && G.$$typeof === w && Zd(G) === C.type) ? (Q = f(C, T.props), Q.ref = ei(R, C, T), Q.return = R, Q) : (Q = eo(T.type, T.key, T.props, null, R.mode, Q), Q.ref = ei(R, C, T), Q.return = R, Q);
    }
    function H(R, C, T, Q) {
      return C === null || C.tag !== 4 || C.stateNode.containerInfo !== T.containerInfo || C.stateNode.implementation !== T.implementation ? (C = Qa(T, R.mode, Q), C.return = R, C) : (C = f(C, T.children || []), C.return = R, C);
    }
    function K(R, C, T, Q, G) {
      return C === null || C.tag !== 7 ? (C = Or(T, R.mode, Q, G), C.return = R, C) : (C = f(C, T), C.return = R, C);
    }
    function b(R, C, T) {
      if (typeof C == "string" && C !== "" || typeof C == "number") return C = Wa("" + C, R.mode, T), C.return = R, C;
      if (typeof C == "object" && C !== null) {
        switch (C.$$typeof) {
          case m:
            return T = eo(C.type, C.key, C.props, null, R.mode, T), T.ref = ei(R, null, C), T.return = R, T;
          case h:
            return C = Qa(C, R.mode, T), C.return = R, C;
          case w:
            var Q = C._init;
            return b(R, Q(C._payload), T);
        }
        if (De(C) || I(C)) return C = Or(C, R.mode, T, null), C.return = R, C;
        Eu(R, C);
      }
      return null;
    }
    function J(R, C, T, Q) {
      var G = C !== null ? C.key : null;
      if (typeof T == "string" && T !== "" || typeof T == "number") return G !== null ? null : E(R, C, "" + T, Q);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case m:
            return T.key === G ? O(R, C, T, Q) : null;
          case h:
            return T.key === G ? H(R, C, T, Q) : null;
          case w:
            return G = T._init, J(
              R,
              C,
              G(T._payload),
              Q
            );
        }
        if (De(T) || I(T)) return G !== null ? null : K(R, C, T, Q, null);
        Eu(R, T);
      }
      return null;
    }
    function pe(R, C, T, Q, G) {
      if (typeof Q == "string" && Q !== "" || typeof Q == "number") return R = R.get(T) || null, E(C, R, "" + Q, G);
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case m:
            return R = R.get(Q.key === null ? T : Q.key) || null, O(C, R, Q, G);
          case h:
            return R = R.get(Q.key === null ? T : Q.key) || null, H(C, R, Q, G);
          case w:
            var ne = Q._init;
            return pe(R, C, T, ne(Q._payload), G);
        }
        if (De(Q) || I(Q)) return R = R.get(T) || null, K(C, R, Q, G, null);
        Eu(C, Q);
      }
      return null;
    }
    function Z(R, C, T, Q) {
      for (var G = null, ne = null, ee = C, se = C = 0, Qe = null; ee !== null && se < T.length; se++) {
        ee.index > se ? (Qe = ee, ee = null) : Qe = ee.sibling;
        var ae = J(R, ee, T[se], Q);
        if (ae === null) {
          ee === null && (ee = Qe);
          break;
        }
        n && ee && ae.alternate === null && l(R, ee), C = d(ae, C, se), ne === null ? G = ae : ne.sibling = ae, ne = ae, ee = Qe;
      }
      if (se === T.length) return u(R, ee), ke && Pr(R, se), G;
      if (ee === null) {
        for (; se < T.length; se++) ee = b(R, T[se], Q), ee !== null && (C = d(ee, C, se), ne === null ? G = ee : ne.sibling = ee, ne = ee);
        return ke && Pr(R, se), G;
      }
      for (ee = s(R, ee); se < T.length; se++) Qe = pe(ee, R, se, T[se], Q), Qe !== null && (n && Qe.alternate !== null && ee.delete(Qe.key === null ? se : Qe.key), C = d(Qe, C, se), ne === null ? G = Qe : ne.sibling = Qe, ne = Qe);
      return n && ee.forEach(function(bn) {
        return l(R, bn);
      }), ke && Pr(R, se), G;
    }
    function et(R, C, T, Q) {
      var G = I(T);
      if (typeof G != "function") throw Error(c(150));
      if (T = G.call(T), T == null) throw Error(c(151));
      for (var ne = G = null, ee = C, se = C = 0, Qe = null, ae = T.next(); ee !== null && !ae.done; se++, ae = T.next()) {
        ee.index > se ? (Qe = ee, ee = null) : Qe = ee.sibling;
        var bn = J(R, ee, ae.value, Q);
        if (bn === null) {
          ee === null && (ee = Qe);
          break;
        }
        n && ee && bn.alternate === null && l(R, ee), C = d(bn, C, se), ne === null ? G = bn : ne.sibling = bn, ne = bn, ee = Qe;
      }
      if (ae.done) return u(
        R,
        ee
      ), ke && Pr(R, se), G;
      if (ee === null) {
        for (; !ae.done; se++, ae = T.next()) ae = b(R, ae.value, Q), ae !== null && (C = d(ae, C, se), ne === null ? G = ae : ne.sibling = ae, ne = ae);
        return ke && Pr(R, se), G;
      }
      for (ee = s(R, ee); !ae.done; se++, ae = T.next()) ae = pe(ee, R, se, ae.value, Q), ae !== null && (n && ae.alternate !== null && ee.delete(ae.key === null ? se : ae.key), C = d(ae, C, se), ne === null ? G = ae : ne.sibling = ae, ne = ae);
      return n && ee.forEach(function(e1) {
        return l(R, e1);
      }), ke && Pr(R, se), G;
    }
    function Wt(R, C, T, Q) {
      if (typeof T == "object" && T !== null && T.type === x && T.key === null && (T = T.props.children), typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case m:
            e: {
              for (var G = T.key, ne = C; ne !== null; ) {
                if (ne.key === G) {
                  if (G = T.type, G === x) {
                    if (ne.tag === 7) {
                      u(R, ne.sibling), C = f(ne, T.props.children), C.return = R, R = C;
                      break e;
                    }
                  } else if (ne.elementType === G || typeof G == "object" && G !== null && G.$$typeof === w && Zd(G) === ne.type) {
                    u(R, ne.sibling), C = f(ne, T.props), C.ref = ei(R, ne, T), C.return = R, R = C;
                    break e;
                  }
                  u(R, ne);
                  break;
                } else l(R, ne);
                ne = ne.sibling;
              }
              T.type === x ? (C = Or(T.props.children, R.mode, Q, T.key), C.return = R, R = C) : (Q = eo(T.type, T.key, T.props, null, R.mode, Q), Q.ref = ei(R, C, T), Q.return = R, R = Q);
            }
            return v(R);
          case h:
            e: {
              for (ne = T.key; C !== null; ) {
                if (C.key === ne) if (C.tag === 4 && C.stateNode.containerInfo === T.containerInfo && C.stateNode.implementation === T.implementation) {
                  u(R, C.sibling), C = f(C, T.children || []), C.return = R, R = C;
                  break e;
                } else {
                  u(R, C);
                  break;
                }
                else l(R, C);
                C = C.sibling;
              }
              C = Qa(T, R.mode, Q), C.return = R, R = C;
            }
            return v(R);
          case w:
            return ne = T._init, Wt(R, C, ne(T._payload), Q);
        }
        if (De(T)) return Z(R, C, T, Q);
        if (I(T)) return et(R, C, T, Q);
        Eu(R, T);
      }
      return typeof T == "string" && T !== "" || typeof T == "number" ? (T = "" + T, C !== null && C.tag === 6 ? (u(R, C.sibling), C = f(C, T), C.return = R, R = C) : (u(R, C), C = Wa(T, R.mode, Q), C.return = R, R = C), v(R)) : u(R, C);
    }
    return Wt;
  }
  var ll = Jd(!0), $d = Jd(!1), ti = {}, jt = Vn(ti), ni = Vn(ti), il = Vn(ti);
  function dn(n) {
    if (n === ti) throw Error(c(174));
    return n;
  }
  function ua(n, l) {
    me(il, l), me(ni, n), me(jt, ti), n = Te(l), ve(jt), me(jt, n);
  }
  function ul() {
    ve(jt), ve(ni), ve(il);
  }
  function qd(n) {
    var l = dn(il.current), u = dn(jt.current);
    l = z(u, n.type, l), u !== l && (me(ni, n), me(jt, l));
  }
  function oa(n) {
    ni.current === n && (ve(jt), ve(ni));
  }
  var Ee = Vn(0);
  function Cu(n) {
    for (var l = n; l !== null; ) {
      if (l.tag === 13) {
        var u = l.memoizedState;
        if (u !== null && (u = u.dehydrated, u === null || Rd(u) || Fs(u))) return l;
      } else if (l.tag === 19 && l.memoizedProps.revealOrder !== void 0) {
        if (l.flags & 128) return l;
      } else if (l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === n) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === n) return null;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
    return null;
  }
  var sa = [];
  function aa() {
    for (var n = 0; n < sa.length; n++) {
      var l = sa[n];
      uu ? l._workInProgressVersionPrimary = null : l._workInProgressVersionSecondary = null;
    }
    sa.length = 0;
  }
  var Pu = p.ReactCurrentDispatcher, Ut = p.ReactCurrentBatchConfig, ol = 0, ze = null, $e = null, We = null, _u = !1, ri = !1, li = 0, P0 = 0;
  function qe() {
    throw Error(c(321));
  }
  function ca(n, l) {
    if (l === null) return !1;
    for (var u = 0; u < l.length && u < n.length; u++) if (!an(n[u], l[u])) return !1;
    return !0;
  }
  function fa(n, l, u, s, f, d) {
    if (ol = d, ze = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, Pu.current = n === null || n.memoizedState === null ? R0 : L0, n = u(s, f), ri) {
      d = 0;
      do {
        if (ri = !1, li = 0, 25 <= d) throw Error(c(301));
        d += 1, We = $e = null, l.updateQueue = null, Pu.current = T0, n = u(s, f);
      } while (ri);
    }
    if (Pu.current = Tu, l = $e !== null && $e.next !== null, ol = 0, We = $e = ze = null, _u = !1, l) throw Error(c(300));
    return n;
  }
  function da() {
    var n = li !== 0;
    return li = 0, n;
  }
  function Nn() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return We === null ? ze.memoizedState = We = n : We = We.next = n, We;
  }
  function pn() {
    if ($e === null) {
      var n = ze.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = $e.next;
    var l = We === null ? ze.memoizedState : We.next;
    if (l !== null) We = l, $e = n;
    else {
      if (n === null) throw Error(c(310));
      $e = n, n = { memoizedState: $e.memoizedState, baseState: $e.baseState, baseQueue: $e.baseQueue, queue: $e.queue, next: null }, We === null ? ze.memoizedState = We = n : We = We.next = n;
    }
    return We;
  }
  function _r(n, l) {
    return typeof l == "function" ? l(n) : l;
  }
  function zu(n) {
    var l = pn(), u = l.queue;
    if (u === null) throw Error(c(311));
    u.lastRenderedReducer = n;
    var s = $e, f = s.baseQueue, d = u.pending;
    if (d !== null) {
      if (f !== null) {
        var v = f.next;
        f.next = d.next, d.next = v;
      }
      s.baseQueue = f = d, u.pending = null;
    }
    if (f !== null) {
      d = f.next, s = s.baseState;
      var E = v = null, O = null, H = d;
      do {
        var K = H.lane;
        if ((ol & K) === K) O !== null && (O = O.next = { lane: 0, action: H.action, hasEagerState: H.hasEagerState, eagerState: H.eagerState, next: null }), s = H.hasEagerState ? H.eagerState : n(s, H.action);
        else {
          var b = {
            lane: K,
            action: H.action,
            hasEagerState: H.hasEagerState,
            eagerState: H.eagerState,
            next: null
          };
          O === null ? (E = O = b, v = s) : O = O.next = b, ze.lanes |= K, al |= K;
        }
        H = H.next;
      } while (H !== null && H !== d);
      O === null ? v = s : O.next = E, an(s, l.memoizedState) || (Pt = !0), l.memoizedState = s, l.baseState = v, l.baseQueue = O, u.lastRenderedState = s;
    }
    if (n = u.interleaved, n !== null) {
      f = n;
      do
        d = f.lane, ze.lanes |= d, al |= d, f = f.next;
      while (f !== n);
    } else f === null && (u.lanes = 0);
    return [l.memoizedState, u.dispatch];
  }
  function Nu(n) {
    var l = pn(), u = l.queue;
    if (u === null) throw Error(c(311));
    u.lastRenderedReducer = n;
    var s = u.dispatch, f = u.pending, d = l.memoizedState;
    if (f !== null) {
      u.pending = null;
      var v = f = f.next;
      do
        d = n(d, v.action), v = v.next;
      while (v !== f);
      an(d, l.memoizedState) || (Pt = !0), l.memoizedState = d, l.baseQueue === null && (l.baseState = d), u.lastRenderedState = d;
    }
    return [d, s];
  }
  function bd() {
  }
  function ep(n, l) {
    var u = ze, s = pn(), f = l(), d = !an(s.memoizedState, f);
    if (d && (s.memoizedState = f, Pt = !0), s = s.queue, ui(rp.bind(null, u, s, n), [n]), s.getSnapshot !== l || d || We !== null && We.memoizedState.tag & 1) {
      if (u.flags |= 2048, ii(9, np.bind(null, u, s, f, l), void 0, null), Oe === null) throw Error(c(349));
      ol & 30 || tp(u, l, f);
    }
    return f;
  }
  function tp(n, l, u) {
    n.flags |= 16384, n = { getSnapshot: l, value: u }, l = ze.updateQueue, l === null ? (l = { lastEffect: null, stores: null }, ze.updateQueue = l, l.stores = [n]) : (u = l.stores, u === null ? l.stores = [n] : u.push(n));
  }
  function np(n, l, u, s) {
    l.value = u, l.getSnapshot = s, lp(l) && Ht(n, 1, -1);
  }
  function rp(n, l, u) {
    return u(function() {
      lp(l) && Ht(n, 1, -1);
    });
  }
  function lp(n) {
    var l = n.getSnapshot;
    n = n.value;
    try {
      var u = l();
      return !an(n, u);
    } catch {
      return !0;
    }
  }
  function pa(n) {
    var l = Nn();
    return typeof n == "function" && (n = n()), l.memoizedState = l.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: _r, lastRenderedState: n }, l.queue = n, n = n.dispatch = N0.bind(null, ze, n), [l.memoizedState, n];
  }
  function ii(n, l, u, s) {
    return n = { tag: n, create: l, destroy: u, deps: s, next: null }, l = ze.updateQueue, l === null ? (l = { lastEffect: null, stores: null }, ze.updateQueue = l, l.lastEffect = n.next = n) : (u = l.lastEffect, u === null ? l.lastEffect = n.next = n : (s = u.next, u.next = n, n.next = s, l.lastEffect = n)), n;
  }
  function ip() {
    return pn().memoizedState;
  }
  function Ru(n, l, u, s) {
    var f = Nn();
    ze.flags |= n, f.memoizedState = ii(1 | l, u, void 0, s === void 0 ? null : s);
  }
  function Lu(n, l, u, s) {
    var f = pn();
    s = s === void 0 ? null : s;
    var d = void 0;
    if ($e !== null) {
      var v = $e.memoizedState;
      if (d = v.destroy, s !== null && ca(s, v.deps)) {
        f.memoizedState = ii(l, u, d, s);
        return;
      }
    }
    ze.flags |= n, f.memoizedState = ii(1 | l, u, d, s);
  }
  function ma(n, l) {
    return Ru(8390656, 8, n, l);
  }
  function ui(n, l) {
    return Lu(2048, 8, n, l);
  }
  function up(n, l) {
    return Lu(4, 2, n, l);
  }
  function op(n, l) {
    return Lu(4, 4, n, l);
  }
  function sp(n, l) {
    if (typeof l == "function") return n = n(), l(n), function() {
      l(null);
    };
    if (l != null) return n = n(), l.current = n, function() {
      l.current = null;
    };
  }
  function ap(n, l, u) {
    return u = u != null ? u.concat([n]) : null, Lu(4, 4, sp.bind(null, l, n), u);
  }
  function ha() {
  }
  function cp(n, l) {
    var u = pn();
    l = l === void 0 ? null : l;
    var s = u.memoizedState;
    return s !== null && l !== null && ca(l, s[1]) ? s[0] : (u.memoizedState = [n, l], n);
  }
  function fp(n, l) {
    var u = pn();
    l = l === void 0 ? null : l;
    var s = u.memoizedState;
    return s !== null && l !== null && ca(l, s[1]) ? s[0] : (n = n(), u.memoizedState = [n, l], n);
  }
  function _0(n, l) {
    var u = oe;
    oe = u !== 0 && 4 > u ? u : 4, n(!0);
    var s = Ut.transition;
    Ut.transition = {};
    try {
      n(!1), l();
    } finally {
      oe = u, Ut.transition = s;
    }
  }
  function dp() {
    return pn().memoizedState;
  }
  function z0(n, l, u) {
    var s = Jn(n);
    u = { lane: s, action: u, hasEagerState: !1, eagerState: null, next: null }, pp(n) ? mp(l, u) : (hp(n, l, u), u = ut(), n = Ht(n, s, u), n !== null && vp(n, l, s));
  }
  function N0(n, l, u) {
    var s = Jn(n), f = { lane: s, action: u, hasEagerState: !1, eagerState: null, next: null };
    if (pp(n)) mp(l, f);
    else {
      hp(n, l, f);
      var d = n.alternate;
      if (n.lanes === 0 && (d === null || d.lanes === 0) && (d = l.lastRenderedReducer, d !== null)) try {
        var v = l.lastRenderedState, E = d(v, u);
        if (f.hasEagerState = !0, f.eagerState = E, an(E, v)) return;
      } catch {
      } finally {
      }
      u = ut(), n = Ht(n, s, u), n !== null && vp(n, l, s);
    }
  }
  function pp(n) {
    var l = n.alternate;
    return n === ze || l !== null && l === ze;
  }
  function mp(n, l) {
    ri = _u = !0;
    var u = n.pending;
    u === null ? l.next = l : (l.next = u.next, u.next = l), n.pending = l;
  }
  function hp(n, l, u) {
    Oe !== null && n.mode & 1 && !(re & 2) ? (n = l.interleaved, n === null ? (u.next = u, fn === null ? fn = [l] : fn.push(l)) : (u.next = n.next, n.next = u), l.interleaved = u) : (n = l.pending, n === null ? u.next = u : (u.next = n.next, n.next = u), l.pending = u);
  }
  function vp(n, l, u) {
    if (u & 4194240) {
      var s = l.lanes;
      s &= n.pendingLanes, u |= s, l.lanes = u, Qs(n, u);
    }
  }
  var Tu = { readContext: Dt, useCallback: qe, useContext: qe, useEffect: qe, useImperativeHandle: qe, useInsertionEffect: qe, useLayoutEffect: qe, useMemo: qe, useReducer: qe, useRef: qe, useState: qe, useDebugValue: qe, useDeferredValue: qe, useTransition: qe, useMutableSource: qe, useSyncExternalStore: qe, useId: qe, unstable_isNewReconciler: !1 }, R0 = { readContext: Dt, useCallback: function(n, l) {
    return Nn().memoizedState = [n, l === void 0 ? null : l], n;
  }, useContext: Dt, useEffect: ma, useImperativeHandle: function(n, l, u) {
    return u = u != null ? u.concat([n]) : null, Ru(
      4194308,
      4,
      sp.bind(null, l, n),
      u
    );
  }, useLayoutEffect: function(n, l) {
    return Ru(4194308, 4, n, l);
  }, useInsertionEffect: function(n, l) {
    return Ru(4, 2, n, l);
  }, useMemo: function(n, l) {
    var u = Nn();
    return l = l === void 0 ? null : l, n = n(), u.memoizedState = [n, l], n;
  }, useReducer: function(n, l, u) {
    var s = Nn();
    return l = u !== void 0 ? u(l) : l, s.memoizedState = s.baseState = l, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: l }, s.queue = n, n = n.dispatch = z0.bind(null, ze, n), [s.memoizedState, n];
  }, useRef: function(n) {
    var l = Nn();
    return n = { current: n }, l.memoizedState = n;
  }, useState: pa, useDebugValue: ha, useDeferredValue: function(n) {
    var l = pa(n), u = l[0], s = l[1];
    return ma(function() {
      var f = Ut.transition;
      Ut.transition = {};
      try {
        s(n);
      } finally {
        Ut.transition = f;
      }
    }, [n]), u;
  }, useTransition: function() {
    var n = pa(!1), l = n[0];
    return n = _0.bind(null, n[1]), Nn().memoizedState = n, [l, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, l, u) {
    var s = ze, f = Nn();
    if (ke) {
      if (u === void 0) throw Error(c(407));
      u = u();
    } else {
      if (u = l(), Oe === null) throw Error(c(349));
      ol & 30 || tp(s, l, u);
    }
    f.memoizedState = u;
    var d = { value: u, getSnapshot: l };
    return f.queue = d, ma(rp.bind(null, s, d, n), [n]), s.flags |= 2048, ii(9, np.bind(null, s, d, u, l), void 0, null), u;
  }, useId: function() {
    var n = Nn(), l = Oe.identifierPrefix;
    if (ke) {
      var u = zn, s = _n;
      u = (s & ~(1 << 32 - $t(s) - 1)).toString(32) + u, l = ":" + l + "R" + u, u = li++, 0 < u && (l += "H" + u.toString(32)), l += ":";
    } else u = P0++, l = ":" + l + "r" + u.toString(32) + ":";
    return n.memoizedState = l;
  }, unstable_isNewReconciler: !1 }, L0 = {
    readContext: Dt,
    useCallback: cp,
    useContext: Dt,
    useEffect: ui,
    useImperativeHandle: ap,
    useInsertionEffect: up,
    useLayoutEffect: op,
    useMemo: fp,
    useReducer: zu,
    useRef: ip,
    useState: function() {
      return zu(_r);
    },
    useDebugValue: ha,
    useDeferredValue: function(n) {
      var l = zu(_r), u = l[0], s = l[1];
      return ui(function() {
        var f = Ut.transition;
        Ut.transition = {};
        try {
          s(n);
        } finally {
          Ut.transition = f;
        }
      }, [n]), u;
    },
    useTransition: function() {
      var n = zu(_r)[0], l = pn().memoizedState;
      return [n, l];
    },
    useMutableSource: bd,
    useSyncExternalStore: ep,
    useId: dp,
    unstable_isNewReconciler: !1
  }, T0 = {
    readContext: Dt,
    useCallback: cp,
    useContext: Dt,
    useEffect: ui,
    useImperativeHandle: ap,
    useInsertionEffect: up,
    useLayoutEffect: op,
    useMemo: fp,
    useReducer: Nu,
    useRef: ip,
    useState: function() {
      return Nu(_r);
    },
    useDebugValue: ha,
    useDeferredValue: function(n) {
      var l = Nu(_r), u = l[0], s = l[1];
      return ui(function() {
        var f = Ut.transition;
        Ut.transition = {};
        try {
          s(n);
        } finally {
          Ut.transition = f;
        }
      }, [n]), u;
    },
    useTransition: function() {
      var n = Nu(_r)[0], l = pn().memoizedState;
      return [n, l];
    },
    useMutableSource: bd,
    useSyncExternalStore: ep,
    useId: dp,
    unstable_isNewReconciler: !1
  };
  function va(n, l) {
    try {
      var u = "", s = l;
      do
        u += C0(s), s = s.return;
      while (s);
      var f = u;
    } catch (d) {
      f = `
Error generating stack: ` + d.message + `
` + d.stack;
    }
    return { value: n, source: l, stack: f };
  }
  function ga(n, l) {
    try {
      console.error(l.value);
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  var O0 = typeof WeakMap == "function" ? WeakMap : Map;
  function gp(n, l, u) {
    u = Pn(-1, u), u.tag = 3, u.payload = { element: null };
    var s = l.value;
    return u.callback = function() {
      Ku || (Ku = !0, Da = s), ga(n, l);
    }, u;
  }
  function yp(n, l, u) {
    u = Pn(-1, u), u.tag = 3;
    var s = n.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var f = l.value;
      u.payload = function() {
        return s(f);
      }, u.callback = function() {
        ga(n, l);
      };
    }
    var d = n.stateNode;
    return d !== null && typeof d.componentDidCatch == "function" && (u.callback = function() {
      ga(n, l), typeof s != "function" && (Gn === null ? Gn = /* @__PURE__ */ new Set([this]) : Gn.add(this));
      var v = l.stack;
      this.componentDidCatch(l.value, { componentStack: v !== null ? v : "" });
    }), u;
  }
  function wp(n, l, u) {
    var s = n.pingCache;
    if (s === null) {
      s = n.pingCache = new O0();
      var f = /* @__PURE__ */ new Set();
      s.set(l, f);
    } else f = s.get(l), f === void 0 && (f = /* @__PURE__ */ new Set(), s.set(l, f));
    f.has(u) || (f.add(u), n = X0.bind(null, n, l, u), l.then(n, n));
  }
  function Sp(n) {
    do {
      var l;
      if ((l = n.tag === 13) && (l = n.memoizedState, l = l !== null ? l.dehydrated !== null : !0), l) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function kp(n, l, u, s, f) {
    return n.mode & 1 ? (n.flags |= 65536, n.lanes = f, n) : (n === l ? n.flags |= 65536 : (n.flags |= 128, u.flags |= 131072, u.flags &= -52805, u.tag === 1 && (u.alternate === null ? u.tag = 17 : (l = Pn(-1, 1), l.tag = 2, Kn(u, l))), u.lanes |= 1), n);
  }
  function mn(n) {
    n.flags |= 4;
  }
  function xp(n, l) {
    if (n !== null && n.child === l.child) return !0;
    if (l.flags & 16) return !1;
    for (n = l.child; n !== null; ) {
      if (n.flags & 12854 || n.subtreeFlags & 12854) return !1;
      n = n.sibling;
    }
    return !0;
  }
  var oi, si, Ou, Mu;
  if (Jt) oi = function(n, l) {
    for (var u = l.child; u !== null; ) {
      if (u.tag === 5 || u.tag === 6) te(n, u.stateNode);
      else if (u.tag !== 4 && u.child !== null) {
        u.child.return = u, u = u.child;
        continue;
      }
      if (u === l) break;
      for (; u.sibling === null; ) {
        if (u.return === null || u.return === l) return;
        u = u.return;
      }
      u.sibling.return = u.return, u = u.sibling;
    }
  }, si = function() {
  }, Ou = function(n, l, u, s, f) {
    if (n = n.memoizedProps, n !== s) {
      var d = l.stateNode, v = dn(jt.current);
      u = Ue(d, u, n, s, f, v), (l.updateQueue = u) && mn(l);
    }
  }, Mu = function(n, l, u, s) {
    u !== s && mn(l);
  };
  else if (ou) {
    oi = function(n, l, u, s) {
      for (var f = l.child; f !== null; ) {
        if (f.tag === 5) {
          var d = f.stateNode;
          u && s && (d = zd(d, f.type, f.memoizedProps, f)), te(n, d);
        } else if (f.tag === 6) d = f.stateNode, u && s && (d = Nd(d, f.memoizedProps, f)), te(n, d);
        else if (f.tag !== 4) {
          if (f.tag === 22 && f.memoizedState !== null) d = f.child, d !== null && (d.return = f), oi(n, f, !0, !0);
          else if (f.child !== null) {
            f.child.return = f, f = f.child;
            continue;
          }
        }
        if (f === l) break;
        for (; f.sibling === null; ) {
          if (f.return === null || f.return === l) return;
          f = f.return;
        }
        f.sibling.return = f.return, f = f.sibling;
      }
    };
    var Ep = function(n, l, u, s) {
      for (var f = l.child; f !== null; ) {
        if (f.tag === 5) {
          var d = f.stateNode;
          u && s && (d = zd(d, f.type, f.memoizedProps, f)), Pd(n, d);
        } else if (f.tag === 6) d = f.stateNode, u && s && (d = Nd(d, f.memoizedProps, f)), Pd(n, d);
        else if (f.tag !== 4) {
          if (f.tag === 22 && f.memoizedState !== null) d = f.child, d !== null && (d.return = f), Ep(n, f, !0, !0);
          else if (f.child !== null) {
            f.child.return = f, f = f.child;
            continue;
          }
        }
        if (f === l) break;
        for (; f.sibling === null; ) {
          if (f.return === null || f.return === l) return;
          f = f.return;
        }
        f.sibling.return = f.return, f = f.sibling;
      }
    };
    si = function(n, l) {
      var u = l.stateNode;
      if (!xp(n, l)) {
        n = u.containerInfo;
        var s = Cd(n);
        Ep(s, l, !1, !1), u.pendingChildren = s, mn(l), Yy(n, s);
      }
    }, Ou = function(n, l, u, s, f) {
      var d = n.stateNode, v = n.memoizedProps;
      if ((n = xp(n, l)) && v === s) l.stateNode = d;
      else {
        var E = l.stateNode, O = dn(jt.current), H = null;
        v !== s && (H = Ue(E, u, v, s, f, O)), n && H === null ? l.stateNode = d : (d = Vy(d, H, u, v, s, l, n, E), Mt(d, u, s, f, O) && mn(l), l.stateNode = d, n ? mn(l) : oi(d, l, !1, !1));
      }
    }, Mu = function(n, l, u, s) {
      u !== s ? (n = dn(il.current), u = dn(jt.current), l.stateNode = He(s, n, u, l), mn(l)) : l.stateNode = n.stateNode;
    };
  } else si = function() {
  }, Ou = function() {
  }, Mu = function() {
  };
  function ai(n, l) {
    if (!ke) switch (n.tailMode) {
      case "hidden":
        l = n.tail;
        for (var u = null; l !== null; ) l.alternate !== null && (u = l), l = l.sibling;
        u === null ? n.tail = null : u.sibling = null;
        break;
      case "collapsed":
        u = n.tail;
        for (var s = null; u !== null; ) u.alternate !== null && (s = u), u = u.sibling;
        s === null ? l || n.tail === null ? n.tail = null : n.tail.sibling = null : s.sibling = null;
    }
  }
  function be(n) {
    var l = n.alternate !== null && n.alternate.child === n.child, u = 0, s = 0;
    if (l) for (var f = n.child; f !== null; ) u |= f.lanes | f.childLanes, s |= f.subtreeFlags & 14680064, s |= f.flags & 14680064, f.return = n, f = f.sibling;
    else for (f = n.child; f !== null; ) u |= f.lanes | f.childLanes, s |= f.subtreeFlags, s |= f.flags, f.return = n, f = f.sibling;
    return n.subtreeFlags |= s, n.childLanes = u, l;
  }
  function M0(n, l, u) {
    var s = l.pendingProps;
    switch (na(l), l.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return be(l), null;
      case 1:
        return dt(l.type) && su(), be(l), null;
      case 3:
        return s = l.stateNode, ul(), ve(ft), ve(Je), aa(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), (n === null || n.child === null) && (bl(l) ? mn(l) : n === null || n.memoizedState.isDehydrated && !(l.flags & 256) || (l.flags |= 1024, bt !== null && (ja(bt), bt = null))), si(n, l), be(l), null;
      case 5:
        oa(l), u = dn(il.current);
        var f = l.type;
        if (n !== null && l.stateNode != null) Ou(n, l, f, s, u), n.ref !== l.ref && (l.flags |= 512, l.flags |= 2097152);
        else {
          if (!s) {
            if (l.stateNode === null) throw Error(c(166));
            return be(l), null;
          }
          if (n = dn(jt.current), bl(l)) {
            if (!xt) throw Error(c(175));
            n = by(l.stateNode, l.type, l.memoizedProps, u, n, l, !ql), l.updateQueue = n, n !== null && mn(l);
          } else {
            var d = q(f, s, u, n, l);
            oi(d, l, !1, !1), l.stateNode = d, Mt(d, f, s, u, n) && mn(l);
          }
          l.ref !== null && (l.flags |= 512, l.flags |= 2097152);
        }
        return be(l), null;
      case 6:
        if (n && l.stateNode != null) Mu(n, l, n.memoizedProps, s);
        else {
          if (typeof s != "string" && l.stateNode === null) throw Error(c(166));
          if (n = dn(il.current), u = dn(jt.current), bl(l)) {
            if (!xt) throw Error(c(176));
            if (n = l.stateNode, s = l.memoizedProps, (u = e0(n, s, l, !ql)) && (f = Et, f !== null)) switch (d = (f.mode & 1) !== 0, f.tag) {
              case 3:
                o0(f.stateNode.containerInfo, n, s, d);
                break;
              case 5:
                s0(f.type, f.memoizedProps, f.stateNode, n, s, d);
            }
            u && mn(l);
          } else l.stateNode = He(s, n, u, l);
        }
        return be(l), null;
      case 13:
        if (ve(Ee), s = l.memoizedState, ke && Ct !== null && l.mode & 1 && !(l.flags & 128)) {
          for (n = Ct; n; ) n = Gl(n);
          return rl(), l.flags |= 98560, l;
        }
        if (s !== null && s.dehydrated !== null) {
          if (s = bl(l), n === null) {
            if (!s) throw Error(c(318));
            if (!xt) throw Error(c(344));
            if (n = l.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(c(317));
            t0(n, l);
          } else rl(), !(l.flags & 128) && (l.memoizedState = null), l.flags |= 4;
          return be(l), null;
        }
        return bt !== null && (ja(bt), bt = null), l.flags & 128 ? (l.lanes = u, l) : (s = s !== null, u = !1, n === null ? bl(l) : u = n.memoizedState !== null, s && !u && (l.child.flags |= 8192, l.mode & 1 && (n === null || Ee.current & 1 ? Fe === 0 && (Fe = 3) : Ha())), l.updateQueue !== null && (l.flags |= 4), be(l), null);
      case 4:
        return ul(), si(n, l), n === null && wy(l.stateNode.containerInfo), be(l), null;
      case 10:
        return Js(l.type._context), be(l), null;
      case 17:
        return dt(l.type) && su(), be(l), null;
      case 19:
        if (ve(Ee), f = l.memoizedState, f === null) return be(l), null;
        if (s = (l.flags & 128) !== 0, d = f.rendering, d === null) if (s) ai(f, !1);
        else {
          if (Fe !== 0 || n !== null && n.flags & 128) for (n = l.child; n !== null; ) {
            if (d = Cu(n), d !== null) {
              for (l.flags |= 128, ai(f, !1), n = d.updateQueue, n !== null && (l.updateQueue = n, l.flags |= 4), l.subtreeFlags = 0, n = u, s = l.child; s !== null; ) u = s, f = n, u.flags &= 14680066, d = u.alternate, d === null ? (u.childLanes = 0, u.lanes = f, u.child = null, u.subtreeFlags = 0, u.memoizedProps = null, u.memoizedState = null, u.updateQueue = null, u.dependencies = null, u.stateNode = null) : (u.childLanes = d.childLanes, u.lanes = d.lanes, u.child = d.child, u.subtreeFlags = 0, u.deletions = null, u.memoizedProps = d.memoizedProps, u.memoizedState = d.memoizedState, u.updateQueue = d.updateQueue, u.type = d.type, f = d.dependencies, u.dependencies = f === null ? null : { lanes: f.lanes, firstContext: f.firstContext }), s = s.sibling;
              return me(Ee, Ee.current & 1 | 2), l.child;
            }
            n = n.sibling;
          }
          f.tail !== null && Be() > Ia && (l.flags |= 128, s = !0, ai(f, !1), l.lanes = 4194304);
        }
        else {
          if (!s) if (n = Cu(d), n !== null) {
            if (l.flags |= 128, s = !0, n = n.updateQueue, n !== null && (l.updateQueue = n, l.flags |= 4), ai(f, !0), f.tail === null && f.tailMode === "hidden" && !d.alternate && !ke) return be(l), null;
          } else 2 * Be() - f.renderingStartTime > Ia && u !== 1073741824 && (l.flags |= 128, s = !0, ai(f, !1), l.lanes = 4194304);
          f.isBackwards ? (d.sibling = l.child, l.child = d) : (n = f.last, n !== null ? n.sibling = d : l.child = d, f.last = d);
        }
        return f.tail !== null ? (l = f.tail, f.rendering = l, f.tail = l.sibling, f.renderingStartTime = Be(), l.sibling = null, n = Ee.current, me(Ee, s ? n & 1 | 2 : n & 1), l) : (be(l), null);
      case 22:
      case 23:
        return Ua(), s = l.memoizedState !== null, n !== null && n.memoizedState !== null !== s && (l.flags |= 8192), s && l.mode & 1 ? _t & 1073741824 && (be(l), Jt && l.subtreeFlags & 6 && (l.flags |= 8192)) : be(l), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(c(156, l.tag));
  }
  var I0 = p.ReactCurrentOwner, Pt = !1;
  function it(n, l, u, s) {
    l.child = n === null ? $d(l, null, u, s) : ll(l, n.child, u, s);
  }
  function Cp(n, l, u, s, f) {
    u = u.render;
    var d = l.ref;
    return el(l, f), s = fa(n, l, u, s, d, f), u = da(), n !== null && !Pt ? (l.updateQueue = n.updateQueue, l.flags &= -2053, n.lanes &= ~f, Rn(n, l, f)) : (ke && u && ta(l), l.flags |= 1, it(n, l, s, f), l.child);
  }
  function Pp(n, l, u, s, f) {
    if (n === null) {
      var d = u.type;
      return typeof d == "function" && !Ba(d) && d.defaultProps === void 0 && u.compare === null && u.defaultProps === void 0 ? (l.tag = 15, l.type = d, _p(n, l, d, s, f)) : (n = eo(u.type, null, s, l, l.mode, f), n.ref = l.ref, n.return = l, l.child = n);
    }
    if (d = n.child, !(n.lanes & f)) {
      var v = d.memoizedProps;
      if (u = u.compare, u = u !== null ? u : hu, u(v, s) && n.ref === l.ref) return Rn(n, l, f);
    }
    return l.flags |= 1, n = qn(d, s), n.ref = l.ref, n.return = l, l.child = n;
  }
  function _p(n, l, u, s, f) {
    if (n !== null && hu(n.memoizedProps, s) && n.ref === l.ref) if (Pt = !1, (n.lanes & f) !== 0) n.flags & 131072 && (Pt = !0);
    else return l.lanes = n.lanes, Rn(n, l, f);
    return ya(n, l, u, s, f);
  }
  function zp(n, l, u) {
    var s = l.pendingProps, f = s.children, d = n !== null ? n.memoizedState : null;
    if (s.mode === "hidden") if (!(l.mode & 1)) l.memoizedState = { baseLanes: 0, cachePool: null }, me(sl, _t), _t |= u;
    else if (u & 1073741824) l.memoizedState = { baseLanes: 0, cachePool: null }, s = d !== null ? d.baseLanes : u, me(sl, _t), _t |= s;
    else return n = d !== null ? d.baseLanes | u : u, l.lanes = l.childLanes = 1073741824, l.memoizedState = { baseLanes: n, cachePool: null }, l.updateQueue = null, me(sl, _t), _t |= n, null;
    else d !== null ? (s = d.baseLanes | u, l.memoizedState = null) : s = u, me(sl, _t), _t |= s;
    return it(n, l, f, u), l.child;
  }
  function Np(n, l) {
    var u = l.ref;
    (n === null && u !== null || n !== null && n.ref !== u) && (l.flags |= 512, l.flags |= 2097152);
  }
  function ya(n, l, u, s, f) {
    var d = dt(u) ? Er : Je.current;
    return d = qr(l, d), el(l, f), u = fa(n, l, u, s, d, f), s = da(), n !== null && !Pt ? (l.updateQueue = n.updateQueue, l.flags &= -2053, n.lanes &= ~f, Rn(n, l, f)) : (ke && s && ta(l), l.flags |= 1, it(n, l, u, f), l.child);
  }
  function Rp(n, l, u, s, f) {
    if (dt(u)) {
      var d = !0;
      au(l);
    } else d = !1;
    if (el(l, f), l.stateNode === null) n !== null && (n.alternate = null, l.alternate = null, l.flags |= 2), Qd(l, u, s), ea(l, u, s, f), s = !0;
    else if (n === null) {
      var v = l.stateNode, E = l.memoizedProps;
      v.props = E;
      var O = v.context, H = u.contextType;
      typeof H == "object" && H !== null ? H = Dt(H) : (H = dt(u) ? Er : Je.current, H = qr(l, H));
      var K = u.getDerivedStateFromProps, b = typeof K == "function" || typeof v.getSnapshotBeforeUpdate == "function";
      b || typeof v.UNSAFE_componentWillReceiveProps != "function" && typeof v.componentWillReceiveProps != "function" || (E !== s || O !== H) && Vd(l, v, s, H), Xn = !1;
      var J = l.memoizedState;
      v.state = J, wu(l, s, v, f), O = l.memoizedState, E !== s || J !== O || ft.current || Xn ? (typeof K == "function" && (bs(l, u, K, s), O = l.memoizedState), (E = Xn || Wd(l, u, E, s, J, O, H)) ? (b || typeof v.UNSAFE_componentWillMount != "function" && typeof v.componentWillMount != "function" || (typeof v.componentWillMount == "function" && v.componentWillMount(), typeof v.UNSAFE_componentWillMount == "function" && v.UNSAFE_componentWillMount()), typeof v.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof v.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = s, l.memoizedState = O), v.props = s, v.state = O, v.context = H, s = E) : (typeof v.componentDidMount == "function" && (l.flags |= 4194308), s = !1);
    } else {
      v = l.stateNode, jd(n, l), E = l.memoizedProps, H = l.type === l.elementType ? E : qt(l.type, E), v.props = H, b = l.pendingProps, J = v.context, O = u.contextType, typeof O == "object" && O !== null ? O = Dt(O) : (O = dt(u) ? Er : Je.current, O = qr(l, O));
      var pe = u.getDerivedStateFromProps;
      (K = typeof pe == "function" || typeof v.getSnapshotBeforeUpdate == "function") || typeof v.UNSAFE_componentWillReceiveProps != "function" && typeof v.componentWillReceiveProps != "function" || (E !== b || J !== O) && Vd(l, v, s, O), Xn = !1, J = l.memoizedState, v.state = J, wu(l, s, v, f);
      var Z = l.memoizedState;
      E !== b || J !== Z || ft.current || Xn ? (typeof pe == "function" && (bs(l, u, pe, s), Z = l.memoizedState), (H = Xn || Wd(l, u, H, s, J, Z, O) || !1) ? (K || typeof v.UNSAFE_componentWillUpdate != "function" && typeof v.componentWillUpdate != "function" || (typeof v.componentWillUpdate == "function" && v.componentWillUpdate(
        s,
        Z,
        O
      ), typeof v.UNSAFE_componentWillUpdate == "function" && v.UNSAFE_componentWillUpdate(s, Z, O)), typeof v.componentDidUpdate == "function" && (l.flags |= 4), typeof v.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof v.componentDidUpdate != "function" || E === n.memoizedProps && J === n.memoizedState || (l.flags |= 4), typeof v.getSnapshotBeforeUpdate != "function" || E === n.memoizedProps && J === n.memoizedState || (l.flags |= 1024), l.memoizedProps = s, l.memoizedState = Z), v.props = s, v.state = Z, v.context = O, s = H) : (typeof v.componentDidUpdate != "function" || E === n.memoizedProps && J === n.memoizedState || (l.flags |= 4), typeof v.getSnapshotBeforeUpdate != "function" || E === n.memoizedProps && J === n.memoizedState || (l.flags |= 1024), s = !1);
    }
    return wa(n, l, u, s, d, f);
  }
  function wa(n, l, u, s, f, d) {
    Np(n, l);
    var v = (l.flags & 128) !== 0;
    if (!s && !v) return f && Md(l, u, !1), Rn(n, l, d);
    s = l.stateNode, I0.current = l;
    var E = v && typeof u.getDerivedStateFromError != "function" ? null : s.render();
    return l.flags |= 1, n !== null && v ? (l.child = ll(l, n.child, null, d), l.child = ll(l, null, E, d)) : it(n, l, E, d), l.memoizedState = s.state, f && Md(l, u, !0), l.child;
  }
  function Lp(n) {
    var l = n.stateNode;
    l.pendingContext ? Td(n, l.pendingContext, l.pendingContext !== l.context) : l.context && Td(n, l.context, !1), ua(n, l.containerInfo);
  }
  function Tp(n, l, u, s, f) {
    return rl(), ia(f), l.flags |= 256, it(n, l, u, s), l.child;
  }
  var Iu = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Du(n) {
    return { baseLanes: n, cachePool: null };
  }
  function Op(n, l, u) {
    var s = l.pendingProps, f = Ee.current, d = !1, v = (l.flags & 128) !== 0, E;
    if ((E = v) || (E = n !== null && n.memoizedState === null ? !1 : (f & 2) !== 0), E ? (d = !0, l.flags &= -129) : (n === null || n.memoizedState !== null) && (f |= 1), me(Ee, f & 1), n === null)
      return la(l), n = l.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? (l.mode & 1 ? Fs(n) ? l.lanes = 8 : l.lanes = 1073741824 : l.lanes = 1, null) : (f = s.children, n = s.fallback, d ? (s = l.mode, d = l.child, f = { mode: "hidden", children: f }, !(s & 1) && d !== null ? (d.childLanes = 0, d.pendingProps = f) : d = to(f, s, 0, null), n = Or(n, s, u, null), d.return = l, n.return = l, d.sibling = n, l.child = d, l.child.memoizedState = Du(u), l.memoizedState = Iu, n) : Sa(l, f));
    if (f = n.memoizedState, f !== null) {
      if (E = f.dehydrated, E !== null) {
        if (v)
          return l.flags & 256 ? (l.flags &= -257, Fu(n, l, u, Error(c(422)))) : l.memoizedState !== null ? (l.child = n.child, l.flags |= 128, null) : (d = s.fallback, f = l.mode, s = to({ mode: "visible", children: s.children }, f, 0, null), d = Or(d, f, u, null), d.flags |= 2, s.return = l, d.return = l, s.sibling = d, l.child = s, l.mode & 1 && ll(
            l,
            n.child,
            null,
            u
          ), l.child.memoizedState = Du(u), l.memoizedState = Iu, d);
        if (!(l.mode & 1)) l = Fu(n, l, u, null);
        else if (Fs(E)) l = Fu(n, l, u, Error(c(419)));
        else if (s = (u & n.childLanes) !== 0, Pt || s) {
          if (s = Oe, s !== null) {
            switch (u & -u) {
              case 4:
                d = 2;
                break;
              case 16:
                d = 8;
                break;
              case 64:
              case 128:
              case 256:
              case 512:
              case 1024:
              case 2048:
              case 4096:
              case 8192:
              case 16384:
              case 32768:
              case 65536:
              case 131072:
              case 262144:
              case 524288:
              case 1048576:
              case 2097152:
              case 4194304:
              case 8388608:
              case 16777216:
              case 33554432:
              case 67108864:
                d = 32;
                break;
              case 536870912:
                d = 268435456;
                break;
              default:
                d = 0;
            }
            s = d & (s.suspendedLanes | u) ? 0 : d, s !== 0 && s !== f.retryLane && (f.retryLane = s, Ht(n, s, -1));
          }
          Ha(), l = Fu(n, l, u, Error(c(421)));
        } else Rd(E) ? (l.flags |= 128, l.child = n.child, l = K0.bind(null, n), Zy(E, l), l = null) : (u = f.treeContext, xt && (Ct = qy(E), Et = l, ke = !0, bt = null, ql = !1, u !== null && (Ft[At++] = _n, Ft[At++] = zn, Ft[At++] = Cr, _n = u.id, zn = u.overflow, Cr = l)), l = Sa(l, l.pendingProps.children), l.flags |= 4096);
        return l;
      }
      return d ? (s = Ip(n, l, s.children, s.fallback, u), d = l.child, f = n.child.memoizedState, d.memoizedState = f === null ? Du(u) : { baseLanes: f.baseLanes | u, cachePool: null }, d.childLanes = n.childLanes & ~u, l.memoizedState = Iu, s) : (u = Mp(n, l, s.children, u), l.memoizedState = null, u);
    }
    return d ? (s = Ip(n, l, s.children, s.fallback, u), d = l.child, f = n.child.memoizedState, d.memoizedState = f === null ? Du(u) : { baseLanes: f.baseLanes | u, cachePool: null }, d.childLanes = n.childLanes & ~u, l.memoizedState = Iu, s) : (u = Mp(n, l, s.children, u), l.memoizedState = null, u);
  }
  function Sa(n, l) {
    return l = to({ mode: "visible", children: l }, n.mode, 0, null), l.return = n, n.child = l;
  }
  function Mp(n, l, u, s) {
    var f = n.child;
    return n = f.sibling, u = qn(f, { mode: "visible", children: u }), !(l.mode & 1) && (u.lanes = s), u.return = l, u.sibling = null, n !== null && (s = l.deletions, s === null ? (l.deletions = [n], l.flags |= 16) : s.push(n)), l.child = u;
  }
  function Ip(n, l, u, s, f) {
    var d = l.mode;
    n = n.child;
    var v = n.sibling, E = { mode: "hidden", children: u };
    return !(d & 1) && l.child !== n ? (u = l.child, u.childLanes = 0, u.pendingProps = E, l.deletions = null) : (u = qn(n, E), u.subtreeFlags = n.subtreeFlags & 14680064), v !== null ? s = qn(v, s) : (s = Or(s, d, f, null), s.flags |= 2), s.return = l, u.return = l, u.sibling = s, l.child = u, s;
  }
  function Fu(n, l, u, s) {
    return s !== null && ia(s), ll(l, n.child, null, u), n = Sa(l, l.pendingProps.children), n.flags |= 2, l.memoizedState = null, n;
  }
  function Dp(n, l, u) {
    n.lanes |= l;
    var s = n.alternate;
    s !== null && (s.lanes |= l), $s(n.return, l, u);
  }
  function ka(n, l, u, s, f) {
    var d = n.memoizedState;
    d === null ? n.memoizedState = { isBackwards: l, rendering: null, renderingStartTime: 0, last: s, tail: u, tailMode: f } : (d.isBackwards = l, d.rendering = null, d.renderingStartTime = 0, d.last = s, d.tail = u, d.tailMode = f);
  }
  function Fp(n, l, u) {
    var s = l.pendingProps, f = s.revealOrder, d = s.tail;
    if (it(n, l, s.children, u), s = Ee.current, s & 2) s = s & 1 | 2, l.flags |= 128;
    else {
      if (n !== null && n.flags & 128) e: for (n = l.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && Dp(n, u, l);
        else if (n.tag === 19) Dp(n, u, l);
        else if (n.child !== null) {
          n.child.return = n, n = n.child;
          continue;
        }
        if (n === l) break e;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === l) break e;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
      s &= 1;
    }
    if (me(Ee, s), !(l.mode & 1)) l.memoizedState = null;
    else switch (f) {
      case "forwards":
        for (u = l.child, f = null; u !== null; ) n = u.alternate, n !== null && Cu(n) === null && (f = u), u = u.sibling;
        u = f, u === null ? (f = l.child, l.child = null) : (f = u.sibling, u.sibling = null), ka(l, !1, f, u, d);
        break;
      case "backwards":
        for (u = null, f = l.child, l.child = null; f !== null; ) {
          if (n = f.alternate, n !== null && Cu(n) === null) {
            l.child = f;
            break;
          }
          n = f.sibling, f.sibling = u, u = f, f = n;
        }
        ka(l, !0, u, null, d);
        break;
      case "together":
        ka(l, !1, null, null, void 0);
        break;
      default:
        l.memoizedState = null;
    }
    return l.child;
  }
  function Rn(n, l, u) {
    if (n !== null && (l.dependencies = n.dependencies), al |= l.lanes, !(u & l.childLanes)) return null;
    if (n !== null && l.child !== n.child) throw Error(c(153));
    if (l.child !== null) {
      for (n = l.child, u = qn(n, n.pendingProps), l.child = u, u.return = l; n.sibling !== null; ) n = n.sibling, u = u.sibling = qn(n, n.pendingProps), u.return = l;
      u.sibling = null;
    }
    return l.child;
  }
  function D0(n, l, u) {
    switch (l.tag) {
      case 3:
        Lp(l), rl();
        break;
      case 5:
        qd(l);
        break;
      case 1:
        dt(l.type) && au(l);
        break;
      case 4:
        ua(l, l.stateNode.containerInfo);
        break;
      case 10:
        Ad(l, l.type._context, l.memoizedProps.value);
        break;
      case 13:
        var s = l.memoizedState;
        if (s !== null)
          return s.dehydrated !== null ? (me(Ee, Ee.current & 1), l.flags |= 128, null) : u & l.child.childLanes ? Op(n, l, u) : (me(Ee, Ee.current & 1), n = Rn(n, l, u), n !== null ? n.sibling : null);
        me(Ee, Ee.current & 1);
        break;
      case 19:
        if (s = (u & l.childLanes) !== 0, n.flags & 128) {
          if (s) return Fp(
            n,
            l,
            u
          );
          l.flags |= 128;
        }
        var f = l.memoizedState;
        if (f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), me(Ee, Ee.current), s) break;
        return null;
      case 22:
      case 23:
        return l.lanes = 0, zp(n, l, u);
    }
    return Rn(n, l, u);
  }
  function F0(n, l) {
    switch (na(l), l.tag) {
      case 1:
        return dt(l.type) && su(), n = l.flags, n & 65536 ? (l.flags = n & -65537 | 128, l) : null;
      case 3:
        return ul(), ve(ft), ve(Je), aa(), n = l.flags, n & 65536 && !(n & 128) ? (l.flags = n & -65537 | 128, l) : null;
      case 5:
        return oa(l), null;
      case 13:
        if (ve(Ee), n = l.memoizedState, n !== null && n.dehydrated !== null) {
          if (l.alternate === null) throw Error(c(340));
          rl();
        }
        return n = l.flags, n & 65536 ? (l.flags = n & -65537 | 128, l) : null;
      case 19:
        return ve(Ee), null;
      case 4:
        return ul(), null;
      case 10:
        return Js(l.type._context), null;
      case 22:
      case 23:
        return Ua(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Au = !1, zr = !1, A0 = typeof WeakSet == "function" ? WeakSet : Set, W = null;
  function ju(n, l) {
    var u = n.ref;
    if (u !== null) if (typeof u == "function") try {
      u(null);
    } catch (s) {
      ht(n, l, s);
    }
    else u.current = null;
  }
  function xa(n, l, u) {
    try {
      u();
    } catch (s) {
      ht(n, l, s);
    }
  }
  var Ap = !1;
  function j0(n, l) {
    for (A(n.containerInfo), W = l; W !== null; ) if (n = W, l = n.child, (n.subtreeFlags & 1028) !== 0 && l !== null) l.return = n, W = l;
    else for (; W !== null; ) {
      n = W;
      try {
        var u = n.alternate;
        if (n.flags & 1024) switch (n.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (u !== null) {
              var s = u.memoizedProps, f = u.memoizedState, d = n.stateNode, v = d.getSnapshotBeforeUpdate(n.elementType === n.type ? s : qt(n.type, s), f);
              d.__reactInternalSnapshotBeforeUpdate = v;
            }
            break;
          case 3:
            Jt && Qy(n.stateNode.containerInfo);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(c(163));
        }
      } catch (E) {
        ht(n, n.return, E);
      }
      if (l = n.sibling, l !== null) {
        l.return = n.return, W = l;
        break;
      }
      W = n.return;
    }
    return u = Ap, Ap = !1, u;
  }
  function Nr(n, l, u) {
    var s = l.updateQueue;
    if (s = s !== null ? s.lastEffect : null, s !== null) {
      var f = s = s.next;
      do {
        if ((f.tag & n) === n) {
          var d = f.destroy;
          f.destroy = void 0, d !== void 0 && xa(l, u, d);
        }
        f = f.next;
      } while (f !== s);
    }
  }
  function ci(n, l) {
    if (l = l.updateQueue, l = l !== null ? l.lastEffect : null, l !== null) {
      var u = l = l.next;
      do {
        if ((u.tag & n) === n) {
          var s = u.create;
          u.destroy = s();
        }
        u = u.next;
      } while (u !== l);
    }
  }
  function Ea(n) {
    var l = n.ref;
    if (l !== null) {
      var u = n.stateNode;
      switch (n.tag) {
        case 5:
          n = fe(u);
          break;
        default:
          n = u;
      }
      typeof l == "function" ? l(n) : l.current = n;
    }
  }
  function jp(n, l, u) {
    if (sn && typeof sn.onCommitFiberUnmount == "function") try {
      sn.onCommitFiberUnmount(pu, l);
    } catch {
    }
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (n = l.updateQueue, n !== null && (n = n.lastEffect, n !== null)) {
          var s = n = n.next;
          do {
            var f = s, d = f.destroy;
            f = f.tag, d !== void 0 && (f & 2 || f & 4) && xa(l, u, d), s = s.next;
          } while (s !== n);
        }
        break;
      case 1:
        if (ju(l, u), n = l.stateNode, typeof n.componentWillUnmount == "function") try {
          n.props = l.memoizedProps, n.state = l.memoizedState, n.componentWillUnmount();
        } catch (v) {
          ht(
            l,
            u,
            v
          );
        }
        break;
      case 5:
        ju(l, u);
        break;
      case 4:
        Jt ? Vp(n, l, u) : ou && ou && (l = l.stateNode.containerInfo, u = Cd(l), _d(l, u));
    }
  }
  function Up(n, l, u) {
    for (var s = l; ; ) if (jp(n, s, u), s.child === null || Jt && s.tag === 4) {
      if (s === l) break;
      for (; s.sibling === null; ) {
        if (s.return === null || s.return === l) return;
        s = s.return;
      }
      s.sibling.return = s.return, s = s.sibling;
    } else s.child.return = s, s = s.child;
  }
  function Hp(n) {
    var l = n.alternate;
    l !== null && (n.alternate = null, Hp(l)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (l = n.stateNode, l !== null && ky(l)), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function Bp(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function Wp(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || Bp(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function Qp(n) {
    if (Jt) {
      e: {
        for (var l = n.return; l !== null; ) {
          if (Bp(l)) break e;
          l = l.return;
        }
        throw Error(c(160));
      }
      var u = l;
      switch (u.tag) {
        case 5:
          l = u.stateNode, u.flags & 32 && (Ed(l), u.flags &= -33), u = Wp(n), Pa(n, u, l);
          break;
        case 3:
        case 4:
          l = u.stateNode.containerInfo, u = Wp(n), Ca(n, u, l);
          break;
        default:
          throw Error(c(161));
      }
    }
  }
  function Ca(n, l, u) {
    var s = n.tag;
    if (s === 5 || s === 6) n = n.stateNode, l ? Fy(u, n, l) : Ty(u, n);
    else if (s !== 4 && (n = n.child, n !== null)) for (Ca(n, l, u), n = n.sibling; n !== null; ) Ca(n, l, u), n = n.sibling;
  }
  function Pa(n, l, u) {
    var s = n.tag;
    if (s === 5 || s === 6) n = n.stateNode, l ? Dy(u, n, l) : Ly(u, n);
    else if (s !== 4 && (n = n.child, n !== null)) for (Pa(n, l, u), n = n.sibling; n !== null; ) Pa(n, l, u), n = n.sibling;
  }
  function Vp(n, l, u) {
    for (var s = l, f = !1, d, v; ; ) {
      if (!f) {
        f = s.return;
        e: for (; ; ) {
          if (f === null) throw Error(c(160));
          switch (d = f.stateNode, f.tag) {
            case 5:
              v = !1;
              break e;
            case 3:
              d = d.containerInfo, v = !0;
              break e;
            case 4:
              d = d.containerInfo, v = !0;
              break e;
          }
          f = f.return;
        }
        f = !0;
      }
      if (s.tag === 5 || s.tag === 6) Up(n, s, u), v ? jy(d, s.stateNode) : Ay(d, s.stateNode);
      else if (s.tag === 18) v ? i0(d, s.stateNode) : l0(d, s.stateNode);
      else if (s.tag === 4) {
        if (s.child !== null) {
          d = s.stateNode.containerInfo, v = !0, s.child.return = s, s = s.child;
          continue;
        }
      } else if (jp(n, s, u), s.child !== null) {
        s.child.return = s, s = s.child;
        continue;
      }
      if (s === l) break;
      for (; s.sibling === null; ) {
        if (s.return === null || s.return === l) return;
        s = s.return, s.tag === 4 && (f = !1);
      }
      s.sibling.return = s.return, s = s.sibling;
    }
  }
  function _a(n, l) {
    if (Jt) {
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Nr(3, l, l.return), ci(3, l), Nr(5, l, l.return);
          return;
        case 1:
          return;
        case 5:
          var u = l.stateNode;
          if (u != null) {
            var s = l.memoizedProps;
            n = n !== null ? n.memoizedProps : s;
            var f = l.type, d = l.updateQueue;
            l.updateQueue = null, d !== null && Iy(u, d, f, n, s, l);
          }
          return;
        case 6:
          if (l.stateNode === null) throw Error(c(162));
          u = l.memoizedProps, Oy(l.stateNode, n !== null ? n.memoizedProps : u, u);
          return;
        case 3:
          xt && n !== null && n.memoizedState.isDehydrated && Ld(l.stateNode.containerInfo);
          return;
        case 12:
          return;
        case 13:
          Uu(l);
          return;
        case 19:
          Uu(l);
          return;
        case 17:
          return;
      }
      throw Error(c(163));
    }
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Nr(3, l, l.return), ci(3, l), Nr(5, l, l.return);
        return;
      case 12:
        return;
      case 13:
        Uu(l);
        return;
      case 19:
        Uu(l);
        return;
      case 3:
        xt && n !== null && n.memoizedState.isDehydrated && Ld(l.stateNode.containerInfo);
        break;
      case 22:
      case 23:
        return;
    }
    e: if (ou) {
      switch (l.tag) {
        case 1:
        case 5:
        case 6:
          break e;
        case 3:
        case 4:
          l = l.stateNode, _d(l.containerInfo, l.pendingChildren);
          break e;
      }
      throw Error(c(163));
    }
  }
  function Uu(n) {
    var l = n.updateQueue;
    if (l !== null) {
      n.updateQueue = null;
      var u = n.stateNode;
      u === null && (u = n.stateNode = new A0()), l.forEach(function(s) {
        var f = G0.bind(null, n, s);
        u.has(s) || (u.add(s), s.then(f, f));
      });
    }
  }
  function U0(n, l) {
    for (W = l; W !== null; ) {
      l = W;
      var u = l.deletions;
      if (u !== null) for (var s = 0; s < u.length; s++) {
        var f = u[s];
        try {
          var d = n;
          Jt ? Vp(d, f, l) : Up(d, f, l);
          var v = f.alternate;
          v !== null && (v.return = null), f.return = null;
        } catch (G) {
          ht(f, l, G);
        }
      }
      if (u = l.child, l.subtreeFlags & 12854 && u !== null) u.return = l, W = u;
      else for (; W !== null; ) {
        l = W;
        try {
          var E = l.flags;
          if (E & 32 && Jt && Ed(l.stateNode), E & 512) {
            var O = l.alternate;
            if (O !== null) {
              var H = O.ref;
              H !== null && (typeof H == "function" ? H(null) : H.current = null);
            }
          }
          if (E & 8192) switch (l.tag) {
            case 13:
              if (l.memoizedState !== null) {
                var K = l.alternate;
                (K === null || K.memoizedState === null) && (Ma = Be());
              }
              break;
            case 22:
              var b = l.memoizedState !== null, J = l.alternate, pe = J !== null && J.memoizedState !== null;
              if (u = l, Jt) {
                e: if (s = u, f = b, d = null, Jt) for (var Z = s; ; ) {
                  if (Z.tag === 5) {
                    if (d === null) {
                      d = Z;
                      var et = Z.stateNode;
                      f ? Uy(et) : By(Z.stateNode, Z.memoizedProps);
                    }
                  } else if (Z.tag === 6) {
                    if (d === null) {
                      var Wt = Z.stateNode;
                      f ? Hy(Wt) : Wy(Wt, Z.memoizedProps);
                    }
                  } else if ((Z.tag !== 22 && Z.tag !== 23 || Z.memoizedState === null || Z === s) && Z.child !== null) {
                    Z.child.return = Z, Z = Z.child;
                    continue;
                  }
                  if (Z === s) break;
                  for (; Z.sibling === null; ) {
                    if (Z.return === null || Z.return === s) break e;
                    d === Z && (d = null), Z = Z.return;
                  }
                  d === Z && (d = null), Z.sibling.return = Z.return, Z = Z.sibling;
                }
              }
              if (b && !pe && u.mode & 1) {
                W = u;
                for (var R = u.child; R !== null; ) {
                  for (u = W = R; W !== null; ) {
                    s = W;
                    var C = s.child;
                    switch (s.tag) {
                      case 0:
                      case 11:
                      case 14:
                      case 15:
                        Nr(4, s, s.return);
                        break;
                      case 1:
                        ju(s, s.return);
                        var T = s.stateNode;
                        if (typeof T.componentWillUnmount == "function") {
                          var Q = s.return;
                          try {
                            T.props = s.memoizedProps, T.state = s.memoizedState, T.componentWillUnmount();
                          } catch (G) {
                            ht(
                              s,
                              Q,
                              G
                            );
                          }
                        }
                        break;
                      case 5:
                        ju(s, s.return);
                        break;
                      case 22:
                        if (s.memoizedState !== null) {
                          Kp(u);
                          continue;
                        }
                    }
                    C !== null ? (C.return = s, W = C) : Kp(u);
                  }
                  R = R.sibling;
                }
              }
          }
          switch (E & 4102) {
            case 2:
              Qp(l), l.flags &= -3;
              break;
            case 6:
              Qp(l), l.flags &= -3, _a(l.alternate, l);
              break;
            case 4096:
              l.flags &= -4097;
              break;
            case 4100:
              l.flags &= -4097, _a(l.alternate, l);
              break;
            case 4:
              _a(l.alternate, l);
          }
        } catch (G) {
          ht(l, l.return, G);
        }
        if (u = l.sibling, u !== null) {
          u.return = l.return, W = u;
          break;
        }
        W = l.return;
      }
    }
  }
  function H0(n, l, u) {
    W = n, Yp(n);
  }
  function Yp(n, l, u) {
    for (var s = (n.mode & 1) !== 0; W !== null; ) {
      var f = W, d = f.child;
      if (f.tag === 22 && s) {
        var v = f.memoizedState !== null || Au;
        if (!v) {
          var E = f.alternate, O = E !== null && E.memoizedState !== null || zr;
          E = Au;
          var H = zr;
          if (Au = v, (zr = O) && !H) for (W = f; W !== null; ) v = W, O = v.child, v.tag === 22 && v.memoizedState !== null ? Gp(f) : O !== null ? (O.return = v, W = O) : Gp(f);
          for (; d !== null; ) W = d, Yp(d), d = d.sibling;
          W = f, Au = E, zr = H;
        }
        Xp(n);
      } else f.subtreeFlags & 8772 && d !== null ? (d.return = f, W = d) : Xp(n);
    }
  }
  function Xp(n) {
    for (; W !== null; ) {
      var l = W;
      if (l.flags & 8772) {
        var u = l.alternate;
        try {
          if (l.flags & 8772) switch (l.tag) {
            case 0:
            case 11:
            case 15:
              zr || ci(5, l);
              break;
            case 1:
              var s = l.stateNode;
              if (l.flags & 4 && !zr) if (u === null) s.componentDidMount();
              else {
                var f = l.elementType === l.type ? u.memoizedProps : qt(l.type, u.memoizedProps);
                s.componentDidUpdate(f, u.memoizedState, s.__reactInternalSnapshotBeforeUpdate);
              }
              var d = l.updateQueue;
              d !== null && Hd(l, d, s);
              break;
            case 3:
              var v = l.updateQueue;
              if (v !== null) {
                if (u = null, l.child !== null) switch (l.child.tag) {
                  case 5:
                    u = fe(l.child.stateNode);
                    break;
                  case 1:
                    u = l.child.stateNode;
                }
                Hd(l, v, u);
              }
              break;
            case 5:
              var E = l.stateNode;
              u === null && l.flags & 4 && My(E, l.type, l.memoizedProps, l);
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (xt && l.memoizedState === null) {
                var O = l.alternate;
                if (O !== null) {
                  var H = O.memoizedState;
                  if (H !== null) {
                    var K = H.dehydrated;
                    K !== null && r0(K);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
              break;
            default:
              throw Error(c(163));
          }
          zr || l.flags & 512 && Ea(l);
        } catch (b) {
          ht(l, l.return, b);
        }
      }
      if (l === n) {
        W = null;
        break;
      }
      if (u = l.sibling, u !== null) {
        u.return = l.return, W = u;
        break;
      }
      W = l.return;
    }
  }
  function Kp(n) {
    for (; W !== null; ) {
      var l = W;
      if (l === n) {
        W = null;
        break;
      }
      var u = l.sibling;
      if (u !== null) {
        u.return = l.return, W = u;
        break;
      }
      W = l.return;
    }
  }
  function Gp(n) {
    for (; W !== null; ) {
      var l = W;
      try {
        switch (l.tag) {
          case 0:
          case 11:
          case 15:
            var u = l.return;
            try {
              ci(4, l);
            } catch (O) {
              ht(l, u, O);
            }
            break;
          case 1:
            var s = l.stateNode;
            if (typeof s.componentDidMount == "function") {
              var f = l.return;
              try {
                s.componentDidMount();
              } catch (O) {
                ht(l, f, O);
              }
            }
            var d = l.return;
            try {
              Ea(l);
            } catch (O) {
              ht(l, d, O);
            }
            break;
          case 5:
            var v = l.return;
            try {
              Ea(l);
            } catch (O) {
              ht(l, v, O);
            }
        }
      } catch (O) {
        ht(l, l.return, O);
      }
      if (l === n) {
        W = null;
        break;
      }
      var E = l.sibling;
      if (E !== null) {
        E.return = l.return, W = E;
        break;
      }
      W = l.return;
    }
  }
  var Hu = 0, Bu = 1, Wu = 2, Qu = 3, Vu = 4;
  if (typeof Symbol == "function" && Symbol.for) {
    var fi = Symbol.for;
    Hu = fi("selector.component"), Bu = fi("selector.has_pseudo_class"), Wu = fi("selector.role"), Qu = fi("selector.test_id"), Vu = fi("selector.text");
  }
  function za(n) {
    var l = yy(n);
    if (l != null) {
      if (typeof l.memoizedProps["data-testname"] != "string") throw Error(c(364));
      return l;
    }
    if (n = Cy(n), n === null) throw Error(c(362));
    return n.stateNode.current;
  }
  function Na(n, l) {
    switch (l.$$typeof) {
      case Hu:
        if (n.type === l.value) return !0;
        break;
      case Bu:
        e: {
          l = l.value, n = [n, 0];
          for (var u = 0; u < n.length; ) {
            var s = n[u++], f = n[u++], d = l[f];
            if (s.tag !== 5 || !Kl(s)) {
              for (; d != null && Na(s, d); ) f++, d = l[f];
              if (f === l.length) {
                l = !0;
                break e;
              } else for (s = s.child; s !== null; ) n.push(s, f), s = s.sibling;
            }
          }
          l = !1;
        }
        return l;
      case Wu:
        if (n.tag === 5 && zy(n.stateNode, l.value)) return !0;
        break;
      case Vu:
        if ((n.tag === 5 || n.tag === 6) && (n = _y(n), n !== null && 0 <= n.indexOf(l.value))) return !0;
        break;
      case Qu:
        if (n.tag === 5 && (n = n.memoizedProps["data-testname"], typeof n == "string" && n.toLowerCase() === l.value.toLowerCase())) return !0;
        break;
      default:
        throw Error(c(365));
    }
    return !1;
  }
  function Ra(n) {
    switch (n.$$typeof) {
      case Hu:
        return "<" + (D(n.value) || "Unknown") + ">";
      case Bu:
        return ":has(" + (Ra(n) || "") + ")";
      case Wu:
        return '[role="' + n.value + '"]';
      case Vu:
        return '"' + n.value + '"';
      case Qu:
        return '[data-testname="' + n.value + '"]';
      default:
        throw Error(c(365));
    }
  }
  function Zp(n, l) {
    var u = [];
    n = [n, 0];
    for (var s = 0; s < n.length; ) {
      var f = n[s++], d = n[s++], v = l[d];
      if (f.tag !== 5 || !Kl(f)) {
        for (; v != null && Na(f, v); ) d++, v = l[d];
        if (d === l.length) u.push(f);
        else for (f = f.child; f !== null; ) n.push(f, d), f = f.sibling;
      }
    }
    return u;
  }
  function La(n, l) {
    if (!Xl) throw Error(c(363));
    n = za(n), n = Zp(n, l), l = [], n = Array.from(n);
    for (var u = 0; u < n.length; ) {
      var s = n[u++];
      if (s.tag === 5) Kl(s) || l.push(s.stateNode);
      else for (s = s.child; s !== null; ) n.push(s), s = s.sibling;
    }
    return l;
  }
  var B0 = Math.ceil, Yu = p.ReactCurrentDispatcher, Ta = p.ReactCurrentOwner, Re = p.ReactCurrentBatchConfig, re = 0, Oe = null, Me = null, Xe = 0, _t = 0, sl = Vn(0), Fe = 0, di = null, al = 0, Xu = 0, Oa = 0, pi = null, pt = null, Ma = 0, Ia = 1 / 0;
  function cl() {
    Ia = Be() + 500;
  }
  var Ku = !1, Da = null, Gn = null, Gu = !1, Zn = null, Zu = 0, mi = 0, Fa = null, Ju = -1, $u = 0;
  function ut() {
    return re & 6 ? Be() : Ju !== -1 ? Ju : Ju = Be();
  }
  function Jn(n) {
    return n.mode & 1 ? re & 2 && Xe !== 0 ? Xe & -Xe : E0.transition !== null ? ($u === 0 && (n = cu, cu <<= 1, !(cu & 4194240) && (cu = 64), $u = n), $u) : (n = oe, n !== 0 ? n : Sy()) : 1;
  }
  function Ht(n, l, u) {
    if (50 < mi) throw mi = 0, Fa = null, Error(c(185));
    var s = qu(n, l);
    return s === null ? null : ($l(s, l, u), (!(re & 2) || s !== Oe) && (s === Oe && (!(re & 2) && (Xu |= l), Fe === 4 && $n(s, Xe)), mt(s, u), l === 1 && re === 0 && !(n.mode & 1) && (cl(), mu && cn())), s);
  }
  function qu(n, l) {
    n.lanes |= l;
    var u = n.alternate;
    for (u !== null && (u.lanes |= l), u = n, n = n.return; n !== null; ) n.childLanes |= l, u = n.alternate, u !== null && (u.childLanes |= l), u = n, n = n.return;
    return u.tag === 3 ? u.stateNode : null;
  }
  function mt(n, l) {
    var u = n.callbackNode;
    m0(n, l);
    var s = du(n, n === Oe ? Xe : 0);
    if (s === 0) u !== null && Dd(u), n.callbackNode = null, n.callbackPriority = 0;
    else if (l = s & -s, n.callbackPriority !== l) {
      if (u != null && Dd(u), l === 1) n.tag === 0 ? x0($p.bind(null, n)) : Fd($p.bind(null, n)), xy ? Ey(function() {
        re === 0 && cn();
      }) : Vs(Ys, cn), u = null;
      else {
        switch (Id(s)) {
          case 1:
            u = Ys;
            break;
          case 4:
            u = y0;
            break;
          case 16:
            u = Xs;
            break;
          case 536870912:
            u = w0;
            break;
          default:
            u = Xs;
        }
        u = um(u, Jp.bind(null, n));
      }
      n.callbackPriority = l, n.callbackNode = u;
    }
  }
  function Jp(n, l) {
    if (Ju = -1, $u = 0, re & 6) throw Error(c(327));
    var u = n.callbackNode;
    if (Tr() && n.callbackNode !== u) return null;
    var s = du(n, n === Oe ? Xe : 0);
    if (s === 0) return null;
    if (s & 30 || s & n.expiredLanes || l) l = bu(n, s);
    else {
      l = s;
      var f = re;
      re |= 2;
      var d = em();
      (Oe !== n || Xe !== l) && (cl(), Rr(n, l));
      do
        try {
          V0();
          break;
        } catch (E) {
          bp(n, E);
        }
      while (!0);
      Zs(), Yu.current = d, re = f, Me !== null ? l = 0 : (Oe = null, Xe = 0, l = Fe);
    }
    if (l !== 0) {
      if (l === 2 && (f = Bs(n), f !== 0 && (s = f, l = Aa(n, f))), l === 1) throw u = di, Rr(n, 0), $n(n, s), mt(n, Be()), u;
      if (l === 6) $n(n, s);
      else {
        if (f = n.current.alternate, !(s & 30) && !W0(f) && (l = bu(n, s), l === 2 && (d = Bs(n), d !== 0 && (s = d, l = Aa(n, d))), l === 1)) throw u = di, Rr(n, 0), $n(n, s), mt(n, Be()), u;
        switch (n.finishedWork = f, n.finishedLanes = s, l) {
          case 0:
          case 1:
            throw Error(c(345));
          case 2:
            Lr(n, pt);
            break;
          case 3:
            if ($n(n, s), (s & 130023424) === s && (l = Ma + 500 - Be(), 10 < l)) {
              if (du(n, 0) !== 0) break;
              if (f = n.suspendedLanes, (f & s) !== s) {
                ut(), n.pingedLanes |= n.suspendedLanes & f;
                break;
              }
              n.timeoutHandle = It(Lr.bind(null, n, pt), l);
              break;
            }
            Lr(n, pt);
            break;
          case 4:
            if ($n(n, s), (s & 4194240) === s) break;
            for (l = n.eventTimes, f = -1; 0 < s; ) {
              var v = 31 - $t(s);
              d = 1 << v, v = l[v], v > f && (f = v), s &= ~d;
            }
            if (s = f, s = Be() - s, s = (120 > s ? 120 : 480 > s ? 480 : 1080 > s ? 1080 : 1920 > s ? 1920 : 3e3 > s ? 3e3 : 4320 > s ? 4320 : 1960 * B0(s / 1960)) - s, 10 < s) {
              n.timeoutHandle = It(Lr.bind(null, n, pt), s);
              break;
            }
            Lr(n, pt);
            break;
          case 5:
            Lr(n, pt);
            break;
          default:
            throw Error(c(329));
        }
      }
    }
    return mt(n, Be()), n.callbackNode === u ? Jp.bind(null, n) : null;
  }
  function Aa(n, l) {
    var u = pi;
    return n.current.memoizedState.isDehydrated && (Rr(n, l).flags |= 256), n = bu(n, l), n !== 2 && (l = pt, pt = u, l !== null && ja(l)), n;
  }
  function ja(n) {
    pt === null ? pt = n : pt.push.apply(pt, n);
  }
  function W0(n) {
    for (var l = n; ; ) {
      if (l.flags & 16384) {
        var u = l.updateQueue;
        if (u !== null && (u = u.stores, u !== null)) for (var s = 0; s < u.length; s++) {
          var f = u[s], d = f.getSnapshot;
          f = f.value;
          try {
            if (!an(d(), f)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (u = l.child, l.subtreeFlags & 16384 && u !== null) u.return = l, l = u;
      else {
        if (l === n) break;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === n) return !0;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    }
    return !0;
  }
  function $n(n, l) {
    for (l &= ~Oa, l &= ~Xu, n.suspendedLanes |= l, n.pingedLanes &= ~l, n = n.expirationTimes; 0 < l; ) {
      var u = 31 - $t(l), s = 1 << u;
      n[u] = -1, l &= ~s;
    }
  }
  function $p(n) {
    if (re & 6) throw Error(c(327));
    Tr();
    var l = du(n, 0);
    if (!(l & 1)) return mt(n, Be()), null;
    var u = bu(n, l);
    if (n.tag !== 0 && u === 2) {
      var s = Bs(n);
      s !== 0 && (l = s, u = Aa(n, s));
    }
    if (u === 1) throw u = di, Rr(n, 0), $n(n, l), mt(n, Be()), u;
    if (u === 6) throw Error(c(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = l, Lr(n, pt), mt(n, Be()), null;
  }
  function qp(n) {
    Zn !== null && Zn.tag === 0 && !(re & 6) && Tr();
    var l = re;
    re |= 1;
    var u = Re.transition, s = oe;
    try {
      if (Re.transition = null, oe = 1, n) return n();
    } finally {
      oe = s, Re.transition = u, re = l, !(re & 6) && cn();
    }
  }
  function Ua() {
    _t = sl.current, ve(sl);
  }
  function Rr(n, l) {
    n.finishedWork = null, n.finishedLanes = 0;
    var u = n.timeoutHandle;
    if (u !== Ds && (n.timeoutHandle = Ds, gy(u)), Me !== null) for (u = Me.return; u !== null; ) {
      var s = u;
      switch (na(s), s.tag) {
        case 1:
          s = s.type.childContextTypes, s != null && su();
          break;
        case 3:
          ul(), ve(ft), ve(Je), aa();
          break;
        case 5:
          oa(s);
          break;
        case 4:
          ul();
          break;
        case 13:
          ve(Ee);
          break;
        case 19:
          ve(Ee);
          break;
        case 10:
          Js(s.type._context);
          break;
        case 22:
        case 23:
          Ua();
      }
      u = u.return;
    }
    if (Oe = n, Me = n = qn(n.current, null), Xe = _t = l, Fe = 0, di = null, Oa = Xu = al = 0, pt = pi = null, fn !== null) {
      for (l = 0; l < fn.length; l++) if (u = fn[l], s = u.interleaved, s !== null) {
        u.interleaved = null;
        var f = s.next, d = u.pending;
        if (d !== null) {
          var v = d.next;
          d.next = f, s.next = v;
        }
        u.pending = s;
      }
      fn = null;
    }
    return n;
  }
  function bp(n, l) {
    do {
      var u = Me;
      try {
        if (Zs(), Pu.current = Tu, _u) {
          for (var s = ze.memoizedState; s !== null; ) {
            var f = s.queue;
            f !== null && (f.pending = null), s = s.next;
          }
          _u = !1;
        }
        if (ol = 0, We = $e = ze = null, ri = !1, li = 0, Ta.current = null, u === null || u.return === null) {
          Fe = 1, di = l, Me = null;
          break;
        }
        e: {
          var d = n, v = u.return, E = u, O = l;
          if (l = Xe, E.flags |= 32768, O !== null && typeof O == "object" && typeof O.then == "function") {
            var H = O, K = E, b = K.tag;
            if (!(K.mode & 1) && (b === 0 || b === 11 || b === 15)) {
              var J = K.alternate;
              J ? (K.updateQueue = J.updateQueue, K.memoizedState = J.memoizedState, K.lanes = J.lanes) : (K.updateQueue = null, K.memoizedState = null);
            }
            var pe = Sp(v);
            if (pe !== null) {
              pe.flags &= -257, kp(pe, v, E, d, l), pe.mode & 1 && wp(d, H, l), l = pe, O = H;
              var Z = l.updateQueue;
              if (Z === null) {
                var et = /* @__PURE__ */ new Set();
                et.add(O), l.updateQueue = et;
              } else Z.add(O);
              break e;
            } else {
              if (!(l & 1)) {
                wp(d, H, l), Ha();
                break e;
              }
              O = Error(c(426));
            }
          } else if (ke && E.mode & 1) {
            var Wt = Sp(v);
            if (Wt !== null) {
              !(Wt.flags & 65536) && (Wt.flags |= 256), kp(Wt, v, E, d, l), ia(O);
              break e;
            }
          }
          d = O, Fe !== 4 && (Fe = 2), pi === null ? pi = [d] : pi.push(d), O = va(O, E), E = v;
          do {
            switch (E.tag) {
              case 3:
                E.flags |= 65536, l &= -l, E.lanes |= l;
                var R = gp(E, O, l);
                Ud(E, R);
                break e;
              case 1:
                d = O;
                var C = E.type, T = E.stateNode;
                if (!(E.flags & 128) && (typeof C.getDerivedStateFromError == "function" || T !== null && typeof T.componentDidCatch == "function" && (Gn === null || !Gn.has(T)))) {
                  E.flags |= 65536, l &= -l, E.lanes |= l;
                  var Q = yp(E, d, l);
                  Ud(E, Q);
                  break e;
                }
            }
            E = E.return;
          } while (E !== null);
        }
        nm(u);
      } catch (G) {
        l = G, Me === u && u !== null && (Me = u = u.return);
        continue;
      }
      break;
    } while (!0);
  }
  function em() {
    var n = Yu.current;
    return Yu.current = Tu, n === null ? Tu : n;
  }
  function Ha() {
    (Fe === 0 || Fe === 3 || Fe === 2) && (Fe = 4), Oe === null || !(al & 268435455) && !(Xu & 268435455) || $n(Oe, Xe);
  }
  function bu(n, l) {
    var u = re;
    re |= 2;
    var s = em();
    Oe === n && Xe === l || Rr(n, l);
    do
      try {
        Q0();
        break;
      } catch (f) {
        bp(n, f);
      }
    while (!0);
    if (Zs(), re = u, Yu.current = s, Me !== null) throw Error(c(261));
    return Oe = null, Xe = 0, Fe;
  }
  function Q0() {
    for (; Me !== null; ) tm(Me);
  }
  function V0() {
    for (; Me !== null && !v0(); ) tm(Me);
  }
  function tm(n) {
    var l = im(n.alternate, n, _t);
    n.memoizedProps = n.pendingProps, l === null ? nm(n) : Me = l, Ta.current = null;
  }
  function nm(n) {
    var l = n;
    do {
      var u = l.alternate;
      if (n = l.return, l.flags & 32768) {
        if (u = F0(u, l), u !== null) {
          u.flags &= 32767, Me = u;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          Fe = 6, Me = null;
          return;
        }
      } else if (u = M0(u, l, _t), u !== null) {
        Me = u;
        return;
      }
      if (l = l.sibling, l !== null) {
        Me = l;
        return;
      }
      Me = l = n;
    } while (l !== null);
    Fe === 0 && (Fe = 5);
  }
  function Lr(n, l) {
    var u = oe, s = Re.transition;
    try {
      Re.transition = null, oe = 1, Y0(n, l, u);
    } finally {
      Re.transition = s, oe = u;
    }
    return null;
  }
  function Y0(n, l, u) {
    do
      Tr();
    while (Zn !== null);
    if (re & 6) throw Error(c(327));
    var s = n.finishedWork, f = n.finishedLanes;
    if (s === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, s === n.current) throw Error(c(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var d = s.lanes | s.childLanes;
    if (h0(n, d), n === Oe && (Me = Oe = null, Xe = 0), !(s.subtreeFlags & 2064) && !(s.flags & 2064) || Gu || (Gu = !0, um(Xs, function() {
      return Tr(), null;
    })), d = (s.flags & 15990) !== 0, s.subtreeFlags & 15990 || d) {
      d = Re.transition, Re.transition = null;
      var v = oe;
      oe = 1;
      var E = re;
      re |= 4, Ta.current = null, j0(n, s), U0(n, s), U(n.containerInfo), n.current = s, H0(s), g0(), re = E, oe = v, Re.transition = d;
    } else n.current = s;
    if (Gu && (Gu = !1, Zn = n, Zu = f), d = n.pendingLanes, d === 0 && (Gn = null), S0(s.stateNode), mt(n, Be()), l !== null) for (u = n.onRecoverableError, s = 0; s < l.length; s++) u(l[s]);
    if (Ku) throw Ku = !1, n = Da, Da = null, n;
    return Zu & 1 && n.tag !== 0 && Tr(), d = n.pendingLanes, d & 1 ? n === Fa ? mi++ : (mi = 0, Fa = n) : mi = 0, cn(), null;
  }
  function Tr() {
    if (Zn !== null) {
      var n = Id(Zu), l = Re.transition, u = oe;
      try {
        if (Re.transition = null, oe = 16 > n ? 16 : n, Zn === null) var s = !1;
        else {
          if (n = Zn, Zn = null, Zu = 0, re & 6) throw Error(c(331));
          var f = re;
          for (re |= 4, W = n.current; W !== null; ) {
            var d = W, v = d.child;
            if (W.flags & 16) {
              var E = d.deletions;
              if (E !== null) {
                for (var O = 0; O < E.length; O++) {
                  var H = E[O];
                  for (W = H; W !== null; ) {
                    var K = W;
                    switch (K.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Nr(8, K, d);
                    }
                    var b = K.child;
                    if (b !== null) b.return = K, W = b;
                    else for (; W !== null; ) {
                      K = W;
                      var J = K.sibling, pe = K.return;
                      if (Hp(K), K === H) {
                        W = null;
                        break;
                      }
                      if (J !== null) {
                        J.return = pe, W = J;
                        break;
                      }
                      W = pe;
                    }
                  }
                }
                var Z = d.alternate;
                if (Z !== null) {
                  var et = Z.child;
                  if (et !== null) {
                    Z.child = null;
                    do {
                      var Wt = et.sibling;
                      et.sibling = null, et = Wt;
                    } while (et !== null);
                  }
                }
                W = d;
              }
            }
            if (d.subtreeFlags & 2064 && v !== null) v.return = d, W = v;
            else e: for (; W !== null; ) {
              if (d = W, d.flags & 2048) switch (d.tag) {
                case 0:
                case 11:
                case 15:
                  Nr(9, d, d.return);
              }
              var R = d.sibling;
              if (R !== null) {
                R.return = d.return, W = R;
                break e;
              }
              W = d.return;
            }
          }
          var C = n.current;
          for (W = C; W !== null; ) {
            v = W;
            var T = v.child;
            if (v.subtreeFlags & 2064 && T !== null) T.return = v, W = T;
            else e: for (v = C; W !== null; ) {
              if (E = W, E.flags & 2048) try {
                switch (E.tag) {
                  case 0:
                  case 11:
                  case 15:
                    ci(9, E);
                }
              } catch (G) {
                ht(E, E.return, G);
              }
              if (E === v) {
                W = null;
                break e;
              }
              var Q = E.sibling;
              if (Q !== null) {
                Q.return = E.return, W = Q;
                break e;
              }
              W = E.return;
            }
          }
          if (re = f, cn(), sn && typeof sn.onPostCommitFiberRoot == "function") try {
            sn.onPostCommitFiberRoot(pu, n);
          } catch {
          }
          s = !0;
        }
        return s;
      } finally {
        oe = u, Re.transition = l;
      }
    }
    return !1;
  }
  function rm(n, l, u) {
    l = va(u, l), l = gp(n, l, 1), Kn(n, l), l = ut(), n = qu(n, 1), n !== null && ($l(n, 1, l), mt(n, l));
  }
  function ht(n, l, u) {
    if (n.tag === 3) rm(n, n, u);
    else for (; l !== null; ) {
      if (l.tag === 3) {
        rm(l, n, u);
        break;
      } else if (l.tag === 1) {
        var s = l.stateNode;
        if (typeof l.type.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && (Gn === null || !Gn.has(s))) {
          n = va(u, n), n = yp(l, n, 1), Kn(l, n), n = ut(), l = qu(l, 1), l !== null && ($l(l, 1, n), mt(l, n));
          break;
        }
      }
      l = l.return;
    }
  }
  function X0(n, l, u) {
    var s = n.pingCache;
    s !== null && s.delete(l), l = ut(), n.pingedLanes |= n.suspendedLanes & u, Oe === n && (Xe & u) === u && (Fe === 4 || Fe === 3 && (Xe & 130023424) === Xe && 500 > Be() - Ma ? Rr(n, 0) : Oa |= u), mt(n, l);
  }
  function lm(n, l) {
    l === 0 && (n.mode & 1 ? (l = fu, fu <<= 1, !(fu & 130023424) && (fu = 4194304)) : l = 1);
    var u = ut();
    n = qu(n, l), n !== null && ($l(n, l, u), mt(n, u));
  }
  function K0(n) {
    var l = n.memoizedState, u = 0;
    l !== null && (u = l.retryLane), lm(n, u);
  }
  function G0(n, l) {
    var u = 0;
    switch (n.tag) {
      case 13:
        var s = n.stateNode, f = n.memoizedState;
        f !== null && (u = f.retryLane);
        break;
      case 19:
        s = n.stateNode;
        break;
      default:
        throw Error(c(314));
    }
    s !== null && s.delete(l), lm(n, u);
  }
  var im;
  im = function(n, l, u) {
    if (n !== null) if (n.memoizedProps !== l.pendingProps || ft.current) Pt = !0;
    else {
      if (!(n.lanes & u) && !(l.flags & 128)) return Pt = !1, D0(n, l, u);
      Pt = !!(n.flags & 131072);
    }
    else Pt = !1, ke && l.flags & 1048576 && Yd(l, xu, l.index);
    switch (l.lanes = 0, l.tag) {
      case 2:
        var s = l.type;
        n !== null && (n.alternate = null, l.alternate = null, l.flags |= 2), n = l.pendingProps;
        var f = qr(l, Je.current);
        el(l, u), f = fa(null, l, s, n, f, u);
        var d = da();
        return l.flags |= 1, typeof f == "object" && f !== null && typeof f.render == "function" && f.$$typeof === void 0 ? (l.tag = 1, l.memoizedState = null, l.updateQueue = null, dt(s) ? (d = !0, au(l)) : d = !1, l.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, qs(l), f.updater = Su, l.stateNode = f, f._reactInternals = l, ea(l, s, n, u), l = wa(null, l, s, !0, d, u)) : (l.tag = 0, ke && d && ta(l), it(null, l, f, u), l = l.child), l;
      case 16:
        s = l.elementType;
        e: {
          switch (n !== null && (n.alternate = null, l.alternate = null, l.flags |= 2), n = l.pendingProps, f = s._init, s = f(s._payload), l.type = s, f = l.tag = J0(s), n = qt(s, n), f) {
            case 0:
              l = ya(null, l, s, n, u);
              break e;
            case 1:
              l = Rp(
                null,
                l,
                s,
                n,
                u
              );
              break e;
            case 11:
              l = Cp(null, l, s, n, u);
              break e;
            case 14:
              l = Pp(null, l, s, qt(s.type, n), u);
              break e;
          }
          throw Error(c(306, s, ""));
        }
        return l;
      case 0:
        return s = l.type, f = l.pendingProps, f = l.elementType === s ? f : qt(s, f), ya(n, l, s, f, u);
      case 1:
        return s = l.type, f = l.pendingProps, f = l.elementType === s ? f : qt(s, f), Rp(n, l, s, f, u);
      case 3:
        e: {
          if (Lp(l), n === null) throw Error(c(387));
          s = l.pendingProps, d = l.memoizedState, f = d.element, jd(n, l), wu(l, s, null, u);
          var v = l.memoizedState;
          if (s = v.element, xt && d.isDehydrated) if (d = {
            element: s,
            isDehydrated: !1,
            cache: v.cache,
            transitions: v.transitions
          }, l.updateQueue.baseState = d, l.memoizedState = d, l.flags & 256) {
            f = Error(c(423)), l = Tp(n, l, s, u, f);
            break e;
          } else if (s !== f) {
            f = Error(c(424)), l = Tp(n, l, s, u, f);
            break e;
          } else for (xt && (Ct = $y(l.stateNode.containerInfo), Et = l, ke = !0, bt = null, ql = !1), u = $d(l, null, s, u), l.child = u; u; ) u.flags = u.flags & -3 | 4096, u = u.sibling;
          else {
            if (rl(), s === f) {
              l = Rn(n, l, u);
              break e;
            }
            it(n, l, s, u);
          }
          l = l.child;
        }
        return l;
      case 5:
        return qd(l), n === null && la(l), s = l.type, f = l.pendingProps, d = n !== null ? n.memoizedProps : null, v = f.children, Zt(s, f) ? v = null : d !== null && Zt(s, d) && (l.flags |= 32), Np(n, l), it(n, l, v, u), l.child;
      case 6:
        return n === null && la(l), null;
      case 13:
        return Op(n, l, u);
      case 4:
        return ua(l, l.stateNode.containerInfo), s = l.pendingProps, n === null ? l.child = ll(l, null, s, u) : it(n, l, s, u), l.child;
      case 11:
        return s = l.type, f = l.pendingProps, f = l.elementType === s ? f : qt(s, f), Cp(n, l, s, f, u);
      case 7:
        return it(n, l, l.pendingProps, u), l.child;
      case 8:
        return it(n, l, l.pendingProps.children, u), l.child;
      case 12:
        return it(n, l, l.pendingProps.children, u), l.child;
      case 10:
        e: {
          if (s = l.type._context, f = l.pendingProps, d = l.memoizedProps, v = f.value, Ad(l, s, v), d !== null) if (an(d.value, v)) {
            if (d.children === f.children && !ft.current) {
              l = Rn(n, l, u);
              break e;
            }
          } else for (d = l.child, d !== null && (d.return = l); d !== null; ) {
            var E = d.dependencies;
            if (E !== null) {
              v = d.child;
              for (var O = E.firstContext; O !== null; ) {
                if (O.context === s) {
                  if (d.tag === 1) {
                    O = Pn(-1, u & -u), O.tag = 2;
                    var H = d.updateQueue;
                    if (H !== null) {
                      H = H.shared;
                      var K = H.pending;
                      K === null ? O.next = O : (O.next = K.next, K.next = O), H.pending = O;
                    }
                  }
                  d.lanes |= u, O = d.alternate, O !== null && (O.lanes |= u), $s(d.return, u, l), E.lanes |= u;
                  break;
                }
                O = O.next;
              }
            } else if (d.tag === 10) v = d.type === l.type ? null : d.child;
            else if (d.tag === 18) {
              if (v = d.return, v === null) throw Error(c(341));
              v.lanes |= u, E = v.alternate, E !== null && (E.lanes |= u), $s(v, u, l), v = d.sibling;
            } else v = d.child;
            if (v !== null) v.return = d;
            else for (v = d; v !== null; ) {
              if (v === l) {
                v = null;
                break;
              }
              if (d = v.sibling, d !== null) {
                d.return = v.return, v = d;
                break;
              }
              v = v.return;
            }
            d = v;
          }
          it(n, l, f.children, u), l = l.child;
        }
        return l;
      case 9:
        return f = l.type, s = l.pendingProps.children, el(l, u), f = Dt(f), s = s(f), l.flags |= 1, it(n, l, s, u), l.child;
      case 14:
        return s = l.type, f = qt(s, l.pendingProps), f = qt(s.type, f), Pp(n, l, s, f, u);
      case 15:
        return _p(n, l, l.type, l.pendingProps, u);
      case 17:
        return s = l.type, f = l.pendingProps, f = l.elementType === s ? f : qt(s, f), n !== null && (n.alternate = null, l.alternate = null, l.flags |= 2), l.tag = 1, dt(s) ? (n = !0, au(l)) : n = !1, el(l, u), Qd(l, s, f), ea(l, s, f, u), wa(null, l, s, !0, n, u);
      case 19:
        return Fp(n, l, u);
      case 22:
        return zp(n, l, u);
    }
    throw Error(c(156, l.tag));
  };
  function um(n, l) {
    return Vs(n, l);
  }
  function Z0(n, l, u, s) {
    this.tag = n, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = s, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Bt(n, l, u, s) {
    return new Z0(n, l, u, s);
  }
  function Ba(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function J0(n) {
    if (typeof n == "function") return Ba(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === _) return 11;
      if (n === g) return 14;
    }
    return 2;
  }
  function qn(n, l) {
    var u = n.alternate;
    return u === null ? (u = Bt(n.tag, l, n.key, n.mode), u.elementType = n.elementType, u.type = n.type, u.stateNode = n.stateNode, u.alternate = n, n.alternate = u) : (u.pendingProps = l, u.type = n.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = n.flags & 14680064, u.childLanes = n.childLanes, u.lanes = n.lanes, u.child = n.child, u.memoizedProps = n.memoizedProps, u.memoizedState = n.memoizedState, u.updateQueue = n.updateQueue, l = n.dependencies, u.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, u.sibling = n.sibling, u.index = n.index, u.ref = n.ref, u;
  }
  function eo(n, l, u, s, f, d) {
    var v = 2;
    if (s = n, typeof n == "function") Ba(n) && (v = 1);
    else if (typeof n == "string") v = 5;
    else e: switch (n) {
      case x:
        return Or(u.children, f, d, l);
      case k:
        v = 8, f |= 8;
        break;
      case S:
        return n = Bt(12, u, l, f | 2), n.elementType = S, n.lanes = d, n;
      case F:
        return n = Bt(13, u, l, f), n.elementType = F, n.lanes = d, n;
      case y:
        return n = Bt(19, u, l, f), n.elementType = y, n.lanes = d, n;
      case L:
        return to(u, f, d, l);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case P:
            v = 10;
            break e;
          case N:
            v = 9;
            break e;
          case _:
            v = 11;
            break e;
          case g:
            v = 14;
            break e;
          case w:
            v = 16, s = null;
            break e;
        }
        throw Error(c(130, n == null ? n : typeof n, ""));
    }
    return l = Bt(v, u, l, f), l.elementType = n, l.type = s, l.lanes = d, l;
  }
  function Or(n, l, u, s) {
    return n = Bt(7, n, s, l), n.lanes = u, n;
  }
  function to(n, l, u, s) {
    return n = Bt(22, n, s, l), n.elementType = L, n.lanes = u, n.stateNode = {}, n;
  }
  function Wa(n, l, u) {
    return n = Bt(6, n, null, l), n.lanes = u, n;
  }
  function Qa(n, l, u) {
    return l = Bt(4, n.children !== null ? n.children : [], n.key, l), l.lanes = u, l.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, l;
  }
  function $0(n, l, u, s, f) {
    this.tag = l, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = Ds, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ws(0), this.expirationTimes = Ws(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ws(0), this.identifierPrefix = s, this.onRecoverableError = f, xt && (this.mutableSourceEagerHydrationData = null);
  }
  function om(n, l, u, s, f, d, v, E, O) {
    return n = new $0(n, l, u, E, O), l === 1 ? (l = 1, d === !0 && (l |= 8)) : l = 0, d = Bt(3, null, null, l), n.current = d, d.stateNode = n, d.memoizedState = { element: s, isDehydrated: u, cache: null, transitions: null }, qs(d), n;
  }
  function sm(n) {
    if (!n) return Yn;
    n = n._reactInternals;
    e: {
      if ($(n) !== n || n.tag !== 1) throw Error(c(170));
      var l = n;
      do {
        switch (l.tag) {
          case 3:
            l = l.stateNode.context;
            break e;
          case 1:
            if (dt(l.type)) {
              l = l.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        l = l.return;
      } while (l !== null);
      throw Error(c(171));
    }
    if (n.tag === 1) {
      var u = n.type;
      if (dt(u)) return Od(n, u, l);
    }
    return l;
  }
  function am(n) {
    var l = n._reactInternals;
    if (l === void 0)
      throw typeof n.render == "function" ? Error(c(188)) : (n = Object.keys(n).join(","), Error(c(268, n)));
    return n = we(l), n === null ? null : n.stateNode;
  }
  function cm(n, l) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var u = n.retryLane;
      n.retryLane = u !== 0 && u < l ? u : l;
    }
  }
  function Va(n, l) {
    cm(n, l), (n = n.alternate) && cm(n, l);
  }
  function q0(n) {
    return n = we(n), n === null ? null : n.stateNode;
  }
  function b0() {
    return null;
  }
  return r.attemptContinuousHydration = function(n) {
    if (n.tag === 13) {
      var l = ut();
      Ht(n, 134217728, l), Va(n, 134217728);
    }
  }, r.attemptHydrationAtCurrentPriority = function(n) {
    if (n.tag === 13) {
      var l = ut(), u = Jn(n);
      Ht(n, u, l), Va(n, u);
    }
  }, r.attemptSynchronousHydration = function(n) {
    switch (n.tag) {
      case 3:
        var l = n.stateNode;
        if (l.current.memoizedState.isDehydrated) {
          var u = Jl(l.pendingLanes);
          u !== 0 && (Qs(l, u | 1), mt(l, Be()), !(re & 6) && (cl(), cn()));
        }
        break;
      case 13:
        var s = ut();
        qp(function() {
          return Ht(n, 1, s);
        }), Va(n, 1);
    }
  }, r.batchedUpdates = function(n, l) {
    var u = re;
    re |= 1;
    try {
      return n(l);
    } finally {
      re = u, re === 0 && (cl(), mu && cn());
    }
  }, r.createComponentSelector = function(n) {
    return { $$typeof: Hu, value: n };
  }, r.createContainer = function(n, l, u, s, f, d, v) {
    return om(n, l, !1, null, u, s, f, d, v);
  }, r.createHasPseudoClassSelector = function(n) {
    return { $$typeof: Bu, value: n };
  }, r.createHydrationContainer = function(n, l, u, s, f, d, v, E, O) {
    return n = om(u, s, !0, n, f, d, v, E, O), n.context = sm(null), u = n.current, s = ut(), f = Jn(u), d = Pn(s, f), d.callback = l ?? null, Kn(u, d), n.current.lanes = f, $l(n, f, s), mt(n, s), n;
  }, r.createPortal = function(n, l, u) {
    var s = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: h, key: s == null ? null : "" + s, children: n, containerInfo: l, implementation: u };
  }, r.createRoleSelector = function(n) {
    return { $$typeof: Wu, value: n };
  }, r.createTestNameSelector = function(n) {
    return { $$typeof: Qu, value: n };
  }, r.createTextSelector = function(n) {
    return { $$typeof: Vu, value: n };
  }, r.deferredUpdates = function(n) {
    var l = oe, u = Re.transition;
    try {
      return Re.transition = null, oe = 16, n();
    } finally {
      oe = l, Re.transition = u;
    }
  }, r.discreteUpdates = function(n, l, u, s, f) {
    var d = oe, v = Re.transition;
    try {
      return Re.transition = null, oe = 1, n(l, u, s, f);
    } finally {
      oe = d, Re.transition = v, re === 0 && cl();
    }
  }, r.findAllNodes = La, r.findBoundingRects = function(n, l) {
    if (!Xl) throw Error(c(363));
    l = La(n, l), n = [];
    for (var u = 0; u < l.length; u++) n.push(Py(l[u]));
    for (l = n.length - 1; 0 < l; l--) {
      u = n[l];
      for (var s = u.x, f = s + u.width, d = u.y, v = d + u.height, E = l - 1; 0 <= E; E--) if (l !== E) {
        var O = n[E], H = O.x, K = H + O.width, b = O.y, J = b + O.height;
        if (s >= H && d >= b && f <= K && v <= J) {
          n.splice(l, 1);
          break;
        } else if (s !== H || u.width !== O.width || J < d || b > v) {
          if (!(d !== b || u.height !== O.height || K < s || H > f)) {
            H > s && (O.width += H - s, O.x = s), K < f && (O.width = f - H), n.splice(l, 1);
            break;
          }
        } else {
          b > d && (O.height += b - d, O.y = d), J < v && (O.height = v - b), n.splice(l, 1);
          break;
        }
      }
    }
    return n;
  }, r.findHostInstance = am, r.findHostInstanceWithNoPortals = function(n) {
    return n = ue(n), n = n !== null ? Se(n) : null, n === null ? null : n.stateNode;
  }, r.findHostInstanceWithWarning = function(n) {
    return am(n);
  }, r.flushControlled = function(n) {
    var l = re;
    re |= 1;
    var u = Re.transition, s = oe;
    try {
      Re.transition = null, oe = 1, n();
    } finally {
      oe = s, Re.transition = u, re = l, re === 0 && (cl(), cn());
    }
  }, r.flushPassiveEffects = Tr, r.flushSync = qp, r.focusWithin = function(n, l) {
    if (!Xl) throw Error(c(363));
    for (n = za(n), l = Zp(n, l), l = Array.from(l), n = 0; n < l.length; ) {
      var u = l[n++];
      if (!Kl(u)) {
        if (u.tag === 5 && Ny(u.stateNode)) return !0;
        for (u = u.child; u !== null; ) l.push(u), u = u.sibling;
      }
    }
    return !1;
  }, r.getCurrentUpdatePriority = function() {
    return oe;
  }, r.getFindAllNodesFailureDescription = function(n, l) {
    if (!Xl) throw Error(c(363));
    var u = 0, s = [];
    n = [za(n), 0];
    for (var f = 0; f < n.length; ) {
      var d = n[f++], v = n[f++], E = l[v];
      if ((d.tag !== 5 || !Kl(d)) && (Na(d, E) && (s.push(Ra(E)), v++, v > u && (u = v)), v < l.length)) for (d = d.child; d !== null; ) n.push(d, v), d = d.sibling;
    }
    if (u < l.length) {
      for (n = []; u < l.length; u++) n.push(Ra(l[u]));
      return `findAllNodes was able to match part of the selector:
  ` + (s.join(" > ") + `

No matching component was found for:
  `) + n.join(" > ");
    }
    return null;
  }, r.getPublicRootInstance = function(n) {
    if (n = n.current, !n.child) return null;
    switch (n.child.tag) {
      case 5:
        return fe(n.child.stateNode);
      default:
        return n.child.stateNode;
    }
  }, r.injectIntoDevTools = function(n) {
    if (n = { bundleType: n.bundleType, version: n.version, rendererPackageName: n.rendererPackageName, rendererConfig: n.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: p.ReactCurrentDispatcher, findHostInstanceByFiber: q0, findFiberByHostInstance: n.findFiberByHostInstance || b0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.0.0-fc46dba67-20220329" }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u") n = !1;
    else {
      var l = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (l.isDisabled || !l.supportsFiber) n = !0;
      else {
        try {
          pu = l.inject(n), sn = l;
        } catch {
        }
        n = !!l.checkDCE;
      }
    }
    return n;
  }, r.isAlreadyRendering = function() {
    return !1;
  }, r.observeVisibleRects = function(n, l, u, s) {
    if (!Xl) throw Error(c(363));
    n = La(n, l);
    var f = Ry(n, u, s).disconnect;
    return { disconnect: function() {
      f();
    } };
  }, r.registerMutableSourceForHydration = function(n, l) {
    var u = l._getVersion;
    u = u(l._source), n.mutableSourceEagerHydrationData == null ? n.mutableSourceEagerHydrationData = [l, u] : n.mutableSourceEagerHydrationData.push(l, u);
  }, r.runWithPriority = function(n, l) {
    var u = oe;
    try {
      return oe = n, l();
    } finally {
      oe = u;
    }
  }, r.shouldError = function() {
    return null;
  }, r.shouldSuspend = function() {
    return !1;
  }, r.updateContainer = function(n, l, u, s) {
    var f = l.current, d = ut(), v = Jn(f);
    return u = sm(u), l.context === null ? l.context = u : l.pendingContext = u, l = Pn(d, v), l.payload = { element: n }, s = s === void 0 ? null : s, s !== null && (l.callback = s), Kn(f, l), n = Ht(f, v, d), n !== null && yu(n, f, v), v;
  }, r;
};
hy.exports = pk;
var mk = hy.exports;
const Mk = /* @__PURE__ */ kf(mk);
function Ah(e, t) {
  let r;
  return (...i) => {
    window.clearTimeout(r), r = window.setTimeout(() => e(...i), t);
  };
}
function Ik({ debounce: e, scroll: t, polyfill: r, offsetSize: i } = { debounce: 0, scroll: !1, offsetSize: !1 }) {
  const o = r || (typeof window > "u" ? class {
  } : window.ResizeObserver);
  if (!o) throw new Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");
  const [a, c] = Y.useState({ left: 0, top: 0, width: 0, height: 0, bottom: 0, right: 0, x: 0, y: 0 }), p = Y.useRef({ element: null, scrollContainers: null, resizeObserver: null, lastBounds: a, orientationHandler: null }), m = e ? typeof e == "number" ? e : e.scroll : null, h = e ? typeof e == "number" ? e : e.resize : null, x = Y.useRef(!1);
  Y.useEffect(() => (x.current = !0, () => void (x.current = !1)));
  const [k, S, P] = Y.useMemo(() => {
    const y = () => {
      if (!p.current.element) return;
      const { left: g, top: w, width: L, height: M, bottom: I, right: D, x: B, y: $ } = p.current.element.getBoundingClientRect(), V = { left: g, top: w, width: L, height: M, bottom: I, right: D, x: B, y: $ };
      p.current.element instanceof HTMLElement && i && (V.height = p.current.element.offsetHeight, V.width = p.current.element.offsetWidth), Object.freeze(V), x.current && !yk(p.current.lastBounds, V) && c(p.current.lastBounds = V);
    };
    return [y, h ? Ah(y, h) : y, m ? Ah(y, m) : y];
  }, [c, i, m, h]);
  function N() {
    p.current.scrollContainers && (p.current.scrollContainers.forEach((y) => y.removeEventListener("scroll", P, !0)), p.current.scrollContainers = null), p.current.resizeObserver && (p.current.resizeObserver.disconnect(), p.current.resizeObserver = null), p.current.orientationHandler && ("orientation" in screen && "removeEventListener" in screen.orientation ? screen.orientation.removeEventListener("change", p.current.orientationHandler) : "onorientationchange" in window && window.removeEventListener("orientationchange", p.current.orientationHandler));
  }
  function _() {
    p.current.element && (p.current.resizeObserver = new o(P), p.current.resizeObserver.observe(p.current.element), t && p.current.scrollContainers && p.current.scrollContainers.forEach((y) => y.addEventListener("scroll", P, { capture: !0, passive: !0 })), p.current.orientationHandler = () => {
      P();
    }, "orientation" in screen && "addEventListener" in screen.orientation ? screen.orientation.addEventListener("change", p.current.orientationHandler) : "onorientationchange" in window && window.addEventListener("orientationchange", p.current.orientationHandler));
  }
  const F = (y) => {
    !y || y === p.current.element || (N(), p.current.element = y, p.current.scrollContainers = vy(y), _());
  };
  return vk(P, !!t), hk(S), Y.useEffect(() => {
    N(), _();
  }, [t, P, S]), Y.useEffect(() => N, []), [F, a, k];
}
function hk(e) {
  Y.useEffect(() => {
    const t = e;
    return window.addEventListener("resize", t), () => void window.removeEventListener("resize", t);
  }, [e]);
}
function vk(e, t) {
  Y.useEffect(() => {
    if (t) {
      const r = e;
      return window.addEventListener("scroll", r, { capture: !0, passive: !0 }), () => void window.removeEventListener("scroll", r, !0);
    }
  }, [e, t]);
}
function vy(e) {
  const t = [];
  if (!e || e === document.body) return t;
  const { overflow: r, overflowX: i, overflowY: o } = window.getComputedStyle(e);
  return [r, i, o].some((a) => a === "auto" || a === "scroll") && t.push(e), [...t, ...vy(e.parentElement)];
}
const gk = ["x", "y", "top", "bottom", "left", "right", "width", "height"], yk = (e, t) => gk.every((r) => e[r] === t[r]);
export {
  wk as R,
  vd as a,
  Nk as b,
  Lk as c,
  xk as d,
  ok as e,
  zk as f,
  g1 as g,
  Rk as h,
  kk as i,
  Sk as j,
  Tk as k,
  _k as l,
  Mk as m,
  Ik as n,
  Ck as o,
  Ok as p,
  NS as q,
  Y as r,
  Pk as s,
  Ek as u
};
