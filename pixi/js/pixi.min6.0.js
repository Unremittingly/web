/*!
 * pixi.js - v6.0.2
 * Compiled Mon, 05 Apr 2021 18:24:08 UTC
 *
 * pixi.js is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var PIXI = function (t) {
    "use strict";
    var e = setTimeout;

    function r(t) {
        return Boolean(t && void 0 !== t.length)
    }

    function i() {
    }

    function n(t) {
        if (!(this instanceof n)) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof t) throw new TypeError("not a function");
        this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], l(t, this)
    }

    function o(t, e) {
        for (; 3 === t._state;) t = t._value;
        0 !== t._state ? (t._handled = !0, n._immediateFn(function () {
            var r = 1 === t._state ? e.onFulfilled : e.onRejected;
            if (null !== r) {
                var i;
                try {
                    i = r(t._value)
                } catch (t) {
                    return void a(e.promise, t)
                }
                s(e.promise, i)
            } else (1 === t._state ? s : a)(e.promise, t._value)
        })) : t._deferreds.push(e)
    }

    function s(t, e) {
        try {
            if (e === t) throw new TypeError("A promise cannot be resolved with itself.");
            if (e && ("object" == typeof e || "function" == typeof e)) {
                var r = e.then;
                if (e instanceof n) return t._state = 3, t._value = e, void h(t);
                if ("function" == typeof r) return void l((i = r, o = e, function () {
                    i.apply(o, arguments)
                }), t)
            }
            t._state = 1, t._value = e, h(t)
        } catch (e) {
            a(t, e)
        }
        var i, o
    }

    function a(t, e) {
        t._state = 2, t._value = e, h(t)
    }

    function h(t) {
        2 === t._state && 0 === t._deferreds.length && n._immediateFn(function () {
            t._handled || n._unhandledRejectionFn(t._value)
        });
        for (var e = 0, r = t._deferreds.length; e < r; e++) o(t, t._deferreds[e]);
        t._deferreds = null
    }

    function u(t, e, r) {
        this.onFulfilled = "function" == typeof t ? t : null, this.onRejected = "function" == typeof e ? e : null, this.promise = r
    }

    function l(t, e) {
        var r = !1;
        try {
            t(function (t) {
                r || (r = !0, s(e, t))
            }, function (t) {
                r || (r = !0, a(e, t))
            })
        } catch (t) {
            if (r) return;
            r = !0, a(e, t)
        }
    }

    n.prototype.catch = function (t) {
        return this.then(null, t)
    }, n.prototype.then = function (t, e) {
        var r = new this.constructor(i);
        return o(this, new u(t, e, r)), r
    }, n.prototype.finally = function (t) {
        var e = this.constructor;
        return this.then(function (r) {
            return e.resolve(t()).then(function () {
                return r
            })
        }, function (r) {
            return e.resolve(t()).then(function () {
                return e.reject(r)
            })
        })
    }, n.all = function (t) {
        return new n(function (e, i) {
            if (!r(t)) return i(new TypeError("Promise.all accepts an array"));
            var n = Array.prototype.slice.call(t);
            if (0 === n.length) return e([]);
            var o = n.length;

            function s(t, r) {
                try {
                    if (r && ("object" == typeof r || "function" == typeof r)) {
                        var a = r.then;
                        if ("function" == typeof a) return void a.call(r, function (e) {
                            s(t, e)
                        }, i)
                    }
                    n[t] = r, 0 == --o && e(n)
                } catch (t) {
                    i(t)
                }
            }

            for (var a = 0; a < n.length; a++) s(a, n[a])
        })
    }, n.allSettled = function (t) {
        return new this(function (e, r) {
            if (!t || void 0 === t.length) return r(new TypeError(typeof t + " " + t + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
            var i = Array.prototype.slice.call(t);
            if (0 === i.length) return e([]);
            var n = i.length;

            function o(t, r) {
                if (r && ("object" == typeof r || "function" == typeof r)) {
                    var s = r.then;
                    if ("function" == typeof s) return void s.call(r, function (e) {
                        o(t, e)
                    }, function (r) {
                        i[t] = {status: "rejected", reason: r}, 0 == --n && e(i)
                    })
                }
                i[t] = {status: "fulfilled", value: r}, 0 == --n && e(i)
            }

            for (var s = 0; s < i.length; s++) o(s, i[s])
        })
    }, n.resolve = function (t) {
        return t && "object" == typeof t && t.constructor === n ? t : new n(function (e) {
            e(t)
        })
    }, n.reject = function (t) {
        return new n(function (e, r) {
            r(t)
        })
    }, n.race = function (t) {
        return new n(function (e, i) {
            if (!r(t)) return i(new TypeError("Promise.race accepts an array"));
            for (var o = 0, s = t.length; o < s; o++) n.resolve(t[o]).then(e, i)
        })
    }, n._immediateFn = "function" == typeof setImmediate && function (t) {
        setImmediate(t)
    } || function (t) {
        e(t, 0)
    }, n._unhandledRejectionFn = function (t) {
        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t)
    };
    var c = Object.getOwnPropertySymbols, d = Object.prototype.hasOwnProperty, f = Object.prototype.propertyIsEnumerable;
    var p = function () {
        try {
            if (!Object.assign) return !1;
            var t = new String("abc");
            if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;
            for (var e = {}, r = 0; r < 10; r++) e["_" + String.fromCharCode(r)] = r;
            if ("0123456789" !== Object.getOwnPropertyNames(e).map(function (t) {
                return e[t]
            }).join("")) return !1;
            var i = {};
            return "abcdefghijklmnopqrst".split("").forEach(function (t) {
                i[t] = t
            }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, i)).join("")
        } catch (t) {
            return !1
        }
    }() ? Object.assign : function (t, e) {
        for (var r, i, n = arguments, o = function (t) {
            if (null == t) throw new TypeError("Object.assign cannot be called with null or undefined");
            return Object(t)
        }(t), s = 1; s < arguments.length; s++) {
            for (var a in r = Object(n[s])) d.call(r, a) && (o[a] = r[a]);
            if (c) {
                i = c(r);
                for (var h = 0; h < i.length; h++) f.call(r, i[h]) && (o[i[h]] = r[i[h]])
            }
        }
        return o
    };
    if (self.Promise || (self.Promise = n), Object.assign || (Object.assign = p), Date.now && Date.prototype.getTime || (Date.now = function () {
        return (new Date).getTime()
    }), !self.performance || !self.performance.now) {
        var _ = Date.now();
        self.performance || (self.performance = {}), self.performance.now = function () {
            return Date.now() - _
        }
    }
    for (var m = Date.now(), v = ["ms", "moz", "webkit", "o"], y = 0; y < v.length && !self.requestAnimationFrame; ++y) {
        var g = v[y];
        self.requestAnimationFrame = self[g + "RequestAnimationFrame"], self.cancelAnimationFrame = self[g + "CancelAnimationFrame"] || self[g + "CancelRequestAnimationFrame"]
    }
    self.requestAnimationFrame || (self.requestAnimationFrame = function (t) {
        if ("function" != typeof t) throw new TypeError(t + "is not a function");
        var e = Date.now(), r = 16 + m - e;
        return r < 0 && (r = 0), m = e, self.setTimeout(function () {
            m = Date.now(), t(performance.now())
        }, r)
    }), self.cancelAnimationFrame || (self.cancelAnimationFrame = function (t) {
        return clearTimeout(t)
    }), Math.sign || (Math.sign = function (t) {
        return 0 === (t = Number(t)) || isNaN(t) ? t : t > 0 ? 1 : -1
    }), Number.isInteger || (Number.isInteger = function (t) {
        return "number" == typeof t && isFinite(t) && Math.floor(t) === t
    }), self.ArrayBuffer || (self.ArrayBuffer = Array), self.Float32Array || (self.Float32Array = Array), self.Uint32Array || (self.Uint32Array = Array), self.Uint16Array || (self.Uint16Array = Array), self.Uint8Array || (self.Uint8Array = Array), self.Int32Array || (self.Int32Array = Array);
    var E = /iPhone/i, T = /iPod/i, b = /iPad/i, x = /\biOS-universal(?:.+)Mac\b/i, A = /\bAndroid(?:.+)Mobile\b/i, S = /Android/i, O = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i,
        R = /Silk/i, P = /Windows Phone/i, I = /\bWindows(?:.+)ARM\b/i, M = /BlackBerry/i, w = /BB10/i, D = /Opera Mini/i, C = /\b(CriOS|Chrome)(?:.+)Mobile/i,
        N = /Mobile(?:.+)Firefox\b/i, L = function (t) {
            return void 0 !== t && "MacIntel" === t.platform && "number" == typeof t.maxTouchPoints && t.maxTouchPoints > 1 && "undefined" == typeof MSStream
        };
    var F = function (t) {
        var e = {userAgent: "", platform: "", maxTouchPoints: 0};
        t || "undefined" == typeof navigator ? "string" == typeof t ? e.userAgent = t : t && t.userAgent && (e = {
            userAgent: t.userAgent,
            platform: t.platform,
            maxTouchPoints: t.maxTouchPoints || 0
        }) : e = {userAgent: navigator.userAgent, platform: navigator.platform, maxTouchPoints: navigator.maxTouchPoints || 0};
        var r = e.userAgent, i = r.split("[FBAN");
        void 0 !== i[1] && (r = i[0]), void 0 !== (i = r.split("Twitter"))[1] && (r = i[0]);
        var n = function (t) {
            return function (e) {
                return e.test(t)
            }
        }(r), o = {
            apple: {phone: n(E) && !n(P), ipod: n(T), tablet: !n(E) && (n(b) || L(e)) && !n(P), universal: n(x), device: (n(E) || n(T) || n(b) || n(x) || L(e)) && !n(P)},
            amazon: {phone: n(O), tablet: !n(O) && n(R), device: n(O) || n(R)},
            android: {
                phone: !n(P) && n(O) || !n(P) && n(A),
                tablet: !n(P) && !n(O) && !n(A) && (n(R) || n(S)),
                device: !n(P) && (n(O) || n(R) || n(A) || n(S)) || n(/\bokhttp\b/i)
            },
            windows: {phone: n(P), tablet: n(I), device: n(P) || n(I)},
            other: {blackberry: n(M), blackberry10: n(w), opera: n(D), firefox: n(N), chrome: n(C), device: n(M) || n(w) || n(D) || n(N) || n(C)},
            any: !1,
            phone: !1,
            tablet: !1
        };
        return o.any = o.apple.device || o.android.device || o.windows.device || o.other.device, o.phone = o.apple.phone || o.android.phone || o.windows.phone, o.tablet = o.apple.tablet || o.android.tablet || o.windows.tablet, o
    }(self.navigator), B = {
        MIPMAP_TEXTURES: 1,
        ANISOTROPIC_LEVEL: 0,
        RESOLUTION: 1,
        FILTER_RESOLUTION: 1,
        SPRITE_MAX_TEXTURES: function (t) {
            var e, r = !0;
            (F.tablet || F.phone) && (F.apple.device && (e = navigator.userAgent.match(/OS (\d+)_(\d+)?/)) && parseInt(e[1], 10) < 11 && (r = !1), F.android.device && (e = navigator.userAgent.match(/Android\s([0-9.]*)/)) && parseInt(e[1], 10) < 7 && (r = !1));
            return r ? 32 : 4
        }(),
        SPRITE_BATCH_SIZE: 4096,
        RENDER_OPTIONS: {
            view: null,
            antialias: !1,
            autoDensity: !1,
            backgroundColor: 0,
            backgroundAlpha: 1,
            useContextAlpha: !0,
            clearBeforeRender: !0,
            preserveDrawingBuffer: !1,
            width: 800,
            height: 600,
            legacy: !1
        },
        GC_MODE: 0,
        GC_MAX_IDLE: 3600,
        GC_MAX_CHECK_COUNT: 600,
        WRAP_MODE: 33071,
        SCALE_MODE: 1,
        PRECISION_VERTEX: "highp",
        PRECISION_FRAGMENT: F.apple.device ? "highp" : "mediump",
        CAN_UPLOAD_SAME_BUFFER: !F.apple.device,
        CREATE_IMAGE_BITMAP: !1,
        ROUND_PIXELS: !1
    }, U = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function G(t) {
        return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t
    }

    function X(t, e, r) {
        return t(r = {
            path: e, exports: {}, require: function (t, e) {
                return function () {
                    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")
                }(null == e && r.path)
            }
        }, r.exports), r.exports
    }

    var k = X(function (t) {
        var e = Object.prototype.hasOwnProperty, r = "~";

        function i() {
        }

        function n(t, e, r) {
            this.fn = t, this.context = e, this.once = r || !1
        }

        function o(t, e, i, o, s) {
            if ("function" != typeof i) throw new TypeError("The listener must be a function");
            var a = new n(i, o || t, s), h = r ? r + e : e;
            return t._events[h] ? t._events[h].fn ? t._events[h] = [t._events[h], a] : t._events[h].push(a) : (t._events[h] = a, t._eventsCount++), t
        }

        function s(t, e) {
            0 == --t._eventsCount ? t._events = new i : delete t._events[e]
        }

        function a() {
            this._events = new i, this._eventsCount = 0
        }

        Object.create && (i.prototype = Object.create(null), (new i).__proto__ || (r = !1)), a.prototype.eventNames = function () {
            var t, i, n = [];
            if (0 === this._eventsCount) return n;
            for (i in t = this._events) e.call(t, i) && n.push(r ? i.slice(1) : i);
            return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(t)) : n
        }, a.prototype.listeners = function (t) {
            var e = r ? r + t : t, i = this._events[e];
            if (!i) return [];
            if (i.fn) return [i.fn];
            for (var n = 0, o = i.length, s = new Array(o); n < o; n++) s[n] = i[n].fn;
            return s
        }, a.prototype.listenerCount = function (t) {
            var e = r ? r + t : t, i = this._events[e];
            return i ? i.fn ? 1 : i.length : 0
        }, a.prototype.emit = function (t, e, i, n, o, s) {
            var a = arguments, h = r ? r + t : t;
            if (!this._events[h]) return !1;
            var u, l, c = this._events[h], d = arguments.length;
            if (c.fn) {
                switch (c.once && this.removeListener(t, c.fn, void 0, !0), d) {
                    case 1:
                        return c.fn.call(c.context), !0;
                    case 2:
                        return c.fn.call(c.context, e), !0;
                    case 3:
                        return c.fn.call(c.context, e, i), !0;
                    case 4:
                        return c.fn.call(c.context, e, i, n), !0;
                    case 5:
                        return c.fn.call(c.context, e, i, n, o), !0;
                    case 6:
                        return c.fn.call(c.context, e, i, n, o, s), !0
                }
                for (l = 1, u = new Array(d - 1); l < d; l++) u[l - 1] = a[l];
                c.fn.apply(c.context, u)
            } else {
                var f, p = c.length;
                for (l = 0; l < p; l++) switch (c[l].once && this.removeListener(t, c[l].fn, void 0, !0), d) {
                    case 1:
                        c[l].fn.call(c[l].context);
                        break;
                    case 2:
                        c[l].fn.call(c[l].context, e);
                        break;
                    case 3:
                        c[l].fn.call(c[l].context, e, i);
                        break;
                    case 4:
                        c[l].fn.call(c[l].context, e, i, n);
                        break;
                    default:
                        if (!u) for (f = 1, u = new Array(d - 1); f < d; f++) u[f - 1] = a[f];
                        c[l].fn.apply(c[l].context, u)
                }
            }
            return !0
        }, a.prototype.on = function (t, e, r) {
            return o(this, t, e, r, !1)
        }, a.prototype.once = function (t, e, r) {
            return o(this, t, e, r, !0)
        }, a.prototype.removeListener = function (t, e, i, n) {
            var o = r ? r + t : t;
            if (!this._events[o]) return this;
            if (!e) return s(this, o), this;
            var a = this._events[o];
            if (a.fn) a.fn !== e || n && !a.once || i && a.context !== i || s(this, o); else {
                for (var h = 0, u = [], l = a.length; h < l; h++) (a[h].fn !== e || n && !a[h].once || i && a[h].context !== i) && u.push(a[h]);
                u.length ? this._events[o] = 1 === u.length ? u[0] : u : s(this, o)
            }
            return this
        }, a.prototype.removeAllListeners = function (t) {
            var e;
            return t ? (e = r ? r + t : t, this._events[e] && s(this, e)) : (this._events = new i, this._eventsCount = 0), this
        }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prefixed = r, a.EventEmitter = a, t.exports = a
    }), j = Y, H = Y;

    function Y(t, e, r) {
        r = r || 2;
        var i, n, o, s, a, h, u, l = e && e.length, c = l ? e[0] * r : t.length, d = V(t, 0, c, r, !0), f = [];
        if (!d || d.next === d.prev) return f;
        if (l && (d = function (t, e, r, i) {
            var n, o, s, a, h, u = [];
            for (n = 0, o = e.length; n < o; n++) s = e[n] * i, a = n < o - 1 ? e[n + 1] * i : t.length, (h = V(t, s, a, i, !1)) === h.next && (h.steiner = !0), u.push(rt(h));
            for (u.sort(Q), n = 0; n < u.length; n++) $(u[n], r), r = z(r, r.next);
            return r
        }(t, e, d, r)), t.length > 80 * r) {
            i = o = t[0], n = s = t[1];
            for (var p = r; p < c; p += r) (a = t[p]) < i && (i = a), (h = t[p + 1]) < n && (n = h), a > o && (o = a), h > s && (s = h);
            u = 0 !== (u = Math.max(o - i, s - n)) ? 1 / u : 0
        }
        return W(d, f, r, i, n, u), f
    }

    function V(t, e, r, i, n) {
        var o, s;
        if (n === _t(t, e, r, i) > 0) for (o = e; o < r; o += i) s = dt(o, t[o], t[o + 1], s); else for (o = r - i; o >= e; o -= i) s = dt(o, t[o], t[o + 1], s);
        return s && st(s, s.next) && (ft(s), s = s.next), s
    }

    function z(t, e) {
        if (!t) return t;
        e || (e = t);
        var r, i = t;
        do {
            if (r = !1, i.steiner || !st(i, i.next) && 0 !== ot(i.prev, i, i.next)) i = i.next; else {
                if (ft(i), (i = e = i.prev) === i.next) break;
                r = !0
            }
        } while (r || i !== e);
        return e
    }

    function W(t, e, r, i, n, o, s) {
        if (t) {
            !s && o && function (t, e, r, i) {
                var n = t;
                do {
                    null === n.z && (n.z = et(n.x, n.y, e, r, i)), n.prevZ = n.prev, n.nextZ = n.next, n = n.next
                } while (n !== t);
                n.prevZ.nextZ = null, n.prevZ = null, function (t) {
                    var e, r, i, n, o, s, a, h, u = 1;
                    do {
                        for (r = t, t = null, o = null, s = 0; r;) {
                            for (s++, i = r, a = 0, e = 0; e < u && (a++, i = i.nextZ); e++) ;
                            for (h = u; a > 0 || h > 0 && i;) 0 !== a && (0 === h || !i || r.z <= i.z) ? (n = r, r = r.nextZ, a--) : (n = i, i = i.nextZ, h--), o ? o.nextZ = n : t = n, n.prevZ = o, o = n;
                            r = i
                        }
                        o.nextZ = null, u *= 2
                    } while (s > 1)
                }(n)
            }(t, i, n, o);
            for (var a, h, u = t; t.prev !== t.next;) if (a = t.prev, h = t.next, o ? K(t, i, n, o) : q(t)) e.push(a.i / r), e.push(t.i / r), e.push(h.i / r), ft(t), t = h.next, u = h.next; else if ((t = h) === u) {
                s ? 1 === s ? W(t = Z(z(t), e, r), e, r, i, n, o, 2) : 2 === s && J(t, e, r, i, n, o) : W(z(t), e, r, i, n, o, 1);
                break
            }
        }
    }

    function q(t) {
        var e = t.prev, r = t, i = t.next;
        if (ot(e, r, i) >= 0) return !1;
        for (var n = t.next.next; n !== t.prev;) {
            if (it(e.x, e.y, r.x, r.y, i.x, i.y, n.x, n.y) && ot(n.prev, n, n.next) >= 0) return !1;
            n = n.next
        }
        return !0
    }

    function K(t, e, r, i) {
        var n = t.prev, o = t, s = t.next;
        if (ot(n, o, s) >= 0) return !1;
        for (var a = n.x < o.x ? n.x < s.x ? n.x : s.x : o.x < s.x ? o.x : s.x, h = n.y < o.y ? n.y < s.y ? n.y : s.y : o.y < s.y ? o.y : s.y, u = n.x > o.x ? n.x > s.x ? n.x : s.x : o.x > s.x ? o.x : s.x, l = n.y > o.y ? n.y > s.y ? n.y : s.y : o.y > s.y ? o.y : s.y, c = et(a, h, e, r, i), d = et(u, l, e, r, i), f = t.prevZ, p = t.nextZ; f && f.z >= c && p && p.z <= d;) {
            if (f !== t.prev && f !== t.next && it(n.x, n.y, o.x, o.y, s.x, s.y, f.x, f.y) && ot(f.prev, f, f.next) >= 0) return !1;
            if (f = f.prevZ, p !== t.prev && p !== t.next && it(n.x, n.y, o.x, o.y, s.x, s.y, p.x, p.y) && ot(p.prev, p, p.next) >= 0) return !1;
            p = p.nextZ
        }
        for (; f && f.z >= c;) {
            if (f !== t.prev && f !== t.next && it(n.x, n.y, o.x, o.y, s.x, s.y, f.x, f.y) && ot(f.prev, f, f.next) >= 0) return !1;
            f = f.prevZ
        }
        for (; p && p.z <= d;) {
            if (p !== t.prev && p !== t.next && it(n.x, n.y, o.x, o.y, s.x, s.y, p.x, p.y) && ot(p.prev, p, p.next) >= 0) return !1;
            p = p.nextZ
        }
        return !0
    }

    function Z(t, e, r) {
        var i = t;
        do {
            var n = i.prev, o = i.next.next;
            !st(n, o) && at(n, i, i.next, o) && lt(n, o) && lt(o, n) && (e.push(n.i / r), e.push(i.i / r), e.push(o.i / r), ft(i), ft(i.next), i = t = o), i = i.next
        } while (i !== t);
        return z(i)
    }

    function J(t, e, r, i, n, o) {
        var s = t;
        do {
            for (var a = s.next.next; a !== s.prev;) {
                if (s.i !== a.i && nt(s, a)) {
                    var h = ct(s, a);
                    return s = z(s, s.next), h = z(h, h.next), W(s, e, r, i, n, o), void W(h, e, r, i, n, o)
                }
                a = a.next
            }
            s = s.next
        } while (s !== t)
    }

    function Q(t, e) {
        return t.x - e.x
    }

    function $(t, e) {
        if (e = function (t, e) {
            var r, i = e, n = t.x, o = t.y, s = -1 / 0;
            do {
                if (o <= i.y && o >= i.next.y && i.next.y !== i.y) {
                    var a = i.x + (o - i.y) * (i.next.x - i.x) / (i.next.y - i.y);
                    if (a <= n && a > s) {
                        if (s = a, a === n) {
                            if (o === i.y) return i;
                            if (o === i.next.y) return i.next
                        }
                        r = i.x < i.next.x ? i : i.next
                    }
                }
                i = i.next
            } while (i !== e);
            if (!r) return null;
            if (n === s) return r;
            var h, u = r, l = r.x, c = r.y, d = 1 / 0;
            i = r;
            do {
                n >= i.x && i.x >= l && n !== i.x && it(o < c ? n : s, o, l, c, o < c ? s : n, o, i.x, i.y) && (h = Math.abs(o - i.y) / (n - i.x), lt(i, t) && (h < d || h === d && (i.x > r.x || i.x === r.x && tt(r, i))) && (r = i, d = h)), i = i.next
            } while (i !== u);
            return r
        }(t, e)) {
            var r = ct(e, t);
            z(e, e.next), z(r, r.next)
        }
    }

    function tt(t, e) {
        return ot(t.prev, t, e.prev) < 0 && ot(e.next, t, t.next) < 0
    }

    function et(t, e, r, i, n) {
        return (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = 32767 * (t - r) * n) | t << 8)) | t << 4)) | t << 2)) | t << 1)) | (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = 32767 * (e - i) * n) | e << 8)) | e << 4)) | e << 2)) | e << 1)) << 1
    }

    function rt(t) {
        var e = t, r = t;
        do {
            (e.x < r.x || e.x === r.x && e.y < r.y) && (r = e), e = e.next
        } while (e !== t);
        return r
    }

    function it(t, e, r, i, n, o, s, a) {
        return (n - s) * (e - a) - (t - s) * (o - a) >= 0 && (t - s) * (i - a) - (r - s) * (e - a) >= 0 && (r - s) * (o - a) - (n - s) * (i - a) >= 0
    }

    function nt(t, e) {
        return t.next.i !== e.i && t.prev.i !== e.i && !function (t, e) {
            var r = t;
            do {
                if (r.i !== t.i && r.next.i !== t.i && r.i !== e.i && r.next.i !== e.i && at(r, r.next, t, e)) return !0;
                r = r.next
            } while (r !== t);
            return !1
        }(t, e) && (lt(t, e) && lt(e, t) && function (t, e) {
            var r = t, i = !1, n = (t.x + e.x) / 2, o = (t.y + e.y) / 2;
            do {
                r.y > o != r.next.y > o && r.next.y !== r.y && n < (r.next.x - r.x) * (o - r.y) / (r.next.y - r.y) + r.x && (i = !i), r = r.next
            } while (r !== t);
            return i
        }(t, e) && (ot(t.prev, t, e.prev) || ot(t, e.prev, e)) || st(t, e) && ot(t.prev, t, t.next) > 0 && ot(e.prev, e, e.next) > 0)
    }

    function ot(t, e, r) {
        return (e.y - t.y) * (r.x - e.x) - (e.x - t.x) * (r.y - e.y)
    }

    function st(t, e) {
        return t.x === e.x && t.y === e.y
    }

    function at(t, e, r, i) {
        var n = ut(ot(t, e, r)), o = ut(ot(t, e, i)), s = ut(ot(r, i, t)), a = ut(ot(r, i, e));
        return n !== o && s !== a || (!(0 !== n || !ht(t, r, e)) || (!(0 !== o || !ht(t, i, e)) || (!(0 !== s || !ht(r, t, i)) || !(0 !== a || !ht(r, e, i)))))
    }

    function ht(t, e, r) {
        return e.x <= Math.max(t.x, r.x) && e.x >= Math.min(t.x, r.x) && e.y <= Math.max(t.y, r.y) && e.y >= Math.min(t.y, r.y)
    }

    function ut(t) {
        return t > 0 ? 1 : t < 0 ? -1 : 0
    }

    function lt(t, e) {
        return ot(t.prev, t, t.next) < 0 ? ot(t, e, t.next) >= 0 && ot(t, t.prev, e) >= 0 : ot(t, e, t.prev) < 0 || ot(t, t.next, e) < 0
    }

    function ct(t, e) {
        var r = new pt(t.i, t.x, t.y), i = new pt(e.i, e.x, e.y), n = t.next, o = e.prev;
        return t.next = e, e.prev = t, r.next = n, n.prev = r, i.next = r, r.prev = i, o.next = i, i.prev = o, i
    }

    function dt(t, e, r, i) {
        var n = new pt(t, e, r);
        return i ? (n.next = i.next, n.prev = i, i.next.prev = n, i.next = n) : (n.prev = n, n.next = n), n
    }

    function ft(t) {
        t.next.prev = t.prev, t.prev.next = t.next, t.prevZ && (t.prevZ.nextZ = t.nextZ), t.nextZ && (t.nextZ.prevZ = t.prevZ)
    }

    function pt(t, e, r) {
        this.i = t, this.x = e, this.y = r, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1
    }

    function _t(t, e, r, i) {
        for (var n = 0, o = e, s = r - i; o < r; o += i) n += (t[s] - t[o]) * (t[o + 1] + t[s + 1]), s = o;
        return n
    }

    Y.deviation = function (t, e, r, i) {
        var n = e && e.length, o = n ? e[0] * r : t.length, s = Math.abs(_t(t, 0, o, r));
        if (n) for (var a = 0, h = e.length; a < h; a++) {
            var u = e[a] * r, l = a < h - 1 ? e[a + 1] * r : t.length;
            s -= Math.abs(_t(t, u, l, r))
        }
        var c = 0;
        for (a = 0; a < i.length; a += 3) {
            var d = i[a] * r, f = i[a + 1] * r, p = i[a + 2] * r;
            c += Math.abs((t[d] - t[p]) * (t[f + 1] - t[d + 1]) - (t[d] - t[f]) * (t[p + 1] - t[d + 1]))
        }
        return 0 === s && 0 === c ? 0 : Math.abs((c - s) / s)
    }, Y.flatten = function (t) {
        for (var e = t[0][0].length, r = {vertices: [], holes: [], dimensions: e}, i = 0, n = 0; n < t.length; n++) {
            for (var o = 0; o < t[n].length; o++) for (var s = 0; s < e; s++) r.vertices.push(t[n][o][s]);
            n > 0 && (i += t[n - 1].length, r.holes.push(i))
        }
        return r
    }, j.default = H;
    var mt = X(function (t, e) {
        !function (r) {
            var i = e && !e.nodeType && e, n = t && !t.nodeType && t, o = "object" == typeof U && U;
            o.global !== o && o.window !== o && o.self !== o || (r = o);
            var s, a, h = 2147483647, u = 36, l = 1, c = 26, d = 38, f = 700, p = 72, _ = 128, m = "-", v = /^xn--/, y = /[^\x20-\x7E]/, g = /[\x2E\u3002\uFF0E\uFF61]/g,
                E = {overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input"},
                T = u - l, b = Math.floor, x = String.fromCharCode;

            function A(t) {
                throw RangeError(E[t])
            }

            function S(t, e) {
                for (var r = t.length, i = []; r--;) i[r] = e(t[r]);
                return i
            }

            function O(t, e) {
                var r = t.split("@"), i = "";
                return r.length > 1 && (i = r[0] + "@", t = r[1]), i + S((t = t.replace(g, ".")).split("."), e).join(".")
            }

            function R(t) {
                for (var e, r, i = [], n = 0, o = t.length; n < o;) (e = t.charCodeAt(n++)) >= 55296 && e <= 56319 && n < o ? 56320 == (64512 & (r = t.charCodeAt(n++))) ? i.push(((1023 & e) << 10) + (1023 & r) + 65536) : (i.push(e), n--) : i.push(e);
                return i
            }

            function P(t) {
                return S(t, function (t) {
                    var e = "";
                    return t > 65535 && (e += x((t -= 65536) >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), e += x(t)
                }).join("")
            }

            function I(t, e) {
                return t + 22 + 75 * (t < 26) - ((0 != e) << 5)
            }

            function M(t, e, r) {
                var i = 0;
                for (t = r ? b(t / f) : t >> 1, t += b(t / e); t > T * c >> 1; i += u) t = b(t / T);
                return b(i + (T + 1) * t / (t + d))
            }

            function w(t) {
                var e, r, i, n, o, s, a, d, f, v, y, g = [], E = t.length, T = 0, x = _, S = p;
                for ((r = t.lastIndexOf(m)) < 0 && (r = 0), i = 0; i < r; ++i) t.charCodeAt(i) >= 128 && A("not-basic"), g.push(t.charCodeAt(i));
                for (n = r > 0 ? r + 1 : 0; n < E;) {
                    for (o = T, s = 1, a = u; n >= E && A("invalid-input"), ((d = (y = t.charCodeAt(n++)) - 48 < 10 ? y - 22 : y - 65 < 26 ? y - 65 : y - 97 < 26 ? y - 97 : u) >= u || d > b((h - T) / s)) && A("overflow"), T += d * s, !(d < (f = a <= S ? l : a >= S + c ? c : a - S)); a += u) s > b(h / (v = u - f)) && A("overflow"), s *= v;
                    S = M(T - o, e = g.length + 1, 0 == o), b(T / e) > h - x && A("overflow"), x += b(T / e), T %= e, g.splice(T++, 0, x)
                }
                return P(g)
            }

            function D(t) {
                var e, r, i, n, o, s, a, d, f, v, y, g, E, T, S, O = [];
                for (g = (t = R(t)).length, e = _, r = 0, o = p, s = 0; s < g; ++s) (y = t[s]) < 128 && O.push(x(y));
                for (i = n = O.length, n && O.push(m); i < g;) {
                    for (a = h, s = 0; s < g; ++s) (y = t[s]) >= e && y < a && (a = y);
                    for (a - e > b((h - r) / (E = i + 1)) && A("overflow"), r += (a - e) * E, e = a, s = 0; s < g; ++s) if ((y = t[s]) < e && ++r > h && A("overflow"), y == e) {
                        for (d = r, f = u; !(d < (v = f <= o ? l : f >= o + c ? c : f - o)); f += u) S = d - v, T = u - v, O.push(x(I(v + S % T, 0))), d = b(S / T);
                        O.push(x(I(d, 0))), o = M(r, E, i == n), r = 0, ++i
                    }
                    ++r, ++e
                }
                return O.join("")
            }

            if (s = {
                version: "1.3.2", ucs2: {decode: R, encode: P}, decode: w, encode: D, toASCII: function (t) {
                    return O(t, function (t) {
                        return y.test(t) ? "xn--" + D(t) : t
                    })
                }, toUnicode: function (t) {
                    return O(t, function (t) {
                        return v.test(t) ? w(t.slice(4).toLowerCase()) : t
                    })
                }
            }, i && n) if (t.exports == i) n.exports = s; else for (a in s) s.hasOwnProperty(a) && (i[a] = s[a]); else r.punycode = s
        }(U)
    }), vt = {
        isString: function (t) {
            return "string" == typeof t
        }, isObject: function (t) {
            return "object" == typeof t && null !== t
        }, isNull: function (t) {
            return null === t
        }, isNullOrUndefined: function (t) {
            return null == t
        }
    };

    function yt(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }

    var gt = function (t, e, r, i) {
        e = e || "&", r = r || "=";
        var n = {};
        if ("string" != typeof t || 0 === t.length) return n;
        var o = /\+/g;
        t = t.split(e);
        var s = 1e3;
        i && "number" == typeof i.maxKeys && (s = i.maxKeys);
        var a = t.length;
        s > 0 && a > s && (a = s);
        for (var h = 0; h < a; ++h) {
            var u, l, c, d, f = t[h].replace(o, "%20"), p = f.indexOf(r);
            p >= 0 ? (u = f.substr(0, p), l = f.substr(p + 1)) : (u = f, l = ""), c = decodeURIComponent(u), d = decodeURIComponent(l), yt(n, c) ? Array.isArray(n[c]) ? n[c].push(d) : n[c] = [n[c], d] : n[c] = d
        }
        return n
    }, Et = function (t) {
        switch (typeof t) {
            case"string":
                return t;
            case"boolean":
                return t ? "true" : "false";
            case"number":
                return isFinite(t) ? t : "";
            default:
                return ""
        }
    }, Tt = function (t, e, r, i) {
        return e = e || "&", r = r || "=", null === t && (t = void 0), "object" == typeof t ? Object.keys(t).map(function (i) {
            var n = encodeURIComponent(Et(i)) + r;
            return Array.isArray(t[i]) ? t[i].map(function (t) {
                return n + encodeURIComponent(Et(t))
            }).join(e) : n + encodeURIComponent(Et(t[i]))
        }).join(e) : i ? encodeURIComponent(Et(i)) + r + encodeURIComponent(Et(t)) : ""
    }, bt = X(function (t, e) {
        e.decode = e.parse = gt, e.encode = e.stringify = Tt
    }), xt = Gt, At = function (t, e) {
        return Gt(t, !1, !0).resolve(e)
    }, St = function (t) {
        vt.isString(t) && (t = Gt(t));
        if (!(t instanceof Ot)) return Ot.prototype.format.call(t);
        return t.format()
    };

    function Ot() {
        this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
    }

    var Rt = /^([a-z0-9.+-]+:)/i, Pt = /:[0-9]*$/, It = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
        Mt = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "\t"]), wt = ["'"].concat(Mt), Dt = ["%", "/", "?", ";", "#"].concat(wt),
        Ct = ["/", "?", "#"], Nt = /^[+a-z0-9A-Z_-]{0,63}$/, Lt = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, Ft = {javascript: !0, "javascript:": !0},
        Bt = {javascript: !0, "javascript:": !0}, Ut = {http: !0, https: !0, ftp: !0, gopher: !0, file: !0, "http:": !0, "https:": !0, "ftp:": !0, "gopher:": !0, "file:": !0};

    function Gt(t, e, r) {
        if (t && vt.isObject(t) && t instanceof Ot) return t;
        var i = new Ot;
        return i.parse(t, e, r), i
    }

    Ot.prototype.parse = function (t, e, r) {
        if (!vt.isString(t)) throw new TypeError("Parameter 'url' must be a string, not " + typeof t);
        var i = t.indexOf("?"), n = -1 !== i && i < t.indexOf("#") ? "?" : "#", o = t.split(n);
        o[0] = o[0].replace(/\\/g, "/");
        var s = t = o.join(n);
        if (s = s.trim(), !r && 1 === t.split("#").length) {
            var a = It.exec(s);
            if (a) return this.path = s, this.href = s, this.pathname = a[1], a[2] ? (this.search = a[2], this.query = e ? bt.parse(this.search.substr(1)) : this.search.substr(1)) : e && (this.search = "", this.query = {}), this
        }
        var h = Rt.exec(s);
        if (h) {
            var u = (h = h[0]).toLowerCase();
            this.protocol = u, s = s.substr(h.length)
        }
        if (r || h || s.match(/^\/\/[^@\/]+@[^@\/]+/)) {
            var l = "//" === s.substr(0, 2);
            !l || h && Bt[h] || (s = s.substr(2), this.slashes = !0)
        }
        if (!Bt[h] && (l || h && !Ut[h])) {
            for (var c, d, f = -1, p = 0; p < Ct.length; p++) {
                -1 !== (_ = s.indexOf(Ct[p])) && (-1 === f || _ < f) && (f = _)
            }
            -1 !== (d = -1 === f ? s.lastIndexOf("@") : s.lastIndexOf("@", f)) && (c = s.slice(0, d), s = s.slice(d + 1), this.auth = decodeURIComponent(c)), f = -1;
            for (p = 0; p < Dt.length; p++) {
                var _;
                -1 !== (_ = s.indexOf(Dt[p])) && (-1 === f || _ < f) && (f = _)
            }
            -1 === f && (f = s.length), this.host = s.slice(0, f), s = s.slice(f), this.parseHost(), this.hostname = this.hostname || "";
            var m = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
            if (!m) for (var v = this.hostname.split(/\./), y = (p = 0, v.length); p < y; p++) {
                var g = v[p];
                if (g && !g.match(Nt)) {
                    for (var E = "", T = 0, b = g.length; T < b; T++) g.charCodeAt(T) > 127 ? E += "x" : E += g[T];
                    if (!E.match(Nt)) {
                        var x = v.slice(0, p), A = v.slice(p + 1), S = g.match(Lt);
                        S && (x.push(S[1]), A.unshift(S[2])), A.length && (s = "/" + A.join(".") + s), this.hostname = x.join(".");
                        break
                    }
                }
            }
            this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), m || (this.hostname = mt.toASCII(this.hostname));
            var O = this.port ? ":" + this.port : "", R = this.hostname || "";
            this.host = R + O, this.href += this.host, m && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== s[0] && (s = "/" + s))
        }
        if (!Ft[u]) for (p = 0, y = wt.length; p < y; p++) {
            var P = wt[p];
            if (-1 !== s.indexOf(P)) {
                var I = encodeURIComponent(P);
                I === P && (I = escape(P)), s = s.split(P).join(I)
            }
        }
        var M = s.indexOf("#");
        -1 !== M && (this.hash = s.substr(M), s = s.slice(0, M));
        var w = s.indexOf("?");
        if (-1 !== w ? (this.search = s.substr(w), this.query = s.substr(w + 1), e && (this.query = bt.parse(this.query)), s = s.slice(0, w)) : e && (this.search = "", this.query = {}), s && (this.pathname = s), Ut[u] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
            O = this.pathname || "";
            var D = this.search || "";
            this.path = O + D
        }
        return this.href = this.format(), this
    }, Ot.prototype.format = function () {
        var t = this.auth || "";
        t && (t = (t = encodeURIComponent(t)).replace(/%3A/i, ":"), t += "@");
        var e = this.protocol || "", r = this.pathname || "", i = this.hash || "", n = !1, o = "";
        this.host ? n = t + this.host : this.hostname && (n = t + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (n += ":" + this.port)), this.query && vt.isObject(this.query) && Object.keys(this.query).length && (o = bt.stringify(this.query));
        var s = this.search || o && "?" + o || "";
        return e && ":" !== e.substr(-1) && (e += ":"), this.slashes || (!e || Ut[e]) && !1 !== n ? (n = "//" + (n || ""), r && "/" !== r.charAt(0) && (r = "/" + r)) : n || (n = ""), i && "#" !== i.charAt(0) && (i = "#" + i), s && "?" !== s.charAt(0) && (s = "?" + s), e + n + (r = r.replace(/[?#]/g, function (t) {
            return encodeURIComponent(t)
        })) + (s = s.replace("#", "%23")) + i
    }, Ot.prototype.resolve = function (t) {
        return this.resolveObject(Gt(t, !1, !0)).format()
    }, Ot.prototype.resolveObject = function (t) {
        if (vt.isString(t)) {
            var e = new Ot;
            e.parse(t, !1, !0), t = e
        }
        for (var r = new Ot, i = Object.keys(this), n = 0; n < i.length; n++) {
            var o = i[n];
            r[o] = this[o]
        }
        if (r.hash = t.hash, "" === t.href) return r.href = r.format(), r;
        if (t.slashes && !t.protocol) {
            for (var s = Object.keys(t), a = 0; a < s.length; a++) {
                var h = s[a];
                "protocol" !== h && (r[h] = t[h])
            }
            return Ut[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = "/"), r.href = r.format(), r
        }
        if (t.protocol && t.protocol !== r.protocol) {
            if (!Ut[t.protocol]) {
                for (var u = Object.keys(t), l = 0; l < u.length; l++) {
                    var c = u[l];
                    r[c] = t[c]
                }
                return r.href = r.format(), r
            }
            if (r.protocol = t.protocol, t.host || Bt[t.protocol]) r.pathname = t.pathname; else {
                for (var d = (t.pathname || "").split("/"); d.length && !(t.host = d.shift());) ;
                t.host || (t.host = ""), t.hostname || (t.hostname = ""), "" !== d[0] && d.unshift(""), d.length < 2 && d.unshift(""), r.pathname = d.join("/")
            }
            if (r.search = t.search, r.query = t.query, r.host = t.host || "", r.auth = t.auth, r.hostname = t.hostname || t.host, r.port = t.port, r.pathname || r.search) {
                var f = r.pathname || "", p = r.search || "";
                r.path = f + p
            }
            return r.slashes = r.slashes || t.slashes, r.href = r.format(), r
        }
        var _ = r.pathname && "/" === r.pathname.charAt(0), m = t.host || t.pathname && "/" === t.pathname.charAt(0), v = m || _ || r.host && t.pathname, y = v,
            g = r.pathname && r.pathname.split("/") || [], E = (d = t.pathname && t.pathname.split("/") || [], r.protocol && !Ut[r.protocol]);
        if (E && (r.hostname = "", r.port = null, r.host && ("" === g[0] ? g[0] = r.host : g.unshift(r.host)), r.host = "", t.protocol && (t.hostname = null, t.port = null, t.host && ("" === d[0] ? d[0] = t.host : d.unshift(t.host)), t.host = null), v = v && ("" === d[0] || "" === g[0])), m) r.host = t.host || "" === t.host ? t.host : r.host, r.hostname = t.hostname || "" === t.hostname ? t.hostname : r.hostname, r.search = t.search, r.query = t.query, g = d; else if (d.length) g || (g = []), g.pop(), g = g.concat(d), r.search = t.search, r.query = t.query; else if (!vt.isNullOrUndefined(t.search)) {
            if (E) r.hostname = r.host = g.shift(), (S = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = S.shift(), r.host = r.hostname = S.shift());
            return r.search = t.search, r.query = t.query, vt.isNull(r.pathname) && vt.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.href = r.format(), r
        }
        if (!g.length) return r.pathname = null, r.search ? r.path = "/" + r.search : r.path = null, r.href = r.format(), r;
        for (var T = g.slice(-1)[0], b = (r.host || t.host || g.length > 1) && ("." === T || ".." === T) || "" === T, x = 0, A = g.length; A >= 0; A--) "." === (T = g[A]) ? g.splice(A, 1) : ".." === T ? (g.splice(A, 1), x++) : x && (g.splice(A, 1), x--);
        if (!v && !y) for (; x--; x) g.unshift("..");
        !v || "" === g[0] || g[0] && "/" === g[0].charAt(0) || g.unshift(""), b && "/" !== g.join("/").substr(-1) && g.push("");
        var S, O = "" === g[0] || g[0] && "/" === g[0].charAt(0);
        E && (r.hostname = r.host = O ? "" : g.length ? g.shift() : "", (S = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = S.shift(), r.host = r.hostname = S.shift()));
        return (v = v || r.host && g.length) && !O && g.unshift(""), g.length ? r.pathname = g.join("/") : (r.pathname = null, r.path = null), vt.isNull(r.pathname) && vt.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.auth = t.auth || r.auth, r.slashes = r.slashes || t.slashes, r.href = r.format(), r
    }, Ot.prototype.parseHost = function () {
        var t = this.host, e = Pt.exec(t);
        e && (":" !== (e = e[0]) && (this.port = e.substr(1)), t = t.substr(0, t.length - e.length)), t && (this.hostname = t)
    };
    !function (t) {
        t[t.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", t[t.WEBGL = 1] = "WEBGL", t[t.WEBGL2 = 2] = "WEBGL2"
    }(t.ENV || (t.ENV = {})), function (t) {
        t[t.UNKNOWN = 0] = "UNKNOWN", t[t.WEBGL = 1] = "WEBGL", t[t.CANVAS = 2] = "CANVAS"
    }(t.RENDERER_TYPE || (t.RENDERER_TYPE = {})), function (t) {
        t[t.COLOR = 16384] = "COLOR", t[t.DEPTH = 256] = "DEPTH", t[t.STENCIL = 1024] = "STENCIL"
    }(t.BUFFER_BITS || (t.BUFFER_BITS = {})), function (t) {
        t[t.NORMAL = 0] = "NORMAL", t[t.ADD = 1] = "ADD", t[t.MULTIPLY = 2] = "MULTIPLY", t[t.SCREEN = 3] = "SCREEN", t[t.OVERLAY = 4] = "OVERLAY", t[t.DARKEN = 5] = "DARKEN", t[t.LIGHTEN = 6] = "LIGHTEN", t[t.COLOR_DODGE = 7] = "COLOR_DODGE", t[t.COLOR_BURN = 8] = "COLOR_BURN", t[t.HARD_LIGHT = 9] = "HARD_LIGHT", t[t.SOFT_LIGHT = 10] = "SOFT_LIGHT", t[t.DIFFERENCE = 11] = "DIFFERENCE", t[t.EXCLUSION = 12] = "EXCLUSION", t[t.HUE = 13] = "HUE", t[t.SATURATION = 14] = "SATURATION", t[t.COLOR = 15] = "COLOR", t[t.LUMINOSITY = 16] = "LUMINOSITY", t[t.NORMAL_NPM = 17] = "NORMAL_NPM", t[t.ADD_NPM = 18] = "ADD_NPM", t[t.SCREEN_NPM = 19] = "SCREEN_NPM", t[t.NONE = 20] = "NONE", t[t.SRC_OVER = 0] = "SRC_OVER", t[t.SRC_IN = 21] = "SRC_IN", t[t.SRC_OUT = 22] = "SRC_OUT", t[t.SRC_ATOP = 23] = "SRC_ATOP", t[t.DST_OVER = 24] = "DST_OVER", t[t.DST_IN = 25] = "DST_IN", t[t.DST_OUT = 26] = "DST_OUT", t[t.DST_ATOP = 27] = "DST_ATOP", t[t.ERASE = 26] = "ERASE", t[t.SUBTRACT = 28] = "SUBTRACT", t[t.XOR = 29] = "XOR"
    }(t.BLEND_MODES || (t.BLEND_MODES = {})), function (t) {
        t[t.POINTS = 0] = "POINTS", t[t.LINES = 1] = "LINES", t[t.LINE_LOOP = 2] = "LINE_LOOP", t[t.LINE_STRIP = 3] = "LINE_STRIP", t[t.TRIANGLES = 4] = "TRIANGLES", t[t.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", t[t.TRIANGLE_FAN = 6] = "TRIANGLE_FAN"
    }(t.DRAW_MODES || (t.DRAW_MODES = {})), function (t) {
        t[t.RGBA = 6408] = "RGBA", t[t.RGB = 6407] = "RGB", t[t.ALPHA = 6406] = "ALPHA", t[t.LUMINANCE = 6409] = "LUMINANCE", t[t.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", t[t.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", t[t.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL"
    }(t.FORMATS || (t.FORMATS = {})), function (t) {
        t[t.TEXTURE_2D = 3553] = "TEXTURE_2D", t[t.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", t[t.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", t[t.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", t[t.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", t[t.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", t[t.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z"
    }(t.TARGETS || (t.TARGETS = {})), function (t) {
        t[t.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", t[t.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", t[t.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", t[t.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", t[t.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", t[t.FLOAT = 5126] = "FLOAT", t[t.HALF_FLOAT = 36193] = "HALF_FLOAT"
    }(t.TYPES || (t.TYPES = {})), function (t) {
        t[t.NEAREST = 0] = "NEAREST", t[t.LINEAR = 1] = "LINEAR"
    }(t.SCALE_MODES || (t.SCALE_MODES = {})), function (t) {
        t[t.CLAMP = 33071] = "CLAMP", t[t.REPEAT = 10497] = "REPEAT", t[t.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT"
    }(t.WRAP_MODES || (t.WRAP_MODES = {})), function (t) {
        t[t.OFF = 0] = "OFF", t[t.POW2 = 1] = "POW2", t[t.ON = 2] = "ON", t[t.ON_MANUAL = 3] = "ON_MANUAL"
    }(t.MIPMAP_MODES || (t.MIPMAP_MODES = {})), function (t) {
        t[t.NPM = 0] = "NPM", t[t.UNPACK = 1] = "UNPACK", t[t.PMA = 2] = "PMA", t[t.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", t[t.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", t[t.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA"
    }(t.ALPHA_MODES || (t.ALPHA_MODES = {})), function (t) {
        t[t.NO = 0] = "NO", t[t.YES = 1] = "YES", t[t.AUTO = 2] = "AUTO", t[t.BLEND = 0] = "BLEND", t[t.CLEAR = 1] = "CLEAR", t[t.BLIT = 2] = "BLIT"
    }(t.CLEAR_MODES || (t.CLEAR_MODES = {})), function (t) {
        t[t.AUTO = 0] = "AUTO", t[t.MANUAL = 1] = "MANUAL"
    }(t.GC_MODES || (t.GC_MODES = {})), function (t) {
        t.LOW = "lowp", t.MEDIUM = "mediump", t.HIGH = "highp"
    }(t.PRECISION || (t.PRECISION = {})), function (t) {
        t[t.NONE = 0] = "NONE", t[t.SCISSOR = 1] = "SCISSOR", t[t.STENCIL = 2] = "STENCIL", t[t.SPRITE = 3] = "SPRITE"
    }(t.MASK_TYPES || (t.MASK_TYPES = {})), function (t) {
        t[t.NONE = 0] = "NONE", t[t.LOW = 2] = "LOW", t[t.MEDIUM = 4] = "MEDIUM", t[t.HIGH = 8] = "HIGH"
    }(t.MSAA_QUALITY || (t.MSAA_QUALITY = {}));
    var Xt = {parse: xt, format: St, resolve: At};
    B.RETINA_PREFIX = /@([0-9\.]+)x/, B.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = !1;
    var kt, jt = !1, Ht = "6.0.2";

    function Yt(t) {
        var e;
        if (!jt) {
            if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
                var r = ["\n %c %c %c PixiJS " + Ht + " - 鉁� " + t + " 鉁�  %c  %c  http://www.pixijs.com/  %c %c 鈾�%c鈾�%c鈾� \n\n", "background: #ff66a5; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff66a5; background: #030307; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "background: #ffc3dc; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;"];
                (e = self.console).log.apply(e, r)
            } else self.console && self.console.log("PixiJS " + Ht + " - " + t + " - http://www.pixijs.com/");
            jt = !0
        }
    }

    function Vt() {
        return void 0 === kt && (kt = function () {
            var t = {stencil: !0, failIfMajorPerformanceCaveat: B.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT};
            try {
                if (!self.WebGLRenderingContext) return !1;
                var e = document.createElement("canvas"), r = e.getContext("webgl", t) || e.getContext("experimental-webgl", t), i = !(!r || !r.getContextAttributes().stencil);
                if (r) {
                    var n = r.getExtension("WEBGL_lose_context");
                    n && n.loseContext()
                }
                return r = null, i
            } catch (t) {
                return !1
            }
        }()), kt
    }

    var zt = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        goldenrod: "#daa520",
        gold: "#ffd700",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavenderblush: "#fff0f5",
        lavender: "#e6e6fa",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        rebeccapurple: "#663399",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
    };

    function Wt(t, e) {
        return void 0 === e && (e = []), e[0] = (t >> 16 & 255) / 255, e[1] = (t >> 8 & 255) / 255, e[2] = (255 & t) / 255, e
    }

    function qt(t) {
        var e = t.toString(16);
        return "#" + ("000000".substr(0, 6 - e.length) + e)
    }

    function Kt(t) {
        return "string" == typeof t && "#" === (t = zt[t.toLowerCase()] || t)[0] && (t = t.substr(1)), parseInt(t, 16)
    }

    var Zt = function () {
        for (var e = [], r = [], i = 0; i < 32; i++) e[i] = i, r[i] = i;
        e[t.BLEND_MODES.NORMAL_NPM] = t.BLEND_MODES.NORMAL, e[t.BLEND_MODES.ADD_NPM] = t.BLEND_MODES.ADD, e[t.BLEND_MODES.SCREEN_NPM] = t.BLEND_MODES.SCREEN, r[t.BLEND_MODES.NORMAL] = t.BLEND_MODES.NORMAL_NPM, r[t.BLEND_MODES.ADD] = t.BLEND_MODES.ADD_NPM, r[t.BLEND_MODES.SCREEN] = t.BLEND_MODES.SCREEN_NPM;
        var n = [];
        return n.push(r), n.push(e), n
    }();

    function Jt(t, e) {
        return Zt[e ? 1 : 0][t]
    }

    function Qt(t, e, r, i) {
        return r = r || new Float32Array(4), i || void 0 === i ? (r[0] = t[0] * e, r[1] = t[1] * e, r[2] = t[2] * e) : (r[0] = t[0], r[1] = t[1], r[2] = t[2]), r[3] = e, r
    }

    function $t(t, e) {
        if (1 === e) return (255 * e << 24) + t;
        if (0 === e) return 0;
        var r = t >> 16 & 255, i = t >> 8 & 255, n = 255 & t;
        return (255 * e << 24) + ((r = r * e + .5 | 0) << 16) + ((i = i * e + .5 | 0) << 8) + (n * e + .5 | 0)
    }

    function te(t, e, r, i) {
        return (r = r || new Float32Array(4))[0] = (t >> 16 & 255) / 255, r[1] = (t >> 8 & 255) / 255, r[2] = (255 & t) / 255, (i || void 0 === i) && (r[0] *= e, r[1] *= e, r[2] *= e), r[3] = e, r
    }

    function ee(t, e) {
        void 0 === e && (e = null);
        var r = 6 * t;
        if ((e = e || new Uint16Array(r)).length !== r) throw new Error("Out buffer length is incorrect, got " + e.length + " and expected " + r);
        for (var i = 0, n = 0; i < r; i += 6, n += 4) e[i + 0] = n + 0, e[i + 1] = n + 1, e[i + 2] = n + 2, e[i + 3] = n + 0, e[i + 4] = n + 2, e[i + 5] = n + 3;
        return e
    }

    function re(t) {
        if (4 === t.BYTES_PER_ELEMENT) return t instanceof Float32Array ? "Float32Array" : t instanceof Uint32Array ? "Uint32Array" : "Int32Array";
        if (2 === t.BYTES_PER_ELEMENT) {
            if (t instanceof Uint16Array) return "Uint16Array"
        } else if (1 === t.BYTES_PER_ELEMENT && t instanceof Uint8Array) return "Uint8Array";
        return null
    }

    var ie = {Float32Array: Float32Array, Uint32Array: Uint32Array, Int32Array: Int32Array, Uint8Array: Uint8Array};

    function ne(t) {
        return t += 0 === t ? 1 : 0, --t, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, 1 + (t |= t >>> 16)
    }

    function oe(t) {
        return !(t & t - 1 || !t)
    }

    function se(t) {
        var e = (t > 65535 ? 1 : 0) << 4, r = ((t >>>= e) > 255 ? 1 : 0) << 3;
        return e |= r, e |= r = ((t >>>= r) > 15 ? 1 : 0) << 2, (e |= r = ((t >>>= r) > 3 ? 1 : 0) << 1) | (t >>>= r) >> 1
    }

    function ae(t, e, r) {
        var i, n = t.length;
        if (!(e >= n || 0 === r)) {
            var o = n - (r = e + r > n ? n - e : r);
            for (i = e; i < o; ++i) t[i] = t[i + r];
            t.length = o
        }
    }

    function he(t) {
        return 0 === t ? 0 : t < 0 ? -1 : 1
    }

    var ue = 0;

    function le() {
        return ++ue
    }

    var ce = {};
    var de = {}, fe = Object.create(null), pe = Object.create(null);
    var _e = function () {
        function t(t, e, r) {
            this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.resolution = r || B.RESOLUTION, this.resize(t, e)
        }

        return t.prototype.clear = function () {
            this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }, t.prototype.resize = function (t, e) {
            this.canvas.width = t * this.resolution, this.canvas.height = e * this.resolution
        }, t.prototype.destroy = function () {
            this.context = null, this.canvas = null
        }, Object.defineProperty(t.prototype, "width", {
            get: function () {
                return this.canvas.width
            }, set: function (t) {
                this.canvas.width = t
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "height", {
            get: function () {
                return this.canvas.height
            }, set: function (t) {
                this.canvas.height = t
            }, enumerable: !1, configurable: !0
        }), t
    }();

    function me(t) {
        var e, r, i, n = t.width, o = t.height, s = t.getContext("2d"), a = s.getImageData(0, 0, n, o).data, h = a.length, u = {top: null, left: null, right: null, bottom: null},
            l = null;
        for (e = 0; e < h; e += 4) 0 !== a[e + 3] && (r = e / 4 % n, i = ~~(e / 4 / n), null === u.top && (u.top = i), null === u.left ? u.left = r : r < u.left && (u.left = r), null === u.right ? u.right = r + 1 : u.right < r && (u.right = r + 1), null === u.bottom ? u.bottom = i : u.bottom < i && (u.bottom = i));
        return null !== u.top && (n = u.right - u.left, o = u.bottom - u.top + 1, l = s.getImageData(u.left, u.top, n, o)), {height: o, width: n, data: l}
    }

    var ve, ye = /^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i;

    function ge(t, e) {
        if (void 0 === e && (e = self.location), 0 === t.indexOf("data:")) return "";
        e = e || self.location, ve || (ve = document.createElement("a")), ve.href = t;
        var r = Xt.parse(ve.href), i = !r.port && "" === e.port || r.port === e.port;
        return r.hostname === e.hostname && i && r.protocol === e.protocol ? "" : "anonymous"
    }

    function Ee(t, e) {
        var r = B.RETINA_PREFIX.exec(t);
        return r ? parseFloat(r[1]) : void 0 !== e ? e : 1
    }

    var Te = {
        __proto__: null,
        BaseTextureCache: pe,
        CanvasRenderTarget: _e,
        DATA_URI: ye,
        ProgramCache: de,
        TextureCache: fe,
        clearTextureCache: function () {
            var t;
            for (t in fe) delete fe[t];
            for (t in pe) delete pe[t]
        },
        correctBlendMode: Jt,
        createIndicesForQuads: ee,
        decomposeDataUri: function (t) {
            var e = ye.exec(t);
            if (e) return {
                mediaType: e[1] ? e[1].toLowerCase() : void 0,
                subType: e[2] ? e[2].toLowerCase() : void 0,
                charset: e[3] ? e[3].toLowerCase() : void 0,
                encoding: e[4] ? e[4].toLowerCase() : void 0,
                data: e[5]
            }
        },
        deprecation: function (t, e, r) {
            if (void 0 === r && (r = 3), !ce[e]) {
                var i = (new Error).stack;
                void 0 === i ? console.warn("PixiJS Deprecation Warning: ", e + "\nDeprecated since v" + t) : (i = i.split("\n").splice(r).join("\n"), console.groupCollapsed ? (console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", e + "\nDeprecated since v" + t), console.warn(i), console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", e + "\nDeprecated since v" + t), console.warn(i))), ce[e] = !0
            }
        },
        destroyTextureCache: function () {
            var t;
            for (t in fe) fe[t].destroy();
            for (t in pe) pe[t].destroy()
        },
        determineCrossOrigin: ge,
        getBufferType: re,
        getResolutionOfUrl: Ee,
        hex2rgb: Wt,
        hex2string: qt,
        interleaveTypedArrays: function (t, e) {
            for (var r = 0, i = 0, n = {}, o = 0; o < t.length; o++) i += e[o], r += t[o].length;
            var s = new ArrayBuffer(4 * r), a = null, h = 0;
            for (o = 0; o < t.length; o++) {
                var u = e[o], l = t[o], c = re(l);
                n[c] || (n[c] = new ie[c](s)), a = n[c];
                for (var d = 0; d < l.length; d++) a[(d / u | 0) * i + h + d % u] = l[d];
                h += u
            }
            return new Float32Array(s)
        },
        isPow2: oe,
        isWebGLSupported: Vt,
        log2: se,
        nextPow2: ne,
        premultiplyBlendMode: Zt,
        premultiplyRgba: Qt,
        premultiplyTint: $t,
        premultiplyTintToRgba: te,
        removeItems: ae,
        rgb2hex: function (t) {
            return (255 * t[0] << 16) + (255 * t[1] << 8) + (255 * t[2] | 0)
        },
        sayHello: Yt,
        sign: he,
        skipHello: function () {
            jt = !0
        },
        string2hex: Kt,
        trimCanvas: me,
        uid: le,
        url: Xt,
        isMobile: F,
        EventEmitter: k,
        earcut: j
    }, be = 2 * Math.PI, xe = 180 / Math.PI, Ae = Math.PI / 180;
    !function (t) {
        t[t.POLY = 0] = "POLY", t[t.RECT = 1] = "RECT", t[t.CIRC = 2] = "CIRC", t[t.ELIP = 3] = "ELIP", t[t.RREC = 4] = "RREC"
    }(t.SHAPES || (t.SHAPES = {}));
    var Se = function () {
            function e(e, r, i, n) {
                void 0 === e && (e = 0), void 0 === r && (r = 0), void 0 === i && (i = 0), void 0 === n && (n = 0), this.x = Number(e), this.y = Number(r), this.width = Number(i), this.height = Number(n), this.type = t.SHAPES.RECT
            }

            return Object.defineProperty(e.prototype, "left", {
                get: function () {
                    return this.x
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "right", {
                get: function () {
                    return this.x + this.width
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "top", {
                get: function () {
                    return this.y
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "bottom", {
                get: function () {
                    return this.y + this.height
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e, "EMPTY", {
                get: function () {
                    return new e(0, 0, 0, 0)
                }, enumerable: !1, configurable: !0
            }), e.prototype.clone = function () {
                return new e(this.x, this.y, this.width, this.height)
            }, e.prototype.copyFrom = function (t) {
                return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this
            }, e.prototype.copyTo = function (t) {
                return t.x = this.x, t.y = this.y, t.width = this.width, t.height = this.height, t
            }, e.prototype.contains = function (t, e) {
                return !(this.width <= 0 || this.height <= 0) && t >= this.x && t < this.x + this.width && e >= this.y && e < this.y + this.height
            }, e.prototype.pad = function (t, e) {
                return void 0 === t && (t = 0), void 0 === e && (e = t), this.x -= t, this.y -= e, this.width += 2 * t, this.height += 2 * e, this
            }, e.prototype.fit = function (t) {
                var e = Math.max(this.x, t.x), r = Math.min(this.x + this.width, t.x + t.width), i = Math.max(this.y, t.y), n = Math.min(this.y + this.height, t.y + t.height);
                return this.x = e, this.width = Math.max(r - e, 0), this.y = i, this.height = Math.max(n - i, 0), this
            }, e.prototype.ceil = function (t, e) {
                void 0 === t && (t = 1), void 0 === e && (e = .001);
                var r = Math.ceil((this.x + this.width - e) * t) / t, i = Math.ceil((this.y + this.height - e) * t) / t;
                return this.x = Math.floor((this.x + e) * t) / t, this.y = Math.floor((this.y + e) * t) / t, this.width = r - this.x, this.height = i - this.y, this
            }, e.prototype.enlarge = function (t) {
                var e = Math.min(this.x, t.x), r = Math.max(this.x + this.width, t.x + t.width), i = Math.min(this.y, t.y), n = Math.max(this.y + this.height, t.y + t.height);
                return this.x = e, this.width = r - e, this.y = i, this.height = n - i, this
            }, e
        }(), Oe = function () {
            function e(e, r, i) {
                void 0 === e && (e = 0), void 0 === r && (r = 0), void 0 === i && (i = 0), this.x = e, this.y = r, this.radius = i, this.type = t.SHAPES.CIRC
            }

            return e.prototype.clone = function () {
                return new e(this.x, this.y, this.radius)
            }, e.prototype.contains = function (t, e) {
                if (this.radius <= 0) return !1;
                var r = this.radius * this.radius, i = this.x - t, n = this.y - e;
                return (i *= i) + (n *= n) <= r
            }, e.prototype.getBounds = function () {
                return new Se(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius)
            }, e
        }(), Re = function () {
            function e(e, r, i, n) {
                void 0 === e && (e = 0), void 0 === r && (r = 0), void 0 === i && (i = 0), void 0 === n && (n = 0), this.x = e, this.y = r, this.width = i, this.height = n, this.type = t.SHAPES.ELIP
            }

            return e.prototype.clone = function () {
                return new e(this.x, this.y, this.width, this.height)
            }, e.prototype.contains = function (t, e) {
                if (this.width <= 0 || this.height <= 0) return !1;
                var r = (t - this.x) / this.width, i = (e - this.y) / this.height;
                return (r *= r) + (i *= i) <= 1
            }, e.prototype.getBounds = function () {
                return new Se(this.x - this.width, this.y - this.height, this.width, this.height)
            }, e
        }(), Pe = function () {
            function e() {
                for (var e = arguments, r = [], i = 0; i < arguments.length; i++) r[i] = e[i];
                var n = Array.isArray(r[0]) ? r[0] : r;
                if ("number" != typeof n[0]) {
                    for (var o = [], s = 0, a = n.length; s < a; s++) o.push(n[s].x, n[s].y);
                    n = o
                }
                this.points = n, this.type = t.SHAPES.POLY, this.closeStroke = !0
            }

            return e.prototype.clone = function () {
                var t = new e(this.points.slice());
                return t.closeStroke = this.closeStroke, t
            }, e.prototype.contains = function (t, e) {
                for (var r = !1, i = this.points.length / 2, n = 0, o = i - 1; n < i; o = n++) {
                    var s = this.points[2 * n], a = this.points[2 * n + 1], h = this.points[2 * o], u = this.points[2 * o + 1];
                    a > e != u > e && t < (e - a) / (u - a) * (h - s) + s && (r = !r)
                }
                return r
            }, e
        }(), Ie = function () {
            function e(e, r, i, n, o) {
                void 0 === e && (e = 0), void 0 === r && (r = 0), void 0 === i && (i = 0), void 0 === n && (n = 0), void 0 === o && (o = 20), this.x = e, this.y = r, this.width = i, this.height = n, this.radius = o, this.type = t.SHAPES.RREC
            }

            return e.prototype.clone = function () {
                return new e(this.x, this.y, this.width, this.height, this.radius)
            }, e.prototype.contains = function (t, e) {
                if (this.width <= 0 || this.height <= 0) return !1;
                if (t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height) {
                    if (e >= this.y + this.radius && e <= this.y + this.height - this.radius || t >= this.x + this.radius && t <= this.x + this.width - this.radius) return !0;
                    var r = t - (this.x + this.radius), i = e - (this.y + this.radius), n = this.radius * this.radius;
                    if (r * r + i * i <= n) return !0;
                    if ((r = t - (this.x + this.width - this.radius)) * r + i * i <= n) return !0;
                    if (r * r + (i = e - (this.y + this.height - this.radius)) * i <= n) return !0;
                    if ((r = t - (this.x + this.radius)) * r + i * i <= n) return !0
                }
                return !1
            }, e
        }(), Me = function () {
            function t(t, e) {
                void 0 === t && (t = 0), void 0 === e && (e = 0), this.x = t, this.y = e
            }

            return t.prototype.clone = function () {
                return new t(this.x, this.y)
            }, t.prototype.copyFrom = function (t) {
                return this.set(t.x, t.y), this
            }, t.prototype.copyTo = function (t) {
                return t.set(this.x, this.y), t
            }, t.prototype.equals = function (t) {
                return t.x === this.x && t.y === this.y
            }, t.prototype.set = function (t, e) {
                return void 0 === t && (t = 0), void 0 === e && (e = t), this.x = t, this.y = e, this
            }, t
        }(), we = function () {
            function t(t, e, r, i) {
                void 0 === r && (r = 0), void 0 === i && (i = 0), this._x = r, this._y = i, this.cb = t, this.scope = e
            }

            return t.prototype.clone = function (e, r) {
                return void 0 === e && (e = this.cb), void 0 === r && (r = this.scope), new t(e, r, this._x, this._y)
            }, t.prototype.set = function (t, e) {
                return void 0 === t && (t = 0), void 0 === e && (e = t), this._x === t && this._y === e || (this._x = t, this._y = e, this.cb.call(this.scope)), this
            }, t.prototype.copyFrom = function (t) {
                return this._x === t.x && this._y === t.y || (this._x = t.x, this._y = t.y, this.cb.call(this.scope)), this
            }, t.prototype.copyTo = function (t) {
                return t.set(this._x, this._y), t
            }, t.prototype.equals = function (t) {
                return t.x === this._x && t.y === this._y
            }, Object.defineProperty(t.prototype, "x", {
                get: function () {
                    return this._x
                }, set: function (t) {
                    this._x !== t && (this._x = t, this.cb.call(this.scope))
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(t.prototype, "y", {
                get: function () {
                    return this._y
                }, set: function (t) {
                    this._y !== t && (this._y = t, this.cb.call(this.scope))
                }, enumerable: !1, configurable: !0
            }), t
        }(), De = function () {
            function t(t, e, r, i, n, o) {
                void 0 === t && (t = 1), void 0 === e && (e = 0), void 0 === r && (r = 0), void 0 === i && (i = 1), void 0 === n && (n = 0), void 0 === o && (o = 0), this.array = null, this.a = t, this.b = e, this.c = r, this.d = i, this.tx = n, this.ty = o
            }

            return t.prototype.fromArray = function (t) {
                this.a = t[0], this.b = t[1], this.c = t[3], this.d = t[4], this.tx = t[2], this.ty = t[5]
            }, t.prototype.set = function (t, e, r, i, n, o) {
                return this.a = t, this.b = e, this.c = r, this.d = i, this.tx = n, this.ty = o, this
            }, t.prototype.toArray = function (t, e) {
                this.array || (this.array = new Float32Array(9));
                var r = e || this.array;
                return t ? (r[0] = this.a, r[1] = this.b, r[2] = 0, r[3] = this.c, r[4] = this.d, r[5] = 0, r[6] = this.tx, r[7] = this.ty, r[8] = 1) : (r[0] = this.a, r[1] = this.c, r[2] = this.tx, r[3] = this.b, r[4] = this.d, r[5] = this.ty, r[6] = 0, r[7] = 0, r[8] = 1), r
            }, t.prototype.apply = function (t, e) {
                e = e || new Me;
                var r = t.x, i = t.y;
                return e.x = this.a * r + this.c * i + this.tx, e.y = this.b * r + this.d * i + this.ty, e
            }, t.prototype.applyInverse = function (t, e) {
                e = e || new Me;
                var r = 1 / (this.a * this.d + this.c * -this.b), i = t.x, n = t.y;
                return e.x = this.d * r * i + -this.c * r * n + (this.ty * this.c - this.tx * this.d) * r, e.y = this.a * r * n + -this.b * r * i + (-this.ty * this.a + this.tx * this.b) * r, e
            }, t.prototype.translate = function (t, e) {
                return this.tx += t, this.ty += e, this
            }, t.prototype.scale = function (t, e) {
                return this.a *= t, this.d *= e, this.c *= t, this.b *= e, this.tx *= t, this.ty *= e, this
            }, t.prototype.rotate = function (t) {
                var e = Math.cos(t), r = Math.sin(t), i = this.a, n = this.c, o = this.tx;
                return this.a = i * e - this.b * r, this.b = i * r + this.b * e, this.c = n * e - this.d * r, this.d = n * r + this.d * e, this.tx = o * e - this.ty * r, this.ty = o * r + this.ty * e, this
            }, t.prototype.append = function (t) {
                var e = this.a, r = this.b, i = this.c, n = this.d;
                return this.a = t.a * e + t.b * i, this.b = t.a * r + t.b * n, this.c = t.c * e + t.d * i, this.d = t.c * r + t.d * n, this.tx = t.tx * e + t.ty * i + this.tx, this.ty = t.tx * r + t.ty * n + this.ty, this
            }, t.prototype.setTransform = function (t, e, r, i, n, o, s, a, h) {
                return this.a = Math.cos(s + h) * n, this.b = Math.sin(s + h) * n, this.c = -Math.sin(s - a) * o, this.d = Math.cos(s - a) * o, this.tx = t - (r * this.a + i * this.c), this.ty = e - (r * this.b + i * this.d), this
            }, t.prototype.prepend = function (t) {
                var e = this.tx;
                if (1 !== t.a || 0 !== t.b || 0 !== t.c || 1 !== t.d) {
                    var r = this.a, i = this.c;
                    this.a = r * t.a + this.b * t.c, this.b = r * t.b + this.b * t.d, this.c = i * t.a + this.d * t.c, this.d = i * t.b + this.d * t.d
                }
                return this.tx = e * t.a + this.ty * t.c + t.tx, this.ty = e * t.b + this.ty * t.d + t.ty, this
            }, t.prototype.decompose = function (t) {
                var e = this.a, r = this.b, i = this.c, n = this.d, o = t.pivot, s = -Math.atan2(-i, n), a = Math.atan2(r, e), h = Math.abs(s + a);
                return h < 1e-5 || Math.abs(be - h) < 1e-5 ? (t.rotation = a, t.skew.x = t.skew.y = 0) : (t.rotation = 0, t.skew.x = s, t.skew.y = a), t.scale.x = Math.sqrt(e * e + r * r), t.scale.y = Math.sqrt(i * i + n * n), t.position.x = this.tx + (o.x * e + o.y * i), t.position.y = this.ty + (o.x * r + o.y * n), t
            }, t.prototype.invert = function () {
                var t = this.a, e = this.b, r = this.c, i = this.d, n = this.tx, o = t * i - e * r;
                return this.a = i / o, this.b = -e / o, this.c = -r / o, this.d = t / o, this.tx = (r * this.ty - i * n) / o, this.ty = -(t * this.ty - e * n) / o, this
            }, t.prototype.identity = function () {
                return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this
            }, t.prototype.clone = function () {
                var e = new t;
                return e.a = this.a, e.b = this.b, e.c = this.c, e.d = this.d, e.tx = this.tx, e.ty = this.ty, e
            }, t.prototype.copyTo = function (t) {
                return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t
            }, t.prototype.copyFrom = function (t) {
                return this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d, this.tx = t.tx, this.ty = t.ty, this
            }, Object.defineProperty(t, "IDENTITY", {
                get: function () {
                    return new t
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(t, "TEMP_MATRIX", {
                get: function () {
                    return new t
                }, enumerable: !1, configurable: !0
            }), t
        }(), Ce = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1], Ne = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1],
        Le = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1], Fe = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1], Be = [], Ue = [], Ge = Math.sign;
    !function () {
        for (var t = 0; t < 16; t++) {
            var e = [];
            Be.push(e);
            for (var r = 0; r < 16; r++) for (var i = Ge(Ce[t] * Ce[r] + Le[t] * Ne[r]), n = Ge(Ne[t] * Ce[r] + Fe[t] * Ne[r]), o = Ge(Ce[t] * Le[r] + Le[t] * Fe[r]), s = Ge(Ne[t] * Le[r] + Fe[t] * Fe[r]), a = 0; a < 16; a++) if (Ce[a] === i && Ne[a] === n && Le[a] === o && Fe[a] === s) {
                e.push(a);
                break
            }
        }
        for (t = 0; t < 16; t++) {
            var h = new De;
            h.set(Ce[t], Ne[t], Le[t], Fe[t], 0, 0), Ue.push(h)
        }
    }();
    var Xe = {
        E: 0, SE: 1, S: 2, SW: 3, W: 4, NW: 5, N: 6, NE: 7, MIRROR_VERTICAL: 8, MAIN_DIAGONAL: 10, MIRROR_HORIZONTAL: 12, REVERSE_DIAGONAL: 14, uX: function (t) {
            return Ce[t]
        }, uY: function (t) {
            return Ne[t]
        }, vX: function (t) {
            return Le[t]
        }, vY: function (t) {
            return Fe[t]
        }, inv: function (t) {
            return 8 & t ? 15 & t : 7 & -t
        }, add: function (t, e) {
            return Be[t][e]
        }, sub: function (t, e) {
            return Be[t][Xe.inv(e)]
        }, rotate180: function (t) {
            return 4 ^ t
        }, isVertical: function (t) {
            return 2 == (3 & t)
        }, byDirection: function (t, e) {
            return 2 * Math.abs(t) <= Math.abs(e) ? e >= 0 ? Xe.S : Xe.N : 2 * Math.abs(e) <= Math.abs(t) ? t > 0 ? Xe.E : Xe.W : e > 0 ? t > 0 ? Xe.SE : Xe.SW : t > 0 ? Xe.NE : Xe.NW
        }, matrixAppendRotationInv: function (t, e, r, i) {
            void 0 === r && (r = 0), void 0 === i && (i = 0);
            var n = Ue[Xe.inv(e)];
            n.tx = r, n.ty = i, t.append(n)
        }
    }, ke = function () {
        function t() {
            this.worldTransform = new De, this.localTransform = new De, this.position = new we(this.onChange, this, 0, 0), this.scale = new we(this.onChange, this, 1, 1), this.pivot = new we(this.onChange, this, 0, 0), this.skew = new we(this.updateSkew, this, 0, 0), this._rotation = 0, this._cx = 1, this._sx = 0, this._cy = 0, this._sy = 1, this._localID = 0, this._currentLocalID = 0, this._worldID = 0, this._parentID = 0
        }

        return t.prototype.onChange = function () {
            this._localID++
        }, t.prototype.updateSkew = function () {
            this._cx = Math.cos(this._rotation + this.skew.y), this._sx = Math.sin(this._rotation + this.skew.y), this._cy = -Math.sin(this._rotation - this.skew.x), this._sy = Math.cos(this._rotation - this.skew.x), this._localID++
        }, t.prototype.updateLocalTransform = function () {
            var t = this.localTransform;
            this._localID !== this._currentLocalID && (t.a = this._cx * this.scale.x, t.b = this._sx * this.scale.x, t.c = this._cy * this.scale.y, t.d = this._sy * this.scale.y, t.tx = this.position.x - (this.pivot.x * t.a + this.pivot.y * t.c), t.ty = this.position.y - (this.pivot.x * t.b + this.pivot.y * t.d), this._currentLocalID = this._localID, this._parentID = -1)
        }, t.prototype.updateTransform = function (t) {
            var e = this.localTransform;
            if (this._localID !== this._currentLocalID && (e.a = this._cx * this.scale.x, e.b = this._sx * this.scale.x, e.c = this._cy * this.scale.y, e.d = this._sy * this.scale.y, e.tx = this.position.x - (this.pivot.x * e.a + this.pivot.y * e.c), e.ty = this.position.y - (this.pivot.x * e.b + this.pivot.y * e.d), this._currentLocalID = this._localID, this._parentID = -1), this._parentID !== t._worldID) {
                var r = t.worldTransform, i = this.worldTransform;
                i.a = e.a * r.a + e.b * r.c, i.b = e.a * r.b + e.b * r.d, i.c = e.c * r.a + e.d * r.c, i.d = e.c * r.b + e.d * r.d, i.tx = e.tx * r.a + e.ty * r.c + r.tx, i.ty = e.tx * r.b + e.ty * r.d + r.ty, this._parentID = t._worldID, this._worldID++
            }
        }, t.prototype.setFromMatrix = function (t) {
            t.decompose(this), this._localID++
        }, Object.defineProperty(t.prototype, "rotation", {
            get: function () {
                return this._rotation
            }, set: function (t) {
                this._rotation !== t && (this._rotation = t, this.updateSkew())
            }, enumerable: !1, configurable: !0
        }), t.IDENTITY = new t, t
    }();
    B.SORTABLE_CHILDREN = !1;
    var je = function () {
        function t() {
            this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0, this.rect = null, this.updateID = -1
        }

        return t.prototype.isEmpty = function () {
            return this.minX > this.maxX || this.minY > this.maxY
        }, t.prototype.clear = function () {
            this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0
        }, t.prototype.getRectangle = function (t) {
            return this.minX > this.maxX || this.minY > this.maxY ? Se.EMPTY : ((t = t || new Se(0, 0, 1, 1)).x = this.minX, t.y = this.minY, t.width = this.maxX - this.minX, t.height = this.maxY - this.minY, t)
        }, t.prototype.addPoint = function (t) {
            this.minX = Math.min(this.minX, t.x), this.maxX = Math.max(this.maxX, t.x), this.minY = Math.min(this.minY, t.y), this.maxY = Math.max(this.maxY, t.y)
        }, t.prototype.addPointMatrix = function (t, e) {
            var r = t.a, i = t.b, n = t.c, o = t.d, s = t.tx, a = t.ty, h = r * e.x + n * e.y + s, u = i * e.x + o * e.y + a;
            this.minX = Math.min(this.minX, h), this.maxX = Math.max(this.maxX, h), this.minY = Math.min(this.minY, u), this.maxY = Math.max(this.maxY, u)
        }, t.prototype.addQuad = function (t) {
            var e = this.minX, r = this.minY, i = this.maxX, n = this.maxY, o = t[0], s = t[1];
            e = o < e ? o : e, r = s < r ? s : r, i = o > i ? o : i, n = s > n ? s : n, e = (o = t[2]) < e ? o : e, r = (s = t[3]) < r ? s : r, i = o > i ? o : i, n = s > n ? s : n, e = (o = t[4]) < e ? o : e, r = (s = t[5]) < r ? s : r, i = o > i ? o : i, n = s > n ? s : n, e = (o = t[6]) < e ? o : e, r = (s = t[7]) < r ? s : r, i = o > i ? o : i, n = s > n ? s : n, this.minX = e, this.minY = r, this.maxX = i, this.maxY = n
        }, t.prototype.addFrame = function (t, e, r, i, n) {
            this.addFrameMatrix(t.worldTransform, e, r, i, n)
        }, t.prototype.addFrameMatrix = function (t, e, r, i, n) {
            var o = t.a, s = t.b, a = t.c, h = t.d, u = t.tx, l = t.ty, c = this.minX, d = this.minY, f = this.maxX, p = this.maxY, _ = o * e + a * r + u, m = s * e + h * r + l;
            c = _ < c ? _ : c, d = m < d ? m : d, f = _ > f ? _ : f, p = m > p ? m : p, c = (_ = o * i + a * r + u) < c ? _ : c, d = (m = s * i + h * r + l) < d ? m : d, f = _ > f ? _ : f, p = m > p ? m : p, c = (_ = o * e + a * n + u) < c ? _ : c, d = (m = s * e + h * n + l) < d ? m : d, f = _ > f ? _ : f, p = m > p ? m : p, c = (_ = o * i + a * n + u) < c ? _ : c, d = (m = s * i + h * n + l) < d ? m : d, f = _ > f ? _ : f, p = m > p ? m : p, this.minX = c, this.minY = d, this.maxX = f, this.maxY = p
        }, t.prototype.addVertexData = function (t, e, r) {
            for (var i = this.minX, n = this.minY, o = this.maxX, s = this.maxY, a = e; a < r; a += 2) {
                var h = t[a], u = t[a + 1];
                i = h < i ? h : i, n = u < n ? u : n, o = h > o ? h : o, s = u > s ? u : s
            }
            this.minX = i, this.minY = n, this.maxX = o, this.maxY = s
        }, t.prototype.addVertices = function (t, e, r, i) {
            this.addVerticesMatrix(t.worldTransform, e, r, i)
        }, t.prototype.addVerticesMatrix = function (t, e, r, i, n, o) {
            void 0 === n && (n = 0), void 0 === o && (o = n);
            for (var s = t.a, a = t.b, h = t.c, u = t.d, l = t.tx, c = t.ty, d = this.minX, f = this.minY, p = this.maxX, _ = this.maxY, m = r; m < i; m += 2) {
                var v = e[m], y = e[m + 1], g = s * v + h * y + l, E = u * y + a * v + c;
                d = Math.min(d, g - n), p = Math.max(p, g + n), f = Math.min(f, E - o), _ = Math.max(_, E + o)
            }
            this.minX = d, this.minY = f, this.maxX = p, this.maxY = _
        }, t.prototype.addBounds = function (t) {
            var e = this.minX, r = this.minY, i = this.maxX, n = this.maxY;
            this.minX = t.minX < e ? t.minX : e, this.minY = t.minY < r ? t.minY : r, this.maxX = t.maxX > i ? t.maxX : i, this.maxY = t.maxY > n ? t.maxY : n
        }, t.prototype.addBoundsMask = function (t, e) {
            var r = t.minX > e.minX ? t.minX : e.minX, i = t.minY > e.minY ? t.minY : e.minY, n = t.maxX < e.maxX ? t.maxX : e.maxX, o = t.maxY < e.maxY ? t.maxY : e.maxY;
            if (r <= n && i <= o) {
                var s = this.minX, a = this.minY, h = this.maxX, u = this.maxY;
                this.minX = r < s ? r : s, this.minY = i < a ? i : a, this.maxX = n > h ? n : h, this.maxY = o > u ? o : u
            }
        }, t.prototype.addBoundsMatrix = function (t, e) {
            this.addFrameMatrix(e, t.minX, t.minY, t.maxX, t.maxY)
        }, t.prototype.addBoundsArea = function (t, e) {
            var r = t.minX > e.x ? t.minX : e.x, i = t.minY > e.y ? t.minY : e.y, n = t.maxX < e.x + e.width ? t.maxX : e.x + e.width,
                o = t.maxY < e.y + e.height ? t.maxY : e.y + e.height;
            if (r <= n && i <= o) {
                var s = this.minX, a = this.minY, h = this.maxX, u = this.maxY;
                this.minX = r < s ? r : s, this.minY = i < a ? i : a, this.maxX = n > h ? n : h, this.maxY = o > u ? o : u
            }
        }, t.prototype.pad = function (t, e) {
            void 0 === t && (t = 0), void 0 === e && (e = t), this.isEmpty() || (this.minX -= t, this.maxX += t, this.minY -= e, this.maxY += e)
        }, t.prototype.addFramePad = function (t, e, r, i, n, o) {
            t -= n, e -= o, r += n, i += o, this.minX = this.minX < t ? this.minX : t, this.maxX = this.maxX > r ? this.maxX : r, this.minY = this.minY < e ? this.minY : e, this.maxY = this.maxY > i ? this.maxY : i
        }, t
    }(), He = function (t, e) {
        return (He = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
            t.__proto__ = e
        } || function (t, e) {
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
        })(t, e)
    };

    function Ye(t, e) {
        function r() {
            this.constructor = t
        }

        He(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
    }

    var Ve = function (t) {
        function e() {
            var e = t.call(this) || this;
            return e.tempDisplayObjectParent = null, e.transform = new ke, e.alpha = 1, e.visible = !0, e.renderable = !0, e.parent = null, e.worldAlpha = 1, e._lastSortedIndex = 0, e._zIndex = 0, e.filterArea = null, e.filters = null, e._enabledFilters = null, e._bounds = new je, e._localBounds = null, e._boundsID = 0, e._boundsRect = null, e._localBoundsRect = null, e._mask = null, e._destroyed = !1, e.isSprite = !1, e.isMask = !1, e
        }

        return Ye(e, t), e.mixin = function (t) {
            for (var r = Object.keys(t), i = 0; i < r.length; ++i) {
                var n = r[i];
                Object.defineProperty(e.prototype, n, Object.getOwnPropertyDescriptor(t, n))
            }
        }, e.prototype._recursivePostUpdateTransform = function () {
            this.parent ? (this.parent._recursivePostUpdateTransform(), this.transform.updateTransform(this.parent.transform)) : this.transform.updateTransform(this._tempDisplayObjectParent.transform)
        }, e.prototype.updateTransform = function () {
            this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha
        }, e.prototype.getBounds = function (t, e) {
            return t || (this.parent ? (this._recursivePostUpdateTransform(), this.updateTransform()) : (this.parent = this._tempDisplayObjectParent, this.updateTransform(), this.parent = null)), this._bounds.updateID !== this._boundsID && (this.calculateBounds(), this._bounds.updateID = this._boundsID), e || (this._boundsRect || (this._boundsRect = new Se), e = this._boundsRect), this._bounds.getRectangle(e)
        }, e.prototype.getLocalBounds = function (t) {
            t || (this._localBoundsRect || (this._localBoundsRect = new Se), t = this._localBoundsRect), this._localBounds || (this._localBounds = new je);
            var e = this.transform, r = this.parent;
            this.parent = null, this.transform = this._tempDisplayObjectParent.transform;
            var i = this._bounds, n = this._boundsID;
            this._bounds = this._localBounds;
            var o = this.getBounds(!1, t);
            return this.parent = r, this.transform = e, this._bounds = i, this._bounds.updateID += this._boundsID - n, o
        }, e.prototype.toGlobal = function (t, e, r) {
            return void 0 === r && (r = !1), r || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.apply(t, e)
        }, e.prototype.toLocal = function (t, e, r, i) {
            return e && (t = e.toGlobal(t, r, i)), i || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.applyInverse(t, r)
        }, e.prototype.setParent = function (t) {
            if (!t || !t.addChild) throw new Error("setParent: Argument must be a Container");
            return t.addChild(this), t
        }, e.prototype.setTransform = function (t, e, r, i, n, o, s, a, h) {
            return void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === r && (r = 1), void 0 === i && (i = 1), void 0 === n && (n = 0), void 0 === o && (o = 0), void 0 === s && (s = 0), void 0 === a && (a = 0), void 0 === h && (h = 0), this.position.x = t, this.position.y = e, this.scale.x = r || 1, this.scale.y = i || 1, this.rotation = n, this.skew.x = o, this.skew.y = s, this.pivot.x = a, this.pivot.y = h, this
        }, e.prototype.destroy = function (t) {
            this.parent && this.parent.removeChild(this), this.removeAllListeners(), this.transform = null, this.parent = null, this._bounds = null, this._mask = null, this.filters = null, this.filterArea = null, this.hitArea = null, this.interactive = !1, this.interactiveChildren = !1, this._destroyed = !0
        }, Object.defineProperty(e.prototype, "_tempDisplayObjectParent", {
            get: function () {
                return null === this.tempDisplayObjectParent && (this.tempDisplayObjectParent = new ze), this.tempDisplayObjectParent
            }, enumerable: !1, configurable: !0
        }), e.prototype.enableTempParent = function () {
            var t = this.parent;
            return this.parent = this._tempDisplayObjectParent, t
        }, e.prototype.disableTempParent = function (t) {
            this.parent = t
        }, Object.defineProperty(e.prototype, "x", {
            get: function () {
                return this.position.x
            }, set: function (t) {
                this.transform.position.x = t
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "y", {
            get: function () {
                return this.position.y
            }, set: function (t) {
                this.transform.position.y = t
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "worldTransform", {
            get: function () {
                return this.transform.worldTransform
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "localTransform", {
            get: function () {
                return this.transform.localTransform
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "position", {
            get: function () {
                return this.transform.position
            }, set: function (t) {
                this.transform.position.copyFrom(t)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "scale", {
            get: function () {
                return this.transform.scale
            }, set: function (t) {
                this.transform.scale.copyFrom(t)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "pivot", {
            get: function () {
                return this.transform.pivot
            }, set: function (t) {
                this.transform.pivot.copyFrom(t)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "skew", {
            get: function () {
                return this.transform.skew
            }, set: function (t) {
                this.transform.skew.copyFrom(t)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "rotation", {
            get: function () {
                return this.transform.rotation
            }, set: function (t) {
                this.transform.rotation = t
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "angle", {
            get: function () {
                return this.transform.rotation * xe
            }, set: function (t) {
                this.transform.rotation = t * Ae
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "zIndex", {
            get: function () {
                return this._zIndex
            }, set: function (t) {
                this._zIndex = t, this.parent && (this.parent.sortDirty = !0)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "worldVisible", {
            get: function () {
                var t = this;
                do {
                    if (!t.visible) return !1;
                    t = t.parent
                } while (t);
                return !0
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "mask", {
            get: function () {
                return this._mask
            }, set: function (t) {
                var e;
                this._mask && ((e = this._mask.maskObject || this._mask).renderable = !0, e.isMask = !1), this._mask = t, this._mask && ((e = this._mask.maskObject || this._mask).renderable = !1, e.isMask = !0)
            }, enumerable: !1, configurable: !0
        }), e
    }(k), ze = function (t) {
        function e() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.sortDirty = null, e
        }

        return Ye(e, t), e
    }(Ve);

    function We(t, e) {
        return t.zIndex === e.zIndex ? t._lastSortedIndex - e._lastSortedIndex : t.zIndex - e.zIndex
    }

    Ve.prototype.displayObjectUpdateTransform = Ve.prototype.updateTransform;
    var qe = function (t) {
        function e() {
            var e = t.call(this) || this;
            return e.children = [], e.sortableChildren = B.SORTABLE_CHILDREN, e.sortDirty = !1, e
        }

        return Ye(e, t), e.prototype.onChildrenChange = function (t) {
        }, e.prototype.addChild = function () {
            for (var t = arguments, e = [], r = 0; r < arguments.length; r++) e[r] = t[r];
            if (e.length > 1) for (var i = 0; i < e.length; i++) this.addChild(e[i]); else {
                var n = e[0];
                n.parent && n.parent.removeChild(n), n.parent = this, this.sortDirty = !0, n.transform._parentID = -1, this.children.push(n), this._boundsID++, this.onChildrenChange(this.children.length - 1), this.emit("childAdded", n, this, this.children.length - 1), n.emit("added", this)
            }
            return e[0]
        }, e.prototype.addChildAt = function (t, e) {
            if (e < 0 || e > this.children.length) throw new Error(t + "addChildAt: The index " + e + " supplied is out of bounds " + this.children.length);
            return t.parent && t.parent.removeChild(t), t.parent = this, this.sortDirty = !0, t.transform._parentID = -1, this.children.splice(e, 0, t), this._boundsID++, this.onChildrenChange(e), t.emit("added", this), this.emit("childAdded", t, this, e), t
        }, e.prototype.swapChildren = function (t, e) {
            if (t !== e) {
                var r = this.getChildIndex(t), i = this.getChildIndex(e);
                this.children[r] = e, this.children[i] = t, this.onChildrenChange(r < i ? r : i)
            }
        }, e.prototype.getChildIndex = function (t) {
            var e = this.children.indexOf(t);
            if (-1 === e) throw new Error("The supplied DisplayObject must be a child of the caller");
            return e
        }, e.prototype.setChildIndex = function (t, e) {
            if (e < 0 || e >= this.children.length) throw new Error("The index " + e + " supplied is out of bounds " + this.children.length);
            var r = this.getChildIndex(t);
            ae(this.children, r, 1), this.children.splice(e, 0, t), this.onChildrenChange(e)
        }, e.prototype.getChildAt = function (t) {
            if (t < 0 || t >= this.children.length) throw new Error("getChildAt: Index (" + t + ") does not exist.");
            return this.children[t]
        }, e.prototype.removeChild = function () {
            for (var t = arguments, e = [], r = 0; r < arguments.length; r++) e[r] = t[r];
            if (e.length > 1) for (var i = 0; i < e.length; i++) this.removeChild(e[i]); else {
                var n = e[0], o = this.children.indexOf(n);
                if (-1 === o) return null;
                n.parent = null, n.transform._parentID = -1, ae(this.children, o, 1), this._boundsID++, this.onChildrenChange(o), n.emit("removed", this), this.emit("childRemoved", n, this, o)
            }
            return e[0]
        }, e.prototype.removeChildAt = function (t) {
            var e = this.getChildAt(t);
            return e.parent = null, e.transform._parentID = -1, ae(this.children, t, 1), this._boundsID++, this.onChildrenChange(t), e.emit("removed", this), this.emit("childRemoved", e, this, t), e
        }, e.prototype.removeChildren = function (t, e) {
            void 0 === t && (t = 0), void 0 === e && (e = this.children.length);
            var r, i = t, n = e - i;
            if (n > 0 && n <= e) {
                r = this.children.splice(i, n);
                for (var o = 0; o < r.length; ++o) r[o].parent = null, r[o].transform && (r[o].transform._parentID = -1);
                for (this._boundsID++, this.onChildrenChange(t), o = 0; o < r.length; ++o) r[o].emit("removed", this), this.emit("childRemoved", r[o], this, o);
                return r
            }
            if (0 === n && 0 === this.children.length) return [];
            throw new RangeError("removeChildren: numeric values are outside the acceptable range.")
        }, e.prototype.sortChildren = function () {
            for (var t = !1, e = 0, r = this.children.length; e < r; ++e) {
                var i = this.children[e];
                i._lastSortedIndex = e, t || 0 === i.zIndex || (t = !0)
            }
            t && this.children.length > 1 && this.children.sort(We), this.sortDirty = !1
        }, e.prototype.updateTransform = function () {
            this.sortableChildren && this.sortDirty && this.sortChildren(), this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
            for (var t = 0, e = this.children.length; t < e; ++t) {
                var r = this.children[t];
                r.visible && r.updateTransform()
            }
        }, e.prototype.calculateBounds = function () {
            this._bounds.clear(), this._calculateBounds();
            for (var t = 0; t < this.children.length; t++) {
                var e = this.children[t];
                if (e.visible && e.renderable) if (e.calculateBounds(), e._mask) {
                    var r = e._mask.maskObject || e._mask;
                    r.calculateBounds(), this._bounds.addBoundsMask(e._bounds, r._bounds)
                } else e.filterArea ? this._bounds.addBoundsArea(e._bounds, e.filterArea) : this._bounds.addBounds(e._bounds)
            }
            this._bounds.updateID = this._boundsID
        }, e.prototype.getLocalBounds = function (e, r) {
            void 0 === r && (r = !1);
            var i = t.prototype.getLocalBounds.call(this, e);
            if (!r) for (var n = 0, o = this.children.length; n < o; ++n) {
                var s = this.children[n];
                s.visible && s.updateTransform()
            }
            return i
        }, e.prototype._calculateBounds = function () {
        }, e.prototype.render = function (t) {
            if (this.visible && !(this.worldAlpha <= 0) && this.renderable) if (this._mask || this.filters && this.filters.length) this.renderAdvanced(t); else {
                this._render(t);
                for (var e = 0, r = this.children.length; e < r; ++e) this.children[e].render(t)
            }
        }, e.prototype.renderAdvanced = function (t) {
            t.batch.flush();
            var e = this.filters, r = this._mask;
            if (e) {
                this._enabledFilters || (this._enabledFilters = []), this._enabledFilters.length = 0;
                for (var i = 0; i < e.length; i++) e[i].enabled && this._enabledFilters.push(e[i]);
                this._enabledFilters.length && t.filter.push(this, this._enabledFilters)
            }
            r && t.mask.push(this, this._mask), this._render(t), i = 0;
            for (var n = this.children.length; i < n; i++) this.children[i].render(t);
            t.batch.flush(), r && t.mask.pop(this), e && this._enabledFilters && this._enabledFilters.length && t.filter.pop()
        }, e.prototype._render = function (t) {
        }, e.prototype.destroy = function (e) {
            t.prototype.destroy.call(this), this.sortDirty = !1;
            var r = "boolean" == typeof e ? e : e && e.children, i = this.removeChildren(0, this.children.length);
            if (r) for (var n = 0; n < i.length; ++n) i[n].destroy(e)
        }, Object.defineProperty(e.prototype, "width", {
            get: function () {
                return this.scale.x * this.getLocalBounds().width
            }, set: function (t) {
                var e = this.getLocalBounds().width;
                this.scale.x = 0 !== e ? t / e : 1, this._width = t
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "height", {
            get: function () {
                return this.scale.y * this.getLocalBounds().height
            }, set: function (t) {
                var e = this.getLocalBounds().height;
                this.scale.y = 0 !== e ? t / e : 1, this._height = t
            }, enumerable: !1, configurable: !0
        }), e
    }(Ve);
    qe.prototype.containerUpdateTransform = qe.prototype.updateTransform;
    var Ke = {
        accessible: !1,
        accessibleTitle: null,
        accessibleHint: null,
        tabIndex: 0,
        _accessibleActive: !1,
        _accessibleDiv: null,
        accessibleType: "button",
        accessiblePointerEvents: "auto",
        accessibleChildren: !0,
        renderId: -1
    };
    Ve.mixin(Ke);
    var Ze = 100, Je = 0, Qe = 0, $e = 2, tr = function () {
        function t(t) {
            this.debug = !1, this._isActive = !1, this._isMobileAccessibility = !1, this.pool = [], this.renderId = 0, this.children = [], this.androidUpdateCount = 0, this.androidUpdateFrequency = 500, this._hookDiv = null, (F.tablet || F.phone) && this.createTouchHook();
            var e = document.createElement("div");
            e.style.width = Ze + "px", e.style.height = Ze + "px", e.style.position = "absolute", e.style.top = Je + "px", e.style.left = Qe + "px", e.style.zIndex = $e.toString(), this.div = e, this.renderer = t, this._onKeyDown = this._onKeyDown.bind(this), this._onMouseMove = this._onMouseMove.bind(this), self.addEventListener("keydown", this._onKeyDown, !1)
        }

        return Object.defineProperty(t.prototype, "isActive", {
            get: function () {
                return this._isActive
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "isMobileAccessibility", {
            get: function () {
                return this._isMobileAccessibility
            }, enumerable: !1, configurable: !0
        }), t.prototype.createTouchHook = function () {
            var t = this, e = document.createElement("button");
            e.style.width = "1px", e.style.height = "1px", e.style.position = "absolute", e.style.top = "-1000px", e.style.left = "-1000px", e.style.zIndex = 2..toString(), e.style.backgroundColor = "#FF0000", e.title = "select to enable accessibility for this content", e.addEventListener("focus", function () {
                t._isMobileAccessibility = !0, t.activate(), t.destroyTouchHook()
            }), document.body.appendChild(e), this._hookDiv = e
        }, t.prototype.destroyTouchHook = function () {
            this._hookDiv && (document.body.removeChild(this._hookDiv), this._hookDiv = null)
        }, t.prototype.activate = function () {
            var t;
            this._isActive || (this._isActive = !0, self.document.addEventListener("mousemove", this._onMouseMove, !0), self.removeEventListener("keydown", this._onKeyDown, !1), this.renderer.on("postrender", this.update, this), null === (t = this.renderer.view.parentNode) || void 0 === t || t.appendChild(this.div))
        }, t.prototype.deactivate = function () {
            var t;
            this._isActive && !this._isMobileAccessibility && (this._isActive = !1, self.document.removeEventListener("mousemove", this._onMouseMove, !0), self.addEventListener("keydown", this._onKeyDown, !1), this.renderer.off("postrender", this.update), null === (t = this.div.parentNode) || void 0 === t || t.removeChild(this.div))
        }, t.prototype.updateAccessibleObjects = function (t) {
            if (t.visible && t.accessibleChildren) {
                t.accessible && t.interactive && (t._accessibleActive || this.addChild(t), t.renderId = this.renderId);
                for (var e = t.children, r = 0; r < e.length; r++) this.updateAccessibleObjects(e[r])
            }
        }, t.prototype.update = function () {
            var t = performance.now();
            if (!(F.android.device && t < this.androidUpdateCount) && (this.androidUpdateCount = t + this.androidUpdateFrequency, this.renderer.renderingToScreen)) {
                this.renderer._lastObjectRendered && this.updateAccessibleObjects(this.renderer._lastObjectRendered);
                var e = this.renderer.view.getBoundingClientRect(), r = e.left, i = e.top, n = e.width, o = e.height, s = this.renderer, a = s.width, h = s.height,
                    u = s.resolution, l = n / a * u, c = o / h * u, d = this.div;
                d.style.left = r + "px", d.style.top = i + "px", d.style.width = a + "px", d.style.height = h + "px";
                for (var f = 0; f < this.children.length; f++) {
                    var p = this.children[f];
                    if (p.renderId !== this.renderId) p._accessibleActive = !1, ae(this.children, f, 1), this.div.removeChild(p._accessibleDiv), this.pool.push(p._accessibleDiv), p._accessibleDiv = null, f--; else {
                        d = p._accessibleDiv;
                        var _ = p.hitArea, m = p.worldTransform;
                        p.hitArea ? (d.style.left = (m.tx + _.x * m.a) * l + "px", d.style.top = (m.ty + _.y * m.d) * c + "px", d.style.width = _.width * m.a * l + "px", d.style.height = _.height * m.d * c + "px") : (_ = p.getBounds(), this.capHitArea(_), d.style.left = _.x * l + "px", d.style.top = _.y * c + "px", d.style.width = _.width * l + "px", d.style.height = _.height * c + "px", d.title !== p.accessibleTitle && null !== p.accessibleTitle && (d.title = p.accessibleTitle), d.getAttribute("aria-label") !== p.accessibleHint && null !== p.accessibleHint && d.setAttribute("aria-label", p.accessibleHint)), p.accessibleTitle === d.title && p.tabIndex === d.tabIndex || (d.title = p.accessibleTitle, d.tabIndex = p.tabIndex, this.debug && this.updateDebugHTML(d))
                    }
                }
                this.renderId++
            }
        }, t.prototype.updateDebugHTML = function (t) {
            t.innerHTML = "type: " + t.type + "</br> title : " + t.title + "</br> tabIndex: " + t.tabIndex
        }, t.prototype.capHitArea = function (t) {
            t.x < 0 && (t.width += t.x, t.x = 0), t.y < 0 && (t.height += t.y, t.y = 0);
            var e = this.renderer, r = e.width, i = e.height;
            t.x + t.width > r && (t.width = r - t.x), t.y + t.height > i && (t.height = i - t.y)
        }, t.prototype.addChild = function (t) {
            var e = this.pool.pop();
            e || ((e = document.createElement("button")).style.width = Ze + "px", e.style.height = Ze + "px", e.style.backgroundColor = this.debug ? "rgba(255,255,255,0.5)" : "transparent", e.style.position = "absolute", e.style.zIndex = $e.toString(), e.style.borderStyle = "none", navigator.userAgent.toLowerCase().indexOf("chrome") > -1 ? e.setAttribute("aria-live", "off") : e.setAttribute("aria-live", "polite"), navigator.userAgent.match(/rv:.*Gecko\//) ? e.setAttribute("aria-relevant", "additions") : e.setAttribute("aria-relevant", "text"), e.addEventListener("click", this._onClick.bind(this)), e.addEventListener("focus", this._onFocus.bind(this)), e.addEventListener("focusout", this._onFocusOut.bind(this))), e.style.pointerEvents = t.accessiblePointerEvents, e.type = t.accessibleType, t.accessibleTitle && null !== t.accessibleTitle ? e.title = t.accessibleTitle : t.accessibleHint && null !== t.accessibleHint || (e.title = "displayObject " + t.tabIndex), t.accessibleHint && null !== t.accessibleHint && e.setAttribute("aria-label", t.accessibleHint), this.debug && this.updateDebugHTML(e), t._accessibleActive = !0, t._accessibleDiv = e, e.displayObject = t, this.children.push(t), this.div.appendChild(t._accessibleDiv), t._accessibleDiv.tabIndex = t.tabIndex
        }, t.prototype._onClick = function (t) {
            var e = this.renderer.plugins.interaction, r = t.target.displayObject, i = e.eventData;
            e.dispatchEvent(r, "click", i), e.dispatchEvent(r, "pointertap", i), e.dispatchEvent(r, "tap", i)
        }, t.prototype._onFocus = function (t) {
            t.target.getAttribute("aria-live") || t.target.setAttribute("aria-live", "assertive");
            var e = this.renderer.plugins.interaction, r = t.target.displayObject, i = e.eventData;
            e.dispatchEvent(r, "mouseover", i)
        }, t.prototype._onFocusOut = function (t) {
            t.target.getAttribute("aria-live") || t.target.setAttribute("aria-live", "polite");
            var e = this.renderer.plugins.interaction, r = t.target.displayObject, i = e.eventData;
            e.dispatchEvent(r, "mouseout", i)
        }, t.prototype._onKeyDown = function (t) {
            9 === t.keyCode && this.activate()
        }, t.prototype._onMouseMove = function (t) {
            0 === t.movementX && 0 === t.movementY || this.deactivate()
        }, t.prototype.destroy = function () {
            this.destroyTouchHook(), this.div = null, self.document.removeEventListener("mousemove", this._onMouseMove, !0), self.removeEventListener("keydown", this._onKeyDown), this.pool = null, this.children = null, this.renderer = null
        }, t
    }();
    B.TARGET_FPMS = .06, function (t) {
        t[t.INTERACTION = 50] = "INTERACTION", t[t.HIGH = 25] = "HIGH", t[t.NORMAL = 0] = "NORMAL", t[t.LOW = -25] = "LOW", t[t.UTILITY = -50] = "UTILITY"
    }(t.UPDATE_PRIORITY || (t.UPDATE_PRIORITY = {}));
    var er = function () {
        function t(t, e, r, i) {
            void 0 === e && (e = null), void 0 === r && (r = 0), void 0 === i && (i = !1), this.next = null, this.previous = null, this._destroyed = !1, this.fn = t, this.context = e, this.priority = r, this.once = i
        }

        return t.prototype.match = function (t, e) {
            return void 0 === e && (e = null), this.fn === t && this.context === e
        }, t.prototype.emit = function (t) {
            this.fn && (this.context ? this.fn.call(this.context, t) : this.fn(t));
            var e = this.next;
            return this.once && this.destroy(!0), this._destroyed && (this.next = null), e
        }, t.prototype.connect = function (t) {
            this.previous = t, t.next && (t.next.previous = this), this.next = t.next, t.next = this
        }, t.prototype.destroy = function (t) {
            void 0 === t && (t = !1), this._destroyed = !0, this.fn = null, this.context = null, this.previous && (this.previous.next = this.next), this.next && (this.next.previous = this.previous);
            var e = this.next;
            return this.next = t ? null : e, this.previous = null, e
        }, t
    }(), rr = function () {
        function e() {
            var t = this;
            this.autoStart = !1, this.deltaTime = 1, this.lastTime = -1, this.speed = 1, this.started = !1, this._requestId = null, this._maxElapsedMS = 100, this._minElapsedMS = 0, this._protected = !1, this._lastFrame = -1, this._head = new er(null, null, 1 / 0), this.deltaMS = 1 / B.TARGET_FPMS, this.elapsedMS = 1 / B.TARGET_FPMS, this._tick = function (e) {
                t._requestId = null, t.started && (t.update(e), t.started && null === t._requestId && t._head.next && (t._requestId = requestAnimationFrame(t._tick)))
            }
        }

        return e.prototype._requestIfNeeded = function () {
            null === this._requestId && this._head.next && (this.lastTime = performance.now(), this._lastFrame = this.lastTime, this._requestId = requestAnimationFrame(this._tick))
        }, e.prototype._cancelIfNeeded = function () {
            null !== this._requestId && (cancelAnimationFrame(this._requestId), this._requestId = null)
        }, e.prototype._startIfPossible = function () {
            this.started ? this._requestIfNeeded() : this.autoStart && this.start()
        }, e.prototype.add = function (e, r, i) {
            return void 0 === i && (i = t.UPDATE_PRIORITY.NORMAL), this._addListener(new er(e, r, i))
        }, e.prototype.addOnce = function (e, r, i) {
            return void 0 === i && (i = t.UPDATE_PRIORITY.NORMAL), this._addListener(new er(e, r, i, !0))
        }, e.prototype._addListener = function (t) {
            var e = this._head.next, r = this._head;
            if (e) {
                for (; e;) {
                    if (t.priority > e.priority) {
                        t.connect(r);
                        break
                    }
                    r = e, e = e.next
                }
                t.previous || t.connect(r)
            } else t.connect(r);
            return this._startIfPossible(), this
        }, e.prototype.remove = function (t, e) {
            for (var r = this._head.next; r;) r = r.match(t, e) ? r.destroy() : r.next;
            return this._head.next || this._cancelIfNeeded(), this
        }, Object.defineProperty(e.prototype, "count", {
            get: function () {
                if (!this._head) return 0;
                for (var t = 0, e = this._head; e = e.next;) t++;
                return t
            }, enumerable: !1, configurable: !0
        }), e.prototype.start = function () {
            this.started || (this.started = !0, this._requestIfNeeded())
        }, e.prototype.stop = function () {
            this.started && (this.started = !1, this._cancelIfNeeded())
        }, e.prototype.destroy = function () {
            if (!this._protected) {
                this.stop();
                for (var t = this._head.next; t;) t = t.destroy(!0);
                this._head.destroy(), this._head = null
            }
        }, e.prototype.update = function (t) {
            var e;
            if (void 0 === t && (t = performance.now()), t > this.lastTime) {
                if ((e = this.elapsedMS = t - this.lastTime) > this._maxElapsedMS && (e = this._maxElapsedMS), e *= this.speed, this._minElapsedMS) {
                    var r = t - this._lastFrame | 0;
                    if (r < this._minElapsedMS) return;
                    this._lastFrame = t - r % this._minElapsedMS
                }
                this.deltaMS = e, this.deltaTime = this.deltaMS * B.TARGET_FPMS;
                for (var i = this._head, n = i.next; n;) n = n.emit(this.deltaTime);
                i.next || this._cancelIfNeeded()
            } else this.deltaTime = this.deltaMS = this.elapsedMS = 0;
            this.lastTime = t
        }, Object.defineProperty(e.prototype, "FPS", {
            get: function () {
                return 1e3 / this.elapsedMS
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "minFPS", {
            get: function () {
                return 1e3 / this._maxElapsedMS
            }, set: function (t) {
                var e = Math.min(this.maxFPS, t), r = Math.min(Math.max(0, e) / 1e3, B.TARGET_FPMS);
                this._maxElapsedMS = 1 / r
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "maxFPS", {
            get: function () {
                return this._minElapsedMS ? Math.round(1e3 / this._minElapsedMS) : 0
            }, set: function (t) {
                if (0 === t) this._minElapsedMS = 0; else {
                    var e = Math.max(this.minFPS, t);
                    this._minElapsedMS = 1 / (e / 1e3)
                }
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e, "shared", {
            get: function () {
                if (!e._shared) {
                    var t = e._shared = new e;
                    t.autoStart = !0, t._protected = !0
                }
                return e._shared
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e, "system", {
            get: function () {
                if (!e._system) {
                    var t = e._system = new e;
                    t.autoStart = !0, t._protected = !0
                }
                return e._system
            }, enumerable: !1, configurable: !0
        }), e
    }(), ir = function () {
        function e() {
        }

        return e.init = function (e) {
            var r = this;
            e = Object.assign({autoStart: !0, sharedTicker: !1}, e), Object.defineProperty(this, "ticker", {
                set: function (e) {
                    this._ticker && this._ticker.remove(this.render, this), this._ticker = e, e && e.add(this.render, this, t.UPDATE_PRIORITY.LOW)
                }, get: function () {
                    return this._ticker
                }
            }), this.stop = function () {
                r._ticker.stop()
            }, this.start = function () {
                r._ticker.start()
            }, this._ticker = null, this.ticker = e.sharedTicker ? rr.shared : new rr, e.autoStart && this.start()
        }, e.destroy = function () {
            if (this._ticker) {
                var t = this._ticker;
                this.ticker = null, t.destroy()
            }
        }, e
    }(), nr = function () {
        function t() {
            this.pressure = 0, this.rotationAngle = 0, this.twist = 0, this.tangentialPressure = 0, this.global = new Me, this.target = null, this.originalEvent = null, this.identifier = null, this.isPrimary = !1, this.button = 0, this.buttons = 0, this.width = 0, this.height = 0, this.tiltX = 0, this.tiltY = 0, this.pointerType = null, this.pressure = 0, this.rotationAngle = 0, this.twist = 0, this.tangentialPressure = 0
        }

        return Object.defineProperty(t.prototype, "pointerId", {
            get: function () {
                return this.identifier
            }, enumerable: !1, configurable: !0
        }), t.prototype.getLocalPosition = function (t, e, r) {
            return t.worldTransform.applyInverse(r || this.global, e)
        }, t.prototype.copyEvent = function (t) {
            "isPrimary" in t && t.isPrimary && (this.isPrimary = !0), this.button = "button" in t && t.button;
            var e = "buttons" in t && t.buttons;
            this.buttons = Number.isInteger(e) ? e : "which" in t && t.which, this.width = "width" in t && t.width, this.height = "height" in t && t.height, this.tiltX = "tiltX" in t && t.tiltX, this.tiltY = "tiltY" in t && t.tiltY, this.pointerType = "pointerType" in t && t.pointerType, this.pressure = "pressure" in t && t.pressure, this.rotationAngle = "rotationAngle" in t && t.rotationAngle, this.twist = "twist" in t && t.twist || 0, this.tangentialPressure = "tangentialPressure" in t && t.tangentialPressure || 0
        }, t.prototype.reset = function () {
            this.isPrimary = !1
        }, t
    }(), or = function (t, e) {
        return (or = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
            t.__proto__ = e
        } || function (t, e) {
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
        })(t, e)
    }, sr = function () {
        function t() {
            this.stopped = !1, this.stopsPropagatingAt = null, this.stopPropagationHint = !1, this.target = null, this.currentTarget = null, this.type = null, this.data = null
        }

        return t.prototype.stopPropagation = function () {
            this.stopped = !0, this.stopPropagationHint = !0, this.stopsPropagatingAt = this.currentTarget
        }, t.prototype.reset = function () {
            this.stopped = !1, this.stopsPropagatingAt = null, this.stopPropagationHint = !1, this.currentTarget = null, this.target = null
        }, t
    }(), ar = function () {
        function t(e) {
            this._pointerId = e, this._flags = t.FLAGS.NONE
        }

        return t.prototype._doSet = function (t, e) {
            this._flags = e ? this._flags | t : this._flags & ~t
        }, Object.defineProperty(t.prototype, "pointerId", {
            get: function () {
                return this._pointerId
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "flags", {
            get: function () {
                return this._flags
            }, set: function (t) {
                this._flags = t
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "none", {
            get: function () {
                return this._flags === t.FLAGS.NONE
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "over", {
            get: function () {
                return 0 != (this._flags & t.FLAGS.OVER)
            }, set: function (e) {
                this._doSet(t.FLAGS.OVER, e)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "rightDown", {
            get: function () {
                return 0 != (this._flags & t.FLAGS.RIGHT_DOWN)
            }, set: function (e) {
                this._doSet(t.FLAGS.RIGHT_DOWN, e)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "leftDown", {
            get: function () {
                return 0 != (this._flags & t.FLAGS.LEFT_DOWN)
            }, set: function (e) {
                this._doSet(t.FLAGS.LEFT_DOWN, e)
            }, enumerable: !1, configurable: !0
        }), t.FLAGS = Object.freeze({NONE: 0, OVER: 1, LEFT_DOWN: 2, RIGHT_DOWN: 4}), t
    }(), hr = function () {
        function t() {
            this._tempPoint = new Me
        }

        return t.prototype.recursiveFindHit = function (t, e, r, i, n) {
            if (!e || !e.visible) return !1;
            var o = t.data.global, s = !1, a = n = e.interactive || n, h = !0;
            if (e.hitArea ? (i && (e.worldTransform.applyInverse(o, this._tempPoint), e.hitArea.contains(this._tempPoint.x, this._tempPoint.y) ? s = !0 : (i = !1, h = !1)), a = !1) : e._mask && i && (e._mask.containsPoint && e._mask.containsPoint(o) || (i = !1)), h && e.interactiveChildren && e.children) for (var u = e.children, l = u.length - 1; l >= 0; l--) {
                var c = u[l], d = this.recursiveFindHit(t, c, r, i, a);
                if (d) {
                    if (!c.parent) continue;
                    a = !1, d && (t.target && (i = !1), s = !0)
                }
            }
            return n && (i && !t.target && !e.hitArea && e.containsPoint && e.containsPoint(o) && (s = !0), e.interactive && (s && !t.target && (t.target = e), r && r(t, e, !!s))), s
        }, t.prototype.findHit = function (t, e, r, i) {
            this.recursiveFindHit(t, e, r, i, !1)
        }, t
    }(), ur = {
        interactive: !1, interactiveChildren: !0, hitArea: null, get buttonMode() {
            return "pointer" === this.cursor
        }, set buttonMode(t) {
            t ? this.cursor = "pointer" : "pointer" === this.cursor && (this.cursor = null)
        }, cursor: null, get trackedPointers() {
            return void 0 === this._trackedPointers && (this._trackedPointers = {}), this._trackedPointers
        }, _trackedPointers: void 0
    };
    Ve.mixin(ur);
    var lr = 1, cr = {target: null, data: {global: null}}, dr = function (e) {
        function r(t, r) {
            var i = e.call(this) || this;
            return r = r || {}, i.renderer = t, i.autoPreventDefault = void 0 === r.autoPreventDefault || r.autoPreventDefault, i.interactionFrequency = r.interactionFrequency || 10, i.mouse = new nr, i.mouse.identifier = lr, i.mouse.global.set(-999999), i.activeInteractionData = {}, i.activeInteractionData[lr] = i.mouse, i.interactionDataPool = [], i.eventData = new sr, i.interactionDOMElement = null, i.moveWhenInside = !1, i.eventsAdded = !1, i.tickerAdded = !1, i.mouseOverRenderer = !("PointerEvent" in self), i.supportsTouchEvents = "ontouchstart" in self, i.supportsPointerEvents = !!self.PointerEvent, i.onPointerUp = i.onPointerUp.bind(i), i.processPointerUp = i.processPointerUp.bind(i), i.onPointerCancel = i.onPointerCancel.bind(i), i.processPointerCancel = i.processPointerCancel.bind(i), i.onPointerDown = i.onPointerDown.bind(i), i.processPointerDown = i.processPointerDown.bind(i), i.onPointerMove = i.onPointerMove.bind(i), i.processPointerMove = i.processPointerMove.bind(i), i.onPointerOut = i.onPointerOut.bind(i), i.processPointerOverOut = i.processPointerOverOut.bind(i), i.onPointerOver = i.onPointerOver.bind(i), i.cursorStyles = {
                default: "inherit",
                pointer: "pointer"
            }, i.currentCursorMode = null, i.cursor = null, i.resolution = 1, i.delayedEvents = [], i.search = new hr, i._tempDisplayObject = new ze, i._useSystemTicker = void 0 === r.useSystemTicker || r.useSystemTicker, i.setTargetElement(i.renderer.view, i.renderer.resolution), i
        }

        return function (t, e) {
            function r() {
                this.constructor = t
            }

            or(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
        }(r, e), Object.defineProperty(r.prototype, "useSystemTicker", {
            get: function () {
                return this._useSystemTicker
            }, set: function (t) {
                this._useSystemTicker = t, t ? this.addTickerListener() : this.removeTickerListener()
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(r.prototype, "lastObjectRendered", {
            get: function () {
                return this.renderer._lastObjectRendered || this._tempDisplayObject
            }, enumerable: !1, configurable: !0
        }), r.prototype.hitTest = function (t, e) {
            return cr.target = null, cr.data.global = t, e || (e = this.lastObjectRendered), this.processInteractive(cr, e, null, !0), cr.target
        }, r.prototype.setTargetElement = function (t, e) {
            void 0 === e && (e = 1), this.removeTickerListener(), this.removeEvents(), this.interactionDOMElement = t, this.resolution = e, this.addEvents(), this.addTickerListener()
        }, r.prototype.addTickerListener = function () {
            !this.tickerAdded && this.interactionDOMElement && this._useSystemTicker && (rr.system.add(this.tickerUpdate, this, t.UPDATE_PRIORITY.INTERACTION), this.tickerAdded = !0)
        }, r.prototype.removeTickerListener = function () {
            this.tickerAdded && (rr.system.remove(this.tickerUpdate, this), this.tickerAdded = !1)
        }, r.prototype.addEvents = function () {
            if (!this.eventsAdded && this.interactionDOMElement) {
                var t = this.interactionDOMElement.style;
                self.navigator.msPointerEnabled ? (t.msContentZooming = "none", t.msTouchAction = "none") : this.supportsPointerEvents && (t.touchAction = "none"), this.supportsPointerEvents ? (self.document.addEventListener("pointermove", this.onPointerMove, !0), this.interactionDOMElement.addEventListener("pointerdown", this.onPointerDown, !0), this.interactionDOMElement.addEventListener("pointerleave", this.onPointerOut, !0), this.interactionDOMElement.addEventListener("pointerover", this.onPointerOver, !0), self.addEventListener("pointercancel", this.onPointerCancel, !0), self.addEventListener("pointerup", this.onPointerUp, !0)) : (self.document.addEventListener("mousemove", this.onPointerMove, !0), this.interactionDOMElement.addEventListener("mousedown", this.onPointerDown, !0), this.interactionDOMElement.addEventListener("mouseout", this.onPointerOut, !0), this.interactionDOMElement.addEventListener("mouseover", this.onPointerOver, !0), self.addEventListener("mouseup", this.onPointerUp, !0)), this.supportsTouchEvents && (this.interactionDOMElement.addEventListener("touchstart", this.onPointerDown, !0), this.interactionDOMElement.addEventListener("touchcancel", this.onPointerCancel, !0), this.interactionDOMElement.addEventListener("touchend", this.onPointerUp, !0), this.interactionDOMElement.addEventListener("touchmove", this.onPointerMove, !0)), this.eventsAdded = !0
            }
        }, r.prototype.removeEvents = function () {
            if (this.eventsAdded && this.interactionDOMElement) {
                var t = this.interactionDOMElement.style;
                self.navigator.msPointerEnabled ? (t.msContentZooming = "", t.msTouchAction = "") : this.supportsPointerEvents && (t.touchAction = ""), this.supportsPointerEvents ? (self.document.removeEventListener("pointermove", this.onPointerMove, !0), this.interactionDOMElement.removeEventListener("pointerdown", this.onPointerDown, !0), this.interactionDOMElement.removeEventListener("pointerleave", this.onPointerOut, !0), this.interactionDOMElement.removeEventListener("pointerover", this.onPointerOver, !0), self.removeEventListener("pointercancel", this.onPointerCancel, !0), self.removeEventListener("pointerup", this.onPointerUp, !0)) : (self.document.removeEventListener("mousemove", this.onPointerMove, !0), this.interactionDOMElement.removeEventListener("mousedown", this.onPointerDown, !0), this.interactionDOMElement.removeEventListener("mouseout", this.onPointerOut, !0), this.interactionDOMElement.removeEventListener("mouseover", this.onPointerOver, !0), self.removeEventListener("mouseup", this.onPointerUp, !0)), this.supportsTouchEvents && (this.interactionDOMElement.removeEventListener("touchstart", this.onPointerDown, !0), this.interactionDOMElement.removeEventListener("touchcancel", this.onPointerCancel, !0), this.interactionDOMElement.removeEventListener("touchend", this.onPointerUp, !0), this.interactionDOMElement.removeEventListener("touchmove", this.onPointerMove, !0)), this.interactionDOMElement = null, this.eventsAdded = !1
            }
        }, r.prototype.tickerUpdate = function (t) {
            this._deltaTime += t, this._deltaTime < this.interactionFrequency || (this._deltaTime = 0, this.update())
        }, r.prototype.update = function () {
            if (this.interactionDOMElement) if (this._didMove) this._didMove = !1; else {
                for (var t in this.cursor = null, this.activeInteractionData) if (this.activeInteractionData.hasOwnProperty(t)) {
                    var e = this.activeInteractionData[t];
                    if (e.originalEvent && "touch" !== e.pointerType) {
                        var r = this.configureInteractionEventForDOMEvent(this.eventData, e.originalEvent, e);
                        this.processInteractive(r, this.lastObjectRendered, this.processPointerOverOut, !0)
                    }
                }
                this.setCursorMode(this.cursor)
            }
        }, r.prototype.setCursorMode = function (t) {
            t = t || "default";
            var e = !0;
            if (self.OffscreenCanvas && this.interactionDOMElement instanceof OffscreenCanvas && (e = !1), this.currentCursorMode !== t) {
                this.currentCursorMode = t;
                var r = this.cursorStyles[t];
                if (r) switch (typeof r) {
                    case"string":
                        e && (this.interactionDOMElement.style.cursor = r);
                        break;
                    case"function":
                        r(t);
                        break;
                    case"object":
                        e && Object.assign(this.interactionDOMElement.style, r)
                } else e && "string" == typeof t && !Object.prototype.hasOwnProperty.call(this.cursorStyles, t) && (this.interactionDOMElement.style.cursor = t)
            }
        }, r.prototype.dispatchEvent = function (t, e, r) {
            r.stopPropagationHint && t !== r.stopsPropagatingAt || (r.currentTarget = t, r.type = e, t.emit(e, r), t[e] && t[e](r))
        }, r.prototype.delayDispatchEvent = function (t, e, r) {
            this.delayedEvents.push({displayObject: t, eventString: e, eventData: r})
        }, r.prototype.mapPositionToPoint = function (t, e, r) {
            var i;
            i = this.interactionDOMElement.parentElement ? this.interactionDOMElement.getBoundingClientRect() : {
                x: 0,
                y: 0,
                width: this.interactionDOMElement.width,
                height: this.interactionDOMElement.height,
                left: 0,
                top: 0
            };
            var n = 1 / this.resolution;
            t.x = (e - i.left) * (this.interactionDOMElement.width / i.width) * n, t.y = (r - i.top) * (this.interactionDOMElement.height / i.height) * n
        }, r.prototype.processInteractive = function (t, e, r, i) {
            var n = this.search.findHit(t, e, r, i), o = this.delayedEvents;
            if (!o.length) return n;
            t.stopPropagationHint = !1;
            var s = o.length;
            this.delayedEvents = [];
            for (var a = 0; a < s; a++) {
                var h = o[a], u = h.displayObject, l = h.eventString, c = h.eventData;
                c.stopsPropagatingAt === u && (c.stopPropagationHint = !0), this.dispatchEvent(u, l, c)
            }
            return n
        }, r.prototype.onPointerDown = function (t) {
            if (!this.supportsTouchEvents || "touch" !== t.pointerType) {
                var e = this.normalizeToPointerData(t);
                this.autoPreventDefault && e[0].isNormalized && (t.cancelable || !("cancelable" in t)) && t.preventDefault();
                for (var r = e.length, i = 0; i < r; i++) {
                    var n = e[i], o = this.getInteractionDataForPointerId(n), s = this.configureInteractionEventForDOMEvent(this.eventData, n, o);
                    if (s.data.originalEvent = t, this.processInteractive(s, this.lastObjectRendered, this.processPointerDown, !0), this.emit("pointerdown", s), "touch" === n.pointerType) this.emit("touchstart", s); else if ("mouse" === n.pointerType || "pen" === n.pointerType) {
                        var a = 2 === n.button;
                        this.emit(a ? "rightdown" : "mousedown", this.eventData)
                    }
                }
            }
        }, r.prototype.processPointerDown = function (t, e, r) {
            var i = t.data, n = t.data.identifier;
            if (r) if (e.trackedPointers[n] || (e.trackedPointers[n] = new ar(n)), this.dispatchEvent(e, "pointerdown", t), "touch" === i.pointerType) this.dispatchEvent(e, "touchstart", t); else if ("mouse" === i.pointerType || "pen" === i.pointerType) {
                var o = 2 === i.button;
                o ? e.trackedPointers[n].rightDown = !0 : e.trackedPointers[n].leftDown = !0, this.dispatchEvent(e, o ? "rightdown" : "mousedown", t)
            }
        }, r.prototype.onPointerComplete = function (t, e, r) {
            for (var i = this.normalizeToPointerData(t), n = i.length, o = t.target !== this.interactionDOMElement ? "outside" : "", s = 0; s < n; s++) {
                var a = i[s], h = this.getInteractionDataForPointerId(a), u = this.configureInteractionEventForDOMEvent(this.eventData, a, h);
                if (u.data.originalEvent = t, this.processInteractive(u, this.lastObjectRendered, r, e || !o), this.emit(e ? "pointercancel" : "pointerup" + o, u), "mouse" === a.pointerType || "pen" === a.pointerType) {
                    var l = 2 === a.button;
                    this.emit(l ? "rightup" + o : "mouseup" + o, u)
                } else "touch" === a.pointerType && (this.emit(e ? "touchcancel" : "touchend" + o, u), this.releaseInteractionDataForPointerId(a.pointerId))
            }
        }, r.prototype.onPointerCancel = function (t) {
            this.supportsTouchEvents && "touch" === t.pointerType || this.onPointerComplete(t, !0, this.processPointerCancel)
        }, r.prototype.processPointerCancel = function (t, e) {
            var r = t.data, i = t.data.identifier;
            void 0 !== e.trackedPointers[i] && (delete e.trackedPointers[i], this.dispatchEvent(e, "pointercancel", t), "touch" === r.pointerType && this.dispatchEvent(e, "touchcancel", t))
        }, r.prototype.onPointerUp = function (t) {
            this.supportsTouchEvents && "touch" === t.pointerType || this.onPointerComplete(t, !1, this.processPointerUp)
        }, r.prototype.processPointerUp = function (t, e, r) {
            var i = t.data, n = t.data.identifier, o = e.trackedPointers[n], s = "touch" === i.pointerType, a = "mouse" === i.pointerType || "pen" === i.pointerType, h = !1;
            if (a) {
                var u = 2 === i.button, l = ar.FLAGS, c = u ? l.RIGHT_DOWN : l.LEFT_DOWN, d = void 0 !== o && o.flags & c;
                r ? (this.dispatchEvent(e, u ? "rightup" : "mouseup", t), d && (this.dispatchEvent(e, u ? "rightclick" : "click", t), h = !0)) : d && this.dispatchEvent(e, u ? "rightupoutside" : "mouseupoutside", t), o && (u ? o.rightDown = !1 : o.leftDown = !1)
            }
            r ? (this.dispatchEvent(e, "pointerup", t), s && this.dispatchEvent(e, "touchend", t), o && (a && !h || this.dispatchEvent(e, "pointertap", t), s && (this.dispatchEvent(e, "tap", t), o.over = !1))) : o && (this.dispatchEvent(e, "pointerupoutside", t), s && this.dispatchEvent(e, "touchendoutside", t)), o && o.none && delete e.trackedPointers[n]
        }, r.prototype.onPointerMove = function (t) {
            if (!this.supportsTouchEvents || "touch" !== t.pointerType) {
                var e = this.normalizeToPointerData(t);
                "mouse" !== e[0].pointerType && "pen" !== e[0].pointerType || (this._didMove = !0, this.cursor = null);
                for (var r = e.length, i = 0; i < r; i++) {
                    var n = e[i], o = this.getInteractionDataForPointerId(n), s = this.configureInteractionEventForDOMEvent(this.eventData, n, o);
                    s.data.originalEvent = t, this.processInteractive(s, this.lastObjectRendered, this.processPointerMove, !0), this.emit("pointermove", s), "touch" === n.pointerType && this.emit("touchmove", s), "mouse" !== n.pointerType && "pen" !== n.pointerType || this.emit("mousemove", s)
                }
                "mouse" === e[0].pointerType && this.setCursorMode(this.cursor)
            }
        }, r.prototype.processPointerMove = function (t, e, r) {
            var i = t.data, n = "touch" === i.pointerType, o = "mouse" === i.pointerType || "pen" === i.pointerType;
            o && this.processPointerOverOut(t, e, r), this.moveWhenInside && !r || (this.dispatchEvent(e, "pointermove", t), n && this.dispatchEvent(e, "touchmove", t), o && this.dispatchEvent(e, "mousemove", t))
        }, r.prototype.onPointerOut = function (t) {
            if (!this.supportsTouchEvents || "touch" !== t.pointerType) {
                var e = this.normalizeToPointerData(t)[0];
                "mouse" === e.pointerType && (this.mouseOverRenderer = !1, this.setCursorMode(null));
                var r = this.getInteractionDataForPointerId(e), i = this.configureInteractionEventForDOMEvent(this.eventData, e, r);
                i.data.originalEvent = e, this.processInteractive(i, this.lastObjectRendered, this.processPointerOverOut, !1), this.emit("pointerout", i), "mouse" === e.pointerType || "pen" === e.pointerType ? this.emit("mouseout", i) : this.releaseInteractionDataForPointerId(r.identifier)
            }
        }, r.prototype.processPointerOverOut = function (t, e, r) {
            var i = t.data, n = t.data.identifier, o = "mouse" === i.pointerType || "pen" === i.pointerType, s = e.trackedPointers[n];
            r && !s && (s = e.trackedPointers[n] = new ar(n)), void 0 !== s && (r && this.mouseOverRenderer ? (s.over || (s.over = !0, this.delayDispatchEvent(e, "pointerover", t), o && this.delayDispatchEvent(e, "mouseover", t)), o && null === this.cursor && (this.cursor = e.cursor)) : s.over && (s.over = !1, this.dispatchEvent(e, "pointerout", this.eventData), o && this.dispatchEvent(e, "mouseout", t), s.none && delete e.trackedPointers[n]))
        }, r.prototype.onPointerOver = function (t) {
            var e = this.normalizeToPointerData(t)[0], r = this.getInteractionDataForPointerId(e), i = this.configureInteractionEventForDOMEvent(this.eventData, e, r);
            i.data.originalEvent = e, "mouse" === e.pointerType && (this.mouseOverRenderer = !0), this.emit("pointerover", i), "mouse" !== e.pointerType && "pen" !== e.pointerType || this.emit("mouseover", i)
        }, r.prototype.getInteractionDataForPointerId = function (t) {
            var e, r = t.pointerId;
            return r === lr || "mouse" === t.pointerType ? e = this.mouse : this.activeInteractionData[r] ? e = this.activeInteractionData[r] : ((e = this.interactionDataPool.pop() || new nr).identifier = r, this.activeInteractionData[r] = e), e.copyEvent(t), e
        }, r.prototype.releaseInteractionDataForPointerId = function (t) {
            var e = this.activeInteractionData[t];
            e && (delete this.activeInteractionData[t], e.reset(), this.interactionDataPool.push(e))
        }, r.prototype.configureInteractionEventForDOMEvent = function (t, e, r) {
            return t.data = r, this.mapPositionToPoint(r.global, e.clientX, e.clientY), "touch" === e.pointerType && (e.globalX = r.global.x, e.globalY = r.global.y), r.originalEvent = e, t.reset(), t
        }, r.prototype.normalizeToPointerData = function (t) {
            var e = [];
            if (this.supportsTouchEvents && t instanceof TouchEvent) for (var r = 0, i = t.changedTouches.length; r < i; r++) {
                var n = t.changedTouches[r];
                void 0 === n.button && (n.button = t.touches.length ? 1 : 0), void 0 === n.buttons && (n.buttons = t.touches.length ? 1 : 0), void 0 === n.isPrimary && (n.isPrimary = 1 === t.touches.length && "touchstart" === t.type), void 0 === n.width && (n.width = n.radiusX || 1), void 0 === n.height && (n.height = n.radiusY || 1), void 0 === n.tiltX && (n.tiltX = 0), void 0 === n.tiltY && (n.tiltY = 0), void 0 === n.pointerType && (n.pointerType = "touch"), void 0 === n.pointerId && (n.pointerId = n.identifier || 0), void 0 === n.pressure && (n.pressure = n.force || .5), void 0 === n.twist && (n.twist = 0), void 0 === n.tangentialPressure && (n.tangentialPressure = 0), void 0 === n.layerX && (n.layerX = n.offsetX = n.clientX), void 0 === n.layerY && (n.layerY = n.offsetY = n.clientY), n.isNormalized = !0, e.push(n)
            } else if (!self.MouseEvent || t instanceof MouseEvent && !(this.supportsPointerEvents && t instanceof self.PointerEvent)) {
                var o = t;
                void 0 === o.isPrimary && (o.isPrimary = !0), void 0 === o.width && (o.width = 1), void 0 === o.height && (o.height = 1), void 0 === o.tiltX && (o.tiltX = 0), void 0 === o.tiltY && (o.tiltY = 0), void 0 === o.pointerType && (o.pointerType = "mouse"), void 0 === o.pointerId && (o.pointerId = lr), void 0 === o.pressure && (o.pressure = .5), void 0 === o.twist && (o.twist = 0), void 0 === o.tangentialPressure && (o.tangentialPressure = 0), o.isNormalized = !0, e.push(o)
            } else e.push(t);
            return e
        }, r.prototype.destroy = function () {
            this.removeEvents(), this.removeTickerListener(), this.removeAllListeners(), this.renderer = null, this.mouse = null, this.eventData = null, this.interactionDOMElement = null, this.onPointerDown = null, this.processPointerDown = null, this.onPointerUp = null, this.processPointerUp = null, this.onPointerCancel = null, this.processPointerCancel = null, this.onPointerMove = null, this.processPointerMove = null, this.onPointerOut = null, this.processPointerOverOut = null, this.onPointerOver = null, this.search = null
        }, r
    }(k), fr = function () {
        function t(t) {
            this.items = [], this._name = t, this._aliasCount = 0
        }

        return t.prototype.emit = function (t, e, r, i, n, o, s, a) {
            if (arguments.length > 8) throw new Error("max arguments reached");
            var h = this.name, u = this.items;
            this._aliasCount++;
            for (var l = 0, c = u.length; l < c; l++) u[l][h](t, e, r, i, n, o, s, a);
            return u === this.items && this._aliasCount--, this
        }, t.prototype.ensureNonAliasedItems = function () {
            this._aliasCount > 0 && this.items.length > 1 && (this._aliasCount = 0, this.items = this.items.slice(0))
        }, t.prototype.add = function (t) {
            return t[this._name] && (this.ensureNonAliasedItems(), this.remove(t), this.items.push(t)), this
        }, t.prototype.remove = function (t) {
            var e = this.items.indexOf(t);
            return -1 !== e && (this.ensureNonAliasedItems(), this.items.splice(e, 1)), this
        }, t.prototype.contains = function (t) {
            return -1 !== this.items.indexOf(t)
        }, t.prototype.removeAll = function () {
            return this.ensureNonAliasedItems(), this.items.length = 0, this
        }, t.prototype.destroy = function () {
            this.removeAll(), this.items = null, this._name = null
        }, Object.defineProperty(t.prototype, "empty", {
            get: function () {
                return 0 === this.items.length
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "name", {
            get: function () {
                return this._name
            }, enumerable: !1, configurable: !0
        }), t
    }();
    Object.defineProperties(fr.prototype, {
        dispatch: {value: fr.prototype.emit},
        run: {value: fr.prototype.emit}
    }), B.PREFER_ENV = F.any ? t.ENV.WEBGL : t.ENV.WEBGL2, B.STRICT_TEXTURE_CACHE = !1;
    var pr = [];

    function _r(t, e) {
        if (!t) return null;
        var r = "";
        if ("string" == typeof t) {
            var i = /\.(\w{3,4})(?:$|\?|#)/i.exec(t);
            i && (r = i[1].toLowerCase())
        }
        for (var n = pr.length - 1; n >= 0; --n) {
            var o = pr[n];
            if (o.test && o.test(t, r)) return new o(t, e)
        }
        throw new Error("Unrecognized source type to auto-detect Resource")
    }

    var mr = function (t, e) {
        return (mr = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
            t.__proto__ = e
        } || function (t, e) {
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
        })(t, e)
    };

    function vr(t, e) {
        function r() {
            this.constructor = t
        }

        mr(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
    }

    var yr = function () {
        function t(t, e) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), this._width = t, this._height = e, this.destroyed = !1, this.internal = !1, this.onResize = new fr("setRealSize"), this.onUpdate = new fr("update"), this.onError = new fr("onError")
        }

        return t.prototype.bind = function (t) {
            this.onResize.add(t), this.onUpdate.add(t), this.onError.add(t), (this._width || this._height) && this.onResize.emit(this._width, this._height)
        }, t.prototype.unbind = function (t) {
            this.onResize.remove(t), this.onUpdate.remove(t), this.onError.remove(t)
        }, t.prototype.resize = function (t, e) {
            t === this._width && e === this._height || (this._width = t, this._height = e, this.onResize.emit(t, e))
        }, Object.defineProperty(t.prototype, "valid", {
            get: function () {
                return !!this._width && !!this._height
            }, enumerable: !1, configurable: !0
        }), t.prototype.update = function () {
            this.destroyed || this.onUpdate.emit()
        }, t.prototype.load = function () {
            return Promise.resolve(this)
        }, Object.defineProperty(t.prototype, "width", {
            get: function () {
                return this._width
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "height", {
            get: function () {
                return this._height
            }, enumerable: !1, configurable: !0
        }), t.prototype.style = function (t, e, r) {
            return !1
        }, t.prototype.dispose = function () {
        }, t.prototype.destroy = function () {
            this.destroyed || (this.destroyed = !0, this.dispose(), this.onError.removeAll(), this.onError = null, this.onResize.removeAll(), this.onResize = null, this.onUpdate.removeAll(), this.onUpdate = null)
        }, t.test = function (t, e) {
            return !1
        }, t
    }(), gr = function (e) {
        function r(t, r) {
            var i = this, n = r || {}, o = n.width, s = n.height;
            if (!o || !s) throw new Error("BufferResource width or height invalid");
            return (i = e.call(this, o, s) || this).data = t, i
        }

        return vr(r, e), r.prototype.upload = function (e, r, i) {
            var n = e.gl;
            n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, r.alphaMode === t.ALPHA_MODES.UNPACK);
            var o = r.realWidth, s = r.realHeight;
            return i.width === o && i.height === s ? n.texSubImage2D(r.target, 0, 0, 0, o, s, r.format, r.type, this.data) : (i.width = o, i.height = s, n.texImage2D(r.target, 0, i.internalFormat, o, s, 0, r.format, i.type, this.data)), !0
        }, r.prototype.dispose = function () {
            this.data = null
        }, r.test = function (t) {
            return t instanceof Float32Array || t instanceof Uint8Array || t instanceof Uint32Array
        }, r
    }(yr), Er = {scaleMode: t.SCALE_MODES.NEAREST, format: t.FORMATS.RGBA, alphaMode: t.ALPHA_MODES.NPM}, Tr = function (e) {
        function r(r, i) {
            void 0 === r && (r = null), void 0 === i && (i = null);
            var n = e.call(this) || this, o = (i = i || {}).alphaMode, s = i.mipmap, a = i.anisotropicLevel, h = i.scaleMode, u = i.width, l = i.height, c = i.wrapMode,
                d = i.format, f = i.type, p = i.target, _ = i.resolution, m = i.resourceOptions;
            return !r || r instanceof yr || ((r = _r(r, m)).internal = !0), n.width = u || 0, n.height = l || 0, n.resolution = _ || B.RESOLUTION, n.mipmap = void 0 !== s ? s : B.MIPMAP_TEXTURES, n.anisotropicLevel = void 0 !== a ? a : B.ANISOTROPIC_LEVEL, n.wrapMode = c || B.WRAP_MODE, n.scaleMode = void 0 !== h ? h : B.SCALE_MODE, n.format = d || t.FORMATS.RGBA, n.type = f || t.TYPES.UNSIGNED_BYTE, n.target = p || t.TARGETS.TEXTURE_2D, n.alphaMode = void 0 !== o ? o : t.ALPHA_MODES.UNPACK, n.uid = le(), n.touched = 0, n.isPowerOfTwo = !1, n._refreshPOT(), n._glTextures = {}, n.dirtyId = 0, n.dirtyStyleId = 0, n.cacheId = null, n.valid = u > 0 && l > 0, n.textureCacheIds = [], n.destroyed = !1, n.resource = null, n._batchEnabled = 0, n._batchLocation = 0, n.parentTextureArray = null, n.setResource(r), n
        }

        return vr(r, e), Object.defineProperty(r.prototype, "realWidth", {
            get: function () {
                return Math.ceil(this.width * this.resolution - 1e-4)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(r.prototype, "realHeight", {
            get: function () {
                return Math.ceil(this.height * this.resolution - 1e-4)
            }, enumerable: !1, configurable: !0
        }), r.prototype.setStyle = function (t, e) {
            var r;
            return void 0 !== t && t !== this.scaleMode && (this.scaleMode = t, r = !0), void 0 !== e && e !== this.mipmap && (this.mipmap = e, r = !0), r && this.dirtyStyleId++, this
        }, r.prototype.setSize = function (t, e, r) {
            return this.resolution = r || this.resolution, this.width = t, this.height = e, this._refreshPOT(), this.update(), this
        }, r.prototype.setRealSize = function (t, e, r) {
            return this.resolution = r || this.resolution, this.width = t / this.resolution, this.height = e / this.resolution, this._refreshPOT(), this.update(), this
        }, r.prototype._refreshPOT = function () {
            this.isPowerOfTwo = oe(this.realWidth) && oe(this.realHeight)
        }, r.prototype.setResolution = function (t) {
            var e = this.resolution;
            return e === t ? this : (this.resolution = t, this.valid && (this.width = this.width * e / t, this.height = this.height * e / t, this.emit("update", this)), this._refreshPOT(), this)
        }, r.prototype.setResource = function (t) {
            if (this.resource === t) return this;
            if (this.resource) throw new Error("Resource can be set only once");
            return t.bind(this), this.resource = t, this
        }, r.prototype.update = function () {
            this.valid ? (this.dirtyId++, this.dirtyStyleId++, this.emit("update", this)) : this.width > 0 && this.height > 0 && (this.valid = !0, this.emit("loaded", this), this.emit("update", this))
        }, r.prototype.onError = function (t) {
            this.emit("error", this, t)
        }, r.prototype.destroy = function () {
            this.resource && (this.resource.unbind(this), this.resource.internal && this.resource.destroy(), this.resource = null), this.cacheId && (delete pe[this.cacheId], delete fe[this.cacheId], this.cacheId = null), this.dispose(), r.removeFromCache(this), this.textureCacheIds = null, this.destroyed = !0
        }, r.prototype.dispose = function () {
            this.emit("dispose", this)
        }, r.prototype.castToBaseTexture = function () {
            return this
        }, r.from = function (t, e, i) {
            void 0 === i && (i = B.STRICT_TEXTURE_CACHE);
            var n = "string" == typeof t, o = null;
            if (n) o = t; else {
                if (!t._pixiId) {
                    var s = e && e.pixiIdPrefix || "pixiid";
                    t._pixiId = s + "_" + le()
                }
                o = t._pixiId
            }
            var a = pe[o];
            if (n && i && !a) throw new Error('The cacheId "' + o + '" does not exist in BaseTextureCache.');
            return a || ((a = new r(t, e)).cacheId = o, r.addToCache(a, o)), a
        }, r.fromBuffer = function (e, i, n, o) {
            e = e || new Float32Array(i * n * 4);
            var s = new gr(e, {width: i, height: n}), a = e instanceof Float32Array ? t.TYPES.FLOAT : t.TYPES.UNSIGNED_BYTE;
            return new r(s, Object.assign(Er, o || {width: i, height: n, type: a}))
        }, r.addToCache = function (t, e) {
            e && (-1 === t.textureCacheIds.indexOf(e) && t.textureCacheIds.push(e), pe[e] && console.warn("BaseTexture added to the cache with an id [" + e + "] that already had an entry"), pe[e] = t)
        }, r.removeFromCache = function (t) {
            if ("string" == typeof t) {
                var e = pe[t];
                if (e) {
                    var r = e.textureCacheIds.indexOf(t);
                    return r > -1 && e.textureCacheIds.splice(r, 1), delete pe[t], e
                }
            } else if (t && t.textureCacheIds) {
                for (var i = 0; i < t.textureCacheIds.length; ++i) delete pe[t.textureCacheIds[i]];
                return t.textureCacheIds.length = 0, t
            }
            return null
        }, r._globalBatch = 0, r
    }(k), br = function (t) {
        function e(e, r) {
            var i = this, n = r || {}, o = n.width, s = n.height;
            (i = t.call(this, o, s) || this).items = [], i.itemDirtyIds = [];
            for (var a = 0; a < e; a++) {
                var h = new Tr;
                i.items.push(h), i.itemDirtyIds.push(-2)
            }
            return i.length = e, i._load = null, i.baseTexture = null, i
        }

        return vr(e, t), e.prototype.initFromArray = function (t, e) {
            for (var r = 0; r < this.length; r++) t[r] && (t[r].castToBaseTexture ? this.addBaseTextureAt(t[r].castToBaseTexture(), r) : t[r] instanceof yr ? this.addResourceAt(t[r], r) : this.addResourceAt(_r(t[r], e), r))
        }, e.prototype.dispose = function () {
            for (var t = 0, e = this.length; t < e; t++) this.items[t].destroy();
            this.items = null, this.itemDirtyIds = null, this._load = null
        }, e.prototype.addResourceAt = function (t, e) {
            if (!this.items[e]) throw new Error("Index " + e + " is out of bounds");
            return t.valid && !this.valid && this.resize(t.width, t.height), this.items[e].setResource(t), this
        }, e.prototype.bind = function (e) {
            if (null !== this.baseTexture) throw new Error("Only one base texture per TextureArray is allowed");
            t.prototype.bind.call(this, e);
            for (var r = 0; r < this.length; r++) this.items[r].parentTextureArray = e, this.items[r].on("update", e.update, e)
        }, e.prototype.unbind = function (e) {
            t.prototype.unbind.call(this, e);
            for (var r = 0; r < this.length; r++) this.items[r].parentTextureArray = null, this.items[r].off("update", e.update, e)
        }, e.prototype.load = function () {
            var t = this;
            if (this._load) return this._load;
            var e = this.items.map(function (t) {
                return t.resource
            }).filter(function (t) {
                return t
            }).map(function (t) {
                return t.load()
            });
            return this._load = Promise.all(e).then(function () {
                var e = t.items[0], r = e.realWidth, i = e.realHeight;
                return t.resize(r, i), Promise.resolve(t)
            }), this._load
        }, e
    }(yr), xr = function (e) {
        function r(t, r) {
            var i, n, o = this, s = r || {}, a = s.width, h = s.height;
            return Array.isArray(t) ? (i = t, n = t.length) : n = t, o = e.call(this, n, {width: a, height: h}) || this, i && o.initFromArray(i, r), o
        }

        return vr(r, e), r.prototype.addBaseTextureAt = function (t, e) {
            if (!t.resource) throw new Error("ArrayResource does not support RenderTexture");
            return this.addResourceAt(t.resource, e), this
        }, r.prototype.bind = function (r) {
            e.prototype.bind.call(this, r), r.target = t.TARGETS.TEXTURE_2D_ARRAY
        }, r.prototype.upload = function (t, e, r) {
            var i = this.length, n = this.itemDirtyIds, o = this.items, s = t.gl;
            r.dirtyId < 0 && s.texImage3D(s.TEXTURE_2D_ARRAY, 0, e.format, this._width, this._height, i, 0, e.format, e.type, null);
            for (var a = 0; a < i; a++) {
                var h = o[a];
                n[a] < h.dirtyId && (n[a] = h.dirtyId, h.valid && s.texSubImage3D(s.TEXTURE_2D_ARRAY, 0, 0, 0, a, h.resource.width, h.resource.height, 1, e.format, e.type, h.resource.source))
            }
            return !0
        }, r
    }(br), Ar = function (e) {
        function r(t) {
            var r = this, i = t, n = i.naturalWidth || i.videoWidth || i.width, o = i.naturalHeight || i.videoHeight || i.height;
            return (r = e.call(this, n, o) || this).source = t, r.noSubImage = !1, r
        }

        return vr(r, e), r.crossOrigin = function (t, e, r) {
            void 0 === r && 0 !== e.indexOf("data:") ? t.crossOrigin = ge(e) : !1 !== r && (t.crossOrigin = "string" == typeof r ? r : "anonymous")
        }, r.prototype.upload = function (e, r, i, n) {
            var o = e.gl, s = r.realWidth, a = r.realHeight;
            return n = n || this.source, o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL, r.alphaMode === t.ALPHA_MODES.UNPACK), this.noSubImage || r.target !== o.TEXTURE_2D || i.width !== s || i.height !== a ? (i.width = s, i.height = a, o.texImage2D(r.target, 0, r.format, r.format, r.type, n)) : o.texSubImage2D(o.TEXTURE_2D, 0, 0, 0, r.format, r.type, n), !0
        }, r.prototype.update = function () {
            if (!this.destroyed) {
                var t = this.source, r = t.naturalWidth || t.videoWidth || t.width, i = t.naturalHeight || t.videoHeight || t.height;
                this.resize(r, i), e.prototype.update.call(this)
            }
        }, r.prototype.dispose = function () {
            this.source = null
        }, r
    }(yr), Sr = function (t) {
        function e(e) {
            return t.call(this, e) || this
        }

        return vr(e, t), e.test = function (t) {
            var e = self.OffscreenCanvas;
            return !!(e && t instanceof e) || self.HTMLCanvasElement && t instanceof HTMLCanvasElement
        }, e
    }(Ar), Or = function (e) {
        function r(i, n) {
            var o = this, s = n || {}, a = s.width, h = s.height, u = s.autoLoad, l = s.linkBaseTexture;
            if (i && i.length !== r.SIDES) throw new Error("Invalid length. Got " + i.length + ", expected 6");
            o = e.call(this, 6, {width: a, height: h}) || this;
            for (var c = 0; c < r.SIDES; c++) o.items[c].target = t.TARGETS.TEXTURE_CUBE_MAP_POSITIVE_X + c;
            return o.linkBaseTexture = !1 !== l, i && o.initFromArray(i, n), !1 !== u && o.load(), o
        }

        return vr(r, e), r.prototype.bind = function (r) {
            e.prototype.bind.call(this, r), r.target = t.TARGETS.TEXTURE_CUBE_MAP
        }, r.prototype.addBaseTextureAt = function (e, r, i) {
            if (void 0 === i && (i = this.linkBaseTexture), !this.items[r]) throw new Error("Index " + r + " is out of bounds");
            if (!this.linkBaseTexture || e.parentTextureArray || Object.keys(e._glTextures).length > 0) {
                if (!e.resource) throw new Error("CubeResource does not support copying of renderTexture.");
                this.addResourceAt(e.resource, r)
            } else e.target = t.TARGETS.TEXTURE_CUBE_MAP_POSITIVE_X + r, e.parentTextureArray = this.baseTexture, this.items[r] = e;
            return e.valid && !this.valid && this.resize(e.realWidth, e.realHeight), this.items[r] = e, this
        }, r.prototype.upload = function (t, e, i) {
            for (var n = this.itemDirtyIds, o = 0; o < r.SIDES; o++) {
                var s = this.items[o];
                n[o] < s.dirtyId && (s.valid && s.resource ? (s.resource.upload(t, s, i), n[o] = s.dirtyId) : n[o] < -1 && (t.gl.texImage2D(s.target, 0, i.internalFormat, e.realWidth, e.realHeight, 0, e.format, i.type, null), n[o] = -1))
            }
            return !0
        }, r.test = function (t) {
            return Array.isArray(t) && t.length === r.SIDES
        }, r.SIDES = 6, r
    }(br), Rr = function (e) {
        function r(t, r) {
            var i = this;
            if (r = r || {}, !(t instanceof HTMLImageElement)) {
                var n = new Image;
                Ar.crossOrigin(n, t, r.crossorigin), n.src = t, t = n
            }
            return i = e.call(this, t) || this, !t.complete && i._width && i._height && (i._width = 0, i._height = 0), i.url = t.src, i._process = null, i.preserveBitmap = !1, i.createBitmap = (void 0 !== r.createBitmap ? r.createBitmap : B.CREATE_IMAGE_BITMAP) && !!self.createImageBitmap, i.alphaMode = "number" == typeof r.alphaMode ? r.alphaMode : null, i.bitmap = null, i._load = null, !1 !== r.autoLoad && i.load(), i
        }

        return vr(r, e), r.prototype.load = function (t) {
            var e = this;
            return this._load ? this._load : (void 0 !== t && (this.createBitmap = t), this._load = new Promise(function (t, r) {
                var i = e.source;
                e.url = i.src;
                var n = function () {
                    e.destroyed || (i.onload = null, i.onerror = null, e.resize(i.width, i.height), e._load = null, e.createBitmap ? t(e.process()) : t(e))
                };
                i.complete && i.src ? n() : (i.onload = n, i.onerror = function (t) {
                    r(t), e.onError.emit(t)
                })
            }), this._load)
        }, r.prototype.process = function () {
            var e = this, r = this.source;
            return null !== this._process ? this._process : null === this.bitmap && self.createImageBitmap ? (this._process = self.createImageBitmap(r, 0, 0, r.width, r.height, {premultiplyAlpha: this.alphaMode === t.ALPHA_MODES.UNPACK ? "premultiply" : "none"}).then(function (t) {
                return e.destroyed ? Promise.reject() : (e.bitmap = t, e.update(), e._process = null, Promise.resolve(e))
            }), this._process) : Promise.resolve(this)
        }, r.prototype.upload = function (t, r, i) {
            if ("number" == typeof this.alphaMode && (r.alphaMode = this.alphaMode), !this.createBitmap) return e.prototype.upload.call(this, t, r, i);
            if (!this.bitmap && (this.process(), !this.bitmap)) return !1;
            if (e.prototype.upload.call(this, t, r, i, this.bitmap), !this.preserveBitmap) {
                var n = !0, o = r._glTextures;
                for (var s in o) {
                    var a = o[s];
                    if (a !== i && a.dirtyId !== r.dirtyId) {
                        n = !1;
                        break
                    }
                }
                n && (this.bitmap.close && this.bitmap.close(), this.bitmap = null)
            }
            return !0
        }, r.prototype.dispose = function () {
            this.source.onload = null, this.source.onerror = null, e.prototype.dispose.call(this), this.bitmap && (this.bitmap.close(), this.bitmap = null), this._process = null, this._load = null
        }, r.test = function (t) {
            return "string" == typeof t || t instanceof HTMLImageElement
        }, r
    }(Ar), Pr = function (t) {
        function e(e, r) {
            var i = this;
            return r = r || {}, (i = t.call(this, document.createElement("canvas")) || this)._width = 0, i._height = 0, i.svg = e, i.scale = r.scale || 1, i._overrideWidth = r.width, i._overrideHeight = r.height, i._resolve = null, i._crossorigin = r.crossorigin, i._load = null, !1 !== r.autoLoad && i.load(), i
        }

        return vr(e, t), e.prototype.load = function () {
            var t = this;
            return this._load ? this._load : (this._load = new Promise(function (e) {
                if (t._resolve = function () {
                    t.resize(t.source.width, t.source.height), e(t)
                }, /^\<svg/.test(t.svg.trim())) {
                    if (!btoa) throw new Error("Your browser doesn't support base64 conversions.");
                    t.svg = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(t.svg)))
                }
                t._loadSvg()
            }), this._load)
        }, e.prototype._loadSvg = function () {
            var t = this, e = new Image;
            Ar.crossOrigin(e, this.svg, this._crossorigin), e.src = this.svg, e.onerror = function (r) {
                t._resolve && (e.onerror = null, t.onError.emit(r))
            }, e.onload = function () {
                if (t._resolve) {
                    var r = e.width, i = e.height;
                    if (!r || !i) throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
                    var n = r * t.scale, o = i * t.scale;
                    (t._overrideWidth || t._overrideHeight) && (n = t._overrideWidth || t._overrideHeight / i * r, o = t._overrideHeight || t._overrideWidth / r * i), n = Math.round(n), o = Math.round(o);
                    var s = t.source;
                    s.width = n, s.height = o, s._pixiId = "canvas_" + le(), s.getContext("2d").drawImage(e, 0, 0, r, i, 0, 0, n, o), t._resolve(), t._resolve = null
                }
            }
        }, e.getSize = function (t) {
            var r = e.SVG_SIZE.exec(t), i = {};
            return r && (i[r[1]] = Math.round(parseFloat(r[3])), i[r[5]] = Math.round(parseFloat(r[7]))), i
        }, e.prototype.dispose = function () {
            t.prototype.dispose.call(this), this._resolve = null, this._crossorigin = null
        }, e.test = function (t, e) {
            return "svg" === e || "string" == typeof t && /^data:image\/svg\+xml(;(charset=utf8|utf8))?;base64/.test(t) || "string" == typeof t && 0 === t.indexOf("<svg")
        }, e.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i, e
    }(Ar), Ir = function (t) {
        function e(r, i) {
            var n = this;
            if (i = i || {}, !(r instanceof HTMLVideoElement)) {
                var o = document.createElement("video");
                o.setAttribute("preload", "auto"), o.setAttribute("webkit-playsinline", ""), o.setAttribute("playsinline", ""), "string" == typeof r && (r = [r]);
                var s = r[0].src || r[0];
                Ar.crossOrigin(o, s, i.crossorigin);
                for (var a = 0; a < r.length; ++a) {
                    var h = document.createElement("source"), u = r[a], l = u.src, c = u.mime, d = (l = l || r[a]).split("?").shift().toLowerCase(),
                        f = d.substr(d.lastIndexOf(".") + 1);
                    c = c || e.MIME_TYPES[f] || "video/" + f, h.src = l, h.type = c, o.appendChild(h)
                }
                r = o
            }
            return (n = t.call(this, r) || this).noSubImage = !0, n._autoUpdate = !0, n._isConnectedToTicker = !1, n._updateFPS = i.updateFPS || 0, n._msToNextUpdate = 0, n.autoPlay = !1 !== i.autoPlay, n._load = null, n._resolve = null, n._onCanPlay = n._onCanPlay.bind(n), n._onError = n._onError.bind(n), !1 !== i.autoLoad && n.load(), n
        }

        return vr(e, t), e.prototype.update = function (e) {
            if (!this.destroyed) {
                var r = rr.shared.elapsedMS * this.source.playbackRate;
                this._msToNextUpdate = Math.floor(this._msToNextUpdate - r), (!this._updateFPS || this._msToNextUpdate <= 0) && (t.prototype.update.call(this), this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0)
            }
        }, e.prototype.load = function () {
            var t = this;
            if (this._load) return this._load;
            var e = this.source;
            return (e.readyState === e.HAVE_ENOUGH_DATA || e.readyState === e.HAVE_FUTURE_DATA) && e.width && e.height && (e.complete = !0), e.addEventListener("play", this._onPlayStart.bind(this)), e.addEventListener("pause", this._onPlayStop.bind(this)), this._isSourceReady() ? this._onCanPlay() : (e.addEventListener("canplay", this._onCanPlay), e.addEventListener("canplaythrough", this._onCanPlay), e.addEventListener("error", this._onError, !0)), this._load = new Promise(function (r) {
                t.valid ? r(t) : (t._resolve = r, e.load())
            }), this._load
        }, e.prototype._onError = function (t) {
            this.source.removeEventListener("error", this._onError, !0), this.onError.emit(t)
        }, e.prototype._isSourcePlaying = function () {
            var t = this.source;
            return t.currentTime > 0 && !1 === t.paused && !1 === t.ended && t.readyState > 2
        }, e.prototype._isSourceReady = function () {
            var t = this.source;
            return 3 === t.readyState || 4 === t.readyState
        }, e.prototype._onPlayStart = function () {
            this.valid || this._onCanPlay(), this.autoUpdate && !this._isConnectedToTicker && (rr.shared.add(this.update, this), this._isConnectedToTicker = !0)
        }, e.prototype._onPlayStop = function () {
            this._isConnectedToTicker && (rr.shared.remove(this.update, this), this._isConnectedToTicker = !1)
        }, e.prototype._onCanPlay = function () {
            var t = this.source;
            t.removeEventListener("canplay", this._onCanPlay), t.removeEventListener("canplaythrough", this._onCanPlay);
            var e = this.valid;
            this.resize(t.videoWidth, t.videoHeight), !e && this._resolve && (this._resolve(this), this._resolve = null), this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && t.play()
        }, e.prototype.dispose = function () {
            this._isConnectedToTicker && rr.shared.remove(this.update, this);
            var e = this.source;
            e && (e.removeEventListener("error", this._onError, !0), e.pause(), e.src = "", e.load()), t.prototype.dispose.call(this)
        }, Object.defineProperty(e.prototype, "autoUpdate", {
            get: function () {
                return this._autoUpdate
            }, set: function (t) {
                t !== this._autoUpdate && (this._autoUpdate = t, !this._autoUpdate && this._isConnectedToTicker ? (rr.shared.remove(this.update, this), this._isConnectedToTicker = !1) : this._autoUpdate && !this._isConnectedToTicker && this._isSourcePlaying() && (rr.shared.add(this.update, this), this._isConnectedToTicker = !0))
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "updateFPS", {
            get: function () {
                return this._updateFPS
            }, set: function (t) {
                t !== this._updateFPS && (this._updateFPS = t)
            }, enumerable: !1, configurable: !0
        }), e.test = function (t, r) {
            return self.HTMLVideoElement && t instanceof HTMLVideoElement || e.TYPES.indexOf(r) > -1
        }, e.TYPES = ["mp4", "m4v", "webm", "ogg", "ogv", "h264", "avi", "mov"], e.MIME_TYPES = {ogv: "video/ogg", mov: "video/quicktime", m4v: "video/mp4"}, e
    }(Ar), Mr = function (t) {
        function e(e) {
            return t.call(this, e) || this
        }

        return vr(e, t), e.test = function (t) {
            return !!self.createImageBitmap && t instanceof ImageBitmap
        }, e
    }(Ar);
    pr.push(Rr, Mr, Sr, Ir, Pr, gr, Or, xr);
    var wr = {
        __proto__: null,
        Resource: yr,
        BaseImageResource: Ar,
        INSTALLED: pr,
        autoDetectResource: _r,
        AbstractMultiResource: br,
        ArrayResource: xr,
        BufferResource: gr,
        CanvasResource: Sr,
        CubeResource: Or,
        ImageResource: Rr,
        SVGResource: Pr,
        VideoResource: Ir,
        ImageBitmapResource: Mr
    }, Dr = function () {
        function t(t) {
            this.renderer = t
        }

        return t.prototype.destroy = function () {
            this.renderer = null
        }, t
    }(), Cr = function (e) {
        function r() {
            return null !== e && e.apply(this, arguments) || this
        }

        return vr(r, e), r.prototype.upload = function (e, r, i) {
            var n = e.gl;
            n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, r.alphaMode === t.ALPHA_MODES.UNPACK);
            var o = r.realWidth, s = r.realHeight;
            return i.width === o && i.height === s ? n.texSubImage2D(r.target, 0, 0, 0, o, s, r.format, r.type, this.data) : (i.width = o, i.height = s, n.texImage2D(r.target, 0, 1 === e.context.webGLVersion ? n.DEPTH_COMPONENT : n.DEPTH_COMPONENT16, o, s, 0, r.format, r.type, this.data)), !0
        }, r
    }(gr), Nr = function () {
        function e(e, r) {
            this.width = Math.ceil(e || 100), this.height = Math.ceil(r || 100), this.stencil = !1, this.depth = !1, this.dirtyId = 0, this.dirtyFormat = 0, this.dirtySize = 0, this.depthTexture = null, this.colorTextures = [], this.glFramebuffers = {}, this.disposeRunner = new fr("disposeFramebuffer"), this.multisample = t.MSAA_QUALITY.NONE
        }

        return Object.defineProperty(e.prototype, "colorTexture", {
            get: function () {
                return this.colorTextures[0]
            }, enumerable: !1, configurable: !0
        }), e.prototype.addColorTexture = function (e, r) {
            return void 0 === e && (e = 0), this.colorTextures[e] = r || new Tr(null, {
                scaleMode: t.SCALE_MODES.NEAREST,
                resolution: 1,
                mipmap: t.MIPMAP_MODES.OFF,
                width: this.width,
                height: this.height
            }), this.dirtyId++, this.dirtyFormat++, this
        }, e.prototype.addDepthTexture = function (e) {
            return this.depthTexture = e || new Tr(new Cr(null, {width: this.width, height: this.height}), {
                scaleMode: t.SCALE_MODES.NEAREST,
                resolution: 1,
                width: this.width,
                height: this.height,
                mipmap: t.MIPMAP_MODES.OFF,
                format: t.FORMATS.DEPTH_COMPONENT,
                type: t.TYPES.UNSIGNED_SHORT
            }), this.dirtyId++, this.dirtyFormat++, this
        }, e.prototype.enableDepth = function () {
            return this.depth = !0, this.dirtyId++, this.dirtyFormat++, this
        }, e.prototype.enableStencil = function () {
            return this.stencil = !0, this.dirtyId++, this.dirtyFormat++, this
        }, e.prototype.resize = function (t, e) {
            if (t = Math.ceil(t), e = Math.ceil(e), t !== this.width || e !== this.height) {
                this.width = t, this.height = e, this.dirtyId++, this.dirtySize++;
                for (var r = 0; r < this.colorTextures.length; r++) {
                    var i = this.colorTextures[r], n = i.resolution;
                    i.setSize(t / n, e / n)
                }
                this.depthTexture && (n = this.depthTexture.resolution, this.depthTexture.setSize(t / n, e / n))
            }
        }, e.prototype.dispose = function () {
            this.disposeRunner.emit(this, !1)
        }, e.prototype.destroyDepthTexture = function () {
            this.depthTexture && (this.depthTexture.destroy(), this.depthTexture = null, ++this.dirtyId, ++this.dirtyFormat)
        }, e
    }(), Lr = function (t) {
        function e(e) {
            var r = this;
            "number" == typeof e && (e = {width: arguments[0], height: arguments[1], scaleMode: arguments[2], resolution: arguments[3]}), r = t.call(this, null, e) || this;
            var i = e || {}, n = i.width, o = i.height;
            return r.mipmap = 0, r.width = Math.ceil(n) || 100, r.height = Math.ceil(o) || 100, r.valid = !0, r.clearColor = [0, 0, 0, 0], r.framebuffer = new Nr(r.width * r.resolution, r.height * r.resolution).addColorTexture(0, r), r.maskStack = [], r.filterStack = [{}], r
        }

        return vr(e, t), e.prototype.resize = function (t, e) {
            t = Math.ceil(t), e = Math.ceil(e), this.framebuffer.resize(t * this.resolution, e * this.resolution)
        }, e.prototype.dispose = function () {
            this.framebuffer.dispose(), t.prototype.dispose.call(this)
        }, e.prototype.destroy = function () {
            t.prototype.destroy.call(this), this.framebuffer.destroyDepthTexture(), this.framebuffer = null
        }, e
    }(Tr), Fr = function () {
        function t() {
            this.x0 = 0, this.y0 = 0, this.x1 = 1, this.y1 = 0, this.x2 = 1, this.y2 = 1, this.x3 = 0, this.y3 = 1, this.uvsFloat32 = new Float32Array(8)
        }

        return t.prototype.set = function (t, e, r) {
            var i = e.width, n = e.height;
            if (r) {
                var o = t.width / 2 / i, s = t.height / 2 / n, a = t.x / i + o, h = t.y / n + s;
                r = Xe.add(r, Xe.NW), this.x0 = a + o * Xe.uX(r), this.y0 = h + s * Xe.uY(r), r = Xe.add(r, 2), this.x1 = a + o * Xe.uX(r), this.y1 = h + s * Xe.uY(r), r = Xe.add(r, 2), this.x2 = a + o * Xe.uX(r), this.y2 = h + s * Xe.uY(r), r = Xe.add(r, 2), this.x3 = a + o * Xe.uX(r), this.y3 = h + s * Xe.uY(r)
            } else this.x0 = t.x / i, this.y0 = t.y / n, this.x1 = (t.x + t.width) / i, this.y1 = t.y / n, this.x2 = (t.x + t.width) / i, this.y2 = (t.y + t.height) / n, this.x3 = t.x / i, this.y3 = (t.y + t.height) / n;
            this.uvsFloat32[0] = this.x0, this.uvsFloat32[1] = this.y0, this.uvsFloat32[2] = this.x1, this.uvsFloat32[3] = this.y1, this.uvsFloat32[4] = this.x2, this.uvsFloat32[5] = this.y2, this.uvsFloat32[6] = this.x3, this.uvsFloat32[7] = this.y3
        }, t
    }(), Br = new Fr, Ur = function (t) {
        function e(r, i, n, o, s, a) {
            var h = t.call(this) || this;
            if (h.noFrame = !1, i || (h.noFrame = !0, i = new Se(0, 0, 1, 1)), r instanceof e && (r = r.baseTexture), h.baseTexture = r, h._frame = i, h.trim = o, h.valid = !1, h._uvs = Br, h.uvMatrix = null, h.orig = n || i, h._rotate = Number(s || 0), !0 === s) h._rotate = 2; else if (h._rotate % 2 != 0) throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
            return h.defaultAnchor = a ? new Me(a.x, a.y) : new Me(0, 0), h._updateID = 0, h.textureCacheIds = [], r.valid ? h.noFrame ? r.valid && h.onBaseTextureUpdated(r) : h.frame = i : r.once("loaded", h.onBaseTextureUpdated, h), h.noFrame && r.on("update", h.onBaseTextureUpdated, h), h
        }

        return vr(e, t), e.prototype.update = function () {
            this.baseTexture.resource && this.baseTexture.resource.update()
        }, e.prototype.onBaseTextureUpdated = function (t) {
            if (this.noFrame) {
                if (!this.baseTexture.valid) return;
                this._frame.width = t.width, this._frame.height = t.height, this.valid = !0, this.updateUvs()
            } else this.frame = this._frame;
            this.emit("update", this)
        }, e.prototype.destroy = function (t) {
            if (this.baseTexture) {
                if (t) {
                    var r = this.baseTexture.resource;
                    r && r.url && fe[r.url] && e.removeFromCache(r.url), this.baseTexture.destroy()
                }
                this.baseTexture.off("loaded", this.onBaseTextureUpdated, this), this.baseTexture.off("update", this.onBaseTextureUpdated, this), this.baseTexture = null
            }
            this._frame = null, this._uvs = null, this.trim = null, this.orig = null, this.valid = !1, e.removeFromCache(this), this.textureCacheIds = null
        }, e.prototype.clone = function () {
            var t = this._frame.clone(), r = this._frame === this.orig ? t : this.orig.clone(),
                i = new e(this.baseTexture, !this.noFrame && t, r, this.trim && this.trim.clone(), this.rotate, this.defaultAnchor);
            return this.noFrame && (i._frame = t), i
        }, e.prototype.updateUvs = function () {
            this._uvs === Br && (this._uvs = new Fr), this._uvs.set(this._frame, this.baseTexture, this.rotate), this._updateID++
        }, e.from = function (t, r, i) {
            void 0 === r && (r = {}), void 0 === i && (i = B.STRICT_TEXTURE_CACHE);
            var n = "string" == typeof t, o = null;
            if (n) o = t; else {
                if (!t._pixiId) {
                    var s = r && r.pixiIdPrefix || "pixiid";
                    t._pixiId = s + "_" + le()
                }
                o = t._pixiId
            }
            var a = fe[o];
            if (n && i && !a) throw new Error('The cacheId "' + o + '" does not exist in TextureCache.');
            return a || (r.resolution || (r.resolution = Ee(t)), (a = new e(new Tr(t, r))).baseTexture.cacheId = o, Tr.addToCache(a.baseTexture, o), e.addToCache(a, o)), a
        }, e.fromURL = function (t, r) {
            var i = Object.assign({autoLoad: !1}, null == r ? void 0 : r.resourceOptions), n = e.from(t, Object.assign({resourceOptions: i}, r), !1), o = n.baseTexture.resource;
            return n.baseTexture.valid ? Promise.resolve(n) : o.load().then(function () {
                return Promise.resolve(n)
            })
        }, e.fromBuffer = function (t, r, i, n) {
            return new e(Tr.fromBuffer(t, r, i, n))
        }, e.fromLoader = function (t, r, i, n) {
            var o = new Tr(t, Object.assign({scaleMode: B.SCALE_MODE, resolution: Ee(r)}, n)), s = o.resource;
            s instanceof Rr && (s.url = r);
            var a = new e(o);
            return i || (i = r), Tr.addToCache(a.baseTexture, i), e.addToCache(a, i), i !== r && (Tr.addToCache(a.baseTexture, r), e.addToCache(a, r)), a.baseTexture.valid ? Promise.resolve(a) : new Promise(function (t) {
                a.baseTexture.once("loaded", function () {
                    return t(a)
                })
            })
        }, e.addToCache = function (t, e) {
            e && (-1 === t.textureCacheIds.indexOf(e) && t.textureCacheIds.push(e), fe[e] && console.warn("Texture added to the cache with an id [" + e + "] that already had an entry"), fe[e] = t)
        }, e.removeFromCache = function (t) {
            if ("string" == typeof t) {
                var e = fe[t];
                if (e) {
                    var r = e.textureCacheIds.indexOf(t);
                    return r > -1 && e.textureCacheIds.splice(r, 1), delete fe[t], e
                }
            } else if (t && t.textureCacheIds) {
                for (var i = 0; i < t.textureCacheIds.length; ++i) fe[t.textureCacheIds[i]] === t && delete fe[t.textureCacheIds[i]];
                return t.textureCacheIds.length = 0, t
            }
            return null
        }, Object.defineProperty(e.prototype, "resolution", {
            get: function () {
                return this.baseTexture.resolution
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "frame", {
            get: function () {
                return this._frame
            }, set: function (t) {
                this._frame = t, this.noFrame = !1;
                var e = t.x, r = t.y, i = t.width, n = t.height, o = e + i > this.baseTexture.width, s = r + n > this.baseTexture.height;
                if (o || s) {
                    var a = o && s ? "and" : "or", h = "X: " + e + " + " + i + " = " + (e + i) + " > " + this.baseTexture.width,
                        u = "Y: " + r + " + " + n + " = " + (r + n) + " > " + this.baseTexture.height;
                    throw new Error("Texture Error: frame does not fit inside the base Texture dimensions: " + h + " " + a + " " + u)
                }
                this.valid = i && n && this.baseTexture.valid, this.trim || this.rotate || (this.orig = t), this.valid && this.updateUvs()
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "rotate", {
            get: function () {
                return this._rotate
            }, set: function (t) {
                this._rotate = t, this.valid && this.updateUvs()
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "width", {
            get: function () {
                return this.orig.width
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "height", {
            get: function () {
                return this.orig.height
            }, enumerable: !1, configurable: !0
        }), e.prototype.castToBaseTexture = function () {
            return this.baseTexture
        }, e
    }(k);

    function Gr(t) {
        t.destroy = function () {
        }, t.on = function () {
        }, t.once = function () {
        }, t.emit = function () {
        }
    }

    Ur.EMPTY = new Ur(new Tr), Gr(Ur.EMPTY), Gr(Ur.EMPTY.baseTexture), Ur.WHITE = function () {
        var t = document.createElement("canvas");
        t.width = 16, t.height = 16;
        var e = t.getContext("2d");
        return e.fillStyle = "white", e.fillRect(0, 0, 16, 16), new Ur(new Tr(new Sr(t)))
    }(), Gr(Ur.WHITE), Gr(Ur.WHITE.baseTexture);
    var Xr = function (t) {
        function e(e, r) {
            var i = t.call(this, e, r) || this;
            return i.valid = !0, i.filterFrame = null, i.filterPoolKey = null, i.updateUvs(), i
        }

        return vr(e, t), Object.defineProperty(e.prototype, "framebuffer", {
            get: function () {
                return this.baseTexture.framebuffer
            }, enumerable: !1, configurable: !0
        }), e.prototype.resize = function (t, e, r) {
            void 0 === r && (r = !0), t = Math.ceil(t), e = Math.ceil(e), this.valid = t > 0 && e > 0, this._frame.width = this.orig.width = t, this._frame.height = this.orig.height = e, r && this.baseTexture.resize(t, e), this.updateUvs()
        }, e.prototype.setResolution = function (t) {
            var e = this.baseTexture;
            e.resolution !== t && (e.setResolution(t), this.resize(e.width, e.height, !1))
        }, e.create = function (t) {
            for (var r = arguments, i = [], n = 1; n < arguments.length; n++) i[n - 1] = r[n];
            return "number" == typeof t && (t = {width: t, height: i[0], scaleMode: i[1], resolution: i[2]}), new e(new Lr(t))
        }, e
    }(Ur), kr = function () {
        function t(t) {
            this.texturePool = {}, this.textureOptions = t || {}, this.enableFullScreen = !1, this._pixelsWidth = 0, this._pixelsHeight = 0
        }

        return t.prototype.createTexture = function (t, e) {
            var r = new Lr(Object.assign({width: t, height: e, resolution: 1}, this.textureOptions));
            return new Xr(r)
        }, t.prototype.getOptimalTexture = function (e, r, i) {
            void 0 === i && (i = 1);
            var n = t.SCREEN_KEY;
            e *= i, r *= i, this.enableFullScreen && e === this._pixelsWidth && r === this._pixelsHeight || (n = (65535 & (e = ne(e))) << 16 | 65535 & (r = ne(r))), this.texturePool[n] || (this.texturePool[n] = []);
            var o = this.texturePool[n].pop();
            return o || (o = this.createTexture(e, r)), o.filterPoolKey = n, o.setResolution(i), o
        }, t.prototype.getFilterTexture = function (t, e) {
            var r = this.getOptimalTexture(t.width, t.height, e || t.resolution);
            return r.filterFrame = t.filterFrame, r
        }, t.prototype.returnTexture = function (t) {
            var e = t.filterPoolKey;
            t.filterFrame = null, this.texturePool[e].push(t)
        }, t.prototype.returnFilterTexture = function (t) {
            this.returnTexture(t)
        }, t.prototype.clear = function (t) {
            if (t = !1 !== t) for (var e in this.texturePool) {
                var r = this.texturePool[e];
                if (r) for (var i = 0; i < r.length; i++) r[i].destroy(!0)
            }
            this.texturePool = {}
        }, t.prototype.setScreenSize = function (e) {
            if (e.width !== this._pixelsWidth || e.height !== this._pixelsHeight) {
                var r = t.SCREEN_KEY, i = this.texturePool[r];
                if (this.enableFullScreen = e.width > 0 && e.height > 0, i) for (var n = 0; n < i.length; n++) i[n].destroy(!0);
                this.texturePool[r] = [], this._pixelsWidth = e.width, this._pixelsHeight = e.height
            }
        }, t.SCREEN_KEY = "screen", t
    }(), jr = function () {
        function t(t, e, r, i, n, o, s) {
            void 0 === e && (e = 0), void 0 === r && (r = !1), void 0 === i && (i = 5126), this.buffer = t, this.size = e, this.normalized = r, this.type = i, this.stride = n, this.start = o, this.instance = s
        }

        return t.prototype.destroy = function () {
            this.buffer = null
        }, t.from = function (e, r, i, n, o) {
            return new t(e, r, i, n, o)
        }, t
    }(), Hr = 0, Yr = function () {
        function t(t, e, r) {
            void 0 === e && (e = !0), void 0 === r && (r = !1), this.data = t || new Float32Array(1), this._glBuffers = {}, this._updateID = 0, this.index = r, this.static = e, this.id = Hr++, this.disposeRunner = new fr("disposeBuffer")
        }

        return t.prototype.update = function (t) {
            this.data = t || this.data, this._updateID++
        }, t.prototype.dispose = function () {
            this.disposeRunner.emit(this, !1)
        }, t.prototype.destroy = function () {
            this.dispose(), this.data = null
        }, t.from = function (e) {
            return e instanceof Array && (e = new Float32Array(e)), new t(e)
        }, t
    }();

    function Vr(t) {
        if (4 === t.BYTES_PER_ELEMENT) return t instanceof Float32Array ? "Float32Array" : t instanceof Uint32Array ? "Uint32Array" : "Int32Array";
        if (2 === t.BYTES_PER_ELEMENT) {
            if (t instanceof Uint16Array) return "Uint16Array"
        } else if (1 === t.BYTES_PER_ELEMENT && t instanceof Uint8Array) return "Uint8Array";
        return null
    }

    var zr = {Float32Array: Float32Array, Uint32Array: Uint32Array, Int32Array: Int32Array, Uint8Array: Uint8Array}, Wr = {5126: 4, 5123: 2, 5121: 1}, qr = 0,
        Kr = {Float32Array: Float32Array, Uint32Array: Uint32Array, Int32Array: Int32Array, Uint8Array: Uint8Array, Uint16Array: Uint16Array}, Zr = function () {
            function t(t, e) {
                void 0 === t && (t = []), void 0 === e && (e = {}), this.buffers = t, this.indexBuffer = null, this.attributes = e, this.glVertexArrayObjects = {}, this.id = qr++, this.instanced = !1, this.instanceCount = 1, this.disposeRunner = new fr("disposeGeometry"), this.refCount = 0
            }

            return t.prototype.addAttribute = function (t, e, r, i, n, o, s, a) {
                if (void 0 === r && (r = 0), void 0 === i && (i = !1), void 0 === a && (a = !1), !e) throw new Error("You must pass a buffer when creating an attribute");
                e instanceof Yr || (e instanceof Array && (e = new Float32Array(e)), e = new Yr(e));
                var h = t.split("|");
                if (h.length > 1) {
                    for (var u = 0; u < h.length; u++) this.addAttribute(h[u], e, r, i, n);
                    return this
                }
                var l = this.buffers.indexOf(e);
                return -1 === l && (this.buffers.push(e), l = this.buffers.length - 1), this.attributes[t] = new jr(l, r, i, n, o, s, a), this.instanced = this.instanced || a, this
            }, t.prototype.getAttribute = function (t) {
                return this.attributes[t]
            }, t.prototype.getBuffer = function (t) {
                return this.buffers[this.getAttribute(t).buffer]
            }, t.prototype.addIndex = function (t) {
                return t instanceof Yr || (t instanceof Array && (t = new Uint16Array(t)), t = new Yr(t)), t.index = !0, this.indexBuffer = t, -1 === this.buffers.indexOf(t) && this.buffers.push(t), this
            }, t.prototype.getIndex = function () {
                return this.indexBuffer
            }, t.prototype.interleave = function () {
                if (1 === this.buffers.length || 2 === this.buffers.length && this.indexBuffer) return this;
                var t, e = [], r = [], i = new Yr;
                for (t in this.attributes) {
                    var n = this.attributes[t], o = this.buffers[n.buffer];
                    e.push(o.data), r.push(n.size * Wr[n.type] / 4), n.buffer = 0
                }
                for (i.data = function (t, e) {
                    for (var r = 0, i = 0, n = {}, o = 0; o < t.length; o++) i += e[o], r += t[o].length;
                    var s = new ArrayBuffer(4 * r), a = null, h = 0;
                    for (o = 0; o < t.length; o++) {
                        var u = e[o], l = t[o], c = Vr(l);
                        n[c] || (n[c] = new zr[c](s)), a = n[c];
                        for (var d = 0; d < l.length; d++) a[(d / u | 0) * i + h + d % u] = l[d];
                        h += u
                    }
                    return new Float32Array(s)
                }(e, r), t = 0; t < this.buffers.length; t++) this.buffers[t] !== this.indexBuffer && this.buffers[t].destroy();
                return this.buffers = [i], this.indexBuffer && this.buffers.push(this.indexBuffer), this
            }, t.prototype.getSize = function () {
                for (var t in this.attributes) {
                    var e = this.attributes[t];
                    return this.buffers[e.buffer].data.length / (e.stride / 4 || e.size)
                }
                return 0
            }, t.prototype.dispose = function () {
                this.disposeRunner.emit(this, !1)
            }, t.prototype.destroy = function () {
                this.dispose(), this.buffers = null, this.indexBuffer = null, this.attributes = null
            }, t.prototype.clone = function () {
                for (var e = new t, r = 0; r < this.buffers.length; r++) e.buffers[r] = new Yr(this.buffers[r].data.slice(0));
                for (var r in this.attributes) {
                    var i = this.attributes[r];
                    e.attributes[r] = new jr(i.buffer, i.size, i.normalized, i.type, i.stride, i.start, i.instance)
                }
                return this.indexBuffer && (e.indexBuffer = e.buffers[this.buffers.indexOf(this.indexBuffer)], e.indexBuffer.index = !0), e
            }, t.merge = function (e) {
                for (var r, i = new t, n = [], o = [], s = [], a = 0; a < e.length; a++) {
                    r = e[a];
                    for (var h = 0; h < r.buffers.length; h++) o[h] = o[h] || 0, o[h] += r.buffers[h].data.length, s[h] = 0
                }
                for (a = 0; a < r.buffers.length; a++) n[a] = new (Kr[Vr(r.buffers[a].data)])(o[a]), i.buffers[a] = new Yr(n[a]);
                for (a = 0; a < e.length; a++) for (r = e[a], h = 0; h < r.buffers.length; h++) n[h].set(r.buffers[h].data, s[h]), s[h] += r.buffers[h].data.length;
                if (i.attributes = r.attributes, r.indexBuffer) {
                    i.indexBuffer = i.buffers[r.buffers.indexOf(r.indexBuffer)], i.indexBuffer.index = !0;
                    var u = 0, l = 0, c = 0, d = 0;
                    for (a = 0; a < r.buffers.length; a++) if (r.buffers[a] !== r.indexBuffer) {
                        d = a;
                        break
                    }
                    for (var a in r.attributes) {
                        var f = r.attributes[a];
                        (0 | f.buffer) === d && (l += f.size * Wr[f.type] / 4)
                    }
                    for (a = 0; a < e.length; a++) {
                        var p = e[a].indexBuffer.data;
                        for (h = 0; h < p.length; h++) i.indexBuffer.data[h + c] += u;
                        u += r.buffers[d].data.length / l, c += p.length
                    }
                }
                return i
            }, t
        }(), Jr = function (t) {
            function e() {
                var e = t.call(this) || this;
                return e.addAttribute("aVertexPosition", new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])).addIndex([0, 1, 3, 2]), e
            }

            return vr(e, t), e
        }(Zr), Qr = function (t) {
            function e() {
                var e = t.call(this) || this;
                return e.vertices = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]), e.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), e.vertexBuffer = new Yr(e.vertices), e.uvBuffer = new Yr(e.uvs), e.addAttribute("aVertexPosition", e.vertexBuffer).addAttribute("aTextureCoord", e.uvBuffer).addIndex([0, 1, 2, 0, 2, 3]), e
            }

            return vr(e, t), e.prototype.map = function (t, e) {
                var r = 0, i = 0;
                return this.uvs[0] = r, this.uvs[1] = i, this.uvs[2] = r + e.width / t.width, this.uvs[3] = i, this.uvs[4] = r + e.width / t.width, this.uvs[5] = i + e.height / t.height, this.uvs[6] = r, this.uvs[7] = i + e.height / t.height, r = e.x, i = e.y, this.vertices[0] = r, this.vertices[1] = i, this.vertices[2] = r + e.width, this.vertices[3] = i, this.vertices[4] = r + e.width, this.vertices[5] = i + e.height, this.vertices[6] = r, this.vertices[7] = i + e.height, this.invalidate(), this
            }, e.prototype.invalidate = function () {
                return this.vertexBuffer._updateID++, this.uvBuffer._updateID++, this
            }, e
        }(Zr), $r = 0, ti = function () {
            function t(t, e) {
                this.uniforms = t, this.group = !0, this.syncUniforms = {}, this.dirtyId = 0, this.id = $r++, this.static = !!e
            }

            return t.prototype.update = function () {
                this.dirtyId++
            }, t.prototype.add = function (e, r, i) {
                this.uniforms[e] = new t(r, i)
            }, t.from = function (e, r) {
                return new t(e, r)
            }, t
        }(), ei = function () {
            function t() {
                this.renderTexture = null, this.target = null, this.legacy = !1, this.resolution = 1, this.sourceFrame = new Se, this.destinationFrame = new Se, this.bindingSourceFrame = new Se, this.bindingDestinationFrame = new Se, this.filters = [], this.transform = null
            }

            return t.prototype.clear = function () {
                this.target = null, this.filters = null, this.renderTexture = null
            }, t
        }(), ri = [new Me, new Me, new Me, new Me], ii = new De, ni = function (e) {
            function r(t) {
                var r = e.call(this, t) || this;
                return r.defaultFilterStack = [{}], r.texturePool = new kr, r.texturePool.setScreenSize(t.view), r.statePool = [], r.quad = new Jr, r.quadUv = new Qr, r.tempRect = new Se, r.activeState = {}, r.globalUniforms = new ti({
                    outputFrame: new Se,
                    inputSize: new Float32Array(4),
                    inputPixel: new Float32Array(4),
                    inputClamp: new Float32Array(4),
                    resolution: 1,
                    filterArea: new Float32Array(4),
                    filterClamp: new Float32Array(4)
                }, !0), r.forceClear = !1, r.useMaxPadding = !1, r
            }

            return vr(r, e), r.prototype.push = function (t, e) {
                for (var r = this.renderer, i = this.defaultFilterStack, n = this.statePool.pop() || new ei, o = this.renderer.renderTexture, s = e[0].resolution, a = e[0].padding, h = e[0].autoFit, u = e[0].legacy, l = 1; l < e.length; l++) {
                    var c = e[l];
                    s = Math.min(s, c.resolution), a = this.useMaxPadding ? Math.max(a, c.padding) : a + c.padding, h = h && c.autoFit, u = u || c.legacy
                }
                if (1 === i.length && (this.defaultFilterStack[0].renderTexture = o.current), i.push(n), n.resolution = s, n.legacy = u, n.target = t, n.sourceFrame.copyFrom(t.filterArea || t.getBounds(!0)), n.sourceFrame.pad(a), h) {
                    var d = this.tempRect.copyFrom(o.sourceFrame);
                    r.projection.transform && this.transformAABB(ii.copyFrom(r.projection.transform).invert(), d), n.sourceFrame.fit(d)
                }
                this.roundFrame(n.sourceFrame, o.current ? o.current.resolution : r.resolution, o.sourceFrame, o.destinationFrame, r.projection.transform), n.renderTexture = this.getOptimalFilterTexture(n.sourceFrame.width, n.sourceFrame.height, s), n.filters = e, n.destinationFrame.width = n.renderTexture.width, n.destinationFrame.height = n.renderTexture.height;
                var f = this.tempRect;
                f.x = 0, f.y = 0, f.width = n.sourceFrame.width, f.height = n.sourceFrame.height, n.renderTexture.filterFrame = n.sourceFrame, n.bindingSourceFrame.copyFrom(o.sourceFrame), n.bindingDestinationFrame.copyFrom(o.destinationFrame), n.transform = r.projection.transform, r.projection.transform = null, o.bind(n.renderTexture, n.sourceFrame, f), r.framebuffer.clear(0, 0, 0, 0)
            }, r.prototype.pop = function () {
                var e = this.defaultFilterStack, r = e.pop(), i = r.filters;
                this.activeState = r;
                var n = this.globalUniforms.uniforms;
                n.outputFrame = r.sourceFrame, n.resolution = r.resolution;
                var o = n.inputSize, s = n.inputPixel, a = n.inputClamp;
                if (o[0] = r.destinationFrame.width, o[1] = r.destinationFrame.height, o[2] = 1 / o[0], o[3] = 1 / o[1], s[0] = o[0] * r.resolution, s[1] = o[1] * r.resolution, s[2] = 1 / s[0], s[3] = 1 / s[1], a[0] = .5 * s[2], a[1] = .5 * s[3], a[2] = r.sourceFrame.width * o[2] - .5 * s[2], a[3] = r.sourceFrame.height * o[3] - .5 * s[3], r.legacy) {
                    var h = n.filterArea;
                    h[0] = r.destinationFrame.width, h[1] = r.destinationFrame.height, h[2] = r.sourceFrame.x, h[3] = r.sourceFrame.y, n.filterClamp = n.inputClamp
                }
                this.globalUniforms.update();
                var u = e[e.length - 1];
                if (r.renderTexture.framebuffer.multisample > 1 && this.renderer.framebuffer.blit(), 1 === i.length) i[0].apply(this, r.renderTexture, u.renderTexture, t.CLEAR_MODES.BLEND, r), this.returnFilterTexture(r.renderTexture); else {
                    var l = r.renderTexture, c = this.getOptimalFilterTexture(l.width, l.height, r.resolution);
                    c.filterFrame = l.filterFrame;
                    var d = 0;
                    for (d = 0; d < i.length - 1; ++d) {
                        i[d].apply(this, l, c, t.CLEAR_MODES.CLEAR, r);
                        var f = l;
                        l = c, c = f
                    }
                    i[d].apply(this, l, u.renderTexture, t.CLEAR_MODES.BLEND, r), this.returnFilterTexture(l), this.returnFilterTexture(c)
                }
                r.clear(), this.statePool.push(r)
            }, r.prototype.bindAndClear = function (e, r) {
                void 0 === r && (r = t.CLEAR_MODES.CLEAR);
                var i = this.renderer, n = i.renderTexture, o = i.state;
                if (e === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? this.renderer.projection.transform = this.activeState.transform : this.renderer.projection.transform = null, e && e.filterFrame) {
                    var s = this.tempRect;
                    s.x = 0, s.y = 0, s.width = e.filterFrame.width, s.height = e.filterFrame.height, n.bind(e, e.filterFrame, s)
                } else e !== this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? n.bind(e) : this.renderer.renderTexture.bind(e, this.activeState.bindingSourceFrame, this.activeState.bindingDestinationFrame);
                var a = 1 & o.stateId || this.forceClear;
                (r === t.CLEAR_MODES.CLEAR || r === t.CLEAR_MODES.BLIT && a) && this.renderer.framebuffer.clear(0, 0, 0, 0)
            }, r.prototype.applyFilter = function (e, r, i, n) {
                var o = this.renderer;
                o.state.set(e.state), this.bindAndClear(i, n), e.uniforms.uSampler = r, e.uniforms.filterGlobals = this.globalUniforms, o.shader.bind(e), e.legacy ? (this.quadUv.map(r._frame, r.filterFrame), o.geometry.bind(this.quadUv), o.geometry.draw(t.DRAW_MODES.TRIANGLES)) : (o.geometry.bind(this.quad), o.geometry.draw(t.DRAW_MODES.TRIANGLE_STRIP))
            }, r.prototype.calculateSpriteMatrix = function (t, e) {
                var r = this.activeState, i = r.sourceFrame, n = r.destinationFrame, o = e._texture.orig, s = t.set(n.width, 0, 0, n.height, i.x, i.y),
                    a = e.worldTransform.copyTo(De.TEMP_MATRIX);
                return a.invert(), s.prepend(a), s.scale(1 / o.width, 1 / o.height), s.translate(e.anchor.x, e.anchor.y), s
            }, r.prototype.destroy = function () {
                this.texturePool.clear(!1)
            }, r.prototype.getOptimalFilterTexture = function (t, e, r) {
                return void 0 === r && (r = 1), this.texturePool.getOptimalTexture(t, e, r)
            }, r.prototype.getFilterTexture = function (t, e) {
                if ("number" == typeof t) {
                    var r = t;
                    t = e, e = r
                }
                t = t || this.activeState.renderTexture;
                var i = this.texturePool.getOptimalTexture(t.width, t.height, e || t.resolution);
                return i.filterFrame = t.filterFrame, i
            }, r.prototype.returnFilterTexture = function (t) {
                this.texturePool.returnTexture(t)
            }, r.prototype.emptyPool = function () {
                this.texturePool.clear(!0)
            }, r.prototype.resize = function () {
                this.texturePool.setScreenSize(this.renderer.view)
            }, r.prototype.transformAABB = function (t, e) {
                var r = ri[0], i = ri[1], n = ri[2], o = ri[3];
                r.set(e.left, e.top), i.set(e.left, e.bottom), n.set(e.right, e.top), o.set(e.right, e.bottom), t.apply(r, r), t.apply(i, i), t.apply(n, n), t.apply(o, o);
                var s = Math.min(r.x, i.x, n.x, o.x), a = Math.min(r.y, i.y, n.y, o.y), h = Math.max(r.x, i.x, n.x, o.x), u = Math.max(r.y, i.y, n.y, o.y);
                e.x = s, e.y = a, e.width = h - s, e.height = u - a
            }, r.prototype.roundFrame = function (t, e, r, i, n) {
                if (n) {
                    var o = n.a, s = n.b, a = n.c, h = n.d;
                    if (!(0 === s && 0 === a || 0 === o && 0 === h)) return
                }
                (n = n ? ii.copyFrom(n) : ii.identity()).translate(-r.x, -r.y).scale(i.width / r.width, i.height / r.height).translate(i.x, i.y), this.transformAABB(n, t), t.ceil(e), this.transformAABB(n.invert(), t)
            }, r
        }(Dr), oi = function () {
            function t(t) {
                this.renderer = t
            }

            return t.prototype.flush = function () {
            }, t.prototype.destroy = function () {
                this.renderer = null
            }, t.prototype.start = function () {
            }, t.prototype.stop = function () {
                this.flush()
            }, t.prototype.render = function (t) {
            }, t
        }(), si = function (t) {
            function e(e) {
                var r = t.call(this, e) || this;
                return r.emptyRenderer = new oi(e), r.currentRenderer = r.emptyRenderer, r
            }

            return vr(e, t), e.prototype.setObjectRenderer = function (t) {
                this.currentRenderer !== t && (this.currentRenderer.stop(), this.currentRenderer = t, this.currentRenderer.start())
            }, e.prototype.flush = function () {
                this.setObjectRenderer(this.emptyRenderer)
            }, e.prototype.reset = function () {
                this.setObjectRenderer(this.emptyRenderer)
            }, e.prototype.copyBoundTextures = function (t, e) {
                for (var r = this.renderer.texture.boundTextures, i = e - 1; i >= 0; --i) t[i] = r[i] || null, t[i] && (t[i]._batchLocation = i)
            }, e.prototype.boundArray = function (t, e, r, i) {
                for (var n = t.elements, o = t.ids, s = t.count, a = 0, h = 0; h < s; h++) {
                    var u = n[h], l = u._batchLocation;
                    if (l >= 0 && l < i && e[l] === u) o[h] = l; else for (; a < i;) {
                        var c = e[a];
                        if (!c || c._batchEnabled !== r || c._batchLocation !== a) {
                            o[h] = a, u._batchLocation = a, e[a] = u;
                            break
                        }
                        a++
                    }
                }
            }, e
        }(Dr), ai = 0, hi = function (e) {
            function r(t) {
                var r = e.call(this, t) || this;
                return r.webGLVersion = 1, r.extensions = {}, r.supports = {uint32Indices: !1}, r.handleContextLost = r.handleContextLost.bind(r), r.handleContextRestored = r.handleContextRestored.bind(r), t.view.addEventListener("webglcontextlost", r.handleContextLost, !1), t.view.addEventListener("webglcontextrestored", r.handleContextRestored, !1), r
            }

            return vr(r, e), Object.defineProperty(r.prototype, "isLost", {
                get: function () {
                    return !this.gl || this.gl.isContextLost()
                }, enumerable: !1, configurable: !0
            }), r.prototype.contextChange = function (t) {
                this.gl = t, this.renderer.gl = t, this.renderer.CONTEXT_UID = ai++, t.isContextLost() && t.getExtension("WEBGL_lose_context") && t.getExtension("WEBGL_lose_context").restoreContext()
            }, r.prototype.initFromContext = function (t) {
                this.gl = t, this.validateContext(t), this.renderer.gl = t, this.renderer.CONTEXT_UID = ai++, this.renderer.runners.contextChange.emit(t)
            }, r.prototype.initFromOptions = function (t) {
                var e = this.createContext(this.renderer.view, t);
                this.initFromContext(e)
            }, r.prototype.createContext = function (e, r) {
                var i;
                if (B.PREFER_ENV >= t.ENV.WEBGL2 && (i = e.getContext("webgl2", r)), i) this.webGLVersion = 2; else if (this.webGLVersion = 1, !(i = e.getContext("webgl", r) || e.getContext("experimental-webgl", r))) throw new Error("This browser does not support WebGL. Try using the canvas renderer");
                return this.gl = i, this.getExtensions(), this.gl
            }, r.prototype.getExtensions = function () {
                var t = this.gl, e = {
                    anisotropicFiltering: t.getExtension("EXT_texture_filter_anisotropic"),
                    floatTextureLinear: t.getExtension("OES_texture_float_linear"),
                    s3tc: t.getExtension("WEBGL_compressed_texture_s3tc"),
                    s3tc_sRGB: t.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
                    etc: t.getExtension("WEBGL_compressed_texture_etc"),
                    etc1: t.getExtension("WEBGL_compressed_texture_etc1"),
                    pvrtc: t.getExtension("WEBGL_compressed_texture_pvrtc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
                    atc: t.getExtension("WEBGL_compressed_texture_atc"),
                    astc: t.getExtension("WEBGL_compressed_texture_astc")
                };
                1 === this.webGLVersion ? Object.assign(this.extensions, e, {
                    drawBuffers: t.getExtension("WEBGL_draw_buffers"),
                    depthTexture: t.getExtension("WEBGL_depth_texture"),
                    loseContext: t.getExtension("WEBGL_lose_context"),
                    vertexArrayObject: t.getExtension("OES_vertex_array_object") || t.getExtension("MOZ_OES_vertex_array_object") || t.getExtension("WEBKIT_OES_vertex_array_object"),
                    uint32ElementIndex: t.getExtension("OES_element_index_uint"),
                    floatTexture: t.getExtension("OES_texture_float"),
                    floatTextureLinear: t.getExtension("OES_texture_float_linear"),
                    textureHalfFloat: t.getExtension("OES_texture_half_float"),
                    textureHalfFloatLinear: t.getExtension("OES_texture_half_float_linear")
                }) : 2 === this.webGLVersion && Object.assign(this.extensions, e, {colorBufferFloat: t.getExtension("EXT_color_buffer_float")})
            }, r.prototype.handleContextLost = function (t) {
                t.preventDefault()
            }, r.prototype.handleContextRestored = function () {
                this.renderer.runners.contextChange.emit(this.gl)
            }, r.prototype.destroy = function () {
                var t = this.renderer.view;
                t.removeEventListener("webglcontextlost", this.handleContextLost), t.removeEventListener("webglcontextrestored", this.handleContextRestored), this.gl.useProgram(null), this.extensions.loseContext && this.extensions.loseContext.loseContext()
            }, r.prototype.postrender = function () {
                this.renderer.renderingToScreen && this.gl.flush()
            }, r.prototype.validateContext = function (t) {
                var e = t.getContextAttributes(), r = "WebGL2RenderingContext" in self && t instanceof self.WebGL2RenderingContext;
                r && (this.webGLVersion = 2), e.stencil || console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");
                var i = r || !!t.getExtension("OES_element_index_uint");
                this.supports.uint32Indices = i, i || console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly")
            }, r
        }(Dr), ui = function (e) {
            this.framebuffer = e, this.stencil = null, this.dirtyId = 0, this.dirtyFormat = 0, this.dirtySize = 0, this.multisample = t.MSAA_QUALITY.NONE, this.msaaBuffer = null, this.blitFramebuffer = null
        }, li = new Se, ci = function (e) {
            function r(t) {
                var r = e.call(this, t) || this;
                return r.managedFramebuffers = [], r.unknownFramebuffer = new Nr(10, 10), r.msaaSamples = null, r
            }

            return vr(r, e), r.prototype.contextChange = function () {
                var e = this.gl = this.renderer.gl;
                if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.current = this.unknownFramebuffer, this.viewport = new Se, this.hasMRT = !0, this.writeDepthTexture = !0, this.disposeAll(!0), 1 === this.renderer.context.webGLVersion) {
                    var r = this.renderer.context.extensions.drawBuffers, i = this.renderer.context.extensions.depthTexture;
                    B.PREFER_ENV === t.ENV.WEBGL_LEGACY && (r = null, i = null), r ? e.drawBuffers = function (t) {
                        return r.drawBuffersWEBGL(t)
                    } : (this.hasMRT = !1, e.drawBuffers = function () {
                    }), i || (this.writeDepthTexture = !1)
                } else this.msaaSamples = e.getInternalformatParameter(e.RENDERBUFFER, e.RGBA8, e.SAMPLES)
            }, r.prototype.bind = function (t, e) {
                var r = this.gl;
                if (t) {
                    var i = t.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(t);
                    this.current !== t && (this.current = t, r.bindFramebuffer(r.FRAMEBUFFER, i.framebuffer)), i.dirtyId !== t.dirtyId && (i.dirtyId = t.dirtyId, i.dirtyFormat !== t.dirtyFormat ? (i.dirtyFormat = t.dirtyFormat, this.updateFramebuffer(t)) : i.dirtySize !== t.dirtySize && (i.dirtySize = t.dirtySize, this.resizeFramebuffer(t)));
                    for (var n = 0; n < t.colorTextures.length; n++) {
                        var o = t.colorTextures[n];
                        this.renderer.texture.unbind(o.parentTextureArray || o)
                    }
                    t.depthTexture && this.renderer.texture.unbind(t.depthTexture), e ? this.setViewport(e.x, e.y, e.width, e.height) : this.setViewport(0, 0, t.width, t.height)
                } else this.current && (this.current = null, r.bindFramebuffer(r.FRAMEBUFFER, null)), e ? this.setViewport(e.x, e.y, e.width, e.height) : this.setViewport(0, 0, this.renderer.width, this.renderer.height)
            }, r.prototype.setViewport = function (t, e, r, i) {
                var n = this.viewport;
                n.width === r && n.height === i && n.x === t && n.y === e || (n.x = t, n.y = e, n.width = r, n.height = i, this.gl.viewport(t, e, r, i))
            }, Object.defineProperty(r.prototype, "size", {
                get: function () {
                    return this.current ? {x: 0, y: 0, width: this.current.width, height: this.current.height} : {x: 0, y: 0, width: this.renderer.width, height: this.renderer.height}
                }, enumerable: !1, configurable: !0
            }), r.prototype.clear = function (e, r, i, n, o) {
                void 0 === o && (o = t.BUFFER_BITS.COLOR | t.BUFFER_BITS.DEPTH);
                var s = this.gl;
                s.clearColor(e, r, i, n), s.clear(o)
            }, r.prototype.initFramebuffer = function (t) {
                var e = this.gl, r = new ui(e.createFramebuffer());
                return r.multisample = this.detectSamples(t.multisample), t.glFramebuffers[this.CONTEXT_UID] = r, this.managedFramebuffers.push(t), t.disposeRunner.add(this), r
            }, r.prototype.resizeFramebuffer = function (t) {
                var e = this.gl, r = t.glFramebuffers[this.CONTEXT_UID];
                r.stencil && (e.bindRenderbuffer(e.RENDERBUFFER, r.stencil), e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_STENCIL, t.width, t.height));
                for (var i = t.colorTextures, n = 0; n < i.length; n++) this.renderer.texture.bind(i[n], 0);
                t.depthTexture && this.renderer.texture.bind(t.depthTexture, 0)
            }, r.prototype.updateFramebuffer = function (t) {
                var e = this.gl, r = t.glFramebuffers[this.CONTEXT_UID], i = t.colorTextures.length;
                e.drawBuffers || (i = Math.min(i, 1)), r.multisample > 1 && (r.msaaBuffer = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER, r.msaaBuffer), e.renderbufferStorageMultisample(e.RENDERBUFFER, r.multisample, e.RGBA8, t.width, t.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.RENDERBUFFER, r.msaaBuffer));
                for (var n = [], o = 0; o < i; o++) if (!(0 === o && r.multisample > 1)) {
                    var s = t.colorTextures[o], a = s.parentTextureArray || s;
                    this.renderer.texture.bind(a, 0), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + o, s.target, a._glTextures[this.CONTEXT_UID].texture, 0), n.push(e.COLOR_ATTACHMENT0 + o)
                }
                if (n.length > 1 && e.drawBuffers(n), t.depthTexture && this.writeDepthTexture) {
                    var h = t.depthTexture;
                    this.renderer.texture.bind(h, 0), e.framebufferTexture2D(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.TEXTURE_2D, h._glTextures[this.CONTEXT_UID].texture, 0)
                }
                r.stencil || !t.stencil && !t.depth || (r.stencil = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER, r.stencil), e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_STENCIL, t.width, t.height), t.depthTexture || e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_STENCIL_ATTACHMENT, e.RENDERBUFFER, r.stencil))
            }, r.prototype.detectSamples = function (e) {
                var r = this.msaaSamples, i = t.MSAA_QUALITY.NONE;
                if (e <= 1 || null === r) return i;
                for (var n = 0; n < r.length; n++) if (r[n] <= e) {
                    i = r[n];
                    break
                }
                return 1 === i && (i = t.MSAA_QUALITY.NONE), i
            }, r.prototype.blit = function (t, e, r) {
                var i = this.current, n = this.renderer, o = this.gl, s = this.CONTEXT_UID;
                if (2 === n.context.webGLVersion && i) {
                    var a = i.glFramebuffers[s];
                    if (a) {
                        if (!t) {
                            if (a.multisample <= 1) return;
                            a.blitFramebuffer || (a.blitFramebuffer = new Nr(i.width, i.height), a.blitFramebuffer.addColorTexture(0, i.colorTextures[0])), (t = a.blitFramebuffer).width = i.width, t.height = i.height
                        }
                        e || ((e = li).width = i.width, e.height = i.height), r || (r = e);
                        var h = e.width === r.width && e.height === r.height;
                        this.bind(t), o.bindFramebuffer(o.READ_FRAMEBUFFER, a.framebuffer), o.blitFramebuffer(e.x, e.y, e.width, e.height, r.x, r.y, r.width, r.height, o.COLOR_BUFFER_BIT, h ? o.NEAREST : o.LINEAR)
                    }
                }
            }, r.prototype.disposeFramebuffer = function (t, e) {
                var r = t.glFramebuffers[this.CONTEXT_UID], i = this.gl;
                if (r) {
                    delete t.glFramebuffers[this.CONTEXT_UID];
                    var n = this.managedFramebuffers.indexOf(t);
                    n >= 0 && this.managedFramebuffers.splice(n, 1), t.disposeRunner.remove(this), e || (i.deleteFramebuffer(r.framebuffer), r.stencil && i.deleteRenderbuffer(r.stencil))
                }
            }, r.prototype.disposeAll = function (t) {
                var e = this.managedFramebuffers;
                this.managedFramebuffers = [];
                for (var r = 0; r < e.length; r++) this.disposeFramebuffer(e[r], t)
            }, r.prototype.forceStencil = function () {
                var t = this.current;
                if (t) {
                    var e = t.glFramebuffers[this.CONTEXT_UID];
                    if (e && !e.stencil) {
                        t.enableStencil();
                        var r = t.width, i = t.height, n = this.gl, o = n.createRenderbuffer();
                        n.bindRenderbuffer(n.RENDERBUFFER, o), n.renderbufferStorage(n.RENDERBUFFER, n.DEPTH_STENCIL, r, i), e.stencil = o, n.framebufferRenderbuffer(n.FRAMEBUFFER, n.DEPTH_STENCIL_ATTACHMENT, n.RENDERBUFFER, o)
                    }
                }
            }, r.prototype.reset = function () {
                this.current = this.unknownFramebuffer, this.viewport = new Se
            }, r
        }(Dr), di = function (t) {
            this.buffer = t || null, this.updateID = -1, this.byteLength = -1, this.refCount = 0
        }, fi = {5126: 4, 5123: 2, 5121: 1}, pi = function (e) {
            function r(t) {
                var r = e.call(this, t) || this;
                return r._activeGeometry = null, r._activeVao = null, r.hasVao = !0, r.hasInstance = !0, r.canUseUInt32ElementIndex = !1, r.managedGeometries = {}, r.managedBuffers = {}, r
            }

            return vr(r, e), r.prototype.contextChange = function () {
                this.disposeAll(!0);
                var e = this.gl = this.renderer.gl, r = this.renderer.context;
                if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, 2 !== r.webGLVersion) {
                    var i = this.renderer.context.extensions.vertexArrayObject;
                    B.PREFER_ENV === t.ENV.WEBGL_LEGACY && (i = null), i ? (e.createVertexArray = function () {
                        return i.createVertexArrayOES()
                    }, e.bindVertexArray = function (t) {
                        return i.bindVertexArrayOES(t)
                    }, e.deleteVertexArray = function (t) {
                        return i.deleteVertexArrayOES(t)
                    }) : (this.hasVao = !1, e.createVertexArray = function () {
                        return null
                    }, e.bindVertexArray = function () {
                        return null
                    }, e.deleteVertexArray = function () {
                        return null
                    })
                }
                if (2 !== r.webGLVersion) {
                    var n = e.getExtension("ANGLE_instanced_arrays");
                    n ? (e.vertexAttribDivisor = function (t, e) {
                        return n.vertexAttribDivisorANGLE(t, e)
                    }, e.drawElementsInstanced = function (t, e, r, i, o) {
                        return n.drawElementsInstancedANGLE(t, e, r, i, o)
                    }, e.drawArraysInstanced = function (t, e, r, i) {
                        return n.drawArraysInstancedANGLE(t, e, r, i)
                    }) : this.hasInstance = !1
                }
                this.canUseUInt32ElementIndex = 2 === r.webGLVersion || !!r.extensions.uint32ElementIndex
            }, r.prototype.bind = function (t, e) {
                e = e || this.renderer.shader.shader;
                var r = this.gl, i = t.glVertexArrayObjects[this.CONTEXT_UID], n = !1;
                i || (this.managedGeometries[t.id] = t, t.disposeRunner.add(this), t.glVertexArrayObjects[this.CONTEXT_UID] = i = {}, n = !0);
                var o = i[e.program.id] || this.initGeometryVao(t, e.program, n);
                this._activeGeometry = t, this._activeVao !== o && (this._activeVao = o, this.hasVao ? r.bindVertexArray(o) : this.activateVao(t, e.program)), this.updateBuffers()
            }, r.prototype.reset = function () {
                this.unbind()
            }, r.prototype.updateBuffers = function () {
                for (var t = this._activeGeometry, e = this.gl, r = 0; r < t.buffers.length; r++) {
                    var i = t.buffers[r], n = i._glBuffers[this.CONTEXT_UID];
                    if (i._updateID !== n.updateID) {
                        n.updateID = i._updateID;
                        var o = i.index ? e.ELEMENT_ARRAY_BUFFER : e.ARRAY_BUFFER;
                        if (e.bindBuffer(o, n.buffer), this._boundBuffer = n, n.byteLength >= i.data.byteLength) e.bufferSubData(o, 0, i.data); else {
                            var s = i.static ? e.STATIC_DRAW : e.DYNAMIC_DRAW;
                            n.byteLength = i.data.byteLength, e.bufferData(o, i.data, s)
                        }
                    }
                }
            }, r.prototype.checkCompatibility = function (t, e) {
                var r = t.attributes, i = e.attributeData;
                for (var n in i) if (!r[n]) throw new Error('shader and geometry incompatible, geometry missing the "' + n + '" attribute')
            }, r.prototype.getSignature = function (t, e) {
                var r = t.attributes, i = e.attributeData, n = ["g", t.id];
                for (var o in r) i[o] && n.push(o);
                return n.join("-")
            }, r.prototype.initGeometryVao = function (t, e, r) {
                void 0 === r && (r = !0), this.checkCompatibility(t, e);
                var i = this.gl, n = this.CONTEXT_UID, o = this.getSignature(t, e), s = t.glVertexArrayObjects[this.CONTEXT_UID], a = s[o];
                if (a) return s[e.id] = a, a;
                var h = t.buffers, u = t.attributes, l = {}, c = {};
                for (var d in h) l[d] = 0, c[d] = 0;
                for (var d in u) !u[d].size && e.attributeData[d] ? u[d].size = e.attributeData[d].size : u[d].size || console.warn("PIXI Geometry attribute '" + d + "' size cannot be determined (likely the bound shader does not have the attribute)"), l[u[d].buffer] += u[d].size * fi[u[d].type];
                for (var d in u) {
                    var f = u[d], p = f.size;
                    void 0 === f.stride && (l[f.buffer] === p * fi[f.type] ? f.stride = 0 : f.stride = l[f.buffer]), void 0 === f.start && (f.start = c[f.buffer], c[f.buffer] += p * fi[f.type])
                }
                a = i.createVertexArray(), i.bindVertexArray(a);
                for (var _ = 0; _ < h.length; _++) {
                    var m = h[_];
                    m._glBuffers[n] || (m._glBuffers[n] = new di(i.createBuffer()), this.managedBuffers[m.id] = m, m.disposeRunner.add(this)), r && m._glBuffers[n].refCount++
                }
                return this.activateVao(t, e), this._activeVao = a, s[e.id] = a, s[o] = a, a
            }, r.prototype.disposeBuffer = function (t, e) {
                if (this.managedBuffers[t.id]) {
                    delete this.managedBuffers[t.id];
                    var r = t._glBuffers[this.CONTEXT_UID], i = this.gl;
                    t.disposeRunner.remove(this), r && (e || i.deleteBuffer(r.buffer), delete t._glBuffers[this.CONTEXT_UID])
                }
            }, r.prototype.disposeGeometry = function (t, e) {
                if (this.managedGeometries[t.id]) {
                    delete this.managedGeometries[t.id];
                    var r = t.glVertexArrayObjects[this.CONTEXT_UID], i = this.gl, n = t.buffers;
                    if (t.disposeRunner.remove(this), r) {
                        for (var o = 0; o < n.length; o++) {
                            var s = n[o]._glBuffers[this.CONTEXT_UID];
                            s.refCount--, 0 !== s.refCount || e || this.disposeBuffer(n[o], e)
                        }
                        if (!e) for (var a in r) if ("g" === a[0]) {
                            var h = r[a];
                            this._activeVao === h && this.unbind(), i.deleteVertexArray(h)
                        }
                        delete t.glVertexArrayObjects[this.CONTEXT_UID]
                    }
                }
            }, r.prototype.disposeAll = function (t) {
                for (var e = Object.keys(this.managedGeometries), r = 0; r < e.length; r++) this.disposeGeometry(this.managedGeometries[e[r]], t);
                for (e = Object.keys(this.managedBuffers), r = 0; r < e.length; r++) this.disposeBuffer(this.managedBuffers[e[r]], t)
            }, r.prototype.activateVao = function (t, e) {
                var r = this.gl, i = this.CONTEXT_UID, n = t.buffers, o = t.attributes;
                t.indexBuffer && r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, t.indexBuffer._glBuffers[i].buffer);
                var s = null;
                for (var a in o) {
                    var h = o[a], u = n[h.buffer]._glBuffers[i];
                    if (e.attributeData[a]) {
                        s !== u && (r.bindBuffer(r.ARRAY_BUFFER, u.buffer), s = u);
                        var l = e.attributeData[a].location;
                        if (r.enableVertexAttribArray(l), r.vertexAttribPointer(l, h.size, h.type || r.FLOAT, h.normalized, h.stride, h.start), h.instance) {
                            if (!this.hasInstance) throw new Error("geometry error, GPU Instancing is not supported on this device");
                            r.vertexAttribDivisor(l, 1)
                        }
                    }
                }
            }, r.prototype.draw = function (t, e, r, i) {
                var n = this.gl, o = this._activeGeometry;
                if (o.indexBuffer) {
                    var s = o.indexBuffer.data.BYTES_PER_ELEMENT, a = 2 === s ? n.UNSIGNED_SHORT : n.UNSIGNED_INT;
                    2 === s || 4 === s && this.canUseUInt32ElementIndex ? o.instanced ? n.drawElementsInstanced(t, e || o.indexBuffer.data.length, a, (r || 0) * s, i || 1) : n.drawElements(t, e || o.indexBuffer.data.length, a, (r || 0) * s) : console.warn("unsupported index buffer type: uint32")
                } else o.instanced ? n.drawArraysInstanced(t, r, e || o.getSize(), i || 1) : n.drawArrays(t, r, e || o.getSize());
                return this
            }, r.prototype.unbind = function () {
                this.gl.bindVertexArray(null), this._activeVao = null, this._activeGeometry = null
            }, r
        }(Dr), _i = function () {
            function e(e) {
                void 0 === e && (e = null), this.type = t.MASK_TYPES.NONE, this.autoDetect = !0, this.maskObject = e || null, this.pooled = !1, this.isMaskData = !0, this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null, this._target = null
            }

            return e.prototype.reset = function () {
                this.pooled && (this.maskObject = null, this.type = t.MASK_TYPES.NONE, this.autoDetect = !0), this._target = null
            }, e.prototype.copyCountersOrReset = function (t) {
                t ? (this._stencilCounter = t._stencilCounter, this._scissorCounter = t._scissorCounter, this._scissorRect = t._scissorRect) : (this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null)
            }, e
        }();

    function mi(t, e, r) {
        var i = t.createShader(e);
        return t.shaderSource(i, r), t.compileShader(i), i
    }

    function vi(t, e, r, i) {
        var n = mi(t, t.VERTEX_SHADER, e), o = mi(t, t.FRAGMENT_SHADER, r), s = t.createProgram();
        if (t.attachShader(s, n), t.attachShader(s, o), i) for (var a in i) t.bindAttribLocation(s, i[a], a);
        return t.linkProgram(s), t.getProgramParameter(s, t.LINK_STATUS) || (t.getShaderParameter(n, t.COMPILE_STATUS) || (console.warn(e), console.error(t.getShaderInfoLog(n))), t.getShaderParameter(o, t.COMPILE_STATUS) || (console.warn(r), console.error(t.getShaderInfoLog(o))), console.error("Pixi.js Error: Could not initialize shader."), console.error("gl.VALIDATE_STATUS", t.getProgramParameter(s, t.VALIDATE_STATUS)), console.error("gl.getError()", t.getError()), "" !== t.getProgramInfoLog(s) && console.warn("Pixi.js Warning: gl.getProgramInfoLog()", t.getProgramInfoLog(s)), t.deleteProgram(s), s = null), t.deleteShader(n), t.deleteShader(o), s
    }

    function yi(t) {
        for (var e = new Array(t), r = 0; r < e.length; r++) e[r] = !1;
        return e
    }

    function gi(t, e) {
        switch (t) {
            case"float":
                return 0;
            case"vec2":
                return new Float32Array(2 * e);
            case"vec3":
                return new Float32Array(3 * e);
            case"vec4":
                return new Float32Array(4 * e);
            case"int":
            case"uint":
            case"sampler2D":
            case"sampler2DArray":
                return 0;
            case"ivec2":
                return new Int32Array(2 * e);
            case"ivec3":
                return new Int32Array(3 * e);
            case"ivec4":
                return new Int32Array(4 * e);
            case"uvec2":
                return new Uint32Array(2 * e);
            case"uvec3":
                return new Uint32Array(3 * e);
            case"uvec4":
                return new Uint32Array(4 * e);
            case"bool":
                return !1;
            case"bvec2":
                return yi(2 * e);
            case"bvec3":
                return yi(3 * e);
            case"bvec4":
                return yi(4 * e);
            case"mat2":
                return new Float32Array([1, 0, 0, 1]);
            case"mat3":
                return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
            case"mat4":
                return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
        }
        return null
    }

    var Ei, Ti = {}, bi = Ti;

    function xi() {
        if (bi === Ti || bi && bi.isContextLost()) {
            var e = document.createElement("canvas"), r = void 0;
            B.PREFER_ENV >= t.ENV.WEBGL2 && (r = e.getContext("webgl2", {})), r || ((r = e.getContext("webgl", {}) || e.getContext("experimental-webgl", {})) ? r.getExtension("WEBGL_draw_buffers") : r = null), bi = r
        }
        return bi
    }

    function Ai(e, r, i) {
        if ("precision" !== e.substring(0, 9)) {
            var n = r;
            return r === t.PRECISION.HIGH && i !== t.PRECISION.HIGH && (n = t.PRECISION.MEDIUM), "precision " + n + " float;\n" + e
        }
        return i !== t.PRECISION.HIGH && "precision highp" === e.substring(0, 15) ? e.replace("precision highp", "precision mediump") : e
    }

    var Si = {
        float: 1,
        vec2: 2,
        vec3: 3,
        vec4: 4,
        int: 1,
        ivec2: 2,
        ivec3: 3,
        ivec4: 4,
        uint: 1,
        uvec2: 2,
        uvec3: 3,
        uvec4: 4,
        bool: 1,
        bvec2: 2,
        bvec3: 3,
        bvec4: 4,
        mat2: 4,
        mat3: 9,
        mat4: 16,
        sampler2D: 1
    };

    function Oi(t) {
        return Si[t]
    }

    var Ri = null, Pi = {
        FLOAT: "float",
        FLOAT_VEC2: "vec2",
        FLOAT_VEC3: "vec3",
        FLOAT_VEC4: "vec4",
        INT: "int",
        INT_VEC2: "ivec2",
        INT_VEC3: "ivec3",
        INT_VEC4: "ivec4",
        UNSIGNED_INT: "uint",
        UNSIGNED_INT_VEC2: "uvec2",
        UNSIGNED_INT_VEC3: "uvec3",
        UNSIGNED_INT_VEC4: "uvec4",
        BOOL: "bool",
        BOOL_VEC2: "bvec2",
        BOOL_VEC3: "bvec3",
        BOOL_VEC4: "bvec4",
        FLOAT_MAT2: "mat2",
        FLOAT_MAT3: "mat3",
        FLOAT_MAT4: "mat4",
        SAMPLER_2D: "sampler2D",
        INT_SAMPLER_2D: "sampler2D",
        UNSIGNED_INT_SAMPLER_2D: "sampler2D",
        SAMPLER_CUBE: "samplerCube",
        INT_SAMPLER_CUBE: "samplerCube",
        UNSIGNED_INT_SAMPLER_CUBE: "samplerCube",
        SAMPLER_2D_ARRAY: "sampler2DArray",
        INT_SAMPLER_2D_ARRAY: "sampler2DArray",
        UNSIGNED_INT_SAMPLER_2D_ARRAY: "sampler2DArray"
    };

    function Ii(t, e) {
        if (!Ri) {
            var r = Object.keys(Pi);
            Ri = {};
            for (var i = 0; i < r.length; ++i) {
                var n = r[i];
                Ri[t[n]] = Pi[n]
            }
        }
        return Ri[e]
    }

    var Mi, wi = [{
        test: function (t) {
            return "float" === t.type && 1 === t.size
        }, code: function (t) {
            return '\n            if(uv["' + t + '"] !== ud["' + t + '"].value)\n            {\n                ud["' + t + '"].value = uv["' + t + '"]\n                gl.uniform1f(ud["' + t + '"].location, uv["' + t + '"])\n            }\n            '
        }
    }, {
        test: function (t) {
            return ("sampler2D" === t.type || "samplerCube" === t.type || "sampler2DArray" === t.type) && 1 === t.size && !t.isArray
        }, code: function (t) {
            return 't = syncData.textureCount++;\n\n            renderer.texture.bind(uv["' + t + '"], t);\n\n            if(ud["' + t + '"].value !== t)\n            {\n                ud["' + t + '"].value = t;\n                gl.uniform1i(ud["' + t + '"].location, t);\n; // eslint-disable-line max-len\n            }'
        }
    }, {
        test: function (t, e) {
            return "mat3" === t.type && 1 === t.size && void 0 !== e.a
        }, code: function (t) {
            return '\n            gl.uniformMatrix3fv(ud["' + t + '"].location, false, uv["' + t + '"].toArray(true));\n            '
        }
    }, {
        test: function (t, e) {
            return "vec2" === t.type && 1 === t.size && void 0 !== e.x
        }, code: function (t) {
            return '\n                cv = ud["' + t + '"].value;\n                v = uv["' + t + '"];\n\n                if(cv[0] !== v.x || cv[1] !== v.y)\n                {\n                    cv[0] = v.x;\n                    cv[1] = v.y;\n                    gl.uniform2f(ud["' + t + '"].location, v.x, v.y);\n                }'
        }
    }, {
        test: function (t) {
            return "vec2" === t.type && 1 === t.size
        }, code: function (t) {
            return '\n                cv = ud["' + t + '"].value;\n                v = uv["' + t + '"];\n\n                if(cv[0] !== v[0] || cv[1] !== v[1])\n                {\n                    cv[0] = v[0];\n                    cv[1] = v[1];\n                    gl.uniform2f(ud["' + t + '"].location, v[0], v[1]);\n                }\n            '
        }
    }, {
        test: function (t, e) {
            return "vec4" === t.type && 1 === t.size && void 0 !== e.width
        }, code: function (t) {
            return '\n                cv = ud["' + t + '"].value;\n                v = uv["' + t + '"];\n\n                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)\n                {\n                    cv[0] = v.x;\n                    cv[1] = v.y;\n                    cv[2] = v.width;\n                    cv[3] = v.height;\n                    gl.uniform4f(ud["' + t + '"].location, v.x, v.y, v.width, v.height)\n                }'
        }
    }, {
        test: function (t) {
            return "vec4" === t.type && 1 === t.size
        }, code: function (t) {
            return '\n                cv = ud["' + t + '"].value;\n                v = uv["' + t + '"];\n\n                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n                {\n                    cv[0] = v[0];\n                    cv[1] = v[1];\n                    cv[2] = v[2];\n                    cv[3] = v[3];\n\n                    gl.uniform4f(ud["' + t + '"].location, v[0], v[1], v[2], v[3])\n                }'
        }
    }], Di = {
        float: "\n    if(cv !== v)\n    {\n        cv.v = v;\n        gl.uniform1f(location, v)\n    }",
        vec2: "\n    if(cv[0] !== v[0] || cv[1] !== v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        gl.uniform2f(location, v[0], v[1])\n    }",
        vec3: "\n    if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n\n        gl.uniform3f(location, v[0], v[1], v[2])\n    }",
        vec4: "gl.uniform4f(location, v[0], v[1], v[2], v[3])",
        int: "gl.uniform1i(location, v)",
        ivec2: "gl.uniform2i(location, v[0], v[1])",
        ivec3: "gl.uniform3i(location, v[0], v[1], v[2])",
        ivec4: "gl.uniform4i(location, v[0], v[1], v[2], v[3])",
        uint: "gl.uniform1ui(location, v)",
        uvec2: "gl.uniform2ui(location, v[0], v[1])",
        uvec3: "gl.uniform3ui(location, v[0], v[1], v[2])",
        uvec4: "gl.uniform4ui(location, v[0], v[1], v[2], v[3])",
        bool: "gl.uniform1i(location, v)",
        bvec2: "gl.uniform2i(location, v[0], v[1])",
        bvec3: "gl.uniform3i(location, v[0], v[1], v[2])",
        bvec4: "gl.uniform4i(location, v[0], v[1], v[2], v[3])",
        mat2: "gl.uniformMatrix2fv(location, false, v)",
        mat3: "gl.uniformMatrix3fv(location, false, v)",
        mat4: "gl.uniformMatrix4fv(location, false, v)",
        sampler2D: "gl.uniform1i(location, v)",
        samplerCube: "gl.uniform1i(location, v)",
        sampler2DArray: "gl.uniform1i(location, v)"
    }, Ci = {
        float: "gl.uniform1fv(location, v)",
        vec2: "gl.uniform2fv(location, v)",
        vec3: "gl.uniform3fv(location, v)",
        vec4: "gl.uniform4fv(location, v)",
        mat4: "gl.uniformMatrix4fv(location, false, v)",
        mat3: "gl.uniformMatrix3fv(location, false, v)",
        mat2: "gl.uniformMatrix2fv(location, false, v)",
        int: "gl.uniform1iv(location, v)",
        ivec2: "gl.uniform2iv(location, v)",
        ivec3: "gl.uniform3iv(location, v)",
        ivec4: "gl.uniform4iv(location, v)",
        uint: "gl.uniform1uiv(location, v)",
        uvec2: "gl.uniform2uiv(location, v)",
        uvec3: "gl.uniform3uiv(location, v)",
        uvec4: "gl.uniform4uiv(location, v)",
        bool: "gl.uniform1iv(location, v)",
        bvec2: "gl.uniform2iv(location, v)",
        bvec3: "gl.uniform3iv(location, v)",
        bvec4: "gl.uniform4iv(location, v)",
        sampler2D: "gl.uniform1iv(location, v)",
        samplerCube: "gl.uniform1iv(location, v)",
        sampler2DArray: "gl.uniform1iv(location, v)"
    }, Ni = ["precision mediump float;", "void main(void){", "float test = 0.1;", "%forloop%", "gl_FragColor = vec4(0.0);", "}"].join("\n");

    function Li(t) {
        for (var e = "", r = 0; r < t; ++r) r > 0 && (e += "\nelse "), r < t - 1 && (e += "if(test == " + r + ".0){}");
        return e
    }

    function Fi(t, e) {
        if (0 === t) throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
        for (var r = e.createShader(e.FRAGMENT_SHADER); ;) {
            var i = Ni.replace(/%forloop%/gi, Li(t));
            if (e.shaderSource(r, i), e.compileShader(r), e.getShaderParameter(r, e.COMPILE_STATUS)) break;
            t = t / 2 | 0
        }
        return t
    }

    var Bi = 0, Ui = {}, Gi = function () {
            function e(r, i, n) {
                void 0 === n && (n = "pixi-shader"), this.id = Bi++, this.vertexSrc = r || e.defaultVertexSrc, this.fragmentSrc = i || e.defaultFragmentSrc, this.vertexSrc = this.vertexSrc.trim(), this.fragmentSrc = this.fragmentSrc.trim(), "#version" !== this.vertexSrc.substring(0, 8) && (n = n.replace(/\s+/g, "-"), Ui[n] ? (Ui[n]++, n += "-" + Ui[n]) : Ui[n] = 1, this.vertexSrc = "#define SHADER_NAME " + n + "\n" + this.vertexSrc, this.fragmentSrc = "#define SHADER_NAME " + n + "\n" + this.fragmentSrc, this.vertexSrc = Ai(this.vertexSrc, B.PRECISION_VERTEX, t.PRECISION.HIGH), this.fragmentSrc = Ai(this.fragmentSrc, B.PRECISION_FRAGMENT, function () {
                    if (!Ei) {
                        Ei = t.PRECISION.MEDIUM;
                        var e = xi();
                        if (e && e.getShaderPrecisionFormat) {
                            var r = e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT);
                            Ei = r.precision ? t.PRECISION.HIGH : t.PRECISION.MEDIUM
                        }
                    }
                    return Ei
                }())), this.extractData(this.vertexSrc, this.fragmentSrc), this.glPrograms = {}, this.syncUniforms = null
            }

            return e.prototype.extractData = function (t, e) {
                var r = xi();
                if (r) {
                    var i = vi(r, t, e);
                    this.attributeData = this.getAttributeData(i, r), this.uniformData = this.getUniformData(i, r), r.deleteProgram(i)
                } else this.uniformData = {}, this.attributeData = {}
            }, e.prototype.getAttributeData = function (t, e) {
                for (var r = {}, i = [], n = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES), o = 0; o < n; o++) {
                    var s = e.getActiveAttrib(t, o), a = Ii(e, s.type), h = {type: a, name: s.name, size: Oi(a), location: 0};
                    r[s.name] = h, i.push(h)
                }
                for (i.sort(function (t, e) {
                    return t.name > e.name ? 1 : -1
                }), o = 0; o < i.length; o++) i[o].location = o;
                return r
            }, e.prototype.getUniformData = function (t, e) {
                for (var r = {}, i = e.getProgramParameter(t, e.ACTIVE_UNIFORMS), n = 0; n < i; n++) {
                    var o = e.getActiveUniform(t, n), s = o.name.replace(/\[.*?\]$/, ""), a = o.name.match(/\[.*?\]$/), h = Ii(e, o.type);
                    r[s] = {type: h, size: o.size, isArray: a, value: gi(h, o.size)}
                }
                return r
            }, Object.defineProperty(e, "defaultVertexSrc", {
                get: function () {
                    return "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n}\n"
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e, "defaultFragmentSrc", {
                get: function () {
                    return "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor *= texture2D(uSampler, vTextureCoord);\n}"
                }, enumerable: !1, configurable: !0
            }), e.from = function (t, r, i) {
                var n = t + r, o = de[n];
                return o || (de[n] = o = new e(t, r, i)), o
            }, e
        }(), Xi = function () {
            function t(t, e) {
                for (var r in this.program = t, this.uniformGroup = e ? e instanceof ti ? e : new ti(e) : new ti({}), t.uniformData) this.uniformGroup.uniforms[r] instanceof Array && (this.uniformGroup.uniforms[r] = new Float32Array(this.uniformGroup.uniforms[r]))
            }

            return t.prototype.checkUniformExists = function (t, e) {
                if (e.uniforms[t]) return !0;
                for (var r in e.uniforms) {
                    var i = e.uniforms[r];
                    if (i.group && this.checkUniformExists(t, i)) return !0
                }
                return !1
            }, t.prototype.destroy = function () {
                this.uniformGroup = null
            }, Object.defineProperty(t.prototype, "uniforms", {
                get: function () {
                    return this.uniformGroup.uniforms
                }, enumerable: !1, configurable: !0
            }), t.from = function (e, r, i) {
                return new t(Gi.from(e, r), i)
            }, t
        }(), ki = function () {
            function e() {
                this.data = 0, this.blendMode = t.BLEND_MODES.NORMAL, this.polygonOffset = 0, this.blend = !0, this.depthMask = !0
            }

            return Object.defineProperty(e.prototype, "blend", {
                get: function () {
                    return !!(1 & this.data)
                }, set: function (t) {
                    !!(1 & this.data) !== t && (this.data ^= 1)
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "offsets", {
                get: function () {
                    return !!(2 & this.data)
                }, set: function (t) {
                    !!(2 & this.data) !== t && (this.data ^= 2)
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "culling", {
                get: function () {
                    return !!(4 & this.data)
                }, set: function (t) {
                    !!(4 & this.data) !== t && (this.data ^= 4)
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "depthTest", {
                get: function () {
                    return !!(8 & this.data)
                }, set: function (t) {
                    !!(8 & this.data) !== t && (this.data ^= 8)
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "depthMask", {
                get: function () {
                    return !!(32 & this.data)
                }, set: function (t) {
                    !!(32 & this.data) !== t && (this.data ^= 32)
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "clockwiseFrontFace", {
                get: function () {
                    return !!(16 & this.data)
                }, set: function (t) {
                    !!(16 & this.data) !== t && (this.data ^= 16)
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "blendMode", {
                get: function () {
                    return this._blendMode
                }, set: function (e) {
                    this.blend = e !== t.BLEND_MODES.NONE, this._blendMode = e
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "polygonOffset", {
                get: function () {
                    return this._polygonOffset
                }, set: function (t) {
                    this.offsets = !!t, this._polygonOffset = t
                }, enumerable: !1, configurable: !0
            }), e.for2d = function () {
                var t = new e;
                return t.depthTest = !1, t.blend = !0, t
            }, e
        }(), ji = function (t) {
            function e(r, i, n) {
                var o = this, s = Gi.from(r || e.defaultVertexSrc, i || e.defaultFragmentSrc);
                return (o = t.call(this, s, n) || this).padding = 0, o.resolution = B.FILTER_RESOLUTION, o.enabled = !0, o.autoFit = !0, o.legacy = !!o.program.attributeData.aTextureCoord, o.state = new ki, o
            }

            return vr(e, t), e.prototype.apply = function (t, e, r, i, n) {
                t.applyFilter(this, e, r, i)
            }, Object.defineProperty(e.prototype, "blendMode", {
                get: function () {
                    return this.state.blendMode
                }, set: function (t) {
                    this.state.blendMode = t
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e, "defaultVertexSrc", {
                get: function () {
                    return "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n"
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e, "defaultFragmentSrc", {
                get: function () {
                    return "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n"
                }, enumerable: !1, configurable: !0
            }), e
        }(Xi),
        Hi = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n",
        Yi = "varying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform sampler2D mask;\nuniform float alpha;\nuniform float npmAlpha;\nuniform vec4 maskClamp;\n\nvoid main(void)\n{\n    float clip = step(3.5,\n        step(maskClamp.x, vMaskCoord.x) +\n        step(maskClamp.y, vMaskCoord.y) +\n        step(vMaskCoord.x, maskClamp.z) +\n        step(vMaskCoord.y, maskClamp.w));\n\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);\n\n    original *= (alphaMul * masky.r * alpha * clip);\n\n    gl_FragColor = original;\n}\n",
        Vi = new De, zi = function () {
            function t(t, e) {
                this._texture = t, this.mapCoord = new De, this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._textureID = -1, this._updateID = 0, this.clampOffset = 0, this.clampMargin = void 0 === e ? .5 : e, this.isSimple = !1
            }

            return Object.defineProperty(t.prototype, "texture", {
                get: function () {
                    return this._texture
                }, set: function (t) {
                    this._texture = t, this._textureID = -1
                }, enumerable: !1, configurable: !0
            }), t.prototype.multiplyUvs = function (t, e) {
                void 0 === e && (e = t);
                for (var r = this.mapCoord, i = 0; i < t.length; i += 2) {
                    var n = t[i], o = t[i + 1];
                    e[i] = n * r.a + o * r.c + r.tx, e[i + 1] = n * r.b + o * r.d + r.ty
                }
                return e
            }, t.prototype.update = function (t) {
                var e = this._texture;
                if (!e || !e.valid) return !1;
                if (!t && this._textureID === e._updateID) return !1;
                this._textureID = e._updateID, this._updateID++;
                var r = e._uvs;
                this.mapCoord.set(r.x1 - r.x0, r.y1 - r.y0, r.x3 - r.x0, r.y3 - r.y0, r.x0, r.y0);
                var i = e.orig, n = e.trim;
                n && (Vi.set(i.width / n.width, 0, 0, i.height / n.height, -n.x / n.width, -n.y / n.height), this.mapCoord.append(Vi));
                var o = e.baseTexture, s = this.uClampFrame, a = this.clampMargin / o.resolution, h = this.clampOffset;
                return s[0] = (e._frame.x + a + h) / o.width, s[1] = (e._frame.y + a + h) / o.height, s[2] = (e._frame.x + e._frame.width - a + h) / o.width, s[3] = (e._frame.y + e._frame.height - a + h) / o.height, this.uClampOffset[0] = h / o.realWidth, this.uClampOffset[1] = h / o.realHeight, this.isSimple = e._frame.width === o.width && e._frame.height === o.height && 0 === e.rotate, !0
            }, t
        }(), Wi = function (t) {
            function e(e) {
                var r = this, i = new De;
                return r = t.call(this, Hi, Yi) || this, e.renderable = !1, r.maskSprite = e, r.maskMatrix = i, r
            }

            return vr(e, t), e.prototype.apply = function (t, e, r, i) {
                var n = this.maskSprite, o = n._texture;
                o.valid && (o.uvMatrix || (o.uvMatrix = new zi(o, 0)), o.uvMatrix.update(), this.uniforms.npmAlpha = o.baseTexture.alphaMode ? 0 : 1, this.uniforms.mask = o, this.uniforms.otherMatrix = t.calculateSpriteMatrix(this.maskMatrix, n).prepend(o.uvMatrix.mapCoord), this.uniforms.alpha = n.worldAlpha, this.uniforms.maskClamp = o.uvMatrix.uClampFrame, t.applyFilter(this, e, r, i))
            }, e
        }(ji), qi = function (e) {
            function r(t) {
                var r = e.call(this, t) || this;
                return r.enableScissor = !0, r.alphaMaskPool = [], r.maskDataPool = [], r.maskStack = [], r.alphaMaskIndex = 0, r
            }

            return vr(r, e), r.prototype.setMaskStack = function (t) {
                this.maskStack = t, this.renderer.scissor.setMaskStack(t), this.renderer.stencil.setMaskStack(t)
            }, r.prototype.push = function (e, r) {
                var i = r;
                if (!i.isMaskData) {
                    var n = this.maskDataPool.pop() || new _i;
                    n.pooled = !0, n.maskObject = r, i = n
                }
                switch (i.autoDetect && this.detect(i), i.copyCountersOrReset(this.maskStack[this.maskStack.length - 1]), i._target = e, i.type) {
                    case t.MASK_TYPES.SCISSOR:
                        this.maskStack.push(i), this.renderer.scissor.push(i);
                        break;
                    case t.MASK_TYPES.STENCIL:
                        this.maskStack.push(i), this.renderer.stencil.push(i);
                        break;
                    case t.MASK_TYPES.SPRITE:
                        i.copyCountersOrReset(null), this.pushSpriteMask(i), this.maskStack.push(i)
                }
            }, r.prototype.pop = function (e) {
                var r = this.maskStack.pop();
                if (r && r._target === e) {
                    switch (r.type) {
                        case t.MASK_TYPES.SCISSOR:
                            this.renderer.scissor.pop();
                            break;
                        case t.MASK_TYPES.STENCIL:
                            this.renderer.stencil.pop(r.maskObject);
                            break;
                        case t.MASK_TYPES.SPRITE:
                            this.popSpriteMask()
                    }
                    r.reset(), r.pooled && this.maskDataPool.push(r)
                }
            }, r.prototype.detect = function (e) {
                var r = e.maskObject;
                if (r.isSprite) e.type = t.MASK_TYPES.SPRITE; else if (e.type = t.MASK_TYPES.STENCIL, this.enableScissor && r.isFastRect && r.isFastRect()) {
                    var i = r.worldTransform, n = Math.atan2(i.b, i.a), o = Math.atan2(i.d, i.c);
                    n = Math.round(n * (180 / Math.PI) * 100), o = ((o = Math.round(o * (180 / Math.PI) * 100) - n) % 18e3 + 18e3) % 18e3, 0 == (n = (n % 9e3 + 9e3) % 9e3) && 9e3 === o && (e.type = t.MASK_TYPES.SCISSOR)
                }
            }, r.prototype.pushSpriteMask = function (t) {
                var e = t.maskObject, r = t._target, i = this.alphaMaskPool[this.alphaMaskIndex];
                i || (i = this.alphaMaskPool[this.alphaMaskIndex] = [new Wi(e)]), i[0].resolution = this.renderer.resolution, i[0].maskSprite = e;
                var n = r.filterArea;
                r.filterArea = e.getBounds(!0), this.renderer.filter.push(r, i), r.filterArea = n, this.alphaMaskIndex++
            }, r.prototype.popSpriteMask = function () {
                this.renderer.filter.pop(), this.alphaMaskIndex--
            }, r
        }(Dr), Ki = function (t) {
            function e(e) {
                var r = t.call(this, e) || this;
                return r.maskStack = [], r.glConst = 0, r
            }

            return vr(e, t), e.prototype.getStackLength = function () {
                return this.maskStack.length
            }, e.prototype.setMaskStack = function (t) {
                var e = this.renderer.gl, r = this.getStackLength();
                this.maskStack = t;
                var i = this.getStackLength();
                i !== r && (0 === i ? e.disable(this.glConst) : (e.enable(this.glConst), this._useCurrent()))
            }, e.prototype._useCurrent = function () {
            }, e.prototype.destroy = function () {
                t.prototype.destroy.call(this), this.maskStack = null
            }, e
        }(Dr), Zi = function (t) {
            function e(e) {
                var r = t.call(this, e) || this;
                return r.glConst = WebGLRenderingContext.SCISSOR_TEST, r
            }

            return vr(e, t), e.prototype.getStackLength = function () {
                var t = this.maskStack[this.maskStack.length - 1];
                return t ? t._scissorCounter : 0
            }, e.prototype.push = function (t) {
                var e = t.maskObject;
                e.renderable = !0;
                var r = t._scissorRect, i = e.getBounds(!0), n = this.renderer.gl;
                e.renderable = !1, r ? i.fit(r) : n.enable(n.SCISSOR_TEST), t._scissorCounter++, t._scissorRect = i, this._useCurrent()
            }, e.prototype.pop = function () {
                var t = this.renderer.gl;
                this.getStackLength() > 0 ? this._useCurrent() : t.disable(t.SCISSOR_TEST)
            }, e.prototype._useCurrent = function () {
                var t = this.maskStack[this.maskStack.length - 1]._scissorRect, e = this.renderer.renderTexture.current, r = this.renderer.projection, i = r.transform,
                    n = r.sourceFrame, o = r.destinationFrame, s = e ? e.resolution : this.renderer.resolution, a = o.width / n.width, h = o.height / n.height,
                    u = ((t.x - n.x) * a + o.x) * s, l = ((t.y - n.y) * h + o.y) * s, c = t.width * a * s, d = t.height * h * s;
                i && (u += i.tx * s, l += i.ty * s), e || (l = this.renderer.height - d - l), this.renderer.gl.scissor(u, l, c, d)
            }, e
        }(Ki), Ji = function (t) {
            function e(e) {
                var r = t.call(this, e) || this;
                return r.glConst = WebGLRenderingContext.STENCIL_TEST, r
            }

            return vr(e, t), e.prototype.getStackLength = function () {
                var t = this.maskStack[this.maskStack.length - 1];
                return t ? t._stencilCounter : 0
            }, e.prototype.push = function (t) {
                var e = t.maskObject, r = this.renderer.gl, i = t._stencilCounter;
                0 === i && (this.renderer.framebuffer.forceStencil(), r.enable(r.STENCIL_TEST)), t._stencilCounter++, r.colorMask(!1, !1, !1, !1), r.stencilFunc(r.EQUAL, i, this._getBitwiseMask()), r.stencilOp(r.KEEP, r.KEEP, r.INCR), e.renderable = !0, e.render(this.renderer), this.renderer.batch.flush(), this.renderer.framebuffer.blit(), e.renderable = !1, this._useCurrent()
            }, e.prototype.pop = function (t) {
                var e = this.renderer.gl;
                0 === this.getStackLength() ? (e.disable(e.STENCIL_TEST), e.clear(e.STENCIL_BUFFER_BIT), e.clearStencil(0)) : (e.colorMask(!1, !1, !1, !1), e.stencilOp(e.KEEP, e.KEEP, e.DECR), t.renderable = !0, t.render(this.renderer), this.renderer.batch.flush(), t.renderable = !1, this._useCurrent())
            }, e.prototype._useCurrent = function () {
                var t = this.renderer.gl;
                t.colorMask(!0, !0, !0, !0), t.stencilFunc(t.EQUAL, this.getStackLength(), this._getBitwiseMask()), t.stencilOp(t.KEEP, t.KEEP, t.KEEP)
            }, e.prototype._getBitwiseMask = function () {
                return (1 << this.getStackLength()) - 1
            }, e
        }(Ki), Qi = function (t) {
            function e(e) {
                var r = t.call(this, e) || this;
                return r.destinationFrame = null, r.sourceFrame = null, r.defaultFrame = null, r.projectionMatrix = new De, r.transform = null, r
            }

            return vr(e, t), e.prototype.update = function (t, e, r, i) {
                this.destinationFrame = t || this.destinationFrame || this.defaultFrame, this.sourceFrame = e || this.sourceFrame || t, this.calculateProjection(this.destinationFrame, this.sourceFrame, r, i), this.transform && this.projectionMatrix.append(this.transform);
                var n = this.renderer;
                n.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix, n.globalUniforms.update(), n.shader.shader && n.shader.syncUniformGroup(n.shader.shader.uniforms.globals)
            }, e.prototype.calculateProjection = function (t, e, r, i) {
                var n = this.projectionMatrix, o = i ? -1 : 1;
                n.identity(), n.a = 1 / e.width * 2, n.d = o * (1 / e.height * 2), n.tx = -1 - e.x * n.a, n.ty = -o - e.y * n.d
            }, e.prototype.setTransform = function (t) {
            }, e
        }(Dr), $i = new Se, tn = new Se, en = function (t) {
            function e(e) {
                var r = t.call(this, e) || this;
                return r.clearColor = e._backgroundColorRgba, r.defaultMaskStack = [], r.current = null, r.sourceFrame = new Se, r.destinationFrame = new Se, r.viewportFrame = new Se, r
            }

            return vr(e, t), e.prototype.bind = function (t, e, r) {
                void 0 === t && (t = null);
                var i, n, o, s = this.renderer;
                this.current = t, t ? (o = (i = t.baseTexture).resolution, e || ($i.width = t.frame.width, $i.height = t.frame.height, e = $i), r || (tn.x = t.frame.x, tn.y = t.frame.y, tn.width = e.width, tn.height = e.height, r = tn), n = i.framebuffer) : (o = s.resolution, e || ($i.width = s.screen.width, $i.height = s.screen.height, e = $i), r || ((r = $i).width = e.width, r.height = e.height));
                var a = this.viewportFrame;
                a.x = r.x * o, a.y = r.y * o, a.width = r.width * o, a.height = r.height * o, t || (a.y = s.view.height - (a.y + a.height)), this.renderer.framebuffer.bind(n, a), this.renderer.projection.update(r, e, o, !n), t ? this.renderer.mask.setMaskStack(i.maskStack) : this.renderer.mask.setMaskStack(this.defaultMaskStack), this.sourceFrame.copyFrom(e), this.destinationFrame.copyFrom(r)
            }, e.prototype.clear = function (t, e) {
                t = this.current ? t || this.current.baseTexture.clearColor : t || this.clearColor;
                var r = this.destinationFrame, i = this.current ? this.current.baseTexture : this.renderer.screen, n = r.width !== i.width || r.height !== i.height;
                if (n) {
                    var o = this.viewportFrame, s = o.x, a = o.y, h = o.width, u = o.height;
                    this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST), this.renderer.gl.scissor(s, a, h, u)
                }
                this.renderer.framebuffer.clear(t[0], t[1], t[2], t[3], e), n && this.renderer.scissor.pop()
            }, e.prototype.resize = function () {
                this.bind(null)
            }, e.prototype.reset = function () {
                this.bind(null)
            }, e
        }(Dr), rn = function () {
        }, nn = function () {
            function t(t, e) {
                this.program = t, this.uniformData = e, this.uniformGroups = {}
            }

            return t.prototype.destroy = function () {
                this.uniformData = null, this.uniformGroups = null, this.program = null
            }, t
        }(), on = 0, sn = {textureCount: 0}, an = function (t) {
            function e(e) {
                var r = t.call(this, e) || this;
                return r.destroyed = !1, r.systemCheck(), r.gl = null, r.shader = null, r.program = null, r.cache = {}, r.id = on++, r
            }

            return vr(e, t), e.prototype.systemCheck = function () {
                if (!function () {
                    if ("boolean" == typeof Mi) return Mi;
                    try {
                        var t = new Function("param1", "param2", "param3", "return param1[param2] === param3;");
                        Mi = !0 === t({a: "b"}, "a", "b")
                    } catch (t) {
                        Mi = !1
                    }
                    return Mi
                }()) throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.")
            }, e.prototype.contextChange = function (t) {
                this.gl = t, this.reset()
            }, e.prototype.bind = function (t, e) {
                t.uniforms.globals = this.renderer.globalUniforms;
                var r = t.program, i = r.glPrograms[this.renderer.CONTEXT_UID] || this.generateShader(t);
                return this.shader = t, this.program !== r && (this.program = r, this.gl.useProgram(i.program)), e || (sn.textureCount = 0, this.syncUniformGroup(t.uniformGroup, sn)), i
            }, e.prototype.setUniforms = function (t) {
                var e = this.shader.program, r = e.glPrograms[this.renderer.CONTEXT_UID];
                e.syncUniforms(r.uniformData, t, this.renderer)
            }, e.prototype.syncUniformGroup = function (t, e) {
                var r = this.getglProgram();
                t.static && t.dirtyId === r.uniformGroups[t.id] || (r.uniformGroups[t.id] = t.dirtyId, this.syncUniforms(t, r, e))
            }, e.prototype.syncUniforms = function (t, e, r) {
                (t.syncUniforms[this.shader.program.id] || this.createSyncGroups(t))(e.uniformData, t.uniforms, this.renderer, r)
            }, e.prototype.createSyncGroups = function (t) {
                var e = this.getSignature(t, this.shader.program.uniformData);
                return this.cache[e] || (this.cache[e] = function (t, e) {
                    var r = ["\n        var v = null;\n        var cv = null\n        var t = 0;\n        var gl = renderer.gl\n    "];
                    for (var i in t.uniforms) {
                        var n = e[i];
                        if (n) {
                            for (var o = t.uniforms[i], s = !1, a = 0; a < wi.length; a++) if (wi[a].test(n, o)) {
                                r.push(wi[a].code(i, o)), s = !0;
                                break
                            }
                            if (!s) {
                                var h = (1 === n.size ? Di : Ci)[n.type].replace("location", 'ud["' + i + '"].location');
                                r.push('\n            cv = ud["' + i + '"].value;\n            v = uv["' + i + '"];\n            ' + h + ";")
                            }
                        } else t.uniforms[i].group && r.push('\n                    renderer.shader.syncUniformGroup(uv["' + i + '"], syncData);\n                ')
                    }
                    return new Function("ud", "uv", "renderer", "syncData", r.join("\n"))
                }(t, this.shader.program.uniformData)), t.syncUniforms[this.shader.program.id] = this.cache[e], t.syncUniforms[this.shader.program.id]
            }, e.prototype.getSignature = function (t, e) {
                var r = t.uniforms, i = [];
                for (var n in r) i.push(n), e[n] && i.push(e[n].type);
                return i.join("-")
            }, e.prototype.getglProgram = function () {
                return this.shader ? this.shader.program.glPrograms[this.renderer.CONTEXT_UID] : null
            }, e.prototype.generateShader = function (t) {
                var e = this.gl, r = t.program, i = {};
                for (var n in r.attributeData) i[n] = r.attributeData[n].location;
                var o = vi(e, r.vertexSrc, r.fragmentSrc, i), s = {};
                for (var n in r.uniformData) {
                    var a = r.uniformData[n];
                    s[n] = {location: e.getUniformLocation(o, n), value: gi(a.type, a.size)}
                }
                var h = new nn(o, s);
                return r.glPrograms[this.renderer.CONTEXT_UID] = h, h
            }, e.prototype.reset = function () {
                this.program = null, this.shader = null
            }, e.prototype.destroy = function () {
                this.destroyed = !0
            }, e
        }(Dr), hn = 0, un = 1, ln = 2, cn = 3, dn = 4, fn = 5, pn = function (e) {
            function r(r) {
                var i = e.call(this, r) || this;
                return i.gl = null, i.stateId = 0, i.polygonOffset = 0, i.blendMode = t.BLEND_MODES.NONE, i._blendEq = !1, i.map = [], i.map[hn] = i.setBlend, i.map[un] = i.setOffset, i.map[ln] = i.setCullFace, i.map[cn] = i.setDepthTest, i.map[dn] = i.setFrontFace, i.map[fn] = i.setDepthMask, i.checks = [], i.defaultState = new ki, i.defaultState.blend = !0, i
            }

            return vr(r, e), r.prototype.contextChange = function (e) {
                this.gl = e, this.blendModes = function (e, r) {
                    return void 0 === r && (r = []), r[t.BLEND_MODES.NORMAL] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], r[t.BLEND_MODES.ADD] = [e.ONE, e.ONE], r[t.BLEND_MODES.MULTIPLY] = [e.DST_COLOR, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA], r[t.BLEND_MODES.SCREEN] = [e.ONE, e.ONE_MINUS_SRC_COLOR, e.ONE, e.ONE_MINUS_SRC_ALPHA], r[t.BLEND_MODES.OVERLAY] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], r[t.BLEND_MODES.DARKEN] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], r[t.BLEND_MODES.LIGHTEN] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], r[t.BLEND_MODES.COLOR_DODGE] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], r[t.BLEND_MODES.COLOR_BURN] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], r[t.BLEND_MODES.HARD_LIGHT] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], r[t.BLEND_MODES.SOFT_LIGHT] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], r[t.BLEND_MODES.DIFFERENCE] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], r[t.BLEND_MODES.EXCLUSION] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], r[t.BLEND_MODES.HUE] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], r[t.BLEND_MODES.SATURATION] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], r[t.BLEND_MODES.COLOR] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], r[t.BLEND_MODES.LUMINOSITY] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], r[t.BLEND_MODES.NONE] = [0, 0], r[t.BLEND_MODES.NORMAL_NPM] = [e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA], r[t.BLEND_MODES.ADD_NPM] = [e.SRC_ALPHA, e.ONE, e.ONE, e.ONE], r[t.BLEND_MODES.SCREEN_NPM] = [e.SRC_ALPHA, e.ONE_MINUS_SRC_COLOR, e.ONE, e.ONE_MINUS_SRC_ALPHA], r[t.BLEND_MODES.SRC_IN] = [e.DST_ALPHA, e.ZERO], r[t.BLEND_MODES.SRC_OUT] = [e.ONE_MINUS_DST_ALPHA, e.ZERO], r[t.BLEND_MODES.SRC_ATOP] = [e.DST_ALPHA, e.ONE_MINUS_SRC_ALPHA], r[t.BLEND_MODES.DST_OVER] = [e.ONE_MINUS_DST_ALPHA, e.ONE], r[t.BLEND_MODES.DST_IN] = [e.ZERO, e.SRC_ALPHA], r[t.BLEND_MODES.DST_OUT] = [e.ZERO, e.ONE_MINUS_SRC_ALPHA], r[t.BLEND_MODES.DST_ATOP] = [e.ONE_MINUS_DST_ALPHA, e.SRC_ALPHA], r[t.BLEND_MODES.XOR] = [e.ONE_MINUS_DST_ALPHA, e.ONE_MINUS_SRC_ALPHA], r[t.BLEND_MODES.SUBTRACT] = [e.ONE, e.ONE, e.ONE, e.ONE, e.FUNC_REVERSE_SUBTRACT, e.FUNC_ADD], r
                }(e), this.set(this.defaultState), this.reset()
            }, r.prototype.set = function (t) {
                if (t = t || this.defaultState, this.stateId !== t.data) {
                    for (var e = this.stateId ^ t.data, r = 0; e;) 1 & e && this.map[r].call(this, !!(t.data & 1 << r)), e >>= 1, r++;
                    this.stateId = t.data
                }
                for (r = 0; r < this.checks.length; r++) this.checks[r](this, t)
            }, r.prototype.forceState = function (t) {
                t = t || this.defaultState;
                for (var e = 0; e < this.map.length; e++) this.map[e].call(this, !!(t.data & 1 << e));
                for (e = 0; e < this.checks.length; e++) this.checks[e](this, t);
                this.stateId = t.data
            }, r.prototype.setBlend = function (t) {
                this.updateCheck(r.checkBlendMode, t), this.gl[t ? "enable" : "disable"](this.gl.BLEND)
            }, r.prototype.setOffset = function (t) {
                this.updateCheck(r.checkPolygonOffset, t), this.gl[t ? "enable" : "disable"](this.gl.POLYGON_OFFSET_FILL)
            }, r.prototype.setDepthTest = function (t) {
                this.gl[t ? "enable" : "disable"](this.gl.DEPTH_TEST)
            }, r.prototype.setDepthMask = function (t) {
                this.gl.depthMask(t)
            }, r.prototype.setCullFace = function (t) {
                this.gl[t ? "enable" : "disable"](this.gl.CULL_FACE)
            }, r.prototype.setFrontFace = function (t) {
                this.gl.frontFace(this.gl[t ? "CW" : "CCW"])
            }, r.prototype.setBlendMode = function (t) {
                if (t !== this.blendMode) {
                    this.blendMode = t;
                    var e = this.blendModes[t], r = this.gl;
                    2 === e.length ? r.blendFunc(e[0], e[1]) : r.blendFuncSeparate(e[0], e[1], e[2], e[3]), 6 === e.length ? (this._blendEq = !0, r.blendEquationSeparate(e[4], e[5])) : this._blendEq && (this._blendEq = !1, r.blendEquationSeparate(r.FUNC_ADD, r.FUNC_ADD))
                }
            }, r.prototype.setPolygonOffset = function (t, e) {
                this.gl.polygonOffset(t, e)
            }, r.prototype.reset = function () {
                this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1), this.forceState(this.defaultState), this._blendEq = !0, this.blendMode = -1, this.setBlendMode(0)
            }, r.prototype.updateCheck = function (t, e) {
                var r = this.checks.indexOf(t);
                e && -1 === r ? this.checks.push(t) : e || -1 === r || this.checks.splice(r, 1)
            }, r.checkBlendMode = function (t, e) {
                t.setBlendMode(e.blendMode)
            }, r.checkPolygonOffset = function (t, e) {
                t.setPolygonOffset(1, e.polygonOffset)
            }, r
        }(Dr), _n = function (e) {
            function r(t) {
                var r = e.call(this, t) || this;
                return r.count = 0, r.checkCount = 0, r.maxIdle = B.GC_MAX_IDLE, r.checkCountMax = B.GC_MAX_CHECK_COUNT, r.mode = B.GC_MODE, r
            }

            return vr(r, e), r.prototype.postrender = function () {
                this.renderer.renderingToScreen && (this.count++, this.mode !== t.GC_MODES.MANUAL && (this.checkCount++, this.checkCount > this.checkCountMax && (this.checkCount = 0, this.run())))
            }, r.prototype.run = function () {
                for (var t = this.renderer.texture, e = t.managedTextures, r = !1, i = 0; i < e.length; i++) {
                    var n = e[i];
                    !n.framebuffer && this.count - n.touched > this.maxIdle && (t.destroyTexture(n, !0), e[i] = null, r = !0)
                }
                if (r) {
                    var o = 0;
                    for (i = 0; i < e.length; i++) null !== e[i] && (e[o++] = e[i]);
                    e.length = o
                }
            }, r.prototype.unload = function (t) {
                var e = this.renderer.texture, r = t._texture;
                r && !r.framebuffer && e.destroyTexture(r);
                for (var i = t.children.length - 1; i >= 0; i--) this.unload(t.children[i])
            }, r
        }(Dr), mn = function (t) {
            this.texture = t, this.width = -1, this.height = -1, this.dirtyId = -1, this.dirtyStyleId = -1, this.mipmap = !1, this.wrapMode = 33071, this.type = 6408, this.internalFormat = 5121
        }, vn = function (e) {
            function r(t) {
                var r = e.call(this, t) || this;
                return r.boundTextures = [], r.currentLocation = -1, r.managedTextures = [], r._unknownBoundTextures = !1, r.unknownTexture = new Tr, r
            }

            return vr(r, e), r.prototype.contextChange = function () {
                var t = this.gl = this.renderer.gl;
                this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.webGLVersion = this.renderer.context.webGLVersion;
                var e = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS);
                this.boundTextures.length = e;
                for (var r = 0; r < e; r++) this.boundTextures[r] = null;
                this.emptyTextures = {};
                var i = new mn(t.createTexture());
                for (t.bindTexture(t.TEXTURE_2D, i.texture), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, new Uint8Array(4)), this.emptyTextures[t.TEXTURE_2D] = i, this.emptyTextures[t.TEXTURE_CUBE_MAP] = new mn(t.createTexture()), t.bindTexture(t.TEXTURE_CUBE_MAP, this.emptyTextures[t.TEXTURE_CUBE_MAP].texture), r = 0; r < 6; r++) t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + r, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, null);
                for (t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MIN_FILTER, t.LINEAR), r = 0; r < this.boundTextures.length; r++) this.bind(null, r)
            }, r.prototype.bind = function (t, e) {
                void 0 === e && (e = 0);
                var r = this.gl;
                if (t) {
                    if ((t = t.castToBaseTexture()).parentTextureArray) return;
                    if (t.valid) {
                        t.touched = this.renderer.textureGC.count;
                        var i = t._glTextures[this.CONTEXT_UID] || this.initTexture(t);
                        this.boundTextures[e] !== t && (this.currentLocation !== e && (this.currentLocation = e, r.activeTexture(r.TEXTURE0 + e)), r.bindTexture(t.target, i.texture)), i.dirtyId !== t.dirtyId && (this.currentLocation !== e && (this.currentLocation = e, r.activeTexture(r.TEXTURE0 + e)), this.updateTexture(t)), this.boundTextures[e] = t
                    }
                } else this.currentLocation !== e && (this.currentLocation = e, r.activeTexture(r.TEXTURE0 + e)), r.bindTexture(r.TEXTURE_2D, this.emptyTextures[r.TEXTURE_2D].texture), this.boundTextures[e] = null
            }, r.prototype.reset = function () {
                this._unknownBoundTextures = !0, this.currentLocation = -1;
                for (var t = 0; t < this.boundTextures.length; t++) this.boundTextures[t] = this.unknownTexture
            }, r.prototype.unbind = function (t) {
                var e = this.gl, r = this.boundTextures;
                if (this._unknownBoundTextures) {
                    this._unknownBoundTextures = !1;
                    for (var i = 0; i < r.length; i++) r[i] === this.unknownTexture && this.bind(null, i)
                }
                for (i = 0; i < r.length; i++) r[i] === t && (this.currentLocation !== i && (e.activeTexture(e.TEXTURE0 + i), this.currentLocation = i), e.bindTexture(t.target, this.emptyTextures[t.target].texture), r[i] = null)
            }, r.prototype.initTexture = function (t) {
                var e = new mn(this.gl.createTexture());
                return e.dirtyId = -1, t._glTextures[this.CONTEXT_UID] = e, this.managedTextures.push(t), t.on("dispose", this.destroyTexture, this), e
            }, r.prototype.initTextureType = function (e, r) {
                if (r.internalFormat = e.format, r.type = e.type, 2 === this.webGLVersion) {
                    var i = this.renderer.gl;
                    e.type === i.FLOAT && e.format === i.RGBA && (r.internalFormat = i.RGBA32F), e.type === t.TYPES.HALF_FLOAT && (r.type = i.HALF_FLOAT), r.type === i.HALF_FLOAT && e.format === i.RGBA && (r.internalFormat = i.RGBA16F)
                }
            }, r.prototype.updateTexture = function (t) {
                var e = t._glTextures[this.CONTEXT_UID];
                if (e) {
                    var r = this.renderer;
                    if (this.initTextureType(t, e), t.resource && t.resource.upload(r, t, e)) ; else {
                        var i = t.realWidth, n = t.realHeight, o = r.gl;
                        (e.width !== i || e.height !== n || e.dirtyId < 0) && (e.width = i, e.height = n, o.texImage2D(t.target, 0, e.internalFormat, i, n, 0, t.format, e.type, null))
                    }
                    t.dirtyStyleId !== e.dirtyStyleId && this.updateTextureStyle(t), e.dirtyId = t.dirtyId
                }
            }, r.prototype.destroyTexture = function (t, e) {
                var r = this.gl;
                if ((t = t.castToBaseTexture())._glTextures[this.CONTEXT_UID] && (this.unbind(t), r.deleteTexture(t._glTextures[this.CONTEXT_UID].texture), t.off("dispose", this.destroyTexture, this), delete t._glTextures[this.CONTEXT_UID], !e)) {
                    var i = this.managedTextures.indexOf(t);
                    -1 !== i && ae(this.managedTextures, i, 1)
                }
            }, r.prototype.updateTextureStyle = function (e) {
                var r = e._glTextures[this.CONTEXT_UID];
                r && (e.mipmap !== t.MIPMAP_MODES.POW2 && 2 === this.webGLVersion || e.isPowerOfTwo ? r.mipmap = e.mipmap >= 1 : r.mipmap = !1, 2 === this.webGLVersion || e.isPowerOfTwo ? r.wrapMode = e.wrapMode : r.wrapMode = t.WRAP_MODES.CLAMP, e.resource && e.resource.style(this.renderer, e, r) || this.setStyle(e, r), r.dirtyStyleId = e.dirtyStyleId)
            }, r.prototype.setStyle = function (e, r) {
                var i = this.gl;
                if (r.mipmap && e.mipmap !== t.MIPMAP_MODES.ON_MANUAL && i.generateMipmap(e.target), i.texParameteri(e.target, i.TEXTURE_WRAP_S, r.wrapMode), i.texParameteri(e.target, i.TEXTURE_WRAP_T, r.wrapMode), r.mipmap) {
                    i.texParameteri(e.target, i.TEXTURE_MIN_FILTER, e.scaleMode === t.SCALE_MODES.LINEAR ? i.LINEAR_MIPMAP_LINEAR : i.NEAREST_MIPMAP_NEAREST);
                    var n = this.renderer.context.extensions.anisotropicFiltering;
                    if (n && e.anisotropicLevel > 0 && e.scaleMode === t.SCALE_MODES.LINEAR) {
                        var o = Math.min(e.anisotropicLevel, i.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
                        i.texParameterf(e.target, n.TEXTURE_MAX_ANISOTROPY_EXT, o)
                    }
                } else i.texParameteri(e.target, i.TEXTURE_MIN_FILTER, e.scaleMode === t.SCALE_MODES.LINEAR ? i.LINEAR : i.NEAREST);
                i.texParameteri(e.target, i.TEXTURE_MAG_FILTER, e.scaleMode === t.SCALE_MODES.LINEAR ? i.LINEAR : i.NEAREST)
            }, r
        }(Dr), yn = {
            __proto__: null,
            FilterSystem: ni,
            BatchSystem: si,
            ContextSystem: hi,
            FramebufferSystem: ci,
            GeometrySystem: pi,
            MaskSystem: qi,
            ScissorSystem: Zi,
            StencilSystem: Ji,
            ProjectionSystem: Qi,
            RenderTextureSystem: en,
            ShaderSystem: an,
            StateSystem: pn,
            TextureGCSystem: _n,
            TextureSystem: vn
        }, gn = new De, En = function (e) {
            function r(r, i) {
                void 0 === r && (r = t.RENDERER_TYPE.UNKNOWN);
                var n = e.call(this) || this;
                return i = Object.assign({}, B.RENDER_OPTIONS, i), n.options = i, n.type = r, n.screen = new Se(0, 0, i.width, i.height), n.view = i.view || document.createElement("canvas"), n.resolution = i.resolution || B.RESOLUTION, n.useContextAlpha = i.useContextAlpha, n.autoDensity = !!i.autoDensity, n.preserveDrawingBuffer = i.preserveDrawingBuffer, n.clearBeforeRender = i.clearBeforeRender, n._backgroundColor = 0, n._backgroundColorRgba = [0, 0, 0, 1], n._backgroundColorString = "#000000", n.backgroundColor = i.backgroundColor || n._backgroundColor, n.backgroundAlpha = i.backgroundAlpha, void 0 !== i.transparent && (n.useContextAlpha = i.transparent, n.backgroundAlpha = i.transparent ? 0 : 1), n._lastObjectRendered = null, n.plugins = {}, n
            }

            return vr(r, e), r.prototype.initPlugins = function (t) {
                for (var e in t) this.plugins[e] = new t[e](this)
            }, Object.defineProperty(r.prototype, "width", {
                get: function () {
                    return this.view.width
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(r.prototype, "height", {
                get: function () {
                    return this.view.height
                }, enumerable: !1, configurable: !0
            }), r.prototype.resize = function (t, e) {
                this.screen.width = t, this.screen.height = e, this.view.width = t * this.resolution, this.view.height = e * this.resolution, this.autoDensity && (this.view.style.width = t + "px", this.view.style.height = e + "px"), this.emit("resize", t, e)
            }, r.prototype.generateTexture = function (t, e, r, i) {
                0 === (i = i || t.getLocalBounds(null, !0)).width && (i.width = 1), 0 === i.height && (i.height = 1);
                var n = Xr.create({width: 0 | i.width, height: 0 | i.height, scaleMode: e, resolution: r});
                return gn.tx = -i.x, gn.ty = -i.y, this.render(t, {renderTexture: n, clear: !1, transform: gn, skipUpdateTransform: !!t.parent}), n
            }, r.prototype.destroy = function (e) {
                for (var r in this.plugins) this.plugins[r].destroy(), this.plugins[r] = null;
                e && this.view.parentNode && this.view.parentNode.removeChild(this.view), this.plugins = null, this.type = t.RENDERER_TYPE.UNKNOWN, this.view = null, this.screen = null, this._tempDisplayObjectParent = null, this.options = null, this._backgroundColorRgba = null, this._backgroundColorString = null, this._lastObjectRendered = null
            }, Object.defineProperty(r.prototype, "backgroundColor", {
                get: function () {
                    return this._backgroundColor
                }, set: function (t) {
                    this._backgroundColor = t, this._backgroundColorString = qt(t), Wt(t, this._backgroundColorRgba)
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(r.prototype, "backgroundAlpha", {
                get: function () {
                    return this._backgroundColorRgba[3]
                }, set: function (t) {
                    this._backgroundColorRgba[3] = t
                }, enumerable: !1, configurable: !0
            }), r
        }(k), Tn = function (e) {
            function r(i) {
                var n = e.call(this, t.RENDERER_TYPE.WEBGL, i) || this;
                return i = n.options, n.gl = null, n.CONTEXT_UID = 0, n.runners = {
                    destroy: new fr("destroy"),
                    contextChange: new fr("contextChange"),
                    reset: new fr("reset"),
                    update: new fr("update"),
                    postrender: new fr("postrender"),
                    prerender: new fr("prerender"),
                    resize: new fr("resize")
                }, n.globalUniforms = new ti({projectionMatrix: new De}, !0), n.addSystem(qi, "mask").addSystem(hi, "context").addSystem(pn, "state").addSystem(an, "shader").addSystem(vn, "texture").addSystem(pi, "geometry").addSystem(ci, "framebuffer").addSystem(Zi, "scissor").addSystem(Ji, "stencil").addSystem(Qi, "projection").addSystem(_n, "textureGC").addSystem(ni, "filter").addSystem(en, "renderTexture").addSystem(si, "batch"), n.initPlugins(r.__plugins), i.context ? n.context.initFromContext(i.context) : n.context.initFromOptions({
                    alpha: !!n.useContextAlpha,
                    antialias: i.antialias,
                    premultipliedAlpha: n.useContextAlpha && "notMultiplied" !== n.useContextAlpha,
                    stencil: !0,
                    preserveDrawingBuffer: i.preserveDrawingBuffer,
                    powerPreference: n.options.powerPreference
                }), n.renderingToScreen = !0, Yt(2 === n.context.webGLVersion ? "WebGL 2" : "WebGL 1"), n.resize(n.options.width, n.options.height), n
            }

            return vr(r, e), r.create = function (t) {
                if (Vt()) return new r(t);
                throw new Error('WebGL unsupported in this browser, use "pixi.js-legacy" for fallback canvas2d support.')
            }, r.prototype.addSystem = function (t, e) {
                e || (e = t.name);
                var r = new t(this);
                if (this[e]) throw new Error('Whoops! The name "' + e + '" is already in use');
                for (var i in this[e] = r, this.runners) this.runners[i].add(r);
                return this
            }, r.prototype.render = function (t, e) {
                var r, i, n, o;
                if (e && (e instanceof Xr ? (r = e, i = arguments[2], n = arguments[3], o = arguments[4]) : (r = e.renderTexture, i = e.clear, n = e.transform, o = e.skipUpdateTransform)), this.renderingToScreen = !r, this.runners.prerender.emit(), this.emit("prerender"), this.projection.transform = n, !this.context.isLost) {
                    if (r || (this._lastObjectRendered = t), !o) {
                        var s = t.enableTempParent();
                        t.updateTransform(), t.disableTempParent(s)
                    }
                    this.renderTexture.bind(r), this.batch.currentRenderer.start(), (void 0 !== i ? i : this.clearBeforeRender) && this.renderTexture.clear(), t.render(this), this.batch.currentRenderer.flush(), r && r.baseTexture.update(), this.runners.postrender.emit(), this.projection.transform = null, this.emit("postrender")
                }
            }, r.prototype.resize = function (t, r) {
                e.prototype.resize.call(this, t, r), this.runners.resize.emit(t, r)
            }, r.prototype.reset = function () {
                return this.runners.reset.emit(), this
            }, r.prototype.clear = function () {
                this.renderTexture.bind(), this.renderTexture.clear()
            }, r.prototype.destroy = function (t) {
                for (var r in this.runners.destroy.emit(), this.runners) this.runners[r].destroy();
                e.prototype.destroy.call(this, t), this.gl = null
            }, Object.defineProperty(r.prototype, "extract", {
                get: function () {
                    return this.plugins.extract
                }, enumerable: !1, configurable: !0
            }), r.registerPlugin = function (t, e) {
                r.__plugins = r.__plugins || {}, r.__plugins[t] = e
            }, r
        }(En);

    function bn(t) {
        return Tn.create(t)
    }

    var xn = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",
        An = "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n",
        Sn = function () {
            this.texArray = null, this.blend = 0, this.type = t.DRAW_MODES.TRIANGLES, this.start = 0, this.size = 0, this.data = null
        }, On = function () {
            function t() {
                this.elements = [], this.ids = [], this.count = 0
            }

            return t.prototype.clear = function () {
                for (var t = 0; t < this.count; t++) this.elements[t] = null;
                this.count = 0
            }, t
        }(), Rn = function () {
            function t(t) {
                "number" == typeof t ? this.rawBinaryData = new ArrayBuffer(t) : t instanceof Uint8Array ? this.rawBinaryData = t.buffer : this.rawBinaryData = t, this.uint32View = new Uint32Array(this.rawBinaryData), this.float32View = new Float32Array(this.rawBinaryData)
            }

            return Object.defineProperty(t.prototype, "int8View", {
                get: function () {
                    return this._int8View || (this._int8View = new Int8Array(this.rawBinaryData)), this._int8View
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(t.prototype, "uint8View", {
                get: function () {
                    return this._uint8View || (this._uint8View = new Uint8Array(this.rawBinaryData)), this._uint8View
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(t.prototype, "int16View", {
                get: function () {
                    return this._int16View || (this._int16View = new Int16Array(this.rawBinaryData)), this._int16View
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(t.prototype, "uint16View", {
                get: function () {
                    return this._uint16View || (this._uint16View = new Uint16Array(this.rawBinaryData)), this._uint16View
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(t.prototype, "int32View", {
                get: function () {
                    return this._int32View || (this._int32View = new Int32Array(this.rawBinaryData)), this._int32View
                }, enumerable: !1, configurable: !0
            }), t.prototype.view = function (t) {
                return this[t + "View"]
            }, t.prototype.destroy = function () {
                this.rawBinaryData = null, this._int8View = null, this._uint8View = null, this._int16View = null, this._uint16View = null, this._int32View = null, this.uint32View = null, this.float32View = null
            }, t.sizeOf = function (t) {
                switch (t) {
                    case"int8":
                    case"uint8":
                        return 1;
                    case"int16":
                    case"uint16":
                        return 2;
                    case"int32":
                    case"uint32":
                    case"float32":
                        return 4;
                    default:
                        throw new Error(t + " isn't a valid view type")
                }
            }, t
        }(), Pn = function (e) {
            function r(t) {
                var r = e.call(this, t) || this;
                return r.shaderGenerator = null, r.geometryClass = null, r.vertexSize = null, r.state = ki.for2d(), r.size = 4 * B.SPRITE_BATCH_SIZE, r._vertexCount = 0, r._indexCount = 0, r._bufferedElements = [], r._bufferedTextures = [], r._bufferSize = 0, r._shader = null, r._packedGeometries = [], r._packedGeometryPoolSize = 2, r._flushId = 0, r._aBuffers = {}, r._iBuffers = {}, r.MAX_TEXTURES = 1, r.renderer.on("prerender", r.onPrerender, r), t.runners.contextChange.add(r), r._dcIndex = 0, r._aIndex = 0, r._iIndex = 0, r._attributeBuffer = null, r._indexBuffer = null, r._tempBoundTextures = [], r
            }

            return vr(r, e), r.prototype.contextChange = function () {
                var e = this.renderer.gl;
                B.PREFER_ENV === t.ENV.WEBGL_LEGACY ? this.MAX_TEXTURES = 1 : (this.MAX_TEXTURES = Math.min(e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), B.SPRITE_MAX_TEXTURES), this.MAX_TEXTURES = Fi(this.MAX_TEXTURES, e)), this._shader = this.shaderGenerator.generateShader(this.MAX_TEXTURES);
                for (var r = 0; r < this._packedGeometryPoolSize; r++) this._packedGeometries[r] = new this.geometryClass;
                this.initFlushBuffers()
            }, r.prototype.initFlushBuffers = function () {
                for (var t = r._drawCallPool, e = r._textureArrayPool, i = this.size / 4, n = Math.floor(i / this.MAX_TEXTURES) + 1; t.length < i;) t.push(new Sn);
                for (; e.length < n;) e.push(new On);
                for (var o = 0; o < this.MAX_TEXTURES; o++) this._tempBoundTextures[o] = null
            }, r.prototype.onPrerender = function () {
                this._flushId = 0
            }, r.prototype.render = function (t) {
                t._texture.valid && (this._vertexCount + t.vertexData.length / 2 > this.size && this.flush(), this._vertexCount += t.vertexData.length / 2, this._indexCount += t.indices.length, this._bufferedTextures[this._bufferSize] = t._texture.baseTexture, this._bufferedElements[this._bufferSize++] = t)
            }, r.prototype.buildTexturesAndDrawCalls = function () {
                var t = this._bufferedTextures, e = this.MAX_TEXTURES, i = r._textureArrayPool, n = this.renderer.batch, o = this._tempBoundTextures, s = this.renderer.textureGC.count,
                    a = ++Tr._globalBatch, h = 0, u = i[0], l = 0;
                n.copyBoundTextures(o, e);
                for (var c = 0; c < this._bufferSize; ++c) {
                    var d = t[c];
                    t[c] = null, d._batchEnabled !== a && (u.count >= e && (n.boundArray(u, o, a, e), this.buildDrawCalls(u, l, c), l = c, u = i[++h], ++a), d._batchEnabled = a, d.touched = s, u.elements[u.count++] = d)
                }
                for (u.count > 0 && (n.boundArray(u, o, a, e), this.buildDrawCalls(u, l, this._bufferSize), ++h, ++a), c = 0; c < o.length; c++) o[c] = null;
                Tr._globalBatch = a
            }, r.prototype.buildDrawCalls = function (t, e, i) {
                var n = this._bufferedElements, o = this._attributeBuffer, s = this._indexBuffer, a = this.vertexSize, h = r._drawCallPool, u = this._dcIndex, l = this._aIndex,
                    c = this._iIndex, d = h[u];
                d.start = this._iIndex, d.texArray = t;
                for (var f = e; f < i; ++f) {
                    var p = n[f], _ = p._texture.baseTexture, m = Zt[_.alphaMode ? 1 : 0][p.blendMode];
                    n[f] = null, e < f && d.blend !== m && (d.size = c - d.start, e = f, (d = h[++u]).texArray = t, d.start = c), this.packInterleavedGeometry(p, o, s, l, c), l += p.vertexData.length / 2 * a, c += p.indices.length, d.blend = m
                }
                e < i && (d.size = c - d.start, ++u), this._dcIndex = u, this._aIndex = l, this._iIndex = c
            }, r.prototype.bindAndClearTexArray = function (t) {
                for (var e = this.renderer.texture, r = 0; r < t.count; r++) e.bind(t.elements[r], t.ids[r]), t.elements[r] = null;
                t.count = 0
            }, r.prototype.updateGeometry = function () {
                var t = this._packedGeometries, e = this._attributeBuffer, r = this._indexBuffer;
                B.CAN_UPLOAD_SAME_BUFFER ? (t[this._flushId]._buffer.update(e.rawBinaryData), t[this._flushId]._indexBuffer.update(r), this.renderer.geometry.updateBuffers()) : (this._packedGeometryPoolSize <= this._flushId && (this._packedGeometryPoolSize++, t[this._flushId] = new this.geometryClass), t[this._flushId]._buffer.update(e.rawBinaryData), t[this._flushId]._indexBuffer.update(r), this.renderer.geometry.bind(t[this._flushId]), this.renderer.geometry.updateBuffers(), this._flushId++)
            }, r.prototype.drawBatches = function () {
                for (var t = this._dcIndex, e = this.renderer, i = e.gl, n = e.state, o = r._drawCallPool, s = null, a = 0; a < t; a++) {
                    var h = o[a], u = h.texArray, l = h.type, c = h.size, d = h.start, f = h.blend;
                    s !== u && (s = u, this.bindAndClearTexArray(u)), this.state.blendMode = f, n.set(this.state), i.drawElements(l, c, i.UNSIGNED_SHORT, 2 * d)
                }
            }, r.prototype.flush = function () {
                0 !== this._vertexCount && (this._attributeBuffer = this.getAttributeBuffer(this._vertexCount), this._indexBuffer = this.getIndexBuffer(this._indexCount), this._aIndex = 0, this._iIndex = 0, this._dcIndex = 0, this.buildTexturesAndDrawCalls(), this.updateGeometry(), this.drawBatches(), this._bufferSize = 0, this._vertexCount = 0, this._indexCount = 0)
            }, r.prototype.start = function () {
                this.renderer.state.set(this.state), this.renderer.shader.bind(this._shader), B.CAN_UPLOAD_SAME_BUFFER && this.renderer.geometry.bind(this._packedGeometries[this._flushId])
            }, r.prototype.stop = function () {
                this.flush()
            }, r.prototype.destroy = function () {
                for (var t = 0; t < this._packedGeometryPoolSize; t++) this._packedGeometries[t] && this._packedGeometries[t].destroy();
                this.renderer.off("prerender", this.onPrerender, this), this._aBuffers = null, this._iBuffers = null, this._packedGeometries = null, this._attributeBuffer = null, this._indexBuffer = null, this._shader && (this._shader.destroy(), this._shader = null), e.prototype.destroy.call(this)
            }, r.prototype.getAttributeBuffer = function (t) {
                var e = ne(Math.ceil(t / 8)), r = se(e), i = 8 * e;
                this._aBuffers.length <= r && (this._iBuffers.length = r + 1);
                var n = this._aBuffers[i];
                return n || (this._aBuffers[i] = n = new Rn(i * this.vertexSize * 4)), n
            }, r.prototype.getIndexBuffer = function (t) {
                var e = ne(Math.ceil(t / 12)), r = se(e), i = 12 * e;
                this._iBuffers.length <= r && (this._iBuffers.length = r + 1);
                var n = this._iBuffers[r];
                return n || (this._iBuffers[r] = n = new Uint16Array(i)), n
            }, r.prototype.packInterleavedGeometry = function (t, e, r, i, n) {
                for (var o = e.uint32View, s = e.float32View, a = i / this.vertexSize, h = t.uvs, u = t.indices, l = t.vertexData, c = t._texture.baseTexture._batchLocation, d = Math.min(t.worldAlpha, 1), f = d < 1 && t._texture.baseTexture.alphaMode ? $t(t._tintRGB, d) : t._tintRGB + (255 * d << 24), p = 0; p < l.length; p += 2) s[i++] = l[p], s[i++] = l[p + 1], s[i++] = h[p], s[i++] = h[p + 1], o[i++] = f, s[i++] = c;
                for (p = 0; p < u.length; p++) r[n++] = a + u[p]
            }, r._drawCallPool = [], r._textureArrayPool = [], r
        }(oi), In = function () {
            function t(t, e) {
                if (this.vertexSrc = t, this.fragTemplate = e, this.programCache = {}, this.defaultGroupCache = {}, e.indexOf("%count%") < 0) throw new Error('Fragment template must contain "%count%".');
                if (e.indexOf("%forloop%") < 0) throw new Error('Fragment template must contain "%forloop%".')
            }

            return t.prototype.generateShader = function (t) {
                if (!this.programCache[t]) {
                    for (var e = new Int32Array(t), r = 0; r < t; r++) e[r] = r;
                    this.defaultGroupCache[t] = ti.from({uSamplers: e}, !0);
                    var i = this.fragTemplate;
                    i = (i = i.replace(/%count%/gi, "" + t)).replace(/%forloop%/gi, this.generateSampleSrc(t)), this.programCache[t] = new Gi(this.vertexSrc, i)
                }
                var n = {tint: new Float32Array([1, 1, 1, 1]), translationMatrix: new De, default: this.defaultGroupCache[t]};
                return new Xi(this.programCache[t], n)
            }, t.prototype.generateSampleSrc = function (t) {
                var e = "";
                e += "\n", e += "\n";
                for (var r = 0; r < t; r++) r > 0 && (e += "\nelse "), r < t - 1 && (e += "if(vTextureId < " + r + ".5)"), e += "\n{", e += "\n\tcolor = texture2D(uSamplers[" + r + "], vTextureCoord);", e += "\n}";
                return (e += "\n") + "\n"
            }, t
        }(), Mn = function (e) {
            function r(r) {
                void 0 === r && (r = !1);
                var i = e.call(this) || this;
                return i._buffer = new Yr(null, r, !1), i._indexBuffer = new Yr(null, r, !0), i.addAttribute("aVertexPosition", i._buffer, 2, !1, t.TYPES.FLOAT).addAttribute("aTextureCoord", i._buffer, 2, !1, t.TYPES.FLOAT).addAttribute("aColor", i._buffer, 4, !0, t.TYPES.UNSIGNED_BYTE).addAttribute("aTextureId", i._buffer, 1, !0, t.TYPES.FLOAT).addIndex(i._indexBuffer), i
            }

            return vr(r, e), r
        }(Zr),
        wn = "precision highp float;\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform vec4 tint;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vTextureId = aTextureId;\n    vColor = aColor * tint;\n}\n",
        Dn = "varying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\nuniform sampler2D uSamplers[%count%];\n\nvoid main(void){\n    vec4 color;\n    %forloop%\n    gl_FragColor = color * vColor;\n}\n",
        Cn = function () {
            function t() {
            }

            return t.create = function (t) {
                var e = Object.assign({vertex: wn, fragment: Dn, geometryClass: Mn, vertexSize: 6}, t), r = e.vertex, i = e.fragment, n = e.vertexSize, o = e.geometryClass;
                return function (t) {
                    function e(e) {
                        var s = t.call(this, e) || this;
                        return s.shaderGenerator = new In(r, i), s.geometryClass = o, s.vertexSize = n, s
                    }

                    return vr(e, t), e
                }(Pn)
            }, Object.defineProperty(t, "defaultVertexSrc", {
                get: function () {
                    return wn
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(t, "defaultFragmentTemplate", {
                get: function () {
                    return Dn
                }, enumerable: !1, configurable: !0
            }), t
        }(), Nn = Cn.create(), Ln = {}, Fn = function (t) {
            Object.defineProperty(Ln, t, {
                get: function () {
                    return wr[t]
                }
            })
        };
    for (var Bn in wr) Fn(Bn);
    var Un = {}, Gn = function (t) {
        Object.defineProperty(Un, t, {
            get: function () {
                return yn[t]
            }
        })
    };
    for (var Bn in yn) Gn(Bn);
    var Xn = function () {
        function t(e) {
            var r = this;
            this.stage = new qe, e = Object.assign({forceCanvas: !1}, e), this.renderer = bn(e), t._plugins.forEach(function (t) {
                t.init.call(r, e)
            })
        }

        return t.registerPlugin = function (e) {
            t._plugins.push(e)
        }, t.prototype.render = function () {
            this.renderer.render(this.stage)
        }, Object.defineProperty(t.prototype, "view", {
            get: function () {
                return this.renderer.view
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "screen", {
            get: function () {
                return this.renderer.screen
            }, enumerable: !1, configurable: !0
        }), t.prototype.destroy = function (e, r) {
            var i = this, n = t._plugins.slice(0);
            n.reverse(), n.forEach(function (t) {
                t.destroy.call(i)
            }), this.stage.destroy(r), this.stage = null, this.renderer.destroy(e), this.renderer = null
        }, t._plugins = [], t
    }(), kn = function () {
        function t() {
        }

        return t.init = function (t) {
            var e = this;
            Object.defineProperty(this, "resizeTo", {
                set: function (t) {
                    self.removeEventListener("resize", this.queueResize), this._resizeTo = t, t && (self.addEventListener("resize", this.queueResize), this.resize())
                }, get: function () {
                    return this._resizeTo
                }
            }), this.queueResize = function () {
                e._resizeTo && (e.cancelResize(), e._resizeId = requestAnimationFrame(function () {
                    return e.resize()
                }))
            }, this.cancelResize = function () {
                e._resizeId && (cancelAnimationFrame(e._resizeId), e._resizeId = null)
            }, this.resize = function () {
                if (e._resizeTo) {
                    var t, r;
                    if (e.cancelResize(), e._resizeTo === self) t = self.innerWidth, r = self.innerHeight; else {
                        var i = e._resizeTo;
                        t = i.clientWidth, r = i.clientHeight
                    }
                    e.renderer.resize(t, r)
                }
            }, this._resizeId = null, this._resizeTo = null, this.resizeTo = t.resizeTo || null
        }, t.destroy = function () {
            self.removeEventListener("resize", this.queueResize), this.cancelResize(), this.cancelResize = null, this.queueResize = null, this.resizeTo = null, this.resize = null
        }, t
    }();
    Xn.registerPlugin(kn);
    var jn = new Se, Hn = function () {
        function t(t) {
            this.renderer = t
        }

        return t.prototype.image = function (t, e, r) {
            var i = new Image;
            return i.src = this.base64(t, e, r), i
        }, t.prototype.base64 = function (t, e, r) {
            return this.canvas(t).toDataURL(e, r)
        }, t.prototype.canvas = function (e) {
            var r, i, n, o = this.renderer, s = !1, a = !1;
            e && (e instanceof Xr ? n = e : (n = this.renderer.generateTexture(e), a = !0)), n ? (r = n.baseTexture.resolution, i = n.frame, s = !1, o.renderTexture.bind(n)) : (r = this.renderer.resolution, s = !0, (i = jn).width = this.renderer.width, i.height = this.renderer.height, o.renderTexture.bind(null));
            var h = Math.floor(i.width * r + 1e-4), u = Math.floor(i.height * r + 1e-4), l = new _e(h, u, 1), c = new Uint8Array(4 * h * u), d = o.gl;
            d.readPixels(i.x * r, i.y * r, h, u, d.RGBA, d.UNSIGNED_BYTE, c);
            var f = l.context.getImageData(0, 0, h, u);
            if (t.arrayPostDivide(c, f.data), l.context.putImageData(f, 0, 0), s) {
                var p = new _e(l.width, l.height, 1);
                p.context.scale(1, -1), p.context.drawImage(l.canvas, 0, -u), l.destroy(), l = p
            }
            return a && n.destroy(!0), l.canvas
        }, t.prototype.pixels = function (e) {
            var r, i, n, o = this.renderer, s = !1;
            e && (e instanceof Xr ? n = e : (n = this.renderer.generateTexture(e), s = !0)), n ? (r = n.baseTexture.resolution, i = n.frame, o.renderTexture.bind(n)) : (r = o.resolution, (i = jn).width = o.width, i.height = o.height, o.renderTexture.bind(null));
            var a = i.width * r, h = i.height * r, u = new Uint8Array(4 * a * h), l = o.gl;
            return l.readPixels(i.x * r, i.y * r, a, h, l.RGBA, l.UNSIGNED_BYTE, u), s && n.destroy(!0), t.arrayPostDivide(u, u), u
        }, t.prototype.destroy = function () {
            this.renderer = null
        }, t.arrayPostDivide = function (t, e) {
            for (var r = 0; r < t.length; r += 4) {
                var i = e[r + 3] = t[r + 3];
                0 !== i ? (e[r] = Math.round(Math.min(255 * t[r] / i, 255)), e[r + 1] = Math.round(Math.min(255 * t[r + 1] / i, 255)), e[r + 2] = Math.round(Math.min(255 * t[r + 2] / i, 255))) : (e[r] = t[r], e[r + 1] = t[r + 1], e[r + 2] = t[r + 2])
            }
        }, t
    }();
    var Yn = function (t, e) {
        if (t) {
            e = e || {};
            for (var r = {
                key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
                q: {name: "queryKey", parser: /(?:^|&)([^&=]*)=?([^&]*)/g},
                parser: {
                    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                }
            }, i = r.parser[e.strictMode ? "strict" : "loose"].exec(t), n = {}, o = 14; o--;) n[r.key[o]] = i[o] || "";
            return n[r.q.name] = {}, n[r.key[12]].replace(r.q.parser, function (t, e, i) {
                e && (n[r.q.name][e] = i)
            }), n
        }
    }, Vn = G(X(function (t, e) {
        Object.defineProperty(e, "__esModule", {value: !0});
        var r = function () {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var i = e[r];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }

            return function (e, r, i) {
                return r && t(e.prototype, r), i && t(e, i), e
            }
        }();

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        var n = function () {
            function t(e, r, n) {
                void 0 === r && (r = !1), i(this, t), this._fn = e, this._once = r, this._thisArg = n, this._next = this._prev = this._owner = null
            }

            return r(t, [{
                key: "detach", value: function () {
                    return null !== this._owner && (this._owner.detach(this), !0)
                }
            }]), t
        }();

        function o(t, e) {
            return t._head ? (t._tail._next = e, e._prev = t._tail, t._tail = e) : (t._head = e, t._tail = e), e._owner = t, e
        }

        var s = function () {
            function t() {
                i(this, t), this._head = this._tail = void 0
            }

            return r(t, [{
                key: "handlers", value: function () {
                    var t = !(arguments.length <= 0 || void 0 === arguments[0]) && arguments[0], e = this._head;
                    if (t) return !!e;
                    for (var r = []; e;) r.push(e), e = e._next;
                    return r
                }
            }, {
                key: "has", value: function (t) {
                    if (!(t instanceof n)) throw new Error("MiniSignal#has(): First arg must be a MiniSignalBinding object.");
                    return t._owner === this
                }
            }, {
                key: "dispatch", value: function () {
                    var t = arguments, e = this._head;
                    if (!e) return !1;
                    for (; e;) e._once && this.detach(e), e._fn.apply(e._thisArg, t), e = e._next;
                    return !0
                }
            }, {
                key: "add", value: function (t) {
                    var e = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];
                    if ("function" != typeof t) throw new Error("MiniSignal#add(): First arg must be a Function.");
                    return o(this, new n(t, !1, e))
                }
            }, {
                key: "once", value: function (t) {
                    var e = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];
                    if ("function" != typeof t) throw new Error("MiniSignal#once(): First arg must be a Function.");
                    return o(this, new n(t, !0, e))
                }
            }, {
                key: "detach", value: function (t) {
                    if (!(t instanceof n)) throw new Error("MiniSignal#detach(): First arg must be a MiniSignalBinding object.");
                    return t._owner !== this ? this : (t._prev && (t._prev._next = t._next), t._next && (t._next._prev = t._prev), t === this._head ? (this._head = t._next, null === t._next && (this._tail = null)) : t === this._tail && (this._tail = t._prev, this._tail._next = null), t._owner = null, this)
                }
            }, {
                key: "detachAll", value: function () {
                    var t = this._head;
                    if (!t) return this;
                    for (this._head = this._tail = null; t;) t._owner = null, t = t._next;
                    return this
                }
            }]), t
        }();
        s.MiniSignalBinding = n, e.default = s, t.exports = e.default
    }));

    function zn() {
    }

    function Wn(t, e, r, i) {
        var n = 0, o = t.length;
        !function s(a) {
            a || n === o ? r && r(a) : i ? setTimeout(function () {
                e(t[n++], s)
            }, 1) : e(t[n++], s)
        }()
    }

    function qn(t) {
        return function () {
            if (null === t) throw new Error("Callback was already called.");
            var e = t;
            t = null, e.apply(this, arguments)
        }
    }

    function Kn(t, e) {
        if (null == e) e = 1; else if (0 === e) throw new Error("Concurrency must not be zero");
        var r = 0, i = {
            _tasks: [], concurrency: e, saturated: zn, unsaturated: zn, buffer: e / 4, empty: zn, drain: zn, error: zn, started: !1, paused: !1, push: function (t, e) {
                n(t, !1, e)
            }, kill: function () {
                r = 0, i.drain = zn, i.started = !1, i._tasks = []
            }, unshift: function (t, e) {
                n(t, !0, e)
            }, process: function () {
                for (; !i.paused && r < i.concurrency && i._tasks.length;) {
                    var e = i._tasks.shift();
                    0 === i._tasks.length && i.empty(), (r += 1) === i.concurrency && i.saturated(), t(e.data, qn(o(e)))
                }
            }, length: function () {
                return i._tasks.length
            }, running: function () {
                return r
            }, idle: function () {
                return i._tasks.length + r === 0
            }, pause: function () {
                !0 !== i.paused && (i.paused = !0)
            }, resume: function () {
                if (!1 !== i.paused) {
                    i.paused = !1;
                    for (var t = 1; t <= i.concurrency; t++) i.process()
                }
            }
        };

        function n(t, e, r) {
            if (null != r && "function" != typeof r) throw new Error("task callback must be a function");
            if (i.started = !0, null == t && i.idle()) setTimeout(function () {
                return i.drain()
            }, 1); else {
                var n = {data: t, callback: "function" == typeof r ? r : zn};
                e ? i._tasks.unshift(n) : i._tasks.push(n), setTimeout(function () {
                    return i.process()
                }, 1)
            }
        }

        function o(t) {
            return function () {
                r -= 1, t.callback.apply(t, arguments), null != arguments[0] && i.error(arguments[0], t.data), r <= i.concurrency - i.buffer && i.unsaturated(), i.idle() && i.drain(), i.process()
            }
        }

        return i
    }

    var Zn = {};

    function Jn(t, e) {
        for (var r = 0; r < e.length; r++) {
            var i = e[r];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    function Qn(t, e, r) {
        return e && Jn(t.prototype, e), r && Jn(t, r), t
    }

    var $n = !(!window.XDomainRequest || "withCredentials" in new XMLHttpRequest), to = null;

    function eo() {
    }

    var ro = function () {
        function t(e, r, i) {
            if ("string" != typeof e || "string" != typeof r) throw new Error("Both name and url are required for constructing a resource.");
            i = i || {}, this._flags = 0, this._setFlag(t.STATUS_FLAGS.DATA_URL, 0 === r.indexOf("data:")), this.name = e, this.url = r, this.extension = this._getExtension(), this.data = null, this.crossOrigin = !0 === i.crossOrigin ? "anonymous" : i.crossOrigin, this.timeout = i.timeout || 0, this.loadType = i.loadType || this._determineLoadType(), this.xhrType = i.xhrType, this.metadata = i.metadata || {}, this.error = null, this.xhr = null, this.children = [], this.type = t.TYPE.UNKNOWN, this.progressChunk = 0, this._dequeue = eo, this._onLoadBinding = null, this._elementTimer = 0, this._boundComplete = this.complete.bind(this), this._boundOnError = this._onError.bind(this), this._boundOnProgress = this._onProgress.bind(this), this._boundOnTimeout = this._onTimeout.bind(this), this._boundXhrOnError = this._xhrOnError.bind(this), this._boundXhrOnTimeout = this._xhrOnTimeout.bind(this), this._boundXhrOnAbort = this._xhrOnAbort.bind(this), this._boundXhrOnLoad = this._xhrOnLoad.bind(this), this.onStart = new Vn, this.onProgress = new Vn, this.onComplete = new Vn, this.onAfterMiddleware = new Vn
        }

        t.setExtensionLoadType = function (e, r) {
            io(t._loadTypeMap, e, r)
        }, t.setExtensionXhrType = function (e, r) {
            io(t._xhrTypeMap, e, r)
        };
        var e = t.prototype;
        return e.complete = function () {
            this._clearEvents(), this._finish()
        }, e.abort = function (e) {
            if (!this.error) {
                if (this.error = new Error(e), this._clearEvents(), this.xhr) this.xhr.abort(); else if (this.xdr) this.xdr.abort(); else if (this.data) if (this.data.src) this.data.src = t.EMPTY_GIF; else for (; this.data.firstChild;) this.data.removeChild(this.data.firstChild);
                this._finish()
            }
        }, e.load = function (e) {
            var r = this;
            if (!this.isLoading) if (this.isComplete) e && setTimeout(function () {
                return e(r)
            }, 1); else switch (e && this.onComplete.once(e), this._setFlag(t.STATUS_FLAGS.LOADING, !0), this.onStart.dispatch(this), !1 !== this.crossOrigin && "string" == typeof this.crossOrigin || (this.crossOrigin = this._determineCrossOrigin(this.url)), this.loadType) {
                case t.LOAD_TYPE.IMAGE:
                    this.type = t.TYPE.IMAGE, this._loadElement("image");
                    break;
                case t.LOAD_TYPE.AUDIO:
                    this.type = t.TYPE.AUDIO, this._loadSourceElement("audio");
                    break;
                case t.LOAD_TYPE.VIDEO:
                    this.type = t.TYPE.VIDEO, this._loadSourceElement("video");
                    break;
                case t.LOAD_TYPE.XHR:
                default:
                    $n && this.crossOrigin ? this._loadXdr() : this._loadXhr()
            }
        }, e._hasFlag = function (t) {
            return 0 != (this._flags & t)
        }, e._setFlag = function (t, e) {
            this._flags = e ? this._flags | t : this._flags & ~t
        }, e._clearEvents = function () {
            clearTimeout(this._elementTimer), this.data && this.data.removeEventListener && (this.data.removeEventListener("error", this._boundOnError, !1), this.data.removeEventListener("load", this._boundComplete, !1), this.data.removeEventListener("progress", this._boundOnProgress, !1), this.data.removeEventListener("canplaythrough", this._boundComplete, !1)), this.xhr && (this.xhr.removeEventListener ? (this.xhr.removeEventListener("error", this._boundXhrOnError, !1), this.xhr.removeEventListener("timeout", this._boundXhrOnTimeout, !1), this.xhr.removeEventListener("abort", this._boundXhrOnAbort, !1), this.xhr.removeEventListener("progress", this._boundOnProgress, !1), this.xhr.removeEventListener("load", this._boundXhrOnLoad, !1)) : (this.xhr.onerror = null, this.xhr.ontimeout = null, this.xhr.onprogress = null, this.xhr.onload = null))
        }, e._finish = function () {
            if (this.isComplete) throw new Error("Complete called again for an already completed resource.");
            this._setFlag(t.STATUS_FLAGS.COMPLETE, !0), this._setFlag(t.STATUS_FLAGS.LOADING, !1), this.onComplete.dispatch(this)
        }, e._loadElement = function (t) {
            this.metadata.loadElement ? this.data = this.metadata.loadElement : "image" === t && void 0 !== window.Image ? this.data = new Image : this.data = document.createElement(t), this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), this.metadata.skipSource || (this.data.src = this.url), this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.timeout && (this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout))
        }, e._loadSourceElement = function (t) {
            if (this.metadata.loadElement ? this.data = this.metadata.loadElement : "audio" === t && void 0 !== window.Audio ? this.data = new Audio : this.data = document.createElement(t), null !== this.data) {
                if (this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), !this.metadata.skipSource) if (navigator.isCocoonJS) this.data.src = Array.isArray(this.url) ? this.url[0] : this.url; else if (Array.isArray(this.url)) for (var e = this.metadata.mimeType, r = 0; r < this.url.length; ++r) this.data.appendChild(this._createSource(t, this.url[r], Array.isArray(e) ? e[r] : e)); else {
                    var i = this.metadata.mimeType;
                    this.data.appendChild(this._createSource(t, this.url, Array.isArray(i) ? i[0] : i))
                }
                this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.data.addEventListener("canplaythrough", this._boundComplete, !1), this.data.load(), this.timeout && (this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout))
            } else this.abort("Unsupported element: " + t)
        }, e._loadXhr = function () {
            "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
            var e = this.xhr = new XMLHttpRequest;
            e.open("GET", this.url, !0), e.timeout = this.timeout, this.xhrType === t.XHR_RESPONSE_TYPE.JSON || this.xhrType === t.XHR_RESPONSE_TYPE.DOCUMENT ? e.responseType = t.XHR_RESPONSE_TYPE.TEXT : e.responseType = this.xhrType, e.addEventListener("error", this._boundXhrOnError, !1), e.addEventListener("timeout", this._boundXhrOnTimeout, !1), e.addEventListener("abort", this._boundXhrOnAbort, !1), e.addEventListener("progress", this._boundOnProgress, !1), e.addEventListener("load", this._boundXhrOnLoad, !1), e.send()
        }, e._loadXdr = function () {
            "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
            var t = this.xhr = new XDomainRequest;
            t.timeout = this.timeout || 5e3, t.onerror = this._boundXhrOnError, t.ontimeout = this._boundXhrOnTimeout, t.onprogress = this._boundOnProgress, t.onload = this._boundXhrOnLoad, t.open("GET", this.url, !0), setTimeout(function () {
                return t.send()
            }, 1)
        }, e._createSource = function (t, e, r) {
            r || (r = t + "/" + this._getExtension(e));
            var i = document.createElement("source");
            return i.src = e, i.type = r, i
        }, e._onError = function (t) {
            this.abort("Failed to load element using: " + t.target.nodeName)
        }, e._onProgress = function (t) {
            t && t.lengthComputable && this.onProgress.dispatch(this, t.loaded / t.total)
        }, e._onTimeout = function () {
            this.abort("Load timed out.")
        }, e._xhrOnError = function () {
            var t = this.xhr;
            this.abort(no(t) + " Request failed. Status: " + t.status + ', text: "' + t.statusText + '"')
        }, e._xhrOnTimeout = function () {
            var t = this.xhr;
            this.abort(no(t) + " Request timed out.")
        }, e._xhrOnAbort = function () {
            var t = this.xhr;
            this.abort(no(t) + " Request was aborted by the user.")
        }, e._xhrOnLoad = function () {
            var e = this.xhr, r = "", i = void 0 === e.status ? 200 : e.status;
            if ("" !== e.responseType && "text" !== e.responseType && void 0 !== e.responseType || (r = e.responseText), 0 === i && (r.length > 0 || e.responseType === t.XHR_RESPONSE_TYPE.BUFFER) ? i = 200 : 1223 === i && (i = 204), 2 === (i / 100 | 0)) {
                if (this.xhrType === t.XHR_RESPONSE_TYPE.TEXT) this.data = r, this.type = t.TYPE.TEXT; else if (this.xhrType === t.XHR_RESPONSE_TYPE.JSON) try {
                    this.data = JSON.parse(r), this.type = t.TYPE.JSON
                } catch (t) {
                    return void this.abort("Error trying to parse loaded json: " + t)
                } else if (this.xhrType === t.XHR_RESPONSE_TYPE.DOCUMENT) try {
                    if (window.DOMParser) {
                        var n = new DOMParser;
                        this.data = n.parseFromString(r, "text/xml")
                    } else {
                        var o = document.createElement("div");
                        o.innerHTML = r, this.data = o
                    }
                    this.type = t.TYPE.XML
                } catch (t) {
                    return void this.abort("Error trying to parse loaded xml: " + t)
                } else this.data = e.response || r;
                this.complete()
            } else this.abort("[" + e.status + "] " + e.statusText + ": " + e.responseURL)
        }, e._determineCrossOrigin = function (t, e) {
            if (0 === t.indexOf("data:")) return "";
            if (window.origin !== window.location.origin) return "anonymous";
            e = e || window.location, to || (to = document.createElement("a")), to.href = t;
            var r = !(t = Yn(to.href, {strictMode: !0})).port && "" === e.port || t.port === e.port, i = t.protocol ? t.protocol + ":" : "";
            return t.host === e.hostname && r && i === e.protocol ? "" : "anonymous"
        }, e._determineXhrType = function () {
            return t._xhrTypeMap[this.extension] || t.XHR_RESPONSE_TYPE.TEXT
        }, e._determineLoadType = function () {
            return t._loadTypeMap[this.extension] || t.LOAD_TYPE.XHR
        }, e._getExtension = function () {
            var t = this.url, e = "";
            if (this.isDataUrl) {
                var r = t.indexOf("/");
                e = t.substring(r + 1, t.indexOf(";", r))
            } else {
                var i = t.indexOf("?"), n = t.indexOf("#"), o = Math.min(i > -1 ? i : t.length, n > -1 ? n : t.length);
                e = (t = t.substring(0, o)).substring(t.lastIndexOf(".") + 1)
            }
            return e.toLowerCase()
        }, e._getMimeFromXhrType = function (e) {
            switch (e) {
                case t.XHR_RESPONSE_TYPE.BUFFER:
                    return "application/octet-binary";
                case t.XHR_RESPONSE_TYPE.BLOB:
                    return "application/blob";
                case t.XHR_RESPONSE_TYPE.DOCUMENT:
                    return "application/xml";
                case t.XHR_RESPONSE_TYPE.JSON:
                    return "application/json";
                case t.XHR_RESPONSE_TYPE.DEFAULT:
                case t.XHR_RESPONSE_TYPE.TEXT:
                default:
                    return "text/plain"
            }
        }, Qn(t, [{
            key: "isDataUrl", get: function () {
                return this._hasFlag(t.STATUS_FLAGS.DATA_URL)
            }
        }, {
            key: "isComplete", get: function () {
                return this._hasFlag(t.STATUS_FLAGS.COMPLETE)
            }
        }, {
            key: "isLoading", get: function () {
                return this._hasFlag(t.STATUS_FLAGS.LOADING)
            }
        }]), t
    }();

    function io(t, e, r) {
        e && 0 === e.indexOf(".") && (e = e.substring(1)), e && (t[e] = r)
    }

    function no(t) {
        return t.toString().replace("object ", "")
    }

    ro.STATUS_FLAGS = {NONE: 0, DATA_URL: 1, COMPLETE: 2, LOADING: 4}, ro.TYPE = {UNKNOWN: 0, JSON: 1, XML: 2, IMAGE: 3, AUDIO: 4, VIDEO: 5, TEXT: 6}, ro.LOAD_TYPE = {
        XHR: 1,
        IMAGE: 2,
        AUDIO: 3,
        VIDEO: 4
    }, ro.XHR_RESPONSE_TYPE = {DEFAULT: "text", BUFFER: "arraybuffer", BLOB: "blob", DOCUMENT: "document", JSON: "json", TEXT: "text"}, ro._loadTypeMap = {
        gif: ro.LOAD_TYPE.IMAGE,
        png: ro.LOAD_TYPE.IMAGE,
        bmp: ro.LOAD_TYPE.IMAGE,
        jpg: ro.LOAD_TYPE.IMAGE,
        jpeg: ro.LOAD_TYPE.IMAGE,
        tif: ro.LOAD_TYPE.IMAGE,
        tiff: ro.LOAD_TYPE.IMAGE,
        webp: ro.LOAD_TYPE.IMAGE,
        tga: ro.LOAD_TYPE.IMAGE,
        svg: ro.LOAD_TYPE.IMAGE,
        "svg+xml": ro.LOAD_TYPE.IMAGE,
        mp3: ro.LOAD_TYPE.AUDIO,
        ogg: ro.LOAD_TYPE.AUDIO,
        wav: ro.LOAD_TYPE.AUDIO,
        mp4: ro.LOAD_TYPE.VIDEO,
        webm: ro.LOAD_TYPE.VIDEO
    }, ro._xhrTypeMap = {
        xhtml: ro.XHR_RESPONSE_TYPE.DOCUMENT,
        html: ro.XHR_RESPONSE_TYPE.DOCUMENT,
        htm: ro.XHR_RESPONSE_TYPE.DOCUMENT,
        xml: ro.XHR_RESPONSE_TYPE.DOCUMENT,
        tmx: ro.XHR_RESPONSE_TYPE.DOCUMENT,
        svg: ro.XHR_RESPONSE_TYPE.DOCUMENT,
        tsx: ro.XHR_RESPONSE_TYPE.DOCUMENT,
        gif: ro.XHR_RESPONSE_TYPE.BLOB,
        png: ro.XHR_RESPONSE_TYPE.BLOB,
        bmp: ro.XHR_RESPONSE_TYPE.BLOB,
        jpg: ro.XHR_RESPONSE_TYPE.BLOB,
        jpeg: ro.XHR_RESPONSE_TYPE.BLOB,
        tif: ro.XHR_RESPONSE_TYPE.BLOB,
        tiff: ro.XHR_RESPONSE_TYPE.BLOB,
        webp: ro.XHR_RESPONSE_TYPE.BLOB,
        tga: ro.XHR_RESPONSE_TYPE.BLOB,
        json: ro.XHR_RESPONSE_TYPE.JSON,
        text: ro.XHR_RESPONSE_TYPE.TEXT,
        txt: ro.XHR_RESPONSE_TYPE.TEXT,
        ttf: ro.XHR_RESPONSE_TYPE.BUFFER,
        otf: ro.XHR_RESPONSE_TYPE.BUFFER
    }, ro.EMPTY_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
    var oo = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var so = window.URL || window.webkitURL;
    var ao = {
        caching: function (t, e) {
            var r = this;
            Zn[t.url] ? (t.data = Zn[t.url], t.complete()) : t.onComplete.once(function () {
                return Zn[r.url] = r.data
            }), e()
        }, parsing: function (t, e) {
            if (t.data) {
                if (t.xhr && t.xhrType === ro.XHR_RESPONSE_TYPE.BLOB) if (window.Blob && "string" != typeof t.data) {
                    if (0 === t.data.type.indexOf("image")) {
                        var r = so.createObjectURL(t.data);
                        return t.blob = t.data, t.data = new Image, t.data.src = r, t.type = ro.TYPE.IMAGE, void (t.data.onload = function () {
                            so.revokeObjectURL(r), t.data.onload = null, e()
                        })
                    }
                } else {
                    var i = t.xhr.getResponseHeader("content-type");
                    if (i && 0 === i.indexOf("image")) return t.data = new Image, t.data.src = "data:" + i + ";base64," + function (t) {
                        for (var e = "", r = 0; r < t.length;) {
                            for (var i = [0, 0, 0], n = [0, 0, 0, 0], o = 0; o < i.length; ++o) r < t.length ? i[o] = 255 & t.charCodeAt(r++) : i[o] = 0;
                            switch (n[0] = i[0] >> 2, n[1] = (3 & i[0]) << 4 | i[1] >> 4, n[2] = (15 & i[1]) << 2 | i[2] >> 6, n[3] = 63 & i[2], r - (t.length - 1)) {
                                case 2:
                                    n[3] = 64, n[2] = 64;
                                    break;
                                case 1:
                                    n[3] = 64
                            }
                            for (var s = 0; s < n.length; ++s) e += oo.charAt(n[s])
                        }
                        return e
                    }(t.xhr.responseText), t.type = ro.TYPE.IMAGE, void (t.data.onload = function () {
                        t.data.onload = null, e()
                    })
                }
                e()
            } else e()
        }
    }, ho = /(#[\w-]+)?$/, uo = function () {
        function t(e, r) {
            var i = this;
            void 0 === e && (e = ""), void 0 === r && (r = 10), this.baseUrl = e, this.progress = 0, this.loading = !1, this.defaultQueryString = "", this._beforeMiddleware = [], this._afterMiddleware = [], this._resourcesParsing = [], this._boundLoadResource = function (t, e) {
                return i._loadResource(t, e)
            }, this._queue = Kn(this._boundLoadResource, r), this._queue.pause(), this.resources = {}, this.onProgress = new Vn, this.onError = new Vn, this.onLoad = new Vn, this.onStart = new Vn, this.onComplete = new Vn;
            for (var n = 0; n < t._defaultBeforeMiddleware.length; ++n) this.pre(t._defaultBeforeMiddleware[n]);
            for (var o = 0; o < t._defaultAfterMiddleware.length; ++o) this.use(t._defaultAfterMiddleware[o])
        }

        var e = t.prototype;
        return e.add = function (t, e, r, i) {
            if (Array.isArray(t)) {
                for (var n = 0; n < t.length; ++n) this.add(t[n]);
                return this
            }
            if ("object" == typeof t && (i = e || t.callback || t.onComplete, r = t, e = t.url, t = t.name || t.key || t.url), "string" != typeof e && (i = r, r = e, e = t), "string" != typeof e) throw new Error("No url passed to add resource to loader.");
            if ("function" == typeof r && (i = r, r = null), this.loading && (!r || !r.parentResource)) throw new Error("Cannot add resources while the loader is running.");
            if (this.resources[t]) throw new Error('Resource named "' + t + '" already exists.');
            if (e = this._prepareUrl(e), this.resources[t] = new ro(t, e, r), "function" == typeof i && this.resources[t].onAfterMiddleware.once(i), this.loading) {
                for (var o = r.parentResource, s = [], a = 0; a < o.children.length; ++a) o.children[a].isComplete || s.push(o.children[a]);
                var h = o.progressChunk * (s.length + 1) / (s.length + 2);
                o.children.push(this.resources[t]), o.progressChunk = h;
                for (var u = 0; u < s.length; ++u) s[u].progressChunk = h;
                this.resources[t].progressChunk = h
            }
            return this._queue.push(this.resources[t]), this
        }, e.pre = function (t) {
            return this._beforeMiddleware.push(t), this
        }, e.use = function (t) {
            return this._afterMiddleware.push(t), this
        }, e.reset = function () {
            for (var t in this.progress = 0, this.loading = !1, this._queue.kill(), this._queue.pause(), this.resources) {
                var e = this.resources[t];
                e._onLoadBinding && e._onLoadBinding.detach(), e.isLoading && e.abort()
            }
            return this.resources = {}, this
        }, e.load = function (t) {
            if ("function" == typeof t && this.onComplete.once(t), this.loading) return this;
            if (this._queue.idle()) this._onStart(), this._onComplete(); else {
                for (var e = 100 / this._queue._tasks.length, r = 0; r < this._queue._tasks.length; ++r) this._queue._tasks[r].data.progressChunk = e;
                this._onStart(), this._queue.resume()
            }
            return this
        }, e._prepareUrl = function (t) {
            var e, r = Yn(t, {strictMode: !0});
            if (e = r.protocol || !r.path || 0 === t.indexOf("//") ? t : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && "/" !== t.charAt(0) ? this.baseUrl + "/" + t : this.baseUrl + t, this.defaultQueryString) {
                var i = ho.exec(e)[0];
                -1 !== (e = e.substr(0, e.length - i.length)).indexOf("?") ? e += "&" + this.defaultQueryString : e += "?" + this.defaultQueryString, e += i
            }
            return e
        }, e._loadResource = function (t, e) {
            var r = this;
            t._dequeue = e, Wn(this._beforeMiddleware, function (e, i) {
                e.call(r, t, function () {
                    i(t.isComplete ? {} : null)
                })
            }, function () {
                t.isComplete ? r._onLoad(t) : (t._onLoadBinding = t.onComplete.once(r._onLoad, r), t.load())
            }, !0)
        }, e._onStart = function () {
            this.progress = 0, this.loading = !0, this.onStart.dispatch(this)
        }, e._onComplete = function () {
            this.progress = 100, this.loading = !1, this.onComplete.dispatch(this, this.resources)
        }, e._onLoad = function (t) {
            var e = this;
            t._onLoadBinding = null, this._resourcesParsing.push(t), t._dequeue(), Wn(this._afterMiddleware, function (r, i) {
                r.call(e, t, i)
            }, function () {
                t.onAfterMiddleware.dispatch(t), e.progress = Math.min(100, e.progress + t.progressChunk), e.onProgress.dispatch(e, t), t.error ? e.onError.dispatch(t.error, e, t) : e.onLoad.dispatch(e, t), e._resourcesParsing.splice(e._resourcesParsing.indexOf(t), 1), e._queue.idle() && 0 === e._resourcesParsing.length && e._onComplete()
            }, !0)
        }, Qn(t, [{
            key: "concurrency", get: function () {
                return this._queue.concurrency
            }, set: function (t) {
                this._queue.concurrency = t
            }
        }]), t
    }();
    uo._defaultBeforeMiddleware = [], uo._defaultAfterMiddleware = [], uo.pre = function (t) {
        return uo._defaultBeforeMiddleware.push(t), uo
    }, uo.use = function (t) {
        return uo._defaultAfterMiddleware.push(t), uo
    };
    var lo = function (t, e) {
        return (lo = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
            t.__proto__ = e
        } || function (t, e) {
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
        })(t, e)
    }, co = function () {
        function t() {
        }

        return t.add = function () {
            ro.setExtensionLoadType("svg", ro.LOAD_TYPE.XHR), ro.setExtensionXhrType("svg", ro.XHR_RESPONSE_TYPE.TEXT)
        }, t.use = function (t, e) {
            if (!t.data || t.type !== ro.TYPE.IMAGE && "svg" !== t.extension) e(); else {
                var r = t.data, i = t.url, n = t.name, o = t.metadata;
                Ur.fromLoader(r, i, n, o).then(function (r) {
                    t.texture = r, e()
                }).catch(e)
            }
        }, t
    }(), fo = function (t) {
        function e(r, i) {
            for (var n = t.call(this, r, i) || this, o = 0; o < e._plugins.length; ++o) {
                var s = e._plugins[o], a = s.pre, h = s.use;
                a && n.pre(a), h && n.use(h)
            }
            return n._protected = !1, n
        }

        return function (t, e) {
            function r() {
                this.constructor = t
            }

            lo(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
        }(e, t), e.prototype.destroy = function () {
            this._protected || this.reset()
        }, Object.defineProperty(e, "shared", {
            get: function () {
                var t = e._shared;
                return t || ((t = new e)._protected = !0, e._shared = t), t
            }, enumerable: !1, configurable: !0
        }), e.registerPlugin = function (t) {
            return e._plugins.push(t), t.add && t.add(), e
        }, e._plugins = [], e
    }(uo);
    fo.registerPlugin({use: ao.parsing}), fo.registerPlugin(co);
    var po, _o = function () {
        function t() {
        }

        return t.init = function (t) {
            t = Object.assign({sharedLoader: !1}, t), this.loader = t.sharedLoader ? fo.shared : new fo
        }, t.destroy = function () {
            this.loader && (this.loader.destroy(), this.loader = null)
        }, t
    }(), mo = ro;
    !function (t) {
        t[t.COMPRESSED_RGB_S3TC_DXT1_EXT = 33776] = "COMPRESSED_RGB_S3TC_DXT1_EXT", t[t.COMPRESSED_RGBA_S3TC_DXT1_EXT = 33777] = "COMPRESSED_RGBA_S3TC_DXT1_EXT", t[t.COMPRESSED_RGBA_S3TC_DXT3_EXT = 33778] = "COMPRESSED_RGBA_S3TC_DXT3_EXT", t[t.COMPRESSED_RGBA_S3TC_DXT5_EXT = 33779] = "COMPRESSED_RGBA_S3TC_DXT5_EXT", t[t.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT = 35917] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT", t[t.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT = 35918] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT", t[t.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT = 35919] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT", t[t.COMPRESSED_SRGB_S3TC_DXT1_EXT = 35916] = "COMPRESSED_SRGB_S3TC_DXT1_EXT", t[t.COMPRESSED_R11_EAC = 37488] = "COMPRESSED_R11_EAC", t[t.COMPRESSED_SIGNED_R11_EAC = 37489] = "COMPRESSED_SIGNED_R11_EAC", t[t.COMPRESSED_RG11_EAC = 37490] = "COMPRESSED_RG11_EAC", t[t.COMPRESSED_SIGNED_RG11_EAC = 37491] = "COMPRESSED_SIGNED_RG11_EAC", t[t.COMPRESSED_RGB8_ETC2 = 37492] = "COMPRESSED_RGB8_ETC2", t[t.COMPRESSED_RGBA8_ETC2_EAC = 37496] = "COMPRESSED_RGBA8_ETC2_EAC", t[t.COMPRESSED_SRGB8_ETC2 = 37493] = "COMPRESSED_SRGB8_ETC2", t[t.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC = 37497] = "COMPRESSED_SRGB8_ALPHA8_ETC2_EAC", t[t.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37494] = "COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2", t[t.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37495] = "COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2", t[t.COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 35840] = "COMPRESSED_RGB_PVRTC_4BPPV1_IMG", t[t.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 35842] = "COMPRESSED_RGBA_PVRTC_4BPPV1_IMG", t[t.COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 35841] = "COMPRESSED_RGB_PVRTC_2BPPV1_IMG", t[t.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 35843] = "COMPRESSED_RGBA_PVRTC_2BPPV1_IMG", t[t.COMPRESSED_RGB_ETC1_WEBGL = 36196] = "COMPRESSED_RGB_ETC1_WEBGL", t[t.COMPRESSED_RGB_ATC_WEBGL = 35986] = "COMPRESSED_RGB_ATC_WEBGL", t[t.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL = 35986] = "COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL", t[t.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL = 34798] = "COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL"
    }(t.INTERNAL_FORMATS || (t.INTERNAL_FORMATS = {}));
    var vo = ((po = {})[t.INTERNAL_FORMATS.COMPRESSED_RGB_S3TC_DXT1_EXT] = .5, po[t.INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT1_EXT] = .5, po[t.INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT3_EXT] = 1, po[t.INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT5_EXT] = 1, po[t.INTERNAL_FORMATS.COMPRESSED_SRGB_S3TC_DXT1_EXT] = .5, po[t.INTERNAL_FORMATS.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT] = .5, po[t.INTERNAL_FORMATS.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT] = 1, po[t.INTERNAL_FORMATS.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT] = 1, po[t.INTERNAL_FORMATS.COMPRESSED_R11_EAC] = .5, po[t.INTERNAL_FORMATS.COMPRESSED_SIGNED_R11_EAC] = .5, po[t.INTERNAL_FORMATS.COMPRESSED_RG11_EAC] = 1, po[t.INTERNAL_FORMATS.COMPRESSED_SIGNED_RG11_EAC] = 1, po[t.INTERNAL_FORMATS.COMPRESSED_RGB8_ETC2] = .5, po[t.INTERNAL_FORMATS.COMPRESSED_RGBA8_ETC2_EAC] = 1, po[t.INTERNAL_FORMATS.COMPRESSED_SRGB8_ETC2] = .5, po[t.INTERNAL_FORMATS.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC] = 1, po[t.INTERNAL_FORMATS.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2] = .5, po[t.INTERNAL_FORMATS.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2] = .5, po[t.INTERNAL_FORMATS.COMPRESSED_RGB_PVRTC_4BPPV1_IMG] = .5, po[t.INTERNAL_FORMATS.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG] = .5, po[t.INTERNAL_FORMATS.COMPRESSED_RGB_PVRTC_2BPPV1_IMG] = .25, po[t.INTERNAL_FORMATS.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG] = .25, po[t.INTERNAL_FORMATS.COMPRESSED_RGB_ETC1_WEBGL] = .5, po[t.INTERNAL_FORMATS.COMPRESSED_RGB_ATC_WEBGL] = .5, po[t.INTERNAL_FORMATS.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL] = 1, po[t.INTERNAL_FORMATS.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL] = 1, po),
        yo = function (t, e) {
            return (yo = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
            })(t, e)
        };

    function go(t, e) {
        function r() {
            this.constructor = t
        }

        yo(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
    }

    var Eo = function (t) {
            function e(e, r) {
                void 0 === r && (r = {width: 1, height: 1, autoLoad: !0});
                var i, n, o = this;
                return "string" == typeof e ? (i = e, n = new Uint8Array) : (i = null, n = e), (o = t.call(this, n, r) || this).origin = i, o.buffer = n ? new Rn(n) : null, o.origin && !1 !== r.autoLoad && o.load(), n && n.length && (o.loaded = !0, o.onBlobLoaded(o.buffer.rawBinaryData)), o
            }

            return go(e, t), e.prototype.onBlobLoaded = function (t) {
            }, e.prototype.load = function () {
                return t = this, void 0, e = Promise, r = function () {
                    var t;
                    return function (t, e) {
                        var r, i, n, o, s = {
                            label: 0, sent: function () {
                                if (1 & n[0]) throw n[1];
                                return n[1]
                            }, trys: [], ops: []
                        };
                        return o = {next: a(0), throw: a(1), return: a(2)}, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                            return this
                        }), o;

                        function a(o) {
                            return function (a) {
                                return function (o) {
                                    if (r) throw new TypeError("Generator is already executing.");
                                    for (; s;) try {
                                        if (r = 1, i && (n = 2 & o[0] ? i.return : o[0] ? i.throw || ((n = i.return) && n.call(i), 0) : i.next) && !(n = n.call(i, o[1])).done) return n;
                                        switch (i = 0, n && (o = [2 & o[0], n.value]), o[0]) {
                                            case 0:
                                            case 1:
                                                n = o;
                                                break;
                                            case 4:
                                                return s.label++, {value: o[1], done: !1};
                                            case 5:
                                                s.label++, i = o[1], o = [0];
                                                continue;
                                            case 7:
                                                o = s.ops.pop(), s.trys.pop();
                                                continue;
                                            default:
                                                if (!(n = (n = s.trys).length > 0 && n[n.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                                    s = 0;
                                                    continue
                                                }
                                                if (3 === o[0] && (!n || o[1] > n[0] && o[1] < n[3])) {
                                                    s.label = o[1];
                                                    break
                                                }
                                                if (6 === o[0] && s.label < n[1]) {
                                                    s.label = n[1], n = o;
                                                    break
                                                }
                                                if (n && s.label < n[2]) {
                                                    s.label = n[2], s.ops.push(o);
                                                    break
                                                }
                                                n[2] && s.ops.pop(), s.trys.pop();
                                                continue
                                        }
                                        o = e.call(t, s)
                                    } catch (t) {
                                        o = [6, t], i = 0
                                    } finally {
                                        r = n = 0
                                    }
                                    if (5 & o[0]) throw o[1];
                                    return {value: o[0] ? o[1] : void 0, done: !0}
                                }([o, a])
                            }
                        }
                    }(this, function (e) {
                        switch (e.label) {
                            case 0:
                                return [4, fetch(this.origin)];
                            case 1:
                                return [4, e.sent().blob()];
                            case 2:
                                return [4, e.sent().arrayBuffer()];
                            case 3:
                                return t = e.sent(), this.data = new Uint32Array(t), this.buffer = new Rn(t), this.loaded = !0, this.onBlobLoaded(t), this.update(), [2, this]
                        }
                    })
                }, new (e || (e = Promise))(function (i, n) {
                    function o(t) {
                        try {
                            a(r.next(t))
                        } catch (t) {
                            n(t)
                        }
                    }

                    function s(t) {
                        try {
                            a(r.throw(t))
                        } catch (t) {
                            n(t)
                        }
                    }

                    function a(t) {
                        t.done ? i(t.value) : new e(function (e) {
                            e(t.value)
                        }).then(o, s)
                    }

                    a((r = r.apply(t, [])).next())
                });
                var t, e, r
            }, e
        }(gr), To = function (t) {
            function e(r, i) {
                var n = t.call(this, r, i) || this;
                return n.format = i.format, n.levels = i.levels || 1, n._width = i.width, n._height = i.height, n._extension = e._formatToExtension(n.format), (i.levelBuffers || n.buffer) && (n._levelBuffers = i.levelBuffers || e._createLevelBuffers(r instanceof Uint8Array ? r : n.buffer.uint8View, n.format, n.levels, 4, 4, n.width, n.height)), n
            }

            return go(e, t), e.prototype.upload = function (t, e, r) {
                var i = t.gl;
                if (!t.context.extensions[this._extension]) throw new Error(this._extension + " textures are not supported on the current machine");
                if (!this._levelBuffers) return !1;
                for (var n = 0, o = this.levels; n < o; n++) {
                    var s = this._levelBuffers[n], a = s.levelID, h = s.levelWidth, u = s.levelHeight, l = s.levelBuffer;
                    i.compressedTexImage2D(i.TEXTURE_2D, a, this.format, h, u, 0, l)
                }
                return !0
            }, e.prototype.onBlobLoaded = function () {
                this._levelBuffers = e._createLevelBuffers(this.buffer.uint8View, this.format, this.levels, 4, 4, this.width, this.height)
            }, e._formatToExtension = function (t) {
                if (t >= 33776 && t <= 33779) return "s3tc";
                if (t >= 37488 && t <= 37497) return "etc";
                if (t >= 35840 && t <= 35843) return "pvrtc";
                if (t >= 36196) return "etc1";
                if (t >= 35986 && t <= 34798) return "atc";
                throw new Error("Invalid (compressed) texture format given!")
            }, e._createLevelBuffers = function (t, e, r, i, n, o, s) {
                for (var a = new Array(r), h = t.byteOffset, u = o, l = s, c = u + i - 1 & ~(i - 1), d = l + n - 1 & ~(n - 1), f = c * d * vo[e], p = 0; p < r; p++) a[p] = {
                    levelID: p,
                    levelWidth: r > 1 ? u : c,
                    levelHeight: r > 1 ? l : d,
                    levelBuffer: new Uint8Array(t.buffer, h, f)
                }, h += f, f = (c = (u = u >> 1 || 1) + i - 1 & ~(i - 1)) * (d = (l = l >> 1 || 1) + n - 1 & ~(n - 1)) * vo[e];
                return a
            }, e
        }(Eo), bo = /iPhone/i, xo = /iPod/i, Ao = /iPad/i, So = /\biOS-universal(?:.+)Mac\b/i, Oo = /\bAndroid(?:.+)Mobile\b/i, Ro = /Android/i,
        Po = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i, Io = /Silk/i, Mo = /Windows Phone/i, wo = /\bWindows(?:.+)ARM\b/i, Do = /BlackBerry/i, Co = /BB10/i, No = /Opera Mini/i,
        Lo = /\b(CriOS|Chrome)(?:.+)Mobile/i, Fo = /Mobile(?:.+)Firefox\b/i, Bo = function (t) {
            return void 0 !== t && "MacIntel" === t.platform && "number" == typeof t.maxTouchPoints && t.maxTouchPoints > 1 && "undefined" == typeof MSStream
        }, Uo = function (t) {
            var e = {userAgent: "", platform: "", maxTouchPoints: 0};
            t || "undefined" == typeof navigator ? "string" == typeof t ? e.userAgent = t : t && t.userAgent && (e = {
                userAgent: t.userAgent,
                platform: t.platform,
                maxTouchPoints: t.maxTouchPoints || 0
            }) : e = {userAgent: navigator.userAgent, platform: navigator.platform, maxTouchPoints: navigator.maxTouchPoints || 0};
            var r = e.userAgent, i = r.split("[FBAN");
            void 0 !== i[1] && (r = i[0]), void 0 !== (i = r.split("Twitter"))[1] && (r = i[0]);
            var n = function (t) {
                return function (e) {
                    return e.test(t)
                }
            }(r), o = {
                apple: {
                    phone: n(bo) && !n(Mo),
                    ipod: n(xo),
                    tablet: !n(bo) && (n(Ao) || Bo(e)) && !n(Mo),
                    universal: n(So),
                    device: (n(bo) || n(xo) || n(Ao) || n(So) || Bo(e)) && !n(Mo)
                },
                amazon: {phone: n(Po), tablet: !n(Po) && n(Io), device: n(Po) || n(Io)},
                android: {
                    phone: !n(Mo) && n(Po) || !n(Mo) && n(Oo),
                    tablet: !n(Mo) && !n(Po) && !n(Oo) && (n(Io) || n(Ro)),
                    device: !n(Mo) && (n(Po) || n(Io) || n(Oo) || n(Ro)) || n(/\bokhttp\b/i)
                },
                windows: {phone: n(Mo), tablet: n(wo), device: n(Mo) || n(wo)},
                other: {blackberry: n(Do), blackberry10: n(Co), opera: n(No), firefox: n(Fo), chrome: n(Lo), device: n(Do) || n(Co) || n(No) || n(Fo) || n(Lo)},
                any: !1,
                phone: !1,
                tablet: !1
            };
            return o.any = o.apple.device || o.android.device || o.windows.device || o.other.device, o.phone = o.apple.phone || o.android.phone || o.windows.phone, o.tablet = o.apple.tablet || o.android.tablet || o.windows.tablet, o
        }(self.navigator), Go = {
            MIPMAP_TEXTURES: 1,
            ANISOTROPIC_LEVEL: 0,
            RESOLUTION: 1,
            FILTER_RESOLUTION: 1,
            SPRITE_MAX_TEXTURES: function (t) {
                var e, r = !0;
                (Uo.tablet || Uo.phone) && (Uo.apple.device && (e = navigator.userAgent.match(/OS (\d+)_(\d+)?/)) && parseInt(e[1], 10) < 11 && (r = !1), Uo.android.device && (e = navigator.userAgent.match(/Android\s([0-9.]*)/)) && parseInt(e[1], 10) < 7 && (r = !1));
                return r ? 32 : 4
            }(),
            SPRITE_BATCH_SIZE: 4096,
            RENDER_OPTIONS: {
                view: null,
                antialias: !1,
                autoDensity: !1,
                backgroundColor: 0,
                backgroundAlpha: 1,
                useContextAlpha: !0,
                clearBeforeRender: !0,
                preserveDrawingBuffer: !1,
                width: 800,
                height: 600,
                legacy: !1
            },
            GC_MODE: 0,
            GC_MAX_IDLE: 3600,
            GC_MAX_CHECK_COUNT: 600,
            WRAP_MODE: 33071,
            SCALE_MODE: 1,
            PRECISION_VERTEX: "highp",
            PRECISION_FRAGMENT: Uo.apple.device ? "highp" : "mediump",
            CAN_UPLOAD_SAME_BUFFER: !Uo.apple.device,
            CREATE_IMAGE_BITMAP: !1,
            ROUND_PIXELS: !1
        }, Xo = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function ko(t, e, r) {
        return t(r = {
            path: e, exports: {}, require: function (t, e) {
                return function () {
                    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")
                }(null == e && r.path)
            }
        }, r.exports), r.exports
    }

    ko(function (t) {
        var e = Object.prototype.hasOwnProperty, r = "~";

        function i() {
        }

        function n(t, e, r) {
            this.fn = t, this.context = e, this.once = r || !1
        }

        function o(t, e, i, o, s) {
            if ("function" != typeof i) throw new TypeError("The listener must be a function");
            var a = new n(i, o || t, s), h = r ? r + e : e;
            return t._events[h] ? t._events[h].fn ? t._events[h] = [t._events[h], a] : t._events[h].push(a) : (t._events[h] = a, t._eventsCount++), t
        }

        function s(t, e) {
            0 == --t._eventsCount ? t._events = new i : delete t._events[e]
        }

        function a() {
            this._events = new i, this._eventsCount = 0
        }

        Object.create && (i.prototype = Object.create(null), (new i).__proto__ || (r = !1)), a.prototype.eventNames = function () {
            var t, i, n = [];
            if (0 === this._eventsCount) return n;
            for (i in t = this._events) e.call(t, i) && n.push(r ? i.slice(1) : i);
            return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(t)) : n
        }, a.prototype.listeners = function (t) {
            var e = r ? r + t : t, i = this._events[e];
            if (!i) return [];
            if (i.fn) return [i.fn];
            for (var n = 0, o = i.length, s = new Array(o); n < o; n++) s[n] = i[n].fn;
            return s
        }, a.prototype.listenerCount = function (t) {
            var e = r ? r + t : t, i = this._events[e];
            return i ? i.fn ? 1 : i.length : 0
        }, a.prototype.emit = function (t, e, i, n, o, s) {
            var a = arguments, h = r ? r + t : t;
            if (!this._events[h]) return !1;
            var u, l, c = this._events[h], d = arguments.length;
            if (c.fn) {
                switch (c.once && this.removeListener(t, c.fn, void 0, !0), d) {
                    case 1:
                        return c.fn.call(c.context), !0;
                    case 2:
                        return c.fn.call(c.context, e), !0;
                    case 3:
                        return c.fn.call(c.context, e, i), !0;
                    case 4:
                        return c.fn.call(c.context, e, i, n), !0;
                    case 5:
                        return c.fn.call(c.context, e, i, n, o), !0;
                    case 6:
                        return c.fn.call(c.context, e, i, n, o, s), !0
                }
                for (l = 1, u = new Array(d - 1); l < d; l++) u[l - 1] = a[l];
                c.fn.apply(c.context, u)
            } else {
                var f, p = c.length;
                for (l = 0; l < p; l++) switch (c[l].once && this.removeListener(t, c[l].fn, void 0, !0), d) {
                    case 1:
                        c[l].fn.call(c[l].context);
                        break;
                    case 2:
                        c[l].fn.call(c[l].context, e);
                        break;
                    case 3:
                        c[l].fn.call(c[l].context, e, i);
                        break;
                    case 4:
                        c[l].fn.call(c[l].context, e, i, n);
                        break;
                    default:
                        if (!u) for (f = 1, u = new Array(d - 1); f < d; f++) u[f - 1] = a[f];
                        c[l].fn.apply(c[l].context, u)
                }
            }
            return !0
        }, a.prototype.on = function (t, e, r) {
            return o(this, t, e, r, !1)
        }, a.prototype.once = function (t, e, r) {
            return o(this, t, e, r, !0)
        }, a.prototype.removeListener = function (t, e, i, n) {
            var o = r ? r + t : t;
            if (!this._events[o]) return this;
            if (!e) return s(this, o), this;
            var a = this._events[o];
            if (a.fn) a.fn !== e || n && !a.once || i && a.context !== i || s(this, o); else {
                for (var h = 0, u = [], l = a.length; h < l; h++) (a[h].fn !== e || n && !a[h].once || i && a[h].context !== i) && u.push(a[h]);
                u.length ? this._events[o] = 1 === u.length ? u[0] : u : s(this, o)
            }
            return this
        }, a.prototype.removeAllListeners = function (t) {
            var e;
            return t ? (e = r ? r + t : t, this._events[e] && s(this, e)) : (this._events = new i, this._eventsCount = 0), this
        }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prefixed = r, a.EventEmitter = a, t.exports = a
    });
    var jo = ko(function (t, e) {
        !function (r) {
            var i = e && !e.nodeType && e, n = t && !t.nodeType && t, o = "object" == typeof Xo && Xo;
            o.global !== o && o.window !== o && o.self !== o || (r = o);
            var s, a, h = 2147483647, u = 36, l = 1, c = 26, d = 38, f = 700, p = 72, _ = 128, m = "-", v = /^xn--/, y = /[^\x20-\x7E]/, g = /[\x2E\u3002\uFF0E\uFF61]/g,
                E = {overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input"},
                T = u - l, b = Math.floor, x = String.fromCharCode;

            function A(t) {
                throw RangeError(E[t])
            }

            function S(t, e) {
                for (var r = t.length, i = []; r--;) i[r] = e(t[r]);
                return i
            }

            function O(t, e) {
                var r = t.split("@"), i = "";
                return r.length > 1 && (i = r[0] + "@", t = r[1]), i + S((t = t.replace(g, ".")).split("."), e).join(".")
            }

            function R(t) {
                for (var e, r, i = [], n = 0, o = t.length; n < o;) (e = t.charCodeAt(n++)) >= 55296 && e <= 56319 && n < o ? 56320 == (64512 & (r = t.charCodeAt(n++))) ? i.push(((1023 & e) << 10) + (1023 & r) + 65536) : (i.push(e), n--) : i.push(e);
                return i
            }

            function P(t) {
                return S(t, function (t) {
                    var e = "";
                    return t > 65535 && (e += x((t -= 65536) >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), e + x(t)
                }).join("")
            }

            function I(t, e) {
                return t + 22 + 75 * (t < 26) - ((0 != e) << 5)
            }

            function M(t, e, r) {
                var i = 0;
                for (t = r ? b(t / f) : t >> 1, t += b(t / e); t > T * c >> 1; i += u) t = b(t / T);
                return b(i + (T + 1) * t / (t + d))
            }

            function w(t) {
                var e, r, i, n, o, s, a, d, f, v, y, g = [], E = t.length, T = 0, x = _, S = p;
                for ((r = t.lastIndexOf(m)) < 0 && (r = 0), i = 0; i < r; ++i) t.charCodeAt(i) >= 128 && A("not-basic"), g.push(t.charCodeAt(i));
                for (n = r > 0 ? r + 1 : 0; n < E;) {
                    for (o = T, s = 1, a = u; n >= E && A("invalid-input"), ((d = (y = t.charCodeAt(n++)) - 48 < 10 ? y - 22 : y - 65 < 26 ? y - 65 : y - 97 < 26 ? y - 97 : u) >= u || d > b((h - T) / s)) && A("overflow"), T += d * s, !(d < (f = a <= S ? l : a >= S + c ? c : a - S)); a += u) s > b(h / (v = u - f)) && A("overflow"), s *= v;
                    S = M(T - o, e = g.length + 1, 0 == o), b(T / e) > h - x && A("overflow"), x += b(T / e), T %= e, g.splice(T++, 0, x)
                }
                return P(g)
            }

            function D(t) {
                var e, r, i, n, o, s, a, d, f, v, y, g, E, T, S, O = [];
                for (g = (t = R(t)).length, e = _, r = 0, o = p, s = 0; s < g; ++s) (y = t[s]) < 128 && O.push(x(y));
                for (i = n = O.length, n && O.push(m); i < g;) {
                    for (a = h, s = 0; s < g; ++s) (y = t[s]) >= e && y < a && (a = y);
                    for (a - e > b((h - r) / (E = i + 1)) && A("overflow"), r += (a - e) * E, e = a, s = 0; s < g; ++s) if ((y = t[s]) < e && ++r > h && A("overflow"), y == e) {
                        for (d = r, f = u; !(d < (v = f <= o ? l : f >= o + c ? c : f - o)); f += u) S = d - v, T = u - v, O.push(x(I(v + S % T, 0))), d = b(S / T);
                        O.push(x(I(d, 0))), o = M(r, E, i == n), r = 0, ++i
                    }
                    ++r, ++e
                }
                return O.join("")
            }

            if (s = {
                version: "1.3.2", ucs2: {decode: R, encode: P}, decode: w, encode: D, toASCII: function (t) {
                    return O(t, function (t) {
                        return y.test(t) ? "xn--" + D(t) : t
                    })
                }, toUnicode: function (t) {
                    return O(t, function (t) {
                        return v.test(t) ? w(t.slice(4).toLowerCase()) : t
                    })
                }
            }, i && n) if (t.exports == i) n.exports = s; else for (a in s) s.hasOwnProperty(a) && (i[a] = s[a]); else r.punycode = s
        }(Xo)
    }), Ho = {
        isString: function (t) {
            return "string" == typeof t
        }, isObject: function (t) {
            return "object" == typeof t && null !== t
        }, isNull: function (t) {
            return null === t
        }, isNullOrUndefined: function (t) {
            return null == t
        }
    };

    function Yo(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }

    var Vo = function (t, e, r, i) {
        e = e || "&", r = r || "=";
        var n = {};
        if ("string" != typeof t || 0 === t.length) return n;
        var o = /\+/g;
        t = t.split(e);
        var s = 1e3;
        i && "number" == typeof i.maxKeys && (s = i.maxKeys);
        var a = t.length;
        s > 0 && a > s && (a = s);
        for (var h = 0; h < a; ++h) {
            var u, l, c, d, f = t[h].replace(o, "%20"), p = f.indexOf(r);
            p >= 0 ? (u = f.substr(0, p), l = f.substr(p + 1)) : (u = f, l = ""), c = decodeURIComponent(u), d = decodeURIComponent(l), Yo(n, c) ? Array.isArray(n[c]) ? n[c].push(d) : n[c] = [n[c], d] : n[c] = d
        }
        return n
    }, zo = function (t) {
        switch (typeof t) {
            case"string":
                return t;
            case"boolean":
                return t ? "true" : "false";
            case"number":
                return isFinite(t) ? t : "";
            default:
                return ""
        }
    }, Wo = function (t, e, r, i) {
        return e = e || "&", r = r || "=", null === t && (t = void 0), "object" == typeof t ? Object.keys(t).map(function (i) {
            var n = encodeURIComponent(zo(i)) + r;
            return Array.isArray(t[i]) ? t[i].map(function (t) {
                return n + encodeURIComponent(zo(t))
            }).join(e) : n + encodeURIComponent(zo(t[i]))
        }).join(e) : i ? encodeURIComponent(zo(i)) + r + encodeURIComponent(zo(t)) : ""
    }, qo = ko(function (t, e) {
        e.decode = e.parse = Vo, e.encode = e.stringify = Wo
    });

    function Ko() {
        this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
    }

    var Zo = /^([a-z0-9.+-]+:)/i, Jo = /:[0-9]*$/, Qo = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
        $o = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "\t"]), ts = ["'"].concat($o), es = ["%", "/", "?", ";", "#"].concat(ts),
        rs = ["/", "?", "#"], is = /^[+a-z0-9A-Z_-]{0,63}$/, ns = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, os = {javascript: !0, "javascript:": !0},
        ss = {javascript: !0, "javascript:": !0}, as = {http: !0, https: !0, ftp: !0, gopher: !0, file: !0, "http:": !0, "https:": !0, "ftp:": !0, "gopher:": !0, "file:": !0};

    function hs(t, e, r) {
        if (t && Ho.isObject(t) && t instanceof Ko) return t;
        var i = new Ko;
        return i.parse(t, e, r), i
    }

    Ko.prototype.parse = function (t, e, r) {
        if (!Ho.isString(t)) throw new TypeError("Parameter 'url' must be a string, not " + typeof t);
        var i = t.indexOf("?"), n = -1 !== i && i < t.indexOf("#") ? "?" : "#", o = t.split(n);
        o[0] = o[0].replace(/\\/g, "/");
        var s = t = o.join(n);
        if (s = s.trim(), !r && 1 === t.split("#").length) {
            var a = Qo.exec(s);
            if (a) return this.path = s, this.href = s, this.pathname = a[1], a[2] ? (this.search = a[2], this.query = e ? qo.parse(this.search.substr(1)) : this.search.substr(1)) : e && (this.search = "", this.query = {}), this
        }
        var h = Zo.exec(s);
        if (h) {
            var u = (h = h[0]).toLowerCase();
            this.protocol = u, s = s.substr(h.length)
        }
        if (r || h || s.match(/^\/\/[^@\/]+@[^@\/]+/)) {
            var l = "//" === s.substr(0, 2);
            !l || h && ss[h] || (s = s.substr(2), this.slashes = !0)
        }
        if (!ss[h] && (l || h && !as[h])) {
            for (var c, d, f = -1, p = 0; p < rs.length; p++) -1 !== (_ = s.indexOf(rs[p])) && (-1 === f || _ < f) && (f = _);
            for (-1 !== (d = -1 === f ? s.lastIndexOf("@") : s.lastIndexOf("@", f)) && (c = s.slice(0, d), s = s.slice(d + 1), this.auth = decodeURIComponent(c)), f = -1, p = 0; p < es.length; p++) {
                var _;
                -1 !== (_ = s.indexOf(es[p])) && (-1 === f || _ < f) && (f = _)
            }
            -1 === f && (f = s.length), this.host = s.slice(0, f), s = s.slice(f), this.parseHost(), this.hostname = this.hostname || "";
            var m = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
            if (!m) for (var v = this.hostname.split(/\./), y = (p = 0, v.length); p < y; p++) {
                var g = v[p];
                if (g && !g.match(is)) {
                    for (var E = "", T = 0, b = g.length; T < b; T++) g.charCodeAt(T) > 127 ? E += "x" : E += g[T];
                    if (!E.match(is)) {
                        var x = v.slice(0, p), A = v.slice(p + 1), S = g.match(ns);
                        S && (x.push(S[1]), A.unshift(S[2])), A.length && (s = "/" + A.join(".") + s), this.hostname = x.join(".");
                        break
                    }
                }
            }
            this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), m || (this.hostname = jo.toASCII(this.hostname));
            var O = this.port ? ":" + this.port : "", R = this.hostname || "";
            this.host = R + O, this.href += this.host, m && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== s[0] && (s = "/" + s))
        }
        if (!os[u]) for (p = 0, y = ts.length; p < y; p++) {
            var P = ts[p];
            if (-1 !== s.indexOf(P)) {
                var I = encodeURIComponent(P);
                I === P && (I = escape(P)), s = s.split(P).join(I)
            }
        }
        var M = s.indexOf("#");
        -1 !== M && (this.hash = s.substr(M), s = s.slice(0, M));
        var w = s.indexOf("?");
        if (-1 !== w ? (this.search = s.substr(w), this.query = s.substr(w + 1), e && (this.query = qo.parse(this.query)), s = s.slice(0, w)) : e && (this.search = "", this.query = {}), s && (this.pathname = s), as[u] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
            O = this.pathname || "";
            var D = this.search || "";
            this.path = O + D
        }
        return this.href = this.format(), this
    }, Ko.prototype.format = function () {
        var t = this.auth || "";
        t && (t = (t = encodeURIComponent(t)).replace(/%3A/i, ":"), t += "@");
        var e = this.protocol || "", r = this.pathname || "", i = this.hash || "", n = !1, o = "";
        this.host ? n = t + this.host : this.hostname && (n = t + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (n += ":" + this.port)), this.query && Ho.isObject(this.query) && Object.keys(this.query).length && (o = qo.stringify(this.query));
        var s = this.search || o && "?" + o || "";
        return e && ":" !== e.substr(-1) && (e += ":"), this.slashes || (!e || as[e]) && !1 !== n ? (n = "//" + (n || ""), r && "/" !== r.charAt(0) && (r = "/" + r)) : n || (n = ""), i && "#" !== i.charAt(0) && (i = "#" + i), s && "?" !== s.charAt(0) && (s = "?" + s), e + n + (r = r.replace(/[?#]/g, function (t) {
            return encodeURIComponent(t)
        })) + (s = s.replace("#", "%23")) + i
    }, Ko.prototype.resolve = function (t) {
        return this.resolveObject(hs(t, !1, !0)).format()
    }, Ko.prototype.resolveObject = function (t) {
        if (Ho.isString(t)) {
            var e = new Ko;
            e.parse(t, !1, !0), t = e
        }
        for (var r = new Ko, i = Object.keys(this), n = 0; n < i.length; n++) {
            var o = i[n];
            r[o] = this[o]
        }
        if (r.hash = t.hash, "" === t.href) return r.href = r.format(), r;
        if (t.slashes && !t.protocol) {
            for (var s = Object.keys(t), a = 0; a < s.length; a++) {
                var h = s[a];
                "protocol" !== h && (r[h] = t[h])
            }
            return as[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = "/"), r.href = r.format(), r
        }
        if (t.protocol && t.protocol !== r.protocol) {
            if (!as[t.protocol]) {
                for (var u = Object.keys(t), l = 0; l < u.length; l++) {
                    var c = u[l];
                    r[c] = t[c]
                }
                return r.href = r.format(), r
            }
            if (r.protocol = t.protocol, t.host || ss[t.protocol]) r.pathname = t.pathname; else {
                for (var d = (t.pathname || "").split("/"); d.length && !(t.host = d.shift());) ;
                t.host || (t.host = ""), t.hostname || (t.hostname = ""), "" !== d[0] && d.unshift(""), d.length < 2 && d.unshift(""), r.pathname = d.join("/")
            }
            if (r.search = t.search, r.query = t.query, r.host = t.host || "", r.auth = t.auth, r.hostname = t.hostname || t.host, r.port = t.port, r.pathname || r.search) {
                var f = r.pathname || "", p = r.search || "";
                r.path = f + p
            }
            return r.slashes = r.slashes || t.slashes, r.href = r.format(), r
        }
        var _ = r.pathname && "/" === r.pathname.charAt(0), m = t.host || t.pathname && "/" === t.pathname.charAt(0), v = m || _ || r.host && t.pathname, y = v,
            g = r.pathname && r.pathname.split("/") || [], E = (d = t.pathname && t.pathname.split("/") || [], r.protocol && !as[r.protocol]);
        if (E && (r.hostname = "", r.port = null, r.host && ("" === g[0] ? g[0] = r.host : g.unshift(r.host)), r.host = "", t.protocol && (t.hostname = null, t.port = null, t.host && ("" === d[0] ? d[0] = t.host : d.unshift(t.host)), t.host = null), v = v && ("" === d[0] || "" === g[0])), m) r.host = t.host || "" === t.host ? t.host : r.host, r.hostname = t.hostname || "" === t.hostname ? t.hostname : r.hostname, r.search = t.search, r.query = t.query, g = d; else if (d.length) g || (g = []), g.pop(), g = g.concat(d), r.search = t.search, r.query = t.query; else if (!Ho.isNullOrUndefined(t.search)) return E && (r.hostname = r.host = g.shift(), (S = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = S.shift(), r.host = r.hostname = S.shift())), r.search = t.search, r.query = t.query, Ho.isNull(r.pathname) && Ho.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.href = r.format(), r;
        if (!g.length) return r.pathname = null, r.search ? r.path = "/" + r.search : r.path = null, r.href = r.format(), r;
        for (var T = g.slice(-1)[0], b = (r.host || t.host || g.length > 1) && ("." === T || ".." === T) || "" === T, x = 0, A = g.length; A >= 0; A--) "." === (T = g[A]) ? g.splice(A, 1) : ".." === T ? (g.splice(A, 1), x++) : x && (g.splice(A, 1), x--);
        if (!v && !y) for (; x--; x) g.unshift("..");
        !v || "" === g[0] || g[0] && "/" === g[0].charAt(0) || g.unshift(""), b && "/" !== g.join("/").substr(-1) && g.push("");
        var S, O = "" === g[0] || g[0] && "/" === g[0].charAt(0);
        return E && (r.hostname = r.host = O ? "" : g.length ? g.shift() : "", (S = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = S.shift(), r.host = r.hostname = S.shift())), (v = v || r.host && g.length) && !O && g.unshift(""), g.length ? r.pathname = g.join("/") : (r.pathname = null, r.path = null), Ho.isNull(r.pathname) && Ho.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.auth = t.auth || r.auth, r.slashes = r.slashes || t.slashes, r.href = r.format(), r
    }, Ko.prototype.parseHost = function () {
        var t = this.host, e = Jo.exec(t);
        e && (":" !== (e = e[0]) && (this.port = e.substr(1)), t = t.substr(0, t.length - e.length)), t && (this.hostname = t)
    };
    var us = function (t, e) {
        return hs(t, !1, !0).resolve(e)
    };
    Go.RETINA_PREFIX = /@([0-9\.]+)x/, Go.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = !1, function () {
        for (var e = [], r = [], i = 0; i < 32; i++) e[i] = i, r[i] = i;
        e[t.BLEND_MODES.NORMAL_NPM] = t.BLEND_MODES.NORMAL, e[t.BLEND_MODES.ADD_NPM] = t.BLEND_MODES.ADD, e[t.BLEND_MODES.SCREEN_NPM] = t.BLEND_MODES.SCREEN, r[t.BLEND_MODES.NORMAL] = t.BLEND_MODES.NORMAL_NPM, r[t.BLEND_MODES.ADD] = t.BLEND_MODES.ADD_NPM, r[t.BLEND_MODES.SCREEN] = t.BLEND_MODES.SCREEN_NPM;
        var n = [];
        n.push(r), n.push(e)
    }(), function () {
        function t(t, e, r) {
            this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.resolution = r || Go.RESOLUTION, this.resize(t, e)
        }

        t.prototype.clear = function () {
            this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }, t.prototype.resize = function (t, e) {
            this.canvas.width = t * this.resolution, this.canvas.height = e * this.resolution
        }, t.prototype.destroy = function () {
            this.context = null, this.canvas = null
        }, Object.defineProperty(t.prototype, "width", {
            get: function () {
                return this.canvas.width
            }, set: function (t) {
                this.canvas.width = t
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "height", {
            get: function () {
                return this.canvas.height
            }, set: function (t) {
                this.canvas.height = t
            }, enumerable: !1, configurable: !0
        })
    }();
    var ls, cs, ds = function () {
        function t() {
        }

        return t.use = function (e, r) {
            var i = e.data;
            if (e.type === mo.TYPE.JSON && i && i.cacheID && i.textures) {
                for (var n = i.textures, o = void 0, s = void 0, a = 0, h = n.length; a < h; a++) {
                    var u = n[a], l = u.src, c = u.format;
                    if (c || (s = l), t.textureFormats[c]) {
                        o = l;
                        break
                    }
                }
                if (!(o = o || s)) return void r(new Error("Cannot load compressed-textures in " + e.url + ", make sure you provide a fallback"));
                if (o === e.url) return void r(new Error("URL of compressed texture cannot be the same as the manifest's URL"));
                var d = {crossOrigin: e.crossOrigin, metadata: e.metadata.imageMetadata, parentResource: e}, f = us(e.url.replace(this.baseUrl, ""), o), p = i.cacheID;
                this.add(p, f, d, function (t) {
                    if (t.error) r(t.error); else {
                        var i = t.texture, n = void 0 === i ? null : i, o = t.textures, s = void 0 === o ? {} : o;
                        Object.assign(e, {texture: n, textures: s}), r()
                    }
                })
            } else r()
        }, t.add = function () {
            var e = document.createElement("canvas").getContext("webgl");
            if (e) {
                var r = {
                    s3tc: e.getExtension("WEBGL_compressed_texture_s3tc"),
                    s3tc_sRGB: e.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
                    etc: e.getExtension("WEBGL_compressed_texture_etc"),
                    etc1: e.getExtension("WEBGL_compressed_texture_etc1"),
                    pvrtc: e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
                    atc: e.getExtension("WEBGL_compressed_texture_atc"),
                    astc: e.getExtension("WEBGL_compressed_texture_astc")
                };
                for (var i in t.textureExtensions = r, t.textureFormats = {}, r) {
                    var n = r[i];
                    n && Object.assign(t.textureFormats, Object.getPrototypeOf(n))
                }
            }
        }, t
    }();

    function fs(e, r, i) {
        var n = {textures: {}, texture: null};
        return r ? (r.map(function (e) {
            return new Ur(new Tr(e, Object.assign({mipmap: t.MIPMAP_MODES.OFF, alphaMode: t.ALPHA_MODES.NO_PREMULTIPLIED_ALPHA}, i)))
        }).forEach(function (t, r) {
            var i = t.baseTexture, o = e + "-" + (r + 1);
            Tr.addToCache(i, o), Ur.addToCache(t, o), 0 === r && (Tr.addToCache(i, e), Ur.addToCache(t, e), n.texture = t), n.textures[o] = t
        }), n) : n
    }

    mo.setExtensionXhrType("dds", mo.XHR_RESPONSE_TYPE.BUFFER);
    var ps, _s;
    !function (t) {
        t[t.DXGI_FORMAT_UNKNOWN = 0] = "DXGI_FORMAT_UNKNOWN", t[t.DXGI_FORMAT_R32G32B32A32_TYPELESS = 1] = "DXGI_FORMAT_R32G32B32A32_TYPELESS", t[t.DXGI_FORMAT_R32G32B32A32_FLOAT = 2] = "DXGI_FORMAT_R32G32B32A32_FLOAT", t[t.DXGI_FORMAT_R32G32B32A32_UINT = 3] = "DXGI_FORMAT_R32G32B32A32_UINT", t[t.DXGI_FORMAT_R32G32B32A32_SINT = 4] = "DXGI_FORMAT_R32G32B32A32_SINT", t[t.DXGI_FORMAT_R32G32B32_TYPELESS = 5] = "DXGI_FORMAT_R32G32B32_TYPELESS", t[t.DXGI_FORMAT_R32G32B32_FLOAT = 6] = "DXGI_FORMAT_R32G32B32_FLOAT", t[t.DXGI_FORMAT_R32G32B32_UINT = 7] = "DXGI_FORMAT_R32G32B32_UINT", t[t.DXGI_FORMAT_R32G32B32_SINT = 8] = "DXGI_FORMAT_R32G32B32_SINT", t[t.DXGI_FORMAT_R16G16B16A16_TYPELESS = 9] = "DXGI_FORMAT_R16G16B16A16_TYPELESS", t[t.DXGI_FORMAT_R16G16B16A16_FLOAT = 10] = "DXGI_FORMAT_R16G16B16A16_FLOAT", t[t.DXGI_FORMAT_R16G16B16A16_UNORM = 11] = "DXGI_FORMAT_R16G16B16A16_UNORM", t[t.DXGI_FORMAT_R16G16B16A16_UINT = 12] = "DXGI_FORMAT_R16G16B16A16_UINT", t[t.DXGI_FORMAT_R16G16B16A16_SNORM = 13] = "DXGI_FORMAT_R16G16B16A16_SNORM", t[t.DXGI_FORMAT_R16G16B16A16_SINT = 14] = "DXGI_FORMAT_R16G16B16A16_SINT", t[t.DXGI_FORMAT_R32G32_TYPELESS = 15] = "DXGI_FORMAT_R32G32_TYPELESS", t[t.DXGI_FORMAT_R32G32_FLOAT = 16] = "DXGI_FORMAT_R32G32_FLOAT", t[t.DXGI_FORMAT_R32G32_UINT = 17] = "DXGI_FORMAT_R32G32_UINT", t[t.DXGI_FORMAT_R32G32_SINT = 18] = "DXGI_FORMAT_R32G32_SINT", t[t.DXGI_FORMAT_R32G8X24_TYPELESS = 19] = "DXGI_FORMAT_R32G8X24_TYPELESS", t[t.DXGI_FORMAT_D32_FLOAT_S8X24_UINT = 20] = "DXGI_FORMAT_D32_FLOAT_S8X24_UINT", t[t.DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS = 21] = "DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS", t[t.DXGI_FORMAT_X32_TYPELESS_G8X24_UINT = 22] = "DXGI_FORMAT_X32_TYPELESS_G8X24_UINT", t[t.DXGI_FORMAT_R10G10B10A2_TYPELESS = 23] = "DXGI_FORMAT_R10G10B10A2_TYPELESS", t[t.DXGI_FORMAT_R10G10B10A2_UNORM = 24] = "DXGI_FORMAT_R10G10B10A2_UNORM", t[t.DXGI_FORMAT_R10G10B10A2_UINT = 25] = "DXGI_FORMAT_R10G10B10A2_UINT", t[t.DXGI_FORMAT_R11G11B10_FLOAT = 26] = "DXGI_FORMAT_R11G11B10_FLOAT", t[t.DXGI_FORMAT_R8G8B8A8_TYPELESS = 27] = "DXGI_FORMAT_R8G8B8A8_TYPELESS", t[t.DXGI_FORMAT_R8G8B8A8_UNORM = 28] = "DXGI_FORMAT_R8G8B8A8_UNORM", t[t.DXGI_FORMAT_R8G8B8A8_UNORM_SRGB = 29] = "DXGI_FORMAT_R8G8B8A8_UNORM_SRGB", t[t.DXGI_FORMAT_R8G8B8A8_UINT = 30] = "DXGI_FORMAT_R8G8B8A8_UINT", t[t.DXGI_FORMAT_R8G8B8A8_SNORM = 31] = "DXGI_FORMAT_R8G8B8A8_SNORM", t[t.DXGI_FORMAT_R8G8B8A8_SINT = 32] = "DXGI_FORMAT_R8G8B8A8_SINT", t[t.DXGI_FORMAT_R16G16_TYPELESS = 33] = "DXGI_FORMAT_R16G16_TYPELESS", t[t.DXGI_FORMAT_R16G16_FLOAT = 34] = "DXGI_FORMAT_R16G16_FLOAT", t[t.DXGI_FORMAT_R16G16_UNORM = 35] = "DXGI_FORMAT_R16G16_UNORM", t[t.DXGI_FORMAT_R16G16_UINT = 36] = "DXGI_FORMAT_R16G16_UINT", t[t.DXGI_FORMAT_R16G16_SNORM = 37] = "DXGI_FORMAT_R16G16_SNORM", t[t.DXGI_FORMAT_R16G16_SINT = 38] = "DXGI_FORMAT_R16G16_SINT", t[t.DXGI_FORMAT_R32_TYPELESS = 39] = "DXGI_FORMAT_R32_TYPELESS", t[t.DXGI_FORMAT_D32_FLOAT = 40] = "DXGI_FORMAT_D32_FLOAT", t[t.DXGI_FORMAT_R32_FLOAT = 41] = "DXGI_FORMAT_R32_FLOAT", t[t.DXGI_FORMAT_R32_UINT = 42] = "DXGI_FORMAT_R32_UINT", t[t.DXGI_FORMAT_R32_SINT = 43] = "DXGI_FORMAT_R32_SINT", t[t.DXGI_FORMAT_R24G8_TYPELESS = 44] = "DXGI_FORMAT_R24G8_TYPELESS", t[t.DXGI_FORMAT_D24_UNORM_S8_UINT = 45] = "DXGI_FORMAT_D24_UNORM_S8_UINT", t[t.DXGI_FORMAT_R24_UNORM_X8_TYPELESS = 46] = "DXGI_FORMAT_R24_UNORM_X8_TYPELESS", t[t.DXGI_FORMAT_X24_TYPELESS_G8_UINT = 47] = "DXGI_FORMAT_X24_TYPELESS_G8_UINT", t[t.DXGI_FORMAT_R8G8_TYPELESS = 48] = "DXGI_FORMAT_R8G8_TYPELESS", t[t.DXGI_FORMAT_R8G8_UNORM = 49] = "DXGI_FORMAT_R8G8_UNORM", t[t.DXGI_FORMAT_R8G8_UINT = 50] = "DXGI_FORMAT_R8G8_UINT", t[t.DXGI_FORMAT_R8G8_SNORM = 51] = "DXGI_FORMAT_R8G8_SNORM", t[t.DXGI_FORMAT_R8G8_SINT = 52] = "DXGI_FORMAT_R8G8_SINT", t[t.DXGI_FORMAT_R16_TYPELESS = 53] = "DXGI_FORMAT_R16_TYPELESS", t[t.DXGI_FORMAT_R16_FLOAT = 54] = "DXGI_FORMAT_R16_FLOAT", t[t.DXGI_FORMAT_D16_UNORM = 55] = "DXGI_FORMAT_D16_UNORM", t[t.DXGI_FORMAT_R16_UNORM = 56] = "DXGI_FORMAT_R16_UNORM", t[t.DXGI_FORMAT_R16_UINT = 57] = "DXGI_FORMAT_R16_UINT", t[t.DXGI_FORMAT_R16_SNORM = 58] = "DXGI_FORMAT_R16_SNORM", t[t.DXGI_FORMAT_R16_SINT = 59] = "DXGI_FORMAT_R16_SINT", t[t.DXGI_FORMAT_R8_TYPELESS = 60] = "DXGI_FORMAT_R8_TYPELESS", t[t.DXGI_FORMAT_R8_UNORM = 61] = "DXGI_FORMAT_R8_UNORM", t[t.DXGI_FORMAT_R8_UINT = 62] = "DXGI_FORMAT_R8_UINT", t[t.DXGI_FORMAT_R8_SNORM = 63] = "DXGI_FORMAT_R8_SNORM", t[t.DXGI_FORMAT_R8_SINT = 64] = "DXGI_FORMAT_R8_SINT", t[t.DXGI_FORMAT_A8_UNORM = 65] = "DXGI_FORMAT_A8_UNORM", t[t.DXGI_FORMAT_R1_UNORM = 66] = "DXGI_FORMAT_R1_UNORM", t[t.DXGI_FORMAT_R9G9B9E5_SHAREDEXP = 67] = "DXGI_FORMAT_R9G9B9E5_SHAREDEXP", t[t.DXGI_FORMAT_R8G8_B8G8_UNORM = 68] = "DXGI_FORMAT_R8G8_B8G8_UNORM", t[t.DXGI_FORMAT_G8R8_G8B8_UNORM = 69] = "DXGI_FORMAT_G8R8_G8B8_UNORM", t[t.DXGI_FORMAT_BC1_TYPELESS = 70] = "DXGI_FORMAT_BC1_TYPELESS", t[t.DXGI_FORMAT_BC1_UNORM = 71] = "DXGI_FORMAT_BC1_UNORM", t[t.DXGI_FORMAT_BC1_UNORM_SRGB = 72] = "DXGI_FORMAT_BC1_UNORM_SRGB", t[t.DXGI_FORMAT_BC2_TYPELESS = 73] = "DXGI_FORMAT_BC2_TYPELESS", t[t.DXGI_FORMAT_BC2_UNORM = 74] = "DXGI_FORMAT_BC2_UNORM", t[t.DXGI_FORMAT_BC2_UNORM_SRGB = 75] = "DXGI_FORMAT_BC2_UNORM_SRGB", t[t.DXGI_FORMAT_BC3_TYPELESS = 76] = "DXGI_FORMAT_BC3_TYPELESS", t[t.DXGI_FORMAT_BC3_UNORM = 77] = "DXGI_FORMAT_BC3_UNORM", t[t.DXGI_FORMAT_BC3_UNORM_SRGB = 78] = "DXGI_FORMAT_BC3_UNORM_SRGB", t[t.DXGI_FORMAT_BC4_TYPELESS = 79] = "DXGI_FORMAT_BC4_TYPELESS", t[t.DXGI_FORMAT_BC4_UNORM = 80] = "DXGI_FORMAT_BC4_UNORM", t[t.DXGI_FORMAT_BC4_SNORM = 81] = "DXGI_FORMAT_BC4_SNORM", t[t.DXGI_FORMAT_BC5_TYPELESS = 82] = "DXGI_FORMAT_BC5_TYPELESS", t[t.DXGI_FORMAT_BC5_UNORM = 83] = "DXGI_FORMAT_BC5_UNORM", t[t.DXGI_FORMAT_BC5_SNORM = 84] = "DXGI_FORMAT_BC5_SNORM", t[t.DXGI_FORMAT_B5G6R5_UNORM = 85] = "DXGI_FORMAT_B5G6R5_UNORM", t[t.DXGI_FORMAT_B5G5R5A1_UNORM = 86] = "DXGI_FORMAT_B5G5R5A1_UNORM", t[t.DXGI_FORMAT_B8G8R8A8_UNORM = 87] = "DXGI_FORMAT_B8G8R8A8_UNORM", t[t.DXGI_FORMAT_B8G8R8X8_UNORM = 88] = "DXGI_FORMAT_B8G8R8X8_UNORM", t[t.DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM = 89] = "DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM", t[t.DXGI_FORMAT_B8G8R8A8_TYPELESS = 90] = "DXGI_FORMAT_B8G8R8A8_TYPELESS", t[t.DXGI_FORMAT_B8G8R8A8_UNORM_SRGB = 91] = "DXGI_FORMAT_B8G8R8A8_UNORM_SRGB", t[t.DXGI_FORMAT_B8G8R8X8_TYPELESS = 92] = "DXGI_FORMAT_B8G8R8X8_TYPELESS", t[t.DXGI_FORMAT_B8G8R8X8_UNORM_SRGB = 93] = "DXGI_FORMAT_B8G8R8X8_UNORM_SRGB", t[t.DXGI_FORMAT_BC6H_TYPELESS = 94] = "DXGI_FORMAT_BC6H_TYPELESS", t[t.DXGI_FORMAT_BC6H_UF16 = 95] = "DXGI_FORMAT_BC6H_UF16", t[t.DXGI_FORMAT_BC6H_SF16 = 96] = "DXGI_FORMAT_BC6H_SF16", t[t.DXGI_FORMAT_BC7_TYPELESS = 97] = "DXGI_FORMAT_BC7_TYPELESS", t[t.DXGI_FORMAT_BC7_UNORM = 98] = "DXGI_FORMAT_BC7_UNORM", t[t.DXGI_FORMAT_BC7_UNORM_SRGB = 99] = "DXGI_FORMAT_BC7_UNORM_SRGB", t[t.DXGI_FORMAT_AYUV = 100] = "DXGI_FORMAT_AYUV",t[t.DXGI_FORMAT_Y410 = 101] = "DXGI_FORMAT_Y410",t[t.DXGI_FORMAT_Y416 = 102] = "DXGI_FORMAT_Y416",t[t.DXGI_FORMAT_NV12 = 103] = "DXGI_FORMAT_NV12",t[t.DXGI_FORMAT_P010 = 104] = "DXGI_FORMAT_P010",t[t.DXGI_FORMAT_P016 = 105] = "DXGI_FORMAT_P016",t[t.DXGI_FORMAT_420_OPAQUE = 106] = "DXGI_FORMAT_420_OPAQUE",t[t.DXGI_FORMAT_YUY2 = 107] = "DXGI_FORMAT_YUY2",t[t.DXGI_FORMAT_Y210 = 108] = "DXGI_FORMAT_Y210",t[t.DXGI_FORMAT_Y216 = 109] = "DXGI_FORMAT_Y216",t[t.DXGI_FORMAT_NV11 = 110] = "DXGI_FORMAT_NV11",t[t.DXGI_FORMAT_AI44 = 111] = "DXGI_FORMAT_AI44",t[t.DXGI_FORMAT_IA44 = 112] = "DXGI_FORMAT_IA44",t[t.DXGI_FORMAT_P8 = 113] = "DXGI_FORMAT_P8",t[t.DXGI_FORMAT_A8P8 = 114] = "DXGI_FORMAT_A8P8",t[t.DXGI_FORMAT_B4G4R4A4_UNORM = 115] = "DXGI_FORMAT_B4G4R4A4_UNORM",t[t.DXGI_FORMAT_P208 = 116] = "DXGI_FORMAT_P208",t[t.DXGI_FORMAT_V208 = 117] = "DXGI_FORMAT_V208",t[t.DXGI_FORMAT_V408 = 118] = "DXGI_FORMAT_V408",t[t.DXGI_FORMAT_SAMPLER_FEEDBACK_MIN_MIP_OPAQUE = 119] = "DXGI_FORMAT_SAMPLER_FEEDBACK_MIN_MIP_OPAQUE",t[t.DXGI_FORMAT_SAMPLER_FEEDBACK_MIP_REGION_USED_OPAQUE = 120] = "DXGI_FORMAT_SAMPLER_FEEDBACK_MIP_REGION_USED_OPAQUE",t[t.DXGI_FORMAT_FORCE_UINT = 121] = "DXGI_FORMAT_FORCE_UINT"
    }(ps || (ps = {})), function (t) {
        t[t.DDS_DIMENSION_TEXTURE1D = 2] = "DDS_DIMENSION_TEXTURE1D", t[t.DDS_DIMENSION_TEXTURE2D = 3] = "DDS_DIMENSION_TEXTURE2D", t[t.DDS_DIMENSION_TEXTURE3D = 6] = "DDS_DIMENSION_TEXTURE3D"
    }(_s || (_s = {}));
    var ms, vs, ys,
        gs = ((ls = {})[827611204] = t.INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT1_EXT, ls[861165636] = t.INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT3_EXT, ls[894720068] = t.INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT5_EXT, ls),
        Es = ((cs = {})[ps.DXGI_FORMAT_BC1_TYPELESS] = t.INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT1_EXT, cs[ps.DXGI_FORMAT_BC1_UNORM] = t.INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT1_EXT, cs[ps.DXGI_FORMAT_BC2_TYPELESS] = t.INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT3_EXT, cs[ps.DXGI_FORMAT_BC2_UNORM] = t.INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT3_EXT, cs[ps.DXGI_FORMAT_BC3_TYPELESS] = t.INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT5_EXT, cs[ps.DXGI_FORMAT_BC3_UNORM] = t.INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT5_EXT, cs[ps.DXGI_FORMAT_BC1_UNORM_SRGB] = t.INTERNAL_FORMATS.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT, cs[ps.DXGI_FORMAT_BC2_UNORM_SRGB] = t.INTERNAL_FORMATS.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT, cs[ps.DXGI_FORMAT_BC3_UNORM_SRGB] = t.INTERNAL_FORMATS.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT, cs),
        Ts = function () {
            function t() {
            }

            return t.use = function (e, r) {
                if ("dds" === e.extension && e.data) try {
                    Object.assign(e, fs(e.name || e.url, t.parse(e.data), e.metadata))
                } catch (t) {
                    return void r(t)
                }
                r()
            }, t.parse = function (t) {
                var e = new Uint32Array(t);
                if (542327876 !== e[0]) throw new Error("Invalid DDS file magic word");
                var r = new Uint32Array(t, 0, 124 / Uint32Array.BYTES_PER_ELEMENT), i = r[3], n = r[4], o = r[7],
                    s = new Uint32Array(t, 19 * Uint32Array.BYTES_PER_ELEMENT, 32 / Uint32Array.BYTES_PER_ELEMENT), a = s[1];
                if (4 & a) {
                    var h = s[2];
                    if (808540228 !== h) {
                        var u = gs[h], l = new Uint8Array(t, 128);
                        return [new To(l, {format: u, width: n, height: i, levels: o})]
                    }
                    var c = new Uint32Array(e.buffer, 128, 20 / Uint32Array.BYTES_PER_ELEMENT), d = c[0], f = c[1], p = c[2], _ = c[3], m = Es[d];
                    if (void 0 === m) throw new Error("DDSLoader cannot parse texture data with DXGI format " + d);
                    if (4 === p) throw new Error("DDSLoader does not support cubemap textures");
                    if (f === _s.DDS_DIMENSION_TEXTURE3D) throw new Error("DDSLoader does not supported 3D texture data");
                    var v = new Array;
                    if (1 === _) v.push(new Uint8Array(t, 148)); else {
                        for (var y = vo[m], g = 0, E = n, T = i, b = 0; b < o; b++) g += Math.max(1, E + 3 & -4) * Math.max(1, T + 3 & -4) * y, E >>>= 1, T >>>= 1;
                        var x = 148;
                        for (b = 0; b < _; b++) v.push(new Uint8Array(t, x, g)), x += g
                    }
                    return v.map(function (t) {
                        return new To(t, {format: m, width: n, height: i, levels: o})
                    })
                }
                if (64 & a) throw new Error("DDSLoader does not support uncompressed texture data.");
                if (512 & a) throw new Error("DDSLoader does not supported YUV uncompressed texture data.");
                if (131072 & a) throw new Error("DDSLoader does not support single-channel (lumninance) texture data!");
                if (2 & a) throw new Error("DDSLoader does not support single-channel (alpha) texture data!");
                throw new Error("DDSLoader failed to load a texture file due to an unknown reason!")
            }, t
        }();
    mo.setExtensionXhrType("ktx", mo.XHR_RESPONSE_TYPE.BUFFER);
    var bs = [171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10],
        xs = ((ms = {})[t.TYPES.UNSIGNED_BYTE] = 1, ms[t.TYPES.UNSIGNED_SHORT] = 2, ms[t.TYPES.FLOAT] = 4, ms[t.TYPES.HALF_FLOAT] = 8, ms),
        As = ((vs = {})[t.FORMATS.RGBA] = 4, vs[t.FORMATS.RGB] = 3, vs[t.FORMATS.LUMINANCE] = 1, vs[t.FORMATS.LUMINANCE_ALPHA] = 2, vs[t.FORMATS.ALPHA] = 1, vs),
        Ss = ((ys = {})[t.TYPES.UNSIGNED_SHORT_4_4_4_4] = 2, ys[t.TYPES.UNSIGNED_SHORT_5_5_5_1] = 2, ys[t.TYPES.UNSIGNED_SHORT_5_6_5] = 2, ys), Os = function () {
            function t() {
            }

            return t.use = function (e, r) {
                if ("ktx" === e.extension && e.data) try {
                    var i = e.name || e.url;
                    Object.assign(e, fs(i, t.parse(i, e.data), e.metadata))
                } catch (t) {
                    return void r(t)
                }
                r()
            }, t.parse = function (e, r) {
                var i = new DataView(r);
                if (!t.validate(e, i)) return null;
                var n = 67305985 === i.getUint32(12, !0), o = i.getUint32(16, n), s = i.getUint32(24, n), a = i.getUint32(28, n), h = i.getUint32(36, n), u = i.getUint32(40, n) || 1,
                    l = i.getUint32(44, n) || 1, c = i.getUint32(48, n) || 1, d = i.getUint32(52, n), f = i.getUint32(56, n), p = i.getUint32(60, n);
                if (0 === u || 1 !== l) throw new Error("Only 2D textures are supported");
                if (1 !== d) throw new Error("CubeTextures are not supported by KTXLoader yet!");
                if (1 !== c) throw new Error("WebGL does not support array textures");
                var _, m = h + 3 & -4, v = u + 3 & -4, y = new Array(c), g = h * u;
                if (0 === o && (g = m * v), void 0 === (_ = 0 !== o ? xs[o] ? xs[o] * As[s] : Ss[o] : vo[a])) throw new Error("Unable to resolve the pixel format stored in the *.ktx file!");
                for (var E = g * _, T = h, b = u, x = m, A = v, S = 64 + p, O = 0; O < f; O++) {
                    for (var R = i.getUint32(S, n), P = S + 4, I = 0; I < c; I++) {
                        var M = y[I];
                        M || (M = y[I] = new Array(f)), M[O] = {levelID: O, levelWidth: f > 1 ? T : x, levelHeight: f > 1 ? b : A, levelBuffer: new Uint8Array(r, P, E)}, P += E
                    }
                    S = (S += R + 4) % 4 != 0 ? S + 4 - S % 4 : S, E = (x = (T = T >> 1 || 1) + 4 - 1 & -4) * (A = (b = b >> 1 || 1) + 4 - 1 & -4) * _
                }
                if (0 !== o) throw new Error("TODO: Uncompressed");
                return y.map(function (t) {
                    return new To(null, {format: a, width: h, height: u, levels: f, levelBuffers: t})
                })
            }, t.validate = function (t, e) {
                for (var r = 0; r < bs.length; r++) if (e.getUint8(r) !== bs[r]) return !1;
                return !0
            }, t
        }(), Rs = function (t, e) {
            return (Rs = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
            })(t, e)
        };

    function Ps(t, e) {
        function r() {
            this.constructor = t
        }

        Rs(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
    }

    var Is = function (e) {
            function r(r, i, n, o) {
                void 0 === r && (r = 1500), void 0 === n && (n = 16384), void 0 === o && (o = !1);
                var s = e.call(this) || this;
                return n > 16384 && (n = 16384), s._properties = [!1, !0, !1, !1, !1], s._maxSize = r, s._batchSize = n, s._buffers = null, s._bufferUpdateIDs = [], s._updateID = 0, s.interactiveChildren = !1, s.blendMode = t.BLEND_MODES.NORMAL, s.autoResize = o, s.roundPixels = !0, s.baseTexture = null, s.setProperties(i), s._tint = 0, s.tintRgb = new Float32Array(4), s.tint = 16777215, s
            }

            return Ps(r, e), r.prototype.setProperties = function (t) {
                t && (this._properties[0] = "vertices" in t || "scale" in t ? !!t.vertices || !!t.scale : this._properties[0], this._properties[1] = "position" in t ? !!t.position : this._properties[1], this._properties[2] = "rotation" in t ? !!t.rotation : this._properties[2], this._properties[3] = "uvs" in t ? !!t.uvs : this._properties[3], this._properties[4] = "tint" in t || "alpha" in t ? !!t.tint || !!t.alpha : this._properties[4])
            }, r.prototype.updateTransform = function () {
                this.displayObjectUpdateTransform()
            }, Object.defineProperty(r.prototype, "tint", {
                get: function () {
                    return this._tint
                }, set: function (t) {
                    this._tint = t, Wt(t, this.tintRgb)
                }, enumerable: !1, configurable: !0
            }), r.prototype.render = function (t) {
                var e = this;
                this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable && (this.baseTexture || (this.baseTexture = this.children[0]._texture.baseTexture, this.baseTexture.valid || this.baseTexture.once("update", function () {
                    return e.onChildrenChange(0)
                })), t.batch.setObjectRenderer(t.plugins.particle), t.plugins.particle.render(this))
            }, r.prototype.onChildrenChange = function (t) {
                for (var e = Math.floor(t / this._batchSize); this._bufferUpdateIDs.length < e;) this._bufferUpdateIDs.push(0);
                this._bufferUpdateIDs[e] = ++this._updateID
            }, r.prototype.dispose = function () {
                if (this._buffers) {
                    for (var t = 0; t < this._buffers.length; ++t) this._buffers[t].destroy();
                    this._buffers = null
                }
            }, r.prototype.destroy = function (t) {
                e.prototype.destroy.call(this, t), this.dispose(), this._properties = null, this._buffers = null, this._bufferUpdateIDs = null
            }, r
        }(qe), Ms = function () {
            function e(e, r, i) {
                this.geometry = new Zr, this.indexBuffer = null, this.size = i, this.dynamicProperties = [], this.staticProperties = [];
                for (var n = 0; n < e.length; ++n) {
                    var o = e[n];
                    o = {
                        attributeName: o.attributeName,
                        size: o.size,
                        uploadFunction: o.uploadFunction,
                        type: o.type || t.TYPES.FLOAT,
                        offset: o.offset
                    }, r[n] ? this.dynamicProperties.push(o) : this.staticProperties.push(o)
                }
                this.staticStride = 0, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.dynamicStride = 0, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this._updateID = 0, this.initBuffers()
            }

            return e.prototype.initBuffers = function () {
                var e = this.geometry, r = 0;
                this.indexBuffer = new Yr(ee(this.size), !0, !0), e.addIndex(this.indexBuffer), this.dynamicStride = 0;
                for (var i = 0; i < this.dynamicProperties.length; ++i) (a = this.dynamicProperties[i]).offset = r, r += a.size, this.dynamicStride += a.size;
                var n = new ArrayBuffer(this.size * this.dynamicStride * 4 * 4);
                this.dynamicData = new Float32Array(n), this.dynamicDataUint32 = new Uint32Array(n), this.dynamicBuffer = new Yr(this.dynamicData, !1, !1);
                var o = 0;
                for (this.staticStride = 0, i = 0; i < this.staticProperties.length; ++i) (a = this.staticProperties[i]).offset = o, o += a.size, this.staticStride += a.size;
                var s = new ArrayBuffer(this.size * this.staticStride * 4 * 4);
                for (this.staticData = new Float32Array(s), this.staticDataUint32 = new Uint32Array(s), this.staticBuffer = new Yr(this.staticData, !0, !1), i = 0; i < this.dynamicProperties.length; ++i) {
                    var a = this.dynamicProperties[i];
                    e.addAttribute(a.attributeName, this.dynamicBuffer, 0, a.type === t.TYPES.UNSIGNED_BYTE, a.type, 4 * this.dynamicStride, 4 * a.offset)
                }
                for (i = 0; i < this.staticProperties.length; ++i) a = this.staticProperties[i], e.addAttribute(a.attributeName, this.staticBuffer, 0, a.type === t.TYPES.UNSIGNED_BYTE, a.type, 4 * this.staticStride, 4 * a.offset)
            }, e.prototype.uploadDynamic = function (e, r, i) {
                for (var n = 0; n < this.dynamicProperties.length; n++) {
                    var o = this.dynamicProperties[n];
                    o.uploadFunction(e, r, i, o.type === t.TYPES.UNSIGNED_BYTE ? this.dynamicDataUint32 : this.dynamicData, this.dynamicStride, o.offset)
                }
                this.dynamicBuffer._updateID++
            }, e.prototype.uploadStatic = function (e, r, i) {
                for (var n = 0; n < this.staticProperties.length; n++) {
                    var o = this.staticProperties[n];
                    o.uploadFunction(e, r, i, o.type === t.TYPES.UNSIGNED_BYTE ? this.staticDataUint32 : this.staticData, this.staticStride, o.offset)
                }
                this.staticBuffer._updateID++
            }, e.prototype.destroy = function () {
                this.indexBuffer = null, this.dynamicProperties = null, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this.staticProperties = null, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.geometry.destroy()
            }, e
        }(),
        ws = "varying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n    vec4 color = texture2D(uSampler, vTextureCoord) * vColor;\n    gl_FragColor = color;\n}",
        Ds = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nattribute vec2 aPositionCoord;\nattribute float aRotation;\n\nuniform mat3 translationMatrix;\nuniform vec4 uColor;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvoid main(void){\n    float x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);\n    float y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);\n\n    vec2 v = vec2(x, y);\n    v = v + aPositionCoord;\n\n    gl_Position = vec4((translationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vColor = aColor * uColor;\n}\n",
        Cs = function (e) {
            function r(r) {
                var i = e.call(this, r) || this;
                return i.shader = null, i.properties = null, i.tempMatrix = new De, i.properties = [{
                    attributeName: "aVertexPosition",
                    size: 2,
                    uploadFunction: i.uploadVertices,
                    offset: 0
                }, {attributeName: "aPositionCoord", size: 2, uploadFunction: i.uploadPosition, offset: 0}, {
                    attributeName: "aRotation",
                    size: 1,
                    uploadFunction: i.uploadRotation,
                    offset: 0
                }, {attributeName: "aTextureCoord", size: 2, uploadFunction: i.uploadUvs, offset: 0}, {
                    attributeName: "aColor",
                    size: 1,
                    type: t.TYPES.UNSIGNED_BYTE,
                    uploadFunction: i.uploadTint,
                    offset: 0
                }], i.shader = Xi.from(Ds, ws, {}), i.state = ki.for2d(), i
            }

            return Ps(r, e), r.prototype.render = function (t) {
                var e = t.children, r = t._maxSize, i = t._batchSize, n = this.renderer, o = e.length;
                if (0 !== o) {
                    o > r && !t.autoResize && (o = r);
                    var s = t._buffers;
                    s || (s = t._buffers = this.generateBuffers(t));
                    var a = e[0]._texture.baseTexture;
                    this.state.blendMode = Jt(t.blendMode, a.alphaMode), n.state.set(this.state);
                    var h = n.gl, u = t.worldTransform.copyTo(this.tempMatrix);
                    u.prepend(n.globalUniforms.uniforms.projectionMatrix), this.shader.uniforms.translationMatrix = u.toArray(!0), this.shader.uniforms.uColor = Qt(t.tintRgb, t.worldAlpha, this.shader.uniforms.uColor, a.alphaMode), this.shader.uniforms.uSampler = a, this.renderer.shader.bind(this.shader);
                    for (var l = !1, c = 0, d = 0; c < o; c += i, d += 1) {
                        var f = o - c;
                        f > i && (f = i), d >= s.length && s.push(this._generateOneMoreBuffer(t));
                        var p = s[d];
                        p.uploadDynamic(e, c, f);
                        var _ = t._bufferUpdateIDs[d] || 0;
                        (l = l || p._updateID < _) && (p._updateID = t._updateID, p.uploadStatic(e, c, f)), n.geometry.bind(p.geometry), h.drawElements(h.TRIANGLES, 6 * f, h.UNSIGNED_SHORT, 0)
                    }
                }
            }, r.prototype.generateBuffers = function (t) {
                for (var e = [], r = t._maxSize, i = t._batchSize, n = t._properties, o = 0; o < r; o += i) e.push(new Ms(this.properties, n, i));
                return e
            }, r.prototype._generateOneMoreBuffer = function (t) {
                var e = t._batchSize, r = t._properties;
                return new Ms(this.properties, r, e)
            }, r.prototype.uploadVertices = function (t, e, r, i, n, o) {
                for (var s = 0, a = 0, h = 0, u = 0, l = 0; l < r; ++l) {
                    var c = t[e + l], d = c._texture, f = c.scale.x, p = c.scale.y, _ = d.trim, m = d.orig;
                    _ ? (s = (a = _.x - c.anchor.x * m.width) + _.width, h = (u = _.y - c.anchor.y * m.height) + _.height) : (s = m.width * (1 - c.anchor.x), a = m.width * -c.anchor.x, h = m.height * (1 - c.anchor.y), u = m.height * -c.anchor.y), i[o] = a * f, i[o + 1] = u * p, i[o + n] = s * f, i[o + n + 1] = u * p, i[o + 2 * n] = s * f, i[o + 2 * n + 1] = h * p, i[o + 3 * n] = a * f, i[o + 3 * n + 1] = h * p, o += 4 * n
                }
            }, r.prototype.uploadPosition = function (t, e, r, i, n, o) {
                for (var s = 0; s < r; s++) {
                    var a = t[e + s].position;
                    i[o] = a.x, i[o + 1] = a.y, i[o + n] = a.x, i[o + n + 1] = a.y, i[o + 2 * n] = a.x, i[o + 2 * n + 1] = a.y, i[o + 3 * n] = a.x, i[o + 3 * n + 1] = a.y, o += 4 * n
                }
            }, r.prototype.uploadRotation = function (t, e, r, i, n, o) {
                for (var s = 0; s < r; s++) {
                    var a = t[e + s].rotation;
                    i[o] = a, i[o + n] = a, i[o + 2 * n] = a, i[o + 3 * n] = a, o += 4 * n
                }
            }, r.prototype.uploadUvs = function (t, e, r, i, n, o) {
                for (var s = 0; s < r; ++s) {
                    var a = t[e + s]._texture._uvs;
                    a ? (i[o] = a.x0, i[o + 1] = a.y0, i[o + n] = a.x1, i[o + n + 1] = a.y1, i[o + 2 * n] = a.x2, i[o + 2 * n + 1] = a.y2, i[o + 3 * n] = a.x3, i[o + 3 * n + 1] = a.y3, o += 4 * n) : (i[o] = 0, i[o + 1] = 0, i[o + n] = 0, i[o + n + 1] = 0, i[o + 2 * n] = 0, i[o + 2 * n + 1] = 0, i[o + 3 * n] = 0, i[o + 3 * n + 1] = 0, o += 4 * n)
                }
            }, r.prototype.uploadTint = function (t, e, r, i, n, o) {
                for (var s = 0; s < r; ++s) {
                    var a = t[e + s], h = a._texture.baseTexture.alphaMode > 0, u = a.alpha, l = u < 1 && h ? $t(a._tintRGB, u) : a._tintRGB + (255 * u << 24);
                    i[o] = l, i[o + n] = l, i[o + 2 * n] = l, i[o + 3 * n] = l, o += 4 * n
                }
            }, r.prototype.destroy = function () {
                e.prototype.destroy.call(this), this.shader && (this.shader.destroy(), this.shader = null), this.tempMatrix = null
            }, r
        }(oi);
    !function (t) {
        t.MITER = "miter", t.BEVEL = "bevel", t.ROUND = "round"
    }(t.LINE_JOIN || (t.LINE_JOIN = {})), function (t) {
        t.BUTT = "butt", t.ROUND = "round", t.SQUARE = "square"
    }(t.LINE_CAP || (t.LINE_CAP = {}));
    var Ns = {
        adaptive: !0, maxLength: 10, minSegments: 8, maxSegments: 2048, epsilon: 1e-4, _segmentsCount: function (t, e) {
            if (void 0 === e && (e = 20), !this.adaptive || !t || isNaN(t)) return e;
            var r = Math.ceil(t / this.maxLength);
            return r < this.minSegments ? r = this.minSegments : r > this.maxSegments && (r = this.maxSegments), r
        }
    }, Ls = function () {
        function t() {
            this.color = 16777215, this.alpha = 1, this.texture = Ur.WHITE, this.matrix = null, this.visible = !1, this.reset()
        }

        return t.prototype.clone = function () {
            var e = new t;
            return e.color = this.color, e.alpha = this.alpha, e.texture = this.texture, e.matrix = this.matrix, e.visible = this.visible, e
        }, t.prototype.reset = function () {
            this.color = 16777215, this.alpha = 1, this.texture = Ur.WHITE, this.matrix = null, this.visible = !1
        }, t.prototype.destroy = function () {
            this.texture = null, this.matrix = null
        }, t
    }(), Fs = function (t, e) {
        return (Fs = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
            t.__proto__ = e
        } || function (t, e) {
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
        })(t, e)
    };

    function Bs(t, e) {
        function r() {
            this.constructor = t
        }

        Fs(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
    }

    var Us = {
        build: function (t) {
            t.points = t.shape.points.slice()
        }, triangulate: function (t, e) {
            var r = t.points, i = t.holes, n = e.points, o = e.indices;
            if (r.length >= 6) {
                for (var s = [], a = 0; a < i.length; a++) {
                    var h = i[a];
                    s.push(r.length / 2), r = r.concat(h.points)
                }
                var u = j(r, s, 2);
                if (!u) return;
                var l = n.length / 2;
                for (a = 0; a < u.length; a += 3) o.push(u[a] + l), o.push(u[a + 1] + l), o.push(u[a + 2] + l);
                for (a = 0; a < r.length; a++) n.push(r[a])
            }
        }
    }, Gs = {
        build: function (e) {
            var r, i, n = e.shape, o = e.points, s = n.x, a = n.y;
            if (o.length = 0, e.type === t.SHAPES.CIRC) r = n.radius, i = n.radius; else {
                var h = e.shape;
                r = h.width, i = h.height
            }
            if (0 !== r && 0 !== i) {
                var u = Math.floor(30 * Math.sqrt(n.radius)) || Math.floor(15 * Math.sqrt(r + i));
                u /= 2.3;
                for (var l = 2 * Math.PI / u, c = 0; c < u - .5; c++) o.push(s + Math.sin(-l * c) * r, a + Math.cos(-l * c) * i);
                o.push(o[0], o[1])
            }
        }, triangulate: function (t, e) {
            var r = t.points, i = e.points, n = e.indices, o = i.length / 2, s = o, a = t.shape, h = t.matrix, u = a.x, l = a.y;
            i.push(t.matrix ? h.a * u + h.c * l + h.tx : u, t.matrix ? h.b * u + h.d * l + h.ty : l);
            for (var c = 0; c < r.length; c += 2) i.push(r[c], r[c + 1]), n.push(o++, s, o)
        }
    }, Xs = {
        build: function (t) {
            var e = t.shape, r = e.x, i = e.y, n = e.width, o = e.height, s = t.points;
            s.length = 0, s.push(r, i, r + n, i, r + n, i + o, r, i + o)
        }, triangulate: function (t, e) {
            var r = t.points, i = e.points, n = i.length / 2;
            i.push(r[0], r[1], r[2], r[3], r[6], r[7], r[4], r[5]), e.indices.push(n, n + 1, n + 2, n + 1, n + 2, n + 3)
        }
    };

    function ks(t, e, r) {
        return t + (e - t) * r
    }

    function js(t, e, r, i, n, o, s) {
        void 0 === s && (s = []);
        for (var a = s, h = 0, u = 0, l = 0, c = 0, d = 0, f = 0, p = 0, _ = 0; p <= 20; ++p) h = ks(t, r, _ = p / 20), u = ks(e, i, _), l = ks(r, n, _), c = ks(i, o, _), d = ks(h, l, _), f = ks(u, c, _), a.push(d, f);
        return a
    }

    var Hs = {
        build: function (t) {
            var e = t.shape, r = t.points, i = e.x, n = e.y, o = e.width, s = e.height, a = Math.max(0, Math.min(e.radius, Math.min(o, s) / 2));
            r.length = 0, a ? (js(i, n + a, i, n, i + a, n, r), js(i + o - a, n, i + o, n, i + o, n + a, r), js(i + o, n + s - a, i + o, n + s, i + o - a, n + s, r), js(i + a, n + s, i, n + s, i, n + s - a, r)) : r.push(i, n, i + o, n, i + o, n + s, i, n + s)
        }, triangulate: function (t, e) {
            for (var r = t.points, i = e.points, n = e.indices, o = i.length / 2, s = j(r, null, 2), a = 0, h = s.length; a < h; a += 3) n.push(s[a] + o), n.push(s[a + 1] + o), n.push(s[a + 2] + o);
            for (a = 0, h = r.length; a < h; a++) i.push(r[a], r[++a])
        }
    };

    function Ys(t, e, r, i, n, o, s, a) {
        var h, u;
        s ? (h = i, u = -r) : (h = -i, u = r);
        var l = t - r * n + h, c = e - i * n + u, d = t + r * o + h, f = e + i * o + u;
        return a.push(l, c), a.push(d, f), 2
    }

    function Vs(t, e, r, i, n, o, s, a) {
        var h = r - t, u = i - e, l = Math.atan2(h, u), c = Math.atan2(n - t, o - e);
        a && l < c ? l += 2 * Math.PI : !a && l > c && (c += 2 * Math.PI);
        var d = l, f = c - l, p = Math.abs(f), _ = Math.sqrt(h * h + u * u), m = 1 + (15 * p * Math.sqrt(_) / Math.PI >> 0), v = f / m;
        if (d += v, a) {
            s.push(t, e), s.push(r, i);
            for (var y = 1, g = d; y < m; y++, g += v) s.push(t, e), s.push(t + Math.sin(g) * _, e + Math.cos(g) * _);
            s.push(t, e), s.push(n, o)
        } else {
            for (s.push(r, i), s.push(t, e), y = 1, g = d; y < m; y++, g += v) s.push(t + Math.sin(g) * _, e + Math.cos(g) * _), s.push(t, e);
            s.push(n, o), s.push(t, e)
        }
        return 2 * m
    }

    function zs(e, r) {
        e.lineStyle.native ? function (e, r) {
            var i = 0, n = e.shape, o = e.points || n.points, s = n.type !== t.SHAPES.POLY || n.closeStroke;
            if (0 !== o.length) {
                var a = r.points, h = r.indices, u = o.length / 2, l = a.length / 2, c = l;
                for (a.push(o[0], o[1]), i = 1; i < u; i++) a.push(o[2 * i], o[2 * i + 1]), h.push(c, c + 1), c++;
                s && h.push(c, l)
            }
        }(e, r) : function (e, r) {
            var i = e.shape, n = e.points || i.points.slice(), o = r.closePointEps;
            if (0 !== n.length) {
                var s = e.lineStyle, a = new Me(n[0], n[1]), h = new Me(n[n.length - 2], n[n.length - 1]), u = i.type !== t.SHAPES.POLY || i.closeStroke,
                    l = Math.abs(a.x - h.x) < o && Math.abs(a.y - h.y) < o;
                if (u) {
                    n = n.slice(), l && (n.pop(), n.pop(), h.set(n[n.length - 2], n[n.length - 1]));
                    var c = .5 * (a.x + h.x), d = .5 * (h.y + a.y);
                    n.unshift(c, d), n.push(c, d)
                }
                var f = r.points, p = n.length / 2, _ = n.length, m = f.length / 2, v = s.width / 2, y = v * v, g = s.miterLimit * s.miterLimit, E = n[0], T = n[1], b = n[2],
                    x = n[3], A = 0, S = 0, O = -(T - x), R = E - b, P = 0, I = 0, M = Math.sqrt(O * O + R * R);
                O /= M, R /= M, O *= v, R *= v;
                var w = s.alignment, D = 2 * (1 - w), C = 2 * w;
                u || (s.cap === t.LINE_CAP.ROUND ? _ += Vs(E - O * (D - C) * .5, T - R * (D - C) * .5, E - O * D, T - R * D, E + O * C, T + R * C, f, !0) + 2 : s.cap === t.LINE_CAP.SQUARE && (_ += Ys(E, T, O, R, D, C, !0, f))), f.push(E - O * D, T - R * D), f.push(E + O * C, T + R * C);
                for (var N = 1; N < p - 1; ++N) {
                    E = n[2 * (N - 1)], T = n[2 * (N - 1) + 1], b = n[2 * N], x = n[2 * N + 1], A = n[2 * (N + 1)], S = n[2 * (N + 1) + 1], O = -(T - x), R = E - b, O /= M = Math.sqrt(O * O + R * R), R /= M, O *= v, R *= v, P = -(x - S), I = b - A, P /= M = Math.sqrt(P * P + I * I), I /= M, P *= v, I *= v;
                    var L = b - E, F = T - x, B = b - A, U = S - x, G = F * B - U * L, X = G < 0;
                    if (Math.abs(G) < .1) f.push(b - O * D, x - R * D), f.push(b + O * C, x + R * C); else {
                        var k = (-O + E) * (-R + x) - (-O + b) * (-R + T), j = (-P + A) * (-I + x) - (-P + b) * (-I + S), H = (L * j - B * k) / G, Y = (U * k - F * j) / G,
                            V = (H - b) * (H - b) + (Y - x) * (Y - x), z = b + (H - b) * D, W = x + (Y - x) * D, q = b - (H - b) * C, K = x - (Y - x) * C, Z = X ? D : C;
                        V <= Math.min(L * L + F * F, B * B + U * U) + Z * Z * y ? s.join === t.LINE_JOIN.BEVEL || V / y > g ? (X ? (f.push(z, W), f.push(b + O * C, x + R * C), f.push(z, W), f.push(b + P * C, x + I * C)) : (f.push(b - O * D, x - R * D), f.push(q, K), f.push(b - P * D, x - I * D), f.push(q, K)), _ += 2) : s.join === t.LINE_JOIN.ROUND ? X ? (f.push(z, W), f.push(b + O * C, x + R * C), _ += Vs(b, x, b + O * C, x + R * C, b + P * C, x + I * C, f, !0) + 4, f.push(z, W), f.push(b + P * C, x + I * C)) : (f.push(b - O * D, x - R * D), f.push(q, K), _ += Vs(b, x, b - O * D, x - R * D, b - P * D, x - I * D, f, !1) + 4, f.push(b - P * D, x - I * D), f.push(q, K)) : (f.push(z, W), f.push(q, K)) : (f.push(b - O * D, x - R * D), f.push(b + O * C, x + R * C), s.join === t.LINE_JOIN.BEVEL || V / y > g || (s.join === t.LINE_JOIN.ROUND ? _ += X ? Vs(b, x, b + O * C, x + R * C, b + P * C, x + I * C, f, !0) + 2 : Vs(b, x, b - O * D, x - R * D, b - P * D, x - I * D, f, !1) + 2 : (X ? (f.push(q, K), f.push(q, K)) : (f.push(z, W), f.push(z, W)), _ += 2)), f.push(b - P * D, x - I * D), f.push(b + P * C, x + I * C), _ += 2)
                    }
                }
                E = n[2 * (p - 2)], T = n[2 * (p - 2) + 1], b = n[2 * (p - 1)], O = -(T - (x = n[2 * (p - 1) + 1])), R = E - b, O /= M = Math.sqrt(O * O + R * R), R /= M, O *= v, R *= v, f.push(b - O * D, x - R * D), f.push(b + O * C, x + R * C), u || (s.cap === t.LINE_CAP.ROUND ? _ += Vs(b - O * (D - C) * .5, x - R * (D - C) * .5, b - O * D, x - R * D, b + O * C, x + R * C, f, !1) + 2 : s.cap === t.LINE_CAP.SQUARE && (_ += Ys(b, x, O, R, D, C, !1, f)));
                var J = r.indices, Q = Ns.epsilon * Ns.epsilon;
                for (N = m; N < _ + m - 2; ++N) E = f[2 * N], T = f[2 * N + 1], b = f[2 * (N + 1)], x = f[2 * (N + 1) + 1], A = f[2 * (N + 2)], S = f[2 * (N + 2) + 1], Math.abs(E * (x - S) + b * (S - T) + A * (T - x)) < Q || J.push(N, N + 1, N + 2)
            }
        }(e, r)
    }

    var Ws, qs = function () {
            function t() {
            }

            return t.curveTo = function (t, e, r, i, n, o) {
                var s = o[o.length - 2], a = o[o.length - 1] - e, h = s - t, u = i - e, l = r - t, c = Math.abs(a * l - h * u);
                if (c < 1e-8 || 0 === n) return o[o.length - 2] === t && o[o.length - 1] === e || o.push(t, e), null;
                var d = a * a + h * h, f = u * u + l * l, p = a * u + h * l, _ = n * Math.sqrt(d) / c, m = n * Math.sqrt(f) / c, v = _ * p / d, y = m * p / f, g = _ * l + m * h,
                    E = _ * u + m * a, T = h * (m + v), b = a * (m + v), x = l * (_ + y), A = u * (_ + y);
                return {cx: g + t, cy: E + e, radius: n, startAngle: Math.atan2(b - E, T - g), endAngle: Math.atan2(A - E, x - g), anticlockwise: h * u > l * a}
            }, t.arc = function (t, e, r, i, n, o, s, a, h) {
                for (var u = s - o, l = Ns._segmentsCount(Math.abs(u) * n, 40 * Math.ceil(Math.abs(u) / be)), c = u / (2 * l), d = 2 * c, f = Math.cos(c), p = Math.sin(c), _ = l - 1, m = _ % 1 / _, v = 0; v <= _; ++v) {
                    var y = c + o + d * (v + m * v), g = Math.cos(y), E = -Math.sin(y);
                    h.push((f * g + p * E) * n + r, (f * -E + p * g) * n + i)
                }
            }, t
        }(), Ks = function () {
            function t() {
            }

            return t.curveLength = function (t, e, r, i, n, o, s, a) {
                for (var h = 0, u = 0, l = 0, c = 0, d = 0, f = 0, p = 0, _ = 0, m = 0, v = 0, y = 0, g = t, E = e, T = 1; T <= 10; ++T) v = g - (_ = (p = (f = (d = 1 - (u = T / 10)) * d) * d) * t + 3 * f * u * r + 3 * d * (l = u * u) * n + (c = l * u) * s), y = E - (m = p * e + 3 * f * u * i + 3 * d * l * o + c * a), g = _, E = m, h += Math.sqrt(v * v + y * y);
                return h
            }, t.curveTo = function (e, r, i, n, o, s, a) {
                var h = a[a.length - 2], u = a[a.length - 1];
                a.length -= 2;
                var l = Ns._segmentsCount(t.curveLength(h, u, e, r, i, n, o, s)), c = 0, d = 0, f = 0, p = 0, _ = 0;
                a.push(h, u);
                for (var m = 1, v = 0; m <= l; ++m) f = (d = (c = 1 - (v = m / l)) * c) * c, _ = (p = v * v) * v, a.push(f * h + 3 * d * v * e + 3 * c * p * i + _ * o, f * u + 3 * d * v * r + 3 * c * p * n + _ * s)
            }, t
        }(), Zs = function () {
            function t() {
            }

            return t.curveLength = function (t, e, r, i, n, o) {
                var s = t - 2 * r + n, a = e - 2 * i + o, h = 2 * r - 2 * t, u = 2 * i - 2 * e, l = 4 * (s * s + a * a), c = 4 * (s * h + a * u), d = h * h + u * u,
                    f = 2 * Math.sqrt(l + c + d), p = Math.sqrt(l), _ = 2 * l * p, m = 2 * Math.sqrt(d), v = c / p;
                return (_ * f + p * c * (f - m) + (4 * d * l - c * c) * Math.log((2 * p + v + f) / (v + m))) / (4 * _)
            }, t.curveTo = function (e, r, i, n, o) {
                for (var s = o[o.length - 2], a = o[o.length - 1], h = Ns._segmentsCount(t.curveLength(s, a, e, r, i, n)), u = 0, l = 0, c = 1; c <= h; ++c) {
                    var d = c / h;
                    u = s + (e - s) * d, l = a + (r - a) * d, o.push(u + (e + (i - e) * d - u) * d, l + (r + (n - r) * d - l) * d)
                }
            }, t
        }(), Js = function () {
            function t() {
                this.reset()
            }

            return t.prototype.begin = function (t, e, r) {
                this.reset(), this.style = t, this.start = e, this.attribStart = r
            }, t.prototype.end = function (t, e) {
                this.attribSize = e - this.attribStart, this.size = t - this.start
            }, t.prototype.reset = function () {
                this.style = null, this.size = 0, this.start = 0, this.attribStart = 0, this.attribSize = 0
            }, t
        }(), Qs = ((Ws = {})[t.SHAPES.POLY] = Us, Ws[t.SHAPES.CIRC] = Gs, Ws[t.SHAPES.ELIP] = Gs, Ws[t.SHAPES.RECT] = Xs, Ws[t.SHAPES.RREC] = Hs, Ws), $s = [], ta = [],
        ea = function () {
            function t(t, e, r, i) {
                void 0 === e && (e = null), void 0 === r && (r = null), void 0 === i && (i = null), this.shape = t, this.lineStyle = r, this.fillStyle = e, this.matrix = i, this.type = t.type, this.points = [], this.holes = []
            }

            return t.prototype.clone = function () {
                return new t(this.shape, this.fillStyle, this.lineStyle, this.matrix)
            }, t.prototype.destroy = function () {
                this.shape = null, this.holes.length = 0, this.holes = null, this.points.length = 0, this.points = null, this.lineStyle = null, this.fillStyle = null
            }, t
        }(), ra = new Me, ia = new je, na = function (e) {
            function r() {
                var t = e.call(this) || this;
                return t.uvsFloat32 = null, t.indicesUint16 = null, t.points = [], t.colors = [], t.uvs = [], t.indices = [], t.textureIds = [], t.graphicsData = [], t.dirty = 0, t.batchDirty = -1, t.cacheDirty = -1, t.clearDirty = 0, t.drawCalls = [], t.batches = [], t.shapeIndex = 0, t._bounds = new je, t.boundsDirty = -1, t.boundsPadding = 0, t.batchable = !1, t.indicesUint16 = null, t.uvsFloat32 = null, t.closePointEps = 1e-4, t
            }

            return Bs(r, e), Object.defineProperty(r.prototype, "bounds", {
                get: function () {
                    return this.boundsDirty !== this.dirty && (this.boundsDirty = this.dirty, this.calculateBounds()), this._bounds
                }, enumerable: !1, configurable: !0
            }), r.prototype.invalidate = function () {
                this.boundsDirty = -1, this.dirty++, this.batchDirty++, this.shapeIndex = 0, this.points.length = 0, this.colors.length = 0, this.uvs.length = 0, this.indices.length = 0, this.textureIds.length = 0;
                for (var t = 0; t < this.drawCalls.length; t++) this.drawCalls[t].texArray.clear(), ta.push(this.drawCalls[t]);
                for (this.drawCalls.length = 0, t = 0; t < this.batches.length; t++) {
                    var e = this.batches[t];
                    e.reset(), $s.push(e)
                }
                this.batches.length = 0
            }, r.prototype.clear = function () {
                return this.graphicsData.length > 0 && (this.invalidate(), this.clearDirty++, this.graphicsData.length = 0), this
            }, r.prototype.drawShape = function (t, e, r, i) {
                void 0 === e && (e = null), void 0 === r && (r = null), void 0 === i && (i = null);
                var n = new ea(t, e, r, i);
                return this.graphicsData.push(n), this.dirty++, this
            }, r.prototype.drawHole = function (t, e) {
                if (void 0 === e && (e = null), !this.graphicsData.length) return null;
                var r = new ea(t, null, null, e), i = this.graphicsData[this.graphicsData.length - 1];
                return r.lineStyle = i.lineStyle, i.holes.push(r), this.dirty++, this
            }, r.prototype.destroy = function () {
                e.prototype.destroy.call(this);
                for (var t = 0; t < this.graphicsData.length; ++t) this.graphicsData[t].destroy();
                this.points.length = 0, this.points = null, this.colors.length = 0, this.colors = null, this.uvs.length = 0, this.uvs = null, this.indices.length = 0, this.indices = null, this.indexBuffer.destroy(), this.indexBuffer = null, this.graphicsData.length = 0, this.graphicsData = null, this.drawCalls.length = 0, this.drawCalls = null, this.batches.length = 0, this.batches = null, this._bounds = null
            }, r.prototype.containsPoint = function (t) {
                for (var e = this.graphicsData, r = 0; r < e.length; ++r) {
                    var i = e[r];
                    if (i.fillStyle.visible && i.shape && (i.matrix ? i.matrix.applyInverse(t, ra) : ra.copyFrom(t), i.shape.contains(ra.x, ra.y))) {
                        var n = !1;
                        if (i.holes) for (var o = 0; o < i.holes.length; o++) if (i.holes[o].shape.contains(ra.x, ra.y)) {
                            n = !0;
                            break
                        }
                        if (!n) return !0
                    }
                }
                return !1
            }, r.prototype.updateBatches = function (e) {
                if (this.graphicsData.length) {
                    if (this.validateBatching()) {
                        this.cacheDirty = this.dirty;
                        var r = this.uvs, i = this.graphicsData, n = null, o = null;
                        this.batches.length > 0 && (o = (n = this.batches[this.batches.length - 1]).style);
                        for (var s = this.shapeIndex; s < i.length; s++) {
                            this.shapeIndex++;
                            var a = i[s], h = a.fillStyle, u = a.lineStyle;
                            Qs[a.type].build(a), a.matrix && this.transformPoints(a.points, a.matrix);
                            for (var l = 0; l < 2; l++) {
                                var c = 0 === l ? h : u;
                                if (c.visible) {
                                    var d = c.texture.baseTexture, f = this.indices.length, p = this.points.length / 2;
                                    d.wrapMode = t.WRAP_MODES.REPEAT, 0 === l ? this.processFill(a) : this.processLine(a);
                                    var _ = this.points.length / 2 - p;
                                    0 !== _ && (n && !this._compareStyles(o, c) && (n.end(f, p), n = null), n || ((n = $s.pop() || new Js).begin(c, f, p), this.batches.push(n), o = c), this.addUvs(this.points, r, c.texture, p, _, c.matrix))
                                }
                            }
                        }
                        var m = this.indices.length, v = this.points.length / 2;
                        if (n && n.end(m, v), 0 !== this.batches.length) {
                            if (this.indicesUint16 && this.indices.length === this.indicesUint16.length) this.indicesUint16.set(this.indices); else {
                                var y = v > 65535 && e;
                                this.indicesUint16 = y ? new Uint32Array(this.indices) : new Uint16Array(this.indices)
                            }
                            this.batchable = this.isBatchable(), this.batchable ? this.packBatches() : this.buildDrawCalls()
                        } else this.batchable = !0
                    }
                } else this.batchable = !0
            }, r.prototype._compareStyles = function (t, e) {
                return !(!t || !e) && t.texture.baseTexture === e.texture.baseTexture && t.color + t.alpha === e.color + e.alpha && !!t.native == !!e.native
            }, r.prototype.validateBatching = function () {
                if (this.dirty === this.cacheDirty || !this.graphicsData.length) return !1;
                for (var t = 0, e = this.graphicsData.length; t < e; t++) {
                    var r = this.graphicsData[t], i = r.fillStyle, n = r.lineStyle;
                    if (i && !i.texture.baseTexture.valid) return !1;
                    if (n && !n.texture.baseTexture.valid) return !1
                }
                return !0
            }, r.prototype.packBatches = function () {
                this.batchDirty++, this.uvsFloat32 = new Float32Array(this.uvs);
                for (var t = this.batches, e = 0, r = t.length; e < r; e++) for (var i = t[e], n = 0; n < i.size; n++) {
                    var o = i.start + n;
                    this.indicesUint16[o] = this.indicesUint16[o] - i.attribStart
                }
            }, r.prototype.isBatchable = function () {
                if (this.points.length > 131070) return !1;
                for (var t = this.batches, e = 0; e < t.length; e++) if (t[e].style.native) return !1;
                return this.points.length < 2 * r.BATCHABLE_SIZE
            }, r.prototype.buildDrawCalls = function () {
                for (var e = ++Tr._globalBatch, r = 0; r < this.drawCalls.length; r++) this.drawCalls[r].texArray.clear(), ta.push(this.drawCalls[r]);
                this.drawCalls.length = 0;
                var i = this.colors, n = this.textureIds, o = ta.pop();
                o || ((o = new Sn).texArray = new On), o.texArray.count = 0, o.start = 0, o.size = 0, o.type = t.DRAW_MODES.TRIANGLES;
                var s = 0, a = null, h = 0, u = !1, l = t.DRAW_MODES.TRIANGLES, c = 0;
                for (this.drawCalls.push(o), r = 0; r < this.batches.length; r++) {
                    var d = this.batches[r], f = d.style, p = f.texture.baseTexture;
                    u !== !!f.native && (l = (u = !!f.native) ? t.DRAW_MODES.LINES : t.DRAW_MODES.TRIANGLES, a = null, s = 8, e++), a !== p && (a = p, p._batchEnabled !== e && (8 === s && (e++, s = 0, o.size > 0 && ((o = ta.pop()) || ((o = new Sn).texArray = new On), this.drawCalls.push(o)), o.start = c, o.size = 0, o.texArray.count = 0, o.type = l), p.touched = 1, p._batchEnabled = e, p._batchLocation = s, p.wrapMode = 10497, o.texArray.elements[o.texArray.count++] = p, s++)), o.size += d.size, c += d.size, h = p._batchLocation, this.addColors(i, f.color, f.alpha, d.attribSize), this.addTextureIds(n, h, d.attribSize)
                }
                Tr._globalBatch = e, this.packAttributes()
            }, r.prototype.packAttributes = function () {
                for (var t = this.points, e = this.uvs, r = this.colors, i = this.textureIds, n = new ArrayBuffer(3 * t.length * 4), o = new Float32Array(n), s = new Uint32Array(n), a = 0, h = 0; h < t.length / 2; h++) o[a++] = t[2 * h], o[a++] = t[2 * h + 1], o[a++] = e[2 * h], o[a++] = e[2 * h + 1], s[a++] = r[h], o[a++] = i[h];
                this._buffer.update(n), this._indexBuffer.update(this.indicesUint16)
            }, r.prototype.processFill = function (t) {
                t.holes.length ? (this.processHoles(t.holes), Us.triangulate(t, this)) : Qs[t.type].triangulate(t, this)
            }, r.prototype.processLine = function (t) {
                zs(t, this);
                for (var e = 0; e < t.holes.length; e++) zs(t.holes[e], this)
            }, r.prototype.processHoles = function (t) {
                for (var e = 0; e < t.length; e++) {
                    var r = t[e];
                    Qs[r.type].build(r), r.matrix && this.transformPoints(r.points, r.matrix)
                }
            }, r.prototype.calculateBounds = function () {
                var e = this._bounds, r = ia, i = De.IDENTITY;
                this._bounds.clear(), r.clear();
                for (var n = 0; n < this.graphicsData.length; n++) {
                    var o = this.graphicsData[n], s = o.shape, a = o.type, h = o.lineStyle, u = o.matrix || De.IDENTITY, l = 0;
                    if (h && h.visible) {
                        var c = h.alignment;
                        l = h.width, a === t.SHAPES.POLY ? l *= .5 + Math.abs(.5 - c) : l *= Math.max(0, c)
                    }
                    if (i !== u && (r.isEmpty() || (e.addBoundsMatrix(r, i), r.clear()), i = u), a === t.SHAPES.RECT || a === t.SHAPES.RREC) {
                        var d = s;
                        r.addFramePad(d.x, d.y, d.x + d.width, d.y + d.height, l, l)
                    } else if (a === t.SHAPES.CIRC) {
                        var f = s;
                        r.addFramePad(f.x, f.y, f.x, f.y, f.radius + l, f.radius + l)
                    } else if (a === t.SHAPES.ELIP) {
                        var p = s;
                        r.addFramePad(p.x, p.y, p.x, p.y, p.width + l, p.height + l)
                    } else {
                        var _ = s;
                        e.addVerticesMatrix(i, _.points, 0, _.points.length, l, l)
                    }
                }
                r.isEmpty() || e.addBoundsMatrix(r, i), e.pad(this.boundsPadding, this.boundsPadding)
            }, r.prototype.transformPoints = function (t, e) {
                for (var r = 0; r < t.length / 2; r++) {
                    var i = t[2 * r], n = t[2 * r + 1];
                    t[2 * r] = e.a * i + e.c * n + e.tx, t[2 * r + 1] = e.b * i + e.d * n + e.ty
                }
            }, r.prototype.addColors = function (t, e, r, i) {
                for (var n = $t((e >> 16) + (65280 & e) + ((255 & e) << 16), r); i-- > 0;) t.push(n)
            }, r.prototype.addTextureIds = function (t, e, r) {
                for (; r-- > 0;) t.push(e)
            }, r.prototype.addUvs = function (t, e, r, i, n, o) {
                void 0 === o && (o = null);
                for (var s = 0, a = e.length, h = r.frame; s < n;) {
                    var u = t[2 * (i + s)], l = t[2 * (i + s) + 1];
                    if (o) {
                        var c = o.a * u + o.c * l + o.tx;
                        l = o.b * u + o.d * l + o.ty, u = c
                    }
                    s++, e.push(u / h.width, l / h.height)
                }
                var d = r.baseTexture;
                (h.width < d.width || h.height < d.height) && this.adjustUvs(e, r, a, n)
            }, r.prototype.adjustUvs = function (t, e, r, i) {
                for (var n = e.baseTexture, o = r + 2 * i, s = e.frame, a = s.width / n.width, h = s.height / n.height, u = s.x / s.width, l = s.y / s.height, c = Math.floor(t[r] + 1e-6), d = Math.floor(t[r + 1] + 1e-6), f = r + 2; f < o; f += 2) c = Math.min(c, Math.floor(t[f] + 1e-6)), d = Math.min(d, Math.floor(t[f + 1] + 1e-6));
                for (u -= c, l -= d, f = r; f < o; f += 2) t[f] = (t[f] + u) * a, t[f + 1] = (t[f + 1] + l) * h
            }, r.BATCHABLE_SIZE = 100, r
        }(Mn), oa = function (e) {
            function r() {
                var r = null !== e && e.apply(this, arguments) || this;
                return r.width = 0, r.alignment = .5, r.native = !1, r.cap = t.LINE_CAP.BUTT, r.join = t.LINE_JOIN.MITER, r.miterLimit = 10, r
            }

            return Bs(r, e), r.prototype.clone = function () {
                var t = new r;
                return t.color = this.color, t.alpha = this.alpha, t.texture = this.texture, t.matrix = this.matrix, t.visible = this.visible, t.width = this.width, t.alignment = this.alignment, t.native = this.native, t.cap = this.cap, t.join = this.join, t.miterLimit = this.miterLimit, t
            }, r.prototype.reset = function () {
                e.prototype.reset.call(this), this.color = 0, this.alignment = .5, this.width = 0, this.native = !1
            }, r
        }(Ls), sa = new Float32Array(3), aa = {}, ha = function (e) {
            function r(r) {
                void 0 === r && (r = null);
                var i = e.call(this) || this;
                return i._geometry = r || new na, i._geometry.refCount++, i.shader = null, i.state = ki.for2d(), i._fillStyle = new Ls, i._lineStyle = new oa, i._matrix = null, i._holeMode = !1, i.currentPath = null, i.batches = [], i.batchTint = -1, i.batchDirty = -1, i.vertexData = null, i.pluginName = "batch", i._transformID = -1, i.tint = 16777215, i.blendMode = t.BLEND_MODES.NORMAL, i
            }

            return Bs(r, e), Object.defineProperty(r.prototype, "geometry", {
                get: function () {
                    return this._geometry
                }, enumerable: !1, configurable: !0
            }), r.prototype.clone = function () {
                return this.finishPoly(), new r(this._geometry)
            }, Object.defineProperty(r.prototype, "blendMode", {
                get: function () {
                    return this.state.blendMode
                }, set: function (t) {
                    this.state.blendMode = t
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(r.prototype, "tint", {
                get: function () {
                    return this._tint
                }, set: function (t) {
                    this._tint = t
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(r.prototype, "fill", {
                get: function () {
                    return this._fillStyle
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(r.prototype, "line", {
                get: function () {
                    return this._lineStyle
                }, enumerable: !1, configurable: !0
            }), r.prototype.lineStyle = function (t, e, r, i, n) {
                return void 0 === t && (t = null), void 0 === e && (e = 0), void 0 === r && (r = 1), void 0 === i && (i = .5), void 0 === n && (n = !1), "number" == typeof t && (t = {
                    width: t,
                    color: e,
                    alpha: r,
                    alignment: i,
                    native: n
                }), this.lineTextureStyle(t)
            }, r.prototype.lineTextureStyle = function (e) {
                e = Object.assign({
                    width: 0,
                    texture: Ur.WHITE,
                    color: e && e.texture ? 16777215 : 0,
                    alpha: 1,
                    matrix: null,
                    alignment: .5,
                    native: !1,
                    cap: t.LINE_CAP.BUTT,
                    join: t.LINE_JOIN.MITER,
                    miterLimit: 10
                }, e), this.currentPath && this.startPoly();
                var r = e.width > 0 && e.alpha > 0;
                return r ? (e.matrix && (e.matrix = e.matrix.clone(), e.matrix.invert()), Object.assign(this._lineStyle, {visible: r}, e)) : this._lineStyle.reset(), this
            }, r.prototype.startPoly = function () {
                if (this.currentPath) {
                    var t = this.currentPath.points, e = this.currentPath.points.length;
                    e > 2 && (this.drawShape(this.currentPath), this.currentPath = new Pe, this.currentPath.closeStroke = !1, this.currentPath.points.push(t[e - 2], t[e - 1]))
                } else this.currentPath = new Pe, this.currentPath.closeStroke = !1
            }, r.prototype.finishPoly = function () {
                this.currentPath && (this.currentPath.points.length > 2 ? (this.drawShape(this.currentPath), this.currentPath = null) : this.currentPath.points.length = 0)
            }, r.prototype.moveTo = function (t, e) {
                return this.startPoly(), this.currentPath.points[0] = t, this.currentPath.points[1] = e, this
            }, r.prototype.lineTo = function (t, e) {
                this.currentPath || this.moveTo(0, 0);
                var r = this.currentPath.points, i = r[r.length - 2], n = r[r.length - 1];
                return i === t && n === e || r.push(t, e), this
            }, r.prototype._initCurve = function (t, e) {
                void 0 === t && (t = 0), void 0 === e && (e = 0), this.currentPath ? 0 === this.currentPath.points.length && (this.currentPath.points = [t, e]) : this.moveTo(t, e)
            }, r.prototype.quadraticCurveTo = function (t, e, r, i) {
                this._initCurve();
                var n = this.currentPath.points;
                return 0 === n.length && this.moveTo(0, 0), Zs.curveTo(t, e, r, i, n), this
            }, r.prototype.bezierCurveTo = function (t, e, r, i, n, o) {
                return this._initCurve(), Ks.curveTo(t, e, r, i, n, o, this.currentPath.points), this
            }, r.prototype.arcTo = function (t, e, r, i, n) {
                this._initCurve(t, e);
                var o = this.currentPath.points, s = qs.curveTo(t, e, r, i, n, o);
                if (s) {
                    var a = s.cx, h = s.cy, u = s.radius, l = s.startAngle, c = s.endAngle, d = s.anticlockwise;
                    this.arc(a, h, u, l, c, d)
                }
                return this
            }, r.prototype.arc = function (t, e, r, i, n, o) {
                if (void 0 === o && (o = !1), i === n) return this;
                if (!o && n <= i ? n += be : o && i <= n && (i += be), 0 == n - i) return this;
                var s = t + Math.cos(i) * r, a = e + Math.sin(i) * r, h = this._geometry.closePointEps, u = this.currentPath ? this.currentPath.points : null;
                if (u) {
                    var l = Math.abs(u[u.length - 2] - s), c = Math.abs(u[u.length - 1] - a);
                    l < h && c < h || u.push(s, a)
                } else this.moveTo(s, a), u = this.currentPath.points;
                return qs.arc(s, a, t, e, r, i, n, o, u), this
            }, r.prototype.beginFill = function (t, e) {
                return void 0 === t && (t = 0), void 0 === e && (e = 1), this.beginTextureFill({texture: Ur.WHITE, color: t, alpha: e})
            }, r.prototype.beginTextureFill = function (t) {
                t = Object.assign({texture: Ur.WHITE, color: 16777215, alpha: 1, matrix: null}, t), this.currentPath && this.startPoly();
                var e = t.alpha > 0;
                return e ? (t.matrix && (t.matrix = t.matrix.clone(), t.matrix.invert()), Object.assign(this._fillStyle, {visible: e}, t)) : this._fillStyle.reset(), this
            }, r.prototype.endFill = function () {
                return this.finishPoly(), this._fillStyle.reset(), this
            }, r.prototype.drawRect = function (t, e, r, i) {
                return this.drawShape(new Se(t, e, r, i))
            }, r.prototype.drawRoundedRect = function (t, e, r, i, n) {
                return this.drawShape(new Ie(t, e, r, i, n))
            }, r.prototype.drawCircle = function (t, e, r) {
                return this.drawShape(new Oe(t, e, r))
            }, r.prototype.drawEllipse = function (t, e, r, i) {
                return this.drawShape(new Re(t, e, r, i))
            }, r.prototype.drawPolygon = function () {
                for (var t, e = arguments, r = [], i = 0; i < arguments.length; i++) r[i] = e[i];
                var n = !0, o = r[0];
                o.points ? (n = o.closeStroke, t = o.points) : t = Array.isArray(r[0]) ? r[0] : r;
                var s = new Pe(t);
                return s.closeStroke = n, this.drawShape(s), this
            }, r.prototype.drawShape = function (t) {
                return this._holeMode ? this._geometry.drawHole(t, this._matrix) : this._geometry.drawShape(t, this._fillStyle.clone(), this._lineStyle.clone(), this._matrix), this
            }, r.prototype.clear = function () {
                return this._geometry.clear(), this._lineStyle.reset(), this._fillStyle.reset(), this._boundsID++, this._matrix = null, this._holeMode = !1, this.currentPath = null, this
            }, r.prototype.isFastRect = function () {
                var e = this._geometry.graphicsData;
                return 1 === e.length && e[0].shape.type === t.SHAPES.RECT && !(e[0].lineStyle.visible && e[0].lineStyle.width)
            }, r.prototype._render = function (t) {
                this.finishPoly();
                var e = this._geometry, r = t.context.supports.uint32Indices;
                e.updateBatches(r), e.batchable ? (this.batchDirty !== e.batchDirty && this._populateBatches(), this._renderBatched(t)) : (t.batch.flush(), this._renderDirect(t))
            }, r.prototype._populateBatches = function () {
                var t = this._geometry, e = this.blendMode, r = t.batches.length;
                this.batchTint = -1, this._transformID = -1, this.batchDirty = t.batchDirty, this.batches.length = r, this.vertexData = new Float32Array(t.points);
                for (var i = 0; i < r; i++) {
                    var n = t.batches[i], o = n.style.color, s = new Float32Array(this.vertexData.buffer, 4 * n.attribStart * 2, 2 * n.attribSize),
                        a = new Float32Array(t.uvsFloat32.buffer, 4 * n.attribStart * 2, 2 * n.attribSize), h = {
                            vertexData: s,
                            blendMode: e,
                            indices: new Uint16Array(t.indicesUint16.buffer, 2 * n.start, n.size),
                            uvs: a,
                            _batchRGB: Wt(o),
                            _tintRGB: o,
                            _texture: n.style.texture,
                            alpha: n.style.alpha,
                            worldAlpha: 1
                        };
                    this.batches[i] = h
                }
            }, r.prototype._renderBatched = function (t) {
                if (this.batches.length) {
                    t.batch.setObjectRenderer(t.plugins[this.pluginName]), this.calculateVertices(), this.calculateTints();
                    for (var e = 0, r = this.batches.length; e < r; e++) {
                        var i = this.batches[e];
                        i.worldAlpha = this.worldAlpha * i.alpha, t.plugins[this.pluginName].render(i)
                    }
                }
            }, r.prototype._renderDirect = function (t) {
                var e = this._resolveDirectShader(t), r = this._geometry, i = this.tint, n = this.worldAlpha, o = e.uniforms, s = r.drawCalls;
                o.translationMatrix = this.transform.worldTransform, o.tint[0] = (i >> 16 & 255) / 255 * n, o.tint[1] = (i >> 8 & 255) / 255 * n, o.tint[2] = (255 & i) / 255 * n, o.tint[3] = n, t.shader.bind(e), t.geometry.bind(r, e), t.state.set(this.state);
                for (var a = 0, h = s.length; a < h; a++) this._renderDrawCallDirect(t, r.drawCalls[a])
            }, r.prototype._renderDrawCallDirect = function (t, e) {
                for (var r = e.texArray, i = e.type, n = e.size, o = e.start, s = r.count, a = 0; a < s; a++) t.texture.bind(r.elements[a], a);
                t.geometry.draw(i, n, o)
            }, r.prototype._resolveDirectShader = function (t) {
                var e = this.shader, r = this.pluginName;
                if (!e) {
                    if (!aa[r]) {
                        for (var i = t.plugins.batch.MAX_TEXTURES, n = new Int32Array(i), o = 0; o < i; o++) n[o] = o;
                        var s = {tint: new Float32Array([1, 1, 1, 1]), translationMatrix: new De, default: ti.from({uSamplers: n}, !0)}, a = t.plugins[r]._shader.program;
                        aa[r] = new Xi(a, s)
                    }
                    e = aa[r]
                }
                return e
            }, r.prototype._calculateBounds = function () {
                this.finishPoly();
                var t = this._geometry;
                if (t.graphicsData.length) {
                    var e = t.bounds, r = e.minX, i = e.minY, n = e.maxX, o = e.maxY;
                    this._bounds.addFrame(this.transform, r, i, n, o)
                }
            }, r.prototype.containsPoint = function (t) {
                return this.worldTransform.applyInverse(t, r._TEMP_POINT), this._geometry.containsPoint(r._TEMP_POINT)
            }, r.prototype.calculateTints = function () {
                if (this.batchTint !== this.tint) {
                    this.batchTint = this.tint;
                    for (var t = Wt(this.tint, sa), e = 0; e < this.batches.length; e++) {
                        var r = this.batches[e], i = r._batchRGB, n = (t[0] * i[0] * 255 << 16) + (t[1] * i[1] * 255 << 8) + (0 | t[2] * i[2] * 255);
                        r._tintRGB = (n >> 16) + (65280 & n) + ((255 & n) << 16)
                    }
                }
            }, r.prototype.calculateVertices = function () {
                var t = this.transform._worldID;
                if (this._transformID !== t) {
                    this._transformID = t;
                    for (var e = this.transform.worldTransform, r = e.a, i = e.b, n = e.c, o = e.d, s = e.tx, a = e.ty, h = this._geometry.points, u = this.vertexData, l = 0, c = 0; c < h.length; c += 2) {
                        var d = h[c], f = h[c + 1];
                        u[l++] = r * d + n * f + s, u[l++] = o * f + i * d + a
                    }
                }
            }, r.prototype.closePath = function () {
                var t = this.currentPath;
                return t && (t.closeStroke = !0), this
            }, r.prototype.setMatrix = function (t) {
                return this._matrix = t, this
            }, r.prototype.beginHole = function () {
                return this.finishPoly(), this._holeMode = !0, this
            }, r.prototype.endHole = function () {
                return this.finishPoly(), this._holeMode = !1, this
            }, r.prototype.destroy = function (t) {
                this._geometry.refCount--, 0 === this._geometry.refCount && this._geometry.dispose(), this._matrix = null, this.currentPath = null, this._lineStyle.destroy(), this._lineStyle = null, this._fillStyle.destroy(), this._fillStyle = null, this._geometry = null, this.shader = null, this.vertexData = null, this.batches.length = 0, this.batches = null, e.prototype.destroy.call(this, t)
            }, r._TEMP_POINT = new Me, r
        }(qe), ua = {
            buildPoly: Us,
            buildCircle: Gs,
            buildRectangle: Xs,
            buildRoundedRectangle: Hs,
            buildLine: zs,
            ArcUtils: qs,
            BezierUtils: Ks,
            QuadraticUtils: Zs,
            BatchPart: Js,
            FILL_COMMANDS: Qs,
            BATCH_POOL: $s,
            DRAW_CALL_POOL: ta
        }, la = function (t, e) {
            return (la = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
            })(t, e)
        }, ca = new Me, da = new Uint16Array([0, 1, 2, 0, 2, 3]), fa = function (e) {
            function r(r) {
                var i = e.call(this) || this;
                return i._anchor = new we(i._onAnchorUpdate, i, r ? r.defaultAnchor.x : 0, r ? r.defaultAnchor.y : 0), i._texture = null, i._width = 0, i._height = 0, i._tint = null, i._tintRGB = null, i.tint = 16777215, i.blendMode = t.BLEND_MODES.NORMAL, i._cachedTint = 16777215, i.uvs = null, i.texture = r || Ur.EMPTY, i.vertexData = new Float32Array(8), i.vertexTrimmedData = null, i._transformID = -1, i._textureID = -1, i._transformTrimmedID = -1, i._textureTrimmedID = -1, i.indices = da, i.pluginName = "batch", i.isSprite = !0, i._roundPixels = B.ROUND_PIXELS, i
            }

            return function (t, e) {
                function r() {
                    this.constructor = t
                }

                la(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
            }(r, e), r.prototype._onTextureUpdate = function () {
                this._textureID = -1, this._textureTrimmedID = -1, this._cachedTint = 16777215, this._width && (this.scale.x = he(this.scale.x) * this._width / this._texture.orig.width), this._height && (this.scale.y = he(this.scale.y) * this._height / this._texture.orig.height)
            }, r.prototype._onAnchorUpdate = function () {
                this._transformID = -1, this._transformTrimmedID = -1
            }, r.prototype.calculateVertices = function () {
                var t = this._texture;
                if (this._transformID !== this.transform._worldID || this._textureID !== t._updateID) {
                    this._textureID !== t._updateID && (this.uvs = this._texture._uvs.uvsFloat32), this._transformID = this.transform._worldID, this._textureID = t._updateID;
                    var e = this.transform.worldTransform, r = e.a, i = e.b, n = e.c, o = e.d, s = e.tx, a = e.ty, h = this.vertexData, u = t.trim, l = t.orig, c = this._anchor, d = 0,
                        f = 0, p = 0, _ = 0;
                    if (u ? (d = (f = u.x - c._x * l.width) + u.width, p = (_ = u.y - c._y * l.height) + u.height) : (d = (f = -c._x * l.width) + l.width, p = (_ = -c._y * l.height) + l.height), h[0] = r * f + n * _ + s, h[1] = o * _ + i * f + a, h[2] = r * d + n * _ + s, h[3] = o * _ + i * d + a, h[4] = r * d + n * p + s, h[5] = o * p + i * d + a, h[6] = r * f + n * p + s, h[7] = o * p + i * f + a, this._roundPixels) for (var m = B.RESOLUTION, v = 0; v < h.length; ++v) h[v] = Math.round((h[v] * m | 0) / m)
                }
            }, r.prototype.calculateTrimmedVertices = function () {
                if (this.vertexTrimmedData) {
                    if (this._transformTrimmedID === this.transform._worldID && this._textureTrimmedID === this._texture._updateID) return
                } else this.vertexTrimmedData = new Float32Array(8);
                this._transformTrimmedID = this.transform._worldID, this._textureTrimmedID = this._texture._updateID;
                var t = this._texture, e = this.vertexTrimmedData, r = t.orig, i = this._anchor, n = this.transform.worldTransform, o = n.a, s = n.b, a = n.c, h = n.d, u = n.tx,
                    l = n.ty, c = -i._x * r.width, d = c + r.width, f = -i._y * r.height, p = f + r.height;
                e[0] = o * c + a * f + u, e[1] = h * f + s * c + l, e[2] = o * d + a * f + u, e[3] = h * f + s * d + l, e[4] = o * d + a * p + u, e[5] = h * p + s * d + l, e[6] = o * c + a * p + u, e[7] = h * p + s * c + l
            }, r.prototype._render = function (t) {
                this.calculateVertices(), t.batch.setObjectRenderer(t.plugins[this.pluginName]), t.plugins[this.pluginName].render(this)
            }, r.prototype._calculateBounds = function () {
                var t = this._texture.trim, e = this._texture.orig;
                !t || t.width === e.width && t.height === e.height ? (this.calculateVertices(), this._bounds.addQuad(this.vertexData)) : (this.calculateTrimmedVertices(), this._bounds.addQuad(this.vertexTrimmedData))
            }, r.prototype.getLocalBounds = function (t) {
                return 0 === this.children.length ? (this._bounds.minX = this._texture.orig.width * -this._anchor._x, this._bounds.minY = this._texture.orig.height * -this._anchor._y, this._bounds.maxX = this._texture.orig.width * (1 - this._anchor._x), this._bounds.maxY = this._texture.orig.height * (1 - this._anchor._y), t || (this._localBoundsRect || (this._localBoundsRect = new Se), t = this._localBoundsRect), this._bounds.getRectangle(t)) : e.prototype.getLocalBounds.call(this, t)
            }, r.prototype.containsPoint = function (t) {
                this.worldTransform.applyInverse(t, ca);
                var e = this._texture.orig.width, r = this._texture.orig.height, i = -e * this.anchor.x, n = 0;
                return ca.x >= i && ca.x < i + e && (n = -r * this.anchor.y, ca.y >= n && ca.y < n + r)
            }, r.prototype.destroy = function (t) {
                if (e.prototype.destroy.call(this, t), this._texture.off("update", this._onTextureUpdate, this), this._anchor = null, "boolean" == typeof t ? t : t && t.texture) {
                    var r = "boolean" == typeof t ? t : t && t.baseTexture;
                    this._texture.destroy(!!r)
                }
                this._texture = null
            }, r.from = function (t, e) {
                return new r(t instanceof Ur ? t : Ur.from(t, e))
            }, Object.defineProperty(r.prototype, "roundPixels", {
                get: function () {
                    return this._roundPixels
                }, set: function (t) {
                    this._roundPixels !== t && (this._transformID = -1), this._roundPixels = t
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(r.prototype, "width", {
                get: function () {
                    return Math.abs(this.scale.x) * this._texture.orig.width
                }, set: function (t) {
                    var e = he(this.scale.x) || 1;
                    this.scale.x = e * t / this._texture.orig.width, this._width = t
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(r.prototype, "height", {
                get: function () {
                    return Math.abs(this.scale.y) * this._texture.orig.height
                }, set: function (t) {
                    var e = he(this.scale.y) || 1;
                    this.scale.y = e * t / this._texture.orig.height, this._height = t
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(r.prototype, "anchor", {
                get: function () {
                    return this._anchor
                }, set: function (t) {
                    this._anchor.copyFrom(t)
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(r.prototype, "tint", {
                get: function () {
                    return this._tint
                }, set: function (t) {
                    this._tint = t, this._tintRGB = (t >> 16) + (65280 & t) + ((255 & t) << 16)
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(r.prototype, "texture", {
                get: function () {
                    return this._texture
                }, set: function (t) {
                    this._texture !== t && (this._texture && this._texture.off("update", this._onTextureUpdate, this), this._texture = t || Ur.EMPTY, this._cachedTint = 16777215, this._textureID = -1, this._textureTrimmedID = -1, t && (t.baseTexture.valid ? this._onTextureUpdate() : t.once("update", this._onTextureUpdate, this)))
                }, enumerable: !1, configurable: !0
            }), r
        }(qe), pa = function (t, e) {
            return (pa = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
            })(t, e)
        };
    !function (t) {
        t[t.LINEAR_VERTICAL = 0] = "LINEAR_VERTICAL", t[t.LINEAR_HORIZONTAL = 1] = "LINEAR_HORIZONTAL"
    }(t.TEXT_GRADIENT || (t.TEXT_GRADIENT = {}));
    var _a = {
        align: "left",
        breakWords: !1,
        dropShadow: !1,
        dropShadowAlpha: 1,
        dropShadowAngle: Math.PI / 6,
        dropShadowBlur: 0,
        dropShadowColor: "black",
        dropShadowDistance: 5,
        fill: "black",
        fillGradientType: t.TEXT_GRADIENT.LINEAR_VERTICAL,
        fillGradientStops: [],
        fontFamily: "Arial",
        fontSize: 26,
        fontStyle: "normal",
        fontVariant: "normal",
        fontWeight: "normal",
        letterSpacing: 0,
        lineHeight: 0,
        lineJoin: "miter",
        miterLimit: 10,
        padding: 0,
        stroke: "black",
        strokeThickness: 0,
        textBaseline: "alphabetic",
        trim: !1,
        whiteSpace: "pre",
        wordWrap: !1,
        wordWrapWidth: 100,
        leading: 0
    }, ma = ["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui"], va = function () {
        function t(t) {
            this.styleID = 0, this.reset(), Ea(this, t, t)
        }

        return t.prototype.clone = function () {
            var e = {};
            return Ea(e, this, _a), new t(e)
        }, t.prototype.reset = function () {
            Ea(this, _a, _a)
        }, Object.defineProperty(t.prototype, "align", {
            get: function () {
                return this._align
            }, set: function (t) {
                this._align !== t && (this._align = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "breakWords", {
            get: function () {
                return this._breakWords
            }, set: function (t) {
                this._breakWords !== t && (this._breakWords = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "dropShadow", {
            get: function () {
                return this._dropShadow
            }, set: function (t) {
                this._dropShadow !== t && (this._dropShadow = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "dropShadowAlpha", {
            get: function () {
                return this._dropShadowAlpha
            }, set: function (t) {
                this._dropShadowAlpha !== t && (this._dropShadowAlpha = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "dropShadowAngle", {
            get: function () {
                return this._dropShadowAngle
            }, set: function (t) {
                this._dropShadowAngle !== t && (this._dropShadowAngle = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "dropShadowBlur", {
            get: function () {
                return this._dropShadowBlur
            }, set: function (t) {
                this._dropShadowBlur !== t && (this._dropShadowBlur = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "dropShadowColor", {
            get: function () {
                return this._dropShadowColor
            }, set: function (t) {
                var e = ga(t);
                this._dropShadowColor !== e && (this._dropShadowColor = e, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "dropShadowDistance", {
            get: function () {
                return this._dropShadowDistance
            }, set: function (t) {
                this._dropShadowDistance !== t && (this._dropShadowDistance = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "fill", {
            get: function () {
                return this._fill
            }, set: function (t) {
                var e = ga(t);
                this._fill !== e && (this._fill = e, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "fillGradientType", {
            get: function () {
                return this._fillGradientType
            }, set: function (t) {
                this._fillGradientType !== t && (this._fillGradientType = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "fillGradientStops", {
            get: function () {
                return this._fillGradientStops
            }, set: function (t) {
                (function (t, e) {
                    if (!Array.isArray(t) || !Array.isArray(e)) return !1;
                    if (t.length !== e.length) return !1;
                    for (var r = 0; r < t.length; ++r) if (t[r] !== e[r]) return !1;
                    return !0
                })(this._fillGradientStops, t) || (this._fillGradientStops = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "fontFamily", {
            get: function () {
                return this._fontFamily
            }, set: function (t) {
                this.fontFamily !== t && (this._fontFamily = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "fontSize", {
            get: function () {
                return this._fontSize
            }, set: function (t) {
                this._fontSize !== t && (this._fontSize = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "fontStyle", {
            get: function () {
                return this._fontStyle
            }, set: function (t) {
                this._fontStyle !== t && (this._fontStyle = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "fontVariant", {
            get: function () {
                return this._fontVariant
            }, set: function (t) {
                this._fontVariant !== t && (this._fontVariant = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "fontWeight", {
            get: function () {
                return this._fontWeight
            }, set: function (t) {
                this._fontWeight !== t && (this._fontWeight = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "letterSpacing", {
            get: function () {
                return this._letterSpacing
            }, set: function (t) {
                this._letterSpacing !== t && (this._letterSpacing = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "lineHeight", {
            get: function () {
                return this._lineHeight
            }, set: function (t) {
                this._lineHeight !== t && (this._lineHeight = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "leading", {
            get: function () {
                return this._leading
            }, set: function (t) {
                this._leading !== t && (this._leading = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "lineJoin", {
            get: function () {
                return this._lineJoin
            }, set: function (t) {
                this._lineJoin !== t && (this._lineJoin = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "miterLimit", {
            get: function () {
                return this._miterLimit
            }, set: function (t) {
                this._miterLimit !== t && (this._miterLimit = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "padding", {
            get: function () {
                return this._padding
            }, set: function (t) {
                this._padding !== t && (this._padding = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "stroke", {
            get: function () {
                return this._stroke
            }, set: function (t) {
                var e = ga(t);
                this._stroke !== e && (this._stroke = e, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "strokeThickness", {
            get: function () {
                return this._strokeThickness
            }, set: function (t) {
                this._strokeThickness !== t && (this._strokeThickness = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "textBaseline", {
            get: function () {
                return this._textBaseline
            }, set: function (t) {
                this._textBaseline !== t && (this._textBaseline = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "trim", {
            get: function () {
                return this._trim
            }, set: function (t) {
                this._trim !== t && (this._trim = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "whiteSpace", {
            get: function () {
                return this._whiteSpace
            }, set: function (t) {
                this._whiteSpace !== t && (this._whiteSpace = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "wordWrap", {
            get: function () {
                return this._wordWrap
            }, set: function (t) {
                this._wordWrap !== t && (this._wordWrap = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(t.prototype, "wordWrapWidth", {
            get: function () {
                return this._wordWrapWidth
            }, set: function (t) {
                this._wordWrapWidth !== t && (this._wordWrapWidth = t, this.styleID++)
            }, enumerable: !1, configurable: !0
        }), t.prototype.toFontString = function () {
            var t = "number" == typeof this.fontSize ? this.fontSize + "px" : this.fontSize, e = this.fontFamily;
            Array.isArray(this.fontFamily) || (e = this.fontFamily.split(","));
            for (var r = e.length - 1; r >= 0; r--) {
                var i = e[r].trim();
                !/([\"\'])[^\'\"]+\1/.test(i) && ma.indexOf(i) < 0 && (i = '"' + i + '"'), e[r] = i
            }
            return this.fontStyle + " " + this.fontVariant + " " + this.fontWeight + " " + t + " " + e.join(",")
        }, t
    }();

    function ya(t) {
        return "number" == typeof t ? qt(t) : ("string" == typeof t && 0 === t.indexOf("0x") && (t = t.replace("0x", "#")), t)
    }

    function ga(t) {
        if (Array.isArray(t)) {
            for (var e = 0; e < t.length; ++e) t[e] = ya(t[e]);
            return t
        }
        return ya(t)
    }

    function Ea(t, e, r) {
        for (var i in r) Array.isArray(e[i]) ? t[i] = e[i].slice() : t[i] = e[i]
    }

    var Ta = function () {
        function t(t, e, r, i, n, o, s, a, h) {
            this.text = t, this.style = e, this.width = r, this.height = i, this.lines = n, this.lineWidths = o, this.lineHeight = s, this.maxLineWidth = a, this.fontProperties = h
        }

        return t.measureText = function (e, r, i, n) {
            void 0 === n && (n = t._canvas), i = null == i ? r.wordWrap : i;
            var o = r.toFontString(), s = t.measureFont(o);
            0 === s.fontSize && (s.fontSize = r.fontSize, s.ascent = r.fontSize);
            var a = n.getContext("2d");
            a.font = o;
            for (var h = (i ? t.wordWrap(e, r, n) : e).split(/(?:\r\n|\r|\n)/), u = new Array(h.length), l = 0, c = 0; c < h.length; c++) {
                var d = a.measureText(h[c]).width + (h[c].length - 1) * r.letterSpacing;
                u[c] = d, l = Math.max(l, d)
            }
            var f = l + r.strokeThickness;
            r.dropShadow && (f += r.dropShadowDistance);
            var p = r.lineHeight || s.fontSize + r.strokeThickness, _ = Math.max(p, s.fontSize + r.strokeThickness) + (h.length - 1) * (p + r.leading);
            return r.dropShadow && (_ += r.dropShadowDistance), new t(e, r, f, _, h, u, p + r.leading, l, s)
        }, t.wordWrap = function (e, r, i) {
            void 0 === i && (i = t._canvas);
            for (var n = i.getContext("2d"), o = 0, s = "", a = "", h = Object.create(null), u = r.letterSpacing, l = r.whiteSpace, c = t.collapseSpaces(l), d = t.collapseNewlines(l), f = !c, p = r.wordWrapWidth + u, _ = t.tokenize(e), m = 0; m < _.length; m++) {
                var v = _[m];
                if (t.isNewline(v)) {
                    if (!d) {
                        a += t.addLine(s), f = !c, s = "", o = 0;
                        continue
                    }
                    v = " "
                }
                if (c) {
                    var y = t.isBreakingSpace(v), g = t.isBreakingSpace(s[s.length - 1]);
                    if (y && g) continue
                }
                var E = t.getFromCache(v, u, h, n);
                if (E > p) if ("" !== s && (a += t.addLine(s), s = "", o = 0), t.canBreakWords(v, r.breakWords)) for (var T = t.wordWrapSplit(v), b = 0; b < T.length; b++) {
                    for (var x = T[b], A = 1; T[b + A];) {
                        var S = T[b + A], O = x[x.length - 1];
                        if (t.canBreakChars(O, S, v, b, r.breakWords)) break;
                        x += S, A++
                    }
                    b += x.length - 1;
                    var R = t.getFromCache(x, u, h, n);
                    R + o > p && (a += t.addLine(s), f = !1, s = "", o = 0), s += x, o += R
                } else {
                    s.length > 0 && (a += t.addLine(s), s = "", o = 0);
                    var P = m === _.length - 1;
                    a += t.addLine(v, !P), f = !1, s = "", o = 0
                } else E + o > p && (f = !1, a += t.addLine(s), s = "", o = 0), (s.length > 0 || !t.isBreakingSpace(v) || f) && (s += v, o += E)
            }
            return a + t.addLine(s, !1)
        }, t.addLine = function (e, r) {
            return void 0 === r && (r = !0), e = t.trimRight(e), r ? e + "\n" : e
        }, t.getFromCache = function (t, e, r, i) {
            var n = r[t];
            if ("number" != typeof n) {
                var o = t.length * e;
                n = i.measureText(t).width + o, r[t] = n
            }
            return n
        }, t.collapseSpaces = function (t) {
            return "normal" === t || "pre-line" === t
        }, t.collapseNewlines = function (t) {
            return "normal" === t
        }, t.trimRight = function (e) {
            if ("string" != typeof e) return "";
            for (var r = e.length - 1; r >= 0; r--) {
                var i = e[r];
                if (!t.isBreakingSpace(i)) break;
                e = e.slice(0, -1)
            }
            return e
        }, t.isNewline = function (e) {
            return "string" == typeof e && t._newlines.indexOf(e.charCodeAt(0)) >= 0
        }, t.isBreakingSpace = function (e, r) {
            return "string" == typeof e && t._breakingSpaces.indexOf(e.charCodeAt(0)) >= 0
        }, t.tokenize = function (e) {
            var r = [], i = "";
            if ("string" != typeof e) return r;
            for (var n = 0; n < e.length; n++) {
                var o = e[n], s = e[n + 1];
                t.isBreakingSpace(o, s) || t.isNewline(o) ? ("" !== i && (r.push(i), i = ""), r.push(o)) : i += o
            }
            return "" !== i && r.push(i), r
        }, t.canBreakWords = function (t, e) {
            return e
        }, t.canBreakChars = function (t, e, r, i, n) {
            return !0
        }, t.wordWrapSplit = function (t) {
            return t.split("")
        }, t.measureFont = function (e) {
            if (t._fonts[e]) return t._fonts[e];
            var r = {ascent: 0, descent: 0, fontSize: 0}, i = t._canvas, n = t._context;
            n.font = e;
            var o = t.METRICS_STRING + t.BASELINE_SYMBOL, s = Math.ceil(n.measureText(o).width), a = Math.ceil(n.measureText(t.BASELINE_SYMBOL).width), h = t.HEIGHT_MULTIPLIER * a;
            a = a * t.BASELINE_MULTIPLIER | 0, i.width = s, i.height = h, n.fillStyle = "#f00", n.fillRect(0, 0, s, h), n.font = e, n.textBaseline = "alphabetic", n.fillStyle = "#000", n.fillText(o, 0, a);
            var u = n.getImageData(0, 0, s, h).data, l = u.length, c = 4 * s, d = 0, f = 0, p = !1;
            for (d = 0; d < a; ++d) {
                for (var _ = 0; _ < c; _ += 4) if (255 !== u[f + _]) {
                    p = !0;
                    break
                }
                if (p) break;
                f += c
            }
            for (r.ascent = a - d, f = l - c, p = !1, d = h; d > a; --d) {
                for (_ = 0; _ < c; _ += 4) if (255 !== u[f + _]) {
                    p = !0;
                    break
                }
                if (p) break;
                f -= c
            }
            return r.descent = d - a, r.fontSize = r.ascent + r.descent, t._fonts[e] = r, r
        }, t.clearMetrics = function (e) {
            void 0 === e && (e = ""), e ? delete t._fonts[e] : t._fonts = {}
        }, t
    }(), ba = function () {
        try {
            var t = new OffscreenCanvas(0, 0), e = t.getContext("2d");
            return e && e.measureText ? t : document.createElement("canvas")
        } catch (t) {
            return document.createElement("canvas")
        }
    }();
    ba.width = ba.height = 10, Ta._canvas = ba, Ta._context = ba.getContext("2d"), Ta._fonts = {}, Ta.METRICS_STRING = "|脡q脜", Ta.BASELINE_SYMBOL = "M", Ta.BASELINE_MULTIPLIER = 1.4, Ta.HEIGHT_MULTIPLIER = 2, Ta._newlines = [10, 13], Ta._breakingSpaces = [9, 32, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8200, 8201, 8202, 8287, 12288];
    var xa = {texture: !0, children: !1, baseTexture: !0}, Aa = function (e) {
        function r(t, r, i) {
            var n = this, o = !1;
            i || (i = document.createElement("canvas"), o = !0), i.width = 3, i.height = 3;
            var s = Ur.from(i);
            return s.orig = new Se, s.trim = new Se, (n = e.call(this, s) || this)._ownCanvas = o, n.canvas = i, n.context = n.canvas.getContext("2d"), n._resolution = B.RESOLUTION, n._autoResolution = !0, n._text = null, n._style = null, n._styleListener = null, n._font = "", n.text = t, n.style = r, n.localStyleID = -1, n
        }

        return function (t, e) {
            function r() {
                this.constructor = t
            }

            pa(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
        }(r, e), r.prototype.updateText = function (t) {
            var e = this._style;
            if (this.localStyleID !== e.styleID && (this.dirty = !0, this.localStyleID = e.styleID), this.dirty || !t) {
                this._font = this._style.toFontString();
                var r, i, n = this.context, o = Ta.measureText(this._text || " ", this._style, this._style.wordWrap, this.canvas), s = o.width, a = o.height, h = o.lines,
                    u = o.lineHeight, l = o.lineWidths, c = o.maxLineWidth, d = o.fontProperties;
                this.canvas.width = Math.ceil((Math.max(1, s) + 2 * e.padding) * this._resolution), this.canvas.height = Math.ceil((Math.max(1, a) + 2 * e.padding) * this._resolution), n.scale(this._resolution, this._resolution), n.clearRect(0, 0, this.canvas.width, this.canvas.height), n.font = this._font, n.lineWidth = e.strokeThickness, n.textBaseline = e.textBaseline, n.lineJoin = e.lineJoin, n.miterLimit = e.miterLimit;
                for (var f = e.dropShadow ? 2 : 1, p = 0; p < f; ++p) {
                    var _ = e.dropShadow && 0 === p, m = _ ? Math.ceil(Math.max(1, a) + 2 * e.padding) : 0, v = m * this._resolution;
                    if (_) {
                        n.fillStyle = "black", n.strokeStyle = "black";
                        var y = e.dropShadowColor, g = Wt("number" == typeof y ? y : Kt(y));
                        n.shadowColor = "rgba(" + 255 * g[0] + "," + 255 * g[1] + "," + 255 * g[2] + "," + e.dropShadowAlpha + ")", n.shadowBlur = e.dropShadowBlur, n.shadowOffsetX = Math.cos(e.dropShadowAngle) * e.dropShadowDistance, n.shadowOffsetY = Math.sin(e.dropShadowAngle) * e.dropShadowDistance + v
                    } else n.fillStyle = this._generateFillStyle(e, h, o), n.strokeStyle = e.stroke, n.shadowColor = "black", n.shadowBlur = 0, n.shadowOffsetX = 0, n.shadowOffsetY = 0;
                    for (var E = 0; E < h.length; E++) r = e.strokeThickness / 2, i = e.strokeThickness / 2 + E * u + d.ascent, "right" === e.align ? r += c - l[E] : "center" === e.align && (r += (c - l[E]) / 2), e.stroke && e.strokeThickness && this.drawLetterSpacing(h[E], r + e.padding, i + e.padding - m, !0), e.fill && this.drawLetterSpacing(h[E], r + e.padding, i + e.padding - m)
                }
                this.updateTexture()
            }
        }, r.prototype.drawLetterSpacing = function (t, e, r, i) {
            void 0 === i && (i = !1);
            var n = this._style.letterSpacing;
            if (0 !== n) for (var o = e, s = Array.from ? Array.from(t) : t.split(""), a = this.context.measureText(t).width, h = 0, u = 0; u < s.length; ++u) {
                var l = s[u];
                i ? this.context.strokeText(l, o, r) : this.context.fillText(l, o, r), o += a - (h = this.context.measureText(t.substring(u + 1)).width) + n, a = h
            } else i ? this.context.strokeText(t, e, r) : this.context.fillText(t, e, r)
        }, r.prototype.updateTexture = function () {
            var t = this.canvas;
            if (this._style.trim) {
                var e = me(t);
                e.data && (t.width = e.width, t.height = e.height, this.context.putImageData(e.data, 0, 0))
            }
            var r = this._texture, i = this._style, n = i.trim ? 0 : i.padding, o = r.baseTexture;
            r.trim.width = r._frame.width = Math.ceil(t.width / this._resolution), r.trim.height = r._frame.height = Math.ceil(t.height / this._resolution), r.trim.x = -n, r.trim.y = -n, r.orig.width = r._frame.width - 2 * n, r.orig.height = r._frame.height - 2 * n, this._onTextureUpdate(), o.setRealSize(t.width, t.height, this._resolution), this._recursivePostUpdateTransform(), this.dirty = !1
        }, r.prototype._render = function (t) {
            this._autoResolution && this._resolution !== t.resolution && (this._resolution = t.resolution, this.dirty = !0), this.updateText(!0), e.prototype._render.call(this, t)
        }, r.prototype.getLocalBounds = function (t) {
            return this.updateText(!0), e.prototype.getLocalBounds.call(this, t)
        }, r.prototype._calculateBounds = function () {
            this.updateText(!0), this.calculateVertices(), this._bounds.addQuad(this.vertexData)
        }, r.prototype._generateFillStyle = function (e, r, i) {
            var n, o = e.fill;
            if (!Array.isArray(o)) return o;
            if (1 === o.length) return o[0];
            var s = e.dropShadow ? e.dropShadowDistance : 0, a = e.padding || 0, h = Math.ceil(this.canvas.width / this._resolution) - s - 2 * a,
                u = Math.ceil(this.canvas.height / this._resolution) - s - 2 * a, l = o.slice(), c = e.fillGradientStops.slice();
            if (!c.length) for (var d = l.length + 1, f = 1; f < d; ++f) c.push(f / d);
            if (l.unshift(o[0]), c.unshift(0), l.push(o[o.length - 1]), c.push(1), e.fillGradientType === t.TEXT_GRADIENT.LINEAR_VERTICAL) {
                n = this.context.createLinearGradient(h / 2, a, h / 2, u + a);
                var p = (i.fontProperties.fontSize + e.strokeThickness) / u;
                for (f = 0; f < r.length; f++) for (var _ = i.lineHeight * f, m = 0; m < l.length; m++) {
                    var v;
                    v = "number" == typeof c[m] ? c[m] : m / l.length;
                    var y = Math.min(1, Math.max(0, _ / u + v * p));
                    y = Number(y.toFixed(5)), n.addColorStop(y, l[m])
                }
            } else {
                n = this.context.createLinearGradient(a, u / 2, h + a, u / 2);
                var g = l.length + 1, E = 1;
                for (f = 0; f < l.length; f++) {
                    var T;
                    T = "number" == typeof c[f] ? c[f] : E / g, n.addColorStop(T, l[f]), E++
                }
            }
            return n
        }, r.prototype.destroy = function (t) {
            "boolean" == typeof t && (t = {children: t}), t = Object.assign({}, xa, t), e.prototype.destroy.call(this, t), this._ownCanvas && (this.canvas.height = this.canvas.width = 0), this.context = null, this.canvas = null, this._style = null
        }, Object.defineProperty(r.prototype, "width", {
            get: function () {
                return this.updateText(!0), Math.abs(this.scale.x) * this._texture.orig.width
            }, set: function (t) {
                this.updateText(!0);
                var e = he(this.scale.x) || 1;
                this.scale.x = e * t / this._texture.orig.width, this._width = t
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(r.prototype, "height", {
            get: function () {
                return this.updateText(!0), Math.abs(this.scale.y) * this._texture.orig.height
            }, set: function (t) {
                this.updateText(!0);
                var e = he(this.scale.y) || 1;
                this.scale.y = e * t / this._texture.orig.height, this._height = t
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(r.prototype, "style", {
            get: function () {
                return this._style
            }, set: function (t) {
                t = t || {}, this._style = t instanceof va ? t : new va(t), this.localStyleID = -1, this.dirty = !0
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(r.prototype, "text", {
            get: function () {
                return this._text
            }, set: function (t) {
                t = String(null == t ? "" : t), this._text !== t && (this._text = t, this.dirty = !0)
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(r.prototype, "resolution", {
            get: function () {
                return this._resolution
            }, set: function (t) {
                this._autoResolution = !1, this._resolution !== t && (this._resolution = t, this.dirty = !0)
            }, enumerable: !1, configurable: !0
        }), r
    }(fa);
    B.UPLOADS_PER_FRAME = 4;
    var Sa = function (t, e) {
        return (Sa = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
            t.__proto__ = e
        } || function (t, e) {
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
        })(t, e)
    }, Oa = function () {
        function t(t) {
            this.maxItemsPerFrame = t, this.itemsLeft = 0
        }

        return t.prototype.beginFrame = function () {
            this.itemsLeft = this.maxItemsPerFrame
        }, t.prototype.allowedToUpload = function () {
            return this.itemsLeft-- > 0
        }, t
    }();

    function Ra(t, e) {
        var r = !1;
        if (t && t._textures && t._textures.length) for (var i = 0; i < t._textures.length; i++) if (t._textures[i] instanceof Ur) {
            var n = t._textures[i].baseTexture;
            -1 === e.indexOf(n) && (e.push(n), r = !0)
        }
        return r
    }

    function Pa(t, e) {
        if (t.baseTexture instanceof Tr) {
            var r = t.baseTexture;
            return -1 === e.indexOf(r) && e.push(r), !0
        }
        return !1
    }

    function Ia(t, e) {
        if (t._texture && t._texture instanceof Ur) {
            var r = t._texture.baseTexture;
            return -1 === e.indexOf(r) && e.push(r), !0
        }
        return !1
    }

    function Ma(t, e) {
        return e instanceof Aa && (e.updateText(!0), !0)
    }

    function wa(t, e) {
        if (e instanceof va) {
            var r = e.toFontString();
            return Ta.measureFont(r), !0
        }
        return !1
    }

    function Da(t, e) {
        if (t instanceof Aa) {
            -1 === e.indexOf(t.style) && e.push(t.style), -1 === e.indexOf(t) && e.push(t);
            var r = t._texture.baseTexture;
            return -1 === e.indexOf(r) && e.push(r), !0
        }
        return !1
    }

    function Ca(t, e) {
        return t instanceof va && (-1 === e.indexOf(t) && e.push(t), !0)
    }

    var Na = function () {
        function e(t) {
            var e = this;
            this.limiter = new Oa(B.UPLOADS_PER_FRAME), this.renderer = t, this.uploadHookHelper = null, this.queue = [], this.addHooks = [], this.uploadHooks = [], this.completes = [], this.ticking = !1, this.delayedTick = function () {
                e.queue && e.prepareItems()
            }, this.registerFindHook(Da), this.registerFindHook(Ca), this.registerFindHook(Ra), this.registerFindHook(Pa), this.registerFindHook(Ia), this.registerUploadHook(Ma), this.registerUploadHook(wa)
        }

        return e.prototype.upload = function (e, r) {
            "function" == typeof e && (r = e, e = null), e && this.add(e), this.queue.length ? (r && this.completes.push(r), this.ticking || (this.ticking = !0, rr.system.addOnce(this.tick, this, t.UPDATE_PRIORITY.UTILITY))) : r && r()
        }, e.prototype.tick = function () {
            setTimeout(this.delayedTick, 0)
        }, e.prototype.prepareItems = function () {
            for (this.limiter.beginFrame(); this.queue.length && this.limiter.allowedToUpload();) {
                var e = this.queue[0], r = !1;
                if (e && !e._destroyed) for (var i = 0, n = this.uploadHooks.length; i < n; i++) if (this.uploadHooks[i](this.uploadHookHelper, e)) {
                    this.queue.shift(), r = !0;
                    break
                }
                r || this.queue.shift()
            }
            if (this.queue.length) rr.system.addOnce(this.tick, this, t.UPDATE_PRIORITY.UTILITY); else {
                this.ticking = !1;
                var o = this.completes.slice(0);
                for (this.completes.length = 0, i = 0, n = o.length; i < n; i++) o[i]()
            }
        }, e.prototype.registerFindHook = function (t) {
            return t && this.addHooks.push(t), this
        }, e.prototype.registerUploadHook = function (t) {
            return t && this.uploadHooks.push(t), this
        }, e.prototype.add = function (t) {
            for (var e = 0, r = this.addHooks.length; e < r && !this.addHooks[e](t, this.queue); e++) ;
            if (t instanceof qe) for (e = t.children.length - 1; e >= 0; e--) this.add(t.children[e]);
            return this
        }, e.prototype.destroy = function () {
            this.ticking && rr.system.remove(this.tick, this), this.ticking = !1, this.addHooks = null, this.uploadHooks = null, this.renderer = null, this.completes = null, this.queue = null, this.limiter = null, this.uploadHookHelper = null
        }, e
    }();

    function La(t, e) {
        return e instanceof Tr && (e._glTextures[t.CONTEXT_UID] || t.texture.bind(e), !0)
    }

    function Fa(t, e) {
        if (!(e instanceof ha)) return !1;
        var r = e.geometry;
        e.finishPoly(), r.updateBatches();
        for (var i = r.batches, n = 0; n < i.length; n++) {
            var o = i[n].style.texture;
            o && La(t, o.baseTexture)
        }
        return r.batchable || t.geometry.bind(r, e._resolveDirectShader(t)), !0
    }

    function Ba(t, e) {
        return t instanceof ha && (e.push(t), !0)
    }

    var Ua = function (t) {
        function e(e) {
            var r = t.call(this, e) || this;
            return r.uploadHookHelper = r.renderer, r.registerFindHook(Ba), r.registerUploadHook(La), r.registerUploadHook(Fa), r
        }

        return function (t, e) {
            function r() {
                this.constructor = t
            }

            Sa(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
        }(e, t), e
    }(Na), Ga = function () {
        function t(t) {
            this.maxMilliseconds = t, this.frameStart = 0
        }

        return t.prototype.beginFrame = function () {
            this.frameStart = Date.now()
        }, t.prototype.allowedToUpload = function () {
            return Date.now() - this.frameStart < this.maxMilliseconds
        }, t
    }(), Xa = function () {
        function t(t, e, r) {
            void 0 === r && (r = null), this._texture = t instanceof Ur ? t : null, this.baseTexture = t instanceof Tr ? t : this._texture.baseTexture, this.textures = {}, this.animations = {}, this.data = e;
            var i = this.baseTexture.resource;
            this.resolution = this._updateResolution(r || (i ? i.url : null)), this._frames = this.data.frames, this._frameKeys = Object.keys(this._frames), this._batchIndex = 0, this._callback = null
        }

        return t.prototype._updateResolution = function (t) {
            void 0 === t && (t = null);
            var e = this.data.meta.scale, r = Ee(t, null);
            return null === r && (r = void 0 !== e ? parseFloat(e) : 1), 1 !== r && this.baseTexture.setResolution(r), r
        }, t.prototype.parse = function (e) {
            this._batchIndex = 0, this._callback = e, this._frameKeys.length <= t.BATCH_SIZE ? (this._processFrames(0), this._processAnimations(), this._parseComplete()) : this._nextBatch()
        }, t.prototype._processFrames = function (e) {
            for (var r = e, i = t.BATCH_SIZE; r - e < i && r < this._frameKeys.length;) {
                var n = this._frameKeys[r], o = this._frames[n], s = o.frame;
                if (s) {
                    var a, h = null, u = !1 !== o.trimmed && o.sourceSize ? o.sourceSize : o.frame,
                        l = new Se(0, 0, Math.floor(u.w) / this.resolution, Math.floor(u.h) / this.resolution);
                    a = o.rotated ? new Se(Math.floor(s.x) / this.resolution, Math.floor(s.y) / this.resolution, Math.floor(s.h) / this.resolution, Math.floor(s.w) / this.resolution) : new Se(Math.floor(s.x) / this.resolution, Math.floor(s.y) / this.resolution, Math.floor(s.w) / this.resolution, Math.floor(s.h) / this.resolution), !1 !== o.trimmed && o.spriteSourceSize && (h = new Se(Math.floor(o.spriteSourceSize.x) / this.resolution, Math.floor(o.spriteSourceSize.y) / this.resolution, Math.floor(s.w) / this.resolution, Math.floor(s.h) / this.resolution)), this.textures[n] = new Ur(this.baseTexture, a, l, h, o.rotated ? 2 : 0, o.anchor), Ur.addToCache(this.textures[n], n)
                }
                r++
            }
        }, t.prototype._processAnimations = function () {
            var t = this.data.animations || {};
            for (var e in t) {
                this.animations[e] = [];
                for (var r = 0; r < t[e].length; r++) {
                    var i = t[e][r];
                    this.animations[e].push(this.textures[i])
                }
            }
        }, t.prototype._parseComplete = function () {
            var t = this._callback;
            this._callback = null, this._batchIndex = 0, t.call(this, this.textures)
        }, t.prototype._nextBatch = function () {
            var e = this;
            this._processFrames(this._batchIndex * t.BATCH_SIZE), this._batchIndex++, setTimeout(function () {
                e._batchIndex * t.BATCH_SIZE < e._frameKeys.length ? e._nextBatch() : (e._processAnimations(), e._parseComplete())
            }, 0)
        }, t.prototype.destroy = function (t) {
            var e;
            for (var r in void 0 === t && (t = !1), this.textures) this.textures[r].destroy();
            this._frames = null, this._frameKeys = null, this.data = null, this.textures = null, t && (null === (e = this._texture) || void 0 === e || e.destroy(), this.baseTexture.destroy()), this._texture = null, this.baseTexture = null
        }, t.BATCH_SIZE = 1e3, t
    }(), ka = function () {
        function t() {
        }

        return t.use = function (e, r) {
            var i, n, o = this, s = e.name + "_image";
            if (e.data && e.type === mo.TYPE.JSON && e.data.frames && !o.resources[s]) {
                var a = null === (n = null === (i = e.data) || void 0 === i ? void 0 : i.meta) || void 0 === n ? void 0 : n.related_multi_packs;
                if (Array.isArray(a)) for (var h = function (t) {
                    if ("string" != typeof t) return "continue";
                    var r = t.replace(".json", ""), i = Xt.resolve(e.url.replace(o.baseUrl, ""), t);
                    if (o.resources[r] || Object.values(o.resources).some(function (t) {
                        return Xt.format(Xt.parse(t.url)) === i
                    })) return "continue";
                    var n = {crossOrigin: e.crossOrigin, loadType: mo.LOAD_TYPE.XHR, xhrType: mo.XHR_RESPONSE_TYPE.JSON, parentResource: e};
                    o.add(r, i, n)
                }, u = 0, l = a; u < l.length; u++) h(l[u]);
                var c = {crossOrigin: e.crossOrigin, metadata: e.metadata.imageMetadata, parentResource: e}, d = t.getResourcePath(e, o.baseUrl);
                o.add(s, d, c, function (t) {
                    if (t.error) r(t.error); else {
                        var i = new Xa(t.texture, e.data, e.url);
                        i.parse(function () {
                            e.spritesheet = i, e.textures = i.textures, r()
                        })
                    }
                })
            } else r()
        }, t.getResourcePath = function (t, e) {
            return t.isDataUrl ? t.data.meta.image : Xt.resolve(t.url.replace(e, ""), t.data.meta.image)
        }, t
    }(), ja = function (t, e) {
        return (ja = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
            t.__proto__ = e
        } || function (t, e) {
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
        })(t, e)
    };

    function Ha(t, e) {
        function r() {
            this.constructor = t
        }

        ja(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
    }

    var Ya = new Me, Va = function (t) {
            function e(e, r, i) {
                void 0 === r && (r = 100), void 0 === i && (i = 100);
                var n = t.call(this, e) || this;
                return n.tileTransform = new ke, n._width = r, n._height = i, n.uvMatrix = n.texture.uvMatrix || new zi(e), n.pluginName = "tilingSprite", n.uvRespectAnchor = !1, n
            }

            return Ha(e, t), Object.defineProperty(e.prototype, "clampMargin", {
                get: function () {
                    return this.uvMatrix.clampMargin
                }, set: function (t) {
                    this.uvMatrix.clampMargin = t, this.uvMatrix.update(!0)
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "tileScale", {
                get: function () {
                    return this.tileTransform.scale
                }, set: function (t) {
                    this.tileTransform.scale.copyFrom(t)
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "tilePosition", {
                get: function () {
                    return this.tileTransform.position
                }, set: function (t) {
                    this.tileTransform.position.copyFrom(t)
                }, enumerable: !1, configurable: !0
            }), e.prototype._onTextureUpdate = function () {
                this.uvMatrix && (this.uvMatrix.texture = this._texture), this._cachedTint = 16777215
            }, e.prototype._render = function (t) {
                var e = this._texture;
                e && e.valid && (this.tileTransform.updateLocalTransform(), this.uvMatrix.update(), t.batch.setObjectRenderer(t.plugins[this.pluginName]), t.plugins[this.pluginName].render(this))
            }, e.prototype._calculateBounds = function () {
                var t = this._width * -this._anchor._x, e = this._height * -this._anchor._y, r = this._width * (1 - this._anchor._x), i = this._height * (1 - this._anchor._y);
                this._bounds.addFrame(this.transform, t, e, r, i)
            }, e.prototype.getLocalBounds = function (e) {
                return 0 === this.children.length ? (this._bounds.minX = this._width * -this._anchor._x, this._bounds.minY = this._height * -this._anchor._y, this._bounds.maxX = this._width * (1 - this._anchor._x), this._bounds.maxY = this._height * (1 - this._anchor._y), e || (this._localBoundsRect || (this._localBoundsRect = new Se), e = this._localBoundsRect), this._bounds.getRectangle(e)) : t.prototype.getLocalBounds.call(this, e)
            }, e.prototype.containsPoint = function (t) {
                this.worldTransform.applyInverse(t, Ya);
                var e = this._width, r = this._height, i = -e * this.anchor._x;
                if (Ya.x >= i && Ya.x < i + e) {
                    var n = -r * this.anchor._y;
                    if (Ya.y >= n && Ya.y < n + r) return !0
                }
                return !1
            }, e.prototype.destroy = function (e) {
                t.prototype.destroy.call(this, e), this.tileTransform = null, this.uvMatrix = null
            }, e.from = function (t, r) {
                return new e(Ur.from(t, r), r.width, r.height)
            }, Object.defineProperty(e.prototype, "width", {
                get: function () {
                    return this._width
                }, set: function (t) {
                    this._width = t
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "height", {
                get: function () {
                    return this._height
                }, set: function (t) {
                    this._height = t
                }, enumerable: !1, configurable: !0
            }), e
        }(fa),
        za = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n",
        Wa = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nuniform mat3 uMapCoord;\nuniform vec4 uClampFrame;\nuniform vec2 uClampOffset;\n\nvoid main(void)\n{\n    vec2 coord = vTextureCoord + ceil(uClampOffset - vTextureCoord);\n    coord = (uMapCoord * vec3(coord, 1.0)).xy;\n    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);\n\n    vec4 texSample = texture2D(uSampler, coord);\n    gl_FragColor = texSample * uColor;\n}\n",
        qa = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\n\nvoid main(void)\n{\n    vec4 sample = texture2D(uSampler, vTextureCoord);\n    gl_FragColor = sample * uColor;\n}\n",
        Ka = new De, Za = function (e) {
            function r(t) {
                var r = e.call(this, t) || this, i = {globals: r.renderer.globalUniforms};
                return r.shader = Xi.from(za, Wa, i), r.simpleShader = Xi.from(za, qa, i), r.quad = new Qr, r.state = ki.for2d(), r
            }

            return Ha(r, e), r.prototype.render = function (e) {
                var r = this.renderer, i = this.quad, n = i.vertices;
                n[0] = n[6] = e._width * -e.anchor.x, n[1] = n[3] = e._height * -e.anchor.y, n[2] = n[4] = e._width * (1 - e.anchor.x), n[5] = n[7] = e._height * (1 - e.anchor.y);
                var o = e.uvRespectAnchor ? e.anchor.x : 0, s = e.uvRespectAnchor ? e.anchor.y : 0;
                (n = i.uvs)[0] = n[6] = -o, n[1] = n[3] = -s, n[2] = n[4] = 1 - o, n[5] = n[7] = 1 - s, i.invalidate();
                var a = e._texture, h = a.baseTexture, u = e.tileTransform.localTransform, l = e.uvMatrix,
                    c = h.isPowerOfTwo && a.frame.width === h.width && a.frame.height === h.height;
                c && (h._glTextures[r.CONTEXT_UID] ? c = h.wrapMode !== t.WRAP_MODES.CLAMP : h.wrapMode === t.WRAP_MODES.CLAMP && (h.wrapMode = t.WRAP_MODES.REPEAT));
                var d = c ? this.simpleShader : this.shader, f = a.width, p = a.height, _ = e._width, m = e._height;
                Ka.set(u.a * f / _, u.b * f / m, u.c * p / _, u.d * p / m, u.tx / _, u.ty / m), Ka.invert(), c ? Ka.prepend(l.mapCoord) : (d.uniforms.uMapCoord = l.mapCoord.toArray(!0), d.uniforms.uClampFrame = l.uClampFrame, d.uniforms.uClampOffset = l.uClampOffset), d.uniforms.uTransform = Ka.toArray(!0), d.uniforms.uColor = te(e.tint, e.worldAlpha, d.uniforms.uColor, h.alphaMode), d.uniforms.translationMatrix = e.transform.worldTransform.toArray(!0), d.uniforms.uSampler = a, r.shader.bind(d), r.geometry.bind(i), this.state.blendMode = Jt(e.blendMode, h.alphaMode), r.state.set(this.state), r.geometry.draw(this.renderer.gl.TRIANGLES, 6, 0)
            }, r
        }(oi), Ja = function (t, e) {
            return (Ja = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
            })(t, e)
        };

    function Qa(t, e) {
        function r() {
            this.constructor = t
        }

        Ja(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
    }

    var $a = function () {
            function t(t, e) {
                this.uvBuffer = t, this.uvMatrix = e, this.data = null, this._bufferUpdateId = -1, this._textureUpdateId = -1, this._updateID = 0
            }

            return t.prototype.update = function (t) {
                if (t || this._bufferUpdateId !== this.uvBuffer._updateID || this._textureUpdateId !== this.uvMatrix._updateID) {
                    this._bufferUpdateId = this.uvBuffer._updateID, this._textureUpdateId = this.uvMatrix._updateID;
                    var e = this.uvBuffer.data;
                    this.data && this.data.length === e.length || (this.data = new Float32Array(e.length)), this.uvMatrix.multiplyUvs(e, this.data), this._updateID++
                }
            }, t
        }(), th = new Me, eh = new Pe, rh = function (e) {
            function r(r, i, n, o) {
                void 0 === o && (o = t.DRAW_MODES.TRIANGLES);
                var s = e.call(this) || this;
                return s.geometry = r, r.refCount++, s.shader = i, s.state = n || ki.for2d(), s.drawMode = o, s.start = 0, s.size = 0, s.uvs = null, s.indices = null, s.vertexData = new Float32Array(1), s.vertexDirty = 0, s._transformID = -1, s._roundPixels = B.ROUND_PIXELS, s.batchUvs = null, s
            }

            return Qa(r, e), Object.defineProperty(r.prototype, "uvBuffer", {
                get: function () {
                    return this.geometry.buffers[1]
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(r.prototype, "verticesBuffer", {
                get: function () {
                    return this.geometry.buffers[0]
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(r.prototype, "material", {
                get: function () {
                    return this.shader
                }, set: function (t) {
                    this.shader = t
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(r.prototype, "blendMode", {
                get: function () {
                    return this.state.blendMode
                }, set: function (t) {
                    this.state.blendMode = t
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(r.prototype, "roundPixels", {
                get: function () {
                    return this._roundPixels
                }, set: function (t) {
                    this._roundPixels !== t && (this._transformID = -1), this._roundPixels = t
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(r.prototype, "tint", {
                get: function () {
                    return "tint" in this.shader ? this.shader.tint : null
                }, set: function (t) {
                    this.shader.tint = t
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(r.prototype, "texture", {
                get: function () {
                    return "texture" in this.shader ? this.shader.texture : null
                }, set: function (t) {
                    this.shader.texture = t
                }, enumerable: !1, configurable: !0
            }), r.prototype._render = function (e) {
                var i = this.geometry.buffers[0].data;
                this.shader.batchable && this.drawMode === t.DRAW_MODES.TRIANGLES && i.length < 2 * r.BATCHABLE_SIZE ? this._renderToBatch(e) : this._renderDefault(e)
            }, r.prototype._renderDefault = function (t) {
                var e = this.shader;
                e.alpha = this.worldAlpha, e.update && e.update(), t.batch.flush(), e.program.uniformData.translationMatrix && (e.uniforms.translationMatrix = this.transform.worldTransform.toArray(!0)), t.shader.bind(e), t.state.set(this.state), t.geometry.bind(this.geometry, e), t.geometry.draw(this.drawMode, this.size, this.start, this.geometry.instanceCount)
            }, r.prototype._renderToBatch = function (t) {
                var e = this.geometry, r = this.shader;
                r.uvMatrix && (r.uvMatrix.update(), this.calculateUvs()), this.calculateVertices(), this.indices = e.indexBuffer.data, this._tintRGB = r._tintRGB, this._texture = r.texture;
                var i = this.material.pluginName;
                t.batch.setObjectRenderer(t.plugins[i]), t.plugins[i].render(this)
            }, r.prototype.calculateVertices = function () {
                var t = this.geometry, e = t.buffers[0].data;
                if (t.vertexDirtyId !== this.vertexDirty || this._transformID !== this.transform._worldID) {
                    this._transformID = this.transform._worldID, this.vertexData.length !== e.length && (this.vertexData = new Float32Array(e.length));
                    for (var r = this.transform.worldTransform, i = r.a, n = r.b, o = r.c, s = r.d, a = r.tx, h = r.ty, u = this.vertexData, l = 0; l < u.length / 2; l++) {
                        var c = e[2 * l], d = e[2 * l + 1];
                        u[2 * l] = i * c + o * d + a, u[2 * l + 1] = n * c + s * d + h
                    }
                    if (this._roundPixels) {
                        var f = B.RESOLUTION;
                        for (l = 0; l < u.length; ++l) u[l] = Math.round((u[l] * f | 0) / f)
                    }
                    this.vertexDirty = t.vertexDirtyId
                }
            }, r.prototype.calculateUvs = function () {
                var t = this.geometry.buffers[1], e = this.shader;
                e.uvMatrix.isSimple ? this.uvs = t.data : (this.batchUvs || (this.batchUvs = new $a(t, e.uvMatrix)), this.batchUvs.update(), this.uvs = this.batchUvs.data)
            }, r.prototype._calculateBounds = function () {
                this.calculateVertices(), this._bounds.addVertexData(this.vertexData, 0, this.vertexData.length)
            }, r.prototype.containsPoint = function (t) {
                if (!this.getBounds().contains(t.x, t.y)) return !1;
                this.worldTransform.applyInverse(t, th);
                for (var e = this.geometry.getBuffer("aVertexPosition").data, r = eh.points, i = this.geometry.getIndex().data, n = i.length, o = 4 === this.drawMode ? 3 : 1, s = 0; s + 2 < n; s += o) {
                    var a = 2 * i[s], h = 2 * i[s + 1], u = 2 * i[s + 2];
                    if (r[0] = e[a], r[1] = e[a + 1], r[2] = e[h], r[3] = e[h + 1], r[4] = e[u], r[5] = e[u + 1], eh.contains(th.x, th.y)) return !0
                }
                return !1
            }, r.prototype.destroy = function (t) {
                e.prototype.destroy.call(this, t), this.geometry.refCount--, 0 === this.geometry.refCount && this.geometry.dispose(), this._cachedTexture && (this._cachedTexture.destroy(), this._cachedTexture = null), this.geometry = null, this.shader = null, this.state = null, this.uvs = null, this.indices = null, this.vertexData = null
            }, r.BATCHABLE_SIZE = 100, r
        }(qe),
        ih = "varying vec2 vTextureCoord;\nuniform vec4 uColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;\n}\n",
        nh = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTextureMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;\n}\n",
        oh = function (t) {
            function e(e, r) {
                var i = this, n = {uSampler: e, alpha: 1, uTextureMatrix: De.IDENTITY, uColor: new Float32Array([1, 1, 1, 1])};
                return (r = Object.assign({
                    tint: 16777215,
                    alpha: 1,
                    pluginName: "batch"
                }, r)).uniforms && Object.assign(n, r.uniforms), (i = t.call(this, r.program || Gi.from(nh, ih), n) || this)._colorDirty = !1, i.uvMatrix = new zi(e), i.batchable = void 0 === r.program, i.pluginName = r.pluginName, i.tint = r.tint, i.alpha = r.alpha, i
            }

            return Qa(e, t), Object.defineProperty(e.prototype, "texture", {
                get: function () {
                    return this.uniforms.uSampler
                }, set: function (t) {
                    this.uniforms.uSampler !== t && (this.uniforms.uSampler = t, this.uvMatrix.texture = t)
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "alpha", {
                get: function () {
                    return this._alpha
                }, set: function (t) {
                    t !== this._alpha && (this._alpha = t, this._colorDirty = !0)
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "tint", {
                get: function () {
                    return this._tint
                }, set: function (t) {
                    t !== this._tint && (this._tint = t, this._tintRGB = (t >> 16) + (65280 & t) + ((255 & t) << 16), this._colorDirty = !0)
                }, enumerable: !1, configurable: !0
            }), e.prototype.update = function () {
                if (this._colorDirty) {
                    this._colorDirty = !1;
                    var t = this.texture.baseTexture;
                    te(this._tint, this._alpha, this.uniforms.uColor, t.alphaMode)
                }
                this.uvMatrix.update() && (this.uniforms.uTextureMatrix = this.uvMatrix.mapCoord)
            }, e
        }(Xi), sh = function (e) {
            function r(r, i, n) {
                var o = e.call(this) || this, s = new Yr(r), a = new Yr(i, !0), h = new Yr(n, !0, !0);
                return o.addAttribute("aVertexPosition", s, 2, !1, t.TYPES.FLOAT).addAttribute("aTextureCoord", a, 2, !1, t.TYPES.FLOAT).addIndex(h), o._updateId = -1, o
            }

            return Qa(r, e), Object.defineProperty(r.prototype, "vertexDirtyId", {
                get: function () {
                    return this.buffers[0]._updateID
                }, enumerable: !1, configurable: !0
            }), r
        }(Zr), ah = function (t, e) {
            return (ah = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
            })(t, e)
        }, hh = function () {
            this.info = [], this.common = [], this.page = [], this.char = [], this.kerning = []
        }, uh = function () {
            function t() {
            }

            return t.test = function (t) {
                return "string" == typeof t && 0 === t.indexOf("info face=")
            }, t.parse = function (t) {
                var e = t.match(/^[a-z]+\s+.+$/gm), r = {info: [], common: [], page: [], char: [], chars: [], kerning: [], kernings: []};
                for (var i in e) {
                    var n = e[i].match(/^[a-z]+/gm)[0], o = e[i].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm), s = {};
                    for (var a in o) {
                        var h = o[a].split("="), u = h[0], l = h[1].replace(/"/gm, ""), c = parseFloat(l), d = isNaN(c) ? l : c;
                        s[u] = d
                    }
                    r[n].push(s)
                }
                var f = new hh;
                return r.info.forEach(function (t) {
                    return f.info.push({face: t.face, size: parseInt(t.size, 10)})
                }), r.common.forEach(function (t) {
                    return f.common.push({lineHeight: parseInt(t.lineHeight, 10)})
                }), r.page.forEach(function (t) {
                    return f.page.push({id: parseInt(t.id, 10), file: t.file})
                }), r.char.forEach(function (t) {
                    return f.char.push({
                        id: parseInt(t.id, 10),
                        page: parseInt(t.page, 10),
                        x: parseInt(t.x, 10),
                        y: parseInt(t.y, 10),
                        width: parseInt(t.width, 10),
                        height: parseInt(t.height, 10),
                        xoffset: parseInt(t.xoffset, 10),
                        yoffset: parseInt(t.yoffset, 10),
                        xadvance: parseInt(t.xadvance, 10)
                    })
                }), r.kerning.forEach(function (t) {
                    return f.kerning.push({first: parseInt(t.first, 10), second: parseInt(t.second, 10), amount: parseInt(t.amount, 10)})
                }), f
            }, t
        }(), lh = function () {
            function t() {
            }

            return t.test = function (t) {
                return t instanceof XMLDocument && t.getElementsByTagName("page").length && null !== t.getElementsByTagName("info")[0].getAttribute("face")
            }, t.parse = function (t) {
                for (var e = new hh, r = t.getElementsByTagName("info"), i = t.getElementsByTagName("common"), n = t.getElementsByTagName("page"), o = t.getElementsByTagName("char"), s = t.getElementsByTagName("kerning"), a = 0; a < r.length; a++) e.info.push({
                    face: r[a].getAttribute("face"),
                    size: parseInt(r[a].getAttribute("size"), 10)
                });
                for (a = 0; a < i.length; a++) e.common.push({lineHeight: parseInt(i[a].getAttribute("lineHeight"), 10)});
                for (a = 0; a < n.length; a++) e.page.push({id: parseInt(n[a].getAttribute("id"), 10) || 0, file: n[a].getAttribute("file")});
                for (a = 0; a < o.length; a++) {
                    var h = o[a];
                    e.char.push({
                        id: parseInt(h.getAttribute("id"), 10),
                        page: parseInt(h.getAttribute("page"), 10) || 0,
                        x: parseInt(h.getAttribute("x"), 10),
                        y: parseInt(h.getAttribute("y"), 10),
                        width: parseInt(h.getAttribute("width"), 10),
                        height: parseInt(h.getAttribute("height"), 10),
                        xoffset: parseInt(h.getAttribute("xoffset"), 10),
                        yoffset: parseInt(h.getAttribute("yoffset"), 10),
                        xadvance: parseInt(h.getAttribute("xadvance"), 10)
                    })
                }
                for (a = 0; a < s.length; a++) e.kerning.push({
                    first: parseInt(s[a].getAttribute("first"), 10),
                    second: parseInt(s[a].getAttribute("second"), 10),
                    amount: parseInt(s[a].getAttribute("amount"), 10)
                });
                return e
            }, t
        }(), ch = function () {
            function t() {
            }

            return t.test = function (t) {
                if ("string" == typeof t && t.indexOf("<font>") > -1) {
                    var e = (new self.DOMParser).parseFromString(t, "text/xml");
                    return lh.test(e)
                }
                return !1
            }, t.parse = function (t) {
                var e = (new self.DOMParser).parseFromString(t, "text/xml");
                return lh.parse(e)
            }, t
        }(), dh = [uh, lh, ch];

    function fh(t) {
        for (var e = 0; e < dh.length; e++) if (dh[e].test(t)) return dh[e];
        return null
    }

    function ph(e, r, i, n, o, s) {
        var a, h = i.fill;
        if (!Array.isArray(h)) return h;
        if (1 === h.length) return h[0];
        var u = i.dropShadow ? i.dropShadowDistance : 0, l = i.padding || 0, c = Math.ceil(e.width / n) - u - 2 * l, d = Math.ceil(e.height / n) - u - 2 * l, f = h.slice(),
            p = i.fillGradientStops.slice();
        if (!p.length) for (var _ = f.length + 1, m = 1; m < _; ++m) p.push(m / _);
        if (f.unshift(h[0]), p.unshift(0), f.push(h[h.length - 1]), p.push(1), i.fillGradientType === t.TEXT_GRADIENT.LINEAR_VERTICAL) {
            a = r.createLinearGradient(c / 2, l, c / 2, d + l);
            var v = 0, y = (s.fontProperties.fontSize + i.strokeThickness) / d;
            for (m = 0; m < o.length; m++) for (var g = s.lineHeight * m, E = 0; E < f.length; E++) {
                var T = g / d + ("number" == typeof p[E] ? p[E] : E / f.length) * y, b = Math.max(v, T);
                b = Math.min(b, 1), a.addColorStop(b, f[E]), v = b
            }
        } else {
            a = r.createLinearGradient(l, d / 2, c + l, d / 2);
            var x = f.length + 1, A = 1;
            for (m = 0; m < f.length; m++) {
                var S;
                S = "number" == typeof p[m] ? p[m] : A / x, a.addColorStop(S, f[m]), A++
            }
        }
        return a
    }

    function _h(t, e, r, i, n, o, s) {
        var a = r.text, h = r.fontProperties;
        e.translate(i, n), e.scale(o, o);
        var u = s.strokeThickness / 2, l = -s.strokeThickness / 2;
        e.font = s.toFontString(), e.lineWidth = s.strokeThickness, e.textBaseline = s.textBaseline, e.lineJoin = s.lineJoin, e.miterLimit = s.miterLimit, e.fillStyle = ph(t, e, s, o, [a], r), e.strokeStyle = s.stroke, e.font = s.toFontString(), e.lineWidth = s.strokeThickness, e.textBaseline = s.textBaseline, e.lineJoin = s.lineJoin, e.miterLimit = s.miterLimit, e.fillStyle = ph(t, e, s, o, [a], r), e.strokeStyle = s.stroke;
        var c = s.dropShadowColor, d = Wt("number" == typeof c ? c : Kt(c));
        s.dropShadow ? (e.shadowColor = "rgba(" + 255 * d[0] + "," + 255 * d[1] + "," + 255 * d[2] + "," + s.dropShadowAlpha + ")", e.shadowBlur = s.dropShadowBlur, e.shadowOffsetX = Math.cos(s.dropShadowAngle) * s.dropShadowDistance, e.shadowOffsetY = Math.sin(s.dropShadowAngle) * s.dropShadowDistance) : (e.shadowColor = "black", e.shadowBlur = 0, e.shadowOffsetX = 0, e.shadowOffsetY = 0), s.stroke && s.strokeThickness && e.strokeText(a, u, l + r.lineHeight - h.descent), s.fill && e.fillText(a, u, l + r.lineHeight - h.descent), e.setTransform(1, 0, 0, 1, 0, 0), e.fillStyle = "rgba(0, 0, 0, 0)"
    }

    var mh = function () {
            function t(t, e, r) {
                var i = t.info[0], n = t.common[0], o = Ee(t.page[0].file), s = {};
                this._ownsTextures = r, this.font = i.face, this.size = i.size, this.lineHeight = n.lineHeight / o, this.chars = {}, this.pageTextures = s;
                for (var a = 0; a < t.page.length; a++) {
                    var h = t.page[a], u = h.id, l = h.file;
                    s[u] = e instanceof Array ? e[a] : e[l]
                }
                for (a = 0; a < t.char.length; a++) {
                    var c = t.char[a], d = (u = c.id, c.page), f = t.char[a], p = f.x, _ = f.y, m = f.width, v = f.height, y = f.xoffset, g = f.yoffset, E = f.xadvance;
                    _ /= o, m /= o, v /= o, y /= o, g /= o, E /= o;
                    var T = new Se((p /= o) + s[d].frame.x / o, _ + s[d].frame.y / o, m, v);
                    this.chars[u] = {xOffset: y, yOffset: g, xAdvance: E, kerning: {}, texture: new Ur(s[d].baseTexture, T), page: d}
                }
                for (a = 0; a < t.kerning.length; a++) {
                    var b = t.kerning[a], x = b.first, A = b.second, S = b.amount;
                    x /= o, A /= o, S /= o, this.chars[A] && (this.chars[A].kerning[x] = S)
                }
            }

            return t.prototype.destroy = function () {
                for (var t in this.chars) this.chars[t].texture.destroy(), this.chars[t].texture = null;
                for (var t in this.pageTextures) this._ownsTextures && this.pageTextures[t].destroy(!0), this.pageTextures[t] = null;
                this.chars = null, this.pageTextures = null
            }, t.install = function (e, r, i) {
                var n;
                if (e instanceof hh) n = e; else {
                    var o = fh(e);
                    if (!o) throw new Error("Unrecognized data format for font.");
                    n = o.parse(e)
                }
                r instanceof Ur && (r = [r]);
                var s = new t(n, r, i);
                return t.available[s.font] = s, s
            }, t.uninstall = function (e) {
                var r = t.available[e];
                if (!r) throw new Error("No font found named '" + e + "'");
                r.destroy(), delete t.available[e]
            }, t.from = function (e, r, i) {
                if (!e) throw new Error("[BitmapFont] Property `name` is required.");
                var n = Object.assign({}, t.defaultOptions, i), o = n.chars, s = n.padding, a = n.resolution, h = n.textureWidth, u = n.textureHeight, l = function (t) {
                    "string" == typeof t && (t = [t]);
                    for (var e = [], r = 0, i = t.length; r < i; r++) {
                        var n = t[r];
                        if (Array.isArray(n)) {
                            if (2 !== n.length) throw new Error("[BitmapFont]: Invalid character range length, expecting 2 got " + n.length + ".");
                            var o = n[0].charCodeAt(0), s = n[1].charCodeAt(0);
                            if (s < o) throw new Error("[BitmapFont]: Invalid character range.");
                            for (var a = o, h = s; a <= h; a++) e.push(String.fromCharCode(a))
                        } else e.push.apply(e, n.split(""))
                    }
                    if (0 === e.length) throw new Error("[BitmapFont]: Empty set when resolving characters.");
                    return e
                }(o), c = r instanceof va ? r : new va(r), d = h, f = new hh;
                f.info[0] = {face: c.fontFamily, size: c.fontSize}, f.common[0] = {lineHeight: c.fontSize};
                for (var p, _, m, v = 0, y = 0, g = 0, E = [], T = 0; T < l.length; T++) {
                    p || ((p = document.createElement("canvas")).width = h, p.height = u, _ = p.getContext("2d"), m = new Tr(p, {resolution: a}), E.push(new Ur(m)), f.page.push({
                        id: E.length - 1,
                        file: ""
                    }));
                    var b = Ta.measureText(l[T], c, !1, p), x = b.width, A = Math.ceil(b.height), S = Math.ceil(("italic" === c.fontStyle ? 2 : 1) * x);
                    if (y >= u - A * a) {
                        if (0 === y) throw new Error("[BitmapFont] textureHeight " + u + "px is too small for " + c.fontSize + "px fonts");
                        --T, p = null, _ = null, m = null, y = 0, v = 0, g = 0
                    } else if (g = Math.max(A + b.fontProperties.descent, g), S * a + v >= d) --T, y += g * a, y = Math.ceil(y), v = 0, g = 0; else {
                        _h(p, _, b, v, y, a, c);
                        var O = b.text.charCodeAt(0);
                        f.char.push({
                            id: O,
                            page: E.length - 1,
                            x: v / a,
                            y: y / a,
                            width: S,
                            height: A,
                            xoffset: 0,
                            yoffset: 0,
                            xadvance: Math.ceil(x - (c.dropShadow ? c.dropShadowDistance : 0) - (c.stroke ? c.strokeThickness : 0))
                        }), v += (S + 2 * s) * a, v = Math.ceil(v)
                    }
                }
                T = 0;
                for (var R = l.length; T < R; T++) for (var P = l[T], I = 0; I < R; I++) {
                    var M = l[I], w = _.measureText(P).width, D = _.measureText(M).width, C = _.measureText(P + M).width - (w + D);
                    C && f.kerning.push({first: P.charCodeAt(0), second: M.charCodeAt(0), amount: C})
                }
                var N = new t(f, E, !0);
                return void 0 !== t.available[e] && t.uninstall(e), t.available[e] = N, N
            }, t.ALPHA = [["a", "z"], ["A", "Z"], " "], t.NUMERIC = [["0", "9"]], t.ALPHANUMERIC = [["a", "z"], ["A", "Z"], ["0", "9"], " "], t.ASCII = [[" ", "~"]], t.defaultOptions = {
                resolution: 1,
                textureWidth: 512,
                textureHeight: 512,
                padding: 4,
                chars: t.ALPHANUMERIC
            }, t.available = {}, t
        }(), vh = [], yh = [], gh = function (t) {
            function e(r, i) {
                void 0 === i && (i = {});
                var n = t.call(this) || this;
                n._tint = 16777215;
                var o = Object.assign({}, e.styleDefaults, i), s = o.align, a = o.tint, h = o.maxWidth, u = o.letterSpacing, l = o.fontName, c = o.fontSize;
                if (!mh.available[l]) throw new Error('Missing BitmapFont "' + l + '"');
                return n._activePagesMeshData = [], n._textWidth = 0, n._textHeight = 0, n._align = s, n._tint = a, n._fontName = l, n._fontSize = c || mh.available[l].size, n._text = r, n._maxWidth = h, n._maxLineHeight = 0, n._letterSpacing = u, n._anchor = new we(function () {
                    n.dirty = !0
                }, n, 0, 0), n._roundPixels = B.ROUND_PIXELS, n.dirty = !0, n._textureCache = {}, n
            }

            return function (t, e) {
                function r() {
                    this.constructor = t
                }

                ah(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
            }(e, t), e.prototype.updateText = function () {
                for (var t, e = mh.available[this._fontName], r = this._fontSize / e.size, i = new Me, n = [], o = [], s = [], a = this._text.replace(/(?:\r\n|\r)/g, "\n") || " ", h = a.length, u = this._maxWidth * e.size / this._fontSize, l = null, c = 0, d = 0, f = 0, p = -1, _ = 0, m = 0, v = 0, y = 0, g = 0; g < h; g++) {
                    var E = a.charCodeAt(g), T = a.charAt(g);
                    if (/(?:\s)/.test(T) && (p = g, _ = c, y++), "\r" !== T && "\n" !== T) {
                        var b = e.chars[E];
                        if (b) {
                            l && b.kerning[l] && (i.x += b.kerning[l]);
                            var x = yh.pop() || {texture: Ur.EMPTY, line: 0, charCode: 0, prevSpaces: 0, position: new Me};
                            x.texture = b.texture, x.line = f, x.charCode = E, x.position.x = i.x + b.xOffset + this._letterSpacing / 2, x.position.y = i.y + b.yOffset, x.prevSpaces = y, n.push(x), i.x += b.xAdvance + this._letterSpacing, c = i.x, v = Math.max(v, b.yOffset + b.texture.height), l = E, -1 !== p && u > 0 && i.x > u && (ae(n, 1 + p - ++m, 1 + g - p), g = p, p = -1, o.push(_), s.push(n.length > 0 ? n[n.length - 1].prevSpaces : 0), d = Math.max(d, _), f++, i.x = 0, i.y += e.lineHeight, l = null, y = 0)
                        }
                    } else o.push(c), s.push(-1), d = Math.max(d, c), ++f, ++m, i.x = 0, i.y += e.lineHeight, l = null, y = 0
                }
                var A = a.charAt(a.length - 1);
                "\r" !== A && "\n" !== A && (/(?:\s)/.test(A) && (c = _), o.push(c), d = Math.max(d, c), s.push(-1));
                var S = [];
                for (g = 0; g <= f; g++) {
                    var O = 0;
                    "right" === this._align ? O = d - o[g] : "center" === this._align ? O = (d - o[g]) / 2 : "justify" === this._align && (O = s[g] < 0 ? 0 : (d - o[g]) / s[g]), S.push(O)
                }
                var R = n.length, P = {}, I = [], M = this._activePagesMeshData;
                for (g = 0; g < M.length; g++) vh.push(M[g]);
                for (g = 0; g < R; g++) {
                    var w = (X = n[g].texture).baseTexture.uid;
                    if (!P[w]) {
                        if (!(W = vh.pop())) {
                            var D = new sh, C = new oh(Ur.EMPTY);
                            W = {index: 0, indexCount: 0, vertexCount: 0, uvsCount: 0, total: 0, mesh: new rh(D, C), vertices: null, uvs: null, indices: null}
                        }
                        W.index = 0, W.indexCount = 0, W.vertexCount = 0, W.uvsCount = 0, W.total = 0;
                        var N = this._textureCache;
                        N[w] = N[w] || new Ur(X.baseTexture), W.mesh.texture = N[w], W.mesh.tint = this._tint, I.push(W), P[w] = W
                    }
                    P[w].total++
                }
                for (g = 0; g < M.length; g++) -1 === I.indexOf(M[g]) && this.removeChild(M[g].mesh);
                for (g = 0; g < I.length; g++) I[g].mesh.parent !== this && this.addChild(I[g].mesh);
                for (var g in this._activePagesMeshData = I, P) {
                    var L = (W = P[g]).total;
                    if (!((null === (t = W.indices) || void 0 === t ? void 0 : t.length) > 6 * L) || W.vertices.length < 2 * rh.BATCHABLE_SIZE) W.vertices = new Float32Array(8 * L), W.uvs = new Float32Array(8 * L), W.indices = new Uint16Array(6 * L); else for (var F = W.total, B = W.vertices, U = 4 * F * 2; U < B.length; U++) B[U] = 0;
                    W.mesh.size = 6 * L
                }
                for (g = 0; g < R; g++) {
                    var G = (T = n[g]).position.x + S[T.line] * ("justify" === this._align ? T.prevSpaces : 1);
                    this._roundPixels && (G = Math.round(G));
                    var X, k = G * r, j = T.position.y * r, H = P[(X = T.texture).baseTexture.uid], Y = X.frame, V = X._uvs, z = H.index++;
                    H.indices[6 * z + 0] = 0 + 4 * z, H.indices[6 * z + 1] = 1 + 4 * z, H.indices[6 * z + 2] = 2 + 4 * z, H.indices[6 * z + 3] = 0 + 4 * z, H.indices[6 * z + 4] = 2 + 4 * z, H.indices[6 * z + 5] = 3 + 4 * z, H.vertices[8 * z + 0] = k, H.vertices[8 * z + 1] = j, H.vertices[8 * z + 2] = k + Y.width * r, H.vertices[8 * z + 3] = j, H.vertices[8 * z + 4] = k + Y.width * r, H.vertices[8 * z + 5] = j + Y.height * r, H.vertices[8 * z + 6] = k, H.vertices[8 * z + 7] = j + Y.height * r, H.uvs[8 * z + 0] = V.x0, H.uvs[8 * z + 1] = V.y0, H.uvs[8 * z + 2] = V.x1, H.uvs[8 * z + 3] = V.y1, H.uvs[8 * z + 4] = V.x2, H.uvs[8 * z + 5] = V.y2, H.uvs[8 * z + 6] = V.x3, H.uvs[8 * z + 7] = V.y3
                }
                for (var g in this._textWidth = d * r, this._textHeight = (i.y + e.lineHeight) * r, P) {
                    var W = P[g];
                    if (0 !== this.anchor.x || 0 !== this.anchor.y) for (var q = 0, K = this._textWidth * this.anchor.x, Z = this._textHeight * this.anchor.y, J = 0; J < W.total; J++) W.vertices[q++] -= K, W.vertices[q++] -= Z, W.vertices[q++] -= K, W.vertices[q++] -= Z, W.vertices[q++] -= K, W.vertices[q++] -= Z, W.vertices[q++] -= K, W.vertices[q++] -= Z;
                    this._maxLineHeight = v * r;
                    var Q = W.mesh.geometry.getBuffer("aVertexPosition"), $ = W.mesh.geometry.getBuffer("aTextureCoord"), tt = W.mesh.geometry.getIndex();
                    Q.data = W.vertices, $.data = W.uvs, tt.data = W.indices, Q.update(), $.update(), tt.update()
                }
                for (g = 0; g < n.length; g++) yh.push(n[g])
            }, e.prototype.updateTransform = function () {
                this.validate(), this.containerUpdateTransform()
            }, e.prototype.getLocalBounds = function () {
                return this.validate(), t.prototype.getLocalBounds.call(this)
            }, e.prototype.validate = function () {
                this.dirty && (this.updateText(), this.dirty = !1)
            }, Object.defineProperty(e.prototype, "tint", {
                get: function () {
                    return this._tint
                }, set: function (t) {
                    if (this._tint !== t) {
                        this._tint = t;
                        for (var e = 0; e < this._activePagesMeshData.length; e++) this._activePagesMeshData[e].mesh.tint = t
                    }
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "align", {
                get: function () {
                    return this._align
                }, set: function (t) {
                    this._align !== t && (this._align = t, this.dirty = !0)
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "fontName", {
                get: function () {
                    return this._fontName
                }, set: function (t) {
                    if (!mh.available[t]) throw new Error('Missing BitmapFont "' + t + '"');
                    this._fontName !== t && (this._fontName = t, this.dirty = !0)
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "fontSize", {
                get: function () {
                    return this._fontSize
                }, set: function (t) {
                    this._fontSize !== t && (this._fontSize = t, this.dirty = !0)
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "anchor", {
                get: function () {
                    return this._anchor
                }, set: function (t) {
                    "number" == typeof t ? this._anchor.set(t) : this._anchor.copyFrom(t)
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "text", {
                get: function () {
                    return this._text
                }, set: function (t) {
                    t = String(null == t ? "" : t), this._text !== t && (this._text = t, this.dirty = !0)
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "maxWidth", {
                get: function () {
                    return this._maxWidth
                }, set: function (t) {
                    this._maxWidth !== t && (this._maxWidth = t, this.dirty = !0)
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "maxLineHeight", {
                get: function () {
                    return this.validate(), this._maxLineHeight
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "textWidth", {
                get: function () {
                    return this.validate(), this._textWidth
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "letterSpacing", {
                get: function () {
                    return this._letterSpacing
                }, set: function (t) {
                    this._letterSpacing !== t && (this._letterSpacing = t, this.dirty = !0)
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "roundPixels", {
                get: function () {
                    return this._roundPixels
                }, set: function (t) {
                    t !== this._roundPixels && (this._roundPixels = t, this.dirty = !0)
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "textHeight", {
                get: function () {
                    return this.validate(), this._textHeight
                }, enumerable: !1, configurable: !0
            }), e.prototype.destroy = function (e) {
                var r = this._textureCache;
                for (var i in r) r[i].destroy(), delete r[i];
                this._textureCache = null, t.prototype.destroy.call(this, e)
            }, e.styleDefaults = {align: "left", tint: 16777215, maxWidth: 0, letterSpacing: 0}, e
        }(qe), Eh = function () {
            function t() {
            }

            return t.add = function () {
                mo.setExtensionXhrType("fnt", mo.XHR_RESPONSE_TYPE.TEXT)
            }, t.use = function (e, r) {
                var i = fh(e.data);
                if (i) for (var n = t.getBaseUrl(this, e), o = i.parse(e.data), s = {}, a = function (t) {
                    s[t.metadata.pageFile] = t.texture, Object.keys(s).length === o.page.length && (e.bitmapFont = mh.install(o, s, !0), r())
                }, h = 0; h < o.page.length; ++h) {
                    var u = o.page[h].file, l = n + u, c = !1;
                    for (var d in this.resources) {
                        var f = this.resources[d];
                        if (f.url === l) {
                            f.metadata.pageFile = u, f.texture ? a(f) : f.onAfterMiddleware.add(a), c = !0;
                            break
                        }
                    }
                    if (!c) {
                        var p = {crossOrigin: e.crossOrigin, loadType: mo.LOAD_TYPE.IMAGE, metadata: Object.assign({pageFile: u}, e.metadata.imageMetadata), parentResource: e};
                        this.add(l, p, a)
                    }
                } else r()
            }, t.getBaseUrl = function (e, r) {
                var i = r.isDataUrl ? "" : t.dirname(r.url);
                return r.isDataUrl && ("." === i && (i = ""), e.baseUrl && i && "/" === e.baseUrl.charAt(e.baseUrl.length - 1) && (i += "/")), (i = i.replace(e.baseUrl, "")) && "/" !== i.charAt(i.length - 1) && (i += "/"), i
            }, t.dirname = function (t) {
                var e = t.replace(/\\/g, "/").replace(/\/$/, "").replace(/\/[^\/]*$/, "");
                return e === t ? "." : "" === e ? "/" : e
            }, t
        }(), Th = function (t, e) {
            return (Th = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
            })(t, e)
        },
        bh = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float uAlpha;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;\n}\n",
        xh = function (t) {
            function e(e) {
                void 0 === e && (e = 1);
                var r = t.call(this, xn, bh, {uAlpha: 1}) || this;
                return r.alpha = e, r
            }

            return function (t, e) {
                function r() {
                    this.constructor = t
                }

                Th(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
            }(e, t), Object.defineProperty(e.prototype, "alpha", {
                get: function () {
                    return this.uniforms.uAlpha
                }, set: function (t) {
                    this.uniforms.uAlpha = t
                }, enumerable: !1, configurable: !0
            }), e
        }(ji), Ah = function (t, e) {
            return (Ah = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
            })(t, e)
        };

    function Sh(t, e) {
        function r() {
            this.constructor = t
        }

        Ah(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
    }

    var Oh, Rh, Ph, Ih, Mh, wh, Dh, Ch, Nh, Lh, Fh, Bh, Uh, Gh, Xh, kh, jh,
        Hh = "\n    attribute vec2 aVertexPosition;\n\n    uniform mat3 projectionMatrix;\n\n    uniform float strength;\n\n    varying vec2 vBlurTexCoords[%size%];\n\n    uniform vec4 inputSize;\n    uniform vec4 outputFrame;\n\n    vec4 filterVertexPosition( void )\n    {\n        vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n        return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n    }\n\n    vec2 filterTextureCoord( void )\n    {\n        return aVertexPosition * (outputFrame.zw * inputSize.zw);\n    }\n\n    void main(void)\n    {\n        gl_Position = filterVertexPosition();\n\n        vec2 textureCoord = filterTextureCoord();\n        %blur%\n    }",
        Yh = {
            5: [.153388, .221461, .250301],
            7: [.071303, .131514, .189879, .214607],
            9: [.028532, .067234, .124009, .179044, .20236],
            11: [.0093, .028002, .065984, .121703, .175713, .198596],
            13: [.002406, .009255, .027867, .065666, .121117, .174868, .197641],
            15: [489e-6, .002403, .009246, .02784, .065602, .120999, .174697, .197448]
        }, Vh = ["varying vec2 vBlurTexCoords[%size%];", "uniform sampler2D uSampler;", "void main(void)", "{", "    gl_FragColor = vec4(0.0);", "    %blur%", "}"].join("\n");
    !function (t) {
        t[t.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", t[t.WEBGL = 1] = "WEBGL", t[t.WEBGL2 = 2] = "WEBGL2"
    }(Oh || (Oh = {})), function (t) {
        t[t.UNKNOWN = 0] = "UNKNOWN", t[t.WEBGL = 1] = "WEBGL", t[t.CANVAS = 2] = "CANVAS"
    }(Rh || (Rh = {})), function (t) {
        t[t.COLOR = 16384] = "COLOR", t[t.DEPTH = 256] = "DEPTH", t[t.STENCIL = 1024] = "STENCIL"
    }(Ph || (Ph = {})), function (t) {
        t[t.NORMAL = 0] = "NORMAL", t[t.ADD = 1] = "ADD", t[t.MULTIPLY = 2] = "MULTIPLY", t[t.SCREEN = 3] = "SCREEN", t[t.OVERLAY = 4] = "OVERLAY", t[t.DARKEN = 5] = "DARKEN", t[t.LIGHTEN = 6] = "LIGHTEN", t[t.COLOR_DODGE = 7] = "COLOR_DODGE", t[t.COLOR_BURN = 8] = "COLOR_BURN", t[t.HARD_LIGHT = 9] = "HARD_LIGHT", t[t.SOFT_LIGHT = 10] = "SOFT_LIGHT", t[t.DIFFERENCE = 11] = "DIFFERENCE", t[t.EXCLUSION = 12] = "EXCLUSION", t[t.HUE = 13] = "HUE", t[t.SATURATION = 14] = "SATURATION", t[t.COLOR = 15] = "COLOR", t[t.LUMINOSITY = 16] = "LUMINOSITY", t[t.NORMAL_NPM = 17] = "NORMAL_NPM", t[t.ADD_NPM = 18] = "ADD_NPM", t[t.SCREEN_NPM = 19] = "SCREEN_NPM", t[t.NONE = 20] = "NONE", t[t.SRC_OVER = 0] = "SRC_OVER", t[t.SRC_IN = 21] = "SRC_IN", t[t.SRC_OUT = 22] = "SRC_OUT", t[t.SRC_ATOP = 23] = "SRC_ATOP", t[t.DST_OVER = 24] = "DST_OVER", t[t.DST_IN = 25] = "DST_IN", t[t.DST_OUT = 26] = "DST_OUT", t[t.DST_ATOP = 27] = "DST_ATOP", t[t.ERASE = 26] = "ERASE", t[t.SUBTRACT = 28] = "SUBTRACT", t[t.XOR = 29] = "XOR"
    }(Ih || (Ih = {})), function (t) {
        t[t.POINTS = 0] = "POINTS", t[t.LINES = 1] = "LINES", t[t.LINE_LOOP = 2] = "LINE_LOOP", t[t.LINE_STRIP = 3] = "LINE_STRIP", t[t.TRIANGLES = 4] = "TRIANGLES", t[t.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", t[t.TRIANGLE_FAN = 6] = "TRIANGLE_FAN"
    }(Mh || (Mh = {})), function (t) {
        t[t.RGBA = 6408] = "RGBA", t[t.RGB = 6407] = "RGB", t[t.ALPHA = 6406] = "ALPHA", t[t.LUMINANCE = 6409] = "LUMINANCE", t[t.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", t[t.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", t[t.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL"
    }(wh || (wh = {})), function (t) {
        t[t.TEXTURE_2D = 3553] = "TEXTURE_2D", t[t.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", t[t.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", t[t.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", t[t.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", t[t.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", t[t.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z"
    }(Dh || (Dh = {})), function (t) {
        t[t.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", t[t.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", t[t.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", t[t.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", t[t.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", t[t.FLOAT = 5126] = "FLOAT", t[t.HALF_FLOAT = 36193] = "HALF_FLOAT"
    }(Ch || (Ch = {})), function (t) {
        t[t.NEAREST = 0] = "NEAREST", t[t.LINEAR = 1] = "LINEAR"
    }(Nh || (Nh = {})), function (t) {
        t[t.CLAMP = 33071] = "CLAMP", t[t.REPEAT = 10497] = "REPEAT", t[t.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT"
    }(Lh || (Lh = {})), function (t) {
        t[t.OFF = 0] = "OFF", t[t.POW2 = 1] = "POW2", t[t.ON = 2] = "ON", t[t.ON_MANUAL = 3] = "ON_MANUAL"
    }(Fh || (Fh = {})), function (t) {
        t[t.NPM = 0] = "NPM", t[t.UNPACK = 1] = "UNPACK", t[t.PMA = 2] = "PMA", t[t.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", t[t.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", t[t.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA"
    }(Bh || (Bh = {})), function (t) {
        t[t.NO = 0] = "NO", t[t.YES = 1] = "YES", t[t.AUTO = 2] = "AUTO", t[t.BLEND = 0] = "BLEND", t[t.CLEAR = 1] = "CLEAR", t[t.BLIT = 2] = "BLIT"
    }(Uh || (Uh = {})), function (t) {
        t[t.AUTO = 0] = "AUTO", t[t.MANUAL = 1] = "MANUAL"
    }(Gh || (Gh = {})), function (t) {
        t.LOW = "lowp", t.MEDIUM = "mediump", t.HIGH = "highp"
    }(Xh || (Xh = {})), function (t) {
        t[t.NONE = 0] = "NONE", t[t.SCISSOR = 1] = "SCISSOR", t[t.STENCIL = 2] = "STENCIL", t[t.SPRITE = 3] = "SPRITE"
    }(kh || (kh = {})), function (t) {
        t[t.NONE = 0] = "NONE", t[t.LOW = 2] = "LOW", t[t.MEDIUM = 4] = "MEDIUM", t[t.HIGH = 8] = "HIGH"
    }(jh || (jh = {}));
    var zh = function (t) {
            function e(e, r, i, n, o) {
                void 0 === r && (r = 8), void 0 === i && (i = 4), void 0 === n && (n = B.FILTER_RESOLUTION), void 0 === o && (o = 5);
                var s = this, a = function (t, e) {
                    var r, i = Math.ceil(t / 2), n = Hh, o = "";
                    r = e ? "vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * strength, 0.0);" : "vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * strength);";
                    for (var s = 0; s < t; s++) {
                        var a = r.replace("%index%", s.toString());
                        o += a = a.replace("%sampleIndex%", s - (i - 1) + ".0"), o += "\n"
                    }
                    return (n = n.replace("%blur%", o)).replace("%size%", t.toString())
                }(o, e), h = function (t) {
                    for (var e, r = Yh[t], i = r.length, n = Vh, o = "", s = 0; s < t; s++) {
                        var a = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;".replace("%index%", s.toString());
                        e = s, s >= i && (e = t - s - 1), o += a = a.replace("%value%", r[e].toString()), o += "\n"
                    }
                    return (n = n.replace("%blur%", o)).replace("%size%", t.toString())
                }(o);
                return (s = t.call(this, a, h) || this).horizontal = e, s.resolution = n, s._quality = 0, s.quality = i, s.blur = r, s
            }

            return Sh(e, t), e.prototype.apply = function (t, e, r, i) {
                if (r ? this.horizontal ? this.uniforms.strength = 1 / r.width * (r.width / e.width) : this.uniforms.strength = 1 / r.height * (r.height / e.height) : this.horizontal ? this.uniforms.strength = 1 / t.renderer.width * (t.renderer.width / e.width) : this.uniforms.strength = 1 / t.renderer.height * (t.renderer.height / e.height), this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, 1 === this.passes) t.applyFilter(this, e, r, i); else {
                    var n = t.getFilterTexture(), o = t.renderer, s = e, a = n;
                    this.state.blend = !1, t.applyFilter(this, s, a, Uh.CLEAR);
                    for (var h = 1; h < this.passes - 1; h++) {
                        t.bindAndClear(s, Uh.BLIT), this.uniforms.uSampler = a;
                        var u = a;
                        a = s, s = u, o.shader.bind(this), o.geometry.draw(5)
                    }
                    this.state.blend = !0, t.applyFilter(this, a, r, i), t.returnFilterTexture(n)
                }
            }, Object.defineProperty(e.prototype, "blur", {
                get: function () {
                    return this.strength
                }, set: function (t) {
                    this.padding = 1 + 2 * Math.abs(t), this.strength = t
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "quality", {
                get: function () {
                    return this._quality
                }, set: function (t) {
                    this._quality = t, this.passes = t
                }, enumerable: !1, configurable: !0
            }), e
        }(ji), Wh = function (t) {
            function e(e, r, i, n) {
                void 0 === e && (e = 8), void 0 === r && (r = 4), void 0 === i && (i = B.FILTER_RESOLUTION), void 0 === n && (n = 5);
                var o = t.call(this) || this;
                return o.blurXFilter = new zh(!0, e, r, i, n), o.blurYFilter = new zh(!1, e, r, i, n), o.resolution = i, o.quality = r, o.blur = e, o.repeatEdgePixels = !1, o
            }

            return Sh(e, t), e.prototype.apply = function (t, e, r, i) {
                var n = Math.abs(this.blurXFilter.strength), o = Math.abs(this.blurYFilter.strength);
                if (n && o) {
                    var s = t.getFilterTexture();
                    this.blurXFilter.apply(t, e, s, Uh.CLEAR), this.blurYFilter.apply(t, s, r, i), t.returnFilterTexture(s)
                } else o ? this.blurYFilter.apply(t, e, r, i) : this.blurXFilter.apply(t, e, r, i)
            }, e.prototype.updatePadding = function () {
                this._repeatEdgePixels ? this.padding = 0 : this.padding = 2 * Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength))
            }, Object.defineProperty(e.prototype, "blur", {
                get: function () {
                    return this.blurXFilter.blur
                }, set: function (t) {
                    this.blurXFilter.blur = this.blurYFilter.blur = t, this.updatePadding()
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "quality", {
                get: function () {
                    return this.blurXFilter.quality
                }, set: function (t) {
                    this.blurXFilter.quality = this.blurYFilter.quality = t
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "blurX", {
                get: function () {
                    return this.blurXFilter.blur
                }, set: function (t) {
                    this.blurXFilter.blur = t, this.updatePadding()
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "blurY", {
                get: function () {
                    return this.blurYFilter.blur
                }, set: function (t) {
                    this.blurYFilter.blur = t, this.updatePadding()
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "blendMode", {
                get: function () {
                    return this.blurYFilter.blendMode
                }, set: function (t) {
                    this.blurYFilter.blendMode = t
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "repeatEdgePixels", {
                get: function () {
                    return this._repeatEdgePixels
                }, set: function (t) {
                    this._repeatEdgePixels = t, this.updatePadding()
                }, enumerable: !1, configurable: !0
            }), e
        }(ji), qh = function (t, e) {
            return (qh = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
            })(t, e)
        },
        Kh = "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[20];\nuniform float uAlpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (uAlpha == 0.0) {\n        gl_FragColor = c;\n        return;\n    }\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (c.a > 0.0) {\n      c.rgb /= c.a;\n    }\n\n    vec4 result;\n\n    result.r = (m[0] * c.r);\n        result.r += (m[1] * c.g);\n        result.r += (m[2] * c.b);\n        result.r += (m[3] * c.a);\n        result.r += m[4];\n\n    result.g = (m[5] * c.r);\n        result.g += (m[6] * c.g);\n        result.g += (m[7] * c.b);\n        result.g += (m[8] * c.a);\n        result.g += m[9];\n\n    result.b = (m[10] * c.r);\n       result.b += (m[11] * c.g);\n       result.b += (m[12] * c.b);\n       result.b += (m[13] * c.a);\n       result.b += m[14];\n\n    result.a = (m[15] * c.r);\n       result.a += (m[16] * c.g);\n       result.a += (m[17] * c.b);\n       result.a += (m[18] * c.a);\n       result.a += m[19];\n\n    vec3 rgb = mix(c.rgb, result.rgb, uAlpha);\n\n    // Premultiply alpha again.\n    rgb *= result.a;\n\n    gl_FragColor = vec4(rgb, result.a);\n}\n",
        Zh = function (t) {
            function e() {
                var e = this, r = {m: new Float32Array([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]), uAlpha: 1};
                return (e = t.call(this, An, Kh, r) || this).alpha = 1, e
            }

            return function (t, e) {
                function r() {
                    this.constructor = t
                }

                qh(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
            }(e, t), e.prototype._loadMatrix = function (t, e) {
                void 0 === e && (e = !1);
                var r = t;
                e && (this._multiply(r, this.uniforms.m, t), r = this._colorMatrix(r)), this.uniforms.m = r
            }, e.prototype._multiply = function (t, e, r) {
                return t[0] = e[0] * r[0] + e[1] * r[5] + e[2] * r[10] + e[3] * r[15], t[1] = e[0] * r[1] + e[1] * r[6] + e[2] * r[11] + e[3] * r[16], t[2] = e[0] * r[2] + e[1] * r[7] + e[2] * r[12] + e[3] * r[17], t[3] = e[0] * r[3] + e[1] * r[8] + e[2] * r[13] + e[3] * r[18], t[4] = e[0] * r[4] + e[1] * r[9] + e[2] * r[14] + e[3] * r[19] + e[4], t[5] = e[5] * r[0] + e[6] * r[5] + e[7] * r[10] + e[8] * r[15], t[6] = e[5] * r[1] + e[6] * r[6] + e[7] * r[11] + e[8] * r[16], t[7] = e[5] * r[2] + e[6] * r[7] + e[7] * r[12] + e[8] * r[17], t[8] = e[5] * r[3] + e[6] * r[8] + e[7] * r[13] + e[8] * r[18], t[9] = e[5] * r[4] + e[6] * r[9] + e[7] * r[14] + e[8] * r[19] + e[9], t[10] = e[10] * r[0] + e[11] * r[5] + e[12] * r[10] + e[13] * r[15], t[11] = e[10] * r[1] + e[11] * r[6] + e[12] * r[11] + e[13] * r[16], t[12] = e[10] * r[2] + e[11] * r[7] + e[12] * r[12] + e[13] * r[17], t[13] = e[10] * r[3] + e[11] * r[8] + e[12] * r[13] + e[13] * r[18], t[14] = e[10] * r[4] + e[11] * r[9] + e[12] * r[14] + e[13] * r[19] + e[14], t[15] = e[15] * r[0] + e[16] * r[5] + e[17] * r[10] + e[18] * r[15], t[16] = e[15] * r[1] + e[16] * r[6] + e[17] * r[11] + e[18] * r[16], t[17] = e[15] * r[2] + e[16] * r[7] + e[17] * r[12] + e[18] * r[17], t[18] = e[15] * r[3] + e[16] * r[8] + e[17] * r[13] + e[18] * r[18], t[19] = e[15] * r[4] + e[16] * r[9] + e[17] * r[14] + e[18] * r[19] + e[19], t
            }, e.prototype._colorMatrix = function (t) {
                var e = new Float32Array(t);
                return e[4] /= 255, e[9] /= 255, e[14] /= 255, e[19] /= 255, e
            }, e.prototype.brightness = function (t, e) {
                var r = [t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(r, e)
            }, e.prototype.greyscale = function (t, e) {
                var r = [t, t, t, 0, 0, t, t, t, 0, 0, t, t, t, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(r, e)
            }, e.prototype.blackAndWhite = function (t) {
                this._loadMatrix([.3, .6, .1, 0, 0, .3, .6, .1, 0, 0, .3, .6, .1, 0, 0, 0, 0, 0, 1, 0], t)
            }, e.prototype.hue = function (t, e) {
                t = (t || 0) / 180 * Math.PI;
                var r = Math.cos(t), i = Math.sin(t), n = 1 / 3, o = (0, Math.sqrt)(n),
                    s = [r + (1 - r) * n, n * (1 - r) - o * i, n * (1 - r) + o * i, 0, 0, n * (1 - r) + o * i, r + n * (1 - r), n * (1 - r) - o * i, 0, 0, n * (1 - r) - o * i, n * (1 - r) + o * i, r + n * (1 - r), 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(s, e)
            }, e.prototype.contrast = function (t, e) {
                var r = (t || 0) + 1, i = -.5 * (r - 1), n = [r, 0, 0, 0, i, 0, r, 0, 0, i, 0, 0, r, 0, i, 0, 0, 0, 1, 0];
                this._loadMatrix(n, e)
            }, e.prototype.saturate = function (t, e) {
                void 0 === t && (t = 0);
                var r = 2 * t / 3 + 1, i = -.5 * (r - 1), n = [r, i, i, 0, 0, i, r, i, 0, 0, i, i, r, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(n, e)
            }, e.prototype.desaturate = function () {
                this.saturate(-1)
            }, e.prototype.negative = function (t) {
                this._loadMatrix([-1, 0, 0, 1, 0, 0, -1, 0, 1, 0, 0, 0, -1, 1, 0, 0, 0, 0, 1, 0], t)
            }, e.prototype.sepia = function (t) {
                this._loadMatrix([.393, .7689999, .18899999, 0, 0, .349, .6859999, .16799999, 0, 0, .272, .5339999, .13099999, 0, 0, 0, 0, 0, 1, 0], t)
            }, e.prototype.technicolor = function (t) {
                this._loadMatrix([1.9125277891456083, -.8545344976951645, -.09155508482755585, 0, 11.793603434377337, -.3087833385928097, 1.7658908555458428, -.10601743074722245, 0, -70.35205161461398, -.231103377548616, -.7501899197440212, 1.847597816108189, 0, 30.950940869491138, 0, 0, 0, 1, 0], t)
            }, e.prototype.polaroid = function (t) {
                this._loadMatrix([1.438, -.062, -.062, 0, 0, -.122, 1.378, -.122, 0, 0, -.016, -.016, 1.483, 0, 0, 0, 0, 0, 1, 0], t)
            }, e.prototype.toBGR = function (t) {
                this._loadMatrix([0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0], t)
            }, e.prototype.kodachrome = function (t) {
                this._loadMatrix([1.1285582396593525, -.3967382283601348, -.03992559172921793, 0, 63.72958762196502, -.16404339962244616, 1.0835251566291304, -.05498805115633132, 0, 24.732407896706203, -.16786010706155763, -.5603416277695248, 1.6014850761964943, 0, 35.62982807460946, 0, 0, 0, 1, 0], t)
            }, e.prototype.browni = function (t) {
                this._loadMatrix([.5997023498159715, .34553243048391263, -.2708298674538042, 0, 47.43192855600873, -.037703249837783157, .8609577587992641, .15059552388459913, 0, -36.96841498319127, .24113635128153335, -.07441037908422492, .44972182064877153, 0, -7.562075277591283, 0, 0, 0, 1, 0], t)
            }, e.prototype.vintage = function (t) {
                this._loadMatrix([.6279345635605994, .3202183420819367, -.03965408211312453, 0, 9.651285835294123, .02578397704808868, .6441188644374771, .03259127616149294, 0, 7.462829176470591, .0466055556782719, -.0851232987247891, .5241648018700465, 0, 5.159190588235296, 0, 0, 0, 1, 0], t)
            }, e.prototype.colorTone = function (t, e, r, i, n) {
                var o = ((r = r || 16770432) >> 16 & 255) / 255, s = (r >> 8 & 255) / 255, a = (255 & r) / 255, h = ((i = i || 3375104) >> 16 & 255) / 255,
                    u = (i >> 8 & 255) / 255, l = (255 & i) / 255, c = [.3, .59, .11, 0, 0, o, s, a, t = t || .2, 0, h, u, l, e = e || .15, 0, o - h, s - u, a - l, 0, 0];
                this._loadMatrix(c, n)
            }, e.prototype.night = function (t, e) {
                var r = [-2 * (t = t || .1), -t, 0, 0, 0, -t, 0, t, 0, 0, 0, t, 2 * t, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(r, e)
            }, e.prototype.predator = function (t, e) {
                var r = [11.224130630493164 * t, -4.794486999511719 * t, -2.8746118545532227 * t, 0 * t, .40342438220977783 * t, -3.6330697536468506 * t, 9.193157196044922 * t, -2.951810836791992 * t, 0 * t, -1.316135048866272 * t, -3.2184197902679443 * t, -4.2375030517578125 * t, 7.476448059082031 * t, 0 * t, .8044459223747253 * t, 0, 0, 0, 1, 0];
                this._loadMatrix(r, e)
            }, e.prototype.lsd = function (t) {
                this._loadMatrix([2, -.4, .5, 0, 0, -.5, 2, -.4, 0, 0, -.4, -.5, 3, 0, 0, 0, 0, 0, 1, 0], t)
            }, e.prototype.reset = function () {
                this._loadMatrix([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0], !1)
            }, Object.defineProperty(e.prototype, "matrix", {
                get: function () {
                    return this.uniforms.m
                }, set: function (t) {
                    this.uniforms.m = t
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "alpha", {
                get: function () {
                    return this.uniforms.uAlpha
                }, set: function (t) {
                    this.uniforms.uAlpha = t
                }, enumerable: !1, configurable: !0
            }), e
        }(ji);
    Zh.prototype.grayscale = Zh.prototype.greyscale;
    var Jh = function (t, e) {
            return (Jh = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
            })(t, e)
        },
        Qh = "varying vec2 vFilterCoord;\nvarying vec2 vTextureCoord;\n\nuniform vec2 scale;\nuniform mat2 rotation;\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nuniform highp vec4 inputSize;\nuniform vec4 inputClamp;\n\nvoid main(void)\n{\n  vec4 map =  texture2D(mapSampler, vFilterCoord);\n\n  map -= 0.5;\n  map.xy = scale * inputSize.zw * (rotation * map.xy);\n\n  gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), inputClamp.xy, inputClamp.zw));\n}\n",
        $h = "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\nuniform mat3 filterMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n\tgl_Position = filterVertexPosition();\n\tvTextureCoord = filterTextureCoord();\n\tvFilterCoord = ( filterMatrix * vec3( vTextureCoord, 1.0)  ).xy;\n}\n",
        tu = function (t) {
            function e(e, r) {
                var i = this, n = new De;
                return e.renderable = !1, (i = t.call(this, $h, Qh, {
                    mapSampler: e._texture,
                    filterMatrix: n,
                    scale: {x: 1, y: 1},
                    rotation: new Float32Array([1, 0, 0, 1])
                }) || this).maskSprite = e, i.maskMatrix = n, null == r && (r = 20), i.scale = new Me(r, r), i
            }

            return function (t, e) {
                function r() {
                    this.constructor = t
                }

                Jh(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
            }(e, t), e.prototype.apply = function (t, e, r, i) {
                this.uniforms.filterMatrix = t.calculateSpriteMatrix(this.maskMatrix, this.maskSprite), this.uniforms.scale.x = this.scale.x, this.uniforms.scale.y = this.scale.y;
                var n = this.maskSprite.worldTransform, o = Math.sqrt(n.a * n.a + n.b * n.b), s = Math.sqrt(n.c * n.c + n.d * n.d);
                0 !== o && 0 !== s && (this.uniforms.rotation[0] = n.a / o, this.uniforms.rotation[1] = n.b / o, this.uniforms.rotation[2] = n.c / s, this.uniforms.rotation[3] = n.d / s), t.applyFilter(this, e, r, i)
            }, Object.defineProperty(e.prototype, "map", {
                get: function () {
                    return this.uniforms.mapSampler
                }, set: function (t) {
                    this.uniforms.mapSampler = t
                }, enumerable: !1, configurable: !0
            }), e
        }(ji), eu = function (t, e) {
            return (eu = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
            })(t, e)
        },
        ru = "\nattribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vFragCoord;\n\nuniform vec4 inputPixel;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvoid texcoords(vec2 fragCoord, vec2 inverseVP,\n               out vec2 v_rgbNW, out vec2 v_rgbNE,\n               out vec2 v_rgbSW, out vec2 v_rgbSE,\n               out vec2 v_rgbM) {\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void) {\n\n   gl_Position = filterVertexPosition();\n\n   vFragCoord = aVertexPosition * outputFrame.zw;\n\n   texcoords(vFragCoord, inputPixel.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}\n",
        iu = 'varying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vFragCoord;\nuniform sampler2D uSampler;\nuniform highp vec4 inputPixel;\n\n\n/**\n Basic FXAA implementation based on the code on geeks3d.com with the\n modification that the texture2DLod stuff was removed since it\'s\n unsupported by WebGL.\n\n --\n\n From:\n https://github.com/mitsuhiko/webgl-meincraft\n\n Copyright (c) 2011 by Armin Ronacher.\n\n Some rights reserved.\n\n Redistribution and use in source and binary forms, with or without\n modification, are permitted provided that the following conditions are\n met:\n\n * Redistributions of source code must retain the above copyright\n notice, this list of conditions and the following disclaimer.\n\n * Redistributions in binary form must reproduce the above\n copyright notice, this list of conditions and the following\n disclaimer in the documentation and/or other materials provided\n with the distribution.\n\n * The names of the contributors may not be used to endorse or\n promote products derived from this software without specific\n prior written permission.\n\n THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\n OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n */\n\n#ifndef FXAA_REDUCE_MIN\n#define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n#define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n#define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 inverseVP,\n          vec2 v_rgbNW, vec2 v_rgbNE,\n          vec2 v_rgbSW, vec2 v_rgbSE,\n          vec2 v_rgbM) {\n    vec4 color;\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n\n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n                  dir * rcpDirMin)) * inverseVP;\n\n    vec3 rgbA = 0.5 * (\n                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\nvoid main() {\n\n      vec4 color;\n\n      color = fxaa(uSampler, vFragCoord, inputPixel.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n      gl_FragColor = color;\n}\n',
        nu = function (t) {
            function e() {
                return t.call(this, ru, iu) || this
            }

            return function (t, e) {
                function r() {
                    this.constructor = t
                }

                eu(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
            }(e, t), e
        }(ji), ou = function (t, e) {
            return (ou = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
            })(t, e)
        },
        su = "precision highp float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float uNoise;\nuniform float uSeed;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float randomValue = rand(gl_FragCoord.xy * uSeed);\n    float diff = (randomValue - 0.5) * uNoise;\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n    }\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    // Premultiply alpha again.\n    color.rgb *= color.a;\n\n    gl_FragColor = color;\n}\n",
        au = function (t) {
            function e(e, r) {
                void 0 === e && (e = .5), void 0 === r && (r = Math.random());
                var i = t.call(this, An, su, {uNoise: 0, uSeed: 0}) || this;
                return i.noise = e, i.seed = r, i
            }

            return function (t, e) {
                function r() {
                    this.constructor = t
                }

                ou(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
            }(e, t), Object.defineProperty(e.prototype, "noise", {
                get: function () {
                    return this.uniforms.uNoise
                }, set: function (t) {
                    this.uniforms.uNoise = t
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "seed", {
                get: function () {
                    return this.uniforms.uSeed
                }, set: function (t) {
                    this.uniforms.uSeed = t
                }, enumerable: !1, configurable: !0
            }), e
        }(ji), hu = new De;
    Ve.prototype._cacheAsBitmap = !1, Ve.prototype._cacheData = null, Ve.prototype._cacheAsBitmapResolution = null;
    var uu = function () {
        this.textureCacheId = null, this.originalRender = null, this.originalRenderCanvas = null, this.originalCalculateBounds = null, this.originalGetLocalBounds = null, this.originalUpdateTransform = null, this.originalDestroy = null, this.originalMask = null, this.originalFilterArea = null, this.originalContainsPoint = null, this.sprite = null
    };
    Object.defineProperties(Ve.prototype, {
        cacheAsBitmapResolution: {
            get: function () {
                return this._cacheAsBitmapResolution
            }, set: function (t) {
                t !== this._cacheAsBitmapResolution && (this._cacheAsBitmapResolution = t, this.cacheAsBitmap && (this.cacheAsBitmap = !1, this.cacheAsBitmap = !0))
            }
        }, cacheAsBitmap: {
            get: function () {
                return this._cacheAsBitmap
            }, set: function (t) {
                var e;
                this._cacheAsBitmap !== t && (this._cacheAsBitmap = t, t ? (this._cacheData || (this._cacheData = new uu), (e = this._cacheData).originalRender = this.render, e.originalRenderCanvas = this.renderCanvas, e.originalUpdateTransform = this.updateTransform, e.originalCalculateBounds = this.calculateBounds, e.originalGetLocalBounds = this.getLocalBounds, e.originalDestroy = this.destroy, e.originalContainsPoint = this.containsPoint, e.originalMask = this._mask, e.originalFilterArea = this.filterArea, this.render = this._renderCached, this.renderCanvas = this._renderCachedCanvas, this.destroy = this._cacheAsBitmapDestroy) : ((e = this._cacheData).sprite && this._destroyCachedDisplayObject(), this.render = e.originalRender, this.renderCanvas = e.originalRenderCanvas, this.calculateBounds = e.originalCalculateBounds, this.getLocalBounds = e.originalGetLocalBounds, this.destroy = e.originalDestroy, this.updateTransform = e.originalUpdateTransform, this.containsPoint = e.originalContainsPoint, this._mask = e.originalMask, this.filterArea = e.originalFilterArea))
            }
        }
    }), Ve.prototype._renderCached = function (t) {
        !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObject(t), this._cacheData.sprite.transform._worldID = this.transform._worldID, this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._render(t))
    }, Ve.prototype._initCachedDisplayObject = function (t) {
        if (!this._cacheData || !this._cacheData.sprite) {
            var e = this.alpha;
            this.alpha = 1, t.batch.flush();
            var r = this.getLocalBounds(null, !0).clone();
            if (this.filters) {
                var i = this.filters[0].padding;
                r.pad(i)
            }
            r.ceil(B.RESOLUTION);
            var n = t.renderTexture.current, o = t.renderTexture.sourceFrame.clone(), s = t.renderTexture.destinationFrame.clone(), a = t.projection.transform,
                h = Xr.create({width: r.width, height: r.height, resolution: this.cacheAsBitmapResolution || t.resolution}), u = "cacheAsBitmap_" + le();
            this._cacheData.textureCacheId = u, Tr.addToCache(h.baseTexture, u), Ur.addToCache(h, u);
            var l = this.transform.localTransform.copyTo(hu).invert().translate(-r.x, -r.y);
            this.render = this._cacheData.originalRender, t.render(this, {
                renderTexture: h,
                clear: !0,
                transform: l,
                skipUpdateTransform: !1
            }), t.projection.transform = a, t.renderTexture.bind(n, o, s), this.render = this._renderCached, this.updateTransform = this.displayObjectUpdateTransform, this.calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._mask = null, this.filterArea = null;
            var c = new fa(h);
            c.transform.worldTransform = this.transform.worldTransform, c.anchor.x = -r.x / r.width, c.anchor.y = -r.y / r.height, c.alpha = e, c._bounds = this._bounds, this._cacheData.sprite = c, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.enableTempParent(), this.updateTransform(), this.disableTempParent(null)), this.containsPoint = c.containsPoint.bind(c)
        }
    }, Ve.prototype._renderCachedCanvas = function (t) {
        !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObjectCanvas(t), this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._renderCanvas(t))
    }, Ve.prototype._initCachedDisplayObjectCanvas = function (t) {
        if (!this._cacheData || !this._cacheData.sprite) {
            var e = this.getLocalBounds(null, !0), r = this.alpha;
            this.alpha = 1;
            var i = t.context, n = t._projTransform;
            e.ceil(B.RESOLUTION);
            var o = Xr.create({width: e.width, height: e.height}), s = "cacheAsBitmap_" + le();
            this._cacheData.textureCacheId = s, Tr.addToCache(o.baseTexture, s), Ur.addToCache(o, s);
            var a = hu;
            this.transform.localTransform.copyTo(a), a.invert(), a.tx -= e.x, a.ty -= e.y, this.renderCanvas = this._cacheData.originalRenderCanvas, t.render(this, {
                renderTexture: o,
                clear: !0,
                transform: a,
                skipUpdateTransform: !1
            }), t.context = i, t._projTransform = n, this.renderCanvas = this._renderCachedCanvas, this.updateTransform = this.displayObjectUpdateTransform, this.calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._mask = null, this.filterArea = null;
            var h = new fa(o);
            h.transform.worldTransform = this.transform.worldTransform, h.anchor.x = -e.x / e.width, h.anchor.y = -e.y / e.height, h.alpha = r, h._bounds = this._bounds, this._cacheData.sprite = h, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.parent = t._tempDisplayObjectParent, this.updateTransform(), this.parent = null), this.containsPoint = h.containsPoint.bind(h)
        }
    }, Ve.prototype._calculateCachedBounds = function () {
        this._bounds.clear(), this._cacheData.sprite.transform._worldID = this.transform._worldID, this._cacheData.sprite._calculateBounds(), this._bounds.updateID = this._boundsID
    }, Ve.prototype._getCachedLocalBounds = function () {
        return this._cacheData.sprite.getLocalBounds(null)
    }, Ve.prototype._destroyCachedDisplayObject = function () {
        this._cacheData.sprite._texture.destroy(!0), this._cacheData.sprite = null, Tr.removeFromCache(this._cacheData.textureCacheId), Ur.removeFromCache(this._cacheData.textureCacheId), this._cacheData.textureCacheId = null
    }, Ve.prototype._cacheAsBitmapDestroy = function (t) {
        this.cacheAsBitmap = !1, this.destroy(t)
    }, Ve.prototype.name = null, qe.prototype.getChildByName = function (t, e) {
        for (var r = 0, i = this.children.length; r < i; r++) if (this.children[r].name === t) return this.children[r];
        if (e) for (r = 0, i = this.children.length; r < i; r++) if (this.children[r].getChildByName) {
            var n = this.children[r].getChildByName(t, !0);
            if (n) return n
        }
        return null
    }, Ve.prototype.getGlobalPosition = function (t, e) {
        return void 0 === t && (t = new Me), void 0 === e && (e = !1), this.parent ? this.parent.toGlobal(this.position, t, e) : (t.x = this.position.x, t.y = this.position.y), t
    };
    var lu = function (t, e) {
        return (lu = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
            t.__proto__ = e
        } || function (t, e) {
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
        })(t, e)
    };

    function cu(t, e) {
        function r() {
            this.constructor = t
        }

        lu(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
    }

    var du = function (t) {
        function e(e, r, i, n) {
            void 0 === e && (e = 100), void 0 === r && (r = 100), void 0 === i && (i = 10), void 0 === n && (n = 10);
            var o = t.call(this) || this;
            return o.segWidth = i, o.segHeight = n, o.width = e, o.height = r, o.build(), o
        }

        return cu(e, t), e.prototype.build = function () {
            for (var t = this.segWidth * this.segHeight, e = [], r = [], i = [], n = this.segWidth - 1, o = this.segHeight - 1, s = this.width / n, a = this.height / o, h = 0; h < t; h++) {
                var u = h % this.segWidth, l = h / this.segWidth | 0;
                e.push(u * s, l * a), r.push(u / n, l / o)
            }
            var c = n * o;
            for (h = 0; h < c; h++) {
                var d = h % n, f = h / n | 0, p = f * this.segWidth + d, _ = f * this.segWidth + d + 1, m = (f + 1) * this.segWidth + d, v = (f + 1) * this.segWidth + d + 1;
                i.push(p, _, m, _, v, m)
            }
            this.buffers[0].data = new Float32Array(e), this.buffers[1].data = new Float32Array(r), this.indexBuffer.data = new Uint16Array(i), this.buffers[0].update(), this.buffers[1].update(), this.indexBuffer.update()
        }, e
    }(sh), fu = function (t) {
        function e(e, r, i) {
            void 0 === e && (e = 200), void 0 === i && (i = 0);
            var n = t.call(this, new Float32Array(4 * r.length), new Float32Array(4 * r.length), new Uint16Array(6 * (r.length - 1))) || this;
            return n.points = r, n._width = e, n.textureScale = i, n.build(), n
        }

        return cu(e, t), Object.defineProperty(e.prototype, "width", {
            get: function () {
                return this._width
            }, enumerable: !1, configurable: !0
        }), e.prototype.build = function () {
            var t = this.points;
            if (t) {
                var e = this.getBuffer("aVertexPosition"), r = this.getBuffer("aTextureCoord"), i = this.getIndex();
                if (!(t.length < 1)) {
                    e.data.length / 4 !== t.length && (e.data = new Float32Array(4 * t.length), r.data = new Float32Array(4 * t.length), i.data = new Uint16Array(6 * (t.length - 1)));
                    var n = r.data, o = i.data;
                    n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1;
                    for (var s = 0, a = t[0], h = this._width * this.textureScale, u = t.length, l = 0; l < u; l++) {
                        var c = 4 * l;
                        if (this.textureScale > 0) {
                            var d = a.x - t[l].x, f = a.y - t[l].y, p = Math.sqrt(d * d + f * f);
                            a = t[l], s += p / h
                        } else s = l / (u - 1);
                        n[c] = s, n[c + 1] = 0, n[c + 2] = s, n[c + 3] = 1
                    }
                    var _ = 0;
                    for (l = 0; l < u - 1; l++) c = 2 * l, o[_++] = c, o[_++] = c + 1, o[_++] = c + 2, o[_++] = c + 2, o[_++] = c + 1, o[_++] = c + 3;
                    r.update(), i.update(), this.updateVertices()
                }
            }
        }, e.prototype.updateVertices = function () {
            var t = this.points;
            if (!(t.length < 1)) {
                for (var e, r = t[0], i = 0, n = 0, o = this.buffers[0].data, s = t.length, a = 0; a < s; a++) {
                    var h = t[a], u = 4 * a;
                    n = -((e = a < t.length - 1 ? t[a + 1] : h).x - r.x), i = e.y - r.y;
                    var l = Math.sqrt(i * i + n * n), c = this.textureScale > 0 ? this.textureScale * this._width / 2 : this._width / 2;
                    i /= l, n /= l, i *= c, n *= c, o[u] = h.x + i, o[u + 1] = h.y + n, o[u + 2] = h.x - i, o[u + 3] = h.y - n, r = h
                }
                this.buffers[0].update()
            }
        }, e.prototype.update = function () {
            this.textureScale > 0 ? this.build() : this.updateVertices()
        }, e
    }(sh), pu = function (e) {
        function r(r, i, n) {
            void 0 === n && (n = 0);
            var o = this, s = new fu(r.height, i, n), a = new oh(r);
            return n > 0 && (r.baseTexture.wrapMode = t.WRAP_MODES.REPEAT), (o = e.call(this, s, a) || this).autoUpdate = !0, o
        }

        return cu(r, e), r.prototype._render = function (t) {
            var r = this.geometry;
            (this.autoUpdate || r._width !== this.shader.texture.height) && (r._width = this.shader.texture.height, r.update()), e.prototype._render.call(this, t)
        }, r
    }(rh), _u = function (t) {
        function e(e, r, i) {
            var n = this, o = new du(e.width, e.height, r, i), s = new oh(Ur.WHITE);
            return (n = t.call(this, o, s) || this).texture = e, n
        }

        return cu(e, t), e.prototype.textureUpdated = function () {
            this._textureID = this.shader.texture._updateID;
            var t = this.geometry;
            t.width = this.shader.texture.width, t.height = this.shader.texture.height, t.build()
        }, Object.defineProperty(e.prototype, "texture", {
            get: function () {
                return this.shader.texture
            }, set: function (t) {
                this.shader.texture !== t && (this.shader.texture = t, this._textureID = -1, t.baseTexture.valid ? this.textureUpdated() : t.once("update", this.textureUpdated, this))
            }, enumerable: !1, configurable: !0
        }), e.prototype._render = function (e) {
            this._textureID !== this.shader.texture._updateID && this.textureUpdated(), t.prototype._render.call(this, e)
        }, e.prototype.destroy = function (e) {
            this.shader.texture.off("update", this.textureUpdated, this), t.prototype.destroy.call(this, e)
        }, e
    }(rh), mu = function (t) {
        function e(e, r, i, n, o) {
            void 0 === e && (e = Ur.EMPTY);
            var s = this, a = new sh(r, i, n);
            a.getBuffer("aVertexPosition").static = !1;
            var h = new oh(e);
            return (s = t.call(this, a, h, null, o) || this).autoUpdate = !0, s
        }

        return cu(e, t), Object.defineProperty(e.prototype, "vertices", {
            get: function () {
                return this.geometry.getBuffer("aVertexPosition").data
            }, set: function (t) {
                this.geometry.getBuffer("aVertexPosition").data = t
            }, enumerable: !1, configurable: !0
        }), e.prototype._render = function (e) {
            this.autoUpdate && this.geometry.getBuffer("aVertexPosition").update(), t.prototype._render.call(this, e)
        }, e
    }(rh), vu = 10, yu = function (t) {
        function e(e, r, i, n, o) {
            void 0 === r && (r = vu), void 0 === i && (i = vu), void 0 === n && (n = vu), void 0 === o && (o = vu);
            var s = t.call(this, Ur.WHITE, 4, 4) || this;
            return s._origWidth = e.orig.width, s._origHeight = e.orig.height, s._width = s._origWidth, s._height = s._origHeight, s._leftWidth = r, s._rightWidth = n, s._topHeight = i, s._bottomHeight = o, s.texture = e, s
        }

        return cu(e, t), e.prototype.textureUpdated = function () {
            this._textureID = this.shader.texture._updateID, this._refresh()
        }, Object.defineProperty(e.prototype, "vertices", {
            get: function () {
                return this.geometry.getBuffer("aVertexPosition").data
            }, set: function (t) {
                this.geometry.getBuffer("aVertexPosition").data = t
            }, enumerable: !1, configurable: !0
        }), e.prototype.updateHorizontalVertices = function () {
            var t = this.vertices, e = this._getMinScale();
            t[9] = t[11] = t[13] = t[15] = this._topHeight * e, t[17] = t[19] = t[21] = t[23] = this._height - this._bottomHeight * e, t[25] = t[27] = t[29] = t[31] = this._height
        }, e.prototype.updateVerticalVertices = function () {
            var t = this.vertices, e = this._getMinScale();
            t[2] = t[10] = t[18] = t[26] = this._leftWidth * e, t[4] = t[12] = t[20] = t[28] = this._width - this._rightWidth * e, t[6] = t[14] = t[22] = t[30] = this._width
        }, e.prototype._getMinScale = function () {
            var t = this._leftWidth + this._rightWidth, e = this._width > t ? 1 : this._width / t, r = this._topHeight + this._bottomHeight,
                i = this._height > r ? 1 : this._height / r;
            return Math.min(e, i)
        }, Object.defineProperty(e.prototype, "width", {
            get: function () {
                return this._width
            }, set: function (t) {
                this._width = t, this._refresh()
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "height", {
            get: function () {
                return this._height
            }, set: function (t) {
                this._height = t, this._refresh()
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "leftWidth", {
            get: function () {
                return this._leftWidth
            }, set: function (t) {
                this._leftWidth = t, this._refresh()
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "rightWidth", {
            get: function () {
                return this._rightWidth
            }, set: function (t) {
                this._rightWidth = t, this._refresh()
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "topHeight", {
            get: function () {
                return this._topHeight
            }, set: function (t) {
                this._topHeight = t, this._refresh()
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(e.prototype, "bottomHeight", {
            get: function () {
                return this._bottomHeight
            }, set: function (t) {
                this._bottomHeight = t, this._refresh()
            }, enumerable: !1, configurable: !0
        }), e.prototype._refresh = function () {
            var t = this.texture, e = this.geometry.buffers[1].data;
            this._origWidth = t.orig.width, this._origHeight = t.orig.height;
            var r = 1 / this._origWidth, i = 1 / this._origHeight;
            e[0] = e[8] = e[16] = e[24] = 0, e[1] = e[3] = e[5] = e[7] = 0, e[6] = e[14] = e[22] = e[30] = 1, e[25] = e[27] = e[29] = e[31] = 1, e[2] = e[10] = e[18] = e[26] = r * this._leftWidth, e[4] = e[12] = e[20] = e[28] = 1 - r * this._rightWidth, e[9] = e[11] = e[13] = e[15] = i * this._topHeight, e[17] = e[19] = e[21] = e[23] = 1 - i * this._bottomHeight, this.updateHorizontalVertices(), this.updateVerticalVertices(), this.geometry.buffers[0].update(), this.geometry.buffers[1].update()
        }, e
    }(_u), gu = function (t, e) {
        return (gu = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
            t.__proto__ = e
        } || function (t, e) {
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
        })(t, e)
    }, Eu = function (e) {
        function r(t, r) {
            void 0 === r && (r = !0);
            var i = e.call(this, t[0] instanceof Ur ? t[0] : t[0].texture) || this;
            return i._textures = null, i._durations = null, i._autoUpdate = r, i._isConnectedToTicker = !1, i.animationSpeed = 1, i.loop = !0, i.updateAnchor = !1, i.onComplete = null, i.onFrameChange = null, i.onLoop = null, i._currentTime = 0, i._playing = !1, i._previousFrame = null, i.textures = t, i
        }

        return function (t, e) {
            function r() {
                this.constructor = t
            }

            gu(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
        }(r, e), r.prototype.stop = function () {
            this._playing && (this._playing = !1, this._autoUpdate && this._isConnectedToTicker && (rr.shared.remove(this.update, this), this._isConnectedToTicker = !1))
        }, r.prototype.play = function () {
            this._playing || (this._playing = !0, this._autoUpdate && !this._isConnectedToTicker && (rr.shared.add(this.update, this, t.UPDATE_PRIORITY.HIGH), this._isConnectedToTicker = !0))
        }, r.prototype.gotoAndStop = function (t) {
            this.stop();
            var e = this.currentFrame;
            this._currentTime = t, e !== this.currentFrame && this.updateTexture()
        }, r.prototype.gotoAndPlay = function (t) {
            var e = this.currentFrame;
            this._currentTime = t, e !== this.currentFrame && this.updateTexture(), this.play()
        }, r.prototype.update = function (t) {
            if (this._playing) {
                var e = this.animationSpeed * t, r = this.currentFrame;
                if (null !== this._durations) {
                    var i = this._currentTime % 1 * this._durations[this.currentFrame];
                    for (i += e / 60 * 1e3; i < 0;) this._currentTime--, i += this._durations[this.currentFrame];
                    var n = Math.sign(this.animationSpeed * t);
                    for (this._currentTime = Math.floor(this._currentTime); i >= this._durations[this.currentFrame];) i -= this._durations[this.currentFrame] * n, this._currentTime += n;
                    this._currentTime += i / this._durations[this.currentFrame]
                } else this._currentTime += e;
                this._currentTime < 0 && !this.loop ? (this.gotoAndStop(0), this.onComplete && this.onComplete()) : this._currentTime >= this._textures.length && !this.loop ? (this.gotoAndStop(this._textures.length - 1), this.onComplete && this.onComplete()) : r !== this.currentFrame && (this.loop && this.onLoop && (this.animationSpeed > 0 && this.currentFrame < r ? this.onLoop() : this.animationSpeed < 0 && this.currentFrame > r && this.onLoop()), this.updateTexture())
            }
        }, r.prototype.updateTexture = function () {
            var t = this.currentFrame;
            this._previousFrame !== t && (this._previousFrame = t, this._texture = this._textures[t], this._textureID = -1, this._textureTrimmedID = -1, this._cachedTint = 16777215, this.uvs = this._texture._uvs.uvsFloat32, this.updateAnchor && this._anchor.copyFrom(this._texture.defaultAnchor), this.onFrameChange && this.onFrameChange(this.currentFrame))
        }, r.prototype.destroy = function (t) {
            this.stop(), e.prototype.destroy.call(this, t), this.onComplete = null, this.onFrameChange = null, this.onLoop = null
        }, r.fromFrames = function (t) {
            for (var e = [], i = 0; i < t.length; ++i) e.push(Ur.from(t[i]));
            return new r(e)
        }, r.fromImages = function (t) {
            for (var e = [], i = 0; i < t.length; ++i) e.push(Ur.from(t[i]));
            return new r(e)
        }, Object.defineProperty(r.prototype, "totalFrames", {
            get: function () {
                return this._textures.length
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(r.prototype, "textures", {
            get: function () {
                return this._textures
            }, set: function (t) {
                if (t[0] instanceof Ur) this._textures = t, this._durations = null; else {
                    this._textures = [], this._durations = [];
                    for (var e = 0; e < t.length; e++) this._textures.push(t[e].texture), this._durations.push(t[e].time)
                }
                this._previousFrame = null, this.gotoAndStop(0), this.updateTexture()
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(r.prototype, "currentFrame", {
            get: function () {
                var t = Math.floor(this._currentTime) % this._textures.length;
                return t < 0 && (t += this._textures.length), t
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(r.prototype, "playing", {
            get: function () {
                return this._playing
            }, enumerable: !1, configurable: !0
        }), Object.defineProperty(r.prototype, "autoUpdate", {
            get: function () {
                return this._autoUpdate
            }, set: function (t) {
                t !== this._autoUpdate && (this._autoUpdate = t, !this._autoUpdate && this._isConnectedToTicker ? (rr.shared.remove(this.update, this), this._isConnectedToTicker = !1) : this._autoUpdate && !this._isConnectedToTicker && this._playing && (rr.shared.add(this.update, this), this._isConnectedToTicker = !0))
            }, enumerable: !1, configurable: !0
        }), r
    }(fa);
    Tn.registerPlugin("accessibility", tr), Tn.registerPlugin("extract", Hn), Tn.registerPlugin("interaction", dr), Tn.registerPlugin("particle", Cs), Tn.registerPlugin("prepare", Ua), Tn.registerPlugin("batch", Nn), Tn.registerPlugin("tilingSprite", Za), fo.registerPlugin(Eh), fo.registerPlugin(ds), fo.registerPlugin(Ts), fo.registerPlugin(Os), fo.registerPlugin(ka), Xn.registerPlugin(ir), Xn.registerPlugin(_o);
    var Tu = {AlphaFilter: xh, BlurFilter: Wh, BlurFilterPass: zh, ColorMatrixFilter: Zh, DisplacementFilter: tu, FXAAFilter: nu, NoiseFilter: au};
    return t.AbstractBatchRenderer = Pn, t.AbstractMultiResource = br, t.AbstractRenderer = En, t.AccessibilityManager = tr, t.AnimatedSprite = Eu, t.AppLoaderPlugin = _o, t.Application = Xn, t.ArrayResource = xr, t.Attribute = jr, t.BaseImageResource = Ar, t.BasePrepare = Na, t.BaseRenderTexture = Lr, t.BaseTexture = Tr, t.BatchDrawCall = Sn, t.BatchGeometry = Mn, t.BatchPluginFactory = Cn, t.BatchRenderer = Nn, t.BatchShaderGenerator = In, t.BatchSystem = si, t.BatchTextureArray = On, t.BitmapFont = mh, t.BitmapFontData = hh, t.BitmapFontLoader = Eh, t.BitmapText = gh, t.BlobResource = Eo, t.Bounds = je, t.Buffer = Yr, t.BufferResource = gr, t.CanvasResource = Sr, t.Circle = Oe, t.CompressedTextureLoader = ds, t.CompressedTextureResource = To, t.Container = qe, t.ContextSystem = hi, t.CountLimiter = Oa, t.CubeResource = Or, t.DDSLoader = Ts, t.DEG_TO_RAD = Ae, t.DisplayObject = Ve, t.Ellipse = Re, t.Extract = Hn, t.FORMATS_TO_COMPONENTS = As, t.FillStyle = Ls, t.Filter = ji, t.FilterState = ei, t.FilterSystem = ni, t.Framebuffer = Nr, t.FramebufferSystem = ci, t.GLFramebuffer = ui, t.GLProgram = nn, t.GLTexture = mn, t.GRAPHICS_CURVES = Ns, t.Geometry = Zr, t.GeometrySystem = pi, t.Graphics = ha, t.GraphicsData = ea, t.GraphicsGeometry = na, t.IGLUniformData = rn, t.INSTALLED = pr, t.INTERNAL_FORMAT_TO_BYTES_PER_PIXEL = vo, t.ImageBitmapResource = Mr, t.ImageResource = Rr, t.InteractionData = nr, t.InteractionEvent = sr, t.InteractionManager = dr, t.InteractionTrackingData = ar, t.KTXLoader = Os, t.LineStyle = oa, t.Loader = fo, t.LoaderResource = mo, t.MaskData = _i, t.MaskSystem = qi, t.Matrix = De, t.Mesh = rh, t.MeshBatchUvs = $a, t.MeshGeometry = sh, t.MeshMaterial = oh, t.NineSlicePlane = yu, t.ObjectRenderer = oi, t.ObservablePoint = we, t.PI_2 = be, t.ParticleContainer = Is, t.ParticleRenderer = Cs, t.PlaneGeometry = du, t.Point = Me, t.Polygon = Pe, t.Prepare = Ua, t.Program = Gi, t.ProjectionSystem = Qi, t.Quad = Jr, t.QuadUv = Qr, t.RAD_TO_DEG = xe, t.Rectangle = Se, t.RenderTexture = Xr, t.RenderTexturePool = kr, t.RenderTextureSystem = en, t.Renderer = Tn, t.Resource = yr, t.RopeGeometry = fu, t.RoundedRectangle = Ie, t.Runner = fr,t.SVGResource = Pr,t.ScissorSystem = Zi,t.Shader = Xi,t.ShaderSystem = an,t.SimpleMesh = mu,t.SimplePlane = _u,t.SimpleRope = pu,t.Sprite = fa,t.SpriteMaskFilter = Wi,t.Spritesheet = Xa,t.SpritesheetLoader = ka,t.State = ki,t.StateSystem = pn,t.StencilSystem = Ji,t.System = Dr,t.TYPES_TO_BYTES_PER_COMPONENT = xs,t.TYPES_TO_BYTES_PER_PIXEL = Ss,t.TemporaryDisplayObject = ze,t.Text = Aa,t.TextMetrics = Ta,t.TextStyle = va,t.Texture = Ur,t.TextureGCSystem = _n,t.TextureLoader = co,t.TextureMatrix = zi,t.TextureSystem = vn,t.TextureUvs = Fr,t.Ticker = rr,t.TickerPlugin = ir,t.TilingSprite = Va,t.TilingSpriteRenderer = Za,t.TimeLimiter = Ga,t.Transform = ke,t.UniformGroup = ti,t.VERSION = "6.0.2",t.VideoResource = Ir,t.ViewableBuffer = Rn,t.accessibleTarget = Ke,t.autoDetectRenderer = bn,t.autoDetectResource = _r,t.checkMaxIfStatementsInShader = Fi,t.defaultFilterVertex = An,t.defaultVertex = xn,t.filters = Tu,t.graphicsUtils = ua,t.groupD8 = Xe,t.interactiveTarget = ur,t.isMobile = F,t.resources = Ln,t.settings = B,t.systems = Un,t.uniformParsers = wi,t.utils = Te,t
}({});
//# sourceMappingURL=pixi.min.js.map