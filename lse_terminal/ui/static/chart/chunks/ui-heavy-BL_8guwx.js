import { g as m, r as _, i as Cn, j as f } from "./react-vendor-C0yw3i6b.js";
var Sn = (e) => {
  switch (e) {
    case "success":
      return Tn;
    case "info":
      return En;
    case "warning":
      return jn;
    case "error":
      return Wn;
    default:
      return null;
  }
}, On = Array(12).fill(0), Pn = ({ visible: e, className: t }) => m.createElement("div", { className: ["sonner-loading-wrapper", t].filter(Boolean).join(" "), "data-visible": e }, m.createElement("div", { className: "sonner-spinner" }, On.map((n, a) => m.createElement("div", { className: "sonner-loading-bar", key: `spinner-bar-${a}` })))), Tn = m.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, m.createElement("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z", clipRule: "evenodd" })), jn = m.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", height: "20", width: "20" }, m.createElement("path", { fillRule: "evenodd", d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z", clipRule: "evenodd" })), En = m.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, m.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z", clipRule: "evenodd" })), Wn = m.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, m.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z", clipRule: "evenodd" })), Yn = m.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, m.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), m.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" })), Fn = () => {
  let [e, t] = m.useState(document.hidden);
  return m.useEffect(() => {
    let n = () => {
      t(document.hidden);
    };
    return document.addEventListener("visibilitychange", n), () => window.removeEventListener("visibilitychange", n);
  }, []), e;
}, dt = 1, In = class {
  constructor() {
    this.subscribe = (e) => (this.subscribers.push(e), () => {
      let t = this.subscribers.indexOf(e);
      this.subscribers.splice(t, 1);
    }), this.publish = (e) => {
      this.subscribers.forEach((t) => t(e));
    }, this.addToast = (e) => {
      this.publish(e), this.toasts = [...this.toasts, e];
    }, this.create = (e) => {
      var t;
      let { message: n, ...a } = e, r = typeof e?.id == "number" || ((t = e.id) == null ? void 0 : t.length) > 0 ? e.id : dt++, o = this.toasts.find((i) => i.id === r), s = e.dismissible === void 0 ? !0 : e.dismissible;
      return this.dismissedToasts.has(r) && this.dismissedToasts.delete(r), o ? this.toasts = this.toasts.map((i) => i.id === r ? (this.publish({ ...i, ...e, id: r, title: n }), { ...i, ...e, id: r, dismissible: s, title: n }) : i) : this.addToast({ title: n, ...a, dismissible: s, id: r }), r;
    }, this.dismiss = (e) => (this.dismissedToasts.add(e), e || this.toasts.forEach((t) => {
      this.subscribers.forEach((n) => n({ id: t.id, dismiss: !0 }));
    }), this.subscribers.forEach((t) => t({ id: e, dismiss: !0 })), e), this.message = (e, t) => this.create({ ...t, message: e }), this.error = (e, t) => this.create({ ...t, message: e, type: "error" }), this.success = (e, t) => this.create({ ...t, type: "success", message: e }), this.info = (e, t) => this.create({ ...t, type: "info", message: e }), this.warning = (e, t) => this.create({ ...t, type: "warning", message: e }), this.loading = (e, t) => this.create({ ...t, type: "loading", message: e }), this.promise = (e, t) => {
      if (!t) return;
      let n;
      t.loading !== void 0 && (n = this.create({ ...t, promise: e, type: "loading", message: t.loading, description: typeof t.description != "function" ? t.description : void 0 }));
      let a = e instanceof Promise ? e : e(), r = n !== void 0, o, s = a.then(async (u) => {
        if (o = ["resolve", u], m.isValidElement(u)) r = !1, this.create({ id: n, type: "default", message: u });
        else if (Rn(u) && !u.ok) {
          r = !1;
          let d = typeof t.error == "function" ? await t.error(`HTTP error! status: ${u.status}`) : t.error, c = typeof t.description == "function" ? await t.description(`HTTP error! status: ${u.status}`) : t.description;
          this.create({ id: n, type: "error", message: d, description: c });
        } else if (t.success !== void 0) {
          r = !1;
          let d = typeof t.success == "function" ? await t.success(u) : t.success, c = typeof t.description == "function" ? await t.description(u) : t.description;
          this.create({ id: n, type: "success", message: d, description: c });
        }
      }).catch(async (u) => {
        if (o = ["reject", u], t.error !== void 0) {
          r = !1;
          let d = typeof t.error == "function" ? await t.error(u) : t.error, c = typeof t.description == "function" ? await t.description(u) : t.description;
          this.create({ id: n, type: "error", message: d, description: c });
        }
      }).finally(() => {
        var u;
        r && (this.dismiss(n), n = void 0), (u = t.finally) == null || u.call(t);
      }), i = () => new Promise((u, d) => s.then(() => o[0] === "reject" ? d(o[1]) : u(o[1])).catch(d));
      return typeof n != "string" && typeof n != "number" ? { unwrap: i } : Object.assign(n, { unwrap: i });
    }, this.custom = (e, t) => {
      let n = t?.id || dt++;
      return this.create({ jsx: e(n), id: n, ...t }), n;
    }, this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}, H = new In(), Ln = (e, t) => {
  let n = t?.id || dt++;
  return H.addToast({ title: e, ...t, id: n }), n;
}, Rn = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", Bn = Ln, Hn = () => H.toasts, An = () => H.getActiveToasts(), ds = Object.assign(Bn, { success: H.success, info: H.info, warning: H.warning, error: H.error, custom: H.custom, message: H.message, promise: H.promise, dismiss: H.dismiss, loading: H.loading }, { getHistory: Hn, getToasts: An });
function zn(e, { insertAt: t } = {}) {
  if (typeof document > "u") return;
  let n = document.head || document.getElementsByTagName("head")[0], a = document.createElement("style");
  a.type = "text/css", t === "top" && n.firstChild ? n.insertBefore(a, n.firstChild) : n.appendChild(a), a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(document.createTextNode(e));
}
zn(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999;transition:transform .4s ease}:where([data-sonner-toaster][data-lifted="true"]){transform:translateY(-10px)}@media (hover: none) and (pointer: coarse){:where([data-sonner-toaster][data-lifted="true"]){transform:none}}:where([data-sonner-toaster][data-x-position="right"]){right:var(--offset-right)}:where([data-sonner-toaster][data-x-position="left"]){left:var(--offset-left)}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:var(--offset-top)}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:var(--offset-bottom)}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast] [data-close-button]{background:var(--gray1)}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:-50%;right:-50%;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y, 0px)) translate(var(--swipe-amount-x, 0px));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-bg-hover: hsl(0, 0%, 12%);--normal-border: hsl(0, 0%, 20%);--normal-border-hover: hsl(0, 0%, 25%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);
function ze(e) {
  return e.label !== void 0;
}
var qn = 3, Xn = "32px", $n = "16px", Et = 4e3, Un = 356, Vn = 14, Qn = 20, Gn = 200;
function J(...e) {
  return e.filter(Boolean).join(" ");
}
function Jn(e) {
  let [t, n] = e.split("-"), a = [];
  return t && a.push(t), n && a.push(n), a;
}
var Kn = (e) => {
  var t, n, a, r, o, s, i, u, d, c, h;
  let { invert: v, toast: l, unstyled: y, interacting: g, setHeights: w, visibleToasts: P, heights: k, index: R, toasts: ue, expanded: te, removeToast: F, defaultRichColors: de, closeButton: pe, style: ye, cancelButtonStyle: Te, actionButtonStyle: be, className: U = "", descriptionClassName: we = "", duration: re, position: xe, gap: ne, loadingIcon: p, expandByDefault: b, classNames: N, icons: I, closeButtonAriaLabel: ce = "Close toast", pauseWhenPageIsHidden: O } = e, [j, W] = m.useState(null), [B, De] = m.useState(null), [Y, Je] = m.useState(!1), [je, He] = m.useState(!1), [Ee, Ke] = m.useState(!1), [kt, mn] = m.useState(!1), [vn, _t] = m.useState(!1), [gn, Ze] = m.useState(0), [pn, Ct] = m.useState(0), We = m.useRef(l.duration || re || Et), St = m.useRef(null), fe = m.useRef(null), yn = R === 0, bn = R + 1 <= P, X = l.type, Me = l.dismissible !== !1, wn = l.className || "", xn = l.descriptionClassName || "", Ae = m.useMemo(() => k.findIndex((M) => M.toastId === l.id) || 0, [k, l.id]), Dn = m.useMemo(() => {
    var M;
    return (M = l.closeButton) != null ? M : pe;
  }, [l.closeButton, pe]), Ot = m.useMemo(() => l.duration || re || Et, [l.duration, re]), et = m.useRef(0), Ne = m.useRef(0), Pt = m.useRef(0), ke = m.useRef(null), [Mn, Nn] = xe.split("-"), Tt = m.useMemo(() => k.reduce((M, S, E) => E >= Ae ? M : M + S.height, 0), [k, Ae]), jt = Fn(), kn = l.invert || v, tt = X === "loading";
  Ne.current = m.useMemo(() => Ae * ne + Tt, [Ae, Tt]), m.useEffect(() => {
    We.current = Ot;
  }, [Ot]), m.useEffect(() => {
    Je(!0);
  }, []), m.useEffect(() => {
    let M = fe.current;
    if (M) {
      let S = M.getBoundingClientRect().height;
      return Ct(S), w((E) => [{ toastId: l.id, height: S, position: l.position }, ...E]), () => w((E) => E.filter((V) => V.toastId !== l.id));
    }
  }, [w, l.id]), m.useLayoutEffect(() => {
    if (!Y) return;
    let M = fe.current, S = M.style.height;
    M.style.height = "auto";
    let E = M.getBoundingClientRect().height;
    M.style.height = S, Ct(E), w((V) => V.find((Q) => Q.toastId === l.id) ? V.map((Q) => Q.toastId === l.id ? { ...Q, height: E } : Q) : [{ toastId: l.id, height: E, position: l.position }, ...V]);
  }, [Y, l.title, l.description, w, l.id]);
  let oe = m.useCallback(() => {
    He(!0), Ze(Ne.current), w((M) => M.filter((S) => S.toastId !== l.id)), setTimeout(() => {
      F(l);
    }, Gn);
  }, [l, F, w, Ne]);
  m.useEffect(() => {
    if (l.promise && X === "loading" || l.duration === 1 / 0 || l.type === "loading") return;
    let M;
    return te || g || O && jt ? (() => {
      if (Pt.current < et.current) {
        let S = (/* @__PURE__ */ new Date()).getTime() - et.current;
        We.current = We.current - S;
      }
      Pt.current = (/* @__PURE__ */ new Date()).getTime();
    })() : We.current !== 1 / 0 && (et.current = (/* @__PURE__ */ new Date()).getTime(), M = setTimeout(() => {
      var S;
      (S = l.onAutoClose) == null || S.call(l, l), oe();
    }, We.current)), () => clearTimeout(M);
  }, [te, g, l, X, O, jt, oe]), m.useEffect(() => {
    l.delete && oe();
  }, [oe, l.delete]);
  function _n() {
    var M, S, E;
    return I != null && I.loading ? m.createElement("div", { className: J(N?.loader, (M = l?.classNames) == null ? void 0 : M.loader, "sonner-loader"), "data-visible": X === "loading" }, I.loading) : p ? m.createElement("div", { className: J(N?.loader, (S = l?.classNames) == null ? void 0 : S.loader, "sonner-loader"), "data-visible": X === "loading" }, p) : m.createElement(Pn, { className: J(N?.loader, (E = l?.classNames) == null ? void 0 : E.loader), visible: X === "loading" });
  }
  return m.createElement("li", { tabIndex: 0, ref: fe, className: J(U, wn, N?.toast, (t = l?.classNames) == null ? void 0 : t.toast, N?.default, N?.[X], (n = l?.classNames) == null ? void 0 : n[X]), "data-sonner-toast": "", "data-rich-colors": (a = l.richColors) != null ? a : de, "data-styled": !(l.jsx || l.unstyled || y), "data-mounted": Y, "data-promise": !!l.promise, "data-swiped": vn, "data-removed": je, "data-visible": bn, "data-y-position": Mn, "data-x-position": Nn, "data-index": R, "data-front": yn, "data-swiping": Ee, "data-dismissible": Me, "data-type": X, "data-invert": kn, "data-swipe-out": kt, "data-swipe-direction": B, "data-expanded": !!(te || b && Y), style: { "--index": R, "--toasts-before": R, "--z-index": ue.length - R, "--offset": `${je ? gn : Ne.current}px`, "--initial-height": b ? "auto" : `${pn}px`, ...ye, ...l.style }, onDragEnd: () => {
    Ke(!1), W(null), ke.current = null;
  }, onPointerDown: (M) => {
    tt || !Me || (St.current = /* @__PURE__ */ new Date(), Ze(Ne.current), M.target.setPointerCapture(M.pointerId), M.target.tagName !== "BUTTON" && (Ke(!0), ke.current = { x: M.clientX, y: M.clientY }));
  }, onPointerUp: () => {
    var M, S, E, V;
    if (kt || !Me) return;
    ke.current = null;
    let Q = Number(((M = fe.current) == null ? void 0 : M.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), se = Number(((S = fe.current) == null ? void 0 : S.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), he = (/* @__PURE__ */ new Date()).getTime() - ((E = St.current) == null ? void 0 : E.getTime()), G = j === "x" ? Q : se, ie = Math.abs(G) / he;
    if (Math.abs(G) >= Qn || ie > 0.11) {
      Ze(Ne.current), (V = l.onDismiss) == null || V.call(l, l), De(j === "x" ? Q > 0 ? "right" : "left" : se > 0 ? "down" : "up"), oe(), mn(!0), _t(!1);
      return;
    }
    Ke(!1), W(null);
  }, onPointerMove: (M) => {
    var S, E, V, Q;
    if (!ke.current || !Me || ((S = window.getSelection()) == null ? void 0 : S.toString().length) > 0) return;
    let se = M.clientY - ke.current.y, he = M.clientX - ke.current.x, G = (E = e.swipeDirections) != null ? E : Jn(xe);
    !j && (Math.abs(he) > 1 || Math.abs(se) > 1) && W(Math.abs(he) > Math.abs(se) ? "x" : "y");
    let ie = { x: 0, y: 0 };
    j === "y" ? (G.includes("top") || G.includes("bottom")) && (G.includes("top") && se < 0 || G.includes("bottom") && se > 0) && (ie.y = se) : j === "x" && (G.includes("left") || G.includes("right")) && (G.includes("left") && he < 0 || G.includes("right") && he > 0) && (ie.x = he), (Math.abs(ie.x) > 0 || Math.abs(ie.y) > 0) && _t(!0), (V = fe.current) == null || V.style.setProperty("--swipe-amount-x", `${ie.x}px`), (Q = fe.current) == null || Q.style.setProperty("--swipe-amount-y", `${ie.y}px`);
  } }, Dn && !l.jsx ? m.createElement("button", { "aria-label": ce, "data-disabled": tt, "data-close-button": !0, onClick: tt || !Me ? () => {
  } : () => {
    var M;
    oe(), (M = l.onDismiss) == null || M.call(l, l);
  }, className: J(N?.closeButton, (r = l?.classNames) == null ? void 0 : r.closeButton) }, (o = I?.close) != null ? o : Yn) : null, l.jsx || _.isValidElement(l.title) ? l.jsx ? l.jsx : typeof l.title == "function" ? l.title() : l.title : m.createElement(m.Fragment, null, X || l.icon || l.promise ? m.createElement("div", { "data-icon": "", className: J(N?.icon, (s = l?.classNames) == null ? void 0 : s.icon) }, l.promise || l.type === "loading" && !l.icon ? l.icon || _n() : null, l.type !== "loading" ? l.icon || I?.[X] || Sn(X) : null) : null, m.createElement("div", { "data-content": "", className: J(N?.content, (i = l?.classNames) == null ? void 0 : i.content) }, m.createElement("div", { "data-title": "", className: J(N?.title, (u = l?.classNames) == null ? void 0 : u.title) }, typeof l.title == "function" ? l.title() : l.title), l.description ? m.createElement("div", { "data-description": "", className: J(we, xn, N?.description, (d = l?.classNames) == null ? void 0 : d.description) }, typeof l.description == "function" ? l.description() : l.description) : null), _.isValidElement(l.cancel) ? l.cancel : l.cancel && ze(l.cancel) ? m.createElement("button", { "data-button": !0, "data-cancel": !0, style: l.cancelButtonStyle || Te, onClick: (M) => {
    var S, E;
    ze(l.cancel) && Me && ((E = (S = l.cancel).onClick) == null || E.call(S, M), oe());
  }, className: J(N?.cancelButton, (c = l?.classNames) == null ? void 0 : c.cancelButton) }, l.cancel.label) : null, _.isValidElement(l.action) ? l.action : l.action && ze(l.action) ? m.createElement("button", { "data-button": !0, "data-action": !0, style: l.actionButtonStyle || be, onClick: (M) => {
    var S, E;
    ze(l.action) && ((E = (S = l.action).onClick) == null || E.call(S, M), !M.defaultPrevented && oe());
  }, className: J(N?.actionButton, (h = l?.classNames) == null ? void 0 : h.actionButton) }, l.action.label) : null));
};
function Wt() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  let e = document.documentElement.getAttribute("dir");
  return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function Zn(e, t) {
  let n = {};
  return [e, t].forEach((a, r) => {
    let o = r === 1, s = o ? "--mobile-offset" : "--offset", i = o ? $n : Xn;
    function u(d) {
      ["top", "right", "bottom", "left"].forEach((c) => {
        n[`${s}-${c}`] = typeof d == "number" ? `${d}px` : d;
      });
    }
    typeof a == "number" || typeof a == "string" ? u(a) : typeof a == "object" ? ["top", "right", "bottom", "left"].forEach((d) => {
      a[d] === void 0 ? n[`${s}-${d}`] = i : n[`${s}-${d}`] = typeof a[d] == "number" ? `${a[d]}px` : a[d];
    }) : u(i);
  }), n;
}
var cs = _.forwardRef(function(e, t) {
  let { invert: n, position: a = "bottom-right", hotkey: r = ["altKey", "KeyT"], expand: o, closeButton: s, className: i, offset: u, mobileOffset: d, theme: c = "light", richColors: h, duration: v, style: l, visibleToasts: y = qn, toastOptions: g, dir: w = Wt(), gap: P = Vn, loadingIcon: k, icons: R, containerAriaLabel: ue = "Notifications", pauseWhenPageIsHidden: te } = e, [F, de] = m.useState([]), pe = m.useMemo(() => Array.from(new Set([a].concat(F.filter((O) => O.position).map((O) => O.position)))), [F, a]), [ye, Te] = m.useState([]), [be, U] = m.useState(!1), [we, re] = m.useState(!1), [xe, ne] = m.useState(c !== "system" ? c : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), p = m.useRef(null), b = r.join("+").replace(/Key/g, "").replace(/Digit/g, ""), N = m.useRef(null), I = m.useRef(!1), ce = m.useCallback((O) => {
    de((j) => {
      var W;
      return (W = j.find((B) => B.id === O.id)) != null && W.delete || H.dismiss(O.id), j.filter(({ id: B }) => B !== O.id);
    });
  }, []);
  return m.useEffect(() => H.subscribe((O) => {
    if (O.dismiss) {
      de((j) => j.map((W) => W.id === O.id ? { ...W, delete: !0 } : W));
      return;
    }
    setTimeout(() => {
      Cn.flushSync(() => {
        de((j) => {
          let W = j.findIndex((B) => B.id === O.id);
          return W !== -1 ? [...j.slice(0, W), { ...j[W], ...O }, ...j.slice(W + 1)] : [O, ...j];
        });
      });
    });
  }), []), m.useEffect(() => {
    if (c !== "system") {
      ne(c);
      return;
    }
    if (c === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? ne("dark") : ne("light")), typeof window > "u") return;
    let O = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      O.addEventListener("change", ({ matches: j }) => {
        ne(j ? "dark" : "light");
      });
    } catch {
      O.addListener(({ matches: W }) => {
        try {
          ne(W ? "dark" : "light");
        } catch (B) {
          console.error(B);
        }
      });
    }
  }, [c]), m.useEffect(() => {
    F.length <= 1 && U(!1);
  }, [F]), m.useEffect(() => {
    let O = (j) => {
      var W, B;
      r.every((De) => j[De] || j.code === De) && (U(!0), (W = p.current) == null || W.focus()), j.code === "Escape" && (document.activeElement === p.current || (B = p.current) != null && B.contains(document.activeElement)) && U(!1);
    };
    return document.addEventListener("keydown", O), () => document.removeEventListener("keydown", O);
  }, [r]), m.useEffect(() => {
    if (p.current) return () => {
      N.current && (N.current.focus({ preventScroll: !0 }), N.current = null, I.current = !1);
    };
  }, [p.current]), m.createElement("section", { ref: t, "aria-label": `${ue} ${b}`, tabIndex: -1, "aria-live": "polite", "aria-relevant": "additions text", "aria-atomic": "false", suppressHydrationWarning: !0 }, pe.map((O, j) => {
    var W;
    let [B, De] = O.split("-");
    return F.length ? m.createElement("ol", { key: O, dir: w === "auto" ? Wt() : w, tabIndex: -1, ref: p, className: i, "data-sonner-toaster": !0, "data-theme": xe, "data-y-position": B, "data-lifted": be && F.length > 1 && !o, "data-x-position": De, style: { "--front-toast-height": `${((W = ye[0]) == null ? void 0 : W.height) || 0}px`, "--width": `${Un}px`, "--gap": `${P}px`, ...l, ...Zn(u, d) }, onBlur: (Y) => {
      I.current && !Y.currentTarget.contains(Y.relatedTarget) && (I.current = !1, N.current && (N.current.focus({ preventScroll: !0 }), N.current = null));
    }, onFocus: (Y) => {
      Y.target instanceof HTMLElement && Y.target.dataset.dismissible === "false" || I.current || (I.current = !0, N.current = Y.relatedTarget);
    }, onMouseEnter: () => U(!0), onMouseMove: () => U(!0), onMouseLeave: () => {
      we || U(!1);
    }, onDragEnd: () => U(!1), onPointerDown: (Y) => {
      Y.target instanceof HTMLElement && Y.target.dataset.dismissible === "false" || re(!0);
    }, onPointerUp: () => re(!1) }, F.filter((Y) => !Y.position && j === 0 || Y.position === O).map((Y, Je) => {
      var je, He;
      return m.createElement(Kn, { key: Y.id, icons: R, index: Je, toast: Y, defaultRichColors: h, duration: (je = g?.duration) != null ? je : v, className: g?.className, descriptionClassName: g?.descriptionClassName, invert: n, visibleToasts: y, closeButton: (He = g?.closeButton) != null ? He : s, interacting: we, position: O, style: g?.style, unstyled: g?.unstyled, classNames: g?.classNames, cancelButtonStyle: g?.cancelButtonStyle, actionButtonStyle: g?.actionButtonStyle, removeToast: ce, toasts: F.filter((Ee) => Ee.position == Y.position), heights: ye.filter((Ee) => Ee.position == Y.position), setHeights: Te, expandByDefault: o, gap: P, loadingIcon: k, expanded: be, pauseWhenPageIsHidden: te, swipeDirections: e.swipeDirections });
    })) : null;
  }));
});
function D(e) {
  const t = Object.prototype.toString.call(e);
  return e instanceof Date || typeof e == "object" && t === "[object Date]" ? new e.constructor(+e) : typeof e == "number" || t === "[object Number]" || typeof e == "string" || t === "[object String]" ? new Date(e) : /* @__PURE__ */ new Date(NaN);
}
function q(e, t) {
  return e instanceof Date ? new e.constructor(t) : new Date(t);
}
function L(e, t) {
  const n = D(e);
  return isNaN(t) ? q(e, NaN) : (t && n.setDate(n.getDate() + t), n);
}
function $(e, t) {
  const n = D(e);
  if (isNaN(t)) return q(e, NaN);
  if (!t)
    return n;
  const a = n.getDate(), r = q(e, n.getTime());
  r.setMonth(n.getMonth() + t + 1, 0);
  const o = r.getDate();
  return a >= o ? r : (n.setFullYear(
    r.getFullYear(),
    r.getMonth(),
    a
  ), n);
}
const ht = 6048e5, ea = 864e5, $t = 6e4, Ut = 36e5, qe = 43200, Yt = 1440;
let ta = {};
function Pe() {
  return ta;
}
function ee(e, t) {
  const n = Pe(), a = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, r = D(e), o = r.getDay(), s = (o < a ? 7 : 0) + o - a;
  return r.setDate(r.getDate() - s), r.setHours(0, 0, 0, 0), r;
}
function ve(e) {
  return ee(e, { weekStartsOn: 1 });
}
function Vt(e) {
  const t = D(e), n = t.getFullYear(), a = q(e, 0);
  a.setFullYear(n + 1, 0, 4), a.setHours(0, 0, 0, 0);
  const r = ve(a), o = q(e, 0);
  o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
  const s = ve(o);
  return t.getTime() >= r.getTime() ? n + 1 : t.getTime() >= s.getTime() ? n : n - 1;
}
function Ce(e) {
  const t = D(e);
  return t.setHours(0, 0, 0, 0), t;
}
function Se(e) {
  const t = D(e), n = new Date(
    Date.UTC(
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      t.getHours(),
      t.getMinutes(),
      t.getSeconds(),
      t.getMilliseconds()
    )
  );
  return n.setUTCFullYear(t.getFullYear()), +e - +n;
}
function K(e, t) {
  const n = Ce(e), a = Ce(t), r = +n - Se(n), o = +a - Se(a);
  return Math.round((r - o) / ea);
}
function na(e) {
  const t = Vt(e), n = q(e, 0);
  return n.setFullYear(t, 0, 4), n.setHours(0, 0, 0, 0), ve(n);
}
function ct(e, t) {
  const n = t * 7;
  return L(e, n);
}
function aa(e, t) {
  return $(e, t * 12);
}
function ra(e) {
  let t;
  return e.forEach(function(n) {
    const a = D(n);
    (t === void 0 || t < a || isNaN(Number(a))) && (t = a);
  }), t || /* @__PURE__ */ new Date(NaN);
}
function oa(e) {
  let t;
  return e.forEach((n) => {
    const a = D(n);
    (!t || t > a || isNaN(+a)) && (t = a);
  }), t || /* @__PURE__ */ new Date(NaN);
}
function $e(e, t) {
  const n = D(e), a = D(t), r = n.getTime() - a.getTime();
  return r < 0 ? -1 : r > 0 ? 1 : r;
}
function sa(e) {
  return q(e, Date.now());
}
function A(e, t) {
  const n = Ce(e), a = Ce(t);
  return +n == +a;
}
function mt(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function ia(e) {
  if (!mt(e) && typeof e != "number")
    return !1;
  const t = D(e);
  return !isNaN(Number(t));
}
function Oe(e, t) {
  const n = D(e), a = D(t), r = n.getFullYear() - a.getFullYear(), o = n.getMonth() - a.getMonth();
  return r * 12 + o;
}
function la(e, t, n) {
  const a = ee(e, n), r = ee(t, n), o = +a - Se(a), s = +r - Se(r);
  return Math.round((o - s) / ht);
}
function fs(e, t) {
  const n = D(e), a = D(t), r = Ft(n, a), o = Math.abs(K(n, a));
  n.setDate(n.getDate() - r * o);
  const s = +(Ft(n, a) === -r), i = r * (o - s);
  return i === 0 ? 0 : i;
}
function Ft(e, t) {
  const n = e.getFullYear() - t.getFullYear() || e.getMonth() - t.getMonth() || e.getDate() - t.getDate() || e.getHours() - t.getHours() || e.getMinutes() - t.getMinutes() || e.getSeconds() - t.getSeconds() || e.getMilliseconds() - t.getMilliseconds();
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function ua(e) {
  return (t) => {
    const a = (e ? Math[e] : Math.trunc)(t);
    return a === 0 ? 0 : a;
  };
}
function da(e, t) {
  return +D(e) - +D(t);
}
function ca(e) {
  const t = D(e);
  return t.setHours(23, 59, 59, 999), t;
}
function Qe(e) {
  const t = D(e), n = t.getMonth();
  return t.setFullYear(t.getFullYear(), n + 1, 0), t.setHours(23, 59, 59, 999), t;
}
function fa(e) {
  const t = D(e);
  return +ca(t) == +Qe(t);
}
function ha(e, t) {
  const n = D(e), a = D(t), r = $e(n, a), o = Math.abs(
    Oe(n, a)
  );
  let s;
  if (o < 1)
    s = 0;
  else {
    n.getMonth() === 1 && n.getDate() > 27 && n.setDate(30), n.setMonth(n.getMonth() - r * o);
    let i = $e(n, a) === -r;
    fa(D(e)) && o === 1 && $e(e, a) === 1 && (i = !1), s = r * (o - Number(i));
  }
  return s === 0 ? 0 : s;
}
function ma(e, t, n) {
  const a = da(e, t) / 1e3;
  return ua(n?.roundingMethod)(a);
}
function z(e) {
  const t = D(e);
  return t.setDate(1), t.setHours(0, 0, 0, 0), t;
}
function Qt(e) {
  const t = D(e), n = q(e, 0);
  return n.setFullYear(t.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function vt(e, t) {
  const n = Pe(), a = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, r = D(e), o = r.getDay(), s = (o < a ? -7 : 0) + 6 - (o - a);
  return r.setDate(r.getDate() + s), r.setHours(23, 59, 59, 999), r;
}
function Gt(e) {
  return vt(e, { weekStartsOn: 1 });
}
const va = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, ga = (e, t, n) => {
  let a;
  const r = va[e];
  return typeof r == "string" ? a = r : t === 1 ? a = r.one : a = r.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + a : a + " ago" : a;
};
function nt(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const pa = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, ya = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, ba = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, wa = {
  date: nt({
    formats: pa,
    defaultWidth: "full"
  }),
  time: nt({
    formats: ya,
    defaultWidth: "full"
  }),
  dateTime: nt({
    formats: ba,
    defaultWidth: "full"
  })
}, xa = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Da = (e, t, n, a) => xa[e];
function Ye(e) {
  return (t, n) => {
    const a = n?.context ? String(n.context) : "standalone";
    let r;
    if (a === "formatting" && e.formattingValues) {
      const s = e.defaultFormattingWidth || e.defaultWidth, i = n?.width ? String(n.width) : s;
      r = e.formattingValues[i] || e.formattingValues[s];
    } else {
      const s = e.defaultWidth, i = n?.width ? String(n.width) : e.defaultWidth;
      r = e.values[i] || e.values[s];
    }
    const o = e.argumentCallback ? e.argumentCallback(t) : t;
    return r[o];
  };
}
const Ma = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Na = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, ka = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, _a = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, Ca = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, Sa = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, Oa = (e, t) => {
  const n = Number(e), a = n % 100;
  if (a > 20 || a < 10)
    switch (a % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
    }
  return n + "th";
}, Pa = {
  ordinalNumber: Oa,
  era: Ye({
    values: Ma,
    defaultWidth: "wide"
  }),
  quarter: Ye({
    values: Na,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Ye({
    values: ka,
    defaultWidth: "wide"
  }),
  day: Ye({
    values: _a,
    defaultWidth: "wide"
  }),
  dayPeriod: Ye({
    values: Ca,
    defaultWidth: "wide",
    formattingValues: Sa,
    defaultFormattingWidth: "wide"
  })
};
function Fe(e) {
  return (t, n = {}) => {
    const a = n.width, r = a && e.matchPatterns[a] || e.matchPatterns[e.defaultMatchWidth], o = t.match(r);
    if (!o)
      return null;
    const s = o[0], i = a && e.parsePatterns[a] || e.parsePatterns[e.defaultParseWidth], u = Array.isArray(i) ? ja(i, (h) => h.test(s)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      Ta(i, (h) => h.test(s))
    );
    let d;
    d = e.valueCallback ? e.valueCallback(u) : u, d = n.valueCallback ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      n.valueCallback(d)
    ) : d;
    const c = t.slice(s.length);
    return { value: d, rest: c };
  };
}
function Ta(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function ja(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Ea(e) {
  return (t, n = {}) => {
    const a = t.match(e.matchPattern);
    if (!a) return null;
    const r = a[0], o = t.match(e.parsePattern);
    if (!o) return null;
    let s = e.valueCallback ? e.valueCallback(o[0]) : o[0];
    s = n.valueCallback ? n.valueCallback(s) : s;
    const i = t.slice(r.length);
    return { value: s, rest: i };
  };
}
const Wa = /^(\d+)(th|st|nd|rd)?/i, Ya = /\d+/i, Fa = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Ia = {
  any: [/^b/i, /^(a|c)/i]
}, La = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Ra = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Ba = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Ha = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, Aa = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, za = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, qa = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Xa = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, $a = {
  ordinalNumber: Ea({
    matchPattern: Wa,
    parsePattern: Ya,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Fe({
    matchPatterns: Fa,
    defaultMatchWidth: "wide",
    parsePatterns: Ia,
    defaultParseWidth: "any"
  }),
  quarter: Fe({
    matchPatterns: La,
    defaultMatchWidth: "wide",
    parsePatterns: Ra,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Fe({
    matchPatterns: Ba,
    defaultMatchWidth: "wide",
    parsePatterns: Ha,
    defaultParseWidth: "any"
  }),
  day: Fe({
    matchPatterns: Aa,
    defaultMatchWidth: "wide",
    parsePatterns: za,
    defaultParseWidth: "any"
  }),
  dayPeriod: Fe({
    matchPatterns: qa,
    defaultMatchWidth: "any",
    parsePatterns: Xa,
    defaultParseWidth: "any"
  })
}, gt = {
  code: "en-US",
  formatDistance: ga,
  formatLong: wa,
  formatRelative: Da,
  localize: Pa,
  match: $a,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Ua(e) {
  const t = D(e);
  return K(t, Qt(t)) + 1;
}
function Jt(e) {
  const t = D(e), n = +ve(t) - +na(t);
  return Math.round(n / ht) + 1;
}
function Kt(e, t) {
  const n = D(e), a = n.getFullYear(), r = Pe(), o = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, s = q(e, 0);
  s.setFullYear(a + 1, 0, o), s.setHours(0, 0, 0, 0);
  const i = ee(s, t), u = q(e, 0);
  u.setFullYear(a, 0, o), u.setHours(0, 0, 0, 0);
  const d = ee(u, t);
  return n.getTime() >= i.getTime() ? a + 1 : n.getTime() >= d.getTime() ? a : a - 1;
}
function Va(e, t) {
  const n = Pe(), a = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, r = Kt(e, t), o = q(e, 0);
  return o.setFullYear(r, 0, a), o.setHours(0, 0, 0, 0), ee(o, t);
}
function Zt(e, t) {
  const n = D(e), a = +ee(n, t) - +Va(n, t);
  return Math.round(a / ht) + 1;
}
function C(e, t) {
  const n = e < 0 ? "-" : "", a = Math.abs(e).toString().padStart(t, "0");
  return n + a;
}
const le = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), a = n > 0 ? n : 1 - n;
    return C(t === "yy" ? a % 100 : a, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : C(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return C(e.getDate(), t.length);
  },
  // AM or PM
  a(e, t) {
    const n = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.toUpperCase();
      case "aaa":
        return n;
      case "aaaaa":
        return n[0];
      case "aaaa":
      default:
        return n === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(e, t) {
    return C(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return C(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return C(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return C(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, a = e.getMilliseconds(), r = Math.trunc(
      a * Math.pow(10, n - 3)
    );
    return C(r, t.length);
  }
}, _e = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, It = {
  // Era
  G: function(e, t, n) {
    const a = e.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      case "G":
      case "GG":
      case "GGG":
        return n.era(a, { width: "abbreviated" });
      case "GGGGG":
        return n.era(a, { width: "narrow" });
      case "GGGG":
      default:
        return n.era(a, { width: "wide" });
    }
  },
  // Year
  y: function(e, t, n) {
    if (t === "yo") {
      const a = e.getFullYear(), r = a > 0 ? a : 1 - a;
      return n.ordinalNumber(r, { unit: "year" });
    }
    return le.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, a) {
    const r = Kt(e, a), o = r > 0 ? r : 1 - r;
    if (t === "YY") {
      const s = o % 100;
      return C(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(o, { unit: "year" }) : C(o, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Vt(e);
    return C(n, t.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(e, t) {
    const n = e.getFullYear();
    return C(n, t.length);
  },
  // Quarter
  Q: function(e, t, n) {
    const a = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(a);
      case "QQ":
        return C(a, 2);
      case "Qo":
        return n.ordinalNumber(a, { unit: "quarter" });
      case "QQQ":
        return n.quarter(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return n.quarter(a, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return n.quarter(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(e, t, n) {
    const a = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "q":
        return String(a);
      case "qq":
        return C(a, 2);
      case "qo":
        return n.ordinalNumber(a, { unit: "quarter" });
      case "qqq":
        return n.quarter(a, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return n.quarter(a, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return n.quarter(a, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(e, t, n) {
    const a = e.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return le.M(e, t);
      case "Mo":
        return n.ordinalNumber(a + 1, { unit: "month" });
      case "MMM":
        return n.month(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return n.month(a, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return n.month(a, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(e, t, n) {
    const a = e.getMonth();
    switch (t) {
      case "L":
        return String(a + 1);
      case "LL":
        return C(a + 1, 2);
      case "Lo":
        return n.ordinalNumber(a + 1, { unit: "month" });
      case "LLL":
        return n.month(a, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return n.month(a, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return n.month(a, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(e, t, n, a) {
    const r = Zt(e, a);
    return t === "wo" ? n.ordinalNumber(r, { unit: "week" }) : C(r, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const a = Jt(e);
    return t === "Io" ? n.ordinalNumber(a, { unit: "week" }) : C(a, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : le.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const a = Ua(e);
    return t === "Do" ? n.ordinalNumber(a, { unit: "dayOfYear" }) : C(a, t.length);
  },
  // Day of week
  E: function(e, t, n) {
    const a = e.getDay();
    switch (t) {
      case "E":
      case "EE":
      case "EEE":
        return n.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return n.day(a, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return n.day(a, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return n.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(e, t, n, a) {
    const r = e.getDay(), o = (r - a.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "e":
        return String(o);
      case "ee":
        return C(o, 2);
      case "eo":
        return n.ordinalNumber(o, { unit: "day" });
      case "eee":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(e, t, n, a) {
    const r = e.getDay(), o = (r - a.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "c":
        return String(o);
      case "cc":
        return C(o, t.length);
      case "co":
        return n.ordinalNumber(o, { unit: "day" });
      case "ccc":
        return n.day(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return n.day(r, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return n.day(r, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return n.day(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(e, t, n) {
    const a = e.getDay(), r = a === 0 ? 7 : a;
    switch (t) {
      case "i":
        return String(r);
      case "ii":
        return C(r, t.length);
      case "io":
        return n.ordinalNumber(r, { unit: "day" });
      case "iii":
        return n.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return n.day(a, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return n.day(a, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return n.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(e, t, n) {
    const r = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return n.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return n.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return n.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(e, t, n) {
    const a = e.getHours();
    let r;
    switch (a === 12 ? r = _e.noon : a === 0 ? r = _e.midnight : r = a / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return n.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return n.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return n.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return n.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(e, t, n) {
    const a = e.getHours();
    let r;
    switch (a >= 17 ? r = _e.evening : a >= 12 ? r = _e.afternoon : a >= 4 ? r = _e.morning : r = _e.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return n.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return n.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return n.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(e, t, n) {
    if (t === "ho") {
      let a = e.getHours() % 12;
      return a === 0 && (a = 12), n.ordinalNumber(a, { unit: "hour" });
    }
    return le.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : le.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const a = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(a, { unit: "hour" }) : C(a, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let a = e.getHours();
    return a === 0 && (a = 24), t === "ko" ? n.ordinalNumber(a, { unit: "hour" }) : C(a, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : le.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : le.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return le.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const a = e.getTimezoneOffset();
    if (a === 0)
      return "Z";
    switch (t) {
      case "X":
        return Rt(a);
      case "XXXX":
      case "XX":
        return me(a);
      case "XXXXX":
      case "XXX":
      default:
        return me(a, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const a = e.getTimezoneOffset();
    switch (t) {
      case "x":
        return Rt(a);
      case "xxxx":
      case "xx":
        return me(a);
      case "xxxxx":
      case "xxx":
      default:
        return me(a, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, n) {
    const a = e.getTimezoneOffset();
    switch (t) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Lt(a, ":");
      case "OOOO":
      default:
        return "GMT" + me(a, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, n) {
    const a = e.getTimezoneOffset();
    switch (t) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Lt(a, ":");
      case "zzzz":
      default:
        return "GMT" + me(a, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const a = Math.trunc(e.getTime() / 1e3);
    return C(a, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    const a = e.getTime();
    return C(a, t.length);
  }
};
function Lt(e, t = "") {
  const n = e > 0 ? "-" : "+", a = Math.abs(e), r = Math.trunc(a / 60), o = a % 60;
  return o === 0 ? n + String(r) : n + String(r) + t + C(o, 2);
}
function Rt(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + C(Math.abs(e) / 60, 2) : me(e, t);
}
function me(e, t = "") {
  const n = e > 0 ? "-" : "+", a = Math.abs(e), r = C(Math.trunc(a / 60), 2), o = C(a % 60, 2);
  return n + r + t + o;
}
const Bt = (e, t) => {
  switch (e) {
    case "P":
      return t.date({ width: "short" });
    case "PP":
      return t.date({ width: "medium" });
    case "PPP":
      return t.date({ width: "long" });
    case "PPPP":
    default:
      return t.date({ width: "full" });
  }
}, en = (e, t) => {
  switch (e) {
    case "p":
      return t.time({ width: "short" });
    case "pp":
      return t.time({ width: "medium" });
    case "ppp":
      return t.time({ width: "long" });
    case "pppp":
    default:
      return t.time({ width: "full" });
  }
}, Qa = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], a = n[1], r = n[2];
  if (!r)
    return Bt(e, t);
  let o;
  switch (a) {
    case "P":
      o = t.dateTime({ width: "short" });
      break;
    case "PP":
      o = t.dateTime({ width: "medium" });
      break;
    case "PPP":
      o = t.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      o = t.dateTime({ width: "full" });
      break;
  }
  return o.replace("{{date}}", Bt(a, t)).replace("{{time}}", en(r, t));
}, Ga = {
  p: en,
  P: Qa
}, Ja = /^D+$/, Ka = /^Y+$/, Za = ["D", "DD", "YY", "YYYY"];
function er(e) {
  return Ja.test(e);
}
function tr(e) {
  return Ka.test(e);
}
function nr(e, t, n) {
  const a = ar(e, t, n);
  if (console.warn(a), Za.includes(e)) throw new RangeError(a);
}
function ar(e, t, n) {
  const a = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${a} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const rr = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, or = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, sr = /^'([^]*?)'?$/, ir = /''/g, lr = /[a-zA-Z]/;
function ge(e, t, n) {
  const a = Pe(), r = n?.locale ?? a.locale ?? gt, o = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? a.firstWeekContainsDate ?? a.locale?.options?.firstWeekContainsDate ?? 1, s = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? a.weekStartsOn ?? a.locale?.options?.weekStartsOn ?? 0, i = D(e);
  if (!ia(i))
    throw new RangeError("Invalid time value");
  let u = t.match(or).map((c) => {
    const h = c[0];
    if (h === "p" || h === "P") {
      const v = Ga[h];
      return v(c, r.formatLong);
    }
    return c;
  }).join("").match(rr).map((c) => {
    if (c === "''")
      return { isToken: !1, value: "'" };
    const h = c[0];
    if (h === "'")
      return { isToken: !1, value: ur(c) };
    if (It[h])
      return { isToken: !0, value: c };
    if (h.match(lr))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + h + "`"
      );
    return { isToken: !1, value: c };
  });
  r.localize.preprocessor && (u = r.localize.preprocessor(i, u));
  const d = {
    firstWeekContainsDate: o,
    weekStartsOn: s,
    locale: r
  };
  return u.map((c) => {
    if (!c.isToken) return c.value;
    const h = c.value;
    (!n?.useAdditionalWeekYearTokens && tr(h) || !n?.useAdditionalDayOfYearTokens && er(h)) && nr(h, t, String(e));
    const v = It[h[0]];
    return v(i, h, r.localize, d);
  }).join("");
}
function ur(e) {
  const t = e.match(sr);
  return t ? t[1].replace(ir, "'") : e;
}
function dr(e, t, n) {
  const a = Pe(), r = n?.locale ?? a.locale ?? gt, o = 2520, s = $e(e, t);
  if (isNaN(s))
    throw new RangeError("Invalid time value");
  const i = Object.assign({}, n, {
    addSuffix: n?.addSuffix,
    comparison: s
  });
  let u, d;
  s > 0 ? (u = D(t), d = D(e)) : (u = D(e), d = D(t));
  const c = ma(d, u), h = (Se(d) - Se(u)) / 1e3, v = Math.round((c - h) / 60);
  let l;
  if (v < 2)
    return n?.includeSeconds ? c < 5 ? r.formatDistance("lessThanXSeconds", 5, i) : c < 10 ? r.formatDistance("lessThanXSeconds", 10, i) : c < 20 ? r.formatDistance("lessThanXSeconds", 20, i) : c < 40 ? r.formatDistance("halfAMinute", 0, i) : c < 60 ? r.formatDistance("lessThanXMinutes", 1, i) : r.formatDistance("xMinutes", 1, i) : v === 0 ? r.formatDistance("lessThanXMinutes", 1, i) : r.formatDistance("xMinutes", v, i);
  if (v < 45)
    return r.formatDistance("xMinutes", v, i);
  if (v < 90)
    return r.formatDistance("aboutXHours", 1, i);
  if (v < Yt) {
    const y = Math.round(v / 60);
    return r.formatDistance("aboutXHours", y, i);
  } else {
    if (v < o)
      return r.formatDistance("xDays", 1, i);
    if (v < qe) {
      const y = Math.round(v / Yt);
      return r.formatDistance("xDays", y, i);
    } else if (v < qe * 2)
      return l = Math.round(v / qe), r.formatDistance("aboutXMonths", l, i);
  }
  if (l = ha(d, u), l < 12) {
    const y = Math.round(v / qe);
    return r.formatDistance("xMonths", y, i);
  } else {
    const y = l % 12, g = Math.trunc(l / 12);
    return y < 3 ? r.formatDistance("aboutXYears", g, i) : y < 9 ? r.formatDistance("overXYears", g, i) : r.formatDistance("almostXYears", g + 1, i);
  }
}
function hs(e, t) {
  return dr(e, sa(e), t);
}
function cr(e) {
  const t = D(e), n = t.getFullYear(), a = t.getMonth(), r = q(e, 0);
  return r.setFullYear(n, a + 1, 0), r.setHours(0, 0, 0, 0), r.getDate();
}
function fr(e) {
  return Math.trunc(+D(e) / 1e3);
}
function hr(e) {
  const t = D(e), n = t.getMonth();
  return t.setFullYear(t.getFullYear(), n + 1, 0), t.setHours(0, 0, 0, 0), t;
}
function mr(e, t) {
  return la(
    hr(e),
    z(e),
    t
  ) + 1;
}
function ft(e, t) {
  const n = D(e), a = D(t);
  return n.getTime() > a.getTime();
}
function tn(e, t) {
  const n = D(e), a = D(t);
  return +n < +a;
}
function pt(e, t) {
  const n = D(e), a = D(t);
  return n.getFullYear() === a.getFullYear() && n.getMonth() === a.getMonth();
}
function vr(e, t) {
  const n = D(e), a = D(t);
  return n.getFullYear() === a.getFullYear();
}
function at(e, t) {
  return L(e, -t);
}
function ms(e, t) {
  const a = br(e);
  let r;
  if (a.date) {
    const u = wr(a.date, 2);
    r = xr(u.restDateString, u.year);
  }
  if (!r || isNaN(r.getTime()))
    return /* @__PURE__ */ new Date(NaN);
  const o = r.getTime();
  let s = 0, i;
  if (a.time && (s = Dr(a.time), isNaN(s)))
    return /* @__PURE__ */ new Date(NaN);
  if (a.timezone) {
    if (i = Mr(a.timezone), isNaN(i))
      return /* @__PURE__ */ new Date(NaN);
  } else {
    const u = new Date(o + s), d = /* @__PURE__ */ new Date(0);
    return d.setFullYear(
      u.getUTCFullYear(),
      u.getUTCMonth(),
      u.getUTCDate()
    ), d.setHours(
      u.getUTCHours(),
      u.getUTCMinutes(),
      u.getUTCSeconds(),
      u.getUTCMilliseconds()
    ), d;
  }
  return new Date(o + s + i);
}
const Xe = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
}, gr = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/, pr = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/, yr = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function br(e) {
  const t = {}, n = e.split(Xe.dateTimeDelimiter);
  let a;
  if (n.length > 2)
    return t;
  if (/:/.test(n[0]) ? a = n[0] : (t.date = n[0], a = n[1], Xe.timeZoneDelimiter.test(t.date) && (t.date = e.split(Xe.timeZoneDelimiter)[0], a = e.substr(
    t.date.length,
    e.length
  ))), a) {
    const r = Xe.timezone.exec(a);
    r ? (t.time = a.replace(r[1], ""), t.timezone = r[1]) : t.time = a;
  }
  return t;
}
function wr(e, t) {
  const n = new RegExp(
    "^(?:(\\d{4}|[+-]\\d{" + (4 + t) + "})|(\\d{2}|[+-]\\d{" + (2 + t) + "})$)"
  ), a = e.match(n);
  if (!a) return { year: NaN, restDateString: "" };
  const r = a[1] ? parseInt(a[1]) : null, o = a[2] ? parseInt(a[2]) : null;
  return {
    year: o === null ? r : o * 100,
    restDateString: e.slice((a[1] || a[2]).length)
  };
}
function xr(e, t) {
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  const n = e.match(gr);
  if (!n) return /* @__PURE__ */ new Date(NaN);
  const a = !!n[4], r = Ie(n[1]), o = Ie(n[2]) - 1, s = Ie(n[3]), i = Ie(n[4]), u = Ie(n[5]) - 1;
  if (a)
    return Sr(t, i, u) ? Nr(t, i, u) : /* @__PURE__ */ new Date(NaN);
  {
    const d = /* @__PURE__ */ new Date(0);
    return !_r(t, o, s) || !Cr(t, r) ? /* @__PURE__ */ new Date(NaN) : (d.setUTCFullYear(t, o, Math.max(r, s)), d);
  }
}
function Ie(e) {
  return e ? parseInt(e) : 1;
}
function Dr(e) {
  const t = e.match(pr);
  if (!t) return NaN;
  const n = rt(t[1]), a = rt(t[2]), r = rt(t[3]);
  return Or(n, a, r) ? n * Ut + a * $t + r * 1e3 : NaN;
}
function rt(e) {
  return e && parseFloat(e.replace(",", ".")) || 0;
}
function Mr(e) {
  if (e === "Z") return 0;
  const t = e.match(yr);
  if (!t) return 0;
  const n = t[1] === "+" ? -1 : 1, a = parseInt(t[2]), r = t[3] && parseInt(t[3]) || 0;
  return Pr(a, r) ? n * (a * Ut + r * $t) : NaN;
}
function Nr(e, t, n) {
  const a = /* @__PURE__ */ new Date(0);
  a.setUTCFullYear(e, 0, 4);
  const r = a.getUTCDay() || 7, o = (t - 1) * 7 + n + 1 - r;
  return a.setUTCDate(a.getUTCDate() + o), a;
}
const kr = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function nn(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function _r(e, t, n) {
  return t >= 0 && t <= 11 && n >= 1 && n <= (kr[t] || (nn(e) ? 29 : 28));
}
function Cr(e, t) {
  return t >= 1 && t <= (nn(e) ? 366 : 365);
}
function Sr(e, t, n) {
  return t >= 1 && t <= 53 && n >= 0 && n <= 6;
}
function Or(e, t, n) {
  return e === 24 ? t === 0 && n === 0 : n >= 0 && n < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
}
function Pr(e, t) {
  return t >= 0 && t <= 59;
}
function ot(e, t) {
  const n = D(e), a = n.getFullYear(), r = n.getDate(), o = q(e, 0);
  o.setFullYear(a, t, 15), o.setHours(0, 0, 0, 0);
  const s = cr(o);
  return n.setMonth(t, Math.min(r, s)), n;
}
function Ht(e, t) {
  const n = D(e);
  return isNaN(+n) ? q(e, NaN) : (n.setFullYear(t), n);
}
function vs(e, t) {
  return $(e, -t);
}
var x = function() {
  return x = Object.assign || function(t) {
    for (var n, a = 1, r = arguments.length; a < r; a++) {
      n = arguments[a];
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
    }
    return t;
  }, x.apply(this, arguments);
};
function Tr(e, t) {
  var n = {};
  for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, a = Object.getOwnPropertySymbols(e); r < a.length; r++)
      t.indexOf(a[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[r]) && (n[a[r]] = e[a[r]]);
  return n;
}
function an(e, t, n) {
  for (var a = 0, r = t.length, o; a < r; a++)
    (o || !(a in t)) && (o || (o = Array.prototype.slice.call(t, 0, a)), o[a] = t[a]);
  return e.concat(o || Array.prototype.slice.call(t));
}
function Le(e) {
  return e.mode === "multiple";
}
function Re(e) {
  return e.mode === "range";
}
function Ge(e) {
  return e.mode === "single";
}
var jr = {
  root: "rdp",
  multiple_months: "rdp-multiple_months",
  with_weeknumber: "rdp-with_weeknumber",
  vhidden: "rdp-vhidden",
  button_reset: "rdp-button_reset",
  button: "rdp-button",
  caption: "rdp-caption",
  caption_start: "rdp-caption_start",
  caption_end: "rdp-caption_end",
  caption_between: "rdp-caption_between",
  caption_label: "rdp-caption_label",
  caption_dropdowns: "rdp-caption_dropdowns",
  dropdown: "rdp-dropdown",
  dropdown_month: "rdp-dropdown_month",
  dropdown_year: "rdp-dropdown_year",
  dropdown_icon: "rdp-dropdown_icon",
  months: "rdp-months",
  month: "rdp-month",
  table: "rdp-table",
  tbody: "rdp-tbody",
  tfoot: "rdp-tfoot",
  head: "rdp-head",
  head_row: "rdp-head_row",
  head_cell: "rdp-head_cell",
  nav: "rdp-nav",
  nav_button: "rdp-nav_button",
  nav_button_previous: "rdp-nav_button_previous",
  nav_button_next: "rdp-nav_button_next",
  nav_icon: "rdp-nav_icon",
  row: "rdp-row",
  weeknumber: "rdp-weeknumber",
  cell: "rdp-cell",
  day: "rdp-day",
  day_today: "rdp-day_today",
  day_outside: "rdp-day_outside",
  day_selected: "rdp-day_selected",
  day_disabled: "rdp-day_disabled",
  day_hidden: "rdp-day_hidden",
  day_range_start: "rdp-day_range_start",
  day_range_end: "rdp-day_range_end",
  day_range_middle: "rdp-day_range_middle"
};
function Er(e, t) {
  return ge(e, "LLLL y", t);
}
function Wr(e, t) {
  return ge(e, "d", t);
}
function Yr(e, t) {
  return ge(e, "LLLL", t);
}
function Fr(e) {
  return "".concat(e);
}
function Ir(e, t) {
  return ge(e, "cccccc", t);
}
function Lr(e, t) {
  return ge(e, "yyyy", t);
}
var Rr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  formatCaption: Er,
  formatDay: Wr,
  formatMonthCaption: Yr,
  formatWeekNumber: Fr,
  formatWeekdayName: Ir,
  formatYearCaption: Lr
}), Br = function(e, t, n) {
  return ge(e, "do MMMM (EEEE)", n);
}, Hr = function() {
  return "Month: ";
}, Ar = function() {
  return "Go to next month";
}, zr = function() {
  return "Go to previous month";
}, qr = function(e, t) {
  return ge(e, "cccc", t);
}, Xr = function(e) {
  return "Week n. ".concat(e);
}, $r = function() {
  return "Year: ";
}, Ur = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  labelDay: Br,
  labelMonthDropdown: Hr,
  labelNext: Ar,
  labelPrevious: zr,
  labelWeekNumber: Xr,
  labelWeekday: qr,
  labelYearDropdown: $r
});
function Vr() {
  var e = "buttons", t = jr, n = gt, a = {}, r = {}, o = 1, s = {}, i = /* @__PURE__ */ new Date();
  return {
    captionLayout: e,
    classNames: t,
    formatters: Rr,
    labels: Ur,
    locale: n,
    modifiersClassNames: a,
    modifiers: r,
    numberOfMonths: o,
    styles: s,
    today: i,
    mode: "default"
  };
}
function Qr(e) {
  var t = e.fromYear, n = e.toYear, a = e.fromMonth, r = e.toMonth, o = e.fromDate, s = e.toDate;
  return a ? o = z(a) : t && (o = new Date(t, 0, 1)), r ? s = Qe(r) : n && (s = new Date(n, 11, 31)), {
    fromDate: o ? Ce(o) : void 0,
    toDate: s ? Ce(s) : void 0
  };
}
var rn = _.createContext(void 0);
function Gr(e) {
  var t, n = e.initialProps, a = Vr(), r = Qr(n), o = r.fromDate, s = r.toDate, i = (t = n.captionLayout) !== null && t !== void 0 ? t : a.captionLayout;
  i !== "buttons" && (!o || !s) && (i = "buttons");
  var u;
  (Ge(n) || Le(n) || Re(n)) && (u = n.onSelect);
  var d = x(x(x({}, a), n), { captionLayout: i, classNames: x(x({}, a.classNames), n.classNames), components: x({}, n.components), formatters: x(x({}, a.formatters), n.formatters), fromDate: o, labels: x(x({}, a.labels), n.labels), mode: n.mode || a.mode, modifiers: x(x({}, a.modifiers), n.modifiers), modifiersClassNames: x(x({}, a.modifiersClassNames), n.modifiersClassNames), onSelect: u, styles: x(x({}, a.styles), n.styles), toDate: s });
  return f.jsx(rn.Provider, { value: d, children: e.children });
}
function T() {
  var e = _.useContext(rn);
  if (!e)
    throw new Error("useDayPicker must be used within a DayPickerProvider.");
  return e;
}
function on(e) {
  var t = T(), n = t.locale, a = t.classNames, r = t.styles, o = t.formatters.formatCaption;
  return f.jsx("div", { className: a.caption_label, style: r.caption_label, "aria-live": "polite", role: "presentation", id: e.id, children: o(e.displayMonth, { locale: n }) });
}
function Jr(e) {
  return f.jsx("svg", x({ width: "8px", height: "8px", viewBox: "0 0 120 120", "data-testid": "iconDropdown" }, e, { children: f.jsx("path", { d: "M4.22182541,48.2218254 C8.44222828,44.0014225 15.2388494,43.9273804 19.5496459,47.9996989 L19.7781746,48.2218254 L60,88.443 L100.221825,48.2218254 C104.442228,44.0014225 111.238849,43.9273804 115.549646,47.9996989 L115.778175,48.2218254 C119.998577,52.4422283 120.07262,59.2388494 116.000301,63.5496459 L115.778175,63.7781746 L67.7781746,111.778175 C63.5577717,115.998577 56.7611506,116.07262 52.4503541,112.000301 L52.2218254,111.778175 L4.22182541,63.7781746 C-0.0739418023,59.4824074 -0.0739418023,52.5175926 4.22182541,48.2218254 Z", fill: "currentColor", fillRule: "nonzero" }) }));
}
function sn(e) {
  var t, n, a = e.onChange, r = e.value, o = e.children, s = e.caption, i = e.className, u = e.style, d = T(), c = (n = (t = d.components) === null || t === void 0 ? void 0 : t.IconDropdown) !== null && n !== void 0 ? n : Jr;
  return f.jsxs("div", { className: i, style: u, children: [f.jsx("span", { className: d.classNames.vhidden, children: e["aria-label"] }), f.jsx("select", { name: e.name, "aria-label": e["aria-label"], className: d.classNames.dropdown, style: d.styles.dropdown, value: r, onChange: a, children: o }), f.jsxs("div", { className: d.classNames.caption_label, style: d.styles.caption_label, "aria-hidden": "true", children: [s, f.jsx(c, { className: d.classNames.dropdown_icon, style: d.styles.dropdown_icon })] })] });
}
function Kr(e) {
  var t, n = T(), a = n.fromDate, r = n.toDate, o = n.styles, s = n.locale, i = n.formatters.formatMonthCaption, u = n.classNames, d = n.components, c = n.labels.labelMonthDropdown;
  if (!a)
    return f.jsx(f.Fragment, {});
  if (!r)
    return f.jsx(f.Fragment, {});
  var h = [];
  if (vr(a, r))
    for (var v = z(a), l = a.getMonth(); l <= r.getMonth(); l++)
      h.push(ot(v, l));
  else
    for (var v = z(/* @__PURE__ */ new Date()), l = 0; l <= 11; l++)
      h.push(ot(v, l));
  var y = function(w) {
    var P = Number(w.target.value), k = ot(z(e.displayMonth), P);
    e.onChange(k);
  }, g = (t = d?.Dropdown) !== null && t !== void 0 ? t : sn;
  return f.jsx(g, { name: "months", "aria-label": c(), className: u.dropdown_month, style: o.dropdown_month, onChange: y, value: e.displayMonth.getMonth(), caption: i(e.displayMonth, { locale: s }), children: h.map(function(w) {
    return f.jsx("option", { value: w.getMonth(), children: i(w, { locale: s }) }, w.getMonth());
  }) });
}
function Zr(e) {
  var t, n = e.displayMonth, a = T(), r = a.fromDate, o = a.toDate, s = a.locale, i = a.styles, u = a.classNames, d = a.components, c = a.formatters.formatYearCaption, h = a.labels.labelYearDropdown, v = [];
  if (!r)
    return f.jsx(f.Fragment, {});
  if (!o)
    return f.jsx(f.Fragment, {});
  for (var l = r.getFullYear(), y = o.getFullYear(), g = l; g <= y; g++)
    v.push(Ht(Qt(/* @__PURE__ */ new Date()), g));
  var w = function(k) {
    var R = Ht(z(n), Number(k.target.value));
    e.onChange(R);
  }, P = (t = d?.Dropdown) !== null && t !== void 0 ? t : sn;
  return f.jsx(P, { name: "years", "aria-label": h(), className: u.dropdown_year, style: i.dropdown_year, onChange: w, value: n.getFullYear(), caption: c(n, { locale: s }), children: v.map(function(k) {
    return f.jsx("option", { value: k.getFullYear(), children: c(k, { locale: s }) }, k.getFullYear());
  }) });
}
function eo(e, t) {
  var n = _.useState(e), a = n[0], r = n[1], o = t === void 0 ? a : t;
  return [o, r];
}
function to(e) {
  var t = e.month, n = e.defaultMonth, a = e.today, r = t || n || a || /* @__PURE__ */ new Date(), o = e.toDate, s = e.fromDate, i = e.numberOfMonths, u = i === void 0 ? 1 : i;
  if (o && Oe(o, r) < 0) {
    var d = -1 * (u - 1);
    r = $(o, d);
  }
  return s && Oe(r, s) < 0 && (r = s), z(r);
}
function no() {
  var e = T(), t = to(e), n = eo(t, e.month), a = n[0], r = n[1], o = function(s) {
    var i;
    if (!e.disableNavigation) {
      var u = z(s);
      r(u), (i = e.onMonthChange) === null || i === void 0 || i.call(e, u);
    }
  };
  return [a, o];
}
function ao(e, t) {
  for (var n = t.reverseMonths, a = t.numberOfMonths, r = z(e), o = z($(r, a)), s = Oe(o, r), i = [], u = 0; u < s; u++) {
    var d = $(r, u);
    i.push(d);
  }
  return n && (i = i.reverse()), i;
}
function ro(e, t) {
  if (!t.disableNavigation) {
    var n = t.toDate, a = t.pagedNavigation, r = t.numberOfMonths, o = r === void 0 ? 1 : r, s = a ? o : 1, i = z(e);
    if (!n)
      return $(i, s);
    var u = Oe(n, e);
    if (!(u < o))
      return $(i, s);
  }
}
function oo(e, t) {
  if (!t.disableNavigation) {
    var n = t.fromDate, a = t.pagedNavigation, r = t.numberOfMonths, o = r === void 0 ? 1 : r, s = a ? o : 1, i = z(e);
    if (!n)
      return $(i, -s);
    var u = Oe(i, n);
    if (!(u <= 0))
      return $(i, -s);
  }
}
var ln = _.createContext(void 0);
function so(e) {
  var t = T(), n = no(), a = n[0], r = n[1], o = ao(a, t), s = ro(a, t), i = oo(a, t), u = function(h) {
    return o.some(function(v) {
      return pt(h, v);
    });
  }, d = function(h, v) {
    u(h) || (v && tn(h, v) ? r($(h, 1 + t.numberOfMonths * -1)) : r(h));
  }, c = {
    currentMonth: a,
    displayMonths: o,
    goToMonth: r,
    goToDate: d,
    previousMonth: i,
    nextMonth: s,
    isDateDisplayed: u
  };
  return f.jsx(ln.Provider, { value: c, children: e.children });
}
function Be() {
  var e = _.useContext(ln);
  if (!e)
    throw new Error("useNavigation must be used within a NavigationProvider");
  return e;
}
function At(e) {
  var t, n = T(), a = n.classNames, r = n.styles, o = n.components, s = Be().goToMonth, i = function(c) {
    s($(c, e.displayIndex ? -e.displayIndex : 0));
  }, u = (t = o?.CaptionLabel) !== null && t !== void 0 ? t : on, d = f.jsx(u, { id: e.id, displayMonth: e.displayMonth });
  return f.jsxs("div", { className: a.caption_dropdowns, style: r.caption_dropdowns, children: [f.jsx("div", { className: a.vhidden, children: d }), f.jsx(Kr, { onChange: i, displayMonth: e.displayMonth }), f.jsx(Zr, { onChange: i, displayMonth: e.displayMonth })] });
}
function io(e) {
  return f.jsx("svg", x({ width: "16px", height: "16px", viewBox: "0 0 120 120" }, e, { children: f.jsx("path", { d: "M69.490332,3.34314575 C72.6145263,0.218951416 77.6798462,0.218951416 80.8040405,3.34314575 C83.8617626,6.40086786 83.9268205,11.3179931 80.9992143,14.4548388 L80.8040405,14.6568542 L35.461,60 L80.8040405,105.343146 C83.8617626,108.400868 83.9268205,113.317993 80.9992143,116.454839 L80.8040405,116.656854 C77.7463184,119.714576 72.8291931,119.779634 69.6923475,116.852028 L69.490332,116.656854 L18.490332,65.6568542 C15.4326099,62.5991321 15.367552,57.6820069 18.2951583,54.5451612 L18.490332,54.3431458 L69.490332,3.34314575 Z", fill: "currentColor", fillRule: "nonzero" }) }));
}
function lo(e) {
  return f.jsx("svg", x({ width: "16px", height: "16px", viewBox: "0 0 120 120" }, e, { children: f.jsx("path", { d: "M49.8040405,3.34314575 C46.6798462,0.218951416 41.6145263,0.218951416 38.490332,3.34314575 C35.4326099,6.40086786 35.367552,11.3179931 38.2951583,14.4548388 L38.490332,14.6568542 L83.8333725,60 L38.490332,105.343146 C35.4326099,108.400868 35.367552,113.317993 38.2951583,116.454839 L38.490332,116.656854 C41.5480541,119.714576 46.4651794,119.779634 49.602025,116.852028 L49.8040405,116.656854 L100.804041,65.6568542 C103.861763,62.5991321 103.926821,57.6820069 100.999214,54.5451612 L100.804041,54.3431458 L49.8040405,3.34314575 Z", fill: "currentColor" }) }));
}
var Ve = _.forwardRef(function(e, t) {
  var n = T(), a = n.classNames, r = n.styles, o = [a.button_reset, a.button];
  e.className && o.push(e.className);
  var s = o.join(" "), i = x(x({}, r.button_reset), r.button);
  return e.style && Object.assign(i, e.style), f.jsx("button", x({}, e, { ref: t, type: "button", className: s, style: i }));
});
function uo(e) {
  var t, n, a = T(), r = a.dir, o = a.locale, s = a.classNames, i = a.styles, u = a.labels, d = u.labelPrevious, c = u.labelNext, h = a.components;
  if (!e.nextMonth && !e.previousMonth)
    return f.jsx(f.Fragment, {});
  var v = d(e.previousMonth, { locale: o }), l = [
    s.nav_button,
    s.nav_button_previous
  ].join(" "), y = c(e.nextMonth, { locale: o }), g = [
    s.nav_button,
    s.nav_button_next
  ].join(" "), w = (t = h?.IconRight) !== null && t !== void 0 ? t : lo, P = (n = h?.IconLeft) !== null && n !== void 0 ? n : io;
  return f.jsxs("div", { className: s.nav, style: i.nav, children: [!e.hidePrevious && f.jsx(Ve, { name: "previous-month", "aria-label": v, className: l, style: i.nav_button_previous, disabled: !e.previousMonth, onClick: e.onPreviousClick, children: r === "rtl" ? f.jsx(w, { className: s.nav_icon, style: i.nav_icon }) : f.jsx(P, { className: s.nav_icon, style: i.nav_icon }) }), !e.hideNext && f.jsx(Ve, { name: "next-month", "aria-label": y, className: g, style: i.nav_button_next, disabled: !e.nextMonth, onClick: e.onNextClick, children: r === "rtl" ? f.jsx(P, { className: s.nav_icon, style: i.nav_icon }) : f.jsx(w, { className: s.nav_icon, style: i.nav_icon }) })] });
}
function zt(e) {
  var t = T().numberOfMonths, n = Be(), a = n.previousMonth, r = n.nextMonth, o = n.goToMonth, s = n.displayMonths, i = s.findIndex(function(y) {
    return pt(e.displayMonth, y);
  }), u = i === 0, d = i === s.length - 1, c = t > 1 && (u || !d), h = t > 1 && (d || !u), v = function() {
    a && o(a);
  }, l = function() {
    r && o(r);
  };
  return f.jsx(uo, { displayMonth: e.displayMonth, hideNext: c, hidePrevious: h, nextMonth: r, previousMonth: a, onPreviousClick: v, onNextClick: l });
}
function co(e) {
  var t, n = T(), a = n.classNames, r = n.disableNavigation, o = n.styles, s = n.captionLayout, i = n.components, u = (t = i?.CaptionLabel) !== null && t !== void 0 ? t : on, d;
  return r ? d = f.jsx(u, { id: e.id, displayMonth: e.displayMonth }) : s === "dropdown" ? d = f.jsx(At, { displayMonth: e.displayMonth, id: e.id }) : s === "dropdown-buttons" ? d = f.jsxs(f.Fragment, { children: [f.jsx(At, { displayMonth: e.displayMonth, displayIndex: e.displayIndex, id: e.id }), f.jsx(zt, { displayMonth: e.displayMonth, displayIndex: e.displayIndex, id: e.id })] }) : d = f.jsxs(f.Fragment, { children: [f.jsx(u, { id: e.id, displayMonth: e.displayMonth, displayIndex: e.displayIndex }), f.jsx(zt, { displayMonth: e.displayMonth, id: e.id })] }), f.jsx("div", { className: a.caption, style: o.caption, children: d });
}
function fo(e) {
  var t = T(), n = t.footer, a = t.styles, r = t.classNames.tfoot;
  return n ? f.jsx("tfoot", { className: r, style: a.tfoot, children: f.jsx("tr", { children: f.jsx("td", { colSpan: 8, children: n }) }) }) : f.jsx(f.Fragment, {});
}
function ho(e, t, n) {
  for (var a = n ? ve(/* @__PURE__ */ new Date()) : ee(/* @__PURE__ */ new Date(), { locale: e, weekStartsOn: t }), r = [], o = 0; o < 7; o++) {
    var s = L(a, o);
    r.push(s);
  }
  return r;
}
function mo() {
  var e = T(), t = e.classNames, n = e.styles, a = e.showWeekNumber, r = e.locale, o = e.weekStartsOn, s = e.ISOWeek, i = e.formatters.formatWeekdayName, u = e.labels.labelWeekday, d = ho(r, o, s);
  return f.jsxs("tr", { style: n.head_row, className: t.head_row, children: [a && f.jsx("td", { style: n.head_cell, className: t.head_cell }), d.map(function(c, h) {
    return f.jsx("th", { scope: "col", className: t.head_cell, style: n.head_cell, "aria-label": u(c, { locale: r }), children: i(c, { locale: r }) }, h);
  })] });
}
function vo() {
  var e, t = T(), n = t.classNames, a = t.styles, r = t.components, o = (e = r?.HeadRow) !== null && e !== void 0 ? e : mo;
  return f.jsx("thead", { style: a.head, className: n.head, children: f.jsx(o, {}) });
}
function go(e) {
  var t = T(), n = t.locale, a = t.formatters.formatDay;
  return f.jsx(f.Fragment, { children: a(e.date, { locale: n }) });
}
var yt = _.createContext(void 0);
function po(e) {
  if (!Le(e.initialProps)) {
    var t = {
      selected: void 0,
      modifiers: {
        disabled: []
      }
    };
    return f.jsx(yt.Provider, { value: t, children: e.children });
  }
  return f.jsx(yo, { initialProps: e.initialProps, children: e.children });
}
function yo(e) {
  var t = e.initialProps, n = e.children, a = t.selected, r = t.min, o = t.max, s = function(d, c, h) {
    var v, l;
    (v = t.onDayClick) === null || v === void 0 || v.call(t, d, c, h);
    var y = !!(c.selected && r && a?.length === r);
    if (!y) {
      var g = !!(!c.selected && o && a?.length === o);
      if (!g) {
        var w = a ? an([], a) : [];
        if (c.selected) {
          var P = w.findIndex(function(k) {
            return A(d, k);
          });
          w.splice(P, 1);
        } else
          w.push(d);
        (l = t.onSelect) === null || l === void 0 || l.call(t, w, d, c, h);
      }
    }
  }, i = {
    disabled: []
  };
  a && i.disabled.push(function(d) {
    var c = o && a.length > o - 1, h = a.some(function(v) {
      return A(v, d);
    });
    return !!(c && !h);
  });
  var u = {
    selected: a,
    onDayClick: s,
    modifiers: i
  };
  return f.jsx(yt.Provider, { value: u, children: n });
}
function bt() {
  var e = _.useContext(yt);
  if (!e)
    throw new Error("useSelectMultiple must be used within a SelectMultipleProvider");
  return e;
}
function bo(e, t) {
  var n = t || {}, a = n.from, r = n.to;
  return a && r ? A(r, e) && A(a, e) ? void 0 : A(r, e) ? { from: r, to: void 0 } : A(a, e) ? void 0 : ft(a, e) ? { from: e, to: r } : { from: a, to: e } : r ? ft(e, r) ? { from: r, to: e } : { from: e, to: r } : a ? tn(e, a) ? { from: e, to: a } : { from: a, to: e } : { from: e, to: void 0 };
}
var wt = _.createContext(void 0);
function wo(e) {
  if (!Re(e.initialProps)) {
    var t = {
      selected: void 0,
      modifiers: {
        range_start: [],
        range_end: [],
        range_middle: [],
        disabled: []
      }
    };
    return f.jsx(wt.Provider, { value: t, children: e.children });
  }
  return f.jsx(xo, { initialProps: e.initialProps, children: e.children });
}
function xo(e) {
  var t = e.initialProps, n = e.children, a = t.selected, r = a || {}, o = r.from, s = r.to, i = t.min, u = t.max, d = function(l, y, g) {
    var w, P;
    (w = t.onDayClick) === null || w === void 0 || w.call(t, l, y, g);
    var k = bo(l, a);
    (P = t.onSelect) === null || P === void 0 || P.call(t, k, l, y, g);
  }, c = {
    range_start: [],
    range_end: [],
    range_middle: [],
    disabled: []
  };
  if (o ? (c.range_start = [o], s ? (c.range_end = [s], A(o, s) || (c.range_middle = [
    {
      after: o,
      before: s
    }
  ])) : c.range_end = [o]) : s && (c.range_start = [s], c.range_end = [s]), i && (o && !s && c.disabled.push({
    after: at(o, i - 1),
    before: L(o, i - 1)
  }), o && s && c.disabled.push({
    after: o,
    before: L(o, i - 1)
  }), !o && s && c.disabled.push({
    after: at(s, i - 1),
    before: L(s, i - 1)
  })), u) {
    if (o && !s && (c.disabled.push({
      before: L(o, -u + 1)
    }), c.disabled.push({
      after: L(o, u - 1)
    })), o && s) {
      var h = K(s, o) + 1, v = u - h;
      c.disabled.push({
        before: at(o, v)
      }), c.disabled.push({
        after: L(s, v)
      });
    }
    !o && s && (c.disabled.push({
      before: L(s, -u + 1)
    }), c.disabled.push({
      after: L(s, u - 1)
    }));
  }
  return f.jsx(wt.Provider, { value: { selected: a, onDayClick: d, modifiers: c }, children: n });
}
function xt() {
  var e = _.useContext(wt);
  if (!e)
    throw new Error("useSelectRange must be used within a SelectRangeProvider");
  return e;
}
function Ue(e) {
  return Array.isArray(e) ? an([], e) : e !== void 0 ? [e] : [];
}
function Do(e) {
  var t = {};
  return Object.entries(e).forEach(function(n) {
    var a = n[0], r = n[1];
    t[a] = Ue(r);
  }), t;
}
var Z;
(function(e) {
  e.Outside = "outside", e.Disabled = "disabled", e.Selected = "selected", e.Hidden = "hidden", e.Today = "today", e.RangeStart = "range_start", e.RangeEnd = "range_end", e.RangeMiddle = "range_middle";
})(Z || (Z = {}));
var Mo = Z.Selected, ae = Z.Disabled, No = Z.Hidden, ko = Z.Today, st = Z.RangeEnd, it = Z.RangeMiddle, lt = Z.RangeStart, _o = Z.Outside;
function Co(e, t, n) {
  var a, r = (a = {}, a[Mo] = Ue(e.selected), a[ae] = Ue(e.disabled), a[No] = Ue(e.hidden), a[ko] = [e.today], a[st] = [], a[it] = [], a[lt] = [], a[_o] = [], a);
  return e.fromDate && r[ae].push({ before: e.fromDate }), e.toDate && r[ae].push({ after: e.toDate }), Le(e) ? r[ae] = r[ae].concat(t.modifiers[ae]) : Re(e) && (r[ae] = r[ae].concat(n.modifiers[ae]), r[lt] = n.modifiers[lt], r[it] = n.modifiers[it], r[st] = n.modifiers[st]), r;
}
var un = _.createContext(void 0);
function So(e) {
  var t = T(), n = bt(), a = xt(), r = Co(t, n, a), o = Do(t.modifiers), s = x(x({}, r), o);
  return f.jsx(un.Provider, { value: s, children: e.children });
}
function dn() {
  var e = _.useContext(un);
  if (!e)
    throw new Error("useModifiers must be used within a ModifiersProvider");
  return e;
}
function Oo(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Po(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function To(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function jo(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Eo(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function Wo(e, t) {
  var n, a = t.from, r = t.to;
  if (a && r) {
    var o = K(r, a) < 0;
    o && (n = [r, a], a = n[0], r = n[1]);
    var s = K(e, a) >= 0 && K(r, e) >= 0;
    return s;
  }
  return r ? A(r, e) : a ? A(a, e) : !1;
}
function Yo(e) {
  return mt(e);
}
function Fo(e) {
  return Array.isArray(e) && e.every(mt);
}
function Io(e, t) {
  return t.some(function(n) {
    if (typeof n == "boolean")
      return n;
    if (Yo(n))
      return A(e, n);
    if (Fo(n))
      return n.includes(e);
    if (Po(n))
      return Wo(e, n);
    if (Eo(n))
      return n.dayOfWeek.includes(e.getDay());
    if (Oo(n)) {
      var a = K(n.before, e), r = K(n.after, e), o = a > 0, s = r < 0, i = ft(n.before, n.after);
      return i ? s && o : o || s;
    }
    return To(n) ? K(e, n.after) > 0 : jo(n) ? K(n.before, e) > 0 : typeof n == "function" ? n(e) : !1;
  });
}
function Dt(e, t, n) {
  var a = Object.keys(t).reduce(function(o, s) {
    var i = t[s];
    return Io(e, i) && o.push(s), o;
  }, []), r = {};
  return a.forEach(function(o) {
    return r[o] = !0;
  }), n && !pt(e, n) && (r.outside = !0), r;
}
function Lo(e, t) {
  for (var n = z(e[0]), a = Qe(e[e.length - 1]), r, o, s = n; s <= a; ) {
    var i = Dt(s, t), u = !i.disabled && !i.hidden;
    if (!u) {
      s = L(s, 1);
      continue;
    }
    if (i.selected)
      return s;
    i.today && !o && (o = s), r || (r = s), s = L(s, 1);
  }
  return o || r;
}
var Ro = 365;
function cn(e, t) {
  var n = t.moveBy, a = t.direction, r = t.context, o = t.modifiers, s = t.retry, i = s === void 0 ? { count: 0, lastFocused: e } : s, u = r.weekStartsOn, d = r.fromDate, c = r.toDate, h = r.locale, v = {
    day: L,
    week: ct,
    month: $,
    year: aa,
    startOfWeek: function(w) {
      return r.ISOWeek ? ve(w) : ee(w, { locale: h, weekStartsOn: u });
    },
    endOfWeek: function(w) {
      return r.ISOWeek ? Gt(w) : vt(w, { locale: h, weekStartsOn: u });
    }
  }, l = v[n](e, a === "after" ? 1 : -1);
  a === "before" && d ? l = ra([d, l]) : a === "after" && c && (l = oa([c, l]));
  var y = !0;
  if (o) {
    var g = Dt(l, o);
    y = !g.disabled && !g.hidden;
  }
  return y ? l : i.count > Ro ? i.lastFocused : cn(l, {
    moveBy: n,
    direction: a,
    context: r,
    modifiers: o,
    retry: x(x({}, i), { count: i.count + 1 })
  });
}
var fn = _.createContext(void 0);
function Bo(e) {
  var t = Be(), n = dn(), a = _.useState(), r = a[0], o = a[1], s = _.useState(), i = s[0], u = s[1], d = Lo(t.displayMonths, n), c = r ?? (i && t.isDateDisplayed(i)) ? i : d, h = function() {
    u(r), o(void 0);
  }, v = function(w) {
    o(w);
  }, l = T(), y = function(w, P) {
    if (r) {
      var k = cn(r, {
        moveBy: w,
        direction: P,
        context: l,
        modifiers: n
      });
      A(r, k) || (t.goToDate(k, r), v(k));
    }
  }, g = {
    focusedDay: r,
    focusTarget: c,
    blur: h,
    focus: v,
    focusDayAfter: function() {
      return y("day", "after");
    },
    focusDayBefore: function() {
      return y("day", "before");
    },
    focusWeekAfter: function() {
      return y("week", "after");
    },
    focusWeekBefore: function() {
      return y("week", "before");
    },
    focusMonthBefore: function() {
      return y("month", "before");
    },
    focusMonthAfter: function() {
      return y("month", "after");
    },
    focusYearBefore: function() {
      return y("year", "before");
    },
    focusYearAfter: function() {
      return y("year", "after");
    },
    focusStartOfWeek: function() {
      return y("startOfWeek", "before");
    },
    focusEndOfWeek: function() {
      return y("endOfWeek", "after");
    }
  };
  return f.jsx(fn.Provider, { value: g, children: e.children });
}
function Mt() {
  var e = _.useContext(fn);
  if (!e)
    throw new Error("useFocusContext must be used within a FocusProvider");
  return e;
}
function Ho(e, t) {
  var n = dn(), a = Dt(e, n, t);
  return a;
}
var Nt = _.createContext(void 0);
function Ao(e) {
  if (!Ge(e.initialProps)) {
    var t = {
      selected: void 0
    };
    return f.jsx(Nt.Provider, { value: t, children: e.children });
  }
  return f.jsx(zo, { initialProps: e.initialProps, children: e.children });
}
function zo(e) {
  var t = e.initialProps, n = e.children, a = function(o, s, i) {
    var u, d, c;
    if ((u = t.onDayClick) === null || u === void 0 || u.call(t, o, s, i), s.selected && !t.required) {
      (d = t.onSelect) === null || d === void 0 || d.call(t, void 0, o, s, i);
      return;
    }
    (c = t.onSelect) === null || c === void 0 || c.call(t, o, o, s, i);
  }, r = {
    selected: t.selected,
    onDayClick: a
  };
  return f.jsx(Nt.Provider, { value: r, children: n });
}
function hn() {
  var e = _.useContext(Nt);
  if (!e)
    throw new Error("useSelectSingle must be used within a SelectSingleProvider");
  return e;
}
function qo(e, t) {
  var n = T(), a = hn(), r = bt(), o = xt(), s = Mt(), i = s.focusDayAfter, u = s.focusDayBefore, d = s.focusWeekAfter, c = s.focusWeekBefore, h = s.blur, v = s.focus, l = s.focusMonthBefore, y = s.focusMonthAfter, g = s.focusYearBefore, w = s.focusYearAfter, P = s.focusStartOfWeek, k = s.focusEndOfWeek, R = function(p) {
    var b, N, I, ce;
    Ge(n) ? (b = a.onDayClick) === null || b === void 0 || b.call(a, e, t, p) : Le(n) ? (N = r.onDayClick) === null || N === void 0 || N.call(r, e, t, p) : Re(n) ? (I = o.onDayClick) === null || I === void 0 || I.call(o, e, t, p) : (ce = n.onDayClick) === null || ce === void 0 || ce.call(n, e, t, p);
  }, ue = function(p) {
    var b;
    v(e), (b = n.onDayFocus) === null || b === void 0 || b.call(n, e, t, p);
  }, te = function(p) {
    var b;
    h(), (b = n.onDayBlur) === null || b === void 0 || b.call(n, e, t, p);
  }, F = function(p) {
    var b;
    (b = n.onDayMouseEnter) === null || b === void 0 || b.call(n, e, t, p);
  }, de = function(p) {
    var b;
    (b = n.onDayMouseLeave) === null || b === void 0 || b.call(n, e, t, p);
  }, pe = function(p) {
    var b;
    (b = n.onDayPointerEnter) === null || b === void 0 || b.call(n, e, t, p);
  }, ye = function(p) {
    var b;
    (b = n.onDayPointerLeave) === null || b === void 0 || b.call(n, e, t, p);
  }, Te = function(p) {
    var b;
    (b = n.onDayTouchCancel) === null || b === void 0 || b.call(n, e, t, p);
  }, be = function(p) {
    var b;
    (b = n.onDayTouchEnd) === null || b === void 0 || b.call(n, e, t, p);
  }, U = function(p) {
    var b;
    (b = n.onDayTouchMove) === null || b === void 0 || b.call(n, e, t, p);
  }, we = function(p) {
    var b;
    (b = n.onDayTouchStart) === null || b === void 0 || b.call(n, e, t, p);
  }, re = function(p) {
    var b;
    (b = n.onDayKeyUp) === null || b === void 0 || b.call(n, e, t, p);
  }, xe = function(p) {
    var b;
    switch (p.key) {
      case "ArrowLeft":
        p.preventDefault(), p.stopPropagation(), n.dir === "rtl" ? i() : u();
        break;
      case "ArrowRight":
        p.preventDefault(), p.stopPropagation(), n.dir === "rtl" ? u() : i();
        break;
      case "ArrowDown":
        p.preventDefault(), p.stopPropagation(), d();
        break;
      case "ArrowUp":
        p.preventDefault(), p.stopPropagation(), c();
        break;
      case "PageUp":
        p.preventDefault(), p.stopPropagation(), p.shiftKey ? g() : l();
        break;
      case "PageDown":
        p.preventDefault(), p.stopPropagation(), p.shiftKey ? w() : y();
        break;
      case "Home":
        p.preventDefault(), p.stopPropagation(), P();
        break;
      case "End":
        p.preventDefault(), p.stopPropagation(), k();
        break;
    }
    (b = n.onDayKeyDown) === null || b === void 0 || b.call(n, e, t, p);
  }, ne = {
    onClick: R,
    onFocus: ue,
    onBlur: te,
    onKeyDown: xe,
    onKeyUp: re,
    onMouseEnter: F,
    onMouseLeave: de,
    onPointerEnter: pe,
    onPointerLeave: ye,
    onTouchCancel: Te,
    onTouchEnd: be,
    onTouchMove: U,
    onTouchStart: we
  };
  return ne;
}
function Xo() {
  var e = T(), t = hn(), n = bt(), a = xt(), r = Ge(e) ? t.selected : Le(e) ? n.selected : Re(e) ? a.selected : void 0;
  return r;
}
function $o(e) {
  return Object.values(Z).includes(e);
}
function Uo(e, t) {
  var n = [e.classNames.day];
  return Object.keys(t).forEach(function(a) {
    var r = e.modifiersClassNames[a];
    if (r)
      n.push(r);
    else if ($o(a)) {
      var o = e.classNames["day_".concat(a)];
      o && n.push(o);
    }
  }), n;
}
function Vo(e, t) {
  var n = x({}, e.styles.day);
  return Object.keys(t).forEach(function(a) {
    var r;
    n = x(x({}, n), (r = e.modifiersStyles) === null || r === void 0 ? void 0 : r[a]);
  }), n;
}
function Qo(e, t, n) {
  var a, r, o, s = T(), i = Mt(), u = Ho(e, t), d = qo(e, u), c = Xo(), h = !!(s.onDayClick || s.mode !== "default");
  _.useEffect(function() {
    var F;
    u.outside || i.focusedDay && h && A(i.focusedDay, e) && ((F = n.current) === null || F === void 0 || F.focus());
  }, [
    i.focusedDay,
    e,
    n,
    h,
    u.outside
  ]);
  var v = Uo(s, u).join(" "), l = Vo(s, u), y = !!(u.outside && !s.showOutsideDays || u.hidden), g = (o = (r = s.components) === null || r === void 0 ? void 0 : r.DayContent) !== null && o !== void 0 ? o : go, w = f.jsx(g, { date: e, displayMonth: t, activeModifiers: u }), P = {
    style: l,
    className: v,
    children: w,
    role: "gridcell"
  }, k = i.focusTarget && A(i.focusTarget, e) && !u.outside, R = i.focusedDay && A(i.focusedDay, e), ue = x(x(x({}, P), (a = { disabled: u.disabled, role: "gridcell" }, a["aria-selected"] = u.selected, a.tabIndex = R || k ? 0 : -1, a)), d), te = {
    isButton: h,
    isHidden: y,
    activeModifiers: u,
    selectedDays: c,
    buttonProps: ue,
    divProps: P
  };
  return te;
}
function Go(e) {
  var t = _.useRef(null), n = Qo(e.date, e.displayMonth, t);
  return n.isHidden ? f.jsx("div", { role: "gridcell" }) : n.isButton ? f.jsx(Ve, x({ name: "day", ref: t }, n.buttonProps)) : f.jsx("div", x({}, n.divProps));
}
function Jo(e) {
  var t = e.number, n = e.dates, a = T(), r = a.onWeekNumberClick, o = a.styles, s = a.classNames, i = a.locale, u = a.labels.labelWeekNumber, d = a.formatters.formatWeekNumber, c = d(Number(t), { locale: i });
  if (!r)
    return f.jsx("span", { className: s.weeknumber, style: o.weeknumber, children: c });
  var h = u(Number(t), { locale: i }), v = function(l) {
    r(t, n, l);
  };
  return f.jsx(Ve, { name: "week-number", "aria-label": h, className: s.weeknumber, style: o.weeknumber, onClick: v, children: c });
}
function Ko(e) {
  var t, n, a = T(), r = a.styles, o = a.classNames, s = a.showWeekNumber, i = a.components, u = (t = i?.Day) !== null && t !== void 0 ? t : Go, d = (n = i?.WeekNumber) !== null && n !== void 0 ? n : Jo, c;
  return s && (c = f.jsx("td", { className: o.cell, style: r.cell, children: f.jsx(d, { number: e.weekNumber, dates: e.dates }) })), f.jsxs("tr", { className: o.row, style: r.row, children: [c, e.dates.map(function(h) {
    return f.jsx("td", { className: o.cell, style: r.cell, role: "presentation", children: f.jsx(u, { displayMonth: e.displayMonth, date: h }) }, fr(h));
  })] });
}
function qt(e, t, n) {
  for (var a = n?.ISOWeek ? Gt(t) : vt(t, n), r = n?.ISOWeek ? ve(e) : ee(e, n), o = K(a, r), s = [], i = 0; i <= o; i++)
    s.push(L(r, i));
  var u = s.reduce(function(d, c) {
    var h = n?.ISOWeek ? Jt(c) : Zt(c, n), v = d.find(function(l) {
      return l.weekNumber === h;
    });
    return v ? (v.dates.push(c), d) : (d.push({
      weekNumber: h,
      dates: [c]
    }), d);
  }, []);
  return u;
}
function Zo(e, t) {
  var n = qt(z(e), Qe(e), t);
  if (t?.useFixedWeeks) {
    var a = mr(e, t);
    if (a < 6) {
      var r = n[n.length - 1], o = r.dates[r.dates.length - 1], s = ct(o, 6 - a), i = qt(ct(o, 1), s, t);
      n.push.apply(n, i);
    }
  }
  return n;
}
function es(e) {
  var t, n, a, r = T(), o = r.locale, s = r.classNames, i = r.styles, u = r.hideHead, d = r.fixedWeeks, c = r.components, h = r.weekStartsOn, v = r.firstWeekContainsDate, l = r.ISOWeek, y = Zo(e.displayMonth, {
    useFixedWeeks: !!d,
    ISOWeek: l,
    locale: o,
    weekStartsOn: h,
    firstWeekContainsDate: v
  }), g = (t = c?.Head) !== null && t !== void 0 ? t : vo, w = (n = c?.Row) !== null && n !== void 0 ? n : Ko, P = (a = c?.Footer) !== null && a !== void 0 ? a : fo;
  return f.jsxs("table", { id: e.id, className: s.table, style: i.table, role: "grid", "aria-labelledby": e["aria-labelledby"], children: [!u && f.jsx(g, {}), f.jsx("tbody", { className: s.tbody, style: i.tbody, children: y.map(function(k) {
    return f.jsx(w, { displayMonth: e.displayMonth, dates: k.dates, weekNumber: k.weekNumber }, k.weekNumber);
  }) }), f.jsx(P, { displayMonth: e.displayMonth })] });
}
function ts() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var ns = ts() ? _.useLayoutEffect : _.useEffect, ut = !1, as = 0;
function Xt() {
  return "react-day-picker-".concat(++as);
}
function rs(e) {
  var t, n = e ?? (ut ? Xt() : null), a = _.useState(n), r = a[0], o = a[1];
  return ns(function() {
    r === null && o(Xt());
  }, []), _.useEffect(function() {
    ut === !1 && (ut = !0);
  }, []), (t = e ?? r) !== null && t !== void 0 ? t : void 0;
}
function os(e) {
  var t, n, a = T(), r = a.dir, o = a.classNames, s = a.styles, i = a.components, u = Be().displayMonths, d = rs(a.id ? "".concat(a.id, "-").concat(e.displayIndex) : void 0), c = a.id ? "".concat(a.id, "-grid-").concat(e.displayIndex) : void 0, h = [o.month], v = s.month, l = e.displayIndex === 0, y = e.displayIndex === u.length - 1, g = !l && !y;
  r === "rtl" && (t = [l, y], y = t[0], l = t[1]), l && (h.push(o.caption_start), v = x(x({}, v), s.caption_start)), y && (h.push(o.caption_end), v = x(x({}, v), s.caption_end)), g && (h.push(o.caption_between), v = x(x({}, v), s.caption_between));
  var w = (n = i?.Caption) !== null && n !== void 0 ? n : co;
  return f.jsxs("div", { className: h.join(" "), style: v, children: [f.jsx(w, { id: d, displayMonth: e.displayMonth, displayIndex: e.displayIndex }), f.jsx(es, { id: c, "aria-labelledby": d, displayMonth: e.displayMonth })] }, e.displayIndex);
}
function ss(e) {
  var t = T(), n = t.classNames, a = t.styles;
  return f.jsx("div", { className: n.months, style: a.months, children: e.children });
}
function is(e) {
  var t, n, a = e.initialProps, r = T(), o = Mt(), s = Be(), i = _.useState(!1), u = i[0], d = i[1];
  _.useEffect(function() {
    r.initialFocus && o.focusTarget && (u || (o.focus(o.focusTarget), d(!0)));
  }, [
    r.initialFocus,
    u,
    o.focus,
    o.focusTarget,
    o
  ]);
  var c = [r.classNames.root, r.className];
  r.numberOfMonths > 1 && c.push(r.classNames.multiple_months), r.showWeekNumber && c.push(r.classNames.with_weeknumber);
  var h = x(x({}, r.styles.root), r.style), v = Object.keys(a).filter(function(y) {
    return y.startsWith("data-");
  }).reduce(function(y, g) {
    var w;
    return x(x({}, y), (w = {}, w[g] = a[g], w));
  }, {}), l = (n = (t = a.components) === null || t === void 0 ? void 0 : t.Months) !== null && n !== void 0 ? n : ss;
  return f.jsx("div", x({ className: c.join(" "), style: h, dir: r.dir, id: r.id, nonce: a.nonce, title: a.title, lang: a.lang }, v, { children: f.jsx(l, { children: s.displayMonths.map(function(y, g) {
    return f.jsx(os, { displayIndex: g, displayMonth: y }, g);
  }) }) }));
}
function ls(e) {
  var t = e.children, n = Tr(e, ["children"]);
  return f.jsx(Gr, { initialProps: n, children: f.jsx(so, { children: f.jsx(Ao, { initialProps: n, children: f.jsx(po, { initialProps: n, children: f.jsx(wo, { initialProps: n, children: f.jsx(So, { children: f.jsx(Bo, { children: t }) }) }) }) }) }) });
}
function gs(e) {
  return f.jsx(ls, x({}, e, { children: f.jsx(is, { initialProps: e }) }));
}
export {
  cs as $,
  gs as D,
  hs as a,
  ot as b,
  Ht as c,
  fs as d,
  vs as e,
  ge as f,
  ms as p,
  at as s,
  ds as u
};
