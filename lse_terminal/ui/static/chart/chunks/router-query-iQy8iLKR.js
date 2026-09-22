import { r as h, j as De, R as Qe } from "./react-vendor-C0yw3i6b.js";
var k = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set(), this.subscribe = this.subscribe.bind(this);
  }
  subscribe(e) {
    return this.listeners.add(e), this.onSubscribe(), () => {
      this.listeners.delete(e), this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
}, qe = class extends k {
  #e;
  #t;
  #r;
  constructor() {
    super(), this.#r = (e) => {
      if (typeof window < "u" && window.addEventListener) {
        const t = () => e();
        return window.addEventListener("visibilitychange", t, !1), () => {
          window.removeEventListener("visibilitychange", t);
        };
      }
    };
  }
  onSubscribe() {
    this.#t || this.setEventListener(this.#r);
  }
  onUnsubscribe() {
    this.hasListeners() || (this.#t?.(), this.#t = void 0);
  }
  setEventListener(e) {
    this.#r = e, this.#t?.(), this.#t = e((t) => {
      typeof t == "boolean" ? this.setFocused(t) : this.onFocus();
    });
  }
  setFocused(e) {
    this.#e !== e && (this.#e = e, this.onFocus());
  }
  onFocus() {
    const e = this.isFocused();
    this.listeners.forEach((t) => {
      t(e);
    });
  }
  isFocused() {
    return typeof this.#e == "boolean" ? this.#e : globalThis.document?.visibilityState !== "hidden";
  }
}, ye = new qe(), ke = {
  // We need the wrapper function syntax below instead of direct references to
  // global setTimeout etc.
  //
  // BAD: `setTimeout: setTimeout`
  // GOOD: `setTimeout: (cb, delay) => setTimeout(cb, delay)`
  //
  // If we use direct references here, then anything that wants to spy on or
  // replace the global setTimeout (like tests) won't work since we'll already
  // have a hard reference to the original implementation at the time when this
  // file was imported.
  setTimeout: (e, t) => setTimeout(e, t),
  clearTimeout: (e) => clearTimeout(e),
  setInterval: (e, t) => setInterval(e, t),
  clearInterval: (e) => clearInterval(e)
}, Be = class {
  // We cannot have TimeoutManager<T> as we must instantiate it with a concrete
  // type at app boot; and if we leave that type, then any new timer provider
  // would need to support the default provider's concrete timer ID, which is
  // infeasible across environments.
  //
  // We settle for type safety for the TimeoutProvider type, and accept that
  // this class is unsafe internally to allow for extension.
  #e = ke;
  #t = !1;
  setTimeoutProvider(e) {
    this.#e = e;
  }
  setTimeout(e, t) {
    return this.#e.setTimeout(e, t);
  }
  clearTimeout(e) {
    this.#e.clearTimeout(e);
  }
  setInterval(e, t) {
    return this.#e.setInterval(e, t);
  }
  clearInterval(e) {
    this.#e.clearInterval(e);
  }
}, K = new Be();
function Ne(e) {
  setTimeout(e, 0);
}
var _e = typeof window > "u" || "Deno" in globalThis;
function S() {
}
function Ke(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function $e(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function We(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function $(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ge(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function re(e, t) {
  const {
    type: r = "all",
    exact: n,
    fetchStatus: s,
    predicate: i,
    queryKey: a,
    stale: l
  } = e;
  if (a) {
    if (n) {
      if (t.queryHash !== X(a, t.options))
        return !1;
    } else if (!U(t.queryKey, a))
      return !1;
  }
  if (r !== "all") {
    const o = t.isActive();
    if (r === "active" && !o || r === "inactive" && o)
      return !1;
  }
  return !(typeof l == "boolean" && t.isStale() !== l || s && s !== t.state.fetchStatus || i && !i(t));
}
function ne(e, t) {
  const { exact: r, status: n, predicate: s, mutationKey: i } = e;
  if (i) {
    if (!t.options.mutationKey)
      return !1;
    if (r) {
      if (I(t.options.mutationKey) !== I(i))
        return !1;
    } else if (!U(t.options.mutationKey, i))
      return !1;
  }
  return !(n && t.state.status !== n || s && !s(t));
}
function X(e, t) {
  return (t?.queryKeyHashFn || I)(e);
}
function I(e) {
  return JSON.stringify(
    e,
    (t, r) => W(r) ? Object.keys(r).sort().reduce((n, s) => (n[s] = r[s], n), {}) : r
  );
}
function U(e, t) {
  return e === t ? !0 : typeof e != typeof t ? !1 : e && t && typeof e == "object" && typeof t == "object" ? Object.keys(t).every((r) => U(e[r], t[r])) : !1;
}
var ze = Object.prototype.hasOwnProperty;
function ve(e, t, r = 0) {
  if (e === t)
    return e;
  if (r > 500) return t;
  const n = se(e) && se(t);
  if (!n && !(W(e) && W(t))) return t;
  const i = (n ? e : Object.keys(e)).length, a = n ? t : Object.keys(t), l = a.length, o = n ? new Array(l) : {};
  let c = 0;
  for (let f = 0; f < l; f++) {
    const u = n ? f : a[f], y = e[u], d = t[u];
    if (y === d) {
      o[u] = y, (n ? f < i : ze.call(e, u)) && c++;
      continue;
    }
    if (y === null || d === null || typeof y != "object" || typeof d != "object") {
      o[u] = d;
      continue;
    }
    const p = ve(y, d, r + 1);
    o[u] = p, p === y && c++;
  }
  return i === l && c === i ? e : o;
}
function se(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function W(e) {
  if (!ie(e))
    return !1;
  const t = e.constructor;
  if (t === void 0)
    return !0;
  const r = t.prototype;
  return !(!ie(r) || !r.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(e) !== Object.prototype);
}
function ie(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function He(e) {
  return new Promise((t) => {
    K.setTimeout(t, e);
  });
}
function Ve(e, t, r) {
  return typeof r.structuralSharing == "function" ? r.structuralSharing(e, t) : r.structuralSharing !== !1 ? ve(e, t) : t;
}
function Je(e, t, r = 0) {
  const n = [...e, t];
  return r && n.length > r ? n.slice(1) : n;
}
function Xe(e, t, r = 0) {
  const n = [t, ...e];
  return r && n.length > r ? n.slice(0, -1) : n;
}
var Z = /* @__PURE__ */ Symbol();
function ge(e, t) {
  return !e.queryFn && t?.initialPromise ? () => t.initialPromise : !e.queryFn || e.queryFn === Z ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)) : e.queryFn;
}
function Ze(e, t, r) {
  let n = !1, s;
  return Object.defineProperty(e, "signal", {
    enumerable: !0,
    get: () => (s ??= t(), n || (n = !0, s.aborted ? r() : s.addEventListener("abort", r, { once: !0 })), s)
  }), e;
}
var be = /* @__PURE__ */ (() => {
  let e = () => _e;
  return {
    /**
     * Returns whether the current runtime should be treated as a server environment.
     */
    isServer() {
      return e();
    },
    /**
     * Overrides the server check globally.
     */
    setIsServer(t) {
      e = t;
    }
  };
})();
function Ye() {
  let e, t;
  const r = new Promise((s, i) => {
    e = s, t = i;
  });
  r.status = "pending", r.catch(() => {
  });
  function n(s) {
    Object.assign(r, s), delete r.resolve, delete r.reject;
  }
  return r.resolve = (s) => {
    n({
      status: "fulfilled",
      value: s
    }), e(s);
  }, r.reject = (s) => {
    n({
      status: "rejected",
      reason: s
    }), t(s);
  }, r;
}
var et = Ne;
function tt() {
  let e = [], t = 0, r = (l) => {
    l();
  }, n = (l) => {
    l();
  }, s = et;
  const i = (l) => {
    t ? e.push(l) : s(() => {
      r(l);
    });
  }, a = () => {
    const l = e;
    e = [], l.length && s(() => {
      n(() => {
        l.forEach((o) => {
          r(o);
        });
      });
    });
  };
  return {
    batch: (l) => {
      let o;
      t++;
      try {
        o = l();
      } finally {
        t--, t || a();
      }
      return o;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (l) => (...o) => {
      i(() => {
        l(...o);
      });
    },
    schedule: i,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (l) => {
      r = l;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (l) => {
      n = l;
    },
    setScheduler: (l) => {
      s = l;
    }
  };
}
var C = tt(), rt = class extends k {
  #e = !0;
  #t;
  #r;
  constructor() {
    super(), this.#r = (e) => {
      if (typeof window < "u" && window.addEventListener) {
        const t = () => e(!0), r = () => e(!1);
        return window.addEventListener("online", t, !1), window.addEventListener("offline", r, !1), () => {
          window.removeEventListener("online", t), window.removeEventListener("offline", r);
        };
      }
    };
  }
  onSubscribe() {
    this.#t || this.setEventListener(this.#r);
  }
  onUnsubscribe() {
    this.hasListeners() || (this.#t?.(), this.#t = void 0);
  }
  setEventListener(e) {
    this.#r = e, this.#t?.(), this.#t = e(this.setOnline.bind(this));
  }
  setOnline(e) {
    this.#e !== e && (this.#e = e, this.listeners.forEach((r) => {
      r(e);
    }));
  }
  isOnline() {
    return this.#e;
  }
}, Q = new rt();
function nt(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function Pe(e) {
  return (e ?? "online") === "online" ? Q.isOnline() : !0;
}
var G = class extends Error {
  constructor(e) {
    super("CancelledError"), this.revert = e?.revert, this.silent = e?.silent;
  }
};
function Ce(e) {
  let t = !1, r = 0, n;
  const s = Ye(), i = () => s.status !== "pending", a = (m) => {
    if (!i()) {
      const v = new G(m);
      y(v), e.onCancel?.(v);
    }
  }, l = () => {
    t = !0;
  }, o = () => {
    t = !1;
  }, c = () => ye.isFocused() && (e.networkMode === "always" || Q.isOnline()) && e.canRun(), f = () => Pe(e.networkMode) && e.canRun(), u = (m) => {
    i() || (n?.(), s.resolve(m));
  }, y = (m) => {
    i() || (n?.(), s.reject(m));
  }, d = () => new Promise((m) => {
    n = (v) => {
      (i() || c()) && m(v);
    }, e.onPause?.();
  }).then(() => {
    n = void 0, i() || e.onContinue?.();
  }), p = () => {
    if (i())
      return;
    let m;
    const v = r === 0 ? e.initialPromise : void 0;
    try {
      m = v ?? e.fn();
    } catch (P) {
      m = Promise.reject(P);
    }
    Promise.resolve(m).then(u).catch((P) => {
      if (i())
        return;
      const w = e.retry ?? (be.isServer() ? 0 : 3), g = e.retryDelay ?? nt, E = typeof g == "function" ? g(r, P) : g, F = w === !0 || typeof w == "number" && r < w || typeof w == "function" && w(r, P);
      if (t || !F) {
        y(P);
        return;
      }
      r++, e.onFail?.(r, P), He(E).then(() => c() ? void 0 : d()).then(() => {
        t ? y(P) : p();
      });
    });
  };
  return {
    promise: s,
    status: () => s.status,
    cancel: a,
    continue: () => (n?.(), s),
    cancelRetry: l,
    continueRetry: o,
    canStart: f,
    start: () => (f() ? p() : d().then(p), s)
  };
}
var we = class {
  #e;
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout(), $e(this.gcTime) && (this.#e = K.setTimeout(() => {
      this.optionalRemove();
    }, this.gcTime));
  }
  updateGcTime(e) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      e ?? (be.isServer() ? 1 / 0 : 5 * 60 * 1e3)
    );
  }
  clearGcTimeout() {
    this.#e !== void 0 && (K.clearTimeout(this.#e), this.#e = void 0);
  }
};
function st(e) {
  return {
    onFetch: (t, r) => {
      const n = t.options, s = t.fetchOptions?.meta?.fetchMore?.direction, i = t.state.data?.pages || [], a = t.state.data?.pageParams || [];
      let l = { pages: [], pageParams: [] }, o = 0;
      const c = async () => {
        let f = !1;
        const u = (p) => {
          Ze(
            p,
            () => t.signal,
            () => f = !0
          );
        }, y = ge(t.options, t.fetchOptions), d = async (p, m, v) => {
          if (f)
            return Promise.reject(t.signal.reason);
          if (m == null && p.pages.length)
            return Promise.resolve(p);
          const w = (() => {
            const te = {
              client: t.client,
              queryKey: t.queryKey,
              pageParam: m,
              direction: v ? "backward" : "forward",
              meta: t.options.meta
            };
            return u(te), te;
          })(), g = await y(w), { maxPages: E } = t.options, F = v ? Xe : Je;
          return {
            pages: F(p.pages, g, E),
            pageParams: F(p.pageParams, m, E)
          };
        };
        if (s && i.length) {
          const p = s === "backward", m = p ? it : ae, v = {
            pages: i,
            pageParams: a
          }, P = m(n, v);
          l = await d(v, P, p);
        } else {
          const p = e ?? i.length;
          do {
            const m = o === 0 ? a[0] ?? n.initialPageParam : ae(n, l);
            if (o > 0 && m == null)
              break;
            l = await d(l, m), o++;
          } while (o < p);
        }
        return l;
      };
      t.options.persister ? t.fetchFn = () => t.options.persister?.(
        c,
        {
          client: t.client,
          queryKey: t.queryKey,
          meta: t.options.meta,
          signal: t.signal
        },
        r
      ) : t.fetchFn = c;
    }
  };
}
function ae(e, { pages: t, pageParams: r }) {
  const n = t.length - 1;
  return t.length > 0 ? e.getNextPageParam(
    t[n],
    t,
    r[n],
    r
  ) : void 0;
}
function it(e, { pages: t, pageParams: r }) {
  return t.length > 0 ? e.getPreviousPageParam?.(t[0], t, r[0], r) : void 0;
}
var at = class extends we {
  #e;
  #t;
  #r;
  #s;
  #i;
  #n;
  #l;
  #a;
  constructor(e) {
    super(), this.#a = !1, this.#l = e.defaultOptions, this.setOptions(e.options), this.observers = [], this.#i = e.client, this.#s = this.#i.getQueryCache(), this.queryKey = e.queryKey, this.queryHash = e.queryHash, this.#t = le(this.options), this.state = e.state ?? this.#t, this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get queryType() {
    return this.#e;
  }
  get promise() {
    return this.#n?.promise;
  }
  setOptions(e) {
    if (this.options = { ...this.#l, ...e }, e?._type && (this.#e = e._type), this.updateGcTime(this.options.gcTime), this.state && this.state.data === void 0) {
      const t = le(this.options);
      t.data !== void 0 && (this.setState(
        oe(t.data, t.dataUpdatedAt)
      ), this.#t = t);
    }
  }
  optionalRemove() {
    !this.observers.length && this.state.fetchStatus === "idle" && this.#s.remove(this);
  }
  setData(e, t) {
    const r = Ve(this.state.data, e, this.options);
    return this.#o({
      data: r,
      type: "success",
      dataUpdatedAt: t?.updatedAt,
      manual: t?.manual
    }), r;
  }
  setState(e) {
    this.#o({ type: "setState", state: e });
  }
  cancel(e) {
    const t = this.#n?.promise;
    return this.#n?.cancel(e), t ? t.then(S).catch(S) : Promise.resolve();
  }
  destroy() {
    super.destroy(), this.cancel({ silent: !0 });
  }
  get resetState() {
    return this.#t;
  }
  reset() {
    this.destroy(), this.setState(this.resetState);
  }
  isActive() {
    return this.observers.some(
      (e) => Ge(e.options.enabled, this) !== !1
    );
  }
  isDisabled() {
    return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === Z || !this.isFetched();
  }
  isFetched() {
    return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
  }
  isStatic() {
    return this.getObserversCount() > 0 ? this.observers.some(
      (e) => $(e.options.staleTime, this) === "static"
    ) : !1;
  }
  isStale() {
    return this.getObserversCount() > 0 ? this.observers.some(
      (e) => e.getCurrentResult().isStale
    ) : this.state.data === void 0 || this.state.isInvalidated;
  }
  isStaleByTime(e = 0) {
    return this.state.data === void 0 ? !0 : e === "static" ? !1 : this.state.isInvalidated ? !0 : !We(this.state.dataUpdatedAt, e);
  }
  onFocus() {
    this.observers.find((t) => t.shouldFetchOnWindowFocus())?.refetch({ cancelRefetch: !1 }), this.#n?.continue();
  }
  onOnline() {
    this.observers.find((t) => t.shouldFetchOnReconnect())?.refetch({ cancelRefetch: !1 }), this.#n?.continue();
  }
  addObserver(e) {
    this.observers.includes(e) || (this.observers.push(e), this.clearGcTimeout(), this.#s.notify({ type: "observerAdded", query: this, observer: e }));
  }
  removeObserver(e) {
    this.observers.includes(e) && (this.observers = this.observers.filter((t) => t !== e), this.observers.length || (this.#n && (this.#a || this.#u() ? this.#n.cancel({ revert: !0 }) : this.#n.cancelRetry()), this.scheduleGc()), this.#s.notify({ type: "observerRemoved", query: this, observer: e }));
  }
  getObserversCount() {
    return this.observers.length;
  }
  #u() {
    return this.state.fetchStatus === "paused" && this.state.status === "pending";
  }
  invalidate() {
    this.state.isInvalidated || this.#o({ type: "invalidate" });
  }
  async fetch(e, t) {
    if (this.state.fetchStatus !== "idle" && // If the promise in the retryer is already rejected, we have to definitely
    // re-start the fetch; there is a chance that the query is still in a
    // pending state when that happens
    this.#n?.status() !== "rejected") {
      if (this.state.data !== void 0 && t?.cancelRefetch)
        this.cancel({ silent: !0 });
      else if (this.#n)
        return this.#n.continueRetry(), this.#n.promise;
    }
    if (e && this.setOptions(e), !this.options.queryFn) {
      const o = this.observers.find((c) => c.options.queryFn);
      o && this.setOptions(o.options);
    }
    const r = new AbortController(), n = (o) => {
      Object.defineProperty(o, "signal", {
        enumerable: !0,
        get: () => (this.#a = !0, r.signal)
      });
    }, s = () => {
      const o = ge(this.options, t), f = (() => {
        const u = {
          client: this.#i,
          queryKey: this.queryKey,
          meta: this.meta
        };
        return n(u), u;
      })();
      return this.#a = !1, this.options.persister ? this.options.persister(
        o,
        f,
        this
      ) : o(f);
    }, a = (() => {
      const o = {
        fetchOptions: t,
        options: this.options,
        queryKey: this.queryKey,
        client: this.#i,
        state: this.state,
        fetchFn: s
      };
      return n(o), o;
    })();
    (this.#e === "infinite" ? st(
      this.options.pages
    ) : this.options.behavior)?.onFetch(a, this), this.#r = this.state, (this.state.fetchStatus === "idle" || this.state.fetchMeta !== a.fetchOptions?.meta) && this.#o({ type: "fetch", meta: a.fetchOptions?.meta }), this.#n = Ce({
      initialPromise: t?.initialPromise,
      fn: a.fetchFn,
      onCancel: (o) => {
        o instanceof G && o.revert && this.setState({
          ...this.#r,
          fetchStatus: "idle"
        }), r.abort();
      },
      onFail: (o, c) => {
        this.#o({ type: "failed", failureCount: o, error: c });
      },
      onPause: () => {
        this.#o({ type: "pause" });
      },
      onContinue: () => {
        this.#o({ type: "continue" });
      },
      retry: a.options.retry,
      retryDelay: a.options.retryDelay,
      networkMode: a.options.networkMode,
      canRun: () => !0
    });
    try {
      const o = await this.#n.start();
      if (o === void 0)
        throw new Error(`${this.queryHash} data is undefined`);
      return this.setData(o), this.#s.config.onSuccess?.(o, this), this.#s.config.onSettled?.(
        o,
        this.state.error,
        this
      ), o;
    } catch (o) {
      if (o instanceof G) {
        if (o.silent)
          return this.#n.promise;
        if (o.revert) {
          if (this.state.data === void 0)
            throw o;
          return this.state.data;
        }
      }
      throw this.#o({
        type: "error",
        error: o
      }), this.#s.config.onError?.(
        o,
        this
      ), this.#s.config.onSettled?.(
        this.state.data,
        o,
        this
      ), o;
    } finally {
      this.scheduleGc();
    }
  }
  #o(e) {
    const t = (r) => {
      switch (e.type) {
        case "failed":
          return {
            ...r,
            fetchFailureCount: e.failureCount,
            fetchFailureReason: e.error
          };
        case "pause":
          return {
            ...r,
            fetchStatus: "paused"
          };
        case "continue":
          return {
            ...r,
            fetchStatus: "fetching"
          };
        case "fetch":
          return {
            ...r,
            ...ot(r.data, this.options),
            fetchMeta: e.meta ?? null
          };
        case "success":
          const n = {
            ...r,
            ...oe(e.data, e.dataUpdatedAt),
            dataUpdateCount: r.dataUpdateCount + 1,
            ...!e.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null
            }
          };
          return this.#r = e.manual ? n : void 0, n;
        case "error":
          const s = e.error;
          return {
            ...r,
            error: s,
            errorUpdateCount: r.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: r.fetchFailureCount + 1,
            fetchFailureReason: s,
            fetchStatus: "idle",
            status: "error",
            // flag existing data as invalidated if we get a background error
            // note that "no data" always means stale so we can set unconditionally here
            isInvalidated: !0
          };
        case "invalidate":
          return {
            ...r,
            isInvalidated: !0
          };
        case "setState":
          return {
            ...r,
            ...e.state
          };
      }
    };
    this.state = t(this.state), C.batch(() => {
      this.observers.forEach((r) => {
        r.onQueryUpdate();
      }), this.#s.notify({ query: this, type: "updated", action: e });
    });
  }
};
function ot(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: Pe(t.networkMode) ? "fetching" : "paused",
    ...e === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function oe(e, t) {
  return {
    data: e,
    dataUpdatedAt: t ?? Date.now(),
    error: null,
    isInvalidated: !1,
    status: "success"
  };
}
function le(e) {
  const t = typeof e.initialData == "function" ? e.initialData() : e.initialData, r = t !== void 0, n = r ? typeof e.initialDataUpdatedAt == "function" ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt : 0;
  return {
    data: t,
    dataUpdateCount: 0,
    dataUpdatedAt: r ? n ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: r ? "success" : "pending",
    fetchStatus: "idle"
  };
}
var lt = class extends we {
  #e;
  #t;
  #r;
  #s;
  constructor(e) {
    super(), this.#e = e.client, this.mutationId = e.mutationId, this.#r = e.mutationCache, this.#t = [], this.state = e.state || ut(), this.setOptions(e.options), this.scheduleGc();
  }
  setOptions(e) {
    this.options = e, this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(e) {
    this.#t.includes(e) || (this.#t.push(e), this.clearGcTimeout(), this.#r.notify({
      type: "observerAdded",
      mutation: this,
      observer: e
    }));
  }
  removeObserver(e) {
    this.#t = this.#t.filter((t) => t !== e), this.scheduleGc(), this.#r.notify({
      type: "observerRemoved",
      mutation: this,
      observer: e
    });
  }
  optionalRemove() {
    this.#t.length || (this.state.status === "pending" ? this.scheduleGc() : this.#r.remove(this));
  }
  continue() {
    return this.#s?.continue() ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(e) {
    const t = () => {
      this.#i({ type: "continue" });
    }, r = {
      client: this.#e,
      meta: this.options.meta,
      mutationKey: this.options.mutationKey
    };
    this.#s = Ce({
      fn: () => this.options.mutationFn ? this.options.mutationFn(e, r) : Promise.reject(new Error("No mutationFn found")),
      onFail: (i, a) => {
        this.#i({ type: "failed", failureCount: i, error: a });
      },
      onPause: () => {
        this.#i({ type: "pause" });
      },
      onContinue: t,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => this.#r.canRun(this)
    });
    const n = this.state.status === "pending", s = !this.#s.canStart();
    try {
      if (n)
        t();
      else {
        this.#i({ type: "pending", variables: e, isPaused: s }), this.#r.config.onMutate && await this.#r.config.onMutate(
          e,
          this,
          r
        );
        const a = await this.options.onMutate?.(
          e,
          r
        );
        a !== this.state.context && this.#i({
          type: "pending",
          context: a,
          variables: e,
          isPaused: s
        });
      }
      const i = await this.#s.start();
      return await this.#r.config.onSuccess?.(
        i,
        e,
        this.state.context,
        this,
        r
      ), await this.options.onSuccess?.(
        i,
        e,
        this.state.context,
        r
      ), await this.#r.config.onSettled?.(
        i,
        null,
        this.state.variables,
        this.state.context,
        this,
        r
      ), await this.options.onSettled?.(
        i,
        null,
        e,
        this.state.context,
        r
      ), this.#i({ type: "success", data: i }), i;
    } catch (i) {
      try {
        await this.#r.config.onError?.(
          i,
          e,
          this.state.context,
          this,
          r
        );
      } catch (a) {
        Promise.reject(a);
      }
      try {
        await this.options.onError?.(
          i,
          e,
          this.state.context,
          r
        );
      } catch (a) {
        Promise.reject(a);
      }
      try {
        await this.#r.config.onSettled?.(
          void 0,
          i,
          this.state.variables,
          this.state.context,
          this,
          r
        );
      } catch (a) {
        Promise.reject(a);
      }
      try {
        await this.options.onSettled?.(
          void 0,
          i,
          e,
          this.state.context,
          r
        );
      } catch (a) {
        Promise.reject(a);
      }
      throw this.#i({ type: "error", error: i }), i;
    } finally {
      this.#r.runNext(this);
    }
  }
  #i(e) {
    const t = (r) => {
      switch (e.type) {
        case "failed":
          return {
            ...r,
            failureCount: e.failureCount,
            failureReason: e.error
          };
        case "pause":
          return {
            ...r,
            isPaused: !0
          };
        case "continue":
          return {
            ...r,
            isPaused: !1
          };
        case "pending":
          return {
            ...r,
            context: e.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: e.isPaused,
            status: "pending",
            variables: e.variables,
            submittedAt: Date.now()
          };
        case "success":
          return {
            ...r,
            data: e.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: !1
          };
        case "error":
          return {
            ...r,
            data: void 0,
            error: e.error,
            failureCount: r.failureCount + 1,
            failureReason: e.error,
            isPaused: !1,
            status: "error"
          };
      }
    };
    this.state = t(this.state), C.batch(() => {
      this.#t.forEach((r) => {
        r.onMutationUpdate(e);
      }), this.#r.notify({
        mutation: this,
        type: "updated",
        action: e
      });
    });
  }
};
function ut() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}
var ct = class extends k {
  constructor(e = {}) {
    super(), this.config = e, this.#e = /* @__PURE__ */ new Set(), this.#t = /* @__PURE__ */ new Map(), this.#r = 0;
  }
  #e;
  #t;
  #r;
  build(e, t, r) {
    const n = new lt({
      client: e,
      mutationCache: this,
      mutationId: ++this.#r,
      options: e.defaultMutationOptions(t),
      state: r
    });
    return this.add(n), n;
  }
  add(e) {
    this.#e.add(e);
    const t = D(e);
    if (typeof t == "string") {
      const r = this.#t.get(t);
      r ? r.push(e) : this.#t.set(t, [e]);
    }
    this.notify({ type: "added", mutation: e });
  }
  remove(e) {
    if (this.#e.delete(e)) {
      const t = D(e);
      if (typeof t == "string") {
        const r = this.#t.get(t);
        if (r)
          if (r.length > 1) {
            const n = r.indexOf(e);
            n !== -1 && r.splice(n, 1);
          } else r[0] === e && this.#t.delete(t);
      }
    }
    this.notify({ type: "removed", mutation: e });
  }
  canRun(e) {
    const t = D(e);
    if (typeof t == "string") {
      const n = this.#t.get(t)?.find(
        (s) => s.state.status === "pending"
      );
      return !n || n === e;
    } else
      return !0;
  }
  runNext(e) {
    const t = D(e);
    return typeof t == "string" ? this.#t.get(t)?.find((n) => n !== e && n.state.isPaused)?.continue() ?? Promise.resolve() : Promise.resolve();
  }
  clear() {
    C.batch(() => {
      this.#e.forEach((e) => {
        this.notify({ type: "removed", mutation: e });
      }), this.#e.clear(), this.#t.clear();
    });
  }
  getAll() {
    return Array.from(this.#e);
  }
  find(e) {
    const t = { exact: !0, ...e };
    return this.getAll().find(
      (r) => ne(t, r)
    );
  }
  findAll(e = {}) {
    return this.getAll().filter((t) => ne(e, t));
  }
  notify(e) {
    C.batch(() => {
      this.listeners.forEach((t) => {
        t(e);
      });
    });
  }
  resumePausedMutations() {
    const e = this.getAll().filter((t) => t.state.isPaused);
    return C.batch(
      () => Promise.all(
        e.map((t) => t.continue().catch(S))
      )
    );
  }
};
function D(e) {
  return e.options.scope?.id;
}
var ht = class extends k {
  constructor(e = {}) {
    super(), this.config = e, this.#e = /* @__PURE__ */ new Map();
  }
  #e;
  build(e, t, r) {
    const n = t.queryKey, s = t.queryHash ?? X(n, t);
    let i = this.get(s);
    return i || (i = new at({
      client: e,
      queryKey: n,
      queryHash: s,
      options: e.defaultQueryOptions(t),
      state: r,
      defaultOptions: e.getQueryDefaults(n)
    }), this.add(i)), i;
  }
  add(e) {
    this.#e.has(e.queryHash) || (this.#e.set(e.queryHash, e), this.notify({
      type: "added",
      query: e
    }));
  }
  remove(e) {
    const t = this.#e.get(e.queryHash);
    t && (e.destroy(), t === e && this.#e.delete(e.queryHash), this.notify({ type: "removed", query: e }));
  }
  clear() {
    C.batch(() => {
      this.getAll().forEach((e) => {
        this.remove(e);
      });
    });
  }
  get(e) {
    return this.#e.get(e);
  }
  getAll() {
    return [...this.#e.values()];
  }
  find(e) {
    const t = { exact: !0, ...e };
    return this.getAll().find(
      (r) => re(t, r)
    );
  }
  findAll(e = {}) {
    const t = this.getAll();
    return Object.keys(e).length > 0 ? t.filter((r) => re(e, r)) : t;
  }
  notify(e) {
    C.batch(() => {
      this.listeners.forEach((t) => {
        t(e);
      });
    });
  }
  onFocus() {
    C.batch(() => {
      this.getAll().forEach((e) => {
        e.onFocus();
      });
    });
  }
  onOnline() {
    C.batch(() => {
      this.getAll().forEach((e) => {
        e.onOnline();
      });
    });
  }
}, yr = class {
  #e;
  #t;
  #r;
  #s;
  #i;
  #n;
  #l;
  #a;
  constructor(e = {}) {
    this.#e = e.queryCache || new ht(), this.#t = e.mutationCache || new ct(), this.#r = e.defaultOptions || {}, this.#s = /* @__PURE__ */ new Map(), this.#i = /* @__PURE__ */ new Map(), this.#n = 0;
  }
  mount() {
    this.#n++, this.#n === 1 && (this.#l = ye.subscribe(async (e) => {
      e && (await this.resumePausedMutations(), this.#e.onFocus());
    }), this.#a = Q.subscribe(async (e) => {
      e && (await this.resumePausedMutations(), this.#e.onOnline());
    }));
  }
  unmount() {
    this.#n--, this.#n === 0 && (this.#l?.(), this.#l = void 0, this.#a?.(), this.#a = void 0);
  }
  isFetching(e) {
    return this.#e.findAll({ ...e, fetchStatus: "fetching" }).length;
  }
  isMutating(e) {
    return this.#t.findAll({ ...e, status: "pending" }).length;
  }
  /**
   * Imperative (non-reactive) way to retrieve data for a QueryKey.
   * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
   *
   * Hint: Do not use this function inside a component, because it won't receive updates.
   * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
   */
  getQueryData(e) {
    const t = this.defaultQueryOptions({ queryKey: e });
    return this.#e.get(t.queryHash)?.state.data;
  }
  ensureQueryData(e) {
    const t = this.defaultQueryOptions(e), r = this.#e.build(this, t), n = r.state.data;
    return n === void 0 ? this.fetchQuery(e) : (e.revalidateIfStale && r.isStaleByTime($(t.staleTime, r)) && this.prefetchQuery(t), Promise.resolve(n));
  }
  getQueriesData(e) {
    return this.#e.findAll(e).map(({ queryKey: t, state: r }) => {
      const n = r.data;
      return [t, n];
    });
  }
  setQueryData(e, t, r) {
    const n = this.defaultQueryOptions({ queryKey: e }), i = this.#e.get(
      n.queryHash
    )?.state.data, a = Ke(t, i);
    if (a !== void 0)
      return this.#e.build(this, n).setData(a, { ...r, manual: !0 });
  }
  setQueriesData(e, t, r) {
    return C.batch(
      () => this.#e.findAll(e).map(({ queryKey: n }) => [
        n,
        this.setQueryData(n, t, r)
      ])
    );
  }
  getQueryState(e) {
    const t = this.defaultQueryOptions({ queryKey: e });
    return this.#e.get(
      t.queryHash
    )?.state;
  }
  removeQueries(e) {
    const t = this.#e;
    C.batch(() => {
      t.findAll(e).forEach((r) => {
        t.remove(r);
      });
    });
  }
  resetQueries(e, t) {
    const r = this.#e;
    return C.batch(() => (r.findAll(e).forEach((n) => {
      n.reset();
    }), this.refetchQueries(
      {
        type: "active",
        ...e
      },
      t
    )));
  }
  cancelQueries(e, t = {}) {
    const r = { revert: !0, ...t }, n = C.batch(
      () => this.#e.findAll(e).map((s) => s.cancel(r))
    );
    return Promise.all(n).then(S).catch(S);
  }
  invalidateQueries(e, t = {}) {
    return C.batch(() => (this.#e.findAll(e).forEach((r) => {
      r.invalidate();
    }), e?.refetchType === "none" ? Promise.resolve() : this.refetchQueries(
      {
        ...e,
        type: e?.refetchType ?? e?.type ?? "active"
      },
      t
    )));
  }
  refetchQueries(e, t = {}) {
    const r = {
      ...t,
      cancelRefetch: t.cancelRefetch ?? !0
    }, n = C.batch(
      () => this.#e.findAll(e).filter((s) => !s.isDisabled() && !s.isStatic()).map((s) => {
        let i = s.fetch(void 0, r);
        return r.throwOnError || (i = i.catch(S)), s.state.fetchStatus === "paused" ? Promise.resolve() : i;
      })
    );
    return Promise.all(n).then(S);
  }
  fetchQuery(e) {
    const t = this.defaultQueryOptions(e);
    t.retry === void 0 && (t.retry = !1);
    const r = this.#e.build(this, t);
    return r.isStaleByTime(
      $(t.staleTime, r)
    ) ? r.fetch(t) : Promise.resolve(r.state.data);
  }
  prefetchQuery(e) {
    return this.fetchQuery(e).then(S).catch(S);
  }
  fetchInfiniteQuery(e) {
    return e._type = "infinite", this.fetchQuery(e);
  }
  prefetchInfiniteQuery(e) {
    return this.fetchInfiniteQuery(e).then(S).catch(S);
  }
  ensureInfiniteQueryData(e) {
    return e._type = "infinite", this.ensureQueryData(e);
  }
  resumePausedMutations() {
    return Q.isOnline() ? this.#t.resumePausedMutations() : Promise.resolve();
  }
  getQueryCache() {
    return this.#e;
  }
  getMutationCache() {
    return this.#t;
  }
  getDefaultOptions() {
    return this.#r;
  }
  setDefaultOptions(e) {
    this.#r = e;
  }
  setQueryDefaults(e, t) {
    this.#s.set(I(e), {
      queryKey: e,
      defaultOptions: t
    });
  }
  getQueryDefaults(e) {
    const t = [...this.#s.values()], r = {};
    return t.forEach((n) => {
      U(e, n.queryKey) && Object.assign(r, n.defaultOptions);
    }), r;
  }
  setMutationDefaults(e, t) {
    this.#i.set(I(e), {
      mutationKey: e,
      defaultOptions: t
    });
  }
  getMutationDefaults(e) {
    const t = [...this.#i.values()], r = {};
    return t.forEach((n) => {
      U(e, n.mutationKey) && Object.assign(r, n.defaultOptions);
    }), r;
  }
  defaultQueryOptions(e) {
    if (e._defaulted)
      return e;
    const t = {
      ...this.#r.queries,
      ...this.getQueryDefaults(e.queryKey),
      ...e,
      _defaulted: !0
    };
    return t.queryHash || (t.queryHash = X(
      t.queryKey,
      t
    )), t.refetchOnReconnect === void 0 && (t.refetchOnReconnect = t.networkMode !== "always"), t.throwOnError === void 0 && (t.throwOnError = !!t.suspense), !t.networkMode && t.persister && (t.networkMode = "offlineFirst"), t.queryFn === Z && (t.enabled = !1), t;
  }
  defaultMutationOptions(e) {
    return e?._defaulted ? e : {
      ...this.#r.mutations,
      ...e?.mutationKey && this.getMutationDefaults(e.mutationKey),
      ...e,
      _defaulted: !0
    };
  }
  clear() {
    this.#e.clear(), this.#t.clear();
  }
}, ft = h.createContext(
  void 0
), vr = ({
  client: e,
  children: t
}) => (h.useEffect(() => (e.mount(), () => {
  e.unmount();
}), [e]), /* @__PURE__ */ De.jsx(ft.Provider, { value: e, children: t }));
/**
 * @remix-run/router v1.23.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function q() {
  return q = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, q.apply(null, arguments);
}
var x;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(x || (x = {}));
function dt(e) {
  e === void 0 && (e = {});
  let {
    initialEntries: t = ["/"],
    initialIndex: r,
    v5Compat: n = !1
  } = e, s;
  s = t.map((d, p) => f(d, typeof d == "string" ? null : d.state, p === 0 ? "default" : void 0));
  let i = o(r ?? s.length - 1), a = x.Pop, l = null;
  function o(d) {
    return Math.min(Math.max(d, 0), s.length - 1);
  }
  function c() {
    return s[i];
  }
  function f(d, p, m) {
    p === void 0 && (p = null);
    let v = mt(s ? c().pathname : "/", d, p, m);
    return B(v.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(d)), v;
  }
  function u(d) {
    return typeof d == "string" ? d : z(d);
  }
  return {
    get index() {
      return i;
    },
    get action() {
      return a;
    },
    get location() {
      return c();
    },
    createHref: u,
    createURL(d) {
      return new URL(u(d), "http://localhost");
    },
    encodeLocation(d) {
      let p = typeof d == "string" ? M(d) : d;
      return {
        pathname: p.pathname || "",
        search: p.search || "",
        hash: p.hash || ""
      };
    },
    push(d, p) {
      a = x.Push;
      let m = f(d, p);
      i += 1, s.splice(i, s.length, m), n && l && l({
        action: a,
        location: m,
        delta: 1
      });
    },
    replace(d, p) {
      a = x.Replace;
      let m = f(d, p);
      s[i] = m, n && l && l({
        action: a,
        location: m,
        delta: 0
      });
    },
    go(d) {
      a = x.Pop;
      let p = o(i + d), m = s[p];
      i = p, l && l({
        action: a,
        location: m,
        delta: d
      });
    },
    listen(d) {
      return l = d, () => {
        l = null;
      };
    }
  };
}
function b(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function B(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function pt() {
  return Math.random().toString(36).substr(2, 8);
}
function mt(e, t, r, n) {
  return r === void 0 && (r = null), q({
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: ""
  }, typeof t == "string" ? M(t) : t, {
    state: r,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: t && t.key || n || pt()
  });
}
function z(e) {
  let {
    pathname: t = "/",
    search: r = "",
    hash: n = ""
  } = e;
  return r && r !== "?" && (t += r.charAt(0) === "?" ? r : "?" + r), n && n !== "#" && (t += n.charAt(0) === "#" ? n : "#" + n), t;
}
function M(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (t.hash = e.substr(r), e = e.substr(0, r));
    let n = e.indexOf("?");
    n >= 0 && (t.search = e.substr(n), e = e.substr(0, n)), e && (t.pathname = e);
  }
  return t;
}
var ue;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(ue || (ue = {}));
function yt(e, t, r) {
  return r === void 0 && (r = "/"), vt(e, t, r);
}
function vt(e, t, r, n) {
  let s = typeof t == "string" ? M(t) : t, i = Y(s.pathname || "/", r);
  if (i == null)
    return null;
  let a = Se(e);
  gt(a);
  let l = null, o = Tt(i);
  for (let c = 0; l == null && c < a.length; ++c)
    l = Rt(a[c], o);
  return l;
}
function Se(e, t, r, n) {
  t === void 0 && (t = []), r === void 0 && (r = []), n === void 0 && (n = "");
  let s = (i, a, l) => {
    let o = {
      relativePath: l === void 0 ? i.path || "" : l,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: a,
      route: i
    };
    o.relativePath.startsWith("/") && (b(o.relativePath.startsWith(n), 'Absolute route path "' + o.relativePath + '" nested under path ' + ('"' + n + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), o.relativePath = o.relativePath.slice(n.length));
    let c = O([n, o.relativePath]), f = r.concat(o);
    i.children && i.children.length > 0 && (b(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      i.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + c + '".')
    ), Se(i.children, t, f, c)), !(i.path == null && !i.index) && t.push({
      path: c,
      score: xt(c, i.index),
      routesMeta: f
    });
  };
  return e.forEach((i, a) => {
    var l;
    if (i.path === "" || !((l = i.path) != null && l.includes("?")))
      s(i, a);
    else
      for (let o of Ee(i.path))
        s(i, a, o);
  }), t;
}
function Ee(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [r, ...n] = t, s = r.endsWith("?"), i = r.replace(/\?$/, "");
  if (n.length === 0)
    return s ? [i, ""] : [i];
  let a = Ee(n.join("/")), l = [];
  return l.push(...a.map((o) => o === "" ? i : [i, o].join("/"))), s && l.push(...a), l.map((o) => e.startsWith("/") && o === "" ? "/" : o);
}
function gt(e) {
  e.sort((t, r) => t.score !== r.score ? r.score - t.score : Ot(t.routesMeta.map((n) => n.childrenIndex), r.routesMeta.map((n) => n.childrenIndex)));
}
const bt = /^:[\w-]+$/, Pt = 3, Ct = 2, wt = 1, St = 10, Et = -2, ce = (e) => e === "*";
function xt(e, t) {
  let r = e.split("/"), n = r.length;
  return r.some(ce) && (n += Et), t && (n += Ct), r.filter((s) => !ce(s)).reduce((s, i) => s + (bt.test(i) ? Pt : i === "" ? wt : St), n);
}
function Ot(e, t) {
  return e.length === t.length && e.slice(0, -1).every((n, s) => n === t[s]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    e[e.length - 1] - t[t.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function Rt(e, t, r) {
  let {
    routesMeta: n
  } = e, s = {}, i = "/", a = [];
  for (let l = 0; l < n.length; ++l) {
    let o = n[l], c = l === n.length - 1, f = i === "/" ? t : t.slice(i.length) || "/", u = Ft({
      path: o.relativePath,
      caseSensitive: o.caseSensitive,
      end: c
    }, f), y = o.route;
    if (!u)
      return null;
    Object.assign(s, u.params), a.push({
      // TODO: Can this as be avoided?
      params: s,
      pathname: O([i, u.pathname]),
      pathnameBase: jt(O([i, u.pathnameBase])),
      route: y
    }), u.pathnameBase !== "/" && (i = O([i, u.pathnameBase]));
  }
  return a;
}
function Ft(e, t) {
  typeof e == "string" && (e = {
    path: e,
    caseSensitive: !1,
    end: !0
  });
  let [r, n] = Mt(e.path, e.caseSensitive, e.end), s = t.match(r);
  if (!s) return null;
  let i = s[0], a = i.replace(/(.)\/+$/, "$1"), l = s.slice(1);
  return {
    params: n.reduce((c, f, u) => {
      let {
        paramName: y,
        isOptional: d
      } = f;
      if (y === "*") {
        let m = l[u] || "";
        a = i.slice(0, i.length - m.length).replace(/(.)\/+$/, "$1");
      }
      const p = l[u];
      return d && !p ? c[y] = void 0 : c[y] = (p || "").replace(/%2F/g, "/"), c;
    }, {}),
    pathname: i,
    pathnameBase: a,
    pattern: e
  };
}
function Mt(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !0), B(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let n = [], s = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (a, l, o) => (n.push({
    paramName: l,
    isOptional: o != null
  }), o ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return e.endsWith("*") ? (n.push({
    paramName: "*"
  }), s += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? s += "\\/*$" : e !== "" && e !== "/" && (s += "(?:(?=\\/|$))"), [new RegExp(s, t ? void 0 : "i"), n];
}
function Tt(e) {
  try {
    return e.split("/").map((t) => decodeURIComponent(t).replace(/\//g, "%2F")).join("/");
  } catch (t) {
    return B(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + t + ").")), e;
  }
}
function Y(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length, n = e.charAt(r);
  return n && n !== "/" ? null : e.slice(r) || "/";
}
const It = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Ut = (e) => It.test(e);
function At(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: r,
    search: n = "",
    hash: s = ""
  } = typeof e == "string" ? M(e) : e, i;
  if (r)
    if (Ut(r))
      i = r;
    else {
      if (r.includes("//")) {
        let a = r;
        r = Re(r), B(!1, "Pathnames cannot have embedded double slashes - normalizing " + (a + " -> " + r));
      }
      r.startsWith("/") ? i = he(r.substring(1), "/") : i = he(r, t);
    }
  else
    i = t;
  return {
    pathname: i,
    search: Dt(n),
    hash: Qt(s)
  };
}
function he(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((s) => {
    s === ".." ? r.length > 1 && r.pop() : s !== "." && r.push(s);
  }), r.length > 1 ? r.join("/") : "/";
}
function _(e, t, r, n) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(n) + "].  Please separate it out to the ") + ("`to." + r + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function Lt(e) {
  return e.filter((t, r) => r === 0 || t.route.path && t.route.path.length > 0);
}
function xe(e, t) {
  let r = Lt(e);
  return t ? r.map((n, s) => s === r.length - 1 ? n.pathname : n.pathnameBase) : r.map((n) => n.pathnameBase);
}
function Oe(e, t, r, n) {
  n === void 0 && (n = !1);
  let s;
  typeof e == "string" ? s = M(e) : (s = q({}, e), b(!s.pathname || !s.pathname.includes("?"), _("?", "pathname", "search", s)), b(!s.pathname || !s.pathname.includes("#"), _("#", "pathname", "hash", s)), b(!s.search || !s.search.includes("#"), _("#", "search", "hash", s)));
  let i = e === "" || s.pathname === "", a = i ? "/" : s.pathname, l;
  if (a == null)
    l = r;
  else {
    let u = t.length - 1;
    if (!n && a.startsWith("..")) {
      let y = a.split("/");
      for (; y[0] === ".."; )
        y.shift(), u -= 1;
      s.pathname = y.join("/");
    }
    l = u >= 0 ? t[u] : "/";
  }
  let o = At(s, l), c = a && a !== "/" && a.endsWith("/"), f = (i || a === ".") && r.endsWith("/");
  return !o.pathname.endsWith("/") && (c || f) && (o.pathname += "/"), o;
}
const Re = (e) => e.replace(/\/\/+/g, "/"), O = (e) => Re(e.join("/")), jt = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), Dt = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, Qt = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
function qt(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
const Fe = ["post", "put", "patch", "delete"];
new Set(Fe);
const kt = ["get", ...Fe];
new Set(kt);
/**
 * React Router v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function A() {
  return A = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, A.apply(null, arguments);
}
const ee = /* @__PURE__ */ h.createContext(null), Bt = /* @__PURE__ */ h.createContext(null), T = /* @__PURE__ */ h.createContext(null), N = /* @__PURE__ */ h.createContext(null), R = /* @__PURE__ */ h.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
}), Me = /* @__PURE__ */ h.createContext(null);
function Nt(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t;
  L() || b(!1);
  let {
    basename: n,
    navigator: s
  } = h.useContext(T), {
    hash: i,
    pathname: a,
    search: l
  } = Ue(e, {
    relative: r
  }), o = a;
  return n !== "/" && (o = a === "/" ? n : O([n, a])), s.createHref({
    pathname: o,
    search: l,
    hash: i
  });
}
function L() {
  return h.useContext(N) != null;
}
function j() {
  return L() || b(!1), h.useContext(N).location;
}
function Te(e) {
  h.useContext(T).static || h.useLayoutEffect(e);
}
function Ie() {
  let {
    isDataRoute: e
  } = h.useContext(R);
  return e ? er() : _t();
}
function _t() {
  L() || b(!1);
  let e = h.useContext(ee), {
    basename: t,
    future: r,
    navigator: n
  } = h.useContext(T), {
    matches: s
  } = h.useContext(R), {
    pathname: i
  } = j(), a = JSON.stringify(xe(s, r.v7_relativeSplatPath)), l = h.useRef(!1);
  return Te(() => {
    l.current = !0;
  }), h.useCallback(function(c, f) {
    if (f === void 0 && (f = {}), !l.current) return;
    if (typeof c == "number") {
      n.go(c);
      return;
    }
    let u = Oe(c, JSON.parse(a), i, f.relative === "path");
    e == null && t !== "/" && (u.pathname = u.pathname === "/" ? t : O([t, u.pathname])), (f.replace ? n.replace : n.push)(u, f.state, f);
  }, [t, n, a, i, e]);
}
function gr() {
  let {
    matches: e
  } = h.useContext(R), t = e[e.length - 1];
  return t ? t.params : {};
}
function Ue(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    future: n
  } = h.useContext(T), {
    matches: s
  } = h.useContext(R), {
    pathname: i
  } = j(), a = JSON.stringify(xe(s, n.v7_relativeSplatPath));
  return h.useMemo(() => Oe(e, JSON.parse(a), i, r === "path"), [e, a, i, r]);
}
function Kt(e, t) {
  return $t(e, t);
}
function $t(e, t, r, n) {
  L() || b(!1);
  let {
    navigator: s
  } = h.useContext(T), {
    matches: i
  } = h.useContext(R), a = i[i.length - 1], l = a ? a.params : {};
  a && a.pathname;
  let o = a ? a.pathnameBase : "/";
  a && a.route;
  let c = j(), f;
  if (t) {
    var u;
    let v = typeof t == "string" ? M(t) : t;
    o === "/" || (u = v.pathname) != null && u.startsWith(o) || b(!1), f = v;
  } else
    f = c;
  let y = f.pathname || "/", d = y;
  if (o !== "/") {
    let v = o.replace(/^\//, "").split("/");
    d = "/" + y.replace(/^\//, "").split("/").slice(v.length).join("/");
  }
  let p = yt(e, {
    pathname: d
  }), m = Vt(p && p.map((v) => Object.assign({}, v, {
    params: Object.assign({}, l, v.params),
    pathname: O([
      o,
      // Re-encode pathnames that were decoded inside matchRoutes
      s.encodeLocation ? s.encodeLocation(v.pathname).pathname : v.pathname
    ]),
    pathnameBase: v.pathnameBase === "/" ? o : O([
      o,
      // Re-encode pathnames that were decoded inside matchRoutes
      s.encodeLocation ? s.encodeLocation(v.pathnameBase).pathname : v.pathnameBase
    ])
  })), i, r, n);
  return t && m ? /* @__PURE__ */ h.createElement(N.Provider, {
    value: {
      location: A({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, f),
      navigationType: x.Pop
    }
  }, m) : m;
}
function Wt() {
  let e = Yt(), t = qt(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, s = {
    padding: "0.5rem",
    backgroundColor: "rgba(200,200,200, 0.5)"
  };
  return /* @__PURE__ */ h.createElement(h.Fragment, null, /* @__PURE__ */ h.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ h.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, t), r ? /* @__PURE__ */ h.createElement("pre", {
    style: s
  }, r) : null, null);
}
const Gt = /* @__PURE__ */ h.createElement(Wt, null);
class zt extends h.Component {
  constructor(t) {
    super(t), this.state = {
      location: t.location,
      revalidation: t.revalidation,
      error: t.error
    };
  }
  static getDerivedStateFromError(t) {
    return {
      error: t
    };
  }
  static getDerivedStateFromProps(t, r) {
    return r.location !== t.location || r.revalidation !== "idle" && t.revalidation === "idle" ? {
      error: t.error,
      location: t.location,
      revalidation: t.revalidation
    } : {
      error: t.error !== void 0 ? t.error : r.error,
      location: r.location,
      revalidation: t.revalidation || r.revalidation
    };
  }
  componentDidCatch(t, r) {
    console.error("React Router caught the following error during render", t, r);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ h.createElement(R.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ h.createElement(Me.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function Ht(e) {
  let {
    routeContext: t,
    match: r,
    children: n
  } = e, s = h.useContext(ee);
  return s && s.static && s.staticContext && (r.route.errorElement || r.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = r.route.id), /* @__PURE__ */ h.createElement(R.Provider, {
    value: t
  }, n);
}
function Vt(e, t, r, n) {
  var s;
  if (t === void 0 && (t = []), r === void 0 && (r = null), n === void 0 && (n = null), e == null) {
    var i;
    if (!r)
      return null;
    if (r.errors)
      e = r.matches;
    else if ((i = n) != null && i.v7_partialHydration && t.length === 0 && !r.initialized && r.matches.length > 0)
      e = r.matches;
    else
      return null;
  }
  let a = e, l = (s = r) == null ? void 0 : s.errors;
  if (l != null) {
    let f = a.findIndex((u) => u.route.id && l?.[u.route.id] !== void 0);
    f >= 0 || b(!1), a = a.slice(0, Math.min(a.length, f + 1));
  }
  let o = !1, c = -1;
  if (r && n && n.v7_partialHydration)
    for (let f = 0; f < a.length; f++) {
      let u = a[f];
      if ((u.route.HydrateFallback || u.route.hydrateFallbackElement) && (c = f), u.route.id) {
        let {
          loaderData: y,
          errors: d
        } = r, p = u.route.loader && y[u.route.id] === void 0 && (!d || d[u.route.id] === void 0);
        if (u.route.lazy || p) {
          o = !0, c >= 0 ? a = a.slice(0, c + 1) : a = [a[0]];
          break;
        }
      }
    }
  return a.reduceRight((f, u, y) => {
    let d, p = !1, m = null, v = null;
    r && (d = l && u.route.id ? l[u.route.id] : void 0, m = u.route.errorElement || Gt, o && (c < 0 && y === 0 ? (tr("route-fallback"), p = !0, v = null) : c === y && (p = !0, v = u.route.hydrateFallbackElement || null)));
    let P = t.concat(a.slice(0, y + 1)), w = () => {
      let g;
      return d ? g = m : p ? g = v : u.route.Component ? g = /* @__PURE__ */ h.createElement(u.route.Component, null) : u.route.element ? g = u.route.element : g = f, /* @__PURE__ */ h.createElement(Ht, {
        match: u,
        routeContext: {
          outlet: f,
          matches: P,
          isDataRoute: r != null
        },
        children: g
      });
    };
    return r && (u.route.ErrorBoundary || u.route.errorElement || y === 0) ? /* @__PURE__ */ h.createElement(zt, {
      location: r.location,
      revalidation: r.revalidation,
      component: m,
      error: d,
      children: w(),
      routeContext: {
        outlet: null,
        matches: P,
        isDataRoute: !0
      }
    }) : w();
  }, null);
}
var Ae = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e;
}(Ae || {}), Le = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e;
}(Le || {});
function Jt(e) {
  let t = h.useContext(ee);
  return t || b(!1), t;
}
function Xt(e) {
  let t = h.useContext(Bt);
  return t || b(!1), t;
}
function Zt(e) {
  let t = h.useContext(R);
  return t || b(!1), t;
}
function je(e) {
  let t = Zt(), r = t.matches[t.matches.length - 1];
  return r.route.id || b(!1), r.route.id;
}
function Yt() {
  var e;
  let t = h.useContext(Me), r = Xt(), n = je();
  return t !== void 0 ? t : (e = r.errors) == null ? void 0 : e[n];
}
function er() {
  let {
    router: e
  } = Jt(Ae.UseNavigateStable), t = je(Le.UseNavigateStable), r = h.useRef(!1);
  return Te(() => {
    r.current = !0;
  }), h.useCallback(function(s, i) {
    i === void 0 && (i = {}), r.current && (typeof s == "number" ? e.navigate(s) : e.navigate(s, A({
      fromRouteId: t
    }, i)));
  }, [e, t]);
}
const fe = {};
function tr(e, t, r) {
  fe[e] || (fe[e] = !0);
}
function rr(e, t) {
  e?.v7_startTransition, e?.v7_relativeSplatPath;
}
const nr = "startTransition", de = Qe[nr];
function br(e) {
  let {
    basename: t,
    children: r,
    initialEntries: n,
    initialIndex: s,
    future: i
  } = e, a = h.useRef();
  a.current == null && (a.current = dt({
    initialEntries: n,
    initialIndex: s,
    v5Compat: !0
  }));
  let l = a.current, [o, c] = h.useState({
    action: l.action,
    location: l.location
  }), {
    v7_startTransition: f
  } = i || {}, u = h.useCallback((y) => {
    f && de ? de(() => c(y)) : c(y);
  }, [c, f]);
  return h.useLayoutEffect(() => l.listen(u), [l, u]), h.useEffect(() => rr(i), [i]), /* @__PURE__ */ h.createElement(ir, {
    basename: t,
    children: r,
    location: o.location,
    navigationType: o.action,
    navigator: l,
    future: i
  });
}
function sr(e) {
  b(!1);
}
function ir(e) {
  let {
    basename: t = "/",
    children: r = null,
    location: n,
    navigationType: s = x.Pop,
    navigator: i,
    static: a = !1,
    future: l
  } = e;
  L() && b(!1);
  let o = t.replace(/^\/*/, "/"), c = h.useMemo(() => ({
    basename: o,
    navigator: i,
    static: a,
    future: A({
      v7_relativeSplatPath: !1
    }, l)
  }), [o, l, i, a]);
  typeof n == "string" && (n = M(n));
  let {
    pathname: f = "/",
    search: u = "",
    hash: y = "",
    state: d = null,
    key: p = "default"
  } = n, m = h.useMemo(() => {
    let v = Y(f, o);
    return v == null ? null : {
      location: {
        pathname: v,
        search: u,
        hash: y,
        state: d,
        key: p
      },
      navigationType: s
    };
  }, [o, f, u, y, d, p, s]);
  return m == null ? null : /* @__PURE__ */ h.createElement(T.Provider, {
    value: c
  }, /* @__PURE__ */ h.createElement(N.Provider, {
    children: r,
    value: m
  }));
}
function Pr(e) {
  let {
    children: t,
    location: r
  } = e;
  return Kt(H(t), r);
}
new Promise(() => {
});
function H(e, t) {
  t === void 0 && (t = []);
  let r = [];
  return h.Children.forEach(e, (n, s) => {
    if (!/* @__PURE__ */ h.isValidElement(n))
      return;
    let i = [...t, s];
    if (n.type === h.Fragment) {
      r.push.apply(r, H(n.props.children, i));
      return;
    }
    n.type !== sr && b(!1), !n.props.index || !n.props.children || b(!1);
    let a = {
      id: n.props.id || i.join("-"),
      caseSensitive: n.props.caseSensitive,
      element: n.props.element,
      Component: n.props.Component,
      index: n.props.index,
      path: n.props.path,
      loader: n.props.loader,
      action: n.props.action,
      errorElement: n.props.errorElement,
      ErrorBoundary: n.props.ErrorBoundary,
      hasErrorBoundary: n.props.ErrorBoundary != null || n.props.errorElement != null,
      shouldRevalidate: n.props.shouldRevalidate,
      handle: n.props.handle,
      lazy: n.props.lazy
    };
    n.props.children && (a.children = H(n.props.children, i)), r.push(a);
  }), r;
}
/**
 * React Router DOM v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function V() {
  return V = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, V.apply(null, arguments);
}
function ar(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function or(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function lr(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !or(e);
}
function J(e) {
  return e === void 0 && (e = ""), new URLSearchParams(typeof e == "string" || Array.isArray(e) || e instanceof URLSearchParams ? e : Object.keys(e).reduce((t, r) => {
    let n = e[r];
    return t.concat(Array.isArray(n) ? n.map((s) => [r, s]) : [[r, n]]);
  }, []));
}
function ur(e, t) {
  let r = J(e);
  return t && t.forEach((n, s) => {
    r.has(s) || t.getAll(s).forEach((i) => {
      r.append(s, i);
    });
  }), r;
}
const cr = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], hr = "6";
try {
  window.__reactRouterVersion = hr;
} catch {
}
const fr = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", dr = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Cr = /* @__PURE__ */ h.forwardRef(function(t, r) {
  let {
    onClick: n,
    relative: s,
    reloadDocument: i,
    replace: a,
    state: l,
    target: o,
    to: c,
    preventScrollReset: f,
    viewTransition: u
  } = t, y = ar(t, cr), {
    basename: d
  } = h.useContext(T), p, m = !1;
  if (typeof c == "string" && dr.test(c) && (p = c, fr))
    try {
      let g = new URL(window.location.href), E = c.startsWith("//") ? new URL(g.protocol + c) : new URL(c), F = Y(E.pathname, d);
      E.origin === g.origin && F != null ? c = F + E.search + E.hash : m = !0;
    } catch {
    }
  let v = Nt(c, {
    relative: s
  }), P = pr(c, {
    replace: a,
    state: l,
    target: o,
    preventScrollReset: f,
    relative: s,
    viewTransition: u
  });
  function w(g) {
    n && n(g), g.defaultPrevented || P(g);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ h.createElement("a", V({}, y, {
      href: p || v,
      onClick: m || i ? n : w,
      ref: r,
      target: o
    }))
  );
});
var pe;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState";
})(pe || (pe = {}));
var me;
(function(e) {
  e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(me || (me = {}));
function pr(e, t) {
  let {
    target: r,
    replace: n,
    state: s,
    preventScrollReset: i,
    relative: a,
    viewTransition: l
  } = t === void 0 ? {} : t, o = Ie(), c = j(), f = Ue(e, {
    relative: a
  });
  return h.useCallback((u) => {
    if (lr(u, r)) {
      u.preventDefault();
      let y = n !== void 0 ? n : z(c) === z(f);
      o(e, {
        replace: y,
        state: s,
        preventScrollReset: i,
        relative: a,
        viewTransition: l
      });
    }
  }, [c, o, f, n, s, r, e, i, a, l]);
}
function wr(e) {
  let t = h.useRef(J(e)), r = h.useRef(!1), n = j(), s = h.useMemo(() => (
    // Only merge in the defaults if we haven't yet called setSearchParams.
    // Once we call that we want those to take precedence, otherwise you can't
    // remove a param with setSearchParams({}) if it has an initial value
    ur(n.search, r.current ? null : t.current)
  ), [n.search]), i = Ie(), a = h.useCallback((l, o) => {
    const c = J(typeof l == "function" ? l(s) : l);
    r.current = !0, i("?" + c, o);
  }, [i, s]);
  return [s, a];
}
export {
  Cr as L,
  br as M,
  yr as Q,
  Pr as R,
  j as a,
  gr as b,
  wr as c,
  vr as d,
  sr as e,
  Ie as u
};
