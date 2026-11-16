// node_modules/svelte/src/internal/disclose-version.js
if (typeof window < "u") {
	var e, t;
	((e = (t = window).__svelte ?? (t.__svelte = {})).v ?? (e.v = /* @__PURE__ */ new Set())).add("5");
}
// \0@oxc-project+runtime@0.156.0/helpers/esm/checkPrivateRedeclaration.js
function n(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
// \0@oxc-project+runtime@0.156.0/helpers/esm/classPrivateMethodInitSpec.js
function r(e, t) {
	n(e, t), t.add(e);
}
// \0@oxc-project+runtime@0.156.0/helpers/esm/assertClassBrand.js
function i(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
// src/lib/element-api.ts
function a(e) {
	var t = /* @__PURE__ */ new WeakSet();
	return class extends e {
		constructor(...e) {
			super(...e), r(this, t);
		}
		get rate() {
			return i(t, this, n).call(this).getSnapshot?.().rate ?? 1;
		}
		set rate(e) {
			i(t, this, n).call(this).setRate?.(Number(e));
		}
		get currentTime() {
			return i(t, this, n).call(this).getSnapshot?.().currentTime ?? 0;
		}
		set currentTime(e) {
			i(t, this, n).call(this).setCurrentTime?.(Number(e));
		}
		get duration() {
			return i(t, this, n).call(this).getSnapshot?.().duration ?? NaN;
		}
		get paused() {
			return i(t, this, n).call(this).getSnapshot?.().paused ?? !0;
		}
		get videoElement() {
			return i(t, this, n).call(this).getSnapshot?.().video;
		}
	};
	function n() {
		return this;
	}
}
// node_modules/svelte/src/constants.js
var o = {}, s = Symbol("uninitialized"), c = "http://www.w3.org/2000/svg", l = "http://www.w3.org/1998/Math/MathML", u = Array.isArray, d = Array.prototype.indexOf, f = Array.prototype.includes, p = Array.from, m = Object.keys, h = Object.defineProperty, g = Object.getOwnPropertyDescriptor, _ = Object.getOwnPropertyDescriptors, v = Object.prototype, y = Array.prototype, b = Object.getPrototypeOf, x = Object.isExtensible;
function S(e) {
	return typeof e == "function";
}
var C = () => {};
function w(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function T() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
// \0@oxc-project+runtime@0.156.0/helpers/esm/typeof.js
function ee(e) {
	"@babel/helpers - typeof";
	return ee = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, ee(e);
}
// \0@oxc-project+runtime@0.156.0/helpers/esm/toPrimitive.js
function te(e, t) {
	if (ee(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (ee(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
// \0@oxc-project+runtime@0.156.0/helpers/esm/toPropertyKey.js
function ne(e) {
	var t = te(e, "string");
	return ee(t) == "symbol" ? t : t + "";
}
// \0@oxc-project+runtime@0.156.0/helpers/esm/defineProperty.js
function E(e, t, n) {
	return (t = ne(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
// node_modules/svelte/src/internal/client/constants.js
var re = 1 << 24, D = 1024, O = 2048, ie = 4096, ae = 8192, oe = 16384, se = 32768, ce = 1 << 25, le = 65536, ue = 1 << 19, de = 1 << 20, fe = 1 << 25, pe = 1 << 21, me = 1 << 22, he = 1 << 23, ge = Symbol("$state"), _e = Symbol("component"), ve = Symbol("legacy props"), ye = Symbol(""), be = Symbol("attributes"), xe = Symbol("class"), Se = Symbol("style"), Ce = Symbol("text"), we = new class extends Error {
	constructor(...e) {
		super(...e), E(this, "name", "StaleReactionError"), E(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
	}
}(), Te = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
function Ee() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function De(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Oe() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/svelte/src/internal/client/dom/hydration.js
var k = !1;
function ke(e) {
	k = e;
}
var A;
function j(e) {
	if (e === null) throw De(), o;
	return A = e;
}
function Ae() {
	return j(/* @__PURE__ */ On(A));
}
function M(e) {
	if (k) {
		if (/* @__PURE__ */ On(A) !== null) throw De(), o;
		A = e;
	}
}
function je(e = 1) {
	if (k) {
		for (var t = e, n = A; t--;) n = /* @__PURE__ */ On(n);
		A = n;
	}
}
function Me(e = !0) {
	for (var t = 0, n = A;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ On(n);
		e && n.remove(), n = i;
	}
}
function Ne(e) {
	if (!e || e.nodeType !== 8) throw De(), o;
	return e.data;
}
// node_modules/svelte/src/internal/client/reactivity/equality.js
function Pe(e) {
	return e === this.v;
}
function Fe(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Ie(e) {
	return !Fe(e, this.v);
}
function Le(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
// node_modules/svelte/src/internal/client/errors.js
function Re() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function ze(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Be(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Ve() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function He(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Ue() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function We() {
	throw Error("https://svelte.dev/e/hydration_failed");
}
function Ge(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Ke() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function qe() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function Je() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Ye() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
// node_modules/svelte/src/internal/client/context.js
var N = null;
function Xe(e) {
	N = e;
}
function Ze(e, t = !1, n) {
	N = {
		p: N,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: q,
		l: null
	};
}
function Qe(e) {
	var t = N, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Un(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, N = t.p, $e(e);
}
function $e(e = {}) {
	return h(e, _e, { value: !0 }), e;
}
function et() {
	return !0;
}
// node_modules/svelte/src/internal/client/dom/task.js
var tt = [];
function nt() {
	var e = tt;
	tt = [], w(e);
}
function rt(e) {
	if (tt.length === 0 && !Ot) {
		var t = tt;
		queueMicrotask(() => {
			t === tt && nt();
		});
	}
	tt.push(e);
}
function it() {
	for (; tt.length > 0;) nt();
}
// node_modules/svelte/src/internal/client/reactivity/status.js
var at = ~(O | ie | D);
function P(e, t) {
	e.f = e.f & at | t;
}
function ot(e) {
	e.f & 512 || e.deps === null ? P(e, D) : P(e, ie);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function st(e, t) {
	e.f & 2048 ? t.set(e, O) : e.f & 4096 && t.get(e) !== 2048 && t.set(e, ie), P(e, D);
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function ct(e) {
	var t = K, n = q;
	pr(null), mr(null);
	try {
		return e();
	} finally {
		pr(t), mr(n);
	}
}
// node_modules/svelte/src/internal/client/reactivity/async.js
function lt(e, t, n, r) {
	let i = et() ? pt : _t;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = q, c = ut(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				In(e, s);
			}
			dt();
		}
	}
	var d = ft();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ ht(e))).then(u).catch((e) => In(e, s)).finally(d);
	}
	l ? l.then(() => {
		s.f & 16384 ? d() : (c(), f(), dt());
	}) : f();
}
function ut() {
	var e = q, t = K, n = N, r = R;
	return function(i = !0) {
		mr(e), pr(t), Xe(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function dt(e = !0) {
	mr(null), pr(null), Xe(null), e && R?.deactivate();
}
function ft() {
	var e = q, t = e.b, n = R, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function pt(e) {
	var t = 2 | O;
	return q !== null && (q.f |= ue), {
		ctx: N,
		deps: null,
		effects: null,
		equals: Pe,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: s,
		wv: 0,
		parent: q,
		ac: null
	};
}
var mt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function ht(e, t, n) {
	let r = q;
	r === null && Re();
	var i = void 0, a = fn(s), o = !K, c = /* @__PURE__ */ new Set();
	return qn(() => {
		var t = q, n = T();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== we && n.reject(e);
			}).finally(dt);
		} catch (e) {
			n.reject(e), dt();
		}
		var s = R;
		if (o) {
			if (t.f & 32768) var l = ft();
			if (r.b?.is_rendered()) s.async_deriveds.get(t)?.reject(mt);
			else for (let e of c.values()) e.reject(mt);
			c.add(n), s.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), c.delete(n), t !== mt && (s.activate(), t ? (a.f |= he, gn(a, t)) : (a.f & 8388608 && (a.f ^= he), gn(a, e)), s.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Vn(() => {
		for (let e of c) e.reject(mt);
	}), new Promise((e) => {
		function t(n) {
			function r() {
				n === i ? e(a) : t(i);
			}
			n.then(r, r);
		}
		t(i);
	});
}
/*#__NO_SIDE_EFFECTS__*/
function gt(e) {
	let t = /* @__PURE__ */ pt(e);
	return gr(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function _t(e) {
	let t = /* @__PURE__ */ pt(e);
	return t.equals = Ie, t;
}
function vt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) G(t[n]);
	}
}
function yt(e) {
	var t, n = q, r = e.parent;
	if (!ur && r !== null && e.v !== s && r.f & 24576) return Ee(), e.v;
	mr(r);
	try {
		vt(e), t = Or(e);
	} finally {
		mr(n);
	}
	return t;
}
function bt(e) {
	var t = yt(e);
	!e.equals(t) && (e.wv = Tr(), (!R?.is_fork || e.deps === null) && (R === null ? e.v = t : (R.capture(e, t, !0), Tt?.capture(e, t, !0)), e.deps === null)) ? P(e, D) : ur || (Et === null ? ot(e) : (Bn() || R?.is_fork) && Et.set(e, t));
}
function xt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && ct(() => {
		t.ac.abort(we), t.ac = null;
	}), t.fn !== null && (t.teardown = C), jr(t, 0), er(t));
}
function St(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && Mr(t);
}
// \0@oxc-project+runtime@0.156.0/helpers/esm/classPrivateFieldInitSpec.js
function F(e, t, r) {
	n(e, t), t.set(e, r);
}
// \0@oxc-project+runtime@0.156.0/helpers/esm/classPrivateFieldGet2.js
function I(e, t) {
	return e.get(i(e, t));
}
// \0@oxc-project+runtime@0.156.0/helpers/esm/classPrivateFieldSet2.js
function L(e, t, n) {
	return e.set(i(e, t), n), n;
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var Ct, wt = null, R = null, Tt = null, Et = null, Dt = null, Ot = !1, kt = !1, At = null, jt = null, Mt = 0, Nt = 1, Pt = /* @__PURE__ */ new WeakMap(), Ft = /* @__PURE__ */ new WeakMap(), It = /* @__PURE__ */ new WeakMap(), Lt = /* @__PURE__ */ new WeakMap(), Rt = /* @__PURE__ */ new WeakMap(), zt = /* @__PURE__ */ new WeakMap(), Bt = /* @__PURE__ */ new WeakMap(), Vt = /* @__PURE__ */ new WeakMap(), Ht = /* @__PURE__ */ new WeakMap(), Ut = /* @__PURE__ */ new WeakMap(), Wt = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakSet(), Gt = class e {
	constructor() {
		r(this, z), E(this, "id", Nt++), E(this, "started", !1), E(this, "linked", !0), E(this, "prev", null), E(this, "next", null), E(this, "async_deriveds", /* @__PURE__ */ new Map()), E(this, "current", /* @__PURE__ */ new Map()), E(this, "previous", /* @__PURE__ */ new Map()), F(this, Pt, /* @__PURE__ */ new Set()), F(this, Ft, /* @__PURE__ */ new Set()), F(this, It, 0), F(this, Lt, /* @__PURE__ */ new Map()), F(this, Rt, null), F(this, zt, []), F(this, Bt, []), F(this, Vt, /* @__PURE__ */ new Map()), F(this, Ht, /* @__PURE__ */ new Map()), F(this, Ut, /* @__PURE__ */ new Set()), E(this, "is_fork", !1), F(this, Wt, !1), wt === null ? wt = this : (wt.next = this, this.prev = wt), wt = this;
	}
	skip_effect(e) {
		I(Ht, this).has(e) || I(Ht, this).set(e, {
			d: [],
			m: []
		}), I(Ut, this).delete(e);
	}
	unskip_effect(e, t = (e) => this.schedule(e)) {
		var n = I(Ht, this).get(e);
		if (n) {
			I(Ht, this).delete(e);
			for (var r of n.d) P(r, O), t(r);
			for (r of n.m) P(r, ie), t(r);
		}
		I(Ut, this).add(e);
	}
	capture(e, t, n = !1) {
		e.v !== s && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Et?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		R = this;
	}
	deactivate() {
		R = null, Et = null;
	}
	flush() {
		try {
			kt = !0, R = this, i(z, this, Yt).call(this);
		} finally {
			Mt = 0, Dt = null, At = null, jt = null, kt = !1, R = null, Et = null, un.clear();
		}
	}
	discard() {
		for (let e of I(Ft, this)) e(this);
		I(Ft, this).clear();
		for (let e of this.async_deriveds.values()) e.reject(mt);
		i(z, this, tn).call(this), I(Rt, this)?.resolve();
	}
	register_created_effect(e) {
		I(Bt, this).push(e);
	}
	increment(e, t) {
		if (L(It, this, I(It, this) + 1), e) {
			let e = I(Lt, this).get(t) ?? 0;
			I(Lt, this).set(t, e + 1);
		}
	}
	decrement(e, t) {
		if (L(It, this, I(It, this) - 1), e) {
			let e = I(Lt, this).get(t) ?? 0;
			e === 1 ? I(Lt, this).delete(t) : I(Lt, this).set(t, e - 1);
		}
		I(Wt, this) || (L(Wt, this, !0), rt(() => {
			L(Wt, this, !1), this.linked && this.flush();
		}));
	}
	transfer_reactions(e) {
		for (let [t, n] of e) this.add_dirty_reaction(t, n);
		e.clear();
	}
	add_dirty_reaction(e, t) {
		(t === 2048 || I(Vt, this).get(e) !== 2048) && I(Vt, this).set(e, t);
	}
	oncommit(e) {
		I(Pt, this).add(e);
	}
	ondiscard(e) {
		I(Ft, this).add(e);
	}
	settled() {
		return (I(Rt, this) ?? L(Rt, this, T())).promise;
	}
	static ensure() {
		if (R === null) {
			let t = R = new e();
			!kt && !Ot && rt(() => {
				t.started || t.flush();
			});
		}
		return R;
	}
	apply() {
		Et = null;
	}
	schedule(e) {
		Dt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768) ? e.b.defer_effect(e) : I(zt, this).push(e);
	}
};
Ct = Gt;
function Kt() {
	if (this.is_fork) return !0;
	for (let e of I(Lt, this).keys()) if (!i(z, this, qt).call(this, e)) return !0;
	return !1;
}
function qt(e) {
	for (var t = e; t !== null; t = t.parent) if (I(Ht, this).has(t)) return !0;
	return !1;
}
function Jt() {
	var e = [];
	for (let i of I(zt, this)) if (!(i.f & 16384 || !(i.f & 6144))) {
		for (var t = i, n = !1; t.parent !== null;) {
			t = t.parent;
			var r = t.f;
			if (r & 96) {
				if (!(r & 1024)) {
					n = !0;
					break;
				}
				t.f ^= D;
			}
		}
		n || e.push(t);
	}
	return L(zt, this, []), e;
}
function Yt() {
	this.started = !0;
	for (let [e, t] of I(Vt, this)) P(e, t), this.schedule(e);
	this.apply();
	for (var e = At = [], t = [], n = jt = []; I(zt, this).length > 0;) {
		Mt++ > 1e3 && (i(z, this, tn).call(this), nn());
		for (let n of i(z, this, Jt).call(this)) try {
			i(z, this, Xt).call(this, n, e, t);
		} catch (e) {
			throw cn(n), i(z, this, Kt).call(this) || this.discard(), e;
		}
	}
	if (R = null, n.length > 0) {
		var r = Ct.ensure();
		for (let e of n) r.schedule(e);
	}
	if (At = null, jt = null, i(z, this, Kt).call(this)) {
		i(z, this, en).call(this, t), i(z, this, en).call(this, e);
		for (let [e, t] of I(Ht, this)) sn(e, t);
		n.length > 0 && i(z, R, Yt).call(R);
		return;
	}
	let a = i(z, this, Zt).call(this);
	if (a) i(z, this, en).call(this, t), i(z, this, en).call(this, e), i(z, a, $t).call(a, this);
	else {
		I(Vt, this).clear();
		for (let e of I(Pt, this)) e(this);
		I(Pt, this).clear(), Tt = this, an(t), an(e), Tt = null, I(Rt, this)?.resolve();
		var o = R;
		I(It, this) === 0 && (I(zt, this).length === 0 || o !== null) && i(z, this, tn).call(this), o !== null && (un.clear(), i(z, o, Yt).call(o));
	}
}
function Xt(e, t, n) {
	e.f ^= D;
	for (var r = e.first; r !== null;) {
		var i = r.f, a = !!(i & 96);
		if (!(a && i & 1024 || i & 8192 || I(Ht, this).has(r)) && r.fn !== null) {
			a ? r.f ^= D : i & 4 ? t.push(r) : Er(r) && (i & 16 && this.add_dirty_reaction(r, ie), Mr(r));
			var o = r.first;
			if (o !== null) {
				r = o;
				continue;
			}
		}
		for (; r !== null;) {
			var s = r.next;
			if (s !== null) {
				r = s;
				break;
			}
			r = r.parent;
		}
	}
}
function Zt() {
	for (var e = this.prev; e !== null; e = e.prev) if (!e.is_fork && i(z, this, Qt).call(this, e)) return e;
	return null;
}
function Qt(e) {
	for (let [t, [, n]] of this.current) if (!n && e.current.has(t)) return !0;
	return !1;
}
function $t(e) {
	for (let [t, n] of e.current) !this.previous.has(t) && e.previous.has(t) && this.previous.set(t, e.previous.get(t)), this.current.set(t, n);
	for (let [t, n] of e.async_deriveds) {
		let e = this.async_deriveds.get(t);
		e && n.promise.then(e.resolve).catch(e.reject);
	}
	e.async_deriveds.clear(), this.transfer_reactions(I(Vt, e));
	let t = (e) => {
		var n = e.reactions;
		if (n !== null && !(e.f & 2 && !(e.f & 6144))) for (let e of n) {
			var r = e.f;
			if (r & 2) t(e);
			else {
				var i = e;
				r & 4194320 && !this.async_deriveds.has(i) && (I(Vt, this).delete(i), P(i, O), this.schedule(i));
			}
		}
	};
	for (let e of this.current.keys()) t(e);
	this.oncommit(() => e.discard()), i(z, e, tn).call(e), R = this, i(z, this, Yt).call(this);
}
function en(e) {
	for (var t = 0; t < e.length; t += 1) st(e[t], I(Vt, this));
}
function tn() {
	if (this.linked) {
		var e = this.prev, t = this.next;
		e === null || (e.next = t), t === null ? wt = e : t.prev = e, this.linked = !1;
	}
}
function B(e) {
	var t = Ot, n = Tt;
	Tt = null, Ot = !0;
	try {
		var r;
		for (e && (B(), r = e());;) {
			if (it(), R === null) return r;
			R.flush();
		}
	} finally {
		Ot = t, Tt = n;
	}
}
function nn() {
	try {
		Ue();
	} catch (e) {
		In(e, Dt);
	}
}
var rn = null;
function an(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Er(r) && (rn = /* @__PURE__ */ new Set(), Mr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && rr(r), rn?.size > 0)) {
				un.clear();
				for (let e of rn) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) rn.has(n) && (rn.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || Mr(n);
					}
				}
				rn.clear();
			}
		}
		rn = null;
	}
}
function on(e) {
	R.schedule(e);
}
function sn(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), P(e, D);
		for (var n = e.first; n !== null;) sn(n, t), n = n.next;
	}
}
function cn(e) {
	P(e, D);
	for (var t = e.first; t !== null;) cn(t), t = t.next;
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var ln = /* @__PURE__ */ new Set(), un = /* @__PURE__ */ new Map(), dn = !1;
function fn(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Pe,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function V(e, t) {
	let n = fn(e, t);
	return gr(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function pn(e, t = !1, n = !0) {
	let r = fn(e);
	return t || (r.equals = Ie), r;
}
function H(e, t, n = !1) {
	return K !== null && (!fr || K.f & 131072) && et() && K.f & 4325394 && (hr === null || !hr.has(e)) && Je(), gn(e, n ? bn(t) : t, jt);
}
var mn = null, hn = 0;
function gn(e, t, n = null) {
	if (!e.equals(t)) {
		ur ? un.set(e, t) : un.has(e) || un.set(e, e.v);
		var r = Gt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && yt(t), Et === null && ot(t);
		}
		e.wv = Tr(), mn = null, hn = 0, yn(e, O, n), mn = null, et() && q !== null && q.f & 1024 && !(q.f & 96) && (yr === null ? br([e]) : yr.push(e)), !r.is_fork && ln.size > 0 && !dn && _n();
	}
	return t;
}
function _n() {
	dn = !1;
	for (let e of ln) {
		e.f & 1024 && P(e, ie);
		let t;
		try {
			t = Er(e);
		} catch {
			t = !0;
		}
		t && Mr(e);
	}
	ln.clear();
}
function vn(e) {
	H(e, e.v + 1);
}
function yn(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = et(), a = r.length;
		if (hn += a, hn > 1e5 && mn === null && (mn = /* @__PURE__ */ new Set()), mn !== null) {
			if (mn.has(e)) return;
			mn.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== q) {
				var l = (c & O) === 0;
				if (l && P(s, t), c & 131072) ln.add(s);
				else if (c & 2) {
					var u = s;
					Et?.delete(u), yn(u, ie, n);
				} else if (l) {
					var d = s;
					c & 16 && rn !== null && rn.add(d), n === null ? on(d) : n.push(d);
				}
			}
		}
	}
}
function bn(e) {
	if (typeof e != "object" || !e || ge in e || _e in e) return e;
	let t = b(e);
	if (t !== v && t !== y) return e;
	var n = /* @__PURE__ */ new Map(), r = u(e), i = /* @__PURE__ */ V(0), a = null, o = Cr, c = (e) => {
		if (Cr === o) return e();
		var t = K, n = Cr;
		pr(null), wr(o);
		var r = e();
		return pr(t), wr(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ V(e.length, a)), new Proxy(e, {
		defineProperty(e, t, r) {
			"value" in r && r.configurable !== !1 && r.enumerable !== !1 && r.writable !== !1 || Ke();
			var i = n.get(t);
			return i === void 0 ? c(() => {
				var e = /* @__PURE__ */ V(r.value, a);
				return n.set(t, e), e;
			}) : H(i, r.value, !0), !0;
		},
		deleteProperty(e, t) {
			var r = n.get(t);
			if (r === void 0) {
				if (t in e) {
					let e = c(() => /* @__PURE__ */ V(s, a));
					n.set(t, e), vn(i);
				}
			} else H(r, s), vn(i);
			return !0;
		},
		get(t, r, i) {
			if (r === ge) return e;
			var o = n.get(r), l = r in t;
			if (o === void 0 && (!l || g(t, r)?.writable) && (o = c(() => /* @__PURE__ */ V(bn(l ? t[r] : s), a)), n.set(r, o)), o !== void 0) {
				var u = J(o);
				return u === s ? void 0 : u;
			}
			return Reflect.get(t, r, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var r = Reflect.getOwnPropertyDescriptor(e, t), i = n.get(t);
			if (i !== void 0) {
				var a = J(i);
				if (a === s) return;
				if (r && "value" in r) r.value = a;
				else return {
					enumerable: !0,
					configurable: !0,
					value: a,
					writable: !0
				};
			}
			return r;
		},
		has(e, t) {
			if (t === ge) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== s || Reflect.has(e, t);
			return (r !== void 0 || (q !== null || K !== null) && (!i || g(e, t)?.writable)) && (r === void 0 && (r = c(() => /* @__PURE__ */ V(i ? bn(e[t]) : s, a)), n.set(t, r)), J(r) === s) ? !1 : i;
		},
		set(e, t, o, l) {
			var u = n.get(t), d = t in e;
			if (r && t === "length") for (var f = o; f < u.v; f += 1) {
				var p = n.get(f + "");
				p === void 0 ? f in e && (p = c(() => /* @__PURE__ */ V(s, a)), n.set(f + "", p)) : H(p, s);
			}
			if (u === void 0) (!d || g(e, t)?.writable) && (u = c(() => /* @__PURE__ */ V(void 0, a)), H(u, bn(o)), n.set(t, u));
			else {
				d = u.v !== s;
				var m = c(() => bn(o));
				H(u, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(l, o), !d) {
				if (r && typeof t == "string") {
					var _ = n.get("length"), v = Number(t);
					Number.isInteger(v) && v >= _.v && H(_, v + 1);
				}
				vn(i);
			}
			return !0;
		},
		ownKeys(e) {
			J(i);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== s;
			});
			for (var [r, a] of n) a.v !== s && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			qe();
		}
	});
}
var xn, Sn, Cn, wn;
function Tn() {
	if (xn === void 0) {
		xn = window, Sn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		Cn = g(t, "firstChild").get, wn = g(t, "nextSibling").get, x(e) && (e[xe] = void 0, e[be] = null, e[Se] = void 0, e.__e = void 0), x(n) && (n[Ce] = void 0);
	}
}
function En(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function Dn(e) {
	return Cn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function On(e) {
	return wn.call(e);
}
function U(e, t) {
	if (!k) return /* @__PURE__ */ Dn(e);
	var n = /* @__PURE__ */ Dn(A);
	if (n === null) n = A.appendChild(En());
	else if (t && n.nodeType !== 3) {
		var r = En();
		return n?.before(r), j(r), r;
	}
	return t && Pn(n), j(n), n;
}
function kn(e, t = !1) {
	if (!k) {
		var n = /* @__PURE__ */ Dn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ On(n) : n;
	}
	if (t) {
		if (A?.nodeType !== 3) {
			var r = En();
			return A?.before(r), j(r), r;
		}
		Pn(A);
	}
	return A;
}
function An(e, t = !1) {
	if (!k) return /* @__PURE__ */ Dn(e);
	var n = U(e, t);
	return M(e), n;
}
function W(e, t = 1, n = !1) {
	let r = k ? A : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ On(r);
	if (!k) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = En();
			return r === null ? i?.after(a) : r.before(a), j(a), a;
		}
		Pn(r);
	}
	return j(r), r;
}
function jn(e) {
	e.textContent = "";
}
function Mn() {
	return !1;
}
function Nn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function Pn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function Fn(e) {
	var t = q;
	if (t === null) return K.f |= he, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	In(e, t);
}
function In(e, t) {
	if (e === o) throw e;
	if (!(t !== null && t.f & 16384)) {
		for (; t !== null;) {
			if (t.f & 128 && !(t.f & 33570816)) {
				if (!(t.f & 32768)) throw e;
				try {
					t.b.error(e);
					return;
				} catch (t) {
					e = t;
				}
			}
			t = t.parent;
		}
		throw e;
	}
}
// node_modules/svelte/src/internal/client/reactivity/effects.js
function Ln(e) {
	q === null && (K === null && He(e), Ve()), ur && Be(e);
}
function Rn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function zn(e, t) {
	var n = q;
	n !== null && n.f & 8192 && (e |= ae);
	var r = {
		ctx: N,
		deps: null,
		nodes: null,
		f: e | O | 512,
		first: null,
		fn: t,
		last: null,
		next: null,
		parent: n,
		b: n && n.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null
	};
	R?.register_created_effect(r);
	var i = r;
	if (e & 4) At === null ? Gt.ensure().schedule(r) : At.push(r);
	else if (t !== null) {
		try {
			Mr(r);
		} catch (e) {
			throw G(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= le));
	}
	if (i !== null && (i.parent = n, n !== null && Rn(i, n), K !== null && K.f & 2 && !(e & 64))) {
		var a = K;
		(a.effects ?? (a.effects = [])).push(i);
	}
	return r;
}
function Bn() {
	return K !== null && !fr;
}
function Vn(e) {
	let t = zn(8, null);
	return P(t, D), t.teardown = e, t;
}
function Hn(e) {
	Ln("$effect");
	var t = q.f;
	if (!K && t & 32 && N !== null && !N.i) {
		var n = N;
		(n.e ?? (n.e = [])).push(e);
	} else return Un(e);
}
function Un(e) {
	return zn(4 | de, e);
}
function Wn(e) {
	Gt.ensure();
	let t = zn(64 | ue, e);
	return () => {
		G(t);
	};
}
function Gn(e) {
	Gt.ensure();
	let t = zn(64 | ue, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? ir(t, () => {
			G(t), n(void 0);
		}) : (G(t), n(void 0));
	});
}
function Kn(e) {
	return zn(4, e);
}
function qn(e) {
	return zn(me | ue, e);
}
function Jn(e, t = 0) {
	return zn(8 | t, e);
}
function Yn(e, t = [], n = [], r = []) {
	lt(r, t, n, (t) => {
		zn(8, () => {
			e(...t.map(J));
		});
	});
}
function Xn(e, t = 0) {
	return zn(16 | t, e);
}
function Zn(e, t = 0) {
	return zn(re | t, e);
}
function Qn(e) {
	return zn(32 | ue, e);
}
function $n(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = ur, r = K;
		dr(!0), pr(null);
		try {
			t.call(null);
		} catch (t) {
			In(t, e.parent);
		} finally {
			dr(n), pr(r);
		}
	}
}
function er(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && ct(() => {
			e.abort(we);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : G(n, t), n = r;
	}
}
function tr(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || G(t), t = n;
	}
}
function G(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (nr(e.nodes.start, e.nodes.end), n = !0), e.f |= ce, er(e, t && !n), jr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	$n(e), e.f ^= ce, e.f |= oe;
	var i = e.parent;
	i !== null && i.first !== null && rr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function nr(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ On(e);
		e.remove(), e = n;
	}
}
function rr(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function ir(e, t, n = !0) {
	var r = [];
	e.f |= 256, ar(e, r, !0);
	var i = () => {
		n && G(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function ar(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= ae;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				ar(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function or(e) {
	e.f &= -257, sr(e, !0);
}
function sr(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= ae, e.f & 1024 || (P(e, O), Gt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			sr(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function cr(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ On(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var lr = null, ur = !1;
function dr(e) {
	ur = e;
}
var K = null, fr = !1;
function pr(e) {
	K = e;
}
var q = null;
function mr(e) {
	q = e;
}
var hr = null;
function gr(e) {
	K !== null && (K.f & 2097152 || K.f & 2) && (hr ?? (hr = /* @__PURE__ */ new Set())).add(e);
}
var _r = null, vr = 0, yr = null;
function br(e) {
	yr = e;
}
var xr = 1, Sr = 0, Cr = Sr;
function wr(e) {
	Cr = e;
}
function Tr() {
	return ++xr;
}
function Er(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Er(a) && bt(a), a.wv > e.wv) return !0;
		}
		t & 512 && Et === null && P(e, D);
	}
	return !1;
}
function Dr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(hr !== null && hr.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? Dr(a, t, !1) : t === a && (n ? P(a, O) : a.f & 1024 && P(a, ie), on(a));
	}
}
function Or(e) {
	var t = _r, n = vr, r = yr, i = K, a = hr, o = N, s = fr, c = Cr, l = e.f;
	_r = null, vr = 0, yr = null, K = l & 96 ? null : e, hr = null, Xe(e.ctx), fr = !1, Cr = ++Sr, e.ac !== null && (ct(() => {
		e.ac.abort(we);
	}), e.ac = null);
	try {
		e.f |= pe;
		var u = e.fn, d = u();
		e.f |= se;
		var f = kr(e);
		if (et() && yr !== null && !fr && f !== null && !(e.f & 6146)) for (var p = 0; p < yr.length; p++) Dr(yr[p], e);
		if (i !== null && i !== e) {
			if (Sr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Sr;
			if (t !== null) for (let e of t) e.rv = Sr;
			yr !== null && (r === null ? r = yr : r.push(...yr));
		}
		return e.f & 8388608 && (e.f ^= he), d;
	} catch (t) {
		return kr(e), Fn(t);
	} finally {
		e.f ^= pe, _r = t, vr = n, yr = r, K = i, hr = a, Xe(o), fr = s, Cr = c;
	}
}
function kr(e) {
	var t = e.deps, n = R?.is_fork;
	if (_r !== null) {
		var r;
		if (n || jr(e, vr), t !== null && vr > 0) for (t.length = vr + _r.length, r = 0; r < _r.length; r++) t[vr + r] = _r[r];
		else e.deps = t = _r;
		if (Bn() && e.f & 512) for (r = vr; r < t.length; r++) {
			var i;
			((i = t[r]).reactions ?? (i.reactions = [])).push(e);
		}
	} else !n && t !== null && vr < t.length && (jr(e, vr), t.length = vr);
	return t;
}
function Ar(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = d.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (_r === null || !f.call(_r, t))) {
		var a = t;
		a.f & 512 && (a.f ^= 512), a.v !== s && ot(a), a.ac !== null && ct(() => {
			a.ac.abort(we), a.ac = null, P(a, O);
		}), xt(a), jr(a, 0);
	}
}
function jr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Ar(e, n[r]);
}
function Mr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		P(e, D);
		var n = q;
		q = e;
		try {
			t & 16777232 ? tr(e) : er(e), $n(e);
			var r = Or(e);
			e.teardown = typeof r == "function" ? r : null, e.wv = xr;
		} finally {
			q = n;
		}
	}
}
function J(e) {
	var t = !!(e.f & 2);
	if (lr?.add(e), K !== null && !fr && !(q !== null && q.f & 16384) && (hr === null || !hr.has(e))) {
		var n = K.deps;
		if (K.f & 2097152) e.rv < Sr && (e.rv = Sr, _r === null && n !== null && n[vr] === e ? vr++ : _r === null ? _r = [e] : _r.push(e));
		else {
			var r;
			(r = K).deps ?? (r.deps = []), f.call(K.deps, e) || K.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [K] : f.call(i, K) || i.push(K);
		}
	}
	if (ur && un.has(e)) return un.get(e);
	if (t) {
		var a = e;
		if (ur) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || Pr(a)) && (o = yt(a)), un.set(a, o), o;
		}
		var s = !(a.f & 512) && !fr && K !== null && !!(K.f & 512), c = (a.f & se) === 0;
		Er(a) && (s && (a.f |= 512), bt(a)), s && !c && (St(a), Nr(a));
	}
	if (Et?.has(e)) return Et.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function Nr(e) {
	if (e.f |= 512, e.deps !== null) for (let n of e.deps) {
		var t = n.reactions;
		t === null ? n.reactions = [e] : f.call(t, e) || t.push(e), n.f & 2 && !(n.f & 512) && (St(n), Nr(n));
	}
}
function Pr(e) {
	if (e.v === s) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (un.has(t) || t.f & 2 && Pr(t)) return !0;
	return !1;
}
function Fr(e) {
	var t = fr;
	try {
		return fr = !0, e();
	} finally {
		fr = t;
	}
}
// node_modules/svelte/src/internal/client/dom/elements/events.js
var Ir = Symbol("events"), Lr = /* @__PURE__ */ new Set(), Rr = /* @__PURE__ */ new Set();
function zr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Wr.call(t, e), !e.cancelBubble) return ct(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, rt(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function Br(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = zr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Vn(() => {
		o.__removed = !0, t.removeEventListener(e, o, a);
	});
}
function Y(e, t, n) {
	(t[Ir] ?? (t[Ir] = {}))[e] = n;
}
function Vr(e) {
	for (var t = 0; t < e.length; t++) Lr.add(e[t]);
	for (var n of Rr) n(e);
}
var Hr = null, Ur = !1;
function Wr(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	Hr = e, Ur || (Ur = !0, setTimeout(() => {
		Ur = !1, Hr = null;
	}));
	var o = 0, s = Hr === e && e[Ir];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[Ir] = t;
			return;
		}
		var l = i.indexOf(t);
		if (l === -1) return;
		c <= l && (o = c);
	}
	if (a = i[o] || e.target, a !== t) {
		h(e, "currentTarget", {
			configurable: !0,
			get() {
				return a || n;
			}
		});
		var u = K, d = q;
		pr(null), mr(null);
		try {
			for (var f, p = []; a !== null && a !== t;) {
				try {
					var m = a[Ir]?.[r];
					m == null || a.disabled && e.target !== a || m.call(a, e);
				} catch (e) {
					f ? p.push(e) : f = e;
				}
				if (e.cancelBubble) break;
				o++, a = o < i.length ? i[o] : null;
			}
			if (f) {
				for (let e of p) queueMicrotask(() => {
					throw e;
				});
				throw f;
			}
		} finally {
			e[Ir] = t, delete e.currentTarget, pr(u), mr(d);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var Gr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Kr(e) {
	return Gr?.createHTML(e) ?? e;
}
function qr(e) {
	var t = Nn("template");
	return t.innerHTML = Kr(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function Jr(e, t) {
	var n = q;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function X(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (k) return Jr(A, null), A;
		i === void 0 && (i = qr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ Dn(i)));
		var t = r || Sn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ Dn(t), s = t.lastChild;
			Jr(o, s);
		} else Jr(t, t);
		return t;
	};
}
function Z(e, t) {
	if (k) {
		var n = q;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = A), Ae();
	} else e !== null && e.before(t);
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var Yr = ["touchstart", "touchmove"];
function Xr(e) {
	return Yr.includes(e);
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function Zr(e) {
	let t = 0, n = fn(0), r;
	return () => {
		Bn() && (J(n), Jn(() => (t === 0 && (r = Fr(() => e(() => vn(n)))), t += 1, () => {
			rt(() => {
				--t, t === 0 && (r?.(), r = void 0, vn(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Qr = le | ue;
function $r(e, t, n, r) {
	new hi(e, t, n, r);
}
var ei = /* @__PURE__ */ new WeakMap(), ti = /* @__PURE__ */ new WeakMap(), ni = /* @__PURE__ */ new WeakMap(), ri = /* @__PURE__ */ new WeakMap(), ii = /* @__PURE__ */ new WeakMap(), ai = /* @__PURE__ */ new WeakMap(), oi = /* @__PURE__ */ new WeakMap(), si = /* @__PURE__ */ new WeakMap(), ci = /* @__PURE__ */ new WeakMap(), li = /* @__PURE__ */ new WeakMap(), ui = /* @__PURE__ */ new WeakMap(), di = /* @__PURE__ */ new WeakMap(), fi = /* @__PURE__ */ new WeakMap(), pi = /* @__PURE__ */ new WeakMap(), mi = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakSet(), hi = class {
	constructor(e, t, n, a) {
		r(this, Q), E(this, "parent", void 0), E(this, "is_pending", !1), E(this, "transform_error", void 0), F(this, ei, void 0), F(this, ti, k ? A : null), F(this, ni, void 0), F(this, ri, void 0), F(this, ii, void 0), F(this, ai, null), F(this, oi, null), F(this, si, null), F(this, ci, null), F(this, li, 0), F(this, ui, 0), F(this, di, !1), F(this, fi, /* @__PURE__ */ new Map()), F(this, pi, null), F(this, mi, Zr(() => (L(pi, this, fn(I(li, this))), () => {
			L(pi, this, null);
		}))), L(ei, this, e), L(ni, this, t), L(ri, this, (e) => {
			var t = q;
			t.b = this, t.f |= 128, n(e);
		}), this.parent = q.b, this.transform_error = a ?? this.parent?.transform_error ?? ((e) => e), L(ii, this, Xn(() => {
			if (k) {
				let e = Ne(I(ti, this));
				Ae();
				let t = e === "[!";
				if (e.startsWith("[?")) {
					let t = JSON.parse(e.slice(2));
					i(Q, this, _i).call(this, t);
				} else t ? i(Q, this, bi).call(this) : i(Q, this, gi).call(this);
			} else i(Q, this, xi).call(this);
		}, Qr)), k && L(ei, this, A);
	}
	defer_effect(e) {
		st(e, I(fi, this));
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!I(ni, this).pending;
	}
	update_pending_count(e, t) {
		i(Q, this, wi).call(this, e, t), L(li, this, I(li, this) + e), I(pi, this) && !I(di, this) && (L(di, this, !0), rt(() => {
			L(di, this, !1), I(pi, this) && gn(I(pi, this), I(li, this));
		}));
	}
	get_effect_pending() {
		return I(mi, this).call(this), J(I(pi, this));
	}
	error(e) {
		if (e === o || !I(ni, this).onerror && !I(ni, this).failed) throw e;
		R?.is_fork ? (I(ai, this) && R.skip_effect(I(ai, this)), I(oi, this) && R.skip_effect(I(oi, this)), I(si, this) && R.skip_effect(I(si, this)), R.oncommit(() => {
			i(Q, this, yi).call(this) || i(Q, this, Ti).call(this, e);
		})) : i(Q, this, Ti).call(this, e);
	}
};
function gi() {
	try {
		L(ai, this, Qn(() => I(ri, this).call(this, I(ei, this))));
	} catch (e) {
		this.error(e);
	}
}
function _i(e) {
	let t = I(ni, this).failed, { reset: n, invoke_onerror: r } = i(Q, this, vi).call(this, e);
	rt(r), t && L(si, this, Qn(() => {
		t(I(ei, this), () => e, () => n);
	}));
}
function vi(e) {
	var t = !1, n = !1;
	let r = () => {
		i(Q, this, yi).call(this) || (t ? Oe() : (t = !0, n && Ye(), I(si, this) !== null && ir(I(si, this), () => {
			L(si, this, null);
		}), i(Q, this, Ci).call(this, () => {
			i(Q, this, xi).call(this);
		})));
	};
	return {
		reset: r,
		invoke_onerror: () => {
			if (!i(Q, this, yi).call(this)) try {
				n = !0, I(ni, this).onerror?.(e, r), n = !1;
			} catch (e) {
				In(e, I(ii, this) && I(ii, this).parent);
			}
		}
	};
}
function yi() {
	return (I(ii, this).f & (oe | ce)) !== 0;
}
function bi() {
	let e = I(ni, this).pending;
	e && (this.is_pending = !0, L(oi, this, Qn(() => e(I(ei, this)))), rt(() => {
		if (!i(Q, this, yi).call(this)) {
			var e = L(ci, this, document.createDocumentFragment()), t = En(), n = !1;
			e.append(t), L(ai, this, i(Q, this, Ci).call(this, () => {
				try {
					return Qn(() => I(ri, this).call(this, t));
				} catch (e) {
					try {
						this.error(e), n = !0;
					} catch (e) {
						In(e, I(ii, this).parent);
					}
					return null;
				}
			})), I(ai, this) === null ? (L(ci, this, null), n && i(Q, this, Si).call(this, R)) : I(ui, this) === 0 && (I(ei, this).before(e), L(ci, this, null), ir(I(oi, this), () => {
				L(oi, this, null);
			}), i(Q, this, Si).call(this, R));
		}
	}));
}
function xi() {
	try {
		if (this.is_pending = this.has_pending_snippet(), L(ui, this, 0), L(li, this, 0), L(ai, this, Qn(() => {
			I(ri, this).call(this, I(ei, this));
		})), I(ui, this) > 0) {
			var e = L(ci, this, document.createDocumentFragment());
			cr(I(ai, this), e);
			let t = I(ni, this).pending;
			L(oi, this, Qn(() => t(I(ei, this))));
		} else i(Q, this, Si).call(this, R);
	} catch (e) {
		this.error(e);
	}
}
function Si(e) {
	this.is_pending = !1, e.transfer_reactions(I(fi, this));
}
function Ci(e) {
	var t = q, n = K, r = N;
	mr(I(ii, this)), pr(I(ii, this)), Xe(I(ii, this).ctx);
	try {
		return Gt.ensure(), e();
	} finally {
		mr(t), pr(n), Xe(r);
	}
}
function wi(e, t) {
	if (this.has_pending_snippet()) L(ui, this, I(ui, this) + e), I(ui, this) === 0 && (i(Q, this, Si).call(this, t), I(oi, this) && ir(I(oi, this), () => {
		L(oi, this, null);
	}), I(ci, this) && (I(ei, this).before(I(ci, this)), L(ci, this, null)));
	else if (this.parent) {
		var n;
		i(Q, n = this.parent, wi).call(n, e, t);
	}
}
function Ti(e) {
	I(ai, this) && (G(I(ai, this)), L(ai, this, null)), I(oi, this) && (G(I(oi, this)), L(oi, this, null)), I(si, this) && (G(I(si, this)), L(si, this, null)), k && (j(I(ti, this)), je(), j(Me()));
	let t = I(ni, this).failed, n = (e) => {
		if (i(Q, this, yi).call(this)) return;
		let { reset: n, invoke_onerror: r } = i(Q, this, vi).call(this, e);
		r(), t && !i(Q, this, yi).call(this) && L(si, this, i(Q, this, Ci).call(this, () => {
			try {
				return Qn(() => {
					var r = q;
					r.b = this, r.f |= 128, t(I(ei, this), () => e, () => n);
				});
			} catch (e) {
				return In(e, I(ii, this).parent), null;
			}
		}));
	};
	rt(() => {
		if (!i(Q, this, yi).call(this)) {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				In(e, I(ii, this) && I(ii, this).parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => In(e, I(ii, this) && I(ii, this).parent)) : n(t);
		}
	});
}
function Ei(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[Ce] ?? (e[Ce] = e.nodeValue)) && (e[Ce] = n, e.nodeValue = `${n}`);
}
function Di(e, t) {
	return Ai(e, t);
}
function Oi(e, t) {
	Tn(), t.intro = t.intro ?? !1;
	let n = t.target, r = k, i = A;
	try {
		for (var a = /* @__PURE__ */ Dn(n); a && (a.nodeType !== 8 || a.data !== "[");) a = /* @__PURE__ */ On(a);
		if (!a) throw o;
		ke(!0), j(a);
		let r = Ai(e, {
			...t,
			anchor: a
		});
		return ke(!1), r;
	} catch (r) {
		if (r instanceof Error && r.message.split("\n").some((e) => e.startsWith("https://svelte.dev/e/"))) throw r;
		return r !== o && console.warn("Failed to hydrate: ", r), t.recover === !1 && We(), Tn(), jn(n), ke(!1), Di(e, t);
	} finally {
		ke(r), j(i);
	}
}
var ki = /* @__PURE__ */ new Map();
function Ai(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: s = !0, transformError: c }) {
	Tn();
	var l = void 0, u = Gn(() => {
		var s = n ?? t.appendChild(En());
		$r(s, { pending: () => {} }, (t) => {
			Ze({});
			var n = N;
			if (a && (n.c = a), i && (r.$$events = i), k && Jr(t, null), l = e(t, r) || $e(), k && (q.nodes.end = A, A === null || A.nodeType !== 8 || A.data !== "]")) throw De(), o;
			Qe();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = Xr(r);
					for (let e of [t, document]) {
						var a = ki.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), ki.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Wr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(p(Lr)), Rr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = ki.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Wr), r.delete(e), r.size === 0 && ki.delete(n)) : r.set(e, i);
			}
			Rr.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return ji.set(l, u), l;
}
var ji = /* @__PURE__ */ new WeakMap();
function Mi(e, t) {
	let n = ji.get(e);
	return n ? (ji.delete(e), n(t)) : Promise.resolve();
}
// node_modules/svelte/src/internal/client/dom/blocks/branches.js
var Ni = /* @__PURE__ */ new WeakMap(), Pi = /* @__PURE__ */ new WeakMap(), Fi = /* @__PURE__ */ new WeakMap(), Ii = /* @__PURE__ */ new WeakMap(), Li = /* @__PURE__ */ new WeakMap(), Ri = /* @__PURE__ */ new WeakMap(), zi = /* @__PURE__ */ new WeakMap(), Bi = class {
	constructor(e, t = !0) {
		E(this, "anchor", void 0), F(this, Ni, /* @__PURE__ */ new Map()), F(this, Pi, /* @__PURE__ */ new Map()), F(this, Fi, /* @__PURE__ */ new Map()), F(this, Ii, /* @__PURE__ */ new Set()), F(this, Li, !0), F(this, Ri, (e) => {
			if (I(Ni, this).has(e)) {
				var t = I(Ni, this).get(e), n = I(Pi, this).get(t);
				if (n) or(n), I(Ii, this).delete(t);
				else {
					var r = I(Fi, this).get(t);
					r && (or(r.effect), I(Pi, this).set(t, r.effect), I(Fi, this).delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
				}
				for (let [t, n] of I(Ni, this)) {
					if (I(Ni, this).delete(t), t === e) break;
					let r = I(Fi, this).get(n);
					r && (G(r.effect), I(Fi, this).delete(n));
				}
				for (let [e, r] of I(Pi, this)) {
					if (e === t || I(Ii, this).has(e)) continue;
					let i = () => {
						if (Array.from(I(Ni, this).values()).includes(e)) {
							var t = document.createDocumentFragment();
							cr(r, t), t.append(En()), I(Fi, this).set(e, {
								effect: r,
								fragment: t
							});
						} else G(r);
						I(Ii, this).delete(e), I(Pi, this).delete(e);
					};
					I(Li, this) || !n ? (I(Ii, this).add(e), ir(r, i, !1)) : i();
				}
			}
		}), F(this, zi, (e) => {
			I(Ni, this).delete(e);
			let t = Array.from(I(Ni, this).values());
			for (let [e, n] of I(Fi, this)) t.includes(e) || (G(n.effect), I(Fi, this).delete(e));
		}), this.anchor = e, L(Li, this, t);
	}
	ensure(e, t) {
		var n = R, r = Mn();
		if (t && !I(Pi, this).has(e) && !I(Fi, this).has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = En();
				i.append(a), I(Fi, this).set(e, {
					effect: Qn(() => t(a)),
					fragment: i
				});
			} else I(Pi, this).set(e, Qn(() => t(this.anchor)));
		}
		if (I(Ni, this).set(n, e), r) {
			for (let [t, r] of I(Pi, this)) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of I(Fi, this)) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(I(Ri, this)), n.ondiscard(I(zi, this));
		} else k && (this.anchor = A), I(Ri, this).call(this, n);
	}
};
function Vi(e) {
	N === null && Le("onMount"), Hn(() => {
		let t = Fr(e);
		if (typeof t == "function") return t;
	});
}
function Hi(e) {
	N === null && Le("onDestroy"), Vi(() => () => Fr(e));
}
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function Ui(e, t, n = !1) {
	var r;
	k && (r = A, Ae());
	var i = new Bi(e), a = n ? le : 0;
	function o(e, t) {
		if (k) {
			var n = Ne(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Me();
				j(a), i.anchor = a, ke(!1), i.ensure(e, t), ke(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	Xn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/key.js
var Wi = Symbol("NaN");
function Gi(e, t, n) {
	k && Ae();
	var r = new Bi(e), i = !et();
	Xn(() => {
		var e = t();
		e !== e && (e = Wi), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function Ki(e, t) {
	return t;
}
function qi(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		ir(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					Ji(e, p(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var c = r.length === 0 && n !== null && e.pending.size === 0;
		if (c) {
			var l = n, u = l.parentNode;
			jn(u), u.append(l), e.items.clear();
		}
		Ji(e, t, !c);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ?? (e.outrogroups = /* @__PURE__ */ new Set())).add(a);
}
function Ji(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= fe, cr(a, document.createDocumentFragment())) : G(t[i], n);
	}
}
var Yi;
function Xi(e, t, n, r, i, a = null) {
	var o = e, s = /* @__PURE__ */ new Map();
	if (t & 4) {
		var c = e;
		o = k ? j(/* @__PURE__ */ Dn(c)) : c.appendChild(En());
	}
	k && Ae();
	var l = null, d = /* @__PURE__ */ _t(() => {
		var e = n();
		return u(e) ? e : e == null ? [] : p(e);
	}), f = /* @__PURE__ */ new Map(), m = !0;
	function h(e) {
		if (!(_.effect.f & 16384)) {
			_.pending.delete(e);
			var n = J(d);
			_.fallback = l, Qi(_, n, o, t, r), l !== null && (n.length === 0 ? l.f & 33554432 ? (l.f ^= fe, ea(l, null, o)) : or(l) : ir(l, () => {
				l = null;
			}));
		}
	}
	function g(e) {
		_.pending.delete(e);
	}
	var _ = {
		effect: Xn(() => {
			var e = J(d), c = e.length;
			let u = !1;
			k && Ne(o) === "[!" != (c === 0) && (o = Me(), j(o), ke(!1), u = !0);
			for (var p = /* @__PURE__ */ new Set(), _ = R, v = Mn(), y = 0; y < c; y += 1) {
				k && A.nodeType === 8 && A.data === "]" && (o = A, u = !0, ke(!1));
				var b = e[y], x = r(b, y), S = m ? null : s.get(x);
				S ? (S.v && gn(S.v, b), S.i && gn(S.i, y), v && _.unskip_effect(S.e)) : (S = $i(s, m ? o : Yi ?? (Yi = En()), b, x, y, i, t, n), m || (S.e.f |= fe), s.set(x, S)), p.add(x);
			}
			if (c === 0 && a && !l && (m ? l = Qn(() => a(o)) : (l = Qn(() => a(Yi ?? (Yi = En()))), l.f |= fe)), c > p.size && ze("", "", ""), k && c > 0 && j(Me()), !m) {
				if (f.set(_, p), v) {
					for (let [e, t] of s) p.has(e) || _.skip_effect(t.e);
					_.oncommit(h), _.ondiscard(g);
				} else h(_);
			}
			u && ke(!0), J(d);
		}),
		flags: t,
		items: s,
		pending: f,
		outrogroups: null,
		fallback: l
	};
	m = !1, k && (o = A);
}
function Zi(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Qi(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, s = e.items, c = Zi(e.effect.first), l, u = null, d, f = [], m = [], h, g, _, v;
	if (a) for (v = 0; v < o; v += 1) h = t[v], g = i(h, v), _ = s.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (d ?? (d = /* @__PURE__ */ new Set())).add(_));
	for (v = 0; v < o; v += 1) {
		if (h = t[v], g = i(h, v), _ = s.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (or(_), a && (_.nodes?.a?.unfix(), (d ?? (d = /* @__PURE__ */ new Set())).delete(_))), _.f & 33554432) {
			if (_.f ^= fe, _ === c) ea(_, null, n);
			else {
				var y = u ? u.next : c;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), ta(e, u, _), ta(e, _, y), ea(_, y, n), u = _, f = [], m = [], c = Zi(u.next);
				continue;
			}
		}
		if (_ !== c) {
			if (l !== void 0 && l.has(_)) {
				if (f.length < m.length) {
					var b = m[0], x;
					u = b.prev;
					var S = f[0], C = f[f.length - 1];
					for (x = 0; x < f.length; x += 1) ea(f[x], b, n);
					for (x = 0; x < m.length; x += 1) l.delete(m[x]);
					ta(e, S.prev, C.next), ta(e, u, S), ta(e, C, b), c = b, u = C, --v, f = [], m = [];
				} else l.delete(_), ea(_, c, n), ta(e, _.prev, _.next), ta(e, _, u === null ? e.effect.first : u.next), ta(e, u, _), u = _;
				continue;
			}
			for (f = [], m = []; c !== null && c !== _;) (l ?? (l = /* @__PURE__ */ new Set())).add(c), m.push(c), c = Zi(c.next);
			if (c === null) continue;
		}
		_.f & 33554432 || f.push(_), u = _, c = Zi(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Ji(e, p(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (c !== null || l !== void 0) {
		var w = [];
		if (l !== void 0) for (_ of l) _.f & 8192 || w.push(_);
		for (; c !== null;) !(c.f & 8192) && c !== e.fallback && w.push(c), c = Zi(c.next);
		var T = w.length;
		if (T > 0) {
			var ee = r & 4 && o === 0 ? n : null;
			if (a) {
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.fix();
			}
			qi(e, w, ee);
		}
	}
	a && rt(() => {
		if (d !== void 0) for (_ of d) _.nodes?.a?.apply();
	});
}
function $i(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? fn(n) : /* @__PURE__ */ pn(n, !1, !1) : null, l = o & 2 ? fn(i) : null;
	return {
		v: c,
		i: l,
		e: Qn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function ea(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ On(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function ta(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function na(e, t, n = !1, r = !1, i = !1, a = !1) {
	var s = e, u = "";
	if (n) {
		var d = e;
		k && (s = j(/* @__PURE__ */ Dn(d)));
	}
	Yn(() => {
		var e = q;
		if (u === (u = t() ?? "")) k && Ae();
		else if (n && !k) e.nodes = null, d.innerHTML = u, u !== "" && Jr(/* @__PURE__ */ Dn(d), d.lastChild);
		else if (e.nodes !== null && (nr(e.nodes.start, e.nodes.end), e.nodes = null), u !== "") {
			if (k) {
				for (var a = A.data, f = Ae(), p = f; f !== null && (f.nodeType !== 8 || f.data !== "");) p = f, f = /* @__PURE__ */ On(f);
				if (f === null) throw De(), o;
				Jr(A, p), s = j(f);
			} else {
				var m = Nn(r ? "svg" : i ? "math" : "template", r ? c : i ? l : void 0);
				m.innerHTML = u;
				var h = r || i ? m : m.content;
				if (Jr(/* @__PURE__ */ Dn(h), h.lastChild), r || i) for (; /* @__PURE__ */ Dn(h);) s.before(/* @__PURE__ */ Dn(h));
				else s.before(h);
			}
		}
	});
}
// node_modules/svelte/src/internal/client/dom/css.js
function ra(e, t) {
	Kn(() => {
		e = q?.parent?.nodes?.start ?? e;
		var n = e.getRootNode(), r = n.host ? n : n.head ?? n.ownerDocument.head;
		if (!r.querySelector("#" + t.hash)) {
			let e = Nn("style");
			e.id = t.hash, e.textContent = t.code, r.appendChild(e);
		}
	});
}
// node_modules/svelte/src/internal/client/dom/elements/attachments.js
function ia(e, t) {
	var n = void 0, r;
	Zn(() => {
		n !== (n = t()) && (r && (G(r), r = null), n && (r = Qn(() => {
			Kn(() => n(e));
		})));
	});
}
// node_modules/svelte/src/internal/shared/attributes.js
var aa = [..." 	\n\r\f\xA0\v﻿"];
function oa(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || aa.includes(r[o - 1])) && (s === r.length || aa.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function sa(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function ca(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function la(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(ca)), i && c.push(...Object.keys(i).map(ca));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = ca(e.substring(l, u).trim());
							if (!c.includes(p)) {
								f !== ";" && d++;
								var m = e.substring(l, d).trim();
								n += " " + m + ";";
							}
						}
						l = d + 1, u = -1;
					}
				}
			}
		}
		return r && (n += sa(r)), i && (n += sa(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/class.js
function ua(e, t, n, r, i, a) {
	var o = e[xe];
	if (k || o !== n || o === void 0) {
		var s = oa(n, r, a);
		k && s === e.getAttribute("class") || (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[xe] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function da(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function fa(e, t, n, r) {
	var i = e[Se];
	if (k || i !== t) {
		var a = la(t, r);
		k && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[Se] = t;
	} else r && (Array.isArray(r) ? (da(e, n?.[0], r[0]), da(e, n?.[1], r[1], "important")) : da(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var pa = Symbol("is custom element"), ma = Symbol("is html"), ha = Te ? "link" : "LINK";
function ga(e, t, n, r) {
	var i = _a(e);
	if (!(k && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ha))) {
		var a = i[t];
		a !== (i[t] = n) && (t === "loading" && (e[ye] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && ya(e).has(t) ? e[t] = n : (!k || typeof n != "number" && typeof n != "boolean" || a !== String(n)) && e.setAttribute(t, n));
	}
}
function _a(e) {
	return e[be] ?? (e[be] = {
		[pa]: e.nodeName.includes("-"),
		[ma]: e.namespaceURI === "http://www.w3.org/1999/xhtml"
	});
}
var va = /* @__PURE__ */ new Map();
function ya(e) {
	var t = e.getAttribute("is") || e.nodeName, n = va.get(t);
	if (n) return n;
	va.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = _(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.add(o);
		i = b(i);
	}
	return n;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/size.js
var ba, xa = /* @__PURE__ */ new WeakMap(), Sa = /* @__PURE__ */ new WeakMap(), Ca = /* @__PURE__ */ new WeakMap(), wa = /* @__PURE__ */ new WeakSet(), Ta = class {
	constructor(e) {
		r(this, wa), F(this, xa, /* @__PURE__ */ new WeakMap()), F(this, Sa, void 0), F(this, Ca, void 0), L(Ca, this, e);
	}
	observe(e, t) {
		var n = I(xa, this).get(e) || /* @__PURE__ */ new Set();
		return n.add(t), I(xa, this).set(e, n), i(wa, this, Ea).call(this).observe(e, I(Ca, this)), () => {
			var n = I(xa, this).get(e);
			n.delete(t), n.size === 0 && (I(xa, this).delete(e), I(Sa, this).unobserve(e));
		};
	}
};
ba = Ta;
function Ea() {
	return I(Sa, this) ?? L(Sa, this, new ResizeObserver((e) => {
		for (var t of e) {
			ba.entries.set(t.target, t);
			for (var n of I(xa, this).get(t.target) || []) n(t);
		}
	}));
}
E(Ta, "entries", /* @__PURE__ */ new WeakMap());
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Da(e, t) {
	return e === t || e?.[ge] === t;
}
function Oa(e = $e(), t, n, r) {
	var i = N.r, a = q;
	return Kn(() => {
		var o, s;
		return Jn(() => {
			o = s, s = r?.() || [], Fr(() => {
				Da(n(...s), e) || (t(e, ...s), o && Da(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Da(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var ka = !1;
function Aa(e) {
	var t = ka;
	try {
		return ka = !1, [e(), ka];
	} finally {
		ka = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/props.js
var ja = {
	get(e, t) {
		let n = e.props.length;
		for (; n--;) {
			let r = e.props[n];
			if (S(r) && (r = r()), typeof r == "object" && r && t in r) return r[t];
		}
	},
	set(e, t, n) {
		let r = e.props.length;
		for (; r--;) {
			let i = e.props[r];
			S(i) && (i = i());
			let a = g(i, t);
			if (a && a.set) return a.set(n), !0;
		}
		return !1;
	},
	getOwnPropertyDescriptor(e, t) {
		let n = e.props.length;
		for (; n--;) {
			let r = e.props[n];
			if (S(r) && (r = r()), typeof r == "object" && r && t in r) {
				let e = g(r, t);
				return e && !e.configurable && (e.configurable = !0), e;
			}
		}
	},
	has(e, t) {
		if (t === ge || t === ve) return !1;
		for (let n of e.props) if (S(n) && (n = n()), n != null && t in n) return !0;
		return !1;
	},
	ownKeys(e) {
		let t = [];
		for (let n of e.props) if (S(n) && (n = n()), n) {
			for (let e in n) t.includes(e) || t.push(e);
			for (let e of Object.getOwnPropertySymbols(n)) t.includes(e) || t.push(e);
		}
		return t;
	}
};
function Ma(...e) {
	return new Proxy({ props: e }, ja);
}
function $(e, t, n, r) {
	var i = !0, a = !!(n & 8), o = !!(n & 16), s = r, c = !0, l = void 0, u = () => o && i ? (l ?? (l = /* @__PURE__ */ pt(r)), J(l)) : (c && (c = !1, s = o ? Fr(r) : r), s);
	let d;
	if (a) {
		var f = ge in e || ve in e;
		d = g(e, t)?.set ?? (f && t in e ? (n) => e[t] = n : void 0);
	}
	var p, m = !1;
	a ? [p, m] = Aa(() => e[t]) : p = e[t], p === void 0 && r !== void 0 && (p = u(), d && (i && Ge(t), d(p)));
	var h = i ? () => {
		var n = e[t];
		return n === void 0 ? u() : (c = !0, n);
	} : () => {
		var n = e[t];
		return n !== void 0 && (s = void 0), n === void 0 ? s : n;
	};
	if (i && !(n & 4)) return h;
	if (d) {
		var _ = e.$$legacy;
		return (function(e, t) {
			return arguments.length > 0 ? ((!i || !t || _ || m) && d(t ? h() : e), e) : h();
		});
	}
	var v = !1, y = (n & 1 ? pt : _t)(() => (v = !1, h()));
	a && J(y);
	var b = q;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? J(y) : i && a ? bn(e) : e;
			return H(y, n), v = !0, s !== void 0 && (s = n), e;
		}
		return ur && v || b.f & 16384 ? y.v : J(y);
	});
}
// node_modules/svelte/src/legacy/legacy-client.js
function Na(e) {
	return new Ia(e);
}
var Pa = /* @__PURE__ */ new WeakMap(), Fa = /* @__PURE__ */ new WeakMap(), Ia = class {
	constructor(e) {
		F(this, Pa, void 0), F(this, Fa, void 0);
		var t = /* @__PURE__ */ new Map(), n = (e, n) => {
			var r = /* @__PURE__ */ pn(n, !1, !1);
			return t.set(e, r), r;
		};
		let r = new Proxy({
			...e.props || {},
			$$events: {}
		}, {
			get(e, r) {
				return J(t.get(r) ?? n(r, Reflect.get(e, r)));
			},
			has(e, r) {
				return r === ve || (J(t.get(r) ?? n(r, Reflect.get(e, r))), Reflect.has(e, r));
			},
			set(e, r, i) {
				return H(t.get(r) ?? n(r, i), i), Reflect.set(e, r, i);
			}
		});
		L(Fa, this, (e.hydrate ? Oi : Di)(e.component, {
			target: e.target,
			anchor: e.anchor,
			props: r,
			context: e.context,
			intro: e.intro ?? !1,
			recover: e.recover,
			transformError: e.transformError
		})), e?.props?.$$host && e.sync !== !1 || B(), L(Pa, this, r.$$events);
		for (let e of Object.keys(I(Fa, this))) e !== "$set" && e !== "$destroy" && e !== "$on" && h(this, e, {
			get() {
				return I(Fa, this)[e];
			},
			set(t) {
				I(Fa, this)[e] = t;
			},
			enumerable: !0
		});
		I(Fa, this).$set = (e) => {
			Object.assign(r, e);
		}, I(Fa, this).$destroy = () => {
			Mi(I(Fa, this));
		};
	}
	$set(e) {
		I(Fa, this).$set(e);
	}
	$on(e, t) {
		I(Pa, this)[e] = I(Pa, this)[e] || [];
		let n = (...e) => t.call(this, ...e);
		return I(Pa, this)[e].push(n), () => {
			I(Pa, this)[e] = I(Pa, this)[e].filter((e) => e !== n);
		};
	}
	$destroy() {
		I(Fa, this).$destroy();
	}
}, La;
typeof HTMLElement == "function" && (La = class extends HTMLElement {
	constructor(e, t, n) {
		super(), E(this, "$$ctor", void 0), E(this, "$$s", void 0), E(this, "$$c", void 0), E(this, "$$cn", !1), E(this, "$$d", {}), E(this, "$$r", !1), E(this, "$$p_d", {}), E(this, "$$l", {}), E(this, "$$l_u", /* @__PURE__ */ new Map()), E(this, "$$me", void 0), E(this, "$$shadowRoot", null), this.$$ctor = e, this.$$s = t, n && (this.$$shadowRoot = this.attachShadow(n));
	}
	addEventListener(e, t, n) {
		if (this.$$l[e] = this.$$l[e] || [], this.$$l[e].push(t), this.$$c) {
			let n = this.$$c.$on(e, t);
			this.$$l_u.set(t, n);
		}
		super.addEventListener(e, t, n);
	}
	removeEventListener(e, t, n) {
		if (super.removeEventListener(e, t, n), this.$$c) {
			let e = this.$$l_u.get(t);
			e && (e(), this.$$l_u.delete(t));
		}
	}
	async connectedCallback() {
		if (this.$$cn = !0, !this.$$c) {
			if (await Promise.resolve(), !this.$$cn || this.$$c) return;
			function e(e) {
				return (t) => {
					let n = Nn("slot");
					e !== "default" && (n.name = e), Z(t, n);
				};
			}
			let t = {}, n = za(this);
			for (let r of this.$$s) r in n && (r === "default" && !this.$$d.children ? (this.$$d.children = e(r), t.default = !0) : t[r] = e(r));
			for (let e of this.attributes) {
				let t = this.$$g_p(e.name);
				t in this.$$d || (this.$$d[t] = Ra(t, e.value, this.$$p_d, "toProp"));
			}
			for (let e in this.$$p_d) !(e in this.$$d) && this[e] !== void 0 && (this.$$d[e] = this[e], delete this[e]);
			this.$$c = Na({
				component: this.$$ctor,
				target: this.$$shadowRoot || this,
				props: {
					...this.$$d,
					$$slots: t,
					$$host: this
				}
			}), this.$$me = Wn(() => {
				Jn(() => {
					this.$$r = !0;
					for (let e of m(this.$$c)) {
						if (!this.$$p_d[e]?.reflect) continue;
						this.$$d[e] = this.$$c[e];
						let t = Ra(e, this.$$d[e], this.$$p_d, "toAttribute");
						t == null ? this.removeAttribute(this.$$p_d[e].attribute || e) : this.setAttribute(this.$$p_d[e].attribute || e, t);
					}
					this.$$r = !1;
				});
			});
			for (let e in this.$$l) for (let t of this.$$l[e]) {
				let n = this.$$c.$on(e, t);
				this.$$l_u.set(t, n);
			}
			this.$$l = {};
		}
	}
	attributeChangedCallback(e, t, n) {
		this.$$r || (e = this.$$g_p(e), this.$$d[e] = Ra(e, n, this.$$p_d, "toProp"), this.$$c?.$set({ [e]: this.$$d[e] }));
	}
	disconnectedCallback() {
		this.$$cn = !1, Promise.resolve().then(() => {
			!this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$me(), this.$$c = void 0);
		});
	}
	$$g_p(e) {
		return m(this.$$p_d).find((t) => this.$$p_d[t].attribute === e || !this.$$p_d[t].attribute && t.toLowerCase() === e) || e;
	}
});
function Ra(e, t, n, r) {
	let i = n[e]?.type;
	if (t = i === "Boolean" && typeof t != "boolean" ? t != null : t, !r || !n[e]) return t;
	if (r === "toAttribute") switch (i) {
		case "Object":
		case "Array": return t == null ? null : JSON.stringify(t);
		case "Boolean": return t ? "" : null;
		case "Number": return t ?? null;
		default: return t;
	}
	else switch (i) {
		case "Object":
		case "Array": return t && JSON.parse(t);
		case "Boolean": return t;
		case "Number": return t == null ? t : +t;
		default: return t;
	}
}
function za(e) {
	let t = {};
	return e.childNodes.forEach((e) => {
		t[e.slot || "default"] = !0;
	}), t;
}
function Ba(e, t, n, r, i, a) {
	let o = class extends La {
		constructor() {
			super(e, n, i), this.$$p_d = t;
		}
		static get observedAttributes() {
			return m(t).map((e) => (t[e].attribute || e).toLowerCase());
		}
	};
	return m(t).forEach((e) => {
		h(o.prototype, e, {
			get() {
				return this.$$c && e in this.$$c ? this.$$c[e] : this.$$d[e];
			},
			set(n) {
				n = Ra(e, n, t), this.$$d[e] = n;
				var r = this.$$c;
				r && (g(r, e)?.get ? r[e] = n : r.$set({ [e]: n }));
			}
		});
	}), r.forEach((e) => {
		h(o.prototype, e, { get() {
			return this.$$c?.[e];
		} });
	}), a && (o = a(o)), e.element = o, o;
}
// src/lib/playback-math.ts
var Va = [
	.1,
	.25,
	.5,
	.75,
	1,
	1.25,
	1.5,
	1.75,
	2
];
function Ha(e, t) {
	return e * Math.min(t, 1);
}
function Ua(e, t, n, r) {
	return Math.min(Math.max(e + n * t, 0), r);
}
function Wa(e, t, n, r, i = 0) {
	return Ka(e - Math.trunc(t / n), i, r - 1);
}
function Ga(e, t) {
	let n = 0, r = Infinity;
	return e.forEach((e, i) => {
		let a = Math.abs(e - t);
		a < r && (n = i, r = a);
	}), n;
}
function Ka(e, t, n) {
	return Math.min(Math.max(e, t), n);
}
function qa(e) {
	let t = Math.round(Math.abs(e) * 10) / 10;
	return String(t);
}
function Ja(e, t) {
	return `${e < 0 ? "−" : "+"}${qa(t)}秒`;
}
function Ya(e) {
	return `${Math.round(e * 100) / 100}x`;
}
function Xa(e) {
	(!Number.isFinite(e) || e < 0) && (e = 0);
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = String(i).padStart(2, "0");
	return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${a}` : `${r}:${a}`;
}
function Za(e) {
	if (!e) return null;
	let t = e.split(/[\s,]+/).filter(Boolean).map(Number).filter((e) => Number.isFinite(e) && e > 0);
	return t.length === 0 ? null : [...new Set(t)].sort((e, t) => e - t);
}
function Qa(e) {
	if (e == null || e.trim() === "") return null;
	let t = parseFloat(e);
	if (!Number.isFinite(t)) return null;
	let n = e.includes("%") || t > 1 ? t / 100 : t;
	return n >= 0 && n <= 1 ? n : null;
}
function $a(e, t, n) {
	return e < t ? "left" : e > n ? "right" : "center";
}
// src/components/icons.ts
var eo = (e) => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${e}</svg>`, to = {
	play: eo("<path fill=\"currentColor\" d=\"M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z\"/>"),
	pause: eo("<path fill=\"currentColor\" d=\"M7 5h3.5v14H7zM13.5 5H17v14h-3.5z\"/>"),
	folder: eo("<path fill=\"currentColor\" d=\"M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2Z\"/>"),
	fullscreen: eo("<path fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" d=\"M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5\"/>"),
	exitFullscreen: eo("<path fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" d=\"M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5\"/>"),
	arrowLeft: eo("<path fill=\"currentColor\" d=\"M16 5.14v13.72a1 1 0 0 1-1.5.86l-11-6.86a1 1 0 0 1 0-1.72l11-6.86a1 1 0 0 1 1.5.86Z\"/>"),
	arrowRight: eo("<path fill=\"currentColor\" d=\"M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z\"/>"),
	help: eo("<circle cx=\"12\" cy=\"12\" r=\"9.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/><path fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" d=\"M9.4 9.3a2.7 2.7 0 0 1 5.2 1c0 1.8-2.6 2.3-2.6 3.9\"/><circle cx=\"12\" cy=\"17.2\" r=\"1.25\" fill=\"currentColor\"/>"),
	close: eo("<path fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" d=\"M6 6l12 12M18 6 6 18\"/>"),
	check: eo("<path fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m5 12.5 4.5 4.5L19 7.5\"/>")
}, no = /* @__PURE__ */ X("<span class=\"icon svelte-13so817\" aria-hidden=\"true\"></span>"), ro = {
	hash: "svelte-13so817",
	code: ".icon.svelte-13so817 {display:block;width:100%;height:100%;}.icon.svelte-13so817 svg {display:block;width:100%;height:100%;}"
};
function io(e, t) {
	Ze(t, !0), ra(e, ro);
	let n = $(t, "name", 7);
	var r = {
		get name() {
			return n();
		},
		set name(e) {
			n(e), B();
		}
	}, i = no();
	return na(i, () => to[n()], !0), M(i), Z(e, i), Qe(r);
}
Ba(io, { name: {} }, [], [], { mode: "open" });
// src/components/SeekBar.svelte
var ao = /* @__PURE__ */ X("<div class=\"tooltip svelte-qmop01\"> </div>"), oo = /* @__PURE__ */ X("<div role=\"slider\" tabindex=\"0\" aria-label=\"再生位置\"><div class=\"track svelte-qmop01\"><div class=\"buffer svelte-qmop01\"></div> <div class=\"progress svelte-qmop01\"></div></div> <div class=\"thumb svelte-qmop01\"></div> <!></div>"), so = {
	hash: "svelte-qmop01",
	code: ".seek.svelte-qmop01 {position:relative;flex:none;height:18px;margin:0 8px;cursor:pointer;touch-action:none;}.seek.svelte-qmop01:focus-visible {outline:2px solid #fff;outline-offset:2px;border-radius:4px;}.track.svelte-qmop01 {position:absolute;left:0;right:0;top:50%;height:3px;margin-top:-1.5px;border-radius:2px;background:rgba(255, 255, 255, 0.3);overflow:hidden;transition:height 0.1s ease,\n      margin 0.1s ease;}.active.svelte-qmop01 .track:where(.svelte-qmop01) {height:5px;margin-top:-2.5px;}.buffer.svelte-qmop01,\n  .progress.svelte-qmop01 {position:absolute;inset:0;transform-origin:0 50%;}.buffer.svelte-qmop01 {background:rgba(255, 255, 255, 0.45);}.progress.svelte-qmop01 {background:var(--svp-accent);}.thumb.svelte-qmop01 {position:absolute;top:50%;width:13px;height:13px;margin:-6.5px 0 0 -6.5px;border-radius:50%;background:var(--svp-accent);transform:scale(0.85);transition:transform 0.1s ease;}.active.svelte-qmop01 .thumb:where(.svelte-qmop01) {transform:scale(1.25);}.tooltip.svelte-qmop01 {position:absolute;bottom:22px;transform:translateX(-50%);padding:2px 6px;border-radius:4px;background:rgba(0, 0, 0, 0.75);font-size:12px;font-variant-numeric:tabular-nums;}"
};
function co(e, t) {
	Ze(t, !0), ra(e, so);
	let n = $(t, "currentTime", 7), r = $(t, "duration", 7), i = $(t, "bufferedEnd", 7), a = $(t, "seeking", 15, !1), o = $(t, "onseek", 7), s, c = null, l = /* @__PURE__ */ V(0), u = /* @__PURE__ */ gt(() => a() ? J(l) : n()), d = /* @__PURE__ */ gt(() => r() > 0 ? Ka(J(u) / r(), 0, 1) : 0), f = /* @__PURE__ */ gt(() => r() > 0 ? Ka(i() / r(), 0, 1) : 0);
	function p(e) {
		let t = s.getBoundingClientRect(), n = t.width > 0 ? Ka((e - t.left) / t.width, 0, 1) : 0;
		H(l, n * r()), o()(J(l));
	}
	function m(e) {
		if (!(r() <= 0 || c != null)) {
			e.preventDefault(), c = e.pointerId;
			try {
				s.setPointerCapture(e.pointerId);
			} catch {}
			a(!0), p(e.clientX);
		}
	}
	function h(e) {
		e.pointerId === c && p(e.clientX);
	}
	function g(e) {
		e.pointerId === c && (c = null, a(!1));
	}
	function _(e) {
		if (r() <= 0) return;
		let t = e.key === "ArrowLeft" ? n() - 5 : e.key === "ArrowRight" ? n() + 5 : e.key === "Home" ? 0 : e.key === "End" ? r() : null;
		t != null && (e.preventDefault(), o()(Ka(t, 0, r())));
	}
	var v = {
		get currentTime() {
			return n();
		},
		set currentTime(e) {
			n(e), B();
		},
		get duration() {
			return r();
		},
		set duration(e) {
			r(e), B();
		},
		get bufferedEnd() {
			return i();
		},
		set bufferedEnd(e) {
			i(e), B();
		},
		get seeking() {
			return a();
		},
		set seeking(e = !1) {
			a(e), B();
		},
		get onseek() {
			return o();
		},
		set onseek(e) {
			o(e), B();
		}
	}, y = oo();
	let b;
	ga(y, "aria-valuemin", 0);
	var x = U(y), S = U(x);
	let C;
	var w = W(S, 2);
	let T;
	M(x);
	var ee = W(x, 2);
	let te;
	var ne = W(ee, 2), E = (e) => {
		var t = ao();
		let n;
		var r = An(t, !0);
		Yn((e) => {
			n = fa(t, "", n, { left: `${J(d) * 100}%` }), Ei(r, e);
		}, [() => Xa(J(u))]), Z(e, t);
	};
	return Ui(ne, (e) => {
		a() && e(E);
	}), M(y), Oa(y, (e) => s = e, () => s), Yn((e, t, n, r) => {
		b = ua(y, 1, "seek svelte-qmop01", null, b, { active: a() }), ga(y, "aria-valuemax", e), ga(y, "aria-valuenow", t), ga(y, "aria-valuetext", `${n ?? ""} / ${r ?? ""}`), C = fa(S, "", C, { transform: `scaleX(${J(f) ?? ""})` }), T = fa(w, "", T, { transform: `scaleX(${J(d) ?? ""})` }), te = fa(ee, "", te, { left: `${J(d) * 100}%` });
	}, [
		() => Math.round(r()),
		() => Math.round(J(u)),
		() => Xa(J(u)),
		() => Xa(r())
	]), Y("pointerdown", y, m), Y("pointermove", y, h), Y("pointerup", y, g), Br("pointercancel", y, g), Br("lostpointercapture", y, g), Y("keydown", y, _), Z(e, y), Qe(v);
}
Vr([
	"pointerdown",
	"pointermove",
	"pointerup",
	"keydown"
]), Ba(co, {
	currentTime: {},
	duration: {},
	bufferedEnd: {},
	seeking: {},
	onseek: {}
}, [], [], { mode: "open" });
// src/components/SpeedMenu.svelte
var lo = /* @__PURE__ */ X("<button class=\"item svelte-1ye0ew8\" type=\"button\" role=\"menuitemradio\"><span class=\"mark svelte-1ye0ew8\"><!></span> </button>"), uo = /* @__PURE__ */ X("<div class=\"backdrop svelte-1ye0ew8\" role=\"presentation\"></div> <div class=\"menu svelte-1ye0ew8\" role=\"menu\" aria-label=\"再生速度\"><div class=\"title svelte-1ye0ew8\">再生速度</div> <!></div>", 1), fo = {
	hash: "svelte-1ye0ew8",
	code: ".backdrop.svelte-1ye0ew8 {position:absolute;inset:0;pointer-events:auto;}.menu.svelte-1ye0ew8 {position:absolute;right:calc(10px + env(safe-area-inset-right, 0px));bottom:calc(var(--svp-bar-height) + 4px + env(safe-area-inset-bottom, 0px));max-height:calc(100% - var(--svp-bar-height) - 16px);min-width:140px;padding:6px 0;overflow-y:auto;overscroll-behavior:contain;border-radius:12px;background:rgba(28, 28, 28, 0.94);box-shadow:0 6px 24px rgba(0, 0, 0, 0.4);pointer-events:auto;touch-action:pan-y;}.title.svelte-1ye0ew8 {padding:6px 16px 8px;font-size:12px;opacity:0.7;}.item.svelte-1ye0ew8 {display:flex;align-items:center;gap:10px;width:100%;padding:9px 16px;font-size:15px;text-align:left;font-variant-numeric:tabular-nums;}.item.svelte-1ye0ew8:disabled {opacity:0.35;cursor:default;}.mark.svelte-1ye0ew8 {width:18px;height:18px;visibility:hidden;}.item[aria-checked='true'].svelte-1ye0ew8 .mark:where(.svelte-1ye0ew8) {visibility:visible;}\n  @media (hover: hover) {.item.svelte-1ye0ew8:not(:disabled):hover {background:rgba(255, 255, 255, 0.14);}\n  }"
};
function po(e, t) {
	Ze(t, !0), ra(e, fo);
	let n = $(t, "rates", 7), r = $(t, "index", 7), i = $(t, "minIndex", 7), a = $(t, "onselect", 7), o = $(t, "onclose", 7), s = /* @__PURE__ */ gt(() => n().map((e, t) => ({
		rate: e,
		i: t
	})).reverse());
	var c = {
		get rates() {
			return n();
		},
		set rates(e) {
			n(e), B();
		},
		get index() {
			return r();
		},
		set index(e) {
			r(e), B();
		},
		get minIndex() {
			return i();
		},
		set minIndex(e) {
			i(e), B();
		},
		get onselect() {
			return a();
		},
		set onselect(e) {
			a(e), B();
		},
		get onclose() {
			return o();
		},
		set onclose(e) {
			o(e), B();
		}
	}, l = uo(), u = kn(l), d = W(u, 2);
	return Xi(W(U(d), 2), 17, () => J(s), ({ rate: e, i: t }) => t, (e, t) => {
		let n = () => J(t).rate, o = () => J(t).i;
		var s = lo(), c = U(s);
		io(U(c), { name: "check" }), M(c);
		var l = W(c);
		M(s), Yn((e) => {
			ga(s, "aria-checked", o() === r()), s.disabled = o() < i(), Ei(l, ` ${e ?? ""}`);
		}, [() => n() === 1 ? "1x（標準）" : Ya(n())]), Y("click", s, () => a()(o())), Z(e, s);
	}), M(d), Y("pointerdown", u, (e) => {
		e.preventDefault(), o()();
	}), Z(e, l), Qe(c);
}
Vr(["pointerdown", "click"]), Ba(po, {
	rates: {},
	index: {},
	minIndex: {},
	onselect: {},
	onclose: {}
}, [], [], { mode: "open" });
// src/components/Controls.svelte
var mo = /* @__PURE__ */ X("<button class=\"icon-btn svelte-1y71c66\" type=\"button\" aria-label=\"動画ファイルを選択\" title=\"動画ファイルを選択\"><!></button>"), ho = /* @__PURE__ */ X("<button class=\"center-play svelte-1y71c66\" type=\"button\"><!></button>"), go = /* @__PURE__ */ X("<div><div class=\"scrim top svelte-1y71c66\"></div> <div class=\"scrim bottom svelte-1y71c66\"></div> <div class=\"top-bar svelte-1y71c66\"><div class=\"title svelte-1y71c66\" part=\"title\"> </div> <!></div> <!> <div class=\"bottom-bar svelte-1y71c66\" part=\"bottom-bar\"><!> <div class=\"row svelte-1y71c66\"><div class=\"time svelte-1y71c66\"> <span class=\"sep svelte-1y71c66\">/</span> </div> <div class=\"spacer svelte-1y71c66\"></div> <button class=\"icon-btn svelte-1y71c66\" type=\"button\" aria-label=\"操作方法\" title=\"操作方法\"><!></button> <button type=\"button\" aria-haspopup=\"menu\"> </button> <button class=\"icon-btn svelte-1y71c66\" type=\"button\"><!></button></div></div> <!></div>"), _o = {
	hash: "svelte-1y71c66",
	code: ".controls.svelte-1y71c66 {position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity var(--svp-fade) ease;}.visible.svelte-1y71c66 {opacity:1;}\n  /* 表示中はボタンと下部バーだけがタップを受ける */.visible.svelte-1y71c66 button:where(.svelte-1y71c66),\n  .visible.svelte-1y71c66 .bottom-bar:where(.svelte-1y71c66) {pointer-events:auto;}.scrim.svelte-1y71c66 {position:absolute;left:0;right:0;}.scrim.top.svelte-1y71c66 {top:0;height:calc(96px + env(safe-area-inset-top, 0px));background:linear-gradient(rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0));}.scrim.bottom.svelte-1y71c66 {bottom:0;height:calc(120px + env(safe-area-inset-bottom, 0px));background:linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.72));}.top-bar.svelte-1y71c66 {position:absolute;top:0;left:0;right:0;display:flex;align-items:center;gap:8px;padding:calc(8px + env(safe-area-inset-top, 0px)) calc(8px + env(safe-area-inset-right, 0px)) 8px\n      calc(14px + env(safe-area-inset-left, 0px));}.title.svelte-1y71c66 {flex:1;min-width:0;min-height:40px;line-height:40px;font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-shadow:0 1px 2px rgba(0, 0, 0, 0.5);}.icon-btn.svelte-1y71c66 {flex:none;width:40px;height:40px;padding:9px;border-radius:50%;}.center-play.svelte-1y71c66 {position:absolute;left:50%;top:50%;width:56px;height:56px;margin:-28px 0 0 -28px;padding:15px;border-radius:50%;background:rgba(0, 0, 0, 0.45);}.bottom-bar.svelte-1y71c66 {position:absolute;left:0;right:0;bottom:0;height:calc(var(--svp-bar-height) + env(safe-area-inset-bottom, 0px));padding:0 calc(6px + env(safe-area-inset-right, 0px)) env(safe-area-inset-bottom, 0px)\n      calc(6px + env(safe-area-inset-left, 0px));display:flex;flex-direction:column;touch-action:none;}.row.svelte-1y71c66 {flex:1;display:flex;align-items:center;gap:2px;min-height:0;}.time.svelte-1y71c66 {padding-left:8px;font-size:13px;font-variant-numeric:tabular-nums;white-space:nowrap;text-shadow:0 1px 2px rgba(0, 0, 0, 0.5);}.sep.svelte-1y71c66 {margin:0 3px;opacity:0.7;}.spacer.svelte-1y71c66 {flex:1;}.speed-btn.svelte-1y71c66 {height:32px;min-width:52px;padding:0 10px;border-radius:16px;font-size:13px;font-weight:700;font-variant-numeric:tabular-nums;}.speed-btn.changed.svelte-1y71c66 {background:rgba(255, 255, 255, 0.18);}\n\n  @media (hover: hover) {.icon-btn.svelte-1y71c66:hover,\n    .speed-btn.svelte-1y71c66:hover {background:rgba(255, 255, 255, 0.14);}.center-play.svelte-1y71c66:hover {background:rgba(0, 0, 0, 0.6);}\n  }"
};
function vo(e, t) {
	Ze(t, !0), ra(e, _o);
	let n = $(t, "player", 7), r = $(t, "visible", 7), i = $(t, "filePicker", 7), a = $(t, "fullscreen", 7), o = $(t, "menuOpen", 15, !1), s = $(t, "seeking", 15, !1), c = $(t, "onpickfile", 7), l = $(t, "onselectrate", 7), u = $(t, "ontogglefullscreen", 7), d = $(t, "onhelp", 7), f = $(t, "onactivity", 7), p = /* @__PURE__ */ gt(() => n().source != null);
	Hn(() => {
		r() || o(!1);
	});
	function m(e) {
		let t = (e) => e.preventDefault();
		return e.addEventListener("touchstart", t, { passive: !1 }), () => e.removeEventListener("touchstart", t);
	}
	var h = {
		get player() {
			return n();
		},
		set player(e) {
			n(e), B();
		},
		get visible() {
			return r();
		},
		set visible(e) {
			r(e), B();
		},
		get filePicker() {
			return i();
		},
		set filePicker(e) {
			i(e), B();
		},
		get fullscreen() {
			return a();
		},
		set fullscreen(e) {
			a(e), B();
		},
		get menuOpen() {
			return o();
		},
		set menuOpen(e = !1) {
			o(e), B();
		},
		get seeking() {
			return s();
		},
		set seeking(e = !1) {
			s(e), B();
		},
		get onpickfile() {
			return c();
		},
		set onpickfile(e) {
			c(e), B();
		},
		get onselectrate() {
			return l();
		},
		set onselectrate(e) {
			l(e), B();
		},
		get ontogglefullscreen() {
			return u();
		},
		set ontogglefullscreen(e) {
			u(e), B();
		},
		get onhelp() {
			return d();
		},
		set onhelp(e) {
			d(e), B();
		},
		get onactivity() {
			return f();
		},
		set onactivity(e) {
			f(e), B();
		}
	}, g = go();
	let _;
	var v = W(U(g), 4), y = U(v), b = An(y, !0), x = W(y, 2), S = (e) => {
		var t = mo();
		io(U(t), { name: "folder" }), M(t), Y("click", t, function(...e) {
			c()?.apply(this, e);
		}), Z(e, t);
	};
	Ui(x, (e) => {
		i() && e(S);
	}), M(v);
	var C = W(v, 2), w = (e) => {
		var t = ho(), r = U(t);
		{
			let e = /* @__PURE__ */ gt(() => n().paused ? "play" : "pause");
			io(r, { get name() {
				return J(e);
			} });
		}
		M(t), Yn(() => ga(t, "aria-label", n().paused ? "再生" : "一時停止")), Y("click", t, () => n().togglePlay()), Z(e, t);
	};
	Ui(C, (e) => {
		J(p) && e(w);
	});
	var T = W(C, 2), ee = U(T);
	co(ee, {
		get currentTime() {
			return n().currentTime;
		},
		get duration() {
			return n().duration;
		},
		get bufferedEnd() {
			return n().bufferedEnd;
		},
		onseek: (e) => n().seek(e),
		get seeking() {
			return s();
		},
		set seeking(e) {
			s(e);
		}
	});
	var te = W(ee, 2), ne = U(te), E = U(ne, !0), re = W(E, 2, !0);
	M(ne);
	var D = W(ne, 4);
	io(U(D), { name: "help" }), M(D);
	var O = W(D, 2);
	let ie;
	var ae = An(O, !0), oe = W(O, 2), se = U(oe);
	{
		let e = /* @__PURE__ */ gt(() => a() ? "exitFullscreen" : "fullscreen");
		io(se, { get name() {
			return J(e);
		} });
	}
	M(oe), M(te), M(T), ia(T, () => m);
	var ce = W(T, 2), le = (e) => {
		po(e, {
			get rates() {
				return n().rates;
			},
			get index() {
				return n().rateIndex;
			},
			get minIndex() {
				return n().minRateIndex;
			},
			onselect: (e) => {
				l()(e), o(!1);
			},
			onclose: () => o(!1)
		});
	};
	return Ui(ce, (e) => {
		o() && e(le);
	}), M(g), Yn((e, t, i, s) => {
		_ = ua(g, 1, "controls svelte-1y71c66", null, _, { visible: r() }), Ei(b, n().name), Ei(E, e), Ei(re, t), ie = ua(O, 1, "speed-btn svelte-1y71c66", null, ie, { changed: n().rate !== 1 }), ga(O, "aria-expanded", o()), ga(O, "aria-label", `再生速度 ${i ?? ""}`), Ei(ae, s), ga(oe, "aria-label", a() ? "全画面を終了" : "全画面");
	}, [
		() => Xa(n().currentTime),
		() => Xa(n().duration),
		() => Ya(n().rate),
		() => Ya(n().rate)
	]), Y("pointerdown", g, function(...e) {
		f()?.apply(this, e);
	}), Y("pointerdown", T, (e) => {
		e.target.closest("button") || e.preventDefault();
	}), Y("click", D, function(...e) {
		d()?.apply(this, e);
	}), Y("click", O, () => o(!o())), Y("click", oe, function(...e) {
		u()?.apply(this, e);
	}), Z(e, g), Qe(h);
}
Vr(["pointerdown", "click"]), Ba(vo, {
	player: {},
	visible: {},
	filePicker: {},
	fullscreen: {},
	menuOpen: {},
	seeking: {},
	onpickfile: {},
	onselectrate: {},
	ontogglefullscreen: {},
	onhelp: {},
	onactivity: {}
}, [], [], { mode: "open" });
// src/components/EmptyState.svelte
var yo = /* @__PURE__ */ X("<button class=\"pick svelte-1uba7bi\" type=\"button\"><span class=\"icon svelte-1uba7bi\"><!></span>動画ファイルを選択</button>"), bo = /* @__PURE__ */ X("<div class=\"empty svelte-1uba7bi\"><div> </div> <!></div>"), xo = {
	hash: "svelte-1uba7bi",
	code: ".empty.svelte-1uba7bi {position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:16px;text-align:center;font-size:14px;color:rgba(255, 255, 255, 0.75);pointer-events:none;}.pick.svelte-1uba7bi {display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border-radius:999px;background:#fff;color:#000;font-size:15px;font-weight:700;pointer-events:auto;}.icon.svelte-1uba7bi {width:20px;height:20px;}"
};
function So(e, t) {
	Ze(t, !0), ra(e, xo);
	let n = $(t, "filePicker", 7), r = $(t, "onpickfile", 7);
	var i = {
		get filePicker() {
			return n();
		},
		set filePicker(e) {
			n(e), B();
		},
		get onpickfile() {
			return r();
		},
		set onpickfile(e) {
			r(e), B();
		}
	}, a = bo(), o = U(a), s = An(o, !0), c = W(o, 2), l = (e) => {
		var t = yo(), n = U(t);
		io(U(n), { name: "folder" }), M(n), je(), M(t), Y("click", t, function(...e) {
			r()?.apply(this, e);
		}), Z(e, t);
	};
	return Ui(c, (e) => {
		n() && e(l);
	}), M(a), Yn(() => Ei(s, n() ? "動画を選んでください" : "動画が読み込まれていません")), Z(e, a), Qe(i);
}
Vr(["click"]), Ba(So, {
	filePicker: {},
	onpickfile: {}
}, [], [], { mode: "open" });
// src/lib/scheduler.ts
var Co = {
	setTimeout: (e, t) => globalThis.setTimeout(e, t),
	clearTimeout: (e) => globalThis.clearTimeout(e)
}, wo = {
	tapMaxMovePx: 10,
	tapMaxMs: 300,
	swipeThresholdPx: 12,
	verticalRatio: 1.5
}, To = class {
	constructor(e, t = {}, n = Co) {
		E(this, "callbacks", void 0), E(this, "scheduler", void 0), E(this, "state", "idle"), E(this, "options", void 0), E(this, "activeId", null), E(this, "downIds", /* @__PURE__ */ new Set()), E(this, "startX", 0), E(this, "startY", 0), E(this, "startTime", 0), E(this, "maxDistance", 0), E(this, "longPressTimer", null), this.callbacks = e, this.scheduler = n, this.options = {
			...wo,
			...t
		};
	}
	down(e, t, n, r) {
		let i = this.downIds.size > 0;
		return this.downIds.add(e), i ? (this.abort(r), !1) : (this.state = "pressed", this.activeId = e, this.startX = t, this.startY = n, this.startTime = r, this.maxDistance = 0, this.callbacks.onPress?.(r), this.longPressTimer = this.scheduler.setTimeout(() => {
			this.longPressTimer = null, this.state === "pressed" && (this.state = "longpress", this.callbacks.onAbort?.(this.startTime + this.options.tapMaxMs));
		}, this.options.tapMaxMs), !0);
	}
	move(e, t, n, r) {
		if (e !== this.activeId) return;
		let i = t - this.startX, a = n - this.startY;
		this.maxDistance = Math.max(this.maxDistance, Math.hypot(i, a));
		let { swipeThresholdPx: o, verticalRatio: s } = this.options;
		if (this.state === "pressed") {
			let e = Math.abs(i), t = Math.abs(a);
			t >= o && t >= e * s ? (this.clearLongPress(), this.state = "vswipe", this.callbacks.onAbort?.(r), this.callbacks.onVerticalSwipeStart?.(), this.callbacks.onVerticalSwipeMove?.(a)) : e >= o && (this.clearLongPress(), this.state = "hswipe", this.callbacks.onAbort?.(r));
		} else this.state === "vswipe" && this.callbacks.onVerticalSwipeMove?.(a);
	}
	up(e, t, n, r) {
		if (this.downIds.delete(e), e !== this.activeId) return;
		let i = this.state;
		this.reset(), i === "pressed" ? r - this.startTime <= this.options.tapMaxMs && this.maxDistance < this.options.tapMaxMovePx ? this.callbacks.onTap?.({
			x: this.startX,
			y: this.startY,
			downTime: this.startTime,
			upTime: r
		}) : this.callbacks.onAbort?.(r) : i === "vswipe" && this.callbacks.onVerticalSwipeEnd?.();
	}
	cancel(e, t) {
		this.downIds.delete(e), e === this.activeId && this.abort(t);
	}
	abort(e) {
		let t = this.state;
		this.reset(), t === "pressed" && this.callbacks.onAbort?.(e), t === "vswipe" && this.callbacks.onVerticalSwipeEnd?.();
	}
	dispose() {
		this.reset(), this.downIds.clear();
	}
	reset() {
		this.clearLongPress(), this.state = "idle", this.activeId = null;
	}
	clearLongPress() {
		this.longPressTimer != null && (this.scheduler.clearTimeout(this.longPressTimer), this.longPressTimer = null);
	}
}, Eo = class {
	constructor(e, t = {}, n = Co) {
		E(this, "callbacks", void 0), E(this, "scheduler", void 0), E(this, "options", void 0), E(this, "state", { kind: "none" }), E(this, "timer", null), this.callbacks = e, this.scheduler = n, this.options = {
			doubleTapMs: 200,
			streakMs: 500,
			...t
		};
	}
	get stateKind() {
		return this.state.kind;
	}
	press(e) {
		let t = this.state;
		t.kind === "waiting" ? e - t.releaseTime <= this.options.doubleTapMs ? (this.clearTimer(), t.held = !0) : this.fireSingle() : t.kind === "streak" && (e - t.releaseTime <= this.options.streakMs ? (this.clearTimer(), t.held = !0) : this.endStreak());
	}
	tap(e, t, n) {
		let r = this.state;
		if (r.kind === "waiting") {
			let i = r.held || t - r.releaseTime <= this.options.doubleTapMs;
			if (this.clearTimer(), i && r.zone === e) {
				if (e === "center") {
					this.state = { kind: "none" };
					return;
				}
				this.state = {
					kind: "streak",
					zone: e,
					releaseTime: n,
					held: !1
				}, this.startTimer(this.options.streakMs, () => this.endStreak()), this.callbacks.onDoubleTap?.(e);
				return;
			}
			this.fireSingle(), this.beginWaiting(e, n);
		} else if (r.kind === "streak") {
			let i = r.held || t - r.releaseTime <= this.options.streakMs;
			if (this.clearTimer(), i && r.zone === e) {
				r.releaseTime = n, r.held = !1, this.startTimer(this.options.streakMs, () => this.endStreak()), this.callbacks.onStreakTap?.(e);
				return;
			}
			this.endStreak(), this.beginWaiting(e, n);
		} else this.beginWaiting(e, n);
	}
	abort() {
		let e = this.state;
		e.kind === "waiting" && e.held ? this.fireSingle() : e.kind === "streak" && e.held && this.endStreak();
	}
	reset() {
		this.clearTimer(), this.state = { kind: "none" };
	}
	beginWaiting(e, t) {
		this.state = {
			kind: "waiting",
			zone: e,
			releaseTime: t,
			held: !1
		}, this.startTimer(this.options.doubleTapMs, () => this.fireSingle());
	}
	fireSingle() {
		let e = this.state;
		this.clearTimer(), this.state = { kind: "none" }, e.kind === "waiting" && this.callbacks.onSingleTap?.(e.zone);
	}
	endStreak() {
		let e = this.state.kind === "streak";
		this.clearTimer(), this.state = { kind: "none" }, e && this.callbacks.onStreakEnd?.();
	}
	startTimer(e, t) {
		this.clearTimer(), this.timer = this.scheduler.setTimeout(() => {
			this.timer = null, t();
		}, e);
	}
	clearTimer() {
		this.timer != null && (this.scheduler.clearTimeout(this.timer), this.timer = null);
	}
}, Do = /* @__PURE__ */ X("<div class=\"gesture svelte-gm38wo\" part=\"gesture\"></div>"), Oo = {
	hash: "svelte-gm38wo",
	code: ".gesture.svelte-gm38wo {position:absolute;inset:0;touch-action:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent;}"
};
function ko(e, t) {
	Ze(t, !0), ra(e, Oo);
	let n = $(t, "zoneLeft", 7), r = $(t, "zoneRight", 7), i = $(t, "doubleTapMs", 7), a = $(t, "streakMs", 7), o = $(t, "onsingletap", 7), s = $(t, "ondoubletap", 7), c = $(t, "onstreaktap", 7), l = $(t, "onstreakend", 7), u = $(t, "onswipestart", 7), d = $(t, "onswipemove", 7), f = $(t, "onswipeend", 7), p, m = {
		x: 0,
		y: 0
	}, h = new Eo({
		onSingleTap: (e) => o()(e),
		onDoubleTap: (e) => s()(e, m),
		onStreakTap: (e) => c()(e, m),
		onStreakEnd: () => l()()
	}), g = new To({
		onPress: (e) => h.press(e),
		onTap: (e) => {
			m = {
				x: e.x,
				y: e.y
			};
			let t = p.getBoundingClientRect().width || 1;
			h.tap($a(e.x / t, n(), r()), e.downTime, e.upTime);
		},
		onAbort: () => h.abort(),
		onVerticalSwipeStart: () => u()(),
		onVerticalSwipeMove: (e) => d()(e),
		onVerticalSwipeEnd: () => f()()
	});
	Hn(() => {
		h.options.doubleTapMs = i(), h.options.streakMs = a();
	});
	function _() {
		h.reset();
	}
	Hi(() => {
		g.dispose(), h.reset();
	});
	function v(e) {
		let t = p.getBoundingClientRect();
		return {
			x: e.clientX - t.left,
			y: e.clientY - t.top
		};
	}
	function y(e) {
		if (e.pointerType === "mouse" && e.button !== 0) return;
		e.preventDefault();
		let { x: t, y: n } = v(e);
		if (g.down(e.pointerId, t, n, e.timeStamp)) try {
			p.setPointerCapture(e.pointerId);
		} catch {}
	}
	function b(e) {
		let { x: t, y: n } = v(e);
		g.move(e.pointerId, t, n, e.timeStamp);
	}
	function x(e) {
		let { x: t, y: n } = v(e);
		g.up(e.pointerId, t, n, e.timeStamp);
	}
	function S(e) {
		g.cancel(e.pointerId, e.timeStamp);
	}
	Hn(() => {
		let e = (e) => e.preventDefault(), t = { passive: !1 }, n = [
			"touchstart",
			"touchmove",
			"gesturestart",
			"gesturechange",
			"gestureend"
		];
		for (let r of n) p.addEventListener(r, e, t);
		return () => {
			for (let t of n) p.removeEventListener(t, e);
		};
	});
	var C = {
		reset: _,
		get zoneLeft() {
			return n();
		},
		set zoneLeft(e) {
			n(e), B();
		},
		get zoneRight() {
			return r();
		},
		set zoneRight(e) {
			r(e), B();
		},
		get doubleTapMs() {
			return i();
		},
		set doubleTapMs(e) {
			i(e), B();
		},
		get streakMs() {
			return a();
		},
		set streakMs(e) {
			a(e), B();
		},
		get onsingletap() {
			return o();
		},
		set onsingletap(e) {
			o(e), B();
		},
		get ondoubletap() {
			return s();
		},
		set ondoubletap(e) {
			s(e), B();
		},
		get onstreaktap() {
			return c();
		},
		set onstreaktap(e) {
			c(e), B();
		},
		get onstreakend() {
			return l();
		},
		set onstreakend(e) {
			l(e), B();
		},
		get onswipestart() {
			return u();
		},
		set onswipestart(e) {
			u(e), B();
		},
		get onswipemove() {
			return d();
		},
		set onswipemove(e) {
			d(e), B();
		},
		get onswipeend() {
			return f();
		},
		set onswipeend(e) {
			f(e), B();
		}
	}, w = Do();
	return Oa(w, (e) => p = e, () => p), Y("pointerdown", w, y), Y("pointermove", w, b), Y("pointerup", w, x), Br("pointercancel", w, S), Y("dblclick", w, (e) => e.preventDefault()), Y("contextmenu", w, (e) => e.preventDefault()), Z(e, w), Qe(C);
}
Vr([
	"pointerdown",
	"pointermove",
	"pointerup",
	"dblclick",
	"contextmenu"
]), Ba(ko, {
	zoneLeft: {},
	zoneRight: {},
	doubleTapMs: {},
	streakMs: {},
	onsingletap: {},
	ondoubletap: {},
	onstreaktap: {},
	onstreakend: {},
	onswipestart: {},
	onswipemove: {},
	onswipeend: {}
}, [], ["reset"], { mode: "open" });
// src/components/HelpOverlay.svelte
var Ao = /* @__PURE__ */ X("<div class=\"backdrop svelte-jsu3fx\"><div class=\"panel svelte-jsu3fx\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"svp-help-title\"><div class=\"header svelte-jsu3fx\"><h2 id=\"svp-help-title\" class=\"svelte-jsu3fx\">操作方法</h2> <button class=\"close svelte-jsu3fx\" type=\"button\" aria-label=\"閉じる\"><!></button></div> <div class=\"zones svelte-jsu3fx\" aria-label=\"画面の領域\"><div class=\"zone side svelte-jsu3fx\"><span class=\"zone-name svelte-jsu3fx\">左</span> <span class=\"zone-action svelte-jsu3fx\">2回タップ</span> <span class=\"zone-result svelte-jsu3fx\"> </span></div> <div class=\"zone center svelte-jsu3fx\"><span class=\"zone-name svelte-jsu3fx\">中央</span> <span class=\"zone-action svelte-jsu3fx\">タップ</span> <span class=\"zone-result svelte-jsu3fx\">再生・停止</span></div> <div class=\"zone side svelte-jsu3fx\"><span class=\"zone-name svelte-jsu3fx\">右</span> <span class=\"zone-action svelte-jsu3fx\">2回タップ</span> <span class=\"zone-result svelte-jsu3fx\"> </span></div></div> <dl class=\"list svelte-jsu3fx\"><dt class=\"svelte-jsu3fx\">左・右を2回タップ</dt> <dd class=\"svelte-jsu3fx\"> </dd> <dt class=\"svelte-jsu3fx\">中央をタップ</dt> <dd class=\"svelte-jsu3fx\">再生・停止</dd> <dt class=\"svelte-jsu3fx\">左・右をタップ</dt> <dd class=\"svelte-jsu3fx\">操作パネルの表示・非表示</dd> <dt class=\"svelte-jsu3fx\">上下にスワイプ</dt> <dd class=\"svelte-jsu3fx\">再生速度を変える</dd></dl> <p class=\"note svelte-jsu3fx\">等倍より遅いときは、スキップする秒数も短くなります。</p></div></div>"), jo = {
	hash: "svelte-jsu3fx",
	code: ".backdrop.svelte-jsu3fx {position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:calc(12px + env(safe-area-inset-top, 0px)) calc(12px + env(safe-area-inset-right, 0px))\n      calc(12px + env(safe-area-inset-bottom, 0px)) calc(12px + env(safe-area-inset-left, 0px));background:rgba(0, 0, 0, 0.6);pointer-events:auto;touch-action:pan-y;\n    animation: svelte-jsu3fx-fade 0.2s ease;}\n  @keyframes svelte-jsu3fx-fade {\n    from {\n      opacity: 0;\n    }\n  }.panel.svelte-jsu3fx {width:min(100%, 460px);max-height:100%;overflow-y:auto;overscroll-behavior:contain;padding:14px 16px 16px;border-radius:14px;background:rgba(24, 24, 24, 0.96);box-shadow:0 8px 32px rgba(0, 0, 0, 0.45);font-size:13px;line-height:1.55;user-select:text;-webkit-user-select:text;}.header.svelte-jsu3fx {display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}h2.svelte-jsu3fx {margin:0;font-size:16px;font-weight:700;}.close.svelte-jsu3fx {width:32px;height:32px;padding:7px;margin-right:-6px;border-radius:50%;}\n\n  /* 画面の3領域を、実際の幅の比率で示す */.zones.svelte-jsu3fx {display:flex;gap:3px;height:76px;margin-bottom:12px;}.zone.svelte-jsu3fx {flex-grow:0;flex-shrink:1;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;border-radius:8px;text-align:center;white-space:nowrap;}.side.svelte-jsu3fx {background:rgba(255, 255, 255, 0.14);}.center.svelte-jsu3fx {background:rgba(255, 255, 255, 0.07);}.zone-name.svelte-jsu3fx {font-size:11px;opacity:0.7;}.zone-action.svelte-jsu3fx {font-size:11px;}.zone-result.svelte-jsu3fx {font-size:14px;font-weight:700;font-variant-numeric:tabular-nums;}.list.svelte-jsu3fx {display:grid;grid-template-columns:auto 1fr;gap:6px 12px;margin:0;}dt.svelte-jsu3fx {font-weight:700;white-space:nowrap;}dd.svelte-jsu3fx {margin:0;color:rgba(255, 255, 255, 0.85);}.note.svelte-jsu3fx {margin:10px 0 0;font-size:12px;color:rgba(255, 255, 255, 0.65);}\n\n  @media (max-width: 380px) {.list.svelte-jsu3fx {grid-template-columns:1fr;gap:0;}dd.svelte-jsu3fx {margin-bottom:6px;}\n  }\n\n  @media (hover: hover) {.close.svelte-jsu3fx:hover {background:rgba(255, 255, 255, 0.14);}\n  }"
};
function Mo(e, t) {
	Ze(t, !0), ra(e, jo);
	let n = $(t, "zoneLeft", 7), r = $(t, "zoneRight", 7), i = $(t, "skipSeconds", 7), a = $(t, "onclose", 7), o = (e) => `${Math.round(e * 100)}%`, s = /* @__PURE__ */ gt(() => qa(i()));
	function c(e) {
		e.querySelector(".close")?.focus();
		let t = (e) => {
			e.key === "Escape" && (e.stopPropagation(), a()());
		};
		return e.addEventListener("keydown", t), () => e.removeEventListener("keydown", t);
	}
	var l = {
		get zoneLeft() {
			return n();
		},
		set zoneLeft(e) {
			n(e), B();
		},
		get zoneRight() {
			return r();
		},
		set zoneRight(e) {
			r(e), B();
		},
		get skipSeconds() {
			return i();
		},
		set skipSeconds(e) {
			i(e), B();
		},
		get onclose() {
			return a();
		},
		set onclose(e) {
			a(e), B();
		}
	}, u = Ao(), d = U(u), f = U(d), p = W(U(f), 2);
	io(U(p), { name: "close" }), M(p), M(f);
	var m = W(f, 2), h = U(m);
	let g;
	var _ = An(W(U(h), 4));
	M(h);
	var v = W(h, 2);
	let y;
	var b = W(v, 2);
	let x;
	var S = An(W(U(b), 4));
	M(b), M(m);
	var C = W(m, 2), w = An(W(U(C), 2));
	return je(12), M(C), je(2), M(d), ia(d, () => c), M(u), Yn((e, t, n) => {
		g = fa(h, "", g, { "flex-basis": e }), Ei(_, `−${J(s) ?? ""}秒`), y = fa(v, "", y, { "flex-basis": t }), x = fa(b, "", x, { "flex-basis": n }), Ei(S, `+${J(s) ?? ""}秒`), Ei(w, `${J(s) ?? ""}秒戻る・進む。`);
	}, [
		() => o(n()),
		() => o(r() - n()),
		() => o(1 - r())
	]), Y("click", u, (e) => {
		e.target === e.currentTarget && a()();
	}), Y("click", p, function(...e) {
		a()?.apply(this, e);
	}), Z(e, u), Qe(l);
}
Vr(["click"]), Ba(Mo, {
	zoneLeft: {},
	zoneRight: {},
	skipSeconds: {},
	onclose: {}
}, [], [], { mode: "open" });
// src/components/RateOverlay.svelte
var No = /* @__PURE__ */ X("<i></i>"), Po = /* @__PURE__ */ X("<div part=\"rate-overlay\" aria-live=\"polite\"><div class=\"value svelte-1wzg57u\"> </div> <div class=\"steps svelte-1wzg57u\"></div></div>"), Fo = {
	hash: "svelte-1wzg57u",
	code: ".overlay.svelte-1wzg57u {position:absolute;left:50%;top:50%;min-width:132px;padding:14px 20px 12px;border-radius:18px;background:rgba(0, 0, 0, 0.62);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);text-align:center;transform:translate(-50%, -50%) scale(0.92);opacity:0;transition:opacity 0.2s ease,\n      transform 0.2s ease;}.show.svelte-1wzg57u {opacity:1;transform:translate(-50%, -50%) scale(1);transition-duration:0.08s;}.value.svelte-1wzg57u {font-size:28px;font-weight:700;line-height:1.05;letter-spacing:-0.02em;font-variant-numeric:tabular-nums;}\n  /* 1倍に戻ったことは色で知らせる（iPhoneのSafariでは振動を使えないため） */.normal.svelte-1wzg57u .value:where(.svelte-1wzg57u) {color:#7cf29b;}.steps.svelte-1wzg57u {display:flex;justify-content:center;gap:4px;margin-top:16px;}.steps.svelte-1wzg57u i:where(.svelte-1wzg57u) {display:block;width:8px;height:8px;border-radius:50%;background:rgba(255, 255, 255, 0.3);}.steps.svelte-1wzg57u i.unity:where(.svelte-1wzg57u) {box-shadow:0 0 0 1.5px rgba(255, 255, 255, 0.55);}.steps.svelte-1wzg57u i.on:where(.svelte-1wzg57u) {background:#fff;}.steps.svelte-1wzg57u i.disabled:where(.svelte-1wzg57u) {opacity:0.25;}"
};
function Io(e, t) {
	Ze(t, !0), ra(e, Fo);
	let n = $(t, "visible", 7), r = $(t, "rates", 7), i = $(t, "index", 7), a = $(t, "minIndex", 7), o = /* @__PURE__ */ gt(() => r()[i()] ?? 1);
	var s = {
		get visible() {
			return n();
		},
		set visible(e) {
			n(e), B();
		},
		get rates() {
			return r();
		},
		set rates(e) {
			r(e), B();
		},
		get index() {
			return i();
		},
		set index(e) {
			i(e), B();
		},
		get minIndex() {
			return a();
		},
		set minIndex(e) {
			a(e), B();
		}
	}, c = Po();
	let l;
	var u = U(c), d = An(u, !0), f = W(u, 2);
	return Xi(f, 21, r, Ki, (e, t, n) => {
		var r = No();
		let o;
		Yn(() => o = ua(r, 1, "svelte-1wzg57u", null, o, {
			on: n <= i() && n >= a(),
			unity: J(t) === 1,
			disabled: n < a()
		})), Z(e, r);
	}), M(f), M(c), Yn((e) => {
		l = ua(c, 1, "overlay svelte-1wzg57u", null, l, {
			show: n(),
			normal: J(o) === 1
		}), Ei(d, e);
	}, [() => Ya(J(o))]), Z(e, c), Qe(s);
}
Ba(Io, {
	visible: {},
	rates: {},
	index: {},
	minIndex: {}
}, [], [], { mode: "open" });
// src/components/SkipRipple.svelte
var Lo = /* @__PURE__ */ X("<div></div>"), Ro = /* @__PURE__ */ X("<div part=\"ripple\"><!> <div class=\"label svelte-17l3tab\"><div class=\"arrows svelte-17l3tab\"><span class=\"svelte-17l3tab\"><!></span><span class=\"svelte-17l3tab\"><!></span><span class=\"svelte-17l3tab\"><!></span></div> <span class=\"svelte-17l3tab\"> </span></div></div>"), zo = {
	hash: "svelte-17l3tab",
	code: ".ripple.svelte-17l3tab {position:absolute;top:0;bottom:0;width:42%;display:flex;align-items:center;justify-content:center;overflow:hidden;opacity:0;transition:opacity 0.25s ease;}.ripple.svelte-17l3tab::before {content:'';position:absolute;inset:0;background:rgba(255, 255, 255, 0.14);}.left.svelte-17l3tab {left:0;border-radius:0 50% 50% 0 / 0 50% 50% 0;}.right.svelte-17l3tab {right:0;border-radius:50% 0 0 50% / 50% 0 0 50%;}.show.svelte-17l3tab {opacity:1;transition-duration:0.08s;}.wave.svelte-17l3tab {position:absolute;width:120px;height:120px;margin:-60px 0 0 -60px;border-radius:50%;background:rgba(255, 255, 255, 0.28);opacity:0;}.wave.animate.svelte-17l3tab {\n    animation: svelte-17l3tab-wave 0.55s ease-out;}\n  @keyframes svelte-17l3tab-wave {\n    from {\n      transform: scale(0.2);\n      opacity: 1;\n    }\n    to {\n      transform: scale(3.2);\n      opacity: 0;\n    }\n  }.label.svelte-17l3tab {position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;font-size:15px;font-weight:600;font-variant-numeric:tabular-nums;text-shadow:0 1px 3px rgba(0, 0, 0, 0.6);}.arrows.svelte-17l3tab {display:flex;height:18px;}.arrows.svelte-17l3tab span:where(.svelte-17l3tab) {width:18px;height:18px;opacity:0.25;\n    animation: svelte-17l3tab-arrow 0.9s infinite;}\n  /* 進む向きに光が流れるように遅延をずらす */.right.svelte-17l3tab .arrows:where(.svelte-17l3tab) span:where(.svelte-17l3tab):nth-child(2),\n  .left.svelte-17l3tab .arrows:where(.svelte-17l3tab) span:where(.svelte-17l3tab):nth-child(2) {animation-delay:0.15s;}.right.svelte-17l3tab .arrows:where(.svelte-17l3tab) span:where(.svelte-17l3tab):nth-child(3),\n  .left.svelte-17l3tab .arrows:where(.svelte-17l3tab) span:where(.svelte-17l3tab):nth-child(1) {animation-delay:0.3s;}\n  @keyframes svelte-17l3tab-arrow {\n    0%,\n    100% {\n      opacity: 0.25;\n    }\n    40% {\n      opacity: 1;\n    }\n  }\n\n  @media (prefers-reduced-motion: reduce) {.wave.animate.svelte-17l3tab,\n    .arrows.svelte-17l3tab span:where(.svelte-17l3tab) {\n      animation: none;}\n  }"
};
function Bo(e, t) {
	Ze(t, !0), ra(e, zo);
	let n = $(t, "side", 7), r = $(t, "visible", 7), i = $(t, "label", 7), a = $(t, "at", 7), o = $(t, "seq", 7), s = /* @__PURE__ */ V(void 0), c = /* @__PURE__ */ gt(() => !J(s) || !a() ? {
		x: 0,
		y: 0,
		center: !0
	} : {
		x: a().x - J(s).offsetLeft,
		y: a().y - J(s).offsetTop,
		center: !1
	}), l = /* @__PURE__ */ gt(() => n() === "left" ? "arrowLeft" : "arrowRight");
	var u = {
		get side() {
			return n();
		},
		set side(e) {
			n(e), B();
		},
		get visible() {
			return r();
		},
		set visible(e) {
			r(e), B();
		},
		get label() {
			return i();
		},
		set label(e) {
			i(e), B();
		},
		get at() {
			return a();
		},
		set at(e) {
			a(e), B();
		},
		get seq() {
			return o();
		},
		set seq(e) {
			o(e), B();
		}
	}, d = Ro();
	let f;
	var p = U(d);
	Gi(p, o, (e) => {
		var t = Lo();
		let n, r;
		Yn(() => {
			n = ua(t, 1, "wave svelte-17l3tab", null, n, { animate: o() > 0 }), r = fa(t, "", r, {
				left: J(c).center ? "50%" : `${J(c).x}px`,
				top: J(c).center ? "50%" : `${J(c).y}px`
			});
		}), Z(e, t);
	});
	var m = W(p, 2), h = U(m), g = U(h);
	io(U(g), { get name() {
		return J(l);
	} }), M(g);
	var _ = W(g);
	io(U(_), { get name() {
		return J(l);
	} }), M(_);
	var v = W(_);
	io(U(v), { get name() {
		return J(l);
	} }), M(v), M(h);
	var y = An(W(h, 2), !0);
	return M(m), M(d), Oa(d, (e) => H(s, e), () => J(s)), Yn(() => {
		f = ua(d, 1, `ripple ${n() ?? ""}`, "svelte-17l3tab", f, { show: r() }), Ei(y, i());
	}), Z(e, d), Qe(u);
}
Ba(Bo, {
	side: {},
	visible: {},
	label: {},
	at: {},
	seq: {}
}, [], [], { mode: "open" });
// src/lib/autohide.svelte.ts
var Vo = /* @__PURE__ */ new WeakMap(), Ho = /* @__PURE__ */ new WeakMap(), Uo = class {
	get visible() {
		return J(I(Vo, this));
	}
	set visible(e) {
		H(I(Vo, this), e, !0);
	}
	constructor(e, t) {
		E(this, "delayMs", void 0), E(this, "canHide", void 0), F(this, Vo, /* @__PURE__ */ V(!0)), F(this, Ho, null), this.delayMs = e, this.canHide = t;
	}
	show() {
		this.visible = !0, this.restart();
	}
	hide() {
		this.visible = !1, this.cancel();
	}
	toggle() {
		this.visible ? this.hide() : this.show();
	}
	restart() {
		this.cancel();
		let e = this.delayMs();
		!this.visible || e <= 0 || !this.canHide() || L(Ho, this, setTimeout(() => {
			L(Ho, this, null), this.canHide() && (this.visible = !1);
		}, e));
	}
	cancel() {
		I(Ho, this) && clearTimeout(I(Ho, this)), L(Ho, this, null);
	}
};
// src/lib/events.ts
function Wo(e) {
	return (t, n) => {
		e.dispatchEvent(new CustomEvent(t, {
			detail: n,
			bubbles: !0,
			composed: !0
		}));
	};
}
var Go = {
	unsupported: "この形式の動画には対応していません。MP4・MOV（H.264／HEVC）の動画を選んでください。",
	decode: "動画をデコードできませんでした。ファイルが壊れているか、非対応の形式です。",
	network: "動画の読み込み中にエラーが発生しました。",
	aborted: "動画の読み込みが中断されました。",
	play: "再生を開始できませんでした。もう一度タップしてください。",
	unknown: "動画を再生できませんでした。"
};
function Ko(e) {
	switch (e?.code) {
		case 1: return "aborted";
		case 2: return "network";
		case 3: return "decode";
		case 4: return "unsupported";
		default: return "unknown";
	}
}
// src/lib/fullscreen.svelte.ts
var qo = /* @__PURE__ */ new WeakMap(), Jo = /* @__PURE__ */ new WeakMap(), Yo = /* @__PURE__ */ new WeakMap(), Xo = /* @__PURE__ */ new WeakMap(), Zo = /* @__PURE__ */ new WeakSet(), Qo = class {
	get pseudo() {
		return J(I(qo, this));
	}
	set pseudo(e) {
		H(I(qo, this), e, !0);
	}
	get native() {
		return J(I(Jo, this));
	}
	set native(e) {
		H(I(Jo, this), e, !0);
	}
	get active() {
		return J(I(Yo, this));
	}
	set active(e) {
		H(I(Yo, this), e);
	}
	constructor(e) {
		r(this, Zo), E(this, "host", void 0), F(this, qo, /* @__PURE__ */ V(!1)), F(this, Jo, /* @__PURE__ */ V(!1)), F(this, Yo, /* @__PURE__ */ gt(() => this.pseudo || this.native)), F(this, Xo, null), this.host = e;
	}
	listen() {
		let e = () => {
			let e = document;
			this.native = (document.fullscreenElement ?? e.webkitFullscreenElement ?? null) === this.host;
		}, t = (e) => {
			e.key === "Escape" && this.pseudo && i(Zo, this, $o).call(this, !1);
		};
		return document.addEventListener("fullscreenchange", e), document.addEventListener("webkitfullscreenchange", e), document.addEventListener("keydown", t), () => {
			document.removeEventListener("fullscreenchange", e), document.removeEventListener("webkitfullscreenchange", e), document.removeEventListener("keydown", t), i(Zo, this, $o).call(this, !1);
		};
	}
	toggle() {
		this.active ? this.exit() : this.enter();
	}
	enter() {
		let e = this.host, t = document;
		if (document.fullscreenEnabled && typeof e.requestFullscreen == "function") e.requestFullscreen({ navigationUI: "hide" }).catch(() => i(Zo, this, $o).call(this, !0));
		else {
			if (t.webkitFullscreenEnabled && typeof e.webkitRequestFullscreen == "function") try {
				e.webkitRequestFullscreen();
				return;
			} catch {}
			i(Zo, this, $o).call(this, !0);
		}
	}
	exit() {
		if (this.pseudo) i(Zo, this, $o).call(this, !1);
		else if (this.native) {
			let e = document;
			document.exitFullscreen ? document.exitFullscreen().catch(() => {}) : e.webkitExitFullscreen?.();
		}
	}
};
function $o(e) {
	if (this.pseudo === e) return;
	this.pseudo = e;
	let t = document.documentElement;
	e ? (L(Xo, this, t.style.overflow), t.style.overflow = "hidden") : (t.style.overflow = I(Xo, this) ?? "", L(Xo, this, null));
}
// src/lib/player-controller.svelte.ts
var es = /* @__PURE__ */ new WeakMap(), ts = /* @__PURE__ */ new WeakMap(), ns = /* @__PURE__ */ new WeakMap(), rs = /* @__PURE__ */ new WeakMap(), is = /* @__PURE__ */ new WeakMap(), as = /* @__PURE__ */ new WeakMap(), os = /* @__PURE__ */ new WeakMap(), ss = /* @__PURE__ */ new WeakMap(), cs = /* @__PURE__ */ new WeakMap(), ls = /* @__PURE__ */ new WeakMap(), us = /* @__PURE__ */ new WeakMap(), ds = /* @__PURE__ */ new WeakMap(), fs = /* @__PURE__ */ new WeakMap(), ps = /* @__PURE__ */ new WeakMap(), ms = /* @__PURE__ */ new WeakMap(), hs = /* @__PURE__ */ new WeakMap(), gs = /* @__PURE__ */ new WeakSet(), _s = class {
	get video() {
		return J(I(es, this));
	}
	set video(e) {
		H(I(es, this), e, !0);
	}
	get paused() {
		return J(I(ts, this));
	}
	set paused(e) {
		H(I(ts, this), e, !0);
	}
	get currentTime() {
		return J(I(ns, this));
	}
	set currentTime(e) {
		H(I(ns, this), e, !0);
	}
	get duration() {
		return J(I(rs, this));
	}
	set duration(e) {
		H(I(rs, this), e, !0);
	}
	get bufferedEnd() {
		return J(I(is, this));
	}
	set bufferedEnd(e) {
		H(I(is, this), e, !0);
	}
	get source() {
		return J(I(as, this));
	}
	set source(e) {
		H(I(as, this), e, !0);
	}
	get name() {
		return J(I(os, this));
	}
	set name(e) {
		H(I(os, this), e, !0);
	}
	get error() {
		return J(I(ss, this));
	}
	set error(e) {
		H(I(ss, this), e, !0);
	}
	get loaded() {
		return J(I(cs, this));
	}
	set loaded(e) {
		H(I(cs, this), e, !0);
	}
	get rates() {
		return J(I(ls, this));
	}
	set rates(e) {
		H(I(ls, this), e, !0);
	}
	get rateIndex() {
		return J(I(us, this));
	}
	set rateIndex(e) {
		H(I(us, this), e, !0);
	}
	get minRateIndex() {
		return J(I(ds, this));
	}
	set minRateIndex(e) {
		H(I(ds, this), e, !0);
	}
	get rate() {
		return J(I(fs, this));
	}
	set rate(e) {
		H(I(fs, this), e);
	}
	get errorMessage() {
		return J(I(ps, this));
	}
	set errorMessage(e) {
		H(I(ps, this), e);
	}
	constructor(e) {
		r(this, gs), E(this, "emit", void 0), F(this, es, /* @__PURE__ */ V()), F(this, ts, /* @__PURE__ */ V(!0)), F(this, ns, /* @__PURE__ */ V(0)), F(this, rs, /* @__PURE__ */ V(0)), F(this, is, /* @__PURE__ */ V(0)), F(this, as, /* @__PURE__ */ V(null)), F(this, os, /* @__PURE__ */ V("")), F(this, ss, /* @__PURE__ */ V(null)), F(this, cs, /* @__PURE__ */ V(!1)), F(this, ls, /* @__PURE__ */ V(bn([...Va]))), F(this, us, /* @__PURE__ */ V(bn(Ga(Va, 1)))), F(this, ds, /* @__PURE__ */ V(0)), F(this, fs, /* @__PURE__ */ gt(() => this.rates[this.rateIndex] ?? 1)), F(this, ps, /* @__PURE__ */ gt(() => this.error ? Go[this.error] : "")), F(this, ms, null), F(this, hs, null), this.emit = e;
	}
	get hasMetadata() {
		return this.loaded && this.source != null && this.duration > 0;
	}
	loadFile(e) {
		return this.release(), L(ms, this, URL.createObjectURL(e)), i(gs, this, vs).call(this, I(ms, this), e.name);
	}
	loadUrl(e) {
		this.release();
		let t = decodeURIComponent(e.split(/[?#]/)[0].split("/").pop() || e);
		return i(gs, this, vs).call(this, e, t);
	}
	release() {
		I(hs, this)?.reject(new DOMException("別の動画の読み込みで中断されました", "AbortError")), L(hs, this, null);
		let e = this.video;
		this.source != null && e && (this.source = null, e.pause(), e.removeAttribute("src"), e.load()), this.source = null, I(ms, this) && (URL.revokeObjectURL(I(ms, this)), L(ms, this, null)), this.name = "", this.loaded = !1, this.paused = !0, this.currentTime = 0, this.duration = 0, this.bufferedEnd = 0;
	}
	onLoadedMetadata() {
		let e = this.video;
		e && this.source != null && (this.loaded = !0, this.duration = Number.isFinite(e.duration) ? e.duration : 0, this.currentTime = e.currentTime, i(gs, this, ys).call(this, "api", !1), I(hs, this)?.resolve(), L(hs, this, null), this.emit("svp-load", {
			name: this.name,
			duration: this.duration
		}));
	}
	onDurationChange() {
		let e = this.video?.duration;
		this.source != null && e != null && Number.isFinite(e) && (this.duration = e);
	}
	onTimeUpdate() {
		this.video && (this.currentTime = this.video.currentTime);
	}
	onProgress() {
		let e = this.video;
		if (!e) return;
		let t = 0;
		for (let n = 0; n < e.buffered.length; n++) e.buffered.start(n) <= e.currentTime + .5 && (t = Math.max(t, e.buffered.end(n)));
		this.bufferedEnd = t;
	}
	onPlayStateChange() {
		let e = this.video?.paused ?? !0;
		this.paused = e, e || (this.error = null), this.emit("svp-playstate", { paused: e });
	}
	onError() {
		if (this.source == null) return;
		let e = Ko(this.video?.error ?? null);
		this.reportError(e), I(hs, this)?.reject(Error(Go[e])), L(hs, this, null);
	}
	reportError(e) {
		this.error = e, this.emit("svp-error", {
			code: e,
			message: Go[e]
		});
	}
	play() {
		this.source != null && this.video && this.video.play()?.catch((e) => {
			e?.name !== "AbortError" && this.reportError("play");
		});
	}
	pause() {
		this.video?.pause();
	}
	togglePlay() {
		!this.video || this.video.paused || this.video.ended ? this.play() : this.pause();
	}
	seek(e) {
		if (!this.hasMetadata || !this.video || !Number.isFinite(e)) return;
		let t = Ka(e, 0, this.duration);
		this.video.currentTime = t, this.currentTime = t;
	}
	skipBy(e, t) {
		if (!this.hasMetadata || !this.video) return null;
		let n = this.video.currentTime, r = Ua(n, Ha(t, this.rate), e, this.duration);
		return this.video.currentTime = r, this.currentTime = r, Math.abs(r - n);
	}
	setRates(e) {
		let t = this.rate;
		this.rates = e, this.minRateIndex = 0, this.rateIndex = Ga(e, t), i(gs, this, ys).call(this, "api", !1);
	}
	setRateIndex(e, t) {
		let n = this.rateIndex;
		this.rateIndex = Ka(Math.round(e), this.minRateIndex, this.rates.length - 1), i(gs, this, ys).call(this, t, n !== this.rateIndex);
	}
	setRate(e, t) {
		!Number.isFinite(e) || e <= 0 || this.setRateIndex(Ga(this.rates, e), t);
	}
};
function vs(e, t) {
	let n = this.video;
	return n ? (this.source = e, this.name = t, this.error = null, new Promise((t, r) => {
		L(hs, this, {
			resolve: t,
			reject: r
		}), n.src = e, n.load(), i(gs, this, ys).call(this, "api", !1);
	})) : Promise.reject(/* @__PURE__ */ Error("video element is not ready"));
}
function ys(e, t) {
	let n = this.rateIndex;
	for (; !i(gs, this, bs).call(this, this.rates[this.rateIndex]) && this.rates[this.rateIndex] < 1 && !(this.rateIndex >= this.rates.length - 1);) this.minRateIndex = this.rateIndex + 1, this.rateIndex = this.minRateIndex;
	(t || n !== this.rateIndex) && this.emit("svp-ratechange", {
		rate: this.rate,
		source: e
	});
}
function bs(e) {
	let t = this.video;
	if (!t) return !0;
	try {
		t.defaultPlaybackRate = e, t.playbackRate = e, t.preservesPitch = !0, t.webkitPreservesPitch = !0;
	} catch {
		return !1;
	}
	return Math.abs(t.playbackRate - e) < .001;
}
// src/SportsVideoPlayer.svelte
var xs = /* @__PURE__ */ X("<div class=\"message svelte-1kahku6\" role=\"alert\"> </div>"), Ss = /* @__PURE__ */ X("<div class=\"root svelte-1kahku6\" part=\"root\"><video part=\"video\" playsinline=\"\" preload=\"metadata\" disablepictureinpicture=\"\" disableremoteplayback=\"\" class=\"svelte-1kahku6\"></video> <!> <div class=\"feedback svelte-1kahku6\"><!> <!> <!> <div part=\"rate-badge\"> </div> <!></div> <!> <!> <!> <input type=\"file\" accept=\"video/*,.mp4,.mov,.m4v,.webm\" hidden=\"\"/></div>", 2), Cs = {
	hash: "svelte-1kahku6",
	code: ":host {display:block;position:relative;width:100%;aspect-ratio:16 / 9;background:#000;color:#fff;overflow:hidden;contain:layout paint;font-family:-apple-system, BlinkMacSystemFont, 'Hiragino Sans', 'Segoe UI', Roboto, sans-serif;-webkit-text-size-adjust:100%;--svp-accent: #ff3b30;--svp-fade: 0.2s;--svp-bar-height: 56px;}:host([hidden]) {display:none;}\n\n  /* 疑似全画面（iPhone）／ネイティブ全画面 */:host([fullscreen]),\n  :host(:fullscreen) {position:fixed;inset:0;width:100vw;height:100vh;height:100dvh;max-width:none;aspect-ratio:auto;z-index:2147483647;border-radius:0 !important;}.root.svelte-1kahku6 {position:absolute;inset:0;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent;}.root.svelte-1kahku6 *,\n  .root.svelte-1kahku6 *::before,\n  .root.svelte-1kahku6 *::after {box-sizing:border-box;}\n\n  /* 既定値のリセット。:where で詳細度を下げ、各コンポーネントの指定を優先させる */:where(.root.svelte-1kahku6) button {margin:0;padding:0;border:0;background:none;color:inherit;font:inherit;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;}:where(.root.svelte-1kahku6) button:focus-visible {outline:2px solid #fff;outline-offset:2px;border-radius:6px;}video.svelte-1kahku6 {position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000;pointer-events:none;}.feedback.svelte-1kahku6 {position:absolute;inset:0;overflow:hidden;pointer-events:none;}.rate-badge.svelte-1kahku6 {position:absolute;bottom:calc(10px + env(safe-area-inset-bottom, 0px));right:calc(10px + env(safe-area-inset-right, 0px));padding:3px 8px;border-radius:999px;background:rgba(0, 0, 0, 0.55);font-size:12px;font-weight:700;font-variant-numeric:tabular-nums;opacity:0;transition:opacity var(--svp-fade) ease;}.rate-badge.show.svelte-1kahku6 {opacity:1;}.message.svelte-1kahku6 {position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);max-width:min(86%, 420px);padding:14px 18px;border-radius:12px;background:rgba(30, 30, 30, 0.88);font-size:14px;line-height:1.5;text-align:center;}"
};
function ws(e, t) {
	Ze(t, !0), ra(e, Cs);
	let n = $(t, "filePicker", 7, !1), r = $(t, "src", 7), i = $(t, "doubleTapMs", 7), a = $(t, "streakMs", 7), o = $(t, "zoneLeft", 7), s = $(t, "zoneRight", 7), c = $(t, "skipSeconds", 7), l = $(t, "swipeStepPx", 7), u = $(t, "rates", 7), d = $(t, "autohideMs", 7), f = (e, t, n) => e != null && Number.isFinite(e) && e >= n ? e : t, p = /* @__PURE__ */ gt(() => {
		let e = Qa(o() ?? null) ?? .37, t = Qa(s() ?? null) ?? .63;
		return e > t && ([e, t] = [.37, .63]), {
			zoneLeft: e,
			zoneRight: t,
			doubleTapMs: f(i(), 200, 1),
			streakMs: f(a(), 500, 1),
			skipSeconds: f(c(), 10, 0),
			swipeStepPx: f(l(), 32, 1),
			autohideMs: f(d(), 3e3, 0)
		};
	}), m = t.$$host, h = Wo(m), g = new _s(h), _ = new Qo(m), v = /* @__PURE__ */ V(!1), y = /* @__PURE__ */ V(!1), b = /* @__PURE__ */ V(!1), x = new Uo(() => J(p).autohideMs, () => !g.paused && !J(v) && !J(b)), S = /* @__PURE__ */ V(void 0), C, w = /* @__PURE__ */ V(bn({
		left: {
			visible: !1,
			label: "",
			at: null,
			seq: 0
		},
		right: {
			visible: !1,
			label: "",
			at: null,
			seq: 0
		}
	})), T = {
		left: void 0,
		right: void 0
	}, ee = 0, te = /* @__PURE__ */ V(!1), ne, E = 0;
	Hn(() => _.listen()), Hn(() => {
		m.toggleAttribute("fullscreen", _.active);
	}), Hn(() => {
		let e = Za(u() ?? null) ?? [...Va];
		Fr(() => g.setRates(e));
	}), Hn(() => {
		let e = r();
		Fr(() => {
			e && le(() => g.loadUrl(e));
		});
	}), Hn(() => {
		let e = g.paused;
		Fr(() => e ? x.show() : x.restart());
	}), Hn(() => {
		J(v), J(b), Fr(() => x.restart());
	}), Hn(() => {
		g.error && Fr(() => x.show());
	}), Hi(() => {
		x.cancel(), clearTimeout(ne), clearTimeout(T.left), clearTimeout(T.right), g.release();
	});
	function re(e) {
		return le(() => g.loadFile(e));
	}
	function D() {
		g.play();
	}
	function O() {
		g.pause();
	}
	function ie() {
		g.togglePlay();
	}
	function ae(e) {
		let t = g.skipBy(e, J(p).skipSeconds);
		return t == null ? 0 : (h("svp-skip", {
			direction: e,
			seconds: t,
			rate: g.rate,
			total: t
		}), t);
	}
	function oe(e) {
		g.setRate(e, "api"), _e();
	}
	function se(e) {
		g.seek(e);
	}
	function ce() {
		return {
			rate: g.rate,
			currentTime: g.video?.currentTime ?? 0,
			duration: g.hasMetadata ? g.duration : NaN,
			paused: g.video?.paused ?? !0,
			video: g.video
		};
	}
	function le(e) {
		J(S)?.reset(), ee = 0, x.show();
		let t = e();
		return t.catch(() => {}), t;
	}
	function ue() {
		let e = C.files?.[0];
		C.value = "", e && re(e);
	}
	function de(e) {
		e === "center" && g.source != null ? g.togglePlay() : x.toggle();
	}
	function fe(e, t) {
		let n = g.skipBy(e, J(p).skipSeconds);
		n != null && (ee += n, me(e, ee, t), h("svp-skip", {
			direction: e,
			seconds: n,
			rate: g.rate,
			total: ee
		}));
	}
	function pe(e) {
		let t = Wa(E, e, J(p).swipeStepPx, g.rates.length, g.minRateIndex);
		t !== g.rateIndex && g.setRateIndex(t, "swipe");
	}
	function me(e, t, n) {
		let r = e < 0 ? "left" : "right", i = e < 0 ? "right" : "left";
		J(w)[i].visible = !1;
		let a = J(w)[r];
		a.label = Ja(e, t), a.at = n, a.seq += 1, a.visible = !0, clearTimeout(T[r]), T[r] = setTimeout(() => J(w)[r].visible = !1, 650);
	}
	function he(e) {
		H(te, !0), clearTimeout(ne), e != null && (ne = setTimeout(() => H(te, !1), e));
	}
	function ge() {
		g.pause(), H(v, !1), H(y, !0);
	}
	function _e() {
		he(900);
	}
	var ve = {
		loadFile: re,
		play: D,
		pause: O,
		togglePlay: ie,
		skip: ae,
		setRate: oe,
		setCurrentTime: se,
		getSnapshot: ce,
		get filePicker() {
			return n();
		},
		set filePicker(e = !1) {
			n(e), B();
		},
		get src() {
			return r();
		},
		set src(e) {
			r(e), B();
		},
		get doubleTapMs() {
			return i();
		},
		set doubleTapMs(e) {
			i(e), B();
		},
		get streakMs() {
			return a();
		},
		set streakMs(e) {
			a(e), B();
		},
		get zoneLeft() {
			return o();
		},
		set zoneLeft(e) {
			o(e), B();
		},
		get zoneRight() {
			return s();
		},
		set zoneRight(e) {
			s(e), B();
		},
		get skipSeconds() {
			return c();
		},
		set skipSeconds(e) {
			c(e), B();
		},
		get swipeStepPx() {
			return l();
		},
		set swipeStepPx(e) {
			l(e), B();
		},
		get rates() {
			return u();
		},
		set rates(e) {
			u(e), B();
		},
		get autohideMs() {
			return d();
		},
		set autohideMs(e) {
			d(e), B();
		}
	}, ye = Ss(), be = U(ye);
	Oa(be, (e) => g.video = e, () => g?.video);
	var xe = W(be, 2);
	Oa(ko(xe, {
		get zoneLeft() {
			return J(p).zoneLeft;
		},
		get zoneRight() {
			return J(p).zoneRight;
		},
		get doubleTapMs() {
			return J(p).doubleTapMs;
		},
		get streakMs() {
			return J(p).streakMs;
		},
		onsingletap: de,
		ondoubletap: (e, t) => {
			ee = 0, fe(e === "left" ? -1 : 1, t);
		},
		onstreaktap: (e, t) => fe(e === "left" ? -1 : 1, t),
		onstreakend: () => ee = 0,
		onswipestart: () => {
			E = g.rateIndex, x.hide(), he();
		},
		onswipemove: pe,
		onswipeend: () => he(600)
	}), (e) => H(S, e, !0), () => J(S));
	var Se = W(xe, 2), Ce = U(Se);
	Bo(Ce, Ma({ side: "left" }, () => J(w).left));
	var we = W(Ce, 2);
	Bo(we, Ma({ side: "right" }, () => J(w).right));
	var Te = W(we, 2);
	Io(Te, {
		get visible() {
			return J(te);
		},
		get rates() {
			return g.rates;
		},
		get index() {
			return g.rateIndex;
		},
		get minIndex() {
			return g.minRateIndex;
		}
	});
	var Ee = W(Te, 2);
	let De;
	var Oe = An(Ee, !0), k = W(Ee, 2), ke = (e) => {
		var t = xs(), n = An(t, !0);
		Yn(() => Ei(n, g.errorMessage)), Z(e, t);
	};
	Ui(k, (e) => {
		g.errorMessage && e(ke);
	}), M(Se);
	var A = W(Se, 2);
	vo(A, {
		get player() {
			return g;
		},
		get visible() {
			return x.visible;
		},
		get filePicker() {
			return n();
		},
		get fullscreen() {
			return _.active;
		},
		onpickfile: () => C.click(),
		onselectrate: (e) => {
			g.setRateIndex(e, "menu"), _e();
		},
		ontogglefullscreen: () => _.toggle(),
		onhelp: ge,
		onactivity: () => x.restart(),
		get menuOpen() {
			return J(v);
		},
		set menuOpen(e) {
			H(v, e, !0);
		},
		get seeking() {
			return J(b);
		},
		set seeking(e) {
			H(b, e, !0);
		}
	});
	var j = W(A, 2), Ae = (e) => {
		So(e, {
			get filePicker() {
				return n();
			},
			onpickfile: () => C.click()
		});
	};
	Ui(j, (e) => {
		g.source ?? e(Ae);
	});
	var je = W(j, 2), Me = (e) => {
		Mo(e, {
			get zoneLeft() {
				return J(p).zoneLeft;
			},
			get zoneRight() {
				return J(p).zoneRight;
			},
			get skipSeconds() {
				return J(p).skipSeconds;
			},
			onclose: () => H(y, !1)
		});
	};
	Ui(je, (e) => {
		J(y) && e(Me);
	});
	var Ne = W(je, 2);
	return Oa(Ne, (e) => C = e, () => C), M(ye), Yn((e) => {
		De = ua(Ee, 1, "rate-badge svelte-1kahku6", null, De, { show: !x.visible && g.rate !== 1 }), Ei(Oe, e);
	}, [() => Ya(g.rate)]), Br("loadedmetadata", be, () => g.onLoadedMetadata()), Br("durationchange", be, () => g.onDurationChange()), Br("timeupdate", be, () => g.onTimeUpdate()), Br("progress", be, () => g.onProgress()), Br("seeked", be, () => g.onProgress()), Br("play", be, () => g.onPlayStateChange()), Br("pause", be, () => g.onPlayStateChange()), Br("ended", be, () => x.show()), Br("error", be, () => g.onError()), Y("change", Ne, ue), Z(e, ye), Qe(ve);
}
Vr(["change"]), customElements.define("sports-video-player", Ba(ws, {
	filePicker: {
		attribute: "file-picker",
		type: "Boolean"
	},
	src: {
		attribute: "src",
		type: "String"
	},
	doubleTapMs: {
		attribute: "double-tap-ms",
		type: "Number"
	},
	streakMs: {
		attribute: "streak-ms",
		type: "Number"
	},
	zoneLeft: {
		attribute: "zone-left",
		type: "String"
	},
	zoneRight: {
		attribute: "zone-right",
		type: "String"
	},
	skipSeconds: {
		attribute: "skip-seconds",
		type: "Number"
	},
	swipeStepPx: {
		attribute: "swipe-step-px",
		type: "Number"
	},
	rates: {
		attribute: "rates",
		type: "String"
	},
	autohideMs: {
		attribute: "autohide-ms",
		type: "Number"
	}
}, [], [
	"loadFile",
	"play",
	"pause",
	"togglePlay",
	"skip",
	"setRate",
	"setCurrentTime",
	"getSnapshot"
], { mode: "open" }, a));
export { Va as DEFAULT_RATES, ws as SportsVideoPlayer };
